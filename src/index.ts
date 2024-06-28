import { Box } from "./box";
import { Ray } from "./ray";
import { Sphere } from "./sphere";

function calculateDirection(startPos: Vector3, ...args: [Vector3, number?]) {
  const [vectorPos, length] = args;
  assert(startPos && vectorPos, "Invalid arguments");
  return length !== undefined ? vectorPos.mul(length) : vectorPos.sub(startPos);
}

export namespace Tracer {
  export function ray(startPos: Vector3, endPos: Vector3): Ray;
  export function ray(startPos: Vector3, direction: Vector3, length: number): Ray;
  export function ray(startPos: Vector3, ...args: [Vector3, number?]): Ray {
    const direction = calculateDirection(startPos, ...args);
    return new Ray(startPos, direction);
  }

  export function sphere(radius: number, startPos: Vector3, endPos: Vector3): Sphere;
  export function sphere(radius: number, startPos: Vector3, direction: Vector3, length: number): Sphere;
  export function sphere(radius: number, startPos: Vector3, ...args: [Vector3, number?]): Sphere {
    // Should be radius = 0 be allowed?
    assert(radius >= 0, "Radius can't be negative");
    const direction = calculateDirection(startPos, ...args);
    return new Sphere(radius, startPos, direction);
  }

  export function box(size: Vector3, startPos: Vector3, endPos: Vector3): Box;
  export function box(size: Vector3, startPos: Vector3, direction: Vector3, length: number): Box;
  export function box(size: Vector3, startPos: Vector3, ...args: [Vector3, number?]): Box {
    const direction = calculateDirection(startPos, ...args);
    return new Box(size, startPos, direction);
  }
}
