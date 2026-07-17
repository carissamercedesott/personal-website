// Shared site behavior: theme toggle and scroll-reveal animations.
// initSiteChrome is exposed globally so soft navigation (nav.js) can
// re-bind after swapping in a new page's content.

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function resolveTheme() {
    return root.dataset.theme ?? (prefersDark.matches ? "dark" : "light");
  }

  function renderToggle() {
    const dark = resolveTheme() === "dark";
    toggle.textContent = dark ? "☀️" : "🌙";
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  function toggleTheme() {
    const next = resolveTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
    renderToggle();
  }

  toggle.addEventListener("click", toggleTheme);
  renderToggle();
}

function initReveal() {
  const revealables = document.querySelectorAll("[data-reveal]:not(.is-revealed)");
  if (revealables.length === 0 || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );

  revealables.forEach((el, index) => {
    // Small stagger so groups of items cascade in.
    el.style.transitionDelay = `${Math.min(index % 6, 4) * 60}ms`;
    observer.observe(el);
  });
}

function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.site-links a[href^="#"]'));
  if (links.length === 0 || !("IntersectionObserver" in window)) return;

  const setCurrentSection = (id) => {
    for (const link of links) {
      if (link.hash === `#${id}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  };

  // A section becomes current while it crosses a band around the upper
  // middle of the viewport. The hero (#top) has no nav link, so reaching
  // it clears the highlight.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setCurrentSection(entry.target.id);
      }
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );

  const sectionIds = ["top", ...links.map((link) => link.hash.slice(1))];
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

function initCarousels() {
  for (const carousel of document.querySelectorAll("[data-carousel]")) {
    const track = carousel.querySelector(".carousel-track");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    if (!track || !prev || !next) continue;

    const measureStep = () => {
      const card = track.querySelector(".carousel-card");
      return card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
    };

    const renderArrows = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    };

    prev.addEventListener("click", () => track.scrollBy({ left: -measureStep(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: measureStep(), behavior: "smooth" }));
    track.addEventListener("scroll", renderArrows, { passive: true });
    window.addEventListener("resize", renderArrows);
    renderArrows();
  }
}

function initTypewriter() {
  const wordEl = document.getElementById("hero-type-word");
  if (!wordEl) return;

  const WORDS = [
    "software engineer",
    "designer",
    "researcher",
    "writer",
    "snowboarder",
    "DJ",
    "baker",
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    wordEl.textContent = WORDS[0];
    return;
  }

  const TYPE_MS = 75;
  const DELETE_MS = 40;
  const HOLD_MS = 1600;
  const GAP_MS = 350;

  let wordIndex = 0;
  let length = 0;
  let deleting = false;

  function typeTick() {
    const word = WORDS[wordIndex];
    length += deleting ? -1 : 1;
    wordEl.textContent = word.slice(0, length);

    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && length === word.length) {
      deleting = true;
      delay = HOLD_MS;
    } else if (deleting && length === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % WORDS.length;
      delay = GAP_MS;
    }
    setTimeout(typeTick, delay);
  }

  typeTick();
}

function initStickerPeek() {
  const photo = document.getElementById("intro-photo");
  if (!photo) return;
  for (const sticker of document.querySelectorAll("[data-peek]")) {
    sticker.addEventListener("mouseenter", () => {
      photo.dataset.show = sticker.dataset.peek;
    });
    sticker.addEventListener("mouseleave", () => {
      delete photo.dataset.show;
    });
  }
}

function initStickerDrag() {
  const scatter = document.querySelector(".sticker-scatter");
  if (!scatter) return;

  let layout = {};
  try {
    layout = JSON.parse(localStorage.getItem("stickerLayout") || "{}");
  } catch {
    layout = {};
  }

  function placeSticker(sticker, pos) {
    sticker.style.left = `${pos.left}px`;
    sticker.style.top = `${pos.top}px`;
    sticker.style.right = "auto";
    sticker.style.bottom = "auto";
  }

  for (const sticker of scatter.querySelectorAll(".sticker")) {
    const key = sticker.dataset.peek;
    if (layout[key]) placeSticker(sticker, layout[key]);

    let drag = null;
    sticker.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const rect = sticker.getBoundingClientRect();
      drag = { dx: event.clientX - rect.left, dy: event.clientY - rect.top };
      sticker.setPointerCapture(event.pointerId);
      sticker.classList.add("is-dragging");
    });
    sticker.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const parent = scatter.getBoundingClientRect();
      placeSticker(sticker, {
        left: Math.round(event.clientX - parent.left - drag.dx),
        top: Math.round(event.clientY - parent.top - drag.dy),
      });
    });
    const finishDrag = () => {
      if (!drag) return;
      drag = null;
      sticker.classList.remove("is-dragging");
      layout[key] = {
        left: parseFloat(sticker.style.left),
        top: parseFloat(sticker.style.top),
      };
      try {
        localStorage.setItem("stickerLayout", JSON.stringify(layout));
      } catch {
        /* private mode */
      }
      console.log("sticker layout:", JSON.stringify(layout));
    };
    sticker.addEventListener("pointerup", finishDrag);
    sticker.addEventListener("pointercancel", finishDrag);
  }
}

function initSiteChrome() {
  initThemeToggle();
  initReveal();
  initScrollSpy();
  initCarousels();
  initTypewriter();
  initStickerPeek();
  initStickerDrag();
}

window.initSiteChrome = initSiteChrome;
initSiteChrome();
