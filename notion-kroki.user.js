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
var __pow = Math.pow;

// src/common/utils.ts
function debounce(func, wait) {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = void 0;
      func(...args);
    }, wait);
  };
}
function _debug(...data) {
  if (isDebugMode()) {
    console.log(...data);
  }
}
function isDebugMode() {
  return !!localStorage.getItem("debug");
}

// src/main.ts
var defaultConfig = {
  serverPath: "//kroki.io/"
};
function main(element = null) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const blocks = Array.from(
    (element != null ? element : document.body).querySelectorAll("*")
  ).filter((it) => {
    var _a2;
    return (_a2 = it == null ? void 0 : it.innerHTML) == null ? void 0 : _a2.startsWith("//kroki ");
  });
  for (const codeDiv of blocks) {
    if ((_a = codeDiv.textContent) == null ? void 0 : _a.startsWith("//kroki")) {
      const lines = codeDiv.textContent.split("\n");
      const type = lines[0].replace("//kroki", "").trim();
      if (!(type == null ? void 0 : type.trim()))
        continue;
      const data = lines.filter((_value, index) => index !== 0).join("\n");
      if (!(data == null ? void 0 : data.trim()))
        continue;
      const svgUrl = plant(data, type, defaultConfig);
      const div = document.createElement("div", void 0);
      div.setAttribute(
        "style",
        "display: flex; flex-direction: row; place-content: center;"
      );
      div.setAttribute("notion-kroki", "true");
      div.innerHTML = `<object type="image/svg+xml" style="max-width: 100%;" data="${svgUrl}" />`;
      const preCreatedNode = (_c = (_b = codeDiv.parentElement) == null ? void 0 : _b.parentElement) == null ? void 0 : _c.querySelector("div[notion-kroki]");
      if (preCreatedNode) {
        const preSvgUrl = (_d = preCreatedNode.firstElementChild) == null ? void 0 : _d.getAttribute(
          "data"
        );
        _debug(`preSvgUrl:${preSvgUrl}`);
        _debug(`svgUrl:${svgUrl}`);
        if (preSvgUrl === svgUrl) {
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
  if (globalThis.MutationObserver) {
    new MutationObserver(check).observe(document, {
      childList: true,
      subtree: true
    });
  }
}
var render = debounce(main, 100);
function check(mutations, _observer) {
  mutations.forEach((mutation) => {
    render();
  });
}
function strFromU8(dat) {
  let r = "";
  const s = __pow(2, 16);
  for (let i = 0; i < dat.length; i += s) {
    r += String.fromCharCode(...dat.subarray(i, i + s));
  }
  return r;
}

// src/index.ts
main();
init_listener();
