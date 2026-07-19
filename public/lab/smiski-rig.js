/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ur = "185";
const dg = 2;
const Ln = "", kt = "srgb", fs = "srgb-linear", ps = "linear", Je = "srgb";
const Br = "300 es";
function No(r) {
  for (let e = r.length - 1; e >= 0; --e)
    if (r[e] >= 65535) return !0;
  return !1;
}
function ms(r) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", r);
}
function Uo() {
  const r = ms("canvas");
  return r.style.display = "block", r;
}
const Or = {};
function zr(...r) {
  const e = "THREE." + r.shift();
  console.log(e, ...r);
}
function Qa(r) {
  const e = r[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = r[1];
    t && t.isStackTrace ? r[0] += " " + t.getLocation() : r[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return r;
}
function Pe(...r) {
  r = Qa(r);
  const e = "THREE." + r.shift();
  {
    const t = r[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...r);
  }
}
function Xe(...r) {
  r = Qa(r);
  const e = "THREE." + r.shift();
  {
    const t = r[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...r);
  }
}
function hi(...r) {
  const e = r.join(" ");
  e in Or || (Or[e] = !0, Pe(...r));
}
function Bo(r, e, t) {
  return new Promise(function(n, i) {
    function s() {
      switch (r.clientWaitSync(e, r.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case r.WAIT_FAILED:
          i();
          break;
        case r.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          n();
      }
    }
    setTimeout(s, t);
  });
}
const Oo = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
class Wn {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const i = n[e];
    if (i !== void 0) {
      const s = i.indexOf(t);
      s !== -1 && i.splice(s, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const i = n.slice(0);
      for (let s = 0, a = i.length; s < a; s++)
        i[s].call(this, e);
      e.target = null;
    }
  }
}
const Ct = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let Gr = 1234567;
const Pi = Math.PI / 180, Di = 180 / Math.PI;
function pi() {
  const r = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Ct[r & 255] + Ct[r >> 8 & 255] + Ct[r >> 16 & 255] + Ct[r >> 24 & 255] + "-" + Ct[e & 255] + Ct[e >> 8 & 255] + "-" + Ct[e >> 16 & 15 | 64] + Ct[e >> 24 & 255] + "-" + Ct[t & 63 | 128] + Ct[t >> 8 & 255] + "-" + Ct[t >> 16 & 255] + Ct[t >> 24 & 255] + Ct[n & 255] + Ct[n >> 8 & 255] + Ct[n >> 16 & 255] + Ct[n >> 24 & 255]).toLowerCase();
}
function Ge(r, e, t) {
  return Math.max(e, Math.min(t, r));
}
function dr(r, e) {
  return (r % e + e) % e;
}
function zo(r, e, t, n, i) {
  return n + (r - e) * (i - n) / (t - e);
}
function Go(r, e, t) {
  return r !== e ? (t - r) / (e - r) : 0;
}
function Fi(r, e, t) {
  return (1 - t) * r + t * e;
}
function Vo(r, e, t, n) {
  return Fi(r, e, 1 - Math.exp(-t * n));
}
function Ho(r, e = 1) {
  return e - Math.abs(dr(r, e * 2) - e);
}
function ko(r, e, t) {
  return r <= e ? 0 : r >= t ? 1 : (r = (r - e) / (t - e), r * r * (3 - 2 * r));
}
function Wo(r, e, t) {
  return r <= e ? 0 : r >= t ? 1 : (r = (r - e) / (t - e), r * r * r * (r * (r * 6 - 15) + 10));
}
function Xo(r, e) {
  return r + Math.floor(Math.random() * (e - r + 1));
}
function qo(r, e) {
  return r + Math.random() * (e - r);
}
function Yo(r) {
  return r * (0.5 - Math.random());
}
function Ko(r) {
  r !== void 0 && (Gr = r);
  let e = Gr += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function Zo(r) {
  return r * Pi;
}
function $o(r) {
  return r * Di;
}
function Jo(r) {
  return (r & r - 1) === 0 && r !== 0;
}
function Qo(r) {
  return Math.pow(2, Math.ceil(Math.log(r) / Math.LN2));
}
function jo(r) {
  return Math.pow(2, Math.floor(Math.log(r) / Math.LN2));
}
function el(r, e, t, n, i) {
  const s = Math.cos, a = Math.sin, o = s(t / 2), l = a(t / 2), c = s((e + n) / 2), u = a((e + n) / 2), d = s((e - n) / 2), h = a((e - n) / 2), f = s((n - e) / 2), g = a((n - e) / 2);
  switch (i) {
    case "XYX":
      r.set(o * u, l * d, l * h, o * c);
      break;
    case "YZY":
      r.set(l * h, o * u, l * d, o * c);
      break;
    case "ZXZ":
      r.set(l * d, l * h, o * u, o * c);
      break;
    case "XZX":
      r.set(o * u, l * g, l * f, o * c);
      break;
    case "YXY":
      r.set(l * f, o * u, l * g, o * c);
      break;
    case "ZYZ":
      r.set(l * g, l * f, o * u, o * c);
      break;
    default:
      Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
  }
}
function ci(r, e) {
  switch (e.constructor) {
    case Float32Array:
      return r;
    case Uint32Array:
      return r / 4294967295;
    case Uint16Array:
      return r / 65535;
    case Uint8Array:
      return r / 255;
    case Int32Array:
      return Math.max(r / 2147483647, -1);
    case Int16Array:
      return Math.max(r / 32767, -1);
    case Int8Array:
      return Math.max(r / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Ft(r, e) {
  switch (e.constructor) {
    case Float32Array:
      return r;
    case Uint32Array:
      return Math.round(r * 4294967295);
    case Uint16Array:
      return Math.round(r * 65535);
    case Uint8Array:
      return Math.round(r * 255);
    case Int32Array:
      return Math.round(r * 2147483647);
    case Int16Array:
      return Math.round(r * 32767);
    case Int8Array:
      return Math.round(r * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
const fg = {
  DEG2RAD: Pi,
  RAD2DEG: Di,
  /**
   * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
   * (universally unique identifier).
   *
   * @static
   * @method
   * @return {string} The UUID.
   */
  generateUUID: pi,
  /**
   * Clamps the given value between min and max.
   *
   * @static
   * @method
   * @param {number} value - The value to clamp.
   * @param {number} min - The min value.
   * @param {number} max - The max value.
   * @return {number} The clamped value.
   */
  clamp: Ge,
  /**
   * Computes the Euclidean modulo of the given parameters that
   * is `( ( n % m ) + m ) % m`.
   *
   * @static
   * @method
   * @param {number} n - The first parameter.
   * @param {number} m - The second parameter.
   * @return {number} The Euclidean modulo.
   */
  euclideanModulo: dr,
  /**
   * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
   * for the given value.
   *
   * @static
   * @method
   * @param {number} x - The value to be mapped.
   * @param {number} a1 - Minimum value for range A.
   * @param {number} a2 - Maximum value for range A.
   * @param {number} b1 - Minimum value for range B.
   * @param {number} b2 - Maximum value for range B.
   * @return {number} The mapped value.
   */
  mapLinear: zo,
  /**
   * Returns the percentage in the closed interval `[0, 1]` of the given value
   * between the start and end point.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} value - A value between start and end.
   * @return {number} The interpolation factor.
   */
  inverseLerp: Go,
  /**
   * Returns a value linearly interpolated from two known points based on the given interval -
   * `t = 0` will return `x` and `t = 1` will return `y`.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {number} The interpolated value.
   */
  lerp: Fi,
  /**
   * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
   * time to maintain frame rate independent movement. For details, see
   * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
   *
   * @static
   * @method
   * @param {number} x - The current point.
   * @param {number} y - The target point.
   * @param {number} lambda - A higher lambda value will make the movement more sudden,
   * and a lower value will make the movement more gradual.
   * @param {number} dt - Delta time in seconds.
   * @return {number} The interpolated value.
   */
  damp: Vo,
  /**
   * Returns a value that alternates between `0` and the given `length` parameter.
   *
   * @static
   * @method
   * @param {number} x - The value to pingpong.
   * @param {number} [length=1] - The positive value the function will pingpong to.
   * @return {number} The alternated value.
   */
  pingpong: Ho,
  /**
   * Returns a value in the range `[0,1]` that represents the percentage that `x` has
   * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
   * the `min` and `max`.
   *
   * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smoothstep: ko,
  /**
   * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
   * that has zero 1st and 2nd order derivatives at x=0 and x=1.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smootherstep: Wo,
  /**
   * Returns a random integer from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random integer.
   */
  randInt: Xo,
  /**
   * Returns a random float from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random float.
   */
  randFloat: qo,
  /**
   * Returns a random integer from `<-range/2, range/2>` interval.
   *
   * @static
   * @method
   * @param {number} range - Defines the value range.
   * @return {number} A random float.
   */
  randFloatSpread: Yo,
  /**
   * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
   *
   * @static
   * @method
   * @param {number} [s] - The integer seed.
   * @return {number} A random float.
   */
  seededRandom: Ko,
  /**
   * Converts degrees to radians.
   *
   * @static
   * @method
   * @param {number} degrees - A value in degrees.
   * @return {number} The converted value in radians.
   */
  degToRad: Zo,
  /**
   * Converts radians to degrees.
   *
   * @static
   * @method
   * @param {number} radians - A value in radians.
   * @return {number} The converted value in degrees.
   */
  radToDeg: $o,
  /**
   * Returns `true` if the given number is a power of two.
   *
   * @static
   * @method
   * @param {number} value - The value to check.
   * @return {boolean} Whether the given number is a power of two or not.
   */
  isPowerOfTwo: Jo,
  /**
   * Returns the smallest power of two that is greater than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The smallest power of two that is greater than or equal to the given number.
   */
  ceilPowerOfTwo: Qo,
  /**
   * Returns the largest power of two that is less than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The largest power of two that is less than or equal to the given number.
   */
  floorPowerOfTwo: jo,
  /**
   * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
   * defined by the given angles and order.
   *
   * Rotations are applied to the axes in the order specified by order:
   * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
   *
   * @static
   * @method
   * @param {Quaternion} q - The quaternion to set.
   * @param {number} a - The rotation applied to the first axis, in radians.
   * @param {number} b - The rotation applied to the second axis, in radians.
   * @param {number} c - The rotation applied to the third axis, in radians.
   * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
   */
  setQuaternionFromProperEuler: el,
  /**
   * Normalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The float value in the range `[0,1]` to normalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The normalize value.
   */
  normalize: Ft,
  /**
   * Denormalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The value to denormalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The denormalize (float) value in the range `[0,1]`.
   */
  denormalize: ci
}, Er = class Er {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, i = e.elements;
    return this.x = i[0] * t + i[3] * n + i[6], this.y = i[1] * t + i[4] * n + i[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ge(this.x, e.x, t.x), this.y = Ge(this.y, e.y, t.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ge(this.x, e, t), this.y = Ge(this.y, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ge(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Ge(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(e, t) {
    const n = Math.cos(t), i = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * n - a * i + e.x, this.y = s * i + a * n + e.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
};
Er.prototype.isVector2 = !0;
let We = Er, mi = class {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = i;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(e, t, n, i, s, a, o) {
    let l = n[i + 0], c = n[i + 1], u = n[i + 2], d = n[i + 3], h = s[a + 0], f = s[a + 1], g = s[a + 2], x = s[a + 3];
    if (d !== x || l !== h || c !== f || u !== g) {
      let m = l * h + c * f + u * g + d * x;
      m < 0 && (h = -h, f = -f, g = -g, x = -x, m = -m);
      let p = 1 - o;
      if (m < 0.9995) {
        const M = Math.acos(m), A = Math.sin(M);
        p = Math.sin(p * M) / A, o = Math.sin(o * M) / A, l = l * p + h * o, c = c * p + f * o, u = u * p + g * o, d = d * p + x * o;
      } else {
        l = l * p + h * o, c = c * p + f * o, u = u * p + g * o, d = d * p + x * o;
        const M = 1 / Math.sqrt(l * l + c * c + u * u + d * d);
        l *= M, c *= M, u *= M, d *= M;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = d;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(e, t, n, i, s, a) {
    const o = n[i], l = n[i + 1], c = n[i + 2], u = n[i + 3], d = s[a], h = s[a + 1], f = s[a + 2], g = s[a + 3];
    return e[t] = o * g + u * d + l * f - c * h, e[t + 1] = l * g + u * h + c * d - o * f, e[t + 2] = c * g + u * f + o * h - l * d, e[t + 3] = u * g - o * d - l * h - c * f, e;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(e, t, n, i) {
    return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(e, t = !0) {
    const n = e._x, i = e._y, s = e._z, a = e._order, o = Math.cos, l = Math.sin, c = o(n / 2), u = o(i / 2), d = o(s / 2), h = l(n / 2), f = l(i / 2), g = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = h * u * d + c * f * g, this._y = c * f * d - h * u * g, this._z = c * u * g + h * f * d, this._w = c * u * d - h * f * g;
        break;
      case "YXZ":
        this._x = h * u * d + c * f * g, this._y = c * f * d - h * u * g, this._z = c * u * g - h * f * d, this._w = c * u * d + h * f * g;
        break;
      case "ZXY":
        this._x = h * u * d - c * f * g, this._y = c * f * d + h * u * g, this._z = c * u * g + h * f * d, this._w = c * u * d - h * f * g;
        break;
      case "ZYX":
        this._x = h * u * d - c * f * g, this._y = c * f * d + h * u * g, this._z = c * u * g - h * f * d, this._w = c * u * d + h * f * g;
        break;
      case "YZX":
        this._x = h * u * d + c * f * g, this._y = c * f * d + h * u * g, this._z = c * u * g - h * f * d, this._w = c * u * d - h * f * g;
        break;
      case "XZY":
        this._x = h * u * d - c * f * g, this._y = c * f * d - h * u * g, this._z = c * u * g + h * f * d, this._w = c * u * d + h * f * g;
        break;
      default:
        Pe("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(e, t) {
    const n = t / 2, i = Math.sin(n);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], i = t[4], s = t[8], a = t[1], o = t[5], l = t[9], c = t[2], u = t[6], d = t[10], h = n + o + d;
    if (h > 0) {
      const f = 0.5 / Math.sqrt(h + 1);
      this._w = 0.25 / f, this._x = (u - l) * f, this._y = (s - c) * f, this._z = (a - i) * f;
    } else if (n > o && n > d) {
      const f = 2 * Math.sqrt(1 + n - o - d);
      this._w = (u - l) / f, this._x = 0.25 * f, this._y = (i + a) / f, this._z = (s + c) / f;
    } else if (o > d) {
      const f = 2 * Math.sqrt(1 + o - n - d);
      this._w = (s - c) / f, this._x = (i + a) / f, this._y = 0.25 * f, this._z = (l + u) / f;
    } else {
      const f = 2 * Math.sqrt(1 + d - n - o);
      this._w = (a - i) / f, this._x = (s + c) / f, this._y = (l + u) / f, this._z = 0.25 * f;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Ge(this.dot(e), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const i = Math.min(1, t / n);
    return this.slerp(e, i), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(e, t) {
    const n = e._x, i = e._y, s = e._z, a = e._w, o = t._x, l = t._y, c = t._z, u = t._w;
    return this._x = n * u + a * o + i * c - s * l, this._y = i * u + a * l + s * o - n * c, this._z = s * u + a * c + n * l - i * o, this._w = a * u - n * o - i * l - s * c, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(e, t) {
    let n = e._x, i = e._y, s = e._z, a = e._w, o = this.dot(e);
    o < 0 && (n = -n, i = -i, s = -s, a = -a, o = -o);
    let l = 1 - t;
    if (o < 0.9995) {
      const c = Math.acos(o), u = Math.sin(c);
      l = Math.sin(l * c) / u, t = Math.sin(t * c) / u, this._x = this._x * l + n * t, this._y = this._y * l + i * t, this._z = this._z * l + s * t, this._w = this._w * l + a * t, this._onChangeCallback();
    } else
      this._x = this._x * l + n * t, this._y = this._y * l + i * t, this._z = this._z * l + s * t, this._w = this._w * l + a * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), i = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      i * Math.sin(e),
      i * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
};
const Tr = class Tr {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(e = 0, t = 0, n = 0) {
    this.x = e, this.y = t, this.z = n;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(e) {
    return this.applyQuaternion(Vr.setFromEuler(e));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Vr.setFromAxisAngle(e, t));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, i = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * i, this.y = s[1] * t + s[4] * n + s[7] * i, this.z = s[2] * t + s[5] * n + s[8] * i, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, i = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * n + s[11] * i + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * i + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * i + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * i + s[14]) * a, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(e) {
    const t = this.x, n = this.y, i = this.z, s = e.x, a = e.y, o = e.z, l = e.w, c = 2 * (a * i - o * n), u = 2 * (o * t - s * i), d = 2 * (s * n - a * t);
    return this.x = t + l * c + a * d - o * u, this.y = n + l * u + o * c - s * d, this.z = i + l * d + s * u - a * c, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(e) {
    const t = this.x, n = this.y, i = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * i, this.y = s[1] * t + s[5] * n + s[9] * i, this.z = s[2] * t + s[6] * n + s[10] * i, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ge(this.x, e.x, t.x), this.y = Ge(this.y, e.y, t.y), this.z = Ge(this.z, e.z, t.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ge(this.x, e, t), this.y = Ge(this.y, e, t), this.z = Ge(this.z, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ge(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(e) {
    return this.crossVectors(this, e);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(e, t) {
    const n = e.x, i = e.y, s = e.z, a = t.x, o = t.y, l = t.z;
    return this.x = i * l - s * o, this.y = s * a - n * l, this.z = n * o - i * a, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(e) {
    return ws.copy(this).projectOnVector(e), this.sub(ws);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(e) {
    return this.sub(ws.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Ge(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, i = this.z - e.z;
    return t * t + n * n + i * i;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(e, t, n) {
    const i = Math.sin(t) * e;
    return this.x = i * Math.sin(n), this.y = Math.cos(t) * e, this.z = i * Math.cos(n), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), i = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = i, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
};
Tr.prototype.isVector3 = !0;
let H = Tr;
const ws = /* @__PURE__ */ new H(), Vr = /* @__PURE__ */ new mi(), br = class br {
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(e, t, n, i, s, a, o, l, c) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, i, s, a, o, l, c);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(e, t, n, i, s, a, o, l, c) {
    const u = this.elements;
    return u[0] = e, u[1] = i, u[2] = o, u[3] = t, u[4] = s, u[5] = l, u[6] = n, u[7] = a, u[8] = c, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, i = t.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], u = n[4], d = n[7], h = n[2], f = n[5], g = n[8], x = i[0], m = i[3], p = i[6], M = i[1], A = i[4], S = i[7], b = i[2], T = i[5], C = i[8];
    return s[0] = a * x + o * M + l * b, s[3] = a * m + o * A + l * T, s[6] = a * p + o * S + l * C, s[1] = c * x + u * M + d * b, s[4] = c * m + u * A + d * T, s[7] = c * p + u * S + d * C, s[2] = h * x + f * M + g * b, s[5] = h * m + f * A + g * T, s[8] = h * p + f * S + g * C, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[1], i = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], u = e[8];
    return t * a * u - t * o * c - n * s * u + n * o * l + i * s * c - i * a * l;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], i = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], u = e[8], d = u * a - o * c, h = o * l - u * s, f = c * s - a * l, g = t * d + n * h + i * f;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const x = 1 / g;
    return e[0] = d * x, e[1] = (i * c - u * n) * x, e[2] = (o * n - i * a) * x, e[3] = h * x, e[4] = (u * t - i * l) * x, e[5] = (i * s - o * t) * x, e[6] = f * x, e[7] = (n * l - c * t) * x, e[8] = (a * t - n * s) * x, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(e, t, n, i, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + e,
      -i * c,
      i * l,
      -i * (-c * a + l * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @deprecated
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(e, t) {
    return hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Rs.makeScale(e, t)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(e) {
    return hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Rs.makeRotation(-e)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(e, t) {
    return hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Rs.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let i = 0; i < 9; i++)
      if (t[i] !== n[i]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
br.prototype.isMatrix3 = !0;
let Le = br;
const Rs = /* @__PURE__ */ new Le(), Hr = /* @__PURE__ */ new Le().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), kr = /* @__PURE__ */ new Le().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function tl() {
  const r = {
    enabled: !0,
    workingColorSpace: fs,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(i, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === Je && (i.r = Sn(i.r), i.g = Sn(i.g), i.b = Sn(i.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (i.applyMatrix3(this.spaces[s].toXYZ), i.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === Je && (i.r = ui(i.r), i.g = ui(i.g), i.b = ui(i.b))), i;
    },
    workingToColorSpace: function(i, s) {
      return this.convert(i, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(i, s) {
      return this.convert(i, s, this.workingColorSpace);
    },
    getPrimaries: function(i) {
      return this.spaces[i].primaries;
    },
    getTransfer: function(i) {
      return i === Ln ? ps : this.spaces[i].transfer;
    },
    getToneMappingMode: function(i) {
      return this.spaces[i].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(i, s = this.workingColorSpace) {
      return i.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(i) {
      Object.assign(this.spaces, i);
    },
    // Internal APIs
    _getMatrix: function(i, s, a) {
      return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(i) {
      return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(i = this.workingColorSpace) {
      return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(i, s) {
      return hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), r.workingToColorSpace(i, s);
    },
    toWorkingColorSpace: function(i, s) {
      return hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), r.colorSpaceToWorking(i, s);
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return r.define({
    [fs]: {
      primaries: e,
      whitePoint: n,
      transfer: ps,
      toXYZ: Hr,
      fromXYZ: kr,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: kt },
      outputColorSpaceConfig: { drawingBufferColorSpace: kt }
    },
    [kt]: {
      primaries: e,
      whitePoint: n,
      transfer: Je,
      toXYZ: Hr,
      fromXYZ: kr,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: kt }
    }
  }), r;
}
const He = /* @__PURE__ */ tl();
function Sn(r) {
  return r < 0.04045 ? r * 0.0773993808 : Math.pow(r * 0.9478672986 + 0.0521327014, 2.4);
}
function ui(r) {
  return r < 31308e-7 ? r * 12.92 : 1.055 * Math.pow(r, 0.41666) - 0.055;
}
let Kn;
class nl {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let n;
    if (e instanceof HTMLCanvasElement)
      n = e;
    else {
      Kn === void 0 && (Kn = ms("canvas")), Kn.width = e.width, Kn.height = e.height;
      const i = Kn.getContext("2d");
      e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = Kn;
    }
    return n.toDataURL(t);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = ms("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const i = n.getImageData(0, 0, e.width, e.height), s = i.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Sn(s[a] / 255) * 255;
      return n.putImageData(i, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Sn(t[n] / 255) * 255) : t[n] = Sn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let il = 0;
class fr {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: il++ }), this.uuid = pi(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, i = this.data;
    if (i !== null) {
      let s;
      if (Array.isArray(i)) {
        s = [];
        for (let a = 0, o = i.length; a < o; a++)
          i[a].isDataTexture ? s.push(Cs(i[a].image)) : s.push(Cs(i[a]));
      } else
        s = Cs(i);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Cs(r) {
  return typeof HTMLImageElement < "u" && r instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && r instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && r instanceof ImageBitmap ? nl.getDataURL(r) : r.data ? {
    data: Array.from(r.data),
    width: r.width,
    height: r.height,
    type: r.data.constructor.name
  } : (Pe("Texture: Unable to serialize Texture."), {});
}
let sl = 0;
const Ps = /* @__PURE__ */ new H();
class It extends Wn {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = It.DEFAULT_IMAGE, t = It.DEFAULT_MAPPING, n = 1001, i = 1001, s = 1006, a = 1008, o = 1023, l = 1009, c = It.DEFAULT_ANISOTROPY, u = Ln) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: sl++ }), this.uuid = pi(), this.name = "", this.source = new fr(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = i, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new We(0, 0), this.repeat = new We(1, 1), this.center = new We(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Le(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(Ps).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(Ps).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(Ps).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  /**
   * Updates the texture transformation matrix from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (n === void 0) {
        Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const i = this[t];
      if (i === void 0) {
        Pe(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      i && n && i.isVector2 && n.isVector2 || i && n && i.isVector3 && n.isVector3 || i && n && i.isMatrix3 && n.isMatrix3 ? i.copy(n) : this[t] = n;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
It.DEFAULT_IMAGE = null;
It.DEFAULT_MAPPING = 300;
It.DEFAULT_ANISOTROPY = 1;
const Ar = class Ar {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.x = e, this.y = t, this.z = n, this.w = i;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(e, t, n, i) {
    return this.x = e, this.y = t, this.z = n, this.w = i, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(e) {
    return this.w = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, i = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * i + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * i + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * i + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * i + a[15] * s, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(e) {
    let t, n, i, s;
    const l = e.elements, c = l[0], u = l[4], d = l[8], h = l[1], f = l[5], g = l[9], x = l[2], m = l[6], p = l[10];
    if (Math.abs(u - h) < 0.01 && Math.abs(d - x) < 0.01 && Math.abs(g - m) < 0.01) {
      if (Math.abs(u + h) < 0.1 && Math.abs(d + x) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(c + f + p - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const A = (c + 1) / 2, S = (f + 1) / 2, b = (p + 1) / 2, T = (u + h) / 4, C = (d + x) / 4, v = (g + m) / 4;
      return A > S && A > b ? A < 0.01 ? (n = 0, i = 0.707106781, s = 0.707106781) : (n = Math.sqrt(A), i = T / n, s = C / n) : S > b ? S < 0.01 ? (n = 0.707106781, i = 0, s = 0.707106781) : (i = Math.sqrt(S), n = T / i, s = v / i) : b < 0.01 ? (n = 0.707106781, i = 0.707106781, s = 0) : (s = Math.sqrt(b), n = C / s, i = v / s), this.set(n, i, s, t), this;
    }
    let M = Math.sqrt((m - g) * (m - g) + (d - x) * (d - x) + (h - u) * (h - u));
    return Math.abs(M) < 1e-3 && (M = 1), this.x = (m - g) / M, this.y = (d - x) / M, this.z = (h - u) / M, this.w = Math.acos((c + f + p - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ge(this.x, e.x, t.x), this.y = Ge(this.y, e.y, t.y), this.z = Ge(this.z, e.z, t.z), this.w = Ge(this.w, e.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ge(this.x, e, t), this.y = Ge(this.y, e, t), this.z = Ge(this.z, e, t), this.w = Ge(this.w, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ge(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
Ar.prototype.isVector4 = !0;
let at = Ar;
class rl extends Wn {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
   * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new at(0, 0, e, t), this.scissorTest = !1, this.viewport = new at(0, 0, e, t), this.textures = [];
    const i = { width: e, height: t, depth: n.depth }, s = new It(i), a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: 1006,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(t);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let i = 0, s = this.textures.length; i < s; i++)
        this.textures[i].image.width = e, this.textures[i].image.height = t, this.textures[i].image.depth = n, this.textures[i].isData3DTexture !== !0 && (this.textures[i].isArrayTexture = this.textures[i].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const i = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new fr(i);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class ln extends rl {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class ja extends It {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: i }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class al extends It {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: i }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const _s = class _s {
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(e, t, n, i, s, a, o, l, c, u, d, h, f, g, x, m) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, i, s, a, o, l, c, u, d, h, f, g, x, m);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(e, t, n, i, s, a, o, l, c, u, d, h, f, g, x, m) {
    const p = this.elements;
    return p[0] = e, p[4] = t, p[8] = n, p[12] = i, p[1] = s, p[5] = a, p[9] = o, p[13] = l, p[2] = c, p[6] = u, p[10] = d, p[14] = h, p[3] = f, p[7] = g, p[11] = x, p[15] = m, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new _s().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(e) {
    if (e.determinantAffine() === 0)
      return this.identity();
    const t = this.elements, n = e.elements, i = 1 / Zn.setFromMatrixColumn(e, 0).length(), s = 1 / Zn.setFromMatrixColumn(e, 1).length(), a = 1 / Zn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * i, t[1] = n[1] * i, t[2] = n[2] * i, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, i = e.y, s = e.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(i), c = Math.sin(i), u = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const h = a * u, f = a * d, g = o * u, x = o * d;
      t[0] = l * u, t[4] = -l * d, t[8] = c, t[1] = f + g * c, t[5] = h - x * c, t[9] = -o * l, t[2] = x - h * c, t[6] = g + f * c, t[10] = a * l;
    } else if (e.order === "YXZ") {
      const h = l * u, f = l * d, g = c * u, x = c * d;
      t[0] = h + x * o, t[4] = g * o - f, t[8] = a * c, t[1] = a * d, t[5] = a * u, t[9] = -o, t[2] = f * o - g, t[6] = x + h * o, t[10] = a * l;
    } else if (e.order === "ZXY") {
      const h = l * u, f = l * d, g = c * u, x = c * d;
      t[0] = h - x * o, t[4] = -a * d, t[8] = g + f * o, t[1] = f + g * o, t[5] = a * u, t[9] = x - h * o, t[2] = -a * c, t[6] = o, t[10] = a * l;
    } else if (e.order === "ZYX") {
      const h = a * u, f = a * d, g = o * u, x = o * d;
      t[0] = l * u, t[4] = g * c - f, t[8] = h * c + x, t[1] = l * d, t[5] = x * c + h, t[9] = f * c - g, t[2] = -c, t[6] = o * l, t[10] = a * l;
    } else if (e.order === "YZX") {
      const h = a * l, f = a * c, g = o * l, x = o * c;
      t[0] = l * u, t[4] = x - h * d, t[8] = g * d + f, t[1] = d, t[5] = a * u, t[9] = -o * u, t[2] = -c * u, t[6] = f * d + g, t[10] = h - x * d;
    } else if (e.order === "XZY") {
      const h = a * l, f = a * c, g = o * l, x = o * c;
      t[0] = l * u, t[4] = -d, t[8] = c * u, t[1] = h * d + x, t[5] = a * u, t[9] = f * d - g, t[2] = g * d - f, t[6] = o * u, t[10] = x * d + h;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(e) {
    return this.compose(ol, e, ll);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(e, t, n) {
    const i = this.elements;
    return Bt.subVectors(e, t), Bt.lengthSq() === 0 && (Bt.z = 1), Bt.normalize(), bn.crossVectors(n, Bt), bn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Bt.x += 1e-4 : Bt.z += 1e-4, Bt.normalize(), bn.crossVectors(n, Bt)), bn.normalize(), zi.crossVectors(Bt, bn), i[0] = bn.x, i[4] = zi.x, i[8] = Bt.x, i[1] = bn.y, i[5] = zi.y, i[9] = Bt.y, i[2] = bn.z, i[6] = zi.z, i[10] = Bt.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, i = t.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], u = n[1], d = n[5], h = n[9], f = n[13], g = n[2], x = n[6], m = n[10], p = n[14], M = n[3], A = n[7], S = n[11], b = n[15], T = i[0], C = i[4], v = i[8], w = i[12], P = i[1], F = i[5], L = i[9], I = i[13], U = i[2], D = i[6], N = i[10], V = i[14], W = i[3], K = i[7], ie = i[11], se = i[15];
    return s[0] = a * T + o * P + l * U + c * W, s[4] = a * C + o * F + l * D + c * K, s[8] = a * v + o * L + l * N + c * ie, s[12] = a * w + o * I + l * V + c * se, s[1] = u * T + d * P + h * U + f * W, s[5] = u * C + d * F + h * D + f * K, s[9] = u * v + d * L + h * N + f * ie, s[13] = u * w + d * I + h * V + f * se, s[2] = g * T + x * P + m * U + p * W, s[6] = g * C + x * F + m * D + p * K, s[10] = g * v + x * L + m * N + p * ie, s[14] = g * w + x * I + m * V + p * se, s[3] = M * T + A * P + S * U + b * W, s[7] = M * C + A * F + S * D + b * K, s[11] = M * v + A * L + S * N + b * ie, s[15] = M * w + A * I + S * V + b * se, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[4], i = e[8], s = e[12], a = e[1], o = e[5], l = e[9], c = e[13], u = e[2], d = e[6], h = e[10], f = e[14], g = e[3], x = e[7], m = e[11], p = e[15], M = l * f - c * h, A = o * f - c * d, S = o * h - l * d, b = a * f - c * u, T = a * h - l * u, C = a * d - o * u;
    return t * (x * M - m * A + p * S) - n * (g * M - m * b + p * T) + i * (g * A - x * b + p * C) - s * (g * S - x * T + m * C);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const e = this.elements, t = e[0], n = e[4], i = e[8], s = e[1], a = e[5], o = e[9], l = e[2], c = e[6], u = e[10];
    return t * (a * u - o * c) - n * (s * u - o * l) + i * (s * c - a * l);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(e, t, n) {
    const i = this.elements;
    return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = n), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], i = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], u = e[8], d = e[9], h = e[10], f = e[11], g = e[12], x = e[13], m = e[14], p = e[15], M = t * o - n * a, A = t * l - i * a, S = t * c - s * a, b = n * l - i * o, T = n * c - s * o, C = i * c - s * l, v = u * x - d * g, w = u * m - h * g, P = u * p - f * g, F = d * m - h * x, L = d * p - f * x, I = h * p - f * m, U = M * I - A * L + S * F + b * P - T * w + C * v;
    if (U === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const D = 1 / U;
    return e[0] = (o * I - l * L + c * F) * D, e[1] = (i * L - n * I - s * F) * D, e[2] = (x * C - m * T + p * b) * D, e[3] = (h * T - d * C - f * b) * D, e[4] = (l * P - a * I - c * w) * D, e[5] = (t * I - i * P + s * w) * D, e[6] = (m * S - g * C - p * A) * D, e[7] = (u * C - h * S + f * A) * D, e[8] = (a * L - o * P + c * v) * D, e[9] = (n * P - t * L - s * v) * D, e[10] = (g * T - x * S + p * M) * D, e[11] = (d * S - u * T - f * M) * D, e[12] = (o * w - a * F - l * v) * D, e[13] = (t * F - n * w + i * v) * D, e[14] = (x * A - g * b - m * M) * D, e[15] = (u * b - d * A + h * M) * D, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(e) {
    const t = this.elements, n = e.x, i = e.y, s = e.z;
    return t[0] *= n, t[4] *= i, t[8] *= s, t[1] *= n, t[5] *= i, t[9] *= s, t[2] *= n, t[6] *= i, t[10] *= s, t[3] *= n, t[7] *= i, t[11] *= s, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, i));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(e, t) {
    const n = Math.cos(t), i = Math.sin(t), s = 1 - n, a = e.x, o = e.y, l = e.z, c = s * a, u = s * o;
    return this.set(
      c * a + n,
      c * o - i * l,
      c * l + i * o,
      0,
      c * o + i * l,
      u * o + n,
      u * l - i * a,
      0,
      c * l - i * o,
      u * l + i * a,
      s * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(e, t, n, i, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      i,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(e, t, n) {
    const i = this.elements, s = t._x, a = t._y, o = t._z, l = t._w, c = s + s, u = a + a, d = o + o, h = s * c, f = s * u, g = s * d, x = a * u, m = a * d, p = o * d, M = l * c, A = l * u, S = l * d, b = n.x, T = n.y, C = n.z;
    return i[0] = (1 - (x + p)) * b, i[1] = (f + S) * b, i[2] = (g - A) * b, i[3] = 0, i[4] = (f - S) * T, i[5] = (1 - (h + p)) * T, i[6] = (m + M) * T, i[7] = 0, i[8] = (g + A) * C, i[9] = (m - M) * C, i[10] = (1 - (h + x)) * C, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(e, t, n) {
    const i = this.elements;
    e.x = i[12], e.y = i[13], e.z = i[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), t.identity(), this;
    let a = Zn.set(i[0], i[1], i[2]).length();
    const o = Zn.set(i[4], i[5], i[6]).length(), l = Zn.set(i[8], i[9], i[10]).length();
    s < 0 && (a = -a), Xt.copy(this);
    const c = 1 / a, u = 1 / o, d = 1 / l;
    return Xt.elements[0] *= c, Xt.elements[1] *= c, Xt.elements[2] *= c, Xt.elements[4] *= u, Xt.elements[5] *= u, Xt.elements[6] *= u, Xt.elements[8] *= d, Xt.elements[9] *= d, Xt.elements[10] *= d, t.setFromRotationMatrix(Xt), n.x = a, n.y = o, n.z = l, this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(e, t, n, i, s, a, o = 2e3, l = !1) {
    const c = this.elements, u = 2 * s / (t - e), d = 2 * s / (n - i), h = (t + e) / (t - e), f = (n + i) / (n - i);
    let g, x;
    if (l)
      g = s / (a - s), x = a * s / (a - s);
    else if (o === 2e3)
      g = -(a + s) / (a - s), x = -2 * a * s / (a - s);
    else if (o === 2001)
      g = -a / (a - s), x = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return c[0] = u, c[4] = 0, c[8] = h, c[12] = 0, c[1] = 0, c[5] = d, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = g, c[14] = x, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(e, t, n, i, s, a, o = 2e3, l = !1) {
    const c = this.elements, u = 2 / (t - e), d = 2 / (n - i), h = -(t + e) / (t - e), f = -(n + i) / (n - i);
    let g, x;
    if (l)
      g = 1 / (a - s), x = a / (a - s);
    else if (o === 2e3)
      g = -2 / (a - s), x = -(a + s) / (a - s);
    else if (o === 2001)
      g = -1 / (a - s), x = -s / (a - s);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return c[0] = u, c[4] = 0, c[8] = 0, c[12] = h, c[1] = 0, c[5] = d, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = g, c[14] = x, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let i = 0; i < 16; i++)
      if (t[i] !== n[i]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
};
_s.prototype.isMatrix4 = !0;
let ot = _s;
const Zn = /* @__PURE__ */ new H(), Xt = /* @__PURE__ */ new ot(), ol = /* @__PURE__ */ new H(0, 0, 0), ll = /* @__PURE__ */ new H(1, 1, 1), bn = /* @__PURE__ */ new H(), zi = /* @__PURE__ */ new H(), Bt = /* @__PURE__ */ new H(), Wr = /* @__PURE__ */ new ot(), Xr = /* @__PURE__ */ new mi();
class Dn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(e = 0, t = 0, n = 0, i = Dn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = i;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(e, t, n, i = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = i, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const i = e.elements, s = i[0], a = i[4], o = i[8], l = i[1], c = i[5], u = i[9], d = i[2], h = i[6], f = i[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(Ge(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-u, f), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(h, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Ge(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Ge(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-d, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Ge(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(h, f), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Ge(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(o, f));
        break;
      case "XZY":
        this._z = Math.asin(-Ge(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(h, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-u, f), this._y = 0);
        break;
      default:
        Pe("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(e, t, n) {
    return Wr.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Wr, t, n);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(e) {
    return Xr.setFromEuler(this), this.setFromQuaternion(Xr, e);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Dn.DEFAULT_ORDER = "XYZ";
class pr {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = -1;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let cl = 0;
const qr = /* @__PURE__ */ new H(), $n = /* @__PURE__ */ new mi(), un = /* @__PURE__ */ new ot(), Gi = /* @__PURE__ */ new H(), vi = /* @__PURE__ */ new H(), hl = /* @__PURE__ */ new H(), ul = /* @__PURE__ */ new mi(), Yr = /* @__PURE__ */ new H(1, 0, 0), Kr = /* @__PURE__ */ new H(0, 1, 0), Zr = /* @__PURE__ */ new H(0, 0, 1), $r = { type: "added" }, dl = { type: "removed" }, Jn = { type: "childadded", child: null }, Fs = { type: "childremoved", child: null };
class wt extends Wn {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: cl++ }), this.uuid = pi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = wt.DEFAULT_UP.clone();
    const e = new H(), t = new Dn(), n = new mi(), i = new H(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(a), Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new ot()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Le()
      }
    }), this.matrix = new ot(), this.matrixWorld = new ot(), this.matrixAutoUpdate = wt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new pr(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(e, t) {
    return $n.setFromAxisAngle(e, t), this.quaternion.multiply($n), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(e, t) {
    return $n.setFromAxisAngle(e, t), this.quaternion.premultiply($n), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(e) {
    return this.rotateOnAxis(Yr, e);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(e) {
    return this.rotateOnAxis(Kr, e);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(e) {
    return this.rotateOnAxis(Zr, e);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(e, t) {
    return qr.copy(e).applyQuaternion(this.quaternion), this.position.add(qr.multiplyScalar(t)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(e) {
    return this.translateOnAxis(Yr, e);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(e) {
    return this.translateOnAxis(Kr, e);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(e) {
    return this.translateOnAxis(Zr, e);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(un.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(e, t, n) {
    e.isVector3 ? Gi.copy(e) : Gi.set(e, t, n);
    const i = this.parent;
    this.updateWorldMatrix(!0, !1), vi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? un.lookAt(vi, Gi, this.up) : un.lookAt(Gi, vi, this.up), this.quaternion.setFromRotationMatrix(un), i && (un.extractRotation(i.matrixWorld), $n.setFromRotationMatrix(un), this.quaternion.premultiply($n.invert()));
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (Xe("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent($r), Jn.child = e, this.dispatchEvent(Jn), Jn.child = null) : Xe("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(dl), Fs.child = e, this.dispatchEvent(Fs), Fs.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(e) {
    return this.updateWorldMatrix(!0, !1), un.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), un.multiply(e.parent.matrixWorld)), e.applyMatrix4(un), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent($r), Jn.child = e, this.dispatchEvent(Jn), Jn.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, i = this.children.length; n < i; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const i = this.children;
    for (let s = 0, a = i.length; s < a; s++)
      i[s].getObjectsByProperty(e, t, n);
    return n;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(vi, e, hl), e;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(vi, ul, e), e;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, i = t.length; n < i; n++)
      t[n].traverse(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, i = t.length; n < i; n++)
      t[n].traverseVisible(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x, n = e.y, i = e.z, s = this.matrix.elements;
      s[12] += t - s[0] * t - s[4] * n - s[8] * i, s[13] += n - s[1] * t - s[5] * n - s[9] * i, s[14] += i - s[2] * t - s[6] * n - s[10] * i;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, i = t.length; n < i; n++)
      t[n].updateMatrixWorld(e);
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateWorldMatrix(e, t, n = !1) {
    const i = this.parent;
    if (e === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
      const s = this.children;
      for (let a = 0, o = s.length; a < o; a++)
        s[a].updateWorldMatrix(!1, !0, n);
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const i = {};
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.castShadow === !0 && (i.castShadow = !0), this.receiveShadow === !0 && (i.receiveShadow = !0), this.visible === !1 && (i.visible = !1), this.frustumCulled === !1 && (i.frustumCulled = !1), this.renderOrder !== 0 && (i.renderOrder = this.renderOrder), this.static !== !1 && (i.static = this.static), Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), i.up = this.up.toArray(), this.pivot !== null && (i.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (i.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (i.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (i.type = "BatchedMesh", i.perObjectFrustumCulled = this.perObjectFrustumCulled, i.sortObjects = this.sortObjects, i.drawRanges = this._drawRanges, i.reservedRanges = this._reservedRanges, i.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), i.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), i.availableInstanceIds = this._availableInstanceIds.slice(), i.availableGeometryIds = this._availableGeometryIds.slice(), i.nextIndexStart = this._nextIndexStart, i.nextVertexStart = this._nextVertexStart, i.geometryCount = this._geometryCount, i.maxInstanceCount = this._maxInstanceCount, i.maxVertexCount = this._maxVertexCount, i.maxIndexCount = this._maxIndexCount, i.geometryInitialized = this._geometryInitialized, i.matricesTexture = this._matricesTexture.toJSON(e), i.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (i.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (i.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (i.boundingBox = this.boundingBox.toJSON()));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (i.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      i.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, u = l.length; c < u; c++) {
            const d = l[c];
            s(e.shapes, d);
          }
        else
          s(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(s(e.materials, this.material[l]));
        i.material = o;
      } else
        i.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      i.children = [];
      for (let o = 0; o < this.children.length; o++)
        i.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      i.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        i.animations.push(s(e.animations, l));
      }
    }
    if (t) {
      const o = a(e.geometries), l = a(e.materials), c = a(e.textures), u = a(e.images), d = a(e.shapes), h = a(e.skeletons), f = a(e.animations), g = a(e.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), u.length > 0 && (n.images = u), d.length > 0 && (n.shapes = d), h.length > 0 && (n.skeletons = h), f.length > 0 && (n.animations = f), g.length > 0 && (n.nodes = g);
    }
    return n.object = i, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const u = o[c];
        delete u.metadata, l.push(u);
      }
      return l;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot !== null ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const i = e.children[n];
        this.add(i.clone());
      }
    return this;
  }
}
wt.DEFAULT_UP = /* @__PURE__ */ new H(0, 1, 0);
wt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Ri extends wt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const fl = { type: "move" };
class Ls {
  /**
   * Constructs a new XR controller.
   */
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  /**
   * Returns a group representing the hand space of the XR controller.
   *
   * @return {Group} A group representing the hand space of the XR controller.
   */
  getHandSpace() {
    return this._hand === null && (this._hand = new Ri(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Ri(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new H(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new H()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new Ri(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new H(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new H(), this._grip.eventsEnabled = !1), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  /**
   * Updates the controller with the given input source, XR frame and reference space.
   * This updates the transformations of the groups that represent the different
   * coordinate systems of the controller.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @param {XRFrame} frame - The XR frame.
   * @param {XRReferenceSpace} referenceSpace - The reference space.
   * @return {WebXRController} A reference to this instance.
   */
  update(e, t, n) {
    let i = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        a = !0;
        for (const x of e.hand.values()) {
          const m = t.getJointPose(x, n), p = this._getHandJoint(c, x);
          m !== null && (p.matrix.fromArray(m.transform.matrix), p.matrix.decompose(p.position, p.rotation, p.scale), p.matrixWorldNeedsUpdate = !0, p.jointRadius = m.radius), p.visible = m !== null;
        }
        const u = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], h = u.position.distanceTo(d.position), f = 0.02, g = 5e-3;
        c.inputState.pinching && h > f + g ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && h <= f - g && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1, l.eventsEnabled && l.dispatchEvent({
          type: "gripUpdated",
          data: e,
          target: this
        })));
      o !== null && (i = t.getPose(e.targetRaySpace, n), i === null && s !== null && (i = s), i !== null && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(i.linearVelocity)) : o.hasLinearVelocity = !1, i.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(i.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(fl)));
    }
    return o !== null && (o.visible = i !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new Ri();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const eo = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, An = { h: 0, s: 0, l: 0 }, Vi = { h: 0, s: 0, l: 0 };
function Is(r, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? r + (e - r) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? r + (e - r) * 6 * (2 / 3 - t) : r;
}
class ke {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const i = e;
      i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(e, t = kt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, He.colorSpaceToWorking(this, t), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(e, t, n, i = He.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, He.colorSpaceToWorking(this, i), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(e, t, n, i = He.workingColorSpace) {
    if (e = dr(e, 1), t = Ge(t, 0, 1), n = Ge(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - s;
      this.r = Is(a, s, e + 1 / 3), this.g = Is(a, s, e), this.b = Is(a, s, e - 1 / 3);
    }
    return He.colorSpaceToWorking(this, i), this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(e, t = kt) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && Pe("Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = i[1], o = i[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          Pe("Color: Unknown color model " + e);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = i[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      Pe("Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(e, t = kt) {
    const n = eo[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : Pe("Color: Unknown color " + e), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(e) {
    return this.r = Sn(e.r), this.g = Sn(e.g), this.b = Sn(e.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(e) {
    return this.r = ui(e.r), this.g = ui(e.g), this.b = ui(e.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(e = kt) {
    return He.workingToColorSpace(Pt.copy(this), e), Math.round(Ge(Pt.r * 255, 0, 255)) * 65536 + Math.round(Ge(Pt.g * 255, 0, 255)) * 256 + Math.round(Ge(Pt.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(e = kt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(e, t = He.workingColorSpace) {
    He.workingToColorSpace(Pt.copy(this), t);
    const n = Pt.r, i = Pt.g, s = Pt.b, a = Math.max(n, i, s), o = Math.min(n, i, s);
    let l, c;
    const u = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const d = a - o;
      switch (c = u <= 0.5 ? d / (a + o) : d / (2 - a - o), a) {
        case n:
          l = (i - s) / d + (i < s ? 6 : 0);
          break;
        case i:
          l = (s - n) / d + 2;
          break;
        case s:
          l = (n - i) / d + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = u, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(e, t = He.workingColorSpace) {
    return He.workingToColorSpace(Pt.copy(this), t), e.r = Pt.r, e.g = Pt.g, e.b = Pt.b, e;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(e = kt) {
    He.workingToColorSpace(Pt.copy(this), e);
    const t = Pt.r, n = Pt.g, i = Pt.b;
    return e !== kt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(i * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(e, t, n) {
    return this.getHSL(An), this.setHSL(An.h + e, An.s + t, An.l + n);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(e, t) {
    this.getHSL(An), e.getHSL(Vi);
    const n = Fi(An.h, Vi.h, t), i = Fi(An.s, Vi.s, t), s = Fi(An.l, Vi.l, t);
    return this.setHSL(n, i, s), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(e) {
    const t = this.r, n = this.g, i = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * i, this.g = s[1] * t + s[4] * n + s[7] * i, this.b = s[2] * t + s[5] * n + s[8] * i, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Pt = /* @__PURE__ */ new ke();
ke.NAMES = eo;
class mg extends wt {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Dn(), this.environmentIntensity = 1, this.environmentRotation = new Dn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
const qt = /* @__PURE__ */ new H(), dn = /* @__PURE__ */ new H(), Ds = /* @__PURE__ */ new H(), fn = /* @__PURE__ */ new H(), Qn = /* @__PURE__ */ new H(), jn = /* @__PURE__ */ new H(), Jr = /* @__PURE__ */ new H(), Ns = /* @__PURE__ */ new H(), Us = /* @__PURE__ */ new H(), Bs = /* @__PURE__ */ new H(), Os = /* @__PURE__ */ new at(), zs = /* @__PURE__ */ new at(), Gs = /* @__PURE__ */ new at();
class $t {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(e = new H(), t = new H(), n = new H()) {
    this.a = e, this.b = t, this.c = n;
  }
  /**
   * Computes the normal vector of a triangle.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  static getNormal(e, t, n, i) {
    i.subVectors(n, t), qt.subVectors(e, t), i.cross(qt);
    const s = i.lengthSq();
    return s > 0 ? i.multiplyScalar(1 / Math.sqrt(s)) : i.set(0, 0, 0);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  static getBarycoord(e, t, n, i, s) {
    qt.subVectors(i, t), dn.subVectors(n, t), Ds.subVectors(e, t);
    const a = qt.dot(qt), o = qt.dot(dn), l = qt.dot(Ds), c = dn.dot(dn), u = dn.dot(Ds), d = a * c - o * o;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const h = 1 / d, f = (c * l - o * u) * h, g = (a * u - o * l) * h;
    return s.set(1 - f - g, g, f);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  static containsPoint(e, t, n, i) {
    return this.getBarycoord(e, t, n, i, fn) === null ? !1 : fn.x >= 0 && fn.y >= 0 && fn.x + fn.y <= 1;
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} p1 - The first corner of the triangle.
   * @param {Vector3} p2 - The second corner of the triangle.
   * @param {Vector3} p3 - The third corner of the triangle.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  static getInterpolation(e, t, n, i, s, a, o, l) {
    return this.getBarycoord(e, t, n, i, fn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, fn.x), l.addScaledVector(a, fn.y), l.addScaledVector(o, fn.z), l);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(e, t, n, i, s, a) {
    return Os.setScalar(0), zs.setScalar(0), Gs.setScalar(0), Os.fromBufferAttribute(e, t), zs.fromBufferAttribute(e, n), Gs.fromBufferAttribute(e, i), a.setScalar(0), a.addScaledVector(Os, s.x), a.addScaledVector(zs, s.y), a.addScaledVector(Gs, s.z), a;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(e, t, n, i) {
    return qt.subVectors(n, t), dn.subVectors(e, t), qt.cross(dn).dot(i) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(e, t, n, i) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(e, t, n, i) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, i), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return qt.subVectors(this.c, this.b), dn.subVectors(this.a, this.b), qt.cross(dn).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(e) {
    return $t.getNormal(this.a, this.b, this.c, e);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(e, t) {
    return $t.getBarycoord(e, this.a, this.b, this.c, t);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(e, t, n, i, s) {
    return $t.getInterpolation(e, this.a, this.b, this.c, t, n, i, s);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(e) {
    return $t.containsPoint(e, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(e) {
    return $t.isFrontFacing(this.a, this.b, this.c, e);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(e, t) {
    const n = this.a, i = this.b, s = this.c;
    let a, o;
    Qn.subVectors(i, n), jn.subVectors(s, n), Ns.subVectors(e, n);
    const l = Qn.dot(Ns), c = jn.dot(Ns);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    Us.subVectors(e, i);
    const u = Qn.dot(Us), d = jn.dot(Us);
    if (u >= 0 && d <= u)
      return t.copy(i);
    const h = l * d - u * c;
    if (h <= 0 && l >= 0 && u <= 0)
      return a = l / (l - u), t.copy(n).addScaledVector(Qn, a);
    Bs.subVectors(e, s);
    const f = Qn.dot(Bs), g = jn.dot(Bs);
    if (g >= 0 && f <= g)
      return t.copy(s);
    const x = f * c - l * g;
    if (x <= 0 && c >= 0 && g <= 0)
      return o = c / (c - g), t.copy(n).addScaledVector(jn, o);
    const m = u * g - f * d;
    if (m <= 0 && d - u >= 0 && f - g >= 0)
      return Jr.subVectors(s, i), o = (d - u) / (d - u + (f - g)), t.copy(i).addScaledVector(Jr, o);
    const p = 1 / (m + x + h);
    return a = x * p, o = h * p, t.copy(n).addScaledVector(Qn, a).addScaledVector(jn, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class Ni {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(e = new H(1 / 0, 1 / 0, 1 / 0), t = new H(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Yt.fromArray(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Yt.fromBufferAttribute(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(e, t) {
    const n = Yt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * Note: To compute the correct bounding box, make sure the given 3D object
   * has an up-to-date world matrix that reflects the current transformation of its
   * ancestor nodes. Call `object.updateWorldMatrix( true, false )` beforehand if
   * you're unsure.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, Yt) : Yt.fromBufferAttribute(s, a), Yt.applyMatrix4(e.matrixWorld), this.expandByPoint(Yt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Hi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Hi.copy(n.boundingBox)), Hi.applyMatrix4(e.matrixWorld), this.union(Hi);
    }
    const i = e.children;
    for (let s = 0, a = i.length; s < a; s++)
      this.expandByObject(i[s], t);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(e) {
    return this.clampPoint(e.center, Yt), Yt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(xi), ki.subVectors(this.max, xi), ei.subVectors(e.a, xi), ti.subVectors(e.b, xi), ni.subVectors(e.c, xi), wn.subVectors(ti, ei), Rn.subVectors(ni, ti), Un.subVectors(ei, ni);
    let t = [
      0,
      -wn.z,
      wn.y,
      0,
      -Rn.z,
      Rn.y,
      0,
      -Un.z,
      Un.y,
      wn.z,
      0,
      -wn.x,
      Rn.z,
      0,
      -Rn.x,
      Un.z,
      0,
      -Un.x,
      -wn.y,
      wn.x,
      0,
      -Rn.y,
      Rn.x,
      0,
      -Un.y,
      Un.x,
      0
    ];
    return !Vs(t, ei, ti, ni, ki) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Vs(t, ei, ti, ni, ki)) ? !1 : (Wi.crossVectors(wn, Rn), t = [Wi.x, Wi.y, Wi.z], Vs(t, ei, ti, ni, ki));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(e) {
    return this.clampPoint(e, Yt).distanceTo(e);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Yt).length() * 0.5), e;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(e) {
    return this.isEmpty() ? this : (pn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), pn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), pn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), pn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), pn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), pn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), pn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), pn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(pn), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const pn = [
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H(),
  /* @__PURE__ */ new H()
], Yt = /* @__PURE__ */ new H(), Hi = /* @__PURE__ */ new Ni(), ei = /* @__PURE__ */ new H(), ti = /* @__PURE__ */ new H(), ni = /* @__PURE__ */ new H(), wn = /* @__PURE__ */ new H(), Rn = /* @__PURE__ */ new H(), Un = /* @__PURE__ */ new H(), xi = /* @__PURE__ */ new H(), ki = /* @__PURE__ */ new H(), Wi = /* @__PURE__ */ new H(), Bn = /* @__PURE__ */ new H();
function Vs(r, e, t, n, i) {
  for (let s = 0, a = r.length - 3; s <= a; s += 3) {
    Bn.fromArray(r, s);
    const o = i.x * Math.abs(Bn.x) + i.y * Math.abs(Bn.y) + i.z * Math.abs(Bn.z), l = e.dot(Bn), c = t.dot(Bn), u = n.dot(Bn);
    if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > o)
      return !1;
  }
  return !0;
}
const gt = /* @__PURE__ */ new H(), Xi = /* @__PURE__ */ new We();
let pl = 0;
class cn extends Wn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n = !1) {
    if (super(), Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: pl++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(e) {
    return this.usage = e, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let i = 0, s = this.itemSize; i < s; i++)
      this.array[e + i] = t.array[n + i];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(e) {
    return this.array.set(e), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        Xi.fromBufferAttribute(this, t), Xi.applyMatrix3(e), this.setXY(t, Xi.x, Xi.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        gt.fromBufferAttribute(this, t), gt.applyMatrix3(e), this.setXYZ(t, gt.x, gt.y, gt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      gt.fromBufferAttribute(this, t), gt.applyMatrix4(e), this.setXYZ(t, gt.x, gt.y, gt.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      gt.fromBufferAttribute(this, t), gt.applyNormalMatrix(e), this.setXYZ(t, gt.x, gt.y, gt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      gt.fromBufferAttribute(this, t), gt.transformDirection(e), this.setXYZ(t, gt.x, gt.y, gt.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = ci(n, this.array)), n;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(e, t, n) {
    return this.normalized && (n = Ft(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = ci(t, this.array)), t;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(e, t) {
    return this.normalized && (t = Ft(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = ci(t, this.array)), t;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(e, t) {
    return this.normalized && (t = Ft(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = ci(t, this.array)), t;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(e, t) {
    return this.normalized && (t = Ft(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = ci(t, this.array)), t;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(e, t) {
    return this.normalized && (t = Ft(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Ft(t, this.array), n = Ft(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(e, t, n, i) {
    return e *= this.itemSize, this.normalized && (t = Ft(t, this.array), n = Ft(n, this.array), i = Ft(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(e, t, n, i, s) {
    return e *= this.itemSize, this.normalized && (t = Ft(t, this.array), n = Ft(n, this.array), i = Ft(i, this.array), s = Ft(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = s, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
  /**
   * Disposes of the buffer attribute. Available only in {@link WebGPURenderer}.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class to extends cn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class no extends cn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class bt extends cn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
const ml = /* @__PURE__ */ new Ni(), Mi = /* @__PURE__ */ new H(), Hs = /* @__PURE__ */ new H();
class mr {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(e = new H(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : ml.setFromPoints(e).getCenter(n);
    let i = 0;
    for (let s = 0, a = e.length; s < a; s++)
      i = Math.max(i, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(i), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(e) {
    return this.center.add(e), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Mi.subVectors(e, this.center);
    const t = Mi.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), i = (n - this.radius) * 0.5;
      this.center.addScaledVector(Mi, i / n), this.radius += i;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Hs.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Mi.copy(e.center).add(Hs)), this.expandByPoint(Mi.copy(e.center).sub(Hs))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
let gl = 0;
const Ht = /* @__PURE__ */ new ot(), ks = /* @__PURE__ */ new wt(), ii = /* @__PURE__ */ new H(), Ot = /* @__PURE__ */ new Ni(), Si = /* @__PURE__ */ new Ni(), Tt = /* @__PURE__ */ new H();
class Wt extends Wn {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: gl++ }), this.uuid = pi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = !1;
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /**
   * Sets the given index to this geometry.
   *
   * @param {Array<number>|BufferAttribute} index - The index to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (No(e) ? no : to)(e, 1) : this.index = e, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  /**
   * Clears all groups.
   */
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Le().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const i = this.attributes.tangent;
    return i !== void 0 && (i.transformDirection(e), i.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(e) {
    return Ht.makeRotationFromQuaternion(e), this.applyMatrix4(Ht), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(e) {
    return Ht.makeRotationX(e), this.applyMatrix4(Ht), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(e) {
    return Ht.makeRotationY(e), this.applyMatrix4(Ht), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(e) {
    return Ht.makeRotationZ(e), this.applyMatrix4(Ht), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(e, t, n) {
    return Ht.makeTranslation(e, t, n), this.applyMatrix4(Ht), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(e, t, n) {
    return Ht.makeScale(e, t, n), this.applyMatrix4(Ht), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(e) {
    return ks.lookAt(e), ks.updateMatrix(), this.applyMatrix4(ks.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ii).negate(), this.translate(ii.x, ii.y, ii.z), this;
  }
  /**
   * Defines a geometry by creating a `position` attribute based on the given array of points. The array
   * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
   * set to `0`.
   *
   * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
   * data from the array. The length of the array must match the vertex count.
   *
   * @param {Array<Vector2>|Array<Vector3>} points - The points.
   * @return {BufferGeometry} A reference to this instance.
   */
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let i = 0, s = e.length; i < s; i++) {
        const a = e[i];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new bt(n, 3));
    } else {
      const n = Math.min(e.length, t.count);
      for (let i = 0; i < n; i++) {
        const s = e[i];
        t.setXYZ(i, s.x, s.y, s.z || 0);
      }
      e.length > t.count && Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ni());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new H(-1 / 0, -1 / 0, -1 / 0),
        new H(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, i = t.length; n < i; n++) {
          const s = t[n];
          Ot.setFromBufferAttribute(s), this.morphTargetsRelative ? (Tt.addVectors(this.boundingBox.min, Ot.min), this.boundingBox.expandByPoint(Tt), Tt.addVectors(this.boundingBox.max, Ot.max), this.boundingBox.expandByPoint(Tt)) : (this.boundingBox.expandByPoint(Ot.min), this.boundingBox.expandByPoint(Ot.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new mr());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new H(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Ot.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          Si.setFromBufferAttribute(o), this.morphTargetsRelative ? (Tt.addVectors(Ot.min, Si.min), Ot.expandByPoint(Tt), Tt.addVectors(Ot.max, Si.max), Ot.expandByPoint(Tt)) : (Ot.expandByPoint(Si.min), Ot.expandByPoint(Si.max));
        }
      Ot.getCenter(n);
      let i = 0;
      for (let s = 0, a = e.count; s < a; s++)
        Tt.fromBufferAttribute(e, s), i = Math.max(i, n.distanceToSquared(Tt));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], l = this.morphTargetsRelative;
          for (let c = 0, u = o.count; c < u; c++)
            Tt.fromBufferAttribute(o, c), l && (ii.fromBufferAttribute(e, c), Tt.add(ii)), i = Math.max(i, n.distanceToSquared(Tt));
        }
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /**
   * Calculates and adds a tangent attribute to this geometry.
   *
   * The computation is only supported for indexed geometries and if position, normal, and uv attributes
   * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
   * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
   */
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, i = t.normal, s = t.uv;
    let a = this.getAttribute("tangent");
    (a === void 0 || a.count !== n.count) && (a = new cn(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], l = [];
    for (let v = 0; v < n.count; v++)
      o[v] = new H(), l[v] = new H();
    const c = new H(), u = new H(), d = new H(), h = new We(), f = new We(), g = new We(), x = new H(), m = new H();
    function p(v, w, P) {
      c.fromBufferAttribute(n, v), u.fromBufferAttribute(n, w), d.fromBufferAttribute(n, P), h.fromBufferAttribute(s, v), f.fromBufferAttribute(s, w), g.fromBufferAttribute(s, P), u.sub(c), d.sub(c), f.sub(h), g.sub(h);
      const F = 1 / (f.x * g.y - g.x * f.y);
      isFinite(F) && (x.copy(u).multiplyScalar(g.y).addScaledVector(d, -f.y).multiplyScalar(F), m.copy(d).multiplyScalar(f.x).addScaledVector(u, -g.x).multiplyScalar(F), o[v].add(x), o[w].add(x), o[P].add(x), l[v].add(m), l[w].add(m), l[P].add(m));
    }
    let M = this.groups;
    M.length === 0 && (M = [{
      start: 0,
      count: e.count
    }]);
    for (let v = 0, w = M.length; v < w; ++v) {
      const P = M[v], F = P.start, L = P.count;
      for (let I = F, U = F + L; I < U; I += 3)
        p(
          e.getX(I + 0),
          e.getX(I + 1),
          e.getX(I + 2)
        );
    }
    const A = new H(), S = new H(), b = new H(), T = new H();
    function C(v) {
      b.fromBufferAttribute(i, v), T.copy(b);
      const w = o[v];
      A.copy(w), A.sub(b.multiplyScalar(b.dot(w))).normalize(), S.crossVectors(T, w);
      const F = S.dot(l[v]) < 0 ? -1 : 1;
      a.setXYZW(v, A.x, A.y, A.z, F);
    }
    for (let v = 0, w = M.length; v < w; ++v) {
      const P = M[v], F = P.start, L = P.count;
      for (let I = F, U = F + L; I < U; I += 3)
        C(e.getX(I + 0)), C(e.getX(I + 1)), C(e.getX(I + 2));
    }
    this._transformed = !0;
  }
  /**
   * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
   * each vertex normal to be the average of the face normals of the faces that share that vertex.
   * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
   * to be the same as the face normal.
   */
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== t.count)
        n = new cn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let h = 0, f = n.count; h < f; h++)
          n.setXYZ(h, 0, 0, 0);
      const i = new H(), s = new H(), a = new H(), o = new H(), l = new H(), c = new H(), u = new H(), d = new H();
      if (e)
        for (let h = 0, f = e.count; h < f; h += 3) {
          const g = e.getX(h + 0), x = e.getX(h + 1), m = e.getX(h + 2);
          i.fromBufferAttribute(t, g), s.fromBufferAttribute(t, x), a.fromBufferAttribute(t, m), u.subVectors(a, s), d.subVectors(i, s), u.cross(d), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, x), c.fromBufferAttribute(n, m), o.add(u), l.add(u), c.add(u), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(x, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let h = 0, f = t.count; h < f; h += 3)
          i.fromBufferAttribute(t, h + 0), s.fromBufferAttribute(t, h + 1), a.fromBufferAttribute(t, h + 2), u.subVectors(a, s), d.subVectors(i, s), u.cross(d), n.setXYZ(h + 0, u.x, u.y, u.z), n.setXYZ(h + 1, u.x, u.y, u.z), n.setXYZ(h + 2, u.x, u.y, u.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      Tt.fromBufferAttribute(e, t), Tt.normalize(), e.setXYZ(t, Tt.x, Tt.y, Tt.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function e(o, l) {
      const c = o.array, u = o.itemSize, d = o.normalized, h = new c.constructor(l.length * u);
      let f = 0, g = 0;
      for (let x = 0, m = l.length; x < m; x++) {
        o.isInterleavedBufferAttribute ? f = l[x] * o.data.stride + o.offset : f = l[x] * u;
        for (let p = 0; p < u; p++)
          h[g++] = c[f++];
      }
      return new cn(h, u, d);
    }
    if (this.index === null)
      return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Wt(), n = this.index.array, i = this.attributes;
    for (const o in i) {
      const l = i[o], c = e(l, n);
      t.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let u = 0, d = c.length; u < d; u++) {
        const h = c[u], f = e(h, n);
        l.push(f);
      }
      t.morphAttributes[o] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const i = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], u = [];
      for (let d = 0, h = c.length; d < h; d++) {
        const f = c[d];
        u.push(f.toJSON(e.data));
      }
      u.length > 0 && (i[l] = u, s = !0);
    }
    s && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = o.toJSON()), e;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given geometry to this instance.
   *
   * @param {BufferGeometry} source - The geometry to copy.
   * @return {BufferGeometry} A reference to this instance.
   */
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone());
    const i = e.attributes;
    for (const c in i) {
      const u = i[c];
      this.setAttribute(c, u.clone(t));
    }
    const s = e.morphAttributes;
    for (const c in s) {
      const u = [], d = s[c];
      for (let h = 0, f = d.length; h < f; h++)
        u.push(d[h].clone(t));
      this.morphAttributes[c] = u;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let c = 0, u = a.length; c < u; c++) {
      const d = a[c];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires BufferGeometry#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
let _l = 0, gi = class extends Wn {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: _l++ }), this.uuid = pi(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new ke(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  /**
   * Sets the alpha value to be used when running an alpha test. The material
   * will not be rendered if the opacity is lower than this value.
   *
   * @type {number}
   * @readonly
   * @default 0
   */
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {
  }
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /**
   * This method can be used to set default values from parameter objects.
   * It is a generic implementation so it can be used with different types
   * of materials.
   *
   * @param {Object} [values] - The material values to set.
   */
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          Pe(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const i = this[t];
        if (i === void 0) {
          Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        i && i.isColor ? i.set(n) : i && i.isVector2 && n && n.isVector2 || i && i.isEuler && n && n.isEuler || i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function i(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (t) {
      const s = i(e.textures), a = i(e.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {Material} A reference to this material.
   */
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new ke().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let n = e.normalScale;
      Array.isArray(n) === !1 && (n = [n, n]), this.normalScale = new We().fromArray(n);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new We().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given material to this instance.
   *
   * @param {Material} source - The material to copy.
   * @return {Material} A reference to this instance.
   */
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const i = t.length;
      n = new Array(i);
      for (let s = 0; s !== i; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Material#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Setting this property to `true` indicates the engine the material
   * needs to be recompiled.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
};
const mn = /* @__PURE__ */ new H(), Ws = /* @__PURE__ */ new H(), qi = /* @__PURE__ */ new H(), Cn = /* @__PURE__ */ new H(), Xs = /* @__PURE__ */ new H(), Yi = /* @__PURE__ */ new H(), qs = /* @__PURE__ */ new H();
let io = class {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(e = new H(), t = new H(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(e) {
    return this.origin.copy(this.at(e, mn)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(e) {
    const t = mn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (mn.copy(this.origin).addScaledVector(this.direction, t), mn.distanceToSquared(e));
  }
  /**
   * Returns the squared distance between this ray and the given line segment.
   *
   * @param {Vector3} v0 - The start point of the line segment.
   * @param {Vector3} v1 - The end point of the line segment.
   * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
   * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
   * @return {number} The squared distance.
   */
  distanceSqToSegment(e, t, n, i) {
    Ws.copy(e).add(t).multiplyScalar(0.5), qi.copy(t).sub(e).normalize(), Cn.copy(this.origin).sub(Ws);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(qi), o = Cn.dot(this.direction), l = -Cn.dot(qi), c = Cn.lengthSq(), u = Math.abs(1 - a * a);
    let d, h, f, g;
    if (u > 0)
      if (d = a * l - o, h = a * o - l, g = s * u, d >= 0)
        if (h >= -g)
          if (h <= g) {
            const x = 1 / u;
            d *= x, h *= x, f = d * (d + a * h + 2 * o) + h * (a * d + h + 2 * l) + c;
          } else
            h = s, d = Math.max(0, -(a * h + o)), f = -d * d + h * (h + 2 * l) + c;
        else
          h = -s, d = Math.max(0, -(a * h + o)), f = -d * d + h * (h + 2 * l) + c;
      else
        h <= -g ? (d = Math.max(0, -(-a * s + o)), h = d > 0 ? -s : Math.min(Math.max(-s, -l), s), f = -d * d + h * (h + 2 * l) + c) : h <= g ? (d = 0, h = Math.min(Math.max(-s, -l), s), f = h * (h + 2 * l) + c) : (d = Math.max(0, -(a * s + o)), h = d > 0 ? s : Math.min(Math.max(-s, -l), s), f = -d * d + h * (h + 2 * l) + c);
    else
      h = a > 0 ? -s : s, d = Math.max(0, -(a * h + o)), f = -d * d + h * (h + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), i && i.copy(Ws).addScaledVector(qi, h), f;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(e, t) {
    mn.subVectors(e.center, this.origin);
    const n = mn.dot(this.direction), i = mn.dot(mn) - n * n, s = e.radius * e.radius;
    if (i > s) return null;
    const a = Math.sqrt(s - i), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  /**
   * Intersects this ray with the given plane, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Plane} plane - The plane to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(e, t) {
    let n, i, s, a, o, l;
    const c = 1 / this.direction.x, u = 1 / this.direction.y, d = 1 / this.direction.z, h = this.origin;
    return c >= 0 ? (n = (e.min.x - h.x) * c, i = (e.max.x - h.x) * c) : (n = (e.max.x - h.x) * c, i = (e.min.x - h.x) * c), u >= 0 ? (s = (e.min.y - h.y) * u, a = (e.max.y - h.y) * u) : (s = (e.max.y - h.y) * u, a = (e.min.y - h.y) * u), n > a || s > i || ((s > n || isNaN(n)) && (n = s), (a < i || isNaN(i)) && (i = a), d >= 0 ? (o = (e.min.z - h.z) * d, l = (e.max.z - h.z) * d) : (o = (e.max.z - h.z) * d, l = (e.min.z - h.z) * d), n > l || o > i) || ((o > n || n !== n) && (n = o), (l < i || i !== i) && (i = l), i < 0) ? null : this.at(n >= 0 ? n : i, t);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(e) {
    return this.intersectBox(e, mn) !== null;
  }
  /**
   * Intersects this ray with the given triangle, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Vector3} a - The first vertex of the triangle.
   * @param {Vector3} b - The second vertex of the triangle.
   * @param {Vector3} c - The third vertex of the triangle.
   * @param {boolean} backfaceCulling - Whether to use backface culling or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectTriangle(e, t, n, i, s) {
    Xs.subVectors(t, e), Yi.subVectors(n, e), qs.crossVectors(Xs, Yi);
    let a = this.direction.dot(qs), o;
    if (a > 0) {
      if (i) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    Cn.subVectors(this.origin, e);
    const l = o * this.direction.dot(Yi.crossVectors(Cn, Yi));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(Xs.cross(Cn));
    if (c < 0 || l + c > a)
      return null;
    const u = -o * Cn.dot(qs);
    return u < 0 ? null : this.at(u / a, s);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
};
class gr extends gi {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new ke(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Dn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const Qr = /* @__PURE__ */ new ot(), On = /* @__PURE__ */ new io(), Ki = /* @__PURE__ */ new mr(), jr = /* @__PURE__ */ new H(), Zi = /* @__PURE__ */ new H(), $i = /* @__PURE__ */ new H(), Ji = /* @__PURE__ */ new H(), Ys = /* @__PURE__ */ new H(), Qi = /* @__PURE__ */ new H(), ea = /* @__PURE__ */ new H(), ji = /* @__PURE__ */ new H();
class zt extends wt {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(e = new Wt(), t = new gr()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const i = t[n[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = i.length; s < a; s++) {
          const o = i[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  /**
   * Returns the local-space position of the vertex at the given index, taking into
   * account the current animation state of both morph targets and skinning.
   *
   * @param {number} index - The vertex index.
   * @param {Vector3} target - The target object that is used to store the method's result.
   * @return {Vector3} The vertex position in local space.
   */
  getVertexPosition(e, t) {
    const n = this.geometry, i = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(i, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      Qi.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const u = o[l], d = s[l];
        u !== 0 && (Ys.fromBufferAttribute(d, e), a ? Qi.addScaledVector(Ys, u) : Qi.addScaledVector(Ys.sub(t), u));
      }
      t.add(Qi);
    }
    return t;
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const n = this.geometry, i = this.material, s = this.matrixWorld;
    i !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Ki.copy(n.boundingSphere), Ki.applyMatrix4(s), On.copy(e.ray).recast(e.near), !(Ki.containsPoint(On.origin) === !1 && (On.intersectSphere(Ki, jr) === null || On.origin.distanceToSquared(jr) > (e.far - e.near) ** 2)) && (Qr.copy(s).invert(), On.copy(e.ray).applyMatrix4(Qr), !(n.boundingBox !== null && On.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, On)));
  }
  _computeIntersections(e, t, n) {
    let i;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, u = s.attributes.uv1, d = s.attributes.normal, h = s.groups, f = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, x = h.length; g < x; g++) {
          const m = h[g], p = a[m.materialIndex], M = Math.max(m.start, f.start), A = Math.min(o.count, Math.min(m.start + m.count, f.start + f.count));
          for (let S = M, b = A; S < b; S += 3) {
            const T = o.getX(S), C = o.getX(S + 1), v = o.getX(S + 2);
            i = es(this, p, e, n, c, u, d, T, C, v), i && (i.faceIndex = Math.floor(S / 3), i.face.materialIndex = m.materialIndex, t.push(i));
          }
        }
      else {
        const g = Math.max(0, f.start), x = Math.min(o.count, f.start + f.count);
        for (let m = g, p = x; m < p; m += 3) {
          const M = o.getX(m), A = o.getX(m + 1), S = o.getX(m + 2);
          i = es(this, a, e, n, c, u, d, M, A, S), i && (i.faceIndex = Math.floor(m / 3), t.push(i));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let g = 0, x = h.length; g < x; g++) {
          const m = h[g], p = a[m.materialIndex], M = Math.max(m.start, f.start), A = Math.min(l.count, Math.min(m.start + m.count, f.start + f.count));
          for (let S = M, b = A; S < b; S += 3) {
            const T = S, C = S + 1, v = S + 2;
            i = es(this, p, e, n, c, u, d, T, C, v), i && (i.faceIndex = Math.floor(S / 3), i.face.materialIndex = m.materialIndex, t.push(i));
          }
        }
      else {
        const g = Math.max(0, f.start), x = Math.min(l.count, f.start + f.count);
        for (let m = g, p = x; m < p; m += 3) {
          const M = m, A = m + 1, S = m + 2;
          i = es(this, a, e, n, c, u, d, M, A, S), i && (i.faceIndex = Math.floor(m / 3), t.push(i));
        }
      }
  }
}
function vl(r, e, t, n, i, s, a, o) {
  let l;
  if (e.side === 1 ? l = n.intersectTriangle(a, s, i, !0, o) : l = n.intersectTriangle(i, s, a, e.side === 0, o), l === null) return null;
  ji.copy(o), ji.applyMatrix4(r.matrixWorld);
  const c = t.ray.origin.distanceTo(ji);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: ji.clone(),
    object: r
  };
}
function es(r, e, t, n, i, s, a, o, l, c) {
  r.getVertexPosition(o, Zi), r.getVertexPosition(l, $i), r.getVertexPosition(c, Ji);
  const u = vl(r, e, t, n, Zi, $i, Ji, ea);
  if (u) {
    const d = new H();
    $t.getBarycoord(ea, Zi, $i, Ji, d), i && (u.uv = $t.getInterpolatedAttribute(i, o, l, c, d, new We())), s && (u.uv1 = $t.getInterpolatedAttribute(s, o, l, c, d, new We())), a && (u.normal = $t.getInterpolatedAttribute(a, o, l, c, d, new H()), u.normal.dot(n.direction) > 0 && u.normal.multiplyScalar(-1));
    const h = {
      a: o,
      b: l,
      c,
      normal: new H(),
      materialIndex: 0
    };
    $t.getNormal(Zi, $i, Ji, h.normal), u.face = h, u.barycoord = d;
  }
  return u;
}
class xl extends It {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = null, t = 1, n = 1, i, s, a, o, l, c = 1003, u = 1003, d, h) {
    super(null, a, o, l, c, u, i, s, d, h), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Ks = /* @__PURE__ */ new H(), Ml = /* @__PURE__ */ new H(), Sl = /* @__PURE__ */ new Le();
let Vn = class {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(e = new H(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(e, t, n, i) {
    return this.normal.set(e, t, n), this.constant = i, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(e, t, n) {
    const i = Ks.subVectors(n, t).cross(Ml.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @param {boolean} [clampToLine=true] - Whether to clamp the intersection to the line segment.
   * @return {?Vector3} The intersection point. Returns `null` if no intersection is detected.
   */
  intersectLine(e, t, n = !0) {
    const i = e.delta(Ks), s = this.normal.dot(i);
    if (s === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const a = -(e.start.dot(this.normal) + this.constant) / s;
    return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(i, a);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(e, t) {
    const n = t || Sl.getNormalMatrix(e), i = this.coplanarPoint(Ks).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -i.dot(s), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
};
const zn = /* @__PURE__ */ new mr(), yl = /* @__PURE__ */ new We(0.5, 0.5), ts = /* @__PURE__ */ new H();
class _r {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(e = new Vn(), t = new Vn(), n = new Vn(), i = new Vn(), s = new Vn(), a = new Vn()) {
    this.planes = [e, t, n, i, s, a];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(e, t, n, i, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(s), o[5].copy(a), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  /**
   * Sets the frustum planes from the given projection matrix.
   *
   * @param {Matrix4} m - The projection matrix.
   * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
   * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
   * @return {Frustum} A reference to this frustum.
   */
  setFromProjectionMatrix(e, t = 2e3, n = !1) {
    const i = this.planes, s = e.elements, a = s[0], o = s[1], l = s[2], c = s[3], u = s[4], d = s[5], h = s[6], f = s[7], g = s[8], x = s[9], m = s[10], p = s[11], M = s[12], A = s[13], S = s[14], b = s[15];
    if (i[0].setComponents(c - a, f - u, p - g, b - M).normalize(), i[1].setComponents(c + a, f + u, p + g, b + M).normalize(), i[2].setComponents(c + o, f + d, p + x, b + A).normalize(), i[3].setComponents(c - o, f - d, p - x, b - A).normalize(), n)
      i[4].setComponents(l, h, m, S).normalize(), i[5].setComponents(c - l, f - h, p - m, b - S).normalize();
    else if (i[4].setComponents(c - l, f - h, p - m, b - S).normalize(), t === 2e3)
      i[5].setComponents(c + l, f + h, p + m, b + S).normalize();
    else if (t === 2001)
      i[5].setComponents(l, h, m, S).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  /**
   * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
   *
   * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
   *
   * @param {Object3D} object - The 3D object to test.
   * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
   */
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(zn);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(e) {
    zn.center.set(0, 0, 0);
    const t = yl.distanceTo(e.center);
    return zn.radius = 0.7071067811865476 + t, zn.applyMatrix4(e.matrixWorld), this.intersectsSphere(zn);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(e) {
    const t = this.planes, n = e.center, i = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < i)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const i = t[n];
      if (ts.x = i.normal.x > 0 ? e.max.x : e.min.x, ts.y = i.normal.y > 0 ? e.max.y : e.min.y, ts.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(ts) < 0)
        return !1;
    }
    return !0;
  }
  /**
   * Returns `true` if the given point lies within the frustum.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the point lies within this frustum or not.
   */
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class so extends It {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(e = [], t = 301, n, i, s, a, o, l, c, u) {
    super(e, t, n, i, s, a, o, l, c, u), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class di extends It {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e, t, n = 1014, i, s, a, o = 1003, l = 1003, c, u = 1026, d = 1) {
    if (u !== 1026 && u !== 1027)
      throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const h = { width: e, height: t, depth: d };
    super(h, i, s, a, o, l, u, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new fr(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
class El extends di {
  /**
   * Constructs a new cube depth texture.
   *
   * @param {number} size - The size (width and height) of each cube face.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   */
  constructor(e, t = 1014, n = 301, i, s, a = 1003, o = 1003, l, c = 1026) {
    const u = { width: e, height: e, depth: 1 }, d = [u, u, u, u, u, u];
    super(e, e, t, n, i, s, a, o, l, c), this.image = d, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  /**
   * Alias for {@link CubeDepthTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class ro extends It {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class Ui extends Wt {
  /**
   * Constructs a new box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
   * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
   * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
   */
  constructor(e = 1, t = 1, n = 1, i = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: i,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    i = Math.floor(i), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], u = [], d = [];
    let h = 0, f = 0;
    g("z", "y", "x", -1, -1, n, t, e, a, s, 0), g("z", "y", "x", 1, -1, n, t, -e, a, s, 1), g("x", "z", "y", 1, 1, e, n, t, i, a, 2), g("x", "z", "y", 1, -1, e, n, -t, i, a, 3), g("x", "y", "z", 1, -1, e, t, n, i, s, 4), g("x", "y", "z", -1, -1, e, t, -n, i, s, 5), this.setIndex(l), this.setAttribute("position", new bt(c, 3)), this.setAttribute("normal", new bt(u, 3)), this.setAttribute("uv", new bt(d, 2));
    function g(x, m, p, M, A, S, b, T, C, v, w) {
      const P = S / C, F = b / v, L = S / 2, I = b / 2, U = T / 2, D = C + 1, N = v + 1;
      let V = 0, W = 0;
      const K = new H();
      for (let ie = 0; ie < N; ie++) {
        const se = ie * F - I;
        for (let ee = 0; ee < D; ee++) {
          const Oe = ee * P - L;
          K[x] = Oe * M, K[m] = se * A, K[p] = U, c.push(K.x, K.y, K.z), K[x] = 0, K[m] = 0, K[p] = T > 0 ? 1 : -1, u.push(K.x, K.y, K.z), d.push(ee / C), d.push(1 - ie / v), V += 1;
        }
      }
      for (let ie = 0; ie < v; ie++)
        for (let se = 0; se < C; se++) {
          const ee = h + se + D * ie, Oe = h + se + D * (ie + 1), je = h + (se + 1) + D * (ie + 1), Ve = h + (se + 1) + D * ie;
          l.push(ee, Oe, Ve), l.push(Oe, je, Ve), W += 6;
        }
      o.addGroup(f, W, w), f += W, h += V;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Ui(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
class vr extends Wt {
  /**
   * Constructs a new capsule geometry.
   *
   * @param {number} [radius=1] - Radius of the capsule.
   * @param {number} [height=1] - Height of the middle section.
   * @param {number} [capSegments=4] - Number of curve segments used to build each cap.
   * @param {number} [radialSegments=8] - Number of segmented faces around the circumference of the capsule. Must be an integer >= 3.
   * @param {number} [heightSegments=1] - Number of rows of faces along the height of the middle section. Must be an integer >= 1.
   */
  constructor(e = 1, t = 1, n = 4, i = 8, s = 1) {
    super(), this.type = "CapsuleGeometry", this.parameters = {
      radius: e,
      height: t,
      capSegments: n,
      radialSegments: i,
      heightSegments: s
    }, t = Math.max(0, t), n = Math.max(1, Math.floor(n)), i = Math.max(3, Math.floor(i)), s = Math.max(1, Math.floor(s));
    const a = [], o = [], l = [], c = [], u = t / 2, d = Math.PI / 2 * e, h = t, f = 2 * d + h, g = n * 2 + s, x = i + 1, m = new H(), p = new H();
    for (let M = 0; M <= g; M++) {
      let A = 0, S = 0, b = 0, T = 0;
      if (M <= n) {
        const w = M / n, P = w * Math.PI / 2;
        S = -u - e * Math.cos(P), b = e * Math.sin(P), T = -e * Math.cos(P), A = w * d;
      } else if (M <= n + s) {
        const w = (M - n) / s;
        S = -u + w * t, b = e, T = 0, A = d + w * h;
      } else {
        const w = (M - n - s) / n, P = w * Math.PI / 2;
        S = u + e * Math.sin(P), b = e * Math.cos(P), T = e * Math.sin(P), A = d + h + w * d;
      }
      const C = Math.max(0, Math.min(1, A / f));
      let v = 0;
      M === 0 ? v = 0.5 / i : M === g && (v = -0.5 / i);
      for (let w = 0; w <= i; w++) {
        const P = w / i, F = P * Math.PI * 2, L = Math.sin(F), I = Math.cos(F);
        p.x = -b * I, p.y = S, p.z = b * L, o.push(p.x, p.y, p.z), m.set(
          -b * I,
          T,
          b * L
        ), m.normalize(), l.push(m.x, m.y, m.z), c.push(P + v, C);
      }
      if (M > 0) {
        const w = (M - 1) * x;
        for (let P = 0; P < i; P++) {
          const F = w + P, L = w + P + 1, I = M * x + P, U = M * x + P + 1;
          a.push(F, L, I), a.push(L, U, I);
        }
      }
    }
    this.setIndex(a), this.setAttribute("position", new bt(o, 3)), this.setAttribute("normal", new bt(l, 3)), this.setAttribute("uv", new bt(c, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {CapsuleGeometry} A new instance.
   */
  static fromJSON(e) {
    return new vr(e.radius, e.height, e.capSegments, e.radialSegments, e.heightSegments);
  }
}
class ao extends Wt {
  /**
   * Constructs a new circle geometry.
   *
   * @param {number} [radius=1] - Radius of the circle.
   * @param {number} [segments=32] - Number of segments (triangles), minimum = `3`.
   * @param {number} [thetaStart=0] - Start angle for first segment in radians.
   * @param {number} [thetaLength=Math.PI*2] - The central angle, often called theta,
   * of the circular sector in radians. The default value results in a complete circle.
   */
  constructor(e = 1, t = 32, n = 0, i = Math.PI * 2) {
    super(), this.type = "CircleGeometry", this.parameters = {
      radius: e,
      segments: t,
      thetaStart: n,
      thetaLength: i
    }, t = Math.max(3, t);
    const s = [], a = [], o = [], l = [], c = new H(), u = new We();
    a.push(0, 0, 0), o.push(0, 0, 1), l.push(0.5, 0.5);
    for (let d = 0, h = 3; d <= t; d++, h += 3) {
      const f = n + d / t * i;
      c.x = e * Math.cos(f), c.y = e * Math.sin(f), a.push(c.x, c.y, c.z), o.push(0, 0, 1), u.x = (a[h] / e + 1) / 2, u.y = (a[h + 1] / e + 1) / 2, l.push(u.x, u.y);
    }
    for (let d = 1; d <= t; d++)
      s.push(d, d + 1, 0);
    this.setIndex(s), this.setAttribute("position", new bt(a, 3)), this.setAttribute("normal", new bt(o, 3)), this.setAttribute("uv", new bt(l, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {CircleGeometry} A new instance.
   */
  static fromJSON(e) {
    return new ao(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class vs extends Wt {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(e = 1, t = 1, n = 1, i = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: i
    };
    const s = e / 2, a = t / 2, o = Math.floor(n), l = Math.floor(i), c = o + 1, u = l + 1, d = e / o, h = t / l, f = [], g = [], x = [], m = [];
    for (let p = 0; p < u; p++) {
      const M = p * h - a;
      for (let A = 0; A < c; A++) {
        const S = A * d - s;
        g.push(S, -M, 0), x.push(0, 0, 1), m.push(A / o), m.push(1 - p / l);
      }
    }
    for (let p = 0; p < l; p++)
      for (let M = 0; M < o; M++) {
        const A = M + c * p, S = M + c * (p + 1), b = M + 1 + c * (p + 1), T = M + 1 + c * p;
        f.push(A, S, T), f.push(S, b, T);
      }
    this.setIndex(f), this.setAttribute("position", new bt(g, 3)), this.setAttribute("normal", new bt(x, 3)), this.setAttribute("uv", new bt(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(e) {
    return new vs(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class Li extends Wt {
  /**
   * Constructs a new sphere geometry.
   *
   * @param {number} [radius=1] - The sphere radius.
   * @param {number} [widthSegments=32] - The number of horizontal segments. Minimum value is `3`.
   * @param {number} [heightSegments=16] - The number of vertical segments. Minimum value is `2`.
   * @param {number} [phiStart=0] - The horizontal starting angle in radians.
   * @param {number} [phiLength=Math.PI*2] - The horizontal sweep angle size.
   * @param {number} [thetaStart=0] - The vertical starting angle in radians.
   * @param {number} [thetaLength=Math.PI] - The vertical sweep angle size.
   */
  constructor(e = 1, t = 32, n = 16, i = 0, s = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: n,
      phiStart: i,
      phiLength: s,
      thetaStart: a,
      thetaLength: o
    }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
    const l = Math.min(a + o, Math.PI);
    let c = 0;
    const u = [], d = new H(), h = new H(), f = [], g = [], x = [], m = [];
    for (let p = 0; p <= n; p++) {
      const M = [], A = p / n, S = a + A * o, b = e * Math.cos(S), T = Math.sqrt(e * e - b * b);
      let C = 0;
      p === 0 && a === 0 ? C = 0.5 / t : p === n && l === Math.PI && (C = -0.5 / t);
      for (let v = 0; v <= t; v++) {
        const w = v / t, P = i + w * s;
        d.x = -T * Math.cos(P), d.y = b, d.z = T * Math.sin(P), g.push(d.x, d.y, d.z), h.copy(d).normalize(), x.push(h.x, h.y, h.z), m.push(w + C, 1 - A), M.push(c++);
      }
      u.push(M);
    }
    for (let p = 0; p < n; p++)
      for (let M = 0; M < t; M++) {
        const A = u[p][M + 1], S = u[p][M], b = u[p + 1][M], T = u[p + 1][M + 1];
        (p !== 0 || a > 0) && f.push(A, S, T), (p !== n - 1 || l < Math.PI) && f.push(S, b, T);
      }
    this.setIndex(f), this.setAttribute("position", new bt(g, 3)), this.setAttribute("normal", new bt(x, 3)), this.setAttribute("uv", new bt(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {SphereGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Li(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class xg extends gi {
  /**
   * Constructs a new shadow material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new ke(0), this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.fog = e.fog, this;
  }
}
function fi(r) {
  const e = {};
  for (const t in r) {
    e[t] = {};
    for (const n in r[t]) {
      const i = r[t][n];
      if (ta(i))
        i.isRenderTargetTexture ? (Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = i.clone();
      else if (Array.isArray(i))
        if (ta(i[0])) {
          const s = [];
          for (let a = 0, o = i.length; a < o; a++)
            s[a] = i[a].clone();
          e[t][n] = s;
        } else
          e[t][n] = i.slice();
      else
        e[t][n] = i;
    }
  }
  return e;
}
function Lt(r) {
  const e = {};
  for (let t = 0; t < r.length; t++) {
    const n = fi(r[t]);
    for (const i in n)
      e[i] = n[i];
  }
  return e;
}
function ta(r) {
  return r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion);
}
function Tl(r) {
  const e = [];
  for (let t = 0; t < r.length; t++)
    e.push(r[t].clone());
  return e;
}
function oo(r) {
  const e = r.getRenderTarget();
  return e === null ? r.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : He.workingColorSpace;
}
const bl = { clone: fi, merge: Lt };
var Al = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, wl = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class hn extends gi {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Al, this.fragmentShader = wl, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = fi(e.uniforms), this.uniformsGroups = Tl(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const a = this.uniforms[i].value;
      a && a.isTexture ? t.uniforms[i] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[i] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[i] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[i] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[i] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[i] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[i] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[i] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const i in this.extensions)
      this.extensions[i] === !0 && (n[i] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {ShaderMaterial} A reference to this material.
   */
  fromJSON(e, t) {
    if (super.fromJSON(e, t), e.uniforms !== void 0)
      for (const n in e.uniforms) {
        const i = e.uniforms[n];
        switch (this.uniforms[n] = {}, i.type) {
          case "t":
            this.uniforms[n].value = t[i.value] || null;
            break;
          case "c":
            this.uniforms[n].value = new ke().setHex(i.value);
            break;
          case "v2":
            this.uniforms[n].value = new We().fromArray(i.value);
            break;
          case "v3":
            this.uniforms[n].value = new H().fromArray(i.value);
            break;
          case "v4":
            this.uniforms[n].value = new at().fromArray(i.value);
            break;
          case "m3":
            this.uniforms[n].value = new Le().fromArray(i.value);
            break;
          case "m4":
            this.uniforms[n].value = new ot().fromArray(i.value);
            break;
          default:
            this.uniforms[n].value = i.value;
        }
      }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0)
      for (const n in e.extensions)
        this.extensions[n] = e.extensions[n];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}
class Rl extends hn {
  /**
   * Constructs a new raw shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class Cl extends gi {
  /**
   * Constructs a new mesh standard material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new ke(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new ke(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new We(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Dn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Pl extends gi {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Fl extends gi {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
class lo extends wt {
  /**
   * Constructs a new light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new ke(e), this.intensity = t;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}
class Mg extends lo {
  /**
   * Constructs a new hemisphere light.
   *
   * @param {(number|Color|string)} [skyColor=0xffffff] - The light's sky color.
   * @param {(number|Color|string)} [groundColor=0xffffff] - The light's ground color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(wt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new ke(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.groundColor = this.groundColor.getHex(), t;
  }
}
const Zs = /* @__PURE__ */ new ot(), na = /* @__PURE__ */ new H(), ia = /* @__PURE__ */ new H();
class Ll {
  /**
   * Constructs a new light shadow.
   *
   * @param {Camera} camera - The light's view of the world.
   */
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new We(512, 512), this.mapType = 1009, this.map = null, this.mapPass = null, this.matrix = new ot(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new _r(), this._frameExtents = new We(1, 1), this._viewportCount = 1, this._viewports = [
      new at(0, 0, 1, 1)
    ];
  }
  /**
   * Used internally by the renderer to get the number of viewports that need
   * to be rendered for this shadow.
   *
   * @return {number} The viewport count.
   */
  getViewportCount() {
    return this._viewportCount;
  }
  /**
   * Gets the shadow cameras frustum. Used internally by the renderer to cull objects.
   *
   * @return {Frustum} The shadow camera frustum.
   */
  getFrustum() {
    return this._frustum;
  }
  /**
   * Update the matrices for the camera and shadow, used internally by the renderer.
   *
   * @param {Light} light - The light for which the shadow is being rendered.
   */
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    na.setFromMatrixPosition(e.matrixWorld), t.position.copy(na), ia.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(ia), t.updateMatrixWorld(), Zs.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Zs, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === 2001 || t.reversedDepth ? n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      1,
      0,
      // Identity Z (preserving the correct [0, 1] range from the projection matrix)
      0,
      0,
      0,
      1
    ) : n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(Zs);
  }
  /**
   * Returns a viewport definition for the given viewport index.
   *
   * @param {number} viewportIndex - The viewport index.
   * @return {Vector4} The viewport.
   */
  getViewport(e) {
    return this._viewports[e];
  }
  /**
   * Returns the frame extends.
   *
   * @return {Vector2} The frame extends.
   */
  getFrameExtents() {
    return this._frameExtents;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  /**
   * Copies the values of the given light shadow instance to this instance.
   *
   * @param {LightShadow} source - The light shadow to copy.
   * @return {LightShadow} A reference to this light shadow instance.
   */
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  /**
   * Returns a new light shadow instance with copied values from this instance.
   *
   * @return {LightShadow} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Serializes the light shadow into JSON.
   *
   * @return {Object} A JSON object representing the serialized light shadow.
   * @see {@link ObjectLoader#parse}
   */
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
const ns = /* @__PURE__ */ new H(), is = /* @__PURE__ */ new mi(), tn = /* @__PURE__ */ new H();
class co extends wt {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ot(), this.projectionMatrix = new ot(), this.projectionMatrixInverse = new ot(), this.coordinateSystem = 2e3, this._reversedDepth = !1;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(ns, is, tn), tn.x === 1 && tn.y === 1 && tn.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ns, is, tn.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, n = !1) {
    super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(ns, is, tn), tn.x === 1 && tn.y === 1 && tn.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ns, is, tn.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Pn = /* @__PURE__ */ new H(), sa = /* @__PURE__ */ new We(), ra = /* @__PURE__ */ new We();
class Zt extends co {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = 50, t = 1, n = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Di * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const e = Math.tan(Pi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return Di * 2 * Math.atan(
      Math.tan(Pi * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(e, t, n) {
    Pn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Pn.x, Pn.y).multiplyScalar(-e / Pn.z), Pn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Pn.x, Pn.y).multiplyScalar(-e / Pn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, sa, ra), t.subVectors(ra, sa);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(e, t, n, i, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Pi * 0.5 * this.fov) / this.zoom, n = 2 * t, i = this.aspect * n, s = -0.5 * i;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * i / l, t -= a.offsetY * n / c, i *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + i, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
class xr extends co {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = -1, t = 1, n = 1, i = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(e, t, n, i, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let s = n - e, a = n + e, o = i + t, l = i - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= u * this.view.offsetY, l = o - u * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
class Il extends Ll {
  /**
   * Constructs a new directional light shadow.
   */
  constructor() {
    super(new xr(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Sg extends lo {
  /**
   * Constructs a new directional light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(wt.DEFAULT_UP), this.updateMatrix(), this.target = new wt(), this.shadow = new Il();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}
const si = -90, ri = 1;
class Dl extends wt {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const i = new Zt(si, ri, e, t);
    i.layers = this.layers, this.add(i);
    const s = new Zt(si, ri, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Zt(si, ri, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Zt(si, ri, e, t);
    o.layers = this.layers, this.add(o);
    const l = new Zt(si, ri, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Zt(si, ri, e, t);
    c.layers = this.layers, this.add(c);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, i, s, a, o, l] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: i } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, u] = this.children, d = e.getRenderTarget(), h = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const x = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let m = !1;
    e.isWebGLRenderer === !0 ? m = e.state.buffers.depth.getReversed() : m = e.reversedDepthBuffer, e.setRenderTarget(n, 0, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 1, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(n, 4, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = x, e.setRenderTarget(n, 5, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, u), e.setRenderTarget(d, h, f), e.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class Nl extends Zt {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}
const aa = /* @__PURE__ */ new ot();
class yg {
  /**
   * Constructs a new raycaster.
   *
   * @param {Vector3} origin - The origin vector where the ray casts from.
   * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
   * @param {number} [near=0] - All results returned are further away than near. Near can't be negative.
   * @param {number} [far=Infinity] - All results returned are closer than far. Far can't be lower than near.
   */
  constructor(e, t, n = 0, i = 1 / 0) {
    this.ray = new io(e, t), this.near = n, this.far = i, this.camera = null, this.layers = new pr(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  /**
   * Updates the ray with a new origin and direction by copying the values from the arguments.
   *
   * @param {Vector3} origin - The origin vector where the ray casts from.
   * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
   */
  set(e, t) {
    this.ray.set(e, t);
  }
  /**
   * Uses the given coordinates and camera to compute a new origin and direction for the internal ray.
   *
   * @param {Vector2} coords - 2D coordinates of the mouse, in normalized device coordinates (NDC).
   * X and Y components should be between `-1` and `1`.
   * @param {Camera} camera - The camera from which the ray should originate.
   */
  setFromCamera(e, t) {
    t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, 0.5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, t.projectionMatrix.elements[14]).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : Xe("Raycaster: Unsupported camera type: " + t.type);
  }
  /**
   * Uses the given WebXR controller to compute a new origin and direction for the internal ray.
   *
   * @param {WebXRController} controller - The controller to copy the position and direction from.
   * @return {Raycaster} A reference to this raycaster.
   */
  setFromXRController(e) {
    return aa.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(aa), this;
  }
  /**
   * The intersection point of a raycaster intersection test.
   * @typedef {Object} Raycaster~Intersection
   * @property {number} distance - The distance from the ray's origin to the intersection point.
   * @property {number} distanceToRay -  Some 3D objects e.g. {@link Points} provide the distance of the
   * intersection to the nearest point on the ray. For other objects it will be `undefined`.
   * @property {Vector3} point - The intersection point, in world coordinates.
   * @property {Object} face - The face that has been intersected.
   * @property {number} faceIndex - The face index.
   * @property {Object3D} object - The 3D object that has been intersected.
   * @property {Vector2} uv - U,V coordinates at point of intersection.
   * @property {Vector2} uv1 - Second set of U,V coordinates at point of intersection.
   * @property {Vector3} normal - Interpolated normal vector at point of intersection.
   * @property {number} instanceId - The index number of the instance where the ray
   * intersects the {@link InstancedMesh}.
   */
  /**
   * Checks all intersection between the ray and the object with or without the
   * descendants. Intersections are returned sorted by distance, closest first.
   *
   * `Raycaster` delegates to the `raycast()` method of the passed 3D object, when
   * evaluating whether the ray intersects the object or not. This allows meshes to respond
   * differently to ray casting than lines or points.
   *
   * Note that for meshes, faces must be pointed towards the origin of the ray in order
   * to be detected; intersections of the ray passing through the back of a face will not
   * be detected. To raycast against both faces of an object, you'll want to set  {@link Material#side}
   * to `THREE.DoubleSide`.
   *
   * @param {Object3D} object - The 3D object to check for intersection with the ray.
   * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
   * Otherwise it only checks intersection with the object.
   * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
   * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
   */
  intersectObject(e, t = !0, n = []) {
    return lr(e, this, n, t), n.sort(oa), n;
  }
  /**
   * Checks all intersection between the ray and the objects with or without
   * the descendants. Intersections are returned sorted by distance, closest first.
   *
   * @param {Array<Object3D>} objects - The 3D objects to check for intersection with the ray.
   * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
   * Otherwise it only checks intersection with the object.
   * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
   * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
   */
  intersectObjects(e, t = !0, n = []) {
    for (let i = 0, s = e.length; i < s; i++)
      lr(e[i], this, n, t);
    return n.sort(oa), n;
  }
}
function oa(r, e) {
  return r.distance - e.distance;
}
function lr(r, e, t, n) {
  let i = !0;
  if (r.layers.test(e.layers) && r.raycast(e, t) === !1 && (i = !1), i === !0 && n === !0) {
    const s = r.children;
    for (let a = 0, o = s.length; a < o; a++)
      lr(s[a], e, t, !0);
  }
}
const wr = class wr {
  /**
   * Constructs a new 2x2 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   */
  constructor(e, t, n, i) {
    this.elements = [
      1,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, i);
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix2} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 4; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(e, t, n, i) {
    const s = this.elements;
    return s[0] = e, s[2] = t, s[1] = n, s[3] = i, this;
  }
};
wr.prototype.isMatrix2 = !0;
let la = wr;
function ca(r, e, t, n) {
  const i = Ul(n);
  switch (t) {
    case 1021:
      return r * e;
    case 1028:
      return r * e / i.components * i.byteLength;
    case 1029:
      return r * e / i.components * i.byteLength;
    case 1030:
      return r * e * 2 / i.components * i.byteLength;
    case 1031:
      return r * e * 2 / i.components * i.byteLength;
    case 1022:
      return r * e * 3 / i.components * i.byteLength;
    case 1023:
      return r * e * 4 / i.components * i.byteLength;
    case 1033:
      return r * e * 4 / i.components * i.byteLength;
    case 33776:
    case 33777:
      return Math.floor((r + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((r + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 35841:
    case 35843:
      return Math.max(r, 16) * Math.max(e, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(r, 8) * Math.max(e, 8) / 2;
    case 36196:
    case 37492:
    case 37488:
    case 37489:
      return Math.floor((r + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 37496:
    case 37490:
    case 37491:
      return Math.floor((r + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37808:
      return Math.floor((r + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37809:
      return Math.floor((r + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case 37810:
      return Math.floor((r + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case 37811:
      return Math.floor((r + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case 37812:
      return Math.floor((r + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case 37813:
      return Math.floor((r + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case 37814:
      return Math.floor((r + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case 37815:
      return Math.floor((r + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case 37816:
      return Math.floor((r + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case 37817:
      return Math.floor((r + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case 37818:
      return Math.floor((r + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case 37819:
      return Math.floor((r + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case 37820:
      return Math.floor((r + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case 37821:
      return Math.floor((r + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(r / 4) * Math.ceil(e / 4) * 16;
    case 36283:
    case 36284:
      return Math.ceil(r / 4) * Math.ceil(e / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(r / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function Ul(r) {
  switch (r) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
    case 35899:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: ur
} }));
typeof window < "u" && (window.__THREE__ ? Pe("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ur);
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
function ho() {
  let r = null, e = !1, t = null, n = null;
  function i(s, a) {
    t(s, a), n = r.requestAnimationFrame(i);
  }
  return {
    start: function() {
      e !== !0 && t !== null && r !== null && (n = r.requestAnimationFrame(i), e = !0);
    },
    stop: function() {
      r !== null && r.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      r = s;
    }
  };
}
function Bl(r) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, l) {
    const c = o.array, u = o.usage, d = c.byteLength, h = r.createBuffer();
    r.bindBuffer(l, h), r.bufferData(l, c, u), o.onUploadCallback();
    let f;
    if (c instanceof Float32Array)
      f = r.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array)
      f = r.HALF_FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? f = r.HALF_FLOAT : f = r.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      f = r.SHORT;
    else if (c instanceof Uint32Array)
      f = r.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      f = r.INT;
    else if (c instanceof Int8Array)
      f = r.BYTE;
    else if (c instanceof Uint8Array)
      f = r.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      f = r.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: h,
      type: f,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: d
    };
  }
  function n(o, l, c) {
    const u = l.array, d = l.updateRanges;
    if (r.bindBuffer(c, o), d.length === 0)
      r.bufferSubData(c, 0, u);
    else {
      d.sort((f, g) => f.start - g.start);
      let h = 0;
      for (let f = 1; f < d.length; f++) {
        const g = d[h], x = d[f];
        x.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          x.start + x.count - g.start
        ) : (++h, d[h] = x);
      }
      d.length = h + 1;
      for (let f = 0, g = d.length; f < g; f++) {
        const x = d[f];
        r.bufferSubData(
          c,
          x.start * u.BYTES_PER_ELEMENT,
          u,
          x.start,
          x.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function i(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = e.get(o);
    l && (r.deleteBuffer(l.buffer), e.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const u = e.get(o);
      (!u || u.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = e.get(o);
    if (c === void 0)
      e.set(o, t(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: i,
    remove: s,
    update: a
  };
}
var Ol = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, zl = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Gl = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Vl = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Hl = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, kl = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Wl = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Xl = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, ql = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, Yl = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Kl = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Zl = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, $l = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Jl = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Ql = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, jl = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, ec = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, tc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, nc = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, ic = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, sc = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, rc = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, ac = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, oc = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, lc = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, cc = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`, hc = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, uc = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, dc = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, fc = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, pc = "gl_FragColor = linearToOutputTexel( gl_FragColor );", mc = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, gc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, _c = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, vc = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, xc = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Mc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Sc = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, yc = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Ec = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Tc = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, bc = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Ac = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, wc = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Rc = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Cc = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`, Pc = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Fc = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Lc = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Ic = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Dc = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Nc = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Uc = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Bc = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Oc = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, zc = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Gc = `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`, Vc = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Hc = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, kc = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Wc = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Xc = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, qc = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Yc = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Kc = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Zc = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, $c = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Jc = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Qc = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, jc = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, eh = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, th = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, nh = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, ih = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, sh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, rh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, ah = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`, oh = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, lh = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, ch = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, hh = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, uh = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, dh = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, fh = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, ph = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, mh = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, gh = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, _h = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, vh = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, xh = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Mh = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, Sh = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, yh = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Eh = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Th = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, bh = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Ah = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, wh = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Rh = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Ch = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Ph = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Fh = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Lh = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Ih = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Dh = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Nh = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Uh = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Bh = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Oh = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, zh = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Gh = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Vh = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Hh = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, kh = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Wh = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Xh = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, qh = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Yh = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, Kh = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Zh = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, $h = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Jh = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Qh = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, jh = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, eu = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, tu = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, nu = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, iu = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, su = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, ru = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, au = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, ou = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, lu = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, cu = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, hu = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, uu = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, du = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, fu = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, pu = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, mu = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, gu = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, _u = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ue = {
  alphahash_fragment: Ol,
  alphahash_pars_fragment: zl,
  alphamap_fragment: Gl,
  alphamap_pars_fragment: Vl,
  alphatest_fragment: Hl,
  alphatest_pars_fragment: kl,
  aomap_fragment: Wl,
  aomap_pars_fragment: Xl,
  batching_pars_vertex: ql,
  batching_vertex: Yl,
  begin_vertex: Kl,
  beginnormal_vertex: Zl,
  bsdfs: $l,
  iridescence_fragment: Jl,
  bumpmap_pars_fragment: Ql,
  clipping_planes_fragment: jl,
  clipping_planes_pars_fragment: ec,
  clipping_planes_pars_vertex: tc,
  clipping_planes_vertex: nc,
  color_fragment: ic,
  color_pars_fragment: sc,
  color_pars_vertex: rc,
  color_vertex: ac,
  common: oc,
  cube_uv_reflection_fragment: lc,
  defaultnormal_vertex: cc,
  displacementmap_pars_vertex: hc,
  displacementmap_vertex: uc,
  emissivemap_fragment: dc,
  emissivemap_pars_fragment: fc,
  colorspace_fragment: pc,
  colorspace_pars_fragment: mc,
  envmap_fragment: gc,
  envmap_common_pars_fragment: _c,
  envmap_pars_fragment: vc,
  envmap_pars_vertex: xc,
  envmap_physical_pars_fragment: Pc,
  envmap_vertex: Mc,
  fog_vertex: Sc,
  fog_pars_vertex: yc,
  fog_fragment: Ec,
  fog_pars_fragment: Tc,
  gradientmap_pars_fragment: bc,
  lightmap_pars_fragment: Ac,
  lights_lambert_fragment: wc,
  lights_lambert_pars_fragment: Rc,
  lights_pars_begin: Cc,
  lights_toon_fragment: Fc,
  lights_toon_pars_fragment: Lc,
  lights_phong_fragment: Ic,
  lights_phong_pars_fragment: Dc,
  lights_physical_fragment: Nc,
  lights_physical_pars_fragment: Uc,
  lights_fragment_begin: Bc,
  lights_fragment_maps: Oc,
  lights_fragment_end: zc,
  lightprobes_pars_fragment: Gc,
  logdepthbuf_fragment: Vc,
  logdepthbuf_pars_fragment: Hc,
  logdepthbuf_pars_vertex: kc,
  logdepthbuf_vertex: Wc,
  map_fragment: Xc,
  map_pars_fragment: qc,
  map_particle_fragment: Yc,
  map_particle_pars_fragment: Kc,
  metalnessmap_fragment: Zc,
  metalnessmap_pars_fragment: $c,
  morphinstance_vertex: Jc,
  morphcolor_vertex: Qc,
  morphnormal_vertex: jc,
  morphtarget_pars_vertex: eh,
  morphtarget_vertex: th,
  normal_fragment_begin: nh,
  normal_fragment_maps: ih,
  normal_pars_fragment: sh,
  normal_pars_vertex: rh,
  normal_vertex: ah,
  normalmap_pars_fragment: oh,
  clearcoat_normal_fragment_begin: lh,
  clearcoat_normal_fragment_maps: ch,
  clearcoat_pars_fragment: hh,
  iridescence_pars_fragment: uh,
  opaque_fragment: dh,
  packing: fh,
  premultiplied_alpha_fragment: ph,
  project_vertex: mh,
  dithering_fragment: gh,
  dithering_pars_fragment: _h,
  roughnessmap_fragment: vh,
  roughnessmap_pars_fragment: xh,
  shadowmap_pars_fragment: Mh,
  shadowmap_pars_vertex: Sh,
  shadowmap_vertex: yh,
  shadowmask_pars_fragment: Eh,
  skinbase_vertex: Th,
  skinning_pars_vertex: bh,
  skinning_vertex: Ah,
  skinnormal_vertex: wh,
  specularmap_fragment: Rh,
  specularmap_pars_fragment: Ch,
  tonemapping_fragment: Ph,
  tonemapping_pars_fragment: Fh,
  transmission_fragment: Lh,
  transmission_pars_fragment: Ih,
  uv_pars_fragment: Dh,
  uv_pars_vertex: Nh,
  uv_vertex: Uh,
  worldpos_vertex: Bh,
  background_vert: Oh,
  background_frag: zh,
  backgroundCube_vert: Gh,
  backgroundCube_frag: Vh,
  cube_vert: Hh,
  cube_frag: kh,
  depth_vert: Wh,
  depth_frag: Xh,
  distance_vert: qh,
  distance_frag: Yh,
  equirect_vert: Kh,
  equirect_frag: Zh,
  linedashed_vert: $h,
  linedashed_frag: Jh,
  meshbasic_vert: Qh,
  meshbasic_frag: jh,
  meshlambert_vert: eu,
  meshlambert_frag: tu,
  meshmatcap_vert: nu,
  meshmatcap_frag: iu,
  meshnormal_vert: su,
  meshnormal_frag: ru,
  meshphong_vert: au,
  meshphong_frag: ou,
  meshphysical_vert: lu,
  meshphysical_frag: cu,
  meshtoon_vert: hu,
  meshtoon_frag: uu,
  points_vert: du,
  points_frag: fu,
  shadow_vert: pu,
  shadow_frag: mu,
  sprite_vert: gu,
  sprite_frag: _u
}, fe = {
  common: {
    diffuse: { value: /* @__PURE__ */ new ke(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Le() },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Le() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Le() },
    normalScale: { value: /* @__PURE__ */ new We(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Le() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new ke(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: null },
    probesMin: { value: /* @__PURE__ */ new H() },
    probesMax: { value: /* @__PURE__ */ new H() },
    probesResolution: { value: /* @__PURE__ */ new H() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new ke(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Le() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new ke(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new We(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  }
}, on = {
  basic: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.specularmap,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.specularmap,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.specularmap,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) },
        specular: { value: /* @__PURE__ */ new ke(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.roughnessmap,
      fe.metalnessmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.gradientmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new ke(0) }
      }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Lt([
      fe.points,
      fe.fog
    ]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ue.linedashed_vert,
    fragmentShader: Ue.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.displacementmap
    ]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Lt([
      fe.sprite,
      fe.fog
    ]),
    vertexShader: Ue.sprite_vert,
    fragmentShader: Ue.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Le() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ue.background_vert,
    fragmentShader: Ue.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Le() }
    },
    vertexShader: Ue.backgroundCube_vert,
    fragmentShader: Ue.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ue.cube_vert,
    fragmentShader: Ue.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ue.equirect_vert,
    fragmentShader: Ue.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Lt([
      fe.common,
      fe.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new H() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distance_vert,
    fragmentShader: Ue.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Lt([
      fe.lights,
      fe.fog,
      {
        color: { value: /* @__PURE__ */ new ke(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
on.physical = {
  uniforms: /* @__PURE__ */ Lt([
    on.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new We(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Le() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new ke(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Le() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Le() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new We() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new ke(0) },
      specularColor: { value: /* @__PURE__ */ new ke(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Le() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Le() },
      anisotropyVector: { value: /* @__PURE__ */ new We() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Le() }
    }
  ]),
  vertexShader: Ue.meshphysical_vert,
  fragmentShader: Ue.meshphysical_frag
};
const ss = { r: 0, b: 0, g: 0 }, vu = /* @__PURE__ */ new ot(), uo = /* @__PURE__ */ new Le();
uo.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function xu(r, e, t, n, i, s) {
  const a = new ke(0);
  let o = i === !0 ? 0 : 1, l, c, u = null, d = 0, h = null;
  function f(M) {
    let A = M.isScene === !0 ? M.background : null;
    if (A && A.isTexture) {
      const S = M.backgroundBlurriness > 0;
      A = e.get(A, S);
    }
    return A;
  }
  function g(M) {
    let A = !1;
    const S = f(M);
    S === null ? m(a, o) : S && S.isColor && (m(S, 1), A = !0);
    const b = r.xr.getEnvironmentBlendMode();
    b === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, s) : b === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, s), (r.autoClear || A) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), r.clear(r.autoClearColor, r.autoClearDepth, r.autoClearStencil));
  }
  function x(M, A) {
    const S = f(A);
    S && (S.isCubeTexture || S.mapping === 306) ? (c === void 0 && (c = new zt(
      new Ui(1, 1, 1),
      new hn({
        name: "BackgroundCubeMaterial",
        uniforms: fi(on.backgroundCube.uniforms),
        vertexShader: on.backgroundCube.vertexShader,
        fragmentShader: on.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(b, T, C) {
      this.matrixWorld.copyPosition(C.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), n.update(c)), c.material.uniforms.envMap.value = S, c.material.uniforms.backgroundBlurriness.value = A.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(vu.makeRotationFromEuler(A.backgroundRotation)).transpose(), S.isCubeTexture && S.isRenderTargetTexture === !1 && c.material.uniforms.backgroundRotation.value.premultiply(uo), c.material.toneMapped = He.getTransfer(S.colorSpace) !== Je, (u !== S || d !== S.version || h !== r.toneMapping) && (c.material.needsUpdate = !0, u = S, d = S.version, h = r.toneMapping), c.layers.enableAll(), M.unshift(c, c.geometry, c.material, 0, 0, null)) : S && S.isTexture && (l === void 0 && (l = new zt(
      new vs(2, 2),
      new hn({
        name: "BackgroundMaterial",
        uniforms: fi(on.background.uniforms),
        vertexShader: on.background.vertexShader,
        fragmentShader: on.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), n.update(l)), l.material.uniforms.t2D.value = S, l.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, l.material.toneMapped = He.getTransfer(S.colorSpace) !== Je, S.matrixAutoUpdate === !0 && S.updateMatrix(), l.material.uniforms.uvTransform.value.copy(S.matrix), (u !== S || d !== S.version || h !== r.toneMapping) && (l.material.needsUpdate = !0, u = S, d = S.version, h = r.toneMapping), l.layers.enableAll(), M.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function m(M, A) {
    M.getRGB(ss, oo(r)), t.buffers.color.setClear(ss.r, ss.g, ss.b, A, s);
  }
  function p() {
    c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(M, A = 1) {
      a.set(M), o = A, m(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(M) {
      o = M, m(a, o);
    },
    render: g,
    addToRenderList: x,
    dispose: p
  };
}
function Mu(r, e) {
  const t = r.getParameter(r.MAX_VERTEX_ATTRIBS), n = {}, i = h(null);
  let s = i, a = !1;
  function o(F, L, I, U, D) {
    let N = !1;
    const V = d(F, U, I, L);
    s !== V && (s = V, c(s.object)), N = f(F, U, I, D), N && g(F, U, I, D), D !== null && e.update(D, r.ELEMENT_ARRAY_BUFFER), (N || a) && (a = !1, S(F, L, I, U), D !== null && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, e.get(D).buffer));
  }
  function l() {
    return r.createVertexArray();
  }
  function c(F) {
    return r.bindVertexArray(F);
  }
  function u(F) {
    return r.deleteVertexArray(F);
  }
  function d(F, L, I, U) {
    const D = U.wireframe === !0;
    let N = n[L.id];
    N === void 0 && (N = {}, n[L.id] = N);
    const V = F.isInstancedMesh === !0 ? F.id : 0;
    let W = N[V];
    W === void 0 && (W = {}, N[V] = W);
    let K = W[I.id];
    K === void 0 && (K = {}, W[I.id] = K);
    let ie = K[D];
    return ie === void 0 && (ie = h(l()), K[D] = ie), ie;
  }
  function h(F) {
    const L = [], I = [], U = [];
    for (let D = 0; D < t; D++)
      L[D] = 0, I[D] = 0, U[D] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: L,
      enabledAttributes: I,
      attributeDivisors: U,
      object: F,
      attributes: {},
      index: null
    };
  }
  function f(F, L, I, U) {
    const D = s.attributes, N = L.attributes;
    let V = 0;
    const W = I.getAttributes();
    for (const K in W)
      if (W[K].location >= 0) {
        const se = D[K];
        let ee = N[K];
        if (ee === void 0 && (K === "instanceMatrix" && F.instanceMatrix && (ee = F.instanceMatrix), K === "instanceColor" && F.instanceColor && (ee = F.instanceColor)), se === void 0 || se.attribute !== ee || ee && se.data !== ee.data) return !0;
        V++;
      }
    return s.attributesNum !== V || s.index !== U;
  }
  function g(F, L, I, U) {
    const D = {}, N = L.attributes;
    let V = 0;
    const W = I.getAttributes();
    for (const K in W)
      if (W[K].location >= 0) {
        let se = N[K];
        se === void 0 && (K === "instanceMatrix" && F.instanceMatrix && (se = F.instanceMatrix), K === "instanceColor" && F.instanceColor && (se = F.instanceColor));
        const ee = {};
        ee.attribute = se, se && se.data && (ee.data = se.data), D[K] = ee, V++;
      }
    s.attributes = D, s.attributesNum = V, s.index = U;
  }
  function x() {
    const F = s.newAttributes;
    for (let L = 0, I = F.length; L < I; L++)
      F[L] = 0;
  }
  function m(F) {
    p(F, 0);
  }
  function p(F, L) {
    const I = s.newAttributes, U = s.enabledAttributes, D = s.attributeDivisors;
    I[F] = 1, U[F] === 0 && (r.enableVertexAttribArray(F), U[F] = 1), D[F] !== L && (r.vertexAttribDivisor(F, L), D[F] = L);
  }
  function M() {
    const F = s.newAttributes, L = s.enabledAttributes;
    for (let I = 0, U = L.length; I < U; I++)
      L[I] !== F[I] && (r.disableVertexAttribArray(I), L[I] = 0);
  }
  function A(F, L, I, U, D, N, V) {
    V === !0 ? r.vertexAttribIPointer(F, L, I, D, N) : r.vertexAttribPointer(F, L, I, U, D, N);
  }
  function S(F, L, I, U) {
    x();
    const D = U.attributes, N = I.getAttributes(), V = L.defaultAttributeValues;
    for (const W in N) {
      const K = N[W];
      if (K.location >= 0) {
        let ie = D[W];
        if (ie === void 0 && (W === "instanceMatrix" && F.instanceMatrix && (ie = F.instanceMatrix), W === "instanceColor" && F.instanceColor && (ie = F.instanceColor)), ie !== void 0) {
          const se = ie.normalized, ee = ie.itemSize, Oe = e.get(ie);
          if (Oe === void 0) continue;
          const je = Oe.buffer, Ve = Oe.type, J = Oe.bytesPerElement, ae = Ve === r.INT || Ve === r.UNSIGNED_INT || ie.gpuType === 1013;
          if (ie.isInterleavedBufferAttribute) {
            const ne = ie.data, Fe = ne.stride, Ie = ie.offset;
            if (ne.isInstancedInterleavedBuffer) {
              for (let Re = 0; Re < K.locationSize; Re++)
                p(K.location + Re, ne.meshPerAttribute);
              F.isInstancedMesh !== !0 && U._maxInstanceCount === void 0 && (U._maxInstanceCount = ne.meshPerAttribute * ne.count);
            } else
              for (let Re = 0; Re < K.locationSize; Re++)
                m(K.location + Re);
            r.bindBuffer(r.ARRAY_BUFFER, je);
            for (let Re = 0; Re < K.locationSize; Re++)
              A(
                K.location + Re,
                ee / K.locationSize,
                Ve,
                se,
                Fe * J,
                (Ie + ee / K.locationSize * Re) * J,
                ae
              );
          } else {
            if (ie.isInstancedBufferAttribute) {
              for (let ne = 0; ne < K.locationSize; ne++)
                p(K.location + ne, ie.meshPerAttribute);
              F.isInstancedMesh !== !0 && U._maxInstanceCount === void 0 && (U._maxInstanceCount = ie.meshPerAttribute * ie.count);
            } else
              for (let ne = 0; ne < K.locationSize; ne++)
                m(K.location + ne);
            r.bindBuffer(r.ARRAY_BUFFER, je);
            for (let ne = 0; ne < K.locationSize; ne++)
              A(
                K.location + ne,
                ee / K.locationSize,
                Ve,
                se,
                ee * J,
                ee / K.locationSize * ne * J,
                ae
              );
          }
        } else if (V !== void 0) {
          const se = V[W];
          if (se !== void 0)
            switch (se.length) {
              case 2:
                r.vertexAttrib2fv(K.location, se);
                break;
              case 3:
                r.vertexAttrib3fv(K.location, se);
                break;
              case 4:
                r.vertexAttrib4fv(K.location, se);
                break;
              default:
                r.vertexAttrib1fv(K.location, se);
            }
        }
      }
    }
    M();
  }
  function b() {
    w();
    for (const F in n) {
      const L = n[F];
      for (const I in L) {
        const U = L[I];
        for (const D in U) {
          const N = U[D];
          for (const V in N)
            u(N[V].object), delete N[V];
          delete U[D];
        }
      }
      delete n[F];
    }
  }
  function T(F) {
    if (n[F.id] === void 0) return;
    const L = n[F.id];
    for (const I in L) {
      const U = L[I];
      for (const D in U) {
        const N = U[D];
        for (const V in N)
          u(N[V].object), delete N[V];
        delete U[D];
      }
    }
    delete n[F.id];
  }
  function C(F) {
    for (const L in n) {
      const I = n[L];
      for (const U in I) {
        const D = I[U];
        if (D[F.id] === void 0) continue;
        const N = D[F.id];
        for (const V in N)
          u(N[V].object), delete N[V];
        delete D[F.id];
      }
    }
  }
  function v(F) {
    for (const L in n) {
      const I = n[L], U = F.isInstancedMesh === !0 ? F.id : 0, D = I[U];
      if (D !== void 0) {
        for (const N in D) {
          const V = D[N];
          for (const W in V)
            u(V[W].object), delete V[W];
          delete D[N];
        }
        delete I[U], Object.keys(I).length === 0 && delete n[L];
      }
    }
  }
  function w() {
    P(), a = !0, s !== i && (s = i, c(s.object));
  }
  function P() {
    i.geometry = null, i.program = null, i.wireframe = !1;
  }
  return {
    setup: o,
    reset: w,
    resetDefaultState: P,
    dispose: b,
    releaseStatesOfGeometry: T,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: C,
    initAttributes: x,
    enableAttribute: m,
    disableUnusedAttributes: M
  };
}
function Su(r, e, t) {
  let n;
  function i(l) {
    n = l;
  }
  function s(l, c) {
    r.drawArrays(n, l, c), t.update(c, n, 1);
  }
  function a(l, c, u) {
    u !== 0 && (r.drawArraysInstanced(n, l, c, u), t.update(c, n, u));
  }
  function o(l, c, u) {
    if (u === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, c, 0, u);
    let h = 0;
    for (let f = 0; f < u; f++)
      h += c[f];
    t.update(h, n, 1);
  }
  this.setMode = i, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function yu(r, e, t, n) {
  let i;
  function s() {
    if (i !== void 0) return i;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const C = e.get("EXT_texture_filter_anisotropic");
      i = r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      i = 0;
    return i;
  }
  function a(C) {
    return !(C !== 1023 && n.convert(C) !== r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(C) {
    const v = C === 1016 && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(C !== 1009 && n.convert(C) !== r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    C !== 1015 && !v);
  }
  function l(C) {
    if (C === "highp") {
      if (r.getShaderPrecisionFormat(r.VERTEX_SHADER, r.HIGH_FLOAT).precision > 0 && r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT).precision > 0)
        return "highp";
      C = "mediump";
    }
    return C === "mediump" && r.getShaderPrecisionFormat(r.VERTEX_SHADER, r.MEDIUM_FLOAT).precision > 0 && r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const u = l(c);
  u !== c && (Pe("WebGLRenderer:", c, "not supported, using", u, "instead."), c = u);
  const d = t.logarithmicDepthBuffer === !0, h = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control");
  t.reversedDepthBuffer === !0 && h === !1 && Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const f = r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS), g = r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS), x = r.getParameter(r.MAX_TEXTURE_SIZE), m = r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE), p = r.getParameter(r.MAX_VERTEX_ATTRIBS), M = r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS), A = r.getParameter(r.MAX_VARYING_VECTORS), S = r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS), b = r.getParameter(r.MAX_SAMPLES), T = r.getParameter(r.SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: d,
    reversedDepthBuffer: h,
    maxTextures: f,
    maxVertexTextures: g,
    maxTextureSize: x,
    maxCubemapSize: m,
    maxAttributes: p,
    maxVertexUniforms: M,
    maxVaryings: A,
    maxFragmentUniforms: S,
    maxSamples: b,
    samples: T
  };
}
function Eu(r) {
  const e = this;
  let t = null, n = 0, i = !1, s = !1;
  const a = new Vn(), o = new Le(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, h) {
    const f = d.length !== 0 || h || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || i;
    return i = h, n = d.length, f;
  }, this.beginShadows = function() {
    s = !0, u(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, h) {
    t = u(d, h, 0);
  }, this.setState = function(d, h, f) {
    const g = d.clippingPlanes, x = d.clipIntersection, m = d.clipShadows, p = r.get(d);
    if (!i || g === null || g.length === 0 || s && !m)
      s ? u(null) : c();
    else {
      const M = s ? 0 : n, A = M * 4;
      let S = p.clippingState || null;
      l.value = S, S = u(g, h, A, f);
      for (let b = 0; b !== A; ++b)
        S[b] = t[b];
      p.clippingState = S, this.numIntersection = x ? this.numPlanes : 0, this.numPlanes += M;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function u(d, h, f, g) {
    const x = d !== null ? d.length : 0;
    let m = null;
    if (x !== 0) {
      if (m = l.value, g !== !0 || m === null) {
        const p = f + x * 4, M = h.matrixWorldInverse;
        o.getNormalMatrix(M), (m === null || m.length < p) && (m = new Float32Array(p));
        for (let A = 0, S = f; A !== x; ++A, S += 4)
          a.copy(d[A]).applyMatrix4(M, o), a.normal.toArray(m, S), m[S + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return e.numPlanes = x, e.numIntersection = 0, m;
  }
}
const In = 4, ha = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Hn = 20, Tu = 256, yi = /* @__PURE__ */ new xr(), ua = /* @__PURE__ */ new ke();
let $s = null, Js = 0, Qs = 0, js = !1;
const bu = /* @__PURE__ */ new H();
class da {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety.
   *
   * @param {Scene} scene - The scene to be captured.
   * @param {number} [sigma=0] - The blur radius in radians.
   * @param {number} [near=0.1] - The near plane distance.
   * @param {number} [far=100] - The far plane distance.
   * @param {Object} [options={}] - The configuration options.
   * @param {number} [options.size=256] - The texture size of the PMREM.
   * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromScene(e, t = 0, n = 0.1, i = 100, s = {}) {
    const {
      size: a = 256,
      position: o = bu
    } = s;
    $s = this._renderer.getRenderTarget(), Js = this._renderer.getActiveCubeFace(), Qs = this._renderer.getActiveMipmapLevel(), js = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const l = this._allocateTargets();
    return l.depthBuffer = !0, this._sceneToCubeUV(e, n, i, l, o), t > 0 && this._blur(l, 0, 0, t), this._applyPMREM(l), this._cleanup(l), l;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512), as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input image size
   * is 64 x 32.
   *
   * @param {Texture} equirectangular - The equirectangular texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256, as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input cube
   * size is 16 x 16 per face.
   *
   * @param {Texture} cubemap - The cubemap texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = ma(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = pa(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget($s, Js, Qs), this._renderer.xr.enabled = js, e.scissorTest = !1, ai(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), $s = this._renderer.getRenderTarget(), Js = this._renderer.getActiveCubeFace(), Qs = this._renderer.getActiveMipmapLevel(), js = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: fs,
      depthBuffer: !1
    }, i = fa(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = fa(e, t, n);
      const { _lodMax: s } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Au(s)), this._blurMaterial = Ru(s, e, t), this._ggxMaterial = wu(s, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const t = new zt(new Wt(), e);
    this._renderer.compile(t, yi);
  }
  _sceneToCubeUV(e, t, n, i, s) {
    const l = new Zt(90, 1, t, n), c = [1, -1, 1, 1, 1, 1], u = [1, 1, 1, -1, -1, -1], d = this._renderer, h = d.autoClear, f = d.toneMapping;
    d.getClearColor(ua), d.toneMapping = 0, d.autoClear = !1, d.state.buffers.depth.getReversed() && (d.setRenderTarget(i), d.clearDepth(), d.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new zt(
      new Ui(),
      new gr({
        name: "PMREM.Background",
        side: 1,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const x = this._backgroundBox, m = x.material;
    let p = !1;
    const M = e.background;
    M ? M.isColor && (m.color.copy(M), e.background = null, p = !0) : (m.color.copy(ua), p = !0);
    for (let A = 0; A < 6; A++) {
      const S = A % 3;
      S === 0 ? (l.up.set(0, c[A], 0), l.position.set(s.x, s.y, s.z), l.lookAt(s.x + u[A], s.y, s.z)) : S === 1 ? (l.up.set(0, 0, c[A]), l.position.set(s.x, s.y, s.z), l.lookAt(s.x, s.y + u[A], s.z)) : (l.up.set(0, c[A], 0), l.position.set(s.x, s.y, s.z), l.lookAt(s.x, s.y, s.z + u[A]));
      const b = this._cubeSize;
      ai(i, S * b, A > 2 ? b : 0, b, b), d.setRenderTarget(i), p && d.render(x, l), d.render(e, l);
    }
    d.toneMapping = f, d.autoClear = h, e.background = M;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, i = e.mapping === 301 || e.mapping === 302;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = ma()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = pa());
    const s = i ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
    a.material = s;
    const o = s.uniforms;
    o.envMap.value = e;
    const l = this._cubeSize;
    ai(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(a, yi);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const i = this._lodMeshes.length;
    for (let s = 1; s < i; s++)
      this._applyGGXFilter(e, s - 1, s);
    t.autoClear = n;
  }
  /**
   * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
   * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
   * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
   * applies incremental roughness filtering to avoid over-blurring.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn - Source LOD level to read from
   * @param {number} lodOut - Target LOD level to write to
   */
  _applyGGXFilter(e, t, n) {
    const i = this._renderer, s = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
    o.material = a;
    const l = a.uniforms, c = n / (this._lodMeshes.length - 1), u = t / (this._lodMeshes.length - 1), d = Math.sqrt(c * c - u * u), h = 0 + c * 1.25, f = d * h, { _lodMax: g } = this, x = this._sizeLods[n], m = 3 * x * (n > g - In ? n - g + In : 0), p = 4 * (this._cubeSize - x);
    l.envMap.value = e.texture, l.roughness.value = f, l.mipInt.value = g - t, ai(s, m, p, 3 * x, 2 * x), i.setRenderTarget(s), i.render(o, yi), l.envMap.value = s.texture, l.roughness.value = 0, l.mipInt.value = g - n, ai(e, m, p, 3 * x, 2 * x), i.setRenderTarget(e), i.render(o, yi);
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   *
   * Used for initial scene blur in fromScene() method when sigma > 0.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   * @param {Vector3} [poleAxis]
   */
  _blur(e, t, n, i, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      n,
      i,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      n,
      n,
      i,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, n, i, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && Xe(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const u = 3, d = this._lodMeshes[i];
    d.material = c;
    const h = c.uniforms, f = this._sizeLods[n] - 1, g = isFinite(s) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * Hn - 1), x = s / g, m = isFinite(s) ? 1 + Math.floor(u * x) : Hn;
    m > Hn && Pe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hn}`);
    const p = [];
    let M = 0;
    for (let C = 0; C < Hn; ++C) {
      const v = C / x, w = Math.exp(-v * v / 2);
      p.push(w), C === 0 ? M += w : C < m && (M += 2 * w);
    }
    for (let C = 0; C < p.length; C++)
      p[C] = p[C] / M;
    h.envMap.value = e.texture, h.samples.value = m, h.weights.value = p, h.latitudinal.value = a === "latitudinal", o && (h.poleAxis.value = o);
    const { _lodMax: A } = this;
    h.dTheta.value = g, h.mipInt.value = A - n;
    const S = this._sizeLods[i], b = 3 * S * (i > A - In ? i - A + In : 0), T = 4 * (this._cubeSize - S);
    ai(t, b, T, 3 * S, 2 * S), l.setRenderTarget(t), l.render(d, yi);
  }
}
function Au(r) {
  const e = [], t = [], n = [];
  let i = r;
  const s = r - In + 1 + ha.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, i);
    e.push(o);
    let l = 1 / o;
    a > r - In ? l = ha[a - r + In - 1] : a === 0 && (l = 0), t.push(l);
    const c = 1 / (o - 2), u = -c, d = 1 + c, h = [u, u, d, u, d, d, u, u, d, d, u, d], f = 6, g = 6, x = 3, m = 2, p = 1, M = new Float32Array(x * g * f), A = new Float32Array(m * g * f), S = new Float32Array(p * g * f);
    for (let T = 0; T < f; T++) {
      const C = T % 3 * 2 / 3 - 1, v = T > 2 ? 0 : -1, w = [
        C,
        v,
        0,
        C + 2 / 3,
        v,
        0,
        C + 2 / 3,
        v + 1,
        0,
        C,
        v,
        0,
        C + 2 / 3,
        v + 1,
        0,
        C,
        v + 1,
        0
      ];
      M.set(w, x * g * T), A.set(h, m * g * T);
      const P = [T, T, T, T, T, T];
      S.set(P, p * g * T);
    }
    const b = new Wt();
    b.setAttribute("position", new cn(M, x)), b.setAttribute("uv", new cn(A, m)), b.setAttribute("faceIndex", new cn(S, p)), n.push(new zt(b, null)), i > In && i--;
  }
  return { lodMeshes: n, sizeLods: e, sigmas: t };
}
function fa(r, e, t) {
  const n = new ln(r, e, t);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function ai(r, e, t, n, i) {
  r.viewport.set(e, t, n, i), r.scissor.set(e, t, n, i);
}
function wu(r, e, t) {
  return new hn({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Tu,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${r}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: xs(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ru(r, e, t) {
  const n = new Float32Array(Hn), i = new H(0, 1, 0);
  return new hn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Hn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${r}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: i }
    },
    vertexShader: xs(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function pa() {
  return new hn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: xs(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ma() {
  return new hn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: xs(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function xs() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
class fo extends ln {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, i = [n, n, n, n, n, n];
    this.texture = new so(i), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, i = new Ui(5, 5, 5), s = new hn({
      name: "CubemapFromEquirect",
      uniforms: fi(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = t;
    const a = new zt(i, s), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new Dl(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(e, t = !0, n = !0, i = !0) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, i);
    e.setRenderTarget(s);
  }
}
function Cu(r) {
  let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n = null;
  function i(h, f = !1) {
    return h == null ? null : f ? a(h) : s(h);
  }
  function s(h) {
    if (h && h.isTexture) {
      const f = h.mapping;
      if (f === 303 || f === 304)
        if (e.has(h)) {
          const g = e.get(h).texture;
          return o(g, h.mapping);
        } else {
          const g = h.image;
          if (g && g.height > 0) {
            const x = new fo(g.height);
            return x.fromEquirectangularTexture(r, h), e.set(h, x), h.addEventListener("dispose", c), o(x.texture, h.mapping);
          } else
            return null;
        }
    }
    return h;
  }
  function a(h) {
    if (h && h.isTexture) {
      const f = h.mapping, g = f === 303 || f === 304, x = f === 301 || f === 302;
      if (g || x) {
        let m = t.get(h);
        const p = m !== void 0 ? m.texture.pmremVersion : 0;
        if (h.isRenderTargetTexture && h.pmremVersion !== p)
          return n === null && (n = new da(r)), m = g ? n.fromEquirectangular(h, m) : n.fromCubemap(h, m), m.texture.pmremVersion = h.pmremVersion, t.set(h, m), m.texture;
        if (m !== void 0)
          return m.texture;
        {
          const M = h.image;
          return g && M && M.height > 0 || x && M && l(M) ? (n === null && (n = new da(r)), m = g ? n.fromEquirectangular(h) : n.fromCubemap(h), m.texture.pmremVersion = h.pmremVersion, t.set(h, m), h.addEventListener("dispose", u), m.texture) : null;
        }
      }
    }
    return h;
  }
  function o(h, f) {
    return f === 303 ? h.mapping = 301 : f === 304 && (h.mapping = 302), h;
  }
  function l(h) {
    let f = 0;
    const g = 6;
    for (let x = 0; x < g; x++)
      h[x] !== void 0 && f++;
    return f === g;
  }
  function c(h) {
    const f = h.target;
    f.removeEventListener("dispose", c);
    const g = e.get(f);
    g !== void 0 && (e.delete(f), g.dispose());
  }
  function u(h) {
    const f = h.target;
    f.removeEventListener("dispose", u);
    const g = t.get(f);
    g !== void 0 && (t.delete(f), g.dispose());
  }
  function d() {
    e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: i,
    dispose: d
  };
}
function Pu(r) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    const i = r.getExtension(n);
    return e[n] = i, i;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const i = t(n);
      return i === null && hi("WebGLRenderer: " + n + " extension not supported."), i;
    }
  };
}
function Fu(r, e, t, n) {
  const i = {}, s = /* @__PURE__ */ new WeakMap();
  function a(d) {
    const h = d.target;
    h.index !== null && e.remove(h.index);
    for (const g in h.attributes)
      e.remove(h.attributes[g]);
    h.removeEventListener("dispose", a), delete i[h.id];
    const f = s.get(h);
    f && (e.remove(f), s.delete(h)), n.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, t.memory.geometries--;
  }
  function o(d, h) {
    return i[h.id] === !0 || (h.addEventListener("dispose", a), i[h.id] = !0, t.memory.geometries++), h;
  }
  function l(d) {
    const h = d.attributes;
    for (const f in h)
      e.update(h[f], r.ARRAY_BUFFER);
  }
  function c(d) {
    const h = [], f = d.index, g = d.attributes.position;
    let x = 0;
    if (g === void 0)
      return;
    if (f !== null) {
      const M = f.array;
      x = f.version;
      for (let A = 0, S = M.length; A < S; A += 3) {
        const b = M[A + 0], T = M[A + 1], C = M[A + 2];
        h.push(b, T, T, C, C, b);
      }
    } else {
      const M = g.array;
      x = g.version;
      for (let A = 0, S = M.length / 3 - 1; A < S; A += 3) {
        const b = A + 0, T = A + 1, C = A + 2;
        h.push(b, T, T, C, C, b);
      }
    }
    const m = new (g.count >= 65535 ? no : to)(h, 1);
    m.version = x;
    const p = s.get(d);
    p && e.remove(p), s.set(d, m);
  }
  function u(d) {
    const h = s.get(d);
    if (h) {
      const f = d.index;
      f !== null && h.version < f.version && c(d);
    } else
      c(d);
    return s.get(d);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: u
  };
}
function Lu(r, e, t) {
  let n;
  function i(d) {
    n = d;
  }
  let s, a;
  function o(d) {
    s = d.type, a = d.bytesPerElement;
  }
  function l(d, h) {
    r.drawElements(n, h, s, d * a), t.update(h, n, 1);
  }
  function c(d, h, f) {
    f !== 0 && (r.drawElementsInstanced(n, h, s, d * a, f), t.update(h, n, f));
  }
  function u(d, h, f) {
    if (f === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, h, 0, s, d, 0, f);
    let x = 0;
    for (let m = 0; m < f; m++)
      x += h[m];
    t.update(x, n, 1);
  }
  this.setMode = i, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = u;
}
function Iu(r) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (t.calls++, a) {
      case r.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case r.LINES:
        t.lines += o * (s / 2);
        break;
      case r.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case r.LINE_LOOP:
        t.lines += o * s;
        break;
      case r.POINTS:
        t.points += o * s;
        break;
      default:
        Xe("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function i() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: i,
    update: n
  };
}
function Du(r, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), i = new at();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = u !== void 0 ? u.length : 0;
    let h = n.get(o);
    if (h === void 0 || h.count !== d) {
      let w = function() {
        C.dispose(), n.delete(o), o.removeEventListener("dispose", w);
      };
      h !== void 0 && h.texture.dispose();
      const f = o.morphAttributes.position !== void 0, g = o.morphAttributes.normal !== void 0, x = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], p = o.morphAttributes.normal || [], M = o.morphAttributes.color || [];
      let A = 0;
      f === !0 && (A = 1), g === !0 && (A = 2), x === !0 && (A = 3);
      let S = o.attributes.position.count * A, b = 1;
      S > e.maxTextureSize && (b = Math.ceil(S / e.maxTextureSize), S = e.maxTextureSize);
      const T = new Float32Array(S * b * 4 * d), C = new ja(T, S, b, d);
      C.type = 1015, C.needsUpdate = !0;
      const v = A * 4;
      for (let P = 0; P < d; P++) {
        const F = m[P], L = p[P], I = M[P], U = S * b * 4 * P;
        for (let D = 0; D < F.count; D++) {
          const N = D * v;
          f === !0 && (i.fromBufferAttribute(F, D), T[U + N + 0] = i.x, T[U + N + 1] = i.y, T[U + N + 2] = i.z, T[U + N + 3] = 0), g === !0 && (i.fromBufferAttribute(L, D), T[U + N + 4] = i.x, T[U + N + 5] = i.y, T[U + N + 6] = i.z, T[U + N + 7] = 0), x === !0 && (i.fromBufferAttribute(I, D), T[U + N + 8] = i.x, T[U + N + 9] = i.y, T[U + N + 10] = i.z, T[U + N + 11] = I.itemSize === 4 ? i.w : 1);
        }
      }
      h = {
        count: d,
        texture: C,
        size: new We(S, b)
      }, n.set(o, h), o.addEventListener("dispose", w);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(r, "morphTexture", a.morphTexture, t);
    else {
      let f = 0;
      for (let x = 0; x < c.length; x++)
        f += c[x];
      const g = o.morphTargetsRelative ? 1 : 1 - f;
      l.getUniforms().setValue(r, "morphTargetBaseInfluence", g), l.getUniforms().setValue(r, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(r, "morphTargetsTexture", h.texture, t), l.getUniforms().setValue(r, "morphTargetsTextureSize", h.size);
  }
  return {
    update: s
  };
}
function Nu(r, e, t, n, i) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(c) {
    const u = i.render.frame, d = c.geometry, h = e.get(c, d);
    if (s.get(h) !== u && (e.update(h), s.set(h, u)), c.isInstancedMesh && (c.hasEventListener("dispose", l) === !1 && c.addEventListener("dispose", l), s.get(c) !== u && (t.update(c.instanceMatrix, r.ARRAY_BUFFER), c.instanceColor !== null && t.update(c.instanceColor, r.ARRAY_BUFFER), s.set(c, u))), c.isSkinnedMesh) {
      const f = c.skeleton;
      s.get(f) !== u && (f.update(), s.set(f, u));
    }
    return h;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function l(c) {
    const u = c.target;
    u.removeEventListener("dispose", l), n.releaseStatesOfObject(u), t.remove(u.instanceMatrix), u.instanceColor !== null && t.remove(u.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
const Uu = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function Bu(r, e, t, n, i, s) {
  const a = new ln(e, t, {
    type: r,
    depthBuffer: i,
    stencilBuffer: s,
    samples: n ? 4 : 0,
    depthTexture: i ? new di(e, t) : void 0
  }), o = new ln(e, t, {
    type: 1016,
    depthBuffer: !1,
    stencilBuffer: !1
  }), l = new Wt();
  l.setAttribute("position", new bt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), l.setAttribute("uv", new bt([0, 2, 0, 0, 2, 0], 2));
  const c = new Rl({
    uniforms: {
      tDiffuse: { value: null }
    },
    vertexShader: (
      /* glsl */
      `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`
    ),
    fragmentShader: (
      /* glsl */
      `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`
    ),
    depthTest: !1,
    depthWrite: !1
  }), u = new zt(l, c), d = new xr(-1, 1, 1, -1, 0, 1);
  let h = null, f = null, g = !1, x, m = null, p = [], M = !1;
  this.setSize = function(A, S) {
    a.setSize(A, S), o.setSize(A, S);
    for (let b = 0; b < p.length; b++) {
      const T = p[b];
      T.setSize && T.setSize(A, S);
    }
  }, this.setEffects = function(A) {
    p = A, M = p.length > 0 && p[0].isRenderPass === !0;
    const S = a.width, b = a.height;
    for (let T = 0; T < p.length; T++) {
      const C = p[T];
      C.setSize && C.setSize(S, b);
    }
  }, this.begin = function(A, S) {
    if (g || A.toneMapping === 0 && p.length === 0) return !1;
    if (m = S, S !== null) {
      const b = S.width, T = S.height;
      (a.width !== b || a.height !== T) && this.setSize(b, T);
    }
    return M === !1 && A.setRenderTarget(a), x = A.toneMapping, A.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return M;
  }, this.end = function(A, S) {
    A.toneMapping = x, g = !0;
    let b = a, T = o;
    for (let C = 0; C < p.length; C++) {
      const v = p[C];
      if (v.enabled !== !1 && (v.render(A, T, b, S), v.needsSwap !== !1)) {
        const w = b;
        b = T, T = w;
      }
    }
    if (h !== A.outputColorSpace || f !== A.toneMapping) {
      h = A.outputColorSpace, f = A.toneMapping, c.defines = {}, He.getTransfer(h) === Je && (c.defines.SRGB_TRANSFER = "");
      const C = Uu[f];
      C && (c.defines[C] = ""), c.needsUpdate = !0;
    }
    c.uniforms.tDiffuse.value = b.texture, A.setRenderTarget(m), A.render(u, d), m = null, g = !1;
  }, this.isCompositing = function() {
    return g;
  }, this.dispose = function() {
    a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), l.dispose(), c.dispose();
  };
}
const po = /* @__PURE__ */ new It(), cr = /* @__PURE__ */ new di(1, 1), mo = /* @__PURE__ */ new ja(), go = /* @__PURE__ */ new al(), _o = /* @__PURE__ */ new so(), ga = [], _a = [], va = new Float32Array(16), xa = new Float32Array(9), Ma = new Float32Array(4);
function _i(r, e, t) {
  const n = r[0];
  if (n <= 0 || n > 0) return r;
  const i = e * t;
  let s = ga[i];
  if (s === void 0 && (s = new Float32Array(i), ga[i] = s), e !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, r[a].toArray(s, o);
  }
  return s;
}
function St(r, e) {
  if (r.length !== e.length) return !1;
  for (let t = 0, n = r.length; t < n; t++)
    if (r[t] !== e[t]) return !1;
  return !0;
}
function yt(r, e) {
  for (let t = 0, n = e.length; t < n; t++)
    r[t] = e[t];
}
function Ms(r, e) {
  let t = _a[e];
  t === void 0 && (t = new Int32Array(e), _a[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = r.allocateTextureUnit();
  return t;
}
function Ou(r, e) {
  const t = this.cache;
  t[0] !== e && (r.uniform1f(this.addr, e), t[0] = e);
}
function zu(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (r.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (St(t, e)) return;
    r.uniform2fv(this.addr, e), yt(t, e);
  }
}
function Gu(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (r.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (St(t, e)) return;
    r.uniform3fv(this.addr, e), yt(t, e);
  }
}
function Vu(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (St(t, e)) return;
    r.uniform4fv(this.addr, e), yt(t, e);
  }
}
function Hu(r, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (St(t, e)) return;
    r.uniformMatrix2fv(this.addr, !1, e), yt(t, e);
  } else {
    if (St(t, n)) return;
    Ma.set(n), r.uniformMatrix2fv(this.addr, !1, Ma), yt(t, n);
  }
}
function ku(r, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (St(t, e)) return;
    r.uniformMatrix3fv(this.addr, !1, e), yt(t, e);
  } else {
    if (St(t, n)) return;
    xa.set(n), r.uniformMatrix3fv(this.addr, !1, xa), yt(t, n);
  }
}
function Wu(r, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (St(t, e)) return;
    r.uniformMatrix4fv(this.addr, !1, e), yt(t, e);
  } else {
    if (St(t, n)) return;
    va.set(n), r.uniformMatrix4fv(this.addr, !1, va), yt(t, n);
  }
}
function Xu(r, e) {
  const t = this.cache;
  t[0] !== e && (r.uniform1i(this.addr, e), t[0] = e);
}
function qu(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (r.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (St(t, e)) return;
    r.uniform2iv(this.addr, e), yt(t, e);
  }
}
function Yu(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (St(t, e)) return;
    r.uniform3iv(this.addr, e), yt(t, e);
  }
}
function Ku(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (St(t, e)) return;
    r.uniform4iv(this.addr, e), yt(t, e);
  }
}
function Zu(r, e) {
  const t = this.cache;
  t[0] !== e && (r.uniform1ui(this.addr, e), t[0] = e);
}
function $u(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (r.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (St(t, e)) return;
    r.uniform2uiv(this.addr, e), yt(t, e);
  }
}
function Ju(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (St(t, e)) return;
    r.uniform3uiv(this.addr, e), yt(t, e);
  }
}
function Qu(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (St(t, e)) return;
    r.uniform4uiv(this.addr, e), yt(t, e);
  }
}
function ju(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i);
  let s;
  this.type === r.SAMPLER_2D_SHADOW ? (cr.compareFunction = t.isReversedDepthBuffer() ? 518 : 515, s = cr) : s = po, t.setTexture2D(e || s, i);
}
function ed(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture3D(e || go, i);
}
function td(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTextureCube(e || _o, i);
}
function nd(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture2DArray(e || mo, i);
}
function id(r) {
  switch (r) {
    case 5126:
      return Ou;
    case 35664:
      return zu;
    case 35665:
      return Gu;
    case 35666:
      return Vu;
    case 35674:
      return Hu;
    case 35675:
      return ku;
    case 35676:
      return Wu;
    case 5124:
    case 35670:
      return Xu;
    case 35667:
    case 35671:
      return qu;
    case 35668:
    case 35672:
      return Yu;
    case 35669:
    case 35673:
      return Ku;
    case 5125:
      return Zu;
    case 36294:
      return $u;
    case 36295:
      return Ju;
    case 36296:
      return Qu;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return ju;
    case 35679:
    case 36299:
    case 36307:
      return ed;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return td;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return nd;
  }
}
function sd(r, e) {
  r.uniform1fv(this.addr, e);
}
function rd(r, e) {
  const t = _i(e, this.size, 2);
  r.uniform2fv(this.addr, t);
}
function ad(r, e) {
  const t = _i(e, this.size, 3);
  r.uniform3fv(this.addr, t);
}
function od(r, e) {
  const t = _i(e, this.size, 4);
  r.uniform4fv(this.addr, t);
}
function ld(r, e) {
  const t = _i(e, this.size, 4);
  r.uniformMatrix2fv(this.addr, !1, t);
}
function cd(r, e) {
  const t = _i(e, this.size, 9);
  r.uniformMatrix3fv(this.addr, !1, t);
}
function hd(r, e) {
  const t = _i(e, this.size, 16);
  r.uniformMatrix4fv(this.addr, !1, t);
}
function ud(r, e) {
  r.uniform1iv(this.addr, e);
}
function dd(r, e) {
  r.uniform2iv(this.addr, e);
}
function fd(r, e) {
  r.uniform3iv(this.addr, e);
}
function pd(r, e) {
  r.uniform4iv(this.addr, e);
}
function md(r, e) {
  r.uniform1uiv(this.addr, e);
}
function gd(r, e) {
  r.uniform2uiv(this.addr, e);
}
function _d(r, e) {
  r.uniform3uiv(this.addr, e);
}
function vd(r, e) {
  r.uniform4uiv(this.addr, e);
}
function xd(r, e, t) {
  const n = this.cache, i = e.length, s = Ms(t, i);
  St(n, s) || (r.uniform1iv(this.addr, s), yt(n, s));
  let a;
  this.type === r.SAMPLER_2D_SHADOW ? a = cr : a = po;
  for (let o = 0; o !== i; ++o)
    t.setTexture2D(e[o] || a, s[o]);
}
function Md(r, e, t) {
  const n = this.cache, i = e.length, s = Ms(t, i);
  St(n, s) || (r.uniform1iv(this.addr, s), yt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTexture3D(e[a] || go, s[a]);
}
function Sd(r, e, t) {
  const n = this.cache, i = e.length, s = Ms(t, i);
  St(n, s) || (r.uniform1iv(this.addr, s), yt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTextureCube(e[a] || _o, s[a]);
}
function yd(r, e, t) {
  const n = this.cache, i = e.length, s = Ms(t, i);
  St(n, s) || (r.uniform1iv(this.addr, s), yt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTexture2DArray(e[a] || mo, s[a]);
}
function Ed(r) {
  switch (r) {
    case 5126:
      return sd;
    case 35664:
      return rd;
    case 35665:
      return ad;
    case 35666:
      return od;
    case 35674:
      return ld;
    case 35675:
      return cd;
    case 35676:
      return hd;
    case 5124:
    case 35670:
      return ud;
    case 35667:
    case 35671:
      return dd;
    case 35668:
    case 35672:
      return fd;
    case 35669:
    case 35673:
      return pd;
    case 5125:
      return md;
    case 36294:
      return gd;
    case 36295:
      return _d;
    case 36296:
      return vd;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return xd;
    case 35679:
    case 36299:
    case 36307:
      return Md;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Sd;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return yd;
  }
}
class Td {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = id(t.type);
  }
}
class bd {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Ed(t.type);
  }
}
class Ad {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const i = this.seq;
    for (let s = 0, a = i.length; s !== a; ++s) {
      const o = i[s];
      o.setValue(e, t[o.id], n);
    }
  }
}
const er = /(\w+)(\])?(\[|\.)?/g;
function Sa(r, e) {
  r.seq.push(e), r.map[e.id] = e;
}
function wd(r, e, t) {
  const n = r.name, i = n.length;
  for (er.lastIndex = 0; ; ) {
    const s = er.exec(n), a = er.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === i) {
      Sa(t, c === void 0 ? new Td(o, r, e) : new bd(o, r, e));
      break;
    } else {
      let d = t.map[o];
      d === void 0 && (d = new Ad(o), Sa(t, d)), t = d;
    }
  }
}
class us {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let a = 0; a < n; ++a) {
      const o = e.getActiveUniform(t, a), l = e.getUniformLocation(t, o.name);
      wd(o, l, this);
    }
    const i = [], s = [];
    for (const a of this.seq)
      a.type === e.SAMPLER_2D_SHADOW || a.type === e.SAMPLER_CUBE_SHADOW || a.type === e.SAMPLER_2D_ARRAY_SHADOW ? i.push(a) : s.push(a);
    i.length > 0 && (this.seq = i.concat(s));
  }
  setValue(e, t, n, i) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, i);
  }
  setOptional(e, t, n) {
    const i = t[n];
    i !== void 0 && this.setValue(e, n, i);
  }
  static upload(e, t, n, i) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(e, l.value, i);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let i = 0, s = e.length; i !== s; ++i) {
      const a = e[i];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function ya(r, e, t) {
  const n = r.createShader(e);
  return r.shaderSource(n, t), r.compileShader(n), n;
}
const Rd = 37297;
let Cd = 0;
function Pd(r, e) {
  const t = r.split(`
`), n = [], i = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = i; a < s; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
const Ea = /* @__PURE__ */ new Le();
function Fd(r) {
  He._getMatrix(Ea, He.workingColorSpace, r);
  const e = `mat3( ${Ea.elements.map((t) => t.toFixed(4))} )`;
  switch (He.getTransfer(r)) {
    case ps:
      return [e, "LinearTransferOETF"];
    case Je:
      return [e, "sRGBTransferOETF"];
    default:
      return Pe("WebGLProgram: Unsupported color space: ", r), [e, "LinearTransferOETF"];
  }
}
function Ta(r, e, t) {
  const n = r.getShaderParameter(e, r.COMPILE_STATUS), s = (r.getShaderInfoLog(e) || "").trim();
  if (n && s === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(s);
  if (a) {
    const o = parseInt(a[1]);
    return t.toUpperCase() + `

` + s + `

` + Pd(r.getShaderSource(e), o);
  } else
    return s;
}
function Ld(r, e) {
  const t = Fd(e);
  return [
    `vec4 ${r}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
const Id = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function Dd(r, e) {
  const t = Id[e];
  return t === void 0 ? (Pe("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + r + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + r + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const rs = /* @__PURE__ */ new H();
function Nd() {
  He.getLuminanceCoefficients(rs);
  const r = rs.x.toFixed(4), e = rs.y.toFixed(4), t = rs.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Ud(r) {
  return [
    r.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    r.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Ci).join(`
`);
}
function Bd(r) {
  const e = [];
  for (const t in r) {
    const n = r[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function Od(r, e) {
  const t = {}, n = r.getProgramParameter(e, r.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < n; i++) {
    const s = r.getActiveAttrib(e, i), a = s.name;
    let o = 1;
    s.type === r.FLOAT_MAT2 && (o = 2), s.type === r.FLOAT_MAT3 && (o = 3), s.type === r.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: r.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function Ci(r) {
  return r !== "";
}
function ba(r, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return r.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Aa(r, e) {
  return r.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const zd = /^[ \t]*#include +<([\w\d./]+)>/gm;
function hr(r) {
  return r.replace(zd, Vd);
}
const Gd = /* @__PURE__ */ new Map();
function Vd(r, e) {
  let t = Ue[e];
  if (t === void 0) {
    const n = Gd.get(e);
    if (n !== void 0)
      t = Ue[n], Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("THREE.WebGLProgram: Can not resolve #include <" + e + ">");
  }
  return hr(t);
}
const Hd = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function wa(r) {
  return r.replace(Hd, kd);
}
function kd(r, e, t, n) {
  let i = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    i += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return i;
}
function Ra(r) {
  let e = `precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;
  return r.precision === "highp" ? e += `
#define HIGH_PRECISION` : r.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : r.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
const Wd = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function Xd(r) {
  return Wd[r.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const qd = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function Yd(r) {
  return r.envMap === !1 ? "ENVMAP_TYPE_CUBE" : qd[r.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const Kd = {
  302: "ENVMAP_MODE_REFRACTION"
};
function Zd(r) {
  return r.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : Kd[r.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const $d = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function Jd(r) {
  return r.envMap === !1 ? "ENVMAP_BLENDING_NONE" : $d[r.combine] || "ENVMAP_BLENDING_NONE";
}
function Qd(r) {
  const e = r.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function jd(r, e, t, n) {
  const i = r.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const l = Xd(t), c = Yd(t), u = Zd(t), d = Jd(t), h = Qd(t), f = Ud(t), g = Bd(s), x = i.createProgram();
  let m, p, M = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Ci).join(`
`), m.length > 0 && (m += `
`), p = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Ci).join(`
`), p.length > 0 && (p += `
`)) : (m = [
    Ra(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + u : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexNormals ? "#define HAS_NORMAL" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Ci).join(`
`), p = [
    Ra(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + u : "",
    t.envMap ? "#define " + d : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? Ue.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? Dd("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Ld("linearToOutputTexel", t.outputColorSpace),
    Nd(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Ci).join(`
`)), a = hr(a), a = ba(a, t), a = Aa(a, t), o = hr(o), o = ba(o, t), o = Aa(o, t), a = wa(a), o = wa(o), t.isRawShaderMaterial !== !0 && (M = `#version 300 es
`, m = [
    f,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, p = [
    "#define varying in",
    t.glslVersion === Br ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Br ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + p);
  const A = M + m + a, S = M + p + o, b = ya(i, i.VERTEX_SHADER, A), T = ya(i, i.FRAGMENT_SHADER, S);
  i.attachShader(x, b), i.attachShader(x, T), t.index0AttributeName !== void 0 ? i.bindAttribLocation(x, 0, t.index0AttributeName) : t.hasPositionAttribute === !0 && i.bindAttribLocation(x, 0, "position"), i.linkProgram(x);
  function C(F) {
    if (r.debug.checkShaderErrors) {
      const L = i.getProgramInfoLog(x) || "", I = i.getShaderInfoLog(b) || "", U = i.getShaderInfoLog(T) || "", D = L.trim(), N = I.trim(), V = U.trim();
      let W = !0, K = !0;
      if (i.getProgramParameter(x, i.LINK_STATUS) === !1)
        if (W = !1, typeof r.debug.onShaderError == "function")
          r.debug.onShaderError(i, x, b, T);
        else {
          const ie = Ta(i, b, "vertex"), se = Ta(i, T, "fragment");
          Xe(
            "WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(x, i.VALIDATE_STATUS) + `

Material Name: ` + F.name + `
Material Type: ` + F.type + `

Program Info Log: ` + D + `
` + ie + `
` + se
          );
        }
      else D !== "" ? Pe("WebGLProgram: Program Info Log:", D) : (N === "" || V === "") && (K = !1);
      K && (F.diagnostics = {
        runnable: W,
        programLog: D,
        vertexShader: {
          log: N,
          prefix: m
        },
        fragmentShader: {
          log: V,
          prefix: p
        }
      });
    }
    i.deleteShader(b), i.deleteShader(T), v = new us(i, x), w = Od(i, x);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && C(this), v;
  };
  let w;
  this.getAttributes = function() {
    return w === void 0 && C(this), w;
  };
  let P = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return P === !1 && (P = i.getProgramParameter(x, Rd)), P;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), i.deleteProgram(x), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Cd++, this.cacheKey = e, this.usedTimes = 1, this.program = x, this.vertexShader = b, this.fragmentShader = T, this;
}
let ef = 0;
class tf {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e, t, n) {
    const i = this._getShaderCacheForMaterial(e);
    return i.has(t) === !1 && (i.add(t), t.usedTimes++), i.has(n) === !1 && (i.add(n), n.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderStage(e) {
    return this._getShaderStage(e.vertexShader);
  }
  getFragmentShaderStage(e) {
    return this._getShaderStage(e.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new nf(e), t.set(e, n)), n;
  }
}
class nf {
  constructor(e) {
    this.id = ef++, this.code = e, this.usedTimes = 0;
  }
}
function sf(r) {
  return r === 1030 || r === 37490 || r === 36285;
}
function rf(r, e, t, n, i, s) {
  const a = new pr(), o = new tf(), l = /* @__PURE__ */ new Set(), c = [], u = /* @__PURE__ */ new Map(), d = n.logarithmicDepthBuffer;
  let h = n.precision;
  const f = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function g(v) {
    return l.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function x(v, w, P, F, L, I) {
    const U = F.fog, D = L.geometry, N = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? F.environment : null, V = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, W = e.get(v.envMap || N, V), K = W && W.mapping === 306 ? W.image.height : null, ie = f[v.type];
    v.precision !== null && (h = n.getMaxPrecision(v.precision), h !== v.precision && Pe("WebGLProgram.getParameters:", v.precision, "not supported, using", h, "instead."));
    const se = D.morphAttributes.position || D.morphAttributes.normal || D.morphAttributes.color, ee = se !== void 0 ? se.length : 0;
    let Oe = 0;
    D.morphAttributes.position !== void 0 && (Oe = 1), D.morphAttributes.normal !== void 0 && (Oe = 2), D.morphAttributes.color !== void 0 && (Oe = 3);
    let je, Ve, J, ae;
    if (ie) {
      const Se = on[ie];
      je = Se.vertexShader, Ve = Se.fragmentShader;
    } else {
      je = v.vertexShader, Ve = v.fragmentShader;
      const Se = o.getVertexShaderStage(v), ct = o.getFragmentShaderStage(v);
      o.update(v, Se, ct), J = Se.id, ae = ct.id;
    }
    const ne = r.getRenderTarget(), Fe = r.state.buffers.depth.getReversed(), Ie = L.isInstancedMesh === !0, Re = L.isBatchedMesh === !0, ut = !!v.map, ze = !!v.matcap, et = !!W, Ke = !!v.aoMap, qe = !!v.lightMap, pt = !!v.bumpMap && v.wireframe === !1, xt = !!v.normalMap, Et = !!v.displacementMap, At = !!v.emissiveMap, lt = !!v.metalnessMap, mt = !!v.roughnessMap, O = v.anisotropy > 0, Dt = v.clearcoat > 0, $e = v.dispersion > 0, R = v.iridescence > 0, _ = v.sheen > 0, G = v.transmission > 0, q = O && !!v.anisotropyMap, Z = Dt && !!v.clearcoatMap, re = Dt && !!v.clearcoatNormalMap, le = Dt && !!v.clearcoatRoughnessMap, $ = R && !!v.iridescenceMap, j = R && !!v.iridescenceThicknessMap, ce = _ && !!v.sheenColorMap, Te = _ && !!v.sheenRoughnessMap, de = !!v.specularMap, he = !!v.specularColorMap, we = !!v.specularIntensityMap, Ce = G && !!v.transmissionMap, De = G && !!v.thicknessMap, B = !!v.gradientMap, oe = !!v.alphaMap, Q = v.alphaTest > 0, ue = !!v.alphaHash, ge = !!v.extensions;
    let te = 0;
    v.toneMapped && (ne === null || ne.isXRRenderTarget === !0) && (te = r.toneMapping);
    const Ee = {
      shaderID: ie,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: je,
      fragmentShader: Ve,
      defines: v.defines,
      customVertexShaderID: J,
      customFragmentShaderID: ae,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: h,
      batching: Re,
      batchingColor: Re && L._colorsTexture !== null,
      instancing: Ie,
      instancingColor: Ie && L.instanceColor !== null,
      instancingMorph: Ie && L.morphTexture !== null,
      outputColorSpace: ne === null ? r.outputColorSpace : ne.isXRRenderTarget === !0 ? ne.texture.colorSpace : He.workingColorSpace,
      alphaToCoverage: !!v.alphaToCoverage,
      map: ut,
      matcap: ze,
      envMap: et,
      envMapMode: et && W.mapping,
      envMapCubeUVHeight: K,
      aoMap: Ke,
      lightMap: qe,
      bumpMap: pt,
      normalMap: xt,
      displacementMap: Et,
      emissiveMap: At,
      normalMapObjectSpace: xt && v.normalMapType === 1,
      normalMapTangentSpace: xt && v.normalMapType === 0,
      packedNormalMap: xt && v.normalMapType === 0 && sf(v.normalMap.format),
      metalnessMap: lt,
      roughnessMap: mt,
      anisotropy: O,
      anisotropyMap: q,
      clearcoat: Dt,
      clearcoatMap: Z,
      clearcoatNormalMap: re,
      clearcoatRoughnessMap: le,
      dispersion: $e,
      iridescence: R,
      iridescenceMap: $,
      iridescenceThicknessMap: j,
      sheen: _,
      sheenColorMap: ce,
      sheenRoughnessMap: Te,
      specularMap: de,
      specularColorMap: he,
      specularIntensityMap: we,
      transmission: G,
      transmissionMap: Ce,
      thicknessMap: De,
      gradientMap: B,
      opaque: v.transparent === !1 && v.blending === 1 && v.alphaToCoverage === !1,
      alphaMap: oe,
      alphaTest: Q,
      alphaHash: ue,
      combine: v.combine,
      //
      mapUv: ut && g(v.map.channel),
      aoMapUv: Ke && g(v.aoMap.channel),
      lightMapUv: qe && g(v.lightMap.channel),
      bumpMapUv: pt && g(v.bumpMap.channel),
      normalMapUv: xt && g(v.normalMap.channel),
      displacementMapUv: Et && g(v.displacementMap.channel),
      emissiveMapUv: At && g(v.emissiveMap.channel),
      metalnessMapUv: lt && g(v.metalnessMap.channel),
      roughnessMapUv: mt && g(v.roughnessMap.channel),
      anisotropyMapUv: q && g(v.anisotropyMap.channel),
      clearcoatMapUv: Z && g(v.clearcoatMap.channel),
      clearcoatNormalMapUv: re && g(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: le && g(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: $ && g(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: j && g(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: ce && g(v.sheenColorMap.channel),
      sheenRoughnessMapUv: Te && g(v.sheenRoughnessMap.channel),
      specularMapUv: de && g(v.specularMap.channel),
      specularColorMapUv: he && g(v.specularColorMap.channel),
      specularIntensityMapUv: we && g(v.specularIntensityMap.channel),
      transmissionMapUv: Ce && g(v.transmissionMap.channel),
      thicknessMapUv: De && g(v.thicknessMap.channel),
      alphaMapUv: oe && g(v.alphaMap.channel),
      //
      vertexTangents: !!D.attributes.tangent && (xt || O),
      vertexNormals: !!D.attributes.normal,
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!D.attributes.color && D.attributes.color.itemSize === 4,
      pointsUvs: L.isPoints === !0 && !!D.attributes.uv && (ut || oe),
      fog: !!U,
      useFog: v.fog === !0,
      fogExp2: !!U && U.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || D.attributes.normal === void 0 && xt === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reversedDepthBuffer: Fe,
      skinning: L.isSkinnedMesh === !0,
      hasPositionAttribute: D.attributes.position !== void 0,
      morphTargets: D.morphAttributes.position !== void 0,
      morphNormals: D.morphAttributes.normal !== void 0,
      morphColors: D.morphAttributes.color !== void 0,
      morphTargetsCount: ee,
      morphTextureStride: Oe,
      numDirLights: w.directional.length,
      numPointLights: w.point.length,
      numSpotLights: w.spot.length,
      numSpotLightMaps: w.spotLightMap.length,
      numRectAreaLights: w.rectArea.length,
      numHemiLights: w.hemi.length,
      numDirLightShadows: w.directionalShadowMap.length,
      numPointLightShadows: w.pointShadowMap.length,
      numSpotLightShadows: w.spotShadowMap.length,
      numSpotLightShadowsWithMaps: w.numSpotLightShadowsWithMaps,
      numLightProbes: w.numLightProbes,
      numLightProbeGrids: I.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: r.shadowMap.enabled && P.length > 0,
      shadowMapType: r.shadowMap.type,
      toneMapping: te,
      decodeVideoTexture: ut && v.map.isVideoTexture === !0 && He.getTransfer(v.map.colorSpace) === Je,
      decodeVideoTextureEmissive: At && v.emissiveMap.isVideoTexture === !0 && He.getTransfer(v.emissiveMap.colorSpace) === Je,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === 2,
      flipSided: v.side === 1,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: ge && v.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (ge && v.extensions.multiDraw === !0 || Re) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return Ee.vertexUv1s = l.has(1), Ee.vertexUv2s = l.has(2), Ee.vertexUv3s = l.has(3), l.clear(), Ee;
  }
  function m(v) {
    const w = [];
    if (v.shaderID ? w.push(v.shaderID) : (w.push(v.customVertexShaderID), w.push(v.customFragmentShaderID)), v.defines !== void 0)
      for (const P in v.defines)
        w.push(P), w.push(v.defines[P]);
    return v.isRawShaderMaterial === !1 && (p(w, v), M(w, v), w.push(r.outputColorSpace)), w.push(v.customProgramCacheKey), w.join();
  }
  function p(v, w) {
    v.push(w.precision), v.push(w.outputColorSpace), v.push(w.envMapMode), v.push(w.envMapCubeUVHeight), v.push(w.mapUv), v.push(w.alphaMapUv), v.push(w.lightMapUv), v.push(w.aoMapUv), v.push(w.bumpMapUv), v.push(w.normalMapUv), v.push(w.displacementMapUv), v.push(w.emissiveMapUv), v.push(w.metalnessMapUv), v.push(w.roughnessMapUv), v.push(w.anisotropyMapUv), v.push(w.clearcoatMapUv), v.push(w.clearcoatNormalMapUv), v.push(w.clearcoatRoughnessMapUv), v.push(w.iridescenceMapUv), v.push(w.iridescenceThicknessMapUv), v.push(w.sheenColorMapUv), v.push(w.sheenRoughnessMapUv), v.push(w.specularMapUv), v.push(w.specularColorMapUv), v.push(w.specularIntensityMapUv), v.push(w.transmissionMapUv), v.push(w.thicknessMapUv), v.push(w.combine), v.push(w.fogExp2), v.push(w.sizeAttenuation), v.push(w.morphTargetsCount), v.push(w.morphAttributeCount), v.push(w.numDirLights), v.push(w.numPointLights), v.push(w.numSpotLights), v.push(w.numSpotLightMaps), v.push(w.numHemiLights), v.push(w.numRectAreaLights), v.push(w.numDirLightShadows), v.push(w.numPointLightShadows), v.push(w.numSpotLightShadows), v.push(w.numSpotLightShadowsWithMaps), v.push(w.numLightProbes), v.push(w.shadowMapType), v.push(w.toneMapping), v.push(w.numClippingPlanes), v.push(w.numClipIntersection), v.push(w.depthPacking);
  }
  function M(v, w) {
    a.disableAll(), w.instancing && a.enable(0), w.instancingColor && a.enable(1), w.instancingMorph && a.enable(2), w.matcap && a.enable(3), w.envMap && a.enable(4), w.normalMapObjectSpace && a.enable(5), w.normalMapTangentSpace && a.enable(6), w.clearcoat && a.enable(7), w.iridescence && a.enable(8), w.alphaTest && a.enable(9), w.vertexColors && a.enable(10), w.vertexAlphas && a.enable(11), w.vertexUv1s && a.enable(12), w.vertexUv2s && a.enable(13), w.vertexUv3s && a.enable(14), w.vertexTangents && a.enable(15), w.anisotropy && a.enable(16), w.alphaHash && a.enable(17), w.batching && a.enable(18), w.dispersion && a.enable(19), w.batchingColor && a.enable(20), w.gradientMap && a.enable(21), w.packedNormalMap && a.enable(22), w.vertexNormals && a.enable(23), v.push(a.mask), a.disableAll(), w.fog && a.enable(0), w.useFog && a.enable(1), w.flatShading && a.enable(2), w.logarithmicDepthBuffer && a.enable(3), w.reversedDepthBuffer && a.enable(4), w.skinning && a.enable(5), w.morphTargets && a.enable(6), w.morphNormals && a.enable(7), w.morphColors && a.enable(8), w.premultipliedAlpha && a.enable(9), w.shadowMapEnabled && a.enable(10), w.doubleSided && a.enable(11), w.flipSided && a.enable(12), w.useDepthPacking && a.enable(13), w.dithering && a.enable(14), w.transmission && a.enable(15), w.sheen && a.enable(16), w.opaque && a.enable(17), w.pointsUvs && a.enable(18), w.decodeVideoTexture && a.enable(19), w.decodeVideoTextureEmissive && a.enable(20), w.alphaToCoverage && a.enable(21), w.numLightProbeGrids > 0 && a.enable(22), w.hasPositionAttribute && a.enable(23), v.push(a.mask);
  }
  function A(v) {
    const w = f[v.type];
    let P;
    if (w) {
      const F = on[w];
      P = bl.clone(F.uniforms);
    } else
      P = v.uniforms;
    return P;
  }
  function S(v, w) {
    let P = u.get(w);
    return P !== void 0 ? ++P.usedTimes : (P = new jd(r, w, v, i), c.push(P), u.set(w, P)), P;
  }
  function b(v) {
    if (--v.usedTimes === 0) {
      const w = c.indexOf(v);
      c[w] = c[c.length - 1], c.pop(), u.delete(v.cacheKey), v.destroy();
    }
  }
  function T(v) {
    o.remove(v);
  }
  function C() {
    o.dispose();
  }
  return {
    getParameters: x,
    getProgramCacheKey: m,
    getUniforms: A,
    acquireProgram: S,
    releaseProgram: b,
    releaseShaderCache: T,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: C
  };
}
function af() {
  let r = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return r.has(a);
  }
  function t(a) {
    let o = r.get(a);
    return o === void 0 && (o = {}, r.set(a, o)), o;
  }
  function n(a) {
    r.delete(a);
  }
  function i(a, o, l) {
    r.get(a)[o] = l;
  }
  function s() {
    r = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: i,
    dispose: s
  };
}
function of(r, e) {
  return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.material.id !== e.material.id ? r.material.id - e.material.id : r.materialVariant !== e.materialVariant ? r.materialVariant - e.materialVariant : r.z !== e.z ? r.z - e.z : r.id - e.id;
}
function Ca(r, e) {
  return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.z !== e.z ? e.z - r.z : r.id - e.id;
}
function Pa() {
  const r = [];
  let e = 0;
  const t = [], n = [], i = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, i.length = 0;
  }
  function a(h) {
    let f = 0;
    return h.isInstancedMesh && (f += 2), h.isSkinnedMesh && (f += 1), f;
  }
  function o(h, f, g, x, m, p) {
    let M = r[e];
    return M === void 0 ? (M = {
      id: h.id,
      object: h,
      geometry: f,
      material: g,
      materialVariant: a(h),
      groupOrder: x,
      renderOrder: h.renderOrder,
      z: m,
      group: p
    }, r[e] = M) : (M.id = h.id, M.object = h, M.geometry = f, M.material = g, M.materialVariant = a(h), M.groupOrder = x, M.renderOrder = h.renderOrder, M.z = m, M.group = p), e++, M;
  }
  function l(h, f, g, x, m, p) {
    const M = o(h, f, g, x, m, p);
    g.transmission > 0 ? n.push(M) : g.transparent === !0 ? i.push(M) : t.push(M);
  }
  function c(h, f, g, x, m, p) {
    const M = o(h, f, g, x, m, p);
    g.transmission > 0 ? n.unshift(M) : g.transparent === !0 ? i.unshift(M) : t.unshift(M);
  }
  function u(h, f, g) {
    t.length > 1 && t.sort(h || of), n.length > 1 && n.sort(f || Ca), i.length > 1 && i.sort(f || Ca), g && (t.reverse(), n.reverse(), i.reverse());
  }
  function d() {
    for (let h = e, f = r.length; h < f; h++) {
      const g = r[h];
      if (g.id === null) break;
      g.id = null, g.object = null, g.geometry = null, g.material = null, g.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: i,
    init: s,
    push: l,
    unshift: c,
    finish: d,
    sort: u
  };
}
function lf() {
  let r = /* @__PURE__ */ new WeakMap();
  function e(n, i) {
    const s = r.get(n);
    let a;
    return s === void 0 ? (a = new Pa(), r.set(n, [a])) : i >= s.length ? (a = new Pa(), s.push(a)) : a = s[i], a;
  }
  function t() {
    r = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function cf() {
  const r = {};
  return {
    get: function(e) {
      if (r[e.id] !== void 0)
        return r[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new H(),
            color: new ke()
          };
          break;
        case "SpotLight":
          t = {
            position: new H(),
            direction: new H(),
            color: new ke(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new H(),
            color: new ke(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new H(),
            skyColor: new ke(),
            groundColor: new ke()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new ke(),
            position: new H(),
            halfWidth: new H(),
            halfHeight: new H()
          };
          break;
      }
      return r[e.id] = t, t;
    }
  };
}
function hf() {
  const r = {};
  return {
    get: function(e) {
      if (r[e.id] !== void 0)
        return r[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new We()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new We()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new We(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return r[e.id] = t, t;
    }
  };
}
let uf = 0;
function df(r, e) {
  return (e.castShadow ? 2 : 0) - (r.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (r.map ? 1 : 0);
}
function ff(r) {
  const e = new cf(), t = hf(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new H());
  const i = new H(), s = new ot(), a = new ot();
  function o(c) {
    let u = 0, d = 0, h = 0;
    for (let w = 0; w < 9; w++) n.probe[w].set(0, 0, 0);
    let f = 0, g = 0, x = 0, m = 0, p = 0, M = 0, A = 0, S = 0, b = 0, T = 0, C = 0;
    c.sort(df);
    for (let w = 0, P = c.length; w < P; w++) {
      const F = c[w], L = F.color, I = F.intensity, U = F.distance;
      let D = null;
      if (F.shadow && F.shadow.map && (F.shadow.map.texture.format === 1030 ? D = F.shadow.map.texture : D = F.shadow.map.depthTexture || F.shadow.map.texture), F.isAmbientLight)
        u += L.r * I, d += L.g * I, h += L.b * I;
      else if (F.isLightProbe) {
        for (let N = 0; N < 9; N++)
          n.probe[N].addScaledVector(F.sh.coefficients[N], I);
        C++;
      } else if (F.isDirectionalLight) {
        const N = e.get(F);
        if (N.color.copy(F.color).multiplyScalar(F.intensity), F.castShadow) {
          const V = F.shadow, W = t.get(F);
          W.shadowIntensity = V.intensity, W.shadowBias = V.bias, W.shadowNormalBias = V.normalBias, W.shadowRadius = V.radius, W.shadowMapSize = V.mapSize, n.directionalShadow[f] = W, n.directionalShadowMap[f] = D, n.directionalShadowMatrix[f] = F.shadow.matrix, M++;
        }
        n.directional[f] = N, f++;
      } else if (F.isSpotLight) {
        const N = e.get(F);
        N.position.setFromMatrixPosition(F.matrixWorld), N.color.copy(L).multiplyScalar(I), N.distance = U, N.coneCos = Math.cos(F.angle), N.penumbraCos = Math.cos(F.angle * (1 - F.penumbra)), N.decay = F.decay, n.spot[x] = N;
        const V = F.shadow;
        if (F.map && (n.spotLightMap[b] = F.map, b++, V.updateMatrices(F), F.castShadow && T++), n.spotLightMatrix[x] = V.matrix, F.castShadow) {
          const W = t.get(F);
          W.shadowIntensity = V.intensity, W.shadowBias = V.bias, W.shadowNormalBias = V.normalBias, W.shadowRadius = V.radius, W.shadowMapSize = V.mapSize, n.spotShadow[x] = W, n.spotShadowMap[x] = D, S++;
        }
        x++;
      } else if (F.isRectAreaLight) {
        const N = e.get(F);
        N.color.copy(L).multiplyScalar(I), N.halfWidth.set(F.width * 0.5, 0, 0), N.halfHeight.set(0, F.height * 0.5, 0), n.rectArea[m] = N, m++;
      } else if (F.isPointLight) {
        const N = e.get(F);
        if (N.color.copy(F.color).multiplyScalar(F.intensity), N.distance = F.distance, N.decay = F.decay, F.castShadow) {
          const V = F.shadow, W = t.get(F);
          W.shadowIntensity = V.intensity, W.shadowBias = V.bias, W.shadowNormalBias = V.normalBias, W.shadowRadius = V.radius, W.shadowMapSize = V.mapSize, W.shadowCameraNear = V.camera.near, W.shadowCameraFar = V.camera.far, n.pointShadow[g] = W, n.pointShadowMap[g] = D, n.pointShadowMatrix[g] = F.shadow.matrix, A++;
        }
        n.point[g] = N, g++;
      } else if (F.isHemisphereLight) {
        const N = e.get(F);
        N.skyColor.copy(F.color).multiplyScalar(I), N.groundColor.copy(F.groundColor).multiplyScalar(I), n.hemi[p] = N, p++;
      }
    }
    m > 0 && (r.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = fe.LTC_FLOAT_1, n.rectAreaLTC2 = fe.LTC_FLOAT_2) : (n.rectAreaLTC1 = fe.LTC_HALF_1, n.rectAreaLTC2 = fe.LTC_HALF_2)), n.ambient[0] = u, n.ambient[1] = d, n.ambient[2] = h;
    const v = n.hash;
    (v.directionalLength !== f || v.pointLength !== g || v.spotLength !== x || v.rectAreaLength !== m || v.hemiLength !== p || v.numDirectionalShadows !== M || v.numPointShadows !== A || v.numSpotShadows !== S || v.numSpotMaps !== b || v.numLightProbes !== C) && (n.directional.length = f, n.spot.length = x, n.rectArea.length = m, n.point.length = g, n.hemi.length = p, n.directionalShadow.length = M, n.directionalShadowMap.length = M, n.pointShadow.length = A, n.pointShadowMap.length = A, n.spotShadow.length = S, n.spotShadowMap.length = S, n.directionalShadowMatrix.length = M, n.pointShadowMatrix.length = A, n.spotLightMatrix.length = S + b - T, n.spotLightMap.length = b, n.numSpotLightShadowsWithMaps = T, n.numLightProbes = C, v.directionalLength = f, v.pointLength = g, v.spotLength = x, v.rectAreaLength = m, v.hemiLength = p, v.numDirectionalShadows = M, v.numPointShadows = A, v.numSpotShadows = S, v.numSpotMaps = b, v.numLightProbes = C, n.version = uf++);
  }
  function l(c, u) {
    let d = 0, h = 0, f = 0, g = 0, x = 0;
    const m = u.matrixWorldInverse;
    for (let p = 0, M = c.length; p < M; p++) {
      const A = c[p];
      if (A.isDirectionalLight) {
        const S = n.directional[d];
        S.direction.setFromMatrixPosition(A.matrixWorld), i.setFromMatrixPosition(A.target.matrixWorld), S.direction.sub(i), S.direction.transformDirection(m), d++;
      } else if (A.isSpotLight) {
        const S = n.spot[f];
        S.position.setFromMatrixPosition(A.matrixWorld), S.position.applyMatrix4(m), S.direction.setFromMatrixPosition(A.matrixWorld), i.setFromMatrixPosition(A.target.matrixWorld), S.direction.sub(i), S.direction.transformDirection(m), f++;
      } else if (A.isRectAreaLight) {
        const S = n.rectArea[g];
        S.position.setFromMatrixPosition(A.matrixWorld), S.position.applyMatrix4(m), a.identity(), s.copy(A.matrixWorld), s.premultiply(m), a.extractRotation(s), S.halfWidth.set(A.width * 0.5, 0, 0), S.halfHeight.set(0, A.height * 0.5, 0), S.halfWidth.applyMatrix4(a), S.halfHeight.applyMatrix4(a), g++;
      } else if (A.isPointLight) {
        const S = n.point[h];
        S.position.setFromMatrixPosition(A.matrixWorld), S.position.applyMatrix4(m), h++;
      } else if (A.isHemisphereLight) {
        const S = n.hemi[x];
        S.direction.setFromMatrixPosition(A.matrixWorld), S.direction.transformDirection(m), x++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function Fa(r) {
  const e = new ff(r), t = [], n = [], i = [];
  function s(h) {
    d.camera = h, t.length = 0, n.length = 0, i.length = 0;
  }
  function a(h) {
    t.push(h);
  }
  function o(h) {
    n.push(h);
  }
  function l(h) {
    i.push(h);
  }
  function c() {
    e.setup(t);
  }
  function u(h) {
    e.setupView(t, h);
  }
  const d = {
    lightsArray: t,
    shadowsArray: n,
    lightProbeGridArray: i,
    camera: null,
    lights: e,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: s,
    state: d,
    setupLights: c,
    setupLightsView: u,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: l
  };
}
function pf(r) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(i, s = 0) {
    const a = e.get(i);
    let o;
    return a === void 0 ? (o = new Fa(r), e.set(i, [o])) : s >= a.length ? (o = new Fa(r), a.push(o)) : o = a[s], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
const mf = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, gf = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, _f = [
  /* @__PURE__ */ new H(1, 0, 0),
  /* @__PURE__ */ new H(-1, 0, 0),
  /* @__PURE__ */ new H(0, 1, 0),
  /* @__PURE__ */ new H(0, -1, 0),
  /* @__PURE__ */ new H(0, 0, 1),
  /* @__PURE__ */ new H(0, 0, -1)
], vf = [
  /* @__PURE__ */ new H(0, -1, 0),
  /* @__PURE__ */ new H(0, -1, 0),
  /* @__PURE__ */ new H(0, 0, 1),
  /* @__PURE__ */ new H(0, 0, -1),
  /* @__PURE__ */ new H(0, -1, 0),
  /* @__PURE__ */ new H(0, -1, 0)
], La = /* @__PURE__ */ new ot(), Ei = /* @__PURE__ */ new H(), tr = /* @__PURE__ */ new H();
function xf(r, e, t) {
  let n = new _r();
  const i = new We(), s = new We(), a = new at(), o = new Pl(), l = new Fl(), c = {}, u = t.maxTextureSize, d = { 0: 1, 1: 0, 2: 2 }, h = new hn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new We() },
      radius: { value: 4 }
    },
    vertexShader: mf,
    fragmentShader: gf
  }), f = h.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const g = new Wt();
  g.setAttribute(
    "position",
    new cn(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const x = new zt(g, h), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let p = this.type;
  this.render = function(T, C, v) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || T.length === 0) return;
    this.type === 2 && (Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const w = r.getRenderTarget(), P = r.getActiveCubeFace(), F = r.getActiveMipmapLevel(), L = r.state;
    L.setBlending(0), L.buffers.depth.getReversed() === !0 ? L.buffers.color.setClear(0, 0, 0, 0) : L.buffers.color.setClear(1, 1, 1, 1), L.buffers.depth.setTest(!0), L.setScissorTest(!1);
    const I = p !== this.type;
    I && C.traverse(function(U) {
      U.material && (Array.isArray(U.material) ? U.material.forEach((D) => D.needsUpdate = !0) : U.material.needsUpdate = !0);
    });
    for (let U = 0, D = T.length; U < D; U++) {
      const N = T[U], V = N.shadow;
      if (V === void 0) {
        Pe("WebGLShadowMap:", N, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === !1 && V.needsUpdate === !1) continue;
      i.copy(V.mapSize);
      const W = V.getFrameExtents();
      i.multiply(W), s.copy(V.mapSize), (i.x > u || i.y > u) && (i.x > u && (s.x = Math.floor(u / W.x), i.x = s.x * W.x, V.mapSize.x = s.x), i.y > u && (s.y = Math.floor(u / W.y), i.y = s.y * W.y, V.mapSize.y = s.y));
      const K = r.state.buffers.depth.getReversed();
      if (V.camera._reversedDepth = K, V.map === null || I === !0) {
        if (V.map !== null && (V.map.depthTexture !== null && (V.map.depthTexture.dispose(), V.map.depthTexture = null), V.map.dispose()), this.type === 3) {
          if (N.isPointLight) {
            Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          V.map = new ln(i.x, i.y, {
            format: 1030,
            type: 1016,
            minFilter: 1006,
            magFilter: 1006,
            generateMipmaps: !1
          }), V.map.texture.name = N.name + ".shadowMap", V.map.depthTexture = new di(i.x, i.y, 1015), V.map.depthTexture.name = N.name + ".shadowMapDepth", V.map.depthTexture.format = 1026, V.map.depthTexture.compareFunction = null, V.map.depthTexture.minFilter = 1003, V.map.depthTexture.magFilter = 1003;
        } else
          N.isPointLight ? (V.map = new fo(i.x), V.map.depthTexture = new El(i.x, 1014)) : (V.map = new ln(i.x, i.y), V.map.depthTexture = new di(i.x, i.y, 1014)), V.map.depthTexture.name = N.name + ".shadowMap", V.map.depthTexture.format = 1026, this.type === 1 ? (V.map.depthTexture.compareFunction = K ? 518 : 515, V.map.depthTexture.minFilter = 1006, V.map.depthTexture.magFilter = 1006) : (V.map.depthTexture.compareFunction = null, V.map.depthTexture.minFilter = 1003, V.map.depthTexture.magFilter = 1003);
        V.camera.updateProjectionMatrix();
      }
      const ie = V.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let se = 0; se < ie; se++) {
        if (V.map.isWebGLCubeRenderTarget)
          r.setRenderTarget(V.map, se), r.clear();
        else {
          se === 0 && (r.setRenderTarget(V.map), r.clear());
          const ee = V.getViewport(se);
          a.set(
            s.x * ee.x,
            s.y * ee.y,
            s.x * ee.z,
            s.y * ee.w
          ), L.viewport(a);
        }
        if (N.isPointLight) {
          const ee = V.camera, Oe = V.matrix, je = N.distance || ee.far;
          je !== ee.far && (ee.far = je, ee.updateProjectionMatrix()), Ei.setFromMatrixPosition(N.matrixWorld), ee.position.copy(Ei), tr.copy(ee.position), tr.add(_f[se]), ee.up.copy(vf[se]), ee.lookAt(tr), ee.updateMatrixWorld(), Oe.makeTranslation(-Ei.x, -Ei.y, -Ei.z), La.multiplyMatrices(ee.projectionMatrix, ee.matrixWorldInverse), V._frustum.setFromProjectionMatrix(La, ee.coordinateSystem, ee.reversedDepth);
        } else
          V.updateMatrices(N);
        n = V.getFrustum(), S(C, v, V.camera, N, this.type);
      }
      V.isPointLightShadow !== !0 && this.type === 3 && M(V, v), V.needsUpdate = !1;
    }
    p = this.type, m.needsUpdate = !1, r.setRenderTarget(w, P, F);
  };
  function M(T, C) {
    const v = e.update(x);
    h.defines.VSM_SAMPLES !== T.blurSamples && (h.defines.VSM_SAMPLES = T.blurSamples, f.defines.VSM_SAMPLES = T.blurSamples, h.needsUpdate = !0, f.needsUpdate = !0), T.mapPass === null && (T.mapPass = new ln(i.x, i.y, {
      format: 1030,
      type: 1016
    })), h.uniforms.shadow_pass.value = T.map.depthTexture, h.uniforms.resolution.value = T.mapSize, h.uniforms.radius.value = T.radius, r.setRenderTarget(T.mapPass), r.clear(), r.renderBufferDirect(C, null, v, h, x, null), f.uniforms.shadow_pass.value = T.mapPass.texture, f.uniforms.resolution.value = T.mapSize, f.uniforms.radius.value = T.radius, r.setRenderTarget(T.map), r.clear(), r.renderBufferDirect(C, null, v, f, x, null);
  }
  function A(T, C, v, w) {
    let P = null;
    const F = v.isPointLight === !0 ? T.customDistanceMaterial : T.customDepthMaterial;
    if (F !== void 0)
      P = F;
    else if (P = v.isPointLight === !0 ? l : o, r.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0 || C.alphaToCoverage === !0) {
      const L = P.uuid, I = C.uuid;
      let U = c[L];
      U === void 0 && (U = {}, c[L] = U);
      let D = U[I];
      D === void 0 && (D = P.clone(), U[I] = D, C.addEventListener("dispose", b)), P = D;
    }
    if (P.visible = C.visible, P.wireframe = C.wireframe, w === 3 ? P.side = C.shadowSide !== null ? C.shadowSide : C.side : P.side = C.shadowSide !== null ? C.shadowSide : d[C.side], P.alphaMap = C.alphaMap, P.alphaTest = C.alphaToCoverage === !0 ? 0.5 : C.alphaTest, P.map = C.map, P.clipShadows = C.clipShadows, P.clippingPlanes = C.clippingPlanes, P.clipIntersection = C.clipIntersection, P.displacementMap = C.displacementMap, P.displacementScale = C.displacementScale, P.displacementBias = C.displacementBias, P.wireframeLinewidth = C.wireframeLinewidth, P.linewidth = C.linewidth, v.isPointLight === !0 && P.isMeshDistanceMaterial === !0) {
      const L = r.properties.get(P);
      L.light = v;
    }
    return P;
  }
  function S(T, C, v, w, P) {
    if (T.visible === !1) return;
    if (T.layers.test(C.layers) && (T.isMesh || T.isLine || T.isPoints) && (T.castShadow || T.receiveShadow && P === 3) && (!T.frustumCulled || n.intersectsObject(T))) {
      T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, T.matrixWorld);
      const I = e.update(T), U = T.material;
      if (Array.isArray(U)) {
        const D = I.groups;
        for (let N = 0, V = D.length; N < V; N++) {
          const W = D[N], K = U[W.materialIndex];
          if (K && K.visible) {
            const ie = A(T, K, w, P);
            T.onBeforeShadow(r, T, C, v, I, ie, W), r.renderBufferDirect(v, null, I, ie, T, W), T.onAfterShadow(r, T, C, v, I, ie, W);
          }
        }
      } else if (U.visible) {
        const D = A(T, U, w, P);
        T.onBeforeShadow(r, T, C, v, I, D, null), r.renderBufferDirect(v, null, I, D, T, null), T.onAfterShadow(r, T, C, v, I, D, null);
      }
    }
    const L = T.children;
    for (let I = 0, U = L.length; I < U; I++)
      S(L[I], C, v, w, P);
  }
  function b(T) {
    T.target.removeEventListener("dispose", b);
    for (const v in c) {
      const w = c[v], P = T.target.uuid;
      P in w && (w[P].dispose(), delete w[P]);
    }
  }
}
function Mf(r, e) {
  function t() {
    let B = !1;
    const oe = new at();
    let Q = null;
    const ue = new at(0, 0, 0, 0);
    return {
      setMask: function(ge) {
        Q !== ge && !B && (r.colorMask(ge, ge, ge, ge), Q = ge);
      },
      setLocked: function(ge) {
        B = ge;
      },
      setClear: function(ge, te, Ee, Se, ct) {
        ct === !0 && (ge *= Se, te *= Se, Ee *= Se), oe.set(ge, te, Ee, Se), ue.equals(oe) === !1 && (r.clearColor(ge, te, Ee, Se), ue.copy(oe));
      },
      reset: function() {
        B = !1, Q = null, ue.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let B = !1, oe = !1, Q = null, ue = null, ge = null;
    return {
      setReversed: function(te) {
        if (oe !== te) {
          const Ee = e.get("EXT_clip_control");
          te ? Ee.clipControlEXT(Ee.LOWER_LEFT_EXT, Ee.ZERO_TO_ONE_EXT) : Ee.clipControlEXT(Ee.LOWER_LEFT_EXT, Ee.NEGATIVE_ONE_TO_ONE_EXT), oe = te;
          const Se = ge;
          ge = null, this.setClear(Se);
        }
      },
      getReversed: function() {
        return oe;
      },
      setTest: function(te) {
        te ? ne(r.DEPTH_TEST) : Fe(r.DEPTH_TEST);
      },
      setMask: function(te) {
        Q !== te && !B && (r.depthMask(te), Q = te);
      },
      setFunc: function(te) {
        if (oe && (te = Oo[te]), ue !== te) {
          switch (te) {
            case 0:
              r.depthFunc(r.NEVER);
              break;
            case 1:
              r.depthFunc(r.ALWAYS);
              break;
            case 2:
              r.depthFunc(r.LESS);
              break;
            case 3:
              r.depthFunc(r.LEQUAL);
              break;
            case 4:
              r.depthFunc(r.EQUAL);
              break;
            case 5:
              r.depthFunc(r.GEQUAL);
              break;
            case 6:
              r.depthFunc(r.GREATER);
              break;
            case 7:
              r.depthFunc(r.NOTEQUAL);
              break;
            default:
              r.depthFunc(r.LEQUAL);
          }
          ue = te;
        }
      },
      setLocked: function(te) {
        B = te;
      },
      setClear: function(te) {
        ge !== te && (ge = te, oe && (te = 1 - te), r.clearDepth(te));
      },
      reset: function() {
        B = !1, Q = null, ue = null, ge = null, oe = !1;
      }
    };
  }
  function i() {
    let B = !1, oe = null, Q = null, ue = null, ge = null, te = null, Ee = null, Se = null, ct = null;
    return {
      setTest: function(it) {
        B || (it ? ne(r.STENCIL_TEST) : Fe(r.STENCIL_TEST));
      },
      setMask: function(it) {
        oe !== it && !B && (r.stencilMask(it), oe = it);
      },
      setFunc: function(it, Qt, jt) {
        (Q !== it || ue !== Qt || ge !== jt) && (r.stencilFunc(it, Qt, jt), Q = it, ue = Qt, ge = jt);
      },
      setOp: function(it, Qt, jt) {
        (te !== it || Ee !== Qt || Se !== jt) && (r.stencilOp(it, Qt, jt), te = it, Ee = Qt, Se = jt);
      },
      setLocked: function(it) {
        B = it;
      },
      setClear: function(it) {
        ct !== it && (r.clearStencil(it), ct = it);
      },
      reset: function() {
        B = !1, oe = null, Q = null, ue = null, ge = null, te = null, Ee = null, Se = null, ct = null;
      }
    };
  }
  const s = new t(), a = new n(), o = new i(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let u = {}, d = {}, h = {}, f = /* @__PURE__ */ new WeakMap(), g = [], x = null, m = !1, p = null, M = null, A = null, S = null, b = null, T = null, C = null, v = new ke(0, 0, 0), w = 0, P = !1, F = null, L = null, I = null, U = null, D = null;
  const N = r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = !1, W = 0;
  const K = r.getParameter(r.VERSION);
  K.indexOf("WebGL") !== -1 ? (W = parseFloat(/^WebGL (\d)/.exec(K)[1]), V = W >= 1) : K.indexOf("OpenGL ES") !== -1 && (W = parseFloat(/^OpenGL ES (\d)/.exec(K)[1]), V = W >= 2);
  let ie = null, se = {};
  const ee = r.getParameter(r.SCISSOR_BOX), Oe = r.getParameter(r.VIEWPORT), je = new at().fromArray(ee), Ve = new at().fromArray(Oe);
  function J(B, oe, Q, ue) {
    const ge = new Uint8Array(4), te = r.createTexture();
    r.bindTexture(B, te), r.texParameteri(B, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(B, r.TEXTURE_MAG_FILTER, r.NEAREST);
    for (let Ee = 0; Ee < Q; Ee++)
      B === r.TEXTURE_3D || B === r.TEXTURE_2D_ARRAY ? r.texImage3D(oe, 0, r.RGBA, 1, 1, ue, 0, r.RGBA, r.UNSIGNED_BYTE, ge) : r.texImage2D(oe + Ee, 0, r.RGBA, 1, 1, 0, r.RGBA, r.UNSIGNED_BYTE, ge);
    return te;
  }
  const ae = {};
  ae[r.TEXTURE_2D] = J(r.TEXTURE_2D, r.TEXTURE_2D, 1), ae[r.TEXTURE_CUBE_MAP] = J(r.TEXTURE_CUBE_MAP, r.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ae[r.TEXTURE_2D_ARRAY] = J(r.TEXTURE_2D_ARRAY, r.TEXTURE_2D_ARRAY, 1, 1), ae[r.TEXTURE_3D] = J(r.TEXTURE_3D, r.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), ne(r.DEPTH_TEST), a.setFunc(3), pt(!1), xt(1), ne(r.CULL_FACE), Ke(0);
  function ne(B) {
    u[B] !== !0 && (r.enable(B), u[B] = !0);
  }
  function Fe(B) {
    u[B] !== !1 && (r.disable(B), u[B] = !1);
  }
  function Ie(B, oe) {
    return h[B] !== oe ? (r.bindFramebuffer(B, oe), h[B] = oe, B === r.DRAW_FRAMEBUFFER && (h[r.FRAMEBUFFER] = oe), B === r.FRAMEBUFFER && (h[r.DRAW_FRAMEBUFFER] = oe), !0) : !1;
  }
  function Re(B, oe) {
    let Q = g, ue = !1;
    if (B) {
      Q = f.get(oe), Q === void 0 && (Q = [], f.set(oe, Q));
      const ge = B.textures;
      if (Q.length !== ge.length || Q[0] !== r.COLOR_ATTACHMENT0) {
        for (let te = 0, Ee = ge.length; te < Ee; te++)
          Q[te] = r.COLOR_ATTACHMENT0 + te;
        Q.length = ge.length, ue = !0;
      }
    } else
      Q[0] !== r.BACK && (Q[0] = r.BACK, ue = !0);
    ue && r.drawBuffers(Q);
  }
  function ut(B) {
    return x !== B ? (r.useProgram(B), x = B, !0) : !1;
  }
  const ze = {
    100: r.FUNC_ADD,
    101: r.FUNC_SUBTRACT,
    102: r.FUNC_REVERSE_SUBTRACT
  };
  ze[103] = r.MIN, ze[104] = r.MAX;
  const et = {
    200: r.ZERO,
    201: r.ONE,
    202: r.SRC_COLOR,
    204: r.SRC_ALPHA,
    210: r.SRC_ALPHA_SATURATE,
    208: r.DST_COLOR,
    206: r.DST_ALPHA,
    203: r.ONE_MINUS_SRC_COLOR,
    205: r.ONE_MINUS_SRC_ALPHA,
    209: r.ONE_MINUS_DST_COLOR,
    207: r.ONE_MINUS_DST_ALPHA,
    211: r.CONSTANT_COLOR,
    212: r.ONE_MINUS_CONSTANT_COLOR,
    213: r.CONSTANT_ALPHA,
    214: r.ONE_MINUS_CONSTANT_ALPHA
  };
  function Ke(B, oe, Q, ue, ge, te, Ee, Se, ct, it) {
    if (B === 0) {
      m === !0 && (Fe(r.BLEND), m = !1);
      return;
    }
    if (m === !1 && (ne(r.BLEND), m = !0), B !== 5) {
      if (B !== p || it !== P) {
        if ((M !== 100 || b !== 100) && (r.blendEquation(r.FUNC_ADD), M = 100, b = 100), it)
          switch (B) {
            case 1:
              r.blendFuncSeparate(r.ONE, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              r.blendFunc(r.ONE, r.ONE);
              break;
            case 3:
              r.blendFuncSeparate(r.ZERO, r.ONE_MINUS_SRC_COLOR, r.ZERO, r.ONE);
              break;
            case 4:
              r.blendFuncSeparate(r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA, r.ZERO, r.ONE);
              break;
            default:
              Xe("WebGLState: Invalid blending: ", B);
              break;
          }
        else
          switch (B) {
            case 1:
              r.blendFuncSeparate(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              r.blendFuncSeparate(r.SRC_ALPHA, r.ONE, r.ONE, r.ONE);
              break;
            case 3:
              Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case 4:
              Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              Xe("WebGLState: Invalid blending: ", B);
              break;
          }
        A = null, S = null, T = null, C = null, v.set(0, 0, 0), w = 0, p = B, P = it;
      }
      return;
    }
    ge = ge || oe, te = te || Q, Ee = Ee || ue, (oe !== M || ge !== b) && (r.blendEquationSeparate(ze[oe], ze[ge]), M = oe, b = ge), (Q !== A || ue !== S || te !== T || Ee !== C) && (r.blendFuncSeparate(et[Q], et[ue], et[te], et[Ee]), A = Q, S = ue, T = te, C = Ee), (Se.equals(v) === !1 || ct !== w) && (r.blendColor(Se.r, Se.g, Se.b, ct), v.copy(Se), w = ct), p = B, P = !1;
  }
  function qe(B, oe) {
    B.side === 2 ? Fe(r.CULL_FACE) : ne(r.CULL_FACE);
    let Q = B.side === 1;
    oe && (Q = !Q), pt(Q), B.blending === 1 && B.transparent === !1 ? Ke(0) : Ke(B.blending, B.blendEquation, B.blendSrc, B.blendDst, B.blendEquationAlpha, B.blendSrcAlpha, B.blendDstAlpha, B.blendColor, B.blendAlpha, B.premultipliedAlpha), a.setFunc(B.depthFunc), a.setTest(B.depthTest), a.setMask(B.depthWrite), s.setMask(B.colorWrite);
    const ue = B.stencilWrite;
    o.setTest(ue), ue && (o.setMask(B.stencilWriteMask), o.setFunc(B.stencilFunc, B.stencilRef, B.stencilFuncMask), o.setOp(B.stencilFail, B.stencilZFail, B.stencilZPass)), At(B.polygonOffset, B.polygonOffsetFactor, B.polygonOffsetUnits), B.alphaToCoverage === !0 ? ne(r.SAMPLE_ALPHA_TO_COVERAGE) : Fe(r.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function pt(B) {
    F !== B && (B ? r.frontFace(r.CW) : r.frontFace(r.CCW), F = B);
  }
  function xt(B) {
    B !== 0 ? (ne(r.CULL_FACE), B !== L && (B === 1 ? r.cullFace(r.BACK) : B === 2 ? r.cullFace(r.FRONT) : r.cullFace(r.FRONT_AND_BACK))) : Fe(r.CULL_FACE), L = B;
  }
  function Et(B) {
    B !== I && (V && r.lineWidth(B), I = B);
  }
  function At(B, oe, Q) {
    B ? (ne(r.POLYGON_OFFSET_FILL), (U !== oe || D !== Q) && (U = oe, D = Q, a.getReversed() && (oe = -oe), r.polygonOffset(oe, Q))) : Fe(r.POLYGON_OFFSET_FILL);
  }
  function lt(B) {
    B ? ne(r.SCISSOR_TEST) : Fe(r.SCISSOR_TEST);
  }
  function mt(B) {
    B === void 0 && (B = r.TEXTURE0 + N - 1), ie !== B && (r.activeTexture(B), ie = B);
  }
  function O(B, oe, Q) {
    Q === void 0 && (ie === null ? Q = r.TEXTURE0 + N - 1 : Q = ie);
    let ue = se[Q];
    ue === void 0 && (ue = { type: void 0, texture: void 0 }, se[Q] = ue), (ue.type !== B || ue.texture !== oe) && (ie !== Q && (r.activeTexture(Q), ie = Q), r.bindTexture(B, oe || ae[B]), ue.type = B, ue.texture = oe);
  }
  function Dt() {
    const B = se[ie];
    B !== void 0 && B.type !== void 0 && (r.bindTexture(B.type, null), B.type = void 0, B.texture = void 0);
  }
  function $e() {
    try {
      r.compressedTexImage2D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function R() {
    try {
      r.compressedTexImage3D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function _() {
    try {
      r.texSubImage2D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function G() {
    try {
      r.texSubImage3D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function q() {
    try {
      r.compressedTexSubImage2D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function Z() {
    try {
      r.compressedTexSubImage3D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function re() {
    try {
      r.texStorage2D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function le() {
    try {
      r.texStorage3D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function $() {
    try {
      r.texImage2D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function j() {
    try {
      r.texImage3D(...arguments);
    } catch (B) {
      Xe("WebGLState:", B);
    }
  }
  function ce(B) {
    return d[B] !== void 0 ? d[B] : r.getParameter(B);
  }
  function Te(B, oe) {
    d[B] !== oe && (r.pixelStorei(B, oe), d[B] = oe);
  }
  function de(B) {
    je.equals(B) === !1 && (r.scissor(B.x, B.y, B.z, B.w), je.copy(B));
  }
  function he(B) {
    Ve.equals(B) === !1 && (r.viewport(B.x, B.y, B.z, B.w), Ve.copy(B));
  }
  function we(B, oe) {
    let Q = c.get(oe);
    Q === void 0 && (Q = /* @__PURE__ */ new WeakMap(), c.set(oe, Q));
    let ue = Q.get(B);
    ue === void 0 && (ue = r.getUniformBlockIndex(oe, B.name), Q.set(B, ue));
  }
  function Ce(B, oe) {
    const ue = c.get(oe).get(B);
    l.get(oe) !== ue && (r.uniformBlockBinding(oe, ue, B.__bindingPointIndex), l.set(oe, ue));
  }
  function De() {
    r.disable(r.BLEND), r.disable(r.CULL_FACE), r.disable(r.DEPTH_TEST), r.disable(r.POLYGON_OFFSET_FILL), r.disable(r.SCISSOR_TEST), r.disable(r.STENCIL_TEST), r.disable(r.SAMPLE_ALPHA_TO_COVERAGE), r.blendEquation(r.FUNC_ADD), r.blendFunc(r.ONE, r.ZERO), r.blendFuncSeparate(r.ONE, r.ZERO, r.ONE, r.ZERO), r.blendColor(0, 0, 0, 0), r.colorMask(!0, !0, !0, !0), r.clearColor(0, 0, 0, 0), r.depthMask(!0), r.depthFunc(r.LESS), a.setReversed(!1), r.clearDepth(1), r.stencilMask(4294967295), r.stencilFunc(r.ALWAYS, 0, 4294967295), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), r.clearStencil(0), r.cullFace(r.BACK), r.frontFace(r.CCW), r.polygonOffset(0, 0), r.activeTexture(r.TEXTURE0), r.bindFramebuffer(r.FRAMEBUFFER, null), r.bindFramebuffer(r.DRAW_FRAMEBUFFER, null), r.bindFramebuffer(r.READ_FRAMEBUFFER, null), r.useProgram(null), r.lineWidth(1), r.scissor(0, 0, r.canvas.width, r.canvas.height), r.viewport(0, 0, r.canvas.width, r.canvas.height), r.pixelStorei(r.PACK_ALIGNMENT, 4), r.pixelStorei(r.UNPACK_ALIGNMENT, 4), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, r.BROWSER_DEFAULT_WEBGL), r.pixelStorei(r.PACK_ROW_LENGTH, 0), r.pixelStorei(r.PACK_SKIP_PIXELS, 0), r.pixelStorei(r.PACK_SKIP_ROWS, 0), r.pixelStorei(r.UNPACK_ROW_LENGTH, 0), r.pixelStorei(r.UNPACK_IMAGE_HEIGHT, 0), r.pixelStorei(r.UNPACK_SKIP_PIXELS, 0), r.pixelStorei(r.UNPACK_SKIP_ROWS, 0), r.pixelStorei(r.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, ie = null, se = {}, h = {}, f = /* @__PURE__ */ new WeakMap(), g = [], x = null, m = !1, p = null, M = null, A = null, S = null, b = null, T = null, C = null, v = new ke(0, 0, 0), w = 0, P = !1, F = null, L = null, I = null, U = null, D = null, je.set(0, 0, r.canvas.width, r.canvas.height), Ve.set(0, 0, r.canvas.width, r.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: ne,
    disable: Fe,
    bindFramebuffer: Ie,
    drawBuffers: Re,
    useProgram: ut,
    setBlending: Ke,
    setMaterial: qe,
    setFlipSided: pt,
    setCullFace: xt,
    setLineWidth: Et,
    setPolygonOffset: At,
    setScissorTest: lt,
    activeTexture: mt,
    bindTexture: O,
    unbindTexture: Dt,
    compressedTexImage2D: $e,
    compressedTexImage3D: R,
    texImage2D: $,
    texImage3D: j,
    pixelStorei: Te,
    getParameter: ce,
    updateUBOMapping: we,
    uniformBlockBinding: Ce,
    texStorage2D: re,
    texStorage3D: le,
    texSubImage2D: _,
    texSubImage3D: G,
    compressedTexSubImage2D: q,
    compressedTexSubImage3D: Z,
    scissor: de,
    viewport: he,
    reset: De
  };
}
function Sf(r, e, t, n, i, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new We(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set();
  let h;
  const f = /* @__PURE__ */ new WeakMap();
  let g = !1;
  try {
    g = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function x(R, _) {
    return g ? new OffscreenCanvas(R, _) : ms("canvas");
  }
  function m(R, _, G) {
    let q = 1;
    const Z = $e(R);
    if ((Z.width > G || Z.height > G) && (q = G / Math.max(Z.width, Z.height)), q < 1)
      if (typeof HTMLImageElement < "u" && R instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && R instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && R instanceof ImageBitmap || typeof VideoFrame < "u" && R instanceof VideoFrame) {
        const re = Math.floor(q * Z.width), le = Math.floor(q * Z.height);
        h === void 0 && (h = x(re, le));
        const $ = _ ? x(re, le) : h;
        return $.width = re, $.height = le, $.getContext("2d").drawImage(R, 0, 0, re, le), Pe("WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + re + "x" + le + ")."), $;
      } else
        return "data" in R && Pe("WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), R;
    return R;
  }
  function p(R) {
    return R.generateMipmaps;
  }
  function M(R) {
    r.generateMipmap(R);
  }
  function A(R) {
    return R.isWebGLCubeRenderTarget ? r.TEXTURE_CUBE_MAP : R.isWebGL3DRenderTarget ? r.TEXTURE_3D : R.isWebGLArrayRenderTarget || R.isCompressedArrayTexture ? r.TEXTURE_2D_ARRAY : r.TEXTURE_2D;
  }
  function S(R, _, G, q, Z, re = !1) {
    if (R !== null) {
      if (r[R] !== void 0) return r[R];
      Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + R + "'");
    }
    let le;
    q && (le = e.get("EXT_texture_norm16"), le || Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let $ = _;
    if (_ === r.RED && (G === r.FLOAT && ($ = r.R32F), G === r.HALF_FLOAT && ($ = r.R16F), G === r.UNSIGNED_BYTE && ($ = r.R8), G === r.UNSIGNED_SHORT && le && ($ = le.R16_EXT), G === r.SHORT && le && ($ = le.R16_SNORM_EXT)), _ === r.RED_INTEGER && (G === r.UNSIGNED_BYTE && ($ = r.R8UI), G === r.UNSIGNED_SHORT && ($ = r.R16UI), G === r.UNSIGNED_INT && ($ = r.R32UI), G === r.BYTE && ($ = r.R8I), G === r.SHORT && ($ = r.R16I), G === r.INT && ($ = r.R32I)), _ === r.RG && (G === r.FLOAT && ($ = r.RG32F), G === r.HALF_FLOAT && ($ = r.RG16F), G === r.UNSIGNED_BYTE && ($ = r.RG8), G === r.UNSIGNED_SHORT && le && ($ = le.RG16_EXT), G === r.SHORT && le && ($ = le.RG16_SNORM_EXT)), _ === r.RG_INTEGER && (G === r.UNSIGNED_BYTE && ($ = r.RG8UI), G === r.UNSIGNED_SHORT && ($ = r.RG16UI), G === r.UNSIGNED_INT && ($ = r.RG32UI), G === r.BYTE && ($ = r.RG8I), G === r.SHORT && ($ = r.RG16I), G === r.INT && ($ = r.RG32I)), _ === r.RGB_INTEGER && (G === r.UNSIGNED_BYTE && ($ = r.RGB8UI), G === r.UNSIGNED_SHORT && ($ = r.RGB16UI), G === r.UNSIGNED_INT && ($ = r.RGB32UI), G === r.BYTE && ($ = r.RGB8I), G === r.SHORT && ($ = r.RGB16I), G === r.INT && ($ = r.RGB32I)), _ === r.RGBA_INTEGER && (G === r.UNSIGNED_BYTE && ($ = r.RGBA8UI), G === r.UNSIGNED_SHORT && ($ = r.RGBA16UI), G === r.UNSIGNED_INT && ($ = r.RGBA32UI), G === r.BYTE && ($ = r.RGBA8I), G === r.SHORT && ($ = r.RGBA16I), G === r.INT && ($ = r.RGBA32I)), _ === r.RGB && (G === r.UNSIGNED_SHORT && le && ($ = le.RGB16_EXT), G === r.SHORT && le && ($ = le.RGB16_SNORM_EXT), G === r.UNSIGNED_INT_5_9_9_9_REV && ($ = r.RGB9_E5), G === r.UNSIGNED_INT_10F_11F_11F_REV && ($ = r.R11F_G11F_B10F)), _ === r.RGBA) {
      const j = re ? ps : He.getTransfer(Z);
      G === r.FLOAT && ($ = r.RGBA32F), G === r.HALF_FLOAT && ($ = r.RGBA16F), G === r.UNSIGNED_BYTE && ($ = j === Je ? r.SRGB8_ALPHA8 : r.RGBA8), G === r.UNSIGNED_SHORT && le && ($ = le.RGBA16_EXT), G === r.SHORT && le && ($ = le.RGBA16_SNORM_EXT), G === r.UNSIGNED_SHORT_4_4_4_4 && ($ = r.RGBA4), G === r.UNSIGNED_SHORT_5_5_5_1 && ($ = r.RGB5_A1);
    }
    return ($ === r.R16F || $ === r.R32F || $ === r.RG16F || $ === r.RG32F || $ === r.RGBA16F || $ === r.RGBA32F) && e.get("EXT_color_buffer_float"), $;
  }
  function b(R, _) {
    let G;
    return R ? _ === null || _ === 1014 || _ === 1020 ? G = r.DEPTH24_STENCIL8 : _ === 1015 ? G = r.DEPTH32F_STENCIL8 : _ === 1012 && (G = r.DEPTH24_STENCIL8, Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === 1014 || _ === 1020 ? G = r.DEPTH_COMPONENT24 : _ === 1015 ? G = r.DEPTH_COMPONENT32F : _ === 1012 && (G = r.DEPTH_COMPONENT16), G;
  }
  function T(R, _) {
    return p(R) === !0 || R.isFramebufferTexture && R.minFilter !== 1003 && R.minFilter !== 1006 ? Math.log2(Math.max(_.width, _.height)) + 1 : R.mipmaps !== void 0 && R.mipmaps.length > 0 ? R.mipmaps.length : R.isCompressedTexture && Array.isArray(R.image) ? _.mipmaps.length : 1;
  }
  function C(R) {
    const _ = R.target;
    _.removeEventListener("dispose", C), w(_), _.isVideoTexture && u.delete(_), _.isHTMLTexture && d.delete(_);
  }
  function v(R) {
    const _ = R.target;
    _.removeEventListener("dispose", v), F(_);
  }
  function w(R) {
    const _ = n.get(R);
    if (_.__webglInit === void 0) return;
    const G = R.source, q = f.get(G);
    if (q) {
      const Z = q[_.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && P(R), Object.keys(q).length === 0 && f.delete(G);
    }
    n.remove(R);
  }
  function P(R) {
    const _ = n.get(R);
    r.deleteTexture(_.__webglTexture);
    const G = R.source, q = f.get(G);
    delete q[_.__cacheKey], a.memory.textures--;
  }
  function F(R) {
    const _ = n.get(R);
    if (R.depthTexture && (R.depthTexture.dispose(), n.remove(R.depthTexture)), R.isWebGLCubeRenderTarget)
      for (let q = 0; q < 6; q++) {
        if (Array.isArray(_.__webglFramebuffer[q]))
          for (let Z = 0; Z < _.__webglFramebuffer[q].length; Z++) r.deleteFramebuffer(_.__webglFramebuffer[q][Z]);
        else
          r.deleteFramebuffer(_.__webglFramebuffer[q]);
        _.__webglDepthbuffer && r.deleteRenderbuffer(_.__webglDepthbuffer[q]);
      }
    else {
      if (Array.isArray(_.__webglFramebuffer))
        for (let q = 0; q < _.__webglFramebuffer.length; q++) r.deleteFramebuffer(_.__webglFramebuffer[q]);
      else
        r.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && r.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && r.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer)
        for (let q = 0; q < _.__webglColorRenderbuffer.length; q++)
          _.__webglColorRenderbuffer[q] && r.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);
      _.__webglDepthRenderbuffer && r.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const G = R.textures;
    for (let q = 0, Z = G.length; q < Z; q++) {
      const re = n.get(G[q]);
      re.__webglTexture && (r.deleteTexture(re.__webglTexture), a.memory.textures--), n.remove(G[q]);
    }
    n.remove(R);
  }
  let L = 0;
  function I() {
    L = 0;
  }
  function U() {
    return L;
  }
  function D(R) {
    L = R;
  }
  function N() {
    const R = L;
    return R >= i.maxTextures && Pe("WebGLTextures: Trying to use " + R + " texture units while this GPU supports only " + i.maxTextures), L += 1, R;
  }
  function V(R) {
    const _ = [];
    return _.push(R.wrapS), _.push(R.wrapT), _.push(R.wrapR || 0), _.push(R.magFilter), _.push(R.minFilter), _.push(R.anisotropy), _.push(R.internalFormat), _.push(R.format), _.push(R.type), _.push(R.generateMipmaps), _.push(R.premultiplyAlpha), _.push(R.flipY), _.push(R.unpackAlignment), _.push(R.colorSpace), _.join();
  }
  function W(R, _) {
    const G = n.get(R);
    if (R.isVideoTexture && O(R), R.isRenderTargetTexture === !1 && R.isExternalTexture !== !0 && R.version > 0 && G.__version !== R.version) {
      const q = R.image;
      if (q === null)
        Pe("WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === !1)
        Pe("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Fe(G, R, _);
        return;
      }
    } else R.isExternalTexture && (G.__webglTexture = R.sourceTexture ? R.sourceTexture : null);
    t.bindTexture(r.TEXTURE_2D, G.__webglTexture, r.TEXTURE0 + _);
  }
  function K(R, _) {
    const G = n.get(R);
    if (R.isRenderTargetTexture === !1 && R.version > 0 && G.__version !== R.version) {
      Fe(G, R, _);
      return;
    } else R.isExternalTexture && (G.__webglTexture = R.sourceTexture ? R.sourceTexture : null);
    t.bindTexture(r.TEXTURE_2D_ARRAY, G.__webglTexture, r.TEXTURE0 + _);
  }
  function ie(R, _) {
    const G = n.get(R);
    if (R.isRenderTargetTexture === !1 && R.version > 0 && G.__version !== R.version) {
      Fe(G, R, _);
      return;
    }
    t.bindTexture(r.TEXTURE_3D, G.__webglTexture, r.TEXTURE0 + _);
  }
  function se(R, _) {
    const G = n.get(R);
    if (R.isCubeDepthTexture !== !0 && R.version > 0 && G.__version !== R.version) {
      Ie(G, R, _);
      return;
    }
    t.bindTexture(r.TEXTURE_CUBE_MAP, G.__webglTexture, r.TEXTURE0 + _);
  }
  const ee = {
    1e3: r.REPEAT,
    1001: r.CLAMP_TO_EDGE,
    1002: r.MIRRORED_REPEAT
  }, Oe = {
    1003: r.NEAREST,
    1004: r.NEAREST_MIPMAP_NEAREST,
    1005: r.NEAREST_MIPMAP_LINEAR,
    1006: r.LINEAR,
    1007: r.LINEAR_MIPMAP_NEAREST,
    1008: r.LINEAR_MIPMAP_LINEAR
  }, je = {
    512: r.NEVER,
    519: r.ALWAYS,
    513: r.LESS,
    515: r.LEQUAL,
    514: r.EQUAL,
    518: r.GEQUAL,
    516: r.GREATER,
    517: r.NOTEQUAL
  };
  function Ve(R, _) {
    if (_.type === 1015 && e.has("OES_texture_float_linear") === !1 && (_.magFilter === 1006 || _.magFilter === 1007 || _.magFilter === 1005 || _.magFilter === 1008 || _.minFilter === 1006 || _.minFilter === 1007 || _.minFilter === 1005 || _.minFilter === 1008) && Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), r.texParameteri(R, r.TEXTURE_WRAP_S, ee[_.wrapS]), r.texParameteri(R, r.TEXTURE_WRAP_T, ee[_.wrapT]), (R === r.TEXTURE_3D || R === r.TEXTURE_2D_ARRAY) && r.texParameteri(R, r.TEXTURE_WRAP_R, ee[_.wrapR]), r.texParameteri(R, r.TEXTURE_MAG_FILTER, Oe[_.magFilter]), r.texParameteri(R, r.TEXTURE_MIN_FILTER, Oe[_.minFilter]), _.compareFunction && (r.texParameteri(R, r.TEXTURE_COMPARE_MODE, r.COMPARE_REF_TO_TEXTURE), r.texParameteri(R, r.TEXTURE_COMPARE_FUNC, je[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (_.magFilter === 1003 || _.minFilter !== 1005 && _.minFilter !== 1008 || _.type === 1015 && e.has("OES_texture_float_linear") === !1) return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const G = e.get("EXT_texture_filter_anisotropic");
        r.texParameterf(R, G.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, i.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function J(R, _) {
    let G = !1;
    R.__webglInit === void 0 && (R.__webglInit = !0, _.addEventListener("dispose", C));
    const q = _.source;
    let Z = f.get(q);
    Z === void 0 && (Z = {}, f.set(q, Z));
    const re = V(_);
    if (re !== R.__cacheKey) {
      Z[re] === void 0 && (Z[re] = {
        texture: r.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, G = !0), Z[re].usedTimes++;
      const le = Z[R.__cacheKey];
      le !== void 0 && (Z[R.__cacheKey].usedTimes--, le.usedTimes === 0 && P(_)), R.__cacheKey = re, R.__webglTexture = Z[re].texture;
    }
    return G;
  }
  function ae(R, _, G) {
    return Math.floor(Math.floor(R / G) / _);
  }
  function ne(R, _, G, q) {
    const re = R.updateRanges;
    if (re.length === 0)
      t.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, _.width, _.height, G, q, _.data);
    else {
      re.sort((Te, de) => Te.start - de.start);
      let le = 0;
      for (let Te = 1; Te < re.length; Te++) {
        const de = re[le], he = re[Te], we = de.start + de.count, Ce = ae(he.start, _.width, 4), De = ae(de.start, _.width, 4);
        he.start <= we + 1 && Ce === De && ae(he.start + he.count - 1, _.width, 4) === Ce ? de.count = Math.max(
          de.count,
          he.start + he.count - de.start
        ) : (++le, re[le] = he);
      }
      re.length = le + 1;
      const $ = t.getParameter(r.UNPACK_ROW_LENGTH), j = t.getParameter(r.UNPACK_SKIP_PIXELS), ce = t.getParameter(r.UNPACK_SKIP_ROWS);
      t.pixelStorei(r.UNPACK_ROW_LENGTH, _.width);
      for (let Te = 0, de = re.length; Te < de; Te++) {
        const he = re[Te], we = Math.floor(he.start / 4), Ce = Math.ceil(he.count / 4), De = we % _.width, B = Math.floor(we / _.width), oe = Ce, Q = 1;
        t.pixelStorei(r.UNPACK_SKIP_PIXELS, De), t.pixelStorei(r.UNPACK_SKIP_ROWS, B), t.texSubImage2D(r.TEXTURE_2D, 0, De, B, oe, Q, G, q, _.data);
      }
      R.clearUpdateRanges(), t.pixelStorei(r.UNPACK_ROW_LENGTH, $), t.pixelStorei(r.UNPACK_SKIP_PIXELS, j), t.pixelStorei(r.UNPACK_SKIP_ROWS, ce);
    }
  }
  function Fe(R, _, G) {
    let q = r.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (q = r.TEXTURE_2D_ARRAY), _.isData3DTexture && (q = r.TEXTURE_3D);
    const Z = J(R, _), re = _.source;
    t.bindTexture(q, R.__webglTexture, r.TEXTURE0 + G);
    const le = n.get(re);
    if (re.version !== le.__version || Z === !0) {
      if (t.activeTexture(r.TEXTURE0 + G), (typeof ImageBitmap < "u" && _.image instanceof ImageBitmap) === !1) {
        const Q = He.getPrimaries(He.workingColorSpace), ue = _.colorSpace === Ln ? null : He.getPrimaries(_.colorSpace), ge = _.colorSpace === Ln || Q === ue ? r.NONE : r.BROWSER_DEFAULT_WEBGL;
        t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, _.flipY), t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, ge);
      }
      t.pixelStorei(r.UNPACK_ALIGNMENT, _.unpackAlignment);
      let j = m(_.image, !1, i.maxTextureSize);
      j = Dt(_, j);
      const ce = s.convert(_.format, _.colorSpace), Te = s.convert(_.type);
      let de = S(_.internalFormat, ce, Te, _.normalized, _.colorSpace, _.isVideoTexture);
      Ve(q, _);
      let he;
      const we = _.mipmaps, Ce = _.isVideoTexture !== !0, De = le.__version === void 0 || Z === !0, B = re.dataReady, oe = T(_, j);
      if (_.isDepthTexture)
        de = b(_.format === 1027, _.type), De && (Ce ? t.texStorage2D(r.TEXTURE_2D, 1, de, j.width, j.height) : t.texImage2D(r.TEXTURE_2D, 0, de, j.width, j.height, 0, ce, Te, null));
      else if (_.isDataTexture)
        if (we.length > 0) {
          Ce && De && t.texStorage2D(r.TEXTURE_2D, oe, de, we[0].width, we[0].height);
          for (let Q = 0, ue = we.length; Q < ue; Q++)
            he = we[Q], Ce ? B && t.texSubImage2D(r.TEXTURE_2D, Q, 0, 0, he.width, he.height, ce, Te, he.data) : t.texImage2D(r.TEXTURE_2D, Q, de, he.width, he.height, 0, ce, Te, he.data);
          _.generateMipmaps = !1;
        } else
          Ce ? (De && t.texStorage2D(r.TEXTURE_2D, oe, de, j.width, j.height), B && ne(_, j, ce, Te)) : t.texImage2D(r.TEXTURE_2D, 0, de, j.width, j.height, 0, ce, Te, j.data);
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          Ce && De && t.texStorage3D(r.TEXTURE_2D_ARRAY, oe, de, we[0].width, we[0].height, j.depth);
          for (let Q = 0, ue = we.length; Q < ue; Q++)
            if (he = we[Q], _.format !== 1023)
              if (ce !== null)
                if (Ce) {
                  if (B)
                    if (_.layerUpdates.size > 0) {
                      const ge = ca(he.width, he.height, _.format, _.type);
                      for (const te of _.layerUpdates) {
                        const Ee = he.data.subarray(
                          te * ge / he.data.BYTES_PER_ELEMENT,
                          (te + 1) * ge / he.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY, Q, 0, 0, te, he.width, he.height, 1, ce, Ee);
                      }
                      _.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY, Q, 0, 0, 0, he.width, he.height, j.depth, ce, he.data);
                } else
                  t.compressedTexImage3D(r.TEXTURE_2D_ARRAY, Q, de, he.width, he.height, j.depth, 0, he.data, 0, 0);
              else
                Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ce ? B && t.texSubImage3D(r.TEXTURE_2D_ARRAY, Q, 0, 0, 0, he.width, he.height, j.depth, ce, Te, he.data) : t.texImage3D(r.TEXTURE_2D_ARRAY, Q, de, he.width, he.height, j.depth, 0, ce, Te, he.data);
        } else {
          Ce && De && t.texStorage2D(r.TEXTURE_2D, oe, de, we[0].width, we[0].height);
          for (let Q = 0, ue = we.length; Q < ue; Q++)
            he = we[Q], _.format !== 1023 ? ce !== null ? Ce ? B && t.compressedTexSubImage2D(r.TEXTURE_2D, Q, 0, 0, he.width, he.height, ce, he.data) : t.compressedTexImage2D(r.TEXTURE_2D, Q, de, he.width, he.height, 0, he.data) : Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ce ? B && t.texSubImage2D(r.TEXTURE_2D, Q, 0, 0, he.width, he.height, ce, Te, he.data) : t.texImage2D(r.TEXTURE_2D, Q, de, he.width, he.height, 0, ce, Te, he.data);
        }
      else if (_.isDataArrayTexture)
        if (Ce) {
          if (De && t.texStorage3D(r.TEXTURE_2D_ARRAY, oe, de, j.width, j.height, j.depth), B)
            if (_.layerUpdates.size > 0) {
              const Q = ca(j.width, j.height, _.format, _.type);
              for (const ue of _.layerUpdates) {
                const ge = j.data.subarray(
                  ue * Q / j.data.BYTES_PER_ELEMENT,
                  (ue + 1) * Q / j.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(r.TEXTURE_2D_ARRAY, 0, 0, 0, ue, j.width, j.height, 1, ce, Te, ge);
              }
              _.clearLayerUpdates();
            } else
              t.texSubImage3D(r.TEXTURE_2D_ARRAY, 0, 0, 0, 0, j.width, j.height, j.depth, ce, Te, j.data);
        } else
          t.texImage3D(r.TEXTURE_2D_ARRAY, 0, de, j.width, j.height, j.depth, 0, ce, Te, j.data);
      else if (_.isData3DTexture)
        Ce ? (De && t.texStorage3D(r.TEXTURE_3D, oe, de, j.width, j.height, j.depth), B && t.texSubImage3D(r.TEXTURE_3D, 0, 0, 0, 0, j.width, j.height, j.depth, ce, Te, j.data)) : t.texImage3D(r.TEXTURE_3D, 0, de, j.width, j.height, j.depth, 0, ce, Te, j.data);
      else if (_.isFramebufferTexture) {
        if (De)
          if (Ce)
            t.texStorage2D(r.TEXTURE_2D, oe, de, j.width, j.height);
          else {
            let Q = j.width, ue = j.height;
            for (let ge = 0; ge < oe; ge++)
              t.texImage2D(r.TEXTURE_2D, ge, de, Q, ue, 0, ce, Te, null), Q >>= 1, ue >>= 1;
          }
      } else if (_.isHTMLTexture) {
        if ("texElementImage2D" in r) {
          const Q = r.canvas;
          if (Q.hasAttribute("layoutsubtree") || Q.setAttribute("layoutsubtree", "true"), j.parentNode !== Q) {
            Q.appendChild(j), d.add(_), Q.onpaint = (ue) => {
              const ge = ue.changedElements;
              for (const te of d)
                ge.includes(te.image) && (te.needsUpdate = !0);
            }, Q.requestPaint();
            return;
          }
          if (r.texElementImage2D.length === 3)
            r.texElementImage2D(r.TEXTURE_2D, r.RGBA8, j);
          else {
            const ge = r.RGBA, te = r.RGBA, Ee = r.UNSIGNED_BYTE;
            r.texElementImage2D(r.TEXTURE_2D, 0, ge, te, Ee, j);
          }
          r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE);
        }
      } else if (we.length > 0) {
        if (Ce && De) {
          const Q = $e(we[0]);
          t.texStorage2D(r.TEXTURE_2D, oe, de, Q.width, Q.height);
        }
        for (let Q = 0, ue = we.length; Q < ue; Q++)
          he = we[Q], Ce ? B && t.texSubImage2D(r.TEXTURE_2D, Q, 0, 0, ce, Te, he) : t.texImage2D(r.TEXTURE_2D, Q, de, ce, Te, he);
        _.generateMipmaps = !1;
      } else if (Ce) {
        if (De) {
          const Q = $e(j);
          t.texStorage2D(r.TEXTURE_2D, oe, de, Q.width, Q.height);
        }
        B && t.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, ce, Te, j);
      } else
        t.texImage2D(r.TEXTURE_2D, 0, de, ce, Te, j);
      p(_) && M(q), le.__version = re.version, _.onUpdate && _.onUpdate(_);
    }
    R.__version = _.version;
  }
  function Ie(R, _, G) {
    if (_.image.length !== 6) return;
    const q = J(R, _), Z = _.source;
    t.bindTexture(r.TEXTURE_CUBE_MAP, R.__webglTexture, r.TEXTURE0 + G);
    const re = n.get(Z);
    if (Z.version !== re.__version || q === !0) {
      t.activeTexture(r.TEXTURE0 + G);
      const le = He.getPrimaries(He.workingColorSpace), $ = _.colorSpace === Ln ? null : He.getPrimaries(_.colorSpace), j = _.colorSpace === Ln || le === $ ? r.NONE : r.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, _.flipY), t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), t.pixelStorei(r.UNPACK_ALIGNMENT, _.unpackAlignment), t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, j);
      const ce = _.isCompressedTexture || _.image[0].isCompressedTexture, Te = _.image[0] && _.image[0].isDataTexture, de = [];
      for (let te = 0; te < 6; te++)
        !ce && !Te ? de[te] = m(_.image[te], !0, i.maxCubemapSize) : de[te] = Te ? _.image[te].image : _.image[te], de[te] = Dt(_, de[te]);
      const he = de[0], we = s.convert(_.format, _.colorSpace), Ce = s.convert(_.type), De = S(_.internalFormat, we, Ce, _.normalized, _.colorSpace), B = _.isVideoTexture !== !0, oe = re.__version === void 0 || q === !0, Q = Z.dataReady;
      let ue = T(_, he);
      Ve(r.TEXTURE_CUBE_MAP, _);
      let ge;
      if (ce) {
        B && oe && t.texStorage2D(r.TEXTURE_CUBE_MAP, ue, De, he.width, he.height);
        for (let te = 0; te < 6; te++) {
          ge = de[te].mipmaps;
          for (let Ee = 0; Ee < ge.length; Ee++) {
            const Se = ge[Ee];
            _.format !== 1023 ? we !== null ? B ? Q && t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee, 0, 0, Se.width, Se.height, we, Se.data) : t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee, De, Se.width, Se.height, 0, Se.data) : Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : B ? Q && t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee, 0, 0, Se.width, Se.height, we, Ce, Se.data) : t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee, De, Se.width, Se.height, 0, we, Ce, Se.data);
          }
        }
      } else {
        if (ge = _.mipmaps, B && oe) {
          ge.length > 0 && ue++;
          const te = $e(de[0]);
          t.texStorage2D(r.TEXTURE_CUBE_MAP, ue, De, te.width, te.height);
        }
        for (let te = 0; te < 6; te++)
          if (Te) {
            B ? Q && t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, 0, 0, de[te].width, de[te].height, we, Ce, de[te].data) : t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, De, de[te].width, de[te].height, 0, we, Ce, de[te].data);
            for (let Ee = 0; Ee < ge.length; Ee++) {
              const ct = ge[Ee].image[te].image;
              B ? Q && t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee + 1, 0, 0, ct.width, ct.height, we, Ce, ct.data) : t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee + 1, De, ct.width, ct.height, 0, we, Ce, ct.data);
            }
          } else {
            B ? Q && t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, 0, 0, we, Ce, de[te]) : t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, De, we, Ce, de[te]);
            for (let Ee = 0; Ee < ge.length; Ee++) {
              const Se = ge[Ee];
              B ? Q && t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee + 1, 0, 0, we, Ce, Se.image[te]) : t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + te, Ee + 1, De, we, Ce, Se.image[te]);
            }
          }
      }
      p(_) && M(r.TEXTURE_CUBE_MAP), re.__version = Z.version, _.onUpdate && _.onUpdate(_);
    }
    R.__version = _.version;
  }
  function Re(R, _, G, q, Z, re) {
    const le = s.convert(G.format, G.colorSpace), $ = s.convert(G.type), j = S(G.internalFormat, le, $, G.normalized, G.colorSpace), ce = n.get(_), Te = n.get(G);
    if (Te.__renderTarget = _, !ce.__hasExternalTextures) {
      const de = Math.max(1, _.width >> re), he = Math.max(1, _.height >> re);
      Z === r.TEXTURE_3D || Z === r.TEXTURE_2D_ARRAY ? t.texImage3D(Z, re, j, de, he, _.depth, 0, le, $, null) : t.texImage2D(Z, re, j, de, he, 0, le, $, null);
    }
    t.bindFramebuffer(r.FRAMEBUFFER, R), mt(_) ? o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER, q, Z, Te.__webglTexture, 0, lt(_)) : (Z === r.TEXTURE_2D || Z >= r.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= r.TEXTURE_CUBE_MAP_NEGATIVE_Z) && r.framebufferTexture2D(r.FRAMEBUFFER, q, Z, Te.__webglTexture, re), t.bindFramebuffer(r.FRAMEBUFFER, null);
  }
  function ut(R, _, G) {
    if (r.bindRenderbuffer(r.RENDERBUFFER, R), _.depthBuffer) {
      const q = _.depthTexture, Z = q && q.isDepthTexture ? q.type : null, re = b(_.stencilBuffer, Z), le = _.stencilBuffer ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT;
      mt(_) ? o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER, lt(_), re, _.width, _.height) : G ? r.renderbufferStorageMultisample(r.RENDERBUFFER, lt(_), re, _.width, _.height) : r.renderbufferStorage(r.RENDERBUFFER, re, _.width, _.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, le, r.RENDERBUFFER, R);
    } else {
      const q = _.textures;
      for (let Z = 0; Z < q.length; Z++) {
        const re = q[Z], le = s.convert(re.format, re.colorSpace), $ = s.convert(re.type), j = S(re.internalFormat, le, $, re.normalized, re.colorSpace);
        mt(_) ? o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER, lt(_), j, _.width, _.height) : G ? r.renderbufferStorageMultisample(r.RENDERBUFFER, lt(_), j, _.width, _.height) : r.renderbufferStorage(r.RENDERBUFFER, j, _.width, _.height);
      }
    }
    r.bindRenderbuffer(r.RENDERBUFFER, null);
  }
  function ze(R, _, G) {
    const q = _.isWebGLCubeRenderTarget === !0;
    if (t.bindFramebuffer(r.FRAMEBUFFER, R), !(_.depthTexture && _.depthTexture.isDepthTexture))
      throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const Z = n.get(_.depthTexture);
    if (Z.__renderTarget = _, (!Z.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), q) {
      if (Z.__webglInit === void 0 && (Z.__webglInit = !0, _.depthTexture.addEventListener("dispose", C)), Z.__webglTexture === void 0) {
        Z.__webglTexture = r.createTexture(), t.bindTexture(r.TEXTURE_CUBE_MAP, Z.__webglTexture), Ve(r.TEXTURE_CUBE_MAP, _.depthTexture);
        const ce = s.convert(_.depthTexture.format), Te = s.convert(_.depthTexture.type);
        let de;
        _.depthTexture.format === 1026 ? de = r.DEPTH_COMPONENT24 : _.depthTexture.format === 1027 && (de = r.DEPTH24_STENCIL8);
        for (let he = 0; he < 6; he++)
          r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + he, 0, de, _.width, _.height, 0, ce, Te, null);
      }
    } else
      W(_.depthTexture, 0);
    const re = Z.__webglTexture, le = lt(_), $ = q ? r.TEXTURE_CUBE_MAP_POSITIVE_X + G : r.TEXTURE_2D, j = _.depthTexture.format === 1027 ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT;
    if (_.depthTexture.format === 1026)
      mt(_) ? o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER, j, $, re, 0, le) : r.framebufferTexture2D(r.FRAMEBUFFER, j, $, re, 0);
    else if (_.depthTexture.format === 1027)
      mt(_) ? o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER, j, $, re, 0, le) : r.framebufferTexture2D(r.FRAMEBUFFER, j, $, re, 0);
    else
      throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function et(R) {
    const _ = n.get(R), G = R.isWebGLCubeRenderTarget === !0;
    if (_.__boundDepthTexture !== R.depthTexture) {
      const q = R.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), q) {
        const Z = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, q.removeEventListener("dispose", Z);
        };
        q.addEventListener("dispose", Z), _.__depthDisposeCallback = Z;
      }
      _.__boundDepthTexture = q;
    }
    if (R.depthTexture && !_.__autoAllocateDepthBuffer)
      if (G)
        for (let q = 0; q < 6; q++)
          ze(_.__webglFramebuffer[q], R, q);
      else {
        const q = R.texture.mipmaps;
        q && q.length > 0 ? ze(_.__webglFramebuffer[0], R, 0) : ze(_.__webglFramebuffer, R, 0);
      }
    else if (G) {
      _.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++)
        if (t.bindFramebuffer(r.FRAMEBUFFER, _.__webglFramebuffer[q]), _.__webglDepthbuffer[q] === void 0)
          _.__webglDepthbuffer[q] = r.createRenderbuffer(), ut(_.__webglDepthbuffer[q], R, !1);
        else {
          const Z = R.stencilBuffer ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT, re = _.__webglDepthbuffer[q];
          r.bindRenderbuffer(r.RENDERBUFFER, re), r.framebufferRenderbuffer(r.FRAMEBUFFER, Z, r.RENDERBUFFER, re);
        }
    } else {
      const q = R.texture.mipmaps;
      if (q && q.length > 0 ? t.bindFramebuffer(r.FRAMEBUFFER, _.__webglFramebuffer[0]) : t.bindFramebuffer(r.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0)
        _.__webglDepthbuffer = r.createRenderbuffer(), ut(_.__webglDepthbuffer, R, !1);
      else {
        const Z = R.stencilBuffer ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT, re = _.__webglDepthbuffer;
        r.bindRenderbuffer(r.RENDERBUFFER, re), r.framebufferRenderbuffer(r.FRAMEBUFFER, Z, r.RENDERBUFFER, re);
      }
    }
    t.bindFramebuffer(r.FRAMEBUFFER, null);
  }
  function Ke(R, _, G) {
    const q = n.get(R);
    _ !== void 0 && Re(q.__webglFramebuffer, R, R.texture, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, 0), G !== void 0 && et(R);
  }
  function qe(R) {
    const _ = R.texture, G = n.get(R), q = n.get(_);
    R.addEventListener("dispose", v);
    const Z = R.textures, re = R.isWebGLCubeRenderTarget === !0, le = Z.length > 1;
    if (le || (q.__webglTexture === void 0 && (q.__webglTexture = r.createTexture()), q.__version = _.version, a.memory.textures++), re) {
      G.__webglFramebuffer = [];
      for (let $ = 0; $ < 6; $++)
        if (_.mipmaps && _.mipmaps.length > 0) {
          G.__webglFramebuffer[$] = [];
          for (let j = 0; j < _.mipmaps.length; j++)
            G.__webglFramebuffer[$][j] = r.createFramebuffer();
        } else
          G.__webglFramebuffer[$] = r.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        G.__webglFramebuffer = [];
        for (let $ = 0; $ < _.mipmaps.length; $++)
          G.__webglFramebuffer[$] = r.createFramebuffer();
      } else
        G.__webglFramebuffer = r.createFramebuffer();
      if (le)
        for (let $ = 0, j = Z.length; $ < j; $++) {
          const ce = n.get(Z[$]);
          ce.__webglTexture === void 0 && (ce.__webglTexture = r.createTexture(), a.memory.textures++);
        }
      if (R.samples > 0 && mt(R) === !1) {
        G.__webglMultisampledFramebuffer = r.createFramebuffer(), G.__webglColorRenderbuffer = [], t.bindFramebuffer(r.FRAMEBUFFER, G.__webglMultisampledFramebuffer);
        for (let $ = 0; $ < Z.length; $++) {
          const j = Z[$];
          G.__webglColorRenderbuffer[$] = r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, G.__webglColorRenderbuffer[$]);
          const ce = s.convert(j.format, j.colorSpace), Te = s.convert(j.type), de = S(j.internalFormat, ce, Te, j.normalized, j.colorSpace, R.isXRRenderTarget === !0), he = lt(R);
          r.renderbufferStorageMultisample(r.RENDERBUFFER, he, de, R.width, R.height), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + $, r.RENDERBUFFER, G.__webglColorRenderbuffer[$]);
        }
        r.bindRenderbuffer(r.RENDERBUFFER, null), R.depthBuffer && (G.__webglDepthRenderbuffer = r.createRenderbuffer(), ut(G.__webglDepthRenderbuffer, R, !0)), t.bindFramebuffer(r.FRAMEBUFFER, null);
      }
    }
    if (re) {
      t.bindTexture(r.TEXTURE_CUBE_MAP, q.__webglTexture), Ve(r.TEXTURE_CUBE_MAP, _);
      for (let $ = 0; $ < 6; $++)
        if (_.mipmaps && _.mipmaps.length > 0)
          for (let j = 0; j < _.mipmaps.length; j++)
            Re(G.__webglFramebuffer[$][j], R, _, r.COLOR_ATTACHMENT0, r.TEXTURE_CUBE_MAP_POSITIVE_X + $, j);
        else
          Re(G.__webglFramebuffer[$], R, _, r.COLOR_ATTACHMENT0, r.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0);
      p(_) && M(r.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (le) {
      for (let $ = 0, j = Z.length; $ < j; $++) {
        const ce = Z[$], Te = n.get(ce);
        let de = r.TEXTURE_2D;
        (R.isWebGL3DRenderTarget || R.isWebGLArrayRenderTarget) && (de = R.isWebGL3DRenderTarget ? r.TEXTURE_3D : r.TEXTURE_2D_ARRAY), t.bindTexture(de, Te.__webglTexture), Ve(de, ce), Re(G.__webglFramebuffer, R, ce, r.COLOR_ATTACHMENT0 + $, de, 0), p(ce) && M(de);
      }
      t.unbindTexture();
    } else {
      let $ = r.TEXTURE_2D;
      if ((R.isWebGL3DRenderTarget || R.isWebGLArrayRenderTarget) && ($ = R.isWebGL3DRenderTarget ? r.TEXTURE_3D : r.TEXTURE_2D_ARRAY), t.bindTexture($, q.__webglTexture), Ve($, _), _.mipmaps && _.mipmaps.length > 0)
        for (let j = 0; j < _.mipmaps.length; j++)
          Re(G.__webglFramebuffer[j], R, _, r.COLOR_ATTACHMENT0, $, j);
      else
        Re(G.__webglFramebuffer, R, _, r.COLOR_ATTACHMENT0, $, 0);
      p(_) && M($), t.unbindTexture();
    }
    R.depthBuffer && et(R);
  }
  function pt(R) {
    const _ = R.textures;
    for (let G = 0, q = _.length; G < q; G++) {
      const Z = _[G];
      if (p(Z)) {
        const re = A(R), le = n.get(Z).__webglTexture;
        t.bindTexture(re, le), M(re), t.unbindTexture();
      }
    }
  }
  const xt = [], Et = [];
  function At(R) {
    if (R.samples > 0) {
      if (mt(R) === !1) {
        const _ = R.textures, G = R.width, q = R.height;
        let Z = r.COLOR_BUFFER_BIT;
        const re = R.stencilBuffer ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT, le = n.get(R), $ = _.length > 1;
        if ($)
          for (let ce = 0; ce < _.length; ce++)
            t.bindFramebuffer(r.FRAMEBUFFER, le.__webglMultisampledFramebuffer), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + ce, r.RENDERBUFFER, null), t.bindFramebuffer(r.FRAMEBUFFER, le.__webglFramebuffer), r.framebufferTexture2D(r.DRAW_FRAMEBUFFER, r.COLOR_ATTACHMENT0 + ce, r.TEXTURE_2D, null, 0);
        t.bindFramebuffer(r.READ_FRAMEBUFFER, le.__webglMultisampledFramebuffer);
        const j = R.texture.mipmaps;
        j && j.length > 0 ? t.bindFramebuffer(r.DRAW_FRAMEBUFFER, le.__webglFramebuffer[0]) : t.bindFramebuffer(r.DRAW_FRAMEBUFFER, le.__webglFramebuffer);
        for (let ce = 0; ce < _.length; ce++) {
          if (R.resolveDepthBuffer && (R.depthBuffer && (Z |= r.DEPTH_BUFFER_BIT), R.stencilBuffer && R.resolveStencilBuffer && (Z |= r.STENCIL_BUFFER_BIT)), $) {
            r.framebufferRenderbuffer(r.READ_FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, le.__webglColorRenderbuffer[ce]);
            const Te = n.get(_[ce]).__webglTexture;
            r.framebufferTexture2D(r.DRAW_FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, Te, 0);
          }
          r.blitFramebuffer(0, 0, G, q, 0, 0, G, q, Z, r.NEAREST), l === !0 && (xt.length = 0, Et.length = 0, xt.push(r.COLOR_ATTACHMENT0 + ce), R.depthBuffer && R.resolveDepthBuffer === !1 && (xt.push(re), Et.push(re), r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER, Et)), r.invalidateFramebuffer(r.READ_FRAMEBUFFER, xt));
        }
        if (t.bindFramebuffer(r.READ_FRAMEBUFFER, null), t.bindFramebuffer(r.DRAW_FRAMEBUFFER, null), $)
          for (let ce = 0; ce < _.length; ce++) {
            t.bindFramebuffer(r.FRAMEBUFFER, le.__webglMultisampledFramebuffer), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0 + ce, r.RENDERBUFFER, le.__webglColorRenderbuffer[ce]);
            const Te = n.get(_[ce]).__webglTexture;
            t.bindFramebuffer(r.FRAMEBUFFER, le.__webglFramebuffer), r.framebufferTexture2D(r.DRAW_FRAMEBUFFER, r.COLOR_ATTACHMENT0 + ce, r.TEXTURE_2D, Te, 0);
          }
        t.bindFramebuffer(r.DRAW_FRAMEBUFFER, le.__webglMultisampledFramebuffer);
      } else if (R.depthBuffer && R.resolveDepthBuffer === !1 && l) {
        const _ = R.stencilBuffer ? r.DEPTH_STENCIL_ATTACHMENT : r.DEPTH_ATTACHMENT;
        r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function lt(R) {
    return Math.min(i.maxSamples, R.samples);
  }
  function mt(R) {
    const _ = n.get(R);
    return R.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1;
  }
  function O(R) {
    const _ = a.render.frame;
    u.get(R) !== _ && (u.set(R, _), R.update());
  }
  function Dt(R, _) {
    const G = R.colorSpace, q = R.format, Z = R.type;
    return R.isCompressedTexture === !0 || R.isVideoTexture === !0 || G !== fs && G !== Ln && (He.getTransfer(G) === Je ? (q !== 1023 || Z !== 1009) && Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Xe("WebGLTextures: Unsupported texture color space:", G)), _;
  }
  function $e(R) {
    return typeof HTMLImageElement < "u" && R instanceof HTMLImageElement ? (c.width = R.naturalWidth || R.width, c.height = R.naturalHeight || R.height) : typeof VideoFrame < "u" && R instanceof VideoFrame ? (c.width = R.displayWidth, c.height = R.displayHeight) : (c.width = R.width, c.height = R.height), c;
  }
  this.allocateTextureUnit = N, this.resetTextureUnits = I, this.getTextureUnits = U, this.setTextureUnits = D, this.setTexture2D = W, this.setTexture2DArray = K, this.setTexture3D = ie, this.setTextureCube = se, this.rebindTextures = Ke, this.setupRenderTarget = qe, this.updateRenderTargetMipmap = pt, this.updateMultisampleRenderTarget = At, this.setupDepthRenderbuffer = et, this.setupFrameBufferTexture = Re, this.useMultisampledRTT = mt, this.isReversedDepthBuffer = function() {
    return t.buffers.depth.getReversed();
  };
}
function yf(r, e) {
  function t(n, i = Ln) {
    let s;
    const a = He.getTransfer(i);
    if (n === 1009) return r.UNSIGNED_BYTE;
    if (n === 1017) return r.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return r.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return r.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 35899) return r.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === 1010) return r.BYTE;
    if (n === 1011) return r.SHORT;
    if (n === 1012) return r.UNSIGNED_SHORT;
    if (n === 1013) return r.INT;
    if (n === 1014) return r.UNSIGNED_INT;
    if (n === 1015) return r.FLOAT;
    if (n === 1016) return r.HALF_FLOAT;
    if (n === 1021) return r.ALPHA;
    if (n === 1022) return r.RGB;
    if (n === 1023) return r.RGBA;
    if (n === 1026) return r.DEPTH_COMPONENT;
    if (n === 1027) return r.DEPTH_STENCIL;
    if (n === 1028) return r.RED;
    if (n === 1029) return r.RED_INTEGER;
    if (n === 1030) return r.RG;
    if (n === 1031) return r.RG_INTEGER;
    if (n === 1033) return r.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (a === Je)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === Je ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === 37488) return s.COMPRESSED_R11_EAC;
        if (n === 37489) return s.COMPRESSED_SIGNED_R11_EAC;
        if (n === 37490) return s.COMPRESSED_RG11_EAC;
        if (n === 37491) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === Je ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === Je ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36283) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? r.UNSIGNED_INT_24_8 : r[n] !== void 0 ? r[n] : null;
  }
  return { convert: t };
}
const Ef = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Tf = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class bf {
  /**
   * Constructs a new depth sensing module.
   */
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  /**
   * Inits the depth sensing module
   *
   * @param {XRWebGLDepthInformation} depthData - The XR depth data.
   * @param {XRRenderState} renderState - The XR render state.
   */
  init(e, t) {
    if (this.texture === null) {
      const n = new ro(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new hn({
        vertexShader: Ef,
        fragmentShader: Tf,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new zt(new vs(20, 20), n);
    }
    return this.mesh;
  }
  /**
   * Resets the module
   */
  reset() {
    this.texture = null, this.mesh = null;
  }
  /**
   * Returns a texture representing the depth of the user's environment.
   *
   * @return {?ExternalTexture} The depth texture.
   */
  getDepthTexture() {
    return this.texture;
  }
}
class Af extends Wn {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(e, t) {
    super();
    const n = this;
    let i = null, s = 1, a = null, o = "local-floor", l = 1, c = null, u = null, d = null, h = null, f = null, g = null;
    const x = typeof XRWebGLBinding < "u", m = new bf(), p = {}, M = t.getContextAttributes();
    let A = null, S = null;
    const b = [], T = [], C = new We();
    let v = null;
    const w = new Zt();
    w.viewport = new at();
    const P = new Zt();
    P.viewport = new at();
    const F = [w, P], L = new Nl();
    let I = null, U = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(J) {
      let ae = b[J];
      return ae === void 0 && (ae = new Ls(), b[J] = ae), ae.getTargetRaySpace();
    }, this.getControllerGrip = function(J) {
      let ae = b[J];
      return ae === void 0 && (ae = new Ls(), b[J] = ae), ae.getGripSpace();
    }, this.getHand = function(J) {
      let ae = b[J];
      return ae === void 0 && (ae = new Ls(), b[J] = ae), ae.getHandSpace();
    };
    function D(J) {
      const ae = T.indexOf(J.inputSource);
      if (ae === -1)
        return;
      const ne = b[ae];
      ne !== void 0 && (ne.update(J.inputSource, J.frame, c || a), ne.dispatchEvent({ type: J.type, data: J.inputSource }));
    }
    function N() {
      i.removeEventListener("select", D), i.removeEventListener("selectstart", D), i.removeEventListener("selectend", D), i.removeEventListener("squeeze", D), i.removeEventListener("squeezestart", D), i.removeEventListener("squeezeend", D), i.removeEventListener("end", N), i.removeEventListener("inputsourceschange", V);
      for (let J = 0; J < b.length; J++) {
        const ae = T[J];
        ae !== null && (T[J] = null, b[J].disconnect(ae));
      }
      I = null, U = null, m.reset();
      for (const J in p)
        delete p[J];
      e.setRenderTarget(A), f = null, h = null, d = null, i = null, S = null, Ve.stop(), n.isPresenting = !1, e.setPixelRatio(v), e.setSize(C.width, C.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(J) {
      s = J, n.isPresenting === !0 && Pe("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(J) {
      o = J, n.isPresenting === !0 && Pe("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(J) {
      c = J;
    }, this.getBaseLayer = function() {
      return h !== null ? h : f;
    }, this.getBinding = function() {
      return d === null && x && (d = new XRWebGLBinding(i, t)), d;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function(J) {
      if (i = J, i !== null) {
        if (A = e.getRenderTarget(), i.addEventListener("select", D), i.addEventListener("selectstart", D), i.addEventListener("selectend", D), i.addEventListener("squeeze", D), i.addEventListener("squeezestart", D), i.addEventListener("squeezeend", D), i.addEventListener("end", N), i.addEventListener("inputsourceschange", V), M.xrCompatible !== !0 && await t.makeXRCompatible(), v = e.getPixelRatio(), e.getSize(C), x && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let ne = null, Fe = null, Ie = null;
          M.depth && (Ie = M.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ne = M.stencil ? 1027 : 1026, Fe = M.stencil ? 1020 : 1014);
          const Re = {
            colorFormat: t.RGBA8,
            depthFormat: Ie,
            scaleFactor: s
          };
          d = this.getBinding(), h = d.createProjectionLayer(Re), i.updateRenderState({ layers: [h] }), e.setPixelRatio(1), e.setSize(h.textureWidth, h.textureHeight, !1), S = new ln(
            h.textureWidth,
            h.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new di(h.textureWidth, h.textureHeight, Fe, void 0, void 0, void 0, void 0, void 0, void 0, ne),
              stencilBuffer: M.stencil,
              colorSpace: e.outputColorSpace,
              samples: M.antialias ? 4 : 0,
              resolveDepthBuffer: h.ignoreDepthValues === !1,
              resolveStencilBuffer: h.ignoreDepthValues === !1
            }
          );
        } else {
          const ne = {
            antialias: M.antialias,
            alpha: !0,
            depth: M.depth,
            stencil: M.stencil,
            framebufferScaleFactor: s
          };
          f = new XRWebGLLayer(i, t, ne), i.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), S = new ln(
            f.framebufferWidth,
            f.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: M.stencil,
              resolveDepthBuffer: f.ignoreDepthValues === !1,
              resolveStencilBuffer: f.ignoreDepthValues === !1
            }
          );
        }
        S.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await i.requestReferenceSpace(o), Ve.setContext(i), Ve.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (i !== null)
        return i.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function V(J) {
      for (let ae = 0; ae < J.removed.length; ae++) {
        const ne = J.removed[ae], Fe = T.indexOf(ne);
        Fe >= 0 && (T[Fe] = null, b[Fe].disconnect(ne));
      }
      for (let ae = 0; ae < J.added.length; ae++) {
        const ne = J.added[ae];
        let Fe = T.indexOf(ne);
        if (Fe === -1) {
          for (let Re = 0; Re < b.length; Re++)
            if (Re >= T.length) {
              T.push(ne), Fe = Re;
              break;
            } else if (T[Re] === null) {
              T[Re] = ne, Fe = Re;
              break;
            }
          if (Fe === -1) break;
        }
        const Ie = b[Fe];
        Ie && Ie.connect(ne);
      }
    }
    const W = new H(), K = new H();
    function ie(J, ae, ne) {
      W.setFromMatrixPosition(ae.matrixWorld), K.setFromMatrixPosition(ne.matrixWorld);
      const Fe = W.distanceTo(K), Ie = ae.projectionMatrix.elements, Re = ne.projectionMatrix.elements, ut = Ie[14] / (Ie[10] - 1), ze = Ie[14] / (Ie[10] + 1), et = (Ie[9] + 1) / Ie[5], Ke = (Ie[9] - 1) / Ie[5], qe = (Ie[8] - 1) / Ie[0], pt = (Re[8] + 1) / Re[0], xt = ut * qe, Et = ut * pt, At = Fe / (-qe + pt), lt = At * -qe;
      if (ae.matrixWorld.decompose(J.position, J.quaternion, J.scale), J.translateX(lt), J.translateZ(At), J.matrixWorld.compose(J.position, J.quaternion, J.scale), J.matrixWorldInverse.copy(J.matrixWorld).invert(), Ie[10] === -1)
        J.projectionMatrix.copy(ae.projectionMatrix), J.projectionMatrixInverse.copy(ae.projectionMatrixInverse);
      else {
        const mt = ut + At, O = ze + At, Dt = xt - lt, $e = Et + (Fe - lt), R = et * ze / O * mt, _ = Ke * ze / O * mt;
        J.projectionMatrix.makePerspective(Dt, $e, R, _, mt, O), J.projectionMatrixInverse.copy(J.projectionMatrix).invert();
      }
    }
    function se(J, ae) {
      ae === null ? J.matrixWorld.copy(J.matrix) : J.matrixWorld.multiplyMatrices(ae.matrixWorld, J.matrix), J.matrixWorldInverse.copy(J.matrixWorld).invert();
    }
    this.updateCamera = function(J) {
      if (i === null) return;
      let ae = J.near, ne = J.far;
      m.texture !== null && (m.depthNear > 0 && (ae = m.depthNear), m.depthFar > 0 && (ne = m.depthFar)), L.near = P.near = w.near = ae, L.far = P.far = w.far = ne, (I !== L.near || U !== L.far) && (i.updateRenderState({
        depthNear: L.near,
        depthFar: L.far
      }), I = L.near, U = L.far), L.layers.mask = J.layers.mask | 6, w.layers.mask = L.layers.mask & -5, P.layers.mask = L.layers.mask & -3;
      const Fe = J.parent, Ie = L.cameras;
      se(L, Fe);
      for (let Re = 0; Re < Ie.length; Re++)
        se(Ie[Re], Fe);
      Ie.length === 2 ? ie(L, w, P) : L.projectionMatrix.copy(w.projectionMatrix), ee(J, L, Fe);
    };
    function ee(J, ae, ne) {
      ne === null ? J.matrix.copy(ae.matrixWorld) : (J.matrix.copy(ne.matrixWorld), J.matrix.invert(), J.matrix.multiply(ae.matrixWorld)), J.matrix.decompose(J.position, J.quaternion, J.scale), J.updateMatrixWorld(!0), J.projectionMatrix.copy(ae.projectionMatrix), J.projectionMatrixInverse.copy(ae.projectionMatrixInverse), J.isPerspectiveCamera && (J.fov = Di * 2 * Math.atan(1 / J.projectionMatrix.elements[5]), J.zoom = 1);
    }
    this.getCamera = function() {
      return L;
    }, this.getFoveation = function() {
      if (!(h === null && f === null))
        return l;
    }, this.setFoveation = function(J) {
      l = J, h !== null && (h.fixedFoveation = J), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = J);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(L);
    }, this.getCameraTexture = function(J) {
      return p[J];
    };
    let Oe = null;
    function je(J, ae) {
      if (u = ae.getViewerPose(c || a), g = ae, u !== null) {
        const ne = u.views;
        f !== null && (e.setRenderTargetFramebuffer(S, f.framebuffer), e.setRenderTarget(S));
        let Fe = !1;
        ne.length !== L.cameras.length && (L.cameras.length = 0, Fe = !0);
        for (let ze = 0; ze < ne.length; ze++) {
          const et = ne[ze];
          let Ke = null;
          if (f !== null)
            Ke = f.getViewport(et);
          else {
            const pt = d.getViewSubImage(h, et);
            Ke = pt.viewport, ze === 0 && (e.setRenderTargetTextures(
              S,
              pt.colorTexture,
              pt.depthStencilTexture
            ), e.setRenderTarget(S));
          }
          let qe = F[ze];
          qe === void 0 && (qe = new Zt(), qe.layers.enable(ze), qe.viewport = new at(), F[ze] = qe), qe.matrix.fromArray(et.transform.matrix), qe.matrix.decompose(qe.position, qe.quaternion, qe.scale), qe.projectionMatrix.fromArray(et.projectionMatrix), qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(), qe.viewport.set(Ke.x, Ke.y, Ke.width, Ke.height), ze === 0 && (L.matrix.copy(qe.matrix), L.matrix.decompose(L.position, L.quaternion, L.scale)), Fe === !0 && L.cameras.push(qe);
        }
        const Ie = i.enabledFeatures;
        if (Ie && Ie.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && x) {
          d = n.getBinding();
          const ze = d.getDepthInformation(ne[0]);
          ze && ze.isValid && ze.texture && m.init(ze, i.renderState);
        }
        if (Ie && Ie.includes("camera-access") && x) {
          e.state.unbindTexture(), d = n.getBinding();
          for (let ze = 0; ze < ne.length; ze++) {
            const et = ne[ze].camera;
            if (et) {
              let Ke = p[et];
              Ke || (Ke = new ro(), p[et] = Ke);
              const qe = d.getCameraImage(et);
              Ke.sourceTexture = qe;
            }
          }
        }
      }
      for (let ne = 0; ne < b.length; ne++) {
        const Fe = T[ne], Ie = b[ne];
        Fe !== null && Ie !== void 0 && Ie.update(Fe, ae, c || a);
      }
      Oe && Oe(J, ae), ae.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ae }), g = null;
    }
    const Ve = new ho();
    Ve.setAnimationLoop(je), this.setAnimationLoop = function(J) {
      Oe = J;
    }, this.dispose = function() {
    };
  }
}
const wf = /* @__PURE__ */ new ot(), vo = /* @__PURE__ */ new Le();
vo.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Rf(r, e) {
  function t(m, p) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), p.value.copy(m.matrix);
  }
  function n(m, p) {
    p.color.getRGB(m.fogColor.value, oo(r)), p.isFog ? (m.fogNear.value = p.near, m.fogFar.value = p.far) : p.isFogExp2 && (m.fogDensity.value = p.density);
  }
  function i(m, p, M, A, S) {
    p.isNodeMaterial ? p.uniformsNeedUpdate = !1 : p.isMeshBasicMaterial ? s(m, p) : p.isMeshLambertMaterial ? (s(m, p), p.envMap && (m.envMapIntensity.value = p.envMapIntensity)) : p.isMeshToonMaterial ? (s(m, p), d(m, p)) : p.isMeshPhongMaterial ? (s(m, p), u(m, p), p.envMap && (m.envMapIntensity.value = p.envMapIntensity)) : p.isMeshStandardMaterial ? (s(m, p), h(m, p), p.isMeshPhysicalMaterial && f(m, p, S)) : p.isMeshMatcapMaterial ? (s(m, p), g(m, p)) : p.isMeshDepthMaterial ? s(m, p) : p.isMeshDistanceMaterial ? (s(m, p), x(m, p)) : p.isMeshNormalMaterial ? s(m, p) : p.isLineBasicMaterial ? (a(m, p), p.isLineDashedMaterial && o(m, p)) : p.isPointsMaterial ? l(m, p, M, A) : p.isSpriteMaterial ? c(m, p) : p.isShadowMaterial ? (m.color.value.copy(p.color), m.opacity.value = p.opacity) : p.isShaderMaterial && (p.uniformsNeedUpdate = !1);
  }
  function s(m, p) {
    m.opacity.value = p.opacity, p.color && m.diffuse.value.copy(p.color), p.emissive && m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity), p.map && (m.map.value = p.map, t(p.map, m.mapTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, t(p.alphaMap, m.alphaMapTransform)), p.bumpMap && (m.bumpMap.value = p.bumpMap, t(p.bumpMap, m.bumpMapTransform), m.bumpScale.value = p.bumpScale, p.side === 1 && (m.bumpScale.value *= -1)), p.normalMap && (m.normalMap.value = p.normalMap, t(p.normalMap, m.normalMapTransform), m.normalScale.value.copy(p.normalScale), p.side === 1 && m.normalScale.value.negate()), p.displacementMap && (m.displacementMap.value = p.displacementMap, t(p.displacementMap, m.displacementMapTransform), m.displacementScale.value = p.displacementScale, m.displacementBias.value = p.displacementBias), p.emissiveMap && (m.emissiveMap.value = p.emissiveMap, t(p.emissiveMap, m.emissiveMapTransform)), p.specularMap && (m.specularMap.value = p.specularMap, t(p.specularMap, m.specularMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest);
    const M = e.get(p), A = M.envMap, S = M.envMapRotation;
    A && (m.envMap.value = A, m.envMapRotation.value.setFromMatrix4(wf.makeRotationFromEuler(S)).transpose(), A.isCubeTexture && A.isRenderTargetTexture === !1 && m.envMapRotation.value.premultiply(vo), m.reflectivity.value = p.reflectivity, m.ior.value = p.ior, m.refractionRatio.value = p.refractionRatio), p.lightMap && (m.lightMap.value = p.lightMap, m.lightMapIntensity.value = p.lightMapIntensity, t(p.lightMap, m.lightMapTransform)), p.aoMap && (m.aoMap.value = p.aoMap, m.aoMapIntensity.value = p.aoMapIntensity, t(p.aoMap, m.aoMapTransform));
  }
  function a(m, p) {
    m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, p.map && (m.map.value = p.map, t(p.map, m.mapTransform));
  }
  function o(m, p) {
    m.dashSize.value = p.dashSize, m.totalSize.value = p.dashSize + p.gapSize, m.scale.value = p.scale;
  }
  function l(m, p, M, A) {
    m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, m.size.value = p.size * M, m.scale.value = A * 0.5, p.map && (m.map.value = p.map, t(p.map, m.uvTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, t(p.alphaMap, m.alphaMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest);
  }
  function c(m, p) {
    m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, m.rotation.value = p.rotation, p.map && (m.map.value = p.map, t(p.map, m.mapTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, t(p.alphaMap, m.alphaMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest);
  }
  function u(m, p) {
    m.specular.value.copy(p.specular), m.shininess.value = Math.max(p.shininess, 1e-4);
  }
  function d(m, p) {
    p.gradientMap && (m.gradientMap.value = p.gradientMap);
  }
  function h(m, p) {
    m.metalness.value = p.metalness, p.metalnessMap && (m.metalnessMap.value = p.metalnessMap, t(p.metalnessMap, m.metalnessMapTransform)), m.roughness.value = p.roughness, p.roughnessMap && (m.roughnessMap.value = p.roughnessMap, t(p.roughnessMap, m.roughnessMapTransform)), p.envMap && (m.envMapIntensity.value = p.envMapIntensity);
  }
  function f(m, p, M) {
    m.ior.value = p.ior, p.sheen > 0 && (m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen), m.sheenRoughness.value = p.sheenRoughness, p.sheenColorMap && (m.sheenColorMap.value = p.sheenColorMap, t(p.sheenColorMap, m.sheenColorMapTransform)), p.sheenRoughnessMap && (m.sheenRoughnessMap.value = p.sheenRoughnessMap, t(p.sheenRoughnessMap, m.sheenRoughnessMapTransform))), p.clearcoat > 0 && (m.clearcoat.value = p.clearcoat, m.clearcoatRoughness.value = p.clearcoatRoughness, p.clearcoatMap && (m.clearcoatMap.value = p.clearcoatMap, t(p.clearcoatMap, m.clearcoatMapTransform)), p.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap, t(p.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), p.clearcoatNormalMap && (m.clearcoatNormalMap.value = p.clearcoatNormalMap, t(p.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale), p.side === 1 && m.clearcoatNormalScale.value.negate())), p.dispersion > 0 && (m.dispersion.value = p.dispersion), p.iridescence > 0 && (m.iridescence.value = p.iridescence, m.iridescenceIOR.value = p.iridescenceIOR, m.iridescenceThicknessMinimum.value = p.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = p.iridescenceThicknessRange[1], p.iridescenceMap && (m.iridescenceMap.value = p.iridescenceMap, t(p.iridescenceMap, m.iridescenceMapTransform)), p.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = p.iridescenceThicknessMap, t(p.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), p.transmission > 0 && (m.transmission.value = p.transmission, m.transmissionSamplerMap.value = M.texture, m.transmissionSamplerSize.value.set(M.width, M.height), p.transmissionMap && (m.transmissionMap.value = p.transmissionMap, t(p.transmissionMap, m.transmissionMapTransform)), m.thickness.value = p.thickness, p.thicknessMap && (m.thicknessMap.value = p.thicknessMap, t(p.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = p.attenuationDistance, m.attenuationColor.value.copy(p.attenuationColor)), p.anisotropy > 0 && (m.anisotropyVector.value.set(p.anisotropy * Math.cos(p.anisotropyRotation), p.anisotropy * Math.sin(p.anisotropyRotation)), p.anisotropyMap && (m.anisotropyMap.value = p.anisotropyMap, t(p.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = p.specularIntensity, m.specularColor.value.copy(p.specularColor), p.specularColorMap && (m.specularColorMap.value = p.specularColorMap, t(p.specularColorMap, m.specularColorMapTransform)), p.specularIntensityMap && (m.specularIntensityMap.value = p.specularIntensityMap, t(p.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function g(m, p) {
    p.matcap && (m.matcap.value = p.matcap);
  }
  function x(m, p) {
    const M = e.get(p).light;
    m.referencePosition.value.setFromMatrixPosition(M.matrixWorld), m.nearDistance.value = M.shadow.camera.near, m.farDistance.value = M.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: i
  };
}
function Cf(r, e, t, n) {
  let i = {}, s = {}, a = [];
  const o = r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(S, b) {
    const T = b.program;
    n.uniformBlockBinding(S, T);
  }
  function c(S, b) {
    let T = i[S.id];
    T === void 0 && (m(S), T = u(S), i[S.id] = T, S.addEventListener("dispose", M));
    const C = b.program;
    n.updateUBOMapping(S, C);
    const v = e.render.frame;
    s[S.id] !== v && (h(S), s[S.id] = v);
  }
  function u(S) {
    const b = d();
    S.__bindingPointIndex = b;
    const T = r.createBuffer(), C = S.__size, v = S.usage;
    return r.bindBuffer(r.UNIFORM_BUFFER, T), r.bufferData(r.UNIFORM_BUFFER, C, v), r.bindBuffer(r.UNIFORM_BUFFER, null), r.bindBufferBase(r.UNIFORM_BUFFER, b, T), T;
  }
  function d() {
    for (let S = 0; S < o; S++)
      if (a.indexOf(S) === -1)
        return a.push(S), S;
    return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(S) {
    const b = i[S.id], T = S.uniforms, C = S.__cache;
    r.bindBuffer(r.UNIFORM_BUFFER, b);
    for (let v = 0, w = T.length; v < w; v++) {
      const P = T[v];
      if (Array.isArray(P))
        for (let F = 0, L = P.length; F < L; F++)
          f(P[F], v, F, C);
      else
        f(P, v, 0, C);
    }
    r.bindBuffer(r.UNIFORM_BUFFER, null);
  }
  function f(S, b, T, C) {
    if (x(S, b, T, C) === !0) {
      const v = S.__offset, w = S.value;
      if (Array.isArray(w)) {
        let P = 0;
        for (let F = 0; F < w.length; F++) {
          const L = w[F], I = p(L);
          g(L, S.__data, P), typeof L != "number" && typeof L != "boolean" && !L.isMatrix3 && !ArrayBuffer.isView(L) && (P += I.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else
        g(w, S.__data, 0);
      r.bufferSubData(r.UNIFORM_BUFFER, v, S.__data);
    }
  }
  function g(S, b, T) {
    typeof S == "number" || typeof S == "boolean" ? b[0] = S : S.isMatrix3 ? (b[0] = S.elements[0], b[1] = S.elements[1], b[2] = S.elements[2], b[3] = 0, b[4] = S.elements[3], b[5] = S.elements[4], b[6] = S.elements[5], b[7] = 0, b[8] = S.elements[6], b[9] = S.elements[7], b[10] = S.elements[8], b[11] = 0) : ArrayBuffer.isView(S) ? b.set(new S.constructor(S.buffer, S.byteOffset, b.length)) : S.toArray(b, T);
  }
  function x(S, b, T, C) {
    const v = S.value, w = b + "_" + T;
    if (C[w] === void 0)
      return typeof v == "number" || typeof v == "boolean" ? C[w] = v : ArrayBuffer.isView(v) ? C[w] = v.slice() : C[w] = v.clone(), !0;
    {
      const P = C[w];
      if (typeof v == "number" || typeof v == "boolean") {
        if (P !== v)
          return C[w] = v, !0;
      } else {
        if (ArrayBuffer.isView(v))
          return !0;
        if (P.equals(v) === !1)
          return P.copy(v), !0;
      }
    }
    return !1;
  }
  function m(S) {
    const b = S.uniforms;
    let T = 0;
    const C = 16;
    for (let w = 0, P = b.length; w < P; w++) {
      const F = Array.isArray(b[w]) ? b[w] : [b[w]];
      for (let L = 0, I = F.length; L < I; L++) {
        const U = F[L], D = Array.isArray(U.value) ? U.value : [U.value];
        for (let N = 0, V = D.length; N < V; N++) {
          const W = D[N], K = p(W), ie = T % C, se = ie % K.boundary, ee = ie + se;
          T += se, ee !== 0 && C - ee < K.storage && (T += C - ee), U.__data = new Float32Array(K.storage / Float32Array.BYTES_PER_ELEMENT), U.__offset = T, T += K.storage;
        }
      }
    }
    const v = T % C;
    return v > 0 && (T += C - v), S.__size = T, S.__cache = {}, this;
  }
  function p(S) {
    const b = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof S == "number" || typeof S == "boolean" ? (b.boundary = 4, b.storage = 4) : S.isVector2 ? (b.boundary = 8, b.storage = 8) : S.isVector3 || S.isColor ? (b.boundary = 16, b.storage = 12) : S.isVector4 ? (b.boundary = 16, b.storage = 16) : S.isMatrix3 ? (b.boundary = 48, b.storage = 48) : S.isMatrix4 ? (b.boundary = 64, b.storage = 64) : S.isTexture ? Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(S) ? (b.boundary = 16, b.storage = S.byteLength) : Pe("WebGLRenderer: Unsupported uniform value type.", S), b;
  }
  function M(S) {
    const b = S.target;
    b.removeEventListener("dispose", M);
    const T = a.indexOf(b.__bindingPointIndex);
    a.splice(T, 1), r.deleteBuffer(i[b.id]), delete i[b.id], delete s[b.id];
  }
  function A() {
    for (const S in i)
      r.deleteBuffer(i[S]);
    a = [], i = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: A
  };
}
const Pf = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);
let nn = null;
function Ff() {
  return nn === null && (nn = new xl(Pf, 16, 16, 1030, 1016), nn.name = "DFG_LUT", nn.minFilter = 1006, nn.magFilter = 1006, nn.wrapS = 1001, nn.wrapT = 1001, nn.generateMipmaps = !1, nn.needsUpdate = !0), nn;
}
class Eg {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(e = {}) {
    const {
      canvas: t = Uo(),
      context: n = null,
      depth: i = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: u = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reversedDepthBuffer: h = !1,
      outputBufferType: f = 1009
    } = e;
    this.isWebGLRenderer = !0;
    let g;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      g = n.getContextAttributes().alpha;
    } else
      g = a;
    const x = f, m = /* @__PURE__ */ new Set([
      1033,
      1031,
      1029
    ]), p = /* @__PURE__ */ new Set([
      1009,
      1014,
      1012,
      1020,
      1017,
      1018
    ]), M = new Uint32Array(4), A = new Int32Array(4), S = new H();
    let b = null, T = null;
    const C = [], v = [];
    let w = null;
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled.
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const P = this;
    let F = !1, L = null, I = null, U = null, D = null;
    this._outputColorSpace = kt;
    let N = 0, V = 0, W = null, K = -1, ie = null;
    const se = new at(), ee = new at();
    let Oe = null;
    const je = new ke(0);
    let Ve = 0, J = t.width, ae = t.height, ne = 1, Fe = null, Ie = null;
    const Re = new at(0, 0, J, ae), ut = new at(0, 0, J, ae);
    let ze = !1;
    const et = new _r();
    let Ke = !1, qe = !1;
    const pt = new ot(), xt = new H(), Et = new at(), At = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let lt = !1;
    function mt() {
      return W === null ? ne : 1;
    }
    let O = n;
    function Dt(E, z) {
      return t.getContext(E, z);
    }
    try {
      const E = {
        alpha: !0,
        depth: i,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: u,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${ur}`), t.addEventListener("webglcontextlost", ct, !1), t.addEventListener("webglcontextrestored", it, !1), t.addEventListener("webglcontextcreationerror", Qt, !1), O === null) {
        const z = "webgl2";
        if (O = Dt(z, E), O === null)
          throw Dt(z) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (E) {
      throw Xe("WebGLRenderer: " + E.message), E;
    }
    let $e, R, _, G, q, Z, re, le, $, j, ce, Te, de, he, we, Ce, De, B, oe, Q, ue, ge, te;
    function Ee() {
      $e = new Pu(O), $e.init(), ue = new yf(O, $e), R = new yu(O, $e, e, ue), _ = new Mf(O, $e), R.reversedDepthBuffer && h && _.buffers.depth.setReversed(!0), I = O.createFramebuffer(), U = O.createFramebuffer(), D = O.createFramebuffer(), G = new Iu(O), q = new af(), Z = new Sf(O, $e, _, q, R, ue, G), re = new Cu(P), le = new Bl(O), ge = new Mu(O, le), $ = new Fu(O, le, G, ge), j = new Nu(O, $, le, ge, G), B = new Du(O, R, Z), we = new Eu(q), ce = new rf(P, re, $e, R, ge, we), Te = new Rf(P, q), de = new lf(), he = new pf($e), De = new xu(P, re, _, j, g, l), Ce = new xf(P, j, R), te = new Cf(O, G, R, _), oe = new Su(O, $e, G), Q = new Lu(O, $e, G), G.programs = ce.programs, P.capabilities = R, P.extensions = $e, P.properties = q, P.renderLists = de, P.shadowMap = Ce, P.state = _, P.info = G;
    }
    Ee(), x !== 1009 && (w = new Bu(x, t.width, t.height, o, i, s));
    const Se = new Af(P, O);
    this.xr = Se, this.getContext = function() {
      return O;
    }, this.getContextAttributes = function() {
      return O.getContextAttributes();
    }, this.forceContextLoss = function() {
      const E = $e.get("WEBGL_lose_context");
      E && E.loseContext();
    }, this.forceContextRestore = function() {
      const E = $e.get("WEBGL_lose_context");
      E && E.restoreContext();
    }, this.getPixelRatio = function() {
      return ne;
    }, this.setPixelRatio = function(E) {
      E !== void 0 && (ne = E, this.setSize(J, ae, !1));
    }, this.getSize = function(E) {
      return E.set(J, ae);
    }, this.setSize = function(E, z, Y = !0) {
      if (Se.isPresenting) {
        Pe("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      J = E, ae = z, t.width = Math.floor(E * ne), t.height = Math.floor(z * ne), Y === !0 && (t.style.width = E + "px", t.style.height = z + "px"), w !== null && w.setSize(t.width, t.height), this.setViewport(0, 0, E, z);
    }, this.getDrawingBufferSize = function(E) {
      return E.set(J * ne, ae * ne).floor();
    }, this.setDrawingBufferSize = function(E, z, Y) {
      J = E, ae = z, ne = Y, t.width = Math.floor(E * Y), t.height = Math.floor(z * Y), this.setViewport(0, 0, E, z);
    }, this.setEffects = function(E) {
      if (x === 1009) {
        Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (E) {
        for (let z = 0; z < E.length; z++)
          if (E[z].isOutputPass === !0) {
            Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
            break;
          }
      }
      w.setEffects(E || []);
    }, this.getCurrentViewport = function(E) {
      return E.copy(se);
    }, this.getViewport = function(E) {
      return E.copy(Re);
    }, this.setViewport = function(E, z, Y, k) {
      E.isVector4 ? Re.set(E.x, E.y, E.z, E.w) : Re.set(E, z, Y, k), _.viewport(se.copy(Re).multiplyScalar(ne).round());
    }, this.getScissor = function(E) {
      return E.copy(ut);
    }, this.setScissor = function(E, z, Y, k) {
      E.isVector4 ? ut.set(E.x, E.y, E.z, E.w) : ut.set(E, z, Y, k), _.scissor(ee.copy(ut).multiplyScalar(ne).round());
    }, this.getScissorTest = function() {
      return ze;
    }, this.setScissorTest = function(E) {
      _.setScissorTest(ze = E);
    }, this.setOpaqueSort = function(E) {
      Fe = E;
    }, this.setTransparentSort = function(E) {
      Ie = E;
    }, this.getClearColor = function(E) {
      return E.copy(De.getClearColor());
    }, this.setClearColor = function() {
      De.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return De.getClearAlpha();
    }, this.setClearAlpha = function() {
      De.setClearAlpha(...arguments);
    }, this.clear = function(E = !0, z = !0, Y = !0) {
      let k = 0;
      if (E) {
        let X = !1;
        if (W !== null) {
          const me = W.texture.format;
          X = m.has(me);
        }
        if (X) {
          const me = W.texture.type, ve = p.has(me), pe = De.getClearColor(), ye = De.getClearAlpha(), be = pe.r, Ne = pe.g, Be = pe.b;
          ve ? (M[0] = be, M[1] = Ne, M[2] = Be, M[3] = ye, O.clearBufferuiv(O.COLOR, 0, M)) : (A[0] = be, A[1] = Ne, A[2] = Be, A[3] = ye, O.clearBufferiv(O.COLOR, 0, A));
        } else
          k |= O.COLOR_BUFFER_BIT;
      }
      z && (k |= O.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), Y && (k |= O.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), k !== 0 && O.clear(k);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(E) {
      E.setRenderer(this), L = E;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", ct, !1), t.removeEventListener("webglcontextrestored", it, !1), t.removeEventListener("webglcontextcreationerror", Qt, !1), De.dispose(), de.dispose(), he.dispose(), q.dispose(), re.dispose(), j.dispose(), ge.dispose(), te.dispose(), ce.dispose(), Se.dispose(), Se.removeEventListener("sessionstart", Cr), Se.removeEventListener("sessionend", Pr), Nn.stop();
    };
    function ct(E) {
      E.preventDefault(), zr("WebGLRenderer: Context Lost."), F = !0;
    }
    function it() {
      zr("WebGLRenderer: Context Restored."), F = !1;
      const E = G.autoReset, z = Ce.enabled, Y = Ce.autoUpdate, k = Ce.needsUpdate, X = Ce.type;
      Ee(), G.autoReset = E, Ce.enabled = z, Ce.autoUpdate = Y, Ce.needsUpdate = k, Ce.type = X;
    }
    function Qt(E) {
      Xe("WebGLRenderer: A WebGL context could not be created. Reason: ", E.statusMessage);
    }
    function jt(E) {
      const z = E.target;
      z.removeEventListener("dispose", jt), Ro(z);
    }
    function Ro(E) {
      Co(E), q.remove(E);
    }
    function Co(E) {
      const z = q.get(E).programs;
      z !== void 0 && (z.forEach(function(Y) {
        ce.releaseProgram(Y);
      }), E.isShaderMaterial && ce.releaseShaderCache(E));
    }
    this.renderBufferDirect = function(E, z, Y, k, X, me) {
      z === null && (z = At);
      const ve = X.isMesh && X.matrixWorld.determinantAffine() < 0, pe = Lo(E, z, Y, k, X);
      _.setMaterial(k, ve);
      let ye = Y.index, be = 1;
      if (k.wireframe === !0) {
        if (ye = $.getWireframeAttribute(Y), ye === void 0) return;
        be = 2;
      }
      const Ne = Y.drawRange, Be = Y.attributes.position;
      let Ae = Ne.start * be, Qe = (Ne.start + Ne.count) * be;
      me !== null && (Ae = Math.max(Ae, me.start * be), Qe = Math.min(Qe, (me.start + me.count) * be)), ye !== null ? (Ae = Math.max(Ae, 0), Qe = Math.min(Qe, ye.count)) : Be != null && (Ae = Math.max(Ae, 0), Qe = Math.min(Qe, Be.count));
      const dt = Qe - Ae;
      if (dt < 0 || dt === 1 / 0) return;
      ge.setup(X, k, pe, Y, ye);
      let ht, tt = oe;
      if (ye !== null && (ht = le.get(ye), tt = Q, tt.setIndex(ht)), X.isMesh)
        k.wireframe === !0 ? (_.setLineWidth(k.wireframeLinewidth * mt()), tt.setMode(O.LINES)) : tt.setMode(O.TRIANGLES);
      else if (X.isLine) {
        let Rt = k.linewidth;
        Rt === void 0 && (Rt = 1), _.setLineWidth(Rt * mt()), X.isLineSegments ? tt.setMode(O.LINES) : X.isLineLoop ? tt.setMode(O.LINE_LOOP) : tt.setMode(O.LINE_STRIP);
      } else X.isPoints ? tt.setMode(O.POINTS) : X.isSprite && tt.setMode(O.TRIANGLES);
      if (X.isBatchedMesh)
        if ($e.get("WEBGL_multi_draw"))
          tt.renderMultiDraw(X._multiDrawStarts, X._multiDrawCounts, X._multiDrawCount);
        else {
          const Rt = X._multiDrawStarts, _e = X._multiDrawCounts, Ut = X._multiDrawCount, Ye = ye ? le.get(ye).bytesPerElement : 1, Vt = q.get(k).currentProgram.getUniforms();
          for (let en = 0; en < Ut; en++)
            Vt.setValue(O, "_gl_DrawID", en), tt.render(Rt[en] / Ye, _e[en]);
        }
      else if (X.isInstancedMesh)
        tt.renderInstances(Ae, dt, X.count);
      else if (Y.isInstancedBufferGeometry) {
        const Rt = Y._maxInstanceCount !== void 0 ? Y._maxInstanceCount : 1 / 0, _e = Math.min(Y.instanceCount, Rt);
        tt.renderInstances(Ae, dt, _e);
      } else
        tt.render(Ae, dt);
    };
    function Rr(E, z, Y) {
      E.transparent === !0 && E.side === 2 && E.forceSinglePass === !1 ? (E.side = 1, E.needsUpdate = !0, Oi(E, z, Y), E.side = 0, E.needsUpdate = !0, Oi(E, z, Y), E.side = 2) : Oi(E, z, Y);
    }
    this.compile = function(E, z, Y = null) {
      Y === null && (Y = E), T = he.get(Y), T.init(z), v.push(T), Y.traverseVisible(function(X) {
        X.isLight && X.layers.test(z.layers) && (T.pushLight(X), X.castShadow && T.pushShadow(X));
      }), E !== Y && E.traverseVisible(function(X) {
        X.isLight && X.layers.test(z.layers) && (T.pushLight(X), X.castShadow && T.pushShadow(X));
      }), T.setupLights();
      const k = /* @__PURE__ */ new Set();
      return E.traverse(function(X) {
        if (!(X.isMesh || X.isPoints || X.isLine || X.isSprite))
          return;
        const me = X.material;
        if (me)
          if (Array.isArray(me))
            for (let ve = 0; ve < me.length; ve++) {
              const pe = me[ve];
              Rr(pe, Y, X), k.add(pe);
            }
          else
            Rr(me, Y, X), k.add(me);
      }), T = v.pop(), k;
    }, this.compileAsync = function(E, z, Y = null) {
      const k = this.compile(E, z, Y);
      return new Promise((X) => {
        function me() {
          if (k.forEach(function(ve) {
            q.get(ve).currentProgram.isReady() && k.delete(ve);
          }), k.size === 0) {
            X(E);
            return;
          }
          setTimeout(me, 10);
        }
        $e.get("KHR_parallel_shader_compile") !== null ? me() : setTimeout(me, 10);
      });
    };
    let bs = null;
    function Po(E) {
      bs && bs(E);
    }
    function Cr() {
      Nn.stop();
    }
    function Pr() {
      Nn.start();
    }
    const Nn = new ho();
    Nn.setAnimationLoop(Po), typeof self < "u" && Nn.setContext(self), this.setAnimationLoop = function(E) {
      bs = E, Se.setAnimationLoop(E), E === null ? Nn.stop() : Nn.start();
    }, Se.addEventListener("sessionstart", Cr), Se.addEventListener("sessionend", Pr), this.render = function(E, z) {
      if (z !== void 0 && z.isCamera !== !0) {
        Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (F === !0) return;
      L !== null && L.renderStart(E, z);
      const Y = Se.enabled === !0 && Se.isPresenting === !0, k = w !== null && (W === null || Y) && w.begin(P, W);
      if (E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld(), z.parent === null && z.matrixWorldAutoUpdate === !0 && z.updateMatrixWorld(), Se.enabled === !0 && Se.isPresenting === !0 && (w === null || w.isCompositing() === !1) && (Se.cameraAutoUpdate === !0 && Se.updateCamera(z), z = Se.getCamera()), E.isScene === !0 && E.onBeforeRender(P, E, z, W), T = he.get(E, v.length), T.init(z), T.state.textureUnits = Z.getTextureUnits(), v.push(T), pt.multiplyMatrices(z.projectionMatrix, z.matrixWorldInverse), et.setFromProjectionMatrix(pt, 2e3, z.reversedDepth), qe = this.localClippingEnabled, Ke = we.init(this.clippingPlanes, qe), b = de.get(E, C.length), b.init(), C.push(b), Se.enabled === !0 && Se.isPresenting === !0) {
        const ve = P.xr.getDepthSensingMesh();
        ve !== null && As(ve, z, -1 / 0, P.sortObjects);
      }
      As(E, z, 0, P.sortObjects), b.finish(), P.sortObjects === !0 && b.sort(Fe, Ie, z.reversedDepth), lt = Se.enabled === !1 || Se.isPresenting === !1 || Se.hasDepthSensing() === !1, lt && De.addToRenderList(b, E), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), Ke === !0 && we.beginShadows();
      const X = T.state.shadowsArray;
      if (Ce.render(X, E, z), Ke === !0 && we.endShadows(), (k && w.hasRenderPass()) === !1) {
        const ve = b.opaque, pe = b.transmissive;
        if (T.setupLights(), z.isArrayCamera) {
          const ye = z.cameras;
          if (pe.length > 0)
            for (let be = 0, Ne = ye.length; be < Ne; be++) {
              const Be = ye[be];
              Lr(ve, pe, E, Be);
            }
          lt && De.render(E);
          for (let be = 0, Ne = ye.length; be < Ne; be++) {
            const Be = ye[be];
            Fr(b, E, Be, Be.viewport);
          }
        } else
          pe.length > 0 && Lr(ve, pe, E, z), lt && De.render(E), Fr(b, E, z);
      }
      W !== null && V === 0 && (Z.updateMultisampleRenderTarget(W), Z.updateRenderTargetMipmap(W)), k && w.end(P), E.isScene === !0 && E.onAfterRender(P, E, z), ge.resetDefaultState(), K = -1, ie = null, v.pop(), v.length > 0 ? (T = v[v.length - 1], Z.setTextureUnits(T.state.textureUnits), Ke === !0 && we.setGlobalState(P.clippingPlanes, T.state.camera)) : T = null, C.pop(), C.length > 0 ? b = C[C.length - 1] : b = null, L !== null && L.renderEnd();
    };
    function As(E, z, Y, k) {
      if (E.visible === !1) return;
      if (E.layers.test(z.layers)) {
        if (E.isGroup)
          Y = E.renderOrder;
        else if (E.isLOD)
          E.autoUpdate === !0 && E.update(z);
        else if (E.isLightProbeGrid)
          T.pushLightProbeGrid(E);
        else if (E.isLight)
          T.pushLight(E), E.castShadow && T.pushShadow(E);
        else if (E.isSprite) {
          if (!E.frustumCulled || et.intersectsSprite(E)) {
            k && Et.setFromMatrixPosition(E.matrixWorld).applyMatrix4(pt);
            const ve = j.update(E), pe = E.material;
            pe.visible && b.push(E, ve, pe, Y, Et.z, null);
          }
        } else if ((E.isMesh || E.isLine || E.isPoints) && (!E.frustumCulled || et.intersectsObject(E))) {
          const ve = j.update(E), pe = E.material;
          if (k && (E.boundingSphere !== void 0 ? (E.boundingSphere === null && E.computeBoundingSphere(), Et.copy(E.boundingSphere.center)) : (ve.boundingSphere === null && ve.computeBoundingSphere(), Et.copy(ve.boundingSphere.center)), Et.applyMatrix4(E.matrixWorld).applyMatrix4(pt)), Array.isArray(pe)) {
            const ye = ve.groups;
            for (let be = 0, Ne = ye.length; be < Ne; be++) {
              const Be = ye[be], Ae = pe[Be.materialIndex];
              Ae && Ae.visible && b.push(E, ve, Ae, Y, Et.z, Be);
            }
          } else pe.visible && b.push(E, ve, pe, Y, Et.z, null);
        }
      }
      const me = E.children;
      for (let ve = 0, pe = me.length; ve < pe; ve++)
        As(me[ve], z, Y, k);
    }
    function Fr(E, z, Y, k) {
      const { opaque: X, transmissive: me, transparent: ve } = E;
      T.setupLightsView(Y), Ke === !0 && we.setGlobalState(P.clippingPlanes, Y), k && _.viewport(se.copy(k)), X.length > 0 && Bi(X, z, Y), me.length > 0 && Bi(me, z, Y), ve.length > 0 && Bi(ve, z, Y), _.buffers.depth.setTest(!0), _.buffers.depth.setMask(!0), _.buffers.color.setMask(!0), _.setPolygonOffset(!1);
    }
    function Lr(E, z, Y, k) {
      if ((Y.isScene === !0 ? Y.overrideMaterial : null) !== null)
        return;
      if (T.state.transmissionRenderTarget[k.id] === void 0) {
        const Ae = $e.has("EXT_color_buffer_half_float") || $e.has("EXT_color_buffer_float");
        T.state.transmissionRenderTarget[k.id] = new ln(1, 1, {
          generateMipmaps: !0,
          type: Ae ? 1016 : 1009,
          minFilter: 1008,
          samples: Math.max(4, R.samples),
          // to avoid feedback loops, the transmission render target requires a resolve, see #26177
          stencilBuffer: s,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: He.workingColorSpace
        });
      }
      const me = T.state.transmissionRenderTarget[k.id], ve = k.viewport || se;
      me.setSize(ve.z * P.transmissionResolutionScale, ve.w * P.transmissionResolutionScale);
      const pe = P.getRenderTarget(), ye = P.getActiveCubeFace(), be = P.getActiveMipmapLevel();
      P.setRenderTarget(me), P.getClearColor(je), Ve = P.getClearAlpha(), Ve < 1 && P.setClearColor(16777215, 0.5), P.clear(), lt && De.render(Y);
      const Ne = P.toneMapping;
      P.toneMapping = 0;
      const Be = k.viewport;
      if (k.viewport !== void 0 && (k.viewport = void 0), T.setupLightsView(k), Ke === !0 && we.setGlobalState(P.clippingPlanes, k), Bi(E, Y, k), Z.updateMultisampleRenderTarget(me), Z.updateRenderTargetMipmap(me), $e.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ae = !1;
        for (let Qe = 0, dt = z.length; Qe < dt; Qe++) {
          const ht = z[Qe], { object: tt, geometry: Rt, material: _e, group: Ut } = ht;
          if (_e.side === 2 && tt.layers.test(k.layers)) {
            const Ye = _e.side;
            _e.side = 1, _e.needsUpdate = !0, Ir(tt, Y, k, Rt, _e, Ut), _e.side = Ye, _e.needsUpdate = !0, Ae = !0;
          }
        }
        Ae === !0 && (Z.updateMultisampleRenderTarget(me), Z.updateRenderTargetMipmap(me));
      }
      P.setRenderTarget(pe, ye, be), P.setClearColor(je, Ve), Be !== void 0 && (k.viewport = Be), P.toneMapping = Ne;
    }
    function Bi(E, z, Y) {
      const k = z.isScene === !0 ? z.overrideMaterial : null;
      for (let X = 0, me = E.length; X < me; X++) {
        const ve = E[X], { object: pe, geometry: ye, group: be } = ve;
        let Ne = ve.material;
        Ne.allowOverride === !0 && k !== null && (Ne = k), pe.layers.test(Y.layers) && Ir(pe, z, Y, ye, Ne, be);
      }
    }
    function Ir(E, z, Y, k, X, me) {
      E.onBeforeRender(P, z, Y, k, X, me), E.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse, E.matrixWorld), E.normalMatrix.getNormalMatrix(E.modelViewMatrix), X.onBeforeRender(P, z, Y, k, E, me), X.transparent === !0 && X.side === 2 && X.forceSinglePass === !1 ? (X.side = 1, X.needsUpdate = !0, P.renderBufferDirect(Y, z, k, X, E, me), X.side = 0, X.needsUpdate = !0, P.renderBufferDirect(Y, z, k, X, E, me), X.side = 2) : P.renderBufferDirect(Y, z, k, X, E, me), E.onAfterRender(P, z, Y, k, X, me);
    }
    function Oi(E, z, Y) {
      z.isScene !== !0 && (z = At);
      const k = q.get(E), X = T.state.lights, me = T.state.shadowsArray, ve = X.state.version, pe = ce.getParameters(E, X.state, me, z, Y, T.state.lightProbeGridArray), ye = ce.getProgramCacheKey(pe);
      let be = k.programs;
      k.environment = E.isMeshStandardMaterial || E.isMeshLambertMaterial || E.isMeshPhongMaterial ? z.environment : null, k.fog = z.fog;
      const Ne = E.isMeshStandardMaterial || E.isMeshLambertMaterial && !E.envMap || E.isMeshPhongMaterial && !E.envMap;
      k.envMap = re.get(E.envMap || k.environment, Ne), k.envMapRotation = k.environment !== null && E.envMap === null ? z.environmentRotation : E.envMapRotation, be === void 0 && (E.addEventListener("dispose", jt), be = /* @__PURE__ */ new Map(), k.programs = be);
      let Be = be.get(ye);
      if (Be !== void 0) {
        if (k.currentProgram === Be && k.lightsStateVersion === ve)
          return Nr(E, pe), Be;
      } else
        pe.uniforms = ce.getUniforms(E), L !== null && E.isNodeMaterial && L.build(E, Y, pe), E.onBeforeCompile(pe, P), Be = ce.acquireProgram(pe, ye), be.set(ye, Be), k.uniforms = pe.uniforms;
      const Ae = k.uniforms;
      return (!E.isShaderMaterial && !E.isRawShaderMaterial || E.clipping === !0) && (Ae.clippingPlanes = we.uniform), Nr(E, pe), k.needsLights = Do(E), k.lightsStateVersion = ve, k.needsLights && (Ae.ambientLightColor.value = X.state.ambient, Ae.lightProbe.value = X.state.probe, Ae.directionalLights.value = X.state.directional, Ae.directionalLightShadows.value = X.state.directionalShadow, Ae.spotLights.value = X.state.spot, Ae.spotLightShadows.value = X.state.spotShadow, Ae.rectAreaLights.value = X.state.rectArea, Ae.ltc_1.value = X.state.rectAreaLTC1, Ae.ltc_2.value = X.state.rectAreaLTC2, Ae.pointLights.value = X.state.point, Ae.pointLightShadows.value = X.state.pointShadow, Ae.hemisphereLights.value = X.state.hemi, Ae.directionalShadowMatrix.value = X.state.directionalShadowMatrix, Ae.spotLightMatrix.value = X.state.spotLightMatrix, Ae.spotLightMap.value = X.state.spotLightMap, Ae.pointShadowMatrix.value = X.state.pointShadowMatrix), k.lightProbeGrid = T.state.lightProbeGridArray.length > 0, k.currentProgram = Be, k.uniformsList = null, Be;
    }
    function Dr(E) {
      if (E.uniformsList === null) {
        const z = E.currentProgram.getUniforms();
        E.uniformsList = us.seqWithValue(z.seq, E.uniforms);
      }
      return E.uniformsList;
    }
    function Nr(E, z) {
      const Y = q.get(E);
      Y.outputColorSpace = z.outputColorSpace, Y.batching = z.batching, Y.batchingColor = z.batchingColor, Y.instancing = z.instancing, Y.instancingColor = z.instancingColor, Y.instancingMorph = z.instancingMorph, Y.skinning = z.skinning, Y.morphTargets = z.morphTargets, Y.morphNormals = z.morphNormals, Y.morphColors = z.morphColors, Y.morphTargetsCount = z.morphTargetsCount, Y.numClippingPlanes = z.numClippingPlanes, Y.numIntersection = z.numClipIntersection, Y.vertexAlphas = z.vertexAlphas, Y.vertexTangents = z.vertexTangents, Y.toneMapping = z.toneMapping;
    }
    function Fo(E, z) {
      if (E.length === 0) return null;
      if (E.length === 1)
        return E[0].texture !== null ? E[0] : null;
      S.setFromMatrixPosition(z.matrixWorld);
      for (let Y = 0, k = E.length; Y < k; Y++) {
        const X = E[Y];
        if (X.texture !== null && X.boundingBox.containsPoint(S)) return X;
      }
      return null;
    }
    function Lo(E, z, Y, k, X) {
      z.isScene !== !0 && (z = At), Z.resetTextureUnits();
      const me = z.fog, ve = k.isMeshStandardMaterial || k.isMeshLambertMaterial || k.isMeshPhongMaterial ? z.environment : null, pe = W === null ? P.outputColorSpace : W.isXRRenderTarget === !0 ? W.texture.colorSpace : He.workingColorSpace, ye = k.isMeshStandardMaterial || k.isMeshLambertMaterial && !k.envMap || k.isMeshPhongMaterial && !k.envMap, be = re.get(k.envMap || ve, ye), Ne = k.vertexColors === !0 && !!Y.attributes.color && Y.attributes.color.itemSize === 4, Be = !!Y.attributes.tangent && (!!k.normalMap || k.anisotropy > 0), Ae = !!Y.morphAttributes.position, Qe = !!Y.morphAttributes.normal, dt = !!Y.morphAttributes.color;
      let ht = 0;
      k.toneMapped && (W === null || W.isXRRenderTarget === !0) && (ht = P.toneMapping);
      const tt = Y.morphAttributes.position || Y.morphAttributes.normal || Y.morphAttributes.color, Rt = tt !== void 0 ? tt.length : 0, _e = q.get(k), Ut = T.state.lights;
      if (Ke === !0 && (qe === !0 || E !== ie)) {
        const st = E === ie && k.id === K;
        we.setState(k, E, st);
      }
      let Ye = !1;
      k.version === _e.__version ? (_e.needsLights && _e.lightsStateVersion !== Ut.state.version || _e.outputColorSpace !== pe || X.isBatchedMesh && _e.batching === !1 || !X.isBatchedMesh && _e.batching === !0 || X.isBatchedMesh && _e.batchingColor === !0 && X.colorTexture === null || X.isBatchedMesh && _e.batchingColor === !1 && X.colorTexture !== null || X.isInstancedMesh && _e.instancing === !1 || !X.isInstancedMesh && _e.instancing === !0 || X.isSkinnedMesh && _e.skinning === !1 || !X.isSkinnedMesh && _e.skinning === !0 || X.isInstancedMesh && _e.instancingColor === !0 && X.instanceColor === null || X.isInstancedMesh && _e.instancingColor === !1 && X.instanceColor !== null || X.isInstancedMesh && _e.instancingMorph === !0 && X.morphTexture === null || X.isInstancedMesh && _e.instancingMorph === !1 && X.morphTexture !== null || _e.envMap !== be || k.fog === !0 && _e.fog !== me || _e.numClippingPlanes !== void 0 && (_e.numClippingPlanes !== we.numPlanes || _e.numIntersection !== we.numIntersection) || _e.vertexAlphas !== Ne || _e.vertexTangents !== Be || _e.morphTargets !== Ae || _e.morphNormals !== Qe || _e.morphColors !== dt || _e.toneMapping !== ht || _e.morphTargetsCount !== Rt || !!_e.lightProbeGrid != T.state.lightProbeGridArray.length > 0) && (Ye = !0) : (Ye = !0, _e.__version = k.version);
      let Vt = _e.currentProgram;
      Ye === !0 && (Vt = Oi(k, z, X), L && k.isNodeMaterial && L.onUpdateProgram(k, Vt, _e));
      let en = !1, yn = !1, qn = !1;
      const nt = Vt.getUniforms(), ft = _e.uniforms;
      if (_.useProgram(Vt.program) && (en = !0, yn = !0, qn = !0), k.id !== K && (K = k.id, yn = !0), _e.needsLights) {
        const st = Fo(T.state.lightProbeGridArray, X);
        _e.lightProbeGrid !== st && (_e.lightProbeGrid = st, yn = !0);
      }
      if (en || ie !== E) {
        _.buffers.depth.getReversed() && E.reversedDepth !== !0 && (E._reversedDepth = !0, E.updateProjectionMatrix()), nt.setValue(O, "projectionMatrix", E.projectionMatrix), nt.setValue(O, "viewMatrix", E.matrixWorldInverse);
        const Tn = nt.map.cameraPosition;
        Tn !== void 0 && Tn.setValue(O, xt.setFromMatrixPosition(E.matrixWorld)), R.logarithmicDepthBuffer && nt.setValue(
          O,
          "logDepthBufFC",
          2 / (Math.log(E.far + 1) / Math.LN2)
        ), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && nt.setValue(O, "isOrthographic", E.isOrthographicCamera === !0), ie !== E && (ie = E, yn = !0, qn = !0);
      }
      if (_e.needsLights && (Ut.state.directionalShadowMap.length > 0 && nt.setValue(O, "directionalShadowMap", Ut.state.directionalShadowMap, Z), Ut.state.spotShadowMap.length > 0 && nt.setValue(O, "spotShadowMap", Ut.state.spotShadowMap, Z), Ut.state.pointShadowMap.length > 0 && nt.setValue(O, "pointShadowMap", Ut.state.pointShadowMap, Z)), X.isSkinnedMesh) {
        nt.setOptional(O, X, "bindMatrix"), nt.setOptional(O, X, "bindMatrixInverse");
        const st = X.skeleton;
        st && (st.boneTexture === null && st.computeBoneTexture(), nt.setValue(O, "boneTexture", st.boneTexture, Z));
      }
      X.isBatchedMesh && (nt.setOptional(O, X, "batchingTexture"), nt.setValue(O, "batchingTexture", X._matricesTexture, Z), nt.setOptional(O, X, "batchingIdTexture"), nt.setValue(O, "batchingIdTexture", X._indirectTexture, Z), nt.setOptional(O, X, "batchingColorTexture"), X._colorsTexture !== null && nt.setValue(O, "batchingColorTexture", X._colorsTexture, Z));
      const En = Y.morphAttributes;
      if ((En.position !== void 0 || En.normal !== void 0 || En.color !== void 0) && B.update(X, Y, Vt), (yn || _e.receiveShadow !== X.receiveShadow) && (_e.receiveShadow = X.receiveShadow, nt.setValue(O, "receiveShadow", X.receiveShadow)), (k.isMeshStandardMaterial || k.isMeshLambertMaterial || k.isMeshPhongMaterial) && k.envMap === null && z.environment !== null && (ft.envMapIntensity.value = z.environmentIntensity), ft.dfgLUT !== void 0 && (ft.dfgLUT.value = Ff()), yn) {
        if (nt.setValue(O, "toneMappingExposure", P.toneMappingExposure), _e.needsLights && Io(ft, qn), me && k.fog === !0 && Te.refreshFogUniforms(ft, me), Te.refreshMaterialUniforms(ft, k, ne, ae, T.state.transmissionRenderTarget[E.id]), _e.needsLights && _e.lightProbeGrid) {
          const st = _e.lightProbeGrid;
          ft.probesSH.value = st.texture, ft.probesMin.value.copy(st.boundingBox.min), ft.probesMax.value.copy(st.boundingBox.max), ft.probesResolution.value.copy(st.resolution);
        }
        us.upload(O, Dr(_e), ft, Z);
      }
      if (k.isShaderMaterial && k.uniformsNeedUpdate === !0 && (us.upload(O, Dr(_e), ft, Z), k.uniformsNeedUpdate = !1), k.isSpriteMaterial && nt.setValue(O, "center", X.center), nt.setValue(O, "modelViewMatrix", X.modelViewMatrix), nt.setValue(O, "normalMatrix", X.normalMatrix), nt.setValue(O, "modelMatrix", X.matrixWorld), k.uniformsGroups !== void 0) {
        const st = k.uniformsGroups;
        for (let Tn = 0, Yn = st.length; Tn < Yn; Tn++) {
          const Ur = st[Tn];
          te.update(Ur, Vt), te.bind(Ur, Vt);
        }
      }
      return Vt;
    }
    function Io(E, z) {
      E.ambientLightColor.needsUpdate = z, E.lightProbe.needsUpdate = z, E.directionalLights.needsUpdate = z, E.directionalLightShadows.needsUpdate = z, E.pointLights.needsUpdate = z, E.pointLightShadows.needsUpdate = z, E.spotLights.needsUpdate = z, E.spotLightShadows.needsUpdate = z, E.rectAreaLights.needsUpdate = z, E.hemisphereLights.needsUpdate = z;
    }
    function Do(E) {
      return E.isMeshLambertMaterial || E.isMeshToonMaterial || E.isMeshPhongMaterial || E.isMeshStandardMaterial || E.isShadowMaterial || E.isShaderMaterial && E.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return N;
    }, this.getActiveMipmapLevel = function() {
      return V;
    }, this.getRenderTarget = function() {
      return W;
    }, this.setRenderTargetTextures = function(E, z, Y) {
      const k = q.get(E);
      k.__autoAllocateDepthBuffer = E.resolveDepthBuffer === !1, k.__autoAllocateDepthBuffer === !1 && (k.__useRenderToTexture = !1), q.get(E.texture).__webglTexture = z, q.get(E.depthTexture).__webglTexture = k.__autoAllocateDepthBuffer ? void 0 : Y, k.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(E, z) {
      const Y = q.get(E);
      Y.__webglFramebuffer = z, Y.__useDefaultFramebuffer = z === void 0;
    }, this.setRenderTarget = function(E, z = 0, Y = 0) {
      W = E, N = z, V = Y;
      let k = null, X = !1, me = !1;
      if (E) {
        const pe = q.get(E);
        if (pe.__useDefaultFramebuffer !== void 0) {
          _.bindFramebuffer(O.FRAMEBUFFER, pe.__webglFramebuffer), se.copy(E.viewport), ee.copy(E.scissor), Oe = E.scissorTest, _.viewport(se), _.scissor(ee), _.setScissorTest(Oe), K = -1;
          return;
        } else if (pe.__webglFramebuffer === void 0)
          Z.setupRenderTarget(E);
        else if (pe.__hasExternalTextures)
          Z.rebindTextures(E, q.get(E.texture).__webglTexture, q.get(E.depthTexture).__webglTexture);
        else if (E.depthBuffer) {
          const Ne = E.depthTexture;
          if (pe.__boundDepthTexture !== Ne) {
            if (Ne !== null && q.has(Ne) && (E.width !== Ne.image.width || E.height !== Ne.image.height))
              throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            Z.setupDepthRenderbuffer(E);
          }
        }
        const ye = E.texture;
        (ye.isData3DTexture || ye.isDataArrayTexture || ye.isCompressedArrayTexture) && (me = !0);
        const be = q.get(E).__webglFramebuffer;
        E.isWebGLCubeRenderTarget ? (Array.isArray(be[z]) ? k = be[z][Y] : k = be[z], X = !0) : E.samples > 0 && Z.useMultisampledRTT(E) === !1 ? k = q.get(E).__webglMultisampledFramebuffer : Array.isArray(be) ? k = be[Y] : k = be, se.copy(E.viewport), ee.copy(E.scissor), Oe = E.scissorTest;
      } else
        se.copy(Re).multiplyScalar(ne).floor(), ee.copy(ut).multiplyScalar(ne).floor(), Oe = ze;
      if (Y !== 0 && (k = I), _.bindFramebuffer(O.FRAMEBUFFER, k) && _.drawBuffers(E, k), _.viewport(se), _.scissor(ee), _.setScissorTest(Oe), X) {
        const pe = q.get(E.texture);
        O.framebufferTexture2D(O.FRAMEBUFFER, O.COLOR_ATTACHMENT0, O.TEXTURE_CUBE_MAP_POSITIVE_X + z, pe.__webglTexture, Y);
      } else if (me) {
        const pe = z;
        for (let ye = 0; ye < E.textures.length; ye++) {
          const be = q.get(E.textures[ye]);
          O.framebufferTextureLayer(O.FRAMEBUFFER, O.COLOR_ATTACHMENT0 + ye, be.__webglTexture, Y, pe);
        }
      } else if (E !== null && Y !== 0) {
        const pe = q.get(E.texture);
        O.framebufferTexture2D(O.FRAMEBUFFER, O.COLOR_ATTACHMENT0, O.TEXTURE_2D, pe.__webglTexture, Y);
      }
      K = -1;
    }, this.readRenderTargetPixels = function(E, z, Y, k, X, me, ve, pe = 0) {
      if (!(E && E.isWebGLRenderTarget)) {
        Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ye = q.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && ve !== void 0 && (ye = ye[ve]), ye) {
        _.bindFramebuffer(O.FRAMEBUFFER, ye);
        try {
          const be = E.textures[pe], Ne = be.format, Be = be.type;
          if (E.textures.length > 1 && O.readBuffer(O.COLOR_ATTACHMENT0 + pe), !R.textureFormatReadable(Ne)) {
            Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!R.textureTypeReadable(Be)) {
            Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          z >= 0 && z <= E.width - k && Y >= 0 && Y <= E.height - X && O.readPixels(z, Y, k, X, ue.convert(Ne), ue.convert(Be), me);
        } finally {
          const be = W !== null ? q.get(W).__webglFramebuffer : null;
          _.bindFramebuffer(O.FRAMEBUFFER, be);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(E, z, Y, k, X, me, ve, pe = 0) {
      if (!(E && E.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ye = q.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && ve !== void 0 && (ye = ye[ve]), ye)
        if (z >= 0 && z <= E.width - k && Y >= 0 && Y <= E.height - X) {
          _.bindFramebuffer(O.FRAMEBUFFER, ye);
          const be = E.textures[pe], Ne = be.format, Be = be.type;
          if (E.textures.length > 1 && O.readBuffer(O.COLOR_ATTACHMENT0 + pe), !R.textureFormatReadable(Ne))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!R.textureTypeReadable(Be))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const Ae = O.createBuffer();
          O.bindBuffer(O.PIXEL_PACK_BUFFER, Ae), O.bufferData(O.PIXEL_PACK_BUFFER, me.byteLength, O.STREAM_READ), O.readPixels(z, Y, k, X, ue.convert(Ne), ue.convert(Be), 0);
          const Qe = W !== null ? q.get(W).__webglFramebuffer : null;
          _.bindFramebuffer(O.FRAMEBUFFER, Qe);
          const dt = O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return O.flush(), await Bo(O, dt, 4), O.bindBuffer(O.PIXEL_PACK_BUFFER, Ae), O.getBufferSubData(O.PIXEL_PACK_BUFFER, 0, me), O.deleteBuffer(Ae), O.deleteSync(dt), me;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(E, z = null, Y = 0) {
      const k = Math.pow(2, -Y), X = Math.floor(E.image.width * k), me = Math.floor(E.image.height * k), ve = z !== null ? z.x : 0, pe = z !== null ? z.y : 0;
      Z.setTexture2D(E, 0), O.copyTexSubImage2D(O.TEXTURE_2D, Y, 0, 0, ve, pe, X, me), _.unbindTexture();
    }, this.copyTextureToTexture = function(E, z, Y = null, k = null, X = 0, me = 0) {
      let ve, pe, ye, be, Ne, Be, Ae, Qe, dt;
      const ht = E.isCompressedTexture ? E.mipmaps[me] : E.image;
      if (Y !== null)
        ve = Y.max.x - Y.min.x, pe = Y.max.y - Y.min.y, ye = Y.isBox3 ? Y.max.z - Y.min.z : 1, be = Y.min.x, Ne = Y.min.y, Be = Y.isBox3 ? Y.min.z : 0;
      else {
        const ft = Math.pow(2, -X);
        ve = Math.floor(ht.width * ft), pe = Math.floor(ht.height * ft), E.isDataArrayTexture ? ye = ht.depth : E.isData3DTexture ? ye = Math.floor(ht.depth * ft) : ye = 1, be = 0, Ne = 0, Be = 0;
      }
      k !== null ? (Ae = k.x, Qe = k.y, dt = k.z) : (Ae = 0, Qe = 0, dt = 0);
      const tt = ue.convert(z.format), Rt = ue.convert(z.type);
      let _e;
      z.isData3DTexture ? (Z.setTexture3D(z, 0), _e = O.TEXTURE_3D) : z.isDataArrayTexture || z.isCompressedArrayTexture ? (Z.setTexture2DArray(z, 0), _e = O.TEXTURE_2D_ARRAY) : (Z.setTexture2D(z, 0), _e = O.TEXTURE_2D), _.activeTexture(O.TEXTURE0), _.pixelStorei(O.UNPACK_FLIP_Y_WEBGL, z.flipY), _.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL, z.premultiplyAlpha), _.pixelStorei(O.UNPACK_ALIGNMENT, z.unpackAlignment);
      const Ut = _.getParameter(O.UNPACK_ROW_LENGTH), Ye = _.getParameter(O.UNPACK_IMAGE_HEIGHT), Vt = _.getParameter(O.UNPACK_SKIP_PIXELS), en = _.getParameter(O.UNPACK_SKIP_ROWS), yn = _.getParameter(O.UNPACK_SKIP_IMAGES);
      _.pixelStorei(O.UNPACK_ROW_LENGTH, ht.width), _.pixelStorei(O.UNPACK_IMAGE_HEIGHT, ht.height), _.pixelStorei(O.UNPACK_SKIP_PIXELS, be), _.pixelStorei(O.UNPACK_SKIP_ROWS, Ne), _.pixelStorei(O.UNPACK_SKIP_IMAGES, Be);
      const qn = E.isDataArrayTexture || E.isData3DTexture, nt = z.isDataArrayTexture || z.isData3DTexture;
      if (E.isDepthTexture) {
        const ft = q.get(E), En = q.get(z), st = q.get(ft.__renderTarget), Tn = q.get(En.__renderTarget);
        _.bindFramebuffer(O.READ_FRAMEBUFFER, st.__webglFramebuffer), _.bindFramebuffer(O.DRAW_FRAMEBUFFER, Tn.__webglFramebuffer);
        for (let Yn = 0; Yn < ye; Yn++)
          qn && (O.framebufferTextureLayer(O.READ_FRAMEBUFFER, O.COLOR_ATTACHMENT0, q.get(E).__webglTexture, X, Be + Yn), O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER, O.COLOR_ATTACHMENT0, q.get(z).__webglTexture, me, dt + Yn)), O.blitFramebuffer(be, Ne, ve, pe, Ae, Qe, ve, pe, O.DEPTH_BUFFER_BIT, O.NEAREST);
        _.bindFramebuffer(O.READ_FRAMEBUFFER, null), _.bindFramebuffer(O.DRAW_FRAMEBUFFER, null);
      } else if (X !== 0 || E.isRenderTargetTexture || q.has(E)) {
        const ft = q.get(E), En = q.get(z);
        _.bindFramebuffer(O.READ_FRAMEBUFFER, U), _.bindFramebuffer(O.DRAW_FRAMEBUFFER, D);
        for (let st = 0; st < ye; st++)
          qn ? O.framebufferTextureLayer(O.READ_FRAMEBUFFER, O.COLOR_ATTACHMENT0, ft.__webglTexture, X, Be + st) : O.framebufferTexture2D(O.READ_FRAMEBUFFER, O.COLOR_ATTACHMENT0, O.TEXTURE_2D, ft.__webglTexture, X), nt ? O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER, O.COLOR_ATTACHMENT0, En.__webglTexture, me, dt + st) : O.framebufferTexture2D(O.DRAW_FRAMEBUFFER, O.COLOR_ATTACHMENT0, O.TEXTURE_2D, En.__webglTexture, me), X !== 0 ? O.blitFramebuffer(be, Ne, ve, pe, Ae, Qe, ve, pe, O.COLOR_BUFFER_BIT, O.NEAREST) : nt ? O.copyTexSubImage3D(_e, me, Ae, Qe, dt + st, be, Ne, ve, pe) : O.copyTexSubImage2D(_e, me, Ae, Qe, be, Ne, ve, pe);
        _.bindFramebuffer(O.READ_FRAMEBUFFER, null), _.bindFramebuffer(O.DRAW_FRAMEBUFFER, null);
      } else
        nt ? E.isDataTexture || E.isData3DTexture ? O.texSubImage3D(_e, me, Ae, Qe, dt, ve, pe, ye, tt, Rt, ht.data) : z.isCompressedArrayTexture ? O.compressedTexSubImage3D(_e, me, Ae, Qe, dt, ve, pe, ye, tt, ht.data) : O.texSubImage3D(_e, me, Ae, Qe, dt, ve, pe, ye, tt, Rt, ht) : E.isDataTexture ? O.texSubImage2D(O.TEXTURE_2D, me, Ae, Qe, ve, pe, tt, Rt, ht.data) : E.isCompressedTexture ? O.compressedTexSubImage2D(O.TEXTURE_2D, me, Ae, Qe, ht.width, ht.height, tt, ht.data) : O.texSubImage2D(O.TEXTURE_2D, me, Ae, Qe, ve, pe, tt, Rt, ht);
      _.pixelStorei(O.UNPACK_ROW_LENGTH, Ut), _.pixelStorei(O.UNPACK_IMAGE_HEIGHT, Ye), _.pixelStorei(O.UNPACK_SKIP_PIXELS, Vt), _.pixelStorei(O.UNPACK_SKIP_ROWS, en), _.pixelStorei(O.UNPACK_SKIP_IMAGES, yn), me === 0 && z.generateMipmaps && O.generateMipmap(_e), _.unbindTexture();
    }, this.initRenderTarget = function(E) {
      q.get(E).__webglFramebuffer === void 0 && Z.setupRenderTarget(E);
    }, this.initTexture = function(E) {
      E.isCubeTexture ? Z.setTextureCube(E, 0) : E.isData3DTexture ? Z.setTexture3D(E, 0) : E.isDataArrayTexture || E.isCompressedArrayTexture ? Z.setTexture2DArray(E, 0) : Z.setTexture2D(E, 0), _.unbindTexture();
    }, this.resetState = function() {
      N = 0, V = 0, W = null, _.reset(), ge.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * Defines the coordinate system of the renderer.
   *
   * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
   *
   * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
   * @default WebGLCoordinateSystem
   * @readonly
   */
  get coordinateSystem() {
    return 2e3;
  }
  /**
   * Defines the output color space of the renderer.
   *
   * @type {SRGBColorSpace|LinearSRGBColorSpace}
   * @default SRGBColorSpace
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = He._getDrawingBufferColorSpace(e), t.unpackColorSpace = He._getUnpackColorSpace();
  }
}
class Jt {
  /**
   * A vector of length 9, containing all matrix elements.
   */
  /**
   * @param elements A vector of length 9, containing all matrix elements.
   */
  constructor(e) {
    e === void 0 && (e = [0, 0, 0, 0, 0, 0, 0, 0, 0]), this.elements = e;
  }
  /**
   * Sets the matrix to identity
   * @todo Should perhaps be renamed to `setIdentity()` to be more clear.
   * @todo Create another function that immediately creates an identity matrix eg. `eye()`
   */
  identity() {
    const e = this.elements;
    e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1;
  }
  /**
   * Set all elements to zero
   */
  setZero() {
    const e = this.elements;
    e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 0;
  }
  /**
   * Sets the matrix diagonal elements from a Vec3
   */
  setTrace(e) {
    const t = this.elements;
    t[0] = e.x, t[4] = e.y, t[8] = e.z;
  }
  /**
   * Gets the matrix diagonal elements
   */
  getTrace(e) {
    e === void 0 && (e = new y());
    const t = this.elements;
    return e.x = t[0], e.y = t[4], e.z = t[8], e;
  }
  /**
   * Matrix-Vector multiplication
   * @param v The vector to multiply with
   * @param target Optional, target to save the result in.
   */
  vmult(e, t) {
    t === void 0 && (t = new y());
    const n = this.elements, i = e.x, s = e.y, a = e.z;
    return t.x = n[0] * i + n[1] * s + n[2] * a, t.y = n[3] * i + n[4] * s + n[5] * a, t.z = n[6] * i + n[7] * s + n[8] * a, t;
  }
  /**
   * Matrix-scalar multiplication
   */
  smult(e) {
    for (let t = 0; t < this.elements.length; t++)
      this.elements[t] *= e;
  }
  /**
   * Matrix multiplication
   * @param matrix Matrix to multiply with from left side.
   */
  mmult(e, t) {
    t === void 0 && (t = new Jt());
    const n = this.elements, i = e.elements, s = t.elements, a = n[0], o = n[1], l = n[2], c = n[3], u = n[4], d = n[5], h = n[6], f = n[7], g = n[8], x = i[0], m = i[1], p = i[2], M = i[3], A = i[4], S = i[5], b = i[6], T = i[7], C = i[8];
    return s[0] = a * x + o * M + l * b, s[1] = a * m + o * A + l * T, s[2] = a * p + o * S + l * C, s[3] = c * x + u * M + d * b, s[4] = c * m + u * A + d * T, s[5] = c * p + u * S + d * C, s[6] = h * x + f * M + g * b, s[7] = h * m + f * A + g * T, s[8] = h * p + f * S + g * C, t;
  }
  /**
   * Scale each column of the matrix
   */
  scale(e, t) {
    t === void 0 && (t = new Jt());
    const n = this.elements, i = t.elements;
    for (let s = 0; s !== 3; s++)
      i[3 * s + 0] = e.x * n[3 * s + 0], i[3 * s + 1] = e.y * n[3 * s + 1], i[3 * s + 2] = e.z * n[3 * s + 2];
    return t;
  }
  /**
   * Solve Ax=b
   * @param b The right hand side
   * @param target Optional. Target vector to save in.
   * @return The solution x
   * @todo should reuse arrays
   */
  solve(e, t) {
    t === void 0 && (t = new y());
    const n = 3, i = 4, s = [];
    let a, o;
    for (a = 0; a < n * i; a++)
      s.push(0);
    for (a = 0; a < 3; a++)
      for (o = 0; o < 3; o++)
        s[a + i * o] = this.elements[a + 3 * o];
    s[3 + 4 * 0] = e.x, s[3 + 4 * 1] = e.y, s[3 + 4 * 2] = e.z;
    let l = 3;
    const c = l;
    let u;
    const d = 4;
    let h;
    do {
      if (a = c - l, s[a + i * a] === 0) {
        for (o = a + 1; o < c; o++)
          if (s[a + i * o] !== 0) {
            u = d;
            do
              h = d - u, s[h + i * a] += s[h + i * o];
            while (--u);
            break;
          }
      }
      if (s[a + i * a] !== 0)
        for (o = a + 1; o < c; o++) {
          const f = s[a + i * o] / s[a + i * a];
          u = d;
          do
            h = d - u, s[h + i * o] = h <= a ? 0 : s[h + i * o] - s[h + i * a] * f;
          while (--u);
        }
    } while (--l);
    if (t.z = s[2 * i + 3] / s[2 * i + 2], t.y = (s[1 * i + 3] - s[1 * i + 2] * t.z) / s[1 * i + 1], t.x = (s[0 * i + 3] - s[0 * i + 2] * t.z - s[0 * i + 1] * t.y) / s[0 * i + 0], isNaN(t.x) || isNaN(t.y) || isNaN(t.z) || t.x === 1 / 0 || t.y === 1 / 0 || t.z === 1 / 0)
      throw `Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;
    return t;
  }
  /**
   * Get an element in the matrix by index. Index starts at 0, not 1!!!
   * @param value If provided, the matrix element will be set to this value.
   */
  e(e, t, n) {
    if (n === void 0)
      return this.elements[t + 3 * e];
    this.elements[t + 3 * e] = n;
  }
  /**
   * Copy another matrix into this matrix object.
   */
  copy(e) {
    for (let t = 0; t < e.elements.length; t++)
      this.elements[t] = e.elements[t];
    return this;
  }
  /**
   * Returns a string representation of the matrix.
   */
  toString() {
    let e = "";
    const t = ",";
    for (let n = 0; n < 9; n++)
      e += this.elements[n] + t;
    return e;
  }
  /**
   * reverse the matrix
   * @param target Target matrix to save in.
   * @return The solution x
   */
  reverse(e) {
    e === void 0 && (e = new Jt());
    const t = 3, n = 6, i = Lf;
    let s, a;
    for (s = 0; s < 3; s++)
      for (a = 0; a < 3; a++)
        i[s + n * a] = this.elements[s + 3 * a];
    i[3 + 6 * 0] = 1, i[3 + 6 * 1] = 0, i[3 + 6 * 2] = 0, i[4 + 6 * 0] = 0, i[4 + 6 * 1] = 1, i[4 + 6 * 2] = 0, i[5 + 6 * 0] = 0, i[5 + 6 * 1] = 0, i[5 + 6 * 2] = 1;
    let o = 3;
    const l = o;
    let c;
    const u = n;
    let d;
    do {
      if (s = l - o, i[s + n * s] === 0) {
        for (a = s + 1; a < l; a++)
          if (i[s + n * a] !== 0) {
            c = u;
            do
              d = u - c, i[d + n * s] += i[d + n * a];
            while (--c);
            break;
          }
      }
      if (i[s + n * s] !== 0)
        for (a = s + 1; a < l; a++) {
          const h = i[s + n * a] / i[s + n * s];
          c = u;
          do
            d = u - c, i[d + n * a] = d <= s ? 0 : i[d + n * a] - i[d + n * s] * h;
          while (--c);
        }
    } while (--o);
    s = 2;
    do {
      a = s - 1;
      do {
        const h = i[s + n * a] / i[s + n * s];
        c = n;
        do
          d = n - c, i[d + n * a] = i[d + n * a] - i[d + n * s] * h;
        while (--c);
      } while (a--);
    } while (--s);
    s = 2;
    do {
      const h = 1 / i[s + n * s];
      c = n;
      do
        d = n - c, i[d + n * s] = i[d + n * s] * h;
      while (--c);
    } while (s--);
    s = 2;
    do {
      a = 2;
      do {
        if (d = i[t + a + n * s], isNaN(d) || d === 1 / 0)
          throw `Could not reverse! A=[${this.toString()}]`;
        e.e(s, a, d);
      } while (a--);
    } while (s--);
    return e;
  }
  /**
   * Set the matrix from a quaterion
   */
  setRotationFromQuaternion(e) {
    const t = e.x, n = e.y, i = e.z, s = e.w, a = t + t, o = n + n, l = i + i, c = t * a, u = t * o, d = t * l, h = n * o, f = n * l, g = i * l, x = s * a, m = s * o, p = s * l, M = this.elements;
    return M[3 * 0 + 0] = 1 - (h + g), M[3 * 0 + 1] = u - p, M[3 * 0 + 2] = d + m, M[3 * 1 + 0] = u + p, M[3 * 1 + 1] = 1 - (c + g), M[3 * 1 + 2] = f - x, M[3 * 2 + 0] = d - m, M[3 * 2 + 1] = f + x, M[3 * 2 + 2] = 1 - (c + h), this;
  }
  /**
   * Transpose the matrix
   * @param target Optional. Where to store the result.
   * @return The target Mat3, or a new Mat3 if target was omitted.
   */
  transpose(e) {
    e === void 0 && (e = new Jt());
    const t = this.elements, n = e.elements;
    let i;
    return n[0] = t[0], n[4] = t[4], n[8] = t[8], i = t[1], n[1] = t[3], n[3] = i, i = t[2], n[2] = t[6], n[6] = i, i = t[5], n[5] = t[7], n[7] = i, e;
  }
}
const Lf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
class y {
  constructor(e, t, n) {
    e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), this.x = e, this.y = t, this.z = n;
  }
  /**
   * Vector cross product
   * @param target Optional target to save in.
   */
  cross(e, t) {
    t === void 0 && (t = new y());
    const n = e.x, i = e.y, s = e.z, a = this.x, o = this.y, l = this.z;
    return t.x = o * s - l * i, t.y = l * n - a * s, t.z = a * i - o * n, t;
  }
  /**
   * Set the vectors' 3 elements
   */
  set(e, t, n) {
    return this.x = e, this.y = t, this.z = n, this;
  }
  /**
   * Set all components of the vector to zero.
   */
  setZero() {
    this.x = this.y = this.z = 0;
  }
  /**
   * Vector addition
   */
  vadd(e, t) {
    if (t)
      t.x = e.x + this.x, t.y = e.y + this.y, t.z = e.z + this.z;
    else
      return new y(this.x + e.x, this.y + e.y, this.z + e.z);
  }
  /**
   * Vector subtraction
   * @param target Optional target to save in.
   */
  vsub(e, t) {
    if (t)
      t.x = this.x - e.x, t.y = this.y - e.y, t.z = this.z - e.z;
    else
      return new y(this.x - e.x, this.y - e.y, this.z - e.z);
  }
  /**
   * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
   *
   * See {@link https://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf Umeå University Lecture}
   */
  crossmat() {
    return new Jt([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0]);
  }
  /**
   * Normalize the vector. Note that this changes the values in the vector.
    * @return Returns the norm of the vector
   */
  normalize() {
    const e = this.x, t = this.y, n = this.z, i = Math.sqrt(e * e + t * t + n * n);
    if (i > 0) {
      const s = 1 / i;
      this.x *= s, this.y *= s, this.z *= s;
    } else
      this.x = 0, this.y = 0, this.z = 0;
    return i;
  }
  /**
   * Get the version of this vector that is of length 1.
   * @param target Optional target to save in
   * @return Returns the unit vector
   */
  unit(e) {
    e === void 0 && (e = new y());
    const t = this.x, n = this.y, i = this.z;
    let s = Math.sqrt(t * t + n * n + i * i);
    return s > 0 ? (s = 1 / s, e.x = t * s, e.y = n * s, e.z = i * s) : (e.x = 1, e.y = 0, e.z = 0), e;
  }
  /**
   * Get the length of the vector
   */
  length() {
    const e = this.x, t = this.y, n = this.z;
    return Math.sqrt(e * e + t * t + n * n);
  }
  /**
   * Get the squared length of the vector.
   */
  lengthSquared() {
    return this.dot(this);
  }
  /**
   * Get distance from this point to another point
   */
  distanceTo(e) {
    const t = this.x, n = this.y, i = this.z, s = e.x, a = e.y, o = e.z;
    return Math.sqrt((s - t) * (s - t) + (a - n) * (a - n) + (o - i) * (o - i));
  }
  /**
   * Get squared distance from this point to another point
   */
  distanceSquared(e) {
    const t = this.x, n = this.y, i = this.z, s = e.x, a = e.y, o = e.z;
    return (s - t) * (s - t) + (a - n) * (a - n) + (o - i) * (o - i);
  }
  /**
   * Multiply all the components of the vector with a scalar.
   * @param target The vector to save the result in.
   */
  scale(e, t) {
    t === void 0 && (t = new y());
    const n = this.x, i = this.y, s = this.z;
    return t.x = e * n, t.y = e * i, t.z = e * s, t;
  }
  /**
   * Multiply the vector with an other vector, component-wise.
   * @param target The vector to save the result in.
   */
  vmul(e, t) {
    return t === void 0 && (t = new y()), t.x = e.x * this.x, t.y = e.y * this.y, t.z = e.z * this.z, t;
  }
  /**
   * Scale a vector and add it to this vector. Save the result in "target". (target = this + vector * scalar)
   * @param target The vector to save the result in.
   */
  addScaledVector(e, t, n) {
    return n === void 0 && (n = new y()), n.x = this.x + e * t.x, n.y = this.y + e * t.y, n.z = this.z + e * t.z, n;
  }
  /**
   * Calculate dot product
   * @param vector
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  isZero() {
    return this.x === 0 && this.y === 0 && this.z === 0;
  }
  /**
   * Make the vector point in the opposite direction.
   * @param target Optional target to save in
   */
  negate(e) {
    return e === void 0 && (e = new y()), e.x = -this.x, e.y = -this.y, e.z = -this.z, e;
  }
  /**
   * Compute two artificial tangents to the vector
   * @param t1 Vector object to save the first tangent in
   * @param t2 Vector object to save the second tangent in
   */
  tangents(e, t) {
    const n = this.length();
    if (n > 0) {
      const i = If, s = 1 / n;
      i.set(this.x * s, this.y * s, this.z * s);
      const a = Df;
      Math.abs(i.x) < 0.9 ? (a.set(1, 0, 0), i.cross(a, e)) : (a.set(0, 1, 0), i.cross(a, e)), i.cross(e, t);
    } else
      e.set(1, 0, 0), t.set(0, 1, 0);
  }
  /**
   * Converts to a more readable format
   */
  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
  /**
   * Converts to an array
   */
  toArray() {
    return [this.x, this.y, this.z];
  }
  /**
   * Copies value of source to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Do a linear interpolation between two vectors
   * @param t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
   */
  lerp(e, t, n) {
    const i = this.x, s = this.y, a = this.z;
    n.x = i + (e.x - i) * t, n.y = s + (e.y - s) * t, n.z = a + (e.z - a) * t;
  }
  /**
   * Check if a vector equals is almost equal to another one.
   */
  almostEquals(e, t) {
    return t === void 0 && (t = 1e-6), !(Math.abs(this.x - e.x) > t || Math.abs(this.y - e.y) > t || Math.abs(this.z - e.z) > t);
  }
  /**
   * Check if a vector is almost zero
   */
  almostZero(e) {
    return e === void 0 && (e = 1e-6), !(Math.abs(this.x) > e || Math.abs(this.y) > e || Math.abs(this.z) > e);
  }
  /**
   * Check if the vector is anti-parallel to another vector.
   * @param precision Set to zero for exact comparisons
   */
  isAntiparallelTo(e, t) {
    return this.negate(Ia), Ia.almostEquals(e, t);
  }
  /**
   * Clone the vector
   */
  clone() {
    return new y(this.x, this.y, this.z);
  }
}
y.ZERO = new y(0, 0, 0);
y.UNIT_X = new y(1, 0, 0);
y.UNIT_Y = new y(0, 1, 0);
y.UNIT_Z = new y(0, 0, 1);
const If = new y(), Df = new y(), Ia = new y();
class Gt {
  /**
   * The lower bound of the bounding box
   */
  /**
   * The upper bound of the bounding box
   */
  constructor(e) {
    e === void 0 && (e = {}), this.lowerBound = new y(), this.upperBound = new y(), e.lowerBound && this.lowerBound.copy(e.lowerBound), e.upperBound && this.upperBound.copy(e.upperBound);
  }
  /**
   * Set the AABB bounds from a set of points.
   * @param points An array of Vec3's.
   * @return The self object
   */
  setFromPoints(e, t, n, i) {
    const s = this.lowerBound, a = this.upperBound, o = n;
    s.copy(e[0]), o && o.vmult(s, s), a.copy(s);
    for (let l = 1; l < e.length; l++) {
      let c = e[l];
      o && (o.vmult(c, Da), c = Da), c.x > a.x && (a.x = c.x), c.x < s.x && (s.x = c.x), c.y > a.y && (a.y = c.y), c.y < s.y && (s.y = c.y), c.z > a.z && (a.z = c.z), c.z < s.z && (s.z = c.z);
    }
    return t && (t.vadd(s, s), t.vadd(a, a)), i && (s.x -= i, s.y -= i, s.z -= i, a.x += i, a.y += i, a.z += i), this;
  }
  /**
   * Copy bounds from an AABB to this AABB
   * @param aabb Source to copy from
   * @return The this object, for chainability
   */
  copy(e) {
    return this.lowerBound.copy(e.lowerBound), this.upperBound.copy(e.upperBound), this;
  }
  /**
   * Clone an AABB
   */
  clone() {
    return new Gt().copy(this);
  }
  /**
   * Extend this AABB so that it covers the given AABB too.
   */
  extend(e) {
    this.lowerBound.x = Math.min(this.lowerBound.x, e.lowerBound.x), this.upperBound.x = Math.max(this.upperBound.x, e.upperBound.x), this.lowerBound.y = Math.min(this.lowerBound.y, e.lowerBound.y), this.upperBound.y = Math.max(this.upperBound.y, e.upperBound.y), this.lowerBound.z = Math.min(this.lowerBound.z, e.lowerBound.z), this.upperBound.z = Math.max(this.upperBound.z, e.upperBound.z);
  }
  /**
   * Returns true if the given AABB overlaps this AABB.
   */
  overlaps(e) {
    const t = this.lowerBound, n = this.upperBound, i = e.lowerBound, s = e.upperBound, a = i.x <= n.x && n.x <= s.x || t.x <= s.x && s.x <= n.x, o = i.y <= n.y && n.y <= s.y || t.y <= s.y && s.y <= n.y, l = i.z <= n.z && n.z <= s.z || t.z <= s.z && s.z <= n.z;
    return a && o && l;
  }
  // Mostly for debugging
  volume() {
    const e = this.lowerBound, t = this.upperBound;
    return (t.x - e.x) * (t.y - e.y) * (t.z - e.z);
  }
  /**
   * Returns true if the given AABB is fully contained in this AABB.
   */
  contains(e) {
    const t = this.lowerBound, n = this.upperBound, i = e.lowerBound, s = e.upperBound;
    return t.x <= i.x && n.x >= s.x && t.y <= i.y && n.y >= s.y && t.z <= i.z && n.z >= s.z;
  }
  getCorners(e, t, n, i, s, a, o, l) {
    const c = this.lowerBound, u = this.upperBound;
    e.copy(c), t.set(u.x, c.y, c.z), n.set(u.x, u.y, c.z), i.set(c.x, u.y, u.z), s.set(u.x, c.y, u.z), a.set(c.x, u.y, c.z), o.set(c.x, c.y, u.z), l.copy(u);
  }
  /**
   * Get the representation of an AABB in another frame.
   * @return The "target" AABB object.
   */
  toLocalFrame(e, t) {
    const n = Na, i = n[0], s = n[1], a = n[2], o = n[3], l = n[4], c = n[5], u = n[6], d = n[7];
    this.getCorners(i, s, a, o, l, c, u, d);
    for (let h = 0; h !== 8; h++) {
      const f = n[h];
      e.pointToLocal(f, f);
    }
    return t.setFromPoints(n);
  }
  /**
   * Get the representation of an AABB in the global frame.
   * @return The "target" AABB object.
   */
  toWorldFrame(e, t) {
    const n = Na, i = n[0], s = n[1], a = n[2], o = n[3], l = n[4], c = n[5], u = n[6], d = n[7];
    this.getCorners(i, s, a, o, l, c, u, d);
    for (let h = 0; h !== 8; h++) {
      const f = n[h];
      e.pointToWorld(f, f);
    }
    return t.setFromPoints(n);
  }
  /**
   * Check if the AABB is hit by a ray.
   */
  overlapsRay(e) {
    const {
      direction: t,
      from: n
    } = e, i = 1 / t.x, s = 1 / t.y, a = 1 / t.z, o = (this.lowerBound.x - n.x) * i, l = (this.upperBound.x - n.x) * i, c = (this.lowerBound.y - n.y) * s, u = (this.upperBound.y - n.y) * s, d = (this.lowerBound.z - n.z) * a, h = (this.upperBound.z - n.z) * a, f = Math.max(Math.max(Math.min(o, l), Math.min(c, u)), Math.min(d, h)), g = Math.min(Math.min(Math.max(o, l), Math.max(c, u)), Math.max(d, h));
    return !(g < 0 || f > g);
  }
}
const Da = new y(), Na = [new y(), new y(), new y(), new y(), new y(), new y(), new y(), new y()];
class Ua {
  /**
   * The matrix storage.
   */
  constructor() {
    this.matrix = [];
  }
  /**
   * Get an element
   */
  get(e, t) {
    let {
      index: n
    } = e, {
      index: i
    } = t;
    if (i > n) {
      const s = i;
      i = n, n = s;
    }
    return this.matrix[(n * (n + 1) >> 1) + i - 1];
  }
  /**
   * Set an element
   */
  set(e, t, n) {
    let {
      index: i
    } = e, {
      index: s
    } = t;
    if (s > i) {
      const a = s;
      s = i, i = a;
    }
    this.matrix[(i * (i + 1) >> 1) + s - 1] = n ? 1 : 0;
  }
  /**
   * Sets all elements to zero
   */
  reset() {
    for (let e = 0, t = this.matrix.length; e !== t; e++)
      this.matrix[e] = 0;
  }
  /**
   * Sets the max number of objects
   */
  setNumObjects(e) {
    this.matrix.length = e * (e - 1) >> 1;
  }
}
class xo {
  /**
   * Add an event listener
   * @return The self object, for chainability.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    return n[e] === void 0 && (n[e] = []), n[e].includes(t) || n[e].push(t), this;
  }
  /**
   * Check if an event listener is added
   */
  hasEventListener(e, t) {
    if (this._listeners === void 0)
      return !1;
    const n = this._listeners;
    return !!(n[e] !== void 0 && n[e].includes(t));
  }
  /**
   * Check if any event listener of the given type is added
   */
  hasAnyEventListener(e) {
    return this._listeners === void 0 ? !1 : this._listeners[e] !== void 0;
  }
  /**
   * Remove an event listener
   * @return The self object, for chainability.
   */
  removeEventListener(e, t) {
    if (this._listeners === void 0)
      return this;
    const n = this._listeners;
    if (n[e] === void 0)
      return this;
    const i = n[e].indexOf(t);
    return i !== -1 && n[e].splice(i, 1), this;
  }
  /**
   * Emit an event.
   * @return The self object, for chainability.
   */
  dispatchEvent(e) {
    if (this._listeners === void 0)
      return this;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      for (let i = 0, s = n.length; i < s; i++)
        n[i].call(this, e);
    }
    return this;
  }
}
class vt {
  constructor(e, t, n, i) {
    e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), i === void 0 && (i = 1), this.x = e, this.y = t, this.z = n, this.w = i;
  }
  /**
   * Set the value of the quaternion.
   */
  set(e, t, n, i) {
    return this.x = e, this.y = t, this.z = n, this.w = i, this;
  }
  /**
   * Convert to a readable format
   * @return "x,y,z,w"
   */
  toString() {
    return `${this.x},${this.y},${this.z},${this.w}`;
  }
  /**
   * Convert to an Array
   * @return [x, y, z, w]
   */
  toArray() {
    return [this.x, this.y, this.z, this.w];
  }
  /**
   * Set the quaternion components given an axis and an angle in radians.
   */
  setFromAxisAngle(e, t) {
    const n = Math.sin(t * 0.5);
    return this.x = e.x * n, this.y = e.y * n, this.z = e.z * n, this.w = Math.cos(t * 0.5), this;
  }
  /**
   * Converts the quaternion to [ axis, angle ] representation.
   * @param targetAxis A vector object to reuse for storing the axis.
   * @return An array, first element is the axis and the second is the angle in radians.
   */
  toAxisAngle(e) {
    e === void 0 && (e = new y()), this.normalize();
    const t = 2 * Math.acos(this.w), n = Math.sqrt(1 - this.w * this.w);
    return n < 1e-3 ? (e.x = this.x, e.y = this.y, e.z = this.z) : (e.x = this.x / n, e.y = this.y / n, e.z = this.z / n), [e, t];
  }
  /**
   * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
   */
  setFromVectors(e, t) {
    if (e.isAntiparallelTo(t)) {
      const n = Nf, i = Uf;
      e.tangents(n, i), this.setFromAxisAngle(n, Math.PI);
    } else {
      const n = e.cross(t);
      this.x = n.x, this.y = n.y, this.z = n.z, this.w = Math.sqrt(e.length() ** 2 * t.length() ** 2) + e.dot(t), this.normalize();
    }
    return this;
  }
  /**
   * Multiply the quaternion with an other quaternion.
   */
  mult(e, t) {
    t === void 0 && (t = new vt());
    const n = this.x, i = this.y, s = this.z, a = this.w, o = e.x, l = e.y, c = e.z, u = e.w;
    return t.x = n * u + a * o + i * c - s * l, t.y = i * u + a * l + s * o - n * c, t.z = s * u + a * c + n * l - i * o, t.w = a * u - n * o - i * l - s * c, t;
  }
  /**
   * Get the inverse quaternion rotation.
   */
  inverse(e) {
    e === void 0 && (e = new vt());
    const t = this.x, n = this.y, i = this.z, s = this.w;
    this.conjugate(e);
    const a = 1 / (t * t + n * n + i * i + s * s);
    return e.x *= a, e.y *= a, e.z *= a, e.w *= a, e;
  }
  /**
   * Get the quaternion conjugate
   */
  conjugate(e) {
    return e === void 0 && (e = new vt()), e.x = -this.x, e.y = -this.y, e.z = -this.z, e.w = this.w, e;
  }
  /**
   * Normalize the quaternion. Note that this changes the values of the quaternion.
   */
  normalize() {
    let e = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    return e === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (e = 1 / e, this.x *= e, this.y *= e, this.z *= e, this.w *= e), this;
  }
  /**
   * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
   * @author unphased, https://github.com/unphased
   */
  normalizeFast() {
    const e = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
    return e === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (this.x *= e, this.y *= e, this.z *= e, this.w *= e), this;
  }
  /**
   * Multiply the quaternion by a vector
   */
  vmult(e, t) {
    t === void 0 && (t = new y());
    const n = e.x, i = e.y, s = e.z, a = this.x, o = this.y, l = this.z, c = this.w, u = c * n + o * s - l * i, d = c * i + l * n - a * s, h = c * s + a * i - o * n, f = -a * n - o * i - l * s;
    return t.x = u * c + f * -a + d * -l - h * -o, t.y = d * c + f * -o + h * -a - u * -l, t.z = h * c + f * -l + u * -o - d * -a, t;
  }
  /**
   * Copies value of source to this quaternion.
   * @return this
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w, this;
  }
  /**
   * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: https://www.euclideanspace.com/maths/standards/index.htm
   * @param order Three-character string, defaults to "YZX"
   */
  toEuler(e, t) {
    t === void 0 && (t = "YZX");
    let n, i, s;
    const a = this.x, o = this.y, l = this.z, c = this.w;
    switch (t) {
      case "YZX":
        const u = a * o + l * c;
        if (u > 0.499 && (n = 2 * Math.atan2(a, c), i = Math.PI / 2, s = 0), u < -0.499 && (n = -2 * Math.atan2(a, c), i = -Math.PI / 2, s = 0), n === void 0) {
          const d = a * a, h = o * o, f = l * l;
          n = Math.atan2(2 * o * c - 2 * a * l, 1 - 2 * h - 2 * f), i = Math.asin(2 * u), s = Math.atan2(2 * a * c - 2 * o * l, 1 - 2 * d - 2 * f);
        }
        break;
      default:
        throw new Error(`Euler order ${t} not supported yet.`);
    }
    e.y = n, e.z = i, e.x = s;
  }
  /**
   * Set the quaternion components given Euler angle representation.
   *
   * @param order The order to apply angles: 'XYZ' or 'YXZ' or any other combination.
   *
   * See {@link https://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors MathWorks} reference
   */
  setFromEuler(e, t, n, i) {
    i === void 0 && (i = "XYZ");
    const s = Math.cos(e / 2), a = Math.cos(t / 2), o = Math.cos(n / 2), l = Math.sin(e / 2), c = Math.sin(t / 2), u = Math.sin(n / 2);
    return i === "XYZ" ? (this.x = l * a * o + s * c * u, this.y = s * c * o - l * a * u, this.z = s * a * u + l * c * o, this.w = s * a * o - l * c * u) : i === "YXZ" ? (this.x = l * a * o + s * c * u, this.y = s * c * o - l * a * u, this.z = s * a * u - l * c * o, this.w = s * a * o + l * c * u) : i === "ZXY" ? (this.x = l * a * o - s * c * u, this.y = s * c * o + l * a * u, this.z = s * a * u + l * c * o, this.w = s * a * o - l * c * u) : i === "ZYX" ? (this.x = l * a * o - s * c * u, this.y = s * c * o + l * a * u, this.z = s * a * u - l * c * o, this.w = s * a * o + l * c * u) : i === "YZX" ? (this.x = l * a * o + s * c * u, this.y = s * c * o + l * a * u, this.z = s * a * u - l * c * o, this.w = s * a * o - l * c * u) : i === "XZY" && (this.x = l * a * o - s * c * u, this.y = s * c * o - l * a * u, this.z = s * a * u + l * c * o, this.w = s * a * o + l * c * u), this;
  }
  clone() {
    return new vt(this.x, this.y, this.z, this.w);
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param toQuat second operand
   * @param t interpolation amount between the self quaternion and toQuat
   * @param target A quaternion to store the result in. If not provided, a new one will be created.
   * @returns {Quaternion} The "target" object
   */
  slerp(e, t, n) {
    n === void 0 && (n = new vt());
    const i = this.x, s = this.y, a = this.z, o = this.w;
    let l = e.x, c = e.y, u = e.z, d = e.w, h, f, g, x, m;
    return f = i * l + s * c + a * u + o * d, f < 0 && (f = -f, l = -l, c = -c, u = -u, d = -d), 1 - f > 1e-6 ? (h = Math.acos(f), g = Math.sin(h), x = Math.sin((1 - t) * h) / g, m = Math.sin(t * h) / g) : (x = 1 - t, m = t), n.x = x * i + m * l, n.y = x * s + m * c, n.z = x * a + m * u, n.w = x * o + m * d, n;
  }
  /**
   * Rotate an absolute orientation quaternion given an angular velocity and a time step.
   */
  integrate(e, t, n, i) {
    i === void 0 && (i = new vt());
    const s = e.x * n.x, a = e.y * n.y, o = e.z * n.z, l = this.x, c = this.y, u = this.z, d = this.w, h = t * 0.5;
    return i.x += h * (s * d + a * u - o * c), i.y += h * (a * d + o * l - s * u), i.z += h * (o * d + s * c - a * l), i.w += h * (-s * l - a * c - o * u), i;
  }
}
const Nf = new y(), Uf = new y(), Bf = {
  /** SPHERE */
  SPHERE: 1,
  /** PLANE */
  PLANE: 2,
  /** BOX */
  BOX: 4,
  /** COMPOUND */
  COMPOUND: 8,
  /** CONVEXPOLYHEDRON */
  CONVEXPOLYHEDRON: 16,
  /** HEIGHTFIELD */
  HEIGHTFIELD: 32,
  /** PARTICLE */
  PARTICLE: 64,
  /** CYLINDER */
  CYLINDER: 128,
  /** TRIMESH */
  TRIMESH: 256
};
class xe {
  /**
   * Identifier of the Shape.
   */
  /**
   * The type of this shape. Must be set to an int > 0 by subclasses.
   */
  /**
   * The local bounding sphere radius of this shape.
   */
  /**
   * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
   * @default true
   */
  /**
   * @default 1
   */
  /**
   * @default -1
   */
  /**
   * Optional material of the shape that regulates contact properties.
   */
  /**
   * The body to which the shape is added to.
   */
  /**
   * All the Shape types.
   */
  constructor(e) {
    e === void 0 && (e = {}), this.id = xe.idCounter++, this.type = e.type || 0, this.boundingSphereRadius = 0, this.collisionResponse = e.collisionResponse ? e.collisionResponse : !0, this.collisionFilterGroup = e.collisionFilterGroup !== void 0 ? e.collisionFilterGroup : 1, this.collisionFilterMask = e.collisionFilterMask !== void 0 ? e.collisionFilterMask : -1, this.material = e.material ? e.material : null, this.body = null;
  }
  /**
   * Computes the bounding sphere radius.
   * The result is stored in the property `.boundingSphereRadius`
   */
  updateBoundingSphereRadius() {
    throw `computeBoundingSphereRadius() not implemented for shape type ${this.type}`;
  }
  /**
   * Get the volume of this shape
   */
  volume() {
    throw `volume() not implemented for shape type ${this.type}`;
  }
  /**
   * Calculates the inertia in the local frame for this shape.
   * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
   */
  calculateLocalInertia(e, t) {
    throw `calculateLocalInertia() not implemented for shape type ${this.type}`;
  }
  /**
   * @todo use abstract for these kind of methods
   */
  calculateWorldAABB(e, t, n, i) {
    throw `calculateWorldAABB() not implemented for shape type ${this.type}`;
  }
}
xe.idCounter = 0;
xe.types = Bf;
class Ze {
  /**
   * position
   */
  /**
   * quaternion
   */
  constructor(e) {
    e === void 0 && (e = {}), this.position = new y(), this.quaternion = new vt(), e.position && this.position.copy(e.position), e.quaternion && this.quaternion.copy(e.quaternion);
  }
  /**
   * Get a global point in local transform coordinates.
   */
  pointToLocal(e, t) {
    return Ze.pointToLocalFrame(this.position, this.quaternion, e, t);
  }
  /**
   * Get a local point in global transform coordinates.
   */
  pointToWorld(e, t) {
    return Ze.pointToWorldFrame(this.position, this.quaternion, e, t);
  }
  /**
   * vectorToWorldFrame
   */
  vectorToWorldFrame(e, t) {
    return t === void 0 && (t = new y()), this.quaternion.vmult(e, t), t;
  }
  /**
   * pointToLocalFrame
   */
  static pointToLocalFrame(e, t, n, i) {
    return i === void 0 && (i = new y()), n.vsub(e, i), t.conjugate(Ba), Ba.vmult(i, i), i;
  }
  /**
   * pointToWorldFrame
   */
  static pointToWorldFrame(e, t, n, i) {
    return i === void 0 && (i = new y()), t.vmult(n, i), i.vadd(e, i), i;
  }
  /**
   * vectorToWorldFrame
   */
  static vectorToWorldFrame(e, t, n) {
    return n === void 0 && (n = new y()), e.vmult(t, n), n;
  }
  /**
   * vectorToLocalFrame
   */
  static vectorToLocalFrame(e, t, n, i) {
    return i === void 0 && (i = new y()), t.w *= -1, t.vmult(n, i), t.w *= -1, i;
  }
}
const Ba = new vt();
class Ii extends xe {
  /** vertices */
  /**
   * Array of integer arrays, indicating which vertices each face consists of
   */
  /** faceNormals */
  /** worldVertices */
  /** worldVerticesNeedsUpdate */
  /** worldFaceNormals */
  /** worldFaceNormalsNeedsUpdate */
  /**
   * If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
   */
  /** uniqueEdges */
  /**
   * @param vertices An array of Vec3's
   * @param faces Array of integer arrays, describing which vertices that is included in each face.
   */
  constructor(e) {
    e === void 0 && (e = {});
    const {
      vertices: t = [],
      faces: n = [],
      normals: i = [],
      axes: s,
      boundingSphereRadius: a
    } = e;
    super({
      type: xe.types.CONVEXPOLYHEDRON
    }), this.vertices = t, this.faces = n, this.faceNormals = i, this.faceNormals.length === 0 && this.computeNormals(), a ? this.boundingSphereRadius = a : this.updateBoundingSphereRadius(), this.worldVertices = [], this.worldVerticesNeedsUpdate = !0, this.worldFaceNormals = [], this.worldFaceNormalsNeedsUpdate = !0, this.uniqueAxes = s ? s.slice() : null, this.uniqueEdges = [], this.computeEdges();
  }
  /**
   * Computes uniqueEdges
   */
  computeEdges() {
    const e = this.faces, t = this.vertices, n = this.uniqueEdges;
    n.length = 0;
    const i = new y();
    for (let s = 0; s !== e.length; s++) {
      const a = e[s], o = a.length;
      for (let l = 0; l !== o; l++) {
        const c = (l + 1) % o;
        t[a[l]].vsub(t[a[c]], i), i.normalize();
        let u = !1;
        for (let d = 0; d !== n.length; d++)
          if (n[d].almostEquals(i) || n[d].almostEquals(i)) {
            u = !0;
            break;
          }
        u || n.push(i.clone());
      }
    }
  }
  /**
   * Compute the normals of the faces.
   * Will reuse existing Vec3 objects in the `faceNormals` array if they exist.
   */
  computeNormals() {
    this.faceNormals.length = this.faces.length;
    for (let e = 0; e < this.faces.length; e++) {
      for (let i = 0; i < this.faces[e].length; i++)
        if (!this.vertices[this.faces[e][i]])
          throw new Error(`Vertex ${this.faces[e][i]} not found!`);
      const t = this.faceNormals[e] || new y();
      this.getFaceNormal(e, t), t.negate(t), this.faceNormals[e] = t;
      const n = this.vertices[this.faces[e][0]];
      if (t.dot(n) < 0) {
        console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);
        for (let i = 0; i < this.faces[e].length; i++)
          console.warn(`.vertices[${this.faces[e][i]}] = Vec3(${this.vertices[this.faces[e][i]].toString()})`);
      }
    }
  }
  /**
   * Compute the normal of a face from its vertices
   */
  getFaceNormal(e, t) {
    const n = this.faces[e], i = this.vertices[n[0]], s = this.vertices[n[1]], a = this.vertices[n[2]];
    Ii.computeNormal(i, s, a, t);
  }
  /**
   * Get face normal given 3 vertices
   */
  static computeNormal(e, t, n, i) {
    const s = new y(), a = new y();
    t.vsub(e, a), n.vsub(t, s), s.cross(a, i), i.isZero() || i.normalize();
  }
  /**
   * @param minDist Clamp distance
   * @param result The an array of contact point objects, see clipFaceAgainstHull
   */
  clipAgainstHull(e, t, n, i, s, a, o, l, c) {
    const u = new y();
    let d = -1, h = -Number.MAX_VALUE;
    for (let g = 0; g < n.faces.length; g++) {
      u.copy(n.faceNormals[g]), s.vmult(u, u);
      const x = u.dot(a);
      x > h && (h = x, d = g);
    }
    const f = [];
    for (let g = 0; g < n.faces[d].length; g++) {
      const x = n.vertices[n.faces[d][g]], m = new y();
      m.copy(x), s.vmult(m, m), i.vadd(m, m), f.push(m);
    }
    d >= 0 && this.clipFaceAgainstHull(a, e, t, f, o, l, c);
  }
  /**
   * Find the separating axis between this hull and another
   * @param target The target vector to save the axis in
   * @return Returns false if a separation is found, else true
   */
  findSeparatingAxis(e, t, n, i, s, a, o, l) {
    const c = new y(), u = new y(), d = new y(), h = new y(), f = new y(), g = new y();
    let x = Number.MAX_VALUE;
    const m = this;
    if (m.uniqueAxes)
      for (let p = 0; p !== m.uniqueAxes.length; p++) {
        n.vmult(m.uniqueAxes[p], c);
        const M = m.testSepAxis(c, e, t, n, i, s);
        if (M === !1)
          return !1;
        M < x && (x = M, a.copy(c));
      }
    else {
      const p = o ? o.length : m.faces.length;
      for (let M = 0; M < p; M++) {
        const A = o ? o[M] : M;
        c.copy(m.faceNormals[A]), n.vmult(c, c);
        const S = m.testSepAxis(c, e, t, n, i, s);
        if (S === !1)
          return !1;
        S < x && (x = S, a.copy(c));
      }
    }
    if (e.uniqueAxes)
      for (let p = 0; p !== e.uniqueAxes.length; p++) {
        s.vmult(e.uniqueAxes[p], u);
        const M = m.testSepAxis(u, e, t, n, i, s);
        if (M === !1)
          return !1;
        M < x && (x = M, a.copy(u));
      }
    else {
      const p = l ? l.length : e.faces.length;
      for (let M = 0; M < p; M++) {
        const A = l ? l[M] : M;
        u.copy(e.faceNormals[A]), s.vmult(u, u);
        const S = m.testSepAxis(u, e, t, n, i, s);
        if (S === !1)
          return !1;
        S < x && (x = S, a.copy(u));
      }
    }
    for (let p = 0; p !== m.uniqueEdges.length; p++) {
      n.vmult(m.uniqueEdges[p], h);
      for (let M = 0; M !== e.uniqueEdges.length; M++)
        if (s.vmult(e.uniqueEdges[M], f), h.cross(f, g), !g.almostZero()) {
          g.normalize();
          const A = m.testSepAxis(g, e, t, n, i, s);
          if (A === !1)
            return !1;
          A < x && (x = A, a.copy(g));
        }
    }
    return i.vsub(t, d), d.dot(a) > 0 && a.negate(a), !0;
  }
  /**
   * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
   * @return The overlap depth, or FALSE if no penetration.
   */
  testSepAxis(e, t, n, i, s, a) {
    const o = this;
    Ii.project(o, e, n, i, nr), Ii.project(t, e, s, a, ir);
    const l = nr[0], c = nr[1], u = ir[0], d = ir[1];
    if (l < d || u < c)
      return !1;
    const h = l - d, f = u - c;
    return h < f ? h : f;
  }
  /**
   * calculateLocalInertia
   */
  calculateLocalInertia(e, t) {
    const n = new y(), i = new y();
    this.computeLocalAABB(i, n);
    const s = n.x - i.x, a = n.y - i.y, o = n.z - i.z;
    t.x = 1 / 12 * e * (2 * a * 2 * a + 2 * o * 2 * o), t.y = 1 / 12 * e * (2 * s * 2 * s + 2 * o * 2 * o), t.z = 1 / 12 * e * (2 * a * 2 * a + 2 * s * 2 * s);
  }
  /**
   * @param face_i Index of the face
   */
  getPlaneConstantOfFace(e) {
    const t = this.faces[e], n = this.faceNormals[e], i = this.vertices[t[0]];
    return -n.dot(i);
  }
  /**
   * Clip a face against a hull.
   * @param worldVertsB1 An array of Vec3 with vertices in the world frame.
   * @param minDist Distance clamping
   * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
   */
  clipFaceAgainstHull(e, t, n, i, s, a, o) {
    const l = new y(), c = new y(), u = new y(), d = new y(), h = new y(), f = new y(), g = new y(), x = new y(), m = this, p = [], M = i, A = p;
    let S = -1, b = Number.MAX_VALUE;
    for (let P = 0; P < m.faces.length; P++) {
      l.copy(m.faceNormals[P]), n.vmult(l, l);
      const F = l.dot(e);
      F < b && (b = F, S = P);
    }
    if (S < 0)
      return;
    const T = m.faces[S];
    T.connectedFaces = [];
    for (let P = 0; P < m.faces.length; P++)
      for (let F = 0; F < m.faces[P].length; F++)
        /* Sharing a vertex*/
        T.indexOf(m.faces[P][F]) !== -1 && /* Not the one we are looking for connections from */
        P !== S && /* Not already added */
        T.connectedFaces.indexOf(P) === -1 && T.connectedFaces.push(P);
    const C = T.length;
    for (let P = 0; P < C; P++) {
      const F = m.vertices[T[P]], L = m.vertices[T[(P + 1) % C]];
      F.vsub(L, c), u.copy(c), n.vmult(u, u), t.vadd(u, u), d.copy(this.faceNormals[S]), n.vmult(d, d), t.vadd(d, d), u.cross(d, h), h.negate(h), f.copy(F), n.vmult(f, f), t.vadd(f, f);
      const I = T.connectedFaces[P];
      g.copy(this.faceNormals[I]);
      const U = this.getPlaneConstantOfFace(I);
      x.copy(g), n.vmult(x, x);
      const D = U - x.dot(t);
      for (this.clipFaceAgainstPlane(M, A, x, D); M.length; )
        M.shift();
      for (; A.length; )
        M.push(A.shift());
    }
    g.copy(this.faceNormals[S]);
    const v = this.getPlaneConstantOfFace(S);
    x.copy(g), n.vmult(x, x);
    const w = v - x.dot(t);
    for (let P = 0; P < M.length; P++) {
      let F = x.dot(M[P]) + w;
      if (F <= s && (console.log(`clamped: depth=${F} to minDist=${s}`), F = s), F <= a) {
        const L = M[P];
        if (F <= 1e-6) {
          const I = {
            point: L,
            normal: x,
            depth: F
          };
          o.push(I);
        }
      }
    }
  }
  /**
   * Clip a face in a hull against the back of a plane.
   * @param planeConstant The constant in the mathematical plane equation
   */
  clipFaceAgainstPlane(e, t, n, i) {
    let s, a;
    const o = e.length;
    if (o < 2)
      return t;
    let l = e[e.length - 1], c = e[0];
    s = n.dot(l) + i;
    for (let u = 0; u < o; u++) {
      if (c = e[u], a = n.dot(c) + i, s < 0)
        if (a < 0) {
          const d = new y();
          d.copy(c), t.push(d);
        } else {
          const d = new y();
          l.lerp(c, s / (s - a), d), t.push(d);
        }
      else if (a < 0) {
        const d = new y();
        l.lerp(c, s / (s - a), d), t.push(d), t.push(c);
      }
      l = c, s = a;
    }
    return t;
  }
  /**
   * Updates `.worldVertices` and sets `.worldVerticesNeedsUpdate` to false.
   */
  computeWorldVertices(e, t) {
    for (; this.worldVertices.length < this.vertices.length; )
      this.worldVertices.push(new y());
    const n = this.vertices, i = this.worldVertices;
    for (let s = 0; s !== this.vertices.length; s++)
      t.vmult(n[s], i[s]), e.vadd(i[s], i[s]);
    this.worldVerticesNeedsUpdate = !1;
  }
  computeLocalAABB(e, t) {
    const n = this.vertices;
    e.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), t.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
    for (let i = 0; i < this.vertices.length; i++) {
      const s = n[i];
      s.x < e.x ? e.x = s.x : s.x > t.x && (t.x = s.x), s.y < e.y ? e.y = s.y : s.y > t.y && (t.y = s.y), s.z < e.z ? e.z = s.z : s.z > t.z && (t.z = s.z);
    }
  }
  /**
   * Updates `worldVertices` and sets `worldVerticesNeedsUpdate` to false.
   */
  computeWorldFaceNormals(e) {
    const t = this.faceNormals.length;
    for (; this.worldFaceNormals.length < t; )
      this.worldFaceNormals.push(new y());
    const n = this.faceNormals, i = this.worldFaceNormals;
    for (let s = 0; s !== t; s++)
      e.vmult(n[s], i[s]);
    this.worldFaceNormalsNeedsUpdate = !1;
  }
  /**
   * updateBoundingSphereRadius
   */
  updateBoundingSphereRadius() {
    let e = 0;
    const t = this.vertices;
    for (let n = 0; n !== t.length; n++) {
      const i = t[n].lengthSquared();
      i > e && (e = i);
    }
    this.boundingSphereRadius = Math.sqrt(e);
  }
  /**
   * calculateWorldAABB
   */
  calculateWorldAABB(e, t, n, i) {
    const s = this.vertices;
    let a, o, l, c, u, d, h = new y();
    for (let f = 0; f < s.length; f++) {
      h.copy(s[f]), t.vmult(h, h), e.vadd(h, h);
      const g = h;
      (a === void 0 || g.x < a) && (a = g.x), (c === void 0 || g.x > c) && (c = g.x), (o === void 0 || g.y < o) && (o = g.y), (u === void 0 || g.y > u) && (u = g.y), (l === void 0 || g.z < l) && (l = g.z), (d === void 0 || g.z > d) && (d = g.z);
    }
    n.set(a, o, l), i.set(c, u, d);
  }
  /**
   * Get approximate convex volume
   */
  volume() {
    return 4 * Math.PI * this.boundingSphereRadius / 3;
  }
  /**
   * Get an average of all the vertices positions
   */
  getAveragePointLocal(e) {
    e === void 0 && (e = new y());
    const t = this.vertices;
    for (let n = 0; n < t.length; n++)
      e.vadd(t[n], e);
    return e.scale(1 / t.length, e), e;
  }
  /**
   * Transform all local points. Will change the .vertices
   */
  transformAllPoints(e, t) {
    const n = this.vertices.length, i = this.vertices;
    if (t) {
      for (let s = 0; s < n; s++) {
        const a = i[s];
        t.vmult(a, a);
      }
      for (let s = 0; s < this.faceNormals.length; s++) {
        const a = this.faceNormals[s];
        t.vmult(a, a);
      }
    }
    if (e)
      for (let s = 0; s < n; s++) {
        const a = i[s];
        a.vadd(e, a);
      }
  }
  /**
   * Checks whether p is inside the polyhedra. Must be in local coords.
   * The point lies outside of the convex hull of the other points if and only if the direction
   * of all the vectors from it to those other points are on less than one half of a sphere around it.
   * @param p A point given in local coordinates
   */
  pointIsInside(e) {
    const t = this.vertices, n = this.faces, i = this.faceNormals, s = new y();
    this.getAveragePointLocal(s);
    for (let a = 0; a < this.faces.length; a++) {
      let o = i[a];
      const l = t[n[a][0]], c = new y();
      e.vsub(l, c);
      const u = o.dot(c), d = new y();
      s.vsub(l, d);
      const h = o.dot(d);
      if (u < 0 && h > 0 || u > 0 && h < 0)
        return !1;
    }
    return -1;
  }
  /**
   * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis.
   * Results are saved in the array maxmin.
   * @param result result[0] and result[1] will be set to maximum and minimum, respectively.
   */
  static project(e, t, n, i, s) {
    const a = e.vertices.length, o = Of;
    let l = 0, c = 0;
    const u = zf, d = e.vertices;
    u.setZero(), Ze.vectorToLocalFrame(n, i, t, o), Ze.pointToLocalFrame(n, i, u, u);
    const h = u.dot(o);
    c = l = d[0].dot(o);
    for (let f = 1; f < a; f++) {
      const g = d[f].dot(o);
      g > l && (l = g), g < c && (c = g);
    }
    if (c -= h, l -= h, c > l) {
      const f = c;
      c = l, l = f;
    }
    s[0] = l, s[1] = c;
  }
}
const nr = [], ir = [];
new y();
const Of = new y(), zf = new y();
class Ss extends xe {
  /**
   * The half extents of the box.
   */
  /**
   * Used by the contact generator to make contacts with other convex polyhedra for example.
   */
  constructor(e) {
    super({
      type: xe.types.BOX
    }), this.halfExtents = e, this.convexPolyhedronRepresentation = null, this.updateConvexPolyhedronRepresentation(), this.updateBoundingSphereRadius();
  }
  /**
   * Updates the local convex polyhedron representation used for some collisions.
   */
  updateConvexPolyhedronRepresentation() {
    const e = this.halfExtents.x, t = this.halfExtents.y, n = this.halfExtents.z, i = y, s = [new i(-e, -t, -n), new i(e, -t, -n), new i(e, t, -n), new i(-e, t, -n), new i(-e, -t, n), new i(e, -t, n), new i(e, t, n), new i(-e, t, n)], a = [
      [3, 2, 1, 0],
      // -z
      [4, 5, 6, 7],
      // +z
      [5, 4, 0, 1],
      // -y
      [2, 3, 7, 6],
      // +y
      [0, 4, 7, 3],
      // -x
      [1, 2, 6, 5]
      // +x
    ], o = [new i(0, 0, 1), new i(0, 1, 0), new i(1, 0, 0)], l = new Ii({
      vertices: s,
      faces: a,
      axes: o
    });
    this.convexPolyhedronRepresentation = l, l.material = this.material;
  }
  /**
   * Calculate the inertia of the box.
   */
  calculateLocalInertia(e, t) {
    return t === void 0 && (t = new y()), Ss.calculateInertia(this.halfExtents, e, t), t;
  }
  static calculateInertia(e, t, n) {
    const i = e;
    n.x = 1 / 12 * t * (2 * i.y * 2 * i.y + 2 * i.z * 2 * i.z), n.y = 1 / 12 * t * (2 * i.x * 2 * i.x + 2 * i.z * 2 * i.z), n.z = 1 / 12 * t * (2 * i.y * 2 * i.y + 2 * i.x * 2 * i.x);
  }
  /**
   * Get the box 6 side normals
   * @param sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
   * @param quat Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
   */
  getSideNormals(e, t) {
    const n = e, i = this.halfExtents;
    if (n[0].set(i.x, 0, 0), n[1].set(0, i.y, 0), n[2].set(0, 0, i.z), n[3].set(-i.x, 0, 0), n[4].set(0, -i.y, 0), n[5].set(0, 0, -i.z), t !== void 0)
      for (let s = 0; s !== n.length; s++)
        t.vmult(n[s], n[s]);
    return n;
  }
  /**
   * Returns the volume of the box.
   */
  volume() {
    return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
  }
  /**
   * updateBoundingSphereRadius
   */
  updateBoundingSphereRadius() {
    this.boundingSphereRadius = this.halfExtents.length();
  }
  /**
   * forEachWorldCorner
   */
  forEachWorldCorner(e, t, n) {
    const i = this.halfExtents, s = [[i.x, i.y, i.z], [-i.x, i.y, i.z], [-i.x, -i.y, i.z], [-i.x, -i.y, -i.z], [i.x, -i.y, -i.z], [i.x, i.y, -i.z], [-i.x, i.y, -i.z], [i.x, -i.y, i.z]];
    for (let a = 0; a < s.length; a++)
      Fn.set(s[a][0], s[a][1], s[a][2]), t.vmult(Fn, Fn), e.vadd(Fn, Fn), n(Fn.x, Fn.y, Fn.z);
  }
  /**
   * calculateWorldAABB
   */
  calculateWorldAABB(e, t, n, i) {
    const s = this.halfExtents;
    sn[0].set(s.x, s.y, s.z), sn[1].set(-s.x, s.y, s.z), sn[2].set(-s.x, -s.y, s.z), sn[3].set(-s.x, -s.y, -s.z), sn[4].set(s.x, -s.y, -s.z), sn[5].set(s.x, s.y, -s.z), sn[6].set(-s.x, s.y, -s.z), sn[7].set(s.x, -s.y, s.z);
    const a = sn[0];
    t.vmult(a, a), e.vadd(a, a), i.copy(a), n.copy(a);
    for (let o = 1; o < 8; o++) {
      const l = sn[o];
      t.vmult(l, l), e.vadd(l, l);
      const c = l.x, u = l.y, d = l.z;
      c > i.x && (i.x = c), u > i.y && (i.y = u), d > i.z && (i.z = d), c < n.x && (n.x = c), u < n.y && (n.y = u), d < n.z && (n.z = d);
    }
  }
}
const Fn = new y(), sn = [new y(), new y(), new y(), new y(), new y(), new y(), new y(), new y()], Mr = {
  /** DYNAMIC */
  DYNAMIC: 1,
  /** STATIC */
  STATIC: 2,
  /** KINEMATIC */
  KINEMATIC: 4
}, Sr = {
  /** AWAKE */
  AWAKE: 0,
  /** SLEEPY */
  SLEEPY: 1,
  /** SLEEPING */
  SLEEPING: 2
};
class Me extends xo {
  /**
   * Dispatched after two bodies collide. This event is dispatched on each
   * of the two bodies involved in the collision.
   * @event collide
   * @param body The body that was involved in the collision.
   * @param contact The details of the collision.
   */
  /**
   * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
   */
  /**
   * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
   */
  /**
   * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
   */
  /**
   * AWAKE
   */
  /**
   * SLEEPY
   */
  /**
   * SLEEPING
   */
  /**
   * Dispatched after a sleeping body has woken up.
   * @event wakeup
   */
  /**
   * Dispatched after a body has gone in to the sleepy state.
   * @event sleepy
   */
  /**
   * Dispatched after a body has fallen asleep.
   * @event sleep
   */
  constructor(e) {
    e === void 0 && (e = {}), super(), this.id = Me.idCounter++, this.index = -1, this.world = null, this.vlambda = new y(), this.collisionFilterGroup = typeof e.collisionFilterGroup == "number" ? e.collisionFilterGroup : 1, this.collisionFilterMask = typeof e.collisionFilterMask == "number" ? e.collisionFilterMask : -1, this.collisionResponse = typeof e.collisionResponse == "boolean" ? e.collisionResponse : !0, this.position = new y(), this.previousPosition = new y(), this.interpolatedPosition = new y(), this.initPosition = new y(), e.position && (this.position.copy(e.position), this.previousPosition.copy(e.position), this.interpolatedPosition.copy(e.position), this.initPosition.copy(e.position)), this.velocity = new y(), e.velocity && this.velocity.copy(e.velocity), this.initVelocity = new y(), this.force = new y();
    const t = typeof e.mass == "number" ? e.mass : 0;
    this.mass = t, this.invMass = t > 0 ? 1 / t : 0, this.material = e.material || null, this.linearDamping = typeof e.linearDamping == "number" ? e.linearDamping : 0.01, this.type = t <= 0 ? Me.STATIC : Me.DYNAMIC, typeof e.type == typeof Me.STATIC && (this.type = e.type), this.allowSleep = typeof e.allowSleep < "u" ? e.allowSleep : !0, this.sleepState = Me.AWAKE, this.sleepSpeedLimit = typeof e.sleepSpeedLimit < "u" ? e.sleepSpeedLimit : 0.1, this.sleepTimeLimit = typeof e.sleepTimeLimit < "u" ? e.sleepTimeLimit : 1, this.timeLastSleepy = 0, this.wakeUpAfterNarrowphase = !1, this.torque = new y(), this.quaternion = new vt(), this.initQuaternion = new vt(), this.previousQuaternion = new vt(), this.interpolatedQuaternion = new vt(), e.quaternion && (this.quaternion.copy(e.quaternion), this.initQuaternion.copy(e.quaternion), this.previousQuaternion.copy(e.quaternion), this.interpolatedQuaternion.copy(e.quaternion)), this.angularVelocity = new y(), e.angularVelocity && this.angularVelocity.copy(e.angularVelocity), this.initAngularVelocity = new y(), this.shapes = [], this.shapeOffsets = [], this.shapeOrientations = [], this.inertia = new y(), this.invInertia = new y(), this.invInertiaWorld = new Jt(), this.invMassSolve = 0, this.invInertiaSolve = new y(), this.invInertiaWorldSolve = new Jt(), this.fixedRotation = typeof e.fixedRotation < "u" ? e.fixedRotation : !1, this.angularDamping = typeof e.angularDamping < "u" ? e.angularDamping : 0.01, this.linearFactor = new y(1, 1, 1), e.linearFactor && this.linearFactor.copy(e.linearFactor), this.angularFactor = new y(1, 1, 1), e.angularFactor && this.angularFactor.copy(e.angularFactor), this.aabb = new Gt(), this.aabbNeedsUpdate = !0, this.boundingRadius = 0, this.wlambda = new y(), this.isTrigger = !!e.isTrigger, e.shape && this.addShape(e.shape), this.updateMassProperties();
  }
  /**
   * Wake the body up.
   */
  wakeUp() {
    const e = this.sleepState;
    this.sleepState = Me.AWAKE, this.wakeUpAfterNarrowphase = !1, e === Me.SLEEPING && this.dispatchEvent(Me.wakeupEvent);
  }
  /**
   * Force body sleep
   */
  sleep() {
    this.sleepState = Me.SLEEPING, this.velocity.set(0, 0, 0), this.angularVelocity.set(0, 0, 0), this.wakeUpAfterNarrowphase = !1;
  }
  /**
   * Called every timestep to update internal sleep timer and change sleep state if needed.
   * @param time The world time in seconds
   */
  sleepTick(e) {
    if (this.allowSleep) {
      const t = this.sleepState, n = this.velocity.lengthSquared() + this.angularVelocity.lengthSquared(), i = this.sleepSpeedLimit ** 2;
      t === Me.AWAKE && n < i ? (this.sleepState = Me.SLEEPY, this.timeLastSleepy = e, this.dispatchEvent(Me.sleepyEvent)) : t === Me.SLEEPY && n > i ? this.wakeUp() : t === Me.SLEEPY && e - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(), this.dispatchEvent(Me.sleepEvent));
    }
  }
  /**
   * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
   */
  updateSolveMassProperties() {
    this.sleepState === Me.SLEEPING || this.type === Me.KINEMATIC ? (this.invMassSolve = 0, this.invInertiaSolve.setZero(), this.invInertiaWorldSolve.setZero()) : (this.invMassSolve = this.invMass, this.invInertiaSolve.copy(this.invInertia), this.invInertiaWorldSolve.copy(this.invInertiaWorld));
  }
  /**
   * Convert a world point to local body frame.
   */
  pointToLocalFrame(e, t) {
    return t === void 0 && (t = new y()), e.vsub(this.position, t), this.quaternion.conjugate().vmult(t, t), t;
  }
  /**
   * Convert a world vector to local body frame.
   */
  vectorToLocalFrame(e, t) {
    return t === void 0 && (t = new y()), this.quaternion.conjugate().vmult(e, t), t;
  }
  /**
   * Convert a local body point to world frame.
   */
  pointToWorldFrame(e, t) {
    return t === void 0 && (t = new y()), this.quaternion.vmult(e, t), t.vadd(this.position, t), t;
  }
  /**
   * Convert a local body point to world frame.
   */
  vectorToWorldFrame(e, t) {
    return t === void 0 && (t = new y()), this.quaternion.vmult(e, t), t;
  }
  /**
   * Add a shape to the body with a local offset and orientation.
   * @return The body object, for chainability.
   */
  addShape(e, t, n) {
    const i = new y(), s = new vt();
    return t && i.copy(t), n && s.copy(n), this.shapes.push(e), this.shapeOffsets.push(i), this.shapeOrientations.push(s), this.updateMassProperties(), this.updateBoundingRadius(), this.aabbNeedsUpdate = !0, e.body = this, this;
  }
  /**
   * Remove a shape from the body.
   * @return The body object, for chainability.
   */
  removeShape(e) {
    const t = this.shapes.indexOf(e);
    return t === -1 ? (console.warn("Shape does not belong to the body"), this) : (this.shapes.splice(t, 1), this.shapeOffsets.splice(t, 1), this.shapeOrientations.splice(t, 1), this.updateMassProperties(), this.updateBoundingRadius(), this.aabbNeedsUpdate = !0, e.body = null, this);
  }
  /**
   * Update the bounding radius of the body. Should be done if any of the shapes are changed.
   */
  updateBoundingRadius() {
    const e = this.shapes, t = this.shapeOffsets, n = e.length;
    let i = 0;
    for (let s = 0; s !== n; s++) {
      const a = e[s];
      a.updateBoundingSphereRadius();
      const o = t[s].length(), l = a.boundingSphereRadius;
      o + l > i && (i = o + l);
    }
    this.boundingRadius = i;
  }
  /**
   * Updates the .aabb
   */
  updateAABB() {
    const e = this.shapes, t = this.shapeOffsets, n = this.shapeOrientations, i = e.length, s = Gf, a = Vf, o = this.quaternion, l = this.aabb, c = Hf;
    for (let u = 0; u !== i; u++) {
      const d = e[u];
      o.vmult(t[u], s), s.vadd(this.position, s), o.mult(n[u], a), d.calculateWorldAABB(s, a, c.lowerBound, c.upperBound), u === 0 ? l.copy(c) : l.extend(c);
    }
    this.aabbNeedsUpdate = !1;
  }
  /**
   * Update `.inertiaWorld` and `.invInertiaWorld`
   */
  updateInertiaWorld(e) {
    const t = this.invInertia;
    if (!(t.x === t.y && t.y === t.z && !e)) {
      const n = kf, i = Wf;
      n.setRotationFromQuaternion(this.quaternion), n.transpose(i), n.scale(t, n), n.mmult(i, this.invInertiaWorld);
    }
  }
  /**
   * Apply force to a point of the body. This could for example be a point on the Body surface.
   * Applying force this way will add to Body.force and Body.torque.
   * @param force The amount of force to add.
   * @param relativePoint A point relative to the center of mass to apply the force on.
   */
  applyForce(e, t) {
    if (t === void 0 && (t = new y()), this.type !== Me.DYNAMIC)
      return;
    this.sleepState === Me.SLEEPING && this.wakeUp();
    const n = Xf;
    t.cross(e, n), this.force.vadd(e, this.force), this.torque.vadd(n, this.torque);
  }
  /**
   * Apply force to a local point in the body.
   * @param force The force vector to apply, defined locally in the body frame.
   * @param localPoint A local point in the body to apply the force on.
   */
  applyLocalForce(e, t) {
    if (t === void 0 && (t = new y()), this.type !== Me.DYNAMIC)
      return;
    const n = qf, i = Yf;
    this.vectorToWorldFrame(e, n), this.vectorToWorldFrame(t, i), this.applyForce(n, i);
  }
  /**
   * Apply torque to the body.
   * @param torque The amount of torque to add.
   */
  applyTorque(e) {
    this.type === Me.DYNAMIC && (this.sleepState === Me.SLEEPING && this.wakeUp(), this.torque.vadd(e, this.torque));
  }
  /**
   * Apply impulse to a point of the body. This could for example be a point on the Body surface.
   * An impulse is a force added to a body during a short period of time (impulse = force * time).
   * Impulses will be added to Body.velocity and Body.angularVelocity.
   * @param impulse The amount of impulse to add.
   * @param relativePoint A point relative to the center of mass to apply the force on.
   */
  applyImpulse(e, t) {
    if (t === void 0 && (t = new y()), this.type !== Me.DYNAMIC)
      return;
    this.sleepState === Me.SLEEPING && this.wakeUp();
    const n = t, i = Kf;
    i.copy(e), i.scale(this.invMass, i), this.velocity.vadd(i, this.velocity);
    const s = Zf;
    n.cross(e, s), this.invInertiaWorld.vmult(s, s), this.angularVelocity.vadd(s, this.angularVelocity);
  }
  /**
   * Apply locally-defined impulse to a local point in the body.
   * @param force The force vector to apply, defined locally in the body frame.
   * @param localPoint A local point in the body to apply the force on.
   */
  applyLocalImpulse(e, t) {
    if (t === void 0 && (t = new y()), this.type !== Me.DYNAMIC)
      return;
    const n = $f, i = Jf;
    this.vectorToWorldFrame(e, n), this.vectorToWorldFrame(t, i), this.applyImpulse(n, i);
  }
  /**
   * Should be called whenever you change the body shape or mass.
   */
  updateMassProperties() {
    const e = Qf;
    this.invMass = this.mass > 0 ? 1 / this.mass : 0;
    const t = this.inertia, n = this.fixedRotation;
    this.updateAABB(), e.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2), Ss.calculateInertia(e, this.mass, t), this.invInertia.set(t.x > 0 && !n ? 1 / t.x : 0, t.y > 0 && !n ? 1 / t.y : 0, t.z > 0 && !n ? 1 / t.z : 0), this.updateInertiaWorld(!0);
  }
  /**
   * Get world velocity of a point in the body.
   * @param worldPoint
   * @param result
   * @return The result vector.
   */
  getVelocityAtWorldPoint(e, t) {
    const n = new y();
    return e.vsub(this.position, n), this.angularVelocity.cross(n, t), this.velocity.vadd(t, t), t;
  }
  /**
   * Move the body forward in time.
   * @param dt Time step
   * @param quatNormalize Set to true to normalize the body quaternion
   * @param quatNormalizeFast If the quaternion should be normalized using "fast" quaternion normalization
   */
  integrate(e, t, n) {
    if (this.previousPosition.copy(this.position), this.previousQuaternion.copy(this.quaternion), !(this.type === Me.DYNAMIC || this.type === Me.KINEMATIC) || this.sleepState === Me.SLEEPING)
      return;
    const i = this.velocity, s = this.angularVelocity, a = this.position, o = this.force, l = this.torque, c = this.quaternion, u = this.invMass, d = this.invInertiaWorld, h = this.linearFactor, f = u * e;
    i.x += o.x * f * h.x, i.y += o.y * f * h.y, i.z += o.z * f * h.z;
    const g = d.elements, x = this.angularFactor, m = l.x * x.x, p = l.y * x.y, M = l.z * x.z;
    s.x += e * (g[0] * m + g[1] * p + g[2] * M), s.y += e * (g[3] * m + g[4] * p + g[5] * M), s.z += e * (g[6] * m + g[7] * p + g[8] * M), a.x += i.x * e, a.y += i.y * e, a.z += i.z * e, c.integrate(this.angularVelocity, e, this.angularFactor, c), t && (n ? c.normalizeFast() : c.normalize()), this.aabbNeedsUpdate = !0, this.updateInertiaWorld();
  }
}
Me.idCounter = 0;
Me.COLLIDE_EVENT_NAME = "collide";
Me.DYNAMIC = Mr.DYNAMIC;
Me.STATIC = Mr.STATIC;
Me.KINEMATIC = Mr.KINEMATIC;
Me.AWAKE = Sr.AWAKE;
Me.SLEEPY = Sr.SLEEPY;
Me.SLEEPING = Sr.SLEEPING;
Me.wakeupEvent = {
  type: "wakeup"
};
Me.sleepyEvent = {
  type: "sleepy"
};
Me.sleepEvent = {
  type: "sleep"
};
const Gf = new y(), Vf = new vt(), Hf = new Gt(), kf = new Jt(), Wf = new Jt();
new Jt();
const Xf = new y(), qf = new y(), Yf = new y(), Kf = new y(), Zf = new y(), $f = new y(), Jf = new y(), Qf = new y();
class jf {
  /**
   * The world to search for collisions in.
   */
  /**
   * If set to true, the broadphase uses bounding boxes for intersection tests, else it uses bounding spheres.
   */
  /**
   * Set to true if the objects in the world moved.
   */
  constructor() {
    this.world = null, this.useBoundingBoxes = !1, this.dirty = !0;
  }
  /**
   * Get the collision pairs from the world
   * @param world The world to search in
   * @param p1 Empty array to be filled with body objects
   * @param p2 Empty array to be filled with body objects
   */
  collisionPairs(e, t, n) {
    throw new Error("collisionPairs not implemented for this BroadPhase class!");
  }
  /**
   * Check if a body pair needs to be intersection tested at all.
   */
  needBroadphaseCollision(e, t) {
    return !(!(e.collisionFilterGroup & t.collisionFilterMask) || !(t.collisionFilterGroup & e.collisionFilterMask) || (e.type & Me.STATIC || e.sleepState === Me.SLEEPING) && (t.type & Me.STATIC || t.sleepState === Me.SLEEPING));
  }
  /**
   * Check if the bounding volumes of two bodies intersect.
   */
  intersectionTest(e, t, n, i) {
    this.useBoundingBoxes ? this.doBoundingBoxBroadphase(e, t, n, i) : this.doBoundingSphereBroadphase(e, t, n, i);
  }
  /**
   * Check if the bounding spheres of two bodies are intersecting.
   * @param pairs1 bodyA is appended to this array if intersection
   * @param pairs2 bodyB is appended to this array if intersection
   */
  doBoundingSphereBroadphase(e, t, n, i) {
    const s = ep;
    t.position.vsub(e.position, s);
    const a = (e.boundingRadius + t.boundingRadius) ** 2;
    s.lengthSquared() < a && (n.push(e), i.push(t));
  }
  /**
   * Check if the bounding boxes of two bodies are intersecting.
   */
  doBoundingBoxBroadphase(e, t, n, i) {
    e.aabbNeedsUpdate && e.updateAABB(), t.aabbNeedsUpdate && t.updateAABB(), e.aabb.overlaps(t.aabb) && (n.push(e), i.push(t));
  }
  /**
   * Removes duplicate pairs from the pair arrays.
   */
  makePairsUnique(e, t) {
    const n = tp, i = np, s = ip, a = e.length;
    for (let o = 0; o !== a; o++)
      i[o] = e[o], s[o] = t[o];
    e.length = 0, t.length = 0;
    for (let o = 0; o !== a; o++) {
      const l = i[o].id, c = s[o].id, u = l < c ? `${l},${c}` : `${c},${l}`;
      n[u] = o, n.keys.push(u);
    }
    for (let o = 0; o !== n.keys.length; o++) {
      const l = n.keys.pop(), c = n[l];
      e.push(i[c]), t.push(s[c]), delete n[l];
    }
  }
  /**
   * To be implemented by subcasses
   */
  setWorld(e) {
  }
  /**
   * Check if the bounding spheres of two bodies overlap.
   */
  static boundingSphereCheck(e, t) {
    const n = new y();
    e.position.vsub(t.position, n);
    const i = e.shapes[0], s = t.shapes[0];
    return Math.pow(i.boundingSphereRadius + s.boundingSphereRadius, 2) > n.lengthSquared();
  }
  /**
   * Returns all the bodies within the AABB.
   */
  aabbQuery(e, t, n) {
    return console.warn(".aabbQuery is not implemented in this Broadphase subclass."), [];
  }
}
const ep = new y();
new y();
new vt();
new y();
const tp = {
  keys: []
}, np = [], ip = [];
new y();
new y();
new y();
class sp extends jf {
  /**
   * @todo Remove useless constructor
   */
  constructor() {
    super();
  }
  /**
   * Get all the collision pairs in the physics world
   */
  collisionPairs(e, t, n) {
    const i = e.bodies, s = i.length;
    let a, o;
    for (let l = 0; l !== s; l++)
      for (let c = 0; c !== l; c++)
        a = i[l], o = i[c], this.needBroadphaseCollision(a, o) && this.intersectionTest(a, o, t, n);
  }
  /**
   * Returns all the bodies within an AABB.
   * @param result An array to store resulting bodies in.
   */
  aabbQuery(e, t, n) {
    n === void 0 && (n = []);
    for (let i = 0; i < e.bodies.length; i++) {
      const s = e.bodies[i];
      s.aabbNeedsUpdate && s.updateAABB(), s.aabb.overlaps(t) && n.push(s);
    }
    return n;
  }
}
class gs {
  /**
   * rayFromWorld
   */
  /**
   * rayToWorld
   */
  /**
   * hitNormalWorld
   */
  /**
   * hitPointWorld
   */
  /**
   * hasHit
   */
  /**
   * shape
   */
  /**
   * body
   */
  /**
   * The index of the hit triangle, if the hit shape was a trimesh
   */
  /**
   * Distance to the hit. Will be set to -1 if there was no hit
   */
  /**
   * If the ray should stop traversing the bodies
   */
  constructor() {
    this.rayFromWorld = new y(), this.rayToWorld = new y(), this.hitNormalWorld = new y(), this.hitPointWorld = new y(), this.hasHit = !1, this.shape = null, this.body = null, this.hitFaceIndex = -1, this.distance = -1, this.shouldStop = !1;
  }
  /**
   * Reset all result data.
   */
  reset() {
    this.rayFromWorld.setZero(), this.rayToWorld.setZero(), this.hitNormalWorld.setZero(), this.hitPointWorld.setZero(), this.hasHit = !1, this.shape = null, this.body = null, this.hitFaceIndex = -1, this.distance = -1, this.shouldStop = !1;
  }
  /**
   * abort
   */
  abort() {
    this.shouldStop = !0;
  }
  /**
   * Set result data.
   */
  set(e, t, n, i, s, a, o) {
    this.rayFromWorld.copy(e), this.rayToWorld.copy(t), this.hitNormalWorld.copy(n), this.hitPointWorld.copy(i), this.shape = s, this.body = a, this.distance = o;
  }
}
let Mo, So, yo, Eo, To, bo, Ao;
const yr = {
  /** CLOSEST */
  CLOSEST: 1,
  /** ANY */
  ANY: 2,
  /** ALL */
  ALL: 4
};
Mo = xe.types.SPHERE;
So = xe.types.PLANE;
yo = xe.types.BOX;
Eo = xe.types.CYLINDER;
To = xe.types.CONVEXPOLYHEDRON;
bo = xe.types.HEIGHTFIELD;
Ao = xe.types.TRIMESH;
class _t {
  /**
   * from
   */
  /**
   * to
   */
  /**
   * direction
   */
  /**
   * The precision of the ray. Used when checking parallelity etc.
   * @default 0.0001
   */
  /**
   * Set to `false` if you don't want the Ray to take `collisionResponse` flags into account on bodies and shapes.
   * @default true
   */
  /**
   * If set to `true`, the ray skips any hits with normal.dot(rayDirection) < 0.
   * @default false
   */
  /**
   * collisionFilterMask
   * @default -1
   */
  /**
   * collisionFilterGroup
   * @default -1
   */
  /**
   * The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
   * @default RAY.ANY
   */
  /**
   * Current result object.
   */
  /**
   * Will be set to `true` during intersectWorld() if the ray hit anything.
   */
  /**
   * User-provided result callback. Will be used if mode is Ray.ALL.
   */
  /**
   * CLOSEST
   */
  /**
   * ANY
   */
  /**
   * ALL
   */
  get [Mo]() {
    return this._intersectSphere;
  }
  get [So]() {
    return this._intersectPlane;
  }
  get [yo]() {
    return this._intersectBox;
  }
  get [Eo]() {
    return this._intersectConvex;
  }
  get [To]() {
    return this._intersectConvex;
  }
  get [bo]() {
    return this._intersectHeightfield;
  }
  get [Ao]() {
    return this._intersectTrimesh;
  }
  constructor(e, t) {
    e === void 0 && (e = new y()), t === void 0 && (t = new y()), this.from = e.clone(), this.to = t.clone(), this.direction = new y(), this.precision = 1e-4, this.checkCollisionResponse = !0, this.skipBackfaces = !1, this.collisionFilterMask = -1, this.collisionFilterGroup = -1, this.mode = _t.ANY, this.result = new gs(), this.hasHit = !1, this.callback = (n) => {
    };
  }
  /**
   * Do itersection against all bodies in the given World.
   * @return True if the ray hit anything, otherwise false.
   */
  intersectWorld(e, t) {
    return this.mode = t.mode || _t.ANY, this.result = t.result || new gs(), this.skipBackfaces = !!t.skipBackfaces, this.collisionFilterMask = typeof t.collisionFilterMask < "u" ? t.collisionFilterMask : -1, this.collisionFilterGroup = typeof t.collisionFilterGroup < "u" ? t.collisionFilterGroup : -1, this.checkCollisionResponse = typeof t.checkCollisionResponse < "u" ? t.checkCollisionResponse : !0, t.from && this.from.copy(t.from), t.to && this.to.copy(t.to), this.callback = t.callback || (() => {
    }), this.hasHit = !1, this.result.reset(), this.updateDirection(), this.getAABB(Oa), sr.length = 0, e.broadphase.aabbQuery(e, Oa, sr), this.intersectBodies(sr), this.hasHit;
  }
  /**
   * Shoot a ray at a body, get back information about the hit.
   * @deprecated @param result set the result property of the Ray instead.
   */
  intersectBody(e, t) {
    t && (this.result = t, this.updateDirection());
    const n = this.checkCollisionResponse;
    if (n && !e.collisionResponse || !(this.collisionFilterGroup & e.collisionFilterMask) || !(e.collisionFilterGroup & this.collisionFilterMask))
      return;
    const i = rp, s = ap;
    for (let a = 0, o = e.shapes.length; a < o; a++) {
      const l = e.shapes[a];
      if (!(n && !l.collisionResponse) && (e.quaternion.mult(e.shapeOrientations[a], s), e.quaternion.vmult(e.shapeOffsets[a], i), i.vadd(e.position, i), this.intersectShape(l, s, i, e), this.result.shouldStop))
        break;
    }
  }
  /**
   * Shoot a ray at an array bodies, get back information about the hit.
   * @param bodies An array of Body objects.
   * @deprecated @param result set the result property of the Ray instead.
   *
   */
  intersectBodies(e, t) {
    t && (this.result = t, this.updateDirection());
    for (let n = 0, i = e.length; !this.result.shouldStop && n < i; n++)
      this.intersectBody(e[n]);
  }
  /**
   * Updates the direction vector.
   */
  updateDirection() {
    this.to.vsub(this.from, this.direction), this.direction.normalize();
  }
  intersectShape(e, t, n, i) {
    const s = this.from;
    if (Mp(s, this.direction, n) > e.boundingSphereRadius)
      return;
    const o = this[e.type];
    o && o.call(this, e, t, n, i, e);
  }
  _intersectBox(e, t, n, i, s) {
    return this._intersectConvex(e.convexPolyhedronRepresentation, t, n, i, s);
  }
  _intersectPlane(e, t, n, i, s) {
    const a = this.from, o = this.to, l = this.direction, c = new y(0, 0, 1);
    t.vmult(c, c);
    const u = new y();
    a.vsub(n, u);
    const d = u.dot(c);
    o.vsub(n, u);
    const h = u.dot(c);
    if (d * h > 0 || a.distanceTo(o) < d)
      return;
    const f = c.dot(l);
    if (Math.abs(f) < this.precision)
      return;
    const g = new y(), x = new y(), m = new y();
    a.vsub(n, g);
    const p = -c.dot(g) / f;
    l.scale(p, x), a.vadd(x, m), this.reportIntersection(c, m, s, i, -1);
  }
  /**
   * Get the world AABB of the ray.
   */
  getAABB(e) {
    const {
      lowerBound: t,
      upperBound: n
    } = e, i = this.to, s = this.from;
    t.x = Math.min(i.x, s.x), t.y = Math.min(i.y, s.y), t.z = Math.min(i.z, s.z), n.x = Math.max(i.x, s.x), n.y = Math.max(i.y, s.y), n.z = Math.max(i.z, s.z);
  }
  _intersectHeightfield(e, t, n, i, s) {
    e.data, e.elementSize;
    const a = op;
    a.from.copy(this.from), a.to.copy(this.to), Ze.pointToLocalFrame(n, t, a.from, a.from), Ze.pointToLocalFrame(n, t, a.to, a.to), a.updateDirection();
    const o = lp;
    let l, c, u, d;
    l = c = 0, u = d = e.data.length - 1;
    const h = new Gt();
    a.getAABB(h), e.getIndexOfPosition(h.lowerBound.x, h.lowerBound.y, o, !0), l = Math.max(l, o[0]), c = Math.max(c, o[1]), e.getIndexOfPosition(h.upperBound.x, h.upperBound.y, o, !0), u = Math.min(u, o[0] + 1), d = Math.min(d, o[1] + 1);
    for (let f = l; f < u; f++)
      for (let g = c; g < d; g++) {
        if (this.result.shouldStop)
          return;
        if (e.getAabbAtIndex(f, g, h), !!h.overlapsRay(a)) {
          if (e.getConvexTrianglePillar(f, g, !1), Ze.pointToWorldFrame(n, t, e.pillarOffset, as), this._intersectConvex(e.pillarConvex, t, as, i, s, za), this.result.shouldStop)
            return;
          e.getConvexTrianglePillar(f, g, !0), Ze.pointToWorldFrame(n, t, e.pillarOffset, as), this._intersectConvex(e.pillarConvex, t, as, i, s, za);
        }
      }
  }
  _intersectSphere(e, t, n, i, s) {
    const a = this.from, o = this.to, l = e.radius, c = (o.x - a.x) ** 2 + (o.y - a.y) ** 2 + (o.z - a.z) ** 2, u = 2 * ((o.x - a.x) * (a.x - n.x) + (o.y - a.y) * (a.y - n.y) + (o.z - a.z) * (a.z - n.z)), d = (a.x - n.x) ** 2 + (a.y - n.y) ** 2 + (a.z - n.z) ** 2 - l ** 2, h = u ** 2 - 4 * c * d, f = cp, g = hp;
    if (!(h < 0))
      if (h === 0)
        a.lerp(o, h, f), f.vsub(n, g), g.normalize(), this.reportIntersection(g, f, s, i, -1);
      else {
        const x = (-u - Math.sqrt(h)) / (2 * c), m = (-u + Math.sqrt(h)) / (2 * c);
        if (x >= 0 && x <= 1 && (a.lerp(o, x, f), f.vsub(n, g), g.normalize(), this.reportIntersection(g, f, s, i, -1)), this.result.shouldStop)
          return;
        m >= 0 && m <= 1 && (a.lerp(o, m, f), f.vsub(n, g), g.normalize(), this.reportIntersection(g, f, s, i, -1));
      }
  }
  _intersectConvex(e, t, n, i, s, a) {
    const o = up, l = Ga, c = a && a.faceList || null, u = e.faces, d = e.vertices, h = e.faceNormals, f = this.direction, g = this.from, x = this.to, m = g.distanceTo(x), p = c ? c.length : u.length, M = this.result;
    for (let A = 0; !M.shouldStop && A < p; A++) {
      const S = c ? c[A] : A, b = u[S], T = h[S], C = t, v = n;
      l.copy(d[b[0]]), C.vmult(l, l), l.vadd(v, l), l.vsub(g, l), C.vmult(T, o);
      const w = f.dot(o);
      if (Math.abs(w) < this.precision)
        continue;
      const P = o.dot(l) / w;
      if (!(P < 0)) {
        f.scale(P, Nt), Nt.vadd(g, Nt), Kt.copy(d[b[0]]), C.vmult(Kt, Kt), v.vadd(Kt, Kt);
        for (let F = 1; !M.shouldStop && F < b.length - 1; F++) {
          rn.copy(d[b[F]]), an.copy(d[b[F + 1]]), C.vmult(rn, rn), C.vmult(an, an), v.vadd(rn, rn), v.vadd(an, an);
          const L = Nt.distanceTo(g);
          !(_t.pointInTriangle(Nt, Kt, rn, an) || _t.pointInTriangle(Nt, rn, Kt, an)) || L > m || this.reportIntersection(o, Nt, s, i, S);
        }
      }
    }
  }
  /**
   * @todo Optimize by transforming the world to local space first.
   * @todo Use Octree lookup
   */
  _intersectTrimesh(e, t, n, i, s, a) {
    const o = dp, l = vp, c = xp, u = Ga, d = fp, h = pp, f = mp, g = _p, x = gp, m = e.indices;
    e.vertices;
    const p = this.from, M = this.to, A = this.direction;
    c.position.copy(n), c.quaternion.copy(t), Ze.vectorToLocalFrame(n, t, A, d), Ze.pointToLocalFrame(n, t, p, h), Ze.pointToLocalFrame(n, t, M, f), f.x *= e.scale.x, f.y *= e.scale.y, f.z *= e.scale.z, h.x *= e.scale.x, h.y *= e.scale.y, h.z *= e.scale.z, f.vsub(h, d), d.normalize();
    const S = h.distanceSquared(f);
    e.tree.rayQuery(this, c, l);
    for (let b = 0, T = l.length; !this.result.shouldStop && b !== T; b++) {
      const C = l[b];
      e.getNormal(C, o), e.getVertex(m[C * 3], Kt), Kt.vsub(h, u);
      const v = d.dot(o), w = o.dot(u) / v;
      if (w < 0)
        continue;
      d.scale(w, Nt), Nt.vadd(h, Nt), e.getVertex(m[C * 3 + 1], rn), e.getVertex(m[C * 3 + 2], an);
      const P = Nt.distanceSquared(h);
      !(_t.pointInTriangle(Nt, rn, Kt, an) || _t.pointInTriangle(Nt, Kt, rn, an)) || P > S || (Ze.vectorToWorldFrame(t, o, x), Ze.pointToWorldFrame(n, t, Nt, g), this.reportIntersection(x, g, s, i, C));
    }
    l.length = 0;
  }
  /**
   * @return True if the intersections should continue
   */
  reportIntersection(e, t, n, i, s) {
    const a = this.from, o = this.to, l = a.distanceTo(t), c = this.result;
    if (!(this.skipBackfaces && e.dot(this.direction) > 0))
      switch (c.hitFaceIndex = typeof s < "u" ? s : -1, this.mode) {
        case _t.ALL:
          this.hasHit = !0, c.set(a, o, e, t, n, i, l), c.hasHit = !0, this.callback(c);
          break;
        case _t.CLOSEST:
          (l < c.distance || !c.hasHit) && (this.hasHit = !0, c.hasHit = !0, c.set(a, o, e, t, n, i, l));
          break;
        case _t.ANY:
          this.hasHit = !0, c.hasHit = !0, c.set(a, o, e, t, n, i, l), c.shouldStop = !0;
          break;
      }
  }
  /**
   * As per "Barycentric Technique" as named
   * {@link https://www.blackpawn.com/texts/pointinpoly/default.html here} but without the division
   */
  static pointInTriangle(e, t, n, i) {
    i.vsub(t, kn), n.vsub(t, Ti), e.vsub(t, rr);
    const s = kn.dot(kn), a = kn.dot(Ti), o = kn.dot(rr), l = Ti.dot(Ti), c = Ti.dot(rr);
    let u, d;
    return (u = l * o - a * c) >= 0 && (d = s * c - a * o) >= 0 && u + d < s * l - a * a;
  }
}
_t.CLOSEST = yr.CLOSEST;
_t.ANY = yr.ANY;
_t.ALL = yr.ALL;
const Oa = new Gt(), sr = [], Ti = new y(), rr = new y(), rp = new y(), ap = new vt(), Nt = new y(), Kt = new y(), rn = new y(), an = new y();
new y();
new gs();
const za = {
  faceList: [0]
}, as = new y(), op = new _t(), lp = [], cp = new y(), hp = new y(), up = new y();
new y();
new y();
const Ga = new y(), dp = new y(), fp = new y(), pp = new y(), mp = new y(), gp = new y(), _p = new y();
new Gt();
const vp = [], xp = new Ze(), kn = new y(), os = new y();
function Mp(r, e, t) {
  t.vsub(r, kn);
  const n = kn.dot(e);
  return e.scale(n, os), os.vadd(r, os), t.distanceTo(os);
}
class wo {
  /**
   * Extend an options object with default values.
   * @param options The options object. May be falsy: in this case, a new object is created and returned.
   * @param defaults An object containing default values.
   * @return The modified options object.
   */
  static defaults(e, t) {
    e === void 0 && (e = {});
    for (let n in t)
      n in e || (e[n] = t[n]);
    return e;
  }
}
class ys {
  /**
   * Equations to be solved in this constraint.
   */
  /**
   * Body A.
   */
  /**
   * Body B.
   */
  /**
   * Set to false if you don't want the bodies to collide when they are connected.
   */
  constructor(e, t, n) {
    n === void 0 && (n = {}), n = wo.defaults(n, {
      collideConnected: !0,
      wakeUpBodies: !0
    }), this.equations = [], this.bodyA = e, this.bodyB = t, this.id = ys.idCounter++, this.collideConnected = n.collideConnected, n.wakeUpBodies && (e && e.wakeUp(), t && t.wakeUp());
  }
  /**
   * Update all the equations with data.
   */
  update() {
    throw new Error("method update() not implmemented in this Constraint subclass!");
  }
  /**
   * Enables all equations in the constraint.
   */
  enable() {
    const e = this.equations;
    for (let t = 0; t < e.length; t++)
      e[t].enabled = !0;
  }
  /**
   * Disables all equations in the constraint.
   */
  disable() {
    const e = this.equations;
    for (let t = 0; t < e.length; t++)
      e[t].enabled = !1;
  }
}
ys.idCounter = 0;
class Va {
  /**
   * spatial
   */
  /**
   * rotational
   */
  constructor() {
    this.spatial = new y(), this.rotational = new y();
  }
  /**
   * Multiply with other JacobianElement
   */
  multiplyElement(e) {
    return e.spatial.dot(this.spatial) + e.rotational.dot(this.rotational);
  }
  /**
   * Multiply with two vectors
   */
  multiplyVectors(e, t) {
    return e.dot(this.spatial) + t.dot(this.rotational);
  }
}
class Xn {
  /**
   * Minimum (read: negative max) force to be applied by the constraint.
   */
  /**
   * Maximum (read: positive max) force to be applied by the constraint.
   */
  /**
   * SPOOK parameter
   */
  /**
   * SPOOK parameter
   */
  /**
   * SPOOK parameter
   */
  /**
   * A number, proportional to the force added to the bodies.
   */
  constructor(e, t, n, i) {
    n === void 0 && (n = -1e6), i === void 0 && (i = 1e6), this.id = Xn.idCounter++, this.minForce = n, this.maxForce = i, this.bi = e, this.bj = t, this.a = 0, this.b = 0, this.eps = 0, this.jacobianElementA = new Va(), this.jacobianElementB = new Va(), this.enabled = !0, this.multiplier = 0, this.setSpookParams(1e7, 4, 1 / 60);
  }
  /**
   * Recalculates a, b, and eps.
   *
   * The Equation constructor sets typical SPOOK parameters as such:
   * * `stiffness` = 1e7
   * * `relaxation` = 4
   * * `timeStep`= 1 / 60, _note the hardcoded refresh rate._
   */
  setSpookParams(e, t, n) {
    const i = t, s = e, a = n;
    this.a = 4 / (a * (1 + 4 * i)), this.b = 4 * i / (1 + 4 * i), this.eps = 4 / (a * a * s * (1 + 4 * i));
  }
  /**
   * Computes the right hand side of the SPOOK equation
   */
  computeB(e, t, n) {
    const i = this.computeGW(), s = this.computeGq(), a = this.computeGiMf();
    return -s * e - i * t - a * n;
  }
  /**
   * Computes G*q, where q are the generalized body coordinates
   */
  computeGq() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, i = this.bj, s = n.position, a = i.position;
    return e.spatial.dot(s) + t.spatial.dot(a);
  }
  /**
   * Computes G*W, where W are the body velocities
   */
  computeGW() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, i = this.bj, s = n.velocity, a = i.velocity, o = n.angularVelocity, l = i.angularVelocity;
    return e.multiplyVectors(s, o) + t.multiplyVectors(a, l);
  }
  /**
   * Computes G*Wlambda, where W are the body velocities
   */
  computeGWlambda() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, i = this.bj, s = n.vlambda, a = i.vlambda, o = n.wlambda, l = i.wlambda;
    return e.multiplyVectors(s, o) + t.multiplyVectors(a, l);
  }
  /**
   * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
   */
  computeGiMf() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, i = this.bj, s = n.force, a = n.torque, o = i.force, l = i.torque, c = n.invMassSolve, u = i.invMassSolve;
    return s.scale(c, Ha), o.scale(u, ka), n.invInertiaWorldSolve.vmult(a, Wa), i.invInertiaWorldSolve.vmult(l, Xa), e.multiplyVectors(Ha, Wa) + t.multiplyVectors(ka, Xa);
  }
  /**
   * Computes G*inv(M)*G'
   */
  computeGiMGt() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, i = this.bj, s = n.invMassSolve, a = i.invMassSolve, o = n.invInertiaWorldSolve, l = i.invInertiaWorldSolve;
    let c = s + a;
    return o.vmult(e.rotational, ls), c += ls.dot(e.rotational), l.vmult(t.rotational, ls), c += ls.dot(t.rotational), c;
  }
  /**
   * Add constraint velocity to the bodies.
   */
  addToWlambda(e) {
    const t = this.jacobianElementA, n = this.jacobianElementB, i = this.bi, s = this.bj, a = Sp;
    i.vlambda.addScaledVector(i.invMassSolve * e, t.spatial, i.vlambda), s.vlambda.addScaledVector(s.invMassSolve * e, n.spatial, s.vlambda), i.invInertiaWorldSolve.vmult(t.rotational, a), i.wlambda.addScaledVector(e, a, i.wlambda), s.invInertiaWorldSolve.vmult(n.rotational, a), s.wlambda.addScaledVector(e, a, s.wlambda);
  }
  /**
   * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
   */
  computeC() {
    return this.computeGiMGt() + this.eps;
  }
}
Xn.idCounter = 0;
const Ha = new y(), ka = new y(), Wa = new y(), Xa = new y(), ls = new y(), Sp = new y();
class ds extends Xn {
  /**
   * "bounciness": u1 = -e*u0
   */
  /**
   * World-oriented vector that goes from the center of bi to the contact point.
   */
  /**
   * World-oriented vector that starts in body j position and goes to the contact point.
   */
  /**
   * Contact normal, pointing out of body i.
   */
  constructor(e, t, n) {
    n === void 0 && (n = 1e6), super(e, t, 0, n), this.restitution = 0, this.ri = new y(), this.rj = new y(), this.ni = new y();
  }
  computeB(e) {
    const t = this.a, n = this.b, i = this.bi, s = this.bj, a = this.ri, o = this.rj, l = yp, c = Ep, u = i.velocity, d = i.angularVelocity;
    i.force, i.torque;
    const h = s.velocity, f = s.angularVelocity;
    s.force, s.torque;
    const g = Tp, x = this.jacobianElementA, m = this.jacobianElementB, p = this.ni;
    a.cross(p, l), o.cross(p, c), p.negate(x.spatial), l.negate(x.rotational), m.spatial.copy(p), m.rotational.copy(c), g.copy(s.position), g.vadd(o, g), g.vsub(i.position, g), g.vsub(a, g);
    const M = p.dot(g), A = this.restitution + 1, S = A * h.dot(p) - A * u.dot(p) + f.dot(c) - d.dot(l), b = this.computeGiMf();
    return -M * t - S * n - e * b;
  }
  /**
   * Get the current relative velocity in the contact point.
   */
  getImpactVelocityAlongNormal() {
    const e = bp, t = Ap, n = wp, i = Rp, s = Cp;
    return this.bi.position.vadd(this.ri, n), this.bj.position.vadd(this.rj, i), this.bi.getVelocityAtWorldPoint(n, e), this.bj.getVelocityAtWorldPoint(i, t), e.vsub(t, s), this.ni.dot(s);
  }
}
const yp = new y(), Ep = new y(), Tp = new y(), bp = new y(), Ap = new y(), wp = new y(), Rp = new y(), Cp = new y();
class Pp extends ys {
  /**
   * Pivot, defined locally in bodyA.
   */
  /**
   * Pivot, defined locally in bodyB.
   */
  /**
   * @param pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
   * @param bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
   * @param pivotB The point relative to the center of mass of bodyB which bodyB is constrained to.
   * @param maxForce The maximum force that should be applied to constrain the bodies.
   */
  constructor(e, t, n, i, s) {
    t === void 0 && (t = new y()), i === void 0 && (i = new y()), s === void 0 && (s = 1e6), super(e, n), this.pivotA = t.clone(), this.pivotB = i.clone();
    const a = this.equationX = new ds(e, n), o = this.equationY = new ds(e, n), l = this.equationZ = new ds(e, n);
    this.equations.push(a, o, l), a.minForce = o.minForce = l.minForce = -s, a.maxForce = o.maxForce = l.maxForce = s, a.ni.set(1, 0, 0), o.ni.set(0, 1, 0), l.ni.set(0, 0, 1);
  }
  update() {
    const e = this.bodyA, t = this.bodyB, n = this.equationX, i = this.equationY, s = this.equationZ;
    e.quaternion.vmult(this.pivotA, n.ri), t.quaternion.vmult(this.pivotB, n.rj), i.ri.copy(n.ri), i.rj.copy(n.rj), s.ri.copy(n.ri), s.rj.copy(n.rj);
  }
}
class Fp extends Xn {
  /**
   * Local axis in A
   */
  /**
   * Local axis in B
   */
  /**
   * The "cone angle" to keep
   */
  constructor(e, t, n) {
    n === void 0 && (n = {});
    const i = typeof n.maxForce < "u" ? n.maxForce : 1e6;
    super(e, t, -i, i), this.axisA = n.axisA ? n.axisA.clone() : new y(1, 0, 0), this.axisB = n.axisB ? n.axisB.clone() : new y(0, 1, 0), this.angle = typeof n.angle < "u" ? n.angle : 0;
  }
  computeB(e) {
    const t = this.a, n = this.b, i = this.axisA, s = this.axisB, a = Lp, o = Ip, l = this.jacobianElementA, c = this.jacobianElementB;
    i.cross(s, a), s.cross(i, o), l.rotational.copy(o), c.rotational.copy(a);
    const u = Math.cos(this.angle) - i.dot(s), d = this.computeGW(), h = this.computeGiMf();
    return -u * t - d * n - e * h;
  }
}
const Lp = new y(), Ip = new y();
class Dp extends Xn {
  /**
   * World oriented rotational axis.
   */
  /**
   * World oriented rotational axis.
   */
  /**
   * maxAngle
   */
  constructor(e, t, n) {
    n === void 0 && (n = {});
    const i = typeof n.maxForce < "u" ? n.maxForce : 1e6;
    super(e, t, -i, i), this.axisA = n.axisA ? n.axisA.clone() : new y(1, 0, 0), this.axisB = n.axisB ? n.axisB.clone() : new y(0, 1, 0), this.maxAngle = Math.PI / 2;
  }
  computeB(e) {
    const t = this.a, n = this.b, i = this.axisA, s = this.axisB, a = Np, o = Up, l = this.jacobianElementA, c = this.jacobianElementB;
    i.cross(s, a), s.cross(i, o), l.rotational.copy(o), c.rotational.copy(a);
    const u = Math.cos(this.maxAngle) - i.dot(s), d = this.computeGW(), h = this.computeGiMf();
    return -u * t - d * n - e * h;
  }
}
const Np = new y(), Up = new y();
class Bp extends Pp {
  /**
   * The axis direction for the constraint of the body A.
   */
  /**
   * The axis direction for the constraint of the body B.
   */
  /**
   * The aperture angle of the cone.
   */
  /**
   * The twist angle of the joint.
   */
  constructor(e, t, n) {
    n === void 0 && (n = {});
    const i = typeof n.maxForce < "u" ? n.maxForce : 1e6, s = n.pivotA ? n.pivotA.clone() : new y(), a = n.pivotB ? n.pivotB.clone() : new y();
    super(e, s, t, a, i), this.axisA = n.axisA ? n.axisA.clone() : new y(), this.axisB = n.axisB ? n.axisB.clone() : new y(), this.collideConnected = !!n.collideConnected, this.angle = typeof n.angle < "u" ? n.angle : 0;
    const o = this.coneEquation = new Fp(e, t, n), l = this.twistEquation = new Dp(e, t, n);
    this.twistAngle = typeof n.twistAngle < "u" ? n.twistAngle : 0, o.maxForce = 0, o.minForce = -i, l.maxForce = 0, l.minForce = -i, this.equations.push(o, l);
  }
  update() {
    const e = this.bodyA, t = this.bodyB, n = this.coneEquation, i = this.twistEquation;
    super.update(), e.vectorToWorldFrame(this.axisA, n.axisA), t.vectorToWorldFrame(this.axisB, n.axisB), this.axisA.tangents(i.axisA, i.axisA), e.vectorToWorldFrame(i.axisA, i.axisA), this.axisB.tangents(i.axisB, i.axisB), t.vectorToWorldFrame(i.axisB, i.axisB), n.angle = this.angle, i.maxAngle = this.twistAngle;
  }
}
new y();
new y();
new y();
new y();
new y();
new y();
class qa extends Xn {
  // Tangent
  /**
   * @param slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
   */
  constructor(e, t, n) {
    super(e, t, -n, n), this.ri = new y(), this.rj = new y(), this.t = new y();
  }
  computeB(e) {
    this.a;
    const t = this.b;
    this.bi, this.bj;
    const n = this.ri, i = this.rj, s = Op, a = zp, o = this.t;
    n.cross(o, s), i.cross(o, a);
    const l = this.jacobianElementA, c = this.jacobianElementB;
    o.negate(l.spatial), s.negate(l.rotational), c.spatial.copy(o), c.rotational.copy(a);
    const u = this.computeGW(), d = this.computeGiMf();
    return -u * t - e * d;
  }
}
const Op = new y(), zp = new y();
class Es {
  /**
   * Identifier of this material.
   */
  /**
   * Participating materials.
   */
  /**
   * Friction coefficient.
   * @default 0.3
   */
  /**
   * Restitution coefficient.
   * @default 0.3
   */
  /**
   * Stiffness of the produced contact equations.
   * @default 1e7
   */
  /**
   * Relaxation time of the produced contact equations.
   * @default 3
   */
  /**
   * Stiffness of the produced friction equations.
   * @default 1e7
   */
  /**
   * Relaxation time of the produced friction equations
   * @default 3
   */
  constructor(e, t, n) {
    n = wo.defaults(n, {
      friction: 0.3,
      restitution: 0.3,
      contactEquationStiffness: 1e7,
      contactEquationRelaxation: 3,
      frictionEquationStiffness: 1e7,
      frictionEquationRelaxation: 3
    }), this.id = Es.idCounter++, this.materials = [e, t], this.friction = n.friction, this.restitution = n.restitution, this.contactEquationStiffness = n.contactEquationStiffness, this.contactEquationRelaxation = n.contactEquationRelaxation, this.frictionEquationStiffness = n.frictionEquationStiffness, this.frictionEquationRelaxation = n.frictionEquationRelaxation;
  }
}
Es.idCounter = 0;
class Ts {
  /**
   * Material name.
   * If options is a string, name will be set to that string.
   * @todo Deprecate this
   */
  /** Material id. */
  /**
   * Friction for this material.
   * If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from `defaultContactMaterial` in the World will be used.
   */
  /**
   * Restitution for this material.
   * If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from `defaultContactMaterial` in the World will be used.
   */
  constructor(e) {
    e === void 0 && (e = {});
    let t = "";
    typeof e == "string" && (t = e, e = {}), this.name = t, this.id = Ts.idCounter++, this.friction = typeof e.friction < "u" ? e.friction : -1, this.restitution = typeof e.restitution < "u" ? e.restitution : -1;
  }
}
Ts.idCounter = 0;
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new _t();
new y();
new y();
new y();
new y(1, 0, 0), new y(0, 1, 0), new y(0, 0, 1);
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
class Tg extends xe {
  /** worldNormal */
  /** worldNormalNeedsUpdate */
  constructor() {
    super({
      type: xe.types.PLANE
    }), this.worldNormal = new y(), this.worldNormalNeedsUpdate = !0, this.boundingSphereRadius = Number.MAX_VALUE;
  }
  /** computeWorldNormal */
  computeWorldNormal(e) {
    const t = this.worldNormal;
    t.set(0, 0, 1), e.vmult(t, t), this.worldNormalNeedsUpdate = !1;
  }
  calculateLocalInertia(e, t) {
    return t === void 0 && (t = new y()), t;
  }
  volume() {
    return (
      // The plane is infinite...
      Number.MAX_VALUE
    );
  }
  calculateWorldAABB(e, t, n, i) {
    gn.set(0, 0, 1), t.vmult(gn, gn);
    const s = Number.MAX_VALUE;
    n.set(-s, -s, -s), i.set(s, s, s), gn.x === 1 ? i.x = e.x : gn.x === -1 && (n.x = e.x), gn.y === 1 ? i.y = e.y : gn.y === -1 && (n.y = e.y), gn.z === 1 ? i.z = e.z : gn.z === -1 && (n.z = e.z);
  }
  updateBoundingSphereRadius() {
    this.boundingSphereRadius = Number.MAX_VALUE;
  }
}
const gn = new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new Gt();
new y();
new Gt();
new y();
new y();
new y();
new y();
new y();
new y();
new y();
new Gt();
new y();
new Ze();
new Gt();
class Gp {
  /**
   * All equations to be solved
   */
  /**
   * @todo remove useless constructor
   */
  constructor() {
    this.equations = [];
  }
  /**
   * Should be implemented in subclasses!
   * @todo use abstract
   * @return number of iterations performed
   */
  solve(e, t) {
    return (
      // Should return the number of iterations done!
      0
    );
  }
  /**
   * Add an equation
   */
  addEquation(e) {
    e.enabled && !e.bi.isTrigger && !e.bj.isTrigger && this.equations.push(e);
  }
  /**
   * Remove an equation
   */
  removeEquation(e) {
    const t = this.equations, n = t.indexOf(e);
    n !== -1 && t.splice(n, 1);
  }
  /**
   * Add all equations
   */
  removeAllEquations() {
    this.equations.length = 0;
  }
}
class Vp extends Gp {
  /**
   * The number of solver iterations determines quality of the constraints in the world.
   * The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
   */
  /**
   * When tolerance is reached, the system is assumed to be converged.
   */
  /**
   * @todo remove useless constructor
   */
  constructor() {
    super(), this.iterations = 10, this.tolerance = 1e-7;
  }
  /**
   * Solve
   * @return number of iterations performed
   */
  solve(e, t) {
    let n = 0;
    const i = this.iterations, s = this.tolerance * this.tolerance, a = this.equations, o = a.length, l = t.bodies, c = l.length, u = e;
    let d, h, f, g, x, m;
    if (o !== 0)
      for (let S = 0; S !== c; S++)
        l[S].updateSolveMassProperties();
    const p = kp, M = Wp, A = Hp;
    p.length = o, M.length = o, A.length = o;
    for (let S = 0; S !== o; S++) {
      const b = a[S];
      A[S] = 0, M[S] = b.computeB(u), p[S] = 1 / b.computeC();
    }
    if (o !== 0) {
      for (let T = 0; T !== c; T++) {
        const C = l[T], v = C.vlambda, w = C.wlambda;
        v.set(0, 0, 0), w.set(0, 0, 0);
      }
      for (n = 0; n !== i; n++) {
        g = 0;
        for (let T = 0; T !== o; T++) {
          const C = a[T];
          d = M[T], h = p[T], m = A[T], x = C.computeGWlambda(), f = h * (d - x - C.eps * m), m + f < C.minForce ? f = C.minForce - m : m + f > C.maxForce && (f = C.maxForce - m), A[T] += f, g += f > 0 ? f : -f, C.addToWlambda(f);
        }
        if (g * g < s)
          break;
      }
      for (let T = 0; T !== c; T++) {
        const C = l[T], v = C.velocity, w = C.angularVelocity;
        C.vlambda.vmul(C.linearFactor, C.vlambda), v.vadd(C.vlambda, v), C.wlambda.vmul(C.angularFactor, C.wlambda), w.vadd(C.wlambda, w);
      }
      let S = a.length;
      const b = 1 / u;
      for (; S--; )
        a[S].multiplier = A[S] * b;
    }
    return n;
  }
}
const Hp = [], kp = [], Wp = [];
class Xp {
  constructor() {
    this.objects = [], this.type = Object;
  }
  /**
   * Release an object after use
   */
  release() {
    const e = arguments.length;
    for (let t = 0; t !== e; t++)
      this.objects.push(t < 0 || arguments.length <= t ? void 0 : arguments[t]);
    return this;
  }
  /**
   * Get an object
   */
  get() {
    return this.objects.length === 0 ? this.constructObject() : this.objects.pop();
  }
  /**
   * Construct an object. Should be implemented in each subclass.
   */
  constructObject() {
    throw new Error("constructObject() not implemented in this Pool subclass yet!");
  }
  /**
   * @return Self, for chaining
   */
  resize(e) {
    const t = this.objects;
    for (; t.length > e; )
      t.pop();
    for (; t.length < e; )
      t.push(this.constructObject());
    return this;
  }
}
class qp extends Xp {
  constructor() {
    super(...arguments), this.type = y;
  }
  /**
   * Construct a vector
   */
  constructObject() {
    return new y();
  }
}
const rt = {
  sphereSphere: xe.types.SPHERE,
  spherePlane: xe.types.SPHERE | xe.types.PLANE,
  boxBox: xe.types.BOX | xe.types.BOX,
  sphereBox: xe.types.SPHERE | xe.types.BOX,
  planeBox: xe.types.PLANE | xe.types.BOX,
  convexConvex: xe.types.CONVEXPOLYHEDRON,
  sphereConvex: xe.types.SPHERE | xe.types.CONVEXPOLYHEDRON,
  planeConvex: xe.types.PLANE | xe.types.CONVEXPOLYHEDRON,
  boxConvex: xe.types.BOX | xe.types.CONVEXPOLYHEDRON,
  sphereHeightfield: xe.types.SPHERE | xe.types.HEIGHTFIELD,
  boxHeightfield: xe.types.BOX | xe.types.HEIGHTFIELD,
  convexHeightfield: xe.types.CONVEXPOLYHEDRON | xe.types.HEIGHTFIELD,
  sphereParticle: xe.types.PARTICLE | xe.types.SPHERE,
  planeParticle: xe.types.PLANE | xe.types.PARTICLE,
  boxParticle: xe.types.BOX | xe.types.PARTICLE,
  convexParticle: xe.types.PARTICLE | xe.types.CONVEXPOLYHEDRON,
  cylinderCylinder: xe.types.CYLINDER,
  sphereCylinder: xe.types.SPHERE | xe.types.CYLINDER,
  planeCylinder: xe.types.PLANE | xe.types.CYLINDER,
  boxCylinder: xe.types.BOX | xe.types.CYLINDER,
  convexCylinder: xe.types.CONVEXPOLYHEDRON | xe.types.CYLINDER,
  heightfieldCylinder: xe.types.HEIGHTFIELD | xe.types.CYLINDER,
  particleCylinder: xe.types.PARTICLE | xe.types.CYLINDER,
  sphereTrimesh: xe.types.SPHERE | xe.types.TRIMESH,
  planeTrimesh: xe.types.PLANE | xe.types.TRIMESH
};
class Yp {
  /**
   * Internal storage of pooled contact points.
   */
  /**
   * Pooled vectors.
   */
  get [rt.sphereSphere]() {
    return this.sphereSphere;
  }
  get [rt.spherePlane]() {
    return this.spherePlane;
  }
  get [rt.boxBox]() {
    return this.boxBox;
  }
  get [rt.sphereBox]() {
    return this.sphereBox;
  }
  get [rt.planeBox]() {
    return this.planeBox;
  }
  get [rt.convexConvex]() {
    return this.convexConvex;
  }
  get [rt.sphereConvex]() {
    return this.sphereConvex;
  }
  get [rt.planeConvex]() {
    return this.planeConvex;
  }
  get [rt.boxConvex]() {
    return this.boxConvex;
  }
  get [rt.sphereHeightfield]() {
    return this.sphereHeightfield;
  }
  get [rt.boxHeightfield]() {
    return this.boxHeightfield;
  }
  get [rt.convexHeightfield]() {
    return this.convexHeightfield;
  }
  get [rt.sphereParticle]() {
    return this.sphereParticle;
  }
  get [rt.planeParticle]() {
    return this.planeParticle;
  }
  get [rt.boxParticle]() {
    return this.boxParticle;
  }
  get [rt.convexParticle]() {
    return this.convexParticle;
  }
  get [rt.cylinderCylinder]() {
    return this.convexConvex;
  }
  get [rt.sphereCylinder]() {
    return this.sphereConvex;
  }
  get [rt.planeCylinder]() {
    return this.planeConvex;
  }
  get [rt.boxCylinder]() {
    return this.boxConvex;
  }
  get [rt.convexCylinder]() {
    return this.convexConvex;
  }
  get [rt.heightfieldCylinder]() {
    return this.heightfieldCylinder;
  }
  get [rt.particleCylinder]() {
    return this.particleCylinder;
  }
  get [rt.sphereTrimesh]() {
    return this.sphereTrimesh;
  }
  get [rt.planeTrimesh]() {
    return this.planeTrimesh;
  }
  // get [COLLISION_TYPES.convexTrimesh]() {
  //   return this.convexTrimesh
  // }
  constructor(e) {
    this.contactPointPool = [], this.frictionEquationPool = [], this.result = [], this.frictionResult = [], this.v3pool = new qp(), this.world = e, this.currentContactMaterial = e.defaultContactMaterial, this.enableFrictionReduction = !1;
  }
  /**
   * Make a contact object, by using the internal pool or creating a new one.
   */
  createContactEquation(e, t, n, i, s, a) {
    let o;
    this.contactPointPool.length ? (o = this.contactPointPool.pop(), o.bi = e, o.bj = t) : o = new ds(e, t), o.enabled = e.collisionResponse && t.collisionResponse && n.collisionResponse && i.collisionResponse;
    const l = this.currentContactMaterial;
    o.restitution = l.restitution, o.setSpookParams(l.contactEquationStiffness, l.contactEquationRelaxation, this.world.dt);
    const c = n.material || e.material, u = i.material || t.material;
    return c && u && c.restitution >= 0 && u.restitution >= 0 && (o.restitution = c.restitution * u.restitution), o.si = s || n, o.sj = a || i, o;
  }
  createFrictionEquationsFromContact(e, t) {
    const n = e.bi, i = e.bj, s = e.si, a = e.sj, o = this.world, l = this.currentContactMaterial;
    let c = l.friction;
    const u = s.material || n.material, d = a.material || i.material;
    if (u && d && u.friction >= 0 && d.friction >= 0 && (c = u.friction * d.friction), c > 0) {
      const h = c * (o.frictionGravity || o.gravity).length();
      let f = n.invMass + i.invMass;
      f > 0 && (f = 1 / f);
      const g = this.frictionEquationPool, x = g.length ? g.pop() : new qa(n, i, h * f), m = g.length ? g.pop() : new qa(n, i, h * f);
      return x.bi = m.bi = n, x.bj = m.bj = i, x.minForce = m.minForce = -h * f, x.maxForce = m.maxForce = h * f, x.ri.copy(e.ri), x.rj.copy(e.rj), m.ri.copy(e.ri), m.rj.copy(e.rj), e.ni.tangents(x.t, m.t), x.setSpookParams(l.frictionEquationStiffness, l.frictionEquationRelaxation, o.dt), m.setSpookParams(l.frictionEquationStiffness, l.frictionEquationRelaxation, o.dt), x.enabled = m.enabled = e.enabled, t.push(x, m), !0;
    }
    return !1;
  }
  /**
   * Take the average N latest contact point on the plane.
   */
  createFrictionFromAverage(e) {
    let t = this.result[this.result.length - 1];
    if (!this.createFrictionEquationsFromContact(t, this.frictionResult) || e === 1)
      return;
    const n = this.frictionResult[this.frictionResult.length - 2], i = this.frictionResult[this.frictionResult.length - 1];
    Gn.setZero(), oi.setZero(), li.setZero();
    const s = t.bi;
    t.bj;
    for (let o = 0; o !== e; o++)
      t = this.result[this.result.length - 1 - o], t.bi !== s ? (Gn.vadd(t.ni, Gn), oi.vadd(t.ri, oi), li.vadd(t.rj, li)) : (Gn.vsub(t.ni, Gn), oi.vadd(t.rj, oi), li.vadd(t.ri, li));
    const a = 1 / e;
    oi.scale(a, n.ri), li.scale(a, n.rj), i.ri.copy(n.ri), i.rj.copy(n.rj), Gn.normalize(), Gn.tangents(n.t, i.t);
  }
  /**
   * Generate all contacts between a list of body pairs
   * @param p1 Array of body indices
   * @param p2 Array of body indices
   * @param result Array to store generated contacts
   * @param oldcontacts Optional. Array of reusable contact objects
   */
  getContacts(e, t, n, i, s, a, o) {
    this.contactPointPool = s, this.frictionEquationPool = o, this.result = i, this.frictionResult = a;
    const l = $p, c = Jp, u = Kp, d = Zp;
    for (let h = 0, f = e.length; h !== f; h++) {
      const g = e[h], x = t[h];
      let m = null;
      g.material && x.material && (m = n.getContactMaterial(g.material, x.material) || null);
      const p = g.type & Me.KINEMATIC && x.type & Me.STATIC || g.type & Me.STATIC && x.type & Me.KINEMATIC || g.type & Me.KINEMATIC && x.type & Me.KINEMATIC;
      for (let M = 0; M < g.shapes.length; M++) {
        g.quaternion.mult(g.shapeOrientations[M], l), g.quaternion.vmult(g.shapeOffsets[M], u), u.vadd(g.position, u);
        const A = g.shapes[M];
        for (let S = 0; S < x.shapes.length; S++) {
          x.quaternion.mult(x.shapeOrientations[S], c), x.quaternion.vmult(x.shapeOffsets[S], d), d.vadd(x.position, d);
          const b = x.shapes[S];
          if (!(A.collisionFilterMask & b.collisionFilterGroup && b.collisionFilterMask & A.collisionFilterGroup) || u.distanceTo(d) > A.boundingSphereRadius + b.boundingSphereRadius)
            continue;
          let T = null;
          A.material && b.material && (T = n.getContactMaterial(A.material, b.material) || null), this.currentContactMaterial = T || m || n.defaultContactMaterial;
          const C = A.type | b.type, v = this[C];
          if (v) {
            let w = !1;
            A.type < b.type ? w = v.call(this, A, b, u, d, l, c, g, x, A, b, p) : w = v.call(this, b, A, d, u, c, l, x, g, A, b, p), w && p && (n.shapeOverlapKeeper.set(A.id, b.id), n.bodyOverlapKeeper.set(g.id, x.id));
          }
        }
      }
    }
  }
  sphereSphere(e, t, n, i, s, a, o, l, c, u, d) {
    if (d)
      return n.distanceSquared(i) < (e.radius + t.radius) ** 2;
    const h = this.createContactEquation(o, l, e, t, c, u);
    i.vsub(n, h.ni), h.ni.normalize(), h.ri.copy(h.ni), h.rj.copy(h.ni), h.ri.scale(e.radius, h.ri), h.rj.scale(-t.radius, h.rj), h.ri.vadd(n, h.ri), h.ri.vsub(o.position, h.ri), h.rj.vadd(i, h.rj), h.rj.vsub(l.position, h.rj), this.result.push(h), this.createFrictionEquationsFromContact(h, this.frictionResult);
  }
  spherePlane(e, t, n, i, s, a, o, l, c, u, d) {
    const h = this.createContactEquation(o, l, e, t, c, u);
    if (h.ni.set(0, 0, 1), a.vmult(h.ni, h.ni), h.ni.negate(h.ni), h.ni.normalize(), h.ni.scale(e.radius, h.ri), n.vsub(i, cs), h.ni.scale(h.ni.dot(cs), Ya), cs.vsub(Ya, h.rj), -cs.dot(h.ni) <= e.radius) {
      if (d)
        return !0;
      const f = h.ri, g = h.rj;
      f.vadd(n, f), f.vsub(o.position, f), g.vadd(i, g), g.vsub(l.position, g), this.result.push(h), this.createFrictionEquationsFromContact(h, this.frictionResult);
    }
  }
  boxBox(e, t, n, i, s, a, o, l, c, u, d) {
    return e.convexPolyhedronRepresentation.material = e.material, t.convexPolyhedronRepresentation.material = t.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, this.convexConvex(e.convexPolyhedronRepresentation, t.convexPolyhedronRepresentation, n, i, s, a, o, l, e, t, d);
  }
  sphereBox(e, t, n, i, s, a, o, l, c, u, d) {
    const h = this.v3pool, f = Em;
    n.vsub(i, hs), t.getSideNormals(f, a);
    const g = e.radius;
    let x = !1;
    const m = bm, p = Am, M = wm;
    let A = null, S = 0, b = 0, T = 0, C = null;
    for (let N = 0, V = f.length; N !== V && x === !1; N++) {
      const W = Mm;
      W.copy(f[N]);
      const K = W.length();
      W.normalize();
      const ie = hs.dot(W);
      if (ie < K + g && ie > 0) {
        const se = Sm, ee = ym;
        se.copy(f[(N + 1) % 3]), ee.copy(f[(N + 2) % 3]);
        const Oe = se.length(), je = ee.length();
        se.normalize(), ee.normalize();
        const Ve = hs.dot(se), J = hs.dot(ee);
        if (Ve < Oe && Ve > -Oe && J < je && J > -je) {
          const ae = Math.abs(ie - K - g);
          if ((C === null || ae < C) && (C = ae, b = Ve, T = J, A = K, m.copy(W), p.copy(se), M.copy(ee), S++, d))
            return !0;
        }
      }
    }
    if (S) {
      x = !0;
      const N = this.createContactEquation(o, l, e, t, c, u);
      m.scale(-g, N.ri), N.ni.copy(m), N.ni.negate(N.ni), m.scale(A, m), p.scale(b, p), m.vadd(p, m), M.scale(T, M), m.vadd(M, N.rj), N.ri.vadd(n, N.ri), N.ri.vsub(o.position, N.ri), N.rj.vadd(i, N.rj), N.rj.vsub(l.position, N.rj), this.result.push(N), this.createFrictionEquationsFromContact(N, this.frictionResult);
    }
    let v = h.get();
    const w = Tm;
    for (let N = 0; N !== 2 && !x; N++)
      for (let V = 0; V !== 2 && !x; V++)
        for (let W = 0; W !== 2 && !x; W++)
          if (v.set(0, 0, 0), N ? v.vadd(f[0], v) : v.vsub(f[0], v), V ? v.vadd(f[1], v) : v.vsub(f[1], v), W ? v.vadd(f[2], v) : v.vsub(f[2], v), i.vadd(v, w), w.vsub(n, w), w.lengthSquared() < g * g) {
            if (d)
              return !0;
            x = !0;
            const K = this.createContactEquation(o, l, e, t, c, u);
            K.ri.copy(w), K.ri.normalize(), K.ni.copy(K.ri), K.ri.scale(g, K.ri), K.rj.copy(v), K.ri.vadd(n, K.ri), K.ri.vsub(o.position, K.ri), K.rj.vadd(i, K.rj), K.rj.vsub(l.position, K.rj), this.result.push(K), this.createFrictionEquationsFromContact(K, this.frictionResult);
          }
    h.release(v), v = null;
    const P = h.get(), F = h.get(), L = h.get(), I = h.get(), U = h.get(), D = f.length;
    for (let N = 0; N !== D && !x; N++)
      for (let V = 0; V !== D && !x; V++)
        if (N % 3 !== V % 3) {
          f[V].cross(f[N], P), P.normalize(), f[N].vadd(f[V], F), L.copy(n), L.vsub(F, L), L.vsub(i, L);
          const W = L.dot(P);
          P.scale(W, I);
          let K = 0;
          for (; K === N % 3 || K === V % 3; )
            K++;
          U.copy(n), U.vsub(I, U), U.vsub(F, U), U.vsub(i, U);
          const ie = Math.abs(W), se = U.length();
          if (ie < f[K].length() && se < g) {
            if (d)
              return !0;
            x = !0;
            const ee = this.createContactEquation(o, l, e, t, c, u);
            F.vadd(I, ee.rj), ee.rj.copy(ee.rj), U.negate(ee.ni), ee.ni.normalize(), ee.ri.copy(ee.rj), ee.ri.vadd(i, ee.ri), ee.ri.vsub(n, ee.ri), ee.ri.normalize(), ee.ri.scale(g, ee.ri), ee.ri.vadd(n, ee.ri), ee.ri.vsub(o.position, ee.ri), ee.rj.vadd(i, ee.rj), ee.rj.vsub(l.position, ee.rj), this.result.push(ee), this.createFrictionEquationsFromContact(ee, this.frictionResult);
          }
        }
    h.release(P, F, L, I, U);
  }
  planeBox(e, t, n, i, s, a, o, l, c, u, d) {
    return t.convexPolyhedronRepresentation.material = t.material, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, t.convexPolyhedronRepresentation.id = t.id, this.planeConvex(e, t.convexPolyhedronRepresentation, n, i, s, a, o, l, e, t, d);
  }
  convexConvex(e, t, n, i, s, a, o, l, c, u, d, h, f) {
    const g = Hm;
    if (!(n.distanceTo(i) > e.boundingSphereRadius + t.boundingSphereRadius) && e.findSeparatingAxis(t, n, s, i, a, g, h, f)) {
      const x = [], m = km;
      e.clipAgainstHull(n, s, t, i, a, g, -100, 100, x);
      let p = 0;
      for (let M = 0; M !== x.length; M++) {
        if (d)
          return !0;
        const A = this.createContactEquation(o, l, e, t, c, u), S = A.ri, b = A.rj;
        g.negate(A.ni), x[M].normal.negate(m), m.scale(x[M].depth, m), x[M].point.vadd(m, S), b.copy(x[M].point), S.vsub(n, S), b.vsub(i, b), S.vadd(n, S), S.vsub(o.position, S), b.vadd(i, b), b.vsub(l.position, b), this.result.push(A), p++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(A, this.frictionResult);
      }
      this.enableFrictionReduction && p && this.createFrictionFromAverage(p);
    }
  }
  sphereConvex(e, t, n, i, s, a, o, l, c, u, d) {
    const h = this.v3pool;
    n.vsub(i, Rm);
    const f = t.faceNormals, g = t.faces, x = t.vertices, m = e.radius;
    let p = !1;
    for (let M = 0; M !== x.length; M++) {
      const A = x[M], S = Lm;
      a.vmult(A, S), i.vadd(S, S);
      const b = Fm;
      if (S.vsub(n, b), b.lengthSquared() < m * m) {
        if (d)
          return !0;
        p = !0;
        const T = this.createContactEquation(o, l, e, t, c, u);
        T.ri.copy(b), T.ri.normalize(), T.ni.copy(T.ri), T.ri.scale(m, T.ri), S.vsub(i, T.rj), T.ri.vadd(n, T.ri), T.ri.vsub(o.position, T.ri), T.rj.vadd(i, T.rj), T.rj.vsub(l.position, T.rj), this.result.push(T), this.createFrictionEquationsFromContact(T, this.frictionResult);
        return;
      }
    }
    for (let M = 0, A = g.length; M !== A && p === !1; M++) {
      const S = f[M], b = g[M], T = Im;
      a.vmult(S, T);
      const C = Dm;
      a.vmult(x[b[0]], C), C.vadd(i, C);
      const v = Nm;
      T.scale(-m, v), n.vadd(v, v);
      const w = Um;
      v.vsub(C, w);
      const P = w.dot(T), F = Bm;
      if (n.vsub(C, F), P < 0 && F.dot(T) > 0) {
        const L = [];
        for (let I = 0, U = b.length; I !== U; I++) {
          const D = h.get();
          a.vmult(x[b[I]], D), i.vadd(D, D), L.push(D);
        }
        if (xm(L, T, n)) {
          if (d)
            return !0;
          p = !0;
          const I = this.createContactEquation(o, l, e, t, c, u);
          T.scale(-m, I.ri), T.negate(I.ni);
          const U = h.get();
          T.scale(-P, U);
          const D = h.get();
          T.scale(-m, D), n.vsub(i, I.rj), I.rj.vadd(D, I.rj), I.rj.vadd(U, I.rj), I.rj.vadd(i, I.rj), I.rj.vsub(l.position, I.rj), I.ri.vadd(n, I.ri), I.ri.vsub(o.position, I.ri), h.release(U), h.release(D), this.result.push(I), this.createFrictionEquationsFromContact(I, this.frictionResult);
          for (let N = 0, V = L.length; N !== V; N++)
            h.release(L[N]);
          return;
        } else
          for (let I = 0; I !== b.length; I++) {
            const U = h.get(), D = h.get();
            a.vmult(x[b[(I + 1) % b.length]], U), a.vmult(x[b[(I + 2) % b.length]], D), i.vadd(U, U), i.vadd(D, D);
            const N = Cm;
            D.vsub(U, N);
            const V = Pm;
            N.unit(V);
            const W = h.get(), K = h.get();
            n.vsub(U, K);
            const ie = K.dot(V);
            V.scale(ie, W), W.vadd(U, W);
            const se = h.get();
            if (W.vsub(n, se), ie > 0 && ie * ie < N.lengthSquared() && se.lengthSquared() < m * m) {
              if (d)
                return !0;
              const ee = this.createContactEquation(o, l, e, t, c, u);
              W.vsub(i, ee.rj), W.vsub(n, ee.ni), ee.ni.normalize(), ee.ni.scale(m, ee.ri), ee.rj.vadd(i, ee.rj), ee.rj.vsub(l.position, ee.rj), ee.ri.vadd(n, ee.ri), ee.ri.vsub(o.position, ee.ri), this.result.push(ee), this.createFrictionEquationsFromContact(ee, this.frictionResult);
              for (let Oe = 0, je = L.length; Oe !== je; Oe++)
                h.release(L[Oe]);
              h.release(U), h.release(D), h.release(W), h.release(se), h.release(K);
              return;
            }
            h.release(U), h.release(D), h.release(W), h.release(se), h.release(K);
          }
        for (let I = 0, U = L.length; I !== U; I++)
          h.release(L[I]);
      }
    }
  }
  planeConvex(e, t, n, i, s, a, o, l, c, u, d) {
    const h = Om, f = zm;
    f.set(0, 0, 1), s.vmult(f, f);
    let g = 0;
    const x = Gm;
    for (let m = 0; m !== t.vertices.length; m++)
      if (h.copy(t.vertices[m]), a.vmult(h, h), i.vadd(h, h), h.vsub(n, x), f.dot(x) <= 0) {
        if (d)
          return !0;
        const M = this.createContactEquation(o, l, e, t, c, u), A = Vm;
        f.scale(f.dot(x), A), h.vsub(A, A), A.vsub(n, M.ri), M.ni.copy(f), h.vsub(i, M.rj), M.ri.vadd(n, M.ri), M.ri.vsub(o.position, M.ri), M.rj.vadd(i, M.rj), M.rj.vsub(l.position, M.rj), this.result.push(M), g++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(M, this.frictionResult);
      }
    this.enableFrictionReduction && g && this.createFrictionFromAverage(g);
  }
  boxConvex(e, t, n, i, s, a, o, l, c, u, d) {
    return e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexConvex(e.convexPolyhedronRepresentation, t, n, i, s, a, o, l, e, t, d);
  }
  sphereHeightfield(e, t, n, i, s, a, o, l, c, u, d) {
    const h = t.data, f = e.radius, g = t.elementSize, x = tg, m = eg;
    Ze.pointToLocalFrame(i, a, n, m);
    let p = Math.floor((m.x - f) / g) - 1, M = Math.ceil((m.x + f) / g) + 1, A = Math.floor((m.y - f) / g) - 1, S = Math.ceil((m.y + f) / g) + 1;
    if (M < 0 || S < 0 || p > h.length || A > h[0].length)
      return;
    p < 0 && (p = 0), M < 0 && (M = 0), A < 0 && (A = 0), S < 0 && (S = 0), p >= h.length && (p = h.length - 1), M >= h.length && (M = h.length - 1), S >= h[0].length && (S = h[0].length - 1), A >= h[0].length && (A = h[0].length - 1);
    const b = [];
    t.getRectMinMax(p, A, M, S, b);
    const T = b[0], C = b[1];
    if (m.z - f > C || m.z + f < T)
      return;
    const v = this.result;
    for (let w = p; w < M; w++)
      for (let P = A; P < S; P++) {
        const F = v.length;
        let L = !1;
        if (t.getConvexTrianglePillar(w, P, !1), Ze.pointToWorldFrame(i, a, t.pillarOffset, x), n.distanceTo(x) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (L = this.sphereConvex(e, t.pillarConvex, n, x, s, a, o, l, e, t, d)), d && L || (t.getConvexTrianglePillar(w, P, !0), Ze.pointToWorldFrame(i, a, t.pillarOffset, x), n.distanceTo(x) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (L = this.sphereConvex(e, t.pillarConvex, n, x, s, a, o, l, e, t, d)), d && L))
          return !0;
        if (v.length - F > 2)
          return;
      }
  }
  boxHeightfield(e, t, n, i, s, a, o, l, c, u, d) {
    return e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexHeightfield(e.convexPolyhedronRepresentation, t, n, i, s, a, o, l, e, t, d);
  }
  convexHeightfield(e, t, n, i, s, a, o, l, c, u, d) {
    const h = t.data, f = t.elementSize, g = e.boundingSphereRadius, x = Qm, m = jm, p = Jm;
    Ze.pointToLocalFrame(i, a, n, p);
    let M = Math.floor((p.x - g) / f) - 1, A = Math.ceil((p.x + g) / f) + 1, S = Math.floor((p.y - g) / f) - 1, b = Math.ceil((p.y + g) / f) + 1;
    if (A < 0 || b < 0 || M > h.length || S > h[0].length)
      return;
    M < 0 && (M = 0), A < 0 && (A = 0), S < 0 && (S = 0), b < 0 && (b = 0), M >= h.length && (M = h.length - 1), A >= h.length && (A = h.length - 1), b >= h[0].length && (b = h[0].length - 1), S >= h[0].length && (S = h[0].length - 1);
    const T = [];
    t.getRectMinMax(M, S, A, b, T);
    const C = T[0], v = T[1];
    if (!(p.z - g > v || p.z + g < C))
      for (let w = M; w < A; w++)
        for (let P = S; P < b; P++) {
          let F = !1;
          if (t.getConvexTrianglePillar(w, P, !1), Ze.pointToWorldFrame(i, a, t.pillarOffset, x), n.distanceTo(x) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (F = this.convexConvex(e, t.pillarConvex, n, x, s, a, o, l, null, null, d, m, null)), d && F || (t.getConvexTrianglePillar(w, P, !0), Ze.pointToWorldFrame(i, a, t.pillarOffset, x), n.distanceTo(x) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (F = this.convexConvex(e, t.pillarConvex, n, x, s, a, o, l, null, null, d, m, null)), d && F))
            return !0;
        }
  }
  sphereParticle(e, t, n, i, s, a, o, l, c, u, d) {
    const h = Ym;
    if (h.set(0, 0, 1), i.vsub(n, h), h.lengthSquared() <= e.radius * e.radius) {
      if (d)
        return !0;
      const g = this.createContactEquation(l, o, t, e, c, u);
      h.normalize(), g.rj.copy(h), g.rj.scale(e.radius, g.rj), g.ni.copy(h), g.ni.negate(g.ni), g.ri.set(0, 0, 0), this.result.push(g), this.createFrictionEquationsFromContact(g, this.frictionResult);
    }
  }
  planeParticle(e, t, n, i, s, a, o, l, c, u, d) {
    const h = Wm;
    h.set(0, 0, 1), o.quaternion.vmult(h, h);
    const f = Xm;
    if (i.vsub(o.position, f), h.dot(f) <= 0) {
      if (d)
        return !0;
      const x = this.createContactEquation(l, o, t, e, c, u);
      x.ni.copy(h), x.ni.negate(x.ni), x.ri.set(0, 0, 0);
      const m = qm;
      h.scale(h.dot(i), m), i.vsub(m, m), x.rj.copy(m), this.result.push(x), this.createFrictionEquationsFromContact(x, this.frictionResult);
    }
  }
  boxParticle(e, t, n, i, s, a, o, l, c, u, d) {
    return e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexParticle(e.convexPolyhedronRepresentation, t, n, i, s, a, o, l, e, t, d);
  }
  convexParticle(e, t, n, i, s, a, o, l, c, u, d) {
    let h = -1;
    const f = Zm, g = $m;
    let x = null;
    const m = Km;
    if (m.copy(i), m.vsub(n, m), s.conjugate(Ka), Ka.vmult(m, m), e.pointIsInside(m)) {
      e.worldVerticesNeedsUpdate && e.computeWorldVertices(n, s), e.worldFaceNormalsNeedsUpdate && e.computeWorldFaceNormals(s);
      for (let p = 0, M = e.faces.length; p !== M; p++) {
        const A = [e.worldVertices[e.faces[p][0]]], S = e.worldFaceNormals[p];
        i.vsub(A[0], Za);
        const b = -S.dot(Za);
        if (x === null || Math.abs(b) < Math.abs(x)) {
          if (d)
            return !0;
          x = b, h = p, f.copy(S);
        }
      }
      if (h !== -1) {
        const p = this.createContactEquation(l, o, t, e, c, u);
        f.scale(x, g), g.vadd(i, g), g.vsub(n, g), p.rj.copy(g), f.negate(p.ni), p.ri.set(0, 0, 0);
        const M = p.ri, A = p.rj;
        M.vadd(i, M), M.vsub(l.position, M), A.vadd(n, A), A.vsub(o.position, A), this.result.push(p), this.createFrictionEquationsFromContact(p, this.frictionResult);
      } else
        console.warn("Point found inside convex, but did not find penetrating face!");
    }
  }
  heightfieldCylinder(e, t, n, i, s, a, o, l, c, u, d) {
    return this.convexHeightfield(t, e, i, n, a, s, l, o, c, u, d);
  }
  particleCylinder(e, t, n, i, s, a, o, l, c, u, d) {
    return this.convexParticle(t, e, i, n, a, s, l, o, c, u, d);
  }
  sphereTrimesh(e, t, n, i, s, a, o, l, c, u, d) {
    const h = rm, f = am, g = om, x = lm, m = cm, p = hm, M = pm, A = sm, S = nm, b = mm;
    Ze.pointToLocalFrame(i, a, n, m);
    const T = e.radius;
    M.lowerBound.set(m.x - T, m.y - T, m.z - T), M.upperBound.set(m.x + T, m.y + T, m.z + T), t.getTrianglesInAABB(M, b);
    const C = im, v = e.radius * e.radius;
    for (let I = 0; I < b.length; I++)
      for (let U = 0; U < 3; U++)
        if (t.getVertex(t.indices[b[I] * 3 + U], C), C.vsub(m, S), S.lengthSquared() <= v) {
          if (A.copy(C), Ze.pointToWorldFrame(i, a, A, C), C.vsub(n, S), d)
            return !0;
          let D = this.createContactEquation(o, l, e, t, c, u);
          D.ni.copy(S), D.ni.normalize(), D.ri.copy(D.ni), D.ri.scale(e.radius, D.ri), D.ri.vadd(n, D.ri), D.ri.vsub(o.position, D.ri), D.rj.copy(C), D.rj.vsub(l.position, D.rj), this.result.push(D), this.createFrictionEquationsFromContact(D, this.frictionResult);
        }
    for (let I = 0; I < b.length; I++)
      for (let U = 0; U < 3; U++) {
        t.getVertex(t.indices[b[I] * 3 + U], h), t.getVertex(t.indices[b[I] * 3 + (U + 1) % 3], f), f.vsub(h, g), m.vsub(f, p);
        const D = p.dot(g);
        m.vsub(h, p);
        let N = p.dot(g);
        if (N > 0 && D < 0 && (m.vsub(h, p), x.copy(g), x.normalize(), N = p.dot(x), x.scale(N, p), p.vadd(h, p), p.distanceTo(m) < e.radius)) {
          if (d)
            return !0;
          const W = this.createContactEquation(o, l, e, t, c, u);
          p.vsub(m, W.ni), W.ni.normalize(), W.ni.scale(e.radius, W.ri), W.ri.vadd(n, W.ri), W.ri.vsub(o.position, W.ri), Ze.pointToWorldFrame(i, a, p, p), p.vsub(l.position, W.rj), Ze.vectorToWorldFrame(a, W.ni, W.ni), Ze.vectorToWorldFrame(a, W.ri, W.ri), this.result.push(W), this.createFrictionEquationsFromContact(W, this.frictionResult);
        }
      }
    const w = um, P = dm, F = fm, L = tm;
    for (let I = 0, U = b.length; I !== U; I++) {
      t.getTriangleVertices(b[I], w, P, F), t.getNormal(b[I], L), m.vsub(w, p);
      let D = p.dot(L);
      if (L.scale(D, p), m.vsub(p, p), D = p.distanceTo(m), _t.pointInTriangle(p, w, P, F) && D < e.radius) {
        if (d)
          return !0;
        let N = this.createContactEquation(o, l, e, t, c, u);
        p.vsub(m, N.ni), N.ni.normalize(), N.ni.scale(e.radius, N.ri), N.ri.vadd(n, N.ri), N.ri.vsub(o.position, N.ri), Ze.pointToWorldFrame(i, a, p, p), p.vsub(l.position, N.rj), Ze.vectorToWorldFrame(a, N.ni, N.ni), Ze.vectorToWorldFrame(a, N.ri, N.ri), this.result.push(N), this.createFrictionEquationsFromContact(N, this.frictionResult);
      }
    }
    b.length = 0;
  }
  planeTrimesh(e, t, n, i, s, a, o, l, c, u, d) {
    const h = new y(), f = Qp;
    f.set(0, 0, 1), s.vmult(f, f);
    for (let g = 0; g < t.vertices.length / 3; g++) {
      t.getVertex(g, h);
      const x = new y();
      x.copy(h), Ze.pointToWorldFrame(i, a, x, h);
      const m = jp;
      if (h.vsub(n, m), f.dot(m) <= 0) {
        if (d)
          return !0;
        const M = this.createContactEquation(o, l, e, t, c, u);
        M.ni.copy(f);
        const A = em;
        f.scale(m.dot(f), A), h.vsub(A, A), M.ri.copy(A), M.ri.vsub(o.position, M.ri), M.rj.copy(h), M.rj.vsub(l.position, M.rj), this.result.push(M), this.createFrictionEquationsFromContact(M, this.frictionResult);
      }
    }
  }
  // convexTrimesh(
  //   si: ConvexPolyhedron, sj: Trimesh, xi: Vec3, xj: Vec3, qi: Quaternion, qj: Quaternion,
  //   bi: Body, bj: Body, rsi?: Shape | null, rsj?: Shape | null,
  //   faceListA?: number[] | null, faceListB?: number[] | null,
  // ) {
  //   const sepAxis = convexConvex_sepAxis;
  //   if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
  //       return;
  //   }
  //   // Construct a temp hull for each triangle
  //   const hullB = new ConvexPolyhedron();
  //   hullB.faces = [[0,1,2]];
  //   const va = new Vec3();
  //   const vb = new Vec3();
  //   const vc = new Vec3();
  //   hullB.vertices = [
  //       va,
  //       vb,
  //       vc
  //   ];
  //   for (let i = 0; i < sj.indices.length / 3; i++) {
  //       const triangleNormal = new Vec3();
  //       sj.getNormal(i, triangleNormal);
  //       hullB.faceNormals = [triangleNormal];
  //       sj.getTriangleVertices(i, va, vb, vc);
  //       let d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
  //       if(!d){
  //           triangleNormal.scale(-1, triangleNormal);
  //           d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
  //           if(!d){
  //               continue;
  //           }
  //       }
  //       const res: ConvexPolyhedronContactPoint[] = [];
  //       const q = convexConvex_q;
  //       si.clipAgainstHull(xi,qi,hullB,xj,qj,triangleNormal,-100,100,res);
  //       for(let j = 0; j !== res.length; j++){
  //           const r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
  //               ri = r.ri,
  //               rj = r.rj;
  //           r.ni.copy(triangleNormal);
  //           r.ni.negate(r.ni);
  //           res[j].normal.negate(q);
  //           q.mult(res[j].depth, q);
  //           res[j].point.vadd(q, ri);
  //           rj.copy(res[j].point);
  //           // Contact points are in world coordinates. Transform back to relative
  //           ri.vsub(xi,ri);
  //           rj.vsub(xj,rj);
  //           // Make relative to bodies
  //           ri.vadd(xi, ri);
  //           ri.vsub(bi.position, ri);
  //           rj.vadd(xj, rj);
  //           rj.vsub(bj.position, rj);
  //           result.push(r);
  //       }
  //   }
  // }
}
const Gn = new y(), oi = new y(), li = new y(), Kp = new y(), Zp = new y(), $p = new vt(), Jp = new vt(), Qp = new y(), jp = new y(), em = new y(), tm = new y(), nm = new y();
new y();
const im = new y(), sm = new y(), rm = new y(), am = new y(), om = new y(), lm = new y(), cm = new y(), hm = new y(), um = new y(), dm = new y(), fm = new y(), pm = new Gt(), mm = [], cs = new y(), Ya = new y(), gm = new y(), _m = new y(), vm = new y();
function xm(r, e, t) {
  let n = null;
  const i = r.length;
  for (let s = 0; s !== i; s++) {
    const a = r[s], o = gm;
    r[(s + 1) % i].vsub(a, o);
    const l = _m;
    o.cross(e, l);
    const c = vm;
    t.vsub(a, c);
    const u = l.dot(c);
    if (n === null || u > 0 && n === !0 || u <= 0 && n === !1) {
      n === null && (n = u > 0);
      continue;
    } else
      return !1;
  }
  return !0;
}
const hs = new y(), Mm = new y(), Sm = new y(), ym = new y(), Em = [new y(), new y(), new y(), new y(), new y(), new y()], Tm = new y(), bm = new y(), Am = new y(), wm = new y(), Rm = new y(), Cm = new y(), Pm = new y(), Fm = new y(), Lm = new y(), Im = new y(), Dm = new y(), Nm = new y(), Um = new y(), Bm = new y();
new y();
new y();
const Om = new y(), zm = new y(), Gm = new y(), Vm = new y(), Hm = new y(), km = new y(), Wm = new y(), Xm = new y(), qm = new y(), Ym = new y(), Ka = new vt(), Km = new y();
new y();
const Zm = new y(), Za = new y(), $m = new y(), Jm = new y(), Qm = new y(), jm = [0], eg = new y(), tg = new y();
class $a {
  /**
   * @todo Remove useless constructor
   */
  constructor() {
    this.current = [], this.previous = [];
  }
  /**
   * getKey
   */
  getKey(e, t) {
    if (t < e) {
      const n = t;
      t = e, e = n;
    }
    return e << 16 | t;
  }
  /**
   * set
   */
  set(e, t) {
    const n = this.getKey(e, t), i = this.current;
    let s = 0;
    for (; n > i[s]; )
      s++;
    if (n !== i[s]) {
      for (let a = i.length - 1; a >= s; a--)
        i[a + 1] = i[a];
      i[s] = n;
    }
  }
  /**
   * tick
   */
  tick() {
    const e = this.current;
    this.current = this.previous, this.previous = e, this.current.length = 0;
  }
  /**
   * getDiff
   */
  getDiff(e, t) {
    const n = this.current, i = this.previous, s = n.length, a = i.length;
    let o = 0;
    for (let l = 0; l < s; l++) {
      let c = !1;
      const u = n[l];
      for (; u > i[o]; )
        o++;
      c = u === i[o], c || Ja(e, u);
    }
    o = 0;
    for (let l = 0; l < a; l++) {
      let c = !1;
      const u = i[l];
      for (; u > n[o]; )
        o++;
      c = n[o] === u, c || Ja(t, u);
    }
  }
}
function Ja(r, e) {
  r.push((e & 4294901760) >> 16, e & 65535);
}
const ar = (r, e) => r < e ? `${r}-${e}` : `${e}-${r}`;
class ng {
  constructor() {
    this.data = {
      keys: []
    };
  }
  /** get */
  get(e, t) {
    const n = ar(e, t);
    return this.data[n];
  }
  /** set */
  set(e, t, n) {
    const i = ar(e, t);
    this.get(e, t) || this.data.keys.push(i), this.data[i] = n;
  }
  /** delete */
  delete(e, t) {
    const n = ar(e, t), i = this.data.keys.indexOf(n);
    i !== -1 && this.data.keys.splice(i, 1), delete this.data[n];
  }
  /** reset */
  reset() {
    const e = this.data, t = e.keys;
    for (; t.length > 0; ) {
      const n = t.pop();
      delete e[n];
    }
  }
}
class bg extends xo {
  /**
   * Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
   */
  /**
   * Makes bodies go to sleep when they've been inactive.
   * @default false
   */
  /**
   * All the current contacts (instances of ContactEquation) in the world.
   */
  /**
   * How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
   * @default 0
   */
  /**
   * Set to true to use fast quaternion normalization. It is often enough accurate to use.
   * If bodies tend to explode, set to false.
   * @default false
   */
  /**
   * The wall-clock time since simulation start.
   */
  /**
   * Number of timesteps taken since start.
   */
  /**
   * Default and last timestep sizes.
   */
  /**
   * The gravity of the world.
   */
  /**
   * Gravity to use when approximating the friction max force (mu*mass*gravity).
   * If undefined, global gravity will be used.
   * Use to enable friction in a World with a null gravity vector (no gravity).
   */
  /**
   * The broadphase algorithm to use.
   * @default NaiveBroadphase
   */
  /**
   * All bodies in this world
   */
  /**
   * True if any bodies are not sleeping, false if every body is sleeping.
   */
  /**
   * The solver algorithm to use.
   * @default GSSolver
   */
  /**
   * collisionMatrix
   */
  /**
   * CollisionMatrix from the previous step.
   */
  /**
   * All added contactmaterials.
   */
  /**
   * Used to look up a ContactMaterial given two instances of Material.
   */
  /**
   * The default material of the bodies.
   */
  /**
   * This contact material is used if no suitable contactmaterial is found for a contact.
   */
  /**
   * Time accumulator for interpolation.
   * @see https://gafferongames.com/game-physics/fix-your-timestep/
   */
  /**
   * Dispatched after a body has been added to the world.
   */
  /**
   * Dispatched after a body has been removed from the world.
   */
  constructor(e) {
    e === void 0 && (e = {}), super(), this.dt = -1, this.allowSleep = !!e.allowSleep, this.contacts = [], this.frictionEquations = [], this.quatNormalizeSkip = e.quatNormalizeSkip !== void 0 ? e.quatNormalizeSkip : 0, this.quatNormalizeFast = e.quatNormalizeFast !== void 0 ? e.quatNormalizeFast : !1, this.time = 0, this.stepnumber = 0, this.default_dt = 1 / 60, this.nextId = 0, this.gravity = new y(), e.gravity && this.gravity.copy(e.gravity), e.frictionGravity && (this.frictionGravity = new y(), this.frictionGravity.copy(e.frictionGravity)), this.broadphase = e.broadphase !== void 0 ? e.broadphase : new sp(), this.bodies = [], this.hasActiveBodies = !1, this.solver = e.solver !== void 0 ? e.solver : new Vp(), this.constraints = [], this.narrowphase = new Yp(this), this.collisionMatrix = new Ua(), this.collisionMatrixPrevious = new Ua(), this.bodyOverlapKeeper = new $a(), this.shapeOverlapKeeper = new $a(), this.contactmaterials = [], this.contactMaterialTable = new ng(), this.defaultMaterial = new Ts("default"), this.defaultContactMaterial = new Es(this.defaultMaterial, this.defaultMaterial, {
      friction: 0.3,
      restitution: 0
    }), this.doProfiling = !1, this.profile = {
      solve: 0,
      makeContactConstraints: 0,
      broadphase: 0,
      integrate: 0,
      narrowphase: 0
    }, this.accumulator = 0, this.subsystems = [], this.addBodyEvent = {
      type: "addBody",
      body: null
    }, this.removeBodyEvent = {
      type: "removeBody",
      body: null
    }, this.idToBodyMap = {}, this.broadphase.setWorld(this);
  }
  /**
   * Get the contact material between materials m1 and m2
   * @return The contact material if it was found.
   */
  getContactMaterial(e, t) {
    return this.contactMaterialTable.get(e.id, t.id);
  }
  /**
   * Store old collision state info
   */
  collisionMatrixTick() {
    const e = this.collisionMatrixPrevious;
    this.collisionMatrixPrevious = this.collisionMatrix, this.collisionMatrix = e, this.collisionMatrix.reset(), this.bodyOverlapKeeper.tick(), this.shapeOverlapKeeper.tick();
  }
  /**
   * Add a constraint to the simulation.
   */
  addConstraint(e) {
    this.constraints.push(e);
  }
  /**
   * Removes a constraint
   */
  removeConstraint(e) {
    const t = this.constraints.indexOf(e);
    t !== -1 && this.constraints.splice(t, 1);
  }
  /**
   * Raycast test
   * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
   */
  rayTest(e, t, n) {
    n instanceof gs ? this.raycastClosest(e, t, {
      skipBackfaces: !0
    }, n) : this.raycastAll(e, t, {
      skipBackfaces: !0
    }, n);
  }
  /**
   * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
   * @return True if any body was hit.
   */
  raycastAll(e, t, n, i) {
    return n === void 0 && (n = {}), n.mode = _t.ALL, n.from = e, n.to = t, n.callback = i, or.intersectWorld(this, n);
  }
  /**
   * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
   * @return True if any body was hit.
   */
  raycastAny(e, t, n, i) {
    return n === void 0 && (n = {}), n.mode = _t.ANY, n.from = e, n.to = t, n.result = i, or.intersectWorld(this, n);
  }
  /**
   * Ray cast, and return information of the closest hit.
   * @return True if any body was hit.
   */
  raycastClosest(e, t, n, i) {
    return n === void 0 && (n = {}), n.mode = _t.CLOSEST, n.from = e, n.to = t, n.result = i, or.intersectWorld(this, n);
  }
  /**
   * Add a rigid body to the simulation.
   * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
   * @todo Adding an array of bodies should be possible. This would save some loops too
   */
  addBody(e) {
    this.bodies.includes(e) || (e.index = this.bodies.length, this.bodies.push(e), e.world = this, e.initPosition.copy(e.position), e.initVelocity.copy(e.velocity), e.timeLastSleepy = this.time, e instanceof Me && (e.initAngularVelocity.copy(e.angularVelocity), e.initQuaternion.copy(e.quaternion)), this.collisionMatrix.setNumObjects(this.bodies.length), this.addBodyEvent.body = e, this.idToBodyMap[e.id] = e, this.dispatchEvent(this.addBodyEvent));
  }
  /**
   * Remove a rigid body from the simulation.
   */
  removeBody(e) {
    e.world = null;
    const t = this.bodies.length - 1, n = this.bodies, i = n.indexOf(e);
    if (i !== -1) {
      n.splice(i, 1);
      for (let s = 0; s !== n.length; s++)
        n[s].index = s;
      this.collisionMatrix.setNumObjects(t), this.removeBodyEvent.body = e, delete this.idToBodyMap[e.id], this.dispatchEvent(this.removeBodyEvent);
    }
  }
  getBodyById(e) {
    return this.idToBodyMap[e];
  }
  /**
   * @todo Make a faster map
   */
  getShapeById(e) {
    const t = this.bodies;
    for (let n = 0; n < t.length; n++) {
      const i = t[n].shapes;
      for (let s = 0; s < i.length; s++) {
        const a = i[s];
        if (a.id === e)
          return a;
      }
    }
    return null;
  }
  /**
   * Adds a contact material to the World
   */
  addContactMaterial(e) {
    this.contactmaterials.push(e), this.contactMaterialTable.set(e.materials[0].id, e.materials[1].id, e);
  }
  /**
   * Removes a contact material from the World.
   */
  removeContactMaterial(e) {
    const t = this.contactmaterials.indexOf(e);
    t !== -1 && (this.contactmaterials.splice(t, 1), this.contactMaterialTable.delete(e.materials[0].id, e.materials[1].id));
  }
  /**
   * Step the simulation forward keeping track of last called time
   * to be able to step the world at a fixed rate, independently of framerate.
   *
   * @param dt The fixed time step size to use (default: 1 / 60).
   * @param maxSubSteps Maximum number of fixed steps to take per function call (default: 10).
   * @see https://gafferongames.com/post/fix_your_timestep/
   * @example
   *     // Run the simulation independently of framerate every 1 / 60 ms
   *     world.fixedStep()
   */
  fixedStep(e, t) {
    e === void 0 && (e = 1 / 60), t === void 0 && (t = 10);
    const n = Mt.now() / 1e3;
    if (!this.lastCallTime)
      this.step(e, void 0, t);
    else {
      const i = n - this.lastCallTime;
      this.step(e, i, t);
    }
    this.lastCallTime = n;
  }
  /**
   * Step the physics world forward in time.
   *
   * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
   *
   * @param dt The fixed time step size to use.
   * @param timeSinceLastCalled The time elapsed since the function was last called.
   * @param maxSubSteps Maximum number of fixed steps to take per function call (default: 10).
   * @see https://web.archive.org/web/20180426154531/http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World#What_do_the_parameters_to_btDynamicsWorld::stepSimulation_mean.3F
   * @example
   *     // fixed timestepping without interpolation
   *     world.step(1 / 60)
   */
  step(e, t, n) {
    if (n === void 0 && (n = 10), t === void 0)
      this.internalStep(e), this.time += e;
    else {
      this.accumulator += t;
      const i = Mt.now();
      let s = 0;
      for (; this.accumulator >= e && s < n && (this.internalStep(e), this.accumulator -= e, s++, !(Mt.now() - i > e * 1e3)); )
        ;
      this.accumulator = this.accumulator % e;
      const a = this.accumulator / e;
      for (let o = 0; o !== this.bodies.length; o++) {
        const l = this.bodies[o];
        l.previousPosition.lerp(l.position, a, l.interpolatedPosition), l.previousQuaternion.slerp(l.quaternion, a, l.interpolatedQuaternion), l.previousQuaternion.normalize();
      }
      this.time += t;
    }
  }
  internalStep(e) {
    this.dt = e;
    const t = this.contacts, n = og, i = lg, s = this.bodies.length, a = this.bodies, o = this.solver, l = this.gravity, c = this.doProfiling, u = this.profile, d = Me.DYNAMIC;
    let h = -1 / 0;
    const f = this.constraints, g = ag;
    l.length();
    const x = l.x, m = l.y, p = l.z;
    let M = 0;
    for (c && (h = Mt.now()), M = 0; M !== s; M++) {
      const I = a[M];
      if (I.type === d) {
        const U = I.force, D = I.mass;
        U.x += D * x, U.y += D * m, U.z += D * p;
      }
    }
    for (let I = 0, U = this.subsystems.length; I !== U; I++)
      this.subsystems[I].update();
    c && (h = Mt.now()), n.length = 0, i.length = 0, this.broadphase.collisionPairs(this, n, i), c && (u.broadphase = Mt.now() - h);
    let A = f.length;
    for (M = 0; M !== A; M++) {
      const I = f[M];
      if (!I.collideConnected)
        for (let U = n.length - 1; U >= 0; U -= 1)
          (I.bodyA === n[U] && I.bodyB === i[U] || I.bodyB === n[U] && I.bodyA === i[U]) && (n.splice(U, 1), i.splice(U, 1));
    }
    this.collisionMatrixTick(), c && (h = Mt.now());
    const S = rg, b = t.length;
    for (M = 0; M !== b; M++)
      S.push(t[M]);
    t.length = 0;
    const T = this.frictionEquations.length;
    for (M = 0; M !== T; M++)
      g.push(this.frictionEquations[M]);
    for (this.frictionEquations.length = 0, this.narrowphase.getContacts(
      n,
      i,
      this,
      t,
      S,
      // To be reused
      this.frictionEquations,
      g
    ), c && (u.narrowphase = Mt.now() - h), c && (h = Mt.now()), M = 0; M < this.frictionEquations.length; M++)
      o.addEquation(this.frictionEquations[M]);
    const C = t.length;
    for (let I = 0; I !== C; I++) {
      const U = t[I], D = U.bi, N = U.bj, V = U.si, W = U.sj;
      let K;
      if (D.material && N.material ? K = this.getContactMaterial(D.material, N.material) || this.defaultContactMaterial : K = this.defaultContactMaterial, K.friction, D.material && N.material && (D.material.friction >= 0 && N.material.friction >= 0 && D.material.friction * N.material.friction, D.material.restitution >= 0 && N.material.restitution >= 0 && (U.restitution = D.material.restitution * N.material.restitution)), o.addEquation(U), D.allowSleep && D.type === Me.DYNAMIC && D.sleepState === Me.SLEEPING && N.sleepState === Me.AWAKE && N.type !== Me.STATIC) {
        const ie = N.velocity.lengthSquared() + N.angularVelocity.lengthSquared(), se = N.sleepSpeedLimit ** 2;
        ie >= se * 2 && (D.wakeUpAfterNarrowphase = !0);
      }
      if (N.allowSleep && N.type === Me.DYNAMIC && N.sleepState === Me.SLEEPING && D.sleepState === Me.AWAKE && D.type !== Me.STATIC) {
        const ie = D.velocity.lengthSquared() + D.angularVelocity.lengthSquared(), se = D.sleepSpeedLimit ** 2;
        ie >= se * 2 && (N.wakeUpAfterNarrowphase = !0);
      }
      this.collisionMatrix.set(D, N, !0), this.collisionMatrixPrevious.get(D, N) || (bi.body = N, bi.contact = U, D.dispatchEvent(bi), bi.body = D, N.dispatchEvent(bi)), this.bodyOverlapKeeper.set(D.id, N.id), this.shapeOverlapKeeper.set(V.id, W.id);
    }
    for (this.emitContactEvents(), c && (u.makeContactConstraints = Mt.now() - h, h = Mt.now()), M = 0; M !== s; M++) {
      const I = a[M];
      I.wakeUpAfterNarrowphase && (I.wakeUp(), I.wakeUpAfterNarrowphase = !1);
    }
    for (A = f.length, M = 0; M !== A; M++) {
      const I = f[M];
      I.update();
      for (let U = 0, D = I.equations.length; U !== D; U++) {
        const N = I.equations[U];
        o.addEquation(N);
      }
    }
    o.solve(e, this), c && (u.solve = Mt.now() - h), o.removeAllEquations();
    const v = Math.pow;
    for (M = 0; M !== s; M++) {
      const I = a[M];
      if (I.type & d) {
        const U = v(1 - I.linearDamping, e), D = I.velocity;
        D.scale(U, D);
        const N = I.angularVelocity;
        if (N) {
          const V = v(1 - I.angularDamping, e);
          N.scale(V, N);
        }
      }
    }
    this.dispatchEvent(sg), c && (h = Mt.now());
    const P = this.stepnumber % (this.quatNormalizeSkip + 1) === 0, F = this.quatNormalizeFast;
    for (M = 0; M !== s; M++)
      a[M].integrate(e, P, F);
    this.clearForces(), this.broadphase.dirty = !0, c && (u.integrate = Mt.now() - h), this.stepnumber += 1, this.dispatchEvent(ig);
    let L = !0;
    if (this.allowSleep)
      for (L = !1, M = 0; M !== s; M++) {
        const I = a[M];
        I.sleepTick(this.time), I.sleepState !== Me.SLEEPING && (L = !0);
      }
    this.hasActiveBodies = L;
  }
  emitContactEvents() {
    const e = this.hasAnyEventListener("beginContact"), t = this.hasAnyEventListener("endContact");
    if ((e || t) && this.bodyOverlapKeeper.getDiff(_n, vn), e) {
      for (let s = 0, a = _n.length; s < a; s += 2)
        Ai.bodyA = this.getBodyById(_n[s]), Ai.bodyB = this.getBodyById(_n[s + 1]), this.dispatchEvent(Ai);
      Ai.bodyA = Ai.bodyB = null;
    }
    if (t) {
      for (let s = 0, a = vn.length; s < a; s += 2)
        wi.bodyA = this.getBodyById(vn[s]), wi.bodyB = this.getBodyById(vn[s + 1]), this.dispatchEvent(wi);
      wi.bodyA = wi.bodyB = null;
    }
    _n.length = vn.length = 0;
    const n = this.hasAnyEventListener("beginShapeContact"), i = this.hasAnyEventListener("endShapeContact");
    if ((n || i) && this.shapeOverlapKeeper.getDiff(_n, vn), n) {
      for (let s = 0, a = _n.length; s < a; s += 2) {
        const o = this.getShapeById(_n[s]), l = this.getShapeById(_n[s + 1]);
        xn.shapeA = o, xn.shapeB = l, o && (xn.bodyA = o.body), l && (xn.bodyB = l.body), this.dispatchEvent(xn);
      }
      xn.bodyA = xn.bodyB = xn.shapeA = xn.shapeB = null;
    }
    if (i) {
      for (let s = 0, a = vn.length; s < a; s += 2) {
        const o = this.getShapeById(vn[s]), l = this.getShapeById(vn[s + 1]);
        Mn.shapeA = o, Mn.shapeB = l, o && (Mn.bodyA = o.body), l && (Mn.bodyB = l.body), this.dispatchEvent(Mn);
      }
      Mn.bodyA = Mn.bodyB = Mn.shapeA = Mn.shapeB = null;
    }
  }
  /**
   * Sets all body forces in the world to zero.
   */
  clearForces() {
    const e = this.bodies, t = e.length;
    for (let n = 0; n !== t; n++) {
      const i = e[n];
      i.force, i.torque, i.force.set(0, 0, 0), i.torque.set(0, 0, 0);
    }
  }
}
new Gt();
const or = new _t(), Mt = globalThis.performance || {};
if (!Mt.now) {
  let r = Date.now();
  Mt.timing && Mt.timing.navigationStart && (r = Mt.timing.navigationStart), Mt.now = () => Date.now() - r;
}
new y();
const ig = {
  type: "postStep"
}, sg = {
  type: "preStep"
}, bi = {
  type: Me.COLLIDE_EVENT_NAME,
  body: null,
  contact: null
}, rg = [], ag = [], og = [], lg = [], _n = [], vn = [], Ai = {
  type: "beginContact",
  bodyA: null,
  bodyB: null
}, wi = {
  type: "endContact",
  bodyA: null,
  bodyB: null
}, xn = {
  type: "beginShapeContact",
  bodyA: null,
  bodyB: null,
  shapeA: null,
  shapeB: null
}, Mn = {
  type: "endShapeContact",
  bodyA: null,
  bodyB: null,
  shapeA: null,
  shapeB: null
}, cg = 14280358, hg = 11917694, ug = 3093798, Ag = (r) => {
  const e = [], t = (L) => (e.push(L), L), n = t(
    new Cl({
      color: cg,
      emissive: hg,
      emissiveIntensity: 0.18,
      roughness: 0.68
    })
  ), i = t(new gr({ color: ug })), s = new Ri(), a = [], o = (L, I, U, D, N) => {
    const V = new Me({
      mass: U,
      shape: new Ss(I),
      linearDamping: 0.05,
      angularDamping: 0.3,
      sleepSpeedLimit: 0.25,
      sleepTimeLimit: 0.7
    });
    r.addBody(V), N.castShadow = !0, N.traverse((K) => K.userData.body = V), s.add(N);
    const W = { name: L, body: V, mesh: N, home: new y(...D) };
    return a.push(W), W;
  }, l = (L, I) => new zt(t(new vr(L, I, 6, 20)), n), c = l(0.26, 0.24);
  c.scale.set(1, 1, 0.8);
  const u = o("torso", new y(0.25, 0.3, 0.19), 1.2, [0, 0, 0], c), d = new zt(t(new Li(0.38, 32, 24)), n);
  d.scale.set(0.98, 0.9, 0.9);
  const h = t(new Li(0.026, 12, 10));
  for (const L of [-1, 1]) {
    const I = new zt(h, i);
    I.scale.set(1, 1.7, 0.4), I.position.set(L * 0.14, -0.02, 0.355), I.userData.eye = !0, d.add(I);
  }
  const f = new zt(t(new Li(0.018, 12, 10)), i);
  f.scale.set(1.2, 1, 0.4), f.position.set(0, -0.14, 0.372), d.add(f);
  const g = o("head", new y(0.3, 0.28, 0.28), 0.5, [0, 0.5, 0], d), x = o("armL", new y(0.075, 0.155, 0.075), 0.12, [-0.27, 0.02, 0], l(0.075, 0.16)), m = o("armR", new y(0.075, 0.155, 0.075), 0.12, [0.27, 0.02, 0], l(0.075, 0.16)), p = o("legL", new y(0.095, 0.215, 0.095), 0.45, [-0.12, -0.5, 0], l(0.095, 0.24)), M = o("legR", new y(0.095, 0.215, 0.095), 0.45, [0.12, -0.5, 0], l(0.095, 0.24)), A = [], S = (L, I, U, D, N, V) => {
    const W = new Bp(L.body, I.body, {
      pivotA: new y(...U),
      pivotB: new y(...D),
      axisA: y.UNIT_Y,
      axisB: y.UNIT_Y,
      angle: N,
      twistAngle: V
    });
    A.push(W), r.addConstraint(W);
  };
  S(u, g, [0, 0.3, 0], [0, -0.2, 0], 0.2, 0.3), S(u, x, [-0.27, 0.18, 0], [0, 0.16, 0], 1.2, 0.6), S(u, m, [0.27, 0.18, 0], [0, 0.16, 0], 1.2, 0.6), S(u, p, [-0.12, -0.28, 0], [0, 0.22, 0], 0.9, 0.4), S(u, M, [0.12, -0.28, 0], [0, 0.22, 0], 0.9, 0.4);
  const b = -0.715, T = 0.84 - b;
  return {
    group: s,
    parts: a,
    byName: { torso: u, head: g, armL: x, armR: m, legL: p, legR: M },
    skin: n,
    height: T,
    footY: b,
    wake: () => a.forEach((L) => L.body.wakeUp()),
    placeAt: (L, I, U, D) => {
      for (const N of a)
        N.body.position.set(N.home.x + L, N.home.y + I, N.home.z + U), N.body.quaternion.setFromEuler(D, 0, 0), N.body.velocity.setZero(), N.body.angularVelocity.setZero(), N.body.wakeUp();
    },
    syncMeshes: () => {
      for (const L of a)
        L.mesh.position.copy(L.body.position), L.mesh.quaternion.copy(L.body.quaternion);
    },
    syncBodies: () => {
      for (const L of a)
        L.body.position.copy(L.mesh.position), L.body.quaternion.copy(L.mesh.quaternion), L.body.velocity.setZero(), L.body.angularVelocity.setZero();
    },
    dispose: () => {
      A.forEach((L) => r.removeConstraint(L)), a.forEach((L) => r.removeBody(L.body)), e.forEach((L) => L.dispose());
    }
  };
};
export {
  Me as B,
  ao as C,
  Sg as D,
  Dn as E,
  Mg as H,
  zt as M,
  xr as O,
  dg as P,
  mi as Q,
  yg as R,
  mg as S,
  y as V,
  Eg as W,
  Zt as a,
  bg as b,
  Tg as c,
  xg as d,
  vs as e,
  Cl as f,
  Ag as g,
  Ss as h,
  Ui as i,
  H as j,
  Vn as k,
  Pp as l,
  fg as m,
  We as n,
  gr as o
};
