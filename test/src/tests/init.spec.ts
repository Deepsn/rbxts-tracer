/// <reference types="@rbxts/testez/globals" />

import { clearAllParts } from "utils/part-utils";

export = () => {
  afterEach(() => {
    clearAllParts();
  });
};
