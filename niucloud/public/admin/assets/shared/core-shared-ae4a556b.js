var H = Object.defineProperty;
var K = (i, s, r) => s in i ? H(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r;
var q = (i, s, r) => (K(i, typeof s != "symbol" ? s + "" : s, r), r);
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
function set$2(i, s, r) {
  return Array.isArray(i) ? (i.length = Math.max(i.length, s), i.splice(s, 1, r), r) : (i[s] = r, r);
}
function del$1(i, s) {
  if (Array.isArray(i)) {
    i.splice(s, 1);
    return;
  }
  delete i[s];
}
var __defProp$9$1 = Object.defineProperty, __defProps$6$1 = Object.defineProperties, __getOwnPropDescs$6$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$b$1 = Object.getOwnPropertySymbols, __hasOwnProp$b$1 = Object.prototype.hasOwnProperty, __propIsEnum$b$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$9$1 = (i, s, r) => s in i ? __defProp$9$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$9$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$b$1.call(s, r) && __defNormalProp$9$1(i, r, s[r]);
  if (__getOwnPropSymbols$b$1)
    for (var r of __getOwnPropSymbols$b$1(s))
      __propIsEnum$b$1.call(s, r) && __defNormalProp$9$1(i, r, s[r]);
  return i;
}, __spreadProps$6$1 = (i, s) => __defProps$6$1(i, __getOwnPropDescs$6$1(s));
function computedEager(i, s) {
  var r;
  const a = shallowRef();
  return watchEffect(() => {
    a.value = i();
  }, __spreadProps$6$1(__spreadValues$9$1({}, s), {
    flush: (r = s == null ? void 0 : s.flush) != null ? r : "sync"
  })), readonly(a);
}
var _a;
const isClient = typeof window < "u", isDef = (i) => typeof i < "u", assert = (i, ...s) => {
  i || console.warn(...s);
}, toString = Object.prototype.toString, isBoolean = (i) => typeof i == "boolean", isFunction = (i) => typeof i == "function", isNumber = (i) => typeof i == "number", isString = (i) => typeof i == "string", isObject = (i) => toString.call(i) === "[object Object]", isWindow = (i) => typeof window < "u" && toString.call(i) === "[object Window]", now = () => Date.now(), timestamp = () => +Date.now(), clamp = (i, s, r) => Math.min(r, Math.max(s, i)), noop = () => {
}, rand = (i, s) => (i = Math.ceil(i), s = Math.floor(s), Math.floor(Math.random() * (s - i + 1)) + i), isIOS = isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent), hasOwn = (i, s) => Object.prototype.hasOwnProperty.call(i, s);
function resolveUnref(i) {
  return typeof i == "function" ? i() : unref(i);
}
function createFilterWrapper(i, s) {
  function r(...a) {
    return new Promise((d, c) => {
      Promise.resolve(i(() => s.apply(this, a), { fn: s, thisArg: this, args: a })).then(d).catch(c);
    });
  }
  return r;
}
const bypassFilter = (i) => i();
function debounceFilter(i, s = {}) {
  let r, a, d = noop;
  const c = (p) => {
    clearTimeout(p), d(), d = noop;
  };
  return (p) => {
    const u = resolveUnref(i), m = resolveUnref(s.maxWait);
    return r && c(r), u <= 0 || m !== void 0 && m <= 0 ? (a && (c(a), a = null), Promise.resolve(p())) : new Promise((v, h) => {
      d = s.rejectOnCancel ? h : v, m && !a && (a = setTimeout(() => {
        r && c(r), a = null, v(p());
      }, m)), r = setTimeout(() => {
        a && c(a), a = null, v(p());
      }, u);
    });
  };
}
function throttleFilter(i, s = !0, r = !0, a = !1) {
  let d = 0, c, l = !0, p = noop, u;
  const m = () => {
    c && (clearTimeout(c), c = void 0, p(), p = noop);
  };
  return (h) => {
    const f = resolveUnref(i), w = Date.now() - d, g = () => u = h();
    if (m(), f <= 0)
      return d = Date.now(), g();
    if (w > f && (r || !l))
      d = Date.now(), g();
    else if (s)
      return new Promise((_, y) => {
        p = a ? y : _, c = setTimeout(() => {
          d = Date.now(), l = !0, _(g()), m();
        }, f - w);
      });
    return !r && !c && (c = setTimeout(() => l = !0, f)), l = !1, u;
  };
}
function pausableFilter(i = bypassFilter) {
  const s = ref(!0);
  function r() {
    s.value = !1;
  }
  function a() {
    s.value = !0;
  }
  const d = (...c) => {
    s.value && i(...c);
  };
  return { isActive: readonly(s), pause: r, resume: a, eventFilter: d };
}
function __onlyVue3(i = "this function") {
  if (!isVue3$1)
    throw new Error(`[VueUse] ${i} is only works on Vue 3.`);
}
function __onlyVue27Plus(i = "this function") {
  if (!(isVue3$1 || version$2.startsWith("2.7.")))
    throw new Error(`[VueUse] ${i} is only works on Vue 2.7 or above.`);
}
const directiveHooks = {
  mounted: isVue3$1 ? "mounted" : "inserted",
  updated: isVue3$1 ? "updated" : "componentUpdated",
  unmounted: isVue3$1 ? "unmounted" : "unbind"
};
function promiseTimeout(i, s = !1, r = "Timeout") {
  return new Promise((a, d) => {
    setTimeout(s ? () => d(r) : a, i);
  });
}
function identity(i) {
  return i;
}
function createSingletonPromise(i) {
  let s;
  function r() {
    return s || (s = i()), s;
  }
  return r.reset = async () => {
    const a = s;
    s = void 0, a && await a;
  }, r;
}
function invoke(i) {
  return i();
}
function containsProp(i, ...s) {
  return s.some((r) => r in i);
}
function increaseWithUnit(i, s) {
  var r;
  if (typeof i == "number")
    return i + s;
  const a = ((r = i.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : r[0]) || "", d = i.slice(a.length), c = parseFloat(a) + s;
  return Number.isNaN(c) ? i : c + d;
}
function objectPick(i, s, r = !1) {
  return s.reduce((a, d) => (d in i && (!r || i[d] !== void 0) && (a[d] = i[d]), a), {});
}
function computedWithControl(i, s) {
  let r, a, d;
  const c = ref(!0), l = () => {
    c.value = !0, d();
  };
  watch(i, l, { flush: "sync" });
  const p = isFunction(s) ? s : s.get, u = isFunction(s) ? void 0 : s.set, m = customRef((v, h) => (a = v, d = h, {
    get() {
      return c.value && (r = p(), c.value = !1), a(), r;
    },
    set(f) {
      u == null || u(f);
    }
  }));
  return Object.isExtensible(m) && (m.trigger = l), m;
}
function tryOnScopeDispose(i) {
  return getCurrentScope() ? (onScopeDispose(i), !0) : !1;
}
function createEventHook() {
  const i = [], s = (d) => {
    const c = i.indexOf(d);
    c !== -1 && i.splice(c, 1);
  };
  return {
    on: (d) => {
      i.push(d);
      const c = () => s(d);
      return tryOnScopeDispose(c), {
        off: c
      };
    },
    off: s,
    trigger: (d) => {
      i.forEach((c) => c(d));
    }
  };
}
function createGlobalState(i) {
  let s = !1, r;
  const a = effectScope(!0);
  return () => (s || (r = a.run(i), s = !0), r);
}
function createInjectionState(i) {
  const s = Symbol("InjectionState");
  return [(...d) => {
    const c = i(...d);
    return provide(s, c), c;
  }, () => inject(s)];
}
function createSharedComposable(i) {
  let s = 0, r, a;
  const d = () => {
    s -= 1, a && s <= 0 && (a.stop(), r = void 0, a = void 0);
  };
  return (...c) => (s += 1, r || (a = effectScope(!0), r = a.run(() => i(...c))), tryOnScopeDispose(d), r);
}
function extendRef(i, s, { enumerable: r = !1, unwrap: a = !0 } = {}) {
  __onlyVue27Plus();
  for (const [d, c] of Object.entries(s))
    d !== "value" && (isRef(c) && a ? Object.defineProperty(i, d, {
      get() {
        return c.value;
      },
      set(l) {
        c.value = l;
      },
      enumerable: r
    }) : Object.defineProperty(i, d, { value: c, enumerable: r }));
  return i;
}
function get(i, s) {
  return s == null ? unref(i) : unref(i)[s];
}
function isDefined(i) {
  return unref(i) != null;
}
var __defProp$8$1 = Object.defineProperty, __getOwnPropSymbols$a$1 = Object.getOwnPropertySymbols, __hasOwnProp$a$1 = Object.prototype.hasOwnProperty, __propIsEnum$a$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$8$1 = (i, s, r) => s in i ? __defProp$8$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$8$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$a$1.call(s, r) && __defNormalProp$8$1(i, r, s[r]);
  if (__getOwnPropSymbols$a$1)
    for (var r of __getOwnPropSymbols$a$1(s))
      __propIsEnum$a$1.call(s, r) && __defNormalProp$8$1(i, r, s[r]);
  return i;
};
function makeDestructurable(i, s) {
  if (typeof Symbol < "u") {
    const r = __spreadValues$8$1({}, i);
    return Object.defineProperty(r, Symbol.iterator, {
      enumerable: !1,
      value() {
        let a = 0;
        return {
          next: () => ({
            value: s[a++],
            done: a > s.length
          })
        };
      }
    }), r;
  } else
    return Object.assign([...s], i);
}
function reactify(i, s) {
  const r = (s == null ? void 0 : s.computedGetter) === !1 ? unref : resolveUnref;
  return function(...a) {
    return computed(() => i.apply(this, a.map((d) => r(d))));
  };
}
function reactifyObject(i, s = {}) {
  let r = [], a;
  if (Array.isArray(s))
    r = s;
  else {
    a = s;
    const { includeOwnProperties: d = !0 } = s;
    r.push(...Object.keys(i)), d && r.push(...Object.getOwnPropertyNames(i));
  }
  return Object.fromEntries(r.map((d) => {
    const c = i[d];
    return [
      d,
      typeof c == "function" ? reactify(c.bind(i), a) : c
    ];
  }));
}
function toReactive(i) {
  if (!isRef(i))
    return reactive(i);
  const s = new Proxy({}, {
    get(r, a, d) {
      return unref(Reflect.get(i.value, a, d));
    },
    set(r, a, d) {
      return isRef(i.value[a]) && !isRef(d) ? i.value[a].value = d : i.value[a] = d, !0;
    },
    deleteProperty(r, a) {
      return Reflect.deleteProperty(i.value, a);
    },
    has(r, a) {
      return Reflect.has(i.value, a);
    },
    ownKeys() {
      return Object.keys(i.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    }
  });
  return reactive(s);
}
function reactiveComputed(i) {
  return toReactive(computed(i));
}
function reactiveOmit(i, ...s) {
  const r = s.flat();
  return reactiveComputed(() => Object.fromEntries(Object.entries(toRefs$1(i)).filter((a) => !r.includes(a[0]))));
}
function reactivePick(i, ...s) {
  const r = s.flat();
  return reactive(Object.fromEntries(r.map((a) => [a, toRef(i, a)])));
}
function refAutoReset(i, s = 1e4) {
  return customRef((r, a) => {
    let d = i, c;
    const l = () => setTimeout(() => {
      d = i, a();
    }, resolveUnref(s));
    return tryOnScopeDispose(() => {
      clearTimeout(c);
    }), {
      get() {
        return r(), d;
      },
      set(p) {
        d = p, a(), clearTimeout(c), c = l();
      }
    };
  });
}
function useDebounceFn(i, s = 200, r = {}) {
  return createFilterWrapper(debounceFilter(s, r), i);
}
function refDebounced(i, s = 200, r = {}) {
  const a = ref(i.value), d = useDebounceFn(() => {
    a.value = i.value;
  }, s, r);
  return watch(i, () => d()), a;
}
function refDefault(i, s) {
  return computed({
    get() {
      var r;
      return (r = i.value) != null ? r : s;
    },
    set(r) {
      i.value = r;
    }
  });
}
function useThrottleFn(i, s = 200, r = !1, a = !0, d = !1) {
  return createFilterWrapper(throttleFilter(s, r, a, d), i);
}
function refThrottled(i, s = 200, r = !0, a = !0) {
  if (s <= 0)
    return i;
  const d = ref(i.value), c = useThrottleFn(() => {
    d.value = i.value;
  }, s, r, a);
  return watch(i, () => c()), d;
}
function refWithControl(i, s = {}) {
  let r = i, a, d;
  const c = customRef((f, w) => (a = f, d = w, {
    get() {
      return l();
    },
    set(g) {
      p(g);
    }
  }));
  function l(f = !0) {
    return f && a(), r;
  }
  function p(f, w = !0) {
    var g, _;
    if (f === r)
      return;
    const y = r;
    ((g = s.onBeforeChange) == null ? void 0 : g.call(s, f, y)) !== !1 && (r = f, (_ = s.onChanged) == null || _.call(s, f, y), w && d());
  }
  return extendRef(c, {
    get: l,
    set: p,
    untrackedGet: () => l(!1),
    silentSet: (f) => p(f, !1),
    peek: () => l(!1),
    lay: (f) => p(f, !1)
  }, { enumerable: !0 });
}
const controlledRef = refWithControl;
function resolveRef(i) {
  return typeof i == "function" ? computed(i) : ref(i);
}
function set$1(...i) {
  if (i.length === 2) {
    const [s, r] = i;
    s.value = r;
  }
  if (i.length === 3)
    if (isVue2$1)
      set$2(...i);
    else {
      const [s, r, a] = i;
      s[r] = a;
    }
}
function syncRef(i, s, r = {}) {
  var a, d;
  const {
    flush: c = "sync",
    deep: l = !1,
    immediate: p = !0,
    direction: u = "both",
    transform: m = {}
  } = r;
  let v, h;
  const f = (a = m.ltr) != null ? a : (g) => g, w = (d = m.rtl) != null ? d : (g) => g;
  return (u === "both" || u === "ltr") && (v = watch(i, (g) => s.value = f(g), { flush: c, deep: l, immediate: p })), (u === "both" || u === "rtl") && (h = watch(s, (g) => i.value = w(g), { flush: c, deep: l, immediate: p })), () => {
    v == null || v(), h == null || h();
  };
}
function syncRefs(i, s, r = {}) {
  const {
    flush: a = "sync",
    deep: d = !1,
    immediate: c = !0
  } = r;
  return Array.isArray(s) || (s = [s]), watch(i, (l) => s.forEach((p) => p.value = l), { flush: a, deep: d, immediate: c });
}
var __defProp$7$1 = Object.defineProperty, __defProps$5$1 = Object.defineProperties, __getOwnPropDescs$5$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$9$1 = Object.getOwnPropertySymbols, __hasOwnProp$9$1 = Object.prototype.hasOwnProperty, __propIsEnum$9$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$7$1 = (i, s, r) => s in i ? __defProp$7$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$7$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$9$1.call(s, r) && __defNormalProp$7$1(i, r, s[r]);
  if (__getOwnPropSymbols$9$1)
    for (var r of __getOwnPropSymbols$9$1(s))
      __propIsEnum$9$1.call(s, r) && __defNormalProp$7$1(i, r, s[r]);
  return i;
}, __spreadProps$5$1 = (i, s) => __defProps$5$1(i, __getOwnPropDescs$5$1(s));
function toRefs(i) {
  if (!isRef(i))
    return toRefs$1(i);
  const s = Array.isArray(i.value) ? new Array(i.value.length) : {};
  for (const r in i.value)
    s[r] = customRef(() => ({
      get() {
        return i.value[r];
      },
      set(a) {
        if (Array.isArray(i.value)) {
          const d = [...i.value];
          d[r] = a, i.value = d;
        } else {
          const d = __spreadProps$5$1(__spreadValues$7$1({}, i.value), { [r]: a });
          Object.setPrototypeOf(d, i.value), i.value = d;
        }
      }
    }));
  return s;
}
function tryOnBeforeMount(i, s = !0) {
  getCurrentInstance() ? onBeforeMount(i) : s ? i() : nextTick(i);
}
function tryOnBeforeUnmount(i) {
  getCurrentInstance() && onBeforeUnmount(i);
}
function tryOnMounted(i, s = !0) {
  getCurrentInstance() ? onMounted(i) : s ? i() : nextTick(i);
}
function tryOnUnmounted(i) {
  getCurrentInstance() && onUnmounted(i);
}
function createUntil(i, s = !1) {
  function r(h, { flush: f = "sync", deep: w = !1, timeout: g, throwOnTimeout: _ } = {}) {
    let y = null;
    const b = [new Promise((P) => {
      y = watch(i, (C) => {
        h(C) !== s && (y == null || y(), P(C));
      }, {
        flush: f,
        deep: w,
        immediate: !0
      });
    })];
    return g != null && b.push(promiseTimeout(g, _).then(() => resolveUnref(i)).finally(() => y == null ? void 0 : y())), Promise.race(b);
  }
  function a(h, f) {
    if (!isRef(h))
      return r((C) => C === h, f);
    const { flush: w = "sync", deep: g = !1, timeout: _, throwOnTimeout: y } = f ?? {};
    let S = null;
    const P = [new Promise((C) => {
      S = watch([i, h], ([k, x]) => {
        s !== (k === x) && (S == null || S(), C(k));
      }, {
        flush: w,
        deep: g,
        immediate: !0
      });
    })];
    return _ != null && P.push(promiseTimeout(_, y).then(() => resolveUnref(i)).finally(() => (S == null || S(), resolveUnref(i)))), Promise.race(P);
  }
  function d(h) {
    return r((f) => Boolean(f), h);
  }
  function c(h) {
    return a(null, h);
  }
  function l(h) {
    return a(void 0, h);
  }
  function p(h) {
    return r(Number.isNaN, h);
  }
  function u(h, f) {
    return r((w) => {
      const g = Array.from(w);
      return g.includes(h) || g.includes(resolveUnref(h));
    }, f);
  }
  function m(h) {
    return v(1, h);
  }
  function v(h = 1, f) {
    let w = -1;
    return r(() => (w += 1, w >= h), f);
  }
  return Array.isArray(resolveUnref(i)) ? {
    toMatch: r,
    toContains: u,
    changed: m,
    changedTimes: v,
    get not() {
      return createUntil(i, !s);
    }
  } : {
    toMatch: r,
    toBe: a,
    toBeTruthy: d,
    toBeNull: c,
    toBeNaN: p,
    toBeUndefined: l,
    changed: m,
    changedTimes: v,
    get not() {
      return createUntil(i, !s);
    }
  };
}
function until(i) {
  return createUntil(i);
}
function useArrayEvery(i, s) {
  return computed(() => resolveUnref(i).every((r, a, d) => s(resolveUnref(r), a, d)));
}
function useArrayFilter(i, s) {
  return computed(() => resolveUnref(i).map((r) => resolveUnref(r)).filter(s));
}
function useArrayFind(i, s) {
  return computed(() => resolveUnref(resolveUnref(i).find((r, a, d) => s(resolveUnref(r), a, d))));
}
function useArrayFindIndex(i, s) {
  return computed(() => resolveUnref(i).findIndex((r, a, d) => s(resolveUnref(r), a, d)));
}
function useArrayJoin(i, s) {
  return computed(() => resolveUnref(i).map((r) => resolveUnref(r)).join(resolveUnref(s)));
}
function useArrayMap(i, s) {
  return computed(() => resolveUnref(i).map((r) => resolveUnref(r)).map(s));
}
function useArrayReduce(i, s, ...r) {
  const a = (d, c, l) => s(resolveUnref(d), resolveUnref(c), l);
  return computed(() => {
    const d = resolveUnref(i);
    return r.length ? d.reduce(a, resolveUnref(r[0])) : d.reduce(a);
  });
}
function useArraySome(i, s) {
  return computed(() => resolveUnref(i).some((r, a, d) => s(resolveUnref(r), a, d)));
}
function useArrayUnique(i) {
  return computed(() => [...new Set(resolveUnref(i).map((s) => resolveUnref(s)))]);
}
function useCounter(i = 0, s = {}) {
  const r = ref(i), {
    max: a = 1 / 0,
    min: d = -1 / 0
  } = s, c = (v = 1) => r.value = Math.min(a, r.value + v), l = (v = 1) => r.value = Math.max(d, r.value - v), p = () => r.value, u = (v) => r.value = Math.max(d, Math.min(a, v));
  return { count: r, inc: c, dec: l, get: p, set: u, reset: (v = i) => (i = v, u(v)) };
}
const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g, defaultMeridiem = (i, s, r, a) => {
  let d = i < 12 ? "AM" : "PM";
  return a && (d = d.split("").reduce((c, l) => c += `${l}.`, "")), r ? d.toLowerCase() : d;
}, formatDate = (i, s, r = {}) => {
  var a;
  const d = i.getFullYear(), c = i.getMonth(), l = i.getDate(), p = i.getHours(), u = i.getMinutes(), m = i.getSeconds(), v = i.getMilliseconds(), h = i.getDay(), f = (a = r.customMeridiem) != null ? a : defaultMeridiem, w = {
    YY: () => String(d).slice(-2),
    YYYY: () => d,
    M: () => c + 1,
    MM: () => `${c + 1}`.padStart(2, "0"),
    MMM: () => i.toLocaleDateString(r.locales, { month: "short" }),
    MMMM: () => i.toLocaleDateString(r.locales, { month: "long" }),
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
    d: () => h,
    dd: () => i.toLocaleDateString(r.locales, { weekday: "narrow" }),
    ddd: () => i.toLocaleDateString(r.locales, { weekday: "short" }),
    dddd: () => i.toLocaleDateString(r.locales, { weekday: "long" }),
    A: () => f(p, u),
    AA: () => f(p, u, !1, !0),
    a: () => f(p, u, !0),
    aa: () => f(p, u, !0, !0)
  };
  return s.replace(REGEX_FORMAT, (g, _) => _ || w[g]());
}, normalizeDate = (i) => {
  if (i === null)
    return new Date(NaN);
  if (i === void 0)
    return new Date();
  if (i instanceof Date)
    return new Date(i);
  if (typeof i == "string" && !/Z$/i.test(i)) {
    const s = i.match(REGEX_PARSE);
    if (s) {
      const r = s[2] - 1 || 0, a = (s[7] || "0").substring(0, 3);
      return new Date(s[1], r, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, a);
    }
  }
  return new Date(i);
};
function useDateFormat(i, s = "HH:mm:ss", r = {}) {
  return computed(() => formatDate(normalizeDate(resolveUnref(i)), resolveUnref(s), r));
}
function useIntervalFn(i, s = 1e3, r = {}) {
  const {
    immediate: a = !0,
    immediateCallback: d = !1
  } = r;
  let c = null;
  const l = ref(!1);
  function p() {
    c && (clearInterval(c), c = null);
  }
  function u() {
    l.value = !1, p();
  }
  function m() {
    const v = resolveUnref(s);
    v <= 0 || (l.value = !0, d && i(), p(), c = setInterval(i, v));
  }
  if (a && isClient && m(), isRef(s) || isFunction(s)) {
    const v = watch(s, () => {
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
var __defProp$6$1 = Object.defineProperty, __getOwnPropSymbols$8$1 = Object.getOwnPropertySymbols, __hasOwnProp$8$1 = Object.prototype.hasOwnProperty, __propIsEnum$8$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$6$1 = (i, s, r) => s in i ? __defProp$6$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$6$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$8$1.call(s, r) && __defNormalProp$6$1(i, r, s[r]);
  if (__getOwnPropSymbols$8$1)
    for (var r of __getOwnPropSymbols$8$1(s))
      __propIsEnum$8$1.call(s, r) && __defNormalProp$6$1(i, r, s[r]);
  return i;
};
function useInterval(i = 1e3, s = {}) {
  const {
    controls: r = !1,
    immediate: a = !0,
    callback: d
  } = s, c = ref(0), l = () => c.value += 1, p = useIntervalFn(d ? () => {
    l(), d(c.value);
  } : l, i, { immediate: a });
  return r ? __spreadValues$6$1({
    counter: c
  }, p) : c;
}
function useLastChanged(i, s = {}) {
  var r;
  const a = ref((r = s.initialValue) != null ? r : null);
  return watch(i, () => a.value = timestamp(), s), a;
}
function useTimeoutFn(i, s, r = {}) {
  const {
    immediate: a = !0
  } = r, d = ref(!1);
  let c = null;
  function l() {
    c && (clearTimeout(c), c = null);
  }
  function p() {
    d.value = !1, l();
  }
  function u(...m) {
    l(), d.value = !0, c = setTimeout(() => {
      d.value = !1, c = null, i(...m);
    }, resolveUnref(s));
  }
  return a && (d.value = !0, isClient && u()), tryOnScopeDispose(p), {
    isPending: readonly(d),
    start: u,
    stop: p
  };
}
var __defProp$5$1 = Object.defineProperty, __getOwnPropSymbols$7$1 = Object.getOwnPropertySymbols, __hasOwnProp$7$1 = Object.prototype.hasOwnProperty, __propIsEnum$7$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$5$1 = (i, s, r) => s in i ? __defProp$5$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$5$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$7$1.call(s, r) && __defNormalProp$5$1(i, r, s[r]);
  if (__getOwnPropSymbols$7$1)
    for (var r of __getOwnPropSymbols$7$1(s))
      __propIsEnum$7$1.call(s, r) && __defNormalProp$5$1(i, r, s[r]);
  return i;
};
function useTimeout(i = 1e3, s = {}) {
  const {
    controls: r = !1,
    callback: a
  } = s, d = useTimeoutFn(a ?? noop, i, s), c = computed(() => !d.isPending.value);
  return r ? __spreadValues$5$1({
    ready: c
  }, d) : c;
}
function useToNumber(i, s = {}) {
  const {
    method: r = "parseFloat",
    radix: a,
    nanToZero: d
  } = s;
  return computed(() => {
    let c = resolveUnref(i);
    return typeof c == "string" && (c = Number[r](c, a)), d && isNaN(c) && (c = 0), c;
  });
}
function useToString(i) {
  return computed(() => `${resolveUnref(i)}`);
}
function useToggle(i = !1, s = {}) {
  const {
    truthyValue: r = !0,
    falsyValue: a = !1
  } = s, d = isRef(i), c = ref(i);
  function l(p) {
    if (arguments.length)
      return c.value = p, c.value;
    {
      const u = resolveUnref(r);
      return c.value = c.value === u ? resolveUnref(a) : u, c.value;
    }
  }
  return d ? l : [c, l];
}
function watchArray(i, s, r) {
  let a = r != null && r.immediate ? [] : [
    ...i instanceof Function ? i() : Array.isArray(i) ? i : unref(i)
  ];
  return watch(i, (d, c, l) => {
    const p = new Array(a.length), u = [];
    for (const v of d) {
      let h = !1;
      for (let f = 0; f < a.length; f++)
        if (!p[f] && v === a[f]) {
          p[f] = !0, h = !0;
          break;
        }
      h || u.push(v);
    }
    const m = a.filter((v, h) => !p[h]);
    s(d, a, u, m, l), a = [...d];
  }, r);
}
var __getOwnPropSymbols$6$1 = Object.getOwnPropertySymbols, __hasOwnProp$6$1 = Object.prototype.hasOwnProperty, __propIsEnum$6$1 = Object.prototype.propertyIsEnumerable, __objRest$5 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$6$1.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$6$1)
    for (var a of __getOwnPropSymbols$6$1(i))
      s.indexOf(a) < 0 && __propIsEnum$6$1.call(i, a) && (r[a] = i[a]);
  return r;
};
function watchWithFilter(i, s, r = {}) {
  const a = r, {
    eventFilter: d = bypassFilter
  } = a, c = __objRest$5(a, [
    "eventFilter"
  ]);
  return watch(i, createFilterWrapper(d, s), c);
}
var __getOwnPropSymbols$5$1 = Object.getOwnPropertySymbols, __hasOwnProp$5$1 = Object.prototype.hasOwnProperty, __propIsEnum$5$1 = Object.prototype.propertyIsEnumerable, __objRest$4 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$5$1.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$5$1)
    for (var a of __getOwnPropSymbols$5$1(i))
      s.indexOf(a) < 0 && __propIsEnum$5$1.call(i, a) && (r[a] = i[a]);
  return r;
};
function watchAtMost(i, s, r) {
  const a = r, {
    count: d
  } = a, c = __objRest$4(a, [
    "count"
  ]), l = ref(0), p = watchWithFilter(i, (...u) => {
    l.value += 1, l.value >= resolveUnref(d) && nextTick(() => p()), s(...u);
  }, c);
  return { count: l, stop: p };
}
var __defProp$4$1 = Object.defineProperty, __defProps$4$1 = Object.defineProperties, __getOwnPropDescs$4$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$4$1 = Object.getOwnPropertySymbols, __hasOwnProp$4$1 = Object.prototype.hasOwnProperty, __propIsEnum$4$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$4$1 = (i, s, r) => s in i ? __defProp$4$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$4$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$4$1.call(s, r) && __defNormalProp$4$1(i, r, s[r]);
  if (__getOwnPropSymbols$4$1)
    for (var r of __getOwnPropSymbols$4$1(s))
      __propIsEnum$4$1.call(s, r) && __defNormalProp$4$1(i, r, s[r]);
  return i;
}, __spreadProps$4$1 = (i, s) => __defProps$4$1(i, __getOwnPropDescs$4$1(s)), __objRest$3 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$4$1.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$4$1)
    for (var a of __getOwnPropSymbols$4$1(i))
      s.indexOf(a) < 0 && __propIsEnum$4$1.call(i, a) && (r[a] = i[a]);
  return r;
};
function watchDebounced(i, s, r = {}) {
  const a = r, {
    debounce: d = 0,
    maxWait: c = void 0
  } = a, l = __objRest$3(a, [
    "debounce",
    "maxWait"
  ]);
  return watchWithFilter(i, s, __spreadProps$4$1(__spreadValues$4$1({}, l), {
    eventFilter: debounceFilter(d, { maxWait: c })
  }));
}
var __defProp$3$1 = Object.defineProperty, __defProps$3$1 = Object.defineProperties, __getOwnPropDescs$3$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$3$1 = Object.getOwnPropertySymbols, __hasOwnProp$3$1 = Object.prototype.hasOwnProperty, __propIsEnum$3$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$3$1 = (i, s, r) => s in i ? __defProp$3$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$3$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$3$1.call(s, r) && __defNormalProp$3$1(i, r, s[r]);
  if (__getOwnPropSymbols$3$1)
    for (var r of __getOwnPropSymbols$3$1(s))
      __propIsEnum$3$1.call(s, r) && __defNormalProp$3$1(i, r, s[r]);
  return i;
}, __spreadProps$3$1 = (i, s) => __defProps$3$1(i, __getOwnPropDescs$3$1(s)), __objRest$2$1 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$3$1.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$3$1)
    for (var a of __getOwnPropSymbols$3$1(i))
      s.indexOf(a) < 0 && __propIsEnum$3$1.call(i, a) && (r[a] = i[a]);
  return r;
};
function watchIgnorable(i, s, r = {}) {
  const a = r, {
    eventFilter: d = bypassFilter
  } = a, c = __objRest$2$1(a, [
    "eventFilter"
  ]), l = createFilterWrapper(d, s);
  let p, u, m;
  if (c.flush === "sync") {
    const v = ref(!1);
    u = () => {
    }, p = (h) => {
      v.value = !0, h(), v.value = !1;
    }, m = watch(i, (...h) => {
      v.value || l(...h);
    }, c);
  } else {
    const v = [], h = ref(0), f = ref(0);
    u = () => {
      h.value = f.value;
    }, v.push(watch(i, () => {
      f.value++;
    }, __spreadProps$3$1(__spreadValues$3$1({}, c), { flush: "sync" }))), p = (w) => {
      const g = f.value;
      w(), h.value += f.value - g;
    }, v.push(watch(i, (...w) => {
      const g = h.value > 0 && h.value === f.value;
      h.value = 0, f.value = 0, !g && l(...w);
    }, c)), m = () => {
      v.forEach((w) => w());
    };
  }
  return { stop: m, ignoreUpdates: p, ignorePrevAsyncUpdates: u };
}
function watchOnce(i, s, r) {
  const a = watch(i, (...d) => (nextTick(() => a()), s(...d)), r);
}
var __defProp$2$1 = Object.defineProperty, __defProps$2$1 = Object.defineProperties, __getOwnPropDescs$2$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$2$1 = Object.getOwnPropertySymbols, __hasOwnProp$2$1 = Object.prototype.hasOwnProperty, __propIsEnum$2$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$2$1 = (i, s, r) => s in i ? __defProp$2$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$2$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$2$1.call(s, r) && __defNormalProp$2$1(i, r, s[r]);
  if (__getOwnPropSymbols$2$1)
    for (var r of __getOwnPropSymbols$2$1(s))
      __propIsEnum$2$1.call(s, r) && __defNormalProp$2$1(i, r, s[r]);
  return i;
}, __spreadProps$2$1 = (i, s) => __defProps$2$1(i, __getOwnPropDescs$2$1(s)), __objRest$1$1 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$2$1.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$2$1)
    for (var a of __getOwnPropSymbols$2$1(i))
      s.indexOf(a) < 0 && __propIsEnum$2$1.call(i, a) && (r[a] = i[a]);
  return r;
};
function watchPausable(i, s, r = {}) {
  const a = r, {
    eventFilter: d
  } = a, c = __objRest$1$1(a, [
    "eventFilter"
  ]), { eventFilter: l, pause: p, resume: u, isActive: m } = pausableFilter(d);
  return { stop: watchWithFilter(i, s, __spreadProps$2$1(__spreadValues$2$1({}, c), {
    eventFilter: l
  })), pause: p, resume: u, isActive: m };
}
var __defProp$1$1 = Object.defineProperty, __defProps$1$1 = Object.defineProperties, __getOwnPropDescs$1$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$1$1 = Object.getOwnPropertySymbols, __hasOwnProp$1$1 = Object.prototype.hasOwnProperty, __propIsEnum$1$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$1$1 = (i, s, r) => s in i ? __defProp$1$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$1$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$1$1.call(s, r) && __defNormalProp$1$1(i, r, s[r]);
  if (__getOwnPropSymbols$1$1)
    for (var r of __getOwnPropSymbols$1$1(s))
      __propIsEnum$1$1.call(s, r) && __defNormalProp$1$1(i, r, s[r]);
  return i;
}, __spreadProps$1$1 = (i, s) => __defProps$1$1(i, __getOwnPropDescs$1$1(s)), __objRest$6 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$1$1.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$1$1)
    for (var a of __getOwnPropSymbols$1$1(i))
      s.indexOf(a) < 0 && __propIsEnum$1$1.call(i, a) && (r[a] = i[a]);
  return r;
};
function watchThrottled(i, s, r = {}) {
  const a = r, {
    throttle: d = 0,
    trailing: c = !0,
    leading: l = !0
  } = a, p = __objRest$6(a, [
    "throttle",
    "trailing",
    "leading"
  ]);
  return watchWithFilter(i, s, __spreadProps$1$1(__spreadValues$1$1({}, p), {
    eventFilter: throttleFilter(d, c, l)
  }));
}
var __defProp$n = Object.defineProperty, __defProps$a = Object.defineProperties, __getOwnPropDescs$a = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$p = Object.getOwnPropertySymbols, __hasOwnProp$p = Object.prototype.hasOwnProperty, __propIsEnum$p = Object.prototype.propertyIsEnumerable, __defNormalProp$n = (i, s, r) => s in i ? __defProp$n(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$n = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$p.call(s, r) && __defNormalProp$n(i, r, s[r]);
  if (__getOwnPropSymbols$p)
    for (var r of __getOwnPropSymbols$p(s))
      __propIsEnum$p.call(s, r) && __defNormalProp$n(i, r, s[r]);
  return i;
}, __spreadProps$a = (i, s) => __defProps$a(i, __getOwnPropDescs$a(s));
function watchTriggerable(i, s, r = {}) {
  let a;
  function d() {
    if (!a)
      return;
    const v = a;
    a = void 0, v();
  }
  function c(v) {
    a = v;
  }
  const l = (v, h) => (d(), s(v, h, c)), p = watchIgnorable(i, l, r), { ignoreUpdates: u } = p, m = () => {
    let v;
    return u(() => {
      v = l(getWatchSources(i), getOldValue(i));
    }), v;
  };
  return __spreadProps$a(__spreadValues$n({}, p), {
    trigger: m
  });
}
function getWatchSources(i) {
  return isReactive(i) ? i : Array.isArray(i) ? i.map((s) => getOneWatchSource(s)) : getOneWatchSource(i);
}
function getOneWatchSource(i) {
  return typeof i == "function" ? i() : unref(i);
}
function getOldValue(i) {
  return Array.isArray(i) ? i.map(() => {
  }) : void 0;
}
function whenever(i, s, r) {
  return watch(i, (a, d, c) => {
    a && s(a, d, c);
  }, r);
}
var isVue2 = !1, isVue3 = !0, Vue2 = void 0;
function install$1() {
}
function set(i, s, r) {
  return Array.isArray(i) ? (i.length = Math.max(i.length, s), i.splice(s, 1, r), r) : (i[s] = r, r);
}
function del(i, s) {
  if (Array.isArray(i)) {
    i.splice(s, 1);
    return;
  }
  delete i[s];
}
function computedAsync(i, s, r) {
  let a;
  isRef(r) ? a = {
    evaluating: r
  } : a = r || {};
  const {
    lazy: d = !1,
    evaluating: c = void 0,
    shallow: l = !1,
    onError: p = noop
  } = a, u = ref(!d), m = l ? shallowRef(s) : ref(s);
  let v = 0;
  return watchEffect(async (h) => {
    if (!u.value)
      return;
    v++;
    const f = v;
    let w = !1;
    c && Promise.resolve().then(() => {
      c.value = !0;
    });
    try {
      const g = await i((_) => {
        h(() => {
          c && (c.value = !1), w || _();
        });
      });
      f === v && (m.value = g);
    } catch (g) {
      p(g);
    } finally {
      c && f === v && (c.value = !1), w = !0;
    }
  }), d ? computed(() => (u.value = !0, m.value)) : m;
}
function computedInject(i, s, r, a) {
  let d = inject(i);
  return r && (d = inject(i, r)), a && (d = inject(i, r, a)), typeof s == "function" ? computed((c) => s(d, c)) : computed({
    get: (c) => s.get(d, c),
    set: s.set
  });
}
const createUnrefFn = (i) => function(...s) {
  return i.apply(this, s.map((r) => unref(r)));
};
function unrefElement(i) {
  var s;
  const r = resolveUnref(i);
  return (s = r == null ? void 0 : r.$el) != null ? s : r;
}
const defaultWindow = isClient ? window : void 0, defaultDocument = isClient ? window.document : void 0, defaultNavigator = isClient ? window.navigator : void 0, defaultLocation = isClient ? window.location : void 0;
function useEventListener(...i) {
  let s, r, a, d;
  if (isString(i[0]) || Array.isArray(i[0]) ? ([r, a, d] = i, s = defaultWindow) : [s, r, a, d] = i, !s)
    return noop;
  Array.isArray(r) || (r = [r]), Array.isArray(a) || (a = [a]);
  const c = [], l = () => {
    c.forEach((v) => v()), c.length = 0;
  }, p = (v, h, f) => (v.addEventListener(h, f, d), () => v.removeEventListener(h, f, d)), u = watch(() => unrefElement(s), (v) => {
    l(), v && c.push(...r.flatMap((h) => a.map((f) => p(v, h, f))));
  }, { immediate: !0, flush: "post" }), m = () => {
    u(), l();
  };
  return tryOnScopeDispose(m), m;
}
function onClickOutside(i, s, r = {}) {
  const { window: a = defaultWindow, ignore: d = [], capture: c = !0, detectIframe: l = !1 } = r;
  if (!a)
    return;
  let p = !0, u;
  const m = (w) => d.some((g) => {
    if (typeof g == "string")
      return Array.from(a.document.querySelectorAll(g)).some((_) => _ === w.target || w.composedPath().includes(_));
    {
      const _ = unrefElement(g);
      return _ && (w.target === _ || w.composedPath().includes(_));
    }
  }), v = (w) => {
    a.clearTimeout(u);
    const g = unrefElement(i);
    if (!(!g || g === w.target || w.composedPath().includes(g))) {
      if (w.detail === 0 && (p = !m(w)), !p) {
        p = !0;
        return;
      }
      s(w);
    }
  }, h = [
    useEventListener(a, "click", v, { passive: !0, capture: c }),
    useEventListener(a, "pointerdown", (w) => {
      const g = unrefElement(i);
      g && (p = !w.composedPath().includes(g) && !m(w));
    }, { passive: !0 }),
    useEventListener(a, "pointerup", (w) => {
      if (w.button === 0) {
        const g = w.composedPath();
        w.composedPath = () => g, u = a.setTimeout(() => v(w), 50);
      }
    }, { passive: !0 }),
    l && useEventListener(a, "blur", (w) => {
      var g;
      const _ = unrefElement(i);
      ((g = a.document.activeElement) == null ? void 0 : g.tagName) === "IFRAME" && !(_ != null && _.contains(a.document.activeElement)) && s(w);
    })
  ].filter(Boolean);
  return () => h.forEach((w) => w());
}
var __defProp$m = Object.defineProperty, __defProps$9 = Object.defineProperties, __getOwnPropDescs$9 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$o = Object.getOwnPropertySymbols, __hasOwnProp$o = Object.prototype.hasOwnProperty, __propIsEnum$o = Object.prototype.propertyIsEnumerable, __defNormalProp$m = (i, s, r) => s in i ? __defProp$m(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$m = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$o.call(s, r) && __defNormalProp$m(i, r, s[r]);
  if (__getOwnPropSymbols$o)
    for (var r of __getOwnPropSymbols$o(s))
      __propIsEnum$o.call(s, r) && __defNormalProp$m(i, r, s[r]);
  return i;
}, __spreadProps$9 = (i, s) => __defProps$9(i, __getOwnPropDescs$9(s));
const createKeyPredicate = (i) => typeof i == "function" ? i : typeof i == "string" ? (s) => s.key === i : Array.isArray(i) ? (s) => i.includes(s.key) : () => !0;
function onKeyStroke(...i) {
  let s, r, a = {};
  i.length === 3 ? (s = i[0], r = i[1], a = i[2]) : i.length === 2 ? typeof i[1] == "object" ? (s = !0, r = i[0], a = i[1]) : (s = i[0], r = i[1]) : (s = !0, r = i[0]);
  const { target: d = defaultWindow, eventName: c = "keydown", passive: l = !1 } = a, p = createKeyPredicate(s);
  return useEventListener(d, c, (m) => {
    p(m) && r(m);
  }, l);
}
function onKeyDown(i, s, r = {}) {
  return onKeyStroke(i, s, __spreadProps$9(__spreadValues$m({}, r), { eventName: "keydown" }));
}
function onKeyPressed(i, s, r = {}) {
  return onKeyStroke(i, s, __spreadProps$9(__spreadValues$m({}, r), { eventName: "keypress" }));
}
function onKeyUp(i, s, r = {}) {
  return onKeyStroke(i, s, __spreadProps$9(__spreadValues$m({}, r), { eventName: "keyup" }));
}
const DEFAULT_DELAY = 500;
function onLongPress(i, s, r) {
  var a, d;
  const c = computed(() => unrefElement(i));
  let l;
  function p() {
    l && (clearTimeout(l), l = void 0);
  }
  function u(v) {
    var h, f, w, g;
    (h = r == null ? void 0 : r.modifiers) != null && h.self && v.target !== c.value || (p(), (f = r == null ? void 0 : r.modifiers) != null && f.prevent && v.preventDefault(), (w = r == null ? void 0 : r.modifiers) != null && w.stop && v.stopPropagation(), l = setTimeout(() => s(v), (g = r == null ? void 0 : r.delay) != null ? g : DEFAULT_DELAY));
  }
  const m = {
    capture: (a = r == null ? void 0 : r.modifiers) == null ? void 0 : a.capture,
    once: (d = r == null ? void 0 : r.modifiers) == null ? void 0 : d.once
  };
  useEventListener(c, "pointerdown", u, m), useEventListener(c, "pointerup", p, m), useEventListener(c, "pointerleave", p, m);
}
const isFocusedElementEditable = () => {
  const { activeElement: i, body: s } = document;
  if (!i || i === s)
    return !1;
  switch (i.tagName) {
    case "INPUT":
    case "TEXTAREA":
      return !0;
  }
  return i.hasAttribute("contenteditable");
}, isTypedCharValid = ({
  keyCode: i,
  metaKey: s,
  ctrlKey: r,
  altKey: a
}) => s || r || a ? !1 : i >= 48 && i <= 57 || i >= 96 && i <= 105 || i >= 65 && i <= 90;
function onStartTyping(i, s = {}) {
  const { document: r = defaultDocument } = s;
  r && useEventListener(r, "keydown", (d) => {
    !isFocusedElementEditable() && isTypedCharValid(d) && i(d);
  }, { passive: !0 });
}
function templateRef(i, s = null) {
  const r = getCurrentInstance();
  let a = () => {
  };
  const d = customRef((c, l) => (a = l, {
    get() {
      var p, u;
      return c(), (u = (p = r == null ? void 0 : r.proxy) == null ? void 0 : p.$refs[i]) != null ? u : s;
    },
    set() {
    }
  }));
  return tryOnMounted(a), onUpdated(a), d;
}
function useActiveElement(i = {}) {
  var s;
  const { window: r = defaultWindow } = i, a = (s = i.document) != null ? s : r == null ? void 0 : r.document, d = computedWithControl(() => null, () => a == null ? void 0 : a.activeElement);
  return r && (useEventListener(r, "blur", (c) => {
    c.relatedTarget === null && d.trigger();
  }, !0), useEventListener(r, "focus", d.trigger, !0)), d;
}
function useAsyncQueue(i, s = {}) {
  const {
    interrupt: r = !0,
    onError: a = noop,
    onFinished: d = noop
  } = s, c = {
    pending: "pending",
    rejected: "rejected",
    fulfilled: "fulfilled"
  }, l = Array.from(new Array(i.length), () => ({ state: c.pending, data: null })), p = reactive(l), u = ref(-1);
  if (!i || i.length === 0)
    return d(), {
      activeIndex: u,
      result: p
    };
  function m(v, h) {
    u.value++, p[u.value].data = h, p[u.value].state = v;
  }
  return i.reduce((v, h) => v.then((f) => {
    var w;
    if (((w = p[u.value]) == null ? void 0 : w.state) === c.rejected && r) {
      d();
      return;
    }
    return h(f).then((g) => (m(c.fulfilled, g), u.value === i.length - 1 && d(), g));
  }).catch((f) => (m(c.rejected, f), a(), f)), Promise.resolve()), {
    activeIndex: u,
    result: p
  };
}
function useAsyncState(i, s, r) {
  const {
    immediate: a = !0,
    delay: d = 0,
    onError: c = noop,
    onSuccess: l = noop,
    resetOnExecute: p = !0,
    shallow: u = !0,
    throwError: m
  } = r ?? {}, v = u ? shallowRef(s) : ref(s), h = ref(!1), f = ref(!1), w = ref(void 0);
  async function g(_ = 0, ...y) {
    p && (v.value = s), w.value = void 0, h.value = !1, f.value = !0, _ > 0 && await promiseTimeout(_);
    const S = typeof i == "function" ? i(...y) : i;
    try {
      const b = await S;
      v.value = b, h.value = !0, l(b);
    } catch (b) {
      if (w.value = b, c(b), m)
        throw w;
    } finally {
      f.value = !1;
    }
    return v.value;
  }
  return a && g(d), {
    state: v,
    isReady: h,
    isLoading: f,
    error: w,
    execute: g
  };
}
const defaults$1 = {
  array: (i) => JSON.stringify(i),
  object: (i) => JSON.stringify(i),
  set: (i) => JSON.stringify(Array.from(i)),
  map: (i) => JSON.stringify(Object.fromEntries(i)),
  null: () => ""
};
function getDefaultSerialization(i) {
  return i ? i instanceof Map ? defaults$1.map : i instanceof Set ? defaults$1.set : Array.isArray(i) ? defaults$1.array : defaults$1.object : defaults$1.null;
}
function useBase64(i, s) {
  const r = ref(""), a = ref();
  function d() {
    if (isClient)
      return a.value = new Promise((c, l) => {
        try {
          const p = resolveUnref(i);
          if (p == null)
            c("");
          else if (typeof p == "string")
            c(blobToBase64(new Blob([p], { type: "text/plain" })));
          else if (p instanceof Blob)
            c(blobToBase64(p));
          else if (p instanceof ArrayBuffer)
            c(window.btoa(String.fromCharCode(...new Uint8Array(p))));
          else if (p instanceof HTMLCanvasElement)
            c(p.toDataURL(s == null ? void 0 : s.type, s == null ? void 0 : s.quality));
          else if (p instanceof HTMLImageElement) {
            const u = p.cloneNode(!1);
            u.crossOrigin = "Anonymous", imgLoaded(u).then(() => {
              const m = document.createElement("canvas"), v = m.getContext("2d");
              m.width = u.width, m.height = u.height, v.drawImage(u, 0, 0, m.width, m.height), c(m.toDataURL(s == null ? void 0 : s.type, s == null ? void 0 : s.quality));
            }).catch(l);
          } else if (typeof p == "object") {
            const m = ((s == null ? void 0 : s.serializer) || getDefaultSerialization(p))(p);
            return c(blobToBase64(new Blob([m], { type: "application/json" })));
          } else
            l(new Error("target is unsupported types"));
        } catch (p) {
          l(p);
        }
      }), a.value.then((c) => r.value = c), a.value;
  }
  return isRef(i) || isFunction(i) ? watch(i, d, { immediate: !0 }) : d(), {
    base64: r,
    promise: a,
    execute: d
  };
}
function imgLoaded(i) {
  return new Promise((s, r) => {
    i.complete ? s() : (i.onload = () => {
      s();
    }, i.onerror = r);
  });
}
function blobToBase64(i) {
  return new Promise((s, r) => {
    const a = new FileReader();
    a.onload = (d) => {
      s(d.target.result);
    }, a.onerror = r, a.readAsDataURL(i);
  });
}
function useSupported(i, s = !1) {
  const r = ref(), a = () => r.value = Boolean(i());
  return a(), tryOnMounted(a, s), r;
}
function useBattery({ navigator: i = defaultNavigator } = {}) {
  const s = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"], r = useSupported(() => i && "getBattery" in i), a = ref(!1), d = ref(0), c = ref(0), l = ref(1);
  let p;
  function u() {
    a.value = this.charging, d.value = this.chargingTime || 0, c.value = this.dischargingTime || 0, l.value = this.level;
  }
  return r.value && i.getBattery().then((m) => {
    p = m, u.call(p);
    for (const v of s)
      useEventListener(p, v, u, { passive: !0 });
  }), {
    isSupported: r,
    charging: a,
    chargingTime: d,
    dischargingTime: c,
    level: l
  };
}
function useBluetooth(i) {
  let {
    acceptAllDevices: s = !1
  } = i || {};
  const {
    filters: r = void 0,
    optionalServices: a = void 0,
    navigator: d = defaultNavigator
  } = i || {}, c = useSupported(() => d && "bluetooth" in d), l = shallowRef(void 0), p = shallowRef(null);
  watch(l, () => {
    h();
  });
  async function u() {
    if (c.value) {
      p.value = null, r && r.length > 0 && (s = !1);
      try {
        l.value = await (d == null ? void 0 : d.bluetooth.requestDevice({
          acceptAllDevices: s,
          filters: r,
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
  async function h() {
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
    isSupported: c,
    isConnected: v,
    device: l,
    requestDevice: u,
    server: m,
    error: p
  };
}
function useMediaQuery(i, s = {}) {
  const { window: r = defaultWindow } = s, a = useSupported(() => r && "matchMedia" in r && typeof r.matchMedia == "function");
  let d;
  const c = ref(!1), l = () => {
    d && ("removeEventListener" in d ? d.removeEventListener("change", p) : d.removeListener(p));
  }, p = () => {
    a.value && (l(), d = r.matchMedia(resolveRef(i).value), c.value = d.matches, "addEventListener" in d ? d.addEventListener("change", p) : d.addListener(p));
  };
  return watchEffect(p), tryOnScopeDispose(() => l()), c;
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
var __defProp$l = Object.defineProperty, __getOwnPropSymbols$n = Object.getOwnPropertySymbols, __hasOwnProp$n = Object.prototype.hasOwnProperty, __propIsEnum$n = Object.prototype.propertyIsEnumerable, __defNormalProp$l = (i, s, r) => s in i ? __defProp$l(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$l = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$n.call(s, r) && __defNormalProp$l(i, r, s[r]);
  if (__getOwnPropSymbols$n)
    for (var r of __getOwnPropSymbols$n(s))
      __propIsEnum$n.call(s, r) && __defNormalProp$l(i, r, s[r]);
  return i;
};
function useBreakpoints(i, s = {}) {
  function r(p, u) {
    let m = i[p];
    return u != null && (m = increaseWithUnit(m, u)), typeof m == "number" && (m = `${m}px`), m;
  }
  const { window: a = defaultWindow } = s;
  function d(p) {
    return a ? a.matchMedia(p).matches : !1;
  }
  const c = (p) => useMediaQuery(`(min-width: ${r(p)})`, s), l = Object.keys(i).reduce((p, u) => (Object.defineProperty(p, u, {
    get: () => c(u),
    enumerable: !0,
    configurable: !0
  }), p), {});
  return __spreadValues$l({
    greater(p) {
      return useMediaQuery(`(min-width: ${r(p, 0.1)})`, s);
    },
    greaterOrEqual: c,
    smaller(p) {
      return useMediaQuery(`(max-width: ${r(p, -0.1)})`, s);
    },
    smallerOrEqual(p) {
      return useMediaQuery(`(max-width: ${r(p)})`, s);
    },
    between(p, u) {
      return useMediaQuery(`(min-width: ${r(p)}) and (max-width: ${r(u, -0.1)})`, s);
    },
    isGreater(p) {
      return d(`(min-width: ${r(p, 0.1)})`);
    },
    isGreaterOrEqual(p) {
      return d(`(min-width: ${r(p)})`);
    },
    isSmaller(p) {
      return d(`(max-width: ${r(p, -0.1)})`);
    },
    isSmallerOrEqual(p) {
      return d(`(max-width: ${r(p)})`);
    },
    isInBetween(p, u) {
      return d(`(min-width: ${r(p)}) and (max-width: ${r(u, -0.1)})`);
    }
  }, l);
}
const useBroadcastChannel = (i) => {
  const {
    name: s,
    window: r = defaultWindow
  } = i, a = useSupported(() => r && "BroadcastChannel" in r), d = ref(!1), c = ref(), l = ref(), p = ref(null), u = (v) => {
    c.value && c.value.postMessage(v);
  }, m = () => {
    c.value && c.value.close(), d.value = !0;
  };
  return a.value && tryOnMounted(() => {
    p.value = null, c.value = new BroadcastChannel(s), c.value.addEventListener("message", (v) => {
      l.value = v.data;
    }, { passive: !0 }), c.value.addEventListener("messageerror", (v) => {
      p.value = v;
    }, { passive: !0 }), c.value.addEventListener("close", () => {
      d.value = !0;
    });
  }), tryOnScopeDispose(() => {
    m();
  }), {
    isSupported: a,
    channel: c,
    data: l,
    post: u,
    close: m,
    error: p,
    isClosed: d
  };
};
function useBrowserLocation({ window: i = defaultWindow } = {}) {
  const s = (a) => {
    const { state: d, length: c } = (i == null ? void 0 : i.history) || {}, { hash: l, host: p, hostname: u, href: m, origin: v, pathname: h, port: f, protocol: w, search: g } = (i == null ? void 0 : i.location) || {};
    return {
      trigger: a,
      state: d,
      length: c,
      hash: l,
      host: p,
      hostname: u,
      href: m,
      origin: v,
      pathname: h,
      port: f,
      protocol: w,
      search: g
    };
  }, r = ref(s("load"));
  return i && (useEventListener(i, "popstate", () => r.value = s("popstate"), { passive: !0 }), useEventListener(i, "hashchange", () => r.value = s("hashchange"), { passive: !0 })), r;
}
function useCached(i, s = (a, d) => a === d, r) {
  const a = ref(i.value);
  return watch(() => i.value, (d) => {
    s(d, a.value) || (a.value = d);
  }, r), a;
}
function useClipboard(i = {}) {
  const {
    navigator: s = defaultNavigator,
    read: r = !1,
    source: a,
    copiedDuring: d = 1500,
    legacy: c = !1
  } = i, l = ["copy", "cut"], p = useSupported(() => s && "clipboard" in s), u = computed(() => p.value || c), m = ref(""), v = ref(!1), h = useTimeoutFn(() => v.value = !1, d);
  function f() {
    p.value ? s.clipboard.readText().then((y) => {
      m.value = y;
    }) : m.value = _();
  }
  if (u.value && r)
    for (const y of l)
      useEventListener(y, f);
  async function w(y = resolveUnref(a)) {
    u.value && y != null && (p.value ? await s.clipboard.writeText(y) : g(y), m.value = y, v.value = !0, h.start());
  }
  function g(y) {
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
var __defProp$k = Object.defineProperty, __defProps$8 = Object.defineProperties, __getOwnPropDescs$8 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$m = Object.getOwnPropertySymbols, __hasOwnProp$m = Object.prototype.hasOwnProperty, __propIsEnum$m = Object.prototype.propertyIsEnumerable, __defNormalProp$k = (i, s, r) => s in i ? __defProp$k(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$k = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$m.call(s, r) && __defNormalProp$k(i, r, s[r]);
  if (__getOwnPropSymbols$m)
    for (var r of __getOwnPropSymbols$m(s))
      __propIsEnum$m.call(s, r) && __defNormalProp$k(i, r, s[r]);
  return i;
}, __spreadProps$8 = (i, s) => __defProps$8(i, __getOwnPropDescs$8(s));
function cloneFnJSON(i) {
  return JSON.parse(JSON.stringify(i));
}
function useCloned(i, s = {}) {
  const r = ref({}), {
    manual: a,
    clone: d = cloneFnJSON,
    deep: c = !0,
    immediate: l = !0
  } = s;
  function p() {
    r.value = d(unref(i));
  }
  return !a && isRef(i) ? watch(i, p, __spreadProps$8(__spreadValues$k({}, s), {
    deep: c,
    immediate: l
  })) : p(), { cloned: r, sync: p };
}
const _global = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(i, s) {
  return handlers[i] || s;
}
function setSSRHandler(i, s) {
  handlers[i] = s;
}
function guessSerializerType(i) {
  return i == null ? "any" : i instanceof Set ? "set" : i instanceof Map ? "map" : i instanceof Date ? "date" : typeof i == "boolean" ? "boolean" : typeof i == "string" ? "string" : typeof i == "object" ? "object" : Number.isNaN(i) ? "any" : "number";
}
var __defProp$j = Object.defineProperty, __getOwnPropSymbols$l = Object.getOwnPropertySymbols, __hasOwnProp$l = Object.prototype.hasOwnProperty, __propIsEnum$l = Object.prototype.propertyIsEnumerable, __defNormalProp$j = (i, s, r) => s in i ? __defProp$j(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$j = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$l.call(s, r) && __defNormalProp$j(i, r, s[r]);
  if (__getOwnPropSymbols$l)
    for (var r of __getOwnPropSymbols$l(s))
      __propIsEnum$l.call(s, r) && __defNormalProp$j(i, r, s[r]);
  return i;
};
const StorageSerializers = {
  boolean: {
    read: (i) => i === "true",
    write: (i) => String(i)
  },
  object: {
    read: (i) => JSON.parse(i),
    write: (i) => JSON.stringify(i)
  },
  number: {
    read: (i) => Number.parseFloat(i),
    write: (i) => String(i)
  },
  any: {
    read: (i) => i,
    write: (i) => String(i)
  },
  string: {
    read: (i) => i,
    write: (i) => String(i)
  },
  map: {
    read: (i) => new Map(JSON.parse(i)),
    write: (i) => JSON.stringify(Array.from(i.entries()))
  },
  set: {
    read: (i) => new Set(JSON.parse(i)),
    write: (i) => JSON.stringify(Array.from(i))
  },
  date: {
    read: (i) => new Date(i),
    write: (i) => i.toISOString()
  }
};
function useStorage(i, s, r, a = {}) {
  var d;
  const {
    flush: c = "pre",
    deep: l = !0,
    listenToStorageChanges: p = !0,
    writeDefaults: u = !0,
    mergeDefaults: m = !1,
    shallow: v,
    window: h = defaultWindow,
    eventFilter: f,
    onError: w = ($) => {
      console.error($);
    }
  } = a, g = (v ? shallowRef : ref)(s);
  if (!r)
    try {
      r = getSSRHandler("getDefaultStorage", () => {
        var $;
        return ($ = defaultWindow) == null ? void 0 : $.localStorage;
      })();
    } catch ($) {
      w($);
    }
  if (!r)
    return g;
  const _ = resolveUnref(s), y = guessSerializerType(_), S = (d = a.serializer) != null ? d : StorageSerializers[y], { pause: b, resume: P } = watchPausable(g, () => C(g.value), { flush: c, deep: l, eventFilter: f });
  return h && p && useEventListener(h, "storage", x), x(), g;
  function C($) {
    try {
      if ($ == null)
        r.removeItem(i);
      else {
        const T = S.write($), j = r.getItem(i);
        j !== T && (r.setItem(i, T), h && (h == null || h.dispatchEvent(new StorageEvent("storage", {
          key: i,
          oldValue: j,
          newValue: T,
          storageArea: r
        }))));
      }
    } catch (T) {
      w(T);
    }
  }
  function k($) {
    const T = $ ? $.newValue : r.getItem(i);
    if (T == null)
      return u && _ !== null && r.setItem(i, S.write(_)), _;
    if (!$ && m) {
      const j = S.read(T);
      return isFunction(m) ? m(j, _) : y === "object" && !Array.isArray(j) ? __spreadValues$j(__spreadValues$j({}, _), j) : j;
    } else
      return typeof T != "string" ? T : S.read(T);
  }
  function x($) {
    if (!($ && $.storageArea !== r)) {
      if ($ && $.key == null) {
        g.value = _;
        return;
      }
      if (!($ && $.key !== i)) {
        b();
        try {
          g.value = k($);
        } catch (T) {
          w(T);
        } finally {
          $ ? nextTick(P) : P();
        }
      }
    }
  }
}
function usePreferredDark(i) {
  return useMediaQuery("(prefers-color-scheme: dark)", i);
}
var __defProp$i = Object.defineProperty, __getOwnPropSymbols$k = Object.getOwnPropertySymbols, __hasOwnProp$k = Object.prototype.hasOwnProperty, __propIsEnum$k = Object.prototype.propertyIsEnumerable, __defNormalProp$i = (i, s, r) => s in i ? __defProp$i(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$i = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$k.call(s, r) && __defNormalProp$i(i, r, s[r]);
  if (__getOwnPropSymbols$k)
    for (var r of __getOwnPropSymbols$k(s))
      __propIsEnum$k.call(s, r) && __defNormalProp$i(i, r, s[r]);
  return i;
};
function useColorMode(i = {}) {
  const {
    selector: s = "html",
    attribute: r = "class",
    initialValue: a = "auto",
    window: d = defaultWindow,
    storage: c,
    storageKey: l = "vueuse-color-scheme",
    listenToStorageChanges: p = !0,
    storageRef: u,
    emitAuto: m
  } = i, v = __spreadValues$i({
    auto: "",
    light: "light",
    dark: "dark"
  }, i.modes || {}), h = usePreferredDark({ window: d }), f = computed(() => h.value ? "dark" : "light"), w = u || (l == null ? ref(a) : useStorage(l, a, c, { window: d, listenToStorageChanges: p })), g = computed({
    get() {
      return w.value === "auto" && !m ? f.value : w.value;
    },
    set(b) {
      w.value = b;
    }
  }), _ = getSSRHandler("updateHTMLAttrs", (b, P, C) => {
    const k = d == null ? void 0 : d.document.querySelector(b);
    if (k)
      if (P === "class") {
        const x = C.split(/\s/g);
        Object.values(v).flatMap(($) => ($ || "").split(/\s/g)).filter(Boolean).forEach(($) => {
          x.includes($) ? k.classList.add($) : k.classList.remove($);
        });
      } else
        k.setAttribute(P, C);
  });
  function y(b) {
    var P;
    const C = b === "auto" ? f.value : b;
    _(s, r, (P = v[C]) != null ? P : C);
  }
  function S(b) {
    i.onChanged ? i.onChanged(b, y) : y(b);
  }
  return watch(g, S, { flush: "post", immediate: !0 }), m && watch(f, () => S(g.value), { flush: "post" }), tryOnMounted(() => S(g.value)), g;
}
function useConfirmDialog(i = ref(!1)) {
  const s = createEventHook(), r = createEventHook(), a = createEventHook();
  let d = noop;
  const c = (u) => (a.trigger(u), i.value = !0, new Promise((m) => {
    d = m;
  })), l = (u) => {
    i.value = !1, s.trigger(u), d({ data: u, isCanceled: !1 });
  }, p = (u) => {
    i.value = !1, r.trigger(u), d({ data: u, isCanceled: !0 });
  };
  return {
    isRevealed: computed(() => i.value),
    reveal: c,
    confirm: l,
    cancel: p,
    onReveal: a.on,
    onConfirm: s.on,
    onCancel: r.on
  };
}
function useCssVar(i, s, { window: r = defaultWindow, initialValue: a = "" } = {}) {
  const d = ref(a), c = computed(() => {
    var l;
    return unrefElement(s) || ((l = r == null ? void 0 : r.document) == null ? void 0 : l.documentElement);
  });
  return watch([c, () => resolveUnref(i)], ([l, p]) => {
    var u;
    if (l && r) {
      const m = (u = r.getComputedStyle(l).getPropertyValue(p)) == null ? void 0 : u.trim();
      d.value = m || a;
    }
  }, { immediate: !0 }), watch(d, (l) => {
    var p;
    (p = c.value) != null && p.style && c.value.style.setProperty(resolveUnref(i), l);
  }), d;
}
function useCurrentElement() {
  const i = getCurrentInstance(), s = computedWithControl(() => null, () => i.proxy.$el);
  return onUpdated(s.trigger), onMounted(s.trigger), s;
}
function useCycleList(i, s) {
  var r;
  const a = shallowRef((r = s == null ? void 0 : s.initialValue) != null ? r : i[0]), d = computed({
    get() {
      var m;
      let v = s != null && s.getIndexOf ? s.getIndexOf(a.value, i) : i.indexOf(a.value);
      return v < 0 && (v = (m = s == null ? void 0 : s.fallbackIndex) != null ? m : 0), v;
    },
    set(m) {
      c(m);
    }
  });
  function c(m) {
    const v = i.length, h = (m % v + v) % v, f = i[h];
    return a.value = f, f;
  }
  function l(m = 1) {
    return c(d.value + m);
  }
  function p(m = 1) {
    return l(m);
  }
  function u(m = 1) {
    return l(-m);
  }
  return {
    state: a,
    index: d,
    next: p,
    prev: u
  };
}
var __defProp$h = Object.defineProperty, __defProps$7 = Object.defineProperties, __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$j = Object.getOwnPropertySymbols, __hasOwnProp$j = Object.prototype.hasOwnProperty, __propIsEnum$j = Object.prototype.propertyIsEnumerable, __defNormalProp$h = (i, s, r) => s in i ? __defProp$h(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$h = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$j.call(s, r) && __defNormalProp$h(i, r, s[r]);
  if (__getOwnPropSymbols$j)
    for (var r of __getOwnPropSymbols$j(s))
      __propIsEnum$j.call(s, r) && __defNormalProp$h(i, r, s[r]);
  return i;
}, __spreadProps$7 = (i, s) => __defProps$7(i, __getOwnPropDescs$7(s));
function useDark(i = {}) {
  const {
    valueDark: s = "dark",
    valueLight: r = "",
    window: a = defaultWindow
  } = i, d = useColorMode(__spreadProps$7(__spreadValues$h({}, i), {
    onChanged: (p, u) => {
      var m;
      i.onChanged ? (m = i.onChanged) == null || m.call(i, p === "dark") : u(p);
    },
    modes: {
      dark: s,
      light: r
    }
  })), c = usePreferredDark({ window: a });
  return computed({
    get() {
      return d.value === "dark";
    },
    set(p) {
      p === c.value ? d.value = "auto" : d.value = p ? "dark" : "light";
    }
  });
}
const fnBypass = (i) => i, fnSetSource = (i, s) => i.value = s;
function defaultDump(i) {
  return i ? isFunction(i) ? i : cloneFnJSON : fnBypass;
}
function defaultParse(i) {
  return i ? isFunction(i) ? i : cloneFnJSON : fnBypass;
}
function useManualRefHistory(i, s = {}) {
  const {
    clone: r = !1,
    dump: a = defaultDump(r),
    parse: d = defaultParse(r),
    setSource: c = fnSetSource
  } = s;
  function l() {
    return markRaw({
      snapshot: a(i.value),
      timestamp: timestamp()
    });
  }
  const p = ref(l()), u = ref([]), m = ref([]), v = (P) => {
    c(i, d(P.snapshot)), p.value = P;
  }, h = () => {
    u.value.unshift(p.value), p.value = l(), s.capacity && u.value.length > s.capacity && u.value.splice(s.capacity, 1 / 0), m.value.length && m.value.splice(0, m.value.length);
  }, f = () => {
    u.value.splice(0, u.value.length), m.value.splice(0, m.value.length);
  }, w = () => {
    const P = u.value.shift();
    P && (m.value.unshift(p.value), v(P));
  }, g = () => {
    const P = m.value.shift();
    P && (u.value.unshift(p.value), v(P));
  }, _ = () => {
    v(p.value);
  }, y = computed(() => [p.value, ...u.value]), S = computed(() => u.value.length > 0), b = computed(() => m.value.length > 0);
  return {
    source: i,
    undoStack: u,
    redoStack: m,
    last: p,
    history: y,
    canUndo: S,
    canRedo: b,
    clear: f,
    commit: h,
    reset: _,
    undo: w,
    redo: g
  };
}
var __defProp$g = Object.defineProperty, __defProps$6 = Object.defineProperties, __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$i = Object.getOwnPropertySymbols, __hasOwnProp$i = Object.prototype.hasOwnProperty, __propIsEnum$i = Object.prototype.propertyIsEnumerable, __defNormalProp$g = (i, s, r) => s in i ? __defProp$g(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$g = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$i.call(s, r) && __defNormalProp$g(i, r, s[r]);
  if (__getOwnPropSymbols$i)
    for (var r of __getOwnPropSymbols$i(s))
      __propIsEnum$i.call(s, r) && __defNormalProp$g(i, r, s[r]);
  return i;
}, __spreadProps$6 = (i, s) => __defProps$6(i, __getOwnPropDescs$6(s));
function useRefHistory(i, s = {}) {
  const {
    deep: r = !1,
    flush: a = "pre",
    eventFilter: d
  } = s, {
    eventFilter: c,
    pause: l,
    resume: p,
    isActive: u
  } = pausableFilter(d), {
    ignoreUpdates: m,
    ignorePrevAsyncUpdates: v,
    stop: h
  } = watchIgnorable(i, y, { deep: r, flush: a, eventFilter: c });
  function f(C, k) {
    v(), m(() => {
      C.value = k;
    });
  }
  const w = useManualRefHistory(i, __spreadProps$6(__spreadValues$g({}, s), { clone: s.clone || r, setSource: f })), { clear: g, commit: _ } = w;
  function y() {
    v(), _();
  }
  function S(C) {
    p(), C && y();
  }
  function b(C) {
    let k = !1;
    const x = () => k = !0;
    m(() => {
      C(x);
    }), k || y();
  }
  function P() {
    h(), g();
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
var __defProp$f = Object.defineProperty, __defProps$5 = Object.defineProperties, __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$h = Object.getOwnPropertySymbols, __hasOwnProp$h = Object.prototype.hasOwnProperty, __propIsEnum$h = Object.prototype.propertyIsEnumerable, __defNormalProp$f = (i, s, r) => s in i ? __defProp$f(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$f = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$h.call(s, r) && __defNormalProp$f(i, r, s[r]);
  if (__getOwnPropSymbols$h)
    for (var r of __getOwnPropSymbols$h(s))
      __propIsEnum$h.call(s, r) && __defNormalProp$f(i, r, s[r]);
  return i;
}, __spreadProps$5 = (i, s) => __defProps$5(i, __getOwnPropDescs$5(s));
function useDebouncedRefHistory(i, s = {}) {
  const r = s.debounce ? debounceFilter(s.debounce) : void 0, a = useRefHistory(i, __spreadProps$5(__spreadValues$f({}, s), { eventFilter: r }));
  return __spreadValues$f({}, a);
}
function useDeviceMotion(i = {}) {
  const {
    window: s = defaultWindow,
    eventFilter: r = bypassFilter
  } = i, a = ref({ x: null, y: null, z: null }), d = ref({ alpha: null, beta: null, gamma: null }), c = ref(0), l = ref({
    x: null,
    y: null,
    z: null
  });
  if (s) {
    const p = createFilterWrapper(r, (u) => {
      a.value = u.acceleration, l.value = u.accelerationIncludingGravity, d.value = u.rotationRate, c.value = u.interval;
    });
    useEventListener(s, "devicemotion", p);
  }
  return {
    acceleration: a,
    accelerationIncludingGravity: l,
    rotationRate: d,
    interval: c
  };
}
function useDeviceOrientation(i = {}) {
  const { window: s = defaultWindow } = i, r = useSupported(() => s && "DeviceOrientationEvent" in s), a = ref(!1), d = ref(null), c = ref(null), l = ref(null);
  return s && r.value && useEventListener(s, "deviceorientation", (p) => {
    a.value = p.absolute, d.value = p.alpha, c.value = p.beta, l.value = p.gamma;
  }), {
    isSupported: r,
    isAbsolute: a,
    alpha: d,
    beta: c,
    gamma: l
  };
}
function useDevicePixelRatio({
  window: i = defaultWindow
} = {}) {
  if (!i)
    return {
      pixelRatio: ref(1)
    };
  const s = ref(1), r = [], a = () => {
    r.map((c) => c()), r.length = 0;
  }, d = () => {
    s.value = i.devicePixelRatio, a();
    const c = i.matchMedia(`(resolution: ${s.value}dppx)`);
    c.addEventListener("change", d, { once: !0 }), r.push(() => {
      c.removeEventListener("change", d);
    });
  };
  return d(), tryOnScopeDispose(a), { pixelRatio: s };
}
function usePermission(i, s = {}) {
  const {
    controls: r = !1,
    navigator: a = defaultNavigator
  } = s, d = useSupported(() => a && "permissions" in a);
  let c;
  const l = typeof i == "string" ? { name: i } : i, p = ref(), u = () => {
    c && (p.value = c.state);
  }, m = createSingletonPromise(async () => {
    if (d.value) {
      if (!c)
        try {
          c = await a.permissions.query(l), useEventListener(c, "change", u), u();
        } catch {
          p.value = "prompt";
        }
      return c;
    }
  });
  return m(), r ? {
    state: p,
    isSupported: d,
    query: m
  } : p;
}
function useDevicesList(i = {}) {
  const {
    navigator: s = defaultNavigator,
    requestPermissions: r = !1,
    constraints: a = { audio: !0, video: !0 },
    onUpdated: d
  } = i, c = ref([]), l = computed(() => c.value.filter((w) => w.kind === "videoinput")), p = computed(() => c.value.filter((w) => w.kind === "audioinput")), u = computed(() => c.value.filter((w) => w.kind === "audiooutput")), m = useSupported(() => s && s.mediaDevices && s.mediaDevices.enumerateDevices), v = ref(!1);
  async function h() {
    m.value && (c.value = await s.mediaDevices.enumerateDevices(), d == null || d(c.value));
  }
  async function f() {
    if (!m.value)
      return !1;
    if (v.value)
      return !0;
    const { state: w, query: g } = usePermission("camera", { controls: !0 });
    return await g(), w.value !== "granted" && ((await s.mediaDevices.getUserMedia(a)).getTracks().forEach((y) => y.stop()), h()), v.value = !0, v.value;
  }
  return m.value && (r && f(), useEventListener(s.mediaDevices, "devicechange", h), h()), {
    devices: c,
    ensurePermissions: f,
    permissionGranted: v,
    videoInputs: l,
    audioInputs: p,
    audioOutputs: u,
    isSupported: m
  };
}
function useDisplayMedia(i = {}) {
  var s;
  const r = ref((s = i.enabled) != null ? s : !1), a = i.video, d = i.audio, { navigator: c = defaultNavigator } = i, l = useSupported(() => {
    var w;
    return (w = c == null ? void 0 : c.mediaDevices) == null ? void 0 : w.getDisplayMedia;
  }), p = { audio: d, video: a }, u = shallowRef();
  async function m() {
    if (!(!l.value || u.value))
      return u.value = await c.mediaDevices.getDisplayMedia(p), u.value;
  }
  async function v() {
    var w;
    (w = u.value) == null || w.getTracks().forEach((g) => g.stop()), u.value = void 0;
  }
  function h() {
    v(), r.value = !1;
  }
  async function f() {
    return await m(), u.value && (r.value = !0), u.value;
  }
  return watch(r, (w) => {
    w ? m() : v();
  }, { immediate: !0 }), {
    isSupported: l,
    stream: u,
    start: f,
    stop: h,
    enabled: r
  };
}
function useDocumentVisibility({ document: i = defaultDocument } = {}) {
  if (!i)
    return ref("visible");
  const s = ref(i.visibilityState);
  return useEventListener(i, "visibilitychange", () => {
    s.value = i.visibilityState;
  }), s;
}
var __defProp$e = Object.defineProperty, __defProps$4 = Object.defineProperties, __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$g = Object.getOwnPropertySymbols, __hasOwnProp$g = Object.prototype.hasOwnProperty, __propIsEnum$g = Object.prototype.propertyIsEnumerable, __defNormalProp$e = (i, s, r) => s in i ? __defProp$e(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$e = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$g.call(s, r) && __defNormalProp$e(i, r, s[r]);
  if (__getOwnPropSymbols$g)
    for (var r of __getOwnPropSymbols$g(s))
      __propIsEnum$g.call(s, r) && __defNormalProp$e(i, r, s[r]);
  return i;
}, __spreadProps$4 = (i, s) => __defProps$4(i, __getOwnPropDescs$4(s));
function useDraggable(i, s = {}) {
  var r, a, d;
  const c = (r = s.draggingElement) != null ? r : defaultWindow, l = (a = s.handle) != null ? a : i, p = ref((d = resolveUnref(s.initialValue)) != null ? d : { x: 0, y: 0 }), u = ref(), m = (g) => s.pointerTypes ? s.pointerTypes.includes(g.pointerType) : !0, v = (g) => {
    resolveUnref(s.preventDefault) && g.preventDefault(), resolveUnref(s.stopPropagation) && g.stopPropagation();
  }, h = (g) => {
    var _;
    if (!m(g) || resolveUnref(s.exact) && g.target !== resolveUnref(i))
      return;
    const y = resolveUnref(i).getBoundingClientRect(), S = {
      x: g.clientX - y.left,
      y: g.clientY - y.top
    };
    ((_ = s.onStart) == null ? void 0 : _.call(s, S, g)) !== !1 && (u.value = S, v(g));
  }, f = (g) => {
    var _;
    m(g) && u.value && (p.value = {
      x: g.clientX - u.value.x,
      y: g.clientY - u.value.y
    }, (_ = s.onMove) == null || _.call(s, p.value, g), v(g));
  }, w = (g) => {
    var _;
    m(g) && u.value && (u.value = void 0, (_ = s.onEnd) == null || _.call(s, p.value, g), v(g));
  };
  return isClient && (useEventListener(l, "pointerdown", h, !0), useEventListener(c, "pointermove", f, !0), useEventListener(c, "pointerup", w, !0)), __spreadProps$4(__spreadValues$e({}, toRefs(p)), {
    position: p,
    isDragging: computed(() => !!u.value),
    style: computed(() => `left:${p.value.x}px;top:${p.value.y}px;`)
  });
}
function useDropZone(i, s) {
  const r = ref(!1);
  let a = 0;
  return isClient && (useEventListener(i, "dragenter", (d) => {
    d.preventDefault(), a += 1, r.value = !0;
  }), useEventListener(i, "dragover", (d) => {
    d.preventDefault();
  }), useEventListener(i, "dragleave", (d) => {
    d.preventDefault(), a -= 1, a === 0 && (r.value = !1);
  }), useEventListener(i, "drop", (d) => {
    var c, l;
    d.preventDefault(), a = 0, r.value = !1;
    const p = Array.from((l = (c = d.dataTransfer) == null ? void 0 : c.files) != null ? l : []);
    s == null || s(p.length === 0 ? null : p);
  })), {
    isOverDropZone: r
  };
}
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols, __hasOwnProp$f = Object.prototype.hasOwnProperty, __propIsEnum$f = Object.prototype.propertyIsEnumerable, __objRest$2 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$f.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$f)
    for (var a of __getOwnPropSymbols$f(i))
      s.indexOf(a) < 0 && __propIsEnum$f.call(i, a) && (r[a] = i[a]);
  return r;
};
function useResizeObserver(i, s, r = {}) {
  const a = r, { window: d = defaultWindow } = a, c = __objRest$2(a, ["window"]);
  let l;
  const p = useSupported(() => d && "ResizeObserver" in d), u = () => {
    l && (l.disconnect(), l = void 0);
  }, m = watch(() => unrefElement(i), (h) => {
    u(), p.value && d && h && (l = new ResizeObserver(s), l.observe(h, c));
  }, { immediate: !0, flush: "post" }), v = () => {
    u(), m();
  };
  return tryOnScopeDispose(v), {
    isSupported: p,
    stop: v
  };
}
function useElementBounding(i, s = {}) {
  const {
    reset: r = !0,
    windowResize: a = !0,
    windowScroll: d = !0,
    immediate: c = !0
  } = s, l = ref(0), p = ref(0), u = ref(0), m = ref(0), v = ref(0), h = ref(0), f = ref(0), w = ref(0);
  function g() {
    const _ = unrefElement(i);
    if (!_) {
      r && (l.value = 0, p.value = 0, u.value = 0, m.value = 0, v.value = 0, h.value = 0, f.value = 0, w.value = 0);
      return;
    }
    const y = _.getBoundingClientRect();
    l.value = y.height, p.value = y.bottom, u.value = y.left, m.value = y.right, v.value = y.top, h.value = y.width, f.value = y.x, w.value = y.y;
  }
  return useResizeObserver(i, g), watch(() => unrefElement(i), (_) => !_ && g()), d && useEventListener("scroll", g, { capture: !0, passive: !0 }), a && useEventListener("resize", g, { passive: !0 }), tryOnMounted(() => {
    c && g();
  }), {
    height: l,
    bottom: p,
    left: u,
    right: m,
    top: v,
    width: h,
    x: f,
    y: w,
    update: g
  };
}
function useRafFn(i, s = {}) {
  const {
    immediate: r = !0,
    window: a = defaultWindow
  } = s, d = ref(!1);
  let c = 0, l = null;
  function p(v) {
    if (!d.value || !a)
      return;
    const h = v - c;
    i({ delta: h, timestamp: v }), c = v, l = a.requestAnimationFrame(p);
  }
  function u() {
    !d.value && a && (d.value = !0, l = a.requestAnimationFrame(p));
  }
  function m() {
    d.value = !1, l != null && a && (a.cancelAnimationFrame(l), l = null);
  }
  return r && u(), tryOnScopeDispose(m), {
    isActive: readonly(d),
    pause: m,
    resume: u
  };
}
var __defProp$d = Object.defineProperty, __getOwnPropSymbols$e = Object.getOwnPropertySymbols, __hasOwnProp$e = Object.prototype.hasOwnProperty, __propIsEnum$e = Object.prototype.propertyIsEnumerable, __defNormalProp$d = (i, s, r) => s in i ? __defProp$d(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$d = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$e.call(s, r) && __defNormalProp$d(i, r, s[r]);
  if (__getOwnPropSymbols$e)
    for (var r of __getOwnPropSymbols$e(s))
      __propIsEnum$e.call(s, r) && __defNormalProp$d(i, r, s[r]);
  return i;
};
function useElementByPoint(i) {
  const s = ref(null), { x: r, y: a, document: d = defaultDocument } = i, c = useRafFn(() => {
    s.value = (d == null ? void 0 : d.elementFromPoint(resolveUnref(r), resolveUnref(a))) || null;
  });
  return __spreadValues$d({
    element: s
  }, c);
}
function useElementHover(i) {
  const s = ref(!1);
  return useEventListener(i, "mouseenter", () => s.value = !0), useEventListener(i, "mouseleave", () => s.value = !1), s;
}
function useElementSize(i, s = { width: 0, height: 0 }, r = {}) {
  const { window: a = defaultWindow, box: d = "content-box" } = r, c = computed(() => {
    var u, m;
    return (m = (u = unrefElement(i)) == null ? void 0 : u.namespaceURI) == null ? void 0 : m.includes("svg");
  }), l = ref(s.width), p = ref(s.height);
  return useResizeObserver(i, ([u]) => {
    const m = d === "border-box" ? u.borderBoxSize : d === "content-box" ? u.contentBoxSize : u.devicePixelContentBoxSize;
    if (a && c.value) {
      const v = unrefElement(i);
      if (v) {
        const h = a.getComputedStyle(v);
        l.value = parseFloat(h.width), p.value = parseFloat(h.height);
      }
    } else if (m) {
      const v = Array.isArray(m) ? m : [m];
      l.value = v.reduce((h, { inlineSize: f }) => h + f, 0), p.value = v.reduce((h, { blockSize: f }) => h + f, 0);
    } else
      l.value = u.contentRect.width, p.value = u.contentRect.height;
  }, r), watch(() => unrefElement(i), (u) => {
    l.value = u ? s.width : 0, p.value = u ? s.height : 0;
  }), {
    width: l,
    height: p
  };
}
function useElementVisibility(i, { window: s = defaultWindow, scrollTarget: r } = {}) {
  const a = ref(!1), d = () => {
    if (!s)
      return;
    const c = s.document, l = unrefElement(i);
    if (!l)
      a.value = !1;
    else {
      const p = l.getBoundingClientRect();
      a.value = p.top <= (s.innerHeight || c.documentElement.clientHeight) && p.left <= (s.innerWidth || c.documentElement.clientWidth) && p.bottom >= 0 && p.right >= 0;
    }
  };
  return watch(() => unrefElement(i), () => d(), { immediate: !0, flush: "post" }), s && useEventListener(r || s, "scroll", d, {
    capture: !1,
    passive: !0
  }), a;
}
const events = /* @__PURE__ */ new Map();
function useEventBus(i) {
  const s = getCurrentScope();
  function r(p) {
    var u;
    const m = events.get(i) || [];
    m.push(p), events.set(i, m);
    const v = () => d(p);
    return (u = s == null ? void 0 : s.cleanups) == null || u.push(v), v;
  }
  function a(p) {
    function u(...m) {
      d(u), p(...m);
    }
    return r(u);
  }
  function d(p) {
    const u = events.get(i);
    if (!u)
      return;
    const m = u.indexOf(p);
    m > -1 && u.splice(m, 1), u.length || events.delete(i);
  }
  function c() {
    events.delete(i);
  }
  function l(p, u) {
    var m;
    (m = events.get(i)) == null || m.forEach((v) => v(p, u));
  }
  return { on: r, once: a, off: d, emit: l, reset: c };
}
function useEventSource(i, s = [], r = {}) {
  const a = ref(null), d = ref(null), c = ref("CONNECTING"), l = ref(null), p = ref(null), {
    withCredentials: u = !1
  } = r, m = () => {
    l.value && (l.value.close(), l.value = null, c.value = "CLOSED");
  }, v = new EventSource(i, { withCredentials: u });
  l.value = v, v.onopen = () => {
    c.value = "OPEN", p.value = null;
  }, v.onerror = (h) => {
    c.value = "CLOSED", p.value = h;
  }, v.onmessage = (h) => {
    a.value = null, d.value = h.data;
  };
  for (const h of s)
    useEventListener(v, h, (f) => {
      a.value = h, d.value = f.data || null;
    });
  return tryOnScopeDispose(() => {
    m();
  }), {
    eventSource: l,
    event: a,
    data: d,
    status: c,
    error: p,
    close: m
  };
}
function useEyeDropper(i = {}) {
  const { initialValue: s = "" } = i, r = useSupported(() => typeof window < "u" && "EyeDropper" in window), a = ref(s);
  async function d(c) {
    if (!r.value)
      return;
    const p = await new window.EyeDropper().open(c);
    return a.value = p.sRGBHex, p;
  }
  return { isSupported: r, sRGBHex: a, open: d };
}
function useFavicon(i = null, s = {}) {
  const {
    baseUrl: r = "",
    rel: a = "icon",
    document: d = defaultDocument
  } = s, c = resolveRef(i), l = (p) => {
    d == null || d.head.querySelectorAll(`link[rel*="${a}"]`).forEach((u) => u.href = `${r}${p}`);
  };
  return watch(c, (p, u) => {
    isString(p) && p !== u && l(p);
  }, { immediate: !0 }), c;
}
var __defProp$c = Object.defineProperty, __defProps$3 = Object.defineProperties, __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$d = Object.getOwnPropertySymbols, __hasOwnProp$d = Object.prototype.hasOwnProperty, __propIsEnum$d = Object.prototype.propertyIsEnumerable, __defNormalProp$c = (i, s, r) => s in i ? __defProp$c(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$c = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$d.call(s, r) && __defNormalProp$c(i, r, s[r]);
  if (__getOwnPropSymbols$d)
    for (var r of __getOwnPropSymbols$d(s))
      __propIsEnum$d.call(s, r) && __defNormalProp$c(i, r, s[r]);
  return i;
}, __spreadProps$3 = (i, s) => __defProps$3(i, __getOwnPropDescs$3(s));
const payloadMapping = {
  json: "application/json",
  text: "text/plain"
};
function isFetchOptions(i) {
  return containsProp(i, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError", "fetch");
}
function isAbsoluteURL(i) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(i);
}
function headersToObject(i) {
  return typeof Headers < "u" && i instanceof Headers ? Object.fromEntries([...i.entries()]) : i;
}
function combineCallbacks(i, ...s) {
  return i === "overwrite" ? async (r) => {
    const a = s[s.length - 1];
    return a !== void 0 && await a(r), r;
  } : async (r) => (await s.reduce((a, d) => a.then(async () => {
    d && (r = __spreadValues$c(__spreadValues$c({}, r), await d(r)));
  }), Promise.resolve()), r);
}
function createFetch(i = {}) {
  const s = i.combination || "chain", r = i.options || {}, a = i.fetchOptions || {};
  function d(c, ...l) {
    const p = computed(() => {
      const v = resolveUnref(i.baseUrl), h = resolveUnref(c);
      return v && !isAbsoluteURL(h) ? joinPaths(v, h) : h;
    });
    let u = r, m = a;
    return l.length > 0 && (isFetchOptions(l[0]) ? u = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, u), l[0]), {
      beforeFetch: combineCallbacks(s, r.beforeFetch, l[0].beforeFetch),
      afterFetch: combineCallbacks(s, r.afterFetch, l[0].afterFetch),
      onFetchError: combineCallbacks(s, r.onFetchError, l[0].onFetchError)
    }) : m = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, m), l[0]), {
      headers: __spreadValues$c(__spreadValues$c({}, headersToObject(m.headers) || {}), headersToObject(l[0].headers) || {})
    })), l.length > 1 && isFetchOptions(l[1]) && (u = __spreadProps$3(__spreadValues$c(__spreadValues$c({}, u), l[1]), {
      beforeFetch: combineCallbacks(s, r.beforeFetch, l[1].beforeFetch),
      afterFetch: combineCallbacks(s, r.afterFetch, l[1].afterFetch),
      onFetchError: combineCallbacks(s, r.onFetchError, l[1].onFetchError)
    })), useFetch(p, m, u);
  }
  return d;
}
function useFetch(i, ...s) {
  var r;
  const a = typeof AbortController == "function";
  let d = {}, c = { immediate: !0, refetch: !1, timeout: 0 };
  const l = {
    method: "GET",
    type: "text",
    payload: void 0
  };
  s.length > 0 && (isFetchOptions(s[0]) ? c = __spreadValues$c(__spreadValues$c({}, c), s[0]) : d = s[0]), s.length > 1 && isFetchOptions(s[1]) && (c = __spreadValues$c(__spreadValues$c({}, c), s[1]));
  const {
    fetch: p = (r = defaultWindow) == null ? void 0 : r.fetch,
    initialData: u,
    timeout: m
  } = c, v = createEventHook(), h = createEventHook(), f = createEventHook(), w = ref(!1), g = ref(!1), _ = ref(!1), y = ref(null), S = shallowRef(null), b = shallowRef(null), P = shallowRef(u), C = computed(() => a && g.value);
  let k, x;
  const $ = () => {
    a && k && k.abort();
  }, T = (z) => {
    g.value = z, w.value = !z;
  };
  m && (x = useTimeoutFn($, m, { immediate: !1 }));
  const j = async (z = !1) => {
    var D;
    T(!0), b.value = null, y.value = null, _.value = !1, k = void 0, a && (k = new AbortController(), k.signal.onabort = () => _.value = !0, d = __spreadProps$3(__spreadValues$c({}, d), {
      signal: k.signal
    }));
    const L = {
      method: l.method,
      headers: {}
    };
    if (l.payload) {
      const B = headersToObject(L.headers);
      l.payloadType && (B["Content-Type"] = (D = payloadMapping[l.payloadType]) != null ? D : l.payloadType);
      const U = resolveUnref(l.payload);
      L.body = l.payloadType === "json" ? JSON.stringify(U) : U;
    }
    let N = !1;
    const G = {
      url: resolveUnref(i),
      options: __spreadValues$c(__spreadValues$c({}, L), d),
      cancel: () => {
        N = !0;
      }
    };
    if (c.beforeFetch && Object.assign(G, await c.beforeFetch(G)), N || !p)
      return T(!1), Promise.resolve(null);
    let F = null;
    return x && x.start(), new Promise((B, U) => {
      var V;
      p(G.url, __spreadProps$3(__spreadValues$c(__spreadValues$c({}, L), G.options), {
        headers: __spreadValues$c(__spreadValues$c({}, headersToObject(L.headers)), headersToObject((V = G.options) == null ? void 0 : V.headers))
      })).then(async (R) => {
        if (S.value = R, y.value = R.status, F = await R[l.type](), c.afterFetch && y.value >= 200 && y.value < 300 && ({ data: F } = await c.afterFetch({ data: F, response: R })), P.value = F, !R.ok)
          throw new Error(R.statusText);
        return v.trigger(R), B(R);
      }).catch(async (R) => {
        let W = R.message || R.name;
        return c.onFetchError && ({ data: F, error: W } = await c.onFetchError({ data: F, error: R, response: S.value })), P.value = F, b.value = W, h.trigger(R), z ? U(R) : B(null);
      }).finally(() => {
        T(!1), x && x.stop(), f.trigger(null);
      });
    });
  }, E = resolveRef(c.refetch);
  watch([
    E,
    resolveRef(i)
  ], ([z]) => z && j(), { deep: !0 });
  const O = {
    isFinished: w,
    statusCode: y,
    response: S,
    error: b,
    data: P,
    isFetching: g,
    canAbort: C,
    aborted: _,
    abort: $,
    execute: j,
    onFetchResponse: v.on,
    onFetchError: h.on,
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
  function I(z) {
    return (D, L) => {
      if (!g.value) {
        l.method = z, l.payload = D, l.payloadType = L, isRef(l.payload) && watch([
          E,
          resolveRef(l.payload)
        ], ([G]) => G && j(), { deep: !0 });
        const N = resolveUnref(l.payload);
        return !L && N && Object.getPrototypeOf(N) === Object.prototype && !(N instanceof FormData) && (l.payloadType = "json"), __spreadProps$3(__spreadValues$c({}, O), {
          then(G, F) {
            return M().then(G, F);
          }
        });
      }
    };
  }
  function M() {
    return new Promise((z, D) => {
      until(w).toBe(!0).then(() => z(O)).catch((L) => D(L));
    });
  }
  function A(z) {
    return () => {
      if (!g.value)
        return l.type = z, __spreadProps$3(__spreadValues$c({}, O), {
          then(D, L) {
            return M().then(D, L);
          }
        });
    };
  }
  return c.immediate && setTimeout(j, 0), __spreadProps$3(__spreadValues$c({}, O), {
    then(z, D) {
      return M().then(z, D);
    }
  });
}
function joinPaths(i, s) {
  return !i.endsWith("/") && !s.startsWith("/") ? `${i}/${s}` : `${i}${s}`;
}
var __defProp$b = Object.defineProperty, __getOwnPropSymbols$c = Object.getOwnPropertySymbols, __hasOwnProp$c = Object.prototype.hasOwnProperty, __propIsEnum$c = Object.prototype.propertyIsEnumerable, __defNormalProp$b = (i, s, r) => s in i ? __defProp$b(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$b = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$c.call(s, r) && __defNormalProp$b(i, r, s[r]);
  if (__getOwnPropSymbols$c)
    for (var r of __getOwnPropSymbols$c(s))
      __propIsEnum$c.call(s, r) && __defNormalProp$b(i, r, s[r]);
  return i;
};
const DEFAULT_OPTIONS = {
  multiple: !0,
  accept: "*"
};
function useFileDialog(i = {}) {
  const {
    document: s = defaultDocument
  } = i, r = ref(null);
  let a;
  s && (a = s.createElement("input"), a.type = "file", a.onchange = (l) => {
    const p = l.target;
    r.value = p.files;
  });
  const d = (l) => {
    if (!a)
      return;
    const p = __spreadValues$b(__spreadValues$b(__spreadValues$b({}, DEFAULT_OPTIONS), i), l);
    a.multiple = p.multiple, a.accept = p.accept, hasOwn(p, "capture") && (a.capture = p.capture), a.click();
  }, c = () => {
    r.value = null, a && (a.value = "");
  };
  return {
    files: readonly(r),
    open: d,
    reset: c
  };
}
var __defProp$a = Object.defineProperty, __getOwnPropSymbols$b = Object.getOwnPropertySymbols, __hasOwnProp$b = Object.prototype.hasOwnProperty, __propIsEnum$b = Object.prototype.propertyIsEnumerable, __defNormalProp$a = (i, s, r) => s in i ? __defProp$a(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$a = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$b.call(s, r) && __defNormalProp$a(i, r, s[r]);
  if (__getOwnPropSymbols$b)
    for (var r of __getOwnPropSymbols$b(s))
      __propIsEnum$b.call(s, r) && __defNormalProp$a(i, r, s[r]);
  return i;
};
function useFileSystemAccess(i = {}) {
  const {
    window: s = defaultWindow,
    dataType: r = "Text"
  } = unref(i), a = s, d = useSupported(() => a && "showSaveFilePicker" in a && "showOpenFilePicker" in a), c = ref(), l = ref(), p = ref(), u = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.name) != null ? P : "";
  }), m = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.type) != null ? P : "";
  }), v = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.size) != null ? P : 0;
  }), h = computed(() => {
    var b, P;
    return (P = (b = p.value) == null ? void 0 : b.lastModified) != null ? P : 0;
  });
  async function f(b = {}) {
    if (!d.value)
      return;
    const [P] = await a.showOpenFilePicker(__spreadValues$a(__spreadValues$a({}, unref(i)), b));
    c.value = P, await y(), await S();
  }
  async function w(b = {}) {
    d.value && (c.value = await a.showSaveFilePicker(__spreadValues$a(__spreadValues$a({}, unref(i)), b)), l.value = void 0, await y(), await S());
  }
  async function g(b = {}) {
    if (d.value) {
      if (!c.value)
        return _(b);
      if (l.value) {
        const P = await c.value.createWritable();
        await P.write(l.value), await P.close();
      }
      await y();
    }
  }
  async function _(b = {}) {
    if (d.value) {
      if (c.value = await a.showSaveFilePicker(__spreadValues$a(__spreadValues$a({}, unref(i)), b)), l.value) {
        const P = await c.value.createWritable();
        await P.write(l.value), await P.close();
      }
      await y();
    }
  }
  async function y() {
    var b;
    p.value = await ((b = c.value) == null ? void 0 : b.getFile());
  }
  async function S() {
    var b, P;
    unref(r) === "Text" && (l.value = await ((b = p.value) == null ? void 0 : b.text())), unref(r) === "ArrayBuffer" && (l.value = await ((P = p.value) == null ? void 0 : P.arrayBuffer())), unref(r) === "Blob" && (l.value = p.value);
  }
  return watch(() => unref(r), S), {
    isSupported: d,
    data: l,
    file: p,
    fileName: u,
    fileMIME: m,
    fileSize: v,
    fileLastModified: h,
    open: f,
    create: w,
    save: g,
    saveAs: _,
    updateData: S
  };
}
function useFocus(i, s = {}) {
  const { initialValue: r = !1 } = s, a = useActiveElement(s), d = computed(() => unrefElement(i)), c = computed({
    get() {
      return isDef(a.value) && isDef(d.value) && a.value === d.value;
    },
    set(l) {
      var p, u;
      !l && c.value && ((p = d.value) == null || p.blur()), l && !c.value && ((u = d.value) == null || u.focus());
    }
  });
  return watch(d, () => {
    c.value = r;
  }, { immediate: !0, flush: "post" }), { focused: c };
}
function useFocusWithin(i, s = {}) {
  const r = useActiveElement(s), a = computed(() => unrefElement(i));
  return { focused: computed(() => a.value && r.value ? a.value.contains(r.value) : !1) };
}
function useFps(i) {
  var s;
  const r = ref(0);
  if (typeof performance > "u")
    return r;
  const a = (s = i == null ? void 0 : i.every) != null ? s : 10;
  let d = performance.now(), c = 0;
  return useRafFn(() => {
    if (c += 1, c >= a) {
      const l = performance.now(), p = l - d;
      r.value = Math.round(1e3 / (p / c)), d = l, c = 0;
    }
  }), r;
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
function useFullscreen(i, s = {}) {
  const { document: r = defaultDocument, autoExit: a = !1 } = s, d = i || (r == null ? void 0 : r.querySelector("html")), c = ref(!1);
  let l = functionsMap[0];
  const p = useSupported(() => {
    if (r) {
      for (const _ of functionsMap)
        if (_[1] in r)
          return l = _, !0;
    } else
      return !1;
    return !1;
  }), [u, m, v, , h] = l;
  async function f() {
    p.value && (r != null && r[v] && await r[m](), c.value = !1);
  }
  async function w() {
    if (!p.value)
      return;
    await f();
    const _ = unrefElement(d);
    _ && (await _[u](), c.value = !0);
  }
  async function g() {
    c.value ? await f() : await w();
  }
  return r && useEventListener(r, h, () => {
    c.value = !!(r != null && r[v]);
  }, !1), a && tryOnScopeDispose(f), {
    isSupported: p,
    isFullscreen: c,
    enter: w,
    exit: f,
    toggle: g
  };
}
function mapGamepadToXbox360Controller(i) {
  return computed(() => i.value ? {
    buttons: {
      a: i.value.buttons[0],
      b: i.value.buttons[1],
      x: i.value.buttons[2],
      y: i.value.buttons[3]
    },
    bumper: {
      left: i.value.buttons[4],
      right: i.value.buttons[5]
    },
    triggers: {
      left: i.value.buttons[6],
      right: i.value.buttons[7]
    },
    stick: {
      left: {
        horizontal: i.value.axes[0],
        vertical: i.value.axes[1],
        button: i.value.buttons[10]
      },
      right: {
        horizontal: i.value.axes[2],
        vertical: i.value.axes[3],
        button: i.value.buttons[11]
      }
    },
    dpad: {
      up: i.value.buttons[12],
      down: i.value.buttons[13],
      left: i.value.buttons[14],
      right: i.value.buttons[15]
    },
    back: i.value.buttons[8],
    start: i.value.buttons[9]
  } : null);
}
function useGamepad(i = {}) {
  const {
    navigator: s = defaultNavigator
  } = i, r = useSupported(() => s && "getGamepads" in s), a = ref([]), d = createEventHook(), c = createEventHook(), l = (w) => {
    const g = [], _ = "vibrationActuator" in w ? w.vibrationActuator : null;
    return _ && g.push(_), w.hapticActuators && g.push(...w.hapticActuators), {
      id: w.id,
      hapticActuators: g,
      index: w.index,
      mapping: w.mapping,
      connected: w.connected,
      timestamp: w.timestamp,
      axes: w.axes.map((y) => y),
      buttons: w.buttons.map((y) => ({ pressed: y.pressed, touched: y.touched, value: y.value }))
    };
  }, p = () => {
    const w = (s == null ? void 0 : s.getGamepads()) || [];
    for (let g = 0; g < w.length; ++g) {
      const _ = w[g];
      if (_) {
        const y = a.value.findIndex(({ index: S }) => S === _.index);
        y > -1 && (a.value[y] = l(_));
      }
    }
  }, { isActive: u, pause: m, resume: v } = useRafFn(p), h = (w) => {
    a.value.some(({ index: g }) => g === w.index) || (a.value.push(l(w)), d.trigger(w.index)), v();
  }, f = (w) => {
    a.value = a.value.filter((g) => g.index !== w.index), c.trigger(w.index);
  };
  return useEventListener("gamepadconnected", (w) => h(w.gamepad)), useEventListener("gamepaddisconnected", (w) => f(w.gamepad)), tryOnMounted(() => {
    const w = (s == null ? void 0 : s.getGamepads()) || [];
    if (w)
      for (let g = 0; g < w.length; ++g) {
        const _ = w[g];
        _ && h(_);
      }
  }), m(), {
    isSupported: r,
    onConnected: d.on,
    onDisconnected: c.on,
    gamepads: a,
    pause: m,
    resume: v,
    isActive: u
  };
}
function useGeolocation(i = {}) {
  const {
    enableHighAccuracy: s = !0,
    maximumAge: r = 3e4,
    timeout: a = 27e3,
    navigator: d = defaultNavigator,
    immediate: c = !0
  } = i, l = useSupported(() => d && "geolocation" in d), p = ref(null), u = ref(null), m = ref({
    accuracy: 0,
    latitude: 1 / 0,
    longitude: 1 / 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  });
  function v(g) {
    p.value = g.timestamp, m.value = g.coords, u.value = null;
  }
  let h;
  function f() {
    l.value && (h = d.geolocation.watchPosition(v, (g) => u.value = g, {
      enableHighAccuracy: s,
      maximumAge: r,
      timeout: a
    }));
  }
  c && f();
  function w() {
    h && d && d.geolocation.clearWatch(h);
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
function useIdle(i = oneMinute, s = {}) {
  const {
    initialState: r = !1,
    listenForVisibilityChange: a = !0,
    events: d = defaultEvents$1,
    window: c = defaultWindow,
    eventFilter: l = throttleFilter(50)
  } = s, p = ref(r), u = ref(timestamp());
  let m;
  const v = createFilterWrapper(l, () => {
    p.value = !1, u.value = timestamp(), clearTimeout(m), m = setTimeout(() => p.value = !0, i);
  });
  if (c) {
    const h = c.document;
    for (const f of d)
      useEventListener(c, f, v, { passive: !0 });
    a && useEventListener(h, "visibilitychange", () => {
      h.hidden || v();
    });
  }
  return m = setTimeout(() => p.value = !0, i), { idle: p, lastActive: u };
}
var __defProp$9 = Object.defineProperty, __getOwnPropSymbols$a = Object.getOwnPropertySymbols, __hasOwnProp$a = Object.prototype.hasOwnProperty, __propIsEnum$a = Object.prototype.propertyIsEnumerable, __defNormalProp$9 = (i, s, r) => s in i ? __defProp$9(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$9 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$a.call(s, r) && __defNormalProp$9(i, r, s[r]);
  if (__getOwnPropSymbols$a)
    for (var r of __getOwnPropSymbols$a(s))
      __propIsEnum$a.call(s, r) && __defNormalProp$9(i, r, s[r]);
  return i;
};
async function loadImage(i) {
  return new Promise((s, r) => {
    const a = new Image(), { src: d, srcset: c, sizes: l } = i;
    a.src = d, c && (a.srcset = c), l && (a.sizes = l), a.onload = () => s(a), a.onerror = r;
  });
}
const useImage = (i, s = {}) => {
  const r = useAsyncState(() => loadImage(resolveUnref(i)), void 0, __spreadValues$9({
    resetOnExecute: !0
  }, s));
  return watch(() => resolveUnref(i), () => r.execute(s.delay), { deep: !0 }), r;
}, ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(i, s = {}) {
  const {
    throttle: r = 0,
    idle: a = 200,
    onStop: d = noop,
    onScroll: c = noop,
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
  } = s, m = ref(0), v = ref(0), h = computed({
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
    var k, x, $;
    const T = resolveUnref(i);
    T && (($ = T instanceof Document ? document.body : T) == null || $.scrollTo({
      top: (k = resolveUnref(C)) != null ? k : f.value,
      left: (x = resolveUnref(P)) != null ? x : h.value,
      behavior: resolveUnref(u)
    }));
  }
  const g = ref(!1), _ = reactive({
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
    g.value = !1, y.left = !1, y.right = !1, y.top = !1, y.bottom = !1, d(P);
  }, r + a), b = (P) => {
    const C = P.target === document ? P.target.documentElement : P.target, k = C.scrollLeft;
    y.left = k < m.value, y.right = k > v.value, _.left = k <= 0 + (l.left || 0), _.right = k + C.clientWidth >= C.scrollWidth - (l.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS, m.value = k;
    let x = C.scrollTop;
    P.target === document && !x && (x = document.body.scrollTop), y.top = x < v.value, y.bottom = x > v.value, _.top = x <= 0 + (l.top || 0), _.bottom = x + C.clientHeight >= C.scrollHeight - (l.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS, v.value = x, g.value = !0, S(P), c(P);
  };
  return useEventListener(i, "scroll", r ? useThrottleFn(b, r, !0, !1) : b, p), {
    x: h,
    y: f,
    isScrolling: g,
    arrivedState: _,
    directions: y
  };
}
var __defProp$8 = Object.defineProperty, __defProps$2 = Object.defineProperties, __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$9 = Object.getOwnPropertySymbols, __hasOwnProp$9 = Object.prototype.hasOwnProperty, __propIsEnum$9 = Object.prototype.propertyIsEnumerable, __defNormalProp$8 = (i, s, r) => s in i ? __defProp$8(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$8 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$9.call(s, r) && __defNormalProp$8(i, r, s[r]);
  if (__getOwnPropSymbols$9)
    for (var r of __getOwnPropSymbols$9(s))
      __propIsEnum$9.call(s, r) && __defNormalProp$8(i, r, s[r]);
  return i;
}, __spreadProps$2 = (i, s) => __defProps$2(i, __getOwnPropDescs$2(s));
function useInfiniteScroll(i, s, r = {}) {
  var a, d;
  const c = (a = r.direction) != null ? a : "bottom", l = reactive(useScroll(i, __spreadProps$2(__spreadValues$8({}, r), {
    offset: __spreadValues$8({
      [c]: (d = r.distance) != null ? d : 0
    }, r.offset)
  })));
  watch(() => l.arrivedState[c], async (p) => {
    var u, m;
    if (p) {
      const v = resolveUnref(i), h = {
        height: (u = v == null ? void 0 : v.scrollHeight) != null ? u : 0,
        width: (m = v == null ? void 0 : v.scrollWidth) != null ? m : 0
      };
      await s(l), r.preserveScrollPosition && v && nextTick(() => {
        v.scrollTo({
          top: v.scrollHeight - h.height,
          left: v.scrollWidth - h.width
        });
      });
    }
  });
}
function useIntersectionObserver(i, s, r = {}) {
  const {
    root: a,
    rootMargin: d = "0px",
    threshold: c = 0.1,
    window: l = defaultWindow
  } = r, p = useSupported(() => l && "IntersectionObserver" in l);
  let u = noop;
  const m = p.value ? watch(() => ({
    el: unrefElement(i),
    root: unrefElement(a)
  }), ({ el: h, root: f }) => {
    if (u(), !h)
      return;
    const w = new IntersectionObserver(s, {
      root: f,
      rootMargin: d,
      threshold: c
    });
    w.observe(h), u = () => {
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
function useKeyModifier(i, s = {}) {
  const {
    events: r = defaultEvents,
    document: a = defaultDocument,
    initial: d = null
  } = s, c = ref(d);
  return a && r.forEach((l) => {
    useEventListener(a, l, (p) => {
      typeof p.getModifierState == "function" && (c.value = p.getModifierState(i));
    });
  }), c;
}
function useLocalStorage(i, s, r = {}) {
  const { window: a = defaultWindow } = r;
  return useStorage(i, s, a == null ? void 0 : a.localStorage, r);
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
function useMagicKeys(i = {}) {
  const {
    reactive: s = !1,
    target: r = defaultWindow,
    aliasMap: a = DefaultMagicKeysAliasMap,
    passive: d = !0,
    onEventFired: c = noop
  } = i, l = reactive(/* @__PURE__ */ new Set()), p = {
    toJSON() {
      return {};
    },
    current: l
  }, u = s ? reactive(p) : p, m = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Set();
  function h(_, y) {
    _ in u && (s ? u[_] = y : u[_].value = y);
  }
  function f() {
    l.clear();
    for (const _ of v)
      h(_, !1);
  }
  function w(_, y) {
    var S, b;
    const P = (S = _.key) == null ? void 0 : S.toLowerCase(), k = [(b = _.code) == null ? void 0 : b.toLowerCase(), P].filter(Boolean);
    P && (y ? l.add(P) : l.delete(P));
    for (const x of k)
      v.add(x), h(x, y);
    P === "meta" && !y ? (m.forEach((x) => {
      l.delete(x), h(x, !1);
    }), m.clear()) : typeof _.getModifierState == "function" && _.getModifierState("Meta") && y && [...l, ...k].forEach((x) => m.add(x));
  }
  useEventListener(r, "keydown", (_) => (w(_, !0), c(_)), { passive: d }), useEventListener(r, "keyup", (_) => (w(_, !1), c(_)), { passive: d }), useEventListener("blur", f, { passive: !0 }), useEventListener("focus", f, { passive: !0 });
  const g = new Proxy(u, {
    get(_, y, S) {
      if (typeof y != "string")
        return Reflect.get(_, y, S);
      if (y = y.toLowerCase(), y in a && (y = a[y]), !(y in u))
        if (/[+_-]/.test(y)) {
          const P = y.split(/[+_-]/g).map((C) => C.trim());
          u[y] = computed(() => P.every((C) => unref(g[C])));
        } else
          u[y] = ref(!1);
      const b = Reflect.get(_, y, S);
      return s ? unref(b) : b;
    }
  });
  return g;
}
var __defProp$7 = Object.defineProperty, __getOwnPropSymbols$8 = Object.getOwnPropertySymbols, __hasOwnProp$8 = Object.prototype.hasOwnProperty, __propIsEnum$8 = Object.prototype.propertyIsEnumerable, __defNormalProp$7 = (i, s, r) => s in i ? __defProp$7(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$7 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$8.call(s, r) && __defNormalProp$7(i, r, s[r]);
  if (__getOwnPropSymbols$8)
    for (var r of __getOwnPropSymbols$8(s))
      __propIsEnum$8.call(s, r) && __defNormalProp$7(i, r, s[r]);
  return i;
};
function usingElRef(i, s) {
  resolveUnref(i) && s(resolveUnref(i));
}
function timeRangeToArray(i) {
  let s = [];
  for (let r = 0; r < i.length; ++r)
    s = [...s, [i.start(r), i.end(r)]];
  return s;
}
function tracksToArray(i) {
  return Array.from(i).map(({ label: s, kind: r, language: a, mode: d, activeCues: c, cues: l, inBandMetadataTrackDispatchType: p }, u) => ({ id: u, label: s, kind: r, language: a, mode: d, activeCues: c, cues: l, inBandMetadataTrackDispatchType: p }));
}
const defaultOptions = {
  src: "",
  tracks: []
};
function useMediaControls(i, s = {}) {
  s = __spreadValues$7(__spreadValues$7({}, defaultOptions), s);
  const {
    document: r = defaultDocument
  } = s, a = ref(0), d = ref(0), c = ref(!1), l = ref(1), p = ref(!1), u = ref(!1), m = ref(!1), v = ref(1), h = ref(!1), f = ref([]), w = ref([]), g = ref(-1), _ = ref(!1), y = ref(!1), S = r && "pictureInPictureEnabled" in r, b = createEventHook(), P = (E) => {
    usingElRef(i, (O) => {
      if (E) {
        const I = isNumber(E) ? E : E.id;
        O.textTracks[I].mode = "disabled";
      } else
        for (let I = 0; I < O.textTracks.length; ++I)
          O.textTracks[I].mode = "disabled";
      g.value = -1;
    });
  }, C = (E, O = !0) => {
    usingElRef(i, (I) => {
      const M = isNumber(E) ? E : E.id;
      O && P(), I.textTracks[M].mode = "showing", g.value = M;
    });
  }, k = () => new Promise((E, O) => {
    usingElRef(i, async (I) => {
      S && (_.value ? r.exitPictureInPicture().then(E).catch(O) : I.requestPictureInPicture().then(E).catch(O));
    });
  });
  watchEffect(() => {
    if (!r)
      return;
    const E = resolveUnref(i);
    if (!E)
      return;
    const O = resolveUnref(s.src);
    let I = [];
    O && (isString(O) ? I = [{ src: O }] : Array.isArray(O) ? I = O : isObject(O) && (I = [O]), E.querySelectorAll("source").forEach((M) => {
      M.removeEventListener("error", b.trigger), M.remove();
    }), I.forEach(({ src: M, type: A }) => {
      const z = r.createElement("source");
      z.setAttribute("src", M), z.setAttribute("type", A || ""), z.addEventListener("error", b.trigger), E.appendChild(z);
    }), E.load());
  }), tryOnScopeDispose(() => {
    const E = resolveUnref(i);
    E && E.querySelectorAll("source").forEach((O) => O.removeEventListener("error", b.trigger));
  }), watch(l, (E) => {
    const O = resolveUnref(i);
    O && (O.volume = E);
  }), watch(y, (E) => {
    const O = resolveUnref(i);
    O && (O.muted = E);
  }), watch(v, (E) => {
    const O = resolveUnref(i);
    O && (O.playbackRate = E);
  }), watchEffect(() => {
    if (!r)
      return;
    const E = resolveUnref(s.tracks), O = resolveUnref(i);
    !E || !E.length || !O || (O.querySelectorAll("track").forEach((I) => I.remove()), E.forEach(({ default: I, kind: M, label: A, src: z, srcLang: D }, L) => {
      const N = r.createElement("track");
      N.default = I || !1, N.kind = M, N.label = A, N.src = z, N.srclang = D, N.default && (g.value = L), O.appendChild(N);
    }));
  });
  const { ignoreUpdates: x } = watchIgnorable(a, (E) => {
    const O = resolveUnref(i);
    O && (O.currentTime = E);
  }), { ignoreUpdates: $ } = watchIgnorable(m, (E) => {
    const O = resolveUnref(i);
    O && (E ? O.play() : O.pause());
  });
  useEventListener(i, "timeupdate", () => x(() => a.value = resolveUnref(i).currentTime)), useEventListener(i, "durationchange", () => d.value = resolveUnref(i).duration), useEventListener(i, "progress", () => f.value = timeRangeToArray(resolveUnref(i).buffered)), useEventListener(i, "seeking", () => c.value = !0), useEventListener(i, "seeked", () => c.value = !1), useEventListener(i, "waiting", () => p.value = !0), useEventListener(i, "playing", () => {
    p.value = !1, u.value = !1;
  }), useEventListener(i, "ratechange", () => v.value = resolveUnref(i).playbackRate), useEventListener(i, "stalled", () => h.value = !0), useEventListener(i, "ended", () => u.value = !0), useEventListener(i, "pause", () => $(() => m.value = !1)), useEventListener(i, "play", () => $(() => m.value = !0)), useEventListener(i, "enterpictureinpicture", () => _.value = !0), useEventListener(i, "leavepictureinpicture", () => _.value = !1), useEventListener(i, "volumechange", () => {
    const E = resolveUnref(i);
    E && (l.value = E.volume, y.value = E.muted);
  });
  const T = [], j = watch([i], () => {
    const E = resolveUnref(i);
    E && (j(), T[0] = useEventListener(E.textTracks, "addtrack", () => w.value = tracksToArray(E.textTracks)), T[1] = useEventListener(E.textTracks, "removetrack", () => w.value = tracksToArray(E.textTracks)), T[2] = useEventListener(E.textTracks, "change", () => w.value = tracksToArray(E.textTracks)));
  });
  return tryOnScopeDispose(() => T.forEach((E) => E())), {
    currentTime: a,
    duration: d,
    waiting: p,
    seeking: c,
    ended: u,
    stalled: h,
    buffered: f,
    playing: m,
    rate: v,
    volume: l,
    muted: y,
    tracks: w,
    selectedTrack: g,
    enableTrack: C,
    disableTrack: P,
    supportsPictureInPicture: S,
    togglePictureInPicture: k,
    isPictureInPicture: _,
    onSourceError: b.on
  };
}
const getMapVue2Compat = () => {
  const i = reactive({});
  return {
    get: (s) => i[s],
    set: (s, r) => set(i, s, r),
    has: (s) => hasOwn(i, s),
    delete: (s) => del(i, s),
    clear: () => {
      Object.keys(i).forEach((s) => {
        del(i, s);
      });
    }
  };
};
function useMemoize(i, s) {
  const a = (() => s != null && s.cache ? reactive(s.cache) : isVue2 ? getMapVue2Compat() : reactive(/* @__PURE__ */ new Map()))(), d = (...v) => s != null && s.getKey ? s.getKey(...v) : JSON.stringify(v), c = (v, ...h) => (a.set(v, i(...h)), a.get(v)), l = (...v) => c(d(...v), ...v), p = (...v) => {
    a.delete(d(...v));
  }, u = () => {
    a.clear();
  }, m = (...v) => {
    const h = d(...v);
    return a.has(h) ? a.get(h) : c(h, ...v);
  };
  return m.load = l, m.delete = p, m.clear = u, m.generateKey = d, m.cache = a, m;
}
function useMemory(i = {}) {
  const s = ref(), r = useSupported(() => typeof performance < "u" && "memory" in performance);
  if (r.value) {
    const { interval: a = 1e3 } = i;
    useIntervalFn(() => {
      s.value = performance.memory;
    }, a, { immediate: i.immediate, immediateCallback: i.immediateCallback });
  }
  return { isSupported: r, memory: s };
}
function useMounted() {
  const i = ref(!1);
  return onMounted(() => {
    i.value = !0;
  }), i;
}
function useMouse(i = {}) {
  const {
    type: s = "page",
    touch: r = !0,
    resetOnTouchEnds: a = !1,
    initialValue: d = { x: 0, y: 0 },
    window: c = defaultWindow,
    eventFilter: l
  } = i, p = ref(d.x), u = ref(d.y), m = ref(null), v = (_) => {
    s === "page" ? (p.value = _.pageX, u.value = _.pageY) : s === "client" ? (p.value = _.clientX, u.value = _.clientY) : s === "movement" && (p.value = _.movementX, u.value = _.movementY), m.value = "mouse";
  }, h = () => {
    p.value = d.x, u.value = d.y;
  }, f = (_) => {
    if (_.touches.length > 0) {
      const y = _.touches[0];
      s === "page" ? (p.value = y.pageX, u.value = y.pageY) : s === "client" && (p.value = y.clientX, u.value = y.clientY), m.value = "touch";
    }
  }, w = (_) => l === void 0 ? v(_) : l(() => v(_), {}), g = (_) => l === void 0 ? f(_) : l(() => f(_), {});
  return c && (useEventListener(c, "mousemove", w, { passive: !0 }), useEventListener(c, "dragover", w, { passive: !0 }), r && s !== "movement" && (useEventListener(c, "touchstart", g, { passive: !0 }), useEventListener(c, "touchmove", g, { passive: !0 }), a && useEventListener(c, "touchend", h, { passive: !0 }))), {
    x: p,
    y: u,
    sourceType: m
  };
}
function useMouseInElement(i, s = {}) {
  const {
    handleOutside: r = !0,
    window: a = defaultWindow
  } = s, { x: d, y: c, sourceType: l } = useMouse(s), p = ref(i ?? (a == null ? void 0 : a.document.body)), u = ref(0), m = ref(0), v = ref(0), h = ref(0), f = ref(0), w = ref(0), g = ref(!0);
  let _ = () => {
  };
  return a && (_ = watch([p, d, c], () => {
    const y = unrefElement(p);
    if (!y)
      return;
    const {
      left: S,
      top: b,
      width: P,
      height: C
    } = y.getBoundingClientRect();
    v.value = S + a.pageXOffset, h.value = b + a.pageYOffset, f.value = C, w.value = P;
    const k = d.value - v.value, x = c.value - h.value;
    g.value = P === 0 || C === 0 || k < 0 || x < 0 || k > P || x > C, (r || !g.value) && (u.value = k, m.value = x);
  }, { immediate: !0 }), useEventListener(document, "mouseleave", () => {
    g.value = !0;
  })), {
    x: d,
    y: c,
    sourceType: l,
    elementX: u,
    elementY: m,
    elementPositionX: v,
    elementPositionY: h,
    elementHeight: f,
    elementWidth: w,
    isOutside: g,
    stop: _
  };
}
function useMousePressed(i = {}) {
  const {
    touch: s = !0,
    drag: r = !0,
    initialValue: a = !1,
    window: d = defaultWindow
  } = i, c = ref(a), l = ref(null);
  if (!d)
    return {
      pressed: c,
      sourceType: l
    };
  const p = (v) => () => {
    c.value = !0, l.value = v;
  }, u = () => {
    c.value = !1, l.value = null;
  }, m = computed(() => unrefElement(i.target) || d);
  return useEventListener(m, "mousedown", p("mouse"), { passive: !0 }), useEventListener(d, "mouseleave", u, { passive: !0 }), useEventListener(d, "mouseup", u, { passive: !0 }), r && (useEventListener(m, "dragstart", p("mouse"), { passive: !0 }), useEventListener(d, "drop", u, { passive: !0 }), useEventListener(d, "dragend", u, { passive: !0 })), s && (useEventListener(m, "touchstart", p("touch"), { passive: !0 }), useEventListener(d, "touchend", u, { passive: !0 }), useEventListener(d, "touchcancel", u, { passive: !0 })), {
    pressed: c,
    sourceType: l
  };
}
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols, __hasOwnProp$7 = Object.prototype.hasOwnProperty, __propIsEnum$7 = Object.prototype.propertyIsEnumerable, __objRest$1 = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$7.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$7)
    for (var a of __getOwnPropSymbols$7(i))
      s.indexOf(a) < 0 && __propIsEnum$7.call(i, a) && (r[a] = i[a]);
  return r;
};
function useMutationObserver(i, s, r = {}) {
  const a = r, { window: d = defaultWindow } = a, c = __objRest$1(a, ["window"]);
  let l;
  const p = useSupported(() => d && "MutationObserver" in d), u = () => {
    l && (l.disconnect(), l = void 0);
  }, m = watch(() => unrefElement(i), (h) => {
    u(), p.value && d && h && (l = new MutationObserver(s), l.observe(h, c));
  }, { immediate: !0 }), v = () => {
    u(), m();
  };
  return tryOnScopeDispose(v), {
    isSupported: p,
    stop: v
  };
}
const useNavigatorLanguage = (i = {}) => {
  const { window: s = defaultWindow } = i, r = s == null ? void 0 : s.navigator, a = useSupported(() => r && "language" in r), d = ref(r == null ? void 0 : r.language);
  return useEventListener(s, "languagechange", () => {
    r && (d.value = r.language);
  }), {
    isSupported: a,
    language: d
  };
};
function useNetwork(i = {}) {
  const { window: s = defaultWindow } = i, r = s == null ? void 0 : s.navigator, a = useSupported(() => r && "connection" in r), d = ref(!0), c = ref(!1), l = ref(void 0), p = ref(void 0), u = ref(void 0), m = ref(void 0), v = ref(void 0), h = ref(void 0), f = ref("unknown"), w = a.value && r.connection;
  function g() {
    r && (d.value = r.onLine, l.value = d.value ? void 0 : Date.now(), p.value = d.value ? Date.now() : void 0, w && (u.value = w.downlink, m.value = w.downlinkMax, h.value = w.effectiveType, v.value = w.rtt, c.value = w.saveData, f.value = w.type));
  }
  return s && (useEventListener(s, "offline", () => {
    d.value = !1, l.value = Date.now();
  }), useEventListener(s, "online", () => {
    d.value = !0, p.value = Date.now();
  })), w && useEventListener(w, "change", g, !1), g(), {
    isSupported: a,
    isOnline: d,
    saveData: c,
    offlineAt: l,
    onlineAt: p,
    downlink: u,
    downlinkMax: m,
    effectiveType: h,
    rtt: v,
    type: f
  };
}
var __defProp$6 = Object.defineProperty, __getOwnPropSymbols$6 = Object.getOwnPropertySymbols, __hasOwnProp$6 = Object.prototype.hasOwnProperty, __propIsEnum$6 = Object.prototype.propertyIsEnumerable, __defNormalProp$6 = (i, s, r) => s in i ? __defProp$6(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$6 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$6.call(s, r) && __defNormalProp$6(i, r, s[r]);
  if (__getOwnPropSymbols$6)
    for (var r of __getOwnPropSymbols$6(s))
      __propIsEnum$6.call(s, r) && __defNormalProp$6(i, r, s[r]);
  return i;
};
function useNow(i = {}) {
  const {
    controls: s = !1,
    interval: r = "requestAnimationFrame"
  } = i, a = ref(new Date()), d = () => a.value = new Date(), c = r === "requestAnimationFrame" ? useRafFn(d, { immediate: !0 }) : useIntervalFn(d, r, { immediate: !0 });
  return s ? __spreadValues$6({
    now: a
  }, c) : a;
}
function useObjectUrl(i) {
  const s = ref(), r = () => {
    s.value && URL.revokeObjectURL(s.value), s.value = void 0;
  };
  return watch(() => unref(i), (a) => {
    r(), a && (s.value = URL.createObjectURL(a));
  }, { immediate: !0 }), tryOnScopeDispose(r), readonly(s);
}
function useClamp(i, s, r) {
  const a = ref(i);
  return computed({
    get() {
      return a.value = clamp(a.value, resolveUnref(s), resolveUnref(r));
    },
    set(d) {
      a.value = clamp(d, resolveUnref(s), resolveUnref(r));
    }
  });
}
function useOffsetPagination(i) {
  const {
    total: s = 1 / 0,
    pageSize: r = 10,
    page: a = 1,
    onPageChange: d = noop,
    onPageSizeChange: c = noop,
    onPageCountChange: l = noop
  } = i, p = useClamp(r, 1, 1 / 0), u = computed(() => Math.max(1, Math.ceil(unref(s) / unref(p)))), m = useClamp(a, 1, u), v = computed(() => m.value === 1), h = computed(() => m.value === u.value);
  isRef(a) && syncRef(a, m), isRef(r) && syncRef(r, p);
  function f() {
    m.value--;
  }
  function w() {
    m.value++;
  }
  const g = {
    currentPage: m,
    currentPageSize: p,
    pageCount: u,
    isFirstPage: v,
    isLastPage: h,
    prev: f,
    next: w
  };
  return watch(m, () => {
    d(reactive(g));
  }), watch(p, () => {
    c(reactive(g));
  }), watch(u, () => {
    l(reactive(g));
  }), g;
}
function useOnline(i = {}) {
  const { isOnline: s } = useNetwork(i);
  return s;
}
function usePageLeave(i = {}) {
  const { window: s = defaultWindow } = i, r = ref(!1), a = (d) => {
    if (!s)
      return;
    d = d || s.event;
    const c = d.relatedTarget || d.toElement;
    r.value = !c;
  };
  return s && (useEventListener(s, "mouseout", a, { passive: !0 }), useEventListener(s.document, "mouseleave", a, { passive: !0 }), useEventListener(s.document, "mouseenter", a, { passive: !0 })), r;
}
function useParallax(i, s = {}) {
  const {
    deviceOrientationTiltAdjust: r = (_) => _,
    deviceOrientationRollAdjust: a = (_) => _,
    mouseTiltAdjust: d = (_) => _,
    mouseRollAdjust: c = (_) => _,
    window: l = defaultWindow
  } = s, p = reactive(useDeviceOrientation({ window: l })), {
    elementX: u,
    elementY: m,
    elementWidth: v,
    elementHeight: h
  } = useMouseInElement(i, { handleOutside: !1, window: l }), f = computed(() => p.isSupported && (p.alpha != null && p.alpha !== 0 || p.gamma != null && p.gamma !== 0) ? "deviceOrientation" : "mouse"), w = computed(() => {
    if (f.value === "deviceOrientation") {
      const _ = -p.beta / 90;
      return a(_);
    } else {
      const _ = -(m.value - h.value / 2) / h.value;
      return c(_);
    }
  }), g = computed(() => {
    if (f.value === "deviceOrientation") {
      const _ = p.gamma / 90;
      return r(_);
    } else {
      const _ = (u.value - v.value / 2) / v.value;
      return d(_);
    }
  });
  return { roll: w, tilt: g, source: f };
}
var __defProp$5 = Object.defineProperty, __defProps$1 = Object.defineProperties, __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$5 = Object.getOwnPropertySymbols, __hasOwnProp$5 = Object.prototype.hasOwnProperty, __propIsEnum$5 = Object.prototype.propertyIsEnumerable, __defNormalProp$5 = (i, s, r) => s in i ? __defProp$5(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$5 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$5.call(s, r) && __defNormalProp$5(i, r, s[r]);
  if (__getOwnPropSymbols$5)
    for (var r of __getOwnPropSymbols$5(s))
      __propIsEnum$5.call(s, r) && __defNormalProp$5(i, r, s[r]);
  return i;
}, __spreadProps$1 = (i, s) => __defProps$1(i, __getOwnPropDescs$1(s));
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
function usePointer(i = {}) {
  const {
    target: s = defaultWindow
  } = i, r = ref(!1), a = ref(i.initialValue || {});
  Object.assign(a.value, defaultState, a.value);
  const d = (c) => {
    r.value = !0, !(i.pointerTypes && !i.pointerTypes.includes(c.pointerType)) && (a.value = objectPick(c, keys, !1));
  };
  return s && (useEventListener(s, "pointerdown", d, { passive: !0 }), useEventListener(s, "pointermove", d, { passive: !0 }), useEventListener(s, "pointerleave", () => r.value = !1, { passive: !0 })), __spreadProps$1(__spreadValues$5({}, toRefs(a)), {
    isInside: r
  });
}
function usePointerLock(i, s = {}) {
  const { document: r = defaultDocument, pointerLockOptions: a } = s, d = useSupported(() => r && "pointerLockElement" in r), c = ref(), l = ref();
  let p;
  d.value && (useEventListener(r, "pointerlockchange", () => {
    var v;
    const h = (v = r.pointerLockElement) != null ? v : c.value;
    p && h === p && (c.value = r.pointerLockElement, c.value || (p = l.value = null));
  }), useEventListener(r, "pointerlockerror", () => {
    var v;
    const h = (v = r.pointerLockElement) != null ? v : c.value;
    if (p && h === p) {
      const f = r.pointerLockElement ? "release" : "acquire";
      throw new Error(`Failed to ${f} pointer lock.`);
    }
  }));
  async function u(v, h) {
    var f;
    if (!d.value)
      throw new Error("Pointer Lock API is not supported by your browser.");
    if (l.value = v instanceof Event ? v.currentTarget : null, p = v instanceof Event ? (f = unrefElement(i)) != null ? f : l.value : unrefElement(v), !p)
      throw new Error("Target element undefined.");
    return p.requestPointerLock(h ?? a), await until(c).toBe(p);
  }
  async function m() {
    return c.value ? (r.exitPointerLock(), await until(c).toBeNull(), !0) : !1;
  }
  return {
    isSupported: d,
    element: c,
    triggerElement: l,
    lock: u,
    unlock: m
  };
}
var SwipeDirection;
(function(i) {
  i.UP = "UP", i.RIGHT = "RIGHT", i.DOWN = "DOWN", i.LEFT = "LEFT", i.NONE = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function useSwipe(i, s = {}) {
  const {
    threshold: r = 50,
    onSwipe: a,
    onSwipeEnd: d,
    onSwipeStart: c,
    passive: l = !0,
    window: p = defaultWindow
  } = s, u = reactive({ x: 0, y: 0 }), m = reactive({ x: 0, y: 0 }), v = computed(() => u.x - m.x), h = computed(() => u.y - m.y), { max: f, abs: w } = Math, g = computed(() => f(w(v.value), w(h.value)) >= r), _ = ref(!1), y = computed(() => g.value ? w(v.value) > w(h.value) ? v.value > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT : h.value > 0 ? SwipeDirection.UP : SwipeDirection.DOWN : SwipeDirection.NONE), S = (j) => [j.touches[0].clientX, j.touches[0].clientY], b = (j, E) => {
    u.x = j, u.y = E;
  }, P = (j, E) => {
    m.x = j, m.y = E;
  };
  let C;
  const k = checkPassiveEventSupport(p == null ? void 0 : p.document);
  l ? C = k ? { passive: !0 } : { capture: !1 } : C = k ? { passive: !1, capture: !0 } : { capture: !0 };
  const x = (j) => {
    _.value && (d == null || d(j, y.value)), _.value = !1;
  }, $ = [
    useEventListener(i, "touchstart", (j) => {
      C.capture && !C.passive && j.preventDefault();
      const [E, O] = S(j);
      b(E, O), P(E, O), c == null || c(j);
    }, C),
    useEventListener(i, "touchmove", (j) => {
      const [E, O] = S(j);
      P(E, O), !_.value && g.value && (_.value = !0), _.value && (a == null || a(j));
    }, C),
    useEventListener(i, "touchend", x, C),
    useEventListener(i, "touchcancel", x, C)
  ];
  return {
    isPassiveEventSupported: k,
    isSwiping: _,
    direction: y,
    coordsStart: u,
    coordsEnd: m,
    lengthX: v,
    lengthY: h,
    stop: () => $.forEach((j) => j())
  };
}
function checkPassiveEventSupport(i) {
  if (!i)
    return !1;
  let s = !1;
  const r = {
    get passive() {
      return s = !0, !1;
    }
  };
  return i.addEventListener("x", noop, r), i.removeEventListener("x", noop), s;
}
function usePointerSwipe(i, s = {}) {
  const r = resolveRef(i), {
    threshold: a = 50,
    onSwipe: d,
    onSwipeEnd: c,
    onSwipeStart: l
  } = s, p = reactive({ x: 0, y: 0 }), u = (x, $) => {
    p.x = x, p.y = $;
  }, m = reactive({ x: 0, y: 0 }), v = (x, $) => {
    m.x = x, m.y = $;
  }, h = computed(() => p.x - m.x), f = computed(() => p.y - m.y), { max: w, abs: g } = Math, _ = computed(() => w(g(h.value), g(f.value)) >= a), y = ref(!1), S = ref(!1), b = computed(() => _.value ? g(h.value) > g(f.value) ? h.value > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT : f.value > 0 ? SwipeDirection.UP : SwipeDirection.DOWN : SwipeDirection.NONE), P = (x) => {
    var $, T, j;
    const E = x.buttons === 0, O = x.buttons === 1;
    return (j = (T = ($ = s.pointerTypes) == null ? void 0 : $.includes(x.pointerType)) != null ? T : E || O) != null ? j : !0;
  }, C = [
    useEventListener(i, "pointerdown", (x) => {
      var $, T;
      if (!P(x))
        return;
      S.value = !0, (T = ($ = r.value) == null ? void 0 : $.style) == null || T.setProperty("touch-action", "none");
      const j = x.target;
      j == null || j.setPointerCapture(x.pointerId);
      const { clientX: E, clientY: O } = x;
      u(E, O), v(E, O), l == null || l(x);
    }),
    useEventListener(i, "pointermove", (x) => {
      if (!P(x) || !S.value)
        return;
      const { clientX: $, clientY: T } = x;
      v($, T), !y.value && _.value && (y.value = !0), y.value && (d == null || d(x));
    }),
    useEventListener(i, "pointerup", (x) => {
      var $, T;
      P(x) && (y.value && (c == null || c(x, b.value)), S.value = !1, y.value = !1, (T = ($ = r.value) == null ? void 0 : $.style) == null || T.setProperty("touch-action", "initial"));
    })
  ], k = () => C.forEach((x) => x());
  return {
    isSwiping: readonly(y),
    direction: readonly(b),
    posStart: readonly(p),
    posEnd: readonly(m),
    distanceX: h,
    distanceY: f,
    stop: k
  };
}
function usePreferredColorScheme(i) {
  const s = useMediaQuery("(prefers-color-scheme: light)", i), r = useMediaQuery("(prefers-color-scheme: dark)", i);
  return computed(() => r.value ? "dark" : s.value ? "light" : "no-preference");
}
function usePreferredContrast(i) {
  const s = useMediaQuery("(prefers-contrast: more)", i), r = useMediaQuery("(prefers-contrast: less)", i), a = useMediaQuery("(prefers-contrast: custom)", i);
  return computed(() => s.value ? "more" : r.value ? "less" : a.value ? "custom" : "no-preference");
}
function usePreferredLanguages(i = {}) {
  const { window: s = defaultWindow } = i;
  if (!s)
    return ref(["en"]);
  const r = s.navigator, a = ref(r.languages);
  return useEventListener(s, "languagechange", () => {
    a.value = r.languages;
  }), a;
}
function usePreferredReducedMotion(i) {
  const s = useMediaQuery("(prefers-reduced-motion: reduce)", i);
  return computed(() => s.value ? "reduce" : "no-preference");
}
function usePrevious(i, s) {
  const r = shallowRef(s);
  return watch(resolveRef(i), (a, d) => {
    r.value = d;
  }, { flush: "sync" }), readonly(r);
}
const useScreenOrientation = (i = {}) => {
  const {
    window: s = defaultWindow
  } = i, r = useSupported(() => s && "screen" in s && "orientation" in s.screen), a = r.value ? s.screen.orientation : {}, d = ref(a.type), c = ref(a.angle || 0);
  return r.value && useEventListener(s, "orientationchange", () => {
    d.value = a.type, c.value = a.angle;
  }), {
    isSupported: r,
    orientation: d,
    angle: c,
    lockOrientation: (u) => r.value ? a.lock(u) : Promise.reject(new Error("Not supported")),
    unlockOrientation: () => {
      r.value && a.unlock();
    }
  };
}, topVarName = "--vueuse-safe-area-top", rightVarName = "--vueuse-safe-area-right", bottomVarName = "--vueuse-safe-area-bottom", leftVarName = "--vueuse-safe-area-left";
function useScreenSafeArea() {
  const i = ref(""), s = ref(""), r = ref(""), a = ref("");
  if (isClient) {
    const c = useCssVar(topVarName), l = useCssVar(rightVarName), p = useCssVar(bottomVarName), u = useCssVar(leftVarName);
    c.value = "env(safe-area-inset-top, 0px)", l.value = "env(safe-area-inset-right, 0px)", p.value = "env(safe-area-inset-bottom, 0px)", u.value = "env(safe-area-inset-left, 0px)", d(), useEventListener("resize", useDebounceFn(d));
  }
  function d() {
    i.value = getValue(topVarName), s.value = getValue(rightVarName), r.value = getValue(bottomVarName), a.value = getValue(leftVarName);
  }
  return {
    top: i,
    right: s,
    bottom: r,
    left: a,
    update: d
  };
}
function getValue(i) {
  return getComputedStyle(document.documentElement).getPropertyValue(i);
}
function useScriptTag(i, s = noop, r = {}) {
  const {
    immediate: a = !0,
    manual: d = !1,
    type: c = "text/javascript",
    async: l = !0,
    crossOrigin: p,
    referrerPolicy: u,
    noModule: m,
    defer: v,
    document: h = defaultDocument,
    attrs: f = {}
  } = r, w = ref(null);
  let g = null;
  const _ = (b) => new Promise((P, C) => {
    const k = (T) => (w.value = T, P(T), T);
    if (!h) {
      P(!1);
      return;
    }
    let x = !1, $ = h.querySelector(`script[src="${resolveUnref(i)}"]`);
    $ ? $.hasAttribute("data-loaded") && k($) : ($ = h.createElement("script"), $.type = c, $.async = l, $.src = resolveUnref(i), v && ($.defer = v), p && ($.crossOrigin = p), m && ($.noModule = m), u && ($.referrerPolicy = u), Object.entries(f).forEach(([T, j]) => $ == null ? void 0 : $.setAttribute(T, j)), x = !0), $.addEventListener("error", (T) => C(T)), $.addEventListener("abort", (T) => C(T)), $.addEventListener("load", () => {
      $.setAttribute("data-loaded", "true"), s($), k($);
    }), x && ($ = h.head.appendChild($)), b || k($);
  }), y = (b = !0) => (g || (g = _(b)), g), S = () => {
    if (!h)
      return;
    g = null, w.value && (w.value = null);
    const b = h.querySelector(`script[src="${resolveUnref(i)}"]`);
    b && h.head.removeChild(b);
  };
  return a && !d && tryOnMounted(y), d || tryOnUnmounted(S), { scriptTag: w, load: y, unload: S };
}
function checkOverflowScroll(i) {
  const s = window.getComputedStyle(i);
  if (s.overflowX === "scroll" || s.overflowY === "scroll")
    return !0;
  {
    const r = i.parentNode;
    return !r || r.tagName === "BODY" ? !1 : checkOverflowScroll(r);
  }
}
function preventDefault(i) {
  const s = i || window.event, r = s.target;
  return checkOverflowScroll(r) ? !1 : s.touches.length > 1 ? !0 : (s.preventDefault && s.preventDefault(), !1);
}
function useScrollLock(i, s = !1) {
  const r = ref(s);
  let a = null, d;
  watch(resolveRef(i), (p) => {
    if (p) {
      const u = p;
      d = u.style.overflow, r.value && (u.style.overflow = "hidden");
    }
  }, {
    immediate: !0
  });
  const c = () => {
    const p = resolveUnref(i);
    !p || r.value || (isIOS && (a = useEventListener(p, "touchmove", (u) => {
      preventDefault(u);
    }, { passive: !1 })), p.style.overflow = "hidden", r.value = !0);
  }, l = () => {
    const p = resolveUnref(i);
    !p || !r.value || (isIOS && (a == null || a()), p.style.overflow = d, r.value = !1);
  };
  return tryOnScopeDispose(l), computed({
    get() {
      return r.value;
    },
    set(p) {
      p ? c() : l();
    }
  });
}
function useSessionStorage(i, s, r = {}) {
  const { window: a = defaultWindow } = r;
  return useStorage(i, s, a == null ? void 0 : a.sessionStorage, r);
}
var __defProp$4 = Object.defineProperty, __getOwnPropSymbols$4 = Object.getOwnPropertySymbols, __hasOwnProp$4 = Object.prototype.hasOwnProperty, __propIsEnum$4 = Object.prototype.propertyIsEnumerable, __defNormalProp$4 = (i, s, r) => s in i ? __defProp$4(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$4 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$4.call(s, r) && __defNormalProp$4(i, r, s[r]);
  if (__getOwnPropSymbols$4)
    for (var r of __getOwnPropSymbols$4(s))
      __propIsEnum$4.call(s, r) && __defNormalProp$4(i, r, s[r]);
  return i;
};
function useShare(i = {}, s = {}) {
  const { navigator: r = defaultNavigator } = s, a = r, d = useSupported(() => a && "canShare" in a);
  return {
    isSupported: d,
    share: async (l = {}) => {
      if (d.value) {
        const p = __spreadValues$4(__spreadValues$4({}, resolveUnref(i)), resolveUnref(l));
        let u = !0;
        if (p.files && a.canShare && (u = a.canShare({ files: p.files })), u)
          return a.share(p);
      }
    }
  };
}
const defaultSortFn = (i, s) => i.sort(s), defaultCompare = (i, s) => i - s;
function useSorted(...i) {
  var s, r, a, d;
  const [c] = i;
  let l = defaultCompare, p = {};
  i.length === 2 ? typeof i[1] == "object" ? (p = i[1], l = (s = p.compareFn) != null ? s : defaultCompare) : l = (r = i[1]) != null ? r : defaultCompare : i.length > 2 && (l = (a = i[1]) != null ? a : defaultCompare, p = (d = i[2]) != null ? d : {});
  const {
    dirty: u = !1,
    sortFn: m = defaultSortFn
  } = p;
  return u ? (watchEffect(() => {
    const v = m(unref(c), l);
    isRef(c) ? c.value = v : c.splice(0, c.length, ...v);
  }), c) : computed(() => m([...unref(c)], l));
}
function useSpeechRecognition(i = {}) {
  const {
    interimResults: s = !0,
    continuous: r = !0,
    window: a = defaultWindow
  } = i, d = resolveRef(i.lang || "en-US"), c = ref(!1), l = ref(!1), p = ref(""), u = shallowRef(void 0), m = (_ = !c.value) => {
    c.value = _;
  }, v = () => {
    c.value = !0;
  }, h = () => {
    c.value = !1;
  }, f = a && (a.SpeechRecognition || a.webkitSpeechRecognition), w = useSupported(() => f);
  let g;
  return w.value && (g = new f(), g.continuous = r, g.interimResults = s, g.lang = unref(d), g.onstart = () => {
    l.value = !1;
  }, watch(d, (_) => {
    g && !c.value && (g.lang = _);
  }), g.onresult = (_) => {
    const y = Array.from(_.results).map((S) => (l.value = S.isFinal, S[0])).map((S) => S.transcript).join("");
    p.value = y, u.value = void 0;
  }, g.onerror = (_) => {
    u.value = _;
  }, g.onend = () => {
    c.value = !1, g.lang = unref(d);
  }, watch(c, () => {
    c.value ? g.start() : g.stop();
  })), tryOnScopeDispose(() => {
    c.value = !1;
  }), {
    isSupported: w,
    isListening: c,
    isFinal: l,
    recognition: g,
    result: p,
    error: u,
    toggle: m,
    start: v,
    stop: h
  };
}
function useSpeechSynthesis(i, s = {}) {
  const {
    pitch: r = 1,
    rate: a = 1,
    volume: d = 1,
    window: c = defaultWindow
  } = s, l = c && c.speechSynthesis, p = useSupported(() => l), u = ref(!1), m = ref("init"), v = resolveRef(i || ""), h = resolveRef(s.lang || "en-US"), f = shallowRef(void 0), w = (S = !u.value) => {
    u.value = S;
  }, g = (S) => {
    S.lang = unref(h), S.voice = unref(s.voice) || null, S.pitch = r, S.rate = a, S.volume = d, S.onstart = () => {
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
    return g(S), S;
  }), y = () => {
    l.cancel(), _ && l.speak(_.value);
  };
  return p.value && (g(_.value), watch(h, (S) => {
    _.value && !u.value && (_.value.lang = S);
  }), s.voice && watch(s.voice, () => {
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
function useStepper(i, s) {
  const r = ref(i), a = computed(() => Array.isArray(r.value) ? r.value : Object.keys(r.value)), d = ref(a.value.indexOf(s ?? a.value[0])), c = computed(() => v(d.value)), l = computed(() => d.value === 0), p = computed(() => d.value === a.value.length - 1), u = computed(() => a.value[d.value + 1]), m = computed(() => a.value[d.value - 1]);
  function v(k) {
    return Array.isArray(r.value) ? r.value[k] : r.value[a.value[k]];
  }
  function h(k) {
    if (a.value.includes(k))
      return v(a.value.indexOf(k));
  }
  function f(k) {
    a.value.includes(k) && (d.value = a.value.indexOf(k));
  }
  function w() {
    p.value || d.value++;
  }
  function g() {
    l.value || d.value--;
  }
  function _(k) {
    C(k) && f(k);
  }
  function y(k) {
    return a.value.indexOf(k) === d.value + 1;
  }
  function S(k) {
    return a.value.indexOf(k) === d.value - 1;
  }
  function b(k) {
    return a.value.indexOf(k) === d.value;
  }
  function P(k) {
    return d.value < a.value.indexOf(k);
  }
  function C(k) {
    return d.value > a.value.indexOf(k);
  }
  return {
    steps: r,
    stepNames: a,
    index: d,
    current: c,
    next: u,
    previous: m,
    isFirst: l,
    isLast: p,
    at: v,
    get: h,
    goTo: f,
    goToNext: w,
    goToPrevious: g,
    goBackTo: _,
    isNext: y,
    isPrevious: S,
    isCurrent: b,
    isBefore: P,
    isAfter: C
  };
}
function useStorageAsync(i, s, r, a = {}) {
  var d;
  const {
    flush: c = "pre",
    deep: l = !0,
    listenToStorageChanges: p = !0,
    writeDefaults: u = !0,
    shallow: m,
    window: v = defaultWindow,
    eventFilter: h,
    onError: f = (b) => {
      console.error(b);
    }
  } = a, w = resolveUnref(s), g = guessSerializerType(w), _ = (m ? shallowRef : ref)(s), y = (d = a.serializer) != null ? d : StorageSerializers[g];
  if (!r)
    try {
      r = getSSRHandler("getDefaultStorage", () => {
        var b;
        return (b = defaultWindow) == null ? void 0 : b.localStorage;
      })();
    } catch (b) {
      f(b);
    }
  async function S(b) {
    if (!(!r || b && b.key !== i))
      try {
        const P = b ? b.newValue : await r.getItem(i);
        P == null ? (_.value = w, u && w !== null && await r.setItem(i, await y.write(w))) : _.value = await y.read(P);
      } catch (P) {
        f(P);
      }
  }
  return S(), v && p && useEventListener(v, "storage", (b) => setTimeout(() => S(b), 0)), r && watchWithFilter(_, async () => {
    try {
      _.value == null ? await r.removeItem(i) : await r.setItem(i, await y.write(_.value));
    } catch (b) {
      f(b);
    }
  }, {
    flush: c,
    deep: l,
    eventFilter: h
  }), _;
}
let _id = 0;
function useStyleTag(i, s = {}) {
  const r = ref(!1), {
    document: a = defaultDocument,
    immediate: d = !0,
    manual: c = !1,
    id: l = `vueuse_styletag_${++_id}`
  } = s, p = ref(i);
  let u = () => {
  };
  const m = () => {
    if (!a)
      return;
    const h = a.getElementById(l) || a.createElement("style");
    h.isConnected || (h.type = "text/css", h.id = l, s.media && (h.media = s.media), a.head.appendChild(h)), !r.value && (u = watch(p, (f) => {
      h.textContent = f;
    }, { immediate: !0 }), r.value = !0);
  }, v = () => {
    !a || !r.value || (u(), a.head.removeChild(a.getElementById(l)), r.value = !1);
  };
  return d && !c && tryOnMounted(m), c || tryOnScopeDispose(v), {
    id: l,
    css: p,
    unload: v,
    load: m,
    isLoaded: readonly(r)
  };
}
function useTemplateRefsList() {
  const i = ref([]);
  return i.value.set = (s) => {
    s && i.value.push(s);
  }, onBeforeUpdate(() => {
    i.value.length = 0;
  }), i;
}
function useTextDirection(i = {}) {
  const {
    document: s = defaultDocument,
    selector: r = "html",
    observe: a = !1,
    initialValue: d = "ltr"
  } = i;
  function c() {
    var p, u;
    return (u = (p = s == null ? void 0 : s.querySelector(r)) == null ? void 0 : p.getAttribute("dir")) != null ? u : d;
  }
  const l = ref(c());
  return tryOnMounted(() => l.value = c()), a && s && useMutationObserver(s.querySelector(r), () => l.value = c(), { attributes: !0 }), computed({
    get() {
      return l.value;
    },
    set(p) {
      var u, m;
      l.value = p, s && (l.value ? (u = s.querySelector(r)) == null || u.setAttribute("dir", l.value) : (m = s.querySelector(r)) == null || m.removeAttribute("dir"));
    }
  });
}
function getRangesFromSelection(i) {
  var s;
  const r = (s = i.rangeCount) != null ? s : 0, a = new Array(r);
  for (let d = 0; d < r; d++) {
    const c = i.getRangeAt(d);
    a[d] = c;
  }
  return a;
}
function useTextSelection(i = {}) {
  const {
    window: s = defaultWindow
  } = i, r = ref(null), a = computed(() => {
    var p, u;
    return (u = (p = r.value) == null ? void 0 : p.toString()) != null ? u : "";
  }), d = computed(() => r.value ? getRangesFromSelection(r.value) : []), c = computed(() => d.value.map((p) => p.getBoundingClientRect()));
  function l() {
    r.value = null, s && (r.value = s.getSelection());
  }
  return s && useEventListener(s.document, "selectionchange", l), {
    text: a,
    rects: c,
    ranges: d,
    selection: r
  };
}
function useTextareaAutosize(i) {
  const s = ref(i == null ? void 0 : i.element), r = ref(i == null ? void 0 : i.input);
  function a() {
    var d, c;
    s.value && (s.value.style.height = "1px", s.value.style.height = `${(d = s.value) == null ? void 0 : d.scrollHeight}px`, (c = i == null ? void 0 : i.onResize) == null || c.call(i));
  }
  return watch([r, s], a, { immediate: !0 }), useResizeObserver(s, () => a()), i != null && i.watch && watch(i.watch, a, { immediate: !0, deep: !0 }), {
    textarea: s,
    input: r,
    triggerResize: a
  };
}
var __defProp$3 = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$3 = Object.getOwnPropertySymbols, __hasOwnProp$3 = Object.prototype.hasOwnProperty, __propIsEnum$3 = Object.prototype.propertyIsEnumerable, __defNormalProp$3 = (i, s, r) => s in i ? __defProp$3(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$3 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$3.call(s, r) && __defNormalProp$3(i, r, s[r]);
  if (__getOwnPropSymbols$3)
    for (var r of __getOwnPropSymbols$3(s))
      __propIsEnum$3.call(s, r) && __defNormalProp$3(i, r, s[r]);
  return i;
}, __spreadProps = (i, s) => __defProps(i, __getOwnPropDescs(s));
function useThrottledRefHistory(i, s = {}) {
  const { throttle: r = 200, trailing: a = !0 } = s, d = throttleFilter(r, a), c = useRefHistory(i, __spreadProps(__spreadValues$3({}, s), { eventFilter: d }));
  return __spreadValues$3({}, c);
}
var __defProp$2 = Object.defineProperty, __getOwnPropSymbols$2 = Object.getOwnPropertySymbols, __hasOwnProp$2 = Object.prototype.hasOwnProperty, __propIsEnum$2 = Object.prototype.propertyIsEnumerable, __defNormalProp$2 = (i, s, r) => s in i ? __defProp$2(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$2 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$2.call(s, r) && __defNormalProp$2(i, r, s[r]);
  if (__getOwnPropSymbols$2)
    for (var r of __getOwnPropSymbols$2(s))
      __propIsEnum$2.call(s, r) && __defNormalProp$2(i, r, s[r]);
  return i;
}, __objRest = (i, s) => {
  var r = {};
  for (var a in i)
    __hasOwnProp$2.call(i, a) && s.indexOf(a) < 0 && (r[a] = i[a]);
  if (i != null && __getOwnPropSymbols$2)
    for (var a of __getOwnPropSymbols$2(i))
      s.indexOf(a) < 0 && __propIsEnum$2.call(i, a) && (r[a] = i[a]);
  return r;
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
  past: (i) => i.match(/\d/) ? `${i} ago` : i,
  future: (i) => i.match(/\d/) ? `in ${i}` : i,
  month: (i, s) => i === 1 ? s ? "last month" : "next month" : `${i} month${i > 1 ? "s" : ""}`,
  year: (i, s) => i === 1 ? s ? "last year" : "next year" : `${i} year${i > 1 ? "s" : ""}`,
  day: (i, s) => i === 1 ? s ? "yesterday" : "tomorrow" : `${i} day${i > 1 ? "s" : ""}`,
  week: (i, s) => i === 1 ? s ? "last week" : "next week" : `${i} week${i > 1 ? "s" : ""}`,
  hour: (i) => `${i} hour${i > 1 ? "s" : ""}`,
  minute: (i) => `${i} minute${i > 1 ? "s" : ""}`,
  second: (i) => `${i} second${i > 1 ? "s" : ""}`,
  invalid: ""
}, DEFAULT_FORMATTER = (i) => i.toISOString().slice(0, 10);
function useTimeAgo(i, s = {}) {
  const {
    controls: r = !1,
    updateInterval: a = 3e4
  } = s, d = useNow({ interval: a, controls: !0 }), { now: c } = d, l = __objRest(d, ["now"]), p = computed(() => formatTimeAgo(new Date(resolveUnref(i)), s, unref(c.value)));
  return r ? __spreadValues$2({
    timeAgo: p
  }, l) : p;
}
function formatTimeAgo(i, s = {}, r = Date.now()) {
  var a;
  const {
    max: d,
    messages: c = DEFAULT_MESSAGES,
    fullDateFormatter: l = DEFAULT_FORMATTER,
    units: p = DEFAULT_UNITS,
    showSecond: u = !1,
    rounding: m = "round"
  } = s, v = typeof m == "number" ? (y) => +y.toFixed(m) : Math[m], h = +r - +i, f = Math.abs(h);
  function w(y, S) {
    return v(Math.abs(y) / S.value);
  }
  function g(y, S) {
    const b = w(y, S), P = y > 0, C = _(S.name, b, P);
    return _(P ? "past" : "future", C, P);
  }
  function _(y, S, b) {
    const P = c[y];
    return typeof P == "function" ? P(S, b) : P.replace("{0}", S.toString());
  }
  if (f < 6e4 && !u)
    return c.justNow;
  if (typeof d == "number" && f > d)
    return l(new Date(i));
  if (typeof d == "string") {
    const y = (a = p.find((S) => S.name === d)) == null ? void 0 : a.max;
    if (y && f > y)
      return l(new Date(i));
  }
  for (const [y, S] of p.entries()) {
    if (w(h, S) <= 0 && p[y - 1])
      return g(h, p[y - 1]);
    if (f < S.max)
      return g(h, S);
  }
  return c.invalid;
}
function useTimeoutPoll(i, s, r) {
  const { start: a } = useTimeoutFn(c, s), d = ref(!1);
  async function c() {
    d.value && (await i(), a());
  }
  function l() {
    d.value || (d.value = !0, c());
  }
  function p() {
    d.value = !1;
  }
  return r != null && r.immediate && l(), tryOnScopeDispose(p), {
    isActive: d,
    pause: p,
    resume: l
  };
}
var __defProp$1 = Object.defineProperty, __getOwnPropSymbols$1 = Object.getOwnPropertySymbols, __hasOwnProp$1 = Object.prototype.hasOwnProperty, __propIsEnum$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$1 = (i, s, r) => s in i ? __defProp$1(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues$1 = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp$1.call(s, r) && __defNormalProp$1(i, r, s[r]);
  if (__getOwnPropSymbols$1)
    for (var r of __getOwnPropSymbols$1(s))
      __propIsEnum$1.call(s, r) && __defNormalProp$1(i, r, s[r]);
  return i;
};
function useTimestamp(i = {}) {
  const {
    controls: s = !1,
    offset: r = 0,
    immediate: a = !0,
    interval: d = "requestAnimationFrame",
    callback: c
  } = i, l = ref(timestamp() + r), p = () => l.value = timestamp() + r, u = c ? () => {
    p(), c(l.value);
  } : p, m = d === "requestAnimationFrame" ? useRafFn(u, { immediate: a }) : useIntervalFn(u, d, { immediate: a });
  return s ? __spreadValues$1({
    timestamp: l
  }, m) : l;
}
function useTitle(i = null, s = {}) {
  var r, a;
  const {
    document: d = defaultDocument
  } = s, c = resolveRef((r = i ?? (d == null ? void 0 : d.title)) != null ? r : null), l = i && isFunction(i);
  function p(u) {
    if (!("titleTemplate" in s))
      return u;
    const m = s.titleTemplate || "%s";
    return isFunction(m) ? m(u) : unref(m).replace(/%s/g, u);
  }
  return watch(c, (u, m) => {
    u !== m && d && (d.title = p(isString(u) ? u : ""));
  }, { immediate: !0 }), s.observe && !s.titleTemplate && d && !l && useMutationObserver((a = d.head) == null ? void 0 : a.querySelector("title"), () => {
    d && d.title !== c.value && (c.value = p(d.title));
  }, { childList: !0 }), c;
}
var __defProp = Object.defineProperty, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (i, s, r) => s in i ? __defProp(i, s, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[s] = r, __spreadValues = (i, s) => {
  for (var r in s || (s = {}))
    __hasOwnProp.call(s, r) && __defNormalProp(i, r, s[r]);
  if (__getOwnPropSymbols)
    for (var r of __getOwnPropSymbols(s))
      __propIsEnum.call(s, r) && __defNormalProp(i, r, s[r]);
  return i;
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
function createEasingFunction([i, s, r, a]) {
  const d = (v, h) => 1 - 3 * h + 3 * v, c = (v, h) => 3 * h - 6 * v, l = (v) => 3 * v, p = (v, h, f) => ((d(h, f) * v + c(h, f)) * v + l(h)) * v, u = (v, h, f) => 3 * d(h, f) * v * v + 2 * c(h, f) * v + l(h), m = (v) => {
    let h = v;
    for (let f = 0; f < 4; ++f) {
      const w = u(h, i, r);
      if (w === 0)
        return h;
      const g = p(h, i, r) - v;
      h -= g / w;
    }
    return h;
  };
  return (v) => i === s && r === a ? v : p(m(v), s, a);
}
function useTransition(i, s = {}) {
  const {
    delay: r = 0,
    disabled: a = !1,
    duration: d = 1e3,
    onFinished: c = noop,
    onStarted: l = noop,
    transition: p = identity
  } = s, u = computed(() => {
    const k = unref(p);
    return isFunction(k) ? k : createEasingFunction(k);
  }), m = computed(() => {
    const k = unref(i);
    return isNumber(k) ? k : k.map(unref);
  }), v = computed(() => isNumber(m.value) ? [m.value] : m.value), h = ref(v.value.slice(0));
  let f, w, g, _, y;
  const { resume: S, pause: b } = useRafFn(() => {
    const k = Date.now(), x = clamp(1 - (g - k) / f, 0, 1);
    h.value = y.map(($, T) => {
      var j;
      return $ + ((j = w[T]) != null ? j : 0) * u.value(x);
    }), x >= 1 && (b(), c());
  }, { immediate: !1 }), P = () => {
    b(), f = unref(d), w = h.value.map((k, x) => {
      var $, T;
      return (($ = v.value[x]) != null ? $ : 0) - ((T = h.value[x]) != null ? T : 0);
    }), y = h.value.slice(0), _ = Date.now(), g = _ + f, S(), l();
  }, C = useTimeoutFn(P, r, { immediate: !1 });
  return watch(v, () => {
    unref(a) || (unref(r) <= 0 ? P() : C.start());
  }, { deep: !0 }), watch(() => unref(a), (k) => {
    k && (h.value = v.value.slice(0), b());
  }), computed(() => {
    const k = unref(a) ? v : h;
    return isNumber(m.value) ? k.value[0] : k.value;
  });
}
function useUrlSearchParams(i = "history", s = {}) {
  const {
    initialValue: r = {},
    removeNullishValues: a = !0,
    removeFalsyValues: d = !1,
    write: c = !0,
    window: l = defaultWindow
  } = s;
  if (!l)
    return reactive(r);
  const p = reactive({});
  function u() {
    if (i === "history")
      return l.location.search || "";
    if (i === "hash") {
      const S = l.location.hash || "", b = S.indexOf("?");
      return b > 0 ? S.slice(b) : "";
    } else
      return (l.location.hash || "").replace(/^#/, "");
  }
  function m(S) {
    const b = S.toString();
    if (i === "history")
      return `${b ? `?${b}` : ""}${l.location.hash || ""}`;
    if (i === "hash-params")
      return `${l.location.search || ""}${b ? `#${b}` : ""}`;
    const P = l.location.hash || "#", C = P.indexOf("?");
    return C > 0 ? `${P.slice(0, C)}${b ? `?${b}` : ""}` : `${P}${b ? `?${b}` : ""}`;
  }
  function v() {
    return new URLSearchParams(u());
  }
  function h(S) {
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
      Array.isArray(P) ? P.forEach((C) => S.append(b, C)) : a && P == null || d && !P ? S.delete(b) : S.set(b, P);
    }), g(S);
  }, { deep: !0 });
  function g(S, b) {
    f(), b && h(S), l.history.replaceState(l.history.state, l.document.title, l.location.pathname + m(S)), w();
  }
  function _() {
    c && g(v(), !0);
  }
  useEventListener(l, "popstate", _, !1), i !== "history" && useEventListener(l, "hashchange", _, !1);
  const y = v();
  return y.keys().next().value ? h(y) : Object.assign(p, r), p;
}
function useUserMedia(i = {}) {
  var s, r;
  const a = ref((s = i.enabled) != null ? s : !1), d = ref((r = i.autoSwitch) != null ? r : !0), c = ref(i.videoDeviceId), l = ref(i.audioDeviceId), { navigator: p = defaultNavigator } = i, u = useSupported(() => {
    var y;
    return (y = p == null ? void 0 : p.mediaDevices) == null ? void 0 : y.getUserMedia;
  }), m = shallowRef();
  function v(y) {
    return y.value === "none" || y.value === !1 ? !1 : y.value == null ? !0 : {
      deviceId: y.value
    };
  }
  async function h() {
    if (!(!u.value || m.value))
      return m.value = await p.mediaDevices.getUserMedia({
        video: v(c),
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
  async function g() {
    return await h(), m.value && (a.value = !0), m.value;
  }
  async function _() {
    return f(), await g();
  }
  return watch(a, (y) => {
    y ? h() : f();
  }, { immediate: !0 }), watch([c, l], () => {
    d.value && m.value && _();
  }, { immediate: !0 }), {
    isSupported: u,
    stream: m,
    start: g,
    stop: w,
    restart: _,
    videoDeviceId: c,
    audioDeviceId: l,
    enabled: a,
    autoSwitch: d
  };
}
function useVModel(i, s, r, a = {}) {
  var d, c, l, p, u;
  const {
    clone: m = !1,
    passive: v = !1,
    eventName: h,
    deep: f = !1,
    defaultValue: w
  } = a, g = getCurrentInstance(), _ = r || (g == null ? void 0 : g.emit) || ((d = g == null ? void 0 : g.$emit) == null ? void 0 : d.bind(g)) || ((l = (c = g == null ? void 0 : g.proxy) == null ? void 0 : c.$emit) == null ? void 0 : l.bind(g == null ? void 0 : g.proxy));
  let y = h;
  if (!s)
    if (isVue2) {
      const P = (u = (p = g == null ? void 0 : g.proxy) == null ? void 0 : p.$options) == null ? void 0 : u.model;
      s = (P == null ? void 0 : P.value) || "value", h || (y = (P == null ? void 0 : P.event) || "input");
    } else
      s = "modelValue";
  y = h || y || `update:${s.toString()}`;
  const S = (P) => m ? isFunction(m) ? m(P) : cloneFnJSON(P) : P, b = () => isDef(i[s]) ? S(i[s]) : w;
  if (v) {
    const P = b(), C = ref(P);
    return watch(() => i[s], (k) => C.value = S(k)), watch(C, (k) => {
      (k !== i[s] || f) && _(y, k);
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
function useVModels(i, s, r = {}) {
  const a = {};
  for (const d in i)
    a[d] = useVModel(i, d, s, r);
  return a;
}
function useVibrate(i) {
  const {
    pattern: s = [],
    interval: r = 0,
    navigator: a = defaultNavigator
  } = i || {}, d = useSupported(() => typeof a < "u" && "vibrate" in a), c = resolveRef(s);
  let l;
  const p = (m = c.value) => {
    d.value && a.vibrate(m);
  }, u = () => {
    d.value && a.vibrate(0), l == null || l.pause();
  };
  return r > 0 && (l = useIntervalFn(p, r, {
    immediate: !1,
    immediateCallback: !1
  })), {
    isSupported: d,
    pattern: s,
    intervalControls: l,
    vibrate: p,
    stop: u
  };
}
function useVirtualList(i, s) {
  const { containerStyle: r, wrapperProps: a, scrollTo: d, calculateRange: c, currentList: l, containerRef: p } = "itemHeight" in s ? useVerticalVirtualList(s, i) : useHorizontalVirtualList(s, i);
  return {
    list: l,
    scrollTo: d,
    containerProps: {
      ref: p,
      onScroll: () => {
        c();
      },
      style: r
    },
    wrapperProps: a
  };
}
function useVirtualListResources(i) {
  const s = ref(null), r = useElementSize(s), a = ref([]), d = shallowRef(i);
  return { state: ref({ start: 0, end: 10 }), source: d, currentList: a, size: r, containerRef: s };
}
function createGetViewCapacity(i, s, r) {
  return (a) => {
    if (typeof r == "number")
      return Math.ceil(a / r);
    const { start: d = 0 } = i.value;
    let c = 0, l = 0;
    for (let p = d; p < s.value.length; p++) {
      const u = r(p);
      if (c += u, l = p, c > a)
        break;
    }
    return l - d;
  };
}
function createGetOffset(i, s) {
  return (r) => {
    if (typeof s == "number")
      return Math.floor(r / s) + 1;
    let a = 0, d = 0;
    for (let c = 0; c < i.value.length; c++) {
      const l = s(c);
      if (a += l, a >= r) {
        d = c;
        break;
      }
    }
    return d + 1;
  };
}
function createCalculateRange(i, s, r, a, { containerRef: d, state: c, currentList: l, source: p }) {
  return () => {
    const u = d.value;
    if (u) {
      const m = r(i === "vertical" ? u.scrollTop : u.scrollLeft), v = a(i === "vertical" ? u.clientHeight : u.clientWidth), h = m - s, f = m + v + s;
      c.value = {
        start: h < 0 ? 0 : h,
        end: f > p.value.length ? p.value.length : f
      }, l.value = p.value.slice(c.value.start, c.value.end).map((w, g) => ({
        data: w,
        index: g + c.value.start
      }));
    }
  };
}
function createGetDistance(i, s) {
  return (r) => typeof i == "number" ? r * i : s.value.slice(0, r).reduce((d, c, l) => d + i(l), 0);
}
function useWatchForSizes(i, s, r) {
  watch([i.width, i.height, s], () => {
    r();
  });
}
function createComputedTotalSize(i, s) {
  return computed(() => typeof i == "number" ? s.value.length * i : s.value.reduce((r, a, d) => r + i(d), 0));
}
const scrollToDictionaryForElementScrollKey = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function createScrollTo(i, s, r, a) {
  return (d) => {
    a.value && (a.value[scrollToDictionaryForElementScrollKey[i]] = r(d), s());
  };
}
function useHorizontalVirtualList(i, s) {
  const r = useVirtualListResources(s), { state: a, source: d, currentList: c, size: l, containerRef: p } = r, u = { overflowX: "auto" }, { itemWidth: m, overscan: v = 5 } = i, h = createGetViewCapacity(a, d, m), f = createGetOffset(d, m), w = createCalculateRange("horizontal", v, f, h, r), g = createGetDistance(m, d), _ = computed(() => g(a.value.start)), y = createComputedTotalSize(m, d);
  useWatchForSizes(l, s, w);
  const S = createScrollTo("horizontal", w, g, p), b = computed(() => ({
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
    currentList: c,
    containerRef: p
  };
}
function useVerticalVirtualList(i, s) {
  const r = useVirtualListResources(s), { state: a, source: d, currentList: c, size: l, containerRef: p } = r, u = { overflowY: "auto" }, { itemHeight: m, overscan: v = 5 } = i, h = createGetViewCapacity(a, d, m), f = createGetOffset(d, m), w = createCalculateRange("vertical", v, f, h, r), g = createGetDistance(m, d), _ = computed(() => g(a.value.start)), y = createComputedTotalSize(m, d);
  useWatchForSizes(l, s, w);
  const S = createScrollTo("vertical", w, g, p), b = computed(() => ({
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
    currentList: c,
    containerRef: p
  };
}
const useWakeLock = (i = {}) => {
  const {
    navigator: s = defaultNavigator,
    document: r = defaultDocument
  } = i;
  let a;
  const d = useSupported(() => s && "wakeLock" in s), c = ref(!1);
  async function l() {
    !d.value || !a || (r && r.visibilityState === "visible" && (a = await s.wakeLock.request("screen")), c.value = !a.released);
  }
  r && useEventListener(r, "visibilitychange", l, { passive: !0 });
  async function p(m) {
    d.value && (a = await s.wakeLock.request(m), c.value = !a.released);
  }
  async function u() {
    !d.value || !a || (await a.release(), c.value = !a.released, a = null);
  }
  return {
    isSupported: d,
    isActive: c,
    request: p,
    release: u
  };
}, useWebNotification = (i = {}) => {
  const {
    window: s = defaultWindow
  } = i, r = useSupported(() => !!s && "Notification" in s), a = ref(null), d = async () => {
    r.value && "permission" in Notification && Notification.permission !== "denied" && await Notification.requestPermission();
  }, c = createEventHook(), l = createEventHook(), p = createEventHook(), u = createEventHook(), m = async (h) => {
    if (!r.value)
      return;
    await d();
    const f = Object.assign({}, i, h);
    return a.value = new Notification(f.title || "", f), a.value.onclick = (w) => c.trigger(w), a.value.onshow = (w) => l.trigger(w), a.value.onerror = (w) => p.trigger(w), a.value.onclose = (w) => u.trigger(w), a.value;
  }, v = () => {
    a.value && a.value.close(), a.value = null;
  };
  if (tryOnMounted(async () => {
    r.value && await d();
  }), tryOnScopeDispose(v), r.value && s) {
    const h = s.document;
    useEventListener(h, "visibilitychange", (f) => {
      f.preventDefault(), h.visibilityState === "visible" && v();
    });
  }
  return {
    isSupported: r,
    notification: a,
    show: m,
    close: v,
    onClick: c,
    onShow: l,
    onError: p,
    onClose: u
  };
}, DEFAULT_PING_MESSAGE = "ping";
function resolveNestedOptions(i) {
  return i === !0 ? {} : i;
}
function useWebSocket(i, s = {}) {
  const {
    onConnected: r,
    onDisconnected: a,
    onError: d,
    onMessage: c,
    immediate: l = !0,
    autoClose: p = !0,
    protocols: u = []
  } = s, m = ref(null), v = ref("CLOSED"), h = ref(), f = resolveRef(i);
  let w, g, _ = !1, y = 0, S = [], b;
  const P = (j = 1e3, E) => {
    h.value && (_ = !0, w == null || w(), h.value.close(j, E));
  }, C = () => {
    if (S.length && h.value && v.value === "OPEN") {
      for (const j of S)
        h.value.send(j);
      S = [];
    }
  }, k = () => {
    clearTimeout(b), b = void 0;
  }, x = (j, E = !0) => !h.value || v.value !== "OPEN" ? (E && S.push(j), !1) : (C(), h.value.send(j), !0), $ = () => {
    if (_ || typeof f.value > "u")
      return;
    const j = new WebSocket(f.value, u);
    h.value = j, v.value = "CONNECTING", j.onopen = () => {
      v.value = "OPEN", r == null || r(j), g == null || g(), C();
    }, j.onclose = (E) => {
      if (v.value = "CLOSED", h.value = void 0, a == null || a(j, E), !_ && s.autoReconnect) {
        const {
          retries: O = -1,
          delay: I = 1e3,
          onFailed: M
        } = resolveNestedOptions(s.autoReconnect);
        y += 1, typeof O == "number" && (O < 0 || y < O) || typeof O == "function" && O() ? setTimeout($, I) : M == null || M();
      }
    }, j.onerror = (E) => {
      d == null || d(j, E);
    }, j.onmessage = (E) => {
      if (s.heartbeat) {
        k();
        const {
          message: O = DEFAULT_PING_MESSAGE
        } = resolveNestedOptions(s.heartbeat);
        if (E.data === O)
          return;
      }
      m.value = E.data, c == null || c(j, E);
    };
  };
  if (s.heartbeat) {
    const {
      message: j = DEFAULT_PING_MESSAGE,
      interval: E = 1e3,
      pongTimeout: O = 1e3
    } = resolveNestedOptions(s.heartbeat), { pause: I, resume: M } = useIntervalFn(() => {
      x(j, !1), b == null && (b = setTimeout(() => {
        P();
      }, O));
    }, E, { immediate: !1 });
    w = I, g = M;
  }
  p && (useEventListener(window, "beforeunload", () => P()), tryOnScopeDispose(P));
  const T = () => {
    P(), _ = !1, y = 0, $();
  };
  return l && watch(f, T, { immediate: !0 }), {
    data: m,
    status: v,
    close: P,
    send: x,
    open: T,
    ws: h
  };
}
function useWebWorker(i, s, r) {
  const {
    window: a = defaultWindow
  } = r ?? {}, d = ref(null), c = shallowRef(), l = function(m) {
    c.value && c.value.postMessage(m);
  }, p = function() {
    c.value && c.value.terminate();
  };
  return a && (isString(i) ? c.value = new Worker(i, s) : isFunction(i) ? c.value = i() : c.value = i, c.value.onmessage = (u) => {
    d.value = u.data;
  }, tryOnScopeDispose(() => {
    c.value && c.value.terminate();
  })), {
    data: d,
    post: l,
    terminate: p,
    worker: c
  };
}
const jobRunner = (i) => (s) => {
  const r = s.data[0];
  return Promise.resolve(i.apply(void 0, r)).then((a) => {
    postMessage(["SUCCESS", a]);
  }).catch((a) => {
    postMessage(["ERROR", a]);
  });
}, depsParser = (i) => i.length === 0 ? "" : `importScripts(${i.map((r) => `'${r}'`).toString()})`, createWorkerBlobUrl = (i, s) => {
  const r = `${depsParser(s)}; onmessage=(${jobRunner})(${i})`, a = new Blob([r], { type: "text/javascript" });
  return URL.createObjectURL(a);
}, useWebWorkerFn = (i, s = {}) => {
  const {
    dependencies: r = [],
    timeout: a,
    window: d = defaultWindow
  } = s, c = ref(), l = ref("PENDING"), p = ref({}), u = ref(), m = (w = "PENDING") => {
    c.value && c.value._url && d && (c.value.terminate(), URL.revokeObjectURL(c.value._url), p.value = {}, c.value = void 0, d.clearTimeout(u.value), l.value = w);
  };
  m(), tryOnScopeDispose(m);
  const v = () => {
    const w = createWorkerBlobUrl(i, r), g = new Worker(w);
    return g._url = w, g.onmessage = (_) => {
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
    }, g.onerror = (_) => {
      const { reject: y = () => {
      } } = p.value;
      y(_), m("ERROR");
    }, a && (u.value = setTimeout(() => m("TIMEOUT_EXPIRED"), a)), g;
  }, h = (...w) => new Promise((g, _) => {
    p.value = {
      resolve: g,
      reject: _
    }, c.value && c.value.postMessage([[...w]]), l.value = "RUNNING";
  });
  return {
    workerFn: (...w) => l.value === "RUNNING" ? (console.error("[useWebWorkerFn] You can only run one instance of the worker at a time."), Promise.reject()) : (c.value = v(), h(...w)),
    workerStatus: l,
    workerTerminate: m
  };
};
function useWindowFocus({ window: i = defaultWindow } = {}) {
  if (!i)
    return ref(!1);
  const s = ref(i.document.hasFocus());
  return useEventListener(i, "blur", () => {
    s.value = !1;
  }), useEventListener(i, "focus", () => {
    s.value = !0;
  }), s;
}
function useWindowScroll({ window: i = defaultWindow } = {}) {
  if (!i)
    return {
      x: ref(0),
      y: ref(0)
    };
  const s = ref(i.pageXOffset), r = ref(i.pageYOffset);
  return useEventListener(i, "scroll", () => {
    s.value = i.pageXOffset, r.value = i.pageYOffset;
  }, {
    capture: !1,
    passive: !0
  }), { x: s, y: r };
}
function useWindowSize(i = {}) {
  const {
    window: s = defaultWindow,
    initialWidth: r = 1 / 0,
    initialHeight: a = 1 / 0,
    listenOrientation: d = !0,
    includeScrollbar: c = !0
  } = i, l = ref(r), p = ref(a), u = () => {
    s && (c ? (l.value = s.innerWidth, p.value = s.innerHeight) : (l.value = s.document.documentElement.clientWidth, p.value = s.document.documentElement.clientHeight));
  };
  return u(), tryOnMounted(u), useEventListener("resize", u, { passive: !0 }), d && useEventListener("orientationchange", u, { passive: !0 }), { width: l, height: p };
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function getDefaultExportFromNamespaceIfPresent(i) {
  return i && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function getDefaultExportFromNamespaceIfNotNamed(i) {
  return i && Object.prototype.hasOwnProperty.call(i, "default") && Object.keys(i).length === 1 ? i.default : i;
}
function getAugmentedNamespace(i) {
  if (i.__esModule)
    return i;
  var s = i.default;
  if (typeof s == "function") {
    var r = function a() {
      if (this instanceof a) {
        var d = [null];
        d.push.apply(d, arguments);
        var c = Function.bind.apply(s, d);
        return new c();
      }
      return s.apply(this, arguments);
    };
    r.prototype = s.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(i).forEach(function(a) {
    var d = Object.getOwnPropertyDescriptor(i, a);
    Object.defineProperty(r, a, d.get ? d : {
      enumerable: !0,
      get: function() {
        return i[a];
      }
    });
  }), r;
}
var lib = {}, balancedMatch = function(i, s, r) {
  for (var a = 0, d = {}, c = 0; c < r.length; c++)
    if (i == r.substr(c, i.length))
      "start" in d || (d.start = c), a++;
    else if (s == r.substr(c, s.length) && "start" in d && (a--, !a))
      return d.end = c, d.pre = r.substr(0, d.start), d.body = d.end - d.start > 1 ? r.substring(d.start + i.length, d.end) : "", d.post = r.slice(d.end + s.length), d;
}, cloneExports = {}, clone$2 = {
  get exports() {
    return cloneExports;
  },
  set exports(i) {
    cloneExports = i;
  }
};
(function(i) {
  var s = function() {
    "use strict";
    function r(u, m, v, h) {
      var f;
      typeof m == "object" && (v = m.depth, h = m.prototype, f = m.filter, m = m.circular);
      var w = [], g = [], _ = typeof Buffer < "u";
      typeof m > "u" && (m = !0), typeof v > "u" && (v = 1 / 0);
      function y(S, b) {
        if (S === null)
          return null;
        if (b == 0)
          return S;
        var P, C;
        if (typeof S != "object")
          return S;
        if (r.__isArray(S))
          P = [];
        else if (r.__isRegExp(S))
          P = new RegExp(S.source, p(S)), S.lastIndex && (P.lastIndex = S.lastIndex);
        else if (r.__isDate(S))
          P = new Date(S.getTime());
        else {
          if (_ && Buffer.isBuffer(S))
            return Buffer.allocUnsafe ? P = Buffer.allocUnsafe(S.length) : P = new Buffer(S.length), S.copy(P), P;
          typeof h > "u" ? (C = Object.getPrototypeOf(S), P = Object.create(C)) : (P = Object.create(h), C = h);
        }
        if (m) {
          var k = w.indexOf(S);
          if (k != -1)
            return g[k];
          w.push(S), g.push(P);
        }
        for (var x in S) {
          var $;
          C && ($ = Object.getOwnPropertyDescriptor(C, x)), !($ && $.set == null) && (P[x] = y(S[x], b - 1));
        }
        return P;
      }
      return y(u, v);
    }
    r.clonePrototype = function(m) {
      if (m === null)
        return null;
      var v = function() {
      };
      return v.prototype = m, new v();
    };
    function a(u) {
      return Object.prototype.toString.call(u);
    }
    r.__objToStr = a;
    function d(u) {
      return typeof u == "object" && a(u) === "[object Date]";
    }
    r.__isDate = d;
    function c(u) {
      return typeof u == "object" && a(u) === "[object Array]";
    }
    r.__isArray = c;
    function l(u) {
      return typeof u == "object" && a(u) === "[object RegExp]";
    }
    r.__isRegExp = l;
    function p(u) {
      var m = "";
      return u.global && (m += "g"), u.ignoreCase && (m += "i"), u.multiline && (m += "m"), m;
    }
    return r.__getRegExpFlags = p, r;
  }();
  i.exports && (i.exports = s);
})(clone$2);
const clone_1 = cloneExports;
var conversionsExports = {}, conversions$2 = {
  get exports() {
    return conversionsExports;
  },
  set exports(i) {
    conversionsExports = i;
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
convert$4.rgb.hsl = function(i) {
  var s = i[0] / 255, r = i[1] / 255, a = i[2] / 255, d = Math.min(s, r, a), c = Math.max(s, r, a), l = c - d, p, u, m;
  return c === d ? p = 0 : s === c ? p = (r - a) / l : r === c ? p = 2 + (a - s) / l : a === c && (p = 4 + (s - r) / l), p = Math.min(p * 60, 360), p < 0 && (p += 360), m = (d + c) / 2, c === d ? u = 0 : m <= 0.5 ? u = l / (c + d) : u = l / (2 - c - d), [p, u * 100, m * 100];
};
convert$4.rgb.hsv = function(i) {
  var s, r, a, d, c, l = i[0] / 255, p = i[1] / 255, u = i[2] / 255, m = Math.max(l, p, u), v = m - Math.min(l, p, u), h = function(f) {
    return (m - f) / 6 / v + 1 / 2;
  };
  return v === 0 ? d = c = 0 : (c = v / m, s = h(l), r = h(p), a = h(u), l === m ? d = a - r : p === m ? d = 1 / 3 + s - a : u === m && (d = 2 / 3 + r - s), d < 0 ? d += 1 : d > 1 && (d -= 1)), [
    d * 360,
    c * 100,
    m * 100
  ];
};
convert$4.rgb.hwb = function(i) {
  var s = i[0], r = i[1], a = i[2], d = convert$4.rgb.hsl(i)[0], c = 1 / 255 * Math.min(s, Math.min(r, a));
  return a = 1 - 1 / 255 * Math.max(s, Math.max(r, a)), [d, c * 100, a * 100];
};
convert$4.rgb.cmyk = function(i) {
  var s = i[0] / 255, r = i[1] / 255, a = i[2] / 255, d, c, l, p;
  return p = Math.min(1 - s, 1 - r, 1 - a), d = (1 - s - p) / (1 - p) || 0, c = (1 - r - p) / (1 - p) || 0, l = (1 - a - p) / (1 - p) || 0, [d * 100, c * 100, l * 100, p * 100];
};
function comparativeDistance(i, s) {
  return Math.pow(i[0] - s[0], 2) + Math.pow(i[1] - s[1], 2) + Math.pow(i[2] - s[2], 2);
}
convert$4.rgb.keyword = function(i) {
  var s = reverseKeywords[i];
  if (s)
    return s;
  var r = 1 / 0, a;
  for (var d in cssKeywords)
    if (cssKeywords.hasOwnProperty(d)) {
      var c = cssKeywords[d], l = comparativeDistance(i, c);
      l < r && (r = l, a = d);
    }
  return a;
};
convert$4.keyword.rgb = function(i) {
  return cssKeywords[i];
};
convert$4.rgb.xyz = function(i) {
  var s = i[0] / 255, r = i[1] / 255, a = i[2] / 255;
  s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92, r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, a = a > 0.04045 ? Math.pow((a + 0.055) / 1.055, 2.4) : a / 12.92;
  var d = s * 0.4124 + r * 0.3576 + a * 0.1805, c = s * 0.2126 + r * 0.7152 + a * 0.0722, l = s * 0.0193 + r * 0.1192 + a * 0.9505;
  return [d * 100, c * 100, l * 100];
};
convert$4.rgb.lab = function(i) {
  var s = convert$4.rgb.xyz(i), r = s[0], a = s[1], d = s[2], c, l, p;
  return r /= 95.047, a /= 100, d /= 108.883, r = r > 8856e-6 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, a = a > 8856e-6 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, d = d > 8856e-6 ? Math.pow(d, 1 / 3) : 7.787 * d + 16 / 116, c = 116 * a - 16, l = 500 * (r - a), p = 200 * (a - d), [c, l, p];
};
convert$4.hsl.rgb = function(i) {
  var s = i[0] / 360, r = i[1] / 100, a = i[2] / 100, d, c, l, p, u;
  if (r === 0)
    return u = a * 255, [u, u, u];
  a < 0.5 ? c = a * (1 + r) : c = a + r - a * r, d = 2 * a - c, p = [0, 0, 0];
  for (var m = 0; m < 3; m++)
    l = s + 1 / 3 * -(m - 1), l < 0 && l++, l > 1 && l--, 6 * l < 1 ? u = d + (c - d) * 6 * l : 2 * l < 1 ? u = c : 3 * l < 2 ? u = d + (c - d) * (2 / 3 - l) * 6 : u = d, p[m] = u * 255;
  return p;
};
convert$4.hsl.hsv = function(i) {
  var s = i[0], r = i[1] / 100, a = i[2] / 100, d = r, c = Math.max(a, 0.01), l, p;
  return a *= 2, r *= a <= 1 ? a : 2 - a, d *= c <= 1 ? c : 2 - c, p = (a + r) / 2, l = a === 0 ? 2 * d / (c + d) : 2 * r / (a + r), [s, l * 100, p * 100];
};
convert$4.hsv.rgb = function(i) {
  var s = i[0] / 60, r = i[1] / 100, a = i[2] / 100, d = Math.floor(s) % 6, c = s - Math.floor(s), l = 255 * a * (1 - r), p = 255 * a * (1 - r * c), u = 255 * a * (1 - r * (1 - c));
  switch (a *= 255, d) {
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
convert$4.hsv.hsl = function(i) {
  var s = i[0], r = i[1] / 100, a = i[2] / 100, d = Math.max(a, 0.01), c, l, p;
  return p = (2 - r) * a, c = (2 - r) * d, l = r * d, l /= c <= 1 ? c : 2 - c, l = l || 0, p /= 2, [s, l * 100, p * 100];
};
convert$4.hwb.rgb = function(i) {
  var s = i[0] / 360, r = i[1] / 100, a = i[2] / 100, d = r + a, c, l, p, u;
  d > 1 && (r /= d, a /= d), c = Math.floor(6 * s), l = 1 - a, p = 6 * s - c, c & 1 && (p = 1 - p), u = r + p * (l - r);
  var m, v, h;
  switch (c) {
    default:
    case 6:
    case 0:
      m = l, v = u, h = r;
      break;
    case 1:
      m = u, v = l, h = r;
      break;
    case 2:
      m = r, v = l, h = u;
      break;
    case 3:
      m = r, v = u, h = l;
      break;
    case 4:
      m = u, v = r, h = l;
      break;
    case 5:
      m = l, v = r, h = u;
      break;
  }
  return [m * 255, v * 255, h * 255];
};
convert$4.cmyk.rgb = function(i) {
  var s = i[0] / 100, r = i[1] / 100, a = i[2] / 100, d = i[3] / 100, c, l, p;
  return c = 1 - Math.min(1, s * (1 - d) + d), l = 1 - Math.min(1, r * (1 - d) + d), p = 1 - Math.min(1, a * (1 - d) + d), [c * 255, l * 255, p * 255];
};
convert$4.xyz.rgb = function(i) {
  var s = i[0] / 100, r = i[1] / 100, a = i[2] / 100, d, c, l;
  return d = s * 3.2406 + r * -1.5372 + a * -0.4986, c = s * -0.9689 + r * 1.8758 + a * 0.0415, l = s * 0.0557 + r * -0.204 + a * 1.057, d = d > 31308e-7 ? 1.055 * Math.pow(d, 1 / 2.4) - 0.055 : d * 12.92, c = c > 31308e-7 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : c * 12.92, l = l > 31308e-7 ? 1.055 * Math.pow(l, 1 / 2.4) - 0.055 : l * 12.92, d = Math.min(Math.max(0, d), 1), c = Math.min(Math.max(0, c), 1), l = Math.min(Math.max(0, l), 1), [d * 255, c * 255, l * 255];
};
convert$4.xyz.lab = function(i) {
  var s = i[0], r = i[1], a = i[2], d, c, l;
  return s /= 95.047, r /= 100, a /= 108.883, s = s > 8856e-6 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, r = r > 8856e-6 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, a = a > 8856e-6 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, d = 116 * r - 16, c = 500 * (s - r), l = 200 * (r - a), [d, c, l];
};
convert$4.lab.xyz = function(i) {
  var s = i[0], r = i[1], a = i[2], d, c, l;
  c = (s + 16) / 116, d = r / 500 + c, l = c - a / 200;
  var p = Math.pow(c, 3), u = Math.pow(d, 3), m = Math.pow(l, 3);
  return c = p > 8856e-6 ? p : (c - 16 / 116) / 7.787, d = u > 8856e-6 ? u : (d - 16 / 116) / 7.787, l = m > 8856e-6 ? m : (l - 16 / 116) / 7.787, d *= 95.047, c *= 100, l *= 108.883, [d, c, l];
};
convert$4.lab.lch = function(i) {
  var s = i[0], r = i[1], a = i[2], d, c, l;
  return d = Math.atan2(a, r), c = d * 360 / 2 / Math.PI, c < 0 && (c += 360), l = Math.sqrt(r * r + a * a), [s, l, c];
};
convert$4.lch.lab = function(i) {
  var s = i[0], r = i[1], a = i[2], d, c, l;
  return l = a / 360 * 2 * Math.PI, d = r * Math.cos(l), c = r * Math.sin(l), [s, d, c];
};
convert$4.rgb.ansi16 = function(i) {
  var s = i[0], r = i[1], a = i[2], d = 1 in arguments ? arguments[1] : convert$4.rgb.hsv(i)[2];
  if (d = Math.round(d / 50), d === 0)
    return 30;
  var c = 30 + (Math.round(a / 255) << 2 | Math.round(r / 255) << 1 | Math.round(s / 255));
  return d === 2 && (c += 60), c;
};
convert$4.hsv.ansi16 = function(i) {
  return convert$4.rgb.ansi16(convert$4.hsv.rgb(i), i[2]);
};
convert$4.rgb.ansi256 = function(i) {
  var s = i[0], r = i[1], a = i[2];
  if (s === r && r === a)
    return s < 8 ? 16 : s > 248 ? 231 : Math.round((s - 8) / 247 * 24) + 232;
  var d = 16 + 36 * Math.round(s / 255 * 5) + 6 * Math.round(r / 255 * 5) + Math.round(a / 255 * 5);
  return d;
};
convert$4.ansi16.rgb = function(i) {
  var s = i % 10;
  if (s === 0 || s === 7)
    return i > 50 && (s += 3.5), s = s / 10.5 * 255, [s, s, s];
  var r = (~~(i > 50) + 1) * 0.5, a = (s & 1) * r * 255, d = (s >> 1 & 1) * r * 255, c = (s >> 2 & 1) * r * 255;
  return [a, d, c];
};
convert$4.ansi256.rgb = function(i) {
  if (i >= 232) {
    var s = (i - 232) * 10 + 8;
    return [s, s, s];
  }
  i -= 16;
  var r, a = Math.floor(i / 36) / 5 * 255, d = Math.floor((r = i % 36) / 6) / 5 * 255, c = r % 6 / 5 * 255;
  return [a, d, c];
};
convert$4.rgb.hex = function(i) {
  var s = ((Math.round(i[0]) & 255) << 16) + ((Math.round(i[1]) & 255) << 8) + (Math.round(i[2]) & 255), r = s.toString(16).toUpperCase();
  return "000000".substring(r.length) + r;
};
convert$4.hex.rgb = function(i) {
  var s = i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!s)
    return [0, 0, 0];
  var r = s[0];
  s[0].length === 3 && (r = r.split("").map(function(p) {
    return p + p;
  }).join(""));
  var a = parseInt(r, 16), d = a >> 16 & 255, c = a >> 8 & 255, l = a & 255;
  return [d, c, l];
};
convert$4.rgb.hcg = function(i) {
  var s = i[0] / 255, r = i[1] / 255, a = i[2] / 255, d = Math.max(Math.max(s, r), a), c = Math.min(Math.min(s, r), a), l = d - c, p, u;
  return l < 1 ? p = c / (1 - l) : p = 0, l <= 0 ? u = 0 : d === s ? u = (r - a) / l % 6 : d === r ? u = 2 + (a - s) / l : u = 4 + (s - r) / l + 4, u /= 6, u %= 1, [u * 360, l * 100, p * 100];
};
convert$4.hsl.hcg = function(i) {
  var s = i[1] / 100, r = i[2] / 100, a = 1, d = 0;
  return r < 0.5 ? a = 2 * s * r : a = 2 * s * (1 - r), a < 1 && (d = (r - 0.5 * a) / (1 - a)), [i[0], a * 100, d * 100];
};
convert$4.hsv.hcg = function(i) {
  var s = i[1] / 100, r = i[2] / 100, a = s * r, d = 0;
  return a < 1 && (d = (r - a) / (1 - a)), [i[0], a * 100, d * 100];
};
convert$4.hcg.rgb = function(i) {
  var s = i[0] / 360, r = i[1] / 100, a = i[2] / 100;
  if (r === 0)
    return [a * 255, a * 255, a * 255];
  var d = [0, 0, 0], c = s % 1 * 6, l = c % 1, p = 1 - l, u = 0;
  switch (Math.floor(c)) {
    case 0:
      d[0] = 1, d[1] = l, d[2] = 0;
      break;
    case 1:
      d[0] = p, d[1] = 1, d[2] = 0;
      break;
    case 2:
      d[0] = 0, d[1] = 1, d[2] = l;
      break;
    case 3:
      d[0] = 0, d[1] = p, d[2] = 1;
      break;
    case 4:
      d[0] = l, d[1] = 0, d[2] = 1;
      break;
    default:
      d[0] = 1, d[1] = 0, d[2] = p;
  }
  return u = (1 - r) * a, [
    (r * d[0] + u) * 255,
    (r * d[1] + u) * 255,
    (r * d[2] + u) * 255
  ];
};
convert$4.hcg.hsv = function(i) {
  var s = i[1] / 100, r = i[2] / 100, a = s + r * (1 - s), d = 0;
  return a > 0 && (d = s / a), [i[0], d * 100, a * 100];
};
convert$4.hcg.hsl = function(i) {
  var s = i[1] / 100, r = i[2] / 100, a = r * (1 - s) + 0.5 * s, d = 0;
  return a > 0 && a < 0.5 ? d = s / (2 * a) : a >= 0.5 && a < 1 && (d = s / (2 * (1 - a))), [i[0], d * 100, a * 100];
};
convert$4.hcg.hwb = function(i) {
  var s = i[1] / 100, r = i[2] / 100, a = s + r * (1 - s);
  return [i[0], (a - s) * 100, (1 - a) * 100];
};
convert$4.hwb.hcg = function(i) {
  var s = i[1] / 100, r = i[2] / 100, a = 1 - r, d = a - s, c = 0;
  return d < 1 && (c = (a - d) / (1 - d)), [i[0], d * 100, c * 100];
};
convert$4.apple.rgb = function(i) {
  return [i[0] / 65535 * 255, i[1] / 65535 * 255, i[2] / 65535 * 255];
};
convert$4.rgb.apple = function(i) {
  return [i[0] / 255 * 65535, i[1] / 255 * 65535, i[2] / 255 * 65535];
};
convert$4.gray.rgb = function(i) {
  return [i[0] / 100 * 255, i[0] / 100 * 255, i[0] / 100 * 255];
};
convert$4.gray.hsl = convert$4.gray.hsv = function(i) {
  return [0, 0, i[0]];
};
convert$4.gray.hwb = function(i) {
  return [0, 100, i[0]];
};
convert$4.gray.cmyk = function(i) {
  return [0, 0, 0, i[0]];
};
convert$4.gray.lab = function(i) {
  return [i[0], 0, 0];
};
convert$4.gray.hex = function(i) {
  var s = Math.round(i[0] / 100 * 255) & 255, r = (s << 16) + (s << 8) + s, a = r.toString(16).toUpperCase();
  return "000000".substring(a.length) + a;
};
convert$4.rgb.gray = function(i) {
  var s = (i[0] + i[1] + i[2]) / 3;
  return [s / 255 * 100];
};
var conversions$1 = conversionsExports;
function buildGraph() {
  for (var i = {}, s = Object.keys(conversions$1), r = s.length, a = 0; a < r; a++)
    i[s[a]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return i;
}
function deriveBFS(i) {
  var s = buildGraph(), r = [i];
  for (s[i].distance = 0; r.length; )
    for (var a = r.pop(), d = Object.keys(conversions$1[a]), c = d.length, l = 0; l < c; l++) {
      var p = d[l], u = s[p];
      u.distance === -1 && (u.distance = s[a].distance + 1, u.parent = a, r.unshift(p));
    }
  return s;
}
function link(i, s) {
  return function(r) {
    return s(i(r));
  };
}
function wrapConversion(i, s) {
  for (var r = [s[i].parent, i], a = conversions$1[s[i].parent][i], d = s[i].parent; s[d].parent; )
    r.unshift(s[d].parent), a = link(conversions$1[s[d].parent][d], a), d = s[d].parent;
  return a.conversion = r, a;
}
var route$1 = function(i) {
  for (var s = deriveBFS(i), r = {}, a = Object.keys(s), d = a.length, c = 0; c < d; c++) {
    var l = a[c], p = s[l];
    p.parent !== null && (r[l] = wrapConversion(l, s));
  }
  return r;
}, conversions = conversionsExports, route = route$1, convert$3 = {}, models = Object.keys(conversions);
function wrapRaw(i) {
  var s = function(r) {
    return r == null ? r : (arguments.length > 1 && (r = Array.prototype.slice.call(arguments)), i(r));
  };
  return "conversion" in i && (s.conversion = i.conversion), s;
}
function wrapRounded(i) {
  var s = function(r) {
    if (r == null)
      return r;
    arguments.length > 1 && (r = Array.prototype.slice.call(arguments));
    var a = i(r);
    if (typeof a == "object")
      for (var d = a.length, c = 0; c < d; c++)
        a[c] = Math.round(a[c]);
    return a;
  };
  return "conversion" in i && (s.conversion = i.conversion), s;
}
models.forEach(function(i) {
  convert$3[i] = {}, Object.defineProperty(convert$3[i], "channels", { value: conversions[i].channels }), Object.defineProperty(convert$3[i], "labels", { value: conversions[i].labels });
  var s = route(i), r = Object.keys(s);
  r.forEach(function(a) {
    var d = s[a];
    convert$3[i][a] = wrapRounded(d), convert$3[i][a].raw = wrapRaw(d);
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
function getRgba(i) {
  if (i) {
    var s = /^#([a-fA-F0-9]{3})$/, r = /^#([a-fA-F0-9]{6})$/, a = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, d = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, c = /(\D+)/, l = [0, 0, 0], p = 1, u = i.match(s);
    if (u) {
      u = u[1];
      for (var m = 0; m < l.length; m++)
        l[m] = parseInt(u[m] + u[m], 16);
    } else if (u = i.match(r)) {
      u = u[1];
      for (var m = 0; m < l.length; m++)
        l[m] = parseInt(u.slice(m * 2, m * 2 + 2), 16);
    } else if (u = i.match(a)) {
      for (var m = 0; m < l.length; m++)
        l[m] = parseInt(u[m + 1]);
      p = parseFloat(u[4]);
    } else if (u = i.match(d)) {
      for (var m = 0; m < l.length; m++)
        l[m] = Math.round(parseFloat(u[m + 1]) * 2.55);
      p = parseFloat(u[4]);
    } else if (u = i.match(c)) {
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
function getHsla(i) {
  if (i) {
    var s = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/, r = i.match(s);
    if (r) {
      var a = parseFloat(r[4]), d = scale(parseInt(r[1]), 0, 360), c = scale(parseFloat(r[2]), 0, 100), l = scale(parseFloat(r[3]), 0, 100), p = scale(isNaN(a) ? 1 : a, 0, 1);
      return [d, c, l, p];
    }
  }
}
function getHwb(i) {
  if (i) {
    var s = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/, r = i.match(s);
    if (r) {
      var a = parseFloat(r[4]), d = scale(parseInt(r[1]), 0, 360), c = scale(parseFloat(r[2]), 0, 100), l = scale(parseFloat(r[3]), 0, 100), p = scale(isNaN(a) ? 1 : a, 0, 1);
      return [d, c, l, p];
    }
  }
}
function getRgb(i) {
  var s = getRgba(i);
  return s && s.slice(0, 3);
}
function getHsl(i) {
  var s = getHsla(i);
  return s && s.slice(0, 3);
}
function getAlpha(i) {
  var s = getRgba(i);
  if (s)
    return s[3];
  if (s = getHsla(i))
    return s[3];
  if (s = getHwb(i))
    return s[3];
}
function hexString(i) {
  return "#" + hexDouble(i[0]) + hexDouble(i[1]) + hexDouble(i[2]);
}
function rgbString(i, s) {
  return s < 1 || i[3] && i[3] < 1 ? rgbaString(i, s) : "rgb(" + i[0] + ", " + i[1] + ", " + i[2] + ")";
}
function rgbaString(i, s) {
  return s === void 0 && (s = i[3] !== void 0 ? i[3] : 1), "rgba(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + s + ")";
}
function percentString(i, s) {
  if (s < 1 || i[3] && i[3] < 1)
    return percentaString(i, s);
  var r = Math.round(i[0] / 255 * 100), a = Math.round(i[1] / 255 * 100), d = Math.round(i[2] / 255 * 100);
  return "rgb(" + r + "%, " + a + "%, " + d + "%)";
}
function percentaString(i, s) {
  var r = Math.round(i[0] / 255 * 100), a = Math.round(i[1] / 255 * 100), d = Math.round(i[2] / 255 * 100);
  return "rgba(" + r + "%, " + a + "%, " + d + "%, " + (s || i[3] || 1) + ")";
}
function hslString(i, s) {
  return s < 1 || i[3] && i[3] < 1 ? hslaString(i, s) : "hsl(" + i[0] + ", " + i[1] + "%, " + i[2] + "%)";
}
function hslaString(i, s) {
  return s === void 0 && (s = i[3] !== void 0 ? i[3] : 1), "hsla(" + i[0] + ", " + i[1] + "%, " + i[2] + "%, " + s + ")";
}
function hwbString(i, s) {
  return s === void 0 && (s = i[3] !== void 0 ? i[3] : 1), "hwb(" + i[0] + ", " + i[1] + "%, " + i[2] + "%" + (s !== void 0 && s !== 1 ? ", " + s : "") + ")";
}
function keyword(i) {
  return reverseNames[i.slice(0, 3)];
}
function scale(i, s, r) {
  return Math.min(Math.max(s, i), r);
}
function hexDouble(i) {
  var s = i.toString(16).toUpperCase();
  return s.length < 2 ? "0" + s : s;
}
var reverseNames = {};
for (var name in colorNames)
  reverseNames[colorNames[name]] = name;
var clone$1 = cloneExports, convert$2 = colorConvert, string = colorString, Color$1 = function(i) {
  if (i instanceof Color$1)
    return i;
  if (!(this instanceof Color$1))
    return new Color$1(i);
  this.values = {
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
    hsv: [0, 0, 0],
    hwb: [0, 0, 0],
    cmyk: [0, 0, 0, 0],
    alpha: 1
  };
  var s;
  if (typeof i == "string")
    if (s = string.getRgba(i), s)
      this.setValues("rgb", s);
    else if (s = string.getHsla(i))
      this.setValues("hsl", s);
    else if (s = string.getHwb(i))
      this.setValues("hwb", s);
    else
      throw new Error('Unable to parse color from string "' + i + '"');
  else if (typeof i == "object")
    if (s = i, s.r !== void 0 || s.red !== void 0)
      this.setValues("rgb", s);
    else if (s.l !== void 0 || s.lightness !== void 0)
      this.setValues("hsl", s);
    else if (s.v !== void 0 || s.value !== void 0)
      this.setValues("hsv", s);
    else if (s.w !== void 0 || s.whiteness !== void 0)
      this.setValues("hwb", s);
    else if (s.c !== void 0 || s.cyan !== void 0)
      this.setValues("cmyk", s);
    else
      throw new Error("Unable to parse color from object " + JSON.stringify(i));
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
    var i = this.values.rgb;
    return i.concat([this.values.alpha]);
  },
  rgbaArrayNormalized: function() {
    for (var i = this.values.rgb, s = [], r = 0; r < 3; r++)
      s[r] = i[r] / 255;
    return s.push(this.values.alpha), s;
  },
  hslaArray: function() {
    var i = this.values.hsl;
    return i.concat([this.values.alpha]);
  },
  alpha: function(i) {
    return i === void 0 ? this.values.alpha : (this.setValues("alpha", i), this);
  },
  red: function(i) {
    return this.setChannel("rgb", 0, i);
  },
  green: function(i) {
    return this.setChannel("rgb", 1, i);
  },
  blue: function(i) {
    return this.setChannel("rgb", 2, i);
  },
  hue: function(i) {
    return i && (i %= 360, i = i < 0 ? 360 + i : i), this.setChannel("hsl", 0, i);
  },
  saturation: function(i) {
    return this.setChannel("hsl", 1, i);
  },
  lightness: function(i) {
    return this.setChannel("hsl", 2, i);
  },
  saturationv: function(i) {
    return this.setChannel("hsv", 1, i);
  },
  whiteness: function(i) {
    return this.setChannel("hwb", 1, i);
  },
  blackness: function(i) {
    return this.setChannel("hwb", 2, i);
  },
  value: function(i) {
    return this.setChannel("hsv", 2, i);
  },
  cyan: function(i) {
    return this.setChannel("cmyk", 0, i);
  },
  magenta: function(i) {
    return this.setChannel("cmyk", 1, i);
  },
  yellow: function(i) {
    return this.setChannel("cmyk", 2, i);
  },
  black: function(i) {
    return this.setChannel("cmyk", 3, i);
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
    for (var i = this.values.rgb, s = [], r = 0; r < i.length; r++) {
      var a = i[r] / 255;
      s[r] = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
  },
  contrast: function(i) {
    var s = this.luminosity(), r = i.luminosity();
    return s > r ? (s + 0.05) / (r + 0.05) : (r + 0.05) / (s + 0.05);
  },
  level: function(i) {
    var s = this.contrast(i);
    return s >= 7.1 ? "AAA" : s >= 4.5 ? "AA" : "";
  },
  dark: function() {
    var i = this.values.rgb, s = (i[0] * 299 + i[1] * 587 + i[2] * 114) / 1e3;
    return s < 128;
  },
  light: function() {
    return !this.dark();
  },
  negate: function() {
    for (var i = [], s = 0; s < 3; s++)
      i[s] = 255 - this.values.rgb[s];
    return this.setValues("rgb", i), this;
  },
  lighten: function(i) {
    return this.values.hsl[2] += this.values.hsl[2] * i, this.setValues("hsl", this.values.hsl), this;
  },
  darken: function(i) {
    return this.values.hsl[2] -= this.values.hsl[2] * i, this.setValues("hsl", this.values.hsl), this;
  },
  saturate: function(i) {
    return this.values.hsl[1] += this.values.hsl[1] * i, this.setValues("hsl", this.values.hsl), this;
  },
  desaturate: function(i) {
    return this.values.hsl[1] -= this.values.hsl[1] * i, this.setValues("hsl", this.values.hsl), this;
  },
  whiten: function(i) {
    return this.values.hwb[1] += this.values.hwb[1] * i, this.setValues("hwb", this.values.hwb), this;
  },
  blacken: function(i) {
    return this.values.hwb[2] += this.values.hwb[2] * i, this.setValues("hwb", this.values.hwb), this;
  },
  greyscale: function() {
    var i = this.values.rgb, s = i[0] * 0.3 + i[1] * 0.59 + i[2] * 0.11;
    return this.setValues("rgb", [s, s, s]), this;
  },
  clearer: function(i) {
    return this.setValues("alpha", this.values.alpha - this.values.alpha * i), this;
  },
  opaquer: function(i) {
    return this.setValues("alpha", this.values.alpha + this.values.alpha * i), this;
  },
  rotate: function(i) {
    var s = this.values.hsl[0];
    return s = (s + i) % 360, s = s < 0 ? 360 + s : s, this.values.hsl[0] = s, this.setValues("hsl", this.values.hsl), this;
  },
  /**
   * Ported from sass implementation in C
   * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
   */
  mix: function(i, s) {
    var r = this, a = i, d = s === void 0 ? 0.5 : s, c = 2 * d - 1, l = r.alpha() - a.alpha(), p = ((c * l === -1 ? c : (c + l) / (1 + c * l)) + 1) / 2, u = 1 - p;
    return this.rgb(
      p * r.red() + u * a.red(),
      p * r.green() + u * a.green(),
      p * r.blue() + u * a.blue()
    ).alpha(r.alpha() * d + a.alpha() * (1 - d));
  },
  toJSON: function() {
    return this.rgb();
  },
  clone: function() {
    var i = new Color$1();
    return i.values = clone$1(this.values), i;
  }
};
Color$1.prototype.getValues = function(i) {
  for (var s = {}, r = 0; r < i.length; r++)
    s[i.charAt(r)] = this.values[i][r];
  return this.values.alpha !== 1 && (s.a = this.values.alpha), s;
};
Color$1.prototype.setValues = function(i, s) {
  var r = {
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
  }, d, c = 1;
  if (i === "alpha")
    c = s;
  else if (s.length)
    this.values[i] = s.slice(0, i.length), c = s[i.length];
  else if (s[i.charAt(0)] !== void 0) {
    for (d = 0; d < i.length; d++)
      this.values[i][d] = s[i.charAt(d)];
    c = s.a;
  } else if (s[r[i][0]] !== void 0) {
    var l = r[i];
    for (d = 0; d < i.length; d++)
      this.values[i][d] = s[l[d]];
    c = s.alpha;
  }
  if (this.values.alpha = Math.max(0, Math.min(1, c === void 0 ? this.values.alpha : c)), i === "alpha")
    return !1;
  var p;
  for (d = 0; d < i.length; d++)
    p = Math.max(0, Math.min(a[i][d], this.values[i][d])), this.values[i][d] = Math.round(p);
  for (var u in r)
    for (u !== i && (this.values[u] = convert$2[i][u](this.values[i])), d = 0; d < u.length; d++)
      p = Math.max(0, Math.min(a[u][d], this.values[u][d])), this.values[u][d] = Math.round(p);
  return !0;
};
Color$1.prototype.setSpace = function(i, s) {
  var r = s[0];
  return r === void 0 ? this.getValues(i) : (typeof r == "number" && (r = Array.prototype.slice.call(s)), this.setValues(i, r), this);
};
Color$1.prototype.setChannel = function(i, s, r) {
  return r === void 0 ? this.values[i][s] : r === this.values[i][s] ? this : (this.values[i][s] = r, this.setValues(i, this.values[i]), this);
};
var color = Color$1, browserExports = {}, browser$1 = {
  get exports() {
    return browserExports;
  },
  set exports(i) {
    browserExports = i;
  }
}, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var i = 1e3, s = i * 60, r = s * 60, a = r * 24, d = a * 7, c = a * 365.25;
  ms = function(v, h) {
    h = h || {};
    var f = typeof v;
    if (f === "string" && v.length > 0)
      return l(v);
    if (f === "number" && isFinite(v))
      return h.long ? u(v) : p(v);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(v)
    );
  };
  function l(v) {
    if (v = String(v), !(v.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        v
      );
      if (h) {
        var f = parseFloat(h[1]), w = (h[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * c;
          case "weeks":
          case "week":
          case "w":
            return f * d;
          case "days":
          case "day":
          case "d":
            return f * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * s;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * i;
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
    var h = Math.abs(v);
    return h >= a ? Math.round(v / a) + "d" : h >= r ? Math.round(v / r) + "h" : h >= s ? Math.round(v / s) + "m" : h >= i ? Math.round(v / i) + "s" : v + "ms";
  }
  function u(v) {
    var h = Math.abs(v);
    return h >= a ? m(v, h, a, "day") : h >= r ? m(v, h, r, "hour") : h >= s ? m(v, h, s, "minute") : h >= i ? m(v, h, i, "second") : v + " ms";
  }
  function m(v, h, f, w) {
    var g = h >= f * 1.5;
    return Math.round(v / f) + " " + w + (g ? "s" : "");
  }
  return ms;
}
function setup(i) {
  r.debug = r, r.default = r, r.coerce = u, r.disable = l, r.enable = c, r.enabled = p, r.humanize = requireMs(), Object.keys(i).forEach(function(m) {
    r[m] = i[m];
  }), r.instances = [], r.names = [], r.skips = [], r.formatters = {};
  function s(m) {
    for (var v = 0, h = 0; h < m.length; h++)
      v = (v << 5) - v + m.charCodeAt(h), v |= 0;
    return r.colors[Math.abs(v) % r.colors.length];
  }
  r.selectColor = s;
  function r(m) {
    var v;
    function h() {
      if (h.enabled) {
        for (var f = arguments.length, w = new Array(f), g = 0; g < f; g++)
          w[g] = arguments[g];
        var _ = h, y = Number(new Date()), S = y - (v || y);
        _.diff = S, _.prev = v, _.curr = y, v = y, w[0] = r.coerce(w[0]), typeof w[0] != "string" && w.unshift("%O");
        var b = 0;
        w[0] = w[0].replace(/%([a-zA-Z%])/g, function(C, k) {
          if (C === "%%")
            return C;
          b++;
          var x = r.formatters[k];
          if (typeof x == "function") {
            var $ = w[b];
            C = x.call(_, $), w.splice(b, 1), b--;
          }
          return C;
        }), r.formatArgs.call(_, w);
        var P = _.log || r.log;
        P.apply(_, w);
      }
    }
    return h.namespace = m, h.enabled = r.enabled(m), h.useColors = r.useColors(), h.color = s(m), h.destroy = a, h.extend = d, typeof r.init == "function" && r.init(h), r.instances.push(h), h;
  }
  function a() {
    var m = r.instances.indexOf(this);
    return m !== -1 ? (r.instances.splice(m, 1), !0) : !1;
  }
  function d(m, v) {
    return r(this.namespace + (typeof v > "u" ? ":" : v) + m);
  }
  function c(m) {
    r.save(m), r.names = [], r.skips = [];
    var v, h = (typeof m == "string" ? m : "").split(/[\s,]+/), f = h.length;
    for (v = 0; v < f; v++)
      h[v] && (m = h[v].replace(/\*/g, ".*?"), m[0] === "-" ? r.skips.push(new RegExp("^" + m.substr(1) + "$")) : r.names.push(new RegExp("^" + m + "$")));
    for (v = 0; v < r.instances.length; v++) {
      var w = r.instances[v];
      w.enabled = r.enabled(w.namespace);
    }
  }
  function l() {
    r.enable("");
  }
  function p(m) {
    if (m[m.length - 1] === "*")
      return !0;
    var v, h;
    for (v = 0, h = r.skips.length; v < h; v++)
      if (r.skips[v].test(m))
        return !1;
    for (v = 0, h = r.names.length; v < h; v++)
      if (r.names[v].test(m))
        return !0;
    return !1;
  }
  function u(m) {
    return m instanceof Error ? m.stack || m.message : m;
  }
  return r.enable(r.load()), r;
}
var common$e = setup;
(function(i, s) {
  "use strict";
  function r(v) {
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? r = function(f) {
      return typeof f;
    } : r = function(f) {
      return f && typeof Symbol == "function" && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f;
    }, r(v);
  }
  s.log = c, s.formatArgs = d, s.save = l, s.load = p, s.useColors = a, s.storage = u(), s.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function a() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function d(v) {
    if (v[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + v[0] + (this.useColors ? "%c " : " ") + "+" + i.exports.humanize(this.diff), !!this.useColors) {
      var h = "color: " + this.color;
      v.splice(1, 0, h, "color: inherit");
      var f = 0, w = 0;
      v[0].replace(/%[a-zA-Z%]/g, function(g) {
        g !== "%%" && (f++, g === "%c" && (w = f));
      }), v.splice(w, 0, h);
    }
  }
  function c() {
    var v;
    return (typeof console > "u" ? "undefined" : r(console)) === "object" && console.log && (v = console).log.apply(v, arguments);
  }
  function l(v) {
    try {
      v ? s.storage.setItem("debug", v) : s.storage.removeItem("debug");
    } catch {
    }
  }
  function p() {
    var v;
    try {
      v = s.storage.getItem("debug");
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
  i.exports = common$e(s);
  var m = i.exports.formatters;
  m.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(browser$1, browserExports);
const browser = browserExports;
var balanced$1 = balancedMatch, debug = browserExports("css-color-function:parse"), parse_1$1 = parse$2;
function parse$2(i) {
  typeof i != "string" && (i = i.toString()), debug("string %s", i);
  function s(v) {
    var h = v.exec(i);
    if (h)
      return i = i.slice(h[0].length), h.slice(1);
  }
  function r() {
    s(/^\s+/);
  }
  function a() {
    var v = s(/^\)/);
    if (v)
      return debug("rparen"), v;
  }
  function d() {
    var v = s(/^([\+\-\*])/);
    if (v) {
      var h = {};
      return h.type = "modifier", h.value = v[0], debug("modifier %o", h), h;
    }
  }
  function c() {
    var v = s(/^([^\)\s]+)/);
    if (v) {
      var h = {};
      return h.type = "number", h.value = v[0], debug("number %o", h), h;
    }
  }
  function l() {
    for (var v = [], h; h = d() || m() || c(); )
      v.push(h), r();
    return debug("args %o", v), v;
  }
  function p() {
    var v = s(/^(\w+)\(/);
    if (v) {
      r();
      var h, f = {};
      return f.type = "function", f.name = v[0], f.arguments = l(), a(), debug("adjuster %o", f), f;
    }
  }
  function u() {
    var v = {};
    v.type = "color";
    var h = s(/([^\)\s]+)/)[0];
    if (h.indexOf("(") != -1) {
      var f = s(/([^\)]*?\))/)[0];
      h = h + f;
    }
    return v.value = h, r(), v;
  }
  function m() {
    if (i.match(/^color\(/)) {
      var v = balanced$1("(", ")", i);
      if (!v)
        throw new SyntaxError("Missing closing parenthese for '" + i + "'");
      if (v.body === "")
        throw new SyntaxError("color() function cannot be empty");
      i = v.body, r();
      var h = {};
      h.type = "function", h.name = "color", h.arguments = [m() || u()], debug("function arguments %o", h.arguments);
      for (var f; f = p(); )
        h.arguments.push(f), r();
      return i = v.post, r(), debug("function %o", h), h;
    }
  }
  return m();
}
var adjusters$1 = {};
(function(i) {
  var s = color;
  i.red = r("red"), i.blue = r("blue"), i.green = r("green"), i.alpha = i.a = r("alpha"), i.rgb = function() {
  }, i.hue = i.h = a("hue"), i.saturation = i.s = a("saturation"), i.lightness = i.l = a("lightness"), i.whiteness = i.w = a("whiteness"), i.blackness = i.b = a("blackness"), i.blend = function(p, u) {
    var m = p.alpha();
    p.alpha(1);
    var v = new s(u[0].value), h = 1 - parseInt(u[1].value, 10) / 100;
    p.mix(v, h).alpha(m);
  }, i.tint = function(p, u) {
    u.unshift({ type: "argument", value: "white" }), i.blend(p, u);
  }, i.shade = function(p, u) {
    u.unshift({ type: "argument", value: "black" }), i.blend(p, u);
  }, i.contrast = function(p, u) {
    u.length == 0 && u.push({ type: "argument", value: "100%" });
    var m = 1 - parseInt(u[0].value, 10) / 100, v = p.luminosity() < 0.5 ? new s({ h: p.hue(), w: 100, b: 0 }) : new s({ h: p.hue(), w: 0, b: 100 }), h = v, f = 4.5;
    if (p.contrast(v) > f) {
      var h = l(f, p, v), w = h.alpha();
      h.alpha(1), h.mix(v, m).alpha(w);
    }
    p.hwb(h.hwb());
  };
  function r(p) {
    return function(u, m) {
      var v;
      m[0].type == "modifier" && (v = m.shift().value);
      var h = m[0].value;
      h.indexOf("%") != -1 ? (h = parseInt(h, 10) / 100, v ? v != "*" && (h = u[p]() * h) : h = h * (p == "alpha" ? 1 : 255)) : h = Number(h), u[p](c(u[p](), h, v));
    };
  }
  function a(p) {
    return function(u, m) {
      var v;
      m[0].type == "modifier" && (v = m.shift().value);
      var h = parseFloat(m[0].value, 10);
      u[p](c(u[p](), h, v));
    };
  }
  function d(p, u) {
    var m = parseInt(u, 10) / 100;
    return p * m;
  }
  function c(p, u, m) {
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
    for (var v = u.hue(), h = u.clone(), f = u.whiteness(), w = u.blackness(), g = m.whiteness(), _ = m.blackness(); Math.abs(f - g) > 1 || Math.abs(w - _) > 1; ) {
      var y = Math.round((g + f) / 2), S = Math.round((_ + w) / 2);
      h.whiteness(y), h.blackness(S), h.contrast(u) > p ? (g = y, _ = S) : (f = y, w = S);
    }
    return h;
  }
})(adjusters$1);
var balanced = balancedMatch, Color = color, parse$1 = parse_1$1, adjusters = adjusters$1, convert_1$1 = convert$1;
function convert$1(i) {
  var s = i.indexOf("color(");
  if (s == -1)
    return i;
  if (i = i.slice(s), i = balanced("(", ")", i), !i)
    throw new SyntaxError("Missing closing parenthese for '" + i + "'");
  var r = parse$1("color(" + i.body + ")");
  return toRGB(r) + convert$1(i.post);
}
function toRGB(i) {
  var s = new Color(i.arguments[0].type == "function" ? toRGB(i.arguments[0]) : i.arguments[0].value), r = i.arguments.slice(1);
  return r.forEach(function(a) {
    var d = a.name;
    if (!adjusters[d])
      throw new Error("Unknown <color-adjuster> '" + d + "'");
    a.arguments.forEach(function(c) {
      c.type == "function" && c.name == "color" && (c.value = toRGB(c), c.type = "color", delete c.name);
    }), adjusters[d](s, a.arguments);
  }), s.rgbString();
}
var convert = convert_1$1, parse = parse_1$1, convert_1 = lib.convert = convert, parse_1 = lib.parse = parse;
class Storage {
  constructor() {
    q(this, "prefix", "");
    this.prefix = getAppType() == "admin" ? "admin" : "site";
  }
  setPrefix(s) {
    this.prefix = s;
  }
  /**
   * 设置缓存
   * @param param
   */
  set(s) {
    try {
      window.localStorage.setItem(`${this.prefix}.${s.key}`, JSON.stringify(s.data)), typeof s.success == "function" && s.success();
    } catch (r) {
      typeof s.fail == "function" && s.fail(r);
    }
  }
  /**
   * 获取缓存
   * @param key
   * @returns
   */
  get(s) {
    try {
      const r = window.localStorage.getItem(`${this.prefix}.${s}`);
      return r === null ? null : JSON.parse(r);
    } catch {
      const a = window.localStorage.getItem(`${this.prefix}.${s}`);
      return a !== null ? a : null;
    }
  }
  /**
   * 移除指定缓存
   * @param key
   */
  remove(s) {
    typeof s == "string" ? window.localStorage.removeItem(`${this.prefix}.${s}`) : s.forEach((r) => {
      window.localStorage.removeItem(`${this.prefix}.${r}`);
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
function useElementIcon(i) {
  for (const [s, r] of Object.entries(ElementPlusIconsVue))
    i.component(s, r);
}
function setThemeColor(i, s = "light") {
  useCssVar("--el-color-primary", null).value = i;
  const r = {
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
  Object.keys(r[s]).forEach((a) => {
    useCssVar("--el-color-primary-" + a, null).value = lib.convert(`color(${i} ${r[s][a]})`);
  });
}
function getAppType() {
  const i = location.pathname.split("/").filter((s) => s);
  return i.length ? i[0] : "admin";
}
function setWindowTitle(i = "") {
  const s = useTitle();
  s.value = i || envConfig.VITE_DETAULT_TITLE;
}
function getToken() {
  return storage.get("token");
}
function setToken(i) {
  storage.set({ key: "token", data: i });
}
function removeToken() {
  storage.remove("token");
}
function debounce$1(i, s = 300) {
  let r = null;
  return function(...a) {
    r != null && (clearTimeout(r), r = null), r = setTimeout(() => {
      i.call(this, ...a);
    }, s);
  };
}
function isUrl(i) {
  return i.indexOf("http://") != -1 || i.indexOf("https://") != -1;
}
function img(i) {
  if (!i)
    return "";
  let s = envConfig.VITE_IMG_DOMAIN || location.origin;
  return i.startsWith("/") && (i = i.replace(/^\//, "")), s.endsWith("/") && (s = s.slice(0, -1)), isUrl(i) ? i : `${s}/${i}`;
}
function assetImg(i) {
  return new URL("@/", self.location) + i;
}
function strByteLength(i = "") {
  let s = 0;
  for (let r = 0; r < i.length; r++)
    i.charCodeAt(r) > 127 || i.charCodeAt(r) == 94 ? s += 2 : s++;
  return s;
}
function urlToRouteRaw(i) {
  const s = {}, [r, a] = i.split("?");
  return a && a.split("&").forEach((d) => {
    let [c, l] = d.split("=");
    s[c] = l;
  }), { path: r, query: s };
}
const isArray = (i) => typeof Array.isArray == "function" ? Array.isArray(i) : Object.prototype.toString.call(i) === "[object Array]";
function deepClone(i) {
  if ([null, void 0, NaN, !1].includes(i) || typeof i != "object" && typeof i != "function")
    return i;
  const s = isArray(i) ? [] : {};
  for (const r in i)
    i.hasOwnProperty(r) && (s[r] = typeof i[r] == "object" ? deepClone(i[r]) : i[r]);
  return s;
}
function guid(i = 10, s = !0, r = null) {
  const a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), d = [];
  if (r = r || a.length, i)
    for (let c = 0; c < i; c++)
      d[c] = a[0 | Math.random() * r];
  else {
    let c;
    d[8] = d[13] = d[18] = d[23] = "-", d[14] = "4";
    for (let l = 0; l < 36; l++)
      d[l] || (c = 0 | Math.random() * 16, d[l] = a[l == 19 ? c & 3 | 8 : c]);
  }
  return s ? (d.shift(), `u${d.join("")}`) : d.join("");
}
function moneyFormat(i) {
  return isNaN(parseFloat(i)) ? i : parseFloat(i).toFixed(2);
}
function timeStampTurnTime(i, s = "") {
  if (i != null && i != "" && i > 0) {
    const r = new Date();
    r.setTime(i * 1e3);
    const a = r.getFullYear();
    let d = r.getMonth() + 1;
    d = d < 10 ? "0" + d : d;
    let c = r.getDate();
    c = c < 10 ? "0" + c : c;
    let l = r.getHours();
    l = l < 10 ? "0" + l : l;
    let p = r.getMinutes(), u = r.getSeconds();
    return p = p < 10 ? "0" + p : p, u = u < 10 ? "0" + u : u, s ? s == "yearMonthDay" ? a + "年" + d + "月" + c + "日" : a + "-" + d + "-" + c : a + "-" + d + "-" + c + " " + l + ":" + p + ":" + u;
  } else
    return "";
}
function getCurrentDataTime(i) {
  const s = (m) => m < 10 ? "0" + m : m, r = new Date(i);
  let a = r.getFullYear(), d = r.getMonth() + 1, c = r.getDate(), l = r.getHours(), p = r.getMinutes(), u = r.getSeconds();
  return d > 12 && (d = d - 12), `${a}-${s(d)}-${s(c)} ${s(l)}:${s(p)}:${s(u)}`;
}
function timeTurnTimeStamp(i) {
  const s = i.split(" ", 2), r = (s[0] ? s[0] : "").split("-", 3), a = (s[1] ? s[1] : "").split(":", 3);
  return new Date(
    parseInt(r[0], 10) || null,
    (parseInt(r[1], 10) || 1) - 1,
    parseInt(r[2], 10) || null,
    parseInt(a[0], 10) || null,
    parseInt(a[1], 10) || null,
    parseInt(a[2], 10) || null
  ).getTime() / 1e3;
}
function filterDigit(i) {
  i.target.value = i.target.value.replace(/[^\d\.]/g, ""), i.target.value = i.target.value.replace(/^\./g, ""), i.target.value = i.target.value.replace(/\.{2,}/g, ".");
  const s = i.target.value.split(".");
  s.length > 1 && s[1].length > 2 && (i.target.value = `${s[0]}.${s[1].slice(0, 2)}`);
}
function filterNumber(i) {
  i.target.value = i.target.value.replace(/[^\d]/g, "");
}
function filterSpecial(i) {
  i.target.value = i.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ""), i.target.value = i.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
}
function filterBlank(i) {
  i.target.value = i.target.value.replace(/\s/g, "");
}
function setTablePageStorage(i = 1, s = 10, r = {}) {
  let a = storage.get("tablePageStorage");
  a || (a = {});
  const d = location.pathname + JSON.stringify(r);
  a[d] = {
    page: i,
    limit: s
  };
  const c = 5;
  Object.keys(a).length > c && delete a[Object.keys(a)[0]], storage.set({ key: "tablePageStorage", data: a });
}
function getTablePageStorage(i = {}) {
  let s = storage.get("tablePageStorage");
  const r = location.pathname + JSON.stringify(i);
  return !s || !s[r] ? s = {
    page: 1,
    limit: 10
  } : s = s[r], s;
}
function distance(i) {
  const s = typeof i == "string" ? parseFloat(i) : i;
  return isNaN(s) ? i.toString() : s < 1 ? parseInt((s * 1e3).toString()) + "m" : s.toFixed(1) + "km";
}
function getImageDimensions(i) {
  return new Promise((s) => {
    const r = new Image();
    r.onload = () => {
      const a = {
        width: r.naturalWidth,
        height: r.naturalHeight
      };
      s(a);
    }, r.onerror = (a) => {
      s(null);
    }, r.src = img(i);
  });
}
const articleData = "文章数据", articleStyle = "文章样式", articleBgColor = "文章背景", articleNum = "文章数量", selectArticleTips = "文章选择", articleTitle = "标题", articleImage = "封面", articleCategoryName = "栏目", articleSummary = "摘要", selectArticleTip = "请选择文章", common$d = {
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
  default: common$d,
  selectArticleTip,
  selectArticleTips
}, Symbol.toStringTag, { value: "Module" })), search$1 = "搜索", reset$1 = "重置", confirm$4 = "确认", cancel$4 = "取消", warning$2 = "警告", success = "成功", error = "错误", info$1 = "信息", emptyData$2 = "暂无数据", loading = "加载中...", operation$2 = "操作", detail$1 = "详情", add = "添加", edit$2 = "编辑", back$1 = "返回", submit = "提交", save$1 = "保存", close = "关闭", refresh$2 = "刷新", page = "页码", size = "每页条数", total = "总计", prev$1 = "上一页", next = "下一页", jump = "跳转", print = "打印", copy$1 = "复制", paste = "粘贴", cut = "剪切", selectAll$1 = "全选", deselectAll = "取消全选", batchOperation = "批量操作", pleaseSelect = "请选择", pleaseInput = "请输入", pleaseChoose = "请选择", required = "必填", minLength = "长度不能小于", maxLength = "长度不能大于", invalidFormat = "格式无效", loadDataError = "加载数据失败", submitSuccess = "提交成功", submitFailure = "提交失败", deleteSuccess = "删除成功", deleteFailure = "删除失败", updateSuccess = "更新成功", updateFailure = "更新失败", addSuccess = "添加成功", addFailure = "添加失败", confirmDelete = "确定要删除吗？", confirmSubmit = "确定要提交吗？", confirmCancel = "确定要取消吗？", common$c = {
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
  default: common$c,
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
}, Symbol.toStringTag, { value: "Module" })), goodsSelectPopupSelectGoodsButton$4 = "选择项目", goodsSelectPopupSelect$4 = "已选", goodsSelectPopupPiece$4 = "个", goodsSelectPopupSelectGoodsDialog$4 = "项目选择", goodsSelectPopupAllGoods$4 = "全部项目", goodsSelectPopupSelectedGoods$3 = "已选项目", goodsSelectPopupGoodsName$4 = "项目名称", goodsSelectPopupGoodsNamePlaceholder$4 = "请输入项目名称", goodsSelectPopupGoodsStayusPlaceholder = "请选择项目状态", goodsSelectPopupGoodsCategory$3 = "项目分类", goodsSelectPopupGoodsCategoryPlaceholder$3 = "全部", goodsSelectPopupGoodsType$3 = "项目类型", goodsSelectPopupGoodsTypePlaceholder$3 = "请选择项目类型", goodsSelectPopupGoodsInfo$4 = "项目", goodsSelectPopupGoodsPointUnit$2 = "积分", goodsSelectPopupGoodsPriceUnit$2 = "元", goodsSelectPopupPrice$4 = "价格", goodsSelectPopupStock$3 = "库存", goodsSelectPopupBeforeTip$4 = "已选择", goodsSelectPopupAfterTip$4 = "个项目", goodsSelectPopupClearGoods$4 = "取消选择", goodsSelectPopupGoodsMinTip$4 = "所选项目数量不能少于", goodsSelectPopupGoodsMaxTip$4 = "所选项目数量不能超过", goodsStyle$2 = "项目样式", goodsBgColor$2 = "项目背景", goodsNameColor$2 = "项目名称", goodsPriceColor$2 = "销售价", goodsSaleColor$2 = "项目销量", goodsNumColor$2 = "已兑人数", fenxiaoCommissionPriceColor$2 = "分销佣金", goodsCategoryPlaceholder$2 = "请选择项目分类", goodsPlaceholder$2 = "请选择项目", headStyle1$2 = "样式1", headStyle2$2 = "样式2", headStyle3$2 = "样式3", goodsData$2 = "项目数据", sortWay$3 = "排序", sales$3 = "销量", price$3 = "价格", manyGoodsListAroundRadius$2 = "图片圆角", manyGoodsListCategoryName$2 = "分类名称", manyGoodsListSubTitle$2 = "副标题", manyGoodsLisAddItem$2 = "添加一个多项目组", couponData$2 = "优惠券数据", couponContent$2 = "优惠券内容", couponTitle$2 = "标题", couponTitlePlaceholder$2 = "请输入标题", couponSubTitle$2 = "副标题", couponSubTitlePlaceholder$2 = "请输入副标题", selectCoupon$2 = "选择优惠券", allSources$2 = "全部", couponNum$2 = "优惠券数量", couponPlaceholder$2 = "请选择优惠券", couponBtnText$2 = "按钮文字", couponBtnTextPlaceholder$2 = "请输入按钮文字", manyGoodsListCategorySet$2 = "分组设置", manyGoodsListSourceDiy$2 = "自定义", manyGoodsListSourceCategory$2 = "项目分类", goodsSet$2 = "项目设置", goodsSearchSet$2 = "搜索设置", goodsSearchText$2 = "搜索内容", goodsSearchTextPlaceholder$2 = "请输入搜索内容", common$b = {
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$4,
  goodsSelectPopupSelect: goodsSelectPopupSelect$4,
  goodsSelectPopupPiece: goodsSelectPopupPiece$4,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$4,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$4,
  goodsSelectPopupSelectedGoods: goodsSelectPopupSelectedGoods$3,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$4,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$4,
  goodsSelectPopupGoodsStayusPlaceholder,
  goodsSelectPopupGoodsCategory: goodsSelectPopupGoodsCategory$3,
  goodsSelectPopupGoodsCategoryPlaceholder: goodsSelectPopupGoodsCategoryPlaceholder$3,
  goodsSelectPopupGoodsType: goodsSelectPopupGoodsType$3,
  goodsSelectPopupGoodsTypePlaceholder: goodsSelectPopupGoodsTypePlaceholder$3,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$4,
  goodsSelectPopupGoodsPointUnit: goodsSelectPopupGoodsPointUnit$2,
  goodsSelectPopupGoodsPriceUnit: goodsSelectPopupGoodsPriceUnit$2,
  goodsSelectPopupPrice: goodsSelectPopupPrice$4,
  goodsSelectPopupStock: goodsSelectPopupStock$3,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$4,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$4,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$4,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$4,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$4,
  goodsStyle: goodsStyle$2,
  goodsBgColor: goodsBgColor$2,
  goodsNameColor: goodsNameColor$2,
  goodsPriceColor: goodsPriceColor$2,
  goodsSaleColor: goodsSaleColor$2,
  goodsNumColor: goodsNumColor$2,
  fenxiaoCommissionPriceColor: fenxiaoCommissionPriceColor$2,
  goodsCategoryPlaceholder: goodsCategoryPlaceholder$2,
  goodsPlaceholder: goodsPlaceholder$2,
  headStyle1: headStyle1$2,
  headStyle2: headStyle2$2,
  headStyle3: headStyle3$2,
  goodsData: goodsData$2,
  sortWay: sortWay$3,
  default: "综合",
  sales: sales$3,
  price: price$3,
  manyGoodsListAroundRadius: manyGoodsListAroundRadius$2,
  manyGoodsListCategoryName: manyGoodsListCategoryName$2,
  manyGoodsListSubTitle: manyGoodsListSubTitle$2,
  manyGoodsLisAddItem: manyGoodsLisAddItem$2,
  couponData: couponData$2,
  couponContent: couponContent$2,
  couponTitle: couponTitle$2,
  couponTitlePlaceholder: couponTitlePlaceholder$2,
  couponSubTitle: couponSubTitle$2,
  couponSubTitlePlaceholder: couponSubTitlePlaceholder$2,
  selectCoupon: selectCoupon$2,
  allSources: allSources$2,
  couponNum: couponNum$2,
  couponPlaceholder: couponPlaceholder$2,
  couponBtnText: couponBtnText$2,
  couponBtnTextPlaceholder: couponBtnTextPlaceholder$2,
  manyGoodsListCategorySet: manyGoodsListCategorySet$2,
  manyGoodsListSourceDiy: manyGoodsListSourceDiy$2,
  manyGoodsListSourceCategory: manyGoodsListSourceCategory$2,
  goodsSet: goodsSet$2,
  goodsSearchSet: goodsSearchSet$2,
  goodsSearchText: goodsSearchText$2,
  goodsSearchTextPlaceholder: goodsSearchTextPlaceholder$2
}, __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allSources: allSources$2,
  couponBtnText: couponBtnText$2,
  couponBtnTextPlaceholder: couponBtnTextPlaceholder$2,
  couponContent: couponContent$2,
  couponData: couponData$2,
  couponNum: couponNum$2,
  couponPlaceholder: couponPlaceholder$2,
  couponSubTitle: couponSubTitle$2,
  couponSubTitlePlaceholder: couponSubTitlePlaceholder$2,
  couponTitle: couponTitle$2,
  couponTitlePlaceholder: couponTitlePlaceholder$2,
  default: common$b,
  fenxiaoCommissionPriceColor: fenxiaoCommissionPriceColor$2,
  goodsBgColor: goodsBgColor$2,
  goodsCategoryPlaceholder: goodsCategoryPlaceholder$2,
  goodsData: goodsData$2,
  goodsNameColor: goodsNameColor$2,
  goodsNumColor: goodsNumColor$2,
  goodsPlaceholder: goodsPlaceholder$2,
  goodsPriceColor: goodsPriceColor$2,
  goodsSaleColor: goodsSaleColor$2,
  goodsSearchSet: goodsSearchSet$2,
  goodsSearchText: goodsSearchText$2,
  goodsSearchTextPlaceholder: goodsSearchTextPlaceholder$2,
  goodsSelectPopupAfterTip: goodsSelectPopupAfterTip$4,
  goodsSelectPopupAllGoods: goodsSelectPopupAllGoods$4,
  goodsSelectPopupBeforeTip: goodsSelectPopupBeforeTip$4,
  goodsSelectPopupClearGoods: goodsSelectPopupClearGoods$4,
  goodsSelectPopupGoodsCategory: goodsSelectPopupGoodsCategory$3,
  goodsSelectPopupGoodsCategoryPlaceholder: goodsSelectPopupGoodsCategoryPlaceholder$3,
  goodsSelectPopupGoodsInfo: goodsSelectPopupGoodsInfo$4,
  goodsSelectPopupGoodsMaxTip: goodsSelectPopupGoodsMaxTip$4,
  goodsSelectPopupGoodsMinTip: goodsSelectPopupGoodsMinTip$4,
  goodsSelectPopupGoodsName: goodsSelectPopupGoodsName$4,
  goodsSelectPopupGoodsNamePlaceholder: goodsSelectPopupGoodsNamePlaceholder$4,
  goodsSelectPopupGoodsPointUnit: goodsSelectPopupGoodsPointUnit$2,
  goodsSelectPopupGoodsPriceUnit: goodsSelectPopupGoodsPriceUnit$2,
  goodsSelectPopupGoodsStayusPlaceholder,
  goodsSelectPopupGoodsType: goodsSelectPopupGoodsType$3,
  goodsSelectPopupGoodsTypePlaceholder: goodsSelectPopupGoodsTypePlaceholder$3,
  goodsSelectPopupPiece: goodsSelectPopupPiece$4,
  goodsSelectPopupPrice: goodsSelectPopupPrice$4,
  goodsSelectPopupSelect: goodsSelectPopupSelect$4,
  goodsSelectPopupSelectGoodsButton: goodsSelectPopupSelectGoodsButton$4,
  goodsSelectPopupSelectGoodsDialog: goodsSelectPopupSelectGoodsDialog$4,
  goodsSelectPopupSelectedGoods: goodsSelectPopupSelectedGoods$3,
  goodsSelectPopupStock: goodsSelectPopupStock$3,
  goodsSet: goodsSet$2,
  goodsStyle: goodsStyle$2,
  headStyle1: headStyle1$2,
  headStyle2: headStyle2$2,
  headStyle3: headStyle3$2,
  manyGoodsLisAddItem: manyGoodsLisAddItem$2,
  manyGoodsListAroundRadius: manyGoodsListAroundRadius$2,
  manyGoodsListCategoryName: manyGoodsListCategoryName$2,
  manyGoodsListCategorySet: manyGoodsListCategorySet$2,
  manyGoodsListSourceCategory: manyGoodsListSourceCategory$2,
  manyGoodsListSourceDiy: manyGoodsListSourceDiy$2,
  manyGoodsListSubTitle: manyGoodsListSubTitle$2,
  price: price$3,
  sales: sales$3,
  selectCoupon: selectCoupon$2,
  sortWay: sortWay$3
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
}, __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, Symbol.toStringTag, { value: "Module" })), __variableDynamicImportRuntimeHelper = (i, s) => {
  const r = i[s];
  return r ? typeof r == "function" ? r() : Promise.resolve(r) : new Promise((a, d) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(d.bind(null, new Error("Unknown variable dynamic import: " + s)));
  });
};
let prodManifests = {}, installedAddonKeys = [], prodReady = !1, prodInitPromise = null;
const addonModuleCache = {}, ADMIN_PREFIX = "/admin";
function adminUrl(i) {
  return !i || i.startsWith("http") || i.startsWith("/admin/") ? i : i.startsWith("/assets/") ? `${ADMIN_PREFIX}${i}` : i.startsWith("./") ? `${ADMIN_PREFIX}/assets/addons/${i.slice(2)}` : `${ADMIN_PREFIX}/${i.replace(/^\//, "")}`;
}
function addonAssetUrl(i, ...s) {
  const r = ["assets", "addons", i, ...s].join("/").replace(/\/+/g, "/");
  return `${ADMIN_PREFIX}/${r}`;
}
function resolveLangFile(i, s) {
  if (s === "/")
    return "index";
  let r = s.replace(/^(\/admin\/|\/site\/|\/)/, "").replace(/\.vue$/, "");
  return r.startsWith("views/") && (r = r.slice(6)), i && (r.startsWith(`${i}/`) ? r = r.slice(i.length + 1) : r === i && (r = "index")), r.replaceAll("/", ".");
}
function resolveRouteAddon(i) {
  if (i.meta.addon)
    return String(i.meta.addon);
  for (let s = i.matched.length - 1; s >= 0; s--) {
    const r = i.matched[s].meta.addon;
    if (r)
      return String(r);
  }
  return "";
}
function resolveRouteView(i) {
  if (i.meta.view)
    return String(i.meta.view);
  for (let s = i.matched.length - 1; s >= 0; s--) {
    const r = i.matched[s].meta.view;
    if (r)
      return String(r);
  }
  return i.path;
}
function unwrapLangPack(i) {
  if (!i || typeof i != "object")
    return {};
  const s = i;
  if (s.default && typeof s.default == "object")
    return unwrapLangPack(s.default);
  const r = {};
  for (const [a, d] of Object.entries(s))
    a === "default" || a === "__esModule" || typeof d == "string" && (r[a] = d);
  return Object.keys(r).length ? r : s;
}
function flattenLangPack(i, s) {
  const r = {};
  for (const [a, d] of Object.entries(s))
    typeof d == "string" && (r[`${i}.${a}`] = d, i === "common" && (r[a] = d));
  return r;
}
function inferAddonFromPath(i, s) {
  const a = i.replace(/^(\/admin\/|\/site\/|\/)/, "").split("/").filter(Boolean)[0];
  return a && (s != null && s.length ? s : getInstalledAddonKeys()).includes(a) ? a : "";
}
async function isAddonEntryAvailable(i) {
  try {
    const s = await fetch(adminUrl(`/assets/addons/${i}/index.js`), { method: "HEAD" });
    return s.ok ? !(s.headers.get("content-type") || "").toLowerCase().includes("text/html") : !1;
  } catch {
    return !1;
  }
}
function isAddonInstalled(i) {
  return !!i && getInstalledAddonKeys().includes(i);
}
async function loadAddonModule(i) {
  return i in addonModuleCache || (addonModuleCache[i] = (async () => {
    try {
      return await import(adminUrl(`/assets/addons/${i}/index.js`));
    } catch {
      return null;
    }
  })()), addonModuleCache[i];
}
function clearAddonModuleCache() {
  for (const i of Object.keys(addonModuleCache))
    delete addonModuleCache[i];
}
function isAddonProdReady() {
  return prodReady;
}
async function ensureAddonProdReady() {
  prodReady || await initAddonManifests();
}
async function initAddonManifests(i) {
  return prodInitPromise || (prodInitPromise = (async () => {
    prodManifests = {}, installedAddonKeys = [];
    let s = i;
    if (!(s != null && s.length))
      try {
        const a = adminUrl("/assets/addons/index.json"), d = await fetch(a);
        if (d.ok) {
          const c = await d.json();
          s = Array.isArray(c.keys) ? c.keys : [];
          const l = c.manifests;
          if (l)
            for (const [p, u] of Object.entries(l))
              prodManifests[p] = u;
        }
      } catch {
        s = [];
      }
    const r = [];
    for (const a of s || []) {
      if (prodManifests[a]) {
        await isAddonEntryAvailable(a) ? r.push(a) : delete prodManifests[a];
        continue;
      }
      if (await isAddonEntryAvailable(a)) {
        r.push(a);
        try {
          const d = adminUrl(`/assets/addons/${a}/manifest.json`), c = await fetch(d);
          c.ok && (prodManifests[a] = await c.json());
        } catch {
        }
      }
    }
    installedAddonKeys = r, prodReady = !0;
  })(), prodInitPromise);
}
function getInstalledAddonKeys() {
  return installedAddonKeys.length ? installedAddonKeys : Object.keys(prodManifests);
}
function getProdManifests() {
  return prodManifests;
}
async function preloadAllAddonLangs(i) {
  prodReady || await initAddonManifests();
  for (const s of getInstalledAddonKeys())
    try {
      const r = await loadAddonModule(s);
      if (!r)
        continue;
      const a = r.langs;
      if (!a)
        continue;
      for (const [d, c] of Object.entries(a)) {
        const l = {};
        for (const [p, u] of Object.entries(c || {}))
          Object.assign(l, flattenLangPack(p, unwrapLangPack(u)));
        Object.keys(l).length && i(d, l);
      }
    } catch {
    }
}
function registerAddonManifest(i) {
  prodManifests[i.key] = i, prodReady = !0;
}
async function loadAddonLang(i, s, r) {
  var d;
  if (!1)
    try {
    } catch {
    }
  prodReady || await initAddonManifests();
  try {
    const c = await loadAddonModule(i);
    if (c) {
      const l = c.langs, p = (d = l == null ? void 0 : l[s]) == null ? void 0 : d[r], u = unwrapLangPack(p);
      if (Object.keys(u).length)
        return u;
    }
  } catch {
  }
  const a = addonAssetUrl(i, "lang", s, `${r}.json`);
  try {
    const c = await fetch(a);
    if (c.ok)
      return await c.json();
  } catch {
  }
  return {};
}
class Language {
  //已加载的语言
  constructor(s) {
    q(this, "i18n");
    q(this, "loadLocale", []);
    this.i18n = s;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(s) {
    this.i18n.mode === "legacy" ? this.i18n.global.locale = s : this.i18n.global.locale = s;
    let r = document.querySelector("html");
    r && r.setAttribute("lang", s);
  }
  /**
   * 加载语言包
   * @param app
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(s, r, a) {
    try {
      s || (s = inferAddonFromPath(r));
      const d = resolveLangFile(s, r);
      let c = {};
      s ? c = await loadAddonLang(s, a, d) : c = (await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../app/lang/en/403.json": () => import("./403-4bc122af.js"), "../app/lang/en/auth.menu.json": () => import("./auth.menu-f5062c22.js"), "../app/lang/en/index.json": () => import("./index-c33bb386.js"), "../app/lang/en/login.json": () => import("./login-8bac8312.js"), "../app/lang/en/member.member.json": () => import("./member.member-64cd29d1.js"), "../app/lang/en/user.center.json": () => import("./user.center-78470141.js"), "../app/lang/zh-cn/403.json": () => import("./403-afb5f475.js"), "../app/lang/zh-cn/app.authorize.json": () => import("./app.authorize-7701e564.js"), "../app/lang/zh-cn/app.index.json": () => import("./app.index-ffd57c14.js"), "../app/lang/zh-cn/app.store.json": () => import("./app.store-82fccf8d.js"), "../app/lang/zh-cn/app.upgrade.json": () => import("./app.upgrade-a5fc793d.js"), "../app/lang/zh-cn/auth.log.json": () => import("./auth.log-7ab49365.js"), "../app/lang/zh-cn/auth.menu.json": () => import("./auth.menu-11f8c5be.js"), "../app/lang/zh-cn/auth.role.json": () => import("./auth.role-c93ddff5.js"), "../app/lang/zh-cn/auth.site_menu.json": () => import("./auth.site_menu-8547ef11.js"), "../app/lang/zh-cn/auth.user.json": () => import("./auth.user-4b72de7c.js"), "../app/lang/zh-cn/channel.aliapp.access.json": () => import("./channel.aliapp.access-345ff291.js"), "../app/lang/zh-cn/channel.aliapp.config.json": () => import("./channel.aliapp.config-8ba784b4.js"), "../app/lang/zh-cn/channel.aliapp.course.json": () => import("./channel.aliapp.course-11a03e9a.js"), "../app/lang/zh-cn/channel.app.access.json": () => import("./channel.app.access-4967216b.js"), "../app/lang/zh-cn/channel.app.config.json": () => import("./channel.app.config-f92838ee.js"), "../app/lang/zh-cn/channel.app.version.json": () => import("./channel.app.version-801d7c33.js"), "../app/lang/zh-cn/channel.h5.config.json": () => import("./channel.h5.config-bb100e55.js"), "../app/lang/zh-cn/channel.pc.config.json": () => import("./channel.pc.config-bbe7313f.js"), "../app/lang/zh-cn/channel.weapp.access.json": () => import("./channel.weapp.access-f5b56b8d.js"), "../app/lang/zh-cn/channel.weapp.code.json": () => import("./channel.weapp.code-1597a17b.js"), "../app/lang/zh-cn/channel.weapp.config.json": () => import("./channel.weapp.config-62316f27.js"), "../app/lang/zh-cn/channel.weapp.course.json": () => import("./channel.weapp.course-46cdef05.js"), "../app/lang/zh-cn/channel.weapp.template.json": () => import("./channel.weapp.template-60f607e4.js"), "../app/lang/zh-cn/channel.wechat.access.json": () => import("./channel.wechat.access-3198d859.js"), "../app/lang/zh-cn/channel.wechat.config.json": () => import("./channel.wechat.config-149fe86d.js"), "../app/lang/zh-cn/channel.wechat.course.json": () => import("./channel.wechat.course-717abfc8.js"), "../app/lang/zh-cn/channel.wechat.keyword_reply_edit.json": () => import("./channel.wechat.keyword_reply_edit-736dea19.js"), "../app/lang/zh-cn/channel.wechat.menu.json": () => import("./channel.wechat.menu-08c01b06.js"), "../app/lang/zh-cn/channel.wechat.reply.json": () => import("./channel.wechat.reply-371557b9.js"), "../app/lang/zh-cn/channel.wechat.template.json": () => import("./channel.wechat.template-c7e0e856.js"), "../app/lang/zh-cn/decorate.preview.json": () => import("./decorate.preview-5f2765ef.js"), "../app/lang/zh-cn/dict.list.json": () => import("./dict.list-fdd911c6.js"), "../app/lang/zh-cn/diy.edit.json": () => import("./diy.edit-f5d8c6b1.js"), "../app/lang/zh-cn/diy.index.json": () => import("./diy.index-7d6c7cb2.js"), "../app/lang/zh-cn/diy.list.json": () => import("./diy.list-fb8d7f12.js"), "../app/lang/zh-cn/diy.member.json": () => import("./diy.member-7204bf61.js"), "../app/lang/zh-cn/diy.preview.json": () => import("./diy.preview-f8b42901.js"), "../app/lang/zh-cn/diy.route.json": () => import("./diy.route-51d664e7.js"), "../app/lang/zh-cn/diy.tabbar.json": () => import("./diy.tabbar-5a78137b.js"), "../app/lang/zh-cn/diy.tabbar_edit.json": () => import("./diy.tabbar_edit-1b67bdec.js"), "../app/lang/zh-cn/diy_form.edit.json": () => import("./diy_form.edit-5e849551.js"), "../app/lang/zh-cn/diy_form.list.json": () => import("./diy_form.list-8cc96e72.js"), "../app/lang/zh-cn/finance.account.json": () => import("./finance.account-3ebadbbb.js"), "../app/lang/zh-cn/finance.cash_out.json": () => import("./finance.cash_out-a5fc92d4.js"), "../app/lang/zh-cn/finance.offlinepay.json": () => import("./finance.offlinepay-5e4097af.js"), "../app/lang/zh-cn/finance.pay_detail.json": () => import("./finance.pay_detail-03e8534d.js"), "../app/lang/zh-cn/finance.pay_refund.json": () => import("./finance.pay_refund-33befe92.js"), "../app/lang/zh-cn/finance.refund_detail.json": () => import("./finance.refund_detail-4952f106.js"), "../app/lang/zh-cn/index.app_manage.json": () => import("./index.app_manage-8bfaebc1.js"), "../app/lang/zh-cn/index.index.json": () => import("./index.index-1daecdce.js"), "../app/lang/zh-cn/index.preview.json": () => import("./index.preview-969e67dd.js"), "../app/lang/zh-cn/index.store.json": () => import("./index.store-e2f6d3f6.js"), "../app/lang/zh-cn/login.json": () => import("./login-00d7722b.js"), "../app/lang/zh-cn/marketing.sign_config.json": () => import("./marketing.sign_config-62bde278.js"), "../app/lang/zh-cn/marketing.sign_list.json": () => import("./marketing.sign_list-2d527eb9.js"), "../app/lang/zh-cn/marketing.verifier.json": () => import("./marketing.verifier-fb68001b.js"), "../app/lang/zh-cn/marketing.verify.json": () => import("./marketing.verify-a01b4161.js"), "../app/lang/zh-cn/member.balance.json": () => import("./member.balance-7b831fb2.js"), "../app/lang/zh-cn/member.commission.json": () => import("./member.commission-6f09b642.js"), "../app/lang/zh-cn/member.growth.json": () => import("./member.growth-b8b132a4.js"), "../app/lang/zh-cn/member.label.edit.json": () => import("./member.label.edit-32f3c791.js"), "../app/lang/zh-cn/member.label.json": () => import("./member.label-d042fc75.js"), "../app/lang/zh-cn/member.level.json": () => import("./member.level-9883e926.js"), "../app/lang/zh-cn/member.level_edit.json": () => import("./member.level_edit-63ebdbf3.js"), "../app/lang/zh-cn/member.member.json": () => import("./member.member-2cc54a64.js"), "../app/lang/zh-cn/member.member_detail.json": () => import("./member.member_detail-49ebc798.js"), "../app/lang/zh-cn/member.point.json": () => import("./member.point-b9f9143f.js"), "../app/lang/zh-cn/poster.edit.json": () => import("./poster.edit-c0d45927.js"), "../app/lang/zh-cn/poster.list.json": () => import("./poster.list-6a917fd4.js"), "../app/lang/zh-cn/printer.edit.json": () => import("./printer.edit-03e2be08.js"), "../app/lang/zh-cn/printer.list.json": () => import("./printer.list-1cf7202e.js"), "../app/lang/zh-cn/printer.template_edit.json": () => import("./printer.template_edit-3092b283.js"), "../app/lang/zh-cn/printer.template_list.json": () => import("./printer.template_list-679ce0fb.js"), "../app/lang/zh-cn/setting.adminlogin.json": () => import("./setting.adminlogin-763acc1d.js"), "../app/lang/zh-cn/setting.agreement.json": () => import("./setting.agreement-ef53ab4e.js"), "../app/lang/zh-cn/setting.agreement_edit.json": () => import("./setting.agreement_edit-42ca6920.js"), "../app/lang/zh-cn/setting.cash_out.json": () => import("./setting.cash_out-b3a40561.js"), "../app/lang/zh-cn/setting.copyright.json": () => import("./setting.copyright-703776c8.js"), "../app/lang/zh-cn/setting.developer_token.json": () => import("./setting.developer_token-df8cac95.js"), "../app/lang/zh-cn/setting.export.json": () => import("./setting.export-6bcb66d7.js"), "../app/lang/zh-cn/setting.growth_rule.json": () => import("./setting.growth_rule-4682f358.js"), "../app/lang/zh-cn/setting.layout.json": () => import("./setting.layout-2d2ef354.js"), "../app/lang/zh-cn/setting.login.json": () => import("./setting.login-0e20a204.js"), "../app/lang/zh-cn/setting.map.json": () => import("./setting.map-a018c17d.js"), "../app/lang/zh-cn/setting.member.json": () => import("./setting.member-3c18afe5.js"), "../app/lang/zh-cn/setting.notice.json": () => import("./setting.notice-b12781da.js"), "../app/lang/zh-cn/setting.notice_records.json": () => import("./setting.notice_records-8b5d12a2.js"), "../app/lang/zh-cn/setting.oplatform.json": () => import("./setting.oplatform-ceddec97.js"), "../app/lang/zh-cn/setting.pay.json": () => import("./setting.pay-9d3502d5.js"), "../app/lang/zh-cn/setting.sms.json": () => import("./setting.sms-38c6ea20.js"), "../app/lang/zh-cn/setting.sms_records.json": () => import("./setting.sms_records-f32dcf96.js"), "../app/lang/zh-cn/setting.storage.json": () => import("./setting.storage-33557c9e.js"), "../app/lang/zh-cn/setting.system.json": () => import("./setting.system-533a107a.js"), "../app/lang/zh-cn/setting.transfer.json": () => import("./setting.transfer-dd7288e1.js"), "../app/lang/zh-cn/setting.transfer_scene.json": () => import("./setting.transfer_scene-a1236971.js"), "../app/lang/zh-cn/setting.weapp.json": () => import("./setting.weapp-38d65415.js"), "../app/lang/zh-cn/site.group.json": () => import("./site.group-79d11eb3.js"), "../app/lang/zh-cn/site.group_edit.json": () => import("./site.group_edit-ad4054d9.js"), "../app/lang/zh-cn/site.info.json": () => import("./site.info-3cdf0707.js"), "../app/lang/zh-cn/site.list.json": () => import("./site.list-f879a4a9.js"), "../app/lang/zh-cn/site.manage.json": () => import("./site.manage-d384cce7.js"), "../app/lang/zh-cn/site.user.json": () => import("./site.user-298548ec.js"), "../app/lang/zh-cn/site.user_info.json": () => import("./site.user_info-8949966a.js"), "../app/lang/zh-cn/tools.addon.edit.json": () => import("./tools.addon.edit-67fed17b.js"), "../app/lang/zh-cn/tools.addon.index.json": () => import("./tools.addon.index-64a332f0.js"), "../app/lang/zh-cn/tools.addon.list.json": () => import("./tools.addon.list-066ffe3b.js"), "../app/lang/zh-cn/tools.backup_records.json": () => import("./tools.backup_records-3ee06c5e.js"), "../app/lang/zh-cn/tools.code.edit.json": () => import("./tools.code.edit-ce482f8a.js"), "../app/lang/zh-cn/tools.code.index.json": () => import("./tools.code.index-2f01b5e9.js"), "../app/lang/zh-cn/tools.code.list.json": () => import("./tools.code.list-b3d1ec18.js"), "../app/lang/zh-cn/tools.detection.json": () => import("./tools.detection-2d1c5fc5.js"), "../app/lang/zh-cn/tools.schedule.json": () => import("./tools.schedule-3013f2ba.js"), "../app/lang/zh-cn/tools.schedule_log.json": () => import("./tools.schedule_log-c332642a.js"), "../app/lang/zh-cn/tools.updatecache.json": () => import("./tools.updatecache-c28011ba.js"), "../app/lang/zh-cn/tools.upgrade_records.json": () => import("./tools.upgrade_records-948f5c6a.js"), "../app/lang/zh-cn/user.center.json": () => import("./user.center-f848e53b.js"), "../app/lang/zh-cn/user.edit_center.json": () => import("./user.edit_center-86828913.js"), "../app/lang/zh-cn/wxoplatform.setting.json": () => import("./wxoplatform.setting-e351af9d.js"), "../app/lang/zh-cn/wxoplatform.weapp_version.json": () => import("./wxoplatform.weapp_version-cb21e15c.js") }), `../app/lang/${a}/${d}.json`)).default || {};
      let l = {};
      if (Object.keys(c).forEach((p) => {
        l[`${d}.${p}`] = c[p];
      }), s)
        try {
          let p = {};
          p = await loadAddonLang(s, a, "common"), Object.keys(p).forEach((u) => {
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
    await preloadAllAddonLangs((s, r) => {
      this.i18n.global.mergeLocaleMessage(s, r);
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
  set exports(i) {
    nprogressExports = i;
  }
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(i, s) {
  (function(r, a) {
    i.exports = a();
  })(commonjsGlobal, function() {
    var r = {};
    r.version = "0.2.0";
    var a = r.settings = {
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
    r.configure = function(g) {
      var _, y;
      for (_ in g)
        y = g[_], y !== void 0 && g.hasOwnProperty(_) && (a[_] = y);
      return this;
    }, r.status = null, r.set = function(g) {
      var _ = r.isStarted();
      g = d(g, a.minimum, 1), r.status = g === 1 ? null : g;
      var y = r.render(!_), S = y.querySelector(a.barSelector), b = a.speed, P = a.easing;
      return y.offsetWidth, p(function(C) {
        a.positionUsing === "" && (a.positionUsing = r.getPositioningCSS()), u(S, l(g, b, P)), g === 1 ? (u(y, {
          transition: "none",
          opacity: 1
        }), y.offsetWidth, setTimeout(function() {
          u(y, {
            transition: "all " + b + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), C();
          }, b);
        }, b)) : setTimeout(C, b);
      }), this;
    }, r.isStarted = function() {
      return typeof r.status == "number";
    }, r.start = function() {
      r.status || r.set(0);
      var g = function() {
        setTimeout(function() {
          r.status && (r.trickle(), g());
        }, a.trickleSpeed);
      };
      return a.trickle && g(), this;
    }, r.done = function(g) {
      return !g && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(g) {
      var _ = r.status;
      return _ ? (typeof g != "number" && (g = (1 - _) * d(Math.random() * _, 0.1, 0.95)), _ = d(_ + g, 0, 0.994), r.set(_)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * a.trickleRate);
    }, function() {
      var g = 0, _ = 0;
      r.promise = function(y) {
        return !y || y.state() === "resolved" ? this : (_ === 0 && r.start(), g++, _++, y.always(function() {
          _--, _ === 0 ? (g = 0, r.done()) : r.set((g - _) / g);
        }), this);
      };
    }(), r.render = function(g) {
      if (r.isRendered())
        return document.getElementById("nprogress");
      v(document.documentElement, "nprogress-busy");
      var _ = document.createElement("div");
      _.id = "nprogress", _.innerHTML = a.template;
      var y = _.querySelector(a.barSelector), S = g ? "-100" : c(r.status || 0), b = document.querySelector(a.parent), P;
      return u(y, {
        transition: "all 0 linear",
        transform: "translate3d(" + S + "%,0,0)"
      }), a.showSpinner || (P = _.querySelector(a.spinnerSelector), P && w(P)), b != document.body && v(b, "nprogress-custom-parent"), b.appendChild(_), _;
    }, r.remove = function() {
      h(document.documentElement, "nprogress-busy"), h(document.querySelector(a.parent), "nprogress-custom-parent");
      var g = document.getElementById("nprogress");
      g && w(g);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var g = document.body.style, _ = "WebkitTransform" in g ? "Webkit" : "MozTransform" in g ? "Moz" : "msTransform" in g ? "ms" : "OTransform" in g ? "O" : "";
      return _ + "Perspective" in g ? "translate3d" : _ + "Transform" in g ? "translate" : "margin";
    };
    function d(g, _, y) {
      return g < _ ? _ : g > y ? y : g;
    }
    function c(g) {
      return (-1 + g) * 100;
    }
    function l(g, _, y) {
      var S;
      return a.positionUsing === "translate3d" ? S = { transform: "translate3d(" + c(g) + "%,0,0)" } : a.positionUsing === "translate" ? S = { transform: "translate(" + c(g) + "%,0)" } : S = { "margin-left": c(g) + "%" }, S.transition = "all " + _ + "ms " + y, S;
    }
    var p = function() {
      var g = [];
      function _() {
        var y = g.shift();
        y && y(_);
      }
      return function(y) {
        g.push(y), g.length == 1 && _();
      };
    }(), u = function() {
      var g = ["Webkit", "O", "Moz", "ms"], _ = {};
      function y(C) {
        return C.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(k, x) {
          return x.toUpperCase();
        });
      }
      function S(C) {
        var k = document.body.style;
        if (C in k)
          return C;
        for (var x = g.length, $ = C.charAt(0).toUpperCase() + C.slice(1), T; x--; )
          if (T = g[x] + $, T in k)
            return T;
        return C;
      }
      function b(C) {
        return C = y(C), _[C] || (_[C] = S(C));
      }
      function P(C, k, x) {
        k = b(k), C.style[k] = x;
      }
      return function(C, k) {
        var x = arguments, $, T;
        if (x.length == 2)
          for ($ in k)
            T = k[$], T !== void 0 && k.hasOwnProperty($) && P(C, $, T);
        else
          P(C, x[1], x[2]);
      };
    }();
    function m(g, _) {
      var y = typeof g == "string" ? g : f(g);
      return y.indexOf(" " + _ + " ") >= 0;
    }
    function v(g, _) {
      var y = f(g), S = y + _;
      m(y, _) || (g.className = S.substring(1));
    }
    function h(g, _) {
      var y = f(g), S;
      m(g, _) && (S = y.replace(" " + _ + " ", " "), g.className = S.substring(1, S.length - 1));
    }
    function f(g) {
      return (" " + (g.className || "") + " ").replace(/\s+/gi, " ");
    }
    function w(g) {
      g && g.parentNode && g.parentNode.removeChild(g);
    }
    return r;
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
const t$1 = (i) => {
  const s = currentRoute();
  let r = resolveRouteAddon(s);
  const a = resolveRouteView(s);
  r || (r = inferAddonFromPath(a));
  const c = `${resolveLangFile(r, a)}.${i}`;
  return i18n.global.t(c) != c ? i18n.global.t(c) : i18n.global.t(i);
}, index$a = {
  install(i) {
    i.use(i18n);
  }
};
function login(i, s) {
  return request.get(`login/${s}`, { params: i });
}
function logout() {
  return request.put("auth/logout", {}, { showErrorMessage: !1 });
}
function getAuthMenus(i) {
  return request.get("auth/authmenu", { params: i });
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
function getRoleList(i) {
  return request.get("sys/role", { params: i });
}
function getRoleInfo(i) {
  return request.get(`sys/role/${i}`);
}
function addRole(i) {
  return request.post("sys/role", i, { showSuccessMessage: !0 });
}
function editRole(i) {
  return request.put(`sys/role/${i.role_id}`, i, { showSuccessMessage: !0 });
}
function deleteRole(i) {
  return request.delete(`sys/role/${i}`, { showSuccessMessage: !0 });
}
function modifyRoleStatus(i) {
  return request.put("sys/role/status", i, { showSuccessMessage: !0 });
}
function allRole() {
  return request.get("sys/role/all");
}
function getMenus(i) {
  return request.get(`sys/menu/${i}`);
}
function getMenuInfo(i, s) {
  return request.get(`sys/menu/${i}/info/${s}`);
}
function addMenu(i) {
  return request.post("sys/menu", i, { showSuccessMessage: !0 });
}
function editMenu(i) {
  return request.put(`sys/menu/${i.app_type}/${i.menu_key}`, i, { showSuccessMessage: !0 });
}
function deleteMenu(i, s) {
  return request.delete(`sys/menu/${i}/${s}`, { showSuccessMessage: !0 });
}
function getSystemMenu() {
  return request.get("sys/menu/system_menu");
}
function getAddonMenu(i) {
  return request.get(`sys/menu/addon_menu/${i}`);
}
function getMenuByTypeDir(i = "system") {
  return request.get(`sys/menu/dir/${i}`);
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
function setWebsite(i) {
  return request.put("sys/config/website", i, { showSuccessMessage: !0 });
}
function getCopyright() {
  return request.get("sys/config/copyright");
}
function getService() {
  return request.get("sys/config/service");
}
function setCopyright(i) {
  return request.put("sys/config/copyright", i, { showSuccessMessage: !0 });
}
function getAttachmentCategoryList(i) {
  return request.get("sys/attachment/category", { params: i });
}
function addAttachmentCategory(i) {
  return request.post("sys/attachment/category", i, { showSuccessMessage: !0 });
}
function editAttachmentCategory(i) {
  return request.put(`sys/attachment/category/${i.id}`, i, { showSuccessMessage: !0 });
}
function deleteAttachmentCategory(i) {
  return request.delete(`sys/attachment/category/${i}`, { showSuccessMessage: !0 });
}
function getAttachmentList(i) {
  return request.get("sys/attachment", { params: i });
}
function deleteAttachment(i) {
  return request.delete("sys/attachment/del", { data: i, showSuccessMessage: !0 });
}
function moveAttachment(i) {
  return request.put("sys/attachment/batchmove", i);
}
function getAuthMenu() {
  return request.get("auth/site/showmenu");
}
function getEnv() {
  return request.get("sys/env");
}
function getAreaListByPid(i = 0) {
  return request.get(`sys/area/list_by_pid/${i}`);
}
function getAreatree(i = 1) {
  return request.get(`sys/area/tree/${i}`);
}
function getAddressInfo(i) {
  return request.get("sys/area/get_info", { params: i });
}
function getContraryAddress(i) {
  return request.get("sys/area/contrary", { params: i });
}
function getAreaByCode(i) {
  return request.get(`sys/area/code/${i}`);
}
function getStorageList() {
  return request.get("sys/storage");
}
function getStorageInfo(i) {
  return request.get(`sys/storage/${i}`);
}
function editStorage(i) {
  return request.put(`sys/storage/${i.storage_type}`, i, { showSuccessMessage: !0 });
}
function getPayConfig(i) {
  return request.get(`pay/config/${i}`);
}
function setPayConfig(i) {
  return request.put(`pay/config/${i.type}`, i, { showSuccessMessage: !0 });
}
function getPayList$1() {
  return request.get("pay/lists");
}
function getTransferInfo(i) {
  return request.get(`pay/channel/lists/${i}`);
}
function setTransferInfo(i) {
  return request.post("pay/channel/set/transfer", i, { showSuccessMessage: !0 });
}
function getCronList(i) {
  return request.get("sys/schedule/list", { params: i });
}
function getCronInfo(i) {
  return request.get(`sys/cron/${i}`);
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
function addCron(i) {
  return request.post("sys/schedule", i, { showSuccessMessage: !0 });
}
function editCron(i) {
  return request.put(`sys/schedule/${i.id}`, i, { showSuccessMessage: !0 });
}
function deleteCron(i) {
  return request.delete(`sys/schedule/${i}`, { showSuccessMessage: !0 });
}
function doCron(i) {
  return request.put(`sys/schedule/do/${i.id}`, i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getCronLogList(i) {
  return request.get("sys/schedule/log/list", { params: i });
}
function deleteCronLog(i) {
  return request.put("sys/schedule/log/delete", i, { showSuccessMessage: !0 });
}
function clearCronLog(i) {
  return request.put("sys/schedule/log/clear", i, { showSuccessMessage: !0 });
}
function resetCron() {
  return request.post("sys/schedule/reset", { showSuccessMessage: !0 });
}
function getAgreementList() {
  return request.get("sys/agreement");
}
function getAgreementInfo(i) {
  return request.get(`sys/agreement/${i}`);
}
function editAgreement(i) {
  return request.put(`sys/agreement/${i.key}`, i, { showSuccessMessage: !0 });
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
function setConfigLogin(i) {
  return request.put("sys/config/login", i, { showSuccessMessage: !0 });
}
function getPayConfigList() {
  return request.get("pay/channel/lists");
}
function setPatConfig(i) {
  return request.post("pay/channel/set/all", i, { showSuccessMessage: !0 });
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
function setMap(i) {
  return request.put("sys/config/map", i, { showSuccessMessage: !0 });
}
function getMap(i) {
  return request.get("sys/config/map", { params: i });
}
function getPayAuditList(i) {
  return request.get("pay/audit", { params: i });
}
function payAuditPass(i) {
  return request.put(`pay/pass/${i}`, {}, { showSuccessMessage: !0 });
}
function payAuditRefuse(i) {
  return request.put(`pay/refuse/${i.out_trade_no}`, i, { showSuccessMessage: !0 });
}
function getPayDetail(i) {
  return request.get(`pay/detail/${i}`);
}
function getAddonList() {
  return request.get("app/getAddonList");
}
function getDeveloperToken() {
  return request.get("sys/config/developer_token");
}
function setDeveloperToken(i) {
  return request.put("sys/config/developer_token", i, { showSuccessMessage: !0 });
}
function getWebsiteLayout() {
  return request.get("sys/web/layout");
}
function getLayout() {
  return request.get("sys/config/layout");
}
function setLayout(i) {
  return request.put("sys/config/layout", i, { showSuccessMessage: !0 });
}
function getThemecolor() {
  return request.get("sys/config/themecolor");
}
function setThemecolor(i) {
  return request.put("sys/config/themecolor", i);
}
function getExportList(i) {
  return request.get("sys/export", { params: i });
}
function getExportStatusList() {
  return request.get("sys/export/status");
}
function getExportKeyList() {
  return request.get("sys/export/type");
}
function exportData(i, s) {
  return request.get(`sys/export/${i}`, { params: s });
}
function exportDataCheck(i, s) {
  return request.get(`sys/export/check/${i}`, { params: s });
}
function deleteExport(i) {
  return request.delete(`sys/export/${i}`, { showSuccessMessage: !0 });
}
function getWxoplatform() {
  return request.get("sys/wxoplatform/config");
}
function getQrcode(i) {
  return request.get("sys/qrcode", { params: i, showErrorMessage: !1 });
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
    setHeadMenu(i) {
      this.currHeadMenuName = i;
    },
    setTheme(i, s) {
      this[i] = s, theme[i] = s, storage.set({ key: "theme", data: theme });
    },
    toggleMenuCollapse(i) {
      this.menuIsCollapse = i, storage.set({ key: "menuiscollapse", data: i }), useCssVar("--aside-width").value = i ? "calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)" : "210px";
    },
    async getWebsiteInfo() {
      await getWebConfig().then(({ data: i }) => {
        this.website = i;
      }).catch(() => {
      });
    },
    async getWebsiteLayout() {
      await getWebsiteLayout().then(({ data: i }) => {
        this.layoutConfig = i;
      }).catch(() => {
      });
    }
  }
}), _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(i) {
    const a = Object.assign(/* @__PURE__ */ Object.assign({ "./admin/index.vue": () => import("./index-a54e3921.js"), "./admin_simplicity/index.vue": () => import("./index-b1c3c45d.js"), "./bussiness/index.vue": () => import("./index-9b8d140e.js"), "./darkside/index.vue": () => import("./index-497427da.js"), "./decorate/index.vue": () => Promise.resolve().then(() => index$8), "./default/index.vue": () => import("./index-540169a0.js"), "./lightside/index.vue": () => import("./index-d6be7947.js"), "./profession/index.vue": () => import("./index-bd748d3a.js"), "./routine/index.vue": () => import("./index-6ac5a94b.js") }), /* @__PURE__ */ Object.assign({ "/src/addon/home_service/layout/index.vue": () => import("./index-655f2c08.js"), "/src/addon/o2o/layout/index.vue": () => import("./index-6a0ca7ec.js"), "/src/addon/shop/layout/index.vue": () => import("./index-7ac972e3.js"), "/src/addon/tourism/layout/index.vue": () => import("./index-24ca72c5.js"), "/src/addon/vipcard/layout/index.vue": () => import("./index-8c10629e.js") }));
    let d = "default";
    switch (getAppType()) {
      case "admin":
        d = storage.get("admin_layout") || "admin";
        break;
      default:
        const l = useUserStore().siteInfo;
        if (l && l.apps) {
          const p = useSystemStore().layoutConfig;
          l.apps.length == 1 ? p[l.apps[0].key] != null && (d = p[l.apps[0].key]) : p.system != null && (d = p.system);
        }
    }
    const c = ref(null);
    return Object.keys(a).forEach((l) => {
      l.indexOf(`/${d}/`) !== -1 && (c.value = markRaw(defineAsyncComponent(a[l])));
    }), !c.value && (c.value = markRaw(defineAsyncComponent(a["./default/index.vue"]))), provide("setLayout", (l) => {
      d != l && (d = l, Object.keys(a).forEach((p) => {
        p.indexOf(`/${l}/`) !== -1 && (c.value = markRaw(defineAsyncComponent(a[p])));
      }));
    }), (l, p) => (openBlock(), createBlock(resolveDynamicComponent(c.value)));
  }
}), index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" })), _export_sfc = (i, s) => {
  const r = i.__vccOpts || i;
  for (const [a, d] of s)
    r[a] = d;
  return r;
}, _sfc_main$4 = {};
function _sfc_render(i, s) {
  const r = resolveComponent("router-view"), a = resolveComponent("el-container");
  return openBlock(), createBlock(a, { class: "w-screen h-screen min-w-[1200px]" }, {
    default: withCtx(() => [
      createVNode(r)
    ]),
    _: 1
  });
}
const Decorate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]), index$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Decorate
}, Symbol.toStringTag, { value: "Module" }));
function clearAddonStyleCache() {
  document.querySelectorAll("style[data-addon-style]").forEach((i) => i.remove()), clearAddonModuleCache();
}
const load404 = () => import("./404-e379a604.js"), allAddonVueModules$1 = /* @__PURE__ */ Object.assign({ "../addon/cms/views/article/category.vue": () => import("./category-1ad78c96.js"), "../addon/cms/views/article/components/edit-category.vue": () => import("./edit-category-6a0ca7ec.js"), "../addon/cms/views/article/edit.vue": () => import("./edit-062c26e9.js"), "../addon/cms/views/article/list.vue": () => import("./list-bb70d698.js"), "../addon/cms/views/diy/components/edit-article.vue": () => import("./edit-article-9ffb527f.js").then((i) => i._), "../addon/erp/views/purchase/detail.vue": () => import("./detail-821a9dcd.js"), "../addon/erp/views/purchase/instock.vue": () => import("./instock-19825e3d.js"), "../addon/erp/views/purchase/list.vue": () => import("./list-5afdbe73.js"), "../addon/erp/views/sales/detail.vue": () => import("./detail-557d388b.js"), "../addon/erp/views/sales/list.vue": () => import("./list-8331b225.js"), "../addon/erp/views/sales/outstock.vue": () => import("./outstock-ee3e45f4.js"), "../addon/erp/views/stock/detail.vue": () => import("./detail-aae3e67a.js"), "../addon/erp/views/stock/list.vue": () => import("./list-fb6539a8.js"), "../addon/erp/views/stock/stockIn.vue": () => import("./stockIn-e3bdb257.js"), "../addon/erp/views/stock/stockOut.vue": () => import("./stockOut-890ef8a8.js"), "../addon/friend_help/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-655f2c08.js"), "../addon/friend_help/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-3c82f3af.js"), "../addon/friend_help/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-b9312078.js"), "../addon/friend_help/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-655f2c08.js"), "../addon/friend_help/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-264d5f02.js"), "../addon/friend_help/views/active/components/goods-select-content.vue": () => import("./goods-select-content-db219848.js"), "../addon/friend_help/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-682abbfb.js"), "../addon/friend_help/views/active/components/select-member.vue": () => import("./select-member-afe1b9f0.js"), "../addon/friend_help/views/active/edit.vue": () => import("./edit-5e422f94.js"), "../addon/friend_help/views/active/list.vue": () => import("./list-ab2518bc.js"), "../addon/friend_help/views/active/stat.vue": () => import("./stat-9e6d69d7.js"), "../addon/friend_help/views/config/config.vue": () => import("./config-b0ffb798.js"), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": () => import("./edit-friend-help-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": () => import("./edit-friend-help-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": () => import("./edit-friend-help-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": () => import("./edit-friend-help-activity-goods-detail-friend-help-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": () => import("./edit-friend-help-activity-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": () => import("./edit-friend-help-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": () => import("./edit-friend-help-activity-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": () => import("./edit-friend-help-carousel-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": () => import("./edit-friend-help-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": () => import("./edit-friend-help-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": () => import("./edit-friend-help-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": () => import("./edit-friend-help-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": () => import("./edit-friend-help-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": () => import("./edit-friend-help-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-hot.vue": () => import("./edit-friend-help-hot-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-list.vue": () => import("./edit-friend-help-list-472311e7.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": () => import("./edit-friend-help-member-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": () => import("./edit-friend-help-order-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/launch/components/launch-detail-popup.vue": () => import("./launch-detail-popup-655f2c08.js"), "../addon/friend_help/views/launch/list.vue": () => import("./list-2f0d7313.js"), "../addon/friend_help/views/order/components/order-notes.vue": () => import("./order-notes-8c10629e.js"), "../addon/friend_help/views/order/components/refund-detail.vue": () => import("./refund-detail-a2708421.js"), "../addon/friend_help/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-7ac972e3.js"), "../addon/friend_help/views/order/detail.vue": () => import("./detail-dc207ced.js"), "../addon/friend_help/views/order/list.vue": () => import("./list-333b045e.js"), "../addon/friend_help/views/order/refund.vue": () => import("./refund-a46a02f2.js"), "../addon/friend_help/views/poster/components/edit-discount-desc.vue": () => import("./edit-discount-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-3656154e.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-3656154e.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-min-price.vue": () => import("./edit-min-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-original-desc.vue": () => import("./edit-original-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-original-price.vue": () => import("./edit-original-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-price.vue": () => import("./edit-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-discount-desc.vue": () => import("./preview-discount-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-min-price.vue": () => import("./preview-min-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-original-desc.vue": () => import("./preview-original-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-original-price.vue": () => import("./preview-original-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-price.vue": () => import("./preview-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/addclock/addclock_config.vue": () => import("./addclock_config-faf19172.js"), "../addon/higohome/views/addclock/components/addclock-config-edit.vue": () => import("./addclock-config-edit-6ec2134b.js"), "../addon/higohome/views/area/area_list.vue": () => import("./area_list-f3509cc8.js"), "../addon/higohome/views/area/components/area-list-edit.vue": () => import("./area-list-edit-7d472406.js"), "../addon/higohome/views/browe/browe.vue": () => import("./browe-46a06830.js"), "../addon/higohome/views/browe/components/browe-edit.vue": () => import("./browe-edit-a77e5444.js"), "../addon/higohome/views/call/call_config.vue": () => import("./call_config-ec7576bc.js"), "../addon/higohome/views/call/components/call-config-edit.vue": () => import("./call-config-edit-d0ac7a76.js"), "../addon/higohome/views/call/recodevoice.vue": () => import("./recodevoice-dea8146b.js"), "../addon/higohome/views/call/recodevoice_edit.vue": () => import("./recodevoice_edit-655f2c08.js"), "../addon/higohome/views/cash/cash_out.vue": () => import("./cash_out-04b2d10a.js"), "../addon/higohome/views/cash/components/cash-out-edit.vue": () => import("./cash-out-edit-cfad1f13.js"), "../addon/higohome/views/channels/channel_codes.vue": () => import("./channel_codes-9051719d.js"), "../addon/higohome/views/channels/channel_wallet.vue": () => import("./channel_wallet-42fbe04a.js"), "../addon/higohome/views/channels/channels_cate.vue": () => import("./channels_cate-bcbb2ceb.js"), "../addon/higohome/views/channels/channels_list.vue": () => import("./channels_list-7b1a979a.js"), "../addon/higohome/views/channels/channels_set.vue": () => import("./channels_set-e5af7114.js"), "../addon/higohome/views/channels/components/channel-codes-edit.vue": () => import("./channel-codes-edit-94c56849.js"), "../addon/higohome/views/channels/components/channel-wallet-edit.vue": () => import("./channel-wallet-edit-bee8c6df.js"), "../addon/higohome/views/channels/components/channels-cate-edit.vue": () => import("./channels-cate-edit-b267dbdd.js"), "../addon/higohome/views/channels/components/channels-set-edit.vue": () => import("./channels-set-edit-425cca75.js"), "../addon/higohome/views/channels/components/channesl-list-edit.vue": () => import("./channesl-list-edit-778f9dd7.js"), "../addon/higohome/views/city/city_list.vue": () => import("./city_list-a8df6ae5.js"), "../addon/higohome/views/city/components/city-list-edit.vue": () => import("./city-list-edit-178da71c.js"), "../addon/higohome/views/comment/comment_label.vue": () => import("./comment_label-0e8edc11.js"), "../addon/higohome/views/comment/components/comment-label-edit.vue": () => import("./comment-label-edit-955803ef.js"), "../addon/higohome/views/comment/components/technician-comment-edit.vue": () => import("./technician-comment-edit-c3807fe3.js"), "../addon/higohome/views/comment/technician_comment.vue": () => import("./technician_comment-aabfe78b.js"), "../addon/higohome/views/commission/commission_salesman.vue": () => import("./commission_salesman-06237c49.js"), "../addon/higohome/views/commission/components/commission-salesman-edit.vue": () => import("./commission-salesman-edit-147aa26a.js"), "../addon/higohome/views/common/common.vue": () => import("./common-1445c036.js"), "../addon/higohome/views/common/good-cate.vue": () => import("./good-cate-a256533f.js"), "../addon/higohome/views/common/member.vue": () => import("./member-655f2c08.js"), "../addon/higohome/views/common/select-goods-pop.vue": () => import("./select-goods-pop-655f2c08.js"), "../addon/higohome/views/config/components/order-config-edit.vue": () => import("./order-config-edit-a9ca7c1f.js"), "../addon/higohome/views/config/fenxiao.vue": () => import("./fenxiao-655f2c08.js"), "../addon/higohome/views/config/order_config.vue": () => import("./order_config-d4a02654.js"), "../addon/higohome/views/coupon/coupon.vue": () => import("./coupon-addae295.js"), "../addon/higohome/views/coupon/coupon_edit.vue": () => import("./coupon_edit-f4935af0.js"), "../addon/higohome/views/distribution/components/distribution-config-edit.vue": () => import("./distribution-config-edit-6052f8a5.js"), "../addon/higohome/views/distribution/components/distribution-list-edit.vue": () => import("./distribution-list-edit-7b733135.js"), "../addon/higohome/views/distribution/components/distribution-partner-wallet-edit.vue": () => import("./distribution-partner-wallet-edit-0cbdb704.js"), "../addon/higohome/views/distribution/distribution_config.vue": () => import("./distribution_config-2436c50c.js"), "../addon/higohome/views/distribution/distribution_list.vue": () => import("./distribution_list-12c00970.js"), "../addon/higohome/views/distribution/distribution_partner.vue": () => import("./distribution_partner-2d744107.js"), "../addon/higohome/views/distribution/distribution_partner_wallet.vue": () => import("./distribution_partner_wallet-9ecf2e9c.js"), "../addon/higohome/views/diy/components/edit-agent-register.vue": () => import("./edit-agent-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-any-form.vue": () => import("./edit-any-form-1234aef5.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-carousel-loction.vue": () => import("./edit-carousel-loction-5c382abe.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-category-index.vue": () => import("./edit-category-index-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-channel-register.vue": () => import("./edit-channel-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-distribution-register.vue": () => import("./edit-distribution-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-good-big-list.vue": () => import("./edit-good-big-list-c2263a2f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-goods-index.vue": () => import("./edit-goods-index-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-items-list-two.vue": () => import("./edit-items-list-two-ef6c49eb.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-items-list.vue": () => import("./edit-items-list-3a182c66.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-play-video.vue": () => import("./edit-play-video-8d4682b8.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-recommend-tech.vue": () => import("./edit-recommend-tech-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-salesman-register.vue": () => import("./edit-salesman-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-service-tools.vue": () => import("./edit-service-tools-644878e8.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-specials-list.vue": () => import("./edit-specials-list-587829f2.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-store-register.vue": () => import("./edit-store-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-data.vue": () => import("./edit-technician-data-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-info.vue": () => import("./edit-technician-info-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-order.vue": () => import("./edit-technician-order-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-register.vue": () => import("./edit-technician-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-tools.vue": () => import("./edit-technician-tools-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technicican-list.vue": () => import("./edit-technicican-list-9ffb527f.js").then((i) => i._), "../addon/higohome/views/dynamic/components/dynamic-comment-edit.vue": () => import("./dynamic-comment-edit-01e606f3.js"), "../addon/higohome/views/dynamic/components/dynamic-config-edit.vue": () => import("./dynamic-config-edit-52032320.js"), "../addon/higohome/views/dynamic/components/dynamic-edit.vue": () => import("./dynamic-edit-f29f7b84.js"), "../addon/higohome/views/dynamic/dynamic.vue": () => import("./dynamic-b97b9bae.js"), "../addon/higohome/views/dynamic/dynamic_comment.vue": () => import("./dynamic_comment-8daa0efc.js"), "../addon/higohome/views/dynamic/dynamic_config.vue": () => import("./dynamic_config-a415e94d.js"), "../addon/higohome/views/dynamic/rules.vue": () => import("./rules-bdd99094.js"), "../addon/higohome/views/dynamic_category/components/dynamic-category-edit.vue": () => import("./dynamic-category-edit-685c5ee7.js"), "../addon/higohome/views/dynamic_category/dynamic_category.vue": () => import("./dynamic_category-ebd53726.js"), "../addon/higohome/views/feedback/components/feedback-edit.vue": () => import("./feedback-edit-3588c7e1.js"), "../addon/higohome/views/feedback/feedback.vue": () => import("./feedback-9aa88f23.js"), "../addon/higohome/views/fenxiao/components/fenxiao-edit.vue": () => import("./fenxiao-edit-077065c7.js"), "../addon/higohome/views/fenxiao/fenxiao.vue": () => import("./fenxiao-270d3e61.js"), "../addon/higohome/views/fenxiaomember/components/fenxiaomember-edit.vue": () => import("./fenxiaomember-edit-2f4a24ab.js"), "../addon/higohome/views/fenxiaomember/fenxiaomember.vue": () => import("./fenxiaomember-d7409a14.js"), "../addon/higohome/views/fenxiaoorder/components/fenxiaoorder-edit.vue": () => import("./fenxiaoorder-edit-6d6ef189.js"), "../addon/higohome/views/fenxiaoorder/fenxiaoorder.vue": () => import("./fenxiaoorder-876909ff.js"), "../addon/higohome/views/goods/components/detailcard-edit.vue": () => import("./detailcard-edit-defab4d3.js"), "../addon/higohome/views/goods/components/goods-cate-edit.vue": () => import("./goods-cate-edit-c5e76b06.js"), "../addon/higohome/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-d3fc4164.js"), "../addon/higohome/views/goods/components/goods-tags-edit.vue": () => import("./goods-tags-edit-12c5ba4e.js"), "../addon/higohome/views/goods/detailcard.vue": () => import("./detailcard-93185a07.js"), "../addon/higohome/views/goods/goods_cate.vue": () => import("./goods_cate-a5051ad3.js"), "../addon/higohome/views/goods/goods_list.vue": () => import("./goods_list-6b73aa98.js"), "../addon/higohome/views/goods/goods_list_edit.vue": () => import("./goods_list_edit-a5822a3d.js"), "../addon/higohome/views/goods/goods_tags.vue": () => import("./goods_tags-57f8705e.js"), "../addon/higohome/views/manger/components/mobile-manger-edit.vue": () => import("./mobile-manger-edit-8f0014c6.js"), "../addon/higohome/views/manger/mobile_manger.vue": () => import("./mobile_manger-464c5076.js"), "../addon/higohome/views/message/components/message-edit.vue": () => import("./message-edit-2320b183.js"), "../addon/higohome/views/message/message.vue": () => import("./message-41b514c3.js"), "../addon/higohome/views/notice/components/notice-config-edit.vue": () => import("./notice-config-edit-5926d915.js"), "../addon/higohome/views/notice/components/notice-template-edit.vue": () => import("./notice-template-edit-a448b3d6.js"), "../addon/higohome/views/notice/notice_config.vue": () => import("./notice_config-44c28228.js"), "../addon/higohome/views/notice/notice_template.vue": () => import("./notice_template-58901487.js"), "../addon/higohome/views/order/order_detail.vue": () => import("./order_detail-539da6e2.js"), "../addon/higohome/views/order/order_dispatch.vue": () => import("./order_dispatch-58f0b9aa.js"), "../addon/higohome/views/order/order_heat.vue": () => import("./order_heat-93edee4c.js"), "../addon/higohome/views/order/ordering_notice.vue": () => import("./ordering_notice-aadc870f.js"), "../addon/higohome/views/order/orderlist.vue": () => import("./orderlist-76a35945.js"), "../addon/higohome/views/order/orderlist_edit.vue": () => import("./orderlist_edit-655f2c08.js"), "../addon/higohome/views/order/recored_manger.vue": () => import("./recored_manger-3709b3bf.js"), "../addon/higohome/views/order/recored_manger_edit.vue": () => import("./recored_manger_edit-655f2c08.js"), "../addon/higohome/views/order/selectTech.vue": () => import("./selectTech-4169d1a9.js"), "../addon/higohome/views/platform/components/platform-commission-config-edit.vue": () => import("./platform-commission-config-edit-ebfbeee8.js"), "../addon/higohome/views/platform/components/platform-commission-edit.vue": () => import("./platform-commission-edit-9034034b.js"), "../addon/higohome/views/platform/platform_commission.vue": () => import("./platform_commission-862fe329.js"), "../addon/higohome/views/platform/platform_commission_config.vue": () => import("./platform_commission_config-d078ddfa.js"), "../addon/higohome/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-3656154e.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-3656154e.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-d6db8e07.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-3656154e.js").then((i) => i._), "../addon/higohome/views/refund/components/refund-config-edit.vue": () => import("./refund-config-edit-ca441fee.js"), "../addon/higohome/views/refund/components/refund-reason-edit.vue": () => import("./refund-reason-edit-b333babe.js"), "../addon/higohome/views/refund/refund.vue": () => import("./refund-8966bcec.js"), "../addon/higohome/views/refund/refund_config.vue": () => import("./refund_config-0a1bde84.js"), "../addon/higohome/views/refund/refund_detail.vue": () => import("./refund_detail-7615db89.js"), "../addon/higohome/views/refund/refund_reason.vue": () => import("./refund_reason-38ecbd31.js"), "../addon/higohome/views/safetips/components/safetips-config-edit.vue": () => import("./safetips-config-edit-35072e71.js"), "../addon/higohome/views/safetips/safetips_config.vue": () => import("./safetips_config-fcd467c6.js"), "../addon/higohome/views/salesman/components/salesman-config-edit.vue": () => import("./salesman-config-edit-40673e08.js"), "../addon/higohome/views/salesman/components/salesman-list-edit.vue": () => import("./salesman-list-edit-19dfb30f.js"), "../addon/higohome/views/salesman/components/salesman-wallet-edit.vue": () => import("./salesman-wallet-edit-ff312938.js"), "../addon/higohome/views/salesman/salesman_config.vue": () => import("./salesman_config-7a2863b9.js"), "../addon/higohome/views/salesman/salesman_list.vue": () => import("./salesman_list-a7dc7074.js"), "../addon/higohome/views/salesman/salesman_wallet.vue": () => import("./salesman_wallet-e1db9ddb.js"), "../addon/higohome/views/shareholder/components/shareholder-config-edit.vue": () => import("./shareholder-config-edit-981805fb.js"), "../addon/higohome/views/shareholder/components/shareholder-edit.vue": () => import("./shareholder-edit-ea221b7f.js"), "../addon/higohome/views/shareholder/components/shareholder-wallet-edit.vue": () => import("./shareholder-wallet-edit-e08db6ac.js"), "../addon/higohome/views/shareholder/shareholder.vue": () => import("./shareholder-af795718.js"), "../addon/higohome/views/shareholder/shareholder_config.vue": () => import("./shareholder_config-afb1ee83.js"), "../addon/higohome/views/shareholder/shareholder_wallet.vue": () => import("./shareholder_wallet-1be1e7e9.js"), "../addon/higohome/views/smsbao/components/smsbao-config-edit.vue": () => import("./smsbao-config-edit-9b5d889a.js"), "../addon/higohome/views/smsbao/components/smsbao-message-edit.vue": () => import("./smsbao-message-edit-adeaad60.js"), "../addon/higohome/views/smsbao/smsbao_config.vue": () => import("./smsbao_config-7b49415b.js"), "../addon/higohome/views/smsbao/smsbao_message.vue": () => import("./smsbao_message-ad00ba7e.js"), "../addon/higohome/views/store/components/store-cate-edit.vue": () => import("./store-cate-edit-dd74d0f1.js"), "../addon/higohome/views/store/components/store-config-edit.vue": () => import("./store-config-edit-ebd6a356.js"), "../addon/higohome/views/store/components/store-list-edit.vue": () => import("./store-list-edit-b01a046f.js"), "../addon/higohome/views/store/components/store-wallet-edit.vue": () => import("./store-wallet-edit-add739dc.js"), "../addon/higohome/views/store/store_cate.vue": () => import("./store_cate-79a9fea0.js"), "../addon/higohome/views/store/store_config.vue": () => import("./store_config-993b3d2a.js"), "../addon/higohome/views/store/store_list.vue": () => import("./store_list-ebfc81eb.js"), "../addon/higohome/views/store/store_list_edit.vue": () => import("./store_list_edit-04632fa1.js"), "../addon/higohome/views/store/store_wallet.vue": () => import("./store_wallet-1554020f.js"), "../addon/higohome/views/technician/car_globalset.vue": () => import("./car_globalset-8359044a.js"), "../addon/higohome/views/technician/car_price.vue": () => import("./car_price-75991331.js"), "../addon/higohome/views/technician/category.vue": () => import("./category-254cfd56.js"), "../addon/higohome/views/technician/category_config.vue": () => import("./category_config-4aa5b3bc.js"), "../addon/higohome/views/technician/components/TencentMap.vue": () => import("./TencentMap-0f147363.js"), "../addon/higohome/views/technician/components/car-price-edit.vue": () => import("./car-price-edit-d91d3d8a.js"), "../addon/higohome/views/technician/components/category-edit.vue": () => import("./category-edit-ad371543.js"), "../addon/higohome/views/technician/components/police-config-edit.vue": () => import("./police-config-edit-5cfeb28f.js"), "../addon/higohome/views/technician/components/select-category-pop.vue": () => import("./select-category-pop-10bfe0d2.js"), "../addon/higohome/views/technician/components/select-technician-pop.vue": () => import("./select-technician-pop-3afe1df4.js"), "../addon/higohome/views/technician/components/technician-config-edit.vue": () => import("./technician-config-edit-0ce1da87.js"), "../addon/higohome/views/technician/components/technician-detail.vue": () => import("./technician-detail-2e3f3728.js"), "../addon/higohome/views/technician/components/technician-police-edit.vue": () => import("./technician-police-edit-6551de2c.js"), "../addon/higohome/views/technician/components/technician-tags-edit.vue": () => import("./technician-tags-edit-ca3b7c94.js"), "../addon/higohome/views/technician/components/technician-wallet-edit.vue": () => import("./technician-wallet-edit-8b2eb2b4.js"), "../addon/higohome/views/technician/config.vue": () => import("./config-e24474f6.js"), "../addon/higohome/views/technician/other_config.vue": () => import("./other_config-8dae68e7.js"), "../addon/higohome/views/technician/police_config.vue": () => import("./police_config-ac68aa9a.js"), "../addon/higohome/views/technician/technician_config.vue": () => import("./technician_config-62845598.js"), "../addon/higohome/views/technician/technician_data.vue": () => import("./technician_data-55cc7b96.js"), "../addon/higohome/views/technician/technician_data_edit.vue": () => import("./technician_data_edit-655f2c08.js"), "../addon/higohome/views/technician/technician_detail.vue": () => import("./technician_detail-92129f9a.js"), "../addon/higohome/views/technician/technician_goods.vue": () => import("./technician_goods-045ac690.js"), "../addon/higohome/views/technician/technician_goods_select.vue": () => import("./technician_goods_select-a7ae17db.js"), "../addon/higohome/views/technician/technician_list.vue": () => import("./technician_list-fc94ff5f.js"), "../addon/higohome/views/technician/technician_list_edit.vue": () => import("./technician_list_edit-94444904.js"), "../addon/higohome/views/technician/technician_police.vue": () => import("./technician_police-522e0f7c.js"), "../addon/higohome/views/technician/technician_set.vue": () => import("./technician_set-384571df.js"), "../addon/higohome/views/technician/technician_tags.vue": () => import("./technician_tags-57260471.js"), "../addon/higohome/views/technician/technician_wallet.vue": () => import("./technician_wallet-dd9f1e5c.js"), "../addon/higohome/views/technician/test_data.vue": () => import("./test_data-c698117e.js"), "../addon/higohome/views/technician/travel_set.vue": () => import("./travel_set-4994e536.js"), "../addon/higohome/views/theme/components/theme-config-edit.vue": () => import("./theme-config-edit-a803a5a9.js"), "../addon/higohome/views/theme/couponads.vue": () => import("./couponads-19b54375.js"), "../addon/higohome/views/theme/theme_color_config.vue": () => import("./theme_color_config-cc20b5ef.js"), "../addon/higohome/views/theme/theme_images_config.vue": () => import("./theme_images_config-a810fd4e.js"), "../addon/higohome/views/welcome/welcome.vue": () => import("./welcome-39a917f1.js"), "../addon/higohome/views/welcome/welcomebak.vue": () => import("./welcomebak-d4d798a1.js"), "../addon/home_service/views/card/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-7ac972e3.js"), "../addon/home_service/views/card/components/goods-select-popup.vue": () => import("./goods-select-popup-84574e87.js"), "../addon/home_service/views/card/edit.vue": () => import("./edit-9ebde44e.js"), "../addon/home_service/views/card/list.vue": () => import("./list-830bb3e2.js"), "../addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": () => import("./edit-homeService-carousel-search-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": () => import("./edit-homeService-many-goods-list-83ba7eca.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-order-info.vue": () => import("./edit-homeService-order-info-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": () => import("./edit-homeService-rubik-cube-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": () => import("./edit-homeServicemember-banner-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-card.vue": () => import("./edit-homeServicemember-card-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": () => import("./edit-homeServicemember-cardList-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": () => import("./edit-homeServicemember-guarantee-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-info.vue": () => import("./edit-homeServicemember-info-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": () => import("./edit-homeServicemember-lowCost-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": () => import("./edit-homeServicemember-panicBuying-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": () => import("./edit-homeServicemember-settle-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": () => import("./edit-homeServicemember-subguarantee-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": () => import("./edit-homeServicemember-technician-list-recommed-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": () => import("./edit-homeServicemember-technician-list-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-card.vue": () => import("./link-select-card-7cabf8e5.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-category.vue": () => import("./link-select-category-d720c079.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-goods.vue": () => import("./link-select-goods-251e1db4.js").then((i) => i._), "../addon/home_service/views/feedback/list.vue": () => import("./list-484e4994.js"), "../addon/home_service/views/finance/components/BankTransferDialog.vue": () => import("./BankTransferDialog-d4bed5ce.js"), "../addon/home_service/views/finance/invoice.vue": () => import("./invoice-6a0ca7ec.js"), "../addon/home_service/views/finance/store_detail.vue": () => import("./store_detail-655f2c08.js"), "../addon/home_service/views/finance/store_finance.vue": () => import("./store_finance-655f2c08.js"), "../addon/home_service/views/finance/technician_detail.vue": () => import("./technician_detail-655f2c08.js"), "../addon/home_service/views/finance/technician_finance.vue": () => import("./technician_finance-655f2c08.js"), "../addon/home_service/views/finance/withdrawal_review.vue": () => import("./withdrawal_review-655f2c08.js"), "../addon/home_service/views/goods/category.vue": () => import("./category-8c10629e.js"), "../addon/home_service/views/goods/city.vue": () => import("./city-655f2c08.js"), "../addon/home_service/views/goods/components/card-select-popup.vue": () => import("./card-select-popup-393086ef.js"), "../addon/home_service/views/goods/components/category-edit.vue": () => import("./category-edit-655f2c08.js"), "../addon/home_service/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6a0ca7ec.js"), "../addon/home_service/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-380a6014.js"), "../addon/home_service/views/goods/components/guarantee-edit.vue": () => import("./guarantee-edit-655f2c08.js"), "../addon/home_service/views/goods/components/special-edit.vue": () => import("./special-edit-655f2c08.js"), "../addon/home_service/views/goods/edit.vue": () => import("./edit-f5f484b5.js"), "../addon/home_service/views/goods/guarantee.vue": () => import("./guarantee-655f2c08.js"), "../addon/home_service/views/goods/list.vue": () => import("./list-655f2c08.js"), "../addon/home_service/views/goods/special.vue": () => import("./special-655f2c08.js"), "../addon/home_service/views/help/category.vue": () => import("./category-655f2c08.js"), "../addon/home_service/views/help/components/edit-category.vue": () => import("./edit-category-655f2c08.js"), "../addon/home_service/views/help/edit.vue": () => import("./edit-d478eb29.js"), "../addon/home_service/views/help/list.vue": () => import("./list-6a0ca7ec.js"), "../addon/home_service/views/index.vue": () => import("./index-0ca263b6.js"), "../addon/home_service/views/marketing/coupon/add.vue": () => import("./add-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-1d56cd8e.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/select-member.vue": () => import("./select-member-9c1dbb33.js"), "../addon/home_service/views/marketing/coupon/edit.vue": () => import("./edit-655f2c08.js"), "../addon/home_service/views/marketing/coupon/list.vue": () => import("./list-8c10629e.js"), "../addon/home_service/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-655f2c08.js"), "../addon/home_service/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-24ca72c5.js"), "../addon/home_service/views/order/components/add-address.vue": () => import("./add-address-90cd4549.js"), "../addon/home_service/views/order/components/address-list.vue": () => import("./address-list-6a0ca7ec.js"), "../addon/home_service/views/order/components/coupon-list.vue": () => import("./coupon-list-6a0ca7ec.js"), "../addon/home_service/views/order/components/friend-pay.vue": () => import("./friend-pay-6a0ca7ec.js"), "../addon/home_service/views/order/components/goods-limit.vue": () => import("./goods-limit-6a0ca7ec.js"), "../addon/home_service/views/order/components/manjian-info.vue": () => import("./manjian-info-6a0ca7ec.js"), "../addon/home_service/views/order/components/order-export-select.vue": () => import("./order-export-select-7ac972e3.js"), "../addon/home_service/views/order/components/pay.vue": () => import("./pay-5be492b8.js"), "../addon/home_service/views/order/components/returnvisit.vue": () => import("./returnvisit-9c071b0b.js"), "../addon/home_service/views/order/components/select-goods.vue": () => import("./select-goods-6a0ca7ec.js"), "../addon/home_service/views/order/components/select-member.vue": () => import("./select-member-7ac972e3.js"), "../addon/home_service/views/order/components/select-orderlabel.vue": () => import("./select-orderlabel-867066ce.js"), "../addon/home_service/views/order/components/select-technician.vue": () => import("./select-technician-655f2c08.js"), "../addon/home_service/views/order/components/select-time.vue": () => import("./select-time-b846d0eb.js"), "../addon/home_service/views/order/config.vue": () => import("./config-696d6794.js"), "../addon/home_service/views/order/easy_select.vue": () => import("./easy_select-9308abf9.js"), "../addon/home_service/views/order/easy_select_detail.vue": () => import("./easy_select_detail-8d1b86b5.js"), "../addon/home_service/views/order/evaluate.vue": () => import("./evaluate-445a3432.js"), "../addon/home_service/views/order/evaluate_config.vue": () => import("./evaluate_config-4ac55d95.js"), "../addon/home_service/views/order/intent_config.vue": () => import("./intent_config-8574a5a7.js"), "../addon/home_service/views/order/lesson_order.vue": () => import("./lesson_order-655f2c08.js"), "../addon/home_service/views/order/lesson_order_confirm.vue": () => import("./lesson_order_confirm-655f2c08.js"), "../addon/home_service/views/order/order.vue": () => import("./order-a43257b1.js"), "../addon/home_service/views/order/order_detail.vue": () => import("./order_detail-35c97b12.js"), "../addon/home_service/views/order/protection_settings.vue": () => import("./protection_settings-5fc46a35.js"), "../addon/home_service/views/order/return_visit.vue": () => import("./return_visit-5169bc75.js"), "../addon/home_service/views/order/tags.vue": () => import("./tags-a457fc6f.js"), "../addon/home_service/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-9ffb527f.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-9ffb527f.js").then((i) => i._), "../addon/home_service/views/refund/refund.vue": () => import("./refund-73ddac05.js"), "../addon/home_service/views/report/customer_report.vue": () => import("./customer_report-504a1d31.js"), "../addon/home_service/views/report/financial_report.vue": () => import("./financial_report-d88b7d55.js"), "../addon/home_service/views/report/member_report.vue": () => import("./member_report-fe9a0eff.js"), "../addon/home_service/views/report/store_report.vue": () => import("./store_report-fc2ed43e.js"), "../addon/home_service/views/report/technician_report.vue": () => import("./technician_report-b53c2438.js"), "../addon/home_service/views/store/add.vue": () => import("./add-5591aaf1.js"), "../addon/home_service/views/store/detail.vue": () => import("./detail-1bdd2e2c.js"), "../addon/home_service/views/store/edit.vue": () => import("./edit-0e735c5c.js"), "../addon/home_service/views/store/examine.vue": () => import("./examine-655f2c08.js"), "../addon/home_service/views/store/examine_edit.vue": () => import("./examine_edit-1e843b87.js"), "../addon/home_service/views/store/list.vue": () => import("./list-47455626.js"), "../addon/home_service/views/store/technician.vue": () => import("./technician-655f2c08.js"), "../addon/home_service/views/technician/cityfare.vue": () => import("./cityfare-655f2c08.js"), "../addon/home_service/views/technician/cityfare_config.vue": () => import("./cityfare_config-4fe34ee8.js"), "../addon/home_service/views/technician/components/dynamicCollapseForm/dynamicCollapseForm.vue": () => import("./dynamicCollapseForm-63bdddb7.js"), "../addon/home_service/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-71a12e50.js"), "../addon/home_service/views/technician/detail.vue": () => import("./detail-8ff6be0c.js"), "../addon/home_service/views/technician/edit.vue": () => import("./edit-c777de5e.js"), "../addon/home_service/views/technician/examine.vue": () => import("./examine-6a0ca7ec.js"), "../addon/home_service/views/technician/examine_edit.vue": () => import("./examine_edit-f8e07145.js"), "../addon/home_service/views/technician/level.vue": () => import("./level-655f2c08.js"), "../addon/home_service/views/technician/level_edit.vue": () => import("./level_edit-764e6e3c.js"), "../addon/home_service/views/technician/list.vue": () => import("./list-ca3a19a0.js"), "../addon/huaweicloud_obs/views/setting/components/storage-huawei.vue": () => import("./storage-huawei-655f2c08.js"), "../addon/huaweicloud_sms/views/setting/components/sms-huawei.vue": () => import("./sms-huawei-655f2c08.js"), "../addon/o2o/views/config/reserve.vue": () => import("./reserve-655f2c08.js"), "../addon/o2o/views/diy/components/edit-o2o-goods-list.vue": () => import("./edit-o2o-goods-list-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-member-info.vue": () => import("./edit-o2o-member-info-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-order-info.vue": () => import("./edit-o2o-order-info-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-search.vue": () => import("./edit-o2o-search-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-technician.vue": () => import("./edit-o2o-technician-9ffb527f.js").then((i) => i._), "../addon/o2o/views/goods/category.vue": () => import("./category-24ca72c5.js"), "../addon/o2o/views/goods/components/category-edit.vue": () => import("./category-edit-1ad78c96.js"), "../addon/o2o/views/goods/components/category-select-content.vue": () => import("./category-select-content-655f2c08.js"), "../addon/o2o/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-655f2c08.js"), "../addon/o2o/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-743e6724.js"), "../addon/o2o/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-9ae37d46.js"), "../addon/o2o/views/goods/edit.vue": () => import("./edit-934fb501.js"), "../addon/o2o/views/goods/list.vue": () => import("./list-24ca72c5.js"), "../addon/o2o/views/index.vue": () => import("./index-e58c1c71.js"), "../addon/o2o/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-24ca72c5.js"), "../addon/o2o/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-7ac972e3.js"), "../addon/o2o/views/order/components/order-export-select.vue": () => import("./order-export-select-6a0ca7ec.js"), "../addon/o2o/views/order/config.vue": () => import("./config-7da0b282.js"), "../addon/o2o/views/order/order.vue": () => import("./order-33dbd836.js"), "../addon/o2o/views/order/order_detail.vue": () => import("./order_detail-dff79846.js"), "../addon/o2o/views/order/reserve.vue": () => import("./reserve-b686ea12.js"), "../addon/o2o/views/poster/components/edit-o2o-goods-image.vue": () => import("./edit-o2o-goods-image-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/edit-o2o-goods-name.vue": () => import("./edit-o2o-goods-name-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/edit-o2o-goods-price.vue": () => import("./edit-o2o-goods-price-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-image.vue": () => import("./preview-o2o-goods-image-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-name.vue": () => import("./preview-o2o-goods-name-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-price.vue": () => import("./preview-o2o-goods-price-9ffb527f.js").then((i) => i._), "../addon/o2o/views/refund/detail.vue": () => import("./detail-8c10629e.js"), "../addon/o2o/views/refund/refund.vue": () => import("./refund-7ac972e3.js"), "../addon/o2o/views/site_index.vue": () => import("./site_index-655f2c08.js"), "../addon/o2o/views/technician/components/edit-position.vue": () => import("./edit-position-655f2c08.js"), "../addon/o2o/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-b7a37219.js"), "../addon/o2o/views/technician/edit.vue": () => import("./edit-032fc568.js"), "../addon/o2o/views/technician/list.vue": () => import("./list-fbca5f7b.js"), "../addon/o2o/views/technician/position.vue": () => import("./position-655f2c08.js"), "../addon/pintuan/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-6a0ca7ec.js"), "../addon/pintuan/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-0c5022fd.js"), "../addon/pintuan/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-d0b46ffe.js"), "../addon/pintuan/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-7ac972e3.js"), "../addon/pintuan/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-6a838123.js"), "../addon/pintuan/views/active/components/goods-select-content.vue": () => import("./goods-select-content-152b3080.js"), "../addon/pintuan/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-3eb27c1c.js"), "../addon/pintuan/views/active/components/select-member.vue": () => import("./select-member-4b07a13a.js"), "../addon/pintuan/views/active/edit.vue": () => import("./edit-cb07e44f.js"), "../addon/pintuan/views/active/list.vue": () => import("./list-e113a869.js"), "../addon/pintuan/views/active/stat.vue": () => import("./stat-b95580ce.js"), "../addon/pintuan/views/config/config.vue": () => import("./config-3f1aed28.js"), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": () => import("./edit-pintuan-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": () => import("./edit-pintuan-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": () => import("./edit-pintuan-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": () => import("./edit-pintuan-activity-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": () => import("./edit-pintuan-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": () => import("./edit-pintuan-activity-goods-detail-pintuan-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": () => import("./edit-pintuan-activity-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": () => import("./edit-pintuan-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": () => import("./edit-pintuan-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": () => import("./edit-pintuan-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": () => import("./edit-pintuan-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": () => import("./edit-pintuan-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": () => import("./edit-pintuan-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-hot.vue": () => import("./edit-pintuan-hot-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": () => import("./edit-pintuan-immediately-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-limit.vue": () => import("./edit-pintuan-limit-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-list.vue": () => import("./edit-pintuan-list-db229a9b.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": () => import("./edit-pintuan-member-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": () => import("./edit-pintuan-order-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/group/components/group-detail-popup.vue": () => import("./group-detail-popup-655f2c08.js"), "../addon/pintuan/views/group/list.vue": () => import("./list-98995852.js"), "../addon/pintuan/views/order/components/order-notes.vue": () => import("./order-notes-1ad78c96.js"), "../addon/pintuan/views/order/components/refund-detail.vue": () => import("./refund-detail-660775b7.js"), "../addon/pintuan/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-8c10629e.js"), "../addon/pintuan/views/order/detail.vue": () => import("./detail-070418fe.js"), "../addon/pintuan/views/order/list.vue": () => import("./list-be6741db.js"), "../addon/pintuan/views/order/refund.vue": () => import("./refund-018abccc.js"), "../addon/pintuan/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-0a4df787.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-price.vue": () => import("./edit-price-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-price.vue": () => import("./preview-price-3656154e.js").then((i) => i._), "../addon/recharge/views/order/components/recharge-detail.vue": () => import("./recharge-detail-655f2c08.js"), "../addon/recharge/views/order/detail.vue": () => import("./detail-1ad78c96.js"), "../addon/recharge/views/order/list.vue": () => import("./list-f58fe01d.js"), "../addon/recharge/views/order/refund.vue": () => import("./refund-24ca72c5.js"), "../addon/recharge/views/package/components/detail-growth.vue": () => import("./detail-growth-9a944ddd.js"), "../addon/recharge/views/package/components/detail-points.vue": () => import("./detail-points-6d8bd262.js"), "../addon/recharge/views/package/components/gift-growth.vue": () => import("./gift-growth-d8bb0311.js"), "../addon/recharge/views/package/components/gift-points.vue": () => import("./gift-points-03d0431c.js"), "../addon/recharge/views/package/components/package-gift.vue": () => import("./package-gift-655f2c08.js"), "../addon/recharge/views/package/config.vue": () => import("./config-c3170518.js"), "../addon/recharge/views/package/detail.vue": () => import("./detail-b0ffb798.js"), "../addon/recharge/views/package/edit.vue": () => import("./edit-33a03570.js"), "../addon/recharge/views/package/list.vue": () => import("./list-cd799851.js"), "../addon/relay/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-7ac972e3.js"), "../addon/relay/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-b9d0b30b.js"), "../addon/relay/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-e449b1c8.js"), "../addon/relay/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-24ca72c5.js"), "../addon/relay/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-a9725102.js"), "../addon/relay/views/active/components/goods-select-content.vue": () => import("./goods-select-content-7fb2740a.js"), "../addon/relay/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-ecb72321.js"), "../addon/relay/views/active/components/select-member.vue": () => import("./select-member-89a5095a.js"), "../addon/relay/views/active/edit.vue": () => import("./edit-8432472b.js"), "../addon/relay/views/active/list.vue": () => import("./list-d193b946.js"), "../addon/relay/views/active/stat.vue": () => import("./stat-06441dd5.js"), "../addon/relay/views/config/config.vue": () => import("./config-122e19c0.js"), "../addon/relay/views/diy/components/edit-relay-goods-list.vue": () => import("./edit-relay-goods-list-9ffb527f.js").then((i) => i._), "../addon/relay/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-3f57a5df.js"), "../addon/relay/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-29afb627.js"), "../addon/relay/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-fc0d601f.js"), "../addon/relay/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-cfe8dbed.js"), "../addon/relay/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-6a0ca7ec.js"), "../addon/relay/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-f148bd18.js"), "../addon/relay/views/goods/edit.vue": () => import("./edit-3b2a98e3.js"), "../addon/relay/views/goods/list.vue": () => import("./list-c43c131e.js"), "../addon/relay/views/order/components/order-notes.vue": () => import("./order-notes-655f2c08.js"), "../addon/relay/views/order/components/refund-detail.vue": () => import("./refund-detail-04ee3512.js"), "../addon/relay/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-24ca72c5.js"), "../addon/relay/views/order/detail.vue": () => import("./detail-3c71781e.js"), "../addon/relay/views/order/list.vue": () => import("./list-abfaff0d.js"), "../addon/relay/views/order/refund.vue": () => import("./refund-0bc0595c.js"), "../addon/sd_minsu/views/banner/list.vue": () => import("./list-bb846ef3.js"), "../addon/sd_minsu/views/city/list.vue": () => import("./list-d4303a32.js"), "../addon/sd_minsu/views/config/index.vue": () => import("./index-5739ce7e.js"), "../addon/sd_minsu/views/coupon/list.vue": () => import("./list-c72a0c25.js"), "../addon/sd_minsu/views/dashboard/index.vue": () => import("./index-b0fe7816.js"), "../addon/sd_minsu/views/evaluate/list.vue": () => import("./list-0ffe9cb4.js"), "../addon/sd_minsu/views/facility/list.vue": () => import("./list-f422d13c.js"), "../addon/sd_minsu/views/homestay/apply.vue": () => import("./apply-fadff92b.js"), "../addon/sd_minsu/views/homestay/edit.vue": () => import("./edit-3f1aed28.js"), "../addon/sd_minsu/views/homestay/list.vue": () => import("./list-d9a8c3e5.js"), "../addon/sd_minsu/views/invite/index.vue": () => import("./index-fc2de04f.js"), "../addon/sd_minsu/views/notice/list.vue": () => import("./list-6c6c4b64.js"), "../addon/sd_minsu/views/order/detail.vue": () => import("./detail-05396620.js"), "../addon/sd_minsu/views/order/list.vue": () => import("./list-887fd12c.js"), "../addon/sd_minsu/views/quick_nav/list.vue": () => import("./list-11ed21f5.js"), "../addon/sd_minsu/views/refund/list.vue": () => import("./list-d2e30548.js"), "../addon/sd_minsu/views/room/calendar.vue": () => import("./calendar-7340b761.js"), "../addon/sd_minsu/views/room/list.vue": () => import("./list-7d333a48.js"), "../addon/sd_minsu/views/settlement/list.vue": () => import("./list-7886d8fa.js"), "../addon/sd_minsu/views/staff/list.vue": () => import("./list-a0ddce29.js"), "../addon/sd_xiaoyuan/views/appeal/list.vue": () => import("./list-c9a4276a.js"), "../addon/sd_xiaoyuan/views/campus/list.vue": () => import("./list-68a2dea6.js"), "../addon/sd_xiaoyuan/views/campus_auth/list.vue": () => import("./list-32ef8888.js"), "../addon/sd_xiaoyuan/views/class_schedule/import.vue": () => import("./import-55273c74.js"), "../addon/sd_xiaoyuan/views/class_schedule/list.vue": () => import("./list-86e16b2e.js"), "../addon/sd_xiaoyuan/views/comment/community.vue": () => import("./community-5f4d80ea.js"), "../addon/sd_xiaoyuan/views/comment/confession.vue": () => import("./confession-ae09011f.js"), "../addon/sd_xiaoyuan/views/comment/list.vue": () => import("./list-cfd6a588.js"), "../addon/sd_xiaoyuan/views/community/category.vue": () => import("./category-c54511d6.js"), "../addon/sd_xiaoyuan/views/community/list.vue": () => import("./list-638149a0.js"), "../addon/sd_xiaoyuan/views/confession/list.vue": () => import("./list-44d739fb.js"), "../addon/sd_xiaoyuan/views/config/index.vue": () => import("./index-70fb3510.js"), "../addon/sd_xiaoyuan/views/coupon/list.vue": () => import("./list-1556aae7.js"), "../addon/sd_xiaoyuan/views/credit/list.vue": () => import("./list-16b3b6ac.js"), "../addon/sd_xiaoyuan/views/dashboard/index.vue": () => import("./index-f288cdd0.js"), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-banner.vue": () => import("./edit-xiaoyuan-banner-699df7a5.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-card-grid.vue": () => import("./edit-xiaoyuan-card-grid-941545e6.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-community.vue": () => import("./edit-xiaoyuan-community-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-header.vue": () => import("./edit-xiaoyuan-header-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-idle-preview.vue": () => import("./edit-xiaoyuan-idle-preview-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-menu-grid.vue": () => import("./edit-xiaoyuan-menu-grid-8d9dbe60.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-notice.vue": () => import("./edit-xiaoyuan-notice-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-order-hall.vue": () => import("./edit-xiaoyuan-order-hall-69dcdce8.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-promo-card.vue": () => import("./edit-xiaoyuan-promo-card-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-search.vue": () => import("./edit-xiaoyuan-search-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-user-header.vue": () => import("./edit-xiaoyuan-user-header-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-user-menu.vue": () => import("./edit-xiaoyuan-user-menu-11a64be5.js").then((i) => i._), "../addon/sd_xiaoyuan/views/evaluate/list.vue": () => import("./list-4729d887.js"), "../addon/sd_xiaoyuan/views/express_station/list.vue": () => import("./list-f7c7f347.js"), "../addon/sd_xiaoyuan/views/game/category.vue": () => import("./category-5210873e.js"), "../addon/sd_xiaoyuan/views/game/index.vue": () => import("./index-cc9867fa.js"), "../addon/sd_xiaoyuan/views/group_order/list.vue": () => import("./list-c4104d58.js"), "../addon/sd_xiaoyuan/views/house/list.vue": () => import("./list-ffc540c8.js"), "../addon/sd_xiaoyuan/views/house/order.vue": () => import("./order-ffed94e4.js"), "../addon/sd_xiaoyuan/views/invite/index.vue": () => import("./index-822e44c5.js"), "../addon/sd_xiaoyuan/views/lost_found/category.vue": () => import("./category-f7a574d7.js"), "../addon/sd_xiaoyuan/views/lost_found/list.vue": () => import("./list-4f0bf8ee.js"), "../addon/sd_xiaoyuan/views/message/list.vue": () => import("./list-189b4a37.js"), "../addon/sd_xiaoyuan/views/message/send.vue": () => import("./send-66780995.js"), "../addon/sd_xiaoyuan/views/order/list.vue": () => import("./list-54e6e2fe.js"), "../addon/sd_xiaoyuan/views/package_price/list.vue": () => import("./list-e3b920cf.js"), "../addon/sd_xiaoyuan/views/points/goods.vue": () => import("./goods-17b2cf4d.js"), "../addon/sd_xiaoyuan/views/points/orders.vue": () => import("./orders-9a8c916d.js"), "../addon/sd_xiaoyuan/views/runner/level.vue": () => import("./level-7606a3fb.js"), "../addon/sd_xiaoyuan/views/runner/list.vue": () => import("./list-199a2c61.js"), "../addon/sd_xiaoyuan/views/school/list.vue": () => import("./list-dd1a3f4d.js"), "../addon/sd_xiaoyuan/views/school_class/list.vue": () => import("./list-3096e553.js"), "../addon/sd_xiaoyuan/views/secondhand/category.vue": () => import("./category-eb1ee10b.js"), "../addon/sd_xiaoyuan/views/secondhand/list.vue": () => import("./list-dc3ff9c7.js"), "../addon/sd_xiaoyuan/views/service_card/list.vue": () => import("./list-1b2f3241.js"), "../addon/sd_xiaoyuan/views/sign/index.vue": () => import("./index-1f6ad2db.js"), "../addon/sd_xiaoyuan/views/stat/index.vue": () => import("./index-92622363.js"), "../addon/sd_xiaoyuan/views/task/list.vue": () => import("./list-85dfd664.js"), "../addon/sd_xiaoyuan/views/withdraw/list.vue": () => import("./list-6d2fb5cf.js"), "../addon/seckill/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-6a0ca7ec.js"), "../addon/seckill/views/active/components/goods-sku-popup.vue": () => import("./goods-sku-popup-5543c00e.js"), "../addon/seckill/views/active/components/seckill-detail-popup.vue": () => import("./seckill-detail-popup-655f2c08.js"), "../addon/seckill/views/active/components/time-select-popup.vue": () => import("./time-select-popup-655f2c08.js"), "../addon/seckill/views/active/detail.vue": () => import("./detail-9a208960.js"), "../addon/seckill/views/active/edit.vue": () => import("./edit-1dbc91e6.js"), "../addon/seckill/views/active/list.vue": () => import("./list-7ac972e3.js"), "../addon/seckill/views/active/stat.vue": () => import("./stat-b899674a.js"), "../addon/seckill/views/config/config.vue": () => import("./config-655f2c08.js"), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": () => import("./edit-seckill-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": () => import("./edit-seckill-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": () => import("./edit-seckill-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": () => import("./edit-seckill-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": () => import("./edit-seckill-activity-goods-detail-seckill-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": () => import("./edit-seckill-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": () => import("./edit-seckill-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": () => import("./edit-seckill-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": () => import("./edit-seckill-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods.vue": () => import("./edit-seckill-goods-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-hot.vue": () => import("./edit-seckill-hot-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-member-info.vue": () => import("./edit-seckill-member-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-order-info.vue": () => import("./edit-seckill-order-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": () => import("./edit-seckill-rubik-cube-71b3f871.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-special-offer.vue": () => import("./edit-seckill-special-offer-9ffb527f.js").then((i) => i._), "../addon/seckill/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-4df1d010.js"), "../addon/seckill/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-84f387df.js"), "../addon/seckill/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-3231d0f0.js"), "../addon/seckill/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-319c669a.js"), "../addon/seckill/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-655f2c08.js"), "../addon/seckill/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-2e3563d1.js"), "../addon/seckill/views/goods/edit.vue": () => import("./edit-c5ceaedb.js"), "../addon/seckill/views/goods/list.vue": () => import("./list-0bbb41fc.js"), "../addon/seckill/views/order/components/order-notes.vue": () => import("./order-notes-6a0ca7ec.js"), "../addon/seckill/views/order/components/refund-detail.vue": () => import("./refund-detail-aea85365.js"), "../addon/seckill/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-655f2c08.js"), "../addon/seckill/views/order/detail.vue": () => import("./detail-99ff804c.js"), "../addon/seckill/views/order/list.vue": () => import("./list-9ec5f5c7.js"), "../addon/seckill/views/order/refund.vue": () => import("./refund-696ac832.js"), "../addon/seckill/views/poster/components/edit-active-time.vue": () => import("./edit-active-time-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-f7d788a0.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-0a4df787.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-seckill-market-price.vue": () => import("./edit-seckill-market-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-seckill-price.vue": () => import("./edit-seckill-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-active-time.vue": () => import("./preview-active-time-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-0a4df787.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-f7d788a0.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-seckill-market-price.vue": () => import("./preview-seckill-market-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-seckill-price.vue": () => import("./preview-seckill-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/time/components/time-diy-select-popup.vue": () => import("./time-diy-select-popup-32d17943.js"), "../addon/seckill/views/time/components/time-goods-detail.vue": () => import("./time-goods-detail-655f2c08.js"), "../addon/seckill/views/time/components/time-select-content.vue": () => import("./time-select-content-8240d9b1.js"), "../addon/seckill/views/time/edit.vue": () => import("./edit-7ac972e3.js"), "../addon/seckill/views/time/list.vue": () => import("./list-4a02961a.js"), "../addon/shop/views/address/edit.vue": () => import("./edit-6a0ca7ec.js"), "../addon/shop/views/address/list.vue": () => import("./list-1ad78c96.js"), "../addon/shop/views/delivery/company.vue": () => import("./company-655f2c08.js"), "../addon/shop/views/delivery/company_edit.vue": () => import("./company_edit-655f2c08.js"), "../addon/shop/views/delivery/components/delivery-personnel-edit.vue": () => import("./delivery-personnel-edit-655f2c08.js"), "../addon/shop/views/delivery/components/local-delivery-service-dada.vue": () => import("./local-delivery-service-dada-655f2c08.js"), "../addon/shop/views/delivery/components/local_record_detail.vue": () => import("./local_record_detail-655f2c08.js"), "../addon/shop/views/delivery/components/shop_record_detail.vue": () => import("./shop_record_detail-655f2c08.js"), "../addon/shop/views/delivery/config.vue": () => import("./config-b2c3ae09.js"), "../addon/shop/views/delivery/electronic_sheet.vue": () => import("./electronic_sheet-655f2c08.js"), "../addon/shop/views/delivery/electronic_sheet_config.vue": () => import("./electronic_sheet_config-cffd3d2b.js"), "../addon/shop/views/delivery/electronic_sheet_edit.vue": () => import("./electronic_sheet_edit-655f2c08.js"), "../addon/shop/views/delivery/local.vue": () => import("./local-d22ea663.js"), "../addon/shop/views/delivery/local_config.vue": () => import("./local_config-655f2c08.js"), "../addon/shop/views/delivery/local_delivery_service.vue": () => import("./local_delivery_service-655f2c08.js"), "../addon/shop/views/delivery/local_record.vue": () => import("./local_record-54f66ae2.js"), "../addon/shop/views/delivery/merchant_record.vue": () => import("./merchant_record-dc7a1c92.js"), "../addon/shop/views/delivery/search.vue": () => import("./search-a1c2b04e.js"), "../addon/shop/views/delivery/staff.vue": () => import("./staff-655f2c08.js"), "../addon/shop/views/delivery/store.vue": () => import("./store-655f2c08.js"), "../addon/shop/views/delivery/store_edit.vue": () => import("./store_edit-655f2c08.js"), "../addon/shop/views/delivery/template.vue": () => import("./template-655f2c08.js"), "../addon/shop/views/delivery/template_edit.vue": () => import("./template_edit-43b5e1d4.js"), "../addon/shop/views/delivery_store/delivery_set.vue": () => import("./delivery_set-655f2c08.js"), "../addon/shop/views/delivery_store/edit.vue": () => import("./edit-78c1dd7e.js"), "../addon/shop/views/delivery_store/list.vue": () => import("./list-14757507.js"), "../addon/shop/views/diy/components/edit-goods-coupon.vue": () => import("./edit-goods-coupon-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-goods-list.vue": () => import("./edit-goods-list-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-many-goods-list.vue": () => import("./edit-many-goods-list-e3d4971f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-exchange-goods.vue": () => import("./edit-shop-exchange-goods-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-exchange-info.vue": () => import("./edit-shop-exchange-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": () => import("./edit-shop-goods-detail-attr-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": () => import("./edit-shop-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": () => import("./edit-shop-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": () => import("./edit-shop-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": () => import("./edit-shop-goods-detail-evaluate-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": () => import("./edit-shop-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": () => import("./edit-shop-goods-detail-sow-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-hot.vue": () => import("./edit-shop-goods-hot-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-ranking.vue": () => import("./edit-shop-goods-ranking-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-recommend.vue": () => import("./edit-shop-goods-recommend-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-member-info.vue": () => import("./edit-shop-member-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-newcomer.vue": () => import("./edit-shop-newcomer-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-order-info.vue": () => import("./edit-shop-order-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-search.vue": () => import("./edit-shop-search-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-single-recommend.vue": () => import("./edit-single-recommend-9ffb527f.js").then((i) => i._), "../addon/shop/views/goods/attr.vue": () => import("./attr-655f2c08.js"), "../addon/shop/views/goods/attr_edit.vue": () => import("./attr_edit-655f2c08.js"), "../addon/shop/views/goods/brand_list.vue": () => import("./brand_list-655f2c08.js"), "../addon/shop/views/goods/category.vue": () => import("./category-5e7f2de8.js"), "../addon/shop/views/goods/category_config.vue": () => import("./category_config-480209f9.js"), "../addon/shop/views/goods/components/brand-edit.vue": () => import("./brand-edit-655f2c08.js"), "../addon/shop/views/goods/components/category-edit.vue": () => import("./category-edit-6a0ca7ec.js"), "../addon/shop/views/goods/components/coupon-select-popup.vue": () => import("./coupon-select-popup-080b96c0.js"), "../addon/shop/views/goods/components/evaluate-add.vue": () => import("./evaluate-add-655f2c08.js"), "../addon/shop/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-d47e1693.js"), "../addon/shop/views/goods/components/goods-category-select-content.vue": () => import("./goods-category-select-content-f69ead33.js"), "../addon/shop/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-dbc8613a.js"), "../addon/shop/views/goods/components/goods-price-edit-popup.vue": () => import("./goods-price-edit-popup-4db9677b.js"), "../addon/shop/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-3f58a19c.js"), "../addon/shop/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-595d932e.js"), "../addon/shop/views/goods/components/goods-stock-edit-popup.vue": () => import("./goods-stock-edit-popup-27502087.js"), "../addon/shop/views/goods/components/label-edit.vue": () => import("./label-edit-655f2c08.js"), "../addon/shop/views/goods/components/label-group-edit.vue": () => import("./label-group-edit-655f2c08.js"), "../addon/shop/views/goods/components/newcomer-goods-select-popup.vue": () => import("./newcomer-goods-select-popup-2bf5462a.js"), "../addon/shop/views/goods/components/service-edit.vue": () => import("./service-edit-655f2c08.js"), "../addon/shop/views/goods/evaluate.vue": () => import("./evaluate-e1d6fc00.js"), "../addon/shop/views/goods/label_group_list.vue": () => import("./label_group_list-655f2c08.js"), "../addon/shop/views/goods/label_list.vue": () => import("./label_list-655f2c08.js"), "../addon/shop/views/goods/list.vue": () => import("./list-6acce2f9.js"), "../addon/shop/views/goods/real_edit.vue": () => import("./real_edit-6d7b422b.js"), "../addon/shop/views/goods/recycle.vue": () => import("./recycle-26854108.js"), "../addon/shop/views/goods/search_config.vue": () => import("./search_config-88cf60d5.js"), "../addon/shop/views/goods/service.vue": () => import("./service-655f2c08.js"), "../addon/shop/views/goods/virtual_edit.vue": () => import("./virtual_edit-021f8e7f.js"), "../addon/shop/views/index/index.vue": () => import("./index-3f1aed28.js"), "../addon/shop/views/marketing/coupon/add.vue": () => import("./add-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-7acfa604.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/select-member.vue": () => import("./select-member-26f2f1c1.js"), "../addon/shop/views/marketing/coupon/edit.vue": () => import("./edit-7da0b282.js"), "../addon/shop/views/marketing/coupon/list.vue": () => import("./list-b0ffb798.js"), "../addon/shop/views/marketing/discount/add.vue": () => import("./add-1ba1bdf6.js"), "../addon/shop/views/marketing/discount/components/discount-detail.vue": () => import("./discount-detail-655f2c08.js"), "../addon/shop/views/marketing/discount/components/goods-sku-popup.vue": () => import("./goods-sku-popup-67ccebf0.js"), "../addon/shop/views/marketing/discount/config.vue": () => import("./config-ca95bf03.js"), "../addon/shop/views/marketing/discount/detail.vue": () => import("./detail-655f2c08.js"), "../addon/shop/views/marketing/discount/edit.vue": () => import("./edit-b4efb0d6.js"), "../addon/shop/views/marketing/discount/list.vue": () => import("./list-7da0b282.js"), "../addon/shop/views/marketing/exchange/components/goods-select-content.vue": () => import("./goods-select-content-9d39c2de.js"), "../addon/shop/views/marketing/exchange/components/goods-select-popup.vue": () => import("./goods-select-popup-655f2c08.js"), "../addon/shop/views/marketing/exchange/components/goods-sku-select.vue": () => import("./goods-sku-select-655f2c08.js"), "../addon/shop/views/marketing/exchange/goods_add.vue": () => import("./goods_add-be6bac76.js"), "../addon/shop/views/marketing/exchange/goods_edit.vue": () => import("./goods_edit-ede26358.js"), "../addon/shop/views/marketing/exchange/goods_list.vue": () => import("./goods_list-655f2c08.js"), "../addon/shop/views/marketing/exchange/order_list.vue": () => import("./order_list-055264c0.js"), "../addon/shop/views/marketing/goods_rank/components/rank-select-popup.vue": () => import("./rank-select-popup-8c680ce5.js"), "../addon/shop/views/marketing/goods_rank/config.vue": () => import("./config-6a0ca7ec.js"), "../addon/shop/views/marketing/goods_rank/edit.vue": () => import("./edit-8c10629e.js"), "../addon/shop/views/marketing/goods_rank/list.vue": () => import("./list-3f1aed28.js"), "../addon/shop/views/marketing/index.vue": () => import("./index-27b86ecd.js"), "../addon/shop/views/marketing/manjian/detail.vue": () => import("./detail-262c6570.js"), "../addon/shop/views/marketing/manjian/edit.vue": () => import("./edit-9e73a2ee.js"), "../addon/shop/views/marketing/manjian/list.vue": () => import("./list-122e19c0.js"), "../addon/shop/views/marketing/newcomer/config.vue": () => import("./config-e7695139.js"), "../addon/shop/views/marketing/newcomer/order_list.vue": () => import("./order_list-d9dc414c.js"), "../addon/shop/views/member/components/benefits-free-shipping.vue": () => import("./benefits-free-shipping-655f2c08.js"), "../addon/shop/views/member/components/gift-coupon.vue": () => import("./gift-coupon-655f2c08.js"), "../addon/shop/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-6a0ca7ec.js"), "../addon/shop/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-655f2c08.js"), "../addon/shop/views/member/components/point-rule-buygoods.vue": () => import("./point-rule-buygoods-655f2c08.js"), "../addon/shop/views/member/components/point-rule-orderdeduction.vue": () => import("./point-rule-orderdeduction-655f2c08.js"), "../addon/shop/views/member/components/recharge-detail-coupon.vue": () => import("./recharge-detail-coupon-b33a4f54.js"), "../addon/shop/views/member/components/recharge-gift-coupon.vue": () => import("./recharge-gift-coupon-ee84508a.js"), "../addon/shop/views/order/batch_delivery.vue": () => import("./batch_delivery-655f2c08.js"), "../addon/shop/views/order/components/adjust-money.vue": () => import("./adjust-money-655f2c08.js"), "../addon/shop/views/order/components/delivery-action.vue": () => import("./delivery-action-655f2c08.js"), "../addon/shop/views/order/components/delivery-package.vue": () => import("./delivery-package-655f2c08.js"), "../addon/shop/views/order/components/electronic-sheet-print.vue": () => import("./electronic-sheet-print-655f2c08.js"), "../addon/shop/views/order/components/form-detail.vue": () => import("./form-detail-655f2c08.js"), "../addon/shop/views/order/components/import-data.vue": () => import("./import-data-655f2c08.js"), "../addon/shop/views/order/components/invoice-detail.vue": () => import("./invoice-detail-655f2c08.js"), "../addon/shop/views/order/components/invoice-dialog.vue": () => import("./invoice-dialog-655f2c08.js"), "../addon/shop/views/order/components/open-invoice.vue": () => import("./open-invoice-655f2c08.js"), "../addon/shop/views/order/components/order-detail.vue": () => import("./order-detail-6a0ca7ec.js"), "../addon/shop/views/order/components/order-edit-address.vue": () => import("./order-edit-address-655f2c08.js"), "../addon/shop/views/order/components/order-export-select.vue": () => import("./order-export-select-655f2c08.js"), "../addon/shop/views/order/components/order-notes.vue": () => import("./order-notes-7ac972e3.js"), "../addon/shop/views/order/components/refund-detail.vue": () => import("./refund-detail-e70f75ab.js"), "../addon/shop/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-6a0ca7ec.js"), "../addon/shop/views/order/config.vue": () => import("./config-1ad78c96.js"), "../addon/shop/views/order/detail.vue": () => import("./detail-f61fbcf2.js"), "../addon/shop/views/order/invoice.vue": () => import("./invoice-655f2c08.js"), "../addon/shop/views/order/list.vue": () => import("./list-de61d345.js"), "../addon/shop/views/order/refund.vue": () => import("./refund-5279f858.js"), "../addon/shop/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-907653fa.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-f7d788a0.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-f7d788a0.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-0a4df787.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/printer/components/preview-goods-order.vue": () => import("./preview-goods-order-37a1aa0d.js").then((i) => i._), "../addon/shop/views/sow_community/components/sow-community-gift-coupon.vue": () => import("./sow-community-gift-coupon-c01290a4.js"), "../addon/shop/views/stat/goods.vue": () => import("./goods-5143c7cb.js"), "../addon/shop/views/stat/index.vue": () => import("./index-601c91b2.js"), "../addon/shop/views/stat/member.vue": () => import("./member-ce49a1ae.js"), "../addon/shop/views/stat/order.vue": () => import("./order-ec093897.js"), "../addon/shop/views/stat/visit.vue": () => import("./visit-e9ea451f.js"), "../addon/shop_fenxiao/views/agent/level_config.vue": () => import("./level_config-655f2c08.js"), "../addon/shop_fenxiao/views/agent/list.vue": () => import("./list-545eb6f5.js"), "../addon/shop_fenxiao/views/agent/order.vue": () => import("./order-4f4228ea.js"), "../addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue": () => import("./fenxiao-goods-detail-655f2c08.js"), "../addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue": () => import("./fenxiao-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/components/member-of-select-popup.vue": () => import("./member-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/config/index.vue": () => import("./index-df823b62.js"), "../addon/shop_fenxiao/views/config/poster.vue": () => import("./poster-655f2c08.js"), "../addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": () => import("./edit-fenxiao-goods-list-9ffb527f.js").then((i) => i._), "../addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue": () => import("./fenxiao-detail-655f2c08.js"), "../addon/shop_fenxiao/views/fenxiao/detail.vue": () => import("./detail-24ca72c5.js"), "../addon/shop_fenxiao/views/fenxiao/edit.vue": () => import("./edit-9eb57442.js"), "../addon/shop_fenxiao/views/fenxiao/lists.vue": () => import("./lists-655f2c08.js"), "../addon/shop_fenxiao/views/goods/config.vue": () => import("./config-2d218da0.js"), "../addon/shop_fenxiao/views/goods/detail.vue": () => import("./detail-4d94da3c.js"), "../addon/shop_fenxiao/views/goods/lists.vue": () => import("./lists-e8dfffcb.js"), "../addon/shop_fenxiao/views/index/index.vue": () => import("./index-b0ffb798.js"), "../addon/shop_fenxiao/views/level/edit.vue": () => import("./edit-0dc0f896.js"), "../addon/shop_fenxiao/views/level/lists.vue": () => import("./lists-6a0ca7ec.js"), "../addon/shop_fenxiao/views/member/lists.vue": () => import("./lists-7ac972e3.js"), "../addon/shop_fenxiao/views/order/lists.vue": () => import("./lists-353e6b52.js"), "../addon/shop_fenxiao/views/sale/config.vue": () => import("./config-69f3c534.js"), "../addon/shop_fenxiao/views/sale/list.vue": () => import("./list-16d80079.js"), "../addon/shop_fenxiao/views/sale/member_list.vue": () => import("./member_list-655f2c08.js"), "../addon/shop_fenxiao/views/task/components/task-detail.vue": () => import("./task-detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/config.vue": () => import("./config-fcae6b14.js"), "../addon/shop_fenxiao/views/task/detail.vue": () => import("./detail-6a0ca7ec.js"), "../addon/shop_fenxiao/views/task/edit.vue": () => import("./edit-24ca72c5.js"), "../addon/shop_fenxiao/views/task/list.vue": () => import("./list-9439af69.js"), "../addon/shop_fenxiao/views/task/reward_detail.vue": () => import("./reward_detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/reward_list.vue": () => import("./reward_list-655f2c08.js"), "../addon/shop_fenxiao/views/team/level.vue": () => import("./level-9a03afb1.js"), "../addon/shop_fenxiao/views/team/order.vue": () => import("./order-fe25a1a7.js"), "../addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": () => import("./edit-giftcard-list-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/giftcard/card_detail.vue": () => import("./card_detail-c53763a7.js"), "../addon/shop_giftcard/views/giftcard/category.vue": () => import("./category-6a0ca7ec.js"), "../addon/shop_giftcard/views/giftcard/components/category-edit.vue": () => import("./category-edit-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue": () => import("./giftcard-detail-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-content.vue": () => import("./giftcard-select-content-03d4fa20.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue": () => import("./giftcard-select-popup-ebc1ca56.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-edit.vue": () => import("./makecard-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue": () => import("./makecard-import-log-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-edit.vue": () => import("./material-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-group-edit.vue": () => import("./material-group-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-move.vue": () => import("./material-move-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-select-popup.vue": () => import("./material-select-popup-f5377c62.js"), "../addon/shop_giftcard/views/giftcard/components/material-select.vue": () => import("./material-select-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/config.vue": () => import("./config-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/detail.vue": () => import("./detail-38aa1aac.js"), "../addon/shop_giftcard/views/giftcard/edit.vue": () => import("./edit-27b0755b.js"), "../addon/shop_giftcard/views/giftcard/list.vue": () => import("./list-788e9d8a.js"), "../addon/shop_giftcard/views/giftcard/makecard.vue": () => import("./makecard-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material.vue": () => import("./material-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material_group.vue": () => import("./material_group-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-detail.vue": () => import("./order-detail-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-notes.vue": () => import("./order-notes-24ca72c5.js"), "../addon/shop_giftcard/views/order/list.vue": () => import("./list-a4203436.js"), "../addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": () => import("./edit-giftcard-blessing-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": () => import("./edit-giftcard-image-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": () => import("./edit-giftcard-name-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": () => import("./edit-giftcard-validity-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": () => import("./preview-giftcard-blessing-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": () => import("./preview-giftcard-image-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": () => import("./preview-giftcard-name-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": () => import("./preview-giftcard-validity-9ffb527f.js").then((i) => i._), "../addon/shop_impulse_buy/views/impulse_buy/components/category-select-popup.vue": () => import("./category-select-popup-43921fac.js"), "../addon/shop_impulse_buy/views/impulse_buy/config.vue": () => import("./config-24ca72c5.js"), "../addon/shop_impulse_buy/views/impulse_buy/detail.vue": () => import("./detail-7ac972e3.js"), "../addon/shop_impulse_buy/views/impulse_buy/edit.vue": () => import("./edit-cbf86ff8.js"), "../addon/shop_impulse_buy/views/impulse_buy/list.vue": () => import("./list-2c2b8751.js"), "../addon/shop_replace_buy/views/components/add-address.vue": () => import("./add-address-655f2c08.js"), "../addon/shop_replace_buy/views/components/address-list.vue": () => import("./address-list-655f2c08.js"), "../addon/shop_replace_buy/views/components/coupon-list.vue": () => import("./coupon-list-655f2c08.js"), "../addon/shop_replace_buy/views/components/friend-pay.vue": () => import("./friend-pay-655f2c08.js"), "../addon/shop_replace_buy/views/components/goods-limit.vue": () => import("./goods-limit-655f2c08.js"), "../addon/shop_replace_buy/views/components/manjian-info.vue": () => import("./manjian-info-655f2c08.js"), "../addon/shop_replace_buy/views/components/select-goods.vue": () => import("./select-goods-655f2c08.js"), "../addon/shop_replace_buy/views/components/select-member.vue": () => import("./select-member-655f2c08.js"), "../addon/shop_replace_buy/views/components/store-list.vue": () => import("./store-list-655f2c08.js"), "../addon/shop_replace_buy/views/index.vue": () => import("./index-7da0b282.js"), "../addon/shop_replace_buy/views/order.vue": () => import("./order-655f2c08.js"), "../addon/sow_community/views/category/components/category-edit.vue": () => import("./category-edit-24ca72c5.js"), "../addon/sow_community/views/category/list.vue": () => import("./list-9b808d93.js"), "../addon/sow_community/views/comment/list.vue": () => import("./list-e949c5a9.js"), "../addon/sow_community/views/config/config.vue": () => import("./config-8c10629e.js"), "../addon/sow_community/views/content/components/content-detail.vue": () => import("./content-detail-a2ddce27.js"), "../addon/sow_community/views/content/components/select-member.vue": () => import("./select-member-6a0ca7ec.js"), "../addon/sow_community/views/content/components/treasure-select-popup.vue": () => import("./treasure-select-popup-4fb1b785.js"), "../addon/sow_community/views/content/edit.vue": () => import("./edit-b0ffb798.js"), "../addon/sow_community/views/content/list.vue": () => import("./list-07c4c15d.js"), "../addon/sow_community/views/content/select_content.vue": () => import("./select_content-a898afe2.js"), "../addon/sow_community/views/package/components/gift-balance.vue": () => import("./gift-balance-51dab398.js"), "../addon/sow_community/views/package/components/gift-points.vue": () => import("./gift-points-da310e35.js"), "../addon/sow_community/views/reward_rule/components/reward_rule-detail.vue": () => import("./reward_rule-detail-58d88b97.js"), "../addon/sow_community/views/reward_rule/edit.vue": () => import("./edit-23a83234.js"), "../addon/sow_community/views/reward_rule/list.vue": () => import("./list-e1e5a97c.js"), "../addon/sow_community/views/sensitive/index.vue": () => import("./index-16d80079.js"), "../addon/sow_community/views/topic/components/topic-edit.vue": () => import("./topic-edit-655f2c08.js"), "../addon/sow_community/views/topic/list.vue": () => import("./list-d7499fbc.js"), "../addon/sow_community/views/treasure/components/goods-select-popup.vue": () => import("./goods-select-popup-9ca391a4.js"), "../addon/sow_community/views/treasure/components/treasure-edit.vue": () => import("./treasure-edit-655f2c08.js"), "../addon/sow_community/views/treasure/list.vue": () => import("./list-0093effa.js"), "../addon/tk_cps/views/act/act.vue": () => import("./act-0a718d81.js"), "../addon/tk_cps/views/act/components/act-edit.vue": () => import("./act-edit-4b544e24.js"), "../addon/tk_cps/views/actitem/actitem.vue": () => import("./actitem-08422f8b.js"), "../addon/tk_cps/views/actitem/components/actitem-edit.vue": () => import("./actitem-edit-f75d9734.js"), "../addon/tk_cps/views/actorder/actorder.vue": () => import("./actorder-274b8eb0.js"), "../addon/tk_cps/views/actorder/components/actorder-edit.vue": () => import("./actorder-edit-6dd4283a.js"), "../addon/tk_cps/views/bwcorder/bwcorder.vue": () => import("./bwcorder-ad6668bd.js"), "../addon/tk_cps/views/bwcorder/components/bwcorder-edit.vue": () => import("./bwcorder-edit-db654917.js"), "../addon/tk_cps/views/components/act-link.vue": () => import("./act-link-3773a7a6.js"), "../addon/tk_cps/views/components/act-select.vue": () => import("./act-select-29e93df5.js"), "../addon/tk_cps/views/config/bwc.vue": () => import("./bwc-655f2c08.js"), "../addon/tk_cps/views/config/index.vue": () => import("./index-122e19c0.js"), "../addon/tk_cps/views/config/share.vue": () => import("./share-655f2c08.js"), "../addon/tk_cps/views/diy/components/edit-bwc.vue": () => import("./edit-bwc-44cd6942.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-adv.vue": () => import("./edit-cps-adv-2986a447.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-card-nav.vue": () => import("./edit-cps-card-nav-6c90fb36.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-collection.vue": () => import("./edit-cps-collection-ace44f28.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-nav.vue": () => import("./edit-cps-nav-f1a89638.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-hotel.vue": () => import("./edit-hotel-da80282f.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-movie.vue": () => import("./edit-movie-e1e2a682.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-shop.vue": () => import("./edit-shop-06a3525f.js").then((i) => i._), "../addon/tk_cps/views/doc/index.vue": () => import("./index-bbb195cc.js"), "../addon/tk_cps/views/jtk/order.vue": () => import("./order-2a8ff4d3.js"), "../addon/tk_cps/views/member/components/benefits-bwc-fenxiao.vue": () => import("./benefits-bwc-fenxiao-655f2c08.js"), "../addon/tk_cps/views/member/components/benefits-bwc-level.vue": () => import("./benefits-bwc-level-655f2c08.js"), "../addon/tk_cps/views/member/components/benefits-cps-fenxiao.vue": () => import("./benefits-cps-fenxiao-655f2c08.js"), "../addon/tk_cps/views/member/components/growth-rule-bwcorder.vue": () => import("./growth-rule-bwcorder-655f2c08.js"), "../addon/tk_cps/views/member/components/growth-rule-cpsorder.vue": () => import("./growth-rule-cpsorder-655f2c08.js"), "../addon/tk_cps/views/member/components/point-rule-bwcorder.vue": () => import("./point-rule-bwcorder-655f2c08.js"), "../addon/tk_cps/views/member/components/point-rule-cpsorder.vue": () => import("./point-rule-cpsorder-655f2c08.js"), "../addon/tk_cps/views/myxq/dc_order.vue": () => import("./dc_order-65813d85.js"), "../addon/tk_cps/views/myxq/movie_order.vue": () => import("./movie_order-5e4b80ee.js"), "../addon/tk_cps/views/myxq/near_order.vue": () => import("./near_order-2c768017.js"), "../addon/tk_cps/views/myxq/other_order.vue": () => import("./other_order-26f8cac1.js"), "../addon/tk_cps/views/myxq/recharge_order.vue": () => import("./recharge_order-f0d84120.js"), "../addon/tk_cps/views/myxq/shop_order.vue": () => import("./shop_order-9c20a964.js"), "../addon/tk_cps/views/partner/components/tk-bwc.vue": () => import("./tk-bwc-655f2c08.js"), "../addon/tk_cps/views/partner/components/tk-cps.vue": () => import("./tk-cps-655f2c08.js"), "../addon/tk_cps/views/platform/components/jtk.vue": () => import("./jtk-655f2c08.js"), "../addon/tk_cps/views/platform/components/myxq.vue": () => import("./myxq-655f2c08.js"), "../addon/tk_cps/views/platform/platform.vue": () => import("./platform-655f2c08.js"), "../addon/tk_cps/views/share/components/share-edit.vue": () => import("./share-edit-e8e2847c.js"), "../addon/tk_cps/views/share/share.vue": () => import("./share-68faf373.js"), "../addon/tk_cps/views/tkfenxiao/components/commission/tk-bwc-fenxiao.vue": () => import("./tk-bwc-fenxiao-655f2c08.js"), "../addon/tk_cps/views/tkfenxiao/components/commission/tk-cps-fenxiao.vue": () => import("./tk-cps-fenxiao-655f2c08.js"), "../addon/tourism/views/components/goods-day-member-price-popup.vue": () => import("./goods-day-member-price-popup-092408a2.js"), "../addon/tourism/views/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-3a6d2baf.js"), "../addon/tourism/views/components/hotel-select-popup.vue": () => import("./hotel-select-popup-707b0bcd.js"), "../addon/tourism/views/components/tickets-select-popup.vue": () => import("./tickets-select-popup-180ac076.js"), "../addon/tourism/views/components/travel-select-popup.vue": () => import("./travel-select-popup-064ee649.js"), "../addon/tourism/views/components/verifier.vue": () => import("./verifier-655f2c08.js"), "../addon/tourism/views/diy/components/edit-tourism-hotel.vue": () => import("./edit-tourism-hotel-9ffb527f.js").then((i) => i._), "../addon/tourism/views/diy/components/edit-tourism-tickets.vue": () => import("./edit-tourism-tickets-9ffb527f.js").then((i) => i._), "../addon/tourism/views/diy/components/edit-tourism-travel.vue": () => import("./edit-tourism-travel-9ffb527f.js").then((i) => i._), "../addon/tourism/views/hotel/edit_hotel.vue": () => import("./edit_hotel-2763556a.js"), "../addon/tourism/views/hotel/edit_room.vue": () => import("./edit_room-20269b73.js"), "../addon/tourism/views/hotel/list.vue": () => import("./list-2c7214bb.js"), "../addon/tourism/views/hotel/order.vue": () => import("./order-6a0ca7ec.js"), "../addon/tourism/views/hotel/order_detail.vue": () => import("./order_detail-24ca72c5.js"), "../addon/tourism/views/hotel/room.vue": () => import("./room-655f2c08.js"), "../addon/tourism/views/hotel/select_content.vue": () => import("./select_content-47934b3f.js"), "../addon/tourism/views/index.vue": () => import("./index-f68fb002.js"), "../addon/tourism/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-7ac972e3.js"), "../addon/tourism/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-6a0ca7ec.js"), "../addon/tourism/views/poster/components/edit-tourism-goods-image.vue": () => import("./edit-tourism-goods-image-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/edit-tourism-goods-name.vue": () => import("./edit-tourism-goods-name-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/edit-tourism-goods-price.vue": () => import("./edit-tourism-goods-price-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-image.vue": () => import("./preview-tourism-goods-image-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-name.vue": () => import("./preview-tourism-goods-name-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-price.vue": () => import("./preview-tourism-goods-price-9ffb527f.js").then((i) => i._), "../addon/tourism/views/refund.vue": () => import("./refund-6a0ca7ec.js"), "../addon/tourism/views/scenic/edit_scenic.vue": () => import("./edit_scenic-35f2a4cf.js"), "../addon/tourism/views/scenic/edit_ticket.vue": () => import("./edit_ticket-655f2c08.js"), "../addon/tourism/views/scenic/list.vue": () => import("./list-032bb2e9.js"), "../addon/tourism/views/scenic/order.vue": () => import("./order-7ac972e3.js"), "../addon/tourism/views/scenic/order_detail.vue": () => import("./order_detail-7ac972e3.js"), "../addon/tourism/views/scenic/select_content.vue": () => import("./select_content-2d4a5815.js"), "../addon/tourism/views/scenic/ticket.vue": () => import("./ticket-655f2c08.js"), "../addon/tourism/views/setting.vue": () => import("./setting-655f2c08.js"), "../addon/tourism/views/site_index.vue": () => import("./site_index-37f33826.js"), "../addon/tourism/views/verify.vue": () => import("./verify-6a0ca7ec.js"), "../addon/tourism/views/way/edit.vue": () => import("./edit-d61a1a40.js"), "../addon/tourism/views/way/list.vue": () => import("./list-576f801a.js"), "../addon/tourism/views/way/order.vue": () => import("./order-24ca72c5.js"), "../addon/tourism/views/way/order_detail.vue": () => import("./order_detail-655f2c08.js"), "../addon/tourism/views/way/select_content.vue": () => import("./select_content-1ca9d641.js"), "../addon/vipcard/views/card/edit.vue": () => import("./edit-4d91903c.js"), "../addon/vipcard/views/card/list.vue": () => import("./list-9a3023c5.js"), "../addon/vipcard/views/card/record_info.vue": () => import("./record_info-6a0ca7ec.js"), "../addon/vipcard/views/card/record_list.vue": () => import("./record_list-655f2c08.js"), "../addon/vipcard/views/card/select_content.vue": () => import("./select_content-d8704fb9.js"), "../addon/vipcard/views/components/card-goods-select.vue": () => import("./card-goods-select-655f2c08.js"), "../addon/vipcard/views/components/category-edit.vue": () => import("./category-edit-8c10629e.js"), "../addon/vipcard/views/components/goods-select-popup.vue": () => import("./goods-select-popup-a962abb6.js"), "../addon/vipcard/views/components/record-info.vue": () => import("./record-info-655f2c08.js"), "../addon/vipcard/views/components/verifier.vue": () => import("./verifier-6a0ca7ec.js"), "../addon/vipcard/views/diy/components/edit-vipcard-card.vue": () => import("./edit-vipcard-card-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": () => import("./edit-vipcard-reserve-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/diy/components/edit-vipcard-store.vue": () => import("./edit-vipcard-store-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/index.vue": () => import("./index-6dbc7259.js"), "../addon/vipcard/views/order.vue": () => import("./order-8c10629e.js"), "../addon/vipcard/views/order_detail.vue": () => import("./order_detail-6a0ca7ec.js"), "../addon/vipcard/views/refund.vue": () => import("./refund-655f2c08.js"), "../addon/vipcard/views/reserve/components/add-reserve.vue": () => import("./add-reserve-655f2c08.js"), "../addon/vipcard/views/reserve/components/reserve-detail.vue": () => import("./reserve-detail-655f2c08.js"), "../addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue": () => import("./vipcard-reserve-edit-655f2c08.js"), "../addon/vipcard/views/reserve/index.vue": () => import("./index-eecf728b.js"), "../addon/vipcard/views/reserve/list.vue": () => import("./list-02a6dc3f.js"), "../addon/vipcard/views/reserve/set.vue": () => import("./set-655f2c08.js"), "../addon/vipcard/views/service/category.vue": () => import("./category-7ac972e3.js"), "../addon/vipcard/views/service/edit.vue": () => import("./edit-1ad78c96.js"), "../addon/vipcard/views/service/list.vue": () => import("./list-a5e84786.js"), "../addon/vipcard/views/service/record_info.vue": () => import("./record_info-655f2c08.js"), "../addon/vipcard/views/service/record_list.vue": () => import("./record_list-6a0ca7ec.js"), "../addon/vipcard/views/service/select_content.vue": () => import("./select_content-b29bb8fb.js"), "../addon/vipcard/views/site_index.vue": () => import("./site_index-39648ad8.js"), "../addon/vipcard/views/technician/components/add-technician.vue": () => import("./add-technician-655f2c08.js"), "../addon/vipcard/views/technician/detail.vue": () => import("./detail-be331a1e.js"), "../addon/vipcard/views/technician/list.vue": () => import("./list-3863697e.js"), "../addon/vipcard/views/verify.vue": () => import("./verify-655f2c08.js") }), addonLayoutModules = /* @__PURE__ */ Object.assign({ "../addon/home_service/layout/index.vue": () => import("./index-655f2c08.js"), "../addon/o2o/layout/index.vue": () => import("./index-6a0ca7ec.js"), "../addon/shop/layout/index.vue": () => import("./index-7ac972e3.js"), "../addon/tourism/layout/index.vue": () => import("./index-24ca72c5.js"), "../addon/vipcard/layout/index.vue": () => import("./index-8c10629e.js") });
async function importProdModule(i) {
  try {
    const r = await import(adminUrl((i.startsWith("./"), i)));
    return r.default ?? r;
  } catch {
    return null;
  }
}
function loadAddonView(i, s) {
  return i ? async () => {
    var r;
    if (await ensureAddonProdReady(), !isAddonInstalled(i))
      return console.error(`[loadAddonView] addon "${i}" not installed. Installed:`, getInstalledAddonKeys()), load404();
    try {
      const a = await loadAddonModule(i);
      if (!a)
        return console.error(`[loadAddonView] addon "${i}" module loaded as null/undefined`), load404();
      const d = (r = a.views) == null ? void 0 : r[s];
      if (!d) {
        const c = Object.keys(a.views || {});
        return console.error(`[loadAddonView] addon="${i}" viewPath="${s}" NOT FOUND. Available (${c.length}):`, c.slice(0, 10), c.length > 10 ? `... and ${c.length - 10} more` : ""), load404();
      }
      try {
        return await d();
      } catch (c) {
        return console.error(`[loadAddonView] addon="${i}" viewPath="${s}" loader threw:`, c), load404();
      }
    } catch (a) {
      return console.error(`[loadAddonView] addon="${i}" module import failed:`, a), load404();
    }
  } : () => load404();
}
function loadAddonComponent(i, s, r) {
  const a = `${s}/${r}`.replace(/\/+/g, "/");
  return async () => {
    if (await ensureAddonProdReady(), !isAddonInstalled(i))
      return null;
    try {
      const d = await loadAddonModule(i);
      if (!d)
        return null;
      const c = d.components;
      if (!c)
        return null;
      const l = c[a];
      return l ? await l() : null;
    } catch {
      return null;
    }
  };
}
function loadAddonLayout(i) {
  return async () => {
    var a;
    if (await ensureAddonProdReady(), !isAddonInstalled(i))
      return load404();
    const s = (a = getProdManifests()[i]) == null ? void 0 : a.layout;
    if (!s)
      return load404();
    const r = await importProdModule(s);
    return r ? { default: r } : load404();
  };
}
const coreVueModules$1 = {
  .../* @__PURE__ */ Object.assign({ "../app/components/cloud-build/index.vue": () => import("./index-96a6ebb9.js"), "../app/components/upgrade-log/index.vue": () => import("./index-15ec46f8.js"), "../app/components/upgrade/index.vue": () => import("./index-2e96eff3.js"), "../app/components/user-info-edit/index.vue": () => import("./index-bee8054b.js"), "../app/components/weappupload/index.vue": () => import("./index-5448e69b.js"), "../app/views/app/authorize.vue": () => import("./authorize-bde97c2c.js"), "../app/views/app/index.vue": () => import("./index-d5d9c3a4.js"), "../app/views/app/marketing.vue": () => import("./marketing-6b9b21dd.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-13734aef.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-f36e89ab.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-69b4b827.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-c745c4e7.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-6b1673e5.js"), "../app/views/auth/log.vue": () => import("./log-4bffb562.js"), "../app/views/auth/menu.vue": () => import("./menu-e68d3630.js"), "../app/views/auth/role.vue": () => import("./role-94ed5bbb.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-dcff8328.js"), "../app/views/auth/user.vue": () => import("./user-26d5a20e.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-d148ac73.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-87334167.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-a2388e57.js"), "../app/views/channel/app/access.vue": () => import("./access-14ea3801.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-2efbcf75.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-0e4dce73.js"), "../app/views/channel/app/config.vue": () => import("./config-a41b13be.js"), "../app/views/channel/app/version.vue": () => import("./version-299ff25a.js"), "../app/views/channel/h5/config.vue": () => import("./config-f5786c96.js"), "../app/views/channel/pc/config.vue": () => import("./config-8ac16b7f.js"), "../app/views/channel/weapp/access.vue": () => import("./access-b0aa7189.js"), "../app/views/channel/weapp/code.vue": () => import("./code-80766c19.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-57b79d46.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-0ea8c7a2.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-2347e9d8.js"), "../app/views/channel/weapp/config.vue": () => import("./config-c68730d5.js"), "../app/views/channel/weapp/course.vue": () => import("./course-3de57fc3.js"), "../app/views/channel/weapp/template.vue": () => import("./template-6b53973f.js"), "../app/views/channel/wechat/access.vue": () => import("./access-cfb75b96.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-c02b618d.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-8b1471ef.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-21fdec73.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-18b4896b.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-9454918e.js"), "../app/views/channel/wechat/config.vue": () => import("./config-ba9d1418.js"), "../app/views/channel/wechat/course.vue": () => import("./course-14211f2e.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-53ffaaa6.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-c259f740.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-eacae39a.js"), "../app/views/channel/wechat/template.vue": () => import("./template-66b54776.js"), "../app/views/dict/components/dict.vue": () => import("./dict-36b4634d.js"), "../app/views/dict/components/edit.vue": () => import("./edit-15ae0397.js"), "../app/views/dict/list.vue": () => import("./list-55104f34.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-d83eafd3.js").then((i) => i.a), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-b2988fa2.js").then((i) => i._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-a6ded40a.js").then((i) => i._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-ae2872b7.js").then((i) => i._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-5f1af6e3.js").then((i) => i._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-010fcc21.js").then((i) => i._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-86465b79.js").then((i) => i._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-e7543b53.js").then((i) => i._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-83fb1639.js").then((i) => i._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-048079f6.js").then((i) => i._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-931360e1.js").then((i) => i._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-ccdf1429.js").then((i) => i._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-b0951e36.js").then((i) => i._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-b9c89ea2.js").then((i) => i._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-86bd790d.js").then((i) => i._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-ce21a969.js").then((i) => i._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-c37e945f.js").then((i) => i._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-fabc77a4.js").then((i) => i.a), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-ee178148.js").then((i) => i._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-5cd6b9d9.js").then((i) => i._), "../app/views/diy/edit.vue": () => import("./edit-ca7427af.js"), "../app/views/diy/index.vue": () => import("./index-faced983.js"), "../app/views/diy/list.vue": () => import("./list-585ba349.js"), "../app/views/diy/member.vue": () => import("./member-bd341c2e.js"), "../app/views/diy/route.vue": () => import("./route-740563e8.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-a11398e7.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-30e46e81.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-e980658f.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-e9536fe1.js").then((i) => i._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-4dba6b08.js").then((i) => i._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-75dcd922.js").then((i) => i._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-fa3cea1a.js").then((i) => i._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-32a586d6.js").then((i) => i._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-b09a7756.js").then((i) => i._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-4ae5642f.js").then((i) => i._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-8976ef14.js").then((i) => i._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-a76d05fe.js").then((i) => i._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-9662b4f9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-8bed39b9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-732c22ae.js").then((i) => i._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-08087fef.js").then((i) => i._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-0e94d3b9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-4003e67e.js").then((i) => i._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-8e9e8800.js").then((i) => i._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-658fdd3b.js").then((i) => i._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-74839b43.js").then((i) => i._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-6ba377f7.js").then((i) => i._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-18eda35c.js").then((i) => i._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-8fe9ba64.js").then((i) => i._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-4eec9aa7.js").then((i) => i._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-bc5e6fda.js").then((i) => i._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-6e2d0ec4.js").then((i) => i._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-1f350ff8.js").then((i) => i._), "../app/views/diy_form/edit.vue": () => import("./edit-c8a036dc.js"), "../app/views/diy_form/list.vue": () => import("./list-966602fc.js"), "../app/views/diy_form/records.vue": () => import("./records-8f243b23.js"), "../app/views/error/404.vue": () => import("./404-e379a604.js"), "../app/views/finance/account.vue": () => import("./account-cbf8004a.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-5ac2ea47.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-0bef3f0d.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-14b044be.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-425df799.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-e6242919.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-2842b8ed.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-8b680bf0.js"), "../app/views/home/index.vue": () => import("./index-0503d1d1.js"), "../app/views/home/personal.vue": () => import("./personal-01bda0ca.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-7f0169b7.js"), "../app/views/index/index.vue": () => import("./index-6f5bc254.js"), "../app/views/index/preview.vue": () => import("./preview-27b18431.js"), "../app/views/index/store.vue": () => import("./store-1952d263.js"), "../app/views/index/tools.vue": () => import("./tools-bbd7f848.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-e159b9b3.js"), "../app/views/login/index.vue": () => import("./index-d0523190.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-746d5251.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-f1c10a60.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-7501acf2.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-255dc40c.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-9b2240da.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-cc7630a4.js"), "../app/views/marketing/verify.vue": () => import("./verify-70dd1962.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-61945735.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-d701b2d9.js"), "../app/views/member/balance.vue": () => import("./balance-b0327ee2.js"), "../app/views/member/commission.vue": () => import("./commission-0801b9dc.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-3f11b78b.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-0357fe22.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-64dbb8ab.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-f229e3fc.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-59cb6d90.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-9a3ead44.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-7afcd06b.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-16492aab.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-11d84a0d.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-43f2101d.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-992c7e1c.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-d53ad7b6.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-fef1b132.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-34385148.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-88e710b8.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-1b1dfca3.js"), "../app/views/member/growth.vue": () => import("./growth-b3c10897.js"), "../app/views/member/label.vue": () => import("./label-52c93bfe.js"), "../app/views/member/level.vue": () => import("./level-b6733396.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-c05fc124.js"), "../app/views/member/member.vue": () => import("./member-bc64f202.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-66d19bf6.js"), "../app/views/member/point.vue": () => import("./point-751ec6cf.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-838603a5.js").then((i) => i._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-84e09edb.js").then((i) => i._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-41bc1682.js").then((i) => i._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-58065962.js").then((i) => i._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-1dd780c7.js").then((i) => i._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-3ee4f4a0.js").then((i) => i._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-297c2f61.js").then((i) => i._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-f346cd75.js").then((i) => i._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-3719160d.js").then((i) => i._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-c5c041ae.js").then((i) => i._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-e04e33e5.js").then((i) => i._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-d29b4f74.js").then((i) => i._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-6e2fcfdd.js").then((i) => i._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-03e24634.js").then((i) => i._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-6a3056b6.js").then((i) => i._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-c1939f95.js").then((i) => i._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-8c0eb047.js").then((i) => i._), "../app/views/poster/edit.vue": () => import("./edit-15fbc767.js"), "../app/views/poster/list.vue": () => import("./list-4f91267f.js"), "../app/views/printer/edit.vue": () => import("./edit-bd4efedf.js"), "../app/views/printer/list.vue": () => import("./list-d2f8098d.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-5bae101d.js"), "../app/views/printer/template_list.vue": () => import("./template_list-b43025b7.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-9c5acac1.js"), "../app/views/setting/agreement.vue": () => import("./agreement-0edec799.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-a23c342d.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-72c61356.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-295b7bf7.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-2ab8382f.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-15726b29.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-9aa6e8b4.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-3fdfb11f.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-bafdc9c8.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-9958b726.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-7f2e6bde.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-fe3d49dd.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-81cfc47e.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-864d2cac.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-aea24cdb.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-1dbe4bfd.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-76dac807.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-ace14169.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-91a2821e.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-c38c4b4b.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-970e8134.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-2dcaddc1.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-9b787def.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-c7a28d84.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-3059b011.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-44e8c284.js"), "../app/views/setting/copyright.vue": () => import("./copyright-0d6cbcb1.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-52ce01d2.js"), "../app/views/setting/export.vue": () => import("./export-0c2104fa.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-a983227f.js"), "../app/views/setting/layout.vue": () => import("./layout-00e1f747.js"), "../app/views/setting/login.vue": () => import("./login-e22b0b27.js"), "../app/views/setting/map.vue": () => import("./map-c1cc20eb.js"), "../app/views/setting/member.vue": () => import("./member-3f2997c0.js"), "../app/views/setting/notice.vue": () => import("./notice-4adacc6b.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-3545f181.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-9a52b2f7.js"), "../app/views/setting/pay.vue": () => import("./pay-1fb876e3.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-5151996e.js"), "../app/views/setting/sms.vue": () => import("./sms-6695f5ba.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-8b71c624.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-a5049e7b.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-57d21bc5.js"), "../app/views/setting/storage.vue": () => import("./storage-566fdaa3.js"), "../app/views/setting/system.vue": () => import("./system-af7e6bbf.js"), "../app/views/setting/transfer.vue": () => import("./transfer-64fd4e33.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-90b42d80.js"), "../app/views/setting/weapp.vue": () => import("./weapp-365a9a72.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-4e5e3494.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-bbe872fe.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-cbf80b46.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-4e5c4664.js"), "../app/views/site/group.vue": () => import("./group-be681254.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-ff653579.js"), "../app/views/site/info.vue": () => import("./info-4502cd2c.js"), "../app/views/site/list.vue": () => import("./list-38a59757.js"), "../app/views/site/manage.vue": () => import("./manage-0165c8fa.js"), "../app/views/site/user.vue": () => import("./user-5a92aee2.js"), "../app/views/site/user_info.vue": () => import("./user_info-75079a01.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-85f4964b.js"), "../app/views/tools/addon/index.vue": () => import("./index-d4d84ebd.js"), "../app/views/tools/addon/list.vue": () => import("./list-4ed7b75c.js"), "../app/views/tools/attachment.vue": () => import("./attachment-a0247ce4.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-fa875514.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-4f27034b.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-cd17f4cc.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-5aa1d135.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-c8a064b8.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-bcfffb44.js"), "../app/views/tools/code/edit.vue": () => import("./edit-cd43246c.js"), "../app/views/tools/code/index.vue": () => import("./index-43b589fc.js"), "../app/views/tools/code/list.vue": () => import("./list-b4a1a0b2.js"), "../app/views/tools/detection.vue": () => import("./detection-1d04fa5d.js"), "../app/views/tools/schedule.vue": () => import("./schedule-e45718de.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-60f7802e.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-87eb80a4.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-87297543.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-fd26a1cf.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-07b82208.js") }),
  .../* @__PURE__ */ Object.assign({ "../components/diy-link/index.vue": () => import("./index-d117e12e.js"), "../components/diy-page/index.vue": () => Promise.resolve().then(() => index$4), "../components/editor/index.vue": () => Promise.resolve().then(() => index), "../components/export-sure/index.vue": () => import("./index-bf0959e6.js"), "../components/heat-map/index.vue": () => import("./index-8f1ab446.js"), "../components/icon/index.vue": () => import("./index-9c1a7b4f.js"), "../components/map-selector/index.vue": () => Promise.resolve().then(() => index$2), "../components/markdown/index.vue": () => import("./index-ab68dd3b.js"), "../components/popover-input/index.vue": () => import("./index-843b75c5.js"), "../components/range-input/index.vue": () => import("./index-6f9975ac.js"), "../components/select-area/index.vue": () => import("./index-217e235d.js"), "../components/select-icon/index.vue": () => import("./index-7c5336f9.js"), "../components/spread-popup/index.vue": () => import("./index-4d083642.js"), "../components/upload-attachment/attachment.vue": () => import("./attachment-353e9e78.js"), "../components/upload-attachment/index.vue": () => import("./index-243c86fe.js"), "../components/upload-audio/index.vue": () => import("./index-62ffa757.js"), "../components/upload-file/index.vue": () => import("./index-9ab57948.js"), "../components/upload-image/index.vue": () => Promise.resolve().then(() => index$6), "../components/upload-video/index.vue": () => import("./index-d3250e42.js"), "../components/verifition/Verify.vue": () => import("./Verify-334189a4.js"), "../components/verifition/Verify/VerifyPoints.vue": () => import("./VerifyPoints-1312c629.js"), "../components/verifition/Verify/VerifySlide.vue": () => import("./VerifySlide-c25de506.js"), "../components/video-player/index.vue": () => import("./index-2ea3bff9.js") }),
  .../* @__PURE__ */ Object.assign({ "../layout/admin/components/aside/index.vue": () => import("./index-153214e2.js"), "../layout/admin/components/aside/menu-item.vue": () => import("./menu-item-0bff585b.js"), "../layout/admin/components/aside/side.vue": () => import("./side-f011a4fc.js"), "../layout/admin/components/header/index.vue": () => import("./index-37acc08a.js"), "../layout/admin/components/header/layout-setting.vue": () => import("./layout-setting-4a3ea8fc.js"), "../layout/admin/components/header/message.vue": () => import("./message-863df290.js"), "../layout/admin/components/header/switch-lang.vue": () => import("./switch-lang-56e993a6.js"), "../layout/admin/components/header/user-info.vue": () => import("./user-info-27acc457.js"), "../layout/admin/components/tabs.vue": () => import("./tabs-317e9aff.js"), "../layout/admin/index.vue": () => import("./index-a54e3921.js"), "../layout/admin_simplicity/components/aside/index.vue": () => import("./index-1d745d21.js"), "../layout/admin_simplicity/components/aside/menu-item.vue": () => import("./menu-item-3bd75c30.js"), "../layout/admin_simplicity/components/aside/side.vue": () => import("./side-9f780565.js"), "../layout/admin_simplicity/components/header/index.vue": () => import("./index-b84532fd.js"), "../layout/admin_simplicity/components/header/layout-setting.vue": () => import("./layout-setting-52b15782.js"), "../layout/admin_simplicity/components/header/message.vue": () => import("./message-ff91082d.js"), "../layout/admin_simplicity/components/header/switch-lang.vue": () => import("./switch-lang-23f64991.js"), "../layout/admin_simplicity/components/header/user-info.vue": () => import("./user-info-ba5e32ce.js"), "../layout/admin_simplicity/components/tabs.vue": () => import("./tabs-8573578d.js"), "../layout/admin_simplicity/index.vue": () => import("./index-b1c3c45d.js"), "../layout/bussiness/components/aside/index.vue": () => import("./index-30536dc3.js"), "../layout/bussiness/components/aside/menu-item.vue": () => import("./menu-item-bf890c1d.js"), "../layout/bussiness/components/aside/side.vue": () => import("./side-1e422913.js"), "../layout/bussiness/components/header/index.vue": () => import("./index-c6f38a9b.js"), "../layout/bussiness/components/header/layout-setting.vue": () => import("./layout-setting-d54d6cef.js"), "../layout/bussiness/components/header/switch-lang.vue": () => import("./switch-lang-b7ea3ed2.js"), "../layout/bussiness/components/header/user-info.vue": () => import("./user-info-f7c81469.js"), "../layout/bussiness/components/tabs.vue": () => import("./tabs-3079b125.js"), "../layout/bussiness/index.vue": () => import("./index-9b8d140e.js"), "../layout/darkside/components/aside/index.vue": () => import("./index-958215d3.js"), "../layout/darkside/components/aside/menu-item.vue": () => import("./menu-item-2c356df2.js"), "../layout/darkside/components/aside/side.vue": () => import("./side-f9944a77.js"), "../layout/darkside/components/header/index.vue": () => import("./index-1af1e604.js"), "../layout/darkside/components/header/layout-setting.vue": () => import("./layout-setting-294adceb.js"), "../layout/darkside/components/header/switch-lang.vue": () => import("./switch-lang-7a33bc5e.js"), "../layout/darkside/components/header/user-info.vue": () => import("./user-info-b23d90de.js"), "../layout/darkside/components/tabs.vue": () => import("./tabs-cc46b959.js"), "../layout/darkside/index.vue": () => import("./index-497427da.js"), "../layout/decorate/index.vue": () => Promise.resolve().then(() => index$8), "../layout/default/components/aside/index.vue": () => import("./index-cc576981.js"), "../layout/default/components/aside/menu-item.vue": () => import("./menu-item-a7faeafa.js"), "../layout/default/components/aside/side.vue": () => import("./side-5cce3f3c.js"), "../layout/default/components/header/index.vue": () => import("./index-5736e615.js"), "../layout/default/components/header/layout-setting.vue": () => import("./layout-setting-52f5dd48.js"), "../layout/default/components/header/switch-lang.vue": () => import("./switch-lang-00b620fa.js"), "../layout/default/components/header/user-info.vue": () => import("./user-info-baeb24f4.js"), "../layout/default/components/tabs.vue": () => import("./tabs-521a0081.js"), "../layout/default/index.vue": () => import("./index-540169a0.js"), "../layout/index.vue": () => Promise.resolve().then(() => index$9), "../layout/lightside/components/aside/index.vue": () => import("./index-41a66a2a.js"), "../layout/lightside/components/aside/menu-item.vue": () => import("./menu-item-5129d607.js"), "../layout/lightside/components/aside/side.vue": () => import("./side-f450d6b6.js"), "../layout/lightside/components/header/index.vue": () => import("./index-01f10721.js"), "../layout/lightside/components/header/layout-setting.vue": () => import("./layout-setting-e906f404.js"), "../layout/lightside/components/header/switch-lang.vue": () => import("./switch-lang-cdb63ada.js"), "../layout/lightside/components/header/user-info.vue": () => import("./user-info-417d863a.js"), "../layout/lightside/components/tabs.vue": () => import("./tabs-a49fa914.js"), "../layout/lightside/index.vue": () => import("./index-d6be7947.js"), "../layout/profession/components/aside/index.vue": () => import("./index-0f334d00.js"), "../layout/profession/components/aside/menu-item.vue": () => import("./menu-item-30d2251e.js"), "../layout/profession/components/aside/side.vue": () => import("./side-6a41b361.js"), "../layout/profession/components/header/index.vue": () => import("./index-69ff447b.js"), "../layout/profession/components/header/layout-setting.vue": () => import("./layout-setting-de17f77a.js"), "../layout/profession/components/header/switch-lang.vue": () => import("./switch-lang-fde7614e.js"), "../layout/profession/components/header/user-info.vue": () => import("./user-info-b318852f.js"), "../layout/profession/components/tabs.vue": () => import("./tabs-e2a3657d.js"), "../layout/profession/index.vue": () => import("./index-bd748d3a.js"), "../layout/routine/components/aside/index.vue": () => import("./index-55e507bf.js"), "../layout/routine/components/aside/menu-item.vue": () => import("./menu-item-b88fc1f3.js"), "../layout/routine/components/aside/side.vue": () => import("./side-8f7bcbb1.js"), "../layout/routine/components/header/index.vue": () => import("./index-70d9690a.js"), "../layout/routine/components/header/layout-setting.vue": () => import("./layout-setting-ee221261.js"), "../layout/routine/components/header/switch-lang.vue": () => import("./switch-lang-511be1b1.js"), "../layout/routine/components/header/user-info.vue": () => import("./user-info-beb3e270.js"), "../layout/routine/components/tabs.vue": () => import("./tabs-d3b214d8.js"), "../layout/routine/index.vue": () => import("./index-6ac5a94b.js") })
};
function normalizeComponentKey$1(i) {
  return i.replace(/^@\//, "").replace(/^\/src\//, "").replace(/^\.\.\//, "").replace(/\\/g, "/");
}
function findCoreModuleLoader$1(i) {
  const s = coreVueModules$1;
  if (s[i])
    return s[i];
  const r = normalizeComponentKey$1(i), a = Object.keys(s).find((d) => normalizeComponentKey$1(d) === r || normalizeComponentKey$1(d).endsWith(`/${r}`));
  return a ? s[a] : void 0;
}
function resolveAsyncComponent$1(i) {
  return defineAsyncComponent(async () => {
    const s = findCoreModuleLoader$1(i);
    return s ? (await s()).default : (await loadCoreVueModule$1(i)).default;
  });
}
async function loadCoreVueModule$1(i) {
  const s = findCoreModuleLoader$1(i);
  if (s)
    return s();
  throw new Error(`Component not found: ${i}`);
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
    component: () => import("./404-e379a604.js")
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
      component: () => import("./index-d0523190.js")
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
      component: () => import("./index-0503d1d1.js")
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
      component: () => import("./wxoplatform_callback-e159b9b3.js")
    },
    {
      path: "login",
      meta: {
        type: 1,
        title: "用户登录"
      },
      component: () => import("./index-d0523190.js")
    }
  ]
}, DECORATE_ROUTER = {
  path: "/decorate",
  component: Decorate,
  name: "decorate",
  children: []
}, modules = /* @__PURE__ */ Object.assign({ "../app/views/app/authorize.vue": () => import("./authorize-bde97c2c.js"), "../app/views/app/index.vue": () => import("./index-d5d9c3a4.js"), "../app/views/app/marketing.vue": () => import("./marketing-6b9b21dd.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-13734aef.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-f36e89ab.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-69b4b827.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-c745c4e7.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-6b1673e5.js"), "../app/views/auth/log.vue": () => import("./log-4bffb562.js"), "../app/views/auth/menu.vue": () => import("./menu-e68d3630.js"), "../app/views/auth/role.vue": () => import("./role-94ed5bbb.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-dcff8328.js"), "../app/views/auth/user.vue": () => import("./user-26d5a20e.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-d148ac73.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-87334167.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-a2388e57.js"), "../app/views/channel/app/access.vue": () => import("./access-14ea3801.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-2efbcf75.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-0e4dce73.js"), "../app/views/channel/app/config.vue": () => import("./config-a41b13be.js"), "../app/views/channel/app/version.vue": () => import("./version-299ff25a.js"), "../app/views/channel/h5/config.vue": () => import("./config-f5786c96.js"), "../app/views/channel/pc/config.vue": () => import("./config-8ac16b7f.js"), "../app/views/channel/weapp/access.vue": () => import("./access-b0aa7189.js"), "../app/views/channel/weapp/code.vue": () => import("./code-80766c19.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-57b79d46.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-0ea8c7a2.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-2347e9d8.js"), "../app/views/channel/weapp/config.vue": () => import("./config-c68730d5.js"), "../app/views/channel/weapp/course.vue": () => import("./course-3de57fc3.js"), "../app/views/channel/weapp/template.vue": () => import("./template-6b53973f.js"), "../app/views/channel/wechat/access.vue": () => import("./access-cfb75b96.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-c02b618d.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-8b1471ef.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-21fdec73.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-18b4896b.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-9454918e.js"), "../app/views/channel/wechat/config.vue": () => import("./config-ba9d1418.js"), "../app/views/channel/wechat/course.vue": () => import("./course-14211f2e.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-53ffaaa6.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-c259f740.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-eacae39a.js"), "../app/views/channel/wechat/template.vue": () => import("./template-66b54776.js"), "../app/views/dict/components/dict.vue": () => import("./dict-36b4634d.js"), "../app/views/dict/components/edit.vue": () => import("./edit-15ae0397.js"), "../app/views/dict/list.vue": () => import("./list-55104f34.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-d83eafd3.js").then((i) => i.a), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-b2988fa2.js").then((i) => i._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-a6ded40a.js").then((i) => i._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-ae2872b7.js").then((i) => i._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-5f1af6e3.js").then((i) => i._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-010fcc21.js").then((i) => i._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-86465b79.js").then((i) => i._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-e7543b53.js").then((i) => i._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-83fb1639.js").then((i) => i._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-048079f6.js").then((i) => i._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-931360e1.js").then((i) => i._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-ccdf1429.js").then((i) => i._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-b0951e36.js").then((i) => i._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-b9c89ea2.js").then((i) => i._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-86bd790d.js").then((i) => i._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-ce21a969.js").then((i) => i._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-c37e945f.js").then((i) => i._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-fabc77a4.js").then((i) => i.a), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-ee178148.js").then((i) => i._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-5cd6b9d9.js").then((i) => i._), "../app/views/diy/edit.vue": () => import("./edit-ca7427af.js"), "../app/views/diy/index.vue": () => import("./index-faced983.js"), "../app/views/diy/list.vue": () => import("./list-585ba349.js"), "../app/views/diy/member.vue": () => import("./member-bd341c2e.js"), "../app/views/diy/route.vue": () => import("./route-740563e8.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-a11398e7.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-30e46e81.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-e980658f.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-e9536fe1.js").then((i) => i._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-4dba6b08.js").then((i) => i._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-75dcd922.js").then((i) => i._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-fa3cea1a.js").then((i) => i._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-32a586d6.js").then((i) => i._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-b09a7756.js").then((i) => i._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-4ae5642f.js").then((i) => i._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-8976ef14.js").then((i) => i._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-a76d05fe.js").then((i) => i._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-9662b4f9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-8bed39b9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-732c22ae.js").then((i) => i._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-08087fef.js").then((i) => i._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-0e94d3b9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-4003e67e.js").then((i) => i._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-8e9e8800.js").then((i) => i._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-658fdd3b.js").then((i) => i._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-74839b43.js").then((i) => i._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-6ba377f7.js").then((i) => i._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-18eda35c.js").then((i) => i._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-8fe9ba64.js").then((i) => i._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-4eec9aa7.js").then((i) => i._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-bc5e6fda.js").then((i) => i._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-6e2d0ec4.js").then((i) => i._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-1f350ff8.js").then((i) => i._), "../app/views/diy_form/edit.vue": () => import("./edit-c8a036dc.js"), "../app/views/diy_form/list.vue": () => import("./list-966602fc.js"), "../app/views/diy_form/records.vue": () => import("./records-8f243b23.js"), "../app/views/error/404.vue": () => import("./404-e379a604.js"), "../app/views/finance/account.vue": () => import("./account-cbf8004a.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-5ac2ea47.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-0bef3f0d.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-14b044be.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-425df799.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-e6242919.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-2842b8ed.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-8b680bf0.js"), "../app/views/home/index.vue": () => import("./index-0503d1d1.js"), "../app/views/home/personal.vue": () => import("./personal-01bda0ca.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-7f0169b7.js"), "../app/views/index/index.vue": () => import("./index-6f5bc254.js"), "../app/views/index/preview.vue": () => import("./preview-27b18431.js"), "../app/views/index/store.vue": () => import("./store-1952d263.js"), "../app/views/index/tools.vue": () => import("./tools-bbd7f848.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-e159b9b3.js"), "../app/views/login/index.vue": () => import("./index-d0523190.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-746d5251.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-f1c10a60.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-7501acf2.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-255dc40c.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-9b2240da.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-cc7630a4.js"), "../app/views/marketing/verify.vue": () => import("./verify-70dd1962.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-61945735.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-d701b2d9.js"), "../app/views/member/balance.vue": () => import("./balance-b0327ee2.js"), "../app/views/member/commission.vue": () => import("./commission-0801b9dc.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-3f11b78b.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-0357fe22.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-64dbb8ab.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-f229e3fc.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-59cb6d90.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-9a3ead44.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-7afcd06b.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-16492aab.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-11d84a0d.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-43f2101d.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-992c7e1c.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-d53ad7b6.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-fef1b132.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-34385148.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-88e710b8.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-1b1dfca3.js"), "../app/views/member/growth.vue": () => import("./growth-b3c10897.js"), "../app/views/member/label.vue": () => import("./label-52c93bfe.js"), "../app/views/member/level.vue": () => import("./level-b6733396.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-c05fc124.js"), "../app/views/member/member.vue": () => import("./member-bc64f202.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-66d19bf6.js"), "../app/views/member/point.vue": () => import("./point-751ec6cf.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-838603a5.js").then((i) => i._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-84e09edb.js").then((i) => i._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-41bc1682.js").then((i) => i._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-58065962.js").then((i) => i._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-1dd780c7.js").then((i) => i._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-3ee4f4a0.js").then((i) => i._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-297c2f61.js").then((i) => i._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-f346cd75.js").then((i) => i._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-3719160d.js").then((i) => i._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-c5c041ae.js").then((i) => i._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-e04e33e5.js").then((i) => i._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-d29b4f74.js").then((i) => i._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-6e2fcfdd.js").then((i) => i._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-03e24634.js").then((i) => i._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-6a3056b6.js").then((i) => i._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-c1939f95.js").then((i) => i._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-8c0eb047.js").then((i) => i._), "../app/views/poster/edit.vue": () => import("./edit-15fbc767.js"), "../app/views/poster/list.vue": () => import("./list-4f91267f.js"), "../app/views/printer/edit.vue": () => import("./edit-bd4efedf.js"), "../app/views/printer/list.vue": () => import("./list-d2f8098d.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-5bae101d.js"), "../app/views/printer/template_list.vue": () => import("./template_list-b43025b7.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-9c5acac1.js"), "../app/views/setting/agreement.vue": () => import("./agreement-0edec799.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-a23c342d.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-72c61356.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-295b7bf7.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-2ab8382f.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-15726b29.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-9aa6e8b4.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-3fdfb11f.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-bafdc9c8.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-9958b726.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-7f2e6bde.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-fe3d49dd.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-81cfc47e.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-864d2cac.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-aea24cdb.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-1dbe4bfd.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-76dac807.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-ace14169.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-91a2821e.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-c38c4b4b.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-970e8134.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-2dcaddc1.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-9b787def.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-c7a28d84.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-3059b011.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-44e8c284.js"), "../app/views/setting/copyright.vue": () => import("./copyright-0d6cbcb1.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-52ce01d2.js"), "../app/views/setting/export.vue": () => import("./export-0c2104fa.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-a983227f.js"), "../app/views/setting/layout.vue": () => import("./layout-00e1f747.js"), "../app/views/setting/login.vue": () => import("./login-e22b0b27.js"), "../app/views/setting/map.vue": () => import("./map-c1cc20eb.js"), "../app/views/setting/member.vue": () => import("./member-3f2997c0.js"), "../app/views/setting/notice.vue": () => import("./notice-4adacc6b.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-3545f181.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-9a52b2f7.js"), "../app/views/setting/pay.vue": () => import("./pay-1fb876e3.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-5151996e.js"), "../app/views/setting/sms.vue": () => import("./sms-6695f5ba.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-8b71c624.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-a5049e7b.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-57d21bc5.js"), "../app/views/setting/storage.vue": () => import("./storage-566fdaa3.js"), "../app/views/setting/system.vue": () => import("./system-af7e6bbf.js"), "../app/views/setting/transfer.vue": () => import("./transfer-64fd4e33.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-90b42d80.js"), "../app/views/setting/weapp.vue": () => import("./weapp-365a9a72.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-4e5e3494.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-bbe872fe.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-cbf80b46.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-4e5c4664.js"), "../app/views/site/group.vue": () => import("./group-be681254.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-ff653579.js"), "../app/views/site/info.vue": () => import("./info-4502cd2c.js"), "../app/views/site/list.vue": () => import("./list-38a59757.js"), "../app/views/site/manage.vue": () => import("./manage-0165c8fa.js"), "../app/views/site/user.vue": () => import("./user-5a92aee2.js"), "../app/views/site/user_info.vue": () => import("./user_info-75079a01.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-85f4964b.js"), "../app/views/tools/addon/index.vue": () => import("./index-d4d84ebd.js"), "../app/views/tools/addon/list.vue": () => import("./list-4ed7b75c.js"), "../app/views/tools/attachment.vue": () => import("./attachment-a0247ce4.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-fa875514.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-4f27034b.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-cd17f4cc.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-5aa1d135.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-c8a064b8.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-bcfffb44.js"), "../app/views/tools/code/edit.vue": () => import("./edit-cd43246c.js"), "../app/views/tools/code/index.vue": () => import("./index-43b589fc.js"), "../app/views/tools/code/list.vue": () => import("./list-b4a1a0b2.js"), "../app/views/tools/detection.vue": () => import("./detection-1d04fa5d.js"), "../app/views/tools/schedule.vue": () => import("./schedule-e45718de.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-60f7802e.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-87eb80a4.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-87297543.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-fd26a1cf.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-07b82208.js") }), addonModules = /* @__PURE__ */ Object.assign({ "../addon/cms/views/article/category.vue": () => import("./category-1ad78c96.js"), "../addon/cms/views/article/components/edit-category.vue": () => import("./edit-category-6a0ca7ec.js"), "../addon/cms/views/article/edit.vue": () => import("./edit-062c26e9.js"), "../addon/cms/views/article/list.vue": () => import("./list-bb70d698.js"), "../addon/cms/views/diy/components/edit-article.vue": () => import("./edit-article-9ffb527f.js").then((i) => i._), "../addon/erp/views/purchase/detail.vue": () => import("./detail-821a9dcd.js"), "../addon/erp/views/purchase/instock.vue": () => import("./instock-19825e3d.js"), "../addon/erp/views/purchase/list.vue": () => import("./list-5afdbe73.js"), "../addon/erp/views/sales/detail.vue": () => import("./detail-557d388b.js"), "../addon/erp/views/sales/list.vue": () => import("./list-8331b225.js"), "../addon/erp/views/sales/outstock.vue": () => import("./outstock-ee3e45f4.js"), "../addon/erp/views/stock/detail.vue": () => import("./detail-aae3e67a.js"), "../addon/erp/views/stock/list.vue": () => import("./list-fb6539a8.js"), "../addon/erp/views/stock/stockIn.vue": () => import("./stockIn-e3bdb257.js"), "../addon/erp/views/stock/stockOut.vue": () => import("./stockOut-890ef8a8.js"), "../addon/friend_help/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-655f2c08.js"), "../addon/friend_help/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-3c82f3af.js"), "../addon/friend_help/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-b9312078.js"), "../addon/friend_help/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-655f2c08.js"), "../addon/friend_help/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-264d5f02.js"), "../addon/friend_help/views/active/components/goods-select-content.vue": () => import("./goods-select-content-db219848.js"), "../addon/friend_help/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-682abbfb.js"), "../addon/friend_help/views/active/components/select-member.vue": () => import("./select-member-afe1b9f0.js"), "../addon/friend_help/views/active/edit.vue": () => import("./edit-5e422f94.js"), "../addon/friend_help/views/active/list.vue": () => import("./list-ab2518bc.js"), "../addon/friend_help/views/active/stat.vue": () => import("./stat-9e6d69d7.js"), "../addon/friend_help/views/config/config.vue": () => import("./config-b0ffb798.js"), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": () => import("./edit-friend-help-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": () => import("./edit-friend-help-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": () => import("./edit-friend-help-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": () => import("./edit-friend-help-activity-goods-detail-friend-help-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": () => import("./edit-friend-help-activity-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": () => import("./edit-friend-help-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": () => import("./edit-friend-help-activity-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": () => import("./edit-friend-help-carousel-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": () => import("./edit-friend-help-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": () => import("./edit-friend-help-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": () => import("./edit-friend-help-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": () => import("./edit-friend-help-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": () => import("./edit-friend-help-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": () => import("./edit-friend-help-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-hot.vue": () => import("./edit-friend-help-hot-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-list.vue": () => import("./edit-friend-help-list-472311e7.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": () => import("./edit-friend-help-member-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": () => import("./edit-friend-help-order-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/launch/components/launch-detail-popup.vue": () => import("./launch-detail-popup-655f2c08.js"), "../addon/friend_help/views/launch/list.vue": () => import("./list-2f0d7313.js"), "../addon/friend_help/views/order/components/order-notes.vue": () => import("./order-notes-8c10629e.js"), "../addon/friend_help/views/order/components/refund-detail.vue": () => import("./refund-detail-a2708421.js"), "../addon/friend_help/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-7ac972e3.js"), "../addon/friend_help/views/order/detail.vue": () => import("./detail-dc207ced.js"), "../addon/friend_help/views/order/list.vue": () => import("./list-333b045e.js"), "../addon/friend_help/views/order/refund.vue": () => import("./refund-a46a02f2.js"), "../addon/friend_help/views/poster/components/edit-discount-desc.vue": () => import("./edit-discount-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-3656154e.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-3656154e.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-min-price.vue": () => import("./edit-min-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-original-desc.vue": () => import("./edit-original-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-original-price.vue": () => import("./edit-original-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-price.vue": () => import("./edit-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-discount-desc.vue": () => import("./preview-discount-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-min-price.vue": () => import("./preview-min-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-original-desc.vue": () => import("./preview-original-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-original-price.vue": () => import("./preview-original-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-price.vue": () => import("./preview-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/addclock/addclock_config.vue": () => import("./addclock_config-faf19172.js"), "../addon/higohome/views/addclock/components/addclock-config-edit.vue": () => import("./addclock-config-edit-6ec2134b.js"), "../addon/higohome/views/area/area_list.vue": () => import("./area_list-f3509cc8.js"), "../addon/higohome/views/area/components/area-list-edit.vue": () => import("./area-list-edit-7d472406.js"), "../addon/higohome/views/browe/browe.vue": () => import("./browe-46a06830.js"), "../addon/higohome/views/browe/components/browe-edit.vue": () => import("./browe-edit-a77e5444.js"), "../addon/higohome/views/call/call_config.vue": () => import("./call_config-ec7576bc.js"), "../addon/higohome/views/call/components/call-config-edit.vue": () => import("./call-config-edit-d0ac7a76.js"), "../addon/higohome/views/call/recodevoice.vue": () => import("./recodevoice-dea8146b.js"), "../addon/higohome/views/call/recodevoice_edit.vue": () => import("./recodevoice_edit-655f2c08.js"), "../addon/higohome/views/cash/cash_out.vue": () => import("./cash_out-04b2d10a.js"), "../addon/higohome/views/cash/components/cash-out-edit.vue": () => import("./cash-out-edit-cfad1f13.js"), "../addon/higohome/views/channels/channel_codes.vue": () => import("./channel_codes-9051719d.js"), "../addon/higohome/views/channels/channel_wallet.vue": () => import("./channel_wallet-42fbe04a.js"), "../addon/higohome/views/channels/channels_cate.vue": () => import("./channels_cate-bcbb2ceb.js"), "../addon/higohome/views/channels/channels_list.vue": () => import("./channels_list-7b1a979a.js"), "../addon/higohome/views/channels/channels_set.vue": () => import("./channels_set-e5af7114.js"), "../addon/higohome/views/channels/components/channel-codes-edit.vue": () => import("./channel-codes-edit-94c56849.js"), "../addon/higohome/views/channels/components/channel-wallet-edit.vue": () => import("./channel-wallet-edit-bee8c6df.js"), "../addon/higohome/views/channels/components/channels-cate-edit.vue": () => import("./channels-cate-edit-b267dbdd.js"), "../addon/higohome/views/channels/components/channels-set-edit.vue": () => import("./channels-set-edit-425cca75.js"), "../addon/higohome/views/channels/components/channesl-list-edit.vue": () => import("./channesl-list-edit-778f9dd7.js"), "../addon/higohome/views/city/city_list.vue": () => import("./city_list-a8df6ae5.js"), "../addon/higohome/views/city/components/city-list-edit.vue": () => import("./city-list-edit-178da71c.js"), "../addon/higohome/views/comment/comment_label.vue": () => import("./comment_label-0e8edc11.js"), "../addon/higohome/views/comment/components/comment-label-edit.vue": () => import("./comment-label-edit-955803ef.js"), "../addon/higohome/views/comment/components/technician-comment-edit.vue": () => import("./technician-comment-edit-c3807fe3.js"), "../addon/higohome/views/comment/technician_comment.vue": () => import("./technician_comment-aabfe78b.js"), "../addon/higohome/views/commission/commission_salesman.vue": () => import("./commission_salesman-06237c49.js"), "../addon/higohome/views/commission/components/commission-salesman-edit.vue": () => import("./commission-salesman-edit-147aa26a.js"), "../addon/higohome/views/common/common.vue": () => import("./common-1445c036.js"), "../addon/higohome/views/common/good-cate.vue": () => import("./good-cate-a256533f.js"), "../addon/higohome/views/common/member.vue": () => import("./member-655f2c08.js"), "../addon/higohome/views/common/select-goods-pop.vue": () => import("./select-goods-pop-655f2c08.js"), "../addon/higohome/views/config/components/order-config-edit.vue": () => import("./order-config-edit-a9ca7c1f.js"), "../addon/higohome/views/config/fenxiao.vue": () => import("./fenxiao-655f2c08.js"), "../addon/higohome/views/config/order_config.vue": () => import("./order_config-d4a02654.js"), "../addon/higohome/views/coupon/coupon.vue": () => import("./coupon-addae295.js"), "../addon/higohome/views/coupon/coupon_edit.vue": () => import("./coupon_edit-f4935af0.js"), "../addon/higohome/views/distribution/components/distribution-config-edit.vue": () => import("./distribution-config-edit-6052f8a5.js"), "../addon/higohome/views/distribution/components/distribution-list-edit.vue": () => import("./distribution-list-edit-7b733135.js"), "../addon/higohome/views/distribution/components/distribution-partner-wallet-edit.vue": () => import("./distribution-partner-wallet-edit-0cbdb704.js"), "../addon/higohome/views/distribution/distribution_config.vue": () => import("./distribution_config-2436c50c.js"), "../addon/higohome/views/distribution/distribution_list.vue": () => import("./distribution_list-12c00970.js"), "../addon/higohome/views/distribution/distribution_partner.vue": () => import("./distribution_partner-2d744107.js"), "../addon/higohome/views/distribution/distribution_partner_wallet.vue": () => import("./distribution_partner_wallet-9ecf2e9c.js"), "../addon/higohome/views/diy/components/edit-agent-register.vue": () => import("./edit-agent-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-any-form.vue": () => import("./edit-any-form-1234aef5.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-carousel-loction.vue": () => import("./edit-carousel-loction-5c382abe.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-category-index.vue": () => import("./edit-category-index-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-channel-register.vue": () => import("./edit-channel-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-distribution-register.vue": () => import("./edit-distribution-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-good-big-list.vue": () => import("./edit-good-big-list-c2263a2f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-goods-index.vue": () => import("./edit-goods-index-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-items-list-two.vue": () => import("./edit-items-list-two-ef6c49eb.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-items-list.vue": () => import("./edit-items-list-3a182c66.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-play-video.vue": () => import("./edit-play-video-8d4682b8.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-recommend-tech.vue": () => import("./edit-recommend-tech-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-salesman-register.vue": () => import("./edit-salesman-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-service-tools.vue": () => import("./edit-service-tools-644878e8.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-specials-list.vue": () => import("./edit-specials-list-587829f2.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-store-register.vue": () => import("./edit-store-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-data.vue": () => import("./edit-technician-data-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-info.vue": () => import("./edit-technician-info-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-order.vue": () => import("./edit-technician-order-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-register.vue": () => import("./edit-technician-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-tools.vue": () => import("./edit-technician-tools-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technicican-list.vue": () => import("./edit-technicican-list-9ffb527f.js").then((i) => i._), "../addon/higohome/views/dynamic/components/dynamic-comment-edit.vue": () => import("./dynamic-comment-edit-01e606f3.js"), "../addon/higohome/views/dynamic/components/dynamic-config-edit.vue": () => import("./dynamic-config-edit-52032320.js"), "../addon/higohome/views/dynamic/components/dynamic-edit.vue": () => import("./dynamic-edit-f29f7b84.js"), "../addon/higohome/views/dynamic/dynamic.vue": () => import("./dynamic-b97b9bae.js"), "../addon/higohome/views/dynamic/dynamic_comment.vue": () => import("./dynamic_comment-8daa0efc.js"), "../addon/higohome/views/dynamic/dynamic_config.vue": () => import("./dynamic_config-a415e94d.js"), "../addon/higohome/views/dynamic/rules.vue": () => import("./rules-bdd99094.js"), "../addon/higohome/views/dynamic_category/components/dynamic-category-edit.vue": () => import("./dynamic-category-edit-685c5ee7.js"), "../addon/higohome/views/dynamic_category/dynamic_category.vue": () => import("./dynamic_category-ebd53726.js"), "../addon/higohome/views/feedback/components/feedback-edit.vue": () => import("./feedback-edit-3588c7e1.js"), "../addon/higohome/views/feedback/feedback.vue": () => import("./feedback-9aa88f23.js"), "../addon/higohome/views/fenxiao/components/fenxiao-edit.vue": () => import("./fenxiao-edit-077065c7.js"), "../addon/higohome/views/fenxiao/fenxiao.vue": () => import("./fenxiao-270d3e61.js"), "../addon/higohome/views/fenxiaomember/components/fenxiaomember-edit.vue": () => import("./fenxiaomember-edit-2f4a24ab.js"), "../addon/higohome/views/fenxiaomember/fenxiaomember.vue": () => import("./fenxiaomember-d7409a14.js"), "../addon/higohome/views/fenxiaoorder/components/fenxiaoorder-edit.vue": () => import("./fenxiaoorder-edit-6d6ef189.js"), "../addon/higohome/views/fenxiaoorder/fenxiaoorder.vue": () => import("./fenxiaoorder-876909ff.js"), "../addon/higohome/views/goods/components/detailcard-edit.vue": () => import("./detailcard-edit-defab4d3.js"), "../addon/higohome/views/goods/components/goods-cate-edit.vue": () => import("./goods-cate-edit-c5e76b06.js"), "../addon/higohome/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-d3fc4164.js"), "../addon/higohome/views/goods/components/goods-tags-edit.vue": () => import("./goods-tags-edit-12c5ba4e.js"), "../addon/higohome/views/goods/detailcard.vue": () => import("./detailcard-93185a07.js"), "../addon/higohome/views/goods/goods_cate.vue": () => import("./goods_cate-a5051ad3.js"), "../addon/higohome/views/goods/goods_list.vue": () => import("./goods_list-6b73aa98.js"), "../addon/higohome/views/goods/goods_list_edit.vue": () => import("./goods_list_edit-a5822a3d.js"), "../addon/higohome/views/goods/goods_tags.vue": () => import("./goods_tags-57f8705e.js"), "../addon/higohome/views/manger/components/mobile-manger-edit.vue": () => import("./mobile-manger-edit-8f0014c6.js"), "../addon/higohome/views/manger/mobile_manger.vue": () => import("./mobile_manger-464c5076.js"), "../addon/higohome/views/message/components/message-edit.vue": () => import("./message-edit-2320b183.js"), "../addon/higohome/views/message/message.vue": () => import("./message-41b514c3.js"), "../addon/higohome/views/notice/components/notice-config-edit.vue": () => import("./notice-config-edit-5926d915.js"), "../addon/higohome/views/notice/components/notice-template-edit.vue": () => import("./notice-template-edit-a448b3d6.js"), "../addon/higohome/views/notice/notice_config.vue": () => import("./notice_config-44c28228.js"), "../addon/higohome/views/notice/notice_template.vue": () => import("./notice_template-58901487.js"), "../addon/higohome/views/order/order_detail.vue": () => import("./order_detail-539da6e2.js"), "../addon/higohome/views/order/order_dispatch.vue": () => import("./order_dispatch-58f0b9aa.js"), "../addon/higohome/views/order/order_heat.vue": () => import("./order_heat-93edee4c.js"), "../addon/higohome/views/order/ordering_notice.vue": () => import("./ordering_notice-aadc870f.js"), "../addon/higohome/views/order/orderlist.vue": () => import("./orderlist-76a35945.js"), "../addon/higohome/views/order/orderlist_edit.vue": () => import("./orderlist_edit-655f2c08.js"), "../addon/higohome/views/order/recored_manger.vue": () => import("./recored_manger-3709b3bf.js"), "../addon/higohome/views/order/recored_manger_edit.vue": () => import("./recored_manger_edit-655f2c08.js"), "../addon/higohome/views/order/selectTech.vue": () => import("./selectTech-4169d1a9.js"), "../addon/higohome/views/platform/components/platform-commission-config-edit.vue": () => import("./platform-commission-config-edit-ebfbeee8.js"), "../addon/higohome/views/platform/components/platform-commission-edit.vue": () => import("./platform-commission-edit-9034034b.js"), "../addon/higohome/views/platform/platform_commission.vue": () => import("./platform_commission-862fe329.js"), "../addon/higohome/views/platform/platform_commission_config.vue": () => import("./platform_commission_config-d078ddfa.js"), "../addon/higohome/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-3656154e.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-3656154e.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-d6db8e07.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-3656154e.js").then((i) => i._), "../addon/higohome/views/refund/components/refund-config-edit.vue": () => import("./refund-config-edit-ca441fee.js"), "../addon/higohome/views/refund/components/refund-reason-edit.vue": () => import("./refund-reason-edit-b333babe.js"), "../addon/higohome/views/refund/refund.vue": () => import("./refund-8966bcec.js"), "../addon/higohome/views/refund/refund_config.vue": () => import("./refund_config-0a1bde84.js"), "../addon/higohome/views/refund/refund_detail.vue": () => import("./refund_detail-7615db89.js"), "../addon/higohome/views/refund/refund_reason.vue": () => import("./refund_reason-38ecbd31.js"), "../addon/higohome/views/safetips/components/safetips-config-edit.vue": () => import("./safetips-config-edit-35072e71.js"), "../addon/higohome/views/safetips/safetips_config.vue": () => import("./safetips_config-fcd467c6.js"), "../addon/higohome/views/salesman/components/salesman-config-edit.vue": () => import("./salesman-config-edit-40673e08.js"), "../addon/higohome/views/salesman/components/salesman-list-edit.vue": () => import("./salesman-list-edit-19dfb30f.js"), "../addon/higohome/views/salesman/components/salesman-wallet-edit.vue": () => import("./salesman-wallet-edit-ff312938.js"), "../addon/higohome/views/salesman/salesman_config.vue": () => import("./salesman_config-7a2863b9.js"), "../addon/higohome/views/salesman/salesman_list.vue": () => import("./salesman_list-a7dc7074.js"), "../addon/higohome/views/salesman/salesman_wallet.vue": () => import("./salesman_wallet-e1db9ddb.js"), "../addon/higohome/views/shareholder/components/shareholder-config-edit.vue": () => import("./shareholder-config-edit-981805fb.js"), "../addon/higohome/views/shareholder/components/shareholder-edit.vue": () => import("./shareholder-edit-ea221b7f.js"), "../addon/higohome/views/shareholder/components/shareholder-wallet-edit.vue": () => import("./shareholder-wallet-edit-e08db6ac.js"), "../addon/higohome/views/shareholder/shareholder.vue": () => import("./shareholder-af795718.js"), "../addon/higohome/views/shareholder/shareholder_config.vue": () => import("./shareholder_config-afb1ee83.js"), "../addon/higohome/views/shareholder/shareholder_wallet.vue": () => import("./shareholder_wallet-1be1e7e9.js"), "../addon/higohome/views/smsbao/components/smsbao-config-edit.vue": () => import("./smsbao-config-edit-9b5d889a.js"), "../addon/higohome/views/smsbao/components/smsbao-message-edit.vue": () => import("./smsbao-message-edit-adeaad60.js"), "../addon/higohome/views/smsbao/smsbao_config.vue": () => import("./smsbao_config-7b49415b.js"), "../addon/higohome/views/smsbao/smsbao_message.vue": () => import("./smsbao_message-ad00ba7e.js"), "../addon/higohome/views/store/components/store-cate-edit.vue": () => import("./store-cate-edit-dd74d0f1.js"), "../addon/higohome/views/store/components/store-config-edit.vue": () => import("./store-config-edit-ebd6a356.js"), "../addon/higohome/views/store/components/store-list-edit.vue": () => import("./store-list-edit-b01a046f.js"), "../addon/higohome/views/store/components/store-wallet-edit.vue": () => import("./store-wallet-edit-add739dc.js"), "../addon/higohome/views/store/store_cate.vue": () => import("./store_cate-79a9fea0.js"), "../addon/higohome/views/store/store_config.vue": () => import("./store_config-993b3d2a.js"), "../addon/higohome/views/store/store_list.vue": () => import("./store_list-ebfc81eb.js"), "../addon/higohome/views/store/store_list_edit.vue": () => import("./store_list_edit-04632fa1.js"), "../addon/higohome/views/store/store_wallet.vue": () => import("./store_wallet-1554020f.js"), "../addon/higohome/views/technician/car_globalset.vue": () => import("./car_globalset-8359044a.js"), "../addon/higohome/views/technician/car_price.vue": () => import("./car_price-75991331.js"), "../addon/higohome/views/technician/category.vue": () => import("./category-254cfd56.js"), "../addon/higohome/views/technician/category_config.vue": () => import("./category_config-4aa5b3bc.js"), "../addon/higohome/views/technician/components/TencentMap.vue": () => import("./TencentMap-0f147363.js"), "../addon/higohome/views/technician/components/car-price-edit.vue": () => import("./car-price-edit-d91d3d8a.js"), "../addon/higohome/views/technician/components/category-edit.vue": () => import("./category-edit-ad371543.js"), "../addon/higohome/views/technician/components/police-config-edit.vue": () => import("./police-config-edit-5cfeb28f.js"), "../addon/higohome/views/technician/components/select-category-pop.vue": () => import("./select-category-pop-10bfe0d2.js"), "../addon/higohome/views/technician/components/select-technician-pop.vue": () => import("./select-technician-pop-3afe1df4.js"), "../addon/higohome/views/technician/components/technician-config-edit.vue": () => import("./technician-config-edit-0ce1da87.js"), "../addon/higohome/views/technician/components/technician-detail.vue": () => import("./technician-detail-2e3f3728.js"), "../addon/higohome/views/technician/components/technician-police-edit.vue": () => import("./technician-police-edit-6551de2c.js"), "../addon/higohome/views/technician/components/technician-tags-edit.vue": () => import("./technician-tags-edit-ca3b7c94.js"), "../addon/higohome/views/technician/components/technician-wallet-edit.vue": () => import("./technician-wallet-edit-8b2eb2b4.js"), "../addon/higohome/views/technician/config.vue": () => import("./config-e24474f6.js"), "../addon/higohome/views/technician/other_config.vue": () => import("./other_config-8dae68e7.js"), "../addon/higohome/views/technician/police_config.vue": () => import("./police_config-ac68aa9a.js"), "../addon/higohome/views/technician/technician_config.vue": () => import("./technician_config-62845598.js"), "../addon/higohome/views/technician/technician_data.vue": () => import("./technician_data-55cc7b96.js"), "../addon/higohome/views/technician/technician_data_edit.vue": () => import("./technician_data_edit-655f2c08.js"), "../addon/higohome/views/technician/technician_detail.vue": () => import("./technician_detail-92129f9a.js"), "../addon/higohome/views/technician/technician_goods.vue": () => import("./technician_goods-045ac690.js"), "../addon/higohome/views/technician/technician_goods_select.vue": () => import("./technician_goods_select-a7ae17db.js"), "../addon/higohome/views/technician/technician_list.vue": () => import("./technician_list-fc94ff5f.js"), "../addon/higohome/views/technician/technician_list_edit.vue": () => import("./technician_list_edit-94444904.js"), "../addon/higohome/views/technician/technician_police.vue": () => import("./technician_police-522e0f7c.js"), "../addon/higohome/views/technician/technician_set.vue": () => import("./technician_set-384571df.js"), "../addon/higohome/views/technician/technician_tags.vue": () => import("./technician_tags-57260471.js"), "../addon/higohome/views/technician/technician_wallet.vue": () => import("./technician_wallet-dd9f1e5c.js"), "../addon/higohome/views/technician/test_data.vue": () => import("./test_data-c698117e.js"), "../addon/higohome/views/technician/travel_set.vue": () => import("./travel_set-4994e536.js"), "../addon/higohome/views/theme/components/theme-config-edit.vue": () => import("./theme-config-edit-a803a5a9.js"), "../addon/higohome/views/theme/couponads.vue": () => import("./couponads-19b54375.js"), "../addon/higohome/views/theme/theme_color_config.vue": () => import("./theme_color_config-cc20b5ef.js"), "../addon/higohome/views/theme/theme_images_config.vue": () => import("./theme_images_config-a810fd4e.js"), "../addon/higohome/views/welcome/welcome.vue": () => import("./welcome-39a917f1.js"), "../addon/higohome/views/welcome/welcomebak.vue": () => import("./welcomebak-d4d798a1.js"), "../addon/home_service/views/card/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-7ac972e3.js"), "../addon/home_service/views/card/components/goods-select-popup.vue": () => import("./goods-select-popup-84574e87.js"), "../addon/home_service/views/card/edit.vue": () => import("./edit-9ebde44e.js"), "../addon/home_service/views/card/list.vue": () => import("./list-830bb3e2.js"), "../addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": () => import("./edit-homeService-carousel-search-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": () => import("./edit-homeService-many-goods-list-83ba7eca.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-order-info.vue": () => import("./edit-homeService-order-info-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": () => import("./edit-homeService-rubik-cube-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": () => import("./edit-homeServicemember-banner-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-card.vue": () => import("./edit-homeServicemember-card-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": () => import("./edit-homeServicemember-cardList-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": () => import("./edit-homeServicemember-guarantee-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-info.vue": () => import("./edit-homeServicemember-info-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": () => import("./edit-homeServicemember-lowCost-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": () => import("./edit-homeServicemember-panicBuying-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": () => import("./edit-homeServicemember-settle-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": () => import("./edit-homeServicemember-subguarantee-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": () => import("./edit-homeServicemember-technician-list-recommed-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": () => import("./edit-homeServicemember-technician-list-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-card.vue": () => import("./link-select-card-7cabf8e5.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-category.vue": () => import("./link-select-category-d720c079.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-goods.vue": () => import("./link-select-goods-251e1db4.js").then((i) => i._), "../addon/home_service/views/feedback/list.vue": () => import("./list-484e4994.js"), "../addon/home_service/views/finance/components/BankTransferDialog.vue": () => import("./BankTransferDialog-d4bed5ce.js"), "../addon/home_service/views/finance/invoice.vue": () => import("./invoice-6a0ca7ec.js"), "../addon/home_service/views/finance/store_detail.vue": () => import("./store_detail-655f2c08.js"), "../addon/home_service/views/finance/store_finance.vue": () => import("./store_finance-655f2c08.js"), "../addon/home_service/views/finance/technician_detail.vue": () => import("./technician_detail-655f2c08.js"), "../addon/home_service/views/finance/technician_finance.vue": () => import("./technician_finance-655f2c08.js"), "../addon/home_service/views/finance/withdrawal_review.vue": () => import("./withdrawal_review-655f2c08.js"), "../addon/home_service/views/goods/category.vue": () => import("./category-8c10629e.js"), "../addon/home_service/views/goods/city.vue": () => import("./city-655f2c08.js"), "../addon/home_service/views/goods/components/card-select-popup.vue": () => import("./card-select-popup-393086ef.js"), "../addon/home_service/views/goods/components/category-edit.vue": () => import("./category-edit-655f2c08.js"), "../addon/home_service/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6a0ca7ec.js"), "../addon/home_service/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-380a6014.js"), "../addon/home_service/views/goods/components/guarantee-edit.vue": () => import("./guarantee-edit-655f2c08.js"), "../addon/home_service/views/goods/components/special-edit.vue": () => import("./special-edit-655f2c08.js"), "../addon/home_service/views/goods/edit.vue": () => import("./edit-f5f484b5.js"), "../addon/home_service/views/goods/guarantee.vue": () => import("./guarantee-655f2c08.js"), "../addon/home_service/views/goods/list.vue": () => import("./list-655f2c08.js"), "../addon/home_service/views/goods/special.vue": () => import("./special-655f2c08.js"), "../addon/home_service/views/help/category.vue": () => import("./category-655f2c08.js"), "../addon/home_service/views/help/components/edit-category.vue": () => import("./edit-category-655f2c08.js"), "../addon/home_service/views/help/edit.vue": () => import("./edit-d478eb29.js"), "../addon/home_service/views/help/list.vue": () => import("./list-6a0ca7ec.js"), "../addon/home_service/views/index.vue": () => import("./index-0ca263b6.js"), "../addon/home_service/views/marketing/coupon/add.vue": () => import("./add-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-1d56cd8e.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/select-member.vue": () => import("./select-member-9c1dbb33.js"), "../addon/home_service/views/marketing/coupon/edit.vue": () => import("./edit-655f2c08.js"), "../addon/home_service/views/marketing/coupon/list.vue": () => import("./list-8c10629e.js"), "../addon/home_service/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-655f2c08.js"), "../addon/home_service/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-24ca72c5.js"), "../addon/home_service/views/order/components/add-address.vue": () => import("./add-address-90cd4549.js"), "../addon/home_service/views/order/components/address-list.vue": () => import("./address-list-6a0ca7ec.js"), "../addon/home_service/views/order/components/coupon-list.vue": () => import("./coupon-list-6a0ca7ec.js"), "../addon/home_service/views/order/components/friend-pay.vue": () => import("./friend-pay-6a0ca7ec.js"), "../addon/home_service/views/order/components/goods-limit.vue": () => import("./goods-limit-6a0ca7ec.js"), "../addon/home_service/views/order/components/manjian-info.vue": () => import("./manjian-info-6a0ca7ec.js"), "../addon/home_service/views/order/components/order-export-select.vue": () => import("./order-export-select-7ac972e3.js"), "../addon/home_service/views/order/components/pay.vue": () => import("./pay-5be492b8.js"), "../addon/home_service/views/order/components/returnvisit.vue": () => import("./returnvisit-9c071b0b.js"), "../addon/home_service/views/order/components/select-goods.vue": () => import("./select-goods-6a0ca7ec.js"), "../addon/home_service/views/order/components/select-member.vue": () => import("./select-member-7ac972e3.js"), "../addon/home_service/views/order/components/select-orderlabel.vue": () => import("./select-orderlabel-867066ce.js"), "../addon/home_service/views/order/components/select-technician.vue": () => import("./select-technician-655f2c08.js"), "../addon/home_service/views/order/components/select-time.vue": () => import("./select-time-b846d0eb.js"), "../addon/home_service/views/order/config.vue": () => import("./config-696d6794.js"), "../addon/home_service/views/order/easy_select.vue": () => import("./easy_select-9308abf9.js"), "../addon/home_service/views/order/easy_select_detail.vue": () => import("./easy_select_detail-8d1b86b5.js"), "../addon/home_service/views/order/evaluate.vue": () => import("./evaluate-445a3432.js"), "../addon/home_service/views/order/evaluate_config.vue": () => import("./evaluate_config-4ac55d95.js"), "../addon/home_service/views/order/intent_config.vue": () => import("./intent_config-8574a5a7.js"), "../addon/home_service/views/order/lesson_order.vue": () => import("./lesson_order-655f2c08.js"), "../addon/home_service/views/order/lesson_order_confirm.vue": () => import("./lesson_order_confirm-655f2c08.js"), "../addon/home_service/views/order/order.vue": () => import("./order-a43257b1.js"), "../addon/home_service/views/order/order_detail.vue": () => import("./order_detail-35c97b12.js"), "../addon/home_service/views/order/protection_settings.vue": () => import("./protection_settings-5fc46a35.js"), "../addon/home_service/views/order/return_visit.vue": () => import("./return_visit-5169bc75.js"), "../addon/home_service/views/order/tags.vue": () => import("./tags-a457fc6f.js"), "../addon/home_service/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-9ffb527f.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-9ffb527f.js").then((i) => i._), "../addon/home_service/views/refund/refund.vue": () => import("./refund-73ddac05.js"), "../addon/home_service/views/report/customer_report.vue": () => import("./customer_report-504a1d31.js"), "../addon/home_service/views/report/financial_report.vue": () => import("./financial_report-d88b7d55.js"), "../addon/home_service/views/report/member_report.vue": () => import("./member_report-fe9a0eff.js"), "../addon/home_service/views/report/store_report.vue": () => import("./store_report-fc2ed43e.js"), "../addon/home_service/views/report/technician_report.vue": () => import("./technician_report-b53c2438.js"), "../addon/home_service/views/store/add.vue": () => import("./add-5591aaf1.js"), "../addon/home_service/views/store/detail.vue": () => import("./detail-1bdd2e2c.js"), "../addon/home_service/views/store/edit.vue": () => import("./edit-0e735c5c.js"), "../addon/home_service/views/store/examine.vue": () => import("./examine-655f2c08.js"), "../addon/home_service/views/store/examine_edit.vue": () => import("./examine_edit-1e843b87.js"), "../addon/home_service/views/store/list.vue": () => import("./list-47455626.js"), "../addon/home_service/views/store/technician.vue": () => import("./technician-655f2c08.js"), "../addon/home_service/views/technician/cityfare.vue": () => import("./cityfare-655f2c08.js"), "../addon/home_service/views/technician/cityfare_config.vue": () => import("./cityfare_config-4fe34ee8.js"), "../addon/home_service/views/technician/components/dynamicCollapseForm/dynamicCollapseForm.vue": () => import("./dynamicCollapseForm-63bdddb7.js"), "../addon/home_service/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-71a12e50.js"), "../addon/home_service/views/technician/detail.vue": () => import("./detail-8ff6be0c.js"), "../addon/home_service/views/technician/edit.vue": () => import("./edit-c777de5e.js"), "../addon/home_service/views/technician/examine.vue": () => import("./examine-6a0ca7ec.js"), "../addon/home_service/views/technician/examine_edit.vue": () => import("./examine_edit-f8e07145.js"), "../addon/home_service/views/technician/level.vue": () => import("./level-655f2c08.js"), "../addon/home_service/views/technician/level_edit.vue": () => import("./level_edit-764e6e3c.js"), "../addon/home_service/views/technician/list.vue": () => import("./list-ca3a19a0.js"), "../addon/huaweicloud_obs/views/setting/components/storage-huawei.vue": () => import("./storage-huawei-655f2c08.js"), "../addon/huaweicloud_sms/views/setting/components/sms-huawei.vue": () => import("./sms-huawei-655f2c08.js"), "../addon/o2o/views/config/reserve.vue": () => import("./reserve-655f2c08.js"), "../addon/o2o/views/diy/components/edit-o2o-goods-list.vue": () => import("./edit-o2o-goods-list-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-member-info.vue": () => import("./edit-o2o-member-info-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-order-info.vue": () => import("./edit-o2o-order-info-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-search.vue": () => import("./edit-o2o-search-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-technician.vue": () => import("./edit-o2o-technician-9ffb527f.js").then((i) => i._), "../addon/o2o/views/goods/category.vue": () => import("./category-24ca72c5.js"), "../addon/o2o/views/goods/components/category-edit.vue": () => import("./category-edit-1ad78c96.js"), "../addon/o2o/views/goods/components/category-select-content.vue": () => import("./category-select-content-655f2c08.js"), "../addon/o2o/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-655f2c08.js"), "../addon/o2o/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-743e6724.js"), "../addon/o2o/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-9ae37d46.js"), "../addon/o2o/views/goods/edit.vue": () => import("./edit-934fb501.js"), "../addon/o2o/views/goods/list.vue": () => import("./list-24ca72c5.js"), "../addon/o2o/views/index.vue": () => import("./index-e58c1c71.js"), "../addon/o2o/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-24ca72c5.js"), "../addon/o2o/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-7ac972e3.js"), "../addon/o2o/views/order/components/order-export-select.vue": () => import("./order-export-select-6a0ca7ec.js"), "../addon/o2o/views/order/config.vue": () => import("./config-7da0b282.js"), "../addon/o2o/views/order/order.vue": () => import("./order-33dbd836.js"), "../addon/o2o/views/order/order_detail.vue": () => import("./order_detail-dff79846.js"), "../addon/o2o/views/order/reserve.vue": () => import("./reserve-b686ea12.js"), "../addon/o2o/views/poster/components/edit-o2o-goods-image.vue": () => import("./edit-o2o-goods-image-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/edit-o2o-goods-name.vue": () => import("./edit-o2o-goods-name-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/edit-o2o-goods-price.vue": () => import("./edit-o2o-goods-price-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-image.vue": () => import("./preview-o2o-goods-image-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-name.vue": () => import("./preview-o2o-goods-name-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-price.vue": () => import("./preview-o2o-goods-price-9ffb527f.js").then((i) => i._), "../addon/o2o/views/refund/detail.vue": () => import("./detail-8c10629e.js"), "../addon/o2o/views/refund/refund.vue": () => import("./refund-7ac972e3.js"), "../addon/o2o/views/site_index.vue": () => import("./site_index-655f2c08.js"), "../addon/o2o/views/technician/components/edit-position.vue": () => import("./edit-position-655f2c08.js"), "../addon/o2o/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-b7a37219.js"), "../addon/o2o/views/technician/edit.vue": () => import("./edit-032fc568.js"), "../addon/o2o/views/technician/list.vue": () => import("./list-fbca5f7b.js"), "../addon/o2o/views/technician/position.vue": () => import("./position-655f2c08.js"), "../addon/pintuan/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-6a0ca7ec.js"), "../addon/pintuan/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-0c5022fd.js"), "../addon/pintuan/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-d0b46ffe.js"), "../addon/pintuan/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-7ac972e3.js"), "../addon/pintuan/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-6a838123.js"), "../addon/pintuan/views/active/components/goods-select-content.vue": () => import("./goods-select-content-152b3080.js"), "../addon/pintuan/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-3eb27c1c.js"), "../addon/pintuan/views/active/components/select-member.vue": () => import("./select-member-4b07a13a.js"), "../addon/pintuan/views/active/edit.vue": () => import("./edit-cb07e44f.js"), "../addon/pintuan/views/active/list.vue": () => import("./list-e113a869.js"), "../addon/pintuan/views/active/stat.vue": () => import("./stat-b95580ce.js"), "../addon/pintuan/views/config/config.vue": () => import("./config-3f1aed28.js"), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": () => import("./edit-pintuan-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": () => import("./edit-pintuan-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": () => import("./edit-pintuan-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": () => import("./edit-pintuan-activity-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": () => import("./edit-pintuan-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": () => import("./edit-pintuan-activity-goods-detail-pintuan-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": () => import("./edit-pintuan-activity-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": () => import("./edit-pintuan-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": () => import("./edit-pintuan-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": () => import("./edit-pintuan-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": () => import("./edit-pintuan-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": () => import("./edit-pintuan-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": () => import("./edit-pintuan-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-hot.vue": () => import("./edit-pintuan-hot-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": () => import("./edit-pintuan-immediately-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-limit.vue": () => import("./edit-pintuan-limit-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-list.vue": () => import("./edit-pintuan-list-db229a9b.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": () => import("./edit-pintuan-member-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": () => import("./edit-pintuan-order-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/group/components/group-detail-popup.vue": () => import("./group-detail-popup-655f2c08.js"), "../addon/pintuan/views/group/list.vue": () => import("./list-98995852.js"), "../addon/pintuan/views/order/components/order-notes.vue": () => import("./order-notes-1ad78c96.js"), "../addon/pintuan/views/order/components/refund-detail.vue": () => import("./refund-detail-660775b7.js"), "../addon/pintuan/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-8c10629e.js"), "../addon/pintuan/views/order/detail.vue": () => import("./detail-070418fe.js"), "../addon/pintuan/views/order/list.vue": () => import("./list-be6741db.js"), "../addon/pintuan/views/order/refund.vue": () => import("./refund-018abccc.js"), "../addon/pintuan/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-0a4df787.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-price.vue": () => import("./edit-price-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-price.vue": () => import("./preview-price-3656154e.js").then((i) => i._), "../addon/recharge/views/order/components/recharge-detail.vue": () => import("./recharge-detail-655f2c08.js"), "../addon/recharge/views/order/detail.vue": () => import("./detail-1ad78c96.js"), "../addon/recharge/views/order/list.vue": () => import("./list-f58fe01d.js"), "../addon/recharge/views/order/refund.vue": () => import("./refund-24ca72c5.js"), "../addon/recharge/views/package/components/detail-growth.vue": () => import("./detail-growth-9a944ddd.js"), "../addon/recharge/views/package/components/detail-points.vue": () => import("./detail-points-6d8bd262.js"), "../addon/recharge/views/package/components/gift-growth.vue": () => import("./gift-growth-d8bb0311.js"), "../addon/recharge/views/package/components/gift-points.vue": () => import("./gift-points-03d0431c.js"), "../addon/recharge/views/package/components/package-gift.vue": () => import("./package-gift-655f2c08.js"), "../addon/recharge/views/package/config.vue": () => import("./config-c3170518.js"), "../addon/recharge/views/package/detail.vue": () => import("./detail-b0ffb798.js"), "../addon/recharge/views/package/edit.vue": () => import("./edit-33a03570.js"), "../addon/recharge/views/package/list.vue": () => import("./list-cd799851.js"), "../addon/relay/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-7ac972e3.js"), "../addon/relay/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-b9d0b30b.js"), "../addon/relay/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-e449b1c8.js"), "../addon/relay/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-24ca72c5.js"), "../addon/relay/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-a9725102.js"), "../addon/relay/views/active/components/goods-select-content.vue": () => import("./goods-select-content-7fb2740a.js"), "../addon/relay/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-ecb72321.js"), "../addon/relay/views/active/components/select-member.vue": () => import("./select-member-89a5095a.js"), "../addon/relay/views/active/edit.vue": () => import("./edit-8432472b.js"), "../addon/relay/views/active/list.vue": () => import("./list-d193b946.js"), "../addon/relay/views/active/stat.vue": () => import("./stat-06441dd5.js"), "../addon/relay/views/config/config.vue": () => import("./config-122e19c0.js"), "../addon/relay/views/diy/components/edit-relay-goods-list.vue": () => import("./edit-relay-goods-list-9ffb527f.js").then((i) => i._), "../addon/relay/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-3f57a5df.js"), "../addon/relay/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-29afb627.js"), "../addon/relay/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-fc0d601f.js"), "../addon/relay/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-cfe8dbed.js"), "../addon/relay/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-6a0ca7ec.js"), "../addon/relay/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-f148bd18.js"), "../addon/relay/views/goods/edit.vue": () => import("./edit-3b2a98e3.js"), "../addon/relay/views/goods/list.vue": () => import("./list-c43c131e.js"), "../addon/relay/views/order/components/order-notes.vue": () => import("./order-notes-655f2c08.js"), "../addon/relay/views/order/components/refund-detail.vue": () => import("./refund-detail-04ee3512.js"), "../addon/relay/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-24ca72c5.js"), "../addon/relay/views/order/detail.vue": () => import("./detail-3c71781e.js"), "../addon/relay/views/order/list.vue": () => import("./list-abfaff0d.js"), "../addon/relay/views/order/refund.vue": () => import("./refund-0bc0595c.js"), "../addon/sd_minsu/views/banner/list.vue": () => import("./list-bb846ef3.js"), "../addon/sd_minsu/views/city/list.vue": () => import("./list-d4303a32.js"), "../addon/sd_minsu/views/config/index.vue": () => import("./index-5739ce7e.js"), "../addon/sd_minsu/views/coupon/list.vue": () => import("./list-c72a0c25.js"), "../addon/sd_minsu/views/dashboard/index.vue": () => import("./index-b0fe7816.js"), "../addon/sd_minsu/views/evaluate/list.vue": () => import("./list-0ffe9cb4.js"), "../addon/sd_minsu/views/facility/list.vue": () => import("./list-f422d13c.js"), "../addon/sd_minsu/views/homestay/apply.vue": () => import("./apply-fadff92b.js"), "../addon/sd_minsu/views/homestay/edit.vue": () => import("./edit-3f1aed28.js"), "../addon/sd_minsu/views/homestay/list.vue": () => import("./list-d9a8c3e5.js"), "../addon/sd_minsu/views/invite/index.vue": () => import("./index-fc2de04f.js"), "../addon/sd_minsu/views/notice/list.vue": () => import("./list-6c6c4b64.js"), "../addon/sd_minsu/views/order/detail.vue": () => import("./detail-05396620.js"), "../addon/sd_minsu/views/order/list.vue": () => import("./list-887fd12c.js"), "../addon/sd_minsu/views/quick_nav/list.vue": () => import("./list-11ed21f5.js"), "../addon/sd_minsu/views/refund/list.vue": () => import("./list-d2e30548.js"), "../addon/sd_minsu/views/room/calendar.vue": () => import("./calendar-7340b761.js"), "../addon/sd_minsu/views/room/list.vue": () => import("./list-7d333a48.js"), "../addon/sd_minsu/views/settlement/list.vue": () => import("./list-7886d8fa.js"), "../addon/sd_minsu/views/staff/list.vue": () => import("./list-a0ddce29.js"), "../addon/sd_xiaoyuan/views/appeal/list.vue": () => import("./list-c9a4276a.js"), "../addon/sd_xiaoyuan/views/campus/list.vue": () => import("./list-68a2dea6.js"), "../addon/sd_xiaoyuan/views/campus_auth/list.vue": () => import("./list-32ef8888.js"), "../addon/sd_xiaoyuan/views/class_schedule/import.vue": () => import("./import-55273c74.js"), "../addon/sd_xiaoyuan/views/class_schedule/list.vue": () => import("./list-86e16b2e.js"), "../addon/sd_xiaoyuan/views/comment/community.vue": () => import("./community-5f4d80ea.js"), "../addon/sd_xiaoyuan/views/comment/confession.vue": () => import("./confession-ae09011f.js"), "../addon/sd_xiaoyuan/views/comment/list.vue": () => import("./list-cfd6a588.js"), "../addon/sd_xiaoyuan/views/community/category.vue": () => import("./category-c54511d6.js"), "../addon/sd_xiaoyuan/views/community/list.vue": () => import("./list-638149a0.js"), "../addon/sd_xiaoyuan/views/confession/list.vue": () => import("./list-44d739fb.js"), "../addon/sd_xiaoyuan/views/config/index.vue": () => import("./index-70fb3510.js"), "../addon/sd_xiaoyuan/views/coupon/list.vue": () => import("./list-1556aae7.js"), "../addon/sd_xiaoyuan/views/credit/list.vue": () => import("./list-16b3b6ac.js"), "../addon/sd_xiaoyuan/views/dashboard/index.vue": () => import("./index-f288cdd0.js"), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-banner.vue": () => import("./edit-xiaoyuan-banner-699df7a5.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-card-grid.vue": () => import("./edit-xiaoyuan-card-grid-941545e6.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-community.vue": () => import("./edit-xiaoyuan-community-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-header.vue": () => import("./edit-xiaoyuan-header-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-idle-preview.vue": () => import("./edit-xiaoyuan-idle-preview-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-menu-grid.vue": () => import("./edit-xiaoyuan-menu-grid-8d9dbe60.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-notice.vue": () => import("./edit-xiaoyuan-notice-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-order-hall.vue": () => import("./edit-xiaoyuan-order-hall-69dcdce8.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-promo-card.vue": () => import("./edit-xiaoyuan-promo-card-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-search.vue": () => import("./edit-xiaoyuan-search-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-user-header.vue": () => import("./edit-xiaoyuan-user-header-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-user-menu.vue": () => import("./edit-xiaoyuan-user-menu-11a64be5.js").then((i) => i._), "../addon/sd_xiaoyuan/views/evaluate/list.vue": () => import("./list-4729d887.js"), "../addon/sd_xiaoyuan/views/express_station/list.vue": () => import("./list-f7c7f347.js"), "../addon/sd_xiaoyuan/views/game/category.vue": () => import("./category-5210873e.js"), "../addon/sd_xiaoyuan/views/game/index.vue": () => import("./index-cc9867fa.js"), "../addon/sd_xiaoyuan/views/group_order/list.vue": () => import("./list-c4104d58.js"), "../addon/sd_xiaoyuan/views/house/list.vue": () => import("./list-ffc540c8.js"), "../addon/sd_xiaoyuan/views/house/order.vue": () => import("./order-ffed94e4.js"), "../addon/sd_xiaoyuan/views/invite/index.vue": () => import("./index-822e44c5.js"), "../addon/sd_xiaoyuan/views/lost_found/category.vue": () => import("./category-f7a574d7.js"), "../addon/sd_xiaoyuan/views/lost_found/list.vue": () => import("./list-4f0bf8ee.js"), "../addon/sd_xiaoyuan/views/message/list.vue": () => import("./list-189b4a37.js"), "../addon/sd_xiaoyuan/views/message/send.vue": () => import("./send-66780995.js"), "../addon/sd_xiaoyuan/views/order/list.vue": () => import("./list-54e6e2fe.js"), "../addon/sd_xiaoyuan/views/package_price/list.vue": () => import("./list-e3b920cf.js"), "../addon/sd_xiaoyuan/views/points/goods.vue": () => import("./goods-17b2cf4d.js"), "../addon/sd_xiaoyuan/views/points/orders.vue": () => import("./orders-9a8c916d.js"), "../addon/sd_xiaoyuan/views/runner/level.vue": () => import("./level-7606a3fb.js"), "../addon/sd_xiaoyuan/views/runner/list.vue": () => import("./list-199a2c61.js"), "../addon/sd_xiaoyuan/views/school/list.vue": () => import("./list-dd1a3f4d.js"), "../addon/sd_xiaoyuan/views/school_class/list.vue": () => import("./list-3096e553.js"), "../addon/sd_xiaoyuan/views/secondhand/category.vue": () => import("./category-eb1ee10b.js"), "../addon/sd_xiaoyuan/views/secondhand/list.vue": () => import("./list-dc3ff9c7.js"), "../addon/sd_xiaoyuan/views/service_card/list.vue": () => import("./list-1b2f3241.js"), "../addon/sd_xiaoyuan/views/sign/index.vue": () => import("./index-1f6ad2db.js"), "../addon/sd_xiaoyuan/views/stat/index.vue": () => import("./index-92622363.js"), "../addon/sd_xiaoyuan/views/task/list.vue": () => import("./list-85dfd664.js"), "../addon/sd_xiaoyuan/views/withdraw/list.vue": () => import("./list-6d2fb5cf.js"), "../addon/seckill/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-6a0ca7ec.js"), "../addon/seckill/views/active/components/goods-sku-popup.vue": () => import("./goods-sku-popup-5543c00e.js"), "../addon/seckill/views/active/components/seckill-detail-popup.vue": () => import("./seckill-detail-popup-655f2c08.js"), "../addon/seckill/views/active/components/time-select-popup.vue": () => import("./time-select-popup-655f2c08.js"), "../addon/seckill/views/active/detail.vue": () => import("./detail-9a208960.js"), "../addon/seckill/views/active/edit.vue": () => import("./edit-1dbc91e6.js"), "../addon/seckill/views/active/list.vue": () => import("./list-7ac972e3.js"), "../addon/seckill/views/active/stat.vue": () => import("./stat-b899674a.js"), "../addon/seckill/views/config/config.vue": () => import("./config-655f2c08.js"), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": () => import("./edit-seckill-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": () => import("./edit-seckill-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": () => import("./edit-seckill-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": () => import("./edit-seckill-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": () => import("./edit-seckill-activity-goods-detail-seckill-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": () => import("./edit-seckill-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": () => import("./edit-seckill-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": () => import("./edit-seckill-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": () => import("./edit-seckill-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods.vue": () => import("./edit-seckill-goods-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-hot.vue": () => import("./edit-seckill-hot-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-member-info.vue": () => import("./edit-seckill-member-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-order-info.vue": () => import("./edit-seckill-order-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": () => import("./edit-seckill-rubik-cube-71b3f871.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-special-offer.vue": () => import("./edit-seckill-special-offer-9ffb527f.js").then((i) => i._), "../addon/seckill/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-4df1d010.js"), "../addon/seckill/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-84f387df.js"), "../addon/seckill/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-3231d0f0.js"), "../addon/seckill/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-319c669a.js"), "../addon/seckill/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-655f2c08.js"), "../addon/seckill/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-2e3563d1.js"), "../addon/seckill/views/goods/edit.vue": () => import("./edit-c5ceaedb.js"), "../addon/seckill/views/goods/list.vue": () => import("./list-0bbb41fc.js"), "../addon/seckill/views/order/components/order-notes.vue": () => import("./order-notes-6a0ca7ec.js"), "../addon/seckill/views/order/components/refund-detail.vue": () => import("./refund-detail-aea85365.js"), "../addon/seckill/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-655f2c08.js"), "../addon/seckill/views/order/detail.vue": () => import("./detail-99ff804c.js"), "../addon/seckill/views/order/list.vue": () => import("./list-9ec5f5c7.js"), "../addon/seckill/views/order/refund.vue": () => import("./refund-696ac832.js"), "../addon/seckill/views/poster/components/edit-active-time.vue": () => import("./edit-active-time-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-f7d788a0.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-0a4df787.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-seckill-market-price.vue": () => import("./edit-seckill-market-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-seckill-price.vue": () => import("./edit-seckill-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-active-time.vue": () => import("./preview-active-time-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-0a4df787.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-f7d788a0.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-seckill-market-price.vue": () => import("./preview-seckill-market-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-seckill-price.vue": () => import("./preview-seckill-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/time/components/time-diy-select-popup.vue": () => import("./time-diy-select-popup-32d17943.js"), "../addon/seckill/views/time/components/time-goods-detail.vue": () => import("./time-goods-detail-655f2c08.js"), "../addon/seckill/views/time/components/time-select-content.vue": () => import("./time-select-content-8240d9b1.js"), "../addon/seckill/views/time/edit.vue": () => import("./edit-7ac972e3.js"), "../addon/seckill/views/time/list.vue": () => import("./list-4a02961a.js"), "../addon/shop/views/address/edit.vue": () => import("./edit-6a0ca7ec.js"), "../addon/shop/views/address/list.vue": () => import("./list-1ad78c96.js"), "../addon/shop/views/delivery/company.vue": () => import("./company-655f2c08.js"), "../addon/shop/views/delivery/company_edit.vue": () => import("./company_edit-655f2c08.js"), "../addon/shop/views/delivery/components/delivery-personnel-edit.vue": () => import("./delivery-personnel-edit-655f2c08.js"), "../addon/shop/views/delivery/components/local-delivery-service-dada.vue": () => import("./local-delivery-service-dada-655f2c08.js"), "../addon/shop/views/delivery/components/local_record_detail.vue": () => import("./local_record_detail-655f2c08.js"), "../addon/shop/views/delivery/components/shop_record_detail.vue": () => import("./shop_record_detail-655f2c08.js"), "../addon/shop/views/delivery/config.vue": () => import("./config-b2c3ae09.js"), "../addon/shop/views/delivery/electronic_sheet.vue": () => import("./electronic_sheet-655f2c08.js"), "../addon/shop/views/delivery/electronic_sheet_config.vue": () => import("./electronic_sheet_config-cffd3d2b.js"), "../addon/shop/views/delivery/electronic_sheet_edit.vue": () => import("./electronic_sheet_edit-655f2c08.js"), "../addon/shop/views/delivery/local.vue": () => import("./local-d22ea663.js"), "../addon/shop/views/delivery/local_config.vue": () => import("./local_config-655f2c08.js"), "../addon/shop/views/delivery/local_delivery_service.vue": () => import("./local_delivery_service-655f2c08.js"), "../addon/shop/views/delivery/local_record.vue": () => import("./local_record-54f66ae2.js"), "../addon/shop/views/delivery/merchant_record.vue": () => import("./merchant_record-dc7a1c92.js"), "../addon/shop/views/delivery/search.vue": () => import("./search-a1c2b04e.js"), "../addon/shop/views/delivery/staff.vue": () => import("./staff-655f2c08.js"), "../addon/shop/views/delivery/store.vue": () => import("./store-655f2c08.js"), "../addon/shop/views/delivery/store_edit.vue": () => import("./store_edit-655f2c08.js"), "../addon/shop/views/delivery/template.vue": () => import("./template-655f2c08.js"), "../addon/shop/views/delivery/template_edit.vue": () => import("./template_edit-43b5e1d4.js"), "../addon/shop/views/delivery_store/delivery_set.vue": () => import("./delivery_set-655f2c08.js"), "../addon/shop/views/delivery_store/edit.vue": () => import("./edit-78c1dd7e.js"), "../addon/shop/views/delivery_store/list.vue": () => import("./list-14757507.js"), "../addon/shop/views/diy/components/edit-goods-coupon.vue": () => import("./edit-goods-coupon-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-goods-list.vue": () => import("./edit-goods-list-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-many-goods-list.vue": () => import("./edit-many-goods-list-e3d4971f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-exchange-goods.vue": () => import("./edit-shop-exchange-goods-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-exchange-info.vue": () => import("./edit-shop-exchange-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": () => import("./edit-shop-goods-detail-attr-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": () => import("./edit-shop-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": () => import("./edit-shop-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": () => import("./edit-shop-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": () => import("./edit-shop-goods-detail-evaluate-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": () => import("./edit-shop-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": () => import("./edit-shop-goods-detail-sow-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-hot.vue": () => import("./edit-shop-goods-hot-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-ranking.vue": () => import("./edit-shop-goods-ranking-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-recommend.vue": () => import("./edit-shop-goods-recommend-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-member-info.vue": () => import("./edit-shop-member-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-newcomer.vue": () => import("./edit-shop-newcomer-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-order-info.vue": () => import("./edit-shop-order-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-search.vue": () => import("./edit-shop-search-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-single-recommend.vue": () => import("./edit-single-recommend-9ffb527f.js").then((i) => i._), "../addon/shop/views/goods/attr.vue": () => import("./attr-655f2c08.js"), "../addon/shop/views/goods/attr_edit.vue": () => import("./attr_edit-655f2c08.js"), "../addon/shop/views/goods/brand_list.vue": () => import("./brand_list-655f2c08.js"), "../addon/shop/views/goods/category.vue": () => import("./category-5e7f2de8.js"), "../addon/shop/views/goods/category_config.vue": () => import("./category_config-480209f9.js"), "../addon/shop/views/goods/components/brand-edit.vue": () => import("./brand-edit-655f2c08.js"), "../addon/shop/views/goods/components/category-edit.vue": () => import("./category-edit-6a0ca7ec.js"), "../addon/shop/views/goods/components/coupon-select-popup.vue": () => import("./coupon-select-popup-080b96c0.js"), "../addon/shop/views/goods/components/evaluate-add.vue": () => import("./evaluate-add-655f2c08.js"), "../addon/shop/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-d47e1693.js"), "../addon/shop/views/goods/components/goods-category-select-content.vue": () => import("./goods-category-select-content-f69ead33.js"), "../addon/shop/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-dbc8613a.js"), "../addon/shop/views/goods/components/goods-price-edit-popup.vue": () => import("./goods-price-edit-popup-4db9677b.js"), "../addon/shop/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-3f58a19c.js"), "../addon/shop/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-595d932e.js"), "../addon/shop/views/goods/components/goods-stock-edit-popup.vue": () => import("./goods-stock-edit-popup-27502087.js"), "../addon/shop/views/goods/components/label-edit.vue": () => import("./label-edit-655f2c08.js"), "../addon/shop/views/goods/components/label-group-edit.vue": () => import("./label-group-edit-655f2c08.js"), "../addon/shop/views/goods/components/newcomer-goods-select-popup.vue": () => import("./newcomer-goods-select-popup-2bf5462a.js"), "../addon/shop/views/goods/components/service-edit.vue": () => import("./service-edit-655f2c08.js"), "../addon/shop/views/goods/evaluate.vue": () => import("./evaluate-e1d6fc00.js"), "../addon/shop/views/goods/label_group_list.vue": () => import("./label_group_list-655f2c08.js"), "../addon/shop/views/goods/label_list.vue": () => import("./label_list-655f2c08.js"), "../addon/shop/views/goods/list.vue": () => import("./list-6acce2f9.js"), "../addon/shop/views/goods/real_edit.vue": () => import("./real_edit-6d7b422b.js"), "../addon/shop/views/goods/recycle.vue": () => import("./recycle-26854108.js"), "../addon/shop/views/goods/search_config.vue": () => import("./search_config-88cf60d5.js"), "../addon/shop/views/goods/service.vue": () => import("./service-655f2c08.js"), "../addon/shop/views/goods/virtual_edit.vue": () => import("./virtual_edit-021f8e7f.js"), "../addon/shop/views/index/index.vue": () => import("./index-3f1aed28.js"), "../addon/shop/views/marketing/coupon/add.vue": () => import("./add-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-7acfa604.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/select-member.vue": () => import("./select-member-26f2f1c1.js"), "../addon/shop/views/marketing/coupon/edit.vue": () => import("./edit-7da0b282.js"), "../addon/shop/views/marketing/coupon/list.vue": () => import("./list-b0ffb798.js"), "../addon/shop/views/marketing/discount/add.vue": () => import("./add-1ba1bdf6.js"), "../addon/shop/views/marketing/discount/components/discount-detail.vue": () => import("./discount-detail-655f2c08.js"), "../addon/shop/views/marketing/discount/components/goods-sku-popup.vue": () => import("./goods-sku-popup-67ccebf0.js"), "../addon/shop/views/marketing/discount/config.vue": () => import("./config-ca95bf03.js"), "../addon/shop/views/marketing/discount/detail.vue": () => import("./detail-655f2c08.js"), "../addon/shop/views/marketing/discount/edit.vue": () => import("./edit-b4efb0d6.js"), "../addon/shop/views/marketing/discount/list.vue": () => import("./list-7da0b282.js"), "../addon/shop/views/marketing/exchange/components/goods-select-content.vue": () => import("./goods-select-content-9d39c2de.js"), "../addon/shop/views/marketing/exchange/components/goods-select-popup.vue": () => import("./goods-select-popup-655f2c08.js"), "../addon/shop/views/marketing/exchange/components/goods-sku-select.vue": () => import("./goods-sku-select-655f2c08.js"), "../addon/shop/views/marketing/exchange/goods_add.vue": () => import("./goods_add-be6bac76.js"), "../addon/shop/views/marketing/exchange/goods_edit.vue": () => import("./goods_edit-ede26358.js"), "../addon/shop/views/marketing/exchange/goods_list.vue": () => import("./goods_list-655f2c08.js"), "../addon/shop/views/marketing/exchange/order_list.vue": () => import("./order_list-055264c0.js"), "../addon/shop/views/marketing/goods_rank/components/rank-select-popup.vue": () => import("./rank-select-popup-8c680ce5.js"), "../addon/shop/views/marketing/goods_rank/config.vue": () => import("./config-6a0ca7ec.js"), "../addon/shop/views/marketing/goods_rank/edit.vue": () => import("./edit-8c10629e.js"), "../addon/shop/views/marketing/goods_rank/list.vue": () => import("./list-3f1aed28.js"), "../addon/shop/views/marketing/index.vue": () => import("./index-27b86ecd.js"), "../addon/shop/views/marketing/manjian/detail.vue": () => import("./detail-262c6570.js"), "../addon/shop/views/marketing/manjian/edit.vue": () => import("./edit-9e73a2ee.js"), "../addon/shop/views/marketing/manjian/list.vue": () => import("./list-122e19c0.js"), "../addon/shop/views/marketing/newcomer/config.vue": () => import("./config-e7695139.js"), "../addon/shop/views/marketing/newcomer/order_list.vue": () => import("./order_list-d9dc414c.js"), "../addon/shop/views/member/components/benefits-free-shipping.vue": () => import("./benefits-free-shipping-655f2c08.js"), "../addon/shop/views/member/components/gift-coupon.vue": () => import("./gift-coupon-655f2c08.js"), "../addon/shop/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-6a0ca7ec.js"), "../addon/shop/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-655f2c08.js"), "../addon/shop/views/member/components/point-rule-buygoods.vue": () => import("./point-rule-buygoods-655f2c08.js"), "../addon/shop/views/member/components/point-rule-orderdeduction.vue": () => import("./point-rule-orderdeduction-655f2c08.js"), "../addon/shop/views/member/components/recharge-detail-coupon.vue": () => import("./recharge-detail-coupon-b33a4f54.js"), "../addon/shop/views/member/components/recharge-gift-coupon.vue": () => import("./recharge-gift-coupon-ee84508a.js"), "../addon/shop/views/order/batch_delivery.vue": () => import("./batch_delivery-655f2c08.js"), "../addon/shop/views/order/components/adjust-money.vue": () => import("./adjust-money-655f2c08.js"), "../addon/shop/views/order/components/delivery-action.vue": () => import("./delivery-action-655f2c08.js"), "../addon/shop/views/order/components/delivery-package.vue": () => import("./delivery-package-655f2c08.js"), "../addon/shop/views/order/components/electronic-sheet-print.vue": () => import("./electronic-sheet-print-655f2c08.js"), "../addon/shop/views/order/components/form-detail.vue": () => import("./form-detail-655f2c08.js"), "../addon/shop/views/order/components/import-data.vue": () => import("./import-data-655f2c08.js"), "../addon/shop/views/order/components/invoice-detail.vue": () => import("./invoice-detail-655f2c08.js"), "../addon/shop/views/order/components/invoice-dialog.vue": () => import("./invoice-dialog-655f2c08.js"), "../addon/shop/views/order/components/open-invoice.vue": () => import("./open-invoice-655f2c08.js"), "../addon/shop/views/order/components/order-detail.vue": () => import("./order-detail-6a0ca7ec.js"), "../addon/shop/views/order/components/order-edit-address.vue": () => import("./order-edit-address-655f2c08.js"), "../addon/shop/views/order/components/order-export-select.vue": () => import("./order-export-select-655f2c08.js"), "../addon/shop/views/order/components/order-notes.vue": () => import("./order-notes-7ac972e3.js"), "../addon/shop/views/order/components/refund-detail.vue": () => import("./refund-detail-e70f75ab.js"), "../addon/shop/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-6a0ca7ec.js"), "../addon/shop/views/order/config.vue": () => import("./config-1ad78c96.js"), "../addon/shop/views/order/detail.vue": () => import("./detail-f61fbcf2.js"), "../addon/shop/views/order/invoice.vue": () => import("./invoice-655f2c08.js"), "../addon/shop/views/order/list.vue": () => import("./list-de61d345.js"), "../addon/shop/views/order/refund.vue": () => import("./refund-5279f858.js"), "../addon/shop/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-907653fa.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-f7d788a0.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-f7d788a0.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-0a4df787.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/printer/components/preview-goods-order.vue": () => import("./preview-goods-order-37a1aa0d.js").then((i) => i._), "../addon/shop/views/sow_community/components/sow-community-gift-coupon.vue": () => import("./sow-community-gift-coupon-c01290a4.js"), "../addon/shop/views/stat/goods.vue": () => import("./goods-5143c7cb.js"), "../addon/shop/views/stat/index.vue": () => import("./index-601c91b2.js"), "../addon/shop/views/stat/member.vue": () => import("./member-ce49a1ae.js"), "../addon/shop/views/stat/order.vue": () => import("./order-ec093897.js"), "../addon/shop/views/stat/visit.vue": () => import("./visit-e9ea451f.js"), "../addon/shop_fenxiao/views/agent/level_config.vue": () => import("./level_config-655f2c08.js"), "../addon/shop_fenxiao/views/agent/list.vue": () => import("./list-545eb6f5.js"), "../addon/shop_fenxiao/views/agent/order.vue": () => import("./order-4f4228ea.js"), "../addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue": () => import("./fenxiao-goods-detail-655f2c08.js"), "../addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue": () => import("./fenxiao-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/components/member-of-select-popup.vue": () => import("./member-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/config/index.vue": () => import("./index-df823b62.js"), "../addon/shop_fenxiao/views/config/poster.vue": () => import("./poster-655f2c08.js"), "../addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": () => import("./edit-fenxiao-goods-list-9ffb527f.js").then((i) => i._), "../addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue": () => import("./fenxiao-detail-655f2c08.js"), "../addon/shop_fenxiao/views/fenxiao/detail.vue": () => import("./detail-24ca72c5.js"), "../addon/shop_fenxiao/views/fenxiao/edit.vue": () => import("./edit-9eb57442.js"), "../addon/shop_fenxiao/views/fenxiao/lists.vue": () => import("./lists-655f2c08.js"), "../addon/shop_fenxiao/views/goods/config.vue": () => import("./config-2d218da0.js"), "../addon/shop_fenxiao/views/goods/detail.vue": () => import("./detail-4d94da3c.js"), "../addon/shop_fenxiao/views/goods/lists.vue": () => import("./lists-e8dfffcb.js"), "../addon/shop_fenxiao/views/index/index.vue": () => import("./index-b0ffb798.js"), "../addon/shop_fenxiao/views/level/edit.vue": () => import("./edit-0dc0f896.js"), "../addon/shop_fenxiao/views/level/lists.vue": () => import("./lists-6a0ca7ec.js"), "../addon/shop_fenxiao/views/member/lists.vue": () => import("./lists-7ac972e3.js"), "../addon/shop_fenxiao/views/order/lists.vue": () => import("./lists-353e6b52.js"), "../addon/shop_fenxiao/views/sale/config.vue": () => import("./config-69f3c534.js"), "../addon/shop_fenxiao/views/sale/list.vue": () => import("./list-16d80079.js"), "../addon/shop_fenxiao/views/sale/member_list.vue": () => import("./member_list-655f2c08.js"), "../addon/shop_fenxiao/views/task/components/task-detail.vue": () => import("./task-detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/config.vue": () => import("./config-fcae6b14.js"), "../addon/shop_fenxiao/views/task/detail.vue": () => import("./detail-6a0ca7ec.js"), "../addon/shop_fenxiao/views/task/edit.vue": () => import("./edit-24ca72c5.js"), "../addon/shop_fenxiao/views/task/list.vue": () => import("./list-9439af69.js"), "../addon/shop_fenxiao/views/task/reward_detail.vue": () => import("./reward_detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/reward_list.vue": () => import("./reward_list-655f2c08.js"), "../addon/shop_fenxiao/views/team/level.vue": () => import("./level-9a03afb1.js"), "../addon/shop_fenxiao/views/team/order.vue": () => import("./order-fe25a1a7.js"), "../addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": () => import("./edit-giftcard-list-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/giftcard/card_detail.vue": () => import("./card_detail-c53763a7.js"), "../addon/shop_giftcard/views/giftcard/category.vue": () => import("./category-6a0ca7ec.js"), "../addon/shop_giftcard/views/giftcard/components/category-edit.vue": () => import("./category-edit-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue": () => import("./giftcard-detail-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-content.vue": () => import("./giftcard-select-content-03d4fa20.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue": () => import("./giftcard-select-popup-ebc1ca56.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-edit.vue": () => import("./makecard-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue": () => import("./makecard-import-log-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-edit.vue": () => import("./material-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-group-edit.vue": () => import("./material-group-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-move.vue": () => import("./material-move-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-select-popup.vue": () => import("./material-select-popup-f5377c62.js"), "../addon/shop_giftcard/views/giftcard/components/material-select.vue": () => import("./material-select-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/config.vue": () => import("./config-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/detail.vue": () => import("./detail-38aa1aac.js"), "../addon/shop_giftcard/views/giftcard/edit.vue": () => import("./edit-27b0755b.js"), "../addon/shop_giftcard/views/giftcard/list.vue": () => import("./list-788e9d8a.js"), "../addon/shop_giftcard/views/giftcard/makecard.vue": () => import("./makecard-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material.vue": () => import("./material-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material_group.vue": () => import("./material_group-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-detail.vue": () => import("./order-detail-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-notes.vue": () => import("./order-notes-24ca72c5.js"), "../addon/shop_giftcard/views/order/list.vue": () => import("./list-a4203436.js"), "../addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": () => import("./edit-giftcard-blessing-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": () => import("./edit-giftcard-image-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": () => import("./edit-giftcard-name-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": () => import("./edit-giftcard-validity-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": () => import("./preview-giftcard-blessing-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": () => import("./preview-giftcard-image-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": () => import("./preview-giftcard-name-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": () => import("./preview-giftcard-validity-9ffb527f.js").then((i) => i._), "../addon/shop_impulse_buy/views/impulse_buy/components/category-select-popup.vue": () => import("./category-select-popup-43921fac.js"), "../addon/shop_impulse_buy/views/impulse_buy/config.vue": () => import("./config-24ca72c5.js"), "../addon/shop_impulse_buy/views/impulse_buy/detail.vue": () => import("./detail-7ac972e3.js"), "../addon/shop_impulse_buy/views/impulse_buy/edit.vue": () => import("./edit-cbf86ff8.js"), "../addon/shop_impulse_buy/views/impulse_buy/list.vue": () => import("./list-2c2b8751.js"), "../addon/shop_replace_buy/views/components/add-address.vue": () => import("./add-address-655f2c08.js"), "../addon/shop_replace_buy/views/components/address-list.vue": () => import("./address-list-655f2c08.js"), "../addon/shop_replace_buy/views/components/coupon-list.vue": () => import("./coupon-list-655f2c08.js"), "../addon/shop_replace_buy/views/components/friend-pay.vue": () => import("./friend-pay-655f2c08.js"), "../addon/shop_replace_buy/views/components/goods-limit.vue": () => import("./goods-limit-655f2c08.js"), "../addon/shop_replace_buy/views/components/manjian-info.vue": () => import("./manjian-info-655f2c08.js"), "../addon/shop_replace_buy/views/components/select-goods.vue": () => import("./select-goods-655f2c08.js"), "../addon/shop_replace_buy/views/components/select-member.vue": () => import("./select-member-655f2c08.js"), "../addon/shop_replace_buy/views/components/store-list.vue": () => import("./store-list-655f2c08.js"), "../addon/shop_replace_buy/views/index.vue": () => import("./index-7da0b282.js"), "../addon/shop_replace_buy/views/order.vue": () => import("./order-655f2c08.js"), "../addon/sow_community/views/category/components/category-edit.vue": () => import("./category-edit-24ca72c5.js"), "../addon/sow_community/views/category/list.vue": () => import("./list-9b808d93.js"), "../addon/sow_community/views/comment/list.vue": () => import("./list-e949c5a9.js"), "../addon/sow_community/views/config/config.vue": () => import("./config-8c10629e.js"), "../addon/sow_community/views/content/components/content-detail.vue": () => import("./content-detail-a2ddce27.js"), "../addon/sow_community/views/content/components/select-member.vue": () => import("./select-member-6a0ca7ec.js"), "../addon/sow_community/views/content/components/treasure-select-popup.vue": () => import("./treasure-select-popup-4fb1b785.js"), "../addon/sow_community/views/content/edit.vue": () => import("./edit-b0ffb798.js"), "../addon/sow_community/views/content/list.vue": () => import("./list-07c4c15d.js"), "../addon/sow_community/views/content/select_content.vue": () => import("./select_content-a898afe2.js"), "../addon/sow_community/views/package/components/gift-balance.vue": () => import("./gift-balance-51dab398.js"), "../addon/sow_community/views/package/components/gift-points.vue": () => import("./gift-points-da310e35.js"), "../addon/sow_community/views/reward_rule/components/reward_rule-detail.vue": () => import("./reward_rule-detail-58d88b97.js"), "../addon/sow_community/views/reward_rule/edit.vue": () => import("./edit-23a83234.js"), "../addon/sow_community/views/reward_rule/list.vue": () => import("./list-e1e5a97c.js"), "../addon/sow_community/views/sensitive/index.vue": () => import("./index-16d80079.js"), "../addon/sow_community/views/topic/components/topic-edit.vue": () => import("./topic-edit-655f2c08.js"), "../addon/sow_community/views/topic/list.vue": () => import("./list-d7499fbc.js"), "../addon/sow_community/views/treasure/components/goods-select-popup.vue": () => import("./goods-select-popup-9ca391a4.js"), "../addon/sow_community/views/treasure/components/treasure-edit.vue": () => import("./treasure-edit-655f2c08.js"), "../addon/sow_community/views/treasure/list.vue": () => import("./list-0093effa.js"), "../addon/tk_cps/views/act/act.vue": () => import("./act-0a718d81.js"), "../addon/tk_cps/views/act/components/act-edit.vue": () => import("./act-edit-4b544e24.js"), "../addon/tk_cps/views/actitem/actitem.vue": () => import("./actitem-08422f8b.js"), "../addon/tk_cps/views/actitem/components/actitem-edit.vue": () => import("./actitem-edit-f75d9734.js"), "../addon/tk_cps/views/actorder/actorder.vue": () => import("./actorder-274b8eb0.js"), "../addon/tk_cps/views/actorder/components/actorder-edit.vue": () => import("./actorder-edit-6dd4283a.js"), "../addon/tk_cps/views/bwcorder/bwcorder.vue": () => import("./bwcorder-ad6668bd.js"), "../addon/tk_cps/views/bwcorder/components/bwcorder-edit.vue": () => import("./bwcorder-edit-db654917.js"), "../addon/tk_cps/views/components/act-link.vue": () => import("./act-link-3773a7a6.js"), "../addon/tk_cps/views/components/act-select.vue": () => import("./act-select-29e93df5.js"), "../addon/tk_cps/views/config/bwc.vue": () => import("./bwc-655f2c08.js"), "../addon/tk_cps/views/config/index.vue": () => import("./index-122e19c0.js"), "../addon/tk_cps/views/config/share.vue": () => import("./share-655f2c08.js"), "../addon/tk_cps/views/diy/components/edit-bwc.vue": () => import("./edit-bwc-44cd6942.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-adv.vue": () => import("./edit-cps-adv-2986a447.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-card-nav.vue": () => import("./edit-cps-card-nav-6c90fb36.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-collection.vue": () => import("./edit-cps-collection-ace44f28.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-nav.vue": () => import("./edit-cps-nav-f1a89638.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-hotel.vue": () => import("./edit-hotel-da80282f.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-movie.vue": () => import("./edit-movie-e1e2a682.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-shop.vue": () => import("./edit-shop-06a3525f.js").then((i) => i._), "../addon/tk_cps/views/doc/index.vue": () => import("./index-bbb195cc.js"), "../addon/tk_cps/views/jtk/order.vue": () => import("./order-2a8ff4d3.js"), "../addon/tk_cps/views/member/components/benefits-bwc-fenxiao.vue": () => import("./benefits-bwc-fenxiao-655f2c08.js"), "../addon/tk_cps/views/member/components/benefits-bwc-level.vue": () => import("./benefits-bwc-level-655f2c08.js"), "../addon/tk_cps/views/member/components/benefits-cps-fenxiao.vue": () => import("./benefits-cps-fenxiao-655f2c08.js"), "../addon/tk_cps/views/member/components/growth-rule-bwcorder.vue": () => import("./growth-rule-bwcorder-655f2c08.js"), "../addon/tk_cps/views/member/components/growth-rule-cpsorder.vue": () => import("./growth-rule-cpsorder-655f2c08.js"), "../addon/tk_cps/views/member/components/point-rule-bwcorder.vue": () => import("./point-rule-bwcorder-655f2c08.js"), "../addon/tk_cps/views/member/components/point-rule-cpsorder.vue": () => import("./point-rule-cpsorder-655f2c08.js"), "../addon/tk_cps/views/myxq/dc_order.vue": () => import("./dc_order-65813d85.js"), "../addon/tk_cps/views/myxq/movie_order.vue": () => import("./movie_order-5e4b80ee.js"), "../addon/tk_cps/views/myxq/near_order.vue": () => import("./near_order-2c768017.js"), "../addon/tk_cps/views/myxq/other_order.vue": () => import("./other_order-26f8cac1.js"), "../addon/tk_cps/views/myxq/recharge_order.vue": () => import("./recharge_order-f0d84120.js"), "../addon/tk_cps/views/myxq/shop_order.vue": () => import("./shop_order-9c20a964.js"), "../addon/tk_cps/views/partner/components/tk-bwc.vue": () => import("./tk-bwc-655f2c08.js"), "../addon/tk_cps/views/partner/components/tk-cps.vue": () => import("./tk-cps-655f2c08.js"), "../addon/tk_cps/views/platform/components/jtk.vue": () => import("./jtk-655f2c08.js"), "../addon/tk_cps/views/platform/components/myxq.vue": () => import("./myxq-655f2c08.js"), "../addon/tk_cps/views/platform/platform.vue": () => import("./platform-655f2c08.js"), "../addon/tk_cps/views/share/components/share-edit.vue": () => import("./share-edit-e8e2847c.js"), "../addon/tk_cps/views/share/share.vue": () => import("./share-68faf373.js"), "../addon/tk_cps/views/tkfenxiao/components/commission/tk-bwc-fenxiao.vue": () => import("./tk-bwc-fenxiao-655f2c08.js"), "../addon/tk_cps/views/tkfenxiao/components/commission/tk-cps-fenxiao.vue": () => import("./tk-cps-fenxiao-655f2c08.js"), "../addon/tourism/views/components/goods-day-member-price-popup.vue": () => import("./goods-day-member-price-popup-092408a2.js"), "../addon/tourism/views/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-3a6d2baf.js"), "../addon/tourism/views/components/hotel-select-popup.vue": () => import("./hotel-select-popup-707b0bcd.js"), "../addon/tourism/views/components/tickets-select-popup.vue": () => import("./tickets-select-popup-180ac076.js"), "../addon/tourism/views/components/travel-select-popup.vue": () => import("./travel-select-popup-064ee649.js"), "../addon/tourism/views/components/verifier.vue": () => import("./verifier-655f2c08.js"), "../addon/tourism/views/diy/components/edit-tourism-hotel.vue": () => import("./edit-tourism-hotel-9ffb527f.js").then((i) => i._), "../addon/tourism/views/diy/components/edit-tourism-tickets.vue": () => import("./edit-tourism-tickets-9ffb527f.js").then((i) => i._), "../addon/tourism/views/diy/components/edit-tourism-travel.vue": () => import("./edit-tourism-travel-9ffb527f.js").then((i) => i._), "../addon/tourism/views/hotel/edit_hotel.vue": () => import("./edit_hotel-2763556a.js"), "../addon/tourism/views/hotel/edit_room.vue": () => import("./edit_room-20269b73.js"), "../addon/tourism/views/hotel/list.vue": () => import("./list-2c7214bb.js"), "../addon/tourism/views/hotel/order.vue": () => import("./order-6a0ca7ec.js"), "../addon/tourism/views/hotel/order_detail.vue": () => import("./order_detail-24ca72c5.js"), "../addon/tourism/views/hotel/room.vue": () => import("./room-655f2c08.js"), "../addon/tourism/views/hotel/select_content.vue": () => import("./select_content-47934b3f.js"), "../addon/tourism/views/index.vue": () => import("./index-f68fb002.js"), "../addon/tourism/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-7ac972e3.js"), "../addon/tourism/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-6a0ca7ec.js"), "../addon/tourism/views/poster/components/edit-tourism-goods-image.vue": () => import("./edit-tourism-goods-image-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/edit-tourism-goods-name.vue": () => import("./edit-tourism-goods-name-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/edit-tourism-goods-price.vue": () => import("./edit-tourism-goods-price-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-image.vue": () => import("./preview-tourism-goods-image-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-name.vue": () => import("./preview-tourism-goods-name-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-price.vue": () => import("./preview-tourism-goods-price-9ffb527f.js").then((i) => i._), "../addon/tourism/views/refund.vue": () => import("./refund-6a0ca7ec.js"), "../addon/tourism/views/scenic/edit_scenic.vue": () => import("./edit_scenic-35f2a4cf.js"), "../addon/tourism/views/scenic/edit_ticket.vue": () => import("./edit_ticket-655f2c08.js"), "../addon/tourism/views/scenic/list.vue": () => import("./list-032bb2e9.js"), "../addon/tourism/views/scenic/order.vue": () => import("./order-7ac972e3.js"), "../addon/tourism/views/scenic/order_detail.vue": () => import("./order_detail-7ac972e3.js"), "../addon/tourism/views/scenic/select_content.vue": () => import("./select_content-2d4a5815.js"), "../addon/tourism/views/scenic/ticket.vue": () => import("./ticket-655f2c08.js"), "../addon/tourism/views/setting.vue": () => import("./setting-655f2c08.js"), "../addon/tourism/views/site_index.vue": () => import("./site_index-37f33826.js"), "../addon/tourism/views/verify.vue": () => import("./verify-6a0ca7ec.js"), "../addon/tourism/views/way/edit.vue": () => import("./edit-d61a1a40.js"), "../addon/tourism/views/way/list.vue": () => import("./list-576f801a.js"), "../addon/tourism/views/way/order.vue": () => import("./order-24ca72c5.js"), "../addon/tourism/views/way/order_detail.vue": () => import("./order_detail-655f2c08.js"), "../addon/tourism/views/way/select_content.vue": () => import("./select_content-1ca9d641.js"), "../addon/vipcard/views/card/edit.vue": () => import("./edit-4d91903c.js"), "../addon/vipcard/views/card/list.vue": () => import("./list-9a3023c5.js"), "../addon/vipcard/views/card/record_info.vue": () => import("./record_info-6a0ca7ec.js"), "../addon/vipcard/views/card/record_list.vue": () => import("./record_list-655f2c08.js"), "../addon/vipcard/views/card/select_content.vue": () => import("./select_content-d8704fb9.js"), "../addon/vipcard/views/components/card-goods-select.vue": () => import("./card-goods-select-655f2c08.js"), "../addon/vipcard/views/components/category-edit.vue": () => import("./category-edit-8c10629e.js"), "../addon/vipcard/views/components/goods-select-popup.vue": () => import("./goods-select-popup-a962abb6.js"), "../addon/vipcard/views/components/record-info.vue": () => import("./record-info-655f2c08.js"), "../addon/vipcard/views/components/verifier.vue": () => import("./verifier-6a0ca7ec.js"), "../addon/vipcard/views/diy/components/edit-vipcard-card.vue": () => import("./edit-vipcard-card-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": () => import("./edit-vipcard-reserve-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/diy/components/edit-vipcard-store.vue": () => import("./edit-vipcard-store-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/index.vue": () => import("./index-6dbc7259.js"), "../addon/vipcard/views/order.vue": () => import("./order-8c10629e.js"), "../addon/vipcard/views/order_detail.vue": () => import("./order_detail-6a0ca7ec.js"), "../addon/vipcard/views/refund.vue": () => import("./refund-655f2c08.js"), "../addon/vipcard/views/reserve/components/add-reserve.vue": () => import("./add-reserve-655f2c08.js"), "../addon/vipcard/views/reserve/components/reserve-detail.vue": () => import("./reserve-detail-655f2c08.js"), "../addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue": () => import("./vipcard-reserve-edit-655f2c08.js"), "../addon/vipcard/views/reserve/index.vue": () => import("./index-eecf728b.js"), "../addon/vipcard/views/reserve/list.vue": () => import("./list-02a6dc3f.js"), "../addon/vipcard/views/reserve/set.vue": () => import("./set-655f2c08.js"), "../addon/vipcard/views/service/category.vue": () => import("./category-7ac972e3.js"), "../addon/vipcard/views/service/edit.vue": () => import("./edit-1ad78c96.js"), "../addon/vipcard/views/service/list.vue": () => import("./list-a5e84786.js"), "../addon/vipcard/views/service/record_info.vue": () => import("./record_info-655f2c08.js"), "../addon/vipcard/views/service/record_list.vue": () => import("./record_list-6a0ca7ec.js"), "../addon/vipcard/views/service/select_content.vue": () => import("./select_content-b29bb8fb.js"), "../addon/vipcard/views/site_index.vue": () => import("./site_index-39648ad8.js"), "../addon/vipcard/views/technician/components/add-technician.vue": () => import("./add-technician-655f2c08.js"), "../addon/vipcard/views/technician/detail.vue": () => import("./detail-be331a1e.js"), "../addon/vipcard/views/technician/list.vue": () => import("./list-3863697e.js"), "../addon/vipcard/views/verify.vue": () => import("./verify-655f2c08.js") }), createRoute = function(i, s = null) {
  const r = {
    path: `/${i.app_type}/${i.router_path}`,
    name: i.menu_key,
    meta: {
      title: i.menu_name,
      short_title: i.menu_short_name,
      icon: i.icon,
      type: i.menu_type,
      show: i.is_show,
      app: i.app_type,
      view: i.view_path,
      addon: i.addon,
      attr: i.menu_attr,
      parent_route: s && s.meta,
      sort: i.sort,
      componentName: i.menu_key
    }
  };
  if (i.menu_type == 1)
    if (i.addon) {
      let a = i.view_path;
      !a && i.router_path && (a = i.router_path), a && (r.component = loadAddonView(i.addon, a));
    } else
      r.component = modules[`../app/views/${i.view_path}.vue`];
  return r;
};
function formatRouters(i, s = null) {
  return i.map((r) => {
    const a = createRoute(r, s);
    return r.children != null && r.children && r.children.length && (a.children = formatRouters(r.children, a)), a;
  });
}
function findFirstValidRoute(i) {
  var s, r;
  for (const a of i) {
    if (((s = a.meta) == null ? void 0 : s.type) == 1 && ((r = a.meta) != null && r.show))
      return a.name;
    if (a.children) {
      const d = findFirstValidRoute(a.children);
      if (d)
        return d;
    }
  }
}
function findRules(i, s = []) {
  let r = [...s];
  for (const a of i)
    a.auth && Array.isArray(a.auth) && (r = r.concat(a.auth)), a.children && (r = findRules(a.children, r));
  return r;
}
const useTabbarStore = defineStore("tabbar", {
  state: () => ({
    curr: "",
    tabs: {}
  }),
  actions: {
    addTab(i) {
      var s;
      if (!(i.meta && i.meta.type != 1)) {
        if (this.tabs[i.name]) {
          this.tabs[i.name].query = i.query || {};
          return;
        }
        this.tabs[i.name] = {
          path: i.path,
          title: i.meta ? i.meta.title : "",
          name: i.name,
          query: i.query || {},
          componentName: (s = i.matched.at(-1)) == null ? void 0 : s.components.default.__name
        };
      }
    },
    removeTab(i) {
      delete this.tabs[i];
    },
    clearTab() {
      this.tabs = {};
    }
  },
  getters: {
    tabLength: (i) => Object.keys(i.tabs).length,
    tabNames: (i) => {
      const s = [];
      return useSystemStore().tab && Object.keys(i.tabs).forEach((r) => {
        s.push(i.tabs[r].componentName);
      }), s;
    }
  }
}), useTabbarStore$1 = useTabbarStore, test = {
  /**
   * 验证电子邮箱格式
   */
  email(i) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(i);
  },
  /**
   * 验证手机格式
   */
  mobile(i) {
    return /^1[23456789]\d{9}$/.test(i);
  },
  /**
   * 验证URL格式
   */
  url(i) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(i);
  },
  /**
   * 验证日期格式
   */
  date(i) {
    return i ? (this.number(i) && (i = +i), !/Invalid|NaN/.test(new Date(i).toString())) : !1;
  },
  /**
   * 验证ISO类型的日期格式
   */
  dateISO(i) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(i);
  },
  /**
   * 验证十进制数字
   */
  number(i) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(i);
  },
  /**
   * 验证字符串
   */
  string(i) {
    return typeof i == "string";
  },
  /**
   * 验证整数
   */
  digits(i) {
    return /^\d+$/.test(i);
  },
  /**
   * 验证身份证号码
   */
  idCard(i) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      i
    );
  },
  /**
   * 是否车牌号
   */
  carNo(i) {
    const s = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, r = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    return i.length === 7 ? r.test(i) : i.length === 8 ? s.test(i) : !1;
  },
  /**
   * 金额,只允许2位小数
   */
  amount(i) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(i);
  },
  /**
   * 验证小数
   */
  decimal(i, s) {
    const r = `^\\d+(?:\\.\\d{1,${s}})?$`;
    return new RegExp(r).test(i);
  },
  /**
   * 中文
   */
  chinese(i) {
    return /^[\u4e00-\u9fa5]+$/gi.test(i);
  },
  /**
   * 只能输入字母
   */
  letter(i) {
    return /^[a-zA-Z]*$/.test(i);
  },
  /**
   * 只能是字母或者数字
   */
  enOrNum(i) {
    return /^[0-9a-zA-Z]*$/g.test(i);
  },
  /**
   * 验证是否包含某个值
   */
  contains(i, s) {
    return i.indexOf(s) >= 0;
  },
  /**
   * 验证一个值范围[min, max]
   */
  range(i, s) {
    return i >= s[0] && i <= s[1];
  },
  /**
   * 验证一个长度范围[min, max]
   */
  rangeLength(i, s) {
    return i.length >= s[0] && i.length <= s[1];
  },
  /**
   * 是否固定电话
   */
  landline(i) {
    return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(i);
  },
  /**
   * 判断是否为空
   */
  empty(i) {
    switch (typeof i) {
      case "undefined":
        return !0;
      case "string":
        if (i.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return !0;
        break;
      case "boolean":
        if (!i)
          return !0;
        break;
      case "number":
        if (i === 0 || isNaN(i))
          return !0;
        break;
      case "object":
        if (i === null || i.length === 0)
          return !0;
        for (const s in i)
          return !1;
        return !0;
    }
    return !1;
  },
  /**
   * 是否json字符串
   */
  jsonString(i) {
    if (typeof i == "string")
      try {
        const s = JSON.parse(i);
        return !!(typeof s == "object" && s);
      } catch {
        return !1;
      }
    return !1;
  },
  /**
   * 是否数组
   */
  array(i) {
    return typeof Array.isArray == "function" ? Array.isArray(i) : Object.prototype.toString.call(i) === "[object Array]";
  },
  /**
   * 是否对象
   */
  object(i) {
    return Object.prototype.toString.call(i) === "[object Object]";
  },
  /**
   * 是否短信验证码
   */
  code(i, s = 6) {
    return new RegExp(`^\\d{${s}}$`).test(i);
  },
  /**
   * 是否函数方法
   * @param {Object} value
   */
  func(i) {
    return typeof i == "function";
  },
  /**
   * 是否promise对象
   * @param {Object} value
   */
  promise(i) {
    return this.object(i) && this.func(i.then) && this.func(i.catch);
  },
  /** 是否图片格式
   * @param {Object} value
   */
  image(i) {
    const s = i.split("?")[0];
    return /\.(jpeg|jpg|gif|png|svg|jfif|bmp|dpg)/i.test(s);
  },
  /**
   * 是否视频格式
   * @param {Object} value
   */
  video(i) {
    return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i.test(i);
  },
  /**
   * 是否为正则对象
   */
  regExp(i) {
    return i && Object.prototype.toString.call(i) === "[object RegExp]";
  },
  /**
   * 验证必填
   */
  require(i) {
    return /^\s*$/.test(i);
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
      await getSiteInfo$1().then(({ data: i }) => {
        this.siteInfo = i, storage.set({ key: "siteId", data: i.site_id || 0 }), storage.set({ key: "siteInfo", data: i }), storage.set({ key: "comparisonSiteIdStorage", data: i.site_id || 0 });
      }).catch(() => {
      });
    },
    login(i, s) {
      return new Promise((r, a) => {
        login(i, s).then(async (d) => {
          s == "admin" && Test.empty(d.data.userrole) && storage.setPrefix("site"), this.token = d.data.token, this.userInfo = d.data.userinfo, this.siteInfo = d.data.site_info || {}, setToken(d.data.token), storage.set({ key: "userinfo", data: d.data.userinfo }), storage.set({ key: "siteId", data: d.data.site_id || 0 }), storage.set({ key: "siteInfo", data: d.data.site_info || {} }), storage.set({ key: "comparisonSiteIdStorage", data: d.data.site_id || 0 }), storage.set({ key: "comparisonTokenStorage", data: d.data.token }), r(d);
        }).catch((d) => {
          a(d);
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
      const i = getAppType() == "admin" ? "/admin/login" : "/site/login";
      location.href = `${location.origin}${i}`;
    },
    getAuthMenusFn() {
      return new Promise((i, s) => {
        getAuthMenus({}).then((r) => {
          this.routers = formatRouters(r.data), this.routers.forEach((a, d) => {
            a.meta.addon !== "" && (a.children && a.children.length ? this.addonIndexRoute[a.meta.addon] = findFirstValidRoute(a.children) : this.addonIndexRoute[a.meta.addon] = a.name);
          }), this.rules = findRules(r.data), i(r);
        }).catch((r) => {
          s(r);
        });
      });
    },
    setUserInfo(i) {
      this.userInfo = i, storage.set({ key: "userinfo", data: i });
    }
  }
}), useUserStore = userStore;
class ErrorResponse {
  constructor(s, r, a) {
    q(this, "msg", "");
    q(this, "code", 0);
    q(this, "response", null);
    typeof s == "number" ? (this.code = s, this.msg = r || "", this.response = a) : (this.msg = s || "", this.code = 0, this.response = null);
  }
}
class Request {
  constructor() {
    q(this, "instance");
    q(this, "messageCache", /* @__PURE__ */ new Map());
    q(this, "CACHE_EXPIRY", 5e3);
    // 5秒内重复内容不再弹出，可自定义过期时间
    q(this, "MAX_CACHE_SIZE", 100);
    const s = envConfig.VITE_APP_BASE_URL || "/adminapi/";
    this.instance = axios$2.create({
      baseURL: s.endsWith("/") ? s : `${s}/`,
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
        lang: storage.get("lang") ?? "zh-cn"
      }
    }), this.instance.interceptors.request.use(
      (r) => (getToken() && (r.headers[envConfig.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()), r.headers[envConfig.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get("siteId") || 0, r),
      (r) => Promise.reject(new ErrorResponse(0, r.message, r.response))
    ), this.instance.interceptors.response.use(
      (r) => {
        if (r.request.responseType != "blob") {
          const a = r.data;
          return a.code != 1 ? (this.handleAuthError(a.code), a.code != 401 && r.config.showErrorMessage !== !1 && this.showElMessage({ message: a.msg, type: "error", dangerouslyUseHTMLString: !0, duration: 5e3 }), Promise.reject(a)) : (r.config.showSuccessMessage && ElMessage({ message: a.msg, type: "success" }), a);
        }
        return r.data;
      },
      (r) => (this.handleNetworkError(r), Promise.reject(new ErrorResponse(0, r.message, r.response)))
    );
  }
  /**
   * 发送get请求
   * @param url
   * @param config
   * @returns
   */
  get(s, r) {
    return this.instance.get(s, r);
  }
  /**
   * 发送post请求
   * @param url
   * @param data
   * @param config
   * @returns
   */
  post(s, r, a) {
    return this.instance.post(s, r, a);
  }
  /**
   * 发送put请求
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put(s, r, a) {
    return this.instance.put(s, r, a);
  }
  /**
   * 发送delete请求
   * @param url
   * @param config
   * @returns
   */
  delete(s, r) {
    return this.instance.delete(s, r);
  }
  /**
   * 处理网络请求错误
   * @param err
   */
  handleNetworkError(s) {
    let r = "";
    if (s.response && s.response.status)
      switch (s.response.status) {
        case 400:
          r = t$1("axios.400");
          break;
        case 401:
          r = t$1("axios.401");
          break;
        case 403:
          r = t$1("axios.403");
          break;
        case 404:
          r = (isUrl(s.response.config.baseURL) ? s.response.config.baseURL : `${location.origin}${s.response.config.baseURL}`) + t$1("axios.baseUrlError");
          break;
        case 405:
          r = t$1("axios.405");
          break;
        case 408:
          r = t$1("axios.408");
          break;
        case 409:
          r = t$1("axios.409");
          break;
        case 500:
          r = t$1("axios.500");
          break;
        case 501:
          r = t$1("axios.501");
          break;
        case 502:
          r = t$1("axios.502");
          break;
        case 503:
          r = t$1("axios.503");
          break;
        case 504:
          r = t$1("axios.504");
          break;
        case 505:
          r = t$1("axios.505");
          break;
      }
    s.message.includes("timeout") && (r = t$1("axios.timeout")), s.code == "ERR_NETWORK" && (r = (isUrl(s.config.baseURL) ? s.config.baseURL : `${location.origin}${s.config.baseURL}`) + t$1("axios.baseUrlError")), r && this.showElMessage({ dangerouslyUseHTMLString: !0, duration: 5e3, message: r, type: "error" });
  }
  handleAuthError(s) {
    switch (s) {
      case 401:
        useUserStore().logout();
        break;
    }
  }
  showElMessage(s) {
    const r = s.message, a = Date.now(), d = this.messageCache.get(r);
    if ((!d || a - d.timestamp > this.CACHE_EXPIRY) && (this.messageCache.set(r, { timestamp: a }), ElMessage(s)), this.messageCache.size > this.MAX_CACHE_SIZE)
      for (const [c, l] of this.messageCache.entries())
        a - l.timestamp > this.CACHE_EXPIRY && this.messageCache.delete(c);
  }
}
const request = new Request();
function e(i, s) {
  i = i.replace(/=/g, "");
  var r = [];
  switch (s.constructor) {
    case String:
    case Number:
    case Boolean:
      r.push(encodeURIComponent(i) + "=" + encodeURIComponent(s));
      break;
    case Array:
      s.forEach(function(a) {
        r = r.concat(e(i + "[]=", a));
      });
      break;
    case Object:
      Object.keys(s).forEach(function(a) {
        var d = s[a];
        r = r.concat(e(i + "[" + a + "]", d));
      });
  }
  return r;
}
function t(i) {
  var s = [];
  return i.forEach(function(r) {
    typeof r == "string" ? s.push(r) : s = s.concat(t(r));
  }), s;
}
/**
 * Vue Jsonp.
 * # Carry Your World #
 *
 * @author: LancerComet
 * @license: MIT
 */
var n = { install: function(i) {
  i.prototype.$jsonp = o;
} };
function o(i, s, r) {
  if (s === void 0 && (s = {}), typeof i != "string")
    throw new Error('[Vue-jsonp] Type of param "url" is not string.');
  if (typeof s != "object" || !s)
    throw new Error("[Vue-jsonp] Invalid params, should be an object.");
  return r = typeof r == "number" ? r : 5e3, new Promise(function(a, d) {
    var c = typeof s.callbackQuery == "string" ? s.callbackQuery : "callback", l = typeof s.callbackName == "string" ? s.callbackName : "jsonp_" + (Math.floor(1e5 * Math.random()) * Date.now()).toString(16);
    s[c] = l, delete s.callbackQuery, delete s.callbackName;
    var p = [];
    Object.keys(s).forEach(function(g) {
      p = p.concat(e(g, s[g]));
    });
    var u = t(p).join("&"), m = function() {
      v(), clearTimeout(f), d({ status: 400, statusText: "Bad Request" });
    }, v = function() {
      w.removeEventListener("error", m);
    }, h = function() {
      document.body.removeChild(w), delete window[l];
    }, f = null;
    r > -1 && (f = setTimeout(function() {
      v(), h(), d({ statusText: "Request Timeout", status: 408 });
    }, r)), window[l] = function(g) {
      clearTimeout(f), v(), h(), a(g);
    };
    var w = document.createElement("script");
    w.addEventListener("error", m), w.src = i + (/\?/.test(i) ? "&" : "?") + u, document.body.appendChild(w);
  });
}
const geometry$1 = {}, createCircle$1 = (i, s, r) => {
  var u, m, v;
  const a = window.TMap, d = a.LatLng;
  s.radius = s.radius ?? 1e3, s.center = s.center ?? { lat: i.getCenter().lat, lng: i.getCenter().lng };
  const c = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], l = new a.MultiCircle({
    map: i,
    styles: {
      // 设置圆形样式
      circle: new a.CircleStyle({
        color: `rgba(${c.toString()}, .4)`,
        showBorder: !0,
        borderColor: `rgb(${c.toString()})`,
        borderWidth: 2
      }),
      highlight: new a.PolygonStyle({
        color: "rgba(255, 255, 0, 0.6)"
      })
    },
    geometries: [
      {
        styleId: "circle",
        center: new d(s.center.lat, s.center.lng),
        radius: parseInt(s.radius),
        id: s.key
      }
    ]
  });
  if (geometry$1[s.key])
    try {
      geometry$1[s.key].graphical.remove(s.key), (u = geometry$1[s.key].editor) == null || u.delete();
    } catch {
    }
  let p = null;
  if (a.tools)
    try {
      p = new a.tools.GeometryEditor({
        map: i,
        overlayList: [
          {
            overlay: l,
            id: s.key,
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
      }), p.on("adjust_complete", (h) => {
        h != null && h.center && h.radius !== void 0 && (s.center = { lat: h.center.lat, lng: h.center.lng }, s.radius = parseInt(h.radius)), setTimeout(() => currentMap$1 == null ? void 0 : currentMap$1.setDraggable(!0), 100);
      }), p.on("adjust", (h) => {
        h != null && h.center && h.radius !== void 0 && (s.center = { lat: h.center.lat, lng: h.center.lng }, s.radius = parseInt(h.radius));
      }), p.on("select", () => {
        r && r(s.key);
      });
    } catch (h) {
      console.warn("创建编辑器失败:", h);
    }
  l.on("click", () => {
    var h;
    p && (p.select([s.key]), (h = p.setActiveOverlay) == null || h.call(p, s.key)), r && r(s.key);
  }), geometry$1[s.key] = { graphical: l, editor: p };
}, createPolygon$1 = (i, s, r) => {
  var v, h, f;
  const a = window.TMap, d = a.LatLng, { lat: c, lng: l } = i.getCenter();
  s.paths = s.paths ?? [
    { lat: c + 0.01, lng: l + 0.01 },
    { lat: c - 0.01, lng: l + 0.01 },
    { lat: c - 0.01, lng: l - 0.01 },
    { lat: c + 0.01, lng: l - 0.01 }
  ];
  const p = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];
  if (geometry$1[s.key])
    try {
      geometry$1[s.key].graphical.remove(s.key), (v = geometry$1[s.key].editor) == null || v.delete();
    } catch {
    }
  const u = new a.MultiPolygon({
    map: i,
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
        id: s.key,
        styleId: "polygon",
        paths: s.paths.map((w) => new d(w.lat, w.lng))
      }
    ]
  });
  let m = null;
  if (a.tools)
    try {
      m = new a.tools.GeometryEditor({
        map: i,
        overlayList: [
          {
            overlay: u,
            id: s.key,
            selectedStyleId: "highlight"
          }
        ],
        actionMode: ((f = (h = a.tools.constants) == null ? void 0 : h.EDITOR_ACTION) == null ? void 0 : f.INTERACT) || 0,
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
        w != null && w.paths && (s.paths = w.paths.map((g) => ({ lat: g.lat, lng: g.lng }))), setTimeout(() => currentMap$1 == null ? void 0 : currentMap$1.setDraggable(!0), 100);
      }), m.on("adjust", (w) => {
        w != null && w.paths && (s.paths = w.paths.map((g) => ({ lat: g.lat, lng: g.lng })));
      }), m.on("select", () => {
        r && r(s.key);
      });
    } catch (w) {
      console.warn("创建编辑器失败:", w);
    }
  u.on("click", () => {
    var w;
    m && (m.select([s.key]), (w = m.setActiveOverlay) == null || w.call(m, s.key)), r && r(s.key);
  }), geometry$1[s.key] = { graphical: u, editor: m };
}, deleteGeometry$1 = (i) => {
  var s, r;
  if (geometry$1[i])
    try {
      (s = geometry$1[i].graphical) == null || s.remove(i), (r = geometry$1[i].editor) == null || r.delete(), delete geometry$1[i];
    } catch (a) {
      console.warn("删除图形失败:", a);
    }
}, clearAllGeometry$1 = () => {
  Object.keys(geometry$1).forEach(deleteGeometry$1);
};
let currentMap$1 = null;
const setMapInstance$1 = (i) => {
  currentMap$1 = i;
}, selectGeometry$1 = (i) => {
  var s, r, a, d, c;
  if ((s = geometry$1[i]) != null && s.editor)
    try {
      Object.keys(geometry$1).forEach((l) => {
        var p, u, m, v, h;
        l !== i && ((p = geometry$1[l]) != null && p.editor) && ((m = (u = geometry$1[l].editor).deselect) == null || m.call(u), (h = (v = geometry$1[l].editor).setActiveOverlay) == null || h.call(v, null));
      }), (a = (r = geometry$1[i].editor).select) == null || a.call(r, [i]), (c = (d = geometry$1[i].editor).setActiveOverlay) == null || c.call(d, i);
    } catch {
    }
}, deselectAllGeometry$1 = () => {
  Object.keys(geometry$1).forEach((i) => {
    var s, r, a, d, c, l;
    (a = (r = (s = geometry$1[i]) == null ? void 0 : s.editor) == null ? void 0 : r.deselect) == null || a.call(r), (l = (c = (d = geometry$1[i]) == null ? void 0 : d.editor) == null ? void 0 : c.setActiveOverlay) == null || l.call(c, null);
  }), currentMap$1 == null || currentMap$1.setDraggable(!0);
}, createMarker$1 = (i) => {
  const s = window.TMap, r = s.LatLng;
  return new s.MultiMarker({
    map: i,
    geometries: [
      {
        id: "center",
        position: i.getCenter()
      }
    ]
  });
}, latLngToAddress$1 = (i) => o(`https://apis.map.qq.com/ws/geocoder/v1/?key=${i.mapKey}&location=${i.lat},${i.lng}&output=jsonp&callback=latLngToAddress`, { callbackName: "latLngToAddress" }), addressToLatLng$1 = (i) => o(`https://apis.map.qq.com/ws/geocoder/v1/?key=${i.mapKey}&address=${i.address}&output=jsonp&callback=addressToLatLng`, { callbackName: "addressToLatLng" }), coreVueModules = {
  .../* @__PURE__ */ Object.assign({ "../app/components/cloud-build/index.vue": () => import("./index-96a6ebb9.js"), "../app/components/upgrade-log/index.vue": () => import("./index-15ec46f8.js"), "../app/components/upgrade/index.vue": () => import("./index-2e96eff3.js"), "../app/components/user-info-edit/index.vue": () => import("./index-bee8054b.js"), "../app/components/weappupload/index.vue": () => import("./index-5448e69b.js"), "../app/views/app/authorize.vue": () => import("./authorize-bde97c2c.js"), "../app/views/app/index.vue": () => import("./index-d5d9c3a4.js"), "../app/views/app/marketing.vue": () => import("./marketing-6b9b21dd.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-13734aef.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-f36e89ab.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-69b4b827.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-c745c4e7.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-6b1673e5.js"), "../app/views/auth/log.vue": () => import("./log-4bffb562.js"), "../app/views/auth/menu.vue": () => import("./menu-e68d3630.js"), "../app/views/auth/role.vue": () => import("./role-94ed5bbb.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-dcff8328.js"), "../app/views/auth/user.vue": () => import("./user-26d5a20e.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-d148ac73.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-87334167.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-a2388e57.js"), "../app/views/channel/app/access.vue": () => import("./access-14ea3801.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-2efbcf75.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-0e4dce73.js"), "../app/views/channel/app/config.vue": () => import("./config-a41b13be.js"), "../app/views/channel/app/version.vue": () => import("./version-299ff25a.js"), "../app/views/channel/h5/config.vue": () => import("./config-f5786c96.js"), "../app/views/channel/pc/config.vue": () => import("./config-8ac16b7f.js"), "../app/views/channel/weapp/access.vue": () => import("./access-b0aa7189.js"), "../app/views/channel/weapp/code.vue": () => import("./code-80766c19.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-57b79d46.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-0ea8c7a2.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-2347e9d8.js"), "../app/views/channel/weapp/config.vue": () => import("./config-c68730d5.js"), "../app/views/channel/weapp/course.vue": () => import("./course-3de57fc3.js"), "../app/views/channel/weapp/template.vue": () => import("./template-6b53973f.js"), "../app/views/channel/wechat/access.vue": () => import("./access-cfb75b96.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-c02b618d.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-8b1471ef.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-21fdec73.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-18b4896b.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-9454918e.js"), "../app/views/channel/wechat/config.vue": () => import("./config-ba9d1418.js"), "../app/views/channel/wechat/course.vue": () => import("./course-14211f2e.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-53ffaaa6.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-c259f740.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-eacae39a.js"), "../app/views/channel/wechat/template.vue": () => import("./template-66b54776.js"), "../app/views/dict/components/dict.vue": () => import("./dict-36b4634d.js"), "../app/views/dict/components/edit.vue": () => import("./edit-15ae0397.js"), "../app/views/dict/list.vue": () => import("./list-55104f34.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-d83eafd3.js").then((i) => i.a), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-b2988fa2.js").then((i) => i._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-a6ded40a.js").then((i) => i._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-ae2872b7.js").then((i) => i._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-5f1af6e3.js").then((i) => i._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-010fcc21.js").then((i) => i._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-86465b79.js").then((i) => i._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-e7543b53.js").then((i) => i._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-83fb1639.js").then((i) => i._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-048079f6.js").then((i) => i._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-931360e1.js").then((i) => i._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-ccdf1429.js").then((i) => i._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-b0951e36.js").then((i) => i._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-b9c89ea2.js").then((i) => i._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-86bd790d.js").then((i) => i._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-ce21a969.js").then((i) => i._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-c37e945f.js").then((i) => i._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-fabc77a4.js").then((i) => i.a), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-ee178148.js").then((i) => i._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-5cd6b9d9.js").then((i) => i._), "../app/views/diy/edit.vue": () => import("./edit-ca7427af.js"), "../app/views/diy/index.vue": () => import("./index-faced983.js"), "../app/views/diy/list.vue": () => import("./list-585ba349.js"), "../app/views/diy/member.vue": () => import("./member-bd341c2e.js"), "../app/views/diy/route.vue": () => import("./route-740563e8.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-a11398e7.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-30e46e81.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-e980658f.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-e9536fe1.js").then((i) => i._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-4dba6b08.js").then((i) => i._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-75dcd922.js").then((i) => i._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-fa3cea1a.js").then((i) => i._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-32a586d6.js").then((i) => i._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-b09a7756.js").then((i) => i._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-4ae5642f.js").then((i) => i._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-8976ef14.js").then((i) => i._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-a76d05fe.js").then((i) => i._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-9662b4f9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-8bed39b9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-732c22ae.js").then((i) => i._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-08087fef.js").then((i) => i._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-0e94d3b9.js").then((i) => i._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-4003e67e.js").then((i) => i._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-8e9e8800.js").then((i) => i._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-658fdd3b.js").then((i) => i._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-74839b43.js").then((i) => i._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-6ba377f7.js").then((i) => i._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-18eda35c.js").then((i) => i._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-8fe9ba64.js").then((i) => i._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-4eec9aa7.js").then((i) => i._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-bc5e6fda.js").then((i) => i._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-6e2d0ec4.js").then((i) => i._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-1f350ff8.js").then((i) => i._), "../app/views/diy_form/edit.vue": () => import("./edit-c8a036dc.js"), "../app/views/diy_form/list.vue": () => import("./list-966602fc.js"), "../app/views/diy_form/records.vue": () => import("./records-8f243b23.js"), "../app/views/error/404.vue": () => import("./404-e379a604.js"), "../app/views/finance/account.vue": () => import("./account-cbf8004a.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-5ac2ea47.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-0bef3f0d.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-14b044be.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-425df799.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-e6242919.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-2842b8ed.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-8b680bf0.js"), "../app/views/home/index.vue": () => import("./index-0503d1d1.js"), "../app/views/home/personal.vue": () => import("./personal-01bda0ca.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-7f0169b7.js"), "../app/views/index/index.vue": () => import("./index-6f5bc254.js"), "../app/views/index/preview.vue": () => import("./preview-27b18431.js"), "../app/views/index/store.vue": () => import("./store-1952d263.js"), "../app/views/index/tools.vue": () => import("./tools-bbd7f848.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-e159b9b3.js"), "../app/views/login/index.vue": () => import("./index-d0523190.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-746d5251.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-f1c10a60.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-7501acf2.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-255dc40c.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-9b2240da.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-cc7630a4.js"), "../app/views/marketing/verify.vue": () => import("./verify-70dd1962.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-61945735.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-d701b2d9.js"), "../app/views/member/balance.vue": () => import("./balance-b0327ee2.js"), "../app/views/member/commission.vue": () => import("./commission-0801b9dc.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-3f11b78b.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-0357fe22.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-64dbb8ab.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-f229e3fc.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-59cb6d90.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-9a3ead44.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-7afcd06b.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-16492aab.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-11d84a0d.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-43f2101d.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-992c7e1c.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-d53ad7b6.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-fef1b132.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-34385148.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-88e710b8.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-1b1dfca3.js"), "../app/views/member/growth.vue": () => import("./growth-b3c10897.js"), "../app/views/member/label.vue": () => import("./label-52c93bfe.js"), "../app/views/member/level.vue": () => import("./level-b6733396.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-c05fc124.js"), "../app/views/member/member.vue": () => import("./member-bc64f202.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-66d19bf6.js"), "../app/views/member/point.vue": () => import("./point-751ec6cf.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-838603a5.js").then((i) => i._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-84e09edb.js").then((i) => i._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-41bc1682.js").then((i) => i._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-58065962.js").then((i) => i._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-1dd780c7.js").then((i) => i._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-3ee4f4a0.js").then((i) => i._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-297c2f61.js").then((i) => i._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-f346cd75.js").then((i) => i._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-3719160d.js").then((i) => i._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-c5c041ae.js").then((i) => i._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-e04e33e5.js").then((i) => i._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-d29b4f74.js").then((i) => i._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-6e2fcfdd.js").then((i) => i._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-03e24634.js").then((i) => i._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-6a3056b6.js").then((i) => i._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-c1939f95.js").then((i) => i._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-8c0eb047.js").then((i) => i._), "../app/views/poster/edit.vue": () => import("./edit-15fbc767.js"), "../app/views/poster/list.vue": () => import("./list-4f91267f.js"), "../app/views/printer/edit.vue": () => import("./edit-bd4efedf.js"), "../app/views/printer/list.vue": () => import("./list-d2f8098d.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-5bae101d.js"), "../app/views/printer/template_list.vue": () => import("./template_list-b43025b7.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-9c5acac1.js"), "../app/views/setting/agreement.vue": () => import("./agreement-0edec799.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-a23c342d.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-72c61356.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-295b7bf7.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-2ab8382f.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-15726b29.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-9aa6e8b4.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-3fdfb11f.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-bafdc9c8.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-9958b726.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-7f2e6bde.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-fe3d49dd.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-81cfc47e.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-864d2cac.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-aea24cdb.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-1dbe4bfd.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-76dac807.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-ace14169.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-91a2821e.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-c38c4b4b.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-970e8134.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-2dcaddc1.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-9b787def.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-c7a28d84.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-3059b011.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-44e8c284.js"), "../app/views/setting/copyright.vue": () => import("./copyright-0d6cbcb1.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-52ce01d2.js"), "../app/views/setting/export.vue": () => import("./export-0c2104fa.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-a983227f.js"), "../app/views/setting/layout.vue": () => import("./layout-00e1f747.js"), "../app/views/setting/login.vue": () => import("./login-e22b0b27.js"), "../app/views/setting/map.vue": () => import("./map-c1cc20eb.js"), "../app/views/setting/member.vue": () => import("./member-3f2997c0.js"), "../app/views/setting/notice.vue": () => import("./notice-4adacc6b.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-3545f181.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-9a52b2f7.js"), "../app/views/setting/pay.vue": () => import("./pay-1fb876e3.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-5151996e.js"), "../app/views/setting/sms.vue": () => import("./sms-6695f5ba.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-8b71c624.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-a5049e7b.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-57d21bc5.js"), "../app/views/setting/storage.vue": () => import("./storage-566fdaa3.js"), "../app/views/setting/system.vue": () => import("./system-af7e6bbf.js"), "../app/views/setting/transfer.vue": () => import("./transfer-64fd4e33.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-90b42d80.js"), "../app/views/setting/weapp.vue": () => import("./weapp-365a9a72.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-4e5e3494.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-bbe872fe.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-cbf80b46.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-4e5c4664.js"), "../app/views/site/group.vue": () => import("./group-be681254.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-ff653579.js"), "../app/views/site/info.vue": () => import("./info-4502cd2c.js"), "../app/views/site/list.vue": () => import("./list-38a59757.js"), "../app/views/site/manage.vue": () => import("./manage-0165c8fa.js"), "../app/views/site/user.vue": () => import("./user-5a92aee2.js"), "../app/views/site/user_info.vue": () => import("./user_info-75079a01.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-85f4964b.js"), "../app/views/tools/addon/index.vue": () => import("./index-d4d84ebd.js"), "../app/views/tools/addon/list.vue": () => import("./list-4ed7b75c.js"), "../app/views/tools/attachment.vue": () => import("./attachment-a0247ce4.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-fa875514.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-4f27034b.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-cd17f4cc.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-5aa1d135.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-c8a064b8.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-bcfffb44.js"), "../app/views/tools/code/edit.vue": () => import("./edit-cd43246c.js"), "../app/views/tools/code/index.vue": () => import("./index-43b589fc.js"), "../app/views/tools/code/list.vue": () => import("./list-b4a1a0b2.js"), "../app/views/tools/detection.vue": () => import("./detection-1d04fa5d.js"), "../app/views/tools/schedule.vue": () => import("./schedule-e45718de.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-60f7802e.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-87eb80a4.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-87297543.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-fd26a1cf.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-07b82208.js") }),
  .../* @__PURE__ */ Object.assign({ "../components/diy-link/index.vue": () => import("./index-d117e12e.js"), "../components/diy-page/index.vue": () => Promise.resolve().then(() => index$4), "../components/editor/index.vue": () => Promise.resolve().then(() => index), "../components/export-sure/index.vue": () => import("./index-bf0959e6.js"), "../components/heat-map/index.vue": () => import("./index-8f1ab446.js"), "../components/icon/index.vue": () => import("./index-9c1a7b4f.js"), "../components/map-selector/index.vue": () => Promise.resolve().then(() => index$2), "../components/markdown/index.vue": () => import("./index-ab68dd3b.js"), "../components/popover-input/index.vue": () => import("./index-843b75c5.js"), "../components/range-input/index.vue": () => import("./index-6f9975ac.js"), "../components/select-area/index.vue": () => import("./index-217e235d.js"), "../components/select-icon/index.vue": () => import("./index-7c5336f9.js"), "../components/spread-popup/index.vue": () => import("./index-4d083642.js"), "../components/upload-attachment/attachment.vue": () => import("./attachment-353e9e78.js"), "../components/upload-attachment/index.vue": () => import("./index-243c86fe.js"), "../components/upload-audio/index.vue": () => import("./index-62ffa757.js"), "../components/upload-file/index.vue": () => import("./index-9ab57948.js"), "../components/upload-image/index.vue": () => Promise.resolve().then(() => index$6), "../components/upload-video/index.vue": () => import("./index-d3250e42.js"), "../components/verifition/Verify.vue": () => import("./Verify-334189a4.js"), "../components/verifition/Verify/VerifyPoints.vue": () => import("./VerifyPoints-1312c629.js"), "../components/verifition/Verify/VerifySlide.vue": () => import("./VerifySlide-c25de506.js"), "../components/video-player/index.vue": () => import("./index-2ea3bff9.js") }),
  .../* @__PURE__ */ Object.assign({ "../layout/admin/components/aside/index.vue": () => import("./index-153214e2.js"), "../layout/admin/components/aside/menu-item.vue": () => import("./menu-item-0bff585b.js"), "../layout/admin/components/aside/side.vue": () => import("./side-f011a4fc.js"), "../layout/admin/components/header/index.vue": () => import("./index-37acc08a.js"), "../layout/admin/components/header/layout-setting.vue": () => import("./layout-setting-4a3ea8fc.js"), "../layout/admin/components/header/message.vue": () => import("./message-863df290.js"), "../layout/admin/components/header/switch-lang.vue": () => import("./switch-lang-56e993a6.js"), "../layout/admin/components/header/user-info.vue": () => import("./user-info-27acc457.js"), "../layout/admin/components/tabs.vue": () => import("./tabs-317e9aff.js"), "../layout/admin/index.vue": () => import("./index-a54e3921.js"), "../layout/admin_simplicity/components/aside/index.vue": () => import("./index-1d745d21.js"), "../layout/admin_simplicity/components/aside/menu-item.vue": () => import("./menu-item-3bd75c30.js"), "../layout/admin_simplicity/components/aside/side.vue": () => import("./side-9f780565.js"), "../layout/admin_simplicity/components/header/index.vue": () => import("./index-b84532fd.js"), "../layout/admin_simplicity/components/header/layout-setting.vue": () => import("./layout-setting-52b15782.js"), "../layout/admin_simplicity/components/header/message.vue": () => import("./message-ff91082d.js"), "../layout/admin_simplicity/components/header/switch-lang.vue": () => import("./switch-lang-23f64991.js"), "../layout/admin_simplicity/components/header/user-info.vue": () => import("./user-info-ba5e32ce.js"), "../layout/admin_simplicity/components/tabs.vue": () => import("./tabs-8573578d.js"), "../layout/admin_simplicity/index.vue": () => import("./index-b1c3c45d.js"), "../layout/bussiness/components/aside/index.vue": () => import("./index-30536dc3.js"), "../layout/bussiness/components/aside/menu-item.vue": () => import("./menu-item-bf890c1d.js"), "../layout/bussiness/components/aside/side.vue": () => import("./side-1e422913.js"), "../layout/bussiness/components/header/index.vue": () => import("./index-c6f38a9b.js"), "../layout/bussiness/components/header/layout-setting.vue": () => import("./layout-setting-d54d6cef.js"), "../layout/bussiness/components/header/switch-lang.vue": () => import("./switch-lang-b7ea3ed2.js"), "../layout/bussiness/components/header/user-info.vue": () => import("./user-info-f7c81469.js"), "../layout/bussiness/components/tabs.vue": () => import("./tabs-3079b125.js"), "../layout/bussiness/index.vue": () => import("./index-9b8d140e.js"), "../layout/darkside/components/aside/index.vue": () => import("./index-958215d3.js"), "../layout/darkside/components/aside/menu-item.vue": () => import("./menu-item-2c356df2.js"), "../layout/darkside/components/aside/side.vue": () => import("./side-f9944a77.js"), "../layout/darkside/components/header/index.vue": () => import("./index-1af1e604.js"), "../layout/darkside/components/header/layout-setting.vue": () => import("./layout-setting-294adceb.js"), "../layout/darkside/components/header/switch-lang.vue": () => import("./switch-lang-7a33bc5e.js"), "../layout/darkside/components/header/user-info.vue": () => import("./user-info-b23d90de.js"), "../layout/darkside/components/tabs.vue": () => import("./tabs-cc46b959.js"), "../layout/darkside/index.vue": () => import("./index-497427da.js"), "../layout/decorate/index.vue": () => Promise.resolve().then(() => index$8), "../layout/default/components/aside/index.vue": () => import("./index-cc576981.js"), "../layout/default/components/aside/menu-item.vue": () => import("./menu-item-a7faeafa.js"), "../layout/default/components/aside/side.vue": () => import("./side-5cce3f3c.js"), "../layout/default/components/header/index.vue": () => import("./index-5736e615.js"), "../layout/default/components/header/layout-setting.vue": () => import("./layout-setting-52f5dd48.js"), "../layout/default/components/header/switch-lang.vue": () => import("./switch-lang-00b620fa.js"), "../layout/default/components/header/user-info.vue": () => import("./user-info-baeb24f4.js"), "../layout/default/components/tabs.vue": () => import("./tabs-521a0081.js"), "../layout/default/index.vue": () => import("./index-540169a0.js"), "../layout/index.vue": () => Promise.resolve().then(() => index$9), "../layout/lightside/components/aside/index.vue": () => import("./index-41a66a2a.js"), "../layout/lightside/components/aside/menu-item.vue": () => import("./menu-item-5129d607.js"), "../layout/lightside/components/aside/side.vue": () => import("./side-f450d6b6.js"), "../layout/lightside/components/header/index.vue": () => import("./index-01f10721.js"), "../layout/lightside/components/header/layout-setting.vue": () => import("./layout-setting-e906f404.js"), "../layout/lightside/components/header/switch-lang.vue": () => import("./switch-lang-cdb63ada.js"), "../layout/lightside/components/header/user-info.vue": () => import("./user-info-417d863a.js"), "../layout/lightside/components/tabs.vue": () => import("./tabs-a49fa914.js"), "../layout/lightside/index.vue": () => import("./index-d6be7947.js"), "../layout/profession/components/aside/index.vue": () => import("./index-0f334d00.js"), "../layout/profession/components/aside/menu-item.vue": () => import("./menu-item-30d2251e.js"), "../layout/profession/components/aside/side.vue": () => import("./side-6a41b361.js"), "../layout/profession/components/header/index.vue": () => import("./index-69ff447b.js"), "../layout/profession/components/header/layout-setting.vue": () => import("./layout-setting-de17f77a.js"), "../layout/profession/components/header/switch-lang.vue": () => import("./switch-lang-fde7614e.js"), "../layout/profession/components/header/user-info.vue": () => import("./user-info-b318852f.js"), "../layout/profession/components/tabs.vue": () => import("./tabs-e2a3657d.js"), "../layout/profession/index.vue": () => import("./index-bd748d3a.js"), "../layout/routine/components/aside/index.vue": () => import("./index-55e507bf.js"), "../layout/routine/components/aside/menu-item.vue": () => import("./menu-item-b88fc1f3.js"), "../layout/routine/components/aside/side.vue": () => import("./side-8f7bcbb1.js"), "../layout/routine/components/header/index.vue": () => import("./index-70d9690a.js"), "../layout/routine/components/header/layout-setting.vue": () => import("./layout-setting-ee221261.js"), "../layout/routine/components/header/switch-lang.vue": () => import("./switch-lang-511be1b1.js"), "../layout/routine/components/header/user-info.vue": () => import("./user-info-beb3e270.js"), "../layout/routine/components/tabs.vue": () => import("./tabs-d3b214d8.js"), "../layout/routine/index.vue": () => import("./index-6ac5a94b.js") })
};
function normalizeComponentKey(i) {
  return i.replace(/^@\//, "").replace(/^\/src\//, "").replace(/^\.\.\//, "").replace(/\\/g, "/");
}
function findCoreModuleLoader(i) {
  const s = coreVueModules;
  if (s[i])
    return s[i];
  const r = normalizeComponentKey(i), a = Object.keys(s).find((d) => normalizeComponentKey(d) === r || normalizeComponentKey(d).endsWith(`/${r}`));
  return a ? s[a] : void 0;
}
function resolveAsyncComponent(i) {
  return defineAsyncComponent(async () => {
    const s = findCoreModuleLoader(i);
    return s ? (await s()).default : (await loadCoreVueModule(i)).default;
  });
}
const allAddonVueModules = /* @__PURE__ */ Object.assign({ "../addon/cms/views/article/category.vue": () => import("./category-1ad78c96.js"), "../addon/cms/views/article/components/edit-category.vue": () => import("./edit-category-6a0ca7ec.js"), "../addon/cms/views/article/edit.vue": () => import("./edit-062c26e9.js"), "../addon/cms/views/article/list.vue": () => import("./list-bb70d698.js"), "../addon/cms/views/diy/components/edit-article.vue": () => import("./edit-article-9ffb527f.js").then((i) => i._), "../addon/erp/views/purchase/detail.vue": () => import("./detail-821a9dcd.js"), "../addon/erp/views/purchase/instock.vue": () => import("./instock-19825e3d.js"), "../addon/erp/views/purchase/list.vue": () => import("./list-5afdbe73.js"), "../addon/erp/views/sales/detail.vue": () => import("./detail-557d388b.js"), "../addon/erp/views/sales/list.vue": () => import("./list-8331b225.js"), "../addon/erp/views/sales/outstock.vue": () => import("./outstock-ee3e45f4.js"), "../addon/erp/views/stock/detail.vue": () => import("./detail-aae3e67a.js"), "../addon/erp/views/stock/list.vue": () => import("./list-fb6539a8.js"), "../addon/erp/views/stock/stockIn.vue": () => import("./stockIn-e3bdb257.js"), "../addon/erp/views/stock/stockOut.vue": () => import("./stockOut-890ef8a8.js"), "../addon/friend_help/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-655f2c08.js"), "../addon/friend_help/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-3c82f3af.js"), "../addon/friend_help/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-b9312078.js"), "../addon/friend_help/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-655f2c08.js"), "../addon/friend_help/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-264d5f02.js"), "../addon/friend_help/views/active/components/goods-select-content.vue": () => import("./goods-select-content-db219848.js"), "../addon/friend_help/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-682abbfb.js"), "../addon/friend_help/views/active/components/select-member.vue": () => import("./select-member-afe1b9f0.js"), "../addon/friend_help/views/active/edit.vue": () => import("./edit-5e422f94.js"), "../addon/friend_help/views/active/list.vue": () => import("./list-ab2518bc.js"), "../addon/friend_help/views/active/stat.vue": () => import("./stat-9e6d69d7.js"), "../addon/friend_help/views/config/config.vue": () => import("./config-b0ffb798.js"), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-basic-info.vue": () => import("./edit-friend-help-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-bottom.vue": () => import("./edit-friend-help-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-desc.vue": () => import("./edit-friend-help-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-friend-help-info.vue": () => import("./edit-friend-help-activity-goods-detail-friend-help-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-gameplay.vue": () => import("./edit-friend-help-activity-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-goods-info.vue": () => import("./edit-friend-help-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-activity-goods-detail-progress.vue": () => import("./edit-friend-help-activity-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-carousel.vue": () => import("./edit-friend-help-carousel-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-basic-info.vue": () => import("./edit-friend-help-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-bottom.vue": () => import("./edit-friend-help-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-desc.vue": () => import("./edit-friend-help-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-gameplay.vue": () => import("./edit-friend-help-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-progress.vue": () => import("./edit-friend-help-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-goods-detail-purchase-service.vue": () => import("./edit-friend-help-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-hot.vue": () => import("./edit-friend-help-hot-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-list.vue": () => import("./edit-friend-help-list-472311e7.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-member-info.vue": () => import("./edit-friend-help-member-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/diy/components/edit-friend-help-order-info.vue": () => import("./edit-friend-help-order-info-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/launch/components/launch-detail-popup.vue": () => import("./launch-detail-popup-655f2c08.js"), "../addon/friend_help/views/launch/list.vue": () => import("./list-2f0d7313.js"), "../addon/friend_help/views/order/components/order-notes.vue": () => import("./order-notes-8c10629e.js"), "../addon/friend_help/views/order/components/refund-detail.vue": () => import("./refund-detail-a2708421.js"), "../addon/friend_help/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-7ac972e3.js"), "../addon/friend_help/views/order/detail.vue": () => import("./detail-dc207ced.js"), "../addon/friend_help/views/order/list.vue": () => import("./list-333b045e.js"), "../addon/friend_help/views/order/refund.vue": () => import("./refund-a46a02f2.js"), "../addon/friend_help/views/poster/components/edit-discount-desc.vue": () => import("./edit-discount-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-3656154e.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-3656154e.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-min-price.vue": () => import("./edit-min-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-original-desc.vue": () => import("./edit-original-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-original-price.vue": () => import("./edit-original-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/edit-price.vue": () => import("./edit-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-discount-desc.vue": () => import("./preview-discount-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-min-price.vue": () => import("./preview-min-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-original-desc.vue": () => import("./preview-original-desc-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-original-price.vue": () => import("./preview-original-price-9ffb527f.js").then((i) => i._), "../addon/friend_help/views/poster/components/preview-price.vue": () => import("./preview-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/addclock/addclock_config.vue": () => import("./addclock_config-faf19172.js"), "../addon/higohome/views/addclock/components/addclock-config-edit.vue": () => import("./addclock-config-edit-6ec2134b.js"), "../addon/higohome/views/area/area_list.vue": () => import("./area_list-f3509cc8.js"), "../addon/higohome/views/area/components/area-list-edit.vue": () => import("./area-list-edit-7d472406.js"), "../addon/higohome/views/browe/browe.vue": () => import("./browe-46a06830.js"), "../addon/higohome/views/browe/components/browe-edit.vue": () => import("./browe-edit-a77e5444.js"), "../addon/higohome/views/call/call_config.vue": () => import("./call_config-ec7576bc.js"), "../addon/higohome/views/call/components/call-config-edit.vue": () => import("./call-config-edit-d0ac7a76.js"), "../addon/higohome/views/call/recodevoice.vue": () => import("./recodevoice-dea8146b.js"), "../addon/higohome/views/call/recodevoice_edit.vue": () => import("./recodevoice_edit-655f2c08.js"), "../addon/higohome/views/cash/cash_out.vue": () => import("./cash_out-04b2d10a.js"), "../addon/higohome/views/cash/components/cash-out-edit.vue": () => import("./cash-out-edit-cfad1f13.js"), "../addon/higohome/views/channels/channel_codes.vue": () => import("./channel_codes-9051719d.js"), "../addon/higohome/views/channels/channel_wallet.vue": () => import("./channel_wallet-42fbe04a.js"), "../addon/higohome/views/channels/channels_cate.vue": () => import("./channels_cate-bcbb2ceb.js"), "../addon/higohome/views/channels/channels_list.vue": () => import("./channels_list-7b1a979a.js"), "../addon/higohome/views/channels/channels_set.vue": () => import("./channels_set-e5af7114.js"), "../addon/higohome/views/channels/components/channel-codes-edit.vue": () => import("./channel-codes-edit-94c56849.js"), "../addon/higohome/views/channels/components/channel-wallet-edit.vue": () => import("./channel-wallet-edit-bee8c6df.js"), "../addon/higohome/views/channels/components/channels-cate-edit.vue": () => import("./channels-cate-edit-b267dbdd.js"), "../addon/higohome/views/channels/components/channels-set-edit.vue": () => import("./channels-set-edit-425cca75.js"), "../addon/higohome/views/channels/components/channesl-list-edit.vue": () => import("./channesl-list-edit-778f9dd7.js"), "../addon/higohome/views/city/city_list.vue": () => import("./city_list-a8df6ae5.js"), "../addon/higohome/views/city/components/city-list-edit.vue": () => import("./city-list-edit-178da71c.js"), "../addon/higohome/views/comment/comment_label.vue": () => import("./comment_label-0e8edc11.js"), "../addon/higohome/views/comment/components/comment-label-edit.vue": () => import("./comment-label-edit-955803ef.js"), "../addon/higohome/views/comment/components/technician-comment-edit.vue": () => import("./technician-comment-edit-c3807fe3.js"), "../addon/higohome/views/comment/technician_comment.vue": () => import("./technician_comment-aabfe78b.js"), "../addon/higohome/views/commission/commission_salesman.vue": () => import("./commission_salesman-06237c49.js"), "../addon/higohome/views/commission/components/commission-salesman-edit.vue": () => import("./commission-salesman-edit-147aa26a.js"), "../addon/higohome/views/common/common.vue": () => import("./common-1445c036.js"), "../addon/higohome/views/common/good-cate.vue": () => import("./good-cate-a256533f.js"), "../addon/higohome/views/common/member.vue": () => import("./member-655f2c08.js"), "../addon/higohome/views/common/select-goods-pop.vue": () => import("./select-goods-pop-655f2c08.js"), "../addon/higohome/views/config/components/order-config-edit.vue": () => import("./order-config-edit-a9ca7c1f.js"), "../addon/higohome/views/config/fenxiao.vue": () => import("./fenxiao-655f2c08.js"), "../addon/higohome/views/config/order_config.vue": () => import("./order_config-d4a02654.js"), "../addon/higohome/views/coupon/coupon.vue": () => import("./coupon-addae295.js"), "../addon/higohome/views/coupon/coupon_edit.vue": () => import("./coupon_edit-f4935af0.js"), "../addon/higohome/views/distribution/components/distribution-config-edit.vue": () => import("./distribution-config-edit-6052f8a5.js"), "../addon/higohome/views/distribution/components/distribution-list-edit.vue": () => import("./distribution-list-edit-7b733135.js"), "../addon/higohome/views/distribution/components/distribution-partner-wallet-edit.vue": () => import("./distribution-partner-wallet-edit-0cbdb704.js"), "../addon/higohome/views/distribution/distribution_config.vue": () => import("./distribution_config-2436c50c.js"), "../addon/higohome/views/distribution/distribution_list.vue": () => import("./distribution_list-12c00970.js"), "../addon/higohome/views/distribution/distribution_partner.vue": () => import("./distribution_partner-2d744107.js"), "../addon/higohome/views/distribution/distribution_partner_wallet.vue": () => import("./distribution_partner_wallet-9ecf2e9c.js"), "../addon/higohome/views/diy/components/edit-agent-register.vue": () => import("./edit-agent-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-any-form.vue": () => import("./edit-any-form-1234aef5.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-carousel-loction.vue": () => import("./edit-carousel-loction-5c382abe.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-category-index.vue": () => import("./edit-category-index-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-channel-register.vue": () => import("./edit-channel-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-distribution-register.vue": () => import("./edit-distribution-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-good-big-list.vue": () => import("./edit-good-big-list-c2263a2f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-goods-index.vue": () => import("./edit-goods-index-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-items-list-two.vue": () => import("./edit-items-list-two-ef6c49eb.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-items-list.vue": () => import("./edit-items-list-3a182c66.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-play-video.vue": () => import("./edit-play-video-8d4682b8.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-recommend-tech.vue": () => import("./edit-recommend-tech-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-salesman-register.vue": () => import("./edit-salesman-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-service-tools.vue": () => import("./edit-service-tools-644878e8.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-specials-list.vue": () => import("./edit-specials-list-587829f2.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-store-register.vue": () => import("./edit-store-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-data.vue": () => import("./edit-technician-data-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-info.vue": () => import("./edit-technician-info-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-order.vue": () => import("./edit-technician-order-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-register.vue": () => import("./edit-technician-register-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technician-tools.vue": () => import("./edit-technician-tools-9ffb527f.js").then((i) => i._), "../addon/higohome/views/diy/components/edit-technicican-list.vue": () => import("./edit-technicican-list-9ffb527f.js").then((i) => i._), "../addon/higohome/views/dynamic/components/dynamic-comment-edit.vue": () => import("./dynamic-comment-edit-01e606f3.js"), "../addon/higohome/views/dynamic/components/dynamic-config-edit.vue": () => import("./dynamic-config-edit-52032320.js"), "../addon/higohome/views/dynamic/components/dynamic-edit.vue": () => import("./dynamic-edit-f29f7b84.js"), "../addon/higohome/views/dynamic/dynamic.vue": () => import("./dynamic-b97b9bae.js"), "../addon/higohome/views/dynamic/dynamic_comment.vue": () => import("./dynamic_comment-8daa0efc.js"), "../addon/higohome/views/dynamic/dynamic_config.vue": () => import("./dynamic_config-a415e94d.js"), "../addon/higohome/views/dynamic/rules.vue": () => import("./rules-bdd99094.js"), "../addon/higohome/views/dynamic_category/components/dynamic-category-edit.vue": () => import("./dynamic-category-edit-685c5ee7.js"), "../addon/higohome/views/dynamic_category/dynamic_category.vue": () => import("./dynamic_category-ebd53726.js"), "../addon/higohome/views/feedback/components/feedback-edit.vue": () => import("./feedback-edit-3588c7e1.js"), "../addon/higohome/views/feedback/feedback.vue": () => import("./feedback-9aa88f23.js"), "../addon/higohome/views/fenxiao/components/fenxiao-edit.vue": () => import("./fenxiao-edit-077065c7.js"), "../addon/higohome/views/fenxiao/fenxiao.vue": () => import("./fenxiao-270d3e61.js"), "../addon/higohome/views/fenxiaomember/components/fenxiaomember-edit.vue": () => import("./fenxiaomember-edit-2f4a24ab.js"), "../addon/higohome/views/fenxiaomember/fenxiaomember.vue": () => import("./fenxiaomember-d7409a14.js"), "../addon/higohome/views/fenxiaoorder/components/fenxiaoorder-edit.vue": () => import("./fenxiaoorder-edit-6d6ef189.js"), "../addon/higohome/views/fenxiaoorder/fenxiaoorder.vue": () => import("./fenxiaoorder-876909ff.js"), "../addon/higohome/views/goods/components/detailcard-edit.vue": () => import("./detailcard-edit-defab4d3.js"), "../addon/higohome/views/goods/components/goods-cate-edit.vue": () => import("./goods-cate-edit-c5e76b06.js"), "../addon/higohome/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-d3fc4164.js"), "../addon/higohome/views/goods/components/goods-tags-edit.vue": () => import("./goods-tags-edit-12c5ba4e.js"), "../addon/higohome/views/goods/detailcard.vue": () => import("./detailcard-93185a07.js"), "../addon/higohome/views/goods/goods_cate.vue": () => import("./goods_cate-a5051ad3.js"), "../addon/higohome/views/goods/goods_list.vue": () => import("./goods_list-6b73aa98.js"), "../addon/higohome/views/goods/goods_list_edit.vue": () => import("./goods_list_edit-a5822a3d.js"), "../addon/higohome/views/goods/goods_tags.vue": () => import("./goods_tags-57f8705e.js"), "../addon/higohome/views/manger/components/mobile-manger-edit.vue": () => import("./mobile-manger-edit-8f0014c6.js"), "../addon/higohome/views/manger/mobile_manger.vue": () => import("./mobile_manger-464c5076.js"), "../addon/higohome/views/message/components/message-edit.vue": () => import("./message-edit-2320b183.js"), "../addon/higohome/views/message/message.vue": () => import("./message-41b514c3.js"), "../addon/higohome/views/notice/components/notice-config-edit.vue": () => import("./notice-config-edit-5926d915.js"), "../addon/higohome/views/notice/components/notice-template-edit.vue": () => import("./notice-template-edit-a448b3d6.js"), "../addon/higohome/views/notice/notice_config.vue": () => import("./notice_config-44c28228.js"), "../addon/higohome/views/notice/notice_template.vue": () => import("./notice_template-58901487.js"), "../addon/higohome/views/order/order_detail.vue": () => import("./order_detail-539da6e2.js"), "../addon/higohome/views/order/order_dispatch.vue": () => import("./order_dispatch-58f0b9aa.js"), "../addon/higohome/views/order/order_heat.vue": () => import("./order_heat-93edee4c.js"), "../addon/higohome/views/order/ordering_notice.vue": () => import("./ordering_notice-aadc870f.js"), "../addon/higohome/views/order/orderlist.vue": () => import("./orderlist-76a35945.js"), "../addon/higohome/views/order/orderlist_edit.vue": () => import("./orderlist_edit-655f2c08.js"), "../addon/higohome/views/order/recored_manger.vue": () => import("./recored_manger-3709b3bf.js"), "../addon/higohome/views/order/recored_manger_edit.vue": () => import("./recored_manger_edit-655f2c08.js"), "../addon/higohome/views/order/selectTech.vue": () => import("./selectTech-4169d1a9.js"), "../addon/higohome/views/platform/components/platform-commission-config-edit.vue": () => import("./platform-commission-config-edit-ebfbeee8.js"), "../addon/higohome/views/platform/components/platform-commission-edit.vue": () => import("./platform-commission-edit-9034034b.js"), "../addon/higohome/views/platform/platform_commission.vue": () => import("./platform_commission-862fe329.js"), "../addon/higohome/views/platform/platform_commission_config.vue": () => import("./platform_commission_config-d078ddfa.js"), "../addon/higohome/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-3656154e.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-3656154e.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-9ffb527f.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-d6db8e07.js").then((i) => i._), "../addon/higohome/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-3656154e.js").then((i) => i._), "../addon/higohome/views/refund/components/refund-config-edit.vue": () => import("./refund-config-edit-ca441fee.js"), "../addon/higohome/views/refund/components/refund-reason-edit.vue": () => import("./refund-reason-edit-b333babe.js"), "../addon/higohome/views/refund/refund.vue": () => import("./refund-8966bcec.js"), "../addon/higohome/views/refund/refund_config.vue": () => import("./refund_config-0a1bde84.js"), "../addon/higohome/views/refund/refund_detail.vue": () => import("./refund_detail-7615db89.js"), "../addon/higohome/views/refund/refund_reason.vue": () => import("./refund_reason-38ecbd31.js"), "../addon/higohome/views/safetips/components/safetips-config-edit.vue": () => import("./safetips-config-edit-35072e71.js"), "../addon/higohome/views/safetips/safetips_config.vue": () => import("./safetips_config-fcd467c6.js"), "../addon/higohome/views/salesman/components/salesman-config-edit.vue": () => import("./salesman-config-edit-40673e08.js"), "../addon/higohome/views/salesman/components/salesman-list-edit.vue": () => import("./salesman-list-edit-19dfb30f.js"), "../addon/higohome/views/salesman/components/salesman-wallet-edit.vue": () => import("./salesman-wallet-edit-ff312938.js"), "../addon/higohome/views/salesman/salesman_config.vue": () => import("./salesman_config-7a2863b9.js"), "../addon/higohome/views/salesman/salesman_list.vue": () => import("./salesman_list-a7dc7074.js"), "../addon/higohome/views/salesman/salesman_wallet.vue": () => import("./salesman_wallet-e1db9ddb.js"), "../addon/higohome/views/shareholder/components/shareholder-config-edit.vue": () => import("./shareholder-config-edit-981805fb.js"), "../addon/higohome/views/shareholder/components/shareholder-edit.vue": () => import("./shareholder-edit-ea221b7f.js"), "../addon/higohome/views/shareholder/components/shareholder-wallet-edit.vue": () => import("./shareholder-wallet-edit-e08db6ac.js"), "../addon/higohome/views/shareholder/shareholder.vue": () => import("./shareholder-af795718.js"), "../addon/higohome/views/shareholder/shareholder_config.vue": () => import("./shareholder_config-afb1ee83.js"), "../addon/higohome/views/shareholder/shareholder_wallet.vue": () => import("./shareholder_wallet-1be1e7e9.js"), "../addon/higohome/views/smsbao/components/smsbao-config-edit.vue": () => import("./smsbao-config-edit-9b5d889a.js"), "../addon/higohome/views/smsbao/components/smsbao-message-edit.vue": () => import("./smsbao-message-edit-adeaad60.js"), "../addon/higohome/views/smsbao/smsbao_config.vue": () => import("./smsbao_config-7b49415b.js"), "../addon/higohome/views/smsbao/smsbao_message.vue": () => import("./smsbao_message-ad00ba7e.js"), "../addon/higohome/views/store/components/store-cate-edit.vue": () => import("./store-cate-edit-dd74d0f1.js"), "../addon/higohome/views/store/components/store-config-edit.vue": () => import("./store-config-edit-ebd6a356.js"), "../addon/higohome/views/store/components/store-list-edit.vue": () => import("./store-list-edit-b01a046f.js"), "../addon/higohome/views/store/components/store-wallet-edit.vue": () => import("./store-wallet-edit-add739dc.js"), "../addon/higohome/views/store/store_cate.vue": () => import("./store_cate-79a9fea0.js"), "../addon/higohome/views/store/store_config.vue": () => import("./store_config-993b3d2a.js"), "../addon/higohome/views/store/store_list.vue": () => import("./store_list-ebfc81eb.js"), "../addon/higohome/views/store/store_list_edit.vue": () => import("./store_list_edit-04632fa1.js"), "../addon/higohome/views/store/store_wallet.vue": () => import("./store_wallet-1554020f.js"), "../addon/higohome/views/technician/car_globalset.vue": () => import("./car_globalset-8359044a.js"), "../addon/higohome/views/technician/car_price.vue": () => import("./car_price-75991331.js"), "../addon/higohome/views/technician/category.vue": () => import("./category-254cfd56.js"), "../addon/higohome/views/technician/category_config.vue": () => import("./category_config-4aa5b3bc.js"), "../addon/higohome/views/technician/components/TencentMap.vue": () => import("./TencentMap-0f147363.js"), "../addon/higohome/views/technician/components/car-price-edit.vue": () => import("./car-price-edit-d91d3d8a.js"), "../addon/higohome/views/technician/components/category-edit.vue": () => import("./category-edit-ad371543.js"), "../addon/higohome/views/technician/components/police-config-edit.vue": () => import("./police-config-edit-5cfeb28f.js"), "../addon/higohome/views/technician/components/select-category-pop.vue": () => import("./select-category-pop-10bfe0d2.js"), "../addon/higohome/views/technician/components/select-technician-pop.vue": () => import("./select-technician-pop-3afe1df4.js"), "../addon/higohome/views/technician/components/technician-config-edit.vue": () => import("./technician-config-edit-0ce1da87.js"), "../addon/higohome/views/technician/components/technician-detail.vue": () => import("./technician-detail-2e3f3728.js"), "../addon/higohome/views/technician/components/technician-police-edit.vue": () => import("./technician-police-edit-6551de2c.js"), "../addon/higohome/views/technician/components/technician-tags-edit.vue": () => import("./technician-tags-edit-ca3b7c94.js"), "../addon/higohome/views/technician/components/technician-wallet-edit.vue": () => import("./technician-wallet-edit-8b2eb2b4.js"), "../addon/higohome/views/technician/config.vue": () => import("./config-e24474f6.js"), "../addon/higohome/views/technician/other_config.vue": () => import("./other_config-8dae68e7.js"), "../addon/higohome/views/technician/police_config.vue": () => import("./police_config-ac68aa9a.js"), "../addon/higohome/views/technician/technician_config.vue": () => import("./technician_config-62845598.js"), "../addon/higohome/views/technician/technician_data.vue": () => import("./technician_data-55cc7b96.js"), "../addon/higohome/views/technician/technician_data_edit.vue": () => import("./technician_data_edit-655f2c08.js"), "../addon/higohome/views/technician/technician_detail.vue": () => import("./technician_detail-92129f9a.js"), "../addon/higohome/views/technician/technician_goods.vue": () => import("./technician_goods-045ac690.js"), "../addon/higohome/views/technician/technician_goods_select.vue": () => import("./technician_goods_select-a7ae17db.js"), "../addon/higohome/views/technician/technician_list.vue": () => import("./technician_list-fc94ff5f.js"), "../addon/higohome/views/technician/technician_list_edit.vue": () => import("./technician_list_edit-94444904.js"), "../addon/higohome/views/technician/technician_police.vue": () => import("./technician_police-522e0f7c.js"), "../addon/higohome/views/technician/technician_set.vue": () => import("./technician_set-384571df.js"), "../addon/higohome/views/technician/technician_tags.vue": () => import("./technician_tags-57260471.js"), "../addon/higohome/views/technician/technician_wallet.vue": () => import("./technician_wallet-dd9f1e5c.js"), "../addon/higohome/views/technician/test_data.vue": () => import("./test_data-c698117e.js"), "../addon/higohome/views/technician/travel_set.vue": () => import("./travel_set-4994e536.js"), "../addon/higohome/views/theme/components/theme-config-edit.vue": () => import("./theme-config-edit-a803a5a9.js"), "../addon/higohome/views/theme/couponads.vue": () => import("./couponads-19b54375.js"), "../addon/higohome/views/theme/theme_color_config.vue": () => import("./theme_color_config-cc20b5ef.js"), "../addon/higohome/views/theme/theme_images_config.vue": () => import("./theme_images_config-a810fd4e.js"), "../addon/higohome/views/welcome/welcome.vue": () => import("./welcome-39a917f1.js"), "../addon/higohome/views/welcome/welcomebak.vue": () => import("./welcomebak-d4d798a1.js"), "../addon/home_service/views/card/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-7ac972e3.js"), "../addon/home_service/views/card/components/goods-select-popup.vue": () => import("./goods-select-popup-84574e87.js"), "../addon/home_service/views/card/edit.vue": () => import("./edit-9ebde44e.js"), "../addon/home_service/views/card/list.vue": () => import("./list-830bb3e2.js"), "../addon/home_service/views/diy/components/edit-homeService-carousel-search.vue": () => import("./edit-homeService-carousel-search-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-many-goods-list.vue": () => import("./edit-homeService-many-goods-list-83ba7eca.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-order-info.vue": () => import("./edit-homeService-order-info-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeService-rubik-cube.vue": () => import("./edit-homeService-rubik-cube-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-banner.vue": () => import("./edit-homeServicemember-banner-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-card.vue": () => import("./edit-homeServicemember-card-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-cardList.vue": () => import("./edit-homeServicemember-cardList-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-guarantee.vue": () => import("./edit-homeServicemember-guarantee-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-info.vue": () => import("./edit-homeServicemember-info-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-lowCost.vue": () => import("./edit-homeServicemember-lowCost-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-panicBuying.vue": () => import("./edit-homeServicemember-panicBuying-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-settle.vue": () => import("./edit-homeServicemember-settle-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-subguarantee.vue": () => import("./edit-homeServicemember-subguarantee-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list-recommed.vue": () => import("./edit-homeServicemember-technician-list-recommed-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/edit-homeServicemember-technician-list.vue": () => import("./edit-homeServicemember-technician-list-9ffb527f.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-card.vue": () => import("./link-select-card-7cabf8e5.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-category.vue": () => import("./link-select-category-d720c079.js").then((i) => i._), "../addon/home_service/views/diy/components/link-select-goods.vue": () => import("./link-select-goods-251e1db4.js").then((i) => i._), "../addon/home_service/views/feedback/list.vue": () => import("./list-484e4994.js"), "../addon/home_service/views/finance/components/BankTransferDialog.vue": () => import("./BankTransferDialog-d4bed5ce.js"), "../addon/home_service/views/finance/invoice.vue": () => import("./invoice-6a0ca7ec.js"), "../addon/home_service/views/finance/store_detail.vue": () => import("./store_detail-655f2c08.js"), "../addon/home_service/views/finance/store_finance.vue": () => import("./store_finance-655f2c08.js"), "../addon/home_service/views/finance/technician_detail.vue": () => import("./technician_detail-655f2c08.js"), "../addon/home_service/views/finance/technician_finance.vue": () => import("./technician_finance-655f2c08.js"), "../addon/home_service/views/finance/withdrawal_review.vue": () => import("./withdrawal_review-655f2c08.js"), "../addon/home_service/views/goods/category.vue": () => import("./category-8c10629e.js"), "../addon/home_service/views/goods/city.vue": () => import("./city-655f2c08.js"), "../addon/home_service/views/goods/components/card-select-popup.vue": () => import("./card-select-popup-393086ef.js"), "../addon/home_service/views/goods/components/category-edit.vue": () => import("./category-edit-655f2c08.js"), "../addon/home_service/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-6a0ca7ec.js"), "../addon/home_service/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-380a6014.js"), "../addon/home_service/views/goods/components/guarantee-edit.vue": () => import("./guarantee-edit-655f2c08.js"), "../addon/home_service/views/goods/components/special-edit.vue": () => import("./special-edit-655f2c08.js"), "../addon/home_service/views/goods/edit.vue": () => import("./edit-f5f484b5.js"), "../addon/home_service/views/goods/guarantee.vue": () => import("./guarantee-655f2c08.js"), "../addon/home_service/views/goods/list.vue": () => import("./list-655f2c08.js"), "../addon/home_service/views/goods/special.vue": () => import("./special-655f2c08.js"), "../addon/home_service/views/help/category.vue": () => import("./category-655f2c08.js"), "../addon/home_service/views/help/components/edit-category.vue": () => import("./edit-category-655f2c08.js"), "../addon/home_service/views/help/edit.vue": () => import("./edit-d478eb29.js"), "../addon/home_service/views/help/list.vue": () => import("./list-6a0ca7ec.js"), "../addon/home_service/views/index.vue": () => import("./index-0ca263b6.js"), "../addon/home_service/views/marketing/coupon/add.vue": () => import("./add-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-1d56cd8e.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-655f2c08.js"), "../addon/home_service/views/marketing/coupon/components/select-member.vue": () => import("./select-member-9c1dbb33.js"), "../addon/home_service/views/marketing/coupon/edit.vue": () => import("./edit-655f2c08.js"), "../addon/home_service/views/marketing/coupon/list.vue": () => import("./list-8c10629e.js"), "../addon/home_service/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-655f2c08.js"), "../addon/home_service/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-24ca72c5.js"), "../addon/home_service/views/order/components/add-address.vue": () => import("./add-address-90cd4549.js"), "../addon/home_service/views/order/components/address-list.vue": () => import("./address-list-6a0ca7ec.js"), "../addon/home_service/views/order/components/coupon-list.vue": () => import("./coupon-list-6a0ca7ec.js"), "../addon/home_service/views/order/components/friend-pay.vue": () => import("./friend-pay-6a0ca7ec.js"), "../addon/home_service/views/order/components/goods-limit.vue": () => import("./goods-limit-6a0ca7ec.js"), "../addon/home_service/views/order/components/manjian-info.vue": () => import("./manjian-info-6a0ca7ec.js"), "../addon/home_service/views/order/components/order-export-select.vue": () => import("./order-export-select-7ac972e3.js"), "../addon/home_service/views/order/components/pay.vue": () => import("./pay-5be492b8.js"), "../addon/home_service/views/order/components/returnvisit.vue": () => import("./returnvisit-9c071b0b.js"), "../addon/home_service/views/order/components/select-goods.vue": () => import("./select-goods-6a0ca7ec.js"), "../addon/home_service/views/order/components/select-member.vue": () => import("./select-member-7ac972e3.js"), "../addon/home_service/views/order/components/select-orderlabel.vue": () => import("./select-orderlabel-867066ce.js"), "../addon/home_service/views/order/components/select-technician.vue": () => import("./select-technician-655f2c08.js"), "../addon/home_service/views/order/components/select-time.vue": () => import("./select-time-b846d0eb.js"), "../addon/home_service/views/order/config.vue": () => import("./config-696d6794.js"), "../addon/home_service/views/order/easy_select.vue": () => import("./easy_select-9308abf9.js"), "../addon/home_service/views/order/easy_select_detail.vue": () => import("./easy_select_detail-8d1b86b5.js"), "../addon/home_service/views/order/evaluate.vue": () => import("./evaluate-445a3432.js"), "../addon/home_service/views/order/evaluate_config.vue": () => import("./evaluate_config-4ac55d95.js"), "../addon/home_service/views/order/intent_config.vue": () => import("./intent_config-8574a5a7.js"), "../addon/home_service/views/order/lesson_order.vue": () => import("./lesson_order-655f2c08.js"), "../addon/home_service/views/order/lesson_order_confirm.vue": () => import("./lesson_order_confirm-655f2c08.js"), "../addon/home_service/views/order/order.vue": () => import("./order-a43257b1.js"), "../addon/home_service/views/order/order_detail.vue": () => import("./order_detail-35c97b12.js"), "../addon/home_service/views/order/protection_settings.vue": () => import("./protection_settings-5fc46a35.js"), "../addon/home_service/views/order/return_visit.vue": () => import("./return_visit-5169bc75.js"), "../addon/home_service/views/order/tags.vue": () => import("./tags-a457fc6f.js"), "../addon/home_service/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-9ffb527f.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-d6db8e07.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-3656154e.js").then((i) => i._), "../addon/home_service/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-9ffb527f.js").then((i) => i._), "../addon/home_service/views/refund/refund.vue": () => import("./refund-73ddac05.js"), "../addon/home_service/views/report/customer_report.vue": () => import("./customer_report-504a1d31.js"), "../addon/home_service/views/report/financial_report.vue": () => import("./financial_report-d88b7d55.js"), "../addon/home_service/views/report/member_report.vue": () => import("./member_report-fe9a0eff.js"), "../addon/home_service/views/report/store_report.vue": () => import("./store_report-fc2ed43e.js"), "../addon/home_service/views/report/technician_report.vue": () => import("./technician_report-b53c2438.js"), "../addon/home_service/views/store/add.vue": () => import("./add-5591aaf1.js"), "../addon/home_service/views/store/detail.vue": () => import("./detail-1bdd2e2c.js"), "../addon/home_service/views/store/edit.vue": () => import("./edit-0e735c5c.js"), "../addon/home_service/views/store/examine.vue": () => import("./examine-655f2c08.js"), "../addon/home_service/views/store/examine_edit.vue": () => import("./examine_edit-1e843b87.js"), "../addon/home_service/views/store/list.vue": () => import("./list-47455626.js"), "../addon/home_service/views/store/technician.vue": () => import("./technician-655f2c08.js"), "../addon/home_service/views/technician/cityfare.vue": () => import("./cityfare-655f2c08.js"), "../addon/home_service/views/technician/cityfare_config.vue": () => import("./cityfare_config-4fe34ee8.js"), "../addon/home_service/views/technician/components/dynamicCollapseForm/dynamicCollapseForm.vue": () => import("./dynamicCollapseForm-63bdddb7.js"), "../addon/home_service/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-71a12e50.js"), "../addon/home_service/views/technician/detail.vue": () => import("./detail-8ff6be0c.js"), "../addon/home_service/views/technician/edit.vue": () => import("./edit-c777de5e.js"), "../addon/home_service/views/technician/examine.vue": () => import("./examine-6a0ca7ec.js"), "../addon/home_service/views/technician/examine_edit.vue": () => import("./examine_edit-f8e07145.js"), "../addon/home_service/views/technician/level.vue": () => import("./level-655f2c08.js"), "../addon/home_service/views/technician/level_edit.vue": () => import("./level_edit-764e6e3c.js"), "../addon/home_service/views/technician/list.vue": () => import("./list-ca3a19a0.js"), "../addon/huaweicloud_obs/views/setting/components/storage-huawei.vue": () => import("./storage-huawei-655f2c08.js"), "../addon/huaweicloud_sms/views/setting/components/sms-huawei.vue": () => import("./sms-huawei-655f2c08.js"), "../addon/o2o/views/config/reserve.vue": () => import("./reserve-655f2c08.js"), "../addon/o2o/views/diy/components/edit-o2o-goods-list.vue": () => import("./edit-o2o-goods-list-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-member-info.vue": () => import("./edit-o2o-member-info-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-order-info.vue": () => import("./edit-o2o-order-info-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-search.vue": () => import("./edit-o2o-search-9ffb527f.js").then((i) => i._), "../addon/o2o/views/diy/components/edit-o2o-technician.vue": () => import("./edit-o2o-technician-9ffb527f.js").then((i) => i._), "../addon/o2o/views/goods/category.vue": () => import("./category-24ca72c5.js"), "../addon/o2o/views/goods/components/category-edit.vue": () => import("./category-edit-1ad78c96.js"), "../addon/o2o/views/goods/components/category-select-content.vue": () => import("./category-select-content-655f2c08.js"), "../addon/o2o/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-655f2c08.js"), "../addon/o2o/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-743e6724.js"), "../addon/o2o/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-9ae37d46.js"), "../addon/o2o/views/goods/edit.vue": () => import("./edit-934fb501.js"), "../addon/o2o/views/goods/list.vue": () => import("./list-24ca72c5.js"), "../addon/o2o/views/index.vue": () => import("./index-e58c1c71.js"), "../addon/o2o/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-24ca72c5.js"), "../addon/o2o/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-7ac972e3.js"), "../addon/o2o/views/order/components/order-export-select.vue": () => import("./order-export-select-6a0ca7ec.js"), "../addon/o2o/views/order/config.vue": () => import("./config-7da0b282.js"), "../addon/o2o/views/order/order.vue": () => import("./order-33dbd836.js"), "../addon/o2o/views/order/order_detail.vue": () => import("./order_detail-dff79846.js"), "../addon/o2o/views/order/reserve.vue": () => import("./reserve-b686ea12.js"), "../addon/o2o/views/poster/components/edit-o2o-goods-image.vue": () => import("./edit-o2o-goods-image-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/edit-o2o-goods-name.vue": () => import("./edit-o2o-goods-name-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/edit-o2o-goods-price.vue": () => import("./edit-o2o-goods-price-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-image.vue": () => import("./preview-o2o-goods-image-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-name.vue": () => import("./preview-o2o-goods-name-9ffb527f.js").then((i) => i._), "../addon/o2o/views/poster/components/preview-o2o-goods-price.vue": () => import("./preview-o2o-goods-price-9ffb527f.js").then((i) => i._), "../addon/o2o/views/refund/detail.vue": () => import("./detail-8c10629e.js"), "../addon/o2o/views/refund/refund.vue": () => import("./refund-7ac972e3.js"), "../addon/o2o/views/site_index.vue": () => import("./site_index-655f2c08.js"), "../addon/o2o/views/technician/components/edit-position.vue": () => import("./edit-position-655f2c08.js"), "../addon/o2o/views/technician/components/technician-select-content.vue": () => import("./technician-select-content-b7a37219.js"), "../addon/o2o/views/technician/edit.vue": () => import("./edit-032fc568.js"), "../addon/o2o/views/technician/list.vue": () => import("./list-fbca5f7b.js"), "../addon/o2o/views/technician/position.vue": () => import("./position-655f2c08.js"), "../addon/pintuan/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-6a0ca7ec.js"), "../addon/pintuan/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-0c5022fd.js"), "../addon/pintuan/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-d0b46ffe.js"), "../addon/pintuan/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-7ac972e3.js"), "../addon/pintuan/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-6a838123.js"), "../addon/pintuan/views/active/components/goods-select-content.vue": () => import("./goods-select-content-152b3080.js"), "../addon/pintuan/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-3eb27c1c.js"), "../addon/pintuan/views/active/components/select-member.vue": () => import("./select-member-4b07a13a.js"), "../addon/pintuan/views/active/edit.vue": () => import("./edit-cb07e44f.js"), "../addon/pintuan/views/active/list.vue": () => import("./list-e113a869.js"), "../addon/pintuan/views/active/stat.vue": () => import("./stat-b95580ce.js"), "../addon/pintuan/views/config/config.vue": () => import("./config-3f1aed28.js"), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-basic-info.vue": () => import("./edit-pintuan-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-bottom.vue": () => import("./edit-pintuan-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-desc.vue": () => import("./edit-pintuan-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-gameplay.vue": () => import("./edit-pintuan-activity-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-goods-info.vue": () => import("./edit-pintuan-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-pintuan-info.vue": () => import("./edit-pintuan-activity-goods-detail-pintuan-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-activity-goods-detail-progress.vue": () => import("./edit-pintuan-activity-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-basic-info.vue": () => import("./edit-pintuan-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-bottom.vue": () => import("./edit-pintuan-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-desc.vue": () => import("./edit-pintuan-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-gameplay.vue": () => import("./edit-pintuan-goods-detail-gameplay-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-progress.vue": () => import("./edit-pintuan-goods-detail-progress-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-goods-detail-purchase-service.vue": () => import("./edit-pintuan-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-hot.vue": () => import("./edit-pintuan-hot-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-immediately.vue": () => import("./edit-pintuan-immediately-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-limit.vue": () => import("./edit-pintuan-limit-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-list.vue": () => import("./edit-pintuan-list-db229a9b.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-member-info.vue": () => import("./edit-pintuan-member-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/diy/components/edit-pintuan-order-info.vue": () => import("./edit-pintuan-order-info-9ffb527f.js").then((i) => i._), "../addon/pintuan/views/group/components/group-detail-popup.vue": () => import("./group-detail-popup-655f2c08.js"), "../addon/pintuan/views/group/list.vue": () => import("./list-98995852.js"), "../addon/pintuan/views/order/components/order-notes.vue": () => import("./order-notes-1ad78c96.js"), "../addon/pintuan/views/order/components/refund-detail.vue": () => import("./refund-detail-660775b7.js"), "../addon/pintuan/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-8c10629e.js"), "../addon/pintuan/views/order/detail.vue": () => import("./detail-070418fe.js"), "../addon/pintuan/views/order/list.vue": () => import("./list-be6741db.js"), "../addon/pintuan/views/order/refund.vue": () => import("./refund-018abccc.js"), "../addon/pintuan/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-0a4df787.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-group-open-num.vue": () => import("./edit-group-open-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-group-success-num.vue": () => import("./edit-group-success-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/edit-price.vue": () => import("./edit-price-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-907653fa.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-group-open-num.vue": () => import("./preview-group-open-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-group-success-num.vue": () => import("./preview-group-success-num-3656154e.js").then((i) => i._), "../addon/pintuan/views/poster/components/preview-price.vue": () => import("./preview-price-3656154e.js").then((i) => i._), "../addon/recharge/views/order/components/recharge-detail.vue": () => import("./recharge-detail-655f2c08.js"), "../addon/recharge/views/order/detail.vue": () => import("./detail-1ad78c96.js"), "../addon/recharge/views/order/list.vue": () => import("./list-f58fe01d.js"), "../addon/recharge/views/order/refund.vue": () => import("./refund-24ca72c5.js"), "../addon/recharge/views/package/components/detail-growth.vue": () => import("./detail-growth-9a944ddd.js"), "../addon/recharge/views/package/components/detail-points.vue": () => import("./detail-points-6d8bd262.js"), "../addon/recharge/views/package/components/gift-growth.vue": () => import("./gift-growth-d8bb0311.js"), "../addon/recharge/views/package/components/gift-points.vue": () => import("./gift-points-03d0431c.js"), "../addon/recharge/views/package/components/package-gift.vue": () => import("./package-gift-655f2c08.js"), "../addon/recharge/views/package/config.vue": () => import("./config-c3170518.js"), "../addon/recharge/views/package/detail.vue": () => import("./detail-b0ffb798.js"), "../addon/recharge/views/package/edit.vue": () => import("./edit-33a03570.js"), "../addon/recharge/views/package/list.vue": () => import("./list-cd799851.js"), "../addon/relay/views/active/components/active-detail-popup.vue": () => import("./active-detail-popup-7ac972e3.js"), "../addon/relay/views/active/components/add-goods-popup.vue": () => import("./add-goods-popup-b9d0b30b.js"), "../addon/relay/views/active/components/diy-goods-select-popup.vue": () => import("./diy-goods-select-popup-e449b1c8.js"), "../addon/relay/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-24ca72c5.js"), "../addon/relay/views/active/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-a9725102.js"), "../addon/relay/views/active/components/goods-select-content.vue": () => import("./goods-select-content-7fb2740a.js"), "../addon/relay/views/active/components/import-goods-popup.vue": () => import("./import-goods-popup-ecb72321.js"), "../addon/relay/views/active/components/select-member.vue": () => import("./select-member-89a5095a.js"), "../addon/relay/views/active/edit.vue": () => import("./edit-8432472b.js"), "../addon/relay/views/active/list.vue": () => import("./list-d193b946.js"), "../addon/relay/views/active/stat.vue": () => import("./stat-06441dd5.js"), "../addon/relay/views/config/config.vue": () => import("./config-122e19c0.js"), "../addon/relay/views/diy/components/edit-relay-goods-list.vue": () => import("./edit-relay-goods-list-9ffb527f.js").then((i) => i._), "../addon/relay/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-3f57a5df.js"), "../addon/relay/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-29afb627.js"), "../addon/relay/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-fc0d601f.js"), "../addon/relay/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-cfe8dbed.js"), "../addon/relay/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-6a0ca7ec.js"), "../addon/relay/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-f148bd18.js"), "../addon/relay/views/goods/edit.vue": () => import("./edit-3b2a98e3.js"), "../addon/relay/views/goods/list.vue": () => import("./list-c43c131e.js"), "../addon/relay/views/order/components/order-notes.vue": () => import("./order-notes-655f2c08.js"), "../addon/relay/views/order/components/refund-detail.vue": () => import("./refund-detail-04ee3512.js"), "../addon/relay/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-24ca72c5.js"), "../addon/relay/views/order/detail.vue": () => import("./detail-3c71781e.js"), "../addon/relay/views/order/list.vue": () => import("./list-abfaff0d.js"), "../addon/relay/views/order/refund.vue": () => import("./refund-0bc0595c.js"), "../addon/sd_minsu/views/banner/list.vue": () => import("./list-bb846ef3.js"), "../addon/sd_minsu/views/city/list.vue": () => import("./list-d4303a32.js"), "../addon/sd_minsu/views/config/index.vue": () => import("./index-5739ce7e.js"), "../addon/sd_minsu/views/coupon/list.vue": () => import("./list-c72a0c25.js"), "../addon/sd_minsu/views/dashboard/index.vue": () => import("./index-b0fe7816.js"), "../addon/sd_minsu/views/evaluate/list.vue": () => import("./list-0ffe9cb4.js"), "../addon/sd_minsu/views/facility/list.vue": () => import("./list-f422d13c.js"), "../addon/sd_minsu/views/homestay/apply.vue": () => import("./apply-fadff92b.js"), "../addon/sd_minsu/views/homestay/edit.vue": () => import("./edit-3f1aed28.js"), "../addon/sd_minsu/views/homestay/list.vue": () => import("./list-d9a8c3e5.js"), "../addon/sd_minsu/views/invite/index.vue": () => import("./index-fc2de04f.js"), "../addon/sd_minsu/views/notice/list.vue": () => import("./list-6c6c4b64.js"), "../addon/sd_minsu/views/order/detail.vue": () => import("./detail-05396620.js"), "../addon/sd_minsu/views/order/list.vue": () => import("./list-887fd12c.js"), "../addon/sd_minsu/views/quick_nav/list.vue": () => import("./list-11ed21f5.js"), "../addon/sd_minsu/views/refund/list.vue": () => import("./list-d2e30548.js"), "../addon/sd_minsu/views/room/calendar.vue": () => import("./calendar-7340b761.js"), "../addon/sd_minsu/views/room/list.vue": () => import("./list-7d333a48.js"), "../addon/sd_minsu/views/settlement/list.vue": () => import("./list-7886d8fa.js"), "../addon/sd_minsu/views/staff/list.vue": () => import("./list-a0ddce29.js"), "../addon/sd_xiaoyuan/views/appeal/list.vue": () => import("./list-c9a4276a.js"), "../addon/sd_xiaoyuan/views/campus/list.vue": () => import("./list-68a2dea6.js"), "../addon/sd_xiaoyuan/views/campus_auth/list.vue": () => import("./list-32ef8888.js"), "../addon/sd_xiaoyuan/views/class_schedule/import.vue": () => import("./import-55273c74.js"), "../addon/sd_xiaoyuan/views/class_schedule/list.vue": () => import("./list-86e16b2e.js"), "../addon/sd_xiaoyuan/views/comment/community.vue": () => import("./community-5f4d80ea.js"), "../addon/sd_xiaoyuan/views/comment/confession.vue": () => import("./confession-ae09011f.js"), "../addon/sd_xiaoyuan/views/comment/list.vue": () => import("./list-cfd6a588.js"), "../addon/sd_xiaoyuan/views/community/category.vue": () => import("./category-c54511d6.js"), "../addon/sd_xiaoyuan/views/community/list.vue": () => import("./list-638149a0.js"), "../addon/sd_xiaoyuan/views/confession/list.vue": () => import("./list-44d739fb.js"), "../addon/sd_xiaoyuan/views/config/index.vue": () => import("./index-70fb3510.js"), "../addon/sd_xiaoyuan/views/coupon/list.vue": () => import("./list-1556aae7.js"), "../addon/sd_xiaoyuan/views/credit/list.vue": () => import("./list-16b3b6ac.js"), "../addon/sd_xiaoyuan/views/dashboard/index.vue": () => import("./index-f288cdd0.js"), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-banner.vue": () => import("./edit-xiaoyuan-banner-699df7a5.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-card-grid.vue": () => import("./edit-xiaoyuan-card-grid-941545e6.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-community.vue": () => import("./edit-xiaoyuan-community-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-header.vue": () => import("./edit-xiaoyuan-header-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-idle-preview.vue": () => import("./edit-xiaoyuan-idle-preview-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-menu-grid.vue": () => import("./edit-xiaoyuan-menu-grid-8d9dbe60.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-notice.vue": () => import("./edit-xiaoyuan-notice-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-order-hall.vue": () => import("./edit-xiaoyuan-order-hall-69dcdce8.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-promo-card.vue": () => import("./edit-xiaoyuan-promo-card-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-search.vue": () => import("./edit-xiaoyuan-search-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-user-header.vue": () => import("./edit-xiaoyuan-user-header-9ffb527f.js").then((i) => i._), "../addon/sd_xiaoyuan/views/diy/components/edit-xiaoyuan-user-menu.vue": () => import("./edit-xiaoyuan-user-menu-11a64be5.js").then((i) => i._), "../addon/sd_xiaoyuan/views/evaluate/list.vue": () => import("./list-4729d887.js"), "../addon/sd_xiaoyuan/views/express_station/list.vue": () => import("./list-f7c7f347.js"), "../addon/sd_xiaoyuan/views/game/category.vue": () => import("./category-5210873e.js"), "../addon/sd_xiaoyuan/views/game/index.vue": () => import("./index-cc9867fa.js"), "../addon/sd_xiaoyuan/views/group_order/list.vue": () => import("./list-c4104d58.js"), "../addon/sd_xiaoyuan/views/house/list.vue": () => import("./list-ffc540c8.js"), "../addon/sd_xiaoyuan/views/house/order.vue": () => import("./order-ffed94e4.js"), "../addon/sd_xiaoyuan/views/invite/index.vue": () => import("./index-822e44c5.js"), "../addon/sd_xiaoyuan/views/lost_found/category.vue": () => import("./category-f7a574d7.js"), "../addon/sd_xiaoyuan/views/lost_found/list.vue": () => import("./list-4f0bf8ee.js"), "../addon/sd_xiaoyuan/views/message/list.vue": () => import("./list-189b4a37.js"), "../addon/sd_xiaoyuan/views/message/send.vue": () => import("./send-66780995.js"), "../addon/sd_xiaoyuan/views/order/list.vue": () => import("./list-54e6e2fe.js"), "../addon/sd_xiaoyuan/views/package_price/list.vue": () => import("./list-e3b920cf.js"), "../addon/sd_xiaoyuan/views/points/goods.vue": () => import("./goods-17b2cf4d.js"), "../addon/sd_xiaoyuan/views/points/orders.vue": () => import("./orders-9a8c916d.js"), "../addon/sd_xiaoyuan/views/runner/level.vue": () => import("./level-7606a3fb.js"), "../addon/sd_xiaoyuan/views/runner/list.vue": () => import("./list-199a2c61.js"), "../addon/sd_xiaoyuan/views/school/list.vue": () => import("./list-dd1a3f4d.js"), "../addon/sd_xiaoyuan/views/school_class/list.vue": () => import("./list-3096e553.js"), "../addon/sd_xiaoyuan/views/secondhand/category.vue": () => import("./category-eb1ee10b.js"), "../addon/sd_xiaoyuan/views/secondhand/list.vue": () => import("./list-dc3ff9c7.js"), "../addon/sd_xiaoyuan/views/service_card/list.vue": () => import("./list-1b2f3241.js"), "../addon/sd_xiaoyuan/views/sign/index.vue": () => import("./index-1f6ad2db.js"), "../addon/sd_xiaoyuan/views/stat/index.vue": () => import("./index-92622363.js"), "../addon/sd_xiaoyuan/views/task/list.vue": () => import("./list-85dfd664.js"), "../addon/sd_xiaoyuan/views/withdraw/list.vue": () => import("./list-6d2fb5cf.js"), "../addon/seckill/views/active/components/exchange-record-popup.vue": () => import("./exchange-record-popup-6a0ca7ec.js"), "../addon/seckill/views/active/components/goods-sku-popup.vue": () => import("./goods-sku-popup-5543c00e.js"), "../addon/seckill/views/active/components/seckill-detail-popup.vue": () => import("./seckill-detail-popup-655f2c08.js"), "../addon/seckill/views/active/components/time-select-popup.vue": () => import("./time-select-popup-655f2c08.js"), "../addon/seckill/views/active/detail.vue": () => import("./detail-9a208960.js"), "../addon/seckill/views/active/edit.vue": () => import("./edit-1dbc91e6.js"), "../addon/seckill/views/active/list.vue": () => import("./list-7ac972e3.js"), "../addon/seckill/views/active/stat.vue": () => import("./stat-b899674a.js"), "../addon/seckill/views/config/config.vue": () => import("./config-655f2c08.js"), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-basic-info.vue": () => import("./edit-seckill-activity-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-bottom.vue": () => import("./edit-seckill-activity-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-desc.vue": () => import("./edit-seckill-activity-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-goods-info.vue": () => import("./edit-seckill-activity-goods-detail-goods-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-activity-goods-detail-seckill-info.vue": () => import("./edit-seckill-activity-goods-detail-seckill-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-basic-info.vue": () => import("./edit-seckill-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-bottom.vue": () => import("./edit-seckill-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-desc.vue": () => import("./edit-seckill-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods-detail-purchase-service.vue": () => import("./edit-seckill-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-goods.vue": () => import("./edit-seckill-goods-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-hot.vue": () => import("./edit-seckill-hot-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-member-info.vue": () => import("./edit-seckill-member-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-order-info.vue": () => import("./edit-seckill-order-info-9ffb527f.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-rubik-cube.vue": () => import("./edit-seckill-rubik-cube-71b3f871.js").then((i) => i._), "../addon/seckill/views/diy/components/edit-seckill-special-offer.vue": () => import("./edit-seckill-special-offer-9ffb527f.js").then((i) => i._), "../addon/seckill/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-4df1d010.js"), "../addon/seckill/views/goods/components/goods-diy-select-popup.vue": () => import("./goods-diy-select-popup-84f387df.js"), "../addon/seckill/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-3231d0f0.js"), "../addon/seckill/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-319c669a.js"), "../addon/seckill/views/goods/components/import-goods-popup.vue": () => import("./import-goods-popup-655f2c08.js"), "../addon/seckill/views/goods/components/set-goods-popup.vue": () => import("./set-goods-popup-2e3563d1.js"), "../addon/seckill/views/goods/edit.vue": () => import("./edit-c5ceaedb.js"), "../addon/seckill/views/goods/list.vue": () => import("./list-0bbb41fc.js"), "../addon/seckill/views/order/components/order-notes.vue": () => import("./order-notes-6a0ca7ec.js"), "../addon/seckill/views/order/components/refund-detail.vue": () => import("./refund-detail-aea85365.js"), "../addon/seckill/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-655f2c08.js"), "../addon/seckill/views/order/detail.vue": () => import("./detail-99ff804c.js"), "../addon/seckill/views/order/list.vue": () => import("./list-9ec5f5c7.js"), "../addon/seckill/views/order/refund.vue": () => import("./refund-696ac832.js"), "../addon/seckill/views/poster/components/edit-active-time.vue": () => import("./edit-active-time-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-f7d788a0.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-0a4df787.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-seckill-market-price.vue": () => import("./edit-seckill-market-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/edit-seckill-price.vue": () => import("./edit-seckill-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-active-time.vue": () => import("./preview-active-time-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-0a4df787.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-f7d788a0.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-seckill-market-price.vue": () => import("./preview-seckill-market-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/poster/components/preview-seckill-price.vue": () => import("./preview-seckill-price-9ffb527f.js").then((i) => i._), "../addon/seckill/views/time/components/time-diy-select-popup.vue": () => import("./time-diy-select-popup-32d17943.js"), "../addon/seckill/views/time/components/time-goods-detail.vue": () => import("./time-goods-detail-655f2c08.js"), "../addon/seckill/views/time/components/time-select-content.vue": () => import("./time-select-content-8240d9b1.js"), "../addon/seckill/views/time/edit.vue": () => import("./edit-7ac972e3.js"), "../addon/seckill/views/time/list.vue": () => import("./list-4a02961a.js"), "../addon/shop/views/address/edit.vue": () => import("./edit-6a0ca7ec.js"), "../addon/shop/views/address/list.vue": () => import("./list-1ad78c96.js"), "../addon/shop/views/delivery/company.vue": () => import("./company-655f2c08.js"), "../addon/shop/views/delivery/company_edit.vue": () => import("./company_edit-655f2c08.js"), "../addon/shop/views/delivery/components/delivery-personnel-edit.vue": () => import("./delivery-personnel-edit-655f2c08.js"), "../addon/shop/views/delivery/components/local-delivery-service-dada.vue": () => import("./local-delivery-service-dada-655f2c08.js"), "../addon/shop/views/delivery/components/local_record_detail.vue": () => import("./local_record_detail-655f2c08.js"), "../addon/shop/views/delivery/components/shop_record_detail.vue": () => import("./shop_record_detail-655f2c08.js"), "../addon/shop/views/delivery/config.vue": () => import("./config-b2c3ae09.js"), "../addon/shop/views/delivery/electronic_sheet.vue": () => import("./electronic_sheet-655f2c08.js"), "../addon/shop/views/delivery/electronic_sheet_config.vue": () => import("./electronic_sheet_config-cffd3d2b.js"), "../addon/shop/views/delivery/electronic_sheet_edit.vue": () => import("./electronic_sheet_edit-655f2c08.js"), "../addon/shop/views/delivery/local.vue": () => import("./local-d22ea663.js"), "../addon/shop/views/delivery/local_config.vue": () => import("./local_config-655f2c08.js"), "../addon/shop/views/delivery/local_delivery_service.vue": () => import("./local_delivery_service-655f2c08.js"), "../addon/shop/views/delivery/local_record.vue": () => import("./local_record-54f66ae2.js"), "../addon/shop/views/delivery/merchant_record.vue": () => import("./merchant_record-dc7a1c92.js"), "../addon/shop/views/delivery/search.vue": () => import("./search-a1c2b04e.js"), "../addon/shop/views/delivery/staff.vue": () => import("./staff-655f2c08.js"), "../addon/shop/views/delivery/store.vue": () => import("./store-655f2c08.js"), "../addon/shop/views/delivery/store_edit.vue": () => import("./store_edit-655f2c08.js"), "../addon/shop/views/delivery/template.vue": () => import("./template-655f2c08.js"), "../addon/shop/views/delivery/template_edit.vue": () => import("./template_edit-43b5e1d4.js"), "../addon/shop/views/delivery_store/delivery_set.vue": () => import("./delivery_set-655f2c08.js"), "../addon/shop/views/delivery_store/edit.vue": () => import("./edit-78c1dd7e.js"), "../addon/shop/views/delivery_store/list.vue": () => import("./list-14757507.js"), "../addon/shop/views/diy/components/edit-goods-coupon.vue": () => import("./edit-goods-coupon-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-goods-list.vue": () => import("./edit-goods-list-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-many-goods-list.vue": () => import("./edit-many-goods-list-e3d4971f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-exchange-goods.vue": () => import("./edit-shop-exchange-goods-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-exchange-info.vue": () => import("./edit-shop-exchange-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-attr.vue": () => import("./edit-shop-goods-detail-attr-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-basic-info.vue": () => import("./edit-shop-goods-detail-basic-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-bottom.vue": () => import("./edit-shop-goods-detail-bottom-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-desc.vue": () => import("./edit-shop-goods-detail-desc-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-evaluate.vue": () => import("./edit-shop-goods-detail-evaluate-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-purchase-service.vue": () => import("./edit-shop-goods-detail-purchase-service-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-detail-sow.vue": () => import("./edit-shop-goods-detail-sow-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-hot.vue": () => import("./edit-shop-goods-hot-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-ranking.vue": () => import("./edit-shop-goods-ranking-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-goods-recommend.vue": () => import("./edit-shop-goods-recommend-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-member-info.vue": () => import("./edit-shop-member-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-newcomer.vue": () => import("./edit-shop-newcomer-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-order-info.vue": () => import("./edit-shop-order-info-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-shop-search.vue": () => import("./edit-shop-search-9ffb527f.js").then((i) => i._), "../addon/shop/views/diy/components/edit-single-recommend.vue": () => import("./edit-single-recommend-9ffb527f.js").then((i) => i._), "../addon/shop/views/goods/attr.vue": () => import("./attr-655f2c08.js"), "../addon/shop/views/goods/attr_edit.vue": () => import("./attr_edit-655f2c08.js"), "../addon/shop/views/goods/brand_list.vue": () => import("./brand_list-655f2c08.js"), "../addon/shop/views/goods/category.vue": () => import("./category-5e7f2de8.js"), "../addon/shop/views/goods/category_config.vue": () => import("./category_config-480209f9.js"), "../addon/shop/views/goods/components/brand-edit.vue": () => import("./brand-edit-655f2c08.js"), "../addon/shop/views/goods/components/category-edit.vue": () => import("./category-edit-6a0ca7ec.js"), "../addon/shop/views/goods/components/coupon-select-popup.vue": () => import("./coupon-select-popup-080b96c0.js"), "../addon/shop/views/goods/components/evaluate-add.vue": () => import("./evaluate-add-655f2c08.js"), "../addon/shop/views/goods/components/goods-batch-settings-popup.vue": () => import("./goods-batch-settings-popup-d47e1693.js"), "../addon/shop/views/goods/components/goods-category-select-content.vue": () => import("./goods-category-select-content-f69ead33.js"), "../addon/shop/views/goods/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-dbc8613a.js"), "../addon/shop/views/goods/components/goods-price-edit-popup.vue": () => import("./goods-price-edit-popup-4db9677b.js"), "../addon/shop/views/goods/components/goods-select-content.vue": () => import("./goods-select-content-3f58a19c.js"), "../addon/shop/views/goods/components/goods-select-popup.vue": () => import("./goods-select-popup-595d932e.js"), "../addon/shop/views/goods/components/goods-stock-edit-popup.vue": () => import("./goods-stock-edit-popup-27502087.js"), "../addon/shop/views/goods/components/label-edit.vue": () => import("./label-edit-655f2c08.js"), "../addon/shop/views/goods/components/label-group-edit.vue": () => import("./label-group-edit-655f2c08.js"), "../addon/shop/views/goods/components/newcomer-goods-select-popup.vue": () => import("./newcomer-goods-select-popup-2bf5462a.js"), "../addon/shop/views/goods/components/service-edit.vue": () => import("./service-edit-655f2c08.js"), "../addon/shop/views/goods/evaluate.vue": () => import("./evaluate-e1d6fc00.js"), "../addon/shop/views/goods/label_group_list.vue": () => import("./label_group_list-655f2c08.js"), "../addon/shop/views/goods/label_list.vue": () => import("./label_list-655f2c08.js"), "../addon/shop/views/goods/list.vue": () => import("./list-6acce2f9.js"), "../addon/shop/views/goods/real_edit.vue": () => import("./real_edit-6d7b422b.js"), "../addon/shop/views/goods/recycle.vue": () => import("./recycle-26854108.js"), "../addon/shop/views/goods/search_config.vue": () => import("./search_config-88cf60d5.js"), "../addon/shop/views/goods/service.vue": () => import("./service-655f2c08.js"), "../addon/shop/views/goods/virtual_edit.vue": () => import("./virtual_edit-021f8e7f.js"), "../addon/shop/views/index/index.vue": () => import("./index-3f1aed28.js"), "../addon/shop/views/marketing/coupon/add.vue": () => import("./add-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-collection.vue": () => import("./coupon-collection-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-select-content.vue": () => import("./coupon-select-content-7acfa604.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-popop.vue": () => import("./coupon-send-popop-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/coupon-send-records.vue": () => import("./coupon-send-records-6a0ca7ec.js"), "../addon/shop/views/marketing/coupon/components/select-member.vue": () => import("./select-member-26f2f1c1.js"), "../addon/shop/views/marketing/coupon/edit.vue": () => import("./edit-7da0b282.js"), "../addon/shop/views/marketing/coupon/list.vue": () => import("./list-b0ffb798.js"), "../addon/shop/views/marketing/discount/add.vue": () => import("./add-1ba1bdf6.js"), "../addon/shop/views/marketing/discount/components/discount-detail.vue": () => import("./discount-detail-655f2c08.js"), "../addon/shop/views/marketing/discount/components/goods-sku-popup.vue": () => import("./goods-sku-popup-67ccebf0.js"), "../addon/shop/views/marketing/discount/config.vue": () => import("./config-ca95bf03.js"), "../addon/shop/views/marketing/discount/detail.vue": () => import("./detail-655f2c08.js"), "../addon/shop/views/marketing/discount/edit.vue": () => import("./edit-b4efb0d6.js"), "../addon/shop/views/marketing/discount/list.vue": () => import("./list-7da0b282.js"), "../addon/shop/views/marketing/exchange/components/goods-select-content.vue": () => import("./goods-select-content-9d39c2de.js"), "../addon/shop/views/marketing/exchange/components/goods-select-popup.vue": () => import("./goods-select-popup-655f2c08.js"), "../addon/shop/views/marketing/exchange/components/goods-sku-select.vue": () => import("./goods-sku-select-655f2c08.js"), "../addon/shop/views/marketing/exchange/goods_add.vue": () => import("./goods_add-be6bac76.js"), "../addon/shop/views/marketing/exchange/goods_edit.vue": () => import("./goods_edit-ede26358.js"), "../addon/shop/views/marketing/exchange/goods_list.vue": () => import("./goods_list-655f2c08.js"), "../addon/shop/views/marketing/exchange/order_list.vue": () => import("./order_list-055264c0.js"), "../addon/shop/views/marketing/goods_rank/components/rank-select-popup.vue": () => import("./rank-select-popup-8c680ce5.js"), "../addon/shop/views/marketing/goods_rank/config.vue": () => import("./config-6a0ca7ec.js"), "../addon/shop/views/marketing/goods_rank/edit.vue": () => import("./edit-8c10629e.js"), "../addon/shop/views/marketing/goods_rank/list.vue": () => import("./list-3f1aed28.js"), "../addon/shop/views/marketing/index.vue": () => import("./index-27b86ecd.js"), "../addon/shop/views/marketing/manjian/detail.vue": () => import("./detail-262c6570.js"), "../addon/shop/views/marketing/manjian/edit.vue": () => import("./edit-9e73a2ee.js"), "../addon/shop/views/marketing/manjian/list.vue": () => import("./list-122e19c0.js"), "../addon/shop/views/marketing/newcomer/config.vue": () => import("./config-e7695139.js"), "../addon/shop/views/marketing/newcomer/order_list.vue": () => import("./order_list-d9dc414c.js"), "../addon/shop/views/member/components/benefits-free-shipping.vue": () => import("./benefits-free-shipping-655f2c08.js"), "../addon/shop/views/member/components/gift-coupon.vue": () => import("./gift-coupon-655f2c08.js"), "../addon/shop/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-6a0ca7ec.js"), "../addon/shop/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-655f2c08.js"), "../addon/shop/views/member/components/point-rule-buygoods.vue": () => import("./point-rule-buygoods-655f2c08.js"), "../addon/shop/views/member/components/point-rule-orderdeduction.vue": () => import("./point-rule-orderdeduction-655f2c08.js"), "../addon/shop/views/member/components/recharge-detail-coupon.vue": () => import("./recharge-detail-coupon-b33a4f54.js"), "../addon/shop/views/member/components/recharge-gift-coupon.vue": () => import("./recharge-gift-coupon-ee84508a.js"), "../addon/shop/views/order/batch_delivery.vue": () => import("./batch_delivery-655f2c08.js"), "../addon/shop/views/order/components/adjust-money.vue": () => import("./adjust-money-655f2c08.js"), "../addon/shop/views/order/components/delivery-action.vue": () => import("./delivery-action-655f2c08.js"), "../addon/shop/views/order/components/delivery-package.vue": () => import("./delivery-package-655f2c08.js"), "../addon/shop/views/order/components/electronic-sheet-print.vue": () => import("./electronic-sheet-print-655f2c08.js"), "../addon/shop/views/order/components/form-detail.vue": () => import("./form-detail-655f2c08.js"), "../addon/shop/views/order/components/import-data.vue": () => import("./import-data-655f2c08.js"), "../addon/shop/views/order/components/invoice-detail.vue": () => import("./invoice-detail-655f2c08.js"), "../addon/shop/views/order/components/invoice-dialog.vue": () => import("./invoice-dialog-655f2c08.js"), "../addon/shop/views/order/components/open-invoice.vue": () => import("./open-invoice-655f2c08.js"), "../addon/shop/views/order/components/order-detail.vue": () => import("./order-detail-6a0ca7ec.js"), "../addon/shop/views/order/components/order-edit-address.vue": () => import("./order-edit-address-655f2c08.js"), "../addon/shop/views/order/components/order-export-select.vue": () => import("./order-export-select-655f2c08.js"), "../addon/shop/views/order/components/order-notes.vue": () => import("./order-notes-7ac972e3.js"), "../addon/shop/views/order/components/refund-detail.vue": () => import("./refund-detail-e70f75ab.js"), "../addon/shop/views/order/components/shop-active-refund.vue": () => import("./shop-active-refund-6a0ca7ec.js"), "../addon/shop/views/order/config.vue": () => import("./config-1ad78c96.js"), "../addon/shop/views/order/detail.vue": () => import("./detail-f61fbcf2.js"), "../addon/shop/views/order/invoice.vue": () => import("./invoice-655f2c08.js"), "../addon/shop/views/order/list.vue": () => import("./list-de61d345.js"), "../addon/shop/views/order/refund.vue": () => import("./refund-5279f858.js"), "../addon/shop/views/poster/components/edit-goods-image.vue": () => import("./edit-goods-image-907653fa.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-market-price.vue": () => import("./edit-goods-market-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-name.vue": () => import("./edit-goods-name-f7d788a0.js").then((i) => i._), "../addon/shop/views/poster/components/edit-goods-price.vue": () => import("./edit-goods-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-image.vue": () => import("./preview-goods-image-f7d788a0.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-market-price.vue": () => import("./preview-goods-market-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-name.vue": () => import("./preview-goods-name-0a4df787.js").then((i) => i._), "../addon/shop/views/poster/components/preview-goods-price.vue": () => import("./preview-goods-price-d6db8e07.js").then((i) => i._), "../addon/shop/views/printer/components/preview-goods-order.vue": () => import("./preview-goods-order-37a1aa0d.js").then((i) => i._), "../addon/shop/views/sow_community/components/sow-community-gift-coupon.vue": () => import("./sow-community-gift-coupon-c01290a4.js"), "../addon/shop/views/stat/goods.vue": () => import("./goods-5143c7cb.js"), "../addon/shop/views/stat/index.vue": () => import("./index-601c91b2.js"), "../addon/shop/views/stat/member.vue": () => import("./member-ce49a1ae.js"), "../addon/shop/views/stat/order.vue": () => import("./order-ec093897.js"), "../addon/shop/views/stat/visit.vue": () => import("./visit-e9ea451f.js"), "../addon/shop_fenxiao/views/agent/level_config.vue": () => import("./level_config-655f2c08.js"), "../addon/shop_fenxiao/views/agent/list.vue": () => import("./list-545eb6f5.js"), "../addon/shop_fenxiao/views/agent/order.vue": () => import("./order-4f4228ea.js"), "../addon/shop_fenxiao/views/components/fenxiao-goods-detail.vue": () => import("./fenxiao-goods-detail-655f2c08.js"), "../addon/shop_fenxiao/views/components/fenxiao-of-select-popup.vue": () => import("./fenxiao-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/components/member-of-select-popup.vue": () => import("./member-of-select-popup-655f2c08.js"), "../addon/shop_fenxiao/views/config/index.vue": () => import("./index-df823b62.js"), "../addon/shop_fenxiao/views/config/poster.vue": () => import("./poster-655f2c08.js"), "../addon/shop_fenxiao/views/diy/components/edit-fenxiao-goods-list.vue": () => import("./edit-fenxiao-goods-list-9ffb527f.js").then((i) => i._), "../addon/shop_fenxiao/views/fenxiao/components/fenxiao-detail.vue": () => import("./fenxiao-detail-655f2c08.js"), "../addon/shop_fenxiao/views/fenxiao/detail.vue": () => import("./detail-24ca72c5.js"), "../addon/shop_fenxiao/views/fenxiao/edit.vue": () => import("./edit-9eb57442.js"), "../addon/shop_fenxiao/views/fenxiao/lists.vue": () => import("./lists-655f2c08.js"), "../addon/shop_fenxiao/views/goods/config.vue": () => import("./config-2d218da0.js"), "../addon/shop_fenxiao/views/goods/detail.vue": () => import("./detail-4d94da3c.js"), "../addon/shop_fenxiao/views/goods/lists.vue": () => import("./lists-e8dfffcb.js"), "../addon/shop_fenxiao/views/index/index.vue": () => import("./index-b0ffb798.js"), "../addon/shop_fenxiao/views/level/edit.vue": () => import("./edit-0dc0f896.js"), "../addon/shop_fenxiao/views/level/lists.vue": () => import("./lists-6a0ca7ec.js"), "../addon/shop_fenxiao/views/member/lists.vue": () => import("./lists-7ac972e3.js"), "../addon/shop_fenxiao/views/order/lists.vue": () => import("./lists-353e6b52.js"), "../addon/shop_fenxiao/views/sale/config.vue": () => import("./config-69f3c534.js"), "../addon/shop_fenxiao/views/sale/list.vue": () => import("./list-16d80079.js"), "../addon/shop_fenxiao/views/sale/member_list.vue": () => import("./member_list-655f2c08.js"), "../addon/shop_fenxiao/views/task/components/task-detail.vue": () => import("./task-detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/config.vue": () => import("./config-fcae6b14.js"), "../addon/shop_fenxiao/views/task/detail.vue": () => import("./detail-6a0ca7ec.js"), "../addon/shop_fenxiao/views/task/edit.vue": () => import("./edit-24ca72c5.js"), "../addon/shop_fenxiao/views/task/list.vue": () => import("./list-9439af69.js"), "../addon/shop_fenxiao/views/task/reward_detail.vue": () => import("./reward_detail-655f2c08.js"), "../addon/shop_fenxiao/views/task/reward_list.vue": () => import("./reward_list-655f2c08.js"), "../addon/shop_fenxiao/views/team/level.vue": () => import("./level-9a03afb1.js"), "../addon/shop_fenxiao/views/team/order.vue": () => import("./order-fe25a1a7.js"), "../addon/shop_giftcard/views/diy/components/edit-giftcard-list.vue": () => import("./edit-giftcard-list-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/giftcard/card_detail.vue": () => import("./card_detail-c53763a7.js"), "../addon/shop_giftcard/views/giftcard/category.vue": () => import("./category-6a0ca7ec.js"), "../addon/shop_giftcard/views/giftcard/components/category-edit.vue": () => import("./category-edit-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-detail.vue": () => import("./giftcard-detail-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-content.vue": () => import("./giftcard-select-content-03d4fa20.js"), "../addon/shop_giftcard/views/giftcard/components/giftcard-select-popup.vue": () => import("./giftcard-select-popup-ebc1ca56.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-edit.vue": () => import("./makecard-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/makecard-import-log.vue": () => import("./makecard-import-log-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-edit.vue": () => import("./material-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-group-edit.vue": () => import("./material-group-edit-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-move.vue": () => import("./material-move-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/components/material-select-popup.vue": () => import("./material-select-popup-f5377c62.js"), "../addon/shop_giftcard/views/giftcard/components/material-select.vue": () => import("./material-select-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/config.vue": () => import("./config-7ac972e3.js"), "../addon/shop_giftcard/views/giftcard/detail.vue": () => import("./detail-38aa1aac.js"), "../addon/shop_giftcard/views/giftcard/edit.vue": () => import("./edit-27b0755b.js"), "../addon/shop_giftcard/views/giftcard/list.vue": () => import("./list-788e9d8a.js"), "../addon/shop_giftcard/views/giftcard/makecard.vue": () => import("./makecard-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material.vue": () => import("./material-655f2c08.js"), "../addon/shop_giftcard/views/giftcard/material_group.vue": () => import("./material_group-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-detail.vue": () => import("./order-detail-655f2c08.js"), "../addon/shop_giftcard/views/order/components/order-notes.vue": () => import("./order-notes-24ca72c5.js"), "../addon/shop_giftcard/views/order/list.vue": () => import("./list-a4203436.js"), "../addon/shop_giftcard/views/poster/components/edit-giftcard-blessing.vue": () => import("./edit-giftcard-blessing-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-image.vue": () => import("./edit-giftcard-image-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-name.vue": () => import("./edit-giftcard-name-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/edit-giftcard-validity.vue": () => import("./edit-giftcard-validity-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-blessing.vue": () => import("./preview-giftcard-blessing-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-image.vue": () => import("./preview-giftcard-image-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-name.vue": () => import("./preview-giftcard-name-9ffb527f.js").then((i) => i._), "../addon/shop_giftcard/views/poster/components/preview-giftcard-validity.vue": () => import("./preview-giftcard-validity-9ffb527f.js").then((i) => i._), "../addon/shop_impulse_buy/views/impulse_buy/components/category-select-popup.vue": () => import("./category-select-popup-43921fac.js"), "../addon/shop_impulse_buy/views/impulse_buy/config.vue": () => import("./config-24ca72c5.js"), "../addon/shop_impulse_buy/views/impulse_buy/detail.vue": () => import("./detail-7ac972e3.js"), "../addon/shop_impulse_buy/views/impulse_buy/edit.vue": () => import("./edit-cbf86ff8.js"), "../addon/shop_impulse_buy/views/impulse_buy/list.vue": () => import("./list-2c2b8751.js"), "../addon/shop_replace_buy/views/components/add-address.vue": () => import("./add-address-655f2c08.js"), "../addon/shop_replace_buy/views/components/address-list.vue": () => import("./address-list-655f2c08.js"), "../addon/shop_replace_buy/views/components/coupon-list.vue": () => import("./coupon-list-655f2c08.js"), "../addon/shop_replace_buy/views/components/friend-pay.vue": () => import("./friend-pay-655f2c08.js"), "../addon/shop_replace_buy/views/components/goods-limit.vue": () => import("./goods-limit-655f2c08.js"), "../addon/shop_replace_buy/views/components/manjian-info.vue": () => import("./manjian-info-655f2c08.js"), "../addon/shop_replace_buy/views/components/select-goods.vue": () => import("./select-goods-655f2c08.js"), "../addon/shop_replace_buy/views/components/select-member.vue": () => import("./select-member-655f2c08.js"), "../addon/shop_replace_buy/views/components/store-list.vue": () => import("./store-list-655f2c08.js"), "../addon/shop_replace_buy/views/index.vue": () => import("./index-7da0b282.js"), "../addon/shop_replace_buy/views/order.vue": () => import("./order-655f2c08.js"), "../addon/sow_community/views/category/components/category-edit.vue": () => import("./category-edit-24ca72c5.js"), "../addon/sow_community/views/category/list.vue": () => import("./list-9b808d93.js"), "../addon/sow_community/views/comment/list.vue": () => import("./list-e949c5a9.js"), "../addon/sow_community/views/config/config.vue": () => import("./config-8c10629e.js"), "../addon/sow_community/views/content/components/content-detail.vue": () => import("./content-detail-a2ddce27.js"), "../addon/sow_community/views/content/components/select-member.vue": () => import("./select-member-6a0ca7ec.js"), "../addon/sow_community/views/content/components/treasure-select-popup.vue": () => import("./treasure-select-popup-4fb1b785.js"), "../addon/sow_community/views/content/edit.vue": () => import("./edit-b0ffb798.js"), "../addon/sow_community/views/content/list.vue": () => import("./list-07c4c15d.js"), "../addon/sow_community/views/content/select_content.vue": () => import("./select_content-a898afe2.js"), "../addon/sow_community/views/package/components/gift-balance.vue": () => import("./gift-balance-51dab398.js"), "../addon/sow_community/views/package/components/gift-points.vue": () => import("./gift-points-da310e35.js"), "../addon/sow_community/views/reward_rule/components/reward_rule-detail.vue": () => import("./reward_rule-detail-58d88b97.js"), "../addon/sow_community/views/reward_rule/edit.vue": () => import("./edit-23a83234.js"), "../addon/sow_community/views/reward_rule/list.vue": () => import("./list-e1e5a97c.js"), "../addon/sow_community/views/sensitive/index.vue": () => import("./index-16d80079.js"), "../addon/sow_community/views/topic/components/topic-edit.vue": () => import("./topic-edit-655f2c08.js"), "../addon/sow_community/views/topic/list.vue": () => import("./list-d7499fbc.js"), "../addon/sow_community/views/treasure/components/goods-select-popup.vue": () => import("./goods-select-popup-9ca391a4.js"), "../addon/sow_community/views/treasure/components/treasure-edit.vue": () => import("./treasure-edit-655f2c08.js"), "../addon/sow_community/views/treasure/list.vue": () => import("./list-0093effa.js"), "../addon/tk_cps/views/act/act.vue": () => import("./act-0a718d81.js"), "../addon/tk_cps/views/act/components/act-edit.vue": () => import("./act-edit-4b544e24.js"), "../addon/tk_cps/views/actitem/actitem.vue": () => import("./actitem-08422f8b.js"), "../addon/tk_cps/views/actitem/components/actitem-edit.vue": () => import("./actitem-edit-f75d9734.js"), "../addon/tk_cps/views/actorder/actorder.vue": () => import("./actorder-274b8eb0.js"), "../addon/tk_cps/views/actorder/components/actorder-edit.vue": () => import("./actorder-edit-6dd4283a.js"), "../addon/tk_cps/views/bwcorder/bwcorder.vue": () => import("./bwcorder-ad6668bd.js"), "../addon/tk_cps/views/bwcorder/components/bwcorder-edit.vue": () => import("./bwcorder-edit-db654917.js"), "../addon/tk_cps/views/components/act-link.vue": () => import("./act-link-3773a7a6.js"), "../addon/tk_cps/views/components/act-select.vue": () => import("./act-select-29e93df5.js"), "../addon/tk_cps/views/config/bwc.vue": () => import("./bwc-655f2c08.js"), "../addon/tk_cps/views/config/index.vue": () => import("./index-122e19c0.js"), "../addon/tk_cps/views/config/share.vue": () => import("./share-655f2c08.js"), "../addon/tk_cps/views/diy/components/edit-bwc.vue": () => import("./edit-bwc-44cd6942.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-adv.vue": () => import("./edit-cps-adv-2986a447.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-card-nav.vue": () => import("./edit-cps-card-nav-6c90fb36.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-collection.vue": () => import("./edit-cps-collection-ace44f28.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-cps-nav.vue": () => import("./edit-cps-nav-f1a89638.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-hotel.vue": () => import("./edit-hotel-da80282f.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-movie.vue": () => import("./edit-movie-e1e2a682.js").then((i) => i._), "../addon/tk_cps/views/diy/components/edit-shop.vue": () => import("./edit-shop-06a3525f.js").then((i) => i._), "../addon/tk_cps/views/doc/index.vue": () => import("./index-bbb195cc.js"), "../addon/tk_cps/views/jtk/order.vue": () => import("./order-2a8ff4d3.js"), "../addon/tk_cps/views/member/components/benefits-bwc-fenxiao.vue": () => import("./benefits-bwc-fenxiao-655f2c08.js"), "../addon/tk_cps/views/member/components/benefits-bwc-level.vue": () => import("./benefits-bwc-level-655f2c08.js"), "../addon/tk_cps/views/member/components/benefits-cps-fenxiao.vue": () => import("./benefits-cps-fenxiao-655f2c08.js"), "../addon/tk_cps/views/member/components/growth-rule-bwcorder.vue": () => import("./growth-rule-bwcorder-655f2c08.js"), "../addon/tk_cps/views/member/components/growth-rule-cpsorder.vue": () => import("./growth-rule-cpsorder-655f2c08.js"), "../addon/tk_cps/views/member/components/point-rule-bwcorder.vue": () => import("./point-rule-bwcorder-655f2c08.js"), "../addon/tk_cps/views/member/components/point-rule-cpsorder.vue": () => import("./point-rule-cpsorder-655f2c08.js"), "../addon/tk_cps/views/myxq/dc_order.vue": () => import("./dc_order-65813d85.js"), "../addon/tk_cps/views/myxq/movie_order.vue": () => import("./movie_order-5e4b80ee.js"), "../addon/tk_cps/views/myxq/near_order.vue": () => import("./near_order-2c768017.js"), "../addon/tk_cps/views/myxq/other_order.vue": () => import("./other_order-26f8cac1.js"), "../addon/tk_cps/views/myxq/recharge_order.vue": () => import("./recharge_order-f0d84120.js"), "../addon/tk_cps/views/myxq/shop_order.vue": () => import("./shop_order-9c20a964.js"), "../addon/tk_cps/views/partner/components/tk-bwc.vue": () => import("./tk-bwc-655f2c08.js"), "../addon/tk_cps/views/partner/components/tk-cps.vue": () => import("./tk-cps-655f2c08.js"), "../addon/tk_cps/views/platform/components/jtk.vue": () => import("./jtk-655f2c08.js"), "../addon/tk_cps/views/platform/components/myxq.vue": () => import("./myxq-655f2c08.js"), "../addon/tk_cps/views/platform/platform.vue": () => import("./platform-655f2c08.js"), "../addon/tk_cps/views/share/components/share-edit.vue": () => import("./share-edit-e8e2847c.js"), "../addon/tk_cps/views/share/share.vue": () => import("./share-68faf373.js"), "../addon/tk_cps/views/tkfenxiao/components/commission/tk-bwc-fenxiao.vue": () => import("./tk-bwc-fenxiao-655f2c08.js"), "../addon/tk_cps/views/tkfenxiao/components/commission/tk-cps-fenxiao.vue": () => import("./tk-cps-fenxiao-655f2c08.js"), "../addon/tourism/views/components/goods-day-member-price-popup.vue": () => import("./goods-day-member-price-popup-092408a2.js"), "../addon/tourism/views/components/goods-member-price-popup.vue": () => import("./goods-member-price-popup-3a6d2baf.js"), "../addon/tourism/views/components/hotel-select-popup.vue": () => import("./hotel-select-popup-707b0bcd.js"), "../addon/tourism/views/components/tickets-select-popup.vue": () => import("./tickets-select-popup-180ac076.js"), "../addon/tourism/views/components/travel-select-popup.vue": () => import("./travel-select-popup-064ee649.js"), "../addon/tourism/views/components/verifier.vue": () => import("./verifier-655f2c08.js"), "../addon/tourism/views/diy/components/edit-tourism-hotel.vue": () => import("./edit-tourism-hotel-9ffb527f.js").then((i) => i._), "../addon/tourism/views/diy/components/edit-tourism-tickets.vue": () => import("./edit-tourism-tickets-9ffb527f.js").then((i) => i._), "../addon/tourism/views/diy/components/edit-tourism-travel.vue": () => import("./edit-tourism-travel-9ffb527f.js").then((i) => i._), "../addon/tourism/views/hotel/edit_hotel.vue": () => import("./edit_hotel-2763556a.js"), "../addon/tourism/views/hotel/edit_room.vue": () => import("./edit_room-20269b73.js"), "../addon/tourism/views/hotel/list.vue": () => import("./list-2c7214bb.js"), "../addon/tourism/views/hotel/order.vue": () => import("./order-6a0ca7ec.js"), "../addon/tourism/views/hotel/order_detail.vue": () => import("./order_detail-24ca72c5.js"), "../addon/tourism/views/hotel/room.vue": () => import("./room-655f2c08.js"), "../addon/tourism/views/hotel/select_content.vue": () => import("./select_content-47934b3f.js"), "../addon/tourism/views/index.vue": () => import("./index-f68fb002.js"), "../addon/tourism/views/member/components/growth-rule-buygoods.vue": () => import("./growth-rule-buygoods-7ac972e3.js"), "../addon/tourism/views/member/components/growth-rule-buyorder.vue": () => import("./growth-rule-buyorder-6a0ca7ec.js"), "../addon/tourism/views/poster/components/edit-tourism-goods-image.vue": () => import("./edit-tourism-goods-image-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/edit-tourism-goods-name.vue": () => import("./edit-tourism-goods-name-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/edit-tourism-goods-price.vue": () => import("./edit-tourism-goods-price-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-image.vue": () => import("./preview-tourism-goods-image-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-name.vue": () => import("./preview-tourism-goods-name-9ffb527f.js").then((i) => i._), "../addon/tourism/views/poster/components/preview-tourism-goods-price.vue": () => import("./preview-tourism-goods-price-9ffb527f.js").then((i) => i._), "../addon/tourism/views/refund.vue": () => import("./refund-6a0ca7ec.js"), "../addon/tourism/views/scenic/edit_scenic.vue": () => import("./edit_scenic-35f2a4cf.js"), "../addon/tourism/views/scenic/edit_ticket.vue": () => import("./edit_ticket-655f2c08.js"), "../addon/tourism/views/scenic/list.vue": () => import("./list-032bb2e9.js"), "../addon/tourism/views/scenic/order.vue": () => import("./order-7ac972e3.js"), "../addon/tourism/views/scenic/order_detail.vue": () => import("./order_detail-7ac972e3.js"), "../addon/tourism/views/scenic/select_content.vue": () => import("./select_content-2d4a5815.js"), "../addon/tourism/views/scenic/ticket.vue": () => import("./ticket-655f2c08.js"), "../addon/tourism/views/setting.vue": () => import("./setting-655f2c08.js"), "../addon/tourism/views/site_index.vue": () => import("./site_index-37f33826.js"), "../addon/tourism/views/verify.vue": () => import("./verify-6a0ca7ec.js"), "../addon/tourism/views/way/edit.vue": () => import("./edit-d61a1a40.js"), "../addon/tourism/views/way/list.vue": () => import("./list-576f801a.js"), "../addon/tourism/views/way/order.vue": () => import("./order-24ca72c5.js"), "../addon/tourism/views/way/order_detail.vue": () => import("./order_detail-655f2c08.js"), "../addon/tourism/views/way/select_content.vue": () => import("./select_content-1ca9d641.js"), "../addon/vipcard/views/card/edit.vue": () => import("./edit-4d91903c.js"), "../addon/vipcard/views/card/list.vue": () => import("./list-9a3023c5.js"), "../addon/vipcard/views/card/record_info.vue": () => import("./record_info-6a0ca7ec.js"), "../addon/vipcard/views/card/record_list.vue": () => import("./record_list-655f2c08.js"), "../addon/vipcard/views/card/select_content.vue": () => import("./select_content-d8704fb9.js"), "../addon/vipcard/views/components/card-goods-select.vue": () => import("./card-goods-select-655f2c08.js"), "../addon/vipcard/views/components/category-edit.vue": () => import("./category-edit-8c10629e.js"), "../addon/vipcard/views/components/goods-select-popup.vue": () => import("./goods-select-popup-a962abb6.js"), "../addon/vipcard/views/components/record-info.vue": () => import("./record-info-655f2c08.js"), "../addon/vipcard/views/components/verifier.vue": () => import("./verifier-6a0ca7ec.js"), "../addon/vipcard/views/diy/components/edit-vipcard-card.vue": () => import("./edit-vipcard-card-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/diy/components/edit-vipcard-reserve.vue": () => import("./edit-vipcard-reserve-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/diy/components/edit-vipcard-store.vue": () => import("./edit-vipcard-store-9ffb527f.js").then((i) => i._), "../addon/vipcard/views/index.vue": () => import("./index-6dbc7259.js"), "../addon/vipcard/views/order.vue": () => import("./order-8c10629e.js"), "../addon/vipcard/views/order_detail.vue": () => import("./order_detail-6a0ca7ec.js"), "../addon/vipcard/views/refund.vue": () => import("./refund-655f2c08.js"), "../addon/vipcard/views/reserve/components/add-reserve.vue": () => import("./add-reserve-655f2c08.js"), "../addon/vipcard/views/reserve/components/reserve-detail.vue": () => import("./reserve-detail-655f2c08.js"), "../addon/vipcard/views/reserve/components/vipcard-reserve-edit.vue": () => import("./vipcard-reserve-edit-655f2c08.js"), "../addon/vipcard/views/reserve/index.vue": () => import("./index-eecf728b.js"), "../addon/vipcard/views/reserve/list.vue": () => import("./list-02a6dc3f.js"), "../addon/vipcard/views/reserve/set.vue": () => import("./set-655f2c08.js"), "../addon/vipcard/views/service/category.vue": () => import("./category-7ac972e3.js"), "../addon/vipcard/views/service/edit.vue": () => import("./edit-1ad78c96.js"), "../addon/vipcard/views/service/list.vue": () => import("./list-a5e84786.js"), "../addon/vipcard/views/service/record_info.vue": () => import("./record_info-655f2c08.js"), "../addon/vipcard/views/service/record_list.vue": () => import("./record_list-6a0ca7ec.js"), "../addon/vipcard/views/service/select_content.vue": () => import("./select_content-b29bb8fb.js"), "../addon/vipcard/views/site_index.vue": () => import("./site_index-39648ad8.js"), "../addon/vipcard/views/technician/components/add-technician.vue": () => import("./add-technician-655f2c08.js"), "../addon/vipcard/views/technician/detail.vue": () => import("./detail-be331a1e.js"), "../addon/vipcard/views/technician/list.vue": () => import("./list-3863697e.js"), "../addon/vipcard/views/verify.vue": () => import("./verify-655f2c08.js") });
async function loadCoreVueModule(i) {
  const s = findCoreModuleLoader(i);
  if (s)
    return s();
  throw new Error(`Component not found: ${i}`);
}
const MainJS = "CLodopfuncs.js", URL_WS1 = ref("ws://localhost:{port}/" + MainJS), URL_WS2 = ref("ws://localhost:{port}/" + MainJS), URL_HTTP1 = ref("http://localhost:{port}/" + MainJS), URL_HTTP2 = ref("http://localhost:{port}/" + MainJS), URL_HTTP3 = ref("https://localhost.lodop.net:{port}/" + MainJS), CreatedOKLodopObject = ref(null), CLodopIsLocal = ref(null), LoadJsState = ref(""), initPort = (i) => {
  i || (i = {
    server_port1: 8e3,
    server_port2: 18e3,
    https_port: 8443
  }), URL_WS1.value = URL_WS1.value.replace("{port}", i.server_port1), URL_WS2.value = URL_WS2.value.replace("{port}", i.server_port2), URL_HTTP1.value = URL_HTTP1.value.replace("{port}", i.server_port1), URL_HTTP2.value = URL_HTTP2.value.replace("{port}", i.server_port2), URL_HTTP3.value = URL_HTTP2.value.replace("{port}", i.https_port);
}, needCLodop = () => {
  try {
    let i = navigator.userAgent;
    if (i.match(/Windows\sPhone/i) || i.match(/iPhone|iPod|iPad/i) || i.match(/Android/i) || i.match(/Edge\D?\d+/i))
      return !0;
    let s = i.match(/Trident\D?\d+/i), r = i.match(/MSIE\D?\d+/i), a = i.match(/OPR\D?\d+/i), d = i.match(/Firefox\D?\d+/i), c = i.match(/x64/i);
    if (!s && !r && c)
      return !0;
    if (d) {
      if (d = d[0].match(/\d+/), d[0] >= 41 || c)
        return !0;
    } else if (a) {
      if (a = a[0].match(/\d+/), a[0] >= 32)
        return !0;
    } else if (!s && !r) {
      let l = i.match(/Chrome\D?\d+/i);
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
  let i = document.head || document.getElementsByTagName("head")[0] || document.documentElement, s = document.createElement("script"), r = document.createElement("script"), a = document.createElement("script");
  s.src = URL_HTTP1.value, r.src = URL_HTTP2.value, a.src = URL_HTTP3.value, s.onload = r.onload = a.onload = r.onerror = a.onerror = function() {
    LoadJsState.value = "complete";
  }, s.onerror = function(d) {
    window.location.protocol !== "https:" ? i.insertBefore(r, i.firstChild) : i.insertBefore(a, i.firstChild);
  }, i.insertBefore(s, i.firstChild);
}
const loadCLodop = (paramas = null) => {
  if (needCLodop()) {
    initPort(paramas), CLodopIsLocal.value = !!(URL_WS1.value + URL_WS2.value).match(/\/\/localho|\/\/127.0.0./i), LoadJsState.value = "loadingA", !window.WebSocket && window.MozWebSocket && (window.WebSocket = window.MozWebSocket);
    try {
      let WSK1 = new WebSocket(URL_WS1.value);
      WSK1.onopen = function(i) {
        setTimeout(checkOrTryHttp, 200);
      }, WSK1.onmessage = function(e) {
        window.getCLodop || eval(e.data);
      }, WSK1.onerror = function(e) {
        let WSK2 = new WebSocket(URL_WS2.value);
        WSK2.onopen = function(i) {
          setTimeout(checkOrTryHttp, 200);
        }, WSK2.onmessage = function(e) {
          window.getCLodop || eval(e.data);
        }, WSK2.onerror = function(i) {
          checkOrTryHttp();
        };
      };
    } catch (i) {
      checkOrTryHttp();
    }
  }
}, getLodop = (i = null, s = null) => {
  let r = "<br>打印控件", a = r + "未安装!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行安装</a>", d = r + "需要升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>", c = "<br>Web打印服务CLodop未安装启动，点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载执行安装</a>", l = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_blank' class='text-primary'>点这里直接再次启动</a>）", p = "<br>Web打印服务CLodop需升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>", u = "<br>Web打印服务Lodop7", m = "点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载安装</a>(下载后解压，点击lodop文件开始执行)", v = u + "未安装启动，" + m, h = u + "需升级，" + m, f = "，成功后请刷新本页面或重启浏览器。", w;
  try {
    let g = /MSIE/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent), _ = /Linux/i.test(navigator.platform) && /x86/i.test(navigator.platform), y = /Linux/i.test(navigator.platform) && /aarch/i.test(navigator.platform);
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
        (_ || y) && w.CVERSION < "7.0.7.5" ? S = h : CLODOP.CVERSION < "6.5.9.8" && (S = p), S && ElMessageBox.alert(S + f, "提示", { dangerouslyUseHTMLString: !0 });
      else {
        _ || y ? S = v : S = c + (CLodopIsLocal.value ? l : ""), ElMessageBox.alert(S + f, "提示", { dangerouslyUseHTMLString: !0 });
        return;
      }
    } else {
      if (i || s ? g ? w = i : w = s : CreatedOKLodopObject.value ? w = CreatedOKLodopObject.value : (w = document.createElement("object"), w.setAttribute("width", 0), w.setAttribute("height", 0), w.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;"), g ? w.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA") : w.setAttribute("type", "application/x-print-lodop"), document.documentElement.appendChild(w), CreatedOKLodopObject.value = w), !w || !w.VERSION)
        return ElMessageBox.alert(a + f, "提示", { dangerouslyUseHTMLString: !0 }), w;
      w.VERSION < "6.2.2.6" && ElMessageBox.alert(d + f, "提示", { dangerouslyUseHTMLString: !0 });
    }
    return w;
  } catch (g) {
    ElMessage({
      message: "getLodop出错:" + g,
      type: "error",
      duration: 5e3
    });
  }
};
function getAliappConfig() {
  return request.get("aliapp/config");
}
function setAliappConfig(i) {
  return request.put("aliapp/config", i, { showSuccessMessage: !0 });
}
function getAliappStatic() {
  return request.get("aliapp/static");
}
function getAppConfig() {
  return request.get("channel/app/config");
}
function setAppConfig(i) {
  return request.put("channel/app/config", i, { showSuccessMessage: !0 });
}
function getVersionList$1(i) {
  return request.get("channel/app/version", { params: i });
}
function getVersionInfo$1(i) {
  return request.get(`channel/app/version/${i}`);
}
function getAppPlatform() {
  return request.get("channel/app/platfrom");
}
function addVersion$1(i) {
  return request.post("channel/app/version", i, { showSuccessMessage: !0 });
}
function editVersion$1(i) {
  return request.put(`channel/app/version/${i.id}`, i, { showSuccessMessage: !0 });
}
function deleteVersion$1(i) {
  return request.delete(`channel/app/version/${i.id}`);
}
function getBuildLog(i) {
  return request.get(`channel/app/build/log/${i}`);
}
function releaseVersion(i) {
  return request.put(`channel/app/version/${i}/release`, {}, { showSuccessMessage: !0 });
}
function generateSingCert(i) {
  return request.post("channel/app/generate_sing_cert", i, { showSuccessMessage: !0 });
}
const CLOUD_COMPILE_BASE_URL = location.protocol + "//go.site.niucloud.com";
function createCloudCompileRequest() {
  const i = axios$2.create({
    baseURL: CLOUD_COMPILE_BASE_URL,
    timeout: 0,
    headers: {
      lang: storage.get("lang") ?? "zh-cn"
    }
  });
  return i.interceptors.request.use(
    (s) => {
      const r = storage.get("token");
      return r && (s.headers.token = r), s;
    },
    (s) => Promise.reject(s)
  ), i.interceptors.response.use(
    (s) => s.data,
    (s) => Promise.reject(s)
  ), i;
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
function getCloudBuildQueuePosition(i) {
  return cloudCompileRequest.get("/cloud/queue_position", { params: { task_id: i } });
}
function getCloudBuildSseUrl(i) {
  return `${CLOUD_COMPILE_BASE_URL}/cloud/sse?task_id=${i}`;
}
function getCloudCompileLocalUrl() {
  return request.get("niucloud/build/get_local_url");
}
function setCloudCompileLocalUrl(i) {
  return request.post("niucloud/build/set_local_url", { url: i });
}
function startServerDownload(i, s, r, a) {
  return request.post("niucloud/build/start_server_download", {
    task_id: i,
    download_url: s,
    authorize_code: r,
    timestamp: a
  });
}
function getSseBuildLog(i) {
  return request.get("niucloud/build/get_sse_build_log", { params: { task_id: i } });
}
function getDictList(i) {
  return request.get("dict/dict", { params: i });
}
function getDictInfo(i) {
  return request.get(`dict/dict/${i}`);
}
function addDict(i) {
  return request.post("dict/dict", i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function addDictData(i) {
  return request.put(`dict/dict/${i.id}`, i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editDict(i) {
  return request.put(`dict/dict/${i.id}`, i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function deleteDict(i) {
  return request.delete(`dict/dict/${i}`, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function setDictData(i, s) {
  return request.put(`dict/dictionary/${i}`, s, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function getDictAll() {
  return request.get("dict/all");
}
function useDictionary(i) {
  return request.get(`dict/dictionary/type/${i}`);
}
function getDiyPageList(i) {
  return request.get("diy/diy", { params: i });
}
function getDiyPageListByCarouselSearch(i) {
  return request.get("diy/carousel_search", { params: i });
}
function getDiyList(i) {
  return request.get("diy/list", { params: i });
}
function getDiyPageInfo(i) {
  return request.get(`diy/diy/${i}`);
}
function addDiyPage(i) {
  return request.post("diy/diy", i, { showSuccessMessage: !0 });
}
function editDiyPage(i) {
  return request.put(`diy/diy/${i.id}`, i, { showSuccessMessage: !0 });
}
function setUseDiyPage(i) {
  return request.put(`diy/use/${i.id}`, i, { showSuccessMessage: !0 });
}
function editDiyPageShare(i) {
  return request.put("diy/diy/share", i, { showSuccessMessage: !0 });
}
function deleteDiyPage(i) {
  return request.delete(`diy/diy/${i}`, { showSuccessMessage: !0 });
}
function initPage$1(i) {
  return request.get("diy/init", { params: i });
}
function getLink(i) {
  return request.get("diy/link", { params: i });
}
function getDiyBottomList(i) {
  return request.get("diy/bottom", { params: i });
}
function getDiyBottomConfig(i) {
  return request.get("diy/bottom/config", { params: i });
}
function setDiyBottomConfig(i) {
  return request.post("diy/bottom", i, { showSuccessMessage: !0 });
}
function getDiyTemplate$1(i) {
  return request.get("diy/template", { params: i });
}
function getDiyTemplatePages$1(i) {
  return request.get("diy/template/pages", { params: i });
}
function getDiyRouteList(i) {
  return request.get("diy/route", { params: i });
}
function getDiyRouteAppList() {
  return request.get("diy/route/apps");
}
function getDiyRouteInfo(i) {
  return request.get("diy/route/info", { params: i });
}
function editDiyRouteShare(i) {
  return request.put("diy/route/share", i, { showSuccessMessage: !0 });
}
function getDecoratePage(i) {
  return request.get("diy/decorate", { params: i });
}
function changeTemplate(i) {
  return request.put("diy/change", i, { showSuccessMessage: !0 });
}
function getApps$1(i) {
  return request.get("diy/apps");
}
function copyDiy$1(i) {
  return request.post("diy/copy", i, { showSuccessMessage: !0 });
}
function getPageLink(i) {
  return request.get("diy/page_link", { params: i });
}
function getDefaultTheme(i) {
  return request.get("diy/theme/color", { params: i });
}
function getDiyTheme(i) {
  return request.get("diy/theme", { params: i });
}
function addTheme(i) {
  return request.post("diy/theme/add", i);
}
function editTheme(i) {
  return request.put(`diy/theme/edit/${i.id}`, i, { showSuccessMessage: !0 });
}
function deleteTheme(i) {
  return request.delete(`diy/theme/delete/${i}`, { showSuccessMessage: !0 });
}
function setDiyTheme(i) {
  return request.post("diy/theme", i, { showSuccessMessage: !0 });
}
function getDiyFormPageList(i) {
  return request.get("diy/form", { params: i });
}
function getDiyFormList(i) {
  return request.get("diy/form/list", { params: i });
}
function getDiyFormSelectPageList(i) {
  return request.get("diy/form/select", { params: i });
}
function getDiyFormInfo(i) {
  return request.get(`diy/form/${i}`);
}
function addDiyForm(i) {
  return request.post("diy/form", i, { showSuccessMessage: !0 });
}
function editDiyForm(i) {
  return request.put(`diy/form/${i.form_id}`, i, { showSuccessMessage: !0 });
}
function editDiyFormShare(i) {
  return request.put("diy/form/share", i, { showSuccessMessage: !0 });
}
function deleteDiyForm(i) {
  return request.put("diy/form/delete", i, { showSuccessMessage: !0 });
}
function initPage(i) {
  return request.get("diy/form/init", { params: i });
}
function getDiyFormQrcode(i) {
  return request.get("diy/form/qrcode", { params: i });
}
function getDiyFormFieldsList(i) {
  return request.get("diy/form/fields/list", { params: i });
}
function getDiyFormFieldStat(i) {
  return request.get("diy/form/records/field/stat", { params: i });
}
function getDiyTemplate(i) {
  return request.get("diy/template", { params: i });
}
function getDiyTemplatePages(i) {
  return request.get("diy/form/template", { params: i });
}
function editFormStatus(i) {
  return request.put("diy/form/status", i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getApps(i) {
  return request.get("diy/apps");
}
function copyDiy(i) {
  return request.post("diy/form/copy", i, { showSuccessMessage: !0 });
}
function getFormType(i) {
  return request.get("diy/form/type");
}
function getFormWriteConfig(i) {
  return request.get(`diy/form/write/${i}`);
}
function editDiyFormWriteConfig(i) {
  return request.put("diy/form/write", i, { showSuccessMessage: !0 });
}
function getFormSubmitConfig(i) {
  return request.get(`diy/form/submit/${i}`);
}
function editDiyFormSubmitConfig(i) {
  return request.put("diy/form/submit", i, { showSuccessMessage: !0 });
}
function getFormRecords(i) {
  return request.get("diy/form/records", { params: i });
}
function getFormRecordsInfo(i) {
  return request.get(`diy/form/records/${i}`);
}
function deleteFormRecords(i) {
  return request.put("diy/form/records/delete", i, { showSuccessMessage: !0 });
}
function getFormRecordsMember(i) {
  return request.get("diy/form/records/member/stat", { params: i });
}
function copyForm(i) {
  return request.post("diy/form/copy", i, { showSuccessMessage: !0 });
}
function getH5Config() {
  return request.get("channel/h5/config");
}
function setH5Config(i) {
  return request.put("channel/h5/config", i, { showSuccessMessage: !0 });
}
function getHomeSite(i) {
  return request.get("home/site", { params: i });
}
function getSiteGroup() {
  return request.get("home/site/group");
}
function createSite(i) {
  return request.post("home/site/create", i);
}
function getMemberList(i) {
  return request.get("member/member", { params: i });
}
function getMemberInfo(i) {
  return request.get(`member/member/${i}`);
}
function getMemberNo() {
  return request.get("member/memberno");
}
function addMember(i) {
  return request.post("member/member", i, { showSuccessMessage: !0 });
}
function getRegisterType(i) {
  return request.get("member/registertype", i);
}
function getRegisterChannelType(i) {
  return request.get("member/register/channel", i);
}
function deleteMember(i) {
  return request.delete(`member/member/${i}`, { showSuccessMessage: !0 });
}
function getMemberLabelList(i) {
  return request.get("member/label", { params: i });
}
function getMemberLabelInfo(i) {
  return request.get(`member/label/${i}`);
}
function addMemberLabel(i) {
  return request.post("member/label", i, { showSuccessMessage: !0 });
}
function updateMemberLabel(i) {
  return request.put(`member/label/${i.label_id}`, i, { showSuccessMessage: !0 });
}
function deleteMemberLabel(i) {
  return request.delete(`member/label/${i}`, { showSuccessMessage: !0 });
}
function getMemberLabelAll() {
  return request.get("member/label/all");
}
function editMemberDetail(i) {
  return request.put(`member/member/modify/${i.member_id}/${i.field}`, i, { showSuccessMessage: !0 });
}
function memberBatchModify(i) {
  return request.post("member/member/batch_modify", i, { showSuccessMessage: !0 });
}
function getChangeTypeList(i) {
  return request.get(`member/account/change_type/${i}`);
}
function getPointList(i) {
  return request.get("member/account/point", { params: i });
}
function getGrowthList(i) {
  return request.get("member/account/growth", { params: i });
}
function getBalanceList(i) {
  return request.get("member/account/balance", { params: i });
}
function getMoneyList(i) {
  return request.get("member/account/money", { params: i });
}
function getCommissionList(i) {
  return request.get("member/account/commission", { params: i });
}
function adjustPoint(i) {
  return request.post("member/account/point", i, { showSuccessMessage: !0 });
}
function adjustBalance(i) {
  return request.post("member/account/balance", i, { showSuccessMessage: !0 });
}
function getLoginConfig() {
  return request.get("member/config/login");
}
function setLoginConfig(i) {
  return request.post("member/config/login", i, { showSuccessMessage: !0 });
}
function getMemberConfig() {
  return request.get("member/config/member");
}
function setMemberConfig(i) {
  return request.post("member/config/member", i, { showSuccessMessage: !0 });
}
function setGrowthRuleConfig(i) {
  return request.post("member/config/growth_rule", i, { showSuccessMessage: !0 });
}
function getGrowthRuleConfig() {
  return request.get("member/config/growth_rule");
}
function setPointRuleConfig(i) {
  return request.post("member/config/point_rule", i, { showSuccessMessage: !0 });
}
function getPointRuleConfig() {
  return request.get("member/config/point_rule");
}
function getTransfertype() {
  return request.get("member/cash_out/transfertype");
}
function getCommissionSum(i) {
  return request.get("member/account/sum_commission", { params: i });
}
function getPointSum(i) {
  return request.get("member/account/sum_point", { params: i });
}
function getBalanceSum(i) {
  return request.get("member/account/sum_balance", { params: i });
}
function getBalanceStatus() {
  return request.get("member/account/type");
}
function getAccountType$2(i) {
  return request.get(`member/account/change_type/${i.account_type}`);
}
function getCashOutConfig() {
  return request.get("member/config/cash_out");
}
function setCashOutConfig(i) {
  return request.post("member/config/cash_out", i, { showSuccessMessage: !0 });
}
function getCashOutList(i) {
  return request.get("member/cash_out", { params: i });
}
function getCashOutDetail(i) {
  return request.get(`member/cash_out/${i}`, {});
}
function memberAudit(i) {
  return request.put(`member/cash_out/audit/${i.id}/${i.action}`, i, { showSuccessMessage: !0 });
}
function memberCancel(i) {
  return request.put(`member/cash_out/cancel/${i.id}`, i, {
    showSuccessMessage: !0,
    showErrorMessage: !0
  });
}
function memberTransfer(i) {
  return request.put(`member/cash_out/transfer/${i.id}`, i, { showSuccessMessage: !0 });
}
function memberRemark(i) {
  return request.put(`member/cash_out/remark/${i.id}`, i, { showSuccessMessage: !0 });
}
function memberCheck(i) {
  return request.put(`member/cash_out/check/${i}`, {}, { showSuccessMessage: !0 });
}
function editMemberStatus(i) {
  return request.put(`member/setstatus/${i.status}`, i, { showSuccessMessage: !0 });
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
function getMemberLevelPageList(i) {
  return request.get("member/level", { params: i });
}
function getMemberLevelInfo(i) {
  return request.get(`member/level/${i}`);
}
function addMemberLevel(i) {
  return request.post("member/level", i, { showSuccessMessage: !0 });
}
function updateMemberLevel(i) {
  return request.put(`member/level/${i.level_id}`, i, { showSuccessMessage: !0 });
}
function deleteMemberLevel(i) {
  return request.delete(`member/level/${i}`, { showSuccessMessage: !0 });
}
function getMemberLevelAll() {
  return request.get("member/level/all");
}
function getMemberBenefitsContent() {
  return request.post("member/benefits/content");
}
function getMemberGiftsContent(i) {
  return request.post("member/gifts/content", i);
}
function getSignConfig() {
  return request.get("member/sign/config");
}
function setSignConfig(i) {
  return request.put("member/sign/config", i, { showSuccessMessage: !0 });
}
function getMemberSignList(i) {
  return request.get("member/sign", { params: i });
}
function getMemberAddress(i) {
  return request.get("member/address", { params: i });
}
function addMemberAddress(i) {
  return request.post("member/address", i);
}
function editMemberAddress(i) {
  return request.put("member/address", i);
}
function getNoticeList(i) {
  return request.get("notice/notice", { params: i });
}
function getNoticeLog(i) {
  return request.get("notice/log", { params: i });
}
function getBindInfo() {
  return request.get("notice/bind/info");
}
function cancelBind(i) {
  return request.post("notice/bind/cancel", i);
}
function getWechatAuthUrl() {
  return request.get("notice/bind/wechat");
}
function getWeappAuthUrl$1() {
  return request.get("notice/bind/weapp");
}
function sendSms(i) {
  return request.post("notice/bind/sms/send", i, { showSuccessMessage: !0 });
}
function bindSms(i) {
  return request.post("notice/bind/sms/bind", i, { showSuccessMessage: !0 });
}
function getNoticeInfo(i) {
  return request.get(`notice/notice/${i}`);
}
function editNoticeStatus(i) {
  return request.post("notice/notice/editstatus", i, { showSuccessMessage: !0 });
}
function editNotice(i) {
  return request.post("notice/notice/edit", i, { showSuccessMessage: !0 });
}
function getSmsList() {
  return request.get("notice/notice/sms");
}
function getSmsInfo(i) {
  return request.get(`notice/notice/sms/${i}`);
}
function editSms(i) {
  return request.put(`notice/notice/sms/${i.sms_type}`, i, { showSuccessMessage: !0 });
}
function getSmsLog(i) {
  return request.get("notice/sms/log", { params: i });
}
function getAccountIsLogin() {
  return request.get("notice/niusms/config");
}
function loginAccount(i) {
  return request.post("notice/niusms/account/login", i, { showSuccessMessage: !0 });
}
function registerAccount(i) {
  return request.post("notice/niusms/account/register", i, { showSuccessMessage: !0 });
}
function getAccountInfo$2(i) {
  return request.get(`notice/niusms/account/info/${i}`);
}
function getTemplateList$2(i) {
  return request.get(`notice/niusms/template/list/${i.sms_type}/${i.username}`, {});
}
function getSignList(i, s) {
  return request.get(`notice/niusms/sign/list/${i}`, { params: s });
}
function addSign(i, s) {
  return request.post(`notice/niusms/sign/report/${i}`, s, { showSuccessMessage: !0 });
}
function deleteSign(i, s) {
  return request.post(`notice/niusms/sign/delete/${i}`, s, { showSuccessMessage: !0 });
}
function editAccount(i, s) {
  return request.post(`notice/niusms/account/edit/${i}`, s, { showSuccessMessage: !0 });
}
function getSmsSendList(i, s) {
  return request.get(`notice/niusms/account/send_list/${i}`, { params: s });
}
function getSmsOrdersList(i, s) {
  return request.get(`notice/niusms/order/list/${i}`, { params: s });
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
function getSmsSend(i) {
  return request.post("notice/niusms/send", i, { showSuccessMessage: !0 });
}
function getSmsSignConfig() {
  return request.get("notice/niusms/sign/report/config");
}
function getTemplateReportConfig() {
  return request.get("notice/niusms/template/report/config");
}
function reportTemplate(i, s, r) {
  return request.post(`notice/niusms/template/report/${i}/${s}`, r, { showSuccessMessage: !0 });
}
function getreportTemplateInfo(i, s, r) {
  return request.get(`notice/niusms/template/info/${i}/${s}`, { params: r });
}
function smsOrderCreate(i, s) {
  return request.post(`notice/niusms/order/create/${i}`, s);
}
function getOrderPayInfo(i, s) {
  return request.get(`notice/niusms/order/pay/${i}`, { params: s });
}
function getOrderInfo(i, s) {
  return request.get(`notice/niusms/order/info/${i}`, { params: s });
}
function getOrderPayStatus(i, s) {
  return request.get(`notice/niusms/order/status/${i}`, { params: s });
}
function calculateOrderPay(i, s) {
  return request.post(`notice/niusms/order/calculate/${i}`, s);
}
function enableNiusms(i) {
  return request.put("notice/niusms/enable", i, { showSuccessMessage: !0 });
}
function templateSync(i, s) {
  return request.get(`notice/niusms/template/sync/${i}/${s}`);
}
function resetPassword(i, s) {
  return request.post(`notice/niusms/account/reset/password/${i}`, s, { showSuccessMessage: !0 });
}
function clearTemplate(i, s) {
  return request.delete(`notice/niusms/template/${i}/${s}`);
}
function getAccountList$1(i) {
  return request.get("pay/account", { params: i });
}
function getAccountInfo$1(i) {
  return request.get(`pay/account/${i}`);
}
function getAccountStat$1() {
  return request.get("pay/account/stat");
}
function getAccountType$1() {
  return request.get("pay/account/type");
}
function getPayRefundPages(i) {
  return request.get("pay/refund", { params: i });
}
function getPayRefundInfo(i) {
  return request.get(`pay/refund/${i}`);
}
function getRefundStatus() {
  return request.get("pay/refund/status");
}
function getRefundType() {
  return request.get("pay/refund/type");
}
function getRefundTransfer(i) {
  return request.post("pay/refund/transfer", i, { showSuccessMessage: !0 });
}
function getAllPayType() {
  return request.get("pay/type/all");
}
function getPayList() {
  return request.get("pay/type/list");
}
function pay(i) {
  return request.post("pay", i);
}
function getFriendsPay(i, s, r) {
  return request.get(`pay/friendspay/info/${i}/${s}/${r}`, { showErrorMessage: !1 });
}
function getTransferScene() {
  return request.get("pay/transfer_scene");
}
function setSceneId(i) {
  return request.post(`pay/transfer_scene/set_scene_id/${i.scene}`, i, { showSuccessMessage: !0 });
}
function setTradeScene(i) {
  return request.post(`pay/transfer_scene/set_trade_scene/${i.type}`, i);
}
function getPcConfig() {
  return request.get("channel/pc/config");
}
function setPcConfig(i) {
  return request.put("channel/pc/config", i, { showSuccessMessage: !0 });
}
function getUserInfo$2() {
  return request.get("auth/get");
}
function setUserInfo(i) {
  return request.put("auth/edit", i, { showSuccessMessage: !0 });
}
function getPosterPageList(i) {
  return request.get("sys/poster", { params: i });
}
function getPosterList(i) {
  return request.get("sys/poster/list", { params: i });
}
function getPosterInfo(i) {
  return request.get(`sys/poster/${i}`);
}
function addPoster(i) {
  return request.post("sys/poster", i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editPoster(i) {
  return request.put(`sys/poster/${i.id}`, i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePoster(i) {
  return request.delete(`sys/poster/${i}`, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function modifyPosterStatus(i) {
  return request.put("sys/poster/status", i, { showSuccessMessage: !0 });
}
function modifyPosterDefault(i) {
  return request.put("sys/poster/default", i, { showSuccessMessage: !0 });
}
function getPosterType(i) {
  return request.get("sys/poster/type", { params: i });
}
function getPosterTemplate(i) {
  return request.get("sys/poster/template", { params: i });
}
function initPoster(i) {
  return request.get("sys/poster/init", { params: i });
}
function getPreviewPoster(i) {
  return request.get("sys/poster/preview", { params: i });
}
function getPosterGenerate(i) {
  return request.get("sys/poster/generate", { params: i, showErrorMessage: !1 });
}
function checkImagick() {
  return request.get("sys/check_imagick", { showErrorMessage: !1 });
}
function getPrinterPageList(i) {
  return request.get("sys/printer", { params: i });
}
function getPrinterList(i) {
  return request.get("sys/printer/list", { params: i });
}
function getPrinterInfo(i) {
  return request.get(`sys/printer/${i}`);
}
function addPrinter(i) {
  return request.post("sys/printer", i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editPrinter(i) {
  return request.put(`sys/printer/${i.printer_id}`, i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function modifyPrinterStatus(i) {
  return request.put("sys/printer/status", i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePrinter(i) {
  return request.delete(`sys/printer/${i}`, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getPrinterTemplatePageList(i) {
  return request.get("sys/printer/template", { params: i });
}
function getPrinterTemplateList(i) {
  return request.get("sys/printer/template/list", { params: i });
}
function getPrinterTemplateInfo(i) {
  return request.get(`sys/printer/template/${i}`);
}
function addPrinterTemplate(i) {
  return request.post("sys/printer/template", i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function editPrinterTemplate(i) {
  return request.put(`sys/printer/template/${i.template_id}`, i, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePrinterTemplate(i) {
  return request.delete(`sys/printer/template/${i}`, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getPrinterType(i) {
  return request.get("sys/printer/type", { params: i });
}
function getPrinterBrand(i) {
  return request.get("sys/printer/brand", { params: i });
}
function refreshPrinterToken(i) {
  return request.put(`sys/printer/refreshtoken/${i}`, {}, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function testPrint(i) {
  return request.put(`sys/printer/testprint/${i}`, {}, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function printTicket(i) {
  return request.post("sys/printer/printticket", i, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function getSiteList(i) {
  return request.get("site/site", { params: i });
}
function getSiteInfo(i) {
  return request.get(`site/site/${i}`);
}
function addSite(i) {
  return request.post("site/site", i, { showSuccessMessage: !0 });
}
function editSite(i) {
  return request.put(`site/site/${i.site_id}`, i, { showSuccessMessage: !0 });
}
function deleteSite(i) {
  return request.delete(`site/site/${i.site_id}?captcha_code=${i.captcha_code}&captcha_key=${i.captcha_key}`);
}
function closeSite(i) {
  return request.put(`site/closesite/${i.site_id}`, i, { showSuccessMessage: !0 });
}
function initSite(i) {
  return request.post("site/init", i, { showSuccessMessage: !0 });
}
function openSite(i) {
  return request.put(`site/opensite/${i.site_id}`, i, { showSuccessMessage: !0 });
}
function getStatusList() {
  return request.get("site/statuslist");
}
function getSiteAllowChange() {
  return request.get("site/allow_change");
}
function putSiteAllowChange(i) {
  return request.put("site/allow_change", i, { showSuccessMessage: !0 });
}
function getSiteGroupList(i) {
  return request.get("site/group", { params: i });
}
function getSiteGroupInfo(i) {
  return request.get(`site/group/${i}`);
}
function addSiteGroup(i) {
  return request.post("site/group", i, { showSuccessMessage: !0 });
}
function editSiteGroup(i) {
  return request.put(`site/group/${i.group_id}`, i, { showSuccessMessage: !0 });
}
function deleteSiteGroup(i) {
  return request.delete(`site/group/${i}`, { showSuccessMessage: !0 });
}
function getSiteGroupAll() {
  return request.get("site/group/all");
}
function getUserSiteGroupAll(i = {}) {
  return request.get("site/group/user", { params: i });
}
function getUserList$1(i) {
  return request.get("site/user", { params: i });
}
function getUserInfo$1(i) {
  return request.get(`site/user/${i}`);
}
function addUser$1(i) {
  return request.post("site/user", i, { showSuccessMessage: !0 });
}
function editUser$1(i) {
  return request.put(`site/user/${i.uid}`, i, { showSuccessMessage: !0 });
}
function lockUser(i) {
  return request.put(`site/user/lock/${i}`);
}
function unlockUser(i) {
  return request.put(`site/user/unlock/${i}`);
}
function deleteUser$1(i) {
  return request.delete(`site/user/${i}`);
}
function getLogList(i) {
  return request.get("site/log", { params: i });
}
function getLogInfo(i) {
  return request.get(`site/log/${i}`);
}
function logDestroy() {
  return request.delete("site/log/destroy");
}
function getAccountList(i) {
  return request.get("site/account", { params: i });
}
function getAccountInfo(i) {
  return request.get(`site/account/${i}`);
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
function getAddonDevelop(i) {
  return request.get("addon_develop", { params: i });
}
function getAddontype() {
  return request.get("addontype");
}
function getAddonDevelopInfo(i) {
  return request.get(`addon_develop/${i}`);
}
function getAddonDevelopCheck(i) {
  return request.get(`addon_develop/check/${i}`);
}
function getAddonKeyBlackList() {
  return request.get("addon_develop/key/blacklist");
}
function addAddonDevelop(i, s) {
  return request.post(`addon_develop/${i}`, s);
}
function editAddonDevelop(i, s) {
  return request.put(`addon_develop/${i}`, s);
}
function deleteAddonDevelop(i) {
  return request.delete(`addon_develop/${i}`, { showSuccessMessage: !0 });
}
function addonDevelopBuild(i) {
  return request.post(`addon_develop/build/${i}`);
}
function addonDevelopDownload(i) {
  return request.post(`addon_develop/download/${i}`, {});
}
function getGenerateTableList(i) {
  return request.get("generator/generator", { params: i });
}
function getGenerateTableInfo(i) {
  return request.get(`generator/generator/${i}`);
}
function addGenerateTable(i) {
  return request.post("generator/generator", i, { showSuccessMessage: !0 });
}
function editGenerateTable(i) {
  return request.put(`generator/generator/${i.id}`, i, { showSuccessMessage: !0 });
}
function deleteGenerateTable(i) {
  return request.delete(`generator/generator/${i}`, { showSuccessMessage: !0 });
}
function generateCreate(i) {
  return request.post("generator/download", i);
}
function generatePreview(i) {
  return request.get(`generator/preview/${i}`);
}
function generateTable() {
  return request.get("generator/table");
}
function getSystem() {
  return request.get("sys/system");
}
function getGeneratorAllModel(i) {
  return request.get("generator/all_model", { params: i });
}
function getGeneratorTableColumn(i) {
  return request.get("generator/table_column", { params: i });
}
function generatorCheckFile(i) {
  return request.get("generator/check_file", { params: i });
}
function getGeneratorModelTableColumn(i) {
  return request.get("generator/model_table_column", { params: i });
}
function getUpgradeContent(i = "") {
  return request.get(i ? `upgrade/${i}` : "upgrade");
}
function getUpgradeTask() {
  return request.get("upgrade/task");
}
function upgradeAddon(i = "", s = {}) {
  return request.post(i ? `upgrade/${i}` : "upgrade", s);
}
function executeUpgrade() {
  return request.post("upgrade/execute", {}, { showErrorMessage: !1 });
}
function preUpgradeCheck(i = "") {
  return request.get(i ? `upgrade/check/${i}` : "upgrade/check");
}
function clearUpgradeTask() {
  return request.post("upgrade/clear");
}
function upgradeUserOperate(i) {
  return request.post(`upgrade/operate/${i}`);
}
function getUpgradeRecords(i) {
  return request.get("upgrade/records", { params: i });
}
function delUpgradeRecords(i) {
  return request.delete("upgrade/records", { params: i });
}
function getBackupRecords(i) {
  return request.get("backup/records", { params: i });
}
function modifyBackupRemark(i) {
  return request.put("backup/remark", i, { showSuccessMessage: !0 });
}
function checkDirExist(i) {
  return request.post("backup/check_dir", i);
}
function checkPermission(i) {
  return request.post("backup/check_permission", i);
}
function restoreUpgradeBackup(i) {
  return request.post("backup/restore", i);
}
function deleteRecords(i) {
  return request.post("backup/delete", i, { showSuccessMessage: !0 });
}
function manualBackup(i) {
  return request.post("backup/manual", i);
}
function performRecoveryTasks(i) {
  return request.get("backup/restore_task", i);
}
function performBackupTasks(i) {
  return request.get("backup/task", i);
}
function connectTest(i) {
  return request.post("niucloud/build/connect_test", i);
}
function setLocalUrl(i) {
  return request.post("niucloud/build/set_local_url", i);
}
function getLocalUrl(i) {
  return request.get("niucloud/build/get_local_url", i);
}
function getUserList(i) {
  return request.get("user/user", { params: i });
}
function getUserInfo(i) {
  return request.get(`user/user/${i}`);
}
function addUser(i) {
  return request.post("user/user", i, { showSuccessMessage: !0 });
}
function deleteUser(i) {
  return request.delete(`user/user/${i}`, { showSuccessMessage: !0 });
}
function editUser(i) {
  return request.put(`user/user/${i.uid}`, i, { showSuccessMessage: !0 });
}
function getAllUserList(i) {
  return request.get("user/user_all", { params: i });
}
function getUserListSelect(i) {
  return request.get("user/user_select", { params: i });
}
function checkUsernameIsExist(i) {
  return request.get("user/isexist", { params: { username: i } });
}
function getUserCreateSiteLimit(i) {
  return request.get(`user/user/create_site_limit/${i}`);
}
function getUserCreateSiteLimitInfo(i) {
  return request.get(`user/user/create_site_limit/info/${i}`);
}
function addUserCreateSiteLimit(i) {
  return request.post("user/user/create_site_limit", i, { showSuccessMessage: !0 });
}
function editUserCreateSiteLimit(i) {
  return request.put(`user/user/create_site_limit/${i.id}`, i, { showSuccessMessage: !0 });
}
function delUserCreateSiteLimit(i) {
  return request.delete(`user/user/create_site_limit/${i}`, { showSuccessMessage: !0 });
}
function getVerifyRecord(i) {
  return request.get("verify/verify/record", { params: i });
}
function getVerifyDetail(i) {
  return request.get(`verify/verify/${i}`);
}
function getVerifyDetailInfo(i) {
  return request.get(`verify/detail/${i}`);
}
function verify(i, s) {
  return request.post(`verify/verify/${i}`, s, { showSuccessMessage: !0 });
}
function getVerifierList(i) {
  return request.get("verify/verifier", { params: i });
}
function getVerifierSelect() {
  return request.get("verify/verifier/select");
}
function getVerifyTypeList() {
  return request.get("verify/verifier/type");
}
function addVerifier(i) {
  return request.post("verify/verifier", i, { showSuccessMessage: !0 });
}
function deleteVerifier(i) {
  return request.delete(`verify/verifier/${i}`, { showSuccessMessage: !0 });
}
function getVerifyInfo(i) {
  return request.get(`verify/verifier/${i}`);
}
function editVerifier(i) {
  return request.post(`verify/verifier/${i.id}`, i, { showSuccessMessage: !0 });
}
function getWeappConfig() {
  return request.get("weapp/config");
}
function getWeappAuthUrl() {
  return request.get("weapp/auth_url");
}
function setWeappConfig(i) {
  return request.put("weapp/config", i, { showSuccessMessage: !0 });
}
function getTemplateList$1() {
  return request.get("weapp/template");
}
function getBatchAcquisition$1(i) {
  return request.put("weapp/template/sync", i, { showSuccessMessage: !0 });
}
function setWeappVersion(i) {
  return request.post("weapp/version", i, { showSuccessMessage: !0 });
}
function getWeappPreview() {
  return request.get("weapp/preview");
}
function getWeappVersionList(i) {
  return request.get("weapp/version", { params: i });
}
function getWeappUploadLog(i) {
  return request.get(`weapp/upload/${i}`);
}
function fetchWeappUploadLog(i) {
  return request.get(`weapp/upload_log/${i}`);
}
function uploadVersion(i) {
  return request.put("applet/upload", i, { showSuccessMessage: !0 });
}
function addVersion(i) {
  return request.post("applet/version", i, { showSuccessMessage: !0 });
}
function getVersionList(i) {
  return request.get("applet/version", { params: i });
}
function getVersionInfo(i) {
  return request.get(`applet/version/${i}`);
}
function editVersion(i) {
  return request.put(`applet/version/${i.id}`, i, { showSuccessMessage: !0 });
}
function deleteVersion(i) {
  return request.delete(`applet/version/${i}`);
}
function getIsTradeManaged() {
  return request.get("weapp/delivery/getIsTradeManaged");
}
function setWeappDomain(i) {
  return request.put("weapp/domain", i, { showSuccessMessage: !0 });
}
function setWeappPrivacySetting(i) {
  return request.put("weapp/privacysetting", i, { showSuccessMessage: !0 });
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
function editWechatConfig(i) {
  return request.put("wechat/config", i, { showSuccessMessage: !0 });
}
function getWechatMenu() {
  return request.get("wechat/menu");
}
function editWechatMenu(i) {
  return request.put("wechat/menu", i, { showSuccessMessage: !0 });
}
function getTemplateList() {
  return request.get("wechat/template");
}
function getBatchAcquisition(i) {
  return request.put("wechat/template/sync", i, { showSuccessMessage: !0 });
}
function getKeywordsReplyList(i) {
  return request.get("wechat/reply/keywords", { params: i });
}
function editKeywordsReply(i) {
  return request.put(`wechat/reply/keywords/${i.id}`, i, { showSuccessMessage: !0 });
}
function addKeywordsReply(i) {
  return request.post("wechat/reply/keywords", i, { showSuccessMessage: !0 });
}
function getKeywordsReplyInfo(i) {
  return request.get(`wechat/reply/keywords/${i}`);
}
function delKeywordsReply(i) {
  return request.delete(`wechat/reply/keywords/${i}`, { showSuccessMessage: !0 });
}
function getDefaultReply() {
  return request.get("wechat/reply/default");
}
function setDefaultReply(i) {
  return request.put("wechat/reply/default", i, { showSuccessMessage: !0 });
}
function getSubscribeReply() {
  return request.get("wechat/reply/subscribe");
}
function setSubscribeReply(i) {
  return request.put("wechat/reply/subscribe", i, { showSuccessMessage: !0 });
}
function getMediaList(i) {
  return request.get("wechat/media", { params: i });
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
function editConfig(i) {
  return request.put("wxoplatform/config", i, { showSuccessMessage: !0 });
}
function getAuthorizationUrl() {
  return request.get("wxoplatform/authorizationUrl");
}
function getAuthorizationResult(i) {
  return request.get("wxoplatform/authorization", { params: i, showErrorMessage: !1 });
}
function weappCommit(i) {
  return request.post("wxoplatform/weapp/version/commit", i, { showSuccessMessage: !0 });
}
function getWeappCommitRecord(i) {
  return request.get("wxoplatform/weapp/commit", { params: i });
}
function getWeappLastCommitRecord() {
  return request.get("wxoplatform/weapp/commit/last");
}
function delVersion(i) {
  return request.delete(`wxoplatform/weapp/version/${i}`);
}
function siteWeappCommit() {
  return request.post("wxoplatform/site/weapp/commit", {}, { showSuccessMessage: !0 });
}
function getSiteGroupCommitRecord(i) {
  return request.get("wxoplatform/sitegroup/commit", { params: i });
}
function undoAudit(i) {
  return request.put("wxoplatform/undo/weappaudit", i, { showSuccessMessage: !0 });
}
function syncSiteWeapp(i) {
  return request.post("wxoplatform/async/siteweapp", i, { showSuccessMessage: !0 });
}
function getAuthRecord(i) {
  return request.get("wxoplatform/authorization/record", { params: i });
}
function cancelAuthorization(i) {
  return request.post("wxoplatform/authorization/cancel", i, { showSuccessMessage: !0 });
}
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(i, s) {
  var r = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(i);
    s && (a = a.filter(function(d) {
      return Object.getOwnPropertyDescriptor(i, d).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function _objectSpread2(i) {
  for (var s = 1; s < arguments.length; s++) {
    var r = arguments[s] != null ? arguments[s] : {};
    s % 2 ? ownKeys(Object(r), !0).forEach(function(a) {
      _defineProperty(i, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function(a) {
      Object.defineProperty(i, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return i;
}
function _typeof(i) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(s) {
    return typeof s;
  } : _typeof = function(s) {
    return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
  }, _typeof(i);
}
function _defineProperty(i, s, r) {
  return s in i ? Object.defineProperty(i, s, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[s] = r, i;
}
function _extends() {
  return _extends = Object.assign || function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (i[a] = r[a]);
    }
    return i;
  }, _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(i, s) {
  if (i == null)
    return {};
  var r = {}, a = Object.keys(i), d, c;
  for (c = 0; c < a.length; c++)
    d = a[c], !(s.indexOf(d) >= 0) && (r[d] = i[d]);
  return r;
}
function _objectWithoutProperties(i, s) {
  if (i == null)
    return {};
  var r = _objectWithoutPropertiesLoose(i, s), a, d;
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(i);
    for (d = 0; d < c.length; d++)
      a = c[d], !(s.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(i, a) && (r[a] = i[a]);
  }
  return r;
}
function _toConsumableArray(i) {
  return _arrayWithoutHoles(i) || _iterableToArray(i) || _unsupportedIterableToArray(i) || _nonIterableSpread();
}
function _arrayWithoutHoles(i) {
  if (Array.isArray(i))
    return _arrayLikeToArray(i);
}
function _iterableToArray(i) {
  if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null)
    return Array.from(i);
}
function _unsupportedIterableToArray(i, s) {
  if (i) {
    if (typeof i == "string")
      return _arrayLikeToArray(i, s);
    var r = Object.prototype.toString.call(i).slice(8, -1);
    if (r === "Object" && i.constructor && (r = i.constructor.name), r === "Map" || r === "Set")
      return Array.from(i);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _arrayLikeToArray(i, s);
  }
}
function _arrayLikeToArray(i, s) {
  (s == null || s > i.length) && (s = i.length);
  for (var r = 0, a = new Array(s); r < s; r++)
    a[r] = i[r];
  return a;
}
function _nonIterableSpread() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var version$1 = "1.15.0";
function userAgent(i) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(i);
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Edge = userAgent(/Edge/i), FireFox = userAgent(/firefox/i), Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i), IOS = userAgent(/iP(ad|od|hone)/i), ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i), captureMode = {
  capture: !1,
  passive: !1
};
function on(i, s, r) {
  i.addEventListener(s, r, !IE11OrLess && captureMode);
}
function off(i, s, r) {
  i.removeEventListener(s, r, !IE11OrLess && captureMode);
}
function matches(i, s) {
  if (s) {
    if (s[0] === ">" && (s = s.substring(1)), i)
      try {
        if (i.matches)
          return i.matches(s);
        if (i.msMatchesSelector)
          return i.msMatchesSelector(s);
        if (i.webkitMatchesSelector)
          return i.webkitMatchesSelector(s);
      } catch {
        return !1;
      }
    return !1;
  }
}
function getParentOrHost(i) {
  return i.host && i !== document && i.host.nodeType ? i.host : i.parentNode;
}
function closest(i, s, r, a) {
  if (i) {
    r = r || document;
    do {
      if (s != null && (s[0] === ">" ? i.parentNode === r && matches(i, s) : matches(i, s)) || a && i === r)
        return i;
      if (i === r)
        break;
    } while (i = getParentOrHost(i));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(i, s, r) {
  if (i && s)
    if (i.classList)
      i.classList[r ? "add" : "remove"](s);
    else {
      var a = (" " + i.className + " ").replace(R_SPACE, " ").replace(" " + s + " ", " ");
      i.className = (a + (r ? " " + s : "")).replace(R_SPACE, " ");
    }
}
function css(i, s, r) {
  var a = i && i.style;
  if (a) {
    if (r === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? r = document.defaultView.getComputedStyle(i, "") : i.currentStyle && (r = i.currentStyle), s === void 0 ? r : r[s];
    !(s in a) && s.indexOf("webkit") === -1 && (s = "-webkit-" + s), a[s] = r + (typeof r == "string" ? "" : "px");
  }
}
function matrix(i, s) {
  var r = "";
  if (typeof i == "string")
    r = i;
  else
    do {
      var a = css(i, "transform");
      a && a !== "none" && (r = a + " " + r);
    } while (!s && (i = i.parentNode));
  var d = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return d && new d(r);
}
function find(i, s, r) {
  if (i) {
    var a = i.getElementsByTagName(s), d = 0, c = a.length;
    if (r)
      for (; d < c; d++)
        r(a[d], d);
    return a;
  }
  return [];
}
function getWindowScrollingElement() {
  var i = document.scrollingElement;
  return i || document.documentElement;
}
function getRect(i, s, r, a, d) {
  if (!(!i.getBoundingClientRect && i !== window)) {
    var c, l, p, u, m, v, h;
    if (i !== window && i.parentNode && i !== getWindowScrollingElement() ? (c = i.getBoundingClientRect(), l = c.top, p = c.left, u = c.bottom, m = c.right, v = c.height, h = c.width) : (l = 0, p = 0, u = window.innerHeight, m = window.innerWidth, v = window.innerHeight, h = window.innerWidth), (s || r) && i !== window && (d = d || i.parentNode, !IE11OrLess))
      do
        if (d && d.getBoundingClientRect && (css(d, "transform") !== "none" || r && css(d, "position") !== "static")) {
          var f = d.getBoundingClientRect();
          l -= f.top + parseInt(css(d, "border-top-width")), p -= f.left + parseInt(css(d, "border-left-width")), u = l + c.height, m = p + c.width;
          break;
        }
      while (d = d.parentNode);
    if (a && i !== window) {
      var w = matrix(d || i), g = w && w.a, _ = w && w.d;
      w && (l /= _, p /= g, h /= g, v /= _, u = l + v, m = p + h);
    }
    return {
      top: l,
      left: p,
      bottom: u,
      right: m,
      width: h,
      height: v
    };
  }
}
function isScrolledPast(i, s, r) {
  for (var a = getParentAutoScrollElement(i, !0), d = getRect(i)[s]; a; ) {
    var c = getRect(a)[r], l = void 0;
    if (r === "top" || r === "left" ? l = d >= c : l = d <= c, !l)
      return a;
    if (a === getWindowScrollingElement())
      break;
    a = getParentAutoScrollElement(a, !1);
  }
  return !1;
}
function getChild(i, s, r, a) {
  for (var d = 0, c = 0, l = i.children; c < l.length; ) {
    if (l[c].style.display !== "none" && l[c] !== Sortable.ghost && (a || l[c] !== Sortable.dragged) && closest(l[c], r.draggable, i, !1)) {
      if (d === s)
        return l[c];
      d++;
    }
    c++;
  }
  return null;
}
function lastChild(i, s) {
  for (var r = i.lastElementChild; r && (r === Sortable.ghost || css(r, "display") === "none" || s && !matches(r, s)); )
    r = r.previousElementSibling;
  return r || null;
}
function index$7(i, s) {
  var r = 0;
  if (!i || !i.parentNode)
    return -1;
  for (; i = i.previousElementSibling; )
    i.nodeName.toUpperCase() !== "TEMPLATE" && i !== Sortable.clone && (!s || matches(i, s)) && r++;
  return r;
}
function getRelativeScrollOffset(i) {
  var s = 0, r = 0, a = getWindowScrollingElement();
  if (i)
    do {
      var d = matrix(i), c = d.a, l = d.d;
      s += i.scrollLeft * c, r += i.scrollTop * l;
    } while (i !== a && (i = i.parentNode));
  return [s, r];
}
function indexOfObject(i, s) {
  for (var r in i)
    if (i.hasOwnProperty(r)) {
      for (var a in s)
        if (s.hasOwnProperty(a) && s[a] === i[r][a])
          return Number(r);
    }
  return -1;
}
function getParentAutoScrollElement(i, s) {
  if (!i || !i.getBoundingClientRect)
    return getWindowScrollingElement();
  var r = i, a = !1;
  do
    if (r.clientWidth < r.scrollWidth || r.clientHeight < r.scrollHeight) {
      var d = css(r);
      if (r.clientWidth < r.scrollWidth && (d.overflowX == "auto" || d.overflowX == "scroll") || r.clientHeight < r.scrollHeight && (d.overflowY == "auto" || d.overflowY == "scroll")) {
        if (!r.getBoundingClientRect || r === document.body)
          return getWindowScrollingElement();
        if (a || s)
          return r;
        a = !0;
      }
    }
  while (r = r.parentNode);
  return getWindowScrollingElement();
}
function extend(i, s) {
  if (i && s)
    for (var r in s)
      s.hasOwnProperty(r) && (i[r] = s[r]);
  return i;
}
function isRectEqual(i, s) {
  return Math.round(i.top) === Math.round(s.top) && Math.round(i.left) === Math.round(s.left) && Math.round(i.height) === Math.round(s.height) && Math.round(i.width) === Math.round(s.width);
}
var _throttleTimeout;
function throttle(i, s) {
  return function() {
    if (!_throttleTimeout) {
      var r = arguments, a = this;
      r.length === 1 ? i.call(a, r[0]) : i.apply(a, r), _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, s);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout), _throttleTimeout = void 0;
}
function scrollBy(i, s, r) {
  i.scrollLeft += s, i.scrollTop += r;
}
function clone(i) {
  var s = window.Polymer, r = window.jQuery || window.Zepto;
  return s && s.dom ? s.dom(i).cloneNode(!0) : r ? r(i).clone(!0)[0] : i.cloneNode(!0);
}
function setRect(i, s) {
  css(i, "position", "absolute"), css(i, "top", s.top), css(i, "left", s.left), css(i, "width", s.width), css(i, "height", s.height);
}
function unsetRect(i) {
  css(i, "position", ""), css(i, "top", ""), css(i, "left", ""), css(i, "width", ""), css(i, "height", "");
}
var expando = "Sortable" + new Date().getTime();
function AnimationStateManager() {
  var i = [], s;
  return {
    captureAnimationState: function() {
      if (i = [], !!this.options.animation) {
        var a = [].slice.call(this.el.children);
        a.forEach(function(d) {
          if (!(css(d, "display") === "none" || d === Sortable.ghost)) {
            i.push({
              target: d,
              rect: getRect(d)
            });
            var c = _objectSpread2({}, i[i.length - 1].rect);
            if (d.thisAnimationDuration) {
              var l = matrix(d, !0);
              l && (c.top -= l.f, c.left -= l.e);
            }
            d.fromRect = c;
          }
        });
      }
    },
    addAnimationState: function(a) {
      i.push(a);
    },
    removeAnimationState: function(a) {
      i.splice(indexOfObject(i, {
        target: a
      }), 1);
    },
    animateAll: function(a) {
      var d = this;
      if (!this.options.animation) {
        clearTimeout(s), typeof a == "function" && a();
        return;
      }
      var c = !1, l = 0;
      i.forEach(function(p) {
        var u = 0, m = p.target, v = m.fromRect, h = getRect(m), f = m.prevFromRect, w = m.prevToRect, g = p.rect, _ = matrix(m, !0);
        _ && (h.top -= _.f, h.left -= _.e), m.toRect = h, m.thisAnimationDuration && isRectEqual(f, h) && !isRectEqual(v, h) && // Make sure animatingRect is on line between toRect & fromRect
        (g.top - h.top) / (g.left - h.left) === (v.top - h.top) / (v.left - h.left) && (u = calculateRealTime(g, f, w, d.options)), isRectEqual(h, v) || (m.prevFromRect = v, m.prevToRect = h, u || (u = d.options.animation), d.animate(m, g, h, u)), u && (c = !0, l = Math.max(l, u), clearTimeout(m.animationResetTimer), m.animationResetTimer = setTimeout(function() {
          m.animationTime = 0, m.prevFromRect = null, m.fromRect = null, m.prevToRect = null, m.thisAnimationDuration = null;
        }, u), m.thisAnimationDuration = u);
      }), clearTimeout(s), c ? s = setTimeout(function() {
        typeof a == "function" && a();
      }, l) : typeof a == "function" && a(), i = [];
    },
    animate: function(a, d, c, l) {
      if (l) {
        css(a, "transition", ""), css(a, "transform", "");
        var p = matrix(this.el), u = p && p.a, m = p && p.d, v = (d.left - c.left) / (u || 1), h = (d.top - c.top) / (m || 1);
        a.animatingX = !!v, a.animatingY = !!h, css(a, "transform", "translate3d(" + v + "px," + h + "px,0)"), this.forRepaintDummy = repaint(a), css(a, "transition", "transform " + l + "ms" + (this.options.easing ? " " + this.options.easing : "")), css(a, "transform", "translate3d(0,0,0)"), typeof a.animated == "number" && clearTimeout(a.animated), a.animated = setTimeout(function() {
          css(a, "transition", ""), css(a, "transform", ""), a.animated = !1, a.animatingX = !1, a.animatingY = !1;
        }, l);
      }
    }
  };
}
function repaint(i) {
  return i.offsetWidth;
}
function calculateRealTime(i, s, r, a) {
  return Math.sqrt(Math.pow(s.top - i.top, 2) + Math.pow(s.left - i.left, 2)) / Math.sqrt(Math.pow(s.top - r.top, 2) + Math.pow(s.left - r.left, 2)) * a.animation;
}
var plugins = [], defaults = {
  initializeByDefault: !0
}, PluginManager = {
  mount: function i(s) {
    for (var r in defaults)
      defaults.hasOwnProperty(r) && !(r in s) && (s[r] = defaults[r]);
    plugins.forEach(function(a) {
      if (a.pluginName === s.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(s.pluginName, " more than once");
    }), plugins.push(s);
  },
  pluginEvent: function i(s, r, a) {
    var d = this;
    this.eventCanceled = !1, a.cancel = function() {
      d.eventCanceled = !0;
    };
    var c = s + "Global";
    plugins.forEach(function(l) {
      r[l.pluginName] && (r[l.pluginName][c] && r[l.pluginName][c](_objectSpread2({
        sortable: r
      }, a)), r.options[l.pluginName] && r[l.pluginName][s] && r[l.pluginName][s](_objectSpread2({
        sortable: r
      }, a)));
    });
  },
  initializePlugins: function i(s, r, a, d) {
    plugins.forEach(function(p) {
      var u = p.pluginName;
      if (!(!s.options[u] && !p.initializeByDefault)) {
        var m = new p(s, r, s.options);
        m.sortable = s, m.options = s.options, s[u] = m, _extends(a, m.defaults);
      }
    });
    for (var c in s.options)
      if (s.options.hasOwnProperty(c)) {
        var l = this.modifyOption(s, c, s.options[c]);
        typeof l < "u" && (s.options[c] = l);
      }
  },
  getEventProperties: function i(s, r) {
    var a = {};
    return plugins.forEach(function(d) {
      typeof d.eventProperties == "function" && _extends(a, d.eventProperties.call(r[d.pluginName], s));
    }), a;
  },
  modifyOption: function i(s, r, a) {
    var d;
    return plugins.forEach(function(c) {
      s[c.pluginName] && c.optionListeners && typeof c.optionListeners[r] == "function" && (d = c.optionListeners[r].call(s[c.pluginName], a));
    }), d;
  }
};
function dispatchEvent(i) {
  var s = i.sortable, r = i.rootEl, a = i.name, d = i.targetEl, c = i.cloneEl, l = i.toEl, p = i.fromEl, u = i.oldIndex, m = i.newIndex, v = i.oldDraggableIndex, h = i.newDraggableIndex, f = i.originalEvent, w = i.putSortable, g = i.extraEventProperties;
  if (s = s || r && r[expando], !!s) {
    var _, y = s.options, S = "on" + a.charAt(0).toUpperCase() + a.substr(1);
    window.CustomEvent && !IE11OrLess && !Edge ? _ = new CustomEvent(a, {
      bubbles: !0,
      cancelable: !0
    }) : (_ = document.createEvent("Event"), _.initEvent(a, !0, !0)), _.to = l || r, _.from = p || r, _.item = d || r, _.clone = c, _.oldIndex = u, _.newIndex = m, _.oldDraggableIndex = v, _.newDraggableIndex = h, _.originalEvent = f, _.pullMode = w ? w.lastPutMode : void 0;
    var b = _objectSpread2(_objectSpread2({}, g), PluginManager.getEventProperties(a, s));
    for (var P in b)
      _[P] = b[P];
    r && r.dispatchEvent(_), y[S] && y[S].call(s, _);
  }
}
var _excluded = ["evt"], pluginEvent = function i(s, r) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, d = a.evt, c = _objectWithoutProperties(a, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(s, r, _objectSpread2({
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
    originalEvent: d,
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
        sortable: r,
        name: p,
        originalEvent: d
      });
    }
  }, c));
};
function _dispatchEvent(i) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, i));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = !1, ignoreNextClick = !1, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = !1, isCircumstantialInvert = !1, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = !1, savedInputChecked = [], documentExists = typeof document < "u", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (documentExists) {
    if (IE11OrLess)
      return !1;
    var i = document.createElement("x");
    return i.style.cssText = "pointer-events:auto", i.style.pointerEvents === "auto";
  }
}(), _detectDirection = function i(s, r) {
  var a = css(s), d = parseInt(a.width) - parseInt(a.paddingLeft) - parseInt(a.paddingRight) - parseInt(a.borderLeftWidth) - parseInt(a.borderRightWidth), c = getChild(s, 0, r), l = getChild(s, 1, r), p = c && css(c), u = l && css(l), m = p && parseInt(p.marginLeft) + parseInt(p.marginRight) + getRect(c).width, v = u && parseInt(u.marginLeft) + parseInt(u.marginRight) + getRect(l).width;
  if (a.display === "flex")
    return a.flexDirection === "column" || a.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (a.display === "grid")
    return a.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (c && p.float && p.float !== "none") {
    var h = p.float === "left" ? "left" : "right";
    return l && (u.clear === "both" || u.clear === h) ? "vertical" : "horizontal";
  }
  return c && (p.display === "block" || p.display === "flex" || p.display === "table" || p.display === "grid" || m >= d && a[CSSFloatProperty] === "none" || l && a[CSSFloatProperty] === "none" && m + v > d) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function i(s, r, a) {
  var d = a ? s.left : s.top, c = a ? s.right : s.bottom, l = a ? s.width : s.height, p = a ? r.left : r.top, u = a ? r.right : r.bottom, m = a ? r.width : r.height;
  return d === p || c === u || d + l / 2 === p + m / 2;
}, _detectNearestEmptySortable = function i(s, r) {
  var a;
  return sortables.some(function(d) {
    var c = d[expando].options.emptyInsertThreshold;
    if (!(!c || lastChild(d))) {
      var l = getRect(d), p = s >= l.left - c && s <= l.right + c, u = r >= l.top - c && r <= l.bottom + c;
      if (p && u)
        return a = d;
    }
  }), a;
}, _prepareGroup = function i(s) {
  function r(c, l) {
    return function(p, u, m, v) {
      var h = p.options.group.name && u.options.group.name && p.options.group.name === u.options.group.name;
      if (c == null && (l || h))
        return !0;
      if (c == null || c === !1)
        return !1;
      if (l && c === "clone")
        return c;
      if (typeof c == "function")
        return r(c(p, u, m, v), l)(p, u, m, v);
      var f = (l ? p : u).options.group.name;
      return c === !0 || typeof c == "string" && c === f || c.join && c.indexOf(f) > -1;
    };
  }
  var a = {}, d = s.group;
  (!d || _typeof(d) != "object") && (d = {
    name: d
  }), a.name = d.name, a.checkPull = r(d.pull, !0), a.checkPut = r(d.put), a.revertClone = d.revertClone, s.group = a;
}, _hideGhostForTarget = function i() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "none");
}, _unhideGhostForTarget = function i() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "");
};
documentExists && !ChromeForAndroid && document.addEventListener("click", function(i) {
  if (ignoreNextClick)
    return i.preventDefault(), i.stopPropagation && i.stopPropagation(), i.stopImmediatePropagation && i.stopImmediatePropagation(), ignoreNextClick = !1, !1;
}, !0);
var nearestEmptyInsertDetectEvent = function i(s) {
  if (dragEl) {
    s = s.touches ? s.touches[0] : s;
    var r = _detectNearestEmptySortable(s.clientX, s.clientY);
    if (r) {
      var a = {};
      for (var d in s)
        s.hasOwnProperty(d) && (a[d] = s[d]);
      a.target = a.rootEl = r, a.preventDefault = void 0, a.stopPropagation = void 0, r[expando]._onDragOver(a);
    }
  }
}, _checkOutsideTargetEl = function i(s) {
  dragEl && dragEl.parentNode[expando]._isOutsideThisEl(s.target);
};
function Sortable(i, s) {
  if (!(i && i.nodeType && i.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(i));
  this.el = i, this.options = s = _extends({}, s), i[expando] = this;
  var r = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(i.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return _detectDirection(i, this.options);
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
  PluginManager.initializePlugins(this, i, r);
  for (var a in r)
    !(a in s) && (s[a] = r[a]);
  _prepareGroup(s);
  for (var d in this)
    d.charAt(0) === "_" && typeof this[d] == "function" && (this[d] = this[d].bind(this));
  this.nativeDraggable = s.forceFallback ? !1 : supportDraggable, this.nativeDraggable && (this.options.touchStartThreshold = 1), s.supportPointer ? on(i, "pointerdown", this._onTapStart) : (on(i, "mousedown", this._onTapStart), on(i, "touchstart", this._onTapStart)), this.nativeDraggable && (on(i, "dragover", this), on(i, "dragenter", this)), sortables.push(this.el), s.store && s.store.get && this.sort(s.store.get(this) || []), _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function i(s) {
    !this.el.contains(s) && s !== this.el && (lastTarget = null);
  },
  _getDirection: function i(s, r) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, s, r, dragEl) : this.options.direction;
  },
  _onTapStart: function i(s) {
    if (s.cancelable) {
      var r = this, a = this.el, d = this.options, c = d.preventOnFilter, l = s.type, p = s.touches && s.touches[0] || s.pointerType && s.pointerType === "touch" && s, u = (p || s).target, m = s.target.shadowRoot && (s.path && s.path[0] || s.composedPath && s.composedPath()[0]) || u, v = d.filter;
      if (_saveInputCheckedState(a), !dragEl && !(/mousedown|pointerdown/.test(l) && s.button !== 0 || d.disabled) && !m.isContentEditable && !(!this.nativeDraggable && Safari && u && u.tagName.toUpperCase() === "SELECT") && (u = closest(u, d.draggable, a, !1), !(u && u.animated) && lastDownEl !== u)) {
        if (oldIndex = index$7(u), oldDraggableIndex = index$7(u, d.draggable), typeof v == "function") {
          if (v.call(this, s, u, this)) {
            _dispatchEvent({
              sortable: r,
              rootEl: m,
              name: "filter",
              targetEl: u,
              toEl: a,
              fromEl: a
            }), pluginEvent("filter", r, {
              evt: s
            }), c && s.cancelable && s.preventDefault();
            return;
          }
        } else if (v && (v = v.split(",").some(function(h) {
          if (h = closest(m, h.trim(), a, !1), h)
            return _dispatchEvent({
              sortable: r,
              rootEl: h,
              name: "filter",
              targetEl: u,
              fromEl: a,
              toEl: a
            }), pluginEvent("filter", r, {
              evt: s
            }), !0;
        }), v)) {
          c && s.cancelable && s.preventDefault();
          return;
        }
        d.handle && !closest(m, d.handle, a, !1) || this._prepareDragStart(s, p, u);
      }
    }
  },
  _prepareDragStart: function i(s, r, a) {
    var d = this, c = d.el, l = d.options, p = c.ownerDocument, u;
    if (a && !dragEl && a.parentNode === c) {
      var m = getRect(a);
      if (rootEl = c, dragEl = a, parentEl = dragEl.parentNode, nextEl = dragEl.nextSibling, lastDownEl = a, activeGroup = l.group, Sortable.dragged = dragEl, tapEvt = {
        target: dragEl,
        clientX: (r || s).clientX,
        clientY: (r || s).clientY
      }, tapDistanceLeft = tapEvt.clientX - m.left, tapDistanceTop = tapEvt.clientY - m.top, this._lastX = (r || s).clientX, this._lastY = (r || s).clientY, dragEl.style["will-change"] = "all", u = function() {
        if (pluginEvent("delayEnded", d, {
          evt: s
        }), Sortable.eventCanceled) {
          d._onDrop();
          return;
        }
        d._disableDelayedDragEvents(), !FireFox && d.nativeDraggable && (dragEl.draggable = !0), d._triggerDragStart(s, r), _dispatchEvent({
          sortable: d,
          name: "choose",
          originalEvent: s
        }), toggleClass(dragEl, l.chosenClass, !0);
      }, l.ignore.split(",").forEach(function(v) {
        find(dragEl, v.trim(), _disableDraggable);
      }), on(p, "dragover", nearestEmptyInsertDetectEvent), on(p, "mousemove", nearestEmptyInsertDetectEvent), on(p, "touchmove", nearestEmptyInsertDetectEvent), on(p, "mouseup", d._onDrop), on(p, "touchend", d._onDrop), on(p, "touchcancel", d._onDrop), FireFox && this.nativeDraggable && (this.options.touchStartThreshold = 4, dragEl.draggable = !0), pluginEvent("delayStart", this, {
        evt: s
      }), l.delay && (!l.delayOnTouchOnly || r) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(p, "mouseup", d._disableDelayedDrag), on(p, "touchend", d._disableDelayedDrag), on(p, "touchcancel", d._disableDelayedDrag), on(p, "mousemove", d._delayedDragTouchMoveHandler), on(p, "touchmove", d._delayedDragTouchMoveHandler), l.supportPointer && on(p, "pointermove", d._delayedDragTouchMoveHandler), d._dragStartTimer = setTimeout(u, l.delay);
      } else
        u();
    }
  },
  _delayedDragTouchMoveHandler: function i(s) {
    var r = s.touches ? s.touches[0] : s;
    Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function i() {
    dragEl && _disableDraggable(dragEl), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function i() {
    var s = this.el.ownerDocument;
    off(s, "mouseup", this._disableDelayedDrag), off(s, "touchend", this._disableDelayedDrag), off(s, "touchcancel", this._disableDelayedDrag), off(s, "mousemove", this._delayedDragTouchMoveHandler), off(s, "touchmove", this._delayedDragTouchMoveHandler), off(s, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function i(s, r) {
    r = r || s.pointerType == "touch" && s, !this.nativeDraggable || r ? this.options.supportPointer ? on(document, "pointermove", this._onTouchMove) : r ? on(document, "touchmove", this._onTouchMove) : on(document, "mousemove", this._onTouchMove) : (on(dragEl, "dragend", this), on(rootEl, "dragstart", this._onDragStart));
    try {
      document.selection ? _nextTick(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function i(s, r) {
    if (awaitingDragStarted = !1, rootEl && dragEl) {
      pluginEvent("dragStarted", this, {
        evt: r
      }), this.nativeDraggable && on(document, "dragover", _checkOutsideTargetEl);
      var a = this.options;
      !s && toggleClass(dragEl, a.dragClass, !1), toggleClass(dragEl, a.ghostClass, !0), Sortable.active = this, s && this._appendGhost(), _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: r
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function i() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX, this._lastY = touchEvt.clientY, _hideGhostForTarget();
      for (var s = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY), r = s; s && s.shadowRoot && (s = s.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY), s !== r); )
        r = s;
      if (dragEl.parentNode[expando]._isOutsideThisEl(s), r)
        do {
          if (r[expando]) {
            var a = void 0;
            if (a = r[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: s,
              rootEl: r
            }), a && !this.options.dragoverBubble)
              break;
          }
          s = r;
        } while (r = r.parentNode);
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function i(s) {
    if (tapEvt) {
      var r = this.options, a = r.fallbackTolerance, d = r.fallbackOffset, c = s.touches ? s.touches[0] : s, l = ghostEl && matrix(ghostEl, !0), p = ghostEl && l && l.a, u = ghostEl && l && l.d, m = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), v = (c.clientX - tapEvt.clientX + d.x) / (p || 1) + (m ? m[0] - ghostRelativeParentInitialScroll[0] : 0) / (p || 1), h = (c.clientY - tapEvt.clientY + d.y) / (u || 1) + (m ? m[1] - ghostRelativeParentInitialScroll[1] : 0) / (u || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (a && Math.max(Math.abs(c.clientX - this._lastX), Math.abs(c.clientY - this._lastY)) < a)
          return;
        this._onDragStart(s, !0);
      }
      if (ghostEl) {
        l ? (l.e += v - (lastDx || 0), l.f += h - (lastDy || 0)) : l = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: v,
          f: h
        };
        var f = "matrix(".concat(l.a, ",").concat(l.b, ",").concat(l.c, ",").concat(l.d, ",").concat(l.e, ",").concat(l.f, ")");
        css(ghostEl, "webkitTransform", f), css(ghostEl, "mozTransform", f), css(ghostEl, "msTransform", f), css(ghostEl, "transform", f), lastDx = v, lastDy = h, touchEvt = c;
      }
      s.cancelable && s.preventDefault();
    }
  },
  _appendGhost: function i() {
    if (!ghostEl) {
      var s = this.options.fallbackOnBody ? document.body : rootEl, r = getRect(dragEl, !0, PositionGhostAbsolutely, !0, s), a = this.options;
      if (PositionGhostAbsolutely) {
        for (ghostRelativeParent = s; css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document; )
          ghostRelativeParent = ghostRelativeParent.parentNode;
        ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement ? (ghostRelativeParent === document && (ghostRelativeParent = getWindowScrollingElement()), r.top += ghostRelativeParent.scrollTop, r.left += ghostRelativeParent.scrollLeft) : ghostRelativeParent = getWindowScrollingElement(), ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(!0), toggleClass(ghostEl, a.ghostClass, !1), toggleClass(ghostEl, a.fallbackClass, !0), toggleClass(ghostEl, a.dragClass, !0), css(ghostEl, "transition", ""), css(ghostEl, "transform", ""), css(ghostEl, "box-sizing", "border-box"), css(ghostEl, "margin", 0), css(ghostEl, "top", r.top), css(ghostEl, "left", r.left), css(ghostEl, "width", r.width), css(ghostEl, "height", r.height), css(ghostEl, "opacity", "0.8"), css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed"), css(ghostEl, "zIndex", "100000"), css(ghostEl, "pointerEvents", "none"), Sortable.ghost = ghostEl, s.appendChild(ghostEl), css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function i(s, r) {
    var a = this, d = s.dataTransfer, c = a.options;
    if (pluginEvent("dragStart", this, {
      evt: s
    }), Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent("setupClone", this), Sortable.eventCanceled || (cloneEl = clone(dragEl), cloneEl.removeAttribute("id"), cloneEl.draggable = !1, cloneEl.style["will-change"] = "", this._hideClone(), toggleClass(cloneEl, this.options.chosenClass, !1), Sortable.clone = cloneEl), a.cloneId = _nextTick(function() {
      pluginEvent("clone", a), !Sortable.eventCanceled && (a.options.removeCloneOnHide || rootEl.insertBefore(cloneEl, dragEl), a._hideClone(), _dispatchEvent({
        sortable: a,
        name: "clone"
      }));
    }), !r && toggleClass(dragEl, c.dragClass, !0), r ? (ignoreNextClick = !0, a._loopId = setInterval(a._emulateDragOver, 50)) : (off(document, "mouseup", a._onDrop), off(document, "touchend", a._onDrop), off(document, "touchcancel", a._onDrop), d && (d.effectAllowed = "move", c.setData && c.setData.call(a, d, dragEl)), on(document, "drop", a), css(dragEl, "transform", "translateZ(0)")), awaitingDragStarted = !0, a._dragStartId = _nextTick(a._dragStarted.bind(a, r, s)), on(document, "selectstart", a), moved = !0, Safari && css(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function i(s) {
    var r = this.el, a = s.target, d, c, l, p = this.options, u = p.group, m = Sortable.active, v = activeGroup === u, h = p.sort, f = putSortable || m, w, g = this, _ = !1;
    if (_silent)
      return;
    function y(N, G) {
      pluginEvent(N, g, _objectSpread2({
        evt: s,
        isOwner: v,
        axis: w ? "vertical" : "horizontal",
        revert: l,
        dragRect: d,
        targetRect: c,
        canSort: h,
        fromSortable: f,
        target: a,
        completed: b,
        onMove: function(B, U) {
          return _onMove(rootEl, r, dragEl, d, B, getRect(B), s, U);
        },
        changed: P
      }, G));
    }
    function S() {
      y("dragOverAnimationCapture"), g.captureAnimationState(), g !== f && f.captureAnimationState();
    }
    function b(N) {
      return y("dragOverCompleted", {
        insertion: N
      }), N && (v ? m._hideClone() : m._showClone(g), g !== f && (toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : m.options.ghostClass, !1), toggleClass(dragEl, p.ghostClass, !0)), putSortable !== g && g !== Sortable.active ? putSortable = g : g === Sortable.active && putSortable && (putSortable = null), f === g && (g._ignoreWhileAnimating = a), g.animateAll(function() {
        y("dragOverAnimationComplete"), g._ignoreWhileAnimating = null;
      }), g !== f && (f.animateAll(), f._ignoreWhileAnimating = null)), (a === dragEl && !dragEl.animated || a === r && !a.animated) && (lastTarget = null), !p.dragoverBubble && !s.rootEl && a !== document && (dragEl.parentNode[expando]._isOutsideThisEl(s.target), !N && nearestEmptyInsertDetectEvent(s)), !p.dragoverBubble && s.stopPropagation && s.stopPropagation(), _ = !0;
    }
    function P() {
      newIndex = index$7(dragEl), newDraggableIndex = index$7(dragEl, p.draggable), _dispatchEvent({
        sortable: g,
        name: "change",
        toEl: r,
        newIndex,
        newDraggableIndex,
        originalEvent: s
      });
    }
    if (s.preventDefault !== void 0 && s.cancelable && s.preventDefault(), a = closest(a, p.draggable, r, !0), y("dragOver"), Sortable.eventCanceled)
      return _;
    if (dragEl.contains(s.target) || a.animated && a.animatingX && a.animatingY || g._ignoreWhileAnimating === a)
      return b(!1);
    if (ignoreNextClick = !1, m && !p.disabled && (v ? h || (l = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, m, dragEl, s)) && u.checkPut(this, m, dragEl, s))) {
      if (w = this._getDirection(s, a) === "vertical", d = getRect(dragEl), y("dragOverValid"), Sortable.eventCanceled)
        return _;
      if (l)
        return parentEl = rootEl, S(), this._hideClone(), y("revert"), Sortable.eventCanceled || (nextEl ? rootEl.insertBefore(dragEl, nextEl) : rootEl.appendChild(dragEl)), b(!0);
      var C = lastChild(r, p.draggable);
      if (!C || _ghostIsLast(s, w, this) && !C.animated) {
        if (C === dragEl)
          return b(!1);
        if (C && r === s.target && (a = C), a && (c = getRect(a)), _onMove(rootEl, r, dragEl, d, a, c, s, !!a) !== !1)
          return S(), C && C.nextSibling ? r.insertBefore(dragEl, C.nextSibling) : r.appendChild(dragEl), parentEl = r, P(), b(!0);
      } else if (C && _ghostIsFirst(s, w, this)) {
        var k = getChild(r, 0, p, !0);
        if (k === dragEl)
          return b(!1);
        if (a = k, c = getRect(a), _onMove(rootEl, r, dragEl, d, a, c, s, !1) !== !1)
          return S(), r.insertBefore(dragEl, k), parentEl = r, P(), b(!0);
      } else if (a.parentNode === r) {
        c = getRect(a);
        var x = 0, $, T = dragEl.parentNode !== r, j = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || d, a.animated && a.toRect || c, w), E = w ? "top" : "left", O = isScrolledPast(a, "top", "top") || isScrolledPast(dragEl, "top", "top"), I = O ? O.scrollTop : void 0;
        lastTarget !== a && ($ = c[E], pastFirstInvertThresh = !1, isCircumstantialInvert = !j && p.invertSwap || T), x = _getSwapDirection(s, a, c, w, j ? 1 : p.swapThreshold, p.invertedSwapThreshold == null ? p.swapThreshold : p.invertedSwapThreshold, isCircumstantialInvert, lastTarget === a);
        var M;
        if (x !== 0) {
          var A = index$7(dragEl);
          do
            A -= x, M = parentEl.children[A];
          while (M && (css(M, "display") === "none" || M === ghostEl));
        }
        if (x === 0 || M === a)
          return b(!1);
        lastTarget = a, lastDirection = x;
        var z = a.nextElementSibling, D = !1;
        D = x === 1;
        var L = _onMove(rootEl, r, dragEl, d, a, c, s, D);
        if (L !== !1)
          return (L === 1 || L === -1) && (D = L === 1), _silent = !0, setTimeout(_unsilent, 30), S(), D && !z ? r.appendChild(dragEl) : a.parentNode.insertBefore(dragEl, D ? z : a), O && scrollBy(O, 0, I - O.scrollTop), parentEl = dragEl.parentNode, $ !== void 0 && !isCircumstantialInvert && (targetMoveDistance = Math.abs($ - getRect(a)[E])), P(), b(!0);
      }
      if (r.contains(dragEl))
        return b(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function i() {
    off(document, "mousemove", this._onTouchMove), off(document, "touchmove", this._onTouchMove), off(document, "pointermove", this._onTouchMove), off(document, "dragover", nearestEmptyInsertDetectEvent), off(document, "mousemove", nearestEmptyInsertDetectEvent), off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function i() {
    var s = this.el.ownerDocument;
    off(s, "mouseup", this._onDrop), off(s, "touchend", this._onDrop), off(s, "pointerup", this._onDrop), off(s, "touchcancel", this._onDrop), off(document, "selectstart", this);
  },
  _onDrop: function i(s) {
    var r = this.el, a = this.options;
    if (newIndex = index$7(dragEl), newDraggableIndex = index$7(dragEl, a.draggable), pluginEvent("drop", this, {
      evt: s
    }), parentEl = dragEl && dragEl.parentNode, newIndex = index$7(dragEl), newDraggableIndex = index$7(dragEl, a.draggable), Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = !1, isCircumstantialInvert = !1, pastFirstInvertThresh = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _cancelNextTick(this.cloneId), _cancelNextTick(this._dragStartId), this.nativeDraggable && (off(document, "drop", this), off(r, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Safari && css(document.body, "user-select", ""), css(dragEl, "transform", ""), s && (moved && (s.cancelable && s.preventDefault(), !a.dropBubble && s.stopPropagation()), ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl), (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") && cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), dragEl && (this.nativeDraggable && off(dragEl, "dragend", this), _disableDraggable(dragEl), dragEl.style["will-change"] = "", moved && !awaitingDragStarted && toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, !1), toggleClass(dragEl, this.options.chosenClass, !1), _dispatchEvent({
      sortable: this,
      name: "unchoose",
      toEl: parentEl,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: s
    }), rootEl !== parentEl ? (newIndex >= 0 && (_dispatchEvent({
      rootEl: parentEl,
      name: "add",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: s
    }), _dispatchEvent({
      sortable: this,
      name: "remove",
      toEl: parentEl,
      originalEvent: s
    }), _dispatchEvent({
      rootEl: parentEl,
      name: "sort",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: s
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: s
    })), putSortable && putSortable.save()) : newIndex !== oldIndex && newIndex >= 0 && (_dispatchEvent({
      sortable: this,
      name: "update",
      toEl: parentEl,
      originalEvent: s
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: s
    })), Sortable.active && ((newIndex == null || newIndex === -1) && (newIndex = oldIndex, newDraggableIndex = oldDraggableIndex), _dispatchEvent({
      sortable: this,
      name: "end",
      toEl: parentEl,
      originalEvent: s
    }), this.save()))), this._nulling();
  },
  _nulling: function i() {
    pluginEvent("nulling", this), rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null, savedInputChecked.forEach(function(s) {
      s.checked = !0;
    }), savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function i(s) {
    switch (s.type) {
      case "drop":
      case "dragend":
        this._onDrop(s);
        break;
      case "dragenter":
      case "dragover":
        dragEl && (this._onDragOver(s), _globalDragOver(s));
        break;
      case "selectstart":
        s.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function i() {
    for (var s = [], r, a = this.el.children, d = 0, c = a.length, l = this.options; d < c; d++)
      r = a[d], closest(r, l.draggable, this.el, !1) && s.push(r.getAttribute(l.dataIdAttr) || _generateId(r));
    return s;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function i(s, r) {
    var a = {}, d = this.el;
    this.toArray().forEach(function(c, l) {
      var p = d.children[l];
      closest(p, this.options.draggable, d, !1) && (a[c] = p);
    }, this), r && this.captureAnimationState(), s.forEach(function(c) {
      a[c] && (d.removeChild(a[c]), d.appendChild(a[c]));
    }), r && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function i() {
    var s = this.options.store;
    s && s.set && s.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function i(s, r) {
    return closest(s, r || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function i(s, r) {
    var a = this.options;
    if (r === void 0)
      return a[s];
    var d = PluginManager.modifyOption(this, s, r);
    typeof d < "u" ? a[s] = d : a[s] = r, s === "group" && _prepareGroup(a);
  },
  /**
   * Destroy
   */
  destroy: function i() {
    pluginEvent("destroy", this);
    var s = this.el;
    s[expando] = null, off(s, "mousedown", this._onTapStart), off(s, "touchstart", this._onTapStart), off(s, "pointerdown", this._onTapStart), this.nativeDraggable && (off(s, "dragover", this), off(s, "dragenter", this)), Array.prototype.forEach.call(s.querySelectorAll("[draggable]"), function(r) {
      r.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), sortables.splice(sortables.indexOf(this.el), 1), this.el = s = null;
  },
  _hideClone: function i() {
    if (!cloneHidden) {
      if (pluginEvent("hideClone", this), Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none"), this.options.removeCloneOnHide && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), cloneHidden = !0;
    }
  },
  _showClone: function i(s) {
    if (s.lastPutMode !== "clone") {
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
function _globalDragOver(i) {
  i.dataTransfer && (i.dataTransfer.dropEffect = "move"), i.cancelable && i.preventDefault();
}
function _onMove(i, s, r, a, d, c, l, p) {
  var u, m = i[expando], v = m.options.onMove, h;
  return window.CustomEvent && !IE11OrLess && !Edge ? u = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (u = document.createEvent("Event"), u.initEvent("move", !0, !0)), u.to = s, u.from = i, u.dragged = r, u.draggedRect = a, u.related = d || s, u.relatedRect = c || getRect(s), u.willInsertAfter = p, u.originalEvent = l, i.dispatchEvent(u), v && (h = v.call(m, u, l)), h;
}
function _disableDraggable(i) {
  i.draggable = !1;
}
function _unsilent() {
  _silent = !1;
}
function _ghostIsFirst(i, s, r) {
  var a = getRect(getChild(r.el, 0, r.options, !0)), d = 10;
  return s ? i.clientX < a.left - d || i.clientY < a.top && i.clientX < a.right : i.clientY < a.top - d || i.clientY < a.bottom && i.clientX < a.left;
}
function _ghostIsLast(i, s, r) {
  var a = getRect(lastChild(r.el, r.options.draggable)), d = 10;
  return s ? i.clientX > a.right + d || i.clientX <= a.right && i.clientY > a.bottom && i.clientX >= a.left : i.clientX > a.right && i.clientY > a.top || i.clientX <= a.right && i.clientY > a.bottom + d;
}
function _getSwapDirection(i, s, r, a, d, c, l, p) {
  var u = a ? i.clientY : i.clientX, m = a ? r.height : r.width, v = a ? r.top : r.left, h = a ? r.bottom : r.right, f = !1;
  if (!l) {
    if (p && targetMoveDistance < m * d) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? u > v + m * c / 2 : u < h - m * c / 2) && (pastFirstInvertThresh = !0), pastFirstInvertThresh)
        f = !0;
      else if (lastDirection === 1 ? u < v + targetMoveDistance : u > h - targetMoveDistance)
        return -lastDirection;
    } else if (u > v + m * (1 - d) / 2 && u < h - m * (1 - d) / 2)
      return _getInsertDirection(s);
  }
  return f = f || l, f && (u < v + m * c / 2 || u > h - m * c / 2) ? u > v + m / 2 ? 1 : -1 : 0;
}
function _getInsertDirection(i) {
  return index$7(dragEl) < index$7(i) ? 1 : -1;
}
function _generateId(i) {
  for (var s = i.tagName + i.className + i.src + i.href + i.textContent, r = s.length, a = 0; r--; )
    a += s.charCodeAt(r);
  return a.toString(36);
}
function _saveInputCheckedState(i) {
  savedInputChecked.length = 0;
  for (var s = i.getElementsByTagName("input"), r = s.length; r--; ) {
    var a = s[r];
    a.checked && savedInputChecked.push(a);
  }
}
function _nextTick(i) {
  return setTimeout(i, 0);
}
function _cancelNextTick(i) {
  return clearTimeout(i);
}
documentExists && on(document, "touchmove", function(i) {
  (Sortable.active || awaitingDragStarted) && i.cancelable && i.preventDefault();
});
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function i(s, r) {
    return !!closest(s, r, s, !1);
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
Sortable.get = function(i) {
  return i[expando];
};
Sortable.mount = function() {
  for (var i = arguments.length, s = new Array(i), r = 0; r < i; r++)
    s[r] = arguments[r];
  s[0].constructor === Array && (s = s[0]), s.forEach(function(a) {
    if (!a.prototype || !a.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(a));
    a.utils && (Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), a.utils)), PluginManager.mount(a);
  });
};
Sortable.create = function(i, s) {
  return new Sortable(i, s);
};
Sortable.version = version$1;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = !1, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function i() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var s in this)
      s.charAt(0) === "_" && typeof this[s] == "function" && (this[s] = this[s].bind(this));
  }
  return i.prototype = {
    dragStarted: function(r) {
      var a = r.originalEvent;
      this.sortable.nativeDraggable ? on(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? on(document, "pointermove", this._handleFallbackAutoScroll) : a.touches ? on(document, "touchmove", this._handleFallbackAutoScroll) : on(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(r) {
      var a = r.originalEvent;
      !this.options.dragOverBubble && !a.rootEl && this._handleAutoScroll(a);
    },
    drop: function() {
      this.sortable.nativeDraggable ? off(document, "dragover", this._handleAutoScroll) : (off(document, "pointermove", this._handleFallbackAutoScroll), off(document, "touchmove", this._handleFallbackAutoScroll), off(document, "mousemove", this._handleFallbackAutoScroll)), clearPointerElemChangedInterval(), clearAutoScrolls(), cancelThrottle();
    },
    nulling: function() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null, autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function(r) {
      this._handleAutoScroll(r, !0);
    },
    _handleAutoScroll: function(r, a) {
      var d = this, c = (r.touches ? r.touches[0] : r).clientX, l = (r.touches ? r.touches[0] : r).clientY, p = document.elementFromPoint(c, l);
      if (touchEvt$1 = r, a || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(r, this.options, p, a);
        var u = getParentAutoScrollElement(p, !0);
        scrolling && (!pointerElemChangedInterval || c !== lastAutoScrollX || l !== lastAutoScrollY) && (pointerElemChangedInterval && clearPointerElemChangedInterval(), pointerElemChangedInterval = setInterval(function() {
          var m = getParentAutoScrollElement(document.elementFromPoint(c, l), !0);
          m !== u && (u = m, clearAutoScrolls()), autoScroll(r, d.options, m, a);
        }, 10), lastAutoScrollX = c, lastAutoScrollY = l);
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(p, !0) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(r, this.options, getParentAutoScrollElement(p, !1), !1);
      }
    }
  }, _extends(i, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(i) {
    clearInterval(i.pid);
  }), autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(i, s, r, a) {
  if (s.scroll) {
    var d = (i.touches ? i.touches[0] : i).clientX, c = (i.touches ? i.touches[0] : i).clientY, l = s.scrollSensitivity, p = s.scrollSpeed, u = getWindowScrollingElement(), m = !1, v;
    scrollRootEl !== r && (scrollRootEl = r, clearAutoScrolls(), scrollEl = s.scroll, v = s.scrollFn, scrollEl === !0 && (scrollEl = getParentAutoScrollElement(r, !0)));
    var h = 0, f = scrollEl;
    do {
      var w = f, g = getRect(w), _ = g.top, y = g.bottom, S = g.left, b = g.right, P = g.width, C = g.height, k = void 0, x = void 0, $ = w.scrollWidth, T = w.scrollHeight, j = css(w), E = w.scrollLeft, O = w.scrollTop;
      w === u ? (k = P < $ && (j.overflowX === "auto" || j.overflowX === "scroll" || j.overflowX === "visible"), x = C < T && (j.overflowY === "auto" || j.overflowY === "scroll" || j.overflowY === "visible")) : (k = P < $ && (j.overflowX === "auto" || j.overflowX === "scroll"), x = C < T && (j.overflowY === "auto" || j.overflowY === "scroll"));
      var I = k && (Math.abs(b - d) <= l && E + P < $) - (Math.abs(S - d) <= l && !!E), M = x && (Math.abs(y - c) <= l && O + C < T) - (Math.abs(_ - c) <= l && !!O);
      if (!autoScrolls[h])
        for (var A = 0; A <= h; A++)
          autoScrolls[A] || (autoScrolls[A] = {});
      (autoScrolls[h].vx != I || autoScrolls[h].vy != M || autoScrolls[h].el !== w) && (autoScrolls[h].el = w, autoScrolls[h].vx = I, autoScrolls[h].vy = M, clearInterval(autoScrolls[h].pid), (I != 0 || M != 0) && (m = !0, autoScrolls[h].pid = setInterval(function() {
        a && this.layer === 0 && Sortable.active._onTouchMove(touchEvt$1);
        var z = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * p : 0, D = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * p : 0;
        typeof v == "function" && v.call(Sortable.dragged.parentNode[expando], D, z, i, touchEvt$1, autoScrolls[this.layer].el) !== "continue" || scrollBy(autoScrolls[this.layer].el, D, z);
      }.bind({
        layer: h
      }), 24))), h++;
    } while (s.bubbleScroll && f !== u && (f = getParentAutoScrollElement(f, !1)));
    scrolling = m;
  }
}, 30), drop = function i(s) {
  var r = s.originalEvent, a = s.putSortable, d = s.dragEl, c = s.activeSortable, l = s.dispatchSortableEvent, p = s.hideGhostForTarget, u = s.unhideGhostForTarget;
  if (r) {
    var m = a || c;
    p();
    var v = r.changedTouches && r.changedTouches.length ? r.changedTouches[0] : r, h = document.elementFromPoint(v.clientX, v.clientY);
    u(), m && !m.el.contains(h) && (l("spill"), this.onSpill({
      dragEl: d,
      putSortable: a
    }));
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function i(s) {
    var r = s.oldDraggableIndex;
    this.startIndex = r;
  },
  onSpill: function i(s) {
    var r = s.dragEl, a = s.putSortable;
    this.sortable.captureAnimationState(), a && a.captureAnimationState();
    var d = getChild(this.sortable.el, this.startIndex, this.options);
    d ? this.sortable.el.insertBefore(r, d) : this.sortable.el.appendChild(r), this.sortable.animateAll(), a && a.animateAll();
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function i(s) {
    var r = s.dragEl, a = s.putSortable, d = a || this.sortable;
    d.captureAnimationState(), r.parentNode && r.parentNode.removeChild(r), d.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
var lastSwapEl;
function SwapPlugin() {
  function i() {
    this.defaults = {
      swapClass: "sortable-swap-highlight"
    };
  }
  return i.prototype = {
    dragStart: function(r) {
      var a = r.dragEl;
      lastSwapEl = a;
    },
    dragOverValid: function(r) {
      var a = r.completed, d = r.target, c = r.onMove, l = r.activeSortable, p = r.changed, u = r.cancel;
      if (l.options.swap) {
        var m = this.sortable.el, v = this.options;
        if (d && d !== m) {
          var h = lastSwapEl;
          c(d) !== !1 ? (toggleClass(d, v.swapClass, !0), lastSwapEl = d) : lastSwapEl = null, h && h !== lastSwapEl && toggleClass(h, v.swapClass, !1);
        }
        p(), a(!0), u();
      }
    },
    drop: function(r) {
      var a = r.activeSortable, d = r.putSortable, c = r.dragEl, l = d || this.sortable, p = this.options;
      lastSwapEl && toggleClass(lastSwapEl, p.swapClass, !1), lastSwapEl && (p.swap || d && d.options.swap) && c !== lastSwapEl && (l.captureAnimationState(), l !== a && a.captureAnimationState(), swapNodes(c, lastSwapEl), l.animateAll(), l !== a && a.animateAll());
    },
    nulling: function() {
      lastSwapEl = null;
    }
  }, _extends(i, {
    pluginName: "swap",
    eventProperties: function() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(i, s) {
  var r = i.parentNode, a = s.parentNode, d, c;
  !r || !a || r.isEqualNode(s) || a.isEqualNode(i) || (d = index$7(i), c = index$7(s), r.isEqualNode(a) && d < c && c++, r.insertBefore(s, r.children[d]), a.insertBefore(i, a.children[c]));
}
var multiDragElements = [], multiDragClones = [], lastMultiDragSelect, multiDragSortable, initialFolding = !1, folding = !1, dragStarted = !1, dragEl$1, clonesFromRect, clonesHidden;
function MultiDragPlugin() {
  function i(s) {
    for (var r in this)
      r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
    s.options.avoidImplicitDeselect || (s.options.supportPointer ? on(document, "pointerup", this._deselectMultiDrag) : (on(document, "mouseup", this._deselectMultiDrag), on(document, "touchend", this._deselectMultiDrag))), on(document, "keydown", this._checkKeyDown), on(document, "keyup", this._checkKeyUp), this.defaults = {
      selectedClass: "sortable-selected",
      multiDragKey: null,
      avoidImplicitDeselect: !1,
      setData: function(d, c) {
        var l = "";
        multiDragElements.length && multiDragSortable === s ? multiDragElements.forEach(function(p, u) {
          l += (u ? ", " : "") + p.textContent;
        }) : l = c.textContent, d.setData("Text", l);
      }
    };
  }
  return i.prototype = {
    multiDragKeyDown: !1,
    isMultiDrag: !1,
    delayStartGlobal: function(r) {
      var a = r.dragEl;
      dragEl$1 = a;
    },
    delayEnded: function() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function(r) {
      var a = r.sortable, d = r.cancel;
      if (this.isMultiDrag) {
        for (var c = 0; c < multiDragElements.length; c++)
          multiDragClones.push(clone(multiDragElements[c])), multiDragClones[c].sortableIndex = multiDragElements[c].sortableIndex, multiDragClones[c].draggable = !1, multiDragClones[c].style["will-change"] = "", toggleClass(multiDragClones[c], this.options.selectedClass, !1), multiDragElements[c] === dragEl$1 && toggleClass(multiDragClones[c], this.options.chosenClass, !1);
        a._hideClone(), d();
      }
    },
    clone: function(r) {
      var a = r.sortable, d = r.rootEl, c = r.dispatchSortableEvent, l = r.cancel;
      this.isMultiDrag && (this.options.removeCloneOnHide || multiDragElements.length && multiDragSortable === a && (insertMultiDragClones(!0, d), c("clone"), l()));
    },
    showClone: function(r) {
      var a = r.cloneNowShown, d = r.rootEl, c = r.cancel;
      this.isMultiDrag && (insertMultiDragClones(!1, d), multiDragClones.forEach(function(l) {
        css(l, "display", "");
      }), a(), clonesHidden = !1, c());
    },
    hideClone: function(r) {
      var a = this, d = r.sortable, c = r.cloneNowHidden, l = r.cancel;
      this.isMultiDrag && (multiDragClones.forEach(function(p) {
        css(p, "display", "none"), a.options.removeCloneOnHide && p.parentNode && p.parentNode.removeChild(p);
      }), c(), clonesHidden = !0, l());
    },
    dragStartGlobal: function(r) {
      var a = r.sortable;
      !this.isMultiDrag && multiDragSortable && multiDragSortable.multiDrag._deselectMultiDrag(), multiDragElements.forEach(function(d) {
        d.sortableIndex = index$7(d);
      }), multiDragElements = multiDragElements.sort(function(d, c) {
        return d.sortableIndex - c.sortableIndex;
      }), dragStarted = !0;
    },
    dragStarted: function(r) {
      var a = this, d = r.sortable;
      if (this.isMultiDrag) {
        if (this.options.sort && (d.captureAnimationState(), this.options.animation)) {
          multiDragElements.forEach(function(l) {
            l !== dragEl$1 && css(l, "position", "absolute");
          });
          var c = getRect(dragEl$1, !1, !0, !0);
          multiDragElements.forEach(function(l) {
            l !== dragEl$1 && setRect(l, c);
          }), folding = !0, initialFolding = !0;
        }
        d.animateAll(function() {
          folding = !1, initialFolding = !1, a.options.animation && multiDragElements.forEach(function(l) {
            unsetRect(l);
          }), a.options.sort && removeMultiDragElements();
        });
      }
    },
    dragOver: function(r) {
      var a = r.target, d = r.completed, c = r.cancel;
      folding && ~multiDragElements.indexOf(a) && (d(!1), c());
    },
    revert: function(r) {
      var a = r.fromSortable, d = r.rootEl, c = r.sortable, l = r.dragRect;
      multiDragElements.length > 1 && (multiDragElements.forEach(function(p) {
        c.addAnimationState({
          target: p,
          rect: folding ? getRect(p) : l
        }), unsetRect(p), p.fromRect = l, a.removeAnimationState(p);
      }), folding = !1, insertMultiDragElements(!this.options.removeCloneOnHide, d));
    },
    dragOverCompleted: function(r) {
      var a = r.sortable, d = r.isOwner, c = r.insertion, l = r.activeSortable, p = r.parentEl, u = r.putSortable, m = this.options;
      if (c) {
        if (d && l._hideClone(), initialFolding = !1, m.animation && multiDragElements.length > 1 && (folding || !d && !l.options.sort && !u)) {
          var v = getRect(dragEl$1, !1, !0, !0);
          multiDragElements.forEach(function(f) {
            f !== dragEl$1 && (setRect(f, v), p.appendChild(f));
          }), folding = !0;
        }
        if (!d)
          if (folding || removeMultiDragElements(), multiDragElements.length > 1) {
            var h = clonesHidden;
            l._showClone(a), l.options.animation && !clonesHidden && h && multiDragClones.forEach(function(f) {
              l.addAnimationState({
                target: f,
                rect: clonesFromRect
              }), f.fromRect = clonesFromRect, f.thisAnimationDuration = null;
            });
          } else
            l._showClone(a);
      }
    },
    dragOverAnimationCapture: function(r) {
      var a = r.dragRect, d = r.isOwner, c = r.activeSortable;
      if (multiDragElements.forEach(function(p) {
        p.thisAnimationDuration = null;
      }), c.options.animation && !d && c.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, a);
        var l = matrix(dragEl$1, !0);
        clonesFromRect.top -= l.f, clonesFromRect.left -= l.e;
      }
    },
    dragOverAnimationComplete: function() {
      folding && (folding = !1, removeMultiDragElements());
    },
    drop: function(r) {
      var a = r.originalEvent, d = r.rootEl, c = r.parentEl, l = r.sortable, p = r.dispatchSortableEvent, u = r.oldIndex, m = r.putSortable, v = m || this.sortable;
      if (a) {
        var h = this.options, f = c.children;
        if (!dragStarted)
          if (h.multiDragKey && !this.multiDragKeyDown && this._deselectMultiDrag(), toggleClass(dragEl$1, h.selectedClass, !~multiDragElements.indexOf(dragEl$1)), ~multiDragElements.indexOf(dragEl$1))
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1), lastMultiDragSelect = null, dispatchEvent({
              sortable: l,
              rootEl: d,
              name: "deselect",
              targetEl: dragEl$1,
              originalEvent: a
            });
          else {
            if (multiDragElements.push(dragEl$1), dispatchEvent({
              sortable: l,
              rootEl: d,
              name: "select",
              targetEl: dragEl$1,
              originalEvent: a
            }), a.shiftKey && lastMultiDragSelect && l.el.contains(lastMultiDragSelect)) {
              var w = index$7(lastMultiDragSelect), g = index$7(dragEl$1);
              if (~w && ~g && w !== g) {
                var _, y;
                for (g > w ? (y = w, _ = g) : (y = g, _ = w + 1); y < _; y++)
                  ~multiDragElements.indexOf(f[y]) || (toggleClass(f[y], h.selectedClass, !0), multiDragElements.push(f[y]), dispatchEvent({
                    sortable: l,
                    rootEl: d,
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
          if (folding = !1, (c[expando].options.sort || c !== d) && multiDragElements.length > 1) {
            var S = getRect(dragEl$1), b = index$7(dragEl$1, ":not(." + this.options.selectedClass + ")");
            if (!initialFolding && h.animation && (dragEl$1.thisAnimationDuration = null), v.captureAnimationState(), !initialFolding && (h.animation && (dragEl$1.fromRect = S, multiDragElements.forEach(function(C) {
              if (C.thisAnimationDuration = null, C !== dragEl$1) {
                var k = folding ? getRect(C) : S;
                C.fromRect = k, v.addAnimationState({
                  target: C,
                  rect: k
                });
              }
            })), removeMultiDragElements(), multiDragElements.forEach(function(C) {
              f[b] ? c.insertBefore(C, f[b]) : c.appendChild(C), b++;
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
        (d === c || m && m.lastPutMode !== "clone") && multiDragClones.forEach(function(C) {
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
    _deselectMultiDrag: function(r) {
      if (!(typeof dragStarted < "u" && dragStarted) && multiDragSortable === this.sortable && !(r && closest(r.target, this.options.draggable, this.sortable.el, !1)) && !(r && r.button !== 0))
        for (; multiDragElements.length; ) {
          var a = multiDragElements[0];
          toggleClass(a, this.options.selectedClass, !1), multiDragElements.shift(), dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: "deselect",
            targetEl: a,
            originalEvent: r
          });
        }
    },
    _checkKeyDown: function(r) {
      r.key === this.options.multiDragKey && (this.multiDragKeyDown = !0);
    },
    _checkKeyUp: function(r) {
      r.key === this.options.multiDragKey && (this.multiDragKeyDown = !1);
    }
  }, _extends(i, {
    // Static methods & properties
    pluginName: "multiDrag",
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function(r) {
        var a = r.parentNode[expando];
        !a || !a.options.multiDrag || ~multiDragElements.indexOf(r) || (multiDragSortable && multiDragSortable !== a && (multiDragSortable.multiDrag._deselectMultiDrag(), multiDragSortable = a), toggleClass(r, a.options.selectedClass, !0), multiDragElements.push(r));
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function(r) {
        var a = r.parentNode[expando], d = multiDragElements.indexOf(r);
        !a || !a.options.multiDrag || !~d || (toggleClass(r, a.options.selectedClass, !1), multiDragElements.splice(d, 1));
      }
    },
    eventProperties: function() {
      var r = this, a = [], d = [];
      return multiDragElements.forEach(function(c) {
        a.push({
          multiDragElement: c,
          index: c.sortableIndex
        });
        var l;
        folding && c !== dragEl$1 ? l = -1 : folding ? l = index$7(c, ":not(." + r.options.selectedClass + ")") : l = index$7(c), d.push({
          multiDragElement: c,
          index: l
        });
      }), {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: a,
        newIndicies: d
      };
    },
    optionListeners: {
      multiDragKey: function(r) {
        return r = r.toLowerCase(), r === "ctrl" ? r = "Control" : r.length > 1 && (r = r.charAt(0).toUpperCase() + r.substr(1)), r;
      }
    }
  });
}
function insertMultiDragElements(i, s) {
  multiDragElements.forEach(function(r, a) {
    var d = s.children[r.sortableIndex + (i ? Number(a) : 0)];
    d ? s.insertBefore(r, d) : s.appendChild(r);
  });
}
function insertMultiDragClones(i, s) {
  multiDragClones.forEach(function(r, a) {
    var d = s.children[r.sortableIndex + (i ? Number(a) : 0)];
    d ? s.insertBefore(r, d) : s.appendChild(r);
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function(i) {
    i !== dragEl$1 && i.parentNode && i.parentNode.removeChild(i);
  });
}
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
const _withScopeId$1 = (i) => (pushScopeId("data-v-c0ff0ef8"), i = i(), popScopeId(), i), _hoisted_1$2 = { class: "flex flex-wrap" }, _hoisted_2$1 = {
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
  setup(i, { emit: s }) {
    const r = i, a = s, d = computed({
      get() {
        return r.modelValue;
      },
      set(y) {
        a("update:modelValue", y);
      }
    }), c = reactive({
      data: []
    });
    let l = reactive([]);
    const p = () => {
      d.value = toRaw(c.data).toString(), l = toRaw(c.data).map((y) => y.indexOf("data:image") != -1 ? y : img(y));
    }, u = computed(() => r.limit - c.data.length);
    watch(() => d.value, () => {
      d.value.indexOf("data:image") != -1 ? c.data = [d.value] : c.data = [
        ...d.value.split(",").filter((y) => y)
      ], p();
    }, { immediate: !0 });
    const m = computed(() => ({
      width: r.width,
      height: r.height
    })), v = (y) => {
      r.limit == 1 ? (c.data.splice(0, 1), y && c.data.push(y.url)) : (y.forEach((S) => {
        c.data.length < r.limit && c.data.push(S.url);
      }), nextTick(() => {
        _();
      })), p(), nextTick(() => {
        a("change", d.value);
      });
    }, h = (y = 0) => {
      c.data.splice(y, 1), p();
    }, f = reactive({
      show: !1,
      index: 0
    }), w = (y = 0) => {
      f.show = !0, f.index = y;
    }, g = ref(null);
    onMounted(() => {
      nextTick(() => {
        _();
      });
    });
    const _ = () => {
      r.limit != 1 && Sortable.create(g.value, {
        group: "image-wrap",
        animation: 300,
        onEnd: (y) => {
          const S = c.data[y.oldIndex];
          c.data.splice(y.oldIndex, 1), c.data.splice(y.newIndex, 0, S), p();
        }
      });
    };
    return (y, S) => {
      const b = resolveComponent("el-image"), P = resolveComponent("icon"), C = resolveComponent("upload-attachment"), k = resolveComponent("el-image-viewer");
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", _hoisted_1$2, [
          i.limit == 1 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px]", { "rounded-full": i.type == "avatar" }]),
            style: normalizeStyle(m.value)
          }, [
            c.data.length ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
              createElementVNode("div", _hoisted_3$1, [
                createVNode(b, {
                  class: "w-full h-full",
                  src: c.data[0].indexOf("data:image") != -1 ? c.data[0] : unref(img)(c.data[0]),
                  fit: i.imageFit
                }, null, 8, ["src", "fit"])
              ]),
              createElementVNode("div", _hoisted_4, [
                createVNode(P, {
                  name: "element ZoomIn",
                  color: "#fff",
                  size: "18px",
                  class: "mr-[10px]",
                  onClick: S[0] || (S[0] = (x) => w())
                }),
                createVNode(P, {
                  name: "element Delete",
                  color: "#fff",
                  size: "18px",
                  onClick: withModifiers(h, ["stop"])
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
                  createElementVNode("div", _hoisted_6, toDisplayString(i.imageText || unref(t$1)("upload.root")), 1)
                ])
              ]),
              _: 1
            }, 8, ["limit"]))
          ], 6)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createElementVNode("div", {
              class: "flex flex-wrap",
              ref_key: "imgListRef",
              ref: g
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(c.data, (x, $) => (openBlock(), createElementBlock("div", {
                class: "rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px] mb-[10px]",
                style: normalizeStyle(m.value),
                key: x + $
              }, [
                createElementVNode("div", _hoisted_7, [
                  createElementVNode("div", _hoisted_8, [
                    createVNode(b, {
                      src: unref(img)(x),
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
                      onClick: (T) => h($)
                    }, null, 8, ["onClick"])
                  ])
                ])
              ], 4))), 128))
            ], 512),
            c.data.length < i.limit ? (openBlock(), createElementBlock("div", {
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
                    createElementVNode("div", _hoisted_11, toDisplayString(i.imageText || unref(t$1)("upload.root")), 1)
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
          onClose: S[1] || (S[1] = (x) => f.show = !1),
          "initial-index": f.index,
          "zoom-rate": 1
        }, null, 8, ["url-list", "initial-index"])) : createCommentVNode("", !0)
      ], 64);
    };
  }
}), index_vue_vue_type_style_index_0_scoped_c0ff0ef8_lang = "", index$5 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c0ff0ef8"]]), index$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5
}, Symbol.toStringTag, { value: "Module" })), _withScopeId = (i) => (pushScopeId("data-v-0e4db2d0"), i = i(), popScopeId(), i), _hoisted_1$1 = ["onClick"], _hoisted_2 = { class: "mt-[16px] flex" }, _hoisted_3 = { class: "dialog-footer" }, _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
  setup(i, { expose: s, emit: r }) {
    const a = i, d = () => {
      l.value = {
        id: 0,
        name: "",
        parent: "",
        title: "",
        url: ""
      };
    }, c = r, l = computed({
      get() {
        return a.modelValue;
      },
      set(S) {
        c("update:modelValue", S);
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
    }), m = ref(), v = ref(!1), h = () => {
      v.value = !0, f();
    }, f = (S = 1) => {
      u.loading = !0, u.page = S, getPageLink({
        page: u.page,
        limit: u.limit,
        ...u.searchParam
      }).then((b) => {
        u.loading = !1, u.data = b.data.data, u.data.forEach((P) => {
          P.checked = P.id == l.value.id;
        }), u.total = b.data.total, g();
      }).catch(() => {
        u.loading = !1;
      });
    };
    f();
    const w = (S, b) => {
      S ? l.value.id = b.id : l.value.id = 0, g();
    }, g = () => {
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
    return s({
      show: h,
      showDialog: v
    }), (S, b) => {
      const P = resolveComponent("Close"), C = resolveComponent("el-icon"), k = resolveComponent("ArrowRight"), x = resolveComponent("el-input"), $ = resolveComponent("el-checkbox"), T = resolveComponent("el-table-column"), j = resolveComponent("el-table"), E = resolveComponent("el-pagination"), O = resolveComponent("el-button"), I = resolveComponent("el-dialog"), M = resolveDirective("loading");
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", { onClick: h }, [
          renderSlot(S.$slots, "default", {}, () => [
            createVNode(x, {
              modelValue: l.value.title,
              "onUpdate:modelValue": b[0] || (b[0] = (A) => l.value.title = A),
              placeholder: unref(t$1)("请选择跳转页面"),
              readonly: "",
              class: "link-input"
            }, {
              suffix: withCtx(() => [
                createElementVNode("div", {
                  onClick: withModifiers(d, ["stop"])
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
            withDirectives((openBlock(), createBlock(j, {
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
                      "onUpdate:modelValue": (z) => A.checked = z,
                      onChange: (z) => w(z, A)
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
              createVNode(E, {
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
const setMapInstance = (i) => {
  currentMap = i;
}, createCircle = (i, s, r, a) => {
  const d = window.T;
  if (!d)
    return null;
  s.radius = s.radius ?? 1e3, s.center = s.center ?? { lat: i.getCenter().lat, lng: i.getCenter().lng };
  const c = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], l = {
    color: s.color || `rgba(${c.toString()}, .4)`,
    weight: s.weight || 3,
    opacity: s.opacity || 0.8,
    fillColor: s.fillColor || `rgba(${c.toString()}, .4)`,
    fillOpacity: s.fillOpacity || 0.3
  }, p = new d.Circle(new d.LngLat(s.center.lng, s.center.lat), s.radius, l);
  if (geometry[s.key])
    try {
      geometry[s.key].editTimer && clearTimeout(geometry[s.key].editTimer), i.removeOverLay(geometry[s.key].graphical);
    } catch {
    }
  i.addOverLay(p);
  const u = { ...s };
  let m = { ...u.center }, v = u.radius;
  const h = () => {
    var w;
    p.isEditable() && ((w = geometry[u.key]) != null && w.editTimer && clearTimeout(geometry[u.key].editTimer), geometry[u.key].editTimer = setTimeout(() => {
      const g = p.getCenter(), _ = p.getRadius();
      (g.lng !== m.lng || g.lat !== m.lat) && (u.center = { lat: g.lat, lng: g.lng }, m = { ...u.center }, r && r(u)), _ !== v && (u.radius = _, v = _, r && r(u));
    }, 200));
  }, f = () => {
    a && a(u.key);
  };
  return i.addEventListener("touchend", h), i.addEventListener("mouseup", h), p.addEventListener("click", f), geometry[u.key] = { graphical: p, handleTouchEnd: h, handleClick: f, originalStyle: l }, p;
}, createRectangle = (i, s) => {
  const r = window.T;
  if (!r)
    return null;
  const { lat: a, lng: d } = i.getCenter();
  s.bounds = s.bounds ?? {
    southwest: { lat: a - 5e-3, lng: d - 5e-3 },
    northeast: { lat: a + 5e-3, lng: d + 5e-3 }
  };
  const c = [
    new r.LngLat(s.bounds.southwest.lng, s.bounds.southwest.lat),
    new r.LngLat(s.bounds.northeast.lng, s.bounds.southwest.lat),
    new r.LngLat(s.bounds.northeast.lng, s.bounds.northeast.lat),
    new r.LngLat(s.bounds.southwest.lng, s.bounds.northeast.lat)
  ], l = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], p = new r.Polygon(c, {
    color: s.color || `rgba(${l.toString()}, .4)`,
    weight: s.weight || 3,
    opacity: s.opacity || 0.8,
    fillColor: s.fillColor || `rgba(${l.toString()}, .4)`,
    fillOpacity: s.fillOpacity || 0.3
  });
  return i.addOverLay(p), geometry[s.key] = { graphical: p }, p;
}, createPolygon = (i, s, r, a) => {
  const d = window.T;
  if (!d)
    return null;
  const { lat: c, lng: l } = i.getCenter();
  s.paths = s.paths ?? [
    { lat: c + 0.01, lng: l + 0.01 },
    { lat: c - 0.01, lng: l + 0.01 },
    { lat: c - 0.01, lng: l - 0.01 },
    { lat: c + 0.01, lng: l - 0.01 }
  ];
  const p = s.paths.map((_) => new d.LngLat(_.lng, _.lat)), u = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], m = {
    color: s.color || `rgba(${u.toString()}, .4)`,
    weight: s.weight || 3,
    opacity: s.opacity || 0.8,
    fillColor: s.fillColor || `rgba(${u.toString()}, .4)`,
    fillOpacity: s.fillOpacity || 0.3
  }, v = new d.Polygon(p, m);
  if (geometry[s.key])
    try {
      geometry[s.key].editTimer && clearTimeout(geometry[s.key].editTimer), i.removeOverLay(geometry[s.key].graphical);
    } catch {
    }
  i.addOverLay(v);
  let h = JSON.parse(JSON.stringify(s.paths));
  const f = { ...s }, w = () => {
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
          JSON.stringify(b) !== JSON.stringify(h) && (f.paths = b, h = JSON.parse(JSON.stringify(f.paths)), r && r(f));
        } else
          console.error("curLngLats 不是数组:", y);
      } catch (y) {
        console.error("获取多边形路径失败:", y);
      }
    }, 200));
  }, g = () => {
    a && a(f.key);
  };
  return i.addEventListener("touchend", w), i.addEventListener("mouseup", w), v.addEventListener("click", g), geometry[f.key] = { graphical: v, handleTouchEnd: w, handleClick: g, originalStyle: m }, v;
}, deleteGeometry = (i, s) => {
  if (geometry[s])
    try {
      window.T && geometry[s].graphical && (geometry[s].editTimer && clearTimeout(geometry[s].editTimer), geometry[s].handleTouchEnd && (i.removeEventListener("touchend", geometry[s].handleTouchEnd), i.removeEventListener("mouseup", geometry[s].handleTouchEnd)), geometry[s].handleClick && geometry[s].graphical.removeEventListener("click", geometry[s].handleClick), i.removeOverLay(geometry[s].graphical)), delete geometry[s];
    } catch (r) {
      console.warn("删除图形失败:", r);
    }
}, clearAllGeometry = (i) => {
  window.T && (Object.keys(geometry).forEach((r) => {
    geometry[r].editTimer && clearTimeout(geometry[r].editTimer), geometry[r].handleTouchEnd && (i.removeEventListener("touchend", geometry[r].handleTouchEnd), i.removeEventListener("mouseup", geometry[r].handleTouchEnd)), geometry[r].handleClick && geometry[r].graphical.removeEventListener("click", geometry[r].handleClick);
  }), i.clearOverLays()), Object.keys(geometry).forEach((r) => delete geometry[r]);
}, selectGeometry = (i) => {
  var s, r, a;
  if ((s = geometry[i]) != null && s.graphical)
    try {
      deselectAllGeometry(), (a = (r = geometry[i].graphical).setSelected) == null || a.call(r, !0), geometry[i].graphical.enableEdit();
      const d = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      ];
      geometry[i].graphical.setStyle({
        color: "#1890ff",
        // 选中时的边框颜色
        weight: 2,
        // 选中时的边框宽度
        opacity: 1,
        // 选中时的边框透明度
        fillColor: `rgba(${d.toString()}, .6)`,
        // 选中时的填充颜色
        fillOpacity: 1
        // 选中时的填充透明度
      });
    } catch (d) {
      console.error("选中图形失败:", d);
    }
}, deselectAllGeometry = () => {
  Object.keys(geometry).forEach((i) => {
    var s, r, a, d, c, l, p;
    try {
      (a = (r = (s = geometry[i]) == null ? void 0 : s.graphical) == null ? void 0 : r.setSelected) == null || a.call(r, !1), (l = (c = (d = geometry[i]) == null ? void 0 : d.graphical) == null ? void 0 : c.disableEdit) == null || l.call(c), (p = geometry[i]) != null && p.originalStyle && geometry[i].graphical.setStyle(geometry[i].originalStyle);
    } catch (u) {
      console.warn("取消选中图形失败:", u);
    }
  });
}, createMarker = (i) => {
  const s = window.T;
  if (!s)
    return null;
  const { lat: r, lng: a } = i.getCenter(), d = new s.Marker(new s.LngLat(a, r));
  return i.addOverLay(d), d;
}, latLngToAddress = (i) => new Promise((s, r) => {
  const a = window.T;
  if (!a) {
    r(new Error("天地图服务未加载"));
    return;
  }
  const d = new a.Geocoder(), c = new a.LngLat(i.lng, i.lat);
  d.getLocation(c, (l) => {
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
        location: { lat: i.lat, lng: i.lng },
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
      s(m);
    } else
      r(new Error((l == null ? void 0 : l.msg) || "地址解析失败"));
  });
}), addressToLatLng = (i) => new Promise((s, r) => {
  const a = window.T;
  if (!a) {
    r(new Error("天地图服务未加载"));
    return;
  }
  new a.Geocoder().getPoint(i.address, (c) => {
    if (c && c.status === "0" && c.location) {
      const l = c.location.lat, p = c.location.lon || c.location.lng;
      l && p ? s({ lat: l, lng: p }) : r(new Error("坐标解析失败"));
    } else
      r(new Error((c == null ? void 0 : c.msg) || "未找到该地址"));
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
  setup(i, { expose: s, emit: r }) {
    const a = i, d = r, c = ref(!0), l = ref(""), p = ref("tianditu");
    let u = null, m = null;
    const v = ref([]), h = () => getMap({
      need_encrypt: !1
    }).then(($) => {
      p.value = $.data.map_type || "tianditu", l.value = p.value === "tianditu" ? $.data.tianditu_map_web_key : $.data.key;
    }).catch(($) => {
      c.value = !1, ElMessage.error(t$1("获取地图配置失败"));
    }), f = () => {
      const $ = document.createElement("script");
      $.src = "https://map.qq.com/api/gljs?libraries=tools,service&v=1.exp&key=" + l.value, document.body.appendChild($), $.onload = () => {
        setTimeout(() => {
          const T = window.TMap;
          if (T) {
            const j = a.longitude ? Number(a.longitude) : 116.397463, E = a.latitude ? Number(a.latitude) : 39.909187, O = new T.LatLng(E, j);
            u = new T.Map(a.containerId, { center: O, zoom: a.zoom }), u.on("tilesloaded", () => c.value = !1), m = createMarker$1(u), a.disabledClickMarker || u.on("click", (I) => {
              const M = I == null ? void 0 : I.latLng;
              if (!M)
                return;
              const A = typeof M.getLat == "function" ? M.getLat() : M.lat, z = typeof M.getLng == "function" ? M.getLng() : M.lng;
              if (A == null || z == null || Number.isNaN(A) || Number.isNaN(z))
                return;
              const D = new T.LatLng(A, z);
              u.setZoom(16), u.setCenter(D), m.updateGeometries({ id: "center", position: D }), nextTick(() => {
                _(A, z);
              });
            }), a.latitude && a.longitude && _(E, j);
          } else
            c.value = !1, ElMessage.error(t$1("腾讯地图加载失败"));
        }, MAP_INIT_DELAY);
      }, $.onerror = () => {
        c.value = !1, ElMessage.error(t$1("腾讯地图脚本加载失败"));
      };
    }, w = () => {
      const $ = document.createElement("script");
      $.src = "https://api.tianditu.gov.cn/api?v=4.0&tk=" + l.value, document.body.appendChild($), $.onload = () => {
        setTimeout(() => {
          const T = window.T;
          if (T) {
            const j = a.longitude ? Number(a.longitude) : 116.397463, E = a.latitude ? Number(a.latitude) : 39.909187;
            u = new T.Map(a.containerId), u.centerAndZoom(new T.LngLat(j, E), a.zoom);
            const O = new T.Control.Zoom();
            u.addControl(O), m = new T.Marker(new T.LngLat(j, E)), u.addOverLay(m), c.value = !1, a.disabledClickMarker || u.addEventListener("click", (I) => {
              const M = I.lnglat;
              if (!M)
                return;
              const A = M.lat, z = M.lng;
              A == null || z == null || Number.isNaN(A) || Number.isNaN(z) || (u.removeOverLay(m), m = new T.Marker(new T.LngLat(z, A)), u.addOverLay(m), u.centerAndZoom(new T.LngLat(z, A), 16), nextTick(() => {
                _(A, z);
              }));
            }), a.latitude && a.longitude && _(E, j);
          } else
            c.value = !1, ElMessage.error(t$1("天地图加载失败"));
        }, MAP_INIT_DELAY);
      }, $.onerror = () => {
        c.value = !1, ElMessage.error(t$1("天地图加载失败，请检查密钥配置"));
      };
    }, g = () => {
      if (!l.value) {
        c.value = !1;
        return;
      }
      u || (p.value === "tencent" ? f() : p.value === "tianditu" && w());
    }, _ = ($, T) => {
      d("update:longitude", String(T)), d("update:latitude", String($)), p.value === "tencent" ? latLngToAddress$1({ mapKey: l.value, lat: $, lng: T }).then(({ message: j, result: E }) => {
        (j == "query ok" || j == "Success") && d("locationChange", { lat: $, lng: T, address: E });
      }) : p.value === "tianditu" && latLngToAddress({ mapKey: l.value, lat: $, lng: T }).then((j) => {
        d("locationChange", { lat: $, lng: T, address: j });
      }).catch((j) => {
        ElMessage.error(j.message || t$1("地址解析失败"));
      });
    }, y = ($, T) => {
      if (!(!u || !m)) {
        if (p.value === "tencent") {
          const j = window.TMap;
          if (!j)
            return;
          const E = new j.LatLng($, T);
          u.setZoom(16), u.setCenter(E), m.updateGeometries({ id: "center", position: E });
        } else if (p.value === "tianditu") {
          const j = window.T;
          if (!j)
            return;
          const E = new j.LngLat(T, $);
          u.removeOverLay(m), m = new j.Marker(E), u.addOverLay(m), u.centerAndZoom(E, 16);
        }
      }
    }, S = ($) => new Promise((T, j) => {
      if (!l.value) {
        j(new Error(t$1("地图配置未加载")));
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
            j(new Error(t$1("腾讯地图服务未加载")));
            return;
          }
          new O.service.Geocoder({ key: l.value }).getLocation({ address: $ }).then((M) => {
            var A;
            if (M.status === 0 && ((A = M.result) != null && A.location)) {
              const z = M.result.location, D = Number(z.lat), L = Number(z.lng);
              y(D, L), T({ lat: D, lng: L });
            } else
              j(new Error(M.message || t$1("未找到该地址")));
          }).catch((M) => {
            j(M);
          });
        } else if (p.value === "tianditu") {
          const O = window.T;
          if (!O) {
            j(new Error(t$1("天地图服务未加载")));
            return;
          }
          new O.Geocoder().getPoint($, (M) => {
            if (M && M.status === "0" && M.location) {
              const A = M.location.lat, z = M.location.lon || M.location.lng;
              A && z ? (y(A, z), T({ lat: A, lng: z })) : j(new Error(t$1("坐标解析失败")));
            } else
              j(new Error((M == null ? void 0 : M.msg) || t$1("未找到该地址")));
          });
        }
      }).catch(j);
    }), b = ($, T = 1e3, j) => {
      if (!u)
        return null;
      const E = (j == null ? void 0 : j.key) || `circle_${Date.now()}`;
      let O = null;
      const I = { key: E, center: $, radius: T, ...j };
      return p.value === "tencent" ? (createCircle$1(u, I, (M) => {
        d("selectChange", M);
      }), O = { key: E, geometriesData: I }) : (O = createCircle(u, I, (M) => {
        d("areaChange", {
          key: M.key,
          type: "circle",
          path: {
            key: M.key,
            center: M.center,
            radius: M.radius
          }
        });
      }, (M) => {
        d("selectChange", M);
      }), O && (O.geometriesData = I)), O && v.value.push(O), O;
    }, P = ($, T) => {
      if (!u)
        return null;
      const j = (T == null ? void 0 : T.key) || `poly_${Date.now()}`;
      let E = null;
      const O = { key: j, paths: $, ...T };
      return p.value === "tencent" ? (createPolygon$1(u, O, (I) => {
        d("selectChange", I);
      }), E = { key: j, geometriesData: O }) : (E = createPolygon(u, O, (I) => {
        d("areaChange", {
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
        d("selectChange", I);
      }), E && (E.geometriesData = O)), E && v.value.push(E), E;
    }, C = ($) => {
      if (!u || !$)
        return;
      const T = $.key || "";
      p.value === "tencent" ? deleteGeometry$1(T) : deleteGeometry(u, T);
      const j = v.value.findIndex((E) => E.key === T);
      j > -1 && v.value.splice(j, 1);
    }, k = () => {
      u && (p.value === "tencent" ? v.value.forEach(($) => deleteGeometry$1($.key)) : clearAllGeometry(u), v.value = []);
    }, x = ($) => {
      p.value === "tencent" ? selectGeometry$1($) : selectGeometry($);
    };
    return watch(() => a.selectedKey, ($) => {
      $ && x($);
    }), watch([l, p], ([$, T]) => {
      $ && T && g();
    }), onMounted(() => {
      h();
    }), onBeforeUnmount(() => {
      if (u) {
        try {
          p.value === "tencent" ? u.destroy && u.destroy() : p.value === "tianditu" && (k(), u.clearOverLays && u.clearOverLays());
        } catch {
        }
        u = null, m = null, v.value = [];
      }
    }), s({
      updateLocation: y,
      searchAddress: S,
      addCircle: b,
      addPolygon: P,
      removeOverlay: C,
      clearOverlays: k,
      selectGeometry: x,
      getMap: () => u,
      getMarker: () => m,
      handleLocationChange: _
    }), ($, T) => {
      const j = resolveDirective("loading");
      return withDirectives((openBlock(), createElementBlock("div", {
        id: $.containerId,
        class: normalizeClass($.containerClass),
        style: normalizeStyle($.containerStyle)
      }, null, 14, _hoisted_1)), [
        [j, c.value]
      ]);
    };
  }
}), index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
function camelize(i) {
  return i.replace(/-(\w)/g, function(s, r) {
    return r ? r.toUpperCase() : "";
  });
}
function withInstall(i) {
  return i.install = function(s) {
    var r = i, a = r.name;
    s.component(a, i), s.component(camelize("-" + a), i);
  }, i;
}
var LoadEvent = /* @__PURE__ */ function() {
  function i() {
    this.listeners = {};
  }
  var s = i.prototype;
  return s.on = function(a, d) {
    this.listeners[a] === void 0 && (this.listeners[a] = {
      triggered: !1,
      requested: !1,
      cbs: []
    }), this.listeners[a].triggered && d(), this.listeners[a].cbs.push(d);
  }, s.emit = function(a) {
    this.listeners[a] && (this.listeners[a].triggered = !0, this.listeners[a].cbs.forEach(function(d) {
      return d();
    }));
  }, i;
}();
function debounce(i, s) {
  var r, a = function() {
    for (var c = this, l = arguments.length, p = new Array(l), u = 0; u < l; u++)
      p[u] = arguments[u];
    r && clearTimeout(r), r = setTimeout(function() {
      i.apply(c, p);
    }, s);
  };
  return a.cancel = function() {
    r !== void 0 && clearTimeout(r);
  }, a;
}
function asyncSeries(i) {
  return i.reduce(function(s, r) {
    return s.then(r);
  }, Promise.resolve());
}
function randomString(i) {
  for (var s = "abcdefghijklmnopqrstuvwxyz", r = "", a = 0; a < i; a++)
    r += s.charAt(Math.floor(Math.random() * s.length));
  return r;
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
      validator: function i(s) {
        return ["observer", "listener"].indexOf(s) !== -1;
      }
    },
    // MutationObserver 的配置 https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    observerOptions: {
      type: Object,
      default: function i() {
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
      validator: function i(s) {
        return s >= 20;
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
  setup: function i(s, r) {
    var a = r.emit, d = {
      UN_READY: "UN_READY",
      // 尚未初始化
      PENDING: "PENDING",
      // 开始初始化但尚未 ready
      READY: "READY"
      // 初始化完成并已 ready
    }, c = d.UN_READY, l, p, u, m = ref(), v = ["ueditor.config.js", "ueditor.all.min.js"], h = function() {
      return window.UE && window.UE.getEditor && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0;
    }, f = toRef(s, "modelValue");
    window.$loadEventBus || (window.$loadEventBus = new LoadEvent());
    var w = function(x) {
      return new Promise(function($, T) {
        if (window.$loadEventBus.on(x, $), window.$loadEventBus.listeners[x].requested === !1) {
          window.$loadEventBus.listeners[x].requested = !0;
          var j = document.createElement("script");
          j.src = x, j.onload = function() {
            window.$loadEventBus.emit(x);
          }, j.onerror = T, document.getElementsByTagName("head")[0].appendChild(j);
        }
      });
    }, g = function(x) {
      return new Promise(function($, T) {
        if (window.$loadEventBus.on(x, $), window.$loadEventBus.listeners[x].requested === !1) {
          window.$loadEventBus.listeners[x].requested = !0;
          var j = document.createElement("link");
          j.type = "text/css", j.rel = "stylesheet", j.href = x, j.onload = function() {
            window.$loadEventBus.emit(x);
          }, j.onerror = T, document.getElementsByTagName("head")[0].appendChild(j);
        }
      });
    }, _ = function() {
      return new Promise(function(x, $) {
        if (s.editorDependencies && s.editorDependenciesChecker && s.editorDependenciesChecker()) {
          x();
          return;
        }
        if (!s.editorDependencies && h()) {
          x();
          return;
        }
        var T = (s.editorDependencies || v).reduce(function(O, I) {
          var M = /^((https?:)?\/\/)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+\//.test(I);
          if (!M) {
            var A;
            I = (((A = s.config) == null ? void 0 : A.UEDITOR_HOME_URL) || "") + I;
          }
          return I.slice(-3) === ".js" ? O.jsLinks.push(I) : I.slice(-4) === ".css" && O.cssLinks.push(I), O;
        }, {
          jsLinks: [],
          cssLinks: []
        }), j = T.jsLinks, E = T.cssLinks;
        Promise.all([
          Promise.all(E.map(function(O) {
            return g(O);
          })),
          // 依次加载依赖的 JS 文件，JS 执行是有顺序要求的，比如 ueditor.all.js 就要晚于 ueditor.config.js 执行
          // 动态创建 script 是先加载完的先执行，所以不可以一次性创建所有资源的引入脚本
          asyncSeries(j.map(function(O) {
            return function() {
              return w(O);
            };
          }))
        ]).then(function() {
          return x();
        }).catch($);
      });
    }, y = function() {
      u = l.getContent(), a("update:modelValue", u);
    }, S = function() {
      l.addListener("contentChange", y);
    }, b = function() {
      l.document.getElementById("baidu_pastebin") || (u = l.getContent(), a("update:modelValue", u));
    }, P = function() {
      p = new MutationObserver(debounce(b, s.observerDebounceTime)), p.observe(l.body, s.observerOptions);
    }, C = function() {
      var x = s.editorId || "editor_" + randomString(8);
      m.value.id = x, a("before-init", x), l = window.UE.getEditor(x, s.config), l.addListener("ready", function() {
        c === d.READY ? l.setContent(s.modelValue) : (c = d.READY, a("ready", l), s.modelValue && l.setContent(s.modelValue)), s.mode === "observer" && window.MutationObserver ? P() : S();
      });
    };
    return watch(f, function(k) {
      c === d.UN_READY ? (c = d.PENDING, (s.forceInit || typeof window < "u") && _().then(function() {
        m.value ? C() : nextTick(function() {
          return C();
        });
      }).catch(function() {
        throw new Error("[vue-ueditor-wrap] UEditor 资源加载失败！请检查资源是否存在，UEDITOR_HOME_URL 是否配置正确！");
      })) : c === d.READY && (k === u || l.setContent(k || ""));
    }, {
      immediate: !0
    }), onDeactivated(function() {
      l && l.removeListener("contentChange", y), p && p.disconnect();
    }), onBeforeUnmount(function() {
      p && p.disconnect && p.disconnect(), s.destroy && l && l.destroy && l.destroy();
    }), function() {
      return createVNode("div", null, [createVNode("div", {
        ref: m,
        name: s.name
      }, null)]);
    };
  }
});
var VueUeditorWrap = withInstall(_VueUeditorWrap);
const VueUeditorWrap$1 = VueUeditorWrap;
var version = "3.0.8";
function install(i) {
  var s = [VueUeditorWrap$1];
  s.forEach(function(r) {
    r.install ? i.use(r) : r.name && i.component(r.name, r);
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
  setup(i, { emit: s }) {
    const r = ref(), a = i, d = s, c = ref(null), l = ref(null), p = computed({
      get() {
        return a.modelValue;
      },
      set(y) {
        d("update:modelValue", y);
      }
    });
    let u = null;
    const m = {};
    m[envConfig.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken(), m[envConfig.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get("siteId") || 0;
    const v = envConfig.VITE_APP_BASE_URL || "/adminapi/", h = v.endsWith("/") ? v : `${v}/`, f = ref({
      debug: !1,
      UEDITOR_HOME_URL: "/admin/ueditor/",
      UEDITOR_CORS_URL: location.origin + "/admin/ueditor/",
      serverUrl: `${h}sys/ueditor`,
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
            return c.value.showDialog = !0, !0;
          case "insertvideo":
            return l.value.showDialog = !0, !0;
        }
      }
    }), w = (y) => {
      y.addListener("blur", () => {
        const b = y.getContent();
        d("update:modelValue", b), d("handleBlur", b);
      }), y.addListener("fullscreenchanged", (b, P) => {
        const C = y.ui.getDom();
        P ? C.classList.add("edui-fullscreen") : C.classList.remove("edui-fullscreen"), console.log("全屏切换", P);
      });
      const S = y.getContentLength;
      y.getContentLength = function() {
        return y.getContent().replace(/[\s\u3000]+/g, "").length;
      };
    }, g = (y) => {
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
          ref: c,
          limit: "",
          onConfirm: g
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
          ref: r,
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
  _sfc_main$1 as g$,
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
  index$5 as gZ,
  index$3 as g_,
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
  getAreaByCode as h$,
  _sfc_main as h0,
  useElementIcon as h1,
  setWindowTitle as h2,
  setToken as h3,
  removeToken as h4,
  assetImg as h5,
  urlToRouteRaw as h6,
  moneyFormat as h7,
  getCurrentDataTime as h8,
  filterSpecial as h9,
  getDiyList as hA,
  getDiyPageInfo as hB,
  getPageLink as hC,
  getDiyFormInfo as hD,
  getDiyFormQrcode as hE,
  getRegisterType as hF,
  getMemberBenefitsContent as hG,
  getMemberAddress as hH,
  addMemberAddress as hI,
  editMemberAddress as hJ,
  getNoticeInfo as hK,
  pay as hL,
  getFriendsPay as hM,
  getPosterList as hN,
  getPosterInfo as hO,
  getPosterGenerate as hP,
  getPrinterList as hQ,
  printTicket as hR,
  getSiteAddons as hS,
  getSiteStatInfo as hT,
  getInfo as hU,
  getWebConfig as hV,
  getAuthMenu as hW,
  getEnv as hX,
  getAreatree as hY,
  getAddressInfo as hZ,
  getContraryAddress as h_,
  filterBlank as ha,
  distance as hb,
  getImageDimensions as hc,
  createCircle$1 as hd,
  createPolygon$1 as he,
  deleteGeometry$1 as hf,
  clearAllGeometry$1 as hg,
  setMapInstance$1 as hh,
  selectGeometry$1 as hi,
  deselectAllGeometry$1 as hj,
  createMarker$1 as hk,
  latLngToAddress$1 as hl,
  addressToLatLng$1 as hm,
  coreVueModules as hn,
  resolveAsyncComponent as ho,
  loadCoreVueModule as hp,
  loadCLodop as hq,
  getLodop as hr,
  login as hs,
  logout as ht,
  getAuthMenus as hu,
  getCloudBuildQueuePosition as hv,
  getCloudCompileLocalUrl as hw,
  setCloudCompileLocalUrl as hx,
  addDictData as hy,
  useDictionary as hz,
  img as i,
  getPayConfig as i0,
  setPayConfig as i1,
  getCronInfo as i2,
  getChannelType as i3,
  getSceneDomain as i4,
  clearSchemaCache as i5,
  getAppMange as i6,
  getWebsiteLayout as i7,
  checkJobStatus as i8,
  checkUsernameIsExist as i9,
  uploadVersion as ia,
  getIsTradeManaged as ib,
  index$9 as ic,
  index$8 as id,
  addonLoader as ie,
  index$6 as ig,
  index$4 as ih,
  index$2 as ii,
  index as ij,
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
