import { Show, createSignal, onCleanup, onMount } from "solid-js";
import type { SmiskiScene, SmiskiState } from "./smiski-scene";

// Wrapper for the ragdoll scene: three.js + cannon-es only download when the
// demo scrolls near, and the physics loop pauses whenever it's offscreen.
const STATE_LABELS: Record<SmiskiState, string> = {
  napping: "napping · zzz",
  settling: "settling down",
  tumbling: "tumbling!",
  grabbed: "grabbed — fling him",
};

export const SmiskiBox = () => {
  const [state, setState] = createSignal<SmiskiState | "loading">("loading");
  const [failed, setFailed] = createSignal(false);
  let host!: HTMLDivElement;
  let scene: SmiskiScene | undefined;
  let loading = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !scene && !loading) {
          loading = true;
          try {
            const { createSmiskiScene } = await import("./smiski-scene");
            scene = createSmiskiScene(host, setState);
          } catch {
            setFailed(true);
          }
        }
        scene?.setRunning(entry.isIntersecting);
      },
      { rootMargin: "240px" },
    );
    observer.observe(host);
    onCleanup(() => {
      observer.disconnect();
      scene?.dispose();
    });
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (!scene) return;
    const shoves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, 1.4],
      ArrowDown: [0, -0.8],
    };
    const shove = shoves[event.key];
    if (shove) {
      event.preventDefault();
      scene.nudge(...shove);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scene.toss();
    }
  };

  return (
    <div class="smiski">
      <div
        ref={host}
        class="smiski-arena"
        tabindex="0"
        role="application"
        aria-label="Ragdoll toy. Drag him with the pointer, shove him with the arrow keys, or press Enter to toss him in the air."
        onKeyDown={onKeyDown}
      >
        <Show when={failed()}>
          <p class="smiski-fallback">
            This one needs WebGL — your browser sat this experiment out.
          </p>
        </Show>
      </div>
      <div class="smiski-controls">
        <button type="button" class="smiski-button" onClick={() => scene?.toss()}>
          toss him
        </button>
        <button type="button" class="smiski-button" onClick={() => scene?.reset()}>
          back in the box
        </button>
        <p class="smiski-readout" aria-hidden="true">
          <code>
            6 bodies · 5 joints ·{" "}
            {state() === "loading" ? "loading…" : STATE_LABELS[state() as SmiskiState]}
          </code>
        </p>
      </div>
    </div>
  );
};
