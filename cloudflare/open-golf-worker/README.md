# Open Golf Multiplayer Worker

This Cloudflare Worker gives the GitHub Pages game a free 24/7 multiplayer backend for friend rooms.

It uses:

- Workers for the public WebSocket URL
- Durable Objects for one shared room per room code
- SQLite-backed Durable Objects so it works on the Workers Free plan
- Hibernatable WebSockets so quiet rooms can sleep

## Deploy

Install Wrangler if you have not already:

```sh
npm install -g wrangler
```

Log in:

```sh
wrangler login
```

From this folder:

```sh
wrangler deploy
```

Wrangler will print a URL like:

```text
https://hunter-open-golf.YOURNAME.workers.dev
```

Use the WebSocket version in the game:

```text
wss://hunter-open-golf.YOURNAME.workers.dev
```

## GitHub Pages setup

1. Publish the main site to GitHub Pages.
2. Open `Open Golf Online`.
3. Paste your Worker WebSocket URL into the room panel.
4. Click **Join**.
5. Use **Copy** to invite a friend.

The copied link includes the server and room code, so friends should land in the same room.

## What syncs

- Player list
- Online/away state
- Current hole
- Scorecard
- Chat

The embedded Open Golf game is still the original client-side browser build. Players enter strokes in the online scorecard after each hole. Deep physics sync would require modifying the Open-Golf C/WebAssembly source directly.
