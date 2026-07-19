const i = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(min-width: 720px)").matches && document.querySelector("[data-smiski-note]") !== null;
i() && import("./walker-scene.js").then(({ createSmiskiWalker: e }) => e()).catch((e) => {
  console.warn("smiski walker skipped:", e);
});
