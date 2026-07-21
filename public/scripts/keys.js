// Keyboard layer: one registry drives both the bindings and the "?"
// shortcuts sheet, so the sheet can never drift from the real keymap
// (same trick as /design rendering from tokens.css).
(function initKeys() {
  const CHORD_MS = 1200;

  const navigate = (href) => () => window.location.assign(href);

  // Jump between top-level sections. "Current" is the last section whose
  // top has passed under the sticky header; ← / → step from there.
  //
  // The sideways keys, not ↑ / ↓: a section is a screen you page through, and
  // the vertical keys have to stay free to scroll within one that runs long.
  function hopSection(direction) {
    const sections = [...document.querySelectorAll("main section")];
    if (sections.length === 0) return;
    const headerLine = 104;
    let current = -1;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= headerLine) current = i;
    }
    const next = Math.min(Math.max(current + direction, 0), sections.length - 1);
    sections[next].scrollIntoView();
  }

  // The registry. `combo` is display + matching; a two-key combo is a
  // chord starting with "g". `key` overrides matching where the printed
  // glyph isn't the KeyboardEvent key (the arrows), and `altKeys`/`altCombo`
  // add synonyms shown as "or" in the sheet. `note` marks entries that only
  // apply somewhere else, so the sheet stays honest per page.
  const SHORTCUTS = [
    { group: "Navigate", combo: ["⌘K"], label: "Command palette", external: true,
      note: () => (document.body.classList.contains("lab") ? "" : "in the Playground") },
    { group: "Navigate", combo: ["→"], key: "ArrowRight", altKeys: ["Enter"], altCombo: ["↵"],
      label: "Next section", run: () => hopSection(1) },
    { group: "Navigate", combo: ["←"], key: "ArrowLeft", altKeys: ["Escape"], altCombo: ["esc"],
      label: "Previous section", run: () => hopSection(-1) },
    { group: "Go to", combo: ["g", "h"], label: "Home", run: navigate("/") },
    { group: "Go to", combo: ["g", "p"], label: "Work — all projects", run: navigate("/projects") },
    { group: "Go to", combo: ["g", "w"], label: "Waddl case study", run: navigate("/waddl") },
    { group: "Go to", combo: ["g", "l"], label: "The Playground", run: navigate("/playground") },
    { group: "Go to", combo: ["g", "d"], label: "Design system", run: navigate("/design") },
    { group: "Go to", combo: ["g", "r"], label: "Resume", run: navigate("/resume") },
    { group: "Do", combo: ["t"], label: "Toggle theme",
      run: () => document.getElementById("theme-toggle")?.click() },
    { group: "Do", combo: ["d"], label: "Drop the needle",
      note: () => (document.getElementById("dj-toggle") ? "" : "on the homepage"),
      run: () => document.getElementById("dj-toggle")?.click() },
    { group: "Help", combo: ["?"], label: "This sheet", run: () => toggleSheet() },
  ];

  // Keyed by the KeyboardEvent.key a binding answers to: entry.key where one
  // is given (ArrowRight), otherwise the printed glyph itself; altKeys
  // register the same entry under its synonyms.
  const singles = {};
  const chords = {};
  for (const entry of SHORTCUTS) {
    if (entry.external || !entry.run) continue;
    if (entry.combo.length === 2 && entry.combo[0] === "g") {
      chords[entry.combo[1]] = entry;
    } else if (entry.key) {
      singles[entry.key] = entry;
    } else if (entry.combo.length === 1 && entry.combo[0].length === 1) {
      singles[entry.combo[0]] = entry;
    }
    for (const key of entry.altKeys ?? []) singles[key] = entry;
  }

  // ── The "?" sheet, rendered from the registry ──
  const sheet = document.createElement("dialog");
  sheet.className = "keys-sheet";
  sheet.id = "keys-sheet";
  sheet.setAttribute("aria-labelledby", "keys-sheet-title");

  function renderSheet() {
    const groups = [...new Set(SHORTCUTS.map((s) => s.group))];
    const body = groups
      .map((group) => {
        const rows = SHORTCUTS.filter((s) => s.group === group)
          .map((s) => {
            const note = s.note?.() ?? "";
            let keys = s.combo.map((k) => `<kbd>${k}</kbd>`).join('<span class="keys-then">then</span>');
            if (s.altCombo) {
              keys += '<span class="keys-then">or</span>' + s.altCombo.map((k) => `<kbd>${k}</kbd>`).join("");
            }
            return (
              '<div class="keys-row">' +
              `<span class="keys-label">${s.label}` +
              (note ? ` <span class="keys-note">— ${note}</span>` : "") +
              `</span><span class="keys-combo">${keys}</span></div>`
            );
          })
          .join("");
        return `<div class="keys-group"><h3>${group}</h3>${rows}</div>`;
      })
      .join("");
    sheet.innerHTML =
      '<div class="keys-head">' +
      '<h2 id="keys-sheet-title">Keyboard</h2>' +
      '<button class="keys-close" type="button" aria-label="Close">' +
      '<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#x"></use></svg>' +
      "</button></div>" +
      `<div class="keys-body">${body}</div>`;
    sheet.querySelector(".keys-close").addEventListener("click", () => sheet.close());
  }

  document.body.appendChild(sheet);
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) sheet.close();
  });

  function toggleSheet() {
    if (sheet.open) {
      sheet.close();
    } else {
      renderSheet(); // fresh render picks up per-page notes
      sheet.showModal();
    }
  }

  // The public doorway: a "?" button in the nav, next to the theme toggle.
  const navLinks = document.querySelector(".site-links");
  if (navLinks) {
    const navHint = document.createElement("button");
    navHint.className = "keys-nav";
    navHint.type = "button";
    navHint.textContent = "?";
    navHint.setAttribute("aria-label", "Keyboard shortcuts");
    navHint.title = "Keyboard shortcuts (?)";
    navHint.addEventListener("click", toggleSheet);
    navLinks.insertBefore(navHint, document.getElementById("theme-toggle"));
  }

  // A quiet doorway in the footer, so mouse users find the layer too.
  const footer = document.querySelector(".site-footer-inner");
  if (footer) {
    const hint = document.createElement("button");
    hint.className = "keys-hint";
    hint.type = "button";
    hint.innerHTML = "press <kbd>?</kbd> for shortcuts";
    hint.addEventListener("click", toggleSheet);
    footer.appendChild(hint);
  }

  // ── Guards + dispatch ──
  function isEditable(target) {
    return !!target?.closest?.('input, textarea, select, [contenteditable="true"]');
  }

  function overlayOpen() {
    return !!document.querySelector("dialog[open]:not(#keys-sheet), .palette-backdrop");
  }

  let pendingChord = false;
  let chordTimer = 0;

  function resetChord() {
    pendingChord = false;
    window.clearTimeout(chordTimer);
  }

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (isEditable(event.target) || overlayOpen()) return;

    if (event.key === "?") {
      event.preventDefault();
      resetChord();
      toggleSheet();
      return;
    }
    if (sheet.open) return; // Esc closes natively; nothing else fires under it

    if (pendingChord) {
      const entry = chords[event.key.toLowerCase()];
      resetChord();
      if (entry) {
        event.preventDefault();
        entry.run();
      }
      return;
    }
    if (event.shiftKey) return;
    if (event.key.toLowerCase() === "g") {
      pendingChord = true;
      chordTimer = window.setTimeout(resetChord, CHORD_MS);
      return;
    }
    // Enter keeps its day job on focused controls — only bare-page Enter
    // (focus on the page itself, not a link or button) advances the section.
    if (
      event.key === "Enter" &&
      event.target !== document.body &&
      event.target !== document.documentElement &&
      event.target !== document
    )
      return;
    // Exact key first (ArrowRight), then the lowercased glyph (t, d, ?).
    const entry = singles[event.key] ?? singles[event.key.toLowerCase()];
    if (entry) {
      event.preventDefault();
      entry.run();
    }
  });
})();
