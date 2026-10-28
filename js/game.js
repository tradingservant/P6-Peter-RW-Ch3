(function () {
  const content = globalThis.P6_CONTENT;
  const app = document.getElementById("app");
  const STORE = "p6-peter-rw-ch3-v1";

  const ICONS = {
    tsunami: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#e7f3ff"/><path d="M6 48c8-14 14-14 22 0s14 14 22 0 14-14 22 0v22H6V48z" fill="#1f7aed"/><path d="M8 44c7-10 12-8 18 2" fill="none" stroke="#7ec8ff" stroke-width="4" stroke-linecap="round"/><circle cx="58" cy="20" r="8" fill="#ffd15c"/></svg>`,
    drought: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#fff4d2"/><circle cx="40" cy="28" r="12" fill="#f5b400"/><path d="M10 58h60M16 66h48M22 74h36" stroke="#c9842a" stroke-width="3" stroke-linecap="round"/><path d="M28 52c6 8 18 8 24 0" fill="none" stroke="#a16207" stroke-width="3"/></svg>`,
    earthquake: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#f8efe6"/><path d="M8 50h18l6-14 8 28 8-20 8 10h16" fill="none" stroke="#c2410c" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><rect x="18" y="22" width="18" height="16" rx="2" fill="#d6b08a"/><path d="M22 22l5-8h8l-2 8" fill="#e7c7a1"/></svg>`,
    typhoon: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#e5fbff"/><path d="M40 14c12 8 12 16 0 22-14 6-14 16 0 24 10 6 22 2 28-6" fill="none" stroke="#0e8f8a" stroke-width="6" stroke-linecap="round"/><path d="M18 30c10 2 14 8 10 14" fill="none" stroke="#67d4cf" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="40" r="4" fill="#0e8f8a"/></svg>`,
    flood: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#e8f2ff"/><path d="M14 36h22v14H14z" fill="#f2d2b3"/><path d="M12 36l13-12 13 12" fill="#e07a5f"/><path d="M6 56c6-6 10-6 16 0s10 6 16 0 10-6 16 0 10 6 16 0v14H6V56z" fill="#3d7ec9"/><rect x="46" y="48" width="20" height="8" rx="2" fill="#234e70"/></svg>`,
    landslides: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#f6f0e6"/><path d="M10 62 L34 26 L48 40 L70 62 Z" fill="#8a5a32"/><path d="M34 26 L48 18 L62 40 L48 40 Z" fill="#c4a484"/><circle cx="42" cy="48" r="5" fill="#6b3f22"/><circle cx="54" cy="54" r="4" fill="#6b3f22"/><path d="M8 66h64" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/></svg>`,
    tornado: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#f3e8ff"/><path d="M16 20h48c-6 8-10 10-24 10S22 28 16 20z" fill="#6c4ed4"/><path d="M28 32h24c-4 8-8 10-12 10s-8-2-12-10z" fill="#8b6cf0"/><path d="M36 44h8l-2 16h-4l-2-16z" fill="#a78bfa"/></svg>`,
    volcano: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#fff1e8"/><path d="M10 64 L32 28 h8 L40 18 h8 l2 10 h6 L70 64 Z" fill="#7c3a2d"/><path d="M40 18c2-8 6-10 8-16 0 6 4 8 4 14" fill="#ff5a36"/><path d="M36 30h16l-4 10H40z" fill="#ffb703"/></svg>`,
    lava: `<svg viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#fff1e8"/><path d="M24 58c0-16 8-20 16-32 8 12 16 16 16 32 0 8-8 12-16 12s-16-4-16-12z" fill="#ff5a36"/><path d="M36 50c2-8 6-10 8-16 0 6 2 8 4 14-4 2-8 2-12 2z" fill="#ffd15c"/></svg>`,
    traffic: "",
    train: "",
    dark: "",
  };

  const SCENES = {
    drought: `<svg viewBox="0 0 320 150" role="img" aria-label="Dry cracked earth and a dead stump"><rect width="320" height="150" fill="#f6e7b2"/><circle cx="250" cy="36" r="18" fill="#f5b400"/><path d="M20 90h280M40 108h240M70 126h180" stroke="#b7791f" stroke-width="4" stroke-linecap="round"/><rect x="78" y="58" width="28" height="36" rx="4" fill="#8a5a32"/><path d="M70 62h44M74 52h36" stroke="#6b3f22" stroke-width="6" stroke-linecap="round"/></svg>`,
    typhoon: `<svg viewBox="0 0 320 150" role="img" aria-label="Trees bending in strong wind and rain"><rect width="320" height="150" fill="#d7f3f6"/><path d="M30 120 C70 70 80 40 120 36" fill="none" stroke="#2f6b3a" stroke-width="8"/><path d="M150 120 C190 60 200 40 250 30" fill="none" stroke="#2f6b3a" stroke-width="8"/><path d="M40 20l140 8M30 40l160 10M50 60l150 12" stroke="#7dd3dc" stroke-width="3" stroke-linecap="round"/></svg>`,
    earthquake: `<svg viewBox="0 0 320 150" role="img" aria-label="A road cracked by an earthquake"><rect width="320" height="150" fill="#efe6da"/><path d="M0 100h320v30H0z" fill="#9ca3af"/><path d="M20 112h40l16-22 18 36 20-28 24 18h160" fill="none" stroke="#f8fafc" stroke-width="6" stroke-linejoin="round"/><rect x="40" y="40" width="50" height="40" fill="#e7c7a1"/><path d="M36 40l30-24 28 24" fill="#c2410c"/><path d="M48 40v40M70 28v52" stroke="#7c3a2d" stroke-width="3"/></svg>`,
    flood: `<svg viewBox="0 0 320 150" role="img" aria-label="A street and car under flood water"><rect width="320" height="150" fill="#e8eef5"/><rect x="36" y="36" width="70" height="48" fill="#f2d2b3"/><path d="M30 36l40-24 42 24" fill="#e07a5f"/><path d="M0 96c20-12 30-12 50 0s30 12 50 0 30-12 50 0 30 12 50 0 30-12 50 0 30 12 50 0v54H0V96z" fill="#3d7ec9"/><rect x="150" y="78" width="70" height="22" rx="6" fill="#1e3a5f"/><circle cx="168" cy="102" r="8" fill="#111827"/><circle cx="204" cy="102" r="8" fill="#111827"/></svg>`,
    landslides: `<svg viewBox="0 0 320 150" role="img" aria-label="Earth sliding down onto a road"><rect width="320" height="150" fill="#f3efe6"/><path d="M0 130h320v20H0z" fill="#6b7280"/><path d="M20 120 L120 30 L180 70 L300 120 Z" fill="#8a5a32"/><path d="M120 30 L170 18 L210 70 L180 70 Z" fill="#d6b08a"/><circle cx="150" cy="86" r="10" fill="#6b3f22"/><circle cx="190" cy="100" r="8" fill="#6b3f22"/><circle cx="220" cy="112" r="7" fill="#6b3f22"/></svg>`,
    tsunami: `<svg viewBox="0 0 320 150" role="img" aria-label="A huge wave hitting the shore"><rect width="320" height="150" fill="#dbeafe"/><path d="M0 70c40-40 70-20 100 10 30 30 50 40 80 10 20-20 50-50 90-20 20 16 40 20 50 16v64H0V70z" fill="#1d4ed8"/><path d="M200 78c20-30 40-28 60-8" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><rect x="30" y="96" width="36" height="24" fill="#f2d2b3"/><path d="M26 96l22-16 20 16" fill="#e07a5f"/></svg>`,
    traffic: `<svg viewBox="0 0 320 110" role="img" aria-label="A traffic jam"><rect width="320" height="110" fill="#e8f5e9"/><rect y="48" width="320" height="36" fill="#9ca3af"/><rect x="16" y="56" width="54" height="22" rx="4" fill="#ef4444"/><rect x="80" y="56" width="54" height="22" rx="4" fill="#f59e0b"/><rect x="144" y="56" width="54" height="22" rx="4" fill="#3b82f6"/><rect x="208" y="56" width="54" height="22" rx="4" fill="#10b981"/><circle cx="30" cy="28" r="10" fill="#86efac"/><circle cx="70" cy="24" r="14" fill="#86efac"/></svg>`,
    train: `<svg viewBox="0 0 320 110" role="img" aria-label="A crowded train platform"><rect width="320" height="110" fill="#eef2ff"/><rect x="20" y="30" width="280" height="50" rx="10" fill="#312e81"/><rect x="36" y="42" width="36" height="26" rx="4" fill="#c7d2fe"/><rect x="80" y="42" width="36" height="26" rx="4" fill="#c7d2fe"/><rect x="124" y="42" width="36" height="26" rx="4" fill="#c7d2fe"/><circle cx="200" cy="70" r="10" fill="#fbbf24"/><circle cx="224" cy="70" r="10" fill="#fb7185"/><circle cx="248" cy="70" r="10" fill="#34d399"/><circle cx="272" cy="70" r="10" fill="#60a5fa"/></svg>`,
    dark: `<svg viewBox="0 0 320 110" role="img" aria-label="A dark hotel room during a typhoon"><rect width="320" height="110" fill="#1e1b4b"/><rect x="30" y="24" width="70" height="50" rx="4" fill="#312e81"/><path d="M40 30l40 20M80 30L40 50" stroke="#93c5fd" stroke-width="3"/><circle cx="210" cy="58" r="16" fill="#fde68a"/><rect x="200" y="40" width="20" height="36" rx="4" fill="#374151"/></svg>`,
  };

  const state = {
    screen: "home",
    moduleId: null,
    step: 0,
    score: 0,
    perfect: 0,
    answered: 0,
    total: 0,
    misses: [],
    sound: true,
    showHelp: false,
    confirmReset: false,
    play: {},
    lastPassage: null,
    showPassage: false,
    library: [],
  };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
      state.progress = saved.progress || {};
      state.sound = saved.sound !== false;
    } catch (err) {
      state.progress = {};
    }
  }

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify({ progress: state.progress, sound: state.sound }));
    } catch (err) {
      /* private mode can block storage */
    }
  }

  function hasZh(text) {
    return /[\u4e00-\u9fff]/.test(String(text || ""));
  }

  function langAttr(text) {
    return hasZh(text) ? ` lang="zh-Hant"` : "";
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch]));
  }

  function moduleById(id) {
    return content.modules.find((mod) => mod.id === id);
  }

  function currentModule() {
    return moduleById(state.moduleId);
  }

  function currentStep() {
    const mod = currentModule();
    return mod ? mod.steps[state.step] : null;
  }

  function countItems(step) {
    if (!step) return 0;
    if (step.kind === "mcq") return 1;
    if (step.kind === "iconHunt" || step.kind === "problemHunt") return step.items.length;
    if (step.kind === "scenePick") return step.scenes.length;
    if (step.kind === "bank") return step.items.length;
    if (step.kind === "builder") return step.items.length;
    return 0;
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function icon(name, className) {
    const svg = ICONS[name] || SCENES[name] || "";
    return `<span class="${className || "ico"}">${svg}</span>`;
  }

  function stars(n) {
    return [1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("");
  }

  function beep(freq, dur, type) {
    if (!state.sound) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!beep.ctx) beep.ctx = new AudioCtx();
    const ctx = beep.ctx;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
  }

  function cheer() {
    beep(523, 0.12);
    setTimeout(() => beep(659, 0.12), 90);
    setTimeout(() => beep(784, 0.16), 180);
  }

  function buzz() {
    beep(196, 0.18, "triangle");
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.createElement("div");
    layer.className = "confetti";
    const colors = ["#ff7a3c", "#ffd15c", "#1f7aed", "#1f9d55", "#e23b4a", "#6c4ed4"];
    for (let i = 0; i < 28; i += 1) {
      const bit = document.createElement("i");
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.background = colors[i % colors.length];
      bit.style.animationDelay = `${Math.random() * 0.2}s`;
      layer.appendChild(bit);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 1000);
  }

  function initPlay(step) {
    const play = { forStep: state.step, tries: {}, disabled: {}, i: 0, checks: 0, selected: null, slots: {}, done: {}, message: null };
    if (step.kind === "mcq") play.options = shuffle(step.options);
    if (step.kind === "iconHunt" || step.kind === "problemHunt") play.order = shuffle(step.items.map((_, index) => index));
    if (step.kind === "scenePick") play.order = shuffle(step.scenes.map((_, index) => index));
    if (step.kind === "builder") {
      step.items.forEach((item) => {
        play.slots[`${item.id}:result`] = null;
        play.slots[`${item.id}:reason`] = null;
      });
    }
    if (step.kind === "bank") {
      play.bank = shuffle(step.bank);
    }
    if (step.kind === "read") {
      state.library = (state.library || []).concat(step);
      state.lastPassage = step;
    }
    state.play = play;
    state.showPassage = false;
  }

  function startModule(id) {
    const mod = moduleById(id);
    state.screen = "play";
    state.moduleId = id;
    state.step = 0;
    state.score = 0;
    state.perfect = 0;
    state.answered = 0;
    state.misses = [];
    state.total = mod.steps.reduce((sum, step) => sum + countItems(step), 0);
    state.play = {};
    state.showHelp = false;
    state.lastPassage = null;
    state.library = [];
    render(true);
  }

  function finishModule() {
    const ratio = state.total ? state.perfect / state.total : 1;
    const earned = ratio >= 0.9 ? 3 : ratio >= 0.65 ? 2 : 1;
    const prev = state.progress[state.moduleId] || { stars: 0, score: 0 };
    state.progress[state.moduleId] = {
      stars: Math.max(prev.stars, earned),
      score: Math.max(prev.score, state.score),
    };
    save();
    state.screen = "result";
    state.earned = earned;
    if (earned >= 2) confetti();
    cheer();
    render(true);
  }

  function nextStep() {
    const mod = currentModule();
    if (state.step + 1 >= mod.steps.length) {
      finishModule();
      return;
    }
    state.step += 1;
    state.play = {};
    render(true);
  }

  function record(okFirst, question, answer, why) {
    state.answered += 1;
    if (okFirst) {
      state.perfect += 1;
      state.score += 10;
      cheer();
    } else {
      state.score += 4;
      state.misses.push({ q: question, a: answer, why: why || "" });
      buzz();
    }
  }

  function feedback(ok, text) {
    if (state.play) state.play.message = { ok, text };
    const node = document.getElementById("feedback");
    if (!node) return;
    node.className = `feedback ${ok ? "good" : "bad"}`;
    node.lang = hasZh(text) ? "zh-Hant" : "en";
    node.textContent = text;
  }

  let suppressClick = false;

  function render(scroll) {
    const step = state.screen === "play" ? currentStep() : null;
    if (step && state.play.forStep !== state.step) initPlay(step);
    app.innerHTML = shell(step);
    if (scroll) {
      const main = document.querySelector(".main");
      if (main) main.scrollTop = 0;
      window.scrollTo(0, 0);
    }
    wireDrag();
  }

  function shell(step) {
    return `${topbar()}${state.screen === "home" ? home() : ""}${state.screen === "play" ? play(step) : ""}${state.screen === "result" ? result() : ""}`;
  }

  function topbar() {
    const mod = currentModule();
    const title = mod && state.screen !== "home"
      ? `<h1>${esc(mod.zh)} · ${esc(mod.en)}</h1><p>${state.answered}/${state.total} · ${state.score} pts</p>`
      : `<h1>Peter · Ch3</h1><p>Reading &amp; Writing</p>`;
    const homeBtn = state.screen === "home"
      ? ""
      : `<button class="icon-btn" data-action="home" aria-label="回主頁">主頁</button>`;
    return `<header class="topbar"><div class="brand"><div class="brand-mark" aria-hidden="true">${ICONS.tsunami}</div><div>${title}</div></div><div class="spacer"></div>${homeBtn}<button class="icon-btn" data-action="sound" aria-pressed="${state.sound ? "true" : "false"}" aria-label="${state.sound ? "音效開" : "音效關"}">音效</button></header>`;
  }

  function home() {
    const cards = content.modules.map((mod, index) => {
      const saved = state.progress[mod.id];
      const n = saved ? saved.stars : 0;
      return `<button class="quest" data-action="open" data-module="${esc(mod.id)}">
        <span class="quest-index" style="background:${esc(mod.hue)}">${index + 1}</span>
        <span>
          <h3>${esc(mod.zh)} <span class="en">${esc(mod.en)}</span></h3>
          <p class="blurb">${esc(mod.blurb)}</p>
          <div class="stars" aria-label="${n} stars">${stars(n)} ${n ? "" : `<span class="gloss">未玩過</span>`}</div>
        </span>
      </button>`;
    }).join("");
    const minis = ["tsunami", "typhoon", "volcano", "tornado", "flood"].map((name) => `<span class="mini-ico">${ICONS[name]}</span>`).join("");
    const reset = state.confirmReset
      ? `<button class="text-btn" data-action="reset-yes">確定清除</button>`
      : `<button class="text-btn" data-action="reset">清除星星</button>`;
    return `<div class="main"><section class="hero">
      <p class="kicker">P6-Peter-RW-Ch3</p>
      <h2>${esc(content.title)}</h2>
      <p>${esc(content.subtitle)}</p>
      <p class="motto">${esc(content.motto)}</p>
      <p class="hero-note">五關小遊戲：詞彙、動詞、since、百科閱讀、颱風日記。題目用中文；詞彙答案是圖像加英文。閱讀和日記的英文要自己讀。</p>
      <div class="mascot-row">${minis}</div>
    </section>
    <div class="map">${cards}</div>
    <div class="row">${reset}</div>
    <p class="footer-note">Book 6A Chapter 3 · Natural disasters · Salvation Army Tin Ka Ping School task-book practice</p>
    </div>`;
  }

  function play(step) {
    const mod = currentModule();
    const pct = state.total ? Math.round((state.answered / state.total) * 100) : 0;
    const help = state.showHelp ? `<div class="help" lang="zh-Hant">${esc(mod.help)}</div>` : "";
    const canLook = step.kind !== "read" && state.library && state.library.length;
    const passage = state.showPassage && canLook
      ? state.library.map((entry) => `<section class="panel look"><p class="kicker">${esc(entry.section || entry.title || "")}</p>${passageHtml(entry)}</section>`).join("")
      : "";
    const note = state.play.message;
    const banked = step.kind === "bank";
    return `<div class="main${banked ? " has-bank" : ""}">
      <div class="progress" aria-hidden="true"><div style="width:${pct}%"></div></div>
      <div class="row" style="margin-top:0"><button class="text-btn" data-action="help">${state.showHelp ? "收起提示" : "提示"}</button>
      ${canLook ? `<button class="text-btn" data-action="passage">${state.showPassage ? "收起文章" : "看文章"}</button>` : ""}</div>
      ${help}${passage}
      ${renderStep(step)}
      <p id="feedback" class="feedback ${note ? (note.ok ? "good" : "bad") : ""}"${note ? langAttr(note.text) : ""} aria-live="polite">${note ? esc(note.text) : ""}</p>
    </div>${step.kind === "bank" ? bankHtml(step) : ""}`;
  }

  function renderStep(step) {
    if (step.kind === "teach") return teachHtml(step);
    if (step.kind === "mcq") return mcqHtml(step);
    if (step.kind === "iconHunt") return iconHuntHtml(step);
    if (step.kind === "problemHunt") return problemHtml(step);
    if (step.kind === "scenePick") return sceneHtml(step);
    if (step.kind === "bank") return bankStoryHtml(step);
    if (step.kind === "builder") return builderHtml(step);
    if (step.kind === "read") return readHtml(step);
    return "";
  }

  function teachHtml(step) {
    let body = `<p>${esc(step.body || "")}</p>`;
    if (step.glossLine) body += `<p lang="zh-Hant"><strong>${esc(step.glossLine)}</strong></p>`;
    if (step.example) body += `<p class="why">${esc(step.example)}</p>`;
    if (step.cards) {
      body += `<div class="card-grid">${step.cards.map((name) => `<button class="word-card" data-action="speak" data-word="${esc(name)}">${ICONS[name]}<strong>${esc(name)}</strong><span class="gloss" lang="zh-Hant">${esc(content.gloss[name] || "")}</span><span class="gloss">讀音</span></button>`).join("")}</div>`;
    }
    if (step.pairs) {
      body += `<table class="pair-table">${step.pairs.map(([base, past]) => `<tr><td>${esc(base)}</td><td>→ ${esc(past)}</td></tr>`).join("")}</table>`;
    }
    const last = state.step + 1 >= currentModule().steps.length;
    return `<section class="panel"><p class="kicker">學一學</p><h2 class="step-title"${langAttr(step.title)}>${esc(step.title || "學一學")}</h2>${body}<button class="big-go" data-action="next">${last ? "完成" : "開始"}</button></section>`;
  }

  function readHtml(step) {
    const note = step.note ? `<p lang="zh-Hant">${esc(step.note)}</p>` : "";
    return `<section class="panel"><p class="kicker">${esc(step.title)}</p><h2 class="step-title">${esc(step.section)}</h2>${note}<div class="passage">${passageHtml(step)}</div><button class="big-go" data-action="next">我讀好了</button></section>`;
  }

  function passageHtml(step) {
    const paras = (step.paragraphs || []).map((parts) => {
      const html = parts.map((part) => part.em ? `<span class="em">${esc(part.t)}</span>` : esc(part.t)).join("");
      return `<p>${html}</p>`;
    }).join("");
    return paras;
  }

  function mcqHtml(step) {
    const options = state.play.options || step.options;
    const buttons = options.map((option) => {
      const off = state.play.disabled[option] ? "disabled" : "";
      return `<button class="choice" data-action="mcq" data-option="${esc(option)}" ${off}>${esc(option)}</button>`;
    }).join("");
    const why = state.play.revealed ? `<div class="why"${langAttr(step.why)}>${esc(step.why || "")}</div><button class="big-go" data-action="next">下一題</button>` : "";
    return `<section class="panel"><p class="kicker">選擇題</p><h2 class="step-title"${langAttr(step.q)}>${esc(step.q)}</h2><div class="choices">${buttons}</div>${why}</section>`;
  }

  function iconHuntHtml(step) {
    const item = step.items[state.play.order[state.play.i]];
    const buttons = Object.keys(content.gloss).map((name) => `<button class="icon-pick" data-action="hunt" data-id="${esc(name)}">${ICONS[name]}<strong>${esc(name)}</strong></button>`).join("");
    return `<section class="panel"><p class="kicker">${esc(step.title)} · ${state.play.i + 1}/${step.items.length}</p><p class="prompt-word" lang="zh-Hant">${esc(item.say)}</p><div class="icon-grid">${buttons}</div></section>`;
  }

  function problemHtml(step) {
    const item = step.items[state.play.order[state.play.i]];
    const buttons = ["tsunami", "drought", "earthquake", "typhoon", "flood", "landslides", "tornado", "volcano", "lava"].map((name) => `<button class="icon-pick" data-action="problem" data-id="${esc(name)}">${ICONS[name]}<strong>${esc(name)}</strong></button>`).join("");
    const intro = step.intro ? `<p lang="zh-Hant">${esc(step.intro)}</p>` : "";
    return `<section class="panel"><p class="kicker">${esc(step.title)} · ${state.play.i + 1}/${step.items.length}</p>${intro}<h2 class="step-title" lang="zh-Hant">${esc(item.q)}</h2><div class="icon-grid">${buttons}</div></section>`;
  }

  function sceneHtml(step) {
    const scene = step.scenes[state.play.order[state.play.i]];
    const buttons = step.choices.map((choice) => `<button class="choice" data-action="scene" data-id="${esc(choice.id)}">${esc(choice.label)}</button>`).join("");
    const full = state.play.revealed ? `<div class="why"><strong>${esc(scene.answer)}.</strong> ${esc(step.sentences[scene.answer])}</div><button class="big-go" data-action="next-scene">繼續</button>` : "";
    const intro = step.intro ? `<p lang="zh-Hant">${esc(step.intro)}</p>` : "";
    return `<section class="panel"><p class="kicker">${esc(step.title)} · ${state.play.i + 1}/${step.scenes.length}</p>${intro}<div class="scene-art">${SCENES[scene.scene]}</div><div class="choices">${buttons}</div>${full}</section>`;
  }

  function bankStoryHtml(step) {
    const bits = step.items.map((item) => {
      const filled = state.play.slots[item.id];
      const locked = state.play.done[item.id];
      const cls = locked ? "blank is-locked" : state.play.selected ? "blank is-armed" : "blank";
      const label = filled || "______";
      return `<p class="story-bit">${esc(item.before)} <button type="button" class="${cls}" data-action="blank" data-id="${esc(item.id)}" ${locked ? "disabled" : ""}>${esc(label)}</button> ${esc(item.after)}</p>`;
    }).join("");
    const done = step.items.every((item) => state.play.done[item.id]);
    return `<section class="panel"><p class="kicker">${esc(step.title)}</p><p>${esc(step.intro || "")}</p>${bits}${done ? `<button class="big-go" data-action="next">下一題</button>` : `<p class="gloss">點選下面的字，再點空格。也可以拖過去。</p>`}</section>`;
  }

  function builderChips(step) {
    const item = step.items[state.play.i];
    if (state.play.chipFor !== item.id) {
      state.play.chipFor = item.id;
      state.play.itemChips = shuffle([item.result, item.reason, ...(item.traps || step.distractors || [])]);
      state.play.selected = null;
      state.play.checks = 0;
      state.play.revealed = false;
    }
    return state.play.itemChips;
  }

  function builderHtml(step) {
    const item = step.items[state.play.i];
    const result = state.play.slots[`${item.id}:result`];
    const reason = state.play.slots[`${item.id}:reason`];
    const chips = builderChips(step).map((word) => {
      const used = word === result || word === reason;
      const selected = state.play.selected === word ? "is-selected" : "";
      return `<button class="chip ${selected}" data-action="chip" data-word="${esc(word)}" ${used ? "disabled" : ""}>${esc(word)}</button>`;
    }).join("");
    const ready = result && reason;
    const revealed = state.play.revealed
      ? `<div class="why"><p>${esc(item.full)}</p><p>${esc(step.why || "")}</p></div><button class="big-go" data-action="next-builder">${state.play.i + 1 >= step.items.length ? "繼續" : "下一句"}</button>`
      : "";
    return `<section class="panel"><p class="kicker">${esc(step.kicker || "since")} · ${state.play.i + 1}/${step.items.length}</p><h2 class="step-title">${esc(step.title)}</h2><p>${esc(step.lead || "")}</p>
      <div class="builder-card"><p class="kicker">${esc(item.label)}</p><div class="scene-art">${SCENES[item.scene] || ""}</div>
        <button type="button" class="blank ${result ? "is-locked" : "is-armed"}" data-action="slot" data-slot="${esc(item.id)}:result"><span class="slot-label">結果</span>${esc(result || "點選片語")}</button>
        <span class="since-word">since</span>
        <button type="button" class="blank ${reason ? "is-locked" : "is-armed"}" data-action="slot" data-slot="${esc(item.id)}:reason"><span class="slot-label">原因</span>${esc(reason || "點選片語")}</button>
      </div>
      <div class="bank-tray">${chips}</div>
      ${ready && !state.play.revealed ? `<button class="big-go" data-action="check-builder">檢查</button>` : ""}
      ${revealed}</section>`;
  }

  function bankHtml(step) {
    if (step.kind === "bank") {
      const chips = (state.play.bank || []).map((word) => {
        const used = Object.values(state.play.slots).includes(word) && step.items.some((item) => state.play.done[item.id] && state.play.slots[item.id] === word);
        const selected = state.play.selected === word ? "is-selected" : "";
        return `<button class="chip ${selected}" data-action="chip" data-word="${esc(word)}" ${used ? "disabled" : ""}>${esc(word)}</button>`;
      }).join("");
      return `<div class="bank"><div class="bank-tray">${chips}</div></div>`;
    }
    const placed = new Set(Object.values(state.play.slots).filter(Boolean));
    const chips = (state.play.chips || []).map((chip, index) => {
      const used = placed.has(chip.text);
      const selected = state.play.selected === chip.text ? "is-selected" : "";
      return `<button class="chip ${selected}" data-action="chip" data-word="${esc(chip.text)}" data-index="${index}" ${used ? "disabled" : ""}>${esc(chip.text)}</button>`;
    }).join("");
    return `<div class="bank"><div class="bank-tray">${chips}</div></div>`;
  }

  function result() {
    const mod = currentModule();
    const ids = content.modules.map((item) => item.id);
    const nextId = ids[ids.indexOf(mod.id) + 1];
    const misses = state.misses.length
      ? `<h3>再看一眼</h3><ul class="miss-list">${state.misses.slice(0, 8).map((miss) => `<li><strong>${esc(miss.q)}</strong><br>答案：${esc(miss.a)}${miss.why ? `<br><span class="gloss">${esc(miss.why)}</span>` : ""}</li>`).join("")}</ul>`
      : `<p>全部一次過！太棒了！</p>`;
    const all = content.modules.every((item) => (state.progress[item.id] || {}).stars > 0);
    return `<div class="main"><section class="panel">
      <p class="kicker">${esc(mod.zh)}完成</p>
      <h2 class="step-title">${state.earned === 3 ? "三星！" : state.earned === 2 ? "兩星，好厲害！" : "過關！再玩可以拿更多星。"}</h2>
      <div class="score-stars" aria-label="${state.earned} stars">${stars(state.earned)}</div>
      <p>${state.perfect}/${state.total} 題第一次就對 · ${state.score} 分</p>
      ${misses}
      ${all ? `<div class="why"><strong>We can make a difference!</strong><p>五關都玩過了。天災之後，人可以互相幫忙。</p></div>` : ""}
      <div class="row">
        <button class="big-go" data-action="replay">再玩一次</button>
        ${nextId ? `<button class="text-btn" data-action="open" data-module="${esc(nextId)}">下一關</button>` : ""}
        <button class="text-btn" data-action="home">回主頁</button>
      </div>
    </section></div>`;
  }

  function onMcq(option, button) {
    const step = currentStep();
    if (state.play.revealed) return;
    if (option === step.answer) {
      button.classList.add("is-right");
      const first = Object.keys(state.play.disabled).length === 0;
      record(first, step.q, step.answer, step.why);
      state.play.revealed = true;
      render(false);
      feedback(true, first ? "太棒了！" : "今次對了！");
    } else {
      state.play.disabled[option] = true;
      button.classList.add("is-wrong");
      buzz();
      feedback(false, "再試一次～");
      setTimeout(() => render(false), 280);
    }
  }

  function onHunt(id, button, kind) {
    const step = currentStep();
    const index = state.play.order[state.play.i];
    const item = step.items[index];
    const answer = item.answer;
    if (state.play.locked) return;
    if (id === answer) {
      button.classList.add("is-right");
      const key = `${kind}:${index}`;
      const first = !state.play.tries[key];
      record(first, item.say || item.q, answer, item.why);
      state.play.locked = true;
      const gloss = content.gloss[answer] ? ` ${content.gloss[answer]}` : "";
      feedback(true, `${first ? "好眼力！" : "對了！"} ${answer}${gloss}`);
      setTimeout(() => {
        state.play.locked = false;
        if (state.play.i + 1 >= step.items.length) nextStep();
        else {
          state.play.i += 1;
          render(false);
        }
      }, 650);
    } else {
      const key = `${kind}:${index}`;
      state.play.tries[key] = (state.play.tries[key] || 0) + 1;
      button.classList.add("is-wrong");
      buzz();
      const gloss = content.gloss[answer];
      const promptIsGloss = kind === "icon" && gloss && item.say === gloss;
      feedback(false, state.play.tries[key] >= 2 && gloss && !promptIsGloss ? `提示：${gloss}` : "再看看圖。");
      setTimeout(() => button.classList.remove("is-wrong"), 350);
    }
  }

  function onScene(id, button) {
    const step = currentStep();
    if (state.play.revealed) return;
    const scene = step.scenes[state.play.order[state.play.i]];
    if (id === scene.answer) {
      const key = `scene:${state.play.order[state.play.i]}`;
      const first = !state.play.tries[key];
      const sceneName = content.gloss[scene.scene] || scene.scene;
      record(first, `圖片：${sceneName}`, scene.answer, step.sentences[scene.answer]);
      state.play.revealed = true;
      render(false);
      feedback(true, scene.answer === "E" && (scene.scene === "flood" || scene.scene === "landslides") ? "E 有兩張圖，洪水和山泥傾瀉都是 E。" : "配對正確！");
    } else {
      const key = `scene:${state.play.order[state.play.i]}`;
      state.play.tries[key] = (state.play.tries[key] || 0) + 1;
      button.classList.add("is-wrong");
      buzz();
      feedback(false, "再試一次。E 可以用兩次。");
    }
  }

  function placeBank(word, blankId) {
    const step = currentStep();
    const item = step.items.find((entry) => entry.id === blankId);
    if (!item || state.play.done[item.id]) return;
    if (word === item.answer) {
      const first = !state.play.tries[item.id];
      state.play.slots[item.id] = word;
      state.play.done[item.id] = true;
      state.play.selected = null;
      record(first, `${item.before} ______ ${item.after}`, item.answer, item.hint);
      render(false);
      feedback(true, first ? "放對了！" : "今次對了！");
    } else {
      state.play.tries[item.id] = (state.play.tries[item.id] || 0) + 1;
      const blank = document.querySelector(`[data-action="blank"][data-id="${CSS.escape(item.id)}"]`);
      if (blank) {
        blank.classList.add("is-wrong");
        setTimeout(() => blank.classList.remove("is-wrong"), 350);
      }
      buzz();
      if (state.play.tries[item.id] >= 2) feedback(false, item.hint);
      else feedback(false, "再試一次。這個字不是這裡。");
      if (state.play.tries[item.id] >= 3) {
        state.play.slots[item.id] = item.answer;
        state.play.done[item.id] = true;
        state.play.selected = null;
        record(false, `${item.before} ______ ${item.after}`, item.answer, item.hint);
        render(false);
        feedback(false, `答案是 ${item.answer}。${item.hint}`);
      }
    }
  }

  function placeSlot(word, slotId) {
    if (!slotId || state.play.revealed) return;
    const previous = Object.keys(state.play.slots).find((key) => state.play.slots[key] === word);
    if (previous) state.play.slots[previous] = null;
    state.play.slots[slotId] = word;
    state.play.selected = null;
    render(false);
  }

  function checkBuilder() {
    const step = currentStep();
    const item = step.items[state.play.i];
    const wrong = state.play.slots[`${item.id}:result`] !== item.result
      || state.play.slots[`${item.id}:reason`] !== item.reason;
    state.play.checks += 1;
    if (!wrong) {
      record(state.play.checks === 1, item.label, item.full, step.why);
      state.play.revealed = true;
      render(false);
      feedback(true, "句子組好了！");
      return;
    }
    buzz();
    if (state.play.checks >= 3) {
      state.play.slots[`${item.id}:result`] = item.result;
      state.play.slots[`${item.id}:reason`] = item.reason;
      record(false, item.label, item.full, step.why);
      state.play.revealed = true;
      render(false);
      feedback(false, "看看正確句子。");
      return;
    }
    feedback(false, state.play.checks === 1 ? "有格子放錯了。用現在式的那一組。" : step.why);
  }

  function wireDrag() {
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("pointerdown", (event) => {
        if (chip.disabled) return;
        chip.setPointerCapture(event.pointerId);
        const word = chip.dataset.word;
        let moved = false;
        const ghost = document.createElement("div");
        ghost.className = "ghost-chip";
        ghost.textContent = word;
        const move = (ev) => {
          if (Math.abs(ev.clientX - event.clientX) + Math.abs(ev.clientY - event.clientY) > 12) {
            moved = true;
            if (!ghost.parentNode) document.body.appendChild(ghost);
          }
          ghost.style.left = `${ev.clientX}px`;
          ghost.style.top = `${ev.clientY}px`;
        };
        const up = (ev) => {
          ghost.remove();
          chip.removeEventListener("pointermove", move);
          chip.removeEventListener("pointerup", up);
          if (!moved) return;
          suppressClick = true;
          setTimeout(() => { suppressClick = false; }, 500);
          const el = document.elementFromPoint(ev.clientX, ev.clientY);
          const blank = el && el.closest("[data-action='blank']");
          const slot = el && el.closest("[data-action='slot']");
          if (blank) placeBank(word, blank.dataset.id);
          else if (slot) placeSlot(word, slot.dataset.slot);
        };
        chip.addEventListener("pointermove", move);
        chip.addEventListener("pointerup", up);
      });
    });
  }

  app.addEventListener("click", (event) => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === "sound") {
      state.sound = !state.sound;
      save();
      render(false);
      return;
    }
    if (action === "home") {
      state.screen = "home";
      state.moduleId = null;
      render(true);
      return;
    }
    if (action === "open") {
      startModule(button.dataset.module);
      return;
    }
    if (action === "help") {
      state.showHelp = !state.showHelp;
      render(false);
      return;
    }
    if (action === "passage") {
      state.showPassage = !state.showPassage;
      render(false);
      return;
    }
    if (action === "speak") {
      speak(button.dataset.word);
      return;
    }
    if (action === "next") {
      nextStep();
      return;
    }
    if (action === "replay") {
      startModule(state.moduleId);
      return;
    }
    if (action === "reset") {
      state.confirmReset = true;
      render(false);
      return;
    }
    if (action === "reset-yes") {
      state.progress = {};
      state.confirmReset = false;
      save();
      render(false);
      return;
    }
    if (action === "mcq") {
      onMcq(button.dataset.option, button);
      return;
    }
    if (action === "hunt") {
      onHunt(button.dataset.id, button, "icon");
      return;
    }
    if (action === "problem") {
      onHunt(button.dataset.id, button, "problem");
      return;
    }
    if (action === "scene") {
      onScene(button.dataset.id, button);
      return;
    }
    if (action === "next-scene") {
      const step = currentStep();
      state.play.revealed = false;
      if (state.play.i + 1 >= step.scenes.length) nextStep();
      else {
        state.play.i += 1;
        render(false);
      }
      return;
    }
    if (action === "chip") {
      state.play.selected = state.play.selected === button.dataset.word ? null : button.dataset.word;
      render(false);
      return;
    }
    if (action === "blank") {
      if (!state.play.selected) {
        feedback(false, "先點下面的字。");
        return;
      }
      placeBank(state.play.selected, button.dataset.id);
      return;
    }
    if (action === "slot") {
      if (!state.play.selected) {
        if (state.play.slots[button.dataset.slot]) {
          state.play.slots[button.dataset.slot] = null;
          render(false);
        } else feedback(false, "先點下面的片語。");
        return;
      }
      placeSlot(state.play.selected, button.dataset.slot);
      return;
    }
    if (action === "check-builder") {
      checkBuilder();
      return;
    }
    if (action === "next-builder") {
      const step = currentStep();
      if (state.play.i + 1 >= step.items.length) nextStep();
      else {
        state.play.i += 1;
        state.play.chipFor = null;
        state.play.message = null;
        render(true);
      }
    }
  });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  load();
  render(true);
})();
