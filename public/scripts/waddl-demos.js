// The three case-study demos are the real Waddl React components, each
// running in its own frame. They're framed rather than inlined because
// Waddl's design tokens share ~113 names with this site's (--accent-default,
// --bg-default, --text-primary …) and both sit on :root, so one document
// can't hold both.
//
// The frames come from this origin, so rather than a postMessage protocol
// this page just reaches in: it measures the demo to size the frame around
// it, and mirrors the reader's light/dark choice onto it. Measuring from out
// here also means the observer runs on a page that's on screen — a frame
// scrolled out of view stops getting animation frames, and its own
// ResizeObserver would go quiet exactly when a reader folds a diff open.

(function initWaddlDemos() {
  const frames = document.querySelectorAll("iframe[data-demo]");
  if (frames.length === 0) return;

  // Keeps observers from being collected while their frame is still alive.
  const observers = [];

  // The site marks an explicit choice on <html>; with none, it follows the OS.
  function currentMode() {
    const chosen = document.documentElement.dataset.theme;
    if (chosen === "dark" || chosen === "light") return chosen;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function demoRoot(frame) {
    try {
      const doc = frame.contentDocument;
      return doc ? doc.getElementById("demo-root") : null;
    } catch (err) {
      return null; // Not loaded yet, or not same-origin after all.
    }
  }

  function sync(frame) {
    const root = demoRoot(frame);
    if (!root) return;
    root.ownerDocument.documentElement.dataset.mode = currentMode();
    const height = Math.ceil(root.getBoundingClientRect().height);
    if (height > 0) frame.style.height = height + "px";
  }

  // One measurement is never enough. On load, #demo-root exists but React
  // hasn't mounted into it yet, so it measures 0 and sync skips; folders and
  // diffs then animate open over a few hundred milliseconds, so a single
  // measurement on click catches the height mid-flight. Re-measure across a
  // window instead, out to where webfonts have settled. Timers rather than
  // animation frames: a frame that isn't being painted doesn't get animation
  // frames, which is the same gap that makes ResizeObserver unreliable here.
  const SETTLE_MS = [0, 60, 140, 260, 420, 640, 1000, 1600];

  function settle(frame) {
    SETTLE_MS.forEach(function (delay) {
      window.setTimeout(function () {
        sync(frame);
      }, delay);
    });
  }

  function watch(frame) {
    const root = demoRoot(frame);
    if (!root) return;
    settle(frame);
    const observer = new ResizeObserver(function () {
      sync(frame);
    });
    observer.observe(root);
    observers.push(observer);
    // A resize observation can be throttled for a frame that's scrolled out
    // of view, and not every expansion animates. Anything a reader does in
    // here starts with a click or a key, so settle from those directly.
    root.ownerDocument.addEventListener("click", function () {
      settle(frame);
    });
    root.ownerDocument.addEventListener("keyup", function () {
      settle(frame);
    });
  }

  function syncAll() {
    frames.forEach(sync);
  }

  // A width change reflows the demo, so its height lands a frame or two later.
  window.addEventListener("resize", function () {
    frames.forEach(settle);
  });

  new MutationObserver(syncAll).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", syncAll);

  // src is set here, not in the markup, so the frame boots in the right mode
  // instead of flashing light inside a dark page.
  const mode = currentMode();
  frames.forEach(function (frame) {
    frame.addEventListener("load", function () {
      watch(frame);
    });
    frame.src =
      "/waddl-demos/?demo=" + frame.dataset.demo + "&mode=" + mode;
  });
})();
