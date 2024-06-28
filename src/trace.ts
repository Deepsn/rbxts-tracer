import { CollectionService } from "@rbxts/services";
import type { Filter, TraceResult } from "./types";

export abstract class Trace {
  protected _filters: Filter[] = [];

  protected abstract _raycastParams?: RaycastParams;
  protected _maxRaycasts = -1;

  private _raycastsDone = 0;

  constructor(
    protected startPos: Vector3,
    protected direction: Vector3,
  ) {}

  protected abstract _raycastFunc(): RaycastResult | undefined;

  // Should only be used when modifying rayparams
  protected _getRaycastParams() {
    if (!this._raycastParams) {
      this._raycastParams = new RaycastParams();
    }

    return this._raycastParams;
  }

  public useRaycastParams(raycastParams: RaycastParams) {
    this._raycastParams = raycastParams;
    return this;
  }

  public setMaxRaycasts(maxRaycasts: number) {
    assert(maxRaycasts > 1, "Max raycasts should be higher than 1");
    this._maxRaycasts = maxRaycasts;
    return this;
  }

  public ignoreObject(object: BasePart | BasePart[]) {
    this._getRaycastParams().AddToFilter(object);
    return this;
  }

  // Adds a filter function to filter array
  // The filter function should return true if raycast should be ignored, and false/nothing to hit
  public addFilter(filter: Filter) {
    this._filters.push(filter);
    return this;
  }

  public withTag(tag: string, queryParents = true) {
    const objectsWithTag = queryParents ? CollectionService.GetTagged(tag) : undefined;
    this.addFilter((result) => {
      if (!result.hit) return false;
      if (result.hit.HasTag(tag)) return false;

      // biome-ignore lint/style/noNonNullAssertion: result.hit was already checked
      return !objectsWithTag?.find((object) => result.hit!.IsDescendantOf(object));
    });
    return this;
  }

  public withoutTag(tag: string, queryParents = true) {
    const objectsWithTag = queryParents ? CollectionService.GetTagged(tag) : undefined;
    this.addFilter((result) => {
      if (!result.hit) return false;
      if (result.hit.HasTag(tag)) return true;

      // biome-ignore lint/style/noNonNullAssertion: result.hit was already checked
      return !!objectsWithTag?.find((object) => result.hit!.IsDescendantOf(object));
    });
    return this;
  }

  public run(): TraceResult {
    const result = this._raycastFunc();
    const traceResult = {
      position: result?.Position ?? this.startPos.add(this.direction),
      hit: result?.Instance,
      normal: result?.Normal ?? Vector3.zero,
      material: result?.Material ?? Enum.Material.Air,
      distance: result?.Distance ?? this.direction.Magnitude,
    };

    this._raycastsDone += 1;

    if (this._maxRaycasts < 0 || this._raycastsDone < this._maxRaycasts) {
      for (const filter of this._filters) {
        const shouldIgnore = filter(traceResult);

        if (shouldIgnore) {
          this.startPos = traceResult.position;

          return this.run();
        }
      }
    }

    return traceResult;
  }
}
