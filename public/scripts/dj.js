// DJ mode: a persistent, draggable turntable on every page.
// - The lo-fi loop is synthesized with the Web Audio API (no audio files).
// - A BPM slider rescales the site's --duration-* motion tokens.
// - On the home page, a first visit starts with a needle-drop splash.
// - Play state survives navigation; browsers block audio until the next
//   interaction, so the deck arrives "armed" and resumes on first gesture.

(function initDj() {
  const root = document.documentElement;
  const DEFAULT_BPM = 84;
  const LOOKAHEAD_MS = 100;
  // Background tabs throttle timers to ~1s, so keep well over a second of
  // audio scheduled or the loop stutters when the tab loses focus.
  const SCHEDULE_AHEAD_S = 1.8;
  const DRAG_THRESHOLD_PX = 6;

  // One chord per bar: Fmaj7 → Em7 → Dm7 → Cmaj7 (MIDI note numbers).
  const PROGRESSION = [
    [53, 57, 60, 64],
    [52, 55, 59, 62],
    [50, 53, 57, 60],
    [48, 52, 55, 59],
  ];

  function readStorage(store, key) {
    try {
      return store.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(store, key, value) {
    try {
      store.setItem(key, value);
    } catch {
      /* private mode — feature degrades gracefully */
    }
  }

  let bpm = Number(readStorage(sessionStorage, "djBpm")) || DEFAULT_BPM;
  const wasPlaying = readStorage(sessionStorage, "djPlaying") === "1";

  // ── Widget ──
  const dj = document.createElement("div");
  dj.className = "dj";
  dj.innerHTML = `
    <div class="dj-panel" id="dj-panel" hidden>
      <label for="dj-bpm">BPM</label>
      <input type="range" id="dj-bpm" min="60" max="140" step="1" />
      <span class="dj-bpm-value" id="dj-bpm-value"></span>
    </div>
    <button
      class="dj-deck"
      id="dj-toggle"
      type="button"
      aria-pressed="false"
      aria-label="Play a lo-fi loop"
      title="Drop the needle 🎧 (drag to move)"
    >
      <span class="dj-record"></span>
      <span class="dj-arm"></span>
    </button>`;
  document.body.appendChild(dj);

  const toggle = dj.querySelector("#dj-toggle");
  const panel = dj.querySelector("#dj-panel");
  const bpmInput = dj.querySelector("#dj-bpm");
  const bpmValue = dj.querySelector("#dj-bpm-value");
  bpmInput.value = String(bpm);
  bpmValue.textContent = String(bpm);

  // ── Position (draggable, persisted) ──
  function clampPosition(right, bottom) {
    const margin = 8;
    const maxRight = window.innerWidth - toggle.offsetWidth - margin;
    // Reserve headroom above the deck so the BPM panel always fits on screen.
    const maxBottom = window.innerHeight - toggle.offsetHeight - 96;
    return {
      right: Math.min(Math.max(right, margin), Math.max(margin, maxRight)),
      bottom: Math.min(Math.max(bottom, margin), Math.max(margin, maxBottom)),
    };
  }

  function placeDeck(right, bottom) {
    const pos = clampPosition(right, bottom);
    dj.style.right = `${pos.right}px`;
    dj.style.bottom = `${pos.bottom}px`;
    return pos;
  }

  function restorePosition() {
    const raw = readStorage(localStorage, "djDeckPos");
    if (!raw) return;
    try {
      const pos = JSON.parse(raw);
      if (Number.isFinite(pos.right) && Number.isFinite(pos.bottom)) {
        placeDeck(pos.right, pos.bottom);
      }
    } catch {
      /* corrupt value — keep the default corner */
    }
  }

  restorePosition();

  // ── Audio engine ──
  let audio = null; // { ctx, master }
  let playing = false;
  let nextBeatTime = 0;
  let beatIndex = 0;
  let schedulerId = null;

  function convertMidiToFrequency(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function applyTempoTokens() {
    const beatSeconds = 60 / bpm;
    // Clamp so extreme BPMs stay usable rather than comical.
    const scale = Math.min(1.4, Math.max(0.6, DEFAULT_BPM / bpm));
    root.style.setProperty("--beat-duration", `${Math.round(beatSeconds * 1000)}ms`);
    root.style.setProperty("--duration-fast", `${Math.round(150 * scale)}ms`);
    root.style.setProperty("--duration-base", `${Math.round(250 * scale)}ms`);
    root.style.setProperty("--duration-slow", `${Math.round(400 * scale)}ms`);
  }

  function resetTempoTokens() {
    for (const token of ["--beat-duration", "--duration-fast", "--duration-base", "--duration-slow"]) {
      root.style.removeProperty(token);
    }
  }

  function createAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const master = ctx.createGain();
    master.gain.value = 0.55;

    // Gentle lowpass over everything for lo-fi warmth.
    const warmth = ctx.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 5500;

    // Soft compression keeps kick + chords from summing into distortion.
    const glue = ctx.createDynamicsCompressor();
    glue.threshold.value = -20;
    glue.knee.value = 24;
    glue.ratio.value = 5;
    glue.attack.value = 0.005;
    glue.release.value = 0.2;

    master.connect(warmth);
    warmth.connect(glue);
    glue.connect(ctx.destination);

    // Vinyl crackle: a looped noise buffer of sparse pops over faint hiss.
    const seconds = 2;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.0015;
      if (Math.random() < 0.0002) {
        data[i] = (Math.random() * 2 - 1) * 0.1;
      }
    }
    const crackle = ctx.createBufferSource();
    crackle.buffer = buffer;
    crackle.loop = true;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.3;
    crackle.connect(crackleGain);
    crackleGain.connect(master);
    crackle.start();

    return { ctx, master };
  }

  function scheduleKick(time) {
    const { ctx, master } = audio;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    gain.gain.setValueAtTime(0.85, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  function scheduleHat(time) {
    const { ctx } = audio;
    const length = 0.05;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 7000;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + length);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audio.master);
    source.start(time);
  }

  function scheduleChord(time, barIndex, beatSeconds) {
    const { ctx, master } = audio;
    const notes = PROGRESSION[barIndex % PROGRESSION.length];
    const barSeconds = beatSeconds * 4;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 950;
    filter.connect(master);

    for (const midi of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = convertMidiToFrequency(midi);
      osc.detune.value = (Math.random() - 0.5) * 10;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.055, time + 0.06);
      gain.gain.setValueAtTime(0.055, time + barSeconds * 0.7);
      gain.gain.linearRampToValueAtTime(0.0001, time + barSeconds * 0.98);
      osc.connect(gain);
      gain.connect(filter);
      osc.start(time);
      osc.stop(time + barSeconds);
    }

    // Bass root an octave down.
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = "sine";
    bass.frequency.value = convertMidiToFrequency(notes[0] - 12);
    bassGain.gain.setValueAtTime(0.16, time);
    bassGain.gain.exponentialRampToValueAtTime(0.001, time + barSeconds * 0.9);
    bass.connect(bassGain);
    bassGain.connect(master);
    bass.start(time);
    bass.stop(time + barSeconds);
  }

  function runScheduler() {
    const beatSeconds = 60 / bpm;
    while (nextBeatTime < audio.ctx.currentTime + SCHEDULE_AHEAD_S) {
      const beatInBar = beatIndex % 4;
      if (beatInBar === 0) {
        scheduleChord(nextBeatTime, Math.floor(beatIndex / 4), beatSeconds);
      }
      if (beatInBar === 0 || beatInBar === 2) {
        scheduleKick(nextBeatTime);
      }
      scheduleHat(nextBeatTime + beatSeconds / 2);
      nextBeatTime += beatSeconds;
      beatIndex += 1;
    }
  }

  function startPlaying() {
    if (playing) return;
    if (cancelArmedResume) cancelArmedResume();
    if (!audio) audio = createAudio();
    audio.ctx.resume();
    nextBeatTime = audio.ctx.currentTime + 0.08;
    beatIndex = 0;
    runScheduler();
    schedulerId = setInterval(runScheduler, LOOKAHEAD_MS);
    playing = true;
    dj.classList.add("is-playing");
    dj.classList.remove("is-armed");
    document.body.classList.add("is-djing");
    panel.hidden = false;
    toggle.setAttribute("aria-pressed", "true");
    toggle.setAttribute("aria-label", "Stop the lo-fi loop");
    applyTempoTokens();
    writeStorage(sessionStorage, "djPlaying", "1");
  }

  function stopPlaying() {
    clearInterval(schedulerId);
    schedulerId = null;
    // Close (not suspend) so already-scheduled notes are discarded —
    // suspending leaves them queued and they overlap the next play.
    if (audio) audio.ctx.close();
    audio = null;
    playing = false;
    dj.classList.remove("is-playing");
    document.body.classList.remove("is-djing");
    panel.hidden = true;
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Play a lo-fi loop");
    resetTempoTokens();
    writeStorage(sessionStorage, "djPlaying", "0");
  }

  // ── Click vs drag: only a deliberate click toggles playback ──
  let suppressClick = false;
  let drag = null;

  toggle.addEventListener("click", () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  });

  toggle.addEventListener("pointerdown", (event) => {
    // A fresh interaction always starts clean — a stale flag from a
    // cancelled drag must not swallow this press's click.
    suppressClick = false;
    const rect = dj.getBoundingClientRect();
    drag = {
      startX: event.clientX,
      startY: event.clientY,
      right: window.innerWidth - rect.right,
      bottom: window.innerHeight - rect.bottom,
      moved: false,
    };
    toggle.setPointerCapture(event.pointerId);
  });

  toggle.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
    drag.moved = true;
    dj.classList.add("is-dragging");
    placeDeck(drag.right - dx, drag.bottom - dy);
  });

  function finishDrag() {
    if (!drag) return;
    if (drag.moved) {
      suppressClick = true;
      const rect = dj.getBoundingClientRect();
      const pos = {
        right: Math.round(window.innerWidth - rect.right),
        bottom: Math.round(window.innerHeight - rect.bottom),
      };
      writeStorage(localStorage, "djDeckPos", JSON.stringify(pos));
    }
    dj.classList.remove("is-dragging");
    drag = null;
  }

  toggle.addEventListener("pointerup", finishDrag);
  toggle.addEventListener("pointercancel", finishDrag);

  window.addEventListener("resize", () => {
    const rect = dj.getBoundingClientRect();
    placeDeck(window.innerWidth - rect.right, window.innerHeight - rect.bottom);
  });

  bpmInput.addEventListener("input", () => {
    bpm = Number(bpmInput.value);
    bpmValue.textContent = String(bpm);
    writeStorage(sessionStorage, "djBpm", String(bpm));
    if (playing) applyTempoTokens();
  });

  // ── Resume across navigation ──
  // Autoplay policy blocks audio until the visitor interacts with the new
  // page, so arm the deck and resume on the first gesture anywhere.
  let cancelArmedResume = null;

  function armResume() {
    dj.classList.add("is-armed");
    toggle.title = "Tap anywhere to resume the music 🎧";
    const resumeOnGesture = (event) => {
      // Gestures on the deck itself go through the normal click handler —
      // otherwise pointerdown starts the music and the click instantly
      // stops it again.
      if (dj.contains(event.target)) return;
      startPlaying();
    };
    window.addEventListener("pointerdown", resumeOnGesture);
    window.addEventListener("keydown", resumeOnGesture);
    cancelArmedResume = () => {
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      cancelArmedResume = null;
    };
  }

  // ── Needle-drop splash (home page, once per session) ──
  function createSplash() {
    // The corner deck only appears once the flying record lands.
    dj.classList.add("is-hidden");
    const splash = document.createElement("div");
    splash.className = "dj-splash";
    splash.innerHTML = `
      <div class="dj-splash-inner">
        <button class="dj-deck" id="dj-splash-deck" type="button" aria-label="Drop the needle and enter">
          <span class="dj-record"></span>
          <span class="dj-arm"></span>
        </button>
        <div class="dj-splash-text">
          <p class="dj-splash-hint">Drop the needle</p>
          <p class="dj-splash-sub">click the record to come on in</p>
        </div>
        <button class="dj-splash-skip" type="button">enter quietly →</button>
      </div>`;
    document.body.appendChild(splash);
    document.body.classList.add("has-splash");

    const splashDeck = splash.querySelector("#dj-splash-deck");
    splashDeck.focus();

    function leaveSplash(withSound) {
      writeStorage(sessionStorage, "djSplashSeen", "1");
      document.body.classList.remove("has-splash");
      splash.classList.add("is-leaving");
      const revealDeck = () => {
        dj.classList.remove("is-hidden");
        splash.remove();
      };
      if (withSound) {
        startPlaying();
        const target = toggle.getBoundingClientRect();
        const from = splashDeck.getBoundingClientRect();
        const dx = target.left + target.width / 2 - (from.left + from.width / 2);
        const dy = target.top + target.height / 2 - (from.top + from.height / 2);
        splashDeck.style.transform = `translate(${dx}px, ${dy}px) scale(${target.width / from.width})`;
        window.setTimeout(revealDeck, 750);
      } else {
        splashDeck.style.opacity = "0";
        window.setTimeout(revealDeck, 550);
      }
    }

    splashDeck.addEventListener("click", () => leaveSplash(true));
    splash.querySelector(".dj-splash-skip").addEventListener("click", () => leaveSplash(false));
    splash.addEventListener("keydown", (event) => {
      if (event.key === "Escape") leaveSplash(false);
    });
  }

  const onHomePage = location.pathname === "/" || location.pathname === "/index.html";
  const splashSeen = readStorage(sessionStorage, "djSplashSeen") === "1";

  if (onHomePage && !splashSeen && !wasPlaying) {
    createSplash();
  } else if (wasPlaying) {
    armResume();
  }
})();
