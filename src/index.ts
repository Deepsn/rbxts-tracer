import { Ray } from "./ray";

function calculateDirection(startPos: Vector3, ...args: [Vector3, number?]) {
  const [vectorPos, length] = args;
  return length !== undefined ? vectorPos.mul(length) : vectorPos.sub(startPos);
}

export namespace Tracer {
  export function ray(startPos: Vector3, endPos: Vector3): Ray;
  export function ray(startPos: Vector3, direction: Vector3, length: number): Ray;
  export function ray(startPos: Vector3, ...args: [Vector3, number?]): Ray {
    const direction = calculateDirection(startPos, ...args);

    if (!direction) {
      error("Invalid arguments");
    }

    return new Ray(startPos, direction);
  }
}
