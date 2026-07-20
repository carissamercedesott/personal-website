import { W as ve, S as Se, O as Ce, H as Le, D as Pe, b as Te, V as Q, B as D, c as ae, g as qe, o as Ne, M as Re, C as We, E as Ae, Q as G, j as $, m as i, n as Be, R as De, l as Xe } from "./smiski-rig.js";
const k = 92, ie = 0.9, Ye = 2.6, j = (y) => {
  const w = i.clamp(y, 0, 1);
  return w * w * (3 - 2 * w);
}, Ie = () => {
  const y = document.createElement("div");
  y.className = "smiski-walker", y.setAttribute("aria-hidden", "true");
  const w = new ve({ antialias: !0, alpha: !0 });
  w.setPixelRatio(Math.min(window.devicePixelRatio, 2)), y.appendChild(w.domElement);
  const r = document.createElement("div");
  r.className = "smiski-walker-hit", y.appendChild(r);
  const v = document.createElement("div");
  v.className = "smiski-bubble", y.appendChild(v), document.body.appendChild(y), document.documentElement.classList.add("smiski-live");
  const X = new Se(), P = new Ce(0, 1, 1, 0, -10, 20);
  P.position.z = 6, X.add(new Le(16775407, 12167325, 1.15));
  const Ct = new Pe(16777215, 1.5);
  Ct.position.set(2, 6, 4), X.add(Ct);
  const p = new Te({ gravity: new Q(0, -9.8, 0) });
  p.allowSleep = !0, p.solver.iterations = 12, p.defaultContactMaterial.friction = 0.5, p.defaultContactMaterial.restitution = 0.25;
  const Lt = new D({ type: D.STATIC, shape: new ae() });
  Lt.quaternion.setFromEuler(-Math.PI / 2, 0, 0), p.addBody(Lt);
  const Y = (t) => {
    const e = new D({ type: D.STATIC, shape: new ae() });
    return e.quaternion.setFromVectors(new Q(0, 0, 1), new Q(...t)), p.addBody(e), e;
  }, re = Y([1, 0, 0]), ce = Y([-1, 0, 0]), le = Y([0, -1, 0]);
  Y([0, 0, 1]).position.set(0, 0, -0.75), Y([0, 0, -1]).position.set(0, 0, 0.75);
  const s = qe(p);
  X.add(s.group);
  const ct = [];
  s.byName.head.mesh.traverse((t) => {
    t.userData.eye && ct.push(t);
  });
  const lt = new Ne({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), S = new Re(new We(0.34, 24), lt), z = (t) => S.scale.set(t, t * 0.26, 1);
  S.position.y = 0.05, z(1), X.add(S);
  let pt = 0.16;
  const mt = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = e ? 0.5 : 0.18, pt = e ? 0.3 : 0.16;
  };
  mt(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", mt), new MutationObserver(mt).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Pt = document.querySelector("[data-smiski-perch]"), Tt = document.querySelector("[data-smiski-ring]"), qt = document.querySelector(".intro");
  let O = 1, d = 1, T = 1, F = 1, Nt = 1, dt = 400, ht = 700, _ = 900, U = 1200;
  const Rt = () => {
    if (Nt = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !qt) return;
    const t = qt.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    dt = e - d * 0.68, ht = e - d * 0.05, _ = Math.max(o - d * 0.5, ht + 80), U = Math.max(o - d * 0.1, _ + 240);
  }, Wt = () => {
    O = window.innerWidth, d = window.innerHeight, w.setSize(O, d), T = O / k, F = d / k, P.right = T, P.top = F, P.updateProjectionMatrix(), re.position.set(0.2, 0, 0), ce.position.set(T - 0.2, 0, 0), le.position.set(0, F - 0.15, 0), Rt();
  };
  Wt(), window.addEventListener("resize", Wt);
  const I = 0.715, q = () => ie, At = () => Math.max(ie + 0.5, T - Ye), Bt = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / k,
      y: (d - (e.top + e.height / 2)) / k
    };
  }, ut = new $(q(), I, 0), Z = new G(), Dt = new G(), yt = new G(), Xt = new $(), Yt = new $(), J = new Ae();
  let h = 1;
  const pe = 1.5, V = (t, e, o, n, c) => {
    J.set(n, 0, c), Dt.setFromEuler(J), yt.copy(Z).multiply(Dt), Yt.set(...o).applyQuaternion(yt).multiplyScalar(h), Xt.set(...e).applyQuaternion(Z).multiplyScalar(h), t.mesh.position.copy(ut).add(Xt).add(Yt), t.mesh.quaternion.copy(yt), t.mesh.scale.setScalar(h);
  };
  let Ft = 0;
  const wt = (t, e = 4600) => {
    v.textContent = t, v.classList.add("is-visible"), window.clearTimeout(Ft), Ft = window.setTimeout(
      () => v.classList.remove("is-visible"),
      e
    );
  }, It = new De(), Vt = new Be(), K = new D({ type: D.STATIC });
  p.addBody(K);
  let f = null, g = "flow", l = 0, u = 0, tt = 0, H = 0, Ht = !1, M = q(), m = 0.22, et = 1, N = 0, b = 0, ot = 0, ft = 0, C = 0;
  const R = s.parts.map(
    () => ({ pos: new $(), quat: new G() })
  ), st = s.parts.map(
    () => ({ pos: new $(), quat: new G() })
  );
  let W = !1, bt = 0, A = 0, gt = 10, L = 10, Qt = 1.6;
  const Mt = 2.1, me = () => L >= Mt ? 0 : Math.min(j(L / 0.35), j((Mt - L) / 0.45)), Gt = () => u > 0 ? "walk" : l >= 1 ? "ring" : l <= 0 ? "hero" : "drop", $t = (t) => {
    const e = w.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / k,
      y: (e.bottom - t.clientY) / k,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, jt = (t) => {
    try {
      r.setPointerCapture(t);
    } catch {
    }
  }, de = (t) => {
    const e = Gt();
    if (g === "flow" && (e === "ring" || e === "drop")) {
      W = !0, gt = 0, bt = t.clientX, jt(t.pointerId), r.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (g === "flow" && e === "hero") {
      L = 0, wt("hi!", 1400), t.preventDefault();
      return;
    }
    he(t);
  }, he = (t) => {
    const e = $t(t);
    Vt.set(e.ndcX, e.ndcY), It.setFromCamera(Vt, P);
    const o = It.intersectObject(s.group, !0)[0], n = o?.object.userData.body ?? s.byName.torso.body;
    g = "ragdoll", ft = 0, h = 1, s.parts.forEach((a) => a.mesh.scale.setScalar(1)), s.wake();
    const c = o ? new Q(o.point.x, o.point.y, o.point.z) : n.position.clone();
    K.position.copy(c), f = new Xe(
      n,
      n.pointToLocalFrame(c),
      K,
      new Q(0, 0, 0),
      40
    ), p.addConstraint(f), jt(t.pointerId), r.style.cursor = "grabbing", wt("!!", 900), t.preventDefault();
  }, ue = (t) => {
    if (W) {
      const o = t.clientX - bt;
      bt = t.clientX, m += o * 0.011, A = i.clamp(0.6 * A + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!f) return;
    const e = $t(t);
    K.position.set(
      i.clamp(e.x, 0.3, T - 0.3),
      i.clamp(e.y, 0.2, F - 0.2),
      0
    ), f.bodyA.wakeUp();
  }, zt = () => {
    if (W) {
      W = !1, r.style.cursor = "grab";
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
  r.addEventListener("pointerdown", de), r.addEventListener("pointermove", ue), r.addEventListener("pointerup", zt), r.addEventListener("pointercancel", zt);
  let x = 0;
  const xt = (t, e) => {
    const o = window.scrollY;
    l = j((o - dt) / Math.max(1, ht - dt)), u = j((o - _) / Math.max(1, U - _));
    const n = 1 - l, c = l * (1 - u), a = l * u, B = i.clamp(
      (o - U) / Math.max(1, Nt - U),
      0,
      1
    ), E = q() + B * (At() - q()), fe = M;
    M += (E - M) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const Et = Math.abs(M - fe) / Math.max(t, 1e-4), kt = u > 0.6 && Math.abs(E - M) > 0.04 && Et > 0.02;
    kt && (et = Math.sign(E - M) || et), b += ((kt ? Math.min(1, Et / 1.1) : 0) - b) * Math.min(1, t * 8), N += Et * t * 9 * a;
    const vt = Pt ? Bt(Pt) : { x: q(), y: I }, Kt = Tt ? Bt(Tt) : { x: T / 2, y: F * 0.55 }, te = { x: vt.x, y: vt.y + 0.22 + Math.sin(x * 1.8) * 0.012 }, at = { x: Kt.x, y: Kt.y - 0.06 + Math.sin(x * 1.5) * 0.055 }, be = Math.abs(Math.sin(N)) * 0.05 * b + Math.sin(x * 1.8) * 8e-3 * (1 - b), ee = { x: M, y: I + be };
    let it, rt;
    u > 0 ? (it = i.lerp(at.x, ee.x, u), rt = i.lerp(at.y, ee.y, u)) : (it = i.lerp(te.x, at.x, l), rt = i.lerp(te.y, at.y, l) + Math.sin(l * Math.PI) * 0.3);
    const oe = e ? 1 : 1 - Math.exp(-t * 10);
    if (!Ht || e ? (tt = it, H = rt, Ht = !0) : (tt += (it - tt) * oe, H += (rt - H) * oe), u > 0) {
      m = i.euclideanModulo(m + Math.PI, Math.PI * 2) - Math.PI;
      const ke = kt ? et * 0.85 : et * 0.12;
      m += (ke - m) * Math.min(1, t * 5);
    } else l >= 1 ? (gt += t, W || (m += A * t, A *= Math.exp(-t * 1.6), m += 0.4 * j((gt - 1.2) / 1.5) * t)) : l > 0 ? (m = 0.22 + l * Math.PI * 2, A = 0) : (m += (0.22 - m) * Math.min(1, t * 4), L += t, x > Qt && L > Mt + 1 && (Qt = x + 6 + Math.random() * 4, L = 0));
    const St = n > 0.3 ? me() : 0, se = Math.sin(N) * 0.55 * b, ne = Math.sin(N) * 0.45 * b, ge = Math.sin(N * 2) * 0.045 * b, Me = i.lerp(
      0.2,
      2.55 + Math.sin(x * 7.5) * 0.42,
      St
    ), xe = i.lerp(-0.5, 0, St), Ee = n * -0.1 + a * 0.06 * b;
    J.set(Ee, m, 0, "YXZ"), Z.setFromEuler(J), ut.set(tt, H, 0), h = 1 + c * (pe - 1), s.byName.torso.mesh.position.copy(ut), s.byName.torso.mesh.quaternion.copy(Z), s.byName.torso.mesh.scale.setScalar(h), V(
      s.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      n * 0.06 + a * ge,
      n * St * 0.14
    ), V(
      s.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      n * -0.5 + a * -ne,
      n * -0.2 + c * -2.1
    ), V(
      s.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      n * xe + a * ne,
      n * Me + c * 2.1
    ), V(
      s.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * se,
      n * -0.14 + c * -0.5
    ), V(
      s.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      n * -1.15 + a * -se,
      n * 0.14 + c * 0.5
    ), s.syncBodies(), u > 0 ? (S.position.y = 0.05, z(i.clamp(1.2 - (H - I) * 0.45, 0.35, 1.2))) : (S.position.y = vt.y - 0.38, z(1.05)), lt.opacity = pt * (n * 0.85 + a);
  }, ye = () => {
    g = "rise", C = 0;
    const t = s.byName.torso.body;
    M = i.clamp(t.position.x, q(), At()), N = 0, b = 0, A = 0, s.parts.forEach((e, o) => {
      R[o].pos.copy(e.body.position), R[o].quat.copy(e.body.quaternion);
    }), xt(1 / 60, !0), s.parts.forEach((e, o) => {
      st[o].pos.copy(e.mesh.position), st[o].quat.copy(e.mesh.quaternion);
    }), s.parts.forEach((e, o) => {
      e.mesh.position.copy(R[o].pos), e.mesh.quaternion.copy(R[o].quat);
    });
  };
  let Ot = 2.5, nt = 0;
  const we = (t, e) => {
    nt > 0 ? (nt -= t, nt <= 0 && ct.forEach((o) => o.scale.setY(1.7))) : e > Ot && (Ot = e + 2.8 + Math.random() * 3.5, nt = 0.13, ct.forEach((o) => o.scale.setY(0.2)));
  };
  let _t = performance.now(), Ut = 0, Zt = null;
  const Jt = (t) => {
    requestAnimationFrame(Jt);
    const e = Math.min((t - _t) / 1e3, 0.05);
    if (_t = t, x += e, Ut += 1, Ut % 180 === 0 && Rt(), g === "flow") {
      xt(e, !1);
      const a = Gt();
      a !== Zt && !W && !f && (r.style.cursor = a === "hero" ? "pointer" : "grab", Zt = a);
    } else if (g === "ragdoll")
      p.step(1 / 60, e, 3), s.syncMeshes(), lt.opacity = pt, f || (ot = Math.max(...s.parts.map((B) => B.body.velocity.length())) < 0.4 ? ot + e : 0, ft += e, (ot > 0.55 || ft > 3.5) && ye());
    else {
      C = Math.min(1, C + e / 0.7);
      const a = C * C * (3 - 2 * C);
      s.parts.forEach((B, E) => {
        B.mesh.position.lerpVectors(R[E].pos, st[E].pos, a), B.mesh.quaternion.slerpQuaternions(
          R[E].quat,
          st[E].quat,
          a
        );
      }), s.syncBodies(), C >= 1 && (g = "flow");
    }
    const o = s.byName.torso.mesh.position;
    if (S.position.x = o.x, g !== "flow") {
      S.position.y = 0.05;
      const a = i.clamp(1.2 - (o.y - I) * 0.45, 0.35, 1.2);
      z(a);
    }
    const n = o.x * k, c = o.y * k;
    r.style.transform = `translate(${n - 60 * h}px, ${d - c - 95 * h}px) scale(${h.toFixed(3)})`, v.style.left = `${i.clamp(n, 90, O - 90)}px`, v.style.bottom = `${i.clamp(c + 110 * h, 60, d - 30)}px`, we(e, x), w.render(X, P);
  };
  xt(1 / 60, !0), y.classList.add("is-active"), window.setTimeout(
    () => wt("hi! scroll down — i'll give you the tour.", 4200),
    900
  ), requestAnimationFrame(Jt);
};
export {
  Ie as createSmiskiWalker
};
