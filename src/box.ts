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

  /**
   * Sets the rotation of the box.
   * @example
   *
   * const box = Tracer.box(new Vector3(1, 1, 1), new Vector3(0, 0, 0), new Vector3(1, 1, 1));
   *
   * box.setRotation(CFrame.Angles(40, 0, 0)); // Rotates the box 40 degrees on the x-axis
   *
   * box.run();
   *
   * @param cframe - The CFrame to set the rotation to.
   */
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
