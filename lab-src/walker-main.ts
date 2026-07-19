// Homepage entry for the smiski guide (walker-scene.ts). He now opens the
// show sitting on the hero, so the scene boots right away — but the heavy
// chunk (three + cannon) still loads as a separate async import, and never
// on small screens, for people who prefer reduced motion, or on pages
// without his hero perch.

const shouldRun = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  window.matchMedia("(min-width: 720px)").matches &&
  document.querySelector("[data-smiski-perch]") !== null;

if (shouldRun()) {
  import("./walker-scene")
    .then(({ createSmiskiWalker }) => createSmiskiWalker())
    .catch((error) => {
      // Usually no WebGL — the page is complete without its guide.
      console.warn("smiski walker skipped:", error);
    });
}

export {};
