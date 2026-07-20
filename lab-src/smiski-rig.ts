import * as THREE from "three";
import * as CANNON from "cannon-es";

// The site's resident smiski, shared between the lab's box scene and the
// homepage walker: six rigid bodies (dome head, torso, two arms, two legs)
// joined by cone-twist constraints, with matching procedural meshes.
//
// The proportions chase the real figurine: a big softly-squashed dome that
// sits directly on the shoulders (no visible neck), wide-set oval eyes low
// on the face, a dot mouth, stubby limbs, matte pale yellow-green.

// Mirrored as --smiski-green in tokens.css so the palette page can document
// it; change both together.
export const SMISKI_GREEN = 0xd9e6a6;
export const SMISKI_GLOW = 0xb5d97e;
const FACE_INK = 0x2f3526;

export type PartName = "torso" | "head" | "armL" | "armR" | "legL" | "legR";

export type RigPart = {
  name: PartName;
  body: CANNON.Body;
  mesh: THREE.Mesh;
  home: CANNON.Vec3;
};

export type SmiskiRig = {
  group: THREE.Group;
  parts: RigPart[];
  byName: Record<PartName, RigPart>;
  skin: THREE.MeshStandardMaterial;
  /** Overall figure height in world units (feet to crown, at rest). */
  height: number;
  /** Y of the lowest point (foot soles) relative to the torso origin. */
  footY: number;
  wake: () => void;
  /** Rest pose at an offset from home, leaned forward/back (radians). */
  placeAt: (x: number, baseY: number, z: number, lean: number) => void;
  /** Dynamic mode: copy body transforms onto the meshes. */
  syncMeshes: () => void;
  /** Kinematic mode: copy mesh transforms onto the bodies, so a grab
   * hands off into physics without a pop. */
  syncBodies: () => void;
  dispose: () => void;
};

export const createSmiskiRig = (world: CANNON.World): SmiskiRig => {
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  const skin = track(
    new THREE.MeshStandardMaterial({
      color: SMISKI_GREEN,
      emissive: SMISKI_GLOW,
      emissiveIntensity: 0.18,
      roughness: 0.68,
    }),
  );
  const faceMat = track(new THREE.MeshBasicMaterial({ color: FACE_INK }));

  const group = new THREE.Group();
  const parts: RigPart[] = [];

  const addPart = (
    name: PartName,
    half: CANNON.Vec3,
    mass: number,
    home: [number, number, number],
    mesh: THREE.Mesh,
  ): RigPart => {
    const body = new CANNON.Body({
      mass,
      shape: new CANNON.Box(half),
      linearDamping: 0.05,
      angularDamping: 0.3,
      sleepSpeedLimit: 0.25,
      sleepTimeLimit: 0.7,
    });
    world.addBody(body);
    mesh.castShadow = true;
    mesh.traverse((child) => (child.userData.body = body));
    group.add(mesh);
    const part = { name, body, mesh, home: new CANNON.Vec3(...home) };
    parts.push(part);
    return part;
  };

  const capsule = (radius: number, length: number) =>
    new THREE.Mesh(track(new THREE.CapsuleGeometry(radius, length, 6, 20)), skin);

  // Torso — chubby, flattened front-to-back, shoulders swallowed by the head.
  const torsoMesh = capsule(0.26, 0.24);
  torsoMesh.scale.set(1, 1, 0.8);
  const torso = addPart("torso", new CANNON.Vec3(0.25, 0.3, 0.19), 1.2, [0, 0, 0], torsoMesh);

  // Head — the big dome, overlapping the torso so no neck ever shows.
  const headMesh = new THREE.Mesh(track(new THREE.SphereGeometry(0.38, 32, 24)), skin);
  headMesh.scale.set(0.98, 0.9, 0.9);
  const eyeGeo = track(new THREE.SphereGeometry(0.026, 12, 10));
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(eyeGeo, faceMat);
    eye.scale.set(1, 1.7, 0.4);
    eye.position.set(side * 0.14, -0.02, 0.355);
    eye.userData.eye = true; // the walker blinks these
    headMesh.add(eye);
  }
  const mouth = new THREE.Mesh(track(new THREE.SphereGeometry(0.018, 12, 10)), faceMat);
  mouth.scale.set(1.2, 1, 0.4);
  mouth.position.set(0, -0.14, 0.372);
  headMesh.add(mouth);
  const head = addPart("head", new CANNON.Vec3(0.3, 0.28, 0.28), 0.5, [0, 0.5, 0], headMesh);

  const armL = addPart("armL", new CANNON.Vec3(0.075, 0.155, 0.075), 0.12, [-0.27, 0.02, 0], capsule(0.075, 0.16));
  const armR = addPart("armR", new CANNON.Vec3(0.075, 0.155, 0.075), 0.12, [0.27, 0.02, 0], capsule(0.075, 0.16));
  const legL = addPart("legL", new CANNON.Vec3(0.095, 0.215, 0.095), 0.45, [-0.12, -0.5, 0], capsule(0.095, 0.24));
  const legR = addPart("legR", new CANNON.Vec3(0.095, 0.215, 0.095), 0.45, [0.12, -0.5, 0], capsule(0.095, 0.24));

  const constraints: CANNON.Constraint[] = [];
  const joinParts = (
    a: RigPart,
    b: RigPart,
    pivotA: [number, number, number],
    pivotB: [number, number, number],
    angle: number,
    twistAngle: number,
  ) => {
    const constraint = new CANNON.ConeTwistConstraint(a.body, b.body, {
      pivotA: new CANNON.Vec3(...pivotA),
      pivotB: new CANNON.Vec3(...pivotB),
      axisA: CANNON.Vec3.UNIT_Y,
      axisB: CANNON.Vec3.UNIT_Y,
      angle,
      twistAngle,
    });
    constraints.push(constraint);
    world.addConstraint(constraint);
  };
  joinParts(torso, head, [0, 0.3, 0], [0, -0.2, 0], 0.2, 0.3); // neck
  joinParts(torso, armL, [-0.27, 0.18, 0], [0, 0.16, 0], 1.2, 0.6); // shoulders
  joinParts(torso, armR, [0.27, 0.18, 0], [0, 0.16, 0], 1.2, 0.6);
  joinParts(torso, legL, [-0.12, -0.28, 0], [0, 0.22, 0], 0.9, 0.4); // hips
  joinParts(torso, legR, [0.12, -0.28, 0], [0, 0.22, 0], 0.9, 0.4);

  const footY = -0.715;
  const height = 0.84 - footY;

  const wake = () => parts.forEach((part) => part.body.wakeUp());

  const placeAt = (x: number, baseY: number, z: number, lean: number) => {
    for (const part of parts) {
      part.body.position.set(part.home.x + x, part.home.y + baseY, part.home.z + z);
      part.body.quaternion.setFromEuler(lean, 0, 0);
      part.body.velocity.setZero();
      part.body.angularVelocity.setZero();
      part.body.wakeUp();
    }
  };

  const syncMeshes = () => {
    for (const part of parts) {
      part.mesh.position.copy(part.body.position as unknown as THREE.Vector3);
      part.mesh.quaternion.copy(part.body.quaternion as unknown as THREE.Quaternion);
    }
  };

  const syncBodies = () => {
    for (const part of parts) {
      part.body.position.copy(part.mesh.position as unknown as CANNON.Vec3);
      part.body.quaternion.copy(part.mesh.quaternion as unknown as CANNON.Quaternion);
      part.body.velocity.setZero();
      part.body.angularVelocity.setZero();
    }
  };

  const dispose = () => {
    constraints.forEach((constraint) => world.removeConstraint(constraint));
    parts.forEach((part) => world.removeBody(part.body));
    disposables.forEach((item) => item.dispose());
  };

  return {
    group,
    parts,
    byName: { torso, head, armL, armR, legL, legR },
    skin,
    height,
    footY,
    wake,
    placeAt,
    syncMeshes,
    syncBodies,
    dispose,
  };
};
