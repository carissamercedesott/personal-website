import { W as De, S as We, O as He, H as Qe, D as Ve, b as Xe, V as P, B as E, c as Ce, g as Oe, o as je, M as ze, C as Ge, n as $e, R as Ue, l as _e, m as v, E as Ze, Q as R, j as B } from "./smiski-rig.js";
const m = 92, x = 340, Le = 0.9, Je = 2.6, et = () => {
  const p = document.createElement("div");
  p.className = "smiski-walker", p.setAttribute("aria-hidden", "true");
  const k = new De({ antialias: !0, alpha: !0 });
  k.setPixelRatio(Math.min(window.devicePixelRatio, 2)), p.appendChild(k.domElement);
  const i = document.createElement("div");
  i.className = "smiski-walker-hit", p.appendChild(i);
  const h = document.createElement("div");
  h.className = "smiski-bubble", p.appendChild(h), document.body.appendChild(p);
  const C = new We(), y = new He(0, 1, 1, 0, -10, 20);
  y.position.z = 6, C.add(new Qe(16775407, 12167325, 1.15));
  const se = new Ve(16777215, 1.5);
  se.position.set(2, 6, 4), C.add(se);
  const a = new Xe({ gravity: new P(0, -9.8, 0) });
  a.allowSleep = !0, a.solver.iterations = 12, a.defaultContactMaterial.friction = 0.5, a.defaultContactMaterial.restitution = 0.25;
  const ae = new E({ type: E.STATIC, shape: new Ce() });
  ae.quaternion.setFromEuler(-Math.PI / 2, 0, 0), a.addBody(ae);
  const L = (t) => {
    const e = new E({ type: E.STATIC, shape: new Ce() });
    return e.quaternion.setFromVectors(new P(0, 0, 1), new P(...t)), a.addBody(e), e;
  }, Te = L([1, 0, 0]), qe = L([-1, 0, 0]), Se = L([0, -1, 0]);
  L([0, 0, 1]).position.set(0, 0, -0.75), L([0, 0, -1]).position.set(0, 0, 0.75);
  const n = Oe(a);
  C.add(n.group);
  const $ = [];
  n.byName.head.mesh.traverse((t) => {
    t.userData.eye && $.push(t);
  });
  const ie = new je({
    color: 2301467,
    transparent: !0,
    opacity: 0.16
  }), T = new ze(new Ge(0.34, 24), ie);
  T.rotation.x = -Math.PI / 2, T.position.y = 0.01, C.add(T);
  const U = () => {
    const t = document.documentElement.dataset.theme, e = t === "dark" || !t && window.matchMedia("(prefers-color-scheme: dark)").matches;
    n.skin.emissiveIntensity = e ? 0.5 : 0.18, ie.opacity = e ? 0.3 : 0.16;
  };
  U(), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", U), new MutationObserver(U).observe(document.documentElement, {
    attributeFilter: ["data-theme"]
  });
  let q = 1, _ = 600, Z = 1;
  const re = () => {
    const t = window.innerWidth;
    k.setSize(t, x), q = t / m, y.right = q, y.top = x / m, y.updateProjectionMatrix(), Te.position.set(0.2, 0, 0), qe.position.set(q - 0.2, 0, 0), Se.position.set(0, x / m - 0.15, 0), _ = document.querySelector(".hero")?.offsetHeight ?? 600, Z = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
  };
  re(), window.addEventListener("resize", re);
  const Y = 0.715, S = () => Le, ce = () => Math.max(Le + 0.5, q - Je), A = new B(S(), Y, 0), I = new R(), le = new R(), J = new R(), de = new B(), me = new B(), F = new Ze(), N = (t, e, o, s) => {
    F.set(s, 0, 0), le.setFromEuler(F), J.copy(I).multiply(le), me.set(...o).applyQuaternion(J), de.set(...e).applyQuaternion(I), t.mesh.position.copy(A).add(de).add(me), t.mesh.quaternion.copy(J);
  }, K = (t, e, o, s) => {
    F.set(e, t, 0, "YXZ"), I.setFromEuler(F);
    const r = Math.sin(o) * 0.55 * s, z = Math.sin(o) * 0.45 * s, G = Math.sin(o * 2) * 0.045 * s;
    n.byName.torso.mesh.position.copy(A), n.byName.torso.mesh.quaternion.copy(I), N(n.byName.head, [0, 0.3, 0], [0, 0.2, 0], G), N(n.byName.armL, [-0.27, 0.18, 0], [0, -0.16, 0], -z), N(n.byName.armR, [0.27, 0.18, 0], [0, -0.16, 0], z), N(n.byName.legL, [-0.12, -0.28, 0], [0, -0.22, 0], r), N(n.byName.legR, [0.12, -0.28, 0], [0, -0.22, 0], -r), n.syncBodies();
  };
  let pe = 0;
  const he = (t, e = 4600) => {
    h.textContent = t, h.classList.add("is-visible"), window.clearTimeout(pe), pe = window.setTimeout(
      () => h.classList.remove("is-visible"),
      e
    );
  }, ue = /* @__PURE__ */ new Set(), we = document.querySelectorAll("[data-smiski-note]");
  if (we.length && "IntersectionObserver" in window) {
    const t = new IntersectionObserver(
      (e) => {
        for (const o of e)
          !o.isIntersecting || ue.has(o.target) || (ue.add(o.target), he(o.target.getAttribute("data-smiski-note") ?? ""));
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    we.forEach((e) => t.observe(e));
  }
  const ye = new Ue(), be = new $e(), D = new E({ type: E.STATIC });
  a.addBody(D);
  let l = null, b = "walk", c = S(), W = 0, H = 1, Q = 0, u = 0, V = 0, ee = 0, w = 0;
  const g = n.parts.map(
    () => ({ pos: new B(), quat: new R() })
  ), X = n.parts.map(
    () => ({ pos: new B(), quat: new R() })
  ), ge = (t) => {
    const e = k.domElement.getBoundingClientRect();
    return {
      x: (t.clientX - e.left) / m,
      y: (e.bottom - t.clientY) / m,
      ndcX: (t.clientX - e.left) / e.width * 2 - 1,
      ndcY: -((t.clientY - e.top) / e.height) * 2 + 1
    };
  }, Ne = (t) => {
    const e = ge(t);
    be.set(e.ndcX, e.ndcY), ye.setFromCamera(be, y);
    const o = ye.intersectObject(n.group, !0)[0], s = o?.object.userData.body ?? n.byName.torso.body;
    b = "ragdoll", ee = 0, n.wake();
    const r = o ? new P(o.point.x, o.point.y, o.point.z) : s.position.clone();
    D.position.copy(r), l = new _e(
      s,
      s.pointToLocalFrame(r),
      D,
      new P(0, 0, 0),
      40
    ), a.addConstraint(l), i.setPointerCapture(t.pointerId), i.style.cursor = "grabbing", he("!!", 900), t.preventDefault();
  }, Pe = (t) => {
    if (!l) return;
    const e = ge(t);
    D.position.set(
      v.clamp(e.x, 0.3, q - 0.3),
      v.clamp(e.y, 0.2, x / m - 0.2),
      0
    ), l.bodyA.wakeUp();
  }, fe = () => {
    if (l) {
      a.removeConstraint(l), l = null, V = 0, i.style.cursor = "grab";
      for (const t of n.parts) {
        const e = t.body.velocity.length();
        e > 7 && t.body.velocity.scale(7 / e, t.body.velocity);
      }
    }
  };
  i.addEventListener("pointerdown", Ne), i.addEventListener("pointermove", Pe), i.addEventListener("pointerup", fe), i.addEventListener("pointercancel", fe);
  const Re = () => {
    b = "rise", w = 0;
    const t = n.byName.torso.body;
    c = v.clamp(t.position.x, S(), ce()), A.set(c, Y, 0), W = 0, Q = 0, u = 0, n.parts.forEach((e, o) => {
      g[o].pos.copy(e.body.position), g[o].quat.copy(e.body.quaternion);
    }), K(0, 0, 0, 0), n.parts.forEach((e, o) => {
      X[o].pos.copy(e.mesh.position), X[o].quat.copy(e.mesh.quaternion);
    }), n.parts.forEach((e, o) => {
      e.mesh.position.copy(g[o].pos), e.mesh.quaternion.copy(g[o].quat);
    });
  };
  let Me = 2.5, O = 0;
  const Be = (t, e) => {
    O > 0 ? (O -= t, O <= 0 && $.forEach((o) => o.scale.setY(1.7))) : e > Me && (Me = e + 2.8 + Math.random() * 3.5, O = 0.13, $.forEach((o) => o.scale.setY(0.2)));
  };
  let Ee = performance.now(), te = 0, j = !1, ve = 0;
  const xe = (t) => {
    requestAnimationFrame(xe);
    const e = Math.min((t - Ee) / 1e3, 0.05);
    Ee = t, te += e, ve += 1, ve % 180 === 0 && (Z = Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    const o = window.scrollY, s = o > _ * 0.45;
    if (s !== j && (j = s, p.classList.toggle("is-active", j)), !j && b === "walk") return;
    if (b === "walk") {
      const f = _ * 0.35, M = v.clamp(
        (o - f) / Math.max(1, Z - f),
        0,
        1
      ), d = S() + M * (ce() - S()), Ye = c;
      c += (d - c) * (1 - Math.exp(-e * 2.4));
      const oe = Math.abs(c - Ye) / Math.max(e, 1e-4), ne = Math.abs(d - c) > 0.04 && oe > 0.02;
      ne && (H = Math.sign(d - c) || H), u += ((ne ? Math.min(1, oe / 1.1) : 0) - u) * Math.min(1, e * 8), Q += oe * e * 9;
      const Ae = ne ? H * 0.85 : H * 0.12;
      W += (Ae - W) * Math.min(1, e * 5);
      const Ie = Math.abs(Math.sin(Q)) * 0.05 * u, Fe = Math.sin(te * 1.8) * 8e-3 * (1 - u);
      A.set(c, Y + Ie + Fe, 0), K(W, 0.06 * u, Q, u);
    } else if (b === "ragdoll")
      a.step(1 / 60, e, 3), n.syncMeshes(), l || (V = Math.max(...n.parts.map((M) => M.body.velocity.length())) < 0.4 ? V + e : 0, ee += e, (V > 0.55 || ee > 3.5) && Re());
    else {
      w = Math.min(1, w + e / 0.7);
      const f = w * w * (3 - 2 * w);
      n.parts.forEach((M, d) => {
        M.mesh.position.lerpVectors(g[d].pos, X[d].pos, f), M.mesh.quaternion.slerpQuaternions(
          g[d].quat,
          X[d].quat,
          f
        );
      }), n.syncBodies(), w >= 1 && (b = "walk");
    }
    const r = n.byName.torso.mesh.position;
    T.position.x = r.x;
    const z = v.clamp(1.2 - (r.y - Y) * 0.45, 0.35, 1.2);
    T.scale.setScalar(z);
    const G = r.x * m, ke = r.y * m;
    i.style.transform = `translate(${G - 55}px, ${x - ke - 95}px)`, h.style.left = `${v.clamp(G, 90, window.innerWidth - 90)}px`, h.style.bottom = `${Math.min(ke + 110, x - 24)}px`, Be(e, te), k.render(C, y);
  };
  K(0, 0, 0, 0), requestAnimationFrame(xe);
};
export {
  et as createSmiskiWalker
};
