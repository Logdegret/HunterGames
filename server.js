const crypto = require("crypto");
const { execSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const DEV_PASS = "GolfDude88";
const APP_JS = path.join(__dirname, "app.js");

const PORT = process.env.PORT || 4173;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DB_FILE = path.join(DATA_DIR, "store.json");
const ONLINE_MS = 90 * 1000;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function defaultDb() {
  return { users: [], sessions: {}, friendships: [] };
}

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch {
    return defaultDb();
  }
}

function writeDb(db) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function normalizeUsername(username) {
  return String(username || "").trim().replace(/\s+/g, "_").slice(0, 24);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(String(password || ""), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt] = String(stored || "").split(":");
  return hashPassword(password, salt) === stored;
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    initials: initials(user.username),
    online: Date.now() - (user.lastSeen || 0) < ONLINE_MS,
    currentGame: user.currentGame || null
  };
}

function initials(name) {
  return String(name || "?")
    .replace(/[^a-z0-9_ -]/gi, "")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";
}

function getUserFromRequest(req, db) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const userId = db.sessions[token];
  const user = db.users.find((item) => item.id === userId);
  return user ? { token, user } : null;
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) reject(new Error("Body too large"));
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function userStats(user) {
  const perGame = user.playtime || {};
  const entries = Object.entries(perGame);
  const totalSeconds = entries.reduce((sum, [, item]) => sum + (item.seconds || 0), 0);
  const plays = entries.reduce((sum, [, item]) => sum + (item.plays || 0), 0);
  const mostPlayed = entries
    .map(([gameId, item]) => ({ gameId, seconds: item.seconds || 0 }))
    .sort((a, b) => b.seconds - a.seconds)[0] || null;

  return {
    totalSeconds,
    plays,
    xp: Math.floor(totalSeconds / 60) * 10 + plays * 25,
    lastPlayed: user.lastPlayed || null,
    currentGame: user.currentGame || null,
    mostPlayed,
    perGame
  };
}

function friendshipExists(db, a, b) {
  return db.friendships.some((pair) => pair.includes(a) && pair.includes(b));
}

async function handleApi(req, res, pathname) {
  const db = readDb();
  const body = req.method === "GET" ? {} : await parseBody(req);

  if (pathname === "/api/signup" && req.method === "POST") {
    const username = normalizeUsername(body.username);
    if (!/^[a-z0-9_ -]{3,24}$/i.test(username) || String(body.password || "").length < 4) {
      return send(res, 400, { error: "Use a username with 3-24 characters and a password with at least 4 characters." });
    }
    if (db.users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      return send(res, 409, { error: "That username is already taken." });
    }
    const user = {
      id: crypto.randomUUID(),
      username,
      password: hashPassword(body.password),
      createdAt: Date.now(),
      lastSeen: Date.now(),
      currentGame: null,
      lastPlayed: null,
      playtime: {}
    };
    const token = crypto.randomBytes(24).toString("hex");
    db.users.push(user);
    db.sessions[token] = user.id;
    writeDb(db);
    return send(res, 200, { token, user: publicUser(user), stats: userStats(user) });
  }

  if (pathname === "/api/login" && req.method === "POST") {
    const username = normalizeUsername(body.username);
    const user = db.users.find((item) => item.username.toLowerCase() === username.toLowerCase());
    if (!user || !verifyPassword(body.password, user.password)) {
      return send(res, 401, { error: "Username or password is wrong." });
    }
    const token = crypto.randomBytes(24).toString("hex");
    user.lastSeen = Date.now();
    db.sessions[token] = user.id;
    writeDb(db);
    return send(res, 200, { token, user: publicUser(user), stats: userStats(user) });
  }

  const session = getUserFromRequest(req, db);
  if (!session) return send(res, 401, { error: "Please sign in first." });
  const { token, user } = session;

  if (pathname === "/api/me" && req.method === "GET") {
    user.lastSeen = Date.now();
    writeDb(db);
    return send(res, 200, { user: publicUser(user), stats: userStats(user) });
  }

  if (pathname === "/api/logout" && req.method === "POST") {
    delete db.sessions[token];
    user.currentGame = null;
    user.lastSeen = Date.now() - ONLINE_MS;
    writeDb(db);
    return send(res, 200, { ok: true });
  }

  if (pathname === "/api/heartbeat" && req.method === "POST") {
    user.lastSeen = Date.now();
    user.currentGame = body.currentGame || null;
    writeDb(db);
    return send(res, 200, { user: publicUser(user), stats: userStats(user) });
  }

  if (pathname === "/api/play-start" && req.method === "POST") {
    const gameId = String(body.gameId || "");
    user.lastSeen = Date.now();
    user.currentGame = gameId;
    user.lastPlayed = gameId;
    user.playtime[gameId] = user.playtime[gameId] || { seconds: 0, plays: 0 };
    user.playtime[gameId].plays += 1;
    writeDb(db);
    return send(res, 200, { stats: userStats(user) });
  }

  if (pathname === "/api/playtime" && req.method === "POST") {
    const gameId = String(body.gameId || "");
    const seconds = Math.max(0, Math.min(120, Number(body.seconds) || 0));
    user.lastSeen = Date.now();
    if (gameId && seconds) {
      user.currentGame = gameId;
      user.lastPlayed = gameId;
      user.playtime[gameId] = user.playtime[gameId] || { seconds: 0, plays: 0 };
      user.playtime[gameId].seconds += seconds;
    }
    writeDb(db);
    return send(res, 200, { stats: userStats(user) });
  }

  if (pathname === "/api/friends" && req.method === "GET") {
    user.lastSeen = Date.now();
    const ids = db.friendships
      .filter((pair) => pair.includes(user.id))
      .map((pair) => pair.find((id) => id !== user.id));
    const friends = ids
      .map((id) => db.users.find((item) => item.id === id))
      .filter(Boolean)
      .map(publicUser);
    writeDb(db);
    return send(res, 200, { friends });
  }

  if (pathname === "/api/friends/add" && req.method === "POST") {
    const friendName = normalizeUsername(body.username);
    const friend = db.users.find((item) => item.username.toLowerCase() === friendName.toLowerCase());
    if (!friend) return send(res, 404, { error: "No user with that username." });
    if (friend.id === user.id) return send(res, 400, { error: "You are already on your own squad." });
    if (!friendshipExists(db, user.id, friend.id)) db.friendships.push([user.id, friend.id]);
    user.lastSeen = Date.now();
    writeDb(db);
    return send(res, 200, { friend: publicUser(friend) });
  }

  if (pathname === "/api/dev/add-game" && req.method === "POST") {
    if (body.devPass !== DEV_PASS) return send(res, 403, { error: "Bad dev password." });
    const { id, title, url, category = "Custom", tags = ["Custom"], description = "" } = body;
    if (!id || !title || !url) return send(res, 400, { error: "id, title, and url are required." });

    const src = fs.readFileSync(APP_JS, "utf8");
    const marker = "const games = [";
    const idx = src.indexOf(marker);
    if (idx === -1) return send(res, 500, { error: "Could not find games array in app.js." });

    const insertAt = idx + marker.length;
    const newEntry = `\n  { id: ${JSON.stringify(id)}, title: ${JSON.stringify(title)}, category: ${JSON.stringify(category)}, tags: ${JSON.stringify(tags)}, description: ${JSON.stringify(description)}, url: ${JSON.stringify(url)}, thumbnail: null },`;
    const updated = src.slice(0, insertAt) + newEntry + src.slice(insertAt);
    fs.writeFileSync(APP_JS, updated, "utf8");

    try {
      const dir = __dirname;
      const safeTitle = title.replace(/["`$\\]/g, "");
      execSync(`git add app.js && git commit -m "Add game: ${safeTitle}" && git push`, { cwd: dir, shell: true });
    } catch (gitErr) {
      return send(res, 200, { ok: true, warning: "Game added to app.js but git push failed: " + gitErr.message });
    }
    return send(res, 200, { ok: true });
  }

  send(res, 404, { error: "Not found." });
}

function serveStatic(req, res, pathname) {
  const filePath = pathname === "/" ? path.join(ROOT, "index.html") : path.join(ROOT, pathname);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(ROOT, "index.html"), (fallbackError, fallbackData) => {
        if (fallbackError) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": mime[".html"] });
        res.end(fallbackData);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": mime[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }
    serveStatic(req, res, decodeURIComponent(url.pathname));
  } catch (error) {
    send(res, 500, { error: error.message });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Nexus Games running at http://localhost:${PORT}`);
});
