const i = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(min-width: 720px)").matches && document.querySelector("[data-smiski-note]") !== null;
if (i()) {
  let o = !1;
  const t = async () => {
    if (!o) {
      o = !0;
      try {
        const { createSmiskiWalker: e } = await import("./walker-scene.js");
        e();
      } catch (e) {
        console.warn("smiski walker skipped:", e);
      }
    }
  }, r = () => {
    const e = document.querySelector(".hero");
    return window.scrollY > (e?.offsetHeight ?? 600) * 0.3;
  };
  if (r())
    t();
  else {
    const e = document.querySelector("[data-smiski-note]");
    e && "IntersectionObserver" in window && new IntersectionObserver(
      ([n]) => {
        n.isIntersecting && t();
      },
      { rootMargin: "320px" }
    ).observe(e);
    const s = () => {
      r() ? t() : setTimeout(s, 600);
    };
    setTimeout(s, 600);
  }
}
