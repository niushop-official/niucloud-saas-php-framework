import { defineComponent as Ti, computed as Ci, ref as Zt, onMounted as Mi, resolveComponent as ki, openBlock as Li, createElementBlock as Ai, Fragment as xi, createVNode as Pn, createElementVNode as Di } from "vue";
import { hs as Oi, ht as Hi, j as Bn } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
var kt = {}, Ni = {
  get exports() {
    return kt;
  },
  set exports(it) {
    kt = it;
  }
};
/*!
 * Vditor v3.10.9 - A markdown editor written in TypeScript.
 *
 * MIT License
 *
 * Copyright (c) 2018-present B3log 开源, b3log.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function(it, Gt) {
  (function(Je, X) {
    it.exports = X();
  })(Hi, () => (
    /******/
    (() => {
      var Ge = {
        /***/
        192: (
          /***/
          (z) => {
            var v = function() {
              this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
            }, T = -1, x = 1, A = 0;
            v.Diff = function(c, l) {
              return [c, l];
            }, v.prototype.diff_main = function(c, l, g, p) {
              typeof p > "u" && (this.Diff_Timeout <= 0 ? p = Number.MAX_VALUE : p = new Date().getTime() + this.Diff_Timeout * 1e3);
              var m = p;
              if (c == null || l == null)
                throw new Error("Null input. (diff_main)");
              if (c == l)
                return c ? [new v.Diff(A, c)] : [];
              typeof g > "u" && (g = !0);
              var d = g, w = this.diff_commonPrefix(c, l), _ = c.substring(0, w);
              c = c.substring(w), l = l.substring(w), w = this.diff_commonSuffix(c, l);
              var y = c.substring(c.length - w);
              c = c.substring(0, c.length - w), l = l.substring(0, l.length - w);
              var b = this.diff_compute_(c, l, d, m);
              return _ && b.unshift(new v.Diff(A, _)), y && b.push(new v.Diff(A, y)), this.diff_cleanupMerge(b), b;
            }, v.prototype.diff_compute_ = function(c, l, g, p) {
              var m;
              if (!c)
                return [new v.Diff(x, l)];
              if (!l)
                return [new v.Diff(T, c)];
              var d = c.length > l.length ? c : l, w = c.length > l.length ? l : c, _ = d.indexOf(w);
              if (_ != -1)
                return m = [new v.Diff(x, d.substring(0, _)), new v.Diff(A, w), new v.Diff(x, d.substring(_ + w.length))], c.length > l.length && (m[0][0] = m[2][0] = T), m;
              if (w.length == 1)
                return [new v.Diff(T, c), new v.Diff(x, l)];
              var y = this.diff_halfMatch_(c, l);
              if (y) {
                var b = y[0], s = y[1], E = y[2], L = y[3], D = y[4], C = this.diff_main(b, E, g, p), I = this.diff_main(s, L, g, p);
                return C.concat([new v.Diff(A, D)], I);
              }
              return g && c.length > 100 && l.length > 100 ? this.diff_lineMode_(c, l, p) : this.diff_bisect_(c, l, p);
            }, v.prototype.diff_lineMode_ = function(c, l, g) {
              var p = this.diff_linesToChars_(c, l);
              c = p.chars1, l = p.chars2;
              var m = p.lineArray, d = this.diff_main(c, l, !1, g);
              this.diff_charsToLines_(d, m), this.diff_cleanupSemantic(d), d.push(new v.Diff(A, ""));
              for (var w = 0, _ = 0, y = 0, b = "", s = ""; w < d.length; ) {
                switch (d[w][0]) {
                  case x:
                    y++, s += d[w][1];
                    break;
                  case T:
                    _++, b += d[w][1];
                    break;
                  case A:
                    if (_ >= 1 && y >= 1) {
                      d.splice(w - _ - y, _ + y), w = w - _ - y;
                      for (var E = this.diff_main(b, s, !1, g), L = E.length - 1; L >= 0; L--)
                        d.splice(w, 0, E[L]);
                      w = w + E.length;
                    }
                    y = 0, _ = 0, b = "", s = "";
                    break;
                }
                w++;
              }
              return d.pop(), d;
            }, v.prototype.diff_bisect_ = function(c, l, g) {
              for (var p = c.length, m = l.length, d = Math.ceil((p + m) / 2), w = d, _ = 2 * d, y = new Array(_), b = new Array(_), s = 0; s < _; s++)
                y[s] = -1, b[s] = -1;
              y[w + 1] = 0, b[w + 1] = 0;
              for (var E = p - m, L = E % 2 != 0, D = 0, C = 0, I = 0, V = 0, F = 0; F < d && !(new Date().getTime() > g); F++) {
                for (var $ = -F + D; $ <= F - C; $ += 2) {
                  var ee = w + $, se;
                  $ == -F || $ != F && y[ee - 1] < y[ee + 1] ? se = y[ee + 1] : se = y[ee - 1] + 1;
                  for (var me = se - $; se < p && me < m && c.charAt(se) == l.charAt(me); )
                    se++, me++;
                  if (y[ee] = se, se > p)
                    C += 2;
                  else if (me > m)
                    D += 2;
                  else if (L) {
                    var fe = w + E - $;
                    if (fe >= 0 && fe < _ && b[fe] != -1) {
                      var le = p - b[fe];
                      if (se >= le)
                        return this.diff_bisectSplit_(c, l, se, me, g);
                    }
                  }
                }
                for (var be = -F + I; be <= F - V; be += 2) {
                  var fe = w + be, le;
                  be == -F || be != F && b[fe - 1] < b[fe + 1] ? le = b[fe + 1] : le = b[fe - 1] + 1;
                  for (var Te = le - be; le < p && Te < m && c.charAt(p - le - 1) == l.charAt(m - Te - 1); )
                    le++, Te++;
                  if (b[fe] = le, le > p)
                    V += 2;
                  else if (Te > m)
                    I += 2;
                  else if (!L) {
                    var ee = w + E - be;
                    if (ee >= 0 && ee < _ && y[ee] != -1) {
                      var se = y[ee], me = w + se - ee;
                      if (le = p - le, se >= le)
                        return this.diff_bisectSplit_(c, l, se, me, g);
                    }
                  }
                }
              }
              return [new v.Diff(T, c), new v.Diff(x, l)];
            }, v.prototype.diff_bisectSplit_ = function(c, l, g, p, m) {
              var d = c.substring(0, g), w = l.substring(0, p), _ = c.substring(g), y = l.substring(p), b = this.diff_main(d, w, !1, m), s = this.diff_main(_, y, !1, m);
              return b.concat(s);
            }, v.prototype.diff_linesToChars_ = function(c, l) {
              var g = [], p = {};
              g[0] = "";
              function m(y) {
                for (var b = "", s = 0, E = -1, L = g.length; E < y.length - 1; ) {
                  E = y.indexOf(`
`, s), E == -1 && (E = y.length - 1);
                  var D = y.substring(s, E + 1);
                  (p.hasOwnProperty ? p.hasOwnProperty(D) : p[D] !== void 0) ? b += String.fromCharCode(p[D]) : (L == d && (D = y.substring(s), E = y.length), b += String.fromCharCode(L), p[D] = L, g[L++] = D), s = E + 1;
                }
                return b;
              }
              var d = 4e4, w = m(c);
              d = 65535;
              var _ = m(l);
              return {
                chars1: w,
                chars2: _,
                lineArray: g
              };
            }, v.prototype.diff_charsToLines_ = function(c, l) {
              for (var g = 0; g < c.length; g++) {
                for (var p = c[g][1], m = [], d = 0; d < p.length; d++)
                  m[d] = l[p.charCodeAt(d)];
                c[g][1] = m.join("");
              }
            }, v.prototype.diff_commonPrefix = function(c, l) {
              if (!c || !l || c.charAt(0) != l.charAt(0))
                return 0;
              for (var g = 0, p = Math.min(c.length, l.length), m = p, d = 0; g < m; )
                c.substring(d, m) == l.substring(d, m) ? (g = m, d = g) : p = m, m = Math.floor((p - g) / 2 + g);
              return m;
            }, v.prototype.diff_commonSuffix = function(c, l) {
              if (!c || !l || c.charAt(c.length - 1) != l.charAt(l.length - 1))
                return 0;
              for (var g = 0, p = Math.min(c.length, l.length), m = p, d = 0; g < m; )
                c.substring(c.length - m, c.length - d) == l.substring(l.length - m, l.length - d) ? (g = m, d = g) : p = m, m = Math.floor((p - g) / 2 + g);
              return m;
            }, v.prototype.diff_commonOverlap_ = function(c, l) {
              var g = c.length, p = l.length;
              if (g == 0 || p == 0)
                return 0;
              g > p ? c = c.substring(g - p) : g < p && (l = l.substring(0, g));
              var m = Math.min(g, p);
              if (c == l)
                return m;
              for (var d = 0, w = 1; ; ) {
                var _ = c.substring(m - w), y = l.indexOf(_);
                if (y == -1)
                  return d;
                w += y, (y == 0 || c.substring(m - w) == l.substring(0, w)) && (d = w, w++);
              }
            }, v.prototype.diff_halfMatch_ = function(c, l) {
              if (this.Diff_Timeout <= 0)
                return null;
              var g = c.length > l.length ? c : l, p = c.length > l.length ? l : c;
              if (g.length < 4 || p.length * 2 < g.length)
                return null;
              var m = this;
              function d(C, I, V) {
                for (var F = C.substring(V, V + Math.floor(C.length / 4)), $ = -1, ee = "", se, me, fe, le; ($ = I.indexOf(F, $ + 1)) != -1; ) {
                  var be = m.diff_commonPrefix(C.substring(V), I.substring($)), Te = m.diff_commonSuffix(C.substring(0, V), I.substring(0, $));
                  ee.length < Te + be && (ee = I.substring($ - Te, $) + I.substring($, $ + be), se = C.substring(0, V - Te), me = C.substring(V + be), fe = I.substring(0, $ - Te), le = I.substring($ + be));
                }
                return ee.length * 2 >= C.length ? [se, me, fe, le, ee] : null;
              }
              var w = d(g, p, Math.ceil(g.length / 4)), _ = d(g, p, Math.ceil(g.length / 2)), y;
              if (!w && !_)
                return null;
              _ ? w ? y = w[4].length > _[4].length ? w : _ : y = _ : y = w;
              var b, s, E, L;
              c.length > l.length ? (b = y[0], s = y[1], E = y[2], L = y[3]) : (E = y[0], L = y[1], b = y[2], s = y[3]);
              var D = y[4];
              return [b, s, E, L, D];
            }, v.prototype.diff_cleanupSemantic = function(c) {
              for (var l = !1, g = [], p = 0, m = null, d = 0, w = 0, _ = 0, y = 0, b = 0; d < c.length; )
                c[d][0] == A ? (g[p++] = d, w = y, _ = b, y = 0, b = 0, m = c[d][1]) : (c[d][0] == x ? y += c[d][1].length : b += c[d][1].length, m && m.length <= Math.max(w, _) && m.length <= Math.max(y, b) && (c.splice(g[p - 1], 0, new v.Diff(T, m)), c[g[p - 1] + 1][0] = x, p--, p--, d = p > 0 ? g[p - 1] : -1, w = 0, _ = 0, y = 0, b = 0, m = null, l = !0)), d++;
              for (l && this.diff_cleanupMerge(c), this.diff_cleanupSemanticLossless(c), d = 1; d < c.length; ) {
                if (c[d - 1][0] == T && c[d][0] == x) {
                  var s = c[d - 1][1], E = c[d][1], L = this.diff_commonOverlap_(s, E), D = this.diff_commonOverlap_(E, s);
                  L >= D ? (L >= s.length / 2 || L >= E.length / 2) && (c.splice(d, 0, new v.Diff(A, E.substring(0, L))), c[d - 1][1] = s.substring(0, s.length - L), c[d + 1][1] = E.substring(L), d++) : (D >= s.length / 2 || D >= E.length / 2) && (c.splice(d, 0, new v.Diff(A, s.substring(0, D))), c[d - 1][0] = x, c[d - 1][1] = E.substring(0, E.length - D), c[d + 1][0] = T, c[d + 1][1] = s.substring(D), d++), d++;
                }
                d++;
              }
            }, v.prototype.diff_cleanupSemanticLossless = function(c) {
              function l(D, C) {
                if (!D || !C)
                  return 6;
                var I = D.charAt(D.length - 1), V = C.charAt(0), F = I.match(v.nonAlphaNumericRegex_), $ = V.match(v.nonAlphaNumericRegex_), ee = F && I.match(v.whitespaceRegex_), se = $ && V.match(v.whitespaceRegex_), me = ee && I.match(v.linebreakRegex_), fe = se && V.match(v.linebreakRegex_), le = me && D.match(v.blanklineEndRegex_), be = fe && C.match(v.blanklineStartRegex_);
                return le || be ? 5 : me || fe ? 4 : F && !ee && se ? 3 : ee || se ? 2 : F || $ ? 1 : 0;
              }
              for (var g = 1; g < c.length - 1; ) {
                if (c[g - 1][0] == A && c[g + 1][0] == A) {
                  var p = c[g - 1][1], m = c[g][1], d = c[g + 1][1], w = this.diff_commonSuffix(p, m);
                  if (w) {
                    var _ = m.substring(m.length - w);
                    p = p.substring(0, p.length - w), m = _ + m.substring(0, m.length - w), d = _ + d;
                  }
                  for (var y = p, b = m, s = d, E = l(p, m) + l(m, d); m.charAt(0) === d.charAt(0); ) {
                    p += m.charAt(0), m = m.substring(1) + d.charAt(0), d = d.substring(1);
                    var L = l(p, m) + l(m, d);
                    L >= E && (E = L, y = p, b = m, s = d);
                  }
                  c[g - 1][1] != y && (y ? c[g - 1][1] = y : (c.splice(g - 1, 1), g--), c[g][1] = b, s ? c[g + 1][1] = s : (c.splice(g + 1, 1), g--));
                }
                g++;
              }
            }, v.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, v.whitespaceRegex_ = /\s/, v.linebreakRegex_ = /[\r\n]/, v.blanklineEndRegex_ = /\n\r?\n$/, v.blanklineStartRegex_ = /^\r?\n\r?\n/, v.prototype.diff_cleanupEfficiency = function(c) {
              for (var l = !1, g = [], p = 0, m = null, d = 0, w = !1, _ = !1, y = !1, b = !1; d < c.length; )
                c[d][0] == A ? (c[d][1].length < this.Diff_EditCost && (y || b) ? (g[p++] = d, w = y, _ = b, m = c[d][1]) : (p = 0, m = null), y = b = !1) : (c[d][0] == T ? b = !0 : y = !0, m && (w && _ && y && b || m.length < this.Diff_EditCost / 2 && w + _ + y + b == 3) && (c.splice(g[p - 1], 0, new v.Diff(T, m)), c[g[p - 1] + 1][0] = x, p--, m = null, w && _ ? (y = b = !0, p = 0) : (p--, d = p > 0 ? g[p - 1] : -1, y = b = !1), l = !0)), d++;
              l && this.diff_cleanupMerge(c);
            }, v.prototype.diff_cleanupMerge = function(c) {
              c.push(new v.Diff(A, ""));
              for (var l = 0, g = 0, p = 0, m = "", d = "", w; l < c.length; )
                switch (c[l][0]) {
                  case x:
                    p++, d += c[l][1], l++;
                    break;
                  case T:
                    g++, m += c[l][1], l++;
                    break;
                  case A:
                    g + p > 1 ? (g !== 0 && p !== 0 && (w = this.diff_commonPrefix(d, m), w !== 0 && (l - g - p > 0 && c[l - g - p - 1][0] == A ? c[l - g - p - 1][1] += d.substring(0, w) : (c.splice(0, 0, new v.Diff(A, d.substring(0, w))), l++), d = d.substring(w), m = m.substring(w)), w = this.diff_commonSuffix(d, m), w !== 0 && (c[l][1] = d.substring(d.length - w) + c[l][1], d = d.substring(0, d.length - w), m = m.substring(0, m.length - w))), l -= g + p, c.splice(l, g + p), m.length && (c.splice(l, 0, new v.Diff(T, m)), l++), d.length && (c.splice(l, 0, new v.Diff(x, d)), l++), l++) : l !== 0 && c[l - 1][0] == A ? (c[l - 1][1] += c[l][1], c.splice(l, 1)) : l++, p = 0, g = 0, m = "", d = "";
                    break;
                }
              c[c.length - 1][1] === "" && c.pop();
              var _ = !1;
              for (l = 1; l < c.length - 1; )
                c[l - 1][0] == A && c[l + 1][0] == A && (c[l][1].substring(c[l][1].length - c[l - 1][1].length) == c[l - 1][1] ? (c[l][1] = c[l - 1][1] + c[l][1].substring(0, c[l][1].length - c[l - 1][1].length), c[l + 1][1] = c[l - 1][1] + c[l + 1][1], c.splice(l - 1, 1), _ = !0) : c[l][1].substring(0, c[l + 1][1].length) == c[l + 1][1] && (c[l - 1][1] += c[l + 1][1], c[l][1] = c[l][1].substring(c[l + 1][1].length) + c[l + 1][1], c.splice(l + 1, 1), _ = !0)), l++;
              _ && this.diff_cleanupMerge(c);
            }, v.prototype.diff_xIndex = function(c, l) {
              var g = 0, p = 0, m = 0, d = 0, w;
              for (w = 0; w < c.length && (c[w][0] !== x && (g += c[w][1].length), c[w][0] !== T && (p += c[w][1].length), !(g > l)); w++)
                m = g, d = p;
              return c.length != w && c[w][0] === T ? d : d + (l - m);
            }, v.prototype.diff_prettyHtml = function(c) {
              for (var l = [], g = /&/g, p = /</g, m = />/g, d = /\n/g, w = 0; w < c.length; w++) {
                var _ = c[w][0], y = c[w][1], b = y.replace(g, "&amp;").replace(p, "&lt;").replace(m, "&gt;").replace(d, "&para;<br>");
                switch (_) {
                  case x:
                    l[w] = '<ins style="background:#e6ffe6;">' + b + "</ins>";
                    break;
                  case T:
                    l[w] = '<del style="background:#ffe6e6;">' + b + "</del>";
                    break;
                  case A:
                    l[w] = "<span>" + b + "</span>";
                    break;
                }
              }
              return l.join("");
            }, v.prototype.diff_text1 = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                c[g][0] !== x && (l[g] = c[g][1]);
              return l.join("");
            }, v.prototype.diff_text2 = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                c[g][0] !== T && (l[g] = c[g][1]);
              return l.join("");
            }, v.prototype.diff_levenshtein = function(c) {
              for (var l = 0, g = 0, p = 0, m = 0; m < c.length; m++) {
                var d = c[m][0], w = c[m][1];
                switch (d) {
                  case x:
                    g += w.length;
                    break;
                  case T:
                    p += w.length;
                    break;
                  case A:
                    l += Math.max(g, p), g = 0, p = 0;
                    break;
                }
              }
              return l += Math.max(g, p), l;
            }, v.prototype.diff_toDelta = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                switch (c[g][0]) {
                  case x:
                    l[g] = "+" + encodeURI(c[g][1]);
                    break;
                  case T:
                    l[g] = "-" + c[g][1].length;
                    break;
                  case A:
                    l[g] = "=" + c[g][1].length;
                    break;
                }
              return l.join("	").replace(/%20/g, " ");
            }, v.prototype.diff_fromDelta = function(c, l) {
              for (var g = [], p = 0, m = 0, d = l.split(/\t/g), w = 0; w < d.length; w++) {
                var _ = d[w].substring(1);
                switch (d[w].charAt(0)) {
                  case "+":
                    try {
                      g[p++] = new v.Diff(x, decodeURI(_));
                    } catch {
                      throw new Error("Illegal escape in diff_fromDelta: " + _);
                    }
                    break;
                  case "-":
                  case "=":
                    var y = parseInt(_, 10);
                    if (isNaN(y) || y < 0)
                      throw new Error("Invalid number in diff_fromDelta: " + _);
                    var b = c.substring(m, m += y);
                    d[w].charAt(0) == "=" ? g[p++] = new v.Diff(A, b) : g[p++] = new v.Diff(T, b);
                    break;
                  default:
                    if (d[w])
                      throw new Error("Invalid diff operation in diff_fromDelta: " + d[w]);
                }
              }
              if (m != c.length)
                throw new Error("Delta length (" + m + ") does not equal source text length (" + c.length + ").");
              return g;
            }, v.prototype.match_main = function(c, l, g) {
              if (c == null || l == null || g == null)
                throw new Error("Null input. (match_main)");
              return g = Math.max(0, Math.min(g, c.length)), c == l ? 0 : c.length ? c.substring(g, g + l.length) == l ? g : this.match_bitap_(c, l, g) : -1;
            }, v.prototype.match_bitap_ = function(c, l, g) {
              if (l.length > this.Match_MaxBits)
                throw new Error("Pattern too long for this browser.");
              var p = this.match_alphabet_(l), m = this;
              function d(se, me) {
                var fe = se / l.length, le = Math.abs(g - me);
                return m.Match_Distance ? fe + le / m.Match_Distance : le ? 1 : fe;
              }
              var w = this.Match_Threshold, _ = c.indexOf(l, g);
              _ != -1 && (w = Math.min(d(0, _), w), _ = c.lastIndexOf(l, g + l.length), _ != -1 && (w = Math.min(d(0, _), w)));
              var y = 1 << l.length - 1;
              _ = -1;
              for (var b, s, E = l.length + c.length, L, D = 0; D < l.length; D++) {
                for (b = 0, s = E; b < s; )
                  d(D, g + s) <= w ? b = s : E = s, s = Math.floor((E - b) / 2 + b);
                E = s;
                var C = Math.max(1, g - s + 1), I = Math.min(g + s, c.length) + l.length, V = Array(I + 2);
                V[I + 1] = (1 << D) - 1;
                for (var F = I; F >= C; F--) {
                  var $ = p[c.charAt(F - 1)];
                  if (D === 0 ? V[F] = (V[F + 1] << 1 | 1) & $ : V[F] = (V[F + 1] << 1 | 1) & $ | ((L[F + 1] | L[F]) << 1 | 1) | L[F + 1], V[F] & y) {
                    var ee = d(D, F - 1);
                    if (ee <= w)
                      if (w = ee, _ = F - 1, _ > g)
                        C = Math.max(1, 2 * g - _);
                      else
                        break;
                  }
                }
                if (d(D + 1, g) > w)
                  break;
                L = V;
              }
              return _;
            }, v.prototype.match_alphabet_ = function(c) {
              for (var l = {}, g = 0; g < c.length; g++)
                l[c.charAt(g)] = 0;
              for (var g = 0; g < c.length; g++)
                l[c.charAt(g)] |= 1 << c.length - g - 1;
              return l;
            }, v.prototype.patch_addContext_ = function(c, l) {
              if (l.length != 0) {
                if (c.start2 === null)
                  throw Error("patch not initialized");
                for (var g = l.substring(c.start2, c.start2 + c.length1), p = 0; l.indexOf(g) != l.lastIndexOf(g) && g.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
                  p += this.Patch_Margin, g = l.substring(c.start2 - p, c.start2 + c.length1 + p);
                p += this.Patch_Margin;
                var m = l.substring(c.start2 - p, c.start2);
                m && c.diffs.unshift(new v.Diff(A, m));
                var d = l.substring(c.start2 + c.length1, c.start2 + c.length1 + p);
                d && c.diffs.push(new v.Diff(A, d)), c.start1 -= m.length, c.start2 -= m.length, c.length1 += m.length + d.length, c.length2 += m.length + d.length;
              }
            }, v.prototype.patch_make = function(c, l, g) {
              var p, m;
              if (typeof c == "string" && typeof l == "string" && typeof g > "u")
                p = /** @type {string} */
                c, m = this.diff_main(
                  p,
                  /** @type {string} */
                  l,
                  !0
                ), m.length > 2 && (this.diff_cleanupSemantic(m), this.diff_cleanupEfficiency(m));
              else if (c && typeof c == "object" && typeof l > "u" && typeof g > "u")
                m = /** @type {!Array.<!diff_match_patch.Diff>} */
                c, p = this.diff_text1(m);
              else if (typeof c == "string" && l && typeof l == "object" && typeof g > "u")
                p = /** @type {string} */
                c, m = /** @type {!Array.<!diff_match_patch.Diff>} */
                l;
              else if (typeof c == "string" && typeof l == "string" && g && typeof g == "object")
                p = /** @type {string} */
                c, m = /** @type {!Array.<!diff_match_patch.Diff>} */
                g;
              else
                throw new Error("Unknown call format to patch_make.");
              if (m.length === 0)
                return [];
              for (var d = [], w = new v.patch_obj(), _ = 0, y = 0, b = 0, s = p, E = p, L = 0; L < m.length; L++) {
                var D = m[L][0], C = m[L][1];
                switch (!_ && D !== A && (w.start1 = y, w.start2 = b), D) {
                  case x:
                    w.diffs[_++] = m[L], w.length2 += C.length, E = E.substring(0, b) + C + E.substring(b);
                    break;
                  case T:
                    w.length1 += C.length, w.diffs[_++] = m[L], E = E.substring(0, b) + E.substring(b + C.length);
                    break;
                  case A:
                    C.length <= 2 * this.Patch_Margin && _ && m.length != L + 1 ? (w.diffs[_++] = m[L], w.length1 += C.length, w.length2 += C.length) : C.length >= 2 * this.Patch_Margin && _ && (this.patch_addContext_(w, s), d.push(w), w = new v.patch_obj(), _ = 0, s = E, y = b);
                    break;
                }
                D !== x && (y += C.length), D !== T && (b += C.length);
              }
              return _ && (this.patch_addContext_(w, s), d.push(w)), d;
            }, v.prototype.patch_deepCopy = function(c) {
              for (var l = [], g = 0; g < c.length; g++) {
                var p = c[g], m = new v.patch_obj();
                m.diffs = [];
                for (var d = 0; d < p.diffs.length; d++)
                  m.diffs[d] = new v.Diff(p.diffs[d][0], p.diffs[d][1]);
                m.start1 = p.start1, m.start2 = p.start2, m.length1 = p.length1, m.length2 = p.length2, l[g] = m;
              }
              return l;
            }, v.prototype.patch_apply = function(c, l) {
              if (c.length == 0)
                return [l, []];
              c = this.patch_deepCopy(c);
              var g = this.patch_addPadding(c);
              l = g + l + g, this.patch_splitMax(c);
              for (var p = 0, m = [], d = 0; d < c.length; d++) {
                var w = c[d].start2 + p, _ = this.diff_text1(c[d].diffs), y, b = -1;
                if (_.length > this.Match_MaxBits ? (y = this.match_main(l, _.substring(0, this.Match_MaxBits), w), y != -1 && (b = this.match_main(l, _.substring(_.length - this.Match_MaxBits), w + _.length - this.Match_MaxBits), (b == -1 || y >= b) && (y = -1))) : y = this.match_main(l, _, w), y == -1)
                  m[d] = !1, p -= c[d].length2 - c[d].length1;
                else {
                  m[d] = !0, p = y - w;
                  var s;
                  if (b == -1 ? s = l.substring(y, y + _.length) : s = l.substring(y, b + this.Match_MaxBits), _ == s)
                    l = l.substring(0, y) + this.diff_text2(c[d].diffs) + l.substring(y + _.length);
                  else {
                    var E = this.diff_main(_, s, !1);
                    if (_.length > this.Match_MaxBits && this.diff_levenshtein(E) / _.length > this.Patch_DeleteThreshold)
                      m[d] = !1;
                    else {
                      this.diff_cleanupSemanticLossless(E);
                      for (var L = 0, D, C = 0; C < c[d].diffs.length; C++) {
                        var I = c[d].diffs[C];
                        I[0] !== A && (D = this.diff_xIndex(E, L)), I[0] === x ? l = l.substring(0, y + D) + I[1] + l.substring(y + D) : I[0] === T && (l = l.substring(0, y + D) + l.substring(y + this.diff_xIndex(E, L + I[1].length))), I[0] !== T && (L += I[1].length);
                      }
                    }
                  }
                }
              }
              return l = l.substring(g.length, l.length - g.length), [l, m];
            }, v.prototype.patch_addPadding = function(c) {
              for (var l = this.Patch_Margin, g = "", p = 1; p <= l; p++)
                g += String.fromCharCode(p);
              for (var p = 0; p < c.length; p++)
                c[p].start1 += l, c[p].start2 += l;
              var m = c[0], d = m.diffs;
              if (d.length == 0 || d[0][0] != A)
                d.unshift(new v.Diff(A, g)), m.start1 -= l, m.start2 -= l, m.length1 += l, m.length2 += l;
              else if (l > d[0][1].length) {
                var w = l - d[0][1].length;
                d[0][1] = g.substring(d[0][1].length) + d[0][1], m.start1 -= w, m.start2 -= w, m.length1 += w, m.length2 += w;
              }
              if (m = c[c.length - 1], d = m.diffs, d.length == 0 || d[d.length - 1][0] != A)
                d.push(new v.Diff(A, g)), m.length1 += l, m.length2 += l;
              else if (l > d[d.length - 1][1].length) {
                var w = l - d[d.length - 1][1].length;
                d[d.length - 1][1] += g.substring(0, w), m.length1 += w, m.length2 += w;
              }
              return g;
            }, v.prototype.patch_splitMax = function(c) {
              for (var l = this.Match_MaxBits, g = 0; g < c.length; g++)
                if (!(c[g].length1 <= l)) {
                  var p = c[g];
                  c.splice(g--, 1);
                  for (var m = p.start1, d = p.start2, w = ""; p.diffs.length !== 0; ) {
                    var _ = new v.patch_obj(), y = !0;
                    for (_.start1 = m - w.length, _.start2 = d - w.length, w !== "" && (_.length1 = _.length2 = w.length, _.diffs.push(new v.Diff(A, w))); p.diffs.length !== 0 && _.length1 < l - this.Patch_Margin; ) {
                      var b = p.diffs[0][0], s = p.diffs[0][1];
                      b === x ? (_.length2 += s.length, d += s.length, _.diffs.push(p.diffs.shift()), y = !1) : b === T && _.diffs.length == 1 && _.diffs[0][0] == A && s.length > 2 * l ? (_.length1 += s.length, m += s.length, y = !1, _.diffs.push(new v.Diff(b, s)), p.diffs.shift()) : (s = s.substring(0, l - _.length1 - this.Patch_Margin), _.length1 += s.length, m += s.length, b === A ? (_.length2 += s.length, d += s.length) : y = !1, _.diffs.push(new v.Diff(b, s)), s == p.diffs[0][1] ? p.diffs.shift() : p.diffs[0][1] = p.diffs[0][1].substring(s.length));
                    }
                    w = this.diff_text2(_.diffs), w = w.substring(w.length - this.Patch_Margin);
                    var E = this.diff_text1(p.diffs).substring(0, this.Patch_Margin);
                    E !== "" && (_.length1 += E.length, _.length2 += E.length, _.diffs.length !== 0 && _.diffs[_.diffs.length - 1][0] === A ? _.diffs[_.diffs.length - 1][1] += E : _.diffs.push(new v.Diff(A, E))), y || c.splice(++g, 0, _);
                  }
                }
            }, v.prototype.patch_toText = function(c) {
              for (var l = [], g = 0; g < c.length; g++)
                l[g] = c[g];
              return l.join("");
            }, v.prototype.patch_fromText = function(c) {
              var l = [];
              if (!c)
                return l;
              for (var g = c.split(`
`), p = 0, m = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; p < g.length; ) {
                var d = g[p].match(m);
                if (!d)
                  throw new Error("Invalid patch string: " + g[p]);
                var w = new v.patch_obj();
                for (l.push(w), w.start1 = parseInt(d[1], 10), d[2] === "" ? (w.start1--, w.length1 = 1) : d[2] == "0" ? w.length1 = 0 : (w.start1--, w.length1 = parseInt(d[2], 10)), w.start2 = parseInt(d[3], 10), d[4] === "" ? (w.start2--, w.length2 = 1) : d[4] == "0" ? w.length2 = 0 : (w.start2--, w.length2 = parseInt(d[4], 10)), p++; p < g.length; ) {
                  var _ = g[p].charAt(0);
                  try {
                    var y = decodeURI(g[p].substring(1));
                  } catch {
                    throw new Error("Illegal escape in patch_fromText: " + y);
                  }
                  if (_ == "-")
                    w.diffs.push(new v.Diff(T, y));
                  else if (_ == "+")
                    w.diffs.push(new v.Diff(x, y));
                  else if (_ == " ")
                    w.diffs.push(new v.Diff(A, y));
                  else {
                    if (_ == "@")
                      break;
                    if (_ !== "")
                      throw new Error('Invalid patch mode "' + _ + '" in: ' + y);
                  }
                  p++;
                }
              }
              return l;
            }, v.patch_obj = function() {
              this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
            }, v.patch_obj.prototype.toString = function() {
              var c, l;
              this.length1 === 0 ? c = this.start1 + ",0" : this.length1 == 1 ? c = this.start1 + 1 : c = this.start1 + 1 + "," + this.length1, this.length2 === 0 ? l = this.start2 + ",0" : this.length2 == 1 ? l = this.start2 + 1 : l = this.start2 + 1 + "," + this.length2;
              for (var g = ["@@ -" + c + " +" + l + ` @@
`], p, m = 0; m < this.diffs.length; m++) {
                switch (this.diffs[m][0]) {
                  case x:
                    p = "+";
                    break;
                  case T:
                    p = "-";
                    break;
                  case A:
                    p = " ";
                    break;
                }
                g[m + 1] = p + encodeURI(this.diffs[m][1]) + `
`;
              }
              return g.join("").replace(/%20/g, " ");
            }, z.exports = v, z.exports.diff_match_patch = v, z.exports.DIFF_DELETE = T, z.exports.DIFF_INSERT = x, z.exports.DIFF_EQUAL = A;
          }
        ),
        /***/
        923: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              default: () => (
                /* binding */
                Ye
              )
            });
            var x = T(288), A = T(59), c = T(784), l = T(51), g = T(500), p = T(339), m = T(108), d = function(R) {
              R === void 0 && (R = document);
              var ie = function(U) {
                var P = document.createElement("img");
                P.src = U.getAttribute("data-src"), P.addEventListener("load", function() {
                  !U.getAttribute("style") && !U.getAttribute("class") && !U.getAttribute("width") && !U.getAttribute("height") && P.naturalHeight > P.naturalWidth && P.naturalWidth / P.naturalHeight < document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) && P.naturalHeight > window.innerHeight - 40 && (U.style.height = window.innerHeight - 40 + "px"), U.src = P.src;
                }), U.removeAttribute("data-src");
              };
              if (!("IntersectionObserver" in window))
                return R.querySelectorAll("img").forEach(function(U) {
                  U.getAttribute("data-src") && ie(U);
                }), !1;
              window.vditorImageIntersectionObserver ? (window.vditorImageIntersectionObserver.disconnect(), R.querySelectorAll("img").forEach(function(U) {
                window.vditorImageIntersectionObserver.observe(U);
              })) : (window.vditorImageIntersectionObserver = new IntersectionObserver(function(U) {
                U.forEach(function(P) {
                  (typeof P.isIntersecting > "u" ? P.intersectionRatio !== 0 : P.isIntersecting) && P.target.getAttribute("data-src") && ie(P.target);
                });
              }), R.querySelectorAll("img").forEach(function(U) {
                window.vditorImageIntersectionObserver.observe(U);
              }));
            }, w = T(960), _ = T(0), y = T(975), b = T(931), s = T(597), E = T(162), L = T(70), D = T(591), C = T(913), I = T(873), V = T(161), F = T(598), $ = T(905), ee = function(R) {
              document.querySelectorAll(".vditor-anchor").forEach(function(ie) {
                R === 1 && ie.classList.add("vditor-anchor--left"), ie.onclick = function() {
                  var U = ie.getAttribute("href").substr(1), P = document.getElementById("vditorAnchor-" + U).offsetTop;
                  document.querySelector("html").scrollTop = P;
                };
              }), window.onhashchange = function() {
                var ie = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
                ie && (document.querySelector("html").scrollTop = ie.offsetTop);
              };
            }, se = T(796), me = T(827), fe = function(R, ie) {
              if (ie === void 0 && (ie = "zh_CN"), !(typeof speechSynthesis > "u" || typeof SpeechSynthesisUtterance > "u")) {
                var U = function() {
                  var _e = speechSynthesis.getVoices(), G, de;
                  return _e.forEach(function(xe) {
                    xe.lang === ie.replace("_", "-") && (G = xe), xe.default && (de = xe);
                  }), G || (G = de), G;
                }, P = '<svg><use xlink:href="#vditor-icon-play"></use></svg>', pe = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
                document.getElementById("vditorIconScript") || (P = '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>', pe = '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>');
                var q = document.querySelector(".vditor-speech");
                q || (q = document.createElement("button"), q.className = "vditor-speech", R.insertAdjacentElement("beforeend", q), speechSynthesis.onvoiceschanged !== void 0 && (speechSynthesis.onvoiceschanged = U));
                var ge = U(), oe = new SpeechSynthesisUtterance();
                oe.voice = ge, oe.onend = oe.onerror = function() {
                  q.style.display = "none", speechSynthesis.cancel(), q.classList.remove("vditor-speech--current"), q.innerHTML = P;
                }, R.addEventListener(window.ontouchstart !== void 0 ? "touchend" : "click", function(_e) {
                  var G = _e.target;
                  if (G.classList.contains("vditor-speech") || G.parentElement.classList.contains("vditor-speech")) {
                    q.classList.contains("vditor-speech--current") ? speechSynthesis.speaking && (speechSynthesis.paused ? (speechSynthesis.resume(), q.innerHTML = pe) : (speechSynthesis.pause(), q.innerHTML = P)) : (oe.text = q.getAttribute("data-text"), speechSynthesis.speak(oe), q.classList.add("vditor-speech--current"), q.innerHTML = pe), (0, me.jl)(window.vditorSpeechRange), R.focus();
                    return;
                  }
                  if (q.style.display = "none", speechSynthesis.cancel(), q.classList.remove("vditor-speech--current"), q.innerHTML = P, getSelection().rangeCount !== 0) {
                    var de = getSelection().getRangeAt(0), xe = de.toString().trim();
                    if (xe) {
                      window.vditorSpeechRange = de.cloneRange();
                      var He = de.getBoundingClientRect();
                      q.innerHTML = P, q.style.display = "block", q.style.top = He.top + He.height + document.querySelector("html").scrollTop - 20 + "px", window.ontouchstart !== void 0 ? q.style.left = _e.changedTouches[_e.changedTouches.length - 1].pageX + 2 + "px" : q.style.left = _e.clientX + 2 + "px", q.setAttribute("data-text", xe);
                    }
                  }
                });
              }
            }, le = function(R, ie, U, P) {
              function pe(q) {
                return q instanceof U ? q : new U(function(ge) {
                  ge(q);
                });
              }
              return new (U || (U = Promise))(function(q, ge) {
                function oe(de) {
                  try {
                    G(P.next(de));
                  } catch (xe) {
                    ge(xe);
                  }
                }
                function _e(de) {
                  try {
                    G(P.throw(de));
                  } catch (xe) {
                    ge(xe);
                  }
                }
                function G(de) {
                  de.done ? q(de.value) : pe(de.value).then(oe, _e);
                }
                G((P = P.apply(R, ie || [])).next());
              });
            }, be = function(R, ie) {
              var U = { label: 0, sent: function() {
                if (q[0] & 1)
                  throw q[1];
                return q[1];
              }, trys: [], ops: [] }, P, pe, q, ge;
              return ge = { next: oe(0), throw: oe(1), return: oe(2) }, typeof Symbol == "function" && (ge[Symbol.iterator] = function() {
                return this;
              }), ge;
              function oe(G) {
                return function(de) {
                  return _e([G, de]);
                };
              }
              function _e(G) {
                if (P)
                  throw new TypeError("Generator is already executing.");
                for (; ge && (ge = 0, G[0] && (U = 0)), U; )
                  try {
                    if (P = 1, pe && (q = G[0] & 2 ? pe.return : G[0] ? pe.throw || ((q = pe.return) && q.call(pe), 0) : pe.next) && !(q = q.call(pe, G[1])).done)
                      return q;
                    switch (pe = 0, q && (G = [G[0] & 2, q.value]), G[0]) {
                      case 0:
                      case 1:
                        q = G;
                        break;
                      case 4:
                        return U.label++, { value: G[1], done: !1 };
                      case 5:
                        U.label++, pe = G[1], G = [0];
                        continue;
                      case 7:
                        G = U.ops.pop(), U.trys.pop();
                        continue;
                      default:
                        if (q = U.trys, !(q = q.length > 0 && q[q.length - 1]) && (G[0] === 6 || G[0] === 2)) {
                          U = 0;
                          continue;
                        }
                        if (G[0] === 3 && (!q || G[1] > q[0] && G[1] < q[3])) {
                          U.label = G[1];
                          break;
                        }
                        if (G[0] === 6 && U.label < q[1]) {
                          U.label = q[1], q = G;
                          break;
                        }
                        if (q && U.label < q[2]) {
                          U.label = q[2], U.ops.push(G);
                          break;
                        }
                        q[2] && U.ops.pop(), U.trys.pop();
                        continue;
                    }
                    G = ie.call(R, U);
                  } catch (de) {
                    G = [6, de], pe = 0;
                  } finally {
                    P = q = 0;
                  }
                if (G[0] & 5)
                  throw G[1];
                return { value: G[0] ? G[1] : void 0, done: !0 };
              }
            }, Te = function(R) {
              var ie, U = {
                anchor: 0,
                cdn: C.Y.CDN,
                customEmoji: {},
                emojiPath: "".concat(C.Y.CDN, "/dist/images/emoji"),
                hljs: C.Y.HLJS_OPTIONS,
                icon: "ant",
                lang: "zh_CN",
                markdown: C.Y.MARKDOWN_OPTIONS,
                math: C.Y.MATH_OPTIONS,
                mode: "light",
                speech: {
                  enable: !1
                },
                render: {
                  media: {
                    enable: !0
                  }
                },
                theme: C.Y.THEME_OPTIONS
              };
              return R.cdn && (!((ie = R.theme) === null || ie === void 0) && ie.path || (U.theme.path = "".concat(R.cdn, "/dist/css/content-theme")), R.emojiPath || (U.emojiPath = "".concat(R.cdn, "/dist/images/emoji"))), (0, $.h)(U, R);
            }, we = function(R, ie) {
              var U = Te(ie);
              return (0, V.Z)("".concat(U.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function() {
                var P = (0, se.X)({
                  autoSpace: U.markdown.autoSpace,
                  gfmAutoLink: U.markdown.gfmAutoLink,
                  codeBlockPreview: U.markdown.codeBlockPreview,
                  emojiSite: U.emojiPath,
                  emojis: U.customEmoji,
                  fixTermTypo: U.markdown.fixTermTypo,
                  footnotes: U.markdown.footnotes,
                  headingAnchor: U.anchor !== 0,
                  inlineMathDigit: U.math.inlineDigit,
                  lazyLoadImage: U.lazyLoadImage,
                  linkBase: U.markdown.linkBase,
                  linkPrefix: U.markdown.linkPrefix,
                  listStyle: U.markdown.listStyle,
                  mark: U.markdown.mark,
                  mathBlockPreview: U.markdown.mathBlockPreview,
                  paragraphBeginningSpace: U.markdown.paragraphBeginningSpace,
                  sanitize: U.markdown.sanitize,
                  toc: U.markdown.toc
                });
                return ie != null && ie.renderers && P.SetJSRenderers({
                  renderers: {
                    Md2HTML: ie.renderers
                  }
                }), P.SetHeadingID(!0), P.Md2HTML(R);
              });
            }, M = function(R, ie, U) {
              return le(void 0, void 0, void 0, function() {
                var P, pe, q, ge;
                return be(this, function(oe) {
                  switch (oe.label) {
                    case 0:
                      return P = Te(U), [4, we(ie, P)];
                    case 1:
                      if (pe = oe.sent(), P.transform && (pe = P.transform(pe)), R.innerHTML = pe, R.classList.add("vditor-reset"), P.i18n)
                        return [3, 5];
                      if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(P.lang))
                        return [3, 2];
                      throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                    case 2:
                      return q = "vditorI18nScript", ge = q + P.lang, document.querySelectorAll('head script[id^="'.concat(q, '"]')).forEach(function(_e) {
                        _e.id !== ge && document.head.removeChild(_e);
                      }), [4, (0, V.Z)("".concat(P.cdn, "/dist/js/i18n/").concat(P.lang, ".js"), ge)];
                    case 3:
                      oe.sent(), oe.label = 4;
                    case 4:
                      return [3, 6];
                    case 5:
                      window.VditorI18n = P.i18n, oe.label = 6;
                    case 6:
                      return P.icon ? [4, (0, V.Z)("".concat(P.cdn, "/dist/js/icons/").concat(P.icon, ".js"), "vditorIconScript")] : [3, 8];
                    case 7:
                      oe.sent(), oe.label = 8;
                    case 8:
                      return (0, I.H)(P.theme.current, P.theme.path), P.anchor === 1 && R.classList.add("vditor-reset--anchor"), (0, l.o)(R, P.hljs), (0, m.$)(P.hljs, R, P.cdn), (0, w.T)(R, {
                        cdn: P.cdn,
                        math: P.math
                      }), (0, y.e)(R, P.cdn, P.mode), (0, b.Y)(R, P.cdn, P.mode), (0, s.K)(R, P.cdn), (0, g.D)(R, P.cdn), (0, p.m)(R, P.cdn), (0, c.v)(R, P.cdn, P.mode), (0, E.l)(R, P.cdn, P.mode), (0, D.M)(R, P.cdn), (0, x.$)(R, P.cdn), P.render.media.enable && (0, _.l)(R), P.speech.enable && fe(R), P.anchor !== 0 && ee(P.anchor), P.after && P.after(), P.lazyLoadImage && d(R), R.addEventListener("click", function(_e) {
                        var G = (0, F._Y)(_e.target, "SPAN");
                        if (G && (0, F.KJ)(G, "vditor-toc")) {
                          var de = R.querySelector("#" + G.getAttribute("data-target-id"));
                          de && window.scrollTo(window.scrollX, de.offsetTop);
                          return;
                        }
                      }), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, Pe = T(726), ht = T(13), mt = (
              /** @class */
              function() {
                function R() {
                }
                return R.adapterRender = A, R.previewImage = Pe.o, R.codeRender = l.o, R.graphvizRender = p.m, R.highlightRender = m.$, R.mathRender = w.T, R.mermaidRender = y.e, R.SMILESRender = b.Y, R.markmapRender = s.K, R.flowchartRender = g.D, R.chartRender = c.v, R.abcRender = x.$, R.mindmapRender = E.l, R.plantumlRender = D.M, R.outlineRender = L.N, R.mediaRender = _.l, R.speechRender = fe, R.lazyLoadImageRender = d, R.md2html = we, R.preview = M, R.setCodeTheme = ht.h, R.setContentTheme = I.H, R;
              }()
            );
            const Ye = mt;
          }
        ),
        /***/
        913: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              Y: () => (
                /* binding */
                A
              ),
              /* harmony export */
              g: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = "3.10.9", A = (
              /** @class */
              function() {
                function c() {
                }
                return c.ZWSP = "​", c.DROP_EDITOR = "application/editor", c.MOBILE_WIDTH = 520, c.CLASS_MENU_DISABLED = "vditor-menu--disabled", c.EDIT_TOOLBARS = [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "list",
                  "ordered-list",
                  "outdent",
                  "indent",
                  "check",
                  "line",
                  "quote",
                  "code",
                  "inline-code",
                  "insert-after",
                  "insert-before",
                  "upload",
                  "record",
                  "table"
                ], c.CODE_THEME = [
                  "a11y-dark",
                  "agate",
                  "an-old-hope",
                  "androidstudio",
                  "arta",
                  "atom-one-dark",
                  "atom-one-dark-reasonable",
                  "base16/3024",
                  "base16/apathy",
                  "base16/apprentice",
                  "base16/ashes",
                  "base16/atelier-cave",
                  "base16/atelier-dune",
                  "base16/atelier-estuary",
                  "base16/atelier-forest",
                  "base16/atelier-heath",
                  "base16/atelier-lakeside",
                  "base16/atelier-plateau",
                  "base16/atelier-savanna",
                  "base16/atelier-seaside",
                  "base16/atelier-sulphurpool",
                  "base16/atlas",
                  "base16/bespin",
                  "base16/black-metal",
                  "base16/black-metal-bathory",
                  "base16/black-metal-burzum",
                  "base16/black-metal-dark-funeral",
                  "base16/black-metal-gorgoroth",
                  "base16/black-metal-immortal",
                  "base16/black-metal-khold",
                  "base16/black-metal-marduk",
                  "base16/black-metal-mayhem",
                  "base16/black-metal-nile",
                  "base16/black-metal-venom",
                  "base16/brewer",
                  "base16/bright",
                  "base16/brogrammer",
                  "base16/brush-trees-dark",
                  "base16/chalk",
                  "base16/circus",
                  "base16/classic-dark",
                  "base16/codeschool",
                  "base16/colors",
                  "base16/danqing",
                  "base16/darcula",
                  "base16/dark-violet",
                  "base16/darkmoss",
                  "base16/darktooth",
                  "base16/decaf",
                  "base16/default-dark",
                  "base16/dracula",
                  "base16/edge-dark",
                  "base16/eighties",
                  "base16/embers",
                  "base16/equilibrium-dark",
                  "base16/equilibrium-gray-dark",
                  "base16/espresso",
                  "base16/eva",
                  "base16/eva-dim",
                  "base16/flat",
                  "base16/framer",
                  "base16/gigavolt",
                  "base16/google-dark",
                  "base16/grayscale-dark",
                  "base16/green-screen",
                  "base16/gruvbox-dark-hard",
                  "base16/gruvbox-dark-medium",
                  "base16/gruvbox-dark-pale",
                  "base16/gruvbox-dark-soft",
                  "base16/hardcore",
                  "base16/harmonic16-dark",
                  "base16/heetch-dark",
                  "base16/helios",
                  "base16/hopscotch",
                  "base16/horizon-dark",
                  "base16/humanoid-dark",
                  "base16/ia-dark",
                  "base16/icy-dark",
                  "base16/ir-black",
                  "base16/isotope",
                  "base16/kimber",
                  "base16/london-tube",
                  "base16/macintosh",
                  "base16/marrakesh",
                  "base16/materia",
                  "base16/material",
                  "base16/material-darker",
                  "base16/material-palenight",
                  "base16/material-vivid",
                  "base16/mellow-purple",
                  "base16/mocha",
                  "base16/monokai",
                  "base16/nebula",
                  "base16/nord",
                  "base16/nova",
                  "base16/ocean",
                  "base16/oceanicnext",
                  "base16/onedark",
                  "base16/outrun-dark",
                  "base16/papercolor-dark",
                  "base16/paraiso",
                  "base16/pasque",
                  "base16/phd",
                  "base16/pico",
                  "base16/pop",
                  "base16/porple",
                  "base16/qualia",
                  "base16/railscasts",
                  "base16/rebecca",
                  "base16/ros-pine",
                  "base16/ros-pine-moon",
                  "base16/sandcastle",
                  "base16/seti-ui",
                  "base16/silk-dark",
                  "base16/snazzy",
                  "base16/solar-flare",
                  "base16/solarized-dark",
                  "base16/spacemacs",
                  "base16/summercamp",
                  "base16/summerfruit-dark",
                  "base16/synth-midnight-terminal-dark",
                  "base16/tango",
                  "base16/tender",
                  "base16/tomorrow-night",
                  "base16/twilight",
                  "base16/unikitty-dark",
                  "base16/vulcan",
                  "base16/windows-10",
                  "base16/windows-95",
                  "base16/windows-high-contrast",
                  "base16/windows-nt",
                  "base16/woodland",
                  "base16/xcode-dusk",
                  "base16/zenburn",
                  "codepen-embed",
                  "dark",
                  "devibeans",
                  "far",
                  "felipec",
                  "github-dark",
                  "github-dark-dimmed",
                  "gml",
                  "gradient-dark",
                  "hybrid",
                  "ir-black",
                  "isbl-editor-dark",
                  "kimbie-dark",
                  "lioshi",
                  "monokai",
                  "monokai-sublime",
                  "night-owl",
                  "nnfx-dark",
                  "nord",
                  "obsidian",
                  "panda-syntax-dark",
                  "paraiso-dark",
                  "pojoaque",
                  "qtcreator-dark",
                  "rainbow",
                  "shades-of-purple",
                  "srcery",
                  "stackoverflow-dark",
                  "sunburst",
                  "tomorrow-night-blue",
                  "tomorrow-night-bright",
                  "tokyo-night-dark",
                  "vs2015",
                  "xt256",
                  "ant-design",
                  "a11y-light",
                  "arduino-light",
                  "ascetic",
                  "atom-one-light",
                  "base16/atelier-cave-light",
                  "base16/atelier-dune-light",
                  "base16/atelier-estuary-light",
                  "base16/atelier-forest-light",
                  "base16/atelier-heath-light",
                  "base16/atelier-lakeside-light",
                  "base16/atelier-plateau-light",
                  "base16/atelier-savanna-light",
                  "base16/atelier-seaside-light",
                  "base16/atelier-sulphurpool-light",
                  "base16/brush-trees",
                  "base16/classic-light",
                  "base16/cupcake",
                  "base16/cupertino",
                  "base16/default-light",
                  "base16/dirtysea",
                  "base16/edge-light",
                  "base16/equilibrium-gray-light",
                  "base16/equilibrium-light",
                  "base16/fruit-soda",
                  "base16/github",
                  "base16/google-light",
                  "base16/grayscale-light",
                  "base16/gruvbox-light-hard",
                  "base16/gruvbox-light-medium",
                  "base16/gruvbox-light-soft",
                  "base16/harmonic16-light",
                  "base16/heetch-light",
                  "base16/humanoid-light",
                  "base16/horizon-light",
                  "base16/ia-light",
                  "base16/material-lighter",
                  "base16/mexico-light",
                  "base16/one-light",
                  "base16/papercolor-light",
                  "base16/ros-pine-dawn",
                  "base16/sagelight",
                  "base16/shapeshifter",
                  "base16/silk-light",
                  "base16/solar-flare-light",
                  "base16/solarized-light",
                  "base16/summerfruit-light",
                  "base16/synth-midnight-terminal-light",
                  "base16/tomorrow",
                  "base16/unikitty-light",
                  "base16/windows-10-light",
                  "base16/windows-95-light",
                  "base16/windows-high-contrast-light",
                  "brown-paper",
                  "base16/windows-nt-light",
                  "color-brewer",
                  "docco",
                  "foundation",
                  "github",
                  "googlecode",
                  "gradient-light",
                  "grayscale",
                  "idea",
                  "intellij-light",
                  "isbl-editor-light",
                  "kimbie-light",
                  "lightfair",
                  "magula",
                  "mono-blue",
                  "nnfx-light",
                  "panda-syntax-light",
                  "paraiso-light",
                  "purebasic",
                  "qtcreator-light",
                  "routeros",
                  "school-book",
                  "stackoverflow-light",
                  "tokyo-night-light",
                  "vs",
                  "xcode",
                  "default"
                ], c.ALIAS_CODE_LANGUAGES = [
                  // 自定义
                  "abc",
                  "plantuml",
                  "mermaid",
                  "flowchart",
                  "echarts",
                  "mindmap",
                  "graphviz",
                  "math",
                  "markmap",
                  "smiles",
                  // 别名
                  "js",
                  "ts",
                  "html",
                  "toml",
                  "c#",
                  "bat"
                ], c.CDN = "https://unpkg.com/vditor@".concat("3.10.9"), c.MARKDOWN_OPTIONS = {
                  autoSpace: !1,
                  gfmAutoLink: !0,
                  codeBlockPreview: !0,
                  fixTermTypo: !1,
                  footnotes: !0,
                  linkBase: "",
                  linkPrefix: "",
                  listStyle: !1,
                  mark: !1,
                  mathBlockPreview: !0,
                  paragraphBeginningSpace: !1,
                  sanitize: !0,
                  toc: !1
                }, c.HLJS_OPTIONS = {
                  enable: !0,
                  lineNumber: !1,
                  defaultLang: "",
                  style: "github"
                }, c.MATH_OPTIONS = {
                  engine: "KaTeX",
                  inlineDigit: !1,
                  macros: {}
                }, c.THEME_OPTIONS = {
                  current: "light",
                  list: {
                    "ant-design": "Ant Design",
                    dark: "Dark",
                    light: "Light",
                    wechat: "WeChat"
                  },
                  path: "".concat(c.CDN, "/dist/css/content-theme")
                }, c;
              }()
            );
          }
        ),
        /***/
        931: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              Y: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = T(933), g = function(p, m, d) {
              p === void 0 && (p = document), m === void 0 && (m = x.Y.CDN);
              var w = c.SMILESRenderAdapter.getElements(p);
              w.length > 0 && (0, A.Z)("".concat(m, "/dist/js/smiles-drawer/smiles-drawer.min.js?v=2.1.7"), "vditorAbcjsScript").then(function() {
                var _ = new SmiDrawer({}, {});
                w.forEach(function(y) {
                  var b = c.SMILESRenderAdapter.getCode(y).trim();
                  if (!(y.getAttribute("data-processed") === "true" || b.trim() === "")) {
                    var s = "smiles" + (0, l.Ee)();
                    y.innerHTML = '<svg id="'.concat(s, '"></svg>'), _.draw(b, "#" + s, d === "dark" ? "dark" : void 0), y.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        288: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              $: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = function(g, p) {
              g === void 0 && (g = document), p === void 0 && (p = x.Y.CDN);
              var m = c.abcRenderAdapter.getElements(g);
              m.length > 0 && (0, A.Z)("".concat(p, "/dist/js/abcjs/abcjs_basic.min.js"), "vditorAbcjsScript").then(function() {
                m.forEach(function(d) {
                  d.parentElement.classList.contains("vditor-wysiwyg__pre") || d.parentElement.classList.contains("vditor-ir__marker--pre") || d.getAttribute("data-processed") !== "true" && (ABCJS.renderAbc(d, c.abcRenderAdapter.getCode(d).trim()), d.style.overflowX = "auto", d.setAttribute("data-processed", "true"));
                });
              });
            };
          }
        ),
        /***/
        59: (
          /***/
          (z, v, T) => {
            "use strict";
            T.r(v), T.d(v, {
              /* harmony export */
              SMILESRenderAdapter: () => (
                /* binding */
                A
              ),
              /* harmony export */
              abcRenderAdapter: () => (
                /* binding */
                m
              ),
              /* harmony export */
              chartRenderAdapter: () => (
                /* binding */
                p
              ),
              /* harmony export */
              flowchartRenderAdapter: () => (
                /* binding */
                w
              ),
              /* harmony export */
              graphvizRenderAdapter: () => (
                /* binding */
                d
              ),
              /* harmony export */
              markmapRenderAdapter: () => (
                /* binding */
                l
              ),
              /* harmony export */
              mathRenderAdapter: () => (
                /* binding */
                x
              ),
              /* harmony export */
              mermaidRenderAdapter: () => (
                /* binding */
                c
              ),
              /* harmony export */
              mindmapRenderAdapter: () => (
                /* binding */
                g
              ),
              /* harmony export */
              plantumlRenderAdapter: () => (
                /* binding */
                _
              )
              /* harmony export */
            });
            var x = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-math");
              }
            }, A = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-smiles");
              }
            }, c = {
              /** 不仅要返回code，并且需要将 code 设置为 el 的 innerHTML */
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-mermaid");
              }
            }, l = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-markmap");
              }
            }, g = {
              getCode: function(y) {
                return y.getAttribute("data-code");
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-mindmap");
              }
            }, p = {
              getCode: function(y) {
                return y.innerText;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-echarts");
              }
            }, m = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-abc");
              }
            }, d = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-graphviz");
              }
            }, w = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-flowchart");
              }
            }, _ = {
              getCode: function(y) {
                return y.textContent;
              },
              getElements: function(y) {
                return y.querySelectorAll(".language-plantuml");
              }
            };
          }
        ),
        /***/
        784: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              v: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = T(933), g = function(d, w, _, y) {
              function b(s) {
                return s instanceof _ ? s : new _(function(E) {
                  E(s);
                });
              }
              return new (_ || (_ = Promise))(function(s, E) {
                function L(I) {
                  try {
                    C(y.next(I));
                  } catch (V) {
                    E(V);
                  }
                }
                function D(I) {
                  try {
                    C(y.throw(I));
                  } catch (V) {
                    E(V);
                  }
                }
                function C(I) {
                  I.done ? s(I.value) : b(I.value).then(L, D);
                }
                C((y = y.apply(d, w || [])).next());
              });
            }, p = function(d, w) {
              var _ = { label: 0, sent: function() {
                if (s[0] & 1)
                  throw s[1];
                return s[1];
              }, trys: [], ops: [] }, y, b, s, E;
              return E = { next: L(0), throw: L(1), return: L(2) }, typeof Symbol == "function" && (E[Symbol.iterator] = function() {
                return this;
              }), E;
              function L(C) {
                return function(I) {
                  return D([C, I]);
                };
              }
              function D(C) {
                if (y)
                  throw new TypeError("Generator is already executing.");
                for (; E && (E = 0, C[0] && (_ = 0)), _; )
                  try {
                    if (y = 1, b && (s = C[0] & 2 ? b.return : C[0] ? b.throw || ((s = b.return) && s.call(b), 0) : b.next) && !(s = s.call(b, C[1])).done)
                      return s;
                    switch (b = 0, s && (C = [C[0] & 2, s.value]), C[0]) {
                      case 0:
                      case 1:
                        s = C;
                        break;
                      case 4:
                        return _.label++, { value: C[1], done: !1 };
                      case 5:
                        _.label++, b = C[1], C = [0];
                        continue;
                      case 7:
                        C = _.ops.pop(), _.trys.pop();
                        continue;
                      default:
                        if (s = _.trys, !(s = s.length > 0 && s[s.length - 1]) && (C[0] === 6 || C[0] === 2)) {
                          _ = 0;
                          continue;
                        }
                        if (C[0] === 3 && (!s || C[1] > s[0] && C[1] < s[3])) {
                          _.label = C[1];
                          break;
                        }
                        if (C[0] === 6 && _.label < s[1]) {
                          _.label = s[1], s = C;
                          break;
                        }
                        if (s && _.label < s[2]) {
                          _.label = s[2], _.ops.push(C);
                          break;
                        }
                        s[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    C = w.call(d, _);
                  } catch (I) {
                    C = [6, I], b = 0;
                  } finally {
                    y = s = 0;
                  }
                if (C[0] & 5)
                  throw C[1];
                return { value: C[0] ? C[1] : void 0, done: !0 };
              }
            }, m = function(d, w, _) {
              d === void 0 && (d = document), w === void 0 && (w = x.Y.CDN);
              var y = c.chartRenderAdapter.getElements(d);
              y.length > 0 && (0, A.Z)("".concat(w, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                y.forEach(function(b) {
                  return g(void 0, void 0, void 0, function() {
                    var s, E, L;
                    return p(this, function(D) {
                      switch (D.label) {
                        case 0:
                          if (b.parentElement.classList.contains("vditor-wysiwyg__pre") || b.parentElement.classList.contains("vditor-ir__marker--pre"))
                            return [
                              2
                              /*return*/
                            ];
                          if (s = c.chartRenderAdapter.getCode(b).trim(), !s)
                            return [
                              2
                              /*return*/
                            ];
                          D.label = 1;
                        case 1:
                          return D.trys.push([1, 3, , 4]), b.getAttribute("data-processed") === "true" ? [
                            2
                            /*return*/
                          ] : [4, (0, l.kY)(s)];
                        case 2:
                          return E = D.sent(), echarts.init(b, _ === "dark" ? "dark" : void 0).setOption(E), b.setAttribute("data-processed", "true"), [3, 4];
                        case 3:
                          return L = D.sent(), b.className = "vditor-reset--error", b.innerHTML = "echarts render error: <br>".concat(L), [3, 4];
                        case 4:
                          return [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                });
              });
            };
          }
        ),
        /***/
        51: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              o: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = T(695), A = T(913), c = function(l, g) {
              Array.from(l.querySelectorAll("pre > code")).filter(function(p, m) {
                return !(p.parentElement.classList.contains("vditor-wysiwyg__pre") || p.parentElement.classList.contains("vditor-ir__marker--pre") || p.classList.contains("language-mermaid") || p.classList.contains("language-flowchart") || p.classList.contains("language-echarts") || p.classList.contains("language-mindmap") || p.classList.contains("language-plantuml") || p.classList.contains("language-markmap") || p.classList.contains("language-abc") || p.classList.contains("language-graphviz") || p.classList.contains("language-math") || p.classList.contains("language-smiles") || p.style.maxHeight.indexOf("px") > -1 || l.classList.contains("vditor-preview") && m > 5);
              }).forEach(function(p) {
                var m, d, w, _ = p.innerText;
                if (p.classList.contains("highlight-chroma")) {
                  var y = p.cloneNode(!0);
                  y.querySelectorAll(".highlight-ln").forEach(function(L) {
                    L.remove();
                  }), _ = y.innerText;
                } else
                  _.endsWith(`
`) && (_ = _.substr(0, _.length - 1));
                var b = '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
                document.getElementById("vditorIconScript") || (b = '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>');
                var s = document.createElement("div");
                s.className = "vditor-copy", s.innerHTML = '<span aria-label="'.concat(((m = window.VditorI18n) === null || m === void 0 ? void 0 : m.copy) || "复制", `"
onmouseover="this.setAttribute('aria-label', '`).concat(((d = window.VditorI18n) === null || d === void 0 ? void 0 : d.copy) || "复制", `')"
class="vditor-tooltipped vditor-tooltipped__w"
onclick="this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '`).concat(((w = window.VditorI18n) === null || w === void 0 ? void 0 : w.copied) || "已复制", `');this.previousElementSibling.blur()">`).concat(b, "</span>");
                var E = document.createElement("textarea");
                E.value = (0, x.p)(_), s.insertAdjacentElement("afterbegin", E), g && g.renderMenu && g.renderMenu(p, s), p.before(s), p.style.maxHeight = window.outerHeight - 40 + "px", p.insertAdjacentHTML("afterend", '<span style="position: absolute">'.concat(A.Y.ZWSP, "</span>"));
              });
            };
          }
        ),
        /***/
        500: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              D: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = function(g, p) {
              p === void 0 && (p = x.Y.CDN);
              var m = c.flowchartRenderAdapter.getElements(g);
              m.length !== 0 && (0, A.Z)("".concat(p, "/dist/js/flowchart.js/flowchart.min.js"), "vditorFlowchartScript").then(function() {
                m.forEach(function(d) {
                  if (d.getAttribute("data-processed") !== "true") {
                    var w = flowchart.parse(c.flowchartRenderAdapter.getCode(d));
                    d.innerHTML = "", w.drawSVG(d), d.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        339: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              m: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = function(g, p) {
              p === void 0 && (p = x.Y.CDN);
              var m = c.graphvizRenderAdapter.getElements(g);
              m.length !== 0 && (0, A.Z)("".concat(p, "/dist/js/graphviz/viz.js"), "vditorGraphVizScript").then(function() {
                m.forEach(function(d) {
                  var w = c.graphvizRenderAdapter.getCode(d);
                  if (!(d.parentElement.classList.contains("vditor-wysiwyg__pre") || d.parentElement.classList.contains("vditor-ir__marker--pre")) && !(d.getAttribute("data-processed") === "true" || w.trim() === "")) {
                    try {
                      var _ = new Blob(["importScripts('".concat(document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js"), "');")], { type: "application/javascript" }), y = window.URL || window.webkitURL, b = y.createObjectURL(_), s = new Worker(b);
                      new Viz({ worker: s }).renderSVGElement(w).then(function(E) {
                        d.innerHTML = E.outerHTML;
                      }).catch(function(E) {
                        d.innerHTML = "graphviz render error: <br>".concat(E), d.className = "vditor-reset--error";
                      });
                    } catch (E) {
                      console.error("graphviz error", E);
                    }
                    d.setAttribute("data-processed", "true");
                  }
                });
              });
            };
          }
        ),
        /***/
        108: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              $: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(505), l = function(g, p, m) {
              p === void 0 && (p = document), m === void 0 && (m = x.Y.CDN);
              var d = g.style;
              x.Y.CODE_THEME.includes(d) || (d = "github");
              var w = document.getElementById("vditorHljsStyle"), _ = "".concat(m, "/dist/js/highlight.js/styles/").concat(d, ".min.css");
              if (w && w.getAttribute("href") !== _ && w.remove(), (0, c.T)("".concat(m, "/dist/js/highlight.js/styles/").concat(d, ".min.css"), "vditorHljsStyle"), g.enable !== !1) {
                var y = p.querySelectorAll("pre > code");
                y.length !== 0 && (0, A.Z)("".concat(m, "/dist/js/highlight.js/highlight.min.js?v=11.7.0"), "vditorHljsScript").then(function() {
                  (0, A.Z)("".concat(m, "/dist/js/highlight.js/third-languages.js?v=1.0.1"), "vditorHljsThirdScript").then(function() {
                    p.querySelectorAll("pre > code").forEach(function(b) {
                      if (!(b.parentElement.classList.contains("vditor-ir__marker--pre") || b.parentElement.classList.contains("vditor-wysiwyg__pre")) && !(b.classList.contains("language-mermaid") || b.classList.contains("language-flowchart") || b.classList.contains("language-echarts") || b.classList.contains("language-mindmap") || b.classList.contains("language-plantuml") || b.classList.contains("language-smiles") || b.classList.contains("language-abc") || b.classList.contains("language-graphviz") || b.classList.contains("language-math"))) {
                        g.defaultLang !== "" && b.className.indexOf("language-") === -1 && b.classList.add("language-" + g.defaultLang);
                        var s = b.className.replace("language-", "");
                        if (window.hljs.getLanguage(s) || (s = "plaintext"), b.innerHTML = window.hljs.highlight(b.textContent, {
                          language: s,
                          ignoreIllegals: !0
                        }).value, b.classList.add("hljs"), !!g.lineNumber) {
                          b.classList.add("vditor-linenumber");
                          var E = b.querySelector(".vditor-linenumber__temp");
                          E || (E = document.createElement("div"), E.className = "vditor-linenumber__temp", b.insertAdjacentElement("beforeend", E));
                          var L = getComputedStyle(b).whiteSpace, D = !1;
                          (L === "pre-wrap" || L === "pre-line") && (D = !0);
                          var C = "", I = b.textContent.split(/\r\n|\r|\n/g);
                          I.pop(), I.map(function(V) {
                            var F = "";
                            D && (E.textContent = V || `
`, F = ' style="height:'.concat(E.getBoundingClientRect().height, 'px"')), C += "<span".concat(F, "></span>");
                          }), E.style.display = "none", C = '<span class="vditor-linenumber__rows">'.concat(C, "</span>"), b.insertAdjacentHTML("beforeend", C);
                        }
                      }
                    });
                  });
                });
              }
            };
          }
        ),
        /***/
        597: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              K: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = {}, g = function(d, w) {
              var _ = d.transform(w), y = Object.keys(_.features).filter(function(D) {
                return !l[D];
              });
              y.forEach(function(D) {
                l[D] = !0;
              });
              var b = d.getAssets(y), s = b.styles, E = b.scripts, L = window.markmap;
              return s && L.loadCSS(s), E && L.loadJS(E), _;
            }, p = function(d, w) {
              var _ = window.markmap, y = _.Transformer, b = _.Markmap, s = _.deriveOptions, E = _.globalCSS, L = new y();
              d.innerHTML = '<svg style="width:100%"></svg>';
              var D = d.firstChild, C = b.create(D, null), I = g(L, w), V = I.root, F = I.frontmatter, $ = F == null ? void 0 : F.markmap, ee = s($);
              C.setData(V, ee), C.fit();
            }, m = function(d, w) {
              d === void 0 && (d = document), w === void 0 && (w = x.Y.CDN);
              var _ = c.markmapRenderAdapter.getElements(d);
              _.length !== 0 && (0, A.Z)("".concat(w, "/dist/js/markmap/markmap.min.js"), "vditorMarkerScript").then(function() {
                _.forEach(function(y) {
                  var b = c.markmapRenderAdapter.getCode(y);
                  if (!(y.getAttribute("data-processed") === "true" || b.trim() === "")) {
                    var s = document.createElement("div");
                    s.className = "language-markmap", y.parentNode.appendChild(s), p(s, b), y.parentNode.childNodes[0].nodeName == "CODE" && y.parentNode.removeChild(y.parentNode.childNodes[0]);
                  }
                });
              });
            };
          }
        ),
        /***/
        960: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              T: () => (
                /* binding */
                p
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(505), l = T(695), g = T(59), p = function(m, d) {
              m === void 0 && (m = document);
              var w = g.mathRenderAdapter.getElements(m);
              if (w.length !== 0) {
                var _ = {
                  cdn: x.Y.CDN,
                  math: {
                    engine: "KaTeX",
                    inlineDigit: !1,
                    macros: {}
                  }
                };
                if (d && d.math && (d.math = Object.assign({}, _.math, d.math)), d = Object.assign({}, _, d), d.math.engine === "KaTeX")
                  (0, c.T)("".concat(d.cdn, "/dist/js/katex/katex.min.css?v=0.16.9"), "vditorKatexStyle"), (0, A.Z)("".concat(d.cdn, "/dist/js/katex/katex.min.js?v=0.16.9"), "vditorKatexScript").then(function() {
                    (0, A.Z)("".concat(d.cdn, "/dist/js/katex/mhchem.min.js?v=0.16.9"), "vditorKatexChemScript").then(function() {
                      w.forEach(function(s) {
                        if (!(s.parentElement.classList.contains("vditor-wysiwyg__pre") || s.parentElement.classList.contains("vditor-ir__marker--pre")) && !s.getAttribute("data-math")) {
                          var E = (0, l.p)(g.mathRenderAdapter.getCode(s));
                          s.setAttribute("data-math", E);
                          try {
                            s.innerHTML = katex.renderToString(E, {
                              displayMode: s.tagName === "DIV",
                              output: "html",
                              macros: d.math.macros
                            });
                          } catch (L) {
                            s.innerHTML = L.message, s.className = "language-math vditor-reset--error";
                          }
                          s.addEventListener("copy", function(L) {
                            L.stopPropagation(), L.preventDefault();
                            var D = L.currentTarget.closest(".language-math");
                            L.clipboardData.setData("text/html", D.innerHTML), L.clipboardData.setData("text/plain", D.getAttribute("data-math"));
                          });
                        }
                      });
                    });
                  });
                else if (d.math.engine === "MathJax") {
                  var y = function(s) {
                    if (s.length !== 0) {
                      var E = 0, L = s[s.length - 1], D = function() {
                        var C = s[E++];
                        C === L ? C() : C(D);
                      };
                      D();
                    }
                  };
                  window.MathJax || (window.MathJax = {
                    loader: {
                      paths: { mathjax: "".concat(d.cdn, "/dist/js/mathjax") }
                    },
                    startup: {
                      typeset: !1
                    },
                    tex: {
                      macros: d.math.macros
                    }
                  }, Object.assign(window.MathJax, d.math.mathJaxOptions)), (0, A.U)("".concat(d.cdn, "/dist/js/mathjax/tex-svg-full.js"), "protyleMathJaxScript");
                  var b = function(s, E) {
                    var L = (0, l.p)(s.textContent).trim(), D = window.MathJax.getMetricsFor(s);
                    D.display = s.tagName === "DIV", window.MathJax.tex2svgPromise(L, D).then(function(C) {
                      s.innerHTML = "", s.setAttribute("data-math", L), s.append(C), window.MathJax.startup.document.clear(), window.MathJax.startup.document.updateDocument();
                      var I = C.querySelector('[data-mml-node="merror"]');
                      I && I.textContent.trim() !== "" && (s.innerHTML = I.textContent.trim(), s.className = "vditor-reset--error"), E && E();
                    });
                  };
                  window.MathJax.startup.promise.then(function() {
                    for (var s = [], E = function(D) {
                      var C = w[D];
                      !C.parentElement.classList.contains("vditor-wysiwyg__pre") && !C.parentElement.classList.contains("vditor-ir__marker--pre") && !C.getAttribute("data-math") && (0, l.p)(C.textContent).trim() && s.push(function(I) {
                        D === w.length - 1 ? b(C) : b(C, I);
                      });
                    }, L = 0; L < w.length; L++)
                      E(L);
                    y(s);
                  });
                }
              }
            };
          }
        ),
        /***/
        0: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              l: () => (
                /* binding */
                g
              )
              /* harmony export */
            });
            var x = T(933), A = function(p, m) {
              p.insertAdjacentHTML("afterend", '<video controls="controls" src="'.concat(m, '"></video>')), p.remove();
            }, c = function(p, m) {
              p.insertAdjacentHTML("afterend", '<audio controls="controls" src="'.concat(m, '"></audio>')), p.remove();
            }, l = function(p, m) {
              var d = m.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/), w = m.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/), _ = m.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/), y = m.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/), b = m.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/), s = m.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/), E = m.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/), L = m.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
              if (d && d[1].length === 11)
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//www.youtube.com/embed/'.concat(d[1] + (d[2] ? "?start=" + d[2] : ""), '"></iframe>')), p.remove();
              else if (w && w[1])
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//player.youku.com/embed/'.concat(w[1], '"></iframe>')), p.remove();
              else if (_ && _[1])
                p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid='.concat(_[1], '"></iframe>')), p.remove();
              else if (y && y[1])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="//coub.com/embed/`.concat(y[1], '?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>')), p.remove();
              else if (b && b[0])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.facebook.com/plugins/video.php?href=`.concat(encodeURIComponent(b[0]), '"></iframe>')), p.remove();
              else if (s && s[2])
                p.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.dailymotion.com/embed/video/`.concat(s[2], '"></iframe>')), p.remove();
              else if (m.indexOf("bilibili.com") > -1 && (m.indexOf("bvid=") > -1 || E && E[1])) {
                var D = {
                  bvid: (0, x.TK)("bvid", m) || E && E[1],
                  page: "1",
                  high_quality: "1",
                  as_wide: "1",
                  allowfullscreen: "true",
                  autoplay: "0"
                };
                new URL(m.startsWith("http") ? m : "https:" + m).search.split("&").forEach(function(V, F) {
                  if (V) {
                    F === 0 && (V = V.substr(1));
                    var $ = V.split("=");
                    D[$[0]] = $[1];
                  }
                });
                var C = "https://player.bilibili.com/player.html?", I = Object.keys(D);
                I.forEach(function(V, F) {
                  C += "".concat(V, "=").concat(D[V]), F < I.length - 1 && (C += "&");
                }), p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="'.concat(C, '"></iframe>')), p.remove();
              } else
                L && L[1] && (p.insertAdjacentHTML("afterend", '<iframe class="iframe__video" src="//embed.ted.com/talks/'.concat(L[1], '"></iframe>')), p.remove());
            }, g = function(p) {
              p && p.querySelectorAll("a").forEach(function(m) {
                var d = m.getAttribute("href");
                d && (d.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/) ? A(m, d) : d.match(/^.+.(mp3|wav|flac)$/) ? c(m, d) : l(m, d));
              });
            };
          }
        ),
        /***/
        975: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              e: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = T(933), g = function(d, w, _, y) {
              function b(s) {
                return s instanceof _ ? s : new _(function(E) {
                  E(s);
                });
              }
              return new (_ || (_ = Promise))(function(s, E) {
                function L(I) {
                  try {
                    C(y.next(I));
                  } catch (V) {
                    E(V);
                  }
                }
                function D(I) {
                  try {
                    C(y.throw(I));
                  } catch (V) {
                    E(V);
                  }
                }
                function C(I) {
                  I.done ? s(I.value) : b(I.value).then(L, D);
                }
                C((y = y.apply(d, w || [])).next());
              });
            }, p = function(d, w) {
              var _ = { label: 0, sent: function() {
                if (s[0] & 1)
                  throw s[1];
                return s[1];
              }, trys: [], ops: [] }, y, b, s, E;
              return E = { next: L(0), throw: L(1), return: L(2) }, typeof Symbol == "function" && (E[Symbol.iterator] = function() {
                return this;
              }), E;
              function L(C) {
                return function(I) {
                  return D([C, I]);
                };
              }
              function D(C) {
                if (y)
                  throw new TypeError("Generator is already executing.");
                for (; E && (E = 0, C[0] && (_ = 0)), _; )
                  try {
                    if (y = 1, b && (s = C[0] & 2 ? b.return : C[0] ? b.throw || ((s = b.return) && s.call(b), 0) : b.next) && !(s = s.call(b, C[1])).done)
                      return s;
                    switch (b = 0, s && (C = [C[0] & 2, s.value]), C[0]) {
                      case 0:
                      case 1:
                        s = C;
                        break;
                      case 4:
                        return _.label++, { value: C[1], done: !1 };
                      case 5:
                        _.label++, b = C[1], C = [0];
                        continue;
                      case 7:
                        C = _.ops.pop(), _.trys.pop();
                        continue;
                      default:
                        if (s = _.trys, !(s = s.length > 0 && s[s.length - 1]) && (C[0] === 6 || C[0] === 2)) {
                          _ = 0;
                          continue;
                        }
                        if (C[0] === 3 && (!s || C[1] > s[0] && C[1] < s[3])) {
                          _.label = C[1];
                          break;
                        }
                        if (C[0] === 6 && _.label < s[1]) {
                          _.label = s[1], s = C;
                          break;
                        }
                        if (s && _.label < s[2]) {
                          _.label = s[2], _.ops.push(C);
                          break;
                        }
                        s[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    C = w.call(d, _);
                  } catch (I) {
                    C = [6, I], b = 0;
                  } finally {
                    y = s = 0;
                  }
                if (C[0] & 5)
                  throw C[1];
                return { value: C[0] ? C[1] : void 0, done: !0 };
              }
            }, m = function(d, w, _) {
              d === void 0 && (d = document), w === void 0 && (w = x.Y.CDN);
              var y = c.mermaidRenderAdapter.getElements(d);
              y.length !== 0 && (0, A.Z)("".concat(w, "/dist/js/mermaid/mermaid.min.js"), "vditorMermaidScript").then(function() {
                var b = {
                  securityLevel: "loose",
                  altFontFamily: "sans-serif",
                  fontFamily: "sans-serif",
                  startOnLoad: !1,
                  flowchart: {
                    htmlLabels: !0,
                    useMaxWidth: !0
                  },
                  sequence: {
                    useMaxWidth: !0,
                    diagramMarginX: 8,
                    diagramMarginY: 8,
                    boxMargin: 8,
                    showSequenceNumbers: !0
                    // Mermaid 时序图增加序号 https://github.com/siyuan-note/siyuan/pull/6992 https://mermaid.js.org/syntax/sequenceDiagram.html#sequencenumbers
                  },
                  gantt: {
                    leftPadding: 75,
                    rightPadding: 20
                  }
                };
                _ === "dark" && (b.theme = "dark"), mermaid.initialize(b), y.forEach(function(s) {
                  return g(void 0, void 0, void 0, function() {
                    var E, L, D, C, I;
                    return p(this, function(V) {
                      switch (V.label) {
                        case 0:
                          if (E = c.mermaidRenderAdapter.getCode(s), s.getAttribute("data-processed") === "true" || E.trim() === "")
                            return [
                              2
                              /*return*/
                            ];
                          L = "mermaid" + (0, l.Ee)(), V.label = 1;
                        case 1:
                          return V.trys.push([1, 3, , 4]), [4, mermaid.render(L, s.textContent)];
                        case 2:
                          return D = V.sent(), s.innerHTML = D.svg, [3, 4];
                        case 3:
                          return C = V.sent(), I = document.querySelector("#" + L), s.innerHTML = "".concat(I.outerHTML, `<br>
<div style="text-align: left"><small>`).concat(C.message.replace(/\n/, "<br>"), "</small></div>"), I.parentElement.remove(), [3, 4];
                        case 4:
                          return s.setAttribute("data-processed", "true"), [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                });
              });
            };
          }
        ),
        /***/
        162: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              l: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = function(g, p, m) {
              g === void 0 && (g = document), p === void 0 && (p = x.Y.CDN);
              var d = c.mindmapRenderAdapter.getElements(g);
              d.length > 0 && (0, A.Z)("".concat(p, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                d.forEach(function(w) {
                  if (!(w.parentElement.classList.contains("vditor-wysiwyg__pre") || w.parentElement.classList.contains("vditor-ir__marker--pre"))) {
                    var _ = c.mindmapRenderAdapter.getCode(w);
                    if (_)
                      try {
                        if (w.getAttribute("data-processed") === "true")
                          return;
                        echarts.init(w, m === "dark" ? "dark" : void 0).setOption({
                          series: [
                            {
                              data: [JSON.parse(decodeURIComponent(_))],
                              initialTreeDepth: -1,
                              itemStyle: {
                                borderWidth: 0,
                                color: "#4285f4"
                              },
                              label: {
                                backgroundColor: "#f6f8fa",
                                borderColor: "#d1d5da",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                color: "#586069",
                                lineHeight: 20,
                                offset: [-5, 0],
                                padding: [0, 5],
                                position: "insideRight"
                              },
                              lineStyle: {
                                color: "#d1d5da",
                                width: 1
                              },
                              roam: !0,
                              symbol: function(y, b) {
                                var s;
                                return !((s = b == null ? void 0 : b.data) === null || s === void 0) && s.children ? "circle" : "path://";
                              },
                              type: "tree"
                            }
                          ],
                          tooltip: {
                            trigger: "item",
                            triggerOn: "mousemove"
                          }
                        }), w.setAttribute("data-processed", "true");
                      } catch (y) {
                        w.className = "vditor-reset--error", w.innerHTML = "mindmap render error: <br>".concat(y);
                      }
                  }
                });
              });
            };
          }
        ),
        /***/
        70: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              N: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = T(164), A = T(960), c = function(l, g, p) {
              var m = "", d = [];
              if (Array.from(l.children).forEach(function(b, s) {
                if ((0, x.c)(b)) {
                  if (p) {
                    var E = b.id.lastIndexOf("_");
                    b.id = b.id.substring(0, E === -1 ? void 0 : E) + "_" + s;
                  }
                  d.push(b.id), m += b.outerHTML.replace("<wbr>", "");
                }
              }), m === "")
                return g.innerHTML = "", "";
              var w = document.createElement("div");
              if (p)
                p.lute.SetToC(!0), p.currentMode === "wysiwyg" && !p.preview.element.contains(l) ? w.innerHTML = p.lute.SpinVditorDOM("<p>[ToC]</p>" + m) : p.currentMode === "ir" && !p.preview.element.contains(l) ? w.innerHTML = p.lute.SpinVditorIRDOM("<p>[ToC]</p>" + m) : w.innerHTML = p.lute.HTML2VditorDOM("<p>[ToC]</p>" + m), p.lute.SetToC(p.options.preview.markdown.toc);
              else {
                g.classList.add("vditor-outline");
                var _ = Lute.New();
                _.SetToC(!0), w.innerHTML = _.HTML2VditorDOM("<p>[ToC]</p>" + m);
              }
              var y = w.firstElementChild.querySelectorAll("li > span[data-target-id]");
              return y.forEach(function(b, s) {
                if (b.nextElementSibling && b.nextElementSibling.tagName === "UL") {
                  var E = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
                  document.getElementById("vditorIconScript") || (E = '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>'), b.innerHTML = "".concat(E, "<span>").concat(b.innerHTML, "</span>");
                } else
                  b.innerHTML = "<svg></svg><span>".concat(b.innerHTML, "</span>");
                b.setAttribute("data-target-id", d[s]);
              }), m = w.firstElementChild.innerHTML, y.length === 0 ? (g.innerHTML = "", m) : (g.innerHTML = m, p && (0, A.T)(g, {
                cdn: p.options.cdn,
                math: p.options.preview.math
              }), g.firstElementChild.addEventListener("click", function(b) {
                for (var s = b.target; s && !s.isEqualNode(g); ) {
                  if (s.classList.contains("vditor-outline__action")) {
                    s.classList.contains("vditor-outline__action--close") ? (s.classList.remove("vditor-outline__action--close"), s.parentElement.nextElementSibling.setAttribute("style", "display:block")) : (s.classList.add("vditor-outline__action--close"), s.parentElement.nextElementSibling.setAttribute("style", "display:none")), b.preventDefault(), b.stopPropagation();
                    break;
                  } else if (s.getAttribute("data-target-id")) {
                    b.preventDefault(), b.stopPropagation();
                    var E = document.getElementById(s.getAttribute("data-target-id"));
                    if (!E)
                      return;
                    if (p)
                      if (p.options.height === "auto") {
                        var L = E.offsetTop + p.element.offsetTop;
                        p.options.toolbarConfig.pin || (L += p.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, L);
                      } else
                        p.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, p.element.offsetTop), p.preview.element.contains(l) ? l.parentElement.scrollTop = E.offsetTop : l.scrollTop = E.offsetTop;
                    else
                      window.scrollTo(window.scrollX, E.offsetTop);
                    break;
                  }
                  s = s.parentElement;
                }
              }), m);
            };
          }
        ),
        /***/
        591: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              M: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = T(913), A = T(161), c = T(59), l = function(g, p) {
              g === void 0 && (g = document), p === void 0 && (p = x.Y.CDN);
              var m = c.plantumlRenderAdapter.getElements(g);
              m.length !== 0 && (0, A.Z)("".concat(p, "/dist/js/plantuml/plantuml-encoder.min.js"), "vditorPlantumlScript").then(function() {
                m.forEach(function(d) {
                  if (!(d.parentElement.classList.contains("vditor-wysiwyg__pre") || d.parentElement.classList.contains("vditor-ir__marker--pre"))) {
                    var w = c.plantumlRenderAdapter.getCode(d).trim();
                    if (w)
                      try {
                        d.innerHTML = '<object type="image/svg+xml" data="https://www.plantuml.com/plantuml/svg/~1'.concat(plantumlEncoder.encode(w), '"/>');
                      } catch (_) {
                        d.className = "vditor-reset--error", d.innerHTML = "plantuml render error: <br>".concat(_);
                      }
                  }
                });
              });
            };
          }
        ),
        /***/
        796: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              X: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(A) {
              var c = Lute.New();
              return c.PutEmojis(A.emojis), c.SetEmojiSite(A.emojiSite), c.SetHeadingAnchor(A.headingAnchor), c.SetInlineMathAllowDigitAfterOpenMarker(A.inlineMathDigit), c.SetAutoSpace(A.autoSpace), c.SetToC(A.toc), c.SetFootnotes(A.footnotes), c.SetFixTermTypo(A.fixTermTypo), c.SetVditorCodeBlockPreview(A.codeBlockPreview), c.SetVditorMathBlockPreview(A.mathBlockPreview), c.SetSanitize(A.sanitize), c.SetChineseParagraphBeginningSpace(A.paragraphBeginningSpace), c.SetRenderListStyle(A.listStyle), c.SetLinkBase(A.linkBase), c.SetLinkPrefix(A.linkPrefix), c.SetMark(A.mark), c.SetGFMAutoLink(A.gfmAutoLink), A.lazyLoadImage && c.SetImageLazyLoading(A.lazyLoadImage), c;
            };
          }
        ),
        /***/
        726: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              o: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(A, c, l) {
              c === void 0 && (c = "zh_CN"), l === void 0 && (l = "classic");
              var g = A.getBoundingClientRect(), p = 36;
              document.body.insertAdjacentHTML("beforeend", '<div class="vditor vditor-img'.concat(l === "dark" ? " vditor--dark" : "", `">
    <div class="vditor-img__bar">
      <span class="vditor-img__btn" data-deg="0">
        <svg><use xlink:href="#vditor-icon-redo"></use></svg>
        `).concat(window.VditorI18n.spin, `
      </span>
      <span class="vditor-img__btn"  onclick="this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''">
        X &nbsp;`).concat(window.VditorI18n.close, `
      </span>
    </div>
    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = '';document.body.style.overflow = ''">
      <img style="width: `).concat(A.width, "px;height:").concat(A.height, "px;transform: translate3d(").concat(g.left, "px, ").concat(g.top - p, 'px, 0)" src="').concat(A.getAttribute("src"), `">
    </div>
</div>`)), document.body.style.overflow = "hidden";
              var m = document.querySelector(".vditor-img img"), d = "translate3d(".concat(Math.max(0, window.innerWidth - A.naturalWidth) / 2, "px, ").concat(Math.max(0, window.innerHeight - p - A.naturalHeight) / 2, "px, 0)");
              setTimeout(function() {
                m.setAttribute("style", "transition: transform .3s ease-in-out;transform: ".concat(d)), setTimeout(function() {
                  m.parentElement.scrollTo((m.parentElement.scrollWidth - m.parentElement.clientWidth) / 2, (m.parentElement.scrollHeight - m.parentElement.clientHeight) / 2);
                }, 400);
              });
              var w = document.querySelector(".vditor-img__btn");
              w.addEventListener("click", function() {
                var _ = parseInt(w.getAttribute("data-deg"), 10) + 90;
                _ / 90 % 2 === 1 && A.naturalWidth > m.parentElement.clientHeight ? m.style.transform = "translate3d(".concat(Math.max(0, window.innerWidth - A.naturalWidth) / 2, "px, ").concat(A.naturalWidth / 2 - A.naturalHeight / 2, "px, 0) rotateZ(").concat(_, "deg)") : m.style.transform = "".concat(d, " rotateZ(").concat(_, "deg)"), w.setAttribute("data-deg", _.toString()), setTimeout(function() {
                  m.parentElement.scrollTo((m.parentElement.scrollWidth - m.parentElement.clientWidth) / 2, (m.parentElement.scrollHeight - m.parentElement.clientHeight) / 2);
                }, 400);
              });
            };
          }
        ),
        /***/
        13: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              h: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = T(913), A = T(505), c = function(l, g) {
              g === void 0 && (g = x.Y.CDN), x.Y.CODE_THEME.includes(l) || (l = "github");
              var p = document.getElementById("vditorHljsStyle"), m = "".concat(g, "/dist/js/highlight.js/styles/").concat(l, ".min.css");
              p ? p.getAttribute("href") !== m && (p.remove(), (0, A.T)(m, "vditorHljsStyle")) : (0, A.T)(m, "vditorHljsStyle");
            };
          }
        ),
        /***/
        873: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              H: () => (
                /* binding */
                A
              )
              /* harmony export */
            });
            var x = T(505), A = function(c, l) {
              if (!(!c || !l)) {
                var g = document.getElementById("vditorContentTheme"), p = "".concat(l, "/").concat(c, ".css");
                g ? g.getAttribute("href") !== p && (g.remove(), (0, x.T)(p, "vditorContentTheme")) : (0, x.T)(p, "vditorContentTheme");
              }
            };
          }
        ),
        /***/
        161: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              U: () => (
                /* binding */
                x
              ),
              /* harmony export */
              Z: () => (
                /* binding */
                A
              )
              /* harmony export */
            });
            var x = function(c, l) {
              if (document.getElementById(l))
                return !1;
              var g = new XMLHttpRequest();
              g.open("GET", c, !1), g.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"), g.send("");
              var p = document.createElement("script");
              p.type = "text/javascript", p.text = g.responseText, p.id = l, document.head.appendChild(p);
            }, A = function(c, l) {
              return new Promise(function(g, p) {
                if (document.getElementById(l))
                  return g(!0), !1;
                var m = document.createElement("script");
                m.src = c, m.async = !0, document.head.appendChild(m), m.onerror = function(d) {
                  p(d);
                }, m.onload = function() {
                  if (document.getElementById(l))
                    return m.remove(), g(!0), !1;
                  m.id = l, g(!0);
                };
              });
            };
          }
        ),
        /***/
        505: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              T: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(A, c) {
              if (!document.getElementById(c)) {
                var l = document.createElement("link");
                l.id = c, l.rel = "stylesheet", l.type = "text/css", l.href = A, document.getElementsByTagName("head")[0].appendChild(l);
              }
            };
          }
        ),
        /***/
        695: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              p: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(A) {
              return A.replace(/\u00a0/g, " ");
            };
          }
        ),
        /***/
        629: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              D: () => (
                /* binding */
                c
              ),
              /* harmony export */
              H8: () => (
                /* binding */
                m
              ),
              /* harmony export */
              _0: () => (
                /* binding */
                g
              ),
              /* harmony export */
              fG: () => (
                /* binding */
                p
              ),
              /* harmony export */
              gm: () => (
                /* binding */
                A
              ),
              /* harmony export */
              nr: () => (
                /* binding */
                x
              ),
              /* harmony export */
              y3: () => (
                /* binding */
                l
              )
              /* harmony export */
            });
            var x = function() {
              return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
            }, A = function() {
              return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            }, c = function() {
              try {
                return typeof localStorage < "u";
              } catch {
                return !1;
              }
            }, l = function() {
              return navigator.userAgent.indexOf("iPhone") > -1 ? "touchstart" : "click";
            }, g = function(d) {
              return navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? !!(d.metaKey && !d.ctrlKey) : !!(!d.metaKey && d.ctrlKey);
            }, p = function(d) {
              return /Mac/.test(navigator.platform) || navigator.platform === "iPhone" ? d.indexOf("⇧") > -1 && A() && (d = d.replace(";", ":").replace("=", "+").replace("-", "_")) : (d.startsWith("⌘") ? d = d.replace("⌘", "⌘+") : d.startsWith("⌥") && d.substr(1, 1) !== "⌘" ? d = d.replace("⌥", "⌥+") : d = d.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌥+⌘+"), d = d.replace("⌘", "Ctrl").replace("⇧", "Shift").replace("⌥", "Alt"), d.indexOf("Shift") > -1 && (d = d.replace(";", ":").replace("=", "+").replace("-", "_"))), d;
            }, m = function() {
              return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            };
          }
        ),
        /***/
        933: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              Ee: () => (
                /* binding */
                x
              ),
              /* harmony export */
              TK: () => (
                /* binding */
                A
              ),
              /* harmony export */
              kY: () => (
                /* binding */
                c
              )
              /* harmony export */
            });
            var x = function() {
              return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(l) {
                return (parseInt(l, 10) ^ window.crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> parseInt(l, 10) / 4).toString(16);
              });
            }, A = function(l, g) {
              g === void 0 && (g = window.location.search);
              var p = g.substring(g.indexOf("?")), m = p.indexOf("#"), d = new URLSearchParams(p.substring(0, m >= 0 ? m : void 0));
              return d.get(l);
            }, c = function(l) {
              return Function('"use strict";return ('.concat(l, ")"))();
            };
          }
        ),
        /***/
        598: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              Ab: () => (
                /* binding */
                l
              ),
              /* harmony export */
              KJ: () => (
                /* binding */
                w
              ),
              /* harmony export */
              KR: () => (
                /* binding */
                g
              ),
              /* harmony export */
              Rp: () => (
                /* binding */
                _
              ),
              /* harmony export */
              Th: () => (
                /* binding */
                p
              ),
              /* harmony export */
              XW: () => (
                /* binding */
                A
              ),
              /* harmony export */
              _Y: () => (
                /* binding */
                d
              ),
              /* harmony export */
              pt: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = T(164), A = function(y, b) {
              for (var s = w(y, b), E = !1, L = !1; s && !s.classList.contains("vditor-reset") && !L; )
                E = w(s.parentElement, b), E ? s = E : L = !0;
              return s || !1;
            }, c = function(y, b, s) {
              for (var E = p(y, b, s), L = !1, D = !1; E && !E.classList.contains("vditor-reset") && !D; )
                L = p(E.parentElement, b, s), L ? E = L : D = !0;
              return E || !1;
            }, l = function(y, b) {
              for (var s = (0, x.f)(y, b), E = !1, L = !1; s && !s.classList.contains("vditor-reset") && !L; )
                E = (0, x.f)(s.parentElement, b), E ? s = E : L = !0;
              return s || !1;
            }, g = function(y) {
              var b = l(y, "UL"), s = l(y, "OL"), E = b;
              return s && (!b || b && s.contains(b)) && (E = s), E;
            }, p = function(y, b, s) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              for (var E = y, L = !1; E && !L && !E.classList.contains("vditor-reset"); )
                E.getAttribute(b) === s ? L = !0 : E = E.parentElement;
              return L && E;
            }, m = function(y) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              var b = y, s = !1, E = p(y, "data-block", "0");
              if (E)
                return E;
              for (; b && !s && !b.classList.contains("vditor-reset"); )
                b.tagName === "H1" || b.tagName === "H2" || b.tagName === "H3" || b.tagName === "H4" || b.tagName === "H5" || b.tagName === "H6" || b.tagName === "P" || b.tagName === "BLOCKQUOTE" || b.tagName === "OL" || b.tagName === "UL" ? s = !0 : b = b.parentElement;
              return s && b;
            }, d = function(y, b) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              for (var s = y, E = !1; s && !E && !s.classList.contains("vditor-reset"); )
                s.nodeName === b ? E = !0 : s = s.parentElement;
              return E && s;
            }, w = function(y, b) {
              if (!y)
                return !1;
              y.nodeType === 3 && (y = y.parentElement);
              for (var s = y, E = !1; s && !E && !s.classList.contains("vditor-reset"); )
                s.classList.contains(b) ? E = !0 : s = s.parentElement;
              return E && s;
            }, _ = function(y) {
              for (; y && y.lastChild; )
                y = y.lastChild;
              return y;
            };
          }
        ),
        /***/
        164: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              c: () => (
                /* binding */
                A
              ),
              /* harmony export */
              f: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function(c, l) {
              if (!c)
                return !1;
              c.nodeType === 3 && (c = c.parentElement);
              for (var g = c, p = !1; g && !p && !g.classList.contains("vditor-reset"); )
                g.nodeName.indexOf(l) === 0 ? p = !0 : g = g.parentElement;
              return p && g;
            }, A = function(c) {
              var l = x(c, "H");
              return l && l.tagName.length === 2 && l.tagName !== "HR" ? l : !1;
            };
          }
        ),
        /***/
        905: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              h: () => (
                /* binding */
                x
              )
              /* harmony export */
            });
            var x = function() {
              for (var A = [], c = 0; c < arguments.length; c++)
                A[c] = arguments[c];
              for (var l = {}, g = function(m) {
                for (var d in m)
                  m.hasOwnProperty(d) && (Object.prototype.toString.call(m[d]) === "[object Object]" ? l[d] = x(l[d], m[d]) : l[d] = m[d]);
              }, p = 0; p < A.length; p++)
                g(A[p]);
              return l;
            };
          }
        ),
        /***/
        827: (
          /***/
          (z, v, T) => {
            "use strict";
            T.d(v, {
              /* harmony export */
              Co: () => (
                /* binding */
                p
              ),
              /* harmony export */
              ED: () => (
                /* binding */
                d
              ),
              /* harmony export */
              Ey: () => (
                /* binding */
                g
              ),
              /* harmony export */
              Fm: () => (
                /* binding */
                w
              ),
              /* harmony export */
              RN: () => (
                /* binding */
                l
              ),
              /* harmony export */
              Z2: () => (
                /* binding */
                y
              ),
              /* harmony export */
              ir: () => (
                /* binding */
                _
              ),
              /* harmony export */
              jl: () => (
                /* binding */
                m
              )
              /* harmony export */
            });
            var x = T(913), A = T(629), c = T(598), l = function(b) {
              var s, E = b[b.currentMode].element;
              return getSelection().rangeCount > 0 && (s = getSelection().getRangeAt(0), E.isEqualNode(s.startContainer) || E.contains(s.startContainer)) ? s : b[b.currentMode].range ? b[b.currentMode].range : (E.focus(), s = E.ownerDocument.createRange(), s.setStart(E, 0), s.collapse(!0), s);
            }, g = function(b) {
              var s = window.getSelection().getRangeAt(0);
              if (!b.contains(s.startContainer) && !(0, c.KJ)(s.startContainer, "vditor-panel--none"))
                return {
                  left: 0,
                  top: 0
                };
              var E = b.parentElement.getBoundingClientRect(), L;
              if (s.getClientRects().length === 0)
                if (s.startContainer.nodeType === 3) {
                  var D = s.startContainer.parentElement;
                  if (D && D.getClientRects().length > 0)
                    L = D.getClientRects()[0];
                  else
                    return {
                      left: 0,
                      top: 0
                    };
                } else {
                  var C = s.startContainer.children;
                  if (C[s.startOffset] && C[s.startOffset].getClientRects().length > 0)
                    L = C[s.startOffset].getClientRects()[0];
                  else if (s.startContainer.childNodes.length > 0) {
                    var I = s.cloneRange();
                    s.selectNode(s.startContainer.childNodes[Math.max(0, s.startOffset - 1)]), L = s.getClientRects()[0], s.setEnd(I.endContainer, I.endOffset), s.setStart(I.startContainer, I.startOffset);
                  } else
                    L = s.startContainer.getClientRects()[0];
                  if (!L) {
                    for (var V = s.startContainer.childNodes[s.startOffset]; !V.getClientRects || V.getClientRects && V.getClientRects().length === 0; )
                      V = V.parentElement;
                    L = V.getClientRects()[0];
                  }
                }
              else
                L = s.getClientRects()[0];
              return {
                left: L.left - E.left,
                top: L.top - E.top
              };
            }, p = function(b, s) {
              if (!s) {
                if (getSelection().rangeCount === 0)
                  return !1;
                s = getSelection().getRangeAt(0);
              }
              var E = s.commonAncestorContainer;
              return b.isEqualNode(E) || b.contains(E);
            }, m = function(b) {
              var s = window.getSelection();
              s.removeAllRanges(), s.addRange(b);
            }, d = function(b, s, E) {
              var L = {
                end: 0,
                start: 0
              };
              if (!E) {
                if (getSelection().rangeCount === 0)
                  return L;
                E = window.getSelection().getRangeAt(0);
              }
              if (p(s, E)) {
                var D = E.cloneRange();
                b.childNodes[0] && b.childNodes[0].childNodes[0] ? D.setStart(b.childNodes[0].childNodes[0], 0) : D.selectNodeContents(b), D.setEnd(E.startContainer, E.startOffset), L.start = D.toString().length, L.end = L.start + E.toString().length;
              }
              return L;
            }, w = function(b, s, E) {
              var L = 0, D = 0, C = E.childNodes[D], I = !1, V = !1;
              b = Math.max(0, b), s = Math.max(0, s);
              var F = E.ownerDocument.createRange();
              for (F.setStart(C || E, 0), F.collapse(!0); !V && C; ) {
                var $ = L + C.textContent.length;
                if (!I && b >= L && b <= $ && (b === 0 ? F.setStart(C, 0) : C.childNodes[0].nodeType === 3 ? F.setStart(C.childNodes[0], b - L) : C.nextSibling ? F.setStartBefore(C.nextSibling) : F.setStartAfter(C), I = !0, b === s)) {
                  V = !0;
                  break;
                }
                I && s >= L && s <= $ && (s === 0 ? F.setEnd(C, 0) : C.childNodes[0].nodeType === 3 ? F.setEnd(C.childNodes[0], s - L) : C.nextSibling ? F.setEndBefore(C.nextSibling) : F.setEndAfter(C), V = !0), L = $, C = E.childNodes[++D];
              }
              return !V && E.childNodes[D - 1] && F.setStartBefore(E.childNodes[D - 1]), m(F), F;
            }, _ = function(b, s) {
              var E = b.querySelector("wbr");
              if (E) {
                if (!E.previousElementSibling)
                  E.previousSibling ? s.setStart(E.previousSibling, E.previousSibling.textContent.length) : E.nextSibling ? E.nextSibling.nodeType === 3 ? s.setStart(E.nextSibling, 0) : s.setStartBefore(E.nextSibling) : s.setStart(E.parentElement, 0);
                else if (E.previousElementSibling.isSameNode(E.previousSibling))
                  if (E.previousElementSibling.lastChild) {
                    s.setStartBefore(E), s.collapse(!0), m(s), (0, A.H8)() && (E.previousElementSibling.tagName === "EM" || E.previousElementSibling.tagName === "STRONG" || E.previousElementSibling.tagName === "S") && (s.insertNode(document.createTextNode(x.Y.ZWSP)), s.collapse(!1)), E.remove();
                    return;
                  } else
                    s.setStartAfter(E.previousElementSibling);
                else
                  s.setStart(E.previousSibling, E.previousSibling.textContent.length);
                s.collapse(!0), E.remove(), m(s);
              }
            }, y = function(b, s) {
              var E = document.createElement("div");
              E.innerHTML = b;
              var L = E.querySelectorAll("p");
              L.length === 1 && !L[0].previousSibling && !L[0].nextSibling && s[s.currentMode].element.children.length > 0 && E.firstElementChild.tagName === "P" && (b = L[0].innerHTML.trim());
              var D = document.createElement("div");
              D.innerHTML = b;
              var C = l(s);
              if (C.toString() !== "" && (s[s.currentMode].preventInput = !0, document.execCommand("delete", !1, "")), D.firstElementChild && D.firstElementChild.getAttribute("data-block") === "0") {
                D.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
                var I = (0, c.pt)(C.startContainer);
                I ? I.insertAdjacentHTML("afterend", D.innerHTML) : s[s.currentMode].element.insertAdjacentHTML("beforeend", D.innerHTML), _(s[s.currentMode].element, C);
              } else {
                var V = document.createElement("template");
                V.innerHTML = b, C.insertNode(V.content.cloneNode(!0)), C.collapse(!1), m(C);
              }
            };
          }
        )
        /******/
      }, Je = {};
      function X(z) {
        var v = Je[z];
        if (v !== void 0)
          return v.exports;
        var T = Je[z] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        return Ge[z](T, T.exports, X), T.exports;
      }
      X.d = (z, v) => {
        for (var T in v)
          X.o(v, T) && !X.o(z, T) && Object.defineProperty(z, T, { enumerable: !0, get: v[T] });
      }, X.o = (z, v) => Object.prototype.hasOwnProperty.call(z, v), X.r = (z) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(z, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(z, "__esModule", { value: !0 });
      };
      var Fe = {};
      return (() => {
        "use strict";
        X.d(Fe, {
          default: () => (
            /* binding */
            Si
          )
        });
        var z = X(923), v = X(913), T = X(695), x = function(e) {
          return e.currentMode === "sv" ? (0, T.p)("".concat(e.sv.element.textContent, `
`).replace(/\n\n$/, `
`)) : e.currentMode === "wysiwyg" ? e.lute.VditorDOM2Md(e.wysiwyg.element.innerHTML) : e.currentMode === "ir" ? e.lute.VditorIRDOM2Md(e.ir.element.innerHTML) : "";
        }, A = X(161), c = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-devtools", this.element.innerHTML = '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>';
            }
            return e.prototype.renderEchart = function(t) {
              var n = this;
              t.devtools.element.style.display === "block" && (0, A.Z)("".concat(t.options.cdn, "/dist/js/echarts/echarts.min.js?v=5.5.1"), "vditorEchartsScript").then(function() {
                n.ASTChart || (n.ASTChart = echarts.init(t.devtools.element.lastElementChild));
                try {
                  n.element.lastElementChild.style.display = "block", n.element.firstElementChild.innerHTML = "", n.ASTChart.setOption({
                    series: [
                      {
                        data: JSON.parse(t.lute.RenderEChartsJSON(x(t))),
                        initialTreeDepth: -1,
                        label: {
                          align: "left",
                          backgroundColor: "rgba(68, 77, 86, .68)",
                          borderRadius: 3,
                          color: "#d1d5da",
                          fontSize: 12,
                          lineHeight: 12,
                          offset: [9, 12],
                          padding: [2, 4, 2, 4],
                          position: "top",
                          verticalAlign: "middle"
                        },
                        lineStyle: {
                          color: "#4285f4",
                          type: "curve",
                          width: 1
                        },
                        orient: "vertical",
                        roam: !0,
                        type: "tree"
                      }
                    ],
                    toolbox: {
                      bottom: 25,
                      emphasis: {
                        iconStyle: {
                          color: "#4285f4"
                        }
                      },
                      feature: {
                        restore: {
                          show: !0
                        },
                        saveAsImage: {
                          show: !0
                        }
                      },
                      right: 15,
                      show: !0
                    }
                  }), n.ASTChart.resize();
                } catch (r) {
                  n.element.lastElementChild.style.display = "none", n.element.firstElementChild.innerHTML = r;
                }
              });
            }, e;
          }()
        ), l = X(629), g = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && r.classList.contains("vditor-menu--current") && r.classList.remove("vditor-menu--current");
            }
          });
        }, p = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && !r.classList.contains("vditor-menu--current") && r.classList.add("vditor-menu--current");
            }
          });
        }, m = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && r.classList.contains(v.Y.CLASS_MENU_DISABLED) && r.classList.remove(v.Y.CLASS_MENU_DISABLED);
            }
          });
        }, d = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var r = e[n].children[0];
              r && !r.classList.contains(v.Y.CLASS_MENU_DISABLED) && r.classList.add(v.Y.CLASS_MENU_DISABLED);
            }
          });
        }, w = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "none");
          });
        }, _ = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "block");
          });
        }, y = function(e, t, n) {
          t.includes("subToolbar") && (e.toolbar.element.querySelectorAll(".vditor-hint").forEach(function(r) {
            n && r.isEqualNode(n) || (r.style.display = "none");
          }), e.toolbar.elements.emoji && (e.toolbar.elements.emoji.lastElementChild.style.display = "none")), t.includes("hint") && (e.hint.element.style.display = "none"), e.wysiwyg.popover && t.includes("popover") && (e.wysiwyg.popover.style.display = "none");
        }, b = function(e, t, n, r) {
          n.addEventListener((0, l.y3)(), function(i) {
            i.preventDefault(), i.stopPropagation(), !n.classList.contains(v.Y.CLASS_MENU_DISABLED) && (e.toolbar.element.querySelectorAll(".vditor-hint--current").forEach(function(a) {
              a.classList.remove("vditor-hint--current");
            }), t.style.display === "block" ? t.style.display = "none" : (y(e, ["subToolbar", "hint", "popover"], n.parentElement.parentElement), n.classList.contains("vditor-tooltipped") || n.classList.add("vditor-hint--current"), t.style.display = "block", e.toolbar.element.getBoundingClientRect().right - n.getBoundingClientRect().right < 250 ? t.classList.add("vditor-panel--left") : t.classList.remove("vditor-panel--left")));
          });
        }, s = X(598), E = X(164), L = function(e, t, n, r) {
          r && console.log("".concat(e, " - ").concat(n, ": ").concat(t));
        }, D = X(288), C = X(784), I = X(51), V = X(500), F = X(339), $ = X(108), ee = X(960), se = X(975), me = X(597), fe = X(162), le = X(591), be = X(931), Te = function(e, t, n) {
          n === void 0 && (n = "sv");
          var r = document.createElement("div");
          r.innerHTML = e;
          var i = !1;
          r.childElementCount === 1 && r.lastElementChild.style.fontFamily.indexOf("monospace") > -1 && (i = !0);
          var a = r.querySelectorAll("pre");
          if (r.childElementCount === 1 && a.length === 1 && a[0].className !== "vditor-wysiwyg" && a[0].className !== "vditor-sv" && (i = !0), e.indexOf(`
<p class="p1">`) === 0 && (i = !0), r.childElementCount === 1 && r.firstElementChild.tagName === "TABLE" && r.querySelector(".line-number") && r.querySelector(".line-content") && (i = !0), i) {
            var o = t || e;
            return /\n/.test(o) || a.length === 1 ? n === "wysiwyg" ? '<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>'.concat(o.replace(/&/g, "&amp;").replace(/</g, "&lt;"), "<wbr></code></pre></div>") : "\n```\n" + o.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n```" : n === "wysiwyg" ? "<code>".concat(o.replace(/&/g, "&amp;").replace(/</g, "&lt;"), "</code><wbr>") : "`".concat(o, "`");
          }
          return !1;
        }, we = function(e, t) {
          if (e) {
            if (e.parentElement.getAttribute("data-type") === "html-block") {
              e.setAttribute("data-render", "1");
              return;
            }
            var n = e.firstElementChild.className.replace("language-", "");
            if (n === "abc")
              (0, D.$)(e, t.options.cdn);
            else if (n === "mermaid")
              (0, se.e)(e, t.options.cdn, t.options.theme);
            else if (n === "smiles")
              (0, be.Y)(e, t.options.cdn, t.options.theme);
            else if (n === "markmap")
              (0, me.K)(e, t.options.cdn);
            else if (n === "flowchart")
              (0, V.D)(e, t.options.cdn);
            else if (n === "echarts")
              (0, C.v)(e, t.options.cdn, t.options.theme);
            else if (n === "mindmap")
              (0, fe.l)(e, t.options.cdn, t.options.theme);
            else if (n === "plantuml")
              (0, le.M)(e, t.options.cdn);
            else if (n === "graphviz")
              (0, F.m)(e, t.options.cdn);
            else if (n === "math")
              (0, ee.T)(e, { cdn: t.options.cdn, math: t.options.preview.math });
            else {
              var r = t.options.customRenders.find(function(i) {
                if (i.language === n)
                  return i.render(e, t), !0;
              });
              r || ((0, $.$)(Object.assign({}, t.options.preview.hljs), e, t.options.cdn), (0, I.o)(e, t.options.preview.hljs));
            }
            e.setAttribute("data-render", "1");
          }
        }, M = X(827), Pe = function(e) {
          if (e.currentMode !== "sv") {
            var t = e[e.currentMode].element, n = e.outline.render(e);
            n === "" && (n = "[ToC]"), t.querySelectorAll('[data-type="toc-block"]').forEach(function(r) {
              r.innerHTML = n, (0, ee.T)(r, {
                cdn: e.options.cdn,
                math: e.options.preview.math
              });
            });
          }
        }, ht = function(e, t) {
          var n = (0, s._Y)(e.target, "SPAN");
          if (n && (0, s.KJ)(n, "vditor-toc")) {
            var r = t[t.currentMode].element.querySelector("#" + n.getAttribute("data-target-id"));
            if (r)
              if (t.options.height === "auto") {
                var i = r.offsetTop + t.element.offsetTop;
                t.options.toolbarConfig.pin || (i += t.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, i);
              } else
                t.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, t.element.offsetTop), t[t.currentMode].element.scrollTop = r.offsetTop;
            return;
          }
        }, mt = function(e, t, n, r) {
          if (e.previousElementSibling && e.previousElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Backspace" && (0, M.ED)(e, t[t.currentMode].element, r).start === 0)
              return e.previousElementSibling.remove(), Q(t), !0;
            if (et(t, n, r, e, e.previousElementSibling))
              return !0;
          }
          if (e.nextElementSibling && e.nextElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Delete" && (0, M.ED)(e, t[t.currentMode].element, r).start >= e.textContent.trimRight().length)
              return e.nextElementSibling.remove(), Q(t), !0;
            if (ut(t, n, r, e, e.nextElementSibling))
              return !0;
          }
          if (n.key === "Backspace" || n.key === "Delete") {
            var i = (0, s.KJ)(r.startContainer, "vditor-toc");
            if (i)
              return i.remove(), Q(t), !0;
          }
        }, Ye = function(e, t, n, r) {
          n === void 0 && (n = !1);
          var i = (0, s.pt)(t.startContainer);
          if (i && !n && i.getAttribute("data-type") !== "code-block") {
            if (Vt(i.innerHTML) && i.previousElementSibling || Kt(i.innerHTML))
              return;
            for (
              var a = (0, M.ED)(i, e.ir.element, t).start, o = !0, f = a - 1;
              // 软换行后有空格
              f > i.textContent.substr(0, a).lastIndexOf(`
`);
              f--
            )
              if (i.textContent.charAt(f) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
              i.textContent.charAt(f) !== "	") {
                o = !1;
                break;
              }
            a === 0 && (o = !1);
            for (var h = !0, f = a - 1; f < i.textContent.length; f++)
              if (i.textContent.charAt(f) !== " " && i.textContent.charAt(f) !== `
`) {
                h = !1;
                break;
              }
            if (o) {
              typeof e.options.input == "function" && e.options.input(x(e));
              return;
            }
            if (h && /^#{1,6} $/.test(i.textContent) && (h = !1), h) {
              var u = (0, s.KJ)(t.startContainer, "vditor-ir__marker");
              if (!u) {
                var S = t.startContainer.previousSibling;
                S && S.nodeType !== 3 && S.classList.contains("vditor-ir__node--expand") && S.classList.remove("vditor-ir__node--expand"), typeof e.options.input == "function" && e.options.input(x(e));
                return;
              }
            }
          }
          if (e.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(te) {
            te.classList.remove("vditor-ir__node--expand");
          }), i || (i = e.ir.element), !i.querySelector("wbr")) {
            var k = (0, s.KJ)(t.startContainer, "vditor-ir__preview");
            k ? k.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>") : t.insertNode(document.createElement("wbr"));
          }
          i.querySelectorAll("[style]").forEach(function(te) {
            te.removeAttribute("style");
          }), i.getAttribute("data-type") === "link-ref-defs-block" && (i = e.ir.element);
          var O = i.isEqualNode(e.ir.element), j = (0, s.Th)(i, "data-type", "footnotes-block"), H = "";
          if (O)
            H = i.innerHTML;
          else {
            var K = (0, E.f)(t.startContainer, "BLOCKQUOTE"), B = (0, s.KR)(t.startContainer);
            if (B && (i = B), K && (!B || B && !K.contains(B)) && (i = K), j && (i = j), H = i.outerHTML, i.tagName === "UL" || i.tagName === "OL") {
              var N = i.previousElementSibling, J = i.nextElementSibling;
              N && (N.tagName === "UL" || N.tagName === "OL") && (H = N.outerHTML + H, N.remove()), J && (J.tagName === "UL" || J.tagName === "OL") && (H = H + J.outerHTML, J.remove()), H = H.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
            } else
              i.previousElementSibling && i.previousElementSibling.textContent.replace(v.Y.ZWSP, "") !== "" && r && r.inputType === "insertParagraph" && (H = i.previousElementSibling.outerHTML + H, i.previousElementSibling.remove());
            i.innerText.startsWith("```") || (e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(te) {
              te && !i.isEqualNode(te) && (H += te.outerHTML, te.remove());
            }), e.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(te) {
              te && !i.isEqualNode(te) && (H += te.outerHTML, te.remove());
            }));
          }
          if (L("SpinVditorIRDOM", H, "argument", e.options.debugger), H = e.lute.SpinVditorIRDOM(H), L("SpinVditorIRDOM", H, "result", e.options.debugger), O)
            i.innerHTML = H;
          else if (i.outerHTML = H, j) {
            var W = (0, s.Th)(e.ir.element.querySelector("wbr"), "data-type", "footnotes-def");
            if (W) {
              var Z = W.textContent, ae = Z.substring(1, Z.indexOf("]:")), re = e.ir.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="'.concat(ae, '"]'));
              re && re.setAttribute("aria-label", Z.substr(ae.length + 3).trim().substr(0, 24));
            }
          }
          var ue, Me = e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
          Me.forEach(function(te, Le) {
            Le === 0 ? ue = te : (ue.insertAdjacentHTML("beforeend", te.innerHTML), te.remove());
          }), Me.length > 0 && e.ir.element.insertAdjacentElement("beforeend", Me[0]);
          var Se, ke = e.ir.element.querySelectorAll("[data-type='footnotes-block']");
          ke.forEach(function(te, Le) {
            Le === 0 ? Se = te : (Se.insertAdjacentHTML("beforeend", te.innerHTML), te.remove());
          }), ke.length > 0 && e.ir.element.insertAdjacentElement("beforeend", ke[0]), (0, M.ir)(e.ir.element, t), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(te) {
            we(te, e);
          }), Pe(e), Ve(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, R = function(e, t) {
          if (e === "")
            return !1;
          if (e.indexOf("⇧") === -1 && e.indexOf("⌘") === -1 && e.indexOf("⌥") === -1)
            return !(0, l._0)(t) && !t.altKey && !t.shiftKey && t.code === e;
          if (e === "⇧Tab")
            return !!(!(0, l._0)(t) && !t.altKey && t.shiftKey && t.code === "Tab");
          var n = e.split("");
          if (e.startsWith("⌥")) {
            var r = n.length === 3 ? n[2] : n[1];
            return !!((n.length === 3 ? (0, l._0)(t) : !(0, l._0)(t)) && t.altKey && !t.shiftKey && t.code === (/^[0-9]$/.test(r) ? "Digit" : "Key") + r);
          }
          e === "⌘Enter" && (n = ["⌘", "Enter"]);
          var i = n.length > 2 && n[0] === "⇧", a = i ? n[2] : n[1];
          return i && ((0, l.gm)() || !/Mac/.test(navigator.platform)) && (a === "-" ? a = "_" : a === "=" && (a = "+")), !!((0, l._0)(t) && t.key.toLowerCase() === a.toLowerCase() && !t.altKey && (!i && !t.shiftKey || i && t.shiftKey));
        }, ie = function(e) {
          var t = e.startContainer;
          if (t.nodeType === 3 && t.nodeValue.length !== e.startOffset)
            return !1;
          for (var n = t.nextSibling; n && n.textContent === ""; )
            n = n.nextSibling;
          if (n) {
            if (n && n.nodeType !== 3 && n.classList.contains("vditor-ir__node") && !n.getAttribute("data-block"))
              return n;
          } else {
            var r = (0, s.KJ)(t, "vditor-ir__marker");
            if (r && !r.nextSibling) {
              var i = t.parentElement.parentElement.nextSibling;
              if (i && i.nodeType !== 3 && i.classList.contains("vditor-ir__node"))
                return i;
            }
            return !1;
          }
          return !1;
        }, U = function(e) {
          var t = e.startContainer, n = t.previousSibling;
          return t.nodeType === 3 && e.startOffset === 0 && n && n.nodeType !== 3 && // *em*|text
          n.classList.contains("vditor-ir__node") && !n.getAttribute("data-block") ? n : !1;
        }, P = function(e, t) {
          t.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(o) {
            o.classList.remove("vditor-ir__node--expand");
          });
          var n = (0, s.XW)(e.startContainer, "vditor-ir__node"), r = !e.collapsed && (0, s.XW)(e.endContainer, "vditor-ir__node");
          if (!(!e.collapsed && (!n || n !== r))) {
            n && (n.classList.add("vditor-ir__node--expand"), n.classList.remove("vditor-ir__node--hidden"), (0, M.jl)(e));
            var i = ie(e);
            if (i) {
              i.classList.add("vditor-ir__node--expand"), i.classList.remove("vditor-ir__node--hidden");
              return;
            }
            var a = U(e);
            if (a) {
              a.classList.add("vditor-ir__node--expand"), a.classList.remove("vditor-ir__node--hidden");
              return;
            }
          }
        }, pe = function(e, t) {
          if (e.ir.composingLock = t.isComposing, t.isComposing)
            return !1;
          t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t);
          var n = (0, M.RN)(e), r = n.startContainer;
          if (!ln(t, e, r) || (cn(n, e, t), Tn(n), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l._0)(t) && t.key !== "Escape" && t.key !== "Delete"))
            return !1;
          var i = (0, s.Th)(r, "data-newline", "1");
          if (!(0, l._0)(t) && !t.altKey && !t.shiftKey && t.key === "Enter" && i && n.startOffset < i.textContent.length) {
            var a = i.previousElementSibling;
            a && (n.insertNode(document.createTextNode(a.textContent)), n.collapse(!1));
            var o = i.nextSibling;
            o && (n.insertNode(document.createTextNode(o.textContent)), n.collapse(!0));
          }
          var f = (0, s._Y)(r, "P");
          if (hn(t, e, f, n) || pn(n, e, f, t) || En(e, n, t, f))
            return !0;
          var h = (0, s.KJ)(r, "vditor-ir__marker--pre");
          if (h && h.tagName === "PRE") {
            var u = h.firstChild;
            if (vn(e, t, h, n) || (u.getAttribute("data-type") === "math-block" || u.getAttribute("data-type") === "html-block") && et(e, t, n, u, h.parentElement) || ut(e, t, n, u, h.parentElement))
              return !0;
          }
          var S = (0, s.Th)(r, "data-type", "code-block-info");
          if (S) {
            if (t.key === "Enter" || t.key === "Tab")
              return n.selectNodeContents(S.nextElementSibling.firstChild), n.collapse(!0), t.preventDefault(), y(e, ["hint"]), !0;
            if (t.key === "Backspace") {
              var k = (0, M.ED)(S, e.ir.element).start;
              k === 1 && n.setStart(r, 0), k === 2 && (e.hint.recentLanguage = "");
            }
            if (et(e, t, n, S, S.parentElement))
              return y(e, ["hint"]), !0;
          }
          var O = (0, s._Y)(r, "TD") || (0, s._Y)(r, "TH");
          if (t.key.indexOf("Arrow") > -1 && O) {
            var j = sr(O);
            if (j && et(e, t, n, O, j))
              return !0;
            var H = lr(O);
            if (H && ut(e, t, n, O, H))
              return !0;
          }
          if (wn(e, t, n) || _n(e, n, t) || Yt(e, n, t))
            return !0;
          var K = (0, E.c)(r);
          if (K) {
            if (R("⌘=", t)) {
              var B = K.querySelector(".vditor-ir__marker--heading");
              return B && B.textContent.trim().length > 1 && ft(e, B.textContent.substr(1)), t.preventDefault(), !0;
            }
            if (R("⌘-", t)) {
              var B = K.querySelector(".vditor-ir__marker--heading");
              return B && B.textContent.trim().length < 6 && ft(e, B.textContent.trim() + "# "), t.preventDefault(), !0;
            }
          }
          var N = (0, s.pt)(r);
          if (t.key === "Backspace" && !(0, l._0)(t) && !t.shiftKey && !t.altKey && n.toString() === "") {
            if (Sn(e, n, t, f))
              return !0;
            if (N && N.previousElementSibling && N.tagName !== "UL" && N.tagName !== "OL" && (N.previousElementSibling.getAttribute("data-type") === "code-block" || N.previousElementSibling.getAttribute("data-type") === "math-block")) {
              var J = (0, M.ED)(N, e.ir.element, n).start;
              if (J === 0 || J === 1 && N.innerText.startsWith(v.Y.ZWSP))
                return n.selectNodeContents(N.previousElementSibling.querySelector(".vditor-ir__marker--pre code")), n.collapse(!1), P(n, e), N.textContent.trim().replace(v.Y.ZWSP, "") === "" && (N.remove(), Ve(e)), t.preventDefault(), !0;
            }
            if (K) {
              var W = K.firstElementChild.textContent.length;
              (0, M.ED)(K, e.ir.element).start === W && W !== 0 && (n.setStart(K.firstElementChild.firstChild, W - 1), n.collapse(!0), (0, M.jl)(n));
            }
          }
          return (t.key === "ArrowUp" || t.key === "ArrowDown") && N && (N.querySelectorAll(".vditor-ir__node").forEach(function(Z) {
            Z.contains(r) || Z.classList.add("vditor-ir__node--hidden");
          }), Cn(t, N, n)) ? !0 : (un(n, t.key), N && mt(N, e, t, n) ? (t.preventDefault(), !0) : !1);
        }, q = X(726), ge = function(e, t) {
          e.querySelectorAll("[data-type=footnotes-link]").forEach(function(n) {
            for (var r = n.parentElement, i = r.nextSibling; i && i.textContent.startsWith("    "); ) {
              var a = i;
              a.childNodes.forEach(function(o) {
                r.append(o.cloneNode(!0));
              }), i = i.nextSibling, a.remove();
            }
            t && t(r);
          });
        }, oe = function(e, t) {
          var n, r = getSelection().getRangeAt(0).cloneRange(), i = r.startContainer;
          r.startContainer.nodeType !== 3 && r.startContainer.tagName === "DIV" && (i = r.startContainer.childNodes[r.startOffset - 1]);
          var a = (0, s.Th)(i, "data-block", "0");
          if (a && t && (t.inputType === "deleteContentBackward" || t.data === " ")) {
            for (
              var o = (0, M.ED)(a, e.sv.element, r).start, f = !0, h = o - 1;
              // 软换行后有空格
              h > a.textContent.substr(0, o).lastIndexOf(`
`);
              h--
            )
              if (a.textContent.charAt(h) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
              a.textContent.charAt(h) !== "	") {
                f = !1;
                break;
              }
            if (o === 0 && (f = !1), f) {
              ve(e);
              return;
            }
            if (t.inputType === "deleteContentBackward") {
              var u = (0, s.Th)(i, "data-type", "code-block-open-marker") || (0, s.Th)(i, "data-type", "code-block-close-marker");
              if (u) {
                if (u.getAttribute("data-type") === "code-block-close-marker") {
                  var S = bt(i, "code-block-open-marker");
                  if (S) {
                    S.textContent = u.textContent, ve(e);
                    return;
                  }
                }
                if (u.getAttribute("data-type") === "code-block-open-marker") {
                  var S = bt(i, "code-block-close-marker", !1);
                  if (S) {
                    S.textContent = u.textContent, ve(e);
                    return;
                  }
                }
              }
              var k = (0, s.Th)(i, "data-type", "math-block-open-marker");
              if (k) {
                var O = k.nextElementSibling.nextElementSibling;
                O && O.getAttribute("data-type") === "math-block-close-marker" && (O.remove(), ve(e));
                return;
              }
              a.querySelectorAll('[data-type="code-block-open-marker"]').forEach(function(N) {
                N.textContent.length === 1 && N.remove();
              }), a.querySelectorAll('[data-type="code-block-close-marker"]').forEach(function(N) {
                N.textContent.length === 1 && N.remove();
              });
              var j = (0, s.Th)(i, "data-type", "heading-marker");
              if (j && j.textContent.indexOf("#") === -1) {
                ve(e);
                return;
              }
            }
            if ((t.data === " " || t.inputType === "deleteContentBackward") && ((0, s.Th)(i, "data-type", "padding") || (0, s.Th)(i, "data-type", "li-marker") || (0, s.Th)(i, "data-type", "task-marker") || (0, s.Th)(i, "data-type", "blockquote-marker"))) {
              ve(e);
              return;
            }
          }
          if (a && a.textContent.trimRight() === "$$") {
            ve(e);
            return;
          }
          a || (a = e.sv.element), ((n = a.firstElementChild) === null || n === void 0 ? void 0 : n.getAttribute("data-type")) === "link-ref-defs-block" && (a = e.sv.element), (0, s.Th)(i, "data-type", "footnotes-link") && (a = e.sv.element), a.textContent.indexOf(Lute.Caret) === -1 && r.insertNode(document.createTextNode(Lute.Caret)), a.querySelectorAll("[style]").forEach(function(N) {
            N.removeAttribute("style");
          }), a.querySelectorAll("font").forEach(function(N) {
            N.outerHTML = N.innerHTML;
          });
          var H = a.textContent, K = a.isEqualNode(e.sv.element);
          if (K)
            H = a.textContent;
          else {
            a.previousElementSibling && (H = a.previousElementSibling.textContent + H, a.previousElementSibling.remove()), a.previousElementSibling && H.indexOf(`---
`) === 0 && (H = a.previousElementSibling.textContent + H, a.previousElementSibling.remove());
            var B = "";
            e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(N, J) {
              N && !a.isEqualNode(N.parentElement) && (B += N.parentElement.textContent + `
`, N.parentElement.remove());
            }), e.sv.element.querySelectorAll("[data-type='footnotes-link']").forEach(function(N, J) {
              N && !a.isEqualNode(N.parentElement) && (B += N.parentElement.textContent + `
`, N.parentElement.remove());
            }), H = B + H;
          }
          H = rn(H, e), K ? a.innerHTML = H : a.outerHTML = H, e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(N) {
            e.sv.element.insertAdjacentElement("beforeend", N.parentElement);
          }), ge(e.sv.element, function(N) {
            e.sv.element.insertAdjacentElement("beforeend", N);
          }), (0, M.ir)(e.sv.element, r), ye(e), ve(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, _e = function(e, t) {
          var n, r, i, a, o;
          if (e.sv.composingLock = t.isComposing, t.isComposing || (t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l._0)(t) && t.key !== "Escape"))
            return !1;
          var f = (0, M.RN)(e), h = f.startContainer;
          f.startContainer.nodeType !== 3 && f.startContainer.tagName === "DIV" && (h = f.startContainer.childNodes[f.startOffset - 1]);
          var u = (0, s.Th)(h, "data-type", "text"), S = (0, s.Th)(h, "data-type", "blockquote-marker");
          if (!S && f.startOffset === 0 && u && u.previousElementSibling && u.previousElementSibling.getAttribute("data-type") === "blockquote-marker" && (S = u.previousElementSibling), S && t.key === "Enter" && !(0, l._0)(t) && !t.altKey && S.nextElementSibling.textContent.trim() === "" && (0, M.ED)(S, e.sv.element, f).start === S.textContent.length)
            return ((n = S.previousElementSibling) === null || n === void 0 ? void 0 : n.getAttribute("data-type")) === "padding" && S.previousElementSibling.setAttribute("data-action", "enter-remove"), S.remove(), ve(e), t.preventDefault(), !0;
          var k = (0, s.Th)(h, "data-type", "li-marker"), O = (0, s.Th)(h, "data-type", "task-marker"), j = k;
          if (j || O && O.nextElementSibling.getAttribute("data-type") !== "task-marker" && (j = O), !j && f.startOffset === 0 && u && u.previousElementSibling && (u.previousElementSibling.getAttribute("data-type") === "li-marker" || u.previousElementSibling.getAttribute("data-type") === "task-marker") && (j = u.previousElementSibling), j) {
            var H = (0, M.ED)(j, e.sv.element, f).start, K = j.getAttribute("data-type") === "task-marker", B = j;
            if (K && (B = j.previousElementSibling.previousElementSibling.previousElementSibling), H === j.textContent.length) {
              if (t.key === "Enter" && !(0, l._0)(t) && !t.altKey && !t.shiftKey && j.nextElementSibling.textContent.trim() === "")
                return ((r = B.previousElementSibling) === null || r === void 0 ? void 0 : r.getAttribute("data-type")) === "padding" ? (B.previousElementSibling.remove(), oe(e)) : (K && (B.remove(), j.previousElementSibling.previousElementSibling.remove(), j.previousElementSibling.remove()), j.nextElementSibling.remove(), j.remove(), ve(e)), t.preventDefault(), !0;
              if (t.key === "Tab")
                return t.shiftKey ? B.previousElementSibling.getAttribute("data-type") === "padding" && B.previousElementSibling.remove() : B.insertAdjacentHTML("beforebegin", '<span data-type="padding">'.concat(B.textContent.replace(/\S/g, " "), "</span>")), /^\d/.test(B.textContent) && (B.textContent = B.textContent.replace(/^\d{1,}/, "1"), f.selectNodeContents(j.firstChild), f.collapse(!1)), oe(e), t.preventDefault(), !0;
            }
          }
          if (Yt(e, f, t))
            return !0;
          var N = (0, s.Th)(h, "data-block", "0"), J = (0, E.f)(h, "SPAN");
          if (t.key === "Enter" && !(0, l._0)(t) && !t.altKey && !t.shiftKey && N) {
            var W = !1, Z = N.textContent.match(/^\n+/);
            (0, M.ED)(N, e.sv.element).start <= (Z ? Z[0].length : 0) && (W = !0);
            var ae = `
`;
            if (J) {
              if (((i = J.previousElementSibling) === null || i === void 0 ? void 0 : i.getAttribute("data-action")) === "enter-remove")
                return J.previousElementSibling.remove(), ve(e), t.preventDefault(), !0;
              ae += Xn(J);
            }
            return f.insertNode(document.createTextNode(ae)), f.collapse(!1), N && N.textContent.trim() !== "" && !W ? oe(e) : ve(e), t.preventDefault(), !0;
          }
          if (t.key === "Backspace" && !(0, l._0)(t) && !t.altKey && !t.shiftKey) {
            if (J && ((a = J.previousElementSibling) === null || a === void 0 ? void 0 : a.getAttribute("data-type")) === "newline" && (0, M.ED)(J, e.sv.element, f).start === 1 && // 飘号的处理需在 inputEvent 中，否则上下飘号对不齐
            J.getAttribute("data-type").indexOf("code-block-") === -1)
              return f.setStart(J, 0), f.extractContents(), J.textContent.trim() !== "" ? oe(e) : ve(e), t.preventDefault(), !0;
            if (N && (0, M.ED)(N, e.sv.element, f).start === 0 && N.previousElementSibling) {
              f.extractContents();
              var re = N.previousElementSibling.lastElementChild;
              return re.getAttribute("data-type") === "newline" && (re.remove(), re = N.previousElementSibling.lastElementChild), re.getAttribute("data-type") !== "newline" && (re.insertAdjacentHTML("afterend", N.innerHTML), N.remove()), N.textContent.trim() !== "" && !(!((o = N.previousElementSibling) === null || o === void 0) && o.querySelector('[data-type="code-block-open-marker"]')) ? oe(e) : (re.getAttribute("data-type") !== "newline" && (f.selectNodeContents(re.lastChild), f.collapse(!1)), ve(e)), t.preventDefault(), !0;
            }
          }
          return !1;
        }, G = X(873), de = function(e) {
          e.options.theme === "dark" ? e.element.classList.add("vditor--dark") : e.element.classList.remove("vditor--dark");
        }, xe = function(e) {
          e.element.innerHTML = "", e.element.classList.add("vditor"), e.options.rtl && e.element.setAttribute("dir", "rtl"), de(e), (0, G.H)(e.options.preview.theme.current, e.options.preview.theme.path), typeof e.options.height == "number" ? e.element.style.height = e.options.height + "px" : e.element.style.height = e.options.height, typeof e.options.minHeight == "number" && (e.element.style.minHeight = e.options.minHeight + "px"), typeof e.options.width == "number" ? e.element.style.width = e.options.width + "px" : e.element.style.width = e.options.width, e.element.appendChild(e.toolbar.element);
          var t = document.createElement("div");
          if (t.className = "vditor-content", e.options.outline.position === "left" && t.appendChild(e.outline.element), t.appendChild(e.wysiwyg.element.parentElement), t.appendChild(e.sv.element), t.appendChild(e.ir.element.parentElement), t.appendChild(e.preview.element), e.toolbar.elements.devtools && t.appendChild(e.devtools.element), e.options.outline.position === "right" && (e.outline.element.classList.add("vditor-outline--right"), t.appendChild(e.outline.element)), e.upload && t.appendChild(e.upload.element), e.options.resize.enable && t.appendChild(e.resize.element), t.appendChild(e.hint.element), t.appendChild(e.tip.element), e.element.appendChild(t), t.addEventListener("click", function() {
            y(e, ["subToolbar"]);
          }), e.toolbar.elements.export && e.element.insertAdjacentHTML("beforeend", '<iframe id="vditorExportIframe" style="width: 100%;height: 0;border: 0"></iframe>'), Ze(e, e.options.mode, Un(e)), document.execCommand("DefaultParagraphSeparator", !1, "p"), navigator.userAgent.indexOf("iPhone") > -1 && typeof window.visualViewport < "u") {
            var n = !1, r = function(i) {
              n || (n = !0, requestAnimationFrame(function() {
                n = !1;
                var a = e.toolbar.element;
                a.style.transform = "none", a.getBoundingClientRect().top < 0 && (a.style.transform = "translate(0, ".concat(-a.getBoundingClientRect().top, "px)"));
              }));
            };
            window.visualViewport.addEventListener("scroll", r), window.visualViewport.addEventListener("resize", r);
          }
        }, He = function(e) {
          var t = window.innerWidth <= v.Y.MOBILE_WIDTH ? 10 : 35;
          if (e.wysiwyg.element.parentElement.style.display !== "none") {
            var n = (e.wysiwyg.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.wysiwyg.element.style.padding = "10px ".concat(Math.max(t, n), "px");
          }
          if (e.ir.element.parentElement.style.display !== "none") {
            var n = (e.ir.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.ir.element.style.padding = "10px ".concat(Math.max(t, n), "px");
          }
          e.preview.element.style.display !== "block" ? e.toolbar.element.style.paddingLeft = Math.max(5, parseInt(e[e.currentMode].element.style.paddingLeft || "0", 10) + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0)) + "px" : e.toolbar.element.style.paddingLeft = 5 + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0) + "px";
        }, gt = function(e) {
          if (e.options.typewriterMode) {
            var t = window.innerHeight;
            typeof e.options.height == "number" ? (t = e.options.height, typeof e.options.minHeight == "number" && (t = Math.max(t, e.options.minHeight)), t = Math.min(window.innerHeight, t)) : t = e.element.clientHeight, e.element.classList.contains("vditor--fullscreen") && (t = window.innerHeight), e[e.currentMode].element.style.setProperty("--editor-bottom", (t - e.toolbar.element.offsetHeight) / 2 + "px");
          }
        }, Jt;
        function Xt() {
          window.removeEventListener("resize", Jt);
        }
        var Un = function(e) {
          gt(e), Xt(), window.addEventListener("resize", Jt = function() {
            He(e), gt(e);
          });
          var t = (0, l.D)() && localStorage.getItem(e.options.cache.id);
          return (!e.options.cache.enable || !t) && (e.options.value ? t = e.options.value : e.originalInnerHTML ? t = e.lute.HTML2Md(e.originalInnerHTML) : e.options.cache.enable || (t = "")), t || "";
        }, at = function(e) {
          clearTimeout(e[e.currentMode].hlToolbarTimeoutId), e[e.currentMode].hlToolbarTimeoutId = window.setTimeout(function() {
            if (e[e.currentMode].element.getAttribute("contenteditable") !== "false" && (0, M.Co)(e[e.currentMode].element)) {
              g(e.toolbar.elements, v.Y.EDIT_TOOLBARS), m(e.toolbar.elements, v.Y.EDIT_TOOLBARS);
              var t = (0, M.RN)(e), n = t.startContainer;
              t.startContainer.nodeType === 3 && (n = t.startContainer.parentElement), n.classList.contains("vditor-reset") && (n = n.childNodes[t.startOffset]);
              var r = e.currentMode === "sv" ? (0, s.Th)(n, "data-type", "heading") : (0, E.c)(n);
              r && p(e.toolbar.elements, ["headings"]);
              var i = e.currentMode === "sv" ? (0, s.Th)(n, "data-type", "blockquote") : (0, s._Y)(n, "BLOCKQUOTE");
              i && p(e.toolbar.elements, ["quote"]);
              var a = (0, s.Th)(n, "data-type", "strong");
              a && p(e.toolbar.elements, ["bold"]);
              var o = (0, s.Th)(n, "data-type", "em");
              o && p(e.toolbar.elements, ["italic"]);
              var f = (0, s.Th)(n, "data-type", "s");
              f && p(e.toolbar.elements, ["strike"]);
              var h = (0, s.Th)(n, "data-type", "a");
              h && p(e.toolbar.elements, ["link"]);
              var u = (0, s._Y)(n, "LI");
              u ? (u.classList.contains("vditor-task") ? p(e.toolbar.elements, ["check"]) : u.parentElement.tagName === "OL" ? p(e.toolbar.elements, ["ordered-list"]) : u.parentElement.tagName === "UL" && p(e.toolbar.elements, ["list"]), m(e.toolbar.elements, ["outdent", "indent"])) : d(e.toolbar.elements, ["outdent", "indent"]);
              var S = (0, s.Th)(n, "data-type", "code-block");
              S && (d(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "inline-code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["code"]));
              var k = (0, s.Th)(n, "data-type", "code");
              k && (d(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["inline-code"]));
              var O = (0, s.Th)(n, "data-type", "table");
              O && d(e.toolbar.elements, [
                "headings",
                "list",
                "ordered-list",
                "check",
                "line",
                "quote",
                "code",
                "table"
              ]);
            }
          }, 200);
        }, ce = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && e.hint.render(e), clearTimeout(e.wysiwyg.afterRenderTimeoutId), e.wysiwyg.afterRenderTimeoutId = window.setTimeout(function() {
            if (!e.wysiwyg.composingLock) {
              var n = x(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.D)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, Vn = function(e) {
          for (var t = e.previousSibling; t; ) {
            if (t.nodeType !== 3 && t.tagName === "A" && !t.previousSibling && t.innerHTML.replace(v.Y.ZWSP, "") === "" && t.nextSibling)
              return t;
            t = t.previousSibling;
          }
          return !1;
        }, Kn = function(e) {
          for (var t = e.startContainer.nextSibling; t && t.textContent === ""; )
            t = t.nextSibling;
          return !!(t && t.nodeType !== 3 && (t.tagName === "CODE" || t.getAttribute("data-type") === "math-inline" || t.getAttribute("data-type") === "html-entity" || t.getAttribute("data-type") === "html-inline"));
        }, $t = function(e) {
          for (var t = "", n = e.nextSibling; n; )
            n.nodeType === 3 ? t += n.textContent : t += n.outerHTML, n = n.nextSibling;
          return t;
        }, Qt = function(e) {
          for (var t = "", n = e.previousSibling; n; )
            n.nodeType === 3 ? t = n.textContent + t : t = n.outerHTML + t, n = n.previousSibling;
          return t;
        }, Yn = function(e) {
          for (var t = e; t && !t.nextSibling; )
            t = t.parentElement;
          return t.nextSibling;
        }, Wn = function(e) {
          var t = Qt(e.startContainer), n = $t(e.startContainer), r = e.startContainer.textContent, i = e.startOffset, a = "", o = "";
          return (r.substr(0, i) !== "" && r.substr(0, i) !== v.Y.ZWSP || t) && (a = "".concat(t).concat(r.substr(0, i))), (r.substr(i) !== "" && r.substr(i) !== v.Y.ZWSP || n) && (o = "".concat(r.substr(i)).concat(n)), {
            afterHTML: o,
            beforeHTML: a
          };
        }, Lt = function(e, t) {
          Array.from(e.wysiwyg.element.childNodes).find(function(n) {
            if (n.nodeType === 3) {
              var r = document.createElement("p");
              r.setAttribute("data-block", "0"), r.textContent = n.textContent;
              var i = t.startContainer.nodeType === 3 ? t.startOffset : n.textContent.length;
              return n.parentNode.insertBefore(r, n), n.remove(), t.setStart(r.firstChild, Math.min(r.firstChild.textContent.length, i)), t.collapse(!0), (0, M.jl)(t), !0;
            } else if (!n.getAttribute("data-block"))
              return n.tagName === "P" ? n.remove() : (n.tagName === "DIV" ? (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.innerHTML, "</p>")) : n.tagName === "BR" ? n.outerHTML = '<p data-block="0">'.concat(n.outerHTML, "<wbr></p>") : (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.outerHTML, "</p>")), (0, M.ir)(e.wysiwyg.element, t), t = getSelection().getRangeAt(0)), !0;
          });
        }, yt = function(e, t) {
          var n = (0, M.RN)(e), r = (0, s.pt)(n.startContainer);
          r || (r = n.startContainer.childNodes[n.startOffset]), !r && e.wysiwyg.element.children.length === 0 && (r = e.wysiwyg.element), r && !r.classList.contains("vditor-wysiwyg__block") && (n.insertNode(document.createElement("wbr")), r.innerHTML.trim() === "<wbr>" && (r.innerHTML = "<wbr><br>"), r.tagName === "BLOCKQUOTE" || r.classList.contains("vditor-reset") ? r.innerHTML = "<".concat(t, ' data-block="0">').concat(r.innerHTML.trim(), "</").concat(t, ">") : r.outerHTML = "<".concat(t, ' data-block="0">').concat(r.innerHTML.trim(), "</").concat(t, ">"), (0, M.ir)(e.wysiwyg.element, n), Pe(e));
        }, At = function(e) {
          var t = getSelection().getRangeAt(0), n = (0, s.pt)(t.startContainer);
          n || (n = t.startContainer.childNodes[t.startOffset]), n && (t.insertNode(document.createElement("wbr")), n.outerHTML = '<p data-block="0">'.concat(n.innerHTML, "</p>"), (0, M.ir)(e.wysiwyg.element, t)), e.wysiwyg.popover.style.display = "none";
        }, ot = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e.previousElementSibling, i = r.ownerDocument.createRange();
          r.tagName === "CODE" ? (r.style.display = "inline-block", n ? i.setStart(r.firstChild, 1) : i.selectNodeContents(r)) : (r.style.display = "block", r.firstChild.firstChild || r.firstChild.appendChild(document.createTextNode("")), i.selectNodeContents(r.firstChild)), n ? i.collapse(!0) : i.collapse(!1), (0, M.jl)(i), !e.firstElementChild.classList.contains("language-mindmap") && ye(t);
        }, qn = function(e, t) {
          if (e.wysiwyg.composingLock = t.isComposing, t.isComposing)
            return !1;
          t.key.indexOf("Arrow") === -1 && t.key !== "Meta" && t.key !== "Control" && t.key !== "Alt" && t.key !== "Shift" && t.key !== "CapsLock" && t.key !== "Escape" && !/^F\d{1,2}$/.test(t.key) && e.undo.recordFirstPosition(e, t);
          var n = (0, M.RN)(e), r = n.startContainer;
          if (!ln(t, e, r) || (cn(n, e, t), Tn(n), t.key !== "Enter" && t.key !== "Tab" && t.key !== "Backspace" && t.key.indexOf("Arrow") === -1 && !(0, l._0)(t) && t.key !== "Escape" && t.key !== "Delete"))
            return !1;
          var i = (0, s.pt)(r), a = (0, s._Y)(r, "P");
          if (hn(t, e, a, n) || pn(n, e, a, t) || wn(e, t, n))
            return !0;
          var o = (0, s.KJ)(r, "vditor-wysiwyg__block");
          if (o) {
            if (t.key === "Escape" && o.children.length === 2)
              return e.wysiwyg.popover.style.display = "none", o.firstElementChild.style.display = "none", e.wysiwyg.element.blur(), t.preventDefault(), !0;
            if (!(0, l._0)(t) && !t.shiftKey && t.altKey && t.key === "Enter" && o.getAttribute("data-type") === "code-block") {
              var f = e.wysiwyg.popover.querySelector(".vditor-input");
              return f.focus(), f.select(), t.preventDefault(), !0;
            }
            if (o.getAttribute("data-block") === "0" && (vn(e, t, o.firstElementChild, n) || ut(e, t, n, o.firstElementChild, o) || o.getAttribute("data-type") !== "yaml-front-matter" && et(e, t, n, o.firstElementChild, o)))
              return !0;
          }
          if (En(e, n, t, a))
            return !0;
          var h = (0, s.Ab)(r, "BLOCKQUOTE");
          if (h && !t.shiftKey && t.altKey && t.key === "Enter") {
            (0, l._0)(t) ? n.setStartBefore(h) : n.setStartAfter(h), (0, M.jl)(n);
            var u = document.createElement("p");
            return u.setAttribute("data-block", "0"), u.innerHTML = `
`, n.insertNode(u), n.collapse(!0), (0, M.jl)(n), ce(e), ye(e), t.preventDefault(), !0;
          }
          var S = (0, E.c)(r);
          if (S) {
            if (S.tagName === "H6" && r.textContent.length === n.startOffset && !(0, l._0)(t) && !t.shiftKey && !t.altKey && t.key === "Enter") {
              var k = document.createElement("p");
              return k.textContent = `
`, k.setAttribute("data-block", "0"), r.parentElement.insertAdjacentElement("afterend", k), n.setStart(k, 0), (0, M.jl)(n), ce(e), ye(e), t.preventDefault(), !0;
            }
            if (R("⌘=", t)) {
              var O = parseInt(S.tagName.substr(1), 10) - 1;
              return O > 0 && (yt(e, "h".concat(O)), ce(e)), t.preventDefault(), !0;
            }
            if (R("⌘-", t)) {
              var O = parseInt(S.tagName.substr(1), 10) + 1;
              return O < 7 && (yt(e, "h".concat(O)), ce(e)), t.preventDefault(), !0;
            }
            t.key === "Backspace" && !(0, l._0)(t) && !t.shiftKey && !t.altKey && S.textContent.length === 1 && At(e);
          }
          if (_n(e, n, t))
            return !0;
          if (t.altKey && t.key === "Enter" && !(0, l._0)(t) && !t.shiftKey) {
            var j = (0, s._Y)(r, "A"), H = (0, s.Th)(r, "data-type", "link-ref"), K = (0, s.Th)(r, "data-type", "footnotes-ref");
            if (j || H || K || S && S.tagName.length === 2) {
              var B = e.wysiwyg.popover.querySelector("input");
              B.focus(), B.select();
            }
          }
          if (Ce(e, t))
            return !0;
          if (R("⇧⌘U", t)) {
            var N = e.wysiwyg.popover.querySelector('[data-type="up"]');
            if (N)
              return N.click(), t.preventDefault(), !0;
          }
          if (R("⇧⌘D", t)) {
            var N = e.wysiwyg.popover.querySelector('[data-type="down"]');
            if (N)
              return N.click(), t.preventDefault(), !0;
          }
          if (Yt(e, n, t))
            return !0;
          if (!(0, l._0)(t) && t.shiftKey && !t.altKey && t.key === "Enter" && r.parentElement.tagName !== "LI" && r.parentElement.tagName !== "P")
            return ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r.parentElement.tagName) ? n.insertNode(document.createTextNode(`
` + v.Y.ZWSP)) : n.insertNode(document.createTextNode(`
`)), n.collapse(!1), (0, M.jl)(n), ce(e), ye(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, l._0)(t) && !t.shiftKey && !t.altKey && n.toString() === "") {
            if (Sn(e, n, t, a))
              return !0;
            if (i) {
              if (i.previousElementSibling && i.previousElementSibling.classList.contains("vditor-wysiwyg__block") && i.previousElementSibling.getAttribute("data-block") === "0" && i.tagName !== "UL" && i.tagName !== "OL") {
                var J = (0, M.ED)(i, e.wysiwyg.element, n).start;
                if (J === 0 && n.startOffset === 0 || // https://github.com/Vanessa219/vditor/issues/894
                J === 1 && i.innerText.startsWith(v.Y.ZWSP))
                  return ot(i.previousElementSibling.lastElementChild, e, !1), i.innerHTML.trim().replace(v.Y.ZWSP, "") === "" && (i.remove(), ce(e)), t.preventDefault(), !0;
              }
              var W = n.startOffset;
              if (n.toString() === "" && r.nodeType === 3 && r.textContent.charAt(W - 2) === `
` && r.textContent.charAt(W - 1) !== v.Y.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(r.parentElement.tagName))
                return r.textContent = r.textContent.substring(0, W - 1) + v.Y.ZWSP, n.setStart(r, W), n.collapse(!0), ce(e), t.preventDefault(), !0;
              r.textContent === v.Y.ZWSP && n.startOffset === 1 && !r.previousSibling && Kn(n) && (r.textContent = ""), i.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach(function(ae) {
                ae.firstElementChild.style.display = "inline", ae.lastElementChild.style.display = "none";
              }), i.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach(function(ae) {
                ae.firstElementChild.style.display = "inline", ae.lastElementChild.style.display = "none";
              });
            }
          }
          if ((0, l.gm)() && n.startOffset === 1 && r.textContent.indexOf(v.Y.ZWSP) > -1 && r.previousSibling && r.previousSibling.nodeType !== 3 && r.previousSibling.tagName === "CODE" && (t.key === "Backspace" || t.key === "ArrowLeft"))
            return n.selectNodeContents(r.previousSibling), n.collapse(!1), t.preventDefault(), !0;
          if (Cn(t, i, n))
            return t.preventDefault(), !0;
          if (un(n, t.key), t.key === "ArrowDown") {
            var Z = r.nextSibling;
            Z && Z.nodeType !== 3 && Z.getAttribute("data-type") === "math-inline" && n.setStartAfter(Z);
          }
          return i && mt(i, e, t, n) ? (t.preventDefault(), !0) : !1;
        }, Ce = function(e, t) {
          if (R("⇧⌘X", t)) {
            var n = e.wysiwyg.popover.querySelector('[data-type="remove"]');
            return n && n.click(), t.preventDefault(), !0;
          }
        }, ze = function(e) {
          clearTimeout(e.wysiwyg.hlToolbarTimeoutId), e.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function() {
            if (e.wysiwyg.element.getAttribute("contenteditable") !== "false" && (0, M.Co)(e.wysiwyg.element)) {
              g(e.toolbar.elements, v.Y.EDIT_TOOLBARS), m(e.toolbar.elements, v.Y.EDIT_TOOLBARS);
              var t = getSelection().getRangeAt(0), n = t.startContainer;
              t.startContainer.nodeType === 3 ? n = t.startContainer.parentElement : n = n.childNodes[t.startOffset >= n.childNodes.length ? n.childNodes.length - 1 : t.startOffset];
              var r = (0, s.Th)(n, "data-type", "footnotes-block");
              if (r) {
                e.wysiwyg.popover.innerHTML = "", Re(r, e), Ne(e, r);
                return;
              }
              var i = (0, s._Y)(n, "LI");
              i ? (i.classList.contains("vditor-task") ? p(e.toolbar.elements, ["check"]) : i.parentElement.tagName === "OL" ? p(e.toolbar.elements, ["ordered-list"]) : i.parentElement.tagName === "UL" && p(e.toolbar.elements, ["list"]), m(e.toolbar.elements, ["outdent", "indent"])) : d(e.toolbar.elements, ["outdent", "indent"]), (0, s._Y)(n, "BLOCKQUOTE") && p(e.toolbar.elements, ["quote"]), ((0, s._Y)(n, "B") || (0, s._Y)(n, "STRONG")) && p(e.toolbar.elements, ["bold"]), ((0, s._Y)(n, "I") || (0, s._Y)(n, "EM")) && p(e.toolbar.elements, ["italic"]), ((0, s._Y)(n, "STRIKE") || (0, s._Y)(n, "S")) && p(e.toolbar.elements, ["strike"]), e.wysiwyg.element.querySelectorAll(".vditor-comment--focus").forEach(function(Y) {
                Y.classList.remove("vditor-comment--focus");
              });
              var a = (0, s.KJ)(n, "vditor-comment");
              if (a) {
                var o = a.getAttribute("data-cmtids").split(" ");
                if (o.length > 1 && a.nextSibling.isSameNode(a.nextElementSibling)) {
                  var f = a.nextElementSibling.getAttribute("data-cmtids").split(" ");
                  o.find(function(Y) {
                    if (f.includes(Y))
                      return o = [Y], !0;
                  });
                }
                e.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(Y) {
                  Y.getAttribute("data-cmtids").indexOf(o[0]) > -1 && Y.classList.add("vditor-comment--focus");
                });
              }
              var h = (0, s._Y)(n, "A");
              h && p(e.toolbar.elements, ["link"]);
              var u = (0, s._Y)(n, "TABLE"), S = (0, E.c)(n);
              (0, s._Y)(n, "CODE") ? (0, s._Y)(n, "PRE") ? (d(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "inline-code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["code"])) : (d(e.toolbar.elements, [
                "headings",
                "bold",
                "italic",
                "strike",
                "line",
                "quote",
                "list",
                "ordered-list",
                "check",
                "code",
                "upload",
                "link",
                "table",
                "record"
              ]), p(e.toolbar.elements, ["inline-code"])) : S ? (d(e.toolbar.elements, ["bold"]), p(e.toolbar.elements, ["headings"])) : u && d(e.toolbar.elements, ["table"]);
              var k = (0, s.KJ)(n, "vditor-toc");
              if (k) {
                e.wysiwyg.popover.innerHTML = "", Re(k, e), Ne(e, k);
                return;
              }
              var O = (0, E.f)(n, "BLOCKQUOTE");
              if (O && (e.wysiwyg.popover.innerHTML = "", Xe(t, O, e), $e(t, O, e), Re(O, e), Ne(e, O)), i && (e.wysiwyg.popover.innerHTML = "", Xe(t, i, e), $e(t, i, e), Re(i, e), Ne(e, i)), u) {
                var j = e.options.lang, H = e.options;
                e.wysiwyg.popover.innerHTML = "";
                var K = function() {
                  var Y = u.rows.length, ne = u.rows[0].cells.length, qe = parseInt(De.value, 10) || Y, je = parseInt(Oe.value, 10) || ne;
                  if (!(qe === Y && ne === je)) {
                    if (ne !== je)
                      for (var pt = je - ne, Ue = 0; Ue < u.rows.length; Ue++)
                        if (pt > 0)
                          for (var Rn = 0; Rn < pt; Rn++)
                            Ue === 0 ? u.rows[Ue].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>") : u.rows[Ue].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                        else
                          for (var Ft = ne - 1; Ft >= je; Ft--)
                            u.rows[Ue].cells[Ft].remove();
                    if (Y !== qe) {
                      var jn = qe - Y;
                      if (jn > 0) {
                        for (var zt = "<tr>", rt = 0; rt < je; rt++)
                          zt += "<td> </td>";
                        for (var In = 0; In < jn; In++)
                          u.querySelector("tbody") ? u.querySelector("tbody").insertAdjacentHTML("beforeend", zt) : u.querySelector("thead").insertAdjacentHTML("afterend", zt + "</tr>");
                      } else
                        for (var rt = Y - 1; rt >= qe; rt--)
                          u.rows[rt].remove(), u.rows.length === 1 && u.querySelector("tbody").remove();
                    }
                    typeof e.options.input == "function" && e.options.input(x(e));
                  }
                }, B = function(Y) {
                  Et(u, Y), Y === "right" ? (Z.classList.remove("vditor-icon--current"), ae.classList.remove("vditor-icon--current"), re.classList.add("vditor-icon--current")) : Y === "center" ? (Z.classList.remove("vditor-icon--current"), re.classList.remove("vditor-icon--current"), ae.classList.add("vditor-icon--current")) : (ae.classList.remove("vditor-icon--current"), re.classList.remove("vditor-icon--current"), Z.classList.add("vditor-icon--current")), (0, M.jl)(t), ce(e);
                }, N = (0, s._Y)(n, "TD"), J = (0, s._Y)(n, "TH"), W = "left";
                N ? W = N.getAttribute("align") || "left" : J && (W = J.getAttribute("align") || "center");
                var Z = document.createElement("button");
                Z.setAttribute("type", "button"), Z.setAttribute("aria-label", window.VditorI18n.alignLeft + "<" + (0, l.fG)("⇧⌘L") + ">"), Z.setAttribute("data-type", "left"), Z.innerHTML = '<svg><use xlink:href="#vditor-icon-align-left"></use></svg>', Z.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (W === "left" ? " vditor-icon--current" : ""), Z.onclick = function() {
                  B("left");
                };
                var ae = document.createElement("button");
                ae.setAttribute("type", "button"), ae.setAttribute("aria-label", window.VditorI18n.alignCenter + "<" + (0, l.fG)("⇧⌘C") + ">"), ae.setAttribute("data-type", "center"), ae.innerHTML = '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>', ae.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (W === "center" ? " vditor-icon--current" : ""), ae.onclick = function() {
                  B("center");
                };
                var re = document.createElement("button");
                re.setAttribute("type", "button"), re.setAttribute("aria-label", window.VditorI18n.alignRight + "<" + (0, l.fG)("⇧⌘R") + ">"), re.setAttribute("data-type", "right"), re.innerHTML = '<svg><use xlink:href="#vditor-icon-align-right"></use></svg>', re.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (W === "right" ? " vditor-icon--current" : ""), re.onclick = function() {
                  B("right");
                };
                var ue = document.createElement("button");
                ue.setAttribute("type", "button"), ue.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + (0, l.fG)("⌘=") + ">"), ue.setAttribute("data-type", "insertRow"), ue.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>', ue.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", ue.onclick = function() {
                  var Y = getSelection().getRangeAt(0).startContainer, ne = (0, s._Y)(Y, "TD") || (0, s._Y)(Y, "TH");
                  ne && mn(e, t, ne);
                };
                var Me = document.createElement("button");
                Me.setAttribute("type", "button"), Me.setAttribute("aria-label", window.VditorI18n.insertRowAbove + "<" + (0, l.fG)("⇧⌘F") + ">"), Me.setAttribute("data-type", "insertRow"), Me.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>', Me.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Me.onclick = function() {
                  var Y = getSelection().getRangeAt(0).startContainer, ne = (0, s._Y)(Y, "TD") || (0, s._Y)(Y, "TH");
                  ne && gn(e, t, ne);
                };
                var Se = document.createElement("button");
                Se.setAttribute("type", "button"), Se.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + (0, l.fG)("⇧⌘=") + ">"), Se.setAttribute("data-type", "insertColumn"), Se.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>', Se.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Se.onclick = function() {
                  var Y = getSelection().getRangeAt(0).startContainer, ne = (0, s._Y)(Y, "TD") || (0, s._Y)(Y, "TH");
                  ne && _t(e, u, ne);
                };
                var ke = document.createElement("button");
                ke.setAttribute("type", "button"), ke.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + (0, l.fG)("⇧⌘G") + ">"), ke.setAttribute("data-type", "insertColumn"), ke.innerHTML = '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>', ke.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", ke.onclick = function() {
                  var Y = getSelection().getRangeAt(0).startContainer, ne = (0, s._Y)(Y, "TD") || (0, s._Y)(Y, "TH");
                  ne && _t(e, u, ne, "beforebegin");
                };
                var te = document.createElement("button");
                te.setAttribute("type", "button"), te.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + (0, l.fG)("⌘-") + ">"), te.setAttribute("data-type", "deleteRow"), te.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>', te.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", te.onclick = function() {
                  var Y = getSelection().getRangeAt(0).startContainer, ne = (0, s._Y)(Y, "TD") || (0, s._Y)(Y, "TH");
                  ne && yn(e, t, ne);
                };
                var Le = document.createElement("button");
                Le.setAttribute("type", "button"), Le.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + (0, l.fG)("⇧⌘-") + ">"), Le.setAttribute("data-type", "deleteColumn"), Le.innerHTML = '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>', Le.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Le.onclick = function() {
                  var Y = getSelection().getRangeAt(0).startContainer, ne = (0, s._Y)(Y, "TD") || (0, s._Y)(Y, "TH");
                  ne && bn(e, t, u, ne);
                };
                var Ae = document.createElement("span");
                Ae.setAttribute("aria-label", window.VditorI18n.row), Ae.className = "vditor-tooltipped vditor-tooltipped__n";
                var De = document.createElement("input");
                Ae.appendChild(De), De.type = "number", De.min = "1", De.className = "vditor-input", De.style.width = "42px", De.style.textAlign = "center", De.setAttribute("placeholder", window.VditorI18n.row), De.value = u.rows.length.toString(), De.oninput = function() {
                  K();
                }, De.onkeydown = function(Y) {
                  if (!Y.isComposing) {
                    if (Y.key === "Tab") {
                      Oe.focus(), Oe.select(), Y.preventDefault();
                      return;
                    }
                    Ce(e, Y) || Be(Y, t);
                  }
                };
                var Ct = document.createElement("span");
                Ct.setAttribute("aria-label", window.VditorI18n.column), Ct.className = "vditor-tooltipped vditor-tooltipped__n";
                var Oe = document.createElement("input");
                Ct.appendChild(Oe), Oe.type = "number", Oe.min = "1", Oe.className = "vditor-input", Oe.style.width = "42px", Oe.style.textAlign = "center", Oe.setAttribute("placeholder", window.VditorI18n.column), Oe.value = u.rows[0].cells.length.toString(), Oe.oninput = function() {
                  K();
                }, Oe.onkeydown = function(Y) {
                  if (!Y.isComposing) {
                    if (Y.key === "Tab") {
                      De.focus(), De.select(), Y.preventDefault();
                      return;
                    }
                    Ce(e, Y) || Be(Y, t);
                  }
                }, Xe(t, u, e), $e(t, u, e), Re(u, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Z), e.wysiwyg.popover.insertAdjacentElement("beforeend", ae), e.wysiwyg.popover.insertAdjacentElement("beforeend", re), e.wysiwyg.popover.insertAdjacentElement("beforeend", Me), e.wysiwyg.popover.insertAdjacentElement("beforeend", ue), e.wysiwyg.popover.insertAdjacentElement("beforeend", ke), e.wysiwyg.popover.insertAdjacentElement("beforeend", Se), e.wysiwyg.popover.insertAdjacentElement("beforeend", te), e.wysiwyg.popover.insertAdjacentElement("beforeend", Le), e.wysiwyg.popover.insertAdjacentElement("beforeend", Ae), e.wysiwyg.popover.insertAdjacentHTML("beforeend", " x "), e.wysiwyg.popover.insertAdjacentElement("beforeend", Ct), Ne(e, u);
              }
              var qt = (0, s.Th)(n, "data-type", "link-ref");
              qt && en(e, qt, t);
              var tt = (0, s.Th)(n, "data-type", "footnotes-ref");
              if (tt) {
                var j = e.options.lang, H = e.options;
                e.wysiwyg.popover.innerHTML = "";
                var Ae = document.createElement("span");
                Ae.setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + (0, l.fG)("⌥Enter") + ">"), Ae.className = "vditor-tooltipped vditor-tooltipped__n";
                var Ke = document.createElement("input");
                Ae.appendChild(Ke), Ke.className = "vditor-input", Ke.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + (0, l.fG)("⌥Enter") + ">"), Ke.style.width = "120px", Ke.value = tt.getAttribute("data-footnotes-label"), Ke.oninput = function() {
                  Ke.value.trim() !== "" && tt.setAttribute("data-footnotes-label", Ke.value), typeof e.options.input == "function" && e.options.input(x(e));
                }, Ke.onkeydown = function(je) {
                  je.isComposing || Ce(e, je) || Be(je, t);
                }, Re(tt, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Ae), Ne(e, tt);
              }
              var Ee = (0, s.KJ)(n, "vditor-wysiwyg__block"), Hn = Ee ? Ee.getAttribute("data-type").indexOf("block") > -1 : !1;
              if (e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(Y) {
                if (!Ee || Ee && Hn && !Ee.contains(Y)) {
                  var ne = Y.previousElementSibling;
                  ne.style.display = "none";
                }
              }), Ee && Hn) {
                if (e.wysiwyg.popover.innerHTML = "", Xe(t, Ee, e), $e(t, Ee, e), Re(Ee, e), Ee.getAttribute("data-type") === "code-block") {
                  var Mt = document.createElement("span");
                  Mt.setAttribute("aria-label", window.VditorI18n.language + "<" + (0, l.fG)("⌥Enter") + ">"), Mt.className = "vditor-tooltipped vditor-tooltipped__n";
                  var Ie = document.createElement("input");
                  Mt.appendChild(Ie);
                  var dt = Ee.firstElementChild.firstElementChild;
                  Ie.className = "vditor-input", Ie.setAttribute("placeholder", window.VditorI18n.language + "<" + (0, l.fG)("⌥Enter") + ">"), Ie.value = dt.className.indexOf("language-") > -1 ? dt.className.split("-")[1].split(" ")[0] : "", Ie.oninput = function(Y) {
                    Ie.value.trim() !== "" ? dt.className = "language-".concat(Ie.value) : (dt.className = "", e.hint.recentLanguage = ""), Ee.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (Ee.lastElementChild.innerHTML = Ee.firstElementChild.innerHTML, we(Ee.lastElementChild, e)), ce(e), Y.detail === 1 && (t.setStart(dt.firstChild, 0), t.collapse(!0), (0, M.jl)(t));
                  }, Ie.onkeydown = function(Y) {
                    if (!Y.isComposing && !Ce(e, Y)) {
                      if (Y.key === "Escape" && e.hint.element.style.display === "block") {
                        e.hint.element.style.display = "none", Y.preventDefault();
                        return;
                      }
                      e.hint.select(Y, e), Be(Y, t);
                    }
                  }, Ie.onkeyup = function(Y) {
                    var ne, qe;
                    if (!(Y.isComposing || Y.key === "Enter" || Y.key === "ArrowUp" || Y.key === "Escape" || Y.key === "ArrowDown")) {
                      var je = [], pt = Ie.value.substring(0, Ie.selectionStart);
                      (e.options.preview.hljs.langs || v.Y.ALIAS_CODE_LANGUAGES.concat(((qe = (ne = window.hljs) === null || ne === void 0 ? void 0 : ne.listLanguages()) !== null && qe !== void 0 ? qe : []).sort())).forEach(function(Ue) {
                        Ue.indexOf(pt.toLowerCase()) > -1 && je.push({
                          html: Ue,
                          value: Ue
                        });
                      }), e.hint.genHTML(je, pt, e), Y.preventDefault();
                    }
                  }, e.wysiwyg.popover.insertAdjacentElement("beforeend", Mt);
                }
                Ne(e, Ee);
              } else
                Ee = void 0;
              if (S) {
                e.wysiwyg.popover.innerHTML = "";
                var Ae = document.createElement("span");
                Ae.setAttribute("aria-label", "ID<" + (0, l.fG)("⌥Enter") + ">"), Ae.className = "vditor-tooltipped vditor-tooltipped__n";
                var We = document.createElement("input");
                Ae.appendChild(We), We.className = "vditor-input", We.setAttribute("placeholder", "ID<" + (0, l.fG)("⌥Enter") + ">"), We.style.width = "120px", We.value = S.getAttribute("data-id") || "", We.oninput = function() {
                  S.setAttribute("data-id", We.value), typeof e.options.input == "function" && e.options.input(x(e));
                }, We.onkeydown = function(ne) {
                  ne.isComposing || Ce(e, ne) || Be(ne, t);
                }, Xe(t, S, e), $e(t, S, e), Re(S, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Ae), Ne(e, S);
              }
              if (h && xt(e, h, t), !O && !i && !u && !Ee && !h && !qt && !tt && !S && !k) {
                var nt = (0, s.Th)(n, "data-block", "0");
                nt && nt.parentElement.isEqualNode(e.wysiwyg.element) ? (e.wysiwyg.popover.innerHTML = "", Xe(t, nt, e), $e(t, nt, e), Re(nt, e), Ne(e, nt)) : e.wysiwyg.popover.style.display = "none";
              }
              e.wysiwyg.element.querySelectorAll('span[data-type="backslash"] > span').forEach(function(Y) {
                Y.style.display = "none";
              });
              var Nn = (0, s.Th)(t.startContainer, "data-type", "backslash");
              Nn && (Nn.querySelector("span").style.display = "inline");
            }
          }, 200);
        }, Ne = function(e, t) {
          var n = t, r = (0, s._Y)(t, "TABLE");
          r && (n = r), e.wysiwyg.popover.style.left = "0", e.wysiwyg.popover.style.display = "block", e.wysiwyg.popover.style.top = Math.max(-8, n.offsetTop - 21 - e.wysiwyg.element.scrollTop) + "px", e.wysiwyg.popover.style.left = Math.min(n.offsetLeft, e.wysiwyg.element.clientWidth - e.wysiwyg.popover.clientWidth) + "px", e.wysiwyg.popover.setAttribute("data-top", (n.offsetTop - 21).toString());
        }, en = function(e, t, n) {
          n === void 0 && (n = getSelection().getRangeAt(0)), e.wysiwyg.popover.innerHTML = "";
          var r = function() {
            a.value.trim() !== "" && (t.tagName === "IMG" ? t.setAttribute("alt", a.value) : t.textContent = a.value), f.value.trim() !== "" && t.setAttribute("data-link-label", f.value), typeof e.options.input == "function" && e.options.input(x(e));
          }, i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), a.style.width = "120px", a.value = t.getAttribute("alt") || t.textContent, a.oninput = function() {
            r();
          }, a.onkeydown = function(h) {
            Ce(e, h) || Be(h, n) || st(e, t, h, f);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.linkRef), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var f = document.createElement("input");
          o.appendChild(f), f.className = "vditor-input", f.setAttribute("placeholder", window.VditorI18n.linkRef), f.value = t.getAttribute("data-link-label"), f.oninput = function() {
            r();
          }, f.onkeydown = function(h) {
            Ce(e, h) || Be(h, n) || st(e, t, h, a);
          }, Re(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", i), e.wysiwyg.popover.insertAdjacentElement("beforeend", o), Ne(e, t);
        }, Xe = function(e, t, n) {
          var r = t.previousElementSibling;
          if (!(!r || !t.parentElement.isEqualNode(n.wysiwyg.element) && t.tagName !== "LI")) {
            var i = document.createElement("button");
            i.setAttribute("type", "button"), i.setAttribute("data-type", "up"), i.setAttribute("aria-label", window.VditorI18n.up + "<" + (0, l.fG)("⇧⌘U") + ">"), i.innerHTML = '<svg><use xlink:href="#vditor-icon-up"></use></svg>', i.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i.onclick = function() {
              e.insertNode(document.createElement("wbr")), r.insertAdjacentElement("beforebegin", t), (0, M.ir)(n.wysiwyg.element, e), ce(n), ze(n), ye(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", i);
          }
        }, $e = function(e, t, n) {
          var r = t.nextElementSibling;
          if (!(!r || !t.parentElement.isEqualNode(n.wysiwyg.element) && t.tagName !== "LI")) {
            var i = document.createElement("button");
            i.setAttribute("type", "button"), i.setAttribute("data-type", "down"), i.setAttribute("aria-label", window.VditorI18n.down + "<" + (0, l.fG)("⇧⌘D") + ">"), i.innerHTML = '<svg><use xlink:href="#vditor-icon-down"></use></svg>', i.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", i.onclick = function() {
              e.insertNode(document.createElement("wbr")), r.insertAdjacentElement("afterend", t), (0, M.ir)(n.wysiwyg.element, e), ce(n), ze(n), ye(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", i);
          }
        }, Re = function(e, t) {
          var n = document.createElement("button");
          n.setAttribute("type", "button"), n.setAttribute("data-type", "remove"), n.setAttribute("aria-label", window.VditorI18n.remove + "<" + (0, l.fG)("⇧⌘X") + ">"), n.innerHTML = '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>', n.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", n.onclick = function() {
            var r = (0, M.RN)(t);
            r.setStartAfter(e), (0, M.jl)(r), e.remove(), ce(t), ze(t), ["H1", "H2", "H3", "H4", "H5", "H6"].includes(e.tagName) && Pe(t);
          }, t.wysiwyg.popover.insertAdjacentElement("beforeend", n);
        }, st = function(e, t, n, r) {
          if (!n.isComposing) {
            if (n.key === "Tab") {
              r.focus(), r.select(), n.preventDefault();
              return;
            }
            if (!(0, l._0)(n) && !n.shiftKey && n.altKey && n.key === "Enter") {
              var i = (0, M.RN)(e);
              t.insertAdjacentHTML("afterend", v.Y.ZWSP), i.setStartAfter(t.nextSibling), i.collapse(!0), (0, M.jl)(i), n.preventDefault();
            }
          }
        }, xt = function(e, t, n) {
          e.wysiwyg.popover.innerHTML = "";
          var r = function() {
            a.value.trim() !== "" && (t.innerHTML = a.value), t.setAttribute("href", f.value), t.setAttribute("title", u.value), ce(e);
          };
          t.querySelectorAll("[data-marker]").forEach(function(S) {
            S.removeAttribute("data-marker");
          });
          var i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), a.style.width = "120px", a.value = t.innerHTML || "", a.oninput = function() {
            r();
          }, a.onkeydown = function(S) {
            Ce(e, S) || Be(S, n) || st(e, t, S, f);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.link), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var f = document.createElement("input");
          o.appendChild(f), f.className = "vditor-input", f.setAttribute("placeholder", window.VditorI18n.link), f.value = t.getAttribute("href") || "", f.oninput = function() {
            r();
          }, f.onkeydown = function(S) {
            Ce(e, S) || Be(S, n) || st(e, t, S, u);
          };
          var h = document.createElement("span");
          h.setAttribute("aria-label", window.VditorI18n.tooltipText), h.className = "vditor-tooltipped vditor-tooltipped__n";
          var u = document.createElement("input");
          h.appendChild(u), u.className = "vditor-input", u.setAttribute("placeholder", window.VditorI18n.tooltipText), u.style.width = "60px", u.value = t.getAttribute("title") || "", u.oninput = function() {
            r();
          }, u.onkeydown = function(S) {
            Ce(e, S) || Be(S, n) || st(e, t, S, a);
          }, Re(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", i), e.wysiwyg.popover.insertAdjacentElement("beforeend", o), e.wysiwyg.popover.insertAdjacentElement("beforeend", h), Ne(e, t);
        }, Fn = function(e, t) {
          var n = e.target;
          t.wysiwyg.popover.innerHTML = "";
          var r = function() {
            n.setAttribute("src", a.value), n.setAttribute("alt", f.value), n.setAttribute("title", u.value), typeof t.options.input == "function" && t.options.input(x(t));
          }, i = document.createElement("span");
          i.setAttribute("aria-label", window.VditorI18n.imageURL), i.className = "vditor-tooltipped vditor-tooltipped__n";
          var a = document.createElement("input");
          i.appendChild(a), a.className = "vditor-input", a.setAttribute("placeholder", window.VditorI18n.imageURL), a.value = n.getAttribute("src") || "", a.oninput = function() {
            r();
          }, a.onkeydown = function(S) {
            Ce(t, S);
          };
          var o = document.createElement("span");
          o.setAttribute("aria-label", window.VditorI18n.alternateText), o.className = "vditor-tooltipped vditor-tooltipped__n";
          var f = document.createElement("input");
          o.appendChild(f), f.className = "vditor-input", f.setAttribute("placeholder", window.VditorI18n.alternateText), f.style.width = "52px", f.value = n.getAttribute("alt") || "", f.oninput = function() {
            r();
          }, f.onkeydown = function(S) {
            Ce(t, S);
          };
          var h = document.createElement("span");
          h.setAttribute("aria-label", window.VditorI18n.title), h.className = "vditor-tooltipped vditor-tooltipped__n";
          var u = document.createElement("input");
          h.appendChild(u), u.className = "vditor-input", u.setAttribute("placeholder", window.VditorI18n.title), u.value = n.getAttribute("title") || "", u.oninput = function() {
            r();
          }, u.onkeydown = function(S) {
            Ce(t, S);
          }, Re(n, t), t.wysiwyg.popover.insertAdjacentElement("beforeend", i), t.wysiwyg.popover.insertAdjacentElement("beforeend", o), t.wysiwyg.popover.insertAdjacentElement("beforeend", h), Ne(t, n);
        }, Be = function(e, t) {
          if (!(0, l._0)(e) && !e.shiftKey && e.key === "Enter" || e.key === "Escape")
            return t && (0, M.jl)(t), e.preventDefault(), e.stopPropagation(), !0;
        }, Qe = function(e) {
          e.currentMode === "wysiwyg" ? ze(e) : e.currentMode === "ir" && at(e);
        }, tn = function(e, t, n) {
          n === void 0 && (n = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          });
          var r = e.wysiwyg.element;
          r.innerHTML = e.lute.Md2VditorDOM(t), r.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(i) {
            we(i, e), i.previousElementSibling.setAttribute("style", "display:none");
          }), ce(e, n);
        }, zn = function(e, t, n) {
          for (var r = e.startContainer.parentElement, i = !1, a = "", o = "", f = Wn(e), h = f.beforeHTML, u = f.afterHTML; r && !i; ) {
            var S = r.tagName;
            if (S === "STRIKE" && (S = "S"), S === "I" && (S = "EM"), S === "B" && (S = "STRONG"), S === "S" || S === "STRONG" || S === "EM") {
              var k = "", O = "", j = "";
              r.parentElement.getAttribute("data-block") !== "0" && (O = Qt(r), j = $t(r)), (h || O) && (k = "".concat(O, "<").concat(S, ">").concat(h, "</").concat(S, ">"), h = k), (n === "bold" && S === "STRONG" || n === "italic" && S === "EM" || n === "strikeThrough" && S === "S") && (k += "".concat(a).concat(v.Y.ZWSP, "<wbr>").concat(o), i = !0), (u || j) && (u = "<".concat(S, ">").concat(u, "</").concat(S, ">").concat(j), k += u), r.parentElement.getAttribute("data-block") !== "0" ? (r = r.parentElement, r.innerHTML = k) : (r.outerHTML = k, r = r.parentElement), a = "<".concat(S, ">") + a, o = "</".concat(S, ">") + o;
            } else
              i = !0;
          }
          (0, M.ir)(t.wysiwyg.element, e);
        }, Zn = function(e, t, n) {
          if (!(e.wysiwyg.composingLock && n instanceof CustomEvent)) {
            var r = !0, i = !0;
            e.wysiwyg.element.querySelector("wbr") && e.wysiwyg.element.querySelector("wbr").remove();
            var a = (0, M.RN)(e), o = t.getAttribute("data-type");
            if (t.classList.contains("vditor-menu--current"))
              if (o === "strike" && (o = "strikeThrough"), o === "quote") {
                var f = (0, s._Y)(a.startContainer, "BLOCKQUOTE");
                f || (f = a.startContainer.childNodes[a.startOffset]), f && (r = !1, t.classList.remove("vditor-menu--current"), a.insertNode(document.createElement("wbr")), f.outerHTML = f.innerHTML.trim() === "" ? '<p data-block="0">'.concat(f.innerHTML, "</p>") : f.innerHTML, (0, M.ir)(e.wysiwyg.element, a));
              } else if (o === "inline-code") {
                var h = (0, s._Y)(a.startContainer, "CODE");
                h || (h = a.startContainer.childNodes[a.startOffset]), h && (h.outerHTML = h.innerHTML.replace(v.Y.ZWSP, "") + "<wbr>", (0, M.ir)(e.wysiwyg.element, a));
              } else
                o === "link" ? (a.collapsed && a.selectNode(a.startContainer.parentElement), document.execCommand("unlink", !1, "")) : o === "check" || o === "list" || o === "ordered-list" ? (vt(e, a, o), (0, M.ir)(e.wysiwyg.element, a), r = !1, t.classList.remove("vditor-menu--current")) : (r = !1, t.classList.remove("vditor-menu--current"), a.toString() === "" ? zn(a, e, o) : document.execCommand(o, !1, ""));
            else {
              e.wysiwyg.element.childNodes.length === 0 && (e.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>', (0, M.ir)(e.wysiwyg.element, a));
              var u = (0, s.pt)(a.startContainer);
              if (o === "quote") {
                if (u || (u = a.startContainer.childNodes[a.startOffset]), u) {
                  r = !1, t.classList.add("vditor-menu--current"), a.insertNode(document.createElement("wbr"));
                  var S = (0, s._Y)(a.startContainer, "LI");
                  S && u.contains(S) ? S.innerHTML = '<blockquote data-block="0">'.concat(S.innerHTML, "</blockquote>") : u.outerHTML = '<blockquote data-block="0">'.concat(u.outerHTML, "</blockquote>"), (0, M.ir)(e.wysiwyg.element, a);
                }
              } else if (o === "check" || o === "list" || o === "ordered-list")
                vt(e, a, o, !1), (0, M.ir)(e.wysiwyg.element, a), r = !1, g(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current");
              else if (o === "inline-code") {
                if (a.toString() === "") {
                  var k = document.createElement("code");
                  k.textContent = v.Y.ZWSP, a.insertNode(k), a.setStart(k.firstChild, 1), a.collapse(!0), (0, M.jl)(a);
                } else if (a.startContainer.nodeType === 3) {
                  var k = document.createElement("code");
                  a.surroundContents(k), a.insertNode(k), (0, M.jl)(a);
                }
                t.classList.add("vditor-menu--current");
              } else if (o === "code") {
                var k = document.createElement("div");
                k.className = "vditor-wysiwyg__block", k.setAttribute("data-type", "code-block"), k.setAttribute("data-block", "0"), k.setAttribute("data-marker", "```"), a.toString() === "" ? k.innerHTML = `<pre><code><wbr>
</code></pre>` : (k.innerHTML = "<pre><code>".concat(a.toString(), "<wbr></code></pre>"), a.deleteContents()), a.insertNode(k), u && (u.outerHTML = e.lute.SpinVditorDOM(u.outerHTML)), (0, M.ir)(e.wysiwyg.element, a), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(ae) {
                  we(ae, e);
                }), t.classList.add("vditor-menu--disabled");
              } else if (o === "link") {
                if (a.toString() === "") {
                  var O = document.createElement("a");
                  O.innerText = v.Y.ZWSP, a.insertNode(O), a.setStart(O.firstChild, 1), a.collapse(!0), xt(e, O, a);
                  var j = e.wysiwyg.popover.querySelector("input");
                  j.value = "", j.focus(), i = !1;
                } else {
                  var k = document.createElement("a");
                  k.setAttribute("href", ""), k.innerHTML = a.toString(), a.surroundContents(k), a.insertNode(k), (0, M.jl)(a), xt(e, k, a);
                  var H = e.wysiwyg.popover.querySelectorAll("input");
                  H[0].value = k.innerText, H[1].focus();
                }
                r = !1, t.classList.add("vditor-menu--current");
              } else if (o === "table") {
                var K = '<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>';
                if (a.toString().trim() === "")
                  u && u.innerHTML.trim().replace(v.Y.ZWSP, "") === "" ? u.outerHTML = K : document.execCommand("insertHTML", !1, K), a.selectNode(e.wysiwyg.element.querySelector("wbr").previousSibling), e.wysiwyg.element.querySelector("wbr").remove(), (0, M.jl)(a);
                else {
                  K = '<table data-block="0"><thead><tr>';
                  var B = a.toString().split(`
`), N = B[0].split(",").length > B[0].split("	").length ? "," : "	";
                  B.forEach(function(Z, ae) {
                    ae === 0 ? (Z.split(N).forEach(function(re, ue) {
                      ue === 0 ? K += "<th>".concat(re, "<wbr></th>") : K += "<th>".concat(re, "</th>");
                    }), K += "</tr></thead>") : (ae === 1 ? K += "<tbody><tr>" : K += "<tr>", Z.split(N).forEach(function(re) {
                      K += "<td>".concat(re, "</td>");
                    }), K += "</tr>");
                  }), K += "</tbody></table>", document.execCommand("insertHTML", !1, K), (0, M.ir)(e.wysiwyg.element, a);
                }
                r = !1, t.classList.add("vditor-menu--disabled");
              } else if (o === "line") {
                if (u) {
                  var J = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                  u.innerHTML.trim() === "" ? u.outerHTML = J : u.insertAdjacentHTML("afterend", J), (0, M.ir)(e.wysiwyg.element, a);
                }
              } else if (r = !1, t.classList.add("vditor-menu--current"), o === "strike" && (o = "strikeThrough"), a.toString() === "" && (o === "bold" || o === "italic" || o === "strikeThrough")) {
                var W = "strong";
                o === "italic" ? W = "em" : o === "strikeThrough" && (W = "s");
                var k = document.createElement(W);
                k.textContent = v.Y.ZWSP, a.insertNode(k), k.previousSibling && k.previousSibling.textContent === v.Y.ZWSP && (k.previousSibling.textContent = ""), a.setStart(k.firstChild, 1), a.collapse(!0), (0, M.jl)(a);
              } else
                document.execCommand(o, !1, "");
            }
            r && ze(e), i && ce(e);
          }
        }, he = (
          /** @class */
          function() {
            function e(t, n) {
              var r, i = this;
              this.element = document.createElement("div"), n.className && (r = this.element.classList).add.apply(r, n.className.split(" "));
              var a = n.hotkey ? " <".concat((0, l.fG)(n.hotkey), ">") : "";
              n.level === 2 && (a = n.hotkey ? " &lt;".concat((0, l.fG)(n.hotkey), "&gt;") : "");
              var o = n.tip ? n.tip + a : "".concat(window.VditorI18n[n.name]).concat(a), f = n.name === "upload" ? "div" : "button";
              if (n.level === 2)
                this.element.innerHTML = "<".concat(f, ' data-type="').concat(n.name, '">').concat(o, "</").concat(f, ">");
              else {
                this.element.classList.add("vditor-toolbar__item");
                var h = document.createElement(f);
                h.setAttribute("data-type", n.name), h.className = "vditor-tooltipped vditor-tooltipped__".concat(n.tipPosition), h.setAttribute("aria-label", o), h.innerHTML = n.icon, this.element.appendChild(h);
              }
              n.prefix && this.element.children[0].addEventListener((0, l.y3)(), function(u) {
                u.preventDefault(), !i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) && (t.currentMode === "wysiwyg" ? Zn(t, i.element.children[0], u) : t.currentMode === "ir" ? cr(t, i.element.children[0], n.prefix || "", n.suffix || "") : $n(t, i.element.children[0], n.prefix || "", n.suffix || ""));
              });
            }
            return e;
          }()
        ), Gn = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Ze = function(e, t, n) {
          var r;
          if (typeof n != "string" ? (y(e, ["subToolbar", "hint"]), n.preventDefault(), r = x(e)) : r = n, !(e.currentMode === t && typeof n != "string")) {
            if (e.devtools && e.devtools.renderEchart(e), e.options.preview.mode === "both" && t === "sv" ? e.preview.element.style.display = "block" : e.preview.element.style.display = "none", m(e.toolbar.elements, v.Y.EDIT_TOOLBARS), g(e.toolbar.elements, v.Y.EDIT_TOOLBARS), d(e.toolbar.elements, ["outdent", "indent"]), t === "ir")
              w(e.toolbar.elements, ["both"]), _(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "block", e.lute.SetVditorIR(!0), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!1), e.currentMode = "ir", e.ir.element.innerHTML = e.lute.Md2VditorIRDOM(r), Ve(e, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), He(e), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(a) {
                we(a, e);
              }), e.ir.element.querySelectorAll(".vditor-toc").forEach(function(a) {
                (0, ee.T)(a, {
                  cdn: e.options.cdn,
                  math: e.options.preview.math
                });
              });
            else if (t === "wysiwyg")
              w(e.toolbar.elements, ["both"]), _(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "block", e.ir.element.parentElement.style.display = "none", e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!0), e.lute.SetVditorSV(!1), e.currentMode = "wysiwyg", He(e), tn(e, r, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), e.wysiwyg.element.querySelectorAll(".vditor-toc").forEach(function(a) {
                (0, ee.T)(a, {
                  cdn: e.options.cdn,
                  math: e.options.preview.math
                });
              }), e.wysiwyg.popover.style.display = "none";
            else if (t === "sv") {
              _(e.toolbar.elements, ["both"]), w(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "none", (e.options.preview.mode === "both" || e.options.preview.mode === "editor") && (e.sv.element.style.display = "block"), e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!0), e.currentMode = "sv";
              var i = rn(r, e);
              i === "<div data-block='0'></div>" && (i = ""), e.sv.element.innerHTML = i, ge(e.sv.element), ve(e, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }), He(e);
            }
            e.undo.resetIcon(e), typeof n != "string" && (e[e.currentMode].element.focus(), Qe(e)), Pe(e), gt(e), e.toolbar.elements["edit-mode"] && (e.toolbar.elements["edit-mode"].querySelectorAll("button").forEach(function(a) {
              a.classList.remove("vditor-menu--current");
            }), e.toolbar.elements["edit-mode"].querySelector('button[data-mode="'.concat(e.currentMode, '"]')).classList.add("vditor-menu--current")), e.outline.toggle(e, e.currentMode !== "sv" && e.options.outline.enable, typeof n != "string");
          }
        }, Jn = (
          /** @class */
          function(e) {
            Gn(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              return a.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow"), a.innerHTML = '<button data-mode="wysiwyg">'.concat(window.VditorI18n.wysiwyg, " &lt;").concat((0, l.fG)("⌥⌘7"), `></button>
<button data-mode="ir">`).concat(window.VditorI18n.instantRendering, " &lt;").concat((0, l.fG)("⌥⌘8"), `></button>
<button data-mode="sv">`).concat(window.VditorI18n.splitView, " &lt;").concat((0, l.fG)("⌥⌘9"), "></button>"), i.element.appendChild(a), i._bindEvent(n, a, r), i;
            }
            return t.prototype._bindEvent = function(n, r, i) {
              var a = this.element.children[0];
              b(n, r, a, i.level), r.children.item(0).addEventListener((0, l.y3)(), function(o) {
                Ze(n, "wysiwyg", o), o.preventDefault(), o.stopPropagation();
              }), r.children.item(1).addEventListener((0, l.y3)(), function(o) {
                Ze(n, "ir", o), o.preventDefault(), o.stopPropagation();
              }), r.children.item(2).addEventListener((0, l.y3)(), function(o) {
                Ze(n, "sv", o), o.preventDefault(), o.stopPropagation();
              });
            }, t;
          }(he)
        ), lt = function(e, t) {
          return (0, M.Co)(e, t) ? getSelection().toString() : "";
        }, Dt = function(e, t) {
          t.addEventListener("focus", function() {
            e.options.focus && e.options.focus(x(e)), y(e, ["subToolbar", "hint"]);
          });
        }, nn = function(e, t) {
          t.addEventListener("dblclick", function(n) {
            n.target.tagName === "IMG" && (e.options.image.preview ? e.options.image.preview(n.target) : e.options.image.isPreview && (0, q.o)(n.target, e.options.lang, e.options.theme));
          });
        }, Ot = function(e, t) {
          t.addEventListener("blur", function(n) {
            if (e.currentMode === "ir") {
              var r = e.ir.element.querySelector(".vditor-ir__node--expand");
              r && r.classList.remove("vditor-ir__node--expand");
            } else
              e.currentMode === "wysiwyg" && !e.wysiwyg.selectPopover.contains(n.relatedTarget) && e.wysiwyg.hideComment();
            e[e.currentMode].range = (0, M.RN)(e), e.options.blur && e.options.blur(x(e));
          });
        }, Ht = function(e, t) {
          t.addEventListener("dragstart", function(n) {
            n.dataTransfer.setData(v.Y.DROP_EDITOR, v.Y.DROP_EDITOR);
          }), t.addEventListener("drop", function(n) {
            n.dataTransfer.getData(v.Y.DROP_EDITOR) ? Q(e) : (n.dataTransfer.types.includes("Files") || n.dataTransfer.types.includes("text/html")) && St(e, n, {
              pasteCode: function(r) {
                document.execCommand("insertHTML", !1, r);
              }
            });
          });
        }, Nt = function(e, t, n) {
          t.addEventListener("copy", function(r) {
            return n(r, e);
          });
        }, Rt = function(e, t, n) {
          t.addEventListener("cut", function(r) {
            n(r, e), e.options.comment.enable && e.currentMode === "wysiwyg" && e.wysiwyg.getComments(e), document.execCommand("delete");
          });
        }, ye = function(e) {
          if (e.currentMode === "wysiwyg" && e.options.comment.enable && e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)), !!e.options.typewriterMode) {
            var t = e[e.currentMode].element, n = (0, M.Ey)(t).top;
            e.options.height === "auto" && !e.element.classList.contains("vditor--fullscreen") && window.scrollTo(window.scrollX, n + e.element.offsetTop + e.toolbar.element.offsetHeight - window.innerHeight / 2 + 10), (e.options.height !== "auto" || e.element.classList.contains("vditor--fullscreen")) && (t.scrollTop = n + t.scrollTop - t.clientHeight / 2 + 10);
          }
        }, jt = function(e, t) {
          t.addEventListener("keydown", function(n) {
            if (!n.isComposing && e.options.keydown && e.options.keydown(n), !((e.options.hint.extend.length > 1 || e.toolbar.elements.emoji) && e.hint.select(n, e))) {
              if (e.options.comment.enable && e.currentMode === "wysiwyg" && (n.key === "Backspace" || R("⌘X", n)) && e.wysiwyg.getComments(e), e.currentMode === "sv") {
                if (_e(e, n))
                  return;
              } else if (e.currentMode === "wysiwyg") {
                if (qn(e, n))
                  return;
              } else if (e.currentMode === "ir" && pe(e, n))
                return;
              if (e.options.ctrlEnter && R("⌘Enter", n)) {
                e.options.ctrlEnter(x(e)), n.preventDefault();
                return;
              }
              if (R("⌘Z", n) && !e.toolbar.elements.undo) {
                e.undo.undo(e), n.preventDefault();
                return;
              }
              if (R("⌘Y", n) && !e.toolbar.elements.redo) {
                e.undo.redo(e), n.preventDefault();
                return;
              }
              if (n.key === "Escape") {
                e.hint.element.style.display === "block" ? e.hint.element.style.display = "none" : e.options.esc && !n.isComposing && e.options.esc(x(e)), n.preventDefault();
                return;
              }
              if ((0, l._0)(n) && n.altKey && !n.shiftKey && /^Digit[1-6]$/.test(n.code)) {
                if (e.currentMode === "wysiwyg") {
                  var r = n.code.replace("Digit", "H");
                  (0, s._Y)(getSelection().getRangeAt(0).startContainer, r) ? At(e) : yt(e, r), ce(e);
                } else
                  e.currentMode === "sv" ? an(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ") : e.currentMode === "ir" && ft(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ");
                return n.preventDefault(), !0;
              }
              if ((0, l._0)(n) && n.altKey && !n.shiftKey && /^Digit[7-9]$/.test(n.code))
                return n.code === "Digit7" ? Ze(e, "wysiwyg", n) : n.code === "Digit8" ? Ze(e, "ir", n) : n.code === "Digit9" && Ze(e, "sv", n), !0;
              e.options.toolbar.find(function(i) {
                if (!i.hotkey || i.toolbar) {
                  if (i.toolbar) {
                    var a = i.toolbar.find(function(o) {
                      if (!o.hotkey)
                        return !1;
                      if (R(o.hotkey, n))
                        return e.toolbar.elements[o.name].children[0].dispatchEvent(new CustomEvent((0, l.y3)())), n.preventDefault(), !0;
                    });
                    return !!a;
                  }
                  return !1;
                }
                if (R(i.hotkey, n))
                  return e.toolbar.elements[i.name].children[0].dispatchEvent(new CustomEvent((0, l.y3)())), n.preventDefault(), !0;
              });
            }
          });
        }, It = function(e, t) {
          t.addEventListener("selectstart", function(n) {
            t.onmouseup = function() {
              setTimeout(function() {
                var r = lt(e[e.currentMode].element);
                r.trim() ? (e.currentMode === "wysiwyg" && e.options.comment.enable && (!(0, s.Th)(n.target, "data-type", "footnotes-block") && !(0, s.Th)(n.target, "data-type", "link-ref-defs-block") ? e.wysiwyg.showComment() : e.wysiwyg.hideComment()), e.options.select && e.options.select(r)) : e.currentMode === "wysiwyg" && e.options.comment.enable && e.wysiwyg.hideComment();
              });
            };
          });
        }, Pt = function(e, t) {
          var n = (0, M.RN)(e);
          n.extractContents(), n.insertNode(document.createTextNode(Lute.Caret)), n.insertNode(document.createTextNode(t));
          var r = (0, s.Th)(n.startContainer, "data-block", "0");
          r || (r = e.sv.element);
          var i = e.lute.SpinVditorSVDOM(r.textContent);
          i = "<div data-block='0'>" + i.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", r.isEqualNode(e.sv.element) ? r.innerHTML = i : r.outerHTML = i, ge(e.sv.element), (0, M.ir)(e.sv.element, n), ye(e);
        }, bt = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e;
          for (r.nodeType === 3 && (r = r.parentElement); r; ) {
            if (r.getAttribute("data-type") === t)
              return r;
            n ? r = r.previousElementSibling : r = r.nextElementSibling;
          }
          return !1;
        }, rn = function(e, t) {
          L("SpinVditorSVDOM", e, "argument", t.options.debugger);
          var n = t.lute.SpinVditorSVDOM(e);
          return e = "<div data-block='0'>" + n.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", L("SpinVditorSVDOM", e, "result", t.options.debugger), e;
        }, Xn = function(e) {
          var t = e.getAttribute("data-type"), n = e.previousElementSibling, r = t && t !== "text" && t !== "table" && t !== "heading-marker" && t !== "newline" && t !== "yaml-front-matter-open-marker" && t !== "yaml-front-matter-close-marker" && t !== "code-block-info" && t !== "code-block-close-marker" && t !== "code-block-open-marker" ? e.textContent : "", i = !1;
          for (t === "newline" && (i = !0); n && !i; ) {
            var a = n.getAttribute("data-type");
            if (a === "li-marker" || a === "blockquote-marker" || a === "task-marker" || a === "padding") {
              var o = n.textContent;
              if (a === "li-marker" && (t === "code-block-open-marker" || t === "code-block-info"))
                r = o.replace(/\S/g, " ") + r;
              else if (t === "code-block-close-marker" && n.nextElementSibling.isSameNode(e)) {
                var f = bt(e, "code-block-open-marker");
                f && f.previousElementSibling && (n = f.previousElementSibling, r = o + r);
              } else
                r = o + r;
            } else
              a === "newline" && (i = !0);
            n = n.previousElementSibling;
          }
          return r;
        }, ve = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && e.hint.render(e), e.preview.render(e);
          var n = x(e);
          typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.D)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), clearTimeout(e.sv.processTimeoutId), e.sv.processTimeoutId = window.setTimeout(function() {
            t.enableAddUndoStack && !e.sv.composingLock && e.undo.addToUndoStack(e);
          }, e.options.undoDelay);
        }, an = function(e, t) {
          var n = (0, M.RN)(e), r = (0, E.f)(n.startContainer, "SPAN");
          r && r.textContent.trim() !== "" && (t = `
` + t), n.collapse(!0), document.execCommand("insertHTML", !1, t);
        }, $n = function(e, t, n, r) {
          var i = (0, M.RN)(e), a = t.getAttribute("data-type");
          e.sv.element.childNodes.length === 0 && (e.sv.element.innerHTML = `<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">
</span></span>`, (0, M.ir)(e.sv.element, i));
          var o = (0, s.pt)(i.startContainer), f = (0, E.f)(i.startContainer, "SPAN");
          if (o) {
            if (a === "link") {
              var h = void 0;
              i.toString() === "" ? h = "".concat(n).concat(Lute.Caret).concat(r) : h = "".concat(n).concat(i.toString()).concat(r.replace(")", Lute.Caret + ")")), document.execCommand("insertHTML", !1, h);
              return;
            } else if (a === "italic" || a === "bold" || a === "strike" || a === "inline-code" || a === "code" || a === "table" || a === "line") {
              var h = void 0;
              i.toString() === "" ? h = "".concat(n).concat(Lute.Caret).concat(a === "code" ? "" : r) : h = "".concat(n).concat(i.toString()).concat(Lute.Caret).concat(a === "code" ? "" : r), a === "table" || a === "code" && f && f.textContent !== "" ? h = `

` + h : a === "line" && (h = `

`.concat(n, `
`).concat(Lute.Caret)), document.execCommand("insertHTML", !1, h);
              return;
            } else if ((a === "check" || a === "list" || a === "ordered-list" || a === "quote") && f) {
              var u = "* ";
              a === "check" ? u = "* [ ] " : a === "ordered-list" ? u = "1. " : a === "quote" && (u = "> ");
              var S = bt(f, "newline");
              S ? S.insertAdjacentText("afterend", u) : o.insertAdjacentText("afterbegin", u), oe(e);
              return;
            }
            (0, M.ir)(e.sv.element, i), ve(e);
          }
        }, on = function(e) {
          switch (e.currentMode) {
            case "ir":
              return e.ir.element;
            case "wysiwyg":
              return e.wysiwyg.element;
            case "sv":
              return e.sv.element;
          }
        }, sn = function(e, t) {
          e.options.upload.setHeaders && (e.options.upload.headers = e.options.upload.setHeaders()), e.options.upload.headers && Object.keys(e.options.upload.headers).forEach(function(n) {
            t.setRequestHeader(n, e.options.upload.headers[n]);
          });
        }, Qn = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function f(S) {
              try {
                u(r.next(S));
              } catch (k) {
                o(k);
              }
            }
            function h(S) {
              try {
                u(r.throw(S));
              } catch (k) {
                o(k);
              }
            }
            function u(S) {
              S.done ? a(S.value) : i(S.value).then(f, h);
            }
            u((r = r.apply(e, t || [])).next());
          });
        }, er = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1)
              throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: f(0), throw: f(1), return: f(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function f(u) {
            return function(S) {
              return h([u, S]);
            };
          }
          function h(u) {
            if (r)
              throw new TypeError("Generator is already executing.");
            for (; o && (o = 0, u[0] && (n = 0)), n; )
              try {
                if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done)
                  return a;
                switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
                  case 0:
                  case 1:
                    a = u;
                    break;
                  case 4:
                    return n.label++, { value: u[1], done: !1 };
                  case 5:
                    n.label++, i = u[1], u = [0];
                    continue;
                  case 7:
                    u = n.ops.pop(), n.trys.pop();
                    continue;
                  default:
                    if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                      n = 0;
                      continue;
                    }
                    if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
                      n.label = u[1];
                      break;
                    }
                    if (u[0] === 6 && n.label < a[1]) {
                      n.label = a[1], a = u;
                      break;
                    }
                    if (a && n.label < a[2]) {
                      n.label = a[2], n.ops.push(u);
                      break;
                    }
                    a[2] && n.ops.pop(), n.trys.pop();
                    continue;
                }
                u = t.call(e, n);
              } catch (S) {
                u = [6, S], i = 0;
              } finally {
                r = a = 0;
              }
            if (u[0] & 5)
              throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, tr = (
          /** @class */
          function() {
            function e() {
              this.isUploading = !1, this.element = document.createElement("div"), this.element.className = "vditor-upload";
            }
            return e;
          }()
        ), nr = function(e, t) {
          e.tip.hide();
          for (var n = [], r = "", i = "", a = e.options.lang, o = e.options, f = function(S, k) {
            var O = t[k], j = !0;
            O.name || (r += "<li>".concat(window.VditorI18n.nameEmpty, "</li>"), j = !1), O.size > e.options.upload.max && (r += "<li>".concat(O.name, " ").concat(window.VditorI18n.over, " ").concat(e.options.upload.max / 1024 / 1024, "M</li>"), j = !1);
            var H = O.name.lastIndexOf("."), K = O.name.substr(H), B = e.options.upload.filename(O.name.substr(0, H)) + K;
            if (e.options.upload.accept) {
              var N = e.options.upload.accept.split(",").some(function(J) {
                var W = J.trim();
                if (W.indexOf(".") === 0) {
                  if (K.toLowerCase() === W.toLowerCase())
                    return !0;
                } else if (O.type.split("/")[0] === W.split("/")[0])
                  return !0;
                return !1;
              });
              N || (r += "<li>".concat(O.name, " ").concat(window.VditorI18n.fileTypeError, "</li>"), j = !1);
            }
            j && (n.push(O), i += "<li>".concat(B, " ").concat(window.VditorI18n.uploading, "</li>"));
          }, h = t.length, u = 0; u < h; u++)
            f(h, u);
          return e.tip.show("<ul>".concat(r).concat(i, "</ul>")), n;
        }, rr = function(e, t) {
          var n = on(t);
          n.focus();
          var r = JSON.parse(e), i = "";
          r.code === 1 && (i = "".concat(r.msg)), r.data.errFiles && r.data.errFiles.length > 0 && (i = "<ul><li>".concat(i, "</li>"), r.data.errFiles.forEach(function(o) {
            var f = o.lastIndexOf("."), h = t.options.upload.filename(o.substr(0, f)) + o.substr(f);
            i += "<li>".concat(h, " ").concat(window.VditorI18n.uploadError, "</li>");
          }), i += "</ul>"), i ? t.tip.show(i) : t.tip.hide();
          var a = "";
          Object.keys(r.data.succMap).forEach(function(o) {
            var f = r.data.succMap[o], h = o.lastIndexOf("."), u = o.substr(h), S = t.options.upload.filename(o.substr(0, h)) + u;
            u = u.toLowerCase(), u.indexOf(".wav") === 0 || u.indexOf(".mp3") === 0 || u.indexOf(".ogg") === 0 ? t.currentMode === "wysiwyg" ? a += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="`.concat(f, '"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="').concat(f, `"></audio></pre></div>
`) : t.currentMode === "ir" ? a += '<audio controls="controls" src="'.concat(f, `"></audio>
`) : a += "[".concat(S, "](").concat(f, `)
`) : u.indexOf(".apng") === 0 || u.indexOf(".bmp") === 0 || u.indexOf(".gif") === 0 || u.indexOf(".ico") === 0 || u.indexOf(".cur") === 0 || u.indexOf(".jpg") === 0 || u.indexOf(".jpeg") === 0 || u.indexOf(".jfif") === 0 || u.indexOf(".pjp") === 0 || u.indexOf(".pjpeg") === 0 || u.indexOf(".png") === 0 || u.indexOf(".svg") === 0 || u.indexOf(".webp") === 0 ? t.currentMode === "wysiwyg" ? a += '<img alt="'.concat(S, '" src="').concat(f, `">
`) : a += "![".concat(S, "](").concat(f, `)
`) : t.currentMode === "wysiwyg" ? a += '<a href="'.concat(f, '">').concat(S, `</a>
`) : a += "[".concat(S, "](").concat(f, `)
`);
          }), (0, M.jl)(t.upload.range), document.execCommand("insertHTML", !1, a), t.upload.range = getSelection().getRangeAt(0).cloneRange();
        }, Bt = function(e, t, n) {
          return Qn(void 0, void 0, void 0, function() {
            var r, i, H, a, o, o, f, h, u, S, k, O, j, H, K, B;
            return er(this, function(N) {
              switch (N.label) {
                case 0:
                  for (r = [], i = e.options.upload.multiple === !0 ? t.length : 1, H = 0; H < i; H++)
                    a = t[H], a instanceof DataTransferItem && (a = a.getAsFile()), r.push(a);
                  return e.options.upload.handler ? [4, e.options.upload.handler(r)] : [3, 2];
                case 1:
                  return o = N.sent(), n && (n.value = ""), typeof o == "string" ? (e.tip.show(o), [
                    2
                    /*return*/
                  ]) : [
                    2
                    /*return*/
                  ];
                case 2:
                  return !e.options.upload.url || !e.upload ? (n && (n.value = ""), e.tip.show("please config: options.upload.url"), [
                    2
                    /*return*/
                  ]) : e.options.upload.file ? [4, e.options.upload.file(r)] : [3, 4];
                case 3:
                  r = N.sent(), N.label = 4;
                case 4:
                  if (e.options.upload.validate && (o = e.options.upload.validate(r), typeof o == "string"))
                    return e.tip.show(o), [
                      2
                      /*return*/
                    ];
                  if (f = on(e), e.upload.range = (0, M.RN)(e), h = nr(e, r), h.length === 0)
                    return n && (n.value = ""), [
                      2
                      /*return*/
                    ];
                  for (u = new FormData(), S = e.options.upload.extraData, k = 0, O = Object.keys(S); k < O.length; k++)
                    j = O[k], u.append(j, S[j]);
                  for (H = 0, K = h.length; H < K; H++)
                    u.append(e.options.upload.fieldName, h[H]);
                  return B = new XMLHttpRequest(), B.open("POST", e.options.upload.url), e.options.upload.token && B.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (B.withCredentials = !0), sn(e, B), e.upload.isUploading = !0, f.setAttribute("contenteditable", "false"), B.onreadystatechange = function() {
                    if (B.readyState === XMLHttpRequest.DONE) {
                      if (e.upload.isUploading = !1, f.setAttribute("contenteditable", "true"), B.status >= 200 && B.status < 300)
                        if (e.options.upload.success)
                          e.options.upload.success(f, B.responseText);
                        else {
                          var J = B.responseText;
                          e.options.upload.format && (J = e.options.upload.format(t, B.responseText)), rr(J, e);
                        }
                      else
                        e.options.upload.error ? e.options.upload.error(B.responseText) : e.tip.show(B.responseText);
                      n && (n.value = ""), e.upload.element.style.display = "none";
                    }
                  }, B.upload.onprogress = function(J) {
                    if (J.lengthComputable) {
                      var W = J.loaded / J.total * 100;
                      e.upload.element.style.display = "block";
                      var Z = e.upload.element;
                      Z.style.width = W + "%";
                    }
                  }, B.send(u), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, wt = function(e, t, n) {
          var r, i = (0, s.pt)(t.startContainer);
          if (i || (i = e.wysiwyg.element), n && n.inputType !== "formatItalic" && n.inputType !== "deleteByDrag" && n.inputType !== "insertFromDrop" && n.inputType !== "formatBold" && n.inputType !== "formatRemove" && n.inputType !== "formatStrikeThrough" && n.inputType !== "insertUnorderedList" && n.inputType !== "insertOrderedList" && n.inputType !== "formatOutdent" && n.inputType !== "formatIndent" && n.inputType !== "" || !n) {
            var a = Vn(t.startContainer);
            a && a.remove(), e.wysiwyg.element.querySelectorAll("wbr").forEach(function(W) {
              W.remove();
            }), t.insertNode(document.createElement("wbr")), i.querySelectorAll("[style]").forEach(function(W) {
              W.removeAttribute("style");
            }), i.querySelectorAll(".vditor-comment").forEach(function(W) {
              W.textContent.trim() === "" && (W.classList.remove("vditor-comment", "vditor-comment--focus"), W.removeAttribute("data-cmtids"));
            }), (r = i.previousElementSibling) === null || r === void 0 || r.querySelectorAll(".vditor-comment").forEach(function(W) {
              W.textContent.trim() === "" && (W.classList.remove("vditor-comment", "vditor-comment--focus"), W.removeAttribute("data-cmtids"));
            });
            var o = "";
            i.getAttribute("data-type") === "link-ref-defs-block" && (i = e.wysiwyg.element);
            var f = i.isEqualNode(e.wysiwyg.element), h = (0, s.Th)(i, "data-type", "footnotes-block");
            if (f)
              o = i.innerHTML;
            else {
              var u = (0, s.KR)(t.startContainer);
              if (u && !h) {
                var S = (0, E.f)(t.startContainer, "BLOCKQUOTE");
                S ? i = (0, s.pt)(t.startContainer) || i : i = u;
              }
              if (h && (i = h), o = i.outerHTML, i.tagName === "UL" || i.tagName === "OL") {
                var k = i.previousElementSibling, O = i.nextElementSibling;
                k && (k.tagName === "UL" || k.tagName === "OL") && (o = k.outerHTML + o, k.remove()), O && (O.tagName === "UL" || O.tagName === "OL") && (o = o + O.outerHTML, O.remove()), o = o.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
              }
              i.innerText.startsWith("```") || (e.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(W) {
                W && !i.isEqualNode(W) && (o += W.outerHTML, W.remove());
              }), e.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(W) {
                W && !i.isEqualNode(W) && (o += W.outerHTML, W.remove());
              }));
            }
            if (o = o.replace(/<\/(strong|b)><strong data-marker="\W{2}">/g, "").replace(/<\/(em|i)><em data-marker="\W{1}">/g, "").replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, ""), o === '<p data-block="0">```<wbr></p>' && e.hint.recentLanguage && (o = '<p data-block="0">```<wbr></p>'.replace("```", "```" + e.hint.recentLanguage)), L("SpinVditorDOM", o, "argument", e.options.debugger), o = e.lute.SpinVditorDOM(o), L("SpinVditorDOM", o, "result", e.options.debugger), f)
              i.innerHTML = o;
            else if (i.outerHTML = o, h) {
              var j = (0, s.Ab)(e.wysiwyg.element.querySelector("wbr"), "LI");
              if (j) {
                var H = e.wysiwyg.element.querySelector('sup[data-type="footnotes-ref"][data-footnotes-label="'.concat(j.getAttribute("data-marker"), '"]'));
                H && H.setAttribute("aria-label", j.textContent.trim().substr(0, 24));
              }
            }
            var K, B = e.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']");
            B.forEach(function(W, Z) {
              Z === 0 ? K = W : (K.insertAdjacentHTML("beforeend", W.innerHTML), W.remove());
            }), B.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", B[0]);
            var N, J = e.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']");
            J.forEach(function(W, Z) {
              Z === 0 ? N = W : (N.insertAdjacentHTML("beforeend", W.innerHTML), W.remove());
            }), J.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", J[0]), (0, M.ir)(e.wysiwyg.element, t), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(W) {
              we(W, e);
            }), n && (n.inputType === "deleteContentBackward" || n.inputType === "deleteContentForward") && e.options.comment.enable && (e.wysiwyg.triggerRemoveComment(e), e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)));
          }
          Pe(e), ce(e, {
            enableAddUndoStack: !0,
            enableHint: !0,
            enableInput: !0
          });
        }, ir = function(e, t) {
          return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
        }, ar = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function f(S) {
              try {
                u(r.next(S));
              } catch (k) {
                o(k);
              }
            }
            function h(S) {
              try {
                u(r.throw(S));
              } catch (k) {
                o(k);
              }
            }
            function u(S) {
              S.done ? a(S.value) : i(S.value).then(f, h);
            }
            u((r = r.apply(e, t || [])).next());
          });
        }, or = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1)
              throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: f(0), throw: f(1), return: f(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function f(u) {
            return function(S) {
              return h([u, S]);
            };
          }
          function h(u) {
            if (r)
              throw new TypeError("Generator is already executing.");
            for (; o && (o = 0, u[0] && (n = 0)), n; )
              try {
                if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done)
                  return a;
                switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
                  case 0:
                  case 1:
                    a = u;
                    break;
                  case 4:
                    return n.label++, { value: u[1], done: !1 };
                  case 5:
                    n.label++, i = u[1], u = [0];
                    continue;
                  case 7:
                    u = n.ops.pop(), n.trys.pop();
                    continue;
                  default:
                    if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                      n = 0;
                      continue;
                    }
                    if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
                      n.label = u[1];
                      break;
                    }
                    if (u[0] === 6 && n.label < a[1]) {
                      n.label = a[1], a = u;
                      break;
                    }
                    if (a && n.label < a[2]) {
                      n.label = a[2], n.ops.push(u);
                      break;
                    }
                    a[2] && n.ops.pop(), n.trys.pop();
                    continue;
                }
                u = t.call(e, n);
              } catch (S) {
                u = [6, S], i = 0;
              } finally {
                r = a = 0;
              }
            if (u[0] & 5)
              throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, ln = function(e, t, n) {
          if (e.keyCode === 229 && e.code === "" && e.key === "Unidentified" && t.currentMode !== "sv") {
            var r = (0, s.pt)(n);
            if (r && r.textContent.trim() === "")
              return t[t.currentMode].composingLock = !0, !1;
          }
          return !0;
        }, cn = function(e, t, n) {
          if (!(n.key === "Enter" || n.key === "Tab" || n.key === "Backspace" || n.key.indexOf("Arrow") > -1 || (0, l._0)(n) || n.key === "Escape" || n.shiftKey || n.altKey)) {
            var r = (0, s._Y)(e.startContainer, "P") || (0, s._Y)(e.startContainer, "LI");
            if (r && (0, M.ED)(r, t[t.currentMode].element, e).start === 0) {
              r.nodeValue && (r.nodeValue = r.nodeValue.replace(/\u2006/g, ""));
              var i = document.createTextNode(v.Y.ZWSP);
              e.insertNode(i), e.setStartAfter(i);
            }
          }
        }, un = function(e, t) {
          if (t === "ArrowDown" || t === "ArrowUp") {
            var n = (0, s.Th)(e.startContainer, "data-type", "math-inline") || (0, s.Th)(e.startContainer, "data-type", "html-entity") || (0, s.Th)(e.startContainer, "data-type", "html-inline");
            n && (t === "ArrowDown" && e.setStartAfter(n.parentElement), t === "ArrowUp" && e.setStartBefore(n.parentElement));
          }
        }, ct = function(e, t) {
          var n = (0, M.RN)(e), r = (0, s.pt)(n.startContainer);
          r && (r.insertAdjacentHTML(t, '<p data-block="0">'.concat(v.Y.ZWSP, `<wbr>
</p>`)), (0, M.ir)(e[e.currentMode].element, n), Qe(e), Q(e));
        }, sr = function(e) {
          var t = (0, s._Y)(e, "TABLE");
          return t && t.rows[0].cells[0].isSameNode(e) ? t : !1;
        }, lr = function(e) {
          var t = (0, s._Y)(e, "TABLE");
          return t && t.lastElementChild.lastElementChild.lastElementChild.isSameNode(e) ? t : !1;
        }, fn = function(e, t, n) {
          n === void 0 && (n = !0);
          var r = e.previousElementSibling;
          return r || (e.parentElement.previousElementSibling ? r = e.parentElement.previousElementSibling.lastElementChild : e.parentElement.parentElement.tagName === "TBODY" && e.parentElement.parentElement.previousElementSibling ? r = e.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild : r = null), r && (t.selectNodeContents(r), n || t.collapse(!1), (0, M.jl)(t)), r;
        }, ut = function(e, t, n, r, i) {
          var a = (0, M.ED)(r, e[e.currentMode].element, n);
          if (t.key === "ArrowDown" && r.textContent.trimRight().substr(a.start).indexOf(`
`) === -1 || t.key === "ArrowRight" && a.start >= r.textContent.trimRight().length) {
            var o = i.nextElementSibling;
            return !o || o && (o.tagName === "TABLE" || o.getAttribute("data-type")) ? (i.insertAdjacentHTML("afterend", '<p data-block="0">'.concat(v.Y.ZWSP, "<wbr></p>")), (0, M.ir)(e[e.currentMode].element, n)) : (n.selectNodeContents(o), n.collapse(!0), (0, M.jl)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, et = function(e, t, n, r, i) {
          var a = (0, M.ED)(r, e[e.currentMode].element, n);
          if (t.key === "ArrowUp" && r.textContent.substr(0, a.start).indexOf(`
`) === -1 || (t.key === "ArrowLeft" || t.key === "Backspace" && n.toString() === "") && a.start === 0) {
            var o = i.previousElementSibling;
            return !o || o && (o.tagName === "TABLE" || o.getAttribute("data-type")) ? (i.insertAdjacentHTML("beforebegin", '<p data-block="0">'.concat(v.Y.ZWSP, "<wbr></p>")), (0, M.ir)(e[e.currentMode].element, n)) : (n.selectNodeContents(o), n.collapse(!1), (0, M.jl)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, vt = function(e, t, n, r) {
          r === void 0 && (r = !0);
          var i = (0, s._Y)(t.startContainer, "LI");
          if (e[e.currentMode].element.querySelectorAll("wbr").forEach(function(S) {
            S.remove();
          }), t.insertNode(document.createElement("wbr")), r && i) {
            for (var a = "", o = 0; o < i.parentElement.childElementCount; o++) {
              var f = i.parentElement.children[o].querySelector("input");
              f && f.remove(), a += '<p data-block="0">'.concat(i.parentElement.children[o].innerHTML.trimLeft(), "</p>");
            }
            i.parentElement.insertAdjacentHTML("beforebegin", a), i.parentElement.remove();
          } else if (i)
            if (n === "check")
              i.parentElement.querySelectorAll("li").forEach(function(S) {
                S.insertAdjacentHTML("afterbegin", '<input type="checkbox" />'.concat(S.textContent.indexOf(" ") === 0 ? "" : " ")), S.classList.add("vditor-task");
              });
            else {
              i.querySelector("input") && i.parentElement.querySelectorAll("li").forEach(function(S) {
                S.querySelector("input").remove(), S.classList.remove("vditor-task");
              });
              var u = void 0;
              n === "list" ? (u = document.createElement("ul"), u.setAttribute("data-marker", "*")) : (u = document.createElement("ol"), u.setAttribute("data-marker", "1.")), u.setAttribute("data-block", "0"), u.setAttribute("data-tight", i.parentElement.getAttribute("data-tight")), u.innerHTML = i.parentElement.innerHTML, i.parentElement.parentNode.replaceChild(u, i.parentElement);
            }
          else {
            var h = (0, s.Th)(t.startContainer, "data-block", "0");
            h || (e[e.currentMode].element.querySelector("wbr").remove(), h = e[e.currentMode].element.querySelector("p"), h.innerHTML = "<wbr>"), n === "check" ? (h.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li class="vditor-task"><input type="checkbox" /> '.concat(h.innerHTML, "</li></ul>")), h.remove()) : n === "list" ? (h.insertAdjacentHTML("beforebegin", '<ul data-block="0"><li>'.concat(h.innerHTML, "</li></ul>")), h.remove()) : n === "ordered-list" && (h.insertAdjacentHTML("beforebegin", '<ol data-block="0"><li>'.concat(h.innerHTML, "</li></ol>")), h.remove());
          }
        }, dn = function(e, t, n) {
          var r = t.previousElementSibling;
          if (t && r) {
            var i = [t];
            Array.from(n.cloneContents().children).forEach(function(h, u) {
              h.nodeType !== 3 && t && h.textContent.trim() !== "" && t.getAttribute("data-node-id") === h.getAttribute("data-node-id") && (u !== 0 && i.push(t), t = t.nextElementSibling);
            }), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(h) {
              h.remove();
            }), n.insertNode(document.createElement("wbr"));
            var a = r.parentElement, o = "";
            i.forEach(function(h) {
              var u = h.getAttribute("data-marker");
              u.length !== 1 && (u = "1".concat(u.slice(-1))), o += '<li data-node-id="'.concat(h.getAttribute("data-node-id"), '" data-marker="').concat(u, '">').concat(h.innerHTML, "</li>"), h.remove();
            }), r.insertAdjacentHTML("beforeend", "<".concat(a.tagName, ' data-block="0">').concat(o, "</").concat(a.tagName, ">")), e.currentMode === "wysiwyg" ? a.outerHTML = e.lute.SpinVditorDOM(a.outerHTML) : a.outerHTML = e.lute.SpinVditorIRDOM(a.outerHTML), (0, M.ir)(e[e.currentMode].element, n);
            var f = (0, s.KR)(n.startContainer);
            f && f.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(h) {
              we(h, e), e.currentMode === "wysiwyg" && h.previousElementSibling.setAttribute("style", "display:none");
            }), Q(e), Qe(e);
          } else
            e[e.currentMode].element.focus();
        }, Ut = function(e, t, n, r) {
          var i = (0, s._Y)(t.parentElement, "LI");
          if (i) {
            e[e.currentMode].element.querySelectorAll("wbr").forEach(function(k) {
              k.remove();
            }), n.insertNode(document.createElement("wbr"));
            var a = t.parentElement, o = a.cloneNode(), f = [t];
            Array.from(n.cloneContents().children).forEach(function(k, O) {
              k.nodeType !== 3 && t && k.textContent.trim() !== "" && t.getAttribute("data-node-id") === k.getAttribute("data-node-id") && (O !== 0 && f.push(t), t = t.nextElementSibling);
            });
            var h = !1, u = "";
            a.querySelectorAll("li").forEach(function(k) {
              h && (u += k.outerHTML, !k.nextElementSibling && !k.previousElementSibling ? k.parentElement.remove() : k.remove()), k.isSameNode(f[f.length - 1]) && (h = !0);
            }), f.reverse().forEach(function(k) {
              i.insertAdjacentElement("afterend", k);
            }), u && (o.innerHTML = u, f[0].insertAdjacentElement("beforeend", o)), e.currentMode === "wysiwyg" ? r.outerHTML = e.lute.SpinVditorDOM(r.outerHTML) : r.outerHTML = e.lute.SpinVditorIRDOM(r.outerHTML), (0, M.ir)(e[e.currentMode].element, n);
            var S = (0, s.KR)(n.startContainer);
            S && S.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(k) {
              we(k, e), e.currentMode === "wysiwyg" && k.previousElementSibling.setAttribute("style", "display:none");
            }), Q(e), Qe(e);
          } else
            e[e.currentMode].element.focus();
        }, Et = function(e, t) {
          for (var n = getSelection().getRangeAt(0).startContainer.parentElement, r = e.rows[0].cells.length, i = e.rows.length, a = 0, o = 0; o < i; o++)
            for (var f = 0; f < r; f++)
              if (e.rows[o].cells[f].isSameNode(n)) {
                a = f;
                break;
              }
          for (var h = 0; h < i; h++)
            e.rows[h].cells[a].setAttribute("align", t);
        }, Vt = function(e) {
          var t = e.trimRight().split(`
`).pop();
          return t === "" ? !1 : (t.replace(/ |-/g, "") === "" || t.replace(/ |_/g, "") === "" || t.replace(/ |\*/g, "") === "") && t.replace(/ /g, "").length > 2 ? !(t.indexOf("-") > -1 && t.trimLeft().indexOf(" ") === -1 && e.trimRight().split(`
`).length > 1 || t.indexOf("    ") === 0 || t.indexOf("	") === 0) : !1;
        }, Kt = function(e) {
          var t = e.trimRight().split(`
`);
          return e = t.pop(), e.indexOf("    ") === 0 || e.indexOf("	") === 0 || (e = e.trimLeft(), e === "" || t.length === 0) ? !1 : e.replace(/-/g, "") === "" || e.replace(/=/g, "") === "";
        }, Q = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), e.currentMode === "wysiwyg" ? ce(e, t) : e.currentMode === "ir" ? Ve(e, t) : e.currentMode === "sv" && ve(e, t);
        }, pn = function(e, t, n, r) {
          var i, a = e.startContainer, o = (0, s._Y)(a, "LI");
          if (o) {
            if (!(0, l._0)(r) && !r.altKey && r.key === "Enter" && // fix li 中有多个 P 时，在第一个 P 中换行会在下方生成新的 li
            !r.shiftKey && n && o.contains(n) && n.nextElementSibling)
              return o && !o.textContent.endsWith(`
`) && o.insertAdjacentText("beforeend", `
`), e.insertNode(document.createTextNode(`

`)), e.collapse(!1), Q(t), r.preventDefault(), !0;
            if (!(0, l._0)(r) && !r.shiftKey && !r.altKey && r.key === "Backspace" && !o.previousElementSibling && e.toString() === "" && (0, M.ED)(o, t[t.currentMode].element, e).start === 0)
              return o.nextElementSibling ? (o.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>'.concat(o.innerHTML, "</p>")), o.remove()) : o.parentElement.outerHTML = '<p data-block="0"><wbr>'.concat(o.innerHTML, "</p>"), (0, M.ir)(t[t.currentMode].element, e), Q(t), r.preventDefault(), !0;
            if (!(0, l._0)(r) && !r.shiftKey && !r.altKey && r.key === "Backspace" && o.textContent.trim().replace(v.Y.ZWSP, "") === "" && e.toString() === "" && ((i = o.previousElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "LI")
              return o.previousElementSibling.insertAdjacentText("beforeend", `

`), e.selectNodeContents(o.previousElementSibling), e.collapse(!1), o.remove(), (0, M.ir)(t[t.currentMode].element, e), Q(t), r.preventDefault(), !0;
            if (!(0, l._0)(r) && !r.altKey && r.key === "Tab") {
              var f = !1;
              if ((e.startOffset === 0 && (a.nodeType === 3 && !a.previousSibling || a.nodeType !== 3 && a.nodeName === "LI") || o.classList.contains("vditor-task") && e.startOffset === 1 && a.previousSibling.nodeType !== 3 && a.previousSibling.tagName === "INPUT") && (f = !0), f || e.toString() !== "")
                return r.shiftKey ? Ut(t, o, e, o.parentElement) : dn(t, o, e), r.preventDefault(), !0;
            }
          }
          return !1;
        }, Yt = function(e, t, n) {
          if (e.options.tab && n.key === "Tab")
            return n.shiftKey || (t.toString() === "" ? (t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1)) : (t.extractContents(), t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1))), (0, M.jl)(t), Q(e), n.preventDefault(), !0;
        }, hn = function(e, t, n, r) {
          if (n) {
            if (!(0, l._0)(e) && !e.altKey && e.key === "Enter") {
              var i = String.raw(Mn || (Mn = ir(["", ""], ["", ""])), n.textContent).replace(/\\\|/g, "").trim(), a = i.split("|");
              if (i.startsWith("|") && i.endsWith("|") && a.length > 3) {
                var o = a.map(function() {
                  return "---";
                }).join("|");
                return o = n.textContent + `
` + o.substring(3, o.length - 3) + `
|<wbr>`, n.outerHTML = t.lute.SpinVditorDOM(o), (0, M.ir)(t[t.currentMode].element, r), Q(t), ye(t), e.preventDefault(), !0;
              }
              if (Vt(n.innerHTML) && n.previousElementSibling) {
                var f = "", h = n.innerHTML.trimRight().split(`
`);
                return h.length > 1 && (h.pop(), f = '<p data-block="0">'.concat(h.join(`
`), "</p>")), n.insertAdjacentHTML("afterend", "".concat(f, `<hr data-block="0"><p data-block="0"><wbr>
</p>`)), n.remove(), (0, M.ir)(t[t.currentMode].element, r), Q(t), ye(t), e.preventDefault(), !0;
              }
              if (Kt(n.innerHTML))
                return t.currentMode === "wysiwyg" ? n.outerHTML = t.lute.SpinVditorDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`) : n.outerHTML = t.lute.SpinVditorIRDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`), (0, M.ir)(t[t.currentMode].element, r), Q(t), ye(t), e.preventDefault(), !0;
            }
            if (r.collapsed && n.previousElementSibling && e.key === "Backspace" && !(0, l._0)(e) && !e.altKey && !e.shiftKey && n.textContent.trimRight().split(`
`).length > 1 && (0, M.ED)(n, t[t.currentMode].element, r).start === 0) {
              var u = (0, s.Rp)(n.previousElementSibling);
              return u.textContent.endsWith(`
`) || (u.textContent = u.textContent + `
`), u.parentElement.insertAdjacentHTML("beforeend", "<wbr>".concat(n.innerHTML)), n.remove(), (0, M.ir)(t[t.currentMode].element, r), !1;
            }
            return !1;
          }
        }, mn = function(e, t, n) {
          for (var r = "", i = 0; i < n.parentElement.childElementCount; i++)
            r += '<td align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </td>');
          n.tagName === "TH" ? n.parentElement.parentElement.insertAdjacentHTML("afterend", "<tbody><tr>".concat(r, "</tr></tbody>")) : n.parentElement.insertAdjacentHTML("afterend", "<tr>".concat(r, "</tr>")), Q(e);
        }, gn = function(e, t, n) {
          for (var r = "", i = 0; i < n.parentElement.childElementCount; i++)
            n.tagName === "TH" ? r += '<th align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </th>') : r += '<td align="'.concat(n.parentElement.children[i].getAttribute("align"), '"> </td>');
          if (n.tagName === "TH") {
            n.parentElement.parentElement.insertAdjacentHTML("beforebegin", "<thead><tr>".concat(r, "</tr></thead>")), t.insertNode(document.createElement("wbr"));
            var a = n.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
            n.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", a), n.parentElement.parentElement.remove(), (0, M.ir)(e.ir.element, t);
          } else
            n.parentElement.insertAdjacentHTML("beforebegin", "<tr>".concat(r, "</tr>"));
          Q(e);
        }, _t = function(e, t, n, r) {
          r === void 0 && (r = "afterend");
          for (var i = 0, a = n.previousElementSibling; a; )
            i++, a = a.previousElementSibling;
          for (var o = 0; o < t.rows.length; o++)
            o === 0 ? t.rows[o].cells[i].insertAdjacentHTML(r, "<th> </th>") : t.rows[o].cells[i].insertAdjacentHTML(r, "<td> </td>");
          Q(e);
        }, yn = function(e, t, n) {
          if (n.tagName === "TD") {
            var r = n.parentElement.parentElement;
            n.parentElement.previousElementSibling ? t.selectNodeContents(n.parentElement.previousElementSibling.lastElementChild) : t.selectNodeContents(r.previousElementSibling.lastElementChild.lastElementChild), r.childElementCount === 1 ? r.remove() : n.parentElement.remove(), t.collapse(!1), (0, M.jl)(t), Q(e);
          }
        }, bn = function(e, t, n, r) {
          for (var i = 0, a = r.previousElementSibling; a; )
            i++, a = a.previousElementSibling;
          (r.previousElementSibling || r.nextElementSibling) && (t.selectNodeContents(r.previousElementSibling || r.nextElementSibling), t.collapse(!0));
          for (var o = 0; o < n.rows.length; o++) {
            var f = n.rows[o].cells;
            if (f.length === 1) {
              n.remove(), Qe(e);
              break;
            }
            f[i].remove();
          }
          (0, M.jl)(t), Q(e);
        }, wn = function(e, t, n) {
          var r = n.startContainer, i = (0, s._Y)(r, "TD") || (0, s._Y)(r, "TH");
          if (i) {
            if (!(0, l._0)(t) && !t.altKey && t.key === "Enter") {
              (!i.lastElementChild || i.lastElementChild && (!i.lastElementChild.isSameNode(i.lastChild) || i.lastElementChild.tagName !== "BR")) && i.insertAdjacentHTML("beforeend", "<br>");
              var a = document.createElement("br");
              return n.insertNode(a), n.setStartAfter(a), Q(e), ye(e), t.preventDefault(), !0;
            }
            if (t.key === "Tab") {
              if (t.shiftKey)
                return fn(i, n), t.preventDefault(), !0;
              var o = i.nextElementSibling;
              return o || (i.parentElement.nextElementSibling ? o = i.parentElement.nextElementSibling.firstElementChild : i.parentElement.parentElement.tagName === "THEAD" && i.parentElement.parentElement.nextElementSibling ? o = i.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild : o = null), o && (n.selectNodeContents(o), (0, M.jl)(n)), t.preventDefault(), !0;
            }
            var f = i.parentElement.parentElement.parentElement;
            if (t.key === "ArrowUp") {
              if (t.preventDefault(), i.tagName === "TH")
                return f.previousElementSibling ? (n.selectNodeContents(f.previousElementSibling), n.collapse(!1), (0, M.jl)(n)) : ct(e, "beforebegin"), !0;
              for (var h = 0, u = i.parentElement; h < u.cells.length && !u.cells[h].isSameNode(i); h++)
                ;
              var S = u.previousElementSibling;
              return S || (S = u.parentElement.previousElementSibling.firstChild), n.selectNodeContents(S.cells[h]), n.collapse(!1), (0, M.jl)(n), !0;
            }
            if (t.key === "ArrowDown") {
              t.preventDefault();
              var u = i.parentElement;
              if (!u.nextElementSibling && i.tagName === "TD")
                return f.nextElementSibling ? (n.selectNodeContents(f.nextElementSibling), n.collapse(!0), (0, M.jl)(n)) : ct(e, "afterend"), !0;
              for (var h = 0; h < u.cells.length && !u.cells[h].isSameNode(i); h++)
                ;
              var o = u.nextElementSibling;
              return o || (o = u.parentElement.nextElementSibling.firstChild), n.selectNodeContents(o.cells[h]), n.collapse(!0), (0, M.jl)(n), !0;
            }
            if (e.currentMode === "wysiwyg" && !(0, l._0)(t) && t.key === "Enter" && !t.shiftKey && t.altKey) {
              var k = e.wysiwyg.popover.querySelector(".vditor-input");
              return k.focus(), k.select(), t.preventDefault(), !0;
            }
            if (!(0, l._0)(t) && !t.shiftKey && !t.altKey && t.key === "Backspace" && n.startOffset === 0 && n.toString() === "") {
              var O = fn(i, n, !1);
              return !O && f && (f.textContent.trim() === "" ? (f.outerHTML = `<p data-block="0"><wbr>
</p>`, (0, M.ir)(e[e.currentMode].element, n)) : (n.setStartBefore(f), n.collapse(!0)), Q(e)), t.preventDefault(), !0;
            }
            if (R("⇧⌘F", t))
              return gn(e, n, i), t.preventDefault(), !0;
            if (R("⌘=", t))
              return mn(e, n, i), t.preventDefault(), !0;
            if (R("⇧⌘G", t))
              return _t(e, f, i, "beforebegin"), t.preventDefault(), !0;
            if (R("⇧⌘=", t))
              return _t(e, f, i), t.preventDefault(), !0;
            if (R("⌘-", t))
              return yn(e, n, i), t.preventDefault(), !0;
            if (R("⇧⌘-", t))
              return bn(e, n, f, i), t.preventDefault(), !0;
            if (R("⇧⌘L", t)) {
              if (e.currentMode === "ir")
                return Et(f, "left"), Q(e), t.preventDefault(), !0;
              var j = e.wysiwyg.popover.querySelector('[data-type="left"]');
              if (j)
                return j.click(), t.preventDefault(), !0;
            }
            if (R("⇧⌘C", t)) {
              if (e.currentMode === "ir")
                return Et(f, "center"), Q(e), t.preventDefault(), !0;
              var j = e.wysiwyg.popover.querySelector('[data-type="center"]');
              if (j)
                return j.click(), t.preventDefault(), !0;
            }
            if (R("⇧⌘R", t)) {
              if (e.currentMode === "ir")
                return Et(f, "right"), Q(e), t.preventDefault(), !0;
              var j = e.wysiwyg.popover.querySelector('[data-type="right"]');
              if (j)
                return j.click(), t.preventDefault(), !0;
            }
          }
          return !1;
        }, vn = function(e, t, n, r) {
          if (n.tagName === "PRE" && R("⌘A", t))
            return r.selectNodeContents(n.firstElementChild), t.preventDefault(), !0;
          if (e.options.tab && t.key === "Tab" && !t.shiftKey && r.toString() === "")
            return r.insertNode(document.createTextNode(e.options.tab)), r.collapse(!1), Q(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, l._0)(t) && !t.shiftKey && !t.altKey) {
            var i = (0, M.ED)(n, e[e.currentMode].element, r);
            if ((i.start === 0 || i.start === 1 && n.innerText === `
`) && r.toString() === "")
              return n.parentElement.outerHTML = '<p data-block="0"><wbr>'.concat(n.firstElementChild.innerHTML, "</p>"), (0, M.ir)(e[e.currentMode].element, r), Q(e), t.preventDefault(), !0;
          }
          return !(0, l._0)(t) && !t.altKey && t.key === "Enter" ? (n.firstElementChild.textContent.endsWith(`
`) || n.firstElementChild.insertAdjacentText("beforeend", `
`), r.extractContents(), r.insertNode(document.createTextNode(`
`)), r.collapse(!1), (0, M.jl)(r), (0, l.gm)() || (e.currentMode === "wysiwyg" ? wt(e, r) : Ye(e, r)), ye(e), t.preventDefault(), !0) : !1;
        }, En = function(e, t, n, r) {
          var i = t.startContainer, a = (0, s._Y)(i, "BLOCKQUOTE");
          if (a && t.toString() === "") {
            if (n.key === "Backspace" && !(0, l._0)(n) && !n.shiftKey && !n.altKey && (0, M.ED)(a, e[e.currentMode].element, t).start === 0)
              return t.insertNode(document.createElement("wbr")), a.outerHTML = a.innerHTML, (0, M.ir)(e[e.currentMode].element, t), Q(e), n.preventDefault(), !0;
            if (r && n.key === "Enter" && !(0, l._0)(n) && !n.shiftKey && !n.altKey && r.parentElement.tagName === "BLOCKQUOTE") {
              var o = !1;
              if (r.innerHTML.replace(v.Y.ZWSP, "") === `
` || r.innerHTML.replace(v.Y.ZWSP, "") === "" ? (o = !0, r.remove()) : r.innerHTML.endsWith(`

`) && (0, M.ED)(r, e[e.currentMode].element, t).start === r.textContent.length - 1 && (r.innerHTML = r.innerHTML.substr(0, r.innerHTML.length - 2), o = !0), o)
                return a.insertAdjacentHTML("afterend", '<p data-block="0">'.concat(v.Y.ZWSP, `<wbr>
</p>`)), (0, M.ir)(e[e.currentMode].element, t), Q(e), n.preventDefault(), !0;
            }
            var f = (0, s.pt)(i);
            if (e.currentMode === "wysiwyg" && f && R("⇧⌘;", n))
              return t.insertNode(document.createElement("wbr")), f.outerHTML = '<blockquote data-block="0">'.concat(f.outerHTML, "</blockquote>"), (0, M.ir)(e.wysiwyg.element, t), ce(e), n.preventDefault(), !0;
            if (ut(e, n, t, a, a) || et(e, n, t, a, a))
              return !0;
          }
          return !1;
        }, _n = function(e, t, n) {
          var r = t.startContainer, i = (0, s._Y)(r, "li");
          if (i && i.classList.contains("vditor-task")) {
            if (R("⇧⌘J", n)) {
              var a = i.firstElementChild;
              return a.checked ? a.removeAttribute("checked") : a.setAttribute("checked", "checked"), Q(e), n.preventDefault(), !0;
            }
            if (n.key === "Backspace" && !(0, l._0)(n) && !n.shiftKey && !n.altKey && t.toString() === "" && t.startOffset === 1 && (r.nodeType === 3 && r.previousSibling && r.previousSibling.tagName === "INPUT" || r.nodeType !== 3)) {
              var o = i.previousElementSibling;
              if (i.querySelector("input").remove(), o) {
                var f = (0, s.Rp)(o);
                f.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + i.innerHTML.trim()), i.remove();
              } else
                i.parentElement.insertAdjacentHTML("beforebegin", '<p data-block="0"><wbr>'.concat(i.innerHTML.trim() || `
`, "</p>")), i.nextElementSibling ? i.remove() : i.parentElement.remove();
              return (0, M.ir)(e[e.currentMode].element, t), Q(e), n.preventDefault(), !0;
            }
            if (n.key === "Enter" && !(0, l._0)(n) && !n.shiftKey && !n.altKey) {
              if (i.textContent.trim() === "")
                if ((0, s.KJ)(i.parentElement, "vditor-task")) {
                  var h = (0, s.KR)(r);
                  h && Ut(e, i, t, h);
                } else if (i.nextElementSibling) {
                  var u = "", S = "", k = !1;
                  Array.from(i.parentElement.children).forEach(function(K) {
                    i.isSameNode(K) ? k = !0 : k ? u += K.outerHTML : S += K.outerHTML;
                  });
                  var O = i.parentElement.tagName, j = i.parentElement.tagName === "OL" ? "" : ' data-marker="'.concat(i.parentElement.getAttribute("data-marker"), '"'), H = "";
                  S && (H = i.parentElement.tagName === "UL" ? "" : ' start="1"', S = "<".concat(O, ' data-tight="true"').concat(j, ' data-block="0">').concat(S, "</").concat(O, ">")), i.parentElement.outerHTML = "".concat(S, `<p data-block="0"><wbr>
</p><`).concat(O, `
 data-tight="true"`).concat(j, ' data-block="0"').concat(H, ">").concat(u, "</").concat(O, ">");
                } else
                  i.parentElement.insertAdjacentHTML("afterend", `<p data-block="0"><wbr>
</p>`), i.parentElement.querySelectorAll("li").length === 1 ? i.parentElement.remove() : i.remove();
              else
                r.nodeType !== 3 && t.startOffset === 0 && r.firstChild.tagName === "INPUT" ? t.setStart(r.childNodes[1], 1) : (t.setEndAfter(i.lastChild), i.insertAdjacentHTML("afterend", '<li class="vditor-task" data-marker="'.concat(i.getAttribute("data-marker"), '"><input type="checkbox"> <wbr></li>')), document.querySelector("wbr").after(t.extractContents()));
              return (0, M.ir)(e[e.currentMode].element, t), Q(e), ye(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, Sn = function(e, t, n, r) {
          if (t.startContainer.nodeType !== 3) {
            var i = t.startContainer.children[t.startOffset];
            if (i && i.tagName === "HR")
              return t.selectNodeContents(i.previousElementSibling), t.collapse(!1), n.preventDefault(), !0;
          }
          if (r) {
            var a = r.previousElementSibling;
            if (a && (0, M.ED)(r, e[e.currentMode].element, t).start === 0 && ((0, l.gm)() && a.tagName === "HR" || a.tagName === "TABLE")) {
              if (a.tagName === "TABLE") {
                var o = a.lastElementChild.lastElementChild.lastElementChild;
                o.innerHTML = o.innerHTML.trimLeft() + "<wbr>" + r.textContent.trim(), r.remove();
              } else
                a.remove();
              return (0, M.ir)(e[e.currentMode].element, t), Q(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, Tn = function(e) {
          (0, l.gm)() && e.startContainer.nodeType !== 3 && e.startContainer.tagName === "HR" && e.setStartBefore(e.startContainer);
        }, Cn = function(e, t, n) {
          var r, i;
          if (!(0, l.gm)())
            return !1;
          if (e.key === "ArrowUp" && t && ((r = t.previousElementSibling) === null || r === void 0 ? void 0 : r.tagName) === "TABLE") {
            var a = t.previousElementSibling;
            return n.selectNodeContents(a.rows[a.rows.length - 1].lastElementChild), n.collapse(!1), e.preventDefault(), !0;
          }
          return e.key === "ArrowDown" && t && ((i = t.nextElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "TABLE" ? (n.selectNodeContents(t.nextElementSibling.rows[0].cells[0]), n.collapse(!0), e.preventDefault(), !0) : !1;
        }, St = function(e, t, n) {
          return ar(void 0, void 0, void 0, function() {
            var r, i, a, o, f, h, u, S, k, O, j, H, K, N, B, N, J;
            return or(this, function(W) {
              switch (W.label) {
                case 0:
                  return e[e.currentMode].element.getAttribute("contenteditable") !== "true" ? [
                    2
                    /*return*/
                  ] : (t.stopPropagation(), t.preventDefault(), "clipboardData" in t ? (r = t.clipboardData.getData("text/html"), i = t.clipboardData.getData("text/plain"), a = t.clipboardData.files) : (r = t.dataTransfer.getData("text/html"), i = t.dataTransfer.getData("text/plain"), t.dataTransfer.types.includes("Files") && (a = t.dataTransfer.items)), o = {}, f = function(Z, ae) {
                    if (!ae)
                      return ["", Lute.WalkContinue];
                    if (e.options.upload.renderLinkDest)
                      return e.options.upload.renderLinkDest(e, Z, ae);
                    var re = Z.TokensStr();
                    if (Z.__internal_object__.Parent.Type === 34 && re && re.indexOf("file://") === -1 && e.options.upload.linkToImgUrl) {
                      var ue = new XMLHttpRequest();
                      ue.open("POST", e.options.upload.linkToImgUrl), e.options.upload.token && ue.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (ue.withCredentials = !0), sn(e, ue), ue.setRequestHeader("Content-Type", "application/json; charset=utf-8"), ue.onreadystatechange = function() {
                        if (ue.readyState === XMLHttpRequest.DONE) {
                          if (ue.status === 200) {
                            var Me = ue.responseText;
                            e.options.upload.linkToImgFormat && (Me = e.options.upload.linkToImgFormat(ue.responseText));
                            var Se = JSON.parse(Me);
                            if (Se.code !== 0) {
                              e.tip.show(Se.msg);
                              return;
                            }
                            var ke = Se.data.originalURL;
                            if (e.currentMode === "sv")
                              e.sv.element.querySelectorAll(".vditor-sv__marker--link").forEach(function(Le) {
                                Le.textContent === ke && (Le.textContent = Se.data.url);
                              });
                            else {
                              var te = e[e.currentMode].element.querySelector('img[src="'.concat(ke, '"]'));
                              te.src = Se.data.url, e.currentMode === "ir" && (te.previousElementSibling.previousElementSibling.innerHTML = Se.data.url);
                            }
                            Q(e);
                          } else
                            e.tip.show(ue.responseText);
                          e.options.upload.linkToImgCallback && e.options.upload.linkToImgCallback(ue.responseText);
                        }
                      }, ue.send(JSON.stringify({ url: re }));
                    }
                    return e.currentMode === "ir" ? ['<span class="vditor-ir__marker vditor-ir__marker--link">'.concat(Lute.EscapeHTMLStr(re), "</span>"), Lute.WalkContinue] : e.currentMode === "wysiwyg" ? ["", Lute.WalkContinue] : ['<span class="vditor-sv__marker--link">'.concat(Lute.EscapeHTMLStr(re), "</span>"), Lute.WalkContinue];
                  }, (r.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<a href="'.concat(i, '">').concat(i, "</a>") || r.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/ig, "").trim() === '<!--StartFragment--><a href="'.concat(i, '">').concat(i, "</a><!--EndFragment-->")) && (r = ""), h = new DOMParser().parseFromString(r, "text/html"), h.body && (r = h.body.innerHTML), r = Lute.Sanitize(r), e.wysiwyg.getComments(e), u = e[e.currentMode].element.scrollHeight, S = Te(r, i, e.currentMode), k = e.currentMode === "sv" ? (0, s.Th)(t.target, "data-type", "code-block") : (0, s._Y)(t.target, "CODE"), k ? (e.currentMode === "sv" ? document.execCommand("insertHTML", !1, i.replace(/&/g, "&amp;").replace(/</g, "&lt;")) : (O = (0, M.ED)(t.target, e[e.currentMode].element), k.parentElement.tagName !== "PRE" && (i += v.Y.ZWSP), k.textContent = k.textContent.substring(0, O.start) + i + k.textContent.substring(O.end), (0, M.Fm)(O.start + i.length, O.start + i.length, k.parentElement), !((J = k.parentElement) === null || J === void 0) && J.nextElementSibling.classList.contains("vditor-".concat(e.currentMode, "__preview")) && (k.parentElement.nextElementSibling.innerHTML = k.outerHTML, we(k.parentElement.nextElementSibling, e))), [3, 8]) : [3, 1]);
                case 1:
                  return S ? (n.pasteCode(S), [3, 8]) : [3, 2];
                case 2:
                  return r.trim() === "" ? [3, 3] : (j = document.createElement("div"), j.innerHTML = r, j.querySelectorAll("[style]").forEach(function(Z) {
                    Z.removeAttribute("style");
                  }), j.querySelectorAll(".vditor-copy").forEach(function(Z) {
                    Z.remove();
                  }), e.currentMode === "ir" ? (o.HTML2VditorIRDOM = { renderLinkDest: f }, e.lute.SetJSRenderers({ renderers: o }), (0, M.Z2)(e.lute.HTML2VditorIRDOM(j.innerHTML), e)) : e.currentMode === "wysiwyg" ? (o.HTML2VditorDOM = { renderLinkDest: f }, e.lute.SetJSRenderers({ renderers: o }), (0, M.Z2)(e.lute.HTML2VditorDOM(j.innerHTML), e)) : (o.Md2VditorSVDOM = { renderLinkDest: f }, e.lute.SetJSRenderers({ renderers: o }), Pt(e, e.lute.HTML2Md(j.innerHTML).trimRight())), e.outline.render(e), [3, 8]);
                case 3:
                  return a.length > 0 ? e.options.upload.url || e.options.upload.handler ? [4, Bt(e, a)] : [3, 5] : [3, 7];
                case 4:
                  return W.sent(), [3, 6];
                case 5:
                  H = new FileReader(), "clipboardData" in t ? (a = t.clipboardData.files, K = a[0]) : t.dataTransfer.types.includes("Files") && (a = t.dataTransfer.items, K = a[0].getAsFile()), K && K.type.startsWith("image") && (H.readAsDataURL(K), H.onload = function() {
                    var Z = "";
                    e.currentMode === "wysiwyg" ? Z += '<img alt="'.concat(K.name, '" src="').concat(H.result.toString(), `">
`) : Z += "![".concat(K.name, "](").concat(H.result.toString(), `)
`), document.execCommand("insertHTML", !1, Z);
                  }), W.label = 6;
                case 6:
                  return [3, 8];
                case 7:
                  i.trim() !== "" && a.length === 0 && (N = (0, M.RN)(e), N.toString() !== "" && e.lute.IsValidLinkDest(i) && (i = "[".concat(N.toString(), "](").concat(i, ")")), e.currentMode === "ir" ? (o.Md2VditorIRDOM = { renderLinkDest: f }, e.lute.SetJSRenderers({ renderers: o }), (0, M.Z2)(e.lute.Md2VditorIRDOM(i), e)) : e.currentMode === "wysiwyg" ? (o.Md2VditorDOM = { renderLinkDest: f }, e.lute.SetJSRenderers({ renderers: o }), (0, M.Z2)(e.lute.Md2VditorDOM(i), e)) : (o.Md2VditorSVDOM = { renderLinkDest: f }, e.lute.SetJSRenderers({ renderers: o }), Pt(e, i)), e.outline.render(e)), W.label = 8;
                case 8:
                  return e.currentMode !== "sv" && (B = (0, s.pt)((0, M.RN)(e).startContainer), B && (N = (0, M.RN)(e), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(Z) {
                    Z.remove();
                  }), N.insertNode(document.createElement("wbr")), e.currentMode === "wysiwyg" ? B.outerHTML = e.lute.SpinVditorDOM(B.outerHTML) : B.outerHTML = e.lute.SpinVditorIRDOM(B.outerHTML), (0, M.ir)(e[e.currentMode].element, N)), e[e.currentMode].element.querySelectorAll(".vditor-".concat(e.currentMode, "__preview[data-render='2']")).forEach(function(Z) {
                    we(Z, e);
                  })), e.wysiwyg.triggerRemoveComment(e), Q(e), e[e.currentMode].element.scrollHeight - u > Math.min(e[e.currentMode].element.clientHeight, window.innerHeight) / 2 && ye(e), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, Mn, kn = function(e) {
          var t, n;
          e.hint.render(e);
          var r = (0, M.RN)(e).startContainer, i = (0, s.Th)(r, "data-type", "code-block-info");
          if (i)
            if (i.textContent.replace(v.Y.ZWSP, "") === "" && e.hint.recentLanguage) {
              i.textContent = v.Y.ZWSP + e.hint.recentLanguage;
              var a = (0, M.RN)(e);
              a.selectNodeContents(i);
            } else {
              var o = [], f = i.textContent.substring(0, (0, M.ED)(i, e.ir.element).start).replace(v.Y.ZWSP, "");
              (e.options.preview.hljs.langs || v.Y.ALIAS_CODE_LANGUAGES.concat(((n = (t = window.hljs) === null || t === void 0 ? void 0 : t.listLanguages()) !== null && n !== void 0 ? n : []).sort())).forEach(function(h) {
                h.indexOf(f.toLowerCase()) > -1 && o.push({
                  html: h,
                  value: h
                });
              }), e.hint.genHTML(o, f, e);
            }
        }, Ve = function(e, t) {
          t === void 0 && (t = {
            enableAddUndoStack: !0,
            enableHint: !1,
            enableInput: !0
          }), t.enableHint && kn(e), clearTimeout(e.ir.processTimeoutId), e.ir.processTimeoutId = window.setTimeout(function() {
            if (!e.ir.composingLock) {
              var n = x(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, l.D)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, ft = function(e, t) {
          var n = (0, M.RN)(e), r = (0, s.pt)(n.startContainer) || n.startContainer;
          if (r) {
            var i = r.querySelector(".vditor-ir__marker--heading");
            i ? i.innerHTML = t : (r.insertAdjacentText("afterbegin", t), n.selectNodeContents(r), n.collapse(!1)), Ye(e, n.cloneRange()), at(e);
          }
        }, Tt = function(e, t, n) {
          var r = (0, s.Th)(e.startContainer, "data-type", n);
          if (r) {
            r.firstElementChild.remove(), r.lastElementChild.remove(), e.insertNode(document.createElement("wbr"));
            var i = document.createElement("div");
            i.innerHTML = t.lute.SpinVditorIRDOM(r.outerHTML), r.outerHTML = i.firstElementChild.innerHTML.trim();
          }
        }, cr = function(e, t, n, r) {
          var i = (0, M.RN)(e), a = t.getAttribute("data-type"), o = i.startContainer;
          o.nodeType === 3 && (o = o.parentElement);
          var f = !0;
          if (t.classList.contains("vditor-menu--current"))
            if (a === "quote") {
              var h = (0, s._Y)(o, "BLOCKQUOTE");
              h && (i.insertNode(document.createElement("wbr")), h.outerHTML = h.innerHTML.trim() === "" ? '<p data-block="0">'.concat(h.innerHTML, "</p>") : h.innerHTML);
            } else if (a === "link") {
              var u = (0, s.Th)(i.startContainer, "data-type", "a");
              if (u) {
                var S = (0, s.KJ)(i.startContainer, "vditor-ir__link");
                S ? (i.insertNode(document.createElement("wbr")), u.outerHTML = S.innerHTML) : u.outerHTML = u.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
              }
            } else
              a === "italic" ? Tt(i, e, "em") : a === "bold" ? Tt(i, e, "strong") : a === "strike" ? Tt(i, e, "s") : a === "inline-code" ? Tt(i, e, "code") : (a === "check" || a === "list" || a === "ordered-list") && (vt(e, i, a), f = !1, t.classList.remove("vditor-menu--current"));
          else {
            e.ir.element.childNodes.length === 0 && (e.ir.element.innerHTML = '<p data-block="0"><wbr></p>', (0, M.ir)(e.ir.element, i));
            var k = (0, s.pt)(i.startContainer);
            if (a === "line") {
              if (k) {
                var O = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                k.innerHTML.trim() === "" ? k.outerHTML = O : k.insertAdjacentHTML("afterend", O);
              }
            } else if (a === "quote")
              k && (i.insertNode(document.createElement("wbr")), k.outerHTML = '<blockquote data-block="0">'.concat(k.outerHTML, "</blockquote>"), f = !1, t.classList.add("vditor-menu--current"));
            else if (a === "link") {
              var j = void 0;
              i.toString() === "" ? j = "".concat(n, "<wbr>").concat(r) : j = "".concat(n).concat(i.toString()).concat(r.replace(")", "<wbr>)")), document.execCommand("insertHTML", !1, j), f = !1, t.classList.add("vditor-menu--current");
            } else if (a === "italic" || a === "bold" || a === "strike" || a === "inline-code" || a === "code" || a === "table") {
              var j = void 0;
              i.toString() === "" ? j = "".concat(n, "<wbr>").concat(r) : (a === "code" ? j = "".concat(n, `
`).concat(i.toString(), "<wbr>").concat(r) : a === "table" ? j = "".concat(n).concat(i.toString(), "<wbr>").concat(r) : j = "".concat(n).concat(i.toString()).concat(r, "<wbr>"), i.deleteContents()), (a === "table" || a === "code") && (j = `
` + j + `

`);
              var H = document.createElement("span");
              H.innerHTML = j, i.insertNode(H), Ye(e, i), a === "table" && (i.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement), (0, M.jl)(i));
            } else
              (a === "check" || a === "list" || a === "ordered-list") && (vt(e, i, a, !1), f = !1, g(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current"));
          }
          (0, M.ir)(e.ir.element, i), Ve(e), f && at(e);
        }, ur = function(e, t, n, r) {
          function i(a) {
            return a instanceof n ? a : new n(function(o) {
              o(a);
            });
          }
          return new (n || (n = Promise))(function(a, o) {
            function f(S) {
              try {
                u(r.next(S));
              } catch (k) {
                o(k);
              }
            }
            function h(S) {
              try {
                u(r.throw(S));
              } catch (k) {
                o(k);
              }
            }
            function u(S) {
              S.done ? a(S.value) : i(S.value).then(f, h);
            }
            u((r = r.apply(e, t || [])).next());
          });
        }, fr = function(e, t) {
          var n = { label: 0, sent: function() {
            if (a[0] & 1)
              throw a[1];
            return a[1];
          }, trys: [], ops: [] }, r, i, a, o;
          return o = { next: f(0), throw: f(1), return: f(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function f(u) {
            return function(S) {
              return h([u, S]);
            };
          }
          function h(u) {
            if (r)
              throw new TypeError("Generator is already executing.");
            for (; o && (o = 0, u[0] && (n = 0)), n; )
              try {
                if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done)
                  return a;
                switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
                  case 0:
                  case 1:
                    a = u;
                    break;
                  case 4:
                    return n.label++, { value: u[1], done: !1 };
                  case 5:
                    n.label++, i = u[1], u = [0];
                    continue;
                  case 7:
                    u = n.ops.pop(), n.trys.pop();
                    continue;
                  default:
                    if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
                      n = 0;
                      continue;
                    }
                    if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
                      n.label = u[1];
                      break;
                    }
                    if (u[0] === 6 && n.label < a[1]) {
                      n.label = a[1], a = u;
                      break;
                    }
                    if (a && n.label < a[2]) {
                      n.label = a[2], n.ops.push(u);
                      break;
                    }
                    a[2] && n.ops.pop(), n.trys.pop();
                    continue;
                }
                u = t.call(e, n);
              } catch (S) {
                u = [6, S], i = 0;
              } finally {
                r = a = 0;
              }
            if (u[0] & 5)
              throw u[1];
            return { value: u[0] ? u[1] : void 0, done: !0 };
          }
        }, dr = (
          /** @class */
          function() {
            function e(t) {
              var n = this;
              this.splitChar = "", this.lastIndex = -1, this.fillEmoji = function(r, i) {
                n.element.style.display = "none";
                var a = decodeURIComponent(r.getAttribute("data-value")), o = window.getSelection().getRangeAt(0);
                if (i.currentMode === "ir") {
                  var f = (0, s.Th)(o.startContainer, "data-type", "code-block-info");
                  if (f) {
                    f.textContent = v.Y.ZWSP + a.trimRight(), o.selectNodeContents(f), o.collapse(!1), Ve(i), f.parentElement.querySelectorAll("code").forEach(function(k) {
                      k.className = "language-" + a.trimRight();
                    }), we(f.parentElement.querySelector(".vditor-ir__preview"), i), n.recentLanguage = a.trimRight();
                    return;
                  }
                }
                if (i.currentMode === "wysiwyg" && o.startContainer.nodeType !== 3) {
                  var h = o.startContainer, u = void 0;
                  if (h.classList.contains("vditor-input") ? u = h : u = h.firstElementChild, u && u.classList.contains("vditor-input")) {
                    u.value = a.trimRight(), o.selectNodeContents(u), o.collapse(!1), u.dispatchEvent(new CustomEvent("input", { detail: 1 })), n.recentLanguage = a.trimRight();
                    return;
                  }
                }
                if (o.setStart(o.startContainer, n.lastIndex), o.deleteContents(), i.options.hint.parse ? i.currentMode === "sv" ? (0, M.Z2)(i.lute.SpinVditorSVDOM(a), i) : i.currentMode === "wysiwyg" ? (0, M.Z2)(i.lute.SpinVditorDOM(a), i) : (0, M.Z2)(i.lute.SpinVditorIRDOM(a), i) : (0, M.Z2)(a, i), n.splitChar === ":" && a.indexOf(":") > -1 && i.currentMode !== "sv" && o.insertNode(document.createTextNode(" ")), o.collapse(!1), (0, M.jl)(o), i.currentMode === "wysiwyg") {
                  var S = (0, s.KJ)(o.startContainer, "vditor-wysiwyg__block");
                  S && S.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (S.lastElementChild.innerHTML = S.firstElementChild.innerHTML, we(S.lastElementChild, i));
                } else if (i.currentMode === "ir") {
                  var S = (0, s.KJ)(o.startContainer, "vditor-ir__marker--pre");
                  S && S.nextElementSibling.classList.contains("vditor-ir__preview") && (S.nextElementSibling.innerHTML = S.innerHTML, we(S.nextElementSibling, i));
                }
                Q(i);
              }, this.timeId = -1, this.element = document.createElement("div"), this.element.className = "vditor-hint", this.recentLanguage = "", t.push({ key: ":" });
            }
            return e.prototype.render = function(t) {
              var n = this;
              if (window.getSelection().focusNode) {
                var r, i = getSelection().getRangeAt(0);
                r = i.startContainer.textContent.substring(0, i.startOffset) || "";
                var a = this.getKey(r, t.options.hint.extend);
                if (typeof a > "u")
                  this.element.style.display = "none", clearTimeout(this.timeId);
                else if (this.splitChar === ":") {
                  var o = a === "" ? t.options.hint.emoji : t.lute.GetEmojis(), f = [];
                  Object.keys(o).forEach(function(h) {
                    h.indexOf(a.toLowerCase()) === 0 && (o[h].indexOf(".") > -1 ? f.push({
                      html: '<img src="'.concat(o[h], '" title=":').concat(h, ':"/> :').concat(h, ":"),
                      value: ":".concat(h, ":")
                    }) : f.push({
                      html: '<span class="vditor-hint__emoji">'.concat(o[h], "</span>").concat(h),
                      value: o[h]
                    }));
                  }), this.genHTML(f, a, t);
                } else
                  t.options.hint.extend.forEach(function(h) {
                    h.key === n.splitChar && (clearTimeout(n.timeId), n.timeId = window.setTimeout(function() {
                      return ur(n, void 0, void 0, function() {
                        var u;
                        return fr(this, function(S) {
                          switch (S.label) {
                            case 0:
                              return u = this.genHTML, [4, h.hint(a)];
                            case 1:
                              return u.apply(this, [S.sent(), a, t]), [
                                2
                                /*return*/
                              ];
                          }
                        });
                      });
                    }, t.options.hint.delay));
                  });
              }
            }, e.prototype.genHTML = function(t, n, r) {
              var i = this;
              if (t.length === 0) {
                this.element.style.display = "none";
                return;
              }
              var a = r[r.currentMode].element, o = (0, M.Ey)(a), f = o.left + (r.options.outline.position === "left" ? r.outline.element.offsetWidth : 0), h = o.top, u = "";
              t.forEach(function(k, O) {
                if (!(O > 7)) {
                  var j = k.html;
                  if (n !== "") {
                    var H = j.lastIndexOf(">") + 1, K = j.substr(H), B = K.toLowerCase().indexOf(n.toLowerCase());
                    B > -1 && (K = K.substring(0, B) + "<b>" + K.substring(B, B + n.length) + "</b>" + K.substring(B + n.length), j = j.substr(0, H) + K);
                  }
                  u += '<button type="button" data-value="'.concat(encodeURIComponent(k.value), ` "
`).concat(O === 0 ? "class='vditor-hint--current'" : "", "> ").concat(j, "</button>");
                }
              }), this.element.innerHTML = u;
              var S = parseInt(document.defaultView.getComputedStyle(a, null).getPropertyValue("line-height"), 10);
              this.element.style.top = "".concat(h + (S || 22), "px"), this.element.style.left = "".concat(f, "px"), this.element.style.display = "block", this.element.style.right = "auto", this.element.querySelectorAll("button").forEach(function(k) {
                k.addEventListener("click", function(O) {
                  i.fillEmoji(k, r), O.preventDefault();
                });
              }), this.element.getBoundingClientRect().bottom > window.innerHeight && (this.element.style.top = "".concat(h - this.element.offsetHeight, "px")), this.element.getBoundingClientRect().right > window.innerWidth && (this.element.style.left = "auto", this.element.style.right = "0");
            }, e.prototype.select = function(t, n) {
              if (this.element.querySelectorAll("button").length === 0 || this.element.style.display === "none")
                return !1;
              var r = this.element.querySelector(".vditor-hint--current");
              if (t.key === "ArrowDown")
                return t.preventDefault(), t.stopPropagation(), r.removeAttribute("class"), r.nextElementSibling ? r.nextElementSibling.className = "vditor-hint--current" : this.element.children[0].className = "vditor-hint--current", !0;
              if (t.key === "ArrowUp") {
                if (t.preventDefault(), t.stopPropagation(), r.removeAttribute("class"), r.previousElementSibling)
                  r.previousElementSibling.className = "vditor-hint--current";
                else {
                  var i = this.element.children.length;
                  this.element.children[i - 1].className = "vditor-hint--current";
                }
                return !0;
              } else if (!(0, l._0)(t) && !t.shiftKey && !t.altKey && t.key === "Enter" && !t.isComposing)
                return t.preventDefault(), t.stopPropagation(), this.fillEmoji(r, n), !0;
              return !1;
            }, e.prototype.getKey = function(t, n) {
              var r = this;
              this.lastIndex = -1, this.splitChar = "", n.forEach(function(u) {
                var S = t.lastIndexOf(u.key);
                r.lastIndex < S && (r.splitChar = u.key, r.lastIndex = S);
              });
              var i;
              if (this.lastIndex === -1)
                return i;
              var a = t.split(this.splitChar), o = a[a.length - 1], f = 32;
              if (a.length > 1 && o.trim() === o)
                if (a.length === 2 && a[0] === "" && a[1].length < f)
                  i = a[1];
                else {
                  var h = a[a.length - 2].slice(-1);
                  (0, T.p)(h) === " " && o.length < f && (i = o);
                }
              return i;
            }, e;
          }()
        ), pr = (
          /** @class */
          function() {
            function e(t) {
              this.composingLock = !1;
              var n = document.createElement("div");
              n.className = "vditor-ir", n.innerHTML = '<pre class="vditor-reset" placeholder="'.concat(t.options.placeholder, `"
 contenteditable="true" spellcheck="false"></pre>`), this.element = n.firstElementChild, this.bindEvent(t), Dt(t, this.element), nn(t, this.element), Ot(t, this.element), jt(t, this.element), It(t, this.element), Ht(t, this.element), Nt(t, this.element, this.copy), Rt(t, this.element, this.copy);
            }
            return e.prototype.copy = function(t, n) {
              var r = getSelection().getRangeAt(0);
              if (r.toString() !== "") {
                t.stopPropagation(), t.preventDefault();
                var i = document.createElement("div");
                i.appendChild(r.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorIRDOM2Md(i.innerHTML).trim()), t.clipboardData.setData("text/html", "");
              }
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("paste", function(r) {
                St(t, r, {
                  pasteCode: function(i) {
                    document.execCommand("insertHTML", !1, i);
                  }
                });
              }), this.element.addEventListener("scroll", function() {
                y(t, ["hint"]);
              }), this.element.addEventListener("compositionstart", function(r) {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                (0, l.gm)() || Ye(t, getSelection().getRangeAt(0).cloneRange()), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop")) {
                  if (n.preventInput) {
                    n.preventInput = !1, Ve(t, {
                      enableAddUndoStack: !0,
                      enableHint: !0,
                      enableInput: !0
                    });
                    return;
                  }
                  n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《" || Ye(t, getSelection().getRangeAt(0).cloneRange(), !1, r);
                }
              }), this.element.addEventListener("click", function(r) {
                if (r.target.tagName === "INPUT") {
                  r.target.checked ? r.target.setAttribute("checked", "checked") : r.target.removeAttribute("checked"), n.preventInput = !0, Ve(t);
                  return;
                }
                var i = (0, M.RN)(t), a = (0, s.KJ)(r.target, "vditor-ir__preview");
                if (a || (a = (0, s.KJ)(i.startContainer, "vditor-ir__preview")), a && (a.previousElementSibling.firstElementChild ? i.selectNodeContents(a.previousElementSibling.firstElementChild) : i.selectNodeContents(a.previousElementSibling), i.collapse(!0), (0, M.jl)(i), ye(t)), r.target.tagName === "IMG") {
                  var o = r.target.parentElement.querySelector(".vditor-ir__marker--link");
                  o && (i.selectNode(o), (0, M.jl)(i));
                }
                var f = (0, s.Th)(r.target, "data-type", "a");
                if (f && !f.classList.contains("vditor-ir__node--expand")) {
                  t.options.link.click ? t.options.link.click(f.querySelector(":scope > .vditor-ir__marker--link")) : t.options.link.isOpen && window.open(f.querySelector(":scope > .vditor-ir__marker--link").textContent);
                  return;
                }
                if (r.target.isEqualNode(n.element) && n.element.lastElementChild && i.collapsed) {
                  var h = n.element.lastElementChild.getBoundingClientRect();
                  r.y > h.top + h.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(v.Y.ZWSP, "") === "" ? (i.selectNodeContents(n.element.lastElementChild), i.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", '<p data-block="0">'.concat(v.Y.ZWSP, "<wbr></p>")), (0, M.ir)(n.element, i)));
                }
                i.toString() === "" ? P(i, t) : setTimeout(function() {
                  P((0, M.RN)(t), t);
                }), ht(r, t), at(t);
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l._0)(r))) {
                  if (r.key === "Enter" && ye(t), at(t), (r.key === "Backspace" || r.key === "Delete") && t.ir.element.innerHTML !== "" && t.ir.element.childNodes.length === 1 && t.ir.element.firstElementChild && t.ir.element.firstElementChild.tagName === "P" && t.ir.element.firstElementChild.childElementCount === 0 && (t.ir.element.textContent === "" || t.ir.element.textContent === `
`)) {
                    t.ir.element.innerHTML = "";
                    return;
                  }
                  var i = (0, M.RN)(t);
                  r.key === "Backspace" ? ((0, l.gm)() && i.startContainer.textContent === `
` && i.startOffset === 1 && (i.startContainer.textContent = "", P(i, t)), n.element.querySelectorAll(".language-math").forEach(function(o) {
                    var f = o.querySelector("br");
                    f && f.remove();
                  })) : r.key.indexOf("Arrow") > -1 ? ((r.key === "ArrowLeft" || r.key === "ArrowRight") && kn(t), P(i, t)) : r.keyCode === 229 && r.code === "" && r.key === "Unidentified" && P(i, t);
                  var a = (0, s.KJ)(i.startContainer, "vditor-ir__preview");
                  if (a) {
                    if (r.key === "ArrowUp" || r.key === "ArrowLeft")
                      return a.previousElementSibling.firstElementChild ? i.selectNodeContents(a.previousElementSibling.firstElementChild) : i.selectNodeContents(a.previousElementSibling), i.collapse(!1), r.preventDefault(), !0;
                    if (a.tagName === "SPAN" && (r.key === "ArrowDown" || r.key === "ArrowRight"))
                      return a.parentElement.getAttribute("data-type") === "html-entity" ? (a.parentElement.insertAdjacentText("afterend", v.Y.ZWSP), i.setStart(a.parentElement.nextSibling, 1)) : i.selectNodeContents(a.parentElement.lastElementChild), i.collapse(!1), r.preventDefault(), !0;
                  }
                }
              });
            }, e;
          }()
        ), Ln = function(e) {
          if (e.currentMode === "sv")
            return e.lute.Md2HTML(x(e));
          if (e.currentMode === "wysiwyg")
            return e.lute.VditorDOM2HTML(e.wysiwyg.element.innerHTML);
          if (e.currentMode === "ir")
            return e.lute.VditorIRDOM2HTML(e.ir.element.innerHTML);
        }, hr = X(796), An = X(70), mr = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("div"), this.element.className = "vditor-outline", this.element.innerHTML = '<div class="vditor-outline__title">'.concat(t, `</div>
<div class="vditor-outline__content"></div>`);
            }
            return e.prototype.render = function(t) {
              var n = "";
              return t.preview.element.style.display === "block" ? n = (0, An.N)(t.preview.previewElement, this.element.lastElementChild, t) : n = (0, An.N)(t[t.currentMode].element, this.element.lastElementChild, t), n;
            }, e.prototype.toggle = function(t, n, r) {
              var i;
              n === void 0 && (n = !0), r === void 0 && (r = !0);
              var a = (i = t.toolbar.elements.outline) === null || i === void 0 ? void 0 : i.firstElementChild;
              if (n && window.innerWidth >= v.Y.MOBILE_WIDTH ? (this.element.style.display = "block", this.render(t), a == null || a.classList.add("vditor-menu--current")) : (this.element.style.display = "none", a == null || a.classList.remove("vditor-menu--current")), r && getSelection().rangeCount > 0) {
                var o = getSelection().getRangeAt(0);
                t[t.currentMode].element.contains(o.startContainer) && (0, M.jl)(o);
              }
              He(t);
            }, e;
          }()
        ), gr = X(0), yr = (
          /** @class */
          function() {
            function e(t) {
              var n = this;
              this.element = document.createElement("div"), this.element.className = "vditor-preview", this.previewElement = document.createElement("div"), this.previewElement.className = "vditor-reset", t.options.classes.preview && this.previewElement.classList.add(t.options.classes.preview), this.previewElement.style.maxWidth = t.options.preview.maxWidth + "px", this.previewElement.addEventListener("copy", function(h) {
                if (h.target.tagName !== "TEXTAREA") {
                  var u = document.createElement("div");
                  u.className = "vditor-reset", u.appendChild(getSelection().getRangeAt(0).cloneContents()), n.copyToX(t, u, "default"), h.preventDefault();
                }
              }), this.previewElement.addEventListener("click", function(h) {
                var u = (0, s._Y)(h.target, "SPAN");
                if (u && (0, s.KJ)(u, "vditor-toc")) {
                  var S = n.previewElement.querySelector("#" + u.getAttribute("data-target-id"));
                  S && (n.element.scrollTop = S.offsetTop);
                  return;
                }
                if (h.target.tagName === "A") {
                  t.options.link.click ? t.options.link.click(h.target) : t.options.link.isOpen && window.open(h.target.getAttribute("href")), h.preventDefault();
                  return;
                }
                h.target.tagName === "IMG" && (t.options.image.preview ? t.options.image.preview(h.target) : t.options.image.isPreview && (0, q.o)(h.target, t.options.lang, t.options.theme));
              }), this.element.appendChild(this.previewElement);
              var r = t.options.preview.actions;
              if (r.length !== 0) {
                var i = document.createElement("div");
                i.className = "vditor-preview__action";
                for (var a = [], o = 0; o < r.length; o++) {
                  var f = r[o];
                  if (typeof f == "object") {
                    a.push('<button type="button" data-type="'.concat(f.key, '" class="').concat(f.className, '"').concat(f.tooltip ? ' aria-label="'.concat(f.tooltip, '"') : "", '">').concat(f.text, "</button>"));
                    continue;
                  }
                  switch (f) {
                    case "desktop":
                      a.push('<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>');
                      break;
                    case "tablet":
                      a.push('<button type="button" data-type="tablet">Tablet</button>');
                      break;
                    case "mobile":
                      a.push('<button type="button" data-type="mobile">Mobile/Wechat</button>');
                      break;
                    case "mp-wechat":
                      a.push('<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到公众号"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>');
                      break;
                    case "zhihu":
                      a.push('<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到知乎"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>');
                      break;
                  }
                }
                i.innerHTML = a.join(""), i.addEventListener((0, l.y3)(), function(h) {
                  var u = (0, E.f)(h.target, "BUTTON");
                  if (u) {
                    var S = u.getAttribute("data-type"), k = r.find(function(O) {
                      return (O == null ? void 0 : O.key) === S;
                    });
                    if (k) {
                      k.click(S);
                      return;
                    }
                    if (S === "mp-wechat" || S === "zhihu") {
                      n.copyToX(t, n.previewElement.cloneNode(!0), S);
                      return;
                    }
                    S === "desktop" ? n.previewElement.style.width = "auto" : S === "tablet" ? n.previewElement.style.width = "780px" : n.previewElement.style.width = "360px", n.previewElement.scrollWidth > n.previewElement.parentElement.clientWidth && (n.previewElement.style.width = "auto"), n.render(t), i.querySelectorAll("button").forEach(function(O) {
                      O.classList.remove("vditor-preview__action--current");
                    }), u.classList.add("vditor-preview__action--current");
                  }
                }), this.element.insertBefore(i, this.previewElement);
              }
            }
            return e.prototype.render = function(t, n) {
              var r = this;
              if (clearTimeout(this.mdTimeoutId), this.element.style.display === "none") {
                this.element.getAttribute("data-type") === "renderPerformance" && t.tip.hide();
                return;
              }
              if (n) {
                this.previewElement.innerHTML = n;
                return;
              }
              if (x(t).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "") {
                this.previewElement.innerHTML = "";
                return;
              }
              var i = new Date().getTime(), a = x(t);
              this.mdTimeoutId = window.setTimeout(function() {
                if (t.options.preview.url) {
                  var o = new XMLHttpRequest();
                  o.open("POST", t.options.preview.url), o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), o.onreadystatechange = function() {
                    if (o.readyState === XMLHttpRequest.DONE)
                      if (o.status === 200) {
                        var h = JSON.parse(o.responseText);
                        if (h.code !== 0) {
                          t.tip.show(h.msg);
                          return;
                        }
                        t.options.preview.transform && (h.data = t.options.preview.transform(h.data)), r.previewElement.innerHTML = h.data, r.afterRender(t, i);
                      } else {
                        var u = t.lute.Md2HTML(a);
                        t.options.preview.transform && (u = t.options.preview.transform(u)), r.previewElement.innerHTML = u, r.afterRender(t, i);
                      }
                  }, o.send(JSON.stringify({ markdownText: a }));
                } else {
                  var f = t.lute.Md2HTML(a);
                  t.options.preview.transform && (f = t.options.preview.transform(f)), r.previewElement.innerHTML = f, r.afterRender(t, i);
                }
              }, t.options.preview.delay);
            }, e.prototype.afterRender = function(t, n) {
              t.options.preview.parse && t.options.preview.parse(this.element);
              var r = new Date().getTime() - n;
              new Date().getTime() - n > 2600 ? (t.tip.show(window.VditorI18n.performanceTip.replace("${x}", r.toString())), t.preview.element.setAttribute("data-type", "renderPerformance")) : t.preview.element.getAttribute("data-type") === "renderPerformance" && (t.tip.hide(), t.preview.element.removeAttribute("data-type"));
              var i = t.preview.element.querySelector(".vditor-comment--focus");
              i && i.classList.remove("vditor-comment--focus"), (0, I.o)(t.preview.previewElement, t.options.preview.hljs), (0, $.$)(t.options.preview.hljs, t.preview.previewElement, t.options.cdn), (0, se.e)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, me.K)(t.preview.previewElement, t.options.cdn), (0, be.Y)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, V.D)(t.preview.previewElement, t.options.cdn), (0, F.m)(t.preview.previewElement, t.options.cdn), (0, C.v)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, fe.l)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, le.M)(t.preview.previewElement, t.options.cdn), (0, D.$)(t.preview.previewElement, t.options.cdn), t.options.preview.render.media.enable && (0, gr.l)(t.preview.previewElement), t.options.customRenders.forEach(function(f) {
                f.render(t.preview.previewElement, t);
              });
              var a = t.preview.element, o = t.outline.render(t);
              o === "" && (o = "[ToC]"), a.querySelectorAll('[data-type="toc-block"]').forEach(function(f) {
                f.innerHTML = o, (0, ee.T)(f, {
                  cdn: t.options.cdn,
                  math: t.options.preview.math
                });
              }), (0, ee.T)(t.preview.previewElement, {
                cdn: t.options.cdn,
                math: t.options.preview.math
              });
            }, e.prototype.copyToX = function(t, n, r) {
              r === void 0 && (r = "mp-wechat"), r !== "zhihu" ? n.querySelectorAll(".katex-html .base").forEach(function(a) {
                a.style.display = "initial";
              }) : n.querySelectorAll(".language-math").forEach(function(a) {
                a.outerHTML = '<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="'.concat(a.getAttribute("data-math"), '\\" style="display: block; margin: 0 auto; max-width: 100%;">');
              }), n.style.backgroundColor = "#fff", n.querySelectorAll("code").forEach(function(a) {
                a.style.backgroundImage = "none";
              }), this.element.append(n);
              var i = n.ownerDocument.createRange();
              i.selectNode(n), (0, M.jl)(i), document.execCommand("copy"), n.remove(), t.tip.show(["zhihu", "mp-wechat"].includes(r) ? "已复制，可到".concat(r === "zhihu" ? "知乎" : "微信公众号平台", "进行粘贴") : "已复制到剪切板");
            }, e;
          }()
        ), br = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("div"), this.element.className = "vditor-resize vditor-resize--".concat(t.options.resize.position), this.element.innerHTML = '<div><svg><use xlink:href="#vditor-icon-resize"></use></svg></div>', this.bindEvent(t);
            }
            return e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("mousedown", function(r) {
                var i = document, a = r.clientY, o = t.element.offsetHeight, f = 63 + t.element.querySelector(".vditor-toolbar").clientHeight;
                i.ondragstart = function() {
                  return !1;
                }, window.captureEvents && window.captureEvents(), n.element.classList.add("vditor-resize--selected"), i.onmousemove = function(h) {
                  t.options.resize.position === "top" ? t.element.style.height = Math.max(f, o + (a - h.clientY)) + "px" : t.element.style.height = Math.max(f, o + (h.clientY - a)) + "px", t.options.typewriterMode && (t.sv.element.style.paddingBottom = t.sv.element.parentElement.offsetHeight / 2 + "px");
                }, i.onmouseup = function() {
                  t.options.resize.after && t.options.resize.after(t.element.offsetHeight - o), window.captureEvents && window.captureEvents(), i.onmousemove = null, i.onmouseup = null, i.ondragstart = null, i.onselectstart = null, i.onselect = null, n.element.classList.remove("vditor-resize--selected");
                };
              });
            }, e;
          }()
        ), wr = (
          /** @class */
          function() {
            function e(t) {
              this.composingLock = !1, this.element = document.createElement("pre"), this.element.className = "vditor-sv vditor-reset", this.element.setAttribute("placeholder", t.options.placeholder), this.element.setAttribute("contenteditable", "true"), this.element.setAttribute("spellcheck", "false"), this.bindEvent(t), Dt(t, this.element), Ot(t, this.element), jt(t, this.element), It(t, this.element), Ht(t, this.element), Nt(t, this.element, this.copy), Rt(t, this.element, this.copy);
            }
            return e.prototype.copy = function(t, n) {
              t.stopPropagation(), t.preventDefault(), t.clipboardData.setData("text/plain", lt(n[n.currentMode].element));
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.element.addEventListener("paste", function(r) {
                St(t, r, {
                  pasteCode: function(i) {
                    document.execCommand("insertHTML", !1, i);
                  }
                });
              }), this.element.addEventListener("scroll", function() {
                if (t.preview.element.style.display === "block") {
                  var r = n.element.scrollTop, i = n.element.clientHeight, a = n.element.scrollHeight - parseFloat(n.element.style.paddingBottom || "0"), o = t.preview.element;
                  r / i > 0.5 ? o.scrollTop = (r + i) * o.scrollHeight / a - i : o.scrollTop = r * o.scrollHeight / a;
                }
              }), this.element.addEventListener("compositionstart", function(r) {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                (0, l.gm)() || oe(t, r), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop") && !(n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《")) {
                  if (n.preventInput) {
                    n.preventInput = !1, ve(t, {
                      enableAddUndoStack: !0,
                      enableHint: !0,
                      enableInput: !0
                    });
                    return;
                  }
                  oe(t, r);
                }
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l._0)(r))) {
                  if ((r.key === "Backspace" || r.key === "Delete") && t.sv.element.innerHTML !== "" && t.sv.element.childNodes.length === 1 && t.sv.element.firstElementChild && t.sv.element.firstElementChild.tagName === "DIV" && t.sv.element.firstElementChild.childElementCount === 2 && (t.sv.element.firstElementChild.textContent === "" || t.sv.element.textContent === `
`)) {
                    t.sv.element.innerHTML = "";
                    return;
                  }
                  r.key === "Enter" && ye(t);
                }
              });
            }, e;
          }()
        ), xn = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-tip";
            }
            return e.prototype.show = function(t, n) {
              var r = this;
              n === void 0 && (n = 6e3), this.element.className = "vditor-tip vditor-tip--show", n === 0 ? (this.element.innerHTML = '<div class="vditor-tip__content">'.concat(t, `
<div class="vditor-tip__close">X</div></div>`), this.element.querySelector(".vditor-tip__close").addEventListener("click", function() {
                r.hide();
              })) : (this.element.innerHTML = '<div class="vditor-tip__content">'.concat(t, "</div>"), setTimeout(function() {
                r.hide();
              }, n)), this.element.removeAttribute("style"), setTimeout(function() {
                var i = r.element.getBoundingClientRect();
                i.top < 46 && (r.element.style.position = "fixed", r.element.style.top = "46px");
              }, 150);
            }, e.prototype.hide = function() {
              this.element.className = "vditor-messageElementtip", this.element.innerHTML = "";
            }, e;
          }()
        ), Wt = function(e, t) {
          if (t.options.preview.mode !== e) {
            switch (t.options.preview.mode = e, e) {
              case "both":
                t.sv.element.style.display = "block", t.preview.element.style.display = "block", t.preview.render(t), p(t.toolbar.elements, ["both"]);
                break;
              case "editor":
                t.sv.element.style.display = "block", t.preview.element.style.display = "none", g(t.toolbar.elements, ["both"]);
                break;
              default:
                break;
            }
            t.devtools && t.devtools.renderEchart(t);
          }
        }, vr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Er = (
          /** @class */
          function(e) {
            vr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return n.options.preview.mode === "both" && i.element.children[0].classList.add("vditor-menu--current"), i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                var o = i.element.firstElementChild;
                o.classList.contains(v.Y.CLASS_MENU_DISABLED) || (a.preventDefault(), n.currentMode === "sv" && (n.options.preview.mode === "both" ? Wt("editor", n) : Wt("both", n)));
              }), i;
            }
            return t;
          }(he)
        ), _r = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-toolbar__br";
            }
            return e;
          }()
        ), Dn = X(13), Sr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Tr = (
          /** @class */
          function(e) {
            Sr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow");
              var f = "";
              return v.Y.CODE_THEME.forEach(function(h) {
                f += "<button>".concat(h, "</button>");
              }), o.innerHTML = '<div style="overflow: auto;max-height:'.concat(window.innerHeight / 2, 'px">').concat(f, "</div>"), o.addEventListener((0, l.y3)(), function(h) {
                h.target.tagName === "BUTTON" && (y(n, ["subToolbar"]), n.options.preview.hljs.style = h.target.textContent, (0, Dn.h)(h.target.textContent, n.options.cdn), h.preventDefault(), h.stopPropagation());
              }), i.element.appendChild(o), b(n, o, a, r.level), i;
            }
            return t;
          }(he)
        ), Cr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Mr = (
          /** @class */
          function(e) {
            Cr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow");
              var f = "";
              return Object.keys(n.options.preview.theme.list).forEach(function(h) {
                f += '<button data-type="'.concat(h, '">').concat(n.options.preview.theme.list[h], "</button>");
              }), o.innerHTML = '<div style="overflow: auto;max-height:'.concat(window.innerHeight / 2, 'px">').concat(f, "</div>"), o.addEventListener((0, l.y3)(), function(h) {
                h.target.tagName === "BUTTON" && (y(n, ["subToolbar"]), n.options.preview.theme.current = h.target.getAttribute("data-type"), (0, G.H)(n.options.preview.theme.current, n.options.preview.theme.path), h.preventDefault(), h.stopPropagation());
              }), i.element.appendChild(o), b(n, o, a, r.level), i;
            }
            return t;
          }(he)
        ), kr = (
          /** @class */
          function() {
            function e(t) {
              this.element = document.createElement("span"), this.element.className = "vditor-counter vditor-tooltipped vditor-tooltipped__nw", this.render(t, "");
            }
            return e.prototype.render = function(t, n) {
              var r = n.endsWith(`
`) ? n.length - 1 : n.length;
              if (t.options.counter.type === "text" && t[t.currentMode]) {
                var i = t[t.currentMode].element.cloneNode(!0);
                i.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(a) {
                  a.remove();
                }), r = i.textContent.length;
              }
              typeof t.options.counter.max == "number" ? (r > t.options.counter.max ? this.element.className = "vditor-counter vditor-counter--error" : this.element.className = "vditor-counter", this.element.innerHTML = "".concat(r, "/").concat(t.options.counter.max)) : this.element.innerHTML = "".concat(r), this.element.setAttribute("aria-label", t.options.counter.type), t.options.counter.after && t.options.counter.after(r, {
                enable: t.options.counter.enable,
                max: t.options.counter.max,
                type: t.options.counter.type
              });
            }, e;
          }()
        ), Lr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Ar = (
          /** @class */
          function(e) {
            Lr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].innerHTML = r.icon, i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), !a.currentTarget.classList.contains(v.Y.CLASS_MENU_DISABLED) && r.click(a, n);
              }), i;
            }
            return t;
          }(he)
        ), xr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Dr = (
          /** @class */
          function(e) {
            xr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.firstElementChild.addEventListener((0, l.y3)(), function(a) {
                var o = i.element.firstElementChild;
                o.classList.contains(v.Y.CLASS_MENU_DISABLED) || (a.preventDefault(), o.classList.contains("vditor-menu--current") ? (o.classList.remove("vditor-menu--current"), n.devtools.element.style.display = "none", He(n)) : (o.classList.add("vditor-menu--current"), n.devtools.element.style.display = "block", He(n), n.devtools.renderEchart(n)));
              }), i;
            }
            return t;
          }(he)
        ), Or = (
          /** @class */
          function() {
            function e() {
              this.element = document.createElement("div"), this.element.className = "vditor-toolbar__divider";
            }
            return e;
          }()
        ), Hr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Nr = (
          /** @class */
          function(e) {
            Hr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              a.className = "vditor-panel vditor-panel--arrow";
              var o = "";
              return Object.keys(n.options.hint.emoji).forEach(function(f) {
                var h = n.options.hint.emoji[f];
                h.indexOf(".") > -1 ? o += '<button data-value=":'.concat(f, ': " data-key=":').concat(f, `:"><img
data-value=":`).concat(f, ': " data-key=":').concat(f, ':" class="vditor-emojis__icon" src="').concat(h, '"/></button>') : o += '<button data-value="'.concat(h, ` "
 data-key="`).concat(f, '"><span class="vditor-emojis__icon">').concat(h, "</span></button>");
              }), a.innerHTML = '<div class="vditor-emojis" style="max-height: '.concat(n.options.height === "auto" ? "auto" : n.options.height - 80, 'px">').concat(o, `</div><div class="vditor-emojis__tail">
    <span class="vditor-emojis__tip"></span><span>`).concat(n.options.hint.emojiTail || "", `</span>
</div>`), i.element.appendChild(a), b(n, a, i.element.firstElementChild, r.level), i.bindEvent(n), i;
            }
            return t.prototype.bindEvent = function(n) {
              var r = this;
              this.element.lastElementChild.addEventListener((0, l.y3)(), function(i) {
                var a = (0, E.f)(i.target, "BUTTON");
                if (a) {
                  i.preventDefault();
                  var o = a.getAttribute("data-value"), f = (0, M.RN)(n), h = o;
                  if (n.currentMode === "wysiwyg" ? h = n.lute.SpinVditorDOM(o) : n.currentMode === "ir" && (h = n.lute.SpinVditorIRDOM(o)), o.indexOf(":") > -1 && n.currentMode !== "sv") {
                    var u = document.createElement("div");
                    u.innerHTML = h, h = u.firstElementChild.firstElementChild.outerHTML + " ", (0, M.Z2)(h, n);
                  } else
                    f.extractContents(), f.insertNode(document.createTextNode(o)), (0, s.pt)(f.startContainer) || Lt(n, f);
                  f.collapse(!1), (0, M.jl)(f), r.element.lastElementChild.style.display = "none", Q(n);
                }
              }), this.element.lastElementChild.addEventListener("mouseover", function(i) {
                var a = (0, E.f)(i.target, "BUTTON");
                a && (r.element.querySelector(".vditor-emojis__tip").innerHTML = a.getAttribute("data-key"));
              });
            }, t;
          }(he)
        ), On = function(e, t, n) {
          var r = document.createElement("a");
          "download" in r ? (r.download = n, r.style.display = "none", r.href = URL.createObjectURL(new Blob([t])), document.body.appendChild(r), r.click(), r.remove()) : e.tip.show(window.VditorI18n.downloadTip, 0);
        }, Rr = function(e) {
          var t = x(e);
          On(e, t, t.substr(0, 10) + ".md");
        }, jr = function(e) {
          e.tip.show(window.VditorI18n.generate, 3800);
          var t = document.querySelector("#vditorExportIframe");
          t.contentDocument.open(), t.contentDocument.write('<link rel="stylesheet" href="'.concat(e.options.cdn, `/dist/index.css"/>
<script src="`).concat(e.options.cdn, `/dist/method.min.js"><\/script>
<div id="preview" style="width: 800px"></div>
<script>
window.addEventListener("message", (e) => {
  if(!e.data) {
    return;
  }
  Vditor.preview(document.getElementById('preview'), e.data, {
    cdn: "`).concat(e.options.cdn, `",
    markdown: {
      theme: `).concat(JSON.stringify(e.options.preview.theme), `
    },
    hljs: {
      style: "`).concat(e.options.preview.hljs.style, `"
    }
  });
  setTimeout(() => {
        window.print();
    }, 3600);
}, false);
<\/script>`)), t.contentDocument.close(), setTimeout(function() {
            t.contentWindow.postMessage(x(e), "*");
          }, 200);
        }, Ir = function(e) {
          var t = Ln(e), n = '<html><head><link rel="stylesheet" type="text/css" href="'.concat(e.options.cdn, `/dist/index.css"/>
<script src="`).concat(e.options.cdn, "/dist/js/i18n/").concat(e.options.lang, `.js"><\/script>
<script src="`).concat(e.options.cdn, `/dist/method.min.js"><\/script></head>
<body><div class="vditor-reset" id="preview">`).concat(t, `</div>
<script>
    const previewElement = document.getElementById('preview')
    Vditor.setContentTheme('`).concat(e.options.preview.theme.current, "', '").concat(e.options.preview.theme.path, `');
    Vditor.codeRender(previewElement);
    Vditor.highlightRender(`).concat(JSON.stringify(e.options.preview.hljs), ", previewElement, '").concat(e.options.cdn, `');
    Vditor.mathRender(previewElement, {
        cdn: '`).concat(e.options.cdn, `',
        math: `).concat(JSON.stringify(e.options.preview.math), `,
    });
    Vditor.mermaidRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.SMILESRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.markmapRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.flowchartRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.graphvizRender(previewElement, '`).concat(e.options.cdn, `');
    Vditor.chartRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.mindmapRender(previewElement, '`).concat(e.options.cdn, "', '").concat(e.options.theme, `');
    Vditor.abcRender(previewElement, '`).concat(e.options.cdn, `');
    `).concat(e.options.preview.render.media.enable ? "Vditor.mediaRender(previewElement);" : "", `
    Vditor.speechRender(previewElement);
<\/script>
<script src="`).concat(e.options.cdn, "/dist/js/icons/").concat(e.options.icon, '.js"><\/script></body></html>');
          On(e, n, t.substr(0, 10) + ".html");
        }, Pr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Br = (
          /** @class */
          function(e) {
            Pr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = i.element.children[0], o = document.createElement("div");
              return o.className = "vditor-hint".concat(r.level === 2 ? "" : " vditor-panel--arrow"), o.innerHTML = `<button data-type="markdown">Markdown</button>
<button data-type="pdf">PDF</button>
<button data-type="html">HTML</button>`, o.addEventListener((0, l.y3)(), function(f) {
                var h = f.target;
                if (h.tagName === "BUTTON") {
                  switch (h.getAttribute("data-type")) {
                    case "markdown":
                      Rr(n);
                      break;
                    case "pdf":
                      jr(n);
                      break;
                    case "html":
                      Ir(n);
                      break;
                    default:
                      break;
                  }
                  y(n, ["subToolbar"]), f.preventDefault(), f.stopPropagation();
                }
              }), i.element.appendChild(o), b(n, o, a, r.level), i;
            }
            return t;
          }(he)
        ), Ur = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Vr = (
          /** @class */
          function(e) {
            Ur(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n, r), i;
            }
            return t.prototype._bindEvent = function(n, r) {
              this.element.children[0].addEventListener((0, l.y3)(), function(i) {
                i.preventDefault(), n.element.className.includes("vditor--fullscreen") ? (r.level || (this.innerHTML = r.icon), n.element.style.zIndex = "", document.body.style.overflow = "", n.element.classList.remove("vditor--fullscreen"), Object.keys(n.toolbar.elements).forEach(function(a) {
                  var o = n.toolbar.elements[a].firstChild;
                  o && (o.className = o.className.replace("__s", "__n"), n.options.toolbar.forEach(function(f) {
                    typeof f != "string" && f.tipPosition && f.name === o.dataset.type && (o.className = "vditor-tooltipped vditor-tooltipped__".concat(f.tipPosition));
                  }));
                }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__s", "__n"))) : (r.level || (this.innerHTML = '<svg><use xlink:href="#vditor-icon-contract"></use></svg>'), n.element.style.zIndex = n.options.fullscreen.index.toString(), document.body.style.overflow = "hidden", n.element.classList.add("vditor--fullscreen"), Object.keys(n.toolbar.elements).forEach(function(a) {
                  var o = n.toolbar.elements[a].firstChild;
                  o && (o.className = o.className.replace("__n", "__s"));
                }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__n", "__s"))), n.devtools && n.devtools.renderEchart(n), r.click && r.click(i, n), He(n), gt(n);
              });
            }, t;
          }(he)
        ), Kr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Yr = (
          /** @class */
          function(e) {
            Kr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = document.createElement("div");
              return a.className = "vditor-hint vditor-panel--arrow", a.innerHTML = '<button data-tag="h1" data-value="# ">'.concat(window.VditorI18n.heading1, " ").concat((0, l.fG)("&lt;⌥⌘1>"), `</button>
<button data-tag="h2" data-value="## ">`).concat(window.VditorI18n.heading2, " &lt;").concat((0, l.fG)("⌥⌘2"), `></button>
<button data-tag="h3" data-value="### ">`).concat(window.VditorI18n.heading3, " &lt;").concat((0, l.fG)("⌥⌘3"), `></button>
<button data-tag="h4" data-value="#### ">`).concat(window.VditorI18n.heading4, " &lt;").concat((0, l.fG)("⌥⌘4"), `></button>
<button data-tag="h5" data-value="##### ">`).concat(window.VditorI18n.heading5, " &lt;").concat((0, l.fG)("⌥⌘5"), `></button>
<button data-tag="h6" data-value="###### ">`).concat(window.VditorI18n.heading6, " &lt;").concat((0, l.fG)("⌥⌘6"), "></button>"), i.element.appendChild(a), i._bindEvent(n, a), i;
            }
            return t.prototype._bindEvent = function(n, r) {
              var i = this.element.children[0];
              i.addEventListener((0, l.y3)(), function(o) {
                o.preventDefault(), clearTimeout(n.wysiwyg.afterRenderTimeoutId), clearTimeout(n.ir.processTimeoutId), clearTimeout(n.sv.processTimeoutId), !i.classList.contains(v.Y.CLASS_MENU_DISABLED) && (i.blur(), i.classList.contains("vditor-menu--current") ? (n.currentMode === "wysiwyg" ? (At(n), ce(n)) : n.currentMode === "ir" && ft(n, ""), i.classList.remove("vditor-menu--current")) : (y(n, ["subToolbar"]), r.style.display = "block"));
              });
              for (var a = 0; a < 6; a++)
                r.children.item(a).addEventListener((0, l.y3)(), function(o) {
                  o.preventDefault(), n.currentMode === "wysiwyg" ? (yt(n, o.target.getAttribute("data-tag")), ce(n), i.classList.add("vditor-menu--current")) : n.currentMode === "ir" ? (ft(n, o.target.getAttribute("data-value")), i.classList.add("vditor-menu--current")) : an(n, o.target.getAttribute("data-value")), r.style.display = "none";
                });
            }, t;
          }(he)
        ), Wr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), qr = (
          /** @class */
          function(e) {
            Wr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), n.tip.show(`<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">
<div style="margin-top: 14px;flex: 1">
    <div>Markdown 使用指南</div>
    <ul style="list-style: none">
        <li><a href="https://ld246.com/article/1583308420519" target="_blank">语法速查手册</a></li>
        <li><a href="https://ld246.com/article/1583129520165" target="_blank">基础语法</a></li>
        <li><a href="https://ld246.com/article/1583305480675" target="_blank">扩展语法</a></li>
        <li><a href="https://ld246.com/article/1582778815353" target="_blank">键盘快捷键</a></li>
    </ul>
</div>
<div style="margin-top: 14px;flex: 1">
    <div>Vditor 支持</div>
    <ul style="list-style: none">
        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>
        <li><a href="https://ld246.com/tag/vditor" target="_blank">官方讨论区</a></li>
        <li><a href="https://ld246.com/article/1549638745630" target="_blank">开发手册</a></li>
        <li><a href="https://ld246.com/guide/markdown" target="_blank">演示地址</a></li>
    </ul>
</div></div>`, 0);
              }), i;
            }
            return t;
          }(he)
        ), Fr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), zr = (
          /** @class */
          function(e) {
            Fr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                if (a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) || n.currentMode === "sv")) {
                  var o = (0, M.RN)(n), f = (0, s._Y)(o.startContainer, "LI");
                  f && dn(n, f, o);
                }
              }), i;
            }
            return t;
          }(he)
        ), Zr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Gr = (
          /** @class */
          function(e) {
            Zr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), n.tip.show(`<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">
<p style="text-align: center;margin: 14px 0">
    <em>下一代的 Markdown 编辑器，为未来而构建</em>
</p>
<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">
    <img src="https://unpkg.com/vditor/dist/images/logo.png" style="margin: 0 auto;height: 68px"/>
    <div>&nbsp;&nbsp;</div>
    <div style="flex: 1;min-width: 250px">
        Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。
        它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。
    </div>
</div>
<div style="display: flex;flex-wrap: wrap;">
    <ul style="list-style: none;flex: 1;min-width:148px">
        <li>
        项目地址：<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>
        </li>
        <li>
        开源协议：MIT
        </li>
    </ul>
    <ul style="list-style: none;margin-right: 18px">
        <li>
        组件版本：Vditor v`.concat(v.g, " / Lute v").concat(Lute.Version, `
        </li>
        <li>
        赞助捐赠：<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>
        </li>
    </ul>
</div>
</div>`), 0);
              }), i;
            }
            return t;
          }(he)
        ), Jr = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Xr = (
          /** @class */
          function(e) {
            Jr(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) || n.currentMode === "sv") && ct(n, "afterend");
              }), i;
            }
            return t;
          }(he)
        ), $r = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), Qr = (
          /** @class */
          function(e) {
            $r(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) || n.currentMode === "sv") && ct(n, "beforebegin");
              }), i;
            }
            return t;
          }(he)
        ), ei = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ti = (
          /** @class */
          function(e) {
            ei(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                if (a.preventDefault(), !(i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) || n.currentMode === "sv")) {
                  var o = (0, M.RN)(n), f = (0, s._Y)(o.startContainer, "LI");
                  f && Ut(n, f, o, f.parentElement);
                }
              }), i;
            }
            return t;
          }(he)
        ), ni = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ri = (
          /** @class */
          function(e) {
            ni(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return n.options.outline && i.element.firstElementChild.classList.add("vditor-menu--current"), i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault();
                var o = n.toolbar.elements.outline.firstElementChild;
                o.classList.contains(v.Y.CLASS_MENU_DISABLED) || (n.options.outline.enable = !i.element.firstElementChild.classList.contains("vditor-menu--current"), n.outline.toggle(n, n.options.outline.enable));
              }), i;
            }
            return t;
          }(he)
        ), ii = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ai = (
          /** @class */
          function(e) {
            ii(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this;
              this.element.children[0].addEventListener((0, l.y3)(), function(i) {
                i.preventDefault();
                var a = r.element.firstElementChild;
                if (!a.classList.contains(v.Y.CLASS_MENU_DISABLED)) {
                  var o = v.Y.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
                  a.classList.contains("vditor-menu--current") ? (a.classList.remove("vditor-menu--current"), n.currentMode === "sv" ? (n.sv.element.style.display = "block", n.options.preview.mode === "both" ? n.preview.element.style.display = "block" : n.preview.element.style.display = "none") : (n[n.currentMode].element.parentElement.style.display = "block", n.preview.element.style.display = "none"), m(n.toolbar.elements, o), n.outline.render(n)) : (d(n.toolbar.elements, o), n.preview.element.style.display = "block", n.currentMode === "sv" ? n.sv.element.style.display = "none" : n[n.currentMode].element.parentElement.style.display = "none", n.preview.render(n), a.classList.add("vditor-menu--current"), y(n, ["subToolbar", "hint", "popover"]), setTimeout(function() {
                    n.outline.render(n);
                  }, n.options.preview.delay + 10)), He(n);
                }
              });
            }, t;
          }(he)
        ), oi = (
          /** @class */
          function() {
            function e(t) {
              this.SAMPLE_RATE = 5e3, this.isRecording = !1, this.readyFlag = !1, this.leftChannel = [], this.rightChannel = [], this.recordingLength = 0;
              var n;
              if (typeof AudioContext < "u")
                n = new AudioContext();
              else if (webkitAudioContext)
                n = new webkitAudioContext();
              else
                return;
              this.DEFAULT_SAMPLE_RATE = n.sampleRate;
              var r = n.createGain(), i = n.createMediaStreamSource(t);
              i.connect(r), this.recorder = n.createScriptProcessor(2048, 2, 1), this.recorder.onaudioprocess = null, r.connect(this.recorder), this.recorder.connect(n.destination), this.readyFlag = !0;
            }
            return e.prototype.cloneChannelData = function(t, n) {
              this.leftChannel.push(new Float32Array(t)), this.rightChannel.push(new Float32Array(n)), this.recordingLength += 2048;
            }, e.prototype.startRecordingNewWavFile = function() {
              this.readyFlag && (this.isRecording = !0, this.leftChannel.length = this.rightChannel.length = 0, this.recordingLength = 0);
            }, e.prototype.stopRecording = function() {
              this.isRecording = !1;
            }, e.prototype.buildWavFileBlob = function() {
              for (var t = this.mergeBuffers(this.leftChannel), n = this.mergeBuffers(this.rightChannel), r = new Float32Array(t.length), i = 0; i < t.length; ++i)
                r[i] = 0.5 * (t[i] + n[i]);
              this.DEFAULT_SAMPLE_RATE > this.SAMPLE_RATE && (r = this.downSampleBuffer(r, this.SAMPLE_RATE));
              var a = 44 + r.length * 2, o = new ArrayBuffer(a), f = new DataView(o);
              this.writeUTFBytes(f, 0, "RIFF"), f.setUint32(4, a, !0), this.writeUTFBytes(f, 8, "WAVE"), this.writeUTFBytes(f, 12, "fmt "), f.setUint32(16, 16, !0), f.setUint16(20, 1, !0), f.setUint16(22, 1, !0), f.setUint32(24, this.SAMPLE_RATE, !0), f.setUint32(28, this.SAMPLE_RATE * 2, !0), f.setUint16(32, 2, !0), f.setUint16(34, 16, !0);
              var h = r.length * 2;
              this.writeUTFBytes(f, 36, "data"), f.setUint32(40, h, !0);
              for (var u = r.length, S = 44, k = 1, O = 0; O < u; O++)
                f.setInt16(S, r[O] * (32767 * k), !0), S += 2;
              return new Blob([f], { type: "audio/wav" });
            }, e.prototype.downSampleBuffer = function(t, n) {
              if (n === this.DEFAULT_SAMPLE_RATE || n > this.DEFAULT_SAMPLE_RATE)
                return t;
              for (var r = this.DEFAULT_SAMPLE_RATE / n, i = Math.round(t.length / r), a = new Float32Array(i), o = 0, f = 0; o < a.length; ) {
                for (var h = Math.round((o + 1) * r), u = 0, S = 0, k = f; k < h && k < t.length; k++)
                  u += t[k], S++;
                a[o] = u / S, o++, f = h;
              }
              return a;
            }, e.prototype.mergeBuffers = function(t) {
              for (var n = new Float32Array(this.recordingLength), r = 0, i = t.length, a = 0; a < i; ++a) {
                var o = t[a];
                n.set(o, r), r += o.length;
              }
              return n;
            }, e.prototype.writeUTFBytes = function(t, n, r) {
              for (var i = r.length, a = 0; a < i; a++)
                t.setUint8(n + a, r.charCodeAt(a));
            }, e;
          }()
        ), si = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), li = (
          /** @class */
          function(e) {
            si(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this, i;
              this.element.children[0].addEventListener((0, l.y3)(), function(a) {
                if (a.preventDefault(), !r.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED)) {
                  var o = n[n.currentMode].element;
                  if (!i) {
                    navigator.mediaDevices.getUserMedia({ audio: !0 }).then(function(h) {
                      i = new oi(h), i.recorder.onaudioprocess = function(u) {
                        if (i.isRecording) {
                          var S = u.inputBuffer.getChannelData(0), k = u.inputBuffer.getChannelData(1);
                          i.cloneChannelData(S, k);
                        }
                      }, i.startRecordingNewWavFile(), n.tip.show(window.VditorI18n.recording), o.setAttribute("contenteditable", "false"), r.element.children[0].classList.add("vditor-menu--current");
                    }).catch(function() {
                      n.tip.show(window.VditorI18n["record-tip"]);
                    });
                    return;
                  }
                  if (i.isRecording) {
                    i.stopRecording(), n.tip.hide();
                    var f = new File([i.buildWavFileBlob()], "record".concat(new Date().getTime(), ".wav"), { type: "video/webm" });
                    Bt(n, [f]), r.element.children[0].classList.remove("vditor-menu--current");
                  } else
                    n.tip.show(window.VditorI18n.recording), o.setAttribute("contenteditable", "false"), i.startRecordingNewWavFile(), r.element.children[0].classList.add("vditor-menu--current");
                }
              });
            }, t;
          }(he)
        ), ci = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), ui = (
          /** @class */
          function(e) {
            ci(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return d({ redo: i.element }, ["redo"]), i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), !i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) && n.undo.redo(n);
              }), i;
            }
            return t;
          }(he)
        ), fi = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), di = (
          /** @class */
          function(e) {
            fi(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this;
              return d({ undo: i.element }, ["undo"]), i.element.children[0].addEventListener((0, l.y3)(), function(a) {
                a.preventDefault(), !i.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED) && n.undo.undo(n);
              }), i;
            }
            return t;
          }(he)
        ), pi = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), hi = (
          /** @class */
          function(e) {
            pi(t, e);
            function t(n, r) {
              var i = e.call(this, n, r) || this, a = '<input type="file"';
              return n.options.upload.multiple && (a += ' multiple="multiple"'), n.options.upload.accept && (a += ' accept="'.concat(n.options.upload.accept, '"')), i.element.children[0].innerHTML = "".concat(r.icon || '<svg><use xlink:href="#vditor-icon-upload"></use></svg>').concat(a, ">"), i._bindEvent(n), i;
            }
            return t.prototype._bindEvent = function(n) {
              var r = this;
              this.element.children[0].addEventListener((0, l.y3)(), function(i) {
                if (r.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED)) {
                  i.stopPropagation(), i.preventDefault();
                  return;
                }
              }), this.element.querySelector("input").addEventListener("change", function(i) {
                if (r.element.firstElementChild.classList.contains(v.Y.CLASS_MENU_DISABLED)) {
                  i.stopPropagation(), i.preventDefault();
                  return;
                }
                i.target.files.length !== 0 && Bt(n, i.target.files, i.target);
              });
            }, t;
          }(he)
        ), mi = (
          /** @class */
          function() {
            function e(t) {
              var n = this, r = t.options;
              this.elements = {}, this.element = document.createElement("div"), this.element.className = "vditor-toolbar", r.toolbar.forEach(function(i, a) {
                var o = n.genItem(t, i, a);
                if (n.element.appendChild(o), i.toolbar) {
                  var f = document.createElement("div");
                  f.className = "vditor-hint vditor-panel--arrow", f.addEventListener((0, l.y3)(), function(h) {
                    f.style.display = "none";
                  }), i.toolbar.forEach(function(h, u) {
                    h.level = 2, f.appendChild(n.genItem(t, h, a + u));
                  }), o.appendChild(f), b(t, f, o.children[0], 2);
                }
              }), t.options.toolbarConfig.hide && this.element.classList.add("vditor-toolbar--hide"), t.options.toolbarConfig.pin && this.element.classList.add("vditor-toolbar--pin"), t.options.counter.enable && (t.counter = new kr(t), this.element.appendChild(t.counter.element));
            }
            return e.prototype.updateConfig = function(t, n) {
              t.options.toolbarConfig = Object.assign({
                hide: !1,
                pin: !1
              }, n), t.options.toolbarConfig.hide ? this.element.classList.add("vditor-toolbar--hide") : this.element.classList.remove("vditor-toolbar--hide"), t.options.toolbarConfig.pin ? this.element.classList.add("vditor-toolbar--pin") : this.element.classList.remove("vditor-toolbar--pin");
            }, e.prototype.genItem = function(t, n, r) {
              var i;
              switch (n.name) {
                case "bold":
                case "italic":
                case "more":
                case "strike":
                case "line":
                case "quote":
                case "list":
                case "ordered-list":
                case "check":
                case "code":
                case "inline-code":
                case "link":
                case "table":
                  i = new he(t, n);
                  break;
                case "emoji":
                  i = new Nr(t, n);
                  break;
                case "headings":
                  i = new Yr(t, n);
                  break;
                case "|":
                  i = new Or();
                  break;
                case "br":
                  i = new _r();
                  break;
                case "undo":
                  i = new di(t, n);
                  break;
                case "redo":
                  i = new ui(t, n);
                  break;
                case "help":
                  i = new qr(t, n);
                  break;
                case "both":
                  i = new Er(t, n);
                  break;
                case "preview":
                  i = new ai(t, n);
                  break;
                case "fullscreen":
                  i = new Vr(t, n);
                  break;
                case "upload":
                  i = new hi(t, n);
                  break;
                case "record":
                  i = new li(t, n);
                  break;
                case "info":
                  i = new Gr(t, n);
                  break;
                case "edit-mode":
                  i = new Jn(t, n);
                  break;
                case "devtools":
                  i = new Dr(t, n);
                  break;
                case "outdent":
                  i = new ti(t, n);
                  break;
                case "indent":
                  i = new zr(t, n);
                  break;
                case "outline":
                  i = new ri(t, n);
                  break;
                case "insert-after":
                  i = new Xr(t, n);
                  break;
                case "insert-before":
                  i = new Qr(t, n);
                  break;
                case "code-theme":
                  i = new Tr(t, n);
                  break;
                case "content-theme":
                  i = new Mr(t, n);
                  break;
                case "export":
                  i = new Br(t, n);
                  break;
                default:
                  i = new Ar(t, n);
                  break;
              }
              if (i) {
                var a = n.name;
                return (a === "br" || a === "|") && (a = a + r), this.elements[a] = i.element, i.element;
              }
            }, e;
          }()
        ), gi = X(192), yi = (
          /** @class */
          function() {
            function e() {
              this.stackSize = 50, this.resetStack(), this.dmp = new gi();
            }
            return e.prototype.clearStack = function(t) {
              this.resetStack(), this.resetIcon(t);
            }, e.prototype.resetIcon = function(t) {
              t.toolbar && (this[t.currentMode].undoStack.length > 1 ? m(t.toolbar.elements, ["undo"]) : d(t.toolbar.elements, ["undo"]), this[t.currentMode].redoStack.length !== 0 ? m(t.toolbar.elements, ["redo"]) : d(t.toolbar.elements, ["redo"]));
            }, e.prototype.undo = function(t) {
              if (t[t.currentMode].element.getAttribute("contenteditable") !== "false" && !(this[t.currentMode].undoStack.length < 2)) {
                var n = this[t.currentMode].undoStack.pop();
                n && (this[t.currentMode].redoStack.push(n), this.renderDiff(n, t), this[t.currentMode].hasUndo = !0, y(t, ["hint"]));
              }
            }, e.prototype.redo = function(t) {
              if (t[t.currentMode].element.getAttribute("contenteditable") !== "false") {
                var n = this[t.currentMode].redoStack.pop();
                n && (this[t.currentMode].undoStack.push(n), this.renderDiff(n, t, !0));
              }
            }, e.prototype.recordFirstPosition = function(t, n) {
              if (getSelection().rangeCount !== 0 && !(this[t.currentMode].undoStack.length !== 1 || this[t.currentMode].undoStack[0].length === 0 || this[t.currentMode].redoStack.length > 0) && !((0, l.gm)() && n.key === "Backspace") && !(0, l.nr)()) {
                var r = this.addCaret(t);
                r.replace("<wbr>", "").replace(" vditor-ir__node--expand", "") === this[t.currentMode].undoStack[0][0].diffs[0][1].replace("<wbr>", "") && (this[t.currentMode].undoStack[0][0].diffs[0][1] = r, this[t.currentMode].lastText = r);
              }
            }, e.prototype.addToUndoStack = function(t) {
              var n = this.addCaret(t, !0), r = this.dmp.diff_main(n, this[t.currentMode].lastText, !0), i = this.dmp.patch_make(n, this[t.currentMode].lastText, r);
              i.length === 0 && this[t.currentMode].undoStack.length > 0 || (this[t.currentMode].lastText = n, this[t.currentMode].undoStack.push(i), this[t.currentMode].undoStack.length > this.stackSize && this[t.currentMode].undoStack.shift(), this[t.currentMode].hasUndo && (this[t.currentMode].redoStack = [], this[t.currentMode].hasUndo = !1, d(t.toolbar.elements, ["redo"])), this[t.currentMode].undoStack.length > 1 && m(t.toolbar.elements, ["undo"]));
            }, e.prototype.renderDiff = function(t, n, r) {
              r === void 0 && (r = !1);
              var i;
              if (r) {
                var a = this.dmp.patch_deepCopy(t).reverse();
                a.forEach(function(f) {
                  f.diffs.forEach(function(h) {
                    h[0] = -h[0];
                  });
                }), i = this.dmp.patch_apply(a, this[n.currentMode].lastText)[0];
              } else
                i = this.dmp.patch_apply(t, this[n.currentMode].lastText)[0];
              if (this[n.currentMode].lastText = i, n[n.currentMode].element.innerHTML = i, n.currentMode !== "sv" && (n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview")).forEach(function(f) {
                f.parentElement.querySelector(".language-echarts") && (n.currentMode === "ir" ? f.parentElement.outerHTML = n.lute.SpinVditorIRDOM(f.parentElement.outerHTML) : f.parentElement.outerHTML = n.lute.SpinVditorDOM(f.parentElement.outerHTML));
              }), n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview[data-render='2']")).forEach(function(f) {
                we(f, n);
              })), n[n.currentMode].element.querySelector("wbr"))
                (0, M.ir)(n[n.currentMode].element, n[n.currentMode].element.ownerDocument.createRange()), ye(n);
              else {
                var o = getSelection().getRangeAt(0);
                o.setEndBefore(n[n.currentMode].element), o.collapse(!1);
              }
              Pe(n), Q(n, {
                enableAddUndoStack: !1,
                enableHint: !1,
                enableInput: !0
              }), Qe(n), n[n.currentMode].element.querySelectorAll(".vditor-".concat(n.currentMode, "__preview[data-render='2']")).forEach(function(f) {
                we(f, n);
              }), this[n.currentMode].undoStack.length > 1 ? m(n.toolbar.elements, ["undo"]) : d(n.toolbar.elements, ["undo"]), this[n.currentMode].redoStack.length !== 0 ? m(n.toolbar.elements, ["redo"]) : d(n.toolbar.elements, ["redo"]);
            }, e.prototype.resetStack = function() {
              this.ir = {
                hasUndo: !1,
                lastText: "",
                redoStack: [],
                undoStack: []
              }, this.sv = {
                hasUndo: !1,
                lastText: "",
                redoStack: [],
                undoStack: []
              }, this.wysiwyg = {
                hasUndo: !1,
                lastText: "",
                redoStack: [],
                undoStack: []
              };
            }, e.prototype.addCaret = function(t, n) {
              n === void 0 && (n = !1);
              var r;
              if (getSelection().rangeCount !== 0 && !t[t.currentMode].element.querySelector("wbr")) {
                var i = getSelection().getRangeAt(0);
                if (t[t.currentMode].element.contains(i.startContainer)) {
                  r = i.cloneRange();
                  var a = document.createElement("span");
                  a.className = "vditor-wbr", i.insertNode(a);
                }
              }
              var o = t[t.currentMode].element.cloneNode(!0);
              o.querySelectorAll(".vditor-".concat(t.currentMode, "__preview[data-render='1']")).forEach(function(h) {
                h.firstElementChild && (h.firstElementChild.classList.contains("language-echarts") || h.firstElementChild.classList.contains("language-plantuml") || h.firstElementChild.classList.contains("language-mindmap") ? (h.firstElementChild.removeAttribute("_echarts_instance_"), h.firstElementChild.removeAttribute("data-processed"), h.firstElementChild.innerHTML = h.previousElementSibling.firstElementChild.innerHTML, h.setAttribute("data-render", "2")) : h.firstElementChild.classList.contains("language-math") && (h.setAttribute("data-render", "2"), h.firstElementChild.textContent = h.firstElementChild.getAttribute("data-math"), h.firstElementChild.removeAttribute("data-math")));
              });
              var f = o.innerHTML;
              return t[t.currentMode].element.querySelectorAll(".vditor-wbr").forEach(function(h) {
                h.remove();
              }), n && r && (0, M.jl)(r), f.replace('<span class="vditor-wbr"></span>', "<wbr>");
            }, e;
          }()
        ), bi = X(905), wi = (
          /** @class */
          function() {
            function e(t) {
              this.defaultOptions = {
                rtl: !1,
                after: void 0,
                cache: {
                  enable: !0
                },
                cdn: v.Y.CDN,
                classes: {
                  preview: ""
                },
                comment: {
                  enable: !1
                },
                counter: {
                  enable: !1,
                  type: "markdown"
                },
                customRenders: [],
                debugger: !1,
                fullscreen: {
                  index: 90
                },
                height: "auto",
                hint: {
                  delay: 200,
                  emoji: {
                    "+1": "👍",
                    "-1": "👎",
                    confused: "😕",
                    eyes: "👀️",
                    heart: "❤️",
                    rocket: "🚀️",
                    smile: "😄",
                    tada: "🎉️"
                  },
                  emojiPath: "".concat(v.Y.CDN, "/dist/images/emoji"),
                  extend: [],
                  parse: !0
                },
                icon: "ant",
                lang: "zh_CN",
                mode: "ir",
                outline: {
                  enable: !1,
                  position: "left"
                },
                placeholder: "",
                preview: {
                  actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
                  delay: 1e3,
                  hljs: v.Y.HLJS_OPTIONS,
                  markdown: v.Y.MARKDOWN_OPTIONS,
                  math: v.Y.MATH_OPTIONS,
                  maxWidth: 800,
                  mode: "both",
                  theme: v.Y.THEME_OPTIONS,
                  render: {
                    media: {
                      enable: !0
                    }
                  }
                },
                link: {
                  isOpen: !0
                },
                image: {
                  isPreview: !0
                },
                resize: {
                  enable: !1,
                  position: "bottom"
                },
                theme: "classic",
                toolbar: [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "|",
                  "list",
                  "ordered-list",
                  "check",
                  "outdent",
                  "indent",
                  "|",
                  "quote",
                  "line",
                  "code",
                  "inline-code",
                  "insert-before",
                  "insert-after",
                  "|",
                  "upload",
                  "record",
                  "table",
                  "|",
                  "undo",
                  "redo",
                  "|",
                  "fullscreen",
                  "edit-mode",
                  {
                    name: "more",
                    toolbar: [
                      "both",
                      "code-theme",
                      "content-theme",
                      "export",
                      "outline",
                      "preview",
                      "devtools",
                      "info",
                      "help"
                    ]
                  }
                ],
                toolbarConfig: {
                  hide: !1,
                  pin: !1
                },
                typewriterMode: !1,
                undoDelay: 800,
                upload: {
                  extraData: {},
                  fieldName: "file[]",
                  filename: function(n) {
                    return n.replace(/\W/g, "");
                  },
                  linkToImgUrl: "",
                  max: 10 * 1024 * 1024,
                  multiple: !0,
                  url: "",
                  withCredentials: !1
                },
                value: "",
                width: "auto"
              }, this.options = t;
            }
            return e.prototype.merge = function() {
              var t, n, r, i, a, o, f, h, u;
              this.options && (this.options.toolbar ? this.options.toolbar = this.mergeToolbar(this.options.toolbar) : this.options.toolbar = this.mergeToolbar(this.defaultOptions.toolbar), !((n = (t = this.options.preview) === null || t === void 0 ? void 0 : t.theme) === null || n === void 0) && n.list && (this.defaultOptions.preview.theme.list = this.options.preview.theme.list), !((a = (i = (r = this.options.preview) === null || r === void 0 ? void 0 : r.render) === null || i === void 0 ? void 0 : i.media) === null || a === void 0) && a.enable && (this.defaultOptions.preview.render.media.enable = this.options.preview.render.media.enable), !((o = this.options.hint) === null || o === void 0) && o.emoji && (this.defaultOptions.hint.emoji = this.options.hint.emoji), this.options.comment && (this.defaultOptions.comment = this.options.comment), this.options.cdn && (!((h = (f = this.options.preview) === null || f === void 0 ? void 0 : f.theme) === null || h === void 0) && h.path || (this.defaultOptions.preview.theme.path = "".concat(this.options.cdn, "/dist/css/content-theme")), !((u = this.options.hint) === null || u === void 0) && u.emojiPath || (this.defaultOptions.hint.emojiPath = "".concat(this.options.cdn, "/dist/images/emoji"))));
              var S = (0, bi.h)(this.defaultOptions, this.options);
              if (S.cache.enable && !S.cache.id)
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              return S;
            }, e.prototype.mergeToolbar = function(t) {
              var n = this, r = [
                {
                  icon: '<svg><use xlink:href="#vditor-icon-export"></use></svg>',
                  name: "export",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘E",
                  icon: '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>',
                  name: "emoji",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘H",
                  icon: '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
                  name: "headings",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘B",
                  icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
                  name: "bold",
                  prefix: "**",
                  suffix: "**",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘I",
                  icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
                  name: "italic",
                  prefix: "*",
                  suffix: "*",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘D",
                  icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
                  name: "strike",
                  prefix: "~~",
                  suffix: "~~",
                  tipPosition: "ne"
                },
                {
                  hotkey: "⌘K",
                  icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
                  name: "link",
                  prefix: "[",
                  suffix: "](https://)",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "⌘L",
                  icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
                  name: "list",
                  prefix: "* ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘O",
                  icon: '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
                  name: "ordered-list",
                  prefix: "1. ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘J",
                  icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
                  name: "check",
                  prefix: "* [ ] ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘I",
                  icon: '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
                  name: "outdent",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘O",
                  icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
                  name: "indent",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "⌘;",
                  icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
                  name: "quote",
                  prefix: "> ",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘H",
                  icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
                  name: "line",
                  prefix: "---",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘U",
                  icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
                  name: "code",
                  prefix: "```",
                  suffix: "\n```",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘G",
                  icon: '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
                  name: "inline-code",
                  prefix: "`",
                  suffix: "`",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘B",
                  icon: '<svg><use xlink:href="#vditor-icon-before"></use></svg>',
                  name: "insert-before",
                  tipPosition: "n"
                },
                {
                  hotkey: "⇧⌘E",
                  icon: '<svg><use xlink:href="#vditor-icon-after"></use></svg>',
                  name: "insert-after",
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
                  name: "upload",
                  tipPosition: "n"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-record"></use></svg>',
                  name: "record",
                  tipPosition: "n"
                },
                {
                  hotkey: "⌘M",
                  icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
                  name: "table",
                  prefix: "| col1",
                  suffix: ` | col2 | col3 |
| --- | --- | --- |
|  |  |  |
|  |  |  |`,
                  tipPosition: "n"
                },
                {
                  name: "|"
                },
                {
                  hotkey: "⌘Z",
                  icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
                  name: "undo",
                  tipPosition: "nw"
                },
                {
                  hotkey: "⌘Y",
                  icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
                  name: "redo",
                  tipPosition: "nw"
                },
                {
                  name: "|"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-more"></use></svg>',
                  name: "more",
                  tipPosition: "e"
                },
                {
                  hotkey: "⌘'",
                  icon: '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>',
                  name: "fullscreen",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-edit"></use></svg>',
                  name: "edit-mode",
                  tipPosition: "nw"
                },
                {
                  hotkey: "⌘P",
                  icon: '<svg><use xlink:href="#vditor-icon-both"></use></svg>',
                  name: "both",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-preview"></use></svg>',
                  name: "preview",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
                  name: "outline",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
                  name: "content-theme",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
                  name: "code-theme",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-bug"></use></svg>',
                  name: "devtools",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-info"></use></svg>',
                  name: "info",
                  tipPosition: "nw"
                },
                {
                  icon: '<svg><use xlink:href="#vditor-icon-help"></use></svg>',
                  name: "help",
                  tipPosition: "nw"
                },
                {
                  name: "br"
                }
              ], i = [];
              return t.forEach(function(a) {
                var o = a;
                r.forEach(function(f) {
                  typeof a == "string" && f.name === a && (o = f), typeof a == "object" && f.name === a.name && (o = Object.assign({}, f, a));
                }), a.toolbar && (o.toolbar = n.mergeToolbar(a.toolbar)), i.push(o);
              }), i;
            }, e;
          }()
        ), vi = (
          /** @class */
          function() {
            function e(t) {
              var n = this;
              this.composingLock = !1, this.commentIds = [];
              var r = document.createElement("div");
              r.className = "vditor-wysiwyg", r.innerHTML = '<pre class="vditor-reset" placeholder="'.concat(t.options.placeholder, `"
 contenteditable="true" spellcheck="false"></pre>
<div class="vditor-panel vditor-panel--none"></div>
<div class="vditor-panel vditor-panel--none">
    <button type="button" aria-label="`).concat(window.VditorI18n.comment, `" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">
        <svg><use xlink:href="#vditor-icon-comment"></use></svg>
    </button>
</div>`), this.element = r.firstElementChild, this.popover = r.firstElementChild.nextElementSibling, this.selectPopover = r.lastElementChild, this.bindEvent(t), Dt(t, this.element), nn(t, this.element), Ot(t, this.element), jt(t, this.element), It(t, this.element), Ht(t, this.element), Nt(t, this.element, this.copy), Rt(t, this.element, this.copy), t.options.comment.enable && (this.selectPopover.querySelector("button").onclick = function() {
                var i = Lute.NewNodeID(), a = getSelection().getRangeAt(0), o = a.cloneRange(), f = a.extractContents(), h, u, S = !1, k = !1;
                f.childNodes.forEach(function(H, K) {
                  var B = !1;
                  if (H.nodeType === 3 ? B = !0 : H.classList.contains("vditor-comment") ? H.classList.contains("vditor-comment") && H.setAttribute("data-cmtids", H.getAttribute("data-cmtids") + " " + i) : B = !0, B)
                    if (H.nodeType !== 3 && H.getAttribute("data-block") === "0" && K === 0 && o.startOffset > 0)
                      H.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(H.innerHTML, "</span>"), h = H;
                    else if (H.nodeType !== 3 && H.getAttribute("data-block") === "0" && K === f.childNodes.length - 1 && o.endOffset < o.endContainer.textContent.length)
                      H.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(H.innerHTML, "</span>"), u = H;
                    else if (H.nodeType !== 3 && H.getAttribute("data-block") === "0")
                      K === 0 ? S = !0 : K === f.childNodes.length - 1 && (k = !0), H.innerHTML = '<span class="vditor-comment" data-cmtids="'.concat(i, '">').concat(H.innerHTML, "</span>");
                    else {
                      var N = document.createElement("span");
                      N.classList.add("vditor-comment"), N.setAttribute("data-cmtids", i), H.parentNode.insertBefore(N, H), N.appendChild(H);
                    }
                });
                var O = (0, s.pt)(o.startContainer);
                O && (h ? (O.insertAdjacentHTML("beforeend", h.innerHTML), h.remove()) : O.textContent.trim().replace(v.Y.ZWSP, "") === "" && S && O.remove());
                var j = (0, s.pt)(o.endContainer);
                j && (u ? (j.insertAdjacentHTML("afterbegin", u.innerHTML), u.remove()) : j.textContent.trim().replace(v.Y.ZWSP, "") === "" && k && j.remove()), a.insertNode(f), t.options.comment.add(i, a.toString(), n.getComments(t, !0)), ce(t, {
                  enableAddUndoStack: !0,
                  enableHint: !1,
                  enableInput: !1
                }), n.hideComment();
              });
            }
            return e.prototype.getComments = function(t, n) {
              var r = this;
              if (n === void 0 && (n = !1), t.currentMode === "wysiwyg" && t.options.comment.enable) {
                this.commentIds = [], this.element.querySelectorAll(".vditor-comment").forEach(function(a) {
                  r.commentIds = r.commentIds.concat(a.getAttribute("data-cmtids").split(" "));
                }), this.commentIds = Array.from(new Set(this.commentIds));
                var i = [];
                if (n)
                  return this.commentIds.forEach(function(a) {
                    i.push({
                      id: a,
                      top: r.element.querySelector('.vditor-comment[data-cmtids="'.concat(a, '"]')).offsetTop
                    });
                  }), i;
              } else
                return [];
            }, e.prototype.triggerRemoveComment = function(t) {
              var n = function(a, o) {
                var f = new Set(o);
                return a.filter(function(h) {
                  return !f.has(h);
                });
              };
              if (t.currentMode === "wysiwyg" && t.options.comment.enable && t.wysiwyg.commentIds.length > 0) {
                var r = JSON.parse(JSON.stringify(this.commentIds));
                this.getComments(t);
                var i = n(r, this.commentIds);
                i.length > 0 && t.options.comment.remove(i);
              }
            }, e.prototype.showComment = function() {
              var t = (0, M.Ey)(this.element);
              this.selectPopover.setAttribute("style", "left:".concat(t.left, "px;display:block;top:").concat(Math.max(-8, t.top - 21), "px"));
            }, e.prototype.hideComment = function() {
              this.selectPopover.setAttribute("style", "display:none");
            }, e.prototype.unbindListener = function() {
              window.removeEventListener("scroll", this.scrollListener);
            }, e.prototype.copy = function(t, n) {
              var r = getSelection().getRangeAt(0);
              if (r.toString() !== "") {
                t.stopPropagation(), t.preventDefault();
                var i = (0, s._Y)(r.startContainer, "CODE"), a = (0, s._Y)(r.endContainer, "CODE");
                if (i && a && a.isSameNode(i)) {
                  var o = "";
                  i.parentElement.tagName === "PRE" ? o = r.toString() : o = "`" + r.toString() + "`", t.clipboardData.setData("text/plain", o), t.clipboardData.setData("text/html", "");
                  return;
                }
                var f = (0, s._Y)(r.startContainer, "A"), h = (0, s._Y)(r.endContainer, "A");
                if (f && h && h.isSameNode(f)) {
                  var u = f.getAttribute("title") || "";
                  u && (u = ' "'.concat(u, '"')), t.clipboardData.setData("text/plain", "[".concat(r.toString(), "](").concat(f.getAttribute("href")).concat(u, ")")), t.clipboardData.setData("text/html", "");
                  return;
                }
                var S = document.createElement("div");
                S.appendChild(r.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorDOM2Md(S.innerHTML).trim()), t.clipboardData.setData("text/html", "");
              }
            }, e.prototype.bindEvent = function(t) {
              var n = this;
              this.unbindListener(), window.addEventListener("scroll", this.scrollListener = function() {
                if (y(t, ["hint"]), !(n.popover.style.display !== "block" || n.selectPopover.style.display !== "block")) {
                  var r = parseInt(n.popover.getAttribute("data-top"), 10);
                  if (t.options.height !== "auto") {
                    if (t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0) {
                      var i = Math.max(window.scrollY - t.element.offsetTop - 8, Math.min(r - t.wysiwyg.element.scrollTop, n.element.clientHeight - 21)) + "px";
                      n.popover.style.display === "block" && (n.popover.style.top = i), n.selectPopover.style.display === "block" && (n.selectPopover.style.top = i);
                    }
                    return;
                  } else if (!t.options.toolbarConfig.pin)
                    return;
                  var a = Math.max(r, window.scrollY - t.element.offsetTop - 8) + "px";
                  n.popover.style.display === "block" && (n.popover.style.top = a), n.selectPopover.style.display === "block" && (n.selectPopover.style.top = a);
                }
              }), this.element.addEventListener("scroll", function() {
                if (y(t, ["hint"]), t.options.comment && t.options.comment.enable && t.options.comment.scroll && t.options.comment.scroll(t.wysiwyg.element.scrollTop), n.popover.style.display === "block") {
                  var r = parseInt(n.popover.getAttribute("data-top"), 10) - t.wysiwyg.element.scrollTop, i = -8;
                  t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0 && (i = window.scrollY - t.element.offsetTop + i);
                  var a = Math.max(i, Math.min(r, n.element.clientHeight - 21)) + "px";
                  n.popover.style.top = a, n.selectPopover.style.top = a;
                }
              }), this.element.addEventListener("paste", function(r) {
                St(t, r, {
                  pasteCode: function(i) {
                    var a = (0, M.RN)(t), o = document.createElement("template");
                    o.innerHTML = i, a.insertNode(o.content.cloneNode(!0));
                    var f = (0, s.Th)(a.startContainer, "data-block", "0");
                    f ? f.outerHTML = t.lute.SpinVditorDOM(f.outerHTML) : t.wysiwyg.element.innerHTML = t.lute.SpinVditorDOM(t.wysiwyg.element.innerHTML), (0, M.ir)(t.wysiwyg.element, a);
                  }
                });
              }), this.element.addEventListener("compositionstart", function() {
                n.composingLock = !0;
              }), this.element.addEventListener("compositionend", function(r) {
                var i = (0, E.c)(getSelection().getRangeAt(0).startContainer);
                if (i && i.textContent === "") {
                  Pe(t);
                  return;
                }
                (0, l.gm)() || wt(t, getSelection().getRangeAt(0).cloneRange(), r), n.composingLock = !1;
              }), this.element.addEventListener("input", function(r) {
                if (!(r.inputType === "deleteByDrag" || r.inputType === "insertFromDrop")) {
                  if (n.preventInput) {
                    n.preventInput = !1, ce(t);
                    return;
                  }
                  if (n.composingLock || r.data === "‘" || r.data === "“" || r.data === "《") {
                    ce(t);
                    return;
                  }
                  var i = getSelection().getRangeAt(0), a = (0, s.pt)(i.startContainer);
                  if (a || (Lt(t, i), a = (0, s.pt)(i.startContainer)), !!a) {
                    for (var o = (0, M.ED)(a, t.wysiwyg.element, i).start, f = !0, h = o - 1; h > a.textContent.substr(0, o).lastIndexOf(`
`); h--)
                      if (a.textContent.charAt(h) !== " " && // 多个 tab 前删除不形成代码块 https://github.com/Vanessa219/vditor/issues/162 1
                      a.textContent.charAt(h) !== "	") {
                        f = !1;
                        break;
                      }
                    o === 0 && (f = !1);
                    for (var u = !0, h = o - 1; h < a.textContent.length; h++)
                      if (a.textContent.charAt(h) !== " " && a.textContent.charAt(h) !== `
`) {
                        u = !1;
                        break;
                      }
                    u && /^#{1,6} $/.test(a.textContent) && (u = !1);
                    var S = (0, E.c)(getSelection().getRangeAt(0).startContainer);
                    if (S && S.textContent === "" && (Pe(t), S.remove()), f && a.getAttribute("data-type") !== "code-block" || u || Kt(a.innerHTML) || Vt(a.innerHTML) && a.previousElementSibling) {
                      typeof t.options.input == "function" && t.options.input(x(t));
                      return;
                    }
                    r.inputType === "insertParagraph" && n.element.innerHTML === "<p><br></p><p><br></p>" && a.previousElementSibling.remove(), wt(t, i, r);
                  }
                }
              }), this.element.addEventListener("click", function(r) {
                if (r.target.tagName === "INPUT") {
                  var i = r.target;
                  i.checked ? i.setAttribute("checked", "checked") : i.removeAttribute("checked"), n.preventInput = !0, getSelection().rangeCount > 0 && (0, M.jl)(getSelection().getRangeAt(0)), ce(t);
                  return;
                }
                if (r.target.tagName === "IMG" && // plantuml 图片渲染不进行提示
                !r.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
                  r.target.getAttribute("data-type") === "link-ref" ? en(t, r.target) : Fn(r, t);
                  return;
                }
                var a = (0, s._Y)(r.target, "A");
                if (a) {
                  t.options.link.click ? t.options.link.click(a) : t.options.link.isOpen && window.open(a.getAttribute("href")), r.preventDefault();
                  return;
                }
                var o = (0, M.RN)(t);
                if (r.target.isEqualNode(n.element) && n.element.lastElementChild && o.collapsed) {
                  var f = n.element.lastElementChild.getBoundingClientRect();
                  r.y > f.top + f.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(v.Y.ZWSP, "") === "" ? (o.selectNodeContents(n.element.lastElementChild), o.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", '<p data-block="0">'.concat(v.Y.ZWSP, "<wbr></p>")), (0, M.ir)(n.element, o)));
                }
                ze(t);
                var h = (0, s.KJ)(r.target, "vditor-wysiwyg__preview");
                h || (h = (0, s.KJ)((0, M.RN)(t).startContainer, "vditor-wysiwyg__preview")), h && ot(h, t), ht(r, t);
              }), this.element.addEventListener("keyup", function(r) {
                if (!(r.isComposing || (0, l._0)(r))) {
                  r.key === "Enter" && ye(t), (r.key === "Backspace" || r.key === "Delete") && t.wysiwyg.element.innerHTML !== "" && t.wysiwyg.element.childNodes.length === 1 && t.wysiwyg.element.firstElementChild && t.wysiwyg.element.firstElementChild.tagName === "P" && t.wysiwyg.element.firstElementChild.childElementCount === 0 && (t.wysiwyg.element.textContent === "" || t.wysiwyg.element.textContent === `
`) && (t.wysiwyg.element.innerHTML = "");
                  var i = (0, M.RN)(t);
                  if (r.key === "Backspace" && (0, l.gm)() && i.startContainer.textContent === `
` && i.startOffset === 1 && (i.startContainer.textContent = ""), Lt(t, i), ze(t), !(r.key !== "ArrowDown" && r.key !== "ArrowRight" && r.key !== "Backspace" && r.key !== "ArrowLeft" && r.key !== "ArrowUp")) {
                    (r.key === "ArrowLeft" || r.key === "ArrowRight") && t.hint.render(t);
                    var a = (0, s.KJ)(i.startContainer, "vditor-wysiwyg__preview");
                    if (!a && i.startContainer.nodeType !== 3 && i.startOffset > 0) {
                      var o = i.startContainer;
                      o.classList.contains("vditor-wysiwyg__block") && (a = o.lastElementChild);
                    }
                    if (a) {
                      var f = a.previousElementSibling;
                      if (f.style.display === "none") {
                        r.key === "ArrowDown" || r.key === "ArrowRight" ? ot(a, t) : ot(a, t, !1);
                        return;
                      }
                      var h = a.previousElementSibling;
                      if (h.tagName === "PRE" && (h = h.firstElementChild), r.key === "ArrowDown" || r.key === "ArrowRight") {
                        var o = a.parentElement, u = Yn(o);
                        if (u && u.nodeType !== 3) {
                          var S = u.querySelector(".vditor-wysiwyg__preview");
                          if (S) {
                            ot(S, t);
                            return;
                          }
                        }
                        if (u.nodeType === 3) {
                          for (; u.textContent.length === 0 && u.nextSibling; )
                            u = u.nextSibling;
                          i.setStart(u, 1);
                        } else
                          i.setStart(u.firstChild, 0);
                      } else
                        i.selectNodeContents(h), i.collapse(!1);
                    }
                  }
                }
              });
            }, e;
          }()
        ), Ei = function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
              r.__proto__ = i;
            } || function(r, i) {
              for (var a in i)
                Object.prototype.hasOwnProperty.call(i, a) && (r[a] = i[a]);
            }, e(t, n);
          };
          return function(t, n) {
            if (typeof n != "function" && n !== null)
              throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            e(t, n);
            function r() {
              this.constructor = t;
            }
            t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
          };
        }(), _i = (
          /** @class */
          function(e) {
            Ei(t, e);
            function t(n, r) {
              var i = e.call(this) || this;
              if (i.version = v.g, typeof n == "string") {
                if (r ? r.cache ? r.cache.id || (r.cache.id = "vditor".concat(n)) : r.cache = { id: "vditor".concat(n) } : r = {
                  cache: {
                    id: "vditor".concat(n)
                  }
                }, !document.getElementById(n))
                  return i.showErrorTip("Failed to get element by id: ".concat(n)), i;
                n = document.getElementById(n);
              }
              var a = new wi(r), o = a.merge();
              if (o.i18n)
                window.VditorI18n = o.i18n, i.init(n, o);
              else if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(o.lang)) {
                var f = "vditorI18nScript", h = f + o.lang;
                document.querySelectorAll('head script[id^="'.concat(f, '"]')).forEach(function(u) {
                  u.id !== h && document.head.removeChild(u);
                }), (0, A.Z)("".concat(o.cdn, "/dist/js/i18n/").concat(o.lang, ".js"), h).then(function() {
                  i.init(n, o);
                }).catch(function(u) {
                  i.showErrorTip("GET ".concat(o.cdn, "/dist/js/i18n/").concat(o.lang, ".js net::ERR_ABORTED 404 (Not Found)"));
                });
              } else
                throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
              return i;
            }
            return t.prototype.showErrorTip = function(n) {
              var r = new xn();
              document.body.appendChild(r.element), r.show(n, 0);
            }, t.prototype.updateToolbarConfig = function(n) {
              this.vditor.toolbar.updateConfig(this.vditor, n);
            }, t.prototype.setTheme = function(n, r, i, a) {
              this.vditor.options.theme = n, de(this.vditor), r && (this.vditor.options.preview.theme.current = r, (0, G.H)(r, a || this.vditor.options.preview.theme.path)), i && (this.vditor.options.preview.hljs.style = i, (0, Dn.h)(i, this.vditor.options.cdn));
            }, t.prototype.getValue = function() {
              return x(this.vditor);
            }, t.prototype.getCurrentMode = function() {
              return this.vditor.currentMode;
            }, t.prototype.focus = function() {
              this.vditor.currentMode === "sv" ? this.vditor.sv.element.focus() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.focus() : this.vditor.currentMode === "ir" && this.vditor.ir.element.focus();
            }, t.prototype.blur = function() {
              this.vditor.currentMode === "sv" ? this.vditor.sv.element.blur() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.blur() : this.vditor.currentMode === "ir" && this.vditor.ir.element.blur();
            }, t.prototype.disabled = function() {
              y(this.vditor, ["subToolbar", "hint", "popover"]), d(this.vditor.toolbar.elements, v.Y.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
            }, t.prototype.enable = function() {
              m(this.vditor.toolbar.elements, v.Y.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor.undo.resetIcon(this.vditor), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
            }, t.prototype.getSelection = function() {
              if (this.vditor.currentMode === "wysiwyg")
                return lt(this.vditor.wysiwyg.element);
              if (this.vditor.currentMode === "sv")
                return lt(this.vditor.sv.element);
              if (this.vditor.currentMode === "ir")
                return lt(this.vditor.ir.element);
            }, t.prototype.renderPreview = function(n) {
              this.vditor.preview.render(this.vditor, n);
            }, t.prototype.getCursorPosition = function() {
              return (0, M.Ey)(this.vditor[this.vditor.currentMode].element);
            }, t.prototype.isUploading = function() {
              return this.vditor.upload.isUploading;
            }, t.prototype.clearCache = function() {
              this.vditor.options.cache.enable && (0, l.D)() && localStorage.removeItem(this.vditor.options.cache.id);
            }, t.prototype.disabledCache = function() {
              this.vditor.options.cache.enable = !1;
            }, t.prototype.enableCache = function() {
              if (!this.vditor.options.cache.id)
                throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
              this.vditor.options.cache.enable = !0;
            }, t.prototype.html2md = function(n) {
              return this.vditor.lute.HTML2Md(n);
            }, t.prototype.exportJSON = function(n) {
              return this.vditor.lute.RenderJSON(n);
            }, t.prototype.getHTML = function() {
              return Ln(this.vditor);
            }, t.prototype.tip = function(n, r) {
              this.vditor.tip.show(n, r);
            }, t.prototype.setPreviewMode = function(n) {
              Wt(n, this.vditor);
            }, t.prototype.deleteValue = function() {
              window.getSelection().isCollapsed || document.execCommand("delete", !1);
            }, t.prototype.updateValue = function(n) {
              document.execCommand("insertHTML", !1, n);
            }, t.prototype.insertValue = function(n, r) {
              r === void 0 && (r = !0);
              var i = (0, M.RN)(this.vditor);
              i.collapse(!0);
              var a = document.createElement("template");
              a.innerHTML = n, i.insertNode(a.content.cloneNode(!0)), i.collapse(!1), this.vditor.currentMode === "sv" ? (this.vditor.sv.preventInput = !0, r && oe(this.vditor)) : this.vditor.currentMode === "wysiwyg" ? r && wt(this.vditor, getSelection().getRangeAt(0)) : this.vditor.currentMode === "ir" && (this.vditor.ir.preventInput = !0, r && Ye(this.vditor, getSelection().getRangeAt(0), !0));
            }, t.prototype.insertMD = function(n) {
              this.vditor.currentMode === "ir" ? (0, M.Z2)(this.vditor.lute.Md2VditorIRDOM(n), this.vditor) : this.vditor.currentMode === "wysiwyg" ? (0, M.Z2)(this.vditor.lute.Md2VditorDOM(n), this.vditor) : Pt(this.vditor, n), this.vditor.outline.render(this.vditor), Q(this.vditor);
            }, t.prototype.setValue = function(n, r) {
              var i = this;
              r === void 0 && (r = !1), this.vditor.currentMode === "sv" ? (this.vditor.sv.element.innerHTML = "<div data-block='0'>".concat(this.vditor.lute.SpinVditorSVDOM(n), "</div>"), ve(this.vditor, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              })) : this.vditor.currentMode === "wysiwyg" ? tn(this.vditor, n, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              }) : (this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(n), this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(a) {
                we(a, i.vditor);
              }), Ve(this.vditor, {
                enableAddUndoStack: !0,
                enableHint: !1,
                enableInput: !1
              })), this.vditor.outline.render(this.vditor), n || (y(this.vditor, ["emoji", "headings", "submenu", "hint"]), this.vditor.wysiwyg.popover && (this.vditor.wysiwyg.popover.style.display = "none"), this.clearCache()), r && this.clearStack();
            }, t.prototype.insertEmptyBlock = function(n) {
              ct(this.vditor, n);
            }, t.prototype.clearStack = function() {
              this.vditor.undo.clearStack(this.vditor), this.vditor.undo.addToUndoStack(this.vditor);
            }, t.prototype.destroy = function() {
              this.vditor.element.innerHTML = this.vditor.originalInnerHTML, this.vditor.element.classList.remove("vditor"), this.vditor.element.removeAttribute("style");
              var n = document.getElementById("vditorIconScript");
              n && n.remove(), this.clearCache(), Xt(), this.vditor.wysiwyg.unbindListener();
            }, t.prototype.getCommentIds = function() {
              return this.vditor.currentMode !== "wysiwyg" ? [] : this.vditor.wysiwyg.getComments(this.vditor, !0);
            }, t.prototype.hlCommentIds = function(n) {
              if (this.vditor.currentMode === "wysiwyg") {
                var r = function(i) {
                  i.classList.remove("vditor-comment--hover"), n.forEach(function(a) {
                    i.getAttribute("data-cmtids").indexOf(a) > -1 && i.classList.add("vditor-comment--hover");
                  });
                };
                this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                }), this.vditor.preview.element.style.display !== "none" && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                });
              }
            }, t.prototype.unHlCommentIds = function(n) {
              if (this.vditor.currentMode === "wysiwyg") {
                var r = function(i) {
                  n.forEach(function(a) {
                    i.getAttribute("data-cmtids").indexOf(a) > -1 && i.classList.remove("vditor-comment--hover");
                  });
                };
                this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                }), this.vditor.preview.element.style.display !== "none" && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(i) {
                  r(i);
                });
              }
            }, t.prototype.removeCommentIds = function(n) {
              var r = this;
              if (this.vditor.currentMode === "wysiwyg") {
                var i = function(a, o) {
                  var f = a.getAttribute("data-cmtids").split(" ");
                  f.find(function(h, u) {
                    if (h === o)
                      return f.splice(u, 1), !0;
                  }), f.length === 0 ? (a.outerHTML = a.innerHTML, (0, M.RN)(r.vditor).collapse(!0)) : a.setAttribute("data-cmtids", f.join(" "));
                };
                n.forEach(function(a) {
                  r.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(o) {
                    i(o, a);
                  }), r.vditor.preview.element.style.display !== "none" && r.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(o) {
                    i(o, a);
                  });
                }), ce(this.vditor, {
                  enableAddUndoStack: !0,
                  enableHint: !1,
                  enableInput: !1
                });
              }
            }, t.prototype.init = function(n, r) {
              var i = this;
              this.vditor = {
                currentMode: r.mode,
                element: n,
                hint: new dr(r.hint.extend),
                lute: void 0,
                options: r,
                originalInnerHTML: n.innerHTML,
                outline: new mr(window.VditorI18n.outline),
                tip: new xn()
              }, this.vditor.sv = new wr(this.vditor), this.vditor.undo = new yi(), this.vditor.wysiwyg = new vi(this.vditor), this.vditor.ir = new pr(this.vditor), this.vditor.toolbar = new mi(this.vditor), r.resize.enable && (this.vditor.resize = new br(this.vditor)), this.vditor.toolbar.elements.devtools && (this.vditor.devtools = new c()), (r.upload.url || r.upload.handler) && (this.vditor.upload = new tr()), (0, A.Z)(r._lutePath || "".concat(r.cdn, "/dist/js/lute/lute.min.js"), "vditorLuteScript").then(function() {
                i.vditor.lute = (0, hr.X)({
                  autoSpace: i.vditor.options.preview.markdown.autoSpace,
                  gfmAutoLink: i.vditor.options.preview.markdown.gfmAutoLink,
                  codeBlockPreview: i.vditor.options.preview.markdown.codeBlockPreview,
                  emojiSite: i.vditor.options.hint.emojiPath,
                  emojis: i.vditor.options.hint.emoji,
                  fixTermTypo: i.vditor.options.preview.markdown.fixTermTypo,
                  footnotes: i.vditor.options.preview.markdown.footnotes,
                  headingAnchor: !1,
                  inlineMathDigit: i.vditor.options.preview.math.inlineDigit,
                  linkBase: i.vditor.options.preview.markdown.linkBase,
                  linkPrefix: i.vditor.options.preview.markdown.linkPrefix,
                  listStyle: i.vditor.options.preview.markdown.listStyle,
                  mark: i.vditor.options.preview.markdown.mark,
                  mathBlockPreview: i.vditor.options.preview.markdown.mathBlockPreview,
                  paragraphBeginningSpace: i.vditor.options.preview.markdown.paragraphBeginningSpace,
                  sanitize: i.vditor.options.preview.markdown.sanitize,
                  toc: i.vditor.options.preview.markdown.toc
                }), i.vditor.preview = new yr(i.vditor), xe(i.vditor), r.after && r.after(), r.icon && (0, A.U)("".concat(r.cdn, "/dist/js/icons/").concat(r.icon, ".js"), "vditorIconScript");
              });
            }, t;
          }(z.default)
        );
        const Si = _i;
      })(), Fe = Fe.default, Fe;
    })()
  ));
})(Ni, kt);
const Ri = /* @__PURE__ */ Oi(kt);
const ji = /* @__PURE__ */ Di("div", { id: "vditor" }, null, -1), qi = /* @__PURE__ */ Ti({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 600
    },
    mode: {
      type: String,
      default: "wysiwyg"
    }
  },
  emits: ["update:modelValue", "handleBlur"],
  setup(it, { emit: Gt }) {
    const Ge = it, Je = Ci({
      get() {
        return Ge.modelValue;
      },
      set(x) {
        Gt("update:modelValue", x);
      }
    }), X = Zt(null), Fe = Zt(null), z = Zt(null);
    Mi(() => {
      z.value = new Ri("vditor", {
        height: Ge.height,
        after: () => {
          z.value.setValue(Je.value);
        },
        mode: Ge.mode,
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "|",
          "line",
          "quote",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          {
            name: "image",
            tip: "插入图片",
            icon: '<svg t="1743135560768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32640" width="200" height="200"><path d="M734.608696 155.826087a200.347826 200.347826 0 0 1 200.347826 200.347826v311.652174c0 32.122435-7.568696 62.464-20.992 89.35513L410.000696 461.401043a100.173913 100.173913 0 0 0-111.549218 6.811827L89.043478 628.357565V356.173913a200.347826 200.347826 0 0 1 200.347826-200.347826h445.217392zM376.208696 518.989913L874.362435 811.408696A199.68 199.68 0 0 1 734.608696 868.173913H289.391304c-96.478609 0-177.040696-68.185043-196.073739-159.009391l245.693218-187.881739a33.391304 33.391304 0 0 1 37.175652-2.29287zM289.391304 89.043478C141.868522 89.043478 22.26087 208.65113 22.26087 356.173913v311.652174c0 147.522783 119.607652 267.130435 267.130434 267.130435h445.217392c147.522783 0 267.130435-119.607652 267.130434-267.130435V356.173913c0-147.522783-119.607652-267.130435-267.130434-267.130435H289.391304z m445.217392 356.173913a89.043478 89.043478 0 1 0 0-178.086956 89.043478 89.043478 0 0 0 0 178.086956z" fill="#333333" p-id="32641"></path></svg>',
            click: () => {
              X.value.showDialog = !0;
            }
          },
          {
            name: "video",
            tip: "插入视频",
            icon: '<svg t="1743136124938" class="icon" viewBox="0 0 1256 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34055" width="200" height="200"><path d="M201.681455 74.472727a111.709091 111.709091 0 0 0-111.709091 111.709091v651.636364a111.709091 111.709091 0 0 0 111.709091 111.709091h837.818181a111.709091 111.709091 0 0 0 111.709091-111.709091V186.181818a111.709091 111.709091 0 0 0-111.709091-111.709091h-837.818181z m0-74.472727h837.818181a186.181818 186.181818 0 0 1 186.181819 186.181818v651.636364a186.181818 186.181818 0 0 1-186.181819 186.181818h-837.818181a186.181818 186.181818 0 0 1-186.181819-186.181818V186.181818a186.181818 186.181818 0 0 1 186.181819-186.181818zM798.72 533.085091a9.309091 9.309091 0 0 0-1.861818-13.032727l-248.226909-186.181819a9.309091 9.309091 0 0 0-14.894546 7.447273v372.363637a9.309091 9.309091 0 0 0 14.894546 7.447272l248.226909-186.181818a9.309091 9.309091 0 0 0 1.861818-1.861818z m-205.405091 247.621818a83.781818 83.781818 0 0 1-134.050909-67.025454v-372.363637a83.781818 83.781818 0 0 1 134.050909-67.025454l248.226909 186.181818a83.781818 83.781818 0 0 1 0 134.050909l-248.226909 186.181818z" fill="#000000" p-id="34056"></path></svg>',
            click: () => {
              Fe.value.showDialog = !0;
            }
          },
          "code",
          "inline-code",
          "insert-after",
          "insert-before ",
          "undo",
          "redo",
          "link",
          "table",
          "record",
          "edit-mode",
          "both",
          "preview",
          "fullscreen",
          "outline",
          "code-theme",
          "content-theme",
          "export",
          "br"
        ],
        blur: () => {
          Je.value = z.value.getValue();
        }
      });
    });
    const v = (x) => {
      x.forEach((A) => {
        z.value.insertValue(`![描述](${Bn(A.url)})`);
      });
    }, T = (x) => {
      z.value.insertValue(`<video src="${Bn(x.url)}">`);
    };
    return (x, A) => {
      const c = ki("upload-attachment");
      return Li(), Ai(xi, null, [
        ji,
        Pn(c, {
          type: "image",
          ref_key: "imageRef",
          ref: X,
          limit: "",
          onConfirm: v
        }, null, 512),
        Pn(c, {
          type: "video",
          ref_key: "videoRef",
          ref: Fe,
          onConfirm: T
        }, null, 512)
      ], 64);
    };
  }
});
export {
  qi as default
};
