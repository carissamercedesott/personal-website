import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createSmiskiRig } from "./smiski-rig";

// The lab's ragdoll-in-a-box: the shared smiski rig (smiski-rig.ts) dropped
// into a cardboard box. Grab any limb with the pointer and the rest of him
// dangles from wherever you're holding.
//
// Kept free of Solid so the component wrapper stays tiny and this whole
// module (plus three/cannon) can load lazily when the demo scrolls into view.

export type SmiskiScene = {
  reset: () => void;
  nudge: (x: number, y: number) => void;
  toss: () => void;
  setRunning: (running: boolean) => void;
  dispose: () => void;
};

export type SmiskiState = "napping" | "settling" | "tumbling" | "grabbed";

const BOX_YELLOW = 0xedcf83; // --butter-300
const BOX_INSIDE = 0xf6e4b3; // --butter-200

// Where he can be dragged / thrown to — roughly the camera's view volume.
const BOUNDS = { x: 2.6, yMin: 0.12, yMax: 3.1, zMin: -1.2, zMax: 1.6 };

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const createSmiskiScene = (
  host: HTMLElement,
  onState: (state: SmiskiState) => void,
): SmiskiScene => {
  // ── Renderer / scene / camera ──
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.touchAction = "none";
  renderer.domElement.style.cursor = "grab";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 2.6, 5.4);
  camera.lookAt(0, 0.45, 0);

  scene.add(new THREE.HemisphereLight(0xfff8ef, 0xb9a89d, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.7);
  sun.position.set(2.4, 5, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -4;
  sun.shadow.camera.right = 4;
  sun.shadow.camera.top = 5;
  sun.shadow.camera.bottom = -1;
  scene.add(sun);

  // ── Physics world ──
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) });
  world.allowSleep = true;
  (world.solver as CANNON.GSSolver).iterations = 12;
  world.defaultContactMaterial.friction = 0.5;
  world.defaultContactMaterial.restitution = 0.22;

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  // ── Ground: invisible physics plane + a soft shadow catcher ──
  const ground = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(ground);

  const shadowMat = track(new THREE.ShadowMaterial({ opacity: 0.16 }));
  const floor = new THREE.Mesh(track(new THREE.PlaneGeometry(14, 10)), shadowMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Invisible walls at the edges of the view so he can't be flung offscreen.
  const addWall = (normal: [number, number, number], offset: [number, number, number]) => {
    const wall = new CANNON.Body({ type: CANNON.Body.STATIC, shape: new CANNON.Plane() });
    wall.quaternion.setFromVectors(new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(...normal));
    wall.position.set(...offset);
    world.addBody(wall);
  };
  addWall([1, 0, 0], [-2.9, 0, 0]);
  addWall([-1, 0, 0], [2.9, 0, 0]);
  addWall([0, 0, 1], [0, 0, -1.5]);
  addWall([0, 0, -1], [0, 0, 1.9]);
  addWall([0, -1, 0], [0, 3.4, 0]);

  // ── The box he lives in (open top, static) ──
  const boxMat = track(
    new THREE.MeshStandardMaterial({ color: BOX_YELLOW, roughness: 0.85 }),
  );
  const boxInsideMat = track(
    new THREE.MeshStandardMaterial({ color: BOX_INSIDE, roughness: 0.9 }),
  );
  const addSlab = (
    half: [number, number, number],
    at: [number, number, number],
    material: THREE.Material,
  ) => {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(...half)),
    });
    body.position.set(...at);
    world.addBody(body);
    const mesh = new THREE.Mesh(
      track(new THREE.BoxGeometry(half[0] * 2, half[1] * 2, half[2] * 2)),
      material,
    );
    mesh.position.set(...at);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  };
  addSlab([0.86, 0.03, 0.56], [0, 0.03, 0], boxInsideMat); // floor
  addSlab([0.03, 0.31, 0.56], [-0.83, 0.37, 0], boxMat); // left
  addSlab([0.03, 0.31, 0.56], [0.83, 0.37, 0], boxMat); // right
  addSlab([0.86, 0.31, 0.03], [0, 0.37, -0.53], boxMat); // back
  addSlab([0.86, 0.31, 0.03], [0, 0.37, 0.53], boxMat); // front

  // ── The little guy ──
  const rig = createSmiskiRig(world);
  scene.add(rig.group);

  // A short drop leaning backward, so he slumps seated against the back wall
  // with his face to the camera. A taller drop tumbles him unpredictably.
  const reset = () => rig.placeAt(0, prefersReducedMotion() ? 0.76 : 0.94, -0.18, -0.15);
  reset();

  // ── Theme: glow brighter in the dark, softer shadows ──
  const applyTheme = () => {
    const explicit = document.documentElement.dataset.theme;
    const dark =
      explicit === "dark" ||
      (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
    rig.skin.emissiveIntensity = dark ? 0.5 : 0.18;
    shadowMat.opacity = dark ? 0.35 : 0.16;
  };
  applyTheme();
  const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  themeQuery.addEventListener("change", applyTheme);
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

  // ── Pointer dragging: raycast a limb, tether it to a point that follows
  // the cursor on a camera-facing plane through the grab point. ──
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const dragPlane = new THREE.Plane();
  const dragPoint = new THREE.Vector3();
  const grabAnchor = new CANNON.Body({ type: CANNON.Body.STATIC });
  world.addBody(grabAnchor);
  let dragConstraint: CANNON.PointToPointConstraint | null = null;

  const readPointer = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointerNdc, camera);
  };

  const onPointerDown = (event: PointerEvent) => {
    readPointer(event);
    const hit = raycaster.intersectObject(rig.group, true)[0];
    if (!hit) return;
    const body: CANNON.Body = hit.object.userData.body;
    if (!body) return;
    renderer.domElement.setPointerCapture(event.pointerId);
    camera.getWorldDirection(dragPoint);
    dragPlane.setFromNormalAndCoplanarPoint(dragPoint, hit.point);
    grabAnchor.position.set(hit.point.x, hit.point.y, hit.point.z);
    const pivot = body.pointToLocalFrame(new CANNON.Vec3(hit.point.x, hit.point.y, hit.point.z));
    dragConstraint = new CANNON.PointToPointConstraint(
      body,
      pivot,
      grabAnchor,
      new CANNON.Vec3(0, 0, 0),
      40,
    );
    world.addConstraint(dragConstraint);
    rig.wake();
    renderer.domElement.style.cursor = "grabbing";
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragConstraint) return;
    readPointer(event);
    if (!raycaster.ray.intersectPlane(dragPlane, dragPoint)) return;
    grabAnchor.position.set(
      THREE.MathUtils.clamp(dragPoint.x, -BOUNDS.x, BOUNDS.x),
      THREE.MathUtils.clamp(dragPoint.y, BOUNDS.yMin, BOUNDS.yMax),
      THREE.MathUtils.clamp(dragPoint.z, BOUNDS.zMin, BOUNDS.zMax),
    );
    dragConstraint.bodyA.wakeUp();
  };

  const releasePointer = () => {
    if (!dragConstraint) return;
    world.removeConstraint(dragConstraint);
    dragConstraint = null;
    renderer.domElement.style.cursor = "grab";
  };

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerup", releasePointer);
  renderer.domElement.addEventListener("pointercancel", releasePointer);

  // ── Keyboard shoves, so the demo works without a pointer ──
  const torsoBody = rig.byName.torso.body;
  const nudge = (x: number, y: number) => {
    rig.wake();
    torsoBody.applyImpulse(new CANNON.Vec3(x * 2.4, y * 2.4 + 0.6, 0), torsoBody.position);
  };
  const toss = () => {
    rig.wake();
    torsoBody.applyImpulse(new CANNON.Vec3((Math.random() - 0.5) * 1.6, 3.4, 0), torsoBody.position);
    torsoBody.angularVelocity.set(0, 0, (Math.random() - 0.5) * 8);
  };

  // ── Sizing ──
  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  // ── Loop ──
  let raf = 0;
  let running = false;
  let lastTime = 0;
  let lastState: SmiskiState | null = null;

  const reportState = () => {
    let state: SmiskiState;
    if (dragConstraint) state = "grabbed";
    else if (rig.parts.every((part) => part.body.sleepState === CANNON.Body.SLEEPING))
      state = "napping";
    else {
      const speed = Math.max(...rig.parts.map((part) => part.body.velocity.length()));
      state = speed > 0.6 ? "tumbling" : "settling";
    }
    if (state !== lastState) {
      lastState = state;
      onState(state);
    }
  };

  const step = (now: number) => {
    raf = requestAnimationFrame(step);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    world.step(1 / 60, dt, 3);
    rig.syncMeshes();
    reportState();
    renderer.render(scene, camera);
  };

  const setRunning = (next: boolean) => {
    if (next === running) return;
    running = next;
    if (next) {
      lastTime = performance.now();
      raf = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(raf);
    }
  };
  setRunning(true);

  const dispose = () => {
    setRunning(false);
    releasePointer();
    resizeObserver.disconnect();
    themeObserver.disconnect();
    themeQuery.removeEventListener("change", applyTheme);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerup", releasePointer);
    renderer.domElement.removeEventListener("pointercancel", releasePointer);
    rig.dispose();
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { reset, nudge, toss, setRunning, dispose };
};
