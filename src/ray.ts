import { Workspace } from "@rbxts/services";
import { Trace } from "./trace";

export class Ray extends Trace {
  protected _raycastParams?: RaycastParams | undefined;

  protected _raycastFunc(): RaycastResult | undefined {
    return Workspace.Raycast(this.startPos, this.direction, this._raycastParams);
  }
}
