const Fe = (e, t) => e === t, Ke = Symbol("solid-track"), me = {
  equals: Fe
};
let _e = Ie;
const j = 1, ye = 2, De = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var D = null;
let Se = null, We = null, N = null, H = null, V = null, xe = 0;
function ge(e, t) {
  const n = N, s = D, r = e.length === 0, o = t === void 0 ? s : t, a = r ? De : {
    owned: null,
    cleanups: null,
    context: o ? o.context : null,
    owner: o
  }, i = r ? e : () => e(() => G(() => re(a)));
  D = a, N = null;
  try {
    return ue(i, !0);
  } finally {
    N = n, D = s;
  }
}
function A(e, t) {
  t = t ? Object.assign({}, me, t) : me;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, s = (r) => (typeof r == "function" && (r = r(n.value)), Oe(n, r));
  return [Re.bind(n), s];
}
function O(e, t, n) {
  const s = Ce(e, t, !1, j);
  de(s);
}
function Ee(e, t, n) {
  _e = Ve;
  const s = Ce(e, t, !1, j);
  s.user = !0, V ? V.push(s) : de(s);
}
function Y(e, t, n) {
  n = n ? Object.assign({}, me, n) : me;
  const s = Ce(e, t, !0, 0);
  return s.observers = null, s.observerSlots = null, s.comparator = n.equals || void 0, de(s), Re.bind(s);
}
function G(e) {
  if (N === null) return e();
  const t = N;
  N = null;
  try {
    return e();
  } finally {
    N = t;
  }
}
function Le(e) {
  Ee(() => G(e));
}
function ce(e) {
  return D === null || (D.cleanups === null ? D.cleanups = [e] : D.cleanups.push(e)), e;
}
function Re() {
  if (this.sources && this.state)
    if (this.state === j) de(this);
    else {
      const e = H;
      H = null, ue(() => we(this), !1), H = e;
    }
  if (N) {
    const e = this.observers;
    if (!e || e[e.length - 1] !== N) {
      const t = e ? e.length : 0;
      N.sources ? (N.sources.push(this), N.sourceSlots.push(t)) : (N.sources = [this], N.sourceSlots = [t]), e ? (e.push(N), this.observerSlots.push(N.sources.length - 1)) : (this.observers = [N], this.observerSlots = [N.sources.length - 1]);
    }
  }
  return this.value;
}
function Oe(e, t, n) {
  let s = e.value;
  return (!e.comparator || !e.comparator(s, t)) && (e.value = t, e.observers && e.observers.length && ue(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const o = e.observers[r], a = Se && Se.running;
      a && Se.disposed.has(o), (a ? !o.tState : !o.state) && (o.pure ? H.push(o) : V.push(o), o.observers && Be(o)), a || (o.state = j);
    }
    if (H.length > 1e6)
      throw H = [], new Error();
  }, !1)), t;
}
function de(e) {
  if (!e.fn) return;
  re(e);
  const t = xe;
  qe(e, e.value, t);
}
function qe(e, t, n) {
  let s;
  const r = D, o = N;
  N = D = e;
  try {
    s = e.fn(t);
  } catch (a) {
    return e.pure && (e.state = j, e.owned && e.owned.forEach(re), e.owned = null), e.updatedAt = n + 1, ze(a);
  } finally {
    N = o, D = r;
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? Oe(e, s) : e.value = s, e.updatedAt = n);
}
function Ce(e, t, n, s = j, r) {
  const o = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: D,
    context: D ? D.context : null,
    pure: n
  };
  return D === null || D !== De && (D.owned ? D.owned.push(o) : D.owned = [o]), o;
}
function be(e) {
  if (e.state === 0) return;
  if (e.state === ye) return we(e);
  if (e.suspense && G(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < xe); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (e = t[n], e.state === j)
      de(e);
    else if (e.state === ye) {
      const s = H;
      H = null, ue(() => we(e, t[0]), !1), H = s;
    }
}
function ue(e, t) {
  if (H) return e();
  let n = !1;
  t || (H = []), V ? n = !0 : V = [], xe++;
  try {
    const s = e();
    return Ue(n), s;
  } catch (s) {
    n || (V = null), H = null, ze(s);
  }
}
function Ue(e) {
  if (H && (Ie(H), H = null), e) return;
  const t = V;
  V = null, t.length && ue(() => _e(t), !1);
}
function Ie(e) {
  for (let t = 0; t < e.length; t++) be(e[t]);
}
function Ve(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? e[n++] = s : be(s);
  }
  for (t = 0; t < n; t++) be(e[t]);
}
function we(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    if (s.sources) {
      const r = s.state;
      r === j ? s !== t && (!s.updatedAt || s.updatedAt < xe) && be(s) : r === ye && we(s, t);
    }
  }
}
function Be(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = ye, n.pure ? H.push(n) : V.push(n), n.observers && Be(n));
  }
}
function re(e) {
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
    for (t = e.tOwned.length - 1; t >= 0; t--) re(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) re(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Ge(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function ze(e, t = D) {
  throw Ge(e);
}
const je = Symbol("fallback");
function Me(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Xe(e, t, n = {}) {
  let s = [], r = [], o = [], a = 0, i = t.length > 1 ? [] : null;
  return ce(() => Me(o)), () => {
    let l = e() || [], d = l.length, u, c;
    return l[Ke], G(() => {
      let S, h, v, k, p, g, m, C, L;
      if (d === 0)
        a !== 0 && (Me(o), o = [], s = [], r = [], a = 0, i && (i = [])), n.fallback && (s = [je], r[0] = ge((I) => (o[0] = I, n.fallback())), a = 1);
      else if (a === 0) {
        for (r = new Array(d), c = 0; c < d; c++)
          s[c] = l[c], r[c] = ge(w);
        a = d;
      } else {
        for (v = new Array(d), k = new Array(d), i && (p = new Array(d)), g = 0, m = Math.min(a, d); g < m && s[g] === l[g]; g++) ;
        for (m = a - 1, C = d - 1; m >= g && C >= g && s[m] === l[C]; m--, C--)
          v[C] = r[m], k[C] = o[m], i && (p[C] = i[m]);
        for (S = /* @__PURE__ */ new Map(), h = new Array(C + 1), c = C; c >= g; c--)
          L = l[c], u = S.get(L), h[c] = u === void 0 ? -1 : u, S.set(L, c);
        for (u = g; u <= m; u++)
          L = s[u], c = S.get(L), c !== void 0 && c !== -1 ? (v[c] = r[u], k[c] = o[u], i && (p[c] = i[u]), c = h[c], S.set(L, c)) : o[u]();
        for (c = g; c < d; c++)
          c in v ? (r[c] = v[c], o[c] = k[c], i && (i[c] = p[c], i[c](c))) : r[c] = ge(w);
        r = r.slice(0, a = d), s = l.slice(0);
      }
      return r;
    });
    function w(S) {
      if (o[c] = S, i) {
        const [h, v] = A(c);
        return i[c] = v, t(l[c], h);
      }
      return t(l[c]);
    }
  };
}
function M(e, t) {
  return G(() => e(t || {}));
}
const Ye = (e) => `Stale read from <${e}>.`;
function ae(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Y(Xe(() => e.each, e.children, t || void 0));
}
function Z(e) {
  const t = e.keyed, n = Y(() => e.when, void 0, void 0), s = t ? n : Y(n, void 0, {
    equals: (r, o) => !r == !o
  });
  return Y(() => {
    const r = s();
    if (r) {
      const o = e.children;
      return typeof o == "function" && o.length > 0 ? G(() => o(t ? r : () => {
        if (!G(s)) throw Ye("Show");
        return n();
      })) : o;
    }
    return e.fallback;
  }, void 0, void 0);
}
const pe = (e) => Y(() => e());
function Qe(e, t, n) {
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
          let c = a, w = 1, S;
          for (; ++c < r && c < o && !((S = d.get(t[c])) == null || S !== u + w); )
            w++;
          if (w > u - i) {
            const h = t[a];
            for (; i < u; ) e.insertBefore(n[i++], h);
          } else e.replaceChild(n[i++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const Ne = "_$DX_DELEGATE";
function Je(e, t, n, s = {}) {
  let r;
  return ge((o) => {
    r = o, t === document ? e() : y(t, e(), t.firstChild ? null : void 0, n);
  }, s.owner), () => {
    r(), t.textContent = "";
  };
}
function R(e, t, n, s) {
  let r;
  const o = () => {
    const i = document.createElement("template");
    return i.innerHTML = e, i.content.firstChild;
  }, a = () => (r || (r = o())).cloneNode(!0);
  return a.cloneNode = a, a;
}
function Q(e, t = window.document) {
  const n = t[Ne] || (t[Ne] = /* @__PURE__ */ new Set());
  for (let s = 0, r = e.length; s < r; s++) {
    const o = e[s];
    n.has(o) || (n.add(o), t.addEventListener(o, et));
  }
}
function K(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Ze(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function $e(e, t, n) {
  n != null ? e.style.setProperty(t, n) : e.style.removeProperty(t);
}
function le(e, t, n) {
  return G(() => e(t, n));
}
function y(e, t, n, s) {
  if (n !== void 0 && !s && (s = []), typeof t != "function") return ve(e, t, s, n);
  O((r) => ve(e, t(), r, n), s);
}
function et(e) {
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
function ve(e, t, n, s, r) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const o = typeof t, a = s !== void 0;
  if (e = a && n[0] && n[0].parentNode || e, o === "string" || o === "number") {
    if (o === "number" && (t = t.toString(), t === n))
      return n;
    if (a) {
      let i = n[0];
      i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = J(e, n, s, i);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || o === "boolean")
    n = J(e, n, s);
  else {
    if (o === "function")
      return O(() => {
        let i = t();
        for (; typeof i == "function"; ) i = i();
        n = ve(e, i, n, s);
      }), () => n;
    if (Array.isArray(t)) {
      const i = [], l = n && Array.isArray(n);
      if (Te(i, t, n, r))
        return O(() => n = ve(e, i, n, s, !0)), () => n;
      if (i.length === 0) {
        if (n = J(e, n, s), a) return n;
      } else l ? n.length === 0 ? Pe(e, i, s) : Qe(e, n, i) : (n && J(e), Pe(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (a) return n = J(e, n, s, t);
        J(e, n, null, t);
      } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Te(e, t, n, s) {
  let r = !1;
  for (let o = 0, a = t.length; o < a; o++) {
    let i = t[o], l = n && n[e.length], d;
    if (!(i == null || i === !0 || i === !1)) if ((d = typeof i) == "object" && i.nodeType)
      e.push(i);
    else if (Array.isArray(i))
      r = Te(e, i, l) || r;
    else if (d === "function")
      if (s) {
        for (; typeof i == "function"; ) i = i();
        r = Te(e, Array.isArray(i) ? i : [i], Array.isArray(l) ? l : [l]) || r;
      } else
        e.push(i), r = !0;
    else {
      const u = String(i);
      l && l.nodeType === 3 && l.data === u ? e.push(l) : e.push(document.createTextNode(u));
    }
  }
  return r;
}
function Pe(e, t, n = null) {
  for (let s = 0, r = t.length; s < r; s++) e.insertBefore(t[s], n);
}
function J(e, t, n, s) {
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
const tt = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\[\s\S])*`)|\b(0x[\da-fA-F]+|\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|if|else|for|while|do|of|in|new|typeof|instanceof|void|delete|class|extends|super|import|export|from|default|async|await|yield|try|catch|finally|throw|switch|case|break|continue|type|interface|enum|implements|as|satisfies|keyof|readonly|static|get|set|true|false|null|undefined|this)\b/g, nt = ["tok-comment", "tok-string", "tok-number", "tok-keyword"], ke = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), st = (e) => {
  let t = "", n = 0;
  for (const s of e.matchAll(tt)) {
    t += ke(e.slice(n, s.index));
    const r = nt[s.slice(1).findIndex((o) => o !== void 0)];
    t += `<span class="${r}">${ke(s[0])}</span>`, n = s.index + s[0].length;
  }
  return t + ke(e.slice(n));
};
var it = /* @__PURE__ */ R('<div class=experiment-body><div class=experiment-demo></div><details class=experiment-source><summary>view source · </summary><div class=code-window><div class=code-window-bar><span class=code-window-lights><button type=button class="light light-close"aria-label="Close source"title=Close>×</button><button type=button class="light light-min">−</button><button type=button class="light light-max">+</button></span><span class=code-window-name></span><button type=button class=code-copy title="Copy code"><svg class=icon aria-hidden=true><use></use></svg></button></div><pre class=experiment-code tabindex=0><code>');
const ee = (e) => {
  const [t, n] = A(!1), [s, r] = A(!1), [o, a] = A(!1);
  let i = 0, l, d;
  const u = () => {
    d && (d.open = !1), r(!1), a(!1), d?.querySelector("summary")?.focus();
  }, c = () => {
    const h = !s();
    r(h), h && a(!1);
  }, w = () => {
    const h = !o();
    a(h), h && r(!1);
  }, S = async () => {
    try {
      await navigator.clipboard.writeText(e.source);
    } catch {
      l && window.getSelection()?.selectAllChildren(l);
      return;
    }
    n(!0), window.clearTimeout(i), i = window.setTimeout(() => n(!1), 1600);
  };
  return (() => {
    var h = it(), v = h.firstChild, k = v.nextSibling, p = k.firstChild;
    p.firstChild;
    var g = p.nextSibling, m = g.firstChild, C = m.firstChild, L = C.firstChild, I = L.nextSibling, E = I.nextSibling, B = C.nextSibling, f = B.nextSibling, P = f.firstChild, T = P.firstChild, b = m.nextSibling, _ = b.firstChild;
    y(v, () => e.children);
    var z = d;
    typeof z == "function" ? le(z, k) : d = k, y(p, () => e.sourceName, null), L.$$click = u, I.$$click = c, E.$$click = w, y(B, () => e.sourceName), f.$$click = S;
    var q = l;
    return typeof q == "function" ? le(q, _) : l = _, O((x) => {
      var X = !!s(), ne = !!o(), he = s() ? "Restore code" : "Minimize code", se = s() ? "Restore" : "Minimize", fe = o() ? "Restore code height" : "Expand code", ie = o() ? "Restore" : "Expand", $ = !!t(), W = t() ? "Copied" : "Copy code", F = `/images/icons.svg#${t() ? "check" : "copy"}`, U = st(e.source);
      return X !== x.e && g.classList.toggle("is-minimized", x.e = X), ne !== x.t && g.classList.toggle("is-maximized", x.t = ne), he !== x.a && K(I, "aria-label", x.a = he), se !== x.o && K(I, "title", x.o = se), fe !== x.i && K(E, "aria-label", x.i = fe), ie !== x.n && K(E, "title", x.n = ie), $ !== x.s && f.classList.toggle("is-copied", x.s = $), W !== x.h && K(f, "aria-label", x.h = W), F !== x.r && K(T, "href", x.r = F), U !== x.d && (_.innerHTML = x.d = U), x;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0,
      r: void 0,
      d: void 0
    }), h;
  })();
};
Q(["click"]);
const ot = (e, t) => {
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
var rt = /* @__PURE__ */ R('<button class="btn btn-secondary"type=button>Open the palette<kbd class=palette-kbd>K'), at = /* @__PURE__ */ R("<li class=palette-empty>nothing matches “<!>” — try “work” or “playground”"), lt = /* @__PURE__ */ R('<div class=palette-backdrop><div class=palette role=dialog aria-modal=true aria-label="Site command palette"><input class=palette-input type=text placeholder="Where to? Try “design” or “waddl”…"aria-label="Search pages and sections"role=combobox aria-expanded=true aria-controls=palette-list><ul class=palette-list id=palette-list role=listbox></ul><div class=palette-footer aria-hidden=true><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> go</span><span><kbd>esc</kbd> close'), ct = /* @__PURE__ */ R("<li class=palette-item role=option><span class=palette-label></span><span class=palette-hint>"), dt = /* @__PURE__ */ R("<span>");
const ut = [{
  label: "Home",
  hint: "page",
  href: "/"
}, {
  label: "Work — all projects",
  hint: "page",
  href: "/projects"
}, {
  label: "Waddl case study",
  hint: "page",
  href: "/waddl"
}, {
  label: "The Playground",
  hint: "page",
  href: "/playground"
}, {
  label: "Design system",
  hint: "page",
  href: "/design"
}, {
  label: "Resume",
  hint: "page",
  href: "/resume"
}, {
  label: "Research — how people think",
  hint: "section",
  href: "/#research"
}, {
  label: "Principles — how I build",
  hint: "section",
  href: "/#principles"
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
}], pt = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, ht = () => /Mac|iPhone|iPad/.test(navigator.platform), ft = () => {
  const [e, t] = A(!1), [n, s] = A(!1), [r, o] = A(""), [a, i] = A(0);
  let l, d, u = null;
  const c = Y(() => {
    const p = r().trim();
    return ut.map((g) => ({
      item: g,
      match: ot(p, g.label)
    })).filter((g) => g.match !== null).sort((g, m) => m.match.score - g.match.score);
  });
  Ee(() => {
    c(), i(0);
  });
  const w = () => {
    u = document.activeElement, o(""), s(!1), t(!0), queueMicrotask(() => l.focus());
  }, S = () => {
    e() && (pt() ? t(!1) : (s(!0), window.setTimeout(() => {
      t(!1), s(!1);
    }, 150)), u?.focus());
  }, h = (p) => {
    S(), window.location.assign(p.href);
  }, v = (p) => {
    (p.metaKey || p.ctrlKey) && p.key.toLowerCase() === "k" && (p.preventDefault(), e() ? S() : w());
  };
  Le(() => document.addEventListener("keydown", v)), ce(() => document.removeEventListener("keydown", v));
  const k = (p) => {
    const g = c().length;
    if (p.key === "Escape")
      p.preventDefault(), S();
    else if (p.key === "ArrowDown")
      p.preventDefault(), g > 0 && i((a() + 1) % g);
    else if (p.key === "ArrowUp")
      p.preventDefault(), g > 0 && i((a() - 1 + g) % g);
    else if (p.key === "Enter") {
      p.preventDefault();
      const m = c()[a()];
      m && h(m.item);
    } else p.key === "Tab" && p.preventDefault();
  };
  return Ee(() => {
    d?.children[a()]?.scrollIntoView({
      block: "nearest"
    });
  }), [(() => {
    var p = rt(), g = p.firstChild, m = g.nextSibling, C = m.firstChild;
    return p.$$click = w, y(m, () => ht() ? "⌘" : "Ctrl+", C), p;
  })(), M(Z, {
    get when() {
      return e();
    },
    get children() {
      var p = lt(), g = p.firstChild, m = g.firstChild, C = m.nextSibling;
      p.$$click = (E) => {
        E.target === E.currentTarget && S();
      }, m.$$keydown = k, m.$$input = (E) => o(E.currentTarget.value);
      var L = l;
      typeof L == "function" ? le(L, m) : l = m;
      var I = d;
      return typeof I == "function" ? le(I, C) : d = C, y(C, M(ae, {
        get each() {
          return c();
        },
        children: (E, B) => (() => {
          var f = ct(), P = f.firstChild, T = P.nextSibling;
          return f.$$click = () => h(E.item), f.$$pointermove = () => i(B()), y(P, M(ae, {
            get each() {
              return E.item.label.split("");
            },
            children: (b, _) => (() => {
              var z = dt();
              return y(z, b), O(() => z.classList.toggle("palette-hit", !!E.match.indexes.includes(_()))), z;
            })()
          })), y(T, () => E.item.hint), O((b) => {
            var _ = B() === a(), z = `palette-item-${B()}`, q = B() === a();
            return _ !== b.e && f.classList.toggle("is-active", b.e = _), z !== b.t && K(f, "id", b.t = z), q !== b.a && K(f, "aria-selected", b.a = q), b;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          }), f;
        })()
      }), null), y(C, M(Z, {
        get when() {
          return c().length === 0;
        },
        get children() {
          var E = at(), B = E.firstChild, f = B.nextSibling;
          return f.nextSibling, y(E, r, f), E;
        }
      }), null), O((E) => {
        var B = !!n(), f = c().length > 0 ? `palette-item-${a()}` : void 0;
        return B !== E.e && p.classList.toggle("is-leaving", E.e = B), f !== E.t && K(m, "aria-activedescendant", E.t = f), E;
      }, {
        e: void 0,
        t: void 0
      }), O(() => m.value = r()), p;
    }
  })];
};
Q(["click", "input", "keydown", "pointermove"]);
var gt = /* @__PURE__ */ R('<div class=ghost-demo><div class=ghost-wrap><div class=ghost-underlay aria-hidden=true><span class=ghost-typed></span><span class=ghost-completion></span></div><input class=ghost-input type=text autocomplete=off aria-label="Ghost text demo input"aria-describedby=ghost-hint></div><p class=ghost-hint id=ghost-hint>try “inter…”, “tok…”, or “brown…” — <kbd>Tab</kbd> accepts, <kbd>Esc</kbd> dismisses</p><span class=visually-hidden role=status>');
const mt = ["interfaces that speak fluent human", "tokens over values", "cross math", "waddl", "canonical proportion as a phonological index", "brown butter is a statistically significant improvement", "warm pastels, crisp surfaces, soft motion"], yt = () => {
  const [e, t] = A(""), [n, s] = A(!1), r = Y(() => {
    const i = e();
    if (n() || i.length === 0) return "";
    const l = mt.find((d) => d.startsWith(i.toLowerCase()) && d.length > i.length);
    return l ? l.slice(i.length) : "";
  }), o = () => {
    t(e() + r());
  }, a = (i) => {
    if (r() === "") return;
    const d = i.currentTarget.selectionStart === e().length;
    i.key === "Tab" || i.key === "ArrowRight" && d ? (i.preventDefault(), o()) : i.key === "Escape" && (i.preventDefault(), s(!0));
  };
  return (() => {
    var i = gt(), l = i.firstChild, d = l.firstChild, u = d.firstChild, c = u.nextSibling, w = d.nextSibling, S = l.nextSibling, h = S.nextSibling;
    return y(u, e), y(c, r), w.$$keydown = a, w.$$input = (v) => {
      s(!1), t(v.currentTarget.value);
    }, K(w, "spellcheck", !1), y(h, (() => {
      var v = pe(() => r() !== "");
      return () => v() ? `Suggestion: ${e()}${r()}. Press Tab to accept.` : "";
    })()), O(() => w.value = e()), i;
  })();
};
Q(["input", "keydown"]);
var bt = /* @__PURE__ */ R('<div class=adiff><div class=adiff-toolbar><span class=adiff-file>tokens-refactor.ts</span><button class="btn btn-secondary btn-sm"type=button></button></div><pre class=adiff-code><code></code></pre><p class=adiff-caption aria-live=polite>'), wt = /* @__PURE__ */ R("<span><span class=adiff-gutter>");
const vt = [{
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
}], xt = () => {
  const [e, t] = A(!1), n = (s) => e() ? s.kind !== "del" : s.kind !== "add";
  return (() => {
    var s = bt(), r = s.firstChild, o = r.firstChild, a = o.nextSibling, i = r.nextSibling, l = i.firstChild, d = i.nextSibling;
    return a.$$click = () => t(!e()), y(a, () => e() ? "Show before" : "Apply the diff"), y(l, M(ae, {
      each: vt,
      children: (u, c) => (() => {
        var w = wt(), S = w.firstChild;
        return y(S, (() => {
          var h = pe(() => u.kind === "add");
          return () => h() ? "+" : u.kind === "del" ? "−" : " ";
        })()), y(w, () => u.text, null), O((h) => {
          var v = `adiff-line adiff-line-${u.kind}`, k = !n(u), p = String(c()), g = !n(u);
          return v !== h.e && Ze(w, h.e = v), k !== h.t && w.classList.toggle("is-hidden", h.t = k), p !== h.a && $e(w, "--line-index", h.a = p), g !== h.o && K(w, "aria-hidden", h.o = g), h;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        }), w;
      })()
    })), y(d, () => e() ? "after — every value is a token" : "before — raw values, hand-tuned"), O(() => K(a, "aria-pressed", e())), s;
  })();
};
Q(["click"]);
var St = /* @__PURE__ */ R("<span class=stream-caret>"), kt = /* @__PURE__ */ R("<span class=stream-thinking-chip>thinking…"), Et = /* @__PURE__ */ R("<p class=stream-placeholder aria-hidden=true>press play to stream"), $t = /* @__PURE__ */ R('<div class=stream><div class=stream-stage><p class=visually-hidden></p><p class=stream-text aria-hidden=true></p></div><div class=stream-controls><button class="btn btn-secondary btn-sm"type=button></button><button class="btn btn-ghost btn-sm"type=button>Reset</button><label class=stream-speed><span>speed</span><input type=range min=3 max=24 step=1 aria-label="Streaming speed, words per second"><span class=stream-speed-value> w/s');
const He = "Streaming is pacing. Words arrive a few at a time, the cursor holds your place, and the pause before an answer ✦ reads as thought, not lag. Tune the speed below and feel how the same sentence changes character.", oe = He.split(" "), Tt = 1400, Ct = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, At = () => {
  const [e, t] = A(0), [n, s] = A(!1), [r, o] = A(!1), [a, i] = A(9);
  let l;
  const d = () => {
    window.clearTimeout(l), s(!1), o(!1);
  }, u = () => e() >= oe.length, c = () => {
    if (e() >= oe.length) {
      d();
      return;
    }
    if (oe[e()] === "✦") {
      o(!0), t(e() + 1), l = window.setTimeout(() => {
        o(!1), c();
      }, Tt);
      return;
    }
    t(e() + 1), l = window.setTimeout(c, 1e3 / a());
  }, w = () => {
    if (u() && t(0), Ct()) {
      t(oe.length);
      return;
    }
    s(!0), c();
  }, S = () => {
    window.clearTimeout(l), s(!1), o(!1);
  }, h = () => {
    d(), t(0);
  };
  ce(d);
  const v = () => oe.slice(0, e()).filter((k) => k !== "✦").join(" ");
  return (() => {
    var k = $t(), p = k.firstChild, g = p.firstChild, m = g.nextSibling, C = p.nextSibling, L = C.firstChild, I = L.nextSibling, E = I.nextSibling, B = E.firstChild, f = B.nextSibling, P = f.nextSibling, T = P.firstChild;
    return y(g, () => He.replace(" ✦", "")), y(m, v, null), y(m, M(Z, {
      get when() {
        return n() || !u() && e() > 0;
      },
      get children() {
        var b = St();
        return O(() => b.classList.toggle("is-thinking", !!r())), b;
      }
    }), null), y(m, M(Z, {
      get when() {
        return r();
      },
      get children() {
        return kt();
      }
    }), null), y(p, M(Z, {
      get when() {
        return e() === 0;
      },
      get children() {
        return Et();
      }
    }), null), L.$$click = () => n() ? S() : w(), y(L, (() => {
      var b = pe(() => !!n());
      return () => b() ? "Pause" : u() ? "Replay" : "Play";
    })()), I.$$click = h, f.$$input = (b) => i(Number(b.currentTarget.value)), y(P, a, T), O(() => I.disabled = e() === 0), O(() => f.value = a()), k;
  })();
};
Q(["click", "input"]);
var Mt = /* @__PURE__ */ R('<div class=toy><div class=toy-arena><div class=toy-card tabindex=0 aria-label="Motion toy card. Drag it, or push it with the arrow keys and it springs home."><span class=toy-card-title>drag me</span><span class=toy-card-sub>then let go</span></div></div><div class=toy-controls><fieldset class=toy-group><legend>easing</legend></fieldset><fieldset class=toy-group><legend>duration</legend></fieldset></div><p class=toy-readout aria-hidden=true><code>translate(<!>px, <!>px) · <!> · '), Nt = /* @__PURE__ */ R("<label class=toy-radio><input type=radio name=toy-easing><span>"), Pt = /* @__PURE__ */ R("<label class=toy-radio><input type=radio name=toy-duration><span>--duration-");
const _t = ["ease-out", "ease-in-out", "spring"], Dt = ["fast", "base", "slow"], Lt = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, Rt = () => {
  const [e, t] = A(0), [n, s] = A(0), [r, o] = A(!1), [a, i] = A(!1), [l, d] = A("ease-out"), [u, c] = A("base");
  let w = 0, S = 0, h = null, v = {
    x: 0,
    y: 0
  }, k = {
    t: 0,
    x: 0,
    y: 0
  };
  const p = () => {
    cancelAnimationFrame(w), i(!1);
  }, g = () => {
    i(!0);
    let f = e(), P = n(), T = v.x, b = v.y, _ = performance.now();
    const z = (q) => {
      const x = Math.min((q - _) / 1e3, 0.03333333333333333);
      _ = q;
      const X = 16;
      if (T += (-170 * f - X * T) * x, b += (-170 * P - X * b) * x, f += T * x, P += b * x, Math.hypot(f, P) < 0.5 && Math.hypot(T, b) < 1) {
        t(0), s(0), i(!1);
        return;
      }
      t(f), s(P), w = requestAnimationFrame(z);
    };
    w = requestAnimationFrame(z);
  }, m = () => {
    if (Lt()) {
      t(0), s(0);
      return;
    }
    l() === "spring" ? g() : (t(0), s(0));
  }, C = (f) => {
    p(), f.currentTarget.setPointerCapture(f.pointerId), h = {
      px: f.clientX,
      py: f.clientY,
      x: e(),
      y: n()
    }, k = {
      t: performance.now(),
      x: e(),
      y: n()
    }, v = {
      x: 0,
      y: 0
    }, o(!0);
  }, L = (f) => {
    if (!h) return;
    const P = h.x + f.clientX - h.px, T = h.y + f.clientY - h.py, b = performance.now(), _ = (b - k.t) / 1e3;
    _ > 0 && (v = {
      x: (P - k.x) / _,
      y: (T - k.y) / _
    }, k = {
      t: b,
      x: P,
      y: T
    }), t(P), s(T);
  }, I = () => {
    h && (h = null, o(!1), m());
  }, E = (f) => {
    const b = {
      ArrowLeft: [-32, 0],
      ArrowRight: [32, 0],
      ArrowUp: [0, -32],
      ArrowDown: [0, 32]
    }[f.key];
    b ? (f.preventDefault(), p(), v = {
      x: b[0] * 6,
      y: b[1] * 6
    }, t(e() + b[0]), s(n() + b[1]), window.clearTimeout(S), S = window.setTimeout(m, 350)) : (f.key === "Enter" || f.key === " ") && (f.preventDefault(), p(), v = {
      x: 0,
      y: -240
    }, s(-48), window.clearTimeout(S), S = window.setTimeout(m, 60));
  };
  ce(() => {
    cancelAnimationFrame(w), window.clearTimeout(S);
  });
  const B = () => r() || a() || l() === "spring" ? "none" : `transform var(--duration-${u()}) var(--ease-${l()})`;
  return (() => {
    var f = Mt(), P = f.firstChild, T = P.firstChild, b = P.nextSibling, _ = b.firstChild;
    _.firstChild;
    var z = _.nextSibling;
    z.firstChild;
    var q = b.nextSibling, x = q.firstChild, X = x.firstChild, ne = X.nextSibling, he = ne.nextSibling, se = he.nextSibling, fe = se.nextSibling, ie = fe.nextSibling;
    return ie.nextSibling, T.$$keydown = E, T.addEventListener("pointercancel", I), T.$$pointerup = I, T.$$pointermove = L, T.$$pointerdown = C, y(_, M(ae, {
      each: _t,
      children: ($) => (() => {
        var W = Nt(), F = W.firstChild, U = F.nextSibling;
        return F.$$input = () => d($), F.value = $, y(U, $ === "spring" ? "spring (rAF)" : `--ease-${$}`), O(() => F.checked = l() === $), W;
      })()
    }), null), y(z, M(ae, {
      each: Dt,
      children: ($) => (() => {
        var W = Pt(), F = W.firstChild, U = F.nextSibling;
        return U.firstChild, F.$$input = () => c($), F.value = $, y(U, $, null), O(() => F.checked = u() === $), W;
      })()
    }), null), y(x, () => Math.round(e()), ne), y(x, () => Math.round(n()), se), y(x, () => r() ? "--shadow-lg" : "--shadow-md", ie), y(x, (() => {
      var $ = pe(() => l() === "spring");
      return () => $() ? "spring k=170 c=16" : `--ease-${l()} / --duration-${u()}`;
    })(), null), O(($) => {
      var W = !!r(), F = `translate(${e()}px, ${n()}px)`, U = B(), Ae = l() === "spring";
      return W !== $.e && T.classList.toggle("is-dragging", $.e = W), F !== $.t && $e(T, "transform", $.t = F), U !== $.a && $e(T, "transition", $.a = U), Ae !== $.o && (z.disabled = $.o = Ae), $;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), f;
  })();
};
Q(["pointerdown", "pointermove", "pointerup", "keydown", "input"]);
var Ot = /* @__PURE__ */ R("<p class=smiski-fallback>This one needs WebGL — your browser sat this experiment out."), It = /* @__PURE__ */ R('<div class=smiski><div class=smiski-arena tabindex=0 role=application aria-label="Ragdoll toy. Drag him with the pointer, shove him with the arrow keys, or press Enter to toss him in the air."></div><div class=smiski-controls><button type=button class=smiski-button>toss him</button><button type=button class=smiski-button>back in the box</button><p class=smiski-readout aria-hidden=true><code>6 bodies · 5 joints · ');
const Bt = {
  napping: "napping · zzz",
  settling: "settling down",
  tumbling: "tumbling!",
  grabbed: "grabbed — fling him"
}, zt = () => {
  const [e, t] = A("loading"), [n, s] = A(!1);
  let r, o, a = !1;
  Le(() => {
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
    l.observe(r), ce(() => {
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
    var l = It(), d = l.firstChild, u = d.nextSibling, c = u.firstChild, w = c.nextSibling, S = w.nextSibling, h = S.firstChild;
    h.firstChild, d.$$keydown = i;
    var v = r;
    return typeof v == "function" ? le(v, d) : r = d, y(d, M(Z, {
      get when() {
        return n();
      },
      get children() {
        return Ot();
      }
    })), c.$$click = () => o?.toss(), w.$$click = () => o?.reset(), y(h, (() => {
      var k = pe(() => e() === "loading");
      return () => k() ? "loading…" : Bt[e()];
    })(), null), l;
  })();
};
Q(["keydown", "click"]);
const Ht = `import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { fuzzyMatch } from "./fuzzy";

type Item = { label: string; hint: string; href: string };

const ITEMS: Item[] = [
  { label: "Home", hint: "page", href: "/" },
  { label: "Work — all projects", hint: "page", href: "/projects" },
  { label: "Waddl case study", hint: "page", href: "/waddl" },
  { label: "The Playground", hint: "page", href: "/playground" },
  { label: "Design system", hint: "page", href: "/design" },
  { label: "Resume", hint: "page", href: "/resume" },
  { label: "Research — how people think", hint: "section", href: "/#research" },
  { label: "Principles — how I build", hint: "section", href: "/#principles" },
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
                <li class="palette-empty">nothing matches “{query()}” — try “work” or “playground”</li>
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
`, Ft = `export type FuzzyResult = { score: number; indexes: number[] };

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
`, Kt = `import { createMemo, createSignal } from "solid-js";

// Phrases from around this site — type a few letters and the rest appears
// as editor-style ghost text.
const CORPUS = [
  "interfaces that speak fluent human",
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
`, Wt = `import { For, createSignal } from "solid-js";

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
`, qt = `import { Show, createSignal, onCleanup } from "solid-js";

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
`, Ut = `import { For, createSignal, onCleanup } from "solid-js";

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
`, Vt = `import { Show, createSignal, onCleanup, onMount } from "solid-js";
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
`, Gt = `import * as THREE from "three";
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
`, te = (e, t) => {
  const n = document.getElementById(e);
  n && Je(t, n);
};
te("exp-palette", () => M(ee, {
  source: `${Ht}

// fuzzy.ts
${Ft}`,
  sourceName: "CommandPalette.tsx",
  get children() {
    return M(ft, {});
  }
}));
te("exp-ghost", () => M(ee, {
  source: Kt,
  sourceName: "GhostText.tsx",
  get children() {
    return M(yt, {});
  }
}));
te("exp-diff", () => M(ee, {
  source: Wt,
  sourceName: "AnimatedDiff.tsx",
  get children() {
    return M(xt, {});
  }
}));
te("exp-stream", () => M(ee, {
  source: qt,
  sourceName: "StreamRenderer.tsx",
  get children() {
    return M(At, {});
  }
}));
te("exp-toy", () => M(ee, {
  source: Ut,
  sourceName: "MotionToy.tsx",
  get children() {
    return M(Rt, {});
  }
}));
te("exp-smiski", () => M(ee, {
  source: `${Vt}

// smiski-scene.ts
${Gt}`,
  sourceName: "SmiskiBox.tsx",
  get children() {
    return M(zt, {});
  }
}));
