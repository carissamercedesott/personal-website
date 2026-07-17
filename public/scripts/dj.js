// DJ mode: a synthesized lo-fi loop (Web Audio API — no audio files),
// a beat-synced hero pulse, and a BPM slider that rescales the site's
// motion tokens so the tempo literally drives the design system.

(function initDj() {
  const dj = document.getElementById("dj");
  const toggle = document.getElementById("dj-toggle");
  const panel = document.getElementById("dj-panel");
  const bpmInput = document.getElementById("dj-bpm");
  const bpmValue = document.getElementById("dj-bpm-value");
  if (!dj || !toggle) return;

  const root = document.documentElement;
  const DEFAULT_BPM = 84;
  const LOOKAHEAD_MS = 100;
  const SCHEDULE_AHEAD_S = 0.25;

  // One chord per bar: Fmaj7 → Em7 → Dm7 → Cmaj7 (MIDI note numbers).
  const PROGRESSION = [
    [53, 57, 60, 64],
    [52, 55, 59, 62],
    [50, 53, 57, 60],
    [48, 52, 55, 59],
  ];

  let audio = null; // { ctx, master, crackle }
  let playing = false;
  let bpm = DEFAULT_BPM;
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

  function createAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const master = ctx.createGain();
    master.gain.value = 0.55;

    // Gentle lowpass over everything for lo-fi warmth.
    const warmth = ctx.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 5500;

    master.connect(warmth);
    warmth.connect(ctx.destination);

    // Vinyl crackle: a looped noise buffer of sparse pops over faint hiss.
    const seconds = 2;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.004;
      if (Math.random() < 0.0006) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      }
    }
    const crackle = ctx.createBufferSource();
    crackle.buffer = buffer;
    crackle.loop = true;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.5;
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
    const { ctx, master } = audio;
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
    gain.gain.setValueAtTime(0.09, time);
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
    if (!audio) audio = createAudio();
    audio.ctx.resume();
    nextBeatTime = audio.ctx.currentTime + 0.08;
    beatIndex = 0;
    runScheduler();
    schedulerId = setInterval(runScheduler, LOOKAHEAD_MS);
    playing = true;
    dj.classList.add("is-playing");
    document.body.classList.add("is-djing");
    if (panel) panel.hidden = false;
    toggle.setAttribute("aria-pressed", "true");
    toggle.setAttribute("aria-label", "Stop the lo-fi loop");
    applyTempoTokens();
  }

  function stopPlaying() {
    clearInterval(schedulerId);
    schedulerId = null;
    if (audio) audio.ctx.suspend();
    playing = false;
    dj.classList.remove("is-playing");
    document.body.classList.remove("is-djing");
    if (panel) panel.hidden = true;
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Play a lo-fi loop");
  }

  function togglePlaying() {
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  }

  toggle.addEventListener("click", togglePlaying);

  if (bpmInput) {
    bpmInput.addEventListener("input", () => {
      bpm = Number(bpmInput.value);
      if (bpmValue) bpmValue.textContent = String(bpm);
      applyTempoTokens();
    });
  }
})();
