export interface TraceResult {
  readonly position: Vector3;
  readonly hit: BasePart | undefined;
  readonly normal: Vector3;
  readonly material: Enum.Material;
  readonly distance: number;
}

// biome-ignore lint/suspicious/noConfusingVoidType: void could be returned if the intended action is ignore
export type Filter = (result: TraceResult) => boolean | void;
