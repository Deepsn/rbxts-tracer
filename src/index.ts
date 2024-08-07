import { Box } from "./box";
import { Ray } from "./ray";
import { Sphere } from "./sphere";

/**
 * Calculates the direction vector based on the provided arguments.
 *
 * @example
 *
 * const startPos = new Vector3(0, 0, 0);
 * const endPos = new Vector3(1, 1, 1);
 * const direction = calculateDirection(startPos, endPos);
 *
 * const ray = Tracer.ray(startPos, direction);
 *
 * @param {Vector3} startPos - The starting position vector.
 * @param args - The arguments to calculate the direction vector.
 * @returns {Vector3} - The calculated direction vector.
 * @throws Error Will throw an error if startPos or vectorPos are invalid.
 */
function calculateDirection(startPos: Vector3, ...args: [Vector3, number?]) {
  const [vectorPos, length] = args;
  assert(startPos && vectorPos, "Invalid arguments");
  return length !== undefined ? vectorPos.mul(length) : vectorPos.sub(startPos);
}

export namespace Tracer {
  /**
   * Creates a Ray object.
   *
   * @example
   * const startPos = new Vector3(0, 0, 0);
   * const endPos = new Vector3(1, 1, 1);
   * const ray = Tracer.ray(startPos, endPos);
   *
   * ray.run() // Runs the raycast
   *
   * @param {Vector3} startPos - The starting position vector.
   * @param {Vector3} endPos - The ending position vector.
   * @returns {Ray} - The created Ray object.
   */
  export function ray(startPos: Vector3, endPos: Vector3): Ray;

  /**
   * Creates a Ray object.
   *
   * @example
   * const startPos = new Vector3(0, 0, 0);
   * const direction = new Vector3(1, 1, 1);
   * const ray = Tracer.ray(startPos, direction, 10);
   *
   * ray.run() // Runs the raycast
   *
   * @param {Vector3} startPos - The starting position vector.
   * @param {Vector3} direction - The direction vector.
   * @param {number} length - The length of the ray.
   * @returns {Ray} - The created Ray object.
   */
  export function ray(startPos: Vector3, direction: Vector3, length: number): Ray;

  export function ray(startPos: Vector3, ...args: [Vector3, number?]): Ray {
    const direction = calculateDirection(startPos, ...args);
    return new Ray(startPos, direction);
  }

  /**
   * Creates a Sphere object.
   *
   * @example
   * const startPos = new Vector3(0, 0, 0);
   * const endPos = new Vector3(1, 1, 1);
   *
   * // Creates a sphere with a radius of 1
   * const sphere = Tracer.sphere(1, startPos, endPos);
   *
   * sphere.run() // Runs the spherecast
   *
   * @param {number} radius - The radius of the sphere.
   * @param {Vector3} startPos - The starting position vector.
   * @param {Vector3} endPos - The ending position vector.
   * @returns {Sphere} - The created Sphere object.
   * @throws Will throw an error if the radius is negative.
   */
  export function sphere(radius: number, startPos: Vector3, endPos: Vector3): Sphere;

  /**
   * Creates a Sphere object.
   *
   * @example
   * const startPos = new Vector3(0, 0, 0);
   * const direction = new Vector3(1, 1, 1);
   *
   * // Creates a sphere with a radius of 1
   * const sphere = Tracer.sphere(1, startPos, direction, 10);
   *
   * sphere.run() // Runs the spherecast
   *
   * @param {number} radius - The radius of the sphere.
   * @param {Vector3} startPos - The starting position vector.
   * @param {Vector3} direction - The direction vector.
   * @param {number} length - The length of the direction vector.
   * @returns {Sphere} - The created Sphere object.
   * @throws Will throw an error if the radius is negative.
   */
  export function sphere(radius: number, startPos: Vector3, direction: Vector3, length: number): Sphere;

  export function sphere(radius: number, startPos: Vector3, ...args: [Vector3, number?]): Sphere {
    // Should be radius = 0 be allowed?
    assert(radius >= 0, "Radius can't be negative");
    const direction = calculateDirection(startPos, ...args);
    return new Sphere(radius, startPos, direction);
  }

  /**
   * Creates a Box object.
   *
   * @example
   *
   * // The size of the box
   * const size = new Vector3(1, 1, 1);
   *
   * const startPos = new Vector3(0, 0, 0);
   * const endPos = new Vector3(1, 1, 1);
   *
   * const box = Tracer.box(size, startPos, endPos);
   *
   * box.run() // Runs the boxcast
   *
   * @param {Vector3} size - The size of the box.
   * @param {Vector3} startPos - The starting position vector.
   * @param {Vector3} endPos - The ending position vector.
   * @returns {Box} - The created Box object.
   */
  export function box(size: Vector3, startPos: Vector3, endPos: Vector3): Box;

  /**
   * Creates a Box object.
   *
   * @example
   *
   * // The size of the box
   * const size = new Vector3(1, 1, 1);
   *
   * const startPos = new Vector3(0, 0, 0);
   * const direction = new Vector3(1, 1, 1);
   *
   * const box = Tracer.box(size, startPos, direction, 10);
   *
   * box.run() // Runs the boxcast
   *
   * @param {Vector3} size - The size of the box.
   * @param {Vector3} startPos - The starting position vector.
   * @param {Vector3} direction - The direction vector.
   * @param {number} length - The length of the direction vector.
   * @returns {Box} - The created Box object.
   */
  export function box(size: Vector3, startPos: Vector3, direction: Vector3, length: number): Box;

  export function box(size: Vector3, startPos: Vector3, ...args: [Vector3, number?]): Box {
    const direction = calculateDirection(startPos, ...args);
    return new Box(size, startPos, direction);
  }
}
