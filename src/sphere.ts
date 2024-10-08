import { Workspace } from "@rbxts/services";
import { Trace } from "./trace";

export class Sphere extends Trace {
  protected _raycastParams?: RaycastParams | undefined;

  constructor(
    private _radius: number,
    startPos: Vector3,
    direction: Vector3,
  ) {
    super(startPos, direction);
  }

  protected _raycastFunc(): RaycastResult | undefined {
    return Workspace.Spherecast(this.startPos, this._radius, this.direction, this._raycastParams);
  }
}
