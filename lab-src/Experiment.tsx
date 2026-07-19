import type { JSX } from "solid-js";

// Shared shell: the live demo up top, its own source underneath.
export const Experiment = (props: { source: string; sourceName: string; children: JSX.Element }) => (
  <div class="experiment-body">
    <div class="experiment-demo">{props.children}</div>
    <details class="experiment-source">
      <summary>view source · {props.sourceName}</summary>
      <pre class="experiment-code" tabindex="0"><code>{props.source}</code></pre>
    </details>
  </div>
);
