// Shared site behavior: theme toggle and scroll-reveal animations.
// initSiteChrome is exposed globally so soft navigation (nav.js) can
// re-bind after swapping in a new page's content.

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    toggle.innerHTML = `<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#${dark ? "sun" : "moon"}"></use></svg>`;
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  let fadeTimer = 0;

  function toggleTheme() {
    const next = resolveTheme() === "dark" ? "light" : "dark";
    // Briefly let every surface fade together (rules in base.css) —
    // without this only body transitions and components snap.
    root.setAttribute("data-theme-fade", "");
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => root.removeAttribute("data-theme-fade"), 500);
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

function initTypewriter() {
  const wordEl = document.getElementById("hero-type-word");
  if (!wordEl) return;

  const WORDS = [
    "software engineer",
    "design engineer",
    "UI/UX specialist",
    "HCI enthusiast",
    "cognitive scientist",
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

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const image = modal.querySelector(".project-modal-img");
  const title = modal.querySelector(".project-modal-title");
  const info = modal.querySelector(".project-modal-info");
  const body = modal.querySelector(".project-modal-body");
  let trigger = null;
  let closing = false;
  let openAnim = null;
  let closeFills = [];

  // The card grows into the modal (and shrinks back on close) via a FLIP
  // animation. Transform/opacity only: view transitions were dropped here
  // because snapshotting the whole page stuttered on open and close.
  const OPEN_MS = 340;
  const CLOSE_MS = 240;
  const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

  // Transform that lays the modal's final rect over the card's.
  function transformToCard(card) {
    const from = card.getBoundingClientRect();
    const to = modal.getBoundingClientRect();
    const x = from.left + from.width / 2 - (to.left + to.width / 2);
    const y = from.top + from.height / 2 - (to.top + to.height / 2);
    return `translate(${x}px, ${y}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  }

  function openModal(card) {
    const cardImage = card.querySelector(".project-card-img");
    trigger = card;
    image.hidden = !cardImage;
    image.src = cardImage?.src ?? "";
    image.alt = cardImage?.alt ?? "";
    title.textContent = card.querySelector("h3").textContent;
    info.innerHTML = card.querySelector(".project-card-details")?.innerHTML ?? "";
    modal.showModal();
    document.body.classList.add("has-modal");
    if (prefersReducedMotion()) return;

    // Hide the card so the modal reads as the card itself expanding.
    card.style.visibility = "hidden";
    const grow = modal.animate(
      [{ transform: transformToCard(card) }, { transform: "none" }],
      { duration: OPEN_MS, easing: EASE_OUT }
    );
    body.animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }], {
      duration: OPEN_MS + 60,
      easing: "ease-out",
    });
    openAnim = grow;
    grow.finished
      .finally(() => {
        if (openAnim === grow) openAnim = null;
        if (!closing) card.style.visibility = "";
      })
      .catch(() => {}); // finished rejects when the close cancels the entrance

  }

  function closeModal() {
    if (closing) return;
    const card = trigger;
    if (prefersReducedMotion() || !card) {
      modal.close();
      return;
    }
    closing = true;
    // Cancel a still-running entrance so the exit measures the true rect.
    openAnim?.cancel();
    card.style.visibility = "hidden";
    const shrink = modal.animate(
      [{ transform: "none" }, { transform: transformToCard(card) }],
      { duration: CLOSE_MS, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    );
    closeFills.push(
      body.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: CLOSE_MS / 2,
        fill: "forwards",
      })
    );
    try {
      closeFills.push(
        modal.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: CLOSE_MS,
          pseudoElement: "::backdrop",
          fill: "forwards",
        })
      );
    } catch {
      // Older engines can't target ::backdrop; it pops out instead.
    }
    shrink.finished.finally(() => {
      closing = false;
      card.style.visibility = "";
      modal.close();
      // Drop the forwards fills so the next open isn't stuck at opacity 0.
      closeFills.forEach((anim) => anim.cancel());
      closeFills = [];
    });
  }

  for (const card of document.querySelectorAll('.project-card[aria-haspopup="dialog"], .card[aria-haspopup="dialog"]')) {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
  }

  modal.querySelector(".project-modal-close").addEventListener("click", closeModal);
  // Escape closes through the same shrink animation instead of popping shut.
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });
  // A click on the backdrop targets the dialog itself, not its contents.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  modal.addEventListener("close", () => {
    document.body.classList.remove("has-modal");
    trigger?.focus();
  });
}

function initHeroGrid() {
  const hero = document.querySelector(".hero");
  if (!hero || window.matchMedia("(pointer: coarse)").matches) return;

  // The darkening circle trails the cursor slightly (a soft "inking in"
  // feel) — unless the visitor prefers reduced motion, then it sticks
  // to the cursor directly.
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let raf = 0;

  const apply = () => {
    hero.style.setProperty("--grid-x", `${x.toFixed(1)}px`);
    hero.style.setProperty("--grid-y", `${y.toFixed(1)}px`);
  };

  const tick = () => {
    x += (targetX - x) * 0.22;
    y += (targetY - y) * 0.22;
    apply();
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
    if (!hero.classList.contains("is-inked")) {
      // First contact: start at the cursor instead of sweeping in.
      x = targetX;
      y = targetY;
      hero.classList.add("is-inked");
    }
    if (prefersReducedMotion()) {
      x = targetX;
      y = targetY;
      apply();
    } else if (!raf) {
      raf = requestAnimationFrame(tick);
    }
  });

  hero.addEventListener("pointerleave", () => {
    hero.classList.remove("is-inked");
  });
}

// The hero's scroll cue is a teaching device, not navigation: once the
// visitor scrolls it has done its job, so it fades out rather than
// sitting half-cut at the fold.
function initDisclosures() {
  for (const toggle of document.querySelectorAll("[aria-controls].principle-toggle")) {
    const region = document.getElementById(toggle.getAttribute("aria-controls"));
    if (!region) continue;
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      region.classList.toggle("is-open", !open);
    });
  }
}

function initPrinciplesFlow() {
  const flow = document.querySelector(".principles-flow");
  const canvas = flow?.querySelector(".principles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const styles = getComputedStyle(canvas);
  const SAMPLES = 72;
  const PULSE_MS = 2400; // the hello-ring's cadence

  // Fixed per-strand wave recipes: layered slow sines read as fabric, and
  // a single hue keeps it one stream.
  const strands = Array.from({ length: 14 }, () => ({
    amp1: 0.03 + Math.random() * 0.05,
    amp2: 0.008 + Math.random() * 0.016,
    f1: (1.1 + Math.random() * 0.9) * Math.PI * 2,
    f2: (2.2 + Math.random() * 1.5) * Math.PI * 2,
    s1: (Math.random() > 0.5 ? 1 : -1) * (0.00006 + Math.random() * 0.0001),
    s2: (Math.random() > 0.5 ? 1 : -1) * (0.00004 + Math.random() * 0.00008),
    p1: Math.random() * Math.PI * 2,
    p2: Math.random() * Math.PI * 2,
    alpha: 0.2 + Math.random() * 0.45,
    width: 0.9 + Math.random() * 1.7,
  }));

  const sparkles = Array.from({ length: 26 }, () => ({
    v: 0.06 + Math.random() * 0.88,
    off: (Math.random() - 0.5) * 0.16,
    r: 0.8 + Math.random() * 1.7,
    p: Math.random() * Math.PI * 2,
    s: 0.0008 + Math.random() * 0.0016,
  }));

  let w = 0;
  let h = 0;
  const resize = () => {
    const rect = flow.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  };

  // Centerline mirrors the braid's S: pockets around the three laws.
  const centerX = (v) => w * (0.5 + 0.28 * Math.sin(3 * Math.PI * v));
  // Strands fan apart near the ends so the stream disperses instead of
  // stopping on a hard edge.
  const spread = (v) => {
    const edge = v < 0.2 ? (0.2 - v) / 0.2 : v > 0.8 ? (v - 0.8) / 0.2 : 0;
    return 1 + edge * edge * 1.2;
  };
  const strandX = (strand, v, t) =>
    centerX(v) +
    spread(v) *
      (w * strand.amp1 * Math.sin(v * strand.f1 + t * strand.s1 + strand.p1) +
        w * strand.amp2 * Math.sin(v * strand.f2 + t * strand.s2 + strand.p2));

  const hexToRgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  // Vertical alpha ramp: the stream fades in from nothing and dissolves
  // out, which the taper + spread together read as dispersal.
  const taperGradient = ([r, g, b]) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
    grad.addColorStop(0.16, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(0.84, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    return grad;
  };

  const draw = (t) => {
    const dark =
      document.documentElement.dataset.theme === "dark" ||
      (document.documentElement.dataset.theme !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    const strandColor = styles.getPropertyValue("--flow-strand").trim();
    const glowColor = styles.getPropertyValue("--flow-glow").trim();
    const strength = parseFloat(styles.getPropertyValue("--flow-strength")) || 0.8;
    const pulse = 0.8 + 0.2 * Math.sin((t / PULSE_MS) * Math.PI * 2);
    const coreGrad = taperGradient(hexToRgb(strandColor));
    const glowGrad = taperGradient(hexToRgb(glowColor));
    // Dark wants restraint (additive stacks fast); light needs the bloom
    // pushed hard to register on a bright wash.
    const bloom = dark
      ? { alpha: 0.22, widthMul: 6, blur: 30 }
      : { alpha: 0.6, widthMul: 7, blur: 32 };
    const core = dark
      ? { alpha: 0.6, blur: 16 }
      : { alpha: 0.85, blur: 12 };

    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = glowColor;

    for (const strand of strands) {
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const v = i / SAMPLES;
        const x = strandX(strand, v, t);
        const y = v * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // Bloom pass: fat, faint, heavily blurred — additive in both themes
      // so the halo reads as light, not paint.
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = glowGrad;
      ctx.globalAlpha = strand.alpha * bloom.alpha * strength * pulse;
      ctx.lineWidth = strand.width * bloom.widthMul;
      ctx.shadowBlur = bloom.blur;
      ctx.stroke();
      // Core pass: the bright filament.
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      ctx.strokeStyle = coreGrad;
      ctx.globalAlpha = strand.alpha * core.alpha * strength * pulse;
      ctx.lineWidth = strand.width;
      ctx.shadowBlur = core.blur;
      ctx.stroke();
    }

    // Sparks drifting with the stream, twinkling out of phase.
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 8;
    ctx.fillStyle = strandColor;
    for (const spark of sparkles) {
      const x = centerX(spark.v) + w * spark.off;
      const y = spark.v * h;
      const fade = Math.min(1, Math.min(spark.v, 1 - spark.v) / 0.16);
      ctx.globalAlpha =
        Math.abs(Math.sin(spark.p + t * spark.s)) * 0.6 * fade * strength * pulse;
      ctx.beginPath();
      ctx.arc(x, y, spark.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-over";
  };

  let running = false;
  let rafId = 0;
  const tick = (now) => {
    draw(now);
    if (running) rafId = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || prefersReducedMotion()) return;
    running = true;
    rafId = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  const boot = () => {
    if (!resize()) return false;
    draw(performance.now());
    return true;
  };
  if (!boot()) {
    // Layout wasn't ready (display: none ancestors, zero-width pane);
    // try again on the next resize.
    window.addEventListener("resize", () => {
      if (!w) boot();
    });
  }
  window.addEventListener(
    "resize",
    () => {
      if (resize()) draw(performance.now());
    },
    { passive: true }
  );

  // Animate only while the stream is on screen.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { rootMargin: "80px" }
    ).observe(flow);
  } else {
    start();
  }
}

function initScrollCue() {
  const cue = document.getElementById("scroll-cue");
  if (!cue) return;

  // Rests while you read, hides while you scroll, retires at the end.
  let idleTimer = 0;
  const atEnd = () =>
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 160;
  const settle = () => cue.classList.toggle("is-hidden", atEnd());

  window.addEventListener(
    "scroll",
    () => {
      cue.classList.add("is-hidden");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(settle, 350);
    },
    { passive: true }
  );

  cue.addEventListener("click", () => {
    const next = [...document.querySelectorAll("main section[id]")].find(
      (section) => section.getBoundingClientRect().top > 80
    );
    next?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  });

  settle();
}

// The about-me reel scrolls natively (snap points); the arrows just nudge
// it one slide at a time and dim at the ends.
function initAboutCarousel() {
  const track = document.querySelector(".about-track");
  if (!track) return;
  const prev = document.querySelector(".about-nav--prev");
  const next = document.querySelector(".about-nav--next");
  const slideStep = () => {
    const slide = track.querySelector(".about-slide");
    return slide ? slide.getBoundingClientRect().width + 16 : 300;
  };
  const nudge = (dir) =>
    track.scrollBy({
      left: dir * slideStep(),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  prev.addEventListener("click", () => nudge(-1));
  next.addEventListener("click", () => nudge(1));
  const updateEnds = () => {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled =
      track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  };
  track.addEventListener("scroll", updateEnds, { passive: true });
  window.addEventListener("resize", updateEnds);
  updateEnds();
}

function initSiteChrome() {
  initThemeToggle();
  initReveal();
  initScrollSpy();
  initTypewriter();
  initProjectModal();
  initHeroGrid();
  initDisclosures();
  initPrinciplesFlow();
  initScrollCue();
  initAboutCarousel();
}

window.initSiteChrome = initSiteChrome;
initSiteChrome();
