import { defineComponent as At, h as gn, getCurrentInstance as Qe, effectScope as na, inject as aa, onMounted as ra, onUnmounted as la, shallowRef as Ln, ref as Ae, computed as oe, onBeforeMount as sa, watch as Et, Fragment as Nn, isRef as ca, createVNode as oa, Text as ia } from "vue";
/*!
  * shared v9.14.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function ua(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const lt = typeof window < "u", Le = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), fa = (e, t, n) => _a({ l: e, k: t, s: n }), _a = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), K = (e) => typeof e == "number" && isFinite(e), ma = (e) => In(e) === "[object Date]", ge = (e) => In(e) === "[object RegExp]", ct = (e) => F(e) && Object.keys(e).length === 0, q = Object.assign, da = Object.create, H = (e = null) => da(e);
let wt;
const me = () => wt || (wt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : H());
function Wt(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function $t(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ea(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (r, l, a) => `${l}="${$t(a)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (r, l, a) => `${l}='${$t(a)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((r) => {
    e = e.replace(r, "$1javascript&#58;");
  }), e;
}
const ga = Object.prototype.hasOwnProperty;
function le(e, t) {
  return ga.call(e, t);
}
const G = Array.isArray, x = (e) => typeof e == "function", p = (e) => typeof e == "string", w = (e) => typeof e == "boolean", $ = (e) => e !== null && typeof e == "object", La = (e) => $(e) && x(e.then) && x(e.catch), Tn = Object.prototype.toString, In = (e) => Tn.call(e), F = (e) => {
  if (!$(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, Na = (e) => e == null ? "" : G(e) || F(e) && e.toString === Tn ? JSON.stringify(e, null, 2) : String(e);
function Ta(e, t = "") {
  return e.reduce((n, r, l) => l === 0 ? n + r : n + t + r, "");
}
function ot(e) {
  let t = e;
  return () => ++t;
}
const nt = (e) => !$(e) || G(e);
function rt(e, t) {
  if (nt(e) || nt(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: l } = n.pop();
    Object.keys(r).forEach((a) => {
      a !== "__proto__" && ($(r[a]) && !$(l[a]) && (l[a] = Array.isArray(r[a]) ? [] : H()), nt(l[a]) || nt(r[a]) ? l[a] = r[a] : n.push({ src: r[a], des: l[a] }));
    });
  }
}
/*!
  * message-compiler v9.14.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ia(e, t, n) {
  return { line: e, column: t, offset: n };
}
function st(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const ba = /\{([0-9a-zA-Z]+)\}/g;
function bn(e, ...t) {
  return t.length === 1 && Oa(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(ba, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const On = Object.assign, Vt = (e) => typeof e == "string", Oa = (e) => e !== null && typeof e == "object";
function hn(e, t = "") {
  return e.reduce((n, r, l) => l === 0 ? n + r : n + t + r, "");
}
const kt = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
}, ha = {
  [kt.USE_MODULO_SYNTAX]: "Use modulo before '{{0}}'."
};
function pa(e, t, ...n) {
  const r = bn(ha[e] || "", ...n || []), l = { message: String(r), code: e };
  return t && (l.location = t), l;
}
const D = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, Ca = {
  // tokenizer error messages
  [D.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [D.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [D.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [D.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [D.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [D.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [D.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [D.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [D.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [D.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [D.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [D.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [D.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [D.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [D.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [D.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function De(e, t, n = {}) {
  const { domain: r, messages: l, args: a } = n, c = bn((l || Ca)[e] || "", ...a || []), i = new SyntaxError(String(c));
  return i.code = e, t && (i.location = t), i.domain = r, i;
}
function Pa(e) {
  throw e;
}
const fe = " ", va = "\r", z = `
`, Aa = String.fromCharCode(8232), ka = String.fromCharCode(8233);
function ya(e) {
  const t = e;
  let n = 0, r = 1, l = 1, a = 0;
  const c = (h) => t[h] === va && t[h + 1] === z, i = (h) => t[h] === z, u = (h) => t[h] === ka, m = (h) => t[h] === Aa, I = (h) => c(h) || i(h) || u(h) || m(h), T = () => n, g = () => r, C = () => l, y = () => a, S = (h) => c(h) || u(h) || m(h) ? z : t[h], v = () => S(n), A = () => S(n + a);
  function U() {
    return a = 0, I(n) && (r++, l = 0), c(n) && n++, n++, l++, t[n];
  }
  function _() {
    return c(n + a) && a++, a++, t[n + a];
  }
  function d() {
    n = 0, r = 1, l = 1, a = 0;
  }
  function b(h = 0) {
    a = h;
  }
  function L() {
    const h = n + a;
    for (; h !== n; )
      U();
    a = 0;
  }
  return {
    index: T,
    line: g,
    column: C,
    peekOffset: y,
    charAt: S,
    currentChar: v,
    currentPeek: A,
    next: U,
    peek: _,
    reset: d,
    resetPeek: b,
    skipToPeek: L
  };
}
const Ee = void 0, Sa = ".", Ht = "'", Ra = "tokenizer";
function Da(e, t = {}) {
  const n = t.location !== !1, r = ya(e), l = () => r.index(), a = () => Ia(r.line(), r.column(), r.index()), c = a(), i = l(), u = {
    currentType: 14,
    offset: i,
    startLoc: c,
    endLoc: c,
    lastType: 14,
    lastOffset: i,
    lastStartLoc: c,
    lastEndLoc: c,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, m = () => u, { onError: I } = t;
  function T(s, o, E, ...R) {
    const X = m();
    if (o.column += E, o.offset += E, I) {
      const M = n ? st(X.startLoc, o) : null, f = De(s, M, {
        domain: Ra,
        args: R
      });
      I(f);
    }
  }
  function g(s, o, E) {
    s.endLoc = a(), s.currentType = o;
    const R = { type: o };
    return n && (R.loc = st(s.startLoc, s.endLoc)), E != null && (R.value = E), R;
  }
  const C = (s) => g(
    s,
    14
    /* TokenTypes.EOF */
  );
  function y(s, o) {
    return s.currentChar() === o ? (s.next(), o) : (T(D.EXPECTED_TOKEN, a(), 0, o), "");
  }
  function S(s) {
    let o = "";
    for (; s.currentPeek() === fe || s.currentPeek() === z; )
      o += s.currentPeek(), s.peek();
    return o;
  }
  function v(s) {
    const o = S(s);
    return s.skipToPeek(), o;
  }
  function A(s) {
    if (s === Ee)
      return !1;
    const o = s.charCodeAt(0);
    return o >= 97 && o <= 122 || // a-z
    o >= 65 && o <= 90 || // A-Z
    o === 95;
  }
  function U(s) {
    if (s === Ee)
      return !1;
    const o = s.charCodeAt(0);
    return o >= 48 && o <= 57;
  }
  function _(s, o) {
    const { currentType: E } = o;
    if (E !== 2)
      return !1;
    S(s);
    const R = A(s.currentPeek());
    return s.resetPeek(), R;
  }
  function d(s, o) {
    const { currentType: E } = o;
    if (E !== 2)
      return !1;
    S(s);
    const R = s.currentPeek() === "-" ? s.peek() : s.currentPeek(), X = U(R);
    return s.resetPeek(), X;
  }
  function b(s, o) {
    const { currentType: E } = o;
    if (E !== 2)
      return !1;
    S(s);
    const R = s.currentPeek() === Ht;
    return s.resetPeek(), R;
  }
  function L(s, o) {
    const { currentType: E } = o;
    if (E !== 8)
      return !1;
    S(s);
    const R = s.currentPeek() === ".";
    return s.resetPeek(), R;
  }
  function h(s, o) {
    const { currentType: E } = o;
    if (E !== 9)
      return !1;
    S(s);
    const R = A(s.currentPeek());
    return s.resetPeek(), R;
  }
  function k(s, o) {
    const { currentType: E } = o;
    if (!(E === 8 || E === 12))
      return !1;
    S(s);
    const R = s.currentPeek() === ":";
    return s.resetPeek(), R;
  }
  function P(s, o) {
    const { currentType: E } = o;
    if (E !== 10)
      return !1;
    const R = () => {
      const M = s.currentPeek();
      return M === "{" ? A(s.peek()) : M === "@" || M === "%" || M === "|" || M === ":" || M === "." || M === fe || !M ? !1 : M === z ? (s.peek(), R()) : W(s, !1);
    }, X = R();
    return s.resetPeek(), X;
  }
  function B(s) {
    S(s);
    const o = s.currentPeek() === "|";
    return s.resetPeek(), o;
  }
  function te(s) {
    const o = S(s), E = s.currentPeek() === "%" && s.peek() === "{";
    return s.resetPeek(), {
      isModulo: E,
      hasSpace: o.length > 0
    };
  }
  function W(s, o = !0) {
    const E = (X = !1, M = "", f = !1) => {
      const N = s.currentPeek();
      return N === "{" ? M === "%" ? !1 : X : N === "@" || !N ? M === "%" ? !0 : X : N === "%" ? (s.peek(), E(X, "%", !0)) : N === "|" ? M === "%" || f ? !0 : !(M === fe || M === z) : N === fe ? (s.peek(), E(!0, fe, f)) : N === z ? (s.peek(), E(!0, z, f)) : !0;
    }, R = E();
    return o && s.resetPeek(), R;
  }
  function Z(s, o) {
    const E = s.currentChar();
    return E === Ee ? Ee : o(E) ? (s.next(), E) : null;
  }
  function Fe(s) {
    const o = s.charCodeAt(0);
    return o >= 97 && o <= 122 || // a-z
    o >= 65 && o <= 90 || // A-Z
    o >= 48 && o <= 57 || // 0-9
    o === 95 || // _
    o === 36;
  }
  function Me(s) {
    return Z(s, Fe);
  }
  function ce(s) {
    const o = s.charCodeAt(0);
    return o >= 97 && o <= 122 || // a-z
    o >= 65 && o <= 90 || // A-Z
    o >= 48 && o <= 57 || // 0-9
    o === 95 || // _
    o === 36 || // $
    o === 45;
  }
  function Ue(s) {
    return Z(s, ce);
  }
  function we(s) {
    const o = s.charCodeAt(0);
    return o >= 48 && o <= 57;
  }
  function We(s) {
    return Z(s, we);
  }
  function $e(s) {
    const o = s.charCodeAt(0);
    return o >= 48 && o <= 57 || // 0-9
    o >= 65 && o <= 70 || // A-F
    o >= 97 && o <= 102;
  }
  function ae(s) {
    return Z(s, $e);
  }
  function Ie(s) {
    let o = "", E = "";
    for (; o = We(s); )
      E += o;
    return E;
  }
  function Ve(s) {
    v(s);
    const o = s.currentChar();
    return o !== "%" && T(D.EXPECTED_TOKEN, a(), 0, o), s.next(), "%";
  }
  function he(s) {
    let o = "";
    for (; ; ) {
      const E = s.currentChar();
      if (E === "{" || E === "}" || E === "@" || E === "|" || !E)
        break;
      if (E === "%")
        if (W(s))
          o += E, s.next();
        else
          break;
      else if (E === fe || E === z)
        if (W(s))
          o += E, s.next();
        else {
          if (B(s))
            break;
          o += E, s.next();
        }
      else
        o += E, s.next();
    }
    return o;
  }
  function He(s) {
    v(s);
    let o = "", E = "";
    for (; o = Ue(s); )
      E += o;
    return s.currentChar() === Ee && T(D.UNTERMINATED_CLOSING_BRACE, a(), 0), E;
  }
  function Ye(s) {
    v(s);
    let o = "";
    return s.currentChar() === "-" ? (s.next(), o += `-${Ie(s)}`) : o += Ie(s), s.currentChar() === Ee && T(D.UNTERMINATED_CLOSING_BRACE, a(), 0), o;
  }
  function et(s) {
    return s !== Ht && s !== z;
  }
  function xe(s) {
    v(s), y(s, "'");
    let o = "", E = "";
    for (; o = Z(s, et); )
      o === "\\" ? E += Ge(s) : E += o;
    const R = s.currentChar();
    return R === z || R === Ee ? (T(D.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), R === z && (s.next(), y(s, "'")), E) : (y(s, "'"), E);
  }
  function Ge(s) {
    const o = s.currentChar();
    switch (o) {
      case "\\":
      case "'":
        return s.next(), `\\${o}`;
      case "u":
        return pe(s, o, 4);
      case "U":
        return pe(s, o, 6);
      default:
        return T(D.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, o), "";
    }
  }
  function pe(s, o, E) {
    y(s, o);
    let R = "";
    for (let X = 0; X < E; X++) {
      const M = ae(s);
      if (!M) {
        T(D.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${o}${R}${s.currentChar()}`);
        break;
      }
      R += M;
    }
    return `\\${o}${R}`;
  }
  function Xe(s) {
    return s !== "{" && s !== "}" && s !== fe && s !== z;
  }
  function je(s) {
    v(s);
    let o = "", E = "";
    for (; o = Z(s, Xe); )
      E += o;
    return E;
  }
  function Ke(s) {
    let o = "", E = "";
    for (; o = Me(s); )
      E += o;
    return E;
  }
  function O(s) {
    const o = (E) => {
      const R = s.currentChar();
      return R === "{" || R === "%" || R === "@" || R === "|" || R === "(" || R === ")" || !R || R === fe ? E : (E += R, s.next(), o(E));
    };
    return o("");
  }
  function V(s) {
    v(s);
    const o = y(
      s,
      "|"
      /* TokenChars.Pipe */
    );
    return v(s), o;
  }
  function Ce(s, o) {
    let E = null;
    switch (s.currentChar()) {
      case "{":
        return o.braceNest >= 1 && T(D.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), s.next(), E = g(
          o,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), v(s), o.braceNest++, E;
      case "}":
        return o.braceNest > 0 && o.currentType === 2 && T(D.EMPTY_PLACEHOLDER, a(), 0), s.next(), E = g(
          o,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), o.braceNest--, o.braceNest > 0 && v(s), o.inLinked && o.braceNest === 0 && (o.inLinked = !1), E;
      case "@":
        return o.braceNest > 0 && T(D.UNTERMINATED_CLOSING_BRACE, a(), 0), E = Pe(s, o) || C(o), o.braceNest = 0, E;
      default: {
        let X = !0, M = !0, f = !0;
        if (B(s))
          return o.braceNest > 0 && T(D.UNTERMINATED_CLOSING_BRACE, a(), 0), E = g(o, 1, V(s)), o.braceNest = 0, o.inLinked = !1, E;
        if (o.braceNest > 0 && (o.currentType === 5 || o.currentType === 6 || o.currentType === 7))
          return T(D.UNTERMINATED_CLOSING_BRACE, a(), 0), o.braceNest = 0, Be(s, o);
        if (X = _(s, o))
          return E = g(o, 5, He(s)), v(s), E;
        if (M = d(s, o))
          return E = g(o, 6, Ye(s)), v(s), E;
        if (f = b(s, o))
          return E = g(o, 7, xe(s)), v(s), E;
        if (!X && !M && !f)
          return E = g(o, 13, je(s)), T(D.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, E.value), v(s), E;
        break;
      }
    }
    return E;
  }
  function Pe(s, o) {
    const { currentType: E } = o;
    let R = null;
    const X = s.currentChar();
    switch ((E === 8 || E === 9 || E === 12 || E === 10) && (X === z || X === fe) && T(D.INVALID_LINKED_FORMAT, a(), 0), X) {
      case "@":
        return s.next(), R = g(
          o,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), o.inLinked = !0, R;
      case ".":
        return v(s), s.next(), g(
          o,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return v(s), s.next(), g(
          o,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return B(s) ? (R = g(o, 1, V(s)), o.braceNest = 0, o.inLinked = !1, R) : L(s, o) || k(s, o) ? (v(s), Pe(s, o)) : h(s, o) ? (v(s), g(o, 12, Ke(s))) : P(s, o) ? (v(s), X === "{" ? Ce(s, o) || R : g(o, 11, O(s))) : (E === 8 && T(D.INVALID_LINKED_FORMAT, a(), 0), o.braceNest = 0, o.inLinked = !1, Be(s, o));
    }
  }
  function Be(s, o) {
    let E = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (o.braceNest > 0)
      return Ce(s, o) || C(o);
    if (o.inLinked)
      return Pe(s, o) || C(o);
    switch (s.currentChar()) {
      case "{":
        return Ce(s, o) || C(o);
      case "}":
        return T(D.UNBALANCED_CLOSING_BRACE, a(), 0), s.next(), g(
          o,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Pe(s, o) || C(o);
      default: {
        if (B(s))
          return E = g(o, 1, V(s)), o.braceNest = 0, o.inLinked = !1, E;
        const { isModulo: X, hasSpace: M } = te(s);
        if (X)
          return M ? g(o, 0, he(s)) : g(o, 4, Ve(s));
        if (W(s))
          return g(o, 0, he(s));
        break;
      }
    }
    return E;
  }
  function ft() {
    const { currentType: s, offset: o, startLoc: E, endLoc: R } = u;
    return u.lastType = s, u.lastOffset = o, u.lastStartLoc = E, u.lastEndLoc = R, u.offset = l(), u.startLoc = a(), r.currentChar() === Ee ? g(
      u,
      14
      /* TokenTypes.EOF */
    ) : Be(r, u);
  }
  return {
    nextToken: ft,
    currentOffset: l,
    currentPosition: a,
    context: m
  };
}
const Fa = "parser", Ma = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Ua(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function wa(e = {}) {
  const t = e.location !== !1, { onError: n, onWarn: r } = e;
  function l(_, d, b, L, ...h) {
    const k = _.currentPosition();
    if (k.offset += L, k.column += L, n) {
      const P = t ? st(b, k) : null, B = De(d, P, {
        domain: Fa,
        args: h
      });
      n(B);
    }
  }
  function a(_, d, b, L, ...h) {
    const k = _.currentPosition();
    if (k.offset += L, k.column += L, r) {
      const P = t ? st(b, k) : null;
      r(pa(d, P, h));
    }
  }
  function c(_, d, b) {
    const L = { type: _ };
    return t && (L.start = d, L.end = d, L.loc = { start: b, end: b }), L;
  }
  function i(_, d, b, L) {
    L && (_.type = L), t && (_.end = d, _.loc && (_.loc.end = b));
  }
  function u(_, d) {
    const b = _.context(), L = c(3, b.offset, b.startLoc);
    return L.value = d, i(L, _.currentOffset(), _.currentPosition()), L;
  }
  function m(_, d) {
    const b = _.context(), { lastOffset: L, lastStartLoc: h } = b, k = c(5, L, h);
    return k.index = parseInt(d, 10), _.nextToken(), i(k, _.currentOffset(), _.currentPosition()), k;
  }
  function I(_, d, b) {
    const L = _.context(), { lastOffset: h, lastStartLoc: k } = L, P = c(4, h, k);
    return P.key = d, b === !0 && (P.modulo = !0), _.nextToken(), i(P, _.currentOffset(), _.currentPosition()), P;
  }
  function T(_, d) {
    const b = _.context(), { lastOffset: L, lastStartLoc: h } = b, k = c(9, L, h);
    return k.value = d.replace(Ma, Ua), _.nextToken(), i(k, _.currentOffset(), _.currentPosition()), k;
  }
  function g(_) {
    const d = _.nextToken(), b = _.context(), { lastOffset: L, lastStartLoc: h } = b, k = c(8, L, h);
    return d.type !== 12 ? (l(_, D.UNEXPECTED_EMPTY_LINKED_MODIFIER, b.lastStartLoc, 0), k.value = "", i(k, L, h), {
      nextConsumeToken: d,
      node: k
    }) : (d.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, re(d)), k.value = d.value || "", i(k, _.currentOffset(), _.currentPosition()), {
      node: k
    });
  }
  function C(_, d) {
    const b = _.context(), L = c(7, b.offset, b.startLoc);
    return L.value = d, i(L, _.currentOffset(), _.currentPosition()), L;
  }
  function y(_) {
    const d = _.context(), b = c(6, d.offset, d.startLoc);
    let L = _.nextToken();
    if (L.type === 9) {
      const h = g(_);
      b.modifier = h.node, L = h.nextConsumeToken || _.nextToken();
    }
    switch (L.type !== 10 && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(L)), L = _.nextToken(), L.type === 2 && (L = _.nextToken()), L.type) {
      case 11:
        L.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(L)), b.key = C(_, L.value || "");
        break;
      case 5:
        L.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(L)), b.key = I(_, L.value || "");
        break;
      case 6:
        L.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(L)), b.key = m(_, L.value || "");
        break;
      case 7:
        L.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(L)), b.key = T(_, L.value || "");
        break;
      default: {
        l(_, D.UNEXPECTED_EMPTY_LINKED_KEY, d.lastStartLoc, 0);
        const h = _.context(), k = c(7, h.offset, h.startLoc);
        return k.value = "", i(k, h.offset, h.startLoc), b.key = k, i(b, h.offset, h.startLoc), {
          nextConsumeToken: L,
          node: b
        };
      }
    }
    return i(b, _.currentOffset(), _.currentPosition()), {
      node: b
    };
  }
  function S(_) {
    const d = _.context(), b = d.currentType === 1 ? _.currentOffset() : d.offset, L = d.currentType === 1 ? d.endLoc : d.startLoc, h = c(2, b, L);
    h.items = [];
    let k = null, P = null;
    do {
      const W = k || _.nextToken();
      switch (k = null, W.type) {
        case 0:
          W.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(W)), h.items.push(u(_, W.value || ""));
          break;
        case 6:
          W.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(W)), h.items.push(m(_, W.value || ""));
          break;
        case 4:
          P = !0;
          break;
        case 5:
          W.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(W)), h.items.push(I(_, W.value || "", !!P)), P && (a(_, kt.USE_MODULO_SYNTAX, d.lastStartLoc, 0, re(W)), P = null);
          break;
        case 7:
          W.value == null && l(_, D.UNEXPECTED_LEXICAL_ANALYSIS, d.lastStartLoc, 0, re(W)), h.items.push(T(_, W.value || ""));
          break;
        case 8: {
          const Z = y(_);
          h.items.push(Z.node), k = Z.nextConsumeToken || null;
          break;
        }
      }
    } while (d.currentType !== 14 && d.currentType !== 1);
    const B = d.currentType === 1 ? d.lastOffset : _.currentOffset(), te = d.currentType === 1 ? d.lastEndLoc : _.currentPosition();
    return i(h, B, te), h;
  }
  function v(_, d, b, L) {
    const h = _.context();
    let k = L.items.length === 0;
    const P = c(1, d, b);
    P.cases = [], P.cases.push(L);
    do {
      const B = S(_);
      k || (k = B.items.length === 0), P.cases.push(B);
    } while (h.currentType !== 14);
    return k && l(_, D.MUST_HAVE_MESSAGES_IN_PLURAL, b, 0), i(P, _.currentOffset(), _.currentPosition()), P;
  }
  function A(_) {
    const d = _.context(), { offset: b, startLoc: L } = d, h = S(_);
    return d.currentType === 14 ? h : v(_, b, L, h);
  }
  function U(_) {
    const d = Da(_, On({}, e)), b = d.context(), L = c(0, b.offset, b.startLoc);
    return t && L.loc && (L.loc.source = _), L.body = A(d), e.onCacheKey && (L.cacheKey = e.onCacheKey(_)), b.currentType !== 14 && l(d, D.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, _[b.offset] || ""), i(L, d.currentOffset(), d.currentPosition()), L;
  }
  return { parse: U };
}
function re(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Wa(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function Yt(e, t) {
  for (let n = 0; n < e.length; n++)
    yt(e[n], t);
}
function yt(e, t) {
  switch (e.type) {
    case 1:
      Yt(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Yt(e.items, t);
      break;
    case 6: {
      yt(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function $a(e, t = {}) {
  const n = Wa(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && yt(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function Va(e) {
  const t = e.body;
  return t.type === 2 ? xt(t) : t.cases.forEach((n) => xt(n)), e;
}
function xt(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = hn(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const Ha = "minifier";
function ke(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      ke(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        ke(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        ke(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      ke(t.key), t.k = t.key, delete t.key, t.modifier && (ke(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
    default:
      throw De(D.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: Ha,
        args: [e.type]
      });
  }
  delete e.type;
}
const Ya = "parser";
function xa(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: l, needIndent: a } = t, c = t.location !== !1, i = {
    filename: r,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: l,
    needIndent: a,
    indentLevel: 0
  };
  c && e.loc && (i.source = e.loc.source);
  const u = () => i;
  function m(v, A) {
    i.code += v;
  }
  function I(v, A = !0) {
    const U = A ? l : "";
    m(a ? U + "  ".repeat(v) : U);
  }
  function T(v = !0) {
    const A = ++i.indentLevel;
    v && I(A);
  }
  function g(v = !0) {
    const A = --i.indentLevel;
    v && I(A);
  }
  function C() {
    I(i.indentLevel);
  }
  return {
    context: u,
    push: m,
    indent: T,
    deindent: g,
    newline: C,
    helper: (v) => `_${v}`,
    needIndent: () => i.needIndent
  };
}
function Ga(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Se(e, t.key), t.modifier ? (e.push(", "), Se(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Xa(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const l = t.items.length;
  for (let a = 0; a < l && (Se(e, t.items[a]), a !== l - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function ja(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const l = t.cases.length;
    for (let a = 0; a < l && (Se(e, t.cases[a]), a !== l - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Ka(e, t) {
  t.body ? Se(e, t.body) : e.push("null");
}
function Se(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Ka(e, t);
      break;
    case 1:
      ja(e, t);
      break;
    case 2:
      Xa(e, t);
      break;
    case 6:
      Ga(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
    default:
      throw De(D.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: Ya,
        args: [t.type]
      });
  }
}
const Ba = (e, t = {}) => {
  const n = Vt(t.mode) ? t.mode : "normal", r = Vt(t.filename) ? t.filename : "message.intl", l = !!t.sourceMap, a = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, c = t.needIndent ? t.needIndent : n !== "arrow", i = e.helpers || [], u = xa(e, {
    mode: n,
    filename: r,
    sourceMap: l,
    breakLineCode: a,
    needIndent: c
  });
  u.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), u.indent(c), i.length > 0 && (u.push(`const { ${hn(i.map((T) => `${T}: _${T}`), ", ")} } = ctx`), u.newline()), u.push("return "), Se(u, e), u.deindent(c), u.push("}"), delete e.helpers;
  const { code: m, map: I } = u.context();
  return {
    ast: e,
    code: m,
    map: I ? I.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Ja(e, t = {}) {
  const n = On({}, t), r = !!n.jit, l = !!n.minify, a = n.optimize == null ? !0 : n.optimize, i = wa(n).parse(e);
  return r ? (a && Va(i), l && ke(i), { ast: i, code: "" }) : ($a(i, n), Ba(i, n));
}
/*!
  * core-base v9.14.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Qa() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (me().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (me().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (me().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function ue(e) {
  return $(e) && St(e) === 0 && (le(e, "b") || le(e, "body"));
}
const pn = ["b", "body"];
function qa(e) {
  return Ne(e, pn);
}
const Cn = ["c", "cases"];
function Za(e) {
  return Ne(e, Cn, []);
}
const Pn = ["s", "static"];
function za(e) {
  return Ne(e, Pn);
}
const vn = ["i", "items"];
function er(e) {
  return Ne(e, vn, []);
}
const An = ["t", "type"];
function St(e) {
  return Ne(e, An);
}
const kn = ["v", "value"];
function at(e, t) {
  const n = Ne(e, kn);
  if (n != null)
    return n;
  throw qe(t);
}
const yn = ["m", "modifier"];
function tr(e) {
  return Ne(e, yn);
}
const Sn = ["k", "key"];
function nr(e) {
  const t = Ne(e, Sn);
  if (t)
    return t;
  throw qe(
    6
    /* NodeTypes.Linked */
  );
}
function Ne(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    if (le(e, l) && e[l] != null)
      return e[l];
  }
  return n;
}
const Rn = [
  ...pn,
  ...Cn,
  ...Pn,
  ...vn,
  ...Sn,
  ...yn,
  ...kn,
  ...An
];
function qe(e) {
  return new Error(`unhandled node type: ${e}`);
}
const Te = [];
Te[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Te[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Te[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    0
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Te[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    0
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Te[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Te[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Te[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const ar = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function rr(e) {
  return ar.test(e);
}
function lr(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function sr(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function cr(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : rr(t) ? lr(t) : "*" + t;
}
function or(e) {
  const t = [];
  let n = -1, r = 0, l = 0, a, c, i, u, m, I, T;
  const g = [];
  g[
    0
    /* Actions.APPEND */
  ] = () => {
    c === void 0 ? c = i : c += i;
  }, g[
    1
    /* Actions.PUSH */
  ] = () => {
    c !== void 0 && (t.push(c), c = void 0);
  }, g[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    g[
      0
      /* Actions.APPEND */
    ](), l++;
  }, g[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (l > 0)
      l--, r = 4, g[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (l = 0, c === void 0 || (c = cr(c), c === !1))
        return !1;
      g[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function C() {
    const y = e[n + 1];
    if (r === 5 && y === "'" || r === 6 && y === '"')
      return n++, i = "\\" + y, g[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, a = e[n], !(a === "\\" && C())) {
      if (u = sr(a), T = Te[r], m = T[u] || T.l || 8, m === 8 || (r = m[0], m[1] !== void 0 && (I = g[m[1]], I && (i = a, I() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const Gt = /* @__PURE__ */ new Map();
function ir(e, t) {
  return $(e) ? e[t] : null;
}
function ur(e, t) {
  if (!$(e))
    return null;
  let n = Gt.get(t);
  if (n || (n = or(t), n && Gt.set(t, n)), !n)
    return null;
  const r = n.length;
  let l = e, a = 0;
  for (; a < r; ) {
    const c = n[a];
    if (Rn.includes(c) && ue(l))
      return null;
    const i = l[c];
    if (i === void 0 || x(l))
      return null;
    l = i, a++;
  }
  return l;
}
const fr = (e) => e, _r = (e) => "", mr = "text", dr = (e) => e.length === 0 ? "" : Ta(e), Er = Na;
function Xt(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function gr(e) {
  const t = K(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (K(e.named.count) || K(e.named.n)) ? K(e.named.count) ? e.named.count : K(e.named.n) ? e.named.n : t : t;
}
function Lr(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Nr(e = {}) {
  const t = e.locale, n = gr(e), r = $(e.pluralRules) && p(t) && x(e.pluralRules[t]) ? e.pluralRules[t] : Xt, l = $(e.pluralRules) && p(t) && x(e.pluralRules[t]) ? Xt : void 0, a = (A) => A[r(n, A.length, l)], c = e.list || [], i = (A) => c[A], u = e.named || H();
  K(e.pluralIndex) && Lr(n, u);
  const m = (A) => u[A];
  function I(A) {
    const U = x(e.messages) ? e.messages(A) : $(e.messages) ? e.messages[A] : !1;
    return U || (e.parent ? e.parent.message(A) : _r);
  }
  const T = (A) => e.modifiers ? e.modifiers[A] : fr, g = F(e.processor) && x(e.processor.normalize) ? e.processor.normalize : dr, C = F(e.processor) && x(e.processor.interpolate) ? e.processor.interpolate : Er, y = F(e.processor) && p(e.processor.type) ? e.processor.type : mr, v = {
    list: i,
    named: m,
    plural: a,
    linked: (A, ...U) => {
      const [_, d] = U;
      let b = "text", L = "";
      U.length === 1 ? $(_) ? (L = _.modifier || L, b = _.type || b) : p(_) && (L = _ || L) : U.length === 2 && (p(_) && (L = _ || L), p(d) && (b = d || b));
      const h = I(A)(v), k = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        b === "vnode" && G(h) && L ? h[0] : h
      );
      return L ? T(L)(k, b) : k;
    },
    message: I,
    type: y,
    interpolate: C,
    normalize: g,
    values: q(H(), c, u)
  };
  return v;
}
let Ze = null;
function Tr(e) {
  Ze = e;
}
function Ir(e, t, n) {
  Ze && Ze.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const br = /* @__PURE__ */ Or(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function Or(e) {
  return (t) => Ze && Ze.emit(e, t);
}
const Dn = kt.__EXTEND_POINT__, be = ot(Dn), hr = {
  NOT_FOUND_KEY: Dn,
  // 2
  FALLBACK_TO_TRANSLATE: be(),
  // 3
  CANNOT_FORMAT_NUMBER: be(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: be(),
  // 5
  CANNOT_FORMAT_DATE: be(),
  // 6
  FALLBACK_TO_DATE_FORMAT: be(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: be(),
  // 8
  __EXTEND_POINT__: be()
  // 9
}, Fn = D.__EXTEND_POINT__, Oe = ot(Fn), se = {
  INVALID_ARGUMENT: Fn,
  // 17
  INVALID_DATE_ARGUMENT: Oe(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: Oe(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: Oe(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: Oe(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: Oe(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: Oe(),
  // 23
  __EXTEND_POINT__: Oe()
  // 24
};
function ie(e) {
  return De(e, null, void 0);
}
function Rt(e, t) {
  return t.locale != null ? jt(t.locale) : jt(e.locale);
}
let _t;
function jt(e) {
  if (p(e))
    return e;
  if (x(e)) {
    if (e.resolvedOnce && _t != null)
      return _t;
    if (e.constructor.name === "Function") {
      const t = e();
      if (La(t))
        throw ie(se.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return _t = t;
    } else
      throw ie(se.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw ie(se.NOT_SUPPORT_LOCALE_TYPE);
}
function pr(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...G(t) ? t : $(t) ? Object.keys(t) : p(t) ? [t] : [n]
  ])];
}
function Mn(e, t, n) {
  const r = p(n) ? n : Re, l = e;
  l.__localeChainCache || (l.__localeChainCache = /* @__PURE__ */ new Map());
  let a = l.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let c = [n];
    for (; G(c); )
      c = Kt(a, c, t);
    const i = G(t) || !F(t) ? t : t.default ? t.default : null;
    c = p(i) ? [i] : i, G(c) && Kt(a, c, !1), l.__localeChainCache.set(r, a);
  }
  return a;
}
function Kt(e, t, n) {
  let r = !0;
  for (let l = 0; l < t.length && w(r); l++) {
    const a = t[l];
    p(a) && (r = Cr(e, t[l], n));
  }
  return r;
}
function Cr(e, t, n) {
  let r;
  const l = t.split("-");
  do {
    const a = l.join("-");
    r = Pr(e, a, n), l.splice(-1, 1);
  } while (l.length && r === !0);
  return r;
}
function Pr(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const l = t.replace(/!/g, "");
    e.push(l), (G(n) || F(n)) && n[l] && (r = n[l]);
  }
  return r;
}
const vr = "9.14.5", it = -1, Re = "en-US", Bt = "", Jt = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Ar() {
  return {
    upper: (e, t) => t === "text" && p(e) ? e.toUpperCase() : t === "vnode" && $(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && p(e) ? e.toLowerCase() : t === "vnode" && $(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && p(e) ? Jt(e) : t === "vnode" && $(e) && "__v_isVNode" in e ? Jt(e.children) : e
  };
}
let Un;
function Qt(e) {
  Un = e;
}
let wn;
function kr(e) {
  wn = e;
}
let Wn;
function yr(e) {
  Wn = e;
}
let $n = null;
const Sr = (e) => {
  $n = e;
}, Rr = () => $n;
let Vn = null;
const qt = (e) => {
  Vn = e;
}, Dr = () => Vn;
let Zt = 0;
function Fr(e = {}) {
  const t = x(e.onWarn) ? e.onWarn : ua, n = p(e.version) ? e.version : vr, r = p(e.locale) || x(e.locale) ? e.locale : Re, l = x(r) ? Re : r, a = G(e.fallbackLocale) || F(e.fallbackLocale) || p(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : l, c = F(e.messages) ? e.messages : mt(l), i = F(e.datetimeFormats) ? e.datetimeFormats : mt(l), u = F(e.numberFormats) ? e.numberFormats : mt(l), m = q(H(), e.modifiers, Ar()), I = e.pluralRules || H(), T = x(e.missing) ? e.missing : null, g = w(e.missingWarn) || ge(e.missingWarn) ? e.missingWarn : !0, C = w(e.fallbackWarn) || ge(e.fallbackWarn) ? e.fallbackWarn : !0, y = !!e.fallbackFormat, S = !!e.unresolving, v = x(e.postTranslation) ? e.postTranslation : null, A = F(e.processor) ? e.processor : null, U = w(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, _ = !!e.escapeParameter, d = x(e.messageCompiler) ? e.messageCompiler : Un, b = x(e.messageResolver) ? e.messageResolver : wn || ir, L = x(e.localeFallbacker) ? e.localeFallbacker : Wn || pr, h = $(e.fallbackContext) ? e.fallbackContext : void 0, k = e, P = $(k.__datetimeFormatters) ? k.__datetimeFormatters : /* @__PURE__ */ new Map(), B = $(k.__numberFormatters) ? k.__numberFormatters : /* @__PURE__ */ new Map(), te = $(k.__meta) ? k.__meta : {};
  Zt++;
  const W = {
    version: n,
    cid: Zt,
    locale: r,
    fallbackLocale: a,
    messages: c,
    modifiers: m,
    pluralRules: I,
    missing: T,
    missingWarn: g,
    fallbackWarn: C,
    fallbackFormat: y,
    unresolving: S,
    postTranslation: v,
    processor: A,
    warnHtmlMessage: U,
    escapeParameter: _,
    messageCompiler: d,
    messageResolver: b,
    localeFallbacker: L,
    fallbackContext: h,
    onWarn: t,
    __meta: te
  };
  return W.datetimeFormats = i, W.numberFormats = u, W.__datetimeFormatters = P, W.__numberFormatters = B, __INTLIFY_PROD_DEVTOOLS__ && Ir(W, n, te), W;
}
const mt = (e) => ({ [e]: H() });
function Dt(e, t, n, r, l) {
  const { missing: a, onWarn: c } = e;
  if (a !== null) {
    const i = a(e, n, t, l);
    return p(i) ? i : t;
  } else
    return t;
}
function Je(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Mr(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Ur(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (Mr(e, t[r]))
      return !0;
  return !1;
}
function dt(e) {
  return (n) => wr(n, e);
}
function wr(e, t) {
  const n = qa(t);
  if (n == null)
    throw qe(
      0
      /* NodeTypes.Resource */
    );
  if (St(n) === 1) {
    const a = Za(n);
    return e.plural(a.reduce((c, i) => [
      ...c,
      zt(e, i)
    ], []));
  } else
    return zt(e, n);
}
function zt(e, t) {
  const n = za(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = er(t).reduce((l, a) => [...l, gt(e, a)], []);
    return e.normalize(r);
  }
}
function gt(e, t) {
  const n = St(t);
  switch (n) {
    case 3:
      return at(t, n);
    case 9:
      return at(t, n);
    case 4: {
      const r = t;
      if (le(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (le(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw qe(n);
    }
    case 5: {
      const r = t;
      if (le(r, "i") && K(r.i))
        return e.interpolate(e.list(r.i));
      if (le(r, "index") && K(r.index))
        return e.interpolate(e.list(r.index));
      throw qe(n);
    }
    case 6: {
      const r = t, l = tr(r), a = nr(r);
      return e.linked(gt(e, a), l ? gt(e, l) : void 0, e.type);
    }
    case 7:
      return at(t, n);
    case 8:
      return at(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Hn = (e) => e;
let ye = H();
function Yn(e, t = {}) {
  let n = !1;
  const r = t.onError || Pa;
  return t.onError = (l) => {
    n = !0, r(l);
  }, { ...Ja(e, t), detectError: n };
}
const Wr = (e, t) => {
  if (!p(e))
    throw ie(se.NOT_SUPPORT_NON_STRING_MESSAGE);
  {
    w(t.warnHtmlMessage) && t.warnHtmlMessage;
    const r = (t.onCacheKey || Hn)(e), l = ye[r];
    if (l)
      return l;
    const { code: a, detectError: c } = Yn(e, t), i = new Function(`return ${a}`)();
    return c ? i : ye[r] = i;
  }
};
function $r(e, t) {
  if (__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && p(e)) {
    w(t.warnHtmlMessage) && t.warnHtmlMessage;
    const r = (t.onCacheKey || Hn)(e), l = ye[r];
    if (l)
      return l;
    const { ast: a, detectError: c } = Yn(e, {
      ...t,
      location: !1,
      jit: !0
    }), i = dt(a);
    return c ? i : ye[r] = i;
  } else {
    const n = e.cacheKey;
    if (n) {
      const r = ye[n];
      return r || (ye[n] = dt(e));
    } else
      return dt(e);
  }
}
const en = () => "", ne = (e) => x(e);
function tn(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: l, messageCompiler: a, fallbackLocale: c, messages: i } = e, [u, m] = Lt(...t), I = w(m.missingWarn) ? m.missingWarn : e.missingWarn, T = w(m.fallbackWarn) ? m.fallbackWarn : e.fallbackWarn, g = w(m.escapeParameter) ? m.escapeParameter : e.escapeParameter, C = !!m.resolvedMessage, y = p(m.default) || w(m.default) ? w(m.default) ? a ? u : () => u : m.default : n ? a ? u : () => u : "", S = n || y !== "", v = Rt(e, m);
  g && Vr(m);
  let [A, U, _] = C ? [
    u,
    v,
    i[v] || H()
  ] : xn(e, u, v, c, T, I), d = A, b = u;
  if (!C && !(p(d) || ue(d) || ne(d)) && S && (d = y, b = d), !C && (!(p(d) || ue(d) || ne(d)) || !p(U)))
    return l ? it : u;
  let L = !1;
  const h = () => {
    L = !0;
  }, k = ne(d) ? d : Gn(e, u, U, d, b, h);
  if (L)
    return d;
  const P = xr(e, U, _, m), B = Nr(P), te = Hr(e, k, B);
  let W = r ? r(te, u) : te;
  if (g && p(W) && (W = Ea(W)), __INTLIFY_PROD_DEVTOOLS__) {
    const Z = {
      timestamp: Date.now(),
      key: p(u) ? u : ne(d) ? d.key : "",
      locale: U || (ne(d) ? d.locale : ""),
      format: p(d) ? d : ne(d) ? d.source : "",
      message: W
    };
    Z.meta = q({}, e.__meta, Rr() || {}), br(Z);
  }
  return W;
}
function Vr(e) {
  G(e.list) ? e.list = e.list.map((t) => p(t) ? Wt(t) : t) : $(e.named) && Object.keys(e.named).forEach((t) => {
    p(e.named[t]) && (e.named[t] = Wt(e.named[t]));
  });
}
function xn(e, t, n, r, l, a) {
  const { messages: c, onWarn: i, messageResolver: u, localeFallbacker: m } = e, I = m(e, r, n);
  let T = H(), g, C = null;
  const y = "translate";
  for (let S = 0; S < I.length && (g = I[S], T = c[g] || H(), (C = u(T, t)) === null && (C = T[t]), !(p(C) || ue(C) || ne(C))); S++)
    if (!Ur(g, I)) {
      const v = Dt(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        g,
        a,
        y
      );
      v !== t && (C = v);
    }
  return [C, g, T];
}
function Gn(e, t, n, r, l, a) {
  const { messageCompiler: c, warnHtmlMessage: i } = e;
  if (ne(r)) {
    const m = r;
    return m.locale = m.locale || n, m.key = m.key || t, m;
  }
  if (c == null) {
    const m = () => r;
    return m.locale = n, m.key = t, m;
  }
  const u = c(r, Yr(e, n, l, r, i, a));
  return u.locale = n, u.key = t, u.source = r, u;
}
function Hr(e, t, n) {
  return t(n);
}
function Lt(...e) {
  const [t, n, r] = e, l = H();
  if (!p(t) && !K(t) && !ne(t) && !ue(t))
    throw ie(se.INVALID_ARGUMENT);
  const a = K(t) ? String(t) : (ne(t), t);
  return K(n) ? l.plural = n : p(n) ? l.default = n : F(n) && !ct(n) ? l.named = n : G(n) && (l.list = n), K(r) ? l.plural = r : p(r) ? l.default = r : F(r) && q(l, r), [a, l];
}
function Yr(e, t, n, r, l, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: l,
    onError: (c) => {
      throw a && a(c), c;
    },
    onCacheKey: (c) => fa(t, n, c)
  };
}
function xr(e, t, n, r) {
  const { modifiers: l, pluralRules: a, messageResolver: c, fallbackLocale: i, fallbackWarn: u, missingWarn: m, fallbackContext: I } = e, g = {
    locale: t,
    modifiers: l,
    pluralRules: a,
    messages: (C) => {
      let y = c(n, C);
      if (y == null && I) {
        const [, , S] = xn(I, C, t, i, u, m);
        y = c(S, C);
      }
      if (p(y) || ue(y)) {
        let S = !1;
        const A = Gn(e, C, t, y, C, () => {
          S = !0;
        });
        return S ? en : A;
      } else
        return ne(y) ? y : en;
    }
  };
  return e.processor && (g.processor = e.processor), r.list && (g.list = r.list), r.named && (g.named = r.named), K(r.plural) && (g.pluralIndex = r.plural), g;
}
function nn(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: l, onWarn: a, localeFallbacker: c } = e, { __datetimeFormatters: i } = e, [u, m, I, T] = Nt(...t), g = w(I.missingWarn) ? I.missingWarn : e.missingWarn;
  w(I.fallbackWarn) ? I.fallbackWarn : e.fallbackWarn;
  const C = !!I.part, y = Rt(e, I), S = c(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    y
  );
  if (!p(u) || u === "")
    return new Intl.DateTimeFormat(y, T).format(m);
  let v = {}, A, U = null;
  const _ = "datetime format";
  for (let L = 0; L < S.length && (A = S[L], v = n[A] || {}, U = v[u], !F(U)); L++)
    Dt(e, u, A, g, _);
  if (!F(U) || !p(A))
    return r ? it : u;
  let d = `${A}__${u}`;
  ct(T) || (d = `${d}__${JSON.stringify(T)}`);
  let b = i.get(d);
  return b || (b = new Intl.DateTimeFormat(A, q({}, U, T)), i.set(d, b)), C ? b.formatToParts(m) : b.format(m);
}
const Xn = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function Nt(...e) {
  const [t, n, r, l] = e, a = H();
  let c = H(), i;
  if (p(t)) {
    const u = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!u)
      throw ie(se.INVALID_ISO_DATE_ARGUMENT);
    const m = u[3] ? u[3].trim().startsWith("T") ? `${u[1].trim()}${u[3].trim()}` : `${u[1].trim()}T${u[3].trim()}` : u[1].trim();
    i = new Date(m);
    try {
      i.toISOString();
    } catch {
      throw ie(se.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (ma(t)) {
    if (isNaN(t.getTime()))
      throw ie(se.INVALID_DATE_ARGUMENT);
    i = t;
  } else if (K(t))
    i = t;
  else
    throw ie(se.INVALID_ARGUMENT);
  return p(n) ? a.key = n : F(n) && Object.keys(n).forEach((u) => {
    Xn.includes(u) ? c[u] = n[u] : a[u] = n[u];
  }), p(r) ? a.locale = r : F(r) && (c = r), F(l) && (c = l), [a.key || "", i, a, c];
}
function an(e, t, n) {
  const r = e;
  for (const l in n) {
    const a = `${t}__${l}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function rn(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: l, onWarn: a, localeFallbacker: c } = e, { __numberFormatters: i } = e, [u, m, I, T] = Tt(...t), g = w(I.missingWarn) ? I.missingWarn : e.missingWarn;
  w(I.fallbackWarn) ? I.fallbackWarn : e.fallbackWarn;
  const C = !!I.part, y = Rt(e, I), S = c(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    l,
    y
  );
  if (!p(u) || u === "")
    return new Intl.NumberFormat(y, T).format(m);
  let v = {}, A, U = null;
  const _ = "number format";
  for (let L = 0; L < S.length && (A = S[L], v = n[A] || {}, U = v[u], !F(U)); L++)
    Dt(e, u, A, g, _);
  if (!F(U) || !p(A))
    return r ? it : u;
  let d = `${A}__${u}`;
  ct(T) || (d = `${d}__${JSON.stringify(T)}`);
  let b = i.get(d);
  return b || (b = new Intl.NumberFormat(A, q({}, U, T)), i.set(d, b)), C ? b.formatToParts(m) : b.format(m);
}
const jn = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function Tt(...e) {
  const [t, n, r, l] = e, a = H();
  let c = H();
  if (!K(t))
    throw ie(se.INVALID_ARGUMENT);
  const i = t;
  return p(n) ? a.key = n : F(n) && Object.keys(n).forEach((u) => {
    jn.includes(u) ? c[u] = n[u] : a[u] = n[u];
  }), p(r) ? a.locale = r : F(r) && (c = r), F(l) && (c = l), [a.key || "", i, a, c];
}
function ln(e, t, n) {
  const r = e;
  for (const l in n) {
    const a = `${t}__${l}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
Qa();
/*!
  * vue-i18n v9.14.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Gr = "9.14.5";
function Xr() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (me().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (me().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (me().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (me().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (me().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Kn = hr.__EXTEND_POINT__, _e = ot(Kn);
_e(), _e(), _e(), _e(), _e(), _e(), _e(), _e(), _e();
const Bn = se.__EXTEND_POINT__, ee = ot(Bn), J = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Bn,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: ee(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: ee(),
  // 26
  NOT_INSTALLED: ee(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: ee(),
  // 28
  // directive module errors
  REQUIRED_VALUE: ee(),
  // 29
  INVALID_VALUE: ee(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: ee(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: ee(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: ee(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: ee(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: ee(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: ee(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: ee(),
  // 37
  // for enhancement
  __EXTEND_POINT__: ee()
  // 38
};
function Q(e, ...t) {
  return De(e, null, void 0);
}
const It = /* @__PURE__ */ Le("__translateVNode"), bt = /* @__PURE__ */ Le("__datetimeParts"), Ot = /* @__PURE__ */ Le("__numberParts"), Jn = Le("__setPluralRules"), Qn = /* @__PURE__ */ Le("__injectWithOption"), ht = /* @__PURE__ */ Le("__dispose"), jr = "__VUE_I18N_BRIDGE__";
function ze(e) {
  if (!$(e) || ue(e))
    return e;
  for (const t in e)
    if (le(e, t))
      if (!t.includes("."))
        $(e[t]) && ze(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let l = e, a = !1;
        for (let c = 0; c < r; c++) {
          if (n[c] === "__proto__")
            throw new Error(`unsafe key: ${n[c]}`);
          if (n[c] in l || (l[n[c]] = H()), !$(l[n[c]])) {
            a = !0;
            break;
          }
          l = l[n[c]];
        }
        if (a || (ue(l) ? Rn.includes(n[r]) || delete e[t] : (l[n[r]] = e[t], delete e[t])), !ue(l)) {
          const c = l[n[r]];
          $(c) && ze(c);
        }
      }
  return e;
}
function ut(e, t) {
  const { messages: n, __i18n: r, messageResolver: l, flatJson: a } = t, c = F(n) ? n : G(r) ? H() : { [e]: H() };
  if (G(r) && r.forEach((i) => {
    if ("locale" in i && "resource" in i) {
      const { locale: u, resource: m } = i;
      u ? (c[u] = c[u] || H(), rt(m, c[u])) : rt(m, c);
    } else
      p(i) && rt(JSON.parse(i), c);
  }), l == null && a)
    for (const i in c)
      le(c, i) && ze(c[i]);
  return c;
}
function qn(e) {
  return e.type;
}
function Zn(e, t, n) {
  let r = $(t.messages) ? t.messages : H();
  "__i18nGlobal" in n && (r = ut(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const l = Object.keys(r);
  l.length && l.forEach((a) => {
    e.mergeLocaleMessage(a, r[a]);
  });
  {
    if ($(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((c) => {
        e.mergeDateTimeFormat(c, t.datetimeFormats[c]);
      });
    }
    if ($(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((c) => {
        e.mergeNumberFormat(c, t.numberFormats[c]);
      });
    }
  }
}
function sn(e) {
  return oa(ia, null, e, 0);
}
const cn = "__INTLIFY_META__", on = () => [], Kr = () => !1;
let un = 0;
function fn(e) {
  return (t, n, r, l) => e(n, r, Qe() || void 0, l);
}
const Br = () => {
  const e = Qe();
  let t = null;
  return e && (t = qn(e)[cn]) ? { [cn]: t } : null;
};
function Ft(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, l = n === void 0, a = e.flatJson, c = lt ? Ae : Ln, i = !!e.translateExistCompatible;
  let u = w(e.inheritLocale) ? e.inheritLocale : !0;
  const m = c(
    // prettier-ignore
    n && u ? n.locale.value : p(e.locale) ? e.locale : Re
  ), I = c(
    // prettier-ignore
    n && u ? n.fallbackLocale.value : p(e.fallbackLocale) || G(e.fallbackLocale) || F(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : m.value
  ), T = c(ut(m.value, e)), g = c(F(e.datetimeFormats) ? e.datetimeFormats : { [m.value]: {} }), C = c(F(e.numberFormats) ? e.numberFormats : { [m.value]: {} });
  let y = n ? n.missingWarn : w(e.missingWarn) || ge(e.missingWarn) ? e.missingWarn : !0, S = n ? n.fallbackWarn : w(e.fallbackWarn) || ge(e.fallbackWarn) ? e.fallbackWarn : !0, v = n ? n.fallbackRoot : w(e.fallbackRoot) ? e.fallbackRoot : !0, A = !!e.fallbackFormat, U = x(e.missing) ? e.missing : null, _ = x(e.missing) ? fn(e.missing) : null, d = x(e.postTranslation) ? e.postTranslation : null, b = n ? n.warnHtmlMessage : w(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, L = !!e.escapeParameter;
  const h = n ? n.modifiers : F(e.modifiers) ? e.modifiers : {};
  let k = e.pluralRules || n && n.pluralRules, P;
  P = (() => {
    l && qt(null);
    const f = {
      version: Gr,
      locale: m.value,
      fallbackLocale: I.value,
      messages: T.value,
      modifiers: h,
      pluralRules: k,
      missing: _ === null ? void 0 : _,
      missingWarn: y,
      fallbackWarn: S,
      fallbackFormat: A,
      unresolving: !0,
      postTranslation: d === null ? void 0 : d,
      warnHtmlMessage: b,
      escapeParameter: L,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    f.datetimeFormats = g.value, f.numberFormats = C.value, f.__datetimeFormatters = F(P) ? P.__datetimeFormatters : void 0, f.__numberFormatters = F(P) ? P.__numberFormatters : void 0;
    const N = Fr(f);
    return l && qt(N), N;
  })(), Je(P, m.value, I.value);
  function te() {
    return [
      m.value,
      I.value,
      T.value,
      g.value,
      C.value
    ];
  }
  const W = oe({
    get: () => m.value,
    set: (f) => {
      m.value = f, P.locale = m.value;
    }
  }), Z = oe({
    get: () => I.value,
    set: (f) => {
      I.value = f, P.fallbackLocale = I.value, Je(P, m.value, f);
    }
  }), Fe = oe(() => T.value), Me = /* @__PURE__ */ oe(() => g.value), ce = /* @__PURE__ */ oe(() => C.value);
  function Ue() {
    return x(d) ? d : null;
  }
  function we(f) {
    d = f, P.postTranslation = f;
  }
  function We() {
    return U;
  }
  function $e(f) {
    f !== null && (_ = fn(f)), U = f, P.missing = _;
  }
  const ae = (f, N, Y, j, de, tt) => {
    te();
    let ve;
    try {
      __INTLIFY_PROD_DEVTOOLS__ && Sr(Br()), l || (P.fallbackContext = n ? Dr() : void 0), ve = f(P);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, l || (P.fallbackContext = void 0);
    }
    if (Y !== "translate exists" && // for not `te` (e.g `t`)
    K(ve) && ve === it || Y === "translate exists" && !ve) {
      const [ta, gl] = N();
      return n && v ? j(n) : de(ta);
    } else {
      if (tt(ve))
        return ve;
      throw Q(J.UNEXPECTED_RETURN_TYPE);
    }
  };
  function Ie(...f) {
    return ae((N) => Reflect.apply(tn, null, [N, ...f]), () => Lt(...f), "translate", (N) => Reflect.apply(N.t, N, [...f]), (N) => N, (N) => p(N));
  }
  function Ve(...f) {
    const [N, Y, j] = f;
    if (j && !$(j))
      throw Q(J.INVALID_ARGUMENT);
    return Ie(N, Y, q({ resolvedMessage: !0 }, j || {}));
  }
  function he(...f) {
    return ae((N) => Reflect.apply(nn, null, [N, ...f]), () => Nt(...f), "datetime format", (N) => Reflect.apply(N.d, N, [...f]), () => Bt, (N) => p(N));
  }
  function He(...f) {
    return ae((N) => Reflect.apply(rn, null, [N, ...f]), () => Tt(...f), "number format", (N) => Reflect.apply(N.n, N, [...f]), () => Bt, (N) => p(N));
  }
  function Ye(f) {
    return f.map((N) => p(N) || K(N) || w(N) ? sn(String(N)) : N);
  }
  const xe = {
    normalize: Ye,
    interpolate: (f) => f,
    type: "vnode"
  };
  function Ge(...f) {
    return ae(
      (N) => {
        let Y;
        const j = N;
        try {
          j.processor = xe, Y = Reflect.apply(tn, null, [j, ...f]);
        } finally {
          j.processor = null;
        }
        return Y;
      },
      () => Lt(...f),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (N) => N[It](...f),
      (N) => [sn(N)],
      (N) => G(N)
    );
  }
  function pe(...f) {
    return ae(
      (N) => Reflect.apply(rn, null, [N, ...f]),
      () => Tt(...f),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (N) => N[Ot](...f),
      on,
      (N) => p(N) || G(N)
    );
  }
  function Xe(...f) {
    return ae(
      (N) => Reflect.apply(nn, null, [N, ...f]),
      () => Nt(...f),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (N) => N[bt](...f),
      on,
      (N) => p(N) || G(N)
    );
  }
  function je(f) {
    k = f, P.pluralRules = k;
  }
  function Ke(f, N) {
    return ae(() => {
      if (!f)
        return !1;
      const Y = p(N) ? N : m.value, j = Ce(Y), de = P.messageResolver(j, f);
      return i ? de != null : ue(de) || ne(de) || p(de);
    }, () => [f], "translate exists", (Y) => Reflect.apply(Y.te, Y, [f, N]), Kr, (Y) => w(Y));
  }
  function O(f) {
    let N = null;
    const Y = Mn(P, I.value, m.value);
    for (let j = 0; j < Y.length; j++) {
      const de = T.value[Y[j]] || {}, tt = P.messageResolver(de, f);
      if (tt != null) {
        N = tt;
        break;
      }
    }
    return N;
  }
  function V(f) {
    const N = O(f);
    return N ?? (n ? n.tm(f) || {} : {});
  }
  function Ce(f) {
    return T.value[f] || {};
  }
  function Pe(f, N) {
    if (a) {
      const Y = { [f]: N };
      for (const j in Y)
        le(Y, j) && ze(Y[j]);
      N = Y[f];
    }
    T.value[f] = N, P.messages = T.value;
  }
  function Be(f, N) {
    T.value[f] = T.value[f] || {};
    const Y = { [f]: N };
    if (a)
      for (const j in Y)
        le(Y, j) && ze(Y[j]);
    N = Y[f], rt(N, T.value[f]), P.messages = T.value;
  }
  function ft(f) {
    return g.value[f] || {};
  }
  function s(f, N) {
    g.value[f] = N, P.datetimeFormats = g.value, an(P, f, N);
  }
  function o(f, N) {
    g.value[f] = q(g.value[f] || {}, N), P.datetimeFormats = g.value, an(P, f, N);
  }
  function E(f) {
    return C.value[f] || {};
  }
  function R(f, N) {
    C.value[f] = N, P.numberFormats = C.value, ln(P, f, N);
  }
  function X(f, N) {
    C.value[f] = q(C.value[f] || {}, N), P.numberFormats = C.value, ln(P, f, N);
  }
  un++, n && lt && (Et(n.locale, (f) => {
    u && (m.value = f, P.locale = f, Je(P, m.value, I.value));
  }), Et(n.fallbackLocale, (f) => {
    u && (I.value = f, P.fallbackLocale = f, Je(P, m.value, I.value));
  }));
  const M = {
    id: un,
    locale: W,
    fallbackLocale: Z,
    get inheritLocale() {
      return u;
    },
    set inheritLocale(f) {
      u = f, f && n && (m.value = n.locale.value, I.value = n.fallbackLocale.value, Je(P, m.value, I.value));
    },
    get availableLocales() {
      return Object.keys(T.value).sort();
    },
    messages: Fe,
    get modifiers() {
      return h;
    },
    get pluralRules() {
      return k || {};
    },
    get isGlobal() {
      return l;
    },
    get missingWarn() {
      return y;
    },
    set missingWarn(f) {
      y = f, P.missingWarn = y;
    },
    get fallbackWarn() {
      return S;
    },
    set fallbackWarn(f) {
      S = f, P.fallbackWarn = S;
    },
    get fallbackRoot() {
      return v;
    },
    set fallbackRoot(f) {
      v = f;
    },
    get fallbackFormat() {
      return A;
    },
    set fallbackFormat(f) {
      A = f, P.fallbackFormat = A;
    },
    get warnHtmlMessage() {
      return b;
    },
    set warnHtmlMessage(f) {
      b = f, P.warnHtmlMessage = f;
    },
    get escapeParameter() {
      return L;
    },
    set escapeParameter(f) {
      L = f, P.escapeParameter = f;
    },
    t: Ie,
    getLocaleMessage: Ce,
    setLocaleMessage: Pe,
    mergeLocaleMessage: Be,
    getPostTranslationHandler: Ue,
    setPostTranslationHandler: we,
    getMissingHandler: We,
    setMissingHandler: $e,
    [Jn]: je
  };
  return M.datetimeFormats = Me, M.numberFormats = ce, M.rt = Ve, M.te = Ke, M.tm = V, M.d = he, M.n = He, M.getDateTimeFormat = ft, M.setDateTimeFormat = s, M.mergeDateTimeFormat = o, M.getNumberFormat = E, M.setNumberFormat = R, M.mergeNumberFormat = X, M[Qn] = r, M[It] = Ge, M[bt] = Xe, M[Ot] = pe, M;
}
function Jr(e) {
  const t = p(e.locale) ? e.locale : Re, n = p(e.fallbackLocale) || G(e.fallbackLocale) || F(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t, r = x(e.missing) ? e.missing : void 0, l = w(e.silentTranslationWarn) || ge(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0, a = w(e.silentFallbackWarn) || ge(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0, c = w(e.fallbackRoot) ? e.fallbackRoot : !0, i = !!e.formatFallbackMessages, u = F(e.modifiers) ? e.modifiers : {}, m = e.pluralizationRules, I = x(e.postTranslation) ? e.postTranslation : void 0, T = p(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0, g = !!e.escapeParameterHtml, C = w(e.sync) ? e.sync : !0;
  let y = e.messages;
  if (F(e.sharedMessages)) {
    const L = e.sharedMessages;
    y = Object.keys(L).reduce((k, P) => {
      const B = k[P] || (k[P] = {});
      return q(B, L[P]), k;
    }, y || {});
  }
  const { __i18n: S, __root: v, __injectWithOption: A } = e, U = e.datetimeFormats, _ = e.numberFormats, d = e.flatJson, b = e.translateExistCompatible;
  return {
    locale: t,
    fallbackLocale: n,
    messages: y,
    flatJson: d,
    datetimeFormats: U,
    numberFormats: _,
    missing: r,
    missingWarn: l,
    fallbackWarn: a,
    fallbackRoot: c,
    fallbackFormat: i,
    modifiers: u,
    pluralRules: m,
    postTranslation: I,
    warnHtmlMessage: T,
    escapeParameter: g,
    messageResolver: e.messageResolver,
    inheritLocale: C,
    translateExistCompatible: b,
    __i18n: S,
    __root: v,
    __injectWithOption: A
  };
}
function pt(e = {}, t) {
  {
    const n = Ft(Jr(e)), { __extender: r } = e, l = {
      // id
      id: n.id,
      // locale
      get locale() {
        return n.locale.value;
      },
      set locale(a) {
        n.locale.value = a;
      },
      // fallbackLocale
      get fallbackLocale() {
        return n.fallbackLocale.value;
      },
      set fallbackLocale(a) {
        n.fallbackLocale.value = a;
      },
      // messages
      get messages() {
        return n.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return n.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return n.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return n.availableLocales;
      },
      // formatter
      get formatter() {
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(a) {
      },
      // missing
      get missing() {
        return n.getMissingHandler();
      },
      set missing(a) {
        n.setMissingHandler(a);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return w(n.missingWarn) ? !n.missingWarn : n.missingWarn;
      },
      set silentTranslationWarn(a) {
        n.missingWarn = w(a) ? !a : a;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return w(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn;
      },
      set silentFallbackWarn(a) {
        n.fallbackWarn = w(a) ? !a : a;
      },
      // modifiers
      get modifiers() {
        return n.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return n.fallbackFormat;
      },
      set formatFallbackMessages(a) {
        n.fallbackFormat = a;
      },
      // postTranslation
      get postTranslation() {
        return n.getPostTranslationHandler();
      },
      set postTranslation(a) {
        n.setPostTranslationHandler(a);
      },
      // sync
      get sync() {
        return n.inheritLocale;
      },
      set sync(a) {
        n.inheritLocale = a;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return n.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(a) {
        n.warnHtmlMessage = a !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return n.escapeParameter;
      },
      set escapeParameterHtml(a) {
        n.escapeParameter = a;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        return !0;
      },
      set preserveDirectiveContent(a) {
      },
      // pluralizationRules
      get pluralizationRules() {
        return n.pluralRules || {};
      },
      // for internal
      __composer: n,
      // t
      t(...a) {
        const [c, i, u] = a, m = {};
        let I = null, T = null;
        if (!p(c))
          throw Q(J.INVALID_ARGUMENT);
        const g = c;
        return p(i) ? m.locale = i : G(i) ? I = i : F(i) && (T = i), G(u) ? I = u : F(u) && (T = u), Reflect.apply(n.t, n, [
          g,
          I || T || {},
          m
        ]);
      },
      rt(...a) {
        return Reflect.apply(n.rt, n, [...a]);
      },
      // tc
      tc(...a) {
        const [c, i, u] = a, m = { plural: 1 };
        let I = null, T = null;
        if (!p(c))
          throw Q(J.INVALID_ARGUMENT);
        const g = c;
        return p(i) ? m.locale = i : K(i) ? m.plural = i : G(i) ? I = i : F(i) && (T = i), p(u) ? m.locale = u : G(u) ? I = u : F(u) && (T = u), Reflect.apply(n.t, n, [
          g,
          I || T || {},
          m
        ]);
      },
      // te
      te(a, c) {
        return n.te(a, c);
      },
      // tm
      tm(a) {
        return n.tm(a);
      },
      // getLocaleMessage
      getLocaleMessage(a) {
        return n.getLocaleMessage(a);
      },
      // setLocaleMessage
      setLocaleMessage(a, c) {
        n.setLocaleMessage(a, c);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(a, c) {
        n.mergeLocaleMessage(a, c);
      },
      // d
      d(...a) {
        return Reflect.apply(n.d, n, [...a]);
      },
      // getDateTimeFormat
      getDateTimeFormat(a) {
        return n.getDateTimeFormat(a);
      },
      // setDateTimeFormat
      setDateTimeFormat(a, c) {
        n.setDateTimeFormat(a, c);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(a, c) {
        n.mergeDateTimeFormat(a, c);
      },
      // n
      n(...a) {
        return Reflect.apply(n.n, n, [...a]);
      },
      // getNumberFormat
      getNumberFormat(a) {
        return n.getNumberFormat(a);
      },
      // setNumberFormat
      setNumberFormat(a, c) {
        n.setNumberFormat(a, c);
      },
      // mergeNumberFormat
      mergeNumberFormat(a, c) {
        n.mergeNumberFormat(a, c);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(a, c) {
        return -1;
      }
    };
    return l.__extender = r, l;
  }
}
const Mt = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function Qr({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, l) => [
    ...r,
    // prettier-ignore
    ...l.type === Nn ? l.children : [l]
  ], []) : t.reduce((n, r) => {
    const l = e[r];
    return l && (n[r] = l()), n;
  }, H());
}
function zn(e) {
  return Nn;
}
const qr = /* @__PURE__ */ At({
  /* eslint-disable */
  name: "i18n-t",
  props: q({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => K(e) || !isNaN(e)
    }
  }, Mt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, l = e.i18n || Ut({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((T) => T !== "_"), c = H();
      e.locale && (c.locale = e.locale), e.plural !== void 0 && (c.plural = p(e.plural) ? +e.plural : e.plural);
      const i = Qr(t, a), u = l[It](e.keypath, i, c), m = q(H(), r), I = p(e.tag) || $(e.tag) ? e.tag : zn();
      return gn(I, m, u);
    };
  }
}), Ct = qr, Nl = Ct;
function Zr(e) {
  return G(e) && !p(e[0]);
}
function ea(e, t, n, r) {
  const { slots: l, attrs: a } = t;
  return () => {
    const c = { part: !0 };
    let i = H();
    e.locale && (c.locale = e.locale), p(e.format) ? c.key = e.format : $(e.format) && (p(e.format.key) && (c.key = e.format.key), i = Object.keys(e.format).reduce((g, C) => n.includes(C) ? q(H(), g, { [C]: e.format[C] }) : g, H()));
    const u = r(e.value, c, i);
    let m = [c.key];
    G(u) ? m = u.map((g, C) => {
      const y = l[g.type], S = y ? y({ [g.type]: g.value, index: C, parts: u }) : [g.value];
      return Zr(S) && (S[0].key = `${g.type}-${C}`), S;
    }) : p(u) && (m = [u]);
    const I = q(H(), a), T = p(e.tag) || $(e.tag) ? e.tag : zn();
    return gn(T, I, m);
  };
}
const zr = /* @__PURE__ */ At({
  /* eslint-disable */
  name: "i18n-n",
  props: q({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Mt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Ut({
      useScope: e.scope,
      __useComponent: !0
    });
    return ea(e, t, jn, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Ot](...r)
    ));
  }
}), Pt = zr, Tl = Pt, el = /* @__PURE__ */ At({
  /* eslint-disable */
  name: "i18n-d",
  props: q({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, Mt),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || Ut({
      useScope: e.scope,
      __useComponent: !0
    });
    return ea(e, t, Xn, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[bt](...r)
    ));
  }
}), vt = el, Il = vt;
function tl(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function nl(e) {
  const t = (c) => {
    const { instance: i, modifiers: u, value: m } = c;
    if (!i || !i.$)
      throw Q(J.UNEXPECTED_ERROR);
    const I = tl(e, i.$), T = _n(m);
    return [
      Reflect.apply(I.t, I, [...mn(T)]),
      I
    ];
  };
  return {
    created: (c, i) => {
      const [u, m] = t(i);
      lt && e.global === m && (c.__i18nWatcher = Et(m.locale, () => {
        i.instance && i.instance.$forceUpdate();
      })), c.__composer = m, c.textContent = u;
    },
    unmounted: (c) => {
      lt && c.__i18nWatcher && (c.__i18nWatcher(), c.__i18nWatcher = void 0, delete c.__i18nWatcher), c.__composer && (c.__composer = void 0, delete c.__composer);
    },
    beforeUpdate: (c, { value: i }) => {
      if (c.__composer) {
        const u = c.__composer, m = _n(i);
        c.textContent = Reflect.apply(u.t, u, [
          ...mn(m)
        ]);
      }
    },
    getSSRProps: (c) => {
      const [i] = t(c);
      return { textContent: i };
    }
  };
}
function _n(e) {
  if (p(e))
    return { path: e };
  if (F(e)) {
    if (!("path" in e))
      throw Q(J.REQUIRED_VALUE, "path");
    return e;
  } else
    throw Q(J.INVALID_VALUE);
}
function mn(e) {
  const { path: t, locale: n, args: r, choice: l, plural: a } = e, c = {}, i = r || {};
  return p(n) && (c.locale = n), K(l) && (c.plural = l), K(a) && (c.plural = a), [t, i, c];
}
function al(e, t, ...n) {
  const r = F(n[0]) ? n[0] : {}, l = !!r.useI18nComponentName;
  (w(r.globalInstall) ? r.globalInstall : !0) && ([l ? "i18n" : Ct.name, "I18nT"].forEach((c) => e.component(c, Ct)), [Pt.name, "I18nN"].forEach((c) => e.component(c, Pt)), [vt.name, "I18nD"].forEach((c) => e.component(c, vt))), e.directive("t", nl(t));
}
function rl(e, t, n) {
  return {
    beforeCreate() {
      const r = Qe();
      if (!r)
        throw Q(J.UNEXPECTED_ERROR);
      const l = this.$options;
      if (l.i18n) {
        const a = l.i18n;
        if (l.__i18n && (a.__i18n = l.__i18n), a.__root = t, this === this.$root)
          this.$i18n = dn(e, a);
        else {
          a.__injectWithOption = !0, a.__extender = n.__vueI18nExtend, this.$i18n = pt(a);
          const c = this.$i18n;
          c.__extender && (c.__disposer = c.__extender(this.$i18n));
        }
      } else if (l.__i18n)
        if (this === this.$root)
          this.$i18n = dn(e, l);
        else {
          this.$i18n = pt({
            __i18n: l.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t
          });
          const a = this.$i18n;
          a.__extender && (a.__disposer = a.__extender(this.$i18n));
        }
      else
        this.$i18n = e;
      l.__i18nGlobal && Zn(t, l, l), this.$t = (...a) => this.$i18n.t(...a), this.$rt = (...a) => this.$i18n.rt(...a), this.$tc = (...a) => this.$i18n.tc(...a), this.$te = (a, c) => this.$i18n.te(a, c), this.$d = (...a) => this.$i18n.d(...a), this.$n = (...a) => this.$i18n.n(...a), this.$tm = (a) => this.$i18n.tm(a), n.__setInstance(r, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const r = Qe();
      if (!r)
        throw Q(J.UNEXPECTED_ERROR);
      const l = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, l.__disposer && (l.__disposer(), delete l.__disposer, delete l.__extender), n.__deleteInstance(r), delete this.$i18n;
    }
  };
}
function dn(e, t) {
  e.locale = t.locale || e.locale, e.fallbackLocale = t.fallbackLocale || e.fallbackLocale, e.missing = t.missing || e.missing, e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn, e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn, e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages, e.postTranslation = t.postTranslation || e.postTranslation, e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage, e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml, e.sync = t.sync || e.sync, e.__composer[Jn](t.pluralizationRules || e.pluralizationRules);
  const n = ut(e.locale, {
    messages: t.messages,
    __i18n: t.__i18n
  });
  return Object.keys(n).forEach((r) => e.mergeLocaleMessage(r, n[r])), t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((r) => e.mergeDateTimeFormat(r, t.datetimeFormats[r])), t.numberFormats && Object.keys(t.numberFormats).forEach((r) => e.mergeNumberFormat(r, t.numberFormats[r])), e;
}
const ll = /* @__PURE__ */ Le("global-vue-i18n");
function bl(e = {}, t) {
  const n = __VUE_I18N_LEGACY_API__ && w(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__, r = w(e.globalInjection) ? e.globalInjection : !0, l = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0, a = /* @__PURE__ */ new Map(), [c, i] = sl(e, n), u = /* @__PURE__ */ Le("");
  function m(g) {
    return a.get(g) || null;
  }
  function I(g, C) {
    a.set(g, C);
  }
  function T(g) {
    a.delete(g);
  }
  {
    const g = {
      // mode
      get mode() {
        return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
      },
      // allowComposition
      get allowComposition() {
        return l;
      },
      // install plugin
      async install(C, ...y) {
        if (C.__VUE_I18N_SYMBOL__ = u, C.provide(C.__VUE_I18N_SYMBOL__, g), F(y[0])) {
          const A = y[0];
          g.__composerExtend = A.__composerExtend, g.__vueI18nExtend = A.__vueI18nExtend;
        }
        let S = null;
        !n && r && (S = El(C, g.global)), __VUE_I18N_FULL_INSTALL__ && al(C, g, ...y), __VUE_I18N_LEGACY_API__ && n && C.mixin(rl(i, i.__composer, g));
        const v = C.unmount;
        C.unmount = () => {
          S && S(), g.dispose(), v();
        };
      },
      // global accessor
      get global() {
        return i;
      },
      dispose() {
        c.stop();
      },
      // @internal
      __instances: a,
      // @internal
      __getInstance: m,
      // @internal
      __setInstance: I,
      // @internal
      __deleteInstance: T
    };
    return g;
  }
}
function Ut(e = {}) {
  const t = Qe();
  if (t == null)
    throw Q(J.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Q(J.NOT_INSTALLED);
  const n = cl(t), r = il(n), l = qn(t), a = ol(e, l);
  if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
    if (!n.allowComposition)
      throw Q(J.NOT_AVAILABLE_IN_LEGACY_MODE);
    return ml(t, a, r, e);
  }
  if (a === "global")
    return Zn(r, e, l), r;
  if (a === "parent") {
    let u = ul(n, t, e.__useComponent);
    return u == null && (u = r), u;
  }
  const c = n;
  let i = c.__getInstance(t);
  if (i == null) {
    const u = q({}, e);
    "__i18n" in l && (u.__i18n = l.__i18n), r && (u.__root = r), i = Ft(u), c.__composerExtend && (i[ht] = c.__composerExtend(i)), _l(c, t, i), c.__setInstance(t, i);
  }
  return i;
}
const Ol = (e) => {
  if (!(jr in e))
    throw Q(J.NOT_COMPATIBLE_LEGACY_VUE_I18N);
  return e;
};
function sl(e, t, n) {
  const r = na();
  {
    const l = __VUE_I18N_LEGACY_API__ && t ? r.run(() => pt(e)) : r.run(() => Ft(e));
    if (l == null)
      throw Q(J.UNEXPECTED_ERROR);
    return [r, l];
  }
}
function cl(e) {
  {
    const t = aa(e.isCE ? ll : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw Q(e.isCE ? J.NOT_INSTALLED_WITH_PROVIDE : J.UNEXPECTED_ERROR);
    return t;
  }
}
function ol(e, t) {
  return ct(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function il(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function ul(e, t, n = !1) {
  let r = null;
  const l = t.root;
  let a = fl(t, n);
  for (; a != null; ) {
    const c = e;
    if (e.mode === "composition")
      r = c.__getInstance(a);
    else if (__VUE_I18N_LEGACY_API__) {
      const i = c.__getInstance(a);
      i != null && (r = i.__composer, n && r && !r[Qn] && (r = null));
    }
    if (r != null || l === a)
      break;
    a = a.parent;
  }
  return r;
}
function fl(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function _l(e, t, n) {
  ra(() => {
  }, t), la(() => {
    const r = n;
    e.__deleteInstance(t);
    const l = r[ht];
    l && (l(), delete r[ht]);
  }, t);
}
function ml(e, t, n, r = {}) {
  const l = t === "local", a = Ln(null);
  if (l && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
    throw Q(J.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  const c = w(r.inheritLocale) ? r.inheritLocale : !p(r.locale), i = Ae(
    // prettier-ignore
    !l || c ? n.locale.value : p(r.locale) ? r.locale : Re
  ), u = Ae(
    // prettier-ignore
    !l || c ? n.fallbackLocale.value : p(r.fallbackLocale) || G(r.fallbackLocale) || F(r.fallbackLocale) || r.fallbackLocale === !1 ? r.fallbackLocale : i.value
  ), m = Ae(ut(i.value, r)), I = Ae(F(r.datetimeFormats) ? r.datetimeFormats : { [i.value]: {} }), T = Ae(F(r.numberFormats) ? r.numberFormats : { [i.value]: {} }), g = l ? n.missingWarn : w(r.missingWarn) || ge(r.missingWarn) ? r.missingWarn : !0, C = l ? n.fallbackWarn : w(r.fallbackWarn) || ge(r.fallbackWarn) ? r.fallbackWarn : !0, y = l ? n.fallbackRoot : w(r.fallbackRoot) ? r.fallbackRoot : !0, S = !!r.fallbackFormat, v = x(r.missing) ? r.missing : null, A = x(r.postTranslation) ? r.postTranslation : null, U = l ? n.warnHtmlMessage : w(r.warnHtmlMessage) ? r.warnHtmlMessage : !0, _ = !!r.escapeParameter, d = l ? n.modifiers : F(r.modifiers) ? r.modifiers : {}, b = r.pluralRules || l && n.pluralRules;
  function L() {
    return [
      i.value,
      u.value,
      m.value,
      I.value,
      T.value
    ];
  }
  const h = oe({
    get: () => a.value ? a.value.locale.value : i.value,
    set: (O) => {
      a.value && (a.value.locale.value = O), i.value = O;
    }
  }), k = oe({
    get: () => a.value ? a.value.fallbackLocale.value : u.value,
    set: (O) => {
      a.value && (a.value.fallbackLocale.value = O), u.value = O;
    }
  }), P = oe(() => a.value ? a.value.messages.value : m.value), B = oe(() => I.value), te = oe(() => T.value);
  function W() {
    return a.value ? a.value.getPostTranslationHandler() : A;
  }
  function Z(O) {
    a.value && a.value.setPostTranslationHandler(O);
  }
  function Fe() {
    return a.value ? a.value.getMissingHandler() : v;
  }
  function Me(O) {
    a.value && a.value.setMissingHandler(O);
  }
  function ce(O) {
    return L(), O();
  }
  function Ue(...O) {
    return a.value ? ce(() => Reflect.apply(a.value.t, null, [...O])) : ce(() => "");
  }
  function we(...O) {
    return a.value ? Reflect.apply(a.value.rt, null, [...O]) : "";
  }
  function We(...O) {
    return a.value ? ce(() => Reflect.apply(a.value.d, null, [...O])) : ce(() => "");
  }
  function $e(...O) {
    return a.value ? ce(() => Reflect.apply(a.value.n, null, [...O])) : ce(() => "");
  }
  function ae(O) {
    return a.value ? a.value.tm(O) : {};
  }
  function Ie(O, V) {
    return a.value ? a.value.te(O, V) : !1;
  }
  function Ve(O) {
    return a.value ? a.value.getLocaleMessage(O) : {};
  }
  function he(O, V) {
    a.value && (a.value.setLocaleMessage(O, V), m.value[O] = V);
  }
  function He(O, V) {
    a.value && a.value.mergeLocaleMessage(O, V);
  }
  function Ye(O) {
    return a.value ? a.value.getDateTimeFormat(O) : {};
  }
  function et(O, V) {
    a.value && (a.value.setDateTimeFormat(O, V), I.value[O] = V);
  }
  function xe(O, V) {
    a.value && a.value.mergeDateTimeFormat(O, V);
  }
  function Ge(O) {
    return a.value ? a.value.getNumberFormat(O) : {};
  }
  function pe(O, V) {
    a.value && (a.value.setNumberFormat(O, V), T.value[O] = V);
  }
  function Xe(O, V) {
    a.value && a.value.mergeNumberFormat(O, V);
  }
  const je = {
    get id() {
      return a.value ? a.value.id : -1;
    },
    locale: h,
    fallbackLocale: k,
    messages: P,
    datetimeFormats: B,
    numberFormats: te,
    get inheritLocale() {
      return a.value ? a.value.inheritLocale : c;
    },
    set inheritLocale(O) {
      a.value && (a.value.inheritLocale = O);
    },
    get availableLocales() {
      return a.value ? a.value.availableLocales : Object.keys(m.value);
    },
    get modifiers() {
      return a.value ? a.value.modifiers : d;
    },
    get pluralRules() {
      return a.value ? a.value.pluralRules : b;
    },
    get isGlobal() {
      return a.value ? a.value.isGlobal : !1;
    },
    get missingWarn() {
      return a.value ? a.value.missingWarn : g;
    },
    set missingWarn(O) {
      a.value && (a.value.missingWarn = O);
    },
    get fallbackWarn() {
      return a.value ? a.value.fallbackWarn : C;
    },
    set fallbackWarn(O) {
      a.value && (a.value.missingWarn = O);
    },
    get fallbackRoot() {
      return a.value ? a.value.fallbackRoot : y;
    },
    set fallbackRoot(O) {
      a.value && (a.value.fallbackRoot = O);
    },
    get fallbackFormat() {
      return a.value ? a.value.fallbackFormat : S;
    },
    set fallbackFormat(O) {
      a.value && (a.value.fallbackFormat = O);
    },
    get warnHtmlMessage() {
      return a.value ? a.value.warnHtmlMessage : U;
    },
    set warnHtmlMessage(O) {
      a.value && (a.value.warnHtmlMessage = O);
    },
    get escapeParameter() {
      return a.value ? a.value.escapeParameter : _;
    },
    set escapeParameter(O) {
      a.value && (a.value.escapeParameter = O);
    },
    t: Ue,
    getPostTranslationHandler: W,
    setPostTranslationHandler: Z,
    getMissingHandler: Fe,
    setMissingHandler: Me,
    rt: we,
    d: We,
    n: $e,
    tm: ae,
    te: Ie,
    getLocaleMessage: Ve,
    setLocaleMessage: he,
    mergeLocaleMessage: He,
    getDateTimeFormat: Ye,
    setDateTimeFormat: et,
    mergeDateTimeFormat: xe,
    getNumberFormat: Ge,
    setNumberFormat: pe,
    mergeNumberFormat: Xe
  };
  function Ke(O) {
    O.locale.value = i.value, O.fallbackLocale.value = u.value, Object.keys(m.value).forEach((V) => {
      O.mergeLocaleMessage(V, m.value[V]);
    }), Object.keys(I.value).forEach((V) => {
      O.mergeDateTimeFormat(V, I.value[V]);
    }), Object.keys(T.value).forEach((V) => {
      O.mergeNumberFormat(V, T.value[V]);
    }), O.escapeParameter = _, O.fallbackFormat = S, O.fallbackRoot = y, O.fallbackWarn = C, O.missingWarn = g, O.warnHtmlMessage = U;
  }
  return sa(() => {
    if (e.proxy == null || e.proxy.$i18n == null)
      throw Q(J.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    const O = a.value = e.proxy.$i18n.__composer;
    t === "global" ? (i.value = O.locale.value, u.value = O.fallbackLocale.value, m.value = O.messages.value, I.value = O.datetimeFormats.value, T.value = O.numberFormats.value) : l && Ke(O);
  }), je;
}
const dl = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], En = ["t", "rt", "d", "n", "tm", "te"];
function El(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return dl.forEach((l) => {
    const a = Object.getOwnPropertyDescriptor(t, l);
    if (!a)
      throw Q(J.UNEXPECTED_ERROR);
    const c = ca(a.value) ? {
      get() {
        return a.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(i) {
        a.value.value = i;
      }
    } : {
      get() {
        return a.get && a.get();
      }
    };
    Object.defineProperty(n, l, c);
  }), e.config.globalProperties.$i18n = n, En.forEach((l) => {
    const a = Object.getOwnPropertyDescriptor(t, l);
    if (!a || !a.value)
      throw Q(J.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${l}`, a);
  }), () => {
    delete e.config.globalProperties.$i18n, En.forEach((l) => {
      delete e.config.globalProperties[`$${l}`];
    });
  };
}
Xr();
__INTLIFY_JIT_COMPILATION__ ? Qt($r) : Qt(Wr);
kr(ur);
yr(Mn);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = me();
  e.__INTLIFY__ = !0, Tr(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
export {
  vt as DatetimeFormat,
  Il as I18nD,
  ll as I18nInjectionKey,
  Tl as I18nN,
  Nl as I18nT,
  Pt as NumberFormat,
  Ct as Translation,
  Gr as VERSION,
  Ol as castToVueI18n,
  bl as createI18n,
  Ut as useI18n,
  nl as vTDirective
};
