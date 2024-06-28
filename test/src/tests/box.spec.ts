/// <reference types="@rbxts/testez/globals" />

import { Tracer } from "@rbxts/tracer";
import { END_POS, POS_DIFF, START_POS } from "../constants";
import { createPart } from "utils/part-utils";

export = () => {
  const size = Vector3.one.mul(5);

  it("should ray into nothing from start to end", () => {
    const result = Tracer.box(size, START_POS, END_POS).run();

    expect(result.hit).to.equal(undefined);
    expect(result.distance).to.equal(POS_DIFF.Magnitude);
    expect(result.material).to.equal(Enum.Material.Air);
  });

  it("should ray into nothing from start to direction", () => {
    const result = Tracer.box(size, START_POS, POS_DIFF.Unit, POS_DIFF.Magnitude).run();

    expect(result.hit).to.equal(undefined);
    expect(result.distance).to.equal(POS_DIFF.Magnitude);
    expect(result.material).to.equal(Enum.Material.Air);
  });

  it("should hit temporary part", () => {
    const part = createPart(START_POS.add(END_POS.div(2)));
    const result = Tracer.box(size, START_POS, END_POS).run();

    expect(result.hit).to.equal(part);
  });

  it("should error on incorrect arguments", () => {
    expect(() => Tracer.box(size, START_POS, undefined as unknown as Vector3)).to.throw();
  });
};
