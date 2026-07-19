const Fe = (e, t) => e === t, Ke = Symbol("solid-track"), de = {
  equals: Fe
};
let Me = Le;
const q = 1, ue = 2, Ne = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var N = null;
let ge = null, We = null, C = null, L = null, W = null, me = 0;
function ce(e, t) {
  const n = C, s = N, r = e.length === 0, o = t === void 0 ? s : t, a = r ? Ne : {
    owned: null,
    cleanups: null,
    context: o ? o.context : null,
    owner: o
  }, i = r ? e : () => e(() => U(() => ne(a)));
  N = a, C = null;
  try {
    return oe(i, !0);
  } finally {
    C = n, N = s;
  }
}
function M(e, t) {
  t = t ? Object.assign({}, de, t) : de;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, s = (r) => (typeof r == "function" && (r = r(n.value)), De(n, r));
  return [_e.bind(n), s];
}
function D(e, t, n) {
  const s = ke(e, t, !1, q);
  re(s);
}
function ye(e, t, n) {
  Me = qe;
  const s = ke(e, t, !1, q);
  s.user = !0, W ? W.push(s) : re(s);
}
function X(e, t, n) {
  n = n ? Object.assign({}, de, n) : de;
  const s = ke(e, t, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = n.equals || void 0, re(s), _e.bind(s);
}
function U(e) {
  if (C === null) return e();
  const t = C;
  C = null;
  try {
    return e();
  } finally {
    C = t;
  }
}
function Pe(e) {
  ye(() => U(e));
}
function ie(e) {
  return N === null || (N.cleanups === null ? N.cleanups = [e] : N.cleanups.push(e)), e;
}
function _e() {
  if (this.sources && this.state)
    if (this.state === q) re(this);
    else {
      const e = L;
      L = null, oe(() => he(this), !1), L = e;
    }
  if (C) {
    const e = this.observers;
    if (!e || e[e.length - 1] !== C) {
      const t = e ? e.length : 0;
      C.sources ? (C.sources.push(this), C.sourceSlots.push(t)) : (C.sources = [this], C.sourceSlots = [t]), e ? (e.push(C), this.observerSlots.push(C.sources.length - 1)) : (this.observers = [C], this.observerSlots = [C.sources.length - 1]);
    }
  }
  return this.value;
}
function De(e, t, n) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, t)) && (e.value = t, e.observers && e.observers.length && oe(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const o = e.observers[r], a = ge && ge.running;
      a && ge.disposed.has(o), (a ? !o.tState : !o.state) && (o.pure ? L.push(o) : W.push(o), o.observers && Oe(o)), a || (o.state = q);
    }
    if (L.length > 1e6)
      throw L = [], new Error();
  }, !1)), t;
}
function re(e) {
  if (!e.fn) return;
  ne(e);
  const t = me;
  ze(e, e.value, t);
}
function ze(e, t, n) {
  let s;
  const r = N, o = C;
  C = N = e;
  try {
    s = e.fn(t);
  } catch (a) {
    return e.pure && (e.state = q, e.owned && e.owned.forEach(ne), e.owned = null), e.updatedAt = n + 1, Re(a);
  } finally {
    C = o, N = r;
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? De(e, s) : e.value = s, e.updatedAt = n);
}
function ke(e, t, n, s = q, r) {
  const o = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: N,
    context: N ? N.context : null,
    pure: n
  };
  return N === null || N !== Ne && (N.owned ? N.owned.push(o) : N.owned = [o]), o;
}
function pe(e) {
  if (e.state === 0) return;
  if (e.state === ue) return he(e);
  if (e.suspense && U(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < me); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (e = t[n], e.state === q)
      re(e);
    else if (e.state === ue) {
      const s = L;
      L = null, oe(() => he(e, t[0]), !1), L = s;
    }
}
function oe(e, t) {
  if (L) return e();
  let n = !1;
  t || (L = []), W ? n = !0 : W = [], me++;
  try {
    const s = e();
    return Ue(n), s;
  } catch (s) {
    n || (W = null), L = null, Re(s);
  }
}
function Ue(e) {
  if (L && (Le(L), L = null), e) return;
  const t = W;
  W = null, t.length && oe(() => Me(t), !1);
}
function Le(e) {
  for (let t = 0; t < e.length; t++) pe(e[t]);
}
function qe(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? e[n++] = s : pe(s);
  }
  for (t = 0; t < n; t++) pe(e[t]);
}
function he(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    if (s.sources) {
      const r = s.state;
      r === q ? s !== t && (!s.updatedAt || s.updatedAt < me) && pe(s) : r === ue && he(s, t);
    }
  }
}
function Oe(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = ue, n.pure ? L.push(n) : W.push(n), n.observers && Oe(n));
  }
}
function ne(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), s = e.sourceSlots.pop(), r = n.observers;
      if (r && r.length) {
        const o = r.pop(), a = n.observerSlots.pop();
        s < r.length && (o.sourceSlots[a] = s, r[s] = o, n.observerSlots[s] = a);
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) ne(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) ne(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Ve(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function Re(e, t = N) {
  throw Ve(e);
}
const Ge = Symbol("fallback");
function Te(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Xe(e, t, n = {}) {
  let s = [], r = [], o = [], a = 0, i = t.length > 1 ? [] : null;
  return ie(() => Te(o)), () => {
    let l = e() || [], d = l.length, u, c;
    return l[Ke], U(() => {
      let v, f, k, x, p, g, y, A, O;
      if (d === 0)
        a !== 0 && (Te(o), o = [], s = [], r = [], a = 0, i && (i = [])), n.fallback && (s = [Ge], r[0] = ce((F) => (o[0] = F, n.fallback())), a = 1);
      else if (a === 0) {
        for (r = new Array(d), c = 0; c < d; c++)
          s[c] = l[c], r[c] = ce(b);
        a = d;
      } else {
        for (k = new Array(d), x = new Array(d), i && (p = new Array(d)), g = 0, y = Math.min(a, d); g < y && s[g] === l[g]; g++) ;
        for (y = a - 1, A = d - 1; y >= g && A >= g && s[y] === l[A]; y--, A--)
          k[A] = r[y], x[A] = o[y], i && (p[A] = i[y]);
        for (v = /* @__PURE__ */ new Map(), f = new Array(A + 1), c = A; c >= g; c--)
          O = l[c], u = v.get(O), f[c] = u === void 0 ? -1 : u, v.set(O, c);
        for (u = g; u <= y; u++)
          O = s[u], c = v.get(O), c !== void 0 && c !== -1 ? (k[c] = r[u], x[c] = o[u], i && (p[c] = i[u]), c = f[c], v.set(O, c)) : o[u]();
        for (c = g; c < d; c++)
          c in k ? (r[c] = k[c], o[c] = x[c], i && (i[c] = p[c], i[c](c))) : r[c] = ce(b);
        r = r.slice(0, a = d), s = l.slice(0);
      }
      return r;
    });
    function b(v) {
      if (o[c] = v, i) {
        const [f, k] = M(c);
        return i[c] = k, t(l[c], f);
      }
      return t(l[c]);
    }
  };
}
function E(e, t) {
  return U(() => e(t || {}));
}
const je = (e) => `Stale read from <${e}>.`;
function se(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return X(Xe(() => e.each, e.children, t || void 0));
}
function Y(e) {
  const t = e.keyed, n = X(() => e.when, void 0, void 0), s = t ? n : X(n, void 0, {
    equals: (r, o) => !r == !o
  });
  return X(() => {
    const r = s();
    if (r) {
      const o = e.children;
      return typeof o == "function" && o.length > 0 ? U(() => o(t ? r : () => {
        if (!U(s)) throw je("Show");
        return n();
      })) : o;
    }
    return e.fallback;
  }, void 0, void 0);
}
const ae = (e) => X(() => e());
function Ye(e, t, n) {
  let s = n.length, r = t.length, o = s, a = 0, i = 0, l = t[r - 1].nextSibling, d = null;
  for (; a < r || i < o; ) {
    if (t[a] === n[i]) {
      a++, i++;
      continue;
    }
    for (; t[r - 1] === n[o - 1]; )
      r--, o--;
    if (r === a) {
      const u = o < s ? i ? n[i - 1].nextSibling : n[o - i] : l;
      for (; i < o; ) e.insertBefore(n[i++], u);
    } else if (o === i)
      for (; a < r; )
        (!d || !d.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === n[o - 1] && n[i] === t[r - 1]) {
      const u = t[--r].nextSibling;
      e.insertBefore(n[i++], t[a++].nextSibling), e.insertBefore(n[--o], u), t[r] = n[o];
    } else {
      if (!d) {
        d = /* @__PURE__ */ new Map();
        let c = i;
        for (; c < o; ) d.set(n[c], c++);
      }
      const u = d.get(t[a]);
      if (u != null)
        if (i < u && u < o) {
          let c = a, b = 1, v;
          for (; ++c < r && c < o && !((v = d.get(t[c])) == null || v !== u + b); )
            b++;
          if (b > u - i) {
            const f = t[a];
            for (; i < u; ) e.insertBefore(n[i++], f);
          } else e.replaceChild(n[i++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const Ce = "_$DX_DELEGATE";
function Qe(e, t, n, s = {}) {
  let r;
  return ce((o) => {
    r = o, t === document ? e() : m(t, e(), t.firstChild ? null : void 0, n);
  }, s.owner), () => {
    r(), t.textContent = "";
  };
}
function _(e, t, n, s) {
  let r;
  const o = () => {
    const i = document.createElement("template");
    return i.innerHTML = e, i.content.firstChild;
  }, a = () => (r || (r = o())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function J(e, t = window.document) {
  const n = t[Ce] || (t[Ce] = /* @__PURE__ */ new Set());
  for (let s = 0, r = e.length; s < r; s++) {
    const o = e[s];
    n.has(o) || (n.add(o), t.addEventListener(o, Ze));
  }
}
function Q(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Je(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function we(e, t, n) {
  n != null ? e.style.setProperty(t, n) : e.style.removeProperty(t);
}
function be(e, t, n) {
  return U(() => e(t, n));
}
function m(e, t, n, s) {
  if (n !== void 0 && !s && (s = []), typeof t != "function") return fe(e, t, s, n);
  D((r) => fe(e, t(), r, n), s);
}
function Ze(e) {
  let t = e.target;
  const n = `$$${e.type}`, s = e.target, r = e.currentTarget, o = (l) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: l
  }), a = () => {
    const l = t[n];
    if (l && !t.disabled) {
      const d = t[`${n}Data`];
      if (d !== void 0 ? l.call(t, d, e) : l.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && o(t.host), !0;
  }, i = () => {
    for (; a() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), e.composedPath) {
    const l = e.composedPath();
    o(l[0]);
    for (let d = 0; d < l.length - 2 && (t = l[d], !!a()); d++) {
      if (t._$host) {
        t = t._$host, i();
        break;
      }
      if (t.parentNode === r)
        break;
    }
  } else i();
  o(s);
}
function fe(e, t, n, s, r) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const o = typeof t, a = s !== void 0;
  if (e = a && n[0] && n[0].parentNode || e, o === "string" || o === "number") {
    if (o === "number" && (t = t.toString(), t === n))
      return n;
    if (a) {
      let i = n[0];
      i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = j(e, n, s, i);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || o === "boolean")
    n = j(e, n, s);
  else {
    if (o === "function")
      return D(() => {
        let i = t();
        for (; typeof i == "function"; ) i = i();
        n = fe(e, i, n, s);
      }), () => n;
    if (Array.isArray(t)) {
      const i = [], l = n && Array.isArray(n);
      if (ve(i, t, n, r))
        return D(() => n = fe(e, i, n, s, !0)), () => n;
      if (i.length === 0) {
        if (n = j(e, n, s), a) return n;
      } else l ? n.length === 0 ? Ae(e, i, s) : Ye(e, n, i) : (n && j(e), Ae(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (a) return n = j(e, n, s, t);
        j(e, n, null, t);
      } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function ve(e, t, n, s) {
  let r = !1;
  for (let o = 0, a = t.length; o < a; o++) {
    let i = t[o], l = n && n[e.length], d;
    if (!(i == null || i === !0 || i === !1)) if ((d = typeof i) == "object" && i.nodeType)
      e.push(i);
    else if (Array.isArray(i))
      r = ve(e, i, l) || r;
    else if (d === "function")
      if (s) {
        for (; typeof i == "function"; ) i = i();
        r = ve(e, Array.isArray(i) ? i : [i], Array.isArray(l) ? l : [l]) || r;
      } else
        e.push(i), r = !0;
    else {
      const u = String(i);
      l && l.nodeType === 3 && l.data === u ? e.push(l) : e.push(document.createTextNode(u));
    }
  }
  return r;
}
function Ae(e, t, n = null) {
  for (let s = 0, r = t.length; s < r; s++) e.insertBefore(t[s], n);
}
function j(e, t, n, s) {
  if (n === void 0) return e.textContent = "";
  const r = s || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let a = t.length - 1; a >= 0; a--) {
      const i = t[a];
      if (r !== i) {
        const l = i.parentNode === e;
        !o && !a ? l ? e.replaceChild(r, i) : e.insertBefore(r, n) : l && i.remove();
      } else o = !0;
    }
  } else e.insertBefore(r, n);
  return [r];
}
var et = /* @__PURE__ */ _("<div class=experiment-body><div class=experiment-demo></div><details class=experiment-source><summary>view source · </summary><pre class=experiment-code tabindex=0><code>");
const Z = (e) => (() => {
  var t = et(), n = t.firstChild, s = n.nextSibling, r = s.firstChild;
  r.firstChild;
  var o = r.nextSibling, a = o.firstChild;
  return m(n, () => e.children), m(r, () => e.sourceName, null), m(a, () => e.source), t;
})(), tt = (e, t) => {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (n.length === 0) return { score: 0, indexes: [] };
  const r = [];
  let o = 0, a = 0, i = 0;
  for (let l = 0; l < s.length && o < n.length; l++) {
    if (s[l] !== n[o]) {
      i = 0;
      continue;
    }
    i += 1;
    const d = l === 0 || s[l - 1] === " " || s[l - 1] === "/";
    a += i * 2 + (d ? 4 : 0), r.push(l), o += 1;
  }
  return o < n.length ? null : { score: a - Math.floor(s.length / 8), indexes: r };
};
var nt = /* @__PURE__ */ _('<button class="btn btn-secondary"type=button>Open the palette<kbd class=palette-kbd>K'), st = /* @__PURE__ */ _("<li class=palette-empty>nothing matches “<!>” — try “work” or “lab”"), it = /* @__PURE__ */ _('<div class=palette-backdrop><div class=palette role=dialog aria-modal=true aria-label="Site command palette"><input class=palette-input type=text placeholder="Where to? Try “design” or “waddl”…"aria-label="Search pages and sections"role=combobox aria-expanded=true aria-controls=palette-list><ul class=palette-list id=palette-list role=listbox></ul><div class=palette-footer aria-hidden=true><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> go</span><span><kbd>esc</kbd> close'), rt = /* @__PURE__ */ _("<li class=palette-item role=option><span class=palette-label></span><span class=palette-hint>"), ot = /* @__PURE__ */ _("<span>");
const at = [{
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
}], lt = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, ct = () => /Mac|iPhone|iPad/.test(navigator.platform), dt = () => {
  const [e, t] = M(!1), [n, s] = M(!1), [r, o] = M(""), [a, i] = M(0);
  let l, d, u = null;
  const c = X(() => {
    const p = r().trim();
    return at.map((g) => ({
      item: g,
      match: tt(p, g.label)
    })).filter((g) => g.match !== null).sort((g, y) => y.match.score - g.match.score);
  });
  ye(() => {
    c(), i(0);
  });
  const b = () => {
    u = document.activeElement, o(""), s(!1), t(!0), queueMicrotask(() => l.focus());
  }, v = () => {
    e() && (lt() ? t(!1) : (s(!0), window.setTimeout(() => {
      t(!1), s(!1);
    }, 150)), u?.focus());
  }, f = (p) => {
    v(), window.location.assign(p.href);
  }, k = (p) => {
    (p.metaKey || p.ctrlKey) && p.key.toLowerCase() === "k" && (p.preventDefault(), e() ? v() : b());
  };
  Pe(() => document.addEventListener("keydown", k)), ie(() => document.removeEventListener("keydown", k));
  const x = (p) => {
    const g = c().length;
    if (p.key === "Escape")
      p.preventDefault(), v();
    else if (p.key === "ArrowDown")
      p.preventDefault(), g > 0 && i((a() + 1) % g);
    else if (p.key === "ArrowUp")
      p.preventDefault(), g > 0 && i((a() - 1 + g) % g);
    else if (p.key === "Enter") {
      p.preventDefault();
      const y = c()[a()];
      y && f(y.item);
    } else p.key === "Tab" && p.preventDefault();
  };
  return ye(() => {
    d?.children[a()]?.scrollIntoView({
      block: "nearest"
    });
  }), [(() => {
    var p = nt(), g = p.firstChild, y = g.nextSibling, A = y.firstChild;
    return p.$$click = b, m(y, () => ct() ? "⌘" : "Ctrl+", A), p;
  })(), E(Y, {
    get when() {
      return e();
    },
    get children() {
      var p = it(), g = p.firstChild, y = g.firstChild, A = y.nextSibling;
      p.$$click = (S) => {
        S.target === S.currentTarget && v();
      }, y.$$keydown = x, y.$$input = (S) => o(S.currentTarget.value);
      var O = l;
      typeof O == "function" ? be(O, y) : l = y;
      var F = d;
      return typeof F == "function" ? be(F, A) : d = A, m(A, E(se, {
        get each() {
          return c();
        },
        children: (S, I) => (() => {
          var h = rt(), P = h.firstChild, $ = P.nextSibling;
          return h.$$click = () => f(S.item), h.$$pointermove = () => i(I()), m(P, E(se, {
            get each() {
              return S.item.label.split("");
            },
            children: (w, R) => (() => {
              var B = ot();
              return m(B, w), D(() => B.classList.toggle("palette-hit", !!S.match.indexes.includes(R()))), B;
            })()
          })), m($, () => S.item.hint), D((w) => {
            var R = I() === a(), B = `palette-item-${I()}`, V = I() === a();
            return R !== w.e && h.classList.toggle("is-active", w.e = R), B !== w.t && Q(h, "id", w.t = B), V !== w.a && Q(h, "aria-selected", w.a = V), w;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          }), h;
        })()
      }), null), m(A, E(Y, {
        get when() {
          return c().length === 0;
        },
        get children() {
          var S = st(), I = S.firstChild, h = I.nextSibling;
          return h.nextSibling, m(S, r, h), S;
        }
      }), null), D((S) => {
        var I = !!n(), h = c().length > 0 ? `palette-item-${a()}` : void 0;
        return I !== S.e && p.classList.toggle("is-leaving", S.e = I), h !== S.t && Q(y, "aria-activedescendant", S.t = h), S;
      }, {
        e: void 0,
        t: void 0
      }), D(() => y.value = r()), p;
    }
  })];
};
J(["click", "input", "keydown", "pointermove"]);
var ut = /* @__PURE__ */ _('<div class=ghost-demo><div class=ghost-wrap><div class=ghost-underlay aria-hidden=true><span class=ghost-typed></span><span class=ghost-completion></span></div><input class=ghost-input type=text autocomplete=off aria-label="Ghost text demo input"aria-describedby=ghost-hint></div><p class=ghost-hint id=ghost-hint>try “inter…”, “tok…”, or “brown…” — <kbd>Tab</kbd> accepts, <kbd>Esc</kbd> dismisses</p><span class=visually-hidden role=status>');
const pt = ["interfaces that feel like instruments", "tokens over values", "cross math", "waddl", "canonical proportion as a phonological index", "brown butter is a statistically significant improvement", "warm pastels, crisp surfaces, soft motion"], ht = () => {
  const [e, t] = M(""), [n, s] = M(!1), r = X(() => {
    const i = e();
    if (n() || i.length === 0) return "";
    const l = pt.find((d) => d.startsWith(i.toLowerCase()) && d.length > i.length);
    return l ? l.slice(i.length) : "";
  }), o = () => {
    t(e() + r());
  }, a = (i) => {
    if (r() === "") return;
    const d = i.currentTarget.selectionStart === e().length;
    i.key === "Tab" || i.key === "ArrowRight" && d ? (i.preventDefault(), o()) : i.key === "Escape" && (i.preventDefault(), s(!0));
  };
  return (() => {
    var i = ut(), l = i.firstChild, d = l.firstChild, u = d.firstChild, c = u.nextSibling, b = d.nextSibling, v = l.nextSibling, f = v.nextSibling;
    return m(u, e), m(c, r), b.$$keydown = a, b.$$input = (k) => {
      s(!1), t(k.currentTarget.value);
    }, Q(b, "spellcheck", !1), m(f, (() => {
      var k = ae(() => r() !== "");
      return () => k() ? `Suggestion: ${e()}${r()}. Press Tab to accept.` : "";
    })()), D(() => b.value = e()), i;
  })();
};
J(["input", "keydown"]);
var ft = /* @__PURE__ */ _('<div class=adiff><div class=adiff-toolbar><span class=adiff-file>tokens-refactor.ts</span><button class="btn btn-secondary btn-sm"type=button></button></div><pre class=adiff-code><code></code></pre><p class=adiff-caption aria-live=polite>'), mt = /* @__PURE__ */ _("<span><span class=adiff-gutter>");
const gt = [{
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
}], yt = () => {
  const [e, t] = M(!1), n = (s) => e() ? s.kind !== "del" : s.kind !== "add";
  return (() => {
    var s = ft(), r = s.firstChild, o = r.firstChild, a = o.nextSibling, i = r.nextSibling, l = i.firstChild, d = i.nextSibling;
    return a.$$click = () => t(!e()), m(a, () => e() ? "Show before" : "Apply the diff"), m(l, E(se, {
      each: gt,
      children: (u, c) => (() => {
        var b = mt(), v = b.firstChild;
        return m(v, (() => {
          var f = ae(() => u.kind === "add");
          return () => f() ? "+" : u.kind === "del" ? "−" : " ";
        })()), m(b, () => u.text, null), D((f) => {
          var k = `adiff-line adiff-line-${u.kind}`, x = !n(u), p = String(c()), g = !n(u);
          return k !== f.e && Je(b, f.e = k), x !== f.t && b.classList.toggle("is-hidden", f.t = x), p !== f.a && we(b, "--line-index", f.a = p), g !== f.o && Q(b, "aria-hidden", f.o = g), f;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        }), b;
      })()
    })), m(d, () => e() ? "after — every value is a token" : "before — raw values, hand-tuned"), D(() => Q(a, "aria-pressed", e())), s;
  })();
};
J(["click"]);
var wt = /* @__PURE__ */ _("<span class=stream-caret>"), bt = /* @__PURE__ */ _("<span class=stream-thinking-chip>thinking…"), vt = /* @__PURE__ */ _("<p class=stream-placeholder aria-hidden=true>press play to stream"), kt = /* @__PURE__ */ _('<div class=stream><div class=stream-stage><p class=visually-hidden></p><p class=stream-text aria-hidden=true></p></div><div class=stream-controls><button class="btn btn-secondary btn-sm"type=button></button><button class="btn btn-ghost btn-sm"type=button>Reset</button><label class=stream-speed><span>speed</span><input type=range min=3 max=24 step=1 aria-label="Streaming speed, words per second"><span class=stream-speed-value> w/s');
const Ie = "Streaming is pacing. Words arrive a few at a time, the cursor holds your place, and the pause before an answer ✦ reads as thought, not lag. Tune the speed below and feel how the same sentence changes character.", te = Ie.split(" "), xt = 1400, St = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, Et = () => {
  const [e, t] = M(0), [n, s] = M(!1), [r, o] = M(!1), [a, i] = M(9);
  let l;
  const d = () => {
    window.clearTimeout(l), s(!1), o(!1);
  }, u = () => e() >= te.length, c = () => {
    if (e() >= te.length) {
      d();
      return;
    }
    if (te[e()] === "✦") {
      o(!0), t(e() + 1), l = window.setTimeout(() => {
        o(!1), c();
      }, xt);
      return;
    }
    t(e() + 1), l = window.setTimeout(c, 1e3 / a());
  }, b = () => {
    if (u() && t(0), St()) {
      t(te.length);
      return;
    }
    s(!0), c();
  }, v = () => {
    window.clearTimeout(l), s(!1), o(!1);
  }, f = () => {
    d(), t(0);
  };
  ie(d);
  const k = () => te.slice(0, e()).filter((x) => x !== "✦").join(" ");
  return (() => {
    var x = kt(), p = x.firstChild, g = p.firstChild, y = g.nextSibling, A = p.nextSibling, O = A.firstChild, F = O.nextSibling, S = F.nextSibling, I = S.firstChild, h = I.nextSibling, P = h.nextSibling, $ = P.firstChild;
    return m(g, () => Ie.replace(" ✦", "")), m(y, k, null), m(y, E(Y, {
      get when() {
        return n() || !u() && e() > 0;
      },
      get children() {
        var w = wt();
        return D(() => w.classList.toggle("is-thinking", !!r())), w;
      }
    }), null), m(y, E(Y, {
      get when() {
        return r();
      },
      get children() {
        return bt();
      }
    }), null), m(p, E(Y, {
      get when() {
        return e() === 0;
      },
      get children() {
        return vt();
      }
    }), null), O.$$click = () => n() ? v() : b(), m(O, (() => {
      var w = ae(() => !!n());
      return () => w() ? "Pause" : u() ? "Replay" : "Play";
    })()), F.$$click = f, h.$$input = (w) => i(Number(w.currentTarget.value)), m(P, a, $), D(() => F.disabled = e() === 0), D(() => h.value = a()), x;
  })();
};
J(["click", "input"]);
var $t = /* @__PURE__ */ _('<div class=toy><div class=toy-arena><div class=toy-card tabindex=0 aria-label="Motion toy card. Drag it, or push it with the arrow keys and it springs home."><span class=toy-card-title>drag me</span><span class=toy-card-sub>then let go</span></div></div><div class=toy-controls><fieldset class=toy-group><legend>easing</legend></fieldset><fieldset class=toy-group><legend>duration</legend></fieldset></div><p class=toy-readout aria-hidden=true><code>translate(<!>px, <!>px) · <!> · '), Tt = /* @__PURE__ */ _("<label class=toy-radio><input type=radio name=toy-easing><span>"), Ct = /* @__PURE__ */ _("<label class=toy-radio><input type=radio name=toy-duration><span>--duration-");
const At = ["ease-out", "ease-in-out", "spring"], Mt = ["fast", "base", "slow"], Nt = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, Pt = () => {
  const [e, t] = M(0), [n, s] = M(0), [r, o] = M(!1), [a, i] = M(!1), [l, d] = M("ease-out"), [u, c] = M("base");
  let b = 0, v = 0, f = null, k = {
    x: 0,
    y: 0
  }, x = {
    t: 0,
    x: 0,
    y: 0
  };
  const p = () => {
    cancelAnimationFrame(b), i(!1);
  }, g = () => {
    i(!0);
    let h = e(), P = n(), $ = k.x, w = k.y, R = performance.now();
    const B = (V) => {
      const K = Math.min((V - R) / 1e3, 0.03333333333333333);
      R = V;
      const le = 16;
      if ($ += (-170 * h - le * $) * K, w += (-170 * P - le * w) * K, h += $ * K, P += w * K, Math.hypot(h, P) < 0.5 && Math.hypot($, w) < 1) {
        t(0), s(0), i(!1);
        return;
      }
      t(h), s(P), b = requestAnimationFrame(B);
    };
    b = requestAnimationFrame(B);
  }, y = () => {
    if (Nt()) {
      t(0), s(0);
      return;
    }
    l() === "spring" ? g() : (t(0), s(0));
  }, A = (h) => {
    p(), h.currentTarget.setPointerCapture(h.pointerId), f = {
      px: h.clientX,
      py: h.clientY,
      x: e(),
      y: n()
    }, x = {
      t: performance.now(),
      x: e(),
      y: n()
    }, k = {
      x: 0,
      y: 0
    }, o(!0);
  }, O = (h) => {
    if (!f) return;
    const P = f.x + h.clientX - f.px, $ = f.y + h.clientY - f.py, w = performance.now(), R = (w - x.t) / 1e3;
    R > 0 && (k = {
      x: (P - x.x) / R,
      y: ($ - x.y) / R
    }, x = {
      t: w,
      x: P,
      y: $
    }), t(P), s($);
  }, F = () => {
    f && (f = null, o(!1), y());
  }, S = (h) => {
    const w = {
      ArrowLeft: [-32, 0],
      ArrowRight: [32, 0],
      ArrowUp: [0, -32],
      ArrowDown: [0, 32]
    }[h.key];
    w ? (h.preventDefault(), p(), k = {
      x: w[0] * 6,
      y: w[1] * 6
    }, t(e() + w[0]), s(n() + w[1]), window.clearTimeout(v), v = window.setTimeout(y, 350)) : (h.key === "Enter" || h.key === " ") && (h.preventDefault(), p(), k = {
      x: 0,
      y: -240
    }, s(-48), window.clearTimeout(v), v = window.setTimeout(y, 60));
  };
  ie(() => {
    cancelAnimationFrame(b), window.clearTimeout(v);
  });
  const I = () => r() || a() || l() === "spring" ? "none" : `transform var(--duration-${u()}) var(--ease-${l()})`;
  return (() => {
    var h = $t(), P = h.firstChild, $ = P.firstChild, w = P.nextSibling, R = w.firstChild;
    R.firstChild;
    var B = R.nextSibling;
    B.firstChild;
    var V = w.nextSibling, K = V.firstChild, le = K.firstChild, xe = le.nextSibling, Be = xe.nextSibling, Se = Be.nextSibling, He = Se.nextSibling, Ee = He.nextSibling;
    return Ee.nextSibling, $.$$keydown = S, $.addEventListener("pointercancel", F), $.$$pointerup = F, $.$$pointermove = O, $.$$pointerdown = A, m(R, E(se, {
      each: At,
      children: (T) => (() => {
        var z = Tt(), H = z.firstChild, G = H.nextSibling;
        return H.$$input = () => d(T), H.value = T, m(G, T === "spring" ? "spring (rAF)" : `--ease-${T}`), D(() => H.checked = l() === T), z;
      })()
    }), null), m(B, E(se, {
      each: Mt,
      children: (T) => (() => {
        var z = Ct(), H = z.firstChild, G = H.nextSibling;
        return G.firstChild, H.$$input = () => c(T), H.value = T, m(G, T, null), D(() => H.checked = u() === T), z;
      })()
    }), null), m(K, () => Math.round(e()), xe), m(K, () => Math.round(n()), Se), m(K, () => r() ? "--shadow-lg" : "--shadow-md", Ee), m(K, (() => {
      var T = ae(() => l() === "spring");
      return () => T() ? "spring k=170 c=16" : `--ease-${l()} / --duration-${u()}`;
    })(), null), D((T) => {
      var z = !!r(), H = `translate(${e()}px, ${n()}px)`, G = I(), $e = l() === "spring";
      return z !== T.e && $.classList.toggle("is-dragging", T.e = z), H !== T.t && we($, "transform", T.t = H), G !== T.a && we($, "transition", T.a = G), $e !== T.o && (B.disabled = T.o = $e), T;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), h;
  })();
};
J(["pointerdown", "pointermove", "pointerup", "keydown", "input"]);
var _t = /* @__PURE__ */ _("<p class=smiski-fallback>This one needs WebGL — your browser sat this experiment out."), Dt = /* @__PURE__ */ _('<div class=smiski><div class=smiski-arena tabindex=0 role=application aria-label="Ragdoll toy. Drag him with the pointer, shove him with the arrow keys, or press Enter to toss him in the air."></div><div class=smiski-controls><button type=button class=smiski-button>toss him</button><button type=button class=smiski-button>back in the box</button><p class=smiski-readout aria-hidden=true><code>6 bodies · 5 joints · ');
const Lt = {
  napping: "napping · zzz",
  settling: "settling down",
  tumbling: "tumbling!",
  grabbed: "grabbed — fling him"
}, Ot = () => {
  const [e, t] = M("loading"), [n, s] = M(!1);
  let r, o, a = !1;
  Pe(() => {
    const l = new IntersectionObserver(async ([d]) => {
      if (d.isIntersecting && !o && !a) {
        a = !0;
        try {
          const {
            createSmiskiScene: u
          } = await import("./smiski-scene.js");
          o = u(r, t);
        } catch {
          s(!0);
        }
      }
      o?.setRunning(d.isIntersecting);
    }, {
      rootMargin: "240px"
    });
    l.observe(r), ie(() => {
      l.disconnect(), o?.dispose();
    });
  });
  const i = (l) => {
    if (!o) return;
    const u = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, 1.4],
      ArrowDown: [0, -0.8]
    }[l.key];
    u ? (l.preventDefault(), o.nudge(...u)) : (l.key === "Enter" || l.key === " ") && (l.preventDefault(), o.toss());
  };
  return (() => {
    var l = Dt(), d = l.firstChild, u = d.nextSibling, c = u.firstChild, b = c.nextSibling, v = b.nextSibling, f = v.firstChild;
    f.firstChild, d.$$keydown = i;
    var k = r;
    return typeof k == "function" ? be(k, d) : r = d, m(d, E(Y, {
      get when() {
        return n();
      },
      get children() {
        return _t();
      }
    })), c.$$click = () => o?.toss(), b.$$click = () => o?.reset(), m(f, (() => {
      var x = ae(() => e() === "loading");
      return () => x() ? "loading…" : Lt[e()];
    })(), null), l;
  })();
};
J(["keydown", "click"]);
const Rt = `import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
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
`, It = `export type FuzzyResult = { score: number; indexes: number[] };

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
`, Bt = `import { createMemo, createSignal } from "solid-js";

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
`, Ht = `import { For, createSignal } from "solid-js";

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
`, Ft = `import { Show, createSignal, onCleanup } from "solid-js";

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
`, Kt = `import { For, createSignal, onCleanup } from "solid-js";

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
`, Wt = `import { Show, createSignal, onCleanup, onMount } from "solid-js";
import type { SmiskiScene, SmiskiState } from "./smiski-scene";

// Wrapper for the ragdoll scene: three.js + cannon-es only download when the
// demo scrolls near, and the physics loop pauses whenever it's offscreen.
const STATE_LABELS: Record<SmiskiState, string> = {
  napping: "napping · zzz",
  settling: "settling down",
  tumbling: "tumbling!",
  grabbed: "grabbed — fling him",
};

export const SmiskiBox = () => {
  const [state, setState] = createSignal<SmiskiState | "loading">("loading");
  const [failed, setFailed] = createSignal(false);
  let host!: HTMLDivElement;
  let scene: SmiskiScene | undefined;
  let loading = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !scene && !loading) {
          loading = true;
          try {
            const { createSmiskiScene } = await import("./smiski-scene");
            scene = createSmiskiScene(host, setState);
          } catch {
            setFailed(true);
          }
        }
        scene?.setRunning(entry.isIntersecting);
      },
      { rootMargin: "240px" },
    );
    observer.observe(host);
    onCleanup(() => {
      observer.disconnect();
      scene?.dispose();
    });
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (!scene) return;
    const shoves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, 1.4],
      ArrowDown: [0, -0.8],
    };
    const shove = shoves[event.key];
    if (shove) {
      event.preventDefault();
      scene.nudge(...shove);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scene.toss();
    }
  };

  return (
    <div class="smiski">
      <div
        ref={host}
        class="smiski-arena"
        tabindex="0"
        role="application"
        aria-label="Ragdoll toy. Drag him with the pointer, shove him with the arrow keys, or press Enter to toss him in the air."
        onKeyDown={onKeyDown}
      >
        <Show when={failed()}>
          <p class="smiski-fallback">
            This one needs WebGL — your browser sat this experiment out.
          </p>
        </Show>
      </div>
      <div class="smiski-controls">
        <button type="button" class="smiski-button" onClick={() => scene?.toss()}>
          toss him
        </button>
        <button type="button" class="smiski-button" onClick={() => scene?.reset()}>
          back in the box
        </button>
        <p class="smiski-readout" aria-hidden="true">
          <code>
            6 bodies · 5 joints ·{" "}
            {state() === "loading" ? "loading…" : STATE_LABELS[state() as SmiskiState]}
          </code>
        </p>
      </div>
    </div>
  );
};
`, zt = `import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createSmiskiRig } from "./smiski-rig";

// The lab's ragdoll-in-a-box: the shared smiski rig (smiski-rig.ts) dropped
// into a cardboard box. Grab any limb with the pointer and the rest of him
// dangles from wherever you're holding.
//
// Kept free of Solid so the component wrapper stays tiny and this whole
// module (plus three/cannon) can load lazily when the demo scrolls into view.

export type SmiskiScene = {
  reset: () => void;
  nudge: (x: number, y: number) => void;
  toss: () => void;
  setRunning: (running: boolean) => void;
  dispose: () => void;
};

export type SmiskiState = "napping" | "settling" | "tumbling" | "grabbed";

const BOX_YELLOW = 0xedcf83; // --butter-300
const BOX_INSIDE = 0xf6e4b3; // --butter-200

// Where he can be dragged / thrown to — roughly the camera's view volume.
const BOUNDS = { x: 2.6, yMin: 0.12, yMax: 3.1, zMin: -1.2, zMax: 1.6 };

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const createSmiskiScene = (
  host: HTMLElement,
  onState: (state: SmiskiState) => void,
): SmiskiScene => {
  // ── Renderer / scene / camera ──
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.touchAction = "none";
  renderer.domElement.style.cursor = "grab";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 2.6, 5.4);
  camera.lookAt(0, 0.45, 0);

  scene.add(new THREE.HemisphereLight(0xfff8ef, 0xb9a89d, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.7);
  sun.position.set(2.4, 5, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -4;
  sun.shadow.camera.right = 4;
  sun.shadow.camera.top = 5;
  sun.shadow.camera.bottom = -1;
  scene.add(sun);

  // ── Physics world ──
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) });
  world.allowSleep = true;
  (world.solver as CANNON.GSSolver).iterations = 12;
  world.defaultContactMaterial.friction = 0.5;
  world.defaultContactMaterial.restitution = 0.22;

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  // ── Ground: invisible physics plane + a soft shadow catcher ──
  const ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(ground);

  const shadowMat = track(new THREE.ShadowMaterial({ opacity: 0.16 }));
  const floor = new THREE.Mesh(track(new THREE.PlaneGeometry(14, 10)), shadowMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Invisible walls at the edges of the view so he can't be flung offscreen.
  const addWall = (normal: [number, number, number], offset: [number, number, number]) => {
    const wall = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
    wall.quaternion.setFromVectors(new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(...normal));
    wall.position.set(...offset);
    world.addBody(wall);
  };
  addWall([1, 0, 0], [-2.9, 0, 0]);
  addWall([-1, 0, 0], [2.9, 0, 0]);
  addWall([0, 0, 1], [0, 0, -1.5]);
  addWall([0, 0, -1], [0, 0, 1.9]);
  addWall([0, -1, 0], [0, 3.4, 0]);

  // ── The box he lives in (open top, static) ──
  const boxMat = track(
    new THREE.MeshStandardMaterial({ color: BOX_YELLOW, roughness: 0.85 }),
  );
  const boxInsideMat = track(
    new THREE.MeshStandardMaterial({ color: BOX_INSIDE, roughness: 0.9 }),
  );
  const addSlab = (
    half: [number, number, number],
    at: [number, number, number],
    material: THREE.Material,
  ) => {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(...half)),
    });
    body.position.set(...at);
    world.addBody(body);
    const mesh = new THREE.Mesh(
      track(new THREE.BoxGeometry(half[0] * 2, half[1] * 2, half[2] * 2)),
      material,
    );
    mesh.position.set(...at);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  };
  addSlab([0.86, 0.03, 0.56], [0, 0.03, 0], boxInsideMat); // floor
  addSlab([0.03, 0.31, 0.56], [-0.83, 0.37, 0], boxMat); // left
  addSlab([0.03, 0.31, 0.56], [0.83, 0.37, 0], boxMat); // right
  addSlab([0.86, 0.31, 0.03], [0, 0.37, -0.53], boxMat); // back
  addSlab([0.86, 0.31, 0.03], [0, 0.37, 0.53], boxMat); // front

  // ── The little guy ──
  const rig = createSmiskiRig(world);
  scene.add(rig.group);

  // A short drop leaning backward, so he slumps seated against the back wall
  // with his face to the camera. A taller drop tumbles him unpredictably.
  const reset = () => rig.placeAt(0, prefersReducedMotion() ? 0.76 : 0.94, -0.18, -0.15);
  reset();

  // ── Theme: glow brighter in the dark, softer shadows ──
  const applyTheme = () => {
    const explicit = document.documentElement.dataset.theme;
    const dark =
      explicit === "dark" ||
      (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
    rig.skin.emissiveIntensity = dark ? 0.5 : 0.18;
    shadowMat.opacity = dark ? 0.35 : 0.16;
  };
  applyTheme();
  const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  themeQuery.addEventListener("change", applyTheme);
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

  // ── Pointer dragging: raycast a limb, tether it to a point that follows
  // the cursor on a camera-facing plane through the grab point. ──
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const dragPlane = new THREE.Plane();
  const dragPoint = new THREE.Vector3();
  const grabAnchor = new CANNON.Body({ type: CANNON.Body.STATIC });
  world.addBody(grabAnchor);
  let dragConstraint: CANNON.PointToPointConstraint | null = null;

  const readPointer = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointerNdc, camera);
  };

  const onPointerDown = (event: PointerEvent) => {
    readPointer(event);
    const hit = raycaster.intersectObject(rig.group, true)[0];
    if (!hit) return;
    const body: CANNON.Body = hit.object.userData.body;
    if (!body) return;
    renderer.domElement.setPointerCapture(event.pointerId);
    camera.getWorldDirection(dragPoint);
    dragPlane.setFromNormalAndCoplanarPoint(dragPoint, hit.point);
    grabAnchor.position.set(hit.point.x, hit.point.y, hit.point.z);
    const pivot = body.pointToLocalFrame(new CANNON.Vec3(hit.point.x, hit.point.y, hit.point.z));
    dragConstraint = new CANNON.PointToPointConstraint(
      body,
      pivot,
      grabAnchor,
      new CANNON.Vec3(0, 0, 0),
      40,
    );
    world.addConstraint(dragConstraint);
    rig.wake();
    renderer.domElement.style.cursor = "grabbing";
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragConstraint) return;
    readPointer(event);
    if (!raycaster.ray.intersectPlane(dragPlane, dragPoint)) return;
    grabAnchor.position.set(
      THREE.MathUtils.clamp(dragPoint.x, -BOUNDS.x, BOUNDS.x),
      THREE.MathUtils.clamp(dragPoint.y, BOUNDS.yMin, BOUNDS.yMax),
      THREE.MathUtils.clamp(dragPoint.z, BOUNDS.zMin, BOUNDS.zMax),
    );
    dragConstraint.bodyA.wakeUp();
  };

  const releasePointer = () => {
    if (!dragConstraint) return;
    world.removeConstraint(dragConstraint);
    dragConstraint = null;
    renderer.domElement.style.cursor = "grab";
  };

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerup", releasePointer);
  renderer.domElement.addEventListener("pointercancel", releasePointer);

  // ── Keyboard shoves, so the demo works without a pointer ──
  const torsoBody = rig.byName.torso.body;
  const nudge = (x: number, y: number) => {
    rig.wake();
    torsoBody.applyImpulse(new CANNON.Vec3(x * 2.4, y * 2.4 + 0.6, 0), torsoBody.position);
  };
  const toss = () => {
    rig.wake();
    torsoBody.applyImpulse(new CANNON.Vec3((Math.random() - 0.5) * 1.6, 3.4, 0), torsoBody.position);
    torsoBody.angularVelocity.set(0, 0, (Math.random() - 0.5) * 8);
  };

  // ── Sizing ──
  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  // ── Loop ──
  let raf = 0;
  let running = false;
  let lastTime = 0;
  let lastState: SmiskiState | null = null;

  const reportState = () => {
    let state: SmiskiState;
    if (dragConstraint) state = "grabbed";
    else if (rig.parts.every((part) => part.body.sleepState === CANNON.Body.SLEEPING))
      state = "napping";
    else {
      const speed = Math.max(...rig.parts.map((part) => part.body.velocity.length()));
      state = speed > 0.6 ? "tumbling" : "settling";
    }
    if (state !== lastState) {
      lastState = state;
      onState(state);
    }
  };

  const step = (now: number) => {
    raf = requestAnimationFrame(step);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    world.step(1 / 60, dt, 3);
    rig.syncMeshes();
    reportState();
    renderer.render(scene, camera);
  };

  const setRunning = (next: boolean) => {
    if (next === running) return;
    running = next;
    if (next) {
      lastTime = performance.now();
      raf = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(raf);
    }
  };
  setRunning(true);

  const dispose = () => {
    setRunning(false);
    releasePointer();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    themeQuery.removeEventListener("change", applyTheme);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerup", releasePointer);
    renderer.domElement.removeEventListener("pointercancel", releasePointer);
    rig.dispose();
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { reset, nudge, toss, setRunning, dispose };
};
`, ee = (e, t) => {
  const n = document.getElementById(e);
  n && Qe(t, n);
};
ee("exp-palette", () => E(Z, {
  source: `${Rt}

// fuzzy.ts
${It}`,
  sourceName: "CommandPalette.tsx",
  get children() {
    return E(dt, {});
  }
}));
ee("exp-ghost", () => E(Z, {
  source: Bt,
  sourceName: "GhostText.tsx",
  get children() {
    return E(ht, {});
  }
}));
ee("exp-diff", () => E(Z, {
  source: Ht,
  sourceName: "AnimatedDiff.tsx",
  get children() {
    return E(yt, {});
  }
}));
ee("exp-stream", () => E(Z, {
  source: Ft,
  sourceName: "StreamRenderer.tsx",
  get children() {
    return E(Et, {});
  }
}));
ee("exp-toy", () => E(Z, {
  source: Kt,
  sourceName: "MotionToy.tsx",
  get children() {
    return E(Pt, {});
  }
}));
ee("exp-smiski", () => E(Z, {
  source: `${Wt}

// smiski-scene.ts
${zt}`,
  sourceName: "SmiskiBox.tsx",
  get children() {
    return E(Ot, {});
  }
}));
