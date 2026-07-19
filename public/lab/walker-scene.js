import { W as Ee, S as ke, O as ve, H as Se, D as Ce, b as Le, V as Q, B as D, c as ne, g as Pe, o as Te, M as qe, C as Ne, n as Re, R as We, l as Ae, m as i, E as Be, Q as $, j } from "./smiski-rig.js";
const v = 92, ae = 0.9, De = 2.6, z = (y) => {
  const w = i.clamp(y, 0, 1);
  return w * w * (3 - 2 * w);
}, Ye = () => {
  const y = document.createElement("div");
  y.className = "smiski-walker", y.setAttribute("aria-hidden", "true");
  const w = new Ee({ antialias: !0, alpha: !0 });
  w.setPixelRatio(Math.min(window.devicePixelRatio, 2)), y.appendChild(w.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", y.appendChild(r);
  const S = document.createElement("div");
  S.className = "smiski-bubble", y.appendChild(S), document.body.appendChild(y), document.documentElement.classList.add("smiski-live");
  const X = new ke(), T = new ve(0, 1, 1, 0, -10, 20);
  T.position.z = 6, X.add(new Se(16775407, 12167325, 1.15));
  const Ct = new Ce(16777215, 1.5);
  Ct.position.set(2, 6, 4), X.add(Ct);
  const p = new Le({ gravity: new Q(0, -9.8, 0) });
  p.allowSleep = !0, p.solver.iterations = 12, p.defaultContactMaterial.friction = 0.5, p.defaultContactMaterial.restitution = 0.25;
  const Lt = new D({ type: D.STATIC, shape: new ne() });
  Lt.quaternion.setFromEuler(-Math.PI / 2, 0, 0), p.addBody(Lt);
  const Y = (t) => {
    const e = new D({ type: D.STATIC, shape: new ne() });
    return e.quaternion.setFromVectors(new Q(0, 0, 1), new Q(...t)), p.addBody(e), e;
  }, ie = Y([1, 0, 0]), re = Y([-1, 0, 0]), ce = Y([0, -1, 0]);
  Y([0, 0, 1]).position.set(0, 0, -0.75), Y([0, 0, -1]).position.set(0, 0, 0.75);
  const s = Pe(p);
  X.add(s.group);
  const ct = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && ct.push(t);
  });
  const lt = new Te({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), C = new qe(new Ne(0.34, 24), lt), G = (t) => C.scale.set(t, t * 0.26, 1);
  C.position.y = 0.05, G(1), X.add(C);
  let pt = 0.16;
  const mt = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, pt = e ? 0.3 : 0.16;
  };
  mt(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", mt), new MutationObserver(mt).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Pt = document.querySelector("[data-smiski-perch]"), Tt = document.querySelector("[data-smiski-ring]"), qt = document.querySelector(".intro");
  let O = 1, d = 1, q = 1, F = 1, Nt = 1, dt = 400, ht = 700, _ = 900, U = 1200;
  const Rt = () => {
    if (Nt = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !qt) return;
    const t = qt.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    dt = e - d * 0.68, ht = e - d * 0.05, _ = Math.max(o - d * 0.5, ht + 80), U = Math.max(o - d * 0.1, _ + 240);
  }, Wt = () => {
    O = window.innerWidth, d = window.innerHeight, w.setSize(O, d), q = O / v, F = d / v, T.right = q, T.top = F, T.updateProjectionMatrix(), ie.position.set(0.2, 0, 0), re.position.set(q - 0.2, 0, 0), ce.position.set(0, F - 0.15, 0), Rt();
  };
  Wt(), window.addEventListener("resize", Wt);
  const I = 0.715, N = () => ae, At = () => Math.max(ae + 0.5, q - De), Bt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / v,
      y: (d - (e.top + e.height / 2)) / v
    };
  }, ut = new j(N(), I, 0), Z = new $(), Dt = new $(), yt = new $(), Xt = new j(), Yt = new j(), J = new Be();
  let h = 1;
  const le = 1.5, V = (t, e, o, n, c) => {
    J.set(n, 0, c), Dt.setFromEuler(J), yt.copy(Z).multiply(Dt), Yt.set(...o).applyQuaternion(yt).multiplyScalar(h), Xt.set(...e).applyQuaternion(Z).multiplyScalar(h), t.mesh.position.copy(ut).add(Xt).add(Yt), t.mesh.quaternion.copy(yt), t.mesh.scale.setScalar(h);
  };
  let Ft = 0;
  const wt = (t, e = 4600) => {
    S.textContent = t, S.classList.add("is-visible"), window.clearTimeout(Ft), Ft = window.setTimeout(
      () => S.classList.remove("is-visible"),
      e
    );
  }, It = new We(), Vt = new Re(), K = new D({ type: D.STATIC });
  p.addBody(K);
  let f = null, g = "flow", l = 0, u = 0, tt = 0, H = 0, Ht = !1, M = N(), m = 0.22, et = 1, R = 0, b = 0, ot = 0, ft = 0, L = 0;
  const W = s.parts.map(
    () => ({ pos: new j(), quat: new $() })
  ), st = s.parts.map(
    () => ({ pos: new j(), quat: new $() })
  );
  let A = !1, bt = 0, B = 0, gt = 10, P = 10, Qt = 1.6;
  const Mt = 2.1, pe = () => P >= Mt ? 0 : Math.min(z(P / 0.35), z((Mt - P) / 0.45)), $t = () => u > 0 ? "walk" : l >= 1 ? "ring" : l <= 0 ? "hero" : "drop", jt = (t) => {
    const e = w.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / v,
      y: (e.bottom - t.clientY) / v,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, me = (t) => {
    const e = $t();
    if (g === "flow" && (e === "ring" || e === "drop")) {
      A = !0, gt = 0, bt = t.clientX, r.setPointerCapture(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (g === "flow" && e === "hero") {
      P = 0, wt("hi!", 1400), t.preventDefault();
      return;
    }
    const o = jt(t);
    Vt.set(o.ndcX, o.ndcY), It.setFromCamera(Vt, T);
    const n = It.intersectObject(s.group, !0)[0], c = n?.object.userData.body ?? s.byName.torso.body;
    g = "ragdoll", ft = 0, h = 1, s.parts.forEach((E) => E.mesh.scale.setScalar(1)), s.wake();
    const a = n ? new Q(n.point.x, n.point.y, n.point.z) : c.position.clone();
    K.position.copy(a), f = new Ae(
      c,
      c.pointToLocalFrame(a),
      K,
      new Q(0, 0, 0),
      40
    ), p.addConstraint(f), r.setPointerCapture(t.pointerId), r.style.cursor = "grabbing", wt("!!", 900), t.preventDefault();
  }, de = (t) => {
    if (A) {
      const o = t.clientX - bt;
      bt = t.clientX, m += o * 0.011, B = i.clamp(0.6 * B + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!f) return;
    const e = jt(t);
    K.position.set(
      i.clamp(e.x, 0.3, q - 0.3),
      i.clamp(e.y, 0.2, F - 0.2),
      0
    ), f.bodyA.wakeUp();
  }, zt = () => {
    if (A) {
      A = !1, r.style.cursor = "grab";
      return;
    }
    if (f) {
      p.removeConstraint(f), f = null, ot = 0, r.style.cursor = "grab";
      for (const t of s.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  r.addEventListener("pointerdown", me), r.addEventListener("pointermove", de), r.addEventListener("pointerup", zt), r.addEventListener("pointercancel", zt);
  let x = 0;
  const xt = (t, e) => {
    const o = window.scrollY;
    l = z((o - dt) / Math.max(1, ht - dt)), u = z((o - _) / Math.max(1, U - _));
    const n = 1 - l, c = l * (1 - u), a = l * u, E = i.clamp(
      (o - U) / Math.max(1, Nt - U),
      0,
      1
    ), k = N() + E * (At() - N()), ye = M;
    M += (k - M) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const Et = Math.abs(M - ye) / Math.max(t, 1e-4), kt = u > 0.6 && Math.abs(k - M) > 0.04 && Et > 0.02;
    kt && (et = Math.sign(k - M) || et), b += ((kt ? Math.min(1, Et / 1.1) : 0) - b) * Math.min(1, t * 8), R += Et * t * 9 * a;
    const vt = Pt ? Bt(Pt) : { x: N(), y: I }, Jt = Tt ? Bt(Tt) : { x: q / 2, y: F * 0.55 }, Kt = { x: vt.x, y: vt.y + 0.22 + Math.sin(x * 1.8) * 0.012 }, at = { x: Jt.x, y: Jt.y - 0.06 + Math.sin(x * 1.5) * 0.055 }, we = Math.abs(Math.sin(R)) * 0.05 * b + Math.sin(x * 1.8) * 8e-3 * (1 - b), te = { x: M, y: I + we };
    let it, rt;
    u > 0 ? (it = i.lerp(at.x, te.x, u), rt = i.lerp(at.y, te.y, u)) : (it = i.lerp(Kt.x, at.x, l), rt = i.lerp(Kt.y, at.y, l) + Math.sin(l * Math.PI) * 0.3);
    const ee = e ? 1 : 1 - Math.exp(-t * 10);
    if (!Ht || e ? (tt = it, H = rt, Ht = !0) : (tt += (it - tt) * ee, H += (rt - H) * ee), u > 0) {
      m = i.euclideanModulo(m + Math.PI, Math.PI * 2) - Math.PI;
      const xe = kt ? et * 0.85 : et * 0.12;
      m += (xe - m) * Math.min(1, t * 5);
    } else l >= 1 ? (gt += t, A || (m += B * t, B *= Math.exp(-t * 1.6), m += 0.4 * z((gt - 1.2) / 1.5) * t)) : l > 0 ? (m = 0.22 + l * Math.PI * 2, B = 0) : (m += (0.22 - m) * Math.min(1, t * 4), P += t, x > Qt && P > Mt + 1 && (Qt = x + 6 + Math.random() * 4, P = 0));
    const St = n > 0.3 ? pe() : 0, oe = Math.sin(R) * 0.55 * b, se = Math.sin(R) * 0.45 * b, fe = Math.sin(R * 2) * 0.045 * b, be = i.lerp(
      0.2,
      2.55 + Math.sin(x * 7.5) * 0.42,
      St
    ), ge = i.lerp(-0.5, 0, St), Me = n * -0.1 + a * 0.06 * b;
    J.set(Me, m, 0, "YXZ"), Z.setFromEuler(J), ut.set(tt, H, 0), h = 1 + c * (le - 1), s.byName.torso.mesh.position.copy(ut), s.byName.torso.mesh.quaternion.copy(Z), s.byName.torso.mesh.scale.setScalar(h), V(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + a * fe,
      n * St * 0.14
    ), V(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + a * -se,
      n * -0.2 + c * -2.1
    ), V(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * ge + a * se,
      n * be + c * 2.1
    ), V(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * oe,
      n * -0.14 + c * -0.5
    ), V(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * -oe,
      n * 0.14 + c * 0.5
    ), s.syncBodies(), u > 0 ? (C.position.y = 0.05, G(i.clamp(1.2 - (H - I) * 0.45, 0.35, 1.2))) : (C.position.y = vt.y - 0.38, G(1.05)), lt.opacity = pt * (n * 0.85 + a);
  }, he = () => {
    g = "rise", L = 0;
    const t = s.byName.torso.body;
    M = i.clamp(t.position.x, N(), At()), R = 0, b = 0, B = 0, s.parts.forEach((e, o) => {
      W[o].pos.copy(e.body.position), W[o].quat.copy(e.body.quaternion);
    }), xt(1 / 60, !0), s.parts.forEach((e, o) => {
      st[o].pos.copy(e.mesh.position), st[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(W[o].pos), e.mesh.quaternion.copy(W[o].quat);
    });
  };
  let Gt = 2.5, nt = 0;
  const ue = (t, e) => {
    nt > 0 ? (nt -= t, nt <= 0 && ct.forEach((o) => o.scale.setY(1.7))) : e > Gt && (Gt = e + 2.8 + Math.random() * 3.5, nt = 0.13, ct.forEach((o) => o.scale.setY(0.2)));
  };
  let Ot = performance.now(), _t = 0, Ut = null;
  const Zt = (t) => {
    requestAnimationFrame(Zt);
    const e = Math.min((t - Ot) / 1e3, 0.05);
    if (Ot = t, x += e, _t += 1, _t % 180 === 0 && Rt(), g === "flow") {
      xt(e, !1);
      const a = $t();
      a !== Ut && !A && !f && (r.style.cursor = a === "hero" ? "pointer" : "grab", Ut = a);
    } else if (g === "ragdoll")
      p.step(1 / 60, e, 3), s.syncMeshes(), lt.opacity = pt, f || (ot = Math.max(...s.parts.map((E) => E.body.velocity.length())) < 0.4 ? ot + e : 0, ft += e, (ot > 0.55 || ft > 3.5) && he());
    else {
      L = Math.min(1, L + e / 0.7);
      const a = L * L * (3 - 2 * L);
      s.parts.forEach((E, k) => {
        E.mesh.position.lerpVectors(W[k].pos, st[k].pos, a), E.mesh.quaternion.slerpQuaternions(
          W[k].quat,
          st[k].quat,
          a
        );
      }), s.syncBodies(), L >= 1 && (g = "flow");
    }
    const o = s.byName.torso.mesh.position;
    if (C.position.x = o.x, g !== "flow") {
      C.position.y = 0.05;
      const a = i.clamp(1.2 - (o.y - I) * 0.45, 0.35, 1.2);
      G(a);
    }
    const n = o.x * v, c = o.y * v;
    r.style.transform = `translate(${n - 60 * h}px, ${d - c - 95 * h}px) scale(${h.toFixed(3)})`, S.style.left = `${i.clamp(n, 90, O - 90)}px`, S.style.bottom = `${i.clamp(c + 110 * h, 60, d - 30)}px`, ue(e, x), w.render(X, T);
  };
  xt(1 / 60, !0), y.classList.add("is-active"), window.setTimeout(
    () => wt("hi! scroll down — i'll give you the tour.", 4200),
    900
  ), requestAnimationFrame(Zt);
};
export {
  Ye as createSmiskiWalker
};
