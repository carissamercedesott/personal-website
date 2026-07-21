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

// Resume side rail: click a section to scroll to it, and highlight whichever
// section is in view. A scroll-based spy (rather than IntersectionObserver) so
// sections of very different heights resolve predictably.
function initResumeToc() {
  const toc = document.querySelector(".resume-toc");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);
  if (sections.length === 0) return;

  const setActive = (id) => {
    for (const link of links) {
      link.classList.toggle("is-active", link.hash === `#${id}`);
    }
  };

  // While a clicked target is scrolling into view, its link stays lit so the
  // rail lands on what you picked — even when the page bottoms out before that
  // section can reach the top (short trailing sections share the final screen).
  let lockedId = null;
  let lockTimer = 0;

  const update = () => {
    if (lockedId) {
      setActive(lockedId);
      return;
    }
    // Active section = the last one whose heading has passed just under the
    // sticky header.
    const line = 140;
    let currentId = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) currentId = section.id;
    }
    // At the very bottom, trailing sections may be too short to ever reach the
    // line — land on the last one so the rail can complete.
    const atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 4;
    if (atBottom) currentId = sections[sections.length - 1].id;
    setActive(currentId);
  };

  const releaseLock = () => {
    lockedId = null;
  };

  for (const link of links) {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      lockedId = target.id;
      setActive(lockedId);
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      // Reflect the section in the URL without the browser's own jump.
      history.replaceState(null, "", link.hash);
      // scrollend releases the lock the moment the smooth scroll settles;
      // the timer is a fallback for browsers without scrollend.
      window.clearTimeout(lockTimer);
      lockTimer = window.setTimeout(releaseLock, 1000);
    });
  }
  window.addEventListener("scrollend", releaseLock);

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
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
  let trigger = null;
  let closing = false;

  // Matches the .project-modal.is-closing animation in home.css.
  const CLOSE_MS = 140;

  function openModal(card) {
    const cardImage = card.querySelector(".project-card-img");
    const cardMedia = card.querySelector(".card-media--phone");
    const cardVideo = card.querySelector(".card-video");
    trigger = card;

    // A fresh clone per open; the close handler removes it again.
    modal.querySelector(".project-modal-media")?.remove();

    if (cardMedia && !prefersReducedMotion()) {
      // Cross Math reopens with the same phone-framed clip, still playing —
      // continue from wherever the card's hover preview left off.
      image.hidden = true;
      const media = cardMedia.cloneNode(true);
      media.classList.add("project-modal-media");
      media.querySelector(".card-preview-hint")?.remove();
      modal.insertBefore(media, image);
      const video = media.querySelector("video");
      if (video) {
        if (cardVideo && !cardVideo.paused) video.currentTime = cardVideo.currentTime;
        video.play().catch(() => {});
      }
    } else {
      // Image cards — and reduced motion — get a still poster.
      const src = cardImage?.src ?? cardVideo?.getAttribute("poster") ?? "";
      image.hidden = !src;
      image.src = src;
      image.alt = cardImage?.alt ?? cardVideo?.getAttribute("aria-label") ?? "";
    }

    title.textContent = card.querySelector("h3").textContent;
    info.innerHTML = card.querySelector(".project-card-details")?.innerHTML ?? "";
    modal.showModal();
    document.body.classList.add("has-modal");
  }

  function closeModal() {
    if (closing) return;
    if (prefersReducedMotion()) {
      modal.close();
      return;
    }
    closing = true;
    modal.classList.add("is-closing");
    // A timer rather than animationend: a backgrounded tab freezes animations,
    // and a close that never fires would leave the modal stuck at opacity 0.
    setTimeout(() => {
      modal.classList.remove("is-closing");
      closing = false;
      modal.close();
    }, CLOSE_MS);
  }

  // The trigger is either the card itself (shelf cards) or a "See more"
  // button inside it (flagships). The listener sits on the card either way, so
  // clicking anywhere on it opens the modal.
  for (const trigger of document.querySelectorAll('[aria-haspopup="dialog"]')) {
    const card = trigger.closest(".project-card, .card") ?? trigger;
    card.addEventListener("click", () => {
      if (!modal.open) openModal(card);
    });
    // A real <button> already fires click on Enter/Space; role="button" doesn't.
    if (trigger !== card) continue;
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
    const media = modal.querySelector(".project-modal-media");
    media?.querySelector("video")?.pause();
    media?.remove();
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

// Flagship cards can preview a muted screen recording. Desktop plays on
// hover/focus (preview on intent); touch plays while the card is in view.
// Reduced motion leaves the poster still — no autoplay at all.
function initCardVideo() {
  const medias = document.querySelectorAll(".card-media--phone");
  if (medias.length === 0 || prefersReducedMotion()) return;

  const hoverCapable = window.matchMedia("(hover: hover)").matches;

  for (const media of medias) {
    const video = media.querySelector("video");
    if (!video) continue;

    const play = () => {
      // preload="none": the first play() is what fetches the clip.
      const started = video.play();
      const mark = () => media.classList.add("is-playing");
      if (started && started.then) started.then(mark).catch(() => {});
      else mark();
    };
    const stop = () => {
      video.pause();
      video.currentTime = 0;
      media.classList.remove("is-playing");
    };

    if (hoverCapable) {
      const card = media.closest(".project-card") ?? media;
      card.addEventListener("pointerenter", play);
      card.addEventListener("pointerleave", stop);
      // Keyboard: playing while any control inside the card holds focus.
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", (event) => {
        if (!card.contains(event.relatedTarget)) stop();
      });
    } else if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) play();
            else stop();
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(media);
    }
  }
}

function initPageBack() {
  const back = document.querySelector(".page-back");
  if (!back) return;
  // Return to the page the visitor actually came from (home, the Work
  // gallery, …); the href is the fallback for direct visits.
  back.addEventListener("click", (event) => {
    if (document.referrer.startsWith(window.location.origin) && window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  });
}

function initSiteChrome() {
  initThemeToggle();
  initReveal();
  initScrollSpy();
  initResumeToc();
  initTypewriter();
  initProjectModal();
  initHeroGrid();
  initDisclosures();
  initScrollCue();
  initAboutCarousel();
  initCardVideo();
  initPageBack();
}

window.initSiteChrome = initSiteChrome;
initSiteChrome();
