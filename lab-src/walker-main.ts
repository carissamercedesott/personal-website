// Homepage entry for the walking smiski guide (walker-scene.ts). This file
// stays tiny: the 3D scene (three + cannon) only downloads once the visitor
// actually scrolls past the hero — and never on small screens, for people
// who prefer reduced motion, or on pages without guide notes.

const shouldRun = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  window.matchMedia("(min-width: 720px)").matches &&
  document.querySelector("[data-smiski-note]") !== null;

if (shouldRun()) {
  let booted = false;
  const boot = async () => {
    if (booted) return;
    booted = true;
    try {
      const { createSmiskiWalker } = await import("./walker-scene");
      createSmiskiWalker();
    } catch (error) {
      // Usually no WebGL — the page is complete without its guide.
      console.warn("smiski walker skipped:", error);
    }
  };

  const pastHero = () => {
    const hero = document.querySelector<HTMLElement>(".hero");
    return window.scrollY > (hero?.offsetHeight ?? 600) * 0.3;
  };

  if (pastHero()) {
    boot();
  } else {
    // Observer for promptness, plus a slow poll so the guide still shows
    // up in browsers/embeds where observer notifications are flaky.
    const sentinel = document.querySelector("[data-smiski-note]");
    if (sentinel && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) boot();
        },
        { rootMargin: "320px" },
      );
      observer.observe(sentinel);
    }
    const poll = () => {
      if (pastHero()) boot();
      else setTimeout(poll, 600);
    };
    setTimeout(poll, 600);
  }
}

export {};
