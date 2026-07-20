import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createSmiskiRig, type RigPart } from "./smiski-rig";

// The homepage guide, staged in three acts driven by scroll:
//   1. Hero — he sits on a mossy mound (a Little Big Planet nod) in the
//      corner and waves at you.
//   2. Hello world — he hops off and drops into the pulsating light ring
//      over the intro photo, floating there in the Vitruvian pose. Drag
//      him to spin him; he stays in the ring.
//   3. Below — he lands and walks the bottom edge as before. Grabbing him
//      there still goes full ragdoll, and he picks himself back up.
//
// The canvas is a full-viewport transparent overlay; an orthographic
// camera maps world units linearly to pixels so he can be pinned to DOM
// anchors (the hero perch and the ring) by reading their rects each frame.

const SCALE = 92; // px per world unit — makes the figure ~140px tall
const EDGE_L = 0.9; // world x he won't walk past on the left
const EDGE_R = 2.6; // world units clear of the right edge (the DJ deck corner)

type Mode = "flow" | "ragdoll" | "rise";
type Phase = "hero" | "drop" | "ring" | "walk";

const smooth01 = (t: number) => {
  const c = THREE.MathUtils.clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};

export const createSmiskiWalker = () => {
  // ── DOM: a fixed transparent overlay covering the viewport ──
  const container = document.createElement("div");
  container.className = "smiski-walker";
  container.setAttribute("aria-hidden", "true");

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const hitbox = document.createElement("div");
  hitbox.className = "smiski-walker-hit";
  container.appendChild(hitbox);

  const bubble = document.createElement("div");
  bubble.className = "smiski-bubble";
  container.appendChild(bubble);

  document.body.appendChild(container);
  // The ring in the intro section is CSS-hidden until the guide is live.
  document.documentElement.classList.add("smiski-live");

  // ── Scene / camera (orthographic: world x,y map linearly to pixels) ──
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -10, 20);
  camera.position.z = 6;

  scene.add(new THREE.HemisphereLight(0xfff8ef, 0xb9a89d, 1.15));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(2, 6, 4);
  scene.add(sun);

  // ── Physics (used only while ragdolling) ──
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) });
  world.allowSleep = true;
  (world.solver as CANNON.GSSolver).iterations = 12;
  world.defaultContactMaterial.friction = 0.5;
  world.defaultContactMaterial.restitution = 0.25;

  const ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(ground);

  const makeWall = (normal: [number, number, number]) => {
    const wall = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
    wall.quaternion.setFromVectors(new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(...normal));
    world.addBody(wall);
    return wall;
  };
  const wallL = makeWall([1, 0, 0]);
  const wallR = makeWall([-1, 0, 0]);
  const ceiling = makeWall([0, -1, 0]);
  // Keep him near the z=0 plane so the ortho view never lies about depth.
  // The channel must stay wider than any rotated part's diagonal, or he
  // wedges between the planes and jitters forever instead of settling.
  makeWall([0, 0, 1]).position.set(0, 0, -0.75);
  makeWall([0, 0, -1]).position.set(0, 0, 0.75);

  const rig = createSmiskiRig(world);
  scene.add(rig.group);

  const eyes: THREE.Mesh[] = [];
  rig.byName.head.mesh.traverse((child) => {
    if (child.userData.eye) eyes.push(child as THREE.Mesh);
  });

  // Fake contact shadow — cheaper than shadow maps on a viewport overlay.
  // Doubles as the thing he "sits" on during the hero act.
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x231e1b,
    transparent: true,
    opacity: 0.16,
  });
  // Camera-facing squashed ellipse — a flat floor disc would be edge-on
  // (invisible) to the orthographic camera.
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), shadowMat);
  const setShadowSize = (size: number) => shadow.scale.set(size, size * 0.26, 1);
  shadow.position.y = 0.05;
  setShadowSize(1);
  scene.add(shadow);

  // ── Theme: glow in the dark like the lab scene ──
  let shadowBase = 0.16;
  const applyTheme = () => {
    const explicit = document.documentElement.dataset.theme;
    const dark =
      explicit === "dark" ||
      (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
    rig.skin.emissiveIntensity = dark ? 0.5 : 0.18;
    shadowBase = dark ? 0.3 : 0.16;
  };
  applyTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);
  new MutationObserver(applyTheme).observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });

  // ── Layout: sizes, scroll thresholds for the three acts ──
  const perchEl = document.querySelector<HTMLElement>("[data-smiski-perch]");
  const ringEl = document.querySelector<HTMLElement>("[data-smiski-ring]");
  const introEl = document.querySelector<HTMLElement>(".intro");

  let viewW = 1;
  let viewH = 1;
  let worldW = 1;
  let worldH = 1;
  let scrollEnd = 1;
  let dropStart = 400;
  let dropEnd = 700;
  let walkStart = 900;
  let walkEnd = 1200;

  const measureScroll = () => {
    scrollEnd = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    if (!introEl) return;
    const rect = introEl.getBoundingClientRect();
    const introTop = rect.top + window.scrollY;
    const introBottom = introTop + rect.height;
    // The intro is a full-viewport act: the drop scrubs while it slides
    // in and finishes right as it fills the screen, so he's settled and
    // spinning in the ring exactly when the section is centered.
    dropStart = introTop - viewH * 0.68;
    dropEnd = introTop - viewH * 0.05;
    walkStart = Math.max(introBottom - viewH * 0.5, dropEnd + 80);
    walkEnd = Math.max(introBottom - viewH * 0.1, walkStart + 240);
  };

  const measure = () => {
    viewW = window.innerWidth;
    viewH = window.innerHeight;
    renderer.setSize(viewW, viewH);
    worldW = viewW / SCALE;
    worldH = viewH / SCALE;
    camera.right = worldW;
    camera.top = worldH;
    camera.updateProjectionMatrix();
    wallL.position.set(0.2, 0, 0);
    wallR.position.set(worldW - 0.2, 0, 0);
    ceiling.position.set(0, worldH - 0.15, 0);
    measureScroll();
  };
  measure();
  window.addEventListener("resize", measure);

  const restY = -rig.footY; // torso height with feet on the ground
  const xMin = () => EDGE_L;
  const xMax = () => Math.max(EDGE_L + 0.5, worldW - EDGE_R);

  // Rect center of a DOM anchor in world coordinates.
  const anchorWorld = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return {
      x: (rect.left + rect.width / 2) / SCALE,
      y: (viewH - (rect.top + rect.height / 2)) / SCALE,
    };
  };

  // ── Kinematic pose: root transform + limb swings about their pivots ──
  const rootPos = new THREE.Vector3(xMin(), restY, 0);
  const rootQ = new THREE.Quaternion();
  const limbQ = new THREE.Quaternion();
  const meshQ = new THREE.Quaternion();
  const pivotV = new THREE.Vector3();
  const offsetV = new THREE.Vector3();
  const eulerT = new THREE.Euler();

  // He renders bigger while floating in the ring — poseScale grows with
  // the spread pose and scales both the part meshes and their spacing.
  let poseScale = 1;
  const SPREAD_SCALE = 1.5;

  const poseLimb = (
    part: RigPart,
    pivot: [number, number, number],
    offset: [number, number, number],
    swingX: number,
    swingZ: number,
  ) => {
    eulerT.set(swingX, 0, swingZ);
    limbQ.setFromEuler(eulerT);
    meshQ.copy(rootQ).multiply(limbQ);
    offsetV.set(...offset).applyQuaternion(meshQ).multiplyScalar(poseScale);
    pivotV.set(...pivot).applyQuaternion(rootQ).multiplyScalar(poseScale);
    part.mesh.position.copy(rootPos).add(pivotV).add(offsetV);
    part.mesh.quaternion.copy(meshQ);
    part.mesh.scale.setScalar(poseScale);
  };

  // ── Speech bubbles: only the hero greeting and grab reactions — he
  // doesn't narrate sections while you scroll. ──
  let bubbleTimer = 0;
  const showBubble = (text: string, holdMs = 4600) => {
    bubble.textContent = text;
    bubble.classList.add("is-visible");
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(
      () => bubble.classList.remove("is-visible"),
      holdMs,
    );
  };

  // ── State ──
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const grabAnchor = new CANNON.Body({ type: CANNON.Body.STATIC });
  world.addBody(grabAnchor);
  let dragConstraint: CANNON.PointToPointConstraint | null = null;

  let mode: Mode = "flow";
  let u = 0; // hero → ring scrub
  let w = 0; // ring → walk scrub
  let smoothX = 0;
  let smoothY = 0;
  let hasPose = false;
  let xWalk = xMin();
  let yaw = 0.22;
  let lastDir = 1;
  let phase = 0;
  let gait = 0;
  let settleTime = 0;
  let ragdollTime = 0;
  let riseT = 0;
  const riseFrom: { pos: THREE.Vector3; quat: THREE.Quaternion }[] = rig.parts.map(
    () => ({ pos: new THREE.Vector3(), quat: new THREE.Quaternion() }),
  );
  const riseTo: { pos: THREE.Vector3; quat: THREE.Quaternion }[] = rig.parts.map(
    () => ({ pos: new THREE.Vector3(), quat: new THREE.Quaternion() }),
  );

  // Ring spin (drag to rotate; idles back into a slow turn)
  let ringDragging = false;
  let lastPointerX = 0;
  let yawVel = 0;
  let sinceDrag = 10;

  // Wave (hero act)
  let waveT = 10; // seconds since the current wave started
  let nextWave = 1.6;
  const WAVE_LEN = 2.1;
  const waveEnv = () => {
    if (waveT >= WAVE_LEN) return 0;
    return Math.min(smooth01(waveT / 0.35), smooth01((WAVE_LEN - waveT) / 0.45));
  };

  const phaseNow = (): Phase =>
    w > 0 ? "walk" : u >= 1 ? "ring" : u <= 0 ? "hero" : "drop";

  const pointerToWorld = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / SCALE,
      y: (rect.bottom - event.clientY) / SCALE,
      ndcX: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      ndcY: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    };
  };

  // Hero pointerdown position, pending the tap-or-toss decision.
  let heroPending: { x: number; y: number } | null = null;

  // Capture can throw for pointers that are already gone (or synthetic
  // events); losing capture only degrades the drag, so don't die on it.
  const capturePointer = (pointerId: number) => {
    try {
      hitbox.setPointerCapture(pointerId);
    } catch {
      /* no active pointer to capture */
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    const act = phaseNow();
    if (mode === "flow" && (act === "ring" || act === "drop")) {
      // Spin him in place — no ragdoll inside the ring.
      ringDragging = true;
      sinceDrag = 0;
      lastPointerX = event.clientX;
      capturePointer(event.pointerId);
      hitbox.style.cursor = "grabbing";
      event.preventDefault();
      return;
    }
    if (mode === "flow" && act === "hero") {
      // A tap earns a wave; dragging past a few px picks him up for a
      // toss (the rise blend later floats him back to his seat).
      heroPending = { x: event.clientX, y: event.clientY };
      capturePointer(event.pointerId);
      event.preventDefault();
      return;
    }
    startGrab(event);
  };

  const startGrab = (event: PointerEvent) => {
    const point = pointerToWorld(event);
    pointerNdc.set(point.ndcX, point.ndcY);
    raycaster.setFromCamera(pointerNdc, camera);
    const hit = raycaster.intersectObject(rig.group, true)[0];
    const body: CANNON.Body =
      hit?.object.userData.body ?? rig.byName.torso.body;
    mode = "ragdoll";
    ragdollTime = 0;
    // Physics bodies are unscaled — snap the meshes back to match.
    poseScale = 1;
    rig.parts.forEach((part) => part.mesh.scale.setScalar(1));
    rig.wake();
    const at = hit
      ? new CANNON.Vec3(hit.point.x, hit.point.y, hit.point.z)
      : body.position.clone();
    grabAnchor.position.copy(at);
    dragConstraint = new CANNON.PointToPointConstraint(
      body,
      body.pointToLocalFrame(at),
      grabAnchor,
      new CANNON.Vec3(0, 0, 0),
      40,
    );
    world.addConstraint(dragConstraint);
    capturePointer(event.pointerId);
    hitbox.style.cursor = "grabbing";
    showBubble("!!", 900);
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (heroPending) {
      const moved = Math.hypot(
        event.clientX - heroPending.x,
        event.clientY - heroPending.y,
      );
      if (moved > 8) {
        heroPending = null;
        startGrab(event);
      }
      return;
    }
    if (ringDragging) {
      const dx = event.clientX - lastPointerX;
      lastPointerX = event.clientX;
      yaw += dx * 0.011;
      yawVel = THREE.MathUtils.clamp(0.6 * yawVel + 0.4 * dx * 0.011 * 60, -7, 7);
      return;
    }
    if (!dragConstraint) return;
    const point = pointerToWorld(event);
    grabAnchor.position.set(
      THREE.MathUtils.clamp(point.x, 0.3, worldW - 0.3),
      THREE.MathUtils.clamp(point.y, 0.2, worldH - 0.2),
      0,
    );
    dragConstraint.bodyA.wakeUp();
  };

  const releasePointer = () => {
    if (heroPending) {
      heroPending = null;
      waveT = 0;
      showBubble("hi!", 1400);
      return;
    }
    if (ringDragging) {
      ringDragging = false;
      hitbox.style.cursor = "grab";
      return;
    }
    if (!dragConstraint) return;
    world.removeConstraint(dragConstraint);
    dragConstraint = null;
    settleTime = 0;
    hitbox.style.cursor = "grab";
    // Keep flings inside the viewport.
    for (const part of rig.parts) {
      const speed = part.body.velocity.length();
      if (speed > 7) part.body.velocity.scale(7 / speed, part.body.velocity);
    }
  };

  hitbox.addEventListener("pointerdown", onPointerDown);
  hitbox.addEventListener("pointermove", onPointerMove);
  hitbox.addEventListener("pointerup", releasePointer);
  hitbox.addEventListener("pointercancel", releasePointer);

  // ── The flow act: everything scroll-choreographed and kinematic ──
  let clock = 0;

  const updateFlow = (dt: number, snap: boolean) => {
    const scrollY = window.scrollY;
    u = smooth01((scrollY - dropStart) / Math.max(1, dropEnd - dropStart));
    w = smooth01((scrollY - walkStart) / Math.max(1, walkEnd - walkStart));
    const sitW = 1 - u;
    const spreadW = u * (1 - w);
    const walkW = u * w;

    // Walk-x easing runs every frame so the ring→walk blend lands where
    // walking would put him.
    const progress = THREE.MathUtils.clamp(
      (scrollY - walkEnd) / Math.max(1, scrollEnd - walkEnd),
      0,
      1,
    );
    const targetX = xMin() + progress * (xMax() - xMin());
    const prevX = xWalk;
    xWalk += (targetX - xWalk) * (snap ? 1 : 1 - Math.exp(-dt * 2.4));
    const speed = Math.abs(xWalk - prevX) / Math.max(dt, 1e-4);
    const moving = w > 0.6 && Math.abs(targetX - xWalk) > 0.04 && speed > 0.02;
    if (moving) lastDir = Math.sign(targetX - xWalk) || lastDir;
    gait += ((moving ? Math.min(1, speed / 1.1) : 0) - gait) * Math.min(1, dt * 8);
    phase += speed * dt * 9 * walkW;

    // Anchor positions (world coords) for the three acts.
    const perch = perchEl ? anchorWorld(perchEl) : { x: xMin(), y: restY };
    const ringA = ringEl
      ? anchorWorld(ringEl)
      : { x: worldW / 2, y: worldH * 0.55 };
    const pHero = { x: perch.x, y: perch.y + 0.22 + Math.sin(clock * 1.8) * 0.012 };
    const pRing = { x: ringA.x, y: ringA.y - 0.06 + Math.sin(clock * 1.5) * 0.055 };
    const bobWalk =
      Math.abs(Math.sin(phase)) * 0.05 * gait +
      Math.sin(clock * 1.8) * 0.008 * (1 - gait);
    const pWalk = { x: xWalk, y: restY + bobWalk };

    let tx: number;
    let ty: number;
    if (w > 0) {
      tx = THREE.MathUtils.lerp(pRing.x, pWalk.x, w);
      ty = THREE.MathUtils.lerp(pRing.y, pWalk.y, w);
    } else {
      // A small hop up out of the seat before he sinks into the ring.
      tx = THREE.MathUtils.lerp(pHero.x, pRing.x, u);
      ty = THREE.MathUtils.lerp(pHero.y, pRing.y, u) + Math.sin(u * Math.PI) * 0.3;
    }
    const k = snap ? 1 : 1 - Math.exp(-dt * 10);
    if (!hasPose || snap) {
      smoothX = tx;
      smoothY = ty;
      hasPose = true;
    } else {
      smoothX += (tx - smoothX) * k;
      smoothY += (ty - smoothY) * k;
    }

    // Yaw per act: seated he faces you; the drop scrubs a full pirouette;
    // in the ring he spins freely; walking faces where he's headed.
    if (w > 0) {
      yaw = THREE.MathUtils.euclideanModulo(yaw + Math.PI, Math.PI * 2) - Math.PI;
      const targetYaw = moving ? lastDir * 0.85 : lastDir * 0.12;
      yaw += (targetYaw - yaw) * Math.min(1, dt * 5);
    } else if (u >= 1) {
      sinceDrag += dt;
      if (!ringDragging) {
        yaw += yawVel * dt;
        yawVel *= Math.exp(-dt * 1.6);
        yaw += 0.4 * smooth01((sinceDrag - 1.2) / 1.5) * dt;
      }
    } else if (u > 0) {
      yaw = 0.22 + u * Math.PI * 2;
      yawVel = 0;
    } else {
      yaw += (0.22 - yaw) * Math.min(1, dt * 4);
      // Schedule the next idle wave.
      waveT += dt;
      if (clock > nextWave && waveT > WAVE_LEN + 1) {
        nextWave = clock + 6 + Math.random() * 4;
        waveT = 0;
      }
    }

    // Blend the three poses limb by limb.
    const wave = sitW > 0.3 ? waveEnv() : 0;
    const legSwing = Math.sin(phase) * 0.55 * gait;
    const armSwing = Math.sin(phase) * 0.45 * gait;
    const nod = Math.sin(phase * 2) * 0.045 * gait;
    const sitArmRZ = THREE.MathUtils.lerp(
      0.2,
      2.55 + Math.sin(clock * 7.5) * 0.42,
      wave,
    );
    const sitArmRX = THREE.MathUtils.lerp(-0.5, 0, wave);

    const lean = sitW * -0.1 + walkW * 0.06 * gait;
    eulerT.set(lean, yaw, 0, "YXZ");
    rootQ.setFromEuler(eulerT);
    rootPos.set(smoothX, smoothY, 0);
    poseScale = 1 + spreadW * (SPREAD_SCALE - 1);

    rig.byName.torso.mesh.position.copy(rootPos);
    rig.byName.torso.mesh.quaternion.copy(rootQ);
    rig.byName.torso.mesh.scale.setScalar(poseScale);
    poseLimb(
      rig.byName.head,
      [0, 0.3, 0],
      [0, 0.2, 0],
      sitW * 0.06 + walkW * nod,
      sitW * wave * 0.14,
    );
    poseLimb(
      rig.byName.armL,
      [-0.27, 0.18, 0],
      [0, -0.16, 0],
      sitW * -0.5 + walkW * -armSwing,
      sitW * -0.2 + spreadW * -2.1,
    );
    poseLimb(
      rig.byName.armR,
      [0.27, 0.18, 0],
      [0, -0.16, 0],
      sitW * sitArmRX + walkW * armSwing,
      sitW * sitArmRZ + spreadW * 2.1,
    );
    poseLimb(
      rig.byName.legL,
      [-0.12, -0.28, 0],
      [0, -0.22, 0],
      sitW * -1.15 + walkW * legSwing,
      sitW * -0.14 + spreadW * -0.5,
    );
    poseLimb(
      rig.byName.legR,
      [0.12, -0.28, 0],
      [0, -0.22, 0],
      sitW * -1.15 + walkW * -legSwing,
      sitW * 0.14 + spreadW * 0.5,
    );
    rig.syncBodies();

    // Soft contact shadow: under his seat on the hero, on the floor while
    // walking, gone while he floats in the ring.
    if (w > 0) {
      shadow.position.y = 0.05;
      setShadowSize(THREE.MathUtils.clamp(1.2 - (smoothY - restY) * 0.45, 0.35, 1.2));
    } else {
      shadow.position.y = perch.y - 0.38;
      setShadowSize(1.05);
    }
    shadowMat.opacity = shadowBase * (sitW * 0.85 + walkW);
  };

  const beginRise = () => {
    mode = "rise";
    riseT = 0;
    const torso = rig.byName.torso.body;
    xWalk = THREE.MathUtils.clamp(torso.position.x, xMin(), xMax());
    phase = 0;
    gait = 0;
    yawVel = 0;
    rig.parts.forEach((part, index) => {
      riseFrom[index].pos.copy(part.body.position as unknown as THREE.Vector3);
      riseFrom[index].quat.copy(part.body.quaternion as unknown as THREE.Quaternion);
    });
    // The blend target is wherever the scroll choreography wants him now —
    // standing at the bottom, or back up in the ring if the page scrolled.
    updateFlow(1 / 60, true);
    rig.parts.forEach((part, index) => {
      riseTo[index].pos.copy(part.mesh.position);
      riseTo[index].quat.copy(part.mesh.quaternion);
    });
    // Put the meshes back where the ragdoll ended so the blend starts there.
    rig.parts.forEach((part, index) => {
      part.mesh.position.copy(riseFrom[index].pos);
      part.mesh.quaternion.copy(riseFrom[index].quat);
    });
  };

  // ── Blinking ──
  let nextBlink = 2.5;
  let blinkLeft = 0;
  const updateBlink = (dt: number, time: number) => {
    if (blinkLeft > 0) {
      blinkLeft -= dt;
      if (blinkLeft <= 0) eyes.forEach((eye) => eye.scale.setY(1.7));
    } else if (time > nextBlink) {
      nextBlink = time + 2.8 + Math.random() * 3.5;
      blinkLeft = 0.13;
      eyes.forEach((eye) => eye.scale.setY(0.2));
    }
  };

  // ── Main loop ──
  let lastTime = performance.now();
  let frame = 0;
  let lastCursorAct: Phase | null = null;

  const step = (now: number) => {
    requestAnimationFrame(step);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    clock += dt;
    frame += 1;
    if (frame % 180 === 0) {
      // Page height and section offsets can change after images/fonts load.
      measureScroll();
    }

    if (mode === "flow") {
      updateFlow(dt, false);
      const act = phaseNow();
      if (act !== lastCursorAct && !ringDragging && !dragConstraint) {
        hitbox.style.cursor = "grab";
        lastCursorAct = act;
      }
    } else if (mode === "ragdoll") {
      world.step(1 / 60, dt, 3);
      rig.syncMeshes();
      shadowMat.opacity = shadowBase;
      if (!dragConstraint) {
        const speed = Math.max(...rig.parts.map((part) => part.body.velocity.length()));
        settleTime = speed < 0.4 ? settleTime + dt : 0;
        ragdollTime += dt;
        // The timeout backstops contact jitter that never quiets down.
        if (settleTime > 0.55 || ragdollTime > 3.5) beginRise();
      }
    } else {
      riseT = Math.min(1, riseT + dt / 0.7);
      const eased = riseT * riseT * (3 - 2 * riseT);
      rig.parts.forEach((part, index) => {
        part.mesh.position.lerpVectors(riseFrom[index].pos, riseTo[index].pos, eased);
        part.mesh.quaternion.slerpQuaternions(
          riseFrom[index].quat,
          riseTo[index].quat,
          eased,
        );
      });
      rig.syncBodies();
      if (riseT >= 1) {
        mode = "flow";
        if (phaseNow() === "hero") showBubble("phew!", 1600);
      }
    }

    // Contact shadow + hitbox + bubble all track the torso.
    const torsoPos = rig.byName.torso.mesh.position;
    shadow.position.x = torsoPos.x;
    if (mode !== "flow") {
      // Physics acts play out on the viewport floor.
      shadow.position.y = 0.05;
      const lift = THREE.MathUtils.clamp(1.2 - (torsoPos.y - restY) * 0.45, 0.35, 1.2);
      setShadowSize(lift);
    }

    const pxX = torsoPos.x * SCALE;
    const pxY = torsoPos.y * SCALE;
    hitbox.style.transform = `translate(${pxX - 60 * poseScale}px, ${viewH - pxY - 95 * poseScale}px) scale(${poseScale.toFixed(3)})`;
    bubble.style.left = `${THREE.MathUtils.clamp(pxX, 90, viewW - 90)}px`;
    bubble.style.bottom = `${THREE.MathUtils.clamp(pxY + 110 * poseScale, 60, viewH - 30)}px`;

    updateBlink(dt, clock);
    renderer.render(scene, camera);
  };

  updateFlow(1 / 60, true);
  container.classList.add("is-active");
  window.setTimeout(
    () => showBubble("hi! scroll down — i'll give you the tour.", 4200),
    900,
  );
  requestAnimationFrame(step);
};
