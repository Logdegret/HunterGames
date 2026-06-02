# Adding self-hosted HTML5 games

Only add games that you are allowed to redistribute and monetize. Free-to-play is not the same as open source.

For an itch.io HTML5 game, check the project page for a license such as MIT, Apache, GPL, CC BY, CC0, or an explicit redistribution grant. Then export or download the web build and place it like this:

```text
games/
  game-slug/
    index.html
    assets/
    license.txt
```

In `script.js`, add a game entry with an embed path like:

```js
["Game Title", "Arcade", "https://itch.io/source-or-license-page", "./games/game-slug/index.html", "./games/game-slug/cover.png", "Description.", "Controls"]
```

Hunter Games will show the pre-game ad panel before loading either local games or remote iframe games.

There is also a sample manifest at `games/local-games.example.json` if you want to keep track of approved local games before adding them to the main catalog.

## Bossbound Party multiplayer plan

`games/bossbound/index.html` supports local co-op immediately and can join online rooms through `games/bossbound/server.js`.

To test online multiplayer on your computer:

```sh
node games/bossbound/server.js
```

Then open the site in two browser windows, load Bossbound Party in both, use the same room code, and click **Join online co-op**. The first window becomes Player 1 and the second becomes Player 2.

Controls:

```text
Solo / online: WASD move, Space attack, Shift dash, E enter structures
Local Player 1: WASD move, Space attack, Shift dash, E enter structures
Local Player 2: arrows move, Enter attack, / dash
```

For deployment, host `server.js` on Render, Railway, Fly.io, or a VPS, then paste that WebSocket URL into the game's Server field. Use `ws://` for local testing and `wss://` for an HTTPS production site.

### Free always-online option

For the closest thing to a free "forever online" setup, use **Cloudflare Workers + Durable Objects**:

1. Keep the static Hunter Games site on GitHub Pages, Cloudflare Pages, Netlify, or your current host.
2. Move the room logic from `games/bossbound/server.js` into a Cloudflare Durable Object class called `BossboundRoom`.
3. Use one Durable Object instance per room code. For example, room `party` maps to one object that owns the players, boss, quests, and snapshots for that room.
4. Use Cloudflare's WebSocket Hibernation API so quiet rooms can sleep without dropping connected clients.
5. Put the Worker URL in the game's Server field, like `wss://bossbound-online.yourname.workers.dev?room=party`.

This is better than trying to keep a free VPS awake forever. Free tiers can change and have limits, so design rooms to hibernate, send fewer snapshots when nobody is moving, and shut down empty rooms quickly.

For a larger production version:

1. Use **Colyseus** for rooms, matchmaking, and shared game state. It is a good fit for browser action games because it handles WebSockets, room codes, reconnection, and authoritative server state.
2. Host the Colyseus server on **Render**, **Railway**, **Fly.io**, or a small VPS. The static site can stay where it is, but online play needs this separate Node.js server.
3. Keep movement and combat server-authoritative. The browser should send inputs like `left`, `right`, `attack`, and `dash`; the server should update player positions, boss health, quests, and damage.
4. Send compact snapshots from the server about 15-20 times per second, then smooth/interpolate positions in the browser.
5. Start with private room codes before public matchmaking. Co-op boss games feel better when players can invite friends first.

Good starter stack:

```text
Client: Phaser 3 or PixiJS
Server: Node.js + Colyseus
Hosting: Render/Railway/Fly.io
Protocol: WebSockets through Colyseus
```

For animated characters, the easiest path is **Spine 2D** if you want polished skeletal animation, or **Aseprite** if you want pixel-art sprite sheets. For free/lower-cost tools, use **LibreSprite** for sprite sheets or **DragonBones** for skeletal rigs. Phaser 3 can play sprite sheets directly, and PixiJS works well with Spine-style rigs.
