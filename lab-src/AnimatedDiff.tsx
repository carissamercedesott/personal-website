import { For, createSignal } from "solid-js";

type Kind = "ctx" | "del" | "add";
type Line = { text: string; kind: Kind };

// One tiny, on-message refactor: raw values become tokens.
const LINES: Line[] = [
  { kind: "ctx", text: "const elevate = (card: HTMLElement) => {" },
  { kind: "del", text: '  card.style.boxShadow = "0 12px 32px rgba(0,0,0,.12)";' },
  { kind: "del", text: '  card.style.transition = "box-shadow .25s ease";' },
  { kind: "add", text: '  card.style.boxShadow = "var(--shadow-lg)";' },
  { kind: "add", text: '  card.style.transition =' },
  { kind: "add", text: '    "box-shadow var(--duration-base) var(--ease-out)";' },
  { kind: "ctx", text: "};" },
];

export const AnimatedDiff = () => {
  const [after, setAfter] = createSignal(false);

  // A line is visible in the "before" state unless it's an addition, and
  // in the "after" state unless it's a removal.
  const isVisible = (line: Line) => (after() ? line.kind !== "del" : line.kind !== "add");

  return (
    <div class="adiff">
      <div class="adiff-toolbar">
        <span class="adiff-file">tokens-refactor.ts</span>
        <button
          class="btn btn-secondary btn-sm"
          type="button"
          aria-pressed={after()}
          onClick={() => setAfter(!after())}
        >
          {after() ? "Show before" : "Apply the diff"}
        </button>
      </div>
      <pre class="adiff-code"><code>
        <For each={LINES}>
          {(line, index) => (
            <span
              class={`adiff-line adiff-line-${line.kind}`}
              classList={{ "is-hidden": !isVisible(line) }}
              style={{ "--line-index": String(index()) }}
              aria-hidden={!isVisible(line)}
            >
              <span class="adiff-gutter">
                {line.kind === "add" ? "+" : line.kind === "del" ? "−" : " "}
              </span>
              {line.text}
            </span>
          )}
        </For>
      </code></pre>
      <p class="adiff-caption" aria-live="polite">
        {after() ? "after — every value is a token" : "before — raw values, hand-tuned"}
      </p>
    </div>
  );
};
