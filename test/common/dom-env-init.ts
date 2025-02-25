import { Window } from "happy-dom";
import { requiredLibs } from "../../src/userscript-meta.ts";
import { type Any, delay } from "../utils.ts";

export async function init() {
  const w = new Window();
  globalThis.document = w.document as Any;
  document.body.innerHTML = '<div class="container"></div>';
  await delay(1);
  await Promise.all(requiredLibs.map((lib) => import(lib)));
}

export async function tearDown() {
  await delay(1);
}
