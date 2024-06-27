import { Workspace } from "@rbxts/services";

const partsCreated = new Set<Part>();

export function createPart(position: CFrame | Vector3, size?: Vector3) {
  const part = new Instance("Part");

  if (typeIs(position, "Vector3")) {
    part.Position = position;
  } else {
    part.CFrame = position;
  }

  part.Size = size ?? Vector3.one;
  part.BrickColor = BrickColor.random();

  part.Parent = Workspace;

  partsCreated.add(part);

  return part;
}

export function clearAllParts() {
  for (const part of partsCreated) {
    part.Destroy();
  }

  partsCreated.clear();
}
