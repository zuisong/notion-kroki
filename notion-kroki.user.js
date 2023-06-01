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
// @require           https://unpkg.com/fflate@0.8.0/umd/index.js
// @run-at            document-idle
// @author            zuisong
// @description       Render notion code block as graph by kroki
// ==/UserScript==
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function debounce(func, wait) {
  var timeoutId;
  return function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      func(...args);
    }, wait);
  };
}
function _debug() {
  if (isDebugMode()) {
    console.log(...arguments);
  }
}
function isDebugMode() {
  return !!localStorage.getItem("debug");
}
var defaultConfig = {
  serverPath: "//kroki.io/"
};
function main() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var blocks = Array.from((element !== null && element !== void 0 ? element : document.body).querySelectorAll("*")).filter(it => {
    var _it$innerHTML;
    return it === null || it === void 0 ? void 0 : (_it$innerHTML = it.innerHTML) === null || _it$innerHTML === void 0 ? void 0 : _it$innerHTML.startsWith("//kroki ");
  });
  var _iterator = _createForOfIteratorHelper(blocks),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _codeDiv$textContent;
      var codeDiv = _step.value;
      if ((_codeDiv$textContent = codeDiv.textContent) !== null && _codeDiv$textContent !== void 0 && _codeDiv$textContent.startsWith("//kroki")) {
        var _codeDiv$parentElemen, _codeDiv$parentElemen2, _codeDiv$parentElemen5, _codeDiv$parentElemen6;
        var lines = codeDiv.textContent.split("\n");
        var type = lines[0].replace("//kroki", "").trim();
        if (!(type !== null && type !== void 0 && type.trim())) continue;
        var data = lines.filter((_value, index) => index !== 0).join("\n");
        if (!(data !== null && data !== void 0 && data.trim())) continue;
        var svgUrl = plant(data, type, defaultConfig);
        var div = document.createElement("div", undefined);
        div.setAttribute("style", "display: flex; flex-direction: row; place-content: center;");
        div.setAttribute("notion-kroki", "true");
        div.innerHTML = "<object type=\"image/svg+xml\" style=\"max-width: 100%;\" data=\"".concat(svgUrl, "\" />");
        var preCreatedNode = (_codeDiv$parentElemen = codeDiv.parentElement) === null || _codeDiv$parentElemen === void 0 ? void 0 : (_codeDiv$parentElemen2 = _codeDiv$parentElemen.parentElement) === null || _codeDiv$parentElemen2 === void 0 ? void 0 : _codeDiv$parentElemen2.querySelector("div[notion-kroki]");
        if (preCreatedNode) {
          var _preCreatedNode$first;
          var preSvgUrl = (_preCreatedNode$first = preCreatedNode.firstElementChild) === null || _preCreatedNode$first === void 0 ? void 0 : _preCreatedNode$first.getAttribute("data");
          _debug("preSvgUrl:".concat(preSvgUrl));
          _debug("svgUrl:".concat(svgUrl));
          if (preSvgUrl === svgUrl) {
            continue;
          } else {
            var _codeDiv$parentElemen3, _codeDiv$parentElemen4;
            (_codeDiv$parentElemen3 = codeDiv.parentElement) === null || _codeDiv$parentElemen3 === void 0 ? void 0 : (_codeDiv$parentElemen4 = _codeDiv$parentElemen3.parentElement) === null || _codeDiv$parentElemen4 === void 0 ? void 0 : _codeDiv$parentElemen4.removeChild(preCreatedNode);
          }
        }
        (_codeDiv$parentElemen5 = codeDiv.parentElement) === null || _codeDiv$parentElemen5 === void 0 ? void 0 : (_codeDiv$parentElemen6 = _codeDiv$parentElemen5.parentElement) === null || _codeDiv$parentElemen6 === void 0 ? void 0 : _codeDiv$parentElemen6.appendChild(div);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function textEncode(str) {
  return new TextEncoder().encode(str);
}
function plant(content, type, config) {
  _debug("kroki render type: ".concat(type));
  _debug("kroki render content:\n".concat(content));
  var urlPrefix = "".concat((config === null || config === void 0 ? void 0 : config.serverPath) + type, "/svg/");
  var data = textEncode(content);
  var compressed = strFromU8(fflate.zlibSync(data, {
    level: 9
  }));
  var result = btoa(compressed).replace(/\+/g, "-").replace(/\//g, "_");
  var svgUrl = urlPrefix + result;
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
  mutations.forEach(mutation => {
    render();
  });
}
function strFromU8(dat) {
  var r = "";
  var s = Math.pow(2, 16);
  for (var i = 0; i < dat.length; i += s) {
    r += String.fromCharCode(...dat.subarray(i, i + s));
  }
  return r;
}
main();
init_listener();
