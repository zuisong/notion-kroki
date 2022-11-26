// @deno-types="npm:@types/jsdom"
import { JSDOM } from "jsdom";
export function init() {
  const doc = new JSDOM("");

  window.document = doc.window.document;
  window.TextDecoder = undefined as any;
  window.XPathEvaluator = doc.window.XPathEvaluator;
  window.XPathResult = doc.window.XPathResult;
  window.MutationObserver = doc.window.MutationObserver;
}
