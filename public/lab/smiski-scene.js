import { W as te, P as ne, S as oe, a as se, H as ae, D as re, b as ie, V as d, B as r, c as Y, d as ce, M as _, e as de, f as Q, g as le, h as me, i as pe, R as we, j as ue, k as he, l as ye, m as A, n as ge } from "./smiski-rig.js";
const Me = 15585155, ve = 16180403, M = { x: 2.6, yMin: 0.12, yMax: 3.1, zMin: -1.2, zMax: 1.6 }, Ee = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, fe = (v, $) => {
  const n = new te({ antialias: !0, alpha: !0 });
  n.setPixelRatio(Math.min(window.devicePixelRatio, 2)), n.shadowMap.enabled = !0, n.shadowMap.type = ne, n.domElement.style.touchAction = "none", n.domElement.style.cursor = "grab", v.appendChild(n.domElement);
  const m = new oe(), l = new se(34, 1, 0.1, 40);
  l.position.set(0, 2.6, 5.4), l.lookAt(0, 0.45, 0), m.add(new ae(16775407, 12167325, 1.1));
  const i = new re(16777215, 1.7);
  i.position.set(2.4, 5, 3), i.castShadow = !0, i.shadow.mapSize.set(1024, 1024), i.shadow.camera.left = -4, i.shadow.camera.right = 4, i.shadow.camera.top = 5, i.shadow.camera.bottom = -1, m.add(i);
  const o = new ie({ gravity: new d(0, -9.8, 0) });
  o.allowSleep = !0, o.solver.iterations = 12, o.defaultContactMaterial.friction = 0.5, o.defaultContactMaterial.restitution = 0.22;
  const B = [], w = (e) => (B.push(e), e), z = new r({ type: r.STATIC, shape: new Y() });
  z.quaternion.setFromEuler(-Math.PI / 2, 0, 0), o.addBody(z);
  const T = w(new ce({ opacity: 0.16 })), x = new _(w(new de(14, 10)), T);
  x.rotation.x = -Math.PI / 2, x.receiveShadow = !0, m.add(x);
  const u = (e, t) => {
    const a = new r({ type: r.STATIC, shape: new Y() });
    a.quaternion.setFromVectors(new d(0, 0, 1), new d(...e)), a.position.set(...t), o.addBody(a);
  };
  u([1, 0, 0], [-2.9, 0, 0]), u([-1, 0, 0], [2.9, 0, 0]), u([0, 0, 1], [0, 0, -1.5]), u([0, 0, -1], [0, 0, 1.9]), u([0, -1, 0], [0, 3.4, 0]);
  const E = w(
    new Q({ color: Me, roughness: 0.85 })
  ), J = w(
    new Q({ color: ve, roughness: 0.9 })
  ), h = (e, t, a) => {
    const f = new r({
      type: r.STATIC,
      shape: new me(new d(...e))
    });
    f.position.set(...t), o.addBody(f);
    const P = new _(
      w(new pe(e[0] * 2, e[1] * 2, e[2] * 2)),
      a
    );
    P.position.set(...t), P.castShadow = !0, P.receiveShadow = !0, m.add(P);
  };
  h([0.86, 0.03, 0.56], [0, 0.03, 0], J), h([0.03, 0.31, 0.56], [-0.83, 0.37, 0], E), h([0.03, 0.31, 0.56], [0.83, 0.37, 0], E), h([0.86, 0.31, 0.03], [0, 0.37, -0.53], E), h([0.86, 0.31, 0.03], [0, 0.37, 0.53], E);
  const s = le(o);
  m.add(s.group);
  const F = () => s.placeAt(0, Ee() ? 0.76 : 0.94, -0.18, -0.15);
  F();
  const b = () => {
    const e = document.documentElement.dataset.theme, t = e === "dark" || !e && window.matchMedia("(prefers-color-scheme: dark)").matches;
    s.skin.emissiveIntensity = t ? 0.5 : 0.18, T.opacity = t ? 0.35 : 0.16;
  };
  b();
  const R = window.matchMedia("(prefers-color-scheme: dark)");
  R.addEventListener("change", b);
  const O = new MutationObserver(b);
  O.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  const C = new we(), D = new ge(), W = new he(), p = new ue(), S = new r({ type: r.STATIC });
  o.addBody(S);
  let c = null;
  const N = (e) => {
    const t = n.domElement.getBoundingClientRect();
    D.set(
      (e.clientX - t.left) / t.width * 2 - 1,
      -((e.clientY - t.top) / t.height) * 2 + 1
    ), C.setFromCamera(D, l);
  }, V = (e) => {
    N(e);
    const t = C.intersectObject(s.group, !0)[0];
    if (!t) return;
    const a = t.object.userData.body;
    if (!a) return;
    n.domElement.setPointerCapture(e.pointerId), l.getWorldDirection(p), W.setFromNormalAndCoplanarPoint(p, t.point), S.position.set(t.point.x, t.point.y, t.point.z);
    const f = a.pointToLocalFrame(new d(t.point.x, t.point.y, t.point.z));
    c = new ye(
      a,
      f,
      S,
      new d(0, 0, 0),
      40
    ), o.addConstraint(c), s.wake(), n.domElement.style.cursor = "grabbing";
  }, j = (e) => {
    c && (N(e), C.ray.intersectPlane(W, p) && (S.position.set(
      A.clamp(p.x, -2.6, M.x),
      A.clamp(p.y, M.yMin, M.yMax),
      A.clamp(p.z, M.zMin, M.zMax)
    ), c.bodyA.wakeUp()));
  }, y = () => {
    c && (o.removeConstraint(c), c = null, n.domElement.style.cursor = "grab");
  };
  n.domElement.addEventListener("pointerdown", V), n.domElement.addEventListener("pointermove", j), n.domElement.addEventListener("pointerup", y), n.domElement.addEventListener("pointercancel", y);
  const g = s.byName.torso.body, K = (e, t) => {
    s.wake(), g.applyImpulse(new d(e * 2.4, t * 2.4 + 0.6, 0), g.position);
  }, Z = () => {
    s.wake(), g.applyImpulse(new d((Math.random() - 0.5) * 1.6, 3.4, 0), g.position), g.angularVelocity.set(0, 0, (Math.random() - 0.5) * 8);
  }, q = () => {
    const e = v.clientWidth, t = v.clientHeight;
    !e || !t || (n.setSize(e, t), l.aspect = e / t, l.updateProjectionMatrix());
  };
  q();
  const G = new ResizeObserver(q);
  G.observe(v);
  let L = 0, H = !1, k = 0, U = null;
  const ee = () => {
    let e;
    c ? e = "grabbed" : s.parts.every((t) => t.body.sleepState === r.SLEEPING) ? e = "napping" : e = Math.max(...s.parts.map((a) => a.body.velocity.length())) > 0.6 ? "tumbling" : "settling", e !== U && (U = e, $(e));
  }, X = (e) => {
    L = requestAnimationFrame(X);
    const t = Math.min((e - k) / 1e3, 0.05);
    k = e, o.step(1 / 60, t, 3), s.syncMeshes(), ee(), n.render(m, l);
  }, I = (e) => {
    e !== H && (H = e, e ? (k = performance.now(), L = requestAnimationFrame(X)) : cancelAnimationFrame(L));
  };
  return I(!0), { reset: F, nudge: K, toss: Z, setRunning: I, dispose: () => {
    I(!1), y(), G.disconnect(), O.disconnect(), R.removeEventListener("change", b), n.domElement.removeEventListener("pointerdown", V), n.domElement.removeEventListener("pointermove", j), n.domElement.removeEventListener("pointerup", y), n.domElement.removeEventListener("pointercancel", y), s.dispose(), B.forEach((e) => e.dispose()), n.dispose(), n.domElement.remove();
  } };
};
export {
  fe as createSmiskiScene
};
