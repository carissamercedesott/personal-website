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

  const inner = toc.querySelector(".resume-toc-inner");
  const marker = toc.querySelector(".resume-toc-marker");
  let markerLink = null;
  let markerTop = null;

  // Park the accent line over the active label. The edge leading the move gets
  // the shorter duration, so the line stretches on its way and gathers itself
  // at the destination; see the transition in site.css.
  const moveMarker = (link) => {
    if (!inner || !marker) return;
    const innerRect = inner.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const top = linkRect.top - innerRect.top;
    if (link === markerLink && top === markerTop) return;
    const first = markerTop === null;
    const goingDown = !first && top > markerTop;
    markerLink = link;
    markerTop = top;
    inner.style.setProperty("--toc-marker-top", `${top}px`);
    inner.style.setProperty("--toc-marker-bottom", `${top + linkRect.height}px`);
    inner.style.setProperty("--toc-marker-dur-top", goingDown ? "620ms" : "440ms");
    inner.style.setProperty("--toc-marker-dur-bottom", goingDown ? "440ms" : "620ms");
    // First placement lands without transition (see :not(.is-ready) in the
    // CSS), so the line doesn't sweep down from the top of the rail on load.
    // The reflow read commits that position before motion is switched on.
    if (first) void inner.offsetHeight;
    inner.classList.add("is-ready");
  };

  const setActive = (id) => {
    for (const link of links) {
      const active = link.hash === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) moveMarker(link);
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

  // `card` supplies the content; `restoreTo` is what regains focus on close —
  // the same element for a card you click, the "See more" button for a work
  // chapter (a section isn't focusable, so focus would fall to the body).
  function openModal(card, restoreTo) {
    const cardImage = card.querySelector(".project-card-img");
    const cardMedia = card.querySelector(".card-media--phone");
    const cardVideo = card.querySelector(".card-video");
    trigger = restoreTo ?? card;

    // A fresh clone per open; the close handler removes it again.
    modal.querySelector(".project-modal-media")?.remove();

    if (cardMedia && !prefersReducedMotion()) {
      // Cross Math reopens with the same phone-framed clip, still playing —
      // continue from wherever the card's hover preview left off.
      image.hidden = true;
      const media = cardMedia.cloneNode(true);
      media.classList.add("project-modal-media");
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

    // Cards name the build in an h3; a full-screen work chapter names it in
    // its h2, since there the build's name is the screen's headline.
    title.textContent = card.querySelector("h2, h3").textContent;
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
  // clicking anywhere on it opens the modal — except on a work chapter, which
  // is a whole screen and far too big to be one hit target; there only the
  // button opens it, while the chapter still supplies the modal's content.
  for (const trigger of document.querySelectorAll('[aria-haspopup="dialog"]')) {
    const card = trigger.closest(".project-card, .card, .work-chapter") ?? trigger;
    const hit = card.matches(".work-chapter") ? trigger : card;
    hit.addEventListener("click", () => {
      if (!modal.open) openModal(card, hit);
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

// Device recordings play themselves: data-autoplay media runs whenever it's
// on screen (paused off screen to save the battery), everything else keeps
// the old preview-on-intent hover behavior. Reduced motion leaves the
// poster still — no autoplay at all.
function initCardVideo() {
  const medias = document.querySelectorAll(".card-media--phone");
  if (medias.length === 0 || prefersReducedMotion()) return;

  const hoverCapable = window.matchMedia("(hover: hover)").matches;

  for (const media of medias) {
    const video = media.querySelector("video");
    if (!video) continue;

    const play = () => {
      // The first play() is what fetches the clip.
      video.play().catch(() => {});
    };
    const stop = () => {
      video.pause();
    };

    if ("autoplay" in media.dataset) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) play();
              else stop();
            }
          },
          { threshold: 0.25 }
        );
        observer.observe(media);
      } else {
        play();
      }
    } else if (hoverCapable) {
      const card = media.closest(".project-card") ?? media;
      card.addEventListener("pointerenter", play);
      card.addEventListener("pointerleave", () => {
        stop();
        video.currentTime = 0;
      });
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", (event) => {
        if (!card.contains(event.relatedTarget)) {
          stop();
          video.currentTime = 0;
        }
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

// The Waddl screen upgrades its screenshot to the real app: the deployed
// build (/waddl-app/) rendered at its natural 1380×690, scaled into the
// window frame, told to autorun its scripted demo. Ambient by design —
// pointer-events stay off (the link goes to /waddl), so the demo can't
// steal scroll or the arrow keys. The screenshot underneath doubles as the
// loading poster and stays for touch, narrow screens, and reduced motion.
function initWaddlEmbed() {
  const frame = document.querySelector("[data-waddl-embed]");
  if (!frame) return;
  if (prefersReducedMotion()) return;
  if (!window.matchMedia("(min-width: 861px) and (hover: hover)").matches) return;

  // The size the app lays out at before scaling; matches the screenshot's
  // 2:1 ratio so the swap doesn't shift the frame.
  const APP_W = 1380;
  const APP_H = 690;

  // Mirrors the theme toggle's own resolution: explicit choice, else OS.
  const pageMode = () => {
    const set = document.documentElement.dataset.theme;
    if (set === "dark" || set === "light") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const mount = () => {
    const iframe = document.createElement("iframe");
    iframe.className = "desk-live";
    iframe.src = `/waddl-app/?autorun&mode=${pageMode()}`;
    iframe.title = "Waddl — live demo";
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("tabindex", "-1");
    iframe.width = APP_W;
    iframe.height = APP_H;
    const scale = () => {
      iframe.style.transform = `scale(${frame.clientWidth / APP_W})`;
    };
    iframe.addEventListener("load", () => {
      frame.classList.add("is-live");
      // The status joins the rule's stack line ("Electron · TypeScript · …")
      // rather than overlaying the window — the window clips its overflow,
      // and the app already draws its own chrome.
      const meta = frame.closest("section")?.querySelector(".work-rule-meta");
      if (meta && !meta.querySelector(".desk-badge")) {
        const badge = document.createElement("span");
        badge.className = "desk-badge";
        badge.innerHTML = ' · <i aria-hidden="true"></i> live demo';
        meta.appendChild(badge);
      }
    });
    frame.appendChild(iframe);
    scale();
    window.addEventListener("resize", scale);
    // Theme toggles reach the demo without a reload.
    new MutationObserver(() => {
      iframe.contentWindow?.postMessage({ waddlMode: pageMode() }, "*");
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  };

  // The app is a real bundle; don't fetch it until the screen is close.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          mount();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(frame);
  } else {
    mount();
  }
}

function initPageBack() {
  const back = document.querySelector(".page-back");
  if (!back) return;
  // The link says Home and always goes home. The one special case is arriving
  // from the home page itself: there, history.back() reaches the same place as
  // the href but restores the scroll position, so a visitor who clicked into a
  // card lands back where they were reading instead of at the top. From any
  // other referrer — another sub-page, a search result, a direct link — going
  // back would land somewhere that isn't home, so the href's "/" wins.
  back.addEventListener("click", (event) => {
    let from;
    try {
      from = new URL(document.referrer);
    } catch {
      return; // No referrer (direct visit): follow the href.
    }
    const cameFromHome =
      from.origin === window.location.origin && from.pathname === "/";
    if (cameFromHome && window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  });
}

// Resume org tiles carry a logo over the organization's initial. A missing
// or misnamed file would otherwise leave a broken-image glyph sitting on a
// resume, so drop the image and let the letter underneath stand in.
function initOrgLogos() {
  document.querySelectorAll(".org-logo").forEach((img) => {
    const drop = () => img.remove();
    // The error may already have fired before this script ran.
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener("error", drop);
  });
}

// <details> gives the resume its keyboard behaviour and keeps it readable
// with no JS, but it can't animate itself — open is instant and there's no
// closing frame at all. So the summary click is intercepted: opening flips
// the attribute first and animates up from nothing, closing animates down and
// only then flips it, which is the half the element can't do alone.
function initOrgDisclosures() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("details.org").forEach((details) => {
    const summary = details.querySelector("summary");
    const panel = details.querySelector(".org-roles");
    if (!summary || !panel) return;
    let running = null;
    let guard = null;
    let settle = null;

    summary.addEventListener("click", (event) => {
      // Let the element do its own thing when motion isn't wanted.
      if (reduced.matches) return;
      event.preventDefault();

      // Cancel any run still in flight, without letting its completion fire.
      if (settle) settle(true);

      const opening = !details.open;
      // Open first: a closed <details> has no laid-out panel to measure.
      if (opening) details.open = true;
      const height = panel.offsetHeight;

      running = panel.animate(
        {
          height: opening ? [0, height + "px"] : [height + "px", 0],
          opacity: opening ? [0, 1] : [1, 0],
        },
        { duration: 260, easing: "cubic-bezier(0.2, 0, 0, 1)" },
      );

      // The open/closed state is settled here rather than in an onfinish
      // handler. Animation events are delivered by the rendering loop, so a
      // document that isn't being painted — a background tab, a throttled
      // frame loop — would finish the animation and never tell us, stranding
      // the panel shut with the section marked open. A timer doesn't depend
      // on painting, so it can always land the end state.
      settle = (aborted) => {
        window.clearTimeout(guard);
        guard = null;
        settle = null;
        if (running) {
          running.onfinish = null;
          if (aborted) running.cancel();
          else running.finish();
          running = null;
        }
        if (!aborted && !opening) details.open = false;
      };

      guard = window.setTimeout(settle, 300);
      running.onfinish = () => settle();
    });
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
  initScrollCue();
  initAboutCarousel();
  initCardVideo();
  initWaddlEmbed();
  initPageBack();
  initOrgLogos();
  initOrgDisclosures();
}

window.initSiteChrome = initSiteChrome;
initSiteChrome();
