import { W as ke, S as Se, O as Ce, H as Le, D as Pe, b as Te, V as Q, B as I, c as ie, g as qe, o as Ne, M as Ae, C as Re, n as We, R as Be, l as Ie, m as i, E as De, Q as O, j as $ } from "./smiski-rig.js";
const k = 92, re = 0.9, Xe = 2.6, j = (w) => {
  const y = i.clamp(w, 0, 1);
  return y * y * (3 - 2 * y);
}, Fe = () => {
  const w = document.createElement("div");
  w.className = "smiski-walker", w.setAttribute("aria-hidden", "true");
  const y = new ke({ antialias: !0, alpha: !0 });
  y.setPixelRatio(Math.min(window.devicePixelRatio, 2)), w.appendChild(y.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", w.appendChild(r);
  const S = document.createElement("div");
  S.className = "smiski-bubble", w.appendChild(S), document.body.appendChild(w), document.documentElement.classList.add("smiski-live");
  const D = new Se(), T = new Ce(0, 1, 1, 0, -10, 20);
  T.position.z = 6, D.add(new Le(16775407, 12167325, 1.15));
  const Ct = new Pe(16777215, 1.5);
  Ct.position.set(2, 6, 4), D.add(Ct);
  const p = new Te({ gravity: new Q(0, -9.8, 0) });
  p.allowSleep = !0, p.solver.iterations = 12, p.defaultContactMaterial.friction = 0.5, p.defaultContactMaterial.restitution = 0.25;
  const Lt = new I({ type: I.STATIC, shape: new ie() });
  Lt.quaternion.setFromEuler(-Math.PI / 2, 0, 0), p.addBody(Lt);
  const X = (t) => {
    const e = new I({ type: I.STATIC, shape: new ie() });
    return e.quaternion.setFromVectors(new Q(0, 0, 1), new Q(...t)), p.addBody(e), e;
  }, ce = X([1, 0, 0]), le = X([-1, 0, 0]), pe = X([0, -1, 0]);
  X([0, 0, 1]).position.set(0, 0, -0.75), X([0, 0, -1]).position.set(0, 0, 0.75);
  const s = qe(p);
  D.add(s.group);
  const lt = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && lt.push(t);
  });
  const pt = new Ne({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), C = new Ae(new Re(0.34, 24), pt), z = (t) => C.scale.set(t, t * 0.26, 1);
  C.position.y = 0.05, z(1), D.add(C);
  let mt = 0.16;
  const dt = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, mt = e ? 0.3 : 0.16;
  };
  dt(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", dt), new MutationObserver(dt).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Pt = document.querySelector("[data-smiski-perch]"), Tt = document.querySelector("[data-smiski-ring]"), qt = document.querySelector(".intro");
  let G = 1, d = 1, q = 1, Y = 1, Nt = 1, ht = 400, ut = 700, _ = 900, U = 1200;
  const At = () => {
    if (Nt = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !qt) return;
    const t = qt.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    ht = e - d * 0.72, ut = e - d * 0.34, _ = Math.max(o - d * 0.5, ut + 80), U = Math.max(o - d * 0.1, _ + 240);
  }, Rt = () => {
    G = window.innerWidth, d = window.innerHeight, y.setSize(G, d), q = G / k, Y = d / k, T.right = q, T.top = Y, T.updateProjectionMatrix(), ce.position.set(0.2, 0, 0), le.position.set(q - 0.2, 0, 0), pe.position.set(0, Y - 0.15, 0), At();
  };
  Rt(), window.addEventListener("resize", Rt);
  const F = 0.715, N = () => re, Wt = () => Math.max(re + 0.5, q - Xe), Bt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / k,
      y: (d - (e.top + e.height / 2)) / k
    };
  }, wt = new $(N(), F, 0), Z = new O(), It = new O(), yt = new O(), Dt = new $(), Xt = new $(), J = new De();
  let h = 1;
  const me = 1.5, V = (t, e, o, n, c) => {
    J.set(n, 0, c), It.setFromEuler(J), yt.copy(Z).multiply(It), Xt.set(...o).applyQuaternion(yt).multiplyScalar(h), Dt.set(...e).applyQuaternion(Z).multiplyScalar(h), t.mesh.position.copy(wt).add(Dt).add(Xt), t.mesh.quaternion.copy(yt), t.mesh.scale.setScalar(h);
  };
  let Yt = 0;
  const K = (t, e = 4600) => {
    S.textContent = t, S.classList.add("is-visible"), window.clearTimeout(Yt), Yt = window.setTimeout(
      () => S.classList.remove("is-visible"),
      e
    );
  }, Ft = /* @__PURE__ */ new Set(), Vt = document.querySelectorAll("[data-smiski-note]");
  if (Vt.length && "IntersectionObserver" in window) {
    const t = new IntersectionObserver(
      (e) => {
        for (const o of e)
          !o.isIntersecting || Ft.has(o.target) || (Ft.add(o.target), K(o.target.getAttribute("data-smiski-note") ?? ""));
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    Vt.forEach((e) => t.observe(e));
  }
  const Ht = new Be(), Qt = new We(), tt = new I({ type: I.STATIC });
  p.addBody(tt);
  let f = null, g = "flow", l = 0, u = 0, et = 0, H = 0, Ot = !1, M = N(), m = 0.22, ot = 1, A = 0, b = 0, st = 0, ft = 0, L = 0;
  const R = s.parts.map(
    () => ({ pos: new $(), quat: new O() })
  ), nt = s.parts.map(
    () => ({ pos: new $(), quat: new O() })
  );
  let W = !1, bt = 0, B = 0, gt = 10, P = 10, $t = 1.6;
  const Mt = 2.1, de = () => P >= Mt ? 0 : Math.min(j(P / 0.35), j((Mt - P) / 0.45)), jt = () => u > 0 ? "walk" : l >= 1 ? "ring" : l <= 0 ? "hero" : "drop", zt = (t) => {
    const e = y.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / k,
      y: (e.bottom - t.clientY) / k,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, he = (t) => {
    const e = jt();
    if (g === "flow" && (e === "ring" || e === "drop")) {
      W = !0, gt = 0, bt = t.clientX, r.setPointerCapture(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (g === "flow" && e === "hero") {
      P = 0, K("hi!", 1400), t.preventDefault();
      return;
    }
    const o = zt(t);
    Qt.set(o.ndcX, o.ndcY), Ht.setFromCamera(Qt, T);
    const n = Ht.intersectObject(s.group, !0)[0], c = n?.object.userData.body ?? s.byName.torso.body;
    g = "ragdoll", ft = 0, h = 1, s.parts.forEach((E) => E.mesh.scale.setScalar(1)), s.wake();
    const a = n ? new Q(n.point.x, n.point.y, n.point.z) : c.position.clone();
    tt.position.copy(a), f = new Ie(
      c,
      c.pointToLocalFrame(a),
      tt,
      new Q(0, 0, 0),
      40
    ), p.addConstraint(f), r.setPointerCapture(t.pointerId), r.style.cursor = "grabbing", K("!!", 900), t.preventDefault();
  }, ue = (t) => {
    if (W) {
      const o = t.clientX - bt;
      bt = t.clientX, m += o * 0.011, B = i.clamp(0.6 * B + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!f) return;
    const e = zt(t);
    tt.position.set(
      i.clamp(e.x, 0.3, q - 0.3),
      i.clamp(e.y, 0.2, Y - 0.2),
      0
    ), f.bodyA.wakeUp();
  }, Gt = () => {
    if (W) {
      W = !1, r.style.cursor = "grab";
      return;
    }
    if (f) {
      p.removeConstraint(f), f = null, st = 0, r.style.cursor = "grab";
      for (const t of s.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  r.addEventListener("pointerdown", he), r.addEventListener("pointermove", ue), r.addEventListener("pointerup", Gt), r.addEventListener("pointercancel", Gt);
  let x = 0;
  const xt = (t, e) => {
    const o = window.scrollY;
    l = j((o - ht) / Math.max(1, ut - ht)), u = j((o - _) / Math.max(1, U - _));
    const n = 1 - l, c = l * (1 - u), a = l * u, E = i.clamp(
      (o - U) / Math.max(1, Nt - U),
      0,
      1
    ), v = N() + E * (Wt() - N()), fe = M;
    M += (v - M) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const Et = Math.abs(M - fe) / Math.max(t, 1e-4), vt = u > 0.6 && Math.abs(v - M) > 0.04 && Et > 0.02;
    vt && (ot = Math.sign(v - M) || ot), b += ((vt ? Math.min(1, Et / 1.1) : 0) - b) * Math.min(1, t * 8), A += Et * t * 9 * a;
    const kt = Pt ? Bt(Pt) : { x: N(), y: F }, te = Tt ? Bt(Tt) : { x: q / 2, y: Y * 0.55 }, ee = { x: kt.x, y: kt.y + 0.22 + Math.sin(x * 1.8) * 0.012 }, it = { x: te.x, y: te.y - 0.06 + Math.sin(x * 1.5) * 0.055 }, be = Math.abs(Math.sin(A)) * 0.05 * b + Math.sin(x * 1.8) * 8e-3 * (1 - b), oe = { x: M, y: F + be };
    let rt, ct;
    u > 0 ? (rt = i.lerp(it.x, oe.x, u), ct = i.lerp(it.y, oe.y, u)) : (rt = i.lerp(ee.x, it.x, l), ct = i.lerp(ee.y, it.y, l) + Math.sin(l * Math.PI) * 0.3);
    const se = e ? 1 : 1 - Math.exp(-t * 10);
    if (!Ot || e ? (et = rt, H = ct, Ot = !0) : (et += (rt - et) * se, H += (ct - H) * se), u > 0) {
      m = i.euclideanModulo(m + Math.PI, Math.PI * 2) - Math.PI;
      const ve = vt ? ot * 0.85 : ot * 0.12;
      m += (ve - m) * Math.min(1, t * 5);
    } else l >= 1 ? (gt += t, W || (m += B * t, B *= Math.exp(-t * 1.6), m += 0.4 * j((gt - 1.2) / 1.5) * t)) : l > 0 ? (m = 0.22 + l * Math.PI * 2, B = 0) : (m += (0.22 - m) * Math.min(1, t * 4), P += t, x > $t && P > Mt + 1 && ($t = x + 6 + Math.random() * 4, P = 0));
    const St = n > 0.3 ? de() : 0, ne = Math.sin(A) * 0.55 * b, ae = Math.sin(A) * 0.45 * b, ge = Math.sin(A * 2) * 0.045 * b, Me = i.lerp(
      0.2,
      2.55 + Math.sin(x * 7.5) * 0.42,
      St
    ), xe = i.lerp(-0.5, 0, St), Ee = n * -0.1 + a * 0.06 * b;
    J.set(Ee, m, 0, "YXZ"), Z.setFromEuler(J), wt.set(et, H, 0), h = 1 + c * (me - 1), s.byName.torso.mesh.position.copy(wt), s.byName.torso.mesh.quaternion.copy(Z), s.byName.torso.mesh.scale.setScalar(h), V(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + a * ge,
      n * St * 0.14
    ), V(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + a * -ae,
      n * -0.2 + c * -2.1
    ), V(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * xe + a * ae,
      n * Me + c * 2.1
    ), V(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * ne,
      n * -0.14 + c * -0.5
    ), V(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * -ne,
      n * 0.14 + c * 0.5
    ), s.syncBodies(), u > 0 ? (C.position.y = 0.05, z(i.clamp(1.2 - (H - F) * 0.45, 0.35, 1.2))) : (C.position.y = kt.y - 0.38, z(1.05)), pt.opacity = mt * (n * 0.85 + a);
  }, we = () => {
    g = "rise", L = 0;
    const t = s.byName.torso.body;
    M = i.clamp(t.position.x, N(), Wt()), A = 0, b = 0, B = 0, s.parts.forEach((e, o) => {
      R[o].pos.copy(e.body.position), R[o].quat.copy(e.body.quaternion);
    }), xt(1 / 60, !0), s.parts.forEach((e, o) => {
      nt[o].pos.copy(e.mesh.position), nt[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(R[o].pos), e.mesh.quaternion.copy(R[o].quat);
    });
  };
  let _t = 2.5, at = 0;
  const ye = (t, e) => {
    at > 0 ? (at -= t, at <= 0 && lt.forEach((o) => o.scale.setY(1.7))) : e > _t && (_t = e + 2.8 + Math.random() * 3.5, at = 0.13, lt.forEach((o) => o.scale.setY(0.2)));
  };
  let Ut = performance.now(), Zt = 0, Jt = null;
  const Kt = (t) => {
    requestAnimationFrame(Kt);
    const e = Math.min((t - Ut) / 1e3, 0.05);
    if (Ut = t, x += e, Zt += 1, Zt % 180 === 0 && At(), g === "flow") {
      xt(e, !1);
      const a = jt();
      a !== Jt && !W && !f && (r.style.cursor = a === "hero" ? "pointer" : "grab", Jt = a);
    } else if (g === "ragdoll")
      p.step(1 / 60, e, 3), s.syncMeshes(), pt.opacity = mt, f || (st = Math.max(...s.parts.map((E) => E.body.velocity.length())) < 0.4 ? st + e : 0, ft += e, (st > 0.55 || ft > 3.5) && we());
    else {
      L = Math.min(1, L + e / 0.7);
      const a = L * L * (3 - 2 * L);
      s.parts.forEach((E, v) => {
        E.mesh.position.lerpVectors(R[v].pos, nt[v].pos, a), E.mesh.quaternion.slerpQuaternions(
          R[v].quat,
          nt[v].quat,
          a
        );
      }), s.syncBodies(), L >= 1 && (g = "flow");
    }
    const o = s.byName.torso.mesh.position;
    if (C.position.x = o.x, g !== "flow") {
      C.position.y = 0.05;
      const a = i.clamp(1.2 - (o.y - F) * 0.45, 0.35, 1.2);
      z(a);
    }
    const n = o.x * k, c = o.y * k;
    r.style.transform = `translate(${n - 60 * h}px, ${d - c - 95 * h}px) scale(${h.toFixed(3)})`, S.style.left = `${i.clamp(n, 90, G - 90)}px`, S.style.bottom = `${i.clamp(c + 110 * h, 60, d - 30)}px`, ye(e, x), y.render(D, T);
  };
  xt(1 / 60, !0), w.classList.add("is-active"), window.setTimeout(
    () => K("hi! scroll down — i'll give you the tour.", 4200),
    900
  ), requestAnimationFrame(Kt);
};
export {
  Fe as createSmiskiWalker
};
