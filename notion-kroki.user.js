// ==UserScript==
// @name              notion-kroki
// @namespace         https://github.com/zuisong/notion-kroki
// @homepage          https://github.com/zuisong/notion-kroki
// @homepageURL       https://github.com/zuisong/notion-kroki
// @source            https://github.com/zuisong/notion-kroki
// @contributionURL   https://github.com/zuisong/notion-kroki
// @grant             none
// @version           1.2.0
// @license           MIT
// @match             *://www.notion.so/*
// @match             *://*.notion.site/*
// @match             *://*.super.site/*
// @supportURL        https://github.com/zuisong/notion-kroki/issues
// @require           https://unpkg.com/fflate@0.7.4/umd/index.js
// @run-at            document-idle
// @author            zuisong
// @description       Render notion code block as graph by kroki
// ==/UserScript==
"use strict";
const debounce = (fn, ms) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
function _xpath(xpath, node) {
  const xresult = document.evaluate(
    xpath,
    node,
    null,
    XPathResult.ANY_TYPE,
    null
  );
  const xnodes = [];
  while (true) {
    const xres = xresult.iterateNext();
    if (xres) {
      xnodes.push(xres);
    } else {
      break;
    }
  }
  return xnodes;
}
function _debug(...data) {
  if (isDebugMode()) {
    console.log(...data);
  }
}
function isDebugMode() {
  return !!localStorage.getItem("debug");
}
const defaultConfig = {
  serverPath: "//kroki.io/"
};
function main(element = null) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const blocks = _xpath(
    "//*[starts-with(text(),'//kroki ')]",
    element ?? document.body
  );
  for (const codeDiv of blocks) {
    if ((_a = codeDiv.textContent) == null ? void 0 : _a.startsWith("//kroki")) {
      const lines = codeDiv.textContent.split("\n");
      const type = lines[0].replace("//kroki", "").trim();
      if (!(type == null ? void 0 : type.trim()))
        continue;
      const data = lines.filter((_value, index) => index != 0).join("\n");
      if (!(data == null ? void 0 : data.trim()))
        continue;
      const svgUrl = plant(data, type, defaultConfig);
      const div = document.createElement("div", void 0);
      div.style.cssText = "display: flex; flex-direction: row; place-content: center;";
      div.setAttribute("notion-kroki", "true");
      div.innerHTML = `<object type="image/svg+xml" style="max-width: 100%;" data="${svgUrl}" />`;
      const preCreatedNode = (_c = (_b = codeDiv.parentElement) == null ? void 0 : _b.parentElement) == null ? void 0 : _c.querySelector("div[notion-kroki]");
      if (preCreatedNode) {
        const preSvgUrl = (_d = preCreatedNode.firstElementChild) == null ? void 0 : _d.getAttribute(
          "data"
        );
        _debug(`preSvgUrl:${preSvgUrl}`);
        _debug(`svgUrl:${svgUrl}`);
        if (preSvgUrl == svgUrl) {
          continue;
        } else {
          (_f = (_e = codeDiv.parentElement) == null ? void 0 : _e.parentElement) == null ? void 0 : _f.removeChild(
            preCreatedNode
          );
        }
      }
      (_h = (_g = codeDiv.parentElement) == null ? void 0 : _g.parentElement) == null ? void 0 : _h.appendChild(div);
    }
  }
}
function textEncode(str) {
  return new TextEncoder().encode(str);
}
function plant(content, type, config) {
  _debug(`kroki render type: ${type}`);
  _debug(`kroki render content:
${content}`);
  const urlPrefix = `${(config == null ? void 0 : config.serverPath) + type}/svg/`;
  const data = textEncode(content);
  const compressed = strFromU8(
    fflate.zlibSync(data, { level: 9 })
  );
  const result = btoa(compressed).replace(/\+/g, "-").replace(/\//g, "_");
  const svgUrl = urlPrefix + result;
  return svgUrl;
}
function init_listener() {
  new MutationObserver(check).observe(document, {
    childList: true,
    subtree: true
  });
}
const render = debounce(main, 100);
function check(mutations, _observer) {
  _debug("mutations", mutations);
  mutations.forEach((mutation) => {
    render();
  });
}
function strFromU8(dat) {
  let r = "";
  const s = 2 ** 16;
  for (let i = 0; i < dat.length; i += s) {
    r += String.fromCharCode(...dat.subarray(i, i + s));
  }
  return r;
}
main();
init_listener();
//# sourceMappingURL=notion-kroki.js.map
