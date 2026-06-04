# Open-Golf Multiplayer Build

This folder contains a rebuilt Open-Golf web build.

Changes from upstream:

- `golf.js` exports `ccall`/`cwrap`.
- `golf.wasm` exports `golf_multiplayer_apply_remote_shot`.
- Local shots call `window.openGolfLocalShot`.
- Finished holes call `window.openGolfHoleFinished`.

The built-in panel in `index.html` sends those events through the Cloudflare room server, and applies remote shots back into the Open-Golf engine with:

```js
Module.ccall("golf_multiplayer_apply_remote_shot", ...)
```

This is the first party-room multiplayer pass: shots are synchronized through the actual Open-Golf engine. It is not yet a full authoritative server simulation.
