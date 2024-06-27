import { Workspace } from "@rbxts/services";
import { Tracer } from "@rbxts/tracer";

const startPos = new Vector3(0, 5, 0);
const endPos = new Vector3(0, -3, 0);
const direction = endPos.Unit;
const length = endPos.Magnitude;
const global_raycast_params = new RaycastParams();

print(Tracer.ray(startPos, endPos).run());
print(Tracer.ray(startPos, direction, length).run());

const result = Tracer.ray(startPos, endPos)
  .ignoreObject(Workspace.WaitForChild("Gamer") as BasePart)
  .ignoreObject(Workspace.WaitForChild("Gamer2") as BasePart)
  .run();

Tracer.ray(startPos, endPos).useRaycastParams(global_raycast_params).run();
Tracer.ray(startPos, endPos)
  .setMaxRaycasts(2)
  .addFilter((result) => !!result.hit)
  .run();
Tracer.ray(startPos, endPos).withTag("GamerTag").run();

print("hit?", result.hit !== undefined);
print("result:", result);
