const crypto = require("crypto");
const http = require("http");

const PORT = Number(process.env.PORT || 8787);
const TILE = 16;
const WORLD_W = 96 * TILE;
const WORLD_H = 72 * TILE;
const rooms = new Map();

const regions = [
  { id: "dawnmere", boss: "bramble", start: [15, 18], bossGate: [34, 18] },
  { id: "vellforge", boss: "brass", start: [39, 17], bossGate: [45, 17] },
  { id: "moonwell", boss: "silt", start: [61, 16], bossGate: [67, 20] },
  { id: "saltglass", boss: "leviathan", start: [78, 25], bossGate: [84, 28] },
  { id: "ironroot", boss: "anvil", start: [32, 53], bossGate: [38, 58] },
  { id: "starfall", boss: "nullbell", start: [68, 53], bossGate: [78, 57] }
];

const bosses = {
  bramble: { name: "Bramble Crown", hp: 180, pattern: "ring" },
  brass: { name: "The Brass Maw", hp: 230, pattern: "sweep" },
  silt: { name: "Silt Oracle", hp: 260, pattern: "rain" },
  leviathan: { name: "Harbor Leviathan", hp: 300, pattern: "waves" },
  anvil: { name: "Moon-Anvil Titan", hp: 340, pattern: "walls" },
  nullbell: { name: "The Null Bell", hp: 420, pattern: "spiral" }
};

const server = http.createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/plain" });
  response.end("Bossbound Party room server is running.\n");
});

server.on("upgrade", (request, socket) => {
  if (!request.headers["sec-websocket-key"]) {
    socket.destroy();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const roomId = cleanRoom(url.searchParams.get("room") || "party");
  const room = getRoom(roomId);
  const playerIndex = room.clients[0] ? 1 : 0;
  const name = String(url.searchParams.get("name") || (playerIndex ? "Ember" : "Rowan")).slice(0, 12);
  const className = String(url.searchParams.get("class") || "Vanguard").slice(0, 16);

  socket.write(handshake(request.headers["sec-websocket-key"]));
  room.clients[playerIndex]?.destroy();
  room.clients[playerIndex] = socket;
  Object.assign(room.players[playerIndex], { name, className, active: true });
  socket.playerIndex = playerIndex;
  socket.roomId = roomId;

  send(socket, { type: "welcome", playerIndex, room: roomId });
  broadcast(room);

  socket.on("data", (buffer) => {
    for (const frame of decodeFrames(buffer)) {
      if (frame.type === "close") {
        socket.end();
        return;
      }
      if (frame.type !== "text") continue;
      try {
        const data = JSON.parse(frame.value);
        if (data.type === "input") room.inputs[playerIndex] = normalizeInput(data.input);
        if (data.type === "action" && data.action === "startBattle") startBattle(room, data.bossId);
      } catch {
        // Drop malformed client messages.
      }
    }
  });

  socket.on("close", () => {
    if (room.clients[playerIndex] === socket) room.clients[playerIndex] = null;
    room.players[playerIndex].active = false;
    room.inputs[playerIndex] = blankInput();
  });
  socket.on("error", () => {
    if (room.clients[playerIndex] === socket) room.clients[playerIndex] = null;
    room.players[playerIndex].active = false;
    room.inputs[playerIndex] = blankInput();
  });
});

setInterval(() => {
  for (const room of rooms.values()) updateRoom(room, 1 / 30);
}, 1000 / 30);

setInterval(() => {
  for (const room of rooms.values()) broadcast(room);
}, 1000 / 15);

server.listen(PORT, () => {
  console.log(`Bossbound Party room server listening on ws://127.0.0.1:${PORT}`);
});

function getRoom(id) {
  if (!rooms.has(id)) rooms.set(id, createRoom(id));
  return rooms.get(id);
}

function createRoom(id) {
  return {
    id,
    clients: [null, null],
    inputs: [blankInput(), blankInput()],
    regionIndex: 0,
    notes: 0,
    flags: {},
    battle: null,
    players: [
      makePlayer("Rowan", "Vanguard", 15, 18, "#3a8f56"),
      makePlayer("Ember", "Minstrel", 16, 18, "#4a80c8")
    ]
  };
}

function makePlayer(name, className, tx, ty, color) {
  return { name, className, active: false, x: tx * TILE, y: ty * TILE, hp: 100, maxHp: 100, dir: "down", anim: 0, state: "idle", color };
}

function updateRoom(room, dt) {
  room.players.forEach((player, index) => {
    player.active = Boolean(room.clients[index]);
    if (!player.active) return;
    if (room.battle) updateBattlePlayer(room, player, index, room.inputs[index], dt);
    else movePlayer(player, room.inputs[index], dt);
  });
  if (room.battle) updateBattle(room, dt);
}

function movePlayer(player, input, dt) {
  const moving = input.x || input.y;
  const speed = input.dash ? 78 : 48;
  const len = Math.hypot(input.x, input.y) || 1;
  if (moving) {
    player.x = clamp(player.x + input.x / len * speed * dt, 8, WORLD_W - 8);
    player.y = clamp(player.y + input.y / len * speed * dt, 8, WORLD_H - 8);
    player.dir = Math.abs(input.x) > Math.abs(input.y) ? (input.x > 0 ? "right" : "left") : (input.y > 0 ? "down" : "up");
    player.anim += dt * 8;
    player.state = input.dash ? "dash" : "walk";
  } else {
    player.anim += dt * 2;
    player.state = "idle";
  }
}

function startBattle(room, bossId) {
  if (!bosses[bossId]) return;
  const boss = bosses[bossId];
  room.battle = {
    bossId,
    hp: boss.hp,
    maxHp: boss.hp,
    timer: 0,
    phase: 0,
    attackCd: [0, 0],
    souls: [
      { x: 112, y: 126 },
      { x: 128, y: 126 }
    ],
    bullets: []
  };
}

function updateBattlePlayer(room, player, index, input, dt) {
  const soul = room.battle.souls[index];
  if (!soul) return;
  soul.x = clamp(soul.x + input.x * 74 * dt, 62, 178);
  soul.y = clamp(soul.y + input.y * 74 * dt, 104, 148);
  room.battle.attackCd[index] -= dt;
  if (input.attack && room.battle.attackCd[index] <= 0) {
    room.battle.attackCd[index] = .55;
    room.battle.hp -= player.className === "Arcanist" ? 18 : 14;
  }
}

function updateBattle(room, dt) {
  const battle = room.battle;
  const boss = bosses[battle.bossId];
  battle.timer += dt;
  battle.phase -= dt;
  if (battle.phase <= 0) {
    battle.phase = .32;
    spawnPattern(battle, boss);
  }
  for (let i = battle.bullets.length - 1; i >= 0; i -= 1) {
    const bullet = battle.bullets[i];
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    bullet.life -= dt;
    room.players.forEach((player, index) => {
      if (!player.active || player.hp <= 0) return;
      const soul = battle.souls[index];
      if (soul && Math.hypot(bullet.x - soul.x, bullet.y - soul.y) < 5) {
        player.hp = Math.max(0, player.hp - 7);
        bullet.life = 0;
      }
    });
    if (bullet.life <= 0 || bullet.x < 45 || bullet.x > 195 || bullet.y < 90 || bullet.y > 156) {
      battle.bullets.splice(i, 1);
    }
  }
  if (battle.hp <= 0) advanceRegion(room);
  if (!activePlayers(room).length) resetToRegionStart(room);
}

function spawnPattern(battle, boss) {
  const t = battle.timer;
  if (boss.pattern === "ring") {
    for (let i = 0; i < 8; i += 1) pushBullet(battle, 120, 72, Math.cos(t + i) * 38, Math.sin(t + i) * 38, "#7de06f");
  } else if (boss.pattern === "sweep") {
    pushBullet(battle, 60 + (Math.sin(t * 2) + 1) * 60, 96, 0, 48, "#ffc163");
    pushBullet(battle, 180 - (Math.sin(t * 2) + 1) * 60, 96, 0, 48, "#ffc163");
  } else if (boss.pattern === "rain") {
    for (let i = 0; i < 4; i += 1) pushBullet(battle, 60 + Math.random() * 120, 96, 0, 42 + Math.random() * 25, "#a8c8ff");
  } else if (boss.pattern === "waves") {
    pushBullet(battle, 60, 118 + Math.sin(t * 5) * 20, 52, 0, "#55e0d7");
    pushBullet(battle, 180, 118 + Math.cos(t * 5) * 20, -52, 0, "#55e0d7");
  } else if (boss.pattern === "walls") {
    for (let y = 104; y <= 148; y += 14) pushBullet(battle, 60, y, 46, 0, "#deb375");
  } else {
    for (let i = 0; i < 5; i += 1) {
      const a = t * 2 + i * 1.2;
      pushBullet(battle, 120, 126, Math.cos(a) * 55, Math.sin(a) * 55, "#caa2ff");
    }
  }
}

function pushBullet(battle, x, y, vx, vy, color) {
  battle.bullets.push({ x, y, vx, vy, color, life: 4 });
}

function advanceRegion(room) {
  room.notes = Math.max(room.notes, room.regionIndex + 1);
  room.flags[`${regions[room.regionIndex].id}Cleared`] = true;
  room.regionIndex = Math.min(regions.length - 1, room.regionIndex + 1);
  resetToRegionStart(room);
  room.battle = null;
}

function resetToRegionStart(room) {
  const region = regions[room.regionIndex];
  room.players.forEach((player, index) => {
    player.x = (region.start[0] + index) * TILE;
    player.y = region.start[1] * TILE;
    player.hp = player.maxHp;
    player.state = "idle";
  });
  room.battle = null;
}

function activePlayers(room) {
  return room.players.filter((player) => player.active && player.hp > 0);
}

function snapshot(room) {
  return {
    regionIndex: room.regionIndex,
    notes: room.notes,
    flags: room.flags,
    players: room.players,
    battle: room.battle
  };
}

function broadcast(room) {
  const payload = { type: "state", state: snapshot(room) };
  room.clients.forEach((client) => send(client, payload));
}

function send(socket, data) {
  if (!socket || socket.destroyed) return;
  socket.write(encodeFrame(JSON.stringify(data)));
}

function handshake(key) {
  const accept = crypto.createHash("sha1").update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest("base64");
  return [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${accept}`,
    "",
    ""
  ].join("\r\n");
}

function encodeFrame(text) {
  const payload = Buffer.from(text);
  if (payload.length < 126) return Buffer.concat([Buffer.from([0x81, payload.length]), payload]);
  const header = Buffer.alloc(4);
  header[0] = 0x81;
  header[1] = 126;
  header.writeUInt16BE(payload.length, 2);
  return Buffer.concat([header, payload]);
}

function decodeFrames(buffer) {
  const messages = [];
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const opcode = buffer[offset] & 0x0f;
    const masked = (buffer[offset + 1] & 0x80) !== 0;
    let length = buffer[offset + 1] & 0x7f;
    offset += 2;
    if (length === 126) {
      if (offset + 2 > buffer.length) break;
      length = buffer.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      break;
    }
    if (!masked || offset + 4 + length > buffer.length) break;
    const mask = buffer.subarray(offset, offset + 4);
    offset += 4;
    const payload = buffer.subarray(offset, offset + length);
    offset += length;
    for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
    messages.push(opcode === 8 ? { type: "close" } : { type: "text", value: payload.toString("utf8") });
  }
  return messages;
}

function normalizeInput(input = {}) {
  return {
    x: clamp(Number(input.x) || 0, -1, 1),
    y: clamp(Number(input.y) || 0, -1, 1),
    attack: input.attack === true,
    dash: input.dash === true
  };
}

function blankInput() {
  return { x: 0, y: 0, attack: false, dash: false };
}

function cleanRoom(room) {
  return String(room).toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 24) || "party";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
