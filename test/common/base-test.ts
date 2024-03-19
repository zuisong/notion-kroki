import { afterEach, beforeEach, describe } from "jsr:@std/testing/bdd";
import { init, tearDown } from "./dom-env-init.ts";

export const baseTest = describe("base case", () => {
  beforeEach(async () => {
    await init();
  });

  afterEach(async () => {
    await tearDown();
  });
});
