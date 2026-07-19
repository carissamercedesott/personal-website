import { createSignal, type JSX } from "solid-js";
import { highlight } from "./highlight";

// Shared shell: the live demo up top, its source in an editor-style
// code window underneath. The traffic lights are real: red closes the
// panel, yellow collapses to the bar, green expands past the height cap.
export const Experiment = (props: { source: string; sourceName: string; children: JSX.Element }) => {
  const [copied, setCopied] = createSignal(false);
  const [minimized, setMinimized] = createSignal(false);
  const [maximized, setMaximized] = createSignal(false);
  let resetTimer = 0;
  let codeEl: HTMLElement | undefined;
  let detailsEl: HTMLDetailsElement | undefined;

  const closeSource = () => {
    if (detailsEl) detailsEl.open = false;
    setMinimized(false);
    setMaximized(false);
    detailsEl?.querySelector("summary")?.focus();
  };

  const toggleMinimized = () => {
    const next = !minimized();
    setMinimized(next);
    if (next) setMaximized(false);
  };

  const toggleMaximized = () => {
    const next = !maximized();
    setMaximized(next);
    if (next) setMinimized(false);
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(props.source);
    } catch {
      // Clipboard blocked (insecure context / no permission): select the
      // code so a manual copy is one keystroke away.
      if (codeEl) window.getSelection()?.selectAllChildren(codeEl);
      return;
    }
    setCopied(true);
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div class="experiment-body">
      <div class="experiment-demo">{props.children}</div>
      <details class="experiment-source" ref={detailsEl}>
        <summary>view source · {props.sourceName}</summary>
        <div class="code-window" classList={{ "is-minimized": minimized(), "is-maximized": maximized() }}>
          <div class="code-window-bar">
            <span class="code-window-lights">
              <button type="button" class="light light-close" aria-label="Close source" title="Close" onClick={closeSource}>
                ×
              </button>
              <button
                type="button"
                class="light light-min"
                aria-label={minimized() ? "Restore code" : "Minimize code"}
                title={minimized() ? "Restore" : "Minimize"}
                onClick={toggleMinimized}
              >
                −
              </button>
              <button
                type="button"
                class="light light-max"
                aria-label={maximized() ? "Restore code height" : "Expand code"}
                title={maximized() ? "Restore" : "Expand"}
                onClick={toggleMaximized}
              >
                +
              </button>
            </span>
            <span class="code-window-name">{props.sourceName}</span>
            <button
              type="button"
              class="code-copy"
              classList={{ "is-copied": copied() }}
              onClick={copySource}
              aria-label={copied() ? "Copied" : "Copy code"}
              title="Copy code"
            >
              <svg class="icon" aria-hidden="true">
                <use href={`/images/icons.svg#${copied() ? "check" : "copy"}`} />
              </svg>
            </button>
          </div>
          <pre class="experiment-code" tabindex="0"><code ref={codeEl} innerHTML={highlight(props.source)} /></pre>
        </div>
      </details>
    </div>
  );
};
