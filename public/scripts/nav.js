// Soft navigation: fetch the next page and swap its content in place so
// the document never unloads — which keeps DJ mode's audio playing
// seamlessly across pages. The design system page and external links
// still navigate normally.

(function initSoftNav() {
  if (!window.fetch || !window.DOMParser || !window.history?.pushState) return;

  const SOFT_PATHS = ["/", "/experience", "/projects", "/about", "/interests"];

  function normalizePath(pathname) {
    const trimmed = pathname.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  }

  function canSoftNavigate(link, event) {
    if (event.defaultPrevented || event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    if (link.target && link.target !== "_self") return false;
    if (link.origin !== location.origin) return false;
    return SOFT_PATHS.includes(normalizePath(link.pathname));
  }

  function swapPage(doc, url, push) {
    document.title = doc.title;

    // Incoming scripts must not re-execute — dj.js and site.js are
    // already live in this document.
    doc.body.querySelectorAll("script").forEach((script) => script.remove());

    const djing = document.body.classList.contains("is-djing");
    document.body.className = doc.body.className;
    if (djing) document.body.classList.add("is-djing");

    // The DJ deck (its running audio and animations) must survive the
    // swap untouched — removing and re-adding it would restart its CSS
    // animations and flicker the BPM panel. Swap everything around it.
    const dj = document.querySelector(".dj");
    for (const child of Array.from(document.body.children)) {
      if (child !== dj) child.remove();
    }
    // Snapshot before adopting: adoptNode removes each node from the live
    // HTMLCollection, which would otherwise skip every other element.
    const incoming = Array.from(doc.body.children).map((node) => document.adoptNode(node));
    if (dj) {
      dj.before(...incoming);
    } else {
      document.body.append(...incoming);
    }

    if (push) history.pushState({}, "", url);
    window.scrollTo(0, 0);
    if (window.initSiteChrome) window.initSiteChrome();
  }

  async function loadPage(url, push) {
    let doc;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(String(response.status));
      doc = new DOMParser().parseFromString(await response.text(), "text/html");
    } catch {
      location.href = url; // network hiccup — fall back to a full load
      return;
    }
    if (document.startViewTransition) {
      document.startViewTransition(() => swapPage(doc, url, push));
    } else {
      swapPage(doc, url, push);
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !canSoftNavigate(link, event)) return;
    event.preventDefault();
    if (normalizePath(link.pathname) === normalizePath(location.pathname)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    loadPage(link.href, true);
  });

  window.addEventListener("popstate", () => loadPage(location.href, false));
})();
