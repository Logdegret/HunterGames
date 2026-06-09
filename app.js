const games = [
  { id: "snow-rider-3d", title: "Snow Rider 3D", category: "Arcade", tags: ["Racing", "Quick"], description: "Slide down snowy tracks, dodge hazards, and chase a cleaner run.", url: "https://ubg66.gitlab.io/snow-rider-3d/" },
  { id: "bottle-flip-3d", title: "Bottle Flip 3D", category: "Skill", tags: ["Quick", "Chill"], description: "Flip the bottle across furniture and stick every landing.", url: "https://www.miniplay.com/embed/bottle-flip-3d" },
  { id: "rooftop-snipers", title: "Rooftop Snipers", category: "Arcade", tags: ["2 Player", "Challenge"], description: "A wobbly rooftop duel with tiny controls and big knockouts.", url: "https://gswitch3.github.io/g/rooftop-snipers" },
  { id: "basket-random", title: "Basket Random", category: "Sports", tags: ["2 Player", "Quick"], description: "Chaotic one-button basketball with random courts and physics.", url: "https://htmlunblockedgames.github.io/basket-random/" },
  { id: "polytrack", title: "PolyTrack v0.6.0", category: "Racing", tags: ["Challenge"], description: "A sharp low-poly driving challenge with speed, drifting, and precise track flow.", url: "https://smapskajendfjshwbekf-prog.github.io/newcargame/" },
  { id: "eaglercraft", title: "Eaglercraft", category: "Sandbox", tags: ["Chill"], description: "A browser sandbox build for mining, crafting, and open-ended survival.", url: "https://smapskajendfjshwbekf-prog.github.io/eaglercraft/" },
  { id: "stacktris", title: "Stacktris", category: "Puzzle", tags: ["Chill", "Quick"], description: "Stack pieces with puzzle timing and clean block strategy.", url: "https://htmlunblockedgames.github.io/stacktris/" },
  { id: "run-3", title: "Run 3", category: "Arcade", tags: ["Runner", "Challenge"], description: "Sprint through space tunnels and keep your footing on every wall.", url: "https://lekug.github.io/tn6pS9dCf37xAhkJv/" },
  { id: "basketball-stars", title: "Basketball Stars", category: "Sports", tags: ["2 Player", "Challenge"], description: "Arcade basketball matchups with dunks, steals, and quick plays.", url: "https://basketball-stars.io/game/basketball-stars/" },
  { id: "slope", title: "Slope", category: "Arcade", tags: ["Runner", "Quick"], description: "Roll through neon slopes at high speed without missing the track.", url: "https://ubg66.gitlab.io/slope/" },
  { id: "tunnel-rush", title: "Tunnel Rush", category: "Arcade", tags: ["Runner", "Challenge"], description: "React fast through a rotating tunnel of color and obstacles.", url: "https://ubg66.gitlab.io/tunnel-rush/" },
  { id: "retro-bowl", title: "Retro Bowl", category: "Sports", tags: ["Chill"], description: "Call plays, manage drives, and chase the perfect season.", url: "https://ubg66.gitlab.io/retro-bowl/" }
];

const els = {
  pageTitle: document.getElementById("pageTitle"),
  sessionLabel: document.getElementById("sessionLabel"),
  searchInput: document.getElementById("searchInput"),
  featuredCard: document.getElementById("featuredCard"),
  featuredCategory: document.getElementById("featuredCategory"),
  featuredTag: document.getElementById("featuredTag"),
  featuredTitle: document.getElementById("featuredTitle"),
  featuredDescription: document.getElementById("featuredDescription"),
  featuredPlay: document.getElementById("featuredPlay"),
  quickList: document.getElementById("quickList"),
  activityGrid: document.getElementById("activityGrid"),
  filters: document.getElementById("filters"),
  gameGrid: document.getElementById("gameGrid"),
  emptyState: document.getElementById("emptyState"),
  lastTitle: document.getElementById("lastTitle"),
  lastMeta: document.getElementById("lastMeta"),
  xpProgress: document.getElementById("xpProgress"),
  totalPlaytime: document.getElementById("totalPlaytime"),
  playsStat: document.getElementById("playsStat"),
  xpStat: document.getElementById("xpStat"),
  mostPlayedStat: document.getElementById("mostPlayedStat"),
  statsTotalPlaytime: document.getElementById("statsTotalPlaytime"),
  statsLastPlayed: document.getElementById("statsLastPlayed"),
  statsPlays: document.getElementById("statsPlays"),
  statsXp: document.getElementById("statsXp"),
  statsMostPlayed: document.getElementById("statsMostPlayed"),
  statsMostPlayedTime: document.getElementById("statsMostPlayedTime"),
  timeList: document.getElementById("timeList"),
  authForm: document.getElementById("authForm"),
  usernameInput: document.getElementById("usernameInput"),
  passwordInput: document.getElementById("passwordInput"),
  authNotice: document.getElementById("authNotice"),
  signedInBox: document.getElementById("signedInBox"),
  profileAvatar: document.getElementById("profileAvatar"),
  profileName: document.getElementById("profileName"),
  logoutBtn: document.getElementById("logoutBtn"),
  addFriendForm: document.getElementById("addFriendForm"),
  friendInput: document.getElementById("friendInput"),
  friendCount: document.getElementById("friendCount"),
  fullFriendList: document.getElementById("fullFriendList"),
  railFriends: document.getElementById("railFriends"),
  railProfile: document.getElementById("railProfile"),
  settingsAvatar: document.getElementById("settingsAvatar"),
  settingsName: document.getElementById("settingsName"),
  settingsStatus: document.getElementById("settingsStatus"),
  currentGameLabel: document.getElementById("currentGameLabel"),
  backBtn: document.getElementById("backBtn"),
  playCategory: document.getElementById("playCategory"),
  playTitle: document.getElementById("playTitle"),
  playDescription: document.getElementById("playDescription"),
  toolbarTitle: document.getElementById("toolbarTitle"),
  toolbarMeta: document.getElementById("toolbarMeta"),
  trackingPill: document.getElementById("trackingPill"),
  playerBox: document.getElementById("playerBox"),
  playPanel: document.getElementById("playPanel"),
  blankBtn: document.getElementById("blankBtn"),
  reloadBtn: document.getElementById("reloadBtn"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  resumeBtn: document.getElementById("resumeBtn"),
  surpriseBtn: document.getElementById("surpriseBtn")
};

const emptyStats = { totalSeconds: 0, plays: 0, xp: 0, lastPlayed: "snow-rider-3d", currentGame: null, mostPlayed: null, perGame: {} };
const state = {
  route: "home",
  filter: "All",
  query: "",
  currentGame: games[0],
  user: null,
  token: localStorage.getItem("nexusToken") || "",
  friends: [],
  stats: JSON.parse(localStorage.getItem("nexusLocalStats") || "null") || emptyStats,
  activeSince: 0,
  lastTick: 0
};

const filters = ["All", ...Array.from(new Set(games.flatMap((game) => [game.category, ...game.tags]))).sort()];

function icon(path) {
  return `<svg viewBox="0 0 24 24"><path d="${path}"/></svg>`;
}

function initials(title) {
  return title
    .replace(/\./g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function gameById(id) {
  return games.find((game) => game.id === id) || games[0];
}

function gameName(id) {
  return id ? gameById(id).title : "None";
}

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours) return `${hours}h ${minutes}m`;
  if (minutes) return `${minutes}m`;
  return `${total}s`;
}

function saveLocalStats() {
  localStorage.setItem("nexusLocalStats", JSON.stringify(state.stats));
}

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const response = await fetch(path, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

function setNotice(text) {
  els.authNotice.textContent = text || "";
}

function filteredGames() {
  const query = state.query.toLowerCase();
  return games.filter((game) => {
    const filterOk = state.filter === "All" || game.category === state.filter || game.tags.includes(state.filter);
    const haystack = [game.title, game.category, game.description, ...game.tags].join(" ").toLowerCase();
    return filterOk && (!query || haystack.includes(query));
  });
}

function navigate(route) {
  location.hash = route;
}

function pageFromHash() {
  const hash = location.hash || "#home";
  const match = hash.match(/^#game\/([a-z0-9.-]+)$/i);
  if (match) return { page: "play", gameId: match[1] };
  return { page: hash.replace("#", "") || "home" };
}

function setActivePage(page) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  const id = page === "play" ? "playView" : `${page}View`;
  const view = document.getElementById(id) || document.getElementById("homeView");
  view.classList.add("active");

  document.querySelectorAll(".rail-btn").forEach((button) => {
    const target = button.dataset.route.replace("#", "");
    button.classList.toggle("active", target === page || (page === "play" && target === "games"));
  });

  const titles = { home: "Nexus Games", games: "Game Library", stats: "Statistics", friends: "Friends", profile: "Profile", play: "Now Playing" };
  els.pageTitle.textContent = titles[page] || "Nexus Games";
}

function route() {
  const next = pageFromHash();
  stopPlayTracking();
  if (next.page === "play") {
    const game = gameById(next.gameId);
    state.currentGame = game;
    renderPlay(game);
    startPlayTracking(game);
  }
  setActivePage(next.page);
  state.route = next.page;
  renderAll();
}

function renderHero() {
  const featured = state.currentGame || gameById(state.stats.lastPlayed) || games[0];
  els.featuredCategory.textContent = featured.category;
  els.featuredTag.textContent = featured.tags[0] || "Featured";
  els.featuredTitle.textContent = featured.title;
  els.featuredDescription.textContent = featured.description;
  els.featuredPlay.onclick = (event) => {
    event.stopPropagation();
    navigate(`#game/${featured.id}`);
  };
  els.featuredCard.onclick = () => navigate(`#game/${featured.id}`);
}

function renderQuickList() {
  els.quickList.innerHTML = "";
  games.slice(1, 4).forEach((game) => {
    const button = document.createElement("button");
    button.className = "quick-card";
    button.type = "button";
    button.innerHTML = `<div class="cover">${initials(game.title)}</div><div><strong>${game.title}</strong><span>${game.category}</span></div>${icon("M9 5l7 7-7 7-1.4-1.4 5.6-5.6-5.6-5.6z")}`;
    button.addEventListener("click", () => navigate(`#game/${game.id}`));
    els.quickList.appendChild(button);
  });
}

function renderActivities() {
  const last = gameById(state.stats.lastPlayed);
  const items = [
    { title: "Last Session", copy: last ? last.title : "Pick a game", target: last ? last.id : games[0].id },
    { title: "Surprise Pick", copy: "Let Nexus choose", target: null },
    { title: "Most Played", copy: state.stats.mostPlayed ? gameName(state.stats.mostPlayed.gameId) : "Start a streak", target: state.stats.mostPlayed?.gameId || games[0].id }
  ];
  els.activityGrid.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "activity-card";
    card.innerHTML = `<span class="activity-icon">${icon(index === 1 ? "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" : "M8 5v14l11-7z")}</span><h3>${item.title}</h3><p>${item.copy}</p>`;
    card.addEventListener("click", () => {
      if (item.target) navigate(`#game/${item.target}`);
      else surpriseGame();
    });
    els.activityGrid.appendChild(card);
  });
}

function renderFilters() {
  els.filters.innerHTML = "";
  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = `filter${filter === state.filter ? " active" : ""}`;
    button.type = "button";
    button.textContent = filter;
    button.addEventListener("click", () => {
      state.filter = filter;
      renderLibrary();
      renderFilters();
    });
    els.filters.appendChild(button);
  });
}

function renderLibrary() {
  const visible = filteredGames();
  els.gameGrid.innerHTML = "";
  visible.forEach((game) => {
    const button = document.createElement("button");
    button.className = "game-tile";
    button.type = "button";
    button.innerHTML = `<div class="game-art" data-initials="${initials(game.title)}"></div><h3>${game.title}</h3><p>${game.description}</p>`;
    button.addEventListener("click", () => navigate(`#game/${game.id}`));
    els.gameGrid.appendChild(button);
  });
  els.emptyState.classList.toggle("active", visible.length === 0);
}

function renderStats() {
  const stats = state.stats || emptyStats;
  const last = gameById(stats.lastPlayed);
  const most = stats.mostPlayed ? gameById(stats.mostPlayed.gameId) : null;
  const ring = Math.max(8, Math.min(100, Math.round((stats.totalSeconds % 3600) / 36)));

  els.lastTitle.textContent = last.title;
  els.lastMeta.textContent = `${last.category} | ${formatTime(stats.perGame?.[last.id]?.seconds || 0)}`;
  els.xpProgress.style.width = `${Math.max(8, Math.min(100, stats.xp % 100 || 8))}%`;
  els.totalPlaytime.textContent = formatTime(stats.totalSeconds);
  document.getElementById("statRing").style.setProperty("--ring", `${ring}%`);
  els.playsStat.textContent = stats.plays || 0;
  els.xpStat.textContent = stats.xp || 0;
  els.mostPlayedStat.textContent = most ? initials(most.title) : "None";

  els.statsTotalPlaytime.textContent = formatTime(stats.totalSeconds);
  els.statsLastPlayed.textContent = stats.lastPlayed ? `Last played: ${gameName(stats.lastPlayed)}` : "No game played yet";
  els.statsPlays.textContent = stats.plays || 0;
  els.statsXp.textContent = stats.xp || 0;
  els.statsMostPlayed.textContent = most ? most.title : "None";
  els.statsMostPlayedTime.textContent = most ? formatTime(stats.mostPlayed.seconds) : "0m";
  els.currentGameLabel.textContent = state.route === "play" ? state.currentGame.title : "None";

  els.timeList.innerHTML = "";
  games.forEach((game) => {
    const item = stats.perGame?.[game.id] || { seconds: 0, plays: 0 };
    const row = document.createElement("div");
    row.className = "time-row";
    row.innerHTML = `<div class="cover">${initials(game.title)}</div><div><strong>${game.title}</strong><span>${item.plays || 0} plays</span></div><strong>${formatTime(item.seconds || 0)}</strong>`;
    els.timeList.appendChild(row);
  });
}

function renderUser() {
  const user = state.user;
  els.sessionLabel.textContent = user ? `Signed in as ${user.username}` : "Offline profile";
  els.railProfile.textContent = user ? user.initials : "G";
  els.settingsAvatar.textContent = user ? user.initials : "G";
  els.profileAvatar.textContent = user ? user.initials : "G";
  els.profileName.textContent = user ? user.username : "Guest Player";
  els.settingsName.textContent = user ? user.username : "Guest Player";
  els.settingsStatus.textContent = user ? "Online status is active." : "Sign in to save friends and play stats.";
  els.authForm.classList.toggle("hidden", Boolean(user));
  els.signedInBox.classList.toggle("hidden", !user);
}

function renderFriends() {
  const friends = state.friends || [];
  els.friendCount.textContent = friends.length;
  els.fullFriendList.innerHTML = "";
  els.railFriends.innerHTML = "";

  if (!state.user) {
    els.fullFriendList.innerHTML = `<div class="friend-row"><div class="cover">?</div><div><strong>Sign in required</strong><span>Create an account to add friends.</span></div><span class="status-dot"></span></div>`;
    return;
  }

  if (!friends.length) {
    els.fullFriendList.innerHTML = `<div class="friend-row"><div class="cover">+</div><div><strong>No friends yet</strong><span>Add someone by username.</span></div><span class="status-dot"></span></div>`;
  }

  friends.forEach((friend) => {
    const playing = friend.currentGame ? `Playing ${gameName(friend.currentGame)}` : friend.online ? "Online" : "Offline";
    const row = document.createElement("div");
    row.className = "friend-row";
    row.innerHTML = `<div class="avatar">${friend.initials}</div><div><strong>${friend.username}</strong><span>${playing}</span></div><span class="status-dot${friend.online ? " online" : ""}"></span>`;
    els.fullFriendList.appendChild(row);

    const rail = document.createElement("button");
    rail.className = `avatar rail-friend${friend.online ? " online" : ""}`;
    rail.type = "button";
    rail.title = `${friend.username}: ${playing}`;
    rail.textContent = friend.initials;
    rail.addEventListener("click", () => navigate("#friends"));
    els.railFriends.appendChild(rail);
  });
}

function renderPlay(game) {
  els.playCategory.textContent = game.category;
  els.playTitle.textContent = game.title;
  els.playDescription.textContent = `${game.description} ${game.tags.join(" | ")}`;
  els.toolbarTitle.textContent = game.title;
  els.toolbarMeta.textContent = `${game.category} | Direct playable source`;
  els.playerBox.innerHTML = "";
  const embedTag = ["i", "fr", "ame"].join("");
  const player = document.createElement(embedTag);
  player.id = "gamePlayer";
  player.className = "game-player";
  player.title = `${game.title} player`;
  player.allow = "fullscreen *; autoplay *; gamepad *; clipboard-read *; clipboard-write *; accelerometer *; gyroscope *";
  player.allowFullscreen = true;
  player.referrerPolicy = "no-referrer-when-downgrade";
  player.src = game.url;
  els.playerBox.appendChild(player);
}

function renderAll() {
  renderHero();
  renderQuickList();
  renderActivities();
  renderFilters();
  renderLibrary();
  renderStats();
  renderUser();
  renderFriends();
}

function localPlayStart(game) {
  state.stats.lastPlayed = game.id;
  state.stats.currentGame = game.id;
  state.stats.perGame[game.id] = state.stats.perGame[game.id] || { seconds: 0, plays: 0 };
  state.stats.perGame[game.id].plays += 1;
  state.stats.plays = Object.values(state.stats.perGame).reduce((sum, item) => sum + (item.plays || 0), 0);
  state.stats.xp += 25;
  saveLocalStats();
}

function localPlaytime(game, seconds) {
  state.stats.perGame[game.id] = state.stats.perGame[game.id] || { seconds: 0, plays: 0 };
  state.stats.perGame[game.id].seconds += seconds;
  state.stats.totalSeconds = Object.values(state.stats.perGame).reduce((sum, item) => sum + (item.seconds || 0), 0);
  state.stats.mostPlayed = Object.entries(state.stats.perGame)
    .map(([gameId, item]) => ({ gameId, seconds: item.seconds || 0 }))
    .sort((a, b) => b.seconds - a.seconds)[0] || null;
  state.stats.xp = Math.floor(state.stats.totalSeconds / 60) * 10 + (state.stats.plays || 0) * 25;
  saveLocalStats();
}

async function startPlayTracking(game) {
  state.activeSince = Date.now();
  state.lastTick = Date.now();
  els.trackingPill.textContent = "Tracking when active";
  localPlayStart(game);
  if (state.user) {
    try {
      const data = await api("/api/play-start", { method: "POST", body: JSON.stringify({ gameId: game.id }) });
      state.stats = data.stats;
    } catch (error) {
      setNotice(error.message);
    }
  }
  heartbeat();
}

function stopPlayTracking() {
  if (state.route === "play") flushPlaytime();
  els.playerBox.innerHTML = "";
}

async function flushPlaytime() {
  if (state.route !== "play" || document.hidden) return;
  const now = Date.now();
  const seconds = Math.floor((now - state.lastTick) / 1000);
  if (seconds < 1) return;
  state.lastTick = now;
  localPlaytime(state.currentGame, seconds);
  if (state.user) {
    try {
      const data = await api("/api/playtime", { method: "POST", body: JSON.stringify({ gameId: state.currentGame.id, seconds }) });
      state.stats = data.stats;
    } catch (error) {
      setNotice(error.message);
    }
  }
  renderStats();
}

async function heartbeat() {
  if (!state.user) return;
  try {
    const currentGame = state.route === "play" ? state.currentGame.id : null;
    const data = await api("/api/heartbeat", { method: "POST", body: JSON.stringify({ currentGame }) });
    state.user = data.user;
    state.stats = data.stats;
    await loadFriends();
  } catch {
    state.user = null;
    state.token = "";
    localStorage.removeItem("nexusToken");
  }
  renderAll();
}

async function loadMe() {
  if (!state.token) return;
  try {
    const data = await api("/api/me");
    state.user = data.user;
    state.stats = data.stats;
    await loadFriends();
  } catch {
    state.token = "";
    state.user = null;
    localStorage.removeItem("nexusToken");
  }
}

async function loadFriends() {
  if (!state.user) {
    state.friends = [];
    return;
  }
  const data = await api("/api/friends");
  state.friends = data.friends || [];
}

function surpriseGame() {
  const pool = filteredGames();
  const pick = pool[Math.floor(Math.random() * pool.length)] || games[Math.floor(Math.random() * games.length)];
  navigate(`#game/${pick.id}`);
}

function openBlankGame(game) {
  const win = window.open("about:blank", "_blank");
  if (!win) {
    els.trackingPill.textContent = "Pop-up blocked";
    return;
  }
  const safeTitle = game.title.replace(/[<>&"]/g, "");
  const safeUrl = game.url.replace(/"/g, "%22");
  win.document.open();
  const tag = ["i", "fr", "ame"].join("");
  win.document.write(`<!doctype html><html><head><title>${safeTitle}</title><style>html,body{margin:0;height:100%;background:#050303;overflow:hidden}.play{width:100%;height:100%;border:0;display:block}</style></head><body><${tag} class="play" src="${safeUrl}" title="${safeTitle}" allow="fullscreen *; autoplay *; gamepad *; clipboard-read *; clipboard-write *; accelerometer *; gyroscope *" allowfullscreen></${tag}></body></html>`);
  win.document.close();
}

document.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.route));
});

els.searchInput.addEventListener("input", () => {
  state.query = els.searchInput.value;
  if (state.route !== "games") navigate("#games");
  renderLibrary();
});

els.authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = event.submitter?.dataset.auth || "login";
  setNotice("");
  try {
    const data = await api(`/api/${action}`, {
      method: "POST",
      body: JSON.stringify({ username: els.usernameInput.value, password: els.passwordInput.value })
    });
    state.token = data.token;
    state.user = data.user;
    state.stats = data.stats;
    localStorage.setItem("nexusToken", state.token);
    await loadFriends();
    setNotice(action === "signup" ? "Account created." : "Signed in.");
    renderAll();
  } catch (error) {
    setNotice(error.message);
  }
});

els.logoutBtn.addEventListener("click", async () => {
  try {
    await api("/api/logout", { method: "POST", body: "{}" });
  } catch {}
  state.token = "";
  state.user = null;
  state.friends = [];
  localStorage.removeItem("nexusToken");
  setNotice("Signed out.");
  renderAll();
});

els.addFriendForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.user) {
    setNotice("Sign in before adding friends.");
    return;
  }
  try {
    await api("/api/friends/add", { method: "POST", body: JSON.stringify({ username: els.friendInput.value }) });
    els.friendInput.value = "";
    await loadFriends();
    setNotice("Friend added.");
    renderAll();
  } catch (error) {
    setNotice(error.message);
  }
});

els.backBtn.addEventListener("click", () => navigate("#games"));
els.resumeBtn.addEventListener("click", () => navigate(`#game/${state.stats.lastPlayed || state.currentGame.id}`));
els.surpriseBtn.addEventListener("click", surpriseGame);
els.blankBtn.addEventListener("click", () => openBlankGame(state.currentGame));
els.reloadBtn.addEventListener("click", () => renderPlay(state.currentGame));
els.fullscreenBtn.addEventListener("click", async () => {
  if (els.playPanel.requestFullscreen) await els.playPanel.requestFullscreen();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    flushPlaytime();
  } else if (state.route === "play") {
    state.lastTick = Date.now();
  }
});

window.addEventListener("hashchange", route);
window.addEventListener("beforeunload", () => {
  if (state.route === "play") {
    const now = Date.now();
    const seconds = Math.floor((now - state.lastTick) / 1000);
    if (seconds > 0) localPlaytime(state.currentGame, seconds);
  }
});

setInterval(() => {
  flushPlaytime();
  heartbeat();
}, 15000);

loadMe().then(() => {
  route();
  renderAll();
});
