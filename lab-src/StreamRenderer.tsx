import { Show, createSignal, onCleanup } from "solid-js";

// The demo text streams word-by-word; a ✦ marker triggers the "thinking"
// state mid-stream, the way an agent pauses before committing to an answer.
const TEXT =
  "Streaming is pacing. Words arrive a few at a time, the cursor holds your " +
  "place, and the pause before an answer ✦ reads as thought, not lag. Tune " +
  "the speed below and feel how the same sentence changes character.";

const WORDS = TEXT.split(" ");
const THINK_MS = 1400;
const MIN_WPS = 3;
const MAX_WPS = 24;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const StreamRenderer = () => {
  const [shown, setShown] = createSignal(0);
  const [playing, setPlaying] = createSignal(false);
  const [thinking, setThinking] = createSignal(false);
  const [wps, setWps] = createSignal(9);

  let timer: number | undefined;

  const stop = () => {
    window.clearTimeout(timer);
    setPlaying(false);
    setThinking(false);
  };

  const done = () => shown() >= WORDS.length;

  const tick = () => {
    if (shown() >= WORDS.length) {
      stop();
      return;
    }
    const next = WORDS[shown()];
    if (next === "✦") {
      // The marker itself is swallowed; it only buys a thinking pause.
      setThinking(true);
      setShown(shown() + 1);
      timer = window.setTimeout(() => {
        setThinking(false);
        tick();
      }, THINK_MS);
      return;
    }
    setShown(shown() + 1);
    timer = window.setTimeout(tick, 1000 / wps());
  };

  const play = () => {
    if (done()) setShown(0);
    if (reducedMotion()) {
      setShown(WORDS.length);
      return;
    }
    setPlaying(true);
    tick();
  };

  const pause = () => {
    window.clearTimeout(timer);
    setPlaying(false);
    setThinking(false);
  };

  const reset = () => {
    stop();
    setShown(0);
  };

  onCleanup(stop);

  const visibleText = () =>
    WORDS.slice(0, shown())
      .filter((word) => word !== "✦")
      .join(" ");

  return (
    <div class="stream">
      <div class="stream-stage">
        {/* Screen readers get the whole paragraph at once; the word-by-word
            performance is visual only. */}
        <p class="visually-hidden">{TEXT.replace(" ✦", "")}</p>
        <p class="stream-text" aria-hidden="true">
          {visibleText()}
          <Show when={playing() || (!done() && shown() > 0)}>
            <span class="stream-caret" classList={{ "is-thinking": thinking() }} />
          </Show>
          <Show when={thinking()}>
            <span class="stream-thinking-chip">thinking…</span>
          </Show>
        </p>
        <Show when={shown() === 0}>
          <p class="stream-placeholder" aria-hidden="true">press play to stream</p>
        </Show>
      </div>
      <div class="stream-controls">
        <button class="btn btn-secondary btn-sm" type="button" onClick={() => (playing() ? pause() : play())}>
          {playing() ? "Pause" : done() ? "Replay" : "Play"}
        </button>
        <button class="btn btn-ghost btn-sm" type="button" onClick={reset} disabled={shown() === 0}>
          Reset
        </button>
        <label class="stream-speed">
          <span>speed</span>
          <input
            type="range"
            min={MIN_WPS}
            max={MAX_WPS}
            step="1"
            value={wps()}
            style={{ "--slider-fill": `${((wps() - MIN_WPS) / (MAX_WPS - MIN_WPS)) * 100}%` }}
            aria-label="Streaming speed, words per second"
            onInput={(event) => setWps(Number(event.currentTarget.value))}
          />
          <span class="stream-speed-value">{wps()} w/s</span>
        </label>
      </div>
    </div>
  );
};
