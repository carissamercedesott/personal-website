import { createMemo, createSignal } from "solid-js";

// Phrases from around this site — type a few letters and the rest appears
// as editor-style ghost text.
const CORPUS = [
  "interfaces that speak fluent human",
  "tokens over values",
  "cross math",
  "waddl",
  "canonical proportion as a phonological index",
  "brown butter is a statistically significant improvement",
  "warm pastels, crisp surfaces, soft motion",
];

export const GhostText = () => {
  const [value, setValue] = createSignal("");
  const [dismissed, setDismissed] = createSignal(false);

  const completion = createMemo(() => {
    const typed = value();
    if (dismissed() || typed.length === 0) return "";
    const hit = CORPUS.find(
      (phrase) => phrase.startsWith(typed.toLowerCase()) && phrase.length > typed.length
    );
    return hit ? hit.slice(typed.length) : "";
  });

  const accept = () => {
    setValue(value() + completion());
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (completion() === "") return;
    const input = event.currentTarget as HTMLInputElement;
    const caretAtEnd = input.selectionStart === value().length;
    if (event.key === "Tab" || (event.key === "ArrowRight" && caretAtEnd)) {
      event.preventDefault();
      accept();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setDismissed(true);
    }
  };

  return (
    <div class="ghost-demo">
      <div class="ghost-wrap">
        {/* The underlay mirrors the input's text invisibly, so the ghost
            continues exactly where the caret is. */}
        <div class="ghost-underlay" aria-hidden="true">
          <span class="ghost-typed">{value()}</span>
          <span class="ghost-completion">{completion()}</span>
        </div>
        <input
          class="ghost-input"
          type="text"
          spellcheck={false}
          autocomplete="off"
          aria-label="Ghost text demo input"
          aria-describedby="ghost-hint"
          value={value()}
          onInput={(event) => {
            setDismissed(false);
            setValue(event.currentTarget.value);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
      <p class="ghost-hint" id="ghost-hint">
        try “inter…”, “tok…”, or “brown…” — <kbd>Tab</kbd> accepts, <kbd>Esc</kbd> dismisses
      </p>
      <span class="visually-hidden" role="status">
        {completion() !== "" ? `Suggestion: ${value()}${completion()}. Press Tab to accept.` : ""}
      </span>
    </div>
  );
};
