import { W as ve, S as Ce, O as Le, H as Pe, D as Te, b as qe, V as G, B as Y, c as re, g as Ne, o as Re, M as We, C as Ae, E as Be, Q as $, j, m as i, n as Xe, R as Ye, l as De } from "./smiski-rig.js";
const k = 92, ce = 0.9, Ie = 2.6, z = (y) => {
  const w = i.clamp(y, 0, 1);
  return w * w * (3 - 2 * w);
}, Ve = () => {
  const y = document.createElement("div");
  y.className = "smiski-walker", y.setAttribute("aria-hidden", "true");
  const w = new ve({ antialias: !0, alpha: !0 });
  w.setPixelRatio(Math.min(window.devicePixelRatio, 2)), y.appendChild(w.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", y.appendChild(r);
  const S = document.createElement("div");
  S.className = "smiski-bubble", y.appendChild(S), document.body.appendChild(y), document.documentElement.classList.add("smiski-live");
  const D = new Ce(), T = new Le(0, 1, 1, 0, -10, 20);
  T.position.z = 6, D.add(new Pe(16775407, 12167325, 1.15));
  const Tt = new Te(16777215, 1.5);
  Tt.position.set(2, 6, 4), D.add(Tt);
  const p = new qe({ gravity: new G(0, -9.8, 0) });
  p.allowSleep = !0, p.solver.iterations = 12, p.defaultContactMaterial.friction = 0.5, p.defaultContactMaterial.restitution = 0.25;
  const qt = new Y({ type: Y.STATIC, shape: new re() });
  qt.quaternion.setFromEuler(-Math.PI / 2, 0, 0), p.addBody(qt);
  const I = (t) => {
    const e = new Y({ type: Y.STATIC, shape: new re() });
    return e.quaternion.setFromVectors(new G(0, 0, 1), new G(...t)), p.addBody(e), e;
  }, le = I([1, 0, 0]), pe = I([-1, 0, 0]), me = I([0, -1, 0]);
  I([0, 0, 1]).position.set(0, 0, -0.75), I([0, 0, -1]).position.set(0, 0, 0.75);
  const s = Ne(p);
  D.add(s.group);
  const pt = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && pt.push(t);
  });
  const mt = new Re({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), v = new We(new Ae(0.34, 24), mt), O = (t) => v.scale.set(t, t * 0.26, 1);
  v.position.y = 0.05, O(1), D.add(v);
  let dt = 0.16;
  const ht = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, dt = e ? 0.3 : 0.16;
  };
  ht(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ht), new MutationObserver(ht).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Nt = document.querySelector("[data-smiski-perch]"), Rt = document.querySelector("[data-smiski-ring]"), Wt = document.querySelector(".intro");
  let _ = 1, d = 1, q = 1, F = 1, At = 1, ut = 400, yt = 700, U = 900, Z = 1200;
  const Bt = () => {
    if (At = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !Wt) return;
    const t = Wt.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    ut = e - d * 0.68, yt = e - d * 0.05, U = Math.max(o - d * 0.5, yt + 80), Z = Math.max(o - d * 0.1, U + 240);
  }, Xt = () => {
    _ = window.innerWidth, d = window.innerHeight, w.setSize(_, d), q = _ / k, F = d / k, T.right = q, T.top = F, T.updateProjectionMatrix(), le.position.set(0.2, 0, 0), pe.position.set(q - 0.2, 0, 0), me.position.set(0, F - 0.15, 0), Bt();
  };
  Xt(), window.addEventListener("resize", Xt);
  const V = 0.715, N = () => ce, Yt = () => Math.max(ce + 0.5, q - Ie), Dt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / k,
      y: (d - (e.top + e.height / 2)) / k
    };
  }, wt = new j(N(), V, 0), J = new $(), It = new $(), ft = new $(), Ft = new j(), Vt = new j(), K = new Be();
  let h = 1;
  const de = 1.5, H = (t, e, o, n, c) => {
    K.set(n, 0, c), It.setFromEuler(K), ft.copy(J).multiply(It), Vt.set(...o).applyQuaternion(ft).multiplyScalar(h), Ft.set(...e).applyQuaternion(J).multiplyScalar(h), t.mesh.position.copy(wt).add(Ft).add(Vt), t.mesh.quaternion.copy(ft), t.mesh.scale.setScalar(h);
  };
  let Ht = 0;
  const tt = (t, e = 4600) => {
    S.textContent = t, S.classList.add("is-visible"), window.clearTimeout(Ht), Ht = window.setTimeout(
      () => S.classList.remove("is-visible"),
      e
    );
  }, Qt = new Ye(), Gt = new Xe(), et = new Y({ type: Y.STATIC });
  p.addBody(et);
  let f = null, g = "flow", l = 0, u = 0, ot = 0, Q = 0, $t = !1, M = N(), m = 0.22, st = 1, R = 0, b = 0, nt = 0, bt = 0, C = 0;
  const W = s.parts.map(
    () => ({ pos: new j(), quat: new $() })
  ), at = s.parts.map(
    () => ({ pos: new j(), quat: new $() })
  );
  let A = !1, gt = 0, B = 0, Mt = 10, L = 10, jt = 1.6;
  const xt = 2.1, he = () => L >= xt ? 0 : Math.min(z(L / 0.35), z((xt - L) / 0.45)), Et = () => u > 0 ? "walk" : l >= 1 ? "ring" : l <= 0 ? "hero" : "drop", zt = (t) => {
    const e = w.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / k,
      y: (e.bottom - t.clientY) / k,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  };
  let P = null;
  const kt = (t) => {
    try {
      r.setPointerCapture(t);
    } catch {
    }
  }, ue = (t) => {
    const e = Et();
    if (g === "flow" && (e === "ring" || e === "drop")) {
      A = !0, Mt = 0, gt = t.clientX, kt(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (g === "flow" && e === "hero") {
      P = { x: t.clientX, y: t.clientY }, kt(t.pointerId), t.preventDefault();
      return;
    }
    Ot(t);
  }, Ot = (t) => {
    const e = zt(t);
    Gt.set(e.ndcX, e.ndcY), Qt.setFromCamera(Gt, T);
    const o = Qt.intersectObject(s.group, !0)[0], n = o?.object.userData.body ?? s.byName.torso.body;
    g = "ragdoll", bt = 0, h = 1, s.parts.forEach((a) => a.mesh.scale.setScalar(1)), s.wake();
    const c = o ? new G(o.point.x, o.point.y, o.point.z) : n.position.clone();
    et.position.copy(c), f = new De(
      n,
      n.pointToLocalFrame(c),
      et,
      new G(0, 0, 0),
      40
    ), p.addConstraint(f), kt(t.pointerId), r.style.cursor = "grabbing", tt("!!", 900), t.preventDefault();
  }, ye = (t) => {
    if (P) {
      Math.hypot(
        t.clientX - P.x,
        t.clientY - P.y
      ) > 8 && (P = null, Ot(t));
      return;
    }
    if (A) {
      const o = t.clientX - gt;
      gt = t.clientX, m += o * 0.011, B = i.clamp(0.6 * B + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!f) return;
    const e = zt(t);
    et.position.set(
      i.clamp(e.x, 0.3, q - 0.3),
      i.clamp(e.y, 0.2, F - 0.2),
      0
    ), f.bodyA.wakeUp();
  }, _t = () => {
    if (P) {
      P = null, L = 0, tt("hi!", 1400);
      return;
    }
    if (A) {
      A = !1, r.style.cursor = "grab";
      return;
    }
    if (f) {
      p.removeConstraint(f), f = null, nt = 0, r.style.cursor = "grab";
      for (const t of s.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  r.addEventListener("pointerdown", ue), r.addEventListener("pointermove", ye), r.addEventListener("pointerup", _t), r.addEventListener("pointercancel", _t);
  let x = 0;
  const St = (t, e) => {
    const o = window.scrollY;
    l = z((o - ut) / Math.max(1, yt - ut)), u = z((o - U) / Math.max(1, Z - U));
    const n = 1 - l, c = l * (1 - u), a = l * u, X = i.clamp(
      (o - Z) / Math.max(1, At - Z),
      0,
      1
    ), E = N() + X * (Yt() - N()), be = M;
    M += (E - M) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const vt = Math.abs(M - be) / Math.max(t, 1e-4), Ct = u > 0.6 && Math.abs(E - M) > 0.04 && vt > 0.02;
    Ct && (st = Math.sign(E - M) || st), b += ((Ct ? Math.min(1, vt / 1.1) : 0) - b) * Math.min(1, t * 8), R += vt * t * 9 * a;
    const Lt = Nt ? Dt(Nt) : { x: N(), y: V }, ee = Rt ? Dt(Rt) : { x: q / 2, y: F * 0.55 }, oe = { x: Lt.x, y: Lt.y + 0.22 + Math.sin(x * 1.8) * 0.012 }, rt = { x: ee.x, y: ee.y - 0.06 + Math.sin(x * 1.5) * 0.055 }, ge = Math.abs(Math.sin(R)) * 0.05 * b + Math.sin(x * 1.8) * 8e-3 * (1 - b), se = { x: M, y: V + ge };
    let ct, lt;
    u > 0 ? (ct = i.lerp(rt.x, se.x, u), lt = i.lerp(rt.y, se.y, u)) : (ct = i.lerp(oe.x, rt.x, l), lt = i.lerp(oe.y, rt.y, l) + Math.sin(l * Math.PI) * 0.3);
    const ne = e ? 1 : 1 - Math.exp(-t * 10);
    if (!$t || e ? (ot = ct, Q = lt, $t = !0) : (ot += (ct - ot) * ne, Q += (lt - Q) * ne), u > 0) {
      m = i.euclideanModulo(m + Math.PI, Math.PI * 2) - Math.PI;
      const Se = Ct ? st * 0.85 : st * 0.12;
      m += (Se - m) * Math.min(1, t * 5);
    } else l >= 1 ? (Mt += t, A || (m += B * t, B *= Math.exp(-t * 1.6), m += 0.4 * z((Mt - 1.2) / 1.5) * t)) : l > 0 ? (m = 0.22 + l * Math.PI * 2, B = 0) : (m += (0.22 - m) * Math.min(1, t * 4), L += t, x > jt && L > xt + 1 && (jt = x + 6 + Math.random() * 4, L = 0));
    const Pt = n > 0.3 ? he() : 0, ae = Math.sin(R) * 0.55 * b, ie = Math.sin(R) * 0.45 * b, Me = Math.sin(R * 2) * 0.045 * b, xe = i.lerp(
      0.2,
      2.55 + Math.sin(x * 7.5) * 0.42,
      Pt
    ), Ee = i.lerp(-0.5, 0, Pt), ke = n * -0.1 + a * 0.06 * b;
    K.set(ke, m, 0, "YXZ"), J.setFromEuler(K), wt.set(ot, Q, 0), h = 1 + c * (de - 1), s.byName.torso.mesh.position.copy(wt), s.byName.torso.mesh.quaternion.copy(J), s.byName.torso.mesh.scale.setScalar(h), H(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + a * Me,
      n * Pt * 0.14
    ), H(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + a * -ie,
      n * -0.2 + c * -2.1
    ), H(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * Ee + a * ie,
      n * xe + c * 2.1
    ), H(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * ae,
      n * -0.14 + c * -0.5
    ), H(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * -ae,
      n * 0.14 + c * 0.5
    ), s.syncBodies(), u > 0 ? (v.position.y = 0.05, O(i.clamp(1.2 - (Q - V) * 0.45, 0.35, 1.2))) : (v.position.y = Lt.y - 0.38, O(1.05)), mt.opacity = dt * (n * 0.85 + a);
  }, we = () => {
    g = "rise", C = 0;
    const t = s.byName.torso.body;
    M = i.clamp(t.position.x, N(), Yt()), R = 0, b = 0, B = 0, s.parts.forEach((e, o) => {
      W[o].pos.copy(e.body.position), W[o].quat.copy(e.body.quaternion);
    }), St(1 / 60, !0), s.parts.forEach((e, o) => {
      at[o].pos.copy(e.mesh.position), at[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(W[o].pos), e.mesh.quaternion.copy(W[o].quat);
    });
  };
  let Ut = 2.5, it = 0;
  const fe = (t, e) => {
    it > 0 ? (it -= t, it <= 0 && pt.forEach((o) => o.scale.setY(1.7))) : e > Ut && (Ut = e + 2.8 + Math.random() * 3.5, it = 0.13, pt.forEach((o) => o.scale.setY(0.2)));
  };
  let Zt = performance.now(), Jt = 0, Kt = null;
  const te = (t) => {
    requestAnimationFrame(te);
    const e = Math.min((t - Zt) / 1e3, 0.05);
    if (Zt = t, x += e, Jt += 1, Jt % 180 === 0 && Bt(), g === "flow") {
      St(e, !1);
      const a = Et();
      a !== Kt && !A && !f && (r.style.cursor = "grab", Kt = a);
    } else if (g === "ragdoll")
      p.step(1 / 60, e, 3), s.syncMeshes(), mt.opacity = dt, f || (nt = Math.max(...s.parts.map((X) => X.body.velocity.length())) < 0.4 ? nt + e : 0, bt += e, (nt > 0.55 || bt > 3.5) && we());
    else {
      C = Math.min(1, C + e / 0.7);
      const a = C * C * (3 - 2 * C);
      s.parts.forEach((X, E) => {
        X.mesh.position.lerpVectors(W[E].pos, at[E].pos, a), X.mesh.quaternion.slerpQuaternions(
          W[E].quat,
          at[E].quat,
          a
        );
      }), s.syncBodies(), C >= 1 && (g = "flow", Et() === "hero" && tt("phew!", 1600));
    }
    const o = s.byName.torso.mesh.position;
    if (v.position.x = o.x, g !== "flow") {
      v.position.y = 0.05;
      const a = i.clamp(1.2 - (o.y - V) * 0.45, 0.35, 1.2);
      O(a);
    }
    const n = o.x * k, c = o.y * k;
    r.style.transform = `translate(${n - 60 * h}px, ${d - c - 95 * h}px) scale(${h.toFixed(3)})`, S.style.left = `${i.clamp(n, 90, _ - 90)}px`, S.style.bottom = `${i.clamp(c + 110 * h, 60, d - 30)}px`, fe(e, x), w.render(D, T);
  };
  St(1 / 60, !0), y.classList.add("is-active"), window.setTimeout(
    () => tt("hi! scroll down — i'll give you the tour.", 4200),
    900
  ), requestAnimationFrame(te);
};
export {
  Ve as createSmiskiWalker
};
