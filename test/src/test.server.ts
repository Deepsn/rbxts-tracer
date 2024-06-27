import { ReplicatedStorage, ServerScriptService } from "@rbxts/services";
import TestEZ from "@rbxts/testez";

TestEZ.TestBootstrap.run(
  [
    ServerScriptService.WaitForChild("server").WaitForChild("tests"),
    ReplicatedStorage.WaitForChild("shared").WaitForChild("tests"),
  ],
  TestEZ.Reporters.TextReporter,
);
