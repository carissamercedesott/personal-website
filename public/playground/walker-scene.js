import { W as Xe, S as Fe, O as Ie, H as He, D as Ve, b as Qe, V as J, B as G, c as fe, g as Ge, o as _e, M as $e, C as je, E as ze, Q as K, j as tt, m as i, n as Oe, R as Ze, l as Ue } from "./smiski-rig.js";
const S = 92, ge = 0.9, Je = 2.6, P = (b) => {
  const M = i.clamp(b, 0, 1);
  return M * M * (3 - 2 * M);
}, to = () => {
  const b = document.createElement("div");
  b.className = "smiski-walker", b.setAttribute("aria-hidden", "true");
  const M = new Xe({ antialias: !0, alpha: !0 });
  M.setPixelRatio(Math.min(window.devicePixelRatio, 2)), b.appendChild(M.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", b.appendChild(r);
  const C = document.createElement("div");
  C.className = "smiski-bubble", b.appendChild(C), document.body.appendChild(b), document.documentElement.classList.add("smiski-live");
  const _ = new Fe(), R = new Ie(0, 1, 1, 0, -10, 20);
  R.position.z = 6, _.add(new He(16775407, 12167325, 1.15));
  const Nt = new Ve(16777215, 1.5);
  Nt.position.set(2, 6, 4), _.add(Nt);
  const d = new Qe({ gravity: new J(0, -9.8, 0) });
  d.allowSleep = !0, d.solver.iterations = 12, d.defaultContactMaterial.friction = 0.5, d.defaultContactMaterial.restitution = 0.25;
  const Yt = new G({ type: G.STATIC, shape: new fe() });
  Yt.quaternion.setFromEuler(-Math.PI / 2, 0, 0), d.addBody(Yt);
  const $ = (t) => {
    const e = new G({ type: G.STATIC, shape: new fe() });
    return e.quaternion.setFromVectors(new J(0, 0, 1), new J(...t)), d.addBody(e), e;
  }, be = $([1, 0, 0]), Me = $([-1, 0, 0]), xe = $([0, -1, 0]);
  $([0, 0, 1]).position.set(0, 0, -0.75), $([0, 0, -1]).position.set(0, 0, 0.75);
  const s = Ge(d);
  _.add(s.group);
  const wt = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && wt.push(t);
  });
  const ft = new _e({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), T = new $e(new je(0.34, 24), ft), et = (t) => T.scale.set(t, t * 0.26, 1);
  T.position.y = 0.05, et(1), _.add(T);
  let gt = 0.16;
  const bt = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, gt = e ? 0.3 : 0.16;
  };
  bt(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", bt), new MutationObserver(bt).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Dt = document.querySelector("[data-smiski-perch]"), Xt = document.querySelector("[data-smiski-ring]"), ot = document.querySelector("[data-smiski-study]"), Ft = document.querySelector("[data-smiski-farewell]"), It = document.querySelector(".intro"), Ee = 64;
  let st = 1, h = 1, W = 1, j = 1, Ht = 1, nt = 400, Mt = 700, at = 900, it = 1200;
  const Vt = () => {
    if (Ht = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !It) return;
    const t = It.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    nt = e - h * 0.68, Mt = Math.max(nt + 120, e - Ee - 56), at = Math.max(o - h * 0.5, Mt + 80), it = Math.max(o - h * 0.1, at + 240);
  }, Qt = () => {
    st = window.innerWidth, h = window.innerHeight, M.setSize(st, h), W = st / S, j = h / S, R.right = W, R.top = j, R.updateProjectionMatrix(), be.position.set(0.2, 0, 0), Me.position.set(W - 0.2, 0, 0), xe.position.set(0, j - 0.15, 0), Vt();
  };
  Qt(), window.addEventListener("resize", Qt);
  const z = 0.715, A = () => ge, Gt = () => Math.max(ge + 0.5, W - Je), xt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / S,
      y: (h - (e.top + e.height / 2)) / S
    };
  }, Et = new tt(A(), z, 0), rt = new K(), _t = new K(), kt = new K(), $t = new tt(), jt = new tt(), ct = new ze();
  let y = 1;
  const ke = 1.5, O = (t, e, o, n, l) => {
    ct.set(n, 0, l), _t.setFromEuler(ct), kt.copy(rt).multiply(_t), jt.set(...o).applyQuaternion(kt).multiplyScalar(y), $t.set(...e).applyQuaternion(rt).multiplyScalar(y), t.mesh.position.copy(Et).add($t).add(jt), t.mesh.quaternion.copy(kt), t.mesh.scale.setScalar(y);
  };
  let zt = 0;
  const Z = (t, e = 4600) => {
    C.textContent = t, C.classList.add("is-visible"), window.clearTimeout(zt), zt = window.setTimeout(
      () => C.classList.remove("is-visible"),
      e
    );
  }, Ot = new Ze(), Zt = new Oe(), lt = new G({ type: G.STATIC });
  d.addBody(lt);
  let x = null, w = "flow", p = 0, m = 0, pt = 0, B = 0, Ut = !1, k = A(), u = 0.22, mt = 1, N = 0, E = 0, dt = 0, vt = 0, L = 0;
  const Y = s.parts.map(
    () => ({ pos: new tt(), quat: new K() })
  ), ht = s.parts.map(
    () => ({ pos: new tt(), quat: new K() })
  );
  let D = !1, St = 0, X = 0, Ct = 10, c = 0, Tt = !1, F = 0, Lt = !1, q = 10, Jt = 1.6;
  const qt = 2.1, ve = () => q >= qt ? 0 : Math.min(P(q / 0.35), P((qt - q) / 0.45)), Kt = () => m > 0 ? "walk" : p >= 1 ? "ring" : p <= 0 ? "hero" : "drop", te = (t) => {
    const e = M.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / S,
      y: (e.bottom - t.clientY) / S,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, ee = (t) => {
    try {
      r.setPointerCapture(t);
    } catch {
    }
  }, Se = (t) => {
    const e = Kt();
    if (w === "flow" && (e === "ring" || e === "drop")) {
      D = !0, Ct = 0, St = t.clientX, ee(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (w === "flow" && e === "hero") {
      q = 0, Z("hi!", 1400), t.preventDefault();
      return;
    }
    Ce(t);
  }, Ce = (t) => {
    const e = te(t);
    Zt.set(e.ndcX, e.ndcY), Ot.setFromCamera(Zt, R);
    const o = Ot.intersectObject(s.group, !0)[0], n = o?.object.userData.body ?? s.byName.torso.body;
    w = "ragdoll", vt = 0, y = 1, s.parts.forEach((a) => a.mesh.scale.setScalar(1)), s.wake();
    const l = o ? new J(o.point.x, o.point.y, o.point.z) : n.position.clone();
    lt.position.copy(l), x = new Ue(
      n,
      n.pointToLocalFrame(l),
      lt,
      new J(0, 0, 0),
      40
    ), d.addConstraint(x), ee(t.pointerId), r.style.cursor = "grabbing", Z("!!", 900), t.preventDefault();
  }, Te = (t) => {
    if (D) {
      const o = t.clientX - St;
      St = t.clientX, u += o * 0.011, X = i.clamp(0.6 * X + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!x) return;
    const e = te(t);
    lt.position.set(
      i.clamp(e.x, 0.3, W - 0.3),
      i.clamp(e.y, 0.2, j - 0.2),
      0
    ), x.bodyA.wakeUp();
  }, oe = () => {
    if (D) {
      D = !1, r.style.cursor = "grab";
      return;
    }
    if (x) {
      d.removeConstraint(x), x = null, dt = 0, r.style.cursor = "grab";
      for (const t of s.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  r.addEventListener("pointerdown", Se), r.addEventListener("pointermove", Te), r.addEventListener("pointerup", oe), r.addEventListener("pointercancel", oe);
  let f = 0;
  const Pt = (t, e) => {
    const o = window.scrollY;
    p = P((o - nt) / Math.max(1, Mt - nt)), m = P((o - at) / Math.max(1, it - at));
    const n = 1 - p, l = p * (1 - m), a = p * m, I = i.clamp(
      (o - it) / Math.max(1, Ht - it),
      0,
      1
    ), v = A() + I * (Gt() - A()), Pe = k;
    k += (v - k) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const Rt = Math.abs(k - Pe) / Math.max(t, 1e-4), Wt = m > 0.6 && Math.abs(v - k) > 0.04 && Rt > 0.02;
    Wt && (mt = Math.sign(v - k) || mt), E += ((Wt ? Math.min(1, Rt / 1.1) : 0) - E) * Math.min(1, t * 8), N += Rt * t * 9 * a;
    const At = Dt ? xt(Dt) : { x: A(), y: z }, ce = Xt ? xt(Xt) : { x: W / 2, y: j * 0.55 }, le = { x: At.x, y: At.y + 0.22 + Math.sin(f * 1.8) * 0.012 }, yt = { x: ce.x, y: ce.y - 0.06 + Math.sin(f * 1.5) * 0.055 }, Re = Math.abs(Math.sin(N)) * 0.05 * E + Math.sin(f * 1.8) * 8e-3 * (1 - E), pe = { x: k, y: z + Re };
    let me = 0;
    if (ot && m >= 1 && w === "flow") {
      const g = ot.getBoundingClientRect(), U = (g.top + g.height / 2) / h;
      me = P((1 - Math.abs(U - 0.5) / 0.55) * 1.6);
    }
    c += (me - c) * Math.min(1, t * (e ? 60 : 7)), c > 0.75 && !Tt ? (Tt = !0, Z("hmm — the laws.", 2200)) : c < 0.1 && (Tt = !1);
    let de = 0;
    if (Ft && m >= 1 && w === "flow") {
      const g = Ft.getBoundingClientRect(), U = (g.top + g.height / 2) / h;
      de = P((1 - Math.abs(U - 0.5) / 0.55) * 1.6);
    }
    F += (de - F) * Math.min(1, t * (e ? 60 : 7)), F > 0.75 && !Lt ? (Lt = !0, Z("thanks for stopping by!", 5200)) : F < 0.1 && (Lt = !1);
    let H, V;
    if (m > 0) {
      if (H = i.lerp(yt.x, pe.x, m), V = i.lerp(yt.y, pe.y, m), c > 1e-3 && ot) {
        const g = xt(ot);
        H = i.lerp(H, g.x, c), V = i.lerp(
          V,
          g.y + Math.sin(f * 1.6) * 0.015,
          c
        );
      }
    } else
      H = i.lerp(le.x, yt.x, p), V = i.lerp(le.y, yt.y, p) + Math.sin(p * Math.PI) * 0.3;
    const he = e ? 1 : 1 - Math.exp(-t * 10);
    if (!Ut || e ? (pt = H, B = V, Ut = !0) : (pt += (H - pt) * he, B += (V - B) * he), m > 0) {
      u = i.euclideanModulo(u + Math.PI, Math.PI * 2) - Math.PI;
      const g = Wt ? mt * 0.85 : mt * 0.12, U = Math.max(c, F), De = i.lerp(g, 0.1, U);
      u += (De - u) * Math.min(1, t * 5);
    } else p >= 1 ? (Ct += t, D || (u += X * t, X *= Math.exp(-t * 1.6), u += 0.4 * P((Ct - 1.2) / 1.5) * t)) : p > 0 ? (u = 0.22 + p * Math.PI * 2, X = 0) : (u += (0.22 - u) * Math.min(1, t * 4), q += t, f > Jt && q > qt + 1 && (Jt = f + 6 + Math.random() * 4, q = 0));
    const Bt = n > 0.3 ? ve() : 0, ue = a * F, We = 2.55 + Math.sin(f * 7.5) * 0.42, ye = Math.sin(N) * 0.55 * E, we = Math.sin(N) * 0.45 * E, Ae = Math.sin(N * 2) * 0.045 * E, Be = i.lerp(
      0.2,
      2.55 + Math.sin(f * 7.5) * 0.42,
      Bt
    ), Ne = i.lerp(-0.5, 0, Bt), Ye = n * -0.1 + a * 0.06 * E;
    ct.set(Ye, u, 0, "YXZ"), rt.setFromEuler(ct), Et.set(pt, B, 0), y = 1 + l * (ke - 1), s.byName.torso.mesh.position.copy(Et), s.byName.torso.mesh.quaternion.copy(rt), s.byName.torso.mesh.scale.setScalar(y);
    const Q = a * c;
    O(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + a * Ae + Q * 0.12,
      n * Bt * 0.14 + Q * 0.16
    ), O(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + a * -we * (1 - c) + Q * -0.18,
      n * -0.2 + l * -2.1 + Q * -0.28
    ), O(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * Ne + a * we * (1 - c) * (1 - ue) + Q * -0.42,
      n * Be + l * 2.1 + Q * 2.3 + ue * We
    ), O(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * ye,
      n * -0.14 + l * -0.5
    ), O(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * -ye,
      n * 0.14 + l * 0.5
    ), s.syncBodies(), m > 0 ? (T.position.y = i.lerp(
      0.05,
      B + s.footY + 0.03,
      c
    ), et(
      i.clamp(
        i.lerp(1.2 - (B - z) * 0.45, 1, c),
        0.35,
        1.2
      )
    )) : (T.position.y = At.y - 0.38, et(1.05)), ft.opacity = gt * (n * 0.85 + a);
  }, Le = () => {
    w = "rise", L = 0;
    const t = s.byName.torso.body;
    k = i.clamp(t.position.x, A(), Gt()), N = 0, E = 0, X = 0, s.parts.forEach((e, o) => {
      Y[o].pos.copy(e.body.position), Y[o].quat.copy(e.body.quaternion);
    }), Pt(1 / 60, !0), s.parts.forEach((e, o) => {
      ht[o].pos.copy(e.mesh.position), ht[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(Y[o].pos), e.mesh.quaternion.copy(Y[o].quat);
    });
  };
  let se = 2.5, ut = 0;
  const qe = (t, e) => {
    ut > 0 ? (ut -= t, ut <= 0 && wt.forEach((o) => o.scale.setY(1.7))) : e > se && (se = e + 2.8 + Math.random() * 3.5, ut = 0.13, wt.forEach((o) => o.scale.setY(0.2)));
  };
  let ne = performance.now(), ae = 0, ie = null;
  const re = (t) => {
    requestAnimationFrame(re);
    const e = Math.min((t - ne) / 1e3, 0.05);
    if (ne = t, f += e, ae += 1, ae % 180 === 0 && Vt(), w === "flow") {
      Pt(e, !1);
      const a = Kt();
      a !== ie && !D && !x && (r.style.cursor = a === "hero" ? "pointer" : "grab", ie = a);
    } else if (w === "ragdoll")
      d.step(1 / 60, e, 3), s.syncMeshes(), ft.opacity = gt, x || (dt = Math.max(...s.parts.map((I) => I.body.velocity.length())) < 0.4 ? dt + e : 0, vt += e, (dt > 0.55 || vt > 3.5) && Le());
    else {
      L = Math.min(1, L + e / 0.7);
      const a = L * L * (3 - 2 * L);
      s.parts.forEach((I, v) => {
        I.mesh.position.lerpVectors(Y[v].pos, ht[v].pos, a), I.mesh.quaternion.slerpQuaternions(
          Y[v].quat,
          ht[v].quat,
          a
        );
      }), s.syncBodies(), L >= 1 && (w = "flow");
    }
    const o = s.byName.torso.mesh.position;
    if (T.position.x = o.x, w !== "flow") {
      T.position.y = 0.05;
      const a = i.clamp(1.2 - (o.y - z) * 0.45, 0.35, 1.2);
      et(a);
    }
    const n = o.x * S, l = o.y * S;
    r.style.transform = `translate(${n - 60 * y}px, ${h - l - 95 * y}px) scale(${y.toFixed(3)})`, C.style.left = `${i.clamp(n, 90, st - 90)}px`, C.style.bottom = `${i.clamp(l + 110 * y, 60, h - 30)}px`, qe(e, f), M.render(_, R);
  };
  Pt(1 / 60, !0), b.classList.add("is-active"), window.setTimeout(
    () => Z("hi! i'll show you around", 4200),
    900
  ), requestAnimationFrame(re);
};
export {
  to as createSmiskiWalker
};
