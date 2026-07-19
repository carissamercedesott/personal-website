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

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const image = modal.querySelector(".project-modal-img");
  const title = modal.querySelector(".project-modal-title");
  const info = modal.querySelector(".project-modal-info");
  let trigger = null;

  // The card's screenshot morphs into the modal's (and back on close)
  // via a same-document view transition; without support it's the pop.
  function morph(fromImage, toImage, update) {
    if (!document.startViewTransition || prefersReducedMotion()) {
      update();
      return;
    }
    modal.dataset.vt = "1";
    fromImage.style.viewTransitionName = "project-media";
    const transition = document.startViewTransition(() => {
      fromImage.style.viewTransitionName = "";
      toImage.style.viewTransitionName = "project-media";
      update();
    });
    transition.finished.finally(() => {
      toImage.style.viewTransitionName = "";
      delete modal.dataset.vt;
    });
  }

  function openModal(card) {
    const cardImage = card.querySelector(".project-card-img");
    trigger = card;
    morph(cardImage, image, () => {
      image.src = cardImage.src;
      image.alt = cardImage.alt;
      title.textContent = card.querySelector("h3").textContent;
      info.innerHTML = card.querySelector(".project-card-details")?.innerHTML ?? "";
      modal.showModal();
      document.body.classList.add("has-modal");
    });
  }

  function closeModal() {
    const cardImage = trigger?.querySelector(".project-card-img");
    if (!cardImage) {
      modal.close();
      return;
    }
    morph(image, cardImage, () => modal.close());
  }

  for (const card of document.querySelectorAll('.project-card[aria-haspopup="dialog"]')) {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
  }

  modal.querySelector(".project-modal-close").addEventListener("click", closeModal);
  // A click on the backdrop targets the dialog itself, not its contents.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  modal.addEventListener("close", () => {
    document.body.classList.remove("has-modal");
    trigger?.focus();
  });
}

function initSiteChrome() {
  initThemeToggle();
  initReveal();
  initScrollSpy();
  initTypewriter();
  initProjectModal();
}

window.initSiteChrome = initSiteChrome;
initSiteChrome();
