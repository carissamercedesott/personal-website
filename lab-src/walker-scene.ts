import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createSmiskiRig, type RigPart } from "./smiski-rig";

// The homepage guide: the shared smiski rig walking along the bottom of the
// viewport. Scroll drives where he's headed (page progress maps to a spot
// between the left edge and the DJ deck), and he walks there on his own —
// a kinematic gait, not physics. Grab him and he goes full ragdoll; once
// he's done tumbling he picks himself up and resumes the walk.
//
// Loaded lazily by walker-main.ts the first time the visitor scrolls past
// the hero, so three/cannon never load for people who don't scroll.

const SCALE = 92; // px per world unit — makes the figure ~140px tall
const STRIP = 340; // canvas height in px; extra headroom so tosses stay visible
const EDGE_L = 0.9; // world x he won't walk past on the left
const EDGE_R = 2.6; // world units clear of the right edge (the DJ deck corner)

type Mode = "walk" | "ragdoll" | "rise";

export const createSmiskiWalker = () => {
  // ── DOM: a fixed transparent strip along the bottom of the viewport ──
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

  // Fake contact shadow — cheaper than shadow maps on a viewport-wide strip.
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x231e1b,
    transparent: true,
    opacity: 0.16,
  });
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  scene.add(shadow);

  // ── Theme: glow in the dark like the lab scene ──
  const applyTheme = () => {
    const explicit = document.documentElement.dataset.theme;
    const dark =
      explicit === "dark" ||
      (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
    rig.skin.emissiveIntensity = dark ? 0.5 : 0.18;
    shadowMat.opacity = dark ? 0.3 : 0.16;
  };
  applyTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);
  new MutationObserver(applyTheme).observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });

  // ── Layout: sizes, scroll range, walkable range ──
  let worldW = 1;
  let heroH = 600;
  let scrollEnd = 1;

  const measure = () => {
    const width = window.innerWidth;
    renderer.setSize(width, STRIP);
    worldW = width / SCALE;
    camera.right = worldW;
    camera.top = STRIP / SCALE;
    camera.updateProjectionMatrix();
    wallL.position.set(0.2, 0, 0);
    wallR.position.set(worldW - 0.2, 0, 0);
    ceiling.position.set(0, STRIP / SCALE - 0.15, 0);
    heroH = document.querySelector<HTMLElement>(".hero")?.offsetHeight ?? 600;
    scrollEnd = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
  };
  measure();
  window.addEventListener("resize", measure);

  const restY = -rig.footY; // torso height with feet on the ground
  const xMin = () => EDGE_L;
  const xMax = () => Math.max(EDGE_L + 0.5, worldW - EDGE_R);

  // ── Kinematic pose: root transform + limb swings about their pivots ──
  const rootPos = new THREE.Vector3(xMin(), restY, 0);
  const rootQ = new THREE.Quaternion();
  const limbQ = new THREE.Quaternion();
  const meshQ = new THREE.Quaternion();
  const pivotV = new THREE.Vector3();
  const offsetV = new THREE.Vector3();
  const eulerT = new THREE.Euler();

  const poseLimb = (
    part: RigPart,
    pivot: [number, number, number],
    offset: [number, number, number],
    swing: number,
  ) => {
    eulerT.set(swing, 0, 0);
    limbQ.setFromEuler(eulerT);
    meshQ.copy(rootQ).multiply(limbQ);
    offsetV.set(...offset).applyQuaternion(meshQ);
    pivotV.set(...pivot).applyQuaternion(rootQ);
    part.mesh.position.copy(rootPos).add(pivotV).add(offsetV);
    part.mesh.quaternion.copy(meshQ);
  };

  const applyPose = (yaw: number, lean: number, phase: number, gait: number) => {
    eulerT.set(lean, yaw, 0, "YXZ");
    rootQ.setFromEuler(eulerT);
    const legSwing = Math.sin(phase) * 0.55 * gait;
    const armSwing = Math.sin(phase) * 0.45 * gait;
    const nod = Math.sin(phase * 2) * 0.045 * gait;
    rig.byName.torso.mesh.position.copy(rootPos);
    rig.byName.torso.mesh.quaternion.copy(rootQ);
    poseLimb(rig.byName.head, [0, 0.3, 0], [0, 0.2, 0], nod);
    poseLimb(rig.byName.armL, [-0.27, 0.18, 0], [0, -0.16, 0], -armSwing);
    poseLimb(rig.byName.armR, [0.27, 0.18, 0], [0, -0.16, 0], armSwing);
    poseLimb(rig.byName.legL, [-0.12, -0.28, 0], [0, -0.22, 0], legSwing);
    poseLimb(rig.byName.legR, [0.12, -0.28, 0], [0, -0.22, 0], -legSwing);
    rig.syncBodies();
  };

  // ── Speech bubbles: the guide narrates each section as it scrolls in ──
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

  const seenNotes = new Set<Element>();
  const noted = document.querySelectorAll("[data-smiski-note]");
  if (noted.length && "IntersectionObserver" in window) {
    const noteObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seenNotes.has(entry.target)) continue;
          seenNotes.add(entry.target);
          showBubble(entry.target.getAttribute("data-smiski-note") ?? "");
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    noted.forEach((section) => noteObserver.observe(section));
  }

  // ── Grab: hand the kinematic pose to physics and tether the grab point ──
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const grabAnchor = new CANNON.Body({ type: CANNON.Body.STATIC });
  world.addBody(grabAnchor);
  let dragConstraint: CANNON.PointToPointConstraint | null = null;

  let mode: Mode = "walk";
  let x = xMin();
  let yaw = 0;
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

  const pointerToWorld = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / SCALE,
      y: (rect.bottom - event.clientY) / SCALE,
      ndcX: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      ndcY: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    };
  };

  const onPointerDown = (event: PointerEvent) => {
    const point = pointerToWorld(event);
    pointerNdc.set(point.ndcX, point.ndcY);
    raycaster.setFromCamera(pointerNdc, camera);
    const hit = raycaster.intersectObject(rig.group, true)[0];
    const body: CANNON.Body =
      hit?.object.userData.body ?? rig.byName.torso.body;
    mode = "ragdoll";
    ragdollTime = 0;
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
    hitbox.setPointerCapture(event.pointerId);
    hitbox.style.cursor = "grabbing";
    showBubble("!!", 900);
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragConstraint) return;
    const point = pointerToWorld(event);
    grabAnchor.position.set(
      THREE.MathUtils.clamp(point.x, 0.3, worldW - 0.3),
      THREE.MathUtils.clamp(point.y, 0.2, STRIP / SCALE - 0.2),
      0,
    );
    dragConstraint.bodyA.wakeUp();
  };

  const releasePointer = () => {
    if (!dragConstraint) return;
    world.removeConstraint(dragConstraint);
    dragConstraint = null;
    settleTime = 0;
    hitbox.style.cursor = "grab";
    // Keep flings inside the strip.
    for (const part of rig.parts) {
      const speed = part.body.velocity.length();
      if (speed > 7) part.body.velocity.scale(7 / speed, part.body.velocity);
    }
  };

  hitbox.addEventListener("pointerdown", onPointerDown);
  hitbox.addEventListener("pointermove", onPointerMove);
  hitbox.addEventListener("pointerup", releasePointer);
  hitbox.addEventListener("pointercancel", releasePointer);

  const beginRise = () => {
    mode = "rise";
    riseT = 0;
    const torso = rig.byName.torso.body;
    x = THREE.MathUtils.clamp(torso.position.x, xMin(), xMax());
    rootPos.set(x, restY, 0);
    yaw = 0;
    phase = 0;
    gait = 0;
    rig.parts.forEach((part, index) => {
      riseFrom[index].pos.copy(part.body.position as unknown as THREE.Vector3);
      riseFrom[index].quat.copy(part.body.quaternion as unknown as THREE.Quaternion);
    });
    // Capture the rest pose as the blend target.
    applyPose(0, 0, 0, 0);
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
  let clock = 0;
  let active = false;
  let frame = 0;

  const step = (now: number) => {
    requestAnimationFrame(step);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    clock += dt;
    frame += 1;
    if (frame % 180 === 0) {
      // Page height can change after images/fonts load.
      scrollEnd = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }

    const scrollY = window.scrollY;
    const shouldShow = scrollY > heroH * 0.45;
    if (shouldShow !== active) {
      active = shouldShow;
      container.classList.toggle("is-active", active);
    }
    if (!active && mode === "walk") return; // nothing to animate while hidden

    if (mode === "walk") {
      const start = heroH * 0.35;
      const progress = THREE.MathUtils.clamp(
        (scrollY - start) / Math.max(1, scrollEnd - start),
        0,
        1,
      );
      const targetX = xMin() + progress * (xMax() - xMin());
      const prevX = x;
      x += (targetX - x) * (1 - Math.exp(-dt * 2.4));
      const speed = Math.abs(x - prevX) / Math.max(dt, 1e-4);
      const moving = Math.abs(targetX - x) > 0.04 && speed > 0.02;
      if (moving) lastDir = Math.sign(targetX - x) || lastDir;
      gait += ((moving ? Math.min(1, speed / 1.1) : 0) - gait) * Math.min(1, dt * 8);
      phase += speed * dt * 9;
      // Face where he's headed while walking; drift back toward the
      // viewer when he stops.
      const targetYaw = moving ? lastDir * 0.85 : lastDir * 0.12;
      yaw += (targetYaw - yaw) * Math.min(1, dt * 5);
      const bob = Math.abs(Math.sin(phase)) * 0.05 * gait;
      const breathe = Math.sin(clock * 1.8) * 0.008 * (1 - gait);
      rootPos.set(x, restY + bob + breathe, 0);
      applyPose(yaw, 0.06 * gait, phase, gait);
    } else if (mode === "ragdoll") {
      world.step(1 / 60, dt, 3);
      rig.syncMeshes();
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
      if (riseT >= 1) mode = "walk";
    }

    // Contact shadow + hitbox + bubble all track the torso.
    const torsoPos = rig.byName.torso.mesh.position;
    shadow.position.x = torsoPos.x;
    const lift = THREE.MathUtils.clamp(1.2 - (torsoPos.y - restY) * 0.45, 0.35, 1.2);
    shadow.scale.setScalar(lift);

    const pxX = torsoPos.x * SCALE;
    const pxY = torsoPos.y * SCALE;
    hitbox.style.transform = `translate(${pxX - 55}px, ${STRIP - pxY - 95}px)`;
    bubble.style.left = `${THREE.MathUtils.clamp(pxX, 90, window.innerWidth - 90)}px`;
    bubble.style.bottom = `${Math.min(pxY + 110, STRIP - 24)}px`;

    updateBlink(dt, clock);
    renderer.render(scene, camera);
  };

  applyPose(0, 0, 0, 0);
  requestAnimationFrame(step);
};
