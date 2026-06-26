var V = Object.defineProperty;
var z = (n, r, s) => r in n ? V(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s;
var O = (n, r, s) => (z(n, typeof r != "symbol" ? r + "" : r, s), s);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { isRef, ref, unref, getCurrentScope, onScopeDispose, readonly, computed, getCurrentInstance, onMounted, nextTick, watch, onBeforeUpdate, watchEffect, shallowRef, defineComponent, markRaw, defineAsyncComponent, provide, openBlock, createBlock, resolveDynamicComponent, reactive, resolveComponent, createElementBlock, Fragment, createElementVNode, normalizeClass, normalizeStyle, createVNode, withModifiers, withCtx, toDisplayString, renderList, createCommentVNode, toRaw, resolveDirective, renderSlot, createTextVNode, withDirectives, onBeforeUnmount, toRef, onDeactivated } from "vue";
import axios$2 from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { createI18n } from "vue-i18n";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
var _a;
const isClient = typeof window < "u", isFunction = (n) => typeof n == "function", isString = (n) => typeof n == "string", noop = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) != null && _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(n) {
  return typeof n == "function" ? n() : unref(n);
}
function createFilterWrapper(n, r) {
  function s(...i) {
    return new Promise((a, u) => {
      Promise.resolve(n(() => r.apply(this, i), { fn: r, thisArg: this, args: i })).then(a).catch(u);
    });
  }
  return s;
}
const bypassFilter = (n) => n();
function pausableFilter(n = bypassFilter) {
  const r = ref(!0);
  function s() {
    r.value = !1;
  }
  function i() {
    r.value = !0;
  }
  const a = (...u) => {
    r.value && n(...u);
  };
  return { isActive: readonly(r), pause: s, resume: i, eventFilter: a };
}
function identity(n) {
  return n;
}
function tryOnScopeDispose(n) {
  return getCurrentScope() ? (onScopeDispose(n), !0) : !1;
}
function resolveRef(n) {
  return typeof n == "function" ? computed(n) : ref(n);
}
function tryOnMounted(n, r = !0) {
  getCurrentInstance() ? onMounted(n) : r ? n() : nextTick(n);
}
function useTimeoutFn(n, r, s = {}) {
  const {
    immediate: i = !0
  } = s, a = ref(!1);
  let u = null;
  function l() {
    u && (clearTimeout(u), u = null);
  }
  function c() {
    a.value = !1, l();
  }
  function p(...d) {
    l(), a.value = !0, u = setTimeout(() => {
      a.value = !1, u = null, n(...d);
    }, resolveUnref(r));
  }
  return i && (a.value = !0, isClient && p()), tryOnScopeDispose(c), {
    isPending: readonly(a),
    start: p,
    stop: c
  };
}
function useToggle(n = !1, r = {}) {
  const {
    truthyValue: s = !0,
    falsyValue: i = !1
  } = r, a = isRef(n), u = ref(n);
  function l(c) {
    if (arguments.length)
      return u.value = c, u.value;
    {
      const p = resolveUnref(s);
      return u.value = u.value === p ? resolveUnref(i) : p, u.value;
    }
  }
  return a ? l : [u, l];
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols, __hasOwnProp$6 = Object.prototype.hasOwnProperty, __propIsEnum$6 = Object.prototype.propertyIsEnumerable, __objRest$5 = (n, r) => {
  var s = {};
  for (var i in n)
    __hasOwnProp$6.call(n, i) && r.indexOf(i) < 0 && (s[i] = n[i]);
  if (n != null && __getOwnPropSymbols$6)
    for (var i of __getOwnPropSymbols$6(n))
      r.indexOf(i) < 0 && __propIsEnum$6.call(n, i) && (s[i] = n[i]);
  return s;
};
function watchWithFilter(n, r, s = {}) {
  const i = s, {
    eventFilter: a = bypassFilter
  } = i, u = __objRest$5(i, [
    "eventFilter"
  ]);
  return watch(n, createFilterWrapper(a, r), u);
}
var __defProp$2 = Object.defineProperty, __defProps$2 = Object.defineProperties, __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$2 = Object.getOwnPropertySymbols, __hasOwnProp$2 = Object.prototype.hasOwnProperty, __propIsEnum$2 = Object.prototype.propertyIsEnumerable, __defNormalProp$2 = (n, r, s) => r in n ? __defProp$2(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s, __spreadValues$2 = (n, r) => {
  for (var s in r || (r = {}))
    __hasOwnProp$2.call(r, s) && __defNormalProp$2(n, s, r[s]);
  if (__getOwnPropSymbols$2)
    for (var s of __getOwnPropSymbols$2(r))
      __propIsEnum$2.call(r, s) && __defNormalProp$2(n, s, r[s]);
  return n;
}, __spreadProps$2 = (n, r) => __defProps$2(n, __getOwnPropDescs$2(r)), __objRest$1$1 = (n, r) => {
  var s = {};
  for (var i in n)
    __hasOwnProp$2.call(n, i) && r.indexOf(i) < 0 && (s[i] = n[i]);
  if (n != null && __getOwnPropSymbols$2)
    for (var i of __getOwnPropSymbols$2(n))
      r.indexOf(i) < 0 && __propIsEnum$2.call(n, i) && (s[i] = n[i]);
  return s;
};
function watchPausable(n, r, s = {}) {
  const i = s, {
    eventFilter: a
  } = i, u = __objRest$1$1(i, [
    "eventFilter"
  ]), { eventFilter: l, pause: c, resume: p, isActive: d } = pausableFilter(a);
  return { stop: watchWithFilter(n, r, __spreadProps$2(__spreadValues$2({}, u), {
    eventFilter: l
  })), pause: c, resume: p, isActive: d };
}
function unrefElement(n) {
  var r;
  const s = resolveUnref(n);
  return (r = s == null ? void 0 : s.$el) != null ? r : s;
}
const defaultWindow = isClient ? window : void 0, defaultDocument = isClient ? window.document : void 0, defaultNavigator = isClient ? window.navigator : void 0;
function useEventListener(...n) {
  let r, s, i, a;
  if (isString(n[0]) || Array.isArray(n[0]) ? ([s, i, a] = n, r = defaultWindow) : [r, s, i, a] = n, !r)
    return noop;
  Array.isArray(s) || (s = [s]), Array.isArray(i) || (i = [i]);
  const u = [], l = () => {
    u.forEach((m) => m()), u.length = 0;
  }, c = (m, g, w) => (m.addEventListener(g, w, a), () => m.removeEventListener(g, w, a)), p = watch(() => unrefElement(r), (m) => {
    l(), m && u.push(...s.flatMap((g) => i.map((w) => c(m, g, w))));
  }, { immediate: !0, flush: "post" }), d = () => {
    p(), l();
  };
  return tryOnScopeDispose(d), d;
}
function useSupported(n, r = !1) {
  const s = ref(), i = () => s.value = Boolean(n());
  return i(), tryOnMounted(i, r), s;
}
function useMediaQuery(n, r = {}) {
  const { window: s = defaultWindow } = r, i = useSupported(() => s && "matchMedia" in s && typeof s.matchMedia == "function");
  let a;
  const u = ref(!1), l = () => {
    a && ("removeEventListener" in a ? a.removeEventListener("change", c) : a.removeListener(c));
  }, c = () => {
    i.value && (l(), a = s.matchMedia(resolveRef(n).value), u.value = a.matches, "addEventListener" in a ? a.addEventListener("change", c) : a.addListener(c));
  };
  return watchEffect(c), tryOnScopeDispose(() => l()), u;
}
function useClipboard(n = {}) {
  const {
    navigator: r = defaultNavigator,
    read: s = !1,
    source: i,
    copiedDuring: a = 1500,
    legacy: u = !1
  } = n, l = ["copy", "cut"], c = useSupported(() => r && "clipboard" in r), p = computed(() => c.value || u), d = ref(""), m = ref(!1), g = useTimeoutFn(() => m.value = !1, a);
  function w() {
    c.value ? r.clipboard.readText().then((h) => {
      d.value = h;
    }) : d.value = v();
  }
  if (p.value && s)
    for (const h of l)
      useEventListener(h, w);
  async function y(h = resolveUnref(i)) {
    p.value && h != null && (c.value ? await r.clipboard.writeText(h) : f(h), d.value = h, m.value = !0, g.start());
  }
  function f(h) {
    const _ = document.createElement("textarea");
    _.value = h ?? "", _.style.position = "absolute", _.style.opacity = "0", document.body.appendChild(_), _.select(), document.execCommand("copy"), _.remove();
  }
  function v() {
    var h, _, E;
    return (E = (_ = (h = document == null ? void 0 : document.getSelection) == null ? void 0 : h.call(document)) == null ? void 0 : _.toString()) != null ? E : "";
  }
  return {
    isSupported: p,
    text: d,
    copied: m,
    copy: y
  };
}
const _global = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(n, r) {
  return handlers[n] || r;
}
function guessSerializerType(n) {
  return n == null ? "any" : n instanceof Set ? "set" : n instanceof Map ? "map" : n instanceof Date ? "date" : typeof n == "boolean" ? "boolean" : typeof n == "string" ? "string" : typeof n == "object" ? "object" : Number.isNaN(n) ? "any" : "number";
}
var __defProp$j = Object.defineProperty, __getOwnPropSymbols$l = Object.getOwnPropertySymbols, __hasOwnProp$l = Object.prototype.hasOwnProperty, __propIsEnum$l = Object.prototype.propertyIsEnumerable, __defNormalProp$j = (n, r, s) => r in n ? __defProp$j(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s, __spreadValues$j = (n, r) => {
  for (var s in r || (r = {}))
    __hasOwnProp$l.call(r, s) && __defNormalProp$j(n, s, r[s]);
  if (__getOwnPropSymbols$l)
    for (var s of __getOwnPropSymbols$l(r))
      __propIsEnum$l.call(r, s) && __defNormalProp$j(n, s, r[s]);
  return n;
};
const StorageSerializers = {
  boolean: {
    read: (n) => n === "true",
    write: (n) => String(n)
  },
  object: {
    read: (n) => JSON.parse(n),
    write: (n) => JSON.stringify(n)
  },
  number: {
    read: (n) => Number.parseFloat(n),
    write: (n) => String(n)
  },
  any: {
    read: (n) => n,
    write: (n) => String(n)
  },
  string: {
    read: (n) => n,
    write: (n) => String(n)
  },
  map: {
    read: (n) => new Map(JSON.parse(n)),
    write: (n) => JSON.stringify(Array.from(n.entries()))
  },
  set: {
    read: (n) => new Set(JSON.parse(n)),
    write: (n) => JSON.stringify(Array.from(n))
  },
  date: {
    read: (n) => new Date(n),
    write: (n) => n.toISOString()
  }
};
function useStorage(n, r, s, i = {}) {
  var a;
  const {
    flush: u = "pre",
    deep: l = !0,
    listenToStorageChanges: c = !0,
    writeDefaults: p = !0,
    mergeDefaults: d = !1,
    shallow: m,
    window: g = defaultWindow,
    eventFilter: w,
    onError: y = (b) => {
      console.error(b);
    }
  } = i, f = (m ? shallowRef : ref)(r);
  if (!s)
    try {
      s = getSSRHandler("getDefaultStorage", () => {
        var b;
        return (b = defaultWindow) == null ? void 0 : b.localStorage;
      })();
    } catch (b) {
      y(b);
    }
  if (!s)
    return f;
  const v = resolveUnref(r), h = guessSerializerType(v), _ = (a = i.serializer) != null ? a : StorageSerializers[h], { pause: E, resume: $ } = watchPausable(f, () => x(f.value), { flush: u, deep: l, eventFilter: w });
  return g && c && useEventListener(g, "storage", k), k(), f;
  function x(b) {
    try {
      if (b == null)
        s.removeItem(n);
      else {
        const C = _.write(b), S = s.getItem(n);
        S !== C && (s.setItem(n, C), g && (g == null || g.dispatchEvent(new StorageEvent("storage", {
          key: n,
          oldValue: S,
          newValue: C,
          storageArea: s
        }))));
      }
    } catch (C) {
      y(C);
    }
  }
  function T(b) {
    const C = b ? b.newValue : s.getItem(n);
    if (C == null)
      return p && v !== null && s.setItem(n, _.write(v)), v;
    if (!b && d) {
      const S = _.read(C);
      return isFunction(d) ? d(S, v) : h === "object" && !Array.isArray(S) ? __spreadValues$j(__spreadValues$j({}, v), S) : S;
    } else
      return typeof C != "string" ? C : _.read(C);
  }
  function k(b) {
    if (!(b && b.storageArea !== s)) {
      if (b && b.key == null) {
        f.value = v;
        return;
      }
      if (!(b && b.key !== n)) {
        E();
        try {
          f.value = T(b);
        } catch (C) {
          y(C);
        } finally {
          b ? nextTick($) : $();
        }
      }
    }
  }
}
function usePreferredDark(n) {
  return useMediaQuery("(prefers-color-scheme: dark)", n);
}
var __defProp$i = Object.defineProperty, __getOwnPropSymbols$k = Object.getOwnPropertySymbols, __hasOwnProp$k = Object.prototype.hasOwnProperty, __propIsEnum$k = Object.prototype.propertyIsEnumerable, __defNormalProp$i = (n, r, s) => r in n ? __defProp$i(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s, __spreadValues$i = (n, r) => {
  for (var s in r || (r = {}))
    __hasOwnProp$k.call(r, s) && __defNormalProp$i(n, s, r[s]);
  if (__getOwnPropSymbols$k)
    for (var s of __getOwnPropSymbols$k(r))
      __propIsEnum$k.call(r, s) && __defNormalProp$i(n, s, r[s]);
  return n;
};
function useColorMode(n = {}) {
  const {
    selector: r = "html",
    attribute: s = "class",
    initialValue: i = "auto",
    window: a = defaultWindow,
    storage: u,
    storageKey: l = "vueuse-color-scheme",
    listenToStorageChanges: c = !0,
    storageRef: p,
    emitAuto: d
  } = n, m = __spreadValues$i({
    auto: "",
    light: "light",
    dark: "dark"
  }, n.modes || {}), g = usePreferredDark({ window: a }), w = computed(() => g.value ? "dark" : "light"), y = p || (l == null ? ref(i) : useStorage(l, i, u, { window: a, listenToStorageChanges: c })), f = computed({
    get() {
      return y.value === "auto" && !d ? w.value : y.value;
    },
    set(E) {
      y.value = E;
    }
  }), v = getSSRHandler("updateHTMLAttrs", (E, $, x) => {
    const T = a == null ? void 0 : a.document.querySelector(E);
    if (T)
      if ($ === "class") {
        const k = x.split(/\s/g);
        Object.values(m).flatMap((b) => (b || "").split(/\s/g)).filter(Boolean).forEach((b) => {
          k.includes(b) ? T.classList.add(b) : T.classList.remove(b);
        });
      } else
        T.setAttribute($, x);
  });
  function h(E) {
    var $;
    const x = E === "auto" ? w.value : E;
    v(r, s, ($ = m[x]) != null ? $ : x);
  }
  function _(E) {
    n.onChanged ? n.onChanged(E, h) : h(E);
  }
  return watch(f, _, { flush: "post", immediate: !0 }), d && watch(w, () => _(f.value), { flush: "post" }), tryOnMounted(() => _(f.value)), f;
}
function useCssVar(n, r, { window: s = defaultWindow, initialValue: i = "" } = {}) {
  const a = ref(i), u = computed(() => {
    var l;
    return unrefElement(r) || ((l = s == null ? void 0 : s.document) == null ? void 0 : l.documentElement);
  });
  return watch([u, () => resolveUnref(n)], ([l, c]) => {
    var p;
    if (l && s) {
      const d = (p = s.getComputedStyle(l).getPropertyValue(c)) == null ? void 0 : p.trim();
      a.value = d || i;
    }
  }, { immediate: !0 }), watch(a, (l) => {
    var c;
    (c = u.value) != null && c.style && u.value.style.setProperty(resolveUnref(n), l);
  }), a;
}
var __defProp$h = Object.defineProperty, __defProps$7 = Object.defineProperties, __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors, __getOwnPropSymbols$j = Object.getOwnPropertySymbols, __hasOwnProp$j = Object.prototype.hasOwnProperty, __propIsEnum$j = Object.prototype.propertyIsEnumerable, __defNormalProp$h = (n, r, s) => r in n ? __defProp$h(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s, __spreadValues$h = (n, r) => {
  for (var s in r || (r = {}))
    __hasOwnProp$j.call(r, s) && __defNormalProp$h(n, s, r[s]);
  if (__getOwnPropSymbols$j)
    for (var s of __getOwnPropSymbols$j(r))
      __propIsEnum$j.call(r, s) && __defNormalProp$h(n, s, r[s]);
  return n;
}, __spreadProps$7 = (n, r) => __defProps$7(n, __getOwnPropDescs$7(r));
function useDark(n = {}) {
  const {
    valueDark: r = "dark",
    valueLight: s = "",
    window: i = defaultWindow
  } = n, a = useColorMode(__spreadProps$7(__spreadValues$h({}, n), {
    onChanged: (c, p) => {
      var d;
      n.onChanged ? (d = n.onChanged) == null || d.call(n, c === "dark") : p(c);
    },
    modes: {
      dark: r,
      light: s
    }
  })), u = usePreferredDark({ window: i });
  return computed({
    get() {
      return a.value === "dark";
    },
    set(c) {
      c === u.value ? a.value = "auto" : a.value = c ? "dark" : "light";
    }
  });
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
function useFullscreen(n, r = {}) {
  const { document: s = defaultDocument, autoExit: i = !1 } = r, a = n || (s == null ? void 0 : s.querySelector("html")), u = ref(!1);
  let l = functionsMap[0];
  const c = useSupported(() => {
    if (s) {
      for (const v of functionsMap)
        if (v[1] in s)
          return l = v, !0;
    } else
      return !1;
    return !1;
  }), [p, d, m, , g] = l;
  async function w() {
    c.value && (s != null && s[m] && await s[d](), u.value = !1);
  }
  async function y() {
    if (!c.value)
      return;
    await w();
    const v = unrefElement(a);
    v && (await v[p](), u.value = !0);
  }
  async function f() {
    u.value ? await w() : await y();
  }
  return s && useEventListener(s, g, () => {
    u.value = !!(s != null && s[m]);
  }, !1), i && tryOnScopeDispose(w), {
    isSupported: c,
    isFullscreen: u,
    enter: y,
    exit: w,
    toggle: f
  };
}
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols, __hasOwnProp$7 = Object.prototype.hasOwnProperty, __propIsEnum$7 = Object.prototype.propertyIsEnumerable, __objRest$1 = (n, r) => {
  var s = {};
  for (var i in n)
    __hasOwnProp$7.call(n, i) && r.indexOf(i) < 0 && (s[i] = n[i]);
  if (n != null && __getOwnPropSymbols$7)
    for (var i of __getOwnPropSymbols$7(n))
      r.indexOf(i) < 0 && __propIsEnum$7.call(n, i) && (s[i] = n[i]);
  return s;
};
function useMutationObserver(n, r, s = {}) {
  const i = s, { window: a = defaultWindow } = i, u = __objRest$1(i, ["window"]);
  let l;
  const c = useSupported(() => a && "MutationObserver" in a), p = () => {
    l && (l.disconnect(), l = void 0);
  }, d = watch(() => unrefElement(n), (g) => {
    p(), c.value && a && g && (l = new MutationObserver(r), l.observe(g, u));
  }, { immediate: !0 }), m = () => {
    p(), d();
  };
  return tryOnScopeDispose(m), {
    isSupported: c,
    stop: m
  };
}
var SwipeDirection;
(function(n) {
  n.UP = "UP", n.RIGHT = "RIGHT", n.DOWN = "DOWN", n.LEFT = "LEFT", n.NONE = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function useTemplateRefsList() {
  const n = ref([]);
  return n.value.set = (r) => {
    r && n.value.push(r);
  }, onBeforeUpdate(() => {
    n.value.length = 0;
  }), n;
}
function useTitle(n = null, r = {}) {
  var s, i;
  const {
    document: a = defaultDocument
  } = r, u = resolveRef((s = n ?? (a == null ? void 0 : a.title)) != null ? s : null), l = n && isFunction(n);
  function c(p) {
    if (!("titleTemplate" in r))
      return p;
    const d = r.titleTemplate || "%s";
    return isFunction(d) ? d(p) : unref(d).replace(/%s/g, p);
  }
  return watch(u, (p, d) => {
    p !== d && a && (a.title = c(isString(p) ? p : ""));
  }, { immediate: !0 }), r.observe && !r.titleTemplate && a && !l && useMutationObserver((i = a.head) == null ? void 0 : i.querySelector("title"), () => {
    a && a.title !== u.value && (u.value = c(a.title));
  }, { childList: !0 }), u;
}
var __defProp = Object.defineProperty, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (n, r, s) => r in n ? __defProp(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s, __spreadValues = (n, r) => {
  for (var s in r || (r = {}))
    __hasOwnProp.call(r, s) && __defNormalProp(n, s, r[s]);
  if (__getOwnPropSymbols)
    for (var s of __getOwnPropSymbols(r))
      __propIsEnum.call(r, s) && __defNormalProp(n, s, r[s]);
  return n;
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
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var r = n.default;
  if (typeof r == "function") {
    var s = function i() {
      if (this instanceof i) {
        var a = [null];
        a.push.apply(a, arguments);
        var u = Function.bind.apply(r, a);
        return new u();
      }
      return r.apply(this, arguments);
    };
    s.prototype = r.prototype;
  } else
    s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(n).forEach(function(i) {
    var a = Object.getOwnPropertyDescriptor(n, i);
    Object.defineProperty(s, i, a.get ? a : {
      enumerable: !0,
      get: function() {
        return n[i];
      }
    });
  }), s;
}
var lib = {}, balancedMatch = function(n, r, s) {
  for (var i = 0, a = {}, u = 0; u < s.length; u++)
    if (n == s.substr(u, n.length))
      "start" in a || (a.start = u), i++;
    else if (r == s.substr(u, r.length) && "start" in a && (i--, !i))
      return a.end = u, a.pre = s.substr(0, a.start), a.body = a.end - a.start > 1 ? s.substring(a.start + n.length, a.end) : "", a.post = s.slice(a.end + r.length), a;
}, cloneExports = {}, clone$2 = {
  get exports() {
    return cloneExports;
  },
  set exports(n) {
    cloneExports = n;
  }
};
(function(n) {
  var r = function() {
    function s(p, d, m, g) {
      typeof d == "object" && (m = d.depth, g = d.prototype, d.filter, d = d.circular);
      var w = [], y = [], f = typeof Buffer < "u";
      typeof d > "u" && (d = !0), typeof m > "u" && (m = 1 / 0);
      function v(h, _) {
        if (h === null)
          return null;
        if (_ == 0)
          return h;
        var E, $;
        if (typeof h != "object")
          return h;
        if (s.__isArray(h))
          E = [];
        else if (s.__isRegExp(h))
          E = new RegExp(h.source, c(h)), h.lastIndex && (E.lastIndex = h.lastIndex);
        else if (s.__isDate(h))
          E = new Date(h.getTime());
        else {
          if (f && Buffer.isBuffer(h))
            return Buffer.allocUnsafe ? E = Buffer.allocUnsafe(h.length) : E = new Buffer(h.length), h.copy(E), E;
          typeof g > "u" ? ($ = Object.getPrototypeOf(h), E = Object.create($)) : (E = Object.create(g), $ = g);
        }
        if (d) {
          var x = w.indexOf(h);
          if (x != -1)
            return y[x];
          w.push(h), y.push(E);
        }
        for (var T in h) {
          var k;
          $ && (k = Object.getOwnPropertyDescriptor($, T)), !(k && k.set == null) && (E[T] = v(h[T], _ - 1));
        }
        return E;
      }
      return v(p, m);
    }
    s.clonePrototype = function(d) {
      if (d === null)
        return null;
      var m = function() {
      };
      return m.prototype = d, new m();
    };
    function i(p) {
      return Object.prototype.toString.call(p);
    }
    s.__objToStr = i;
    function a(p) {
      return typeof p == "object" && i(p) === "[object Date]";
    }
    s.__isDate = a;
    function u(p) {
      return typeof p == "object" && i(p) === "[object Array]";
    }
    s.__isArray = u;
    function l(p) {
      return typeof p == "object" && i(p) === "[object RegExp]";
    }
    s.__isRegExp = l;
    function c(p) {
      var d = "";
      return p.global && (d += "g"), p.ignoreCase && (d += "i"), p.multiline && (d += "m"), d;
    }
    return s.__getRegExpFlags = c, s;
  }();
  n.exports && (n.exports = r);
})(clone$2);
var conversionsExports = {}, conversions$2 = {
  get exports() {
    return conversionsExports;
  },
  set exports(n) {
    conversionsExports = n;
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
convert$4.rgb.hsl = function(n) {
  var r = n[0] / 255, s = n[1] / 255, i = n[2] / 255, a = Math.min(r, s, i), u = Math.max(r, s, i), l = u - a, c, p, d;
  return u === a ? c = 0 : r === u ? c = (s - i) / l : s === u ? c = 2 + (i - r) / l : i === u && (c = 4 + (r - s) / l), c = Math.min(c * 60, 360), c < 0 && (c += 360), d = (a + u) / 2, u === a ? p = 0 : d <= 0.5 ? p = l / (u + a) : p = l / (2 - u - a), [c, p * 100, d * 100];
};
convert$4.rgb.hsv = function(n) {
  var r, s, i, a, u, l = n[0] / 255, c = n[1] / 255, p = n[2] / 255, d = Math.max(l, c, p), m = d - Math.min(l, c, p), g = function(w) {
    return (d - w) / 6 / m + 1 / 2;
  };
  return m === 0 ? a = u = 0 : (u = m / d, r = g(l), s = g(c), i = g(p), l === d ? a = i - s : c === d ? a = 1 / 3 + r - i : p === d && (a = 2 / 3 + s - r), a < 0 ? a += 1 : a > 1 && (a -= 1)), [
    a * 360,
    u * 100,
    d * 100
  ];
};
convert$4.rgb.hwb = function(n) {
  var r = n[0], s = n[1], i = n[2], a = convert$4.rgb.hsl(n)[0], u = 1 / 255 * Math.min(r, Math.min(s, i));
  return i = 1 - 1 / 255 * Math.max(r, Math.max(s, i)), [a, u * 100, i * 100];
};
convert$4.rgb.cmyk = function(n) {
  var r = n[0] / 255, s = n[1] / 255, i = n[2] / 255, a, u, l, c;
  return c = Math.min(1 - r, 1 - s, 1 - i), a = (1 - r - c) / (1 - c) || 0, u = (1 - s - c) / (1 - c) || 0, l = (1 - i - c) / (1 - c) || 0, [a * 100, u * 100, l * 100, c * 100];
};
function comparativeDistance(n, r) {
  return Math.pow(n[0] - r[0], 2) + Math.pow(n[1] - r[1], 2) + Math.pow(n[2] - r[2], 2);
}
convert$4.rgb.keyword = function(n) {
  var r = reverseKeywords[n];
  if (r)
    return r;
  var s = 1 / 0, i;
  for (var a in cssKeywords)
    if (cssKeywords.hasOwnProperty(a)) {
      var u = cssKeywords[a], l = comparativeDistance(n, u);
      l < s && (s = l, i = a);
    }
  return i;
};
convert$4.keyword.rgb = function(n) {
  return cssKeywords[n];
};
convert$4.rgb.xyz = function(n) {
  var r = n[0] / 255, s = n[1] / 255, i = n[2] / 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92, s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92, i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92;
  var a = r * 0.4124 + s * 0.3576 + i * 0.1805, u = r * 0.2126 + s * 0.7152 + i * 0.0722, l = r * 0.0193 + s * 0.1192 + i * 0.9505;
  return [a * 100, u * 100, l * 100];
};
convert$4.rgb.lab = function(n) {
  var r = convert$4.rgb.xyz(n), s = r[0], i = r[1], a = r[2], u, l, c;
  return s /= 95.047, i /= 100, a /= 108.883, s = s > 8856e-6 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, i = i > 8856e-6 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, a = a > 8856e-6 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, u = 116 * i - 16, l = 500 * (s - i), c = 200 * (i - a), [u, l, c];
};
convert$4.hsl.rgb = function(n) {
  var r = n[0] / 360, s = n[1] / 100, i = n[2] / 100, a, u, l, c, p;
  if (s === 0)
    return p = i * 255, [p, p, p];
  i < 0.5 ? u = i * (1 + s) : u = i + s - i * s, a = 2 * i - u, c = [0, 0, 0];
  for (var d = 0; d < 3; d++)
    l = r + 1 / 3 * -(d - 1), l < 0 && l++, l > 1 && l--, 6 * l < 1 ? p = a + (u - a) * 6 * l : 2 * l < 1 ? p = u : 3 * l < 2 ? p = a + (u - a) * (2 / 3 - l) * 6 : p = a, c[d] = p * 255;
  return c;
};
convert$4.hsl.hsv = function(n) {
  var r = n[0], s = n[1] / 100, i = n[2] / 100, a = s, u = Math.max(i, 0.01), l, c;
  return i *= 2, s *= i <= 1 ? i : 2 - i, a *= u <= 1 ? u : 2 - u, c = (i + s) / 2, l = i === 0 ? 2 * a / (u + a) : 2 * s / (i + s), [r, l * 100, c * 100];
};
convert$4.hsv.rgb = function(n) {
  var r = n[0] / 60, s = n[1] / 100, i = n[2] / 100, a = Math.floor(r) % 6, u = r - Math.floor(r), l = 255 * i * (1 - s), c = 255 * i * (1 - s * u), p = 255 * i * (1 - s * (1 - u));
  switch (i *= 255, a) {
    case 0:
      return [i, p, l];
    case 1:
      return [c, i, l];
    case 2:
      return [l, i, p];
    case 3:
      return [l, c, i];
    case 4:
      return [p, l, i];
    case 5:
      return [i, l, c];
  }
};
convert$4.hsv.hsl = function(n) {
  var r = n[0], s = n[1] / 100, i = n[2] / 100, a = Math.max(i, 0.01), u, l, c;
  return c = (2 - s) * i, u = (2 - s) * a, l = s * a, l /= u <= 1 ? u : 2 - u, l = l || 0, c /= 2, [r, l * 100, c * 100];
};
convert$4.hwb.rgb = function(n) {
  var r = n[0] / 360, s = n[1] / 100, i = n[2] / 100, a = s + i, u, l, c, p;
  a > 1 && (s /= a, i /= a), u = Math.floor(6 * r), l = 1 - i, c = 6 * r - u, u & 1 && (c = 1 - c), p = s + c * (l - s);
  var d, m, g;
  switch (u) {
    default:
    case 6:
    case 0:
      d = l, m = p, g = s;
      break;
    case 1:
      d = p, m = l, g = s;
      break;
    case 2:
      d = s, m = l, g = p;
      break;
    case 3:
      d = s, m = p, g = l;
      break;
    case 4:
      d = p, m = s, g = l;
      break;
    case 5:
      d = l, m = s, g = p;
      break;
  }
  return [d * 255, m * 255, g * 255];
};
convert$4.cmyk.rgb = function(n) {
  var r = n[0] / 100, s = n[1] / 100, i = n[2] / 100, a = n[3] / 100, u, l, c;
  return u = 1 - Math.min(1, r * (1 - a) + a), l = 1 - Math.min(1, s * (1 - a) + a), c = 1 - Math.min(1, i * (1 - a) + a), [u * 255, l * 255, c * 255];
};
convert$4.xyz.rgb = function(n) {
  var r = n[0] / 100, s = n[1] / 100, i = n[2] / 100, a, u, l;
  return a = r * 3.2406 + s * -1.5372 + i * -0.4986, u = r * -0.9689 + s * 1.8758 + i * 0.0415, l = r * 0.0557 + s * -0.204 + i * 1.057, a = a > 31308e-7 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : a * 12.92, u = u > 31308e-7 ? 1.055 * Math.pow(u, 1 / 2.4) - 0.055 : u * 12.92, l = l > 31308e-7 ? 1.055 * Math.pow(l, 1 / 2.4) - 0.055 : l * 12.92, a = Math.min(Math.max(0, a), 1), u = Math.min(Math.max(0, u), 1), l = Math.min(Math.max(0, l), 1), [a * 255, u * 255, l * 255];
};
convert$4.xyz.lab = function(n) {
  var r = n[0], s = n[1], i = n[2], a, u, l;
  return r /= 95.047, s /= 100, i /= 108.883, r = r > 8856e-6 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, s = s > 8856e-6 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, i = i > 8856e-6 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, a = 116 * s - 16, u = 500 * (r - s), l = 200 * (s - i), [a, u, l];
};
convert$4.lab.xyz = function(n) {
  var r = n[0], s = n[1], i = n[2], a, u, l;
  u = (r + 16) / 116, a = s / 500 + u, l = u - i / 200;
  var c = Math.pow(u, 3), p = Math.pow(a, 3), d = Math.pow(l, 3);
  return u = c > 8856e-6 ? c : (u - 16 / 116) / 7.787, a = p > 8856e-6 ? p : (a - 16 / 116) / 7.787, l = d > 8856e-6 ? d : (l - 16 / 116) / 7.787, a *= 95.047, u *= 100, l *= 108.883, [a, u, l];
};
convert$4.lab.lch = function(n) {
  var r = n[0], s = n[1], i = n[2], a, u, l;
  return a = Math.atan2(i, s), u = a * 360 / 2 / Math.PI, u < 0 && (u += 360), l = Math.sqrt(s * s + i * i), [r, l, u];
};
convert$4.lch.lab = function(n) {
  var r = n[0], s = n[1], i = n[2], a, u, l;
  return l = i / 360 * 2 * Math.PI, a = s * Math.cos(l), u = s * Math.sin(l), [r, a, u];
};
convert$4.rgb.ansi16 = function(n) {
  var r = n[0], s = n[1], i = n[2], a = 1 in arguments ? arguments[1] : convert$4.rgb.hsv(n)[2];
  if (a = Math.round(a / 50), a === 0)
    return 30;
  var u = 30 + (Math.round(i / 255) << 2 | Math.round(s / 255) << 1 | Math.round(r / 255));
  return a === 2 && (u += 60), u;
};
convert$4.hsv.ansi16 = function(n) {
  return convert$4.rgb.ansi16(convert$4.hsv.rgb(n), n[2]);
};
convert$4.rgb.ansi256 = function(n) {
  var r = n[0], s = n[1], i = n[2];
  if (r === s && s === i)
    return r < 8 ? 16 : r > 248 ? 231 : Math.round((r - 8) / 247 * 24) + 232;
  var a = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(s / 255 * 5) + Math.round(i / 255 * 5);
  return a;
};
convert$4.ansi16.rgb = function(n) {
  var r = n % 10;
  if (r === 0 || r === 7)
    return n > 50 && (r += 3.5), r = r / 10.5 * 255, [r, r, r];
  var s = (~~(n > 50) + 1) * 0.5, i = (r & 1) * s * 255, a = (r >> 1 & 1) * s * 255, u = (r >> 2 & 1) * s * 255;
  return [i, a, u];
};
convert$4.ansi256.rgb = function(n) {
  if (n >= 232) {
    var r = (n - 232) * 10 + 8;
    return [r, r, r];
  }
  n -= 16;
  var s, i = Math.floor(n / 36) / 5 * 255, a = Math.floor((s = n % 36) / 6) / 5 * 255, u = s % 6 / 5 * 255;
  return [i, a, u];
};
convert$4.rgb.hex = function(n) {
  var r = ((Math.round(n[0]) & 255) << 16) + ((Math.round(n[1]) & 255) << 8) + (Math.round(n[2]) & 255), s = r.toString(16).toUpperCase();
  return "000000".substring(s.length) + s;
};
convert$4.hex.rgb = function(n) {
  var r = n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!r)
    return [0, 0, 0];
  var s = r[0];
  r[0].length === 3 && (s = s.split("").map(function(c) {
    return c + c;
  }).join(""));
  var i = parseInt(s, 16), a = i >> 16 & 255, u = i >> 8 & 255, l = i & 255;
  return [a, u, l];
};
convert$4.rgb.hcg = function(n) {
  var r = n[0] / 255, s = n[1] / 255, i = n[2] / 255, a = Math.max(Math.max(r, s), i), u = Math.min(Math.min(r, s), i), l = a - u, c, p;
  return l < 1 ? c = u / (1 - l) : c = 0, l <= 0 ? p = 0 : a === r ? p = (s - i) / l % 6 : a === s ? p = 2 + (i - r) / l : p = 4 + (r - s) / l + 4, p /= 6, p %= 1, [p * 360, l * 100, c * 100];
};
convert$4.hsl.hcg = function(n) {
  var r = n[1] / 100, s = n[2] / 100, i = 1, a = 0;
  return s < 0.5 ? i = 2 * r * s : i = 2 * r * (1 - s), i < 1 && (a = (s - 0.5 * i) / (1 - i)), [n[0], i * 100, a * 100];
};
convert$4.hsv.hcg = function(n) {
  var r = n[1] / 100, s = n[2] / 100, i = r * s, a = 0;
  return i < 1 && (a = (s - i) / (1 - i)), [n[0], i * 100, a * 100];
};
convert$4.hcg.rgb = function(n) {
  var r = n[0] / 360, s = n[1] / 100, i = n[2] / 100;
  if (s === 0)
    return [i * 255, i * 255, i * 255];
  var a = [0, 0, 0], u = r % 1 * 6, l = u % 1, c = 1 - l, p = 0;
  switch (Math.floor(u)) {
    case 0:
      a[0] = 1, a[1] = l, a[2] = 0;
      break;
    case 1:
      a[0] = c, a[1] = 1, a[2] = 0;
      break;
    case 2:
      a[0] = 0, a[1] = 1, a[2] = l;
      break;
    case 3:
      a[0] = 0, a[1] = c, a[2] = 1;
      break;
    case 4:
      a[0] = l, a[1] = 0, a[2] = 1;
      break;
    default:
      a[0] = 1, a[1] = 0, a[2] = c;
  }
  return p = (1 - s) * i, [
    (s * a[0] + p) * 255,
    (s * a[1] + p) * 255,
    (s * a[2] + p) * 255
  ];
};
convert$4.hcg.hsv = function(n) {
  var r = n[1] / 100, s = n[2] / 100, i = r + s * (1 - r), a = 0;
  return i > 0 && (a = r / i), [n[0], a * 100, i * 100];
};
convert$4.hcg.hsl = function(n) {
  var r = n[1] / 100, s = n[2] / 100, i = s * (1 - r) + 0.5 * r, a = 0;
  return i > 0 && i < 0.5 ? a = r / (2 * i) : i >= 0.5 && i < 1 && (a = r / (2 * (1 - i))), [n[0], a * 100, i * 100];
};
convert$4.hcg.hwb = function(n) {
  var r = n[1] / 100, s = n[2] / 100, i = r + s * (1 - r);
  return [n[0], (i - r) * 100, (1 - i) * 100];
};
convert$4.hwb.hcg = function(n) {
  var r = n[1] / 100, s = n[2] / 100, i = 1 - s, a = i - r, u = 0;
  return a < 1 && (u = (i - a) / (1 - a)), [n[0], a * 100, u * 100];
};
convert$4.apple.rgb = function(n) {
  return [n[0] / 65535 * 255, n[1] / 65535 * 255, n[2] / 65535 * 255];
};
convert$4.rgb.apple = function(n) {
  return [n[0] / 255 * 65535, n[1] / 255 * 65535, n[2] / 255 * 65535];
};
convert$4.gray.rgb = function(n) {
  return [n[0] / 100 * 255, n[0] / 100 * 255, n[0] / 100 * 255];
};
convert$4.gray.hsl = convert$4.gray.hsv = function(n) {
  return [0, 0, n[0]];
};
convert$4.gray.hwb = function(n) {
  return [0, 100, n[0]];
};
convert$4.gray.cmyk = function(n) {
  return [0, 0, 0, n[0]];
};
convert$4.gray.lab = function(n) {
  return [n[0], 0, 0];
};
convert$4.gray.hex = function(n) {
  var r = Math.round(n[0] / 100 * 255) & 255, s = (r << 16) + (r << 8) + r, i = s.toString(16).toUpperCase();
  return "000000".substring(i.length) + i;
};
convert$4.rgb.gray = function(n) {
  var r = (n[0] + n[1] + n[2]) / 3;
  return [r / 255 * 100];
};
var conversions$1 = conversionsExports;
function buildGraph() {
  for (var n = {}, r = Object.keys(conversions$1), s = r.length, i = 0; i < s; i++)
    n[r[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return n;
}
function deriveBFS(n) {
  var r = buildGraph(), s = [n];
  for (r[n].distance = 0; s.length; )
    for (var i = s.pop(), a = Object.keys(conversions$1[i]), u = a.length, l = 0; l < u; l++) {
      var c = a[l], p = r[c];
      p.distance === -1 && (p.distance = r[i].distance + 1, p.parent = i, s.unshift(c));
    }
  return r;
}
function link(n, r) {
  return function(s) {
    return r(n(s));
  };
}
function wrapConversion(n, r) {
  for (var s = [r[n].parent, n], i = conversions$1[r[n].parent][n], a = r[n].parent; r[a].parent; )
    s.unshift(r[a].parent), i = link(conversions$1[r[a].parent][a], i), a = r[a].parent;
  return i.conversion = s, i;
}
var route$1 = function(n) {
  for (var r = deriveBFS(n), s = {}, i = Object.keys(r), a = i.length, u = 0; u < a; u++) {
    var l = i[u], c = r[l];
    c.parent !== null && (s[l] = wrapConversion(l, r));
  }
  return s;
}, conversions = conversionsExports, route = route$1, convert$3 = {}, models = Object.keys(conversions);
function wrapRaw(n) {
  var r = function(s) {
    return s == null ? s : (arguments.length > 1 && (s = Array.prototype.slice.call(arguments)), n(s));
  };
  return "conversion" in n && (r.conversion = n.conversion), r;
}
function wrapRounded(n) {
  var r = function(s) {
    if (s == null)
      return s;
    arguments.length > 1 && (s = Array.prototype.slice.call(arguments));
    var i = n(s);
    if (typeof i == "object")
      for (var a = i.length, u = 0; u < a; u++)
        i[u] = Math.round(i[u]);
    return i;
  };
  return "conversion" in n && (r.conversion = n.conversion), r;
}
models.forEach(function(n) {
  convert$3[n] = {}, Object.defineProperty(convert$3[n], "channels", { value: conversions[n].channels }), Object.defineProperty(convert$3[n], "labels", { value: conversions[n].labels });
  var r = route(n), s = Object.keys(r);
  s.forEach(function(i) {
    var a = r[i];
    convert$3[n][i] = wrapRounded(a), convert$3[n][i].raw = wrapRaw(a);
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
function getRgba(n) {
  if (n) {
    var r = /^#([a-fA-F0-9]{3})$/, s = /^#([a-fA-F0-9]{6})$/, i = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, a = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, u = /(\D+)/, l = [0, 0, 0], c = 1, p = n.match(r);
    if (p) {
      p = p[1];
      for (var d = 0; d < l.length; d++)
        l[d] = parseInt(p[d] + p[d], 16);
    } else if (p = n.match(s)) {
      p = p[1];
      for (var d = 0; d < l.length; d++)
        l[d] = parseInt(p.slice(d * 2, d * 2 + 2), 16);
    } else if (p = n.match(i)) {
      for (var d = 0; d < l.length; d++)
        l[d] = parseInt(p[d + 1]);
      c = parseFloat(p[4]);
    } else if (p = n.match(a)) {
      for (var d = 0; d < l.length; d++)
        l[d] = Math.round(parseFloat(p[d + 1]) * 2.55);
      c = parseFloat(p[4]);
    } else if (p = n.match(u)) {
      if (p[1] == "transparent")
        return [0, 0, 0, 0];
      if (l = colorNames[p[1]], !l)
        return;
    }
    for (var d = 0; d < l.length; d++)
      l[d] = scale(l[d], 0, 255);
    return !c && c != 0 ? c = 1 : c = scale(c, 0, 1), l[3] = c, l;
  }
}
function getHsla(n) {
  if (n) {
    var r = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/, s = n.match(r);
    if (s) {
      var i = parseFloat(s[4]), a = scale(parseInt(s[1]), 0, 360), u = scale(parseFloat(s[2]), 0, 100), l = scale(parseFloat(s[3]), 0, 100), c = scale(isNaN(i) ? 1 : i, 0, 1);
      return [a, u, l, c];
    }
  }
}
function getHwb(n) {
  if (n) {
    var r = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/, s = n.match(r);
    if (s) {
      var i = parseFloat(s[4]), a = scale(parseInt(s[1]), 0, 360), u = scale(parseFloat(s[2]), 0, 100), l = scale(parseFloat(s[3]), 0, 100), c = scale(isNaN(i) ? 1 : i, 0, 1);
      return [a, u, l, c];
    }
  }
}
function getRgb(n) {
  var r = getRgba(n);
  return r && r.slice(0, 3);
}
function getHsl(n) {
  var r = getHsla(n);
  return r && r.slice(0, 3);
}
function getAlpha(n) {
  var r = getRgba(n);
  if (r)
    return r[3];
  if (r = getHsla(n))
    return r[3];
  if (r = getHwb(n))
    return r[3];
}
function hexString(n) {
  return "#" + hexDouble(n[0]) + hexDouble(n[1]) + hexDouble(n[2]);
}
function rgbString(n, r) {
  return r < 1 || n[3] && n[3] < 1 ? rgbaString(n, r) : "rgb(" + n[0] + ", " + n[1] + ", " + n[2] + ")";
}
function rgbaString(n, r) {
  return r === void 0 && (r = n[3] !== void 0 ? n[3] : 1), "rgba(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + r + ")";
}
function percentString(n, r) {
  if (r < 1 || n[3] && n[3] < 1)
    return percentaString(n, r);
  var s = Math.round(n[0] / 255 * 100), i = Math.round(n[1] / 255 * 100), a = Math.round(n[2] / 255 * 100);
  return "rgb(" + s + "%, " + i + "%, " + a + "%)";
}
function percentaString(n, r) {
  var s = Math.round(n[0] / 255 * 100), i = Math.round(n[1] / 255 * 100), a = Math.round(n[2] / 255 * 100);
  return "rgba(" + s + "%, " + i + "%, " + a + "%, " + (r || n[3] || 1) + ")";
}
function hslString(n, r) {
  return r < 1 || n[3] && n[3] < 1 ? hslaString(n, r) : "hsl(" + n[0] + ", " + n[1] + "%, " + n[2] + "%)";
}
function hslaString(n, r) {
  return r === void 0 && (r = n[3] !== void 0 ? n[3] : 1), "hsla(" + n[0] + ", " + n[1] + "%, " + n[2] + "%, " + r + ")";
}
function hwbString(n, r) {
  return r === void 0 && (r = n[3] !== void 0 ? n[3] : 1), "hwb(" + n[0] + ", " + n[1] + "%, " + n[2] + "%" + (r !== void 0 && r !== 1 ? ", " + r : "") + ")";
}
function keyword(n) {
  return reverseNames[n.slice(0, 3)];
}
function scale(n, r, s) {
  return Math.min(Math.max(r, n), s);
}
function hexDouble(n) {
  var r = n.toString(16).toUpperCase();
  return r.length < 2 ? "0" + r : r;
}
var reverseNames = {};
for (var name in colorNames)
  reverseNames[colorNames[name]] = name;
var clone$1 = cloneExports, convert$2 = colorConvert, string = colorString, Color$1 = function(n) {
  if (n instanceof Color$1)
    return n;
  if (!(this instanceof Color$1))
    return new Color$1(n);
  this.values = {
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
    hsv: [0, 0, 0],
    hwb: [0, 0, 0],
    cmyk: [0, 0, 0, 0],
    alpha: 1
  };
  var r;
  if (typeof n == "string")
    if (r = string.getRgba(n), r)
      this.setValues("rgb", r);
    else if (r = string.getHsla(n))
      this.setValues("hsl", r);
    else if (r = string.getHwb(n))
      this.setValues("hwb", r);
    else
      throw new Error('Unable to parse color from string "' + n + '"');
  else if (typeof n == "object")
    if (r = n, r.r !== void 0 || r.red !== void 0)
      this.setValues("rgb", r);
    else if (r.l !== void 0 || r.lightness !== void 0)
      this.setValues("hsl", r);
    else if (r.v !== void 0 || r.value !== void 0)
      this.setValues("hsv", r);
    else if (r.w !== void 0 || r.whiteness !== void 0)
      this.setValues("hwb", r);
    else if (r.c !== void 0 || r.cyan !== void 0)
      this.setValues("cmyk", r);
    else
      throw new Error("Unable to parse color from object " + JSON.stringify(n));
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
    var n = this.values.rgb;
    return n.concat([this.values.alpha]);
  },
  rgbaArrayNormalized: function() {
    for (var n = this.values.rgb, r = [], s = 0; s < 3; s++)
      r[s] = n[s] / 255;
    return r.push(this.values.alpha), r;
  },
  hslaArray: function() {
    var n = this.values.hsl;
    return n.concat([this.values.alpha]);
  },
  alpha: function(n) {
    return n === void 0 ? this.values.alpha : (this.setValues("alpha", n), this);
  },
  red: function(n) {
    return this.setChannel("rgb", 0, n);
  },
  green: function(n) {
    return this.setChannel("rgb", 1, n);
  },
  blue: function(n) {
    return this.setChannel("rgb", 2, n);
  },
  hue: function(n) {
    return n && (n %= 360, n = n < 0 ? 360 + n : n), this.setChannel("hsl", 0, n);
  },
  saturation: function(n) {
    return this.setChannel("hsl", 1, n);
  },
  lightness: function(n) {
    return this.setChannel("hsl", 2, n);
  },
  saturationv: function(n) {
    return this.setChannel("hsv", 1, n);
  },
  whiteness: function(n) {
    return this.setChannel("hwb", 1, n);
  },
  blackness: function(n) {
    return this.setChannel("hwb", 2, n);
  },
  value: function(n) {
    return this.setChannel("hsv", 2, n);
  },
  cyan: function(n) {
    return this.setChannel("cmyk", 0, n);
  },
  magenta: function(n) {
    return this.setChannel("cmyk", 1, n);
  },
  yellow: function(n) {
    return this.setChannel("cmyk", 2, n);
  },
  black: function(n) {
    return this.setChannel("cmyk", 3, n);
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
    for (var n = this.values.rgb, r = [], s = 0; s < n.length; s++) {
      var i = n[s] / 255;
      r[s] = i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2];
  },
  contrast: function(n) {
    var r = this.luminosity(), s = n.luminosity();
    return r > s ? (r + 0.05) / (s + 0.05) : (s + 0.05) / (r + 0.05);
  },
  level: function(n) {
    var r = this.contrast(n);
    return r >= 7.1 ? "AAA" : r >= 4.5 ? "AA" : "";
  },
  dark: function() {
    var n = this.values.rgb, r = (n[0] * 299 + n[1] * 587 + n[2] * 114) / 1e3;
    return r < 128;
  },
  light: function() {
    return !this.dark();
  },
  negate: function() {
    for (var n = [], r = 0; r < 3; r++)
      n[r] = 255 - this.values.rgb[r];
    return this.setValues("rgb", n), this;
  },
  lighten: function(n) {
    return this.values.hsl[2] += this.values.hsl[2] * n, this.setValues("hsl", this.values.hsl), this;
  },
  darken: function(n) {
    return this.values.hsl[2] -= this.values.hsl[2] * n, this.setValues("hsl", this.values.hsl), this;
  },
  saturate: function(n) {
    return this.values.hsl[1] += this.values.hsl[1] * n, this.setValues("hsl", this.values.hsl), this;
  },
  desaturate: function(n) {
    return this.values.hsl[1] -= this.values.hsl[1] * n, this.setValues("hsl", this.values.hsl), this;
  },
  whiten: function(n) {
    return this.values.hwb[1] += this.values.hwb[1] * n, this.setValues("hwb", this.values.hwb), this;
  },
  blacken: function(n) {
    return this.values.hwb[2] += this.values.hwb[2] * n, this.setValues("hwb", this.values.hwb), this;
  },
  greyscale: function() {
    var n = this.values.rgb, r = n[0] * 0.3 + n[1] * 0.59 + n[2] * 0.11;
    return this.setValues("rgb", [r, r, r]), this;
  },
  clearer: function(n) {
    return this.setValues("alpha", this.values.alpha - this.values.alpha * n), this;
  },
  opaquer: function(n) {
    return this.setValues("alpha", this.values.alpha + this.values.alpha * n), this;
  },
  rotate: function(n) {
    var r = this.values.hsl[0];
    return r = (r + n) % 360, r = r < 0 ? 360 + r : r, this.values.hsl[0] = r, this.setValues("hsl", this.values.hsl), this;
  },
  /**
   * Ported from sass implementation in C
   * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
   */
  mix: function(n, r) {
    var s = this, i = n, a = r === void 0 ? 0.5 : r, u = 2 * a - 1, l = s.alpha() - i.alpha(), c = ((u * l === -1 ? u : (u + l) / (1 + u * l)) + 1) / 2, p = 1 - c;
    return this.rgb(
      c * s.red() + p * i.red(),
      c * s.green() + p * i.green(),
      c * s.blue() + p * i.blue()
    ).alpha(s.alpha() * a + i.alpha() * (1 - a));
  },
  toJSON: function() {
    return this.rgb();
  },
  clone: function() {
    var n = new Color$1();
    return n.values = clone$1(this.values), n;
  }
};
Color$1.prototype.getValues = function(n) {
  for (var r = {}, s = 0; s < n.length; s++)
    r[n.charAt(s)] = this.values[n][s];
  return this.values.alpha !== 1 && (r.a = this.values.alpha), r;
};
Color$1.prototype.setValues = function(n, r) {
  var s = {
    rgb: ["red", "green", "blue"],
    hsl: ["hue", "saturation", "lightness"],
    hsv: ["hue", "saturation", "value"],
    hwb: ["hue", "whiteness", "blackness"],
    cmyk: ["cyan", "magenta", "yellow", "black"]
  }, i = {
    rgb: [255, 255, 255],
    hsl: [360, 100, 100],
    hsv: [360, 100, 100],
    hwb: [360, 100, 100],
    cmyk: [100, 100, 100, 100]
  }, a, u = 1;
  if (n === "alpha")
    u = r;
  else if (r.length)
    this.values[n] = r.slice(0, n.length), u = r[n.length];
  else if (r[n.charAt(0)] !== void 0) {
    for (a = 0; a < n.length; a++)
      this.values[n][a] = r[n.charAt(a)];
    u = r.a;
  } else if (r[s[n][0]] !== void 0) {
    var l = s[n];
    for (a = 0; a < n.length; a++)
      this.values[n][a] = r[l[a]];
    u = r.alpha;
  }
  if (this.values.alpha = Math.max(0, Math.min(1, u === void 0 ? this.values.alpha : u)), n === "alpha")
    return !1;
  var c;
  for (a = 0; a < n.length; a++)
    c = Math.max(0, Math.min(i[n][a], this.values[n][a])), this.values[n][a] = Math.round(c);
  for (var p in s)
    for (p !== n && (this.values[p] = convert$2[n][p](this.values[n])), a = 0; a < p.length; a++)
      c = Math.max(0, Math.min(i[p][a], this.values[p][a])), this.values[p][a] = Math.round(c);
  return !0;
};
Color$1.prototype.setSpace = function(n, r) {
  var s = r[0];
  return s === void 0 ? this.getValues(n) : (typeof s == "number" && (s = Array.prototype.slice.call(r)), this.setValues(n, s), this);
};
Color$1.prototype.setChannel = function(n, r, s) {
  return s === void 0 ? this.values[n][r] : s === this.values[n][r] ? this : (this.values[n][r] = s, this.setValues(n, this.values[n]), this);
};
var color = Color$1, browserExports = {}, browser = {
  get exports() {
    return browserExports;
  },
  set exports(n) {
    browserExports = n;
  }
}, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var n = 1e3, r = n * 60, s = r * 60, i = s * 24, a = i * 7, u = i * 365.25;
  ms = function(m, g) {
    g = g || {};
    var w = typeof m;
    if (w === "string" && m.length > 0)
      return l(m);
    if (w === "number" && isFinite(m))
      return g.long ? p(m) : c(m);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(m)
    );
  };
  function l(m) {
    if (m = String(m), !(m.length > 100)) {
      var g = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        m
      );
      if (g) {
        var w = parseFloat(g[1]), y = (g[2] || "ms").toLowerCase();
        switch (y) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return w * u;
          case "weeks":
          case "week":
          case "w":
            return w * a;
          case "days":
          case "day":
          case "d":
            return w * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return w * s;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return w * r;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return w * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return w;
          default:
            return;
        }
      }
    }
  }
  function c(m) {
    var g = Math.abs(m);
    return g >= i ? Math.round(m / i) + "d" : g >= s ? Math.round(m / s) + "h" : g >= r ? Math.round(m / r) + "m" : g >= n ? Math.round(m / n) + "s" : m + "ms";
  }
  function p(m) {
    var g = Math.abs(m);
    return g >= i ? d(m, g, i, "day") : g >= s ? d(m, g, s, "hour") : g >= r ? d(m, g, r, "minute") : g >= n ? d(m, g, n, "second") : m + " ms";
  }
  function d(m, g, w, y) {
    var f = g >= w * 1.5;
    return Math.round(m / w) + " " + y + (f ? "s" : "");
  }
  return ms;
}
function setup(n) {
  s.debug = s, s.default = s, s.coerce = p, s.disable = l, s.enable = u, s.enabled = c, s.humanize = requireMs(), Object.keys(n).forEach(function(d) {
    s[d] = n[d];
  }), s.instances = [], s.names = [], s.skips = [], s.formatters = {};
  function r(d) {
    for (var m = 0, g = 0; g < d.length; g++)
      m = (m << 5) - m + d.charCodeAt(g), m |= 0;
    return s.colors[Math.abs(m) % s.colors.length];
  }
  s.selectColor = r;
  function s(d) {
    var m;
    function g() {
      if (g.enabled) {
        for (var w = arguments.length, y = new Array(w), f = 0; f < w; f++)
          y[f] = arguments[f];
        var v = g, h = Number(new Date()), _ = h - (m || h);
        v.diff = _, v.prev = m, v.curr = h, m = h, y[0] = s.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
        var E = 0;
        y[0] = y[0].replace(/%([a-zA-Z%])/g, function(x, T) {
          if (x === "%%")
            return x;
          E++;
          var k = s.formatters[T];
          if (typeof k == "function") {
            var b = y[E];
            x = k.call(v, b), y.splice(E, 1), E--;
          }
          return x;
        }), s.formatArgs.call(v, y);
        var $ = v.log || s.log;
        $.apply(v, y);
      }
    }
    return g.namespace = d, g.enabled = s.enabled(d), g.useColors = s.useColors(), g.color = r(d), g.destroy = i, g.extend = a, typeof s.init == "function" && s.init(g), s.instances.push(g), g;
  }
  function i() {
    var d = s.instances.indexOf(this);
    return d !== -1 ? (s.instances.splice(d, 1), !0) : !1;
  }
  function a(d, m) {
    return s(this.namespace + (typeof m > "u" ? ":" : m) + d);
  }
  function u(d) {
    s.save(d), s.names = [], s.skips = [];
    var m, g = (typeof d == "string" ? d : "").split(/[\s,]+/), w = g.length;
    for (m = 0; m < w; m++)
      g[m] && (d = g[m].replace(/\*/g, ".*?"), d[0] === "-" ? s.skips.push(new RegExp("^" + d.substr(1) + "$")) : s.names.push(new RegExp("^" + d + "$")));
    for (m = 0; m < s.instances.length; m++) {
      var y = s.instances[m];
      y.enabled = s.enabled(y.namespace);
    }
  }
  function l() {
    s.enable("");
  }
  function c(d) {
    if (d[d.length - 1] === "*")
      return !0;
    var m, g;
    for (m = 0, g = s.skips.length; m < g; m++)
      if (s.skips[m].test(d))
        return !1;
    for (m = 0, g = s.names.length; m < g; m++)
      if (s.names[m].test(d))
        return !0;
    return !1;
  }
  function p(d) {
    return d instanceof Error ? d.stack || d.message : d;
  }
  return s.enable(s.load()), s;
}
var common = setup;
(function(n, r) {
  function s(m) {
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? s = function(w) {
      return typeof w;
    } : s = function(w) {
      return w && typeof Symbol == "function" && w.constructor === Symbol && w !== Symbol.prototype ? "symbol" : typeof w;
    }, s(m);
  }
  r.log = u, r.formatArgs = a, r.save = l, r.load = c, r.useColors = i, r.storage = p(), r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function i() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function a(m) {
    if (m[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + m[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !!this.useColors) {
      var g = "color: " + this.color;
      m.splice(1, 0, g, "color: inherit");
      var w = 0, y = 0;
      m[0].replace(/%[a-zA-Z%]/g, function(f) {
        f !== "%%" && (w++, f === "%c" && (y = w));
      }), m.splice(y, 0, g);
    }
  }
  function u() {
    var m;
    return (typeof console > "u" ? "undefined" : s(console)) === "object" && console.log && (m = console).log.apply(m, arguments);
  }
  function l(m) {
    try {
      m ? r.storage.setItem("debug", m) : r.storage.removeItem("debug");
    } catch {
    }
  }
  function c() {
    var m;
    try {
      m = r.storage.getItem("debug");
    } catch {
    }
    return !m && typeof process < "u" && "env" in process && (m = process.env.DEBUG), m;
  }
  function p() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = common(r);
  var d = n.exports.formatters;
  d.j = function(m) {
    try {
      return JSON.stringify(m);
    } catch (g) {
      return "[UnexpectedJSONParseError]: " + g.message;
    }
  };
})(browser, browserExports);
var balanced$1 = balancedMatch, debug = browserExports("css-color-function:parse"), parse_1 = parse$2;
function parse$2(n) {
  typeof n != "string" && (n = n.toString()), debug("string %s", n);
  function r(m) {
    var g = m.exec(n);
    if (g)
      return n = n.slice(g[0].length), g.slice(1);
  }
  function s() {
    r(/^\s+/);
  }
  function i() {
    var m = r(/^\)/);
    if (m)
      return debug("rparen"), m;
  }
  function a() {
    var m = r(/^([\+\-\*])/);
    if (m) {
      var g = {};
      return g.type = "modifier", g.value = m[0], debug("modifier %o", g), g;
    }
  }
  function u() {
    var m = r(/^([^\)\s]+)/);
    if (m) {
      var g = {};
      return g.type = "number", g.value = m[0], debug("number %o", g), g;
    }
  }
  function l() {
    for (var m = [], g; g = a() || d() || u(); )
      m.push(g), s();
    return debug("args %o", m), m;
  }
  function c() {
    var m = r(/^(\w+)\(/);
    if (m) {
      s();
      var g = {};
      return g.type = "function", g.name = m[0], g.arguments = l(), i(), debug("adjuster %o", g), g;
    }
  }
  function p() {
    var m = {};
    m.type = "color";
    var g = r(/([^\)\s]+)/)[0];
    if (g.indexOf("(") != -1) {
      var w = r(/([^\)]*?\))/)[0];
      g = g + w;
    }
    return m.value = g, s(), m;
  }
  function d() {
    if (n.match(/^color\(/)) {
      var m = balanced$1("(", ")", n);
      if (!m)
        throw new SyntaxError("Missing closing parenthese for '" + n + "'");
      if (m.body === "")
        throw new SyntaxError("color() function cannot be empty");
      n = m.body, s();
      var g = {};
      g.type = "function", g.name = "color", g.arguments = [d() || p()], debug("function arguments %o", g.arguments);
      for (var w; w = c(); )
        g.arguments.push(w), s();
      return n = m.post, s(), debug("function %o", g), g;
    }
  }
  return d();
}
var adjusters$1 = {};
(function(n) {
  var r = color;
  n.red = s("red"), n.blue = s("blue"), n.green = s("green"), n.alpha = n.a = s("alpha"), n.rgb = function() {
  }, n.hue = n.h = i("hue"), n.saturation = n.s = i("saturation"), n.lightness = n.l = i("lightness"), n.whiteness = n.w = i("whiteness"), n.blackness = n.b = i("blackness"), n.blend = function(l, c) {
    var p = l.alpha();
    l.alpha(1);
    var d = new r(c[0].value), m = 1 - parseInt(c[1].value, 10) / 100;
    l.mix(d, m).alpha(p);
  }, n.tint = function(l, c) {
    c.unshift({ type: "argument", value: "white" }), n.blend(l, c);
  }, n.shade = function(l, c) {
    c.unshift({ type: "argument", value: "black" }), n.blend(l, c);
  }, n.contrast = function(l, c) {
    c.length == 0 && c.push({ type: "argument", value: "100%" });
    var p = 1 - parseInt(c[0].value, 10) / 100, d = l.luminosity() < 0.5 ? new r({ h: l.hue(), w: 100, b: 0 }) : new r({ h: l.hue(), w: 0, b: 100 }), m = d, g = 4.5;
    if (l.contrast(d) > g) {
      var m = u(g, l, d), w = m.alpha();
      m.alpha(1), m.mix(d, p).alpha(w);
    }
    l.hwb(m.hwb());
  };
  function s(l) {
    return function(c, p) {
      var d;
      p[0].type == "modifier" && (d = p.shift().value);
      var m = p[0].value;
      m.indexOf("%") != -1 ? (m = parseInt(m, 10) / 100, d ? d != "*" && (m = c[l]() * m) : m = m * (l == "alpha" ? 1 : 255)) : m = Number(m), c[l](a(c[l](), m, d));
    };
  }
  function i(l) {
    return function(c, p) {
      var d;
      p[0].type == "modifier" && (d = p.shift().value);
      var m = parseFloat(p[0].value, 10);
      c[l](a(c[l](), m, d));
    };
  }
  function a(l, c, p) {
    switch (p) {
      case "+":
        return l + c;
      case "-":
        return l - c;
      case "*":
        return l * c;
      default:
        return c;
    }
  }
  function u(l, c, p) {
    c.hue();
    for (var d = c.clone(), m = c.whiteness(), g = c.blackness(), w = p.whiteness(), y = p.blackness(); Math.abs(m - w) > 1 || Math.abs(g - y) > 1; ) {
      var f = Math.round((w + m) / 2), v = Math.round((y + g) / 2);
      d.whiteness(f), d.blackness(v), d.contrast(c) > l ? (w = f, y = v) : (m = f, g = v);
    }
    return d;
  }
})(adjusters$1);
var balanced = balancedMatch, Color = color, parse$1 = parse_1, adjusters = adjusters$1, convert_1 = convert$1;
function convert$1(n) {
  var r = n.indexOf("color(");
  if (r == -1)
    return n;
  if (n = n.slice(r), n = balanced("(", ")", n), !n)
    throw new SyntaxError("Missing closing parenthese for '" + n + "'");
  var s = parse$1("color(" + n.body + ")");
  return toRGB(s) + convert$1(n.post);
}
function toRGB(n) {
  var r = new Color(n.arguments[0].type == "function" ? toRGB(n.arguments[0]) : n.arguments[0].value), s = n.arguments.slice(1);
  return s.forEach(function(i) {
    var a = i.name;
    if (!adjusters[a])
      throw new Error("Unknown <color-adjuster> '" + a + "'");
    i.arguments.forEach(function(u) {
      u.type == "function" && u.name == "color" && (u.value = toRGB(u), u.type = "color", delete u.name);
    }), adjusters[a](r, i.arguments);
  }), r.rgbString();
}
var convert = convert_1, parse = parse_1;
lib.convert = convert;
lib.parse = parse;
class Storage {
  constructor() {
    O(this, "prefix", "");
    this.prefix = getAppType() == "admin" ? "admin" : "site";
  }
  setPrefix(r) {
    this.prefix = r;
  }
  /**
   * 设置缓存
   * @param param
   */
  set(r) {
    try {
      window.localStorage.setItem(`${this.prefix}.${r.key}`, JSON.stringify(r.data)), typeof r.success == "function" && r.success();
    } catch (s) {
      typeof r.fail == "function" && r.fail(s);
    }
  }
  /**
   * 获取缓存
   * @param key
   * @returns
   */
  get(r) {
    try {
      const s = window.localStorage.getItem(`${this.prefix}.${r}`);
      return s === null ? null : JSON.parse(s);
    } catch {
      const i = window.localStorage.getItem(`${this.prefix}.${r}`);
      return i !== null ? i : null;
    }
  }
  /**
   * 移除指定缓存
   * @param key
   */
  remove(r) {
    typeof r == "string" ? window.localStorage.removeItem(`${this.prefix}.${r}`) : r.forEach((s) => {
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
const storage = new Storage(), env = (typeof window < "u" ? window.__ENV__ : null) || {}, envConfig = {
  VITE_APP_BASE_URL: env.VITE_APP_BASE_URL || "/adminapi/",
  VITE_IMG_DOMAIN: env.VITE_IMG_DOMAIN || "",
  VITE_REQUEST_HEADER_TOKEN_KEY: env.VITE_REQUEST_HEADER_TOKEN_KEY || "token",
  VITE_REQUEST_HEADER_SITEID_KEY: env.VITE_REQUEST_HEADER_SITEID_KEY || "site-id",
  VITE_DETAULT_TITLE: env.VITE_DETAULT_TITLE || {}.VITE_DETAULT_TITLE || ""
};
function useElementIcon(n) {
  for (const [r, s] of Object.entries(ElementPlusIconsVue))
    n.component(r, s);
}
function setThemeColor(n, r = "light") {
  useCssVar("--el-color-primary", null).value = n;
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
  Object.keys(s[r]).forEach((i) => {
    useCssVar("--el-color-primary-" + i, null).value = lib.convert(`color(${n} ${s[r][i]})`);
  });
}
function getAppType() {
  const n = location.pathname.split("/").filter((r) => r);
  return n.length ? n[0] : "admin";
}
function setWindowTitle(n = "") {
  const r = useTitle();
  r.value = n || envConfig.VITE_DETAULT_TITLE;
}
function getToken() {
  return storage.get("token");
}
function setToken(n) {
  storage.set({ key: "token", data: n });
}
function removeToken() {
  storage.remove("token");
}
function debounce$1(n, r = 300) {
  let s = null;
  return function(...i) {
    s != null && (clearTimeout(s), s = null), s = setTimeout(() => {
      n.call(this, ...i);
    }, r);
  };
}
function isUrl(n) {
  return n.indexOf("http://") != -1 || n.indexOf("https://") != -1;
}
function img(n) {
  if (!n)
    return "";
  let r = envConfig.VITE_IMG_DOMAIN || location.origin;
  return n.startsWith("/") && (n = n.replace(/^\//, "")), r.endsWith("/") && (r = r.slice(0, -1)), isUrl(n) ? n : `${r}/${n}`;
}
function assetImg(n) {
  return new URL("@/", self.location) + n;
}
function strByteLength(n = "") {
  let r = 0;
  for (let s = 0; s < n.length; s++)
    n.charCodeAt(s) > 127 || n.charCodeAt(s) == 94 ? r += 2 : r++;
  return r;
}
function urlToRouteRaw(n) {
  const r = {}, [s, i] = n.split("?");
  return i && i.split("&").forEach((a) => {
    let [u, l] = a.split("=");
    r[u] = l;
  }), { path: s, query: r };
}
const isArray = (n) => typeof Array.isArray == "function" ? Array.isArray(n) : Object.prototype.toString.call(n) === "[object Array]";
function deepClone(n) {
  if ([null, void 0, NaN, !1].includes(n) || typeof n != "object" && typeof n != "function")
    return n;
  const r = isArray(n) ? [] : {};
  for (const s in n)
    n.hasOwnProperty(s) && (r[s] = typeof n[s] == "object" ? deepClone(n[s]) : n[s]);
  return r;
}
function guid(n = 10, r = !0, s = null) {
  const i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), a = [];
  if (s = s || i.length, n)
    for (let u = 0; u < n; u++)
      a[u] = i[0 | Math.random() * s];
  else {
    let u;
    a[8] = a[13] = a[18] = a[23] = "-", a[14] = "4";
    for (let l = 0; l < 36; l++)
      a[l] || (u = 0 | Math.random() * 16, a[l] = i[l == 19 ? u & 3 | 8 : u]);
  }
  return r ? (a.shift(), `u${a.join("")}`) : a.join("");
}
function moneyFormat(n) {
  return isNaN(parseFloat(n)) ? n : parseFloat(n).toFixed(2);
}
function timeStampTurnTime(n, r = "") {
  if (n != null && n != "" && n > 0) {
    const s = new Date();
    s.setTime(n * 1e3);
    const i = s.getFullYear();
    let a = s.getMonth() + 1;
    a = a < 10 ? "0" + a : a;
    let u = s.getDate();
    u = u < 10 ? "0" + u : u;
    let l = s.getHours();
    l = l < 10 ? "0" + l : l;
    let c = s.getMinutes(), p = s.getSeconds();
    return c = c < 10 ? "0" + c : c, p = p < 10 ? "0" + p : p, r ? r == "yearMonthDay" ? i + "年" + a + "月" + u + "日" : i + "-" + a + "-" + u : i + "-" + a + "-" + u + " " + l + ":" + c + ":" + p;
  } else
    return "";
}
function getCurrentDataTime(n) {
  const r = (d) => d < 10 ? "0" + d : d, s = new Date(n);
  let i = s.getFullYear(), a = s.getMonth() + 1, u = s.getDate(), l = s.getHours(), c = s.getMinutes(), p = s.getSeconds();
  return a > 12 && (a = a - 12), `${i}-${r(a)}-${r(u)} ${r(l)}:${r(c)}:${r(p)}`;
}
function timeTurnTimeStamp(n) {
  const r = n.split(" ", 2), s = (r[0] ? r[0] : "").split("-", 3), i = (r[1] ? r[1] : "").split(":", 3);
  return new Date(
    parseInt(s[0], 10) || null,
    (parseInt(s[1], 10) || 1) - 1,
    parseInt(s[2], 10) || null,
    parseInt(i[0], 10) || null,
    parseInt(i[1], 10) || null,
    parseInt(i[2], 10) || null
  ).getTime() / 1e3;
}
function filterDigit(n) {
  n.target.value = n.target.value.replace(/[^\d\.]/g, ""), n.target.value = n.target.value.replace(/^\./g, ""), n.target.value = n.target.value.replace(/\.{2,}/g, ".");
  const r = n.target.value.split(".");
  r.length > 1 && r[1].length > 2 && (n.target.value = `${r[0]}.${r[1].slice(0, 2)}`);
}
function filterNumber(n) {
  n.target.value = n.target.value.replace(/[^\d]/g, "");
}
function filterSpecial(n) {
  n.target.value = n.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ""), n.target.value = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
}
function filterBlank(n) {
  n.target.value = n.target.value.replace(/\s/g, "");
}
function setTablePageStorage(n = 1, r = 10, s = {}) {
  let i = storage.get("tablePageStorage");
  i || (i = {});
  const a = location.pathname + JSON.stringify(s);
  i[a] = {
    page: n,
    limit: r
  };
  const u = 5;
  Object.keys(i).length > u && delete i[Object.keys(i)[0]], storage.set({ key: "tablePageStorage", data: i });
}
function getTablePageStorage(n = {}) {
  let r = storage.get("tablePageStorage");
  const s = location.pathname + JSON.stringify(n);
  return !r || !r[s] ? r = {
    page: 1,
    limit: 10
  } : r = r[s], r;
}
function distance(n) {
  const r = typeof n == "string" ? parseFloat(n) : n;
  return isNaN(r) ? n.toString() : r < 1 ? parseInt((r * 1e3).toString()) + "m" : r.toFixed(1) + "km";
}
function getImageDimensions(n) {
  return new Promise((r) => {
    const s = new Image();
    s.onload = () => {
      const i = {
        width: s.naturalWidth,
        height: s.naturalHeight
      };
      r(i);
    }, s.onerror = (i) => {
      r(null);
    }, s.src = img(n);
  });
}
const __variableDynamicImportRuntimeHelper = (n, r) => {
  const s = n[r];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((i, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + r)));
  });
};
let prodManifests = {}, installedAddonKeys = [], prodReady = !1, prodInitPromise = null;
const addonModuleCache = {}, ADMIN_PREFIX = "/admin";
function adminUrl(n) {
  return !n || n.startsWith("http") || n.startsWith("/admin/") ? n : n.startsWith("/assets/") ? `${ADMIN_PREFIX}${n}` : n.startsWith("./") ? `${ADMIN_PREFIX}/assets/addons/${n.slice(2)}` : `${ADMIN_PREFIX}/${n.replace(/^\//, "")}`;
}
function addonAssetUrl(n, ...r) {
  const s = ["assets", "addons", n, ...r].join("/").replace(/\/+/g, "/");
  return `${ADMIN_PREFIX}/${s}`;
}
function resolveLangFile(n, r) {
  if (r === "/")
    return "index";
  let s = r.replace(/^(\/admin\/|\/site\/|\/)/, "").replace(/\.vue$/, "");
  return s.startsWith("views/") && (s = s.slice(6)), n && (s.startsWith(`${n}/`) ? s = s.slice(n.length + 1) : s === n && (s = "index")), s.replaceAll("/", ".");
}
function resolveRouteAddon(n) {
  if (n.meta.addon)
    return String(n.meta.addon);
  for (let r = n.matched.length - 1; r >= 0; r--) {
    const s = n.matched[r].meta.addon;
    if (s)
      return String(s);
  }
  return "";
}
function resolveRouteView(n) {
  if (n.meta.view)
    return String(n.meta.view);
  for (let r = n.matched.length - 1; r >= 0; r--) {
    const s = n.matched[r].meta.view;
    if (s)
      return String(s);
  }
  return n.path;
}
function unwrapLangPack(n) {
  if (!n || typeof n != "object")
    return {};
  const r = n;
  if (r.default && typeof r.default == "object")
    return unwrapLangPack(r.default);
  const s = {};
  for (const [i, a] of Object.entries(r))
    i === "default" || i === "__esModule" || typeof a == "string" && (s[i] = a);
  return Object.keys(s).length ? s : r;
}
function flattenLangPack(n, r) {
  const s = {};
  for (const [i, a] of Object.entries(r))
    typeof a == "string" && (s[`${n}.${i}`] = a, n === "common" && (s[i] = a));
  return s;
}
function inferAddonFromPath(n, r) {
  const i = n.replace(/^(\/admin\/|\/site\/|\/)/, "").split("/").filter(Boolean)[0];
  return i && (r != null && r.length ? r : getInstalledAddonKeys()).includes(i) ? i : "";
}
async function isAddonEntryAvailable(n) {
  try {
    const r = await fetch(adminUrl(`/assets/addons/${n}/index.js`), { method: "HEAD" });
    return r.ok ? !(r.headers.get("content-type") || "").toLowerCase().includes("text/html") : !1;
  } catch {
    return !1;
  }
}
function isAddonInstalled(n) {
  return !!n && getInstalledAddonKeys().includes(n);
}
async function loadAddonModule(n) {
  return n in addonModuleCache || (addonModuleCache[n] = (async () => {
    try {
      return await import(adminUrl(`/assets/addons/${n}/index.js`));
    } catch {
      return null;
    }
  })()), addonModuleCache[n];
}
async function ensureAddonProdReady() {
  prodReady || await initAddonManifests();
}
async function initAddonManifests(n) {
  return prodInitPromise || (prodInitPromise = (async () => {
    prodManifests = {}, installedAddonKeys = [];
    let r = n;
    if (!(r != null && r.length))
      try {
        const i = adminUrl("/assets/addons/index.json"), a = await fetch(i);
        if (a.ok) {
          const u = await a.json();
          r = Array.isArray(u.keys) ? u.keys : [];
        }
      } catch {
        r = [];
      }
    const s = [];
    for (const i of r || [])
      if (await isAddonEntryAvailable(i)) {
        s.push(i);
        try {
          const a = adminUrl(`/assets/addons/${i}/manifest.json`), u = await fetch(a);
          u.ok && (prodManifests[i] = await u.json());
        } catch {
        }
      }
    installedAddonKeys = s, prodReady = !0;
  })(), prodInitPromise);
}
function getInstalledAddonKeys() {
  return installedAddonKeys.length ? installedAddonKeys : Object.keys(prodManifests);
}
async function preloadAllAddonLangs(n) {
  prodReady || await initAddonManifests();
  for (const r of getInstalledAddonKeys())
    try {
      const s = await loadAddonModule(r);
      if (!s)
        continue;
      const i = s.langs;
      if (!i)
        continue;
      for (const [a, u] of Object.entries(i)) {
        const l = {};
        for (const [c, p] of Object.entries(u || {}))
          Object.assign(l, flattenLangPack(c, unwrapLangPack(p)));
        Object.keys(l).length && n(a, l);
      }
    } catch {
    }
}
async function loadAddonLang(n, r, s) {
  var a;
  prodReady || await initAddonManifests();
  try {
    const u = await loadAddonModule(n);
    if (u) {
      const l = u.langs, c = (a = l == null ? void 0 : l[r]) == null ? void 0 : a[s], p = unwrapLangPack(c);
      if (Object.keys(p).length)
        return p;
    }
  } catch {
  }
  const i = addonAssetUrl(n, "lang", r, `${s}.json`);
  try {
    const u = await fetch(i);
    if (u.ok)
      return await u.json();
  } catch {
  }
  return {};
}
class Language {
  //已加载的语言
  constructor(r) {
    O(this, "i18n");
    O(this, "loadLocale", []);
    this.i18n = r;
  }
  /**
   *
   * @param locale 设置语言
   */
  setI18nLanguage(r) {
    this.i18n.mode === "legacy" ? this.i18n.global.locale = r : this.i18n.global.locale = r;
    let s = document.querySelector("html");
    s && s.setAttribute("lang", r);
  }
  /**
   * 加载语言包
   * @param app
   * @param path
   * @param locale
   * @returns
   */
  async loadLocaleMessages(r, s, i) {
    try {
      r || (r = inferAddonFromPath(s));
      const a = resolveLangFile(r, s);
      let u = {};
      r ? u = await loadAddonLang(r, i, a) : u = (await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../app/lang/en/403.json": () => import("./403-4bc122af.js"), "../app/lang/en/auth.menu.json": () => import("./auth.menu-f5062c22.js"), "../app/lang/en/index.json": () => import("./index-c33bb386.js"), "../app/lang/en/login.json": () => import("./login-8bac8312.js"), "../app/lang/en/member.member.json": () => import("./member.member-64cd29d1.js"), "../app/lang/en/user.center.json": () => import("./user.center-78470141.js"), "../app/lang/zh-cn/403.json": () => import("./403-afb5f475.js"), "../app/lang/zh-cn/app.authorize.json": () => import("./app.authorize-7701e564.js"), "../app/lang/zh-cn/app.index.json": () => import("./app.index-ffd57c14.js"), "../app/lang/zh-cn/app.store.json": () => import("./app.store-82fccf8d.js"), "../app/lang/zh-cn/app.upgrade.json": () => import("./app.upgrade-a5fc793d.js"), "../app/lang/zh-cn/auth.log.json": () => import("./auth.log-7ab49365.js"), "../app/lang/zh-cn/auth.menu.json": () => import("./auth.menu-11f8c5be.js"), "../app/lang/zh-cn/auth.role.json": () => import("./auth.role-c93ddff5.js"), "../app/lang/zh-cn/auth.site_menu.json": () => import("./auth.site_menu-8547ef11.js"), "../app/lang/zh-cn/auth.user.json": () => import("./auth.user-4b72de7c.js"), "../app/lang/zh-cn/channel.aliapp.access.json": () => import("./channel.aliapp.access-345ff291.js"), "../app/lang/zh-cn/channel.aliapp.config.json": () => import("./channel.aliapp.config-8ba784b4.js"), "../app/lang/zh-cn/channel.aliapp.course.json": () => import("./channel.aliapp.course-11a03e9a.js"), "../app/lang/zh-cn/channel.app.access.json": () => import("./channel.app.access-4967216b.js"), "../app/lang/zh-cn/channel.app.config.json": () => import("./channel.app.config-f92838ee.js"), "../app/lang/zh-cn/channel.app.version.json": () => import("./channel.app.version-801d7c33.js"), "../app/lang/zh-cn/channel.h5.config.json": () => import("./channel.h5.config-bb100e55.js"), "../app/lang/zh-cn/channel.pc.config.json": () => import("./channel.pc.config-bbe7313f.js"), "../app/lang/zh-cn/channel.weapp.access.json": () => import("./channel.weapp.access-f5b56b8d.js"), "../app/lang/zh-cn/channel.weapp.code.json": () => import("./channel.weapp.code-1597a17b.js"), "../app/lang/zh-cn/channel.weapp.config.json": () => import("./channel.weapp.config-62316f27.js"), "../app/lang/zh-cn/channel.weapp.course.json": () => import("./channel.weapp.course-46cdef05.js"), "../app/lang/zh-cn/channel.weapp.template.json": () => import("./channel.weapp.template-60f607e4.js"), "../app/lang/zh-cn/channel.wechat.access.json": () => import("./channel.wechat.access-3198d859.js"), "../app/lang/zh-cn/channel.wechat.config.json": () => import("./channel.wechat.config-149fe86d.js"), "../app/lang/zh-cn/channel.wechat.course.json": () => import("./channel.wechat.course-717abfc8.js"), "../app/lang/zh-cn/channel.wechat.keyword_reply_edit.json": () => import("./channel.wechat.keyword_reply_edit-736dea19.js"), "../app/lang/zh-cn/channel.wechat.menu.json": () => import("./channel.wechat.menu-08c01b06.js"), "../app/lang/zh-cn/channel.wechat.reply.json": () => import("./channel.wechat.reply-371557b9.js"), "../app/lang/zh-cn/channel.wechat.template.json": () => import("./channel.wechat.template-c7e0e856.js"), "../app/lang/zh-cn/decorate.preview.json": () => import("./decorate.preview-5f2765ef.js"), "../app/lang/zh-cn/dict.list.json": () => import("./dict.list-fdd911c6.js"), "../app/lang/zh-cn/diy.edit.json": () => import("./diy.edit-f5d8c6b1.js"), "../app/lang/zh-cn/diy.index.json": () => import("./diy.index-7d6c7cb2.js"), "../app/lang/zh-cn/diy.list.json": () => import("./diy.list-fb8d7f12.js"), "../app/lang/zh-cn/diy.member.json": () => import("./diy.member-7204bf61.js"), "../app/lang/zh-cn/diy.preview.json": () => import("./diy.preview-f8b42901.js"), "../app/lang/zh-cn/diy.route.json": () => import("./diy.route-51d664e7.js"), "../app/lang/zh-cn/diy.tabbar.json": () => import("./diy.tabbar-5a78137b.js"), "../app/lang/zh-cn/diy.tabbar_edit.json": () => import("./diy.tabbar_edit-1b67bdec.js"), "../app/lang/zh-cn/diy_form.edit.json": () => import("./diy_form.edit-5e849551.js"), "../app/lang/zh-cn/diy_form.list.json": () => import("./diy_form.list-8cc96e72.js"), "../app/lang/zh-cn/finance.account.json": () => import("./finance.account-3ebadbbb.js"), "../app/lang/zh-cn/finance.cash_out.json": () => import("./finance.cash_out-a5fc92d4.js"), "../app/lang/zh-cn/finance.offlinepay.json": () => import("./finance.offlinepay-5e4097af.js"), "../app/lang/zh-cn/finance.pay_detail.json": () => import("./finance.pay_detail-03e8534d.js"), "../app/lang/zh-cn/finance.pay_refund.json": () => import("./finance.pay_refund-33befe92.js"), "../app/lang/zh-cn/finance.refund_detail.json": () => import("./finance.refund_detail-4952f106.js"), "../app/lang/zh-cn/index.app_manage.json": () => import("./index.app_manage-8bfaebc1.js"), "../app/lang/zh-cn/index.index.json": () => import("./index.index-1daecdce.js"), "../app/lang/zh-cn/index.preview.json": () => import("./index.preview-969e67dd.js"), "../app/lang/zh-cn/index.store.json": () => import("./index.store-e2f6d3f6.js"), "../app/lang/zh-cn/login.json": () => import("./login-00d7722b.js"), "../app/lang/zh-cn/marketing.sign_config.json": () => import("./marketing.sign_config-62bde278.js"), "../app/lang/zh-cn/marketing.sign_list.json": () => import("./marketing.sign_list-2d527eb9.js"), "../app/lang/zh-cn/marketing.verifier.json": () => import("./marketing.verifier-fb68001b.js"), "../app/lang/zh-cn/marketing.verify.json": () => import("./marketing.verify-a01b4161.js"), "../app/lang/zh-cn/member.balance.json": () => import("./member.balance-7b831fb2.js"), "../app/lang/zh-cn/member.commission.json": () => import("./member.commission-6f09b642.js"), "../app/lang/zh-cn/member.growth.json": () => import("./member.growth-b8b132a4.js"), "../app/lang/zh-cn/member.label.edit.json": () => import("./member.label.edit-32f3c791.js"), "../app/lang/zh-cn/member.label.json": () => import("./member.label-d042fc75.js"), "../app/lang/zh-cn/member.level.json": () => import("./member.level-9883e926.js"), "../app/lang/zh-cn/member.level_edit.json": () => import("./member.level_edit-63ebdbf3.js"), "../app/lang/zh-cn/member.member.json": () => import("./member.member-2cc54a64.js"), "../app/lang/zh-cn/member.member_detail.json": () => import("./member.member_detail-49ebc798.js"), "../app/lang/zh-cn/member.point.json": () => import("./member.point-b9f9143f.js"), "../app/lang/zh-cn/poster.edit.json": () => import("./poster.edit-c0d45927.js"), "../app/lang/zh-cn/poster.list.json": () => import("./poster.list-6a917fd4.js"), "../app/lang/zh-cn/printer.edit.json": () => import("./printer.edit-03e2be08.js"), "../app/lang/zh-cn/printer.list.json": () => import("./printer.list-1cf7202e.js"), "../app/lang/zh-cn/printer.template_edit.json": () => import("./printer.template_edit-3092b283.js"), "../app/lang/zh-cn/printer.template_list.json": () => import("./printer.template_list-679ce0fb.js"), "../app/lang/zh-cn/setting.adminlogin.json": () => import("./setting.adminlogin-763acc1d.js"), "../app/lang/zh-cn/setting.agreement.json": () => import("./setting.agreement-ef53ab4e.js"), "../app/lang/zh-cn/setting.agreement_edit.json": () => import("./setting.agreement_edit-42ca6920.js"), "../app/lang/zh-cn/setting.cash_out.json": () => import("./setting.cash_out-b3a40561.js"), "../app/lang/zh-cn/setting.copyright.json": () => import("./setting.copyright-703776c8.js"), "../app/lang/zh-cn/setting.developer_token.json": () => import("./setting.developer_token-df8cac95.js"), "../app/lang/zh-cn/setting.export.json": () => import("./setting.export-6bcb66d7.js"), "../app/lang/zh-cn/setting.growth_rule.json": () => import("./setting.growth_rule-4682f358.js"), "../app/lang/zh-cn/setting.layout.json": () => import("./setting.layout-2d2ef354.js"), "../app/lang/zh-cn/setting.login.json": () => import("./setting.login-0e20a204.js"), "../app/lang/zh-cn/setting.map.json": () => import("./setting.map-a018c17d.js"), "../app/lang/zh-cn/setting.member.json": () => import("./setting.member-3c18afe5.js"), "../app/lang/zh-cn/setting.notice.json": () => import("./setting.notice-b12781da.js"), "../app/lang/zh-cn/setting.notice_records.json": () => import("./setting.notice_records-8b5d12a2.js"), "../app/lang/zh-cn/setting.oplatform.json": () => import("./setting.oplatform-ceddec97.js"), "../app/lang/zh-cn/setting.pay.json": () => import("./setting.pay-9d3502d5.js"), "../app/lang/zh-cn/setting.sms.json": () => import("./setting.sms-38c6ea20.js"), "../app/lang/zh-cn/setting.sms_records.json": () => import("./setting.sms_records-f32dcf96.js"), "../app/lang/zh-cn/setting.storage.json": () => import("./setting.storage-33557c9e.js"), "../app/lang/zh-cn/setting.system.json": () => import("./setting.system-533a107a.js"), "../app/lang/zh-cn/setting.transfer.json": () => import("./setting.transfer-dd7288e1.js"), "../app/lang/zh-cn/setting.transfer_scene.json": () => import("./setting.transfer_scene-a1236971.js"), "../app/lang/zh-cn/setting.weapp.json": () => import("./setting.weapp-38d65415.js"), "../app/lang/zh-cn/site.group.json": () => import("./site.group-79d11eb3.js"), "../app/lang/zh-cn/site.group_edit.json": () => import("./site.group_edit-ad4054d9.js"), "../app/lang/zh-cn/site.info.json": () => import("./site.info-3cdf0707.js"), "../app/lang/zh-cn/site.list.json": () => import("./site.list-f879a4a9.js"), "../app/lang/zh-cn/site.manage.json": () => import("./site.manage-d384cce7.js"), "../app/lang/zh-cn/site.user.json": () => import("./site.user-298548ec.js"), "../app/lang/zh-cn/site.user_info.json": () => import("./site.user_info-8949966a.js"), "../app/lang/zh-cn/tools.addon.edit.json": () => import("./tools.addon.edit-67fed17b.js"), "../app/lang/zh-cn/tools.addon.index.json": () => import("./tools.addon.index-64a332f0.js"), "../app/lang/zh-cn/tools.addon.list.json": () => import("./tools.addon.list-066ffe3b.js"), "../app/lang/zh-cn/tools.backup_records.json": () => import("./tools.backup_records-3ee06c5e.js"), "../app/lang/zh-cn/tools.code.edit.json": () => import("./tools.code.edit-ce482f8a.js"), "../app/lang/zh-cn/tools.code.index.json": () => import("./tools.code.index-2f01b5e9.js"), "../app/lang/zh-cn/tools.code.list.json": () => import("./tools.code.list-b3d1ec18.js"), "../app/lang/zh-cn/tools.detection.json": () => import("./tools.detection-2d1c5fc5.js"), "../app/lang/zh-cn/tools.schedule.json": () => import("./tools.schedule-3013f2ba.js"), "../app/lang/zh-cn/tools.schedule_log.json": () => import("./tools.schedule_log-c332642a.js"), "../app/lang/zh-cn/tools.updatecache.json": () => import("./tools.updatecache-c28011ba.js"), "../app/lang/zh-cn/tools.upgrade_records.json": () => import("./tools.upgrade_records-948f5c6a.js"), "../app/lang/zh-cn/user.center.json": () => import("./user.center-f848e53b.js"), "../app/lang/zh-cn/user.edit_center.json": () => import("./user.edit_center-86828913.js"), "../app/lang/zh-cn/wxoplatform.setting.json": () => import("./wxoplatform.setting-e351af9d.js"), "../app/lang/zh-cn/wxoplatform.weapp_version.json": () => import("./wxoplatform.weapp_version-cb21e15c.js") }), `../app/lang/${i}/${a}.json`)).default || {};
      let l = {};
      if (Object.keys(u).forEach((c) => {
        l[`${a}.${c}`] = u[c];
      }), r)
        try {
          let c = {};
          c = await loadAddonLang(r, i, "common"), Object.keys(c).forEach((p) => {
            l[p] = c[p];
          });
        } catch {
        }
      return this.i18n.global.mergeLocaleMessage(i, l), this.setI18nLanguage(i), nextTick();
    } catch {
      return this.setI18nLanguage(i), nextTick();
    }
  }
  /** 生产环境启动时预加载各插件全部语言包 */
  async preloadAddonLangs() {
    await preloadAllAddonLangs((r, s) => {
      this.i18n.global.mergeLocaleMessage(r, s);
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
  set exports(n) {
    nprogressExports = n;
  }
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(n, r) {
  (function(s, i) {
    n.exports = i();
  })(commonjsGlobal, function() {
    var s = {};
    s.version = "0.2.0";
    var i = s.settings = {
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
    s.configure = function(f) {
      var v, h;
      for (v in f)
        h = f[v], h !== void 0 && f.hasOwnProperty(v) && (i[v] = h);
      return this;
    }, s.status = null, s.set = function(f) {
      var v = s.isStarted();
      f = a(f, i.minimum, 1), s.status = f === 1 ? null : f;
      var h = s.render(!v), _ = h.querySelector(i.barSelector), E = i.speed, $ = i.easing;
      return h.offsetWidth, c(function(x) {
        i.positionUsing === "" && (i.positionUsing = s.getPositioningCSS()), p(_, l(f, E, $)), f === 1 ? (p(h, {
          transition: "none",
          opacity: 1
        }), h.offsetWidth, setTimeout(function() {
          p(h, {
            transition: "all " + E + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            s.remove(), x();
          }, E);
        }, E)) : setTimeout(x, E);
      }), this;
    }, s.isStarted = function() {
      return typeof s.status == "number";
    }, s.start = function() {
      s.status || s.set(0);
      var f = function() {
        setTimeout(function() {
          s.status && (s.trickle(), f());
        }, i.trickleSpeed);
      };
      return i.trickle && f(), this;
    }, s.done = function(f) {
      return !f && !s.status ? this : s.inc(0.3 + 0.5 * Math.random()).set(1);
    }, s.inc = function(f) {
      var v = s.status;
      return v ? (typeof f != "number" && (f = (1 - v) * a(Math.random() * v, 0.1, 0.95)), v = a(v + f, 0, 0.994), s.set(v)) : s.start();
    }, s.trickle = function() {
      return s.inc(Math.random() * i.trickleRate);
    }, function() {
      var f = 0, v = 0;
      s.promise = function(h) {
        return !h || h.state() === "resolved" ? this : (v === 0 && s.start(), f++, v++, h.always(function() {
          v--, v === 0 ? (f = 0, s.done()) : s.set((f - v) / f);
        }), this);
      };
    }(), s.render = function(f) {
      if (s.isRendered())
        return document.getElementById("nprogress");
      m(document.documentElement, "nprogress-busy");
      var v = document.createElement("div");
      v.id = "nprogress", v.innerHTML = i.template;
      var h = v.querySelector(i.barSelector), _ = f ? "-100" : u(s.status || 0), E = document.querySelector(i.parent), $;
      return p(h, {
        transition: "all 0 linear",
        transform: "translate3d(" + _ + "%,0,0)"
      }), i.showSpinner || ($ = v.querySelector(i.spinnerSelector), $ && y($)), E != document.body && m(E, "nprogress-custom-parent"), E.appendChild(v), v;
    }, s.remove = function() {
      g(document.documentElement, "nprogress-busy"), g(document.querySelector(i.parent), "nprogress-custom-parent");
      var f = document.getElementById("nprogress");
      f && y(f);
    }, s.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, s.getPositioningCSS = function() {
      var f = document.body.style, v = "WebkitTransform" in f ? "Webkit" : "MozTransform" in f ? "Moz" : "msTransform" in f ? "ms" : "OTransform" in f ? "O" : "";
      return v + "Perspective" in f ? "translate3d" : v + "Transform" in f ? "translate" : "margin";
    };
    function a(f, v, h) {
      return f < v ? v : f > h ? h : f;
    }
    function u(f) {
      return (-1 + f) * 100;
    }
    function l(f, v, h) {
      var _;
      return i.positionUsing === "translate3d" ? _ = { transform: "translate3d(" + u(f) + "%,0,0)" } : i.positionUsing === "translate" ? _ = { transform: "translate(" + u(f) + "%,0)" } : _ = { "margin-left": u(f) + "%" }, _.transition = "all " + v + "ms " + h, _;
    }
    var c = function() {
      var f = [];
      function v() {
        var h = f.shift();
        h && h(v);
      }
      return function(h) {
        f.push(h), f.length == 1 && v();
      };
    }(), p = function() {
      var f = ["Webkit", "O", "Moz", "ms"], v = {};
      function h(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(T, k) {
          return k.toUpperCase();
        });
      }
      function _(x) {
        var T = document.body.style;
        if (x in T)
          return x;
        for (var k = f.length, b = x.charAt(0).toUpperCase() + x.slice(1), C; k--; )
          if (C = f[k] + b, C in T)
            return C;
        return x;
      }
      function E(x) {
        return x = h(x), v[x] || (v[x] = _(x));
      }
      function $(x, T, k) {
        T = E(T), x.style[T] = k;
      }
      return function(x, T) {
        var k = arguments, b, C;
        if (k.length == 2)
          for (b in T)
            C = T[b], C !== void 0 && T.hasOwnProperty(b) && $(x, b, C);
        else
          $(x, k[1], k[2]);
      };
    }();
    function d(f, v) {
      var h = typeof f == "string" ? f : w(f);
      return h.indexOf(" " + v + " ") >= 0;
    }
    function m(f, v) {
      var h = w(f), _ = h + v;
      d(h, v) || (f.className = _.substring(1));
    }
    function g(f, v) {
      var h = w(f), _;
      d(f, v) && (_ = h.replace(" " + v + " ", " "), f.className = _.substring(1, _.length - 1));
    }
    function w(f) {
      return (" " + (f.className || "") + " ").replace(/\s+/gi, " ");
    }
    function y(f) {
      f && f.parentNode && f.parentNode.removeChild(f);
    }
    return s;
  });
})(nprogress);
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
const t$1 = (n) => {
  const r = currentRoute();
  let s = resolveRouteAddon(r);
  const i = resolveRouteView(r);
  s || (s = inferAddonFromPath(i));
  const u = `${resolveLangFile(s, i)}.${n}`;
  return i18n.global.t(u) != u ? i18n.global.t(u) : i18n.global.t(n);
};
function login(n, r) {
  return request.get(`login/${r}`, { params: n });
}
function logout() {
  return request.put("auth/logout", {}, { showErrorMessage: !1 });
}
function getAuthMenus(n) {
  return request.get("auth/authmenu", { params: n });
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
function getRoleList(n) {
  return request.get("sys/role", { params: n });
}
function getRoleInfo(n) {
  return request.get(`sys/role/${n}`);
}
function addRole(n) {
  return request.post("sys/role", n, { showSuccessMessage: !0 });
}
function editRole(n) {
  return request.put(`sys/role/${n.role_id}`, n, { showSuccessMessage: !0 });
}
function deleteRole(n) {
  return request.delete(`sys/role/${n}`, { showSuccessMessage: !0 });
}
function modifyRoleStatus(n) {
  return request.put("sys/role/status", n, { showSuccessMessage: !0 });
}
function allRole() {
  return request.get("sys/role/all");
}
function getMenus(n) {
  return request.get(`sys/menu/${n}`);
}
function getMenuInfo(n, r) {
  return request.get(`sys/menu/${n}/info/${r}`);
}
function addMenu(n) {
  return request.post("sys/menu", n, { showSuccessMessage: !0 });
}
function editMenu(n) {
  return request.put(`sys/menu/${n.app_type}/${n.menu_key}`, n, { showSuccessMessage: !0 });
}
function deleteMenu(n, r) {
  return request.delete(`sys/menu/${n}/${r}`, { showSuccessMessage: !0 });
}
function getSystemMenu() {
  return request.get("sys/menu/system_menu");
}
function getAddonMenu(n) {
  return request.get(`sys/menu/addon_menu/${n}`);
}
function getMenuByTypeDir(n = "system") {
  return request.get(`sys/menu/dir/${n}`);
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
function setWebsite(n) {
  return request.put("sys/config/website", n, { showSuccessMessage: !0 });
}
function getCopyright() {
  return request.get("sys/config/copyright");
}
function getService() {
  return request.get("sys/config/service");
}
function setCopyright(n) {
  return request.put("sys/config/copyright", n, { showSuccessMessage: !0 });
}
function getAttachmentCategoryList(n) {
  return request.get("sys/attachment/category", { params: n });
}
function addAttachmentCategory(n) {
  return request.post("sys/attachment/category", n, { showSuccessMessage: !0 });
}
function editAttachmentCategory(n) {
  return request.put(`sys/attachment/category/${n.id}`, n, { showSuccessMessage: !0 });
}
function deleteAttachmentCategory(n) {
  return request.delete(`sys/attachment/category/${n}`, { showSuccessMessage: !0 });
}
function getAttachmentList(n) {
  return request.get("sys/attachment", { params: n });
}
function deleteAttachment(n) {
  return request.delete("sys/attachment/del", { data: n, showSuccessMessage: !0 });
}
function moveAttachment(n) {
  return request.put("sys/attachment/batchmove", n);
}
function getAuthMenu() {
  return request.get("auth/site/showmenu");
}
function getEnv() {
  return request.get("sys/env");
}
function getAreaListByPid(n = 0) {
  return request.get(`sys/area/list_by_pid/${n}`);
}
function getAreatree(n = 1) {
  return request.get(`sys/area/tree/${n}`);
}
function getAddressInfo(n) {
  return request.get("sys/area/get_info", { params: n });
}
function getContraryAddress(n) {
  return request.get("sys/area/contrary", { params: n });
}
function getAreaByCode(n) {
  return request.get(`sys/area/code/${n}`);
}
function getStorageList() {
  return request.get("sys/storage");
}
function getStorageInfo(n) {
  return request.get(`sys/storage/${n}`);
}
function editStorage(n) {
  return request.put(`sys/storage/${n.storage_type}`, n, { showSuccessMessage: !0 });
}
function getPayConfig(n) {
  return request.get(`pay/config/${n}`);
}
function setPayConfig(n) {
  return request.put(`pay/config/${n.type}`, n, { showSuccessMessage: !0 });
}
function getTransferInfo(n) {
  return request.get(`pay/channel/lists/${n}`);
}
function setTransferInfo(n) {
  return request.post("pay/channel/set/transfer", n, { showSuccessMessage: !0 });
}
function getCronList(n) {
  return request.get("sys/schedule/list", { params: n });
}
function getCronInfo(n) {
  return request.get(`sys/cron/${n}`);
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
function addCron(n) {
  return request.post("sys/schedule", n, { showSuccessMessage: !0 });
}
function editCron(n) {
  return request.put(`sys/schedule/${n.id}`, n, { showSuccessMessage: !0 });
}
function deleteCron(n) {
  return request.delete(`sys/schedule/${n}`, { showSuccessMessage: !0 });
}
function doCron(n) {
  return request.put(`sys/schedule/do/${n.id}`, n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getCronLogList(n) {
  return request.get("sys/schedule/log/list", { params: n });
}
function deleteCronLog(n) {
  return request.put("sys/schedule/log/delete", n, { showSuccessMessage: !0 });
}
function clearCronLog(n) {
  return request.put("sys/schedule/log/clear", n, { showSuccessMessage: !0 });
}
function resetCron() {
  return request.post("sys/schedule/reset", { showSuccessMessage: !0 });
}
function getAgreementList() {
  return request.get("sys/agreement");
}
function getAgreementInfo(n) {
  return request.get(`sys/agreement/${n}`);
}
function editAgreement(n) {
  return request.put(`sys/agreement/${n.key}`, n, { showSuccessMessage: !0 });
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
function setConfigLogin(n) {
  return request.put("sys/config/login", n, { showSuccessMessage: !0 });
}
function getPayConfigList() {
  return request.get("pay/channel/lists");
}
function setPatConfig(n) {
  return request.post("pay/channel/set/all", n, { showSuccessMessage: !0 });
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
function setMap(n) {
  return request.put("sys/config/map", n, { showSuccessMessage: !0 });
}
function getMap(n) {
  return request.get("sys/config/map", { params: n });
}
function getPayAuditList(n) {
  return request.get("pay/audit", { params: n });
}
function payAuditPass(n) {
  return request.put(`pay/pass/${n}`, {}, { showSuccessMessage: !0 });
}
function payAuditRefuse(n) {
  return request.put(`pay/refuse/${n.out_trade_no}`, n, { showSuccessMessage: !0 });
}
function getPayDetail(n) {
  return request.get(`pay/detail/${n}`);
}
function getAddonList() {
  return request.get("app/getAddonList");
}
function getDeveloperToken() {
  return request.get("sys/config/developer_token");
}
function setDeveloperToken(n) {
  return request.put("sys/config/developer_token", n, { showSuccessMessage: !0 });
}
function getWebsiteLayout() {
  return request.get("sys/web/layout");
}
function getLayout() {
  return request.get("sys/config/layout");
}
function setLayout(n) {
  return request.put("sys/config/layout", n, { showSuccessMessage: !0 });
}
function getThemecolor() {
  return request.get("sys/config/themecolor");
}
function setThemecolor(n) {
  return request.put("sys/config/themecolor", n);
}
function getExportList(n) {
  return request.get("sys/export", { params: n });
}
function getExportStatusList() {
  return request.get("sys/export/status");
}
function getExportKeyList() {
  return request.get("sys/export/type");
}
function exportData(n, r) {
  return request.get(`sys/export/${n}`, { params: r });
}
function exportDataCheck(n, r) {
  return request.get(`sys/export/check/${n}`, { params: r });
}
function deleteExport(n) {
  return request.delete(`sys/export/${n}`, { showSuccessMessage: !0 });
}
function getWxoplatform() {
  return request.get("sys/wxoplatform/config");
}
function getQrcode(n) {
  return request.get("sys/qrcode", { params: n, showErrorMessage: !1 });
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
    setHeadMenu(n) {
      this.currHeadMenuName = n;
    },
    setTheme(n, r) {
      this[n] = r, theme[n] = r, storage.set({ key: "theme", data: theme });
    },
    toggleMenuCollapse(n) {
      this.menuIsCollapse = n, storage.set({ key: "menuiscollapse", data: n }), useCssVar("--aside-width").value = n ? "calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)" : "210px";
    },
    async getWebsiteInfo() {
      await getWebConfig().then(({ data: n }) => {
        this.website = n;
      }).catch(() => {
      });
    },
    async getWebsiteLayout() {
      await getWebsiteLayout().then(({ data: n }) => {
        this.layoutConfig = n;
      }).catch(() => {
      });
    }
  }
}), _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(n) {
    const i = Object.assign(/* @__PURE__ */ Object.assign({ "./admin/index.vue": () => import("./index-d015c1fa.js"), "./admin_simplicity/index.vue": () => import("./index-ff0d09f6.js"), "./bussiness/index.vue": () => import("./index-3168607f.js"), "./darkside/index.vue": () => import("./index-a507d46e.js"), "./decorate/index.vue": () => import("./index-0beb16ce.js"), "./default/index.vue": () => import("./index-df32d8d8.js"), "./lightside/index.vue": () => import("./index-a191f4d5.js"), "./profession/index.vue": () => import("./index-f609671a.js"), "./routine/index.vue": () => import("./index-113b6e1a.js") }), /* @__PURE__ */ Object.assign({ "/src/addon/home_service/layout/index.vue": () => import("./index-3f1aed28.js"), "/src/addon/o2o/layout/index.vue": () => import("./index-122e19c0.js"), "/src/addon/shop/layout/index.vue": () => import("./index-16d80079.js"), "/src/addon/tourism/layout/index.vue": () => import("./index-1ad78c96.js"), "/src/addon/vipcard/layout/index.vue": () => import("./index-8c10629e.js") }));
    let a = "default";
    switch (getAppType()) {
      case "admin":
        a = storage.get("admin_layout") || "admin";
        break;
      default:
        const l = useUserStore().siteInfo;
        if (l && l.apps) {
          const c = useSystemStore().layoutConfig;
          l.apps.length == 1 ? c[l.apps[0].key] != null && (a = c[l.apps[0].key]) : c.system != null && (a = c.system);
        }
    }
    const u = ref(null);
    return Object.keys(i).forEach((l) => {
      l.indexOf(`/${a}/`) !== -1 && (u.value = markRaw(defineAsyncComponent(i[l])));
    }), !u.value && (u.value = markRaw(defineAsyncComponent(i["./default/index.vue"]))), provide("setLayout", (l) => {
      a != l && (a = l, Object.keys(i).forEach((c) => {
        c.indexOf(`/${l}/`) !== -1 && (u.value = markRaw(defineAsyncComponent(i[c])));
      }));
    }), (l, c) => (openBlock(), createBlock(resolveDynamicComponent(u.value)));
  }
}), _export_sfc = (n, r) => {
  const s = n.__vccOpts || n;
  for (const [i, a] of r)
    s[i] = a;
  return s;
}, load404 = () => import("./404-7a562be5.js");
function loadAddonView(n, r) {
  return n ? async () => {
    var s;
    if (await ensureAddonProdReady(), !isAddonInstalled(n))
      return console.error(`[loadAddonView] addon "${n}" not installed. Installed:`, getInstalledAddonKeys()), load404();
    try {
      const i = await loadAddonModule(n);
      if (!i)
        return console.error(`[loadAddonView] addon "${n}" module loaded as null/undefined`), load404();
      const a = (s = i.views) == null ? void 0 : s[r];
      if (!a) {
        const u = Object.keys(i.views || {});
        return console.error(`[loadAddonView] addon="${n}" viewPath="${r}" NOT FOUND. Available (${u.length}):`, u.slice(0, 10), u.length > 10 ? `... and ${u.length - 10} more` : ""), load404();
      }
      try {
        return await a();
      } catch (u) {
        return console.error(`[loadAddonView] addon="${n}" viewPath="${r}" loader threw:`, u), load404();
      }
    } catch (i) {
      return console.error(`[loadAddonView] addon="${n}" module import failed:`, i), load404();
    }
  } : () => load404();
}
function loadAddonComponent(n, r, s) {
  const i = `${r}/${s}`.replace(/\/+/g, "/");
  return async () => {
    if (await ensureAddonProdReady(), !isAddonInstalled(n))
      return null;
    try {
      const a = await loadAddonModule(n);
      if (!a)
        return null;
      const u = a.components;
      if (!u)
        return null;
      const l = u[i];
      return l ? await l() : null;
    } catch {
      return null;
    }
  };
}
({
  .../* @__PURE__ */ Object.assign({ "../app/components/cloud-build/index.vue": () => import("./index-97f1117f.js"), "../app/components/upgrade-log/index.vue": () => import("./index-5eacfa37.js"), "../app/components/upgrade/index.vue": () => import("./index-14321927.js"), "../app/components/user-info-edit/index.vue": () => import("./index-a4c1f6a5.js"), "../app/components/weappupload/index.vue": () => import("./index-359094f8.js"), "../app/views/app/authorize.vue": () => import("./authorize-3e5a3d56.js"), "../app/views/app/index.vue": () => import("./index-da0f5b05.js"), "../app/views/app/marketing.vue": () => import("./marketing-f612096b.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-5911994f.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-fc28b7be.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-04e131b4.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-5ea50da8.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-98c9db5e.js"), "../app/views/auth/log.vue": () => import("./log-df767ace.js"), "../app/views/auth/menu.vue": () => import("./menu-95f7eca1.js"), "../app/views/auth/role.vue": () => import("./role-dda6aa9c.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-8f5c2824.js"), "../app/views/auth/user.vue": () => import("./user-7bffda9e.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-e1d85b87.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-b512046a.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-b0dccf33.js"), "../app/views/channel/app/access.vue": () => import("./access-60eb032a.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-0b6e8afb.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-5a0268e6.js"), "../app/views/channel/app/config.vue": () => import("./config-dddd9406.js"), "../app/views/channel/app/version.vue": () => import("./version-d680bcf4.js"), "../app/views/channel/h5/config.vue": () => import("./config-20a36cf5.js"), "../app/views/channel/pc/config.vue": () => import("./config-d0d4e1c2.js"), "../app/views/channel/weapp/access.vue": () => import("./access-f2c52218.js"), "../app/views/channel/weapp/code.vue": () => import("./code-611bbbcc.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-8deb59be.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-56bc7d33.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-0aa4b556.js"), "../app/views/channel/weapp/config.vue": () => import("./config-f6e030a9.js"), "../app/views/channel/weapp/course.vue": () => import("./course-fe0c56fb.js"), "../app/views/channel/weapp/template.vue": () => import("./template-b49f66a2.js"), "../app/views/channel/wechat/access.vue": () => import("./access-93deaaeb.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-ebd3b7a4.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-02bb87da.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-06ea2b28.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-83cb817e.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-bff7198d.js"), "../app/views/channel/wechat/config.vue": () => import("./config-14e976ed.js"), "../app/views/channel/wechat/course.vue": () => import("./course-b9b0fb6e.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-dbde1e7d.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-1eec2a3b.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-68139636.js"), "../app/views/channel/wechat/template.vue": () => import("./template-6f51c492.js"), "../app/views/dict/components/dict.vue": () => import("./dict-1d6180fb.js"), "../app/views/dict/components/edit.vue": () => import("./edit-43f2a0a8.js"), "../app/views/dict/list.vue": () => import("./list-cc3ae484.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-87ca9b68.js").then((n) => n._), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-9bcbe25d.js").then((n) => n._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-892e5e9c.js").then((n) => n._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-5e5b2cab.js").then((n) => n._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-7321efa2.js").then((n) => n._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-f3722953.js").then((n) => n._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-fa3c85bb.js").then((n) => n._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-b2bd92ab.js").then((n) => n._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-eb9c375b.js").then((n) => n._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-3ef09666.js").then((n) => n._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-32a470fe.js").then((n) => n._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-606ae324.js").then((n) => n._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-7585a1ef.js").then((n) => n._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-86c57e87.js").then((n) => n._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-fec21252.js").then((n) => n._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-d3332cc3.js").then((n) => n._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-86d9b855.js").then((n) => n._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-2c374d8d.js").then((n) => n._), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-1ee57b81.js").then((n) => n._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-3edf0961.js").then((n) => n._), "../app/views/diy/edit.vue": () => import("./edit-2b5bb38d.js"), "../app/views/diy/index.vue": () => import("./index-e3ead122.js"), "../app/views/diy/list.vue": () => import("./list-e4bbc002.js"), "../app/views/diy/member.vue": () => import("./member-6c99c34f.js"), "../app/views/diy/route.vue": () => import("./route-0115f1e6.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-a887717b.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-2189b619.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-ff45946a.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-86708a4a.js").then((n) => n._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-74a87168.js").then((n) => n._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-2b16e1da.js").then((n) => n._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-f2d649d5.js").then((n) => n._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-da447e7d.js").then((n) => n._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-3c426e88.js").then((n) => n._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-a89041ca.js").then((n) => n._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-8d8b9f0b.js").then((n) => n._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-ab435ad2.js").then((n) => n._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-51e15ad8.js").then((n) => n._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-59ee06f6.js").then((n) => n._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-28ef4233.js").then((n) => n._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-f5f56ad6.js").then((n) => n._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-c1bda624.js").then((n) => n._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-33ae33a9.js").then((n) => n._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-03989e61.js").then((n) => n._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-1d75af2a.js").then((n) => n._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-76dfc30d.js").then((n) => n._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-81615498.js").then((n) => n._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-ec43dc00.js").then((n) => n._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-14c87495.js").then((n) => n._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-e878834e.js").then((n) => n._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-e519b685.js").then((n) => n._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-aca19a12.js").then((n) => n._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-4eebf21a.js").then((n) => n._), "../app/views/diy_form/edit.vue": () => import("./edit-b276cd37.js"), "../app/views/diy_form/list.vue": () => import("./list-eb98416c.js"), "../app/views/diy_form/records.vue": () => import("./records-b23b7311.js"), "../app/views/error/404.vue": () => import("./404-7a562be5.js"), "../app/views/finance/account.vue": () => import("./account-eeb8e85e.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-6df93871.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-22b1f79e.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-7d38a3cb.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-21fe8ef5.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-09daee80.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-b46f051f.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-412dc6c3.js"), "../app/views/home/index.vue": () => import("./index-87dc4e9b.js"), "../app/views/home/personal.vue": () => import("./personal-2be8ff37.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-4238dbc8.js"), "../app/views/index/index.vue": () => import("./index-c20c02aa.js"), "../app/views/index/preview.vue": () => import("./preview-1c1cb070.js"), "../app/views/index/store.vue": () => import("./store-cfec5831.js"), "../app/views/index/tools.vue": () => import("./tools-6068d4ea.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-cc5b3a07.js"), "../app/views/login/index.vue": () => import("./index-8b459a5e.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-6c9823a6.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-1ab979d7.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-3b63166b.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-f9722705.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-462f139c.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-6fdac647.js"), "../app/views/marketing/verify.vue": () => import("./verify-ce133741.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-4336a12f.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-6d67e8c8.js"), "../app/views/member/balance.vue": () => import("./balance-6e81e459.js"), "../app/views/member/commission.vue": () => import("./commission-5b9c6d20.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-cd98e78c.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-edd05f88.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-6772c14a.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-9827793e.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-60b03a9d.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-0dd7f9f5.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-c181e182.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-058f2e00.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-9f4e37cc.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-ad978bd9.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-0763a6c9.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-d8c4fbb3.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-178076aa.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-5253cc30.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-8e730230.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-7e2563a7.js"), "../app/views/member/growth.vue": () => import("./growth-ed792a7c.js"), "../app/views/member/label.vue": () => import("./label-bb3587d4.js"), "../app/views/member/level.vue": () => import("./level-87c0286c.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-653119c0.js"), "../app/views/member/member.vue": () => import("./member-0b4658c6.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-1218f831.js"), "../app/views/member/point.vue": () => import("./point-a77b5500.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-c31eafad.js").then((n) => n._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-f4877abc.js").then((n) => n._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-2010cabe.js").then((n) => n._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-1596273d.js").then((n) => n._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-0b1f1949.js").then((n) => n._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-df3fb5b9.js").then((n) => n._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-1aaf1215.js").then((n) => n._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-c1343f70.js").then((n) => n._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-6bcd22e5.js").then((n) => n._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-25b2d4c7.js").then((n) => n._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-e35effe9.js").then((n) => n._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-f80fe0ff.js").then((n) => n._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-1b99f9c0.js").then((n) => n._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-d7f564a1.js").then((n) => n._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-b33123eb.js").then((n) => n._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-e34ffd3a.js").then((n) => n._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-500cfa6a.js").then((n) => n._), "../app/views/poster/edit.vue": () => import("./edit-55a37193.js"), "../app/views/poster/list.vue": () => import("./list-31bc5992.js"), "../app/views/printer/edit.vue": () => import("./edit-f8fde35a.js"), "../app/views/printer/list.vue": () => import("./list-acdbf0df.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-c24156fd.js"), "../app/views/printer/template_list.vue": () => import("./template_list-af86e909.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-e1b18968.js"), "../app/views/setting/agreement.vue": () => import("./agreement-24d49d9f.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-e5e17bc8.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-1ccb6889.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-e0af8563.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-96e93baf.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-4543325e.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-7021c33d.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-ad34ae46.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-8d092b27.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-a27cc992.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-82b46b60.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-85a536d0.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-eadcdbff.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-9fe8d217.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-3193a372.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-e631c55d.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-73185314.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-7007d46c.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-2ebd86eb.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-67ef29c7.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-f8233c17.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-8444119b.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-17d4672a.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-bb981f32.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-97ab78cf.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-348eab63.js"), "../app/views/setting/copyright.vue": () => import("./copyright-653d95a1.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-2ab27f14.js"), "../app/views/setting/export.vue": () => import("./export-c7d091f4.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-4bae22c2.js"), "../app/views/setting/layout.vue": () => import("./layout-9e066e08.js"), "../app/views/setting/login.vue": () => import("./login-a254a0a1.js"), "../app/views/setting/map.vue": () => import("./map-b75a6ad1.js"), "../app/views/setting/member.vue": () => import("./member-780bf22b.js"), "../app/views/setting/notice.vue": () => import("./notice-c0f46f92.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-40d2f329.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-1cd35052.js"), "../app/views/setting/pay.vue": () => import("./pay-f27ae601.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-7fae237b.js"), "../app/views/setting/sms.vue": () => import("./sms-9b936dc3.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-0046aa72.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-bd24aa44.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-2010b4a5.js"), "../app/views/setting/storage.vue": () => import("./storage-47adc78f.js"), "../app/views/setting/system.vue": () => import("./system-d28a703f.js"), "../app/views/setting/transfer.vue": () => import("./transfer-c80c9f67.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-8af5f12d.js"), "../app/views/setting/weapp.vue": () => import("./weapp-38b5511f.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-3d9e314c.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-474ea3cc.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-d11636f0.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-715f33b3.js"), "../app/views/site/group.vue": () => import("./group-8cb077cc.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-25058df1.js"), "../app/views/site/info.vue": () => import("./info-04345a64.js"), "../app/views/site/list.vue": () => import("./list-c99672dd.js"), "../app/views/site/manage.vue": () => import("./manage-11571852.js"), "../app/views/site/user.vue": () => import("./user-1e03779b.js"), "../app/views/site/user_info.vue": () => import("./user_info-7b86fa01.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-d739787b.js"), "../app/views/tools/addon/index.vue": () => import("./index-66fa9a5b.js"), "../app/views/tools/addon/list.vue": () => import("./list-63b73010.js"), "../app/views/tools/attachment.vue": () => import("./attachment-8abcfe97.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-3ddfa069.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-7b6686a2.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-f16aaafe.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-c8f3b1df.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-ef5caf86.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-74d5e9bf.js"), "../app/views/tools/code/edit.vue": () => import("./edit-23b5721d.js"), "../app/views/tools/code/index.vue": () => import("./index-3cea8718.js"), "../app/views/tools/code/list.vue": () => import("./list-7c7ac0ba.js"), "../app/views/tools/detection.vue": () => import("./detection-127e6c0f.js"), "../app/views/tools/schedule.vue": () => import("./schedule-cadd4441.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-3a20228f.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-3528a416.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-136cf12e.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-7a30ddb3.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-206b8009.js") }),
  .../* @__PURE__ */ Object.assign({ "../components/diy-link/index.vue": () => import("./index-b022467f.js"), "../components/diy-page/index.vue": () => Promise.resolve().then(() => index$1), "../components/editor/index.vue": () => import("./index-7ab86cb4.js"), "../components/export-sure/index.vue": () => import("./index-4f2fccff.js"), "../components/heat-map/index.vue": () => import("./index-01c86891.js"), "../components/icon/index.vue": () => import("./index-9c1a7b4f.js"), "../components/map-selector/index.vue": () => import("./index-c60f839f.js"), "../components/markdown/index.vue": () => import("./index-a4552fef.js"), "../components/popover-input/index.vue": () => import("./index-ca313907.js"), "../components/range-input/index.vue": () => import("./index-6f9975ac.js"), "../components/select-area/index.vue": () => import("./index-c5891858.js"), "../components/select-icon/index.vue": () => import("./index-2f6fb241.js"), "../components/spread-popup/index.vue": () => import("./index-4fc2683a.js"), "../components/upload-attachment/attachment.vue": () => import("./attachment-a8905dd7.js"), "../components/upload-attachment/index.vue": () => import("./index-e20d35ec.js"), "../components/upload-audio/index.vue": () => import("./index-e4b8a6c8.js"), "../components/upload-file/index.vue": () => import("./index-a24a85e8.js"), "../components/upload-image/index.vue": () => Promise.resolve().then(() => index$3), "../components/upload-video/index.vue": () => import("./index-729cac50.js"), "../components/verifition/Verify.vue": () => import("./Verify-206140da.js"), "../components/verifition/Verify/VerifyPoints.vue": () => import("./VerifyPoints-aea394bd.js"), "../components/verifition/Verify/VerifySlide.vue": () => import("./VerifySlide-2ebc7eda.js"), "../components/video-player/index.vue": () => import("./index-11ad8ccf.js") }),
  .../* @__PURE__ */ Object.assign({ "../layout/admin/components/aside/index.vue": () => import("./index-0f6829aa.js"), "../layout/admin/components/aside/menu-item.vue": () => import("./menu-item-a19693ae.js"), "../layout/admin/components/aside/side.vue": () => import("./side-66d8c6fc.js"), "../layout/admin/components/header/index.vue": () => import("./index-f068a6c6.js"), "../layout/admin/components/header/layout-setting.vue": () => import("./layout-setting-9922fda2.js"), "../layout/admin/components/header/message.vue": () => import("./message-32c56eab.js"), "../layout/admin/components/header/switch-lang.vue": () => import("./switch-lang-3dac2570.js"), "../layout/admin/components/header/user-info.vue": () => import("./user-info-b2d4dc7b.js"), "../layout/admin/components/tabs.vue": () => import("./tabs-550e76fd.js"), "../layout/admin/index.vue": () => import("./index-d015c1fa.js"), "../layout/admin_simplicity/components/aside/index.vue": () => import("./index-4e84dc9a.js"), "../layout/admin_simplicity/components/aside/menu-item.vue": () => import("./menu-item-d9725e9f.js"), "../layout/admin_simplicity/components/aside/side.vue": () => import("./side-7445a8d8.js"), "../layout/admin_simplicity/components/header/index.vue": () => import("./index-d377ff08.js"), "../layout/admin_simplicity/components/header/layout-setting.vue": () => import("./layout-setting-5140541a.js"), "../layout/admin_simplicity/components/header/message.vue": () => import("./message-38fd10e0.js"), "../layout/admin_simplicity/components/header/switch-lang.vue": () => import("./switch-lang-d5ebd978.js"), "../layout/admin_simplicity/components/header/user-info.vue": () => import("./user-info-ee980f67.js"), "../layout/admin_simplicity/components/tabs.vue": () => import("./tabs-01a20009.js"), "../layout/admin_simplicity/index.vue": () => import("./index-ff0d09f6.js"), "../layout/bussiness/components/aside/index.vue": () => import("./index-c3d5d4e7.js"), "../layout/bussiness/components/aside/menu-item.vue": () => import("./menu-item-e0d47a81.js"), "../layout/bussiness/components/aside/side.vue": () => import("./side-fbbdbfe8.js"), "../layout/bussiness/components/header/index.vue": () => import("./index-c0bfd060.js"), "../layout/bussiness/components/header/layout-setting.vue": () => import("./layout-setting-6521991c.js"), "../layout/bussiness/components/header/switch-lang.vue": () => import("./switch-lang-40a7f6bc.js"), "../layout/bussiness/components/header/user-info.vue": () => import("./user-info-09e737d8.js"), "../layout/bussiness/components/tabs.vue": () => import("./tabs-d4c438a0.js"), "../layout/bussiness/index.vue": () => import("./index-3168607f.js"), "../layout/darkside/components/aside/index.vue": () => import("./index-5c60677d.js"), "../layout/darkside/components/aside/menu-item.vue": () => import("./menu-item-19ded380.js"), "../layout/darkside/components/aside/side.vue": () => import("./side-d414f382.js"), "../layout/darkside/components/header/index.vue": () => import("./index-eea7bbab.js"), "../layout/darkside/components/header/layout-setting.vue": () => import("./layout-setting-8d9707a4.js"), "../layout/darkside/components/header/switch-lang.vue": () => import("./switch-lang-b0cdc05f.js"), "../layout/darkside/components/header/user-info.vue": () => import("./user-info-c7cf034d.js"), "../layout/darkside/components/tabs.vue": () => import("./tabs-35b5ce71.js"), "../layout/darkside/index.vue": () => import("./index-a507d46e.js"), "../layout/decorate/index.vue": () => import("./index-0beb16ce.js"), "../layout/default/components/aside/index.vue": () => import("./index-3ee0fbb1.js"), "../layout/default/components/aside/menu-item.vue": () => import("./menu-item-b57be1e4.js"), "../layout/default/components/aside/side.vue": () => import("./side-e5be7d6a.js"), "../layout/default/components/header/index.vue": () => import("./index-38a76610.js"), "../layout/default/components/header/layout-setting.vue": () => import("./layout-setting-9b59ab50.js"), "../layout/default/components/header/switch-lang.vue": () => import("./switch-lang-43b1a8af.js"), "../layout/default/components/header/user-info.vue": () => import("./user-info-4375b5b7.js"), "../layout/default/components/tabs.vue": () => import("./tabs-8c659c8e.js"), "../layout/default/index.vue": () => import("./index-df32d8d8.js"), "../layout/index.vue": () => import("./index-8825ac7a.js"), "../layout/lightside/components/aside/index.vue": () => import("./index-2dbf12f9.js"), "../layout/lightside/components/aside/menu-item.vue": () => import("./menu-item-04ff052c.js"), "../layout/lightside/components/aside/side.vue": () => import("./side-bdbe0c93.js"), "../layout/lightside/components/header/index.vue": () => import("./index-36f321c4.js"), "../layout/lightside/components/header/layout-setting.vue": () => import("./layout-setting-32bafaa2.js"), "../layout/lightside/components/header/switch-lang.vue": () => import("./switch-lang-635683d2.js"), "../layout/lightside/components/header/user-info.vue": () => import("./user-info-2eb8f860.js"), "../layout/lightside/components/tabs.vue": () => import("./tabs-5ac19731.js"), "../layout/lightside/index.vue": () => import("./index-a191f4d5.js"), "../layout/profession/components/aside/index.vue": () => import("./index-253be94d.js"), "../layout/profession/components/aside/menu-item.vue": () => import("./menu-item-78a4d2c5.js"), "../layout/profession/components/aside/side.vue": () => import("./side-dea7868a.js"), "../layout/profession/components/header/index.vue": () => import("./index-1b5f6d89.js"), "../layout/profession/components/header/layout-setting.vue": () => import("./layout-setting-2e381ed3.js"), "../layout/profession/components/header/switch-lang.vue": () => import("./switch-lang-637bd885.js"), "../layout/profession/components/header/user-info.vue": () => import("./user-info-62c890e4.js"), "../layout/profession/components/tabs.vue": () => import("./tabs-9751bc1f.js"), "../layout/profession/index.vue": () => import("./index-f609671a.js"), "../layout/routine/components/aside/index.vue": () => import("./index-f32d629c.js"), "../layout/routine/components/aside/menu-item.vue": () => import("./menu-item-0d844cce.js"), "../layout/routine/components/aside/side.vue": () => import("./side-36ea9deb.js"), "../layout/routine/components/header/index.vue": () => import("./index-20b5031b.js"), "../layout/routine/components/header/layout-setting.vue": () => import("./layout-setting-bcd22e00.js"), "../layout/routine/components/header/switch-lang.vue": () => import("./switch-lang-d4ab6058.js"), "../layout/routine/components/header/user-info.vue": () => import("./user-info-d160ef61.js"), "../layout/routine/components/tabs.vue": () => import("./tabs-fb0aa83e.js"), "../layout/routine/index.vue": () => import("./index-113b6e1a.js") })
});
const addonLoader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  adminUrl,
  getInstalledAddonKeys,
  inferAddonFromPath,
  initAddonManifests,
  loadAddonComponent,
  loadAddonLang,
  loadAddonModule,
  loadAddonView,
  preloadAllAddonLangs,
  resolveLangFile,
  resolveRouteAddon,
  resolveRouteView
}, Symbol.toStringTag, { value: "Module" })), ADMIN_ROUTE = {
  path: "/admin",
  name: "admin",
  children: [
    {
      path: "",
      name: "adminRoot",
      component: _sfc_main$4,
      children: []
    },
    {
      path: "login",
      meta: {
        type: 1,
        title: "用户登录"
      },
      component: () => import("./index-8b459a5e.js")
    }
  ]
}, SITE_ROUTE = {
  path: "/site",
  name: "site",
  children: [
    {
      path: "",
      name: "siteRoot",
      component: _sfc_main$4,
      children: []
    },
    {
      path: "wxoplatform/callback",
      name: "wxoplatform_callback",
      meta: {
        type: 1,
        title: "微信公众号平台授权"
      },
      component: () => import("./wxoplatform_callback-cc5b3a07.js")
    },
    {
      path: "login",
      meta: {
        type: 1,
        title: "用户登录"
      },
      component: () => import("./index-8b459a5e.js")
    }
  ]
}, modules = /* @__PURE__ */ Object.assign({ "../app/views/app/authorize.vue": () => import("./authorize-3e5a3d56.js"), "../app/views/app/index.vue": () => import("./index-da0f5b05.js"), "../app/views/app/marketing.vue": () => import("./marketing-f612096b.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-5911994f.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-fc28b7be.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-04e131b4.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-5ea50da8.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-98c9db5e.js"), "../app/views/auth/log.vue": () => import("./log-df767ace.js"), "../app/views/auth/menu.vue": () => import("./menu-95f7eca1.js"), "../app/views/auth/role.vue": () => import("./role-dda6aa9c.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-8f5c2824.js"), "../app/views/auth/user.vue": () => import("./user-7bffda9e.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-e1d85b87.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-b512046a.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-b0dccf33.js"), "../app/views/channel/app/access.vue": () => import("./access-60eb032a.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-0b6e8afb.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-5a0268e6.js"), "../app/views/channel/app/config.vue": () => import("./config-dddd9406.js"), "../app/views/channel/app/version.vue": () => import("./version-d680bcf4.js"), "../app/views/channel/h5/config.vue": () => import("./config-20a36cf5.js"), "../app/views/channel/pc/config.vue": () => import("./config-d0d4e1c2.js"), "../app/views/channel/weapp/access.vue": () => import("./access-f2c52218.js"), "../app/views/channel/weapp/code.vue": () => import("./code-611bbbcc.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-8deb59be.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-56bc7d33.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-0aa4b556.js"), "../app/views/channel/weapp/config.vue": () => import("./config-f6e030a9.js"), "../app/views/channel/weapp/course.vue": () => import("./course-fe0c56fb.js"), "../app/views/channel/weapp/template.vue": () => import("./template-b49f66a2.js"), "../app/views/channel/wechat/access.vue": () => import("./access-93deaaeb.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-ebd3b7a4.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-02bb87da.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-06ea2b28.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-83cb817e.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-bff7198d.js"), "../app/views/channel/wechat/config.vue": () => import("./config-14e976ed.js"), "../app/views/channel/wechat/course.vue": () => import("./course-b9b0fb6e.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-dbde1e7d.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-1eec2a3b.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-68139636.js"), "../app/views/channel/wechat/template.vue": () => import("./template-6f51c492.js"), "../app/views/dict/components/dict.vue": () => import("./dict-1d6180fb.js"), "../app/views/dict/components/edit.vue": () => import("./edit-43f2a0a8.js"), "../app/views/dict/list.vue": () => import("./list-cc3ae484.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-87ca9b68.js").then((n) => n._), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-9bcbe25d.js").then((n) => n._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-892e5e9c.js").then((n) => n._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-5e5b2cab.js").then((n) => n._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-7321efa2.js").then((n) => n._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-f3722953.js").then((n) => n._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-fa3c85bb.js").then((n) => n._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-b2bd92ab.js").then((n) => n._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-eb9c375b.js").then((n) => n._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-3ef09666.js").then((n) => n._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-32a470fe.js").then((n) => n._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-606ae324.js").then((n) => n._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-7585a1ef.js").then((n) => n._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-86c57e87.js").then((n) => n._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-fec21252.js").then((n) => n._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-d3332cc3.js").then((n) => n._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-86d9b855.js").then((n) => n._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-2c374d8d.js").then((n) => n._), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-1ee57b81.js").then((n) => n._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-3edf0961.js").then((n) => n._), "../app/views/diy/edit.vue": () => import("./edit-2b5bb38d.js"), "../app/views/diy/index.vue": () => import("./index-e3ead122.js"), "../app/views/diy/list.vue": () => import("./list-e4bbc002.js"), "../app/views/diy/member.vue": () => import("./member-6c99c34f.js"), "../app/views/diy/route.vue": () => import("./route-0115f1e6.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-a887717b.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-2189b619.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-ff45946a.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-86708a4a.js").then((n) => n._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-74a87168.js").then((n) => n._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-2b16e1da.js").then((n) => n._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-f2d649d5.js").then((n) => n._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-da447e7d.js").then((n) => n._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-3c426e88.js").then((n) => n._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-a89041ca.js").then((n) => n._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-8d8b9f0b.js").then((n) => n._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-ab435ad2.js").then((n) => n._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-51e15ad8.js").then((n) => n._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-59ee06f6.js").then((n) => n._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-28ef4233.js").then((n) => n._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-f5f56ad6.js").then((n) => n._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-c1bda624.js").then((n) => n._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-33ae33a9.js").then((n) => n._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-03989e61.js").then((n) => n._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-1d75af2a.js").then((n) => n._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-76dfc30d.js").then((n) => n._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-81615498.js").then((n) => n._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-ec43dc00.js").then((n) => n._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-14c87495.js").then((n) => n._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-e878834e.js").then((n) => n._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-e519b685.js").then((n) => n._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-aca19a12.js").then((n) => n._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-4eebf21a.js").then((n) => n._), "../app/views/diy_form/edit.vue": () => import("./edit-b276cd37.js"), "../app/views/diy_form/list.vue": () => import("./list-eb98416c.js"), "../app/views/diy_form/records.vue": () => import("./records-b23b7311.js"), "../app/views/error/404.vue": () => import("./404-7a562be5.js"), "../app/views/finance/account.vue": () => import("./account-eeb8e85e.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-6df93871.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-22b1f79e.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-7d38a3cb.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-21fe8ef5.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-09daee80.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-b46f051f.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-412dc6c3.js"), "../app/views/home/index.vue": () => import("./index-87dc4e9b.js"), "../app/views/home/personal.vue": () => import("./personal-2be8ff37.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-4238dbc8.js"), "../app/views/index/index.vue": () => import("./index-c20c02aa.js"), "../app/views/index/preview.vue": () => import("./preview-1c1cb070.js"), "../app/views/index/store.vue": () => import("./store-cfec5831.js"), "../app/views/index/tools.vue": () => import("./tools-6068d4ea.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-cc5b3a07.js"), "../app/views/login/index.vue": () => import("./index-8b459a5e.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-6c9823a6.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-1ab979d7.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-3b63166b.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-f9722705.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-462f139c.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-6fdac647.js"), "../app/views/marketing/verify.vue": () => import("./verify-ce133741.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-4336a12f.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-6d67e8c8.js"), "../app/views/member/balance.vue": () => import("./balance-6e81e459.js"), "../app/views/member/commission.vue": () => import("./commission-5b9c6d20.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-cd98e78c.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-edd05f88.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-6772c14a.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-9827793e.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-60b03a9d.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-0dd7f9f5.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-c181e182.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-058f2e00.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-9f4e37cc.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-ad978bd9.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-0763a6c9.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-d8c4fbb3.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-178076aa.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-5253cc30.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-8e730230.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-7e2563a7.js"), "../app/views/member/growth.vue": () => import("./growth-ed792a7c.js"), "../app/views/member/label.vue": () => import("./label-bb3587d4.js"), "../app/views/member/level.vue": () => import("./level-87c0286c.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-653119c0.js"), "../app/views/member/member.vue": () => import("./member-0b4658c6.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-1218f831.js"), "../app/views/member/point.vue": () => import("./point-a77b5500.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-c31eafad.js").then((n) => n._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-f4877abc.js").then((n) => n._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-2010cabe.js").then((n) => n._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-1596273d.js").then((n) => n._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-0b1f1949.js").then((n) => n._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-df3fb5b9.js").then((n) => n._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-1aaf1215.js").then((n) => n._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-c1343f70.js").then((n) => n._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-6bcd22e5.js").then((n) => n._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-25b2d4c7.js").then((n) => n._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-e35effe9.js").then((n) => n._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-f80fe0ff.js").then((n) => n._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-1b99f9c0.js").then((n) => n._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-d7f564a1.js").then((n) => n._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-b33123eb.js").then((n) => n._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-e34ffd3a.js").then((n) => n._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-500cfa6a.js").then((n) => n._), "../app/views/poster/edit.vue": () => import("./edit-55a37193.js"), "../app/views/poster/list.vue": () => import("./list-31bc5992.js"), "../app/views/printer/edit.vue": () => import("./edit-f8fde35a.js"), "../app/views/printer/list.vue": () => import("./list-acdbf0df.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-c24156fd.js"), "../app/views/printer/template_list.vue": () => import("./template_list-af86e909.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-e1b18968.js"), "../app/views/setting/agreement.vue": () => import("./agreement-24d49d9f.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-e5e17bc8.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-1ccb6889.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-e0af8563.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-96e93baf.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-4543325e.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-7021c33d.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-ad34ae46.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-8d092b27.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-a27cc992.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-82b46b60.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-85a536d0.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-eadcdbff.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-9fe8d217.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-3193a372.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-e631c55d.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-73185314.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-7007d46c.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-2ebd86eb.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-67ef29c7.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-f8233c17.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-8444119b.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-17d4672a.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-bb981f32.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-97ab78cf.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-348eab63.js"), "../app/views/setting/copyright.vue": () => import("./copyright-653d95a1.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-2ab27f14.js"), "../app/views/setting/export.vue": () => import("./export-c7d091f4.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-4bae22c2.js"), "../app/views/setting/layout.vue": () => import("./layout-9e066e08.js"), "../app/views/setting/login.vue": () => import("./login-a254a0a1.js"), "../app/views/setting/map.vue": () => import("./map-b75a6ad1.js"), "../app/views/setting/member.vue": () => import("./member-780bf22b.js"), "../app/views/setting/notice.vue": () => import("./notice-c0f46f92.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-40d2f329.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-1cd35052.js"), "../app/views/setting/pay.vue": () => import("./pay-f27ae601.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-7fae237b.js"), "../app/views/setting/sms.vue": () => import("./sms-9b936dc3.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-0046aa72.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-bd24aa44.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-2010b4a5.js"), "../app/views/setting/storage.vue": () => import("./storage-47adc78f.js"), "../app/views/setting/system.vue": () => import("./system-d28a703f.js"), "../app/views/setting/transfer.vue": () => import("./transfer-c80c9f67.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-8af5f12d.js"), "../app/views/setting/weapp.vue": () => import("./weapp-38b5511f.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-3d9e314c.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-474ea3cc.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-d11636f0.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-715f33b3.js"), "../app/views/site/group.vue": () => import("./group-8cb077cc.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-25058df1.js"), "../app/views/site/info.vue": () => import("./info-04345a64.js"), "../app/views/site/list.vue": () => import("./list-c99672dd.js"), "../app/views/site/manage.vue": () => import("./manage-11571852.js"), "../app/views/site/user.vue": () => import("./user-1e03779b.js"), "../app/views/site/user_info.vue": () => import("./user_info-7b86fa01.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-d739787b.js"), "../app/views/tools/addon/index.vue": () => import("./index-66fa9a5b.js"), "../app/views/tools/addon/list.vue": () => import("./list-63b73010.js"), "../app/views/tools/attachment.vue": () => import("./attachment-8abcfe97.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-3ddfa069.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-7b6686a2.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-f16aaafe.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-c8f3b1df.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-ef5caf86.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-74d5e9bf.js"), "../app/views/tools/code/edit.vue": () => import("./edit-23b5721d.js"), "../app/views/tools/code/index.vue": () => import("./index-3cea8718.js"), "../app/views/tools/code/list.vue": () => import("./list-7c7ac0ba.js"), "../app/views/tools/detection.vue": () => import("./detection-127e6c0f.js"), "../app/views/tools/schedule.vue": () => import("./schedule-cadd4441.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-3a20228f.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-3528a416.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-136cf12e.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-7a30ddb3.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-206b8009.js") }), createRoute = function(n, r = null) {
  const s = {
    path: `/${n.app_type}/${n.router_path}`,
    name: n.menu_key,
    meta: {
      title: n.menu_name,
      short_title: n.menu_short_name,
      icon: n.icon,
      type: n.menu_type,
      show: n.is_show,
      app: n.app_type,
      view: n.view_path,
      addon: n.addon,
      attr: n.menu_attr,
      parent_route: r && r.meta,
      sort: n.sort,
      componentName: n.menu_key
    }
  };
  if (n.menu_type == 1)
    if (n.addon) {
      let i = n.view_path;
      !i && n.router_path && (i = n.router_path), i && (s.component = loadAddonView(n.addon, i));
    } else
      s.component = modules[`../app/views/${n.view_path}.vue`];
  return s;
};
function formatRouters(n, r = null) {
  return n.map((s) => {
    const i = createRoute(s, r);
    return s.children != null && s.children && s.children.length && (i.children = formatRouters(s.children, i)), i;
  });
}
function findFirstValidRoute(n) {
  var r, s;
  for (const i of n) {
    if (((r = i.meta) == null ? void 0 : r.type) == 1 && ((s = i.meta) != null && s.show))
      return i.name;
    if (i.children) {
      const a = findFirstValidRoute(i.children);
      if (a)
        return a;
    }
  }
}
function findRules(n, r = []) {
  let s = [...r];
  for (const i of n)
    i.auth && Array.isArray(i.auth) && (s = s.concat(i.auth)), i.children && (s = findRules(i.children, s));
  return s;
}
const useTabbarStore = defineStore("tabbar", {
  state: () => ({
    curr: "",
    tabs: {}
  }),
  actions: {
    addTab(n) {
      var r;
      if (!(n.meta && n.meta.type != 1)) {
        if (this.tabs[n.name]) {
          this.tabs[n.name].query = n.query || {};
          return;
        }
        this.tabs[n.name] = {
          path: n.path,
          title: n.meta ? n.meta.title : "",
          name: n.name,
          query: n.query || {},
          componentName: (r = n.matched.at(-1)) == null ? void 0 : r.components.default.__name
        };
      }
    },
    removeTab(n) {
      delete this.tabs[n];
    },
    clearTab() {
      this.tabs = {};
    }
  },
  getters: {
    tabLength: (n) => Object.keys(n.tabs).length,
    tabNames: (n) => {
      const r = [];
      return useSystemStore().tab && Object.keys(n.tabs).forEach((s) => {
        r.push(n.tabs[s].componentName);
      }), r;
    }
  }
}), useTabbarStore$1 = useTabbarStore, test = {
  /**
   * 验证电子邮箱格式
   */
  email(n) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(n);
  },
  /**
   * 验证手机格式
   */
  mobile(n) {
    return /^1[23456789]\d{9}$/.test(n);
  },
  /**
   * 验证URL格式
   */
  url(n) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(n);
  },
  /**
   * 验证日期格式
   */
  date(n) {
    return n ? (this.number(n) && (n = +n), !/Invalid|NaN/.test(new Date(n).toString())) : !1;
  },
  /**
   * 验证ISO类型的日期格式
   */
  dateISO(n) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n);
  },
  /**
   * 验证十进制数字
   */
  number(n) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(n);
  },
  /**
   * 验证字符串
   */
  string(n) {
    return typeof n == "string";
  },
  /**
   * 验证整数
   */
  digits(n) {
    return /^\d+$/.test(n);
  },
  /**
   * 验证身份证号码
   */
  idCard(n) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      n
    );
  },
  /**
   * 是否车牌号
   */
  carNo(n) {
    const r = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, s = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    return n.length === 7 ? s.test(n) : n.length === 8 ? r.test(n) : !1;
  },
  /**
   * 金额,只允许2位小数
   */
  amount(n) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(n);
  },
  /**
   * 验证小数
   */
  decimal(n, r) {
    const s = `^\\d+(?:\\.\\d{1,${r}})?$`;
    return new RegExp(s).test(n);
  },
  /**
   * 中文
   */
  chinese(n) {
    return /^[\u4e00-\u9fa5]+$/gi.test(n);
  },
  /**
   * 只能输入字母
   */
  letter(n) {
    return /^[a-zA-Z]*$/.test(n);
  },
  /**
   * 只能是字母或者数字
   */
  enOrNum(n) {
    return /^[0-9a-zA-Z]*$/g.test(n);
  },
  /**
   * 验证是否包含某个值
   */
  contains(n, r) {
    return n.indexOf(r) >= 0;
  },
  /**
   * 验证一个值范围[min, max]
   */
  range(n, r) {
    return n >= r[0] && n <= r[1];
  },
  /**
   * 验证一个长度范围[min, max]
   */
  rangeLength(n, r) {
    return n.length >= r[0] && n.length <= r[1];
  },
  /**
   * 是否固定电话
   */
  landline(n) {
    return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(n);
  },
  /**
   * 判断是否为空
   */
  empty(n) {
    switch (typeof n) {
      case "undefined":
        return !0;
      case "string":
        if (n.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return !0;
        break;
      case "boolean":
        if (!n)
          return !0;
        break;
      case "number":
        if (n === 0 || isNaN(n))
          return !0;
        break;
      case "object":
        if (n === null || n.length === 0)
          return !0;
        for (const r in n)
          return !1;
        return !0;
    }
    return !1;
  },
  /**
   * 是否json字符串
   */
  jsonString(n) {
    if (typeof n == "string")
      try {
        const r = JSON.parse(n);
        return !!(typeof r == "object" && r);
      } catch {
        return !1;
      }
    return !1;
  },
  /**
   * 是否数组
   */
  array(n) {
    return typeof Array.isArray == "function" ? Array.isArray(n) : Object.prototype.toString.call(n) === "[object Array]";
  },
  /**
   * 是否对象
   */
  object(n) {
    return Object.prototype.toString.call(n) === "[object Object]";
  },
  /**
   * 是否短信验证码
   */
  code(n, r = 6) {
    return new RegExp(`^\\d{${r}}$`).test(n);
  },
  /**
   * 是否函数方法
   * @param {Object} value
   */
  func(n) {
    return typeof n == "function";
  },
  /**
   * 是否promise对象
   * @param {Object} value
   */
  promise(n) {
    return this.object(n) && this.func(n.then) && this.func(n.catch);
  },
  /** 是否图片格式
   * @param {Object} value
   */
  image(n) {
    const r = n.split("?")[0];
    return /\.(jpeg|jpg|gif|png|svg|jfif|bmp|dpg)/i.test(r);
  },
  /**
   * 是否视频格式
   * @param {Object} value
   */
  video(n) {
    return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i.test(n);
  },
  /**
   * 是否为正则对象
   */
  regExp(n) {
    return n && Object.prototype.toString.call(n) === "[object RegExp]";
  },
  /**
   * 验证必填
   */
  require(n) {
    return /^\s*$/.test(n);
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
      await getSiteInfo$1().then(({ data: n }) => {
        this.siteInfo = n, storage.set({ key: "siteId", data: n.site_id || 0 }), storage.set({ key: "siteInfo", data: n }), storage.set({ key: "comparisonSiteIdStorage", data: n.site_id || 0 });
      }).catch(() => {
      });
    },
    login(n, r) {
      return new Promise((s, i) => {
        login(n, r).then(async (a) => {
          r == "admin" && Test.empty(a.data.userrole) && storage.setPrefix("site"), this.token = a.data.token, this.userInfo = a.data.userinfo, this.siteInfo = a.data.site_info || {}, setToken(a.data.token), storage.set({ key: "userinfo", data: a.data.userinfo }), storage.set({ key: "siteId", data: a.data.site_id || 0 }), storage.set({ key: "siteInfo", data: a.data.site_info || {} }), storage.set({ key: "comparisonSiteIdStorage", data: a.data.site_id || 0 }), storage.set({ key: "comparisonTokenStorage", data: a.data.token }), s(a);
        }).catch((a) => {
          i(a);
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
      const n = getAppType() == "admin" ? "/admin/login" : "/site/login";
      location.href = `${location.origin}${n}`;
    },
    getAuthMenusFn() {
      return new Promise((n, r) => {
        getAuthMenus({}).then((s) => {
          this.routers = formatRouters(s.data), this.routers.forEach((i, a) => {
            i.meta.addon !== "" && (i.children && i.children.length ? this.addonIndexRoute[i.meta.addon] = findFirstValidRoute(i.children) : this.addonIndexRoute[i.meta.addon] = i.name);
          }), this.rules = findRules(s.data), n(s);
        }).catch((s) => {
          r(s);
        });
      });
    },
    setUserInfo(n) {
      this.userInfo = n, storage.set({ key: "userinfo", data: n });
    }
  }
}), useUserStore = userStore;
class ErrorResponse {
  constructor(r, s, i) {
    O(this, "msg", "");
    O(this, "code", 0);
    O(this, "response", null);
    typeof r == "number" ? (this.code = r, this.msg = s || "", this.response = i) : (this.msg = r || "", this.code = 0, this.response = null);
  }
}
class Request {
  constructor() {
    O(this, "instance");
    O(this, "messageCache", /* @__PURE__ */ new Map());
    O(this, "CACHE_EXPIRY", 5e3);
    // 5秒内重复内容不再弹出，可自定义过期时间
    O(this, "MAX_CACHE_SIZE", 100);
    this.instance = axios$2.create({
      baseURL: envConfig.VITE_APP_BASE_URL.substr(-1) == "/" ? envConfig.VITE_APP_BASE_URL : `${envConfig.VITE_APP_BASE_URL}/`,
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
          const s = r.data;
          return s.code != 1 ? (this.handleAuthError(s.code), s.code != 401 && r.config.showErrorMessage !== !1 && this.showElMessage({ message: s.msg, type: "error", dangerouslyUseHTMLString: !0, duration: 5e3 }), Promise.reject(s)) : (r.config.showSuccessMessage && ElMessage({ message: s.msg, type: "success" }), s);
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
  get(r, s) {
    return this.instance.get(r, s);
  }
  /**
   * 发送post请求
   * @param url
   * @param data
   * @param config
   * @returns
   */
  post(r, s, i) {
    return this.instance.post(r, s, i);
  }
  /**
   * 发送put请求
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put(r, s, i) {
    return this.instance.put(r, s, i);
  }
  /**
   * 发送delete请求
   * @param url
   * @param config
   * @returns
   */
  delete(r, s) {
    return this.instance.delete(r, s);
  }
  /**
   * 处理网络请求错误
   * @param err
   */
  handleNetworkError(r) {
    let s = "";
    if (r.response && r.response.status)
      switch (r.response.status) {
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
          s = (isUrl(r.response.config.baseURL) ? r.response.config.baseURL : `${location.origin}${r.response.config.baseURL}`) + t$1("axios.baseUrlError");
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
    r.message.includes("timeout") && (s = t$1("axios.timeout")), r.code == "ERR_NETWORK" && (s = (isUrl(r.config.baseURL) ? r.config.baseURL : `${location.origin}${r.config.baseURL}`) + t$1("axios.baseUrlError")), s && this.showElMessage({ dangerouslyUseHTMLString: !0, duration: 5e3, message: s, type: "error" });
  }
  handleAuthError(r) {
    switch (r) {
      case 401:
        useUserStore().logout();
        break;
    }
  }
  showElMessage(r) {
    const s = r.message, i = Date.now(), a = this.messageCache.get(s);
    if ((!a || i - a.timestamp > this.CACHE_EXPIRY) && (this.messageCache.set(s, { timestamp: i }), ElMessage(r)), this.messageCache.size > this.MAX_CACHE_SIZE)
      for (const [u, l] of this.messageCache.entries())
        i - l.timestamp > this.CACHE_EXPIRY && this.messageCache.delete(u);
  }
}
const request = new Request(), coreVueModules = {
  .../* @__PURE__ */ Object.assign({ "../app/components/cloud-build/index.vue": () => import("./index-97f1117f.js"), "../app/components/upgrade-log/index.vue": () => import("./index-5eacfa37.js"), "../app/components/upgrade/index.vue": () => import("./index-14321927.js"), "../app/components/user-info-edit/index.vue": () => import("./index-a4c1f6a5.js"), "../app/components/weappupload/index.vue": () => import("./index-359094f8.js"), "../app/views/app/authorize.vue": () => import("./authorize-3e5a3d56.js"), "../app/views/app/index.vue": () => import("./index-da0f5b05.js"), "../app/views/app/marketing.vue": () => import("./marketing-f612096b.js"), "../app/views/app/upgrade.vue": () => import("./upgrade-5911994f.js"), "../app/views/auth/components/edit-menu.vue": () => import("./edit-menu-fc28b7be.js"), "../app/views/auth/components/edit-role.vue": () => import("./edit-role-04e131b4.js"), "../app/views/auth/components/edit-user.vue": () => import("./edit-user-5ea50da8.js"), "../app/views/auth/components/select-menu-item.vue": () => import("./select-menu-item-65e666c1.js"), "../app/views/auth/components/user-log-detail.vue": () => import("./user-log-detail-98c9db5e.js"), "../app/views/auth/log.vue": () => import("./log-df767ace.js"), "../app/views/auth/menu.vue": () => import("./menu-95f7eca1.js"), "../app/views/auth/role.vue": () => import("./role-dda6aa9c.js"), "../app/views/auth/site_menu.vue": () => import("./site_menu-8f5c2824.js"), "../app/views/auth/user.vue": () => import("./user-7bffda9e.js"), "../app/views/channel/aliapp/access.vue": () => import("./access-e1d85b87.js"), "../app/views/channel/aliapp/config.vue": () => import("./config-b512046a.js"), "../app/views/channel/aliapp/course.vue": () => import("./course-b0dccf33.js"), "../app/views/channel/app/access.vue": () => import("./access-60eb032a.js"), "../app/views/channel/app/components/app-version-edit.vue": () => import("./app-version-edit-0b6e8afb.js"), "../app/views/channel/app/components/generate-sing-cert.vue": () => import("./generate-sing-cert-5a0268e6.js"), "../app/views/channel/app/config.vue": () => import("./config-dddd9406.js"), "../app/views/channel/app/version.vue": () => import("./version-d680bcf4.js"), "../app/views/channel/h5/config.vue": () => import("./config-20a36cf5.js"), "../app/views/channel/pc/config.vue": () => import("./config-d0d4e1c2.js"), "../app/views/channel/weapp/access.vue": () => import("./access-f2c52218.js"), "../app/views/channel/weapp/code.vue": () => import("./code-611bbbcc.js"), "../app/views/channel/weapp/components/modify-domain.vue": () => import("./modify-domain-8deb59be.js"), "../app/views/channel/weapp/components/modify-privacy-agreement.vue": () => import("./modify-privacy-agreement-56bc7d33.js"), "../app/views/channel/weapp/components/setting-list.vue": () => import("./setting-list-0aa4b556.js"), "../app/views/channel/weapp/config.vue": () => import("./config-f6e030a9.js"), "../app/views/channel/weapp/course.vue": () => import("./course-fe0c56fb.js"), "../app/views/channel/weapp/template.vue": () => import("./template-b49f66a2.js"), "../app/views/channel/wechat/access.vue": () => import("./access-93deaaeb.js"), "../app/views/channel/wechat/components/menu-form.vue": () => import("./menu-form-ebd3b7a4.js"), "../app/views/channel/wechat/components/news-card.vue": () => import("./news-card-02bb87da.js"), "../app/views/channel/wechat/components/reply-form.vue": () => import("./reply-form-06ea2b28.js"), "../app/views/channel/wechat/components/select-wechat-media.vue": () => import("./select-wechat-media-83cb817e.js"), "../app/views/channel/wechat/components/upload-media.vue": () => import("./upload-media-bff7198d.js"), "../app/views/channel/wechat/config.vue": () => import("./config-14e976ed.js"), "../app/views/channel/wechat/course.vue": () => import("./course-b9b0fb6e.js"), "../app/views/channel/wechat/keyword_reply_edit.vue": () => import("./keyword_reply_edit-dbde1e7d.js"), "../app/views/channel/wechat/menu.vue": () => import("./menu-1eec2a3b.js"), "../app/views/channel/wechat/reply.vue": () => import("./reply-68139636.js"), "../app/views/channel/wechat/template.vue": () => import("./template-6f51c492.js"), "../app/views/dict/components/dict.vue": () => import("./dict-1d6180fb.js"), "../app/views/dict/components/edit.vue": () => import("./edit-43f2a0a8.js"), "../app/views/dict/list.vue": () => import("./list-cc3ae484.js"), "../app/views/diy/components/add-theme.vue": () => import("./add-theme-87ca9b68.js").then((n) => n._), "../app/views/diy/components/edit-active-cube.vue": () => import("./edit-active-cube-9bcbe25d.js").then((n) => n._), "../app/views/diy/components/edit-carousel-search.vue": () => import("./edit-carousel-search-892e5e9c.js").then((n) => n._), "../app/views/diy/components/edit-float-btn.vue": () => import("./edit-float-btn-5e5b2cab.js").then((n) => n._), "../app/views/diy/components/edit-graphic-nav.vue": () => import("./edit-graphic-nav-7321efa2.js").then((n) => n._), "../app/views/diy/components/edit-horz-blank.vue": () => import("./edit-horz-blank-f3722953.js").then((n) => n._), "../app/views/diy/components/edit-horz-line.vue": () => import("./edit-horz-line-fa3c85bb.js").then((n) => n._), "../app/views/diy/components/edit-hot-area.vue": () => import("./edit-hot-area-b2bd92ab.js").then((n) => n._), "../app/views/diy/components/edit-image-ads.vue": () => import("./edit-image-ads-eb9c375b.js").then((n) => n._), "../app/views/diy/components/edit-member-info.vue": () => import("./edit-member-info-3ef09666.js").then((n) => n._), "../app/views/diy/components/edit-member-level.vue": () => import("./edit-member-level-32a470fe.js").then((n) => n._), "../app/views/diy/components/edit-notice.vue": () => import("./edit-notice-606ae324.js").then((n) => n._), "../app/views/diy/components/edit-page.vue": () => import("./edit-page-7585a1ef.js").then((n) => n._), "../app/views/diy/components/edit-picture-show.vue": () => import("./edit-picture-show-86c57e87.js").then((n) => n._), "../app/views/diy/components/edit-rich-text.vue": () => import("./edit-rich-text-fec21252.js").then((n) => n._), "../app/views/diy/components/edit-rubik-cube.vue": () => import("./edit-rubik-cube-d3332cc3.js").then((n) => n._), "../app/views/diy/components/edit-text.vue": () => import("./edit-text-86d9b855.js").then((n) => n._), "../app/views/diy/components/edit-theme.vue": () => import("./edit-theme-2c374d8d.js").then((n) => n._), "../app/views/diy/components/tabbar-select-popup.vue": () => import("./tabbar-select-popup-1ee57b81.js").then((n) => n._), "../app/views/diy/components/theme-list.vue": () => import("./theme-list-3edf0961.js").then((n) => n._), "../app/views/diy/edit.vue": () => import("./edit-2b5bb38d.js"), "../app/views/diy/index.vue": () => import("./index-e3ead122.js"), "../app/views/diy/list.vue": () => import("./list-e4bbc002.js"), "../app/views/diy/member.vue": () => import("./member-6c99c34f.js"), "../app/views/diy/route.vue": () => import("./route-0115f1e6.js"), "../app/views/diy/tabbar.vue": () => import("./tabbar-a887717b.js"), "../app/views/diy/tabbar_edit.vue": () => import("./tabbar_edit-2189b619.js"), "../app/views/diy/theme_style.vue": () => import("./theme_style-ff45946a.js"), "../app/views/diy_form/components/detail-form-image.vue": () => import("./detail-form-image-86708a4a.js").then((n) => n._), "../app/views/diy_form/components/detail-form-render.vue": () => import("./detail-form-render-74a87168.js").then((n) => n._), "../app/views/diy_form/components/edit-form-address.vue": () => import("./edit-form-address-2b16e1da.js").then((n) => n._), "../app/views/diy_form/components/edit-form-checkbox.vue": () => import("./edit-form-checkbox-f2d649d5.js").then((n) => n._), "../app/views/diy_form/components/edit-form-date-scope.vue": () => import("./edit-form-date-scope-da447e7d.js").then((n) => n._), "../app/views/diy_form/components/edit-form-date.vue": () => import("./edit-form-date-3c426e88.js").then((n) => n._), "../app/views/diy_form/components/edit-form-email.vue": () => import("./edit-form-email-a89041ca.js").then((n) => n._), "../app/views/diy_form/components/edit-form-file.vue": () => import("./edit-form-file-8d8b9f0b.js").then((n) => n._), "../app/views/diy_form/components/edit-form-identity.vue": () => import("./edit-form-identity-ab435ad2.js").then((n) => n._), "../app/views/diy_form/components/edit-form-image.vue": () => import("./edit-form-image-51e15ad8.js").then((n) => n._), "../app/views/diy_form/components/edit-form-input.vue": () => import("./edit-form-input-59ee06f6.js").then((n) => n._), "../app/views/diy_form/components/edit-form-location.vue": () => import("./edit-form-location-28ef4233.js").then((n) => n._), "../app/views/diy_form/components/edit-form-mobile.vue": () => import("./edit-form-mobile-f5f56ad6.js").then((n) => n._), "../app/views/diy_form/components/edit-form-number.vue": () => import("./edit-form-number-c1bda624.js").then((n) => n._), "../app/views/diy_form/components/edit-form-radio.vue": () => import("./edit-form-radio-33ae33a9.js").then((n) => n._), "../app/views/diy_form/components/edit-form-submit.vue": () => import("./edit-form-submit-03989e61.js").then((n) => n._), "../app/views/diy_form/components/edit-form-table.vue": () => import("./edit-form-table-1d75af2a.js").then((n) => n._), "../app/views/diy_form/components/edit-form-textarea.vue": () => import("./edit-form-textarea-76dfc30d.js").then((n) => n._), "../app/views/diy_form/components/edit-form-time-scope.vue": () => import("./edit-form-time-scope-81615498.js").then((n) => n._), "../app/views/diy_form/components/edit-form-time.vue": () => import("./edit-form-time-ec43dc00.js").then((n) => n._), "../app/views/diy_form/components/edit-form-video.vue": () => import("./edit-form-video-14c87495.js").then((n) => n._), "../app/views/diy_form/components/edit-form-wechat-name.vue": () => import("./edit-form-wechat-name-e878834e.js").then((n) => n._), "../app/views/diy_form/components/form-select-content.vue": () => import("./form-select-content-e519b685.js").then((n) => n._), "../app/views/diy_form/components/form-submit-popup.vue": () => import("./form-submit-popup-aca19a12.js").then((n) => n._), "../app/views/diy_form/components/form-write-popup.vue": () => import("./form-write-popup-4eebf21a.js").then((n) => n._), "../app/views/diy_form/edit.vue": () => import("./edit-b276cd37.js"), "../app/views/diy_form/list.vue": () => import("./list-eb98416c.js"), "../app/views/diy_form/records.vue": () => import("./records-b23b7311.js"), "../app/views/error/404.vue": () => import("./404-7a562be5.js"), "../app/views/finance/account.vue": () => import("./account-eeb8e85e.js"), "../app/views/finance/cash_out.vue": () => import("./cash_out-6df93871.js"), "../app/views/finance/components/refund-detail.vue": () => import("./refund-detail-22b1f79e.js"), "../app/views/finance/offlinepay.vue": () => import("./offlinepay-7d38a3cb.js"), "../app/views/finance/pay_detail.vue": () => import("./pay_detail-21fe8ef5.js"), "../app/views/finance/pay_refund.vue": () => import("./pay_refund-09daee80.js"), "../app/views/finance/refund_detail.vue": () => import("./refund_detail-b46f051f.js"), "../app/views/home/edit_personal.vue": () => import("./edit_personal-412dc6c3.js"), "../app/views/home/index.vue": () => import("./index-87dc4e9b.js"), "../app/views/home/personal.vue": () => import("./personal-2be8ff37.js"), "../app/views/index/app_manage.vue": () => import("./app_manage-4238dbc8.js"), "../app/views/index/index.vue": () => import("./index-c20c02aa.js"), "../app/views/index/preview.vue": () => import("./preview-1c1cb070.js"), "../app/views/index/store.vue": () => import("./store-cfec5831.js"), "../app/views/index/tools.vue": () => import("./tools-6068d4ea.js"), "../app/views/index/wxoplatform_callback.vue": () => import("./wxoplatform_callback-cc5b3a07.js"), "../app/views/login/index.vue": () => import("./index-8b459a5e.js"), "../app/views/marketing/components/sign-continue.vue": () => import("./sign-continue-6c9823a6.js"), "../app/views/marketing/components/sign-day.vue": () => import("./sign-day-1ab979d7.js"), "../app/views/marketing/components/verify-detail.vue": () => import("./verify-detail-3b63166b.js"), "../app/views/marketing/sign_config.vue": () => import("./sign_config-f9722705.js"), "../app/views/marketing/sign_list.vue": () => import("./sign_list-462f139c.js"), "../app/views/marketing/verifier.vue": () => import("./verifier-6fdac647.js"), "../app/views/marketing/verify.vue": () => import("./verify-ce133741.js"), "../app/views/marketing/verify_detail.vue": () => import("./verify_detail-4336a12f.js"), "../app/views/marketing/verify_index.vue": () => import("./verify_index-6d67e8c8.js"), "../app/views/member/balance.vue": () => import("./balance-6e81e459.js"), "../app/views/member/commission.vue": () => import("./commission-5b9c6d20.js"), "../app/views/member/components/add-member.vue": () => import("./add-member-cd98e78c.js"), "../app/views/member/components/benefits-discount.vue": () => import("./benefits-discount-edd05f88.js"), "../app/views/member/components/detail-member.vue": () => import("./detail-member-6772c14a.js"), "../app/views/member/components/edit-label.vue": () => import("./edit-label-9827793e.js"), "../app/views/member/components/edit-member.vue": () => import("./edit-member-60b03a9d.js"), "../app/views/member/components/gift-balance.vue": () => import("./gift-balance-0dd7f9f5.js"), "../app/views/member/components/gift-point.vue": () => import("./gift-point-61d39e79.js"), "../app/views/member/components/growth-rule-register.vue": () => import("./growth-rule-register-c181e182.js"), "../app/views/member/components/member-balance-edit.vue": () => import("./member-balance-edit-058f2e00.js"), "../app/views/member/components/member-balance-info.vue": () => import("./member-balance-info-9f4e37cc.js"), "../app/views/member/components/member-benefits.vue": () => import("./member-benefits-ad978bd9.js"), "../app/views/member/components/member-commission-info.vue": () => import("./member-commission-info-0763a6c9.js"), "../app/views/member/components/member-gift.vue": () => import("./member-gift-d8c4fbb3.js"), "../app/views/member/components/member-money-info.vue": () => import("./member-money-info-178076aa.js"), "../app/views/member/components/member-point-edit.vue": () => import("./member-point-edit-5253cc30.js"), "../app/views/member/components/member-point-info.vue": () => import("./member-point-info-8e730230.js"), "../app/views/member/components/point-rule-register.vue": () => import("./point-rule-register-7e2563a7.js"), "../app/views/member/growth.vue": () => import("./growth-ed792a7c.js"), "../app/views/member/label.vue": () => import("./label-bb3587d4.js"), "../app/views/member/level.vue": () => import("./level-87c0286c.js"), "../app/views/member/level_edit.vue": () => import("./level_edit-653119c0.js"), "../app/views/member/member.vue": () => import("./member-0b4658c6.js"), "../app/views/member/member_detail.vue": () => import("./member_detail-1218f831.js"), "../app/views/member/point.vue": () => import("./point-a77b5500.js"), "../app/views/poster/components/edit-draw.vue": () => import("./edit-draw-c31eafad.js").then((n) => n._), "../app/views/poster/components/edit-friendspay-message.vue": () => import("./edit-friendspay-message-f4877abc.js").then((n) => n._), "../app/views/poster/components/edit-friendspay-money.vue": () => import("./edit-friendspay-money-2010cabe.js").then((n) => n._), "../app/views/poster/components/edit-headimg.vue": () => import("./edit-headimg-1596273d.js").then((n) => n._), "../app/views/poster/components/edit-image.vue": () => import("./edit-image-0b1f1949.js").then((n) => n._), "../app/views/poster/components/edit-nickname.vue": () => import("./edit-nickname-df3fb5b9.js").then((n) => n._), "../app/views/poster/components/edit-page.vue": () => import("./edit-page-1aaf1215.js").then((n) => n._), "../app/views/poster/components/edit-qrcode.vue": () => import("./edit-qrcode-c1343f70.js").then((n) => n._), "../app/views/poster/components/edit-text.vue": () => import("./edit-text-6bcd22e5.js").then((n) => n._), "../app/views/poster/components/preview-draw.vue": () => import("./preview-draw-25b2d4c7.js").then((n) => n._), "../app/views/poster/components/preview-friendspay-message.vue": () => import("./preview-friendspay-message-e35effe9.js").then((n) => n._), "../app/views/poster/components/preview-friendspay-money.vue": () => import("./preview-friendspay-money-f80fe0ff.js").then((n) => n._), "../app/views/poster/components/preview-headimg.vue": () => import("./preview-headimg-1b99f9c0.js").then((n) => n._), "../app/views/poster/components/preview-image.vue": () => import("./preview-image-d7f564a1.js").then((n) => n._), "../app/views/poster/components/preview-nickname.vue": () => import("./preview-nickname-b33123eb.js").then((n) => n._), "../app/views/poster/components/preview-qrcode.vue": () => import("./preview-qrcode-e34ffd3a.js").then((n) => n._), "../app/views/poster/components/preview-text.vue": () => import("./preview-text-500cfa6a.js").then((n) => n._), "../app/views/poster/edit.vue": () => import("./edit-55a37193.js"), "../app/views/poster/list.vue": () => import("./list-31bc5992.js"), "../app/views/printer/edit.vue": () => import("./edit-f8fde35a.js"), "../app/views/printer/list.vue": () => import("./list-acdbf0df.js"), "../app/views/printer/template_edit.vue": () => import("./template_edit-c24156fd.js"), "../app/views/printer/template_list.vue": () => import("./template_list-af86e909.js"), "../app/views/setting/adminlogin.vue": () => import("./adminlogin-e1b18968.js"), "../app/views/setting/agreement.vue": () => import("./agreement-24d49d9f.js"), "../app/views/setting/agreement_edit.vue": () => import("./agreement_edit-e5e17bc8.js"), "../app/views/setting/cash_out.vue": () => import("./cash_out-1ccb6889.js"), "../app/views/setting/components/cron-info.vue": () => import("./cron-info-e0af8563.js"), "../app/views/setting/components/notice-records-info.vue": () => import("./notice-records-info-96e93baf.js"), "../app/views/setting/components/notice-sms.vue": () => import("./notice-sms-4543325e.js"), "../app/views/setting/components/notice-weapp.vue": () => import("./notice-weapp-7021c33d.js"), "../app/views/setting/components/notice-wechat.vue": () => import("./notice-wechat-ad34ae46.js"), "../app/views/setting/components/pay-alipay.vue": () => import("./pay-alipay-8d092b27.js"), "../app/views/setting/components/pay-friendspay.vue": () => import("./pay-friendspay-a27cc992.js"), "../app/views/setting/components/pay-offlinepay.vue": () => import("./pay-offlinepay-82b46b60.js"), "../app/views/setting/components/pay-wechatpay.vue": () => import("./pay-wechatpay-85a536d0.js"), "../app/views/setting/components/sms-ali.vue": () => import("./sms-ali-eadcdbff.js"), "../app/views/setting/components/sms-niu.vue": () => import("./sms-niu-9fe8d217.js"), "../app/views/setting/components/sms-records-info.vue": () => import("./sms-records-info-3193a372.js"), "../app/views/setting/components/sms-tencent.vue": () => import("./sms-tencent-e631c55d.js"), "../app/views/setting/components/sms_niu_login.vue": () => import("./sms_niu_login-73185314.js"), "../app/views/setting/components/sms_recharge.vue": () => import("./sms_recharge-7007d46c.js"), "../app/views/setting/components/sms_recharge_record.vue": () => import("./sms_recharge_record-2ebd86eb.js"), "../app/views/setting/components/sms_send.vue": () => import("./sms_send-67ef29c7.js"), "../app/views/setting/components/sms_signature.vue": () => import("./sms_signature-f8233c17.js"), "../app/views/setting/components/sms_template.vue": () => import("./sms_template-8444119b.js"), "../app/views/setting/components/storage-ali.vue": () => import("./storage-ali-17d4672a.js"), "../app/views/setting/components/storage-local.vue": () => import("./storage-local-bb981f32.js"), "../app/views/setting/components/storage-qiniu.vue": () => import("./storage-qiniu-97ab78cf.js"), "../app/views/setting/components/storage-tencent.vue": () => import("./storage-tencent-348eab63.js"), "../app/views/setting/copyright.vue": () => import("./copyright-653d95a1.js"), "../app/views/setting/developer_token.vue": () => import("./developer_token-2ab27f14.js"), "../app/views/setting/export.vue": () => import("./export-c7d091f4.js"), "../app/views/setting/growth_rule.vue": () => import("./growth_rule-4bae22c2.js"), "../app/views/setting/layout.vue": () => import("./layout-9e066e08.js"), "../app/views/setting/login.vue": () => import("./login-a254a0a1.js"), "../app/views/setting/map.vue": () => import("./map-b75a6ad1.js"), "../app/views/setting/member.vue": () => import("./member-780bf22b.js"), "../app/views/setting/notice.vue": () => import("./notice-c0f46f92.js"), "../app/views/setting/notice_records.vue": () => import("./notice_records-40d2f329.js"), "../app/views/setting/oplatform.vue": () => import("./oplatform-1cd35052.js"), "../app/views/setting/pay.vue": () => import("./pay-f27ae601.js"), "../app/views/setting/point_rule.vue": () => import("./point_rule-7fae237b.js"), "../app/views/setting/sms.vue": () => import("./sms-9b936dc3.js"), "../app/views/setting/sms_niu.vue": () => import("./sms_niu-0046aa72.js"), "../app/views/setting/sms_niu_pay_result.vue": () => import("./sms_niu_pay_result-bd24aa44.js"), "../app/views/setting/sms_records.vue": () => import("./sms_records-2010b4a5.js"), "../app/views/setting/storage.vue": () => import("./storage-47adc78f.js"), "../app/views/setting/system.vue": () => import("./system-d28a703f.js"), "../app/views/setting/transfer.vue": () => import("./transfer-c80c9f67.js"), "../app/views/setting/transfer_scene.vue": () => import("./transfer_scene-8af5f12d.js"), "../app/views/setting/weapp.vue": () => import("./weapp-38b5511f.js"), "../app/views/site/components/create-site-limit.vue": () => import("./create-site-limit-3d9e314c.js"), "../app/views/site/components/edit-site.vue": () => import("./edit-site-474ea3cc.js"), "../app/views/site/components/user-edit.vue": () => import("./user-edit-d11636f0.js"), "../app/views/site/components/user-info.vue": () => import("./user-info-715f33b3.js"), "../app/views/site/group.vue": () => import("./group-8cb077cc.js"), "../app/views/site/group_edit.vue": () => import("./group_edit-25058df1.js"), "../app/views/site/info.vue": () => import("./info-04345a64.js"), "../app/views/site/list.vue": () => import("./list-c99672dd.js"), "../app/views/site/manage.vue": () => import("./manage-11571852.js"), "../app/views/site/user.vue": () => import("./user-1e03779b.js"), "../app/views/site/user_info.vue": () => import("./user_info-7b86fa01.js"), "../app/views/tools/addon/edit.vue": () => import("./edit-d739787b.js"), "../app/views/tools/addon/index.vue": () => import("./index-66fa9a5b.js"), "../app/views/tools/addon/list.vue": () => import("./list-63b73010.js"), "../app/views/tools/attachment.vue": () => import("./attachment-8abcfe97.js"), "../app/views/tools/backup_records.vue": () => import("./backup_records-3ddfa069.js"), "../app/views/tools/cloud_compile.vue": () => import("./cloud_compile-7b6686a2.js"), "../app/views/tools/code/components/add-table.vue": () => import("./add-table-f16aaafe.js"), "../app/views/tools/code/components/edit-associated.vue": () => import("./edit-associated-c8f3b1df.js"), "../app/views/tools/code/components/edit-verify.vue": () => import("./edit-verify-ef5caf86.js"), "../app/views/tools/code/components/edit-view-type.vue": () => import("./edit-view-type-74d5e9bf.js"), "../app/views/tools/code/edit.vue": () => import("./edit-23b5721d.js"), "../app/views/tools/code/index.vue": () => import("./index-3cea8718.js"), "../app/views/tools/code/list.vue": () => import("./list-7c7ac0ba.js"), "../app/views/tools/detection.vue": () => import("./detection-127e6c0f.js"), "../app/views/tools/schedule.vue": () => import("./schedule-cadd4441.js"), "../app/views/tools/schedule_log.vue": () => import("./schedule_log-3a20228f.js"), "../app/views/tools/updatecache.vue": () => import("./updatecache-3528a416.js"), "../app/views/tools/upgrade_records.vue": () => import("./upgrade_records-136cf12e.js"), "../app/views/wxoplatform/setting.vue": () => import("./setting-7a30ddb3.js"), "../app/views/wxoplatform/weapp_version.vue": () => import("./weapp_version-206b8009.js") }),
  .../* @__PURE__ */ Object.assign({ "../components/diy-link/index.vue": () => import("./index-b022467f.js"), "../components/diy-page/index.vue": () => Promise.resolve().then(() => index$1), "../components/editor/index.vue": () => import("./index-7ab86cb4.js"), "../components/export-sure/index.vue": () => import("./index-4f2fccff.js"), "../components/heat-map/index.vue": () => import("./index-01c86891.js"), "../components/icon/index.vue": () => import("./index-9c1a7b4f.js"), "../components/map-selector/index.vue": () => import("./index-c60f839f.js"), "../components/markdown/index.vue": () => import("./index-a4552fef.js"), "../components/popover-input/index.vue": () => import("./index-ca313907.js"), "../components/range-input/index.vue": () => import("./index-6f9975ac.js"), "../components/select-area/index.vue": () => import("./index-c5891858.js"), "../components/select-icon/index.vue": () => import("./index-2f6fb241.js"), "../components/spread-popup/index.vue": () => import("./index-4fc2683a.js"), "../components/upload-attachment/attachment.vue": () => import("./attachment-a8905dd7.js"), "../components/upload-attachment/index.vue": () => import("./index-e20d35ec.js"), "../components/upload-audio/index.vue": () => import("./index-e4b8a6c8.js"), "../components/upload-file/index.vue": () => import("./index-a24a85e8.js"), "../components/upload-image/index.vue": () => Promise.resolve().then(() => index$3), "../components/upload-video/index.vue": () => import("./index-729cac50.js"), "../components/verifition/Verify.vue": () => import("./Verify-206140da.js"), "../components/verifition/Verify/VerifyPoints.vue": () => import("./VerifyPoints-aea394bd.js"), "../components/verifition/Verify/VerifySlide.vue": () => import("./VerifySlide-2ebc7eda.js"), "../components/video-player/index.vue": () => import("./index-11ad8ccf.js") }),
  .../* @__PURE__ */ Object.assign({ "../layout/admin/components/aside/index.vue": () => import("./index-0f6829aa.js"), "../layout/admin/components/aside/menu-item.vue": () => import("./menu-item-a19693ae.js"), "../layout/admin/components/aside/side.vue": () => import("./side-66d8c6fc.js"), "../layout/admin/components/header/index.vue": () => import("./index-f068a6c6.js"), "../layout/admin/components/header/layout-setting.vue": () => import("./layout-setting-9922fda2.js"), "../layout/admin/components/header/message.vue": () => import("./message-32c56eab.js"), "../layout/admin/components/header/switch-lang.vue": () => import("./switch-lang-3dac2570.js"), "../layout/admin/components/header/user-info.vue": () => import("./user-info-b2d4dc7b.js"), "../layout/admin/components/tabs.vue": () => import("./tabs-550e76fd.js"), "../layout/admin/index.vue": () => import("./index-d015c1fa.js"), "../layout/admin_simplicity/components/aside/index.vue": () => import("./index-4e84dc9a.js"), "../layout/admin_simplicity/components/aside/menu-item.vue": () => import("./menu-item-d9725e9f.js"), "../layout/admin_simplicity/components/aside/side.vue": () => import("./side-7445a8d8.js"), "../layout/admin_simplicity/components/header/index.vue": () => import("./index-d377ff08.js"), "../layout/admin_simplicity/components/header/layout-setting.vue": () => import("./layout-setting-5140541a.js"), "../layout/admin_simplicity/components/header/message.vue": () => import("./message-38fd10e0.js"), "../layout/admin_simplicity/components/header/switch-lang.vue": () => import("./switch-lang-d5ebd978.js"), "../layout/admin_simplicity/components/header/user-info.vue": () => import("./user-info-ee980f67.js"), "../layout/admin_simplicity/components/tabs.vue": () => import("./tabs-01a20009.js"), "../layout/admin_simplicity/index.vue": () => import("./index-ff0d09f6.js"), "../layout/bussiness/components/aside/index.vue": () => import("./index-c3d5d4e7.js"), "../layout/bussiness/components/aside/menu-item.vue": () => import("./menu-item-e0d47a81.js"), "../layout/bussiness/components/aside/side.vue": () => import("./side-fbbdbfe8.js"), "../layout/bussiness/components/header/index.vue": () => import("./index-c0bfd060.js"), "../layout/bussiness/components/header/layout-setting.vue": () => import("./layout-setting-6521991c.js"), "../layout/bussiness/components/header/switch-lang.vue": () => import("./switch-lang-40a7f6bc.js"), "../layout/bussiness/components/header/user-info.vue": () => import("./user-info-09e737d8.js"), "../layout/bussiness/components/tabs.vue": () => import("./tabs-d4c438a0.js"), "../layout/bussiness/index.vue": () => import("./index-3168607f.js"), "../layout/darkside/components/aside/index.vue": () => import("./index-5c60677d.js"), "../layout/darkside/components/aside/menu-item.vue": () => import("./menu-item-19ded380.js"), "../layout/darkside/components/aside/side.vue": () => import("./side-d414f382.js"), "../layout/darkside/components/header/index.vue": () => import("./index-eea7bbab.js"), "../layout/darkside/components/header/layout-setting.vue": () => import("./layout-setting-8d9707a4.js"), "../layout/darkside/components/header/switch-lang.vue": () => import("./switch-lang-b0cdc05f.js"), "../layout/darkside/components/header/user-info.vue": () => import("./user-info-c7cf034d.js"), "../layout/darkside/components/tabs.vue": () => import("./tabs-35b5ce71.js"), "../layout/darkside/index.vue": () => import("./index-a507d46e.js"), "../layout/decorate/index.vue": () => import("./index-0beb16ce.js"), "../layout/default/components/aside/index.vue": () => import("./index-3ee0fbb1.js"), "../layout/default/components/aside/menu-item.vue": () => import("./menu-item-b57be1e4.js"), "../layout/default/components/aside/side.vue": () => import("./side-e5be7d6a.js"), "../layout/default/components/header/index.vue": () => import("./index-38a76610.js"), "../layout/default/components/header/layout-setting.vue": () => import("./layout-setting-9b59ab50.js"), "../layout/default/components/header/switch-lang.vue": () => import("./switch-lang-43b1a8af.js"), "../layout/default/components/header/user-info.vue": () => import("./user-info-4375b5b7.js"), "../layout/default/components/tabs.vue": () => import("./tabs-8c659c8e.js"), "../layout/default/index.vue": () => import("./index-df32d8d8.js"), "../layout/index.vue": () => import("./index-8825ac7a.js"), "../layout/lightside/components/aside/index.vue": () => import("./index-2dbf12f9.js"), "../layout/lightside/components/aside/menu-item.vue": () => import("./menu-item-04ff052c.js"), "../layout/lightside/components/aside/side.vue": () => import("./side-bdbe0c93.js"), "../layout/lightside/components/header/index.vue": () => import("./index-36f321c4.js"), "../layout/lightside/components/header/layout-setting.vue": () => import("./layout-setting-32bafaa2.js"), "../layout/lightside/components/header/switch-lang.vue": () => import("./switch-lang-635683d2.js"), "../layout/lightside/components/header/user-info.vue": () => import("./user-info-2eb8f860.js"), "../layout/lightside/components/tabs.vue": () => import("./tabs-5ac19731.js"), "../layout/lightside/index.vue": () => import("./index-a191f4d5.js"), "../layout/profession/components/aside/index.vue": () => import("./index-253be94d.js"), "../layout/profession/components/aside/menu-item.vue": () => import("./menu-item-78a4d2c5.js"), "../layout/profession/components/aside/side.vue": () => import("./side-dea7868a.js"), "../layout/profession/components/header/index.vue": () => import("./index-1b5f6d89.js"), "../layout/profession/components/header/layout-setting.vue": () => import("./layout-setting-2e381ed3.js"), "../layout/profession/components/header/switch-lang.vue": () => import("./switch-lang-637bd885.js"), "../layout/profession/components/header/user-info.vue": () => import("./user-info-62c890e4.js"), "../layout/profession/components/tabs.vue": () => import("./tabs-9751bc1f.js"), "../layout/profession/index.vue": () => import("./index-f609671a.js"), "../layout/routine/components/aside/index.vue": () => import("./index-f32d629c.js"), "../layout/routine/components/aside/menu-item.vue": () => import("./menu-item-0d844cce.js"), "../layout/routine/components/aside/side.vue": () => import("./side-36ea9deb.js"), "../layout/routine/components/header/index.vue": () => import("./index-20b5031b.js"), "../layout/routine/components/header/layout-setting.vue": () => import("./layout-setting-bcd22e00.js"), "../layout/routine/components/header/switch-lang.vue": () => import("./switch-lang-d4ab6058.js"), "../layout/routine/components/header/user-info.vue": () => import("./user-info-d160ef61.js"), "../layout/routine/components/tabs.vue": () => import("./tabs-fb0aa83e.js"), "../layout/routine/index.vue": () => import("./index-113b6e1a.js") })
};
function normalizeComponentKey(n) {
  return n.replace(/^@\//, "").replace(/^\/src\//, "").replace(/^\.\.\//, "").replace(/\\/g, "/");
}
function findCoreModuleLoader(n) {
  const r = coreVueModules;
  if (r[n])
    return r[n];
  const s = normalizeComponentKey(n), i = Object.keys(r).find((a) => normalizeComponentKey(a) === s || normalizeComponentKey(a).endsWith(`/${s}`));
  return i ? r[i] : void 0;
}
function resolveAsyncComponent(n) {
  return defineAsyncComponent(async () => {
    const r = findCoreModuleLoader(n);
    return r ? (await r()).default : (await loadCoreVueModule(n)).default;
  });
}
async function loadCoreVueModule(n) {
  const r = findCoreModuleLoader(n);
  if (r)
    return r();
  throw new Error(`Component not found: ${n}`);
}
const MainJS = "CLodopfuncs.js", URL_WS1 = ref("ws://localhost:{port}/" + MainJS), URL_WS2 = ref("ws://localhost:{port}/" + MainJS), URL_HTTP1 = ref("http://localhost:{port}/" + MainJS), URL_HTTP2 = ref("http://localhost:{port}/" + MainJS), URL_HTTP3 = ref("https://localhost.lodop.net:{port}/" + MainJS), CreatedOKLodopObject = ref(null), CLodopIsLocal = ref(null), LoadJsState = ref(""), initPort = (n) => {
  n || (n = {
    server_port1: 8e3,
    server_port2: 18e3,
    https_port: 8443
  }), URL_WS1.value = URL_WS1.value.replace("{port}", n.server_port1), URL_WS2.value = URL_WS2.value.replace("{port}", n.server_port2), URL_HTTP1.value = URL_HTTP1.value.replace("{port}", n.server_port1), URL_HTTP2.value = URL_HTTP2.value.replace("{port}", n.server_port2), URL_HTTP3.value = URL_HTTP2.value.replace("{port}", n.https_port);
}, needCLodop = () => {
  try {
    let n = navigator.userAgent;
    if (n.match(/Windows\sPhone/i) || n.match(/iPhone|iPod|iPad/i) || n.match(/Android/i) || n.match(/Edge\D?\d+/i))
      return !0;
    let r = n.match(/Trident\D?\d+/i), s = n.match(/MSIE\D?\d+/i), i = n.match(/OPR\D?\d+/i), a = n.match(/Firefox\D?\d+/i), u = n.match(/x64/i);
    if (!r && !s && u)
      return !0;
    if (a) {
      if (a = a[0].match(/\d+/), a[0] >= 41 || u)
        return !0;
    } else if (i) {
      if (i = i[0].match(/\d+/), i[0] >= 32)
        return !0;
    } else if (!r && !s) {
      let l = n.match(/Chrome\D?\d+/i);
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
  let n = document.head || document.getElementsByTagName("head")[0] || document.documentElement, r = document.createElement("script"), s = document.createElement("script"), i = document.createElement("script");
  r.src = URL_HTTP1.value, s.src = URL_HTTP2.value, i.src = URL_HTTP3.value, r.onload = s.onload = i.onload = s.onerror = i.onerror = function() {
    LoadJsState.value = "complete";
  }, r.onerror = function(a) {
    window.location.protocol !== "https:" ? n.insertBefore(s, n.firstChild) : n.insertBefore(i, n.firstChild);
  }, n.insertBefore(r, n.firstChild);
}
const loadCLodop = (paramas = null) => {
  if (needCLodop()) {
    initPort(paramas), CLodopIsLocal.value = !!(URL_WS1.value + URL_WS2.value).match(/\/\/localho|\/\/127.0.0./i), LoadJsState.value = "loadingA", !window.WebSocket && window.MozWebSocket && (window.WebSocket = window.MozWebSocket);
    try {
      let WSK1 = new WebSocket(URL_WS1.value);
      WSK1.onopen = function(n) {
        setTimeout(checkOrTryHttp, 200);
      }, WSK1.onmessage = function(e) {
        window.getCLodop || eval(e.data);
      }, WSK1.onerror = function(e) {
        let WSK2 = new WebSocket(URL_WS2.value);
        WSK2.onopen = function(n) {
          setTimeout(checkOrTryHttp, 200);
        }, WSK2.onmessage = function(e) {
          window.getCLodop || eval(e.data);
        }, WSK2.onerror = function(n) {
          checkOrTryHttp();
        };
      };
    } catch (n) {
      checkOrTryHttp();
    }
  }
}, getLodop = (n = null, r = null) => {
  let s = "<br>打印控件", i = s + "未安装!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行安装</a>", a = s + "需要升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>", u = "<br>Web打印服务CLodop未安装启动，点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载执行安装</a>", l = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_blank' class='text-primary'>点这里直接再次启动</a>）", c = "<br>Web打印服务CLodop需升级!点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>执行升级</a>", p = "<br>Web打印服务Lodop7", d = "点击这里<a href='http://www.lodop.net/download.html' target='_blank' class='text-primary'>下载安装</a>(下载后解压，点击lodop文件开始执行)", m = p + "未安装启动，" + d, g = p + "需升级，" + d, w = "，成功后请刷新本页面或重启浏览器。", y;
  try {
    let f = /MSIE/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent), v = /Linux/i.test(navigator.platform) && /x86/i.test(navigator.platform), h = /Linux/i.test(navigator.platform) && /aarch/i.test(navigator.platform);
    if (needCLodop() || v || h) {
      try {
        y = window.getCLodop();
      } catch {
      }
      if (!y && LoadJsState.value !== "complete") {
        LoadJsState.value ? ElMessageBox.alert("网页还没下载完毕，请稍等一下再操作", "提示", { dangerouslyUseHTMLString: !0 }) : ElMessageBox.alert("未曾加载Lodop主JS文件，请先调用loadCLodop过程", "提示", { dangerouslyUseHTMLString: !0 });
        return;
      }
      let _;
      if (y)
        (v || h) && y.CVERSION < "7.0.7.5" ? _ = g : CLODOP.CVERSION < "6.5.9.8" && (_ = c), _ && ElMessageBox.alert(_ + w, "提示", { dangerouslyUseHTMLString: !0 });
      else {
        v || h ? _ = m : _ = u + (CLodopIsLocal.value ? l : ""), ElMessageBox.alert(_ + w, "提示", { dangerouslyUseHTMLString: !0 });
        return;
      }
    } else {
      if (n || r ? f ? y = n : y = r : CreatedOKLodopObject.value ? y = CreatedOKLodopObject.value : (y = document.createElement("object"), y.setAttribute("width", 0), y.setAttribute("height", 0), y.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;"), f ? y.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA") : y.setAttribute("type", "application/x-print-lodop"), document.documentElement.appendChild(y), CreatedOKLodopObject.value = y), !y || !y.VERSION)
        return ElMessageBox.alert(i + w, "提示", { dangerouslyUseHTMLString: !0 }), y;
      y.VERSION < "6.2.2.6" && ElMessageBox.alert(a + w, "提示", { dangerouslyUseHTMLString: !0 });
    }
    return y;
  } catch (f) {
    ElMessage({
      message: "getLodop出错:" + f,
      type: "error",
      duration: 5e3
    });
  }
};
function e(n, r) {
  n = n.replace(/=/g, "");
  var s = [];
  switch (r.constructor) {
    case String:
    case Number:
    case Boolean:
      s.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
      break;
    case Array:
      r.forEach(function(i) {
        s = s.concat(e(n + "[]=", i));
      });
      break;
    case Object:
      Object.keys(r).forEach(function(i) {
        var a = r[i];
        s = s.concat(e(n + "[" + i + "]", a));
      });
  }
  return s;
}
function t(n) {
  var r = [];
  return n.forEach(function(s) {
    typeof s == "string" ? r.push(s) : r = r.concat(t(s));
  }), r;
}
function o(n, r, s) {
  if (r === void 0 && (r = {}), typeof n != "string")
    throw new Error('[Vue-jsonp] Type of param "url" is not string.');
  if (typeof r != "object" || !r)
    throw new Error("[Vue-jsonp] Invalid params, should be an object.");
  return s = typeof s == "number" ? s : 5e3, new Promise(function(i, a) {
    var u = typeof r.callbackQuery == "string" ? r.callbackQuery : "callback", l = typeof r.callbackName == "string" ? r.callbackName : "jsonp_" + (Math.floor(1e5 * Math.random()) * Date.now()).toString(16);
    r[u] = l, delete r.callbackQuery, delete r.callbackName;
    var c = [];
    Object.keys(r).forEach(function(f) {
      c = c.concat(e(f, r[f]));
    });
    var p = t(c).join("&"), d = function() {
      m(), clearTimeout(w), a({ status: 400, statusText: "Bad Request" });
    }, m = function() {
      y.removeEventListener("error", d);
    }, g = function() {
      document.body.removeChild(y), delete window[l];
    }, w = null;
    s > -1 && (w = setTimeout(function() {
      m(), g(), a({ statusText: "Request Timeout", status: 408 });
    }, s)), window[l] = function(f) {
      clearTimeout(w), m(), g(), i(f);
    };
    var y = document.createElement("script");
    y.addEventListener("error", d), y.src = n + (/\?/.test(n) ? "&" : "?") + p, document.body.appendChild(y);
  });
}
const geometry$1 = {}, createCircle$1 = (n, r, s) => {
  var p, d, m;
  const i = window.TMap, a = i.LatLng;
  r.radius = r.radius ?? 1e3, r.center = r.center ?? { lat: n.getCenter().lat, lng: n.getCenter().lng };
  const u = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], l = new i.MultiCircle({
    map: n,
    styles: {
      // 设置圆形样式
      circle: new i.CircleStyle({
        color: `rgba(${u.toString()}, .4)`,
        showBorder: !0,
        borderColor: `rgb(${u.toString()})`,
        borderWidth: 2
      }),
      highlight: new i.PolygonStyle({
        color: "rgba(255, 255, 0, 0.6)"
      })
    },
    geometries: [
      {
        styleId: "circle",
        center: new a(r.center.lat, r.center.lng),
        radius: parseInt(r.radius),
        id: r.key
      }
    ]
  });
  if (geometry$1[r.key])
    try {
      geometry$1[r.key].graphical.remove(r.key), (p = geometry$1[r.key].editor) == null || p.delete();
    } catch {
    }
  let c = null;
  if (i.tools)
    try {
      c = new i.tools.GeometryEditor({
        map: n,
        overlayList: [
          {
            overlay: l,
            id: r.key,
            selectedStyleId: "highlight"
          }
        ],
        actionMode: ((m = (d = i.tools.constants) == null ? void 0 : d.EDITOR_ACTION) == null ? void 0 : m.INTERACT) || 0,
        // 交互模式，支持拖动中心点和调整半径
        activeOverlayId: null,
        // 初始不激活，等待用户选择
        selectable: !0,
        // 开启点选功能
        snappable: !0
        // 开启吸附
      }), c.setKeyboardDeleteEnable(!1), c.on("adjust_start", () => {
        currentMap == null || currentMap.setDraggable(!1);
      }), c.on("adjust_complete", (g) => {
        g != null && g.center && g.radius !== void 0 && (r.center = { lat: g.center.lat, lng: g.center.lng }, r.radius = parseInt(g.radius)), setTimeout(() => currentMap == null ? void 0 : currentMap.setDraggable(!0), 100);
      }), c.on("adjust", (g) => {
        g != null && g.center && g.radius !== void 0 && (r.center = { lat: g.center.lat, lng: g.center.lng }, r.radius = parseInt(g.radius));
      }), c.on("select", () => {
        s && s(r.key);
      });
    } catch (g) {
      console.warn("创建编辑器失败:", g);
    }
  l.on("click", () => {
    var g;
    c && (c.select([r.key]), (g = c.setActiveOverlay) == null || g.call(c, r.key)), s && s(r.key);
  }), geometry$1[r.key] = { graphical: l, editor: c };
}, createPolygon$1 = (n, r, s) => {
  var m, g, w;
  const i = window.TMap, a = i.LatLng, { lat: u, lng: l } = n.getCenter();
  r.paths = r.paths ?? [
    { lat: u + 0.01, lng: l + 0.01 },
    { lat: u - 0.01, lng: l + 0.01 },
    { lat: u - 0.01, lng: l - 0.01 },
    { lat: u + 0.01, lng: l - 0.01 }
  ];
  const c = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ];
  if (geometry$1[r.key])
    try {
      geometry$1[r.key].graphical.remove(r.key), (m = geometry$1[r.key].editor) == null || m.delete();
    } catch {
    }
  const p = new i.MultiPolygon({
    map: n,
    styles: {
      polygon: new i.PolygonStyle({
        color: `rgba(${c.toString()}, .4)`,
        showBorder: !0,
        borderColor: `rgb(${c.toString()})`,
        borderWidth: 2
      }),
      highlight: new i.PolygonStyle({
        color: "rgba(255, 255, 0, 0.6)"
      })
    },
    geometries: [
      {
        id: r.key,
        styleId: "polygon",
        paths: r.paths.map((y) => new a(y.lat, y.lng))
      }
    ]
  });
  let d = null;
  if (i.tools)
    try {
      d = new i.tools.GeometryEditor({
        map: n,
        overlayList: [
          {
            overlay: p,
            id: r.key,
            selectedStyleId: "highlight"
          }
        ],
        actionMode: ((w = (g = i.tools.constants) == null ? void 0 : g.EDITOR_ACTION) == null ? void 0 : w.INTERACT) || 0,
        // 交互模式，支持拖动边框和调整形状
        activeOverlayId: null,
        // 初始不激活，等待用户选择
        selectable: !0,
        // 开启点选功能
        snappable: !0
        // 开启吸附
      }), d.setKeyboardDeleteEnable(!1), d.on("adjust_start", () => {
        currentMap == null || currentMap.setDraggable(!1);
      }), d.on("adjust_complete", (y) => {
        y != null && y.paths && (r.paths = y.paths.map((f) => ({ lat: f.lat, lng: f.lng }))), setTimeout(() => currentMap == null ? void 0 : currentMap.setDraggable(!0), 100);
      }), d.on("adjust", (y) => {
        y != null && y.paths && (r.paths = y.paths.map((f) => ({ lat: f.lat, lng: f.lng })));
      }), d.on("select", () => {
        s && s(r.key);
      });
    } catch (y) {
      console.warn("创建编辑器失败:", y);
    }
  p.on("click", () => {
    var y;
    d && (d.select([r.key]), (y = d.setActiveOverlay) == null || y.call(d, r.key)), s && s(r.key);
  }), geometry$1[r.key] = { graphical: p, editor: d };
}, deleteGeometry$1 = (n) => {
  var r, s;
  if (geometry$1[n])
    try {
      (r = geometry$1[n].graphical) == null || r.remove(n), (s = geometry$1[n].editor) == null || s.delete(), delete geometry$1[n];
    } catch (i) {
      console.warn("删除图形失败:", i);
    }
};
let currentMap = null;
const selectGeometry$1 = (n) => {
  var r, s, i, a, u;
  if ((r = geometry$1[n]) != null && r.editor)
    try {
      Object.keys(geometry$1).forEach((l) => {
        var c, p, d, m, g;
        l !== n && ((c = geometry$1[l]) != null && c.editor) && ((d = (p = geometry$1[l].editor).deselect) == null || d.call(p), (g = (m = geometry$1[l].editor).setActiveOverlay) == null || g.call(m, null));
      }), (i = (s = geometry$1[n].editor).select) == null || i.call(s, [n]), (u = (a = geometry$1[n].editor).setActiveOverlay) == null || u.call(a, n);
    } catch {
    }
}, createMarker = (n) => {
  const r = window.TMap;
  return r.LatLng, new r.MultiMarker({
    map: n,
    geometries: [
      {
        id: "center",
        position: n.getCenter()
      }
    ]
  });
}, latLngToAddress$1 = (n) => o(`https://apis.map.qq.com/ws/geocoder/v1/?key=${n.mapKey}&location=${n.lat},${n.lng}&output=jsonp&callback=latLngToAddress`, { callbackName: "latLngToAddress" }), geometry = {}, createCircle = (n, r, s, i) => {
  const a = window.T;
  if (!a)
    return null;
  r.radius = r.radius ?? 1e3, r.center = r.center ?? { lat: n.getCenter().lat, lng: n.getCenter().lng };
  const u = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], l = {
    color: r.color || `rgba(${u.toString()}, .4)`,
    weight: r.weight || 3,
    opacity: r.opacity || 0.8,
    fillColor: r.fillColor || `rgba(${u.toString()}, .4)`,
    fillOpacity: r.fillOpacity || 0.3
  }, c = new a.Circle(new a.LngLat(r.center.lng, r.center.lat), r.radius, l);
  if (geometry[r.key])
    try {
      geometry[r.key].editTimer && clearTimeout(geometry[r.key].editTimer), n.removeOverLay(geometry[r.key].graphical);
    } catch {
    }
  n.addOverLay(c);
  const p = { ...r };
  let d = { ...p.center }, m = p.radius;
  const g = () => {
    var y;
    c.isEditable() && ((y = geometry[p.key]) != null && y.editTimer && clearTimeout(geometry[p.key].editTimer), geometry[p.key].editTimer = setTimeout(() => {
      const f = c.getCenter(), v = c.getRadius();
      (f.lng !== d.lng || f.lat !== d.lat) && (p.center = { lat: f.lat, lng: f.lng }, d = { ...p.center }, s && s(p)), v !== m && (p.radius = v, m = v, s && s(p));
    }, 200));
  }, w = () => {
    i && i(p.key);
  };
  return n.addEventListener("touchend", g), n.addEventListener("mouseup", g), c.addEventListener("click", w), geometry[p.key] = { graphical: c, handleTouchEnd: g, handleClick: w, originalStyle: l }, c;
}, createRectangle = (n, r) => {
  const s = window.T;
  if (!s)
    return null;
  const { lat: i, lng: a } = n.getCenter();
  r.bounds = r.bounds ?? {
    southwest: { lat: i - 5e-3, lng: a - 5e-3 },
    northeast: { lat: i + 5e-3, lng: a + 5e-3 }
  };
  const u = [
    new s.LngLat(r.bounds.southwest.lng, r.bounds.southwest.lat),
    new s.LngLat(r.bounds.northeast.lng, r.bounds.southwest.lat),
    new s.LngLat(r.bounds.northeast.lng, r.bounds.northeast.lat),
    new s.LngLat(r.bounds.southwest.lng, r.bounds.northeast.lat)
  ], l = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], c = new s.Polygon(u, {
    color: r.color || `rgba(${l.toString()}, .4)`,
    weight: r.weight || 3,
    opacity: r.opacity || 0.8,
    fillColor: r.fillColor || `rgba(${l.toString()}, .4)`,
    fillOpacity: r.fillOpacity || 0.3
  });
  return n.addOverLay(c), geometry[r.key] = { graphical: c }, c;
}, createPolygon = (n, r, s, i) => {
  const a = window.T;
  if (!a)
    return null;
  const { lat: u, lng: l } = n.getCenter();
  r.paths = r.paths ?? [
    { lat: u + 0.01, lng: l + 0.01 },
    { lat: u - 0.01, lng: l + 0.01 },
    { lat: u - 0.01, lng: l - 0.01 },
    { lat: u + 0.01, lng: l - 0.01 }
  ];
  const c = r.paths.map((v) => new a.LngLat(v.lng, v.lat)), p = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ], d = {
    color: r.color || `rgba(${p.toString()}, .4)`,
    weight: r.weight || 3,
    opacity: r.opacity || 0.8,
    fillColor: r.fillColor || `rgba(${p.toString()}, .4)`,
    fillOpacity: r.fillOpacity || 0.3
  }, m = new a.Polygon(c, d);
  if (geometry[r.key])
    try {
      geometry[r.key].editTimer && clearTimeout(geometry[r.key].editTimer), n.removeOverLay(geometry[r.key].graphical);
    } catch {
    }
  n.addOverLay(m);
  let g = JSON.parse(JSON.stringify(r.paths));
  const w = { ...r }, y = () => {
    var v;
    m.isEditable() && ((v = geometry[w.key]) != null && v.editTimer && clearTimeout(geometry[w.key].editTimer), geometry[w.key].editTimer = setTimeout(() => {
      try {
        const h = m.getLngLats();
        if (Array.isArray(h)) {
          let _ = h;
          Array.isArray(h[0]) && (_ = h[0]);
          const E = _.map((x) => Array.isArray(x) ? {
            lat: x[1],
            lng: x[0]
          } : {
            lat: x.lat,
            lng: x.lng
          });
          JSON.stringify(E) !== JSON.stringify(g) && (w.paths = E, g = JSON.parse(JSON.stringify(w.paths)), s && s(w));
        } else
          console.error("curLngLats 不是数组:", h);
      } catch (h) {
        console.error("获取多边形路径失败:", h);
      }
    }, 200));
  }, f = () => {
    i && i(w.key);
  };
  return n.addEventListener("touchend", y), n.addEventListener("mouseup", y), m.addEventListener("click", f), geometry[w.key] = { graphical: m, handleTouchEnd: y, handleClick: f, originalStyle: d }, m;
}, deleteGeometry = (n, r) => {
  if (geometry[r])
    try {
      window.T && geometry[r].graphical && (geometry[r].editTimer && clearTimeout(geometry[r].editTimer), geometry[r].handleTouchEnd && (n.removeEventListener("touchend", geometry[r].handleTouchEnd), n.removeEventListener("mouseup", geometry[r].handleTouchEnd)), geometry[r].handleClick && geometry[r].graphical.removeEventListener("click", geometry[r].handleClick), n.removeOverLay(geometry[r].graphical)), delete geometry[r];
    } catch (s) {
      console.warn("删除图形失败:", s);
    }
}, clearAllGeometry = (n) => {
  window.T && (Object.keys(geometry).forEach((s) => {
    geometry[s].editTimer && clearTimeout(geometry[s].editTimer), geometry[s].handleTouchEnd && (n.removeEventListener("touchend", geometry[s].handleTouchEnd), n.removeEventListener("mouseup", geometry[s].handleTouchEnd)), geometry[s].handleClick && geometry[s].graphical.removeEventListener("click", geometry[s].handleClick);
  }), n.clearOverLays()), Object.keys(geometry).forEach((s) => delete geometry[s]);
}, selectGeometry = (n) => {
  var r, s, i;
  if ((r = geometry[n]) != null && r.graphical)
    try {
      deselectAllGeometry(), (i = (s = geometry[n].graphical).setSelected) == null || i.call(s, !0), geometry[n].graphical.enableEdit();
      const a = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      ];
      geometry[n].graphical.setStyle({
        color: "#1890ff",
        // 选中时的边框颜色
        weight: 2,
        // 选中时的边框宽度
        opacity: 1,
        // 选中时的边框透明度
        fillColor: `rgba(${a.toString()}, .6)`,
        // 选中时的填充颜色
        fillOpacity: 1
        // 选中时的填充透明度
      });
    } catch (a) {
      console.error("选中图形失败:", a);
    }
}, deselectAllGeometry = () => {
  Object.keys(geometry).forEach((n) => {
    var r, s, i, a, u, l, c;
    try {
      (i = (s = (r = geometry[n]) == null ? void 0 : r.graphical) == null ? void 0 : s.setSelected) == null || i.call(s, !1), (l = (u = (a = geometry[n]) == null ? void 0 : a.graphical) == null ? void 0 : u.disableEdit) == null || l.call(u), (c = geometry[n]) != null && c.originalStyle && geometry[n].graphical.setStyle(geometry[n].originalStyle);
    } catch (p) {
      console.warn("取消选中图形失败:", p);
    }
  });
}, latLngToAddress = (n) => new Promise((r, s) => {
  const i = window.T;
  if (!i) {
    s(new Error("天地图服务未加载"));
    return;
  }
  const a = new i.Geocoder(), u = new i.LngLat(n.lng, n.lat);
  a.getLocation(u, (l) => {
    if (l && l.status === "0") {
      const c = l.addressComponent || {};
      let p = "";
      if (l.formattedAddress)
        p = l.formattedAddress;
      else if (l.address)
        p = l.address;
      else {
        const m = [];
        c.road && m.push(c.road), c.address && m.push(c.address), c.poi && m.push(c.poi), p = m.join("");
      }
      const d = {
        location: { lat: n.lat, lng: n.lng },
        address: c ? `${c.province || ""}${c.city || ""}${c.county || ""}` : "",
        formatted_addresses: {
          recommend: p
        },
        address_component: {
          province: c.province || "",
          city: c.city || "",
          district: c.county || "",
          street: c.road || "",
          street_number: c.address || ""
        },
        addressComponent: c,
        formatted_address: p
      };
      r(d);
    } else
      s(new Error((l == null ? void 0 : l.msg) || "地址解析失败"));
  });
});
function getAliappConfig() {
  return request.get("aliapp/config");
}
function setAliappConfig(n) {
  return request.put("aliapp/config", n, { showSuccessMessage: !0 });
}
function getAliappStatic() {
  return request.get("aliapp/static");
}
function getAppConfig() {
  return request.get("channel/app/config");
}
function setAppConfig(n) {
  return request.put("channel/app/config", n, { showSuccessMessage: !0 });
}
function getVersionList$1(n) {
  return request.get("channel/app/version", { params: n });
}
function getVersionInfo(n) {
  return request.get(`channel/app/version/${n}`);
}
function getAppPlatform() {
  return request.get("channel/app/platfrom");
}
function addVersion$1(n) {
  return request.post("channel/app/version", n, { showSuccessMessage: !0 });
}
function editVersion$1(n) {
  return request.put(`channel/app/version/${n.id}`, n, { showSuccessMessage: !0 });
}
function deleteVersion$1(n) {
  return request.delete(`channel/app/version/${n.id}`);
}
function getBuildLog(n) {
  return request.get(`channel/app/build/log/${n}`);
}
function releaseVersion(n) {
  return request.put(`channel/app/version/${n}/release`, {}, { showSuccessMessage: !0 });
}
function generateSingCert(n) {
  return request.post("channel/app/generate_sing_cert", n, { showSuccessMessage: !0 });
}
const CLOUD_COMPILE_BASE_URL = location.protocol + "//go.site.niucloud.com";
function createCloudCompileRequest() {
  const n = axios$2.create({
    baseURL: CLOUD_COMPILE_BASE_URL,
    timeout: 0,
    headers: {
      lang: storage.get("lang") ?? "zh-cn"
    }
  });
  return n.interceptors.request.use(
    (r) => {
      const s = storage.get("token");
      return s && (r.headers.token = s), r;
    },
    (r) => Promise.reject(r)
  ), n.interceptors.response.use(
    (r) => r.data,
    (r) => Promise.reject(r)
  ), n;
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
function getCloudBuildQueuePosition(n) {
  return cloudCompileRequest.get("/cloud/queue_position", { params: { task_id: n } });
}
function getCloudBuildSseUrl(n) {
  return `${CLOUD_COMPILE_BASE_URL}/cloud/sse?task_id=${n}`;
}
function getCloudCompileLocalUrl() {
  return request.get("niucloud/build/get_local_url");
}
function setCloudCompileLocalUrl(n) {
  return request.post("niucloud/build/set_local_url", { url: n });
}
function startServerDownload(n, r, s, i) {
  return request.post("niucloud/build/start_server_download", {
    task_id: n,
    download_url: r,
    authorize_code: s,
    timestamp: i
  });
}
function getSseBuildLog(n) {
  return request.get("niucloud/build/get_sse_build_log", { params: { task_id: n } });
}
function getDictList(n) {
  return request.get("dict/dict", { params: n });
}
function getDictInfo(n) {
  return request.get(`dict/dict/${n}`);
}
function addDict(n) {
  return request.post("dict/dict", n, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function addDictData(n) {
  return request.put(`dict/dict/${n.id}`, n, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editDict(n) {
  return request.put(`dict/dict/${n.id}`, n, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function deleteDict(n) {
  return request.delete(`dict/dict/${n}`, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function setDictData(n, r) {
  return request.put(`dict/dictionary/${n}`, r, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function getDictAll() {
  return request.get("dict/all");
}
function useDictionary(n) {
  return request.get(`dict/dictionary/type/${n}`);
}
function getDiyPageList(n) {
  return request.get("diy/diy", { params: n });
}
function getDiyPageListByCarouselSearch(n) {
  return request.get("diy/carousel_search", { params: n });
}
function getDiyList(n) {
  return request.get("diy/list", { params: n });
}
function getDiyPageInfo(n) {
  return request.get(`diy/diy/${n}`);
}
function addDiyPage(n) {
  return request.post("diy/diy", n, { showSuccessMessage: !0 });
}
function editDiyPage(n) {
  return request.put(`diy/diy/${n.id}`, n, { showSuccessMessage: !0 });
}
function setUseDiyPage(n) {
  return request.put(`diy/use/${n.id}`, n, { showSuccessMessage: !0 });
}
function editDiyPageShare(n) {
  return request.put("diy/diy/share", n, { showSuccessMessage: !0 });
}
function deleteDiyPage(n) {
  return request.delete(`diy/diy/${n}`, { showSuccessMessage: !0 });
}
function initPage$1(n) {
  return request.get("diy/init", { params: n });
}
function getLink(n) {
  return request.get("diy/link", { params: n });
}
function getDiyBottomList(n) {
  return request.get("diy/bottom", { params: n });
}
function getDiyBottomConfig(n) {
  return request.get("diy/bottom/config", { params: n });
}
function setDiyBottomConfig(n) {
  return request.post("diy/bottom", n, { showSuccessMessage: !0 });
}
function getDiyTemplate(n) {
  return request.get("diy/template", { params: n });
}
function getDiyTemplatePages$1(n) {
  return request.get("diy/template/pages", { params: n });
}
function getDiyRouteList(n) {
  return request.get("diy/route", { params: n });
}
function getDiyRouteAppList() {
  return request.get("diy/route/apps");
}
function getDiyRouteInfo(n) {
  return request.get("diy/route/info", { params: n });
}
function editDiyRouteShare(n) {
  return request.put("diy/route/share", n, { showSuccessMessage: !0 });
}
function getDecoratePage(n) {
  return request.get("diy/decorate", { params: n });
}
function changeTemplate(n) {
  return request.put("diy/change", n, { showSuccessMessage: !0 });
}
function getApps(n) {
  return request.get("diy/apps");
}
function copyDiy(n) {
  return request.post("diy/copy", n, { showSuccessMessage: !0 });
}
function getPageLink(n) {
  return request.get("diy/page_link", { params: n });
}
function getDefaultTheme(n) {
  return request.get("diy/theme/color", { params: n });
}
function getDiyTheme(n) {
  return request.get("diy/theme", { params: n });
}
function addTheme(n) {
  return request.post("diy/theme/add", n);
}
function editTheme(n) {
  return request.put(`diy/theme/edit/${n.id}`, n, { showSuccessMessage: !0 });
}
function deleteTheme(n) {
  return request.delete(`diy/theme/delete/${n}`, { showSuccessMessage: !0 });
}
function setDiyTheme(n) {
  return request.post("diy/theme", n, { showSuccessMessage: !0 });
}
function getDiyFormPageList(n) {
  return request.get("diy/form", { params: n });
}
function getDiyFormList(n) {
  return request.get("diy/form/list", { params: n });
}
function getDiyFormSelectPageList(n) {
  return request.get("diy/form/select", { params: n });
}
function getDiyFormInfo(n) {
  return request.get(`diy/form/${n}`);
}
function addDiyForm(n) {
  return request.post("diy/form", n, { showSuccessMessage: !0 });
}
function editDiyForm(n) {
  return request.put(`diy/form/${n.form_id}`, n, { showSuccessMessage: !0 });
}
function editDiyFormShare(n) {
  return request.put("diy/form/share", n, { showSuccessMessage: !0 });
}
function deleteDiyForm(n) {
  return request.put("diy/form/delete", n, { showSuccessMessage: !0 });
}
function initPage(n) {
  return request.get("diy/form/init", { params: n });
}
function getDiyFormQrcode(n) {
  return request.get("diy/form/qrcode", { params: n });
}
function getDiyFormFieldsList(n) {
  return request.get("diy/form/fields/list", { params: n });
}
function getDiyFormFieldStat(n) {
  return request.get("diy/form/records/field/stat", { params: n });
}
function getDiyTemplatePages(n) {
  return request.get("diy/form/template", { params: n });
}
function editFormStatus(n) {
  return request.put("diy/form/status", n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getFormType(n) {
  return request.get("diy/form/type");
}
function getFormWriteConfig(n) {
  return request.get(`diy/form/write/${n}`);
}
function editDiyFormWriteConfig(n) {
  return request.put("diy/form/write", n, { showSuccessMessage: !0 });
}
function getFormSubmitConfig(n) {
  return request.get(`diy/form/submit/${n}`);
}
function editDiyFormSubmitConfig(n) {
  return request.put("diy/form/submit", n, { showSuccessMessage: !0 });
}
function getFormRecords(n) {
  return request.get("diy/form/records", { params: n });
}
function getFormRecordsInfo(n) {
  return request.get(`diy/form/records/${n}`);
}
function deleteFormRecords(n) {
  return request.put("diy/form/records/delete", n, { showSuccessMessage: !0 });
}
function getFormRecordsMember(n) {
  return request.get("diy/form/records/member/stat", { params: n });
}
function copyForm(n) {
  return request.post("diy/form/copy", n, { showSuccessMessage: !0 });
}
function getH5Config() {
  return request.get("channel/h5/config");
}
function setH5Config(n) {
  return request.put("channel/h5/config", n, { showSuccessMessage: !0 });
}
function getHomeSite(n) {
  return request.get("home/site", { params: n });
}
function getSiteGroup() {
  return request.get("home/site/group");
}
function createSite(n) {
  return request.post("home/site/create", n);
}
function getMemberList(n) {
  return request.get("member/member", { params: n });
}
function getMemberInfo(n) {
  return request.get(`member/member/${n}`);
}
function getMemberNo() {
  return request.get("member/memberno");
}
function addMember(n) {
  return request.post("member/member", n, { showSuccessMessage: !0 });
}
function getRegisterType(n) {
  return request.get("member/registertype", n);
}
function getRegisterChannelType(n) {
  return request.get("member/register/channel", n);
}
function deleteMember(n) {
  return request.delete(`member/member/${n}`, { showSuccessMessage: !0 });
}
function getMemberLabelList(n) {
  return request.get("member/label", { params: n });
}
function getMemberLabelInfo(n) {
  return request.get(`member/label/${n}`);
}
function addMemberLabel(n) {
  return request.post("member/label", n, { showSuccessMessage: !0 });
}
function updateMemberLabel(n) {
  return request.put(`member/label/${n.label_id}`, n, { showSuccessMessage: !0 });
}
function deleteMemberLabel(n) {
  return request.delete(`member/label/${n}`, { showSuccessMessage: !0 });
}
function getMemberLabelAll() {
  return request.get("member/label/all");
}
function editMemberDetail(n) {
  return request.put(`member/member/modify/${n.member_id}/${n.field}`, n, { showSuccessMessage: !0 });
}
function memberBatchModify(n) {
  return request.post("member/member/batch_modify", n, { showSuccessMessage: !0 });
}
function getChangeTypeList(n) {
  return request.get(`member/account/change_type/${n}`);
}
function getPointList(n) {
  return request.get("member/account/point", { params: n });
}
function getGrowthList(n) {
  return request.get("member/account/growth", { params: n });
}
function getBalanceList(n) {
  return request.get("member/account/balance", { params: n });
}
function getMoneyList(n) {
  return request.get("member/account/money", { params: n });
}
function getCommissionList(n) {
  return request.get("member/account/commission", { params: n });
}
function adjustPoint(n) {
  return request.post("member/account/point", n, { showSuccessMessage: !0 });
}
function adjustBalance(n) {
  return request.post("member/account/balance", n, { showSuccessMessage: !0 });
}
function getLoginConfig() {
  return request.get("member/config/login");
}
function setLoginConfig(n) {
  return request.post("member/config/login", n, { showSuccessMessage: !0 });
}
function getMemberConfig() {
  return request.get("member/config/member");
}
function setMemberConfig(n) {
  return request.post("member/config/member", n, { showSuccessMessage: !0 });
}
function setGrowthRuleConfig(n) {
  return request.post("member/config/growth_rule", n, { showSuccessMessage: !0 });
}
function getGrowthRuleConfig() {
  return request.get("member/config/growth_rule");
}
function setPointRuleConfig(n) {
  return request.post("member/config/point_rule", n, { showSuccessMessage: !0 });
}
function getPointRuleConfig() {
  return request.get("member/config/point_rule");
}
function getTransfertype() {
  return request.get("member/cash_out/transfertype");
}
function getCommissionSum(n) {
  return request.get("member/account/sum_commission", { params: n });
}
function getPointSum(n) {
  return request.get("member/account/sum_point", { params: n });
}
function getBalanceSum(n) {
  return request.get("member/account/sum_balance", { params: n });
}
function getBalanceStatus() {
  return request.get("member/account/type");
}
function getAccountType$1(n) {
  return request.get(`member/account/change_type/${n.account_type}`);
}
function getCashOutConfig() {
  return request.get("member/config/cash_out");
}
function setCashOutConfig(n) {
  return request.post("member/config/cash_out", n, { showSuccessMessage: !0 });
}
function getCashOutList(n) {
  return request.get("member/cash_out", { params: n });
}
function getCashOutDetail(n) {
  return request.get(`member/cash_out/${n}`, {});
}
function memberAudit(n) {
  return request.put(`member/cash_out/audit/${n.id}/${n.action}`, n, { showSuccessMessage: !0 });
}
function memberCancel(n) {
  return request.put(`member/cash_out/cancel/${n.id}`, n, {
    showSuccessMessage: !0,
    showErrorMessage: !0
  });
}
function memberTransfer(n) {
  return request.put(`member/cash_out/transfer/${n.id}`, n, { showSuccessMessage: !0 });
}
function memberRemark(n) {
  return request.put(`member/cash_out/remark/${n.id}`, n, { showSuccessMessage: !0 });
}
function memberCheck(n) {
  return request.put(`member/cash_out/check/${n}`, {}, { showSuccessMessage: !0 });
}
function editMemberStatus(n) {
  return request.put(`member/setstatus/${n.status}`, n, { showSuccessMessage: !0 });
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
function getMemberLevelPageList(n) {
  return request.get("member/level", { params: n });
}
function getMemberLevelInfo(n) {
  return request.get(`member/level/${n}`);
}
function addMemberLevel(n) {
  return request.post("member/level", n, { showSuccessMessage: !0 });
}
function updateMemberLevel(n) {
  return request.put(`member/level/${n.level_id}`, n, { showSuccessMessage: !0 });
}
function deleteMemberLevel(n) {
  return request.delete(`member/level/${n}`, { showSuccessMessage: !0 });
}
function getMemberLevelAll() {
  return request.get("member/level/all");
}
function getMemberBenefitsContent() {
  return request.post("member/benefits/content");
}
function getMemberGiftsContent(n) {
  return request.post("member/gifts/content", n);
}
function getSignConfig() {
  return request.get("member/sign/config");
}
function setSignConfig(n) {
  return request.put("member/sign/config", n, { showSuccessMessage: !0 });
}
function getMemberSignList(n) {
  return request.get("member/sign", { params: n });
}
function getMemberAddress(n) {
  return request.get("member/address", { params: n });
}
function addMemberAddress(n) {
  return request.post("member/address", n);
}
function editMemberAddress(n) {
  return request.put("member/address", n);
}
function getNoticeList(n) {
  return request.get("notice/notice", { params: n });
}
function getNoticeLog(n) {
  return request.get("notice/log", { params: n });
}
function getBindInfo() {
  return request.get("notice/bind/info");
}
function cancelBind(n) {
  return request.post("notice/bind/cancel", n);
}
function getWechatAuthUrl() {
  return request.get("notice/bind/wechat");
}
function sendSms(n) {
  return request.post("notice/bind/sms/send", n, { showSuccessMessage: !0 });
}
function bindSms(n) {
  return request.post("notice/bind/sms/bind", n, { showSuccessMessage: !0 });
}
function getNoticeInfo(n) {
  return request.get(`notice/notice/${n}`);
}
function editNoticeStatus(n) {
  return request.post("notice/notice/editstatus", n, { showSuccessMessage: !0 });
}
function editNotice(n) {
  return request.post("notice/notice/edit", n, { showSuccessMessage: !0 });
}
function getSmsList() {
  return request.get("notice/notice/sms");
}
function getSmsInfo(n) {
  return request.get(`notice/notice/sms/${n}`);
}
function editSms(n) {
  return request.put(`notice/notice/sms/${n.sms_type}`, n, { showSuccessMessage: !0 });
}
function getSmsLog(n) {
  return request.get("notice/sms/log", { params: n });
}
function getAccountIsLogin() {
  return request.get("notice/niusms/config");
}
function loginAccount(n) {
  return request.post("notice/niusms/account/login", n, { showSuccessMessage: !0 });
}
function registerAccount(n) {
  return request.post("notice/niusms/account/register", n, { showSuccessMessage: !0 });
}
function getAccountInfo(n) {
  return request.get(`notice/niusms/account/info/${n}`);
}
function getTemplateList$2(n) {
  return request.get(`notice/niusms/template/list/${n.sms_type}/${n.username}`, {});
}
function getSignList(n, r) {
  return request.get(`notice/niusms/sign/list/${n}`, { params: r });
}
function addSign(n, r) {
  return request.post(`notice/niusms/sign/report/${n}`, r, { showSuccessMessage: !0 });
}
function deleteSign(n, r) {
  return request.post(`notice/niusms/sign/delete/${n}`, r, { showSuccessMessage: !0 });
}
function editAccount(n, r) {
  return request.post(`notice/niusms/account/edit/${n}`, r, { showSuccessMessage: !0 });
}
function getSmsSendList(n, r) {
  return request.get(`notice/niusms/account/send_list/${n}`, { params: r });
}
function getSmsOrdersList(n, r) {
  return request.get(`notice/niusms/order/list/${n}`, { params: r });
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
function getSmsSend(n) {
  return request.post("notice/niusms/send", n, { showSuccessMessage: !0 });
}
function getSmsSignConfig() {
  return request.get("notice/niusms/sign/report/config");
}
function getTemplateReportConfig() {
  return request.get("notice/niusms/template/report/config");
}
function reportTemplate(n, r, s) {
  return request.post(`notice/niusms/template/report/${n}/${r}`, s, { showSuccessMessage: !0 });
}
function getreportTemplateInfo(n, r, s) {
  return request.get(`notice/niusms/template/info/${n}/${r}`, { params: s });
}
function smsOrderCreate(n, r) {
  return request.post(`notice/niusms/order/create/${n}`, r);
}
function getOrderPayInfo(n, r) {
  return request.get(`notice/niusms/order/pay/${n}`, { params: r });
}
function getOrderInfo(n, r) {
  return request.get(`notice/niusms/order/info/${n}`, { params: r });
}
function getOrderPayStatus(n, r) {
  return request.get(`notice/niusms/order/status/${n}`, { params: r });
}
function calculateOrderPay(n, r) {
  return request.post(`notice/niusms/order/calculate/${n}`, r);
}
function enableNiusms(n) {
  return request.put("notice/niusms/enable", n, { showSuccessMessage: !0 });
}
function templateSync(n, r) {
  return request.get(`notice/niusms/template/sync/${n}/${r}`);
}
function resetPassword(n, r) {
  return request.post(`notice/niusms/account/reset/password/${n}`, r, { showSuccessMessage: !0 });
}
function clearTemplate(n, r) {
  return request.delete(`notice/niusms/template/${n}/${r}`);
}
function getPayRefundPages(n) {
  return request.get("pay/refund", { params: n });
}
function getPayRefundInfo(n) {
  return request.get(`pay/refund/${n}`);
}
function getRefundStatus() {
  return request.get("pay/refund/status");
}
function getRefundType() {
  return request.get("pay/refund/type");
}
function getRefundTransfer(n) {
  return request.post("pay/refund/transfer", n, { showSuccessMessage: !0 });
}
function getAllPayType() {
  return request.get("pay/type/all");
}
function pay(n) {
  return request.post("pay", n);
}
function getFriendsPay(n, r, s) {
  return request.get(`pay/friendspay/info/${n}/${r}/${s}`, { showErrorMessage: !1 });
}
function getTransferScene() {
  return request.get("pay/transfer_scene");
}
function setSceneId(n) {
  return request.post(`pay/transfer_scene/set_scene_id/${n.scene}`, n, { showSuccessMessage: !0 });
}
function setTradeScene(n) {
  return request.post(`pay/transfer_scene/set_trade_scene/${n.type}`, n);
}
function getPcConfig() {
  return request.get("channel/pc/config");
}
function setPcConfig(n) {
  return request.put("channel/pc/config", n, { showSuccessMessage: !0 });
}
function getUserInfo$2() {
  return request.get("auth/get");
}
function setUserInfo(n) {
  return request.put("auth/edit", n, { showSuccessMessage: !0 });
}
function getPosterPageList(n) {
  return request.get("sys/poster", { params: n });
}
function getPosterList(n) {
  return request.get("sys/poster/list", { params: n });
}
function getPosterInfo(n) {
  return request.get(`sys/poster/${n}`);
}
function addPoster(n) {
  return request.post("sys/poster", n, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editPoster(n) {
  return request.put(`sys/poster/${n.id}`, n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePoster(n) {
  return request.delete(`sys/poster/${n}`, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function modifyPosterStatus(n) {
  return request.put("sys/poster/status", n, { showSuccessMessage: !0 });
}
function modifyPosterDefault(n) {
  return request.put("sys/poster/default", n, { showSuccessMessage: !0 });
}
function getPosterType(n) {
  return request.get("sys/poster/type", { params: n });
}
function getPosterTemplate(n) {
  return request.get("sys/poster/template", { params: n });
}
function initPoster(n) {
  return request.get("sys/poster/init", { params: n });
}
function getPreviewPoster(n) {
  return request.get("sys/poster/preview", { params: n });
}
function getPosterGenerate(n) {
  return request.get("sys/poster/generate", { params: n, showErrorMessage: !1 });
}
function checkImagick() {
  return request.get("sys/check_imagick", { showErrorMessage: !1 });
}
function getPrinterPageList(n) {
  return request.get("sys/printer", { params: n });
}
function getPrinterList(n) {
  return request.get("sys/printer/list", { params: n });
}
function getPrinterInfo(n) {
  return request.get(`sys/printer/${n}`);
}
function addPrinter(n) {
  return request.post("sys/printer", n, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function editPrinter(n) {
  return request.put(`sys/printer/${n.printer_id}`, n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function modifyPrinterStatus(n) {
  return request.put("sys/printer/status", n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePrinter(n) {
  return request.delete(`sys/printer/${n}`, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getPrinterTemplatePageList(n) {
  return request.get("sys/printer/template", { params: n });
}
function getPrinterTemplateList(n) {
  return request.get("sys/printer/template/list", { params: n });
}
function getPrinterTemplateInfo(n) {
  return request.get(`sys/printer/template/${n}`);
}
function addPrinterTemplate(n) {
  return request.post("sys/printer/template", n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function editPrinterTemplate(n) {
  return request.put(`sys/printer/template/${n.template_id}`, n, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function deletePrinterTemplate(n) {
  return request.delete(`sys/printer/template/${n}`, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function getPrinterType(n) {
  return request.get("sys/printer/type", { params: n });
}
function getPrinterBrand(n) {
  return request.get("sys/printer/brand", { params: n });
}
function refreshPrinterToken(n) {
  return request.put(`sys/printer/refreshtoken/${n}`, {}, {
    showErrorMessage: !0,
    showSuccessMessage: !0
  });
}
function testPrint(n) {
  return request.put(`sys/printer/testprint/${n}`, {}, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function printTicket(n) {
  return request.post("sys/printer/printticket", n, { showErrorMessage: !0, showSuccessMessage: !0 });
}
function getSiteList(n) {
  return request.get("site/site", { params: n });
}
function getSiteInfo(n) {
  return request.get(`site/site/${n}`);
}
function addSite(n) {
  return request.post("site/site", n, { showSuccessMessage: !0 });
}
function editSite(n) {
  return request.put(`site/site/${n.site_id}`, n, { showSuccessMessage: !0 });
}
function deleteSite(n) {
  return request.delete(`site/site/${n.site_id}?captcha_code=${n.captcha_code}&captcha_key=${n.captcha_key}`);
}
function closeSite(n) {
  return request.put(`site/closesite/${n.site_id}`, n, { showSuccessMessage: !0 });
}
function initSite(n) {
  return request.post("site/init", n, { showSuccessMessage: !0 });
}
function openSite(n) {
  return request.put(`site/opensite/${n.site_id}`, n, { showSuccessMessage: !0 });
}
function getStatusList() {
  return request.get("site/statuslist");
}
function getSiteAllowChange() {
  return request.get("site/allow_change");
}
function putSiteAllowChange(n) {
  return request.put("site/allow_change", n, { showSuccessMessage: !0 });
}
function getSiteGroupList(n) {
  return request.get("site/group", { params: n });
}
function getSiteGroupInfo(n) {
  return request.get(`site/group/${n}`);
}
function addSiteGroup(n) {
  return request.post("site/group", n, { showSuccessMessage: !0 });
}
function editSiteGroup(n) {
  return request.put(`site/group/${n.group_id}`, n, { showSuccessMessage: !0 });
}
function deleteSiteGroup(n) {
  return request.delete(`site/group/${n}`, { showSuccessMessage: !0 });
}
function getSiteGroupAll() {
  return request.get("site/group/all");
}
function getUserSiteGroupAll(n = {}) {
  return request.get("site/group/user", { params: n });
}
function getUserList$1(n) {
  return request.get("site/user", { params: n });
}
function getUserInfo$1(n) {
  return request.get(`site/user/${n}`);
}
function addUser$1(n) {
  return request.post("site/user", n, { showSuccessMessage: !0 });
}
function editUser$1(n) {
  return request.put(`site/user/${n.uid}`, n, { showSuccessMessage: !0 });
}
function lockUser(n) {
  return request.put(`site/user/lock/${n}`);
}
function unlockUser(n) {
  return request.put(`site/user/unlock/${n}`);
}
function deleteUser$1(n) {
  return request.delete(`site/user/${n}`);
}
function getLogList(n) {
  return request.get("site/log", { params: n });
}
function getLogInfo(n) {
  return request.get(`site/log/${n}`);
}
function logDestroy() {
  return request.delete("site/log/destroy");
}
function getAccountList(n) {
  return request.get("site/account", { params: n });
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
function getAddonDevelop(n) {
  return request.get("addon_develop", { params: n });
}
function getAddontype() {
  return request.get("addontype");
}
function getAddonDevelopInfo(n) {
  return request.get(`addon_develop/${n}`);
}
function getAddonDevelopCheck(n) {
  return request.get(`addon_develop/check/${n}`);
}
function getAddonKeyBlackList() {
  return request.get("addon_develop/key/blacklist");
}
function addAddonDevelop(n, r) {
  return request.post(`addon_develop/${n}`, r);
}
function editAddonDevelop(n, r) {
  return request.put(`addon_develop/${n}`, r);
}
function deleteAddonDevelop(n) {
  return request.delete(`addon_develop/${n}`, { showSuccessMessage: !0 });
}
function addonDevelopBuild(n) {
  return request.post(`addon_develop/build/${n}`);
}
function addonDevelopDownload(n) {
  return request.post(`addon_develop/download/${n}`, {});
}
function getGenerateTableList(n) {
  return request.get("generator/generator", { params: n });
}
function getGenerateTableInfo(n) {
  return request.get(`generator/generator/${n}`);
}
function addGenerateTable(n) {
  return request.post("generator/generator", n, { showSuccessMessage: !0 });
}
function editGenerateTable(n) {
  return request.put(`generator/generator/${n.id}`, n, { showSuccessMessage: !0 });
}
function deleteGenerateTable(n) {
  return request.delete(`generator/generator/${n}`, { showSuccessMessage: !0 });
}
function generateCreate(n) {
  return request.post("generator/download", n);
}
function generatePreview(n) {
  return request.get(`generator/preview/${n}`);
}
function generateTable() {
  return request.get("generator/table");
}
function getSystem() {
  return request.get("sys/system");
}
function getGeneratorAllModel(n) {
  return request.get("generator/all_model", { params: n });
}
function getGeneratorTableColumn(n) {
  return request.get("generator/table_column", { params: n });
}
function generatorCheckFile(n) {
  return request.get("generator/check_file", { params: n });
}
function getGeneratorModelTableColumn(n) {
  return request.get("generator/model_table_column", { params: n });
}
function getUpgradeContent(n = "") {
  return request.get(n ? `upgrade/${n}` : "upgrade");
}
function getUpgradeTask() {
  return request.get("upgrade/task");
}
function upgradeAddon(n = "", r = {}) {
  return request.post(n ? `upgrade/${n}` : "upgrade", r);
}
function executeUpgrade() {
  return request.post("upgrade/execute", {}, { showErrorMessage: !1 });
}
function preUpgradeCheck(n = "") {
  return request.get(n ? `upgrade/check/${n}` : "upgrade/check");
}
function clearUpgradeTask() {
  return request.post("upgrade/clear");
}
function upgradeUserOperate(n) {
  return request.post(`upgrade/operate/${n}`);
}
function getUpgradeRecords(n) {
  return request.get("upgrade/records", { params: n });
}
function delUpgradeRecords(n) {
  return request.delete("upgrade/records", { params: n });
}
function getBackupRecords(n) {
  return request.get("backup/records", { params: n });
}
function modifyBackupRemark(n) {
  return request.put("backup/remark", n, { showSuccessMessage: !0 });
}
function checkDirExist(n) {
  return request.post("backup/check_dir", n);
}
function checkPermission(n) {
  return request.post("backup/check_permission", n);
}
function restoreUpgradeBackup(n) {
  return request.post("backup/restore", n);
}
function deleteRecords(n) {
  return request.post("backup/delete", n, { showSuccessMessage: !0 });
}
function manualBackup(n) {
  return request.post("backup/manual", n);
}
function performRecoveryTasks(n) {
  return request.get("backup/restore_task", n);
}
function performBackupTasks(n) {
  return request.get("backup/task", n);
}
function connectTest(n) {
  return request.post("niucloud/build/connect_test", n);
}
function setLocalUrl(n) {
  return request.post("niucloud/build/set_local_url", n);
}
function getLocalUrl(n) {
  return request.get("niucloud/build/get_local_url", n);
}
function getUserList(n) {
  return request.get("user/user", { params: n });
}
function getUserInfo(n) {
  return request.get(`user/user/${n}`);
}
function addUser(n) {
  return request.post("user/user", n, { showSuccessMessage: !0 });
}
function deleteUser(n) {
  return request.delete(`user/user/${n}`, { showSuccessMessage: !0 });
}
function editUser(n) {
  return request.put(`user/user/${n.uid}`, n, { showSuccessMessage: !0 });
}
function getAllUserList(n) {
  return request.get("user/user_all", { params: n });
}
function getUserListSelect(n) {
  return request.get("user/user_select", { params: n });
}
function checkUsernameIsExist(n) {
  return request.get("user/isexist", { params: { username: n } });
}
function getUserCreateSiteLimit(n) {
  return request.get(`user/user/create_site_limit/${n}`);
}
function getUserCreateSiteLimitInfo(n) {
  return request.get(`user/user/create_site_limit/info/${n}`);
}
function addUserCreateSiteLimit(n) {
  return request.post("user/user/create_site_limit", n, { showSuccessMessage: !0 });
}
function editUserCreateSiteLimit(n) {
  return request.put(`user/user/create_site_limit/${n.id}`, n, { showSuccessMessage: !0 });
}
function delUserCreateSiteLimit(n) {
  return request.delete(`user/user/create_site_limit/${n}`, { showSuccessMessage: !0 });
}
function getVerifyRecord(n) {
  return request.get("verify/verify/record", { params: n });
}
function getVerifyDetail(n) {
  return request.get(`verify/verify/${n}`);
}
function getVerifyDetailInfo(n) {
  return request.get(`verify/detail/${n}`);
}
function verify(n, r) {
  return request.post(`verify/verify/${n}`, r, { showSuccessMessage: !0 });
}
function getVerifierList(n) {
  return request.get("verify/verifier", { params: n });
}
function getVerifierSelect() {
  return request.get("verify/verifier/select");
}
function getVerifyTypeList() {
  return request.get("verify/verifier/type");
}
function addVerifier(n) {
  return request.post("verify/verifier", n, { showSuccessMessage: !0 });
}
function deleteVerifier(n) {
  return request.delete(`verify/verifier/${n}`, { showSuccessMessage: !0 });
}
function getVerifyInfo(n) {
  return request.get(`verify/verifier/${n}`);
}
function editVerifier(n) {
  return request.post(`verify/verifier/${n.id}`, n, { showSuccessMessage: !0 });
}
function getWeappConfig() {
  return request.get("weapp/config");
}
function setWeappConfig(n) {
  return request.put("weapp/config", n, { showSuccessMessage: !0 });
}
function getTemplateList$1() {
  return request.get("weapp/template");
}
function getBatchAcquisition$1(n) {
  return request.put("weapp/template/sync", n, { showSuccessMessage: !0 });
}
function setWeappVersion(n) {
  return request.post("weapp/version", n, { showSuccessMessage: !0 });
}
function getWeappPreview() {
  return request.get("weapp/preview");
}
function getWeappVersionList(n) {
  return request.get("weapp/version", { params: n });
}
function getWeappUploadLog(n) {
  return request.get(`weapp/upload/${n}`);
}
function fetchWeappUploadLog(n) {
  return request.get(`weapp/upload_log/${n}`);
}
function uploadVersion(n) {
  return request.put("applet/upload", n, { showSuccessMessage: !0 });
}
function addVersion(n) {
  return request.post("applet/version", n, { showSuccessMessage: !0 });
}
function getVersionList(n) {
  return request.get("applet/version", { params: n });
}
function editVersion(n) {
  return request.put(`applet/version/${n.id}`, n, { showSuccessMessage: !0 });
}
function deleteVersion(n) {
  return request.delete(`applet/version/${n}`);
}
function getIsTradeManaged() {
  return request.get("weapp/delivery/getIsTradeManaged");
}
function setWeappDomain(n) {
  return request.put("weapp/domain", n, { showSuccessMessage: !0 });
}
function setWeappPrivacySetting(n) {
  return request.put("weapp/privacysetting", n, { showSuccessMessage: !0 });
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
function editWechatConfig(n) {
  return request.put("wechat/config", n, { showSuccessMessage: !0 });
}
function getWechatMenu() {
  return request.get("wechat/menu");
}
function editWechatMenu(n) {
  return request.put("wechat/menu", n, { showSuccessMessage: !0 });
}
function getTemplateList() {
  return request.get("wechat/template");
}
function getBatchAcquisition(n) {
  return request.put("wechat/template/sync", n, { showSuccessMessage: !0 });
}
function getKeywordsReplyList(n) {
  return request.get("wechat/reply/keywords", { params: n });
}
function editKeywordsReply(n) {
  return request.put(`wechat/reply/keywords/${n.id}`, n, { showSuccessMessage: !0 });
}
function addKeywordsReply(n) {
  return request.post("wechat/reply/keywords", n, { showSuccessMessage: !0 });
}
function getKeywordsReplyInfo(n) {
  return request.get(`wechat/reply/keywords/${n}`);
}
function delKeywordsReply(n) {
  return request.delete(`wechat/reply/keywords/${n}`, { showSuccessMessage: !0 });
}
function getDefaultReply() {
  return request.get("wechat/reply/default");
}
function setDefaultReply(n) {
  return request.put("wechat/reply/default", n, { showSuccessMessage: !0 });
}
function getSubscribeReply() {
  return request.get("wechat/reply/subscribe");
}
function setSubscribeReply(n) {
  return request.put("wechat/reply/subscribe", n, { showSuccessMessage: !0 });
}
function getMediaList(n) {
  return request.get("wechat/media", { params: n });
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
function editConfig(n) {
  return request.put("wxoplatform/config", n, { showSuccessMessage: !0 });
}
function getAuthorizationUrl() {
  return request.get("wxoplatform/authorizationUrl");
}
function getAuthorizationResult(n) {
  return request.get("wxoplatform/authorization", { params: n, showErrorMessage: !1 });
}
function weappCommit(n) {
  return request.post("wxoplatform/weapp/version/commit", n, { showSuccessMessage: !0 });
}
function getWeappCommitRecord(n) {
  return request.get("wxoplatform/weapp/commit", { params: n });
}
function getWeappLastCommitRecord() {
  return request.get("wxoplatform/weapp/commit/last");
}
function delVersion(n) {
  return request.delete(`wxoplatform/weapp/version/${n}`);
}
function siteWeappCommit() {
  return request.post("wxoplatform/site/weapp/commit", {}, { showSuccessMessage: !0 });
}
function getSiteGroupCommitRecord(n) {
  return request.get("wxoplatform/sitegroup/commit", { params: n });
}
function undoAudit(n) {
  return request.put("wxoplatform/undo/weappaudit", n, { showSuccessMessage: !0 });
}
function syncSiteWeapp(n) {
  return request.post("wxoplatform/async/siteweapp", n, { showSuccessMessage: !0 });
}
function getAuthRecord(n) {
  return request.get("wxoplatform/authorization/record", { params: n });
}
function cancelAuthorization(n) {
  return request.post("wxoplatform/authorization/cancel", n, { showSuccessMessage: !0 });
}
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(n, r) {
  var s = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    r && (i = i.filter(function(a) {
      return Object.getOwnPropertyDescriptor(n, a).enumerable;
    })), s.push.apply(s, i);
  }
  return s;
}
function _objectSpread2(n) {
  for (var r = 1; r < arguments.length; r++) {
    var s = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(s), !0).forEach(function(i) {
      _defineProperty(n, i, s[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(s)) : ownKeys(Object(s)).forEach(function(i) {
      Object.defineProperty(n, i, Object.getOwnPropertyDescriptor(s, i));
    });
  }
  return n;
}
function _typeof(n) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(r) {
    return typeof r;
  } : _typeof = function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, _typeof(n);
}
function _defineProperty(n, r, s) {
  return r in n ? Object.defineProperty(n, r, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[r] = s, n;
}
function _extends() {
  return _extends = Object.assign || function(n) {
    for (var r = 1; r < arguments.length; r++) {
      var s = arguments[r];
      for (var i in s)
        Object.prototype.hasOwnProperty.call(s, i) && (n[i] = s[i]);
    }
    return n;
  }, _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(n, r) {
  if (n == null)
    return {};
  var s = {}, i = Object.keys(n), a, u;
  for (u = 0; u < i.length; u++)
    a = i[u], !(r.indexOf(a) >= 0) && (s[a] = n[a]);
  return s;
}
function _objectWithoutProperties(n, r) {
  if (n == null)
    return {};
  var s = _objectWithoutPropertiesLoose(n, r), i, a;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(n);
    for (a = 0; a < u.length; a++)
      i = u[a], !(r.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(n, i) && (s[i] = n[i]);
  }
  return s;
}
var version = "1.15.0";
function userAgent(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Edge = userAgent(/Edge/i), FireFox = userAgent(/firefox/i), Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i), IOS = userAgent(/iP(ad|od|hone)/i), ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i), captureMode = {
  capture: !1,
  passive: !1
};
function on(n, r, s) {
  n.addEventListener(r, s, !IE11OrLess && captureMode);
}
function off(n, r, s) {
  n.removeEventListener(r, s, !IE11OrLess && captureMode);
}
function matches(n, r) {
  if (r) {
    if (r[0] === ">" && (r = r.substring(1)), n)
      try {
        if (n.matches)
          return n.matches(r);
        if (n.msMatchesSelector)
          return n.msMatchesSelector(r);
        if (n.webkitMatchesSelector)
          return n.webkitMatchesSelector(r);
      } catch {
        return !1;
      }
    return !1;
  }
}
function getParentOrHost(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function closest(n, r, s, i) {
  if (n) {
    s = s || document;
    do {
      if (r != null && (r[0] === ">" ? n.parentNode === s && matches(n, r) : matches(n, r)) || i && n === s)
        return n;
      if (n === s)
        break;
    } while (n = getParentOrHost(n));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(n, r, s) {
  if (n && r)
    if (n.classList)
      n.classList[s ? "add" : "remove"](r);
    else {
      var i = (" " + n.className + " ").replace(R_SPACE, " ").replace(" " + r + " ", " ");
      n.className = (i + (s ? " " + r : "")).replace(R_SPACE, " ");
    }
}
function css(n, r, s) {
  var i = n && n.style;
  if (i) {
    if (s === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? s = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (s = n.currentStyle), r === void 0 ? s : s[r];
    !(r in i) && r.indexOf("webkit") === -1 && (r = "-webkit-" + r), i[r] = s + (typeof s == "string" ? "" : "px");
  }
}
function matrix(n, r) {
  var s = "";
  if (typeof n == "string")
    s = n;
  else
    do {
      var i = css(n, "transform");
      i && i !== "none" && (s = i + " " + s);
    } while (!r && (n = n.parentNode));
  var a = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return a && new a(s);
}
function find(n, r, s) {
  if (n) {
    var i = n.getElementsByTagName(r), a = 0, u = i.length;
    if (s)
      for (; a < u; a++)
        s(i[a], a);
    return i;
  }
  return [];
}
function getWindowScrollingElement() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function getRect(n, r, s, i, a) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var u, l, c, p, d, m, g;
    if (n !== window && n.parentNode && n !== getWindowScrollingElement() ? (u = n.getBoundingClientRect(), l = u.top, c = u.left, p = u.bottom, d = u.right, m = u.height, g = u.width) : (l = 0, c = 0, p = window.innerHeight, d = window.innerWidth, m = window.innerHeight, g = window.innerWidth), (r || s) && n !== window && (a = a || n.parentNode, !IE11OrLess))
      do
        if (a && a.getBoundingClientRect && (css(a, "transform") !== "none" || s && css(a, "position") !== "static")) {
          var w = a.getBoundingClientRect();
          l -= w.top + parseInt(css(a, "border-top-width")), c -= w.left + parseInt(css(a, "border-left-width")), p = l + u.height, d = c + u.width;
          break;
        }
      while (a = a.parentNode);
    if (i && n !== window) {
      var y = matrix(a || n), f = y && y.a, v = y && y.d;
      y && (l /= v, c /= f, g /= f, m /= v, p = l + m, d = c + g);
    }
    return {
      top: l,
      left: c,
      bottom: p,
      right: d,
      width: g,
      height: m
    };
  }
}
function isScrolledPast(n, r, s) {
  for (var i = getParentAutoScrollElement(n, !0), a = getRect(n)[r]; i; ) {
    var u = getRect(i)[s], l = void 0;
    if (s === "top" || s === "left" ? l = a >= u : l = a <= u, !l)
      return i;
    if (i === getWindowScrollingElement())
      break;
    i = getParentAutoScrollElement(i, !1);
  }
  return !1;
}
function getChild(n, r, s, i) {
  for (var a = 0, u = 0, l = n.children; u < l.length; ) {
    if (l[u].style.display !== "none" && l[u] !== Sortable.ghost && (i || l[u] !== Sortable.dragged) && closest(l[u], s.draggable, n, !1)) {
      if (a === r)
        return l[u];
      a++;
    }
    u++;
  }
  return null;
}
function lastChild(n, r) {
  for (var s = n.lastElementChild; s && (s === Sortable.ghost || css(s, "display") === "none" || r && !matches(s, r)); )
    s = s.previousElementSibling;
  return s || null;
}
function index$4(n, r) {
  var s = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== Sortable.clone && (!r || matches(n, r)) && s++;
  return s;
}
function getRelativeScrollOffset(n) {
  var r = 0, s = 0, i = getWindowScrollingElement();
  if (n)
    do {
      var a = matrix(n), u = a.a, l = a.d;
      r += n.scrollLeft * u, s += n.scrollTop * l;
    } while (n !== i && (n = n.parentNode));
  return [r, s];
}
function indexOfObject(n, r) {
  for (var s in n)
    if (n.hasOwnProperty(s)) {
      for (var i in r)
        if (r.hasOwnProperty(i) && r[i] === n[s][i])
          return Number(s);
    }
  return -1;
}
function getParentAutoScrollElement(n, r) {
  if (!n || !n.getBoundingClientRect)
    return getWindowScrollingElement();
  var s = n, i = !1;
  do
    if (s.clientWidth < s.scrollWidth || s.clientHeight < s.scrollHeight) {
      var a = css(s);
      if (s.clientWidth < s.scrollWidth && (a.overflowX == "auto" || a.overflowX == "scroll") || s.clientHeight < s.scrollHeight && (a.overflowY == "auto" || a.overflowY == "scroll")) {
        if (!s.getBoundingClientRect || s === document.body)
          return getWindowScrollingElement();
        if (i || r)
          return s;
        i = !0;
      }
    }
  while (s = s.parentNode);
  return getWindowScrollingElement();
}
function extend(n, r) {
  if (n && r)
    for (var s in r)
      r.hasOwnProperty(s) && (n[s] = r[s]);
  return n;
}
function isRectEqual(n, r) {
  return Math.round(n.top) === Math.round(r.top) && Math.round(n.left) === Math.round(r.left) && Math.round(n.height) === Math.round(r.height) && Math.round(n.width) === Math.round(r.width);
}
var _throttleTimeout;
function throttle(n, r) {
  return function() {
    if (!_throttleTimeout) {
      var s = arguments, i = this;
      s.length === 1 ? n.call(i, s[0]) : n.apply(i, s), _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, r);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout), _throttleTimeout = void 0;
}
function scrollBy(n, r, s) {
  n.scrollLeft += r, n.scrollTop += s;
}
function clone(n) {
  var r = window.Polymer, s = window.jQuery || window.Zepto;
  return r && r.dom ? r.dom(n).cloneNode(!0) : s ? s(n).clone(!0)[0] : n.cloneNode(!0);
}
var expando = "Sortable" + new Date().getTime();
function AnimationStateManager() {
  var n = [], r;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(a) {
          if (!(css(a, "display") === "none" || a === Sortable.ghost)) {
            n.push({
              target: a,
              rect: getRect(a)
            });
            var u = _objectSpread2({}, n[n.length - 1].rect);
            if (a.thisAnimationDuration) {
              var l = matrix(a, !0);
              l && (u.top -= l.f, u.left -= l.e);
            }
            a.fromRect = u;
          }
        });
      }
    },
    addAnimationState: function(i) {
      n.push(i);
    },
    removeAnimationState: function(i) {
      n.splice(indexOfObject(n, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var a = this;
      if (!this.options.animation) {
        clearTimeout(r), typeof i == "function" && i();
        return;
      }
      var u = !1, l = 0;
      n.forEach(function(c) {
        var p = 0, d = c.target, m = d.fromRect, g = getRect(d), w = d.prevFromRect, y = d.prevToRect, f = c.rect, v = matrix(d, !0);
        v && (g.top -= v.f, g.left -= v.e), d.toRect = g, d.thisAnimationDuration && isRectEqual(w, g) && !isRectEqual(m, g) && // Make sure animatingRect is on line between toRect & fromRect
        (f.top - g.top) / (f.left - g.left) === (m.top - g.top) / (m.left - g.left) && (p = calculateRealTime(f, w, y, a.options)), isRectEqual(g, m) || (d.prevFromRect = m, d.prevToRect = g, p || (p = a.options.animation), a.animate(d, f, g, p)), p && (u = !0, l = Math.max(l, p), clearTimeout(d.animationResetTimer), d.animationResetTimer = setTimeout(function() {
          d.animationTime = 0, d.prevFromRect = null, d.fromRect = null, d.prevToRect = null, d.thisAnimationDuration = null;
        }, p), d.thisAnimationDuration = p);
      }), clearTimeout(r), u ? r = setTimeout(function() {
        typeof i == "function" && i();
      }, l) : typeof i == "function" && i(), n = [];
    },
    animate: function(i, a, u, l) {
      if (l) {
        css(i, "transition", ""), css(i, "transform", "");
        var c = matrix(this.el), p = c && c.a, d = c && c.d, m = (a.left - u.left) / (p || 1), g = (a.top - u.top) / (d || 1);
        i.animatingX = !!m, i.animatingY = !!g, css(i, "transform", "translate3d(" + m + "px," + g + "px,0)"), this.forRepaintDummy = repaint(i), css(i, "transition", "transform " + l + "ms" + (this.options.easing ? " " + this.options.easing : "")), css(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          css(i, "transition", ""), css(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, l);
      }
    }
  };
}
function repaint(n) {
  return n.offsetWidth;
}
function calculateRealTime(n, r, s, i) {
  return Math.sqrt(Math.pow(r.top - n.top, 2) + Math.pow(r.left - n.left, 2)) / Math.sqrt(Math.pow(r.top - s.top, 2) + Math.pow(r.left - s.left, 2)) * i.animation;
}
var plugins = [], defaults = {
  initializeByDefault: !0
}, PluginManager = {
  mount: function n(r) {
    for (var s in defaults)
      defaults.hasOwnProperty(s) && !(s in r) && (r[s] = defaults[s]);
    plugins.forEach(function(i) {
      if (i.pluginName === r.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(r.pluginName, " more than once");
    }), plugins.push(r);
  },
  pluginEvent: function n(r, s, i) {
    var a = this;
    this.eventCanceled = !1, i.cancel = function() {
      a.eventCanceled = !0;
    };
    var u = r + "Global";
    plugins.forEach(function(l) {
      s[l.pluginName] && (s[l.pluginName][u] && s[l.pluginName][u](_objectSpread2({
        sortable: s
      }, i)), s.options[l.pluginName] && s[l.pluginName][r] && s[l.pluginName][r](_objectSpread2({
        sortable: s
      }, i)));
    });
  },
  initializePlugins: function n(r, s, i, a) {
    plugins.forEach(function(c) {
      var p = c.pluginName;
      if (!(!r.options[p] && !c.initializeByDefault)) {
        var d = new c(r, s, r.options);
        d.sortable = r, d.options = r.options, r[p] = d, _extends(i, d.defaults);
      }
    });
    for (var u in r.options)
      if (r.options.hasOwnProperty(u)) {
        var l = this.modifyOption(r, u, r.options[u]);
        typeof l < "u" && (r.options[u] = l);
      }
  },
  getEventProperties: function n(r, s) {
    var i = {};
    return plugins.forEach(function(a) {
      typeof a.eventProperties == "function" && _extends(i, a.eventProperties.call(s[a.pluginName], r));
    }), i;
  },
  modifyOption: function n(r, s, i) {
    var a;
    return plugins.forEach(function(u) {
      r[u.pluginName] && u.optionListeners && typeof u.optionListeners[s] == "function" && (a = u.optionListeners[s].call(r[u.pluginName], i));
    }), a;
  }
};
function dispatchEvent(n) {
  var r = n.sortable, s = n.rootEl, i = n.name, a = n.targetEl, u = n.cloneEl, l = n.toEl, c = n.fromEl, p = n.oldIndex, d = n.newIndex, m = n.oldDraggableIndex, g = n.newDraggableIndex, w = n.originalEvent, y = n.putSortable, f = n.extraEventProperties;
  if (r = r || s && s[expando], !!r) {
    var v, h = r.options, _ = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !IE11OrLess && !Edge ? v = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (v = document.createEvent("Event"), v.initEvent(i, !0, !0)), v.to = l || s, v.from = c || s, v.item = a || s, v.clone = u, v.oldIndex = p, v.newIndex = d, v.oldDraggableIndex = m, v.newDraggableIndex = g, v.originalEvent = w, v.pullMode = y ? y.lastPutMode : void 0;
    var E = _objectSpread2(_objectSpread2({}, f), PluginManager.getEventProperties(i, r));
    for (var $ in E)
      v[$] = E[$];
    s && s.dispatchEvent(v), h[_] && h[_].call(r, v);
  }
}
var _excluded = ["evt"], pluginEvent = function n(r, s) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = i.evt, u = _objectWithoutProperties(i, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(r, s, _objectSpread2({
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
    originalEvent: a,
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
    dispatchSortableEvent: function(c) {
      _dispatchEvent({
        sortable: s,
        name: c,
        originalEvent: a
      });
    }
  }, u));
};
function _dispatchEvent(n) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, n));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = !1, ignoreNextClick = !1, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = !1, isCircumstantialInvert = !1, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = !1, savedInputChecked = [], documentExists = typeof document < "u", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (documentExists) {
    if (IE11OrLess)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
}(), _detectDirection = function n(r, s) {
  var i = css(r), a = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), u = getChild(r, 0, s), l = getChild(r, 1, s), c = u && css(u), p = l && css(l), d = c && parseInt(c.marginLeft) + parseInt(c.marginRight) + getRect(u).width, m = p && parseInt(p.marginLeft) + parseInt(p.marginRight) + getRect(l).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (u && c.float && c.float !== "none") {
    var g = c.float === "left" ? "left" : "right";
    return l && (p.clear === "both" || p.clear === g) ? "vertical" : "horizontal";
  }
  return u && (c.display === "block" || c.display === "flex" || c.display === "table" || c.display === "grid" || d >= a && i[CSSFloatProperty] === "none" || l && i[CSSFloatProperty] === "none" && d + m > a) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function n(r, s, i) {
  var a = i ? r.left : r.top, u = i ? r.right : r.bottom, l = i ? r.width : r.height, c = i ? s.left : s.top, p = i ? s.right : s.bottom, d = i ? s.width : s.height;
  return a === c || u === p || a + l / 2 === c + d / 2;
}, _detectNearestEmptySortable = function n(r, s) {
  var i;
  return sortables.some(function(a) {
    var u = a[expando].options.emptyInsertThreshold;
    if (!(!u || lastChild(a))) {
      var l = getRect(a), c = r >= l.left - u && r <= l.right + u, p = s >= l.top - u && s <= l.bottom + u;
      if (c && p)
        return i = a;
    }
  }), i;
}, _prepareGroup = function n(r) {
  function s(u, l) {
    return function(c, p, d, m) {
      var g = c.options.group.name && p.options.group.name && c.options.group.name === p.options.group.name;
      if (u == null && (l || g))
        return !0;
      if (u == null || u === !1)
        return !1;
      if (l && u === "clone")
        return u;
      if (typeof u == "function")
        return s(u(c, p, d, m), l)(c, p, d, m);
      var w = (l ? c : p).options.group.name;
      return u === !0 || typeof u == "string" && u === w || u.join && u.indexOf(w) > -1;
    };
  }
  var i = {}, a = r.group;
  (!a || _typeof(a) != "object") && (a = {
    name: a
  }), i.name = a.name, i.checkPull = s(a.pull, !0), i.checkPut = s(a.put), i.revertClone = a.revertClone, r.group = i;
}, _hideGhostForTarget = function n() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "none");
}, _unhideGhostForTarget = function n() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "");
};
documentExists && !ChromeForAndroid && document.addEventListener("click", function(n) {
  if (ignoreNextClick)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), ignoreNextClick = !1, !1;
}, !0);
var nearestEmptyInsertDetectEvent = function n(r) {
  if (dragEl) {
    r = r.touches ? r.touches[0] : r;
    var s = _detectNearestEmptySortable(r.clientX, r.clientY);
    if (s) {
      var i = {};
      for (var a in r)
        r.hasOwnProperty(a) && (i[a] = r[a]);
      i.target = i.rootEl = s, i.preventDefault = void 0, i.stopPropagation = void 0, s[expando]._onDragOver(i);
    }
  }
}, _checkOutsideTargetEl = function n(r) {
  dragEl && dragEl.parentNode[expando]._isOutsideThisEl(r.target);
};
function Sortable(n, r) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = r = _extends({}, r), n[expando] = this;
  var s = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(n.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return _detectDirection(n, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(l, c) {
      l.setData("Text", c.textContent);
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
  PluginManager.initializePlugins(this, n, s);
  for (var i in s)
    !(i in r) && (r[i] = s[i]);
  _prepareGroup(r);
  for (var a in this)
    a.charAt(0) === "_" && typeof this[a] == "function" && (this[a] = this[a].bind(this));
  this.nativeDraggable = r.forceFallback ? !1 : supportDraggable, this.nativeDraggable && (this.options.touchStartThreshold = 1), r.supportPointer ? on(n, "pointerdown", this._onTapStart) : (on(n, "mousedown", this._onTapStart), on(n, "touchstart", this._onTapStart)), this.nativeDraggable && (on(n, "dragover", this), on(n, "dragenter", this)), sortables.push(this.el), r.store && r.store.get && this.sort(r.store.get(this) || []), _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function n(r) {
    !this.el.contains(r) && r !== this.el && (lastTarget = null);
  },
  _getDirection: function n(r, s) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, r, s, dragEl) : this.options.direction;
  },
  _onTapStart: function n(r) {
    if (r.cancelable) {
      var s = this, i = this.el, a = this.options, u = a.preventOnFilter, l = r.type, c = r.touches && r.touches[0] || r.pointerType && r.pointerType === "touch" && r, p = (c || r).target, d = r.target.shadowRoot && (r.path && r.path[0] || r.composedPath && r.composedPath()[0]) || p, m = a.filter;
      if (_saveInputCheckedState(i), !dragEl && !(/mousedown|pointerdown/.test(l) && r.button !== 0 || a.disabled) && !d.isContentEditable && !(!this.nativeDraggable && Safari && p && p.tagName.toUpperCase() === "SELECT") && (p = closest(p, a.draggable, i, !1), !(p && p.animated) && lastDownEl !== p)) {
        if (oldIndex = index$4(p), oldDraggableIndex = index$4(p, a.draggable), typeof m == "function") {
          if (m.call(this, r, p, this)) {
            _dispatchEvent({
              sortable: s,
              rootEl: d,
              name: "filter",
              targetEl: p,
              toEl: i,
              fromEl: i
            }), pluginEvent("filter", s, {
              evt: r
            }), u && r.cancelable && r.preventDefault();
            return;
          }
        } else if (m && (m = m.split(",").some(function(g) {
          if (g = closest(d, g.trim(), i, !1), g)
            return _dispatchEvent({
              sortable: s,
              rootEl: g,
              name: "filter",
              targetEl: p,
              fromEl: i,
              toEl: i
            }), pluginEvent("filter", s, {
              evt: r
            }), !0;
        }), m)) {
          u && r.cancelable && r.preventDefault();
          return;
        }
        a.handle && !closest(d, a.handle, i, !1) || this._prepareDragStart(r, c, p);
      }
    }
  },
  _prepareDragStart: function n(r, s, i) {
    var a = this, u = a.el, l = a.options, c = u.ownerDocument, p;
    if (i && !dragEl && i.parentNode === u) {
      var d = getRect(i);
      if (rootEl = u, dragEl = i, parentEl = dragEl.parentNode, nextEl = dragEl.nextSibling, lastDownEl = i, activeGroup = l.group, Sortable.dragged = dragEl, tapEvt = {
        target: dragEl,
        clientX: (s || r).clientX,
        clientY: (s || r).clientY
      }, tapDistanceLeft = tapEvt.clientX - d.left, tapDistanceTop = tapEvt.clientY - d.top, this._lastX = (s || r).clientX, this._lastY = (s || r).clientY, dragEl.style["will-change"] = "all", p = function() {
        if (pluginEvent("delayEnded", a, {
          evt: r
        }), Sortable.eventCanceled) {
          a._onDrop();
          return;
        }
        a._disableDelayedDragEvents(), !FireFox && a.nativeDraggable && (dragEl.draggable = !0), a._triggerDragStart(r, s), _dispatchEvent({
          sortable: a,
          name: "choose",
          originalEvent: r
        }), toggleClass(dragEl, l.chosenClass, !0);
      }, l.ignore.split(",").forEach(function(m) {
        find(dragEl, m.trim(), _disableDraggable);
      }), on(c, "dragover", nearestEmptyInsertDetectEvent), on(c, "mousemove", nearestEmptyInsertDetectEvent), on(c, "touchmove", nearestEmptyInsertDetectEvent), on(c, "mouseup", a._onDrop), on(c, "touchend", a._onDrop), on(c, "touchcancel", a._onDrop), FireFox && this.nativeDraggable && (this.options.touchStartThreshold = 4, dragEl.draggable = !0), pluginEvent("delayStart", this, {
        evt: r
      }), l.delay && (!l.delayOnTouchOnly || s) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(c, "mouseup", a._disableDelayedDrag), on(c, "touchend", a._disableDelayedDrag), on(c, "touchcancel", a._disableDelayedDrag), on(c, "mousemove", a._delayedDragTouchMoveHandler), on(c, "touchmove", a._delayedDragTouchMoveHandler), l.supportPointer && on(c, "pointermove", a._delayedDragTouchMoveHandler), a._dragStartTimer = setTimeout(p, l.delay);
      } else
        p();
    }
  },
  _delayedDragTouchMoveHandler: function n(r) {
    var s = r.touches ? r.touches[0] : r;
    Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function n() {
    dragEl && _disableDraggable(dragEl), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function n() {
    var r = this.el.ownerDocument;
    off(r, "mouseup", this._disableDelayedDrag), off(r, "touchend", this._disableDelayedDrag), off(r, "touchcancel", this._disableDelayedDrag), off(r, "mousemove", this._delayedDragTouchMoveHandler), off(r, "touchmove", this._delayedDragTouchMoveHandler), off(r, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function n(r, s) {
    s = s || r.pointerType == "touch" && r, !this.nativeDraggable || s ? this.options.supportPointer ? on(document, "pointermove", this._onTouchMove) : s ? on(document, "touchmove", this._onTouchMove) : on(document, "mousemove", this._onTouchMove) : (on(dragEl, "dragend", this), on(rootEl, "dragstart", this._onDragStart));
    try {
      document.selection ? _nextTick(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function n(r, s) {
    if (awaitingDragStarted = !1, rootEl && dragEl) {
      pluginEvent("dragStarted", this, {
        evt: s
      }), this.nativeDraggable && on(document, "dragover", _checkOutsideTargetEl);
      var i = this.options;
      !r && toggleClass(dragEl, i.dragClass, !1), toggleClass(dragEl, i.ghostClass, !0), Sortable.active = this, r && this._appendGhost(), _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: s
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function n() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX, this._lastY = touchEvt.clientY, _hideGhostForTarget();
      for (var r = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY), s = r; r && r.shadowRoot && (r = r.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY), r !== s); )
        s = r;
      if (dragEl.parentNode[expando]._isOutsideThisEl(r), s)
        do {
          if (s[expando]) {
            var i = void 0;
            if (i = s[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: r,
              rootEl: s
            }), i && !this.options.dragoverBubble)
              break;
          }
          r = s;
        } while (s = s.parentNode);
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function n(r) {
    if (tapEvt) {
      var s = this.options, i = s.fallbackTolerance, a = s.fallbackOffset, u = r.touches ? r.touches[0] : r, l = ghostEl && matrix(ghostEl, !0), c = ghostEl && l && l.a, p = ghostEl && l && l.d, d = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), m = (u.clientX - tapEvt.clientX + a.x) / (c || 1) + (d ? d[0] - ghostRelativeParentInitialScroll[0] : 0) / (c || 1), g = (u.clientY - tapEvt.clientY + a.y) / (p || 1) + (d ? d[1] - ghostRelativeParentInitialScroll[1] : 0) / (p || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (i && Math.max(Math.abs(u.clientX - this._lastX), Math.abs(u.clientY - this._lastY)) < i)
          return;
        this._onDragStart(r, !0);
      }
      if (ghostEl) {
        l ? (l.e += m - (lastDx || 0), l.f += g - (lastDy || 0)) : l = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: m,
          f: g
        };
        var w = "matrix(".concat(l.a, ",").concat(l.b, ",").concat(l.c, ",").concat(l.d, ",").concat(l.e, ",").concat(l.f, ")");
        css(ghostEl, "webkitTransform", w), css(ghostEl, "mozTransform", w), css(ghostEl, "msTransform", w), css(ghostEl, "transform", w), lastDx = m, lastDy = g, touchEvt = u;
      }
      r.cancelable && r.preventDefault();
    }
  },
  _appendGhost: function n() {
    if (!ghostEl) {
      var r = this.options.fallbackOnBody ? document.body : rootEl, s = getRect(dragEl, !0, PositionGhostAbsolutely, !0, r), i = this.options;
      if (PositionGhostAbsolutely) {
        for (ghostRelativeParent = r; css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document; )
          ghostRelativeParent = ghostRelativeParent.parentNode;
        ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement ? (ghostRelativeParent === document && (ghostRelativeParent = getWindowScrollingElement()), s.top += ghostRelativeParent.scrollTop, s.left += ghostRelativeParent.scrollLeft) : ghostRelativeParent = getWindowScrollingElement(), ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(!0), toggleClass(ghostEl, i.ghostClass, !1), toggleClass(ghostEl, i.fallbackClass, !0), toggleClass(ghostEl, i.dragClass, !0), css(ghostEl, "transition", ""), css(ghostEl, "transform", ""), css(ghostEl, "box-sizing", "border-box"), css(ghostEl, "margin", 0), css(ghostEl, "top", s.top), css(ghostEl, "left", s.left), css(ghostEl, "width", s.width), css(ghostEl, "height", s.height), css(ghostEl, "opacity", "0.8"), css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed"), css(ghostEl, "zIndex", "100000"), css(ghostEl, "pointerEvents", "none"), Sortable.ghost = ghostEl, r.appendChild(ghostEl), css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function n(r, s) {
    var i = this, a = r.dataTransfer, u = i.options;
    if (pluginEvent("dragStart", this, {
      evt: r
    }), Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent("setupClone", this), Sortable.eventCanceled || (cloneEl = clone(dragEl), cloneEl.removeAttribute("id"), cloneEl.draggable = !1, cloneEl.style["will-change"] = "", this._hideClone(), toggleClass(cloneEl, this.options.chosenClass, !1), Sortable.clone = cloneEl), i.cloneId = _nextTick(function() {
      pluginEvent("clone", i), !Sortable.eventCanceled && (i.options.removeCloneOnHide || rootEl.insertBefore(cloneEl, dragEl), i._hideClone(), _dispatchEvent({
        sortable: i,
        name: "clone"
      }));
    }), !s && toggleClass(dragEl, u.dragClass, !0), s ? (ignoreNextClick = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (off(document, "mouseup", i._onDrop), off(document, "touchend", i._onDrop), off(document, "touchcancel", i._onDrop), a && (a.effectAllowed = "move", u.setData && u.setData.call(i, a, dragEl)), on(document, "drop", i), css(dragEl, "transform", "translateZ(0)")), awaitingDragStarted = !0, i._dragStartId = _nextTick(i._dragStarted.bind(i, s, r)), on(document, "selectstart", i), moved = !0, Safari && css(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function n(r) {
    var s = this.el, i = r.target, a, u, l, c = this.options, p = c.group, d = Sortable.active, m = activeGroup === p, g = c.sort, w = putSortable || d, y, f = this, v = !1;
    if (_silent)
      return;
    function h(N, F) {
      pluginEvent(N, f, _objectSpread2({
        evt: r,
        isOwner: m,
        axis: y ? "vertical" : "horizontal",
        revert: l,
        dragRect: a,
        targetRect: u,
        canSort: g,
        fromSortable: w,
        target: i,
        completed: E,
        onMove: function(j, U) {
          return _onMove(rootEl, s, dragEl, a, j, getRect(j), r, U);
        },
        changed: $
      }, F));
    }
    function _() {
      h("dragOverAnimationCapture"), f.captureAnimationState(), f !== w && w.captureAnimationState();
    }
    function E(N) {
      return h("dragOverCompleted", {
        insertion: N
      }), N && (m ? d._hideClone() : d._showClone(f), f !== w && (toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : d.options.ghostClass, !1), toggleClass(dragEl, c.ghostClass, !0)), putSortable !== f && f !== Sortable.active ? putSortable = f : f === Sortable.active && putSortable && (putSortable = null), w === f && (f._ignoreWhileAnimating = i), f.animateAll(function() {
        h("dragOverAnimationComplete"), f._ignoreWhileAnimating = null;
      }), f !== w && (w.animateAll(), w._ignoreWhileAnimating = null)), (i === dragEl && !dragEl.animated || i === s && !i.animated) && (lastTarget = null), !c.dragoverBubble && !r.rootEl && i !== document && (dragEl.parentNode[expando]._isOutsideThisEl(r.target), !N && nearestEmptyInsertDetectEvent(r)), !c.dragoverBubble && r.stopPropagation && r.stopPropagation(), v = !0;
    }
    function $() {
      newIndex = index$4(dragEl), newDraggableIndex = index$4(dragEl, c.draggable), _dispatchEvent({
        sortable: f,
        name: "change",
        toEl: s,
        newIndex,
        newDraggableIndex,
        originalEvent: r
      });
    }
    if (r.preventDefault !== void 0 && r.cancelable && r.preventDefault(), i = closest(i, c.draggable, s, !0), h("dragOver"), Sortable.eventCanceled)
      return v;
    if (dragEl.contains(r.target) || i.animated && i.animatingX && i.animatingY || f._ignoreWhileAnimating === i)
      return E(!1);
    if (ignoreNextClick = !1, d && !c.disabled && (m ? g || (l = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, d, dragEl, r)) && p.checkPut(this, d, dragEl, r))) {
      if (y = this._getDirection(r, i) === "vertical", a = getRect(dragEl), h("dragOverValid"), Sortable.eventCanceled)
        return v;
      if (l)
        return parentEl = rootEl, _(), this._hideClone(), h("revert"), Sortable.eventCanceled || (nextEl ? rootEl.insertBefore(dragEl, nextEl) : rootEl.appendChild(dragEl)), E(!0);
      var x = lastChild(s, c.draggable);
      if (!x || _ghostIsLast(r, y, this) && !x.animated) {
        if (x === dragEl)
          return E(!1);
        if (x && s === r.target && (i = x), i && (u = getRect(i)), _onMove(rootEl, s, dragEl, a, i, u, r, !!i) !== !1)
          return _(), x && x.nextSibling ? s.insertBefore(dragEl, x.nextSibling) : s.appendChild(dragEl), parentEl = s, $(), E(!0);
      } else if (x && _ghostIsFirst(r, y, this)) {
        var T = getChild(s, 0, c, !0);
        if (T === dragEl)
          return E(!1);
        if (i = T, u = getRect(i), _onMove(rootEl, s, dragEl, a, i, u, r, !1) !== !1)
          return _(), s.insertBefore(dragEl, T), parentEl = s, $(), E(!0);
      } else if (i.parentNode === s) {
        u = getRect(i);
        var k = 0, b, C = dragEl.parentNode !== s, S = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || a, i.animated && i.toRect || u, y), A = y ? "top" : "left", L = isScrolledPast(i, "top", "top") || isScrolledPast(dragEl, "top", "top"), P = L ? L.scrollTop : void 0;
        lastTarget !== i && (b = u[A], pastFirstInvertThresh = !1, isCircumstantialInvert = !S && c.invertSwap || C), k = _getSwapDirection(r, i, u, y, S ? 1 : c.swapThreshold, c.invertedSwapThreshold == null ? c.swapThreshold : c.invertedSwapThreshold, isCircumstantialInvert, lastTarget === i);
        var M;
        if (k !== 0) {
          var q = index$4(dragEl);
          do
            q -= k, M = parentEl.children[q];
          while (M && (css(M, "display") === "none" || M === ghostEl));
        }
        if (k === 0 || M === i)
          return E(!1);
        lastTarget = i, lastDirection = k;
        var I = i.nextElementSibling, D = !1;
        D = k === 1;
        var R = _onMove(rootEl, s, dragEl, a, i, u, r, D);
        if (R !== !1)
          return (R === 1 || R === -1) && (D = R === 1), _silent = !0, setTimeout(_unsilent, 30), _(), D && !I ? s.appendChild(dragEl) : i.parentNode.insertBefore(dragEl, D ? I : i), L && scrollBy(L, 0, P - L.scrollTop), parentEl = dragEl.parentNode, b !== void 0 && !isCircumstantialInvert && (targetMoveDistance = Math.abs(b - getRect(i)[A])), $(), E(!0);
      }
      if (s.contains(dragEl))
        return E(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function n() {
    off(document, "mousemove", this._onTouchMove), off(document, "touchmove", this._onTouchMove), off(document, "pointermove", this._onTouchMove), off(document, "dragover", nearestEmptyInsertDetectEvent), off(document, "mousemove", nearestEmptyInsertDetectEvent), off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function n() {
    var r = this.el.ownerDocument;
    off(r, "mouseup", this._onDrop), off(r, "touchend", this._onDrop), off(r, "pointerup", this._onDrop), off(r, "touchcancel", this._onDrop), off(document, "selectstart", this);
  },
  _onDrop: function n(r) {
    var s = this.el, i = this.options;
    if (newIndex = index$4(dragEl), newDraggableIndex = index$4(dragEl, i.draggable), pluginEvent("drop", this, {
      evt: r
    }), parentEl = dragEl && dragEl.parentNode, newIndex = index$4(dragEl), newDraggableIndex = index$4(dragEl, i.draggable), Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = !1, isCircumstantialInvert = !1, pastFirstInvertThresh = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _cancelNextTick(this.cloneId), _cancelNextTick(this._dragStartId), this.nativeDraggable && (off(document, "drop", this), off(s, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Safari && css(document.body, "user-select", ""), css(dragEl, "transform", ""), r && (moved && (r.cancelable && r.preventDefault(), !i.dropBubble && r.stopPropagation()), ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl), (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") && cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), dragEl && (this.nativeDraggable && off(dragEl, "dragend", this), _disableDraggable(dragEl), dragEl.style["will-change"] = "", moved && !awaitingDragStarted && toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, !1), toggleClass(dragEl, this.options.chosenClass, !1), _dispatchEvent({
      sortable: this,
      name: "unchoose",
      toEl: parentEl,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: r
    }), rootEl !== parentEl ? (newIndex >= 0 && (_dispatchEvent({
      rootEl: parentEl,
      name: "add",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: r
    }), _dispatchEvent({
      sortable: this,
      name: "remove",
      toEl: parentEl,
      originalEvent: r
    }), _dispatchEvent({
      rootEl: parentEl,
      name: "sort",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: r
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: r
    })), putSortable && putSortable.save()) : newIndex !== oldIndex && newIndex >= 0 && (_dispatchEvent({
      sortable: this,
      name: "update",
      toEl: parentEl,
      originalEvent: r
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: r
    })), Sortable.active && ((newIndex == null || newIndex === -1) && (newIndex = oldIndex, newDraggableIndex = oldDraggableIndex), _dispatchEvent({
      sortable: this,
      name: "end",
      toEl: parentEl,
      originalEvent: r
    }), this.save()))), this._nulling();
  },
  _nulling: function n() {
    pluginEvent("nulling", this), rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null, savedInputChecked.forEach(function(r) {
      r.checked = !0;
    }), savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function n(r) {
    switch (r.type) {
      case "drop":
      case "dragend":
        this._onDrop(r);
        break;
      case "dragenter":
      case "dragover":
        dragEl && (this._onDragOver(r), _globalDragOver(r));
        break;
      case "selectstart":
        r.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function n() {
    for (var r = [], s, i = this.el.children, a = 0, u = i.length, l = this.options; a < u; a++)
      s = i[a], closest(s, l.draggable, this.el, !1) && r.push(s.getAttribute(l.dataIdAttr) || _generateId(s));
    return r;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function n(r, s) {
    var i = {}, a = this.el;
    this.toArray().forEach(function(u, l) {
      var c = a.children[l];
      closest(c, this.options.draggable, a, !1) && (i[u] = c);
    }, this), s && this.captureAnimationState(), r.forEach(function(u) {
      i[u] && (a.removeChild(i[u]), a.appendChild(i[u]));
    }), s && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function n() {
    var r = this.options.store;
    r && r.set && r.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function n(r, s) {
    return closest(r, s || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function n(r, s) {
    var i = this.options;
    if (s === void 0)
      return i[r];
    var a = PluginManager.modifyOption(this, r, s);
    typeof a < "u" ? i[r] = a : i[r] = s, r === "group" && _prepareGroup(i);
  },
  /**
   * Destroy
   */
  destroy: function n() {
    pluginEvent("destroy", this);
    var r = this.el;
    r[expando] = null, off(r, "mousedown", this._onTapStart), off(r, "touchstart", this._onTapStart), off(r, "pointerdown", this._onTapStart), this.nativeDraggable && (off(r, "dragover", this), off(r, "dragenter", this)), Array.prototype.forEach.call(r.querySelectorAll("[draggable]"), function(s) {
      s.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), sortables.splice(sortables.indexOf(this.el), 1), this.el = r = null;
  },
  _hideClone: function n() {
    if (!cloneHidden) {
      if (pluginEvent("hideClone", this), Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none"), this.options.removeCloneOnHide && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), cloneHidden = !0;
    }
  },
  _showClone: function n(r) {
    if (r.lastPutMode !== "clone") {
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
function _globalDragOver(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function _onMove(n, r, s, i, a, u, l, c) {
  var p, d = n[expando], m = d.options.onMove, g;
  return window.CustomEvent && !IE11OrLess && !Edge ? p = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (p = document.createEvent("Event"), p.initEvent("move", !0, !0)), p.to = r, p.from = n, p.dragged = s, p.draggedRect = i, p.related = a || r, p.relatedRect = u || getRect(r), p.willInsertAfter = c, p.originalEvent = l, n.dispatchEvent(p), m && (g = m.call(d, p, l)), g;
}
function _disableDraggable(n) {
  n.draggable = !1;
}
function _unsilent() {
  _silent = !1;
}
function _ghostIsFirst(n, r, s) {
  var i = getRect(getChild(s.el, 0, s.options, !0)), a = 10;
  return r ? n.clientX < i.left - a || n.clientY < i.top && n.clientX < i.right : n.clientY < i.top - a || n.clientY < i.bottom && n.clientX < i.left;
}
function _ghostIsLast(n, r, s) {
  var i = getRect(lastChild(s.el, s.options.draggable)), a = 10;
  return r ? n.clientX > i.right + a || n.clientX <= i.right && n.clientY > i.bottom && n.clientX >= i.left : n.clientX > i.right && n.clientY > i.top || n.clientX <= i.right && n.clientY > i.bottom + a;
}
function _getSwapDirection(n, r, s, i, a, u, l, c) {
  var p = i ? n.clientY : n.clientX, d = i ? s.height : s.width, m = i ? s.top : s.left, g = i ? s.bottom : s.right, w = !1;
  if (!l) {
    if (c && targetMoveDistance < d * a) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? p > m + d * u / 2 : p < g - d * u / 2) && (pastFirstInvertThresh = !0), pastFirstInvertThresh)
        w = !0;
      else if (lastDirection === 1 ? p < m + targetMoveDistance : p > g - targetMoveDistance)
        return -lastDirection;
    } else if (p > m + d * (1 - a) / 2 && p < g - d * (1 - a) / 2)
      return _getInsertDirection(r);
  }
  return w = w || l, w && (p < m + d * u / 2 || p > g - d * u / 2) ? p > m + d / 2 ? 1 : -1 : 0;
}
function _getInsertDirection(n) {
  return index$4(dragEl) < index$4(n) ? 1 : -1;
}
function _generateId(n) {
  for (var r = n.tagName + n.className + n.src + n.href + n.textContent, s = r.length, i = 0; s--; )
    i += r.charCodeAt(s);
  return i.toString(36);
}
function _saveInputCheckedState(n) {
  savedInputChecked.length = 0;
  for (var r = n.getElementsByTagName("input"), s = r.length; s--; ) {
    var i = r[s];
    i.checked && savedInputChecked.push(i);
  }
}
function _nextTick(n) {
  return setTimeout(n, 0);
}
function _cancelNextTick(n) {
  return clearTimeout(n);
}
documentExists && on(document, "touchmove", function(n) {
  (Sortable.active || awaitingDragStarted) && n.cancelable && n.preventDefault();
});
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function n(r, s) {
    return !!closest(r, s, r, !1);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index: index$4,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(n) {
  return n[expando];
};
Sortable.mount = function() {
  for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++)
    r[s] = arguments[s];
  r[0].constructor === Array && (r = r[0]), r.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), i.utils)), PluginManager.mount(i);
  });
};
Sortable.create = function(n, r) {
  return new Sortable(n, r);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = !1, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function n() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var r in this)
      r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  }
  return n.prototype = {
    dragStarted: function(s) {
      var i = s.originalEvent;
      this.sortable.nativeDraggable ? on(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? on(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? on(document, "touchmove", this._handleFallbackAutoScroll) : on(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(s) {
      var i = s.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
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
    _handleAutoScroll: function(s, i) {
      var a = this, u = (s.touches ? s.touches[0] : s).clientX, l = (s.touches ? s.touches[0] : s).clientY, c = document.elementFromPoint(u, l);
      if (touchEvt$1 = s, i || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(s, this.options, c, i);
        var p = getParentAutoScrollElement(c, !0);
        scrolling && (!pointerElemChangedInterval || u !== lastAutoScrollX || l !== lastAutoScrollY) && (pointerElemChangedInterval && clearPointerElemChangedInterval(), pointerElemChangedInterval = setInterval(function() {
          var d = getParentAutoScrollElement(document.elementFromPoint(u, l), !0);
          d !== p && (p = d, clearAutoScrolls()), autoScroll(s, a.options, d, i);
        }, 10), lastAutoScrollX = u, lastAutoScrollY = l);
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(c, !0) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(s, this.options, getParentAutoScrollElement(c, !1), !1);
      }
    }
  }, _extends(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(n) {
    clearInterval(n.pid);
  }), autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(n, r, s, i) {
  if (r.scroll) {
    var a = (n.touches ? n.touches[0] : n).clientX, u = (n.touches ? n.touches[0] : n).clientY, l = r.scrollSensitivity, c = r.scrollSpeed, p = getWindowScrollingElement(), d = !1, m;
    scrollRootEl !== s && (scrollRootEl = s, clearAutoScrolls(), scrollEl = r.scroll, m = r.scrollFn, scrollEl === !0 && (scrollEl = getParentAutoScrollElement(s, !0)));
    var g = 0, w = scrollEl;
    do {
      var y = w, f = getRect(y), v = f.top, h = f.bottom, _ = f.left, E = f.right, $ = f.width, x = f.height, T = void 0, k = void 0, b = y.scrollWidth, C = y.scrollHeight, S = css(y), A = y.scrollLeft, L = y.scrollTop;
      y === p ? (T = $ < b && (S.overflowX === "auto" || S.overflowX === "scroll" || S.overflowX === "visible"), k = x < C && (S.overflowY === "auto" || S.overflowY === "scroll" || S.overflowY === "visible")) : (T = $ < b && (S.overflowX === "auto" || S.overflowX === "scroll"), k = x < C && (S.overflowY === "auto" || S.overflowY === "scroll"));
      var P = T && (Math.abs(E - a) <= l && A + $ < b) - (Math.abs(_ - a) <= l && !!A), M = k && (Math.abs(h - u) <= l && L + x < C) - (Math.abs(v - u) <= l && !!L);
      if (!autoScrolls[g])
        for (var q = 0; q <= g; q++)
          autoScrolls[q] || (autoScrolls[q] = {});
      (autoScrolls[g].vx != P || autoScrolls[g].vy != M || autoScrolls[g].el !== y) && (autoScrolls[g].el = y, autoScrolls[g].vx = P, autoScrolls[g].vy = M, clearInterval(autoScrolls[g].pid), (P != 0 || M != 0) && (d = !0, autoScrolls[g].pid = setInterval(function() {
        i && this.layer === 0 && Sortable.active._onTouchMove(touchEvt$1);
        var I = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * c : 0, D = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * c : 0;
        typeof m == "function" && m.call(Sortable.dragged.parentNode[expando], D, I, n, touchEvt$1, autoScrolls[this.layer].el) !== "continue" || scrollBy(autoScrolls[this.layer].el, D, I);
      }.bind({
        layer: g
      }), 24))), g++;
    } while (r.bubbleScroll && w !== p && (w = getParentAutoScrollElement(w, !1)));
    scrolling = d;
  }
}, 30), drop = function n(r) {
  var s = r.originalEvent, i = r.putSortable, a = r.dragEl, u = r.activeSortable, l = r.dispatchSortableEvent, c = r.hideGhostForTarget, p = r.unhideGhostForTarget;
  if (s) {
    var d = i || u;
    c();
    var m = s.changedTouches && s.changedTouches.length ? s.changedTouches[0] : s, g = document.elementFromPoint(m.clientX, m.clientY);
    p(), d && !d.el.contains(g) && (l("spill"), this.onSpill({
      dragEl: a,
      putSortable: i
    }));
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function n(r) {
    var s = r.oldDraggableIndex;
    this.startIndex = s;
  },
  onSpill: function n(r) {
    var s = r.dragEl, i = r.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var a = getChild(this.sortable.el, this.startIndex, this.options);
    a ? this.sortable.el.insertBefore(s, a) : this.sortable.el.appendChild(s), this.sortable.animateAll(), i && i.animateAll();
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function n(r) {
    var s = r.dragEl, i = r.putSortable, a = i || this.sortable;
    a.captureAnimationState(), s.parentNode && s.parentNode.removeChild(s), a.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
const _hoisted_1$2 = { class: "flex flex-wrap" }, _hoisted_2$1 = {
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
  setup(n, { emit: r }) {
    const s = n, i = r, a = computed({
      get() {
        return s.modelValue;
      },
      set(h) {
        i("update:modelValue", h);
      }
    }), u = reactive({
      data: []
    });
    let l = reactive([]);
    const c = () => {
      a.value = toRaw(u.data).toString(), l = toRaw(u.data).map((h) => h.indexOf("data:image") != -1 ? h : img(h));
    }, p = computed(() => s.limit - u.data.length);
    watch(() => a.value, () => {
      a.value.indexOf("data:image") != -1 ? u.data = [a.value] : u.data = [
        ...a.value.split(",").filter((h) => h)
      ], c();
    }, { immediate: !0 });
    const d = computed(() => ({
      width: s.width,
      height: s.height
    })), m = (h) => {
      s.limit == 1 ? (u.data.splice(0, 1), h && u.data.push(h.url)) : (h.forEach((_) => {
        u.data.length < s.limit && u.data.push(_.url);
      }), nextTick(() => {
        v();
      })), c(), nextTick(() => {
        i("change", a.value);
      });
    }, g = (h = 0) => {
      u.data.splice(h, 1), c();
    }, w = reactive({
      show: !1,
      index: 0
    }), y = (h = 0) => {
      w.show = !0, w.index = h;
    }, f = ref(null);
    onMounted(() => {
      nextTick(() => {
        v();
      });
    });
    const v = () => {
      s.limit != 1 && Sortable.create(f.value, {
        group: "image-wrap",
        animation: 300,
        onEnd: (h) => {
          const _ = u.data[h.oldIndex];
          u.data.splice(h.oldIndex, 1), u.data.splice(h.newIndex, 0, _), c();
        }
      });
    };
    return (h, _) => {
      const E = resolveComponent("el-image"), $ = resolveComponent("icon"), x = resolveComponent("upload-attachment"), T = resolveComponent("el-image-viewer");
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", _hoisted_1$2, [
          n.limit == 1 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px]", { "rounded-full": n.type == "avatar" }]),
            style: normalizeStyle(d.value)
          }, [
            u.data.length ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
              createElementVNode("div", _hoisted_3$1, [
                createVNode(E, {
                  class: "w-full h-full",
                  src: u.data[0].indexOf("data:image") != -1 ? u.data[0] : unref(img)(u.data[0]),
                  fit: n.imageFit
                }, null, 8, ["src", "fit"])
              ]),
              createElementVNode("div", _hoisted_4, [
                createVNode($, {
                  name: "element ZoomIn",
                  color: "#fff",
                  size: "18px",
                  class: "mr-[10px]",
                  onClick: _[0] || (_[0] = (k) => y())
                }),
                createVNode($, {
                  name: "element Delete",
                  color: "#fff",
                  size: "18px",
                  onClick: withModifiers(g, ["stop"])
                }, null, 8, ["onClick"])
              ])
            ])) : (openBlock(), createBlock(x, {
              key: 1,
              limit: p.value,
              onConfirm: m
            }, {
              default: withCtx(() => [
                createElementVNode("div", _hoisted_5, [
                  createVNode($, {
                    name: "element Plus",
                    size: "20px",
                    color: "var(--el-text-color-secondary)"
                  }),
                  createElementVNode("div", _hoisted_6, toDisplayString(n.imageText || unref(t$1)("upload.root")), 1)
                ])
              ]),
              _: 1
            }, 8, ["limit"]))
          ], 6)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createElementVNode("div", {
              class: "flex flex-wrap",
              ref_key: "imgListRef",
              ref: f
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(u.data, (k, b) => (openBlock(), createElementBlock("div", {
                class: "rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px] mb-[10px]",
                style: normalizeStyle(d.value),
                key: k + b
              }, [
                createElementVNode("div", _hoisted_7, [
                  createElementVNode("div", _hoisted_8, [
                    createVNode(E, {
                      src: unref(img)(k),
                      fit: "contain"
                    }, null, 8, ["src"])
                  ]),
                  createElementVNode("div", _hoisted_9, [
                    createVNode($, {
                      name: "element ZoomIn",
                      color: "#fff",
                      size: "18px",
                      class: "mr-[10px]",
                      onClick: (C) => y(b)
                    }, null, 8, ["onClick"]),
                    createVNode($, {
                      name: "element Delete",
                      color: "#fff",
                      size: "18px",
                      onClick: (C) => g(b)
                    }, null, 8, ["onClick"])
                  ])
                ])
              ], 4))), 128))
            ], 512),
            u.data.length < n.limit ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color",
              style: normalizeStyle(d.value)
            }, [
              createVNode(x, {
                limit: p.value,
                onConfirm: m
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_10, [
                    createVNode($, {
                      name: "element Plus",
                      size: "20px",
                      color: "var(--el-text-color-secondary)"
                    }),
                    createElementVNode("div", _hoisted_11, toDisplayString(n.imageText || unref(t$1)("upload.root")), 1)
                  ])
                ]),
                _: 1
              }, 8, ["limit"])
            ], 4)) : createCommentVNode("", !0)
          ], 64))
        ]),
        w.show ? (openBlock(), createBlock(T, {
          key: 0,
          "url-list": unref(l),
          onClose: _[1] || (_[1] = (k) => w.show = !1),
          "initial-index": w.index,
          "zoom-rate": 1
        }, null, 8, ["url-list", "initial-index"])) : createCommentVNode("", !0)
      ], 64);
    };
  }
}), index_vue_vue_type_style_index_0_scoped_c0ff0ef8_lang = "", index$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c0ff0ef8"]]), index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2
}, Symbol.toStringTag, { value: "Module" })), _hoisted_1$1 = ["onClick"], _hoisted_2 = { class: "mt-[16px] flex" }, _hoisted_3 = { class: "dialog-footer" }, _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
  setup(n, { expose: r, emit: s }) {
    const i = n, a = () => {
      l.value = {
        id: 0,
        name: "",
        parent: "",
        title: "",
        url: ""
      };
    }, u = s, l = computed({
      get() {
        return i.modelValue;
      },
      set(v) {
        u("update:modelValue", v);
      }
    });
    ref();
    const c = reactive({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: ""
      }
    }), p = ref(), d = ref(!1), m = () => {
      d.value = !0, g();
    }, g = (v = 1) => {
      c.loading = !0, c.page = v, getPageLink({
        page: c.page,
        limit: c.limit,
        ...c.searchParam
      }).then((h) => {
        c.loading = !1, c.data = h.data.data, c.data.forEach((_) => {
          _.checked = _.id == l.value.id;
        }), c.total = h.data.total, y();
      }).catch(() => {
        c.loading = !1;
      });
    };
    g();
    const w = (v, h) => {
      v ? l.value.id = h.id : l.value.id = 0, y();
    }, y = () => {
      nextTick(() => {
        for (let v = 0; v < c.data.length; v++)
          c.data[v].checked = !1, l.value.id == c.data[v].id && (c.data[v].checked = !0, Object.assign(l.value, c.data[v]));
      });
    }, f = () => {
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
      }, d.value = !1;
    };
    return r({
      show: m,
      showDialog: d
    }), (v, h) => {
      const _ = resolveComponent("Close"), E = resolveComponent("el-icon"), $ = resolveComponent("ArrowRight"), x = resolveComponent("el-input"), T = resolveComponent("el-checkbox"), k = resolveComponent("el-table-column"), b = resolveComponent("el-table"), C = resolveComponent("el-pagination"), S = resolveComponent("el-button"), A = resolveComponent("el-dialog"), L = resolveDirective("loading");
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", { onClick: m }, [
          renderSlot(v.$slots, "default", {}, () => [
            createVNode(x, {
              modelValue: l.value.title,
              "onUpdate:modelValue": h[0] || (h[0] = (P) => l.value.title = P),
              placeholder: unref(t$1)("请选择跳转页面"),
              readonly: "",
              class: "link-input"
            }, {
              suffix: withCtx(() => [
                createElementVNode("div", {
                  onClick: withModifiers(a, ["stop"])
                }, [
                  l.value.name ? (openBlock(), createBlock(E, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_)
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(E, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode($)
                    ]),
                    _: 1
                  }))
                ], 8, _hoisted_1$1)
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ], !0)
        ]),
        createVNode(A, {
          modelValue: d.value,
          "onUpdate:modelValue": h[5] || (h[5] = (P) => d.value = P),
          title: unref(t$1)("页面选择"),
          width: "850px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: withCtx(() => [
            createElementVNode("span", _hoisted_3, [
              createVNode(S, {
                onClick: h[4] || (h[4] = (P) => d.value = !1)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t$1)("cancel")), 1)
                ]),
                _: 1
              }),
              createVNode(S, {
                type: "primary",
                onClick: f
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t$1)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            withDirectives((openBlock(), createBlock(b, {
              data: c.data,
              size: "large",
              ref_key: "timeListTableRef",
              ref: p,
              "max-height": "400"
            }, {
              empty: withCtx(() => [
                createElementVNode("span", null, toDisplayString(c.loading ? "" : unref(t$1)("emptyData")), 1)
              ]),
              default: withCtx(() => [
                createVNode(k, { "min-width": "7%" }, {
                  default: withCtx(({ row: P }) => [
                    createVNode(T, {
                      modelValue: P.checked,
                      "onUpdate:modelValue": (M) => P.checked = M,
                      onChange: (M) => w(M, P)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 1
                }),
                createVNode(k, {
                  prop: "page_title",
                  label: unref(t$1)("页面名称"),
                  "min-width": "25%"
                }, null, 8, ["label"]),
                createVNode(k, {
                  prop: "type_name",
                  label: unref(t$1)("页面类型"),
                  "min-width": "25%"
                }, null, 8, ["label"]),
                createVNode(k, {
                  prop: "url",
                  label: unref(t$1)("页面路径"),
                  "min-width": "25%"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [L, c.loading]
            ]),
            createElementVNode("div", _hoisted_2, [
              createVNode(C, {
                "current-page": c.page,
                "onUpdate:currentPage": h[1] || (h[1] = (P) => c.page = P),
                "page-size": c.limit,
                "onUpdate:pageSize": h[2] || (h[2] = (P) => c.limit = P),
                layout: "total, sizes, prev, pager, next, jumper",
                total: c.total,
                onSizeChange: h[3] || (h[3] = (P) => g()),
                onCurrentChange: g
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}), index_vue_vue_type_style_index_0_scoped_0e4db2d0_lang = "", index = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0e4db2d0"]]), index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" })), _hoisted_1 = ["id"], MAP_INIT_DELAY = 500, MAP_SEARCH_INTERVAL = 100, MAP_SEARCH_MAX_ATTEMPTS = 50, _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
  setup(n, { expose: r, emit: s }) {
    const i = n, a = s, u = ref(!0), l = ref(""), c = ref("tianditu");
    let p = null, d = null;
    const m = ref([]), g = () => getMap({
      need_encrypt: !1
    }).then((b) => {
      c.value = b.data.map_type || "tianditu", l.value = c.value === "tianditu" ? b.data.tianditu_map_web_key : b.data.key;
    }).catch((b) => {
      u.value = !1, ElMessage.error(t$1("获取地图配置失败"));
    }), w = () => {
      const b = document.createElement("script");
      b.src = "https://map.qq.com/api/gljs?libraries=tools,service&v=1.exp&key=" + l.value, document.body.appendChild(b), b.onload = () => {
        setTimeout(() => {
          const C = window.TMap;
          if (C) {
            const S = i.longitude ? Number(i.longitude) : 116.397463, A = i.latitude ? Number(i.latitude) : 39.909187, L = new C.LatLng(A, S);
            p = new C.Map(i.containerId, { center: L, zoom: i.zoom }), p.on("tilesloaded", () => u.value = !1), d = createMarker(p), i.disabledClickMarker || p.on("click", (P) => {
              const M = P == null ? void 0 : P.latLng;
              if (!M)
                return;
              const q = typeof M.getLat == "function" ? M.getLat() : M.lat, I = typeof M.getLng == "function" ? M.getLng() : M.lng;
              if (q == null || I == null || Number.isNaN(q) || Number.isNaN(I))
                return;
              const D = new C.LatLng(q, I);
              p.setZoom(16), p.setCenter(D), d.updateGeometries({ id: "center", position: D }), nextTick(() => {
                v(q, I);
              });
            }), i.latitude && i.longitude && v(A, S);
          } else
            u.value = !1, ElMessage.error(t$1("腾讯地图加载失败"));
        }, MAP_INIT_DELAY);
      }, b.onerror = () => {
        u.value = !1, ElMessage.error(t$1("腾讯地图脚本加载失败"));
      };
    }, y = () => {
      const b = document.createElement("script");
      b.src = "https://api.tianditu.gov.cn/api?v=4.0&tk=" + l.value, document.body.appendChild(b), b.onload = () => {
        setTimeout(() => {
          const C = window.T;
          if (C) {
            const S = i.longitude ? Number(i.longitude) : 116.397463, A = i.latitude ? Number(i.latitude) : 39.909187;
            p = new C.Map(i.containerId), p.centerAndZoom(new C.LngLat(S, A), i.zoom);
            const L = new C.Control.Zoom();
            p.addControl(L), d = new C.Marker(new C.LngLat(S, A)), p.addOverLay(d), u.value = !1, i.disabledClickMarker || p.addEventListener("click", (P) => {
              const M = P.lnglat;
              if (!M)
                return;
              const q = M.lat, I = M.lng;
              q == null || I == null || Number.isNaN(q) || Number.isNaN(I) || (p.removeOverLay(d), d = new C.Marker(new C.LngLat(I, q)), p.addOverLay(d), p.centerAndZoom(new C.LngLat(I, q), 16), nextTick(() => {
                v(q, I);
              }));
            }), i.latitude && i.longitude && v(A, S);
          } else
            u.value = !1, ElMessage.error(t$1("天地图加载失败"));
        }, MAP_INIT_DELAY);
      }, b.onerror = () => {
        u.value = !1, ElMessage.error(t$1("天地图加载失败，请检查密钥配置"));
      };
    }, f = () => {
      if (!l.value) {
        u.value = !1;
        return;
      }
      p || (c.value === "tencent" ? w() : c.value === "tianditu" && y());
    }, v = (b, C) => {
      a("update:longitude", String(C)), a("update:latitude", String(b)), c.value === "tencent" ? latLngToAddress$1({ mapKey: l.value, lat: b, lng: C }).then(({ message: S, result: A }) => {
        (S == "query ok" || S == "Success") && a("locationChange", { lat: b, lng: C, address: A });
      }) : c.value === "tianditu" && latLngToAddress({ mapKey: l.value, lat: b, lng: C }).then((S) => {
        a("locationChange", { lat: b, lng: C, address: S });
      }).catch((S) => {
        ElMessage.error(S.message || t$1("地址解析失败"));
      });
    }, h = (b, C) => {
      if (!(!p || !d)) {
        if (c.value === "tencent") {
          const S = window.TMap;
          if (!S)
            return;
          const A = new S.LatLng(b, C);
          p.setZoom(16), p.setCenter(A), d.updateGeometries({ id: "center", position: A });
        } else if (c.value === "tianditu") {
          const S = window.T;
          if (!S)
            return;
          const A = new S.LngLat(C, b);
          p.removeOverLay(d), d = new S.Marker(A), p.addOverLay(d), p.centerAndZoom(A, 16);
        }
      }
    }, _ = (b) => new Promise((C, S) => {
      if (!l.value) {
        S(new Error(t$1("地图配置未加载")));
        return;
      }
      (() => new Promise((L, P) => {
        if (p) {
          L();
          return;
        }
        let M = 0;
        const q = setInterval(() => {
          M++, p ? (clearInterval(q), L()) : M > MAP_SEARCH_MAX_ATTEMPTS && (clearInterval(q), P(new Error(t$1("地图初始化超时"))));
        }, MAP_SEARCH_INTERVAL);
      }))().then(() => {
        if (c.value === "tencent") {
          const L = window.TMap;
          if (!(L != null && L.service)) {
            S(new Error(t$1("腾讯地图服务未加载")));
            return;
          }
          new L.service.Geocoder({ key: l.value }).getLocation({ address: b }).then((M) => {
            var q;
            if (M.status === 0 && ((q = M.result) != null && q.location)) {
              const I = M.result.location, D = Number(I.lat), R = Number(I.lng);
              h(D, R), C({ lat: D, lng: R });
            } else
              S(new Error(M.message || t$1("未找到该地址")));
          }).catch((M) => {
            S(M);
          });
        } else if (c.value === "tianditu") {
          const L = window.T;
          if (!L) {
            S(new Error(t$1("天地图服务未加载")));
            return;
          }
          new L.Geocoder().getPoint(b, (M) => {
            if (M && M.status === "0" && M.location) {
              const q = M.location.lat, I = M.location.lon || M.location.lng;
              q && I ? (h(q, I), C({ lat: q, lng: I })) : S(new Error(t$1("坐标解析失败")));
            } else
              S(new Error((M == null ? void 0 : M.msg) || t$1("未找到该地址")));
          });
        }
      }).catch(S);
    }), E = (b, C = 1e3, S) => {
      if (!p)
        return null;
      const A = (S == null ? void 0 : S.key) || `circle_${Date.now()}`;
      let L = null;
      const P = { key: A, center: b, radius: C, ...S };
      return c.value === "tencent" ? (createCircle$1(p, P, (M) => {
        a("selectChange", M);
      }), L = { key: A, geometriesData: P }) : (L = createCircle(p, P, (M) => {
        a("areaChange", {
          key: M.key,
          type: "circle",
          path: {
            key: M.key,
            center: M.center,
            radius: M.radius
          }
        });
      }, (M) => {
        a("selectChange", M);
      }), L && (L.geometriesData = P)), L && m.value.push(L), L;
    }, $ = (b, C) => {
      if (!p)
        return null;
      const S = (C == null ? void 0 : C.key) || `poly_${Date.now()}`;
      let A = null;
      const L = { key: S, paths: b, ...C };
      return c.value === "tencent" ? (createPolygon$1(p, L, (P) => {
        a("selectChange", P);
      }), A = { key: S, geometriesData: L }) : (A = createPolygon(p, L, (P) => {
        a("areaChange", {
          key: P.key,
          type: "polygon",
          path: {
            key: P.key,
            paths: P.paths.map((M) => ({
              lat: M.lat,
              lng: M.lng
            }))
          }
        });
      }, (P) => {
        a("selectChange", P);
      }), A && (A.geometriesData = L)), A && m.value.push(A), A;
    }, x = (b) => {
      if (!p || !b)
        return;
      const C = b.key || "";
      c.value === "tencent" ? deleteGeometry$1(C) : deleteGeometry(p, C);
      const S = m.value.findIndex((A) => A.key === C);
      S > -1 && m.value.splice(S, 1);
    }, T = () => {
      p && (c.value === "tencent" ? m.value.forEach((b) => deleteGeometry$1(b.key)) : clearAllGeometry(p), m.value = []);
    }, k = (b) => {
      c.value === "tencent" ? selectGeometry$1(b) : selectGeometry(b);
    };
    return watch(() => i.selectedKey, (b) => {
      b && k(b);
    }), watch([l, c], ([b, C]) => {
      b && C && f();
    }), onMounted(() => {
      g();
    }), onBeforeUnmount(() => {
      if (p) {
        try {
          c.value === "tencent" ? p.destroy && p.destroy() : c.value === "tianditu" && (T(), p.clearOverLays && p.clearOverLays());
        } catch {
        }
        p = null, d = null, m.value = [];
      }
    }), r({
      updateLocation: h,
      searchAddress: _,
      addCircle: E,
      addPolygon: $,
      removeOverlay: x,
      clearOverlays: T,
      selectGeometry: k,
      getMap: () => p,
      getMarker: () => d,
      handleLocationChange: v
    }), (b, C) => {
      const S = resolveDirective("loading");
      return withDirectives((openBlock(), createElementBlock("div", {
        id: b.containerId,
        class: normalizeClass(b.containerClass),
        style: normalizeStyle(b.containerStyle)
      }, null, 14, _hoisted_1)), [
        [S, u.value]
      ]);
    };
  }
});
function camelize(n) {
  return n.replace(/-(\w)/g, function(r, s) {
    return s ? s.toUpperCase() : "";
  });
}
function withInstall(n) {
  return n.install = function(r) {
    var s = n, i = s.name;
    r.component(i, n), r.component(camelize("-" + i), n);
  }, n;
}
var LoadEvent = /* @__PURE__ */ function() {
  function n() {
    this.listeners = {};
  }
  var r = n.prototype;
  return r.on = function(i, a) {
    this.listeners[i] === void 0 && (this.listeners[i] = {
      triggered: !1,
      requested: !1,
      cbs: []
    }), this.listeners[i].triggered && a(), this.listeners[i].cbs.push(a);
  }, r.emit = function(i) {
    this.listeners[i] && (this.listeners[i].triggered = !0, this.listeners[i].cbs.forEach(function(a) {
      return a();
    }));
  }, n;
}();
function debounce(n, r) {
  var s, i = function() {
    for (var u = this, l = arguments.length, c = new Array(l), p = 0; p < l; p++)
      c[p] = arguments[p];
    s && clearTimeout(s), s = setTimeout(function() {
      n.apply(u, c);
    }, r);
  };
  return i.cancel = function() {
    s !== void 0 && clearTimeout(s);
  }, i;
}
function asyncSeries(n) {
  return n.reduce(function(r, s) {
    return r.then(s);
  }, Promise.resolve());
}
function randomString(n) {
  for (var r = "abcdefghijklmnopqrstuvwxyz", s = "", i = 0; i < n; i++)
    s += r.charAt(Math.floor(Math.random() * r.length));
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
      validator: function n(r) {
        return ["observer", "listener"].indexOf(r) !== -1;
      }
    },
    // MutationObserver 的配置 https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    observerOptions: {
      type: Object,
      default: function n() {
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
      validator: function n(r) {
        return r >= 20;
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
  setup: function n(r, s) {
    var i = s.emit, a = {
      UN_READY: "UN_READY",
      // 尚未初始化
      PENDING: "PENDING",
      // 开始初始化但尚未 ready
      READY: "READY"
      // 初始化完成并已 ready
    }, u = a.UN_READY, l, c, p, d = ref(), m = ["ueditor.config.js", "ueditor.all.min.js"], g = function() {
      return window.UE && window.UE.getEditor && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0;
    }, w = toRef(r, "modelValue");
    window.$loadEventBus || (window.$loadEventBus = new LoadEvent());
    var y = function(k) {
      return new Promise(function(b, C) {
        if (window.$loadEventBus.on(k, b), window.$loadEventBus.listeners[k].requested === !1) {
          window.$loadEventBus.listeners[k].requested = !0;
          var S = document.createElement("script");
          S.src = k, S.onload = function() {
            window.$loadEventBus.emit(k);
          }, S.onerror = C, document.getElementsByTagName("head")[0].appendChild(S);
        }
      });
    }, f = function(k) {
      return new Promise(function(b, C) {
        if (window.$loadEventBus.on(k, b), window.$loadEventBus.listeners[k].requested === !1) {
          window.$loadEventBus.listeners[k].requested = !0;
          var S = document.createElement("link");
          S.type = "text/css", S.rel = "stylesheet", S.href = k, S.onload = function() {
            window.$loadEventBus.emit(k);
          }, S.onerror = C, document.getElementsByTagName("head")[0].appendChild(S);
        }
      });
    }, v = function() {
      return new Promise(function(k, b) {
        if (r.editorDependencies && r.editorDependenciesChecker && r.editorDependenciesChecker()) {
          k();
          return;
        }
        if (!r.editorDependencies && g()) {
          k();
          return;
        }
        var C = (r.editorDependencies || m).reduce(function(L, P) {
          var M = /^((https?:)?\/\/)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+\//.test(P);
          if (!M) {
            var q;
            P = (((q = r.config) == null ? void 0 : q.UEDITOR_HOME_URL) || "") + P;
          }
          return P.slice(-3) === ".js" ? L.jsLinks.push(P) : P.slice(-4) === ".css" && L.cssLinks.push(P), L;
        }, {
          jsLinks: [],
          cssLinks: []
        }), S = C.jsLinks, A = C.cssLinks;
        Promise.all([
          Promise.all(A.map(function(L) {
            return f(L);
          })),
          // 依次加载依赖的 JS 文件，JS 执行是有顺序要求的，比如 ueditor.all.js 就要晚于 ueditor.config.js 执行
          // 动态创建 script 是先加载完的先执行，所以不可以一次性创建所有资源的引入脚本
          asyncSeries(S.map(function(L) {
            return function() {
              return y(L);
            };
          }))
        ]).then(function() {
          return k();
        }).catch(b);
      });
    }, h = function() {
      p = l.getContent(), i("update:modelValue", p);
    }, _ = function() {
      l.addListener("contentChange", h);
    }, E = function() {
      l.document.getElementById("baidu_pastebin") || (p = l.getContent(), i("update:modelValue", p));
    }, $ = function() {
      c = new MutationObserver(debounce(E, r.observerDebounceTime)), c.observe(l.body, r.observerOptions);
    }, x = function() {
      var k = r.editorId || "editor_" + randomString(8);
      d.value.id = k, i("before-init", k), l = window.UE.getEditor(k, r.config), l.addListener("ready", function() {
        u === a.READY ? l.setContent(r.modelValue) : (u = a.READY, i("ready", l), r.modelValue && l.setContent(r.modelValue)), r.mode === "observer" && window.MutationObserver ? $() : _();
      });
    };
    return watch(w, function(T) {
      u === a.UN_READY ? (u = a.PENDING, (r.forceInit || typeof window < "u") && v().then(function() {
        d.value ? x() : nextTick(function() {
          return x();
        });
      }).catch(function() {
        throw new Error("[vue-ueditor-wrap] UEditor 资源加载失败！请检查资源是否存在，UEDITOR_HOME_URL 是否配置正确！");
      })) : u === a.READY && (T === p || l.setContent(T || ""));
    }, {
      immediate: !0
    }), onDeactivated(function() {
      l && l.removeListener("contentChange", h), c && c.disconnect();
    }), onBeforeUnmount(function() {
      c && c.disconnect && c.disconnect(), r.destroy && l && l.destroy && l.destroy();
    }), function() {
      return createVNode("div", null, [createVNode("div", {
        ref: d,
        name: r.name
      }, null)]);
    };
  }
});
var VueUeditorWrap = withInstall(_VueUeditorWrap);
const VueUeditorWrap$1 = VueUeditorWrap, _sfc_main = /* @__PURE__ */ defineComponent({
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
  setup(n, { emit: r }) {
    const s = ref(), i = n, a = r, u = ref(null), l = ref(null), c = computed({
      get() {
        return i.modelValue;
      },
      set(v) {
        a("update:modelValue", v);
      }
    });
    let p = null;
    const d = {};
    d[envConfig.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken(), d[envConfig.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get("siteId") || 0;
    const m = envConfig.VITE_APP_BASE_URL.substr(-1) == "/" ? envConfig.VITE_APP_BASE_URL : `${envConfig.VITE_APP_BASE_URL}/`, g = ref({
      debug: !1,
      UEDITOR_HOME_URL: "/admin/ueditor/",
      UEDITOR_CORS_URL: location.origin + "/admin/ueditor/",
      serverUrl: `${m}sys/ueditor`,
      serverHeaders: d,
      // 编辑器不自动被内容撑高
      autoHeightEnabled: !1,
      // 初始容器高度
      initialFrameHeight: i.height,
      // 初始容器宽度
      initialFrameWidth: "100%",
      wordCount: !0,
      toolbarCallback: function(v, h) {
        switch (p = h, v) {
          case "insertimage":
            return u.value.showDialog = !0, !0;
          case "insertvideo":
            return l.value.showDialog = !0, !0;
        }
      }
    }), w = (v) => {
      v.addListener("blur", () => {
        a("handleBlur", v.getContent());
      }), v.addListener("fullscreenchanged", (h, _) => {
        const E = v.ui.getDom();
        _ ? E.classList.add("edui-fullscreen") : E.classList.remove("edui-fullscreen"), console.log("全屏切换", _);
      }), v.getContentLength, v.getContentLength = function() {
        return v.getContent().replace(/[\s\u3000]+/g, "").length;
      };
    }, y = (v) => {
      v.forEach((h) => {
        p == null || p.execCommand("insertHtml", `<img src="${img(h.url)}">`);
      });
    }, f = (v) => {
      p == null || p.execCommand("insertHtml", `<video src="${img(v.url)}">`);
    };
    return (v, h) => {
      const _ = resolveComponent("upload-attachment");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_, {
          type: "image",
          ref_key: "imageRef",
          ref: u,
          limit: "",
          onConfirm: y
        }, null, 512),
        createVNode(_, {
          type: "video",
          ref_key: "videoRef",
          ref: l,
          onConfirm: f
        }, null, 512),
        createVNode(unref(VueUeditorWrap$1), {
          modelValue: c.value,
          "onUpdate:modelValue": h[0] || (h[0] = (E) => c.value = E),
          config: g.value,
          editorDependencies: ["ueditor.config.js", "ueditor.all.js"],
          ref_key: "editorRef",
          ref: s,
          onReady: w
        }, null, 8, ["modelValue", "config", "editorDependencies"])
      ], 64);
    };
  }
});
export {
  getVersionInfo as $,
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
  getAppConfig as Q,
  setAppConfig as R,
  getVersionList$1 as S,
  deleteVersion$1 as T,
  releaseVersion as U,
  getBuildLog as V,
  getAppType as W,
  getAppPlatform as X,
  editVersion$1 as Y,
  addVersion$1 as Z,
  _export_sfc as _,
  getShowApp as a,
  getBatchAcquisition as a$,
  generateSingCert as a0,
  getH5Config as a1,
  getUrl as a2,
  setH5Config as a3,
  getPcConfig as a4,
  setPcConfig as a5,
  getWeappConfig as a6,
  getAuthorizationUrl as a7,
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
  getKeywordsReplyList as aX,
  setSubscribeReply as aY,
  setDefaultReply as aZ,
  getTemplateList as a_,
  getWeappVersionList as aa,
  setWeappVersion as ab,
  undoAudit as ac,
  siteWeappCommit as ad,
  getWeappUploadLog as ae,
  fetchWeappUploadLog as af,
  CLOUD_COMPILE_BASE_URL as ag,
  clearCloudBuildTask as ah,
  getCloudBuildTask as ai,
  preBuildCheck as aj,
  cloudBuild as ak,
  startServerDownload as al,
  getSseBuildLog as am,
  getCloudBuildLog as an,
  getCloudBuildSseUrl as ao,
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
  getAccountType as b$,
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
  deleteFormRecords as bU,
  getFormRecords as bV,
  getFormRecordsMember as bW,
  getDiyFormFieldsList as bX,
  getDiyFormFieldStat as bY,
  getQrcode as bZ,
  getAccountList as b_,
  addTheme as ba,
  deleteTheme as bb,
  setDiyTheme as bc,
  getDefaultTheme as bd,
  initPage$1 as be,
  getDiyTemplatePages$1 as bf,
  editDiyPage as bg,
  addDiyPage as bh,
  getDecoratePage as bi,
  changeTemplate as bj,
  getApps as bk,
  getTablePageStorage as bl,
  getDiyTemplate as bm,
  getDiyPageList as bn,
  setTablePageStorage as bo,
  setUseDiyPage as bp,
  copyDiy as bq,
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
  memberBatchModify as c$,
  getAccountStat as c0,
  getCashOutStatusList as c1,
  getCashOutStat as c2,
  getTransfertype as c3,
  getCashOutList as c4,
  memberTransfer as c5,
  getCashOutDetail as c6,
  memberAudit as c7,
  memberCancel as c8,
  memberRemark as c9,
  setSignConfig as cA,
  getMemberSignList as cB,
  getVerifierList as cC,
  getVerifyInfo as cD,
  deleteVerifier as cE,
  editVerifier as cF,
  addVerifier as cG,
  getMemberList as cH,
  getVerifyTypeList as cI,
  getVerifyRecord as cJ,
  getVerifierSelect as cK,
  getVerifyDetailInfo as cL,
  verify as cM,
  getChangeTypeList as cN,
  getBalanceList as cO,
  getMoneyList as cP,
  getBalanceSum as cQ,
  getBalanceStatus as cR,
  getAccountType$1 as cS,
  getCommissionSum as cT,
  getCommissionList as cU,
  getMemberNo as cV,
  addMember as cW,
  getMemberInfo as cX,
  adjustPoint as cY,
  adjustBalance as cZ,
  editMemberDetail as c_,
  getRefundType as ca,
  getPayRefundInfo as cb,
  getRefundTransfer as cc,
  getPayAuditList as cd,
  payAuditPass as ce,
  payAuditRefuse as cf,
  getPayDetail as cg,
  getRefundStatus as ch,
  getPayRefundPages as ci,
  getWebCopyright as cj,
  useSystemStore as ck,
  getSiteGroup as cl,
  getHomeSite as cm,
  createSite as cn,
  findFirstValidRoute as co,
  getStatInfo as cp,
  deleteAddonDevelop as cq,
  getAuthorizationResult as cr,
  getLoginConfig$1 as cs,
  ADMIN_ROUTE as ct,
  SITE_ROUTE as cu,
  guid as cv,
  getGiftDict as cw,
  getVerifyDetail as cx,
  getSignConfig as cy,
  getMemberGiftsContent as cz,
  getMenus as d,
  smsOrderCreate as d$,
  updateMemberLabel as d0,
  addMemberLabel as d1,
  getMemberLabelInfo as d2,
  getBenefitsDict as d3,
  getGrowthList as d4,
  getMemberLabelList as d5,
  deleteMemberLabel as d6,
  getMemberLevelPageList as d7,
  deleteMemberLevel as d8,
  getMemberLevelInfo as d9,
  deletePrinter as dA,
  testPrint as dB,
  refreshPrinterToken as dC,
  getPrinterTemplateInfo as dD,
  editPrinterTemplate as dE,
  addPrinterTemplate as dF,
  getPrinterTemplatePageList as dG,
  deletePrinterTemplate as dH,
  getConfigLogin as dI,
  setConfigLogin as dJ,
  getAgreementList as dK,
  useTabbarStore$1 as dL,
  getAgreementInfo as dM,
  editAgreement as dN,
  getCashOutConfig as dO,
  setCashOutConfig as dP,
  editNotice as dQ,
  editSms as dR,
  getSmsInfo as dS,
  loginAccount as dT,
  getSmsSignConfig as dU,
  registerAccount as dV,
  getSmsCaptcha as dW,
  getSmsSend as dX,
  resetPassword as dY,
  getSmsPackagesList as dZ,
  calculateOrderPay as d_,
  updateMemberLevel as da,
  addMemberLevel as db,
  getRegisterChannelType as dc,
  editMemberStatus as dd,
  getPointSum as de,
  getPointList as df,
  initPoster as dg,
  getPosterTemplate as dh,
  editPoster as di,
  addPoster as dj,
  getPreviewPoster as dk,
  getPosterType as dl,
  getPosterPageList as dm,
  modifyPosterStatus as dn,
  modifyPosterDefault as dp,
  deletePoster as dq,
  checkImagick as dr,
  getPrinterBrand as ds,
  getPrinterTemplateList as dt,
  getPrinterType as du,
  getPrinterInfo as dv,
  editPrinter as dw,
  addPrinter as dx,
  getPrinterPageList as dy,
  modifyPrinterStatus as dz,
  deleteMenu as e,
  getAccountInfo as e$,
  getOrderPayInfo as e0,
  getSmsOrdersList as e1,
  getOrderInfo as e2,
  timeStampTurnTime as e3,
  getSmsSendList as e4,
  addSign as e5,
  getSignList as e6,
  deleteSign as e7,
  getTemplateList$2 as e8,
  templateSync as e9,
  getDiyFormList as eA,
  setMemberConfig as eB,
  getNoticeList as eC,
  getBindInfo as eD,
  getWechatAuthUrl as eE,
  cancelBind as eF,
  sendSms as eG,
  bindSms as eH,
  getNoticeLog as eI,
  getAuthRecord as eJ,
  getWeappLastCommitRecord as eK,
  delVersion as eL,
  weappCommit as eM,
  getWeappCommitRecord as eN,
  getSiteGroupCommitRecord as eO,
  syncSiteWeapp as eP,
  getStatic as eQ,
  getConfig as eR,
  editConfig as eS,
  getAllPayType as eT,
  getPayConfigList as eU,
  setPatConfig as eV,
  getPointRuleDict as eW,
  getPointRuleConfig as eX,
  setPointRuleConfig as eY,
  getSmsList as eZ,
  getAccountIsLogin as e_,
  clearTemplate as ea,
  getTemplateReportConfig as eb,
  getreportTemplateInfo as ec,
  reportTemplate as ed,
  editStorage as ee,
  getStorageInfo as ef,
  getCopyright as eg,
  setCopyright as eh,
  getDeveloperToken as ei,
  setDeveloperToken as ej,
  getExportStatusList as ek,
  getExportKeyList as el,
  getExportList as em,
  deleteExport as en,
  getGrowthRuleDict as eo,
  getGrowthRuleConfig as ep,
  setGrowthRuleConfig as eq,
  getLayout as er,
  getThemecolor as es,
  setThemecolor as et,
  setLayout as eu,
  getLoginConfig as ev,
  setLoginConfig as ew,
  getMap as ex,
  setMap as ey,
  getMemberConfig as ez,
  getRoleList as f,
  getBackupRecords as f$,
  enableNiusms as f0,
  editAccount as f1,
  getOrderPayStatus as f2,
  getSmsLog as f3,
  getStorageList as f4,
  getWebsite as f5,
  getService as f6,
  setWebsite as f7,
  getTransferInfo as f8,
  setTransferInfo as f9,
  getStatusList as fA,
  getSiteList as fB,
  closeSite as fC,
  openSite as fD,
  deleteSite as fE,
  initSite as fF,
  getUserList as fG,
  deleteUser as fH,
  getUserSiteGroupAll as fI,
  getUserCreateSiteLimit as fJ,
  delUserCreateSiteLimit as fK,
  getAddontype as fL,
  getAddonDevelopInfo as fM,
  getAddonKeyBlackList as fN,
  getAddonList as fO,
  getAddonDevelopCheck as fP,
  editAddonDevelop as fQ,
  addAddonDevelop as fR,
  addonDevelopBuild as fS,
  addonDevelopDownload as fT,
  addAttachmentCategory as fU,
  editAttachmentCategory as fV,
  deleteAttachmentCategory as fW,
  deleteAttachment as fX,
  moveAttachment as fY,
  getAttachmentCategoryList as fZ,
  getAttachmentList as f_,
  getTransferScene as fa,
  setSceneId as fb,
  setTradeScene as fc,
  getVersionList as fd,
  editVersion as fe,
  addVersion as ff,
  deleteVersion as fg,
  editUserCreateSiteLimit as fh,
  addUserCreateSiteLimit as fi,
  getUserCreateSiteLimitInfo as fj,
  getUserListSelect as fk,
  getSiteGroupAll as fl,
  getSiteInfo as fm,
  editSite as fn,
  addSite as fo,
  getUserInfo as fp,
  editUser as fq,
  addUser as fr,
  getSiteGroupList as fs,
  deleteSiteGroup as ft,
  getSiteGroupInfo as fu,
  editSiteGroup as fv,
  addSiteGroup as fw,
  getsiteCaptcha as fx,
  getSiteAllowChange as fy,
  putSiteAllowChange as fz,
  getVersions as g,
  removeToken as g$,
  manualBackup as g0,
  checkDirExist as g1,
  checkPermission as g2,
  restoreUpgradeBackup as g3,
  modifyBackupRemark as g4,
  deleteRecords as g5,
  connectTest as g6,
  setLocalUrl as g7,
  getLocalUrl as g8,
  generateTable as g9,
  clearCronLog as gA,
  clearCache as gB,
  getUpgradeRecords as gC,
  delUpgradeRecords as gD,
  getLink as gE,
  _sfc_main as gF,
  exportDataCheck as gG,
  exportData as gH,
  _sfc_main$1 as gI,
  getDefaultExportFromCjs as gJ,
  commonjsGlobal as gK,
  getAreaListByPid as gL,
  getAugmentedNamespace as gM,
  useAppStore as gN,
  useDark as gO,
  useToggle as gP,
  setThemeColor as gQ,
  language as gR,
  formatRouters as gS,
  getShowSpecialMenu as gT,
  useFullscreen as gU,
  _sfc_main$4 as gV,
  index$2 as gW,
  index as gX,
  useElementIcon as gY,
  setWindowTitle as gZ,
  setToken as g_,
  addGenerateTable as ga,
  getGeneratorAllModel as gb,
  getGeneratorTableColumn as gc,
  getGeneratorModelTableColumn as gd,
  getDictAll as ge,
  useTemplateRefsList as gf,
  getGenerateTableInfo as gg,
  getMenuByTypeDir as gh,
  editGenerateTable as gi,
  generatorCheckFile as gj,
  generateCreate as gk,
  getGenerateTableList as gl,
  deleteGenerateTable as gm,
  generatePreview as gn,
  getSystem as go,
  getCronTemplate as gp,
  getCronDateType as gq,
  getWeek as gr,
  getCronList as gs,
  editCron as gt,
  addCron as gu,
  deleteCron as gv,
  doCron as gw,
  resetCron as gx,
  getCronLogList as gy,
  deleteCronLog as gz,
  deleteRole as h,
  performBackupTasks as h$,
  assetImg as h0,
  urlToRouteRaw as h1,
  moneyFormat as h2,
  getCurrentDataTime as h3,
  filterSpecial as h4,
  filterBlank as h5,
  distance as h6,
  getImageDimensions as h7,
  coreVueModules as h8,
  resolveAsyncComponent as h9,
  pay as hA,
  getFriendsPay as hB,
  getPosterList as hC,
  getPosterInfo as hD,
  getPosterGenerate as hE,
  getPrinterList as hF,
  printTicket as hG,
  getSiteAddons as hH,
  getSiteStatInfo as hI,
  getInfo as hJ,
  getWebConfig as hK,
  getAuthMenu as hL,
  getEnv as hM,
  getAreatree as hN,
  getAddressInfo as hO,
  getContraryAddress as hP,
  getAreaByCode as hQ,
  getPayConfig as hR,
  setPayConfig as hS,
  getCronInfo as hT,
  getChannelType as hU,
  getSceneDomain as hV,
  clearSchemaCache as hW,
  getAppMange as hX,
  getWebsiteLayout as hY,
  checkJobStatus as hZ,
  performRecoveryTasks as h_,
  loadCoreVueModule as ha,
  loadCLodop as hb,
  getLodop as hc,
  createRectangle as hd,
  login as he,
  logout as hf,
  getAuthMenus as hg,
  getCloudBuildQueuePosition as hh,
  getCloudCompileLocalUrl as hi,
  setCloudCompileLocalUrl as hj,
  addDictData as hk,
  useDictionary as hl,
  getDiyList as hm,
  getDiyPageInfo as hn,
  getPageLink as ho,
  getDiyFormInfo as hp,
  getDiyFormQrcode as hq,
  getFormRecordsInfo as hr,
  getRegisterType as hs,
  deleteMember as ht,
  memberCheck as hu,
  getMemberBenefitsContent as hv,
  getMemberAddress as hw,
  addMemberAddress as hx,
  editMemberAddress as hy,
  getNoticeInfo as hz,
  img as i,
  checkUsernameIsExist as i0,
  uploadVersion as i1,
  getIsTradeManaged as i2,
  addonLoader as i3,
  index$3 as i4,
  index$1 as i5,
  modifyRoleStatus as j,
  getSiteMenus as k,
  logDestroy as l,
  menuRefresh as m,
  debounce$1 as n,
  editRole as o,
  addRole as p,
  getRoleInfo as q,
  editMenu as r,
  storage as s,
  t$1 as t,
  useUserStore as u,
  addMenu as v,
  getMenuInfo as w,
  getAddonDevelop as x,
  getSystemMenu as y,
  getAddonMenu as z
};
