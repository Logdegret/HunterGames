import { DurableObject } from "cloudflare:workers";

const HOLES = 18;
const MAX_CHAT = 30;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (url.pathname === "/" || url.pathname === "/health") {
      return json({ ok: true, service: "open-golf-multiplayer" });
    }

    const match = url.pathname.match(/^\/room\/([A-Za-z0-9-]{1,12})$/);
    if (!match) {
      return json({ error: "Use /room/ROOMCODE for multiplayer rooms." }, 404);
    }

    const roomName = cleanRoom(match[1]);
    const id = env.ROOMS.idFromName(roomName);
    return env.ROOMS.get(id).fetch(request);
  }
};

export class GolfRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
    this.clients = new Map();
    this.loaded = this.ctx.storage.get("state").then((saved) => {
      this.room = saved || makeRoomState();
      for (const ws of this.ctx.getWebSockets()) {
        const meta = ws.deserializeAttachment() || {};
        if (meta.playerId) this.clients.set(ws, meta);
      }
    });
  }

  async fetch(request) {
    await this.loaded;
    if (request.headers.get("Upgrade") !== "websocket") {
      return json(this.publicState());
    }

    const url = new URL(request.url);
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    const playerId = cleanId(url.searchParams.get("player"));
    const name = cleanName(url.searchParams.get("name"));

    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ playerId, name });
    this.clients.set(server, { playerId, name });
    this.upsertPlayer(playerId, name, true);
    await this.saveAndBroadcast();

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, message) {
    await this.loaded;
    const meta = this.clients.get(ws) || ws.deserializeAttachment() || {};
    if (!meta.playerId) return;

    let data;
    try {
      data = JSON.parse(message);
    } catch {
      return;
    }

    if (data.type === "setScore") {
      const hole = clamp(Number(data.hole) || this.room.hole, 1, HOLES);
      const strokes = clamp(Number(data.strokes) || 0, 0, 99);
      this.room.scores[meta.playerId] ||= {};
      if (strokes === 0) delete this.room.scores[meta.playerId][String(hole)];
      else this.room.scores[meta.playerId][String(hole)] = strokes;
      this.room.updatedAt = Date.now();
      await this.saveAndBroadcast();
    }

    if (data.type === "shot") {
      this.broadcast({
        type: "shot",
        playerId: meta.playerId,
        name: meta.name,
        level: clamp(Number(data.level) || 1, 1, HOLES),
        stroke: clamp(Number(data.stroke) || 1, 1, 999),
        position: cleanVec3(data.position),
        velocity: cleanVec3(data.velocity),
        at: Date.now()
      });
    }

    if (data.type === "holeFinished") {
      const level = clamp(Number(data.level) || this.room.hole, 1, HOLES);
      const strokes = clamp(Number(data.strokes) || 0, 0, 99);
      this.room.scores[meta.playerId] ||= {};
      if (strokes > 0) this.room.scores[meta.playerId][String(level)] = strokes;
      this.room.hole = level;
      this.room.updatedAt = Date.now();
      await this.saveAndBroadcast();
    }

    if (data.type === "setHole") {
      this.room.hole = clamp(Number(data.hole) || 1, 1, HOLES);
      this.room.updatedAt = Date.now();
      await this.saveAndBroadcast();
    }

    if (data.type === "resetScores") {
      this.room.hole = 1;
      this.room.scores = {};
      this.room.chat = [...this.room.chat, systemLine(`${meta.name} reset the scorecard.`)].slice(-MAX_CHAT);
      this.room.updatedAt = Date.now();
      await this.saveAndBroadcast();
    }

    if (data.type === "chat") {
      const text = cleanChat(data.text);
      if (!text) return;
      this.room.chat = [...this.room.chat, { name: meta.name, text, at: Date.now() }].slice(-MAX_CHAT);
      this.room.updatedAt = Date.now();
      await this.saveAndBroadcast();
    }
  }

  async webSocketClose(ws) {
    await this.markOffline(ws);
  }

  async webSocketError(ws) {
    await this.markOffline(ws);
  }

  async markOffline(ws) {
    await this.loaded;
    const meta = this.clients.get(ws) || ws.deserializeAttachment() || {};
    this.clients.delete(ws);
    if (!meta.playerId) return;
    const stillConnected = [...this.clients.values()].some((client) => client.playerId === meta.playerId);
    if (!stillConnected) {
      const player = this.room.players.find((item) => item.id === meta.playerId);
      if (player) player.online = false;
      this.room.updatedAt = Date.now();
      await this.saveAndBroadcast();
    }
  }

  upsertPlayer(id, name, online) {
    const existing = this.room.players.find((player) => player.id === id);
    if (existing) {
      existing.name = name;
      existing.online = online;
      existing.seenAt = Date.now();
      return;
    }
    this.room.players.push({ id, name, online, joinedAt: Date.now(), seenAt: Date.now() });
  }

  async saveAndBroadcast() {
    await this.ctx.storage.put("state", this.room);
    this.broadcast({ type: "state", state: this.publicState() });
  }

  broadcast(data) {
    const message = JSON.stringify(data);
    for (const ws of this.clients.keys()) {
      try {
        ws.send(message);
      } catch {
        this.clients.delete(ws);
      }
    }
  }

  publicState() {
    return {
      hole: this.room.hole,
      players: this.room.players,
      scores: this.room.scores,
      chat: this.room.chat,
      updatedAt: this.room.updatedAt
    };
  }
}

function makeRoomState() {
  return {
    hole: 1,
    players: [],
    scores: {},
    chat: [systemLine("Room created.")],
    updatedAt: Date.now()
  };
}

function systemLine(text) {
  return { name: "Room", text, at: Date.now() };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...corsHeaders()
    }
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type"
  };
}

function cleanRoom(value) {
  return String(value || "PARTY").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 12) || "PARTY";
}

function cleanId(value) {
  const id = String(value || crypto.randomUUID()).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 64);
  return id || crypto.randomUUID();
}

function cleanName(value) {
  return String(value || "Player").replace(/[<>]/g, "").trim().slice(0, 18) || "Player";
}

function cleanChat(value) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, 160);
}

function cleanVec3(value) {
  return {
    x: cleanNumber(value?.x),
    y: cleanNumber(value?.y),
    z: cleanNumber(value?.z)
  };
}

function cleanNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(-10000, Math.min(10000, number));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
