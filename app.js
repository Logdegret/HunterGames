const games = [
  { id: "snow-rider-3d", title: "Snow Rider 3D", category: "Arcade", tags: ["Racing", "Quick"], description: "Slide down snowy tracks, dodge hazards, and chase a cleaner run.", url: "https://ubg66.gitlab.io/snow-rider-3d/", thumbnail: "https://imgs.crazygames.com/snow-rider-3d_16x9/20260120063434/snow-rider-3d_16x9-cover" },
  { id: "bottle-flip-3d", title: "Bottle Flip 3D", category: "Skill", tags: ["Quick", "Chill"], description: "Flip the bottle across furniture and stick every landing.", url: "https://www.miniplay.com/embed/bottle-flip-3d", thumbnail: "https://www2.minijuegosgratis.com/v3/games/thumbnails/228850_1.jpg" },
  { id: "rooftop-snipers", title: "Rooftop Snipers", category: "Arcade", tags: ["2 Player", "Challenge"], description: "A wobbly rooftop duel with tiny controls and big knockouts.", url: "https://gswitch3.github.io/g/rooftop-snipers", thumbnail: "https://imgs.crazygames.com/rooftop-snipers_16x9/20250108040440/rooftop-snipers_16x9-cover" },
  { id: "basket-random", title: "Basket Random", category: "Sports", tags: ["2 Player", "Quick"], description: "Chaotic one-button basketball with random courts and physics.", url: "https://classroom-6x.io/game/basket-random/", thumbnail: "https://imgs.crazygames.com/basket-random_16x9/20240617090207/basket-random_16x9-cover" },
  { id: "polytrack", title: "PolyTrack v0.6.0", category: "Racing", tags: ["Challenge"], description: "A sharp low-poly driving challenge with speed, drifting, and precise track flow.", url: "https://smapskajendfjshwbekf-prog.github.io/newcargame/", thumbnail: null },
  { id: "eaglercraft", title: "Eaglercraft", category: "Sandbox", tags: ["Chill"], description: "A browser sandbox build for mining, crafting, and open-ended survival.", url: "https://smapskajendfjshwbekf-prog.github.io/eaglercraft/", thumbnail: null },
  { id: "stacktris", title: "Stacktris", category: "Puzzle", tags: ["Chill", "Quick"], description: "Stack pieces with puzzle timing and clean block strategy.", url: "https://htmlunblockedgames.github.io/stacktris/", thumbnail: null },
  { id: "run-3", title: "Run 3", category: "Arcade", tags: ["Runner", "Challenge"], description: "Sprint through space tunnels and keep your footing on every wall.", url: "https://lekug.github.io/tn6pS9dCf37xAhkJv/", thumbnail: "https://imgs.crazygames.com/run3b.png" },
  { id: "basketball-stars", title: "Basketball Stars", category: "Sports", tags: ["2 Player", "Challenge"], description: "Arcade basketball matchups with dunks, steals, and quick plays.", url: "https://basketball-stars.io/game/basketball-stars/", thumbnail: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=600,height=400,fit=cover,f=png/bc02c9cdfc5b424ddf343b01edf791ce/basketball-stars-logo.png" },
  { id: "slope", title: "Slope", category: "Arcade", tags: ["Runner", "Quick"], description: "Roll through neon slopes at high speed without missing the track.", url: "https://ubg66.gitlab.io/slope/", thumbnail: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/48fdcb743a8cfc4b66dbb07444dd3108/slopey-logo.png" },
  { id: "tunnel-rush", title: "Tunnel Rush", category: "Arcade", tags: ["Runner", "Challenge"], description: "React fast through a rotating tunnel of color and obstacles.", url: "https://ubg66.gitlab.io/tunnel-rush/", thumbnail: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=600,height=400,fit=cover,f=png/2094926076b7aa8264cace220ce5decc/tunnel-rush-logo.png" },
  { id: "retro-bowl", title: "Retro Bowl", category: "Sports", tags: ["Chill"], description: "Call plays, manage drives, and chase the perfect season.", url: "https://ubg66.gitlab.io/retro-bowl/", thumbnail: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=600,height=400,fit=cover,f=png/ee9ca3764ef4289a48a1ebf457ef605441ed1f35a0f2eb12707a70d609e53686/retro-bowl-logo.png" }
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
  emailInput: document.getElementById("emailInput"),
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

// ── Supabase ──────────────────────────────────────────────────
// Replace these two values with your project's URL and anon key
// (Supabase dashboard → Project Settings → API)
const SUPABASE_URL  = "https://czicirxkdjpxaygciiyu.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWNpcnhrZGpweGF5Z2NpaXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NjIzMjIsImV4cCI6MjA5NjUzODMyMn0.ypFLqGzCmwpF-B8ISQffnsh0GMYdho_K6oqaZPR3tZQ";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
// ─────────────────────────────────────────────────────────────

const ONLINE_MS = 90_000;

const emptyStats = { totalSeconds: 0, plays: 0, xp: 0, lastPlayed: "snow-rider-3d", currentGame: null, mostPlayed: null, perGame: {} };
const state = {
  route: "home",
  filter: "All",
  query: "",
  currentGame: games[0],
  user: null,
  friends: [],
  stats: JSON.parse(localStorage.getItem("hunterLocalStats") || "null") || emptyStats,
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
  localStorage.setItem("hunterLocalStats", JSON.stringify(state.stats));
}

function buildStatsFromDB(playtimeRows, profile) {
  const perGame = {};
  for (const row of playtimeRows || []) {
    perGame[row.game_id] = { seconds: row.seconds, plays: row.plays };
  }
  const totalSeconds = Object.values(perGame).reduce((s, v) => s + v.seconds, 0);
  const plays        = Object.values(perGame).reduce((s, v) => s + v.plays, 0);
  const mostPlayed   = Object.entries(perGame)
    .map(([gameId, v]) => ({ gameId, seconds: v.seconds }))
    .sort((a, b) => b.seconds - a.seconds)[0] || null;
  return {
    totalSeconds, plays,
    xp: Math.floor(totalSeconds / 60) * 10 + plays * 25,
    lastPlayed:  profile?.last_played  || "snow-rider-3d",
    currentGame: profile?.current_game || null,
    mostPlayed,
    perGame
  };
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

  const titles = { home: "Hunter Games", games: "Game Library", stats: "Statistics", friends: "Friends", profile: "Profile", play: "Now Playing" };
  els.pageTitle.textContent = titles[page] || "Hunter Games";
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
  const orbit = els.featuredCard.querySelector(".game-orbit");
  if (orbit) {
    if (featured.thumbnail) {
      orbit.style.backgroundImage = `url('${featured.thumbnail}')`;
      orbit.style.backgroundSize = "cover";
      orbit.style.backgroundPosition = "center";
      orbit.style.borderRadius = "24px";
      orbit.style.filter = "drop-shadow(0 28px 35px rgba(0,0,0,0.5))";
    } else {
      orbit.style.backgroundImage = "";
      orbit.style.backgroundSize = "";
      orbit.style.borderRadius = "50%";
      orbit.style.filter = "drop-shadow(0 28px 35px rgba(0,0,0,0.4))";
    }
  }
  if (document.getElementById("lastThumb")) {
    const thumb = document.getElementById("lastThumb");
    if (featured.thumbnail) {
      thumb.style.backgroundImage = `url('${featured.thumbnail}')`;
      thumb.style.backgroundSize = "cover";
      thumb.style.backgroundPosition = "center";
    } else {
      thumb.style.backgroundImage = "";
    }
  }
}

function renderQuickList() {
  els.quickList.innerHTML = "";
  games.slice(1, 4).forEach((game) => {
    const button = document.createElement("button");
    button.className = "quick-card";
    button.type = "button";
    const coverStyle = game.thumbnail ? `style="background-image:url('${game.thumbnail}');background-size:cover;background-position:center;"` : "";
    const coverInner = game.thumbnail ? "" : initials(game.title);
    button.innerHTML = `<div class="cover" ${coverStyle}>${coverInner}</div><div><strong>${game.title}</strong><span>${game.category}</span></div>${icon("M9 5l7 7-7 7-1.4-1.4 5.6-5.6-5.6-5.6z")}`;
    button.addEventListener("click", () => navigate(`#game/${game.id}`));
    els.quickList.appendChild(button);
  });
}

function renderActivities() {
  const last = gameById(state.stats.lastPlayed);
  const items = [
    { title: "Last Session", copy: last ? last.title : "Pick a game", target: last ? last.id : games[0].id },
    { title: "Surprise Pick", copy: "Let Hunter choose", target: null },
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
    const artStyle = game.thumbnail ? ` style="background-image:url('${game.thumbnail}');background-size:cover;background-position:center;"` : "";
    button.innerHTML = `<div class="game-art" data-initials="${initials(game.title)}"${artStyle}></div><h3>${game.title}</h3><p>${game.description}</p>`;
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
    const coverStyle = game.thumbnail ? `style="background-image:url('${game.thumbnail}');background-size:cover;background-position:center;"` : "";
    const coverInner = game.thumbnail ? "" : initials(game.title);
    row.innerHTML = `<div class="cover" ${coverStyle}>${coverInner}</div><div><strong>${game.title}</strong><span>${item.plays || 0} plays</span></div><strong>${formatTime(item.seconds || 0)}</strong>`;
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
      await sb.rpc("record_play", { p_game_id: game.id });
    } catch {}
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
      await sb.rpc("add_playtime", { p_game_id: state.currentGame.id, p_seconds: seconds });
    } catch {}
  }
  renderStats();
}

async function heartbeat() {
  if (!state.user) return;
  try {
    const currentGame = state.route === "play" ? state.currentGame.id : null;
    await sb.rpc("update_heartbeat", { p_current_game: currentGame });
    await loadFriends();
  } catch {
    // session expired — sign out gracefully
    state.user = null;
    state.friends = [];
  }
  renderAll();
}

async function loadMe() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return;
  try {
    const [{ data: profile }, { data: playtime }] = await Promise.all([
      sb.from("profiles").select("*").eq("id", session.user.id).single(),
      sb.from("playtime").select("*").eq("user_id", session.user.id)
    ]);
    if (!profile) return;
    state.user = { id: session.user.id, username: profile.username, initials: initials(profile.username) };
    state.stats = buildStatsFromDB(playtime, profile);
    await loadFriends();
  } catch {}
}

async function loadFriends() {
  if (!state.user) { state.friends = []; return; }
  const { data } = await sb
    .from("friendships")
    .select("friend:profiles!friendships_friend_id_fkey(id, username, current_game, last_seen)")
    .eq("user_id", state.user.id);
  state.friends = (data || []).map(({ friend: f }) => ({
    id: f.id,
    username: f.username,
    initials: initials(f.username),
    online: f.last_seen && (Date.now() - new Date(f.last_seen).getTime()) < ONLINE_MS,
    currentGame: f.current_game
  }));
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
  const action   = event.submitter?.dataset.auth || "login";
  const email    = els.emailInput.value.trim();
  const password = els.passwordInput.value;
  setNotice("");

  // First "Sign up" click — just reveal the username field, don't submit yet
  if (action === "signup" && els.usernameInput.classList.contains("hidden")) {
    els.usernameInput.classList.remove("hidden");
    els.usernameInput.required = true;
    els.usernameInput.focus();
    return;
  }

  if (password.length < 4) {
    setNotice("Password must be at least 4 characters.");
    return;
  }

  try {
    if (action === "signup") {
      const username = els.usernameInput.value.trim().toLowerCase().replace(/\s+/g, "_").slice(0, 24);
      if (!/^[a-z0-9_-]{3,24}$/.test(username)) {
        setNotice("Username must be 3–24 letters, numbers, _ or -.");
        return;
      }
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { data: { username } }
      });
      if (error) throw new Error(error.message);
      state.user = { id: data.user.id, username, initials: initials(username) };
      state.stats = buildStatsFromDB([], null);
      setNotice("Account created — you're signed in.");
    } else {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed"))
          throw new Error("Check your inbox and confirm your email before signing in.");
        throw new Error(error.message);
      }
      const [{ data: profile }, { data: playtime }] = await Promise.all([
        sb.from("profiles").select("*").eq("id", data.user.id).single(),
        sb.from("playtime").select("*").eq("user_id", data.user.id)
      ]);
      state.user = { id: data.user.id, username: profile.username, initials: initials(profile.username) };
      state.stats = buildStatsFromDB(playtime, profile);
      setNotice("Signed in.");
    }
    await loadFriends();
    renderAll();
  } catch (error) {
    setNotice(error.message);
  }
});

els.logoutBtn.addEventListener("click", async () => {
  await sb.auth.signOut();
  state.user = null;
  state.friends = [];
  setNotice("Signed out.");
  renderAll();
});

els.addFriendForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.user) { setNotice("Sign in before adding friends."); return; }
  const friendName = els.friendInput.value.trim().toLowerCase();
  try {
    const { data: friend, error } = await sb
      .from("profiles")
      .select("id")
      .eq("username", friendName)
      .single();
    if (error || !friend) throw new Error("No user with that username.");
    if (friend.id === state.user.id) throw new Error("That's you!");
    // Insert both directions so each side can query just by user_id
    const { error: insErr } = await sb.from("friendships").upsert([
      { user_id: state.user.id, friend_id: friend.id },
      { user_id: friend.id, friend_id: state.user.id }
    ]);
    if (insErr) throw new Error(insErr.message);
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

// Restore session on page load — onAuthStateChange fires with the stored
// session automatically, so we use it as the single boot signal.
let booted = false;
sb.auth.onAuthStateChange(async (_event, session) => {
  if (session) {
    try {
      const [{ data: profile }, { data: playtime }] = await Promise.all([
        sb.from("profiles").select("*").eq("id", session.user.id).single(),
        sb.from("playtime").select("*").eq("user_id", session.user.id)
      ]);
      if (profile) {
        state.user = { id: session.user.id, username: profile.username, initials: initials(profile.username) };
        state.stats = buildStatsFromDB(playtime, profile);
        await loadFriends();
      }
    } catch {}
  } else {
    state.user = null;
    state.friends = [];
  }
  if (!booted) { booted = true; route(); }
  renderAll();
});
