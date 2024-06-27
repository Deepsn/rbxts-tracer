/// <reference types="@rbxts/testez/globals" />

import { Tracer } from "@rbxts/tracer";
import { END_POS, START_POS } from "../constants";
import { createPart } from "utils/part-utils";

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
};
