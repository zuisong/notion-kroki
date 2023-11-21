// ==UserScript==
// @name              notion-kroki
// @namespace         https://github.com/zuisong/notion-kroki
// @homepage          https://github.com/zuisong/notion-kroki
// @homepageURL       https://github.com/zuisong/notion-kroki
// @source            https://github.com/zuisong/notion-kroki
// @contributionURL   https://github.com/zuisong/notion-kroki
// @grant             none
// @version           1.3.0
// @license           MIT
// @match             *://www.notion.so/*
// @match             *://*.notion.site/*
// @match             *://*.super.site/*
// @supportURL        https://github.com/zuisong/notion-kroki/issues
// @run-at            document-idle
// @author            zuisong
// @description       Render notion code block as graph by kroki
// ==/UserScript==
function debounce(func, wait) {
    let timeoutId;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>{
            timeoutId = undefined;
            func(...args);
        }, wait);
    };
}
function _debug() {
    for(var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++){
        data[_key] = arguments[_key];
    }
    if (isDebugMode()) {
        console.log(...data);
    }
}
function isDebugMode() {
    return !!localStorage.getItem("debug");
}

/* esm.sh - esbuild bundle(fflate@0.8.0) denonext production */ var U = Uint8Array, Y = Uint16Array, Zr = Int32Array, wr = new U([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    0,
    0,
    0
]), mr = new U([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    0,
    0
]), Cr = new U([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]), An = function(n, r) {
    for(var t = new Y(31), e = 0; e < 31; ++e)t[e] = r += 1 << n[e - 1];
    for(var i = new Zr(t[30]), e = 1; e < 30; ++e)for(var a = t[e]; a < t[e + 1]; ++a)i[a] = a - t[e] << 5 | e;
    return {
        b: t,
        r: i
    };
}, Mn = An(wr, 2), tn = Mn.b, qr = Mn.r;
tn[28] = 258, qr[258] = 28;
var Un = An(mr, 0), Qr = Un.r, Ir = new Y(32768);
for(C = 0; C < 32768; ++C)nr = (C & 43690) >> 1 | (C & 21845) << 1, nr = (nr & 52428) >> 2 | (nr & 13107) << 2, nr = (nr & 61680) >> 4 | (nr & 3855) << 4, Ir[C] = ((nr & 65280) >> 8 | (nr & 255) << 8) >> 1;
var nr, C, V = function(n, r, t) {
    for(var e = n.length, i = 0, a = new Y(r); i < e; ++i)n[i] && ++a[n[i] - 1];
    var o = new Y(r);
    for(i = 1; i < r; ++i)o[i] = o[i - 1] + a[i - 1] << 1;
    var s;
    if (t) {
        s = new Y(1 << r);
        var l = 15 - r;
        for(i = 0; i < e; ++i)if (n[i]) for(var h = i << 4 | n[i], f = r - n[i], u = o[n[i] - 1]++ << f, p = u | (1 << f) - 1; u <= p; ++u)s[Ir[u] >> l] = h;
    } else for(s = new Y(e), i = 0; i < e; ++i)n[i] && (s[i] = Ir[o[n[i] - 1]++] >> 15 - n[i]);
    return s;
}, tr = new U(288);
for(C = 0; C < 144; ++C)tr[C] = 8;
var C;
for(C = 144; C < 256; ++C)tr[C] = 9;
var C;
for(C = 256; C < 280; ++C)tr[C] = 7;
var C;
for(C = 280; C < 288; ++C)tr[C] = 8;
var C, gr = new U(32);
for(C = 0; C < 32; ++C)gr[C] = 5;
var C, Dn = V(tr, 9, 0); V(tr, 9, 1); var Tn = V(gr, 5, 0); V(gr, 5, 1); var xr = function(n) {
    return (n + 7) / 8 | 0;
}, X = function(n, r, t) {
    (r == null || r < 0) && (r = 0), (t == null || t > n.length) && (t = n.length);
    var e = new U(t - r);
    return e.set(n.subarray(r, t)), e;
}, _ = function(n, r, t) {
    t <<= r & 7;
    var e = r / 8 | 0;
    n[e] |= t, n[e + 1] |= t >> 8;
}, cr = function(n, r, t) {
    t <<= r & 7;
    var e = r / 8 | 0;
    n[e] |= t, n[e + 1] |= t >> 8, n[e + 2] |= t >> 16;
}, $r = function(n, r) {
    for(var t = [], e = 0; e < n.length; ++e)n[e] && t.push({
        s: e,
        f: n[e]
    });
    var i = t.length, a = t.slice();
    if (!i) return {
        t: ir,
        l: 0
    };
    if (i == 1) {
        var o = new U(t[0].s + 1);
        return o[t[0].s] = 1, {
            t: o,
            l: 1
        };
    }
    t.sort(function(I, B) {
        return I.f - B.f;
    }), t.push({
        s: -1,
        f: 25001
    });
    var s = t[0], l = t[1], h = 0, f = 1, u = 2;
    for(t[0] = {
        s: -1,
        f: s.f + l.f,
        l: s,
        r: l
    }; f != i - 1;)s = t[t[h].f < t[u].f ? h++ : u++], l = t[h != f && t[h].f < t[u].f ? h++ : u++], t[f++] = {
        s: -1,
        f: s.f + l.f,
        l: s,
        r: l
    };
    for(var p = a[0].s, e = 1; e < i; ++e)a[e].s > p && (p = a[e].s);
    var F = new Y(p + 1), m = Hr(t[f - 1], F, 0);
    if (m > r) {
        var e = 0, z = 0, c = m - r, x = 1 << c;
        for(a.sort(function(B, S) {
            return F[S.s] - F[B.s] || B.f - S.f;
        }); e < i; ++e){
            var M = a[e].s;
            if (F[M] > r) z += x - (1 << m - F[M]), F[M] = r;
            else break;
        }
        for(z >>= c; z > 0;){
            var D = a[e].s;
            F[D] < r ? z -= 1 << r - F[D]++ - 1 : ++e;
        }
        for(; e >= 0 && z; --e){
            var w = a[e].s;
            F[w] == r && (--F[w], ++z);
        }
        m = r;
    }
    return {
        t: new U(F),
        l: m
    };
}, Hr = function(n, r, t) {
    return n.s == -1 ? Math.max(Hr(n.l, r, t + 1), Hr(n.r, r, t + 1)) : r[n.s] = t;
}, Vr = function(n) {
    for(var r = n.length; r && !n[--r];);
    for(var t = new Y(++r), e = 0, i = n[0], a = 1, o = function(l) {
        t[e++] = l;
    }, s = 1; s <= r; ++s)if (n[s] == i && s != r) ++a;
    else {
        if (!i && a > 2) {
            for(; a > 138; a -= 138)o(32754);
            a > 2 && (o(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
        } else if (a > 3) {
            for(o(i), --a; a > 6; a -= 6)o(8304);
            a > 2 && (o(a - 3 << 5 | 8208), a = 0);
        }
        for(; a--;)o(i);
        a = 1, i = n[s];
    }
    return {
        c: t.subarray(0, e),
        n: r
    };
}, pr = function(n, r) {
    for(var t = 0, e = 0; e < r.length; ++e)t += n[e] * r[e];
    return t;
}, en = function(n, r, t) {
    var e = t.length, i = xr(r + 2);
    n[i] = e & 255, n[i + 1] = e >> 8, n[i + 2] = n[i] ^ 255, n[i + 3] = n[i + 1] ^ 255;
    for(var a = 0; a < e; ++a)n[i + a + 4] = t[a];
    return (i + 4 + e) * 8;
}, Xr = function(n, r, t, e, i, a, o, s, l, h, f) {
    _(r, f++, t), ++i[256];
    for(var u = $r(i, 15), p = u.t, F = u.l, m = $r(a, 15), z = m.t, c = m.l, x = Vr(p), M = x.c, D = x.n, w = Vr(z), I = w.c, B = w.n, S = new Y(19), y = 0; y < M.length; ++y)++S[M[y] & 31];
    for(var y = 0; y < I.length; ++y)++S[I[y] & 31];
    for(var g = $r(S, 7), A = g.t, $ = g.l, O = 19; O > 4 && !A[Cr[O - 1]]; --O);
    var H = h + 5 << 3, Z = pr(i, tr) + pr(a, gr) + o, E = pr(i, p) + pr(a, z) + o + 14 + 3 * O + pr(S, A) + 2 * S[16] + 3 * S[17] + 7 * S[18];
    if (l >= 0 && H <= Z && H <= E) return en(r, f, n.subarray(l, l + h));
    var P, G, L, J;
    if (_(r, f, 1 + (E < Z)), f += 2, E < Z) {
        P = V(p, F, 0), G = p, L = V(z, c, 0), J = z;
        var sr = V(A, $, 0);
        _(r, f, D - 257), _(r, f + 5, B - 1), _(r, f + 10, O - 4), f += 14;
        for(var y = 0; y < O; ++y)_(r, f + 3 * y, A[Cr[y]]);
        f += 3 * O;
        for(var N = [
            M,
            I
        ], K = 0; K < 2; ++K)for(var rr = N[K], y = 0; y < rr.length; ++y){
            var R = rr[y] & 31;
            _(r, f, sr[R]), f += A[R], R > 15 && (_(r, f, rr[y] >> 5 & 127), f += rr[y] >> 12);
        }
    } else P = Dn, G = tr, L = Tn, J = gr;
    for(var y = 0; y < s; ++y){
        var k = e[y];
        if (k > 255) {
            var R = k >> 18 & 31;
            cr(r, f, P[R + 257]), f += G[R + 257], R > 7 && (_(r, f, k >> 23 & 31), f += wr[R]);
            var b = k & 31;
            cr(r, f, L[b]), f += J[b], b > 3 && (cr(r, f, k >> 5 & 8191), f += mr[b]);
        } else cr(r, f, P[k]), f += G[k];
    }
    return cr(r, f, P[256]), f + G[256];
}, Zn = new Zr([
    65540,
    131080,
    131088,
    131104,
    262176,
    1048704,
    1048832,
    2114560,
    2117632
]), ir = new U(0), Bn = function(n, r, t, e, i, a) {
    var o = a.z || n.length, s = new U(e + o + 5 * (1 + Math.ceil(o / 7e3)) + i), l = s.subarray(e, s.length - i), h = a.l, f = (a.r || 0) & 7;
    if (r) {
        f && (l[0] = a.r >> 3);
        for(var u = Zn[r - 1], p = u >> 13, F = u & 8191, m = (1 << t) - 1, z = a.p || new Y(32768), c = a.h || new Y(m + 1), x = Math.ceil(t / 3), M = 2 * x, D = function(Jr) {
            return (n[Jr] ^ n[Jr + 1] << x ^ n[Jr + 2] << M) & m;
        }, w = new Zr(25e3), I = new Y(288), B = new Y(32), S = 0, y = 0, g = a.i || 0, A = 0, $ = a.w || 0, O = 0; g + 2 < o; ++g){
            var H = D(g), Z = g & 32767, E = c[H];
            if (z[Z] = E, c[H] = Z, $ <= g) {
                var P = o - g;
                if ((S > 7e3 || A > 24576) && (P > 423 || !h)) {
                    f = Xr(n, l, 0, w, I, B, y, A, O, g - O, f), A = S = y = 0, O = g;
                    for(var G = 0; G < 286; ++G)I[G] = 0;
                    for(var G = 0; G < 30; ++G)B[G] = 0;
                }
                var L = 2, J = 0, sr = F, N = Z - E & 32767;
                if (P > 2 && H == D(g - N)) for(var K = Math.min(p, P) - 1, rr = Math.min(32767, g), R = Math.min(258, P); N <= rr && --sr && Z != E;){
                    if (n[g + L] == n[g + L - N]) {
                        for(var k = 0; k < R && n[g + k] == n[g + k - N]; ++k);
                        if (k > L) {
                            if (L = k, J = N, k > K) break;
                            for(var b = Math.min(N, k - 2), lr = 0, G = 0; G < b; ++G){
                                var vr = g - N + G & 32767, Yr = z[vr], Dr = vr - Yr & 32767;
                                Dr > lr && (lr = Dr, E = vr);
                            }
                        }
                    }
                    Z = E, E = z[Z], N += Z - E & 32767;
                }
                if (J) {
                    w[A++] = 268435456 | qr[L] << 18 | Qr[J];
                    var Sr = qr[L] & 31, Tr = Qr[J] & 31;
                    y += wr[Sr] + mr[Tr], ++I[257 + Sr], ++B[Tr], $ = g + L, ++S;
                } else w[A++] = n[g], ++I[n[g]];
            }
        }
        for(g = Math.max(g, $); g < o; ++g)w[A++] = n[g], ++I[n[g]];
        f = Xr(n, l, h, w, I, B, y, A, O, g - O, f), h || (a.r = f & 7 | l[f / 8 | 0] << 3, f -= 7, a.h = c, a.p = z, a.i = g, a.w = $);
    } else {
        for(var g = a.w || 0; g < o + h; g += 65535){
            var jr = g + 65535;
            jr >= o && (l[f / 8 | 0] = h, jr = o), f = en(l, f + 1, n.subarray(g, jr));
        }
        a.i = o;
    }
    return X(s, 0, e + xr(f) + i);
}; (function() {
    for(var n = new Int32Array(256), r = 0; r < 256; ++r){
        for(var t = r, e = 9; --e;)t = (t & 1 && -306674912) ^ t >>> 1;
        n[r] = t;
    }
    return n;
})(); var Rr = function() {
    var n = 1, r = 0;
    return {
        p: function(t) {
            for(var e = n, i = r, a = t.length | 0, o = 0; o != a;){
                for(var s = Math.min(o + 2655, a); o < s; ++o)i += e += t[o];
                e = (e & 65535) + 15 * (e >> 16), i = (i & 65535) + 15 * (i >> 16);
            }
            n = e, r = i;
        },
        d: function() {
            return n %= 65521, r %= 65521, (n & 255) << 24 | (n & 65280) << 8 | (r & 255) << 8 | r >> 8;
        }
    };
}, hr = function(n, r, t, e, i) {
    if (!i && (i = {
        l: 1
    }, r.dictionary)) {
        var a = r.dictionary.subarray(-32768), o = new U(a.length + n.length);
        o.set(a), o.set(n, a.length), n = o, i.w = a.length;
    }
    return Bn(n, r.level == null ? 6 : r.level, r.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(n.length))) * 1.5) : 12 + r.mem, t, e, i);
}, T = function(n, r, t) {
    for(; t; ++r)n[r] = t, t >>>= 8;
}, hn = function(n, r) {
    var t = r.level, e = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
    if (n[0] = 120, n[1] = e << 6 | (r.dictionary && 32), n[1] |= 31 - (n[0] << 8 | n[1]) % 31, r.dictionary) {
        var i = Rr();
        i.p(r.dictionary), T(n, 2, i.d());
    }
};
function mn(n, r) {
    r || (r = {});
    var t = Rr();
    t.p(n);
    var e = hr(n, r, r.dictionary ? 6 : 2, 4);
    return hn(e, r), T(e, e.length - 4, t.d()), e;
}
typeof TextEncoder < "u" && new TextEncoder; var nn = typeof TextDecoder < "u" && new TextDecoder, Nn = 0;
try {
    nn.decode(ir, {
        stream: !0
    }), Nn = 1;
} catch (e) {}

const defaultConfig = {
    serverPath: "https://kroki.io/"
};
function main() {
    let element = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    const blocks = Array.from((element || document.body).querySelectorAll("*")).filter((it)=>it.innerHTML.trim().startsWith("//kroki "));
    for (const codeDiv of blocks){
        const lines = codeDiv.textContent.split("\n");
        const type = lines[0].replace("//kroki", "").trim();
        if (!type.trim()) continue;
        const data = lines.filter((_value, index)=>index !== 0).join("\n");
        if (!data.trim()) continue;
        const svgUrl = plant(data, type, defaultConfig);
        const div = document.createElement("div");
        div.setAttribute("style", "display: flex; flex-direction: row; place-content: center;");
        div.setAttribute("notion-kroki", "true");
        div.innerHTML = `<object type="image/svg+xml" style="max-width: 100%;" data="${svgUrl}" />`;
        const parentElement = codeDiv.parentElement.parentElement;
        const preCreatedNode = parentElement.querySelector("div[notion-kroki]");
        if (preCreatedNode) {
            const preSvgUrl = preCreatedNode.firstElementChild.getAttribute("data");
            _debug(`preSvgUrl:${preSvgUrl}`);
            _debug(`svgUrl:${svgUrl}`);
            if (preSvgUrl === svgUrl) {
                continue;
            } else {
                parentElement.removeChild(preCreatedNode);
            }
        }
        parentElement.appendChild(div);
    }
}
function textEncode(str) {
    return new TextEncoder().encode(str);
}
function plant(content, type, config) {
    _debug(`kroki render type: ${type}`);
    _debug(`kroki render content:\n${content}`);
    const urlPrefix = `${config.serverPath + type}/svg/`;
    const data = textEncode(content);
    const compressed = strFromU8(mn(data, {
        level: 9
    }));
    const result = btoa(compressed).replace(/\+/g, "-").replace(/\//g, "_");
    const svgUrl = urlPrefix + result;
    return svgUrl;
}
function init_listener() {
    if (typeof MutationObserver !== typeof undefined) {
        new MutationObserver(check).observe(document, {
            childList: true,
            subtree: true
        });
    }
}
const render = debounce(main, 100);
function check(mutations, _observer) {
    // _debug("mutations", mutations);
    render();
}
function strFromU8(dat) {
    let r = "";
    const s = 2 ** 15;
    for(let i = 0; i < dat.length; i += s){
        r += String.fromCharCode(...dat.subarray(i, i + s));
    }
    return r;
}

main();
init_listener();
//# sourceMappingURL=notion-kroki.user.js.map
