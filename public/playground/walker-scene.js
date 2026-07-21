import { W as Re, S as We, O as Ne, H as Ae, D as Be, b as Ye, V as O, B as V, c as de, g as De, o as Xe, M as Fe, C as Ie, E as He, Q as U, j as Z, m as a, n as Ve, R as Qe, l as Ge } from "./smiski-rig.js";
const v = 92, he = 0.9, _e = 2.6, Q = (w) => {
  const f = a.clamp(w, 0, 1);
  return f * f * (3 - 2 * f);
}, je = () => {
  const w = document.createElement("div");
  w.className = "smiski-walker", w.setAttribute("aria-hidden", "true");
  const f = new Re({ antialias: !0, alpha: !0 });
  f.setPixelRatio(Math.min(window.devicePixelRatio, 2)), w.appendChild(f.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", w.appendChild(r);
  const S = document.createElement("div");
  S.className = "smiski-bubble", w.appendChild(S), document.body.appendChild(w), document.documentElement.classList.add("smiski-live");
  const G = new We(), q = new Ne(0, 1, 1, 0, -10, 20);
  q.position.z = 6, G.add(new Ae(16775407, 12167325, 1.15));
  const Nt = new Be(16777215, 1.5);
  Nt.position.set(2, 6, 4), G.add(Nt);
  const m = new Ye({ gravity: new O(0, -9.8, 0) });
  m.allowSleep = !0, m.solver.iterations = 12, m.defaultContactMaterial.friction = 0.5, m.defaultContactMaterial.restitution = 0.25;
  const At = new V({ type: V.STATIC, shape: new de() });
  At.quaternion.setFromEuler(-Math.PI / 2, 0, 0), m.addBody(At);
  const _ = (t) => {
    const e = new V({ type: V.STATIC, shape: new de() });
    return e.quaternion.setFromVectors(new O(0, 0, 1), new O(...t)), m.addBody(e), e;
  }, ue = _([1, 0, 0]), ye = _([-1, 0, 0]), we = _([0, -1, 0]);
  _([0, 0, 1]).position.set(0, 0, -0.75), _([0, 0, -1]).position.set(0, 0, 0.75);
  const s = De(m);
  G.add(s.group);
  const ut = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && ut.push(t);
  });
  const yt = new Xe({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), C = new Fe(new Ie(0.34, 24), yt), J = (t) => C.scale.set(t, t * 0.26, 1);
  C.position.y = 0.05, J(1), G.add(C);
  let wt = 0.16;
  const ft = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, wt = e ? 0.3 : 0.16;
  };
  ft(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ft), new MutationObserver(ft).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Bt = document.querySelector("[data-smiski-perch]"), Yt = document.querySelector("[data-smiski-ring]"), K = document.querySelector("[data-smiski-study]"), Dt = document.querySelector(".intro"), fe = 64;
  let tt = 1, u = 1, R = 1, $ = 1, Xt = 1, et = 400, bt = 700, ot = 900, st = 1200;
  const Ft = () => {
    if (Xt = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !Dt) return;
    const t = Dt.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    et = e - u * 0.68, bt = Math.max(et + 120, e - fe - 56), ot = Math.max(o - u * 0.5, bt + 80), st = Math.max(o - u * 0.1, ot + 240);
  }, It = () => {
    tt = window.innerWidth, u = window.innerHeight, f.setSize(tt, u), R = tt / v, $ = u / v, q.right = R, q.top = $, q.updateProjectionMatrix(), ue.position.set(0.2, 0, 0), ye.position.set(R - 0.2, 0, 0), we.position.set(0, $ - 0.15, 0), Ft();
  };
  It(), window.addEventListener("resize", It);
  const j = 0.715, W = () => he, Ht = () => Math.max(he + 0.5, R - _e), gt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / v,
      y: (u - (e.top + e.height / 2)) / v
    };
  }, Mt = new Z(W(), j, 0), nt = new U(), Vt = new U(), xt = new U(), Qt = new Z(), Gt = new Z(), at = new He();
  let y = 1;
  const be = 1.5, z = (t, e, o, n, l) => {
    at.set(n, 0, l), Vt.setFromEuler(at), xt.copy(nt).multiply(Vt), Gt.set(...o).applyQuaternion(xt).multiplyScalar(y), Qt.set(...e).applyQuaternion(nt).multiplyScalar(y), t.mesh.position.copy(Mt).add(Qt).add(Gt), t.mesh.quaternion.copy(xt), t.mesh.scale.setScalar(y);
  };
  let _t = 0;
  const it = (t, e = 4600) => {
    S.textContent = t, S.classList.add("is-visible"), window.clearTimeout(_t), _t = window.setTimeout(
      () => S.classList.remove("is-visible"),
      e
    );
  }, $t = new Qe(), jt = new Ve(), rt = new V({ type: V.STATIC });
  m.addBody(rt);
  let b = null, g = "flow", p = 0, d = 0, ct = 0, N = 0, zt = !1, E = W(), h = 0.22, lt = 1, A = 0, M = 0, pt = 0, Et = 0, L = 0;
  const B = s.parts.map(
    () => ({ pos: new Z(), quat: new U() })
  ), mt = s.parts.map(
    () => ({ pos: new Z(), quat: new U() })
  );
  let Y = !1, kt = 0, D = 0, vt = 10, c = 0, St = !1, T = 10, Ot = 1.6;
  const Ct = 2.1, ge = () => T >= Ct ? 0 : Math.min(Q(T / 0.35), Q((Ct - T) / 0.45)), Ut = () => d > 0 ? "walk" : p >= 1 ? "ring" : p <= 0 ? "hero" : "drop", Zt = (t) => {
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
  }, Me = (t) => {
    const e = Ut();
    if (g === "flow" && (e === "ring" || e === "drop")) {
      Y = !0, vt = 0, kt = t.clientX, Jt(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (g === "flow" && e === "hero") {
      T = 0, it("hi!", 1400), t.preventDefault();
      return;
    }
    xe(t);
  }, xe = (t) => {
    const e = Zt(t);
    jt.set(e.ndcX, e.ndcY), $t.setFromCamera(jt, q);
    const o = $t.intersectObject(s.group, !0)[0], n = o?.object.userData.body ?? s.byName.torso.body;
    g = "ragdoll", Et = 0, y = 1, s.parts.forEach((i) => i.mesh.scale.setScalar(1)), s.wake();
    const l = o ? new O(o.point.x, o.point.y, o.point.z) : n.position.clone();
    rt.position.copy(l), b = new Ge(
      n,
      n.pointToLocalFrame(l),
      rt,
      new O(0, 0, 0),
      40
    ), m.addConstraint(b), Jt(t.pointerId), r.style.cursor = "grabbing", it("!!", 900), t.preventDefault();
  }, Ee = (t) => {
    if (Y) {
      const o = t.clientX - kt;
      kt = t.clientX, h += o * 0.011, D = a.clamp(0.6 * D + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!b) return;
    const e = Zt(t);
    rt.position.set(
      a.clamp(e.x, 0.3, R - 0.3),
      a.clamp(e.y, 0.2, $ - 0.2),
      0
    ), b.bodyA.wakeUp();
  }, Kt = () => {
    if (Y) {
      Y = !1, r.style.cursor = "grab";
      return;
    }
    if (b) {
      m.removeConstraint(b), b = null, pt = 0, r.style.cursor = "grab";
      for (const t of s.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  r.addEventListener("pointerdown", Me), r.addEventListener("pointermove", Ee), r.addEventListener("pointerup", Kt), r.addEventListener("pointercancel", Kt);
  let x = 0;
  const Lt = (t, e) => {
    const o = window.scrollY;
    p = Q((o - et) / Math.max(1, bt - et)), d = Q((o - ot) / Math.max(1, st - ot));
    const n = 1 - p, l = p * (1 - d), i = p * d, X = a.clamp(
      (o - st) / Math.max(1, Xt - st),
      0,
      1
    ), k = W() + X * (Ht() - W()), Se = E;
    E += (k - E) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const Tt = Math.abs(E - Se) / Math.max(t, 1e-4), Pt = d > 0.6 && Math.abs(k - E) > 0.04 && Tt > 0.02;
    Pt && (lt = Math.sign(k - E) || lt), M += ((Pt ? Math.min(1, Tt / 1.1) : 0) - M) * Math.min(1, t * 8), A += Tt * t * 9 * i;
    const qt = Bt ? gt(Bt) : { x: W(), y: j }, ae = Yt ? gt(Yt) : { x: R / 2, y: $ * 0.55 }, ie = { x: qt.x, y: qt.y + 0.22 + Math.sin(x * 1.8) * 0.012 }, ht = { x: ae.x, y: ae.y - 0.06 + Math.sin(x * 1.5) * 0.055 }, Ce = Math.abs(Math.sin(A)) * 0.05 * M + Math.sin(x * 1.8) * 8e-3 * (1 - M), re = { x: E, y: j + Ce };
    let ce = 0;
    if (K && d >= 1 && g === "flow") {
      const P = K.getBoundingClientRect(), Wt = (P.top + P.height / 2) / u;
      ce = Q((1 - Math.abs(Wt - 0.5) / 0.55) * 1.6);
    }
    c += (ce - c) * Math.min(1, t * (e ? 60 : 7)), c > 0.75 && !St ? (St = !0, it("hmm — the laws.", 2200)) : c < 0.1 && (St = !1);
    let F, I;
    if (d > 0) {
      if (F = a.lerp(ht.x, re.x, d), I = a.lerp(ht.y, re.y, d), c > 1e-3 && K) {
        const P = gt(K);
        F = a.lerp(F, P.x, c), I = a.lerp(
          I,
          P.y + Math.sin(x * 1.6) * 0.015,
          c
        );
      }
    } else
      F = a.lerp(ie.x, ht.x, p), I = a.lerp(ie.y, ht.y, p) + Math.sin(p * Math.PI) * 0.3;
    const le = e ? 1 : 1 - Math.exp(-t * 10);
    if (!zt || e ? (ct = F, N = I, zt = !0) : (ct += (F - ct) * le, N += (I - N) * le), d > 0) {
      h = a.euclideanModulo(h + Math.PI, Math.PI * 2) - Math.PI;
      const P = Pt ? lt * 0.85 : lt * 0.12, Wt = a.lerp(P, 0.1, c);
      h += (Wt - h) * Math.min(1, t * 5);
    } else p >= 1 ? (vt += t, Y || (h += D * t, D *= Math.exp(-t * 1.6), h += 0.4 * Q((vt - 1.2) / 1.5) * t)) : p > 0 ? (h = 0.22 + p * Math.PI * 2, D = 0) : (h += (0.22 - h) * Math.min(1, t * 4), T += t, x > Ot && T > Ct + 1 && (Ot = x + 6 + Math.random() * 4, T = 0));
    const Rt = n > 0.3 ? ge() : 0, pe = Math.sin(A) * 0.55 * M, me = Math.sin(A) * 0.45 * M, Le = Math.sin(A * 2) * 0.045 * M, Te = a.lerp(
      0.2,
      2.55 + Math.sin(x * 7.5) * 0.42,
      Rt
    ), Pe = a.lerp(-0.5, 0, Rt), qe = n * -0.1 + i * 0.06 * M;
    at.set(qe, h, 0, "YXZ"), nt.setFromEuler(at), Mt.set(ct, N, 0), y = 1 + l * (be - 1), s.byName.torso.mesh.position.copy(Mt), s.byName.torso.mesh.quaternion.copy(nt), s.byName.torso.mesh.scale.setScalar(y);
    const H = i * c;
    z(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + i * Le + H * 0.12,
      n * Rt * 0.14 + H * 0.16
    ), z(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + i * -me * (1 - c) + H * -0.18,
      n * -0.2 + l * -2.1 + H * -0.28
    ), z(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * Pe + i * me * (1 - c) + H * -0.42,
      n * Te + l * 2.1 + H * 2.3
    ), z(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + i * pe,
      n * -0.14 + l * -0.5
    ), z(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + i * -pe,
      n * 0.14 + l * 0.5
    ), s.syncBodies(), d > 0 ? (C.position.y = a.lerp(
      0.05,
      N + s.footY + 0.03,
      c
    ), J(
      a.clamp(
        a.lerp(1.2 - (N - j) * 0.45, 1, c),
        0.35,
        1.2
      )
    )) : (C.position.y = qt.y - 0.38, J(1.05)), yt.opacity = wt * (n * 0.85 + i);
  }, ke = () => {
    g = "rise", L = 0;
    const t = s.byName.torso.body;
    E = a.clamp(t.position.x, W(), Ht()), A = 0, M = 0, D = 0, s.parts.forEach((e, o) => {
      B[o].pos.copy(e.body.position), B[o].quat.copy(e.body.quaternion);
    }), Lt(1 / 60, !0), s.parts.forEach((e, o) => {
      mt[o].pos.copy(e.mesh.position), mt[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(B[o].pos), e.mesh.quaternion.copy(B[o].quat);
    });
  };
  let te = 2.5, dt = 0;
  const ve = (t, e) => {
    dt > 0 ? (dt -= t, dt <= 0 && ut.forEach((o) => o.scale.setY(1.7))) : e > te && (te = e + 2.8 + Math.random() * 3.5, dt = 0.13, ut.forEach((o) => o.scale.setY(0.2)));
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
      m.step(1 / 60, e, 3), s.syncMeshes(), yt.opacity = wt, b || (pt = Math.max(...s.parts.map((X) => X.body.velocity.length())) < 0.4 ? pt + e : 0, Et += e, (pt > 0.55 || Et > 3.5) && ke());
    else {
      L = Math.min(1, L + e / 0.7);
      const i = L * L * (3 - 2 * L);
      s.parts.forEach((X, k) => {
        X.mesh.position.lerpVectors(B[k].pos, mt[k].pos, i), X.mesh.quaternion.slerpQuaternions(
          B[k].quat,
          mt[k].quat,
          i
        );
      }), s.syncBodies(), L >= 1 && (g = "flow");
    }
    const o = s.byName.torso.mesh.position;
    if (C.position.x = o.x, g !== "flow") {
      C.position.y = 0.05;
      const i = a.clamp(1.2 - (o.y - j) * 0.45, 0.35, 1.2);
      J(i);
    }
    const n = o.x * v, l = o.y * v;
    r.style.transform = `translate(${n - 60 * y}px, ${u - l - 95 * y}px) scale(${y.toFixed(3)})`, S.style.left = `${a.clamp(n, 90, tt - 90)}px`, S.style.bottom = `${a.clamp(l + 110 * y, 60, u - 30)}px`, ve(e, x), f.render(G, q);
  };
  Lt(1 / 60, !0), w.classList.add("is-active"), window.setTimeout(
    () => it("hi! i'll show you around", 4200),
    900
  ), requestAnimationFrame(ne);
};
export {
  je as createSmiskiWalker
};
