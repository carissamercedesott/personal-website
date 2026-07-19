import { W as Pt, S as Tt, O as Nt, H as Wt, D as It, b as Rt, V as H, B as X, c as pt, g as At, f as mt, G as Bt, M as Le, o as Xt, C as Yt, p as Dt, q as Ft, n as Vt, R as Gt, l as Ht, m as a, E as Qt, Q, j as O } from "./smiski-rig.js";
const E = 92, ht = 0.9, Ot = 2.6, Y = (h) => {
  const u = a.clamp(h, 0, 1);
  return u * u * (3 - 2 * u);
}, jt = () => {
  const h = document.createElement("div");
  h.className = "smiski-walker", h.setAttribute("aria-hidden", "true");
  const u = new Pt({ antialias: !0, alpha: !0 });
  u.setPixelRatio(Math.min(window.devicePixelRatio, 2)), h.appendChild(u.domElement);
  const i = document.createElement("div");
  i.className = "smiski-walker-hit", h.appendChild(i);
  const v = document.createElement("div");
  v.className = "smiski-bubble", h.appendChild(v), document.body.appendChild(h), document.documentElement.classList.add("smiski-live");
  const q = new Tt(), L = new Nt(0, 1, 1, 0, -10, 20);
  L.position.z = 6, q.add(new Wt(16775407, 12167325, 1.15));
  const Pe = new It(16777215, 1.5);
  Pe.position.set(2, 6, 4), q.add(Pe);
  const d = new Rt({ gravity: new H(0, -9.8, 0) });
  d.allowSleep = !0, d.solver.iterations = 12, d.defaultContactMaterial.friction = 0.5, d.defaultContactMaterial.restitution = 0.25;
  const Te = new X({ type: X.STATIC, shape: new pt() });
  Te.quaternion.setFromEuler(-Math.PI / 2, 0, 0), d.addBody(Te);
  const D = (t) => {
    const e = new X({ type: X.STATIC, shape: new pt() });
    return e.quaternion.setFromVectors(new H(0, 0, 1), new H(...t)), d.addBody(e), e;
  }, ut = D([1, 0, 0]), wt = D([-1, 0, 0]), yt = D([0, -1, 0]);
  D([0, 0, 1]).position.set(0, 0, -0.75), D([0, 0, -1]).position.set(0, 0, 0.75);
  const n = At(d);
  q.add(n.group);
  const pe = [];
  n.byName.head.mesh.traverse((t) => {
    t.userData.eye && pe.push(t);
  });
  const z = new mt({
    color: 8232032,
    roughness: 0.95,
    transparent: !0
  }), Ne = new mt({
    color: 9811054,
    roughness: 0.9,
    transparent: !0
  }), P = new Bt(), We = new Le(new Xt(0.62, 24, 16), z);
  We.scale.set(1, 0.42, 0.75), P.add(We);
  const bt = new Yt(0.022, 0.16, 5);
  [-0.42, -0.3, 0.34, 0.46].forEach((t, e) => {
    const o = new Le(bt, Ne);
    o.position.set(t, 0.2 - Math.abs(t) * 0.22, 0.1), o.rotation.z = (e % 2 ? -1 : 1) * (0.15 + e * 0.06), P.add(o);
  }), q.add(P);
  const me = new Dt({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), F = new Le(new Ft(0.34, 24), me);
  F.rotation.x = -Math.PI / 2, F.position.y = 0.01, q.add(F);
  let he = 0.16;
  const ue = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    n.skin.emissiveIntensity = e ? 0.5 : 0.18, he = e ? 0.3 : 0.16, z.emissive.setHex(e ? 2832926 : 0), z.emissiveIntensity = e ? 0.35 : 0;
  };
  ue(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ue), new MutationObserver(ue).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  const Ie = document.querySelector("[data-smiski-perch]"), Re = document.querySelector("[data-smiski-ring]"), Ae = document.querySelector(".intro");
  let j = 1, m = 1, T = 1, V = 1, Be = 1, we = 400, ye = 700, $ = 900, _ = 1200;
  const Xe = () => {
    if (Be = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    ), !Ae) return;
    const t = Ae.getBoundingClientRect(), e = t.top + window.scrollY, o = e + t.height;
    we = e - m * 0.55, ye = e - m * 0.12, $ = Math.max(o - m * 0.5, ye + 80), _ = Math.max(o - m * 0.1, $ + 240);
  }, Ye = () => {
    j = window.innerWidth, m = window.innerHeight, u.setSize(j, m), T = j / E, V = m / E, L.right = T, L.top = V, L.updateProjectionMatrix(), ut.position.set(0.2, 0, 0), wt.position.set(T - 0.2, 0, 0), yt.position.set(0, V - 0.15, 0), Xe();
  };
  Ye(), window.addEventListener("resize", Ye);
  const U = 0.715, N = () => ht, De = () => Math.max(ht + 0.5, T - Ot), Fe = (t) => {
    const e = t.getBoundingClientRect();
    return {
      x: (e.left + e.width / 2) / E,
      y: (m - (e.top + e.height / 2)) / E
    };
  }, be = new O(N(), U, 0), Z = new Q(), Ve = new Q(), fe = new Q(), Ge = new O(), He = new O(), J = new Qt(), G = (t, e, o, s, l) => {
    J.set(s, 0, l), Ve.setFromEuler(J), fe.copy(Z).multiply(Ve), He.set(...o).applyQuaternion(fe), Ge.set(...e).applyQuaternion(Z), t.mesh.position.copy(be).add(Ge).add(He), t.mesh.quaternion.copy(fe);
  };
  let Qe = 0;
  const K = (t, e = 4600) => {
    v.textContent = t, v.classList.add("is-visible"), window.clearTimeout(Qe), Qe = window.setTimeout(
      () => v.classList.remove("is-visible"),
      e
    );
  }, Oe = /* @__PURE__ */ new Set(), ze = document.querySelectorAll("[data-smiski-note]");
  if (ze.length && "IntersectionObserver" in window) {
    const t = new IntersectionObserver(
      (e) => {
        for (const o of e)
          !o.isIntersecting || Oe.has(o.target) || (Oe.add(o.target), K(o.target.getAttribute("data-smiski-note") ?? ""));
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ze.forEach((e) => t.observe(e));
  }
  const je = new Gt(), $e = new Vt(), ee = new X({ type: X.STATIC });
  d.addBody(ee);
  let w = null, k = "flow", c = 0, y = 0, te = 0, oe = 0, _e = !1, g = N(), p = 0.22, ne = 1, W = 0, b = 0, se = 0, ge = 0, C = 0;
  const I = n.parts.map(
    () => ({ pos: new O(), quat: new Q() })
  ), ae = n.parts.map(
    () => ({ pos: new O(), quat: new Q() })
  );
  let R = !1, Me = 0, A = 0, xe = 10, S = 10, Ue = 1.6;
  const Ee = 2.1, ft = () => S >= Ee ? 0 : Math.min(Y(S / 0.35), Y((Ee - S) / 0.45)), Ze = () => y > 0 ? "walk" : c >= 1 ? "ring" : c <= 0 ? "hero" : "drop", Je = (t) => {
    const e = u.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / E,
      y: (e.bottom - t.clientY) / E,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, gt = (t) => {
    const e = Ze();
    if (k === "flow" && (e === "ring" || e === "drop")) {
      R = !0, xe = 0, Me = t.clientX, i.setPointerCapture(t.pointerId), i.style.cursor = "grabbing", t.preventDefault();
      return;
    }
    if (k === "flow" && e === "hero") {
      S = 0, K("hi!", 1400), t.preventDefault();
      return;
    }
    const o = Je(t);
    $e.set(o.ndcX, o.ndcY), je.setFromCamera($e, L);
    const s = je.intersectObject(n.group, !0)[0], l = s?.object.userData.body ?? n.byName.torso.body;
    k = "ragdoll", ge = 0, n.wake();
    const r = s ? new H(s.point.x, s.point.y, s.point.z) : l.position.clone();
    ee.position.copy(r), w = new Ht(
      l,
      l.pointToLocalFrame(r),
      ee,
      new H(0, 0, 0),
      40
    ), d.addConstraint(w), i.setPointerCapture(t.pointerId), i.style.cursor = "grabbing", K("!!", 900), t.preventDefault();
  }, Mt = (t) => {
    if (R) {
      const o = t.clientX - Me;
      Me = t.clientX, p += o * 0.011, A = a.clamp(0.6 * A + 0.4 * o * 0.011 * 60, -7, 7);
      return;
    }
    if (!w) return;
    const e = Je(t);
    ee.position.set(
      a.clamp(e.x, 0.3, T - 0.3),
      a.clamp(e.y, 0.2, V - 0.2),
      0
    ), w.bodyA.wakeUp();
  }, Ke = () => {
    if (R) {
      R = !1, i.style.cursor = "grab";
      return;
    }
    if (w) {
      d.removeConstraint(w), w = null, se = 0, i.style.cursor = "grab";
      for (const t of n.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  i.addEventListener("pointerdown", gt), i.addEventListener("pointermove", Mt), i.addEventListener("pointerup", Ke), i.addEventListener("pointercancel", Ke);
  let M = 0;
  const ve = (t, e) => {
    const o = window.scrollY;
    c = Y((o - we) / Math.max(1, ye - we)), y = Y((o - $) / Math.max(1, _ - $));
    const s = 1 - c, l = c * (1 - y), r = c * y, f = a.clamp(
      (o - _) / Math.max(1, Be - _),
      0,
      1
    ), x = N() + f * (De() - N()), B = g;
    g += (x - g) * (e ? 1 : 1 - Math.exp(-t * 2.4));
    const ke = Math.abs(g - B) / Math.max(t, 1e-4), Ce = y > 0.6 && Math.abs(x - g) > 0.04 && ke > 0.02;
    Ce && (ne = Math.sign(x - g) || ne), b += ((Ce ? Math.min(1, ke / 1.1) : 0) - b) * Math.min(1, t * 8), W += ke * t * 9 * r;
    const re = Ie ? Fe(Ie) : { x: N(), y: U }, at = Re ? Fe(Re) : { x: T / 2, y: V * 0.55 }, it = { x: re.x, y: re.y + 0.4 + Math.sin(M * 1.8) * 0.012 }, ce = { x: at.x, y: at.y - 0.06 + Math.sin(M * 1.5) * 0.055 }, vt = Math.abs(Math.sin(W)) * 0.05 * b + Math.sin(M * 1.8) * 8e-3 * (1 - b), rt = { x: g, y: U + vt };
    let le, de;
    y > 0 ? (le = a.lerp(ce.x, rt.x, y), de = a.lerp(ce.y, rt.y, y)) : (le = a.lerp(it.x, ce.x, c), de = a.lerp(it.y, ce.y, c) + Math.sin(c * Math.PI) * 0.3);
    const ct = e ? 1 : 1 - Math.exp(-t * 10);
    if (!_e || e ? (te = le, oe = de, _e = !0) : (te += (le - te) * ct, oe += (de - oe) * ct), y > 0) {
      p = a.euclideanModulo(p + Math.PI, Math.PI * 2) - Math.PI;
      const Lt = Ce ? ne * 0.85 : ne * 0.12;
      p += (Lt - p) * Math.min(1, t * 5);
    } else c >= 1 ? (xe += t, R || (p += A * t, A *= Math.exp(-t * 1.6), p += 0.4 * Y((xe - 1.2) / 1.5) * t)) : c > 0 ? (p = 0.22 + c * Math.PI * 2, A = 0) : (p += (0.22 - p) * Math.min(1, t * 4), S += t, M > Ue && S > Ee + 1 && (Ue = M + 6 + Math.random() * 4, S = 0));
    const Se = s > 0.3 ? ft() : 0, lt = Math.sin(W) * 0.55 * b, dt = Math.sin(W) * 0.45 * b, kt = Math.sin(W * 2) * 0.045 * b, Ct = a.lerp(
      0.2,
      2.55 + Math.sin(M * 7.5) * 0.42,
      Se
    ), St = a.lerp(-0.5, 0, Se), qt = s * -0.1 + r * 0.06 * b;
    J.set(qt, p, 0, "YXZ"), Z.setFromEuler(J), be.set(te, oe, 0), n.byName.torso.mesh.position.copy(be), n.byName.torso.mesh.quaternion.copy(Z), G(
      n.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      s * 0.06 + r * kt,
      s * Se * 0.14
    ), G(
      n.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      s * -0.5 + r * -dt,
      s * -0.2 + l * -2.1
    ), G(
      n.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      s * St + r * dt,
      s * Ct + l * 2.1
    ), G(
      n.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      s * -1.15 + r * lt,
      s * -0.14 + l * -0.5
    ), G(
      n.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      s * -1.15 + r * -lt,
      s * 0.14 + l * 0.5
    ), n.syncBodies();
    const qe = 1 - Y(c / 0.35);
    P.position.set(re.x, re.y - 0.16, -0.3), z.opacity = qe, Ne.opacity = qe, P.visible = qe > 0.02, me.opacity = he * r;
  }, xt = () => {
    k = "rise", C = 0;
    const t = n.byName.torso.body;
    g = a.clamp(t.position.x, N(), De()), W = 0, b = 0, A = 0, n.parts.forEach((e, o) => {
      I[o].pos.copy(e.body.position), I[o].quat.copy(e.body.quaternion);
    }), ve(1 / 60, !0), n.parts.forEach((e, o) => {
      ae[o].pos.copy(e.mesh.position), ae[o].quat.copy(e.mesh.quaternion);
    }), n.parts.forEach((e, o) => {
      e.mesh.position.copy(I[o].pos), e.mesh.quaternion.copy(I[o].quat);
    });
  };
  let et = 2.5, ie = 0;
  const Et = (t, e) => {
    ie > 0 ? (ie -= t, ie <= 0 && pe.forEach((o) => o.scale.setY(1.7))) : e > et && (et = e + 2.8 + Math.random() * 3.5, ie = 0.13, pe.forEach((o) => o.scale.setY(0.2)));
  };
  let tt = performance.now(), ot = 0, nt = null;
  const st = (t) => {
    requestAnimationFrame(st);
    const e = Math.min((t - tt) / 1e3, 0.05);
    if (tt = t, M += e, ot += 1, ot % 180 === 0 && Xe(), k === "flow") {
      ve(e, !1);
      const f = Ze();
      f !== nt && !R && !w && (i.style.cursor = f === "hero" ? "pointer" : "grab", nt = f);
    } else if (k === "ragdoll")
      d.step(1 / 60, e, 3), n.syncMeshes(), me.opacity = he, P.visible = !1, w || (se = Math.max(...n.parts.map((x) => x.body.velocity.length())) < 0.4 ? se + e : 0, ge += e, (se > 0.55 || ge > 3.5) && xt());
    else {
      C = Math.min(1, C + e / 0.7);
      const f = C * C * (3 - 2 * C);
      n.parts.forEach((x, B) => {
        x.mesh.position.lerpVectors(I[B].pos, ae[B].pos, f), x.mesh.quaternion.slerpQuaternions(
          I[B].quat,
          ae[B].quat,
          f
        );
      }), n.syncBodies(), C >= 1 && (k = "flow");
    }
    const o = n.byName.torso.mesh.position;
    F.position.x = o.x;
    const s = a.clamp(1.2 - (o.y - U) * 0.45, 0.35, 1.2);
    F.scale.setScalar(s);
    const l = o.x * E, r = o.y * E;
    i.style.transform = `translate(${l - 60}px, ${m - r - 95}px)`, v.style.left = `${a.clamp(l, 90, j - 90)}px`, v.style.bottom = `${a.clamp(r + 110, 60, m - 30)}px`, Et(e, M), u.render(q, L);
  };
  ve(1 / 60, !0), h.classList.add("is-active"), window.setTimeout(
    () => K("hi! scroll down — i'll give you the tour.", 4200),
    900
  ), requestAnimationFrame(st);
};
export {
  jt as createSmiskiWalker
};
