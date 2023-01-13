import { delay } from "deno_std/async/delay.ts";
import { JSDOM } from "$/test/deps/jsdom.ts";
import type {} from "$/src/@types/types.d.ts";
import { requiredLibs } from "$/src/userscript-meta.ts";
export async function init() {
  const doc = new JSDOM("");

  window.document = doc.window.document;
  window.TextDecoder = undefined as any;
  window.HTMLElement = doc.window.HTMLElement;
  window.XPathEvaluator = doc.window.XPathEvaluator;
  window.XPathResult = doc.window.XPathResult;
  window.MutationObserver = doc.window.MutationObserver;

  await Promise.all(requiredLibs.map((lib) => import(lib)));
}

export async function tearDown() {
  let id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await delay(500);
}
