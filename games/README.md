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
