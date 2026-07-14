var H = Object.defineProperty;
var K = (r, i, s) => i in r ? H(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s;
var q = (r, i, s) => (K(r, typeof i != "symbol" ? i + "" : i, s), s);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { shallowRef, watchEffect, readonly, unref, ref, version as version$2, watch, customRef, getCurrentScope, onScopeDispose, effectScope, provide, inject, isRef, computed, reactive, toRefs as toRefs$1, toRef, getCurrentInstance, onBeforeMount, nextTick, onBeforeUnmount, onMounted, onUnmounted, isReactive, onUpdated, markRaw, onBeforeUpdate, defineComponent, defineAsyncComponent, openBlock, createBlock, resolveDynamicComponent, resolveComponent, withCtx, createVNode, createElementBlock, Fragment, createElementVNode, normalizeClass, normalizeStyle, withModifiers, toDisplayString, renderList, createCommentVNode, pushScopeId, popScopeId, toRaw, resolveDirective, renderSlot, createTextVNode, withDirectives, onDeactivated } from "vue";
import axios$2 from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { createI18n } from "vue-i18n";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
var isVue2$1 = !1, isVue3$1 = !0, Vue2$1 = void 0;
function install$2() {
}
function set$2(r, i, s) {
  return Array.isArray(r) ? (r.length = Math.max(r.length, i), r.splice(i, 1, s), s) : (r[i] = s, s);
}
function del$1(r, i) {
  if (Array.isArray(r)) {
    r.splice(i, 1);
    return;
  }
  delete r[i];
}
var __defProp$9$1 = Object.defineProperty, __defProps$6$1 = Object.defineProperties, __getOwnPropDescs$6$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$b$1 = Object.getOwnPropertySymbols, __hasOwnProp$b$1 = Object.prototype.hasOwnProperty, __propIsEnum$b$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$9$1 = (r, i, s) => i in r ? __defProp$9$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$9$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$b$1.call(i, s) && __defNormalProp$9$1(r, s, i[s]);
  if (__getOwnPropSymbols$b$1)
    for (var s of __getOwnPropSymbols$b$1(i))
      __propIsEnum$b$1.call(i, s) && __defNormalProp$9$1(r, s, i[s]);
  return r;
}, __spreadProps$6$1 = (r, i) => __defProps$6$1(r, __getOwnPropDescs$6$1(i));
function computedEager(r, i) {
  var s;
  const a = shallowRef();
  return watchEffect(() => {
    a.value = r();
  }, __spreadProps$6$1(__spreadValues$9$1({}, i), {
    flush: (s = i == null ? void 0 : i.flush) != null ? s : "sync"
  })), readonly(a);
}
var _a;
const isClient = typeof window < "u", isDef = (r) => typeof r < "u", assert = (r, ...i) => {
  r || console.warn(...i);
}, toString = Object.prototype.toString, isBoolean = (r) => typeof r == "boolean", isFunction = (r) => typeof r == "function", isNumber = (r) => typeof r == "number", isString = (r) => typeof r == "string", isObject = (r) => toString.call(r) === "[object Object]", isWindow = (r) => typeof window < "u" && toString.call(r) === "[object Window]", now = () => Date.now(), timestamp = () => +Date.now(), clamp = (r, i, s) => Math.min(s, Math.max(i, r)), noop = () => {
}, rand = (r, i) => (r = Math.ceil(r), i = Math.floor(i), Math.floor(Math.random() * (i - r + 1)) + r), isIOS = isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent), hasOwn = (r, i) => Object.prototype.hasOwnProperty.call(r, i);
function resolveUnref(r) {
  return typeof r == "function" ? r() : unref(r);
}
function createFilterWrapper(r, i) {
  function s(...a) {
    return new Promise((c, d) => {
      Promise.resolve(r(() => i.apply(this, a), { fn: i, thisArg: this, args: a })).then(c).catch(d);
    });
  }
  return s;
}
const bypassFilter = (r) => r();
function debounceFilter(r, i = {}) {
  let s, a, c = noop;
  const d = (p) => {
    clearTimeout(p), c(), c = noop;
  };
  return (p) => {
    const u = resolveUnref(r), m = resolveUnref(i.maxWait);
    return s && d(s), u <= 0 || m !== void 0 && m <= 0 ? (a && (d(a), a = null), Promise.resolve(p())) : new Promise((v, g) => {
      c = i.rejectOnCancel ? g : v, m && !a && (a = setTimeout(() => {
        s && d(s), a = null, v(p());
      }, m)), s = setTimeout(() => {
        a && d(a), a = null, v(p());
      }, u);
    });
  };
}
function throttleFilter(r, i = !0, s = !0, a = !1) {
  let c = 0, d, l = !0, p = noop, u;
  const m = () => {
    d && (clearTimeout(d), d = void 0, p(), p = noop);
  };
  return (g) => {
    const f = resolveUnref(r), w = Date.now() - c, h = () => u = g();
    if (m(), f <= 0)
      return c = Date.now(), h();
    if (w > f && (s || !l))
      c = Date.now(), h();
    else if (i)
      return new Promise((_, y) => {
        p = a ? y : _, d = setTimeout(() => {
          c = Date.now(), l = !0, _(h()), m();
        }, f - w);
      });
    return !s && !d && (d = setTimeout(() => l = !0, f)), l = !1, u;
  };
}
function pausableFilter(r = bypassFilter) {
  const i = ref(!0);
  function s() {
    i.value = !1;
  }
  function a() {
    i.value = !0;
  }
  const c = (...d) => {
    i.value && r(...d);
  };
  return { isActive: readonly(i), pause: s, resume: a, eventFilter: c };
}
function __onlyVue3(r = "this function") {
  if (!isVue3$1)
    throw new Error(`[VueUse] ${r} is only works on Vue 3.`);
}
function __onlyVue27Plus(r = "this function") {
  if (!(isVue3$1 || version$2.startsWith("2.7.")))
    throw new Error(`[VueUse] ${r} is only works on Vue 2.7 or above.`);
}
const directiveHooks = {
  mounted: isVue3$1 ? "mounted" : "inserted",
  updated: isVue3$1 ? "updated" : "componentUpdated",
  unmounted: isVue3$1 ? "unmounted" : "unbind"
};
function promiseTimeout(r, i = !1, s = "Timeout") {
  return new Promise((a, c) => {
    setTimeout(i ? () => c(s) : a, r);
  });
}
function identity(r) {
  return r;
}
function createSingletonPromise(r) {
  let i;
  function s() {
    return i || (i = r()), i;
  }
  return s.reset = async () => {
    const a = i;
    i = void 0, a && await a;
  }, s;
}
function invoke(r) {
  return r();
}
function containsProp(r, ...i) {
  return i.some((s) => s in r);
}
function increaseWithUnit(r, i) {
  var s;
  if (typeof r == "number")
    return r + i;
  const a = ((s = r.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : s[0]) || "", c = r.slice(a.length), d = parseFloat(a) + i;
  return Number.isNaN(d) ? r : d + c;
}
function objectPick(r, i, s = !1) {
  return i.reduce((a, c) => (c in r && (!s || r[c] !== void 0) && (a[c] = r[c]), a), {});
}
function computedWithControl(r, i) {
  let s, a, c;
  const d = ref(!0), l = () => {
    d.value = !0, c();
  };
  watch(r, l, { flush: "sync" });
  const p = isFunction(i) ? i : i.get, u = isFunction(i) ? void 0 : i.set, m = customRef((v, g) => (a = v, c = g, {
    get() {
      return d.value && (s = p(), d.value = !1), a(), s;
    },
    set(f) {
      u == null || u(f);
    }
  }));
  return Object.isExtensible(m) && (m.trigger = l), m;
}
function tryOnScopeDispose(r) {
  return getCurrentScope() ? (onScopeDispose(r), !0) : !1;
}
function createEventHook() {
  const r = [], i = (c) => {
    const d = r.indexOf(c);
    d !== -1 && r.splice(d, 1);
  };
  return {
    on: (c) => {
      r.push(c);
      const d = () => i(c);
      return tryOnScopeDispose(d), {
        off: d
      };
    },
    off: i,
    trigger: (c) => {
      r.forEach((d) => d(c));
    }
  };
}
function createGlobalState(r) {
  let i = !1, s;
  const a = effectScope(!0);
  return () => (i || (s = a.run(r), i = !0), s);
}
function createInjectionState(r) {
  const i = Symbol("InjectionState");
  return [(...c) => {
    const d = r(...c);
    return provide(i, d), d;
  }, () => inject(i)];
}
function createSharedComposable(r) {
  let i = 0, s, a;
  const c = () => {
    i -= 1, a && i <= 0 && (a.stop(), s = void 0, a = void 0);
  };
  return (...d) => (i += 1, s || (a = effectScope(!0), s = a.run(() => r(...d))), tryOnScopeDispose(c), s);
}
function extendRef(r, i, { enumerable: s = !1, unwrap: a = !0 } = {}) {
  __onlyVue27Plus();
  for (const [c, d] of Object.entries(i))
    c !== "value" && (isRef(d) && a ? Object.defineProperty(r, c, {
      get() {
        return d.value;
      },
      set(l) {
        d.value = l;
      },
      enumerable: s
    }) : Object.defineProperty(r, c, { value: d, enumerable: s }));
  return r;
}
function get(r, i) {
  return i == null ? unref(r) : unref(r)[i];
}
function isDefined(r) {
  return unref(r) != null;
}
var __defProp$8$1 = Object.defineProperty, __getOwnPropSymbols$a$1 = Object.getOwnPropertySymbols, __hasOwnProp$a$1 = Object.prototype.hasOwnProperty, __propIsEnum$a$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$8$1 = (r, i, s) => i in r ? __defProp$8$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$8$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$a$1.call(i, s) && __defNormalProp$8$1(r, s, i[s]);
  if (__getOwnPropSymbols$a$1)
    for (var s of __getOwnPropSymbols$a$1(i))
      __propIsEnum$a$1.call(i, s) && __defNormalProp$8$1(r, s, i[s]);
  return r;
};
function makeDestructurable(r, i) {
  if (typeof Symbol < "u") {
    const s = __spreadValues$8$1({}, r);
    return Object.defineProperty(s, Symbol.iterator, {
      enumerable: !1,
      value() {
        let a = 0;
        return {
          next: () => ({
            value: i[a++],
            done: a > i.length
          })
        };
      }
    }), s;
  } else
    return Object.assign([...i], r);
}
function reactify(r, i) {
  const s = (i == null ? void 0 : i.computedGetter) === !1 ? unref : resolveUnref;
  return function(...a) {
    return computed(() => r.apply(this, a.map((c) => s(c))));
  };
}
function reactifyObject(r, i = {}) {
  let s = [], a;
  if (Array.isArray(i))
    s = i;
  else {
    a = i;
    const { includeOwnProperties: c = !0 } = i;
    s.push(...Object.keys(r)), c && s.push(...Object.getOwnPropertyNames(r));
  }
  return Object.fromEntries(s.map((c) => {
    const d = r[c];
    return [
      c,
      typeof d == "function" ? reactify(d.bind(r), a) : d
    ];
  }));
}
function toReactive(r) {
  if (!isRef(r))
    return reactive(r);
  const i = new Proxy({}, {
    get(s, a, c) {
      return unref(Reflect.get(r.value, a, c));
    },
    set(s, a, c) {
      return isRef(r.value[a]) && !isRef(c) ? r.value[a].value = c : r.value[a] = c, !0;
    },
    deleteProperty(s, a) {
      return Reflect.deleteProperty(r.value, a);
    },
    has(s, a) {
      return Reflect.has(r.value, a);
    },
    ownKeys() {
      return Object.keys(r.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    }
  });
  return reactive(i);
}
function reactiveComputed(r) {
  return toReactive(computed(r));
}
function reactiveOmit(r, ...i) {
  const s = i.flat();
  return reactiveComputed(() => Object.fromEntries(Object.entries(toRefs$1(r)).filter((a) => !s.includes(a[0]))));
}
function reactivePick(r, ...i) {
  const s = i.flat();
  return reactive(Object.fromEntries(s.map((a) => [a, toRef(r, a)])));
}
function refAutoReset(r, i = 1e4) {
  return customRef((s, a) => {
    let c = r, d;
    const l = () => setTimeout(() => {
      c = r, a();
    }, resolveUnref(i));
    return tryOnScopeDispose(() => {
      clearTimeout(d);
    }), {
      get() {
        return s(), c;
      },
      set(p) {
        c = p, a(), clearTimeout(d), d = l();
      }
    };
  });
}
function useDebounceFn(r, i = 200, s = {}) {
  return createFilterWrapper(debounceFilter(i, s), r);
}
function refDebounced(r, i = 200, s = {}) {
  const a = ref(r.value), c = useDebounceFn(() => {
    a.value = r.value;
  }, i, s);
  return watch(r, () => c()), a;
}
function refDefault(r, i) {
  return computed({
    get() {
      var s;
      return (s = r.value) != null ? s : i;
    },
    set(s) {
      r.value = s;
    }
  });
}
function useThrottleFn(r, i = 200, s = !1, a = !0, c = !1) {
  return createFilterWrapper(throttleFilter(i, s, a, c), r);
}
function refThrottled(r, i = 200, s = !0, a = !0) {
  if (i <= 0)
    return r;
  const c = ref(r.value), d = useThrottleFn(() => {
    c.value = r.value;
  }, i, s, a);
  return watch(r, () => d()), c;
}
function refWithControl(r, i = {}) {
  let s = r, a, c;
  const d = customRef((f, w) => (a = f, c = w, {
    get() {
      return l();
    },
    set(h) {
      p(h);
    }
  }));
  function l(f = !0) {
    return f && a(), s;
  }
  function p(f, w = !0) {
    var h, _;
    if (f === s)
      return;
    const y = s;
    ((h = i.onBeforeChange) == null ? void 0 : h.call(i, f, y)) !== !1 && (s = f, (_ = i.onChanged) == null || _.call(i, f, y), w && c());
  }
  return extendRef(d, {
    get: l,
    set: p,
    untrackedGet: () => l(!1),
    silentSet: (f) => p(f, !1),
    peek: () => l(!1),
    lay: (f) => p(f, !1)
  }, { enumerable: !0 });
}
const controlledRef = refWithControl;
function resolveRef(r) {
  return typeof r == "function" ? computed(r) : ref(r);
}
function set$1(...r) {
  if (r.length === 2) {
    const [i, s] = r;
    i.value = s;
  }
  if (r.length === 3)
    if (isVue2$1)
      set$2(...r);
    else {
      const [i, s, a] = r;
      i[s] = a;
    }
}
function syncRef(r, i, s = {}) {
  var a, c;
  const {
    flush: d = "sync",
    deep: l = !1,
    immediate: p = !0,
    direction: u = "both",
    transform: m = {}
  } = s;
  let v, g;
  const f = (a = m.ltr) != null ? a : (h) => h, w = (c = m.rtl) != null ? c : (h) => h;
  return (u === "both" || u === "ltr") && (v = watch(r, (h) => i.value = f(h), { flush: d, deep: l, immediate: p })), (u === "both" || u === "rtl") && (g = watch(i, (h) => r.value = w(h), { flush: d, deep: l, immediate: p })), () => {
    v == null || v(), g == null || g();
  };
}
function syncRefs(r, i, s = {}) {
  const {
    flush: a = "sync",
    deep: c = !1,
    immediate: d = !0
  } = s;
  return Array.isArray(i) || (i = [i]), watch(r, (l) => i.forEach((p) => p.value = l), { flush: a, deep: c, immediate: d });
}
var __defProp$7$1 = Object.defineProperty, __defProps$5$1 = Object.defineProperties, __getOwnPropDescs$5$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$9$1 = Object.getOwnPropertySymbols, __hasOwnProp$9$1 = Object.prototype.hasOwnProperty, __propIsEnum$9$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$7$1 = (r, i, s) => i in r ? __defProp$7$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$7$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$9$1.call(i, s) && __defNormalProp$7$1(r, s, i[s]);
  if (__getOwnPropSymbols$9$1)
    for (var s of __getOwnPropSymbols$9$1(i))
      __propIsEnum$9$1.call(i, s) && __defNormalProp$7$1(r, s, i[s]);
  return r;
}, __spreadProps$5$1 = (r, i) => __defProps$5$1(r, __getOwnPropDescs$5$1(i));
function toRefs(r) {
  if (!isRef(r))
    return toRefs$1(r);
  const i = Array.isArray(r.value) ? new Array(r.value.length) : {};
  for (const s in r.value)
    i[s] = customRef(() => ({
      get() {
        return r.value[s];
      },
      set(a) {
        if (Array.isArray(r.value)) {
          const c = [...r.value];
          c[s] = a, r.value = c;
        } else {
          const c = __spreadProps$5$1(__spreadValues$7$1({}, r.value), { [s]: a });
          Object.setPrototypeOf(c, r.value), r.value = c;
        }
      }
    }));
  return i;
}
function tryOnBeforeMount(r, i = !0) {
  getCurrentInstance() ? onBeforeMount(r) : i ? r() : nextTick(r);
}
function tryOnBeforeUnmount(r) {
  getCurrentInstance() && onBeforeUnmount(r);
}
function tryOnMounted(r, i = !0) {
  getCurrentInstance() ? onMounted(r) : i ? r() : nextTick(r);
}
function tryOnUnmounted(r) {
  getCurrentInstance() && onUnmounted(r);
}
function createUntil(r, i = !1) {
  function s(g, { flush: f = "sync", deep: w = !1, timeout: h, throwOnTimeout: _ } = {}) {
    let y = null;
    const b = [new Promise((P) => {
      y = watch(r, (C) => {
        g(C) !== i && (y == null || y(), P(C));
      }, {
        flush: f,
        deep: w,
        immediate: !0
      });
    })];
    return h != null && b.push(promiseTimeout(h, _).then(() => resolveUnref(r)).finally(() => y == null ? void 0 : y())), Promise.race(b);
  }
  function a(g, f) {
    if (!isRef(g))
      return s((C) => C === g, f);
    const { flush: w = "sync", deep: h = !1, timeout: _, throwOnTimeout: y } = f ?? {};
    let S = null;
    const P = [new Promise((C) => {
      S = watch([r, g], ([k, E]) => {
        i !== (k === E) && (S == null || S(), C(k));
      }, {
        flush: w,
        deep: h,
        immediate: !0
      });
    })];
    return _ != null && P.push(promiseTimeout(_, y).then(() => resolveUnref(r)).finally(() => (S == null || S(), resolveUnref(r)))), Promise.race(P);
  }
  function c(g) {
    return s((f) => Boolean(f), g);
  }
  function d(g) {
    return a(null, g);
  }
  function l(g) {
    return a(void 0, g);
  }
  function p(g) {
    return s(Number.isNaN, g);
  }
  function u(g, f) {
    return s((w) => {
      const h = Array.from(w);
      return h.includes(g) || h.includes(resolveUnref(g));
    }, f);
  }
  function m(g) {
    return v(1, g);
  }
  function v(g = 1, f) {
    let w = -1;
    return s(() => (w += 1, w >= g), f);
  }
  return Array.isArray(resolveUnref(r)) ? {
    toMatch: s,
    toContains: u,
    changed: m,
    changedTimes: v,
    get not() {
      return createUntil(r, !i);
    }
  } : {
    toMatch: s,
    toBe: a,
    toBeTruthy: c,
    toBeNull: d,
    toBeNaN: p,
    toBeUndefined: l,
    changed: m,
    changedTimes: v,
    get not() {
      return createUntil(r, !i);
    }
  };
}
function until(r) {
  return createUntil(r);
}
function useArrayEvery(r, i) {
  return computed(() => resolveUnref(r).every((s, a, c) => i(resolveUnref(s), a, c)));
}
function useArrayFilter(r, i) {
  return computed(() => resolveUnref(r).map((s) => resolveUnref(s)).filter(i));
}
function useArrayFind(r, i) {
  return computed(() => resolveUnref(resolveUnref(r).find((s, a, c) => i(resolveUnref(s), a, c))));
}
function useArrayFindIndex(r, i) {
  return computed(() => resolveUnref(r).findIndex((s, a, c) => i(resolveUnref(s), a, c)));
}
function useArrayJoin(r, i) {
  return computed(() => resolveUnref(r).map((s) => resolveUnref(s)).join(resolveUnref(i)));
}
function useArrayMap(r, i) {
  return computed(() => resolveUnref(r).map((s) => resolveUnref(s)).map(i));
}
function useArrayReduce(r, i, ...s) {
  const a = (c, d, l) => i(resolveUnref(c), resolveUnref(d), l);
  return computed(() => {
    const c = resolveUnref(r);
    return s.length ? c.reduce(a, resolveUnref(s[0])) : c.reduce(a);
  });
}
function useArraySome(r, i) {
  return computed(() => resolveUnref(r).some((s, a, c) => i(resolveUnref(s), a, c)));
}
function useArrayUnique(r) {
  return computed(() => [...new Set(resolveUnref(r).map((i) => resolveUnref(i)))]);
}
function useCounter(r = 0, i = {}) {
  const s = ref(r), {
    max: a = 1 / 0,
    min: c = -1 / 0
  } = i, d = (v = 1) => s.value = Math.min(a, s.value + v), l = (v = 1) => s.value = Math.max(c, s.value - v), p = () => s.value, u = (v) => s.value = Math.max(c, Math.min(a, v));
  return { count: s, inc: d, dec: l, get: p, set: u, reset: (v = r) => (r = v, u(v)) };
}
const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g, defaultMeridiem = (r, i, s, a) => {
  let c = r < 12 ? "AM" : "PM";
  return a && (c = c.split("").reduce((d, l) => d += `${l}.`, "")), s ? c.toLowerCase() : c;
}, formatDate = (r, i, s = {}) => {
  var a;
  const c = r.getFullYear(), d = r.getMonth(), l = r.getDate(), p = r.getHours(), u = r.getMinutes(), m = r.getSeconds(), v = r.getMilliseconds(), g = r.getDay(), f = (a = s.customMeridiem) != null ? a : defaultMeridiem, w = {
    YY: () => String(c).slice(-2),
    YYYY: () => c,
    M: () => d + 1,
    MM: () => `${d + 1}`.padStart(2, "0"),
    MMM: () => r.toLocaleDateString(s.locales, { month: "short" }),
    MMMM: () => r.toLocaleDateString(s.locales, { month: "long" }),
    D: () => String(l),
    DD: () => `${l}`.padStart(2, "0"),
    H: () => String(p),
    HH: () => `${p}`.padStart(2, "0"),
    h: () => `${p % 12 || 12}`.padStart(1, "0"),
    hh: () => `${p % 12 || 12}`.padStart(2, "0"),
    m: () => String(u),
    mm: () => `${u}`.padStart(2, "0"),
    s: () => String(m),
    ss: () => `${m}`.padStart(2, "0"),
    SSS: () => `${v}`.padStart(3, "0"),
    d: () => g,
    dd: () => r.toLocaleDateString(s.locales, { weekday: "narrow" }),
    ddd: () => r.toLocaleDateString(s.locales, { weekday: "short" }),
    dddd: () => r.toLocaleDateString(s.locales, { weekday: "long" }),
    A: () => f(p, u),
    AA: () => f(p, u, !1, !0),
    a: () => f(p, u, !0),
    aa: () => f(p, u, !0, !0)
  };
  return i.replace(REGEX_FORMAT, (h, _) => _ || w[h]());
}, normalizeDate = (r) => {
  if (r === null)
    return new Date(NaN);
  if (r === void 0)
    return new Date();
  if (r instanceof Date)
    return new Date(r);
  if (typeof r == "string" && !/Z$/i.test(r)) {
    const i = r.match(REGEX_PARSE);
    if (i) {
      const s = i[2] - 1 || 0, a = (i[7] || "0").substring(0, 3);
      return new Date(i[1], s, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, a);
    }
  }
  return new Date(r);
};
function useDateFormat(r, i = "HH:mm:ss", s = {}) {
  return computed(() => formatDate(normalizeDate(resolveUnref(r)), resolveUnref(i), s));
}
function useIntervalFn(r, i = 1e3, s = {}) {
  const {
    immediate: a = !0,
    immediateCallback: c = !1
  } = s;
  let d = null;
  const l = ref(!1);
  function p() {
    d && (clearInterval(d), d = null);
  }
  function u() {
    l.value = !1, p();
  }
  function m() {
    const v = resolveUnref(i);
    v <= 0 || (l.value = !0, c && r(), p(), d = setInterval(r, v));
  }
  if (a && isClient && m(), isRef(i) || isFunction(i)) {
    const v = watch(i, () => {
      l.value && isClient && m();
    });
    tryOnScopeDispose(v);
  }
  return tryOnScopeDispose(u), {
    isActive: l,
    pause: u,
    resume: m
  };
}
var __defProp$6$1 = Object.defineProperty, __getOwnPropSymbols$8$1 = Object.getOwnPropertySymbols, __hasOwnProp$8$1 = Object.prototype.hasOwnProperty, __propIsEnum$8$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$6$1 = (r, i, s) => i in r ? __defProp$6$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$6$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$8$1.call(i, s) && __defNormalProp$6$1(r, s, i[s]);
  if (__getOwnPropSymbols$8$1)
    for (var s of __getOwnPropSymbols$8$1(i))
      __propIsEnum$8$1.call(i, s) && __defNormalProp$6$1(r, s, i[s]);
  return r;
};
function useInterval(r = 1e3, i = {}) {
  const {
    controls: s = !1,
    immediate: a = !0,
    callback: c
  } = i, d = ref(0), l = () => d.value += 1, p = useIntervalFn(c ? () => {
    l(), c(d.value);
  } : l, r, { immediate: a });
  return s ? __spreadValues$6$1({
    counter: d
  }, p) : d;
}
function useLastChanged(r, i = {}) {
  var s;
  const a = ref((s = i.initialValue) != null ? s : null);
  return watch(r, () => a.value = timestamp(), i), a;
}
function useTimeoutFn(r, i, s = {}) {
  const {
    immediate: a = !0
  } = s, c = ref(!1);
  let d = null;
  function l() {
    d && (clearTimeout(d), d = null);
  }
  function p() {
    c.value = !1, l();
  }
  function u(...m) {
    l(), c.value = !0, d = setTimeout(() => {
      c.value = !1, d = null, r(...m);
    }, resolveUnref(i));
  }
  return a && (c.value = !0, isClient && u()), tryOnScopeDispose(p), {
    isPending: readonly(c),
    start: u,
    stop: p
  };
}
var __defProp$5$1 = Object.defineProperty, __getOwnPropSymbols$7$1 = Object.getOwnPropertySymbols, __hasOwnProp$7$1 = Object.prototype.hasOwnProperty, __propIsEnum$7$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$5$1 = (r, i, s) => i in r ? __defProp$5$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$5$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$7$1.call(i, s) && __defNormalProp$5$1(r, s, i[s]);
  if (__getOwnPropSymbols$7$1)
    for (var s of __getOwnPropSymbols$7$1(i))
      __propIsEnum$7$1.call(i, s) && __defNormalProp$5$1(r, s, i[s]);
  return r;
};
function useTimeout(r = 1e3, i = {}) {
  const {
    controls: s = !1,
    callback: a
  } = i, c = useTimeoutFn(a ?? noop, r, i), d = computed(() => !c.isPending.value);
  return s ? __spreadValues$5$1({
    ready: d
  }, c) : d;
}
function useToNumber(r, i = {}) {
  const {
    method: s = "parseFloat",
    radix: a,
    nanToZero: c
  } = i;
  return computed(() => {
    let d = resolveUnref(r);
    return typeof d == "string" && (d = Number[s](d, a)), c && isNaN(d) && (d = 0), d;
  });
}
function useToString(r) {
  return computed(() => `${resolveUnref(r)}`);
}
function useToggle(r = !1, i = {}) {
  const {
    truthyValue: s = !0,
    falsyValue: a = !1
  } = i, c = isRef(r), d = ref(r);
  function l(p) {
    if (arguments.length)
      return d.value = p, d.value;
    {
      const u = resolveUnref(s);
      return d.value = d.value === u ? resolveUnref(a) : u, d.value;
    }
  }
  return c ? l : [d, l];
}
function watchArray(r, i, s) {
  let a = s != null && s.immediate ? [] : [
    ...r instanceof Function ? r() : Array.isArray(r) ? r : unref(r)
  ];
  return watch(r, (c, d, l) => {
    const p = new Array(a.length), u = [];
    for (const v of c) {
      let g = !1;
      for (let f = 0; f < a.length; f++)
        if (!p[f] && v === a[f]) {
          p[f] = !0, g = !0;
          break;
        }
      g || u.push(v);
    }
    const m = a.filter((v, g) => !p[g]);
    i(c, a, u, m, l), a = [...c];
  }, s);
}
var __getOwnPropSymbols$6$1 = Object.getOwnPropertySymbols, __hasOwnProp$6$1 = Object.prototype.hasOwnProperty, __propIsEnum$6$1 = Object.prototype.propertyIsEnumerable, __objRest$5 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$6$1.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$6$1)
    for (var a of __getOwnPropSymbols$6$1(r))
      i.indexOf(a) < 0 && __propIsEnum$6$1.call(r, a) && (s[a] = r[a]);
  return s;
};
function watchWithFilter(r, i, s = {}) {
  const a = s, {
    eventFilter: c = bypassFilter
  } = a, d = __objRest$5(a, [
    "eventFilter"
  ]);
  return watch(r, createFilterWrapper(c, i), d);
}
var __getOwnPropSymbols$5$1 = Object.getOwnPropertySymbols, __hasOwnProp$5$1 = Object.prototype.hasOwnProperty, __propIsEnum$5$1 = Object.prototype.propertyIsEnumerable, __objRest$4 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$5$1.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$5$1)
    for (var a of __getOwnPropSymbols$5$1(r))
      i.indexOf(a) < 0 && __propIsEnum$5$1.call(r, a) && (s[a] = r[a]);
  return s;
};
function watchAtMost(r, i, s) {
  const a = s, {
    count: c
  } = a, d = __objRest$4(a, [
    "count"
  ]), l = ref(0), p = watchWithFilter(r, (...u) => {
    l.value += 1, l.value >= resolveUnref(c) && nextTick(() => p()), i(...u);
  }, d);
  return { count: l, stop: p };
}
var __defProp$4$1 = Object.defineProperty, __defProps$4$1 = Object.defineProperties, __getOwnPropDescs$4$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$4$1 = Object.getOwnPropertySymbols, __hasOwnProp$4$1 = Object.prototype.hasOwnProperty, __propIsEnum$4$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$4$1 = (r, i, s) => i in r ? __defProp$4$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$4$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$4$1.call(i, s) && __defNormalProp$4$1(r, s, i[s]);
  if (__getOwnPropSymbols$4$1)
    for (var s of __getOwnPropSymbols$4$1(i))
      __propIsEnum$4$1.call(i, s) && __defNormalProp$4$1(r, s, i[s]);
  return r;
}, __spreadProps$4$1 = (r, i) => __defProps$4$1(r, __getOwnPropDescs$4$1(i)), __objRest$3 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$4$1.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$4$1)
    for (var a of __getOwnPropSymbols$4$1(r))
      i.indexOf(a) < 0 && __propIsEnum$4$1.call(r, a) && (s[a] = r[a]);
  return s;
};
function watchDebounced(r, i, s = {}) {
  const a = s, {
    debounce: c = 0,
    maxWait: d = void 0
  } = a, l = __objRest$3(a, [
    "debounce",
    "maxWait"
  ]);
  return watchWithFilter(r, i, __spreadProps$4$1(__spreadValues$4$1({}, l), {
    eventFilter: debounceFilter(c, { maxWait: d })
  }));
}
var __defProp$3$1 = Object.defineProperty, __defProps$3$1 = Object.defineProperties, __getOwnPropDescs$3$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$3$1 = Object.getOwnPropertySymbols, __hasOwnProp$3$1 = Object.prototype.hasOwnProperty, __propIsEnum$3$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$3$1 = (r, i, s) => i in r ? __defProp$3$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$3$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$3$1.call(i, s) && __defNormalProp$3$1(r, s, i[s]);
  if (__getOwnPropSymbols$3$1)
    for (var s of __getOwnPropSymbols$3$1(i))
      __propIsEnum$3$1.call(i, s) && __defNormalProp$3$1(r, s, i[s]);
  return r;
}, __spreadProps$3$1 = (r, i) => __defProps$3$1(r, __getOwnPropDescs$3$1(i)), __objRest$2$1 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$3$1.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$3$1)
    for (var a of __getOwnPropSymbols$3$1(r))
      i.indexOf(a) < 0 && __propIsEnum$3$1.call(r, a) && (s[a] = r[a]);
  return s;
};
function watchIgnorable(r, i, s = {}) {
  const a = s, {
    eventFilter: c = bypassFilter
  } = a, d = __objRest$2$1(a, [
    "eventFilter"
  ]), l = createFilterWrapper(c, i);
  let p, u, m;
  if (d.flush === "sync") {
    const v = ref(!1);
    u = () => {
    }, p = (g) => {
      v.value = !0, g(), v.value = !1;
    }, m = watch(r, (...g) => {
      v.value || l(...g);
    }, d);
  } else {
    const v = [], g = ref(0), f = ref(0);
    u = () => {
      g.value = f.value;
    }, v.push(watch(r, () => {
      f.value++;
    }, __spreadProps$3$1(__spreadValues$3$1({}, d), { flush: "sync" }))), p = (w) => {
      const h = f.value;
      w(), g.value += f.value - h;
    }, v.push(watch(r, (...w) => {
      const h = g.value > 0 && g.value === f.value;
      g.value = 0, f.value = 0, !h && l(...w);
    }, d)), m = () => {
      v.forEach((w) => w());
    };
  }
  return { stop: m, ignoreUpdates: p, ignorePrevAsyncUpdates: u };
}
function watchOnce(r, i, s) {
  const a = watch(r, (...c) => (nextTick(() => a()), i(...c)), s);
}
var __defProp$2$1 = Object.defineProperty, __defProps$2$1 = Object.defineProperties, __getOwnPropDescs$2$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$2$1 = Object.getOwnPropertySymbols, __hasOwnProp$2$1 = Object.prototype.hasOwnProperty, __propIsEnum$2$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$2$1 = (r, i, s) => i in r ? __defProp$2$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$2$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$2$1.call(i, s) && __defNormalProp$2$1(r, s, i[s]);
  if (__getOwnPropSymbols$2$1)
    for (var s of __getOwnPropSymbols$2$1(i))
      __propIsEnum$2$1.call(i, s) && __defNormalProp$2$1(r, s, i[s]);
  return r;
}, __spreadProps$2$1 = (r, i) => __defProps$2$1(r, __getOwnPropDescs$2$1(i)), __objRest$1$1 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$2$1.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$2$1)
    for (var a of __getOwnPropSymbols$2$1(r))
      i.indexOf(a) < 0 && __propIsEnum$2$1.call(r, a) && (s[a] = r[a]);
  return s;
};
function watchPausable(r, i, s = {}) {
  const a = s, {
    eventFilter: c
  } = a, d = __objRest$1$1(a, [
    "eventFilter"
  ]), { eventFilter: l, pause: p, resume: u, isActive: m } = pausableFilter(c);
  return { stop: watchWithFilter(r, i, __spreadProps$2$1(__spreadValues$2$1({}, d), {
    eventFilter: l
  })), pause: p, resume: u, isActive: m };
}
var __defProp$1$1 = Object.defineProperty, __defProps$1$1 = Object.defineProperties, __getOwnPropDescs$1$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$1$1 = Object.getOwnPropertySymbols, __hasOwnProp$1$1 = Object.prototype.hasOwnProperty, __propIsEnum$1$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$1$1 = (r, i, s) => i in r ? __defProp$1$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$1$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$1$1.call(i, s) && __defNormalProp$1$1(r, s, i[s]);
  if (__getOwnPropSymbols$1$1)
    for (var s of __getOwnPropSymbols$1$1(i))
      __propIsEnum$1$1.call(i, s) && __defNormalProp$1$1(r, s, i[s]);
  return r;
}, __spreadProps$1$1 = (r, i) => __defProps$1$1(r, __getOwnPropDescs$1$1(i)), __objRest$6 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$1$1.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$1$1)
    for (var a of __getOwnPropSymbols$1$1(r))
      i.indexOf(a) < 0 && __propIsEnum$1$1.call(r, a) && (s[a] = r[a]);
  return s;
};
function watchThrottled(r, i, s = {}) {
  const a = s, {
    throttle: c = 0,
    trailing: d = !0,
    leading: l = !0
  } = a, p = __objRest$6(a, [
    "throttle",
    "trailing",
    "leading"
  ]);
  return watchWithFilter(r, i, __spreadProps$1$1(__spreadValues$1$1({}, p), {
    eventFilter: throttleFilter(c, d, l)
  }));
}
var __defProp$n = Object.defineProperty, __defProps$a = Object.defineProperties, __getOwnPropDescs$a = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$p = Object.getOwnPropertySymbols, __hasOwnProp$p = Object.prototype.hasOwnProperty, __propIsEnum$p = Object.prototype.propertyIsEnumerable, __defNormalProp$n = (r, i, s) => i in r ? __defProp$n(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$n = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$p.call(i, s) && __defNormalProp$n(r, s, i[s]);
  if (__getOwnPropSymbols$p)
    for (var s of __getOwnPropSymbols$p(i))
      __propIsEnum$p.call(i, s) && __defNormalProp$n(r, s, i[s]);
  return r;
}, __spreadProps$a = (r, i) => __defProps$a(r, __getOwnPropDescs$a(i));
function watchTriggerable(r, i, s = {}) {
  let a;
  function c() {
    if (!a)
      return;
    const v = a;
    a = void 0, v();
  }
  function d(v) {
    a = v;
  }
  const l = (v, g) => (c(), i(v, g, d)), p = watchIgnorable(r, l, s), { ignoreUpdates: u } = p, m = () => {
    let v;
    return u(() => {
      v = l(getWatchSources(r), getOldValue(r));
    }), v;
  };
  return __spreadProps$a(__spreadValues$n({}, p), {
    trigger: m
  });
}
function getWatchSources(r) {
  return isReactive(r) ? r : Array.isArray(r) ? r.map((i) => getOneWatchSource(i)) : getOneWatchSource(r);
}
function getOneWatchSource(r) {
  return typeof r == "function" ? r() : unref(r);
}
function getOldValue(r) {
  return Array.isArray(r) ? r.map(() => {
  }) : void 0;
}
function whenever(r, i, s) {
  return watch(r, (a, c, d) => {
    a && i(a, c, d);
  }, s);
}
var isVue2 = !1, isVue3 = !0, Vue2 = void 0;
function install$1() {
}
function set(r, i, s) {
  return Array.isArray(r) ? (r.length = Math.max(r.length, i), r.splice(i, 1, s), s) : (r[i] = s, s);
}
function del(r, i) {
  if (Array.isArray(r)) {
    r.splice(i, 1);
    return;
  }
  delete r[i];
}
function computedAsync(r, i, s) {
  let a;
  isRef(s) ? a = {
    evaluating: s
  } : a = s || {};
  const {
    lazy: c = !1,
    evaluating: d = void 0,
    shallow: l = !1,
    onError: p = noop
  } = a, u = ref(!c), m = l ? shallowRef(i) : ref(i);
  let v = 0;
  return watchEffect(async (g) => {
    if (!u.value)
      return;
    v++;
    const f = v;
    let w = !1;
    d && Promise.resolve().then(() => {
      d.value = !0;
    });
    try {
      const h = await r((_) => {
        g(() => {
          d && (d.value = !1), w || _();
        });
      });
      f === v && (m.value = h);
    } catch (h) {
      p(h);
    } finally {
      d && f === v && (d.value = !1), w = !0;
    }
  }), c ? computed(() => (u.value = !0, m.value)) : m;
}
function computedInject(r, i, s, a) {
  let c = inject(r);
  return s && (c = inject(r, s)), a && (c = inject(r, s, a)), typeof i == "function" ? computed((d) => i(c, d)) : computed({
    get: (d) => i.get(c, d),
    set: i.set
  });
}
const createUnrefFn = (r) => function(...i) {
  return r.apply(this, i.map((s) => unref(s)));
};
function unrefElement(r) {
  var i;
  const s = resolveUnref(r);
  return (i = s == null ? void 0 : s.$el) != null ? i : s;
}
const defaultWindow = isClient ? window : void 0, defaultDocument = isClient ? window.document : void 0, defaultNavigator = isClient ? window.navigator : void 0, defaultLocation = isClient ? window.location : void 0;
function useEventListener(...r) {
  let i, s, a, c;
  if (isString(r[0]) || Array.isArray(r[0]) ? ([s, a, c] = r, i = defaultWindow) : [i, s, a, c] = r, !i)
    return noop;
  Array.isArray(s) || (s = [s]), Array.isArray(a) || (a = [a]);
  const d = [], l = () => {
    d.forEach((v) => v()), d.length = 0;
  }, p = (v, g, f) => (v.addEventListener(g, f, c), () => v.removeEventListener(g, f, c)), u = watch(() => unrefElement(i), (v) => {
    l(), v && d.push(...s.flatMap((g) => a.map((f) => p(v, g, f))));
  }, { immediate: !0, flush: "post" }), m = () => {
    u(), l();
  };
  return tryOnScopeDispose(m), m;
}
function onClickOutside(r, i, s = {}) {
  const { window: a = defaultWindow, ignore: c = [], capture: d = !0, detectIframe: l = !1 } = s;
  if (!a)
    return;
  let p = !0, u;
  const m = (w) => c.some((h) => {
    if (typeof h == "string")
      return Array.from(a.document.querySelectorAll(h)).some((_) => _ === w.target || w.composedPath().includes(_));
    {
      const _ = unrefElement(h);
      return _ && (w.target === _ || w.composedPath().includes(_));
    }
  }), v = (w) => {
    a.clearTimeout(u);
    const h = unrefElement(r);
    if (!(!h || h === w.target || w.composedPath().includes(h))) {
      if (w.detail === 0 && (p = !m(w)), !p) {
        p = !0;
        return;
      }
      i(w);
    }
  }, g = [
    useEventListener(a, "click", v, { passive: !0, capture: d }),
    useEventListener(a, "pointerdown", (w) => {
      const h = unrefElement(r);
      h && (p = !w.composedPath().includes(h) && !m(w));
    }, { passive: !0 }),
    useEventListener(a, "pointerup", (w) => {
      if (w.button === 0) {
        const h = w.composedPath();
        w.composedPath = () => h, u = a.setTimeout(() => v(w), 50);
      }
    }, { passive: !0 }),
    l && useEventListener(a, "blur", (w) => {
      var h;
      const _ = unrefElement(r);
      ((h = a.document.activeElement) == null ? void 0 : h.tagName) === "IFRAME" && !(_ != null && _.contains(a.document.activeElement)) && i(w);
    })
  ].filter(Boolean);
  return () => g.forEach((w) => w());
}
var __defProp$m = Object.defineProperty, __defProps$9 = Object.defineProperties, __getOwnPropDescs$9 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$o = Object.getOwnPropertySymbols, __hasOwnProp$o = Object.prototype.hasOwnProperty, __propIsEnum$o = Object.prototype.propertyIsEnumerable, __defNormalProp$m = (r, i, s) => i in r ? __defProp$m(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$m = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$o.call(i, s) && __defNormalProp$m(r, s, i[s]);
  if (__getOwnPropSymbols$o)
    for (var s of __getOwnPropSymbols$o(i))
      __propIsEnum$o.call(i, s) && __defNormalProp$m(r, s, i[s]);
  return r;
}, __spreadProps$9 = (r, i) => __defProps$9(r, __getOwnPropDescs$9(i));
const createKeyPredicate = (r) => typeof r == "function" ? r : typeof r == "string" ? (i) => i.key === r : Array.isArray(r) ? (i) => r.includes(i.key) : () => !0;
function onKeyStroke(...r) {
  let i, s, a = {};
  r.length === 3 ? (i = r[0], s = r[1], a = r[2]) : r.length === 2 ? typeof r[1] == "object" ? (i = !0, s = r[0], a = r[1]) : (i = r[0], s = r[1]) : (i = !0, s = r[0]);
  const { target: c = defaultWindow, eventName: d = "keydown", passive: l = !1 } = a, p = createKeyPredicate(i);
  return useEventListener(c, d, (m) => {
    p(m) && s(m);
  }, l);
}
function onKeyDown(r, i, s = {}) {
  return onKeyStroke(r, i, __spreadProps$9(__spreadValues$m({}, s), { eventName: "keydown" }));
}
function onKeyPressed(r, i, s = {}) {
  return onKeyStroke(r, i, __spreadProps$9(__spreadValues$m({}, s), { eventName: "keypress" }));
}
function onKeyUp(r, i, s = {}) {
  return onKeyStroke(r, i, __spreadProps$9(__spreadValues$m({}, s), { eventName: "keyup" }));
}
const DEFAULT_DELAY = 500;
function onLongPress(r, i, s) {
  var a, c;
  const d = computed(() => unrefElement(r));
  let l;
  function p() {
    l && (clearTimeout(l), l = void 0);
  }
  function u(v) {
    var g, f, w, h;
    (g = s == null ? void 0 : s.modifiers) != null && g.self && v.target !== d.value || (p(), (f = s == null ? void 0 : s.modifiers) != null && f.prevent && v.preventDefault(), (w = s == null ? void 0 : s.modifiers) != null && w.stop && v.stopPropagation(), l = setTimeout(() => i(v), (h = s == null ? void 0 : s.delay) != null ? h : DEFAULT_DELAY));
  }
  const m = {
    capture: (a = s == null ? void 0 : s.modifiers) == null ? void 0 : a.capture,
    once: (c = s == null ? void 0 : s.modifiers) == null ? void 0 : c.once
  };
  useEventListener(d, "pointerdown", u, m), useEventListener(d, "pointerup", p, m), useEventListener(d, "pointerleave", p, m);
}
const isFocusedElementEditable = () => {
  const { activeElement: r, body: i } = document;
  if (!r || r === i)
    return !1;
  switch (r.tagName) {
    case "INPUT":
    case "TEXTAREA":
      return !0;
  }
  return r.hasAttribute("contenteditable");
}, isTypedCharValid = ({
  keyCode: r,
  metaKey: i,
  ctrlKey: s,
  altKey: a
}) => i || s || a ? !1 : r >= 48 && r <= 57 || r >= 96 && r <= 105 || r >= 65 && r <= 90;
function onStartTyping(r, i = {}) {
  const { document: s = defaultDocument } = i;
  s && useEventListener(s, "keydown", (c) => {
    !isFocusedElementEditable() && isTypedCharValid(c) && r(c);
  }, { passive: !0 });
}
function templateRef(r, i = null) {
  const s = getCurrentInstance();
  let a = () => {
  };
  const c = customRef((d, l) => (a = l, {
    get() {
      var p, u;
      return d(), (u = (p = s == null ? void 0 : s.proxy) == null ? void 0 : p.$refs[r]) != null ? u : i;
    },
    set() {
    }
  }));
  return tryOnMounted(a), onUpdated(a), c;
}
function useActiveElement(r = {}) {
  var i;
  const { window: s = defaultWindow } = r, a = (i = r.document) != null ? i : s == null ? void 0 : s.document, c = computedWithControl(() => null, () => a == null ? void 0 : a.activeElement);
  return s && (useEventListener(s, "blur", (d) => {
    d.relatedTarget === null && c.trigger();
  }, !0), useEventListener(s, "focus", c.trigger, !0)), c;
}
function useAsyncQueue(r, i = {}) {
  const {
    interrupt: s = !0,
    onError: a = noop,
    onFinished: c = noop
  } = i, d = {
    pending: "pending",
    rejected: "rejected",
    fulfilled: "fulfilled"
  }, l = Array.from(new Array(r.length), () => ({ state: d.pending, data: null })), p = reactive(l), u = ref(-1);
  if (!r || r.length === 0)
    return c(), {
      activeIndex: u,
      result: p
    };
  function m(v, g) {
    u.value++, p[u.value].data = g, p[u.value].state = v;
  }
  return r.reduce((v, g) => v.then((f) => {
    var w;
    if (((w = p[u.value]) == null ? void 0 : w.state) === d.rejected && s) {
      c();
      return;
    }
    return g(f).then((h) => (m(d.fulfilled, h), u.value === r.length - 1 && c(), h));
  }).catch((f) => (m(d.rejected, f), a(), f)), Promise.resolve()), {
    activeIndex: u,
    result: p
  };
}
function useAsyncState(r, i, s) {
  const {
    immediate: a = !0,
    delay: c = 0,
    onError: d = noop,
    onSuccess: l = noop,
    resetOnExecute: p = !0,
    shallow: u = !0,
    throwError: m
  } = s ?? {}, v = u ? shallowRef(i) : ref(i), g = ref(!1), f = ref(!1), w = ref(void 0);
  async function h(_ = 0, ...y) {
    p && (v.value = i), w.value = void 0, g.value = !1, f.value = !0, _ > 0 && await promiseTimeout(_);
    const S = typeof r == "function" ? r(...y) : r;
    try {
      const b = await S;
      v.value = b, g.value = !0, l(b);
    } catch (b) {
      if (w.value = b, d(b), m)
        throw w;
    } finally {
      f.value = !1;
    }
    return v.value;
  }
  return a && h(c), {
    state: v,
    isReady: g,
    isLoading: f,
    error: w,
    execute: h
  };
}
const defaults$1 = {
  array: (r) => JSON.stringify(r),
  object: (r) => JSON.stringify(r),
  set: (r) => JSON.stringify(Array.from(r)),
  map: (r) => JSON.stringify(Object.fromEntries(r)),
  null: () => ""
};
function getDefaultSerialization(r) {
  return r ? r instanceof Map ? defaults$1.map : r instanceof Set ? defaults$1.set : Array.isArray(r) ? defaults$1.array : defaults$1.object : defaults$1.null;
}
function useBase64(r, i) {
  const s = ref(""), a = ref();
  function c() {
    if (isClient)
      return a.value = new Promise((d, l) => {
        try {
          const p = resolveUnref(r);
          if (p == null)
            d("");
          else if (typeof p == "string")
            d(blobToBase64(new Blob([p], { type: "text/plain" })));
          else if (p instanceof Blob)
            d(blobToBase64(p));
          else if (p instanceof ArrayBuffer)
            d(window.btoa(String.fromCharCode(...new Uint8Array(p))));
          else if (p instanceof HTMLCanvasElement)
            d(p.toDataURL(i == null ? void 0 : i.type, i == null ? void 0 : i.quality));
          else if (p instanceof HTMLImageElement) {
            const u = p.cloneNode(!1);
            u.crossOrigin = "Anonymous", imgLoaded(u).then(() => {
              const m = document.createElement("canvas"), v = m.getContext("2d");
              m.width = u.width, m.height = u.height, v.drawImage(u, 0, 0, m.width, m.height), d(m.toDataURL(i == null ? void 0 : i.type, i == null ? void 0 : i.quality));
            }).catch(l);
          } else if (typeof p == "object") {
            const m = ((i == null ? void 0 : i.serializer) || getDefaultSerialization(p))(p);
            return d(blobToBase64(new Blob([m], { type: "application/json" })));
          } else
            l(new Error("target is unsupported types"));
        } catch (p) {
          l(p);
        }
      }), a.value.then((d) => s.value = d), a.value;
  }
  return isRef(r) || isFunction(r) ? watch(r, c, { immediate: !0 }) : c(), {
    base64: s,
    promise: a,
    execute: c
  };
}
function imgLoaded(r) {
  return new Promise((i, s) => {
    r.complete ? i() : (r.onload = () => {
      i();
    }, r.onerror = s);
  });
}
function blobToBase64(r) {
  return new Promise((i, s) => {
    const a = new FileReader();
    a.onload = (c) => {
      i(c.target.result);
    }, a.onerror = s, a.readAsDataURL(r);
  });
}
function useSupported(r, i = !1) {
  const s = ref(), a = () => s.value = Boolean(r());
  return a(), tryOnMounted(a, i), s;
}
function useBattery({ navigator: r = defaultNavigator } = {}) {
  const i = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"], s = useSupported(() => r && "getBattery" in r), a = ref(!1), c = ref(0), d = ref(0), l = ref(1);
  let p;
  function u() {
    a.value = this.charging, c.value = this.chargingTime || 0, d.value = this.dischargingTime || 0, l.value = this.level;
  }
  return s.value && r.getBattery().then((m) => {
    p = m, u.call(p);
    for (const v of i)
      useEventListener(p, v, u, { passive: !0 });
  }), {
    isSupported: s,
    charging: a,
    chargingTime: c,
    dischargingTime: d,
    level: l
  };
}
function useBluetooth(r) {
  let {
    acceptAllDevices: i = !1
  } = r || {};
  const {
    filters: s = void 0,
    optionalServices: a = void 0,
    navigator: c = defaultNavigator
  } = r || {}, d = useSupported(() => c && "bluetooth" in c), l = shallowRef(void 0), p = shallowRef(null);
  watch(l, () => {
    g();
  });
  async function u() {
    if (d.value) {
      p.value = null, s && s.length > 0 && (i = !1);
      try {
        l.value = await (c == null ? void 0 : c.bluetooth.requestDevice({
          acceptAllDevices: i,
          filters: s,
          optionalServices: a
        }));
      } catch (f) {
        p.value = f;
      }
    }
  }
  const m = ref(), v = computed(() => {
    var f;
    return ((f = m.value) == null ? void 0 : f.connected) || !1;
  });
  async function g() {
    if (p.value = null, l.value && l.value.gatt) {
      l.value.addEventListener("gattserverdisconnected", () => {
      });
      try {
        m.value = await l.value.gatt.connect();
      } catch (f) {
        p.value = f;
      }
    }
  }
  return tryOnMounted(() => {
    var f;
    l.value && ((f = l.value.gatt) == null || f.connect());
  }), tryOnScopeDispose(() => {
    var f;
    l.value && ((f = l.value.gatt) == null || f.disconnect());
  }), {
    isSupported: d,
    isConnected: v,
    device: l,
    requestDevice: u,
    server: m,
    error: p
  };
}
function useMediaQuery(r, i = {}) {
  const { window: s = defaultWindow } = i, a = useSupported(() => s && "matchMedia" in s && typeof s.matchMedia == "function");
  let c;
  const d = ref(!1), l = () => {
    c && ("removeEventListener" in c ? c.removeEventListener("change", p) : c.removeListener(p));
  }, p = () => {
    a.value && (l(), c = s.matchMedia(resolveRef(r).value), d.value = c.matches, "addEventListener" in c ? c.addEventListener("change", p) : c.addListener(p));
  };
  return watchEffect(p), tryOnScopeDispose(() => l()), d;
}
const breakpointsTailwind = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
}, breakpointsBootstrapV5 = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}, breakpointsVuetify = {
  xs: 600,
  sm: 960,
  md: 1264,
  lg: 1904
}, breakpointsAntDesign = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}, breakpointsQuasar = {
  xs: 600,
  sm: 1024,
  md: 1440,
  lg: 1920
}, breakpointsSematic = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop4K: 2560
}, breakpointsMasterCss = {
  "3xs": 360,
  "2xs": 480,
  xs: 600,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  "2xl": 1600,
  "3xl": 1920,
  "4xl": 2560
};
var __defProp$l = Object.defineProperty, __getOwnPropSymbols$n = Object.getOwnPropertySymbols, __hasOwnProp$n = Object.prototype.hasOwnProperty, __propIsEnum$n = Object.prototype.propertyIsEnumerable, __defNormalProp$l = (r, i, s) => i in r ? __defProp$l(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$l = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$n.call(i, s) && __defNormalProp$l(r, s, i[s]);
  if (__getOwnPropSymbols$n)
    for (var s of __getOwnPropSymbols$n(i))
      __propIsEnum$n.call(i, s) && __defNormalProp$l(r, s, i[s]);
  return r;
};
function useBreakpoints(r, i = {}) {
  function s(p, u) {
    let m = r[p];
    return u != null && (m = increaseWithUnit(m, u)), typeof m == "number" && (m = `${m}px`), m;
  }
  const { window: a = defaultWindow } = i;
  function c(p) {
    return a ? a.matchMedia(p).matches : !1;
  }
  const d = (p) => useMediaQuery(`(min-width: ${s(p)})`, i), l = Object.keys(r).reduce((p, u) => (Object.defineProperty(p, u, {
    get: () => d(u),
    enumerable: !0,
    configurable: !0
  }), p), {});
  return __spreadValues$l({
    greater(p) {
      return useMediaQuery(`(min-width: ${s(p, 0.1)})`, i);
    },
    greaterOrEqual: d,
    smaller(p) {
      return useMediaQuery(`(max-width: ${s(p, -0.1)})`, i);
    },
    smallerOrEqual(p) {
      return useMediaQuery(`(max-width: ${s(p)})`, i);
    },
    between(p, u) {
      return useMediaQuery(`(min-width: ${s(p)}) and (max-width: ${s(u, -0.1)})`, i);
    },
    isGreater(p) {
      return c(`(min-width: ${s(p, 0.1)})`);
    },
    isGreaterOrEqual(p) {
      return c(`(min-width: ${s(p)})`);
    },
    isSmaller(p) {
      return c(`(max-width: ${s(p, -0.1)})`);
    },
    isSmallerOrEqual(p) {
      return c(`(max-width: ${s(p)})`);
    },
    isInBetween(p, u) {
      return c(`(min-width: ${s(p)}) and (max-width: ${s(u, -0.1)})`);
    }
  }, l);
}
const useBroadcastChannel = (r) => {
  const {
    name: i,
    window: s = defaultWindow
  } = r, a = useSupported(() => s && "BroadcastChannel" in s), c = ref(!1), d = ref(), l = ref(), p = ref(null), u = (v) => {
    d.value && d.value.postMessage(v);
  }, m = () => {
    d.value && d.value.close(), c.value = !0;
  };
  return a.value && tryOnMounted(() => {
    p.value = null, d.value = new BroadcastChannel(i), d.value.addEventListener("message", (v) => {
      l.value = v.data;
    }, { passive: !0 }), d.value.addEventListener("messageerror", (v) => {
      p.value = v;
    }, { passive: !0 }), d.value.addEventListener("close", () => {
      c.value = !0;
    });
  }), tryOnScopeDispose(() => {
    m();
  }), {
    isSupported: a,
    channel: d,
    data: l,
    post: u,
    close: m,
    error: p,
    isClosed: c
  };
};
function useBrowserLocation({ window: r = defaultWindow } = {}) {
  const i = (a) => {
    const { state: c, length: d } = (r == null ? void 0 : r.history) || {}, { hash: l, host: p, hostname: u, href: m, origin: v, pathname: g, port: f, protocol: w, search: h } = (r == null ? void 0 : r.location) || {};
    return {
      trigger: a,
      state: c,
      length: d,
      hash: l,
      host: p,
      hostname: u,
      href: m,
      origin: v,
      pathname: g,
      port: f,
      protocol: w,
      search: h
    };
  }, s = ref(i("load"));
  return r && (useEventListener(r, "popstate", () => s.value = i("popstate"), { passive: !0 }), useEventListener(r, "hashchange", () => s.value = i("hashchange"), { passive: !0 })), s;
}
function useCached(r, i = (a, c) => a === c, s) {
  const a = ref(r.value);
  return watch(() => r.value, (c) => {
    i(c, a.value) || (a.value = c);
  }, s), a;
}
function useClipboard(r = {}) {
  const {
    navigator: i = defaultNavigator,
    read: s = !1,
    source: a,
    copiedDuring: c = 1500,
    legacy: d = !1
  } = r, l = ["copy", "cut"], p = useSupported(() => i && "clipboard" in i), u = computed(() => p.value || d), m = ref(""), v = ref(!1), g = useTimeoutFn(() => v.value = !1, c);
  function f() {
    p.value ? i.clipboard.readText().then((y) => {
      m.value = y;
    }) : m.value = _();
  }
  if (u.value && s)
    for (const y of l)
      useEventListener(y, f);
  async function w(y = resolveUnref(a)) {
    u.value && y != null && (p.value ? await i.clipboard.writeText(y) : h(y), m.value = y, v.value = !0, g.start());
  }
  function h(y) {
    const S = document.createElement("textarea");
    S.value = y ?? "", S.style.position = "absolute", S.style.opacity = "0", document.body.appendChild(S), S.select(), document.execCommand("copy"), S.remove();
  }
  function _() {
    var y, S, b;
    return (b = (S = (y = document == null ? void 0 : document.getSelection) == null ? void 0 : y.call(document)) == null ? void 0 : S.toString()) != null ? b : "";
  }
  return {
    isSupported: u,
    text: m,
    copied: v,
    copy: w
  };
}
var __defProp$k = Object.defineProperty, __defProps$8 = Object.defineProperties, __getOwnPropDescs$8 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$m = Object.getOwnPropertySymbols, __hasOwnProp$m = Object.prototype.hasOwnProperty, __propIsEnum$m = Object.prototype.propertyIsEnumerable, __defNormalProp$k = (r, i, s) => i in r ? __defProp$k(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$k = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$m.call(i, s) && __defNormalProp$k(r, s, i[s]);
  if (__getOwnPropSymbols$m)
    for (var s of __getOwnPropSymbols$m(i))
      __propIsEnum$m.call(i, s) && __defNormalProp$k(r, s, i[s]);
  return r;
}, __spreadProps$8 = (r, i) => __defProps$8(r, __getOwnPropDescs$8(i));
function cloneFnJSON(r) {
  return JSON.parse(JSON.stringify(r));
}
function useCloned(r, i = {}) {
  const s = ref({}), {
    manual: a,
    clone: c = cloneFnJSON,
    deep: d = !0,
    immediate: l = !0
  } = i;
  function p() {
    s.value = c(unref(r));
  }
  return !a && isRef(r) ? watch(r, p, __spreadProps$8(__spreadValues$k({}, i), {
    deep: d,
    immediate: l
  })) : p(), { cloned: s, sync: p };
}
const _global = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(r, i) {
  return handlers[r] || i;
}
function setSSRHandler(r, i) {
  handlers[r] = i;
}
function guessSerializerType(r) {
  return r == null ? "any" : r instanceof Set ? "set" : r instanceof Map ? "map" : r instanceof Date ? "date" : typeof r == "boolean" ? "boolean" : typeof r == "string" ? "string" : typeof r == "object" ? "object" : Number.isNaN(r) ? "any" : "number";
}
var __defProp$j = Object.defineProperty, __getOwnPropSymbols$l = Object.getOwnPropertySymbols, __hasOwnProp$l = Object.prototype.hasOwnProperty, __propIsEnum$l = Object.prototype.propertyIsEnumerable, __defNormalProp$j = (r, i, s) => i in r ? __defProp$j(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$j = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$l.call(i, s) && __defNormalProp$j(r, s, i[s]);
  if (__getOwnPropSymbols$l)
    for (var s of __getOwnPropSymbols$l(i))
      __propIsEnum$l.call(i, s) && __defNormalProp$j(r, s, i[s]);
  return r;
};
const StorageSerializers = {
  boolean: {
    read: (r) => r === "true",
    write: (r) => String(r)
  },
  object: {
    read: (r) => JSON.parse(r),
    write: (r) => JSON.stringify(r)
  },
  number: {
    read: (r) => Number.parseFloat(r),
    write: (r) => String(r)
  },
  any: {
    read: (r) => r,
    write: (r) => String(r)
  },
  string: {
    read: (r) => r,
    write: (r) => String(r)
  },
  map: {
    read: (r) => new Map(JSON.parse(r)),
    write: (r) => JSON.stringify(Array.from(r.entries()))
  },
  set: {
    read: (r) => new Set(JSON.parse(r)),
    write: (r) => JSON.stringify(Array.from(r))
  },
  date: {
    read: (r) => new Date(r),
    write: (r) => r.toISOString()
  }
};
function useStorage(r, i, s, a = {}) {
  var c;
  const {
    flush: d = "pre",
    deep: l = !0,
    listenToStorageChanges: p = !0,
    writeDefaults: u = !0,
    mergeDefaults: m = !1,
    shallow: v,
    window: g = defaultWindow,
    eventFilter: f,
    onError: w = ($) => {
      console.error($);
    }
  } = a, h = (v ? shallowRef : ref)(i);
  if (!s)
    try {
      s = getSSRHandler("getDefaultStorage", () => {
        var $;
        return ($ = defaultWindow) == null ? void 0 : $.localStorage;
      })();
    } catch ($) {
      w($);
    }
  if (!s)
    return h;
  const _ = resolveUnref(i), y = guessSerializerType(_), S = (c = a.serializer) != null ? c : StorageSerializers[y], { pause: b, resume: P } = watchPausable(h, () => C(h.value), { flush: d, deep: l, eventFilter: f });
  return g && p && useEventListener(g, "storage", E), E(), h;
  function C($) {
    try {
      if ($ == null)
        s.removeItem(r);
      else {
        const T = S.write($), x = s.getItem(r);
        x !== T && (s.setItem(r, T), g && (g == null || g.dispatchEvent(new StorageEvent("storage", {
          key: r,
          oldValue: x,
          newValue: T,
          storageArea: s
        }))));
      }
    } catch (T) {
      w(T);
    }
  }
  function k($) {
    const T = $ ? $.newValue : s.getItem(r);
    if (T == null)
      return u && _ !== null && s.setItem(r, S.write(_)), _;
    if (!$ && m) {
      const x = S.read(T);
      return isFunction(m) ? m(x, _) : y === "object" && !Array.isArray(x) ? __spreadValues$j(__spreadValues$j({}, _), x) : x;
    } else
      return typeof T != "string" ? T : S.read(T);
  }
  function E($) {
    if (!($ && $.storageArea !== s)) {
      if ($ && $.key == null) {
        h.value = _;
        return;
      }
      if (!($ && $.key !== r)) {
        b();
        try {
          h.value = k($);
        } catch (T) {
          w(T);
        } finally {
          $ ? nextTick(P) : P();
        }
      }
    }
  }
}
function usePreferredDark(r) {
  return useMediaQuery("(prefers-color-scheme: dark)", r);
}
var __defProp$i = Object.defineProperty, __getOwnPropSymbols$k = Object.getOwnPropertySymbols, __hasOwnProp$k = Object.prototype.hasOwnProperty, __propIsEnum$k = Object.prototype.propertyIsEnumerable, __defNormalProp$i = (r, i, s) => i in r ? __defProp$i(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$i = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$k.call(i, s) && __defNormalProp$i(r, s, i[s]);
  if (__getOwnPropSymbols$k)
    for (var s of __getOwnPropSymbols$k(i))
      __propIsEnum$k.call(i, s) && __defNormalProp$i(r, s, i[s]);
  return r;
};
function useColorMode(r = {}) {
  const {
    selector: i = "html",
    attribute: s = "class",
    initialValue: a = "auto",
    window: c = defaultWindow,
    storage: d,
    storageKey: l = "vueuse-color-scheme",
    listenToStorageChanges: p = !0,
    storageRef: u,
    emitAuto: m
  } = r, v = __spreadValues$i({
    auto: "",
    light: "light",
    dark: "dark"
  }, r.modes || {}), g = usePreferredDark({ window: c }), f = computed(() => g.value ? "dark" : "light"), w = u || (l == null ? ref(a) : useStorage(l, a, d, { window: c, listenToStorageChanges: p })), h = computed({
    get() {
      return w.value === "auto" && !m ? f.value : w.value;
    },
    set(b) {
      w.value = b;
    }
  }), _ = getSSRHandler("updateHTMLAttrs", (b, P, C) => {
    const k = c == null ? void 0 : c.document.querySelector(b);
    if (k)
      if (P === "class") {
        const E = C.split(/\s/g);
        Object.values(v).flatMap(($) => ($ || "").split(/\s/g)).filter(Boolean).forEach(($) => {
          E.includes($) ? k.classList.add($) : k.classList.remove($);
        });
      } else
        k.setAttribute(P, C);
  });
  function y(b) {
    var P;
    const C = b === "auto" ? f.value : b;
    _(i, s, (P = v[C]) != null ? P : C);
  }
  function S(b) {
    r.onChanged ? r.onChanged(b, y) : y(b);
  }
  return watch(h, S, { flush: "post", immediate: !0 }), m && watch(f, () => S(h.value), { flush: "post" }), tryOnMounted(() => S(h.value)), h;
}
function useConfirmDialog(r = ref(!1)) {
  const i = createEventHook(), s = createEventHook(), a = createEventHook();
  let c = noop;
  const d = (u) => (a.trigger(u), r.value = !0, new Promise((m) => {
    c = m;
  })), l = (u) => {
    r.value = !1, i.trigger(u), c({ data: u, isCanceled: !1 });
  }, p = (u) => {
    r.value = !1, s.trigger(u), c({ data: u, isCanceled: !0 });
  };
  return {
    isRevealed: computed(() => r.value),
    reveal: d,
    confirm: l,
    cancel: p,
    onReveal: a.on,
    onConfirm: i.on,
    onCancel: s.on
  };
}
function useCssVar(r, i, { window: s = defaultWindow, initialValue: a = "" } = {}) {
  const c = ref(a), d = computed(() => {
    var l;
    return unrefElement(i) || ((l = s == null ? void 0 : s.document) == null ? void 0 : l.documentElement);
  });
  return watch([d, () => resolveUnref(r)], ([l, p]) => {
    var u;
    if (l && s) {
      const m = (u = s.getComputedStyle(l).getPropertyValue(p)) == null ? void 0 : u.trim();
      c.value = m || a;
    }
  }, { immediate: !0 }), watch(c, (l) => {
    var p;
    (p = d.value) != null && p.style && d.value.style.setProperty(resolveUnref(r), l);
  }), c;
}
function useCurrentElement() {
  const r = getCurrentInstance(), i = computedWithControl(() => null, () => r.proxy.$el);
  return onUpdated(i.trigger), onMounted(i.trigger), i;
}
function useCycleList(r, i) {
  var s;
  const a = shallowRef((s = i == null ? void 0 : i.initialValue) != null ? s : r[0]), c = computed({
    get() {
      var m;
      let v = i != null && i.getIndexOf ? i.getIndexOf(a.value, r) : r.indexOf(a.value);
      return v < 0 && (v = (m = i == null ? void 0 : i.fallbackIndex) != null ? m : 0), v;
    },
    set(m) {
      d(m);
    }
  });
  function d(m) {
    const v = r.length, g = (m % v + v) % v, f = r[g];
    return a.value = f, f;
  }
  function l(m = 1) {
    return d(c.value + m);
  }
  function p(m = 1) {
    return l(m);
  }
  function u(m = 1) {
    return l(-m);
  }
  return {
    state: a,
    index: c,
    next: p,
    prev: u
  };
}
var __defProp$h = Object.defineProperty, __defProps$7 = Object.defineProperties, __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$j = Object.getOwnPropertySymbols, __hasOwnProp$j = Object.prototype.hasOwnProperty, __propIsEnum$j = Object.prototype.propertyIsEnumerable, __defNormalProp$h = (r, i, s) => i in r ? __defProp$h(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$h = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$j.call(i, s) && __defNormalProp$h(r, s, i[s]);
  if (__getOwnPropSymbols$j)
    for (var s of __getOwnPropSymbols$j(i))
      __propIsEnum$j.call(i, s) && __defNormalProp$h(r, s, i[s]);
  return r;
}, __spreadProps$7 = (r, i) => __defProps$7(r, __getOwnPropDescs$7(i));
function useDark(r = {}) {
  const {
    valueDark: i = "dark",
    valueLight: s = "",
    window: a = defaultWindow
  } = r, c = useColorMode(__spreadProps$7(__spreadValues$h({}, r), {
    onChanged: (p, u) => {
      var m;
      r.onChanged ? (m = r.onChanged) == null || m.call(r, p === "dark") : u(p);
    },
    modes: {
      dark: i,
      light: s
    }
  })), d = usePreferredDark({ window: a });
  return computed({
    get() {
      return c.value === "dark";
    },
    set(p) {
      p === d.value ? c.value = "auto" : c.value = p ? "dark" : "light";
    }
  });
}
const fnBypass = (r) => r, fnSetSource = (r, i) => r.value = i;
function defaultDump(r) {
  return r ? isFunction(r) ? r : cloneFnJSON : fnBypass;
}
function defaultParse(r) {
  return r ? isFunction(r) ? r : cloneFnJSON : fnBypass;
}
function useManualRefHistory(r, i = {}) {
  const {
    clone: s = !1,
    dump: a = defaultDump(s),
    parse: c = defaultParse(s),
    setSource: d = fnSetSource
  } = i;
  function l() {
    return markRaw({
      snapshot: a(r.value),
      timestamp: timestamp()
    });
  }
  const p = ref(l()), u = ref([]), m = ref([]), v = (P) => {
    d(r, c(P.snapshot)), p.value = P;
  }, g = () => {
    u.value.unshift(p.value), p.value = l(), i.capacity && u.value.length > i.capacity && u.value.splice(i.capacity, 1 / 0), m.value.length && m.value.splice(0, m.value.length);
  }, f = () => {
    u.value.splice(0, u.value.length), m.value.splice(0, m.value.length);
  }, w = () => {
    const P = u.value.shift();
    P && (m.value.unshift(p.value), v(P));
  }, h = () => {
    const P = m.value.shift();
    P && (u.value.unshift(p.value), v(P));
  }, _ = () => {
    v(p.value);
  }, y = computed(() => [p.value, ...u.value]), S = computed(() => u.value.length > 0), b = computed(() => m.value.length > 0);
  return {
    source: r,
    undoStack: u,
    redoStack: m,
    last: p,
    history: y,
    canUndo: S,
    canRedo: b,
    clear: f,
    commit: g,
    reset: _,
    undo: w,
    redo: h
  };
}
var __defProp$g = Object.defineProperty, __defProps$6 = Object.defineProperties, __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$i = Object.getOwnPropertySymbols, __hasOwnProp$i = Object.prototype.hasOwnProperty, __propIsEnum$i = Object.prototype.propertyIsEnumerable, __defNormalProp$g = (r, i, s) => i in r ? __defProp$g(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$g = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$i.call(i, s) && __defNormalProp$g(r, s, i[s]);
  if (__getOwnPropSymbols$i)
    for (var s of __getOwnPropSymbols$i(i))
      __propIsEnum$i.call(i, s) && __defNormalProp$g(r, s, i[s]);
  return r;
}, __spreadProps$6 = (r, i) => __defProps$6(r, __getOwnPropDescs$6(i));
function useRefHistory(r, i = {}) {
  const {
    deep: s = !1,
    flush: a = "pre",
    eventFilter: c
  } = i, {
    eventFilter: d,
    pause: l,
    resume: p,
    isActive: u
  } = pausableFilter(c), {
    ignoreUpdates: m,
    ignorePrevAsyncUpdates: v,
    stop: g
  } = watchIgnorable(r, y, { deep: s, flush: a, eventFilter: d });
  function f(C, k) {
    v(), m(() => {
      C.value = k;
    });
  }
  const w = useManualRefHistory(r, __spreadProps$6(__spreadValues$g({}, i), { clone: i.clone || s, setSource: f })), { clear: h, commit: _ } = w;
  function y() {
    v(), _();
  }
  function S(C) {
    p(), C && y();
  }
  function b(C) {
    let k = !1;
    const E = () => k = !0;
    m(() => {
      C(E);
    }), k || y();
  }
  function P() {
    g(), h();
  }
  return __spreadProps$6(__spreadValues$g({}, w), {
    isTracking: u,
    pause: l,
    resume: S,
    commit: y,
    batch: b,
    dispose: P
  });
}
var __defProp$f = Object.defineProperty, __defProps$5 = Object.defineProperties, __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$h = Object.getOwnPropertySymbols, __hasOwnProp$h = Object.prototype.hasOwnProperty, __propIsEnum$h = Object.prototype.propertyIsEnumerable, __defNormalProp$f = (r, i, s) => i in r ? __defProp$f(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$f = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$h.call(i, s) && __defNormalProp$f(r, s, i[s]);
  if (__getOwnPropSymbols$h)
    for (var s of __getOwnPropSymbols$h(i))
      __propIsEnum$h.call(i, s) && __defNormalProp$f(r, s, i[s]);
  return r;
}, __spreadProps$5 = (r, i) => __defProps$5(r, __getOwnPropDescs$5(i));
function useDebouncedRefHistory(r, i = {}) {
  const s = i.debounce ? debounceFilter(i.debounce) : void 0, a = useRefHistory(r, __spreadProps$5(__spreadValues$f({}, i), { eventFilter: s }));
  return __spreadValues$f({}, a);
}
function useDeviceMotion(r = {}) {
  const {
    window: i = defaultWindow,
    eventFilter: s = bypassFilter
  } = r, a = ref({ x: null, y: null, z: null }), c = ref({ alpha: null, beta: null, gamma: null }), d = ref(0), l = ref({
    x: null,
    y: null,
    z: null
  });
  if (i) {
    const p = createFilterWrapper(s, (u) => {
      a.value = u.acceleration, l.value = u.accelerationIncludingGravity, c.value = u.rotationRate, d.value = u.interval;
    });
    useEventListener(i, "devicemotion", p);
  }
  return {
    acceleration: a,
    accelerationIncludingGravity: l,
    rotationRate: c,
    interval: d
  };
}
function useDeviceOrientation(r = {}) {
  const { window: i = defaultWindow } = r, s = useSupported(() => i && "DeviceOrientationEvent" in i), a = ref(!1), c = ref(null), d = ref(null), l = ref(null);
  return i && s.value && useEventListener(i, "deviceorientation", (p) => {
    a.value = p.absolute, c.value = p.alpha, d.value = p.beta, l.value = p.gamma;
  }), {
    isSupported: s,
    isAbsolute: a,
    alpha: c,
    beta: d,
    gamma: l
  };
}
function useDevicePixelRatio({
  window: r = defaultWindow
} = {}) {
  if (!r)
    return {
      pixelRatio: ref(1)
    };
  const i = ref(1), s = [], a = () => {
    s.map((d) => d()), s.length = 0;
  }, c = () => {
    i.value = r.devicePixelRatio, a();
    const d = r.matchMedia(`(resolution: ${i.value}dppx)`);
    d.addEventListener("change", c, { once: !0 }), s.push(() => {
      d.removeEventListener("change", c);
    });
  };
  return c(), tryOnScopeDispose(a), { pixelRatio: i };
}
function usePermission(r, i = {}) {
  const {
    controls: s = !1,
    navigator: a = defaultNavigator
  } = i, c = useSupported(() => a && "permissions" in a);
  let d;
  const l = typeof r == "string" ? { name: r } : r, p = ref(), u = () => {
    d && (p.value = d.state);
  }, m = createSingletonPromise(async () => {
    if (c.value) {
      if (!d)
        try {
          d = await a.permissions.query(l), useEventListener(d, "change", u), u();
        } catch {
          p.value = "prompt";
        }
      return d;
    }
  });
  return m(), s ? {
    state: p,
    isSupported: c,
    query: m
  } : p;
}
function useDevicesList(r = {}) {
  const {
    navigator: i = defaultNavigator,
    requestPermissions: s = !1,
    constraints: a = { audio: !0, video: !0 },
    onUpdated: c
  } = r, d = ref([]), l = computed(() => d.value.filter((w) => w.kind === "videoinput")), p = computed(() => d.value.filter((w) => w.kind === "audioinput")), u = computed(() => d.value.filter((w) => w.kind === "audiooutput")), m = useSupported(() => i && i.mediaDevices && i.mediaDevices.enumerateDevices), v = ref(!1);
  async function g() {
    m.value && (d.value = await i.mediaDevices.enumerateDevices(), c == null || c(d.value));
  }
  async function f() {
    if (!m.value)
      return !1;
    if (v.value)
      return !0;
    const { state: w, query: h } = usePermission("camera", { controls: !0 });
    return await h(), w.value !== "granted" && ((await i.mediaDevices.getUserMedia(a)).getTracks().forEach((y) => y.stop()), g()), v.value = !0, v.value;
  }
  return m.value && (s && f(), useEventListener(i.mediaDevices, "devicechange", g), g()), {
    devices: d,
    ensurePermissions: f,
    permissionGranted: v,
    videoInputs: l,
    audioInputs: p,
    audioOutputs: u,
    isSupported: m
  };
}
function useDisplayMedia(r = {}) {
  var i;
  const s = ref((i = r.enabled) != null ? i : !1), a = r.video, c = r.audio, { navigator: d = defaultNavigator } = r, l = useSupported(() => {
    var w;
    return (w = d == null ? void 0 : d.mediaDevices) == null ? void 0 : w.getDisplayMedia;
  }), p = { audio: c, video: a }, u = shallowRef();
  async function m() {
    if (!(!l.value || u.value))
      return u.value = await d.mediaDevices.getDisplayMedia(p), u.value;
  }
  async function v() {
    var w;
    (w = u.value) == null || w.getTracks().forEach((h) => h.stop()), u.value = void 0;
  }
  function g() {
    v(), s.value = !1;
  }
  async function f() {
    return await m(), u.value && (s.value = !0), u.value;
  }
  return watch(s, (w) => {
    w ? m() : v();
  }, { immediate: !0 }), {
    isSupported: l,
    stream: u,
    start: f,
    stop: g,
    enabled: s
  };
}
function useDocumentVisibility({ document: r = defaultDocument } = {}) {
  if (!r)
    return ref("visible");
  const i = ref(r.visibilityState);
  return useEventListener(r, "visibilitychange", () => {
    i.value = r.visibilityState;
  }), i;
}
var __defProp$e = Object.defineProperty, __defProps$4 = Object.defineProperties, __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$g = Object.getOwnPropertySymbols, __hasOwnProp$g = Object.prototype.hasOwnProperty, __propIsEnum$g = Object.prototype.propertyIsEnumerable, __defNormalProp$e = (r, i, s) => i in r ? __defProp$e(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$e = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$g.call(i, s) && __defNormalProp$e(r, s, i[s]);
  if (__getOwnPropSymbols$g)
    for (var s of __getOwnPropSymbols$g(i))
      __propIsEnum$g.call(i, s) && __defNormalProp$e(r, s, i[s]);
  return r;
}, __spreadProps$4 = (r, i) => __defProps$4(r, __getOwnPropDescs$4(i));
function useDraggable(r, i = {}) {
  var s, a, c;
  const d = (s = i.draggingElement) != null ? s : defaultWindow, l = (a = i.handle) != null ? a : r, p = ref((c = resolveUnref(i.initialValue)) != null ? c : { x: 0, y: 0 }), u = ref(), m = (h) => i.pointerTypes ? i.pointerTypes.includes(h.pointerType) : !0, v = (h) => {
    resolveUnref(i.preventDefault) && h.preventDefault(), resolveUnref(i.stopPropagation) && h.stopPropagation();
  }, g = (h) => {
    var _;
    if (!m(h) || resolveUnref(i.exact) && h.target !== resolveUnref(r))
      return;
    const y = resolveUnref(r).getBoundingClientRect(), S = {
      x: h.clientX - y.left,
      y: h.clientY - y.top
    };
    ((_ = i.onStart) == null ? void 0 : _.call(i, S, h)) !== !1 && (u.value = S, v(h));
  }, f = (h) => {
    var _;
    m(h) && u.value && (p.value = {
      x: h.clientX - u.value.x,
      y: h.clientY - u.value.y
    }, (_ = i.onMove) == null || _.call(i, p.value, h), v(h));
  }, w = (h) => {
    var _;
    m(h) && u.value && (u.value = void 0, (_ = i.onEnd) == null || _.call(i, p.value, h), v(h));
  };
  return isClient && (useEventListener(l, "pointerdown", g, !0), useEventListener(d, "pointermove", f, !0), useEventListener(d, "pointerup", w, !0)), __spreadProps$4(__spreadValues$e({}, toRefs(p)), {
    position: p,
    isDragging: computed(() => !!u.value),
    style: computed(() => `left:${p.value.x}px;top:${p.value.y}px;`)
  });
}
function useDropZone(r, i) {
  const s = ref(!1);
  let a = 0;
  return isClient && (useEventListener(r, "dragenter", (c) => {
    c.preventDefault(), a += 1, s.value = !0;
  }), useEventListener(r, "dragover", (c) => {
    c.preventDefault();
  }), useEventListener(r, "dragleave", (c) => {
    c.preventDefault(), a -= 1, a === 0 && (s.value = !1);
  }), useEventListener(r, "drop", (c) => {
    var d, l;
    c.preventDefault(), a = 0, s.value = !1;
    const p = Array.from((l = (d = c.dataTransfer) == null ? void 0 : d.files) != null ? l : []);
    i == null || i(p.length === 0 ? null : p);
  })), {
    isOverDropZone: s
  };
}
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols, __hasOwnProp$f = Object.prototype.hasOwnProperty, __propIsEnum$f = Object.prototype.propertyIsEnumerable, __objRest$2 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$f.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$f)
    for (var a of __getOwnPropSymbols$f(r))
      i.indexOf(a) < 0 && __propIsEnum$f.call(r, a) && (s[a] = r[a]);
  return s;
};
function useResizeObserver(r, i, s = {}) {
  const a = s, { window: c = defaultWindow } = a, d = __objRest$2(a, ["window"]);
  let l;
  const p = useSupported(() => c && "ResizeObserver" in c), u = () => {
    l && (l.disconnect(), l = void 0);
  }, m = watch(() => unrefElement(r), (g) => {
    u(), p.value && c && g && (l = new ResizeObserver(i), l.observe(g, d));
  }, { immediate: !0, flush: "post" }), v = () => {
    u(), m();
  };
  return tryOnScopeDispose(v), {
    isSupported: p,
    stop: v
  };
}
function useElementBounding(r, i = {}) {
  const {
    reset: s = !0,
    windowResize: a = !0,
    windowScroll: c = !0,
    immediate: d = !0
  } = i, l = ref(0), p = ref(0), u = ref(0), m = ref(0), v = ref(0), g = ref(0), f = ref(0), w = ref(0);
  function h() {
    const _ = unrefElement(r);
    if (!_) {
      s && (l.value = 0, p.value = 0, u.value = 0, m.value = 0, v.value = 0, g.value = 0, f.value = 0, w.value = 0);
      return;
    }
    const y = _.getBoundingClientRect();
    l.value = y.height, p.value = y.bottom, u.value = y.left, m.value = y.right, v.value = y.top, g.value = y.width, f.value = y.x, w.value = y.y;
  }
  return useResizeObserver(r, h), watch(() => unrefElement(r), (_) => !_ && h()), c && useEventListener("scroll", h, { capture: !0, passive: !0 }), a && useEventListener("resize", h, { passive: !0 }), tryOnMounted(() => {
    d && h();
  }), {
    height: l,
    bottom: p,
    left: u,
    right: m,
    top: v,
    width: g,
    x: f,
    y: w,
    update: h
  };
}
function useRafFn(r, i = {}) {
  const {
    immediate: s = !0,
    window: a = defaultWindow
  } = i, c = ref(!1);
  let d = 0, l = null;
  function p(v) {
    if (!c.value || !a)
      return;
    const g = v - d;
    r({ delta: g, timestamp: v }), d = v, l = a.requestAnimationFrame(p);
  }
  function u() {
    !c.value && a && (c.value = !0, l = a.requestAnimationFrame(p));
  }
  function m() {
    c.value = !1, l != null && a && (a.cancelAnimationFrame(l), l = null);
  }
  return s && u(), tryOnScopeDispose(m), {
    isActive: readonly(c),
    pause: m,
    resume: u
  };
}
var __defProp$d = Object.defineProperty, __getOwnPropSymbols$e = Object.getOwnPropertySymbols, __hasOwnProp$e = Object.prototype.hasOwnProperty, __propIsEnum$e = Object.prototype.propertyIsEnumerable, __defNormalProp$d = (r, i, s) => i in r ? __defProp$d(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$d = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$e.call(i, s) && __defNormalProp$d(r, s, i[s]);
  if (__getOwnPropSymbols$e)
    for (var s of __getOwnPropSymbols$e(i))
      __propIsEnum$e.call(i, s) && __defNormalProp$d(r, s, i[s]);
  return r;
};
function useElementByPoint(r) {
  const i = ref(null), { x: s, y: a, document: c = defaultDocument } = r, d = useRafFn(() => {
    i.value = (c == null ? void 0 : c.elementFromPoint(resolveUnref(s), resolveUnref(a))) || null;
  });
  return __spreadValues$d({
    element: i
  }, d);
}
function useElementHover(r) {
  const i = ref(!1);
  return useEventListener(r, "mouseenter", () => i.value = !0), useEventListener(r, "mouseleave", () => i.value = !1), i;
}
function useElementSize(r, i = { width: 0, height: 0 }, s = {}) {
  const { window: a = defaultWindow, box: c = "content-box" } = s, d = computed(() => {
    var u, m;
    return (m = (u = unrefElement(r)) == null ? void 0 : u.namespaceURI) == null ? void 0 : m.includes("svg");
  }), l = ref(i.width), p = ref(i.height);
  return useResizeObserver(r, ([u]) => {
    const m = c === "border-box" ? u.borderBoxSize : c === "content-box" ? u.contentBoxSize : u.devicePixelContentBoxSize;
    if (a && d.value) {
      const v = unrefElement(r);
      if (v) {
        const g = a.getComputedStyle(v);
        l.value = parseFloat(g.width), p.value = parseFloat(g.height);
      }
    } else if (m) {
      const v = Array.isArray(m) ? m : [m];
      l.value = v.reduce((g, { inlineSize: f }) => g + f, 0), p.value = v.reduce((g, { blockSize: f }) => g + f, 0);
    } else
      l.value = u.contentRect.width, p.value = u.contentRect.height;
  }, s), watch(() => unrefElement(r), (u) => {
    l.value = u ? i.width : 0, p.value = u ? i.height : 0;
  }), {
    width: l,
    height: p
  };
}
function useElementVisibility(r, { window: i = defaultWindow, scrollTarget: s } = {}) {
  const a = ref(!1), c = () => {
    if (!i)
      return;
    const d = i.document, l = unrefElement(r);
    if (!l)
      a.value = !1;
    else {
      const p = l.getBoundingClientRect();
      a.value = p.top <= (i.innerHeight || d.documentElement.clientHeight) && p.left <= (i.innerWidth || d.documentElement.clientWidth) && p.bottom >= 0 && p.right >= 0;
    }
  };
  return watch(() => unrefElement(r), () => c(), { immediate: !0, flush: "post" }), i && useEventListener(s || i, "scroll", c, {
    capture: !1,
    passive: !0
  }), a;
}
const events = /* @__PURE__ */ new Map();
function useEventBus(r) {
  const i = getCurrentScope();
  function s(p) {
    var u;
    const m = events.get(r) || [];
    m.push(p), events.set(r, m);
    const v = () => c(p);
    return (u = i == null ? void 0 : i.cleanups) == null || u.push(v), v;
  }
  function a(p) {
    function u(...m) {
      c(u), p(...m);
    }
    return s(u);
  }
  function c(p) {
    const u = events.get(r);
    if (!u)
      return;
    const m = u.indexOf(p);
    m > -1 && u.splice(m, 1), u.length || events.delete(r);
  }
  function d() {
    events.delete(r);
  }
  function l(p, u) {
    var m;
    (m = events.get(r)) == null || m.forEach((v) => v(p, u));
  }
  return { on: s, once: a, off: c, emit: l, reset: d };
}
function useEventSource(r, i = [], s = {}) {
  const a = ref(null), c = ref(null), d = ref("CONNECTING"), l = ref(null), p = ref(null), {
    withCredentials: u = !1
  } = s, m = () => {
    l.value && (l.value.close(), l.value = null, d.value = "CLOSED");
  }, v = new EventSource(r, { withCredentials: u });
  l.value = v, v.onopen = () => {
    d.value = "OPEN", p.value = null;
  }, v.onerror = (g) => {
    d.value = "CLOSED", p.value = g;
  }, v.onmessage = (g) => {
    a.value = null, c.value = g.data;
  };
  for (const g of i)
    useEventListener(v, g, (f) => {
      a.value = g, c.value = f.data || null;
    });
  return tryOnScopeDispose(() => {
    m();
  }), {
    eventSource: l,
    event: a,
    data: c,
    status: d,
    error: p,
    close: m
  };
}
function useEyeDropper(r = {}) {
  const { initialValue: i = "" } = r, s = useSupported(() => typeof window < "u" && "EyeDropper" in window), a = ref(i);
  async function c(d) {
    if (!s.value)
      return;
    const p = await new window.EyeDropper().open(d);
    return a.value = p.sRGBHex, p;
  }
  return { isSupported: s, sRGBHex: a, open: c };
}
function useFavicon(r = null, i = {}) {
  const {
    baseUrl: s = "",
    rel: a = "icon",
    document: c = defaultDocument
  } = i, d = resolveRef(r), l = (p) => {
    c == null || c.head.querySelectorAll(`link[rel*="${a}"]`).forEach((u) => u.href = `${s}${p}`);
  };
  return watch(d, (p, u) => {
    isString(p) && p !== u && l(p);
  }, { immediate: !0 }), d;
}
var __defProp$c = Object.defineProperty, __defProps$3 = Object.defineProperties, __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$d = Object.getOwnPropertySymbols, __hasOwnProp$d = Object.prototype.hasOwnProperty, __propIsEnum$d = Object.prototype.propertyIsEnumerable, __defNormalProp$c = (r, i, s) => i in r ? __defProp$c(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$c = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$d.call(i, s) && __defNormalProp$c(r, s, i[s]);
  if (__getOwnPropSymbols$d)
    for (var s of __getOwnPropSymbols$d(i))
      __propIsEnum$d.call(i, s) && __defNormalProp$c(r, s, i[s]);
  return r;
}, __spreadProps$3 = (r, i) => __defProps$3(r, __getOwnPropDescs$3(i));
const payloadMapping = {
  json: "application/json",
  text: "text/plain"
};
function isFetchOptions(r) {
  return containsProp(r, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError", "fetch");
}
function isAbsoluteURL(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
function headersToObject(r) {
  return typeof Headers < "u" && r instanceof Headers ? Object.fromEntries([...r.entries()]) : r;
}
function combineCallbacks(r, ...i) {
  return r === "overwrite" ? async (s) => {
    const a = i[i.length - 1];
    return a !== void 0 && await a(s), s;
  } : async (s) => (await i.reduce((a, c) => a.then(async () => {
    c && (s = __spreadValues$c(__spreadValues$c({}, s), await c(s)));
  }), Promise.resolve()), s);
}
function createFetch(r = {}) {
  const i = r.combination || "chain", s = r.options || {}, a = r.fetchOptions || {};
  function c(d, ...l) {
    const p = computed(() => {
      const v = resolveUnref(r.baseUrl), g = resolveUnref(d);
      return v && !isAbsoluteURL(g) ? joinPaths(v, g) : g;
    });
    let u = s, m = a;
    return l.length > 0 && (isFetchOptions(l[0]) ? u = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, u), l[0]), {
      beforeFetch: combineCallbacks(i, s.beforeFetch, l[0].beforeFetch),
      afterFetch: combineCallbacks(i, s.afterFetch, l[0].afterFetch),
      onFetchError: combineCallbacks(i, s.onFetchError, l[0].onFetchError)
    }) : m = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, m), l[0]), {
      headers: __spreadValues$c(__spreadValues$c({}, headersToObject(m.headers) || {}), headersToObject(l[0].headers) || {})
    })), l.length > 1 && isFetchOptions(l[1]) && (u = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, u), l[1]), {
      beforeFetch: combineCallbacks(i, s.beforeFetch, l[1].beforeFetch),
      afterFetch: combineCallbacks(i, s.afterFetch, l[1].afterFetch),
      onFetchError: combineCallbacks(i, s.onFetchError, l[1].onFetchError)
    })), useFetch(p, m, u);
  }
  return c;
}
function useFetch(r, ...i) {
  var s;
  const a = typeof AbortController == "function";
  let c = {}, d = { immediate: !0, refetch: !1, timeout: 0 };
  const l = {
    method: "GET",
    type: "text",
    payload: void 0
  };
  i.length > 0 && (isFetchOptions(i[0]) ? d = __spreadValues$c(__spreadValues$c({}, d), i[0]) : c = i[0]), i.length > 1 && isFetchOptions(i[1]) && (d = __spreadValues$c(__spreadValues$c({}, d), i[1]));
  const {
    fetch: p = (s = defaultWindow) == null ? void 0 : s.fetch,
    initialData: u,
    timeout: m
  } = d, v = createEventHook(), g = createEventHook(), f = createEventHook(), w = ref(!1), h = ref(!1), _ = ref(!1), y = ref(null), S = shallowRef(null), b = shallowRef(null), P = shallowRef(u), C = computed(() => a && h.value);
  let k, E;
  const $ = () => {
    a && k && k.abort();
  }, T = (D) => {
    h.value = D, w.value = !D;
  };
  m && (E = useTimeoutFn($, m, { immediate: !1 }));
  const x = async (D = !1) => {
    var L;
    T(!0), b.value = null, y.value = null, _.value = !1, k = void 0, a && (k = new AbortController(), k.signal.onabort = () => _.value = !0, c = __spreadProps$3(__spreadValues$c({}, c), {
      signal: k.signal
    }));
    const N = {
      method: l.method,
      headers: {}
    };
    if (l.payload) {
      const B = headersToObject(N.headers);
      l.payloadType && (B["Content-Type"] = (L = payloadMapping[l.payloadType]) != null ? L : l.payloadType);
      const U = resolveUnref(l.payload);
      N.body = l.payloadType === "json" ? JSON.stringify(U) : U;
    }
    let z = !1;
    const G = {
      url: resolveUnref(r),
      options: __spreadValues$c(__spreadValues$c({}, N), c),
      cancel: () => {
        z = !0;
      }
    };
    if (d.beforeFetch && Object.assign(G, await d.beforeFetch(G)), z || !p)
      return T(!1), Promise.resolve(null);
    let F = null;
    return E && E.start(), new Promise((B, U) => {
      var V;
      p(G.url, __spreadProps$3(__spreadValues$c(__spreadValues$c({}, N), G.options), {
        headers: __spreadValues$c(__spreadValues$c({}, headersToObject(N.headers)), headersToObject((V = G.options) == null ? void 0 : V.headers))
      })).then(async (R) => {
        if (S.value = R, y.value = R.status, F = await R[l.type](), d.afterFetch && y.value >= 200 && y.value < 300 && ({ data: F } = await d.afterFetch({ data: F, response: R })), P.value = F, !R.ok)
          throw new Error(R.statusText);
        return v.trigger(R), B(R);
      }).catch(async (R) => {
        let W = R.message || R.name;
        return d.onFetchError && ({ data: F, error: W } = await d.onFetchError({ data: F, error: R, response: S.value })), P.value = F, b.value = W, g.trigger(R), D ? U(R) : B(null);
      }).finally(() => {
        T(!1), E && E.stop(), f.trigger(null);
      });
    });
  }, j = resolveRef(d.refetch);
  watch([
    j,
    resolveRef(r)
  ], ([D]) => D && x(), { deep: !0 });
  const O = {
    isFinished: w,
    statusCode: y,
    response: S,
    error: b,
    data: P,
    isFetching: h,
    canAbort: C,
    aborted: _,
    abort: $,
    execute: x,
    onFetchResponse: v.on,
    onFetchError: g.on,
    onFetchFinally: f.on,
    get: I("GET"),
    put: I("PUT"),
    post: I("POST"),
    delete: I("DELETE"),
    patch: I("PATCH"),
    head: I("HEAD"),
    options: I("OPTIONS"),
    json: A("json"),
    text: A("text"),
    blob: A("blob"),
    arrayBuffer: A("arrayBuffer"),
    formData: A("formData")
  };
  function I(D) {
    return (L, N) => {
      if (!h.value) {
        l.method = D, l.payload = L, l.payloadType = N, isRef(l.payload) && watch([
          j,
          resolveRef(l.payload)
        ], ([G]) => G && x(), { deep: !0 });
        const z = resolveUnref(l.payload);
        return !N && z && Object.getPrototypeOf(z) === Object.prototype && !(z instanceof FormData) && (l.payloadType = "json"), __spreadProps$3(__spreadValues$c({}, O), {
          then(G, F) {
            return M().then(G, F);
          }
        });
      }
    };
  }
  function M() {
    return new Promise((D, L) => {
      until(w).toBe(!0).then(() => D(O)).catch((N) => L(N));
    });
  }
  function A(D) {
    return () => {
      if (!h.value)
        return l.type = D, __spreadProps$3(__spreadValues$c({}, O), {
          then(L, N) {
            return M().then(L, N);
          }
        });
    };
  }
  return d.immediate && setTimeout(x, 0), __spreadProps$3(__spreadValues$c({}, O), {
    then(D, L) {
      return M().then(D, L);
    }
  });
}
function joinPaths(r, i) {
  return !r.endsWith("/") && !i.startsWith("/") ? `${r}/${i}` : `${r}${i}`;
}
var __defProp$b = Object.defineProperty, __getOwnPropSymbols$c = Object.getOwnPropertySymbols, __hasOwnProp$c = Object.prototype.hasOwnProperty, __propIsEnum$c = Object.prototype.propertyIsEnumerable, __defNormalProp$b = (r, i, s) => i in r ? __defProp$b(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$b = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$c.call(i, s) && __defNormalProp$b(r, s, i[s]);
  if (__getOwnPropSymbols$c)
    for (var s of __getOwnPropSymbols$c(i))
      __propIsEnum$c.call(i, s) && __defNormalProp$b(r, s, i[s]);
  return r;
};
const DEFAULT_OPTIONS = {
  multiple: !0,
  accept: "*"
};
function useFileDialog(r = {}) {
  const {
    document: i = defaultDocument
  } = r, s = ref(null);
  let a;
  i && (a = i.createElement("input"), a.type = "file", a.onchange = (l) => {
    const p = l.target;
    s.value = p.files;
  });
  const c = (l) => {
    if (!a)
      return;
    const p = __spreadValues$b(__spreadValues$b(__spreadValues$b({}, DEFAULT_OPTIONS), r), l);
    a.multiple = p.multiple, a.accept = p.accept, hasOwn(p, "capture") && (a.capture = p.capture), a.click();
  }, d = () => {
    s.value = null, a && (a.value = "");
  };
  return {
    files: readonly(s),
    open: c,
    reset: d
  };
}
var __defProp$a = Object.defineProperty, __getOwnPropSymbols$b = Object.getOwnPropertySymbols, __hasOwnProp$b = Object.prototype.hasOwnProperty, __propIsEnum$b = Object.prototype.propertyIsEnumerable, __defNormalProp$a = (r, i, s) => i in r ? __defProp$a(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$a = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$b.call(i, s) && __defNormalProp$a(r, s, i[s]);
  if (__getOwnPropSymbols$b)
    for (var s of __getOwnPropSymbols$b(i))
      __propIsEnum$b.call(i, s) && __defNormalProp$a(r, s, i[s]);
  return r;
};
function useFileSystemAccess(r = {}) {
  const {
    window: i = defaultWindow,
    dataType: s = "Text"
  } = unref(r), a = i, c = useSupported(() => a && "showSaveFilePicker" in a && "showOpenFilePicker" in a), d = ref(), l = ref(), p = ref(), u = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.name) != null ? P : "";
  }), m = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.type) != null ? P : "";
  }), v = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.size) != null ? P : 0;
  }), g = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.lastModified) != null ? P : 0;
  });
  async function f(b = {}) {
    if (!c.value)
      return;
    const [P] = await a.showOpenFilePicker(__spreadValues$a(__spreadValues$a({}, unref(r)), b));
    d.value = P, await y(), await S();
  }
  async function w(b = {}) {
    c.value && (d.value = await a.showSaveFilePicker(__spreadValues$a(__spreadValues$a({}, unref(r)), b)), l.value = void 0, await y(), await S());
  }
  async function h(b = {}) {
    if (c.value) {
      if (!d.value)
        return _(b);
      if (l.value) {
        const P = await d.value.createWritable();
        await P.write(l.value), await P.close();
      }
      await y();
    }
  }
  async function _(b = {}) {
    if (c.value) {
      if (d.value = await a.showSaveFilePicker(__spreadValues$a(__spreadValues$a({}, unref(r)), b)), l.value) {
        const P = await d.value.createWritable();
        await P.write(l.value), await P.close();
      }
      await y();
    }
  }
  async function y() {
    var b;
    p.value = await ((b = d.value) == null ? void 0 : b.getFile());
  }
  async function S() {
    var b, P;
    unref(s) === "Text" && (l.value = await ((b = p.value) == null ? void 0 : b.text())), unref(s) === "ArrayBuffer" && (l.value = await ((P = p.value) == null ? void 0 : P.arrayBuffer())), unref(s) === "Blob" && (l.value = p.value);
  }
  return watch(() => unref(s), S), {
    isSupported: c,
    data: l,
    file: p,
    fileName: u,
    fileMIME: m,
    fileSize: v,
    fileLastModified: g,
    open: f,
    create: w,
    save: h,
    saveAs: _,
    updateData: S
  };
}
function useFocus(r, i = {}) {
  const { initialValue: s = !1 } = i, a = useActiveElement(i), c = computed(() => unrefElement(r)), d = computed({
    get() {
      return isDef(a.value) && isDef(c.value) && a.value === c.value;
    },
    set(l) {
      var p, u;
      !l && d.value && ((p = c.value) == null || p.blur()), l && !d.value && ((u = c.value) == null || u.focus());
    }
  });
  return watch(c, () => {
    d.value = s;
  }, { immediate: !0, flush: "post" }), { focused: d };
}
function useFocusWithin(r, i = {}) {
  const s = useActiveElement(i), a = computed(() => unrefElement(r));
  return { focused: computed(() => a.value && s.value ? a.value.contains(s.value) : !1) };
}
function useFps(r) {
  var i;
  const s = ref(0);
  if (typeof performance > "u")
    return s;
  const a = (i = r == null ? void 0 : r.every) != null ? i : 10;
  let c = performance.now(), d = 0;
  return useRafFn(() => {
    if (d += 1, d >= a) {
      const l = performance.now(), p = l - c;
      s.value = Math.round(1e3 / (p / d)), c = l, d = 0;
    }
  }), s;
}
const functionsMap = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror"
  ],
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror"
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError"
  ]
];
function useFullscreen(r, i = {}) {
  const { document: s = defaultDocument, autoExit: a = !1 } = i, c = r || (s == null ? void 0 : s.querySelector("html")), d = ref(!1);
  let l = functionsMap[0];
  const p = useSupported(() => {
    if (s) {
      for (const _ of functionsMap)
        if (_[1] in s)
          return l = _, !0;
    } else
      return !1;
    return !1;
  }), [u, m, v, , g] = l;
  async function f() {
    p.value && (s != null && s[v] && await s[m](), d.value = !1);
  }
  async function w() {
    if (!p.value)
      return;
    await f();
    const _ = unrefElement(c);
    _ && (await _[u](), d.value = !0);
  }
  async function h() {
    d.value ? await f() : await w();
  }
  return s && useEventListener(s, g, () => {
    d.value = !!(s != null && s[v]);
  }, !1), a && tryOnScopeDispose(f), {
    isSupported: p,
    isFullscreen: d,
    enter: w,
    exit: f,
    toggle: h
  };
}
function mapGamepadToXbox360Controller(r) {
  return computed(() => r.value ? {
    buttons: {
      a: r.value.buttons[0],
      b: r.value.buttons[1],
      x: r.value.buttons[2],
      y: r.value.buttons[3]
    },
    bumper: {
      left: r.value.buttons[4],
      right: r.value.buttons[5]
    },
    triggers: {
      left: r.value.buttons[6],
      right: r.value.buttons[7]
    },
    stick: {
      left: {
        horizontal: r.value.axes[0],
        vertical: r.value.axes[1],
        button: r.value.buttons[10]
      },
      right: {
        horizontal: r.value.axes[2],
        vertical: r.value.axes[3],
        button: r.value.buttons[11]
      }
    },
    dpad: {
      up: r.value.buttons[12],
      down: r.value.buttons[13],
      left: r.value.buttons[14],
      right: r.value.buttons[15]
    },
    back: r.value.buttons[8],
    start: r.value.buttons[9]
  } : null);
}
function useGamepad(r = {}) {
  const {
    navigator: i = defaultNavigator
  } = r, s = useSupported(() => i && "getGamepads" in i), a = ref([]), c = createEventHook(), d = createEventHook(), l = (w) => {
    const h = [], _ = "vibrationActuator" in w ? w.vibrationActuator : null;
    return _ && h.push(_), w.hapticActuators && h.push(...w.hapticActuators), {
      id: w.id,
      hapticActuators: h,
      index: w.index,
      mapping: w.mapping,
      connected: w.connected,
      timestamp: w.timestamp,
      axes: w.axes.map((y) => y),
      buttons: w.buttons.map((y) => ({ pressed: y.pressed, touched: y.touched, value: y.value }))
    };
  }, p = () => {
    const w = (i == null ? void 0 : i.getGamepads()) || [];
    for (let h = 0; h < w.length; ++h) {
      const _ = w[h];
      if (_) {
        const y = a.value.findIndex(({ index: S }) => S === _.index);
        y > -1 && (a.value[y] = l(_));
      }
    }
  }, { isActive: u, pause: m, resume: v } = useRafFn(p), g = (w) => {
    a.value.some(({ index: h }) => h === w.index) || (a.value.push(l(w)), c.trigger(w.index)), v();
  }, f = (w) => {
    a.value = a.value.filter((h) => h.index !== w.index), d.trigger(w.index);
  };
  return useEventListener("gamepadconnected", (w) => g(w.gamepad)), useEventListener("gamepaddisconnected", (w) => f(w.gamepad)), tryOnMounted(() => {
    const w = (i == null ? void 0 : i.getGamepads()) || [];
    if (w)
      for (let h = 0; h < w.length; ++h) {
        const _ = w[h];
        _ && g(_);
      }
  }), m(), {
    isSupported: s,
    onConnected: c.on,
    onDisconnected: d.on,
    gamepads: a,
    pause: m,
    resume: v,
    isActive: u
  };
}
function useGeolocation(r = {}) {
  const {
    enableHighAccuracy: i = !0,
    maximumAge: s = 3e4,
    timeout: a = 27e3,
    navigator: c = defaultNavigator,
    immediate: d = !0
  } = r, l = useSupported(() => c && "geolocation" in c), p = ref(null), u = ref(null), m = ref({
    accuracy: 0,
    latitude: 1 / 0,
    longitude: 1 / 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  });
  function v(h) {
    p.value = h.timestamp, m.value = h.coords, u.value = null;
  }
  let g;
  function f() {
    l.value && (g = c.geolocation.watchPosition(v, (h) => u.value = h, {
      enableHighAccuracy: i,
      maximumAge: s,
      timeout: a
    }));
  }
  d && f();
  function w() {
    g && c && c.geolocation.clearWatch(g);
  }
  return tryOnScopeDispose(() => {
    w();
  }), {
    isSupported: l,
    coords: m,
    locatedAt: p,
    error: u,
    resume: f,
    pause: w
  };
}
const defaultEvents$1 = ["mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel"], oneMinute = 6e4;
function useIdle(r = oneMinute, i = {}) {
  const {
    initialState: s = !1,
    listenForVisibilityChange: a = !0,
    events: c = defaultEvents$1,
    window: d = defaultWindow,
    eventFilter: l = throttleFilter(50)
  } = i, p = ref(s), u = ref(timestamp());
  let m;
  const v = createFilterWrapper(l, () => {
    p.value = !1, u.value = timestamp(), clearTimeout(m), m = setTimeout(() => p.value = !0, r);
  });
  if (d) {
    const g = d.document;
    for (const f of c)
      useEventListener(d, f, v, { passive: !0 });
    a && useEventListener(g, "visibilitychange", () => {
      g.hidden || v();
    });
  }
  return m = setTimeout(() => p.value = !0, r), { idle: p, lastActive: u };
}
var __defProp$9 = Object.defineProperty, __getOwnPropSymbols$a = Object.getOwnPropertySymbols, __hasOwnProp$a = Object.prototype.hasOwnProperty, __propIsEnum$a = Object.prototype.propertyIsEnumerable, __defNormalProp$9 = (r, i, s) => i in r ? __defProp$9(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$9 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$a.call(i, s) && __defNormalProp$9(r, s, i[s]);
  if (__getOwnPropSymbols$a)
    for (var s of __getOwnPropSymbols$a(i))
      __propIsEnum$a.call(i, s) && __defNormalProp$9(r, s, i[s]);
  return r;
};
async function loadImage(r) {
  return new Promise((i, s) => {
    const a = new Image(), { src: c, srcset: d, sizes: l } = r;
    a.src = c, d && (a.srcset = d), l && (a.sizes = l), a.onload = () => i(a), a.onerror = s;
  });
}
const useImage = (r, i = {}) => {
  const s = useAsyncState(() => loadImage(resolveUnref(r)), void 0, __spreadValues$9({
    resetOnExecute: !0
  }, i));
  return watch(() => resolveUnref(r), () => s.execute(i.delay), { deep: !0 }), s;
}, ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(r, i = {}) {
  const {
    throttle: s = 0,
    idle: a = 200,
    onStop: c = noop,
    onScroll: d = noop,
    offset: l = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions: p = {
      capture: !1,
      passive: !0
    },
    behavior: u = "auto"
  } = i, m = ref(0), v = ref(0), g = computed({
    get() {
      return m.value;
    },
    set(P) {
      w(P, void 0);
    }
  }), f = computed({
    get() {
      return v.value;
    },
    set(P) {
      w(void 0, P);
    }
  });
  function w(P, C) {
    var k, E, $;
    const T = resolveUnref(r);
    T && (($ = T instanceof Document ? document.body : T) == null || $.scrollTo({
      top: (k = resolveUnref(C)) != null ? k : f.value,
      left: (E = resolveUnref(P)) != null ? E : g.value,
      behavior: resolveUnref(u)
    }));
  }
  const h = ref(!1), _ = reactive({
    left: !0,
    right: !1,
    top: !0,
    bottom: !1
  }), y = reactive({
    left: !1,
    right: !1,
    top: !1,
    bottom: !1
  }), S = useDebounceFn((P) => {
    h.value = !1, y.left = !1, y.right = !1, y.top = !1, y.bottom = !1, c(P);
  }, s + a), b = (P) => {
    const C = P.target === document ? P.target.documentElement : P.target, k = C.scrollLeft;
    y.left = k < m.value, y.right = k > v.value, _.left = k <= 0 + (l.left || 0), _.right = k + C.clientWidth >= C.scrollWidth - (l.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS, m.value = k;
    let E = C.scrollTop;
    P.target === document && !E && (E = document.body.scrollTop), y.top = E < v.value, y.bottom = E > v.value, _.top = E <= 0 + (l.top || 0), _.bottom = E + C.clientHeight >= C.scrollHeight - (l.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS, v.value = E, h.value = !0, S(P), d(P);
  };
  return useEventListener(r, "scroll", s ? useThrottleFn(b, s, !0, !1) : b, p), {
    x: g,
    y: f,
    isScrolling: h,
    arrivedState: _,
    directions: y
  };
}
var __defProp$8 = Object.defineProperty, __defProps$2 = Object.defineProperties, __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$9 = Object.getOwnPropertySymbols, __hasOwnProp$9 = Object.prototype.hasOwnProperty, __propIsEnum$9 = Object.prototype.propertyIsEnumerable, __defNormalProp$8 = (r, i, s) => i in r ? __defProp$8(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$8 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$9.call(i, s) && __defNormalProp$8(r, s, i[s]);
  if (__getOwnPropSymbols$9)
    for (var s of __getOwnPropSymbols$9(i))
      __propIsEnum$9.call(i, s) && __defNormalProp$8(r, s, i[s]);
  return r;
}, __spreadProps$2 = (r, i) => __defProps$2(r, __getOwnPropDescs$2(i));
function useInfiniteScroll(r, i, s = {}) {
  var a, c;
  const d = (a = s.direction) != null ? a : "bottom", l = reactive(useScroll(r, __spreadProps$2(__spreadValues$8({}, s), {
    offset: __spreadValues$8({
      [d]: (c = s.distance) != null ? c : 0
    }, s.offset)
  })));
  watch(() => l.arrivedState[d], async (p) => {
    var u, m;
    if (p) {
      const v = resolveUnref(r), g = {
        height: (u = v == null ? void 0 : v.scrollHeight) != null ? u : 0,
        width: (m = v == null ? void 0 : v.scrollWidth) != null ? m : 0
      };
      await i(l), s.preserveScrollPosition && v && nextTick(() => {
        v.scrollTo({
          top: v.scrollHeight - g.height,
          left: v.scrollWidth - g.width
        });
      });
    }
  });
}
function useIntersectionObserver(r, i, s = {}) {
  const {
    root: a,
    rootMargin: c = "0px",
    threshold: d = 0.1,
    window: l = defaultWindow
  } = s, p = useSupported(() => l && "IntersectionObserver" in l);
  let u = noop;
  const m = p.value ? watch(() => ({
    el: unrefElement(r),
    root: unrefElement(a)
  }), ({ el: g, root: f }) => {
    if (u(), !g)
      return;
    const w = new IntersectionObserver(i, {
      root: f,
      rootMargin: c,
      threshold: d
    });
    w.observe(g), u = () => {
      w.disconnect(), u = noop;
    };
  }, { immediate: !0, flush: "post" }) : noop, v = () => {
    u(), m();
  };
  return tryOnScopeDispose(v), {
    isSupported: p,
    stop: v
  };
}
const defaultEvents = ["mousedown", "mouseup", "keydown", "keyup"];
function useKeyModifier(r, i = {}) {
  const {
    events: s = defaultEvents,
    document: a = defaultDocument,
    initial: c = null
  } = i, d = ref(c);
  return a && s.forEach((l) => {
    useEventListener(a, l, (p) => {
      typeof p.getModifierState == "function" && (d.value = p.getModifierState(r));
    });
  }), d;
}
function useLocalStorage(r, i, s = {}) {
  const { window: a = defaultWindow } = s;
  return useStorage(r, i, a == null ? void 0 : a.localStorage, s);
}
const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function useMagicKeys(r = {}) {
  const {
    reactive: i = !1,
    target: s = defaultWindow,
    aliasMap: a = DefaultMagicKeysAliasMap,
    passive: c = !0,
    onEventFired: d = noop
  } = r, l = reactive(/* @__PURE__ */ new Set()), p = {
    toJSON() {
      return {};
    },
    current: l
  }, u = i ? reactive(p) : p, m = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Set();
  function g(_, y) {
    _ in u && (i ? u[_] = y : u[_].value = y);
  }
  function f() {
    l.clear();
    for (const _ of v)
      g(_, !1);
  }
  function w(_, y) {
    var S, b;
    const P = (S = _.key) == null ? void 0 : S.toLowerCase(), k = [(b = _.code) == null ? void 0 : b.toLowerCase(), P].filter(Boolean);
    P && (y ? l.add(P) : l.delete(P));
    for (const E of k)
      v.add(E), g(E, y);
    P === "meta" && !y ? (m.forEach((E) => {
      l.delete(E), g(E, !1);
    }), m.clear()) : typeof _.getModifierState == "function" && _.getModifierState("Meta") && y && [...l, ...k].forEach((E) => m.add(E));
  }
  useEventListener(s, "keydown", (_) => (w(_, !0), d(_)), { passive: c }), useEventListener(s, "keyup", (_) => (w(_, !1), d(_)), { passive: c }), useEventListener("blur", f, { passive: !0 }), useEventListener("focus", f, { passive: !0 });
  const h = new Proxy(u, {
    get(_, y, S) {
      if (typeof y != "string")
        return Reflect.get(_, y, S);
      if (y = y.toLowerCase(), y in a && (y = a[y]), !(y in u))
        if (/[+_-]/.test(y)) {
          const P = y.split(/[+_-]/g).map((C) => C.trim());
          u[y] = computed(() => P.every((C) => unref(h[C])));
        } else
          u[y] = ref(!1);
      const b = Reflect.get(_, y, S);
      return i ? unref(b) : b;
    }
  });
  return h;
}
var __defProp$7 = Object.defineProperty, __getOwnPropSymbols$8 = Object.getOwnPropertySymbols, __hasOwnProp$8 = Object.prototype.hasOwnProperty, __propIsEnum$8 = Object.prototype.propertyIsEnumerable, __defNormalProp$7 = (r, i, s) => i in r ? __defProp$7(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$7 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$8.call(i, s) && __defNormalProp$7(r, s, i[s]);
  if (__getOwnPropSymbols$8)
    for (var s of __getOwnPropSymbols$8(i))
      __propIsEnum$8.call(i, s) && __defNormalProp$7(r, s, i[s]);
  return r;
};
function usingElRef(r, i) {
  resolveUnref(r) && i(resolveUnref(r));
}
function timeRangeToArray(r) {
  let i = [];
  for (let s = 0; s < r.length; ++s)
    i = [...i, [r.start(s), r.end(s)]];
  return i;
}
function tracksToArray(r) {
  return Array.from(r).map(({ label: i, kind: s, language: a, mode: c, activeCues: d, cues: l, inBandMetadataTrackDispatchType: p }, u) => ({ id: u, label: i, kind: s, language: a, mode: c, activeCues: d, cues: l, inBandMetadataTrackDispatchType: p }));
}
const defaultOptions = {
  src: "",
  tracks: []
};
function useMediaControls(r, i = {}) {
  i = __spreadValues$7(__spreadValues$7({}, defaultOptions), i);
  const {
    document: s = defaultDocument
  } = i, a = ref(0), c = ref(0), d = ref(!1), l = ref(1), p = ref(!1), u = ref(!1), m = ref(!1), v = ref(1), g = ref(!1), f = ref([]), w = ref([]), h = ref(-1), _ = ref(!1), y = ref(!1), S = s && "pictureInPictureEnabled" in s, b = createEventHook(), P = (j) => {
    usingElRef(r, (O) => {
      if (j) {
        const I = isNumber(j) ? j : j.id;
        O.textTracks[I].mode = "disabled";
      } else
        for (let I = 0; I < O.textTracks.length; ++I)
          O.textTracks[I].mode = "disabled";
      h.value = -1;
    });
  }, C = (j, O = !0) => {
    usingElRef(r, (I) => {
      const M = isNumber(j) ? j : j.id;
      O && P(), I.textTracks[M].mode = "showing", h.value = M;
    });
  }, k = () => new Promise((j, O) => {
    usingElRef(r, async (I) => {
      S && (_.value ? s.exitPictureInPicture().then(j).catch(O) : I.requestPictureInPicture().then(j).catch(O));
    });
  });
  watchEffect(() => {
    if (!s)
      return;
    const j = resolveUnref(r);
    if (!j)
      return;
    const O = resolveUnref(i.src);
    let I = [];
    O && (isString(O) ? I = [{ src: O }] : Array.isArray(O) ? I = O : isObject(O) && (I = [O]), j.querySelectorAll("source").forEach((M) => {
      M.removeEventListener("error", b.trigger), M.remove();
    }), I.forEach(({ src: M, type: A }) => {
      const D = s.createElement("source");
      D.setAttribute("src", M), D.setAttribute("type", A || ""), D.addEventListener("error", b.trigger), j.appendChild(D);
    }), j.load());
  }), tryOnScopeDispose(() => {
    const j = resolveUnref(r);
    j && j.querySelectorAll("source").forEach((O) => O.removeEventListener("error", b.trigger));
  }), watch(l, (j) => {
    const O = resolveUnref(r);
    O && (O.volume = j);
  }), watch(y, (j) => {
    const O = resolveUnref(r);
    O && (O.muted = j);
  }), watch(v, (j) => {
    const O = resolveUnref(r);
    O && (O.playbackRate = j);
  }), watchEffect(() => {
    if (!s)
      return;
    const j = resolveUnref(i.tracks), O = resolveUnref(r);
    !j || !j.length || !O || (O.querySelectorAll("track").forEach((I) => I.remove()), j.forEach(({ default: I, kind: M, label: A, src: D, srcLang: L }, N) => {
      const z = s.createElement("track");
      z.default = I || !1, z.kind = M, z.label = A, z.src = D, z.srclang = L, z.default && (h.value = N), O.appendChild(z);
    }));
  });
  const { ignoreUpdates: E } = watchIgnorable(a, (j) => {
    const O = resolveUnref(r);
    O && (O.currentTime = j);
  }), { ignoreUpdates: $ } = watchIgnorable(m, (j) => {
    const O = resolveUnref(r);
    O && (j ? O.play() : O.pause());
  });
  useEventListener(r, "timeupdate", () => E(() => a.value = resolveUnref(r).currentTime)), useEventListener(r, "durationchange", () => c.value = resolveUnref(r).duration), useEventListener(r, "progress", () => f.value = timeRangeToArray(resolveUnref(r).buffered)), useEventListener(r, "seeking", () => d.value = !0), useEventListener(r, "seeked", () => d.value = !1), useEventListener(r, "waiting", () => p.value = !0), useEventListener(r, "playing", () => {
    p.value = !1, u.value = !1;
  }), useEventListener(r, "ratechange", () => v.value = resolveUnref(r).playbackRate), useEventListener(r, "stalled", () => g.value = !0), useEventListener(r, "ended", () => u.value = !0), useEventListener(r, "pause", () => $(() => m.value = !1)), useEventListener(r, "play", () => $(() => m.value = !0)), useEventListener(r, "enterpictureinpicture", () => _.value = !0), useEventListener(r, "leavepictureinpicture", () => _.value = !1), useEventListener(r, "volumechange", () => {
    const j = resolveUnref(r);
    j && (l.value = j.volume, y.value = j.muted);
  });
  const T = [], x = watch([r], () => {
    const j = resolveUnref(r);
    j && (x(), T[0] = useEventListener(j.textTracks, "addtrack", () => w.value = tracksToArray(j.textTracks)), T[1] = useEventListener(j.textTracks, "removetrack", () => w.value = tracksToArray(j.textTracks)), T[2] = useEventListener(j.textTracks, "change", () => w.value = tracksToArray(j.textTracks)));
  });
  return tryOnScopeDispose(() => T.forEach((j) => j())), {
    currentTime: a,
    duration: c,
    waiting: p,
    seeking: d,
    ended: u,
    stalled: g,
    buffered: f,
    playing: m,
    rate: v,
    volume: l,
    muted: y,
    tracks: w,
    selectedTrack: h,
    enableTrack: C,
    disableTrack: P,
    supportsPictureInPicture: S,
    togglePictureInPicture: k,
    isPictureInPicture: _,
    onSourceError: b.on
  };
}
const getMapVue2Compat = () => {
  const r = reactive({});
  return {
    get: (i) => r[i],
    set: (i, s) => set(r, i, s),
    has: (i) => hasOwn(r, i),
    delete: (i) => del(r, i),
    clear: () => {
      Object.keys(r).forEach((i) => {
        del(r, i);
      });
    }
  };
};
function useMemoize(r, i) {
  const a = (() => i != null && i.cache ? reactive(i.cache) : isVue2 ? getMapVue2Compat() : reactive(/* @__PURE__ */ new Map()))(), c = (...v) => i != null && i.getKey ? i.getKey(...v) : JSON.stringify(v), d = (v, ...g) => (a.set(v, r(...g)), a.get(v)), l = (...v) => d(c(...v), ...v), p = (...v) => {
    a.delete(c(...v));
  }, u = () => {
    a.clear();
  }, m = (...v) => {
    const g = c(...v);
    return a.has(g) ? a.get(g) : d(g, ...v);
  };
  return m.load = l, m.delete = p, m.clear = u, m.generateKey = c, m.cache = a, m;
}
function useMemory(r = {}) {
  const i = ref(), s = useSupported(() => typeof performance < "u" && "memory" in performance);
  if (s.value) {
    const { interval: a = 1e3 } = r;
    useIntervalFn(() => {
      i.value = performance.memory;
    }, a, { immediate: r.immediate, immediateCallback: r.immediateCallback });
  }
  return { isSupported: s, memory: i };
}
function useMounted() {
  const r = ref(!1);
  return onMounted(() => {
    r.value = !0;
  }), r;
}
function useMouse(r = {}) {
  const {
    type: i = "page",
    touch: s = !0,
    resetOnTouchEnds: a = !1,
    initialValue: c = { x: 0, y: 0 },
    window: d = defaultWindow,
    eventFilter: l
  } = r, p = ref(c.x), u = ref(c.y), m = ref(null), v = (_) => {
    i === "page" ? (p.value = _.pageX, u.value = _.pageY) : i === "client" ? (p.value = _.clientX, u.value = _.clientY) : i === "movement" && (p.value = _.movementX, u.value = _.movementY), m.value = "mouse";
  }, g = () => {
    p.value = c.x, u.value = c.y;
  }, f = (_) => {
    if (_.touches.length > 0) {
      const y = _.touches[0];
      i === "page" ? (p.value = y.pageX, u.value = y.pageY) : i === "client" && (p.value = y.clientX, u.value = y.clientY), m.value = "touch";
    }
  }, w = (_) => l === void 0 ? v(_) : l(() => v(_), {}), h = (_) => l === void 0 ? f(_) : l(() => f(_), {});
  return d && (useEventListener(d, "mousemove", w, { passive: !0 }), useEventListener(d, "dragover", w, { passive: !0 }), s && i !== "movement" && (useEventListener(d, "touchstart", h, { passive: !0 }), useEventListener(d, "touchmove", h, { passive: !0 }), a && useEventListener(d, "touchend", g, { passive: !0 }))), {
    x: p,
    y: u,
    sourceType: m
  };
}
function useMouseInElement(r, i = {}) {
  const {
    handleOutside: s = !0,
    window: a = defaultWindow
  } = i, { x: c, y: d, sourceType: l } = useMouse(i), p = ref(r ?? (a == null ? void 0 : a.document.body)), u = ref(0), m = ref(0), v = ref(0), g = ref(0), f = ref(0), w = ref(0), h = ref(!0);
  let _ = () => {
  };
  return a && (_ = watch([p, c, d], () => {
    const y = unrefElement(p);
    if (!y)
      return;
    const {
      left: S,
      top: b,
      width: P,
      height: C
    } = y.getBoundingClientRect();
    v.value = S + a.pageXOffset, g.value = b + a.pageYOffset, f.value = C, w.value = P;
    const k = c.value - v.value, E = d.value - g.value;
    h.value = P === 0 || C === 0 || k < 0 || E < 0 || k > P || E > C, (s || !h.value) && (u.value = k, m.value = E);
  }, { immediate: !0 }), useEventListener(document, "mouseleave", () => {
    h.value = !0;
  })), {
    x: c,
    y: d,
    sourceType: l,
    elementX: u,
    elementY: m,
    elementPositionX: v,
    elementPositionY: g,
    elementHeight: f,
    elementWidth: w,
    isOutside: h,
    stop: _
  };
}
function useMousePressed(r = {}) {
  const {
    touch: i = !0,
    drag: s = !0,
    initialValue: a = !1,
    window: c = defaultWindow
  } = r, d = ref(a), l = ref(null);
  if (!c)
    return {
      pressed: d,
      sourceType: l
    };
  const p = (v) => () => {
    d.value = !0, l.value = v;
  }, u = () => {
    d.value = !1, l.value = null;
  }, m = computed(() => unrefElement(r.target) || c);
  return useEventListener(m, "mousedown", p("mouse"), { passive: !0 }), useEventListener(c, "mouseleave", u, { passive: !0 }), useEventListener(c, "mouseup", u, { passive: !0 }), s && (useEventListener(m, "dragstart", p("mouse"), { passive: !0 }), useEventListener(c, "drop", u, { passive: !0 }), useEventListener(c, "dragend", u, { passive: !0 })), i && (useEventListener(m, "touchstart", p("touch"), { passive: !0 }), useEventListener(c, "touchend", u, { passive: !0 }), useEventListener(c, "touchcancel", u, { passive: !0 })), {
    pressed: d,
    sourceType: l
  };
}
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols, __hasOwnProp$7 = Object.prototype.hasOwnProperty, __propIsEnum$7 = Object.prototype.propertyIsEnumerable, __objRest$1 = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$7.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$7)
    for (var a of __getOwnPropSymbols$7(r))
      i.indexOf(a) < 0 && __propIsEnum$7.call(r, a) && (s[a] = r[a]);
  return s;
};
function useMutationObserver(r, i, s = {}) {
  const a = s, { window: c = defaultWindow } = a, d = __objRest$1(a, ["window"]);
  let l;
  const p = useSupported(() => c && "MutationObserver" in c), u = () => {
    l && (l.disconnect(), l = void 0);
  }, m = watch(() => unrefElement(r), (g) => {
    u(), p.value && c && g && (l = new MutationObserver(i), l.observe(g, d));
  }, { immediate: !0 }), v = () => {
    u(), m();
  };
  return tryOnScopeDispose(v), {
    isSupported: p,
    stop: v
  };
}
const useNavigatorLanguage = (r = {}) => {
  const { window: i = defaultWindow } = r, s = i == null ? void 0 : i.navigator, a = useSupported(() => s && "language" in s), c = ref(s == null ? void 0 : s.language);
  return useEventListener(i, "languagechange", () => {
    s && (c.value = s.language);
  }), {
    isSupported: a,
    language: c
  };
};
function useNetwork(r = {}) {
  const { window: i = defaultWindow } = r, s = i == null ? void 0 : i.navigator, a = useSupported(() => s && "connection" in s), c = ref(!0), d = ref(!1), l = ref(void 0), p = ref(void 0), u = ref(void 0), m = ref(void 0), v = ref(void 0), g = ref(void 0), f = ref("unknown"), w = a.value && s.connection;
  function h() {
    s && (c.value = s.onLine, l.value = c.value ? void 0 : Date.now(), p.value = c.value ? Date.now() : void 0, w && (u.value = w.downlink, m.value = w.downlinkMax, g.value = w.effectiveType, v.value = w.rtt, d.value = w.saveData, f.value = w.type));
  }
  return i && (useEventListener(i, "offline", () => {
    c.value = !1, l.value = Date.now();
  }), useEventListener(i, "online", () => {
    c.value = !0, p.value = Date.now();
  })), w && useEventListener(w, "change", h, !1), h(), {
    isSupported: a,
    isOnline: c,
    saveData: d,
    offlineAt: l,
    onlineAt: p,
    downlink: u,
    downlinkMax: m,
    effectiveType: g,
    rtt: v,
    type: f
  };
}
var __defProp$6 = Object.defineProperty, __getOwnPropSymbols$6 = Object.getOwnPropertySymbols, __hasOwnProp$6 = Object.prototype.hasOwnProperty, __propIsEnum$6 = Object.prototype.propertyIsEnumerable, __defNormalProp$6 = (r, i, s) => i in r ? __defProp$6(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$6 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$6.call(i, s) && __defNormalProp$6(r, s, i[s]);
  if (__getOwnPropSymbols$6)
    for (var s of __getOwnPropSymbols$6(i))
      __propIsEnum$6.call(i, s) && __defNormalProp$6(r, s, i[s]);
  return r;
};
function useNow(r = {}) {
  const {
    controls: i = !1,
    interval: s = "requestAnimationFrame"
  } = r, a = ref(new Date()), c = () => a.value = new Date(), d = s === "requestAnimationFrame" ? useRafFn(c, { immediate: !0 }) : useIntervalFn(c, s, { immediate: !0 });
  return i ? __spreadValues$6({
    now: a
  }, d) : a;
}
function useObjectUrl(r) {
  const i = ref(), s = () => {
    i.value && URL.revokeObjectURL(i.value), i.value = void 0;
  };
  return watch(() => unref(r), (a) => {
    s(), a && (i.value = URL.createObjectURL(a));
  }, { immediate: !0 }), tryOnScopeDispose(s), readonly(i);
}
function useClamp(r, i, s) {
  const a = ref(r);
  return computed({
    get() {
      return a.value = clamp(a.value, resolveUnref(i), resolveUnref(s));
    },
    set(c) {
      a.value = clamp(c, resolveUnref(i), resolveUnref(s));
    }
  });
}
function useOffsetPagination(r) {
  const {
    total: i = 1 / 0,
    pageSize: s = 10,
    page: a = 1,
    onPageChange: c = noop,
    onPageSizeChange: d = noop,
    onPageCountChange: l = noop
  } = r, p = useClamp(s, 1, 1 / 0), u = computed(() => Math.max(1, Math.ceil(unref(i) / unref(p)))), m = useClamp(a, 1, u), v = computed(() => m.value === 1), g = computed(() => m.value === u.value);
  isRef(a) && syncRef(a, m), isRef(s) && syncRef(s, p);
  function f() {
    m.value--;
  }
  function w() {
    m.value++;
  }
  const h = {
    currentPage: m,
    currentPageSize: p,
    pageCount: u,
    isFirstPage: v,
    isLastPage: g,
    prev: f,
    next: w
  };
  return watch(m, () => {
    c(reactive(h));
  }), watch(p, () => {
    d(reactive(h));
  }), watch(u, () => {
    l(reactive(h));
  }), h;
}
function useOnline(r = {}) {
  const { isOnline: i } = useNetwork(r);
  return i;
}
function usePageLeave(r = {}) {
  const { window: i = defaultWindow } = r, s = ref(!1), a = (c) => {
    if (!i)
      return;
    c = c || i.event;
    const d = c.relatedTarget || c.toElement;
    s.value = !d;
  };
  return i && (useEventListener(i, "mouseout", a, { passive: !0 }), useEventListener(i.document, "mouseleave", a, { passive: !0 }), useEventListener(i.document, "mouseenter", a, { passive: !0 })), s;
}
function useParallax(r, i = {}) {
  const {
    deviceOrientationTiltAdjust: s = (_) => _,
    deviceOrientationRollAdjust: a = (_) => _,
    mouseTiltAdjust: c = (_) => _,
    mouseRollAdjust: d = (_) => _,
    window: l = defaultWindow
  } = i, p = reactive(useDeviceOrientation({ window: l })), {
    elementX: u,
    elementY: m,
    elementWidth: v,
    elementHeight: g
  } = useMouseInElement(r, { handleOutside: !1, window: l }), f = computed(() => p.isSupported && (p.alpha != null && p.alpha !== 0 || p.gamma != null && p.gamma !== 0) ? "deviceOrientation" : "mouse"), w = computed(() => {
    if (f.value === "deviceOrientation") {
      const _ = -p.beta / 90;
      return a(_);
    } else {
      const _ = -(m.value - g.value / 2) / g.value;
      return d(_);
    }
  }), h = computed(() => {
    if (f.value === "deviceOrientation") {
      const _ = p.gamma / 90;
      return s(_);
    } else {
      const _ = (u.value - v.value / 2) / v.value;
      return c(_);
    }
  });
  return { roll: w, tilt: h, source: f };
}
var __defProp$5 = Object.defineProperty, __defProps$1 = Object.defineProperties, __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$5 = Object.getOwnPropertySymbols, __hasOwnProp$5 = Object.prototype.hasOwnProperty, __propIsEnum$5 = Object.prototype.propertyIsEnumerable, __defNormalProp$5 = (r, i, s) => i in r ? __defProp$5(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$5 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$5.call(i, s) && __defNormalProp$5(r, s, i[s]);
  if (__getOwnPropSymbols$5)
    for (var s of __getOwnPropSymbols$5(i))
      __propIsEnum$5.call(i, s) && __defNormalProp$5(r, s, i[s]);
  return r;
}, __spreadProps$1 = (r, i) => __defProps$1(r, __getOwnPropDescs$1(i));
const defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
}, keys = /* @__PURE__ */ Object.keys(defaultState);
function usePointer(r = {}) {
  const {
    target: i = defaultWindow
  } = r, s = ref(!1), a = ref(r.initialValue || {});
  Object.assign(a.value, defaultState, a.value);
  const c = (d) => {
    s.value = !0, !(r.pointerTypes && !r.pointerTypes.includes(d.pointerType)) && (a.value = objectPick(d, keys, !1));
  };
  return i && (useEventListener(i, "pointerdown", c, { passive: !0 }), useEventListener(i, "pointermove", c, { passive: !0 }), useEventListener(i, "pointerleave", () => s.value = !1, { passive: !0 })), __spreadProps$1(__spreadValues$5({}, toRefs(a)), {
    isInside: s
  });
}
function usePointerLock(r, i = {}) {
  const { document: s = defaultDocument, pointerLockOptions: a } = i, c = useSupported(() => s && "pointerLockElement" in s), d = ref(), l = ref();
  let p;
  c.value && (useEventListener(s, "pointerlockchange", () => {
    var v;
    const g = (v = s.pointerLockElement) != null ? v : d.value;
    p && g === p && (d.value = s.pointerLockElement, d.value || (p = l.value = null));
  }), useEventListener(s, "pointerlockerror", () => {
    var v;
    const g = (v = s.pointerLockElement) != null ? v : d.value;
    if (p && g === p) {
      const f = s.pointerLockElement ? "release" : "acquire";
      throw new Error(`Failed to ${f} pointer lock.`);
    }
  }));
  async function u(v, g) {
    var f;
    if (!c.value)
      throw new Error("Pointer Lock API is not supported by your browser.");
    if (l.value = v instanceof Event ? v.currentTarget : null, p = v instanceof Event ? (f = unrefElement(r)) != null ? f : l.value : unrefElement(v), !p)
      throw new Error("Target element undefined.");
    return p.requestPointerLock(g ?? a), await until(d).toBe(p);
  }
  async function m() {
    return d.value ? (s.exitPointerLock(), await until(d).toBeNull(), !0) : !1;
  }
  return {
    isSupported: c,
    element: d,
    triggerElement: l,
    lock: u,
    unlock: m
  };
}
var SwipeDirection;
(function(r) {
  r.UP = "UP", r.RIGHT = "RIGHT", r.DOWN = "DOWN", r.LEFT = "LEFT", r.NONE = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function useSwipe(r, i = {}) {
  const {
    threshold: s = 50,
    onSwipe: a,
    onSwipeEnd: c,
    onSwipeStart: d,
    passive: l = !0,
    window: p = defaultWindow
  } = i, u = reactive({ x: 0, y: 0 }), m = reactive({ x: 0, y: 0 }), v = computed(() => u.x - m.x), g = computed(() => u.y - m.y), { max: f, abs: w } = Math, h = computed(() => f(w(v.value), w(g.value)) >= s), _ = ref(!1), y = computed(() => h.value ? w(v.value) > w(g.value) ? v.value > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT : g.value > 0 ? SwipeDirection.UP : SwipeDirection.DOWN : SwipeDirection.NONE), S = (x) => [x.touches[0].clientX, x.touches[0].clientY], b = (x, j) => {
    u.x = x, u.y = j;
  }, P = (x, j) => {
    m.x = x, m.y = j;
  };
  let C;
  const k = checkPassiveEventSupport(p == null ? void 0 : p.document);
  l ? C = k ? { passive: !0 } : { capture: !1 } : C = k ? { passive: !1, capture: !0 } : { capture: !0 };
  const E = (x) => {
    _.value && (c == null || c(x, y.value)), _.value = !1;
  }, $ = [
    useEventListener(r, "touchstart", (x) => {
      C.capture && !C.passive && x.preventDefault();
      const [j, O] = S(x);
      b(j, O), P(j, O), d == null || d(x);
    }, C),
    useEventListener(r, "touchmove", (x) => {
      const [j, O] = S(x);
      P(j, O), !_.value && h.value && (_.value = !0), _.value && (a == null || a(x));
    }, C),
    useEventListener(r, "touchend", E, C),
    useEventListener(r, "touchcancel", E, C)
  ];
  return {
    isPassiveEventSupported: k,
    isSwiping: _,
    direction: y,
    coordsStart: u,
    coordsEnd: m,
    lengthX: v,
    lengthY: g,
    stop: () => $.forEach((x) => x())
  };
}
function checkPassiveEventSupport(r) {
  if (!r)
    return !1;
  let i = !1;
  const s = {
    get passive() {
      return i = !0, !1;
    }
  };
  return r.addEventListener("x", noop, s), r.removeEventListener("x", noop), i;
}
function usePointerSwipe(r, i = {}) {
  const s = resolveRef(r), {
    threshold: a = 50,
    onSwipe: c,
    onSwipeEnd: d,
    onSwipeStart: l
  } = i, p = reactive({ x: 0, y: 0 }), u = (E, $) => {
    p.x = E, p.y = $;
  }, m = reactive({ x: 0, y: 0 }), v = (E, $) => {
    m.x = E, m.y = $;
  }, g = computed(() => p.x - m.x), f = computed(() => p.y - m.y), { max: w, abs: h } = Math, _ = computed(() => w(h(g.value), h(f.value)) >= a), y = ref(!1), S = ref(!1), b = computed(() => _.value ? h(g.value) > h(f.value) ? g.value > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT : f.value > 0 ? SwipeDirection.UP : SwipeDirection.DOWN : SwipeDirection.NONE), P = (E) => {
    var $, T, x;
    const j = E.buttons === 0, O = E.buttons === 1;
    return (x = (T = ($ = i.pointerTypes) == null ? void 0 : $.includes(E.pointerType)) != null ? T : j || O) != null ? x : !0;
  }, C = [
    useEventListener(r, "pointerdown", (E) => {
      var $, T;
      if (!P(E))
        return;
      S.value = !0, (T = ($ = s.value) == null ? void 0 : $.style) == null || T.setProperty("touch-action", "none");
      const x = E.target;
      x == null || x.setPointerCapture(E.pointerId);
      const { clientX: j, clientY: O } = E;
      u(j, O), v(j, O), l == null || l(E);
    }),
    useEventListener(r, "pointermove", (E) => {
      if (!P(E) || !S.value)
        return;
      const { clientX: $, clientY: T } = E;
      v($, T), !y.value && _.value && (y.value = !0), y.value && (c == null || c(E));
    }),
    useEventListener(r, "pointerup", (E) => {
      var $, T;
      P(E) && (y.value && (d == null || d(E, b.value)), S.value = !1, y.value = !1, (T = ($ = s.value) == null ? void 0 : $.style) == null || T.setProperty("touch-action", "initial"));
    })
  ], k = () => C.forEach((E) => E());
  return {
    isSwiping: readonly(y),
    direction: readonly(b),
    posStart: readonly(p),
    posEnd: readonly(m),
    distanceX: g,
    distanceY: f,
    stop: k
  };
}
function usePreferredColorScheme(r) {
  const i = useMediaQuery("(prefers-color-scheme: light)", r), s = useMediaQuery("(prefers-color-scheme: dark)", r);
  return computed(() => s.value ? "dark" : i.value ? "light" : "no-preference");
}
function usePreferredContrast(r) {
  const i = useMediaQuery("(prefers-contrast: more)", r), s = useMediaQuery("(prefers-contrast: less)", r), a = useMediaQuery("(prefers-contrast: custom)", r);
  return computed(() => i.value ? "more" : s.value ? "less" : a.value ? "custom" : "no-preference");
}
function usePreferredLanguages(r = {}) {
  const { window: i = defaultWindow } = r;
  if (!i)
    return ref(["en"]);
  const s = i.navigator, a = ref(s.languages);
  return useEventListener(i, "languagechange", () => {
    a.value = s.languages;
  }), a;
}
function usePreferredReducedMotion(r) {
  const i = useMediaQuery("(prefers-reduced-motion: reduce)", r);
  return computed(() => i.value ? "reduce" : "no-preference");
}
function usePrevious(r, i) {
  const s = shallowRef(i);
  return watch(resolveRef(r), (a, c) => {
    s.value = c;
  }, { flush: "sync" }), readonly(s);
}
const useScreenOrientation = (r = {}) => {
  const {
    window: i = defaultWindow
  } = r, s = useSupported(() => i && "screen" in i && "orientation" in i.screen), a = s.value ? i.screen.orientation : {}, c = ref(a.type), d = ref(a.angle || 0);
  return s.value && useEventListener(i, "orientationchange", () => {
    c.value = a.type, d.value = a.angle;
  }), {
    isSupported: s,
    orientation: c,
    angle: d,
    lockOrientation: (u) => s.value ? a.lock(u) : Promise.reject(new Error("Not supported")),
    unlockOrientation: () => {
      s.value && a.unlock();
    }
  };
}, topVarName = "--vueuse-safe-area-top", rightVarName = "--vueuse-safe-area-right", bottomVarName = "--vueuse-safe-area-bottom", leftVarName = "--vueuse-safe-area-left";
function useScreenSafeArea() {
  const r = ref(""), i = ref(""), s = ref(""), a = ref("");
  if (isClient) {
    const d = useCssVar(topVarName), l = useCssVar(rightVarName), p = useCssVar(bottomVarName), u = useCssVar(leftVarName);
    d.value = "env(safe-area-inset-top, 0px)", l.value = "env(safe-area-inset-right, 0px)", p.value = "env(safe-area-inset-bottom, 0px)", u.value = "env(safe-area-inset-left, 0px)", c(), useEventListener("resize", useDebounceFn(c));
  }
  function c() {
    r.value = getValue(topVarName), i.value = getValue(rightVarName), s.value = getValue(bottomVarName), a.value = getValue(leftVarName);
  }
  return {
    top: r,
    right: i,
    bottom: s,
    left: a,
    update: c
  };
}
function getValue(r) {
  return getComputedStyle(document.documentElement).getPropertyValue(r);
}
function useScriptTag(r, i = noop, s = {}) {
  const {
    immediate: a = !0,
    manual: c = !1,
    type: d = "text/javascript",
    async: l = !0,
    crossOrigin: p,
    referrerPolicy: u,
    noModule: m,
    defer: v,
    document: g = defaultDocument,
    attrs: f = {}
  } = s, w = ref(null);
  let h = null;
  const _ = (b) => new Promise((P, C) => {
    const k = (T) => (w.value = T, P(T), T);
    if (!g) {
      P(!1);
      return;
    }
    let E = !1, $ = g.querySelector(`script[src="${resolveUnref(r)}"]`);
    $ ? $.hasAttribute("data-loaded") && k($) : ($ = g.createElement("script"), $.type = d, $.async = l, $.src = resolveUnref(r), v && ($.defer = v), p && ($.crossOrigin = p), m && ($.noModule = m), u && ($.referrerPolicy = u), Object.entries(f).forEach(([T, x]) => $ == null ? void 0 : $.setAttribute(T, x)), E = !0), $.addEventListener("error", (T) => C(T)), $.addEventListener("abort", (T) => C(T)), $.addEventListener("load", () => {
      $.setAttribute("data-loaded", "true"), i($), k($);
    }), E && ($ = g.head.appendChild($)), b || k($);
  }), y = (b = !0) => (h || (h = _(b)), h), S = () => {
    if (!g)
      return;
    h = null, w.value && (w.value = null);
    const b = g.querySelector(`script[src="${resolveUnref(r)}"]`);
    b && g.head.removeChild(b);
  };
  return a && !c && tryOnMounted(y), c || tryOnUnmounted(S), { scriptTag: w, load: y, unload: S };
}
function checkOverflowScroll(r) {
  const i = window.getComputedStyle(r);
  if (i.overflowX === "scroll" || i.overflowY === "scroll")
    return !0;
  {
    const s = r.parentNode;
    return !s || s.tagName === "BODY" ? !1 : checkOverflowScroll(s);
  }
}
function preventDefault(r) {
  const i = r || window.event, s = i.target;
  return checkOverflowScroll(s) ? !1 : i.touches.length > 1 ? !0 : (i.preventDefault && i.preventDefault(), !1);
}
function useScrollLock(r, i = !1) {
  const s = ref(i);
  let a = null, c;
  watch(resolveRef(r), (p) => {
    if (p) {
      const u = p;
      c = u.style.overflow, s.value && (u.style.overflow = "hidden");
    }
  }, {
    immediate: !0
  });
  const d = () => {
    const p = resolveUnref(r);
    !p || s.value || (isIOS && (a = useEventListener(p, "touchmove", (u) => {
      preventDefault(u);
    }, { passive: !1 })), p.style.overflow = "hidden", s.value = !0);
  }, l = () => {
    const p = resolveUnref(r);
    !p || !s.value || (isIOS && (a == null || a()), p.style.overflow = c, s.value = !1);
  };
  return tryOnScopeDispose(l), computed({
    get() {
      return s.value;
    },
    set(p) {
      p ? d() : l();
    }
  });
}
function useSessionStorage(r, i, s = {}) {
  const { window: a = defaultWindow } = s;
  return useStorage(r, i, a == null ? void 0 : a.sessionStorage, s);
}
var __defProp$4 = Object.defineProperty, __getOwnPropSymbols$4 = Object.getOwnPropertySymbols, __hasOwnProp$4 = Object.prototype.hasOwnProperty, __propIsEnum$4 = Object.prototype.propertyIsEnumerable, __defNormalProp$4 = (r, i, s) => i in r ? __defProp$4(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$4 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$4.call(i, s) && __defNormalProp$4(r, s, i[s]);
  if (__getOwnPropSymbols$4)
    for (var s of __getOwnPropSymbols$4(i))
      __propIsEnum$4.call(i, s) && __defNormalProp$4(r, s, i[s]);
  return r;
};
function useShare(r = {}, i = {}) {
  const { navigator: s = defaultNavigator } = i, a = s, c = useSupported(() => a && "canShare" in a);
  return {
    isSupported: c,
    share: async (l = {}) => {
      if (c.value) {
        const p = __spreadValues$4(__spreadValues$4({}, resolveUnref(r)), resolveUnref(l));
        let u = !0;
        if (p.files && a.canShare && (u = a.canShare({ files: p.files })), u)
          return a.share(p);
      }
    }
  };
}
const defaultSortFn = (r, i) => r.sort(i), defaultCompare = (r, i) => r - i;
function useSorted(...r) {
  var i, s, a, c;
  const [d] = r;
  let l = defaultCompare, p = {};
  r.length === 2 ? typeof r[1] == "object" ? (p = r[1], l = (i = p.compareFn) != null ? i : defaultCompare) : l = (s = r[1]) != null ? s : defaultCompare : r.length > 2 && (l = (a = r[1]) != null ? a : defaultCompare, p = (c = r[2]) != null ? c : {});
  const {
    dirty: u = !1,
    sortFn: m = defaultSortFn
  } = p;
  return u ? (watchEffect(() => {
    const v = m(unref(d), l);
    isRef(d) ? d.value = v : d.splice(0, d.length, ...v);
  }), d) : computed(() => m([...unref(d)], l));
}
function useSpeechRecognition(r = {}) {
  const {
    interimResults: i = !0,
    continuous: s = !0,
    window: a = defaultWindow
  } = r, c = resolveRef(r.lang || "en-US"), d = ref(!1), l = ref(!1), p = ref(""), u = shallowRef(void 0), m = (_ = !d.value) => {
    d.value = _;
  }, v = () => {
    d.value = !0;
  }, g = () => {
    d.value = !1;
  }, f = a && (a.SpeechRecognition || a.webkitSpeechRecognition), w = useSupported(() => f);
  let h;
  return w.value && (h = new f(), h.continuous = s, h.interimResults = i, h.lang = unref(c), h.onstart = () => {
    l.value = !1;
  }, watch(c, (_) => {
    h && !d.value && (h.lang = _);
  }), h.onresult = (_) => {
    const y = Array.from(_.results).map((S) => (l.value = S.isFinal, S[0])).map((S) => S.transcript).join("");
    p.value = y, u.value = void 0;
  }, h.onerror = (_) => {
    u.value = _;
  }, h.onend = () => {
    d.value = !1, h.lang = unref(c);
  }, watch(d, () => {
    d.value ? h.start() : h.stop();
  })), tryOnScopeDispose(() => {
    d.value = !1;
  }), {
    isSupported: w,
    isListening: d,
    isFinal: l,
    recognition: h,
    result: p,
    error: u,
    toggle: m,
    start: v,
    stop: g
  };
}
function useSpeechSynthesis(r, i = {}) {
  const {
    pitch: s = 1,
    rate: a = 1,
    volume: c = 1,
    window: d = defaultWindow
  } = i, l = d && d.speechSynthesis, p = useSupported(() => l), u = ref(!1), m = ref("init"), v = resolveRef(r || ""), g = resolveRef(i.lang || "en-US"), f = shallowRef(void 0), w = (S = !u.value) => {
    u.value = S;
  }, h = (S) => {
    S.lang = unref(g), S.voice = unref(i.voice) || null, S.pitch = s, S.rate = a, S.volume = c, S.onstart = () => {
      u.value = !0, m.value = "play";
    }, S.onpause = () => {
      u.value = !1, m.value = "pause";
    }, S.onresume = () => {
      u.value = !0, m.value = "play";
    }, S.onend = () => {
      u.value = !1, m.value = "end";
    }, S.onerror = (b) => {
      f.value = b;
    };
  }, _ = computed(() => {
    u.value = !1, m.value = "init";
    const S = new SpeechSynthesisUtterance(v.value);
    return h(S), S;
  }), y = () => {
    l.cancel(), _ && l.speak(_.value);
  };
  return p.value && (h(_.value), watch(g, (S) => {
    _.value && !u.value && (_.value.lang = S);
  }), i.voice && watch(i.voice, () => {
    l.cancel();
  }), watch(u, () => {
    u.value ? l.resume() : l.pause();
  })), tryOnScopeDispose(() => {
    u.value = !1;
  }), {
    isSupported: p,
    isPlaying: u,
    status: m,
    utterance: _,
    error: f,
    toggle: w,
    speak: y
  };
}
function useStepper(r, i) {
  const s = ref(r), a = computed(() => Array.isArray(s.value) ? s.value : Object.keys(s.value)), c = ref(a.value.indexOf(i ?? a.value[0])), d = computed(() => v(c.value)), l = computed(() => c.value === 0), p = computed(() => c.value === a.value.length - 1), u = computed(() => a.value[c.value + 1]), m = computed(() => a.value[c.value - 1]);
  function v(k) {
    return Array.isArray(s.value) ? s.value[k] : s.value[a.value[k]];
  }
  function g(k) {
    if (a.value.includes(k))
      return v(a.value.indexOf(k));
  }
  function f(k) {
    a.value.includes(k) && (c.value = a.value.indexOf(k));
  }
  function w() {
    p.value || c.value++;
  }
  function h() {
    l.value || c.value--;
  }
  function _(k) {
    C(k) && f(k);
  }
  function y(k) {
    return a.value.indexOf(k) === c.value + 1;
  }
  function S(k) {
    return a.value.indexOf(k) === c.value - 1;
  }
  function b(k) {
    return a.value.indexOf(k) === c.value;
  }
  function P(k) {
    return c.value < a.value.indexOf(k);
  }
  function C(k) {
    return c.value > a.value.indexOf(k);
  }
  return {
    steps: s,
    stepNames: a,
    index: c,
    current: d,
    next: u,
    previous: m,
    isFirst: l,
    isLast: p,
    at: v,
    get: g,
    goTo: f,
    goToNext: w,
    goToPrevious: h,
    goBackTo: _,
    isNext: y,
    isPrevious: S,
    isCurrent: b,
    isBefore: P,
    isAfter: C
  };
}
function useStorageAsync(r, i, s, a = {}) {
  var c;
  const {
    flush: d = "pre",
    deep: l = !0,
    listenToStorageChanges: p = !0,
    writeDefaults: u = !0,
    shallow: m,
    window: v = defaultWindow,
    eventFilter: g,
    onError: f = (b) => {
      console.error(b);
    }
  } = a, w = resolveUnref(i), h = guessSerializerType(w), _ = (m ? shallowRef : ref)(i), y = (c = a.serializer) != null ? c : StorageSerializers[h];
  if (!s)
    try {
      s = getSSRHandler("getDefaultStorage", () => {
        var b;
        return (b = defaultWindow) == null ? void 0 : b.localStorage;
      })();
    } catch (b) {
      f(b);
    }
  async function S(b) {
    if (!(!s || b && b.key !== r))
      try {
        const P = b ? b.newValue : await s.getItem(r);
        P == null ? (_.value = w, u && w !== null && await s.setItem(r, await y.write(w))) : _.value = await y.read(P);
      } catch (P) {
        f(P);
      }
  }
  return S(), v && p && useEventListener(v, "storage", (b) => setTimeout(() => S(b), 0)), s && watchWithFilter(_, async () => {
    try {
      _.value == null ? await s.removeItem(r) : await s.setItem(r, await y.write(_.value));
    } catch (b) {
      f(b);
    }
  }, {
    flush: d,
    deep: l,
    eventFilter: g
  }), _;
}
let _id = 0;
function useStyleTag(r, i = {}) {
  const s = ref(!1), {
    document: a = defaultDocument,
    immediate: c = !0,
    manual: d = !1,
    id: l = `vueuse_styletag_${++_id}`
  } = i, p = ref(r);
  let u = () => {
  };
  const m = () => {
    if (!a)
      return;
    const g = a.getElementById(l) || a.createElement("style");
    g.isConnected || (g.type = "text/css", g.id = l, i.media && (g.media = i.media), a.head.appendChild(g)), !s.value && (u = watch(p, (f) => {
      g.textContent = f;
    }, { immediate: !0 }), s.value = !0);
  }, v = () => {
    !a || !s.value || (u(), a.head.removeChild(a.getElementById(l)), s.value = !1);
  };
  return c && !d && tryOnMounted(m), d || tryOnScopeDispose(v), {
    id: l,
    css: p,
    unload: v,
    load: m,
    isLoaded: readonly(s)
  };
}
function useTemplateRefsList() {
  const r = ref([]);
  return r.value.set = (i) => {
    i && r.value.push(i);
  }, onBeforeUpdate(() => {
    r.value.length = 0;
  }), r;
}
function useTextDirection(r = {}) {
  const {
    document: i = defaultDocument,
    selector: s = "html",
    observe: a = !1,
    initialValue: c = "ltr"
  } = r;
  function d() {
    var p, u;
    return (u = (p = i == null ? void 0 : i.querySelector(s)) == null ? void 0 : p.getAttribute("dir")) != null ? u : c;
  }
  const l = ref(d());
  return tryOnMounted(() => l.value = d()), a && i && useMutationObserver(i.querySelector(s), () => l.value = d(), { attributes: !0 }), computed({
    get() {
      return l.value;
    },
    set(p) {
      var u, m;
      l.value = p, i && (l.value ? (u = i.querySelector(s)) == null || u.setAttribute("dir", l.value) : (m = i.querySelector(s)) == null || m.removeAttribute("dir"));
    }
  });
}
function getRangesFromSelection(r) {
  var i;
  const s = (i = r.rangeCount) != null ? i : 0, a = new Array(s);
  for (let c = 0; c < s; c++) {
    const d = r.getRangeAt(c);
    a[c] = d;
  }
  return a;
}
function useTextSelection(r = {}) {
  const {
    window: i = defaultWindow
  } = r, s = ref(null), a = computed(() => {
    var p, u;
    return (u = (p = s.value) == null ? void 0 : p.toString()) != null ? u : "";
  }), c = computed(() => s.value ? getRangesFromSelection(s.value) : []), d = computed(() => c.value.map((p) => p.getBoundingClientRect()));
  function l() {
    s.value = null, i && (s.value = i.getSelection());
  }
  return i && useEventListener(i.document, "selectionchange", l), {
    text: a,
    rects: d,
    ranges: c,
    selection: s
  };
}
function useTextareaAutosize(r) {
  const i = ref(r == null ? void 0 : r.element), s = ref(r == null ? void 0 : r.input);
  function a() {
    var c, d;
    i.value && (i.value.style.height = "1px", i.value.style.height = `${(c = i.value) == null ? void 0 : c.scrollHeight}px`, (d = r == null ? void 0 : r.onResize) == null || d.call(r));
  }
  return watch([s, i], a, { immediate: !0 }), useResizeObserver(i, () => a()), r != null && r.watch && watch(r.watch, a, { immediate: !0, deep: !0 }), {
    textarea: i,
    input: s,
    triggerResize: a
  };
}
var __defProp$3 = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$3 = Object.getOwnPropertySymbols, __hasOwnProp$3 = Object.prototype.hasOwnProperty, __propIsEnum$3 = Object.prototype.propertyIsEnumerable, __defNormalProp$3 = (r, i, s) => i in r ? __defProp$3(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$3 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$3.call(i, s) && __defNormalProp$3(r, s, i[s]);
  if (__getOwnPropSymbols$3)
    for (var s of __getOwnPropSymbols$3(i))
      __propIsEnum$3.call(i, s) && __defNormalProp$3(r, s, i[s]);
  return r;
}, __spreadProps = (r, i) => __defProps(r, __getOwnPropDescs(i));
function useThrottledRefHistory(r, i = {}) {
  const { throttle: s = 200, trailing: a = !0 } = i, c = throttleFilter(s, a), d = useRefHistory(r, __spreadProps(__spreadValues$3({}, i), { eventFilter: c }));
  return __spreadValues$3({}, d);
}
var __defProp$2 = Object.defineProperty, __getOwnPropSymbols$2 = Object.getOwnPropertySymbols, __hasOwnProp$2 = Object.prototype.hasOwnProperty, __propIsEnum$2 = Object.prototype.propertyIsEnumerable, __defNormalProp$2 = (r, i, s) => i in r ? __defProp$2(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$2 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$2.call(i, s) && __defNormalProp$2(r, s, i[s]);
  if (__getOwnPropSymbols$2)
    for (var s of __getOwnPropSymbols$2(i))
      __propIsEnum$2.call(i, s) && __defNormalProp$2(r, s, i[s]);
  return r;
}, __objRest = (r, i) => {
  var s = {};
  for (var a in r)
    __hasOwnProp$2.call(r, a) && i.indexOf(a) < 0 && (s[a] = r[a]);
  if (r != null && __getOwnPropSymbols$2)
    for (var a of __getOwnPropSymbols$2(r))
      i.indexOf(a) < 0 && __propIsEnum$2.call(r, a) && (s[a] = r[a]);
  return s;
};
const DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: 1 / 0, value: 31536e6, name: "year" }
], DEFAULT_MESSAGES = {
  justNow: "just now",
  past: (r) => r.match(/\d/) ? `${r} ago` : r,
  future: (r) => r.match(/\d/) ? `in ${r}` : r,
  month: (r, i) => r === 1 ? i ? "last month" : "next month" : `${r} month${r > 1 ? "s" : ""}`,
  year: (r, i) => r === 1 ? i ? "last year" : "next year" : `${r} year${r > 1 ? "s" : ""}`,
  day: (r, i) => r === 1 ? i ? "yesterday" : "tomorrow" : `${r} day${r > 1 ? "s" : ""}`,
  week: (r, i) => r === 1 ? i ? "last week" : "next week" : `${r} week${r > 1 ? "s" : ""}`,
  hour: (r) => `${r} hour${r > 1 ? "s" : ""}`,
  minute: (r) => `${r} minute${r > 1 ? "s" : ""}`,
  second: (r) => `${r} second${r > 1 ? "s" : ""}`,
  invalid: ""
}, DEFAULT_FORMATTER = (r) => r.toISOString().slice(0, 10);
function useTimeAgo(r, i = {}) {
  const {
    controls: s = !1,
    updateInterval: a = 3e4
  } = i, c = useNow({ interval: a, controls: !0 }), { now: d } = c, l = __objRest(c, ["now"]), p = computed(() => formatTimeAgo(new Date(resolveUnref(r)), i, unref(d.value)));
  return s ? __spreadValues$2({
    timeAgo: p
  }, l) : p;
}
function formatTimeAgo(r, i = {}, s = Date.now()) {
  var a;
  const {
    max: c,
    messages: d = DEFAULT_MESSAGES,
    fullDateFormatter: l = DEFAULT_FORMATTER,
    units: p = DEFAULT_UNITS,
    showSecond: u = !1,
    rounding: m = "round"
  } = i, v = typeof m == "number" ? (y) => +y.toFixed(m) : Math[m], g = +s - +r, f = Math.abs(g);
  function w(y, S) {
    return v(Math.abs(y) / S.value);
  }
  function h(y, S) {
    const b = w(y, S), P = y > 0, C = _(S.name, b, P);
    return _(P ? "past" : "future", C, P);
  }
  function _(y, S, b) {
    const P = d[y];
    return typeof P == "function" ? P(S, b) : P.replace("{0}", S.toString());
  }
  if (f < 6e4 && !u)
    return d.justNow;
  if (typeof c == "number" && f > c)
    return l(new Date(r));
  if (typeof c == "string") {
    const y = (a = p.find((S) => S.name === c)) == null ? void 0 : a.max;
    if (y && f > y)
      return l(new Date(r));
  }
  for (const [y, S] of p.entries()) {
    if (w(g, S) <= 0 && p[y - 1])
      return h(g, p[y - 1]);
    if (f < S.max)
      return h(g, S);
  }
  return d.invalid;
}
function useTimeoutPoll(r, i, s) {
  const { start: a } = useTimeoutFn(d, i), c = ref(!1);
  async function d() {
    c.value && (await r(), a());
  }
  function l() {
    c.value || (c.value = !0, d());
  }
  function p() {
    c.value = !1;
  }
  return s != null && s.immediate && l(), tryOnScopeDispose(p), {
    isActive: c,
    pause: p,
    resume: l
  };
}
var __defProp$1 = Object.defineProperty, __getOwnPropSymbols$1 = Object.getOwnPropertySymbols, __hasOwnProp$1 = Object.prototype.hasOwnProperty, __propIsEnum$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$1 = (r, i, s) => i in r ? __defProp$1(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues$1 = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp$1.call(i, s) && __defNormalProp$1(r, s, i[s]);
  if (__getOwnPropSymbols$1)
    for (var s of __getOwnPropSymbols$1(i))
      __propIsEnum$1.call(i, s) && __defNormalProp$1(r, s, i[s]);
  return r;
};
function useTimestamp(r = {}) {
  const {
    controls: i = !1,
    offset: s = 0,
    immediate: a = !0,
    interval: c = "requestAnimationFrame",
    callback: d
  } = r, l = ref(timestamp() + s), p = () => l.value = timestamp() + s, u = d ? () => {
    p(), d(l.value);
  } : p, m = c === "requestAnimationFrame" ? useRafFn(u, { immediate: a }) : useIntervalFn(u, c, { immediate: a });
  return i ? __spreadValues$1({
    timestamp: l
  }, m) : l;
}
function useTitle(r = null, i = {}) {
  var s, a;
  const {
    document: c = defaultDocument
  } = i, d = resolveRef((s = r ?? (c == null ? void 0 : c.title)) != null ? s : null), l = r && isFunction(r);
  function p(u) {
    if (!("titleTemplate" in i))
      return u;
    const m = i.titleTemplate || "%s";
    return isFunction(m) ? m(u) : unref(m).replace(/%s/g, u);
  }
  return watch(d, (u, m) => {
    u !== m && c && (c.title = p(isString(u) ? u : ""));
  }, { immediate: !0 }), i.observe && !i.titleTemplate && c && !l && useMutationObserver((a = c.head) == null ? void 0 : a.querySelector("title"), () => {
    c && c.title !== d.value && (d.value = p(c.title));
  }, { childList: !0 }), d;
}
var __defProp = Object.defineProperty, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (r, i, s) => i in r ? __defProp(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s, __spreadValues = (r, i) => {
  for (var s in i || (i = {}))
    __hasOwnProp.call(i, s) && __defNormalProp(r, s, i[s]);
  if (__getOwnPropSymbols)
    for (var s of __getOwnPropSymbols(i))
      __propIsEnum.call(i, s) && __defNormalProp(r, s, i[s]);
  return r;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
}, TransitionPresets = __spreadValues({
  linear: identity
}, _TransitionPresets);
function createEasingFunction([r, i, s, a]) {
  const c = (v, g) => 1 - 3 * g + 3 * v, d = (v, g) => 3 * g - 6 * v, l = (v) => 3 * v, p = (v, g, f) => ((c(g, f) * v + d(g, f)) * v + l(g)) * v, u = (v, g, f) => 3 * c(g, f) * v * v + 2 * d(g, f) * v + l(g), m = (v) => {
    let g = v;
    for (let f = 0; f < 4; ++f) {
      const w = u(g, r, s);
      if (w === 0)
        return g;
      const h = p(g, r, s) - v;
      g -= h / w;
    }
    return g;
  };
  return (v) => r === i && s === a ? v : p(m(v), i, a);
}
function useTransition(r, i = {}) {
  const {
    delay: s = 0,
    disabled: a = !1,
    duration: c = 1e3,
    onFinished: d = noop,
    onStarted: l = noop,
    transition: p = identity
  } = i, u = computed(() => {
    const k = unref(p);
    return isFunction(k) ? k : createEasingFunction(k);
  }), m = computed(() => {
    const k = unref(r);
    return isNumber(k) ? k : k.map(unref);
  }), v = computed(() => isNumber(m.value) ? [m.value] : m.value), g = ref(v.value.slice(0));
  let f, w, h, _, y;
  const { resume: S, pause: b } = useRafFn(() => {
    const k = Date.now(), E = clamp(1 - (h - k) / f, 0, 1);
    g.value = y.map(($, T) => {
      var x;
      return $ + ((x = w[T]) != null ? x : 0) * u.value(E);
    }), E >= 1 && (b(), d());
  }, { immediate: !1 }), P = () => {
    b(), f = unref(c), w = g.value.map((k, E) => {
      var $, T;
      return (($ = v.value[E]) != null ? $ : 0) - ((T = g.value[E]) != null ? T : 0);
    }), y = g.value.slice(0), _ = Date.now(), h = _ + f, S(), l();
  }, C = useTimeoutFn(P, s, { immediate: !1 });
  return watch(v, () => {
    unref(a) || (unref(s) <= 0 ? P() : C.start());
  }, { deep: !0 }), watch(() => unref(a), (k) => {
    k && (g.value = v.value.slice(0), b());
  }), computed(() => {
    const k = unref(a) ? v : g;
    return isNumber(m.value) ? k.value[0] : k.value;
  });
}
function useUrlSearchParams(r = "history", i = {}) {
  const {
    initialValue: s = {},
    removeNullishValues: a = !0,
    removeFalsyValues: c = !1,
    write: d = !0,
    window: l = defaultWindow
  } = i;
  if (!l)
    return reactive(s);
  const p = reactive({});
  function u() {
    if (r === "history")
      return l.location.search || "";
    if (r === "hash") {
      const S = l.location.hash || "", b = S.indexOf("?");
      return b > 0 ? S.slice(b) : "";
    } else
      return (l.location.hash || "").replace(/^#/, "");
  }
  function m(S) {
    const b = S.toString();
    if (r === "history")
      return `${b ? `?${b}` : ""}${l.location.hash || ""}`;
    if (r === "hash-params")
      return `${l.location.search || ""}${b ? `#${b}` : ""}`;
    const P = l.location.hash || "#", C = P.indexOf("?");
    return C > 0 ? `${P.slice(0, C)}${b ? `?${b}` : ""}` : `${P}${b ? `?${b}` : ""}`;
  }
  function v() {
    return new URLSearchParams(u());
  }
  function g(S) {
    const b = new Set(Object.keys(p));
    for (const P of S.keys()) {
      const C = S.getAll(P);
      p[P] = C.length > 1 ? C : S.get(P) || "", b.delete(P);
    }
    Array.from(b).forEach((P) => delete p[P]);
  }
  const { pause: f, resume: w } = watchPausable(p, () => {
    const S = new URLSearchParams("");
    Object.keys(p).forEach((b) => {
      const P = p[b];
      Array.isArray(P) ? P.forEach((C) => S.append(b, C)) : a && P == null || c && !P ? S.delete(b) : S.set(b, P);
    }), h(S);
  }, { deep: !0 });
  function h(S, b) {
    f(), b && g(S), l.history.replaceState(l.history.state, l.document.title, l.location.pathname + m(S)), w();
  }
  function _() {
    d && h(v(), !0);
  }
  useEventListener(l, "popstate", _, !1), r !== "history" && useEventListener(l, "hashchange", _, !1);
  const y = v();
  return y.keys().next().value ? g(y) : Object.assign(p, s), p;
}
function useUserMedia(r = {}) {
  var i, s;
  const a = ref((i = r.enabled) != null ? i : !1), c = ref((s = r.autoSwitch) != null ? s : !0), d = ref(r.videoDeviceId), l = ref(r.audioDeviceId), { navigator: p = defaultNavigator } = r, u = useSupported(() => {
    var y;
    return (y = p == null ? void 0 : p.mediaDevices) == null ? void 0 : y.getUserMedia;
  }), m = shallowRef();
  function v(y) {
    return y.value === "none" || y.value === !1 ? !1 : y.value == null ? !0 : {
      deviceId: y.value
    };
  }
  async function g() {
    if (!(!u.value || m.value))
      return m.value = await p.mediaDevices.getUserMedia({
        video: v(d),
        audio: v(l)
      }), m.value;
  }
  async function f() {
    var y;
    (y = m.value) == null || y.getTracks().forEach((S) => S.stop()), m.value = void 0;
  }
  function w() {
    f(), a.value = !1;
  }
  async function h() {
    return await g(), m.value && (a.value = !0), m.value;
  }
  async function _() {
    return f(), await h();
  }
  return watch(a, (y) => {
    y ? g() : f();
  }, { immediate: !0 }), watch([d, l], () => {
    c.value && m.value && _();
  }, { immediate: !0 }), {
    isSupported: u,
    stream: m,
    start: h,
    stop: w,
    restart: _,
    videoDeviceId: d,
    audioDeviceId: l,
    enabled: a,
    autoSwitch: c
  };
}
function useVModel(r, i, s, a = {}) {
  var c, d, l, p, u;
  const {
    clone: m = !1,
    passive: v = !1,
    eventName: g,
    deep: f = !1,
    defaultValue: w
  } = a, h = getCurrentInstance(), _ = s || (h == null ? void 0 : h.emit) || ((c = h == null ? void 0 : h.$emit) == null ? void 0 : c.bind(h)) || ((l = (d = h == null ? void 0 : h.proxy) == null ? void 0 : d.$emit) == null ? void 0 : l.bind(h == null ? void 0 : h.proxy));
  let y = g;
  if (!i)
    if (isVue2) {
      const P = (u = (p = h == null ? void 0 : h.proxy) == null ? void 0 : p.$options) == null ? void 0 : u.model;
      i = (P == null ? void 0 : P.value) || "value", g || (y = (P == null ? void 0 : P.event) || "input");
    } else
      i = "modelValue";
  y = g || y || `update:${i.toString()}`;
  const S = (P) => m ? isFunction(m) ? m(P) : cloneFnJSON(P) : P, b = () => isDef(r[i]) ? S(r[i]) : w;
  if (v) {
    const P = b(), C = ref(P);
    return watch(() => r[i], (k) => C.value = S(k)), watch(C, (k) => {
      (k !== r[i] || f) && _(y, k);
    }, { deep: f }), C;
  } else
    return computed({
      get() {
        return b();
      },
      set(P) {
        _(y, P);
      }
    });
}
function useVModels(r, i, s = {}) {
  const a = {};
  for (const c in r)
    a[c] = useVModel(r, c, i, s);
  return a;
}
function useVibrate(r) {
  const {
    pattern: i = [],
    interval: s = 0,
    navigator: a = defaultNavigator
  } = r || {}, c = useSupported(() => typeof a < "u" && "vibrate" in a), d = resolveRef(i);
  let l;
  const p = (m = d.value) => {
    c.value && a.vibrate(m);
  }, u = () => {
    c.value && a.vibrate(0), l == null || l.pause();
  };
  return s > 0 && (l = useIntervalFn(p, s, {
    immediate: !1,
    immediateCallback: !1
  })), {
    isSupported: c,
    pattern: i,
    intervalControls: l,
    vibrate: p,
    stop: u
  };
}
function useVirtualList(r, i) {
  const { containerStyle: s, wrapperProps: a, scrollTo: c, calculateRange: d, currentList: l, containerRef: p } = "itemHeight" in i ? useVerticalVirtualList(i, r) : useHorizontalVirtualList(i, r);
  return {
    list: l,
    scrollTo: c,
    containerProps: {
      ref: p,
      onScroll: () => {
        d();
      },
      style: s
    },
    wrapperProps: a
  };
}
function useVirtualListResources(r) {
  const i = ref(null), s = useElementSize(i), a = ref([]), c = shallowRef(r);
  return { state: ref({ start: 0, end: 10 }), source: c, currentList: a, size: s, containerRef: i };
}
function createGetViewCapacity(r, i, s) {
  return (a) => {
    if (typeof s == "number")
      return Math.ceil(a / s);
    const { start: c = 0 } = r.value;
    let d = 0, l = 0;
    for (let p = c; p < i.value.length; p++) {
      const u = s(p);
      if (d += u, l = p, d > a)
        break;
    }
    return l - c;
  };
}
function createGetOffset(r, i) {
  return (s) => {
    if (typeof i == "number")
      return Math.floor(s / i) + 1;
    let a = 0, c = 0;
    for (let d = 0; d < r.value.length; d++) {
      const l = i(d);
      if (a += l, a >= s) {
        c = d;
        break;
      }
    }
    return c + 1;
  };
}
function createCalculateRange(r, i, s, a, { containerRef: c, state: d, currentList: l, source: p }) {
  return () => {
    const u = c.value;
    if (u) {
      const m = s(r === "vertical" ? u.scrollTop : u.scrollLeft), v = a(r === "vertical" ? u.clientHeight : u.clientWidth), g = m - i, f = m + v + i;
      d.value = {
        start: g < 0 ? 0 : g,
        end: f > p.value.length ? p.value.length : f
      }, l.value = p.value.slice(d.value.start, d.value.end).map((w, h) => ({
        data: w,
        index: h + d.value.start
      }));
    }
  };
}
function createGetDistance(r, i) {
  return (s) => typeof r == "number" ? s * r : i.value.slice(0, s).reduce((c, d, l) => c + r(l), 0);
}
function useWatchForSizes(r, i, s) {
  watch([r.width, r.height, i], () => {
    s();
  });
}
function createComputedTotalSize(r, i) {
  return computed(() => typeof r == "number" ? i.value.length * r : i.value.reduce((s, a, c) => s + r(c), 0));
}
const scrollToDictionaryForElementScrollKey = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function createScrollTo(r, i, s, a) {
  return (c) => {
    a.value && (a.value[scrollToDictionaryForElementScrollKey[r]] = s(c), i());
  };
}
function useHorizontalVirtualList(r, i) {
  const s = useVirtualListResources(i), { state: a, source: c, currentList: d, size: l, containerRef: p } = s, u = { overflowX: "auto" }, { itemWidth: m, overscan: v = 5 } = r, g = createGetViewCapacity(a, c, m), f = createGetOffset(c, m), w = createCalculateRange("horizontal", v, f, g, s), h = createGetDistance(m, c), _ = computed(() => h(a.value.start)), y = createComputedTotalSize(m, c);
  useWatchForSizes(l, i, w);
  const S = createScrollTo("horizontal", w, h, p), b = computed(() => ({
    style: {
      height: "100%",
      width: `${y.value - _.value}px`,
      marginLeft: `${_.value}px`,
      display: "flex"
    }
  }));
  return {
    scrollTo: S,
    calculateRange: w,
    wrapperProps: b,
    containerStyle: u,
    currentList: d,
    containerRef: p
  };
}
function useVerticalVirtualList(r, i) {
  const s = useVirtualListResources(i), { state: a, source: c, currentList: d, size: l, containerRef: p } = s, u = { overflowY: "auto" }, { itemHeight: m, overscan: v = 5 } = r, g = createGetViewCapacity(a, c, m), f = createGetOffset(c, m), w = createCalculateRange("vertical", v, f, g, s), h = createGetDistance(m, c), _ = computed(() => h(a.value.start)), y = createComputedTotalSize(m, c);
  useWatchForSizes(l, i, w);
  const S = createScrollTo("vertical", w, h, p), b = computed(() => ({
    style: {
      width: "100%",
      height: `${y.value - _.value}px`,
      marginTop: `${_.value}px`
    }
  }));
  return {
    calculateRange: w,
    scrollTo: S,
    containerStyle: u,
    wrapperProps: b,
    currentList: d,
    containerRef: p
  };
}
const useWakeLock = (r = {}) => {
  const {
    navigator: i = defaultNavigator,
    document: s = defaultDocument
  } = r;
  let a;
  const c = useSupported(() => i && "wakeLock" in i), d = ref(!1);
  async function l() {
    !c.value || !a || (s && s.visibilityState === "visible" && (a = await i.wakeLock.request("screen")), d.value = !a.released);
  }
  s && useEventListener(s, "visibilitychange", l, { passive: !0 });
  async function p(m) {
    c.value && (a = await i.wakeLock.request(m), d.value = !a.released);
  }
  async function u() {
    !c.value || !a || (await a.release(), d.value = !a.released, a = null);
  }
  return {
    isSupported: c,
    isActive: d,
    request: p,
    release: u
  };
}, useWebNotification = (r = {}) => {
  const {
    window: i = defaultWindow
  } = r, s = useSupported(() => !!i && "Notification" in i), a = ref(null), c = async () => {
    s.value && "permission" in Notification && Notification.permission !== "denied" && await Notification.requestPermission();
  }, d = createEventHook(), l = createEventHook(), p = createEventHook(), u = createEventHook(), m = async (g) => {
    if (!s.value)
      return;
    await c();
    const f = Object.assign({}, r, g);
    return a.value = new Notification(f.title || "", f), a.value.onclick = (w) => d.trigger(w), a.value.onshow = (w) => l.trigger(w), a.value.onerror = (w) => p.trigger(w), a.value.onclose = (w) => u.trigger(w), a.value;
  }, v = () => {
    a.value && a.value.close(), a.value = null;
  };
  if (tryOnMounted(async () => {
    s.value && await c();
  }), tryOnScopeDispose(v), s.value && i) {
    const g = i.document;
    useEventListener(g, "visibilitychange", (f) => {
      f.preventDefault(), g.visibilityState === "visible" && v();
    });
  }
  return {
    isSupported: s,
    notification: a,
    show: m,
    close: v,
    onClick: d,
    onShow: l,
    onError: p,
    onClose: u
  };
}, DEFAULT_PING_MESSAGE = "ping";
function resolveNestedOptions(r) {
  return r === !0 ? {} : r;
}
function useWebSocket(r, i = {}) {
  const {
    onConnected: s,
    onDisconnected: a,
    onError: c,
    onMessage: d,
    immediate: l = !0,
    autoClose: p = !0,
    protocols: u = []
  } = i, m = ref(null), v = ref("CLOSED"), g = ref(), f = resolveRef(r);
  let w, h, _ = !1, y = 0, S = [], b;
  const P = (x = 1e3, j) => {
    g.value && (_ = !0, w == null || w(), g.value.close(x, j));
  }, C = () => {
    if (S.length && g.value && v.value === "OPEN") {
      for (const x of S)
        g.value.send(x);
      S = [];
    }
  }, k = () => {
    clearTimeout(b), b = void 0;
  }, E = (x, j = !0) => !g.value || v.value !== "OPEN" ? (j && S.push(x), !1) : (C(), g.value.send(x), !0), $ = () => {
    if (_ || typeof f.value > "u")
      return;
    const x = new WebSocket(f.value, u);
    g.value = x, v.value = "CONNECTING", x.onopen = () => {
      v.value = "OPEN", s == null || s(x), h == null || h(), C();
    }, x.onclose = (j) => {
      if (v.value = "CLOSED", g.value = void 0, a == null || a(x, j), !_ && i.autoReconnect) {
        const {
          retries: O = -1,
          delay: I = 1e3,
          onFailed: M
        } = resolveNestedOptions(i.autoReconnect);
        y += 1, typeof O == "number" && (O < 0 || y < O) || typeof O == "function" && O() ? setTimeout($, I) : M == null || M();
      }
    }, x.onerror = (j) => {
      c == null || c(x, j);
    }, x.onmessage = (j) => {
      if (i.heartbeat) {
        k();
        const {
          message: O = DEFAULT_PING_MESSAGE
        } = resolveNestedOptions(i.heartbeat);
        if (j.data === O)
          return;
      }
      m.value = j.data, d == null || d(x, j);
    };
  };
  if (i.heartbeat) {
    const {
      message: x = DEFAULT_PING_MESSAGE,
      interval: j = 1e3,
      pongTimeout: O = 1e3
    } = resolveNestedOptions(i.heartbeat), { pause: I, resume: M } = useIntervalFn(() => {
      E(x, !1), b == null && (b = setTimeout(() => {
        P();
      }, O));
    }, j, { immediate: !1 });
    w = I, h = M;
  }
  p && (useEventListener(window, "beforeunload", () => P()), tryOnScopeDispose(P));
  const T = () => {
    P(), _ = !1, y = 0, $();
  };
  return l && watch(f, T, { immediate: !0 }), {
    data: m,
    status: v,
    close: P,
    send: E,
    open: T,
    ws: g
  };
}
function useWebWorker(r, i, s) {
  const {
    window: a = defaultWindow
  } = s ?? {}, c = ref(null), d = shallowRef(), l = function(m) {
    d.value && d.value.postMessage(m);
  }, p = function() {
    d.value && d.value.terminate();
  };
  return a && (isString(r) ? d.value = new Worker(r, i) : isFunction(r) ? d.value = r() : d.value = r, d.value.onmessage = (u) => {
    c.value = u.data;
  }, tryOnScopeDispose(() => {
    d.value && d.value.terminate();
  })), {
    data: c,
    post: l,
    terminate: p,
    worker: d
  };
}
const jobRunner = (r) => (i) => {
  const s = i.data[0];
  return Promise.resolve(r.apply(void 0, s)).then((a) => {
    postMessage(["SUCCESS", a]);
  }).catch((a) => {
    postMessage(["ERROR", a]);
  });
}, depsParser = (r) => r.length === 0 ? "" : `importScripts(${r.map((s) => `'${s}'`).toString()})`, createWorkerBlobUrl = (r, i) => {
  const s = `${depsParser(i)}; onmessage=(${jobRunner})(${r})`, a = new Blob([s], { type: "text/javascript" });
  return URL.createObjectURL(a);
}, useWebWorkerFn = (r, i = {}) => {
  const {
    dependencies: s = [],
    timeout: a,
    window: c = defaultWindow
  } = i, d = ref(), l = ref("PENDING"), p = ref({}), u = ref(), m = (w = "PENDING") => {
    d.value && d.value._url && c && (d.value.terminate(), URL.revokeObjectURL(d.value._url), p.value = {}, d.value = void 0, c.clearTimeout(u.value), l.value = w);
  };
  m(), tryOnScopeDispose(m);
  const v = () => {
    const w = createWorkerBlobUrl(r, s), h = new Worker(w);
    return h._url = w, h.onmessage = (_) => {
      const { resolve: y = () => {
      }, reject: S = () => {
      } } = p.value, [b, P] = _.data;
      switch (b) {
        case "SUCCESS":
          y(P), m(b);
          break;
        default:
          S(P), m("ERROR");
          break;
      }
    }, h.onerror = (_) => {
      const { reject: y = () => {
      } } = p.value;
      y(_), m("ERROR");
    }, a && (u.value = setTimeout(() => m("TIMEOUT_EXPIRED"), a)), h;
  }, g = (...w) => new Promise((h, _) => {
    p.value = {
      resolve: h,
      reject: _
    }, d.value && d.value.postMessage([[...w]]), l.value = "RUNNING";
  });
  return {
    workerFn: (...w) => l.value === "RUNNING" ? (console.error("[useWebWorkerFn] You can only run one instance of the worker at a time."), Promise.reject()) : (d.value = v(), g(...w)),
    workerStatus: l,
    workerTerminate: m
  };
};
function useWindowFocus({ window: r = defaultWindow } = {}) {
  if (!r)
    return ref(!1);
  const i = ref(r.document.hasFocus());
  return useEventListener(r, "blur", () => {
    i.value = !1;
  }), useEventListener(r, "focus", () => {
    i.value = !0;
  }), i;
}
function useWindowScroll({ window: r = defaultWindow } = {}) {
  if (!r)
    return {
      x: ref(0),
      y: ref(0)
    };
  const i = ref(r.pageXOffset), s = ref(r.pageYOffset);
  return useEventListener(r, "scroll", () => {
    i.value = r.pageXOffset, s.value = r.pageYOffset;
  }, {
    capture: !1,
    passive: !0
  }), { x: i, y: s };
}
function useWindowSize(r = {}) {
  const {
    window: i = defaultWindow,
    initialWidth: s = 1 / 0,
    initialHeight: a = 1 / 0,
    listenOrientation: c = !0,
    includeScrollbar: d = !0
  } = r, l = ref(s), p = ref(a), u = () => {
    i && (d ? (l.value = i.innerWidth, p.value = i.innerHeight) : (l.value = i.document.documentElement.clientWidth, p.value = i.document.documentElement.clientHeight));
  };
  return u(), tryOnMounted(u), useEventListener("resize", u, { passive: !0 }), c && useEventListener("orientationchange", u, { passive: !0 }), { width: l, height: p };
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function getDefaultExportFromNamespaceIfPresent(r) {
  return r && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function getDefaultExportFromNamespaceIfNotNamed(r) {
  return r && Object.prototype.hasOwnProperty.call(r, "default") && Object.keys(r).length === 1 ? r.default : r;
}
function getAugmentedNamespace(r) {
  if (r.__esModule)
    return r;
  var i = r.default;
  if (typeof i == "function") {
    var s = function a() {
      if (this instanceof a) {
        var c = [null];
        c.push.apply(c, arguments);
        var d = Function.bind.apply(i, c);
        return new d();
      }
      return i.apply(this, arguments);
    };
    s.prototype = i.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(r).forEach(function(a) {
    var c = Object.getOwnPropertyDescriptor(r, a);
    Object.defineProperty(s, a, c.get ? c : {
      enumerable: !0,
      get: function() {
        return r[a];
      }
    });
  }), s;
}
var lib = {}, balancedMatch = function(r, i, s) {
  for (var a = 0, c = {}, d = 0; d < s.length; d++)
    if (r == s.substr(d, r.length))
      "start" in c || (c.start = d), a++;
    else if (i == s.substr(d, i.length) && "start" in c && (a--, !a))
      return c.end = d, c.pre = s.substr(0, c.start), c.body = c.end - c.start > 1 ? s.substring(c.start + r.length, c.end) : "", c.post = s.slice(c.end + i.length), c;
}, cloneExports = {}, clone$2 = {
  get exports() {
    return cloneExports;
  },
  set exports(r) {
    cloneExports = r;
  }
};
(function(r) {
  var i = function() {
    "use strict";
    function s(u, m, v, g) {
      var f;
      typeof m == "object" && (v = m.depth, g = m.prototype, f = m.filter, m = m.circular);
      var w = [], h = [], _ = typeof Buffer < "u";
      typeof m > "u" && (m = !0), typeof v > "u" && (v = 1 / 0);
      function y(S, b) {
        if (S === null)
          return null;
        if (b == 0)
          return S;
        var P, C;
        if (typeof S != "object")
          return S;
        if (s.__isArray(S))
          P = [];
        else if (s.__isRegExp(S))
          P = new RegExp(S.source, p(S)), S.lastIndex && (P.lastIndex = S.lastIndex);
        else if (s.__isDate(S))
          P = new Date(S.getTime());
        else {
          if (_ && Buffer.isBuffer(S))
            return Buffer.allocUnsafe ? P = Buffer.allocUnsafe(S.length) : P = new Buffer(S.length), S.copy(P), P;
          typeof g > "u" ? (C = Object.getPrototypeOf(S), P = Object.create(C)) : (P = Object.create(g), C = g);
        }
        if (m) {
          var k = w.indexOf(S);
          if (k != -1)
            return h[k];
          w.push(S), h.push(P);
        }
        for (var E in S) {
          var $;
          C && ($ = Object.getOwnPropertyDescriptor(C, E)), !($ && $.set == null) && (P[E] = y(S[E], b - 1));
        }
        return P;
      }
      return y(u, v);
    }
    s.clonePrototype = function(m) {
      if (m === null)
        return null;
      var v = function() {
      };
      return v.prototype = m, new v();
    };
    function a(u) {
      return Object.prototype.toString.call(u);
    }
    s.__objToStr = a;
    function c(u) {
      return typeof u == "object" && a(u) === "[object Date]";
    }
    s.__isDate = c;
    function d(u) {
      return typeof u == "object" && a(u) === "[object Array]";
    }
    s.__isArray = d;
    function l(u) {
      return typeof u == "object" && a(u) === "[object RegExp]";
    }
    s.__isRegExp = l;
    function p(u) {
      var m = "";
      return u.global && (m += "g"), u.ignoreCase && (m += "i"), u.multiline && (m += "m"), m;
    }
    return s.__getRegExpFlags = p, s;
  }();
  r.exports && (r.exports = i);
})(clone$2);
const clone_1 = cloneExports;
var conversionsExports = {}, conversions$2 = {
  get exports() {
    return conversionsExports;
  },
  set exports(r) {
    conversionsExports = r;
  }
}, colorName = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
}, cssKeywords = colorName, reverseKeywords = {};
for (var key in cssKeywords)
  cssKeywords.hasOwnProperty(key) && (reverseKeywords[cssKeywords[key]] = key);
var convert$4 = conversions$2.exports = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
for (var model in convert$4)
  if (convert$4.hasOwnProperty(model)) {
    if (!("channels" in convert$4[model]))
      throw new Error("missing channels property: " + model);
    if (!("labels" in convert$4[model]))
      throw new Error("missing channel labels property: " + model);
    if (convert$4[model].labels.length !== convert$4[model].channels)
      throw new Error("channel and label counts mismatch: " + model);
    var channels = convert$4[model].channels, labels = convert$4[model].labels;
    delete convert$4[model].channels, delete convert$4[model].labels, Object.defineProperty(convert$4[model], "channels", { value: channels }), Object.defineProperty(convert$4[model], "labels", { value: labels });
  }
convert$4.rgb.hsl = function(r) {
  var i = r[0] / 255, s = r[1] / 255, a = r[2] / 255, c = Math.min(i, s, a), d = Math.max(i, s, a), l = d - c, p, u, m;
  return d === c ? p = 0 : i === d ? p = (s - a) / l : s === d ? p = 2 + (a - i) / l : a === d && (p = 4 + (i - s) / l), p = Math.min(p * 60, 360), p < 0 && (p += 360), m = (c + d) / 2, d === c ? u = 0 : m <= 0.5 ? u = l / (d + c) : u = l / (2 - d - c), [p, u * 100, m * 100];
};
convert$4.rgb.hsv = function(r) {
  var i, s, a, c, d, l = r[0] / 255, p = r[1] / 255, u = r[2] / 255, m = Math.max(l, p, u), v = m - Math.min(l, p, u), g = function(f) {
    return (m - f) / 6 / v + 1 / 2;
  };
  return v === 0 ? c = d = 0 : (d = v / m, i = g(l), s = g(p), a = g(u), l === m ? c = a - s : p === m ? c = 1 / 3 + i - a : u === m && (c = 2 / 3 + s - i), c < 0 ? c += 1 : c > 1 && (c -= 1)), [
    c * 360,
    d * 100,
    m * 100
  ];
};
convert$4.rgb.hwb = function(r) {
  var i = r[0], s = r[1], a = r[2], c = convert$4.rgb.hsl(r)[0], d = 1 / 255 * Math.min(i, Math.min(s, a));
  return a = 1 - 1 / 255 * Math.max(i, Math.max(s, a)), [c, d * 100, a * 100];
};
convert$4.rgb.cmyk = function(r) {
  var i = r[0] / 255, s = r[1] / 255, a = r[2] / 255, c, d, l, p;
  return p = Math.min(1 - i, 1 - s, 1 - a), c = (1 - i - p) / (1 - p) || 0, d = (1 - s - p) / (1 - p) || 0, l = (1 - a - p) / (1 - p) || 0, [c * 100, d * 100, l * 100, p * 100];
};
function comparativeDistance(r, i) {
  return Math.pow(r[0] - i[0], 2) + Math.pow(r[1] - i[1], 2) + Math.pow(r[2] - i[2], 2);
}
convert$4.rgb.keyword = function(r) {
  var i = reverseKeywords[r];
  if (i)
    return i;
  var s = 1 / 0, a;
  for (var c in cssKeywords)
    if (cssKeywords.hasOwnProperty(c)) {
      var d = cssKeywords[c], l = comparativeDistance(r, d);
      l < s && (s = l, a = c);
    }
  return a;
};
convert$4.keyword.rgb = function(r) {
  return cssKeywords[r];
};
convert$4.rgb.xyz = function(r) {
  var i = r[0] / 255, s = r[1] / 255, a = r[2] / 255;
  i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92, s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92, a = a > 0.04045 ? Math.pow((a + 0.055) / 1.055, 2.4) : a / 12.92;
  var c = i * 0.4124 + s * 0.3576 + a * 0.1805, d = i * 0.2126 + s * 0.7152 + a * 0.0722, l = i * 0.0193 + s * 0.1192 + a * 0.9505;
  return [c * 100, d * 100, l * 100];
};
convert$4.rgb.lab = function(r) {
  var i = convert$4.rgb.xyz(r), s = i[0], a = i[1], c = i[2], d, l, p;
  return s /= 95.047, a /= 100, c /= 108.883, s = s > 8856e-6 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, a = a > 8856e-6 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, c = c > 8856e-6 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116, d = 116 * a - 16, l = 500 * (s - a), p = 200 * (a - c), [d, l, p];
};
convert$4.hsl.rgb = function(r) {
  var i = r[0] / 360, s = r[1] / 100, a = r[2] / 100, c, d, l, p, u;
  if (s === 0)
    return u = a * 255, [u, u, u];
  a < 0.5 ? d = a * (1 + s) : d = a + s - a * s, c = 2 * a - d, p = [0, 0, 0];
  for (var m = 0; m < 3; m++)
    l = i + 1 / 3 * -(m - 1), l < 0 && l++, l > 1 && l--, 6 * l < 1 ? u = c + (d - c) * 6 * l : 2 * l < 1 ? u = d : 3 * l < 2 ? u = c + (d - c) * (2 / 3 - l) * 6 : u = c, p[m] = u * 255;
  return p;
};
convert$4.hsl.hsv = function(r) {
  var i = r[0], s = r[1] / 100, a = r[2] / 100, c = s, d = Math.max(a, 0.01), l, p;
  return a *= 2, s *= a <= 1 ? a : 2 - a, c *= d <= 1 ? d : 2 - d, p = (a + s) / 2, l = a === 0 ? 2 * c / (d + c) : 2 * s / (a + s), [i, l * 100, p * 100];
};
convert$4.hsv.rgb = function(r) {
  var i = r[0] / 60, s = r[1] / 100, a = r[2] / 100, c = Math.floor(i) % 6, d = i - Math.floor(i), l = 255 * a * (1 - s), p = 255 * a * (1 - s * d), u = 255 * a * (1 - s * (1 - d));
  switch (a *= 255, c) {
    case 0:
      return [a, u, l];
    case 1:
      return [p, a, l];
    case 2:
      return [l, a, u];
    case 3:
      return [l, p, a];
    case 4:
      return [u, l, a];
    case 5:
      return [a, l, p];
  }
};
convert$4.hsv.hsl = function(r) {
  var i = r[0], s = r[1] / 100, a = r[2] / 100, c = Math.max(a, 0.01), d, l, p;
  return p = (2 - s) * a, d = (2 - s) * c, l = s * c, l /= d <= 1 ? d : 2 - d, l = l || 0, p /= 2, [i, l * 100, p * 100];
};
convert$4.hwb.rgb = function(r) {
  var i = r[0] / 360, s = r[1] / 100, a = r[2] / 100, c = s + a, d, l, p, u;
  c > 1 && (s /= c, a /= c), d = Math.floor(6 * i), l = 1 - a, p = 6 * i - d, d & 1 && (p = 1 - p), u = s + p * (l - s);
  var m, v, g;
  switch (d) {
    default:
    case 6:
    case 0:
      m = l, v = u, g = s;
      break;
    case 1:
      m = u, v = l, g = s;
      break;
    case 2:
      m = s, v = l, g = u;
      break;
    case 3:
      m = s, v = u, g = l;
      break;
    case 4:
      m = u, v = s, g = l;
      break;
    case 5:
      m = l, v = s, g = u;
      break;
  }
  return [m * 255, v * 255, g * 255];
};
convert$4.cmyk.rgb = function(r) {
  var i = r[0] / 100, s = r[1] / 100, a = r[2] / 100, c = r[3] / 100, d, l, p;
  return d = 1 - Math.min(1, i * (1 - c) + c), l = 1 - Math.min(1, s * (1 - c) + c), p = 1 - Math.min(1, a * (1 - c) + c), [d * 255, l * 255, p * 255];
};
convert$4.xyz.rgb = function(r) {
  var i = r[0] / 100, s = r[1] / 100, a = r[2] / 100, c, d, l;
  return c = i * 3.2406 + s * -1.5372 + a * -0.4986, d = i * -0.9689 + s * 1.8758 + a * 0.0415, l = i * 0.0557 + s * -0.204 + a * 1.057, c = c > 31308e-7 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : c * 12.92, d = d > 31308e-7 ? 1.055 * Math.pow(d, 1 / 2.4) - 0.055 : d * 12.92, l = l > 31308e-7 ? 1.055 * Math.pow(l, 1 / 2.4) - 0.055 : l * 12.92, c = Math.min(Math.max(0, c), 1), d = Math.min(Math.max(0, d), 1), l = Math.min(Math.max(0, l), 1), [c * 255, d * 255, l * 255];
};
convert$4.xyz.lab = function(r) {
  var i = r[0], s = r[1], a = r[2], c, d, l;
  return i /= 95.047, s /= 100, a /= 108.883, i = i > 8856e-6 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, s = s > 8856e-6 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, a = a > 8856e-6 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, c = 116 * s - 16, d = 500 * (i - s), l = 200 * (s - a), [c, d, l];
};
convert$4.lab.xyz = function(r) {
  var i = r[0], s = r[1], a = r[2], c, d, l;
  d = (i + 16) / 116, c = s / 500 + d, l = d - a / 200;
  var p = Math.pow(d, 3), u = Math.pow(c, 3), m = Math.pow(l, 3);
  return d = p > 8856e-6 ? p : (d - 16 / 116) / 7.787, c = u > 8856e-6 ? u : (c - 16 / 116) / 7.787, l = m > 8856e-6 ? m : (l - 16 / 116) / 7.787, c *= 95.047, d *= 100, l *= 108.883, [c, d, l];
};
convert$4.lab.lch = function(r) {
  var i = r[0], s = r[1], a = r[2], c, d, l;
  return c = Math.atan2(a, s), d = c * 360 / 2 / Math.PI, d < 0 && (d += 360), l = Math.sqrt(s * s + a * a), [i, l, d];
};
convert$4.lch.lab = function(r) {
  var i = r[0], s = r[1], a = r[2], c, d, l;
  return l = a / 360 * 2 * Math.PI, c = s * Math.cos(l), d = s * Math.sin(l), [i, c, d];
};
convert$4.rgb.ansi16 = function(r) {
  var i = r[0], s = r[1], a = r[2], c = 1 in arguments ? arguments[1] : convert$4.rgb.hsv(r)[2];
  if (c = Math.round(c / 50), c === 0)
    return 30;
  var d = 30 + (Math.round(a / 255) << 2 | Math.round(s / 255) << 1 | Math.round(i / 255));
  return c === 2 && (d += 60), d;
};
convert$4.hsv.ansi16 = function(r) {
  return convert$4.rgb.ansi16(convert$4.hsv.rgb(r), r[2]);
};
convert$4.rgb.ansi256 = function(r) {
  var i = r[0], s = r[1], a = r[2];
  if (i === s && s === a)
    return i < 8 ? 16 : i > 248 ? 231 : Math.round((i - 8) / 247 * 24) + 232;
  var c = 16 + 36 * Math.round(i / 255 * 5) + 6 * Math.round(s / 255 * 5) + Math.round(a / 255 * 5);
  return c;
};
convert$4.ansi16.rgb = function(r) {
  var i = r % 10;
  if (i === 0 || i === 7)
    return r > 50 && (i += 3.5), i = i / 10.5 * 255, [i, i, i];
  var s = (~~(r > 50) + 1) * 0.5, a = (i & 1) * s * 255, c = (i >> 1 & 1) * s * 255, d = (i >> 2 & 1) * s * 255;
  return [a, c, d];
};
convert$4.ansi256.rgb = function(r) {
  if (r >= 232) {
    var i = (r - 232) * 10 + 8;
    return [i, i, i];
  }
  r -= 16;
  var s, a = Math.floor(r / 36) / 5 * 255, c = Math.floor((s = r % 36) / 6) / 5 * 255, d = s % 6 / 5 * 255;
  return [a, c, d];
};
convert$4.rgb.hex = function(r) {
  var i = ((Math.round(r[0]) & 255) << 16) + ((Math.round(r[1]) & 255) << 8) + (Math.round(r[2]) & 255), s = i.toString(16).toUpperCase();
  return "000000".substring(s.length) + s;
};
convert$4.hex.rgb = function(r) {
  var i = r.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!i)
    return [0, 0, 0];
  var s = i[0];
  i[0].length === 3 && (s = s.split("").map(function(p) {
    return p + p;
  }).join(""));
  var a = parseInt(s, 16), c = a >> 16 & 255, d = a >> 8 & 255, l = a & 255;
  return [c, d, l];
};
convert$4.rgb.hcg = function(r) {
  var i = r[0] / 255, s = r[1] / 255, a = r[2] / 255, c = Math.max(Math.max(i, s), a), d = Math.min(Math.min(i, s), a), l = c - d, p, u;
  return l < 1 ? p = d / (1 - l) : p = 0, l <= 0 ? u = 0 : c === i ? u = (s - a) / l % 6 : c === s ? u = 2 + (a - i) / l : u = 4 + (i - s) / l + 4, u /= 6, u %= 1, [u * 360, l * 100, p * 100];
};
convert$4.hsl.hcg = function(r) {
  var i = r[1] / 100, s = r[2] / 100, a = 1, c = 0;
  return s < 0.5 ? a = 2 * i * s : a = 2 * i * (1 - s), a < 1 && (c = (s - 0.5 * a) / (1 - a)), [r[0], a * 100, c * 100];
};
convert$4.hsv.hcg = function(r) {
  var i = r[1] / 100, s = r[2] / 100, a = i * s, c = 0;
  return a < 1 && (c = (s - a) / (1 - a)), [r[0], a * 100, c * 100];
};
convert$4.hcg.rgb = function(r) {
  var i = r[0] / 360, s = r[1] / 100, a = r[2] / 100;
  if (s === 0)
    return [a * 255, a * 255, a * 255];
  var c = [0, 0, 0], d = i % 1 * 6, l = d % 1, p = 1 - l, u = 0;
  switch (Math.floor(d)) {
    case 0:
      c[0] = 1, c[1] = l, c[2] = 0;
      break;
    case 1:
      c[0] = p, c[1] = 1, c[2] = 0;
      break;
    case 2:
      c[0] = 0, c[1] = 1, c[2] = l;
      break;
    case 3:
      c[0] = 0, c[1] = p, c[2] = 1;
      break;
    case 4:
      c[0] = l, c[1] = 0, c[2] = 1;
      break;
    default:
      c[0] = 1, c[1] = 0, c[2] = p;
  }
  return u = (1 - s) * a, [
    (s * c[0] + u) * 255,
    (s * c[1] + u) * 255,
    (s * c[2] + u) * 255
  ];
};
convert$4.hcg.hsv = function(r) {
  var i = r[1] / 100, s = r[2] / 100, a = i + s * (1 - i), c = 0;
  return a > 0 && (c = i / a), [r[0], c * 100, a * 100];
};
convert$4.hcg.hsl = function(r) {
  var i = r[1] / 100, s = r[2] / 100, a = s * (1 - i) + 0.5 * i, c = 0;
  return a > 0 && a < 0.5 ? c = i / (2 * a) : a >= 0.5 && a < 1 && (c = i / (2 * (1 - a))), [r[0], c * 100, a * 100];
};
convert$4.hcg.hwb = function(r) {
  var i = r[1] / 100, s = r[2] / 100, a = i + s * (1 - i);
  return [r[0], (a - i) * 100, (1 - a) * 100];
};
convert$4.hwb.hcg = function(r) {
  var i = r[1] / 100, s = r[2] / 100, a = 1 - s, c = a - i, d = 0;
  return c < 1 && (d = (a - c) / (1 - c)), [r[0], c * 100, d * 100];
};
convert$4.apple.rgb = function(r) {
  return [r[0] / 65535 * 255, r[1] / 65535 * 255, r[2] / 65535 * 255];
};
convert$4.rgb.apple = function(r) {
  return [r[0] / 255 * 65535, r[1] / 255 * 65535, r[2] / 255 * 65535];
};
convert$4.gray.rgb = function(r) {
  return [r[0] / 100 * 255, r[0] / 100 * 255, r[0] / 100 * 255];
};
convert$4.gray.hsl = convert$4.gray.hsv = function(r) {
  return [0, 0, r[0]];
};
convert$4.gray.hwb = function(r) {
  return [0, 100, r[0]];
};
convert$4.gray.cmyk = function(r) {
  return [0, 0, 0, r[0]];
};
convert$4.gray.lab = function(r) {
  return [r[0], 0, 0];
};
convert$4.gray.hex = function(r) {
  var i = Math.round(r[0] / 100 * 255) & 255, s = (i << 16) + (i << 8) + i, a = s.toString(16).toUpperCase();
  return "000000".substring(a.length) + a;
};
convert$4.rgb.gray = function(r) {
  var i = (r[0] + r[1] + r[2]) / 3;
  return [i / 255 * 100];
};
var conversions$1 = conversionsExports;
function buildGraph() {
  for (var r = {}, i = Object.keys(conversions$1), s = i.length, a = 0; a < s; a++)
    r[i[a]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return r;
}
function deriveBFS(r) {
  var i = buildGraph(), s = [r];
  for (i[r].distance = 0; s.length; )
    for (var a = s.pop(), c = Object.keys(conversions$1[a]), d = c.length, l = 0; l < d; l++) {
      var p = c[l], u = i[p];
      u.distance === -1 && (u.distance = i[a].distance + 1, u.parent = a, s.unshift(p));
    }
  return i;
}
function link(r, i) {
  return function(s) {
    return i(r(s));
  };
}
function wrapConversion(r, i) {
  for (var s = [i[r].parent, r], a = conversions$1[i[r].parent][r], c = i[r].parent; i[c].parent; )
    s.unshift(i[c].parent), a = link(conversions$1[i[c].parent][c], a), c = i[c].parent;
  return a.conversion = s, a;
}
var route$1 = function(r) {
  for (var i = deriveBFS(r), s = {}, a = Object.keys(i), c = a.length, d = 0; d < c; d++) {
    var l = a[d], p = i[l];
    p.parent !== null && (s[l] = wrapConversion(l, i));
  }
  return s;
}, conversions = conversionsExports, route = route$1, convert$3 = {}, models = Object.keys(conversions);
function wrapRaw(r) {
  var i = function(s) {
    return s == null ? s : (arguments.length > 1 && (s = Array.prototype.slice.call(arguments)), r(s));
  };
  return "conversion" in r && (i.conversion = r.conversion), i;
}
function wrapRounded(r) {
  var i = function(s) {
    if (s == null)
      return s;
    arguments.length > 1 && (s = Array.prototype.slice.call(arguments));
    var a = r(s);
    if (typeof a == "object")
      for (var c = a.length, d = 0; d < c; d++)
        a[d] = Math.round(a[d]);
    return a;
  };
  return "conversion" in r && (i.conversion = r.conversion), i;
}
models.forEach(function(r) {
  convert$3[r] = {}, Object.defineProperty(convert$3[r], "channels", { value: conversions[r].channels }), Object.defineProperty(convert$3[r], "labels", { value: conversions[r].labels });
  var i = route(r), s = Object.keys(i);
  s.forEach(function(a) {
    var c = i[a];
    convert$3[r][a] = wrapRounded(c), convert$3[r][a].raw = wrapRaw(c);
  });
});
var colorConvert = convert$3, colorNames = colorName, colorString = {
  getRgba,
  getHsla,
  getRgb,
  getHsl,
  getHwb,
  getAlpha,
  hexString,
  rgbString,
  rgbaString,
  percentString,
  percentaString,
  hslString,
  hslaString,
  hwbString,
  keyword
};
function getRgba(r) {
  if (r) {
    var i = /^#([a-fA-F0-9]{3})$/, s = /^#([a-fA-F0-9]{6})$/, a = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, c = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, d = /(\D+)/, l = [0, 0, 0], p = 1, u = r.match(i);
    if (u) {
      u = u[1];
      for (var m = 0; m < l.length; m++)
        l[m] = parseInt(u[m] + u[m], 16);
    } else if (u = r.match(s)) {
      u = u[1];
      for (var m = 0; m < l.length; m++)
        l[m] = parseInt(u.slice(m * 2, m * 2 + 2), 16);
    } else if (u = r.match(a)) {
      for (var m = 0; m < l.length; m++)
        l[m] = parseInt(u[m + 1]);
      p = parseFloat(u[4]);
    } else if (u = r.match(c)) {
      for (var m = 0; m < l.length; m++)
        l[m] = Math.round(parseFloat(u[m + 1]) * 2.55);
      p = parseFloat(u[4]);
    } else if (u = r.match(d)) {
      if (u[1] == "transparent")
        return [0, 0, 0, 0];
      if (l = colorNames[u[1]], !l)
        return;
    }
    for (var m = 0; m < l.length; m++)
      l[m] = scale(l[m], 0, 255);
    return !p && p != 0 ? p = 1 : p = scale(p, 0, 1), l[3] = p, l;
  }
}
function getHsla(r) {
  if (r) {
    var i = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/, s = r.match(i);
    if (s) {
      var a = parseFloat(s[4]), c = scale(parseInt(s[1]), 0, 360), d = scale(parseFloat(s[2]), 0, 100), l = scale(parseFloat(s[3]), 0, 100), p = scale(isNaN(a) ? 1 : a, 0, 1);
      return [c, d, l, p];
    }
  }
}
function getHwb(r) {
  if (r) {
    var i = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/, s = r.match(i);
    if (s) {
      var a = parseFloat(s[4]), c = scale(parseInt(s[1]), 0, 360), d = scale(parseFloat(s[2]), 0, 100), l = scale(parseFloat(s[3]), 0, 100), p = scale(isNaN(a) ? 1 : a, 0, 1);
      return [c, d, l, p];
    }
  }
}
function getRgb(r) {
  var i = getRgba(r);
  return i && i.slice(0, 3);
}
function getHsl(r) {
  var i = getHsla(r);
  return i && i.slice(0, 3);
}
function getAlpha(r) {
  var i = getRgba(r);
  if (i)
    return i[3];
  if (i = getHsla(r))
    return i[3];
  if (i = getHwb(r))
    return i[3];
}
function hexString(r) {
  return "#" + hexDouble(r[0]) + hexDouble(r[1]) + hexDouble(r[2]);
}
function rgbString(r, i) {
  return i < 1 || r[3] && r[3] < 1 ? rgbaString(r, i) : "rgb(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
}
function rgbaString(r, i) {
  return i === void 0 && (i = r[3] !== void 0 ? r[3] : 1), "rgba(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + i + ")";
}
function percentString(r, i) {
  if (i < 1 || r[3] && r[3] < 1)
    return percentaString(r, i);
  var s = Math.round(r[0] / 255 * 100), a = Math.round(r[1] / 255 * 100), c = Math.round(r[2] / 255 * 100);
  return "rgb(" + s + "%, " + a + "%, " + c + "%)";
}
function percentaString(r, i) {
  var s = Math.round(r[0] / 255 * 100), a = Math.round(r[1] / 255 * 100), c = Math.round(r[2] / 255 * 100);
  return "rgba(" + s + "%, " + a + "%, " + c + "%, " + (i || r[3] || 1) + ")";
}
function hslString(r, i) {
  return i < 1 || r[3] && r[3] < 1 ? hslaString(r, i) : "hsl(" + r[0] + ", " + r[1] + "%, " + r[2] + "%)";
}
function hslaString(r, i) {
  return i === void 0 && (i = r[3] !== void 0 ? r[3] : 1), "hsla(" + r[0] + ", " + r[1] + "%, " + r[2] + "%, " + i + ")";
}
function hwbString(r, i) {
  return i === void 0 && (i = r[3] !== void 0 ? r[3] : 1), "hwb(" + r[0] + ", " + r[1] + "%, " + r[2] + "%" + (i !== void 0 && i !== 1 ? ", " + i : "") + ")";
}
function keyword(r) {
  return reverseNames[r.slice(0, 3)];
}
function scale(r, i, s) {
  return Math.min(Math.max(i, r), s);
}
function hexDouble(r) {
  var i = r.toString(16).toUpperCase();
  return i.length < 2 ? "0" + i : i;
}
var reverseNames = {};
for (var name in colorNames)
  reverseNames[colorNames[name]] = name;
var clone$1 = cloneExports, convert$2 = colorConvert, string = colorString, Color$1 = function(r) {
  if (r instanceof Color$1)
    return r;
  if (!(this instanceof Color$1))
    return new Color$1(r);
  this.values = {
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
    hsv: [0, 0, 0],
    hwb: [0, 0, 0],
    cmyk: [0, 0, 0, 0],
    alpha: 1
  };
  var i;
  if (typeof r == "string")
    if (i = string.getRgba(r), i)
      this.setValues("rgb", i);
    else if (i = string.getHsla(r))
      this.setValues("hsl", i);
    else if (i = string.getHwb(r))
      this.setValues("hwb", i);
    else
      throw new Error('Unable to parse color from string "' + r + '"');
  else if (typeof r == "object")
    if (i = r, i.r !== void 0 || i.red !== void 0)
      this.setValues("rgb", i);
    else if (i.l !== void 0 || i.lightness !== void 0)
      this.setValues("hsl", i);
    else if (i.v !== void 0 || i.value !== void 0)
      this.setValues("hsv", i);
    else if (i.w !== void 0 || i.whiteness !== void 0)
      this.setValues("hwb", i);
    else if (i.c !== void 0 || i.cyan !== void 0)
      this.setValues("cmyk", i);
    else
      throw new Error("Unable to parse color from object " + JSON.stringify(r));
};
Color$1.prototype = {
  rgb: function() {
    return this.setSpace("rgb", arguments);
  },
  hsl: function() {
    return this.setSpace("hsl", arguments);
  },
  hsv: function() {
    return this.setSpace("hsv", arguments);
  },
  hwb: function() {
    return this.setSpace("hwb", arguments);
  },
  cmyk: function() {
    return this.setSpace("cmyk", arguments);
  },
  rgbArray: function() {
    return this.values.rgb;
  },
  hslArray: function() {
    return this.values.hsl;
  },
  hsvArray: function() {
    return this.values.hsv;
  },
  hwbArray: function() {
    return this.values.alpha !== 1 ? this.values.hwb.concat([this.values.alpha]) : this.values.hwb;
  },
  cmykArray: function() {
    return this.values.cmyk;
  },
  rgbaArray: function() {
    var r = this.values.rgb;
    return r.concat([this.values.alpha]);
  },
  rgbaArrayNormalized: function() {
    for (var r = this.values.rgb, i = [], s = 0; s < 3; s++)
      i[s] = r[s] / 255;
    return i.push(this.values.alpha), i;
  },
  hslaArray: function() {
    var r = this.values.hsl;
    return r.concat([this.values.alpha]);
  },
  alpha: function(r) {
    return r === void 0 ? this.values.alpha : (this.setValues("alpha", r), this);
  },
  red: function(r) {
    return this.setChannel("rgb", 0, r);
  },
  green: function(r) {
    return this.setChannel("rgb", 1, r);
  },
  blue: function(r) {
    return this.setChannel("rgb", 2, r);
  },
  hue: function(r) {
    return r && (r %= 360, r = r < 0 ? 360 + r : r), this.setChannel("hsl", 0, r);
  },
  saturation: function(r) {
    return this.setChannel("hsl", 1, r);
  },
  lightness: function(r) {
    return this.setChannel("hsl", 2, r);
  },
  saturationv: function(r) {
    return this.setChannel("hsv", 1, r);
  },
  whiteness: function(r) {
    return this.setChannel("hwb", 1, r);
  },
  blackness: function(r) {
    return this.setChannel("hwb", 2, r);
  },
  value: function(r) {
    return this.setChannel("hsv", 2, r);
  },
  cyan: function(r) {
    return this.setChannel("cmyk", 0, r);
  },
  magenta: function(r) {
    return this.setChannel("cmyk", 1, r);
  },
  yellow: function(r) {
    return this.setChannel("cmyk", 2, r);
  },
  black: function(r) {
    return this.setChannel("cmyk", 3, r);
  },
  hexString: function() {
    return string.hexString(this.values.rgb);
  },
  rgbString: function() {
    return string.rgbString(this.values.rgb, this.values.alpha);
  },
  rgbaString: function() {
    return string.rgbaString(this.values.rgb, this.values.alpha);
  },
  percentString: function() {
    return string.percentString(this.values.rgb, this.values.alpha);
  },
  hslString: function() {
    return string.hslString(this.values.hsl, this.values.alpha);
  },
  hslaString: function() {
    return string.hslaString(this.values.hsl, this.values.alpha);
  },
  hwbString: function() {
    return string.hwbString(this.values.hwb, this.values.alpha);
  },
  keyword: function() {
    return string.keyword(this.values.rgb, this.values.alpha);
  },
  rgbNumber: function() {
    return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2];
  },
  luminosity: function() {
    for (var r = this.values.rgb, i = [], s = 0; s < r.length; s++) {
      var a = r[s] / 255;
      i[s] = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * i[0] + 0.7152 * i[1] + 0.0722 * i[2];
  },
  contrast: function(r) {
    var i = this.luminosity(), s = r.luminosity();
    return i > s ? (i + 0.05) / (s + 0.05) : (s + 0.05) / (i + 0.05);
  },
  level: function(r) {
    var i = this.contrast(r);
    return i >= 7.1 ? "AAA" : i >= 4.5 ? "AA" : "";
  },
  dark: function() {
    var r = this.values.rgb, i = (r[0] * 299 + r[1] * 587 + r[2] * 114) / 1e3;
    return i < 128;
  },
  light: function() {
    return !this.dark();
  },
  negate: function() {
    for (var r = [], i = 0; i < 3; i++)
      r[i] = 255 - this.values.rgb[i];
    return this.setValues("rgb", r), this;
  },
  lighten: function(r) {
    return this.values.hsl[2] += this.values.hsl[2] * r, this.setValues("hsl", this.values.hsl), this;
  },
  darken: function(r) {
    return this.values.hsl[2] -= this.values.hsl[2] * r, this.setValues("hsl", this.values.hsl), this;
  },
  saturate: function(r) {
    return this.values.hsl[1] += this.values.hsl[1] * r, this.setValues("hsl", this.values.hsl), this;
  },
  desaturate: function(r) {
    return this.values.hsl[1] -= this.values.hsl[1] * r, this.setValues("hsl", this.values.hsl), this;
  },
  whiten: function(r) {
    return this.values.hwb[1] += this.values.hwb[1] * r, this.setValues("hwb", this.values.hwb), this;
  },
  blacken: function(r) {
    return this.values.hwb[2] += this.values.hwb[2] * r, this.setValues("hwb", this.values.hwb), this;
  },
  greyscale: function() {
    var r = this.values.rgb, i = r[0] * 0.3 + r[1] * 0.59 + r[2] * 0.11;
    return this.setValues("rgb", [i, i, i]), this;
  },
  clearer: function(r) {
    return this.setValues("alpha", this.values.alpha - this.values.alpha * r), this;
  },
  opaquer: function(r) {
    return this.setValues("alpha", this.values.alpha + this.values.alpha * r), this;
  },
  rotate: function(r) {
    var i = this.values.hsl[0];
    return i = (i + r) % 360, i = i < 0 ? 360 + i : i, this.values.hsl[0] = i, this.setValues("hsl", this.values.hsl), this;
  },
  /**
   * Ported from sass implementation in C
   * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
   */
  mix: function(r, i) {
    var s = this, a = r, c = i === void 0 ? 0.5 : i, d = 2 * c - 1, l = s.alpha() - a.alpha(), p = ((d * l === -1 ? d : (d + l) / (1 + d * l)) + 1) / 2, u = 1 - p;
    return this.rgb(
      p * s.red() + u * a.red(),
      p * s.green() + u * a.green(),
      p * s.blue() + u * a.blue()
    ).alpha(s.alpha() * c + a.alpha() * (1 - c));
  },
  toJSON: function() {
    return this.rgb();
  },
  clone: function() {
    var r = new Color$1();
    return r.values = clone$1(this.values), r;
  }
};
Color$1.prototype.getValues = function(r) {
  for (var i = {}, s = 0; s < r.length; s++)
    i[r.charAt(s)] = this.values[r][s];
  return this.values.alpha !== 1 && (i.a = this.values.alpha), i;
};
Color$1.prototype.setValues = function(r, i) {
  var s = {
    rgb: ["red", "green", "blue"],
    hsl: ["hue", "saturation", "lightness"],
    hsv: ["hue", "saturation", "value"],
    hwb: ["hue", "whiteness", "blackness"],
    cmyk: ["cyan", "magenta", "yellow", "black"]
  }, a = {
    rgb: [255, 255, 255],
    hsl: [360, 100, 100],
    hsv: [360, 100, 100],
    hwb: [360, 100, 100],
    cmyk: [100, 100, 100, 100]
  }, c, d = 1;
  if (r === "alpha")
    d = i;
  else if (i.length)
    this.values[r] = i.slice(0, r.length), d = i[r.length];
  else if (i[r.charAt(0)] !== void 0) {
    for (c = 0; c < r.length; c++)
      this.values[r][c] = i[r.charAt(c)];
    d = i.a;
  } else if (i[s[r][0]] !== void 0) {
    var l = s[r];
    for (c = 0; c < r.length; c++)
      this.values[r][c] = i[l[c]];
    d = i.alpha;
  }
  if (this.values.alpha = Math.max(0, Math.min(1, d === void 0 ? this.values.alpha : d)), r === "alpha")
    return !1;
  var p;
  for (c = 0; c < r.length; c++)
    p = Math.max(0, Math.min(a[r][c], this.values[r][c])), this.values[r][c] = Math.round(p);
  for (var u in s)
    for (u !== r && (this.values[u] = convert$2[r][u](this.values[r])), c = 0; c < u.length; c++)
      p = Math.max(0, Math.min(a[u][c], this.values[u][c])), this.values[u][c] = Math.round(p);
  return !0;
};
Color$1.prototype.setSpace = function(r, i) {
  var s = i[0];
  return s === void 0 ? this.getValues(r) : (typeof s == "number" && (s = Array.prototype.slice.call(i)), this.setValues(r, s), this);
};
Color$1.prototype.setChannel = function(r, i, s) {
  return s === void 0 ? this.values[r][i] : s === this.values[r][i] ? this : (this.values[r][i] = s, this.setValues(r, this.values[r]), this);
};
var color = Color$1, browserExports = {}, browser$1 = {
  get exports() {
    return browserExports;
  },
  set exports(r) {
    browserExports = r;
  }
}, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var r = 1e3, i = r * 60, s = i * 60, a = s * 24, c = a * 7, d = a * 365.25;
  ms = function(v, g) {
    g = g || {};
    var f = typeof v;
    if (f === "string" && v.length > 0)
      return l(v);
    if (f === "number" && isFinite(v))
      return g.long ? u(v) : p(v);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(v)
    );
  };
  function l(v) {
    if (v = String(v), !(v.length > 100)) {
      var g = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        v
      );
      if (g) {
        var f = parseFloat(g[1]), w = (g[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * d;
          case "weeks":
          case "week":
          case "w":
            return f * c;
          case "days":
          case "day":
          case "d":
            return f * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * s;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * i;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * r;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
          default:
            return;
        }
      }
    }
  }
  function p(v) {
    var g = Math.abs(v);
    return g >= a ? Math.round(v / a) + "d" : g >= s ? Math.round(v / s) + "h" : g >= i ? Math.round(v / i) + "m" : g >= r ? Math.round(v / r) + "s" : v + "ms";
  }
  function u(v) {
    var g = Math.abs(v);
    return g >= a ? m(v, g, a, "day") : g >= s ? m(v, g, s, "hour") : g >= i ? m(v, g, i, "minute") : g >= r ? m(v, g, r, "second") : v + " ms";
  }
  function m(v, g, f, w) {
    var h = g >= f * 1.5;
    return Math.round(v / f) + " " + w + (h ? "s" : "");
  }
  return ms;
}
function setup(r) {
  s.debug = s, s.default = s, s.coerce = u, s.disable = l, s.enable = d, s.enabled = p, s.humanize = requireMs(), Object.keys(r).forEach(function(m) {
    s[m] = r[m];
  }), s.instances = [], s.names = [], s.skips = [], s.formatters = {};
  function i(m) {
    for (var v = 0, g = 0; g < m.length; g++)
      v = (v << 5) - v + m.charCodeAt(g), v |= 0;
    return s.colors[Math.abs(v) % s.colors.length];
  }
  s.selectColor = i;
  function s(m) {
    var v;
    function g() {
      if (g.enabled) {
        for (var f = arguments.length, w = new Array(f), h = 0; h < f; h++)
          w[h] = arguments[h];
        var _ = g, y = Number(new Date()), S = y - (v || y);
        _.diff = S, _.prev = v, _.curr = y, v = y, w[0] = s.coerce(w[0]), typeof w[0] != "string" && w.unshift("%O");
        var b = 0;
        w[0] = w[0].replace(/%([a-zA-Z%])/g, function(C, k) {
          if (C === "%%")
            return C;
          b++;
          var E = s.formatters[k];
          if (typeof E == "function") {
            var $ = w[b];
            C = E.call(_, $), w.splice(b, 1), b--;
          }
          return C;
        }), s.formatArgs.call(_, w);
        var P = _.log || s.log;
        P.apply(_, w);
      }
    }
    return g.namespace = m, g.enabled = s.enabled(m), g.useColors = s.useColors(), g.color = i(m), g.destroy = a, g.extend = c, typeof s.init == "function" && s.init(g), s.instances.push(g), g;
  }
  function a() {
    var m = s.instances.indexOf(this);
    return m !== -1 ? (s.instances.splice(m, 1), !0) : !1;
  }
  function c(m, v) {
    return s(this.namespace + (typeof v > "u" ? ":" : v) + m);
  }
  function d(m) {
    s.save(m), s.names = [], s.skips = [];
    var v, g = (typeof m == "string" ? m : "").split(/[\s,]+/), f = g.length;
    for (v = 0; v < f; v++)
      g[v] && (m = g[v].replace(/\*/g, ".*?"), m[0] === "-" ? s.skips.push(new RegExp("^" + m.substr(1) + "$")) : s.names.push(new RegExp("^" + m + "$")));
    for (v = 0; v < s.instances.length; v++) {
      var w = s.instances[v];
      w.enabled = s.enabled(w.namespace);
    }
  }
  function l() {
    s.enable("");
  }
  function p(m) {
    if (m[m.length - 1] === "*")
      return !0;
    var v, g;
    for (v = 0, g = s.skips.length; v < g; v++)
      if (s.skips[v].test(m))
        return !1;
    for (v = 0, g = s.names.length; v < g; v++)
      if (s.names[v].test(m))
        return !0;
    return !1;
  }
  function u(m) {
    return m instanceof Error ? m.stack || m.message : m;
  }
  return s.enable(s.load()), s;
}
var common$d = setup;
(function(r, i) {
  "use strict";
  function s(v) {
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? s = function(f) {
      return typeof f;
    } : s = function(f) {
      return f && typeof Symbol == "function" && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f;
    }, s(v);
  }
  i.log = d, i.formatArgs = c, i.save = l, i.load = p, i.useColors = a, i.storage = u(), i.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function a() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function c(v) {
    if (v[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + v[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !!this.useColors) {
      var g = "color: " + this.color;
      v.splice(1, 0, g, "color: inherit");
      var f = 0, w = 0;
      v[0].replace(/%[a-zA-Z%]/g, function(h) {
        h !== "%%" && (f++, h === "%c" && (w = f));
      }), v.splice(w, 0, g);
    }
  }
  function d() {
    var v;
    return (typeof console > "u" ? "undefined" : s(console)) === "object" && console.log && (v = console).log.apply(v, arguments);
  }
  function l(v) {
    try {
      v ? i.storage.setItem("debug", v) : i.storage.removeItem("debug");
    } catch {
    }
  }
  function p() {
    var v;
    try {
      v = i.storage.getItem("debug");
    } catch {
    }
    return !v && typeof process < "u" && "env" in process && (v = process.env.DEBUG), v;
  }
  function u() {
    try {
      return localStorage;
    } catch {
    }
  }
  r.exports = common$d(i);
  var m = r.exports.formatters;
  m.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (g) {
      return "[UnexpectedJSONParseError]: " + g.message;
    }
  };
})(browser$1, browserExports);
const browser = browserExports;
var balanced$1 = balancedMatch, debug = browserExports("css-color-function:parse"), parse_1$1 = parse$2;
function parse$2(r) {
  typeof r != "string" && (r = r.toString()), debug("string %s", r);
  function i(v) {
    var g = v.exec(r);
    if (g)
      return r = r.slice(g[0].length), g.slice(1);
  }
  function s() {
    i(/^\s+/);
  }
  function a() {
    var v = i(/^\)/);
    if (v)
      return debug("rparen"), v;
  }
  function c() {
    var v = i(/^([\+\-\*])/);
    if (v) {
      var g = {};
      return g.type = "modifier", g.value = v[0], debug("modifier %o", g), g;
    }
  }
  function d() {
    var v = i(/^([^\)\s]+)/);
    if (v) {
      var g = {};
      return g.type = "number", g.value = v[0], debug("number %o", g), g;
    }
  }
  function l() {
    for (var v = [], g; g = c() || m() || d(); )
      v.push(g), s();
    return debug("args %o", v), v;
  }
  function p() {
    var v = i(/^(\w+)\(/);
    if (v) {
      s();
      var g, f = {};
      return f.type = "function", f.name = v[0], f.arguments = l(), a(), debug("adjuster %o", f), f;
    }
  }
  function u() {
    var v = {};
    v.type = "color";
    var g = i(/([^\)\s]+)/)[0];
    if (g.indexOf("(") != -1) {
      var f = i(/([^\)]*?\))/)[0];
      g = g + f;
    }
    return v.value = g, s(), v;
  }
  function m() {
    if (r.match(/^color\(/)) {
      var v = balanced$1("(", ")", r);
      if (!v)
        throw new SyntaxError("Missing closing parenthese for '" + r + "'");
      if (v.body === "")
        throw new SyntaxError("color() function cannot be empty");
      r = v.body, s();
      var g = {};
      g.type = "function", g.name = "color", g.arguments = [m() || u()], debug("function arguments %o", g.arguments);
      for (var f; f = p(); )
        g.arguments.push(f), s();
      return r = v.post, s(), debug("function %o", g), g;
    }
  }
  return m();
}
var adjusters$1 = {};
(function(r) {
  var i = color;
  r.red = s("red"), r.blue = s("blue"), r.green = s("green"), r.alpha = r.a = s("alpha"), r.rgb = function() {
  }, r.hue = r.h = a("hue"), r.saturation = r.s = a("saturation"), r.lightness = r.l = a("lightness"), r.whiteness = r.w = a("whiteness"), r.blackness = r.b = a("blackness"), r.blend = function(p, u) {
    var m = p.alpha();
    p.alpha(1);
    var v = new i(u[0].value), g = 1 - parseInt(u[1].value, 10) / 100;
    p.mix(v, g).alpha(m);
  }, r.tint = function(p, u) {
    u.unshift({ type: "argument", value: "white" }), r.blend(p, u);
  }, r.shade = function(p, u) {
    u.unshift({ type: "argument", value: "black" }), r.blend(p, u);
  }, r.contrast = function(p, u) {
    u.length == 0 && u.push({ type: "argument", value: "100%" });
    var m = 1 - parseInt(u[0].value, 10) / 100, v = p.luminosity() < 0.5 ? new i({ h: p.hue(), w: 100, b: 0 }) : new i({ h: p.hue(), w: 0, b: 100 }), g = v, f = 4.5;
    if (p.contrast(v) > f) {
      var g = l(f, p, v), w = g.alpha();
      g.alpha(1), g.mix(v, m).alpha(w);
    }
    p.hwb(g.hwb());
  };
  function s(p) {
    return function(u, m) {
      var v;
      m[0].type == "modifier" && (v = m.shift().value);
      var g = m[0].value;
      g.indexOf("%") != -1 ? (g = parseInt(g, 10) / 100, v ? v != "*" && (g = u[p]() * g) : g = g * (p == "alpha" ? 1 : 255)) : g = Number(g), u[p](d(u[p](), g, v));
    };
  }
  function a(p) {
    return function(u, m) {
      var v;
      m[0].type == "modifier" && (v = m.shift().value);
      var g = parseFloat(m[0].value, 10);
      u[p](d(u[p](), g, v));
    };
  }
  function c(p, u) {
    var m = parseInt(u, 10) / 100;
    return p * m;
  }
  function d(p, u, m) {
    switch (m) {
      case "+":
        return p + u;
      case "-":
        return p - u;
      case "*":
        return p * u;
      default:
        return u;
    }
  }
  function l(p, u, m) {
    for (var v = u.hue(), g = u.clone(), f = u.whiteness(), w = u.blackness(), h = m.whiteness(), _ = m.blackness(); Math.abs(f - h) > 1 || Math.abs(w - _) > 1; ) {
      var y = Math.round((h + f) / 2), S = Math.round((_ + w) / 2);
      g.whiteness(y), g.blackness(S), g.contrast(u) > p ? (h = y, _ = S) : (f = y, w = S);
    }
    return g;
  }
})(adjusters$1);
var balanced = balancedMatch, Color = color, parse$1 = parse_1$1, adjusters = adjusters$1, convert_1$1 = convert$1;
function convert$1(r) {
  var i = r.indexOf("color(");
  if (i == -1)
    return r;
  if (r = r.slice(i), r = balanced("(", ")", r), !r)
    throw new SyntaxError("Missing closing parenthese for '" + r + "'");
  var s = parse$1("color(" + r.body + ")");
  return toRGB(s) + convert$1(r.post);
}
function toRGB(r) {
  var i = new Color(r.arguments[0].type == "function" ? toRGB(r.arguments[0]) : r.arguments[0].value), s = r.arguments.slice(1);
  return s.forEach(function(a) {
    var c = a.name;
    if (!adjusters[c])
      throw new Error("Unknown <color-adjuster> '" + c + "'");
    a.arguments.forEach(function(d) {
      d.type == "function" && d.name == "color" && (d.value = toRGB(d), d.type = "color", delete d.name);
    }), adjusters[c](i, a.arguments);
  }), i.rgbString();
}
var convert = convert_1$1, parse = parse_1$1, convert_1 = lib.convert = convert, parse_1 = lib.parse = parse;
class Storage {
  constructor() {
    q(this, "prefix", "");
    this.prefix = getAppType() == "admin" ? "admin" : "site";
  }
  setPrefix(i) {
    this.prefix = i;
  }
  /**
   * 设置缓存
   * @param param
   */
  set(i) {
    try {
      window.localStorage.setItem(`${this.prefix}.${i.key}`, JSON.stringify(i.data)), typeof i.success == "function" && i.success();
    } catch (s) {
      typeof i.fail == "function" && i.fail(s);
    }
  }
  /**
   * 获取缓存
   * @param key
   * @returns
   */
  get(i) {
    try {
      const s = window.localStorage.getItem(`${this.prefix}.${i}`);
      return s === null ? null : JSON.parse(s);
    } catch {
      const a = window.localStorage.getItem(`${this.prefix}.${i}`);
      return a !== null ? a : null;
    }
  }
  /**
   * 移除指定缓存
   * @param key
   */
  remove(i) {
    typeof i == "string" ? window.localStorage.removeItem(`${this.prefix}.${i}`) : i.forEach((s) => {
      window.localStorage.removeItem(`${this.prefix}.${s}`);
    });
  }
  /**
   * 清理缓存
   */
  clear() {
    window.localStorage.clear();
  }
}
const storage = new Storage(), env = (typeof window < "u" ? window.__ENV__ : null) || {}, APP_BASE_URL = env.VITE_APP_BASE_URL || "/adminapi/", IMG_DOMAIN = env.VITE_IMG_DOMAIN || "" || "", HEADER_TOKEN_KEY = env.VITE_REQUEST_HEADER_TOKEN_KEY || "token", HEADER_SITEID_KEY = env.VITE_REQUEST_HEADER_SITEID_KEY || "site-id", DEFAULT_TITLE = env.VITE_DETAULT_TITLE || {}.VITE_DETAULT_TITLE || "", envConfig = {
  VITE_APP_BASE_URL: APP_BASE_URL,
  VITE_IMG_DOMAIN: IMG_DOMAIN,
  VITE_REQUEST_HEADER_TOKEN_KEY: HEADER_TOKEN_KEY,
  VITE_REQUEST_HEADER_SITEID_KEY: HEADER_SITEID_KEY,
  VITE_DETAULT_TITLE: DEFAULT_TITLE
};
function useElementIcon(r) {
  for (const [i, s] of Object.entries(ElementPlusIconsVue))
    r.component(i, s);
}
function setThemeColor(r, i = "light") {
  useCssVar("--el-color-primary", null).value = r;
  const s = {
    dark: {
      "light-3": "shade(20%)",
      "light-5": "shade(30%)",
      "light-7": "shade(50%)",
      "light-8": "shade(60%)",
      "light-9": "shade(70%)",
      "dark-2": "tint(20%)"
    },
    light: {
      "dark-2": "shade(20%)",
      "light-3": "tint(30%)",
      "light-5": "tint(50%)",
      "light-7": "tint(70%)",
      "light-8": "tint(80%)",
      "light-9": "tint(90%)"
    }
  };
  Object.keys(s[i]).forEach((a) => {
    useCssVar("--el-color-primary-" + a, null).value = lib.convert(`color(${r} ${s[i][a]})`);
  });
}
function getAppType() {
  const r = location.pathname.split("/").filter((i) => i);
  return r.length ? r[0] : "admin";
}
function setWindowTitle(r = "") {
  const i = useTitle();
  i.value = r || envConfig.VITE_DETAULT_TITLE;
}
function getToken() {
  return storage.get("token");
}
function setToken(r) {
  storage.set({ key: "token", data: r });
}
function removeToken() {
  storage.remove("token");
}
function debounce$1(r, i = 300) {
  let s = null;
  return function(...a) {
    s != null && (clearTimeout(s), s = null), s = setTimeout(() => {
      r.call(this, ...a);
    }, i);
  };
}
function isUrl(r) {
  return r.indexOf("http://") != -1 || r.indexOf("https://") != -1;
}
function img(r) {
  if (!r)
    return "";
  let i = envConfig.VITE_IMG_DOMAIN || location.origin;
  return r.startsWith("/") && (r = r.replace(/^\//, "")), i.endsWith("/") && (i = i.slice(0, -1)), isUrl(r) ? r : `${i}/${r}`;
}
function assetImg(r) {
  return new URL("@/", self.location) + r;
}
function strByteLength(r = "") {
  let i = 0;
  for (let s = 0; s < r.length; s++)
    r.charCodeAt(s) > 127 || r.charCodeAt(s) == 94 ? i += 2 : i++;
  return i;
}
function urlToRouteRaw(r) {
  const i = {}, [s, a] = r.split("?");
  return a && a.split("&").forEach((c) => {
    let [d, l] = c.split("=");
    i[d] = l;
  }), { path: s, query: i };
}
const isArray = (r) => typeof Array.isArray == "function" ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
function deepClone(r) {
  if ([null, void 0, NaN, !1].includes(r) || typeof r != "object" && typeof r != "function")
    return r;
  const i = isArray(r) ? [] : {};
  for (const s in r)
    r.hasOwnProperty(s) && (i[s] = typeof r[s] == "object" ? deepClone(r[s]) : r[s]);
  return i;
}
function guid(r = 10, i = !0, s = null) {
  const a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), c = [];
  if (s = s || a.length, r)
    for (let d = 0; d < r; d++)
      c[d] = a[0 | Math.random() * s];
  else {
    let d;
    c[8] = c[13] = c[18] = c[23] = "-", c[14] = "4";
    for (let l = 0; l < 36; l++)
      c[l] || (d = 0 | Math.random() * 16, c[l] = a[l == 19 ? d & 3 | 8 : d]);
  }
  return i ? (c.shift(), `u${c.join("")}`) : c.join("");
}
function moneyFormat(r) {
  return isNaN(parseFloat(r)) ? r : parseFloat(r).toFixed(2);
}
function timeStampTurnTime(r, i = "") {
  if (r != null && r != "" && r > 0) {
    const s = new Date();
    s.setTime(r * 1e3);
    const a = s.getFullYear();
    let c = s.getMonth() + 1;
    c = c < 10 ? "0" + c : c;
    let d = s.getDate();
    d = d < 10 ? "0" + d : d;
    let l = s.getHours();
    l = l < 10 ? "0" + l : l;
    let p = s.getMinutes(), u = s.getSeconds();
    return p = p < 10 ? "0" + p : p, u = u < 10 ? "0" + u : u, i ? i == "yearMonthDay" ? a + "年" + c + "月" + d + "日" : a + "-" + c + "-" + d : a + "-" + c + "-" + d + " " + l + ":" + p + ":" + u;
  } else
    return "";
}
function getCurrentDataTime(r) {
  const i = (m) => m < 10 ? "0" + m : m, s = new Date(r);
  let a = s.getFullYear(), c = s.getMonth() + 1, d = s.getDate(), l = s.getHours(), p = s.getMinutes(), u = s.getSeconds();
  return c > 12 && (c = c - 12), `${a}-${i(c)}-${i(d)} ${i(l)}:${i(p)}:${i(u)}`;
}
function timeTurnTimeStamp(r) {
  const i = r.split(" ", 2), s = (i[0] ? i[0] : "").split("-", 3), a = (i[1] ? i[1] : "").split(":", 3);
  return new Date(
    parseInt(s[0], 10) || null,
    (parseInt(s[1], 10) || 1) - 1,
    parseInt(s[2], 10) || null,
    parseInt(a[0], 10) || null,
    parseInt(a[1], 10) || null,
    parseInt(a[2], 10) || null
  ).getTime() / 1e3;
}
function filterDigit(r) {
  r.target.value = r.target.value.replace(/[^\d\.]/g, ""), r.target.value = r.target.value.replace(/^\./g, ""), r.target.value = r.target.value.replace(/\.{2,}/g, ".");
  const i = r.target.value.split(".");
  i.length > 1 && i[1].length > 2 && (r.target.value = `${i[0]}.${i[1].slice(0, 2)}`);
}
function filterNumber(r) {
  r.target.value = r.target.value.replace(/[^\d]/g, "");
}
function filterSpecial(r) {
  r.target.value = r.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ""), r.target.value = r.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
}
function filterBlank(r) {
  r.target.value = r.target.value.replace(/\s/g, "");
}
function setTablePageStorage(r = 1, i = 10, s = {}) {
  let a = storage.get("tablePageStorage");
  a || (a = {});
  const c = location.pathname + JSON.stringify(s);
  a[c] = {
    page: r,
    limit: i
  };
  const d = 5;
  Object.keys(a).length > d && delete a[Object.keys(a)[0]], storage.set({ key: "tablePageStorage", data: a });
}
function getTablePageStorage(r = {}) {
  let i = storage.get("tablePageStorage");
  const s = location.pathname + JSON.stringify(r);
  return !i || !i[s] ? i = {
    page: 1,
    limit: 10
  } : i = i[s], i;
}
function distance(r) {
  const i = typeof r == "string" ? parseFloat(r) : r;
  return isNaN(i) ? r.toString() : i < 1 ? parseInt((i * 1e3).toString()) + "m" : i.toFixed(1) + "km";
}
function getImageDimensions(r) {
  return new Promise((i) => {
    const s = new Image();
    s.onload = () => {
      const a = {
        width: s.naturalWidth,
        height: s.naturalHeight
      };
      i(a);
    }, s.onerror = (a) => {
      i(null);
    }, s.src = img(r);
  });
}
const articleData = "文章数据", articleStyle = "文章样式", articleBgColor = "文章背景", articleNum = "文章数量", selectArticleTips = "文章选择", articleTitle = "标题", articleImage = "封面", articleCategoryName = "栏目", articleSummary = "摘要", selectArticleTip = "请选择文章", common$c = {
  articleData,
  articleStyle,
  articleBgColor,
  articleNum,
  selectArticleTips,
  articleTitle,
  articleImage,
  articleCategoryName,
  articleSummary,
  selectArticleTip
}, __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  articleBgColor,
  articleCategoryName,
  articleData,
  articleImage,
  articleNum,
  articleStyle,
  articleSummary,
  articleTitle,
  default: common$c,
  selectArticleTip,
  selectArticleTips
}, Symbol.toStringTag, { value: "Module" })), search$1 = "搜索", reset$1 = "重置", confirm$4 = "确认", cancel$4 = "取消", warning$2 = "警告", success = "成功", error = "错误", info$1 = "信息", emptyData$2 = "暂无数据", loading = "加载中...", operation$2 = "操作", detail$1 = "详情", add = "添加", edit$2 = "编辑", back$1 = "返回", submit = "提交", save$1 = "保存", close = "关闭", refresh$2 = "刷新", page = "页码", size = "每页条数", total = "总计", prev$1 = "上一页", next = "下一页", jump = "跳转", print = "打印", copy$1 = "复制", paste = "粘贴", cut = "剪切", selectAll$1 = "全选", deselectAll = "取消全选", batchOperation = "批量操作", pleaseSelect = "请选择", pleaseInput = "请输入", pleaseChoose = "请选择", required = "必填", minLength = "长度不能小于", maxLength = "长度不能大于", invalidFormat = "格式无效", loadDataError = "加载数据失败", submitSuccess = "提交成功", submitFailure = "提交失败", deleteSuccess = "删除成功", deleteFailure = "删除失败", updateSuccess = "更新成功", updateFailure = "更新失败", addSuccess = "添加成功", addFailure = "添加失败", confirmDelete = "确定要删除吗？", confirmSubmit = "确定要提交吗？", confirmCancel = "确定要取消吗？", common$b = {
  search: search$1,
  reset: reset$1,
  confirm: confirm$4,
  cancel: cancel$4,
  warning: warning$2,
  success,
  error,
  info: info$1,
  emptyData: emptyData$2,
  loading,
  operation: operation$2,
  detail: detail$1,
  add,
  edit: edit$2,
  delete: "删除",
  back: back$1,
  submit,
  save: save$1,
  close,
  refresh: refresh$2,
  page,
  size,
  total,
  prev: prev$1,
  next,
  jump,
  export: "导出",
  import: "导入",
  print,
  copy: copy$1,
  paste,
  cut,
  selectAll: selectAll$1,
  deselectAll,
  batchOperation,
  pleaseSelect,
  pleaseInput,
  pleaseChoose,
  required,
  minLength,
  maxLength,
  invalidFormat,
  loadDataError,
  submitSuccess,
  submitFailure,
  deleteSuccess,
  deleteFailure,
  updateSuccess,
  updateFailure,
  addSuccess,
  addFailure,
  confirmDelete,
  confirmSubmit,
  confirmCancel
}, __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add,
  addFailure,
  addSuccess,
  back: back$1,
  batchOperation,
  cancel: cancel$4,
  close,
  confirm: confirm$4,
  confirmCancel,
  confirmDelete,
  confirmSubmit,
  copy: copy$1,
  cut,
  default: common$b,
  deleteFailure,
  deleteSuccess,
  deselectAll,
  detail: detail$1,
  edit: edit$2,
  emptyData: emptyData$2,
  error,
  info: info$1,
  invalidFormat,
  jump,
  loadDataError,
  loading,
  maxLength,
  minLength,
  next,
  operation: operation$2,
  page,
  paste,
  pleaseChoose,
  pleaseInput,
  pleaseSelect,
  prev: prev$1,
  print,
  refresh: refresh$2,
  required,
  reset: reset$1,
  save: save$1,
  search: search$1,
  selectAll: selectAll$1,
  size,
  submit,
  submitFailure,
  submitSuccess,
  success,
  total,
  updateFailure,
  updateSuccess,
  warning: warning$2
}, Symbol.toStringTag, { value: "Module" })), goodsSelectPopupSelectGoodsButton$3 = "选择服务", goodsSelectPopupSelect$3 = "已选", goodsSelectPopupPiece$3 = "个", goodsSelectPopupSelectGoodsDialog$3 = "服务选择", goodsSelectPopupAllGoods$3 = "全部服务", goodsSelectPopupSelectedGoods$2 = "已选服务", goodsSelectPopupGoodsName$3 = "目名称", goodsSelectPopupGoodsNamePlaceholder$3 = "请输入服务名称", goodsSelectPopupGoodsCategory$2 = "服务分类", goodsSelectPopupGoodsCategoryPlaceholder$2 = "全部", goodsSelectPopupGoodsType$2 = "服务类型", goodsSelectPopupGoodsTypePlaceholder$2 = "请选择服务类型", goodsSelectPopupGoodsInfo$3 = "服务", goodsSelectPopupPrice$3 = "价格", goodsSelectPopupSaleNum$1 = "销量", goodsSelectPopupBeforeTip$3 = "已选择", goodsSelectPopupAfterTip$3 = "个服务", goodsSelectPopupClearGoods$3 = "取消选择", goodsSelectPopupGoodsMinTip$3 = "所选服务数量不能少于", goodsSelectPopupGoodsMaxTip$3 = "所选服务数量不能超过", o2oGoodsCategorySelectContentName$1 = "分类名称", o2oGoodsCategorySelectContentImage$1 = "分类图片", o2oSelectPopupCardInfo$1 = "服务信息", o2oSelectPopupCardPrice$1 = "销售价", o2oSelectPopupCardSaleNum$1 = "销量", o2oSelectPopupCardName$1 = "服务名称", o2oSelectPopupCardCategory$1 = "服务分类", o2oSelectPopupCardNamePlaceholder$1 = "请输入服务名称", o2oSelectContentTips$1 = "所选服务服务不能少于1个", showTitle$1 = "显示标题", searchStyle$1 = "搜索样式", borderStyle$1 = "边框类型", searchPlaceholder$1 = "搜索内容", goodsFixedPrice$1 = "指定会员价", searchContent$1 = "搜索内容", technicianSelectPopupCardName$1 = "师傅名称", technicianSelectPopupCardMobile$1 = "手机号", technicianSelectPopupCardNamePlaceholder$1 = "请输入师傅名称", technicianSelectPopupCardMobilePlaceholder$1 = "请输入手机号", technicianSelectPopupCardInfo$1 = "师傅信息", technicianSelectPopupCardSeniority$1 = "工龄", technicianSelectPopupCardSex$1 = "性别", technicianSelectContentTips$1 = "所选师傅不能少于1个", o2oGoodsSelectContentPlaceholder$1 = "请选择服务分类", less = "收起", selectTag = "选择标签", tagId = "标签ID", tagName = "标签名称", tagColor = "标签颜色", cancel$3 = "取消", confirm$3 = "确认", technicianInfo = "人员信息", shop = "所属机构", orderStatus = "工单状态", selectTechnican = "选择师傅", emptyData$1 = "暂无数据", invoiceInfo = "发票信息", invoiceNumber = "发票编号", invoiceType = "发票类型", invoiceMoney = "发票金额", invoiceTime = "开票时间", contentName = "开票内容", headerType = "发票抬头类型", headerName = "企业名称", taxNumber = "纳税人识别号", telephone = "电话", address = "地址", bankName = "开户银行", bankCardNumber = "银行账号", status$2 = "发票状态", toInvoice = "待开票", invoiced = "已开票", invoiceEmpty = "暂无发票信息", individual = "个人", company = "企业", invoiceContent = "开票内容", bank_name = "开户银行", bank_card_number = "银行账号", applicationNumber = "发票编号", customerName = "客户名称", taxpayerId = "纳税人识别号", invoiceAmount = "开票金额", applicationTime = "申请时间", notInvoiced = "未开票", email = "电子邮箱", orderMoney = "订单金额", rankSelectPopupSelectRankButton$1 = "选择榜单", defaultGoodsSelect$1 = "默认", goodsSelectPopupStock$2 = "库存", goodsSelectPopupGoodsStatusPlaceholder$1 = "请选择商品状态", goodsSelectPopupGoodsPointUnit$1 = "积分", goodsSelectPopupGoodsPriceUnit$1 = "元", goodsTextColor$1 = "文字颜色", textColor$1 = "标题颜色", subTextColor$1 = "副标题颜色", wayPlaceholder$1 = "虚拟商品和实物商品只能选择其中一个类型，请重新选择", goodsStyle$1 = "商品样式", goodsBgColor$1 = "商品背景", goodsNameColor$1 = "商品名称", goodsPriceColor$1 = "销售价", goodsBtnText$1 = "文本", goodsBtnTextPlaceholder$1 = "请输入按钮文字", goodsSaleColor$1 = "商品销量", goodsBtnColor$1 = "按钮背景", goodsNumColor$1 = "已兑人数", goodsBuyBtn$1 = "购买按钮", goodsShowContent$1 = "显示内容", goodsBtnResult$1 = "按钮效果", goodsBtnIsShow$1 = "是否显示", goodsCartIncident$1 = "点击事件", goodsAddCart$1 = "加入购物车", goodsBtnStyle$1 = "样式", goodsSaleNum$1 = "商品销量", goodsDetail$1 = "商品详情", goodsRounded$1 = "圆角", fenxiaoCommissionPriceColor$1 = "分销佣金", goodsCategoryPlaceholder$1 = "请选择商品分类", goodsPlaceholder$1 = "请选择商品", goodsIsBold$1 = "是否加粗", goodsLabel$1 = "商品标签", headStyle1$1 = "样式1", headStyle2$1 = "样式2", headStyle3$1 = "样式3", headStyle4$1 = "样式4", goodsData$1 = "商品数据", sortWay$2 = "排序", sales$2 = "销量", price$2 = "价格", manyGoodsListAroundRadius$1 = "图片圆角", manyGoodsListCategoryName$1 = "分类名称", manyGoodsListSubTitle$1 = "副标题", manyGoodsLisAddItem$1 = "添加一个多商品组", couponData$1 = "优惠券数据", couponContent$1 = "优惠券内容", couponTitle$1 = "标题", couponTitlePlaceholder$1 = "请输入标题", couponSubTitle$1 = "副标题", couponSubTitlePlaceholder$1 = "请输入副标题", selectCoupon$1 = "选择优惠券", allSources$1 = "全部", couponNum$1 = "优惠券数量", couponPlaceholder$1 = "请选择优惠券", couponBtnText$1 = "按钮文字", couponBtnTextPlaceholder$1 = "请输入按钮文字", couponTitleStyle$1 = "标题样式", couponTitleColor$1 = "标题颜色", couponSubTitleColor$1 = "副标题颜色", couponItemStyle$1 = "优惠券项样式", couponMoney$1 = "金额颜色", manyGoodsListCategorySet$1 = "分组设置", manyGoodsListSourceDiy$1 = "自定义", manyGoodsListSourceCategory$1 = "商品分类", goodsSet$1 = "商品设置", goodsSearchSet$1 = "搜索设置", goodsSearchText$1 = "搜索内容", goodsSearchTextPlaceholder$1 = "请输入搜索内容", shopMemberInfoComponentUidTextColor$1 = "编号颜色", shopMemberInfoComponentAccountTextColor$1 = "账户颜色", shopMemberInfoComponentAccount$1 = "账号信息", shopGoodsRecommendComponentTag$1 = "标签", shopGoodsRecommendComponentTagColor$1 = "标签颜色", shopGoodsRecommendComponentTagPlaceholder$1 = "请输入标签内容", shopGoodsRecommendComponentButtonBorderColor$1 = "按钮边框颜色", carouselStyle$1 = "轮播样式", recommendIndicatorStyle$1 = "指示器设置", recommendIndicatorColor$1 = "常规颜色", recommendIndicatorActiveColor$1 = "选中颜色", activeCubeBlockContent$1 = "板块内容", bgImage$1 = "背景图片", rankingTitleIcon$1 = "图标", rankSelect$1 = "榜单选择", rankName$1 = "榜单名称", rankNamePlaceholder$1 = "请输入榜单名称", showGoodsNum$1 = "榜单商品数量", goodsSourceName$1 = "商品来源", ruleTypeName$1 = "排序规则", rankTypeName$1 = "排行周期", rankSelectPopupAfterTip$1 = "个榜单", rankSelectPopupGoodsMinTip$1 = "所选榜单数量不能少于", rankSelectPopupGoodsMaxTip$1 = "所选榜单数量不能超过", rankingTitleImage$1 = "头部图片", rankingSubTitle$1 = "副标题", rankingSubTitleTextColor$1 = "副标题颜色", rankTextColor$1 = "名称颜色", rankingSubTitleLink$1 = "副标题链接", listFrameColor$1 = "背景颜色", topRounded$1 = "上圆角", bottomRounded$1 = "下圆角", imageRounded$1 = "图片圆角", rankingStyle$1 = "板块样式", styleRecommend$1 = "风格推荐", countDownStyle$1 = "倒计时样式", newcomerNumberColor$1 = "数字颜色", newcomerNumberBg$1 = "数字背景色", newcomerOtherColor$1 = "文字颜色", goodsCategorySelectContentName$1 = "分类名称", goodsCategorySelectContentImage$1 = "分类图片", goodsCategorySelectContentPlaceholder$1 = "请选择商品分类", couponSelectContentTitle$1 = "优惠券名称", couponSelectContentTitlePlaceholder$1 = "请输入优惠券名称", couponSelectContentType$1 = "类型", couponSelectContentPrice$1 = "面值", couponSelectContentThreshold$1 = "使用门槛", couponSelectContentTips$1 = "请选择优惠券", pointExchangeSelectContentTitle$1 = "商品名称", pointExchangeSelectContentTitlePlaceholder$1 = "请输入商品名称", pointExchangeSelectContentGoodsInfo$1 = "商品信息", pointExchangeSelectContentPrice$1 = "兑换价格", pointExchangeSelectContentPointUnit$1 = "积分", pointExchangeSelectContentPriceUnit$1 = "元", pointExchangeSelectContentRedeemedAndSurplus$1 = "已兑/剩余", pointExchangeSelectContentTips$1 = "请选择积分商品", categoryName$1 = "分类名称", categoryImage$1 = "分类图片", common$a = {
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$3,
  goodsSelectPopupSelect: goodsSelectPopupSelect$3,
  goodsSelectPopupPiece: goodsSelectPopupPiece$3,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$3,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$3,
  goodsSelectPopupSelectedGoods: goodsSelectPopupSelectedGoods$2,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$3,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$3,
  goodsSelectPopupGoodsCategory: goodsSelectPopupGoodsCategory$2,
  goodsSelectPopupGoodsCategoryPlaceholder: goodsSelectPopupGoodsCategoryPlaceholder$2,
  goodsSelectPopupGoodsType: goodsSelectPopupGoodsType$2,
  goodsSelectPopupGoodsTypePlaceholder: goodsSelectPopupGoodsTypePlaceholder$2,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$3,
  goodsSelectPopupPrice: goodsSelectPopupPrice$3,
  goodsSelectPopupSaleNum: goodsSelectPopupSaleNum$1,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$3,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$3,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$3,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$3,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$3,
  o2oGoodsCategorySelectContentName: o2oGoodsCategorySelectContentName$1,
  o2oGoodsCategorySelectContentImage: o2oGoodsCategorySelectContentImage$1,
  o2oSelectPopupCardInfo: o2oSelectPopupCardInfo$1,
  o2oSelectPopupCardPrice: o2oSelectPopupCardPrice$1,
  o2oSelectPopupCardSaleNum: o2oSelectPopupCardSaleNum$1,
  o2oSelectPopupCardName: o2oSelectPopupCardName$1,
  o2oSelectPopupCardCategory: o2oSelectPopupCardCategory$1,
  o2oSelectPopupCardNamePlaceholder: o2oSelectPopupCardNamePlaceholder$1,
  o2oSelectContentTips: o2oSelectContentTips$1,
  showTitle: showTitle$1,
  searchStyle: searchStyle$1,
  borderStyle: borderStyle$1,
  searchPlaceholder: searchPlaceholder$1,
  goodsFixedPrice: goodsFixedPrice$1,
  searchContent: searchContent$1,
  technicianSelectPopupCardName: technicianSelectPopupCardName$1,
  technicianSelectPopupCardMobile: technicianSelectPopupCardMobile$1,
  technicianSelectPopupCardNamePlaceholder: technicianSelectPopupCardNamePlaceholder$1,
  technicianSelectPopupCardMobilePlaceholder: technicianSelectPopupCardMobilePlaceholder$1,
  technicianSelectPopupCardInfo: technicianSelectPopupCardInfo$1,
  technicianSelectPopupCardSeniority: technicianSelectPopupCardSeniority$1,
  technicianSelectPopupCardSex: technicianSelectPopupCardSex$1,
  technicianSelectContentTips: technicianSelectContentTips$1,
  o2oGoodsSelectContentPlaceholder: o2oGoodsSelectContentPlaceholder$1,
  less,
  selectTag,
  tagId,
  tagName,
  tagColor,
  cancel: cancel$3,
  confirm: confirm$3,
  technicianInfo,
  shop,
  orderStatus,
  selectTechnican,
  emptyData: emptyData$1,
  invoiceInfo,
  invoiceNumber,
  invoiceType,
  invoiceMoney,
  invoiceTime,
  contentName,
  headerType,
  headerName,
  taxNumber,
  telephone,
  address,
  bankName,
  bankCardNumber,
  status: status$2,
  toInvoice,
  invoiced,
  invoiceEmpty,
  individual,
  company,
  invoiceContent,
  bank_name,
  bank_card_number,
  applicationNumber,
  customerName,
  taxpayerId,
  invoiceAmount,
  applicationTime,
  notInvoiced,
  email,
  orderMoney,
  rankSelectPopupSelectRankButton: rankSelectPopupSelectRankButton$1,
  defaultGoodsSelect: defaultGoodsSelect$1,
  goodsSelectPopupStock: goodsSelectPopupStock$2,
  goodsSelectPopupGoodsStatusPlaceholder: goodsSelectPopupGoodsStatusPlaceholder$1,
  goodsSelectPopupGoodsPointUnit: goodsSelectPopupGoodsPointUnit$1,
  goodsSelectPopupGoodsPriceUnit: goodsSelectPopupGoodsPriceUnit$1,
  goodsTextColor: goodsTextColor$1,
  textColor: textColor$1,
  subTextColor: subTextColor$1,
  wayPlaceholder: wayPlaceholder$1,
  goodsStyle: goodsStyle$1,
  goodsBgColor: goodsBgColor$1,
  goodsNameColor: goodsNameColor$1,
  goodsPriceColor: goodsPriceColor$1,
  goodsBtnText: goodsBtnText$1,
  goodsBtnTextPlaceholder: goodsBtnTextPlaceholder$1,
  goodsSaleColor: goodsSaleColor$1,
  goodsBtnColor: goodsBtnColor$1,
  goodsNumColor: goodsNumColor$1,
  goodsBuyBtn: goodsBuyBtn$1,
  goodsShowContent: goodsShowContent$1,
  goodsBtnResult: goodsBtnResult$1,
  goodsBtnIsShow: goodsBtnIsShow$1,
  goodsCartIncident: goodsCartIncident$1,
  goodsAddCart: goodsAddCart$1,
  goodsBtnStyle: goodsBtnStyle$1,
  goodsSaleNum: goodsSaleNum$1,
  goodsDetail: goodsDetail$1,
  goodsRounded: goodsRounded$1,
  fenxiaoCommissionPriceColor: fenxiaoCommissionPriceColor$1,
  goodsCategoryPlaceholder: goodsCategoryPlaceholder$1,
  goodsPlaceholder: goodsPlaceholder$1,
  goodsIsBold: goodsIsBold$1,
  goodsLabel: goodsLabel$1,
  headStyle1: headStyle1$1,
  headStyle2: headStyle2$1,
  headStyle3: headStyle3$1,
  headStyle4: headStyle4$1,
  goodsData: goodsData$1,
  sortWay: sortWay$2,
  default: "综合",
  sales: sales$2,
  price: price$2,
  manyGoodsListAroundRadius: manyGoodsListAroundRadius$1,
  manyGoodsListCategoryName: manyGoodsListCategoryName$1,
  manyGoodsListSubTitle: manyGoodsListSubTitle$1,
  manyGoodsLisAddItem: manyGoodsLisAddItem$1,
  couponData: couponData$1,
  couponContent: couponContent$1,
  couponTitle: couponTitle$1,
  couponTitlePlaceholder: couponTitlePlaceholder$1,
  couponSubTitle: couponSubTitle$1,
  couponSubTitlePlaceholder: couponSubTitlePlaceholder$1,
  selectCoupon: selectCoupon$1,
  allSources: allSources$1,
  couponNum: couponNum$1,
  couponPlaceholder: couponPlaceholder$1,
  couponBtnText: couponBtnText$1,
  couponBtnTextPlaceholder: couponBtnTextPlaceholder$1,
  couponTitleStyle: couponTitleStyle$1,
  couponTitleColor: couponTitleColor$1,
  couponSubTitleColor: couponSubTitleColor$1,
  couponItemStyle: couponItemStyle$1,
  couponMoney: couponMoney$1,
  manyGoodsListCategorySet: manyGoodsListCategorySet$1,
  manyGoodsListSourceDiy: manyGoodsListSourceDiy$1,
  manyGoodsListSourceCategory: manyGoodsListSourceCategory$1,
  goodsSet: goodsSet$1,
  goodsSearchSet: goodsSearchSet$1,
  goodsSearchText: goodsSearchText$1,
  goodsSearchTextPlaceholder: goodsSearchTextPlaceholder$1,
  shopMemberInfoComponentUidTextColor: shopMemberInfoComponentUidTextColor$1,
  shopMemberInfoComponentAccountTextColor: shopMemberInfoComponentAccountTextColor$1,
  shopMemberInfoComponentAccount: shopMemberInfoComponentAccount$1,
  shopGoodsRecommendComponentTag: shopGoodsRecommendComponentTag$1,
  shopGoodsRecommendComponentTagColor: shopGoodsRecommendComponentTagColor$1,
  shopGoodsRecommendComponentTagPlaceholder: shopGoodsRecommendComponentTagPlaceholder$1,
  shopGoodsRecommendComponentButtonBorderColor: shopGoodsRecommendComponentButtonBorderColor$1,
  carouselStyle: carouselStyle$1,
  recommendIndicatorStyle: recommendIndicatorStyle$1,
  recommendIndicatorColor: recommendIndicatorColor$1,
  recommendIndicatorActiveColor: recommendIndicatorActiveColor$1,
  activeCubeBlockContent: activeCubeBlockContent$1,
  bgImage: bgImage$1,
  rankingTitleIcon: rankingTitleIcon$1,
  rankSelect: rankSelect$1,
  rankName: rankName$1,
  rankNamePlaceholder: rankNamePlaceholder$1,
  showGoodsNum: showGoodsNum$1,
  goodsSourceName: goodsSourceName$1,
  ruleTypeName: ruleTypeName$1,
  rankTypeName: rankTypeName$1,
  rankSelectPopupAfterTip: rankSelectPopupAfterTip$1,
  rankSelectPopupGoodsMinTip: rankSelectPopupGoodsMinTip$1,
  rankSelectPopupGoodsMaxTip: rankSelectPopupGoodsMaxTip$1,
  rankingTitleImage: rankingTitleImage$1,
  rankingSubTitle: rankingSubTitle$1,
  rankingSubTitleTextColor: rankingSubTitleTextColor$1,
  rankTextColor: rankTextColor$1,
  rankingSubTitleLink: rankingSubTitleLink$1,
  listFrameColor: listFrameColor$1,
  topRounded: topRounded$1,
  bottomRounded: bottomRounded$1,
  imageRounded: imageRounded$1,
  rankingStyle: rankingStyle$1,
  styleRecommend: styleRecommend$1,
  countDownStyle: countDownStyle$1,
  newcomerNumberColor: newcomerNumberColor$1,
  newcomerNumberBg: newcomerNumberBg$1,
  newcomerOtherColor: newcomerOtherColor$1,
  goodsCategorySelectContentName: goodsCategorySelectContentName$1,
  goodsCategorySelectContentImage: goodsCategorySelectContentImage$1,
  goodsCategorySelectContentPlaceholder: goodsCategorySelectContentPlaceholder$1,
  couponSelectContentTitle: couponSelectContentTitle$1,
  couponSelectContentTitlePlaceholder: couponSelectContentTitlePlaceholder$1,
  couponSelectContentType: couponSelectContentType$1,
  couponSelectContentPrice: couponSelectContentPrice$1,
  couponSelectContentThreshold: couponSelectContentThreshold$1,
  couponSelectContentTips: couponSelectContentTips$1,
  pointExchangeSelectContentTitle: pointExchangeSelectContentTitle$1,
  pointExchangeSelectContentTitlePlaceholder: pointExchangeSelectContentTitlePlaceholder$1,
  pointExchangeSelectContentGoodsInfo: pointExchangeSelectContentGoodsInfo$1,
  pointExchangeSelectContentPrice: pointExchangeSelectContentPrice$1,
  pointExchangeSelectContentPointUnit: pointExchangeSelectContentPointUnit$1,
  pointExchangeSelectContentPriceUnit: pointExchangeSelectContentPriceUnit$1,
  pointExchangeSelectContentRedeemedAndSurplus: pointExchangeSelectContentRedeemedAndSurplus$1,
  pointExchangeSelectContentTips: pointExchangeSelectContentTips$1,
  categoryName: categoryName$1,
  categoryImage: categoryImage$1
}, __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeCubeBlockContent: activeCubeBlockContent$1,
  address,
  allSources: allSources$1,
  applicationNumber,
  applicationTime,
  bankCardNumber,
  bankName,
  bank_card_number,
  bank_name,
  bgImage: bgImage$1,
  borderStyle: borderStyle$1,
  bottomRounded: bottomRounded$1,
  cancel: cancel$3,
  carouselStyle: carouselStyle$1,
  categoryImage: categoryImage$1,
  categoryName: categoryName$1,
  company,
  confirm: confirm$3,
  contentName,
  countDownStyle: countDownStyle$1,
  couponBtnText: couponBtnText$1,
  couponBtnTextPlaceholder: couponBtnTextPlaceholder$1,
  couponContent: couponContent$1,
  couponData: couponData$1,
  couponItemStyle: couponItemStyle$1,
  couponMoney: couponMoney$1,
  couponNum: couponNum$1,
  couponPlaceholder: couponPlaceholder$1,
  couponSelectContentPrice: couponSelectContentPrice$1,
  couponSelectContentThreshold: couponSelectContentThreshold$1,
  couponSelectContentTips: couponSelectContentTips$1,
  couponSelectContentTitle: couponSelectContentTitle$1,
  couponSelectContentTitlePlaceholder: couponSelectContentTitlePlaceholder$1,
  couponSelectContentType: couponSelectContentType$1,
  couponSubTitle: couponSubTitle$1,
  couponSubTitleColor: couponSubTitleColor$1,
  couponSubTitlePlaceholder: couponSubTitlePlaceholder$1,
  couponTitle: couponTitle$1,
  couponTitleColor: couponTitleColor$1,
  couponTitlePlaceholder: couponTitlePlaceholder$1,
  couponTitleStyle: couponTitleStyle$1,
  customerName,
  default: common$a,
  defaultGoodsSelect: defaultGoodsSelect$1,
  email,
  emptyData: emptyData$1,
  fenxiaoCommissionPriceColor: fenxiaoCommissionPriceColor$1,
  goodsAddCart: goodsAddCart$1,
  goodsBgColor: goodsBgColor$1,
  goodsBtnColor: goodsBtnColor$1,
  goodsBtnIsShow: goodsBtnIsShow$1,
  goodsBtnResult: goodsBtnResult$1,
  goodsBtnStyle: goodsBtnStyle$1,
  goodsBtnText: goodsBtnText$1,
  goodsBtnTextPlaceholder: goodsBtnTextPlaceholder$1,
  goodsBuyBtn: goodsBuyBtn$1,
  goodsCartIncident: goodsCartIncident$1,
  goodsCategoryPlaceholder: goodsCategoryPlaceholder$1,
  goodsCategorySelectContentImage: goodsCategorySelectContentImage$1,
  goodsCategorySelectContentName: goodsCategorySelectContentName$1,
  goodsCategorySelectContentPlaceholder: goodsCategorySelectContentPlaceholder$1,
  goodsData: goodsData$1,
  goodsDetail: goodsDetail$1,
  goodsFixedPrice: goodsFixedPrice$1,
  goodsIsBold: goodsIsBold$1,
  goodsLabel: goodsLabel$1,
  goodsNameColor: goodsNameColor$1,
  goodsNumColor: goodsNumColor$1,
  goodsPlaceholder: goodsPlaceholder$1,
  goodsPriceColor: goodsPriceColor$1,
  goodsRounded: goodsRounded$1,
  goodsSaleColor: goodsSaleColor$1,
  goodsSaleNum: goodsSaleNum$1,
  goodsSearchSet: goodsSearchSet$1,
  goodsSearchText: goodsSearchText$1,
  goodsSearchTextPlaceholder: goodsSearchTextPlaceholder$1,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$3,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$3,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$3,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$3,
  goodsSelectPopupGoodsCategory: goodsSelectPopupGoodsCategory$2,
  goodsSelectPopupGoodsCategoryPlaceholder: goodsSelectPopupGoodsCategoryPlaceholder$2,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$3,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$3,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$3,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$3,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$3,
  goodsSelectPopupGoodsPointUnit: goodsSelectPopupGoodsPointUnit$1,
  goodsSelectPopupGoodsPriceUnit: goodsSelectPopupGoodsPriceUnit$1,
  goodsSelectPopupGoodsStatusPlaceholder: goodsSelectPopupGoodsStatusPlaceholder$1,
  goodsSelectPopupGoodsType: goodsSelectPopupGoodsType$2,
  goodsSelectPopupGoodsTypePlaceholder: goodsSelectPopupGoodsTypePlaceholder$2,
  goodsSelectPopupPiece: goodsSelectPopupPiece$3,
  goodsSelectPopupPrice: goodsSelectPopupPrice$3,
  goodsSelectPopupSaleNum: goodsSelectPopupSaleNum$1,
  goodsSelectPopupSelect: goodsSelectPopupSelect$3,
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$3,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$3,
  goodsSelectPopupSelectedGoods: goodsSelectPopupSelectedGoods$2,
  goodsSelectPopupStock: goodsSelectPopupStock$2,
  goodsSet: goodsSet$1,
  goodsShowContent: goodsShowContent$1,
  goodsSourceName: goodsSourceName$1,
  goodsStyle: goodsStyle$1,
  goodsTextColor: goodsTextColor$1,
  headStyle1: headStyle1$1,
  headStyle2: headStyle2$1,
  headStyle3: headStyle3$1,
  headStyle4: headStyle4$1,
  headerName,
  headerType,
  imageRounded: imageRounded$1,
  individual,
  invoiceAmount,
  invoiceContent,
  invoiceEmpty,
  invoiceInfo,
  invoiceMoney,
  invoiceNumber,
  invoiceTime,
  invoiceType,
  invoiced,
  less,
  listFrameColor: listFrameColor$1,
  manyGoodsLisAddItem: manyGoodsLisAddItem$1,
  manyGoodsListAroundRadius: manyGoodsListAroundRadius$1,
  manyGoodsListCategoryName: manyGoodsListCategoryName$1,
  manyGoodsListCategorySet: manyGoodsListCategorySet$1,
  manyGoodsListSourceCategory: manyGoodsListSourceCategory$1,
  manyGoodsListSourceDiy: manyGoodsListSourceDiy$1,
  manyGoodsListSubTitle: manyGoodsListSubTitle$1,
  newcomerNumberBg: newcomerNumberBg$1,
  newcomerNumberColor: newcomerNumberColor$1,
  newcomerOtherColor: newcomerOtherColor$1,
  notInvoiced,
  o2oGoodsCategorySelectContentImage: o2oGoodsCategorySelectContentImage$1,
  o2oGoodsCategorySelectContentName: o2oGoodsCategorySelectContentName$1,
  o2oGoodsSelectContentPlaceholder: o2oGoodsSelectContentPlaceholder$1,
  o2oSelectContentTips: o2oSelectContentTips$1,
  o2oSelectPopupCardCategory: o2oSelectPopupCardCategory$1,
  o2oSelectPopupCardInfo: o2oSelectPopupCardInfo$1,
  o2oSelectPopupCardName: o2oSelectPopupCardName$1,
  o2oSelectPopupCardNamePlaceholder: o2oSelectPopupCardNamePlaceholder$1,
  o2oSelectPopupCardPrice: o2oSelectPopupCardPrice$1,
  o2oSelectPopupCardSaleNum: o2oSelectPopupCardSaleNum$1,
  orderMoney,
  orderStatus,
  pointExchangeSelectContentGoodsInfo: pointExchangeSelectContentGoodsInfo$1,
  pointExchangeSelectContentPointUnit: pointExchangeSelectContentPointUnit$1,
  pointExchangeSelectContentPrice: pointExchangeSelectContentPrice$1,
  pointExchangeSelectContentPriceUnit: pointExchangeSelectContentPriceUnit$1,
  pointExchangeSelectContentRedeemedAndSurplus: pointExchangeSelectContentRedeemedAndSurplus$1,
  pointExchangeSelectContentTips: pointExchangeSelectContentTips$1,
  pointExchangeSelectContentTitle: pointExchangeSelectContentTitle$1,
  pointExchangeSelectContentTitlePlaceholder: pointExchangeSelectContentTitlePlaceholder$1,
  price: price$2,
  rankName: rankName$1,
  rankNamePlaceholder: rankNamePlaceholder$1,
  rankSelect: rankSelect$1,
  rankSelectPopupAfterTip: rankSelectPopupAfterTip$1,
  rankSelectPopupGoodsMaxTip: rankSelectPopupGoodsMaxTip$1,
  rankSelectPopupGoodsMinTip: rankSelectPopupGoodsMinTip$1,
  rankSelectPopupSelectRankButton: rankSelectPopupSelectRankButton$1,
  rankTextColor: rankTextColor$1,
  rankTypeName: rankTypeName$1,
  rankingStyle: rankingStyle$1,
  rankingSubTitle: rankingSubTitle$1,
  rankingSubTitleLink: rankingSubTitleLink$1,
  rankingSubTitleTextColor: rankingSubTitleTextColor$1,
  rankingTitleIcon: rankingTitleIcon$1,
  rankingTitleImage: rankingTitleImage$1,
  recommendIndicatorActiveColor: recommendIndicatorActiveColor$1,
  recommendIndicatorColor: recommendIndicatorColor$1,
  recommendIndicatorStyle: recommendIndicatorStyle$1,
  ruleTypeName: ruleTypeName$1,
  sales: sales$2,
  searchContent: searchContent$1,
  searchPlaceholder: searchPlaceholder$1,
  searchStyle: searchStyle$1,
  selectCoupon: selectCoupon$1,
  selectTag,
  selectTechnican,
  shop,
  shopGoodsRecommendComponentButtonBorderColor: shopGoodsRecommendComponentButtonBorderColor$1,
  shopGoodsRecommendComponentTag: shopGoodsRecommendComponentTag$1,
  shopGoodsRecommendComponentTagColor: shopGoodsRecommendComponentTagColor$1,
  shopGoodsRecommendComponentTagPlaceholder: shopGoodsRecommendComponentTagPlaceholder$1,
  shopMemberInfoComponentAccount: shopMemberInfoComponentAccount$1,
  shopMemberInfoComponentAccountTextColor: shopMemberInfoComponentAccountTextColor$1,
  shopMemberInfoComponentUidTextColor: shopMemberInfoComponentUidTextColor$1,
  showGoodsNum: showGoodsNum$1,
  showTitle: showTitle$1,
  sortWay: sortWay$2,
  status: status$2,
  styleRecommend: styleRecommend$1,
  subTextColor: subTextColor$1,
  tagColor,
  tagId,
  tagName,
  taxNumber,
  taxpayerId,
  technicianInfo,
  technicianSelectContentTips: technicianSelectContentTips$1,
  technicianSelectPopupCardInfo: technicianSelectPopupCardInfo$1,
  technicianSelectPopupCardMobile: technicianSelectPopupCardMobile$1,
  technicianSelectPopupCardMobilePlaceholder: technicianSelectPopupCardMobilePlaceholder$1,
  technicianSelectPopupCardName: technicianSelectPopupCardName$1,
  technicianSelectPopupCardNamePlaceholder: technicianSelectPopupCardNamePlaceholder$1,
  technicianSelectPopupCardSeniority: technicianSelectPopupCardSeniority$1,
  technicianSelectPopupCardSex: technicianSelectPopupCardSex$1,
  telephone,
  textColor: textColor$1,
  toInvoice,
  topRounded: topRounded$1,
  wayPlaceholder: wayPlaceholder$1
}, Symbol.toStringTag, { value: "Module" })), huaweiStorage = "华为云存储", huaweiBucket = "桶名称", huaweiBucketPlaceholder = "请输入桶名称", huaweiEndpoint = "端点节点", huaweiEndpointPlaceholder = "请输入端点节点", huaweiAccessKey = "AccessKey", huaweiAccessKeyPlaceholder = "请输入AccessKey", huaweiSecretKey = "SecretKey", huaweiSecretKeyPlaceholder = "请输入SecretKey", huaweiEndpointTips = "", huaweiBucketTips = "", common$9 = {
  huaweiStorage,
  huaweiBucket,
  huaweiBucketPlaceholder,
  huaweiEndpoint,
  huaweiEndpointPlaceholder,
  huaweiAccessKey,
  huaweiAccessKeyPlaceholder,
  huaweiSecretKey,
  huaweiSecretKeyPlaceholder,
  huaweiEndpointTips,
  huaweiBucketTips
}, __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: common$9,
  huaweiAccessKey,
  huaweiAccessKeyPlaceholder,
  huaweiBucket,
  huaweiBucketPlaceholder,
  huaweiBucketTips,
  huaweiEndpoint,
  huaweiEndpointPlaceholder,
  huaweiEndpointTips,
  huaweiSecretKey,
  huaweiSecretKeyPlaceholder,
  huaweiStorage
}, Symbol.toStringTag, { value: "Module" })), huaweiSms = "华为云短信", huaweiSign = "短信签名", huaweiSignPlaceholder = "请输入短信签名", huaweiAppKey = "APP_KEY", huaweiAppKeyPlaceholder = "请输入APP_KEY", huaweiAppSecret = "APP_SECRET", huaweiAppSecretPlaceholder = "请输入APP_SECRET", common$8 = {
  huaweiSms,
  huaweiSign,
  huaweiSignPlaceholder,
  huaweiAppKey,
  huaweiAppKeyPlaceholder,
  huaweiAppSecret,
  huaweiAppSecretPlaceholder
}, __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: common$8,
  huaweiAppKey,
  huaweiAppKeyPlaceholder,
  huaweiAppSecret,
  huaweiAppSecretPlaceholder,
  huaweiSign,
  huaweiSignPlaceholder,
  huaweiSms
}, Symbol.toStringTag, { value: "Module" })), goodsSelectPopupSelectGoodsButton$2 = "选择项目", goodsSelectPopupSelect$2 = "已选", goodsSelectPopupPiece$2 = "个", goodsSelectPopupSelectGoodsDialog$2 = "项目选择", goodsSelectPopupAllGoods$2 = "全部项目", goodsSelectPopupSelectedGoods$1 = "已选项目", goodsSelectPopupGoodsName$2 = "目名称", goodsSelectPopupGoodsNamePlaceholder$2 = "请输入项目名称", goodsSelectPopupGoodsCategory$1 = "项目分类", goodsSelectPopupGoodsCategoryPlaceholder$1 = "全部", goodsSelectPopupGoodsType$1 = "项目类型", goodsSelectPopupGoodsTypePlaceholder$1 = "请选择项目类型", goodsSelectPopupGoodsInfo$2 = "项目", goodsSelectPopupPrice$2 = "价格", goodsSelectPopupSaleNum = "销量", goodsSelectPopupBeforeTip$2 = "已选择", goodsSelectPopupAfterTip$2 = "个项目", goodsSelectPopupClearGoods$2 = "取消选择", goodsSelectPopupGoodsMinTip$2 = "所选项目数量不能少于", goodsSelectPopupGoodsMaxTip$2 = "所选项目数量不能超过", o2oGoodsCategorySelectContentName = "分类名称", o2oGoodsCategorySelectContentImage = "分类图片", o2oSelectPopupCardInfo = "项目信息", o2oSelectPopupCardPrice = "销售价", o2oSelectPopupCardSaleNum = "销量", o2oSelectPopupCardName = "项目名称", o2oSelectPopupCardCategory = "项目分类", o2oSelectPopupCardNamePlaceholder = "请输入项目名称", o2oSelectContentTips = "所选服务项目不能少于1个", showTitle = "显示标题", searchStyle = "搜索样式", borderStyle = "边框类型", searchPlaceholder = "搜索内容", goodsFixedPrice = "指定会员价", searchContent = "搜索内容", technicianSelectPopupCardName = "技师名称", technicianSelectPopupCardMobile = "手机号", technicianSelectPopupCardNamePlaceholder = "请输入技师名称", technicianSelectPopupCardMobilePlaceholder = "请输入手机号", technicianSelectPopupCardInfo = "技师信息", technicianSelectPopupCardSeniority = "工龄", technicianSelectPopupCardSex = "性别", technicianSelectContentTips = "所选技师不能少于1个", o2oGoodsSelectContentPlaceholder = "请选择项目分类", common$7 = {
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$2,
  goodsSelectPopupSelect: goodsSelectPopupSelect$2,
  goodsSelectPopupPiece: goodsSelectPopupPiece$2,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$2,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$2,
  goodsSelectPopupSelectedGoods: goodsSelectPopupSelectedGoods$1,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$2,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$2,
  goodsSelectPopupGoodsCategory: goodsSelectPopupGoodsCategory$1,
  goodsSelectPopupGoodsCategoryPlaceholder: goodsSelectPopupGoodsCategoryPlaceholder$1,
  goodsSelectPopupGoodsType: goodsSelectPopupGoodsType$1,
  goodsSelectPopupGoodsTypePlaceholder: goodsSelectPopupGoodsTypePlaceholder$1,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$2,
  goodsSelectPopupPrice: goodsSelectPopupPrice$2,
  goodsSelectPopupSaleNum,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$2,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$2,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$2,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$2,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$2,
  o2oGoodsCategorySelectContentName,
  o2oGoodsCategorySelectContentImage,
  o2oSelectPopupCardInfo,
  o2oSelectPopupCardPrice,
  o2oSelectPopupCardSaleNum,
  o2oSelectPopupCardName,
  o2oSelectPopupCardCategory,
  o2oSelectPopupCardNamePlaceholder,
  o2oSelectContentTips,
  showTitle,
  searchStyle,
  borderStyle,
  searchPlaceholder,
  goodsFixedPrice,
  searchContent,
  technicianSelectPopupCardName,
  technicianSelectPopupCardMobile,
  technicianSelectPopupCardNamePlaceholder,
  technicianSelectPopupCardMobilePlaceholder,
  technicianSelectPopupCardInfo,
  technicianSelectPopupCardSeniority,
  technicianSelectPopupCardSex,
  technicianSelectContentTips,
  o2oGoodsSelectContentPlaceholder
}, __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  borderStyle,
  default: common$7,
  goodsFixedPrice,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$2,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$2,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$2,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$2,
  goodsSelectPopupGoodsCategory: goodsSelectPopupGoodsCategory$1,
  goodsSelectPopupGoodsCategoryPlaceholder: goodsSelectPopupGoodsCategoryPlaceholder$1,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$2,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$2,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$2,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$2,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$2,
  goodsSelectPopupGoodsType: goodsSelectPopupGoodsType$1,
  goodsSelectPopupGoodsTypePlaceholder: goodsSelectPopupGoodsTypePlaceholder$1,
  goodsSelectPopupPiece: goodsSelectPopupPiece$2,
  goodsSelectPopupPrice: goodsSelectPopupPrice$2,
  goodsSelectPopupSaleNum,
  goodsSelectPopupSelect: goodsSelectPopupSelect$2,
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$2,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$2,
  goodsSelectPopupSelectedGoods: goodsSelectPopupSelectedGoods$1,
  o2oGoodsCategorySelectContentImage,
  o2oGoodsCategorySelectContentName,
  o2oGoodsSelectContentPlaceholder,
  o2oSelectContentTips,
  o2oSelectPopupCardCategory,
  o2oSelectPopupCardInfo,
  o2oSelectPopupCardName,
  o2oSelectPopupCardNamePlaceholder,
  o2oSelectPopupCardPrice,
  o2oSelectPopupCardSaleNum,
  searchContent,
  searchPlaceholder,
  searchStyle,
  showTitle,
  technicianSelectContentTips,
  technicianSelectPopupCardInfo,
  technicianSelectPopupCardMobile,
  technicianSelectPopupCardMobilePlaceholder,
  technicianSelectPopupCardName,
  technicianSelectPopupCardNamePlaceholder,
  technicianSelectPopupCardSeniority,
  technicianSelectPopupCardSex
}, Symbol.toStringTag, { value: "Module" })), seckillHeadInfo = "头部信息", seckillProgressLabel = "进行中", seckillProgressPlaceholder = "请输入进行中文案", seckillInComingLabel = "即将开始", seckillInComingPlaceholder = "请输入即将开始文案", seckillNavSetting = "导航设置", seckillAddHeadNav = "添加导航", seckillGoodsInfo = "商品信息", seckillSelectGoodsLabel = "选择商品", seckillAllSources = "全部商品", seckillTimeSources = "选择场次", seckillManualSources = "手动选择", seckillGoodsNum = "商品数量", seckillSelectTime = "选择场次", seckillBuyBtn = "购买按钮", seckillText = "文本", seckillTextPlaceholder = "请输入文字", seckillHeadStyle = "头部样式", seckillSelectTextColor = "选中文字颜色", seckillSelectBgColor = "选中背景颜色", seckillNormalTextColor = "常规文字颜色", seckillNormalBgColor = "常规背景颜色", seckillGoodsStyle = "商品样式", seckillGoodsBgColor = "商品背景", seckillBgColor = "背景颜色", seckillRounded = "圆角", seckillSelectTimePlaceholder = "请选择场次", seckillSelectGoodsPlaceholder = "请选择秒杀商品", seckillShowWay = "展示方式", seckillWayText = "文字", seckillWayImg = "图片", seckillWayMember = "参与会员", seckillTitleLabel = "标题", seckillTitlePlaceholder = "请输入标题", seckillSubTitleContent = "副标题内容", seckillSubTitleLabel = "副标题", seckillSubTitlePlaceholder = "请输入副标题", seckillMoreContent = "“更多”内容", seckillGoodsStyleContent = "商品风格", seckillTextStyleLabel = "文本样式", seckillTextStyleNormal = "常规", seckillTextStyleItalics = "斜体", seckillImageRounded = "图片圆角", seckillBlockContent = "板块内容", seckillBgUrl = "背景图", seckillTitleColorLabel = "标题颜色", seckillSubTitleColorLabel = "副标题颜色", seckillAddBlock = "添加板块", seckillBlockStyle = "板块样式", seckillBtnContent = "按钮内容", seckillMemberInfoComponentUidTextColor = "编号颜色", seckillMemberInfoComponentAccountTextColor = "账户颜色", seckillMemberInfoComponentAccount = "账号信息", common$6 = {
  seckillHeadInfo,
  seckillProgressLabel,
  seckillProgressPlaceholder,
  seckillInComingLabel,
  seckillInComingPlaceholder,
  seckillNavSetting,
  seckillAddHeadNav,
  seckillGoodsInfo,
  seckillSelectGoodsLabel,
  seckillAllSources,
  seckillTimeSources,
  seckillManualSources,
  seckillGoodsNum,
  seckillSelectTime,
  seckillBuyBtn,
  seckillText,
  seckillTextPlaceholder,
  seckillHeadStyle,
  seckillSelectTextColor,
  seckillSelectBgColor,
  seckillNormalTextColor,
  seckillNormalBgColor,
  seckillGoodsStyle,
  seckillGoodsBgColor,
  seckillBgColor,
  seckillRounded,
  seckillSelectTimePlaceholder,
  seckillSelectGoodsPlaceholder,
  seckillShowWay,
  seckillWayText,
  seckillWayImg,
  seckillWayMember,
  seckillTitleLabel,
  seckillTitlePlaceholder,
  seckillSubTitleContent,
  seckillSubTitleLabel,
  seckillSubTitlePlaceholder,
  seckillMoreContent,
  seckillGoodsStyleContent,
  seckillTextStyleLabel,
  seckillTextStyleNormal,
  seckillTextStyleItalics,
  seckillImageRounded,
  seckillBlockContent,
  seckillBgUrl,
  seckillTitleColorLabel,
  seckillSubTitleColorLabel,
  seckillAddBlock,
  seckillBlockStyle,
  seckillBtnContent,
  seckillMemberInfoComponentUidTextColor,
  seckillMemberInfoComponentAccountTextColor,
  seckillMemberInfoComponentAccount
}, __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: common$6,
  seckillAddBlock,
  seckillAddHeadNav,
  seckillAllSources,
  seckillBgColor,
  seckillBgUrl,
  seckillBlockContent,
  seckillBlockStyle,
  seckillBtnContent,
  seckillBuyBtn,
  seckillGoodsBgColor,
  seckillGoodsInfo,
  seckillGoodsNum,
  seckillGoodsStyle,
  seckillGoodsStyleContent,
  seckillHeadInfo,
  seckillHeadStyle,
  seckillImageRounded,
  seckillInComingLabel,
  seckillInComingPlaceholder,
  seckillManualSources,
  seckillMemberInfoComponentAccount,
  seckillMemberInfoComponentAccountTextColor,
  seckillMemberInfoComponentUidTextColor,
  seckillMoreContent,
  seckillNavSetting,
  seckillNormalBgColor,
  seckillNormalTextColor,
  seckillProgressLabel,
  seckillProgressPlaceholder,
  seckillRounded,
  seckillSelectBgColor,
  seckillSelectGoodsLabel,
  seckillSelectGoodsPlaceholder,
  seckillSelectTextColor,
  seckillSelectTime,
  seckillSelectTimePlaceholder,
  seckillShowWay,
  seckillSubTitleColorLabel,
  seckillSubTitleContent,
  seckillSubTitleLabel,
  seckillSubTitlePlaceholder,
  seckillText,
  seckillTextPlaceholder,
  seckillTextStyleItalics,
  seckillTextStyleLabel,
  seckillTextStyleNormal,
  seckillTimeSources,
  seckillTitleColorLabel,
  seckillTitleLabel,
  seckillTitlePlaceholder,
  seckillWayImg,
  seckillWayMember,
  seckillWayText
}, Symbol.toStringTag, { value: "Module" })), goodsSelectPopupSelectGoodsButton$1 = "选择商品", rankSelectPopupSelectRankButton = "选择榜单", goodsSelectPopupSelect$1 = "已选", goodsSelectPopupPiece$1 = "个", goodsSelectPopupSelectGoodsDialog$1 = "商品选择", goodsSelectPopupAllGoods$1 = "全部商品", defaultGoodsSelect = "默认", goodsSelectPopupSelectedGoods = "已选商品", goodsSelectPopupGoodsName$1 = "商品名称", goodsSelectPopupGoodsNamePlaceholder$1 = "请输入商品名称", goodsSelectPopupGoodsStatusPlaceholder = "请选择商品状态", goodsSelectPopupGoodsCategory = "商品分类", goodsSelectPopupGoodsCategoryPlaceholder = "全部", goodsSelectPopupGoodsType = "商品类型", goodsSelectPopupGoodsTypePlaceholder = "请选择商品类型", goodsSelectPopupGoodsInfo$1 = "商品", goodsSelectPopupGoodsPointUnit = "积分", goodsSelectPopupGoodsPriceUnit = "元", goodsSelectPopupPrice$1 = "价格", goodsSelectPopupStock$1 = "库存", goodsSelectPopupBeforeTip$1 = "已选择", goodsSelectPopupAfterTip$1 = "个商品", goodsSelectPopupClearGoods$1 = "取消选择", goodsSelectPopupGoodsMinTip$1 = "所选商品数量不能少于", goodsSelectPopupGoodsMaxTip$1 = "所选商品数量不能超过", goodsTextColor = "文字颜色", textColor = "标题颜色", subTextColor = "副标题颜色", wayPlaceholder = "虚拟商品和实物商品只能选择其中一个类型，请重新选择", goodsStyle = "商品样式", goodsBgColor = "商品背景", goodsNameColor = "商品名称", goodsPriceColor = "销售价", goodsBtnText = "文本", goodsBtnTextPlaceholder = "请输入按钮文字", goodsSaleColor = "商品销量", goodsBtnColor = "按钮背景", goodsNumColor = "已兑人数", goodsBuyBtn = "购买按钮", goodsShowContent = "显示内容", goodsBtnResult = "按钮效果", goodsBtnIsShow = "是否显示", goodsCartIncident = "点击事件", goodsAddCart = "加入购物车", goodsBtnStyle = "样式", goodsSaleNum = "商品销量", goodsDetail = "商品详情", goodsRounded = "圆角", fenxiaoCommissionPriceColor = "分销佣金", goodsCategoryPlaceholder = "请选择商品分类", goodsPlaceholder = "请选择商品", goodsIsBold = "是否加粗", goodsLabel = "商品标签", headStyle1 = "样式1", headStyle2 = "样式2", headStyle3 = "样式3", headStyle4 = "样式4", goodsData = "商品数据", sortWay$1 = "排序", sales$1 = "销量", price$1 = "价格", manyGoodsListAroundRadius = "图片圆角", manyGoodsListCategoryName = "分类名称", manyGoodsListSubTitle = "副标题", manyGoodsLisAddItem = "添加一个多商品组", couponData = "优惠券数据", couponContent = "优惠券内容", couponTitle = "标题", couponTitlePlaceholder = "请输入标题", couponSubTitle = "副标题", couponSubTitlePlaceholder = "请输入副标题", selectCoupon = "选择优惠券", allSources = "全部", couponNum = "优惠券数量", couponPlaceholder = "请选择优惠券", couponBtnText = "按钮文字", couponBtnTextPlaceholder = "请输入按钮文字", couponTitleStyle = "标题样式", couponTitleColor = "标题颜色", couponSubTitleColor = "副标题颜色", couponItemStyle = "优惠券项样式", couponMoney = "金额颜色", manyGoodsListCategorySet = "分组设置", manyGoodsListSourceDiy = "自定义", manyGoodsListSourceCategory = "商品分类", goodsSet = "商品设置", goodsSearchSet = "搜索设置", goodsSearchText = "搜索内容", goodsSearchTextPlaceholder = "请输入搜索内容", shopMemberInfoComponentUidTextColor = "编号颜色", shopMemberInfoComponentAccountTextColor = "账户颜色", shopMemberInfoComponentAccount = "账号信息", shopGoodsRecommendComponentTag = "标签", shopGoodsRecommendComponentTagColor = "标签颜色", shopGoodsRecommendComponentTagPlaceholder = "请输入标签内容", shopGoodsRecommendComponentButtonBorderColor = "按钮边框颜色", carouselStyle = "轮播样式", recommendIndicatorStyle = "指示器设置", recommendIndicatorColor = "常规颜色", recommendIndicatorActiveColor = "选中颜色", activeCubeBlockContent = "板块内容", bgImage = "背景图片", rankingTitleIcon = "图标", rankSelect = "榜单选择", rankName = "榜单名称", rankNamePlaceholder = "请输入榜单名称", showGoodsNum = "榜单商品数量", goodsSourceName = "商品来源", ruleTypeName = "排序规则", rankTypeName = "排行周期", rankSelectPopupAfterTip = "个榜单", rankSelectPopupGoodsMinTip = "所选榜单数量不能少于", rankSelectPopupGoodsMaxTip = "所选榜单数量不能超过", rankingTitleImage = "头部图片", rankingSubTitle = "副标题", rankingSubTitleTextColor = "副标题颜色", rankTextColor = "名称颜色", rankingSubTitleLink = "副标题链接", listFrameColor = "背景颜色", topRounded = "上圆角", bottomRounded = "下圆角", imageRounded = "图片圆角", rankingStyle = "板块样式", styleRecommend = "风格推荐", countDownStyle = "倒计时样式", newcomerNumberColor = "数字颜色", newcomerNumberBg = "数字背景色", newcomerOtherColor = "文字颜色", goodsCategorySelectContentName = "分类名称", goodsCategorySelectContentImage = "分类图片", goodsCategorySelectContentPlaceholder = "请选择商品分类", couponSelectContentTitle = "优惠券名称", couponSelectContentTitlePlaceholder = "请输入优惠券名称", couponSelectContentType = "类型", couponSelectContentPrice = "面值", couponSelectContentThreshold = "使用门槛", couponSelectContentTips = "请选择优惠券", pointExchangeSelectContentTitle = "商品名称", pointExchangeSelectContentTitlePlaceholder = "请输入商品名称", pointExchangeSelectContentGoodsInfo = "商品信息", pointExchangeSelectContentPrice = "兑换价格", pointExchangeSelectContentPointUnit = "积分", pointExchangeSelectContentPriceUnit = "元", pointExchangeSelectContentRedeemedAndSurplus = "已兑/剩余", pointExchangeSelectContentTips = "请选择积分商品", categoryName = "分类名称", categoryImage = "分类图片", common$5 = {
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$1,
  rankSelectPopupSelectRankButton,
  goodsSelectPopupSelect: goodsSelectPopupSelect$1,
  goodsSelectPopupPiece: goodsSelectPopupPiece$1,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$1,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$1,
  defaultGoodsSelect,
  goodsSelectPopupSelectedGoods,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$1,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$1,
  goodsSelectPopupGoodsStatusPlaceholder,
  goodsSelectPopupGoodsCategory,
  goodsSelectPopupGoodsCategoryPlaceholder,
  goodsSelectPopupGoodsType,
  goodsSelectPopupGoodsTypePlaceholder,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$1,
  goodsSelectPopupGoodsPointUnit,
  goodsSelectPopupGoodsPriceUnit,
  goodsSelectPopupPrice: goodsSelectPopupPrice$1,
  goodsSelectPopupStock: goodsSelectPopupStock$1,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$1,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$1,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$1,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$1,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$1,
  goodsTextColor,
  textColor,
  subTextColor,
  wayPlaceholder,
  goodsStyle,
  goodsBgColor,
  goodsNameColor,
  goodsPriceColor,
  goodsBtnText,
  goodsBtnTextPlaceholder,
  goodsSaleColor,
  goodsBtnColor,
  goodsNumColor,
  goodsBuyBtn,
  goodsShowContent,
  goodsBtnResult,
  goodsBtnIsShow,
  goodsCartIncident,
  goodsAddCart,
  goodsBtnStyle,
  goodsSaleNum,
  goodsDetail,
  goodsRounded,
  fenxiaoCommissionPriceColor,
  goodsCategoryPlaceholder,
  goodsPlaceholder,
  goodsIsBold,
  goodsLabel,
  headStyle1,
  headStyle2,
  headStyle3,
  headStyle4,
  goodsData,
  sortWay: sortWay$1,
  default: "综合",
  sales: sales$1,
  price: price$1,
  manyGoodsListAroundRadius,
  manyGoodsListCategoryName,
  manyGoodsListSubTitle,
  manyGoodsLisAddItem,
  couponData,
  couponContent,
  couponTitle,
  couponTitlePlaceholder,
  couponSubTitle,
  couponSubTitlePlaceholder,
  selectCoupon,
  allSources,
  couponNum,
  couponPlaceholder,
  couponBtnText,
  couponBtnTextPlaceholder,
  couponTitleStyle,
  couponTitleColor,
  couponSubTitleColor,
  couponItemStyle,
  couponMoney,
  manyGoodsListCategorySet,
  manyGoodsListSourceDiy,
  manyGoodsListSourceCategory,
  goodsSet,
  goodsSearchSet,
  goodsSearchText,
  goodsSearchTextPlaceholder,
  shopMemberInfoComponentUidTextColor,
  shopMemberInfoComponentAccountTextColor,
  shopMemberInfoComponentAccount,
  shopGoodsRecommendComponentTag,
  shopGoodsRecommendComponentTagColor,
  shopGoodsRecommendComponentTagPlaceholder,
  shopGoodsRecommendComponentButtonBorderColor,
  carouselStyle,
  recommendIndicatorStyle,
  recommendIndicatorColor,
  recommendIndicatorActiveColor,
  activeCubeBlockContent,
  bgImage,
  rankingTitleIcon,
  rankSelect,
  rankName,
  rankNamePlaceholder,
  showGoodsNum,
  goodsSourceName,
  ruleTypeName,
  rankTypeName,
  rankSelectPopupAfterTip,
  rankSelectPopupGoodsMinTip,
  rankSelectPopupGoodsMaxTip,
  rankingTitleImage,
  rankingSubTitle,
  rankingSubTitleTextColor,
  rankTextColor,
  rankingSubTitleLink,
  listFrameColor,
  topRounded,
  bottomRounded,
  imageRounded,
  rankingStyle,
  styleRecommend,
  countDownStyle,
  newcomerNumberColor,
  newcomerNumberBg,
  newcomerOtherColor,
  goodsCategorySelectContentName,
  goodsCategorySelectContentImage,
  goodsCategorySelectContentPlaceholder,
  couponSelectContentTitle,
  couponSelectContentTitlePlaceholder,
  couponSelectContentType,
  couponSelectContentPrice,
  couponSelectContentThreshold,
  couponSelectContentTips,
  pointExchangeSelectContentTitle,
  pointExchangeSelectContentTitlePlaceholder,
  pointExchangeSelectContentGoodsInfo,
  pointExchangeSelectContentPrice,
  pointExchangeSelectContentPointUnit,
  pointExchangeSelectContentPriceUnit,
  pointExchangeSelectContentRedeemedAndSurplus,
  pointExchangeSelectContentTips,
  categoryName,
  categoryImage
}, __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activeCubeBlockContent,
  allSources,
  bgImage,
  bottomRounded,
  carouselStyle,
  categoryImage,
  categoryName,
  countDownStyle,
  couponBtnText,
  couponBtnTextPlaceholder,
  couponContent,
  couponData,
  couponItemStyle,
  couponMoney,
  couponNum,
  couponPlaceholder,
  couponSelectContentPrice,
  couponSelectContentThreshold,
  couponSelectContentTips,
  couponSelectContentTitle,
  couponSelectContentTitlePlaceholder,
  couponSelectContentType,
  couponSubTitle,
  couponSubTitleColor,
  couponSubTitlePlaceholder,
  couponTitle,
  couponTitleColor,
  couponTitlePlaceholder,
  couponTitleStyle,
  default: common$5,
  defaultGoodsSelect,
  fenxiaoCommissionPriceColor,
  goodsAddCart,
  goodsBgColor,
  goodsBtnColor,
  goodsBtnIsShow,
  goodsBtnResult,
  goodsBtnStyle,
  goodsBtnText,
  goodsBtnTextPlaceholder,
  goodsBuyBtn,
  goodsCartIncident,
  goodsCategoryPlaceholder,
  goodsCategorySelectContentImage,
  goodsCategorySelectContentName,
  goodsCategorySelectContentPlaceholder,
  goodsData,
  goodsDetail,
  goodsIsBold,
  goodsLabel,
  goodsNameColor,
  goodsNumColor,
  goodsPlaceholder,
  goodsPriceColor,
  goodsRounded,
  goodsSaleColor,
  goodsSaleNum,
  goodsSearchSet,
  goodsSearchText,
  goodsSearchTextPlaceholder,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$1,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$1,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$1,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$1,
  goodsSelectPopupGoodsCategory,
  goodsSelectPopupGoodsCategoryPlaceholder,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$1,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$1,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$1,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$1,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$1,
  goodsSelectPopupGoodsPointUnit,
  goodsSelectPopupGoodsPriceUnit,
  goodsSelectPopupGoodsStatusPlaceholder,
  goodsSelectPopupGoodsType,
  goodsSelectPopupGoodsTypePlaceholder,
  goodsSelectPopupPiece: goodsSelectPopupPiece$1,
  goodsSelectPopupPrice: goodsSelectPopupPrice$1,
  goodsSelectPopupSelect: goodsSelectPopupSelect$1,
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$1,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$1,
  goodsSelectPopupSelectedGoods,
  goodsSelectPopupStock: goodsSelectPopupStock$1,
  goodsSet,
  goodsShowContent,
  goodsSourceName,
  goodsStyle,
  goodsTextColor,
  headStyle1,
  headStyle2,
  headStyle3,
  headStyle4,
  imageRounded,
  listFrameColor,
  manyGoodsLisAddItem,
  manyGoodsListAroundRadius,
  manyGoodsListCategoryName,
  manyGoodsListCategorySet,
  manyGoodsListSourceCategory,
  manyGoodsListSourceDiy,
  manyGoodsListSubTitle,
  newcomerNumberBg,
  newcomerNumberColor,
  newcomerOtherColor,
  pointExchangeSelectContentGoodsInfo,
  pointExchangeSelectContentPointUnit,
  pointExchangeSelectContentPrice,
  pointExchangeSelectContentPriceUnit,
  pointExchangeSelectContentRedeemedAndSurplus,
  pointExchangeSelectContentTips,
  pointExchangeSelectContentTitle,
  pointExchangeSelectContentTitlePlaceholder,
  price: price$1,
  rankName,
  rankNamePlaceholder,
  rankSelect,
  rankSelectPopupAfterTip,
  rankSelectPopupGoodsMaxTip,
  rankSelectPopupGoodsMinTip,
  rankSelectPopupSelectRankButton,
  rankTextColor,
  rankTypeName,
  rankingStyle,
  rankingSubTitle,
  rankingSubTitleLink,
  rankingSubTitleTextColor,
  rankingTitleIcon,
  rankingTitleImage,
  recommendIndicatorActiveColor,
  recommendIndicatorColor,
  recommendIndicatorStyle,
  ruleTypeName,
  sales: sales$1,
  selectCoupon,
  shopGoodsRecommendComponentButtonBorderColor,
  shopGoodsRecommendComponentTag,
  shopGoodsRecommendComponentTagColor,
  shopGoodsRecommendComponentTagPlaceholder,
  shopMemberInfoComponentAccount,
  shopMemberInfoComponentAccountTextColor,
  shopMemberInfoComponentUidTextColor,
  showGoodsNum,
  sortWay: sortWay$1,
  styleRecommend,
  subTextColor,
  textColor,
  topRounded,
  wayPlaceholder
}, Symbol.toStringTag, { value: "Module" })), isBecomeFenxiao = "成为分销商", isBecomeFenxiaoDesc = "是否展示会员成为分销商的按钮", are = "是", no$1 = "否", fenxiaoName = "分销商信息", fenxiaoLevel = "分销等级", currentState = "状态", fenxiaoNamePlaceholder = "请输入分销商昵称或者手机号", common$4 = {
  isBecomeFenxiao,
  isBecomeFenxiaoDesc,
  are,
  no: no$1,
  fenxiaoName,
  fenxiaoLevel,
  currentState,
  fenxiaoNamePlaceholder
}, __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  are,
  currentState,
  default: common$4,
  fenxiaoLevel,
  fenxiaoName,
  fenxiaoNamePlaceholder,
  isBecomeFenxiao,
  isBecomeFenxiaoDesc,
  no: no$1
}, Symbol.toStringTag, { value: "Module" })), giftcardSelectPopupButton = "选择礼品卡", giftcardSelectPopupSelect = "已选", giftcardSelectPopupPiece = "张", giftcardSelectPopupSelectGiftcardDialog = "礼品卡选择", giftcardSelectPopupAllGiftcard = "全部礼品卡", giftcardSelectPopupSelectedGiftcard = "已选礼品卡", giftcardSelectPopupCardName = "礼品卡名称", giftcardSelectPopupCardNamePlaceholder = "请输入礼品卡名称", giftcardSelectPopupCardCategory = "礼品卡分类", giftcardSelectPopupCardCategoryPlaceholder = "全部", giftcardSelectPopupCardInfo = "礼品卡信息", giftcardSelectPopupCardPrice = "价格", cardRightType = "权益类型", cardRightTypePlaceholder = "请选择权益类型", validityType = "有效期", validityForever = "永久有效", giftcardSelectPopupBeforeTip = "已选择", giftcardSelectPopupAfterTip = "张礼品卡", giftcardSelectPopupClearGiftcard = "取消选择", giftcardSelectPopupGiftcardMinTip = "所选礼品卡数量不能少于", giftcardSelectPopupGiftcardMaxTip = "所选礼品卡数量不能超过", giftcardSource = "来源", giftcardNum = "数量", customGiftcard = "手动选择", giftcardCategoryTitle = "礼品卡分类", giftcardStyle = "礼品卡样式", giftcardBgColor = "礼品卡背景", giftcardNameColor = "礼品卡名称", giftcardCategoryPlaceholder = "请选择礼品卡分类", giftcardPlaceholder = "请选择礼品卡", sortWay = "排序", sales = "销量", price = "价格", refresh$1 = "刷新", refreshSuccess$1 = "刷新成功", addCategory = "添加分类", selectCardCategory = "礼品卡分类", giftcardSelectContentTips = "请选择礼品卡", common$3 = {
  giftcardSelectPopupButton,
  giftcardSelectPopupSelect,
  giftcardSelectPopupPiece,
  giftcardSelectPopupSelectGiftcardDialog,
  giftcardSelectPopupAllGiftcard,
  giftcardSelectPopupSelectedGiftcard,
  giftcardSelectPopupCardName,
  giftcardSelectPopupCardNamePlaceholder,
  giftcardSelectPopupCardCategory,
  giftcardSelectPopupCardCategoryPlaceholder,
  giftcardSelectPopupCardInfo,
  giftcardSelectPopupCardPrice,
  cardRightType,
  cardRightTypePlaceholder,
  validityType,
  validityForever,
  giftcardSelectPopupBeforeTip,
  giftcardSelectPopupAfterTip,
  giftcardSelectPopupClearGiftcard,
  giftcardSelectPopupGiftcardMinTip,
  giftcardSelectPopupGiftcardMaxTip,
  giftcardSource,
  giftcardNum,
  customGiftcard,
  giftcardCategoryTitle,
  giftcardStyle,
  giftcardBgColor,
  giftcardNameColor,
  giftcardCategoryPlaceholder,
  giftcardPlaceholder,
  sortWay,
  default: "综合",
  sales,
  price,
  refresh: refresh$1,
  refreshSuccess: refreshSuccess$1,
  addCategory,
  selectCardCategory,
  giftcardSelectContentTips
}, __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addCategory,
  cardRightType,
  cardRightTypePlaceholder,
  customGiftcard,
  default: common$3,
  giftcardBgColor,
  giftcardCategoryPlaceholder,
  giftcardCategoryTitle,
  giftcardNameColor,
  giftcardNum,
  giftcardPlaceholder,
  giftcardSelectContentTips,
  giftcardSelectPopupAfterTip,
  giftcardSelectPopupAllGiftcard,
  giftcardSelectPopupBeforeTip,
  giftcardSelectPopupButton,
  giftcardSelectPopupCardCategory,
  giftcardSelectPopupCardCategoryPlaceholder,
  giftcardSelectPopupCardInfo,
  giftcardSelectPopupCardName,
  giftcardSelectPopupCardNamePlaceholder,
  giftcardSelectPopupCardPrice,
  giftcardSelectPopupClearGiftcard,
  giftcardSelectPopupGiftcardMaxTip,
  giftcardSelectPopupGiftcardMinTip,
  giftcardSelectPopupPiece,
  giftcardSelectPopupSelect,
  giftcardSelectPopupSelectGiftcardDialog,
  giftcardSelectPopupSelectedGiftcard,
  giftcardSource,
  giftcardStyle,
  price,
  refresh: refresh$1,
  refreshSuccess: refreshSuccess$1,
  sales,
  selectCardCategory,
  sortWay,
  validityForever,
  validityType
}, Symbol.toStringTag, { value: "Module" })), contentTitle = "内容标题", contentTitlePlaceholder = "请输入内容标题", contentType = "内容类型", imageText = "图文", shortVideo = "短视频", contentTypePlaceholder = "请选择内容类型", contentCover = "内容封面", likeNum = "点赞数", shareNum = "分享数", commentNum = "评论数", viewNum = "浏览量", collectNum = "收藏数", createTime$3 = "发布时间", commentContent = "评论内容", commentContentPlaceholder = "请输入评论内容", detail = "详情", contentAuthor = "内容作者", topicName = "内容话题", content = "内容简介", cwryInfo = "宝贝信息", memberInfo = "会员信息", replyNum = "回复数", author = "作者", contentSelectContentTips = "请选择内容", common$2 = {
  contentTitle,
  contentTitlePlaceholder,
  contentType,
  imageText,
  shortVideo,
  contentTypePlaceholder,
  contentCover,
  likeNum,
  shareNum,
  commentNum,
  viewNum,
  collectNum,
  createTime: createTime$3,
  commentContent,
  commentContentPlaceholder,
  detail,
  contentAuthor,
  topicName,
  content,
  cwryInfo,
  memberInfo,
  replyNum,
  author,
  contentSelectContentTips
}, __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  author,
  collectNum,
  commentContent,
  commentContentPlaceholder,
  commentNum,
  content,
  contentAuthor,
  contentCover,
  contentSelectContentTips,
  contentTitle,
  contentTitlePlaceholder,
  contentType,
  contentTypePlaceholder,
  createTime: createTime$3,
  cwryInfo,
  default: common$2,
  detail,
  imageText,
  likeNum,
  memberInfo,
  replyNum,
  shareNum,
  shortVideo,
  topicName,
  viewNum
}, Symbol.toStringTag, { value: "Module" })), travelSelectPopupSelectTravelButton = "选择线路", travelSelectPopupSelectGoodsDialog = "线路选择", travelSelectPopupAllTravel = "全部线路", wayNameSelectPopup = "线路名称", wayNameSelectPopupPlaceholder = "请输入线路名称", wayInfoPopup = "线路信息", tourismPricePopup = "价格", tourismStockPopup = "库存", goodsSelectPopupCreateTime = "创建时间", ticketsSelectPopupSelectTicketsButton = "选择景点", ticketsSelectPopupSelectGoodsDialog = "景点选择", ticketsSelectPopupAllTickets = "全部景点", scenicNameSelectPopup = "景点名称", scenicNameSelectPopupPlaceholder = "请输入景点名称", scenicInfo = "景点信息", hotelSelectPopupSelectHotelButton = "选择酒店", hotelSelectPopupSelectGoodsDialog = "酒店选择", hotelSelectPopupAllHotel = "全部酒店", hotelNameSelectPopup = "酒店名称", hotelNameSelectPopupPlaceholder = "请输入酒店名称", hotelInfo = "酒店信息", startDate = "开始日期", endDate = "结束日期", confirm$2 = "确定", cancel$2 = "取消", travelSelectPopupAfterTip = "个线路", ticketsSelectPopupAfterTip = "个景点", hotelSelectPopupAfterTip = "个酒店", travelSelectPopupGoodsMinTip = "所选线路数量不能少于", travelSelectPopupGoodsMaxTip = "所选线路数量不能超过", ticketsSelectPopupGoodsMinTip = "所选景点数量不能少于", ticketsSelectPopupGoodsMaxTip = "所选景点数量不能超过", hotelSelectPopupGoodsMinTip = "所选酒店数量不能少于", hotelSelectPopupGoodsMaxTip = "所选酒店数量不能超过", memberPrice = "会员价", involved = "参与", noInvolved = "不参与", memberDiscount = "会员等级折扣", discount = "会员折扣", fixedDiscount = "指定折扣", nonparticipation = "不参与", discountHint = "会员折扣说明：按照默认会员等级折扣优惠", fixedDiscountHint = "指定折扣：按照设置的折扣优惠", editMemberPricePopupTitle = "编辑会员价", goodsSku = "商品规格", memberEnjoyDiscount = "会员享受折扣", discountUnit = "折", yuanUnit = "元", editMemberPrice = "修改会员价", memberLevel = "会员等级", memberPricePlaceholder = "请输入会员价", fixedPriceHint = "会员价说明：指定优惠价格", dayMemberPrice = "日历会员价", daySetting = "日期设置", batchEmptySelectedGoodsTips = "请选择要操作的数据", dateRange = "日期范围", oneStar = "一星", twoStar = "二星", threeStar = "三星", fourStar = "四星", fiveStar = "五星", hotelStar = "酒店星级", fullAddress = "酒店地址", hotelStatus = "酒店状态", scenicStar = "景点星级", scenicFullAddress = "景点地址", scenicStatus = "景点状态", wayName = "线路名称", wayInfo = "线路信息", wayNamePlaceholder = "请输入线路名称", wayCover = "线路图片", salePrice = "销售价格", wayStatus = "是否上架", startCity = "出发城市", startCityPlaceholder = "请输入出发城市", endCity = "目的地", endCityPlaceholder = "请输入目的地", feeDesc = "费用说明", createTime$2 = "添加时间", createTimePlaceholder = "请输入添加时间", addTourismWay = "添加线路", updateTourismWay = "编辑旅游线路", tourismWayDeleteTips = "确定要删除该旅游线路吗？", linePrice = "线路价格", stock = "线路库存", wayCity = "线路城市", saleArrStartDatePlaceholder = "请选择开始时间", saleArrEndDatePlaceholder = "请选择结束时间", scenicSelectContentTips = "请选择景点", waySelectContentTips = "请选择线路", hotelSelectContentTips = "请选择酒店", common$1 = {
  travelSelectPopupSelectTravelButton,
  travelSelectPopupSelectGoodsDialog,
  travelSelectPopupAllTravel,
  wayNameSelectPopup,
  wayNameSelectPopupPlaceholder,
  wayInfoPopup,
  tourismPricePopup,
  tourismStockPopup,
  goodsSelectPopupCreateTime,
  ticketsSelectPopupSelectTicketsButton,
  ticketsSelectPopupSelectGoodsDialog,
  ticketsSelectPopupAllTickets,
  scenicNameSelectPopup,
  scenicNameSelectPopupPlaceholder,
  scenicInfo,
  hotelSelectPopupSelectHotelButton,
  hotelSelectPopupSelectGoodsDialog,
  hotelSelectPopupAllHotel,
  hotelNameSelectPopup,
  hotelNameSelectPopupPlaceholder,
  hotelInfo,
  startDate,
  endDate,
  confirm: confirm$2,
  cancel: cancel$2,
  travelSelectPopupAfterTip,
  ticketsSelectPopupAfterTip,
  hotelSelectPopupAfterTip,
  travelSelectPopupGoodsMinTip,
  travelSelectPopupGoodsMaxTip,
  ticketsSelectPopupGoodsMinTip,
  ticketsSelectPopupGoodsMaxTip,
  hotelSelectPopupGoodsMinTip,
  hotelSelectPopupGoodsMaxTip,
  memberPrice,
  involved,
  noInvolved,
  memberDiscount,
  discount,
  fixedDiscount,
  nonparticipation,
  discountHint,
  fixedDiscountHint,
  editMemberPricePopupTitle,
  goodsSku,
  memberEnjoyDiscount,
  discountUnit,
  yuanUnit,
  editMemberPrice,
  memberLevel,
  memberPricePlaceholder,
  fixedPriceHint,
  dayMemberPrice,
  daySetting,
  batchEmptySelectedGoodsTips,
  dateRange,
  oneStar,
  twoStar,
  threeStar,
  fourStar,
  fiveStar,
  hotelStar,
  fullAddress,
  hotelStatus,
  scenicStar,
  scenicFullAddress,
  scenicStatus,
  wayName,
  wayInfo,
  wayNamePlaceholder,
  wayCover,
  salePrice,
  wayStatus,
  startCity,
  startCityPlaceholder,
  endCity,
  endCityPlaceholder,
  feeDesc,
  createTime: createTime$2,
  createTimePlaceholder,
  addTourismWay,
  updateTourismWay,
  tourismWayDeleteTips,
  linePrice,
  stock,
  wayCity,
  saleArrStartDatePlaceholder,
  saleArrEndDatePlaceholder,
  scenicSelectContentTips,
  waySelectContentTips,
  hotelSelectContentTips
}, __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addTourismWay,
  batchEmptySelectedGoodsTips,
  cancel: cancel$2,
  confirm: confirm$2,
  createTime: createTime$2,
  createTimePlaceholder,
  dateRange,
  dayMemberPrice,
  daySetting,
  default: common$1,
  discount,
  discountHint,
  discountUnit,
  editMemberPrice,
  editMemberPricePopupTitle,
  endCity,
  endCityPlaceholder,
  endDate,
  feeDesc,
  fiveStar,
  fixedDiscount,
  fixedDiscountHint,
  fixedPriceHint,
  fourStar,
  fullAddress,
  goodsSelectPopupCreateTime,
  goodsSku,
  hotelInfo,
  hotelNameSelectPopup,
  hotelNameSelectPopupPlaceholder,
  hotelSelectContentTips,
  hotelSelectPopupAfterTip,
  hotelSelectPopupAllHotel,
  hotelSelectPopupGoodsMaxTip,
  hotelSelectPopupGoodsMinTip,
  hotelSelectPopupSelectGoodsDialog,
  hotelSelectPopupSelectHotelButton,
  hotelStar,
  hotelStatus,
  involved,
  linePrice,
  memberDiscount,
  memberEnjoyDiscount,
  memberLevel,
  memberPrice,
  memberPricePlaceholder,
  noInvolved,
  nonparticipation,
  oneStar,
  saleArrEndDatePlaceholder,
  saleArrStartDatePlaceholder,
  salePrice,
  scenicFullAddress,
  scenicInfo,
  scenicNameSelectPopup,
  scenicNameSelectPopupPlaceholder,
  scenicSelectContentTips,
  scenicStar,
  scenicStatus,
  startCity,
  startCityPlaceholder,
  startDate,
  stock,
  threeStar,
  ticketsSelectPopupAfterTip,
  ticketsSelectPopupAllTickets,
  ticketsSelectPopupGoodsMaxTip,
  ticketsSelectPopupGoodsMinTip,
  ticketsSelectPopupSelectGoodsDialog,
  ticketsSelectPopupSelectTicketsButton,
  tourismPricePopup,
  tourismStockPopup,
  tourismWayDeleteTips,
  travelSelectPopupAfterTip,
  travelSelectPopupAllTravel,
  travelSelectPopupGoodsMaxTip,
  travelSelectPopupGoodsMinTip,
  travelSelectPopupSelectGoodsDialog,
  travelSelectPopupSelectTravelButton,
  twoStar,
  updateTourismWay,
  wayCity,
  wayCover,
  wayInfo,
  wayInfoPopup,
  wayName,
  wayNamePlaceholder,
  wayNameSelectPopup,
  wayNameSelectPopupPlaceholder,
  waySelectContentTips,
  wayStatus,
  yuanUnit
}, Symbol.toStringTag, { value: "Module" })), serve = "项目", serveNum = "项目数量", goodsInfo = "项目信息", goodsName = "项目名称", goodsNamePlaceholder = "请输入项目名称", card = "卡项", cardNum = "卡项数量", goodsSelectPopupSelectGoodsButton = "选择商品", goodsSelectPopupSelect = "已选", goodsSelectPopupPiece = "个", goodsSelectPopupSelectGoodsDialog = "商品选择", goodsSelectPopupGoodsName = "商品名称", goodsSelectPopupGoodsNamePlaceholder = "请输入商品名称", goodsSelectPopupAllGoods = "全部商品", goodsSelectPopupGoodsInfo = "商品信息", goodsSelectPopupPrice = "价格", goodsSelectPopupStock = "库存", goodsSelectPopupBeforeTip = "已选择", goodsSelectPopupAfterTip = "个商品", goodsSelectPopupClearGoods = "取消选择", goodsSelectPopupGoodsMinTip = "所选商品数量不能少于", goodsSelectPopupGoodsMaxTip = "所选商品数量不能超过", serviceSelectContentTips = "请选择项目", cardSelectContentTips = "请选择卡项", cardGoodsName = "卡项名称", cardGoodsNamePlaceholder = "请输入卡项名称", cardType = "卡项类型", cardGoodsInfo = "卡项信息", serviceSelectContentSaleNum = "销售数量", cardSelectContentSaleNum = "销售数量", common = {
  serve,
  serveNum,
  goodsInfo,
  goodsName,
  goodsNamePlaceholder,
  card,
  cardNum,
  goodsSelectPopupSelectGoodsButton,
  goodsSelectPopupSelect,
  goodsSelectPopupPiece,
  goodsSelectPopupSelectGoodsDialog,
  goodsSelectPopupGoodsName,
  goodsSelectPopupGoodsNamePlaceholder,
  goodsSelectPopupAllGoods,
  goodsSelectPopupGoodsInfo,
  goodsSelectPopupPrice,
  goodsSelectPopupStock,
  goodsSelectPopupBeforeTip,
  goodsSelectPopupAfterTip,
  goodsSelectPopupClearGoods,
  goodsSelectPopupGoodsMinTip,
  goodsSelectPopupGoodsMaxTip,
  serviceSelectContentTips,
  cardSelectContentTips,
  cardGoodsName,
  cardGoodsNamePlaceholder,
  cardType,
  cardGoodsInfo,
  serviceSelectContentSaleNum,
  cardSelectContentSaleNum
}, __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card,
  cardGoodsInfo,
  cardGoodsName,
  cardGoodsNamePlaceholder,
  cardNum,
  cardSelectContentSaleNum,
  cardSelectContentTips,
  cardType,
  default: common,
  goodsInfo,
  goodsName,
  goodsNamePlaceholder,
  goodsSelectPopupAfterTip,
  goodsSelectPopupAllGoods,
  goodsSelectPopupBeforeTip,
  goodsSelectPopupClearGoods,
  goodsSelectPopupGoodsInfo,
  goodsSelectPopupGoodsMaxTip,
  goodsSelectPopupGoodsMinTip,
  goodsSelectPopupGoodsName,
  goodsSelectPopupGoodsNamePlaceholder,
  goodsSelectPopupPiece,
  goodsSelectPopupPrice,
  goodsSelectPopupSelect,
  goodsSelectPopupSelectGoodsButton,
  goodsSelectPopupSelectGoodsDialog,
  goodsSelectPopupStock,
  serve,
  serveNum,
  serviceSelectContentSaleNum,
  serviceSelectContentTips
}, Symbol.toStringTag, { value: "Module" })), __variableDynamicImportRuntimeHelper = (r, i) => {
  const s = r[i];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((a, c) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(c.bind(null, new Error("Unknown variable dynamic import: " + i)));
  });
};
let prodManifests = {}, installedAddonKeys = [], prodReady = !1, prodInitPromise = null;
const addonModuleCache = {}, ADMIN_PREFIX = "/admin";
function adminUrl(r) {
  return !r || r.startsWith("http") || r.startsWith("/admin/") ? r : r.startsWith("/assets/") ? `${ADMIN_PREFIX}${r}` : r.startsWith("./") ? `${ADMIN_PREFIX}/assets/addons/${r.slice(2)}` : `${ADMIN_PREFIX}/${r.replace(/^\//, "")}`;
}
function addonAssetUrl(r, ...i) {
  const s = ["assets", "addons", r, ...i].join("/").replace(/\/+/g, "/");
  return `${ADMIN_PREFIX}/${s}`;
}
function resolveLangFile(r, i) {
  if (i === "/")
    return "index";
  let s = i.replace(/^(\/admin\/|\/site\/|\/)/, "").replace(/\.vue$/, "");
  return s.startsWith("views/") && (s = s.slice(6)), r && (s.startsWith(`${r}/`) ? s = s.slice(r.length + 1) : s === r && (s = "index")), s.replaceAll("/", ".");
}
function resolveRouteAddon(r) {
  if (r.meta.addon)
    return String(r.meta.addon);
  for (let i = r.matched.length - 1; i >= 0; i--) {
    const s = r.matched[i].meta.addon;
    if (s)
      return String(s);
  }
  return "";
}
function resolveRouteView(r) {
  if (r.meta.view)
    return String(r.meta.view);
  for (let i = r.matched.length - 1; i >= 0; i--) {
    const s = r.matched[i].meta.view;
    if (s)
      return String(s);
  }
  return r.path;
}
function unwrapLangPack(r) {
  if (!r || typeof r != "object")
    return {};
  const i = r;
  if (i.default && typeof i.default == "object")
    return unwrapLangPack(i.default);
  const s = {};
  for (const [a, c] of Object.entries(i))
    a === "default" || a === "__esModule" || typeof c == "string" && (s[a] = c);
  return Object.keys(s).length ? s : i;
}
function flattenLangPack(r, i) {
  const s = {};
  for (const [a, c] of Object.entries(i))
    typeof c == "string" && (s[`${r}.${a}`] = c, r === "common" && (s[a] = c));
  return s;
}
function inferAddonFromPath(r, i) {
  const a = r.replace(/^(\/admin\/|\/site\/|\/)/, "").split("/").filter(Boolean)[0];
  return a && (i != null && i.length ? i : getInstalledAddonKeys()).includes(a) ? a : "";
}
async function isAddonEntryAvailable(r) {
  try {
    const i = await fetch(adminUrl(`/assets/addons/${r}/index.js`), { method: "HEAD" });
    return i.ok ? !(i.headers.get("content-type") || "").toLowerCase().includes("text/html") : !1;
  } catch {
    return !1;
  }
}
function isAddonInstalled(r) {
  return !!r && getInstalledAddonKeys().includes(r);
}
async function loadAddonModule(r) {
  return r in addonModuleCache || (addonModuleCache[r] = (async () => {
    try {
      return await import(adminUrl(`/assets/addons/${r}/index.js`));
    } catch {
      return null;
    }
  })()), addonModuleCache[r];
}
function clearAddonModuleCache() {
  for (const r of Object.keys(addonModuleCache))
    delete addonModuleCache[r];
}
function isAddonProdReady() {
  return prodReady;
}
async function ensureAddonProdReady() {
  prodReady || await initAddonManifests();
}
async function initAddonManifests(r) {
  return prodInitPromise || (prodInitPromise = (async () => {
    prodManifests = {}, installedAddonKeys = [];
    let i = r;
    if (!(i != null && i.length))
      try {
        const a = adminUrl("/assets/addons/index.json"), c = await fetch(a);
        if (c.ok) {
          const d = await c.json();
          i = Array.isArray(d.keys) ? d.keys : [];
          const l = d.manifests;
          if (l)
            for (const [p, u] of Object.entries(l))
              prodManifests[p] = u;
        }
      } catch {
        i = [];
      }
    const s = [];
    for (const a of i || []) {
      if (prodManifests[a]) {
        await isAddonEntryAvailable(a) ? s.push(a) : delete prodManifests[a];
        continue;
      }
      if (await isAddonEntryAvailable(a)) {
        s.push(a);
        try {
          const c = adminUrl(`/assets/addons/${a}/manifest.json`), d = await fetch(c);
          d.ok && (prodManifests[a] = await d.json());
        } catch {
        }
      }
    }
    installedAddonKeys = s, prodReady = !0;
  })(), prodInitPromise);
}
function getInstalledAddonKeys() {
  return installedAddonKeys.length ? installedAddonKeys : Object.keys(prodManifests);
}
function getProdManifests() {
  return prodManifests;
}
async function preloadAllAddonLangs(r) {
  prodReady || await initAddonManifests();
  for (const i of getInstalledAddonKeys())
    try {
      const s = await loadAddonModule(i);
      if (!s)
        continue;
      const a = s.langs;
      if (!a)
        continue;
      for (const [c, d] of Object.entries(a)) {
        const l = {};
        for (const [p, u] of Object.entries(d || {}))
          Object.assign(l, flattenLangPack(p, unwrapLangPack(u)));
        Object.keys(l).length && r(c, l);
      }
    } catch {
    }
}
function registerAddonManifest(r) {
  prodManifests[r.key] = r, prodReady = !0;
}
async function loadAddonLang(r, i, s) {
  var c;
  if (!1)
    try {
    } catch {
    }
  prodReady || await initAddonManifests();
  try {
    const d = await loadAddonModule(r);
    if (d) {
      const l = d.langs, p = (c = l == null ? void 0 : l[i]) == null ? void 0 : c[s], u = unwrapLangPack(p);
      if (Object.keys(u).length)
        return u;
    }
  } catch {
  }
  const a = addonAssetUrl(r, "lang", i, `${s}.json`);
  try {
    const d = await fetch(a);
    if (d.ok)
      return await d.json();
  } catch {
  }
  return {};
}
class Language {
  //已加载的语言
  constructor(i) {
    q(this, "i18n");
    q(this, "loadLocale", []);
    this.i18n = i;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(i) {
    this.i18n.mode === "legacy" ? this.i18n.global.locale = i : this.i18n.global.locale = i;
    let s = document.querySelector("html");
    s && s.setAttribute("lang", i);
  }
  /**
   * 加载语言包
   * @param app
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(i, s, a) {
    try {
      i || (i = inferAddonFromPath(s));
      const c = resolveLangFile(i, s);
      let d = {};
      i ? d = await loadAddonLang(i, a, c) : d = (await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../app/lang/en/403.json": () => import("./403-4bc122af.js"), "../app/lang/en/auth.menu.json": () => import("./auth.menu-f5062c22.js"), "../app/lang/en/index.json": () => import("./index-c33bb386.js"), "../app/lang/en/login.json": () => import("./login-8bac8312.js"), "../app/lang/en/member.member.json": () => import("./member.member-64cd29d1.js"), "../app/lang/en/user.center.json": () => import("./user.center-78470141.js"), "../app/lang/zh-cn/403.json": () => import("./403-afb5f475.js"), "../app/lang/zh-cn/app.authorize.json": () => import("./app.authorize-7701e564.js"), "../app/lang/zh-cn/app.index.json": () => import("./app.index-ffd57c14.js"), "../app/lang/zh-cn/app.store.json": () => import("./app.store-82fccf8d.js"), "../app/lang/zh-cn/app.upgrade.json": () => import("./app.upgrade-a5fc793d.js"), "../app/lang/zh-cn/auth.log.json": () => import("./auth.log-7ab49365.js"), "../app/lang/zh-cn/auth.menu.json": () => import("./auth.menu-11f8c5be.js"), "../app/lang/zh-cn/auth.role.json": () => import("./auth.role-c93ddff5.js"), "../app/lang/zh-cn/auth.site_menu.json": () => import("./auth.site_menu-8547ef11.js"), "../app/lang/zh-cn/auth.user.json": () => import("./auth.user-4b72de7c.js"), "../app/lang/zh-cn/channel.aliapp.access.json": () => import("./channel.aliapp.access-345ff291.js"), "../app/lang/zh-cn/channel.aliapp.config.json": () => import("./channel.aliapp.config-8ba784b4.js"), "../app/lang/zh-cn/channel.aliapp.course.json": () => import("./channel.aliapp.course-11a03e9a.js"), "../app/lang/zh-cn/channel.app.access.json": () => import("./channel.app.access-4967216b.js"), "../app/lang/zh-cn/channel.app.config.json": () => import("./channel.app.config-f92838ee.js"), "../app/lang/zh-cn/channel.app.version.json": () => import("./channel.app.version-801d7c33.js"), "../app/lang/zh-cn/channel.h5.config.json": () => import("./channel.h5.config-bb100e55.js"), "../app/lang/zh-cn/channel.pc.config.json": () => import("./channel.pc.config-bbe7313f.js"), "../app/lang/zh-cn/channel.weapp.access.json": () => import("./channel.weapp.access-f5b56b8d.js"), "../app/lang/zh-cn/channel.weapp.code.json": () => import("./channel.weapp.code-e03abbd0.js"), "../app/lang/zh-cn/channel.weapp.config.json": () => import("./channel.weapp.config-62316f27.js"), "../app/lang/zh-cn/channel.weapp.course.json": () => import("./channel.weapp.course-46cdef05.js"), "../app/lang/zh-cn/channel.weapp.template.json": () => import("./channel.weapp.template-60f607e4.js"), "../app/lang/zh-cn/channel.wechat.access.json": () => import("./channel.wechat.access-3198d859.js"), "../app/lang/zh-cn/channel.wechat.config.json": () => import("./channel.wechat.config-149fe86d.js"), "../app/lang/zh-cn/channel.wechat.course.json": () => import("./channel.wechat.course-717abfc8.js"), "../app/lang/zh-cn/channel.wechat.keyword_reply_edit.json": () => import("./channel.wechat.keyword_reply_edit-736dea19.js"), "../app/lang/zh-cn/channel.wechat.menu.json": () => import("./channel.wechat.menu-08c01b06.js"), "../app/lang/zh-cn/channel.wechat.reply.json": () => import("./channel.wechat.reply-371557b9.js"), "../app/lang/zh-cn/channel.wechat.template.json": () => import("./channel.wechat.template-c7e0e856.js"), "../app/lang/zh-cn/decorate.preview.json": () => import("./decorate.preview-5f2765ef.js"), "../app/lang/zh-cn/dict.list.json": () => import("./dict.list-fdd911c6.js"), "../app/lang/zh-cn/diy.edit.json": () => import("./diy.edit-f5d8c6b1.js"), "../app/lang/zh-cn/diy.index.json": () => import("./diy.index-7d6c7cb2.js"), "../app/lang/zh-cn/diy.list.json": () => import("./diy.list-fb8d7f12.js"), "../app/lang/zh-cn/diy.member.json": () => import("./diy.member-7204bf61.js"), "../app/lang/zh-cn/diy.preview.json": () => import("./diy.preview-f8b42901.js"), "../app/lang/zh-cn/diy.route.json": () => import("./diy.route-51d664e7.js"), "../app/lang/zh-cn/diy.tabbar.json": () => import("./diy.tabbar-5a78137b.js"), "../app/lang/zh-cn/diy.tabbar_edit.json": () => import("./diy.tabbar_edit-1b67bdec.js"), "../app/lang/zh-cn/diy_form.edit.json": () => import("./diy_form.edit-5e849551.js"), "../app/lang/zh-cn/diy_form.list.json": () => import("./diy_form.list-8cc96e72.js"), "../app/lang/zh-cn/finance.account.json": () => import("./finance.account-3ebadbbb.js"), "../app/lang/zh-cn/finance.cash_out.json": () => import("./finance.cash_out-a5fc92d4.js"), "../app/lang/zh-cn/finance.offlinepay.json": () => import("./finance.offlinepay-5e4097af.js"), "../app/lang/zh-cn/finance.pay_detail.json": () => import("./finance.pay_detail-03e8534d.js"), "../app/lang/zh-cn/finance.pay_refund.json": () => import("./finance.pay_refund-33befe92.js"), "../app/lang/zh-cn/finance.refund_detail.json": () => import("./finance.refund_detail-4952f106.js"), "../app/lang/zh-cn/index.app_manage.json": () => import("./index.app_manage-8bfaebc1.js"), "../app/lang/zh-cn/index.index.json": () => import("./index.index-1daecdce.js"), "../app/lang/zh-cn/index.preview.json": () => import("./index.preview-969e67dd.js"), "../app/lang/zh-cn/index.store.json": () => import("./index.store-e2f6d3f6.js"), "../app/lang/zh-cn/login.json": () => import("./login-00d7722b.js"), "../app/lang/zh-cn/marketing.sign_config.json": () => import("./marketing.sign_config-62bde278.js"), "../app/lang/zh-cn/marketing.sign_list.json": () => import("./marketing.sign_list-2d527eb9.js"), "../app/lang/zh-cn/marketing.verifier.json": () => import("./marketing.verifier-fb68001b.js"), "../app/lang/zh-cn/marketing.verify.json": () => import("./marketing.verify-a01b4161.js"), "../app/lang/zh-cn/member.balance.json": () => import("./member.balance-7b831fb2.js"), "../app/lang/zh-cn/member.commission.json": () => import("./member.commission-6f09b642.js"), "../app/lang/zh-cn/member.growth.json": () => import("./member.growth-b8b132a4.js"), "../app/lang/zh-cn/member.label.edit.json": () => import("./member.label.edit-32f3c791.js"), "../app/lang/zh-cn/member.label.json": () => import("./member.label-d042fc75.js"), "../app/lang/zh-cn/member.level.json": () => import("./member.level-9883e926.js"), "../app/lang/zh-cn/member.level_edit.json": () => import("./member.level_edit-63ebdbf3.js"), "../app/lang/zh-cn/member.member.json": () => import("./member.member-2cc54a64.js"), "../app/lang/zh-cn/member.member_detail.json": () => import("./member.member_detail-49ebc798.js"), "../app/lang/zh-cn/member.point.json": () => import("./member.point-b9f9143f.js"), "../app/lang/zh-cn/poster.edit.json": () => import("./poster.edit-c0d45927.js"), "../app/lang/zh-cn/poster.list.json": () => import("./poster.list-6a917fd4.js"), "../app/lang/zh-cn/printer.edit.json": () => import("./printer.edit-03e2be08.js"), "../app/lang/zh-cn/printer.list.json": () => import("./printer.list-1cf7202e.js"), "../app/lang/zh-cn/printer.template_edit.json": () => import("./printer.template_edit-3092b283.js"), "../app/lang/zh-cn/printer.template_list.json": () => import("./printer.template_list-679ce0fb.js"), "../app/lang/zh-cn/setting.adminlogin.json": () => import("./setting.adminlogin-763acc1d.js"), "../app/lang/zh-cn/setting.agreement.json": () => import("./setting.agreement-ef53ab4e.js"), "../app/lang/zh-cn/setting.agreement_edit.json": () => import("./setting.agreement_edit-42ca6920.js"), "../app/lang/zh-cn/setting.cash_out.json": () => import("./setting.cash_out-b3a40561.js"), "../app/lang/zh-cn/setting.copyright.json": () => import("./setting.copyright-703776c8.js"), "../app/lang/zh-cn/setting.developer_token.json": () => import("./setting.developer_token-df8cac95.js"), "../app/lang/zh-cn/setting.export.json": () => import("./setting.export-6bcb66d7.js"), "../app/lang/zh-cn/setting.growth_rule.json": () => import("./setting.growth_rule-4682f358.js"), "../app/lang/zh-cn/setting.layout.json": () => import("./setting.layout-2d2ef354.js"), "../app/lang/zh-cn/setting.login.json": () => import("./setting.login-0e20a204.js"), "../app/lang/zh-cn/setting.map.json": () => import("./setting.map-a018c17d.js"), "../app/lang/zh-cn/setting.member.json": () => import("./setting.member-3c18afe5.js"), "../app/lang/zh-cn/setting.notice.json": () => import("./setting.notice-b12781da.js"), "../app/lang/zh-cn/setting.notice_records.json": () => import("./setting.notice_records-8b5d12a2.js"), "../app/lang/zh-cn/setting.oplatform.json": () => import("./setting.oplatform-ceddec97.js"), "../app/lang/zh-cn/setting.pay.json": () => import("./setting.pay-9d3502d5.js"), "../app/lang/zh-cn/setting.sms.json": () => import("./setting.sms-38c6ea20.js"), "../app/lang/zh-cn/setting.sms_records.json": () => import("./setting.sms_records-f32dcf96.js"), "../app/lang/zh-cn/setting.storage.json": () => import("./setting.storage-33557c9e.js"), "../app/lang/zh-cn/setting.system.json": () => import("./setting.system-533a107a.js"), "../app/lang/zh-cn/setting.transfer.json": () => import("./setting.transfer-dd7288e1.js"), "../app/lang/zh-cn/setting.transfer_scene.json": () => import("./setting.transfer_scene-a1236971.js"), "../app/lang/zh-cn/setting.weapp.json": () => import("./setting.weapp-38d65415.js"), "../app/lang/zh-cn/site.group.json": () => import("./site.group-79d11eb3.js"), "../app/lang/zh-cn/site.group_edit.json": () => import("./site.group_edit-ad4054d9.js"), "../app/lang/zh-cn/site.info.json": () => import("./site.info-3cdf0707.js"), "../app/lang/zh-cn/site.list.json": () => import("./site.list-f879a4a9.js"), "../app/lang/zh-cn/site.manage.json": () => import("./site.manage-d384cce7.js"), "../app/lang/zh-cn/site.user.json": () => import("./site.user-298548ec.js"), "../app/lang/zh-cn/site.user_info.json": () => import("./site.user_info-8949966a.js"), "../app/lang/zh-cn/tools.addon.edit.json": () => import("./tools.addon.edit-67fed17b.js"), "../app/lang/zh-cn/tools.addon.index.json": () => import("./tools.addon.index-64a332f0.js"), "../app/lang/zh-cn/tools.addon.list.json": () => import("./tools.addon.list-066ffe3b.js"), "../app/lang/zh-cn/tools.backup_records.json": () => import("./tools.backup_records-3ee06c5e.js"), "../app/lang/zh-cn/tools.code.edit.json": () => import("./tools.code.edit-ce482f8a.js"), "../app/lang/zh-cn/tools.code.index.json": () => import("./tools.code.index-2f01b5e9.js"), "../app/lang/zh-cn/tools.code.list.json": () => import("./tools.code.list-b3d1ec18.js"), "../app/lang/zh-cn/tools.detection.json": () => import("./tools.detection-2d1c5fc5.js"), "../app/lang/zh-cn/tools.schedule.json": () => import("./tools.schedule-3013f2ba.js"), "../app/lang/zh-cn/tools.schedule_log.json": () => import("./tools.schedule_log-c332642a.js"), "../app/lang/zh-cn/tools.updatecache.json": () => import("./tools.updatecache-c28011ba.js"), "../app/lang/zh-cn/tools.upgrade_records.json": () => import("./tools.upgrade_records-948f5c6a.js"), "../app/lang/zh-cn/user.center.json": () => import("./user.center-f848e53b.js"), "../app/lang/zh-cn/user.edit_center.json": () => import("./user.edit_center-86828913.js"), "../app/lang/zh-cn/wxoplatform.setting.json": () => import("./wxoplatform.setting-e351af9d.js"), "../app/lang/zh-cn/wxoplatform.weapp_version.json": () => import("./wxoplatform.weapp_version-cb21e15c.js") }), `../app/lang/${a}/${c}.json`)).default || {};
      let l = {};
      if (Object.keys(d).forEach((p) => {
        l[`${c}.${p}`] = d[p];
      }), i)
        try {
          let p = {};
          p = await loadAddonLang(i, a, "common"), Object.keys(p).forEach((u) => {
            l[u] = p[u];
          });
        } catch {
        }
      return this.i18n.global.mergeLocaleMessage(a, l), this.setI18nLanguage(a), nextTick();
    } catch {
      return this.setI18nLanguage(a), nextTick();
    }
  }
  /** 生产环境启动时预加载各插件全部语言包 */
  async preloadAddonLangs() {
    await preloadAllAddonLangs((i, s) => {
      this.i18n.global.mergeLocaleMessage(i, s);
    });
  }
}
const edit$1 = "编辑", info = "详情", createTime$1 = "创建时间", sort$1 = "排序", status$1 = "状态", operation$1 = "操作", more = "更多", statusNormal$1 = "正常", statusDeactivate$1 = "停用", startUsing = "启用", confirm$1 = "确认", save = "保存", back = "返回", cancel$1 = "取消", search = "搜索", reset = "重置", refresh = "刷新", refreshSuccess = "刷新成功", select = "选择", exportPlaceholder = "确定要导出数据吗？", exportTip = "批量导出数据", exportConfirm = "确定并导出", warning$1 = "提示", isShow$1 = "是否显示", show$1 = "显示", hidden$1 = "隐藏", icon$1 = "图标", userName = "用户名", headImg = "头像", accountNumber = "账号", accountSettings = "账号设置", realName = "名称", realNamePlaceholder = "请输入用户名称", password = "密码", confirmPassword = "确认密码", image = "图片", video = "视频", rename = "重命名", lookOver = "查看", selectAll = "全选", yes = "是", no = "否", copy = "复制", complete = "完成", copySuccess = "复制成功", notSupportCopy = "浏览器不支持一键复制，请手动进行复制", selectPlaceholder = "全部", provincePlaceholder = "请选择省", cityPlaceholder = "请选择市", districtPlaceholder = "请选择区/县", emptyData = "暂无数据", emptyQrCode = "暂无二维码", fileErr = "无法显示", upload = {
  root: "上传",
  selectimage: "选择图片",
  selectvideo: "选择视频",
  selecticon: "选择图标",
  selectnews: "选择图文",
  uploadimage: "上传图片",
  uploadvideo: "上传视频",
  addAttachmentCategory: "添加分组",
  attachmentCategoryPlaceholder: "请输入分组名称",
  attachmentEmpty: "暂无附件，请点击上传按钮上传",
  iconEmpty: "暂无图标",
  deleteCategoryTips: "确定要删除该分组吗？",
  deleteAttachmentTips: "确定要删除所选附件吗？如所选附件已被使用删除将会受到影响，请谨慎操作！",
  move: "移动",
  moveCategory: "移动分组",
  moveTo: "移动至",
  placeholderimageName: "请输入图片名称",
  placeholdervideoName: "请输入视频名称",
  placeholdericonName: "请输入图标名称",
  success: "上传成功",
  triggerUpperLimit: "可选数量已达上限",
  mediaEmpty: "暂无素材，请点击上传按钮上传"
}, tabs = {
  closeLeft: "关闭左侧",
  closeRight: "关闭右侧",
  closeOther: "关闭其他"
}, layout$1 = {
  layoutSetting: "主题设置",
  darkMode: "黑暗模式",
  sidebarMode: "主题风格",
  themeColor: "主题颜色",
  detectionLoginOperation: "确定",
  detectionLoginContent: "已检测到有其他账号登录，需要刷新后才能继续操作。",
  detectionLoginTip: "提示",
  layoutStyle: "布局风格",
  tab: "开启标签栏"
}, axios$1 = {
  400: "错误的请求",
  401: "请重新登录",
  403: "拒绝访问",
  404: "请求错误",
  405: "请求方法未允许",
  408: "请求超时",
  409: "请求跨域",
  500: "服务器内部错误",
  501: "网络未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
  505: "http版本不支持该请求",
  unknownError: "未知错误",
  timeout: "网络请求超时！",
  requestError: "请求错误",
  errNetwork: "网络请求错误",
  baseUrlError: " 接口请求错误,请检查VITE_APP_BASE_URL参数配置或者伪静态配置, <a style='text-decoration: underline;' href='https://www.kancloud.cn/niucloud/niucloud-admin-develop/3213750' target='blank'>点击查看相关手册</a>"
}, linkPlaceholder = "请选择跳转链接", selectLinkTips = "链接选择", diyLinkName = "链接名称", diyLinkNamePlaceholder = "请输入链接名称", diyLinkNameNotEmpty = "链接名称不能为空", diyLinkUrl = "跳转路径", diyLinkUrlPlaceholder = "请输入跳转路径", diyLinkUrlNotEmpty = "跳转路径不能为空", diyAppletId = "小程序AppID", diyAppletIdPlaceholder = "请输入要打开的小程序的appid", diyAppletIdNotEmpty = "小程序AppID不能为空", diyAppletPage = "小程序路径", diyAppletPagePlaceholder = "请输入要打开的小程序路径", diyAppletPageNotEmpty = "小程序路径不能为空", diyMakePhone = "电话号码", diyMakePhonePlaceholder = "请输入电话号码", diyMakePhoneNotEmpty = "电话号码不能为空", returnToPreviousPage = "返回", preview = "预览", emptyApp = "暂未安装任何应用", newInfo = "最新消息", visitWap = "访问店铺", mapSetting = "地图设置", mapKey = "腾讯地图KEY", indexTemplate = "首页模版", indexSwitch = "切换首页", indexWarning = "你确定要切换首页吗？", originalPassword = "原始密码", newPassword = "新密码", passwordCopy = "确认密码", passwordTip = "修改密码时必填.不修改密码时留空", originalPasswordPlaceholder = "请输入原始密码", passwordPlaceholder = "请输入新密码", originalPasswordHint = "原始密码不能为空", newPasswordHint = "请输入确认密码", doubleCipherHint = "两次新密码不同", confirmPasswordError = "两次新密码不同", upgrade = {
  upgradeButton: "立即升级",
  title: "升级",
  upgradingTips: "有正在执行的升级任务，",
  clickView: "点击查看",
  dirPermission: "目录读写权限",
  path: "路径",
  demand: "要求",
  readable: "可读",
  write: "可写",
  upgradeSuccess: "升级成功",
  localBuild: "本地编译",
  cloudBuild: "重试",
  rollback: "回滚",
  showDialogCloseTips: "升级任务尚未完成，关闭将取消升级，是否要继续关闭？",
  upgradeCompleteTips: "升级完成后还必须要重新编译admin wap web端，以免影响到程序正常运行。",
  upgradeTips: "应用和插件升级时，系统会自动备份当前程序及数据库。升级功能不会造成您当前程序的损坏或者数据的丢失，请放心使用，但是升级过程可能会因为兼容性等各种原因出现意外的升级错误，当出现错误时，系统将会自动回退上一版本！若回退失败，请参考链接<a href='https://www.kancloud.cn/niushop/niushop_v6/3228611' target='_blank' class='text-primary'> https://www.kancloud.cn/niushop/niushop_v6/3228611 </a>手动回退上一版本!",
  knownToKnow: "我已知晓，不需要再次提示",
  cloudBuildErrorTips: "一键云编译队列任务过多，请等待几分钟后重试！",
  isNeedBackup: "是否需要备份",
  isNeedBackupTips: "检测到已存在备份，此次升级是否需要备份，不需要备份在升级出现异常时将会恢复最近的一次备份。",
  isNeedBackupBtn: "查看备份记录",
  option: "选项",
  isNeedCloudbuild: "是否需要云编译",
  cloudbuildTips: "此次升级的同时是否需要进行云编译"
}, cloudbuild = {
  title: "云编译",
  executingTips: "有正在执行的编译任务，",
  clickView: "点击查看",
  dirPermission: "目录读写权限",
  path: "路径",
  demand: "要求",
  readable: "可读",
  write: "可写",
  cloudbuildSuccess: "编译完成",
  showDialogCloseTips: "编译任务尚未完成，关闭将取消编译，是否要继续关闭？"
}, formSelectContentTitle = "表单名称", formSelectContentTitlePlaceholder = "请输入表单名称", formSelectContentTypeName = "表单类型", formSelectContentTypeNamePlaceholder = "请选择表单类型", formSelectContentTypeAll = "全部", formSelectContentTips = "请选择表单", appName = "应用名/版本信息", appIdentification = "应用标识", introduction = "简介", type = "类型", localAppText = "插件管理", upgrade2 = "升级", installLabel = "已安装", uninstalledLabel = "未安装", buyLabel = "已购买", cloudBuild$1 = "云编译", newVersion = "最新版本", tipText = "标识指开发应用或插件的文件夹名称", gxx = "更新信息", nextStep = "下一步", prev = "上一步", viewUpgradeContent = "查看升级内容", testDirectoryPermissions = "检测目录权限", backupFiles = "备份文件", startUpgrade = "开始升级", upgradeEnd = "升级完成", cloudBuildTips = "是否要进行云编译该操作可能会影响到正在访问的客户是否要继续操作？", promoteUrl = "推广链接", downLoadQRCode = "下载二维码", configureFailed = "配置失败", lefttitle = "左侧标题", righttitle = "右侧标题", leftDesc = "左侧简介", rightDesc = "右侧简介", descPlaceholder = "请输入简介内容", zhCn = {
  edit: edit$1,
  delete: "删除",
  info,
  createTime: createTime$1,
  sort: sort$1,
  status: status$1,
  operation: operation$1,
  more,
  statusNormal: statusNormal$1,
  statusDeactivate: statusDeactivate$1,
  startUsing,
  confirm: confirm$1,
  save,
  back,
  cancel: cancel$1,
  search,
  reset,
  refresh,
  refreshSuccess,
  select,
  export: "导出列表",
  exportPlaceholder,
  exportTip,
  exportConfirm,
  warning: warning$1,
  isShow: isShow$1,
  show: show$1,
  hidden: hidden$1,
  icon: icon$1,
  userName,
  headImg,
  accountNumber,
  accountSettings,
  realName,
  realNamePlaceholder,
  password,
  confirmPassword,
  image,
  video,
  rename,
  lookOver,
  selectAll,
  yes,
  no,
  copy,
  complete,
  copySuccess,
  notSupportCopy,
  selectPlaceholder,
  provincePlaceholder,
  cityPlaceholder,
  districtPlaceholder,
  emptyData,
  emptyQrCode,
  fileErr,
  upload,
  tabs,
  layout: layout$1,
  axios: axios$1,
  linkPlaceholder,
  selectLinkTips,
  diyLinkName,
  diyLinkNamePlaceholder,
  diyLinkNameNotEmpty,
  diyLinkUrl,
  diyLinkUrlPlaceholder,
  diyLinkUrlNotEmpty,
  diyAppletId,
  diyAppletIdPlaceholder,
  diyAppletIdNotEmpty,
  diyAppletPage,
  diyAppletPagePlaceholder,
  diyAppletPageNotEmpty,
  diyMakePhone,
  diyMakePhonePlaceholder,
  diyMakePhoneNotEmpty,
  returnToPreviousPage,
  preview,
  emptyApp,
  newInfo,
  visitWap,
  mapSetting,
  mapKey,
  indexTemplate,
  indexSwitch,
  indexWarning,
  originalPassword,
  newPassword,
  passwordCopy,
  passwordTip,
  originalPasswordPlaceholder,
  passwordPlaceholder,
  originalPasswordHint,
  newPasswordHint,
  doubleCipherHint,
  confirmPasswordError,
  upgrade,
  cloudbuild,
  formSelectContentTitle,
  formSelectContentTitlePlaceholder,
  formSelectContentTypeName,
  formSelectContentTypeNamePlaceholder,
  formSelectContentTypeAll,
  formSelectContentTips,
  appName,
  appIdentification,
  introduction,
  type,
  localAppText,
  upgrade2,
  installLabel,
  uninstalledLabel,
  buyLabel,
  cloudBuild: cloudBuild$1,
  newVersion,
  tipText,
  gxx,
  return: "返回",
  nextStep,
  prev,
  viewUpgradeContent,
  testDirectoryPermissions,
  backupFiles,
  startUpgrade,
  upgradeEnd,
  cloudBuildTips,
  promoteUrl,
  downLoadQRCode,
  configureFailed,
  lefttitle,
  righttitle,
  leftDesc,
  rightDesc,
  descPlaceholder
}, edit = "Edit", createTime = "Create Time", sort = "Sort", status = "Status", operation = "Operation", statusNormal = "Normal", statusDeactivate = "Deactivate", confirm = "Confirm", cancel = "Cancel", warning = "Warning", isShow = "Show or not", show = "show", hidden = "hidden", icon = "Icon", layout = {
  layoutSetting: "Layout configuration",
  darkMode: "Dark mode",
  themeColor: "Theme color"
}, axios = {
  400: "Wrong request            ",
  401: "Please login again",
  403: "Access denied",
  404: "Request error, the resource was not found",
  405: "Request method not allowed",
  408: "Request timeout",
  500: "Server side error",
  501: "Network not implemented",
  502: "Network error",
  503: "Service unavailable",
  504: "Network Timeout",
  505: "The http version does not support the request",
  unknownError: "Unknown Error",
  timeout: "Network request timeout!"
}, en = {
  edit,
  delete: "Delete",
  createTime,
  sort,
  status,
  operation,
  statusNormal,
  statusDeactivate,
  confirm,
  cancel,
  warning,
  isShow,
  show,
  hidden,
  icon,
  layout,
  axios
};
let i18n = createI18n({
  locale: "zh-cn",
  fallbackLocale: "zh-cn",
  datetimeFormats: {},
  numberFormats: {},
  globalInjection: !0,
  //是否全局注入
  silentTranslationWarn: !0,
  messages: {
    "zh-cn": zhCn,
    en
  },
  silentFallbackWarn: !0
});
const language = new Language(i18n);
var nprogressExports = {}, nprogress = {
  get exports() {
    return nprogressExports;
  },
  set exports(r) {
    nprogressExports = r;
  }
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(r, i) {
  (function(s, a) {
    r.exports = a();
  })(commonjsGlobal, function() {
    var s = {};
    s.version = "0.2.0";
    var a = s.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    s.configure = function(h) {
      var _, y;
      for (_ in h)
        y = h[_], y !== void 0 && h.hasOwnProperty(_) && (a[_] = y);
      return this;
    }, s.status = null, s.set = function(h) {
      var _ = s.isStarted();
      h = c(h, a.minimum, 1), s.status = h === 1 ? null : h;
      var y = s.render(!_), S = y.querySelector(a.barSelector), b = a.speed, P = a.easing;
      return y.offsetWidth, p(function(C) {
        a.positionUsing === "" && (a.positionUsing = s.getPositioningCSS()), u(S, l(h, b, P)), h === 1 ? (u(y, {
          transition: "none",
          opacity: 1
        }), y.offsetWidth, setTimeout(function() {
          u(y, {
            transition: "all " + b + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            s.remove(), C();
          }, b);
        }, b)) : setTimeout(C, b);
      }), this;
    }, s.isStarted = function() {
      return typeof s.status == "number";
    }, s.start = function() {
      s.status || s.set(0);
      var h = function() {
        setTimeout(function() {
          s.status && (s.trickle(), h());
        }, a.trickleSpeed);
      };
      return a.trickle && h(), this;
    }, s.done = function(h) {
      return !h && !s.status ? this : s.inc(0.3 + 0.5 * Math.random()).set(1);
    }, s.inc = function(h) {
      var _ = s.status;
      return _ ? (typeof h != "number" && (h = (1 - _) * c(Math.random() * _, 0.1, 0.95)), _ = c(_ + h, 0, 0.994), s.set(_)) : s.start();
    }, s.trickle = function() {
      return s.inc(Math.random() * a.trickleRate);
    }, function() {
      var h = 0, _ = 0;
      s.promise = function(y) {
        return !y || y.state() === "resolved" ? this : (_ === 0 && s.start(), h++, _++, y.always(function() {
          _--, _ === 0 ? (h = 0, s.done()) : s.set((h - _) / h);
        }), this);
      };
    }(), s.render = function(h) {
      if (s.isRendered())
        return document.getElementById("nprogress");
      v(document.documentElement, "nprogress-busy");
      var _ = document.createElement("div");
      _.id = "nprogress", _.innerHTML = a.template;
      var y = _.querySelector(a.barSelector), S = h ? "-100" : d(s.status || 0), b = document.querySelector(a.parent), P;
      return u(y, {
        transition: "all 0 linear",
        transform: "translate3d(" + S + "%,0,0)"
      }), a.showSpinner || (P = _.querySelector(a.spinnerSelector), P && w(P)), b != document.body && v(b, "nprogress-custom-parent"), b.appendChild(_), _;
    }, s.remove = function() {
      g(document.documentElement, "nprogress-busy"), g(document.querySelector(a.parent), "nprogress-custom-parent");
      var h = document.getElementById("nprogress");
      h && w(h);
    }, s.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, s.getPositioningCSS = function() {
      var h = document.body.style, _ = "WebkitTransform" in h ? "Webkit" : "MozTransform" in h ? "Moz" : "msTransform" in h ? "ms" : "OTransform" in h ? "O" : "";
      return _ + "Perspective" in h ? "translate3d" : _ + "Transform" in h ? "translate" : "margin";
    };
    function c(h, _, y) {
      return h < _ ? _ : h > y ? y : h;
    }
    function d(h) {
      return (-1 + h) * 100;
    }
    function l(h, _, y) {
      var S;
      return a.positionUsing === "translate3d" ? S = { transform: "translate3d(" + d(h) + "%,0,0)" } : a.positionUsing === "translate" ? S = { transform: "translate(" + d(h) + "%,0)" } : S = { "margin-left": d(h) + "%" }, S.transition = "all " + _ + "ms " + y, S;
    }
    var p = function() {
      var h = [];
      function _() {
        var y = h.shift();
        y && y(_);
      }
      return function(y) {
        h.push(y), h.length == 1 && _();
      };
    }(), u = function() {
      var h = ["Webkit", "O", "Moz", "ms"], _ = {};
      function y(C) {
        return C.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(k, E) {
          return E.toUpperCase();
        });
      }
      function S(C) {
        var k = document.body.style;
        if (C in k)
          return C;
        for (var E = h.length, $ = C.charAt(0).toUpperCase() + C.slice(1), T; E--; )
          if (T = h[E] + $, T in k)
            return T;
        return C;
      }
      function b(C) {
        return C = y(C), _[C] || (_[C] = S(C));
      }
      function P(C, k, E) {
        k = b(k), C.style[k] = E;
      }
      return function(C, k) {
        var E = arguments, $, T;
        if (E.length == 2)
          for ($ in k)
            T = k[$], T !== void 0 && k.hasOwnProperty($) && P(C, $, T);
        else
          P(C, E[1], E[2]);
      };
    }();
    function m(h, _) {
      var y = typeof h == "string" ? h : f(h);
      return y.indexOf(" " + _ + " ") >= 0;
    }
    function v(h, _) {
      var y = f(h), S = y + _;
      m(y, _) || (h.className = S.substring(1));
    }
    function g(h, _) {
      var y = f(h), S;
      m(h, _) && (S = y.replace(" " + _ + " ", " "), h.className = S.substring(1, S.length - 1));
    }
    function f(h) {
      return (" " + (h.className || "") + " ").replace(/\s+/gi, " ");
    }
    function w(h) {
      h && h.parentNode && h.parentNode.removeChild(h);
    }
    return s;
  });
})(nprogress, nprogressExports);
const NProgress = nprogressExports, useAppStore = defineStore("app", {
  state: () => ({
    route: {},
    routeRefreshTag: !0,
    pageReturn: !1
  }),
  actions: {
    refreshRouterView() {
      this.routeRefreshTag = !1, NProgress.start(), nextTick(() => {
        this.routeRefreshTag = !0, NProgress.done();
      });
    }
  }
});
function currentRoute() {
  return getCurrentInstance() ? useRoute() : useAppStore().route;
}
const t$1 = (r) => {
  const i = currentRoute();
  let s = resolveRouteAddon(i);
  const a = resolveRouteView(i);
  s || (s = inferAddonFromPath(a));
  const d = `${resolveLangFile(s, a)}.${r}`;
  return i18n.global.t(d) != d ? i18n.global.t(d) : i18n.global.t(r);
}, index$a = {
  install(r) {
    r.use(i18n);
  }
};
function login(r, i) {
  return request.get(`login/${i}`, { params: r });
}
function logout() {
  return request.put("auth/logout", {}, { showErrorMessage: !1 });
}
function getAuthMenus(r) {
  return request.get("auth/authmenu", { params: r });
}
function getSiteInfo$1() {
  return request.get("auth/site");
}
function getLoginConfig$1() {
  return request.get("login/config");
}
function getVersions() {
  return request.get("sys/info");
}
function getInfo() {
  return request.get("sys/role");
}
function getUrl() {
  return request.get("sys/url");
}
function getRoleList(r) {
  return request.get("sys/role", { params: r });
}
function getRoleInfo(r) {
  return request.get(`sys/role/${r}`);
}
function addRole(r) {
  return request.post("sys/role", r, { showSuccessMessage: !0 });
}
function editRole(r) {
  return request.put(`sys/role/${r.role_id}`, r, { showSuccessMessage: !0 });
}
function deleteRole(r) {
  return request.delete(`sys/role/${r}`, { showSuccessMessage: !0 });
}
function modifyRoleStatus(r) {
  return request.put("sys/role/status", r, { showSuccessMessage: !0 });
}
function allRole() {
  return request.get("sys/role/all");
}
function getMenus(r) {
  return request.get(`sys/menu/${r}`);
}
function getMenuInfo(r, i) {
  return request.get(`sys/menu/${r}/info/${i}`);
}
function addMenu(r) {
  return request.post("sys/menu", r, { showSuccessMessage: !0 });
}
function editMenu(r) {
  return request.put(`sys/menu/${r.app_type}/${r.menu_key}`, r, { showSuccessMessage: !0 });
}
function deleteMenu(r, i) {
  return request.delete(`sys/menu/${r}/${i}`, { showSuccessMessage: !0 });
}
function getSystemMenu() {
  return request.get("sys/menu/system_menu");
}
function getAddonMenu(r) {
  return request.get(`sys/menu/addon_menu/${r}`);
}
function getMenuByTypeDir(r = "system") {
  return request.get(`sys/menu/dir/${r}`);
}
function getSiteMenus() {
  return request.get("site/site/menu");
}
function getWebsite() {
  return request.get("sys/config/website");
}
function getWebConfig() {
  return request.get("sys/web/website");
}
function getWebCopyright() {
  return request.get("sys/web/copyright");
}
function setWebsite(r) {
  return request.put("sys/config/website", r, { showSuccessMessage: !0 });
}
function getCopyright() {
  return request.get("sys/config/copyright");
}
function getService() {
  return request.get("sys/config/service");
}
function setCopyright(r) {
  return request.put("sys/config/copyright", r, { showSuccessMessage: !0 });
}
function getAttachmentCategoryList(r) {
  return request.get("sys/attachment/category", { params: r });
}
function addAttachmentCategory(r) {
  return request.post("sys/attachment/category", r, { showSuccessMessage: !0 });
}
function editAttachmentCategory(r) {
  return request.put(`sys/attachment/category/${r.id}`, r, { showSuccessMessage: !0 });
}
function deleteAttachmentCategory(r) {
  return request.delete(`sys/attachment/category/${r}`, { showSuccessMessage: !0 });
}
function getAttachmentList(r) {
  return request.get("sys/attachment", { params: r });
}
function deleteAttachment(r) {
  return request.delete("sys/attachment/del", { data: r, showSuccessMessage: !0 });
}
function moveAttachment(r) {
  return request.put("sys/attachment/batchmove", r);
}
function getAuthMenu() {
  return request.get("auth/site/showmenu");
}
function getEnv() {
  return request.get("sys/env");
}
function getAreaListByPid(r = 0) {
  return request.get(`sys/area/list_by_pid/${r}`);
}
function getAreatree(r = 1) {
  return request.get(`sys/area/tree/${r}`);
}
function getAddressInfo(r) {
  return request.get("sys/area/get_info", { params: r });
}
function getContraryAddress(r) {
  return request.get("sys/area/contrary", { params: r });
}
function getAreaByCode(r) {
  return request.get(`sys/area/code/${r}`);
}
function getStorageList() {
  return request.get("sys/storage");
}
function getStorageInfo(r) {
  return request.get(`sys/storage/${r}`);
}
function editStorage(r) {
  return request.put(`sys/storage/${r.storage_type}`, r, { showSuccessMessage: !0 });
}
function getPayConfig(r) {
  return request.get(`pay/config/${r}`);
}
function setPayConfig(r) {
  return request.put(`pay/config/${r.type}`, r, { showSuccessMessage: !0 });
}
function getPayList$1() {
  return request.get("pay/lists");
}
function getTransferInfo(r) {
  return request.get(`pay/channel/lists/${r}`);
}
function setTransferInfo(r) {
  return request.post("pay/channel/set/transfer", r, { showSuccessMessage: !0 });
}
function getCronList(r) {
  return request.get("sys/schedule/list", { params: r });
}
function getCronInfo(r) {
  return request.get(`sys/cron/${r}`);
}
function getCronTemplate() {
  return request.get("sys/schedule/template");
}
function getCronDateType() {
  return request.get("sys/schedule/datetype");
}
function getWeek() {
  return request.get("sys/date/week");
}
function addCron(r) {
  return request.post("sys/schedule", r, { showSuccessMessage: !0 });
}
function editCron(r) {
  return request.put(`sys/schedule/${r.id}`, r, { showSuccessMessage: !0 });
}
function deleteCron(r) {
  return request.delete(`sys/schedule/${r}`, { showSuccessMessage: !0 });
}
function doCron(r) {
  return request.put(`sys/schedule/do/${r.id}`, r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getCronLogList(r) {
  return request.get("sys/schedule/log/list", { params: r });
}
function deleteCronLog(r) {
  return request.put("sys/schedule/log/delete", r, { showSuccessMessage: !0 });
}
function clearCronLog(r) {
  return request.put("sys/schedule/log/clear", r, { showSuccessMessage: !0 });
}
function resetCron() {
  return request.post("sys/schedule/reset", { showSuccessMessage: !0 });
}
function getAgreementList() {
  return request.get("sys/agreement");
}
function getAgreementInfo(r) {
  return request.get(`sys/agreement/${r}`);
}
function editAgreement(r) {
  return request.put(`sys/agreement/${r.key}`, r, { showSuccessMessage: !0 });
}
function getChannelType() {
  return request.get("sys/channel");
}
function getSceneDomain() {
  return request.get("sys/scene_domain");
}
function getConfigLogin() {
  return request.get("sys/config/login");
}
function setConfigLogin(r) {
  return request.put("sys/config/login", r, { showSuccessMessage: !0 });
}
function getPayConfigList() {
  return request.get("pay/channel/lists");
}
function setPatConfig(r) {
  return request.post("pay/channel/set/all", r, { showSuccessMessage: !0 });
}
function menuRefresh() {
  return request.post("sys/menu/refresh", {});
}
function clearSchemaCache() {
  return request.post("sys/schema/clear", {}, { showSuccessMessage: !0 });
}
function clearCache() {
  return request.post("sys/cache/clear", {}, { showSuccessMessage: !0 });
}
function getAppMange() {
  return request.get("sys/applist");
}
function setMap(r) {
  return request.put("sys/config/map", r, { showSuccessMessage: !0 });
}
function getMap(r) {
  return request.get("sys/config/map", { params: r });
}
function getPayAuditList(r) {
  return request.get("pay/audit", { params: r });
}
function payAuditPass(r) {
  return request.put(`pay/pass/${r}`, {}, { showSuccessMessage: !0 });
}
function payAuditRefuse(r) {
  return request.put(`pay/refuse/${r.out_trade_no}`, r, { showSuccessMessage: !0 });
}
function getPayDetail(r) {
  return request.get(`pay/detail/${r}`);
}
function getAddonList() {
  return request.get("app/getAddonList");
}
function getDeveloperToken() {
  return request.get("sys/config/developer_token");
}
function setDeveloperToken(r) {
  return request.put("sys/config/developer_token", r, { showSuccessMessage: !0 });
}
function getWebsiteLayout() {
  return request.get("sys/web/layout");
}
function getLayout() {
  return request.get("sys/config/layout");
}
function setLayout(r) {
  return request.put("sys/config/layout", r, { showSuccessMessage: !0 });
}
function getThemecolor() {
  return request.get("sys/config/themecolor");
}
function setThemecolor(r) {
  return request.put("sys/config/themecolor", r);
}
function getExportList(r) {
  return request.get("sys/export", { params: r });
}
function getExportStatusList() {
  return request.get("sys/export/status");
}
function getExportKeyList() {
  return request.get("sys/export/type");
}
function exportData(r, i) {
  return request.get(`sys/export/${r}`, { params: i });
}
function exportDataCheck(r, i) {
  return request.get(`sys/export/check/${r}`, { params: i });
}
function deleteExport(r) {
  return request.delete(`sys/export/${r}`, { showSuccessMessage: !0 });
}
function getWxoplatform() {
  return request.get("sys/wxoplatform/config");
}
function getQrcode(r) {
  return request.get("sys/qrcode", { params: r, showErrorMessage: !1 });
}
function checkJobStatus() {
  return request.get("sys/job");
}
const theme = storage.get("theme") ?? {}, useSystemStore = defineStore("system", {
  state: () => ({
    menuIsCollapse: !1,
    menuDrawer: !1,
    dark: theme.dark ?? !1,
    theme: theme.theme ?? "#273de3",
    sidebar: theme.sidebar ?? "oneType",
    lang: storage.get("lang") ?? "zh-cn",
    sidebarStyle: theme.sidebarStyle ?? "threeType",
    currHeadMenuName: "",
    website: {},
    layoutConfig: {},
    tab: storage.get("tab") ?? !1
  }),
  actions: {
    setHeadMenu(r) {
      this.currHeadMenuName = r;
    },
    setTheme(r, i) {
      this[r] = i, theme[r] = i, storage.set({ key: "theme", data: theme });
    },
    toggleMenuCollapse(r) {
      this.menuIsCollapse = r, storage.set({ key: "menuiscollapse", data: r }), useCssVar("--aside-width").value = r ? "calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)" : "210px";
    },
    async getWebsiteInfo() {
      await getWebConfig().then(({ data: r }) => {
        this.website = r;
      }).catch(() => {
      });
    },
    async getWebsiteLayout() {
      await getWebsiteLayout().then(({ data: r }) => {
        this.layoutConfig = r;
      }).catch(() => {
      });
    }
  }
}), _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(r) {
    const a = Object.assign(/* @__PURE__ */ Object.assign({ "./admin/index.vue": () => import("./index-9efc8f4a.js"), "./admin_simplicity/index.vue": () => import("./index-3d70eae0.js"), "./bussiness/index.vue": () => import("./index-227d9693.js"), "./darkside/index.vue": () => import("./index-9cc2c2c4.js"), "./decorate/index.vue": () => Promise.resolve().then(() => index$8), "./default/index.vue": () => import("./index-d36da650.js"), "./lightside/index.vue": () => import("./index-eef5c3d5.js"), "./profession/index.vue": () => import("./index-7d422367.js"), "./routine/index.vue": () => import("./index-d895eef4.js") }), /* @__PURE__ */ Object.assign({ "/src/addon/home_service/layout/index.vue": () => import("./index-8c10629e.js"), "/src/addon/o2o/layout/index.vue": () => import("./index-1ad78c96.js"), "/src/addon/shop/layout/index.vue": () => import("./index-b0ffb798.js"), "/src/addon/tourism/layout/index.vue": () => import("./index-7da0b282.js"), "/src/addon/vipcard/layout/index.vue": () => import("./index-3f1aed28.js") }));
    let c = "default";
    switch (getAppType()) {
      case "admin":
        c = storage.get("admin_layout") || "admin";
        break;
      default:
        const l = useUserStore().siteInfo;
        if (l && l.apps) {
          const p = useSystemStore().layoutConfig;
          l.apps.length == 1 ? p[l.apps[0].key] != null && (c = p[l.apps[0].key]) : p.system != null && (c = p.system);
        }
    }
    const d = ref(null);
    return Object.keys(a).forEach((l) => {
      l.indexOf(`/${c}/`) !== -1 && (d.value = markRaw(defineAsyncComponent(a[l])));
    }), !d.value && (d.value = markRaw(defineAsyncComponent(a["./default/index.vue"]))), provide("setLayout", (l) => {
      c != l && (c = l, Object.keys(a).forEach((p) => {
        p.indexOf(`/${l}/`) !== -1 && (d.value = markRaw(defineAsyncComponent(a[p])));
      }));
    }), (l, p) => (openBlock(), createBlock(resolveDynamicComponent(d.value)));
  }
}), index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" })), _export_sfc = (r, i) => {
  const s = r.__vccOpts || r;
  for (const [a, c] of i)
    s[a] = c;
  return s;
}, _sfc_main$4 = {};
function _sfc_render(r, i) {
  const s = resolveComponent("router-view"), a = resolveComponent("el-container");
  return openBlock(), createBlock(a, { class: "w-screen h-screen min-w-[1200px]" }, {
    default: withCtx(() => [
      createVNode(s)
    ]),
    _: 1
  });
}
const Decorate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]), index$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Decorate
}, Symbol.toStringTag, { value: "Module" }));
function clearAddonStyleCache() {
  document.querySelectorAll("style[data-addon-style]").forEach((r) => r.remove()), clearAddonModuleCache();
}
const load404 = () => import("./404-911cf06c.js"), allAddonVueModules$1 = /* @__PURE__ */ Object.assign({ "../addon/cms/views/article/category.vue": () => import("./category-24ca72c5.js"), "../addon/cms/views/article/components/edit-category.vue": () => import("./edit-category-6a0ca7ec.js"), "../addon/cms/views/article/edit.vue": () => import("./edit-9953d7a3.js"), "../addon/cms/views/article/list.vue": () => import("./list-bb70d698.js"), "../addon/cms/views/diy/components/edit-article.vue": () => import("./edit-article-9ffb527f.js").then((r) => r._), "../addon/erp/views/purchase/detail.vue": () => import("./detail-79de761b.js"), "../addon/erp/views/purchase/instock.vue": () => import("./instock-1fd60c82.js"), "../addon/erp/views/purchase/list.vue": () => import("./list-8ea76949.js"), "../addon/erp/views/sales/detail.vue": () => import("./detail-f8617ce5.js"), "../addon/erp/views/sales/list.vue": () => import("./list-f1352308.js"), "../addon/erp/views/sales/outstock.vue": () => import("./outstock-eba40cbb.js"), "../addon/erp/views/stock/detail.vue": () => import("./detail-4b7a6124.js"), "../addon/erp/views/stock/list.vue": () => import("./list-14eb8627.js"), "../addon/erp/views/stock/stockIn.vue": () => import("./stockIn-38e5603c.js"), "../addon/erp/views/stock/stockOut.vue": () => import("./stockOut-5708c50b.js"), "../addon/friend_help/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-7ac972e3.js"), "../addon/friend_help/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-c005414d.js"), "../addon/friend_help/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-c6b2002d.js"), "../addon/friend_help/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-24ca72c5.js"), "../addon/friend_help/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-b259d5b8.js"), "../addon/friend_help/views/active/components/goods-select-content.vue": () => import("./goods-select-content-017904ae.js"), "../addon/friend_help/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-d720e416.js"), "../addon/friend_help/views/active/components/select-member.vue": () => import("./select-member-63e92532.js"), "../addon/friend_help/views/active/edit.vue": () => import("./edit-3022f0b7.js"), "../addon/friend_help/views/active/list.vue": () => import("./list-98995852.js"), "../addon/friend_help/views/active/stat.vue": () => import("./stat-96714f85.js"), "../addon/friend_help/views/config/config.vue": () => import("./config-122e19c0.js"), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": () => import("./edit-friend-help-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": () => import("./edit-friend-help-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": () => import("./edit-friend-help-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": () => import("./edit-friend-help-activity-goods-detail-friend-help-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": () => import("./edit-friend-help-activity-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": () => import("./edit-friend-help-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": () => import("./edit-friend-help-activity-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": () => import("./edit-friend-help-carousel-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": () => import("./edit-friend-help-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": () => import("./edit-friend-help-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": () => import("./edit-friend-help-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": () => import("./edit-friend-help-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": () => import("./edit-friend-help-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": () => import("./edit-friend-help-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-hot.vue": () => import("./edit-friend-help-hot-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-list.vue": () => import("./edit-friend-help-list-076f081e.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": () => import("./edit-friend-help-member-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": () => import("./edit-friend-help-order-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/launch/components/launch-detail-popup.vue": () => import("./launch-detail-popup-655f2c08.js"), "../addon/friend_help/views/launch/list.vue": () => import("./list-f58fe01d.js"), "../addon/friend_help/views/order/components/order-notes.vue": () => import("./order-notes-8c10629e.js"), "../addon/friend_help/views/order/components/refund-detail.vue": () => import("./refund-detail-406525db.js"), "../addon/friend_help/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-655f2c08.js"), "../addon/friend_help/views/order/detail.vue": () => import("./detail-194a7d26.js"), "../addon/friend_help/views/order/list.vue": () => import("./list-6f18e76b.js"), "../addon/friend_help/views/order/refund.vue": () => import("./refund-0e17a08e.js"), "../addon/friend_help/views/poster/components/edit-discount-desc.vue": () => import("./edit-discount-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-3656154e.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-min-price.vue": () => import("./edit-min-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-original-desc.vue": () => import("./edit-original-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-original-price.vue": () => import("./edit-original-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-price.vue": () => import("./edit-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-discount-desc.vue": () => import("./preview-discount-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-3656154e.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-min-price.vue": () => import("./preview-min-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-original-desc.vue": () => import("./preview-original-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-original-price.vue": () => import("./preview-original-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-price.vue": () => import("./preview-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/card/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-7ac972e3.js"), "../addon/home_service/views/card/components/goods-select-popup.vue": () => import("./goods-select-popup-b15cf96a.js"), "../addon/home_service/views/card/edit.vue": () => import("./edit-f3f7f29a.js"), "../addon/home_service/views/card/list.vue": () => import("./list-d193b946.js"), "../addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": () => import("./edit-homeService-carousel-search-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": () => import("./edit-homeService-many-goods-list-8932c315.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-order-info.vue": () => import("./edit-homeService-order-info-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": () => import("./edit-homeService-rubik-cube-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": () => import("./edit-homeServicemember-banner-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-card.vue": () => import("./edit-homeServicemember-card-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": () => import("./edit-homeServicemember-cardList-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": () => import("./edit-homeServicemember-guarantee-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-info.vue": () => import("./edit-homeServicemember-info-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": () => import("./edit-homeServicemember-lowCost-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": () => import("./edit-homeServicemember-panicBuying-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": () => import("./edit-homeServicemember-settle-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": () => import("./edit-homeServicemember-subguarantee-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": () => import("./edit-homeServicemember-technician-list-recommed-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": () => import("./edit-homeServicemember-technician-list-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-card.vue": () => import("./link-select-card-c8bf62b8.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-category.vue": () => import("./link-select-category-b8342db4.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-goods.vue": () => import("./link-select-goods-b4337fab.js").then((r) => r._), "../addon/home_service/views/feedback/list.vue": () => import("./list-cd799851.js"), "../addon/home_service/views/finance/components/BankTransferDialog.vue": () => import("./BankTransferDialog-c61c1e56.js"), "../addon/home_service/views/finance/invoice.vue": () => import("./invoice-655f2c08.js"), "../addon/home_service/views/finance/store_detail.vue": () => import("./store_detail-655f2c08.js"), "../addon/home_service/views/finance/store_finance.vue": () => import("./store_finance-655f2c08.js"), "../addon/home_service/views/finance/technician_detail.vue": () => import("./technician_detail-655f2c08.js"), "../addon/home_service/views/finance/technician_finance.vue": () => import("./technician_finance-655f2c08.js"), "../addon/home_service/views/finance/withdrawal_review.vue": () => import("./withdrawal_review-655f2c08.js"), "../addon/home_service/views/goods/category.vue": () => import("./category-7ac972e3.js"), "../addon/home_service/views/goods/city.vue": () => import("./city-655f2c08.js"), "../addon/home_service/views/goods/components/card-select-popup.vue": () => import("./card-select-popup-4acb3fab.js"), "../addon/home_service/views/goods/components/category-edit.vue": () => import("./category-edit-6a0ca7ec.js"), "../addon/home_service/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-655f2c08.js"), "../addon/home_service/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-afaec690.js"), "../addon/home_service/views/goods/components/guarantee-edit.vue": () => import("./guarantee-edit-655f2c08.js"), "../addon/home_service/views/goods/components/special-edit.vue": () => import("./special-edit-655f2c08.js"), "../addon/home_service/views/goods/edit.vue": () => import("./edit-fa339799.js"), "../addon/home_service/views/goods/guarantee.vue": () => import("./guarantee-655f2c08.js"), "../addon/home_service/views/goods/list.vue": () => import("./list-7ac972e3.js"), "../addon/home_service/views/goods/special.vue": () => import("./special-655f2c08.js"), "../addon/home_service/views/help/category.vue": () => import("./category-655f2c08.js"), "../addon/home_service/views/help/components/edit-category.vue": () => import("./edit-category-655f2c08.js"), "../addon/home_service/views/help/edit.vue": () => import("./edit-65e51d95.js"), "../addon/home_service/views/help/list.vue": () => import("./list-24ca72c5.js"), "../addon/home_service/views/index.vue": () => import("./index-a95c7f6c.js"), "../addon/home_service/views/marketing/coupon/add.vue": () => import("./add-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-ab894a7b.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/select-member.vue": () => import("./select-member-1988f5b1.js"), "../addon/home_service/views/marketing/coupon/edit.vue": () => import("./edit-655f2c08.js"), "../addon/home_service/views/marketing/coupon/list.vue": () => import("./list-8c10629e.js"), "../addon/home_service/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-655f2c08.js"), "../addon/home_service/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-655f2c08.js"), "../addon/home_service/views/order/components/add-address.vue": () => import("./add-address-c6dda74d.js"), "../addon/home_service/views/order/components/address-list.vue": () => import("./address-list-655f2c08.js"), "../addon/home_service/views/order/components/coupon-list.vue": () => import("./coupon-list-655f2c08.js"), "../addon/home_service/views/order/components/friend-pay.vue": () => import("./friend-pay-655f2c08.js"), "../addon/home_service/views/order/components/goods-limit.vue": () => import("./goods-limit-655f2c08.js"), "../addon/home_service/views/order/components/manjian-info.vue": () => import("./manjian-info-655f2c08.js"), "../addon/home_service/views/order/components/order-export-select.vue": () => import("./order-export-select-655f2c08.js"), "../addon/home_service/views/order/components/pay.vue": () => import("./pay-86799441.js"), "../addon/home_service/views/order/components/returnvisit.vue": () => import("./returnvisit-e82e6d3c.js"), "../addon/home_service/views/order/components/select-goods.vue": () => import("./select-goods-655f2c08.js"), "../addon/home_service/views/order/components/select-member.vue": () => import("./select-member-655f2c08.js"), "../addon/home_service/views/order/components/select-orderlabel.vue": () => import("./select-orderlabel-ca773366.js"), "../addon/home_service/views/order/components/select-technician.vue": () => import("./select-technician-655f2c08.js"), "../addon/home_service/views/order/components/select-time.vue": () => import("./select-time-8cc67db8.js"), "../addon/home_service/views/order/config.vue": () => import("./config-a9035567.js"), "../addon/home_service/views/order/easy_select.vue": () => import("./easy_select-15d5a4bc.js"), "../addon/home_service/views/order/easy_select_detail.vue": () => import("./easy_select_detail-815cbe18.js"), "../addon/home_service/views/order/evaluate.vue": () => import("./evaluate-86e49327.js"), "../addon/home_service/views/order/evaluate_config.vue": () => import("./evaluate_config-0c610ae9.js"), "../addon/home_service/views/order/intent_config.vue": () => import("./intent_config-4d8330fc.js"), "../addon/home_service/views/order/lesson_order.vue": () => import("./lesson_order-655f2c08.js"), "../addon/home_service/views/order/lesson_order_confirm.vue": () => import("./lesson_order_confirm-655f2c08.js"), "../addon/home_service/views/order/order.vue": () => import("./order-e84a06f4.js"), "../addon/home_service/views/order/order_detail.vue": () => import("./order_detail-46793948.js"), "../addon/home_service/views/order/protection_settings.vue": () => import("./protection_settings-5ce2ec06.js"), "../addon/home_service/views/order/return_visit.vue": () => import("./return_visit-d1f88e3a.js"), "../addon/home_service/views/order/tags.vue": () => import("./tags-9f4b6837.js"), "../addon/home_service/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/refund/refund.vue": () => import("./refund-0b3368c1.js"), "../addon/home_service/views/report/customer_report.vue": () => import("./customer_report-e31cb8ac.js"), "../addon/home_service/views/report/financial_report.vue": () => import("./financial_report-d26dcd54.js"), "../addon/home_service/views/report/member_report.vue": () => import("./member_report-2bc02802.js"), "../addon/home_service/views/report/store_report.vue": () => import("./store_report-47306f43.js"), "../addon/home_service/views/report/technician_report.vue": () => import("./technician_report-6f28d2c1.js"), "../addon/home_service/views/store/add.vue": () => import("./add-f141cc95.js"), "../addon/home_service/views/store/detail.vue": () => import("./detail-4ff65342.js"), "../addon/home_service/views/store/edit.vue": () => import("./edit-a76c4387.js"), "../addon/home_service/views/store/examine.vue": () => import("./examine-655f2c08.js"), "../addon/home_service/views/store/examine_edit.vue": () => import("./examine_edit-a4eecf45.js"), "../addon/home_service/views/store/list.vue": () => import("./list-655f2c08.js"), "../addon/home_service/views/store/technician.vue": () => import("./technician-655f2c08.js"), "../addon/home_service/views/technician/cityfare.vue": () => import("./cityfare-655f2c08.js"), "../addon/home_service/views/technician/cityfare_config.vue": () => import("./cityfare_config-ee74e4e4.js"), "../addon/home_service/views/technician/components/dynamicCollapseForm/dynamicCollapseForm.vue": () => import("./dynamicCollapseForm-f2045055.js"), "../addon/home_service/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-05ff17fb.js"), "../addon/home_service/views/technician/detail.vue": () => import("./detail-7b4c15d7.js"), "../addon/home_service/views/technician/edit.vue": () => import("./edit-0f307902.js"), "../addon/home_service/views/technician/examine.vue": () => import("./examine-6a0ca7ec.js"), "../addon/home_service/views/technician/examine_edit.vue": () => import("./examine_edit-6a78e218.js"), "../addon/home_service/views/technician/level.vue": () => import("./level-655f2c08.js"), "../addon/home_service/views/technician/level_edit.vue": () => import("./level_edit-1702716b.js"), "../addon/home_service/views/technician/list.vue": () => import("./list-77a11a55.js"), "../addon/huaweicloud_obs/views/setting/components/storage-huawei.vue": () => import("./storage-huawei-655f2c08.js"), "../addon/huaweicloud_sms/views/setting/components/sms-huawei.vue": () => import("./sms-huawei-655f2c08.js"), "../addon/o2o/views/config/reserve.vue": () => import("./reserve-655f2c08.js"), "../addon/o2o/views/diy/components/edit-o2o-goods-list.vue": () => import("./edit-o2o-goods-list-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-member-info.vue": () => import("./edit-o2o-member-info-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-order-info.vue": () => import("./edit-o2o-order-info-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-search.vue": () => import("./edit-o2o-search-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-technician.vue": () => import("./edit-o2o-technician-9ffb527f.js").then((r) => r._), "../addon/o2o/views/goods/category.vue": () => import("./category-6a0ca7ec.js"), "../addon/o2o/views/goods/components/category-edit.vue": () => import("./category-edit-655f2c08.js"), "../addon/o2o/views/goods/components/category-select-content.vue": () => import("./category-select-content-655f2c08.js"), "../addon/o2o/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6a0ca7ec.js"), "../addon/o2o/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-8bc5f882.js"), "../addon/o2o/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-de4eccf8.js"), "../addon/o2o/views/goods/edit.vue": () => import("./edit-8cd37de0.js"), "../addon/o2o/views/goods/list.vue": () => import("./list-6a0ca7ec.js"), "../addon/o2o/views/index.vue": () => import("./index-d3b76651.js"), "../addon/o2o/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-24ca72c5.js"), "../addon/o2o/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-24ca72c5.js"), "../addon/o2o/views/order/components/order-export-select.vue": () => import("./order-export-select-7ac972e3.js"), "../addon/o2o/views/order/config.vue": () => import("./config-7da0b282.js"), "../addon/o2o/views/order/order.vue": () => import("./order-261aafa2.js"), "../addon/o2o/views/order/order_detail.vue": () => import("./order_detail-fe597332.js"), "../addon/o2o/views/order/reserve.vue": () => import("./reserve-441376d0.js"), "../addon/o2o/views/poster/components/edit-o2o-goods-image.vue": () => import("./edit-o2o-goods-image-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/edit-o2o-goods-name.vue": () => import("./edit-o2o-goods-name-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/edit-o2o-goods-price.vue": () => import("./edit-o2o-goods-price-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-image.vue": () => import("./preview-o2o-goods-image-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-name.vue": () => import("./preview-o2o-goods-name-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-price.vue": () => import("./preview-o2o-goods-price-9ffb527f.js").then((r) => r._), "../addon/o2o/views/refund/detail.vue": () => import("./detail-1ad78c96.js"), "../addon/o2o/views/refund/refund.vue": () => import("./refund-7ac972e3.js"), "../addon/o2o/views/site_index.vue": () => import("./site_index-655f2c08.js"), "../addon/o2o/views/technician/components/edit-position.vue": () => import("./edit-position-655f2c08.js"), "../addon/o2o/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-c87af0e3.js"), "../addon/o2o/views/technician/edit.vue": () => import("./edit-f4e9fe4e.js"), "../addon/o2o/views/technician/list.vue": () => import("./list-4a02961a.js"), "../addon/o2o/views/technician/position.vue": () => import("./position-655f2c08.js"), "../addon/pintuan/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-6a0ca7ec.js"), "../addon/pintuan/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-872a9b55.js"), "../addon/pintuan/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-17fce5f8.js"), "../addon/pintuan/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-7ac972e3.js"), "../addon/pintuan/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-b86d6ade.js"), "../addon/pintuan/views/active/components/goods-select-content.vue": () => import("./goods-select-content-99d723c0.js"), "../addon/pintuan/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-8761f88c.js"), "../addon/pintuan/views/active/components/select-member.vue": () => import("./select-member-5ab36100.js"), "../addon/pintuan/views/active/edit.vue": () => import("./edit-1e1475eb.js"), "../addon/pintuan/views/active/list.vue": () => import("./list-fbca5f7b.js"), "../addon/pintuan/views/active/stat.vue": () => import("./stat-bfae590c.js"), "../addon/pintuan/views/config/config.vue": () => import("./config-3f1aed28.js"), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": () => import("./edit-pintuan-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": () => import("./edit-pintuan-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": () => import("./edit-pintuan-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": () => import("./edit-pintuan-activity-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": () => import("./edit-pintuan-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": () => import("./edit-pintuan-activity-goods-detail-pintuan-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": () => import("./edit-pintuan-activity-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": () => import("./edit-pintuan-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": () => import("./edit-pintuan-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": () => import("./edit-pintuan-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": () => import("./edit-pintuan-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": () => import("./edit-pintuan-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": () => import("./edit-pintuan-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-hot.vue": () => import("./edit-pintuan-hot-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": () => import("./edit-pintuan-immediately-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-limit.vue": () => import("./edit-pintuan-limit-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-list.vue": () => import("./edit-pintuan-list-55ae56e7.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": () => import("./edit-pintuan-member-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": () => import("./edit-pintuan-order-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/group/components/group-detail-popup.vue": () => import("./group-detail-popup-655f2c08.js"), "../addon/pintuan/views/group/list.vue": () => import("./list-830bb3e2.js"), "../addon/pintuan/views/order/components/order-notes.vue": () => import("./order-notes-1ad78c96.js"), "../addon/pintuan/views/order/components/refund-detail.vue": () => import("./refund-detail-b57aa288.js"), "../addon/pintuan/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-8c10629e.js"), "../addon/pintuan/views/order/detail.vue": () => import("./detail-78407100.js"), "../addon/pintuan/views/order/list.vue": () => import("./list-69c933f4.js"), "../addon/pintuan/views/order/refund.vue": () => import("./refund-0ffc2561.js"), "../addon/pintuan/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-price.vue": () => import("./edit-price-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-price.vue": () => import("./preview-price-3656154e.js").then((r) => r._), "../addon/recharge/views/order/components/recharge-detail.vue": () => import("./recharge-detail-655f2c08.js"), "../addon/recharge/views/order/detail.vue": () => import("./detail-b0ffb798.js"), "../addon/recharge/views/order/list.vue": () => import("./list-e113a869.js"), "../addon/recharge/views/order/refund.vue": () => import("./refund-24ca72c5.js"), "../addon/recharge/views/package/components/detail-growth.vue": () => import("./detail-growth-e3f26d99.js"), "../addon/recharge/views/package/components/detail-points.vue": () => import("./detail-points-35870f22.js"), "../addon/recharge/views/package/components/gift-growth.vue": () => import("./gift-growth-db23acd9.js"), "../addon/recharge/views/package/components/gift-points.vue": () => import("./gift-points-87fb6710.js"), "../addon/recharge/views/package/components/package-gift.vue": () => import("./package-gift-655f2c08.js"), "../addon/recharge/views/package/config.vue": () => import("./config-d45f3c42.js"), "../addon/recharge/views/package/detail.vue": () => import("./detail-655f2c08.js"), "../addon/recharge/views/package/edit.vue": () => import("./edit-fbae5219.js"), "../addon/recharge/views/package/list.vue": () => import("./list-1ad78c96.js"), "../addon/relay/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-655f2c08.js"), "../addon/relay/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-be5748ae.js"), "../addon/relay/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-cba51086.js"), "../addon/relay/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-655f2c08.js"), "../addon/relay/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-5ee56832.js"), "../addon/relay/views/active/components/goods-select-content.vue": () => import("./goods-select-content-4176593b.js"), "../addon/relay/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-155694b9.js"), "../addon/relay/views/active/components/select-member.vue": () => import("./select-member-fbe03876.js"), "../addon/relay/views/active/edit.vue": () => import("./edit-e6c12e86.js"), "../addon/relay/views/active/list.vue": () => import("./list-122e19c0.js"), "../addon/relay/views/active/stat.vue": () => import("./stat-0f841573.js"), "../addon/relay/views/config/config.vue": () => import("./config-655f2c08.js"), "../addon/relay/views/diy/components/edit-relay-goods-list.vue": () => import("./edit-relay-goods-list-9ffb527f.js").then((r) => r._), "../addon/relay/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-082c2f59.js"), "../addon/relay/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-ef9c7c5f.js"), "../addon/relay/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-1a48cbca.js"), "../addon/relay/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-e1048975.js"), "../addon/relay/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-655f2c08.js"), "../addon/relay/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-132a6518.js"), "../addon/relay/views/goods/edit.vue": () => import("./edit-38ab753d.js"), "../addon/relay/views/goods/list.vue": () => import("./list-57240982.js"), "../addon/relay/views/order/components/order-notes.vue": () => import("./order-notes-655f2c08.js"), "../addon/relay/views/order/components/refund-detail.vue": () => import("./refund-detail-7e87a5a8.js"), "../addon/relay/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-6a0ca7ec.js"), "../addon/relay/views/order/detail.vue": () => import("./detail-cfc6c61b.js"), "../addon/relay/views/order/list.vue": () => import("./list-7dc981b4.js"), "../addon/relay/views/order/refund.vue": () => import("./refund-c97dca95.js"), "../addon/seckill/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-6a0ca7ec.js"), "../addon/seckill/views/active/components/goods-sku-popup.vue": () => import("./goods-sku-popup-973f4b47.js"), "../addon/seckill/views/active/components/seckill-detail-popup.vue": () => import("./seckill-detail-popup-655f2c08.js"), "../addon/seckill/views/active/components/time-select-popup.vue": () => import("./time-select-popup-655f2c08.js"), "../addon/seckill/views/active/detail.vue": () => import("./detail-950ada55.js"), "../addon/seckill/views/active/edit.vue": () => import("./edit-5af64ddd.js"), "../addon/seckill/views/active/list.vue": () => import("./list-b0ffb798.js"), "../addon/seckill/views/active/stat.vue": () => import("./stat-8bba71a4.js"), "../addon/seckill/views/config/config.vue": () => import("./config-6a0ca7ec.js"), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": () => import("./edit-seckill-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": () => import("./edit-seckill-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": () => import("./edit-seckill-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": () => import("./edit-seckill-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": () => import("./edit-seckill-activity-goods-detail-seckill-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": () => import("./edit-seckill-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": () => import("./edit-seckill-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": () => import("./edit-seckill-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": () => import("./edit-seckill-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods.vue": () => import("./edit-seckill-goods-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-hot.vue": () => import("./edit-seckill-hot-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-member-info.vue": () => import("./edit-seckill-member-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-order-info.vue": () => import("./edit-seckill-order-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": () => import("./edit-seckill-rubik-cube-5b5d5c10.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-special-offer.vue": () => import("./edit-seckill-special-offer-9ffb527f.js").then((r) => r._), "../addon/seckill/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-6666628e.js"), "../addon/seckill/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-3669bb9d.js"), "../addon/seckill/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-2e2aae95.js"), "../addon/seckill/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-eae7dff4.js"), "../addon/seckill/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-6a0ca7ec.js"), "../addon/seckill/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-b484486b.js"), "../addon/seckill/views/goods/edit.vue": () => import("./edit-ab8e56b8.js"), "../addon/seckill/views/goods/list.vue": () => import("./list-3fbd8b06.js"), "../addon/seckill/views/order/components/order-notes.vue": () => import("./order-notes-6a0ca7ec.js"), "../addon/seckill/views/order/components/refund-detail.vue": () => import("./refund-detail-4bdb5865.js"), "../addon/seckill/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-7ac972e3.js"), "../addon/seckill/views/order/detail.vue": () => import("./detail-bad327c5.js"), "../addon/seckill/views/order/list.vue": () => import("./list-2bca324c.js"), "../addon/seckill/views/order/refund.vue": () => import("./refund-ee5cd27a.js"), "../addon/seckill/views/poster/components/edit-active-time.vue": () => import("./edit-active-time-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-seckill-market-price.vue": () => import("./edit-seckill-market-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-seckill-price.vue": () => import("./edit-seckill-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-active-time.vue": () => import("./preview-active-time-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-seckill-market-price.vue": () => import("./preview-seckill-market-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-seckill-price.vue": () => import("./preview-seckill-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/time/components/time-diy-select-popup.vue": () => import("./time-diy-select-popup-565c861f.js"), "../addon/seckill/views/time/components/time-goods-detail.vue": () => import("./time-goods-detail-655f2c08.js"), "../addon/seckill/views/time/components/time-select-content.vue": () => import("./time-select-content-9bd7431f.js"), "../addon/seckill/views/time/edit.vue": () => import("./edit-6a0ca7ec.js"), "../addon/seckill/views/time/list.vue": () => import("./list-7da0b282.js"), "../addon/shop/views/address/edit.vue": () => import("./edit-7ac972e3.js"), "../addon/shop/views/address/list.vue": () => import("./list-3f1aed28.js"), "../addon/shop/views/delivery/company.vue": () => import("./company-655f2c08.js"), "../addon/shop/views/delivery/company_edit.vue": () => import("./company_edit-655f2c08.js"), "../addon/shop/views/delivery/components/delivery-personnel-edit.vue": () => import("./delivery-personnel-edit-655f2c08.js"), "../addon/shop/views/delivery/components/local-delivery-service-dada.vue": () => import("./local-delivery-service-dada-655f2c08.js"), "../addon/shop/views/delivery/components/local_record_detail.vue": () => import("./local_record_detail-655f2c08.js"), "../addon/shop/views/delivery/components/shop_record_detail.vue": () => import("./shop_record_detail-655f2c08.js"), "../addon/shop/views/delivery/config.vue": () => import("./config-33f02061.js"), "../addon/shop/views/delivery/electronic_sheet.vue": () => import("./electronic_sheet-655f2c08.js"), "../addon/shop/views/delivery/electronic_sheet_config.vue": () => import("./electronic_sheet_config-538b0b06.js"), "../addon/shop/views/delivery/electronic_sheet_edit.vue": () => import("./electronic_sheet_edit-655f2c08.js"), "../addon/shop/views/delivery/local.vue": () => import("./local-6eb31ec5.js"), "../addon/shop/views/delivery/local_config.vue": () => import("./local_config-655f2c08.js"), "../addon/shop/views/delivery/local_delivery_service.vue": () => import("./local_delivery_service-655f2c08.js"), "../addon/shop/views/delivery/local_record.vue": () => import("./local_record-10eb1497.js"), "../addon/shop/views/delivery/merchant_record.vue": () => import("./merchant_record-6fcfbc7b.js"), "../addon/shop/views/delivery/search.vue": () => import("./search-c677febb.js"), "../addon/shop/views/delivery/staff.vue": () => import("./staff-655f2c08.js"), "../addon/shop/views/delivery/store.vue": () => import("./store-655f2c08.js"), "../addon/shop/views/delivery/store_edit.vue": () => import("./store_edit-655f2c08.js"), "../addon/shop/views/delivery/template.vue": () => import("./template-655f2c08.js"), "../addon/shop/views/delivery/template_edit.vue": () => import("./template_edit-f698ac19.js"), "../addon/shop/views/delivery_store/delivery_set.vue": () => import("./delivery_set-655f2c08.js"), "../addon/shop/views/delivery_store/edit.vue": () => import("./edit-9e28b490.js"), "../addon/shop/views/delivery_store/list.vue": () => import("./list-545eb6f5.js"), "../addon/shop/views/diy/components/edit-goods-coupon.vue": () => import("./edit-goods-coupon-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-goods-list.vue": () => import("./edit-goods-list-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-many-goods-list.vue": () => import("./edit-many-goods-list-4bd70d63.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-exchange-goods.vue": () => import("./edit-shop-exchange-goods-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-exchange-info.vue": () => import("./edit-shop-exchange-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": () => import("./edit-shop-goods-detail-attr-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": () => import("./edit-shop-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": () => import("./edit-shop-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": () => import("./edit-shop-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": () => import("./edit-shop-goods-detail-evaluate-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": () => import("./edit-shop-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": () => import("./edit-shop-goods-detail-sow-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-hot.vue": () => import("./edit-shop-goods-hot-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-ranking.vue": () => import("./edit-shop-goods-ranking-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-recommend.vue": () => import("./edit-shop-goods-recommend-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-member-info.vue": () => import("./edit-shop-member-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-newcomer.vue": () => import("./edit-shop-newcomer-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-order-info.vue": () => import("./edit-shop-order-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-search.vue": () => import("./edit-shop-search-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-single-recommend.vue": () => import("./edit-single-recommend-9ffb527f.js").then((r) => r._), "../addon/shop/views/goods/attr.vue": () => import("./attr-655f2c08.js"), "../addon/shop/views/goods/attr_edit.vue": () => import("./attr_edit-655f2c08.js"), "../addon/shop/views/goods/brand_list.vue": () => import("./brand_list-655f2c08.js"), "../addon/shop/views/goods/category.vue": () => import("./category-614a0ab9.js"), "../addon/shop/views/goods/category_config.vue": () => import("./category_config-edf2f53b.js"), "../addon/shop/views/goods/components/brand-edit.vue": () => import("./brand-edit-655f2c08.js"), "../addon/shop/views/goods/components/category-edit.vue": () => import("./category-edit-1ad78c96.js"), "../addon/shop/views/goods/components/coupon-select-popup.vue": () => import("./coupon-select-popup-52cdb608.js"), "../addon/shop/views/goods/components/evaluate-add.vue": () => import("./evaluate-add-655f2c08.js"), "../addon/shop/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-1bd7fce5.js"), "../addon/shop/views/goods/components/goods-category-select-content.vue": () => import("./goods-category-select-content-3013118f.js"), "../addon/shop/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-284f5354.js"), "../addon/shop/views/goods/components/goods-price-edit-popup.vue": () => import("./goods-price-edit-popup-9712924e.js"), "../addon/shop/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-2b18a8f7.js"), "../addon/shop/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-5c669447.js"), "../addon/shop/views/goods/components/goods-stock-edit-popup.vue": () => import("./goods-stock-edit-popup-6f680b8d.js"), "../addon/shop/views/goods/components/label-edit.vue": () => import("./label-edit-655f2c08.js"), "../addon/shop/views/goods/components/label-group-edit.vue": () => import("./label-group-edit-655f2c08.js"), "../addon/shop/views/goods/components/newcomer-goods-select-popup.vue": () => import("./newcomer-goods-select-popup-c98a53a9.js"), "../addon/shop/views/goods/components/service-edit.vue": () => import("./service-edit-655f2c08.js"), "../addon/shop/views/goods/evaluate.vue": () => import("./evaluate-1a895b6d.js"), "../addon/shop/views/goods/label_group_list.vue": () => import("./label_group_list-655f2c08.js"), "../addon/shop/views/goods/label_list.vue": () => import("./label_list-655f2c08.js"), "../addon/shop/views/goods/list.vue": () => import("./list-707d21e3.js"), "../addon/shop/views/goods/real_edit.vue": () => import("./real_edit-eaaeae0a.js"), "../addon/shop/views/goods/recycle.vue": () => import("./recycle-99fb5b70.js"), "../addon/shop/views/goods/search_config.vue": () => import("./search_config-02815de0.js"), "../addon/shop/views/goods/service.vue": () => import("./service-655f2c08.js"), "../addon/shop/views/goods/virtual_edit.vue": () => import("./virtual_edit-50f0d72b.js"), "../addon/shop/views/index/index.vue": () => import("./index-7ac972e3.js"), "../addon/shop/views/marketing/coupon/add.vue": () => import("./add-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-a7c786ab.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/select-member.vue": () => import("./select-member-480fd415.js"), "../addon/shop/views/marketing/coupon/edit.vue": () => import("./edit-b0ffb798.js"), "../addon/shop/views/marketing/coupon/list.vue": () => import("./list-07c4c15d.js"), "../addon/shop/views/marketing/discount/add.vue": () => import("./add-d61d59d5.js"), "../addon/shop/views/marketing/discount/components/discount-detail.vue": () => import("./discount-detail-655f2c08.js"), "../addon/shop/views/marketing/discount/components/goods-sku-popup.vue": () => import("./goods-sku-popup-12ac7561.js"), "../addon/shop/views/marketing/discount/config.vue": () => import("./config-a41c4162.js"), "../addon/shop/views/marketing/discount/detail.vue": () => import("./detail-24ca72c5.js"), "../addon/shop/views/marketing/discount/edit.vue": () => import("./edit-fa7e6566.js"), "../addon/shop/views/marketing/discount/list.vue": () => import("./list-02a6dc3f.js"), "../addon/shop/views/marketing/exchange/components/goods-select-content.vue": () => import("./goods-select-content-6d09ce52.js"), "../addon/shop/views/marketing/exchange/components/goods-select-popup.vue": () => import("./goods-select-popup-655f2c08.js"), "../addon/shop/views/marketing/exchange/components/goods-sku-select.vue": () => import("./goods-sku-select-655f2c08.js"), "../addon/shop/views/marketing/exchange/goods_add.vue": () => import("./goods_add-b3d1f44e.js"), "../addon/shop/views/marketing/exchange/goods_edit.vue": () => import("./goods_edit-bd23595c.js"), "../addon/shop/views/marketing/exchange/goods_list.vue": () => import("./goods_list-655f2c08.js"), "../addon/shop/views/marketing/exchange/order_list.vue": () => import("./order_list-08a4705a.js"), "../addon/shop/views/marketing/goods_rank/components/rank-select-popup.vue": () => import("./rank-select-popup-194a0cf5.js"), "../addon/shop/views/marketing/goods_rank/config.vue": () => import("./config-1ad78c96.js"), "../addon/shop/views/marketing/goods_rank/edit.vue": () => import("./edit-7da0b282.js"), "../addon/shop/views/marketing/goods_rank/list.vue": () => import("./list-9439af69.js"), "../addon/shop/views/marketing/index.vue": () => import("./index-6355e83a.js"), "../addon/shop/views/marketing/manjian/detail.vue": () => import("./detail-7c88bbe9.js"), "../addon/shop/views/marketing/manjian/edit.vue": () => import("./edit-a3a15e93.js"), "../addon/shop/views/marketing/manjian/list.vue": () => import("./list-032bb2e9.js"), "../addon/shop/views/marketing/newcomer/config.vue": () => import("./config-b8238494.js"), "../addon/shop/views/marketing/newcomer/order_list.vue": () => import("./order_list-e2f69260.js"), "../addon/shop/views/member/components/benefits-free-shipping.vue": () => import("./benefits-free-shipping-655f2c08.js"), "../addon/shop/views/member/components/gift-coupon.vue": () => import("./gift-coupon-655f2c08.js"), "../addon/shop/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-7ac972e3.js"), "../addon/shop/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-7ac972e3.js"), "../addon/shop/views/member/components/point-rule-buygoods.vue": () => import("./point-rule-buygoods-655f2c08.js"), "../addon/shop/views/member/components/point-rule-orderdeduction.vue": () => import("./point-rule-orderdeduction-655f2c08.js"), "../addon/shop/views/member/components/recharge-detail-coupon.vue": () => import("./recharge-detail-coupon-67f0e5e9.js"), "../addon/shop/views/member/components/recharge-gift-coupon.vue": () => import("./recharge-gift-coupon-781a56df.js"), "../addon/shop/views/order/batch_delivery.vue": () => import("./batch_delivery-655f2c08.js"), "../addon/shop/views/order/components/adjust-money.vue": () => import("./adjust-money-655f2c08.js"), "../addon/shop/views/order/components/delivery-action.vue": () => import("./delivery-action-655f2c08.js"), "../addon/shop/views/order/components/delivery-package.vue": () => import("./delivery-package-655f2c08.js"), "../addon/shop/views/order/components/electronic-sheet-print.vue": () => import("./electronic-sheet-print-655f2c08.js"), "../addon/shop/views/order/components/form-detail.vue": () => import("./form-detail-655f2c08.js"), "../addon/shop/views/order/components/import-data.vue": () => import("./import-data-655f2c08.js"), "../addon/shop/views/order/components/invoice-detail.vue": () => import("./invoice-detail-655f2c08.js"), "../addon/shop/views/order/components/invoice-dialog.vue": () => import("./invoice-dialog-655f2c08.js"), "../addon/shop/views/order/components/open-invoice.vue": () => import("./open-invoice-655f2c08.js"), "../addon/shop/views/order/components/order-detail.vue": () => import("./order-detail-6a0ca7ec.js"), "../addon/shop/views/order/components/order-edit-address.vue": () => import("./order-edit-address-655f2c08.js"), "../addon/shop/views/order/components/order-export-select.vue": () => import("./order-export-select-6a0ca7ec.js"), "../addon/shop/views/order/components/order-notes.vue": () => import("./order-notes-24ca72c5.js"), "../addon/shop/views/order/components/refund-detail.vue": () => import("./refund-detail-0e40fccf.js"), "../addon/shop/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-24ca72c5.js"), "../addon/shop/views/order/config.vue": () => import("./config-b0ffb798.js"), "../addon/shop/views/order/detail.vue": () => import("./detail-ffe33284.js"), "../addon/shop/views/order/invoice.vue": () => import("./invoice-6a0ca7ec.js"), "../addon/shop/views/order/list.vue": () => import("./list-4c6fe118.js"), "../addon/shop/views/order/refund.vue": () => import("./refund-64138978.js"), "../addon/shop/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-3656154e.js").then((r) => r._), "../addon/shop/views/printer/components/preview-goods-order.vue": () => import("./preview-goods-order-42e8dcaa.js").then((r) => r._), "../addon/shop/views/sow_community/components/sow-community-gift-coupon.vue": () => import("./sow-community-gift-coupon-0d8b1762.js"), "../addon/shop/views/stat/goods.vue": () => import("./goods-7fca9a65.js"), "../addon/shop/views/stat/index.vue": () => import("./index-08a15ed7.js"), "../addon/shop/views/stat/member.vue": () => import("./member-2971f0be.js"), "../addon/shop/views/stat/order.vue": () => import("./order-c37da38d.js"), "../addon/shop/views/stat/visit.vue": () => import("./visit-5f7e1271.js"), "../addon/shop_fenxiao/views/agent/level_config.vue": () => import("./level_config-655f2c08.js"), "../addon/shop_fenxiao/views/agent/list.vue": () => import("./list-ab2518bc.js"), "../addon/shop_fenxiao/views/agent/order.vue": () => import("./order-f6ae6f18.js"), "../addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue": () => import("./fenxiao-goods-detail-655f2c08.js"), "../addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue": () => import("./fenxiao-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/components/member-of-select-popup.vue": () => import("./member-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/config/index.vue": () => import("./index-144cbcbc.js"), "../addon/shop_fenxiao/views/config/poster.vue": () => import("./poster-655f2c08.js"), "../addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": () => import("./edit-fenxiao-goods-list-9ffb527f.js").then((r) => r._), "../addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue": () => import("./fenxiao-detail-655f2c08.js"), "../addon/shop_fenxiao/views/fenxiao/detail.vue": () => import("./detail-8c10629e.js"), "../addon/shop_fenxiao/views/fenxiao/edit.vue": () => import("./edit-0782fd92.js"), "../addon/shop_fenxiao/views/fenxiao/lists.vue": () => import("./lists-655f2c08.js"), "../addon/shop_fenxiao/views/goods/config.vue": () => import("./config-13de9110.js"), "../addon/shop_fenxiao/views/goods/detail.vue": () => import("./detail-28441a1e.js"), "../addon/shop_fenxiao/views/goods/lists.vue": () => import("./lists-59234e8b.js"), "../addon/shop_fenxiao/views/index/index.vue": () => import("./index-24ca72c5.js"), "../addon/shop_fenxiao/views/level/edit.vue": () => import("./edit-aa0d6c6e.js"), "../addon/shop_fenxiao/views/level/lists.vue": () => import("./lists-6a0ca7ec.js"), "../addon/shop_fenxiao/views/member/lists.vue": () => import("./lists-7ac972e3.js"), "../addon/shop_fenxiao/views/order/lists.vue": () => import("./lists-c7b307e9.js"), "../addon/shop_fenxiao/views/sale/config.vue": () => import("./config-a17c3061.js"), "../addon/shop_fenxiao/views/sale/list.vue": () => import("./list-16d80079.js"), "../addon/shop_fenxiao/views/sale/member_list.vue": () => import("./member_list-655f2c08.js"), "../addon/shop_fenxiao/views/task/components/task-detail.vue": () => import("./task-detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/config.vue": () => import("./config-47fe8d79.js"), "../addon/shop_fenxiao/views/task/detail.vue": () => import("./detail-6a0ca7ec.js"), "../addon/shop_fenxiao/views/task/edit.vue": () => import("./edit-8c10629e.js"), "../addon/shop_fenxiao/views/task/list.vue": () => import("./list-788e9d8a.js"), "../addon/shop_fenxiao/views/task/reward_detail.vue": () => import("./reward_detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/reward_list.vue": () => import("./reward_list-655f2c08.js"), "../addon/shop_fenxiao/views/team/level.vue": () => import("./level-aa9a3e9c.js"), "../addon/shop_fenxiao/views/team/order.vue": () => import("./order-25ef4778.js"), "../addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": () => import("./edit-giftcard-list-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/giftcard/card_detail.vue": () => import("./card_detail-648a3908.js"), "../addon/shop_giftcard/views/giftcard/category.vue": () => import("./category-8c10629e.js"), "../addon/shop_giftcard/views/giftcard/components/category-edit.vue": () => import("./category-edit-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue": () => import("./giftcard-detail-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-content.vue": () => import("./giftcard-select-content-f83bb77b.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue": () => import("./giftcard-select-popup-c038f506.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-edit.vue": () => import("./makecard-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue": () => import("./makecard-import-log-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-edit.vue": () => import("./material-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-group-edit.vue": () => import("./material-group-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-move.vue": () => import("./material-move-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-select-popup.vue": () => import("./material-select-popup-34e8aa1d.js"), "../addon/shop_giftcard/views/giftcard/components/material-select.vue": () => import("./material-select-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/config.vue": () => import("./config-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/detail.vue": () => import("./detail-dd50911a.js"), "../addon/shop_giftcard/views/giftcard/edit.vue": () => import("./edit-dd00cc6d.js"), "../addon/shop_giftcard/views/giftcard/list.vue": () => import("./list-2c2b8751.js"), "../addon/shop_giftcard/views/giftcard/makecard.vue": () => import("./makecard-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material.vue": () => import("./material-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material_group.vue": () => import("./material_group-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-detail.vue": () => import("./order-detail-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-notes.vue": () => import("./order-notes-7ac972e3.js"), "../addon/shop_giftcard/views/order/list.vue": () => import("./list-256ab3bb.js"), "../addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": () => import("./edit-giftcard-blessing-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": () => import("./edit-giftcard-image-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": () => import("./edit-giftcard-name-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": () => import("./edit-giftcard-validity-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": () => import("./preview-giftcard-blessing-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": () => import("./preview-giftcard-image-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": () => import("./preview-giftcard-name-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": () => import("./preview-giftcard-validity-9ffb527f.js").then((r) => r._), "../addon/shop_impulse_buy/views/impulse_buy/components/category-select-popup.vue": () => import("./category-select-popup-8e9436d1.js"), "../addon/shop_impulse_buy/views/impulse_buy/config.vue": () => import("./config-24ca72c5.js"), "../addon/shop_impulse_buy/views/impulse_buy/detail.vue": () => import("./detail-7ac972e3.js"), "../addon/shop_impulse_buy/views/impulse_buy/edit.vue": () => import("./edit-86d6accf.js"), "../addon/shop_impulse_buy/views/impulse_buy/list.vue": () => import("./list-e949c5a9.js"), "../addon/shop_replace_buy/views/components/add-address.vue": () => import("./add-address-655f2c08.js"), "../addon/shop_replace_buy/views/components/address-list.vue": () => import("./address-list-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/coupon-list.vue": () => import("./coupon-list-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/friend-pay.vue": () => import("./friend-pay-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/goods-limit.vue": () => import("./goods-limit-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/manjian-info.vue": () => import("./manjian-info-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/select-goods.vue": () => import("./select-goods-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/select-member.vue": () => import("./select-member-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/store-list.vue": () => import("./store-list-655f2c08.js"), "../addon/shop_replace_buy/views/index.vue": () => import("./index-655f2c08.js"), "../addon/shop_replace_buy/views/order.vue": () => import("./order-6a0ca7ec.js"), "../addon/sow_community/views/category/components/category-edit.vue": () => import("./category-edit-24ca72c5.js"), "../addon/sow_community/views/category/list.vue": () => import("./list-14757507.js"), "../addon/sow_community/views/comment/list.vue": () => import("./list-0093effa.js"), "../addon/sow_community/views/config/config.vue": () => import("./config-8c10629e.js"), "../addon/sow_community/views/content/components/content-detail.vue": () => import("./content-detail-4f1f5714.js"), "../addon/sow_community/views/content/components/select-member.vue": () => import("./select-member-7ac972e3.js"), "../addon/sow_community/views/content/components/treasure-select-popup.vue": () => import("./treasure-select-popup-a6c597e0.js"), "../addon/sow_community/views/content/edit.vue": () => import("./edit-24ca72c5.js"), "../addon/sow_community/views/content/list.vue": () => import("./list-e1e5a97c.js"), "../addon/sow_community/views/content/select_content.vue": () => import("./select_content-f7d861c3.js"), "../addon/sow_community/views/package/components/gift-balance.vue": () => import("./gift-balance-c8b46c0d.js"), "../addon/sow_community/views/package/components/gift-points.vue": () => import("./gift-points-0ad5dafe.js"), "../addon/sow_community/views/reward_rule/components/reward_rule-detail.vue": () => import("./reward_rule-detail-af927097.js"), "../addon/sow_community/views/reward_rule/edit.vue": () => import("./edit-4336ebc6.js"), "../addon/sow_community/views/reward_rule/list.vue": () => import("./list-d7499fbc.js"), "../addon/sow_community/views/sensitive/index.vue": () => import("./index-6a0ca7ec.js"), "../addon/sow_community/views/topic/components/topic-edit.vue": () => import("./topic-edit-655f2c08.js"), "../addon/sow_community/views/topic/list.vue": () => import("./list-cfd6a588.js"), "../addon/sow_community/views/treasure/components/goods-select-popup.vue": () => import("./goods-select-popup-1e5f04c8.js"), "../addon/sow_community/views/treasure/components/treasure-edit.vue": () => import("./treasure-edit-655f2c08.js"), "../addon/sow_community/views/treasure/list.vue": () => import("./list-2c7214bb.js"), "../addon/tourism/views/components/goods-day-member-price-popup.vue": () => import("./goods-day-member-price-popup-d94f8341.js"), "../addon/tourism/views/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6d3cb185.js"), "../addon/tourism/views/components/hotel-select-popup.vue": () => import("./hotel-select-popup-466f984e.js"), "../addon/tourism/views/components/tickets-select-popup.vue": () => import("./tickets-select-popup-1bd27185.js"), "../addon/tourism/views/components/travel-select-popup.vue": () => import("./travel-select-popup-7f7961ad.js"), "../addon/tourism/views/components/verifier.vue": () => import("./verifier-6a0ca7ec.js"), "../addon/tourism/views/diy/components/edit-tourism-hotel.vue": () => import("./edit-tourism-hotel-9ffb527f.js").then((r) => r._), "../addon/tourism/views/diy/components/edit-tourism-tickets.vue": () => import("./edit-tourism-tickets-9ffb527f.js").then((r) => r._), "../addon/tourism/views/diy/components/edit-tourism-travel.vue": () => import("./edit-tourism-travel-9ffb527f.js").then((r) => r._), "../addon/tourism/views/hotel/edit_hotel.vue": () => import("./edit_hotel-af5deb41.js"), "../addon/tourism/views/hotel/edit_room.vue": () => import("./edit_room-ed91e06e.js"), "../addon/tourism/views/hotel/list.vue": () => import("./list-9a3023c5.js"), "../addon/tourism/views/hotel/order.vue": () => import("./order-7ac972e3.js"), "../addon/tourism/views/hotel/order_detail.vue": () => import("./order_detail-6a0ca7ec.js"), "../addon/tourism/views/hotel/room.vue": () => import("./room-655f2c08.js"), "../addon/tourism/views/hotel/select_content.vue": () => import("./select_content-3bfd80a0.js"), "../addon/tourism/views/index.vue": () => import("./index-39017b54.js"), "../addon/tourism/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-6a0ca7ec.js"), "../addon/tourism/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-6a0ca7ec.js"), "../addon/tourism/views/poster/components/edit-tourism-goods-image.vue": () => import("./edit-tourism-goods-image-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/edit-tourism-goods-name.vue": () => import("./edit-tourism-goods-name-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/edit-tourism-goods-price.vue": () => import("./edit-tourism-goods-price-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-image.vue": () => import("./preview-tourism-goods-image-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-name.vue": () => import("./preview-tourism-goods-name-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-price.vue": () => import("./preview-tourism-goods-price-9ffb527f.js").then((r) => r._), "../addon/tourism/views/refund.vue": () => import("./refund-655f2c08.js"), "../addon/tourism/views/scenic/edit_scenic.vue": () => import("./edit_scenic-a48f386f.js"), "../addon/tourism/views/scenic/edit_ticket.vue": () => import("./edit_ticket-655f2c08.js"), "../addon/tourism/views/scenic/list.vue": () => import("./list-a5e84786.js"), "../addon/tourism/views/scenic/order.vue": () => import("./order-24ca72c5.js"), "../addon/tourism/views/scenic/order_detail.vue": () => import("./order_detail-7ac972e3.js"), "../addon/tourism/views/scenic/select_content.vue": () => import("./select_content-0877ee01.js"), "../addon/tourism/views/scenic/ticket.vue": () => import("./ticket-655f2c08.js"), "../addon/tourism/views/setting.vue": () => import("./setting-655f2c08.js"), "../addon/tourism/views/site_index.vue": () => import("./site_index-dce8610c.js"), "../addon/tourism/views/verify.vue": () => import("./verify-655f2c08.js"), "../addon/tourism/views/way/edit.vue": () => import("./edit-84007781.js"), "../addon/tourism/views/way/list.vue": () => import("./list-bdf58dc3.js"), "../addon/tourism/views/way/order.vue": () => import("./order-655f2c08.js"), "../addon/tourism/views/way/order_detail.vue": () => import("./order_detail-655f2c08.js"), "../addon/tourism/views/way/select_content.vue": () => import("./select_content-8c74def9.js"), "../addon/vipcard/views/card/edit.vue": () => import("./edit-be62f8bb.js"), "../addon/vipcard/views/card/list.vue": () => import("./list-9b808d93.js"), "../addon/vipcard/views/card/record_info.vue": () => import("./record_info-655f2c08.js"), "../addon/vipcard/views/card/record_list.vue": () => import("./record_list-655f2c08.js"), "../addon/vipcard/views/card/select_content.vue": () => import("./select_content-0e497857.js"), "../addon/vipcard/views/components/card-goods-select.vue": () => import("./card-goods-select-655f2c08.js"), "../addon/vipcard/views/components/category-edit.vue": () => import("./category-edit-8c10629e.js"), "../addon/vipcard/views/components/goods-select-popup.vue": () => import("./goods-select-popup-3394345a.js"), "../addon/vipcard/views/components/record-info.vue": () => import("./record-info-655f2c08.js"), "../addon/vipcard/views/components/verifier.vue": () => import("./verifier-655f2c08.js"), "../addon/vipcard/views/diy/components/edit-vipcard-card.vue": () => import("./edit-vipcard-card-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": () => import("./edit-vipcard-reserve-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/diy/components/edit-vipcard-store.vue": () => import("./edit-vipcard-store-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/index.vue": () => import("./index-41a07817.js"), "../addon/vipcard/views/order.vue": () => import("./order-8c10629e.js"), "../addon/vipcard/views/order_detail.vue": () => import("./order_detail-24ca72c5.js"), "../addon/vipcard/views/refund.vue": () => import("./refund-6a0ca7ec.js"), "../addon/vipcard/views/reserve/components/add-reserve.vue": () => import("./add-reserve-655f2c08.js"), "../addon/vipcard/views/reserve/components/reserve-detail.vue": () => import("./reserve-detail-655f2c08.js"), "../addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue": () => import("./vipcard-reserve-edit-655f2c08.js"), "../addon/vipcard/views/reserve/index.vue": () => import("./index-8516e1a7.js"), "../addon/vipcard/views/reserve/list.vue": () => import("./list-2f0d7313.js"), "../addon/vipcard/views/reserve/set.vue": () => import("./set-655f2c08.js"), "../addon/vipcard/views/service/category.vue": () => import("./category-1ad78c96.js"), "../addon/vipcard/views/service/edit.vue": () => import("./edit-1ad78c96.js"), "../addon/vipcard/views/service/list.vue": () => import("./list-3863697e.js"), "../addon/vipcard/views/service/record_info.vue": () => import("./record_info-6a0ca7ec.js"), "../addon/vipcard/views/service/record_list.vue": () => import("./record_list-6a0ca7ec.js"), "../addon/vipcard/views/service/select_content.vue": () => import("./select_content-e7dc06a4.js"), "../addon/vipcard/views/site_index.vue": () => import("./site_index-fb88e87e.js"), "../addon/vipcard/views/technician/components/add-technician.vue": () => import("./add-technician-655f2c08.js"), "../addon/vipcard/views/technician/detail.vue": () => import("./detail-42d345a7.js"), "../addon/vipcard/views/technician/list.vue": () => import("./list-484e4994.js"), "../addon/vipcard/views/verify.vue": () => import("./verify-6a0ca7ec.js") }), addonLayoutModules = /* @__PURE__ */ Object.assign({ "../addon/home_service/layout/index.vue": () => import("./index-8c10629e.js"), "../addon/o2o/layout/index.vue": () => import("./index-1ad78c96.js"), "../addon/shop/layout/index.vue": () => import("./index-b0ffb798.js"), "../addon/tourism/layout/index.vue": () => import("./index-7da0b282.js"), "../addon/vipcard/layout/index.vue": () => import("./index-3f1aed28.js") });
async function importProdModule(r) {
  try {
    const s = await import(adminUrl((r.startsWith("./"), r)));
    return s.default ?? s;
  } catch {
    return null;
  }
}
function loadAddonView(r, i) {
  return r ? async () => {
    var s;
    if (await ensureAddonProdReady(), !isAddonInstalled(r))
      return console.error(`[loadAddonView] addon "${r}" not installed. Installed:`, getInstalledAddonKeys()), load404();
    try {
      const a = await loadAddonModule(r);
      if (!a)
        return console.error(`[loadAddonView] addon "${r}" module loaded as null/undefined`), load404();
      const c = (s = a.views) == null ? void 0 : s[i];
      if (!c) {
        const d = Object.keys(a.views || {});
        return console.error(`[loadAddonView] addon="${r}" viewPath="${i}" NOT FOUND. Available (${d.length}):`, d.slice(0, 10), d.length > 10 ? `... and ${d.length - 10} more` : ""), load404();
      }
      try {
        return await c();
      } catch (d) {
        return console.error(`[loadAddonView] addon="${r}" viewPath="${i}" loader threw:`, d), load404();
      }
    } catch (a) {
      return console.error(`[loadAddonView] addon="${r}" module import failed:`, a), load404();
    }
  } : () => load404();
}
function loadAddonComponent(r, i, s) {
  const a = `${i}/${s}`.replace(/\/+/g, "/");
  return async () => {
    if (await ensureAddonProdReady(), !isAddonInstalled(r))
      return null;
    try {
      const c = await loadAddonModule(r);
      if (!c)
        return null;
      const d = c.components;
      if (!d)
        return null;
      const l = d[a];
      return l ? await l() : null;
    } catch {
      return null;
    }
  };
}
function loadAddonLayout(r) {
  return async () => {
    var a;
    if (await ensureAddonProdReady(), !isAddonInstalled(r))
      return load404();
    const i = (a = getProdManifests()[r]) == null ? void 0 : a.layout;
    if (!i)
      return load404();
    const s = await importProdModule(i);
    return s ? { default: s } : load404();
  };
}
const coreVueModules$1 = {
  .../* @__PURE__ */ Object.assign({ "../app/components/cloud-build/index.vue": () => import("./index-313713a8.js"), "../app/components/upgrade-log/index.vue": () => import("./index-f27297e5.js"), "../app/components/upgrade/index.vue": () => import("./index-3bac7220.js"), "../app/components/user-info-edit/index.vue": () => import("./index-5ea06ae6.js"), "../app/components/weappupload/index.vue": () => import("./index-d1a1ce34.js"), "../app/views/app/authorize.vue": () => import("./authorize-8463e86c.js"), "../app/views/app/index.vue": () => import("./index-3a574033.js"), "../app/views/app/marketing.vue": () => import("./marketing-60040aa3.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-0402b127.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-5dc05d77.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-34bff9b1.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-48b5d617.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-820969f3.js"), "../app/views/auth/log.vue": () => import("./log-d19e1834.js"), "../app/views/auth/menu.vue": () => import("./menu-ad47a491.js"), "../app/views/auth/role.vue": () => import("./role-fcb9d148.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-d7ff072c.js"), "../app/views/auth/user.vue": () => import("./user-e41f72cf.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-7b30277c.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-f084d78c.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-98a0457a.js"), "../app/views/channel/app/access.vue": () => import("./access-fc93d74f.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-6872d057.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-eeec2ca6.js"), "../app/views/channel/app/config.vue": () => import("./config-7e945a86.js"), "../app/views/channel/app/version.vue": () => import("./version-46fd4edd.js"), "../app/views/channel/h5/config.vue": () => import("./config-f80676c4.js"), "../app/views/channel/pc/config.vue": () => import("./config-6ce35528.js"), "../app/views/channel/weapp/access.vue": () => import("./access-de89ba90.js"), "../app/views/channel/weapp/code.vue": () => import("./code-128eb262.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-93ff9887.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-8f7901b7.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-d24b871f.js"), "../app/views/channel/weapp/config.vue": () => import("./config-4e921e3a.js"), "../app/views/channel/weapp/course.vue": () => import("./course-1be32c8c.js"), "../app/views/channel/weapp/template.vue": () => import("./template-0021e34c.js"), "../app/views/channel/wechat/access.vue": () => import("./access-6b98638f.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-b043cdad.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-8b1471ef.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-89c0df15.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-02d65585.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-5f7db26a.js"), "../app/views/channel/wechat/config.vue": () => import("./config-54535681.js"), "../app/views/channel/wechat/course.vue": () => import("./course-23415480.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-731cc3f4.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-b3d4e9b8.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-3a5b3085.js"), "../app/views/channel/wechat/template.vue": () => import("./template-e838e8be.js"), "../app/views/dict/components/dict.vue": () => import("./dict-9cf1c8d1.js"), "../app/views/dict/components/edit.vue": () => import("./edit-28886e00.js"), "../app/views/dict/list.vue": () => import("./list-03e61cc0.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-0deea01d.js").then((r) => r.a), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-33290b2c.js").then((r) => r._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-8d3531d4.js").then((r) => r._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-ac881eaa.js").then((r) => r._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-59d349ff.js").then((r) => r._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-81ee2d19.js").then((r) => r._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-c3b4cf0a.js").then((r) => r._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-360aee63.js").then((r) => r._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-14402138.js").then((r) => r._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-8036576f.js").then((r) => r._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-0e51e911.js").then((r) => r._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-1dca049b.js").then((r) => r._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-762a2631.js").then((r) => r._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-d53beb72.js").then((r) => r._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-5c2d5dfd.js").then((r) => r._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-91008b7b.js").then((r) => r._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-e210442c.js").then((r) => r._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-5135487e.js").then((r) => r.a), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-46f075e4.js").then((r) => r._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-1e898140.js").then((r) => r._), "../app/views/diy/edit.vue": () => import("./edit-f1e6fb54.js"), "../app/views/diy/index.vue": () => import("./index-e8cba75f.js"), "../app/views/diy/list.vue": () => import("./list-870e7e21.js"), "../app/views/diy/member.vue": () => import("./member-862ad417.js"), "../app/views/diy/route.vue": () => import("./route-01127827.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-3bebf623.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-011239c9.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-3e202e99.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-42b18580.js").then((r) => r._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-cdea5687.js").then((r) => r._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-3522bae4.js").then((r) => r._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-752f6bec.js").then((r) => r._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-9f6793a8.js").then((r) => r._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-c478108f.js").then((r) => r._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-9c066118.js").then((r) => r._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-b8915f4b.js").then((r) => r._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-81939823.js").then((r) => r._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-4fd104b8.js").then((r) => r._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-9a80eddb.js").then((r) => r._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-2bd8d9ca.js").then((r) => r._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-5c6b6de6.js").then((r) => r._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-c9e76c71.js").then((r) => r._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-0afb9519.js").then((r) => r._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-bec0a236.js").then((r) => r._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-00a2d6d0.js").then((r) => r._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-010c9285.js").then((r) => r._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-eaf1218e.js").then((r) => r._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-824d08db.js").then((r) => r._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-d8427727.js").then((r) => r._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-98485dd9.js").then((r) => r._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-d16bc282.js").then((r) => r._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-ffdc7f79.js").then((r) => r._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-96415554.js").then((r) => r._), "../app/views/diy_form/edit.vue": () => import("./edit-77c4dbd0.js"), "../app/views/diy_form/list.vue": () => import("./list-465c4093.js"), "../app/views/diy_form/records.vue": () => import("./records-70c030aa.js"), "../app/views/error/404.vue": () => import("./404-911cf06c.js"), "../app/views/finance/account.vue": () => import("./account-8d680585.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-0ba18a50.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-994edb63.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-16b12cd7.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-e5b9c3e2.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-7504dc6b.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-3fb76b33.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-a83dec39.js"), "../app/views/home/index.vue": () => import("./index-b338d6f1.js"), "../app/views/home/personal.vue": () => import("./personal-52f5a0e3.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-2ed555a0.js"), "../app/views/index/index.vue": () => import("./index-ac462a7f.js"), "../app/views/index/preview.vue": () => import("./preview-9b7c15f2.js"), "../app/views/index/store.vue": () => import("./store-410c2686.js"), "../app/views/index/tools.vue": () => import("./tools-89033a2f.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-3791b447.js"), "../app/views/login/index.vue": () => import("./index-4c56baaf.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-d252d9e1.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-703a101f.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-777c0981.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-5514de48.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-61d5b273.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-48455267.js"), "../app/views/marketing/verify.vue": () => import("./verify-7d336a0e.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-eaac35a9.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-5fa1414d.js"), "../app/views/member/balance.vue": () => import("./balance-b75685d9.js"), "../app/views/member/commission.vue": () => import("./commission-91da9180.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-b7db4d3c.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-0a9bcf98.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-f140ee9b.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-fbe14830.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-398293bc.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-67616df8.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-94b3778e.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-62220d9f.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-cc05cd88.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-6594f575.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-9e8b1e9d.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-95ce083f.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-43e4aa5d.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-0d1f9937.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-d451ce17.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-14300f94.js"), "../app/views/member/growth.vue": () => import("./growth-ae9178c9.js"), "../app/views/member/label.vue": () => import("./label-13b8043a.js"), "../app/views/member/level.vue": () => import("./level-30816c48.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-f2b270e7.js"), "../app/views/member/member.vue": () => import("./member-331e997b.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-28b55070.js"), "../app/views/member/point.vue": () => import("./point-798d83f9.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-aad9af86.js").then((r) => r._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-25fdfed2.js").then((r) => r._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-3e9fd619.js").then((r) => r._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-f0e002cc.js").then((r) => r._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-a8e1abc4.js").then((r) => r._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-f60e62d6.js").then((r) => r._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-b8e24d7b.js").then((r) => r._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-0425b453.js").then((r) => r._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-3da3248d.js").then((r) => r._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-c5c041ae.js").then((r) => r._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-dbb12784.js").then((r) => r._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-fd1abe8f.js").then((r) => r._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-6e2fcfdd.js").then((r) => r._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-20fd80a7.js").then((r) => r._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-c1ecf7cd.js").then((r) => r._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-8ed0bd7e.js").then((r) => r._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-0767f716.js").then((r) => r._), "../app/views/poster/edit.vue": () => import("./edit-b8192b2a.js"), "../app/views/poster/list.vue": () => import("./list-4350cb25.js"), "../app/views/printer/edit.vue": () => import("./edit-092be0e7.js"), "../app/views/printer/list.vue": () => import("./list-f168865c.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-12457e14.js"), "../app/views/printer/template_list.vue": () => import("./template_list-48ca7c65.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-e9a1e956.js"), "../app/views/setting/agreement.vue": () => import("./agreement-c8ee7aee.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-4b4216f6.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-9ef15c80.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-f5256fb0.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-1d1a690f.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-a87b8266.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-67311dae.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-88989c88.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-a8fcf5af.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-d5578390.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-0d310004.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-9663e192.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-35bc0183.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-60d21732.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-adce9cf5.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-bfa11783.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-61edbbe4.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-b440ebbe.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-18efe5dc.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-f405f347.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-9434f0fb.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-bdea03f6.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-c6ee61a4.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-00aae7dc.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-cc25af3f.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-15ea5905.js"), "../app/views/setting/copyright.vue": () => import("./copyright-04bd34a5.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-5fc6c83e.js"), "../app/views/setting/export.vue": () => import("./export-cb797d38.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-ee1d6eb1.js"), "../app/views/setting/layout.vue": () => import("./layout-7038b770.js"), "../app/views/setting/login.vue": () => import("./login-ffc99010.js"), "../app/views/setting/map.vue": () => import("./map-dc2aa8b5.js"), "../app/views/setting/member.vue": () => import("./member-bdaf17fd.js"), "../app/views/setting/notice.vue": () => import("./notice-378cdc3b.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-add8b7e5.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-dfc406fa.js"), "../app/views/setting/pay.vue": () => import("./pay-5c2e294e.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-609c173a.js"), "../app/views/setting/sms.vue": () => import("./sms-60f482bc.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-28a9c2aa.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-64d19c88.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-83c8f247.js"), "../app/views/setting/storage.vue": () => import("./storage-9f45fee8.js"), "../app/views/setting/system.vue": () => import("./system-6ef389f8.js"), "../app/views/setting/transfer.vue": () => import("./transfer-3b132649.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-246d737e.js"), "../app/views/setting/weapp.vue": () => import("./weapp-3e70007a.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-a412faee.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-e124e6d2.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-b6bd526a.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-c01563e1.js"), "../app/views/site/group.vue": () => import("./group-d6df3b0b.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-3c06de67.js"), "../app/views/site/info.vue": () => import("./info-0c35b502.js"), "../app/views/site/list.vue": () => import("./list-0cbb1f7b.js"), "../app/views/site/manage.vue": () => import("./manage-1b5d7d61.js"), "../app/views/site/user.vue": () => import("./user-5f55c48a.js"), "../app/views/site/user_info.vue": () => import("./user_info-3fe92b2c.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-f5e82bde.js"), "../app/views/tools/addon/index.vue": () => import("./index-60befbac.js"), "../app/views/tools/addon/list.vue": () => import("./list-2a10ea66.js"), "../app/views/tools/attachment.vue": () => import("./attachment-77ef63d9.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-3d6404ae.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-059720f3.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-9b48b6da.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-32aa07d0.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-caef74db.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-f33cbb34.js"), "../app/views/tools/code/edit.vue": () => import("./edit-592e23d5.js"), "../app/views/tools/code/index.vue": () => import("./index-c9778dd3.js"), "../app/views/tools/code/list.vue": () => import("./list-d8571de9.js"), "../app/views/tools/detection.vue": () => import("./detection-75917a42.js"), "../app/views/tools/schedule.vue": () => import("./schedule-5fc8d6f5.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-b0dee830.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-57bd1cc1.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-3afb99c1.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-8e4151b6.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-f2690ce4.js") }),
  .../* @__PURE__ */ Object.assign({ "../components/diy-link/index.vue": () => import("./index-c32577dd.js"), "../components/diy-page/index.vue": () => Promise.resolve().then(() => index$4), "../components/editor/index.vue": () => Promise.resolve().then(() => index), "../components/export-sure/index.vue": () => import("./index-b7e7392b.js"), "../components/heat-map/index.vue": () => import("./index-d83df197.js"), "../components/icon/index.vue": () => import("./index-9c1a7b4f.js"), "../components/map-selector/index.vue": () => Promise.resolve().then(() => index$2), "../components/markdown/index.vue": () => import("./index-fff4207c.js"), "../components/popover-input/index.vue": () => import("./index-301c1b74.js"), "../components/range-input/index.vue": () => import("./index-6f9975ac.js"), "../components/select-area/index.vue": () => import("./index-732e3bea.js"), "../components/select-icon/index.vue": () => import("./index-5aaeb3d7.js"), "../components/spread-popup/index.vue": () => import("./index-9f720eec.js"), "../components/upload-attachment/attachment.vue": () => import("./attachment-91f4d472.js"), "../components/upload-attachment/index.vue": () => import("./index-61abfbc8.js"), "../components/upload-audio/index.vue": () => import("./index-e2b556fd.js"), "../components/upload-file/index.vue": () => import("./index-88e1dbcb.js"), "../components/upload-image/index.vue": () => Promise.resolve().then(() => index$6), "../components/upload-video/index.vue": () => import("./index-63d73c3c.js"), "../components/verifition/Verify.vue": () => import("./Verify-925bd58a.js"), "../components/verifition/Verify/VerifyPoints.vue": () => import("./VerifyPoints-3f01bf2a.js"), "../components/verifition/Verify/VerifySlide.vue": () => import("./VerifySlide-026eb56e.js"), "../components/video-player/index.vue": () => import("./index-2ea3bff9.js") }),
  .../* @__PURE__ */ Object.assign({ "../layout/admin/components/aside/index.vue": () => import("./index-6ddefef2.js"), "../layout/admin/components/aside/menu-item.vue": () => import("./menu-item-228d35a1.js"), "../layout/admin/components/aside/side.vue": () => import("./side-99ec5474.js"), "../layout/admin/components/header/index.vue": () => import("./index-5cbe2303.js"), "../layout/admin/components/header/layout-setting.vue": () => import("./layout-setting-b8839486.js"), "../layout/admin/components/header/message.vue": () => import("./message-8ba660d3.js"), "../layout/admin/components/header/switch-lang.vue": () => import("./switch-lang-b419cda8.js"), "../layout/admin/components/header/user-info.vue": () => import("./user-info-e1bc8a9b.js"), "../layout/admin/components/tabs.vue": () => import("./tabs-04e29f55.js"), "../layout/admin/index.vue": () => import("./index-9efc8f4a.js"), "../layout/admin_simplicity/components/aside/index.vue": () => import("./index-470a83c7.js"), "../layout/admin_simplicity/components/aside/menu-item.vue": () => import("./menu-item-30098fbc.js"), "../layout/admin_simplicity/components/aside/side.vue": () => import("./side-8c57e812.js"), "../layout/admin_simplicity/components/header/index.vue": () => import("./index-174ebd19.js"), "../layout/admin_simplicity/components/header/layout-setting.vue": () => import("./layout-setting-8be1aa48.js"), "../layout/admin_simplicity/components/header/message.vue": () => import("./message-ab428190.js"), "../layout/admin_simplicity/components/header/switch-lang.vue": () => import("./switch-lang-0971897f.js"), "../layout/admin_simplicity/components/header/user-info.vue": () => import("./user-info-8cf18b19.js"), "../layout/admin_simplicity/components/tabs.vue": () => import("./tabs-d70b95ee.js"), "../layout/admin_simplicity/index.vue": () => import("./index-3d70eae0.js"), "../layout/bussiness/components/aside/index.vue": () => import("./index-d766f3ab.js"), "../layout/bussiness/components/aside/menu-item.vue": () => import("./menu-item-601f0954.js"), "../layout/bussiness/components/aside/side.vue": () => import("./side-f9a8c62b.js"), "../layout/bussiness/components/header/index.vue": () => import("./index-73b1f0bf.js"), "../layout/bussiness/components/header/layout-setting.vue": () => import("./layout-setting-0ab69728.js"), "../layout/bussiness/components/header/switch-lang.vue": () => import("./switch-lang-01038d43.js"), "../layout/bussiness/components/header/user-info.vue": () => import("./user-info-493c4096.js"), "../layout/bussiness/components/tabs.vue": () => import("./tabs-04d8fab8.js"), "../layout/bussiness/index.vue": () => import("./index-227d9693.js"), "../layout/darkside/components/aside/index.vue": () => import("./index-ed34177b.js"), "../layout/darkside/components/aside/menu-item.vue": () => import("./menu-item-ffaf7924.js"), "../layout/darkside/components/aside/side.vue": () => import("./side-99868ff0.js"), "../layout/darkside/components/header/index.vue": () => import("./index-232f1cdc.js"), "../layout/darkside/components/header/layout-setting.vue": () => import("./layout-setting-c71d24f3.js"), "../layout/darkside/components/header/switch-lang.vue": () => import("./switch-lang-6562f7ea.js"), "../layout/darkside/components/header/user-info.vue": () => import("./user-info-c90686a4.js"), "../layout/darkside/components/tabs.vue": () => import("./tabs-1391f48d.js"), "../layout/darkside/index.vue": () => import("./index-9cc2c2c4.js"), "../layout/decorate/index.vue": () => Promise.resolve().then(() => index$8), "../layout/default/components/aside/index.vue": () => import("./index-df26978a.js"), "../layout/default/components/aside/menu-item.vue": () => import("./menu-item-39ce0aab.js"), "../layout/default/components/aside/side.vue": () => import("./side-6f0d1b43.js"), "../layout/default/components/header/index.vue": () => import("./index-35220bed.js"), "../layout/default/components/header/layout-setting.vue": () => import("./layout-setting-bf2412dd.js"), "../layout/default/components/header/switch-lang.vue": () => import("./switch-lang-263d5606.js"), "../layout/default/components/header/user-info.vue": () => import("./user-info-860f008a.js"), "../layout/default/components/tabs.vue": () => import("./tabs-dc744296.js"), "../layout/default/index.vue": () => import("./index-d36da650.js"), "../layout/index.vue": () => Promise.resolve().then(() => index$9), "../layout/lightside/components/aside/index.vue": () => import("./index-46ff47a8.js"), "../layout/lightside/components/aside/menu-item.vue": () => import("./menu-item-8fbf6d31.js"), "../layout/lightside/components/aside/side.vue": () => import("./side-5d388e29.js"), "../layout/lightside/components/header/index.vue": () => import("./index-4df9545a.js"), "../layout/lightside/components/header/layout-setting.vue": () => import("./layout-setting-cdcf9e3f.js"), "../layout/lightside/components/header/switch-lang.vue": () => import("./switch-lang-469409b3.js"), "../layout/lightside/components/header/user-info.vue": () => import("./user-info-858ec70f.js"), "../layout/lightside/components/tabs.vue": () => import("./tabs-fb9c4bd7.js"), "../layout/lightside/index.vue": () => import("./index-eef5c3d5.js"), "../layout/profession/components/aside/index.vue": () => import("./index-e5acb35a.js"), "../layout/profession/components/aside/menu-item.vue": () => import("./menu-item-03ad4aea.js"), "../layout/profession/components/aside/side.vue": () => import("./side-562f6393.js"), "../layout/profession/components/header/index.vue": () => import("./index-22edf52f.js"), "../layout/profession/components/header/layout-setting.vue": () => import("./layout-setting-dd3cc41e.js"), "../layout/profession/components/header/switch-lang.vue": () => import("./switch-lang-d031381f.js"), "../layout/profession/components/header/user-info.vue": () => import("./user-info-485c157e.js"), "../layout/profession/components/tabs.vue": () => import("./tabs-9a165a0b.js"), "../layout/profession/index.vue": () => import("./index-7d422367.js"), "../layout/routine/components/aside/index.vue": () => import("./index-8338e7c2.js"), "../layout/routine/components/aside/menu-item.vue": () => import("./menu-item-ca2619d6.js"), "../layout/routine/components/aside/side.vue": () => import("./side-ab2ce500.js"), "../layout/routine/components/header/index.vue": () => import("./index-87707f50.js"), "../layout/routine/components/header/layout-setting.vue": () => import("./layout-setting-f302333c.js"), "../layout/routine/components/header/switch-lang.vue": () => import("./switch-lang-05c93cc2.js"), "../layout/routine/components/header/user-info.vue": () => import("./user-info-fc1df0f2.js"), "../layout/routine/components/tabs.vue": () => import("./tabs-038676ca.js"), "../layout/routine/index.vue": () => import("./index-d895eef4.js") })
};
function normalizeComponentKey$1(r) {
  return r.replace(/^@\//, "").replace(/^\/src\//, "").replace(/^\.\.\//, "").replace(/\\/g, "/");
}
function findCoreModuleLoader$1(r) {
  const i = coreVueModules$1;
  if (i[r])
    return i[r];
  const s = normalizeComponentKey$1(r), a = Object.keys(i).find((c) => normalizeComponentKey$1(c) === s || normalizeComponentKey$1(c).endsWith(`/${s}`));
  return a ? i[a] : void 0;
}
function resolveAsyncComponent$1(r) {
  return defineAsyncComponent(async () => {
    const i = findCoreModuleLoader$1(r);
    return i ? (await i()).default : (await loadCoreVueModule$1(r)).default;
  });
}
async function loadCoreVueModule$1(r) {
  const i = findCoreModuleLoader$1(r);
  if (i)
    return i();
  throw new Error(`Component not found: ${r}`);
}
const addonLoader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  adminUrl,
  clearAddonStyleCache,
  coreVueModules: coreVueModules$1,
  getInstalledAddonKeys,
  inferAddonFromPath,
  initAddonManifests,
  loadAddonComponent,
  loadAddonLang,
  loadAddonLayout,
  loadAddonModule,
  loadAddonView,
  loadCoreVueModule: loadCoreVueModule$1,
  preloadAllAddonLangs,
  registerAddonManifest,
  resolveAsyncComponent: resolveAsyncComponent$1,
  resolveLangFile,
  resolveRouteAddon,
  resolveRouteView
}, Symbol.toStringTag, { value: "Module" })), STATIC_ROUTES = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./404-911cf06c.js")
  }
], NO_LOGIN_ROUTES = [
  "/404"
], ROOT_ROUTER = {
  path: "/",
  component: _sfc_main$5,
  name: Symbol()
}, ADMIN_ROUTE = {
  path: "/admin",
  name: "admin",
  children: [
    {
      path: "",
      name: "adminRoot",
      component: _sfc_main$5,
      children: []
    },
    {
      path: "login",
      meta: {
        type: 1,
        title: "用户登录"
      },
      component: () => import("./index-4c56baaf.js")
    }
  ]
}, HOME_ROUTE = {
  path: "/home",
  name: "home",
  children: [
    {
      path: "",
      name: "homeRoot",
      component: _sfc_main$5
    },
    {
      path: "index",
      name: "homeIndex",
      meta: {
        type: 1,
        title: "站点管理"
      },
      component: () => import("./index-b338d6f1.js")
    }
  ]
}, SITE_ROUTE = {
  path: "/site",
  name: "site",
  children: [
    {
      path: "",
      name: "siteRoot",
      component: _sfc_main$5,
      children: []
    },
    {
      path: "wxoplatform/callback",
      name: "wxoplatform_callback",
      meta: {
        type: 1,
        title: "微信公众号平台授权"
      },
      component: () => import("./wxoplatform_callback-3791b447.js")
    },
    {
      path: "login",
      meta: {
        type: 1,
        title: "用户登录"
      },
      component: () => import("./index-4c56baaf.js")
    }
  ]
}, DECORATE_ROUTER = {
  path: "/decorate",
  component: Decorate,
  name: "decorate",
  children: []
}, modules = /* @__PURE__ */ Object.assign({ "../app/views/app/authorize.vue": () => import("./authorize-8463e86c.js"), "../app/views/app/index.vue": () => import("./index-3a574033.js"), "../app/views/app/marketing.vue": () => import("./marketing-60040aa3.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-0402b127.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-5dc05d77.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-34bff9b1.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-48b5d617.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-820969f3.js"), "../app/views/auth/log.vue": () => import("./log-d19e1834.js"), "../app/views/auth/menu.vue": () => import("./menu-ad47a491.js"), "../app/views/auth/role.vue": () => import("./role-fcb9d148.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-d7ff072c.js"), "../app/views/auth/user.vue": () => import("./user-e41f72cf.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-7b30277c.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-f084d78c.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-98a0457a.js"), "../app/views/channel/app/access.vue": () => import("./access-fc93d74f.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-6872d057.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-eeec2ca6.js"), "../app/views/channel/app/config.vue": () => import("./config-7e945a86.js"), "../app/views/channel/app/version.vue": () => import("./version-46fd4edd.js"), "../app/views/channel/h5/config.vue": () => import("./config-f80676c4.js"), "../app/views/channel/pc/config.vue": () => import("./config-6ce35528.js"), "../app/views/channel/weapp/access.vue": () => import("./access-de89ba90.js"), "../app/views/channel/weapp/code.vue": () => import("./code-128eb262.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-93ff9887.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-8f7901b7.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-d24b871f.js"), "../app/views/channel/weapp/config.vue": () => import("./config-4e921e3a.js"), "../app/views/channel/weapp/course.vue": () => import("./course-1be32c8c.js"), "../app/views/channel/weapp/template.vue": () => import("./template-0021e34c.js"), "../app/views/channel/wechat/access.vue": () => import("./access-6b98638f.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-b043cdad.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-8b1471ef.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-89c0df15.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-02d65585.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-5f7db26a.js"), "../app/views/channel/wechat/config.vue": () => import("./config-54535681.js"), "../app/views/channel/wechat/course.vue": () => import("./course-23415480.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-731cc3f4.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-b3d4e9b8.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-3a5b3085.js"), "../app/views/channel/wechat/template.vue": () => import("./template-e838e8be.js"), "../app/views/dict/components/dict.vue": () => import("./dict-9cf1c8d1.js"), "../app/views/dict/components/edit.vue": () => import("./edit-28886e00.js"), "../app/views/dict/list.vue": () => import("./list-03e61cc0.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-0deea01d.js").then((r) => r.a), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-33290b2c.js").then((r) => r._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-8d3531d4.js").then((r) => r._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-ac881eaa.js").then((r) => r._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-59d349ff.js").then((r) => r._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-81ee2d19.js").then((r) => r._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-c3b4cf0a.js").then((r) => r._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-360aee63.js").then((r) => r._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-14402138.js").then((r) => r._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-8036576f.js").then((r) => r._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-0e51e911.js").then((r) => r._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-1dca049b.js").then((r) => r._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-762a2631.js").then((r) => r._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-d53beb72.js").then((r) => r._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-5c2d5dfd.js").then((r) => r._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-91008b7b.js").then((r) => r._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-e210442c.js").then((r) => r._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-5135487e.js").then((r) => r.a), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-46f075e4.js").then((r) => r._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-1e898140.js").then((r) => r._), "../app/views/diy/edit.vue": () => import("./edit-f1e6fb54.js"), "../app/views/diy/index.vue": () => import("./index-e8cba75f.js"), "../app/views/diy/list.vue": () => import("./list-870e7e21.js"), "../app/views/diy/member.vue": () => import("./member-862ad417.js"), "../app/views/diy/route.vue": () => import("./route-01127827.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-3bebf623.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-011239c9.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-3e202e99.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-42b18580.js").then((r) => r._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-cdea5687.js").then((r) => r._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-3522bae4.js").then((r) => r._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-752f6bec.js").then((r) => r._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-9f6793a8.js").then((r) => r._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-c478108f.js").then((r) => r._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-9c066118.js").then((r) => r._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-b8915f4b.js").then((r) => r._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-81939823.js").then((r) => r._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-4fd104b8.js").then((r) => r._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-9a80eddb.js").then((r) => r._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-2bd8d9ca.js").then((r) => r._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-5c6b6de6.js").then((r) => r._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-c9e76c71.js").then((r) => r._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-0afb9519.js").then((r) => r._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-bec0a236.js").then((r) => r._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-00a2d6d0.js").then((r) => r._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-010c9285.js").then((r) => r._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-eaf1218e.js").then((r) => r._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-824d08db.js").then((r) => r._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-d8427727.js").then((r) => r._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-98485dd9.js").then((r) => r._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-d16bc282.js").then((r) => r._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-ffdc7f79.js").then((r) => r._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-96415554.js").then((r) => r._), "../app/views/diy_form/edit.vue": () => import("./edit-77c4dbd0.js"), "../app/views/diy_form/list.vue": () => import("./list-465c4093.js"), "../app/views/diy_form/records.vue": () => import("./records-70c030aa.js"), "../app/views/error/404.vue": () => import("./404-911cf06c.js"), "../app/views/finance/account.vue": () => import("./account-8d680585.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-0ba18a50.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-994edb63.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-16b12cd7.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-e5b9c3e2.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-7504dc6b.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-3fb76b33.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-a83dec39.js"), "../app/views/home/index.vue": () => import("./index-b338d6f1.js"), "../app/views/home/personal.vue": () => import("./personal-52f5a0e3.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-2ed555a0.js"), "../app/views/index/index.vue": () => import("./index-ac462a7f.js"), "../app/views/index/preview.vue": () => import("./preview-9b7c15f2.js"), "../app/views/index/store.vue": () => import("./store-410c2686.js"), "../app/views/index/tools.vue": () => import("./tools-89033a2f.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-3791b447.js"), "../app/views/login/index.vue": () => import("./index-4c56baaf.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-d252d9e1.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-703a101f.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-777c0981.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-5514de48.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-61d5b273.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-48455267.js"), "../app/views/marketing/verify.vue": () => import("./verify-7d336a0e.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-eaac35a9.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-5fa1414d.js"), "../app/views/member/balance.vue": () => import("./balance-b75685d9.js"), "../app/views/member/commission.vue": () => import("./commission-91da9180.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-b7db4d3c.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-0a9bcf98.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-f140ee9b.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-fbe14830.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-398293bc.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-67616df8.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-94b3778e.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-62220d9f.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-cc05cd88.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-6594f575.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-9e8b1e9d.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-95ce083f.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-43e4aa5d.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-0d1f9937.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-d451ce17.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-14300f94.js"), "../app/views/member/growth.vue": () => import("./growth-ae9178c9.js"), "../app/views/member/label.vue": () => import("./label-13b8043a.js"), "../app/views/member/level.vue": () => import("./level-30816c48.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-f2b270e7.js"), "../app/views/member/member.vue": () => import("./member-331e997b.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-28b55070.js"), "../app/views/member/point.vue": () => import("./point-798d83f9.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-aad9af86.js").then((r) => r._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-25fdfed2.js").then((r) => r._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-3e9fd619.js").then((r) => r._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-f0e002cc.js").then((r) => r._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-a8e1abc4.js").then((r) => r._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-f60e62d6.js").then((r) => r._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-b8e24d7b.js").then((r) => r._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-0425b453.js").then((r) => r._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-3da3248d.js").then((r) => r._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-c5c041ae.js").then((r) => r._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-dbb12784.js").then((r) => r._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-fd1abe8f.js").then((r) => r._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-6e2fcfdd.js").then((r) => r._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-20fd80a7.js").then((r) => r._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-c1ecf7cd.js").then((r) => r._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-8ed0bd7e.js").then((r) => r._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-0767f716.js").then((r) => r._), "../app/views/poster/edit.vue": () => import("./edit-b8192b2a.js"), "../app/views/poster/list.vue": () => import("./list-4350cb25.js"), "../app/views/printer/edit.vue": () => import("./edit-092be0e7.js"), "../app/views/printer/list.vue": () => import("./list-f168865c.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-12457e14.js"), "../app/views/printer/template_list.vue": () => import("./template_list-48ca7c65.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-e9a1e956.js"), "../app/views/setting/agreement.vue": () => import("./agreement-c8ee7aee.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-4b4216f6.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-9ef15c80.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-f5256fb0.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-1d1a690f.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-a87b8266.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-67311dae.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-88989c88.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-a8fcf5af.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-d5578390.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-0d310004.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-9663e192.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-35bc0183.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-60d21732.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-adce9cf5.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-bfa11783.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-61edbbe4.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-b440ebbe.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-18efe5dc.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-f405f347.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-9434f0fb.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-bdea03f6.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-c6ee61a4.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-00aae7dc.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-cc25af3f.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-15ea5905.js"), "../app/views/setting/copyright.vue": () => import("./copyright-04bd34a5.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-5fc6c83e.js"), "../app/views/setting/export.vue": () => import("./export-cb797d38.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-ee1d6eb1.js"), "../app/views/setting/layout.vue": () => import("./layout-7038b770.js"), "../app/views/setting/login.vue": () => import("./login-ffc99010.js"), "../app/views/setting/map.vue": () => import("./map-dc2aa8b5.js"), "../app/views/setting/member.vue": () => import("./member-bdaf17fd.js"), "../app/views/setting/notice.vue": () => import("./notice-378cdc3b.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-add8b7e5.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-dfc406fa.js"), "../app/views/setting/pay.vue": () => import("./pay-5c2e294e.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-609c173a.js"), "../app/views/setting/sms.vue": () => import("./sms-60f482bc.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-28a9c2aa.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-64d19c88.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-83c8f247.js"), "../app/views/setting/storage.vue": () => import("./storage-9f45fee8.js"), "../app/views/setting/system.vue": () => import("./system-6ef389f8.js"), "../app/views/setting/transfer.vue": () => import("./transfer-3b132649.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-246d737e.js"), "../app/views/setting/weapp.vue": () => import("./weapp-3e70007a.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-a412faee.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-e124e6d2.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-b6bd526a.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-c01563e1.js"), "../app/views/site/group.vue": () => import("./group-d6df3b0b.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-3c06de67.js"), "../app/views/site/info.vue": () => import("./info-0c35b502.js"), "../app/views/site/list.vue": () => import("./list-0cbb1f7b.js"), "../app/views/site/manage.vue": () => import("./manage-1b5d7d61.js"), "../app/views/site/user.vue": () => import("./user-5f55c48a.js"), "../app/views/site/user_info.vue": () => import("./user_info-3fe92b2c.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-f5e82bde.js"), "../app/views/tools/addon/index.vue": () => import("./index-60befbac.js"), "../app/views/tools/addon/list.vue": () => import("./list-2a10ea66.js"), "../app/views/tools/attachment.vue": () => import("./attachment-77ef63d9.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-3d6404ae.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-059720f3.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-9b48b6da.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-32aa07d0.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-caef74db.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-f33cbb34.js"), "../app/views/tools/code/edit.vue": () => import("./edit-592e23d5.js"), "../app/views/tools/code/index.vue": () => import("./index-c9778dd3.js"), "../app/views/tools/code/list.vue": () => import("./list-d8571de9.js"), "../app/views/tools/detection.vue": () => import("./detection-75917a42.js"), "../app/views/tools/schedule.vue": () => import("./schedule-5fc8d6f5.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-b0dee830.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-57bd1cc1.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-3afb99c1.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-8e4151b6.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-f2690ce4.js") }), addonModules = /* @__PURE__ */ Object.assign({ "../addon/cms/views/article/category.vue": () => import("./category-24ca72c5.js"), "../addon/cms/views/article/components/edit-category.vue": () => import("./edit-category-6a0ca7ec.js"), "../addon/cms/views/article/edit.vue": () => import("./edit-9953d7a3.js"), "../addon/cms/views/article/list.vue": () => import("./list-bb70d698.js"), "../addon/cms/views/diy/components/edit-article.vue": () => import("./edit-article-9ffb527f.js").then((r) => r._), "../addon/erp/views/purchase/detail.vue": () => import("./detail-79de761b.js"), "../addon/erp/views/purchase/instock.vue": () => import("./instock-1fd60c82.js"), "../addon/erp/views/purchase/list.vue": () => import("./list-8ea76949.js"), "../addon/erp/views/sales/detail.vue": () => import("./detail-f8617ce5.js"), "../addon/erp/views/sales/list.vue": () => import("./list-f1352308.js"), "../addon/erp/views/sales/outstock.vue": () => import("./outstock-eba40cbb.js"), "../addon/erp/views/stock/detail.vue": () => import("./detail-4b7a6124.js"), "../addon/erp/views/stock/list.vue": () => import("./list-14eb8627.js"), "../addon/erp/views/stock/stockIn.vue": () => import("./stockIn-38e5603c.js"), "../addon/erp/views/stock/stockOut.vue": () => import("./stockOut-5708c50b.js"), "../addon/friend_help/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-7ac972e3.js"), "../addon/friend_help/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-c005414d.js"), "../addon/friend_help/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-c6b2002d.js"), "../addon/friend_help/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-24ca72c5.js"), "../addon/friend_help/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-b259d5b8.js"), "../addon/friend_help/views/active/components/goods-select-content.vue": () => import("./goods-select-content-017904ae.js"), "../addon/friend_help/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-d720e416.js"), "../addon/friend_help/views/active/components/select-member.vue": () => import("./select-member-63e92532.js"), "../addon/friend_help/views/active/edit.vue": () => import("./edit-3022f0b7.js"), "../addon/friend_help/views/active/list.vue": () => import("./list-98995852.js"), "../addon/friend_help/views/active/stat.vue": () => import("./stat-96714f85.js"), "../addon/friend_help/views/config/config.vue": () => import("./config-122e19c0.js"), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": () => import("./edit-friend-help-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": () => import("./edit-friend-help-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": () => import("./edit-friend-help-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": () => import("./edit-friend-help-activity-goods-detail-friend-help-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": () => import("./edit-friend-help-activity-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": () => import("./edit-friend-help-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": () => import("./edit-friend-help-activity-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": () => import("./edit-friend-help-carousel-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": () => import("./edit-friend-help-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": () => import("./edit-friend-help-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": () => import("./edit-friend-help-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": () => import("./edit-friend-help-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": () => import("./edit-friend-help-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": () => import("./edit-friend-help-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-hot.vue": () => import("./edit-friend-help-hot-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-list.vue": () => import("./edit-friend-help-list-076f081e.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": () => import("./edit-friend-help-member-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": () => import("./edit-friend-help-order-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/launch/components/launch-detail-popup.vue": () => import("./launch-detail-popup-655f2c08.js"), "../addon/friend_help/views/launch/list.vue": () => import("./list-f58fe01d.js"), "../addon/friend_help/views/order/components/order-notes.vue": () => import("./order-notes-8c10629e.js"), "../addon/friend_help/views/order/components/refund-detail.vue": () => import("./refund-detail-406525db.js"), "../addon/friend_help/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-655f2c08.js"), "../addon/friend_help/views/order/detail.vue": () => import("./detail-194a7d26.js"), "../addon/friend_help/views/order/list.vue": () => import("./list-6f18e76b.js"), "../addon/friend_help/views/order/refund.vue": () => import("./refund-0e17a08e.js"), "../addon/friend_help/views/poster/components/edit-discount-desc.vue": () => import("./edit-discount-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-3656154e.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-min-price.vue": () => import("./edit-min-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-original-desc.vue": () => import("./edit-original-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-original-price.vue": () => import("./edit-original-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-price.vue": () => import("./edit-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-discount-desc.vue": () => import("./preview-discount-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-3656154e.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-min-price.vue": () => import("./preview-min-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-original-desc.vue": () => import("./preview-original-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-original-price.vue": () => import("./preview-original-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-price.vue": () => import("./preview-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/card/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-7ac972e3.js"), "../addon/home_service/views/card/components/goods-select-popup.vue": () => import("./goods-select-popup-b15cf96a.js"), "../addon/home_service/views/card/edit.vue": () => import("./edit-f3f7f29a.js"), "../addon/home_service/views/card/list.vue": () => import("./list-d193b946.js"), "../addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": () => import("./edit-homeService-carousel-search-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": () => import("./edit-homeService-many-goods-list-8932c315.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-order-info.vue": () => import("./edit-homeService-order-info-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": () => import("./edit-homeService-rubik-cube-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": () => import("./edit-homeServicemember-banner-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-card.vue": () => import("./edit-homeServicemember-card-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": () => import("./edit-homeServicemember-cardList-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": () => import("./edit-homeServicemember-guarantee-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-info.vue": () => import("./edit-homeServicemember-info-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": () => import("./edit-homeServicemember-lowCost-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": () => import("./edit-homeServicemember-panicBuying-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": () => import("./edit-homeServicemember-settle-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": () => import("./edit-homeServicemember-subguarantee-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": () => import("./edit-homeServicemember-technician-list-recommed-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": () => import("./edit-homeServicemember-technician-list-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-card.vue": () => import("./link-select-card-c8bf62b8.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-category.vue": () => import("./link-select-category-b8342db4.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-goods.vue": () => import("./link-select-goods-b4337fab.js").then((r) => r._), "../addon/home_service/views/feedback/list.vue": () => import("./list-cd799851.js"), "../addon/home_service/views/finance/components/BankTransferDialog.vue": () => import("./BankTransferDialog-c61c1e56.js"), "../addon/home_service/views/finance/invoice.vue": () => import("./invoice-655f2c08.js"), "../addon/home_service/views/finance/store_detail.vue": () => import("./store_detail-655f2c08.js"), "../addon/home_service/views/finance/store_finance.vue": () => import("./store_finance-655f2c08.js"), "../addon/home_service/views/finance/technician_detail.vue": () => import("./technician_detail-655f2c08.js"), "../addon/home_service/views/finance/technician_finance.vue": () => import("./technician_finance-655f2c08.js"), "../addon/home_service/views/finance/withdrawal_review.vue": () => import("./withdrawal_review-655f2c08.js"), "../addon/home_service/views/goods/category.vue": () => import("./category-7ac972e3.js"), "../addon/home_service/views/goods/city.vue": () => import("./city-655f2c08.js"), "../addon/home_service/views/goods/components/card-select-popup.vue": () => import("./card-select-popup-4acb3fab.js"), "../addon/home_service/views/goods/components/category-edit.vue": () => import("./category-edit-6a0ca7ec.js"), "../addon/home_service/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-655f2c08.js"), "../addon/home_service/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-afaec690.js"), "../addon/home_service/views/goods/components/guarantee-edit.vue": () => import("./guarantee-edit-655f2c08.js"), "../addon/home_service/views/goods/components/special-edit.vue": () => import("./special-edit-655f2c08.js"), "../addon/home_service/views/goods/edit.vue": () => import("./edit-fa339799.js"), "../addon/home_service/views/goods/guarantee.vue": () => import("./guarantee-655f2c08.js"), "../addon/home_service/views/goods/list.vue": () => import("./list-7ac972e3.js"), "../addon/home_service/views/goods/special.vue": () => import("./special-655f2c08.js"), "../addon/home_service/views/help/category.vue": () => import("./category-655f2c08.js"), "../addon/home_service/views/help/components/edit-category.vue": () => import("./edit-category-655f2c08.js"), "../addon/home_service/views/help/edit.vue": () => import("./edit-65e51d95.js"), "../addon/home_service/views/help/list.vue": () => import("./list-24ca72c5.js"), "../addon/home_service/views/index.vue": () => import("./index-a95c7f6c.js"), "../addon/home_service/views/marketing/coupon/add.vue": () => import("./add-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-ab894a7b.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/select-member.vue": () => import("./select-member-1988f5b1.js"), "../addon/home_service/views/marketing/coupon/edit.vue": () => import("./edit-655f2c08.js"), "../addon/home_service/views/marketing/coupon/list.vue": () => import("./list-8c10629e.js"), "../addon/home_service/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-655f2c08.js"), "../addon/home_service/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-655f2c08.js"), "../addon/home_service/views/order/components/add-address.vue": () => import("./add-address-c6dda74d.js"), "../addon/home_service/views/order/components/address-list.vue": () => import("./address-list-655f2c08.js"), "../addon/home_service/views/order/components/coupon-list.vue": () => import("./coupon-list-655f2c08.js"), "../addon/home_service/views/order/components/friend-pay.vue": () => import("./friend-pay-655f2c08.js"), "../addon/home_service/views/order/components/goods-limit.vue": () => import("./goods-limit-655f2c08.js"), "../addon/home_service/views/order/components/manjian-info.vue": () => import("./manjian-info-655f2c08.js"), "../addon/home_service/views/order/components/order-export-select.vue": () => import("./order-export-select-655f2c08.js"), "../addon/home_service/views/order/components/pay.vue": () => import("./pay-86799441.js"), "../addon/home_service/views/order/components/returnvisit.vue": () => import("./returnvisit-e82e6d3c.js"), "../addon/home_service/views/order/components/select-goods.vue": () => import("./select-goods-655f2c08.js"), "../addon/home_service/views/order/components/select-member.vue": () => import("./select-member-655f2c08.js"), "../addon/home_service/views/order/components/select-orderlabel.vue": () => import("./select-orderlabel-ca773366.js"), "../addon/home_service/views/order/components/select-technician.vue": () => import("./select-technician-655f2c08.js"), "../addon/home_service/views/order/components/select-time.vue": () => import("./select-time-8cc67db8.js"), "../addon/home_service/views/order/config.vue": () => import("./config-a9035567.js"), "../addon/home_service/views/order/easy_select.vue": () => import("./easy_select-15d5a4bc.js"), "../addon/home_service/views/order/easy_select_detail.vue": () => import("./easy_select_detail-815cbe18.js"), "../addon/home_service/views/order/evaluate.vue": () => import("./evaluate-86e49327.js"), "../addon/home_service/views/order/evaluate_config.vue": () => import("./evaluate_config-0c610ae9.js"), "../addon/home_service/views/order/intent_config.vue": () => import("./intent_config-4d8330fc.js"), "../addon/home_service/views/order/lesson_order.vue": () => import("./lesson_order-655f2c08.js"), "../addon/home_service/views/order/lesson_order_confirm.vue": () => import("./lesson_order_confirm-655f2c08.js"), "../addon/home_service/views/order/order.vue": () => import("./order-e84a06f4.js"), "../addon/home_service/views/order/order_detail.vue": () => import("./order_detail-46793948.js"), "../addon/home_service/views/order/protection_settings.vue": () => import("./protection_settings-5ce2ec06.js"), "../addon/home_service/views/order/return_visit.vue": () => import("./return_visit-d1f88e3a.js"), "../addon/home_service/views/order/tags.vue": () => import("./tags-9f4b6837.js"), "../addon/home_service/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/refund/refund.vue": () => import("./refund-0b3368c1.js"), "../addon/home_service/views/report/customer_report.vue": () => import("./customer_report-e31cb8ac.js"), "../addon/home_service/views/report/financial_report.vue": () => import("./financial_report-d26dcd54.js"), "../addon/home_service/views/report/member_report.vue": () => import("./member_report-2bc02802.js"), "../addon/home_service/views/report/store_report.vue": () => import("./store_report-47306f43.js"), "../addon/home_service/views/report/technician_report.vue": () => import("./technician_report-6f28d2c1.js"), "../addon/home_service/views/store/add.vue": () => import("./add-f141cc95.js"), "../addon/home_service/views/store/detail.vue": () => import("./detail-4ff65342.js"), "../addon/home_service/views/store/edit.vue": () => import("./edit-a76c4387.js"), "../addon/home_service/views/store/examine.vue": () => import("./examine-655f2c08.js"), "../addon/home_service/views/store/examine_edit.vue": () => import("./examine_edit-a4eecf45.js"), "../addon/home_service/views/store/list.vue": () => import("./list-655f2c08.js"), "../addon/home_service/views/store/technician.vue": () => import("./technician-655f2c08.js"), "../addon/home_service/views/technician/cityfare.vue": () => import("./cityfare-655f2c08.js"), "../addon/home_service/views/technician/cityfare_config.vue": () => import("./cityfare_config-ee74e4e4.js"), "../addon/home_service/views/technician/components/dynamicCollapseForm/dynamicCollapseForm.vue": () => import("./dynamicCollapseForm-f2045055.js"), "../addon/home_service/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-05ff17fb.js"), "../addon/home_service/views/technician/detail.vue": () => import("./detail-7b4c15d7.js"), "../addon/home_service/views/technician/edit.vue": () => import("./edit-0f307902.js"), "../addon/home_service/views/technician/examine.vue": () => import("./examine-6a0ca7ec.js"), "../addon/home_service/views/technician/examine_edit.vue": () => import("./examine_edit-6a78e218.js"), "../addon/home_service/views/technician/level.vue": () => import("./level-655f2c08.js"), "../addon/home_service/views/technician/level_edit.vue": () => import("./level_edit-1702716b.js"), "../addon/home_service/views/technician/list.vue": () => import("./list-77a11a55.js"), "../addon/huaweicloud_obs/views/setting/components/storage-huawei.vue": () => import("./storage-huawei-655f2c08.js"), "../addon/huaweicloud_sms/views/setting/components/sms-huawei.vue": () => import("./sms-huawei-655f2c08.js"), "../addon/o2o/views/config/reserve.vue": () => import("./reserve-655f2c08.js"), "../addon/o2o/views/diy/components/edit-o2o-goods-list.vue": () => import("./edit-o2o-goods-list-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-member-info.vue": () => import("./edit-o2o-member-info-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-order-info.vue": () => import("./edit-o2o-order-info-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-search.vue": () => import("./edit-o2o-search-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-technician.vue": () => import("./edit-o2o-technician-9ffb527f.js").then((r) => r._), "../addon/o2o/views/goods/category.vue": () => import("./category-6a0ca7ec.js"), "../addon/o2o/views/goods/components/category-edit.vue": () => import("./category-edit-655f2c08.js"), "../addon/o2o/views/goods/components/category-select-content.vue": () => import("./category-select-content-655f2c08.js"), "../addon/o2o/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6a0ca7ec.js"), "../addon/o2o/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-8bc5f882.js"), "../addon/o2o/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-de4eccf8.js"), "../addon/o2o/views/goods/edit.vue": () => import("./edit-8cd37de0.js"), "../addon/o2o/views/goods/list.vue": () => import("./list-6a0ca7ec.js"), "../addon/o2o/views/index.vue": () => import("./index-d3b76651.js"), "../addon/o2o/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-24ca72c5.js"), "../addon/o2o/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-24ca72c5.js"), "../addon/o2o/views/order/components/order-export-select.vue": () => import("./order-export-select-7ac972e3.js"), "../addon/o2o/views/order/config.vue": () => import("./config-7da0b282.js"), "../addon/o2o/views/order/order.vue": () => import("./order-261aafa2.js"), "../addon/o2o/views/order/order_detail.vue": () => import("./order_detail-fe597332.js"), "../addon/o2o/views/order/reserve.vue": () => import("./reserve-441376d0.js"), "../addon/o2o/views/poster/components/edit-o2o-goods-image.vue": () => import("./edit-o2o-goods-image-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/edit-o2o-goods-name.vue": () => import("./edit-o2o-goods-name-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/edit-o2o-goods-price.vue": () => import("./edit-o2o-goods-price-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-image.vue": () => import("./preview-o2o-goods-image-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-name.vue": () => import("./preview-o2o-goods-name-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-price.vue": () => import("./preview-o2o-goods-price-9ffb527f.js").then((r) => r._), "../addon/o2o/views/refund/detail.vue": () => import("./detail-1ad78c96.js"), "../addon/o2o/views/refund/refund.vue": () => import("./refund-7ac972e3.js"), "../addon/o2o/views/site_index.vue": () => import("./site_index-655f2c08.js"), "../addon/o2o/views/technician/components/edit-position.vue": () => import("./edit-position-655f2c08.js"), "../addon/o2o/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-c87af0e3.js"), "../addon/o2o/views/technician/edit.vue": () => import("./edit-f4e9fe4e.js"), "../addon/o2o/views/technician/list.vue": () => import("./list-4a02961a.js"), "../addon/o2o/views/technician/position.vue": () => import("./position-655f2c08.js"), "../addon/pintuan/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-6a0ca7ec.js"), "../addon/pintuan/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-872a9b55.js"), "../addon/pintuan/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-17fce5f8.js"), "../addon/pintuan/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-7ac972e3.js"), "../addon/pintuan/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-b86d6ade.js"), "../addon/pintuan/views/active/components/goods-select-content.vue": () => import("./goods-select-content-99d723c0.js"), "../addon/pintuan/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-8761f88c.js"), "../addon/pintuan/views/active/components/select-member.vue": () => import("./select-member-5ab36100.js"), "../addon/pintuan/views/active/edit.vue": () => import("./edit-1e1475eb.js"), "../addon/pintuan/views/active/list.vue": () => import("./list-fbca5f7b.js"), "../addon/pintuan/views/active/stat.vue": () => import("./stat-bfae590c.js"), "../addon/pintuan/views/config/config.vue": () => import("./config-3f1aed28.js"), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": () => import("./edit-pintuan-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": () => import("./edit-pintuan-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": () => import("./edit-pintuan-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": () => import("./edit-pintuan-activity-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": () => import("./edit-pintuan-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": () => import("./edit-pintuan-activity-goods-detail-pintuan-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": () => import("./edit-pintuan-activity-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": () => import("./edit-pintuan-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": () => import("./edit-pintuan-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": () => import("./edit-pintuan-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": () => import("./edit-pintuan-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": () => import("./edit-pintuan-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": () => import("./edit-pintuan-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-hot.vue": () => import("./edit-pintuan-hot-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": () => import("./edit-pintuan-immediately-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-limit.vue": () => import("./edit-pintuan-limit-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-list.vue": () => import("./edit-pintuan-list-55ae56e7.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": () => import("./edit-pintuan-member-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": () => import("./edit-pintuan-order-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/group/components/group-detail-popup.vue": () => import("./group-detail-popup-655f2c08.js"), "../addon/pintuan/views/group/list.vue": () => import("./list-830bb3e2.js"), "../addon/pintuan/views/order/components/order-notes.vue": () => import("./order-notes-1ad78c96.js"), "../addon/pintuan/views/order/components/refund-detail.vue": () => import("./refund-detail-b57aa288.js"), "../addon/pintuan/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-8c10629e.js"), "../addon/pintuan/views/order/detail.vue": () => import("./detail-78407100.js"), "../addon/pintuan/views/order/list.vue": () => import("./list-69c933f4.js"), "../addon/pintuan/views/order/refund.vue": () => import("./refund-0ffc2561.js"), "../addon/pintuan/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-price.vue": () => import("./edit-price-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-price.vue": () => import("./preview-price-3656154e.js").then((r) => r._), "../addon/recharge/views/order/components/recharge-detail.vue": () => import("./recharge-detail-655f2c08.js"), "../addon/recharge/views/order/detail.vue": () => import("./detail-b0ffb798.js"), "../addon/recharge/views/order/list.vue": () => import("./list-e113a869.js"), "../addon/recharge/views/order/refund.vue": () => import("./refund-24ca72c5.js"), "../addon/recharge/views/package/components/detail-growth.vue": () => import("./detail-growth-e3f26d99.js"), "../addon/recharge/views/package/components/detail-points.vue": () => import("./detail-points-35870f22.js"), "../addon/recharge/views/package/components/gift-growth.vue": () => import("./gift-growth-db23acd9.js"), "../addon/recharge/views/package/components/gift-points.vue": () => import("./gift-points-87fb6710.js"), "../addon/recharge/views/package/components/package-gift.vue": () => import("./package-gift-655f2c08.js"), "../addon/recharge/views/package/config.vue": () => import("./config-d45f3c42.js"), "../addon/recharge/views/package/detail.vue": () => import("./detail-655f2c08.js"), "../addon/recharge/views/package/edit.vue": () => import("./edit-fbae5219.js"), "../addon/recharge/views/package/list.vue": () => import("./list-1ad78c96.js"), "../addon/relay/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-655f2c08.js"), "../addon/relay/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-be5748ae.js"), "../addon/relay/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-cba51086.js"), "../addon/relay/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-655f2c08.js"), "../addon/relay/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-5ee56832.js"), "../addon/relay/views/active/components/goods-select-content.vue": () => import("./goods-select-content-4176593b.js"), "../addon/relay/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-155694b9.js"), "../addon/relay/views/active/components/select-member.vue": () => import("./select-member-fbe03876.js"), "../addon/relay/views/active/edit.vue": () => import("./edit-e6c12e86.js"), "../addon/relay/views/active/list.vue": () => import("./list-122e19c0.js"), "../addon/relay/views/active/stat.vue": () => import("./stat-0f841573.js"), "../addon/relay/views/config/config.vue": () => import("./config-655f2c08.js"), "../addon/relay/views/diy/components/edit-relay-goods-list.vue": () => import("./edit-relay-goods-list-9ffb527f.js").then((r) => r._), "../addon/relay/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-082c2f59.js"), "../addon/relay/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-ef9c7c5f.js"), "../addon/relay/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-1a48cbca.js"), "../addon/relay/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-e1048975.js"), "../addon/relay/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-655f2c08.js"), "../addon/relay/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-132a6518.js"), "../addon/relay/views/goods/edit.vue": () => import("./edit-38ab753d.js"), "../addon/relay/views/goods/list.vue": () => import("./list-57240982.js"), "../addon/relay/views/order/components/order-notes.vue": () => import("./order-notes-655f2c08.js"), "../addon/relay/views/order/components/refund-detail.vue": () => import("./refund-detail-7e87a5a8.js"), "../addon/relay/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-6a0ca7ec.js"), "../addon/relay/views/order/detail.vue": () => import("./detail-cfc6c61b.js"), "../addon/relay/views/order/list.vue": () => import("./list-7dc981b4.js"), "../addon/relay/views/order/refund.vue": () => import("./refund-c97dca95.js"), "../addon/seckill/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-6a0ca7ec.js"), "../addon/seckill/views/active/components/goods-sku-popup.vue": () => import("./goods-sku-popup-973f4b47.js"), "../addon/seckill/views/active/components/seckill-detail-popup.vue": () => import("./seckill-detail-popup-655f2c08.js"), "../addon/seckill/views/active/components/time-select-popup.vue": () => import("./time-select-popup-655f2c08.js"), "../addon/seckill/views/active/detail.vue": () => import("./detail-950ada55.js"), "../addon/seckill/views/active/edit.vue": () => import("./edit-5af64ddd.js"), "../addon/seckill/views/active/list.vue": () => import("./list-b0ffb798.js"), "../addon/seckill/views/active/stat.vue": () => import("./stat-8bba71a4.js"), "../addon/seckill/views/config/config.vue": () => import("./config-6a0ca7ec.js"), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": () => import("./edit-seckill-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": () => import("./edit-seckill-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": () => import("./edit-seckill-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": () => import("./edit-seckill-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": () => import("./edit-seckill-activity-goods-detail-seckill-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": () => import("./edit-seckill-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": () => import("./edit-seckill-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": () => import("./edit-seckill-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": () => import("./edit-seckill-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods.vue": () => import("./edit-seckill-goods-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-hot.vue": () => import("./edit-seckill-hot-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-member-info.vue": () => import("./edit-seckill-member-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-order-info.vue": () => import("./edit-seckill-order-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": () => import("./edit-seckill-rubik-cube-5b5d5c10.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-special-offer.vue": () => import("./edit-seckill-special-offer-9ffb527f.js").then((r) => r._), "../addon/seckill/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-6666628e.js"), "../addon/seckill/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-3669bb9d.js"), "../addon/seckill/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-2e2aae95.js"), "../addon/seckill/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-eae7dff4.js"), "../addon/seckill/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-6a0ca7ec.js"), "../addon/seckill/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-b484486b.js"), "../addon/seckill/views/goods/edit.vue": () => import("./edit-ab8e56b8.js"), "../addon/seckill/views/goods/list.vue": () => import("./list-3fbd8b06.js"), "../addon/seckill/views/order/components/order-notes.vue": () => import("./order-notes-6a0ca7ec.js"), "../addon/seckill/views/order/components/refund-detail.vue": () => import("./refund-detail-4bdb5865.js"), "../addon/seckill/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-7ac972e3.js"), "../addon/seckill/views/order/detail.vue": () => import("./detail-bad327c5.js"), "../addon/seckill/views/order/list.vue": () => import("./list-2bca324c.js"), "../addon/seckill/views/order/refund.vue": () => import("./refund-ee5cd27a.js"), "../addon/seckill/views/poster/components/edit-active-time.vue": () => import("./edit-active-time-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-seckill-market-price.vue": () => import("./edit-seckill-market-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-seckill-price.vue": () => import("./edit-seckill-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-active-time.vue": () => import("./preview-active-time-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-seckill-market-price.vue": () => import("./preview-seckill-market-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-seckill-price.vue": () => import("./preview-seckill-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/time/components/time-diy-select-popup.vue": () => import("./time-diy-select-popup-565c861f.js"), "../addon/seckill/views/time/components/time-goods-detail.vue": () => import("./time-goods-detail-655f2c08.js"), "../addon/seckill/views/time/components/time-select-content.vue": () => import("./time-select-content-9bd7431f.js"), "../addon/seckill/views/time/edit.vue": () => import("./edit-6a0ca7ec.js"), "../addon/seckill/views/time/list.vue": () => import("./list-7da0b282.js"), "../addon/shop/views/address/edit.vue": () => import("./edit-7ac972e3.js"), "../addon/shop/views/address/list.vue": () => import("./list-3f1aed28.js"), "../addon/shop/views/delivery/company.vue": () => import("./company-655f2c08.js"), "../addon/shop/views/delivery/company_edit.vue": () => import("./company_edit-655f2c08.js"), "../addon/shop/views/delivery/components/delivery-personnel-edit.vue": () => import("./delivery-personnel-edit-655f2c08.js"), "../addon/shop/views/delivery/components/local-delivery-service-dada.vue": () => import("./local-delivery-service-dada-655f2c08.js"), "../addon/shop/views/delivery/components/local_record_detail.vue": () => import("./local_record_detail-655f2c08.js"), "../addon/shop/views/delivery/components/shop_record_detail.vue": () => import("./shop_record_detail-655f2c08.js"), "../addon/shop/views/delivery/config.vue": () => import("./config-33f02061.js"), "../addon/shop/views/delivery/electronic_sheet.vue": () => import("./electronic_sheet-655f2c08.js"), "../addon/shop/views/delivery/electronic_sheet_config.vue": () => import("./electronic_sheet_config-538b0b06.js"), "../addon/shop/views/delivery/electronic_sheet_edit.vue": () => import("./electronic_sheet_edit-655f2c08.js"), "../addon/shop/views/delivery/local.vue": () => import("./local-6eb31ec5.js"), "../addon/shop/views/delivery/local_config.vue": () => import("./local_config-655f2c08.js"), "../addon/shop/views/delivery/local_delivery_service.vue": () => import("./local_delivery_service-655f2c08.js"), "../addon/shop/views/delivery/local_record.vue": () => import("./local_record-10eb1497.js"), "../addon/shop/views/delivery/merchant_record.vue": () => import("./merchant_record-6fcfbc7b.js"), "../addon/shop/views/delivery/search.vue": () => import("./search-c677febb.js"), "../addon/shop/views/delivery/staff.vue": () => import("./staff-655f2c08.js"), "../addon/shop/views/delivery/store.vue": () => import("./store-655f2c08.js"), "../addon/shop/views/delivery/store_edit.vue": () => import("./store_edit-655f2c08.js"), "../addon/shop/views/delivery/template.vue": () => import("./template-655f2c08.js"), "../addon/shop/views/delivery/template_edit.vue": () => import("./template_edit-f698ac19.js"), "../addon/shop/views/delivery_store/delivery_set.vue": () => import("./delivery_set-655f2c08.js"), "../addon/shop/views/delivery_store/edit.vue": () => import("./edit-9e28b490.js"), "../addon/shop/views/delivery_store/list.vue": () => import("./list-545eb6f5.js"), "../addon/shop/views/diy/components/edit-goods-coupon.vue": () => import("./edit-goods-coupon-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-goods-list.vue": () => import("./edit-goods-list-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-many-goods-list.vue": () => import("./edit-many-goods-list-4bd70d63.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-exchange-goods.vue": () => import("./edit-shop-exchange-goods-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-exchange-info.vue": () => import("./edit-shop-exchange-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": () => import("./edit-shop-goods-detail-attr-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": () => import("./edit-shop-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": () => import("./edit-shop-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": () => import("./edit-shop-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": () => import("./edit-shop-goods-detail-evaluate-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": () => import("./edit-shop-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": () => import("./edit-shop-goods-detail-sow-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-hot.vue": () => import("./edit-shop-goods-hot-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-ranking.vue": () => import("./edit-shop-goods-ranking-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-recommend.vue": () => import("./edit-shop-goods-recommend-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-member-info.vue": () => import("./edit-shop-member-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-newcomer.vue": () => import("./edit-shop-newcomer-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-order-info.vue": () => import("./edit-shop-order-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-search.vue": () => import("./edit-shop-search-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-single-recommend.vue": () => import("./edit-single-recommend-9ffb527f.js").then((r) => r._), "../addon/shop/views/goods/attr.vue": () => import("./attr-655f2c08.js"), "../addon/shop/views/goods/attr_edit.vue": () => import("./attr_edit-655f2c08.js"), "../addon/shop/views/goods/brand_list.vue": () => import("./brand_list-655f2c08.js"), "../addon/shop/views/goods/category.vue": () => import("./category-614a0ab9.js"), "../addon/shop/views/goods/category_config.vue": () => import("./category_config-edf2f53b.js"), "../addon/shop/views/goods/components/brand-edit.vue": () => import("./brand-edit-655f2c08.js"), "../addon/shop/views/goods/components/category-edit.vue": () => import("./category-edit-1ad78c96.js"), "../addon/shop/views/goods/components/coupon-select-popup.vue": () => import("./coupon-select-popup-52cdb608.js"), "../addon/shop/views/goods/components/evaluate-add.vue": () => import("./evaluate-add-655f2c08.js"), "../addon/shop/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-1bd7fce5.js"), "../addon/shop/views/goods/components/goods-category-select-content.vue": () => import("./goods-category-select-content-3013118f.js"), "../addon/shop/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-284f5354.js"), "../addon/shop/views/goods/components/goods-price-edit-popup.vue": () => import("./goods-price-edit-popup-9712924e.js"), "../addon/shop/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-2b18a8f7.js"), "../addon/shop/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-5c669447.js"), "../addon/shop/views/goods/components/goods-stock-edit-popup.vue": () => import("./goods-stock-edit-popup-6f680b8d.js"), "../addon/shop/views/goods/components/label-edit.vue": () => import("./label-edit-655f2c08.js"), "../addon/shop/views/goods/components/label-group-edit.vue": () => import("./label-group-edit-655f2c08.js"), "../addon/shop/views/goods/components/newcomer-goods-select-popup.vue": () => import("./newcomer-goods-select-popup-c98a53a9.js"), "../addon/shop/views/goods/components/service-edit.vue": () => import("./service-edit-655f2c08.js"), "../addon/shop/views/goods/evaluate.vue": () => import("./evaluate-1a895b6d.js"), "../addon/shop/views/goods/label_group_list.vue": () => import("./label_group_list-655f2c08.js"), "../addon/shop/views/goods/label_list.vue": () => import("./label_list-655f2c08.js"), "../addon/shop/views/goods/list.vue": () => import("./list-707d21e3.js"), "../addon/shop/views/goods/real_edit.vue": () => import("./real_edit-eaaeae0a.js"), "../addon/shop/views/goods/recycle.vue": () => import("./recycle-99fb5b70.js"), "../addon/shop/views/goods/search_config.vue": () => import("./search_config-02815de0.js"), "../addon/shop/views/goods/service.vue": () => import("./service-655f2c08.js"), "../addon/shop/views/goods/virtual_edit.vue": () => import("./virtual_edit-50f0d72b.js"), "../addon/shop/views/index/index.vue": () => import("./index-7ac972e3.js"), "../addon/shop/views/marketing/coupon/add.vue": () => import("./add-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-a7c786ab.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/select-member.vue": () => import("./select-member-480fd415.js"), "../addon/shop/views/marketing/coupon/edit.vue": () => import("./edit-b0ffb798.js"), "../addon/shop/views/marketing/coupon/list.vue": () => import("./list-07c4c15d.js"), "../addon/shop/views/marketing/discount/add.vue": () => import("./add-d61d59d5.js"), "../addon/shop/views/marketing/discount/components/discount-detail.vue": () => import("./discount-detail-655f2c08.js"), "../addon/shop/views/marketing/discount/components/goods-sku-popup.vue": () => import("./goods-sku-popup-12ac7561.js"), "../addon/shop/views/marketing/discount/config.vue": () => import("./config-a41c4162.js"), "../addon/shop/views/marketing/discount/detail.vue": () => import("./detail-24ca72c5.js"), "../addon/shop/views/marketing/discount/edit.vue": () => import("./edit-fa7e6566.js"), "../addon/shop/views/marketing/discount/list.vue": () => import("./list-02a6dc3f.js"), "../addon/shop/views/marketing/exchange/components/goods-select-content.vue": () => import("./goods-select-content-6d09ce52.js"), "../addon/shop/views/marketing/exchange/components/goods-select-popup.vue": () => import("./goods-select-popup-655f2c08.js"), "../addon/shop/views/marketing/exchange/components/goods-sku-select.vue": () => import("./goods-sku-select-655f2c08.js"), "../addon/shop/views/marketing/exchange/goods_add.vue": () => import("./goods_add-b3d1f44e.js"), "../addon/shop/views/marketing/exchange/goods_edit.vue": () => import("./goods_edit-bd23595c.js"), "../addon/shop/views/marketing/exchange/goods_list.vue": () => import("./goods_list-655f2c08.js"), "../addon/shop/views/marketing/exchange/order_list.vue": () => import("./order_list-08a4705a.js"), "../addon/shop/views/marketing/goods_rank/components/rank-select-popup.vue": () => import("./rank-select-popup-194a0cf5.js"), "../addon/shop/views/marketing/goods_rank/config.vue": () => import("./config-1ad78c96.js"), "../addon/shop/views/marketing/goods_rank/edit.vue": () => import("./edit-7da0b282.js"), "../addon/shop/views/marketing/goods_rank/list.vue": () => import("./list-9439af69.js"), "../addon/shop/views/marketing/index.vue": () => import("./index-6355e83a.js"), "../addon/shop/views/marketing/manjian/detail.vue": () => import("./detail-7c88bbe9.js"), "../addon/shop/views/marketing/manjian/edit.vue": () => import("./edit-a3a15e93.js"), "../addon/shop/views/marketing/manjian/list.vue": () => import("./list-032bb2e9.js"), "../addon/shop/views/marketing/newcomer/config.vue": () => import("./config-b8238494.js"), "../addon/shop/views/marketing/newcomer/order_list.vue": () => import("./order_list-e2f69260.js"), "../addon/shop/views/member/components/benefits-free-shipping.vue": () => import("./benefits-free-shipping-655f2c08.js"), "../addon/shop/views/member/components/gift-coupon.vue": () => import("./gift-coupon-655f2c08.js"), "../addon/shop/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-7ac972e3.js"), "../addon/shop/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-7ac972e3.js"), "../addon/shop/views/member/components/point-rule-buygoods.vue": () => import("./point-rule-buygoods-655f2c08.js"), "../addon/shop/views/member/components/point-rule-orderdeduction.vue": () => import("./point-rule-orderdeduction-655f2c08.js"), "../addon/shop/views/member/components/recharge-detail-coupon.vue": () => import("./recharge-detail-coupon-67f0e5e9.js"), "../addon/shop/views/member/components/recharge-gift-coupon.vue": () => import("./recharge-gift-coupon-781a56df.js"), "../addon/shop/views/order/batch_delivery.vue": () => import("./batch_delivery-655f2c08.js"), "../addon/shop/views/order/components/adjust-money.vue": () => import("./adjust-money-655f2c08.js"), "../addon/shop/views/order/components/delivery-action.vue": () => import("./delivery-action-655f2c08.js"), "../addon/shop/views/order/components/delivery-package.vue": () => import("./delivery-package-655f2c08.js"), "../addon/shop/views/order/components/electronic-sheet-print.vue": () => import("./electronic-sheet-print-655f2c08.js"), "../addon/shop/views/order/components/form-detail.vue": () => import("./form-detail-655f2c08.js"), "../addon/shop/views/order/components/import-data.vue": () => import("./import-data-655f2c08.js"), "../addon/shop/views/order/components/invoice-detail.vue": () => import("./invoice-detail-655f2c08.js"), "../addon/shop/views/order/components/invoice-dialog.vue": () => import("./invoice-dialog-655f2c08.js"), "../addon/shop/views/order/components/open-invoice.vue": () => import("./open-invoice-655f2c08.js"), "../addon/shop/views/order/components/order-detail.vue": () => import("./order-detail-6a0ca7ec.js"), "../addon/shop/views/order/components/order-edit-address.vue": () => import("./order-edit-address-655f2c08.js"), "../addon/shop/views/order/components/order-export-select.vue": () => import("./order-export-select-6a0ca7ec.js"), "../addon/shop/views/order/components/order-notes.vue": () => import("./order-notes-24ca72c5.js"), "../addon/shop/views/order/components/refund-detail.vue": () => import("./refund-detail-0e40fccf.js"), "../addon/shop/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-24ca72c5.js"), "../addon/shop/views/order/config.vue": () => import("./config-b0ffb798.js"), "../addon/shop/views/order/detail.vue": () => import("./detail-ffe33284.js"), "../addon/shop/views/order/invoice.vue": () => import("./invoice-6a0ca7ec.js"), "../addon/shop/views/order/list.vue": () => import("./list-4c6fe118.js"), "../addon/shop/views/order/refund.vue": () => import("./refund-64138978.js"), "../addon/shop/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-3656154e.js").then((r) => r._), "../addon/shop/views/printer/components/preview-goods-order.vue": () => import("./preview-goods-order-42e8dcaa.js").then((r) => r._), "../addon/shop/views/sow_community/components/sow-community-gift-coupon.vue": () => import("./sow-community-gift-coupon-0d8b1762.js"), "../addon/shop/views/stat/goods.vue": () => import("./goods-7fca9a65.js"), "../addon/shop/views/stat/index.vue": () => import("./index-08a15ed7.js"), "../addon/shop/views/stat/member.vue": () => import("./member-2971f0be.js"), "../addon/shop/views/stat/order.vue": () => import("./order-c37da38d.js"), "../addon/shop/views/stat/visit.vue": () => import("./visit-5f7e1271.js"), "../addon/shop_fenxiao/views/agent/level_config.vue": () => import("./level_config-655f2c08.js"), "../addon/shop_fenxiao/views/agent/list.vue": () => import("./list-ab2518bc.js"), "../addon/shop_fenxiao/views/agent/order.vue": () => import("./order-f6ae6f18.js"), "../addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue": () => import("./fenxiao-goods-detail-655f2c08.js"), "../addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue": () => import("./fenxiao-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/components/member-of-select-popup.vue": () => import("./member-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/config/index.vue": () => import("./index-144cbcbc.js"), "../addon/shop_fenxiao/views/config/poster.vue": () => import("./poster-655f2c08.js"), "../addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": () => import("./edit-fenxiao-goods-list-9ffb527f.js").then((r) => r._), "../addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue": () => import("./fenxiao-detail-655f2c08.js"), "../addon/shop_fenxiao/views/fenxiao/detail.vue": () => import("./detail-8c10629e.js"), "../addon/shop_fenxiao/views/fenxiao/edit.vue": () => import("./edit-0782fd92.js"), "../addon/shop_fenxiao/views/fenxiao/lists.vue": () => import("./lists-655f2c08.js"), "../addon/shop_fenxiao/views/goods/config.vue": () => import("./config-13de9110.js"), "../addon/shop_fenxiao/views/goods/detail.vue": () => import("./detail-28441a1e.js"), "../addon/shop_fenxiao/views/goods/lists.vue": () => import("./lists-59234e8b.js"), "../addon/shop_fenxiao/views/index/index.vue": () => import("./index-24ca72c5.js"), "../addon/shop_fenxiao/views/level/edit.vue": () => import("./edit-aa0d6c6e.js"), "../addon/shop_fenxiao/views/level/lists.vue": () => import("./lists-6a0ca7ec.js"), "../addon/shop_fenxiao/views/member/lists.vue": () => import("./lists-7ac972e3.js"), "../addon/shop_fenxiao/views/order/lists.vue": () => import("./lists-c7b307e9.js"), "../addon/shop_fenxiao/views/sale/config.vue": () => import("./config-a17c3061.js"), "../addon/shop_fenxiao/views/sale/list.vue": () => import("./list-16d80079.js"), "../addon/shop_fenxiao/views/sale/member_list.vue": () => import("./member_list-655f2c08.js"), "../addon/shop_fenxiao/views/task/components/task-detail.vue": () => import("./task-detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/config.vue": () => import("./config-47fe8d79.js"), "../addon/shop_fenxiao/views/task/detail.vue": () => import("./detail-6a0ca7ec.js"), "../addon/shop_fenxiao/views/task/edit.vue": () => import("./edit-8c10629e.js"), "../addon/shop_fenxiao/views/task/list.vue": () => import("./list-788e9d8a.js"), "../addon/shop_fenxiao/views/task/reward_detail.vue": () => import("./reward_detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/reward_list.vue": () => import("./reward_list-655f2c08.js"), "../addon/shop_fenxiao/views/team/level.vue": () => import("./level-aa9a3e9c.js"), "../addon/shop_fenxiao/views/team/order.vue": () => import("./order-25ef4778.js"), "../addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": () => import("./edit-giftcard-list-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/giftcard/card_detail.vue": () => import("./card_detail-648a3908.js"), "../addon/shop_giftcard/views/giftcard/category.vue": () => import("./category-8c10629e.js"), "../addon/shop_giftcard/views/giftcard/components/category-edit.vue": () => import("./category-edit-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue": () => import("./giftcard-detail-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-content.vue": () => import("./giftcard-select-content-f83bb77b.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue": () => import("./giftcard-select-popup-c038f506.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-edit.vue": () => import("./makecard-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue": () => import("./makecard-import-log-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-edit.vue": () => import("./material-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-group-edit.vue": () => import("./material-group-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-move.vue": () => import("./material-move-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-select-popup.vue": () => import("./material-select-popup-34e8aa1d.js"), "../addon/shop_giftcard/views/giftcard/components/material-select.vue": () => import("./material-select-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/config.vue": () => import("./config-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/detail.vue": () => import("./detail-dd50911a.js"), "../addon/shop_giftcard/views/giftcard/edit.vue": () => import("./edit-dd00cc6d.js"), "../addon/shop_giftcard/views/giftcard/list.vue": () => import("./list-2c2b8751.js"), "../addon/shop_giftcard/views/giftcard/makecard.vue": () => import("./makecard-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material.vue": () => import("./material-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material_group.vue": () => import("./material_group-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-detail.vue": () => import("./order-detail-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-notes.vue": () => import("./order-notes-7ac972e3.js"), "../addon/shop_giftcard/views/order/list.vue": () => import("./list-256ab3bb.js"), "../addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": () => import("./edit-giftcard-blessing-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": () => import("./edit-giftcard-image-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": () => import("./edit-giftcard-name-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": () => import("./edit-giftcard-validity-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": () => import("./preview-giftcard-blessing-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": () => import("./preview-giftcard-image-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": () => import("./preview-giftcard-name-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": () => import("./preview-giftcard-validity-9ffb527f.js").then((r) => r._), "../addon/shop_impulse_buy/views/impulse_buy/components/category-select-popup.vue": () => import("./category-select-popup-8e9436d1.js"), "../addon/shop_impulse_buy/views/impulse_buy/config.vue": () => import("./config-24ca72c5.js"), "../addon/shop_impulse_buy/views/impulse_buy/detail.vue": () => import("./detail-7ac972e3.js"), "../addon/shop_impulse_buy/views/impulse_buy/edit.vue": () => import("./edit-86d6accf.js"), "../addon/shop_impulse_buy/views/impulse_buy/list.vue": () => import("./list-e949c5a9.js"), "../addon/shop_replace_buy/views/components/add-address.vue": () => import("./add-address-655f2c08.js"), "../addon/shop_replace_buy/views/components/address-list.vue": () => import("./address-list-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/coupon-list.vue": () => import("./coupon-list-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/friend-pay.vue": () => import("./friend-pay-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/goods-limit.vue": () => import("./goods-limit-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/manjian-info.vue": () => import("./manjian-info-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/select-goods.vue": () => import("./select-goods-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/select-member.vue": () => import("./select-member-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/store-list.vue": () => import("./store-list-655f2c08.js"), "../addon/shop_replace_buy/views/index.vue": () => import("./index-655f2c08.js"), "../addon/shop_replace_buy/views/order.vue": () => import("./order-6a0ca7ec.js"), "../addon/sow_community/views/category/components/category-edit.vue": () => import("./category-edit-24ca72c5.js"), "../addon/sow_community/views/category/list.vue": () => import("./list-14757507.js"), "../addon/sow_community/views/comment/list.vue": () => import("./list-0093effa.js"), "../addon/sow_community/views/config/config.vue": () => import("./config-8c10629e.js"), "../addon/sow_community/views/content/components/content-detail.vue": () => import("./content-detail-4f1f5714.js"), "../addon/sow_community/views/content/components/select-member.vue": () => import("./select-member-7ac972e3.js"), "../addon/sow_community/views/content/components/treasure-select-popup.vue": () => import("./treasure-select-popup-a6c597e0.js"), "../addon/sow_community/views/content/edit.vue": () => import("./edit-24ca72c5.js"), "../addon/sow_community/views/content/list.vue": () => import("./list-e1e5a97c.js"), "../addon/sow_community/views/content/select_content.vue": () => import("./select_content-f7d861c3.js"), "../addon/sow_community/views/package/components/gift-balance.vue": () => import("./gift-balance-c8b46c0d.js"), "../addon/sow_community/views/package/components/gift-points.vue": () => import("./gift-points-0ad5dafe.js"), "../addon/sow_community/views/reward_rule/components/reward_rule-detail.vue": () => import("./reward_rule-detail-af927097.js"), "../addon/sow_community/views/reward_rule/edit.vue": () => import("./edit-4336ebc6.js"), "../addon/sow_community/views/reward_rule/list.vue": () => import("./list-d7499fbc.js"), "../addon/sow_community/views/sensitive/index.vue": () => import("./index-6a0ca7ec.js"), "../addon/sow_community/views/topic/components/topic-edit.vue": () => import("./topic-edit-655f2c08.js"), "../addon/sow_community/views/topic/list.vue": () => import("./list-cfd6a588.js"), "../addon/sow_community/views/treasure/components/goods-select-popup.vue": () => import("./goods-select-popup-1e5f04c8.js"), "../addon/sow_community/views/treasure/components/treasure-edit.vue": () => import("./treasure-edit-655f2c08.js"), "../addon/sow_community/views/treasure/list.vue": () => import("./list-2c7214bb.js"), "../addon/tourism/views/components/goods-day-member-price-popup.vue": () => import("./goods-day-member-price-popup-d94f8341.js"), "../addon/tourism/views/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6d3cb185.js"), "../addon/tourism/views/components/hotel-select-popup.vue": () => import("./hotel-select-popup-466f984e.js"), "../addon/tourism/views/components/tickets-select-popup.vue": () => import("./tickets-select-popup-1bd27185.js"), "../addon/tourism/views/components/travel-select-popup.vue": () => import("./travel-select-popup-7f7961ad.js"), "../addon/tourism/views/components/verifier.vue": () => import("./verifier-6a0ca7ec.js"), "../addon/tourism/views/diy/components/edit-tourism-hotel.vue": () => import("./edit-tourism-hotel-9ffb527f.js").then((r) => r._), "../addon/tourism/views/diy/components/edit-tourism-tickets.vue": () => import("./edit-tourism-tickets-9ffb527f.js").then((r) => r._), "../addon/tourism/views/diy/components/edit-tourism-travel.vue": () => import("./edit-tourism-travel-9ffb527f.js").then((r) => r._), "../addon/tourism/views/hotel/edit_hotel.vue": () => import("./edit_hotel-af5deb41.js"), "../addon/tourism/views/hotel/edit_room.vue": () => import("./edit_room-ed91e06e.js"), "../addon/tourism/views/hotel/list.vue": () => import("./list-9a3023c5.js"), "../addon/tourism/views/hotel/order.vue": () => import("./order-7ac972e3.js"), "../addon/tourism/views/hotel/order_detail.vue": () => import("./order_detail-6a0ca7ec.js"), "../addon/tourism/views/hotel/room.vue": () => import("./room-655f2c08.js"), "../addon/tourism/views/hotel/select_content.vue": () => import("./select_content-3bfd80a0.js"), "../addon/tourism/views/index.vue": () => import("./index-39017b54.js"), "../addon/tourism/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-6a0ca7ec.js"), "../addon/tourism/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-6a0ca7ec.js"), "../addon/tourism/views/poster/components/edit-tourism-goods-image.vue": () => import("./edit-tourism-goods-image-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/edit-tourism-goods-name.vue": () => import("./edit-tourism-goods-name-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/edit-tourism-goods-price.vue": () => import("./edit-tourism-goods-price-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-image.vue": () => import("./preview-tourism-goods-image-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-name.vue": () => import("./preview-tourism-goods-name-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-price.vue": () => import("./preview-tourism-goods-price-9ffb527f.js").then((r) => r._), "../addon/tourism/views/refund.vue": () => import("./refund-655f2c08.js"), "../addon/tourism/views/scenic/edit_scenic.vue": () => import("./edit_scenic-a48f386f.js"), "../addon/tourism/views/scenic/edit_ticket.vue": () => import("./edit_ticket-655f2c08.js"), "../addon/tourism/views/scenic/list.vue": () => import("./list-a5e84786.js"), "../addon/tourism/views/scenic/order.vue": () => import("./order-24ca72c5.js"), "../addon/tourism/views/scenic/order_detail.vue": () => import("./order_detail-7ac972e3.js"), "../addon/tourism/views/scenic/select_content.vue": () => import("./select_content-0877ee01.js"), "../addon/tourism/views/scenic/ticket.vue": () => import("./ticket-655f2c08.js"), "../addon/tourism/views/setting.vue": () => import("./setting-655f2c08.js"), "../addon/tourism/views/site_index.vue": () => import("./site_index-dce8610c.js"), "../addon/tourism/views/verify.vue": () => import("./verify-655f2c08.js"), "../addon/tourism/views/way/edit.vue": () => import("./edit-84007781.js"), "../addon/tourism/views/way/list.vue": () => import("./list-bdf58dc3.js"), "../addon/tourism/views/way/order.vue": () => import("./order-655f2c08.js"), "../addon/tourism/views/way/order_detail.vue": () => import("./order_detail-655f2c08.js"), "../addon/tourism/views/way/select_content.vue": () => import("./select_content-8c74def9.js"), "../addon/vipcard/views/card/edit.vue": () => import("./edit-be62f8bb.js"), "../addon/vipcard/views/card/list.vue": () => import("./list-9b808d93.js"), "../addon/vipcard/views/card/record_info.vue": () => import("./record_info-655f2c08.js"), "../addon/vipcard/views/card/record_list.vue": () => import("./record_list-655f2c08.js"), "../addon/vipcard/views/card/select_content.vue": () => import("./select_content-0e497857.js"), "../addon/vipcard/views/components/card-goods-select.vue": () => import("./card-goods-select-655f2c08.js"), "../addon/vipcard/views/components/category-edit.vue": () => import("./category-edit-8c10629e.js"), "../addon/vipcard/views/components/goods-select-popup.vue": () => import("./goods-select-popup-3394345a.js"), "../addon/vipcard/views/components/record-info.vue": () => import("./record-info-655f2c08.js"), "../addon/vipcard/views/components/verifier.vue": () => import("./verifier-655f2c08.js"), "../addon/vipcard/views/diy/components/edit-vipcard-card.vue": () => import("./edit-vipcard-card-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": () => import("./edit-vipcard-reserve-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/diy/components/edit-vipcard-store.vue": () => import("./edit-vipcard-store-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/index.vue": () => import("./index-41a07817.js"), "../addon/vipcard/views/order.vue": () => import("./order-8c10629e.js"), "../addon/vipcard/views/order_detail.vue": () => import("./order_detail-24ca72c5.js"), "../addon/vipcard/views/refund.vue": () => import("./refund-6a0ca7ec.js"), "../addon/vipcard/views/reserve/components/add-reserve.vue": () => import("./add-reserve-655f2c08.js"), "../addon/vipcard/views/reserve/components/reserve-detail.vue": () => import("./reserve-detail-655f2c08.js"), "../addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue": () => import("./vipcard-reserve-edit-655f2c08.js"), "../addon/vipcard/views/reserve/index.vue": () => import("./index-8516e1a7.js"), "../addon/vipcard/views/reserve/list.vue": () => import("./list-2f0d7313.js"), "../addon/vipcard/views/reserve/set.vue": () => import("./set-655f2c08.js"), "../addon/vipcard/views/service/category.vue": () => import("./category-1ad78c96.js"), "../addon/vipcard/views/service/edit.vue": () => import("./edit-1ad78c96.js"), "../addon/vipcard/views/service/list.vue": () => import("./list-3863697e.js"), "../addon/vipcard/views/service/record_info.vue": () => import("./record_info-6a0ca7ec.js"), "../addon/vipcard/views/service/record_list.vue": () => import("./record_list-6a0ca7ec.js"), "../addon/vipcard/views/service/select_content.vue": () => import("./select_content-e7dc06a4.js"), "../addon/vipcard/views/site_index.vue": () => import("./site_index-fb88e87e.js"), "../addon/vipcard/views/technician/components/add-technician.vue": () => import("./add-technician-655f2c08.js"), "../addon/vipcard/views/technician/detail.vue": () => import("./detail-42d345a7.js"), "../addon/vipcard/views/technician/list.vue": () => import("./list-484e4994.js"), "../addon/vipcard/views/verify.vue": () => import("./verify-6a0ca7ec.js") }), createRoute = function(r, i = null) {
  const s = {
    path: `/${r.app_type}/${r.router_path}`,
    name: r.menu_key,
    meta: {
      title: r.menu_name,
      short_title: r.menu_short_name,
      icon: r.icon,
      type: r.menu_type,
      show: r.is_show,
      app: r.app_type,
      view: r.view_path,
      addon: r.addon,
      attr: r.menu_attr,
      parent_route: i && i.meta,
      sort: r.sort,
      componentName: r.menu_key
    }
  };
  if (r.menu_type == 1)
    if (r.addon) {
      let a = r.view_path;
      !a && r.router_path && (a = r.router_path), a && (s.component = loadAddonView(r.addon, a));
    } else
      s.component = modules[`../app/views/${r.view_path}.vue`];
  return s;
};
function formatRouters(r, i = null) {
  return r.map((s) => {
    const a = createRoute(s, i);
    return s.children != null && s.children && s.children.length && (a.children = formatRouters(s.children, a)), a;
  });
}
function findFirstValidRoute(r) {
  var i, s;
  for (const a of r) {
    if (((i = a.meta) == null ? void 0 : i.type) == 1 && ((s = a.meta) != null && s.show))
      return a.name;
    if (a.children) {
      const c = findFirstValidRoute(a.children);
      if (c)
        return c;
    }
  }
}
function findRules(r, i = []) {
  let s = [...i];
  for (const a of r)
    a.auth && Array.isArray(a.auth) && (s = s.concat(a.auth)), a.children && (s = findRules(a.children, s));
  return s;
}
const useTabbarStore = defineStore("tabbar", {
  state: () => ({
    curr: "",
    tabs: {}
  }),
  actions: {
    addTab(r) {
      var i;
      if (!(r.meta && r.meta.type != 1)) {
        if (this.tabs[r.name]) {
          this.tabs[r.name].query = r.query || {};
          return;
        }
        this.tabs[r.name] = {
          path: r.path,
          title: r.meta ? r.meta.title : "",
          name: r.name,
          query: r.query || {},
          componentName: (i = r.matched.at(-1)) == null ? void 0 : i.components.default.__name
        };
      }
    },
    removeTab(r) {
      delete this.tabs[r];
    },
    clearTab() {
      this.tabs = {};
    }
  },
  getters: {
    tabLength: (r) => Object.keys(r.tabs).length,
    tabNames: (r) => {
      const i = [];
      return useSystemStore().tab && Object.keys(r.tabs).forEach((s) => {
        i.push(r.tabs[s].componentName);
      }), i;
    }
  }
}), useTabbarStore$1 = useTabbarStore, test = {
  /**
   * 验证电子邮箱格式
   */
  email(r) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(r);
  },
  /**
   * 验证手机格式
   */
  mobile(r) {
    return /^1[23456789]\d{9}$/.test(r);
  },
  /**
   * 验证URL格式
   */
  url(r) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(r);
  },
  /**
   * 验证日期格式
   */
  date(r) {
    return r ? (this.number(r) && (r = +r), !/Invalid|NaN/.test(new Date(r).toString())) : !1;
  },
  /**
   * 验证ISO类型的日期格式
   */
  dateISO(r) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(r);
  },
  /**
   * 验证十进制数字
   */
  number(r) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(r);
  },
  /**
   * 验证字符串
   */
  string(r) {
    return typeof r == "string";
  },
  /**
   * 验证整数
   */
  digits(r) {
    return /^\d+$/.test(r);
  },
  /**
   * 验证身份证号码
   */
  idCard(r) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      r
    );
  },
  /**
   * 是否车牌号
   */
  carNo(r) {
    const i = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, s = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    return r.length === 7 ? s.test(r) : r.length === 8 ? i.test(r) : !1;
  },
  /**
   * 金额,只允许2位小数
   */
  amount(r) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(r);
  },
  /**
   * 验证小数
   */
  decimal(r, i) {
    const s = `^\\d+(?:\\.\\d{1,${i}})?$`;
    return new RegExp(s).test(r);
  },
  /**
   * 中文
   */
  chinese(r) {
    return /^[\u4e00-\u9fa5]+$/gi.test(r);
  },
  /**
   * 只能输入字母
   */
  letter(r) {
    return /^[a-zA-Z]*$/.test(r);
  },
  /**
   * 只能是字母或者数字
   */
  enOrNum(r) {
    return /^[0-9a-zA-Z]*$/g.test(r);
  },
  /**
   * 验证是否包含某个值
   */
  contains(r, i) {
    return r.indexOf(i) >= 0;
  },
  /**
   * 验证一个值范围[min, max]
   */
  range(r, i) {
    return r >= i[0] && r <= i[1];
  },
  /**
   * 验证一个长度范围[min, max]
   */
  rangeLength(r, i) {
    return r.length >= i[0] && r.length <= i[1];
  },
  /**
   * 是否固定电话
   */
  landline(r) {
    return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(r);
  },
  /**
   * 判断是否为空
   */
  empty(r) {
    switch (typeof r) {
      case "undefined":
        return !0;
      case "string":
        if (r.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return !0;
        break;
      case "boolean":
        if (!r)
          return !0;
        break;
      case "number":
        if (r === 0 || isNaN(r))
          return !0;
        break;
      case "object":
        if (r === null || r.length === 0)
          return !0;
        for (const i in r)
          return !1;
        return !0;
    }
    return !1;
  },
  /**
   * 是否json字符串
   */
  jsonString(r) {
    if (typeof r == "string")
      try {
        const i = JSON.parse(r);
        return !!(typeof i == "object" && i);
      } catch {
        return !1;
      }
    return !1;
  },
  /**
   * 是否数组
   */
  array(r) {
    return typeof Array.isArray == "function" ? Array.isArray(r) : Object.prototype.toString.call(r) === "[object Array]";
  },
  /**
   * 是否对象
   */
  object(r) {
    return Object.prototype.toString.call(r) === "[object Object]";
  },
  /**
   * 是否短信验证码
   */
  code(r, i = 6) {
    return new RegExp(`^\\d{${i}}$`).test(r);
  },
  /**
   * 是否函数方法
   * @param {Object} value
   */
  func(r) {
    return typeof r == "function";
  },
  /**
   * 是否promise对象
   * @param {Object} value
   */
  promise(r) {
    return this.object(r) && this.func(r.then) && this.func(r.catch);
  },
  /** 是否图片格式
   * @param {Object} value
   */
  image(r) {
    const i = r.split("?")[0];
    return /\.(jpeg|jpg|gif|png|svg|jfif|bmp|dpg)/i.test(i);
  },
  /**
   * 是否视频格式
   * @param {Object} value
   */
  video(r) {
    return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i.test(r);
  },
  /**
   * 是否为正则对象
   */
  regExp(r) {
    return r && Object.prototype.toString.call(r) === "[object RegExp]";
  },
  /**
   * 验证必填
   */
  require(r) {
    return /^\s*$/.test(r);
  }
}, Test = test, userStore = defineStore("user", {
  state: () => ({
    token: getToken() || "",
    userInfo: storage.get("userinfo") || {},
    siteInfo: null,
    routers: [],
    rules: [],
    addonIndexRoute: {}
  }),
  actions: {
    async getSiteInfo() {
      await getSiteInfo$1().then(({ data: r }) => {
        this.siteInfo = r, storage.set({ key: "siteId", data: r.site_id || 0 }), storage.set({ key: "siteInfo", data: r }), storage.set({ key: "comparisonSiteIdStorage", data: r.site_id || 0 });
      }).catch(() => {
      });
    },
    login(r, i) {
      return new Promise((s, a) => {
        login(r, i).then(async (c) => {
          i == "admin" && Test.empty(c.data.userrole) && storage.setPrefix("site"), this.token = c.data.token, this.userInfo = c.data.userinfo, this.siteInfo = c.data.site_info || {}, setToken(c.data.token), storage.set({ key: "userinfo", data: c.data.userinfo }), storage.set({ key: "siteId", data: c.data.site_id || 0 }), storage.set({ key: "siteInfo", data: c.data.site_info || {} }), storage.set({ key: "comparisonSiteIdStorage", data: c.data.site_id || 0 }), storage.set({ key: "comparisonTokenStorage", data: c.data.token }), s(c);
        }).catch((c) => {
          a(c);
        });
      });
    },
    clearRouters() {
      this.routers = [];
    },
    logout() {
      if (!this.token)
        return;
      this.token = "", this.userInfo = {}, this.siteInfo = {}, removeToken(), window.localStorage.removeItem("admin.token"), window.localStorage.removeItem("admin.userinfo"), window.localStorage.removeItem("admin.siteInfo"), window.localStorage.removeItem("site.token"), window.localStorage.removeItem("site.userinfo"), window.localStorage.removeItem("site.siteInfo"), storage.remove(["userinfo", "siteInfo", "darksideMarketingKeys", "defaultMarketingKeys"]), this.routers = [], this.rules = [], logout(), useTabbarStore$1().clearTab();
      const r = getAppType() == "admin" ? "/admin/login" : "/site/login";
      location.href = `${location.origin}${r}`;
    },
    getAuthMenusFn() {
      return new Promise((r, i) => {
        getAuthMenus({}).then((s) => {
          this.routers = formatRouters(s.data), this.routers.forEach((a, c) => {
            a.meta.addon !== "" && (a.children && a.children.length ? this.addonIndexRoute[a.meta.addon] = findFirstValidRoute(a.children) : this.addonIndexRoute[a.meta.addon] = a.name);
          }), this.rules = findRules(s.data), r(s);
        }).catch((s) => {
          i(s);
        });
      });
    },
    setUserInfo(r) {
      this.userInfo = r, storage.set({ key: "userinfo", data: r });
    }
  }
}), useUserStore = userStore;
class ErrorResponse {
  constructor(i, s, a) {
    q(this, "msg", "");
    q(this, "code", 0);
    q(this, "response", null);
    typeof i == "number" ? (this.code = i, this.msg = s || "", this.response = a) : (this.msg = i || "", this.code = 0, this.response = null);
  }
}
class Request {
  constructor() {
    q(this, "instance");
    q(this, "messageCache", /* @__PURE__ */ new Map());
    q(this, "CACHE_EXPIRY", 5e3);
    // 5秒内重复内容不再弹出，可自定义过期时间
    q(this, "MAX_CACHE_SIZE", 100);
    const i = envConfig.VITE_APP_BASE_URL || "/adminapi/";
    this.instance = axios$2.create({
      baseURL: i.endsWith("/") ? i : `${i}/`,
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
        lang: storage.get("lang") ?? "zh-cn"
      }
    }), this.instance.interceptors.request.use(
      (s) => (getToken() && (s.headers[envConfig.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()), s.headers[envConfig.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get("siteId") || 0, s),
      (s) => Promise.reject(new ErrorResponse(0, s.message, s.response))
    ), this.instance.interceptors.response.use(
      (s) => {
        if (s.request.responseType != "blob") {
          const a = s.data;
          return a.code != 1 ? (this.handleAuthError(a.code), a.code != 401 && s.config.showErrorMessage !== !1 && this.showElMessage({ message: a.msg, type: "error", dangerouslyUseHTMLString: !0, duration: 5e3 }), Promise.reject(a)) : (s.config.showSuccessMessage && ElMessage({ message: a.msg, type: "success" }), a);
        }
        return s.data;
      },
      (s) => (this.handleNetworkError(s), Promise.reject(new ErrorResponse(0, s.message, s.response)))
    );
  }
  /**
   * 发送get请求
   * @param url
   * @param config
   * @returns
   */
  get(i, s) {
    return this.instance.get(i, s);
  }
  /**
   * 发送post请求
   * @param url
   * @param data
   * @param config
   * @returns
   */
  post(i, s, a) {
    return this.instance.post(i, s, a);
  }
  /**
   * 发送put请求
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put(i, s, a) {
    return this.instance.put(i, s, a);
  }
  /**
   * 发送delete请求
   * @param url
   * @param config
   * @returns
   */
  delete(i, s) {
    return this.instance.delete(i, s);
  }
  /**
   * 处理网络请求错误
   * @param err
   */
  handleNetworkError(i) {
    let s = "";
    if (i.response && i.response.status)
      switch (i.response.status) {
        case 400:
          s = t$1("axios.400");
          break;
        case 401:
          s = t$1("axios.401");
          break;
        case 403:
          s = t$1("axios.403");
          break;
        case 404:
          s = (isUrl(i.response.config.baseURL) ? i.response.config.baseURL : `${location.origin}${i.response.config.baseURL}`) + t$1("axios.baseUrlError");
          break;
        case 405:
          s = t$1("axios.405");
          break;
        case 408:
          s = t$1("axios.408");
          break;
        case 409:
          s = t$1("axios.409");
          break;
        case 500:
          s = t$1("axios.500");
          break;
        case 501:
          s = t$1("axios.501");
          break;
        case 502:
          s = t$1("axios.502");
          break;
        case 503:
          s = t$1("axios.503");
          break;
        case 504:
          s = t$1("axios.504");
          break;
        case 505:
          s = t$1("axios.505");
          break;
      }
    i.message.includes("timeout") && (s = t$1("axios.timeout")), i.code == "ERR_NETWORK" && (s = (isUrl(i.config.baseURL) ? i.config.baseURL : `${location.origin}${i.config.baseURL}`) + t$1("axios.baseUrlError")), s && this.showElMessage({ dangerouslyUseHTMLString: !0, duration: 5e3, message: s, type: "error" });
  }
  handleAuthError(i) {
    switch (i) {
      case 401:
        useUserStore().logout();
        break;
    }
  }
  showElMessage(i) {
    const s = i.message, a = Date.now(), c = this.messageCache.get(s);
    if ((!c || a - c.timestamp > this.CACHE_EXPIRY) && (this.messageCache.set(s, { timestamp: a }), ElMessage(i)), this.messageCache.size > this.MAX_CACHE_SIZE)
      for (const [d, l] of this.messageCache.entries())
        a - l.timestamp > this.CACHE_EXPIRY && this.messageCache.delete(d);
  }
}
const request = new Request();
function e(r, i) {
  r = r.replace(/=/g, "");
  var s = [];
  switch (i.constructor) {
    case String:
    case Number:
    case Boolean:
      s.push(encodeURIComponent(r) + "=" + encodeURIComponent(i));
      break;
    case Array:
      i.forEach(function(a) {
        s = s.concat(e(r + "[]=", a));
      });
      break;
    case Object:
      Object.keys(i).forEach(function(a) {
        var c = i[a];
        s = s.concat(e(r + "[" + a + "]", c));
      });
  }
  return s;
}
function t(r) {
  var i = [];
  return r.forEach(function(s) {
    typeof s == "string" ? i.push(s) : i = i.concat(t(s));
  }), i;
}
/**
 * Vue Jsonp.
 * # Carry Your World #
 *
 * @author: LancerComet
 * @license: MIT
 */
var n = { install: function(r) {
  r.prototype.$jsonp = o;
} };
function o(r, i, s) {
  if (i === void 0 && (i = {}), typeof r != "string")
    throw new Error('[Vue-jsonp] Type of param "url" is not string.');
  if (typeof i != "object" || !i)
    throw new Error("[Vue-jsonp] Invalid params, should be an object.");
  return s = typeof s == "number" ? s : 5e3, new Promise(function(a, c) {
    var d = typeof i.callbackQuery == "string" ? i.callbackQuery : "callback", l = typeof i.callbackName == "string" ? i.callbackName : "jsonp_" + (Math.floor(1e5 * Math.random()) * Date.now()).toString(16);
    i[d] = l, delete i.callbackQuery, delete i.callbackName;
    var p = [];
    Object.keys(i).forEach(function(h) {
      p = p.concat(e(h, i[h]));
    });
    var u = t(p).join("&"), m = function() {
      v(), clearTimeout(f), c({ status: 400, statusText: "Bad Request" });
    }, v = function() {
      w.removeEventListener("error", m);
    }, g = function() {
      document.body.removeChild(w), delete window[l];
    }, f = null;
    s > -1 && (f = setTimeout(function() {
      v(), g(), c({ statusText: "Request Timeout", status: 408 });
    }, s)), window[l] = function(h) {
      clearTimeout(f), v(), g(), a(h);
    };
    var w = document.createElement("script");
    w.addEventListener("error", m), w.src = r + (/\?/.test(r) ? "&" : "?") + u, document.body.appendChild(w);
  });
}
const geometry$1 = {}, createCircle$1 = (r, i, s) => {
  var u, m, v;
  const a = window.TMap, c = a.LatLng;
  i.radius = i.radius ?? 1e3, i.center = i.center ?? { lat: r.getCenter().lat, lng: r.getCenter().lng };
  const d = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], l = new a.MultiCircle({
    map: r,
    styles: {
      // 设置圆形样式
      circle: new a.CircleStyle({
        color: `rgba(${d.toString()}, .4)`,
        showBorder: !0,
        borderColor: `rgb(${d.toString()})`,
        borderWidth: 2
      }),
      highlight: new a.PolygonStyle({
        color: "rgba(255, 255, 0, 0.6)"
      })
    },
    geometries: [
      {
        styleId: "circle",
        center: new c(i.center.lat, i.center.lng),
        radius: parseInt(i.radius),
        id: i.key
      }
    ]
  });
  if (geometry$1[i.key])
    try {
      geometry$1[i.key].graphical.remove(i.key), (u = geometry$1[i.key].editor) == null || u.delete();
    } catch {
    }
  let p = null;
  if (a.tools)
    try {
      p = new a.tools.GeometryEditor({
        map: r,
        overlayList: [
          {
            overlay: l,
            id: i.key,
            selectedStyleId: "highlight"
          }
        ],
        actionMode: ((v = (m = a.tools.constants) == null ? void 0 : m.EDITOR_ACTION) == null ? void 0 : v.INTERACT) || 0,
        // 交互模式，支持拖动中心点和调整半径
        activeOverlayId: null,
        // 初始不激活，等待用户选择
        selectable: !0,
        // 开启点选功能
        snappable: !0
        // 开启吸附
      }), p.setKeyboardDeleteEnable(!1), p.on("adjust_start", () => {
        currentMap$1 == null || currentMap$1.setDraggable(!1);
      }), p.on("adjust_complete", (g) => {
        g != null && g.center && g.radius !== void 0 && (i.center = { lat: g.center.lat, lng: g.center.lng }, i.radius = parseInt(g.radius)), setTimeout(() => currentMap$1 == null ? void 0 : currentMap$1.setDraggable(!0), 100);
      }), p.on("adjust", (g) => {
        g != null && g.center && g.radius !== void 0 && (i.center = { lat: g.center.lat, lng: g.center.lng }, i.radius = parseInt(g.radius));
      }), p.on("select", () => {
        s && s(i.key);
      });
    } catch (g) {
      console.warn("创建编辑器失败:", g);
    }
  l.on("click", () => {
    var g;
    p && (p.select([i.key]), (g = p.setActiveOverlay) == null || g.call(p, i.key)), s && s(i.key);
  }), geometry$1[i.key] = { graphical: l, editor: p };
}, createPolygon$1 = (r, i, s) => {
  var v, g, f;
  const a = window.TMap, c = a.LatLng, { lat: d, lng: l } = r.getCenter();
  i.paths = i.paths ?? [
    { lat: d + 0.01, lng: l + 0.01 },
    { lat: d - 0.01, lng: l + 0.01 },
    { lat: d - 0.01, lng: l - 0.01 },
    { lat: d + 0.01, lng: l - 0.01 }
  ];
  const p = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];
  if (geometry$1[i.key])
    try {
      geometry$1[i.key].graphical.remove(i.key), (v = geometry$1[i.key].editor) == null || v.delete();
    } catch {
    }
  const u = new a.MultiPolygon({
    map: r,
    styles: {
      polygon: new a.PolygonStyle({
        color: `rgba(${p.toString()}, .4)`,
        showBorder: !0,
        borderColor: `rgb(${p.toString()})`,
        borderWidth: 2
      }),
      highlight: new a.PolygonStyle({
        color: "rgba(255, 255, 0, 0.6)"
      })
    },
    geometries: [
      {
        id: i.key,
        styleId: "polygon",
        paths: i.paths.map((w) => new c(w.lat, w.lng))
      }
    ]
  });
  let m = null;
  if (a.tools)
    try {
      m = new a.tools.GeometryEditor({
        map: r,
        overlayList: [
          {
            overlay: u,
            id: i.key,
            selectedStyleId: "highlight"
          }
        ],
        actionMode: ((f = (g = a.tools.constants) == null ? void 0 : g.EDITOR_ACTION) == null ? void 0 : f.INTERACT) || 0,
        // 交互模式，支持拖动边框和调整形状
        activeOverlayId: null,
        // 初始不激活，等待用户选择
        selectable: !0,
        // 开启点选功能
        snappable: !0
        // 开启吸附
      }), m.setKeyboardDeleteEnable(!1), m.on("adjust_start", () => {
        currentMap$1 == null || currentMap$1.setDraggable(!1);
      }), m.on("adjust_complete", (w) => {
        w != null && w.paths && (i.paths = w.paths.map((h) => ({ lat: h.lat, lng: h.lng }))), setTimeout(() => currentMap$1 == null ? void 0 : currentMap$1.setDraggable(!0), 100);
      }), m.on("adjust", (w) => {
        w != null && w.paths && (i.paths = w.paths.map((h) => ({ lat: h.lat, lng: h.lng })));
      }), m.on("select", () => {
        s && s(i.key);
      });
    } catch (w) {
      console.warn("创建编辑器失败:", w);
    }
  u.on("click", () => {
    var w;
    m && (m.select([i.key]), (w = m.setActiveOverlay) == null || w.call(m, i.key)), s && s(i.key);
  }), geometry$1[i.key] = { graphical: u, editor: m };
}, deleteGeometry$1 = (r) => {
  var i, s;
  if (geometry$1[r])
    try {
      (i = geometry$1[r].graphical) == null || i.remove(r), (s = geometry$1[r].editor) == null || s.delete(), delete geometry$1[r];
    } catch (a) {
      console.warn("删除图形失败:", a);
    }
}, clearAllGeometry$1 = () => {
  Object.keys(geometry$1).forEach(deleteGeometry$1);
};
let currentMap$1 = null;
const setMapInstance$1 = (r) => {
  currentMap$1 = r;
}, selectGeometry$1 = (r) => {
  var i, s, a, c, d;
  if ((i = geometry$1[r]) != null && i.editor)
    try {
      Object.keys(geometry$1).forEach((l) => {
        var p, u, m, v, g;
        l !== r && ((p = geometry$1[l]) != null && p.editor) && ((m = (u = geometry$1[l].editor).deselect) == null || m.call(u), (g = (v = geometry$1[l].editor).setActiveOverlay) == null || g.call(v, null));
      }), (a = (s = geometry$1[r].editor).select) == null || a.call(s, [r]), (d = (c = geometry$1[r].editor).setActiveOverlay) == null || d.call(c, r);
    } catch {
    }
}, deselectAllGeometry$1 = () => {
  Object.keys(geometry$1).forEach((r) => {
    var i, s, a, c, d, l;
    (a = (s = (i = geometry$1[r]) == null ? void 0 : i.editor) == null ? void 0 : s.deselect) == null || a.call(s), (l = (d = (c = geometry$1[r]) == null ? void 0 : c.editor) == null ? void 0 : d.setActiveOverlay) == null || l.call(d, null);
  }), currentMap$1 == null || currentMap$1.setDraggable(!0);
}, createMarker$1 = (r) => {
  const i = window.TMap, s = i.LatLng;
  return new i.MultiMarker({
    map: r,
    geometries: [
      {
        id: "center",
        position: r.getCenter()
      }
    ]
  });
}, latLngToAddress$1 = (r) => o(`https://apis.map.qq.com/ws/geocoder/v1/?key=${r.mapKey}&location=${r.lat},${r.lng}&output=jsonp&callback=latLngToAddress`, { callbackName: "latLngToAddress" }), addressToLatLng$1 = (r) => o(`https://apis.map.qq.com/ws/geocoder/v1/?key=${r.mapKey}&address=${r.address}&output=jsonp&callback=addressToLatLng`, { callbackName: "addressToLatLng" }), coreVueModules = {
  .../* @__PURE__ */ Object.assign({ "../app/components/cloud-build/index.vue": () => import("./index-313713a8.js"), "../app/components/upgrade-log/index.vue": () => import("./index-f27297e5.js"), "../app/components/upgrade/index.vue": () => import("./index-3bac7220.js"), "../app/components/user-info-edit/index.vue": () => import("./index-5ea06ae6.js"), "../app/components/weappupload/index.vue": () => import("./index-d1a1ce34.js"), "../app/views/app/authorize.vue": () => import("./authorize-8463e86c.js"), "../app/views/app/index.vue": () => import("./index-3a574033.js"), "../app/views/app/marketing.vue": () => import("./marketing-60040aa3.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-0402b127.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-5dc05d77.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-34bff9b1.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-48b5d617.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-820969f3.js"), "../app/views/auth/log.vue": () => import("./log-d19e1834.js"), "../app/views/auth/menu.vue": () => import("./menu-ad47a491.js"), "../app/views/auth/role.vue": () => import("./role-fcb9d148.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-d7ff072c.js"), "../app/views/auth/user.vue": () => import("./user-e41f72cf.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-7b30277c.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-f084d78c.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-98a0457a.js"), "../app/views/channel/app/access.vue": () => import("./access-fc93d74f.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-6872d057.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-eeec2ca6.js"), "../app/views/channel/app/config.vue": () => import("./config-7e945a86.js"), "../app/views/channel/app/version.vue": () => import("./version-46fd4edd.js"), "../app/views/channel/h5/config.vue": () => import("./config-f80676c4.js"), "../app/views/channel/pc/config.vue": () => import("./config-6ce35528.js"), "../app/views/channel/weapp/access.vue": () => import("./access-de89ba90.js"), "../app/views/channel/weapp/code.vue": () => import("./code-128eb262.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-93ff9887.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-8f7901b7.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-d24b871f.js"), "../app/views/channel/weapp/config.vue": () => import("./config-4e921e3a.js"), "../app/views/channel/weapp/course.vue": () => import("./course-1be32c8c.js"), "../app/views/channel/weapp/template.vue": () => import("./template-0021e34c.js"), "../app/views/channel/wechat/access.vue": () => import("./access-6b98638f.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-b043cdad.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-8b1471ef.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-89c0df15.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-02d65585.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-5f7db26a.js"), "../app/views/channel/wechat/config.vue": () => import("./config-54535681.js"), "../app/views/channel/wechat/course.vue": () => import("./course-23415480.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-731cc3f4.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-b3d4e9b8.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-3a5b3085.js"), "../app/views/channel/wechat/template.vue": () => import("./template-e838e8be.js"), "../app/views/dict/components/dict.vue": () => import("./dict-9cf1c8d1.js"), "../app/views/dict/components/edit.vue": () => import("./edit-28886e00.js"), "../app/views/dict/list.vue": () => import("./list-03e61cc0.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-0deea01d.js").then((r) => r.a), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-33290b2c.js").then((r) => r._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-8d3531d4.js").then((r) => r._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-ac881eaa.js").then((r) => r._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-59d349ff.js").then((r) => r._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-81ee2d19.js").then((r) => r._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-c3b4cf0a.js").then((r) => r._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-360aee63.js").then((r) => r._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-14402138.js").then((r) => r._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-8036576f.js").then((r) => r._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-0e51e911.js").then((r) => r._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-1dca049b.js").then((r) => r._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-762a2631.js").then((r) => r._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-d53beb72.js").then((r) => r._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-5c2d5dfd.js").then((r) => r._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-91008b7b.js").then((r) => r._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-e210442c.js").then((r) => r._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-5135487e.js").then((r) => r.a), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-46f075e4.js").then((r) => r._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-1e898140.js").then((r) => r._), "../app/views/diy/edit.vue": () => import("./edit-f1e6fb54.js"), "../app/views/diy/index.vue": () => import("./index-e8cba75f.js"), "../app/views/diy/list.vue": () => import("./list-870e7e21.js"), "../app/views/diy/member.vue": () => import("./member-862ad417.js"), "../app/views/diy/route.vue": () => import("./route-01127827.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-3bebf623.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-011239c9.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-3e202e99.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-42b18580.js").then((r) => r._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-cdea5687.js").then((r) => r._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-3522bae4.js").then((r) => r._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-752f6bec.js").then((r) => r._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-9f6793a8.js").then((r) => r._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-c478108f.js").then((r) => r._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-9c066118.js").then((r) => r._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-b8915f4b.js").then((r) => r._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-81939823.js").then((r) => r._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-4fd104b8.js").then((r) => r._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-9a80eddb.js").then((r) => r._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-2bd8d9ca.js").then((r) => r._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-5c6b6de6.js").then((r) => r._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-c9e76c71.js").then((r) => r._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-0afb9519.js").then((r) => r._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-bec0a236.js").then((r) => r._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-00a2d6d0.js").then((r) => r._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-010c9285.js").then((r) => r._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-eaf1218e.js").then((r) => r._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-824d08db.js").then((r) => r._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-d8427727.js").then((r) => r._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-98485dd9.js").then((r) => r._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-d16bc282.js").then((r) => r._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-ffdc7f79.js").then((r) => r._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-96415554.js").then((r) => r._), "../app/views/diy_form/edit.vue": () => import("./edit-77c4dbd0.js"), "../app/views/diy_form/list.vue": () => import("./list-465c4093.js"), "../app/views/diy_form/records.vue": () => import("./records-70c030aa.js"), "../app/views/error/404.vue": () => import("./404-911cf06c.js"), "../app/views/finance/account.vue": () => import("./account-8d680585.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-0ba18a50.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-994edb63.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-16b12cd7.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-e5b9c3e2.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-7504dc6b.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-3fb76b33.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-a83dec39.js"), "../app/views/home/index.vue": () => import("./index-b338d6f1.js"), "../app/views/home/personal.vue": () => import("./personal-52f5a0e3.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-2ed555a0.js"), "../app/views/index/index.vue": () => import("./index-ac462a7f.js"), "../app/views/index/preview.vue": () => import("./preview-9b7c15f2.js"), "../app/views/index/store.vue": () => import("./store-410c2686.js"), "../app/views/index/tools.vue": () => import("./tools-89033a2f.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-3791b447.js"), "../app/views/login/index.vue": () => import("./index-4c56baaf.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-d252d9e1.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-703a101f.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-777c0981.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-5514de48.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-61d5b273.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-48455267.js"), "../app/views/marketing/verify.vue": () => import("./verify-7d336a0e.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-eaac35a9.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-5fa1414d.js"), "../app/views/member/balance.vue": () => import("./balance-b75685d9.js"), "../app/views/member/commission.vue": () => import("./commission-91da9180.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-b7db4d3c.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-0a9bcf98.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-f140ee9b.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-fbe14830.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-398293bc.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-67616df8.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-94b3778e.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-62220d9f.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-cc05cd88.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-6594f575.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-9e8b1e9d.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-95ce083f.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-43e4aa5d.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-0d1f9937.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-d451ce17.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-14300f94.js"), "../app/views/member/growth.vue": () => import("./growth-ae9178c9.js"), "../app/views/member/label.vue": () => import("./label-13b8043a.js"), "../app/views/member/level.vue": () => import("./level-30816c48.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-f2b270e7.js"), "../app/views/member/member.vue": () => import("./member-331e997b.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-28b55070.js"), "../app/views/member/point.vue": () => import("./point-798d83f9.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-aad9af86.js").then((r) => r._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-25fdfed2.js").then((r) => r._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-3e9fd619.js").then((r) => r._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-f0e002cc.js").then((r) => r._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-a8e1abc4.js").then((r) => r._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-f60e62d6.js").then((r) => r._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-b8e24d7b.js").then((r) => r._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-0425b453.js").then((r) => r._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-3da3248d.js").then((r) => r._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-c5c041ae.js").then((r) => r._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-dbb12784.js").then((r) => r._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-fd1abe8f.js").then((r) => r._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-6e2fcfdd.js").then((r) => r._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-20fd80a7.js").then((r) => r._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-c1ecf7cd.js").then((r) => r._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-8ed0bd7e.js").then((r) => r._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-0767f716.js").then((r) => r._), "../app/views/poster/edit.vue": () => import("./edit-b8192b2a.js"), "../app/views/poster/list.vue": () => import("./list-4350cb25.js"), "../app/views/printer/edit.vue": () => import("./edit-092be0e7.js"), "../app/views/printer/list.vue": () => import("./list-f168865c.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-12457e14.js"), "../app/views/printer/template_list.vue": () => import("./template_list-48ca7c65.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-e9a1e956.js"), "../app/views/setting/agreement.vue": () => import("./agreement-c8ee7aee.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-4b4216f6.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-9ef15c80.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-f5256fb0.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-1d1a690f.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-a87b8266.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-67311dae.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-88989c88.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-a8fcf5af.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-d5578390.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-0d310004.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-9663e192.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-35bc0183.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-60d21732.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-adce9cf5.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-bfa11783.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-61edbbe4.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-b440ebbe.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-18efe5dc.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-f405f347.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-9434f0fb.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-bdea03f6.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-c6ee61a4.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-00aae7dc.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-cc25af3f.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-15ea5905.js"), "../app/views/setting/copyright.vue": () => import("./copyright-04bd34a5.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-5fc6c83e.js"), "../app/views/setting/export.vue": () => import("./export-cb797d38.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-ee1d6eb1.js"), "../app/views/setting/layout.vue": () => import("./layout-7038b770.js"), "../app/views/setting/login.vue": () => import("./login-ffc99010.js"), "../app/views/setting/map.vue": () => import("./map-dc2aa8b5.js"), "../app/views/setting/member.vue": () => import("./member-bdaf17fd.js"), "../app/views/setting/notice.vue": () => import("./notice-378cdc3b.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-add8b7e5.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-dfc406fa.js"), "../app/views/setting/pay.vue": () => import("./pay-5c2e294e.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-609c173a.js"), "../app/views/setting/sms.vue": () => import("./sms-60f482bc.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-28a9c2aa.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-64d19c88.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-83c8f247.js"), "../app/views/setting/storage.vue": () => import("./storage-9f45fee8.js"), "../app/views/setting/system.vue": () => import("./system-6ef389f8.js"), "../app/views/setting/transfer.vue": () => import("./transfer-3b132649.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-246d737e.js"), "../app/views/setting/weapp.vue": () => import("./weapp-3e70007a.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-a412faee.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-e124e6d2.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-b6bd526a.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-c01563e1.js"), "../app/views/site/group.vue": () => import("./group-d6df3b0b.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-3c06de67.js"), "../app/views/site/info.vue": () => import("./info-0c35b502.js"), "../app/views/site/list.vue": () => import("./list-0cbb1f7b.js"), "../app/views/site/manage.vue": () => import("./manage-1b5d7d61.js"), "../app/views/site/user.vue": () => import("./user-5f55c48a.js"), "../app/views/site/user_info.vue": () => import("./user_info-3fe92b2c.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-f5e82bde.js"), "../app/views/tools/addon/index.vue": () => import("./index-60befbac.js"), "../app/views/tools/addon/list.vue": () => import("./list-2a10ea66.js"), "../app/views/tools/attachment.vue": () => import("./attachment-77ef63d9.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-3d6404ae.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-059720f3.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-9b48b6da.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-32aa07d0.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-caef74db.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-f33cbb34.js"), "../app/views/tools/code/edit.vue": () => import("./edit-592e23d5.js"), "../app/views/tools/code/index.vue": () => import("./index-c9778dd3.js"), "../app/views/tools/code/list.vue": () => import("./list-d8571de9.js"), "../app/views/tools/detection.vue": () => import("./detection-75917a42.js"), "../app/views/tools/schedule.vue": () => import("./schedule-5fc8d6f5.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-b0dee830.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-57bd1cc1.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-3afb99c1.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-8e4151b6.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-f2690ce4.js") }),
  .../* @__PURE__ */ Object.assign({ "../components/diy-link/index.vue": () => import("./index-c32577dd.js"), "../components/diy-page/index.vue": () => Promise.resolve().then(() => index$4), "../components/editor/index.vue": () => Promise.resolve().then(() => index), "../components/export-sure/index.vue": () => import("./index-b7e7392b.js"), "../components/heat-map/index.vue": () => import("./index-d83df197.js"), "../components/icon/index.vue": () => import("./index-9c1a7b4f.js"), "../components/map-selector/index.vue": () => Promise.resolve().then(() => index$2), "../components/markdown/index.vue": () => import("./index-fff4207c.js"), "../components/popover-input/index.vue": () => import("./index-301c1b74.js"), "../components/range-input/index.vue": () => import("./index-6f9975ac.js"), "../components/select-area/index.vue": () => import("./index-732e3bea.js"), "../components/select-icon/index.vue": () => import("./index-5aaeb3d7.js"), "../components/spread-popup/index.vue": () => import("./index-9f720eec.js"), "../components/upload-attachment/attachment.vue": () => import("./attachment-91f4d472.js"), "../components/upload-attachment/index.vue": () => import("./index-61abfbc8.js"), "../components/upload-audio/index.vue": () => import("./index-e2b556fd.js"), "../components/upload-file/index.vue": () => import("./index-88e1dbcb.js"), "../components/upload-image/index.vue": () => Promise.resolve().then(() => index$6), "../components/upload-video/index.vue": () => import("./index-63d73c3c.js"), "../components/verifition/Verify.vue": () => import("./Verify-925bd58a.js"), "../components/verifition/Verify/VerifyPoints.vue": () => import("./VerifyPoints-3f01bf2a.js"), "../components/verifition/Verify/VerifySlide.vue": () => import("./VerifySlide-026eb56e.js"), "../components/video-player/index.vue": () => import("./index-2ea3bff9.js") }),
  .../* @__PURE__ */ Object.assign({ "../layout/admin/components/aside/index.vue": () => import("./index-6ddefef2.js"), "../layout/admin/components/aside/menu-item.vue": () => import("./menu-item-228d35a1.js"), "../layout/admin/components/aside/side.vue": () => import("./side-99ec5474.js"), "../layout/admin/components/header/index.vue": () => import("./index-5cbe2303.js"), "../layout/admin/components/header/layout-setting.vue": () => import("./layout-setting-b8839486.js"), "../layout/admin/components/header/message.vue": () => import("./message-8ba660d3.js"), "../layout/admin/components/header/switch-lang.vue": () => import("./switch-lang-b419cda8.js"), "../layout/admin/components/header/user-info.vue": () => import("./user-info-e1bc8a9b.js"), "../layout/admin/components/tabs.vue": () => import("./tabs-04e29f55.js"), "../layout/admin/index.vue": () => import("./index-9efc8f4a.js"), "../layout/admin_simplicity/components/aside/index.vue": () => import("./index-470a83c7.js"), "../layout/admin_simplicity/components/aside/menu-item.vue": () => import("./menu-item-30098fbc.js"), "../layout/admin_simplicity/components/aside/side.vue": () => import("./side-8c57e812.js"), "../layout/admin_simplicity/components/header/index.vue": () => import("./index-174ebd19.js"), "../layout/admin_simplicity/components/header/layout-setting.vue": () => import("./layout-setting-8be1aa48.js"), "../layout/admin_simplicity/components/header/message.vue": () => import("./message-ab428190.js"), "../layout/admin_simplicity/components/header/switch-lang.vue": () => import("./switch-lang-0971897f.js"), "../layout/admin_simplicity/components/header/user-info.vue": () => import("./user-info-8cf18b19.js"), "../layout/admin_simplicity/components/tabs.vue": () => import("./tabs-d70b95ee.js"), "../layout/admin_simplicity/index.vue": () => import("./index-3d70eae0.js"), "../layout/bussiness/components/aside/index.vue": () => import("./index-d766f3ab.js"), "../layout/bussiness/components/aside/menu-item.vue": () => import("./menu-item-601f0954.js"), "../layout/bussiness/components/aside/side.vue": () => import("./side-f9a8c62b.js"), "../layout/bussiness/components/header/index.vue": () => import("./index-73b1f0bf.js"), "../layout/bussiness/components/header/layout-setting.vue": () => import("./layout-setting-0ab69728.js"), "../layout/bussiness/components/header/switch-lang.vue": () => import("./switch-lang-01038d43.js"), "../layout/bussiness/components/header/user-info.vue": () => import("./user-info-493c4096.js"), "../layout/bussiness/components/tabs.vue": () => import("./tabs-04d8fab8.js"), "../layout/bussiness/index.vue": () => import("./index-227d9693.js"), "../layout/darkside/components/aside/index.vue": () => import("./index-ed34177b.js"), "../layout/darkside/components/aside/menu-item.vue": () => import("./menu-item-ffaf7924.js"), "../layout/darkside/components/aside/side.vue": () => import("./side-99868ff0.js"), "../layout/darkside/components/header/index.vue": () => import("./index-232f1cdc.js"), "../layout/darkside/components/header/layout-setting.vue": () => import("./layout-setting-c71d24f3.js"), "../layout/darkside/components/header/switch-lang.vue": () => import("./switch-lang-6562f7ea.js"), "../layout/darkside/components/header/user-info.vue": () => import("./user-info-c90686a4.js"), "../layout/darkside/components/tabs.vue": () => import("./tabs-1391f48d.js"), "../layout/darkside/index.vue": () => import("./index-9cc2c2c4.js"), "../layout/decorate/index.vue": () => Promise.resolve().then(() => index$8), "../layout/default/components/aside/index.vue": () => import("./index-df26978a.js"), "../layout/default/components/aside/menu-item.vue": () => import("./menu-item-39ce0aab.js"), "../layout/default/components/aside/side.vue": () => import("./side-6f0d1b43.js"), "../layout/default/components/header/index.vue": () => import("./index-35220bed.js"), "../layout/default/components/header/layout-setting.vue": () => import("./layout-setting-bf2412dd.js"), "../layout/default/components/header/switch-lang.vue": () => import("./switch-lang-263d5606.js"), "../layout/default/components/header/user-info.vue": () => import("./user-info-860f008a.js"), "../layout/default/components/tabs.vue": () => import("./tabs-dc744296.js"), "../layout/default/index.vue": () => import("./index-d36da650.js"), "../layout/index.vue": () => Promise.resolve().then(() => index$9), "../layout/lightside/components/aside/index.vue": () => import("./index-46ff47a8.js"), "../layout/lightside/components/aside/menu-item.vue": () => import("./menu-item-8fbf6d31.js"), "../layout/lightside/components/aside/side.vue": () => import("./side-5d388e29.js"), "../layout/lightside/components/header/index.vue": () => import("./index-4df9545a.js"), "../layout/lightside/components/header/layout-setting.vue": () => import("./layout-setting-cdcf9e3f.js"), "../layout/lightside/components/header/switch-lang.vue": () => import("./switch-lang-469409b3.js"), "../layout/lightside/components/header/user-info.vue": () => import("./user-info-858ec70f.js"), "../layout/lightside/components/tabs.vue": () => import("./tabs-fb9c4bd7.js"), "../layout/lightside/index.vue": () => import("./index-eef5c3d5.js"), "../layout/profession/components/aside/index.vue": () => import("./index-e5acb35a.js"), "../layout/profession/components/aside/menu-item.vue": () => import("./menu-item-03ad4aea.js"), "../layout/profession/components/aside/side.vue": () => import("./side-562f6393.js"), "../layout/profession/components/header/index.vue": () => import("./index-22edf52f.js"), "../layout/profession/components/header/layout-setting.vue": () => import("./layout-setting-dd3cc41e.js"), "../layout/profession/components/header/switch-lang.vue": () => import("./switch-lang-d031381f.js"), "../layout/profession/components/header/user-info.vue": () => import("./user-info-485c157e.js"), "../layout/profession/components/tabs.vue": () => import("./tabs-9a165a0b.js"), "../layout/profession/index.vue": () => import("./index-7d422367.js"), "../layout/routine/components/aside/index.vue": () => import("./index-8338e7c2.js"), "../layout/routine/components/aside/menu-item.vue": () => import("./menu-item-ca2619d6.js"), "../layout/routine/components/aside/side.vue": () => import("./side-ab2ce500.js"), "../layout/routine/components/header/index.vue": () => import("./index-87707f50.js"), "../layout/routine/components/header/layout-setting.vue": () => import("./layout-setting-f302333c.js"), "../layout/routine/components/header/switch-lang.vue": () => import("./switch-lang-05c93cc2.js"), "../layout/routine/components/header/user-info.vue": () => import("./user-info-fc1df0f2.js"), "../layout/routine/components/tabs.vue": () => import("./tabs-038676ca.js"), "../layout/routine/index.vue": () => import("./index-d895eef4.js") })
};
function normalizeComponentKey(r) {
  return r.replace(/^@\//, "").replace(/^\/src\//, "").replace(/^\.\.\//, "").replace(/\\/g, "/");
}
function findCoreModuleLoader(r) {
  const i = coreVueModules;
  if (i[r])
    return i[r];
  const s = normalizeComponentKey(r), a = Object.keys(i).find((c) => normalizeComponentKey(c) === s || normalizeComponentKey(c).endsWith(`/${s}`));
  return a ? i[a] : void 0;
}
function resolveAsyncComponent(r) {
  return defineAsyncComponent(async () => {
    const i = findCoreModuleLoader(r);
    return i ? (await i()).default : (await loadCoreVueModule(r)).default;
  });
}
const allAddonVueModules = /* @__PURE__ */ Object.assign({ "../addon/cms/views/article/category.vue": () => import("./category-24ca72c5.js"), "../addon/cms/views/article/components/edit-category.vue": () => import("./edit-category-6a0ca7ec.js"), "../addon/cms/views/article/edit.vue": () => import("./edit-9953d7a3.js"), "../addon/cms/views/article/list.vue": () => import("./list-bb70d698.js"), "../addon/cms/views/diy/components/edit-article.vue": () => import("./edit-article-9ffb527f.js").then((r) => r._), "../addon/erp/views/purchase/detail.vue": () => import("./detail-79de761b.js"), "../addon/erp/views/purchase/instock.vue": () => import("./instock-1fd60c82.js"), "../addon/erp/views/purchase/list.vue": () => import("./list-8ea76949.js"), "../addon/erp/views/sales/detail.vue": () => import("./detail-f8617ce5.js"), "../addon/erp/views/sales/list.vue": () => import("./list-f1352308.js"), "../addon/erp/views/sales/outstock.vue": () => import("./outstock-eba40cbb.js"), "../addon/erp/views/stock/detail.vue": () => import("./detail-4b7a6124.js"), "../addon/erp/views/stock/list.vue": () => import("./list-14eb8627.js"), "../addon/erp/views/stock/stockIn.vue": () => import("./stockIn-38e5603c.js"), "../addon/erp/views/stock/stockOut.vue": () => import("./stockOut-5708c50b.js"), "../addon/friend_help/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-7ac972e3.js"), "../addon/friend_help/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-c005414d.js"), "../addon/friend_help/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-c6b2002d.js"), "../addon/friend_help/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-24ca72c5.js"), "../addon/friend_help/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-b259d5b8.js"), "../addon/friend_help/views/active/components/goods-select-content.vue": () => import("./goods-select-content-017904ae.js"), "../addon/friend_help/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-d720e416.js"), "../addon/friend_help/views/active/components/select-member.vue": () => import("./select-member-63e92532.js"), "../addon/friend_help/views/active/edit.vue": () => import("./edit-3022f0b7.js"), "../addon/friend_help/views/active/list.vue": () => import("./list-98995852.js"), "../addon/friend_help/views/active/stat.vue": () => import("./stat-96714f85.js"), "../addon/friend_help/views/config/config.vue": () => import("./config-122e19c0.js"), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": () => import("./edit-friend-help-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": () => import("./edit-friend-help-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": () => import("./edit-friend-help-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": () => import("./edit-friend-help-activity-goods-detail-friend-help-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": () => import("./edit-friend-help-activity-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": () => import("./edit-friend-help-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": () => import("./edit-friend-help-activity-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": () => import("./edit-friend-help-carousel-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": () => import("./edit-friend-help-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": () => import("./edit-friend-help-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": () => import("./edit-friend-help-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": () => import("./edit-friend-help-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": () => import("./edit-friend-help-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": () => import("./edit-friend-help-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-hot.vue": () => import("./edit-friend-help-hot-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-list.vue": () => import("./edit-friend-help-list-076f081e.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": () => import("./edit-friend-help-member-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": () => import("./edit-friend-help-order-info-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/launch/components/launch-detail-popup.vue": () => import("./launch-detail-popup-655f2c08.js"), "../addon/friend_help/views/launch/list.vue": () => import("./list-f58fe01d.js"), "../addon/friend_help/views/order/components/order-notes.vue": () => import("./order-notes-8c10629e.js"), "../addon/friend_help/views/order/components/refund-detail.vue": () => import("./refund-detail-406525db.js"), "../addon/friend_help/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-655f2c08.js"), "../addon/friend_help/views/order/detail.vue": () => import("./detail-194a7d26.js"), "../addon/friend_help/views/order/list.vue": () => import("./list-6f18e76b.js"), "../addon/friend_help/views/order/refund.vue": () => import("./refund-0e17a08e.js"), "../addon/friend_help/views/poster/components/edit-discount-desc.vue": () => import("./edit-discount-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-3656154e.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-min-price.vue": () => import("./edit-min-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-original-desc.vue": () => import("./edit-original-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-original-price.vue": () => import("./edit-original-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/edit-price.vue": () => import("./edit-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-discount-desc.vue": () => import("./preview-discount-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-3656154e.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-min-price.vue": () => import("./preview-min-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-original-desc.vue": () => import("./preview-original-desc-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-original-price.vue": () => import("./preview-original-price-9ffb527f.js").then((r) => r._), "../addon/friend_help/views/poster/components/preview-price.vue": () => import("./preview-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/card/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-7ac972e3.js"), "../addon/home_service/views/card/components/goods-select-popup.vue": () => import("./goods-select-popup-b15cf96a.js"), "../addon/home_service/views/card/edit.vue": () => import("./edit-f3f7f29a.js"), "../addon/home_service/views/card/list.vue": () => import("./list-d193b946.js"), "../addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": () => import("./edit-homeService-carousel-search-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": () => import("./edit-homeService-many-goods-list-8932c315.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-order-info.vue": () => import("./edit-homeService-order-info-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": () => import("./edit-homeService-rubik-cube-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": () => import("./edit-homeServicemember-banner-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-card.vue": () => import("./edit-homeServicemember-card-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": () => import("./edit-homeServicemember-cardList-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": () => import("./edit-homeServicemember-guarantee-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-info.vue": () => import("./edit-homeServicemember-info-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": () => import("./edit-homeServicemember-lowCost-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": () => import("./edit-homeServicemember-panicBuying-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": () => import("./edit-homeServicemember-settle-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": () => import("./edit-homeServicemember-subguarantee-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": () => import("./edit-homeServicemember-technician-list-recommed-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": () => import("./edit-homeServicemember-technician-list-9ffb527f.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-card.vue": () => import("./link-select-card-c8bf62b8.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-category.vue": () => import("./link-select-category-b8342db4.js").then((r) => r._), "../addon/home_service/views/diy/components/link-select-goods.vue": () => import("./link-select-goods-b4337fab.js").then((r) => r._), "../addon/home_service/views/feedback/list.vue": () => import("./list-cd799851.js"), "../addon/home_service/views/finance/components/BankTransferDialog.vue": () => import("./BankTransferDialog-c61c1e56.js"), "../addon/home_service/views/finance/invoice.vue": () => import("./invoice-655f2c08.js"), "../addon/home_service/views/finance/store_detail.vue": () => import("./store_detail-655f2c08.js"), "../addon/home_service/views/finance/store_finance.vue": () => import("./store_finance-655f2c08.js"), "../addon/home_service/views/finance/technician_detail.vue": () => import("./technician_detail-655f2c08.js"), "../addon/home_service/views/finance/technician_finance.vue": () => import("./technician_finance-655f2c08.js"), "../addon/home_service/views/finance/withdrawal_review.vue": () => import("./withdrawal_review-655f2c08.js"), "../addon/home_service/views/goods/category.vue": () => import("./category-7ac972e3.js"), "../addon/home_service/views/goods/city.vue": () => import("./city-655f2c08.js"), "../addon/home_service/views/goods/components/card-select-popup.vue": () => import("./card-select-popup-4acb3fab.js"), "../addon/home_service/views/goods/components/category-edit.vue": () => import("./category-edit-6a0ca7ec.js"), "../addon/home_service/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-655f2c08.js"), "../addon/home_service/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-afaec690.js"), "../addon/home_service/views/goods/components/guarantee-edit.vue": () => import("./guarantee-edit-655f2c08.js"), "../addon/home_service/views/goods/components/special-edit.vue": () => import("./special-edit-655f2c08.js"), "../addon/home_service/views/goods/edit.vue": () => import("./edit-fa339799.js"), "../addon/home_service/views/goods/guarantee.vue": () => import("./guarantee-655f2c08.js"), "../addon/home_service/views/goods/list.vue": () => import("./list-7ac972e3.js"), "../addon/home_service/views/goods/special.vue": () => import("./special-655f2c08.js"), "../addon/home_service/views/help/category.vue": () => import("./category-655f2c08.js"), "../addon/home_service/views/help/components/edit-category.vue": () => import("./edit-category-655f2c08.js"), "../addon/home_service/views/help/edit.vue": () => import("./edit-65e51d95.js"), "../addon/home_service/views/help/list.vue": () => import("./list-24ca72c5.js"), "../addon/home_service/views/index.vue": () => import("./index-a95c7f6c.js"), "../addon/home_service/views/marketing/coupon/add.vue": () => import("./add-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-ab894a7b.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/select-member.vue": () => import("./select-member-1988f5b1.js"), "../addon/home_service/views/marketing/coupon/edit.vue": () => import("./edit-655f2c08.js"), "../addon/home_service/views/marketing/coupon/list.vue": () => import("./list-8c10629e.js"), "../addon/home_service/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-655f2c08.js"), "../addon/home_service/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-655f2c08.js"), "../addon/home_service/views/order/components/add-address.vue": () => import("./add-address-c6dda74d.js"), "../addon/home_service/views/order/components/address-list.vue": () => import("./address-list-655f2c08.js"), "../addon/home_service/views/order/components/coupon-list.vue": () => import("./coupon-list-655f2c08.js"), "../addon/home_service/views/order/components/friend-pay.vue": () => import("./friend-pay-655f2c08.js"), "../addon/home_service/views/order/components/goods-limit.vue": () => import("./goods-limit-655f2c08.js"), "../addon/home_service/views/order/components/manjian-info.vue": () => import("./manjian-info-655f2c08.js"), "../addon/home_service/views/order/components/order-export-select.vue": () => import("./order-export-select-655f2c08.js"), "../addon/home_service/views/order/components/pay.vue": () => import("./pay-86799441.js"), "../addon/home_service/views/order/components/returnvisit.vue": () => import("./returnvisit-e82e6d3c.js"), "../addon/home_service/views/order/components/select-goods.vue": () => import("./select-goods-655f2c08.js"), "../addon/home_service/views/order/components/select-member.vue": () => import("./select-member-655f2c08.js"), "../addon/home_service/views/order/components/select-orderlabel.vue": () => import("./select-orderlabel-ca773366.js"), "../addon/home_service/views/order/components/select-technician.vue": () => import("./select-technician-655f2c08.js"), "../addon/home_service/views/order/components/select-time.vue": () => import("./select-time-8cc67db8.js"), "../addon/home_service/views/order/config.vue": () => import("./config-a9035567.js"), "../addon/home_service/views/order/easy_select.vue": () => import("./easy_select-15d5a4bc.js"), "../addon/home_service/views/order/easy_select_detail.vue": () => import("./easy_select_detail-815cbe18.js"), "../addon/home_service/views/order/evaluate.vue": () => import("./evaluate-86e49327.js"), "../addon/home_service/views/order/evaluate_config.vue": () => import("./evaluate_config-0c610ae9.js"), "../addon/home_service/views/order/intent_config.vue": () => import("./intent_config-4d8330fc.js"), "../addon/home_service/views/order/lesson_order.vue": () => import("./lesson_order-655f2c08.js"), "../addon/home_service/views/order/lesson_order_confirm.vue": () => import("./lesson_order_confirm-655f2c08.js"), "../addon/home_service/views/order/order.vue": () => import("./order-e84a06f4.js"), "../addon/home_service/views/order/order_detail.vue": () => import("./order_detail-46793948.js"), "../addon/home_service/views/order/protection_settings.vue": () => import("./protection_settings-5ce2ec06.js"), "../addon/home_service/views/order/return_visit.vue": () => import("./return_visit-d1f88e3a.js"), "../addon/home_service/views/order/tags.vue": () => import("./tags-9f4b6837.js"), "../addon/home_service/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-3656154e.js").then((r) => r._), "../addon/home_service/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-9ffb527f.js").then((r) => r._), "../addon/home_service/views/refund/refund.vue": () => import("./refund-0b3368c1.js"), "../addon/home_service/views/report/customer_report.vue": () => import("./customer_report-e31cb8ac.js"), "../addon/home_service/views/report/financial_report.vue": () => import("./financial_report-d26dcd54.js"), "../addon/home_service/views/report/member_report.vue": () => import("./member_report-2bc02802.js"), "../addon/home_service/views/report/store_report.vue": () => import("./store_report-47306f43.js"), "../addon/home_service/views/report/technician_report.vue": () => import("./technician_report-6f28d2c1.js"), "../addon/home_service/views/store/add.vue": () => import("./add-f141cc95.js"), "../addon/home_service/views/store/detail.vue": () => import("./detail-4ff65342.js"), "../addon/home_service/views/store/edit.vue": () => import("./edit-a76c4387.js"), "../addon/home_service/views/store/examine.vue": () => import("./examine-655f2c08.js"), "../addon/home_service/views/store/examine_edit.vue": () => import("./examine_edit-a4eecf45.js"), "../addon/home_service/views/store/list.vue": () => import("./list-655f2c08.js"), "../addon/home_service/views/store/technician.vue": () => import("./technician-655f2c08.js"), "../addon/home_service/views/technician/cityfare.vue": () => import("./cityfare-655f2c08.js"), "../addon/home_service/views/technician/cityfare_config.vue": () => import("./cityfare_config-ee74e4e4.js"), "../addon/home_service/views/technician/components/dynamicCollapseForm/dynamicCollapseForm.vue": () => import("./dynamicCollapseForm-f2045055.js"), "../addon/home_service/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-05ff17fb.js"), "../addon/home_service/views/technician/detail.vue": () => import("./detail-7b4c15d7.js"), "../addon/home_service/views/technician/edit.vue": () => import("./edit-0f307902.js"), "../addon/home_service/views/technician/examine.vue": () => import("./examine-6a0ca7ec.js"), "../addon/home_service/views/technician/examine_edit.vue": () => import("./examine_edit-6a78e218.js"), "../addon/home_service/views/technician/level.vue": () => import("./level-655f2c08.js"), "../addon/home_service/views/technician/level_edit.vue": () => import("./level_edit-1702716b.js"), "../addon/home_service/views/technician/list.vue": () => import("./list-77a11a55.js"), "../addon/huaweicloud_obs/views/setting/components/storage-huawei.vue": () => import("./storage-huawei-655f2c08.js"), "../addon/huaweicloud_sms/views/setting/components/sms-huawei.vue": () => import("./sms-huawei-655f2c08.js"), "../addon/o2o/views/config/reserve.vue": () => import("./reserve-655f2c08.js"), "../addon/o2o/views/diy/components/edit-o2o-goods-list.vue": () => import("./edit-o2o-goods-list-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-member-info.vue": () => import("./edit-o2o-member-info-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-order-info.vue": () => import("./edit-o2o-order-info-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-search.vue": () => import("./edit-o2o-search-9ffb527f.js").then((r) => r._), "../addon/o2o/views/diy/components/edit-o2o-technician.vue": () => import("./edit-o2o-technician-9ffb527f.js").then((r) => r._), "../addon/o2o/views/goods/category.vue": () => import("./category-6a0ca7ec.js"), "../addon/o2o/views/goods/components/category-edit.vue": () => import("./category-edit-655f2c08.js"), "../addon/o2o/views/goods/components/category-select-content.vue": () => import("./category-select-content-655f2c08.js"), "../addon/o2o/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6a0ca7ec.js"), "../addon/o2o/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-8bc5f882.js"), "../addon/o2o/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-de4eccf8.js"), "../addon/o2o/views/goods/edit.vue": () => import("./edit-8cd37de0.js"), "../addon/o2o/views/goods/list.vue": () => import("./list-6a0ca7ec.js"), "../addon/o2o/views/index.vue": () => import("./index-d3b76651.js"), "../addon/o2o/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-24ca72c5.js"), "../addon/o2o/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-24ca72c5.js"), "../addon/o2o/views/order/components/order-export-select.vue": () => import("./order-export-select-7ac972e3.js"), "../addon/o2o/views/order/config.vue": () => import("./config-7da0b282.js"), "../addon/o2o/views/order/order.vue": () => import("./order-261aafa2.js"), "../addon/o2o/views/order/order_detail.vue": () => import("./order_detail-fe597332.js"), "../addon/o2o/views/order/reserve.vue": () => import("./reserve-441376d0.js"), "../addon/o2o/views/poster/components/edit-o2o-goods-image.vue": () => import("./edit-o2o-goods-image-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/edit-o2o-goods-name.vue": () => import("./edit-o2o-goods-name-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/edit-o2o-goods-price.vue": () => import("./edit-o2o-goods-price-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-image.vue": () => import("./preview-o2o-goods-image-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-name.vue": () => import("./preview-o2o-goods-name-9ffb527f.js").then((r) => r._), "../addon/o2o/views/poster/components/preview-o2o-goods-price.vue": () => import("./preview-o2o-goods-price-9ffb527f.js").then((r) => r._), "../addon/o2o/views/refund/detail.vue": () => import("./detail-1ad78c96.js"), "../addon/o2o/views/refund/refund.vue": () => import("./refund-7ac972e3.js"), "../addon/o2o/views/site_index.vue": () => import("./site_index-655f2c08.js"), "../addon/o2o/views/technician/components/edit-position.vue": () => import("./edit-position-655f2c08.js"), "../addon/o2o/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-c87af0e3.js"), "../addon/o2o/views/technician/edit.vue": () => import("./edit-f4e9fe4e.js"), "../addon/o2o/views/technician/list.vue": () => import("./list-4a02961a.js"), "../addon/o2o/views/technician/position.vue": () => import("./position-655f2c08.js"), "../addon/pintuan/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-6a0ca7ec.js"), "../addon/pintuan/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-872a9b55.js"), "../addon/pintuan/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-17fce5f8.js"), "../addon/pintuan/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-7ac972e3.js"), "../addon/pintuan/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-b86d6ade.js"), "../addon/pintuan/views/active/components/goods-select-content.vue": () => import("./goods-select-content-99d723c0.js"), "../addon/pintuan/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-8761f88c.js"), "../addon/pintuan/views/active/components/select-member.vue": () => import("./select-member-5ab36100.js"), "../addon/pintuan/views/active/edit.vue": () => import("./edit-1e1475eb.js"), "../addon/pintuan/views/active/list.vue": () => import("./list-fbca5f7b.js"), "../addon/pintuan/views/active/stat.vue": () => import("./stat-bfae590c.js"), "../addon/pintuan/views/config/config.vue": () => import("./config-3f1aed28.js"), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": () => import("./edit-pintuan-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": () => import("./edit-pintuan-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": () => import("./edit-pintuan-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": () => import("./edit-pintuan-activity-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": () => import("./edit-pintuan-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": () => import("./edit-pintuan-activity-goods-detail-pintuan-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": () => import("./edit-pintuan-activity-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": () => import("./edit-pintuan-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": () => import("./edit-pintuan-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": () => import("./edit-pintuan-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": () => import("./edit-pintuan-goods-detail-gameplay-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": () => import("./edit-pintuan-goods-detail-progress-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": () => import("./edit-pintuan-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-hot.vue": () => import("./edit-pintuan-hot-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": () => import("./edit-pintuan-immediately-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-limit.vue": () => import("./edit-pintuan-limit-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-list.vue": () => import("./edit-pintuan-list-55ae56e7.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": () => import("./edit-pintuan-member-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": () => import("./edit-pintuan-order-info-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/group/components/group-detail-popup.vue": () => import("./group-detail-popup-655f2c08.js"), "../addon/pintuan/views/group/list.vue": () => import("./list-830bb3e2.js"), "../addon/pintuan/views/order/components/order-notes.vue": () => import("./order-notes-1ad78c96.js"), "../addon/pintuan/views/order/components/refund-detail.vue": () => import("./refund-detail-b57aa288.js"), "../addon/pintuan/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-8c10629e.js"), "../addon/pintuan/views/order/detail.vue": () => import("./detail-78407100.js"), "../addon/pintuan/views/order/list.vue": () => import("./list-69c933f4.js"), "../addon/pintuan/views/order/refund.vue": () => import("./refund-0ffc2561.js"), "../addon/pintuan/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/edit-price.vue": () => import("./edit-price-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-d6db8e07.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-3656154e.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-9ffb527f.js").then((r) => r._), "../addon/pintuan/views/poster/components/preview-price.vue": () => import("./preview-price-3656154e.js").then((r) => r._), "../addon/recharge/views/order/components/recharge-detail.vue": () => import("./recharge-detail-655f2c08.js"), "../addon/recharge/views/order/detail.vue": () => import("./detail-b0ffb798.js"), "../addon/recharge/views/order/list.vue": () => import("./list-e113a869.js"), "../addon/recharge/views/order/refund.vue": () => import("./refund-24ca72c5.js"), "../addon/recharge/views/package/components/detail-growth.vue": () => import("./detail-growth-e3f26d99.js"), "../addon/recharge/views/package/components/detail-points.vue": () => import("./detail-points-35870f22.js"), "../addon/recharge/views/package/components/gift-growth.vue": () => import("./gift-growth-db23acd9.js"), "../addon/recharge/views/package/components/gift-points.vue": () => import("./gift-points-87fb6710.js"), "../addon/recharge/views/package/components/package-gift.vue": () => import("./package-gift-655f2c08.js"), "../addon/recharge/views/package/config.vue": () => import("./config-d45f3c42.js"), "../addon/recharge/views/package/detail.vue": () => import("./detail-655f2c08.js"), "../addon/recharge/views/package/edit.vue": () => import("./edit-fbae5219.js"), "../addon/recharge/views/package/list.vue": () => import("./list-1ad78c96.js"), "../addon/relay/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-655f2c08.js"), "../addon/relay/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-be5748ae.js"), "../addon/relay/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-cba51086.js"), "../addon/relay/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-655f2c08.js"), "../addon/relay/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-5ee56832.js"), "../addon/relay/views/active/components/goods-select-content.vue": () => import("./goods-select-content-4176593b.js"), "../addon/relay/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-155694b9.js"), "../addon/relay/views/active/components/select-member.vue": () => import("./select-member-fbe03876.js"), "../addon/relay/views/active/edit.vue": () => import("./edit-e6c12e86.js"), "../addon/relay/views/active/list.vue": () => import("./list-122e19c0.js"), "../addon/relay/views/active/stat.vue": () => import("./stat-0f841573.js"), "../addon/relay/views/config/config.vue": () => import("./config-655f2c08.js"), "../addon/relay/views/diy/components/edit-relay-goods-list.vue": () => import("./edit-relay-goods-list-9ffb527f.js").then((r) => r._), "../addon/relay/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-082c2f59.js"), "../addon/relay/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-ef9c7c5f.js"), "../addon/relay/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-1a48cbca.js"), "../addon/relay/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-e1048975.js"), "../addon/relay/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-655f2c08.js"), "../addon/relay/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-132a6518.js"), "../addon/relay/views/goods/edit.vue": () => import("./edit-38ab753d.js"), "../addon/relay/views/goods/list.vue": () => import("./list-57240982.js"), "../addon/relay/views/order/components/order-notes.vue": () => import("./order-notes-655f2c08.js"), "../addon/relay/views/order/components/refund-detail.vue": () => import("./refund-detail-7e87a5a8.js"), "../addon/relay/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-6a0ca7ec.js"), "../addon/relay/views/order/detail.vue": () => import("./detail-cfc6c61b.js"), "../addon/relay/views/order/list.vue": () => import("./list-7dc981b4.js"), "../addon/relay/views/order/refund.vue": () => import("./refund-c97dca95.js"), "../addon/seckill/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-6a0ca7ec.js"), "../addon/seckill/views/active/components/goods-sku-popup.vue": () => import("./goods-sku-popup-973f4b47.js"), "../addon/seckill/views/active/components/seckill-detail-popup.vue": () => import("./seckill-detail-popup-655f2c08.js"), "../addon/seckill/views/active/components/time-select-popup.vue": () => import("./time-select-popup-655f2c08.js"), "../addon/seckill/views/active/detail.vue": () => import("./detail-950ada55.js"), "../addon/seckill/views/active/edit.vue": () => import("./edit-5af64ddd.js"), "../addon/seckill/views/active/list.vue": () => import("./list-b0ffb798.js"), "../addon/seckill/views/active/stat.vue": () => import("./stat-8bba71a4.js"), "../addon/seckill/views/config/config.vue": () => import("./config-6a0ca7ec.js"), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": () => import("./edit-seckill-activity-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": () => import("./edit-seckill-activity-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": () => import("./edit-seckill-activity-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": () => import("./edit-seckill-activity-goods-detail-goods-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": () => import("./edit-seckill-activity-goods-detail-seckill-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": () => import("./edit-seckill-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": () => import("./edit-seckill-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": () => import("./edit-seckill-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": () => import("./edit-seckill-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-goods.vue": () => import("./edit-seckill-goods-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-hot.vue": () => import("./edit-seckill-hot-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-member-info.vue": () => import("./edit-seckill-member-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-order-info.vue": () => import("./edit-seckill-order-info-9ffb527f.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": () => import("./edit-seckill-rubik-cube-5b5d5c10.js").then((r) => r._), "../addon/seckill/views/diy/components/edit-seckill-special-offer.vue": () => import("./edit-seckill-special-offer-9ffb527f.js").then((r) => r._), "../addon/seckill/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-6666628e.js"), "../addon/seckill/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-3669bb9d.js"), "../addon/seckill/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-2e2aae95.js"), "../addon/seckill/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-eae7dff4.js"), "../addon/seckill/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-6a0ca7ec.js"), "../addon/seckill/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-b484486b.js"), "../addon/seckill/views/goods/edit.vue": () => import("./edit-ab8e56b8.js"), "../addon/seckill/views/goods/list.vue": () => import("./list-3fbd8b06.js"), "../addon/seckill/views/order/components/order-notes.vue": () => import("./order-notes-6a0ca7ec.js"), "../addon/seckill/views/order/components/refund-detail.vue": () => import("./refund-detail-4bdb5865.js"), "../addon/seckill/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-7ac972e3.js"), "../addon/seckill/views/order/detail.vue": () => import("./detail-bad327c5.js"), "../addon/seckill/views/order/list.vue": () => import("./list-2bca324c.js"), "../addon/seckill/views/order/refund.vue": () => import("./refund-ee5cd27a.js"), "../addon/seckill/views/poster/components/edit-active-time.vue": () => import("./edit-active-time-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-seckill-market-price.vue": () => import("./edit-seckill-market-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/edit-seckill-price.vue": () => import("./edit-seckill-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-active-time.vue": () => import("./preview-active-time-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-907653fa.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-seckill-market-price.vue": () => import("./preview-seckill-market-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/poster/components/preview-seckill-price.vue": () => import("./preview-seckill-price-9ffb527f.js").then((r) => r._), "../addon/seckill/views/time/components/time-diy-select-popup.vue": () => import("./time-diy-select-popup-565c861f.js"), "../addon/seckill/views/time/components/time-goods-detail.vue": () => import("./time-goods-detail-655f2c08.js"), "../addon/seckill/views/time/components/time-select-content.vue": () => import("./time-select-content-9bd7431f.js"), "../addon/seckill/views/time/edit.vue": () => import("./edit-6a0ca7ec.js"), "../addon/seckill/views/time/list.vue": () => import("./list-7da0b282.js"), "../addon/shop/views/address/edit.vue": () => import("./edit-7ac972e3.js"), "../addon/shop/views/address/list.vue": () => import("./list-3f1aed28.js"), "../addon/shop/views/delivery/company.vue": () => import("./company-655f2c08.js"), "../addon/shop/views/delivery/company_edit.vue": () => import("./company_edit-655f2c08.js"), "../addon/shop/views/delivery/components/delivery-personnel-edit.vue": () => import("./delivery-personnel-edit-655f2c08.js"), "../addon/shop/views/delivery/components/local-delivery-service-dada.vue": () => import("./local-delivery-service-dada-655f2c08.js"), "../addon/shop/views/delivery/components/local_record_detail.vue": () => import("./local_record_detail-655f2c08.js"), "../addon/shop/views/delivery/components/shop_record_detail.vue": () => import("./shop_record_detail-655f2c08.js"), "../addon/shop/views/delivery/config.vue": () => import("./config-33f02061.js"), "../addon/shop/views/delivery/electronic_sheet.vue": () => import("./electronic_sheet-655f2c08.js"), "../addon/shop/views/delivery/electronic_sheet_config.vue": () => import("./electronic_sheet_config-538b0b06.js"), "../addon/shop/views/delivery/electronic_sheet_edit.vue": () => import("./electronic_sheet_edit-655f2c08.js"), "../addon/shop/views/delivery/local.vue": () => import("./local-6eb31ec5.js"), "../addon/shop/views/delivery/local_config.vue": () => import("./local_config-655f2c08.js"), "../addon/shop/views/delivery/local_delivery_service.vue": () => import("./local_delivery_service-655f2c08.js"), "../addon/shop/views/delivery/local_record.vue": () => import("./local_record-10eb1497.js"), "../addon/shop/views/delivery/merchant_record.vue": () => import("./merchant_record-6fcfbc7b.js"), "../addon/shop/views/delivery/search.vue": () => import("./search-c677febb.js"), "../addon/shop/views/delivery/staff.vue": () => import("./staff-655f2c08.js"), "../addon/shop/views/delivery/store.vue": () => import("./store-655f2c08.js"), "../addon/shop/views/delivery/store_edit.vue": () => import("./store_edit-655f2c08.js"), "../addon/shop/views/delivery/template.vue": () => import("./template-655f2c08.js"), "../addon/shop/views/delivery/template_edit.vue": () => import("./template_edit-f698ac19.js"), "../addon/shop/views/delivery_store/delivery_set.vue": () => import("./delivery_set-655f2c08.js"), "../addon/shop/views/delivery_store/edit.vue": () => import("./edit-9e28b490.js"), "../addon/shop/views/delivery_store/list.vue": () => import("./list-545eb6f5.js"), "../addon/shop/views/diy/components/edit-goods-coupon.vue": () => import("./edit-goods-coupon-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-goods-list.vue": () => import("./edit-goods-list-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-many-goods-list.vue": () => import("./edit-many-goods-list-4bd70d63.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-exchange-goods.vue": () => import("./edit-shop-exchange-goods-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-exchange-info.vue": () => import("./edit-shop-exchange-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": () => import("./edit-shop-goods-detail-attr-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": () => import("./edit-shop-goods-detail-basic-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": () => import("./edit-shop-goods-detail-bottom-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": () => import("./edit-shop-goods-detail-desc-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": () => import("./edit-shop-goods-detail-evaluate-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": () => import("./edit-shop-goods-detail-purchase-service-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": () => import("./edit-shop-goods-detail-sow-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-hot.vue": () => import("./edit-shop-goods-hot-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-ranking.vue": () => import("./edit-shop-goods-ranking-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-goods-recommend.vue": () => import("./edit-shop-goods-recommend-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-member-info.vue": () => import("./edit-shop-member-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-newcomer.vue": () => import("./edit-shop-newcomer-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-order-info.vue": () => import("./edit-shop-order-info-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-shop-search.vue": () => import("./edit-shop-search-9ffb527f.js").then((r) => r._), "../addon/shop/views/diy/components/edit-single-recommend.vue": () => import("./edit-single-recommend-9ffb527f.js").then((r) => r._), "../addon/shop/views/goods/attr.vue": () => import("./attr-655f2c08.js"), "../addon/shop/views/goods/attr_edit.vue": () => import("./attr_edit-655f2c08.js"), "../addon/shop/views/goods/brand_list.vue": () => import("./brand_list-655f2c08.js"), "../addon/shop/views/goods/category.vue": () => import("./category-614a0ab9.js"), "../addon/shop/views/goods/category_config.vue": () => import("./category_config-edf2f53b.js"), "../addon/shop/views/goods/components/brand-edit.vue": () => import("./brand-edit-655f2c08.js"), "../addon/shop/views/goods/components/category-edit.vue": () => import("./category-edit-1ad78c96.js"), "../addon/shop/views/goods/components/coupon-select-popup.vue": () => import("./coupon-select-popup-52cdb608.js"), "../addon/shop/views/goods/components/evaluate-add.vue": () => import("./evaluate-add-655f2c08.js"), "../addon/shop/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-1bd7fce5.js"), "../addon/shop/views/goods/components/goods-category-select-content.vue": () => import("./goods-category-select-content-3013118f.js"), "../addon/shop/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-284f5354.js"), "../addon/shop/views/goods/components/goods-price-edit-popup.vue": () => import("./goods-price-edit-popup-9712924e.js"), "../addon/shop/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-2b18a8f7.js"), "../addon/shop/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-5c669447.js"), "../addon/shop/views/goods/components/goods-stock-edit-popup.vue": () => import("./goods-stock-edit-popup-6f680b8d.js"), "../addon/shop/views/goods/components/label-edit.vue": () => import("./label-edit-655f2c08.js"), "../addon/shop/views/goods/components/label-group-edit.vue": () => import("./label-group-edit-655f2c08.js"), "../addon/shop/views/goods/components/newcomer-goods-select-popup.vue": () => import("./newcomer-goods-select-popup-c98a53a9.js"), "../addon/shop/views/goods/components/service-edit.vue": () => import("./service-edit-655f2c08.js"), "../addon/shop/views/goods/evaluate.vue": () => import("./evaluate-1a895b6d.js"), "../addon/shop/views/goods/label_group_list.vue": () => import("./label_group_list-655f2c08.js"), "../addon/shop/views/goods/label_list.vue": () => import("./label_list-655f2c08.js"), "../addon/shop/views/goods/list.vue": () => import("./list-707d21e3.js"), "../addon/shop/views/goods/real_edit.vue": () => import("./real_edit-eaaeae0a.js"), "../addon/shop/views/goods/recycle.vue": () => import("./recycle-99fb5b70.js"), "../addon/shop/views/goods/search_config.vue": () => import("./search_config-02815de0.js"), "../addon/shop/views/goods/service.vue": () => import("./service-655f2c08.js"), "../addon/shop/views/goods/virtual_edit.vue": () => import("./virtual_edit-50f0d72b.js"), "../addon/shop/views/index/index.vue": () => import("./index-7ac972e3.js"), "../addon/shop/views/marketing/coupon/add.vue": () => import("./add-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-a7c786ab.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/select-member.vue": () => import("./select-member-480fd415.js"), "../addon/shop/views/marketing/coupon/edit.vue": () => import("./edit-b0ffb798.js"), "../addon/shop/views/marketing/coupon/list.vue": () => import("./list-07c4c15d.js"), "../addon/shop/views/marketing/discount/add.vue": () => import("./add-d61d59d5.js"), "../addon/shop/views/marketing/discount/components/discount-detail.vue": () => import("./discount-detail-655f2c08.js"), "../addon/shop/views/marketing/discount/components/goods-sku-popup.vue": () => import("./goods-sku-popup-12ac7561.js"), "../addon/shop/views/marketing/discount/config.vue": () => import("./config-a41c4162.js"), "../addon/shop/views/marketing/discount/detail.vue": () => import("./detail-24ca72c5.js"), "../addon/shop/views/marketing/discount/edit.vue": () => import("./edit-fa7e6566.js"), "../addon/shop/views/marketing/discount/list.vue": () => import("./list-02a6dc3f.js"), "../addon/shop/views/marketing/exchange/components/goods-select-content.vue": () => import("./goods-select-content-6d09ce52.js"), "../addon/shop/views/marketing/exchange/components/goods-select-popup.vue": () => import("./goods-select-popup-655f2c08.js"), "../addon/shop/views/marketing/exchange/components/goods-sku-select.vue": () => import("./goods-sku-select-655f2c08.js"), "../addon/shop/views/marketing/exchange/goods_add.vue": () => import("./goods_add-b3d1f44e.js"), "../addon/shop/views/marketing/exchange/goods_edit.vue": () => import("./goods_edit-bd23595c.js"), "../addon/shop/views/marketing/exchange/goods_list.vue": () => import("./goods_list-655f2c08.js"), "../addon/shop/views/marketing/exchange/order_list.vue": () => import("./order_list-08a4705a.js"), "../addon/shop/views/marketing/goods_rank/components/rank-select-popup.vue": () => import("./rank-select-popup-194a0cf5.js"), "../addon/shop/views/marketing/goods_rank/config.vue": () => import("./config-1ad78c96.js"), "../addon/shop/views/marketing/goods_rank/edit.vue": () => import("./edit-7da0b282.js"), "../addon/shop/views/marketing/goods_rank/list.vue": () => import("./list-9439af69.js"), "../addon/shop/views/marketing/index.vue": () => import("./index-6355e83a.js"), "../addon/shop/views/marketing/manjian/detail.vue": () => import("./detail-7c88bbe9.js"), "../addon/shop/views/marketing/manjian/edit.vue": () => import("./edit-a3a15e93.js"), "../addon/shop/views/marketing/manjian/list.vue": () => import("./list-032bb2e9.js"), "../addon/shop/views/marketing/newcomer/config.vue": () => import("./config-b8238494.js"), "../addon/shop/views/marketing/newcomer/order_list.vue": () => import("./order_list-e2f69260.js"), "../addon/shop/views/member/components/benefits-free-shipping.vue": () => import("./benefits-free-shipping-655f2c08.js"), "../addon/shop/views/member/components/gift-coupon.vue": () => import("./gift-coupon-655f2c08.js"), "../addon/shop/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-7ac972e3.js"), "../addon/shop/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-7ac972e3.js"), "../addon/shop/views/member/components/point-rule-buygoods.vue": () => import("./point-rule-buygoods-655f2c08.js"), "../addon/shop/views/member/components/point-rule-orderdeduction.vue": () => import("./point-rule-orderdeduction-655f2c08.js"), "../addon/shop/views/member/components/recharge-detail-coupon.vue": () => import("./recharge-detail-coupon-67f0e5e9.js"), "../addon/shop/views/member/components/recharge-gift-coupon.vue": () => import("./recharge-gift-coupon-781a56df.js"), "../addon/shop/views/order/batch_delivery.vue": () => import("./batch_delivery-655f2c08.js"), "../addon/shop/views/order/components/adjust-money.vue": () => import("./adjust-money-655f2c08.js"), "../addon/shop/views/order/components/delivery-action.vue": () => import("./delivery-action-655f2c08.js"), "../addon/shop/views/order/components/delivery-package.vue": () => import("./delivery-package-655f2c08.js"), "../addon/shop/views/order/components/electronic-sheet-print.vue": () => import("./electronic-sheet-print-655f2c08.js"), "../addon/shop/views/order/components/form-detail.vue": () => import("./form-detail-655f2c08.js"), "../addon/shop/views/order/components/import-data.vue": () => import("./import-data-655f2c08.js"), "../addon/shop/views/order/components/invoice-detail.vue": () => import("./invoice-detail-655f2c08.js"), "../addon/shop/views/order/components/invoice-dialog.vue": () => import("./invoice-dialog-655f2c08.js"), "../addon/shop/views/order/components/open-invoice.vue": () => import("./open-invoice-655f2c08.js"), "../addon/shop/views/order/components/order-detail.vue": () => import("./order-detail-6a0ca7ec.js"), "../addon/shop/views/order/components/order-edit-address.vue": () => import("./order-edit-address-655f2c08.js"), "../addon/shop/views/order/components/order-export-select.vue": () => import("./order-export-select-6a0ca7ec.js"), "../addon/shop/views/order/components/order-notes.vue": () => import("./order-notes-24ca72c5.js"), "../addon/shop/views/order/components/refund-detail.vue": () => import("./refund-detail-0e40fccf.js"), "../addon/shop/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-24ca72c5.js"), "../addon/shop/views/order/config.vue": () => import("./config-b0ffb798.js"), "../addon/shop/views/order/detail.vue": () => import("./detail-ffe33284.js"), "../addon/shop/views/order/invoice.vue": () => import("./invoice-6a0ca7ec.js"), "../addon/shop/views/order/list.vue": () => import("./list-4c6fe118.js"), "../addon/shop/views/order/refund.vue": () => import("./refund-64138978.js"), "../addon/shop/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-3656154e.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-f7d788a0.js").then((r) => r._), "../addon/shop/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-3656154e.js").then((r) => r._), "../addon/shop/views/printer/components/preview-goods-order.vue": () => import("./preview-goods-order-42e8dcaa.js").then((r) => r._), "../addon/shop/views/sow_community/components/sow-community-gift-coupon.vue": () => import("./sow-community-gift-coupon-0d8b1762.js"), "../addon/shop/views/stat/goods.vue": () => import("./goods-7fca9a65.js"), "../addon/shop/views/stat/index.vue": () => import("./index-08a15ed7.js"), "../addon/shop/views/stat/member.vue": () => import("./member-2971f0be.js"), "../addon/shop/views/stat/order.vue": () => import("./order-c37da38d.js"), "../addon/shop/views/stat/visit.vue": () => import("./visit-5f7e1271.js"), "../addon/shop_fenxiao/views/agent/level_config.vue": () => import("./level_config-655f2c08.js"), "../addon/shop_fenxiao/views/agent/list.vue": () => import("./list-ab2518bc.js"), "../addon/shop_fenxiao/views/agent/order.vue": () => import("./order-f6ae6f18.js"), "../addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue": () => import("./fenxiao-goods-detail-655f2c08.js"), "../addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue": () => import("./fenxiao-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/components/member-of-select-popup.vue": () => import("./member-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/config/index.vue": () => import("./index-144cbcbc.js"), "../addon/shop_fenxiao/views/config/poster.vue": () => import("./poster-655f2c08.js"), "../addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": () => import("./edit-fenxiao-goods-list-9ffb527f.js").then((r) => r._), "../addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue": () => import("./fenxiao-detail-655f2c08.js"), "../addon/shop_fenxiao/views/fenxiao/detail.vue": () => import("./detail-8c10629e.js"), "../addon/shop_fenxiao/views/fenxiao/edit.vue": () => import("./edit-0782fd92.js"), "../addon/shop_fenxiao/views/fenxiao/lists.vue": () => import("./lists-655f2c08.js"), "../addon/shop_fenxiao/views/goods/config.vue": () => import("./config-13de9110.js"), "../addon/shop_fenxiao/views/goods/detail.vue": () => import("./detail-28441a1e.js"), "../addon/shop_fenxiao/views/goods/lists.vue": () => import("./lists-59234e8b.js"), "../addon/shop_fenxiao/views/index/index.vue": () => import("./index-24ca72c5.js"), "../addon/shop_fenxiao/views/level/edit.vue": () => import("./edit-aa0d6c6e.js"), "../addon/shop_fenxiao/views/level/lists.vue": () => import("./lists-6a0ca7ec.js"), "../addon/shop_fenxiao/views/member/lists.vue": () => import("./lists-7ac972e3.js"), "../addon/shop_fenxiao/views/order/lists.vue": () => import("./lists-c7b307e9.js"), "../addon/shop_fenxiao/views/sale/config.vue": () => import("./config-a17c3061.js"), "../addon/shop_fenxiao/views/sale/list.vue": () => import("./list-16d80079.js"), "../addon/shop_fenxiao/views/sale/member_list.vue": () => import("./member_list-655f2c08.js"), "../addon/shop_fenxiao/views/task/components/task-detail.vue": () => import("./task-detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/config.vue": () => import("./config-47fe8d79.js"), "../addon/shop_fenxiao/views/task/detail.vue": () => import("./detail-6a0ca7ec.js"), "../addon/shop_fenxiao/views/task/edit.vue": () => import("./edit-8c10629e.js"), "../addon/shop_fenxiao/views/task/list.vue": () => import("./list-788e9d8a.js"), "../addon/shop_fenxiao/views/task/reward_detail.vue": () => import("./reward_detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/reward_list.vue": () => import("./reward_list-655f2c08.js"), "../addon/shop_fenxiao/views/team/level.vue": () => import("./level-aa9a3e9c.js"), "../addon/shop_fenxiao/views/team/order.vue": () => import("./order-25ef4778.js"), "../addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": () => import("./edit-giftcard-list-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/giftcard/card_detail.vue": () => import("./card_detail-648a3908.js"), "../addon/shop_giftcard/views/giftcard/category.vue": () => import("./category-8c10629e.js"), "../addon/shop_giftcard/views/giftcard/components/category-edit.vue": () => import("./category-edit-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue": () => import("./giftcard-detail-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-content.vue": () => import("./giftcard-select-content-f83bb77b.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue": () => import("./giftcard-select-popup-c038f506.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-edit.vue": () => import("./makecard-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue": () => import("./makecard-import-log-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-edit.vue": () => import("./material-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-group-edit.vue": () => import("./material-group-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-move.vue": () => import("./material-move-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-select-popup.vue": () => import("./material-select-popup-34e8aa1d.js"), "../addon/shop_giftcard/views/giftcard/components/material-select.vue": () => import("./material-select-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/config.vue": () => import("./config-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/detail.vue": () => import("./detail-dd50911a.js"), "../addon/shop_giftcard/views/giftcard/edit.vue": () => import("./edit-dd00cc6d.js"), "../addon/shop_giftcard/views/giftcard/list.vue": () => import("./list-2c2b8751.js"), "../addon/shop_giftcard/views/giftcard/makecard.vue": () => import("./makecard-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material.vue": () => import("./material-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material_group.vue": () => import("./material_group-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-detail.vue": () => import("./order-detail-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-notes.vue": () => import("./order-notes-7ac972e3.js"), "../addon/shop_giftcard/views/order/list.vue": () => import("./list-256ab3bb.js"), "../addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": () => import("./edit-giftcard-blessing-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": () => import("./edit-giftcard-image-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": () => import("./edit-giftcard-name-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": () => import("./edit-giftcard-validity-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": () => import("./preview-giftcard-blessing-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": () => import("./preview-giftcard-image-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": () => import("./preview-giftcard-name-9ffb527f.js").then((r) => r._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": () => import("./preview-giftcard-validity-9ffb527f.js").then((r) => r._), "../addon/shop_impulse_buy/views/impulse_buy/components/category-select-popup.vue": () => import("./category-select-popup-8e9436d1.js"), "../addon/shop_impulse_buy/views/impulse_buy/config.vue": () => import("./config-24ca72c5.js"), "../addon/shop_impulse_buy/views/impulse_buy/detail.vue": () => import("./detail-7ac972e3.js"), "../addon/shop_impulse_buy/views/impulse_buy/edit.vue": () => import("./edit-86d6accf.js"), "../addon/shop_impulse_buy/views/impulse_buy/list.vue": () => import("./list-e949c5a9.js"), "../addon/shop_replace_buy/views/components/add-address.vue": () => import("./add-address-655f2c08.js"), "../addon/shop_replace_buy/views/components/address-list.vue": () => import("./address-list-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/coupon-list.vue": () => import("./coupon-list-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/friend-pay.vue": () => import("./friend-pay-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/goods-limit.vue": () => import("./goods-limit-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/manjian-info.vue": () => import("./manjian-info-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/select-goods.vue": () => import("./select-goods-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/select-member.vue": () => import("./select-member-6a0ca7ec.js"), "../addon/shop_replace_buy/views/components/store-list.vue": () => import("./store-list-655f2c08.js"), "../addon/shop_replace_buy/views/index.vue": () => import("./index-655f2c08.js"), "../addon/shop_replace_buy/views/order.vue": () => import("./order-6a0ca7ec.js"), "../addon/sow_community/views/category/components/category-edit.vue": () => import("./category-edit-24ca72c5.js"), "../addon/sow_community/views/category/list.vue": () => import("./list-14757507.js"), "../addon/sow_community/views/comment/list.vue": () => import("./list-0093effa.js"), "../addon/sow_community/views/config/config.vue": () => import("./config-8c10629e.js"), "../addon/sow_community/views/content/components/content-detail.vue": () => import("./content-detail-4f1f5714.js"), "../addon/sow_community/views/content/components/select-member.vue": () => import("./select-member-7ac972e3.js"), "../addon/sow_community/views/content/components/treasure-select-popup.vue": () => import("./treasure-select-popup-a6c597e0.js"), "../addon/sow_community/views/content/edit.vue": () => import("./edit-24ca72c5.js"), "../addon/sow_community/views/content/list.vue": () => import("./list-e1e5a97c.js"), "../addon/sow_community/views/content/select_content.vue": () => import("./select_content-f7d861c3.js"), "../addon/sow_community/views/package/components/gift-balance.vue": () => import("./gift-balance-c8b46c0d.js"), "../addon/sow_community/views/package/components/gift-points.vue": () => import("./gift-points-0ad5dafe.js"), "../addon/sow_community/views/reward_rule/components/reward_rule-detail.vue": () => import("./reward_rule-detail-af927097.js"), "../addon/sow_community/views/reward_rule/edit.vue": () => import("./edit-4336ebc6.js"), "../addon/sow_community/views/reward_rule/list.vue": () => import("./list-d7499fbc.js"), "../addon/sow_community/views/sensitive/index.vue": () => import("./index-6a0ca7ec.js"), "../addon/sow_community/views/topic/components/topic-edit.vue": () => import("./topic-edit-655f2c08.js"), "../addon/sow_community/views/topic/list.vue": () => import("./list-cfd6a588.js"), "../addon/sow_community/views/treasure/components/goods-select-popup.vue": () => import("./goods-select-popup-1e5f04c8.js"), "../addon/sow_community/views/treasure/components/treasure-edit.vue": () => import("./treasure-edit-655f2c08.js"), "../addon/sow_community/views/treasure/list.vue": () => import("./list-2c7214bb.js"), "../addon/tourism/views/components/goods-day-member-price-popup.vue": () => import("./goods-day-member-price-popup-d94f8341.js"), "../addon/tourism/views/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6d3cb185.js"), "../addon/tourism/views/components/hotel-select-popup.vue": () => import("./hotel-select-popup-466f984e.js"), "../addon/tourism/views/components/tickets-select-popup.vue": () => import("./tickets-select-popup-1bd27185.js"), "../addon/tourism/views/components/travel-select-popup.vue": () => import("./travel-select-popup-7f7961ad.js"), "../addon/tourism/views/components/verifier.vue": () => import("./verifier-6a0ca7ec.js"), "../addon/tourism/views/diy/components/edit-tourism-hotel.vue": () => import("./edit-tourism-hotel-9ffb527f.js").then((r) => r._), "../addon/tourism/views/diy/components/edit-tourism-tickets.vue": () => import("./edit-tourism-tickets-9ffb527f.js").then((r) => r._), "../addon/tourism/views/diy/components/edit-tourism-travel.vue": () => import("./edit-tourism-travel-9ffb527f.js").then((r) => r._), "../addon/tourism/views/hotel/edit_hotel.vue": () => import("./edit_hotel-af5deb41.js"), "../addon/tourism/views/hotel/edit_room.vue": () => import("./edit_room-ed91e06e.js"), "../addon/tourism/views/hotel/list.vue": () => import("./list-9a3023c5.js"), "../addon/tourism/views/hotel/order.vue": () => import("./order-7ac972e3.js"), "../addon/tourism/views/hotel/order_detail.vue": () => import("./order_detail-6a0ca7ec.js"), "../addon/tourism/views/hotel/room.vue": () => import("./room-655f2c08.js"), "../addon/tourism/views/hotel/select_content.vue": () => import("./select_content-3bfd80a0.js"), "../addon/tourism/views/index.vue": () => import("./index-39017b54.js"), "../addon/tourism/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-6a0ca7ec.js"), "../addon/tourism/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-6a0ca7ec.js"), "../addon/tourism/views/poster/components/edit-tourism-goods-image.vue": () => import("./edit-tourism-goods-image-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/edit-tourism-goods-name.vue": () => import("./edit-tourism-goods-name-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/edit-tourism-goods-price.vue": () => import("./edit-tourism-goods-price-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-image.vue": () => import("./preview-tourism-goods-image-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-name.vue": () => import("./preview-tourism-goods-name-9ffb527f.js").then((r) => r._), "../addon/tourism/views/poster/components/preview-tourism-goods-price.vue": () => import("./preview-tourism-goods-price-9ffb527f.js").then((r) => r._), "../addon/tourism/views/refund.vue": () => import("./refund-655f2c08.js"), "../addon/tourism/views/scenic/edit_scenic.vue": () => import("./edit_scenic-a48f386f.js"), "../addon/tourism/views/scenic/edit_ticket.vue": () => import("./edit_ticket-655f2c08.js"), "../addon/tourism/views/scenic/list.vue": () => import("./list-a5e84786.js"), "../addon/tourism/views/scenic/order.vue": () => import("./order-24ca72c5.js"), "../addon/tourism/views/scenic/order_detail.vue": () => import("./order_detail-7ac972e3.js"), "../addon/tourism/views/scenic/select_content.vue": () => import("./select_content-0877ee01.js"), "../addon/tourism/views/scenic/ticket.vue": () => import("./ticket-655f2c08.js"), "../addon/tourism/views/setting.vue": () => import("./setting-655f2c08.js"), "../addon/tourism/views/site_index.vue": () => import("./site_index-dce8610c.js"), "../addon/tourism/views/verify.vue": () => import("./verify-655f2c08.js"), "../addon/tourism/views/way/edit.vue": () => import("./edit-84007781.js"), "../addon/tourism/views/way/list.vue": () => import("./list-bdf58dc3.js"), "../addon/tourism/views/way/order.vue": () => import("./order-655f2c08.js"), "../addon/tourism/views/way/order_detail.vue": () => import("./order_detail-655f2c08.js"), "../addon/tourism/views/way/select_content.vue": () => import("./select_content-8c74def9.js"), "../addon/vipcard/views/card/edit.vue": () => import("./edit-be62f8bb.js"), "../addon/vipcard/views/card/list.vue": () => import("./list-9b808d93.js"), "../addon/vipcard/views/card/record_info.vue": () => import("./record_info-655f2c08.js"), "../addon/vipcard/views/card/record_list.vue": () => import("./record_list-655f2c08.js"), "../addon/vipcard/views/card/select_content.vue": () => import("./select_content-0e497857.js"), "../addon/vipcard/views/components/card-goods-select.vue": () => import("./card-goods-select-655f2c08.js"), "../addon/vipcard/views/components/category-edit.vue": () => import("./category-edit-8c10629e.js"), "../addon/vipcard/views/components/goods-select-popup.vue": () => import("./goods-select-popup-3394345a.js"), "../addon/vipcard/views/components/record-info.vue": () => import("./record-info-655f2c08.js"), "../addon/vipcard/views/components/verifier.vue": () => import("./verifier-655f2c08.js"), "../addon/vipcard/views/diy/components/edit-vipcard-card.vue": () => import("./edit-vipcard-card-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": () => import("./edit-vipcard-reserve-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/diy/components/edit-vipcard-store.vue": () => import("./edit-vipcard-store-9ffb527f.js").then((r) => r._), "../addon/vipcard/views/index.vue": () => import("./index-41a07817.js"), "../addon/vipcard/views/order.vue": () => import("./order-8c10629e.js"), "../addon/vipcard/views/order_detail.vue": () => import("./order_detail-24ca72c5.js"), "../addon/vipcard/views/refund.vue": () => import("./refund-6a0ca7ec.js"), "../addon/vipcard/views/reserve/components/add-reserve.vue": () => import("./add-reserve-655f2c08.js"), "../addon/vipcard/views/reserve/components/reserve-detail.vue": () => import("./reserve-detail-655f2c08.js"), "../addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue": () => import("./vipcard-reserve-edit-655f2c08.js"), "../addon/vipcard/views/reserve/index.vue": () => import("./index-8516e1a7.js"), "../addon/vipcard/views/reserve/list.vue": () => import("./list-2f0d7313.js"), "../addon/vipcard/views/reserve/set.vue": () => import("./set-655f2c08.js"), "../addon/vipcard/views/service/category.vue": () => import("./category-1ad78c96.js"), "../addon/vipcard/views/service/edit.vue": () => import("./edit-1ad78c96.js"), "../addon/vipcard/views/service/list.vue": () => import("./list-3863697e.js"), "../addon/vipcard/views/service/record_info.vue": () => import("./record_info-6a0ca7ec.js"), "../addon/vipcard/views/service/record_list.vue": () => import("./record_list-6a0ca7ec.js"), "../addon/vipcard/views/service/select_content.vue": () => import("./select_content-e7dc06a4.js"), "../addon/vipcard/views/site_index.vue": () => import("./site_index-fb88e87e.js"), "../addon/vipcard/views/technician/components/add-technician.vue": () => import("./add-technician-655f2c08.js"), "../addon/vipcard/views/technician/detail.vue": () => import("./detail-42d345a7.js"), "../addon/vipcard/views/technician/list.vue": () => import("./list-484e4994.js"), "../addon/vipcard/views/verify.vue": () => import("./verify-6a0ca7ec.js") });
async function loadCoreVueModule(r) {
  const i = findCoreModuleLoader(r);
  if (i)
    return i();
  throw new Error(`Component not found: ${r}`);
}
const MainJS = "CLodopfuncs.js", URL_WS1 = ref("ws://localhost:{port}/" + MainJS), URL_WS2 = ref("ws://localhost:{port}/" + MainJS), URL_HTTP1 = ref("http://localhost:{port}/" + MainJS), URL_HTTP2 = ref("http://localhost:{port}/" + MainJS), URL_HTTP3 = ref("https://localhost.lodop.net:{port}/" + MainJS), CreatedOKLodopObject = ref(null), CLodopIsLocal = ref(null), LoadJsState = ref(""), initPort = (r) => {
  r || (r = {
    server_port1: 8e3,
    server_port2: 18e3,
    https_port: 8443
  }), URL_WS1.value = URL_WS1.value.replace("{port}", r.server_port1), URL_WS2.value = URL_WS2.value.replace("{port}", r.server_port2), URL_HTTP1.value = URL_HTTP1.value.replace("{port}", r.server_port1), URL_HTTP2.value = URL_HTTP2.value.replace("{port}", r.server_port2), URL_HTTP3.value = URL_HTTP2.value.replace("{port}", r.https_port);
}, needCLodop = () => {
  try {
    let r = navigator.userAgent;
    if (r.match(/Windows\sPhone/i) || r.match(/iPhone|iPod|iPad/i) || r.match(/Android/i) || r.match(/Edge\D?\d+/i))
      return !0;
    let i = r.match(/Trident\D?\d+/i), s = r.match(/MSIE\D?\d+/i), a = r.match(/OPR\D?\d+/i), c = r.match(/Firefox\D?\d+/i), d = r.match(/x64/i);
    if (!i && !s && d)
      return !0;
    if (c) {
      if (c = c[0].match(/\d+/), c[0] >= 41 || d)
        return !0;
    } else if (a) {
      if (a = a[0].match(/\d+/), a[0] >= 32)
        return !0;
    } else if (!i && !s) {
      let l = r.match(/Chrome\D?\d+/i);
      if (l && (l = l[0].match(/\d+/), l[0] >= 41))
        return !0;
    }
    return !1;
  } catch {
    return !0;
  }
};
function checkOrTryHttp() {
  if (window.getCLodop)
    return LoadJsState.value = "complete", !0;
  if (LoadJsState.value == "loadingB" || LoadJsState.value == "complete")
    return;
  LoadJsState.value = "loadingB";
  let r = document.head || document.getElementsByTagName("head")[0] || document.documentElement, i = document.createElement("script"), s = document.createElement("script"), a = document.createElement("script");
  i.src = URL_HTTP1.value, s.src = URL_HTTP2.value, a.src = URL_HTTP3.value, i.onload = s.onload = a.onload = s.onerror = a.onerror = function() {
    LoadJsState.value = "complete";
  }, i.onerror = function(c) {
    window.location.protocol !== "https:" ? r.insertBefore(s, r.firstChild) : r.insertBefore(a, r.firstChild);
  }, r.insertBefore(i, r.firstChild);
}
const loadCLodop = (paramas = null) => {
  if (needCLodop()) {
    initPort(paramas), CLodopIsLocal.value = !!(URL_WS1.value + URL_WS2.value).match(/\/\/localho|\/\/127.0.0./i), LoadJsState.value = "loadingA", !window.WebSocket && window.MozWebSocket && (window.WebSocket = window.MozWebSocket);
    try {
      let WSK1 = new WebSocket(URL_WS1.value);
      WSK1.onopen = function(r) {
        setTimeout(checkOrTryHttp, 200);
      }, WSK1.onmessage = function(e) {
        window.getCLodop || eval(e.data);
      }, WSK1.onerror = function(e) {
        let WSK2 = new WebSocket(URL_WS2.value);
        WSK2.onopen = function(r) {
          setTimeout(checkOrTryHttp, 200);
        }, WSK2.onmessage = function(e) {
          window.getCLodop || eval(e.data);
        }, WSK2.onerror = function(r) {
          checkOrTryHttp();
        };
      };
    } catch (r) {
      checkOrTryHttp();
    }
  }
}, getLodop = (r = null, i = null) => {
  let s = "<br>打印控件", a = s + "未安装!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行安装</a>", c = s + "需要升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>", d = "<br>Web打印服务CLodop未安装启动，点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载执行安装</a>", l = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_blank' class='text-primary'>点这里直接再次启动</a>）", p = "<br>Web打印服务CLodop需升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>", u = "<br>Web打印服务Lodop7", m = "点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载安装</a>(下载后解压，点击lodop文件开始执行)", v = u + "未安装启动，" + m, g = u + "需升级，" + m, f = "，成功后请刷新本页面或重启浏览器。", w;
  try {
    let h = /MSIE/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent), _ = /Linux/i.test(navigator.platform) && /x86/i.test(navigator.platform), y = /Linux/i.test(navigator.platform) && /aarch/i.test(navigator.platform);
    if (needCLodop() || _ || y) {
      try {
        w = window.getCLodop();
      } catch {
      }
      if (!w && LoadJsState.value !== "complete") {
        LoadJsState.value ? ElMessageBox.alert("网页还没下载完毕，请稍等一下再操作", "提示", { dangerouslyUseHTMLString: !0 }) : ElMessageBox.alert("未曾加载Lodop主JS文件，请先调用loadCLodop过程", "提示", { dangerouslyUseHTMLString: !0 });
        return;
      }
      let S;
      if (w)
        (_ || y) && w.CVERSION < "7.0.7.5" ? S = g : CLODOP.CVERSION < "6.5.9.8" && (S = p), S && ElMessageBox.alert(S + f, "提示", { dangerouslyUseHTMLString: !0 });
      else {
        _ || y ? S = v : S = d + (CLodopIsLocal.value ? l : ""), ElMessageBox.alert(S + f, "提示", { dangerouslyUseHTMLString: !0 });
        return;
      }
    } else {
      if (r || i ? h ? w = r : w = i : CreatedOKLodopObject.value ? w = CreatedOKLodopObject.value : (w = document.createElement("object"), w.setAttribute("width", 0), w.setAttribute("height", 0), w.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;"), h ? w.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA") : w.setAttribute("type", "application/x-print-lodop"), document.documentElement.appendChild(w), CreatedOKLodopObject.value = w), !w || !w.VERSION)
        return ElMessageBox.alert(a + f, "提示", { dangerouslyUseHTMLString: !0 }), w;
      w.VERSION < "6.2.2.6" && ElMessageBox.alert(c + f, "提示", { dangerouslyUseHTMLString: !0 });
    }
    return w;
  } catch (h) {
    ElMessage({
      message: "getLodop出错:" + h,
      type: "error",
      duration: 5e3
    });
  }
};
function getAliappConfig() {
  return request.get("aliapp/config");
}
function setAliappConfig(r) {
  return request.put("aliapp/config", r, { showSuccessMessage: !0 });
}
function getAliappStatic() {
  return request.get("aliapp/static");
}
function getAppConfig() {
  return request.get("channel/app/config");
}
function setAppConfig(r) {
  return request.put("channel/app/config", r, { showSuccessMessage: !0 });
}
function getVersionList$1(r) {
  return request.get("channel/app/version", { params: r });
}
function getVersionInfo$1(r) {
  return request.get(`channel/app/version/${r}`);
}
function getAppPlatform() {
  return request.get("channel/app/platfrom");
}
function addVersion$1(r) {
  return request.post("channel/app/version", r, { showSuccessMessage: !0 });
}
function editVersion$1(r) {
  return request.put(`channel/app/version/${r.id}`, r, { showSuccessMessage: !0 });
}
function deleteVersion$1(r) {
  return request.delete(`channel/app/version/${r.id}`);
}
function getBuildLog(r) {
  return request.get(`channel/app/build/log/${r}`);
}
function releaseVersion(r) {
  return request.put(`channel/app/version/${r}/release`, {}, { showSuccessMessage: !0 });
}
function generateSingCert(r) {
  return request.post("channel/app/generate_sing_cert", r, { showSuccessMessage: !0 });
}
const CLOUD_COMPILE_BASE_URL = location.protocol + "//go.site.niucloud.com";
function createCloudCompileRequest() {
  const r = axios$2.create({
    baseURL: CLOUD_COMPILE_BASE_URL,
    timeout: 0,
    headers: {
      lang: storage.get("lang") ?? "zh-cn"
    }
  });
  return r.interceptors.request.use(
    (i) => {
      const s = storage.get("token");
      return s && (i.headers.token = s), i;
    },
    (i) => Promise.reject(i)
  ), r.interceptors.response.use(
    (i) => i.data,
    (i) => Promise.reject(i)
  ), r;
}
const cloudCompileRequest = createCloudCompileRequest();
function cloudBuild() {
  return request.post("niucloud/build");
}
function getCloudBuildTask() {
  return request.get("niucloud/build");
}
function getCloudBuildLog() {
  return request.get("niucloud/build/log");
}
function clearCloudBuildTask() {
  return request.post("niucloud/build/clear", {}, { showErrorMessage: !1, showSuccessMessage: !1 });
}
function preBuildCheck() {
  return request.get("niucloud/build/check");
}
function getCloudBuildQueuePosition(r) {
  return cloudCompileRequest.get("/cloud/queue_position", { params: { task_id: r } });
}
function getCloudBuildSseUrl(r) {
  return `${CLOUD_COMPILE_BASE_URL}/cloud/sse?task_id=${r}`;
}
function getCloudCompileLocalUrl() {
  return request.get("niucloud/build/get_local_url");
}
function setCloudCompileLocalUrl(r) {
  return request.post("niucloud/build/set_local_url", { url: r });
}
function startServerDownload(r, i, s, a) {
  return request.post("niucloud/build/start_server_download", {
    task_id: r,
    download_url: i,
    authorize_code: s,
    timestamp: a
  });
}
function getSseBuildLog(r) {
  return request.get("niucloud/build/get_sse_build_log", { params: { task_id: r } });
}
function getDictList(r) {
  return request.get("dict/dict", { params: r });
}
function getDictInfo(r) {
  return request.get(`dict/dict/${r}`);
}
function addDict(r) {
  return request.post("dict/dict", r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function addDictData(r) {
  return request.put(`dict/dict/${r.id}`, r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editDict(r) {
  return request.put(`dict/dict/${r.id}`, r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function deleteDict(r) {
  return request.delete(`dict/dict/${r}`, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function setDictData(r, i) {
  return request.put(`dict/dictionary/${r}`, i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function getDictAll() {
  return request.get("dict/all");
}
function useDictionary(r) {
  return request.get(`dict/dictionary/type/${r}`);
}
function getDiyPageList(r) {
  return request.get("diy/diy", { params: r });
}
function getDiyPageListByCarouselSearch(r) {
  return request.get("diy/carousel_search", { params: r });
}
function getDiyList(r) {
  return request.get("diy/list", { params: r });
}
function getDiyPageInfo(r) {
  return request.get(`diy/diy/${r}`);
}
function addDiyPage(r) {
  return request.post("diy/diy", r, { showSuccessMessage: !0 });
}
function editDiyPage(r) {
  return request.put(`diy/diy/${r.id}`, r, { showSuccessMessage: !0 });
}
function setUseDiyPage(r) {
  return request.put(`diy/use/${r.id}`, r, { showSuccessMessage: !0 });
}
function editDiyPageShare(r) {
  return request.put("diy/diy/share", r, { showSuccessMessage: !0 });
}
function deleteDiyPage(r) {
  return request.delete(`diy/diy/${r}`, { showSuccessMessage: !0 });
}
function initPage$1(r) {
  return request.get("diy/init", { params: r });
}
function getLink(r) {
  return request.get("diy/link", { params: r });
}
function getDiyBottomList(r) {
  return request.get("diy/bottom", { params: r });
}
function getDiyBottomConfig(r) {
  return request.get("diy/bottom/config", { params: r });
}
function setDiyBottomConfig(r) {
  return request.post("diy/bottom", r, { showSuccessMessage: !0 });
}
function getDiyTemplate$1(r) {
  return request.get("diy/template", { params: r });
}
function getDiyTemplatePages$1(r) {
  return request.get("diy/template/pages", { params: r });
}
function getDiyRouteList(r) {
  return request.get("diy/route", { params: r });
}
function getDiyRouteAppList() {
  return request.get("diy/route/apps");
}
function getDiyRouteInfo(r) {
  return request.get("diy/route/info", { params: r });
}
function editDiyRouteShare(r) {
  return request.put("diy/route/share", r, { showSuccessMessage: !0 });
}
function getDecoratePage(r) {
  return request.get("diy/decorate", { params: r });
}
function changeTemplate(r) {
  return request.put("diy/change", r, { showSuccessMessage: !0 });
}
function getApps$1(r) {
  return request.get("diy/apps");
}
function copyDiy$1(r) {
  return request.post("diy/copy", r, { showSuccessMessage: !0 });
}
function getPageLink(r) {
  return request.get("diy/page_link", { params: r });
}
function getDefaultTheme(r) {
  return request.get("diy/theme/color", { params: r });
}
function getDiyTheme(r) {
  return request.get("diy/theme", { params: r });
}
function addTheme(r) {
  return request.post("diy/theme/add", r);
}
function editTheme(r) {
  return request.put(`diy/theme/edit/${r.id}`, r, { showSuccessMessage: !0 });
}
function deleteTheme(r) {
  return request.delete(`diy/theme/delete/${r}`, { showSuccessMessage: !0 });
}
function setDiyTheme(r) {
  return request.post("diy/theme", r, { showSuccessMessage: !0 });
}
function getDiyFormPageList(r) {
  return request.get("diy/form", { params: r });
}
function getDiyFormList(r) {
  return request.get("diy/form/list", { params: r });
}
function getDiyFormSelectPageList(r) {
  return request.get("diy/form/select", { params: r });
}
function getDiyFormInfo(r) {
  return request.get(`diy/form/${r}`);
}
function addDiyForm(r) {
  return request.post("diy/form", r, { showSuccessMessage: !0 });
}
function editDiyForm(r) {
  return request.put(`diy/form/${r.form_id}`, r, { showSuccessMessage: !0 });
}
function editDiyFormShare(r) {
  return request.put("diy/form/share", r, { showSuccessMessage: !0 });
}
function deleteDiyForm(r) {
  return request.put("diy/form/delete", r, { showSuccessMessage: !0 });
}
function initPage(r) {
  return request.get("diy/form/init", { params: r });
}
function getDiyFormQrcode(r) {
  return request.get("diy/form/qrcode", { params: r });
}
function getDiyFormFieldsList(r) {
  return request.get("diy/form/fields/list", { params: r });
}
function getDiyFormFieldStat(r) {
  return request.get("diy/form/records/field/stat", { params: r });
}
function getDiyTemplate(r) {
  return request.get("diy/template", { params: r });
}
function getDiyTemplatePages(r) {
  return request.get("diy/form/template", { params: r });
}
function editFormStatus(r) {
  return request.put("diy/form/status", r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getApps(r) {
  return request.get("diy/apps");
}
function copyDiy(r) {
  return request.post("diy/form/copy", r, { showSuccessMessage: !0 });
}
function getFormType(r) {
  return request.get("diy/form/type");
}
function getFormWriteConfig(r) {
  return request.get(`diy/form/write/${r}`);
}
function editDiyFormWriteConfig(r) {
  return request.put("diy/form/write", r, { showSuccessMessage: !0 });
}
function getFormSubmitConfig(r) {
  return request.get(`diy/form/submit/${r}`);
}
function editDiyFormSubmitConfig(r) {
  return request.put("diy/form/submit", r, { showSuccessMessage: !0 });
}
function getFormRecords(r) {
  return request.get("diy/form/records", { params: r });
}
function getFormRecordsInfo(r) {
  return request.get(`diy/form/records/${r}`);
}
function deleteFormRecords(r) {
  return request.put("diy/form/records/delete", r, { showSuccessMessage: !0 });
}
function getFormRecordsMember(r) {
  return request.get("diy/form/records/member/stat", { params: r });
}
function copyForm(r) {
  return request.post("diy/form/copy", r, { showSuccessMessage: !0 });
}
function getH5Config() {
  return request.get("channel/h5/config");
}
function setH5Config(r) {
  return request.put("channel/h5/config", r, { showSuccessMessage: !0 });
}
function getHomeSite(r) {
  return request.get("home/site", { params: r });
}
function getSiteGroup() {
  return request.get("home/site/group");
}
function createSite(r) {
  return request.post("home/site/create", r);
}
function getMemberList(r) {
  return request.get("member/member", { params: r });
}
function getMemberInfo(r) {
  return request.get(`member/member/${r}`);
}
function getMemberNo() {
  return request.get("member/memberno");
}
function addMember(r) {
  return request.post("member/member", r, { showSuccessMessage: !0 });
}
function getRegisterType(r) {
  return request.get("member/registertype", r);
}
function getRegisterChannelType(r) {
  return request.get("member/register/channel", r);
}
function deleteMember(r) {
  return request.delete(`member/member/${r}`, { showSuccessMessage: !0 });
}
function getMemberLabelList(r) {
  return request.get("member/label", { params: r });
}
function getMemberLabelInfo(r) {
  return request.get(`member/label/${r}`);
}
function addMemberLabel(r) {
  return request.post("member/label", r, { showSuccessMessage: !0 });
}
function updateMemberLabel(r) {
  return request.put(`member/label/${r.label_id}`, r, { showSuccessMessage: !0 });
}
function deleteMemberLabel(r) {
  return request.delete(`member/label/${r}`, { showSuccessMessage: !0 });
}
function getMemberLabelAll() {
  return request.get("member/label/all");
}
function editMemberDetail(r) {
  return request.put(`member/member/modify/${r.member_id}/${r.field}`, r, { showSuccessMessage: !0 });
}
function memberBatchModify(r) {
  return request.post("member/member/batch_modify", r, { showSuccessMessage: !0 });
}
function getChangeTypeList(r) {
  return request.get(`member/account/change_type/${r}`);
}
function getPointList(r) {
  return request.get("member/account/point", { params: r });
}
function getGrowthList(r) {
  return request.get("member/account/growth", { params: r });
}
function getBalanceList(r) {
  return request.get("member/account/balance", { params: r });
}
function getMoneyList(r) {
  return request.get("member/account/money", { params: r });
}
function getCommissionList(r) {
  return request.get("member/account/commission", { params: r });
}
function adjustPoint(r) {
  return request.post("member/account/point", r, { showSuccessMessage: !0 });
}
function adjustBalance(r) {
  return request.post("member/account/balance", r, { showSuccessMessage: !0 });
}
function getLoginConfig() {
  return request.get("member/config/login");
}
function setLoginConfig(r) {
  return request.post("member/config/login", r, { showSuccessMessage: !0 });
}
function getMemberConfig() {
  return request.get("member/config/member");
}
function setMemberConfig(r) {
  return request.post("member/config/member", r, { showSuccessMessage: !0 });
}
function setGrowthRuleConfig(r) {
  return request.post("member/config/growth_rule", r, { showSuccessMessage: !0 });
}
function getGrowthRuleConfig() {
  return request.get("member/config/growth_rule");
}
function setPointRuleConfig(r) {
  return request.post("member/config/point_rule", r, { showSuccessMessage: !0 });
}
function getPointRuleConfig() {
  return request.get("member/config/point_rule");
}
function getTransfertype() {
  return request.get("member/cash_out/transfertype");
}
function getCommissionSum(r) {
  return request.get("member/account/sum_commission", { params: r });
}
function getPointSum(r) {
  return request.get("member/account/sum_point", { params: r });
}
function getBalanceSum(r) {
  return request.get("member/account/sum_balance", { params: r });
}
function getBalanceStatus() {
  return request.get("member/account/type");
}
function getAccountType$2(r) {
  return request.get(`member/account/change_type/${r.account_type}`);
}
function getCashOutConfig() {
  return request.get("member/config/cash_out");
}
function setCashOutConfig(r) {
  return request.post("member/config/cash_out", r, { showSuccessMessage: !0 });
}
function getCashOutList(r) {
  return request.get("member/cash_out", { params: r });
}
function getCashOutDetail(r) {
  return request.get(`member/cash_out/${r}`, {});
}
function memberAudit(r) {
  return request.put(`member/cash_out/audit/${r.id}/${r.action}`, r, { showSuccessMessage: !0 });
}
function memberCancel(r) {
  return request.put(`member/cash_out/cancel/${r.id}`, r, {
    showSuccessMessage: !0,
    showErrorMessage: !0
  });
}
function memberTransfer(r) {
  return request.put(`member/cash_out/transfer/${r.id}`, r, { showSuccessMessage: !0 });
}
function memberRemark(r) {
  return request.put(`member/cash_out/remark/${r.id}`, r, { showSuccessMessage: !0 });
}
function memberCheck(r) {
  return request.put(`member/cash_out/check/${r}`, {}, { showSuccessMessage: !0 });
}
function editMemberStatus(r) {
  return request.put(`member/setstatus/${r.status}`, r, { showSuccessMessage: !0 });
}
function getCashOutStatusList() {
  return request.get("member/cash_out/status");
}
function getCashOutStat() {
  return request.get("member/cash_out/stat");
}
function getBenefitsDict() {
  return request.get("member/dict/benefits");
}
function getGiftDict() {
  return request.get("member/dict/gift");
}
function getGrowthRuleDict() {
  return request.get("member/dict/growth_rule");
}
function getPointRuleDict() {
  return request.get("member/dict/point_rule");
}
function getMemberLevelPageList(r) {
  return request.get("member/level", { params: r });
}
function getMemberLevelInfo(r) {
  return request.get(`member/level/${r}`);
}
function addMemberLevel(r) {
  return request.post("member/level", r, { showSuccessMessage: !0 });
}
function updateMemberLevel(r) {
  return request.put(`member/level/${r.level_id}`, r, { showSuccessMessage: !0 });
}
function deleteMemberLevel(r) {
  return request.delete(`member/level/${r}`, { showSuccessMessage: !0 });
}
function getMemberLevelAll() {
  return request.get("member/level/all");
}
function getMemberBenefitsContent() {
  return request.post("member/benefits/content");
}
function getMemberGiftsContent(r) {
  return request.post("member/gifts/content", r);
}
function getSignConfig() {
  return request.get("member/sign/config");
}
function setSignConfig(r) {
  return request.put("member/sign/config", r, { showSuccessMessage: !0 });
}
function getMemberSignList(r) {
  return request.get("member/sign", { params: r });
}
function getMemberAddress(r) {
  return request.get("member/address", { params: r });
}
function addMemberAddress(r) {
  return request.post("member/address", r);
}
function editMemberAddress(r) {
  return request.put("member/address", r);
}
function getNoticeList(r) {
  return request.get("notice/notice", { params: r });
}
function getNoticeLog(r) {
  return request.get("notice/log", { params: r });
}
function getBindInfo() {
  return request.get("notice/bind/info");
}
function cancelBind(r) {
  return request.post("notice/bind/cancel", r);
}
function getWechatAuthUrl() {
  return request.get("notice/bind/wechat");
}
function getWeappAuthUrl$1() {
  return request.get("notice/bind/weapp");
}
function sendSms(r) {
  return request.post("notice/bind/sms/send", r, { showSuccessMessage: !0 });
}
function bindSms(r) {
  return request.post("notice/bind/sms/bind", r, { showSuccessMessage: !0 });
}
function getNoticeInfo(r) {
  return request.get(`notice/notice/${r}`);
}
function editNoticeStatus(r) {
  return request.post("notice/notice/editstatus", r, { showSuccessMessage: !0 });
}
function editNotice(r) {
  return request.post("notice/notice/edit", r, { showSuccessMessage: !0 });
}
function getSmsList() {
  return request.get("notice/notice/sms");
}
function getSmsInfo(r) {
  return request.get(`notice/notice/sms/${r}`);
}
function editSms(r) {
  return request.put(`notice/notice/sms/${r.sms_type}`, r, { showSuccessMessage: !0 });
}
function getSmsLog(r) {
  return request.get("notice/sms/log", { params: r });
}
function getAccountIsLogin() {
  return request.get("notice/niusms/config");
}
function loginAccount(r) {
  return request.post("notice/niusms/account/login", r, { showSuccessMessage: !0 });
}
function registerAccount(r) {
  return request.post("notice/niusms/account/register", r, { showSuccessMessage: !0 });
}
function getAccountInfo$2(r) {
  return request.get(`notice/niusms/account/info/${r}`);
}
function getTemplateList$2(r) {
  return request.get(`notice/niusms/template/list/${r.sms_type}/${r.username}`, {});
}
function getSignList(r, i) {
  return request.get(`notice/niusms/sign/list/${r}`, { params: i });
}
function addSign(r, i) {
  return request.post(`notice/niusms/sign/report/${r}`, i, { showSuccessMessage: !0 });
}
function deleteSign(r, i) {
  return request.post(`notice/niusms/sign/delete/${r}`, i, { showSuccessMessage: !0 });
}
function editAccount(r, i) {
  return request.post(`notice/niusms/account/edit/${r}`, i, { showSuccessMessage: !0 });
}
function getSmsSendList(r, i) {
  return request.get(`notice/niusms/account/send_list/${r}`, { params: i });
}
function getSmsOrdersList(r, i) {
  return request.get(`notice/niusms/order/list/${r}`, { params: i });
}
function getSmsPackagesList() {
  return request.get("notice/niusms/packages");
}
function getSmsCaptcha() {
  return request.get("notice/niusms/captcha");
}
function getsiteCaptcha() {
  return request.get("site/captcha/create");
}
function getSmsSend(r) {
  return request.post("notice/niusms/send", r, { showSuccessMessage: !0 });
}
function getSmsSignConfig() {
  return request.get("notice/niusms/sign/report/config");
}
function getTemplateReportConfig() {
  return request.get("notice/niusms/template/report/config");
}
function reportTemplate(r, i, s) {
  return request.post(`notice/niusms/template/report/${r}/${i}`, s, { showSuccessMessage: !0 });
}
function getreportTemplateInfo(r, i, s) {
  return request.get(`notice/niusms/template/info/${r}/${i}`, { params: s });
}
function smsOrderCreate(r, i) {
  return request.post(`notice/niusms/order/create/${r}`, i);
}
function getOrderPayInfo(r, i) {
  return request.get(`notice/niusms/order/pay/${r}`, { params: i });
}
function getOrderInfo(r, i) {
  return request.get(`notice/niusms/order/info/${r}`, { params: i });
}
function getOrderPayStatus(r, i) {
  return request.get(`notice/niusms/order/status/${r}`, { params: i });
}
function calculateOrderPay(r, i) {
  return request.post(`notice/niusms/order/calculate/${r}`, i);
}
function enableNiusms(r) {
  return request.put("notice/niusms/enable", r, { showSuccessMessage: !0 });
}
function templateSync(r, i) {
  return request.get(`notice/niusms/template/sync/${r}/${i}`);
}
function resetPassword(r, i) {
  return request.post(`notice/niusms/account/reset/password/${r}`, i, { showSuccessMessage: !0 });
}
function clearTemplate(r, i) {
  return request.delete(`notice/niusms/template/${r}/${i}`);
}
function getAccountList$1(r) {
  return request.get("pay/account", { params: r });
}
function getAccountInfo$1(r) {
  return request.get(`pay/account/${r}`);
}
function getAccountStat$1() {
  return request.get("pay/account/stat");
}
function getAccountType$1() {
  return request.get("pay/account/type");
}
function getPayRefundPages(r) {
  return request.get("pay/refund", { params: r });
}
function getPayRefundInfo(r) {
  return request.get(`pay/refund/${r}`);
}
function getRefundStatus() {
  return request.get("pay/refund/status");
}
function getRefundType() {
  return request.get("pay/refund/type");
}
function getRefundTransfer(r) {
  return request.post("pay/refund/transfer", r, { showSuccessMessage: !0 });
}
function getAllPayType() {
  return request.get("pay/type/all");
}
function getPayList() {
  return request.get("pay/type/list");
}
function pay(r) {
  return request.post("pay", r);
}
function getFriendsPay(r, i, s) {
  return request.get(`pay/friendspay/info/${r}/${i}/${s}`, { showErrorMessage: !1 });
}
function getTransferScene() {
  return request.get("pay/transfer_scene");
}
function setSceneId(r) {
  return request.post(`pay/transfer_scene/set_scene_id/${r.scene}`, r, { showSuccessMessage: !0 });
}
function setTradeScene(r) {
  return request.post(`pay/transfer_scene/set_trade_scene/${r.type}`, r);
}
function getPcConfig() {
  return request.get("channel/pc/config");
}
function setPcConfig(r) {
  return request.put("channel/pc/config", r, { showSuccessMessage: !0 });
}
function getUserInfo$2() {
  return request.get("auth/get");
}
function setUserInfo(r) {
  return request.put("auth/edit", r, { showSuccessMessage: !0 });
}
function getPosterPageList(r) {
  return request.get("sys/poster", { params: r });
}
function getPosterList(r) {
  return request.get("sys/poster/list", { params: r });
}
function getPosterInfo(r) {
  return request.get(`sys/poster/${r}`);
}
function addPoster(r) {
  return request.post("sys/poster", r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editPoster(r) {
  return request.put(`sys/poster/${r.id}`, r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePoster(r) {
  return request.delete(`sys/poster/${r}`, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function modifyPosterStatus(r) {
  return request.put("sys/poster/status", r, { showSuccessMessage: !0 });
}
function modifyPosterDefault(r) {
  return request.put("sys/poster/default", r, { showSuccessMessage: !0 });
}
function getPosterType(r) {
  return request.get("sys/poster/type", { params: r });
}
function getPosterTemplate(r) {
  return request.get("sys/poster/template", { params: r });
}
function initPoster(r) {
  return request.get("sys/poster/init", { params: r });
}
function getPreviewPoster(r) {
  return request.get("sys/poster/preview", { params: r });
}
function getPosterGenerate(r) {
  return request.get("sys/poster/generate", { params: r, showErrorMessage: !1 });
}
function checkImagick() {
  return request.get("sys/check_imagick", { showErrorMessage: !1 });
}
function getPrinterPageList(r) {
  return request.get("sys/printer", { params: r });
}
function getPrinterList(r) {
  return request.get("sys/printer/list", { params: r });
}
function getPrinterInfo(r) {
  return request.get(`sys/printer/${r}`);
}
function addPrinter(r) {
  return request.post("sys/printer", r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editPrinter(r) {
  return request.put(`sys/printer/${r.printer_id}`, r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function modifyPrinterStatus(r) {
  return request.put("sys/printer/status", r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePrinter(r) {
  return request.delete(`sys/printer/${r}`, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getPrinterTemplatePageList(r) {
  return request.get("sys/printer/template", { params: r });
}
function getPrinterTemplateList(r) {
  return request.get("sys/printer/template/list", { params: r });
}
function getPrinterTemplateInfo(r) {
  return request.get(`sys/printer/template/${r}`);
}
function addPrinterTemplate(r) {
  return request.post("sys/printer/template", r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function editPrinterTemplate(r) {
  return request.put(`sys/printer/template/${r.template_id}`, r, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePrinterTemplate(r) {
  return request.delete(`sys/printer/template/${r}`, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getPrinterType(r) {
  return request.get("sys/printer/type", { params: r });
}
function getPrinterBrand(r) {
  return request.get("sys/printer/brand", { params: r });
}
function refreshPrinterToken(r) {
  return request.put(`sys/printer/refreshtoken/${r}`, {}, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function testPrint(r) {
  return request.put(`sys/printer/testprint/${r}`, {}, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function printTicket(r) {
  return request.post("sys/printer/printticket", r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function getSiteList(r) {
  return request.get("site/site", { params: r });
}
function getSiteInfo(r) {
  return request.get(`site/site/${r}`);
}
function addSite(r) {
  return request.post("site/site", r, { showSuccessMessage: !0 });
}
function editSite(r) {
  return request.put(`site/site/${r.site_id}`, r, { showSuccessMessage: !0 });
}
function deleteSite(r) {
  return request.delete(`site/site/${r.site_id}?captcha_code=${r.captcha_code}&captcha_key=${r.captcha_key}`);
}
function closeSite(r) {
  return request.put(`site/closesite/${r.site_id}`, r, { showSuccessMessage: !0 });
}
function initSite(r) {
  return request.post("site/init", r, { showSuccessMessage: !0 });
}
function openSite(r) {
  return request.put(`site/opensite/${r.site_id}`, r, { showSuccessMessage: !0 });
}
function getStatusList() {
  return request.get("site/statuslist");
}
function getSiteAllowChange() {
  return request.get("site/allow_change");
}
function putSiteAllowChange(r) {
  return request.put("site/allow_change", r, { showSuccessMessage: !0 });
}
function getSiteGroupList(r) {
  return request.get("site/group", { params: r });
}
function getSiteGroupInfo(r) {
  return request.get(`site/group/${r}`);
}
function addSiteGroup(r) {
  return request.post("site/group", r, { showSuccessMessage: !0 });
}
function editSiteGroup(r) {
  return request.put(`site/group/${r.group_id}`, r, { showSuccessMessage: !0 });
}
function deleteSiteGroup(r) {
  return request.delete(`site/group/${r}`, { showSuccessMessage: !0 });
}
function getSiteGroupAll() {
  return request.get("site/group/all");
}
function getUserSiteGroupAll(r = {}) {
  return request.get("site/group/user", { params: r });
}
function getUserList$1(r) {
  return request.get("site/user", { params: r });
}
function getUserInfo$1(r) {
  return request.get(`site/user/${r}`);
}
function addUser$1(r) {
  return request.post("site/user", r, { showSuccessMessage: !0 });
}
function editUser$1(r) {
  return request.put(`site/user/${r.uid}`, r, { showSuccessMessage: !0 });
}
function lockUser(r) {
  return request.put(`site/user/lock/${r}`);
}
function unlockUser(r) {
  return request.put(`site/user/unlock/${r}`);
}
function deleteUser$1(r) {
  return request.delete(`site/user/${r}`);
}
function getLogList(r) {
  return request.get("site/log", { params: r });
}
function getLogInfo(r) {
  return request.get(`site/log/${r}`);
}
function logDestroy() {
  return request.delete("site/log/destroy");
}
function getAccountList(r) {
  return request.get("site/account", { params: r });
}
function getAccountInfo(r) {
  return request.get(`site/account/${r}`);
}
function getAccountStat() {
  return request.get("site/account/stat");
}
function getAccountType() {
  return request.get("site/account/type");
}
function getSiteAddons() {
  return request.get("site/addons");
}
function getShowApp() {
  return request.get("site/showCustomer");
}
function getShowSpecialMenu() {
  return request.get("site/special_menu");
}
function getStatInfo() {
  return request.get("stat/index");
}
function getSiteStatInfo() {
  return request.get("stat/siteindex");
}
function getAddonDevelop(r) {
  return request.get("addon_develop", { params: r });
}
function getAddontype() {
  return request.get("addontype");
}
function getAddonDevelopInfo(r) {
  return request.get(`addon_develop/${r}`);
}
function getAddonDevelopCheck(r) {
  return request.get(`addon_develop/check/${r}`);
}
function getAddonKeyBlackList() {
  return request.get("addon_develop/key/blacklist");
}
function addAddonDevelop(r, i) {
  return request.post(`addon_develop/${r}`, i);
}
function editAddonDevelop(r, i) {
  return request.put(`addon_develop/${r}`, i);
}
function deleteAddonDevelop(r) {
  return request.delete(`addon_develop/${r}`, { showSuccessMessage: !0 });
}
function addonDevelopBuild(r) {
  return request.post(`addon_develop/build/${r}`);
}
function addonDevelopDownload(r) {
  return request.post(`addon_develop/download/${r}`, {});
}
function getGenerateTableList(r) {
  return request.get("generator/generator", { params: r });
}
function getGenerateTableInfo(r) {
  return request.get(`generator/generator/${r}`);
}
function addGenerateTable(r) {
  return request.post("generator/generator", r, { showSuccessMessage: !0 });
}
function editGenerateTable(r) {
  return request.put(`generator/generator/${r.id}`, r, { showSuccessMessage: !0 });
}
function deleteGenerateTable(r) {
  return request.delete(`generator/generator/${r}`, { showSuccessMessage: !0 });
}
function generateCreate(r) {
  return request.post("generator/download", r);
}
function generatePreview(r) {
  return request.get(`generator/preview/${r}`);
}
function generateTable() {
  return request.get("generator/table");
}
function getSystem() {
  return request.get("sys/system");
}
function getGeneratorAllModel(r) {
  return request.get("generator/all_model", { params: r });
}
function getGeneratorTableColumn(r) {
  return request.get("generator/table_column", { params: r });
}
function generatorCheckFile(r) {
  return request.get("generator/check_file", { params: r });
}
function getGeneratorModelTableColumn(r) {
  return request.get("generator/model_table_column", { params: r });
}
function getUpgradeContent(r = "") {
  return request.get(r ? `upgrade/${r}` : "upgrade");
}
function getUpgradeTask() {
  return request.get("upgrade/task");
}
function upgradeAddon(r = "", i = {}) {
  return request.post(r ? `upgrade/${r}` : "upgrade", i);
}
function executeUpgrade() {
  return request.post("upgrade/execute", {}, { showErrorMessage: !1 });
}
function preUpgradeCheck(r = "") {
  return request.get(r ? `upgrade/check/${r}` : "upgrade/check");
}
function clearUpgradeTask() {
  return request.post("upgrade/clear");
}
function upgradeUserOperate(r) {
  return request.post(`upgrade/operate/${r}`);
}
function getUpgradeRecords(r) {
  return request.get("upgrade/records", { params: r });
}
function delUpgradeRecords(r) {
  return request.delete("upgrade/records", { params: r });
}
function getBackupRecords(r) {
  return request.get("backup/records", { params: r });
}
function modifyBackupRemark(r) {
  return request.put("backup/remark", r, { showSuccessMessage: !0 });
}
function checkDirExist(r) {
  return request.post("backup/check_dir", r);
}
function checkPermission(r) {
  return request.post("backup/check_permission", r);
}
function restoreUpgradeBackup(r) {
  return request.post("backup/restore", r);
}
function deleteRecords(r) {
  return request.post("backup/delete", r, { showSuccessMessage: !0 });
}
function manualBackup(r) {
  return request.post("backup/manual", r);
}
function performRecoveryTasks(r) {
  return request.get("backup/restore_task", r);
}
function performBackupTasks(r) {
  return request.get("backup/task", r);
}
function connectTest(r) {
  return request.post("niucloud/build/connect_test", r);
}
function setLocalUrl(r) {
  return request.post("niucloud/build/set_local_url", r);
}
function getLocalUrl(r) {
  return request.get("niucloud/build/get_local_url", r);
}
function getUserList(r) {
  return request.get("user/user", { params: r });
}
function getUserInfo(r) {
  return request.get(`user/user/${r}`);
}
function addUser(r) {
  return request.post("user/user", r, { showSuccessMessage: !0 });
}
function deleteUser(r) {
  return request.delete(`user/user/${r}`, { showSuccessMessage: !0 });
}
function editUser(r) {
  return request.put(`user/user/${r.uid}`, r, { showSuccessMessage: !0 });
}
function getAllUserList(r) {
  return request.get("user/user_all", { params: r });
}
function getUserListSelect(r) {
  return request.get("user/user_select", { params: r });
}
function checkUsernameIsExist(r) {
  return request.get("user/isexist", { params: { username: r } });
}
function getUserCreateSiteLimit(r) {
  return request.get(`user/user/create_site_limit/${r}`);
}
function getUserCreateSiteLimitInfo(r) {
  return request.get(`user/user/create_site_limit/info/${r}`);
}
function addUserCreateSiteLimit(r) {
  return request.post("user/user/create_site_limit", r, { showSuccessMessage: !0 });
}
function editUserCreateSiteLimit(r) {
  return request.put(`user/user/create_site_limit/${r.id}`, r, { showSuccessMessage: !0 });
}
function delUserCreateSiteLimit(r) {
  return request.delete(`user/user/create_site_limit/${r}`, { showSuccessMessage: !0 });
}
function getVerifyRecord(r) {
  return request.get("verify/verify/record", { params: r });
}
function getVerifyDetail(r) {
  return request.get(`verify/verify/${r}`);
}
function getVerifyDetailInfo(r) {
  return request.get(`verify/detail/${r}`);
}
function verify(r, i) {
  return request.post(`verify/verify/${r}`, i, { showSuccessMessage: !0 });
}
function getVerifierList(r) {
  return request.get("verify/verifier", { params: r });
}
function getVerifierSelect() {
  return request.get("verify/verifier/select");
}
function getVerifyTypeList() {
  return request.get("verify/verifier/type");
}
function addVerifier(r) {
  return request.post("verify/verifier", r, { showSuccessMessage: !0 });
}
function deleteVerifier(r) {
  return request.delete(`verify/verifier/${r}`, { showSuccessMessage: !0 });
}
function getVerifyInfo(r) {
  return request.get(`verify/verifier/${r}`);
}
function editVerifier(r) {
  return request.post(`verify/verifier/${r.id}`, r, { showSuccessMessage: !0 });
}
function getWeappConfig() {
  return request.get("weapp/config");
}
function getWeappAuthUrl() {
  return request.get("weapp/auth_url");
}
function setWeappConfig(r) {
  return request.put("weapp/config", r, { showSuccessMessage: !0 });
}
function getTemplateList$1() {
  return request.get("weapp/template");
}
function getBatchAcquisition$1(r) {
  return request.put("weapp/template/sync", r, { showSuccessMessage: !0 });
}
function setWeappVersion(r) {
  return request.post("weapp/version", r, { showSuccessMessage: !0 });
}
function getWeappPreview() {
  return request.get("weapp/preview");
}
function getWeappVersionList(r) {
  return request.get("weapp/version", { params: r });
}
function getWeappUploadLog(r) {
  return request.get(`weapp/upload/${r}`);
}
function fetchWeappUploadLog(r) {
  return request.get(`weapp/upload_log/${r}`);
}
function uploadVersion(r) {
  return request.put("applet/upload", r, { showSuccessMessage: !0 });
}
function addVersion(r) {
  return request.post("applet/version", r, { showSuccessMessage: !0 });
}
function getVersionList(r) {
  return request.get("applet/version", { params: r });
}
function getVersionInfo(r) {
  return request.get(`applet/version/${r}`);
}
function editVersion(r) {
  return request.put(`applet/version/${r.id}`, r, { showSuccessMessage: !0 });
}
function deleteVersion(r) {
  return request.delete(`applet/version/${r}`);
}
function getIsTradeManaged() {
  return request.get("weapp/delivery/getIsTradeManaged");
}
function setWeappDomain(r) {
  return request.put("weapp/domain", r, { showSuccessMessage: !0 });
}
function setWeappPrivacySetting(r) {
  return request.put("weapp/privacysetting", r, { showSuccessMessage: !0 });
}
function getWeappPrivacySetting() {
  return request.get("weapp/privacysetting");
}
function getWechatConfig() {
  return request.get("wechat/config");
}
function getWechatStatic() {
  return request.get("wechat/static");
}
function editWechatConfig(r) {
  return request.put("wechat/config", r, { showSuccessMessage: !0 });
}
function getWechatMenu() {
  return request.get("wechat/menu");
}
function editWechatMenu(r) {
  return request.put("wechat/menu", r, { showSuccessMessage: !0 });
}
function getTemplateList() {
  return request.get("wechat/template");
}
function getBatchAcquisition(r) {
  return request.put("wechat/template/sync", r, { showSuccessMessage: !0 });
}
function getKeywordsReplyList(r) {
  return request.get("wechat/reply/keywords", { params: r });
}
function editKeywordsReply(r) {
  return request.put(`wechat/reply/keywords/${r.id}`, r, { showSuccessMessage: !0 });
}
function addKeywordsReply(r) {
  return request.post("wechat/reply/keywords", r, { showSuccessMessage: !0 });
}
function getKeywordsReplyInfo(r) {
  return request.get(`wechat/reply/keywords/${r}`);
}
function delKeywordsReply(r) {
  return request.delete(`wechat/reply/keywords/${r}`, { showSuccessMessage: !0 });
}
function getDefaultReply() {
  return request.get("wechat/reply/default");
}
function setDefaultReply(r) {
  return request.put("wechat/reply/default", r, { showSuccessMessage: !0 });
}
function getSubscribeReply() {
  return request.get("wechat/reply/subscribe");
}
function setSubscribeReply(r) {
  return request.put("wechat/reply/subscribe", r, { showSuccessMessage: !0 });
}
function getMediaList(r) {
  return request.get("wechat/media", { params: r });
}
function syncNews() {
  return request.get("wechat/sync/news");
}
function getConfig() {
  return request.get("wxoplatform/config");
}
function getStatic() {
  return request.get("wxoplatform/static");
}
function editConfig(r) {
  return request.put("wxoplatform/config", r, { showSuccessMessage: !0 });
}
function getAuthorizationUrl() {
  return request.get("wxoplatform/authorizationUrl");
}
function getAuthorizationResult(r) {
  return request.get("wxoplatform/authorization", { params: r, showErrorMessage: !1 });
}
function weappCommit(r) {
  return request.post("wxoplatform/weapp/version/commit", r, { showSuccessMessage: !0 });
}
function getWeappCommitRecord(r) {
  return request.get("wxoplatform/weapp/commit", { params: r });
}
function getWeappLastCommitRecord() {
  return request.get("wxoplatform/weapp/commit/last");
}
function delVersion(r) {
  return request.delete(`wxoplatform/weapp/version/${r}`);
}
function siteWeappCommit() {
  return request.post("wxoplatform/site/weapp/commit", {}, { showSuccessMessage: !0 });
}
function getSiteGroupCommitRecord(r) {
  return request.get("wxoplatform/sitegroup/commit", { params: r });
}
function undoAudit(r) {
  return request.put("wxoplatform/undo/weappaudit", r, { showSuccessMessage: !0 });
}
function syncSiteWeapp(r) {
  return request.post("wxoplatform/async/siteweapp", r, { showSuccessMessage: !0 });
}
function getAuthRecord(r) {
  return request.get("wxoplatform/authorization/record", { params: r });
}
function cancelAuthorization(r) {
  return request.post("wxoplatform/authorization/cancel", r, { showSuccessMessage: !0 });
}
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(r, i) {
  var s = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(r);
    i && (a = a.filter(function(c) {
      return Object.getOwnPropertyDescriptor(r, c).enumerable;
    })), s.push.apply(s, a);
  }
  return s;
}
function _objectSpread2(r) {
  for (var i = 1; i < arguments.length; i++) {
    var s = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(s), !0).forEach(function(a) {
      _defineProperty(r, a, s[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(s)) : ownKeys(Object(s)).forEach(function(a) {
      Object.defineProperty(r, a, Object.getOwnPropertyDescriptor(s, a));
    });
  }
  return r;
}
function _typeof(r) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(i) {
    return typeof i;
  } : _typeof = function(i) {
    return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
  }, _typeof(r);
}
function _defineProperty(r, i, s) {
  return i in r ? Object.defineProperty(r, i, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[i] = s, r;
}
function _extends() {
  return _extends = Object.assign || function(r) {
    for (var i = 1; i < arguments.length; i++) {
      var s = arguments[i];
      for (var a in s)
        Object.prototype.hasOwnProperty.call(s, a) && (r[a] = s[a]);
    }
    return r;
  }, _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(r, i) {
  if (r == null)
    return {};
  var s = {}, a = Object.keys(r), c, d;
  for (d = 0; d < a.length; d++)
    c = a[d], !(i.indexOf(c) >= 0) && (s[c] = r[c]);
  return s;
}
function _objectWithoutProperties(r, i) {
  if (r == null)
    return {};
  var s = _objectWithoutPropertiesLoose(r, i), a, c;
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(r);
    for (c = 0; c < d.length; c++)
      a = d[c], !(i.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(r, a) && (s[a] = r[a]);
  }
  return s;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r))
    return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null)
    return Array.from(r);
}
function _unsupportedIterableToArray(r, i) {
  if (r) {
    if (typeof r == "string")
      return _arrayLikeToArray(r, i);
    var s = Object.prototype.toString.call(r).slice(8, -1);
    if (s === "Object" && r.constructor && (s = r.constructor.name), s === "Map" || s === "Set")
      return Array.from(r);
    if (s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
      return _arrayLikeToArray(r, i);
  }
}
function _arrayLikeToArray(r, i) {
  (i == null || i > r.length) && (i = r.length);
  for (var s = 0, a = new Array(i); s < i; s++)
    a[s] = r[s];
  return a;
}
function _nonIterableSpread() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var version$1 = "1.15.0";
function userAgent(r) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(r);
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Edge = userAgent(/Edge/i), FireFox = userAgent(/firefox/i), Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i), IOS = userAgent(/iP(ad|od|hone)/i), ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i), captureMode = {
  capture: !1,
  passive: !1
};
function on(r, i, s) {
  r.addEventListener(i, s, !IE11OrLess && captureMode);
}
function off(r, i, s) {
  r.removeEventListener(i, s, !IE11OrLess && captureMode);
}
function matches(r, i) {
  if (i) {
    if (i[0] === ">" && (i = i.substring(1)), r)
      try {
        if (r.matches)
          return r.matches(i);
        if (r.msMatchesSelector)
          return r.msMatchesSelector(i);
        if (r.webkitMatchesSelector)
          return r.webkitMatchesSelector(i);
      } catch {
        return !1;
      }
    return !1;
  }
}
function getParentOrHost(r) {
  return r.host && r !== document && r.host.nodeType ? r.host : r.parentNode;
}
function closest(r, i, s, a) {
  if (r) {
    s = s || document;
    do {
      if (i != null && (i[0] === ">" ? r.parentNode === s && matches(r, i) : matches(r, i)) || a && r === s)
        return r;
      if (r === s)
        break;
    } while (r = getParentOrHost(r));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(r, i, s) {
  if (r && i)
    if (r.classList)
      r.classList[s ? "add" : "remove"](i);
    else {
      var a = (" " + r.className + " ").replace(R_SPACE, " ").replace(" " + i + " ", " ");
      r.className = (a + (s ? " " + i : "")).replace(R_SPACE, " ");
    }
}
function css(r, i, s) {
  var a = r && r.style;
  if (a) {
    if (s === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? s = document.defaultView.getComputedStyle(r, "") : r.currentStyle && (s = r.currentStyle), i === void 0 ? s : s[i];
    !(i in a) && i.indexOf("webkit") === -1 && (i = "-webkit-" + i), a[i] = s + (typeof s == "string" ? "" : "px");
  }
}
function matrix(r, i) {
  var s = "";
  if (typeof r == "string")
    s = r;
  else
    do {
      var a = css(r, "transform");
      a && a !== "none" && (s = a + " " + s);
    } while (!i && (r = r.parentNode));
  var c = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return c && new c(s);
}
function find(r, i, s) {
  if (r) {
    var a = r.getElementsByTagName(i), c = 0, d = a.length;
    if (s)
      for (; c < d; c++)
        s(a[c], c);
    return a;
  }
  return [];
}
function getWindowScrollingElement() {
  var r = document.scrollingElement;
  return r || document.documentElement;
}
function getRect(r, i, s, a, c) {
  if (!(!r.getBoundingClientRect && r !== window)) {
    var d, l, p, u, m, v, g;
    if (r !== window && r.parentNode && r !== getWindowScrollingElement() ? (d = r.getBoundingClientRect(), l = d.top, p = d.left, u = d.bottom, m = d.right, v = d.height, g = d.width) : (l = 0, p = 0, u = window.innerHeight, m = window.innerWidth, v = window.innerHeight, g = window.innerWidth), (i || s) && r !== window && (c = c || r.parentNode, !IE11OrLess))
      do
        if (c && c.getBoundingClientRect && (css(c, "transform") !== "none" || s && css(c, "position") !== "static")) {
          var f = c.getBoundingClientRect();
          l -= f.top + parseInt(css(c, "border-top-width")), p -= f.left + parseInt(css(c, "border-left-width")), u = l + d.height, m = p + d.width;
          break;
        }
      while (c = c.parentNode);
    if (a && r !== window) {
      var w = matrix(c || r), h = w && w.a, _ = w && w.d;
      w && (l /= _, p /= h, g /= h, v /= _, u = l + v, m = p + g);
    }
    return {
      top: l,
      left: p,
      bottom: u,
      right: m,
      width: g,
      height: v
    };
  }
}
function isScrolledPast(r, i, s) {
  for (var a = getParentAutoScrollElement(r, !0), c = getRect(r)[i]; a; ) {
    var d = getRect(a)[s], l = void 0;
    if (s === "top" || s === "left" ? l = c >= d : l = c <= d, !l)
      return a;
    if (a === getWindowScrollingElement())
      break;
    a = getParentAutoScrollElement(a, !1);
  }
  return !1;
}
function getChild(r, i, s, a) {
  for (var c = 0, d = 0, l = r.children; d < l.length; ) {
    if (l[d].style.display !== "none" && l[d] !== Sortable.ghost && (a || l[d] !== Sortable.dragged) && closest(l[d], s.draggable, r, !1)) {
      if (c === i)
        return l[d];
      c++;
    }
    d++;
  }
  return null;
}
function lastChild(r, i) {
  for (var s = r.lastElementChild; s && (s === Sortable.ghost || css(s, "display") === "none" || i && !matches(s, i)); )
    s = s.previousElementSibling;
  return s || null;
}
function index$7(r, i) {
  var s = 0;
  if (!r || !r.parentNode)
    return -1;
  for (; r = r.previousElementSibling; )
    r.nodeName.toUpperCase() !== "TEMPLATE" && r !== Sortable.clone && (!i || matches(r, i)) && s++;
  return s;
}
function getRelativeScrollOffset(r) {
  var i = 0, s = 0, a = getWindowScrollingElement();
  if (r)
    do {
      var c = matrix(r), d = c.a, l = c.d;
      i += r.scrollLeft * d, s += r.scrollTop * l;
    } while (r !== a && (r = r.parentNode));
  return [i, s];
}
function indexOfObject(r, i) {
  for (var s in r)
    if (r.hasOwnProperty(s)) {
      for (var a in i)
        if (i.hasOwnProperty(a) && i[a] === r[s][a])
          return Number(s);
    }
  return -1;
}
function getParentAutoScrollElement(r, i) {
  if (!r || !r.getBoundingClientRect)
    return getWindowScrollingElement();
  var s = r, a = !1;
  do
    if (s.clientWidth < s.scrollWidth || s.clientHeight < s.scrollHeight) {
      var c = css(s);
      if (s.clientWidth < s.scrollWidth && (c.overflowX == "auto" || c.overflowX == "scroll") || s.clientHeight < s.scrollHeight && (c.overflowY == "auto" || c.overflowY == "scroll")) {
        if (!s.getBoundingClientRect || s === document.body)
          return getWindowScrollingElement();
        if (a || i)
          return s;
        a = !0;
      }
    }
  while (s = s.parentNode);
  return getWindowScrollingElement();
}
function extend(r, i) {
  if (r && i)
    for (var s in i)
      i.hasOwnProperty(s) && (r[s] = i[s]);
  return r;
}
function isRectEqual(r, i) {
  return Math.round(r.top) === Math.round(i.top) && Math.round(r.left) === Math.round(i.left) && Math.round(r.height) === Math.round(i.height) && Math.round(r.width) === Math.round(i.width);
}
var _throttleTimeout;
function throttle(r, i) {
  return function() {
    if (!_throttleTimeout) {
      var s = arguments, a = this;
      s.length === 1 ? r.call(a, s[0]) : r.apply(a, s), _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, i);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout), _throttleTimeout = void 0;
}
function scrollBy(r, i, s) {
  r.scrollLeft += i, r.scrollTop += s;
}
function clone(r) {
  var i = window.Polymer, s = window.jQuery || window.Zepto;
  return i && i.dom ? i.dom(r).cloneNode(!0) : s ? s(r).clone(!0)[0] : r.cloneNode(!0);
}
function setRect(r, i) {
  css(r, "position", "absolute"), css(r, "top", i.top), css(r, "left", i.left), css(r, "width", i.width), css(r, "height", i.height);
}
function unsetRect(r) {
  css(r, "position", ""), css(r, "top", ""), css(r, "left", ""), css(r, "width", ""), css(r, "height", "");
}
var expando = "Sortable" + new Date().getTime();
function AnimationStateManager() {
  var r = [], i;
  return {
    captureAnimationState: function() {
      if (r = [], !!this.options.animation) {
        var a = [].slice.call(this.el.children);
        a.forEach(function(c) {
          if (!(css(c, "display") === "none" || c === Sortable.ghost)) {
            r.push({
              target: c,
              rect: getRect(c)
            });
            var d = _objectSpread2({}, r[r.length - 1].rect);
            if (c.thisAnimationDuration) {
              var l = matrix(c, !0);
              l && (d.top -= l.f, d.left -= l.e);
            }
            c.fromRect = d;
          }
        });
      }
    },
    addAnimationState: function(a) {
      r.push(a);
    },
    removeAnimationState: function(a) {
      r.splice(indexOfObject(r, {
        target: a
      }), 1);
    },
    animateAll: function(a) {
      var c = this;
      if (!this.options.animation) {
        clearTimeout(i), typeof a == "function" && a();
        return;
      }
      var d = !1, l = 0;
      r.forEach(function(p) {
        var u = 0, m = p.target, v = m.fromRect, g = getRect(m), f = m.prevFromRect, w = m.prevToRect, h = p.rect, _ = matrix(m, !0);
        _ && (g.top -= _.f, g.left -= _.e), m.toRect = g, m.thisAnimationDuration && isRectEqual(f, g) && !isRectEqual(v, g) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - g.top) / (h.left - g.left) === (v.top - g.top) / (v.left - g.left) && (u = calculateRealTime(h, f, w, c.options)), isRectEqual(g, v) || (m.prevFromRect = v, m.prevToRect = g, u || (u = c.options.animation), c.animate(m, h, g, u)), u && (d = !0, l = Math.max(l, u), clearTimeout(m.animationResetTimer), m.animationResetTimer = setTimeout(function() {
          m.animationTime = 0, m.prevFromRect = null, m.fromRect = null, m.prevToRect = null, m.thisAnimationDuration = null;
        }, u), m.thisAnimationDuration = u);
      }), clearTimeout(i), d ? i = setTimeout(function() {
        typeof a == "function" && a();
      }, l) : typeof a == "function" && a(), r = [];
    },
    animate: function(a, c, d, l) {
      if (l) {
        css(a, "transition", ""), css(a, "transform", "");
        var p = matrix(this.el), u = p && p.a, m = p && p.d, v = (c.left - d.left) / (u || 1), g = (c.top - d.top) / (m || 1);
        a.animatingX = !!v, a.animatingY = !!g, css(a, "transform", "translate3d(" + v + "px," + g + "px,0)"), this.forRepaintDummy = repaint(a), css(a, "transition", "transform " + l + "ms" + (this.options.easing ? " " + this.options.easing : "")), css(a, "transform", "translate3d(0,0,0)"), typeof a.animated == "number" && clearTimeout(a.animated), a.animated = setTimeout(function() {
          css(a, "transition", ""), css(a, "transform", ""), a.animated = !1, a.animatingX = !1, a.animatingY = !1;
        }, l);
      }
    }
  };
}
function repaint(r) {
  return r.offsetWidth;
}
function calculateRealTime(r, i, s, a) {
  return Math.sqrt(Math.pow(i.top - r.top, 2) + Math.pow(i.left - r.left, 2)) / Math.sqrt(Math.pow(i.top - s.top, 2) + Math.pow(i.left - s.left, 2)) * a.animation;
}
var plugins = [], defaults = {
  initializeByDefault: !0
}, PluginManager = {
  mount: function r(i) {
    for (var s in defaults)
      defaults.hasOwnProperty(s) && !(s in i) && (i[s] = defaults[s]);
    plugins.forEach(function(a) {
      if (a.pluginName === i.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(i.pluginName, " more than once");
    }), plugins.push(i);
  },
  pluginEvent: function r(i, s, a) {
    var c = this;
    this.eventCanceled = !1, a.cancel = function() {
      c.eventCanceled = !0;
    };
    var d = i + "Global";
    plugins.forEach(function(l) {
      s[l.pluginName] && (s[l.pluginName][d] && s[l.pluginName][d](_objectSpread2({
        sortable: s
      }, a)), s.options[l.pluginName] && s[l.pluginName][i] && s[l.pluginName][i](_objectSpread2({
        sortable: s
      }, a)));
    });
  },
  initializePlugins: function r(i, s, a, c) {
    plugins.forEach(function(p) {
      var u = p.pluginName;
      if (!(!i.options[u] && !p.initializeByDefault)) {
        var m = new p(i, s, i.options);
        m.sortable = i, m.options = i.options, i[u] = m, _extends(a, m.defaults);
      }
    });
    for (var d in i.options)
      if (i.options.hasOwnProperty(d)) {
        var l = this.modifyOption(i, d, i.options[d]);
        typeof l < "u" && (i.options[d] = l);
      }
  },
  getEventProperties: function r(i, s) {
    var a = {};
    return plugins.forEach(function(c) {
      typeof c.eventProperties == "function" && _extends(a, c.eventProperties.call(s[c.pluginName], i));
    }), a;
  },
  modifyOption: function r(i, s, a) {
    var c;
    return plugins.forEach(function(d) {
      i[d.pluginName] && d.optionListeners && typeof d.optionListeners[s] == "function" && (c = d.optionListeners[s].call(i[d.pluginName], a));
    }), c;
  }
};
function dispatchEvent(r) {
  var i = r.sortable, s = r.rootEl, a = r.name, c = r.targetEl, d = r.cloneEl, l = r.toEl, p = r.fromEl, u = r.oldIndex, m = r.newIndex, v = r.oldDraggableIndex, g = r.newDraggableIndex, f = r.originalEvent, w = r.putSortable, h = r.extraEventProperties;
  if (i = i || s && s[expando], !!i) {
    var _, y = i.options, S = "on" + a.charAt(0).toUpperCase() + a.substr(1);
    window.CustomEvent && !IE11OrLess && !Edge ? _ = new CustomEvent(a, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(a, !0, !0)), _.to = l || s, _.from = p || s, _.item = c || s, _.clone = d, _.oldIndex = u, _.newIndex = m, _.oldDraggableIndex = v, _.newDraggableIndex = g, _.originalEvent = f, _.pullMode = w ? w.lastPutMode : void 0;
    var b = _objectSpread2(_objectSpread2({}, h), PluginManager.getEventProperties(a, i));
    for (var P in b)
      _[P] = b[P];
    s && s.dispatchEvent(_), y[S] && y[S].call(i, _);
  }
}
var _excluded = ["evt"], pluginEvent = function r(i, s) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, c = a.evt, d = _objectWithoutProperties(a, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(i, s, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent: c,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function() {
      cloneHidden = !0;
    },
    cloneNowShown: function() {
      cloneHidden = !1;
    },
    dispatchSortableEvent: function(p) {
      _dispatchEvent({
        sortable: s,
        name: p,
        originalEvent: c
      });
    }
  }, d));
};
function _dispatchEvent(r) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, r));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = !1, ignoreNextClick = !1, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = !1, isCircumstantialInvert = !1, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = !1, savedInputChecked = [], documentExists = typeof document < "u", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (documentExists) {
    if (IE11OrLess)
      return !1;
    var r = document.createElement("x");
    return r.style.cssText = "pointer-events:auto", r.style.pointerEvents === "auto";
  }
}(), _detectDirection = function r(i, s) {
  var a = css(i), c = parseInt(a.width) - parseInt(a.paddingLeft) - parseInt(a.paddingRight) - parseInt(a.borderLeftWidth) - parseInt(a.borderRightWidth), d = getChild(i, 0, s), l = getChild(i, 1, s), p = d && css(d), u = l && css(l), m = p && parseInt(p.marginLeft) + parseInt(p.marginRight) + getRect(d).width, v = u && parseInt(u.marginLeft) + parseInt(u.marginRight) + getRect(l).width;
  if (a.display === "flex")
    return a.flexDirection === "column" || a.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (a.display === "grid")
    return a.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (d && p.float && p.float !== "none") {
    var g = p.float === "left" ? "left" : "right";
    return l && (u.clear === "both" || u.clear === g) ? "vertical" : "horizontal";
  }
  return d && (p.display === "block" || p.display === "flex" || p.display === "table" || p.display === "grid" || m >= c && a[CSSFloatProperty] === "none" || l && a[CSSFloatProperty] === "none" && m + v > c) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function r(i, s, a) {
  var c = a ? i.left : i.top, d = a ? i.right : i.bottom, l = a ? i.width : i.height, p = a ? s.left : s.top, u = a ? s.right : s.bottom, m = a ? s.width : s.height;
  return c === p || d === u || c + l / 2 === p + m / 2;
}, _detectNearestEmptySortable = function r(i, s) {
  var a;
  return sortables.some(function(c) {
    var d = c[expando].options.emptyInsertThreshold;
    if (!(!d || lastChild(c))) {
      var l = getRect(c), p = i >= l.left - d && i <= l.right + d, u = s >= l.top - d && s <= l.bottom + d;
      if (p && u)
        return a = c;
    }
  }), a;
}, _prepareGroup = function r(i) {
  function s(d, l) {
    return function(p, u, m, v) {
      var g = p.options.group.name && u.options.group.name && p.options.group.name === u.options.group.name;
      if (d == null && (l || g))
        return !0;
      if (d == null || d === !1)
        return !1;
      if (l && d === "clone")
        return d;
      if (typeof d == "function")
        return s(d(p, u, m, v), l)(p, u, m, v);
      var f = (l ? p : u).options.group.name;
      return d === !0 || typeof d == "string" && d === f || d.join && d.indexOf(f) > -1;
    };
  }
  var a = {}, c = i.group;
  (!c || _typeof(c) != "object") && (c = {
    name: c
  }), a.name = c.name, a.checkPull = s(c.pull, !0), a.checkPut = s(c.put), a.revertClone = c.revertClone, i.group = a;
}, _hideGhostForTarget = function r() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "none");
}, _unhideGhostForTarget = function r() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "");
};
documentExists && !ChromeForAndroid && document.addEventListener("click", function(r) {
  if (ignoreNextClick)
    return r.preventDefault(), r.stopPropagation && r.stopPropagation(), r.stopImmediatePropagation && r.stopImmediatePropagation(), ignoreNextClick = !1, !1;
}, !0);
var nearestEmptyInsertDetectEvent = function r(i) {
  if (dragEl) {
    i = i.touches ? i.touches[0] : i;
    var s = _detectNearestEmptySortable(i.clientX, i.clientY);
    if (s) {
      var a = {};
      for (var c in i)
        i.hasOwnProperty(c) && (a[c] = i[c]);
      a.target = a.rootEl = s, a.preventDefault = void 0, a.stopPropagation = void 0, s[expando]._onDragOver(a);
    }
  }
}, _checkOutsideTargetEl = function r(i) {
  dragEl && dragEl.parentNode[expando]._isOutsideThisEl(i.target);
};
function Sortable(r, i) {
  if (!(r && r.nodeType && r.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(r));
  this.el = r, this.options = i = _extends({}, i), r[expando] = this;
  var s = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(r.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return _detectDirection(r, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(l, p) {
      l.setData("Text", p.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== !1 && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, r, s);
  for (var a in s)
    !(a in i) && (i[a] = s[a]);
  _prepareGroup(i);
  for (var c in this)
    c.charAt(0) === "_" && typeof this[c] == "function" && (this[c] = this[c].bind(this));
  this.nativeDraggable = i.forceFallback ? !1 : supportDraggable, this.nativeDraggable && (this.options.touchStartThreshold = 1), i.supportPointer ? on(r, "pointerdown", this._onTapStart) : (on(r, "mousedown", this._onTapStart), on(r, "touchstart", this._onTapStart)), this.nativeDraggable && (on(r, "dragover", this), on(r, "dragenter", this)), sortables.push(this.el), i.store && i.store.get && this.sort(i.store.get(this) || []), _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function r(i) {
    !this.el.contains(i) && i !== this.el && (lastTarget = null);
  },
  _getDirection: function r(i, s) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, i, s, dragEl) : this.options.direction;
  },
  _onTapStart: function r(i) {
    if (i.cancelable) {
      var s = this, a = this.el, c = this.options, d = c.preventOnFilter, l = i.type, p = i.touches && i.touches[0] || i.pointerType && i.pointerType === "touch" && i, u = (p || i).target, m = i.target.shadowRoot && (i.path && i.path[0] || i.composedPath && i.composedPath()[0]) || u, v = c.filter;
      if (_saveInputCheckedState(a), !dragEl && !(/mousedown|pointerdown/.test(l) && i.button !== 0 || c.disabled) && !m.isContentEditable && !(!this.nativeDraggable && Safari && u && u.tagName.toUpperCase() === "SELECT") && (u = closest(u, c.draggable, a, !1), !(u && u.animated) && lastDownEl !== u)) {
        if (oldIndex = index$7(u), oldDraggableIndex = index$7(u, c.draggable), typeof v == "function") {
          if (v.call(this, i, u, this)) {
            _dispatchEvent({
              sortable: s,
              rootEl: m,
              name: "filter",
              targetEl: u,
              toEl: a,
              fromEl: a
            }), pluginEvent("filter", s, {
              evt: i
            }), d && i.cancelable && i.preventDefault();
            return;
          }
        } else if (v && (v = v.split(",").some(function(g) {
          if (g = closest(m, g.trim(), a, !1), g)
            return _dispatchEvent({
              sortable: s,
              rootEl: g,
              name: "filter",
              targetEl: u,
              fromEl: a,
              toEl: a
            }), pluginEvent("filter", s, {
              evt: i
            }), !0;
        }), v)) {
          d && i.cancelable && i.preventDefault();
          return;
        }
        c.handle && !closest(m, c.handle, a, !1) || this._prepareDragStart(i, p, u);
      }
    }
  },
  _prepareDragStart: function r(i, s, a) {
    var c = this, d = c.el, l = c.options, p = d.ownerDocument, u;
    if (a && !dragEl && a.parentNode === d) {
      var m = getRect(a);
      if (rootEl = d, dragEl = a, parentEl = dragEl.parentNode, nextEl = dragEl.nextSibling, lastDownEl = a, activeGroup = l.group, Sortable.dragged = dragEl, tapEvt = {
        target: dragEl,
        clientX: (s || i).clientX,
        clientY: (s || i).clientY
      }, tapDistanceLeft = tapEvt.clientX - m.left, tapDistanceTop = tapEvt.clientY - m.top, this._lastX = (s || i).clientX, this._lastY = (s || i).clientY, dragEl.style["will-change"] = "all", u = function() {
        if (pluginEvent("delayEnded", c, {
          evt: i
        }), Sortable.eventCanceled) {
          c._onDrop();
          return;
        }
        c._disableDelayedDragEvents(), !FireFox && c.nativeDraggable && (dragEl.draggable = !0), c._triggerDragStart(i, s), _dispatchEvent({
          sortable: c,
          name: "choose",
          originalEvent: i
        }), toggleClass(dragEl, l.chosenClass, !0);
      }, l.ignore.split(",").forEach(function(v) {
        find(dragEl, v.trim(), _disableDraggable);
      }), on(p, "dragover", nearestEmptyInsertDetectEvent), on(p, "mousemove", nearestEmptyInsertDetectEvent), on(p, "touchmove", nearestEmptyInsertDetectEvent), on(p, "mouseup", c._onDrop), on(p, "touchend", c._onDrop), on(p, "touchcancel", c._onDrop), FireFox && this.nativeDraggable && (this.options.touchStartThreshold = 4, dragEl.draggable = !0), pluginEvent("delayStart", this, {
        evt: i
      }), l.delay && (!l.delayOnTouchOnly || s) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(p, "mouseup", c._disableDelayedDrag), on(p, "touchend", c._disableDelayedDrag), on(p, "touchcancel", c._disableDelayedDrag), on(p, "mousemove", c._delayedDragTouchMoveHandler), on(p, "touchmove", c._delayedDragTouchMoveHandler), l.supportPointer && on(p, "pointermove", c._delayedDragTouchMoveHandler), c._dragStartTimer = setTimeout(u, l.delay);
      } else
        u();
    }
  },
  _delayedDragTouchMoveHandler: function r(i) {
    var s = i.touches ? i.touches[0] : i;
    Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function r() {
    dragEl && _disableDraggable(dragEl), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function r() {
    var i = this.el.ownerDocument;
    off(i, "mouseup", this._disableDelayedDrag), off(i, "touchend", this._disableDelayedDrag), off(i, "touchcancel", this._disableDelayedDrag), off(i, "mousemove", this._delayedDragTouchMoveHandler), off(i, "touchmove", this._delayedDragTouchMoveHandler), off(i, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function r(i, s) {
    s = s || i.pointerType == "touch" && i, !this.nativeDraggable || s ? this.options.supportPointer ? on(document, "pointermove", this._onTouchMove) : s ? on(document, "touchmove", this._onTouchMove) : on(document, "mousemove", this._onTouchMove) : (on(dragEl, "dragend", this), on(rootEl, "dragstart", this._onDragStart));
    try {
      document.selection ? _nextTick(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function r(i, s) {
    if (awaitingDragStarted = !1, rootEl && dragEl) {
      pluginEvent("dragStarted", this, {
        evt: s
      }), this.nativeDraggable && on(document, "dragover", _checkOutsideTargetEl);
      var a = this.options;
      !i && toggleClass(dragEl, a.dragClass, !1), toggleClass(dragEl, a.ghostClass, !0), Sortable.active = this, i && this._appendGhost(), _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: s
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function r() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX, this._lastY = touchEvt.clientY, _hideGhostForTarget();
      for (var i = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY), s = i; i && i.shadowRoot && (i = i.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY), i !== s); )
        s = i;
      if (dragEl.parentNode[expando]._isOutsideThisEl(i), s)
        do {
          if (s[expando]) {
            var a = void 0;
            if (a = s[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: i,
              rootEl: s
            }), a && !this.options.dragoverBubble)
              break;
          }
          i = s;
        } while (s = s.parentNode);
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function r(i) {
    if (tapEvt) {
      var s = this.options, a = s.fallbackTolerance, c = s.fallbackOffset, d = i.touches ? i.touches[0] : i, l = ghostEl && matrix(ghostEl, !0), p = ghostEl && l && l.a, u = ghostEl && l && l.d, m = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), v = (d.clientX - tapEvt.clientX + c.x) / (p || 1) + (m ? m[0] - ghostRelativeParentInitialScroll[0] : 0) / (p || 1), g = (d.clientY - tapEvt.clientY + c.y) / (u || 1) + (m ? m[1] - ghostRelativeParentInitialScroll[1] : 0) / (u || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (a && Math.max(Math.abs(d.clientX - this._lastX), Math.abs(d.clientY - this._lastY)) < a)
          return;
        this._onDragStart(i, !0);
      }
      if (ghostEl) {
        l ? (l.e += v - (lastDx || 0), l.f += g - (lastDy || 0)) : l = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: v,
          f: g
        };
        var f = "matrix(".concat(l.a, ",").concat(l.b, ",").concat(l.c, ",").concat(l.d, ",").concat(l.e, ",").concat(l.f, ")");
        css(ghostEl, "webkitTransform", f), css(ghostEl, "mozTransform", f), css(ghostEl, "msTransform", f), css(ghostEl, "transform", f), lastDx = v, lastDy = g, touchEvt = d;
      }
      i.cancelable && i.preventDefault();
    }
  },
  _appendGhost: function r() {
    if (!ghostEl) {
      var i = this.options.fallbackOnBody ? document.body : rootEl, s = getRect(dragEl, !0, PositionGhostAbsolutely, !0, i), a = this.options;
      if (PositionGhostAbsolutely) {
        for (ghostRelativeParent = i; css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document; )
          ghostRelativeParent = ghostRelativeParent.parentNode;
        ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement ? (ghostRelativeParent === document && (ghostRelativeParent = getWindowScrollingElement()), s.top += ghostRelativeParent.scrollTop, s.left += ghostRelativeParent.scrollLeft) : ghostRelativeParent = getWindowScrollingElement(), ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(!0), toggleClass(ghostEl, a.ghostClass, !1), toggleClass(ghostEl, a.fallbackClass, !0), toggleClass(ghostEl, a.dragClass, !0), css(ghostEl, "transition", ""), css(ghostEl, "transform", ""), css(ghostEl, "box-sizing", "border-box"), css(ghostEl, "margin", 0), css(ghostEl, "top", s.top), css(ghostEl, "left", s.left), css(ghostEl, "width", s.width), css(ghostEl, "height", s.height), css(ghostEl, "opacity", "0.8"), css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed"), css(ghostEl, "zIndex", "100000"), css(ghostEl, "pointerEvents", "none"), Sortable.ghost = ghostEl, i.appendChild(ghostEl), css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function r(i, s) {
    var a = this, c = i.dataTransfer, d = a.options;
    if (pluginEvent("dragStart", this, {
      evt: i
    }), Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent("setupClone", this), Sortable.eventCanceled || (cloneEl = clone(dragEl), cloneEl.removeAttribute("id"), cloneEl.draggable = !1, cloneEl.style["will-change"] = "", this._hideClone(), toggleClass(cloneEl, this.options.chosenClass, !1), Sortable.clone = cloneEl), a.cloneId = _nextTick(function() {
      pluginEvent("clone", a), !Sortable.eventCanceled && (a.options.removeCloneOnHide || rootEl.insertBefore(cloneEl, dragEl), a._hideClone(), _dispatchEvent({
        sortable: a,
        name: "clone"
      }));
    }), !s && toggleClass(dragEl, d.dragClass, !0), s ? (ignoreNextClick = !0, a._loopId = setInterval(a._emulateDragOver, 50)) : (off(document, "mouseup", a._onDrop), off(document, "touchend", a._onDrop), off(document, "touchcancel", a._onDrop), c && (c.effectAllowed = "move", d.setData && d.setData.call(a, c, dragEl)), on(document, "drop", a), css(dragEl, "transform", "translateZ(0)")), awaitingDragStarted = !0, a._dragStartId = _nextTick(a._dragStarted.bind(a, s, i)), on(document, "selectstart", a), moved = !0, Safari && css(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function r(i) {
    var s = this.el, a = i.target, c, d, l, p = this.options, u = p.group, m = Sortable.active, v = activeGroup === u, g = p.sort, f = putSortable || m, w, h = this, _ = !1;
    if (_silent)
      return;
    function y(z, G) {
      pluginEvent(z, h, _objectSpread2({
        evt: i,
        isOwner: v,
        axis: w ? "vertical" : "horizontal",
        revert: l,
        dragRect: c,
        targetRect: d,
        canSort: g,
        fromSortable: f,
        target: a,
        completed: b,
        onMove: function(B, U) {
          return _onMove(rootEl, s, dragEl, c, B, getRect(B), i, U);
        },
        changed: P
      }, G));
    }
    function S() {
      y("dragOverAnimationCapture"), h.captureAnimationState(), h !== f && f.captureAnimationState();
    }
    function b(z) {
      return y("dragOverCompleted", {
        insertion: z
      }), z && (v ? m._hideClone() : m._showClone(h), h !== f && (toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : m.options.ghostClass, !1), toggleClass(dragEl, p.ghostClass, !0)), putSortable !== h && h !== Sortable.active ? putSortable = h : h === Sortable.active && putSortable && (putSortable = null), f === h && (h._ignoreWhileAnimating = a), h.animateAll(function() {
        y("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (a === dragEl && !dragEl.animated || a === s && !a.animated) && (lastTarget = null), !p.dragoverBubble && !i.rootEl && a !== document && (dragEl.parentNode[expando]._isOutsideThisEl(i.target), !z && nearestEmptyInsertDetectEvent(i)), !p.dragoverBubble && i.stopPropagation && i.stopPropagation(), _ = !0;
    }
    function P() {
      newIndex = index$7(dragEl), newDraggableIndex = index$7(dragEl, p.draggable), _dispatchEvent({
        sortable: h,
        name: "change",
        toEl: s,
        newIndex,
        newDraggableIndex,
        originalEvent: i
      });
    }
    if (i.preventDefault !== void 0 && i.cancelable && i.preventDefault(), a = closest(a, p.draggable, s, !0), y("dragOver"), Sortable.eventCanceled)
      return _;
    if (dragEl.contains(i.target) || a.animated && a.animatingX && a.animatingY || h._ignoreWhileAnimating === a)
      return b(!1);
    if (ignoreNextClick = !1, m && !p.disabled && (v ? g || (l = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, m, dragEl, i)) && u.checkPut(this, m, dragEl, i))) {
      if (w = this._getDirection(i, a) === "vertical", c = getRect(dragEl), y("dragOverValid"), Sortable.eventCanceled)
        return _;
      if (l)
        return parentEl = rootEl, S(), this._hideClone(), y("revert"), Sortable.eventCanceled || (nextEl ? rootEl.insertBefore(dragEl, nextEl) : rootEl.appendChild(dragEl)), b(!0);
      var C = lastChild(s, p.draggable);
      if (!C || _ghostIsLast(i, w, this) && !C.animated) {
        if (C === dragEl)
          return b(!1);
        if (C && s === i.target && (a = C), a && (d = getRect(a)), _onMove(rootEl, s, dragEl, c, a, d, i, !!a) !== !1)
          return S(), C && C.nextSibling ? s.insertBefore(dragEl, C.nextSibling) : s.appendChild(dragEl), parentEl = s, P(), b(!0);
      } else if (C && _ghostIsFirst(i, w, this)) {
        var k = getChild(s, 0, p, !0);
        if (k === dragEl)
          return b(!1);
        if (a = k, d = getRect(a), _onMove(rootEl, s, dragEl, c, a, d, i, !1) !== !1)
          return S(), s.insertBefore(dragEl, k), parentEl = s, P(), b(!0);
      } else if (a.parentNode === s) {
        d = getRect(a);
        var E = 0, $, T = dragEl.parentNode !== s, x = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || c, a.animated && a.toRect || d, w), j = w ? "top" : "left", O = isScrolledPast(a, "top", "top") || isScrolledPast(dragEl, "top", "top"), I = O ? O.scrollTop : void 0;
        lastTarget !== a && ($ = d[j], pastFirstInvertThresh = !1, isCircumstantialInvert = !x && p.invertSwap || T), E = _getSwapDirection(i, a, d, w, x ? 1 : p.swapThreshold, p.invertedSwapThreshold == null ? p.swapThreshold : p.invertedSwapThreshold, isCircumstantialInvert, lastTarget === a);
        var M;
        if (E !== 0) {
          var A = index$7(dragEl);
          do
            A -= E, M = parentEl.children[A];
          while (M && (css(M, "display") === "none" || M === ghostEl));
        }
        if (E === 0 || M === a)
          return b(!1);
        lastTarget = a, lastDirection = E;
        var D = a.nextElementSibling, L = !1;
        L = E === 1;
        var N = _onMove(rootEl, s, dragEl, c, a, d, i, L);
        if (N !== !1)
          return (N === 1 || N === -1) && (L = N === 1), _silent = !0, setTimeout(_unsilent, 30), S(), L && !D ? s.appendChild(dragEl) : a.parentNode.insertBefore(dragEl, L ? D : a), O && scrollBy(O, 0, I - O.scrollTop), parentEl = dragEl.parentNode, $ !== void 0 && !isCircumstantialInvert && (targetMoveDistance = Math.abs($ - getRect(a)[j])), P(), b(!0);
      }
      if (s.contains(dragEl))
        return b(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function r() {
    off(document, "mousemove", this._onTouchMove), off(document, "touchmove", this._onTouchMove), off(document, "pointermove", this._onTouchMove), off(document, "dragover", nearestEmptyInsertDetectEvent), off(document, "mousemove", nearestEmptyInsertDetectEvent), off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function r() {
    var i = this.el.ownerDocument;
    off(i, "mouseup", this._onDrop), off(i, "touchend", this._onDrop), off(i, "pointerup", this._onDrop), off(i, "touchcancel", this._onDrop), off(document, "selectstart", this);
  },
  _onDrop: function r(i) {
    var s = this.el, a = this.options;
    if (newIndex = index$7(dragEl), newDraggableIndex = index$7(dragEl, a.draggable), pluginEvent("drop", this, {
      evt: i
    }), parentEl = dragEl && dragEl.parentNode, newIndex = index$7(dragEl), newDraggableIndex = index$7(dragEl, a.draggable), Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = !1, isCircumstantialInvert = !1, pastFirstInvertThresh = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _cancelNextTick(this.cloneId), _cancelNextTick(this._dragStartId), this.nativeDraggable && (off(document, "drop", this), off(s, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Safari && css(document.body, "user-select", ""), css(dragEl, "transform", ""), i && (moved && (i.cancelable && i.preventDefault(), !a.dropBubble && i.stopPropagation()), ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl), (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") && cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), dragEl && (this.nativeDraggable && off(dragEl, "dragend", this), _disableDraggable(dragEl), dragEl.style["will-change"] = "", moved && !awaitingDragStarted && toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, !1), toggleClass(dragEl, this.options.chosenClass, !1), _dispatchEvent({
      sortable: this,
      name: "unchoose",
      toEl: parentEl,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: i
    }), rootEl !== parentEl ? (newIndex >= 0 && (_dispatchEvent({
      rootEl: parentEl,
      name: "add",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: i
    }), _dispatchEvent({
      sortable: this,
      name: "remove",
      toEl: parentEl,
      originalEvent: i
    }), _dispatchEvent({
      rootEl: parentEl,
      name: "sort",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: i
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: i
    })), putSortable && putSortable.save()) : newIndex !== oldIndex && newIndex >= 0 && (_dispatchEvent({
      sortable: this,
      name: "update",
      toEl: parentEl,
      originalEvent: i
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: i
    })), Sortable.active && ((newIndex == null || newIndex === -1) && (newIndex = oldIndex, newDraggableIndex = oldDraggableIndex), _dispatchEvent({
      sortable: this,
      name: "end",
      toEl: parentEl,
      originalEvent: i
    }), this.save()))), this._nulling();
  },
  _nulling: function r() {
    pluginEvent("nulling", this), rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null, savedInputChecked.forEach(function(i) {
      i.checked = !0;
    }), savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function r(i) {
    switch (i.type) {
      case "drop":
      case "dragend":
        this._onDrop(i);
        break;
      case "dragenter":
      case "dragover":
        dragEl && (this._onDragOver(i), _globalDragOver(i));
        break;
      case "selectstart":
        i.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function r() {
    for (var i = [], s, a = this.el.children, c = 0, d = a.length, l = this.options; c < d; c++)
      s = a[c], closest(s, l.draggable, this.el, !1) && i.push(s.getAttribute(l.dataIdAttr) || _generateId(s));
    return i;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function r(i, s) {
    var a = {}, c = this.el;
    this.toArray().forEach(function(d, l) {
      var p = c.children[l];
      closest(p, this.options.draggable, c, !1) && (a[d] = p);
    }, this), s && this.captureAnimationState(), i.forEach(function(d) {
      a[d] && (c.removeChild(a[d]), c.appendChild(a[d]));
    }), s && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function r() {
    var i = this.options.store;
    i && i.set && i.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function r(i, s) {
    return closest(i, s || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function r(i, s) {
    var a = this.options;
    if (s === void 0)
      return a[i];
    var c = PluginManager.modifyOption(this, i, s);
    typeof c < "u" ? a[i] = c : a[i] = s, i === "group" && _prepareGroup(a);
  },
  /**
   * Destroy
   */
  destroy: function r() {
    pluginEvent("destroy", this);
    var i = this.el;
    i[expando] = null, off(i, "mousedown", this._onTapStart), off(i, "touchstart", this._onTapStart), off(i, "pointerdown", this._onTapStart), this.nativeDraggable && (off(i, "dragover", this), off(i, "dragenter", this)), Array.prototype.forEach.call(i.querySelectorAll("[draggable]"), function(s) {
      s.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), sortables.splice(sortables.indexOf(this.el), 1), this.el = i = null;
  },
  _hideClone: function r() {
    if (!cloneHidden) {
      if (pluginEvent("hideClone", this), Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none"), this.options.removeCloneOnHide && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), cloneHidden = !0;
    }
  },
  _showClone: function r(i) {
    if (i.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      if (pluginEvent("showClone", this), Sortable.eventCanceled)
        return;
      dragEl.parentNode == rootEl && !this.options.group.revertClone ? rootEl.insertBefore(cloneEl, dragEl) : nextEl ? rootEl.insertBefore(cloneEl, nextEl) : rootEl.appendChild(cloneEl), this.options.group.revertClone && this.animate(dragEl, cloneEl), css(cloneEl, "display", ""), cloneHidden = !1;
    }
  }
};
function _globalDragOver(r) {
  r.dataTransfer && (r.dataTransfer.dropEffect = "move"), r.cancelable && r.preventDefault();
}
function _onMove(r, i, s, a, c, d, l, p) {
  var u, m = r[expando], v = m.options.onMove, g;
  return window.CustomEvent && !IE11OrLess && !Edge ? u = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (u = document.createEvent("Event"), u.initEvent("move", !0, !0)), u.to = i, u.from = r, u.dragged = s, u.draggedRect = a, u.related = c || i, u.relatedRect = d || getRect(i), u.willInsertAfter = p, u.originalEvent = l, r.dispatchEvent(u), v && (g = v.call(m, u, l)), g;
}
function _disableDraggable(r) {
  r.draggable = !1;
}
function _unsilent() {
  _silent = !1;
}
function _ghostIsFirst(r, i, s) {
  var a = getRect(getChild(s.el, 0, s.options, !0)), c = 10;
  return i ? r.clientX < a.left - c || r.clientY < a.top && r.clientX < a.right : r.clientY < a.top - c || r.clientY < a.bottom && r.clientX < a.left;
}
function _ghostIsLast(r, i, s) {
  var a = getRect(lastChild(s.el, s.options.draggable)), c = 10;
  return i ? r.clientX > a.right + c || r.clientX <= a.right && r.clientY > a.bottom && r.clientX >= a.left : r.clientX > a.right && r.clientY > a.top || r.clientX <= a.right && r.clientY > a.bottom + c;
}
function _getSwapDirection(r, i, s, a, c, d, l, p) {
  var u = a ? r.clientY : r.clientX, m = a ? s.height : s.width, v = a ? s.top : s.left, g = a ? s.bottom : s.right, f = !1;
  if (!l) {
    if (p && targetMoveDistance < m * c) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? u > v + m * d / 2 : u < g - m * d / 2) && (pastFirstInvertThresh = !0), pastFirstInvertThresh)
        f = !0;
      else if (lastDirection === 1 ? u < v + targetMoveDistance : u > g - targetMoveDistance)
        return -lastDirection;
    } else if (u > v + m * (1 - c) / 2 && u < g - m * (1 - c) / 2)
      return _getInsertDirection(i);
  }
  return f = f || l, f && (u < v + m * d / 2 || u > g - m * d / 2) ? u > v + m / 2 ? 1 : -1 : 0;
}
function _getInsertDirection(r) {
  return index$7(dragEl) < index$7(r) ? 1 : -1;
}
function _generateId(r) {
  for (var i = r.tagName + r.className + r.src + r.href + r.textContent, s = i.length, a = 0; s--; )
    a += i.charCodeAt(s);
  return a.toString(36);
}
function _saveInputCheckedState(r) {
  savedInputChecked.length = 0;
  for (var i = r.getElementsByTagName("input"), s = i.length; s--; ) {
    var a = i[s];
    a.checked && savedInputChecked.push(a);
  }
}
function _nextTick(r) {
  return setTimeout(r, 0);
}
function _cancelNextTick(r) {
  return clearTimeout(r);
}
documentExists && on(document, "touchmove", function(r) {
  (Sortable.active || awaitingDragStarted) && r.cancelable && r.preventDefault();
});
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function r(i, s) {
    return !!closest(i, s, i, !1);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index: index$7,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(r) {
  return r[expando];
};
Sortable.mount = function() {
  for (var r = arguments.length, i = new Array(r), s = 0; s < r; s++)
    i[s] = arguments[s];
  i[0].constructor === Array && (i = i[0]), i.forEach(function(a) {
    if (!a.prototype || !a.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(a));
    a.utils && (Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), a.utils)), PluginManager.mount(a);
  });
};
Sortable.create = function(r, i) {
  return new Sortable(r, i);
};
Sortable.version = version$1;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = !1, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function r() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var i in this)
      i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  }
  return r.prototype = {
    dragStarted: function(s) {
      var a = s.originalEvent;
      this.sortable.nativeDraggable ? on(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? on(document, "pointermove", this._handleFallbackAutoScroll) : a.touches ? on(document, "touchmove", this._handleFallbackAutoScroll) : on(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(s) {
      var a = s.originalEvent;
      !this.options.dragOverBubble && !a.rootEl && this._handleAutoScroll(a);
    },
    drop: function() {
      this.sortable.nativeDraggable ? off(document, "dragover", this._handleAutoScroll) : (off(document, "pointermove", this._handleFallbackAutoScroll), off(document, "touchmove", this._handleFallbackAutoScroll), off(document, "mousemove", this._handleFallbackAutoScroll)), clearPointerElemChangedInterval(), clearAutoScrolls(), cancelThrottle();
    },
    nulling: function() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null, autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function(s) {
      this._handleAutoScroll(s, !0);
    },
    _handleAutoScroll: function(s, a) {
      var c = this, d = (s.touches ? s.touches[0] : s).clientX, l = (s.touches ? s.touches[0] : s).clientY, p = document.elementFromPoint(d, l);
      if (touchEvt$1 = s, a || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(s, this.options, p, a);
        var u = getParentAutoScrollElement(p, !0);
        scrolling && (!pointerElemChangedInterval || d !== lastAutoScrollX || l !== lastAutoScrollY) && (pointerElemChangedInterval && clearPointerElemChangedInterval(), pointerElemChangedInterval = setInterval(function() {
          var m = getParentAutoScrollElement(document.elementFromPoint(d, l), !0);
          m !== u && (u = m, clearAutoScrolls()), autoScroll(s, c.options, m, a);
        }, 10), lastAutoScrollX = d, lastAutoScrollY = l);
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(p, !0) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(s, this.options, getParentAutoScrollElement(p, !1), !1);
      }
    }
  }, _extends(r, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(r) {
    clearInterval(r.pid);
  }), autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(r, i, s, a) {
  if (i.scroll) {
    var c = (r.touches ? r.touches[0] : r).clientX, d = (r.touches ? r.touches[0] : r).clientY, l = i.scrollSensitivity, p = i.scrollSpeed, u = getWindowScrollingElement(), m = !1, v;
    scrollRootEl !== s && (scrollRootEl = s, clearAutoScrolls(), scrollEl = i.scroll, v = i.scrollFn, scrollEl === !0 && (scrollEl = getParentAutoScrollElement(s, !0)));
    var g = 0, f = scrollEl;
    do {
      var w = f, h = getRect(w), _ = h.top, y = h.bottom, S = h.left, b = h.right, P = h.width, C = h.height, k = void 0, E = void 0, $ = w.scrollWidth, T = w.scrollHeight, x = css(w), j = w.scrollLeft, O = w.scrollTop;
      w === u ? (k = P < $ && (x.overflowX === "auto" || x.overflowX === "scroll" || x.overflowX === "visible"), E = C < T && (x.overflowY === "auto" || x.overflowY === "scroll" || x.overflowY === "visible")) : (k = P < $ && (x.overflowX === "auto" || x.overflowX === "scroll"), E = C < T && (x.overflowY === "auto" || x.overflowY === "scroll"));
      var I = k && (Math.abs(b - c) <= l && j + P < $) - (Math.abs(S - c) <= l && !!j), M = E && (Math.abs(y - d) <= l && O + C < T) - (Math.abs(_ - d) <= l && !!O);
      if (!autoScrolls[g])
        for (var A = 0; A <= g; A++)
          autoScrolls[A] || (autoScrolls[A] = {});
      (autoScrolls[g].vx != I || autoScrolls[g].vy != M || autoScrolls[g].el !== w) && (autoScrolls[g].el = w, autoScrolls[g].vx = I, autoScrolls[g].vy = M, clearInterval(autoScrolls[g].pid), (I != 0 || M != 0) && (m = !0, autoScrolls[g].pid = setInterval(function() {
        a && this.layer === 0 && Sortable.active._onTouchMove(touchEvt$1);
        var D = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * p : 0, L = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * p : 0;
        typeof v == "function" && v.call(Sortable.dragged.parentNode[expando], L, D, r, touchEvt$1, autoScrolls[this.layer].el) !== "continue" || scrollBy(autoScrolls[this.layer].el, L, D);
      }.bind({
        layer: g
      }), 24))), g++;
    } while (i.bubbleScroll && f !== u && (f = getParentAutoScrollElement(f, !1)));
    scrolling = m;
  }
}, 30), drop = function r(i) {
  var s = i.originalEvent, a = i.putSortable, c = i.dragEl, d = i.activeSortable, l = i.dispatchSortableEvent, p = i.hideGhostForTarget, u = i.unhideGhostForTarget;
  if (s) {
    var m = a || d;
    p();
    var v = s.changedTouches && s.changedTouches.length ? s.changedTouches[0] : s, g = document.elementFromPoint(v.clientX, v.clientY);
    u(), m && !m.el.contains(g) && (l("spill"), this.onSpill({
      dragEl: c,
      putSortable: a
    }));
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function r(i) {
    var s = i.oldDraggableIndex;
    this.startIndex = s;
  },
  onSpill: function r(i) {
    var s = i.dragEl, a = i.putSortable;
    this.sortable.captureAnimationState(), a && a.captureAnimationState();
    var c = getChild(this.sortable.el, this.startIndex, this.options);
    c ? this.sortable.el.insertBefore(s, c) : this.sortable.el.appendChild(s), this.sortable.animateAll(), a && a.animateAll();
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function r(i) {
    var s = i.dragEl, a = i.putSortable, c = a || this.sortable;
    c.captureAnimationState(), s.parentNode && s.parentNode.removeChild(s), c.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
var lastSwapEl;
function SwapPlugin() {
  function r() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return r.prototype = {
    dragStart: function(s) {
      var a = s.dragEl;
      lastSwapEl = a;
    },
    dragOverValid: function(s) {
      var a = s.completed, c = s.target, d = s.onMove, l = s.activeSortable, p = s.changed, u = s.cancel;
      if (l.options.swap) {
        var m = this.sortable.el, v = this.options;
        if (c && c !== m) {
          var g = lastSwapEl;
          d(c) !== !1 ? (toggleClass(c, v.swapClass, !0), lastSwapEl = c) : lastSwapEl = null, g && g !== lastSwapEl && toggleClass(g, v.swapClass, !1);
        }
        p(), a(!0), u();
      }
    },
    drop: function(s) {
      var a = s.activeSortable, c = s.putSortable, d = s.dragEl, l = c || this.sortable, p = this.options;
      lastSwapEl && toggleClass(lastSwapEl, p.swapClass, !1), lastSwapEl && (p.swap || c && c.options.swap) && d !== lastSwapEl && (l.captureAnimationState(), l !== a && a.captureAnimationState(), swapNodes(d, lastSwapEl), l.animateAll(), l !== a && a.animateAll());
    },
    nulling: function() {
      lastSwapEl = null;
    }
  }, _extends(r, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(r, i) {
  var s = r.parentNode, a = i.parentNode, c, d;
  !s || !a || s.isEqualNode(i) || a.isEqualNode(r) || (c = index$7(r), d = index$7(i), s.isEqualNode(a) && c < d && d++, s.insertBefore(i, s.children[c]), a.insertBefore(r, a.children[d]));
}
var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = !1, folding = !1, dragStarted = !1, dragEl$1, clonesFromRect, clonesHidden;
function MultiDragPlugin() {
  function r(i) {
    for (var s in this)
      s.charAt(0) === "_" && typeof this[s] == "function" && (this[s] = this[s].bind(this));
    i.options.avoidImplicitDeselect || (i.options.supportPointer ? on(document, "pointerup", this._deselectMultiDrag) : (on(document, "mouseup", this._deselectMultiDrag), on(document, "touchend", this._deselectMultiDrag))), on(document, "keydown", this._checkKeyDown), on(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(c, d) {
        var l = "";
        multiDragElements.length && multiDragSortable === i ? multiDragElements.forEach(function(p, u) {
          l += (u ? ", " : "") + p.textContent;
        }) : l = d.textContent, c.setData("Text", l);
      }
    };
  }
  return r.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(s) {
      var a = s.dragEl;
      dragEl$1 = a;
    },
    delayEnded: function() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function(s) {
      var a = s.sortable, c = s.cancel;
      if (this.isMultiDrag) {
        for (var d = 0; d < multiDragElements.length; d++)
          multiDragClones.push(clone(multiDragElements[d])), multiDragClones[d].sortableIndex = multiDragElements[d].sortableIndex, multiDragClones[d].draggable = !1, multiDragClones[d].style["will-change"] = "", toggleClass(multiDragClones[d], this.options.selectedClass, !1), multiDragElements[d] === dragEl$1 && toggleClass(multiDragClones[d], this.options.chosenClass, !1);
        a._hideClone(), c();
      }
    },
    clone: function(s) {
      var a = s.sortable, c = s.rootEl, d = s.dispatchSortableEvent, l = s.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || multiDragElements.length && multiDragSortable === a && (insertMultiDragClones(!0, c), d("clone"), l()));
    },
    showClone: function(s) {
      var a = s.cloneNowShown, c = s.rootEl, d = s.cancel;
      this.isMultiDrag && (insertMultiDragClones(!1, c), multiDragClones.forEach(function(l) {
        css(l, "display", "");
      }), a(), clonesHidden = !1, d());
    },
    hideClone: function(s) {
      var a = this, c = s.sortable, d = s.cloneNowHidden, l = s.cancel;
      this.isMultiDrag && (multiDragClones.forEach(function(p) {
        css(p, "display", "none"), a.options.removeCloneOnHide && p.parentNode && p.parentNode.removeChild(p);
      }), d(), clonesHidden = !0, l());
    },
    dragStartGlobal: function(s) {
      var a = s.sortable;
      !this.isMultiDrag && multiDragSortable && multiDragSortable.multiDrag._deselectMultiDrag(), multiDragElements.forEach(function(c) {
        c.sortableIndex = index$7(c);
      }), multiDragElements = multiDragElements.sort(function(c, d) {
        return c.sortableIndex - d.sortableIndex;
      }), dragStarted = !0;
    },
    dragStarted: function(s) {
      var a = this, c = s.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (c.captureAnimationState(), this.options.animation)) {
          multiDragElements.forEach(function(l) {
            l !== dragEl$1 && css(l, "position", "absolute");
          });
          var d = getRect(dragEl$1, !1, !0, !0);
          multiDragElements.forEach(function(l) {
            l !== dragEl$1 && setRect(l, d);
          }), folding = !0, initialFolding = !0;
        }
        c.animateAll(function() {
          folding = !1, initialFolding = !1, a.options.animation && multiDragElements.forEach(function(l) {
            unsetRect(l);
          }), a.options.sort && removeMultiDragElements();
        });
      }
    },
    dragOver: function(s) {
      var a = s.target, c = s.completed, d = s.cancel;
      folding && ~multiDragElements.indexOf(a) && (c(!1), d());
    },
    revert: function(s) {
      var a = s.fromSortable, c = s.rootEl, d = s.sortable, l = s.dragRect;
      multiDragElements.length > 1 && (multiDragElements.forEach(function(p) {
        d.addAnimationState({
          target: p,
          rect: folding ? getRect(p) : l
        }), unsetRect(p), p.fromRect = l, a.removeAnimationState(p);
      }), folding = !1, insertMultiDragElements(!this.options.removeCloneOnHide, c));
    },
    dragOverCompleted: function(s) {
      var a = s.sortable, c = s.isOwner, d = s.insertion, l = s.activeSortable, p = s.parentEl, u = s.putSortable, m = this.options;
      if (d) {
        if (c && l._hideClone(), initialFolding = !1, m.animation && multiDragElements.length > 1 && (folding || !c && !l.options.sort && !u)) {
          var v = getRect(dragEl$1, !1, !0, !0);
          multiDragElements.forEach(function(f) {
            f !== dragEl$1 && (setRect(f, v), p.appendChild(f));
          }), folding = !0;
        }
        if (!c)
          if (folding || removeMultiDragElements(), multiDragElements.length > 1) {
            var g = clonesHidden;
            l._showClone(a), l.options.animation && !clonesHidden && g && multiDragClones.forEach(function(f) {
              l.addAnimationState({
                target: f,
                rect: clonesFromRect
              }), f.fromRect = clonesFromRect, f.thisAnimationDuration = null;
            });
          } else
            l._showClone(a);
      }
    },
    dragOverAnimationCapture: function(s) {
      var a = s.dragRect, c = s.isOwner, d = s.activeSortable;
      if (multiDragElements.forEach(function(p) {
        p.thisAnimationDuration = null;
      }), d.options.animation && !c && d.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, a);
        var l = matrix(dragEl$1, !0);
        clonesFromRect.top -= l.f, clonesFromRect.left -= l.e;
      }
    },
    dragOverAnimationComplete: function() {
      folding && (folding = !1, removeMultiDragElements());
    },
    drop: function(s) {
      var a = s.originalEvent, c = s.rootEl, d = s.parentEl, l = s.sortable, p = s.dispatchSortableEvent, u = s.oldIndex, m = s.putSortable, v = m || this.sortable;
      if (a) {
        var g = this.options, f = d.children;
        if (!dragStarted)
          if (g.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), toggleClass(dragEl$1, g.selectedClass, !~multiDragElements.indexOf(dragEl$1)), ~multiDragElements.indexOf(dragEl$1))
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1), lastMultiDragSelect = null, dispatchEvent({
              sortable: l,
              rootEl: c,
              name: "deselect",
              targetEl: dragEl$1,
              originalEvent: a
            });
          else {
            if (multiDragElements.push(dragEl$1), dispatchEvent({
              sortable: l,
              rootEl: c,
              name: "select",
              targetEl: dragEl$1,
              originalEvent: a
            }), a.shiftKey && lastMultiDragSelect && l.el.contains(lastMultiDragSelect)) {
              var w = index$7(lastMultiDragSelect), h = index$7(dragEl$1);
              if (~w && ~h && w !== h) {
                var _, y;
                for (h > w ? (y = w, _ = h) : (y = h, _ = w + 1); y < _; y++)
                  ~multiDragElements.indexOf(f[y]) || (toggleClass(f[y], g.selectedClass, !0), multiDragElements.push(f[y]), dispatchEvent({
                    sortable: l,
                    rootEl: c,
                    name: "select",
                    targetEl: f[y],
                    originalEvent: a
                  }));
              }
            } else
              lastMultiDragSelect = dragEl$1;
            multiDragSortable = v;
          }
        if (dragStarted && this.isMultiDrag) {
          if (folding = !1, (d[expando].options.sort || d !== c) && multiDragElements.length > 1) {
            var S = getRect(dragEl$1), b = index$7(dragEl$1, ":not(." + this.options.selectedClass + ")");
            if (!initialFolding && g.animation && (dragEl$1.thisAnimationDuration = null), v.captureAnimationState(), !initialFolding && (g.animation && (dragEl$1.fromRect = S, multiDragElements.forEach(function(C) {
              if (C.thisAnimationDuration = null, C !== dragEl$1) {
                var k = folding ? getRect(C) : S;
                C.fromRect = k, v.addAnimationState({
                  target: C,
                  rect: k
                });
              }
            })), removeMultiDragElements(), multiDragElements.forEach(function(C) {
              f[b] ? d.insertBefore(C, f[b]) : d.appendChild(C), b++;
            }), u === index$7(dragEl$1))) {
              var P = !1;
              multiDragElements.forEach(function(C) {
                if (C.sortableIndex !== index$7(C)) {
                  P = !0;
                  return;
                }
              }), P && p("update");
            }
            multiDragElements.forEach(function(C) {
              unsetRect(C);
            }), v.animateAll();
          }
          multiDragSortable = v;
        }
        (c === d || m && m.lastPutMode !== "clone") && multiDragClones.forEach(function(C) {
          C.parentNode && C.parentNode.removeChild(C);
        });
      }
    },
    nullingGlobal: function() {
      this.isMultiDrag = dragStarted = !1, multiDragClones.length = 0;
    },
    destroyGlobal: function() {
      this._deselectMultiDrag(), off(document, "pointerup", this._deselectMultiDrag), off(document, "mouseup", this._deselectMultiDrag), off(document, "touchend", this._deselectMultiDrag), off(document, "keydown", this._checkKeyDown), off(document, "keyup", this._checkKeyUp);
    },
    _deselectMultiDrag: function(s) {
      if (!(typeof dragStarted < "u" && dragStarted) && multiDragSortable === this.sortable && !(s && closest(s.target, this.options.draggable, this.sortable.el, !1)) && !(s && s.button !== 0))
        for (; multiDragElements.length; ) {
          var a = multiDragElements[0];
          toggleClass(a, this.options.selectedClass, !1), multiDragElements.shift(), dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: a,
            originalEvent: s
          });
        }
    },
    _checkKeyDown: function(s) {
      s.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
    },
    _checkKeyUp: function(s) {
      s.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
    }
  }, _extends(r, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(s) {
        var a = s.parentNode[expando];
        !a || !a.options.multiDrag || ~multiDragElements.indexOf(s) || (multiDragSortable && multiDragSortable !== a && (multiDragSortable.multiDrag._deselectMultiDrag(), multiDragSortable = a), toggleClass(s, a.options.selectedClass, !0), multiDragElements.push(s));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(s) {
        var a = s.parentNode[expando], c = multiDragElements.indexOf(s);
        !a || !a.options.multiDrag || !~c || (toggleClass(s, a.options.selectedClass, !1), multiDragElements.splice(c, 1));
      }
    },
    eventProperties: function() {
      var s = this, a = [], c = [];
      return multiDragElements.forEach(function(d) {
        a.push({
          multiDragElement: d,
          index: d.sortableIndex
        });
        var l;
        folding && d !== dragEl$1 ? l = -1 : folding ? l = index$7(d, ":not(." + s.options.selectedClass + ")") : l = index$7(d), c.push({
          multiDragElement: d,
          index: l
        });
      }), {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: a,
        newIndicies: c
      };
    },
    optionListeners: {
      multiDragKey: function(s) {
        return s = s.toLowerCase(), s === "ctrl" ? s = "Control" : s.length > 1 && (s = s.charAt(0).toUpperCase() + s.substr(1)), s;
      }
    }
  });
}
function insertMultiDragElements(r, i) {
  multiDragElements.forEach(function(s, a) {
    var c = i.children[s.sortableIndex + (r ? Number(a) : 0)];
    c ? i.insertBefore(s, c) : i.appendChild(s);
  });
}
function insertMultiDragClones(r, i) {
  multiDragClones.forEach(function(s, a) {
    var c = i.children[s.sortableIndex + (r ? Number(a) : 0)];
    c ? i.insertBefore(s, c) : i.appendChild(s);
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function(r) {
    r !== dragEl$1 && r.parentNode && r.parentNode.removeChild(r);
  });
}
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
const _withScopeId$1 = (r) => (pushScopeId("data-v-c0ff0ef8"), r = r(), popScopeId(), r), _hoisted_1$2 = { class: "flex flex-wrap" }, _hoisted_2$1 = {
  key: 0,
  class: "w-full h-full relative"
}, _hoisted_3$1 = { class: "w-full h-full flex items-center justify-center" }, _hoisted_4 = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, _hoisted_5 = { class: "w-full h-full flex items-center justify-center flex-col content-wrap" }, _hoisted_6 = { class: "leading-none text-xs mt-[10px] text-secondary" }, _hoisted_7 = { class: "w-full h-full relative" }, _hoisted_8 = { class: "w-full h-full flex items-center justify-center" }, _hoisted_9 = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, _hoisted_10 = { class: "w-full h-full flex items-center justify-center flex-col content-wrap" }, _hoisted_11 = { class: "leading-none text-xs mt-[10px] text-secondary" }, _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    type: {
      type: String,
      default: "image"
    },
    imageFit: {
      type: String,
      default: "contain"
    },
    modelValue: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "100px"
    },
    height: {
      type: String,
      default: "100px"
    },
    imageText: {
      type: String
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  emits: ["update:modelValue", "change"],
  setup(r, { emit: i }) {
    const s = r, a = i, c = computed({
      get() {
        return s.modelValue;
      },
      set(y) {
        a("update:modelValue", y);
      }
    }), d = reactive({
      data: []
    });
    let l = reactive([]);
    const p = () => {
      c.value = toRaw(d.data).toString(), l = toRaw(d.data).map((y) => y.indexOf("data:image") != -1 ? y : img(y));
    }, u = computed(() => s.limit - d.data.length);
    watch(() => c.value, () => {
      c.value.indexOf("data:image") != -1 ? d.data = [c.value] : d.data = [
        ...c.value.split(",").filter((y) => y)
      ], p();
    }, { immediate: !0 });
    const m = computed(() => ({
      width: s.width,
      height: s.height
    })), v = (y) => {
      s.limit == 1 ? (d.data.splice(0, 1), y && d.data.push(y.url)) : (y.forEach((S) => {
        d.data.length < s.limit && d.data.push(S.url);
      }), nextTick(() => {
        _();
      })), p(), nextTick(() => {
        a("change", c.value);
      });
    }, g = (y = 0) => {
      d.data.splice(y, 1), p();
    }, f = reactive({
      show: !1,
      index: 0
    }), w = (y = 0) => {
      f.show = !0, f.index = y;
    }, h = ref(null);
    onMounted(() => {
      nextTick(() => {
        _();
      });
    });
    const _ = () => {
      s.limit != 1 && Sortable.create(h.value, {
        group: "image-wrap",
        animation: 300,
        onEnd: (y) => {
          const S = d.data[y.oldIndex];
          d.data.splice(y.oldIndex, 1), d.data.splice(y.newIndex, 0, S), p();
        }
      });
    };
    return (y, S) => {
      const b = resolveComponent("el-image"), P = resolveComponent("icon"), C = resolveComponent("upload-attachment"), k = resolveComponent("el-image-viewer");
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", _hoisted_1$2, [
          r.limit == 1 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px]", { "rounded-full": r.type == "avatar" }]),
            style: normalizeStyle(m.value)
          }, [
            d.data.length ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
              createElementVNode("div", _hoisted_3$1, [
                createVNode(b, {
                  class: "w-full h-full",
                  src: d.data[0].indexOf("data:image") != -1 ? d.data[0] : unref(img)(d.data[0]),
                  fit: r.imageFit
                }, null, 8, ["src", "fit"])
              ]),
              createElementVNode("div", _hoisted_4, [
                createVNode(P, {
                  name: "element ZoomIn",
                  color: "#fff",
                  size: "18px",
                  class: "mr-[10px]",
                  onClick: S[0] || (S[0] = (E) => w())
                }),
                createVNode(P, {
                  name: "element Delete",
                  color: "#fff",
                  size: "18px",
                  onClick: withModifiers(g, ["stop"])
                }, null, 8, ["onClick"])
              ])
            ])) : (openBlock(), createBlock(C, {
              key: 1,
              limit: u.value,
              onConfirm: v
            }, {
              default: withCtx(() => [
                createElementVNode("div", _hoisted_5, [
                  createVNode(P, {
                    name: "element Plus",
                    size: "20px",
                    color: "var(--el-text-color-secondary)"
                  }),
                  createElementVNode("div", _hoisted_6, toDisplayString(r.imageText || unref(t$1)("upload.root")), 1)
                ])
              ]),
              _: 1
            }, 8, ["limit"]))
          ], 6)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createElementVNode("div", {
              class: "flex flex-wrap",
              ref_key: "imgListRef",
              ref: h
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(d.data, (E, $) => (openBlock(), createElementBlock("div", {
                class: "rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px] mb-[10px]",
                style: normalizeStyle(m.value),
                key: E + $
              }, [
                createElementVNode("div", _hoisted_7, [
                  createElementVNode("div", _hoisted_8, [
                    createVNode(b, {
                      src: unref(img)(E),
                      fit: "contain"
                    }, null, 8, ["src"])
                  ]),
                  createElementVNode("div", _hoisted_9, [
                    createVNode(P, {
                      name: "element ZoomIn",
                      color: "#fff",
                      size: "18px",
                      class: "mr-[10px]",
                      onClick: (T) => w($)
                    }, null, 8, ["onClick"]),
                    createVNode(P, {
                      name: "element Delete",
                      color: "#fff",
                      size: "18px",
                      onClick: (T) => g($)
                    }, null, 8, ["onClick"])
                  ])
                ])
              ], 4))), 128))
            ], 512),
            d.data.length < r.limit ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color",
              style: normalizeStyle(m.value)
            }, [
              createVNode(C, {
                limit: u.value,
                onConfirm: v
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_10, [
                    createVNode(P, {
                      name: "element Plus",
                      size: "20px",
                      color: "var(--el-text-color-secondary)"
                    }),
                    createElementVNode("div", _hoisted_11, toDisplayString(r.imageText || unref(t$1)("upload.root")), 1)
                  ])
                ]),
                _: 1
              }, 8, ["limit"])
            ], 4)) : createCommentVNode("", !0)
          ], 64))
        ]),
        f.show ? (openBlock(), createBlock(k, {
          key: 0,
          "url-list": unref(l),
          onClose: S[1] || (S[1] = (E) => f.show = !1),
          "initial-index": f.index,
          "zoom-rate": 1
        }, null, 8, ["url-list", "initial-index"])) : createCommentVNode("", !0)
      ], 64);
    };
  }
}), index_vue_vue_type_style_index_0_scoped_c0ff0ef8_lang = "", index$5 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c0ff0ef8"]]), index$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5
}, Symbol.toStringTag, { value: "Module" })), _withScopeId = (r) => (pushScopeId("data-v-0e4db2d0"), r = r(), popScopeId(), r), _hoisted_1$1 = ["onClick"], _hoisted_2 = { class: "mt-[16px] flex" }, _hoisted_3 = { class: "dialog-footer" }, _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        id: 0,
        name: "",
        parent: "",
        title: "",
        url: ""
      })
    },
    ignore: {
      type: Array,
      default: []
    }
  },
  emits: ["update:modelValue", "confirm", "success"],
  setup(r, { expose: i, emit: s }) {
    const a = r, c = () => {
      l.value = {
        id: 0,
        name: "",
        parent: "",
        title: "",
        url: ""
      };
    }, d = s, l = computed({
      get() {
        return a.modelValue;
      },
      set(S) {
        d("update:modelValue", S);
      }
    }), p = ref(), u = reactive({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: ""
      }
    }), m = ref(), v = ref(!1), g = () => {
      v.value = !0, f();
    }, f = (S = 1) => {
      u.loading = !0, u.page = S, getPageLink({
        page: u.page,
        limit: u.limit,
        ...u.searchParam
      }).then((b) => {
        u.loading = !1, u.data = b.data.data, u.data.forEach((P) => {
          P.checked = P.id == l.value.id;
        }), u.total = b.data.total, h();
      }).catch(() => {
        u.loading = !1;
      });
    };
    f();
    const w = (S, b) => {
      S ? l.value.id = b.id : l.value.id = 0, h();
    }, h = () => {
      nextTick(() => {
        for (let S = 0; S < u.data.length; S++)
          u.data[S].checked = !1, l.value.id == u.data[S].id && (u.data[S].checked = !0, Object.assign(l.value, u.data[S]));
      });
    }, _ = (S) => {
      S && (S.resetFields(), f());
    }, y = () => {
      if (l.value.id == 0) {
        ElMessage({
          type: "warning",
          message: `${t$1("请选择页面")}`
        });
        return;
      }
      l.value = {
        id: l.value.id,
        name: l.value.name,
        parent: l.value.parent,
        title: l.value.title,
        url: l.value.url
      }, v.value = !1;
    };
    return i({
      show: g,
      showDialog: v
    }), (S, b) => {
      const P = resolveComponent("Close"), C = resolveComponent("el-icon"), k = resolveComponent("ArrowRight"), E = resolveComponent("el-input"), $ = resolveComponent("el-checkbox"), T = resolveComponent("el-table-column"), x = resolveComponent("el-table"), j = resolveComponent("el-pagination"), O = resolveComponent("el-button"), I = resolveComponent("el-dialog"), M = resolveDirective("loading");
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", { onClick: g }, [
          renderSlot(S.$slots, "default", {}, () => [
            createVNode(E, {
              modelValue: l.value.title,
              "onUpdate:modelValue": b[0] || (b[0] = (A) => l.value.title = A),
              placeholder: unref(t$1)("请选择跳转页面"),
              readonly: "",
              class: "link-input"
            }, {
              suffix: withCtx(() => [
                createElementVNode("div", {
                  onClick: withModifiers(c, ["stop"])
                }, [
                  l.value.name ? (openBlock(), createBlock(C, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(P)
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(C, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(k)
                    ]),
                    _: 1
                  }))
                ], 8, _hoisted_1$1)
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ], !0)
        ]),
        createVNode(I, {
          modelValue: v.value,
          "onUpdate:modelValue": b[5] || (b[5] = (A) => v.value = A),
          title: unref(t$1)("页面选择"),
          width: "850px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: withCtx(() => [
            createElementVNode("span", _hoisted_3, [
              createVNode(O, {
                onClick: b[4] || (b[4] = (A) => v.value = !1)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t$1)("cancel")), 1)
                ]),
                _: 1
              }),
              createVNode(O, {
                type: "primary",
                onClick: y
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t$1)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            withDirectives((openBlock(), createBlock(x, {
              data: u.data,
              size: "large",
              ref_key: "timeListTableRef",
              ref: m,
              "max-height": "400"
            }, {
              empty: withCtx(() => [
                createElementVNode("span", null, toDisplayString(u.loading ? "" : unref(t$1)("emptyData")), 1)
              ]),
              default: withCtx(() => [
                createVNode(T, { "min-width": "7%" }, {
                  default: withCtx(({ row: A }) => [
                    createVNode($, {
                      modelValue: A.checked,
                      "onUpdate:modelValue": (D) => A.checked = D,
                      onChange: (D) => w(D, A)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 1
                }),
                createVNode(T, {
                  prop: "page_title",
                  label: unref(t$1)("页面名称"),
                  "min-width": "25%"
                }, null, 8, ["label"]),
                createVNode(T, {
                  prop: "type_name",
                  label: unref(t$1)("页面类型"),
                  "min-width": "25%"
                }, null, 8, ["label"]),
                createVNode(T, {
                  prop: "url",
                  label: unref(t$1)("页面路径"),
                  "min-width": "25%"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [M, u.loading]
            ]),
            createElementVNode("div", _hoisted_2, [
              createVNode(j, {
                "current-page": u.page,
                "onUpdate:currentPage": b[1] || (b[1] = (A) => u.page = A),
                "page-size": u.limit,
                "onUpdate:pageSize": b[2] || (b[2] = (A) => u.limit = A),
                layout: "total, sizes, prev, pager, next, jumper",
                total: u.total,
                onSizeChange: b[3] || (b[3] = (A) => f()),
                onCurrentChange: f
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}), index_vue_vue_type_style_index_0_scoped_0e4db2d0_lang = "", index$3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0e4db2d0"]]), index$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$3
}, Symbol.toStringTag, { value: "Module" })), geometry = {};
let currentMap = null;
const setMapInstance = (r) => {
  currentMap = r;
}, createCircle = (r, i, s, a) => {
  const c = window.T;
  if (!c)
    return null;
  i.radius = i.radius ?? 1e3, i.center = i.center ?? { lat: r.getCenter().lat, lng: r.getCenter().lng };
  const d = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], l = {
    color: i.color || `rgba(${d.toString()}, .4)`,
    weight: i.weight || 3,
    opacity: i.opacity || 0.8,
    fillColor: i.fillColor || `rgba(${d.toString()}, .4)`,
    fillOpacity: i.fillOpacity || 0.3
  }, p = new c.Circle(new c.LngLat(i.center.lng, i.center.lat), i.radius, l);
  if (geometry[i.key])
    try {
      geometry[i.key].editTimer && clearTimeout(geometry[i.key].editTimer), r.removeOverLay(geometry[i.key].graphical);
    } catch {
    }
  r.addOverLay(p);
  const u = { ...i };
  let m = { ...u.center }, v = u.radius;
  const g = () => {
    var w;
    p.isEditable() && ((w = geometry[u.key]) != null && w.editTimer && clearTimeout(geometry[u.key].editTimer), geometry[u.key].editTimer = setTimeout(() => {
      const h = p.getCenter(), _ = p.getRadius();
      (h.lng !== m.lng || h.lat !== m.lat) && (u.center = { lat: h.lat, lng: h.lng }, m = { ...u.center }, s && s(u)), _ !== v && (u.radius = _, v = _, s && s(u));
    }, 200));
  }, f = () => {
    a && a(u.key);
  };
  return r.addEventListener("touchend", g), r.addEventListener("mouseup", g), p.addEventListener("click", f), geometry[u.key] = { graphical: p, handleTouchEnd: g, handleClick: f, originalStyle: l }, p;
}, createRectangle = (r, i) => {
  const s = window.T;
  if (!s)
    return null;
  const { lat: a, lng: c } = r.getCenter();
  i.bounds = i.bounds ?? {
    southwest: { lat: a - 5e-3, lng: c - 5e-3 },
    northeast: { lat: a + 5e-3, lng: c + 5e-3 }
  };
  const d = [
    new s.LngLat(i.bounds.southwest.lng, i.bounds.southwest.lat),
    new s.LngLat(i.bounds.northeast.lng, i.bounds.southwest.lat),
    new s.LngLat(i.bounds.northeast.lng, i.bounds.northeast.lat),
    new s.LngLat(i.bounds.southwest.lng, i.bounds.northeast.lat)
  ], l = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], p = new s.Polygon(d, {
    color: i.color || `rgba(${l.toString()}, .4)`,
    weight: i.weight || 3,
    opacity: i.opacity || 0.8,
    fillColor: i.fillColor || `rgba(${l.toString()}, .4)`,
    fillOpacity: i.fillOpacity || 0.3
  });
  return r.addOverLay(p), geometry[i.key] = { graphical: p }, p;
}, createPolygon = (r, i, s, a) => {
  const c = window.T;
  if (!c)
    return null;
  const { lat: d, lng: l } = r.getCenter();
  i.paths = i.paths ?? [
    { lat: d + 0.01, lng: l + 0.01 },
    { lat: d - 0.01, lng: l + 0.01 },
    { lat: d - 0.01, lng: l - 0.01 },
    { lat: d + 0.01, lng: l - 0.01 }
  ];
  const p = i.paths.map((_) => new c.LngLat(_.lng, _.lat)), u = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], m = {
    color: i.color || `rgba(${u.toString()}, .4)`,
    weight: i.weight || 3,
    opacity: i.opacity || 0.8,
    fillColor: i.fillColor || `rgba(${u.toString()}, .4)`,
    fillOpacity: i.fillOpacity || 0.3
  }, v = new c.Polygon(p, m);
  if (geometry[i.key])
    try {
      geometry[i.key].editTimer && clearTimeout(geometry[i.key].editTimer), r.removeOverLay(geometry[i.key].graphical);
    } catch {
    }
  r.addOverLay(v);
  let g = JSON.parse(JSON.stringify(i.paths));
  const f = { ...i }, w = () => {
    var _;
    v.isEditable() && ((_ = geometry[f.key]) != null && _.editTimer && clearTimeout(geometry[f.key].editTimer), geometry[f.key].editTimer = setTimeout(() => {
      try {
        const y = v.getLngLats();
        if (Array.isArray(y)) {
          let S = y;
          Array.isArray(y[0]) && (S = y[0]);
          const b = S.map((C) => Array.isArray(C) ? {
            lat: C[1],
            lng: C[0]
          } : {
            lat: C.lat,
            lng: C.lng
          });
          JSON.stringify(b) !== JSON.stringify(g) && (f.paths = b, g = JSON.parse(JSON.stringify(f.paths)), s && s(f));
        } else
          console.error("curLngLats 不是数组:", y);
      } catch (y) {
        console.error("获取多边形路径失败:", y);
      }
    }, 200));
  }, h = () => {
    a && a(f.key);
  };
  return r.addEventListener("touchend", w), r.addEventListener("mouseup", w), v.addEventListener("click", h), geometry[f.key] = { graphical: v, handleTouchEnd: w, handleClick: h, originalStyle: m }, v;
}, deleteGeometry = (r, i) => {
  if (geometry[i])
    try {
      window.T && geometry[i].graphical && (geometry[i].editTimer && clearTimeout(geometry[i].editTimer), geometry[i].handleTouchEnd && (r.removeEventListener("touchend", geometry[i].handleTouchEnd), r.removeEventListener("mouseup", geometry[i].handleTouchEnd)), geometry[i].handleClick && geometry[i].graphical.removeEventListener("click", geometry[i].handleClick), r.removeOverLay(geometry[i].graphical)), delete geometry[i];
    } catch (s) {
      console.warn("删除图形失败:", s);
    }
}, clearAllGeometry = (r) => {
  window.T && (Object.keys(geometry).forEach((s) => {
    geometry[s].editTimer && clearTimeout(geometry[s].editTimer), geometry[s].handleTouchEnd && (r.removeEventListener("touchend", geometry[s].handleTouchEnd), r.removeEventListener("mouseup", geometry[s].handleTouchEnd)), geometry[s].handleClick && geometry[s].graphical.removeEventListener("click", geometry[s].handleClick);
  }), r.clearOverLays()), Object.keys(geometry).forEach((s) => delete geometry[s]);
}, selectGeometry = (r) => {
  var i, s, a;
  if ((i = geometry[r]) != null && i.graphical)
    try {
      deselectAllGeometry(), (a = (s = geometry[r].graphical).setSelected) == null || a.call(s, !0), geometry[r].graphical.enableEdit();
      const c = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      ];
      geometry[r].graphical.setStyle({
        color: "#1890ff",
        // 选中时的边框颜色
        weight: 2,
        // 选中时的边框宽度
        opacity: 1,
        // 选中时的边框透明度
        fillColor: `rgba(${c.toString()}, .6)`,
        // 选中时的填充颜色
        fillOpacity: 1
        // 选中时的填充透明度
      });
    } catch (c) {
      console.error("选中图形失败:", c);
    }
}, deselectAllGeometry = () => {
  Object.keys(geometry).forEach((r) => {
    var i, s, a, c, d, l, p;
    try {
      (a = (s = (i = geometry[r]) == null ? void 0 : i.graphical) == null ? void 0 : s.setSelected) == null || a.call(s, !1), (l = (d = (c = geometry[r]) == null ? void 0 : c.graphical) == null ? void 0 : d.disableEdit) == null || l.call(d), (p = geometry[r]) != null && p.originalStyle && geometry[r].graphical.setStyle(geometry[r].originalStyle);
    } catch (u) {
      console.warn("取消选中图形失败:", u);
    }
  });
}, createMarker = (r) => {
  const i = window.T;
  if (!i)
    return null;
  const { lat: s, lng: a } = r.getCenter(), c = new i.Marker(new i.LngLat(a, s));
  return r.addOverLay(c), c;
}, latLngToAddress = (r) => new Promise((i, s) => {
  const a = window.T;
  if (!a) {
    s(new Error("天地图服务未加载"));
    return;
  }
  const c = new a.Geocoder(), d = new a.LngLat(r.lng, r.lat);
  c.getLocation(d, (l) => {
    if (l && l.status === "0") {
      const p = l.addressComponent || {};
      let u = "";
      if (l.formattedAddress)
        u = l.formattedAddress;
      else if (l.address)
        u = l.address;
      else {
        const v = [];
        p.road && v.push(p.road), p.address && v.push(p.address), p.poi && v.push(p.poi), u = v.join("");
      }
      const m = {
        location: { lat: r.lat, lng: r.lng },
        address: p ? `${p.province || ""}${p.city || ""}${p.county || ""}` : "",
        formatted_addresses: {
          recommend: u
        },
        address_component: {
          province: p.province || "",
          city: p.city || "",
          district: p.county || "",
          street: p.road || "",
          street_number: p.address || ""
        },
        addressComponent: p,
        formatted_address: u
      };
      i(m);
    } else
      s(new Error((l == null ? void 0 : l.msg) || "地址解析失败"));
  });
}), addressToLatLng = (r) => new Promise((i, s) => {
  const a = window.T;
  if (!a) {
    s(new Error("天地图服务未加载"));
    return;
  }
  new a.Geocoder().getPoint(r.address, (d) => {
    if (d && d.status === "0" && d.location) {
      const l = d.location.lat, p = d.location.lon || d.location.lng;
      l && p ? i({ lat: l, lng: p }) : s(new Error("坐标解析失败"));
    } else
      s(new Error((d == null ? void 0 : d.msg) || "未找到该地址"));
  });
}), _hoisted_1 = ["id"], MAP_INIT_DELAY = 500, MAP_SEARCH_TIMEOUT = 5e3, MAP_SEARCH_INTERVAL = 100, MAP_SEARCH_MAX_ATTEMPTS = 50, _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    containerId: { default: "map-container" },
    containerClass: { default: "w-[800px] h-[500px] relative border border-gray-300" },
    containerStyle: { default: "" },
    longitude: { default: 116.397463 },
    latitude: { default: 39.909187 },
    zoom: { default: 14 },
    selectedKey: { default: "" },
    disabledClickMarker: { default: !1 }
  },
  emits: ["update:longitude", "update:latitude", "locationChange", "areaChange", "selectChange"],
  setup(r, { expose: i, emit: s }) {
    const a = r, c = s, d = ref(!0), l = ref(""), p = ref("tianditu");
    let u = null, m = null;
    const v = ref([]), g = () => getMap({
      need_encrypt: !1
    }).then(($) => {
      p.value = $.data.map_type || "tianditu", l.value = p.value === "tianditu" ? $.data.tianditu_map_web_key : $.data.key;
    }).catch(($) => {
      d.value = !1, ElMessage.error(t$1("获取地图配置失败"));
    }), f = () => {
      const $ = document.createElement("script");
      $.src = "https://map.qq.com/api/gljs?libraries=tools,service&v=1.exp&key=" + l.value, document.body.appendChild($), $.onload = () => {
        setTimeout(() => {
          const T = window.TMap;
          if (T) {
            const x = a.longitude ? Number(a.longitude) : 116.397463, j = a.latitude ? Number(a.latitude) : 39.909187, O = new T.LatLng(j, x);
            u = new T.Map(a.containerId, { center: O, zoom: a.zoom }), u.on("tilesloaded", () => d.value = !1), m = createMarker$1(u), a.disabledClickMarker || u.on("click", (I) => {
              const M = I == null ? void 0 : I.latLng;
              if (!M)
                return;
              const A = typeof M.getLat == "function" ? M.getLat() : M.lat, D = typeof M.getLng == "function" ? M.getLng() : M.lng;
              if (A == null || D == null || Number.isNaN(A) || Number.isNaN(D))
                return;
              const L = new T.LatLng(A, D);
              u.setZoom(16), u.setCenter(L), m.updateGeometries({ id: "center", position: L }), nextTick(() => {
                _(A, D);
              });
            }), a.latitude && a.longitude && _(j, x);
          } else
            d.value = !1, ElMessage.error(t$1("腾讯地图加载失败"));
        }, MAP_INIT_DELAY);
      }, $.onerror = () => {
        d.value = !1, ElMessage.error(t$1("腾讯地图脚本加载失败"));
      };
    }, w = () => {
      const $ = document.createElement("script");
      $.src = "https://api.tianditu.gov.cn/api?v=4.0&tk=" + l.value, document.body.appendChild($), $.onload = () => {
        setTimeout(() => {
          const T = window.T;
          if (T) {
            const x = a.longitude ? Number(a.longitude) : 116.397463, j = a.latitude ? Number(a.latitude) : 39.909187;
            u = new T.Map(a.containerId), u.centerAndZoom(new T.LngLat(x, j), a.zoom);
            const O = new T.Control.Zoom();
            u.addControl(O), m = new T.Marker(new T.LngLat(x, j)), u.addOverLay(m), d.value = !1, a.disabledClickMarker || u.addEventListener("click", (I) => {
              const M = I.lnglat;
              if (!M)
                return;
              const A = M.lat, D = M.lng;
              A == null || D == null || Number.isNaN(A) || Number.isNaN(D) || (u.removeOverLay(m), m = new T.Marker(new T.LngLat(D, A)), u.addOverLay(m), u.centerAndZoom(new T.LngLat(D, A), 16), nextTick(() => {
                _(A, D);
              }));
            }), a.latitude && a.longitude && _(j, x);
          } else
            d.value = !1, ElMessage.error(t$1("天地图加载失败"));
        }, MAP_INIT_DELAY);
      }, $.onerror = () => {
        d.value = !1, ElMessage.error(t$1("天地图加载失败，请检查密钥配置"));
      };
    }, h = () => {
      if (!l.value) {
        d.value = !1;
        return;
      }
      u || (p.value === "tencent" ? f() : p.value === "tianditu" && w());
    }, _ = ($, T) => {
      c("update:longitude", String(T)), c("update:latitude", String($)), p.value === "tencent" ? latLngToAddress$1({ mapKey: l.value, lat: $, lng: T }).then(({ message: x, result: j }) => {
        (x == "query ok" || x == "Success") && c("locationChange", { lat: $, lng: T, address: j });
      }) : p.value === "tianditu" && latLngToAddress({ mapKey: l.value, lat: $, lng: T }).then((x) => {
        c("locationChange", { lat: $, lng: T, address: x });
      }).catch((x) => {
        ElMessage.error(x.message || t$1("地址解析失败"));
      });
    }, y = ($, T) => {
      if (!(!u || !m)) {
        if (p.value === "tencent") {
          const x = window.TMap;
          if (!x)
            return;
          const j = new x.LatLng($, T);
          u.setZoom(16), u.setCenter(j), m.updateGeometries({ id: "center", position: j });
        } else if (p.value === "tianditu") {
          const x = window.T;
          if (!x)
            return;
          const j = new x.LngLat(T, $);
          u.removeOverLay(m), m = new x.Marker(j), u.addOverLay(m), u.centerAndZoom(j, 16);
        }
      }
    }, S = ($) => new Promise((T, x) => {
      if (!l.value) {
        x(new Error(t$1("地图配置未加载")));
        return;
      }
      (() => new Promise((O, I) => {
        if (u) {
          O();
          return;
        }
        let M = 0;
        const A = setInterval(() => {
          M++, u ? (clearInterval(A), O()) : M > MAP_SEARCH_MAX_ATTEMPTS && (clearInterval(A), I(new Error(t$1("地图初始化超时"))));
        }, MAP_SEARCH_INTERVAL);
      }))().then(() => {
        if (p.value === "tencent") {
          const O = window.TMap;
          if (!(O != null && O.service)) {
            x(new Error(t$1("腾讯地图服务未加载")));
            return;
          }
          new O.service.Geocoder({ key: l.value }).getLocation({ address: $ }).then((M) => {
            var A;
            if (M.status === 0 && ((A = M.result) != null && A.location)) {
              const D = M.result.location, L = Number(D.lat), N = Number(D.lng);
              y(L, N), T({ lat: L, lng: N });
            } else
              x(new Error(M.message || t$1("未找到该地址")));
          }).catch((M) => {
            x(M);
          });
        } else if (p.value === "tianditu") {
          const O = window.T;
          if (!O) {
            x(new Error(t$1("天地图服务未加载")));
            return;
          }
          new O.Geocoder().getPoint($, (M) => {
            if (M && M.status === "0" && M.location) {
              const A = M.location.lat, D = M.location.lon || M.location.lng;
              A && D ? (y(A, D), T({ lat: A, lng: D })) : x(new Error(t$1("坐标解析失败")));
            } else
              x(new Error((M == null ? void 0 : M.msg) || t$1("未找到该地址")));
          });
        }
      }).catch(x);
    }), b = ($, T = 1e3, x) => {
      if (!u)
        return null;
      const j = (x == null ? void 0 : x.key) || `circle_${Date.now()}`;
      let O = null;
      const I = { key: j, center: $, radius: T, ...x };
      return p.value === "tencent" ? (createCircle$1(u, I, (M) => {
        c("selectChange", M);
      }), O = { key: j, geometriesData: I }) : (O = createCircle(u, I, (M) => {
        c("areaChange", {
          key: M.key,
          type: "circle",
          path: {
            key: M.key,
            center: M.center,
            radius: M.radius
          }
        });
      }, (M) => {
        c("selectChange", M);
      }), O && (O.geometriesData = I)), O && v.value.push(O), O;
    }, P = ($, T) => {
      if (!u)
        return null;
      const x = (T == null ? void 0 : T.key) || `poly_${Date.now()}`;
      let j = null;
      const O = { key: x, paths: $, ...T };
      return p.value === "tencent" ? (createPolygon$1(u, O, (I) => {
        c("selectChange", I);
      }), j = { key: x, geometriesData: O }) : (j = createPolygon(u, O, (I) => {
        c("areaChange", {
          key: I.key,
          type: "polygon",
          path: {
            key: I.key,
            paths: I.paths.map((M) => ({
              lat: M.lat,
              lng: M.lng
            }))
          }
        });
      }, (I) => {
        c("selectChange", I);
      }), j && (j.geometriesData = O)), j && v.value.push(j), j;
    }, C = ($) => {
      if (!u || !$)
        return;
      const T = $.key || "";
      p.value === "tencent" ? deleteGeometry$1(T) : deleteGeometry(u, T);
      const x = v.value.findIndex((j) => j.key === T);
      x > -1 && v.value.splice(x, 1);
    }, k = () => {
      u && (p.value === "tencent" ? v.value.forEach(($) => deleteGeometry$1($.key)) : clearAllGeometry(u), v.value = []);
    }, E = ($) => {
      p.value === "tencent" ? selectGeometry$1($) : selectGeometry($);
    };
    return watch(() => a.selectedKey, ($) => {
      $ && E($);
    }), watch([l, p], ([$, T]) => {
      $ && T && h();
    }), onMounted(() => {
      g();
    }), onBeforeUnmount(() => {
      if (u) {
        try {
          p.value === "tencent" ? u.destroy && u.destroy() : p.value === "tianditu" && (k(), u.clearOverLays && u.clearOverLays());
        } catch {
        }
        u = null, m = null, v.value = [];
      }
    }), i({
      updateLocation: y,
      searchAddress: S,
      addCircle: b,
      addPolygon: P,
      removeOverlay: C,
      clearOverlays: k,
      selectGeometry: E,
      getMap: () => u,
      getMarker: () => m,
      handleLocationChange: _
    }), ($, T) => {
      const x = resolveDirective("loading");
      return withDirectives((openBlock(), createElementBlock("div", {
        id: $.containerId,
        class: normalizeClass($.containerClass),
        style: normalizeStyle($.containerStyle)
      }, null, 14, _hoisted_1)), [
        [x, d.value]
      ]);
    };
  }
}), index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
function camelize(r) {
  return r.replace(/-(\w)/g, function(i, s) {
    return s ? s.toUpperCase() : "";
  });
}
function withInstall(r) {
  return r.install = function(i) {
    var s = r, a = s.name;
    i.component(a, r), i.component(camelize("-" + a), r);
  }, r;
}
var LoadEvent = /* @__PURE__ */ function() {
  function r() {
    this.listeners = {};
  }
  var i = r.prototype;
  return i.on = function(a, c) {
    this.listeners[a] === void 0 && (this.listeners[a] = {
      triggered: !1,
      requested: !1,
      cbs: []
    }), this.listeners[a].triggered && c(), this.listeners[a].cbs.push(c);
  }, i.emit = function(a) {
    this.listeners[a] && (this.listeners[a].triggered = !0, this.listeners[a].cbs.forEach(function(c) {
      return c();
    }));
  }, r;
}();
function debounce(r, i) {
  var s, a = function() {
    for (var d = this, l = arguments.length, p = new Array(l), u = 0; u < l; u++)
      p[u] = arguments[u];
    s && clearTimeout(s), s = setTimeout(function() {
      r.apply(d, p);
    }, i);
  };
  return a.cancel = function() {
    s !== void 0 && clearTimeout(s);
  }, a;
}
function asyncSeries(r) {
  return r.reduce(function(i, s) {
    return i.then(s);
  }, Promise.resolve());
}
function randomString(r) {
  for (var i = "abcdefghijklmnopqrstuvwxyz", s = "", a = 0; a < r; a++)
    s += i.charAt(Math.floor(Math.random() * i.length));
  return s;
}
const _VueUeditorWrap = defineComponent({
  name: "vue-ueditor-wrap",
  props: {
    // 手动设置 UEditor ID
    editorId: String,
    // 常用于表单中 http://fex.baidu.com/ueditor/#start-submit
    name: String,
    modelValue: {
      type: String,
      default: ""
    },
    // http://fex.baidu.com/ueditor/#start-config
    config: Object,
    // 监听富文本内容变化的方式
    mode: {
      type: String,
      default: "observer",
      validator: function r(i) {
        return ["observer", "listener"].indexOf(i) !== -1;
      }
    },
    // MutationObserver 的配置 https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    observerOptions: {
      type: Object,
      default: function r() {
        return {
          attributes: !0,
          // 是否监听 DOM 元素的属性变化
          attributeFilter: ["src", "style", "type", "name"],
          // 只有在该数组中的属性值的变化才会监听
          characterData: !0,
          // 是否监听文本节点
          childList: !0,
          // 是否监听子节点
          subtree: !0
          // 是否监听后代元素
        };
      }
    },
    // MutationObserver 的回调函数防抖间隔
    observerDebounceTime: {
      type: Number,
      default: 50,
      validator: function r(i) {
        return i >= 20;
      }
    },
    //  SSR 项目，服务端实例化组件时组件内部不会对 UEditor 进行初始化，仅在客户端初始化 UEditor，这个参数设置为 true 可以跳过环境检测，直接初始化
    forceInit: Boolean,
    // 是否在组建销毁时销毁 UEditor 实例
    destroy: {
      type: Boolean,
      default: !0
    },
    // 指定 UEditor 依赖的静态资源，js & css
    editorDependencies: {
      type: Array
    },
    // 检测依赖的静态资源是否加载完成的方法
    editorDependenciesChecker: {
      type: Function
    }
  },
  emits: ["update:modelValue", "before-init", "ready"],
  setup: function r(i, s) {
    var a = s.emit, c = {
      UN_READY: "UN_READY",
      // 尚未初始化
      PENDING: "PENDING",
      // 开始初始化但尚未 ready
      READY: "READY"
      // 初始化完成并已 ready
    }, d = c.UN_READY, l, p, u, m = ref(), v = ["ueditor.config.js", "ueditor.all.min.js"], g = function() {
      return window.UE && window.UE.getEditor && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0;
    }, f = toRef(i, "modelValue");
    window.$loadEventBus || (window.$loadEventBus = new LoadEvent());
    var w = function(E) {
      return new Promise(function($, T) {
        if (window.$loadEventBus.on(E, $), window.$loadEventBus.listeners[E].requested === !1) {
          window.$loadEventBus.listeners[E].requested = !0;
          var x = document.createElement("script");
          x.src = E, x.onload = function() {
            window.$loadEventBus.emit(E);
          }, x.onerror = T, document.getElementsByTagName("head")[0].appendChild(x);
        }
      });
    }, h = function(E) {
      return new Promise(function($, T) {
        if (window.$loadEventBus.on(E, $), window.$loadEventBus.listeners[E].requested === !1) {
          window.$loadEventBus.listeners[E].requested = !0;
          var x = document.createElement("link");
          x.type = "text/css", x.rel = "stylesheet", x.href = E, x.onload = function() {
            window.$loadEventBus.emit(E);
          }, x.onerror = T, document.getElementsByTagName("head")[0].appendChild(x);
        }
      });
    }, _ = function() {
      return new Promise(function(E, $) {
        if (i.editorDependencies && i.editorDependenciesChecker && i.editorDependenciesChecker()) {
          E();
          return;
        }
        if (!i.editorDependencies && g()) {
          E();
          return;
        }
        var T = (i.editorDependencies || v).reduce(function(O, I) {
          var M = /^((https?:)?\/\/)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+\//.test(I);
          if (!M) {
            var A;
            I = (((A = i.config) == null ? void 0 : A.UEDITOR_HOME_URL) || "") + I;
          }
          return I.slice(-3) === ".js" ? O.jsLinks.push(I) : I.slice(-4) === ".css" && O.cssLinks.push(I), O;
        }, {
          jsLinks: [],
          cssLinks: []
        }), x = T.jsLinks, j = T.cssLinks;
        Promise.all([
          Promise.all(j.map(function(O) {
            return h(O);
          })),
          // 依次加载依赖的 JS 文件，JS 执行是有顺序要求的，比如 ueditor.all.js 就要晚于 ueditor.config.js 执行
          // 动态创建 script 是先加载完的先执行，所以不可以一次性创建所有资源的引入脚本
          asyncSeries(x.map(function(O) {
            return function() {
              return w(O);
            };
          }))
        ]).then(function() {
          return E();
        }).catch($);
      });
    }, y = function() {
      u = l.getContent(), a("update:modelValue", u);
    }, S = function() {
      l.addListener("contentChange", y);
    }, b = function() {
      l.document.getElementById("baidu_pastebin") || (u = l.getContent(), a("update:modelValue", u));
    }, P = function() {
      p = new MutationObserver(debounce(b, i.observerDebounceTime)), p.observe(l.body, i.observerOptions);
    }, C = function() {
      var E = i.editorId || "editor_" + randomString(8);
      m.value.id = E, a("before-init", E), l = window.UE.getEditor(E, i.config), l.addListener("ready", function() {
        d === c.READY ? l.setContent(i.modelValue) : (d = c.READY, a("ready", l), i.modelValue && l.setContent(i.modelValue)), i.mode === "observer" && window.MutationObserver ? P() : S();
      });
    };
    return watch(f, function(k) {
      d === c.UN_READY ? (d = c.PENDING, (i.forceInit || typeof window < "u") && _().then(function() {
        m.value ? C() : nextTick(function() {
          return C();
        });
      }).catch(function() {
        throw new Error("[vue-ueditor-wrap] UEditor 资源加载失败！请检查资源是否存在，UEDITOR_HOME_URL 是否配置正确！");
      })) : d === c.READY && (k === u || l.setContent(k || ""));
    }, {
      immediate: !0
    }), onDeactivated(function() {
      l && l.removeListener("contentChange", y), p && p.disconnect();
    }), onBeforeUnmount(function() {
      p && p.disconnect && p.disconnect(), i.destroy && l && l.destroy && l.destroy();
    }), function() {
      return createVNode("div", null, [createVNode("div", {
        ref: m,
        name: i.name
      }, null)]);
    };
  }
});
var VueUeditorWrap = withInstall(_VueUeditorWrap);
const VueUeditorWrap$1 = VueUeditorWrap;
var version = "3.0.8";
function install(r) {
  var i = [VueUeditorWrap$1];
  i.forEach(function(s) {
    s.install ? r.use(s) : s.name && r.component(s.name, s);
  });
}
const index$1 = {
  install,
  version
}, _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "simple"
    },
    height: {
      type: Number,
      default: 600
    }
  },
  emits: ["update:modelValue", "handleBlur"],
  setup(r, { emit: i }) {
    const s = ref(), a = r, c = i, d = ref(null), l = ref(null), p = computed({
      get() {
        return a.modelValue;
      },
      set(y) {
        c("update:modelValue", y);
      }
    });
    let u = null;
    const m = {};
    m[envConfig.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken(), m[envConfig.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get("siteId") || 0;
    const v = envConfig.VITE_APP_BASE_URL || "/adminapi/", g = v.endsWith("/") ? v : `${v}/`, f = ref({
      debug: !1,
      UEDITOR_HOME_URL: "/admin/ueditor/",
      UEDITOR_CORS_URL: location.origin + "/admin/ueditor/",
      serverUrl: `${g}sys/ueditor`,
      serverHeaders: m,
      // 编辑器不自动被内容撑高
      autoHeightEnabled: !1,
      // 初始容器高度
      initialFrameHeight: a.height,
      // 初始容器宽度
      initialFrameWidth: "100%",
      wordCount: !0,
      toolbarCallback: function(y, S) {
        switch (u = S, y) {
          case "insertimage":
            return d.value.showDialog = !0, !0;
          case "insertvideo":
            return l.value.showDialog = !0, !0;
        }
      }
    }), w = (y) => {
      y.addListener("blur", () => {
        const b = y.getContent();
        c("update:modelValue", b), c("handleBlur", b);
      }), y.addListener("fullscreenchanged", (b, P) => {
        const C = y.ui.getDom();
        P ? C.classList.add("edui-fullscreen") : C.classList.remove("edui-fullscreen"), console.log("全屏切换", P);
      });
      const S = y.getContentLength;
      y.getContentLength = function() {
        return y.getContent().replace(/[\s\u3000]+/g, "").length;
      };
    }, h = (y) => {
      y.forEach((S) => {
        u == null || u.execCommand("insertHtml", `<img src="${img(S.url)}">`);
      });
    }, _ = (y) => {
      u == null || u.execCommand("insertHtml", `<video src="${img(y.url)}">`);
    };
    return (y, S) => {
      const b = resolveComponent("upload-attachment");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(b, {
          type: "image",
          ref_key: "imageRef",
          ref: d,
          limit: "",
          onConfirm: h
        }, null, 512),
        createVNode(b, {
          type: "video",
          ref_key: "videoRef",
          ref: l,
          onConfirm: _
        }, null, 512),
        createVNode(unref(VueUeditorWrap$1), {
          modelValue: p.value,
          "onUpdate:modelValue": S[0] || (S[0] = (P) => p.value = P),
          config: f.value,
          editorDependencies: ["ueditor.config.js", "ueditor.all.js"],
          ref_key: "editorRef",
          ref: s,
          mode: "observer",
          onReady: w
        }, null, 8, ["modelValue", "config", "editorDependencies"])
      ], 64);
    };
  }
}), index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  addVersion$1 as $,
  getUserList$1 as A,
  lockUser as B,
  unlockUser as C,
  deleteUser$1 as D,
  allRole as E,
  getAllUserList as F,
  editUser$1 as G,
  addUser$1 as H,
  deepClone as I,
  getUserInfo$1 as J,
  getAliappConfig as K,
  getAliappStatic as L,
  useClipboard as M,
  setAliappConfig as N,
  getWechatConfig as O,
  getWxoplatform as P,
  getAuthorizationUrl as Q,
  getAppConfig as R,
  setAppConfig as S,
  getVersionList$1 as T,
  deleteVersion$1 as U,
  releaseVersion as V,
  getBuildLog as W,
  getAppType as X,
  getAppPlatform as Y,
  editVersion$1 as Z,
  _export_sfc as _,
  getShowApp as a,
  getBatchAcquisition as a$,
  getVersionInfo$1 as a0,
  generateSingCert as a1,
  getH5Config as a2,
  getUrl as a3,
  setH5Config as a4,
  getPcConfig as a5,
  setPcConfig as a6,
  getWeappConfig as a7,
  cancelAuthorization as a8,
  getWeappPreview as a9,
  setWeappDomain as aA,
  setWeappPrivacySetting as aB,
  getWeappPrivacySetting as aC,
  setWeappConfig as aD,
  getTemplateList$1 as aE,
  getBatchAcquisition$1 as aF,
  editNoticeStatus as aG,
  strByteLength as aH,
  isUrl as aI,
  envConfig as aJ,
  getToken as aK,
  getMediaList as aL,
  syncNews as aM,
  getWechatStatic as aN,
  editWechatConfig as aO,
  getKeywordsReplyInfo as aP,
  editKeywordsReply as aQ,
  addKeywordsReply as aR,
  getWechatMenu as aS,
  editWechatMenu as aT,
  getDefaultReply as aU,
  getSubscribeReply as aV,
  delKeywordsReply as aW,
  setSubscribeReply as aX,
  setDefaultReply as aY,
  getKeywordsReplyList as aZ,
  getTemplateList as a_,
  getWeappVersionList as aa,
  setWeappVersion as ab,
  getWeappUploadLog as ac,
  undoAudit as ad,
  siteWeappCommit as ae,
  CLOUD_COMPILE_BASE_URL as af,
  fetchWeappUploadLog as ag,
  clearCloudBuildTask as ah,
  getCloudBuildSseUrl as ai,
  startServerDownload as aj,
  getSseBuildLog as ak,
  getCloudBuildTask as al,
  getCloudBuildLog as am,
  preBuildCheck as an,
  cloudBuild as ao,
  request as ap,
  clearUpgradeTask as aq,
  getUpgradeTask as ar,
  executeUpgrade as as,
  preUpgradeCheck as at,
  upgradeAddon as au,
  getUpgradeContent as av,
  upgradeUserOperate as aw,
  getUserInfo$2 as ax,
  setUserInfo as ay,
  Test as az,
  getLogList as b,
  getAccountList as b$,
  setDictData as b0,
  getDictInfo as b1,
  editDict as b2,
  addDict as b3,
  getDictList as b4,
  deleteDict as b5,
  Sortable as b6,
  getDiyPageListByCarouselSearch as b7,
  getDiyBottomList as b8,
  editTheme as b9,
  timeTurnTimeStamp as bA,
  filterDigit as bB,
  getDiyFormSelectPageList as bC,
  getFormType as bD,
  filterNumber as bE,
  getFormSubmitConfig as bF,
  editDiyFormSubmitConfig as bG,
  getMemberLabelAll as bH,
  getMemberLevelAll as bI,
  getFormWriteConfig as bJ,
  editDiyFormWriteConfig as bK,
  initPage as bL,
  getDiyTemplatePages as bM,
  editDiyForm as bN,
  addDiyForm as bO,
  editFormStatus as bP,
  getDiyFormPageList as bQ,
  copyForm as bR,
  deleteDiyForm as bS,
  editDiyFormShare as bT,
  getDiyFormFieldsList as bU,
  getDiyFormFieldStat as bV,
  getFormRecordsInfo as bW,
  deleteFormRecords as bX,
  getFormRecords as bY,
  getFormRecordsMember as bZ,
  getQrcode as b_,
  addTheme as ba,
  getDefaultTheme as bb,
  deleteTheme as bc,
  setDiyTheme as bd,
  initPage$1 as be,
  getDiyTemplatePages$1 as bf,
  editDiyPage as bg,
  addDiyPage as bh,
  getDecoratePage as bi,
  changeTemplate as bj,
  getApps$1 as bk,
  getTablePageStorage as bl,
  getDiyTemplate$1 as bm,
  getDiyPageList as bn,
  setTablePageStorage as bo,
  setUseDiyPage as bp,
  copyDiy$1 as bq,
  deleteDiyPage as br,
  editDiyPageShare as bs,
  getDiyRouteAppList as bt,
  getDiyRouteList as bu,
  getDiyRouteInfo as bv,
  editDiyRouteShare as bw,
  getDiyBottomConfig as bx,
  setDiyBottomConfig as by,
  getDiyTheme as bz,
  getLogInfo as c,
  adjustBalance as c$,
  getAccountType as c0,
  getAccountStat as c1,
  getCashOutStatusList as c2,
  getCashOutStat as c3,
  getTransfertype as c4,
  getCashOutList as c5,
  memberTransfer as c6,
  getCashOutDetail as c7,
  memberAudit as c8,
  memberCancel as c9,
  getSignConfig as cA,
  getMemberGiftsContent as cB,
  setSignConfig as cC,
  getMemberSignList as cD,
  getVerifierList as cE,
  getVerifyInfo as cF,
  deleteVerifier as cG,
  editVerifier as cH,
  addVerifier as cI,
  getMemberList as cJ,
  getVerifyTypeList as cK,
  getVerifyRecord as cL,
  getVerifierSelect as cM,
  getVerifyDetailInfo as cN,
  verify as cO,
  getChangeTypeList as cP,
  getBalanceList as cQ,
  getMoneyList as cR,
  getBalanceSum as cS,
  getBalanceStatus as cT,
  getAccountType$2 as cU,
  getCommissionSum as cV,
  getCommissionList as cW,
  getMemberNo as cX,
  addMember as cY,
  getMemberInfo as cZ,
  adjustPoint as c_,
  memberRemark as ca,
  memberCheck as cb,
  getRefundType as cc,
  getPayRefundInfo as cd,
  getRefundTransfer as ce,
  getPayAuditList as cf,
  payAuditPass as cg,
  payAuditRefuse as ch,
  getPayDetail as ci,
  getRefundStatus as cj,
  getPayRefundPages as ck,
  getWebCopyright as cl,
  useSystemStore as cm,
  getSiteGroup as cn,
  getHomeSite as co,
  createSite as cp,
  findFirstValidRoute as cq,
  getStatInfo as cr,
  deleteAddonDevelop as cs,
  getAuthorizationResult as ct,
  getLoginConfig$1 as cu,
  ADMIN_ROUTE as cv,
  SITE_ROUTE as cw,
  guid as cx,
  getGiftDict as cy,
  getVerifyDetail as cz,
  getMenus as d,
  resetPassword as d$,
  editMemberDetail as d0,
  memberBatchModify as d1,
  updateMemberLabel as d2,
  addMemberLabel as d3,
  getMemberLabelInfo as d4,
  getBenefitsDict as d5,
  getGrowthList as d6,
  getMemberLabelList as d7,
  deleteMemberLabel as d8,
  getMemberLevelPageList as d9,
  addPrinter as dA,
  getPrinterPageList as dB,
  modifyPrinterStatus as dC,
  deletePrinter as dD,
  testPrint as dE,
  refreshPrinterToken as dF,
  getPrinterTemplateInfo as dG,
  editPrinterTemplate as dH,
  addPrinterTemplate as dI,
  getPrinterTemplatePageList as dJ,
  deletePrinterTemplate as dK,
  getConfigLogin as dL,
  setConfigLogin as dM,
  getAgreementList as dN,
  useTabbarStore$1 as dO,
  getAgreementInfo as dP,
  editAgreement as dQ,
  getCashOutConfig as dR,
  setCashOutConfig as dS,
  editNotice as dT,
  editSms as dU,
  getSmsInfo as dV,
  loginAccount as dW,
  getSmsSignConfig as dX,
  registerAccount as dY,
  getSmsCaptcha as dZ,
  getSmsSend as d_,
  deleteMemberLevel as da,
  getMemberLevelInfo as db,
  updateMemberLevel as dc,
  addMemberLevel as dd,
  getRegisterChannelType as de,
  deleteMember as df,
  editMemberStatus as dg,
  getPointSum as dh,
  getPointList as di,
  initPoster as dj,
  getPosterTemplate as dk,
  editPoster as dl,
  addPoster as dm,
  getPreviewPoster as dn,
  getPosterType as dp,
  getPosterPageList as dq,
  modifyPosterStatus as dr,
  modifyPosterDefault as ds,
  deletePoster as dt,
  checkImagick as du,
  getPrinterBrand as dv,
  getPrinterTemplateList as dw,
  getPrinterType as dx,
  getPrinterInfo as dy,
  editPrinter as dz,
  deleteMenu as e,
  getPointRuleConfig as e$,
  getSmsPackagesList as e0,
  calculateOrderPay as e1,
  smsOrderCreate as e2,
  getOrderPayInfo as e3,
  getSmsOrdersList as e4,
  getOrderInfo as e5,
  timeStampTurnTime as e6,
  getSmsSendList as e7,
  addSign as e8,
  getSignList as e9,
  getMap as eA,
  setMap as eB,
  getMemberConfig as eC,
  getDiyFormList as eD,
  setMemberConfig as eE,
  getNoticeList as eF,
  getBindInfo as eG,
  getWechatAuthUrl as eH,
  getWeappAuthUrl$1 as eI,
  cancelBind as eJ,
  sendSms as eK,
  bindSms as eL,
  getNoticeLog as eM,
  getAuthRecord as eN,
  getWeappLastCommitRecord as eO,
  delVersion as eP,
  weappCommit as eQ,
  getWeappCommitRecord as eR,
  getSiteGroupCommitRecord as eS,
  syncSiteWeapp as eT,
  getStatic as eU,
  getConfig as eV,
  editConfig as eW,
  getAllPayType as eX,
  getPayConfigList as eY,
  setPatConfig as eZ,
  getPointRuleDict as e_,
  deleteSign as ea,
  getTemplateList$2 as eb,
  templateSync as ec,
  clearTemplate as ed,
  getTemplateReportConfig as ee,
  getreportTemplateInfo as ef,
  reportTemplate as eg,
  editStorage as eh,
  getStorageInfo as ei,
  getCopyright as ej,
  setCopyright as ek,
  getDeveloperToken as el,
  setDeveloperToken as em,
  getExportStatusList as en,
  getExportKeyList as eo,
  getExportList as ep,
  deleteExport as eq,
  getGrowthRuleDict as er,
  getGrowthRuleConfig as es,
  setGrowthRuleConfig as et,
  getLayout as eu,
  getThemecolor as ev,
  setThemecolor as ew,
  setLayout as ex,
  getLoginConfig as ey,
  setLoginConfig as ez,
  getRoleList as f,
  editAttachmentCategory as f$,
  setPointRuleConfig as f0,
  getSmsList as f1,
  getAccountIsLogin as f2,
  getAccountInfo$2 as f3,
  enableNiusms as f4,
  editAccount as f5,
  getOrderPayStatus as f6,
  getSmsLog as f7,
  getStorageList as f8,
  getWebsite as f9,
  addSiteGroup as fA,
  getsiteCaptcha as fB,
  getSiteAllowChange as fC,
  putSiteAllowChange as fD,
  getStatusList as fE,
  getSiteList as fF,
  closeSite as fG,
  openSite as fH,
  deleteSite as fI,
  initSite as fJ,
  getUserList as fK,
  deleteUser as fL,
  getUserSiteGroupAll as fM,
  getUserCreateSiteLimit as fN,
  delUserCreateSiteLimit as fO,
  getAddontype as fP,
  getAddonDevelopInfo as fQ,
  getAddonKeyBlackList as fR,
  getAddonList as fS,
  getAddonDevelopCheck as fT,
  editAddonDevelop as fU,
  addAddonDevelop as fV,
  addonDevelopBuild as fW,
  addonDevelopDownload as fX,
  getAttachmentCategoryList as fY,
  getAttachmentList as fZ,
  addAttachmentCategory as f_,
  getService as fa,
  setWebsite as fb,
  getTransferInfo as fc,
  setTransferInfo as fd,
  getTransferScene as fe,
  setSceneId as ff,
  setTradeScene as fg,
  getVersionList as fh,
  editVersion as fi,
  addVersion as fj,
  deleteVersion as fk,
  editUserCreateSiteLimit as fl,
  addUserCreateSiteLimit as fm,
  getUserCreateSiteLimitInfo as fn,
  getUserListSelect as fo,
  getSiteGroupAll as fp,
  getSiteInfo as fq,
  editSite as fr,
  addSite as fs,
  getUserInfo as ft,
  editUser as fu,
  addUser as fv,
  getSiteGroupList as fw,
  deleteSiteGroup as fx,
  getSiteGroupInfo as fy,
  editSiteGroup as fz,
  getVersions as g,
  loadCLodop as g$,
  deleteAttachmentCategory as g0,
  deleteAttachment as g1,
  moveAttachment as g2,
  getBackupRecords as g3,
  manualBackup as g4,
  performBackupTasks as g5,
  checkDirExist as g6,
  checkPermission as g7,
  restoreUpgradeBackup as g8,
  performRecoveryTasks as g9,
  addCron as gA,
  deleteCron as gB,
  doCron as gC,
  resetCron as gD,
  getCronLogList as gE,
  deleteCronLog as gF,
  clearCronLog as gG,
  clearCache as gH,
  getUpgradeRecords as gI,
  delUpgradeRecords as gJ,
  getLink as gK,
  exportDataCheck as gL,
  exportData as gM,
  getDefaultExportFromCjs as gN,
  commonjsGlobal as gO,
  getAreaListByPid as gP,
  getAugmentedNamespace as gQ,
  useAppStore as gR,
  useDark as gS,
  useToggle as gT,
  setThemeColor as gU,
  language as gV,
  formatRouters as gW,
  getShowSpecialMenu as gX,
  useFullscreen as gY,
  coreVueModules as gZ,
  resolveAsyncComponent as g_,
  modifyBackupRemark as ga,
  deleteRecords as gb,
  connectTest as gc,
  setLocalUrl as gd,
  getLocalUrl as ge,
  generateTable as gf,
  addGenerateTable as gg,
  getGeneratorAllModel as gh,
  getGeneratorTableColumn as gi,
  getGeneratorModelTableColumn as gj,
  getDictAll as gk,
  useTemplateRefsList as gl,
  getGenerateTableInfo as gm,
  getMenuByTypeDir as gn,
  editGenerateTable as go,
  generatorCheckFile as gp,
  generateCreate as gq,
  getGenerateTableList as gr,
  deleteGenerateTable as gs,
  generatePreview as gt,
  getSystem as gu,
  getCronTemplate as gv,
  getCronDateType as gw,
  getWeek as gx,
  getCronList as gy,
  editCron as gz,
  deleteRole as h,
  index$3 as h$,
  getLodop as h0,
  login as h1,
  logout as h2,
  getAuthMenus as h3,
  getSiteInfo$1 as h4,
  getCloudBuildQueuePosition as h5,
  getCloudCompileLocalUrl as h6,
  setCloudCompileLocalUrl as h7,
  addDictData as h8,
  useDictionary as h9,
  getSiteAddons as hA,
  getAccountInfo as hB,
  getSiteStatInfo as hC,
  getInfo as hD,
  getWebConfig as hE,
  getAuthMenu as hF,
  getEnv as hG,
  getAreatree as hH,
  getAddressInfo as hI,
  getContraryAddress as hJ,
  getAreaByCode as hK,
  getPayConfig as hL,
  setPayConfig as hM,
  getCronInfo as hN,
  getChannelType as hO,
  getSceneDomain as hP,
  clearSchemaCache as hQ,
  getAppMange as hR,
  getWebsiteLayout as hS,
  checkJobStatus as hT,
  getPayList$1 as hU,
  checkUsernameIsExist as hV,
  uploadVersion as hW,
  getIsTradeManaged as hX,
  getWeappAuthUrl as hY,
  getVersionInfo as hZ,
  index$5 as h_,
  getDiyList as ha,
  getDiyPageInfo as hb,
  getPageLink as hc,
  getDiyFormInfo as hd,
  getDiyFormQrcode as he,
  getDiyTemplate as hf,
  getApps as hg,
  copyDiy as hh,
  getRegisterType as hi,
  getMemberBenefitsContent as hj,
  getMemberAddress as hk,
  addMemberAddress as hl,
  editMemberAddress as hm,
  getNoticeInfo as hn,
  getAccountList$1 as ho,
  getAccountStat$1 as hp,
  getPayList as hq,
  pay as hr,
  getFriendsPay as hs,
  getAccountInfo$1 as ht,
  getAccountType$1 as hu,
  getPosterList as hv,
  getPosterInfo as hw,
  getPosterGenerate as hx,
  getPrinterList as hy,
  printTicket as hz,
  img as i,
  _sfc_main$1 as i0,
  _sfc_main as i1,
  useElementIcon as i2,
  setWindowTitle as i3,
  setToken as i4,
  removeToken as i5,
  assetImg as i6,
  urlToRouteRaw as i7,
  moneyFormat as i8,
  getCurrentDataTime as i9,
  filterSpecial as ia,
  filterBlank as ib,
  distance as ic,
  getImageDimensions as id,
  createCircle$1 as ie,
  createPolygon$1 as ig,
  deleteGeometry$1 as ih,
  clearAllGeometry$1 as ii,
  setMapInstance$1 as ij,
  selectGeometry$1 as ik,
  deselectAllGeometry$1 as il,
  createMarker$1 as im,
  latLngToAddress$1 as io,
  addressToLatLng$1 as ip,
  index$9 as iq,
  index$8 as ir,
  addonLoader as is,
  index$6 as it,
  index$4 as iu,
  index$2 as iv,
  index as iw,
  modifyRoleStatus as j,
  getSiteMenus as k,
  logDestroy as l,
  menuRefresh as m,
  debounce$1 as n,
  editRole as o,
  addRole as p,
  getRoleInfo as q,
  getAddonDevelop as r,
  storage as s,
  t$1 as t,
  useUserStore as u,
  getSystemMenu as v,
  getAddonMenu as w,
  editMenu as x,
  addMenu as y,
  getMenuInfo as z
};
