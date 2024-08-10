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

  /**
   * Sets the raycast parameters for the raycast.
   * @param raycastParams - The raycast parameters to use.
   */
  public useRaycastParams(raycastParams: RaycastParams) {
    this._raycastParams = raycastParams;
    return this;
  }

  /**
   * Sets the max number of raycasts to perform.
   *
   * **Note:** You can set this to -1 to run infinite raycasts.
   *  This is useful when you want to run a raycast until a certain condition is met
   *
   * @example
   * const ray = Tracer.ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
   *
   * ray.setMaxRaycasts(5);
   *
   * const result = ray.run();
   *
   * print(result.position);
   *
   * @param maxRaycasts - The max number of raycasts to perform.
   */
  public setMaxRaycasts(maxRaycasts: number) {
    assert(maxRaycasts > 1 || maxRaycasts === -1, "Max raycasts should be higher than 1 or -1");
    this._maxRaycasts = maxRaycasts;
    return this;
  }

  /**
   * Ignores an object from the raycast.
   * @example
   * const ray = Tracer.ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
   *
   * ray.ignoreObject(workspace.Car);
   *
   * @param object - The object to ignore.
   */
  public ignoreObject(object: Instance | Instance[] | undefined) {
    if (object) {
      this._getRaycastParams().AddToFilter(object);
    }
    return this;
  }
  /**
   * Adds a filter function to the raycast.
   *
   * **Note:** The filter function should return true if the raycast should be ignored, and false/nothing to hit.
   *
   * @example
   * const ray = Tracer.ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1))
   *
   * ray.addFilter(({ hit }) => !hit?.CanCollide || hit.Transparency > 0.75); // Will ignore objects that are not collidable or are transparent
   * @param filter - The filter function to add.
   */
  public addFilter(filter: Filter) {
    this._filters.push(filter);
    return this;
  }

  /**
   * Adds a filter to ignore objects with a specific tag.
   * @example
   *
   * const ray = Tracer.ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1))
   *
   * ray.withTag("ally"); // Will ignore objects with the tag "ally"
   *
   * @param tag - The tag to ignore.
   * @param queryParents - Whether to query parents of the object with the tag.
   */
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

  /**
   * Adds a filter to ignore objects without a specific tag.
   * @example
   *
   * const ray = Tracer.ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1))
   *
   * ray.withoutTag("enemy"); // Will ignore objects without the tag "enemy"
   *
   * @param tag - The tag to ignore.
   * @param queryParents - Whether to query parents of the object with the tag.
   */
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

  /**
   * Runs the raycast.
   * @returns The trace result.
   * @example
   * const ray = Tracer.ray(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
   * const result = ray.run();
   *
   * print(result.position);
   */
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

          // Ignore hitted object
          this.ignoreObject(traceResult.hit);

          return this.run();
        }
      }
    }

    return traceResult;
  }
}
