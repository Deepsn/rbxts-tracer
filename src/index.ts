import { Ray } from "./ray";

export namespace Tracer {
  export function ray(startPos: Vector3, endPos: Vector3): Ray;
  export function ray(startPos: Vector3, direction: Vector3, length: number): Ray;
  export function ray(startPos: Vector3, ...args: [Vector3, number?]): Ray {
    let calculatedDirection: Vector3 | undefined;
    let endPos: Vector3 | undefined;
    let direction: Vector3 | undefined;
    let length: number | undefined;

    if (args.size() === 1) {
      endPos = args[0];
    } else {
      direction = args[0];
      length = args[1];
    }

    if (endPos) {
      calculatedDirection = endPos.sub(startPos);
    } else if (direction && length) {
      calculatedDirection = direction.mul(length);
    }

    if (!calculatedDirection) {
      error("Invalid arguments");
    }

    return new Ray(startPos, calculatedDirection);
  }
}
