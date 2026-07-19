const Oe = (e, n) => e === n, qe = Symbol("solid-track"), le = {
  equals: Oe
};
let Ae = Pe;
const X = 1, ce = 2, Me = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var A = null;
let me = null, Ue = null, E = null, P = null, W = null, fe = 0;
function oe(e, n) {
  const t = E, s = A, r = e.length === 0, a = n === void 0 ? s : n, o = r ? Me : {
    owned: null,
    cleanups: null,
    context: a ? a.context : null,
    owner: a
  }, i = r ? e : () => e(() => G(() => Z(o)));
  A = o, E = null;
  try {
    return te(i, !0);
  } finally {
    E = t, A = s;
  }
}
function D(e, n) {
  n = n ? Object.assign({}, le, n) : le;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, s = (r) => (typeof r == "function" && (r = r(t.value)), Le(t, r));
  return [De.bind(t), s];
}
function L(e, n, t) {
  const s = be(e, n, !1, X);
  ne(s);
}
function ye(e, n, t) {
  Ae = Xe;
  const s = be(e, n, !1, X);
  s.user = !0, W ? W.push(s) : ne(s);
}
function j(e, n, t) {
  t = t ? Object.assign({}, le, t) : le;
  const s = be(e, n, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = t.equals || void 0, ne(s), De.bind(s);
}
function G(e) {
  if (E === null) return e();
  const n = E;
  E = null;
  try {
    return e();
  } finally {
    E = n;
  }
}
function We(e) {
  ye(() => G(e));
}
function he(e) {
  return A === null || (A.cleanups === null ? A.cleanups = [e] : A.cleanups.push(e)), e;
}
function De() {
  if (this.sources && this.state)
    if (this.state === X) ne(this);
    else {
      const e = P;
      P = null, te(() => ue(this), !1), P = e;
    }
  if (E) {
    const e = this.observers;
    if (!e || e[e.length - 1] !== E) {
      const n = e ? e.length : 0;
      E.sources ? (E.sources.push(this), E.sourceSlots.push(n)) : (E.sources = [this], E.sourceSlots = [n]), e ? (e.push(E), this.observerSlots.push(E.sources.length - 1)) : (this.observers = [E], this.observerSlots = [E.sources.length - 1]);
    }
  }
  return this.value;
}
function Le(e, n, t) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, n)) && (e.value = n, e.observers && e.observers.length && te(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const a = e.observers[r], o = me && me.running;
      o && me.disposed.has(a), (o ? !a.tState : !a.state) && (a.pure ? P.push(a) : W.push(a), a.observers && Ie(a)), o || (a.state = X);
    }
    if (P.length > 1e6)
      throw P = [], new Error();
  }, !1)), n;
}
function ne(e) {
  if (!e.fn) return;
  Z(e);
  const n = fe;
  He(e, e.value, n);
}
function He(e, n, t) {
  let s;
  const r = A, a = E;
  E = A = e;
  try {
    s = e.fn(n);
  } catch (o) {
    return e.pure && (e.state = X, e.owned && e.owned.forEach(Z), e.owned = null), e.updatedAt = t + 1, Ne(o);
  } finally {
    E = a, A = r;
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? Le(e, s) : e.value = s, e.updatedAt = t);
}
function be(e, n, t, s = X, r) {
  const a = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: A,
    context: A ? A.context : null,
    pure: t
  };
  return A === null || A !== Me && (A.owned ? A.owned.push(a) : A.owned = [a]), a;
}
function de(e) {
  if (e.state === 0) return;
  if (e.state === ce) return ue(e);
  if (e.suspense && G(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < fe); )
    e.state && n.push(e);
  for (let t = n.length - 1; t >= 0; t--)
    if (e = n[t], e.state === X)
      ne(e);
    else if (e.state === ce) {
      const s = P;
      P = null, te(() => ue(e, n[0]), !1), P = s;
    }
}
function te(e, n) {
  if (P) return e();
  let t = !1;
  n || (P = []), W ? t = !0 : W = [], fe++;
  try {
    const s = e();
    return Ge(t), s;
  } catch (s) {
    t || (W = null), P = null, Ne(s);
  }
}
function Ge(e) {
  if (P && (Pe(P), P = null), e) return;
  const n = W;
  W = null, n.length && te(() => Ae(n), !1);
}
function Pe(e) {
  for (let n = 0; n < e.length; n++) de(e[n]);
}
function Xe(e) {
  let n, t = 0;
  for (n = 0; n < e.length; n++) {
    const s = e[n];
    s.user ? e[t++] = s : de(s);
  }
  for (n = 0; n < t; n++) de(e[n]);
}
function ue(e, n) {
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const s = e.sources[t];
    if (s.sources) {
      const r = s.state;
      r === X ? s !== n && (!s.updatedAt || s.updatedAt < fe) && de(s) : r === ce && ue(s, n);
    }
  }
}
function Ie(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const t = e.observers[n];
    t.state || (t.state = ce, t.pure ? P.push(t) : W.push(t), t.observers && Ie(t));
  }
}
function Z(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), s = e.sourceSlots.pop(), r = t.observers;
      if (r && r.length) {
        const a = r.pop(), o = t.observerSlots.pop();
        s < r.length && (a.sourceSlots[o] = s, r[s] = a, t.observerSlots[s] = o);
      }
    }
  if (e.tOwned) {
    for (n = e.tOwned.length - 1; n >= 0; n--) Z(e.tOwned[n]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (n = e.owned.length - 1; n >= 0; n--) Z(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Ve(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function Ne(e, n = A) {
  throw Ve(e);
}
const ze = Symbol("fallback");
function Te(e) {
  for (let n = 0; n < e.length; n++) e[n]();
}
function je(e, n, t = {}) {
  let s = [], r = [], a = [], o = 0, i = n.length > 1 ? [] : null;
  return he(() => Te(a)), () => {
    let l = e() || [], d = l.length, u, c;
    return l[qe], G(() => {
      let b, h, x, T, p, g, m, C, N;
      if (d === 0)
        o !== 0 && (Te(a), a = [], s = [], r = [], o = 0, i && (i = [])), t.fallback && (s = [ze], r[0] = oe((q) => (a[0] = q, t.fallback())), o = 1);
      else if (o === 0) {
        for (r = new Array(d), c = 0; c < d; c++)
          s[c] = l[c], r[c] = oe(w);
        o = d;
      } else {
        for (x = new Array(d), T = new Array(d), i && (p = new Array(d)), g = 0, m = Math.min(o, d); g < m && s[g] === l[g]; g++) ;
        for (m = o - 1, C = d - 1; m >= g && C >= g && s[m] === l[C]; m--, C--)
          x[C] = r[m], T[C] = a[m], i && (p[C] = i[m]);
        for (b = /* @__PURE__ */ new Map(), h = new Array(C + 1), c = C; c >= g; c--)
          N = l[c], u = b.get(N), h[c] = u === void 0 ? -1 : u, b.set(N, c);
        for (u = g; u <= m; u++)
          N = s[u], c = b.get(N), c !== void 0 && c !== -1 ? (x[c] = r[u], T[c] = a[u], i && (p[c] = i[u]), c = h[c], b.set(N, c)) : a[u]();
        for (c = g; c < d; c++)
          c in x ? (r[c] = x[c], a[c] = T[c], i && (i[c] = p[c], i[c](c))) : r[c] = oe(w);
        r = r.slice(0, o = d), s = l.slice(0);
      }
      return r;
    });
    function w(b) {
      if (a[c] = b, i) {
        const [h, x] = D(c);
        return i[c] = x, n(l[c], h);
      }
      return n(l[c]);
    }
  };
}
function _(e, n) {
  return G(() => e(n || {}));
}
const Ye = (e) => `Stale read from <${e}>.`;
function ee(e) {
  const n = "fallback" in e && {
    fallback: () => e.fallback
  };
  return j(je(() => e.each, e.children, n || void 0));
}
function J(e) {
  const n = e.keyed, t = j(() => e.when, void 0, void 0), s = n ? t : j(t, void 0, {
    equals: (r, a) => !r == !a
  });
  return j(() => {
    const r = s();
    if (r) {
      const a = e.children;
      return typeof a == "function" && a.length > 0 ? G(() => a(n ? r : () => {
        if (!G(s)) throw Ye("Show");
        return t();
      })) : a;
    }
    return e.fallback;
  }, void 0, void 0);
}
const ge = (e) => j(() => e());
function Be(e, n, t) {
  let s = t.length, r = n.length, a = s, o = 0, i = 0, l = n[r - 1].nextSibling, d = null;
  for (; o < r || i < a; ) {
    if (n[o] === t[i]) {
      o++, i++;
      continue;
    }
    for (; n[r - 1] === t[a - 1]; )
      r--, a--;
    if (r === o) {
      const u = a < s ? i ? t[i - 1].nextSibling : t[a - i] : l;
      for (; i < a; ) e.insertBefore(t[i++], u);
    } else if (a === i)
      for (; o < r; )
        (!d || !d.has(n[o])) && n[o].remove(), o++;
    else if (n[o] === t[a - 1] && t[i] === n[r - 1]) {
      const u = n[--r].nextSibling;
      e.insertBefore(t[i++], n[o++].nextSibling), e.insertBefore(t[--a], u), n[r] = t[a];
    } else {
      if (!d) {
        d = /* @__PURE__ */ new Map();
        let c = i;
        for (; c < a; ) d.set(t[c], c++);
      }
      const u = d.get(n[o]);
      if (u != null)
        if (i < u && u < a) {
          let c = o, w = 1, b;
          for (; ++c < r && c < a && !((b = d.get(n[c])) == null || b !== u + w); )
            w++;
          if (w > u - i) {
            const h = n[o];
            for (; i < u; ) e.insertBefore(t[i++], h);
          } else e.replaceChild(t[i++], n[o++]);
        } else o++;
      else n[o++].remove();
    }
  }
}
const Ee = "_$DX_DELEGATE";
function Qe(e, n, t, s = {}) {
  let r;
  return oe((a) => {
    r = a, n === document ? e() : y(n, e(), n.firstChild ? null : void 0, t);
  }, s.owner), () => {
    r(), n.textContent = "";
  };
}
function I(e, n, t, s) {
  let r;
  const a = () => {
    const i = document.createElement("template");
    return i.innerHTML = e, i.content.firstChild;
  }, o = () => (r || (r = a())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function se(e, n = window.document) {
  const t = n[Ee] || (n[Ee] = /* @__PURE__ */ new Set());
  for (let s = 0, r = e.length; s < r; s++) {
    const a = e[s];
    t.has(a) || (t.add(a), n.addEventListener(a, Ze));
  }
}
function B(e, n, t) {
  t == null ? e.removeAttribute(n) : e.setAttribute(n, t);
}
function Je(e, n) {
  n == null ? e.removeAttribute("class") : e.className = n;
}
function ve(e, n, t) {
  t != null ? e.style.setProperty(n, t) : e.style.removeProperty(n);
}
function Ce(e, n, t) {
  return G(() => e(n, t));
}
function y(e, n, t, s) {
  if (t !== void 0 && !s && (s = []), typeof n != "function") return pe(e, n, s, t);
  L((r) => pe(e, n(), r, t), s);
}
function Ze(e) {
  let n = e.target;
  const t = `$$${e.type}`, s = e.target, r = e.currentTarget, a = (l) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: l
  }), o = () => {
    const l = n[t];
    if (l && !n.disabled) {
      const d = n[`${t}Data`];
      if (d !== void 0 ? l.call(n, d, e) : l.call(n, e), e.cancelBubble) return;
    }
    return n.host && typeof n.host != "string" && !n.host._$host && n.contains(e.target) && a(n.host), !0;
  }, i = () => {
    for (; o() && (n = n._$host || n.parentNode || n.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), e.composedPath) {
    const l = e.composedPath();
    a(l[0]);
    for (let d = 0; d < l.length - 2 && (n = l[d], !!o()); d++) {
      if (n._$host) {
        n = n._$host, i();
        break;
      }
      if (n.parentNode === r)
        break;
    }
  } else i();
  a(s);
}
function pe(e, n, t, s, r) {
  for (; typeof t == "function"; ) t = t();
  if (n === t) return t;
  const a = typeof n, o = s !== void 0;
  if (e = o && t[0] && t[0].parentNode || e, a === "string" || a === "number") {
    if (a === "number" && (n = n.toString(), n === t))
      return t;
    if (o) {
      let i = t[0];
      i && i.nodeType === 3 ? i.data !== n && (i.data = n) : i = document.createTextNode(n), t = Y(e, t, s, i);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
  } else if (n == null || a === "boolean")
    t = Y(e, t, s);
  else {
    if (a === "function")
      return L(() => {
        let i = n();
        for (; typeof i == "function"; ) i = i();
        t = pe(e, i, t, s);
      }), () => t;
    if (Array.isArray(n)) {
      const i = [], l = t && Array.isArray(t);
      if (we(i, n, t, r))
        return L(() => t = pe(e, i, t, s, !0)), () => t;
      if (i.length === 0) {
        if (t = Y(e, t, s), o) return t;
      } else l ? t.length === 0 ? _e(e, i, s) : Be(e, t, i) : (t && Y(e), _e(e, i));
      t = i;
    } else if (n.nodeType) {
      if (Array.isArray(t)) {
        if (o) return t = Y(e, t, s, n);
        Y(e, t, null, n);
      } else t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      t = n;
    }
  }
  return t;
}
function we(e, n, t, s) {
  let r = !1;
  for (let a = 0, o = n.length; a < o; a++) {
    let i = n[a], l = t && t[e.length], d;
    if (!(i == null || i === !0 || i === !1)) if ((d = typeof i) == "object" && i.nodeType)
      e.push(i);
    else if (Array.isArray(i))
      r = we(e, i, l) || r;
    else if (d === "function")
      if (s) {
        for (; typeof i == "function"; ) i = i();
        r = we(e, Array.isArray(i) ? i : [i], Array.isArray(l) ? l : [l]) || r;
      } else
        e.push(i), r = !0;
    else {
      const u = String(i);
      l && l.nodeType === 3 && l.data === u ? e.push(l) : e.push(document.createTextNode(u));
    }
  }
  return r;
}
function _e(e, n, t = null) {
  for (let s = 0, r = n.length; s < r; s++) e.insertBefore(n[s], t);
}
function Y(e, n, t, s) {
  if (t === void 0) return e.textContent = "";
  const r = s || document.createTextNode("");
  if (n.length) {
    let a = !1;
    for (let o = n.length - 1; o >= 0; o--) {
      const i = n[o];
      if (r !== i) {
        const l = i.parentNode === e;
        !a && !o ? l ? e.replaceChild(r, i) : e.insertBefore(r, t) : l && i.remove();
      } else a = !0;
    }
  } else e.insertBefore(r, t);
  return [r];
}
var en = /* @__PURE__ */ I("<div class=experiment-body><div class=experiment-demo></div><details class=experiment-source><summary>view source · </summary><pre class=experiment-code tabindex=0><code>");
const ie = (e) => (() => {
  var n = en(), t = n.firstChild, s = t.nextSibling, r = s.firstChild;
  r.firstChild;
  var a = r.nextSibling, o = a.firstChild;
  return y(t, () => e.children), y(r, () => e.sourceName, null), y(o, () => e.source), n;
})(), nn = (e, n) => {
  const t = e.toLowerCase(), s = n.toLowerCase();
  if (t.length === 0) return { score: 0, indexes: [] };
  const r = [];
  let a = 0, o = 0, i = 0;
  for (let l = 0; l < s.length && a < t.length; l++) {
    if (s[l] !== t[a]) {
      i = 0;
      continue;
    }
    i += 1;
    const d = l === 0 || s[l - 1] === " " || s[l - 1] === "/";
    o += i * 2 + (d ? 4 : 0), r.push(l), a += 1;
  }
  return a < t.length ? null : { score: o - Math.floor(s.length / 8), indexes: r };
};
var tn = /* @__PURE__ */ I('<button class="btn btn-secondary"type=button>Open the palette<kbd class=palette-kbd>K'), sn = /* @__PURE__ */ I("<li class=palette-empty>nothing matches “<!>” — try “work” or “lab”"), rn = /* @__PURE__ */ I('<div class=palette-backdrop><div class=palette role=dialog aria-modal=true aria-label="Site command palette"><input class=palette-input type=text placeholder="Where to? Try “design” or “waddl”…"aria-label="Search pages and sections"role=combobox aria-expanded=true aria-controls=palette-list><ul class=palette-list id=palette-list role=listbox></ul><div class=palette-footer aria-hidden=true><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> go</span><span><kbd>esc</kbd> close'), an = /* @__PURE__ */ I("<li class=palette-item role=option><span class=palette-label></span><span class=palette-hint>"), on = /* @__PURE__ */ I("<span>");
const ln = [{
  label: "Home",
  hint: "page",
  href: "/"
}, {
  label: "Research — how people think",
  hint: "section",
  href: "/#research"
}, {
  label: "Work — Cross Math & Waddl",
  hint: "section",
  href: "/#work"
}, {
  label: "Waddl case study",
  hint: "page",
  href: "/waddl"
}, {
  label: "The Lab",
  hint: "page",
  href: "/lab"
}, {
  label: "Design system",
  hint: "page",
  href: "/design"
}, {
  label: "Resume",
  hint: "page",
  href: "/resume"
}, {
  label: "Off the clock",
  hint: "section",
  href: "/#offclock"
}, {
  label: "Email Carissa",
  hint: "action",
  href: "mailto:carissaott0809@gmail.com"
}, {
  label: "GitHub",
  hint: "link",
  href: "https://github.com/carissamercedesott"
}, {
  label: "LinkedIn",
  hint: "link",
  href: "https://www.linkedin.com/in/carissa-ott"
}], cn = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, dn = () => /Mac|iPhone|iPad/.test(navigator.platform), un = () => {
  const [e, n] = D(!1), [t, s] = D(!1), [r, a] = D(""), [o, i] = D(0);
  let l, d, u = null;
  const c = j(() => {
    const p = r().trim();
    return ln.map((g) => ({
      item: g,
      match: nn(p, g.label)
    })).filter((g) => g.match !== null).sort((g, m) => m.match.score - g.match.score);
  });
  ye(() => {
    c(), i(0);
  });
  const w = () => {
    u = document.activeElement, a(""), s(!1), n(!0), queueMicrotask(() => l.focus());
  }, b = () => {
    e() && (cn() ? n(!1) : (s(!0), window.setTimeout(() => {
      n(!1), s(!1);
    }, 150)), u?.focus());
  }, h = (p) => {
    b(), window.location.assign(p.href);
  }, x = (p) => {
    (p.metaKey || p.ctrlKey) && p.key.toLowerCase() === "k" && (p.preventDefault(), e() ? b() : w());
  };
  We(() => document.addEventListener("keydown", x)), he(() => document.removeEventListener("keydown", x));
  const T = (p) => {
    const g = c().length;
    if (p.key === "Escape")
      p.preventDefault(), b();
    else if (p.key === "ArrowDown")
      p.preventDefault(), g > 0 && i((o() + 1) % g);
    else if (p.key === "ArrowUp")
      p.preventDefault(), g > 0 && i((o() - 1 + g) % g);
    else if (p.key === "Enter") {
      p.preventDefault();
      const m = c()[o()];
      m && h(m.item);
    } else p.key === "Tab" && p.preventDefault();
  };
  return ye(() => {
    d?.children[o()]?.scrollIntoView({
      block: "nearest"
    });
  }), [(() => {
    var p = tn(), g = p.firstChild, m = g.nextSibling, C = m.firstChild;
    return p.$$click = w, y(m, () => dn() ? "⌘" : "Ctrl+", C), p;
  })(), _(J, {
    get when() {
      return e();
    },
    get children() {
      var p = rn(), g = p.firstChild, m = g.firstChild, C = m.nextSibling;
      p.$$click = (k) => {
        k.target === k.currentTarget && b();
      }, m.$$keydown = T, m.$$input = (k) => a(k.currentTarget.value);
      var N = l;
      typeof N == "function" ? Ce(N, m) : l = m;
      var q = d;
      return typeof q == "function" ? Ce(q, C) : d = C, y(C, _(ee, {
        get each() {
          return c();
        },
        children: (k, R) => (() => {
          var f = an(), M = f.firstChild, S = M.nextSibling;
          return f.$$click = () => h(k.item), f.$$pointermove = () => i(R()), y(M, _(ee, {
            get each() {
              return k.item.label.split("");
            },
            children: (v, K) => (() => {
              var F = on();
              return y(F, v), L(() => F.classList.toggle("palette-hit", !!k.match.indexes.includes(K()))), F;
            })()
          })), y(S, () => k.item.hint), L((v) => {
            var K = R() === o(), F = `palette-item-${R()}`, V = R() === o();
            return K !== v.e && f.classList.toggle("is-active", v.e = K), F !== v.t && B(f, "id", v.t = F), V !== v.a && B(f, "aria-selected", v.a = V), v;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          }), f;
        })()
      }), null), y(C, _(J, {
        get when() {
          return c().length === 0;
        },
        get children() {
          var k = sn(), R = k.firstChild, f = R.nextSibling;
          return f.nextSibling, y(k, r, f), k;
        }
      }), null), L((k) => {
        var R = !!t(), f = c().length > 0 ? `palette-item-${o()}` : void 0;
        return R !== k.e && p.classList.toggle("is-leaving", k.e = R), f !== k.t && B(m, "aria-activedescendant", k.t = f), k;
      }, {
        e: void 0,
        t: void 0
      }), L(() => m.value = r()), p;
    }
  })];
};
se(["click", "input", "keydown", "pointermove"]);
var pn = /* @__PURE__ */ I('<div class=ghost-demo><div class=ghost-wrap><div class=ghost-underlay aria-hidden=true><span class=ghost-typed></span><span class=ghost-completion></span></div><input class=ghost-input type=text autocomplete=off aria-label="Ghost text demo input"aria-describedby=ghost-hint></div><p class=ghost-hint id=ghost-hint>try “inter…”, “tok…”, or “brown…” — <kbd>Tab</kbd> accepts, <kbd>Esc</kbd> dismisses</p><span class=visually-hidden role=status>');
const fn = ["interfaces that feel like instruments", "tokens over values", "cross math", "waddl", "canonical proportion as a phonological index", "brown butter is a statistically significant improvement", "warm pastels, crisp surfaces, soft motion"], hn = () => {
  const [e, n] = D(""), [t, s] = D(!1), r = j(() => {
    const i = e();
    if (t() || i.length === 0) return "";
    const l = fn.find((d) => d.startsWith(i.toLowerCase()) && d.length > i.length);
    return l ? l.slice(i.length) : "";
  }), a = () => {
    n(e() + r());
  }, o = (i) => {
    if (r() === "") return;
    const d = i.currentTarget.selectionStart === e().length;
    i.key === "Tab" || i.key === "ArrowRight" && d ? (i.preventDefault(), a()) : i.key === "Escape" && (i.preventDefault(), s(!0));
  };
  return (() => {
    var i = pn(), l = i.firstChild, d = l.firstChild, u = d.firstChild, c = u.nextSibling, w = d.nextSibling, b = l.nextSibling, h = b.nextSibling;
    return y(u, e), y(c, r), w.$$keydown = o, w.$$input = (x) => {
      s(!1), n(x.currentTarget.value);
    }, B(w, "spellcheck", !1), y(h, (() => {
      var x = ge(() => r() !== "");
      return () => x() ? `Suggestion: ${e()}${r()}. Press Tab to accept.` : "";
    })()), L(() => w.value = e()), i;
  })();
};
se(["input", "keydown"]);
var gn = /* @__PURE__ */ I('<div class=adiff><div class=adiff-toolbar><span class=adiff-file>tokens-refactor.ts</span><button class="btn btn-secondary btn-sm"type=button></button></div><pre class=adiff-code><code></code></pre><p class=adiff-caption aria-live=polite>'), mn = /* @__PURE__ */ I("<span><span class=adiff-gutter>");
const yn = [{
  kind: "ctx",
  text: "const elevate = (card: HTMLElement) => {"
}, {
  kind: "del",
  text: '  card.style.boxShadow = "0 12px 32px rgba(0,0,0,.12)";'
}, {
  kind: "del",
  text: '  card.style.transition = "box-shadow .25s ease";'
}, {
  kind: "add",
  text: '  card.style.boxShadow = "var(--shadow-lg)";'
}, {
  kind: "add",
  text: "  card.style.transition ="
}, {
  kind: "add",
  text: '    "box-shadow var(--duration-base) var(--ease-out)";'
}, {
  kind: "ctx",
  text: "};"
}], vn = () => {
  const [e, n] = D(!1), t = (s) => e() ? s.kind !== "del" : s.kind !== "add";
  return (() => {
    var s = gn(), r = s.firstChild, a = r.firstChild, o = a.nextSibling, i = r.nextSibling, l = i.firstChild, d = i.nextSibling;
    return o.$$click = () => n(!e()), y(o, () => e() ? "Show before" : "Apply the diff"), y(l, _(ee, {
      each: yn,
      children: (u, c) => (() => {
        var w = mn(), b = w.firstChild;
        return y(b, (() => {
          var h = ge(() => u.kind === "add");
          return () => h() ? "+" : u.kind === "del" ? "−" : " ";
        })()), y(w, () => u.text, null), L((h) => {
          var x = `adiff-line adiff-line-${u.kind}`, T = !t(u), p = String(c()), g = !t(u);
          return x !== h.e && Je(w, h.e = x), T !== h.t && w.classList.toggle("is-hidden", h.t = T), p !== h.a && ve(w, "--line-index", h.a = p), g !== h.o && B(w, "aria-hidden", h.o = g), h;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        }), w;
      })()
    })), y(d, () => e() ? "after — every value is a token" : "before — raw values, hand-tuned"), L(() => B(o, "aria-pressed", e())), s;
  })();
};
se(["click"]);
var wn = /* @__PURE__ */ I("<span class=stream-caret>"), bn = /* @__PURE__ */ I("<span class=stream-thinking-chip>thinking…"), xn = /* @__PURE__ */ I("<p class=stream-placeholder aria-hidden=true>press play to stream"), kn = /* @__PURE__ */ I('<div class=stream><div class=stream-stage><p class=visually-hidden></p><p class=stream-text aria-hidden=true></p></div><div class=stream-controls><button class="btn btn-secondary btn-sm"type=button></button><button class="btn btn-ghost btn-sm"type=button>Reset</button><label class=stream-speed><span>speed</span><input type=range min=3 max=24 step=1 aria-label="Streaming speed, words per second"><span class=stream-speed-value> w/s');
const Ke = "Streaming is pacing. Words arrive a few at a time, the cursor holds your place, and the pause before an answer ✦ reads as thought, not lag. Tune the speed below and feel how the same sentence changes character.", Q = Ke.split(" "), Sn = 1400, $n = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, Tn = () => {
  const [e, n] = D(0), [t, s] = D(!1), [r, a] = D(!1), [o, i] = D(9);
  let l;
  const d = () => {
    window.clearTimeout(l), s(!1), a(!1);
  }, u = () => e() >= Q.length, c = () => {
    if (e() >= Q.length) {
      d();
      return;
    }
    if (Q[e()] === "✦") {
      a(!0), n(e() + 1), l = window.setTimeout(() => {
        a(!1), c();
      }, Sn);
      return;
    }
    n(e() + 1), l = window.setTimeout(c, 1e3 / o());
  }, w = () => {
    if (u() && n(0), $n()) {
      n(Q.length);
      return;
    }
    s(!0), c();
  }, b = () => {
    window.clearTimeout(l), s(!1), a(!1);
  }, h = () => {
    d(), n(0);
  };
  he(d);
  const x = () => Q.slice(0, e()).filter((T) => T !== "✦").join(" ");
  return (() => {
    var T = kn(), p = T.firstChild, g = p.firstChild, m = g.nextSibling, C = p.nextSibling, N = C.firstChild, q = N.nextSibling, k = q.nextSibling, R = k.firstChild, f = R.nextSibling, M = f.nextSibling, S = M.firstChild;
    return y(g, () => Ke.replace(" ✦", "")), y(m, x, null), y(m, _(J, {
      get when() {
        return t() || !u() && e() > 0;
      },
      get children() {
        var v = wn();
        return L(() => v.classList.toggle("is-thinking", !!r())), v;
      }
    }), null), y(m, _(J, {
      get when() {
        return r();
      },
      get children() {
        return bn();
      }
    }), null), y(p, _(J, {
      get when() {
        return e() === 0;
      },
      get children() {
        return xn();
      }
    }), null), N.$$click = () => t() ? b() : w(), y(N, (() => {
      var v = ge(() => !!t());
      return () => v() ? "Pause" : u() ? "Replay" : "Play";
    })()), q.$$click = h, f.$$input = (v) => i(Number(v.currentTarget.value)), y(M, o, S), L(() => q.disabled = e() === 0), L(() => f.value = o()), T;
  })();
};
se(["click", "input"]);
var En = /* @__PURE__ */ I('<div class=toy><div class=toy-arena><div class=toy-card tabindex=0 aria-label="Motion toy card. Drag it, or push it with the arrow keys and it springs home."><span class=toy-card-title>drag me</span><span class=toy-card-sub>then let go</span></div></div><div class=toy-controls><fieldset class=toy-group><legend>easing</legend></fieldset><fieldset class=toy-group><legend>duration</legend></fieldset></div><p class=toy-readout aria-hidden=true><code>translate(<!>px, <!>px) · <!> · '), Cn = /* @__PURE__ */ I("<label class=toy-radio><input type=radio name=toy-easing><span>"), _n = /* @__PURE__ */ I("<label class=toy-radio><input type=radio name=toy-duration><span>--duration-");
const An = ["ease-out", "ease-in-out", "spring"], Mn = ["fast", "base", "slow"], Dn = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, Ln = () => {
  const [e, n] = D(0), [t, s] = D(0), [r, a] = D(!1), [o, i] = D(!1), [l, d] = D("ease-out"), [u, c] = D("base");
  let w = 0, b = 0, h = null, x = {
    x: 0,
    y: 0
  }, T = {
    t: 0,
    x: 0,
    y: 0
  };
  const p = () => {
    cancelAnimationFrame(w), i(!1);
  }, g = () => {
    i(!0);
    let f = e(), M = t(), S = x.x, v = x.y, K = performance.now();
    const F = (V) => {
      const U = Math.min((V - K) / 1e3, 0.03333333333333333);
      K = V;
      const ae = 16;
      if (S += (-170 * f - ae * S) * U, v += (-170 * M - ae * v) * U, f += S * U, M += v * U, Math.hypot(f, M) < 0.5 && Math.hypot(S, v) < 1) {
        n(0), s(0), i(!1);
        return;
      }
      n(f), s(M), w = requestAnimationFrame(F);
    };
    w = requestAnimationFrame(F);
  }, m = () => {
    if (Dn()) {
      n(0), s(0);
      return;
    }
    l() === "spring" ? g() : (n(0), s(0));
  }, C = (f) => {
    p(), f.currentTarget.setPointerCapture(f.pointerId), h = {
      px: f.clientX,
      py: f.clientY,
      x: e(),
      y: t()
    }, T = {
      t: performance.now(),
      x: e(),
      y: t()
    }, x = {
      x: 0,
      y: 0
    }, a(!0);
  }, N = (f) => {
    if (!h) return;
    const M = h.x + f.clientX - h.px, S = h.y + f.clientY - h.py, v = performance.now(), K = (v - T.t) / 1e3;
    K > 0 && (x = {
      x: (M - T.x) / K,
      y: (S - T.y) / K
    }, T = {
      t: v,
      x: M,
      y: S
    }), n(M), s(S);
  }, q = () => {
    h && (h = null, a(!1), m());
  }, k = (f) => {
    const v = {
      ArrowLeft: [-32, 0],
      ArrowRight: [32, 0],
      ArrowUp: [0, -32],
      ArrowDown: [0, 32]
    }[f.key];
    v ? (f.preventDefault(), p(), x = {
      x: v[0] * 6,
      y: v[1] * 6
    }, n(e() + v[0]), s(t() + v[1]), window.clearTimeout(b), b = window.setTimeout(m, 350)) : (f.key === "Enter" || f.key === " ") && (f.preventDefault(), p(), x = {
      x: 0,
      y: -240
    }, s(-48), window.clearTimeout(b), b = window.setTimeout(m, 60));
  };
  he(() => {
    cancelAnimationFrame(w), window.clearTimeout(b);
  });
  const R = () => r() || o() || l() === "spring" ? "none" : `transform var(--duration-${u()}) var(--ease-${l()})`;
  return (() => {
    var f = En(), M = f.firstChild, S = M.firstChild, v = M.nextSibling, K = v.firstChild;
    K.firstChild;
    var F = K.nextSibling;
    F.firstChild;
    var V = v.nextSibling, U = V.firstChild, ae = U.firstChild, xe = ae.nextSibling, Re = xe.nextSibling, ke = Re.nextSibling, Fe = ke.nextSibling, Se = Fe.nextSibling;
    return Se.nextSibling, S.$$keydown = k, S.addEventListener("pointercancel", q), S.$$pointerup = q, S.$$pointermove = N, S.$$pointerdown = C, y(K, _(ee, {
      each: An,
      children: ($) => (() => {
        var H = Cn(), O = H.firstChild, z = O.nextSibling;
        return O.$$input = () => d($), O.value = $, y(z, $ === "spring" ? "spring (rAF)" : `--ease-${$}`), L(() => O.checked = l() === $), H;
      })()
    }), null), y(F, _(ee, {
      each: Mn,
      children: ($) => (() => {
        var H = _n(), O = H.firstChild, z = O.nextSibling;
        return z.firstChild, O.$$input = () => c($), O.value = $, y(z, $, null), L(() => O.checked = u() === $), H;
      })()
    }), null), y(U, () => Math.round(e()), xe), y(U, () => Math.round(t()), ke), y(U, () => r() ? "--shadow-lg" : "--shadow-md", Se), y(U, (() => {
      var $ = ge(() => l() === "spring");
      return () => $() ? "spring k=170 c=16" : `--ease-${l()} / --duration-${u()}`;
    })(), null), L(($) => {
      var H = !!r(), O = `translate(${e()}px, ${t()}px)`, z = R(), $e = l() === "spring";
      return H !== $.e && S.classList.toggle("is-dragging", $.e = H), O !== $.t && ve(S, "transform", $.t = O), z !== $.a && ve(S, "transition", $.a = z), $e !== $.o && (F.disabled = $.o = $e), $;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), f;
  })();
};
se(["pointerdown", "pointermove", "pointerup", "keydown", "input"]);
const Pn = `import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { fuzzyMatch } from "./fuzzy";

type Item = { label: string; hint: string; href: string };

const ITEMS: Item[] = [
  { label: "Home", hint: "page", href: "/" },
  { label: "Research — how people think", hint: "section", href: "/#research" },
  { label: "Work — Cross Math & Waddl", hint: "section", href: "/#work" },
  { label: "Waddl case study", hint: "page", href: "/waddl" },
  { label: "The Lab", hint: "page", href: "/lab" },
  { label: "Design system", hint: "page", href: "/design" },
  { label: "Resume", hint: "page", href: "/resume" },
  { label: "Off the clock", hint: "section", href: "/#offclock" },
  { label: "Email Carissa", hint: "action", href: "mailto:carissaott0809@gmail.com" },
  { label: "GitHub", hint: "link", href: "https://github.com/carissamercedesott" },
  { label: "LinkedIn", hint: "link", href: "https://www.linkedin.com/in/carissa-ott" },
];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

export const CommandPalette = () => {
  const [open, setOpen] = createSignal(false);
  const [leaving, setLeaving] = createSignal(false);
  const [query, setQuery] = createSignal("");
  const [active, setActive] = createSignal(0);

  let inputEl!: HTMLInputElement;
  let listEl!: HTMLUListElement;
  let restoreFocus: HTMLElement | null = null;

  const results = createMemo(() => {
    const q = query().trim();
    return ITEMS.map((item) => ({ item, match: fuzzyMatch(q, item.label) }))
      .filter((r) => r.match !== null)
      .sort((a, b) => b.match!.score - a.match!.score);
  });

  createEffect(() => {
    results();
    setActive(0);
  });

  const openPalette = () => {
    restoreFocus = document.activeElement as HTMLElement | null;
    setQuery("");
    setLeaving(false);
    setOpen(true);
    queueMicrotask(() => inputEl.focus());
  };

  const closePalette = () => {
    if (!open()) return;
    if (reducedMotion()) {
      setOpen(false);
    } else {
      setLeaving(true);
      window.setTimeout(() => {
        setOpen(false);
        setLeaving(false);
      }, 150);
    }
    restoreFocus?.focus();
  };

  const navigateTo = (item: Item) => {
    closePalette();
    window.location.assign(item.href);
  };

  const onGlobalKey = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open() ? closePalette() : openPalette();
    }
  };

  onMount(() => document.addEventListener("keydown", onGlobalKey));
  onCleanup(() => document.removeEventListener("keydown", onGlobalKey));

  const onInputKey = (event: KeyboardEvent) => {
    const count = results().length;
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (count > 0) setActive((active() + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (count > 0) setActive((active() - 1 + count) % count);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const chosen = results()[active()];
      if (chosen) navigateTo(chosen.item);
    } else if (event.key === "Tab") {
      // The input is the palette's only tab stop; keep focus inside.
      event.preventDefault();
    }
  };

  // Keep the active row scrolled into view as arrows move it.
  createEffect(() => {
    const row = listEl?.children[active()] as HTMLElement | undefined;
    row?.scrollIntoView({ block: "nearest" });
  });

  return (
    <>
      <button class="btn btn-secondary" type="button" onClick={openPalette}>
        Open the palette
        <kbd class="palette-kbd">{isMac() ? "⌘" : "Ctrl+"}K</kbd>
      </button>

      <Show when={open()}>
        <div
          class="palette-backdrop"
          classList={{ "is-leaving": leaving() }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <div class="palette" role="dialog" aria-modal="true" aria-label="Site command palette">
            <input
              ref={inputEl}
              class="palette-input"
              type="text"
              placeholder="Where to? Try “design” or “waddl”…"
              aria-label="Search pages and sections"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results().length > 0 ? \`palette-item-\${active()}\` : undefined}
              value={query()}
              onInput={(event) => setQuery(event.currentTarget.value)}
              onKeyDown={onInputKey}
            />
            <ul class="palette-list" id="palette-list" role="listbox" ref={listEl}>
              <For each={results()}>
                {(result, index) => (
                  <li
                    class="palette-item"
                    classList={{ "is-active": index() === active() }}
                    id={\`palette-item-\${index()}\`}
                    role="option"
                    aria-selected={index() === active()}
                    onPointerMove={() => setActive(index())}
                    onClick={() => navigateTo(result.item)}
                  >
                    <span class="palette-label">
                      <For each={result.item.label.split("")}>
                        {(char, charIndex) => (
                          <span classList={{ "palette-hit": result.match!.indexes.includes(charIndex()) }}>
                            {char}
                          </span>
                        )}
                      </For>
                    </span>
                    <span class="palette-hint">{result.item.hint}</span>
                  </li>
                )}
              </For>
              <Show when={results().length === 0}>
                <li class="palette-empty">nothing matches “{query()}” — try “work” or “lab”</li>
              </Show>
            </ul>
            <div class="palette-footer" aria-hidden="true">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> go</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};
`, In = `export type FuzzyResult = { score: number; indexes: number[] };

// Subsequence fuzzy match: every query char must appear in order.
// Consecutive runs and word starts score higher; long targets score lower,
// so "des" ranks "Design system" above "Waddl case study".
export const fuzzyMatch = (query: string, target: string): FuzzyResult | null => {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (q.length === 0) return { score: 0, indexes: [] };

  const indexes: number[] = [];
  let qi = 0;
  let score = 0;
  let streak = 0;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] !== q[qi]) {
      streak = 0;
      continue;
    }
    streak += 1;
    const wordStart = ti === 0 || t[ti - 1] === " " || t[ti - 1] === "/";
    score += streak * 2 + (wordStart ? 4 : 0);
    indexes.push(ti);
    qi += 1;
  }

  if (qi < q.length) return null;
  return { score: score - Math.floor(t.length / 8), indexes };
};
`, Nn = `import { createMemo, createSignal } from "solid-js";

// Phrases from around this site — type a few letters and the rest appears
// as editor-style ghost text.
const CORPUS = [
  "interfaces that feel like instruments",
  "tokens over values",
  "cross math",
  "waddl",
  "canonical proportion as a phonological index",
  "brown butter is a statistically significant improvement",
  "warm pastels, crisp surfaces, soft motion",
];

export const GhostText = () => {
  const [value, setValue] = createSignal("");
  const [dismissed, setDismissed] = createSignal(false);

  const completion = createMemo(() => {
    const typed = value();
    if (dismissed() || typed.length === 0) return "";
    const hit = CORPUS.find(
      (phrase) => phrase.startsWith(typed.toLowerCase()) && phrase.length > typed.length
    );
    return hit ? hit.slice(typed.length) : "";
  });

  const accept = () => {
    setValue(value() + completion());
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (completion() === "") return;
    const input = event.currentTarget as HTMLInputElement;
    const caretAtEnd = input.selectionStart === value().length;
    if (event.key === "Tab" || (event.key === "ArrowRight" && caretAtEnd)) {
      event.preventDefault();
      accept();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setDismissed(true);
    }
  };

  return (
    <div class="ghost-demo">
      <div class="ghost-wrap">
        {/* The underlay mirrors the input's text invisibly, so the ghost
            continues exactly where the caret is. */}
        <div class="ghost-underlay" aria-hidden="true">
          <span class="ghost-typed">{value()}</span>
          <span class="ghost-completion">{completion()}</span>
        </div>
        <input
          class="ghost-input"
          type="text"
          spellcheck={false}
          autocomplete="off"
          aria-label="Ghost text demo input"
          aria-describedby="ghost-hint"
          value={value()}
          onInput={(event) => {
            setDismissed(false);
            setValue(event.currentTarget.value);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
      <p class="ghost-hint" id="ghost-hint">
        try “inter…”, “tok…”, or “brown…” — <kbd>Tab</kbd> accepts, <kbd>Esc</kbd> dismisses
      </p>
      <span class="visually-hidden" role="status">
        {completion() !== "" ? \`Suggestion: \${value()}\${completion()}. Press Tab to accept.\` : ""}
      </span>
    </div>
  );
};
`, Kn = `import { For, createSignal } from "solid-js";

type Kind = "ctx" | "del" | "add";
type Line = { text: string; kind: Kind };

// One tiny, on-message refactor: raw values become tokens.
const LINES: Line[] = [
  { kind: "ctx", text: "const elevate = (card: HTMLElement) => {" },
  { kind: "del", text: '  card.style.boxShadow = "0 12px 32px rgba(0,0,0,.12)";' },
  { kind: "del", text: '  card.style.transition = "box-shadow .25s ease";' },
  { kind: "add", text: '  card.style.boxShadow = "var(--shadow-lg)";' },
  { kind: "add", text: '  card.style.transition =' },
  { kind: "add", text: '    "box-shadow var(--duration-base) var(--ease-out)";' },
  { kind: "ctx", text: "};" },
];

export const AnimatedDiff = () => {
  const [after, setAfter] = createSignal(false);

  // A line is visible in the "before" state unless it's an addition, and
  // in the "after" state unless it's a removal.
  const isVisible = (line: Line) => (after() ? line.kind !== "del" : line.kind !== "add");

  return (
    <div class="adiff">
      <div class="adiff-toolbar">
        <span class="adiff-file">tokens-refactor.ts</span>
        <button
          class="btn btn-secondary btn-sm"
          type="button"
          aria-pressed={after()}
          onClick={() => setAfter(!after())}
        >
          {after() ? "Show before" : "Apply the diff"}
        </button>
      </div>
      <pre class="adiff-code"><code>
        <For each={LINES}>
          {(line, index) => (
            <span
              class={\`adiff-line adiff-line-\${line.kind}\`}
              classList={{ "is-hidden": !isVisible(line) }}
              style={{ "--line-index": String(index()) }}
              aria-hidden={!isVisible(line)}
            >
              <span class="adiff-gutter">
                {line.kind === "add" ? "+" : line.kind === "del" ? "−" : " "}
              </span>
              {line.text}
            </span>
          )}
        </For>
      </code></pre>
      <p class="adiff-caption" aria-live="polite">
        {after() ? "after — every value is a token" : "before — raw values, hand-tuned"}
      </p>
    </div>
  );
};
`, Rn = `import { Show, createSignal, onCleanup } from "solid-js";

// The demo text streams word-by-word; a ✦ marker triggers the "thinking"
// state mid-stream, the way an agent pauses before committing to an answer.
const TEXT =
  "Streaming is pacing. Words arrive a few at a time, the cursor holds your " +
  "place, and the pause before an answer ✦ reads as thought, not lag. Tune " +
  "the speed below and feel how the same sentence changes character.";

const WORDS = TEXT.split(" ");
const THINK_MS = 1400;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const StreamRenderer = () => {
  const [shown, setShown] = createSignal(0);
  const [playing, setPlaying] = createSignal(false);
  const [thinking, setThinking] = createSignal(false);
  const [wps, setWps] = createSignal(9);

  let timer: number | undefined;

  const stop = () => {
    window.clearTimeout(timer);
    setPlaying(false);
    setThinking(false);
  };

  const done = () => shown() >= WORDS.length;

  const tick = () => {
    if (shown() >= WORDS.length) {
      stop();
      return;
    }
    const next = WORDS[shown()];
    if (next === "✦") {
      // The marker itself is swallowed; it only buys a thinking pause.
      setThinking(true);
      setShown(shown() + 1);
      timer = window.setTimeout(() => {
        setThinking(false);
        tick();
      }, THINK_MS);
      return;
    }
    setShown(shown() + 1);
    timer = window.setTimeout(tick, 1000 / wps());
  };

  const play = () => {
    if (done()) setShown(0);
    if (reducedMotion()) {
      setShown(WORDS.length);
      return;
    }
    setPlaying(true);
    tick();
  };

  const pause = () => {
    window.clearTimeout(timer);
    setPlaying(false);
    setThinking(false);
  };

  const reset = () => {
    stop();
    setShown(0);
  };

  onCleanup(stop);

  const visibleText = () =>
    WORDS.slice(0, shown())
      .filter((word) => word !== "✦")
      .join(" ");

  return (
    <div class="stream">
      <div class="stream-stage">
        {/* Screen readers get the whole paragraph at once; the word-by-word
            performance is visual only. */}
        <p class="visually-hidden">{TEXT.replace(" ✦", "")}</p>
        <p class="stream-text" aria-hidden="true">
          {visibleText()}
          <Show when={playing() || (!done() && shown() > 0)}>
            <span class="stream-caret" classList={{ "is-thinking": thinking() }} />
          </Show>
          <Show when={thinking()}>
            <span class="stream-thinking-chip">thinking…</span>
          </Show>
        </p>
        <Show when={shown() === 0}>
          <p class="stream-placeholder" aria-hidden="true">press play to stream</p>
        </Show>
      </div>
      <div class="stream-controls">
        <button class="btn btn-secondary btn-sm" type="button" onClick={() => (playing() ? pause() : play())}>
          {playing() ? "Pause" : done() ? "Replay" : "Play"}
        </button>
        <button class="btn btn-ghost btn-sm" type="button" onClick={reset} disabled={shown() === 0}>
          Reset
        </button>
        <label class="stream-speed">
          <span>speed</span>
          <input
            type="range"
            min="3"
            max="24"
            step="1"
            value={wps()}
            aria-label="Streaming speed, words per second"
            onInput={(event) => setWps(Number(event.currentTarget.value))}
          />
          <span class="stream-speed-value">{wps()} w/s</span>
        </label>
      </div>
    </div>
  );
};
`, Fn = `import { For, createSignal, onCleanup } from "solid-js";

// Drag the card and let go: it returns home through the motion tokens, or
// through a real spring (rAF integration) for comparison. Keyboard: arrow
// keys shove it, Enter bounces it.
type Easing = "ease-out" | "ease-in-out" | "spring";
type Duration = "fast" | "base" | "slow";

const EASINGS: Easing[] = ["ease-out", "ease-in-out", "spring"];
const DURATIONS: Duration[] = ["fast", "base", "slow"];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const MotionToy = () => {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [dragging, setDragging] = createSignal(false);
  const [springing, setSpringing] = createSignal(false);
  const [easing, setEasing] = createSignal<Easing>("ease-out");
  const [duration, setDuration] = createSignal<Duration>("base");

  let raf = 0;
  let keyTimer = 0;
  let start: { px: number; py: number; x: number; y: number } | null = null;
  let velocity = { x: 0, y: 0 };
  let lastMove = { t: 0, x: 0, y: 0 };

  const stopSpring = () => {
    cancelAnimationFrame(raf);
    setSpringing(false);
  };

  const springHome = () => {
    setSpringing(true);
    let px = x();
    let py = y();
    let vx = velocity.x;
    let vy = velocity.y;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      // Critically-underdamped spring pulling toward the origin.
      const k = 170;
      const damping = 16;
      vx += (-k * px - damping * vx) * dt;
      vy += (-k * py - damping * vy) * dt;
      px += vx * dt;
      py += vy * dt;
      if (Math.hypot(px, py) < 0.5 && Math.hypot(vx, vy) < 1) {
        setX(0);
        setY(0);
        setSpringing(false);
        return;
      }
      setX(px);
      setY(py);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  const release = () => {
    if (reducedMotion()) {
      setX(0);
      setY(0);
      return;
    }
    if (easing() === "spring") {
      springHome();
    } else {
      // CSS transition (declared inline below) carries the card home.
      setX(0);
      setY(0);
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    stopSpring();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    start = { px: event.clientX, py: event.clientY, x: x(), y: y() };
    lastMove = { t: performance.now(), x: x(), y: y() };
    velocity = { x: 0, y: 0 };
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!start) return;
    const nx = start.x + event.clientX - start.px;
    const ny = start.y + event.clientY - start.py;
    const now = performance.now();
    const dt = (now - lastMove.t) / 1000;
    if (dt > 0) {
      velocity = { x: (nx - lastMove.x) / dt, y: (ny - lastMove.y) / dt };
      lastMove = { t: now, x: nx, y: ny };
    }
    setX(nx);
    setY(ny);
  };

  const onPointerUp = () => {
    if (!start) return;
    start = null;
    setDragging(false);
    release();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const push = 32;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-push, 0],
      ArrowRight: [push, 0],
      ArrowUp: [0, -push],
      ArrowDown: [0, push],
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      stopSpring();
      velocity = { x: move[0] * 6, y: move[1] * 6 };
      setX(x() + move[0]);
      setY(y() + move[1]);
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(release, 350);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      stopSpring();
      velocity = { x: 0, y: -240 };
      setY(-48);
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(release, 60);
    }
  };

  onCleanup(() => {
    cancelAnimationFrame(raf);
    window.clearTimeout(keyTimer);
  });

  const transition = () => {
    if (dragging() || springing() || easing() === "spring") return "none";
    return \`transform var(--duration-\${duration()}) var(--ease-\${easing()})\`;
  };

  return (
    <div class="toy">
      <div class="toy-arena">
        <div
          class="toy-card"
          classList={{ "is-dragging": dragging() }}
          tabindex="0"
          aria-label="Motion toy card. Drag it, or push it with the arrow keys and it springs home."
          style={{
            transform: \`translate(\${x()}px, \${y()}px)\`,
            transition: transition(),
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <span class="toy-card-title">drag me</span>
          <span class="toy-card-sub">then let go</span>
        </div>
      </div>
      <div class="toy-controls">
        <fieldset class="toy-group">
          <legend>easing</legend>
          <For each={EASINGS}>
            {(option) => (
              <label class="toy-radio">
                <input
                  type="radio"
                  name="toy-easing"
                  value={option}
                  checked={easing() === option}
                  onInput={() => setEasing(option)}
                />
                <span>{option === "spring" ? "spring (rAF)" : \`--ease-\${option}\`}</span>
              </label>
            )}
          </For>
        </fieldset>
        <fieldset class="toy-group" disabled={easing() === "spring"}>
          <legend>duration</legend>
          <For each={DURATIONS}>
            {(option) => (
              <label class="toy-radio">
                <input
                  type="radio"
                  name="toy-duration"
                  value={option}
                  checked={duration() === option}
                  onInput={() => setDuration(option)}
                />
                <span>--duration-{option}</span>
              </label>
            )}
          </For>
        </fieldset>
      </div>
      <p class="toy-readout" aria-hidden="true">
        <code>
          translate({Math.round(x())}px, {Math.round(y())}px) ·{" "}
          {dragging() ? "--shadow-lg" : "--shadow-md"} ·{" "}
          {easing() === "spring" ? "spring k=170 c=16" : \`--ease-\${easing()} / --duration-\${duration()}\`}
        </code>
      </p>
    </div>
  );
};
`, re = (e, n) => {
  const t = document.getElementById(e);
  t && Qe(n, t);
};
re("exp-palette", () => _(ie, {
  source: `${Pn}

// fuzzy.ts
${In}`,
  sourceName: "CommandPalette.tsx",
  get children() {
    return _(un, {});
  }
}));
re("exp-ghost", () => _(ie, {
  source: Nn,
  sourceName: "GhostText.tsx",
  get children() {
    return _(hn, {});
  }
}));
re("exp-diff", () => _(ie, {
  source: Kn,
  sourceName: "AnimatedDiff.tsx",
  get children() {
    return _(vn, {});
  }
}));
re("exp-stream", () => _(ie, {
  source: Rn,
  sourceName: "StreamRenderer.tsx",
  get children() {
    return _(Tn, {});
  }
}));
re("exp-toy", () => _(ie, {
  source: Fn,
  sourceName: "MotionToy.tsx",
  get children() {
    return _(Ln, {});
  }
}));
