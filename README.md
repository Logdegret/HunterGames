# Hunter Games

A fast HTML5 game portal. Pick a game, play instantly in the browser — no installs, no accounts required.

## What's inside

- **300+ games** curated from FreezeNova, itch.io, Classroom6x, and Google Sites
- **Bossbound Party** — a local pixel-art isometric RPG with solo, co-op, and online rooms
- **Open Golf Online** — rebuilt Open-Golf with party rooms, synced shots, scorecards, and chat
- **Daily streak & XP system** — play one game a day to keep your streak and level up
- **Game of the Day spotlight** — rotates daily from the library
- **Surprise me** — random game picker with mood filters (Quick / Chill / Challenge / 2 Player)
- **Search** — instant filter across the full game library

## Project structure

```
index.html          Main portal page
script.js           Game library data and portal logic
styles.css          Styles
games/
  bossbound/        Bossbound Party (HTML5 RPG + local server)
  open-golf/        Open Golf (compiled Wasm build)
  open-golf-online/ Open Golf Online lobby page
  typer/            Typing game
cloudflare/
  open-golf-worker/ Cloudflare Worker — multiplayer signaling for Open Golf
```

## Running locally

Any static file server works:

```bash
npx serve .
# or
python3 -m http.server
```

Open `http://localhost:3000` (or whatever port your server uses).

> Bossbound's online rooms use a separate Node server at `games/bossbound/server.js`. Run it with `node games/bossbound/server.js`.

## Open Golf multiplayer worker

The Cloudflare Worker under `cloudflare/open-golf-worker/` handles WebSocket signaling for Open Golf party rooms. See [`cloudflare/open-golf-worker/README.md`](cloudflare/open-golf-worker/README.md) for deploy instructions.

## Adding games

Games are declared as arrays/objects at the top of [`script.js`](script.js). Each source has its own collection:

| Variable | Source |
|---|---|
| `freezeNovaGames` | FreezeNova |
| `licensedItchGames` | itch.io (open-licensed) |
| `classroomGames` | Classroom6x |
| `googleSiteGames` | Google Sites |
| `localGames` | Games hosted in this repo |
| `openSourceGames` | Open source games with embed |

Add an entry to the appropriate array and it will appear in the library automatically.
