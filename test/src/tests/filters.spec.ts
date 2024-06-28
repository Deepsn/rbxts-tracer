/// <reference types="@rbxts/testez/globals" />

import { Tracer } from "@rbxts/tracer";
import { createPart } from "utils/part-utils";
import { END_POS, START_POS } from "../constants";
import type { TraceResult } from "../types";

export = () => {
  it("should filter out tagged parts", () => {
    const tag = "PartTag";
    const part = createPart(END_POS);
    part.AddTag(tag);

    const result = Tracer.ray(START_POS, END_POS).withTag(tag).run();
    const result2 = Tracer.ray(START_POS, END_POS).withoutTag(tag).run();

    expect(result.hit).to.equal(part);
    expect(result2.hit).to.equal(undefined);
  });

  it("should ignore part", () => {
    const part = createPart(END_POS);
    const result = Tracer.ray(START_POS, END_POS).ignoreObject(part).run();

    expect(result.hit).to.equal(undefined);
  });

  it("should use custom filter", () => {
    const part = createPart(END_POS);
    const filterPart = (result: TraceResult) => {
      return result.hit === part;
    };
    const result = Tracer.ray(START_POS, END_POS).addFilter(filterPart).run();

    expect(result.hit).to.equal(undefined);
  });
};
