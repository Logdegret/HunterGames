# 🎮 Hunter Games

A browser-based game hub with 12 hand-picked unblocked games, user accounts, friends, and real-time playtime tracking — all running as a static GitHub Pages site backed by Supabase.

**Live site:** [logdegret.github.io/HunterGames](https://logdegret.github.io/HunterGames/)

---

## Features

- **12 playable games** — arcade, sports, racing, puzzle, and sandbox
- **User accounts** — sign up with email + chosen username
- **Friends system** — add friends by username, see who's online
- **Playtime tracking** — per-game stats, total hours, XP, most-played
- **Surprise button** — shuffle icon picks a random game
- **Fullscreen & pop-out** — play in-page, fullscreen, or in a new tab
- **Persistent sessions** — stays signed in across tab closes and reopens
- **No server required** — GitHub Pages + Supabase, zero backend to run

---

## Games

| Game | Category | Players | Controls |
|------|----------|---------|----------|
| **Snow Rider 3D** | Arcade / Racing | 1 | Arrow keys or WASD |
| **Bottle Flip 3D** | Skill | 1 | Click / tap to flip |
| **Rooftop Snipers** | Arcade | 1–2 | P1: W to jump/shoot · P2: ↑ to jump/shoot |
| **Basket Random** | Sports | 1–2 | P1: W · P2: ↑ |
| **PolyTrack v0.6.0** | Racing | 1 | Arrow keys or WASD |
| **Eaglercraft** | Sandbox | 1 | WASD + mouse (Minecraft-style) |
| **Stacktris** | Puzzle | 1 | Arrow keys or mouse |
| **Run 3** | Arcade / Runner | 1 | Arrow keys |
| **Basketball Stars** | Sports | 1–2 | P1: WASD · P2: Arrow keys |
| **Slope** | Arcade / Runner | 1 | A/D or Left/Right arrows |
| **Tunnel Rush** | Arcade / Runner | 1 | A/D or Left/Right arrows |
| **Retro Bowl** | Sports | 1 | Mouse / click |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML, CSS, JavaScript (no frameworks) |
| Hosting | GitHub Pages (static) |
| Auth & Database | [Supabase](https://supabase.com) |
| Fonts | Google Fonts — Archivo Black + Manrope |

### Database schema (Supabase)

```
profiles     — id, username, current_game, last_played, last_seen
playtime     — user_id, game_id, seconds, plays
friendships  — user_id, friend_id (both directions stored)
```

Full schema SQL is in [`supabase-schema.sql`](supabase-schema.sql).

---

## Run locally

```bash
# Clone the repo
git clone https://github.com/Logdegret/HunterGames.git
cd HunterGames

# Start the local dev server (Node, no dependencies)
PORT=7777 node server.js
```

Then open [http://localhost:7777](http://localhost:7777).

> The server is only needed locally because browsers block `file://` iframes.  
> On GitHub Pages the static files are served directly — `server.js` is not deployed.

---

## Supabase setup (for your own fork)

1. Create a project at [supabase.com](https://supabase.com)
2. Run [`supabase-schema.sql`](supabase-schema.sql) in the SQL editor
3. Go to **Authentication → Providers → Email** and turn off **Confirm email**
4. Copy your **Project URL** and **anon public key** from **Project Settings → API**
5. Paste them into `app.js`:

```js
const SUPABASE_URL  = "https://your-project.supabase.co";
const SUPABASE_ANON = "your-anon-key";
```

6. Push to GitHub — Pages does the rest.

---

## File structure

```
HunterGames/
├── index.html          # App shell and all views
├── styles.css          # All styles (dark red theme)
├── app.js              # Game data, routing, Supabase calls, rendering
├── favicon.png         # Hunter Games logo icon
├── server.js           # Local dev server only (not used in production)
├── supabase-schema.sql # Full DB schema + RLS + RPCs
└── README.md           # This file
```

---

## Credits

Built by [Logdegret](https://github.com/Logdegret). Game assets and thumbnails belong to their respective creators.

---

## AI Usage

This project is less than 30% AI-assisted. [Claude](https://claude.ai) (Anthropic) was used in a limited capacity for:

- Helping debug specific issues (session persistence, RLS policy violations, broken iframes)
- Assisting with the Supabase schema and RPC setup
- Finding working iframe URLs for games
- Processing and cropping the favicon image
- Writing this README
- Pushing some things to github

The majority of the design, code, and project decisions were made by [Logdegret](https://github.com/Logdegret).
