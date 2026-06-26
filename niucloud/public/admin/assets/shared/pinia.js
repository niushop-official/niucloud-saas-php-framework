import { getCurrentInstance as W, inject as B, effectScope as D, ref as J, markRaw as C, toRaw as K, isRef as I, isReactive as H, toRef as M, watch as tt, reactive as et, getCurrentScope as nt, onScopeDispose as st, nextTick as ot, toRefs as rt, computed as ct } from "vue";
var it = !1;
/*!
  * pinia v2.0.30
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let V;
const R = (t) => V = t, bt = () => W() && B(x) || V, x = (
  /* istanbul ignore next */
  Symbol()
);
function L(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var E;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(E || (E = {}));
const ut = typeof window < "u";
function vt() {
  const t = D(!0), s = t.run(() => J({}));
  let n = [], e = [];
  const o = C({
    install(c) {
      R(o), o._a = c, c.provide(x, o), c.config.globalProperties.$pinia = o, e.forEach((f) => n.push(f)), e = [];
    },
    use(c) {
      return !this._a && !it ? e.push(c) : n.push(c), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return o;
}
function St(t, s) {
  return () => {
  };
}
const O = () => {
};
function U(t, s, n, e = O) {
  t.push(s);
  const o = () => {
    const c = t.indexOf(s);
    c > -1 && (t.splice(c, 1), e());
  };
  return !n && nt() && st(o), o;
}
function j(t, ...s) {
  t.slice().forEach((n) => {
    n(...s);
  });
}
function A(t, s) {
  t instanceof Map && s instanceof Map && s.forEach((n, e) => t.set(e, n)), t instanceof Set && s instanceof Set && s.forEach(t.add, t);
  for (const n in s) {
    if (!s.hasOwnProperty(n))
      continue;
    const e = s[n], o = t[n];
    L(o) && L(e) && t.hasOwnProperty(n) && !I(e) && !H(e) ? t[n] = A(o, e) : t[n] = e;
  }
  return t;
}
const q = (
  /* istanbul ignore next */
  Symbol()
);
function dt(t) {
  return Object.defineProperty(t, q, {});
}
function ft(t) {
  return !L(t) || !t.hasOwnProperty(q);
}
const { assign: d } = Object;
function at(t) {
  return !!(I(t) && t.effect);
}
function lt(t, s, n, e) {
  const { state: o, actions: c, getters: f } = s, u = n.state.value[t];
  let y;
  function h() {
    u || (n.state.value[t] = o ? o() : {});
    const p = rt(n.state.value[t]);
    return d(p, c, Object.keys(f || {}).reduce((b, v) => (b[v] = C(ct(() => {
      R(n);
      const m = n._s.get(t);
      return f[v].call(m, m);
    })), b), {}));
  }
  return y = z(t, h, s, n, e, !0), y.$reset = function() {
    const b = o ? o() : {};
    this.$patch((v) => {
      d(v, b);
    });
  }, y;
}
function z(t, s, n = {}, e, o, c) {
  let f;
  const u = d({ actions: {} }, n), y = {
    deep: !0
    // flush: 'post',
  };
  let h, p, b = C([]), v = C([]), m;
  const _ = e.state.value[t];
  !c && !_ && (e.state.value[t] = {}), J({});
  let F;
  function N(i) {
    let r;
    h = p = !1, typeof i == "function" ? (i(e.state.value[t]), r = {
      type: E.patchFunction,
      storeId: t,
      events: m
    }) : (A(e.state.value[t], i), r = {
      type: E.patchObject,
      payload: i,
      storeId: t,
      events: m
    });
    const S = F = Symbol();
    ot().then(() => {
      F === S && (h = !0);
    }), p = !0, j(b, r, e.state.value[t]);
  }
  const Q = O;
  function X() {
    f.stop(), b = [], v = [], e._s.delete(t);
  }
  function Y(i, r) {
    return function() {
      R(e);
      const S = Array.from(arguments), P = [], $ = [];
      function T(a) {
        P.push(a);
      }
      function k(a) {
        $.push(a);
      }
      j(v, {
        args: S,
        name: i,
        store: l,
        after: T,
        onError: k
      });
      let w;
      try {
        w = r.apply(this && this.$id === t ? this : l, S);
      } catch (a) {
        throw j($, a), a;
      }
      return w instanceof Promise ? w.then((a) => (j(P, a), a)).catch((a) => (j($, a), Promise.reject(a))) : (j(P, w), w);
    };
  }
  const Z = {
    _p: e,
    // _s: scope,
    $id: t,
    $onAction: U.bind(null, v),
    $patch: N,
    $reset: Q,
    $subscribe(i, r = {}) {
      const S = U(b, i, r.detached, () => P()), P = f.run(() => tt(() => e.state.value[t], ($) => {
        (r.flush === "sync" ? p : h) && i({
          storeId: t,
          type: E.direct,
          events: m
        }, $);
      }, d({}, y, r)));
      return S;
    },
    $dispose: X
  }, l = et(Z);
  e._s.set(t, l);
  const g = e._e.run(() => (f = D(), f.run(() => s())));
  for (const i in g) {
    const r = g[i];
    if (I(r) && !at(r) || H(r))
      c || (_ && ft(r) && (I(r) ? r.value = _[i] : A(r, _[i])), e.state.value[t][i] = r);
    else if (typeof r == "function") {
      const S = Y(i, r);
      g[i] = S, u.actions[i] = r;
    }
  }
  return d(l, g), d(K(l), g), Object.defineProperty(l, "$state", {
    get: () => e.state.value[t],
    set: (i) => {
      N((r) => {
        d(r, i);
      });
    }
  }), e._p.forEach((i) => {
    d(l, f.run(() => i({
      store: l,
      app: e._a,
      pinia: e,
      options: u
    })));
  }), _ && c && n.hydrate && n.hydrate(l.$state, _), h = !0, p = !0, l;
}
function yt(t, s, n) {
  let e, o;
  const c = typeof s == "function";
  typeof t == "string" ? (e = t, o = c ? n : s) : (o = t, e = t.id);
  function f(u, y) {
    const h = W();
    return u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    u || h && B(x, null), u && R(u), u = V, u._s.has(e) || (c ? z(e, s, o, u) : lt(e, o, u)), u._s.get(e);
  }
  return f.$id = e, f;
}
let G = "Store";
function mt(t) {
  G = t;
}
function _t(...t) {
  return t.reduce((s, n) => (s[n.$id + G] = function() {
    return n(this.$pinia);
  }, s), {});
}
function ht(t, s) {
  return Array.isArray(s) ? s.reduce((n, e) => (n[e] = function() {
    return t(this.$pinia)[e];
  }, n), {}) : Object.keys(s).reduce((n, e) => (n[e] = function() {
    const o = t(this.$pinia), c = s[e];
    return typeof c == "function" ? c.call(this, o) : o[c];
  }, n), {});
}
const jt = ht;
function gt(t, s) {
  return Array.isArray(s) ? s.reduce((n, e) => (n[e] = function(...o) {
    return t(this.$pinia)[e](...o);
  }, n), {}) : Object.keys(s).reduce((n, e) => (n[e] = function(...o) {
    return t(this.$pinia)[s[e]](...o);
  }, n), {});
}
function Pt(t, s) {
  return Array.isArray(s) ? s.reduce((n, e) => (n[e] = {
    get() {
      return t(this.$pinia)[e];
    },
    set(o) {
      return t(this.$pinia)[e] = o;
    }
  }, n), {}) : Object.keys(s).reduce((n, e) => (n[e] = {
    get() {
      return t(this.$pinia)[s[e]];
    },
    set(o) {
      return t(this.$pinia)[s[e]] = o;
    }
  }, n), {});
}
function $t(t) {
  {
    t = K(t);
    const s = {};
    for (const n in t) {
      const e = t[n];
      (I(e) || H(e)) && (s[n] = // ---
      M(t, n));
    }
    return s;
  }
}
const wt = function(t) {
  t.mixin({
    beforeCreate() {
      const s = this.$options;
      if (s.pinia) {
        const n = s.pinia;
        if (!this._provided) {
          const e = {};
          Object.defineProperty(this, "_provided", {
            get: () => e,
            set: (o) => Object.assign(e, o)
          });
        }
        this._provided[x] = n, this.$pinia || (this.$pinia = n), n._a = this, ut && R(n);
      } else
        !this.$pinia && s.parent && s.parent.$pinia && (this.$pinia = s.parent.$pinia);
    },
    destroyed() {
      delete this._pStores;
    }
  });
};
export {
  E as MutationType,
  wt as PiniaVuePlugin,
  St as acceptHMRUpdate,
  vt as createPinia,
  yt as defineStore,
  bt as getActivePinia,
  gt as mapActions,
  jt as mapGetters,
  ht as mapState,
  _t as mapStores,
  Pt as mapWritableState,
  R as setActivePinia,
  mt as setMapStoreSuffix,
  dt as skipHydrate,
  $t as storeToRefs
};
