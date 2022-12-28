// ==UserScript==
// @name        notion-kroki
// @namespace   https://github.com/zuisong/notion-kroki
// @grant       none
// @version     1.1.5
// @license     MIT
// @match       *://www.notion.so/*
// @match       *://*.notion.site/*
// @match       *://*.super.site/*
// @supportURL  https://github.com/zuisong/notion-kroki/issues
// @updateURL   https://github.com/zuisong/notion-kroki/raw/main/notion-kroki.user.js
// @run-at      document-idle
// @author      zuisong
// @description Render notion code block as graph by kroki
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
  let xres;
  while (true) {
    xres = xresult.iterateNext();
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
var T = Uint8Array, $ = Uint16Array, pr = Uint32Array, gr = new T([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), yr = new T([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), Tr = new T([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), wn = function(n, r) {
  for (var t = new $(31), e = 0; e < 31; ++e)
    t[e] = r += 1 << n[e - 1];
  for (var i = new pr(t[30]), e = 1; e < 30; ++e)
    for (var a = t[e]; a < t[e + 1]; ++a)
      i[a] = a - t[e] << 5 | e;
  return [t, i];
}, mn = wn(gr, 2), Xr = mn[0], Gr = mn[1];
Xr[28] = 258, Gr[258] = 28;
var xn = wn(yr, 0), Hr = xn[1], Ur = new $(32768);
for (C = 0; C < 32768; ++C)
  nr = (C & 43690) >>> 1 | (C & 21845) << 1, nr = (nr & 52428) >>> 2 | (nr & 13107) << 2, nr = (nr & 61680) >>> 4 | (nr & 3855) << 4, Ur[C] = ((nr & 65280) >>> 8 | (nr & 255) << 8) >>> 1;
var nr, C, V = function(n, r, t) {
  for (var e = n.length, i = 0, a = new $(r); i < e; ++i)
    n[i] && ++a[n[i] - 1];
  var o = new $(r);
  for (i = 0; i < r; ++i)
    o[i] = o[i - 1] + a[i - 1] << 1;
  var f;
  if (t) {
    f = new $(1 << r);
    var u = 15 - r;
    for (i = 0; i < e; ++i)
      if (n[i])
        for (var s = i << 4 | n[i], v = r - n[i], h = o[n[i] - 1]++ << v, g = h | (1 << v) - 1; h <= g; ++h)
          f[Ur[h] >>> u] = s;
  } else
    for (f = new $(e), i = 0; i < e; ++i)
      n[i] && (f[i] = Ur[o[n[i] - 1]++] >>> 15 - n[i]);
  return f;
}, er = new T(288);
for (C = 0; C < 144; ++C)
  er[C] = 8;
var C;
for (C = 144; C < 256; ++C)
  er[C] = 9;
var C;
for (C = 256; C < 280; ++C)
  er[C] = 7;
var C;
for (C = 280; C < 288; ++C)
  er[C] = 8;
var C, lr = new T(32);
for (C = 0; C < 32; ++C)
  lr[C] = 5;
var C, An = V(er, 9, 0);
V(er, 9, 1);
var Tn = V(lr, 5, 0);
V(lr, 5, 1);
var Dr = function(n) {
  return (n + 7) / 8 | 0;
}, X = function(n, r, t) {
  (r == null || r < 0) && (r = 0), (t == null || t > n.length) && (t = n.length);
  var e = new (n.BYTES_PER_ELEMENT == 2 ? $ : n.BYTES_PER_ELEMENT == 4 ? pr : T)(t - r);
  return e.set(n.subarray(r, t)), e;
}, rr = function(n, r, t) {
  t <<= r & 7;
  var e = r / 8 | 0;
  n[e] |= t, n[e + 1] |= t >>> 8;
}, vr = function(n, r, t) {
  t <<= r & 7;
  var e = r / 8 | 0;
  n[e] |= t, n[e + 1] |= t >>> 8, n[e + 2] |= t >>> 16;
}, kr = function(n, r) {
  for (var t = [], e = 0; e < n.length; ++e)
    n[e] && t.push({ s: e, f: n[e] });
  var i = t.length, a = t.slice();
  if (!i)
    return [tr, 0];
  if (i == 1) {
    var o = new T(t[0].s + 1);
    return o[t[0].s] = 1, [o, 1];
  }
  t.sort(function(I, S) {
    return I.f - S.f;
  }), t.push({ s: -1, f: 25001 });
  var f = t[0], u = t[1], s = 0, v = 1, h = 2;
  for (t[0] = { s: -1, f: f.f + u.f, l: f, r: u }; v != i - 1; )
    f = t[t[s].f < t[h].f ? s++ : h++], u = t[s != v && t[s].f < t[h].f ? s++ : h++], t[v++] = { s: -1, f: f.f + u.f, l: f, r: u };
  for (var g = a[0].s, e = 1; e < i; ++e)
    a[e].s > g && (g = a[e].s);
  var x = new $(g + 1), m = Or(t[v - 1], x, 0);
  if (m > r) {
    var e = 0, z = 0, c = m - r, y = 1 << c;
    for (a.sort(function(S, U) {
      return x[U.s] - x[S.s] || S.f - U.f;
    }); e < i; ++e) {
      var M = a[e].s;
      if (x[M] > r)
        z += y - (1 << m - x[M]), x[M] = r;
      else
        break;
    }
    for (z >>>= c; z > 0; ) {
      var A = a[e].s;
      x[A] < r ? z -= 1 << r - x[A]++ - 1 : ++e;
    }
    for (; e >= 0 && z; --e) {
      var w = a[e].s;
      x[w] == r && (--x[w], ++z);
    }
    m = r;
  }
  return [new T(x), m];
}, Or = function(n, r, t) {
  return n.s == -1 ? Math.max(Or(n.l, r, t + 1), Or(n.r, r, t + 1)) : r[n.s] = t;
}, Yr = function(n) {
  for (var r = n.length; r && !n[--r]; )
    ;
  for (var t = new $(++r), e = 0, i = n[0], a = 1, o = function(u) {
    t[e++] = u;
  }, f = 1; f <= r; ++f)
    if (n[f] == i && f != r)
      ++a;
    else {
      if (!i && a > 2) {
        for (; a > 138; a -= 138)
          o(32754);
        a > 2 && (o(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
      } else if (a > 3) {
        for (o(i), --a; a > 6; a -= 6)
          o(8304);
        a > 2 && (o(a - 3 << 5 | 8208), a = 0);
      }
      for (; a--; )
        o(i);
      a = 1, i = n[f];
    }
  return [t.subarray(0, e), r];
}, hr = function(n, r) {
  for (var t = 0, e = 0; e < r.length; ++e)
    t += n[e] * r[e];
  return t;
}, Lr = function(n, r, t) {
  var e = t.length, i = Dr(r + 2);
  n[i] = e & 255, n[i + 1] = e >>> 8, n[i + 2] = n[i] ^ 255, n[i + 3] = n[i + 1] ^ 255;
  for (var a = 0; a < e; ++a)
    n[i + a + 4] = t[a];
  return (i + 4 + e) * 8;
}, Wr = function(n, r, t, e, i, a, o, f, u, s, v) {
  rr(r, v++, t), ++i[256];
  for (var h = kr(i, 15), g = h[0], x = h[1], m = kr(a, 15), z = m[0], c = m[1], y = Yr(g), M = y[0], A = y[1], w = Yr(z), I = w[0], S = w[1], U = new $(19), l = 0; l < M.length; ++l)
    U[M[l] & 31]++;
  for (var l = 0; l < I.length; ++l)
    U[I[l] & 31]++;
  for (var k = kr(U, 7), D = k[0], N = k[1], B = 19; B > 4 && !D[Tr[B - 1]]; --B)
    ;
  var G = s + 5 << 3, E = hr(i, er) + hr(a, lr) + o, L = hr(i, g) + hr(a, z) + o + 14 + 3 * B + hr(U, D) + (2 * U[16] + 3 * U[17] + 7 * U[18]);
  if (G <= E && G <= L)
    return Lr(r, v, n.subarray(u, u + s));
  var Z, O, q, W;
  if (rr(r, v, 1 + (L < E)), v += 2, L < E) {
    Z = V(g, x, 0), O = g, q = V(z, c, 0), W = z;
    var K = V(D, N, 0);
    rr(r, v, A - 257), rr(r, v + 5, S - 1), rr(r, v + 10, B - 4), v += 14;
    for (var l = 0; l < B; ++l)
      rr(r, v + 3 * l, D[Tr[l]]);
    v += 3 * B;
    for (var H = [M, I], b = 0; b < 2; ++b)
      for (var _ = H[b], l = 0; l < _.length; ++l) {
        var j = _[l] & 31;
        rr(r, v, K[j]), v += D[j], j > 15 && (rr(r, v, _[l] >>> 5 & 127), v += _[l] >>> 12);
      }
  } else
    Z = An, O = er, q = Tn, W = lr;
  for (var l = 0; l < f; ++l)
    if (e[l] > 255) {
      var j = e[l] >>> 18 & 31;
      vr(r, v, Z[j + 257]), v += O[j + 257], j > 7 && (rr(r, v, e[l] >>> 23 & 31), v += gr[j]);
      var R = e[l] & 31;
      vr(r, v, q[R]), v += W[R], R > 3 && (vr(r, v, e[l] >>> 5 & 8191), v += yr[R]);
    } else
      vr(r, v, Z[e[l]]), v += O[e[l]];
  return vr(r, v, Z[256]), v + O[256];
}, Sn = new pr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), tr = new T(0), Cn = function(n, r, t, e, i, a) {
  var o = n.length, f = new T(e + o + 5 * (1 + Math.ceil(o / 7e3)) + i), u = f.subarray(e, f.length - i), s = 0;
  if (!r || o < 8)
    for (var v = 0; v <= o; v += 65535) {
      var h = v + 65535;
      h >= o && (u[s >> 3] = a), s = Lr(u, s + 1, n.subarray(v, h));
    }
  else {
    for (var g = Sn[r - 1], x = g >>> 13, m = g & 8191, z = (1 << t) - 1, c = new $(32768), y = new $(z + 1), M = Math.ceil(t / 3), A = 2 * M, w = function($r) {
      return (n[$r] ^ n[$r + 1] << M ^ n[$r + 2] << A) & z;
    }, I = new pr(25e3), S = new $(288), U = new $(32), l = 0, k = 0, v = 0, D = 0, N = 0, B = 0; v < o; ++v) {
      var G = w(v), E = v & 32767, L = y[G];
      if (c[E] = L, y[G] = E, N <= v) {
        var Z = o - v;
        if ((l > 7e3 || D > 24576) && Z > 423) {
          s = Wr(n, u, 0, I, S, U, k, D, B, v - B, s), D = l = k = 0, B = v;
          for (var O = 0; O < 286; ++O)
            S[O] = 0;
          for (var O = 0; O < 30; ++O)
            U[O] = 0;
        }
        var q = 2, W = 0, K = m, H = E - L & 32767;
        if (Z > 2 && G == w(v - H))
          for (var b = Math.min(x, Z) - 1, _ = Math.min(32767, v), j = Math.min(258, Z); H <= _ && --K && E != L; ) {
            if (n[v + q] == n[v + q - H]) {
              for (var R = 0; R < j && n[v + R] == n[v + R - H]; ++R)
                ;
              if (R > q) {
                if (q = R, W = H, R > b)
                  break;
                for (var Fr = Math.min(H, R - 2), Mr = 0, O = 0; O < Fr; ++O) {
                  var ur = v - H + O + 32768 & 32767, jn = c[ur], fn = ur - jn + 32768 & 32767;
                  fn > Mr && (Mr = fn, L = ur);
                }
              }
            }
            E = L, L = c[E], H += E - L + 32768 & 32767;
          }
        if (W) {
          I[D++] = 268435456 | Gr[q] << 18 | Hr[W];
          var sn = Gr[q] & 31, un = Hr[W] & 31;
          k += gr[sn] + yr[un], ++S[257 + sn], ++U[un], N = v + q, ++l;
        } else
          I[D++] = n[v], ++S[n[v]];
      }
    }
    s = Wr(n, u, a, I, S, U, k, D, B, v - B, s), !a && s & 7 && (s = Lr(u, s + 1, tr));
  }
  return X(f, 0, e + Dr(s) + i);
};
(function() {
  for (var n = new Int32Array(256), r = 0; r < 256; ++r) {
    for (var t = r, e = 9; --e; )
      t = (t & 1 && -306674912) ^ t >>> 1;
    n[r] = t;
  }
  return n;
})();
var dr = function() {
  var n = 1, r = 0;
  return { p: function(t) {
    for (var e = n, i = r, a = t.length | 0, o = 0; o != a; ) {
      for (var f = Math.min(o + 2655, a); o < f; ++o)
        i += e += t[o];
      e = (e & 65535) + 15 * (e >> 16), i = (i & 65535) + 15 * (i >> 16);
    }
    n = e, r = i;
  }, d: function() {
    return n %= 65521, r %= 65521, (n & 255) << 24 | n >>> 8 << 16 | (r & 255) << 8 | r >>> 8;
  } };
}, sr = function(n, r, t, e, i) {
  return Cn(n, r.level == null ? 6 : r.level, r.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(n.length))) * 1.5) : 12 + r.mem, t, e, !i);
}, F = function(n, r, t) {
  for (; t; ++r)
    n[r] = t, t >>>= 8;
}, tn = function(n, r) {
  var t = r.level, e = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
  n[0] = 120, n[1] = e << 6 | (e ? 32 - 2 * e : 1);
};
function gn(n, r) {
  r || (r = {});
  var t = dr();
  t.p(n);
  var e = sr(n, r, 2, 4);
  return tn(e, r), F(e, e.length - 4, t.d()), e;
}
typeof TextEncoder < "u" && new TextEncoder();
var Vr = typeof TextDecoder < "u" && new TextDecoder(), Nn = 0;
try {
  Vr.decode(tr, { stream: true }), Nn = 1;
} catch {
}
const defaultConfig = {
  serverPath: "//kroki.io/"
};
function b64encode(str) {
  return btoa(str);
}
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
  const compressed = decode(gn(data, { level: 9 }));
  const result = b64encode(compressed).replace(/\+/g, "-").replace(/\//g, "_");
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
function decode(dat) {
  let r = "";
  for (let i = 0; i < dat.length; i += 16384) {
    r += String.fromCharCode(...dat.subarray(i, i + 16384));
  }
  return r;
}
main();
init_listener();
//# sourceMappingURL=notion-kroki.js.map

