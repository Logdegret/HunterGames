const freezeNovaGames = [
  ["DuckCraft", "Minecraft", "https://cloud.freezenova.com/duckcraft.html", "https://cloud.freezenova.com/games/2026/more/duckcraft/game.html", "https://cloud.freezenova.com/media/posts/745/duckcraft-unblocked.webp", "Play with other players or build solo in a blocky sandbox world.", "WASD, mouse, inventory, chat"],
  ["Cluster Reborn", "Skill", "https://cloud.freezenova.com/cluster-reborn.html", "https://cloud.freezenova.com/games/2026/unity/cluster-reborn/game.html", "https://cloud.freezenova.com/media/posts/765/cluster-reborn-unblocked.webp", "Jump from truck to truck in a fast first-person platformer.", "WASD or arrows, Space"],
  ["Golf Bit", "Sports", "https://cloud.freezenova.com/golf-bit.html", "https://cloud.freezenova.com/games/2026/construct/328/golf-bit/game.html", "https://cloud.freezenova.com/media/posts/764/golf-bit-unblocked-fn.webp", "Line up shots and sink the ball across compact golf courses.", "Mouse, Space, or touch"],
  ["Baldi's Basics", "Escape", "https://cloud.freezenova.com/baldis-basics.html", "https://cloud.freezenova.com/cdn/index.html#/class3/baldis-basics", "https://cloud.freezenova.com/media/posts/763/baldis-basics-fn.webp", "Find notebooks and escape the school while avoiding Baldi.", "WASD, mouse, Space"],
  ["Cluster Rush", "Skill", "https://cloud.freezenova.com/cluster-rush.html", "https://cloud.freezenova.com/cdn/index.html#/class2/cluster-rush", "https://cloud.freezenova.com/media/posts/761/cluster-rush.webp", "Leap across speeding trucks and survive each chaotic route.", "A/D or arrows, Space"],
  ["Velocity Rush", "Skill", "https://cloud.freezenova.com/velocity-rush.html", "https://cloud.freezenova.com/games/2026/unity/velocity-rush/game.html", "https://cloud.freezenova.com/media/posts/760/velocity-rush-unblocked.webp", "Guide a rolling ball through obstacle courses at high speed.", "A/D, arrows, Space"],
  ["Snaker io", "Arcade", "https://cloud.freezenova.com/snaker-io.html", "https://cloud.freezenova.com/games/2026/more/snaker-io/game.html", "https://cloud.freezenova.com/media/posts/759/snaker-io-unblocked.webp", "Grow your neon snake in a multiplayer arena.", "Mouse, WASD, arrows"],
  ["Eagle Duckcraft", "Minecraft", "https://cloud.freezenova.com/eagle-duckcraft.html", "https://cloud.freezenova.com/cdn/index.html#/class2/eagle-duckcraft", "https://cloud.freezenova.com/media/posts/762/eagle-duckcraft.webp", "Explore, build, and survive in another blocky sandbox world.", "WASD, mouse, inventory"],
  ["Geometry Vector", "Arcade", "https://cloud.freezenova.com/geometry-vector.html", "https://cloud.freezenova.com/games/2026/construct/329/geometry-vector/game.html", "https://cloud.freezenova.com/media/posts/758/geometry-vector-unblocked.webp", "Pilot an arrow through spikes and rhythm-style traps.", "Mouse, Space, or touch"],
  ["Jungle Mart", "Idle", "https://cloud.freezenova.com/jungle-mart.html", "https://cloud.freezenova.com/games/2026/construct/339/jungle-mart/game.html", "https://cloud.freezenova.com/media/posts/757/jungle-mart-unblocked.webp", "Run a farm shop, stock shelves, and grow your business.", "WASD, arrows, drag"],
  ["Riddle School Transfer", "Adventure", "https://cloud.freezenova.com/riddle-school-transfer.html", "https://cloud.freezenova.com/games/2025/flash/riddle-school-transfer/game.html", "https://cloud.freezenova.com/media/posts/755/riddle-transfer-unblocked.webp", "Solve point-and-click puzzles in the Riddle School universe.", "Mouse"],
  ["Riddle School", "Adventure", "https://cloud.freezenova.com/riddle-school.html", "https://cloud.freezenova.com/games/2025/flash/riddle-school/game.html", "https://cloud.freezenova.com/media/posts/750/riddle-school-unblocked.webp", "Help Phil escape school in the classic point-and-click game.", "Mouse"],
  ["Backflip Challenge", "Skill", "https://cloud.freezenova.com/backflip-challenge.html", "https://cloud.freezenova.com/games/2026/unity/backflip-challenge/game.html", "https://cloud.freezenova.com/media/posts/743/backflip-challenge-game.webp", "Jump, flip, and land cleanly through playful stunt courses.", "Shown in game"],
  ["Age Of Battle", "Strategy", "https://cloud.freezenova.com/age-of-battle.html", "https://cloud.freezenova.com/games/2026/unity/age-of-battle/game.html", "https://cloud.freezenova.com/media/posts/744/age-of-battle-game.webp", "Command Stone Age units and push through waves of enemies.", "Mouse or touch"],
  ["Dublix", "Multiplayer", "https://cloud.freezenova.com/dublix.html", "https://cloud.freezenova.com/games/2025/unity4/dublix/game.html", "https://cloud.freezenova.com/media/posts/727/dublix-game.webp", "Explore a Roblox-inspired multiplayer world full of mini games.", "WASD, Space, Shift"],
  ["Fall Brainrots", "Escape", "https://cloud.freezenova.com/fall-brainrots.html", "https://cloud.freezenova.com/games/2026/unity/fall-brainrots/game.html", "https://cloud.freezenova.com/media/posts/742/fall-brainrots-game.webp", "Race through chaotic parkour courses with other players.", "WASD, mouse, Space"],
  ["99 Nights in the Forest Survival", "Adventure", "https://cloud.freezenova.com/99-nights-in-the-forest-survival.html", "https://cloud.freezenova.com/games/2026/unity/99-nights-in-the-forest-survival/game.html", "https://cloud.freezenova.com/media/posts/741/99-nights-in-the-forest-survival.webp", "Gather resources and survive day after day in a forest.", "WASD, mouse, Shift"],
  ["Steal Brainrot Heist", "3D", "https://cloud.freezenova.com/steal-brainrot-heist.html", "https://cloud.freezenova.com/games/2026/unity/steal-brainrot-heist/game.html", "https://cloud.freezenova.com/media/posts/739/steal-brainrot-heist-game.webp", "Collect Brainrots, build your space, and raid rivals.", "WASD, E, mouse"],
  ["Run 3", "Arcade", "https://cloud.freezenova.com/run-3.html", "https://cloud.freezenova.com/games/2026/unity/run-3/game.html", "https://cloud.freezenova.com/media/posts/740/run-3-freezenova.webp", "Run through tunnels and leap over gaps in a space runner.", "Shown in game"],
  ["Steal Brainrot Duel", "2 Player", "https://cloud.freezenova.com/steal-brainrot-duel.html", "https://cloud.freezenova.com/games/2025/rhm2/steal-brainrot-duel/game.html", "https://cloud.freezenova.com/media/posts/734/steal-brainrot-duel-game.webp", "Collect and steal Brainrots in solo or two-player matches.", "WASD/arrows, E/O, Space/L"],
  ["Steal Car Duel", "3D", "https://cloud.freezenova.com/steal-car-duel.html", "https://cloud.freezenova.com/games/2025/rhm2/steal-car-duel/game.html", "https://cloud.freezenova.com/media/posts/737/Steal-car-duel.webp", "Build a garage and steal cars in competitive matches.", "WASD/arrows, E/O"],
  ["Clash of Aliens", "Action", "https://cloud.freezenova.com/clash-of-aliens.html", "https://cloud.freezenova.com/games/2025/beedo2/clash-of-aliens/game.html", "https://cloud.freezenova.com/media/posts/738/Clash-of-Aliens.webp", "Defend your alien base with ships and strategy.", "Mouse"],
  ["Geometry Vibes 3D", "Escape", "https://cloud.freezenova.com/geometry-vibes-3d.html", "https://cloud.freezenova.com/games/2025/rhm2/geometry-vibes-3d/game.html", "https://cloud.freezenova.com/media/posts/736/geometry-vibes-3d.webp", "Fly through rhythm-based 3D hazards and collect stars.", "Mouse, Space, W"],
  ["Brainrot Mega Parkour", "Escape", "https://cloud.freezenova.com/brainrot-mega-parkour.html", "https://cloud.freezenova.com/games/2025/rhm2/brainrot-mega-parkour/game.html", "https://cloud.freezenova.com/media/posts/735/brainrot-mega-parkour-game.webp", "Jump and dash through a colorful Brainrot obstacle course.", "WASD, Space, Shift"],
  ["Wave Road 3D", "Escape", "https://cloud.freezenova.com/wave-road-3d.html", "https://cloud.freezenova.com/games/2025/rhm2/wave-road-3d/game.html", "https://cloud.freezenova.com/media/posts/733/wave-road-3d.webp", "Dodge obstacles and collect gems in fast flight-style levels.", "Mouse or Space"],
  ["Italian Brainrot Baby Clicker", "Clicker", "https://cloud.freezenova.com/italian-brainrot-baby-clicker.html", "https://cloud.freezenova.com/games/2025/rhm2/italian-brainrot-baby-clicker/game.html", "https://cloud.freezenova.com/media/posts/732/italian-brainrot-baby-clicker-game.webp", "Tap to unlock silly baby characters and upgrades.", "Mouse or Space"],
  ["Geometry Vibes Monster", "Skill", "https://cloud.freezenova.com/geometry-vibes-monster.html", "https://cloud.freezenova.com/games/2025/rhm2/geometry-vibes-monster/game.html", "https://cloud.freezenova.com/media/posts/731/geometry-vibes-monster-game.webp", "Survive monster-themed Geometry Vibes hazards.", "Mouse or Space"],
  ["Rocket Hero Clicker", "Clicker", "https://cloud.freezenova.com/rocket-hero-clicker.html", "https://cloud.freezenova.com/games/2025/unity4/rocket-hero-clicker/game.html", "https://cloud.freezenova.com/media/posts/728/rocket-hero-clicker.webp", "Click, shoot rockets, and clear playful portal creatures.", "Mouse or Space"],
  ["Snow Rider 3D", "Arcade", "https://cloud.freezenova.com/snow-rider-3d.html", "https://cloud.freezenova.com/games/2025/unity2/snow-rider-3d/game.html", "https://cloud.freezenova.com/media/posts/680/snow-rider-game.webp", "Race downhill, dodge winter obstacles, and collect gifts.", "Shown in game"],
  ["Chess", "Strategy", "https://cloud.freezenova.com/chess.html", "https://cloud.freezenova.com/games/2025/unity3/chess/game.html", "https://cloud.freezenova.com/media/posts/688/chess-freezenova.webp", "Play chess online, offline, or against the engine.", "Mouse"],
  ["Davo", "Escape", "https://cloud.freezenova.com/davo.html", "https://cloud.freezenova.com/games/2025/construct/302/davo/game.html", "https://cloud.freezenova.com/media/posts/724/davo-game.webp", "Master precise movement in a tough 2D platformer.", "WASD or arrows"],
  ["Fast Food Manager", "Simulator", "https://cloud.freezenova.com/fast-food-manager.html", "https://cloud.freezenova.com/games/2025/unity4/fast-food-manager/game.html", "https://cloud.freezenova.com/media/posts/723/fast-food-manager-game.webp", "Build a fast food business from fries to a full empire.", "WASD and mouse"],
  ["CubeCraft Survival", "Minecraft", "https://cloud.freezenova.com/cubecraft-survival.html", "https://cloud.freezenova.com/games/2025/unity4/cubecraft-survival/game.html", "https://cloud.freezenova.com/media/posts/722/cubecraft-survival-game.webp", "Explore, mine, craft, and survive in a blocky open world.", "WASD, mouse, Tab"],
  ["Clash Of Skulls", "Strategy", "https://cloud.freezenova.com/clash-of-skulls.html", "https://cloud.freezenova.com/games/2025/beedo/clash-of-skulls/game.html", "https://cloud.freezenova.com/media/posts/713/clash-of-skulls-games.webp", "Deploy skull units and overwhelm the opposing base.", "Shown in game"],
  ["Clash of Tanks", "Strategy", "https://cloud.freezenova.com/clash-of-tanks.html", "https://cloud.freezenova.com/games/2025/beedo/clash-of-tanks/game.html", "https://cloud.freezenova.com/media/posts/715/clash-of-tanks-game.webp", "Place tanks and push through the enemy defense line.", "Mouse"],
  ["BFFs Summer Aesthetic", "Puzzle", "https://cloud.freezenova.com/bffs-summer-aesthetic.html", "https://cloud.freezenova.com/games/2024/fabbox/bffs-summer-aesthetic/game.html", "https://cloud.freezenova.com/media/posts/716/bffs-summer-aesthetic-freezenova.webp", "Style summer outfits in a light fashion game.", "Mouse or touch"]
];

const licensedItchGames = [
  {
    title: "Greed II",
    category: "Puzzle",
    source: "itch.io",
    sourcePage: "https://markmehere.itch.io/greed-ii",
    embed: "https://html-classic.itch.zone/html/4016649/index.html",
    image: "https://img.itch.zone/aW1nLzU5NzA3NjYucG5n/original/X1Lyrc.png",
    description: "A compact puzzle-platformer about collecting coins and conquering small worlds.",
    controls: "Keyboard, gamepad, or touch",
    license: "MIT code, CC0 assets"
  },
  {
    title: "Closer",
    category: "Strategy",
    source: "itch.io",
    sourcePage: "https://not-jam.itch.io/closer",
    embed: "https://html-classic.itch.zone/html/12536655-1166274/index.html",
    image: "https://img.itch.zone/aW1nLzE5NDMwNTkwLnBuZw==/original/csTT0q.png",
    description: "A tense short strategy game where every coin flip brings the threat closer.",
    controls: "Mouse",
    license: "CC0 project"
  },
  {
    title: "Nano Siege",
    category: "Action",
    source: "itch.io",
    sourcePage: "https://achocolatebar.itch.io/nano-siege",
    embed: "https://html.itch.zone/html/13815896/NanoSiege/index.html",
    image: "https://img.itch.zone/aW1nLzIxMzkwMjI0LnBuZw==/original/ohkK07.png",
    description: "Survive waves of skeleton warriors in a miniature tabletop arena.",
    controls: "Shown in game",
    license: "MIT code"
  },
  {
    title: "To Shed New Light",
    category: "Puzzle",
    source: "itch.io",
    sourcePage: "https://eldskald.itch.io/to-shed-new-light",
    embed: "https://html-classic.itch.zone/html/4690444/index.html",
    image: "https://img.itch.zone/aW1nLzczMjg2MzgucG5n/original/0V5ZZu.png",
    description: "A perspective-shifting puzzle game with trippy abstract 3D scenes.",
    controls: "Mouse",
    license: "MIT code, CC0 assets"
  }
];

const classroomGames = [
  ["Among Us", "Multiplayer", "https://classroom6x.org/game/among-us", "https://amongus-online.gitlab.io/file/", "https://classroom6x.org/files/images/classroom_6x%20(13).jpg", "Work with crewmates, complete tasks, and find the impostor before it is too late.", "Mouse and keyboard"],
  ["Snow Rider 3D", "Arcade", "https://classroom6x.org/game/snow-rider-3d", "https://itsvijaysingh.github.io/Snow-Rider3D/", "https://classroom6x.org/files/images/snow-rider-3d.png", "Ride down snowy slopes, dodge obstacles, and collect gifts for new sleds.", "Arrow keys or WASD"],
  ["Age of War", "Strategy", "https://classroom6x.org/game/age-of-war", "https://cbgamesdev.github.io/chilibowlflash/ageofwar.html", "https://classroom6x.org/files/images/classroom_6x%20(11).jpg", "Defend your base and evolve your army from the Stone Age to the future.", "Mouse"],
  ["Time Shooter 3: SWAT", "Action", "https://classroom6x.org/game/time-shooter-3-swat", "https://bitlifeonline.github.io/time-shooter-3-swat/", "https://classroom6x.org/files/images/timeshooter-swat-3.jpg", "Move through slow-motion tactical rooms where time advances when you move.", "WASD and mouse"],
  ["Ragdoll Archers", "Action", "https://classroom6x.org/game/ragdoll-archers", "https://jasongamesdev.github.io/ragdoll-archers/", "https://classroom6x.org/files/images/ragdoll%20archers.png", "Aim arrows, fight ragdoll enemies, and unlock upgrades.", "Mouse"],
  ["1v1 LOL", "Action", "https://classroom6x.org/game/1v1-lol", "https://1v1-lol-online.github.io/file/", "https://classroom6x.org/files/images/1v1lol_unblocekd.png", "Build, shoot, and duel in fast online-style arena matches.", "WASD and mouse"],
  ["Eggy Car", "Arcade", "https://classroom6x.org/game/eggy-car", "https://sciencemathedu.github.io/eggycar/", "https://classroom6x.org/files/images/eggy-car.png", "Drive over hills while balancing a fragile egg on the car.", "Arrow keys"],
  ["Smash Karts", "Multiplayer", "https://classroom6x.org/game/smash-karts", "https://webgltest-17af1.firebaseapp.com/", "https://classroom6x.org/files/images/smash-karts.png", "Race around arenas, grab power-ups, and blast rival karts.", "WASD and mouse"],
  ["Angry Gran Run 2", "Arcade", "https://classroom6x.org/game/angry-gran-run-2", "https://flash-cdn.blogspot.com/2021/05/angry-gran-2.html", "https://classroom6x.org/files/images/classroom_6x%20(14).jpg", "Dash through city streets in a fast endless runner.", "Arrow keys"],
  ["Moto X3M Winter", "Arcade", "https://classroom6x.org/game/moto-x3m-winter", "https://abinbins.github.io/a/moto-x3m-winter/", "https://classroom6x.org/files/images/classroom_6x%20(11).jpeg", "Ride snowy stunt tracks with flips, hazards, and tight timing.", "Arrow keys"],
  ["Basket Random", "Sports", "https://ubg76.gitlab.io/game/basket-random.html", "https://ubg76.gitlab.io/basket-random/", "https://classroom6x.org/files/images/basket-random.jpg", "Play unpredictable one-button ragdoll basketball.", "One-button controls"],
  ["Cookie Clicker", "Clicker", "https://classroom6x.org/game/cookie-clicker", "https://script.google.com/macros/s/AKfycbxGM35J29NkO-2LYjxWj_cA9IUaaXypkUy-LqXyLRbGTz0R6lXmAEapz1STN1jlTIRavw/exec", "https://classroom6x.org/files/images/cookie-clicker.jpg", "Click cookies, buy upgrades, and grow an endless cookie empire.", "Mouse"],
  ["Slope", "Arcade", "https://classroom6x.org/game/slope", "https://storage.y8.com/y8-studio/unity_webgl/bitlaslt/slope_v_1_2_5/", "https://classroom6x.org/files/images/classroom_6x%20(67).jpg", "Guide a rolling ball through a fast neon track.", "Arrow keys"],
  ["Street Fighter II", "Action", "https://classroom6x.org/game/street-fighter-ii", "https://www.retrogames.cc/embed/10030-street-fighter-ii-champion-edition-street-fighter-2-920513-etc.html", "https://classroom6x.org/files/images/street_fighter_ii.jpg", "Play the classic arcade fighting game in the browser.", "Keyboard"],
  ["Mr. Dude", "Action", "https://classroom6x.org/game/mr-dude", "https://script.google.com/macros/s/AKfycbzFSYMyP5-xv8yF35HL0Aj0S2txSh1DLJ8hnMCUeyW4TgbL3GeQQG0Dr6AsXtGWpIdEeQ/exec", "https://classroom6x.org/files/images/mr-dude.png", "Cause physics chaos with weapons, objects, and improvised tools.", "Keyboard and mouse"],
  ["Drift Hunters", "Arcade", "https://classroom6x.org/game/drift-hunters", "https://script.google.com/macros/s/AKfycbw8iHPqdVFEzquUYbNxFVAu1Tw4Nri5SWMRLdP_c7a84vCOHVG7YUWuhjSVptg1SVHr/exec", "https://classroom6x.org/files/images/drift-hunters.png", "Tune cars and master long high-speed drifts.", "WASD or arrows"]
];

const googleSiteGames = [
  ["Medieval Golf", "Sports", "https://sites.google.com/site/thegamecompilation/medieval-golf", "https://977305247-atari-embeds.googleusercontent.com/embeds/16cb204cf3a9d4d223a0a3fd8b0eec5d/inner-frame-minified.html", "", "Play a medieval-themed golf challenge through the browser.", "Mouse"],
  ["Poly Track v0.6.0", "Arcade", "https://sites.google.com/view/newcargame/poly-track-0-6-0", "https://smapskajendfjshwbekf-prog.github.io/newcargame/", "https://lh3.googleusercontent.com/sitesv/AA5AbUC7JiBBjsmKYJE6tFdarrWoKMNoP5ga5cgNjbLouVAfxhbjwbQR_ATk58Fhanci-EQZqp52gus-EdrSwrKZPnYQ7WMosEY6VI_p7x3RGHymqQVkBiccPFY95Ladrl5K3QP2suqm5j6NXd8PlHpO9LVuqMmQP20KqkFxZS8olDRbzfQtapshHGvu=w16383", "Race, build tracks, and play PolyTrack v0.6.0.", "Keyboard"],
  ["Eaglercraft", "Minecraft", "https://sites.google.com/view/newcargame/eaglercraft", "https://smapskajendfjshwbekf-prog.github.io/eaglercraft", "https://lh3.googleusercontent.com/sitesv/AA5AbUDw6X1H6vmla5PFTX2gnathA4OFXyO51F0P2omHcX93YHSjk9PnRA6H_I4ZBop4buB3JbIPqinwdKFHI4aQYGlBnn1DV8legMWQO7J_sIKPprtC7ZKKAIoGu7PXXnjMHXiuTMQk8wi8i_0O2ED5wklPaBAdWJvxVDnP5yEotDVtofuUVQsPVPm7gtoKgrE64Y7ISebxwCyoWDPlrcdLtz0hCjM6H6XMdvxAUkE=w1280", "A browser-based Minecraft-style survival and creative game.", "WASD and mouse"],
  ["Stacktris", "Puzzle", "https://sites.google.com/view/newcargame/stacktris", "https://htmlunblockedgames.github.io/stacktris/", "", "Stack falling blocks in a puzzle game inspired by classic tile clearing.", "Keyboard"],
  ["Poly Track v0.5.2", "Arcade", "https://sites.google.com/view/newcargame/poly-track-0-5-2", "https://htmlunblockedgames.github.io/pt0.5.2/", "https://lh3.googleusercontent.com/sitesv/AA5AbUDCKIYV2IlYm6aXL23dvuj4yewY8E9sRuEu9vgNG0u_mk-wilZZlZ1YkA5m1yChCVLB_F0r-GqF_mXyVCup7kCreCiECc34IZgxQYc12sc9MpRz5jms8tgSB2o8PL59urnwhySSwt0Zwh-zCg4xaMG9mTVT83MlA5iDegcF54lugFxSlSIFg5zXKKp6ypO3t8sSvz_vx2NKDhwvCqlQQINT9pmattAK1zqVQrA=w1280", "Play PolyTrack v0.5.2 with community track features.", "Keyboard"],
  ["Poly Track v0.5.1", "Arcade", "https://sites.google.com/view/newcargame/poly-track-0-5-1", "https://htmlunblockedgames.github.io/polytrack-0.5.1-new/", "https://lh3.googleusercontent.com/sitesv/AA5AbUD_TxTsGOlp8JQlvvRuq_NbCU6vLxD1l6K8y7HZJ5NiVKGYIkWQ4M89dlnJUvL9T6l62mmsWMW0Dk9X2N9aXHhd6N46t3W3YD2P-9KuL9NQJvpMemlJwTly3JewTspf6uOeHTGXWnrQY8WGsJ9OSItpddQOvV16vGsRQk2g6l6Qiubiun4aypP4w0RjWAps4Ht7q6N0ykyuhldC6gYaIFEeFDb6JEn75jWzMwo=w1280", "Play PolyTrack v0.5.1 with shadows and editor undo.", "Keyboard"],
  ["Poly Track v0.4.1", "Arcade", "https://sites.google.com/view/newcargame/poly-track-0-4-1", "https://htmlunblockedgames.github.io/polytrack/", "https://lh3.googleusercontent.com/sitesv/AA5AbUDcQKnWAfTdpOi9rZiRmEuupJHYlpC0I7og_sD5n6cWN0rZNRm6dbRhWzd4e64b-CpVsxylWUq5zhA_VFyKU14TfWjLEOZCAtE_pEkJpvUHbUPMmyrXjULJmGXs6BKs2njB-3w-NSVxQ_zeP0oK0Gx4Z06tCRFiPOhNdMTnoz-5BAjvd2XYalEsqyJRWMvUJ1Rmhb2R-tl1lNILqCVMMwe1gu7pvlJNC1HyE4w=w1280", "Play an older PolyTrack version with replays and mobile support.", "Keyboard"]
];

const categoryGroups = {
  arcade: ["Arcade", "Clicker", "Idle", "2 Player"],
  skill: ["Skill", "3D", "Action", "Escape", "Multiplayer", "Minecraft"],
  puzzle: ["Puzzle", "Strategy", "Adventure", "Simulator", "Sports"]
};

const freezeNovaCatalog = freezeNovaGames.map(([title, category, sourcePage, embed, image, description, controls]) => ({
  id: slug(title),
  title,
  category,
  source: "FreezeNova",
  sourcePage,
  embed,
  image,
  description,
  controls,
  tags: [category, ...category.toLowerCase().split(/\s+/), "freezenova"]
}));

const itchCatalog = licensedItchGames.map((game) => ({
  ...game,
  id: slug(game.title),
  tags: [game.category, game.source, game.license, ...game.category.toLowerCase().split(/\s+/)]
}));

const classroomCatalog = classroomGames.map(([title, category, sourcePage, embed, image, description, controls]) => ({
  id: slug(title),
  title,
  category,
  source: "Classroom 6x",
  sourcePage,
  embed,
  image,
  description,
  controls,
  tags: [category, ...category.toLowerCase().split(/\s+/), "classroom 6x"]
}));

const googleSiteCatalog = googleSiteGames.map(([title, category, sourcePage, embed, image, description, controls]) => ({
  id: slug(title),
  title,
  category,
  source: "Google Sites",
  sourcePage,
  embed,
  image,
  description,
  controls,
  tags: [category, ...category.toLowerCase().split(/\s+/), "google sites", "new car game"]
}));

const games = [...googleSiteCatalog, ...itchCatalog, ...classroomCatalog, ...freezeNovaCatalog];
const blockedTitleTerms = ["brainrot"];
const blockedTitles = new Set(["Greed II", "Closer", "Among Us", "Snow Rider 3D", "Golf Bit"]);
const cleanGames = games.filter((game) => {
  const title = game.title.toLowerCase();
  const allowedSource = game.source === "Google Sites" || game.source === "itch.io" || game.source === "Classroom 6x" || game.title === "Golf Bit";
  return allowedSource && !blockedTitles.has(game.title) && game.title !== "Drift Hunters" && !blockedTitleTerms.some((term) => title.includes(term));
});

const grid = document.querySelector("#gameGrid");
const searchInput = document.querySelector("#searchInput");
const searchToggle = document.querySelector("#searchToggle");
const searchPanel = document.querySelector("#searchPanel");
const resultCount = document.querySelector("#resultCount");
const frame = document.querySelector("#gameFrame");
const cabinet = document.querySelector(".cabinet");
const overlay = document.querySelector("#overlay");
const overlayMessage = document.querySelector(".overlay-message");
const adPanel = document.querySelector("#adPanel");
const adTitle = document.querySelector("#adTitle");
const adText = document.querySelector("#adText");
const adLink = document.querySelector("#adLink");
const skipAdBtn = document.querySelector("#skipAdBtn");
const loadBtn = document.querySelector("#startBtn");
const fullscreenBtn = document.querySelector("#pauseBtn");
const blankBtn = document.querySelector("#blankBtn");
const playerTitle = document.querySelector("#playerTitle");
const playerDescription = document.querySelector("#playerDescription");
const activeGenre = document.querySelector("#activeGenre");
const categoryEl = document.querySelector("#score");
const controlsEl = document.querySelector("#controls");
const streakCount = document.querySelector("#streakCount");
const xpCount = document.querySelector("#xpCount");
const levelCount = document.querySelector("#levelCount");
const dailyText = document.querySelector("#dailyText");
const spotlightTitle = document.querySelector("#spotlightTitle");
const spotlightText = document.querySelector("#spotlightText");
const spotlightBtn = document.querySelector("#spotlightBtn");
const surpriseBtn = document.querySelector("#surpriseBtn");
const continueSection = document.querySelector("#continueSection");
const continueRail = document.querySelector("#continueRail");
const recommendRail = document.querySelector("#recommendRail");
const reportBtn = document.querySelector("#reportBtn");
const shortcutsBtn = document.querySelector("#shortcutsBtn");
const shortcutsDialog = document.querySelector("#shortcutsDialog");
const closeShortcutsBtn = document.querySelector("#closeShortcutsBtn");
const toast = document.querySelector("#toast");

let activeFilter = "all";
let activeMood = "";
let activeGame = null;
let frameTimer = 0;
let adTimer = 0;
let adFinishTimer = 0;
let adCountdown = 0;
let toastTimer = 0;

const adSlot = {
  title: "Hunter Games Sponsor",
  text: "Place your video, banner, or sponsor message here. The game loads after this short break.",
  href: "#"
};
const adClient = "ca-pub-4125872061932966";
const galleryAdSlots = ["GALLERY_SLOT_ID_1", "GALLERY_SLOT_ID_2"];
const todayKey = new Date().toISOString().slice(0, 10);
const moodGroups = {
  quick: ["Arcade", "Clicker", "Sports", "Puzzle"],
  chill: ["Puzzle", "Strategy", "Simulator"],
  rage: ["Skill", "Action", "Escape"],
  friend: ["2 Player", "Multiplayer", "Minecraft"]
};
const state = loadState();
const spotlightGame = cleanGames[hashNumber(todayKey) % cleanGames.length];

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = cleanGames.filter((game) => {
    const haystack = [game.title, game.description, game.category, ...game.tags].join(" ").toLowerCase();
    const matchesFilter = activeFilter === "all" || categoryGroups[activeFilter].includes(game.category);
    const matchesMood = !activeMood || moodGroups[activeMood].includes(game.category);
    return matchesFilter && matchesMood && haystack.includes(query);
  });

  grid.innerHTML = "";
  visible.forEach((game) => {
    const card = document.createElement("button");
    card.className = `game-card ${activeGame && game.id === activeGame.id ? "active" : ""}`;
    card.type = "button";
    card.innerHTML = `
      <span class="thumb image-thumb" style="${thumbStyle(game)}" aria-hidden="true"></span>
      <span class="card-copy">
        <h3>${escapeHtml(game.title)}</h3>
        <p>${escapeHtml(game.description)}</p>
        <span class="tags">
          <span class="tag">${escapeHtml(game.category)}</span>
          ${game.license ? `<span class="tag">${escapeHtml(game.license)}</span>` : ""}
        </span>
      </span>
    `;
    card.addEventListener("click", () => selectGame(game.id, true));
    grid.appendChild(card);
    if ((grid.children.length === 4 || grid.children.length === 10) && visible.length > grid.children.length) {
      grid.appendChild(createGalleryAd(grid.querySelectorAll(".ad-slot-gallery").length));
    }
  });

  resultCount.textContent = `${visible.length} ${visible.length === 1 ? "game" : "games"}`;
  loadGalleryAds();
}

function createGalleryAd(index) {
  const ad = document.createElement("aside");
  ad.className = "ad-slot ad-slot-gallery";
  ad.setAttribute("aria-label", "Advertisement");
  ad.innerHTML = `
    <ins class="adsbygoogle gallery-ad"
         style="display:block"
         data-ad-client="${adClient}"
         data-ad-slot="${galleryAdSlots[index % galleryAdSlots.length]}"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  `;
  return ad;
}

function loadGalleryAds() {
  if (!window.adsbygoogle) return;
  document.querySelectorAll(".gallery-ad:not([data-ad-loaded])").forEach((ad) => {
    ad.setAttribute("data-ad-loaded", "true");
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      ad.removeAttribute("data-ad-loaded");
    }
  });
}

function selectGame(id, loadNow) {
  const selected = cleanGames.find((game) => game.id === id);
  if (!selected) return;
  activeGame = selected;
  playerTitle.textContent = activeGame.title;
  playerDescription.textContent = activeGame.description;
  activeGenre.textContent = activeGame.category;
  categoryEl.textContent = activeGame.category;
  controlsEl.textContent = activeGame.controls;
  frame.removeAttribute("src");
  setOverlay(activeGame.title, "Press Play to start this game");
  renderCards();

  if (loadNow) {
    rememberGame(activeGame);
    if (location.hash !== `#${activeGame.id}`) {
      history.replaceState(null, "", `#${activeGame.id}`);
    }
    document.querySelector("#player").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function loadActiveGame() {
  if (!activeGame) return;
  startPreRoll(activeGame);
}

function startPreRoll(game) {
  clearTimeout(frameTimer);
  clearInterval(adTimer);
  clearTimeout(adFinishTimer);
  frame.removeAttribute("src");
  overlay.classList.remove("hidden");
  overlayMessage.classList.add("hidden");
  adPanel.classList.remove("hidden");
  adTitle.textContent = adSlot.title;
  adText.textContent = adSlot.text;
  adLink.href = adSlot.href;
  adCountdown = 5;
  skipAdBtn.disabled = true;
  skipAdBtn.textContent = `Game starts in ${adCountdown}`;
  adTimer = setInterval(() => {
    adCountdown -= 1;
    if (adCountdown > 0) {
      skipAdBtn.textContent = `Game starts in ${adCountdown}`;
      return;
    }
    finishPreRoll(game);
  }, 1000);
  adFinishTimer = setTimeout(() => finishPreRoll(game), 5200);
}

function finishPreRoll(game) {
  clearInterval(adTimer);
  clearTimeout(adFinishTimer);
  skipAdBtn.disabled = false;
  skipAdBtn.textContent = "Loading game";
  adPanel.classList.add("hidden");
  overlayMessage.classList.remove("hidden");
  activeGame = game;
  awardPlay(game);
  setOverlay(activeGame.title, "Loading game");
  frame.src = activeGame.embed;
  setTimeout(() => frame.focus(), 300);
  clearTimeout(frameTimer);
  frameTimer = setTimeout(() => overlay.classList.add("hidden"), 1800);
}

function setOverlay(title, subtitle) {
  overlay.classList.remove("hidden");
  overlayMessage.classList.remove("hidden");
  adPanel.classList.add("hidden");
  overlay.querySelector("strong").textContent = title;
  overlay.querySelector("span").textContent = subtitle;
}

function slug(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function thumbStyle(game) {
  if (!game.image) {
    return "";
  }
  return `background-image: linear-gradient(rgba(12,14,18,.16), rgba(12,14,18,.5)), url('${game.image}')`;
}

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".mood-chip").forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    activeMood = "";
    renderCards();
  });
});

document.querySelectorAll(".mood-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const mood = chip.dataset.mood;
    const alreadyActive = activeMood === mood;
    activeMood = alreadyActive ? "" : mood;
    document.querySelectorAll(".mood-chip").forEach((item) => item.classList.remove("active"));
    if (!alreadyActive) chip.classList.add("active");
    renderCards();
    document.querySelector("#library").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

searchInput.addEventListener("input", renderCards);
searchToggle.addEventListener("click", () => {
  const collapsed = searchPanel.classList.toggle("is-collapsed");
  searchToggle.setAttribute("aria-expanded", String(!collapsed));
  if (!collapsed) searchInput.focus();
});
loadBtn.addEventListener("click", loadActiveGame);
surpriseBtn.addEventListener("click", () => {
  const game = pickSurpriseGame();
  if (game) selectGame(game.id, true);
});
spotlightBtn.addEventListener("click", () => selectGame(spotlightGame.id, true));
reportBtn.addEventListener("click", () => {
  if (!activeGame) {
    showToast("Choose a game first.");
    return;
  }
  const reports = readJson("hunterReports", {});
  reports[activeGame.id] = { title: activeGame.title, date: todayKey, status: "reported" };
  writeJson("hunterReports", reports);
  showToast(`${activeGame.title} marked as reported. I will check it.`);
});
shortcutsBtn.addEventListener("click", openShortcuts);
closeShortcutsBtn.addEventListener("click", () => shortcutsDialog.close());
skipAdBtn.addEventListener("click", () => {
  if (!skipAdBtn.disabled && activeGame) finishPreRoll(activeGame);
});

fullscreenBtn.addEventListener("click", () => {
  const target = frame.src ? cabinet : document.querySelector("#player");
  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (target.webkitRequestFullscreen) {
    target.webkitRequestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  }
  document.body.classList.toggle("theater-mode");
  setTimeout(() => frame.focus(), 100);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key.toLowerCase() === "r" && document.activeElement !== searchInput) {
    event.preventDefault();
    const game = pickSurpriseGame();
    if (game) selectGame(game.id, true);
  }
  if (event.key.toLowerCase() === "f" && document.activeElement !== searchInput) {
    fullscreenBtn.click();
  }
  if (event.key === "?") {
    openShortcuts();
  }
  if (event.key === "Escape" && document.body.classList.contains("theater-mode")) {
    document.body.classList.remove("theater-mode");
  }
});

blankBtn.addEventListener("click", () => {
  if (!activeGame) return;
  const blank = window.open("about:blank", "_blank");
  if (!blank) return;
  const title = escapeHtml(activeGame.title);
  const src = escapeHtml(activeGame.embed);
  blank.document.open();
  blank.document.write(`<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body { margin: 0; width: 100%; height: 100%; background: #050608; overflow: hidden; }
      iframe { width: 100%; height: 100%; border: 0; display: block; background: #050608; }
    </style>
  </head>
  <body>
    <iframe src="${src}" allow="fullscreen; gamepad; autoplay; clipboard-write; accelerometer; gyroscope" allowfullscreen></iframe>
  </body>
</html>`);
  blank.document.close();
});

frame.addEventListener("load", () => {
  clearTimeout(frameTimer);
  if (frame.src) {
    overlay.classList.add("hidden");
    setTimeout(() => frame.focus(), 100);
  }
});

cabinet.addEventListener("pointerdown", () => {
  if (frame.src) frame.focus();
});

window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (id) selectGame(id, false);
});

if (location.hash.slice(1)) {
  selectGame(location.hash.slice(1), false);
} else {
  playerTitle.textContent = "Choose a game";
  playerDescription.textContent = "Pick a title from the game shelf, then press Play when you are ready.";
  activeGenre.textContent = "Ready";
  categoryEl.textContent = "None selected";
  controlsEl.textContent = "Shown after choosing";
  setOverlay("Choose a game", "Select a game from the shelf, then press Play");
  renderCards();
}
renderProgress();
renderSpotlight();
renderContinueRail();
renderRecommendations();

function loadState() {
  const saved = readJson("hunterProgress", {});
  const state = {
    xp: Number(saved.xp) || 0,
    streak: Number(saved.streak) || 0,
    lastVisit: saved.lastVisit || "",
    playedToday: saved.playedToday === todayKey,
    played: saved.played || {}
  };
  if (state.lastVisit !== todayKey) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak = state.lastVisit === yesterday ? state.streak : 0;
    state.playedToday = false;
    state.lastVisit = todayKey;
    writeJson("hunterProgress", state);
  }
  return state;
}

function awardPlay(game) {
  const firstToday = !state.playedToday;
  state.playedToday = true;
  state.lastVisit = todayKey;
  state.played[game.id] = (state.played[game.id] || 0) + 1;
  state.xp += firstToday ? 35 : 10;
  if (firstToday) state.streak += 1;
  writeJson("hunterProgress", state);
  rememberGame(game);
  renderProgress();
  renderContinueRail();
  renderRecommendations();
  showToast(firstToday ? `Daily streak saved. +35 XP` : `+10 XP for playing ${game.title}`);
}

function renderProgress() {
  streakCount.textContent = state.streak;
  xpCount.textContent = state.xp;
  levelCount.textContent = Math.floor(state.xp / 100) + 1;
  dailyText.textContent = state.playedToday
    ? "Daily challenge complete. Come back tomorrow to keep the streak alive."
    : "Play one game today to keep your streak alive.";
}

function renderSpotlight() {
  spotlightTitle.textContent = spotlightGame.title;
  spotlightText.textContent = spotlightGame.description;
}

function rememberGame(game) {
  const recent = readJson("hunterRecent", []).filter((id) => id !== game.id);
  recent.unshift(game.id);
  writeJson("hunterRecent", recent.slice(0, 5));
  renderContinueRail();
}

function renderContinueRail() {
  const recentGames = readJson("hunterRecent", [])
    .map((id) => cleanGames.find((game) => game.id === id))
    .filter(Boolean)
    .slice(0, 5);
  continueSection.hidden = recentGames.length === 0;
  continueRail.innerHTML = "";
  recentGames.forEach((game) => continueRail.appendChild(createRailButton(game)));
}

function renderRecommendations() {
  const playedIds = Object.keys(state.played);
  const favoriteCategories = playedIds
    .map((id) => cleanGames.find((game) => game.id === id)?.category)
    .filter(Boolean);
  const preferred = favoriteCategories[0] || spotlightGame.category;
  const recs = cleanGames
    .filter((game) => game.category === preferred && !playedIds.includes(game.id))
    .concat(cleanGames.filter((game) => game.category !== preferred))
    .slice(0, 5);
  recommendRail.innerHTML = "";
  recs.forEach((game) => recommendRail.appendChild(createRailButton(game)));
}

function createRailButton(game) {
  const button = document.createElement("button");
  button.className = "rail-card";
  button.type = "button";
  button.innerHTML = `<strong>${escapeHtml(game.title)}</strong><span>${escapeHtml(game.category)}</span>`;
  button.addEventListener("click", () => selectGame(game.id, true));
  return button;
}

function pickSurpriseGame() {
  const recent = new Set(readJson("hunterRecent", []));
  const candidates = cleanGames.filter((game) => !recent.has(game.id));
  return (candidates.length ? candidates : cleanGames)[Math.floor(Math.random() * (candidates.length || cleanGames.length))];
}

function openShortcuts() {
  if (shortcutsDialog.open) return;
  shortcutsDialog.showModal();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function hashNumber(value) {
  return String(value).split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}
