import { Workspace } from "@rbxts/services";
import { Trace } from "./trace";

export class Box extends Trace {
  protected _raycastParams?: RaycastParams | undefined;
  private _rotation?: CFrame;

  constructor(
    private _size: Vector3,
    startPos: Vector3,
    endPos: Vector3,
  ) {
    super(startPos, endPos);
  }

  public setRotation(cframe: CFrame) {
    this._rotation = cframe;
    return this;
  }

  protected _raycastFunc(): RaycastResult | undefined {
    return Workspace.Blockcast(
      new CFrame(this.startPos).mul(this._rotation ?? CFrame.identity),
      this._size,
      this.direction,
      this._raycastParams,
    );
  }
}
