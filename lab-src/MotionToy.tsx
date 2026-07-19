import { For, createSignal, onCleanup } from "solid-js";

// Drag the card and let go: it returns home through the motion tokens, or
// through a real spring (rAF integration) for comparison. Keyboard: arrow
// keys shove it, Enter bounces it.
type Easing = "ease-out" | "ease-in-out" | "spring";
type Duration = "fast" | "base" | "slow";

const EASINGS: Easing[] = ["ease-out", "ease-in-out", "spring"];
const DURATIONS: Duration[] = ["fast", "base", "slow"];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const MotionToy = () => {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [dragging, setDragging] = createSignal(false);
  const [springing, setSpringing] = createSignal(false);
  const [easing, setEasing] = createSignal<Easing>("ease-out");
  const [duration, setDuration] = createSignal<Duration>("base");

  let raf = 0;
  let keyTimer = 0;
  let start: { px: number; py: number; x: number; y: number } | null = null;
  let velocity = { x: 0, y: 0 };
  let lastMove = { t: 0, x: 0, y: 0 };

  const stopSpring = () => {
    cancelAnimationFrame(raf);
    setSpringing(false);
  };

  const springHome = () => {
    setSpringing(true);
    let px = x();
    let py = y();
    let vx = velocity.x;
    let vy = velocity.y;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      // Critically-underdamped spring pulling toward the origin.
      const k = 170;
      const damping = 16;
      vx += (-k * px - damping * vx) * dt;
      vy += (-k * py - damping * vy) * dt;
      px += vx * dt;
      py += vy * dt;
      if (Math.hypot(px, py) < 0.5 && Math.hypot(vx, vy) < 1) {
        setX(0);
        setY(0);
        setSpringing(false);
        return;
      }
      setX(px);
      setY(py);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  const release = () => {
    if (reducedMotion()) {
      setX(0);
      setY(0);
      return;
    }
    if (easing() === "spring") {
      springHome();
    } else {
      // CSS transition (declared inline below) carries the card home.
      setX(0);
      setY(0);
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    stopSpring();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    start = { px: event.clientX, py: event.clientY, x: x(), y: y() };
    lastMove = { t: performance.now(), x: x(), y: y() };
    velocity = { x: 0, y: 0 };
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!start) return;
    const nx = start.x + event.clientX - start.px;
    const ny = start.y + event.clientY - start.py;
    const now = performance.now();
    const dt = (now - lastMove.t) / 1000;
    if (dt > 0) {
      velocity = { x: (nx - lastMove.x) / dt, y: (ny - lastMove.y) / dt };
      lastMove = { t: now, x: nx, y: ny };
    }
    setX(nx);
    setY(ny);
  };

  const onPointerUp = () => {
    if (!start) return;
    start = null;
    setDragging(false);
    release();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const push = 32;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-push, 0],
      ArrowRight: [push, 0],
      ArrowUp: [0, -push],
      ArrowDown: [0, push],
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      stopSpring();
      velocity = { x: move[0] * 6, y: move[1] * 6 };
      setX(x() + move[0]);
      setY(y() + move[1]);
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(release, 350);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      stopSpring();
      velocity = { x: 0, y: -240 };
      setY(-48);
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(release, 60);
    }
  };

  onCleanup(() => {
    cancelAnimationFrame(raf);
    window.clearTimeout(keyTimer);
  });

  const transition = () => {
    if (dragging() || springing() || easing() === "spring") return "none";
    return `transform var(--duration-${duration()}) var(--ease-${easing()})`;
  };

  return (
    <div class="toy">
      <div class="toy-arena">
        <div
          class="toy-card"
          classList={{ "is-dragging": dragging() }}
          tabindex="0"
          aria-label="Motion toy card. Drag it, or push it with the arrow keys and it springs home."
          style={{
            transform: `translate(${x()}px, ${y()}px)`,
            transition: transition(),
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <span class="toy-card-title">drag me</span>
          <span class="toy-card-sub">then let go</span>
        </div>
      </div>
      <div class="toy-controls">
        <fieldset class="toy-group">
          <legend>easing</legend>
          <For each={EASINGS}>
            {(option) => (
              <label class="toy-radio">
                <input
                  type="radio"
                  name="toy-easing"
                  value={option}
                  checked={easing() === option}
                  onInput={() => setEasing(option)}
                />
                <span>{option === "spring" ? "spring (rAF)" : `--ease-${option}`}</span>
              </label>
            )}
          </For>
        </fieldset>
        <fieldset class="toy-group" disabled={easing() === "spring"}>
          <legend>duration</legend>
          <For each={DURATIONS}>
            {(option) => (
              <label class="toy-radio">
                <input
                  type="radio"
                  name="toy-duration"
                  value={option}
                  checked={duration() === option}
                  onInput={() => setDuration(option)}
                />
                <span>--duration-{option}</span>
              </label>
            )}
          </For>
        </fieldset>
      </div>
      <p class="toy-readout" aria-hidden="true">
        <code>
          translate({Math.round(x())}px, {Math.round(y())}px) ·{" "}
          {dragging() ? "--shadow-lg" : "--shadow-md"} ·{" "}
          {easing() === "spring" ? "spring k=170 c=16" : `--ease-${easing()} / --duration-${duration()}`}
        </code>
      </p>
    </div>
  );
};
