import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { fuzzyMatch } from "./fuzzy";

type Item = { label: string; hint: string; href: string };

const ITEMS: Item[] = [
  { label: "Home", hint: "page", href: "/" },
  { label: "Work — all projects", hint: "page", href: "/projects" },
  { label: "Waddl case study", hint: "page", href: "/waddl" },
  { label: "The Playground", hint: "page", href: "/playground" },
  { label: "Design system", hint: "page", href: "/design" },
  { label: "Resume", hint: "page", href: "/resume" },
  { label: "Principles — how I build", hint: "section", href: "/#principles" },
  { label: "Research — how people think", hint: "section", href: "/#research" },
  { label: "Email Carissa", hint: "action", href: "mailto:carissaott0809@gmail.com" },
  { label: "GitHub", hint: "link", href: "https://github.com/carissamercedesott" },
  { label: "LinkedIn", hint: "link", href: "https://www.linkedin.com/in/carissa-ott" },
];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

export const CommandPalette = () => {
  const [open, setOpen] = createSignal(false);
  const [leaving, setLeaving] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [active, setActive] = createSignal(0);

  let inputEl!: HTMLInputElement;
  let listEl!: HTMLUListElement;
  let restoreFocus: HTMLElement | null = null;

  const results = createMemo(() => {
    const q = query().trim();
    return ITEMS.map((item) => ({ item, match: fuzzyMatch(q, item.label) }))
      .filter((r) => r.match !== null)
      .sort((a, b) => b.match!.score - a.match!.score);
  });

  createEffect(() => {
    results();
    setActive(0);
  });

  const openPalette = () => {
    restoreFocus = document.activeElement as HTMLElement | null;
    setQuery("");
    setLeaving(false);
    setOpen(true);
    queueMicrotask(() => inputEl.focus());
  };

  const closePalette = () => {
    if (!open()) return;
    if (reducedMotion()) {
      setOpen(false);
    } else {
      setLeaving(true);
      window.setTimeout(() => {
        setOpen(false);
        setLeaving(false);
      }, 150);
    }
    restoreFocus?.focus();
  };

  const navigateTo = (item: Item) => {
    closePalette();
    window.location.assign(item.href);
  };

  const onGlobalKey = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open() ? closePalette() : openPalette();
    }
  };

  onMount(() => document.addEventListener("keydown", onGlobalKey));
  onCleanup(() => document.removeEventListener("keydown", onGlobalKey));

  const onInputKey = (event: KeyboardEvent) => {
    const count = results().length;
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (count > 0) setActive((active() + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (count > 0) setActive((active() - 1 + count) % count);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const chosen = results()[active()];
      if (chosen) navigateTo(chosen.item);
    } else if (event.key === "Tab") {
      // The input is the palette's only tab stop; keep focus inside.
      event.preventDefault();
    }
  };

  // Keep the active row scrolled into view as arrows move it.
  createEffect(() => {
    const row = listEl?.children[active()] as HTMLElement | undefined;
    row?.scrollIntoView({ block: "nearest" });
  });

  return (
    <>
      <button class="btn btn-secondary" type="button" onClick={openPalette}>
        Open the palette
        <kbd class="palette-kbd">{isMac() ? "⌘" : "Ctrl+"}K</kbd>
      </button>

      <Show when={open()}>
        <div
          class="palette-backdrop"
          classList={{ "is-leaving": leaving() }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <div class="palette" role="dialog" aria-modal="true" aria-label="Site command palette">
            <input
              ref={inputEl}
              class="palette-input"
              type="text"
              placeholder="Where to? Try “design” or “waddl”…"
              aria-label="Search pages and sections"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results().length > 0 ? `palette-item-${active()}` : undefined}
              value={query()}
              onInput={(event) => setQuery(event.currentTarget.value)}
              onKeyDown={onInputKey}
            />
            <ul class="palette-list" id="palette-list" role="listbox" ref={listEl}>
              <For each={results()}>
                {(result, index) => (
                  <li
                    class="palette-item"
                    classList={{ "is-active": index() === active() }}
                    id={`palette-item-${index()}`}
                    role="option"
                    aria-selected={index() === active()}
                    onPointerMove={() => setActive(index())}
                    onClick={() => navigateTo(result.item)}
                  >
                    <span class="palette-label">
                      <For each={result.item.label.split("")}>
                        {(char, charIndex) => (
                          <span classList={{ "palette-hit": result.match!.indexes.includes(charIndex()) }}>
                            {char}
                          </span>
                        )}
                      </For>
                    </span>
                    <span class="palette-hint">{result.item.hint}</span>
                  </li>
                )}
              </For>
              <Show when={results().length === 0}>
                <li class="palette-empty">nothing matches “{query()}” — try “work” or “playground”</li>
              </Show>
            </ul>
            <div class="palette-footer" aria-hidden="true">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> go</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};
