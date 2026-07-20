import { W as qe, S as Re, O as We, H as Ne, D as Be, b as Ae, V as _, B as H, c as de, g as Ye, o as De, M as Xe, C as Fe, E as Ie, Q as U, j as Z, m as a, n as Ve, R as He, l as Qe } from "./smiski-rig.js";
const v = 92, he = 0.9, Ge = 2.6, Q = (w) => {
  const f = a.clamp(w, 0, 1);
  return f * f * (3 - 2 * f);
}, je = () => {
  const w = document.createElement("div");
  w.className = "smiski-walker", w.setAttribute("aria-hidden", "true");
  const f = new qe({ antialias: !0, alpha: !0 });
  f.setPixelRatio(Math.min(window.devicePixelRatio, 2)), w.appendChild(f.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", w.appendChild(r);
  const S = document.createElement("div");
  S.className = "smiski-bubble", w.appendChild(S), document.body.appendChild(w), document.documentElement.classList.add("smiski-live");
  const G = new Re(), q = new We(0, 1, 1, 0, -10, 20);
  q.position.z = 6, G.add(new Ne(16775407, 12167325, 1.15));
  const Nt = new Be(16777215, 1.5);
  Nt.position.set(2, 6, 4), G.add(Nt);
  const m = new Ae({ gravity: new _(0, -9.8, 0) });
  m.allowSleep = !0, m.solver.iterations = 12, m.defaultContactMaterial.friction = 0.5, m.defaultContactMaterial.restitution = 0.25;
  const Bt = new H({ type: H.STATIC, shape: new de() });
  Bt.quaternion.setFromEuler(-Math.PI / 2, 0, 0), m.addBody(Bt);
  const $ = (t) => {
    const e = new H({ type: H.STATIC, shape: new de() });
    return e.quaternion.setFromVectors(new _(0, 0, 1), new _(...t)), m.addBody(e), e;
  }, ue = $([1, 0, 0]), ye = $([-1, 0, 0]), we = $([0, -1, 0]);
  $([0, 0, 1]).position.set(0, 0, -0.75), $([0, 0, -1]).position.set(0, 0, 0.75);
  const s = Ye(m);
  G.add(s.group);
  const ht = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && ht.push(t);
  });
  const ut = new De({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), C = new Xe(new Fe(0.34, 24), ut), J = (t) => C.scale.set(t, t * 0.26, 1);
  C.position.y = 0.05, J(1), G.add(C);
  let yt = 0.16;
  const wt = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, yt = e ? 0.3 : 0.16;
  };
  wt(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", wt), new MutationObserver(wt).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const At = document.querySelector("[data-smiski-perch]"), Yt = document.querySelector("[data-smiski-ring]"), K = document.querySelector("[data-smiski-study]"), Dt = document.querySelector(".intro");
  let tt = 1, d = 1, R = 1, j = 1, Xt = 1, ft = 400, bt = 700, et = 900, ot = 1200;
  const Ft = () => {
    if (Xt = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !Dt) return;
    const t = Dt.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    ft = e - d * 0.68, bt = e - d * 0.05, et = Math.max(o - d * 0.5, bt + 80), ot = Math.max(o - d * 0.1, et + 240);
  }, It = () => {
    tt = window.innerWidth, d = window.innerHeight, f.setSize(tt, d), R = tt / v, j = d / v, q.right = R, q.top = j, q.updateProjectionMatrix(), ue.position.set(0.2, 0, 0), ye.position.set(R - 0.2, 0, 0), we.position.set(0, j - 0.15, 0), Ft();
  };
  It(), window.addEventListener("resize", It);
  const z = 0.715, W = () => he, Vt = () => Math.max(he + 0.5, R - Ge), gt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / v,
      y: (d - (e.top + e.height / 2)) / v
    };
  }, Mt = new Z(W(), z, 0), st = new U(), Ht = new U(), xt = new U(), Qt = new Z(), Gt = new Z(), nt = new Ie();
  let y = 1;
  const fe = 1.5, O = (t, e, o, n, l) => {
    nt.set(n, 0, l), Ht.setFromEuler(nt), xt.copy(st).multiply(Ht), Gt.set(...o).applyQuaternion(xt).multiplyScalar(y), Qt.set(...e).applyQuaternion(st).multiplyScalar(y), t.mesh.position.copy(Mt).add(Qt).add(Gt), t.mesh.quaternion.copy(xt), t.mesh.scale.setScalar(y);
  };
  let $t = 0;
  const at = (t, e = 4600) => {
    S.textContent = t, S.classList.add("is-visible"), window.clearTimeout($t), $t = window.setTimeout(
      () => S.classList.remove("is-visible"),
      e
    );
  }, jt = new He(), zt = new Ve(), it = new H({ type: H.STATIC });
  m.addBody(it);
  let b = null, g = "flow", p = 0, h = 0, rt = 0, N = 0, Ot = !1, E = W(), u = 0.22, ct = 1, B = 0, M = 0, lt = 0, Et = 0, L = 0;
  const A = s.parts.map(
    () => ({ pos: new Z(), quat: new U() })
  ), pt = s.parts.map(
    () => ({ pos: new Z(), quat: new U() })
  );
  let Y = !1, kt = 0, D = 0, vt = 10, c = 0, St = !1, T = 10, _t = 1.6;
  const Ct = 2.1, be = () => T >= Ct ? 0 : Math.min(Q(T / 0.35), Q((Ct - T) / 0.45)), Ut = () => h > 0 ? "walk" : p >= 1 ? "ring" : p <= 0 ? "hero" : "drop", Zt = (t) => {
    const e = f.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / v,
      y: (e.bottom - t.clientY) / v,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, Jt = (t) => {
    try {
      r.setPointerCapture(t);
    } catch {
    }
  }, ge = (t) => {
    const e = Ut();
    if (g === "flow" && (e === "ring" || e === "drop")) {
      Y = !0, vt = 0, kt = t.clientX, Jt(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (g === "flow" && e === "hero") {
      T = 0, at("hi!", 1400), t.preventDefault();
      return;
    }
    Me(t);
  }, Me = (t) => {
    const e = Zt(t);
    zt.set(e.ndcX, e.ndcY), jt.setFromCamera(zt, q);
    const o = jt.intersectObject(s.group, !0)[0], n = o?.object.userData.body ?? s.byName.torso.body;
    g = "ragdoll", Et = 0, y = 1, s.parts.forEach((i) => i.mesh.scale.setScalar(1)), s.wake();
    const l = o ? new _(o.point.x, o.point.y, o.point.z) : n.position.clone();
    it.position.copy(l), b = new Qe(
      n,
      n.pointToLocalFrame(l),
      it,
      new _(0, 0, 0),
      40
    ), m.addConstraint(b), Jt(t.pointerId), r.style.cursor = "grabbing", at("!!", 900), t.preventDefault();
  }, xe = (t) => {
    if (Y) {
      const o = t.clientX - kt;
      kt = t.clientX, u += o * 0.011, D = a.clamp(0.6 * D + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!b) return;
    const e = Zt(t);
    it.position.set(
      a.clamp(e.x, 0.3, R - 0.3),
      a.clamp(e.y, 0.2, j - 0.2),
      0
    ), b.bodyA.wakeUp();
  }, Kt = () => {
    if (Y) {
      Y = !1, r.style.cursor = "grab";
      return;
    }
    if (b) {
      m.removeConstraint(b), b = null, lt = 0, r.style.cursor = "grab";
      for (const t of s.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  r.addEventListener("pointerdown", ge), r.addEventListener("pointermove", xe), r.addEventListener("pointerup", Kt), r.addEventListener("pointercancel", Kt);
  let x = 0;
  const Lt = (t, e) => {
    const o = window.scrollY;
    p = Q((o - ft) / Math.max(1, bt - ft)), h = Q((o - et) / Math.max(1, ot - et));
    const n = 1 - p, l = p * (1 - h), i = p * h, X = a.clamp(
      (o - ot) / Math.max(1, Xt - ot),
      0,
      1
    ), k = W() + X * (Vt() - W()), ve = E;
    E += (k - E) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const Tt = Math.abs(E - ve) / Math.max(t, 1e-4), Pt = h > 0.6 && Math.abs(k - E) > 0.04 && Tt > 0.02;
    Pt && (ct = Math.sign(k - E) || ct), M += ((Pt ? Math.min(1, Tt / 1.1) : 0) - M) * Math.min(1, t * 8), B += Tt * t * 9 * i;
    const qt = At ? gt(At) : { x: W(), y: z }, ae = Yt ? gt(Yt) : { x: R / 2, y: j * 0.55 }, ie = { x: qt.x, y: qt.y + 0.22 + Math.sin(x * 1.8) * 0.012 }, dt = { x: ae.x, y: ae.y - 0.06 + Math.sin(x * 1.5) * 0.055 }, Se = Math.abs(Math.sin(B)) * 0.05 * M + Math.sin(x * 1.8) * 8e-3 * (1 - M), re = { x: E, y: z + Se };
    let ce = 0;
    if (K && h >= 1 && g === "flow") {
      const P = K.getBoundingClientRect(), Wt = (P.top + P.height / 2) / d;
      ce = Q((1 - Math.abs(Wt - 0.5) / 0.55) * 1.6);
    }
    c += (ce - c) * Math.min(1, t * (e ? 60 : 7)), c > 0.75 && !St ? (St = !0, at("hmm — the laws.", 2200)) : c < 0.1 && (St = !1);
    let F, I;
    if (h > 0) {
      if (F = a.lerp(dt.x, re.x, h), I = a.lerp(dt.y, re.y, h), c > 1e-3 && K) {
        const P = gt(K);
        F = a.lerp(F, P.x, c), I = a.lerp(
          I,
          P.y + Math.sin(x * 1.6) * 0.015,
          c
        );
      }
    } else
      F = a.lerp(ie.x, dt.x, p), I = a.lerp(ie.y, dt.y, p) + Math.sin(p * Math.PI) * 0.3;
    const le = e ? 1 : 1 - Math.exp(-t * 10);
    if (!Ot || e ? (rt = F, N = I, Ot = !0) : (rt += (F - rt) * le, N += (I - N) * le), h > 0) {
      u = a.euclideanModulo(u + Math.PI, Math.PI * 2) - Math.PI;
      const P = Pt ? ct * 0.85 : ct * 0.12, Wt = a.lerp(P, 0.1, c);
      u += (Wt - u) * Math.min(1, t * 5);
    } else p >= 1 ? (vt += t, Y || (u += D * t, D *= Math.exp(-t * 1.6), u += 0.4 * Q((vt - 1.2) / 1.5) * t)) : p > 0 ? (u = 0.22 + p * Math.PI * 2, D = 0) : (u += (0.22 - u) * Math.min(1, t * 4), T += t, x > _t && T > Ct + 1 && (_t = x + 6 + Math.random() * 4, T = 0));
    const Rt = n > 0.3 ? be() : 0, pe = Math.sin(B) * 0.55 * M, me = Math.sin(B) * 0.45 * M, Ce = Math.sin(B * 2) * 0.045 * M, Le = a.lerp(
      0.2,
      2.55 + Math.sin(x * 7.5) * 0.42,
      Rt
    ), Te = a.lerp(-0.5, 0, Rt), Pe = n * -0.1 + i * 0.06 * M;
    nt.set(Pe, u, 0, "YXZ"), st.setFromEuler(nt), Mt.set(rt, N, 0), y = 1 + l * (fe - 1), s.byName.torso.mesh.position.copy(Mt), s.byName.torso.mesh.quaternion.copy(st), s.byName.torso.mesh.scale.setScalar(y);
    const V = i * c;
    O(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + i * Ce + V * 0.12,
      n * Rt * 0.14 + V * 0.16
    ), O(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + i * -me * (1 - c) + V * -0.18,
      n * -0.2 + l * -2.1 + V * -0.28
    ), O(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * Te + i * me * (1 - c) + V * -0.42,
      n * Le + l * 2.1 + V * 2.3
    ), O(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + i * pe,
      n * -0.14 + l * -0.5
    ), O(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + i * -pe,
      n * 0.14 + l * 0.5
    ), s.syncBodies(), h > 0 ? (C.position.y = a.lerp(
      0.05,
      N + s.footY + 0.03,
      c
    ), J(
      a.clamp(
        a.lerp(1.2 - (N - z) * 0.45, 1, c),
        0.35,
        1.2
      )
    )) : (C.position.y = qt.y - 0.38, J(1.05)), ut.opacity = yt * (n * 0.85 + i);
  }, Ee = () => {
    g = "rise", L = 0;
    const t = s.byName.torso.body;
    E = a.clamp(t.position.x, W(), Vt()), B = 0, M = 0, D = 0, s.parts.forEach((e, o) => {
      A[o].pos.copy(e.body.position), A[o].quat.copy(e.body.quaternion);
    }), Lt(1 / 60, !0), s.parts.forEach((e, o) => {
      pt[o].pos.copy(e.mesh.position), pt[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(A[o].pos), e.mesh.quaternion.copy(A[o].quat);
    });
  };
  let te = 2.5, mt = 0;
  const ke = (t, e) => {
    mt > 0 ? (mt -= t, mt <= 0 && ht.forEach((o) => o.scale.setY(1.7))) : e > te && (te = e + 2.8 + Math.random() * 3.5, mt = 0.13, ht.forEach((o) => o.scale.setY(0.2)));
  };
  let ee = performance.now(), oe = 0, se = null;
  const ne = (t) => {
    requestAnimationFrame(ne);
    const e = Math.min((t - ee) / 1e3, 0.05);
    if (ee = t, x += e, oe += 1, oe % 180 === 0 && Ft(), g === "flow") {
      Lt(e, !1);
      const i = Ut();
      i !== se && !Y && !b && (r.style.cursor = i === "hero" ? "pointer" : "grab", se = i);
    } else if (g === "ragdoll")
      m.step(1 / 60, e, 3), s.syncMeshes(), ut.opacity = yt, b || (lt = Math.max(...s.parts.map((X) => X.body.velocity.length())) < 0.4 ? lt + e : 0, Et += e, (lt > 0.55 || Et > 3.5) && Ee());
    else {
      L = Math.min(1, L + e / 0.7);
      const i = L * L * (3 - 2 * L);
      s.parts.forEach((X, k) => {
        X.mesh.position.lerpVectors(A[k].pos, pt[k].pos, i), X.mesh.quaternion.slerpQuaternions(
          A[k].quat,
          pt[k].quat,
          i
        );
      }), s.syncBodies(), L >= 1 && (g = "flow");
    }
    const o = s.byName.torso.mesh.position;
    if (C.position.x = o.x, g !== "flow") {
      C.position.y = 0.05;
      const i = a.clamp(1.2 - (o.y - z) * 0.45, 0.35, 1.2);
      J(i);
    }
    const n = o.x * v, l = o.y * v;
    r.style.transform = `translate(${n - 60 * y}px, ${d - l - 95 * y}px) scale(${y.toFixed(3)})`, S.style.left = `${a.clamp(n, 90, tt - 90)}px`, S.style.bottom = `${a.clamp(l + 110 * y, 60, d - 30)}px`, ke(e, x), f.render(G, q);
  };
  Lt(1 / 60, !0), w.classList.add("is-active"), window.setTimeout(
    () => at("hi! scroll down — i'll give you the tour.", 4200),
    900
  ), requestAnimationFrame(ne);
};
export {
  je as createSmiskiWalker
};
