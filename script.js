const localGames = [
  ["Bossbound Party", "Multiplayer", "local", "./games/bossbound/index.html", "art:bossbound", "Play a pixel-art isometric story RPG with solo, local co-op, online rooms, towns, cities, side quests, and boss hunts.", "Solo/Online: WASD, Space, Shift, E. Local P2: arrows, Enter, /"]
];

const openSourceGames = [
  {
    title: "Open Golf Online",
    category: "Sports",
    source: "Open Source",
    sourcePage: "https://github.com/mgerdes/Open-Golf",
    embed: "./games/open-golf/index.html",
    image: "art:golf",
    description: "Play the rebuilt Open-Golf web game with built-in party rooms, synced shots, scorecards, and chat.",
    controls: "Mouse or touch to shoot. Use the in-game Party panel for rooms and chat.",
    license: "MIT"
  }
];

const categoryGroups = {
  arcade: ["Multiplayer"],
  skill: ["Sports"],
  puzzle: ["Sports", "Multiplayer"]
};

const localCatalog = localGames.map(([title, category, sourcePage, embed, image, description, controls]) => ({
  id: slug(title),
  title,
  category,
  source: "Hunter Games",
  sourcePage,
  embed,
  image,
  description,
  controls,
  tags: [category, ...category.toLowerCase().split(/\s+/), "coop", "co-op", "isometric", "boss rush", "open world", "local"]
}));

const openSourceCatalog = openSourceGames.map((game) => ({
  ...game,
  id: slug(game.title),
  tags: [game.category, game.source, game.license, "minigolf", "golf", "3d", "physics", "open source"]
}));

const games = [...openSourceCatalog, ...localCatalog];
const adClient = "";
const galleryAdSlots = [];
const cleanGames = games;

const grid = document.querySelector("#gameGrid");
const searchInput = document.querySelector("#searchInput");
const searchToggle = document.querySelector("#searchToggle");
const searchPanel = document.querySelector("#searchPanel");
const resultCount = document.querySelector("#resultCount");
const frame = document.querySelector("#gameFrame");
const cabinet = document.querySelector(".cabinet");
const overlay = document.querySelector("#overlay");
const overlayMessage = document.querySelector(".overlay-message");
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
const levelText = document.querySelector("#levelText") || document.querySelector("#level-text");
const xpText = document.querySelector("#xpText") || document.querySelector("#xp-text");
const xpFill = document.querySelector("#xpFill") || document.querySelector("#xp-fill");
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
const streakCelebration = document.querySelector("#streakCelebration");
const streakCelebrationCount = document.querySelector("#streakCelebrationCount");

let activeFilter = "all";
let activeMood = "";
let activeGame = null;
let frameTimer = 0;
let toastTimer = 0;

const iframeAllow = "fullscreen *; pointer-lock *; gamepad *; autoplay *; clipboard-write *; accelerometer *; gyroscope *";
const todayKey = new Date().toISOString().slice(0, 10);
const moodGroups = {
  quick: ["Sports"],
  chill: ["Sports"],
  rage: ["Multiplayer"],
  friend: ["Multiplayer"]
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
      ${thumbMarkup(game)}
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
    if (adClient && galleryAdSlots.length && (grid.children.length === 4 || grid.children.length === 10) && visible.length > grid.children.length) {
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
  frame.removeAttribute("src");
  overlay.classList.remove("hidden");
  activeGame = game;
  awardPlay(game);
  setOverlay(activeGame.title, "Loading game");
  frame.setAttribute("allow", iframeAllow);
  frame.src = activeGame.embed;
  setTimeout(() => frame.focus(), 300);
  frameTimer = setTimeout(() => overlay.classList.add("hidden"), 1800);
}

function setOverlay(title, subtitle) {
  overlay.classList.remove("hidden");
  overlayMessage.classList.remove("hidden");
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
  if (game.image === "art:golf") {
    return "--accent:#ffc857;--accent2:#4fe39a;--accent3:#65d6ff";
  }
  if (game.image === "art:stacktris") {
    return "--accent:#65d6ff;--accent2:#ff5e8a;--accent3:#ffc857";
  }
  if (game.image === "art:bossbound") {
    return "--accent:#53e58f;--accent2:#60c7ff;--accent3:#ff5e8a";
  }
  return artColors(game.title);
}

function thumbMarkup(game) {
  const src = thumbnailUrl(game.image);
  const image = game.image && !game.image.startsWith("art:") ? `
    <img src="${escapeHtml(src)}" alt="" loading="lazy"
         onload="this.parentElement.classList.add('image-loaded')"
         onerror="this.remove()">
  ` : "";
  return `
    <span class="thumb" style="${thumbStyle(game)}" aria-hidden="true">
      ${image}
      <span class="thumb-fallback">
        <span class="thumb-mark">${escapeHtml(initials(game.title))}</span>
        <span class="thumb-title">${escapeHtml(game.title)}</span>
        <span class="thumb-kind">${escapeHtml(game.category)}</span>
      </span>
    </span>
  `;
}

function thumbnailUrl(image) {
  if (!image || image.startsWith("art:")) return "";
  if (!/^https?:\/\//i.test(image)) return image;
  const source = image.replace(/^https?:\/\//i, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(source)}&w=640&h=360&fit=cover&output=webp`;
}

function resolveGameUrl(url) {
  try {
    return new URL(url, location.href).href;
  } catch {
    return url;
  }
}

function artColors(seed) {
  const palettes = [
    ["#4fe39a", "#65d6ff", "#ff5e8a"],
    ["#ffc857", "#4fe39a", "#65d6ff"],
    ["#65d6ff", "#ff5e8a", "#ffc857"],
    ["#ff5e8a", "#ffc857", "#4fe39a"],
    ["#9aff00", "#00d869", "#65d6ff"]
  ];
  const palette = palettes[hashNumber(seed) % palettes.length];
  return `--accent:${palette[0]};--accent2:${palette[1]};--accent3:${palette[2]}`;
}

function initials(title) {
  return String(title)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
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
  const src = escapeHtml(resolveGameUrl(activeGame.embed));
  const base = escapeHtml(location.href);
  blank.document.open();
  blank.document.write(`<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <base href="${base}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body { margin: 0; width: 100%; height: 100%; background: #050608; overflow: hidden; }
      iframe { width: 100%; height: 100%; border: 0; display: block; background: #050608; }
      .fallback {
        position: fixed;
        left: 16px;
        bottom: 16px;
        max-width: min(520px, calc(100% - 32px));
        border: 1px solid rgba(255, 200, 87, .5);
        border-radius: 8px;
        background: rgba(12, 14, 16, .88);
        color: #f5f7fb;
        padding: 12px 14px;
        font: 14px system-ui, sans-serif;
        line-height: 1.4;
      }
      .fallback a { color: #52e39a; font-weight: 800; }
    </style>
  </head>
  <body>
    <iframe src="${src}" allow="${iframeAllow}" allowfullscreen credentialless></iframe>
    <div class="fallback">
      If the game stays black, <a href="${src}" target="_self">load it directly in this blank tab</a>.
    </div>
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
  if (frame.src) {
    frame.focus();
    return;
  }
  if (activeGame) loadActiveGame();
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
    lastPlayDate: saved.lastPlayDate || "",
    playedToday: saved.lastPlayDate === todayKey || (saved.playedToday === true && saved.lastVisit === todayKey),
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
  state.lastPlayDate = todayKey;
  state.played[game.id] = (state.played[game.id] || 0) + 1;
  state.xp += firstToday ? 35 : 10;
  if (firstToday) state.streak += 1;
  writeJson("hunterProgress", state);
  rememberGame(game);
  renderProgress();
  renderContinueRail();
  renderRecommendations();
  showToast(firstToday ? `Daily streak saved. +35 XP` : `+10 XP for playing ${game.title}`);
  if (firstToday) showStreakCelebration();
}

function renderProgress() {
  const xpPerLevel = 100;
  const level = Math.floor(state.xp / xpPerLevel) + 1;
  const xpIntoLevel = state.xp % xpPerLevel;
  const progressPercent = (xpIntoLevel / xpPerLevel) * 100;

  streakCount.textContent = state.streak;
  if (xpCount) xpCount.textContent = state.xp;
  if (levelText) levelText.textContent = `Level ${level}`;
  if (xpText) xpText.textContent = `${xpIntoLevel} / ${xpPerLevel} XP`;
  if (xpFill) xpFill.style.width = `${progressPercent}%`;
  levelCount.textContent = level;
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

function showStreakCelebration() {
  streakCelebrationCount.textContent = state.streak;
  streakCelebration.classList.remove("show");
  void streakCelebration.offsetWidth;
  streakCelebration.classList.add("show");
  setTimeout(() => streakCelebration.classList.remove("show"), 2100);
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
