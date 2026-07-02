import { computed as xt, openBlock as $, createElementBlock as Z, normalizeClass as Ct, normalizeStyle as wt, unref as K, pushScopeId as Pt, popScopeId as Ft, ref as Dt, onUnmounted as ue, createElementVNode as H, toDisplayString as st, createTextVNode as Tt, defineComponent as Mt, withDirectives as ht, createVNode as et, vShow as ft, useCssVars as ie, nextTick as de, getCurrentInstance as Te, createCommentVNode as ut, reactive as Xt, withModifiers as Se, watch as ce, onMounted as he, Transition as Jt, withCtx as te, Fragment as zt, renderList as $t, useAttrs as be, mergeProps as Le, createBlock as fe, withKeys as Ht } from "vue";
var Ae = Object.defineProperty, De = Object.defineProperties, ke = Object.getOwnPropertyDescriptors, ne = Object.getOwnPropertySymbols, Re = Object.prototype.hasOwnProperty, _e = Object.prototype.propertyIsEnumerable, ae = (B, w, f) => w in B ? Ae(B, w, { enumerable: !0, configurable: !0, writable: !0, value: f }) : B[w] = f, ee = (B, w) => {
  for (var f in w || (w = {}))
    Re.call(w, f) && ae(B, f, w[f]);
  if (ne)
    for (var f of ne(w))
      _e.call(w, f) && ae(B, f, w[f]);
  return B;
}, re = (B, w) => De(B, ke(w));
function se(B, w, f, R) {
  var S, A = !1, k = 0;
  function C() {
    S && clearTimeout(S);
  }
  function D() {
    for (var d = arguments.length, T = new Array(d), p = 0; p < d; p++)
      T[p] = arguments[p];
    var m = this, E = Date.now() - k;
    function v() {
      k = Date.now(), f.apply(m, T);
    }
    function l() {
      S = void 0;
    }
    A || (R && !S && v(), C(), R === void 0 && E > B ? v() : w !== !0 && (S = setTimeout(R ? l : v, R === void 0 ? B - E : B)));
  }
  return typeof w != "boolean" && (R = f, f = w, w = void 0), D.cancel = function() {
    C(), A = !0;
  }, D;
}
function oe(B, w, f) {
  return f === void 0 ? se(B, w, !1) : se(B, f, w !== !1);
}
function Ie(B) {
  return B && B.__esModule && Object.prototype.hasOwnProperty.call(B, "default") ? B.default : B;
}
var ge = { exports: {} };
typeof window < "u" && (ge.exports = function(B) {
  var w = {};
  function f(R) {
    if (w[R])
      return w[R].exports;
    var S = w[R] = { i: R, l: !1, exports: {} };
    return B[R].call(S.exports, S, S.exports, f), S.l = !0, S.exports;
  }
  return f.m = B, f.c = w, f.d = function(R, S, A) {
    f.o(R, S) || Object.defineProperty(R, S, { enumerable: !0, get: A });
  }, f.r = function(R) {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(R, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(R, "__esModule", { value: !0 });
  }, f.t = function(R, S) {
    if (1 & S && (R = f(R)), 8 & S || 4 & S && typeof R == "object" && R && R.__esModule)
      return R;
    var A = /* @__PURE__ */ Object.create(null);
    if (f.r(A), Object.defineProperty(A, "default", { enumerable: !0, value: R }), 2 & S && typeof R != "string")
      for (var k in R)
        f.d(A, k, function(C) {
          return R[C];
        }.bind(null, k));
    return A;
  }, f.n = function(R) {
    var S = R && R.__esModule ? function() {
      return R.default;
    } : function() {
      return R;
    };
    return f.d(S, "a", S), S;
  }, f.o = function(R, S) {
    return Object.prototype.hasOwnProperty.call(R, S);
  }, f.p = "/dist/", f(f.s = "./src/hls.ts");
}({ "./node_modules/eventemitter3/index.js": function(B, w, f) {
  var R = Object.prototype.hasOwnProperty, S = "~";
  function A() {
  }
  function k(T, p, m) {
    this.fn = T, this.context = p, this.once = m || !1;
  }
  function C(T, p, m, E, v) {
    if (typeof m != "function")
      throw new TypeError("The listener must be a function");
    var l = new k(m, E || T, v), e = S ? S + p : p;
    return T._events[e] ? T._events[e].fn ? T._events[e] = [T._events[e], l] : T._events[e].push(l) : (T._events[e] = l, T._eventsCount++), T;
  }
  function D(T, p) {
    --T._eventsCount == 0 ? T._events = new A() : delete T._events[p];
  }
  function d() {
    this._events = new A(), this._eventsCount = 0;
  }
  Object.create && (A.prototype = /* @__PURE__ */ Object.create(null), new A().__proto__ || (S = !1)), d.prototype.eventNames = function() {
    var T, p, m = [];
    if (this._eventsCount === 0)
      return m;
    for (p in T = this._events)
      R.call(T, p) && m.push(S ? p.slice(1) : p);
    return Object.getOwnPropertySymbols ? m.concat(Object.getOwnPropertySymbols(T)) : m;
  }, d.prototype.listeners = function(T) {
    var p = S ? S + T : T, m = this._events[p];
    if (!m)
      return [];
    if (m.fn)
      return [m.fn];
    for (var E = 0, v = m.length, l = new Array(v); E < v; E++)
      l[E] = m[E].fn;
    return l;
  }, d.prototype.listenerCount = function(T) {
    var p = S ? S + T : T, m = this._events[p];
    return m ? m.fn ? 1 : m.length : 0;
  }, d.prototype.emit = function(T, p, m, E, v, l) {
    var e = S ? S + T : T;
    if (!this._events[e])
      return !1;
    var s, n, r = this._events[e], a = arguments.length;
    if (r.fn) {
      switch (r.once && this.removeListener(T, r.fn, void 0, !0), a) {
        case 1:
          return r.fn.call(r.context), !0;
        case 2:
          return r.fn.call(r.context, p), !0;
        case 3:
          return r.fn.call(r.context, p, m), !0;
        case 4:
          return r.fn.call(r.context, p, m, E), !0;
        case 5:
          return r.fn.call(r.context, p, m, E, v), !0;
        case 6:
          return r.fn.call(r.context, p, m, E, v, l), !0;
      }
      for (n = 1, s = new Array(a - 1); n < a; n++)
        s[n - 1] = arguments[n];
      r.fn.apply(r.context, s);
    } else {
      var i, h = r.length;
      for (n = 0; n < h; n++)
        switch (r[n].once && this.removeListener(T, r[n].fn, void 0, !0), a) {
          case 1:
            r[n].fn.call(r[n].context);
            break;
          case 2:
            r[n].fn.call(r[n].context, p);
            break;
          case 3:
            r[n].fn.call(r[n].context, p, m);
            break;
          case 4:
            r[n].fn.call(r[n].context, p, m, E);
            break;
          default:
            if (!s)
              for (i = 1, s = new Array(a - 1); i < a; i++)
                s[i - 1] = arguments[i];
            r[n].fn.apply(r[n].context, s);
        }
    }
    return !0;
  }, d.prototype.on = function(T, p, m) {
    return C(this, T, p, m, !1);
  }, d.prototype.once = function(T, p, m) {
    return C(this, T, p, m, !0);
  }, d.prototype.removeListener = function(T, p, m, E) {
    var v = S ? S + T : T;
    if (!this._events[v])
      return this;
    if (!p)
      return D(this, v), this;
    var l = this._events[v];
    if (l.fn)
      l.fn !== p || E && !l.once || m && l.context !== m || D(this, v);
    else {
      for (var e = 0, s = [], n = l.length; e < n; e++)
        (l[e].fn !== p || E && !l[e].once || m && l[e].context !== m) && s.push(l[e]);
      s.length ? this._events[v] = s.length === 1 ? s[0] : s : D(this, v);
    }
    return this;
  }, d.prototype.removeAllListeners = function(T) {
    var p;
    return T ? (p = S ? S + T : T, this._events[p] && D(this, p)) : (this._events = new A(), this._eventsCount = 0), this;
  }, d.prototype.off = d.prototype.removeListener, d.prototype.addListener = d.prototype.on, d.prefixed = S, d.EventEmitter = d, B.exports = d;
}, "./node_modules/url-toolkit/src/url-toolkit.js": function(B, w, f) {
  var R, S, A, k, C;
  R = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#[^]*)?$/, S = /^([^\/?#]*)([^]*)$/, A = /(?:\/|^)\.(?=\/)/g, k = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, C = { buildAbsoluteURL: function(D, d, T) {
    if (T = T || {}, D = D.trim(), !(d = d.trim())) {
      if (!T.alwaysNormalize)
        return D;
      var p = C.parseURL(D);
      if (!p)
        throw new Error("Error trying to parse base URL.");
      return p.path = C.normalizePath(p.path), C.buildURLFromParts(p);
    }
    var m = C.parseURL(d);
    if (!m)
      throw new Error("Error trying to parse relative URL.");
    if (m.scheme)
      return T.alwaysNormalize ? (m.path = C.normalizePath(m.path), C.buildURLFromParts(m)) : d;
    var E = C.parseURL(D);
    if (!E)
      throw new Error("Error trying to parse base URL.");
    if (!E.netLoc && E.path && E.path[0] !== "/") {
      var v = S.exec(E.path);
      E.netLoc = v[1], E.path = v[2];
    }
    E.netLoc && !E.path && (E.path = "/");
    var l = { scheme: E.scheme, netLoc: m.netLoc, path: null, params: m.params, query: m.query, fragment: m.fragment };
    if (!m.netLoc && (l.netLoc = E.netLoc, m.path[0] !== "/"))
      if (m.path) {
        var e = E.path, s = e.substring(0, e.lastIndexOf("/") + 1) + m.path;
        l.path = C.normalizePath(s);
      } else
        l.path = E.path, m.params || (l.params = E.params, m.query || (l.query = E.query));
    return l.path === null && (l.path = T.alwaysNormalize ? C.normalizePath(m.path) : m.path), C.buildURLFromParts(l);
  }, parseURL: function(D) {
    var d = R.exec(D);
    return d ? { scheme: d[1] || "", netLoc: d[2] || "", path: d[3] || "", params: d[4] || "", query: d[5] || "", fragment: d[6] || "" } : null;
  }, normalizePath: function(D) {
    for (D = D.split("").reverse().join("").replace(A, ""); D.length !== (D = D.replace(k, "")).length; )
      ;
    return D.split("").reverse().join("");
  }, buildURLFromParts: function(D) {
    return D.scheme + D.netLoc + D.path + D.params + D.query + D.fragment;
  } }, B.exports = C;
}, "./node_modules/webworkify-webpack/index.js": function(B, w, f) {
  function R(d) {
    var T = {};
    function p(E) {
      if (T[E])
        return T[E].exports;
      var v = T[E] = { i: E, l: !1, exports: {} };
      return d[E].call(v.exports, v, v.exports, p), v.l = !0, v.exports;
    }
    p.m = d, p.c = T, p.i = function(E) {
      return E;
    }, p.d = function(E, v, l) {
      p.o(E, v) || Object.defineProperty(E, v, { configurable: !1, enumerable: !0, get: l });
    }, p.r = function(E) {
      Object.defineProperty(E, "__esModule", { value: !0 });
    }, p.n = function(E) {
      var v = E && E.__esModule ? function() {
        return E.default;
      } : function() {
        return E;
      };
      return p.d(v, "a", v), v;
    }, p.o = function(E, v) {
      return Object.prototype.hasOwnProperty.call(E, v);
    }, p.p = "/", p.oe = function(E) {
      throw console.error(E), E;
    };
    var m = p(p.s = ENTRY_MODULE);
    return m.default || m;
  }
  var S = "[\\.|\\-|\\+|\\w|/|@]+", A = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)";
  function k(d) {
    return (d + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  function C(d, T, p) {
    var m = {};
    m[p] = [];
    var E = T.toString(), v = E.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
    if (!v)
      return m;
    for (var l, e = v[1], s = new RegExp("(\\\\n|\\W)" + k(e) + A, "g"); l = s.exec(E); )
      l[3] !== "dll-reference" && m[p].push(l[3]);
    for (s = new RegExp("\\(" + k(e) + '\\("(dll-reference\\s(' + S + '))"\\)\\)' + A, "g"); l = s.exec(E); )
      d[l[2]] || (m[p].push(l[1]), d[l[2]] = f(l[1]).m), m[l[2]] = m[l[2]] || [], m[l[2]].push(l[4]);
    for (var n, r = Object.keys(m), a = 0; a < r.length; a++)
      for (var i = 0; i < m[r[a]].length; i++)
        n = m[r[a]][i], isNaN(1 * n) || (m[r[a]][i] = 1 * m[r[a]][i]);
    return m;
  }
  function D(d) {
    return Object.keys(d).reduce(function(T, p) {
      return T || d[p].length > 0;
    }, !1);
  }
  B.exports = function(d, T) {
    T = T || {};
    var p = { main: f.m }, m = T.all ? { main: Object.keys(p.main) } : function(s, n) {
      for (var r = { main: [n] }, a = { main: [] }, i = { main: {} }; D(r); )
        for (var h = Object.keys(r), g = 0; g < h.length; g++) {
          var c = h[g], y = r[c].pop();
          if (i[c] = i[c] || {}, !i[c][y] && s[c][y]) {
            i[c][y] = !0, a[c] = a[c] || [], a[c].push(y);
            for (var u = C(s, s[c][y], c), t = Object.keys(u), o = 0; o < t.length; o++)
              r[t[o]] = r[t[o]] || [], r[t[o]] = r[t[o]].concat(u[t[o]]);
          }
        }
      return a;
    }(p, d), E = "";
    Object.keys(m).filter(function(s) {
      return s !== "main";
    }).forEach(function(s) {
      for (var n = 0; m[s][n]; )
        n++;
      m[s].push(n), p[s][n] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", E = E + "var " + s + " = (" + R.toString().replace("ENTRY_MODULE", JSON.stringify(n)) + ")({" + m[s].map(function(r) {
        return JSON.stringify(r) + ": " + p[s][r].toString();
      }).join(",") + `});
`;
    }), E = E + "new ((" + R.toString().replace("ENTRY_MODULE", JSON.stringify(d)) + ")({" + m.main.map(function(s) {
      return JSON.stringify(s) + ": " + p.main[s].toString();
    }).join(",") + "}))(self);";
    var v = new window.Blob([E], { type: "text/javascript" });
    if (T.bare)
      return v;
    var l = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(v), e = new window.Worker(l);
    return e.objectURL = l, e;
  };
}, "./src/config.ts": function(B, w, f) {
  f.r(w), f.d(w, "hlsDefaultConfig", function() {
    return h;
  }), f.d(w, "mergeConfig", function() {
    return g;
  }), f.d(w, "enableStreamingMode", function() {
    return c;
  });
  var R = f("./src/controller/abr-controller.ts"), S = f("./src/controller/audio-stream-controller.ts"), A = f("./src/controller/audio-track-controller.ts"), k = f("./src/controller/subtitle-stream-controller.ts"), C = f("./src/controller/subtitle-track-controller.ts"), D = f("./src/controller/buffer-controller.ts"), d = f("./src/controller/timeline-controller.ts"), T = f("./src/controller/cap-level-controller.ts"), p = f("./src/controller/fps-controller.ts"), m = f("./src/controller/eme-controller.ts"), E = f("./src/utils/xhr-loader.ts"), v = f("./src/utils/fetch-loader.ts"), l = f("./src/utils/cues.ts"), e = f("./src/utils/mediakeys-helper.ts"), s = f("./src/utils/logger.ts");
  function n() {
    return (n = Object.assign || function(y) {
      for (var u = 1; u < arguments.length; u++) {
        var t = arguments[u];
        for (var o in t)
          Object.prototype.hasOwnProperty.call(t, o) && (y[o] = t[o]);
      }
      return y;
    }).apply(this, arguments);
  }
  function r(y, u) {
    var t = Object.keys(y);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(y);
      u && (o = o.filter(function(b) {
        return Object.getOwnPropertyDescriptor(y, b).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function a(y) {
    for (var u = 1; u < arguments.length; u++) {
      var t = arguments[u] != null ? arguments[u] : {};
      u % 2 ? r(Object(t), !0).forEach(function(o) {
        i(y, o, t[o]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(y, Object.getOwnPropertyDescriptors(t)) : r(Object(t)).forEach(function(o) {
        Object.defineProperty(y, o, Object.getOwnPropertyDescriptor(t, o));
      });
    }
    return y;
  }
  function i(y, u, t) {
    return u in y ? Object.defineProperty(y, u, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : y[u] = t, y;
  }
  var h = a(a({ autoStartLoad: !0, startPosition: -1, defaultAudioCodec: void 0, debug: !1, capLevelOnFPSDrop: !1, capLevelToPlayerSize: !1, initialLiveManifestSize: 1, maxBufferLength: 30, backBufferLength: 1 / 0, maxBufferSize: 6e7, maxBufferHole: 0.1, highBufferWatchdogPeriod: 2, nudgeOffset: 0.1, nudgeMaxRetry: 3, maxFragLookUpTolerance: 0.25, liveSyncDurationCount: 3, liveMaxLatencyDurationCount: 1 / 0, liveSyncDuration: void 0, liveMaxLatencyDuration: void 0, maxLiveSyncPlaybackRate: 1, liveDurationInfinity: !1, liveBackBufferLength: null, maxMaxBufferLength: 600, enableWorker: !0, enableSoftwareAES: !0, manifestLoadingTimeOut: 1e4, manifestLoadingMaxRetry: 1, manifestLoadingRetryDelay: 1e3, manifestLoadingMaxRetryTimeout: 64e3, startLevel: void 0, levelLoadingTimeOut: 1e4, levelLoadingMaxRetry: 4, levelLoadingRetryDelay: 1e3, levelLoadingMaxRetryTimeout: 64e3, fragLoadingTimeOut: 2e4, fragLoadingMaxRetry: 6, fragLoadingRetryDelay: 1e3, fragLoadingMaxRetryTimeout: 64e3, startFragPrefetch: !1, fpsDroppedMonitoringPeriod: 5e3, fpsDroppedMonitoringThreshold: 0.2, appendErrorMaxRetry: 3, loader: E.default, fLoader: void 0, pLoader: void 0, xhrSetup: void 0, licenseXhrSetup: void 0, licenseResponseCallback: void 0, abrController: R.default, bufferController: D.default, capLevelController: T.default, fpsController: p.default, stretchShortVideoTrack: !1, maxAudioFramesDrift: 1, forceKeyFrameOnDiscontinuity: !0, abrEwmaFastLive: 3, abrEwmaSlowLive: 9, abrEwmaFastVoD: 3, abrEwmaSlowVoD: 9, abrEwmaDefaultEstimate: 5e5, abrBandWidthFactor: 0.95, abrBandWidthUpFactor: 0.7, abrMaxWithRealBitrate: !1, maxStarvationDelay: 4, maxLoadingDelay: 4, minAutoBitrate: 0, emeEnabled: !1, widevineLicenseUrl: void 0, drmSystemOptions: {}, requestMediaKeySystemAccessFunc: e.requestMediaKeySystemAccess, testBandwidth: !0, progressive: !1, lowLatencyMode: !0 }, { cueHandler: l.default, enableCEA708Captions: !0, enableWebVTT: !0, enableIMSC1: !0, captionsTextTrack1Label: "English", captionsTextTrack1LanguageCode: "en", captionsTextTrack2Label: "Spanish", captionsTextTrack2LanguageCode: "es", captionsTextTrack3Label: "Unknown CC", captionsTextTrack3LanguageCode: "", captionsTextTrack4Label: "Unknown CC", captionsTextTrack4LanguageCode: "", renderTextTracksNatively: !0 }), {}, { subtitleStreamController: k.SubtitleStreamController, subtitleTrackController: C.default, timelineController: d.TimelineController, audioStreamController: S.default, audioTrackController: A.default, emeController: m.default });
  function g(y, u) {
    if ((u.liveSyncDurationCount || u.liveMaxLatencyDurationCount) && (u.liveSyncDuration || u.liveMaxLatencyDuration))
      throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
    if (u.liveMaxLatencyDurationCount !== void 0 && (u.liveSyncDurationCount === void 0 || u.liveMaxLatencyDurationCount <= u.liveSyncDurationCount))
      throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
    if (u.liveMaxLatencyDuration !== void 0 && (u.liveSyncDuration === void 0 || u.liveMaxLatencyDuration <= u.liveSyncDuration))
      throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
    return n({}, y, u);
  }
  function c(y) {
    var u = y.loader;
    u !== v.default && u !== E.default ? (s.logger.log("[config]: Custom loader detected, cannot enable progressive streaming"), y.progressive = !1) : Object(v.fetchSupported)() && (y.loader = v.default, y.progressive = !0, y.enableSoftwareAES = !0, s.logger.log("[config]: Progressive streaming enabled, using FetchLoader"));
  }
}, "./src/controller/abr-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/polyfills/number.ts"), S = f("./src/utils/ewma-bandwidth-estimator.ts"), A = f("./src/events.ts"), k = f("./src/utils/buffer-helper.ts"), C = f("./src/errors.ts"), D = f("./src/types/loader.ts"), d = f("./src/utils/logger.ts");
  function T(m, E) {
    for (var v = 0; v < E.length; v++) {
      var l = E[v];
      l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(m, l.key, l);
    }
  }
  var p = function() {
    function m(s) {
      this.hls = void 0, this.lastLoadedFragLevel = 0, this._nextAutoLevel = -1, this.timer = void 0, this.onCheck = this._abandonRulesCheck.bind(this), this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this.hls = s;
      var n = s.config;
      this.bwEstimator = new S.default(n.abrEwmaSlowVoD, n.abrEwmaFastVoD, n.abrEwmaDefaultEstimate), this.registerListeners();
    }
    var E, v, l, e = m.prototype;
    return e.registerListeners = function() {
      var s = this.hls;
      s.on(A.Events.FRAG_LOADING, this.onFragLoading, this), s.on(A.Events.FRAG_LOADED, this.onFragLoaded, this), s.on(A.Events.FRAG_BUFFERED, this.onFragBuffered, this), s.on(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), s.on(A.Events.ERROR, this.onError, this);
    }, e.unregisterListeners = function() {
      var s = this.hls;
      s.off(A.Events.FRAG_LOADING, this.onFragLoading, this), s.off(A.Events.FRAG_LOADED, this.onFragLoaded, this), s.off(A.Events.FRAG_BUFFERED, this.onFragBuffered, this), s.off(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), s.off(A.Events.ERROR, this.onError, this);
    }, e.destroy = function() {
      this.unregisterListeners(), this.clearTimer(), this.hls = this.onCheck = null, this.fragCurrent = this.partCurrent = null;
    }, e.onFragLoading = function(s, n) {
      var r, a = n.frag;
      a.type === D.PlaylistLevelType.MAIN && (this.timer || (this.fragCurrent = a, this.partCurrent = (r = n.part) != null ? r : null, this.timer = self.setInterval(this.onCheck, 100)));
    }, e.onLevelLoaded = function(s, n) {
      var r = this.hls.config;
      n.details.live ? this.bwEstimator.update(r.abrEwmaSlowLive, r.abrEwmaFastLive) : this.bwEstimator.update(r.abrEwmaSlowVoD, r.abrEwmaFastVoD);
    }, e._abandonRulesCheck = function() {
      var s = this.fragCurrent, n = this.partCurrent, r = this.hls, a = r.autoLevelEnabled, i = r.config, h = r.media;
      if (s && h) {
        var g = n ? n.stats : s.stats, c = n ? n.duration : s.duration;
        if (g.aborted)
          return d.logger.warn("frag loader destroy or aborted, disarm abandonRules"), this.clearTimer(), void (this._nextAutoLevel = -1);
        if (a && !h.paused && h.playbackRate && h.readyState) {
          var y = performance.now() - g.loading.start, u = Math.abs(h.playbackRate);
          if (!(y <= 500 * c / u)) {
            var t = r.levels, o = r.minAutoLevel, b = t[s.level], _ = g.total || Math.max(g.loaded, Math.round(c * b.maxBitrate / 8)), L = Math.max(1, g.bwEstimate ? g.bwEstimate / 8 : 1e3 * g.loaded / y), I = (_ - g.loaded) / L, O = h.currentTime, x = (k.BufferHelper.bufferInfo(h, O, i.maxBufferHole).end - O) / u;
            if (!(x >= 2 * c / u || I <= x)) {
              var P, M = Number.POSITIVE_INFINITY;
              for (P = s.level - 1; P > o && !((M = c * t[P].maxBitrate / (6.4 * L)) < x); P--)
                ;
              if (!(M >= I)) {
                var F = this.bwEstimator.getEstimate();
                d.logger.warn("Fragment " + s.sn + (n ? " part " + n.index : "") + " of level " + s.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + P + `
      Current BW estimate: ` + (Object(R.isFiniteNumber)(F) ? (F / 1024).toFixed(3) : "Unknown") + ` Kb/s
      Estimated load time for current fragment: ` + I.toFixed(3) + ` s
      Estimated load time for the next fragment: ` + M.toFixed(3) + ` s
      Time to underbuffer: ` + x.toFixed(3) + " s"), r.nextLoadLevel = P, this.bwEstimator.sample(y, g.loaded), this.clearTimer(), s.loader && (this.fragCurrent = this.partCurrent = null, s.loader.abort()), r.trigger(A.Events.FRAG_LOAD_EMERGENCY_ABORTED, { frag: s, part: n, stats: g });
              }
            }
          }
        }
      }
    }, e.onFragLoaded = function(s, n) {
      var r = n.frag, a = n.part;
      if (r.type === D.PlaylistLevelType.MAIN && Object(R.isFiniteNumber)(r.sn)) {
        var i = a ? a.stats : r.stats, h = a ? a.duration : r.duration;
        if (this.clearTimer(), this.lastLoadedFragLevel = r.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
          var g = this.hls.levels[r.level], c = (g.loaded ? g.loaded.bytes : 0) + i.loaded, y = (g.loaded ? g.loaded.duration : 0) + h;
          g.loaded = { bytes: c, duration: y }, g.realBitrate = Math.round(8 * c / y);
        }
        if (r.bitrateTest) {
          var u = { stats: i, frag: r, part: a, id: r.type };
          this.onFragBuffered(A.Events.FRAG_BUFFERED, u), r.bitrateTest = !1;
        }
      }
    }, e.onFragBuffered = function(s, n) {
      var r = n.frag, a = n.part, i = a ? a.stats : r.stats;
      if (!i.aborted && r.type === D.PlaylistLevelType.MAIN && r.sn !== "initSegment") {
        var h = i.parsing.end - i.loading.start;
        this.bwEstimator.sample(h, i.loaded), i.bwEstimate = this.bwEstimator.getEstimate(), r.bitrateTest ? this.bitrateTestDelay = h / 1e3 : this.bitrateTestDelay = 0;
      }
    }, e.onError = function(s, n) {
      switch (n.details) {
        case C.ErrorDetails.FRAG_LOAD_ERROR:
        case C.ErrorDetails.FRAG_LOAD_TIMEOUT:
          this.clearTimer();
      }
    }, e.clearTimer = function() {
      self.clearInterval(this.timer), this.timer = void 0;
    }, e.getNextABRAutoLevel = function() {
      var s = this.fragCurrent, n = this.partCurrent, r = this.hls, a = r.maxAutoLevel, i = r.config, h = r.minAutoLevel, g = r.media, c = n ? n.duration : s ? s.duration : 0, y = g ? g.currentTime : 0, u = g && g.playbackRate !== 0 ? Math.abs(g.playbackRate) : 1, t = this.bwEstimator ? this.bwEstimator.getEstimate() : i.abrEwmaDefaultEstimate, o = (k.BufferHelper.bufferInfo(g, y, i.maxBufferHole).end - y) / u, b = this.findBestLevel(t, h, a, o, i.abrBandWidthFactor, i.abrBandWidthUpFactor);
      if (b >= 0)
        return b;
      d.logger.trace((o ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
      var _ = c ? Math.min(c, i.maxStarvationDelay) : i.maxStarvationDelay, L = i.abrBandWidthFactor, I = i.abrBandWidthUpFactor;
      if (!o) {
        var O = this.bitrateTestDelay;
        O && (_ = (c ? Math.min(c, i.maxLoadingDelay) : i.maxLoadingDelay) - O, d.logger.trace("bitrate test took " + Math.round(1e3 * O) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * _) + " ms"), L = I = 1);
      }
      return b = this.findBestLevel(t, h, a, o + _, L, I), Math.max(b, 0);
    }, e.findBestLevel = function(s, n, r, a, i, h) {
      for (var g, c = this.fragCurrent, y = this.partCurrent, u = this.lastLoadedFragLevel, t = this.hls.levels, o = t[u], b = !(o == null || (g = o.details) === null || g === void 0 || !g.live), _ = o == null ? void 0 : o.codecSet, L = y ? y.duration : c ? c.duration : 0, I = r; I >= n; I--) {
        var O = t[I];
        if (O && (!_ || O.codecSet === _)) {
          var x = O.details, P = (y ? x == null ? void 0 : x.partTarget : x == null ? void 0 : x.averagetargetduration) || L, M = void 0;
          M = I <= u ? i * s : h * s;
          var F = t[I].maxBitrate, N = F * P / M;
          if (d.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + I + "/" + Math.round(M) + "/" + F + "/" + P + "/" + a + "/" + N), M > F && (!N || b && !this.bitrateTestDelay || N < a))
            return I;
        }
      }
      return -1;
    }, E = m, (v = [{ key: "nextAutoLevel", get: function() {
      var s = this._nextAutoLevel, n = this.bwEstimator;
      if (!(s === -1 || n && n.canEstimate()))
        return s;
      var r = this.getNextABRAutoLevel();
      return s !== -1 && (r = Math.min(s, r)), r;
    }, set: function(s) {
      this._nextAutoLevel = s;
    } }]) && T(E.prototype, v), l && T(E, l), m;
  }();
  w.default = p;
}, "./src/controller/audio-stream-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/polyfills/number.ts"), S = f("./src/controller/base-stream-controller.ts"), A = f("./src/events.ts"), k = f("./src/utils/buffer-helper.ts"), C = f("./src/controller/fragment-tracker.ts"), D = f("./src/types/level.ts"), d = f("./src/types/loader.ts"), T = f("./src/loader/fragment.ts"), p = f("./src/demux/chunk-cache.ts"), m = f("./src/demux/transmuxer-interface.ts"), E = f("./src/types/transmuxer.ts"), v = f("./src/controller/fragment-finders.ts"), l = f("./src/utils/discontinuities.ts"), e = f("./src/errors.ts"), s = f("./src/utils/logger.ts");
  function n() {
    return (n = Object.assign || function(i) {
      for (var h = 1; h < arguments.length; h++) {
        var g = arguments[h];
        for (var c in g)
          Object.prototype.hasOwnProperty.call(g, c) && (i[c] = g[c]);
      }
      return i;
    }).apply(this, arguments);
  }
  function r(i, h) {
    return (r = Object.setPrototypeOf || function(g, c) {
      return g.__proto__ = c, g;
    })(i, h);
  }
  var a = function(i) {
    var h, g;
    function c(u, t) {
      var o;
      return (o = i.call(this, u, t, "[audio-stream-controller]") || this).videoBuffer = null, o.videoTrackCC = -1, o.waitingVideoCC = -1, o.audioSwitch = !1, o.trackId = -1, o.waitingData = null, o.mainDetails = null, o.bufferFlushed = !1, o._registerListeners(), o;
    }
    g = i, (h = c).prototype = Object.create(g.prototype), h.prototype.constructor = h, r(h, g);
    var y = c.prototype;
    return y.onHandlerDestroying = function() {
      this._unregisterListeners(), this.mainDetails = null;
    }, y._registerListeners = function() {
      var u = this.hls;
      u.on(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), u.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), u.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), u.on(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), u.on(A.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), u.on(A.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), u.on(A.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), u.on(A.Events.ERROR, this.onError, this), u.on(A.Events.BUFFER_RESET, this.onBufferReset, this), u.on(A.Events.BUFFER_CREATED, this.onBufferCreated, this), u.on(A.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), u.on(A.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), u.on(A.Events.FRAG_BUFFERED, this.onFragBuffered, this);
    }, y._unregisterListeners = function() {
      var u = this.hls;
      u.off(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), u.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), u.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), u.off(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), u.off(A.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), u.off(A.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), u.off(A.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), u.off(A.Events.ERROR, this.onError, this), u.off(A.Events.BUFFER_RESET, this.onBufferReset, this), u.off(A.Events.BUFFER_CREATED, this.onBufferCreated, this), u.off(A.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), u.off(A.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), u.off(A.Events.FRAG_BUFFERED, this.onFragBuffered, this);
    }, y.onInitPtsFound = function(u, t) {
      var o = t.frag, b = t.id, _ = t.initPTS;
      if (b === "main") {
        var L = o.cc;
        this.initPTS[o.cc] = _, this.log("InitPTS for cc: " + L + " found from main: " + _), this.videoTrackCC = L, this.state === S.State.WAITING_INIT_PTS && this.tick();
      }
    }, y.startLoad = function(u) {
      if (!this.levels)
        return this.startPosition = u, void (this.state = S.State.STOPPED);
      var t = this.lastCurrentTime;
      this.stopLoad(), this.setInterval(100), this.fragLoadError = 0, t > 0 && u === -1 ? (this.log("Override startPosition with lastCurrentTime @" + t.toFixed(3)), this.state = S.State.IDLE) : (this.loadedmetadata = !1, this.state = S.State.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = u, this.tick();
    }, y.doTick = function() {
      switch (this.state) {
        case S.State.IDLE:
          this.doTickIdle();
          break;
        case S.State.WAITING_TRACK:
          var u, t = this.levels, o = this.trackId, b = t == null || (u = t[o]) === null || u === void 0 ? void 0 : u.details;
          if (b) {
            if (this.waitForCdnTuneIn(b))
              break;
            this.state = S.State.WAITING_INIT_PTS;
          }
          break;
        case S.State.FRAG_LOADING_WAITING_RETRY:
          var _, L = performance.now(), I = this.retryDate;
          (!I || L >= I || (_ = this.media) !== null && _ !== void 0 && _.seeking) && (this.log("RetryDate reached, switch back to IDLE state"), this.state = S.State.IDLE);
          break;
        case S.State.WAITING_INIT_PTS:
          var O = this.waitingData;
          if (O) {
            var x = O.frag, P = O.part, M = O.cache, F = O.complete;
            if (this.initPTS[x.cc] !== void 0) {
              this.waitingData = null, this.waitingVideoCC = -1, this.state = S.State.FRAG_LOADING;
              var N = { frag: x, part: P, payload: M.flush(), networkDetails: null };
              this._handleFragmentLoadProgress(N), F && i.prototype._handleFragmentLoadComplete.call(this, N);
            } else if (this.videoTrackCC !== this.waitingVideoCC)
              s.logger.log("Waiting fragment cc (" + x.cc + ") cancelled because video is at cc " + this.videoTrackCC), this.clearWaitingFragment();
            else {
              var U = this.getLoadPosition(), G = k.BufferHelper.bufferInfo(this.mediaBuffer, U, this.config.maxBufferHole);
              Object(v.fragmentWithinToleranceTest)(G.end, this.config.maxFragLookUpTolerance, x) < 0 && (s.logger.log("Waiting fragment cc (" + x.cc + ") @ " + x.start + " cancelled because another fragment at " + G.end + " is needed"), this.clearWaitingFragment());
            }
          } else
            this.state = S.State.IDLE;
      }
      this.onTickEnd();
    }, y.clearWaitingFragment = function() {
      var u = this.waitingData;
      u && (this.fragmentTracker.removeFragment(u.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = S.State.IDLE);
    }, y.onTickEnd = function() {
      var u = this.media;
      if (u && u.readyState) {
        var t = (this.mediaBuffer ? this.mediaBuffer : u).buffered;
        !this.loadedmetadata && t.length && (this.loadedmetadata = !0), this.lastCurrentTime = u.currentTime;
      }
    }, y.doTickIdle = function() {
      var u, t, o = this.hls, b = this.levels, _ = this.media, L = this.trackId, I = o.config;
      if (b && b[L] && (_ || !this.startFragRequested && I.startFragPrefetch)) {
        var O = b[L].details;
        if (!O || O.live && this.levelLastLoaded !== L || this.waitForCdnTuneIn(O))
          this.state = S.State.WAITING_TRACK;
        else {
          this.bufferFlushed && (this.bufferFlushed = !1, this.afterBufferFlushed(this.mediaBuffer ? this.mediaBuffer : this.media, T.ElementaryStreamTypes.AUDIO, d.PlaylistLevelType.AUDIO));
          var x = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, d.PlaylistLevelType.AUDIO);
          if (x !== null) {
            var P = x.len, M = this.getMaxBufferLength(), F = this.audioSwitch;
            if (!(P >= M) || F) {
              if (!F && this._streamEnded(x, O))
                return o.trigger(A.Events.BUFFER_EOS, { type: "audio" }), void (this.state = S.State.ENDED);
              var N = O.fragments[0].start, U = x.end;
              if (F) {
                var G = this.getLoadPosition();
                U = G, O.PTSKnown && G < N && (x.end > N || x.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), _.currentTime = N + 0.05);
              }
              var j = this.getNextFragment(U, O);
              j ? ((u = j.decryptdata) === null || u === void 0 ? void 0 : u.keyFormat) !== "identity" || (t = j.decryptdata) !== null && t !== void 0 && t.key ? this.loadFragment(j, O, U) : this.loadKey(j, O) : this.bufferFlushed = !0;
            }
          }
        }
      }
    }, y.getMaxBufferLength = function() {
      var u = i.prototype.getMaxBufferLength.call(this), t = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, d.PlaylistLevelType.MAIN);
      return t === null ? u : Math.max(u, t.len);
    }, y.onMediaDetaching = function() {
      this.videoBuffer = null, i.prototype.onMediaDetaching.call(this);
    }, y.onAudioTracksUpdated = function(u, t) {
      var o = t.audioTracks;
      this.resetTransmuxer(), this.levels = o.map(function(b) {
        return new D.Level(b);
      });
    }, y.onAudioTrackSwitching = function(u, t) {
      var o = !!t.url;
      this.trackId = t.id;
      var b = this.fragCurrent;
      b != null && b.loader && b.loader.abort(), this.fragCurrent = null, this.clearWaitingFragment(), o ? this.setInterval(100) : this.resetTransmuxer(), o ? (this.audioSwitch = !0, this.state = S.State.IDLE) : this.state = S.State.STOPPED, this.tick();
    }, y.onManifestLoading = function() {
      this.mainDetails = null, this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = !1;
    }, y.onLevelLoaded = function(u, t) {
      this.mainDetails = t.details;
    }, y.onAudioTrackLoaded = function(u, t) {
      var o, b = this.levels, _ = t.details, L = t.id;
      if (b) {
        this.log("Track " + L + " loaded [" + _.startSN + "," + _.endSN + "],duration:" + _.totalduration);
        var I = b[L], O = 0;
        if (_.live || (o = I.details) !== null && o !== void 0 && o.live) {
          var x = this.mainDetails;
          if (_.fragments[0] || (_.deltaUpdateFailed = !0), _.deltaUpdateFailed || !x)
            return;
          !I.details && _.hasProgramDateTime && x.hasProgramDateTime ? (Object(l.alignPDT)(_, x), O = _.fragments[0].start) : O = this.alignPlaylists(_, I.details);
        }
        I.details = _, this.levelLastLoaded = L, this.startFragRequested || !this.mainDetails && _.live || this.setStartPosition(I.details, O), this.state !== S.State.WAITING_TRACK || this.waitForCdnTuneIn(_) || (this.state = S.State.IDLE), this.tick();
      } else
        this.warn("Audio tracks were reset while loading level " + L);
    }, y._handleFragmentLoadProgress = function(u) {
      var t, o = u.frag, b = u.part, _ = u.payload, L = this.config, I = this.trackId, O = this.levels;
      if (O) {
        var x = O[I];
        console.assert(x, "Audio track is defined on fragment load progress");
        var P = x.details;
        console.assert(P, "Audio track details are defined on fragment load progress");
        var M = L.defaultAudioCodec || x.audioCodec || "mp4a.40.2", F = this.transmuxer;
        F || (F = this.transmuxer = new m.default(this.hls, d.PlaylistLevelType.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
        var N = this.initPTS[o.cc], U = (t = o.initSegment) === null || t === void 0 ? void 0 : t.data;
        if (N !== void 0) {
          var G = b ? b.index : -1, j = G !== -1, V = new E.ChunkMetadata(o.level, o.sn, o.stats.chunkCount, _.byteLength, G, j);
          F.push(_, U, M, "", o, b, P.totalduration, !1, V, N);
        } else
          s.logger.log("Unknown video PTS for cc " + o.cc + ", waiting for video PTS before demuxing audio frag " + o.sn + " of [" + P.startSN + " ," + P.endSN + "],track " + I), (this.waitingData = this.waitingData || { frag: o, part: b, cache: new p.default(), complete: !1 }).cache.push(new Uint8Array(_)), this.waitingVideoCC = this.videoTrackCC, this.state = S.State.WAITING_INIT_PTS;
      } else
        this.warn("Audio tracks were reset while fragment load was in progress. Fragment " + o.sn + " of level " + o.level + " will not be buffered");
    }, y._handleFragmentLoadComplete = function(u) {
      this.waitingData ? this.waitingData.complete = !0 : i.prototype._handleFragmentLoadComplete.call(this, u);
    }, y.onBufferReset = function() {
      this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1;
    }, y.onBufferCreated = function(u, t) {
      var o = t.tracks.audio;
      o && (this.mediaBuffer = o.buffer), t.tracks.video && (this.videoBuffer = t.tracks.video.buffer);
    }, y.onFragBuffered = function(u, t) {
      var o = t.frag, b = t.part;
      o.type === d.PlaylistLevelType.AUDIO && (this.fragContextChanged(o) ? this.warn("Fragment " + o.sn + (b ? " p: " + b.index : "") + " of level " + o.level + " finished buffering, but was aborted. state: " + this.state + ", audioSwitch: " + this.audioSwitch) : (o.sn !== "initSegment" && (this.fragPrevious = o, this.audioSwitch && (this.audioSwitch = !1, this.hls.trigger(A.Events.AUDIO_TRACK_SWITCHED, { id: this.trackId }))), this.fragBufferedComplete(o, b)));
    }, y.onError = function(u, t) {
      switch (t.details) {
        case e.ErrorDetails.FRAG_LOAD_ERROR:
        case e.ErrorDetails.FRAG_LOAD_TIMEOUT:
        case e.ErrorDetails.KEY_LOAD_ERROR:
        case e.ErrorDetails.KEY_LOAD_TIMEOUT:
          this.onFragmentOrKeyLoadError(d.PlaylistLevelType.AUDIO, t);
          break;
        case e.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
        case e.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
          this.state !== S.State.ERROR && this.state !== S.State.STOPPED && (this.state = t.fatal ? S.State.ERROR : S.State.IDLE, this.warn(t.details + " while loading frag, switching to " + this.state + " state"));
          break;
        case e.ErrorDetails.BUFFER_FULL_ERROR:
          if (t.parent === "audio" && (this.state === S.State.PARSING || this.state === S.State.PARSED)) {
            var o = !0, b = this.getFwdBufferInfo(this.mediaBuffer, d.PlaylistLevelType.AUDIO);
            b && b.len > 0.5 && (o = !this.reduceMaxBufferLength(b.len)), o && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, i.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.resetLoadingState();
          }
      }
    }, y.onBufferFlushed = function(u, t) {
      t.type === T.ElementaryStreamTypes.AUDIO && (this.bufferFlushed = !0);
    }, y._handleTransmuxComplete = function(u) {
      var t, o = "audio", b = this.hls, _ = u.remuxResult, L = u.chunkMeta, I = this.getCurrentContext(L);
      if (!I)
        return this.warn("The loading context changed while buffering fragment " + L.sn + " of level " + L.level + ". This chunk will not be buffered."), void this.resetLiveStartWhenNotLoaded(L.level);
      var O = I.frag, x = I.part, P = _.audio, M = _.text, F = _.id3, N = _.initSegment;
      if (!this.fragContextChanged(O)) {
        if (this.state = S.State.PARSING, this.audioSwitch && P && this.completeAudioSwitch(), N != null && N.tracks && (this._bufferInitSegment(N.tracks, O, L), b.trigger(A.Events.FRAG_PARSING_INIT_SEGMENT, { frag: O, id: o, tracks: N.tracks })), P) {
          var U = P.startPTS, G = P.endPTS, j = P.startDTS, V = P.endDTS;
          x && (x.elementaryStreams[T.ElementaryStreamTypes.AUDIO] = { startPTS: U, endPTS: G, startDTS: j, endDTS: V }), O.setElementaryStreamInfo(T.ElementaryStreamTypes.AUDIO, U, G, j, V), this.bufferFragmentData(P, O, x, L);
        }
        if (F != null && (t = F.samples) !== null && t !== void 0 && t.length) {
          var Y = n({ frag: O, id: o }, F);
          b.trigger(A.Events.FRAG_PARSING_METADATA, Y);
        }
        if (M) {
          var W = n({ frag: O, id: o }, M);
          b.trigger(A.Events.FRAG_PARSING_USERDATA, W);
        }
      }
    }, y._bufferInitSegment = function(u, t, o) {
      if (this.state === S.State.PARSING) {
        u.video && delete u.video;
        var b = u.audio;
        if (b) {
          b.levelCodec = b.codec, b.id = "audio", this.log("Init audio buffer, container:" + b.container + ", codecs[parsed]=[" + b.codec + "]"), this.hls.trigger(A.Events.BUFFER_CODECS, u);
          var _ = b.initSegment;
          if (_ != null && _.byteLength) {
            var L = { type: "audio", frag: t, part: null, chunkMeta: o, parent: t.type, data: _ };
            this.hls.trigger(A.Events.BUFFER_APPENDING, L);
          }
          this.tick();
        }
      }
    }, y.loadFragment = function(u, t, o) {
      var b = this.fragmentTracker.getState(u);
      this.fragCurrent = u, (this.audioSwitch || b === C.FragmentState.NOT_LOADED || b === C.FragmentState.PARTIAL) && (u.sn === "initSegment" ? this._loadInitSegment(u) : t.live && !Object(R.isFiniteNumber)(this.initPTS[u.cc]) ? (this.log("Waiting for video PTS in continuity counter " + u.cc + " of live stream before loading audio fragment " + u.sn + " of level " + this.trackId), this.state = S.State.WAITING_INIT_PTS) : (this.startFragRequested = !0, i.prototype.loadFragment.call(this, u, t, o)));
    }, y.completeAudioSwitch = function() {
      var u = this.hls, t = this.media, o = this.trackId;
      t && (this.log("Switching audio track : flushing all audio"), i.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.audioSwitch = !1, u.trigger(A.Events.AUDIO_TRACK_SWITCHED, { id: o });
    }, c;
  }(S.default);
  w.default = a;
}, "./src/controller/audio-track-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/events.ts"), S = f("./src/errors.ts"), A = f("./src/controller/base-playlist-controller.ts"), k = f("./src/types/loader.ts");
  function C(T, p) {
    for (var m = 0; m < p.length; m++) {
      var E = p[m];
      E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(T, E.key, E);
    }
  }
  function D(T, p) {
    return (D = Object.setPrototypeOf || function(m, E) {
      return m.__proto__ = E, m;
    })(T, p);
  }
  var d = function(T) {
    var p, m;
    function E(n) {
      var r;
      return (r = T.call(this, n, "[audio-track-controller]") || this).tracks = [], r.groupId = null, r.tracksInGroup = [], r.trackId = -1, r.trackName = "", r.selectDefaultTrack = !0, r.registerListeners(), r;
    }
    m = T, (p = E).prototype = Object.create(m.prototype), p.prototype.constructor = p, D(p, m);
    var v, l, e, s = E.prototype;
    return s.registerListeners = function() {
      var n = this.hls;
      n.on(R.Events.MANIFEST_LOADING, this.onManifestLoading, this), n.on(R.Events.MANIFEST_PARSED, this.onManifestParsed, this), n.on(R.Events.LEVEL_LOADING, this.onLevelLoading, this), n.on(R.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), n.on(R.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), n.on(R.Events.ERROR, this.onError, this);
    }, s.unregisterListeners = function() {
      var n = this.hls;
      n.off(R.Events.MANIFEST_LOADING, this.onManifestLoading, this), n.off(R.Events.MANIFEST_PARSED, this.onManifestParsed, this), n.off(R.Events.LEVEL_LOADING, this.onLevelLoading, this), n.off(R.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), n.off(R.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), n.off(R.Events.ERROR, this.onError, this);
    }, s.destroy = function() {
      this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, T.prototype.destroy.call(this);
    }, s.onManifestLoading = function() {
      this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.trackName = "", this.selectDefaultTrack = !0;
    }, s.onManifestParsed = function(n, r) {
      this.tracks = r.audioTracks || [];
    }, s.onAudioTrackLoaded = function(n, r) {
      var a = r.id, i = r.details, h = this.tracksInGroup[a];
      if (h) {
        var g = h.details;
        h.details = r.details, this.log("audioTrack " + a + " loaded [" + i.startSN + "-" + i.endSN + "]"), a === this.trackId && (this.retryCount = 0, this.playlistLoaded(a, r, g));
      } else
        this.warn("Invalid audio track id " + a);
    }, s.onLevelLoading = function(n, r) {
      this.switchLevel(r.level);
    }, s.onLevelSwitching = function(n, r) {
      this.switchLevel(r.level);
    }, s.switchLevel = function(n) {
      var r = this.hls.levels[n];
      if (r != null && r.audioGroupIds) {
        var a = r.audioGroupIds[r.urlId];
        if (this.groupId !== a) {
          this.groupId = a;
          var i = this.tracks.filter(function(g) {
            return !a || g.groupId === a;
          });
          this.selectDefaultTrack && !i.some(function(g) {
            return g.default;
          }) && (this.selectDefaultTrack = !1), this.tracksInGroup = i;
          var h = { audioTracks: i };
          this.log("Updating audio tracks, " + i.length + ' track(s) found in "' + a + '" group-id'), this.hls.trigger(R.Events.AUDIO_TRACKS_UPDATED, h), this.selectInitialTrack();
        }
      }
    }, s.onError = function(n, r) {
      T.prototype.onError.call(this, n, r), !r.fatal && r.context && r.context.type === k.PlaylistContextType.AUDIO_TRACK && r.context.id === this.trackId && r.context.groupId === this.groupId && this.retryLoadingOrFail(r);
    }, s.setAudioTrack = function(n) {
      var r = this.tracksInGroup;
      if (n < 0 || n >= r.length)
        this.warn("Invalid id passed to audio-track controller");
      else {
        this.clearTimer();
        var a = r[this.trackId];
        this.log("Now switching to audio-track index " + n);
        var i = r[n], h = i.id, g = i.groupId, c = g === void 0 ? "" : g, y = i.name, u = i.type, t = i.url;
        if (this.trackId = n, this.trackName = y, this.selectDefaultTrack = !1, this.hls.trigger(R.Events.AUDIO_TRACK_SWITCHING, { id: h, groupId: c, name: y, type: u, url: t }), !i.details || i.details.live) {
          var o = this.switchParams(i.url, a == null ? void 0 : a.details);
          this.loadPlaylist(o);
        }
      }
    }, s.selectInitialTrack = function() {
      var n = this.tracksInGroup;
      console.assert(n.length, "Initial audio track should be selected when tracks are known");
      var r = this.trackName, a = this.findTrackId(r) || this.findTrackId();
      a !== -1 ? this.setAudioTrack(a) : (this.warn("No track found for running audio group-ID: " + this.groupId), this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.MEDIA_ERROR, details: S.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, fatal: !0 }));
    }, s.findTrackId = function(n) {
      for (var r = this.tracksInGroup, a = 0; a < r.length; a++) {
        var i = r[a];
        if ((!this.selectDefaultTrack || i.default) && (!n || n === i.name))
          return i.id;
      }
      return -1;
    }, s.loadPlaylist = function(n) {
      var r = this.tracksInGroup[this.trackId];
      if (this.shouldLoadTrack(r)) {
        var a = r.id, i = r.groupId, h = r.url;
        if (n)
          try {
            h = n.addDirectives(h);
          } catch (g) {
            this.warn("Could not construct new URL with HLS Delivery Directives: " + g);
          }
        this.log("loading audio-track playlist for id: " + a), this.clearTimer(), this.hls.trigger(R.Events.AUDIO_TRACK_LOADING, { url: h, id: a, groupId: i, deliveryDirectives: n || null });
      }
    }, v = E, (l = [{ key: "audioTracks", get: function() {
      return this.tracksInGroup;
    } }, { key: "audioTrack", get: function() {
      return this.trackId;
    }, set: function(n) {
      this.selectDefaultTrack = !1, this.setAudioTrack(n);
    } }]) && C(v.prototype, l), e && C(v, e), E;
  }(A.default);
  w.default = d;
}, "./src/controller/base-playlist-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return D;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/types/level.ts"), A = f("./src/controller/level-helper.ts"), k = f("./src/utils/logger.ts"), C = f("./src/errors.ts"), D = function() {
    function d(p, m) {
      this.hls = void 0, this.timer = -1, this.canLoad = !1, this.retryCount = 0, this.log = void 0, this.warn = void 0, this.log = k.logger.log.bind(k.logger, m + ":"), this.warn = k.logger.warn.bind(k.logger, m + ":"), this.hls = p;
    }
    var T = d.prototype;
    return T.destroy = function() {
      this.clearTimer(), this.hls = this.log = this.warn = null;
    }, T.onError = function(p, m) {
      m.fatal && m.type === C.ErrorTypes.NETWORK_ERROR && this.clearTimer();
    }, T.clearTimer = function() {
      clearTimeout(this.timer), this.timer = -1;
    }, T.startLoad = function() {
      this.canLoad = !0, this.retryCount = 0, this.loadPlaylist();
    }, T.stopLoad = function() {
      this.canLoad = !1, this.clearTimer();
    }, T.switchParams = function(p, m) {
      var E = m == null ? void 0 : m.renditionReports;
      if (E)
        for (var v = 0; v < E.length; v++) {
          var l = E[v], e = "" + l.URI;
          if (e === p.substr(-e.length)) {
            var s = parseInt(l["LAST-MSN"]), n = parseInt(l["LAST-PART"]);
            if (m && this.hls.config.lowLatencyMode) {
              var r = Math.min(m.age - m.partTarget, m.targetduration);
              n !== void 0 && r > m.partTarget && (n += 1);
            }
            if (Object(R.isFiniteNumber)(s))
              return new S.HlsUrlParameters(s, Object(R.isFiniteNumber)(n) ? n : void 0, S.HlsSkip.No);
          }
        }
    }, T.loadPlaylist = function(p) {
    }, T.shouldLoadTrack = function(p) {
      return this.canLoad && p && !!p.url && (!p.details || p.details.live);
    }, T.playlistLoaded = function(p, m, E) {
      var v = this, l = m.details, e = m.stats, s = e.loading.end ? Math.max(0, self.performance.now() - e.loading.end) : 0;
      if (l.advancedDateTime = Date.now() - s, l.live || E != null && E.live) {
        if (l.reloaded(E), E && this.log("live playlist " + p + " " + (l.advanced ? "REFRESHED " + l.lastPartSn + "-" + l.lastPartIndex : "MISSED")), E && l.fragments.length > 0 && Object(A.mergeDetails)(E, l), !this.canLoad || !l.live)
          return;
        var n, r = void 0, a = void 0;
        if (l.canBlockReload && l.endSN && l.advanced) {
          var i = this.hls.config.lowLatencyMode, h = l.lastPartSn, g = l.endSN, c = l.lastPartIndex, y = h === g;
          c !== -1 ? (r = y ? g + 1 : h, a = y ? i ? 0 : c : c + 1) : r = g + 1;
          var u = l.age, t = u + l.ageHeader, o = Math.min(t - l.partTarget, 1.5 * l.targetduration);
          if (o > 0) {
            if (E && o > E.tuneInGoal)
              this.warn("CDN Tune-in goal increased from: " + E.tuneInGoal + " to: " + o + " with playlist age: " + l.age), o = 0;
            else {
              var b = Math.floor(o / l.targetduration);
              r += b, a !== void 0 && (a += Math.round(o % l.targetduration / l.partTarget)), this.log("CDN Tune-in age: " + l.ageHeader + "s last advanced " + u.toFixed(2) + "s goal: " + o + " skip sn " + b + " to part " + a);
            }
            l.tuneInGoal = o;
          }
          if (n = this.getDeliveryDirectives(l, m.deliveryDirectives, r, a), i || !y)
            return void this.loadPlaylist(n);
        } else
          n = this.getDeliveryDirectives(l, m.deliveryDirectives, r, a);
        var _ = Object(A.computeReloadInterval)(l, e);
        r !== void 0 && l.canBlockReload && (_ -= l.partTarget || 1), this.log("reload live playlist " + p + " in " + Math.round(_) + " ms"), this.timer = self.setTimeout(function() {
          return v.loadPlaylist(n);
        }, _);
      } else
        this.clearTimer();
    }, T.getDeliveryDirectives = function(p, m, E, v) {
      var l = Object(S.getSkipValue)(p, E);
      return m != null && m.skip && p.deltaUpdateFailed && (E = m.msn, v = m.part, l = S.HlsSkip.No), new S.HlsUrlParameters(E, v, l);
    }, T.retryLoadingOrFail = function(p) {
      var m, E = this, v = this.hls.config, l = this.retryCount < v.levelLoadingMaxRetry;
      if (l)
        if (this.retryCount++, p.details.indexOf("LoadTimeOut") > -1 && (m = p.context) !== null && m !== void 0 && m.deliveryDirectives)
          this.warn("retry playlist loading #" + this.retryCount + ' after "' + p.details + '"'), this.loadPlaylist();
        else {
          var e = Math.min(Math.pow(2, this.retryCount) * v.levelLoadingRetryDelay, v.levelLoadingMaxRetryTimeout);
          this.timer = self.setTimeout(function() {
            return E.loadPlaylist();
          }, e), this.warn("retry playlist loading #" + this.retryCount + " in " + e + ' ms after "' + p.details + '"');
        }
      else
        this.warn('cannot recover from error "' + p.details + '"'), this.clearTimer(), p.fatal = !0;
      return l;
    }, d;
  }();
}, "./src/controller/base-stream-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "State", function() {
    return i;
  }), f.d(w, "default", function() {
    return h;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/task-loop.ts"), A = f("./src/controller/fragment-tracker.ts"), k = f("./src/utils/buffer-helper.ts"), C = f("./src/utils/logger.ts"), D = f("./src/events.ts"), d = f("./src/errors.ts"), T = f("./src/types/transmuxer.ts"), p = f("./src/utils/mp4-tools.ts"), m = f("./src/utils/discontinuities.ts"), E = f("./src/controller/fragment-finders.ts"), v = f("./src/controller/level-helper.ts"), l = f("./src/loader/fragment-loader.ts"), e = f("./src/crypt/decrypter.ts"), s = f("./src/utils/time-ranges.ts"), n = f("./src/types/loader.ts");
  function r(g, c) {
    for (var y = 0; y < c.length; y++) {
      var u = c[y];
      u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(g, u.key, u);
    }
  }
  function a(g, c) {
    return (a = Object.setPrototypeOf || function(y, u) {
      return y.__proto__ = u, y;
    })(g, c);
  }
  var i = { STOPPED: "STOPPED", IDLE: "IDLE", KEY_LOADING: "KEY_LOADING", FRAG_LOADING: "FRAG_LOADING", FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY", WAITING_TRACK: "WAITING_TRACK", PARSING: "PARSING", PARSED: "PARSED", BACKTRACKING: "BACKTRACKING", ENDED: "ENDED", ERROR: "ERROR", WAITING_INIT_PTS: "WAITING_INIT_PTS", WAITING_LEVEL: "WAITING_LEVEL" }, h = function(g) {
    var c, y;
    function u(L, I, O) {
      var x;
      return (x = g.call(this) || this).hls = void 0, x.fragPrevious = null, x.fragCurrent = null, x.fragmentTracker = void 0, x.transmuxer = null, x._state = i.STOPPED, x.media = void 0, x.mediaBuffer = void 0, x.config = void 0, x.bitrateTest = !1, x.lastCurrentTime = 0, x.nextLoadPosition = 0, x.startPosition = 0, x.loadedmetadata = !1, x.fragLoadError = 0, x.retryDate = 0, x.levels = null, x.fragmentLoader = void 0, x.levelLastLoaded = null, x.startFragRequested = !1, x.decrypter = void 0, x.initPTS = [], x.onvseeking = null, x.onvended = null, x.logPrefix = "", x.log = void 0, x.warn = void 0, x.logPrefix = O, x.log = C.logger.log.bind(C.logger, O + ":"), x.warn = C.logger.warn.bind(C.logger, O + ":"), x.hls = L, x.fragmentLoader = new l.default(L.config), x.fragmentTracker = I, x.config = L.config, x.decrypter = new e.default(L, L.config), L.on(D.Events.KEY_LOADED, x.onKeyLoaded, function(P) {
        if (P === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return P;
      }(x)), x;
    }
    y = g, (c = u).prototype = Object.create(y.prototype), c.prototype.constructor = c, a(c, y);
    var t, o, b, _ = u.prototype;
    return _.doTick = function() {
      this.onTickEnd();
    }, _.onTickEnd = function() {
    }, _.startLoad = function(L) {
    }, _.stopLoad = function() {
      this.fragmentLoader.abort();
      var L = this.fragCurrent;
      L && this.fragmentTracker.removeFragment(L), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = i.STOPPED;
    }, _._streamEnded = function(L, I) {
      var O = this.fragCurrent, x = this.fragmentTracker;
      if (!I.live && O && O.sn === I.endSN && !L.nextStart) {
        var P = x.getState(O);
        return P === A.FragmentState.PARTIAL || P === A.FragmentState.OK;
      }
      return !1;
    }, _.onMediaAttached = function(L, I) {
      var O = this.media = this.mediaBuffer = I.media;
      this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), O.addEventListener("seeking", this.onvseeking), O.addEventListener("ended", this.onvended);
      var x = this.config;
      this.levels && x.autoStartLoad && this.state === i.STOPPED && this.startLoad(x.startPosition);
    }, _.onMediaDetaching = function() {
      var L = this.media;
      L != null && L.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), L && (L.removeEventListener("seeking", this.onvseeking), L.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad();
    }, _.onMediaSeeking = function() {
      var L = this.config, I = this.fragCurrent, O = this.media, x = this.mediaBuffer, P = this.state, M = O ? O.currentTime : 0, F = k.BufferHelper.bufferInfo(x || O, M, L.maxBufferHole);
      if (this.log("media seeking to " + (Object(R.isFiniteNumber)(M) ? M.toFixed(3) : M) + ", state: " + P), P === i.ENDED)
        this.resetLoadingState();
      else if (I && !F.len) {
        var N = L.maxFragLookUpTolerance, U = I.start - N, G = M > I.start + I.duration + N;
        (M < U || G) && (G && I.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), I.loader.abort()), this.resetLoadingState());
      }
      O && (this.lastCurrentTime = M), this.loadedmetadata || F.len || (this.nextLoadPosition = this.startPosition = M), this.tickImmediate();
    }, _.onMediaEnded = function() {
      this.startPosition = this.lastCurrentTime = 0;
    }, _.onKeyLoaded = function(L, I) {
      if (this.state === i.KEY_LOADING && I.frag === this.fragCurrent && this.levels) {
        this.state = i.IDLE;
        var O = this.levels[I.frag.level].details;
        O && this.loadFragment(I.frag, O, I.frag.start);
      }
    }, _.onHandlerDestroying = function() {
      this.stopLoad(), g.prototype.onHandlerDestroying.call(this);
    }, _.onHandlerDestroyed = function() {
      this.state = i.STOPPED, this.hls.off(D.Events.KEY_LOADED, this.onKeyLoaded, this), this.fragmentLoader && this.fragmentLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.fragmentLoader = this.fragmentTracker = null, g.prototype.onHandlerDestroyed.call(this);
    }, _.loadKey = function(L, I) {
      this.log("Loading key for " + L.sn + " of [" + I.startSN + "-" + I.endSN + "], " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + " " + L.level), this.state = i.KEY_LOADING, this.fragCurrent = L, this.hls.trigger(D.Events.KEY_LOADING, { frag: L });
    }, _.loadFragment = function(L, I, O) {
      this._loadFragForPlayback(L, I, O);
    }, _._loadFragForPlayback = function(L, I, O) {
      var x = this;
      this._doFragLoad(L, I, O, function(P) {
        if (x.fragContextChanged(L))
          return x.warn("Fragment " + L.sn + (P.part ? " p: " + P.part.index : "") + " of level " + L.level + " was dropped during download."), void x.fragmentTracker.removeFragment(L);
        L.stats.chunkCount++, x._handleFragmentLoadProgress(P);
      }).then(function(P) {
        if (P) {
          x.fragLoadError = 0;
          var M = x.state;
          if (!x.fragContextChanged(L))
            return "payload" in P && (x.log("Loaded fragment " + L.sn + " of level " + L.level), x.hls.trigger(D.Events.FRAG_LOADED, P), x.state === i.BACKTRACKING) ? (x.fragmentTracker.backtrack(L, P), void x.resetFragmentLoading(L)) : void x._handleFragmentLoadComplete(P);
          (M === i.FRAG_LOADING || M === i.BACKTRACKING || !x.fragCurrent && M === i.PARSING) && (x.fragmentTracker.removeFragment(L), x.state = i.IDLE);
        }
      }).catch(function(P) {
        x.warn(P), x.resetFragmentLoading(L);
      });
    }, _.flushMainBuffer = function(L, I, O) {
      if (O === void 0 && (O = null), L - I) {
        var x = { startOffset: L, endOffset: I, type: O };
        this.fragLoadError = 0, this.hls.trigger(D.Events.BUFFER_FLUSHING, x);
      }
    }, _._loadInitSegment = function(L) {
      var I = this;
      this._doFragLoad(L).then(function(O) {
        if (!O || I.fragContextChanged(L) || !I.levels)
          throw new Error("init load aborted");
        return O;
      }).then(function(O) {
        var x = I.hls, P = O.payload, M = L.decryptdata;
        if (P && P.byteLength > 0 && M && M.key && M.iv && M.method === "AES-128") {
          var F = self.performance.now();
          return I.decrypter.webCryptoDecrypt(new Uint8Array(P), M.key.buffer, M.iv.buffer).then(function(N) {
            var U = self.performance.now();
            return x.trigger(D.Events.FRAG_DECRYPTED, { frag: L, payload: N, stats: { tstart: F, tdecrypt: U } }), O.payload = N, O;
          });
        }
        return O;
      }).then(function(O) {
        var x = I.fragCurrent, P = I.hls, M = I.levels;
        if (!M)
          throw new Error("init load aborted, missing levels");
        var F = M[L.level].details;
        console.assert(F, "Level details are defined when init segment is loaded");
        var N = L.stats;
        I.state = i.IDLE, I.fragLoadError = 0, L.data = new Uint8Array(O.payload), N.parsing.start = N.buffering.start = self.performance.now(), N.parsing.end = N.buffering.end = self.performance.now(), O.frag === x && P.trigger(D.Events.FRAG_BUFFERED, { stats: N, frag: x, part: null, id: L.type }), I.tick();
      }).catch(function(O) {
        I.warn(O), I.resetFragmentLoading(L);
      });
    }, _.fragContextChanged = function(L) {
      var I = this.fragCurrent;
      return !L || !I || L.level !== I.level || L.sn !== I.sn || L.urlId !== I.urlId;
    }, _.fragBufferedComplete = function(L, I) {
      var O = this.mediaBuffer ? this.mediaBuffer : this.media;
      this.log("Buffered " + L.type + " sn: " + L.sn + (I ? " part: " + I.index : "") + " of " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + " " + L.level + " " + s.default.toString(k.BufferHelper.getBuffered(O))), this.state = i.IDLE, this.tick();
    }, _._handleFragmentLoadComplete = function(L) {
      var I = this.transmuxer;
      if (I) {
        var O = L.frag, x = L.part, P = L.partsLoaded, M = !P || P.length === 0 || P.some(function(N) {
          return !N;
        }), F = new T.ChunkMetadata(O.level, O.sn, O.stats.chunkCount + 1, 0, x ? x.index : -1, !M);
        I.flush(F);
      }
    }, _._handleFragmentLoadProgress = function(L) {
    }, _._doFragLoad = function(L, I, O, x) {
      var P = this;
      if (O === void 0 && (O = null), !this.levels)
        throw new Error("frag load aborted, missing levels");
      if (O = Math.max(L.start, O || 0), this.config.lowLatencyMode && I) {
        var M = I.partList;
        if (M && x) {
          O > L.end && I.fragmentHint && (L = I.fragmentHint);
          var F = this.getNextPart(M, L, O);
          if (F > -1) {
            var N = M[F];
            return this.log("Loading part sn: " + L.sn + " p: " + N.index + " cc: " + L.cc + " of playlist [" + I.startSN + "-" + I.endSN + "] parts [0-" + F + "-" + (M.length - 1) + "] " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + ": " + L.level + ", target: " + parseFloat(O.toFixed(3))), this.nextLoadPosition = N.start + N.duration, this.state = i.FRAG_LOADING, this.hls.trigger(D.Events.FRAG_LOADING, { frag: L, part: M[F], targetBufferTime: O }), this.doFragPartsLoad(L, M, F, x).catch(function(U) {
              return P.handleFragLoadError(U);
            });
          }
          if (!L.url || this.loadedEndOfParts(M, O))
            return Promise.resolve(null);
        }
      }
      return this.log("Loading fragment " + L.sn + " cc: " + L.cc + " " + (I ? "of [" + I.startSN + "-" + I.endSN + "] " : "") + (this.logPrefix === "[stream-controller]" ? "level" : "track") + ": " + L.level + ", target: " + parseFloat(O.toFixed(3))), Object(R.isFiniteNumber)(L.sn) && !this.bitrateTest && (this.nextLoadPosition = L.start + L.duration), this.state = i.FRAG_LOADING, this.hls.trigger(D.Events.FRAG_LOADING, { frag: L, targetBufferTime: O }), this.fragmentLoader.load(L, x).catch(function(U) {
        return P.handleFragLoadError(U);
      });
    }, _.doFragPartsLoad = function(L, I, O, x) {
      var P = this;
      return new Promise(function(M, F) {
        var N = [];
        (function U(G) {
          var j = I[G];
          P.fragmentLoader.loadPart(L, j, x).then(function(V) {
            N[j.index] = V;
            var Y = V.part;
            P.hls.trigger(D.Events.FRAG_LOADED, V);
            var W = I[G + 1];
            if (!W || W.fragment !== L)
              return M({ frag: L, part: Y, partsLoaded: N });
            U(G + 1);
          }).catch(F);
        })(O);
      });
    }, _.handleFragLoadError = function(L) {
      var I = L.data;
      return I && I.details === d.ErrorDetails.INTERNAL_ABORTED ? this.handleFragLoadAborted(I.frag, I.part) : this.hls.trigger(D.Events.ERROR, I), null;
    }, _._handleTransmuxerFlush = function(L) {
      var I = this.getCurrentContext(L);
      if (I && this.state === i.PARSING) {
        var O = I.frag, x = I.part, P = I.level, M = self.performance.now();
        O.stats.parsing.end = M, x && (x.stats.parsing.end = M), this.updateLevelTiming(O, x, P, L.partial);
      } else
        this.fragCurrent || (this.state = i.IDLE);
    }, _.getCurrentContext = function(L) {
      var I = this.levels, O = L.level, x = L.sn, P = L.part;
      if (!I || !I[O])
        return this.warn("Levels object was unset while buffering fragment " + x + " of level " + O + ". The current chunk will not be buffered."), null;
      var M = I[O], F = P > -1 ? Object(v.getPartWith)(M, x, P) : null, N = F ? F.fragment : Object(v.getFragmentWithSN)(M, x, this.fragCurrent);
      return N ? { frag: N, part: F, level: M } : null;
    }, _.bufferFragmentData = function(L, I, O, x) {
      if (L && this.state === i.PARSING) {
        var P = L.data1, M = L.data2, F = P;
        if (P && M && (F = Object(p.appendUint8Array)(P, M)), F && F.length) {
          var N = { type: L.type, frag: I, part: O, chunkMeta: x, parent: I.type, data: F };
          this.hls.trigger(D.Events.BUFFER_APPENDING, N), L.dropped && L.independent && !O && this.flushBufferGap(I);
        }
      }
    }, _.flushBufferGap = function(L) {
      var I = this.media;
      if (I)
        if (k.BufferHelper.isBuffered(I, I.currentTime)) {
          var O = I.currentTime, x = k.BufferHelper.bufferInfo(I, O, 0), P = L.duration, M = Math.min(2 * this.config.maxFragLookUpTolerance, 0.25 * P), F = Math.max(Math.min(L.start - M, x.end - M), O + M);
          L.start - F > M && this.flushMainBuffer(F, L.start);
        } else
          this.flushMainBuffer(0, L.start);
    }, _.getFwdBufferInfo = function(L, I) {
      var O = this.config, x = this.getLoadPosition();
      if (!Object(R.isFiniteNumber)(x))
        return null;
      var P = k.BufferHelper.bufferInfo(L, x, O.maxBufferHole);
      if (P.len === 0 && P.nextStart !== void 0) {
        var M = this.fragmentTracker.getBufferedFrag(x, I);
        if (M && P.nextStart < M.end)
          return k.BufferHelper.bufferInfo(L, x, Math.max(P.nextStart, O.maxBufferHole));
      }
      return P;
    }, _.getMaxBufferLength = function(L) {
      var I, O = this.config;
      return I = L ? Math.max(8 * O.maxBufferSize / L, O.maxBufferLength) : O.maxBufferLength, Math.min(I, O.maxMaxBufferLength);
    }, _.reduceMaxBufferLength = function(L) {
      var I = this.config, O = L || I.maxBufferLength;
      return I.maxMaxBufferLength >= O && (I.maxMaxBufferLength /= 2, this.warn("Reduce max buffer length to " + I.maxMaxBufferLength + "s"), !0);
    }, _.getNextFragment = function(L, I) {
      var O, x, P = I.fragments, M = P.length;
      if (!M)
        return null;
      var F, N = this.config, U = P[0].start;
      if (I.live) {
        var G = N.initialLiveManifestSize;
        if (M < G)
          return this.warn("Not enough fragments to start playback (have: " + M + ", need: " + G + ")"), null;
        I.PTSKnown || this.startFragRequested || this.startPosition !== -1 || (F = this.getInitialLiveFragment(I, P), this.startPosition = F ? this.hls.liveSyncPosition || F.start : L);
      } else
        L <= U && (F = P[0]);
      if (!F) {
        var j = N.lowLatencyMode ? I.partEnd : I.fragmentEnd;
        F = this.getFragmentAtPosition(L, j, I);
      }
      return (O = F) === null || O === void 0 || !O.initSegment || (x = F) !== null && x !== void 0 && x.initSegment.data || this.bitrateTest || (F = F.initSegment), F;
    }, _.getNextPart = function(L, I, O) {
      for (var x = -1, P = !1, M = !0, F = 0, N = L.length; F < N; F++) {
        var U = L[F];
        if (M = M && !U.independent, x > -1 && O < U.start)
          break;
        var G = U.loaded;
        !G && (P || U.independent || M) && U.fragment === I && (x = F), P = G;
      }
      return x;
    }, _.loadedEndOfParts = function(L, I) {
      var O = L[L.length - 1];
      return O && I > O.start && O.loaded;
    }, _.getInitialLiveFragment = function(L, I) {
      var O = this.fragPrevious, x = null;
      if (O) {
        if (L.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + O.programDateTime), x = Object(E.findFragmentByPDT)(I, O.endProgramDateTime, this.config.maxFragLookUpTolerance)), !x) {
          var P = O.sn + 1;
          if (P >= L.startSN && P <= L.endSN) {
            var M = I[P - L.startSN];
            O.cc === M.cc && (x = M, this.log("Live playlist, switching playlist, load frag with next SN: " + x.sn));
          }
          x || (x = Object(E.findFragWithCC)(I, O.cc)) && this.log("Live playlist, switching playlist, load frag with same CC: " + x.sn);
        }
      } else {
        var F = this.hls.liveSyncPosition;
        F !== null && (x = this.getFragmentAtPosition(F, this.bitrateTest ? L.fragmentEnd : L.edge, L));
      }
      return x;
    }, _.getFragmentAtPosition = function(L, I, O) {
      var x, P = this.config, M = this.fragPrevious, F = O.fragments, N = O.endSN, U = O.fragmentHint, G = P.maxFragLookUpTolerance, j = !!(P.lowLatencyMode && O.partList && U);
      if (j && U && !this.bitrateTest && (F = F.concat(U), N = U.sn), L < I) {
        var V = L > I - G ? 0 : G;
        x = Object(E.findFragmentByPTS)(M, F, L, V);
      } else
        x = F[F.length - 1];
      if (x) {
        var Y = x.sn - O.startSN, W = M && x.level === M.level, q = F[Y + 1];
        if (this.fragmentTracker.getState(x) === A.FragmentState.BACKTRACKED) {
          x = null;
          for (var X = Y; F[X] && this.fragmentTracker.getState(F[X]) === A.FragmentState.BACKTRACKED; )
            x = M ? F[X--] : F[--X];
          x || (x = q);
        } else
          M && x.sn === M.sn && !j && W && (x.sn < N && this.fragmentTracker.getState(q) !== A.FragmentState.OK ? (this.log("SN " + x.sn + " just loaded, load next one: " + q.sn), x = q) : x = null);
      }
      return x;
    }, _.synchronizeToLiveEdge = function(L) {
      var I = this.config, O = this.media;
      if (O) {
        var x = this.hls.liveSyncPosition, P = O.currentTime, M = L.fragments[0].start, F = L.edge, N = P >= M - I.maxFragLookUpTolerance && P <= F;
        if (x !== null && O.duration > x && (P < x || !N)) {
          var U = I.liveMaxLatencyDuration !== void 0 ? I.liveMaxLatencyDuration : I.liveMaxLatencyDurationCount * L.targetduration;
          (!N && O.readyState < 4 || P < F - U) && (this.loadedmetadata || (this.nextLoadPosition = x), O.readyState && (this.warn("Playback: " + P.toFixed(3) + " is located too far from the end of live sliding playlist: " + F + ", reset currentTime to : " + x.toFixed(3)), O.currentTime = x));
        }
      }
    }, _.alignPlaylists = function(L, I) {
      var O = this.levels, x = this.levelLastLoaded, P = this.fragPrevious, M = x !== null ? O[x] : null, F = L.fragments.length;
      if (!F)
        return this.warn("No fragments in live playlist"), 0;
      var N = L.fragments[0].start, U = !I, G = L.alignedSliding && Object(R.isFiniteNumber)(N);
      if (U || !G && !N) {
        Object(m.alignStream)(P, M, L);
        var j = L.fragments[0].start;
        return this.log("Live playlist sliding: " + j.toFixed(2) + " start-sn: " + (I ? I.startSN : "na") + "->" + L.startSN + " prev-sn: " + (P ? P.sn : "na") + " fragments: " + F), j;
      }
      return N;
    }, _.waitForCdnTuneIn = function(L) {
      return L.live && L.canBlockReload && L.tuneInGoal > Math.max(L.partHoldBack, 3 * L.partTarget);
    }, _.setStartPosition = function(L, I) {
      var O = this.startPosition;
      if (O < I && (O = -1), O === -1 || this.lastCurrentTime === -1) {
        var x = L.startTimeOffset;
        Object(R.isFiniteNumber)(x) ? (O = I + x, x < 0 && (O += L.totalduration), O = Math.min(Math.max(I, O), I + L.totalduration), this.log("Start time offset " + x + " found in playlist, adjust startPosition to " + O), this.startPosition = O) : L.live ? O = this.hls.liveSyncPosition || I : this.startPosition = O = 0, this.lastCurrentTime = O;
      }
      this.nextLoadPosition = O;
    }, _.getLoadPosition = function() {
      var L = this.media, I = 0;
      return this.loadedmetadata && L ? I = L.currentTime : this.nextLoadPosition && (I = this.nextLoadPosition), I;
    }, _.handleFragLoadAborted = function(L, I) {
      this.transmuxer && L.sn !== "initSegment" && L.stats.aborted && (this.warn("Fragment " + L.sn + (I ? " part" + I.index : "") + " of level " + L.level + " was aborted"), this.resetFragmentLoading(L));
    }, _.resetFragmentLoading = function(L) {
      this.fragCurrent && this.fragContextChanged(L) || (this.state = i.IDLE);
    }, _.onFragmentOrKeyLoadError = function(L, I) {
      if (!I.fatal) {
        var O = I.frag;
        if (O && O.type === L) {
          var x = this.fragCurrent;
          console.assert(x && O.sn === x.sn && O.level === x.level && O.urlId === x.urlId, "Frag load error must match current frag to retry");
          var P = this.config;
          if (this.fragLoadError + 1 <= P.fragLoadingMaxRetry) {
            if (this.resetLiveStartWhenNotLoaded(O.level))
              return;
            var M = Math.min(Math.pow(2, this.fragLoadError) * P.fragLoadingRetryDelay, P.fragLoadingMaxRetryTimeout);
            this.warn("Fragment " + O.sn + " of " + L + " " + O.level + " failed to load, retrying in " + M + "ms"), this.retryDate = self.performance.now() + M, this.fragLoadError++, this.state = i.FRAG_LOADING_WAITING_RETRY;
          } else
            I.levelRetry ? (L === n.PlaylistLevelType.AUDIO && (this.fragCurrent = null), this.fragLoadError = 0, this.state = i.IDLE) : (C.logger.error(I.details + " reaches max retry, redispatch as fatal ..."), I.fatal = !0, this.hls.stopLoad(), this.state = i.ERROR);
        }
      }
    }, _.afterBufferFlushed = function(L, I, O) {
      if (L) {
        var x = k.BufferHelper.getBuffered(L);
        this.fragmentTracker.detectEvictedFragments(I, x, O), this.state === i.ENDED && this.resetLoadingState();
      }
    }, _.resetLoadingState = function() {
      this.fragCurrent = null, this.fragPrevious = null, this.state = i.IDLE;
    }, _.resetLiveStartWhenNotLoaded = function(L) {
      if (!this.loadedmetadata) {
        this.startFragRequested = !1;
        var I = this.levels ? this.levels[L].details : null;
        if (I != null && I.live)
          return this.startPosition = -1, this.setStartPosition(I, 0), this.resetLoadingState(), !0;
        this.nextLoadPosition = this.startPosition;
      }
      return !1;
    }, _.updateLevelTiming = function(L, I, O, x) {
      var P = this, M = O.details;
      console.assert(!!M, "level.details must be defined"), Object.keys(L.elementaryStreams).reduce(function(F, N) {
        var U = L.elementaryStreams[N];
        if (U) {
          var G = U.endPTS - U.startPTS;
          if (G <= 0)
            return P.warn("Could not parse fragment " + L.sn + " " + N + " duration reliably (" + G + ") resetting transmuxer to fallback to playlist timing"), P.resetTransmuxer(), F || !1;
          var j = x ? 0 : Object(v.updateFragPTSDTS)(M, L, U.startPTS, U.endPTS, U.startDTS, U.endDTS);
          return P.hls.trigger(D.Events.LEVEL_PTS_UPDATED, { details: M, level: O, drift: j, type: N, frag: L, start: U.startPTS, end: U.endPTS }), !0;
        }
        return F;
      }, !1) ? (this.state = i.PARSED, this.hls.trigger(D.Events.FRAG_PARSED, { frag: L, part: I })) : this.resetLoadingState();
    }, _.resetTransmuxer = function() {
      this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null);
    }, t = u, (o = [{ key: "state", get: function() {
      return this._state;
    }, set: function(L) {
      var I = this._state;
      I !== L && (this._state = L, this.log(I + "->" + L));
    } }]) && r(t.prototype, o), b && r(t, b), u;
  }(S.default);
}, "./src/controller/buffer-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return E;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/events.ts"), A = f("./src/utils/logger.ts"), k = f("./src/errors.ts"), C = f("./src/utils/buffer-helper.ts"), D = f("./src/utils/mediasource-helper.ts"), d = f("./src/loader/fragment.ts"), T = f("./src/controller/buffer-operation-queue.ts"), p = Object(D.getMediaSource)(), m = /([ha]vc.)(?:\.[^.,]+)+/, E = function() {
    function v(e) {
      var s = this;
      this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.appendError = 0, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this._onMediaSourceOpen = function() {
        var n = s.hls, r = s.media, a = s.mediaSource;
        A.logger.log("[buffer-controller]: Media source opened"), r && (s.updateMediaElementDuration(), n.trigger(S.Events.MEDIA_ATTACHED, { media: r })), a && a.removeEventListener("sourceopen", s._onMediaSourceOpen), s.checkPendingTracks();
      }, this._onMediaSourceClose = function() {
        A.logger.log("[buffer-controller]: Media source closed");
      }, this._onMediaSourceEnded = function() {
        A.logger.log("[buffer-controller]: Media source ended");
      }, this.hls = e, this._initSourceBuffer(), this.registerListeners();
    }
    var l = v.prototype;
    return l.hasSourceTypes = function() {
      return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
    }, l.destroy = function() {
      this.unregisterListeners(), this.details = null;
    }, l.registerListeners = function() {
      var e = this.hls;
      e.on(S.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(S.Events.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(S.Events.MANIFEST_PARSED, this.onManifestParsed, this), e.on(S.Events.BUFFER_RESET, this.onBufferReset, this), e.on(S.Events.BUFFER_APPENDING, this.onBufferAppending, this), e.on(S.Events.BUFFER_CODECS, this.onBufferCodecs, this), e.on(S.Events.BUFFER_EOS, this.onBufferEos, this), e.on(S.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(S.Events.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(S.Events.FRAG_PARSED, this.onFragParsed, this), e.on(S.Events.FRAG_CHANGED, this.onFragChanged, this);
    }, l.unregisterListeners = function() {
      var e = this.hls;
      e.off(S.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(S.Events.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(S.Events.MANIFEST_PARSED, this.onManifestParsed, this), e.off(S.Events.BUFFER_RESET, this.onBufferReset, this), e.off(S.Events.BUFFER_APPENDING, this.onBufferAppending, this), e.off(S.Events.BUFFER_CODECS, this.onBufferCodecs, this), e.off(S.Events.BUFFER_EOS, this.onBufferEos, this), e.off(S.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(S.Events.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(S.Events.FRAG_PARSED, this.onFragParsed, this), e.off(S.Events.FRAG_CHANGED, this.onFragChanged, this);
    }, l._initSourceBuffer = function() {
      this.sourceBuffer = {}, this.operationQueue = new T.default(this.sourceBuffer), this.listeners = { audio: [], video: [], audiovideo: [] };
    }, l.onManifestParsed = function(e, s) {
      var n = 2;
      (s.audio && !s.video || !s.altAudio) && (n = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = n, this.details = null, A.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
    }, l.onMediaAttaching = function(e, s) {
      var n = this.media = s.media;
      if (n && p) {
        var r = this.mediaSource = new p();
        r.addEventListener("sourceopen", this._onMediaSourceOpen), r.addEventListener("sourceended", this._onMediaSourceEnded), r.addEventListener("sourceclose", this._onMediaSourceClose), n.src = self.URL.createObjectURL(r), this._objectUrl = n.src;
      }
    }, l.onMediaDetaching = function() {
      var e = this.media, s = this.mediaSource, n = this._objectUrl;
      if (s) {
        if (A.logger.log("[buffer-controller]: media source detaching"), s.readyState === "open")
          try {
            s.endOfStream();
          } catch (r) {
            A.logger.warn("[buffer-controller]: onMediaDetaching: " + r.message + " while calling endOfStream");
          }
        this.onBufferReset(), s.removeEventListener("sourceopen", this._onMediaSourceOpen), s.removeEventListener("sourceended", this._onMediaSourceEnded), s.removeEventListener("sourceclose", this._onMediaSourceClose), e && (n && self.URL.revokeObjectURL(n), e.src === n ? (e.removeAttribute("src"), e.load()) : A.logger.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {};
      }
      this.hls.trigger(S.Events.MEDIA_DETACHED, void 0);
    }, l.onBufferReset = function() {
      var e = this;
      this.getSourceBufferTypes().forEach(function(s) {
        var n = e.sourceBuffer[s];
        try {
          n && (e.removeBufferListeners(s), e.mediaSource && e.mediaSource.removeSourceBuffer(n), e.sourceBuffer[s] = void 0);
        } catch (r) {
          A.logger.warn("[buffer-controller]: Failed to reset the " + s + " buffer", r);
        }
      }), this._initSourceBuffer();
    }, l.onBufferCodecs = function(e, s) {
      var n = this, r = this.getSourceBufferTypes().length;
      Object.keys(s).forEach(function(a) {
        if (r) {
          var i = n.tracks[a];
          if (i && typeof i.buffer.changeType == "function") {
            var h = s[a], g = h.codec, c = h.levelCodec, y = h.container;
            if ((i.levelCodec || i.codec).replace(m, "$1") !== (c || g).replace(m, "$1")) {
              var u = y + ";codecs=" + (c || g);
              n.appendChangeType(a, u);
            }
          }
        } else
          n.pendingTracks[a] = s[a];
      }), r || (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), this.mediaSource && this.mediaSource.readyState === "open" && this.checkPendingTracks());
    }, l.appendChangeType = function(e, s) {
      var n = this, r = this.operationQueue, a = { execute: function() {
        var i = n.sourceBuffer[e];
        i && (A.logger.log("[buffer-controller]: changing " + e + " sourceBuffer type to " + s), i.changeType(s)), r.shiftAndExecuteNext(e);
      }, onStart: function() {
      }, onComplete: function() {
      }, onError: function(i) {
        A.logger.warn("[buffer-controller]: Failed to change " + e + " SourceBuffer type", i);
      } };
      r.append(a, e);
    }, l.onBufferAppending = function(e, s) {
      var n = this, r = this.hls, a = this.operationQueue, i = this.tracks, h = s.data, g = s.type, c = s.frag, y = s.part, u = s.chunkMeta, t = u.buffering[g], o = self.performance.now();
      t.start = o;
      var b = c.stats.buffering, _ = y ? y.stats.buffering : null;
      b.start === 0 && (b.start = o), _ && _.start === 0 && (_.start = o);
      var L = i.audio, I = g === "audio" && u.id === 1 && (L == null ? void 0 : L.container) === "audio/mpeg", O = { execute: function() {
        if (t.executeStart = self.performance.now(), I) {
          var x = n.sourceBuffer[g];
          if (x) {
            var P = c.start - x.timestampOffset;
            Math.abs(P) >= 0.1 && (A.logger.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + c.start + " (delta: " + P + ") sn: " + c.sn + ")"), x.timestampOffset = c.start);
          }
        }
        n.appendExecutor(h, g);
      }, onStart: function() {
      }, onComplete: function() {
        var x = self.performance.now();
        t.executeEnd = t.end = x, b.first === 0 && (b.first = x), _ && _.first === 0 && (_.first = x);
        var P = n.sourceBuffer, M = {};
        for (var F in P)
          M[F] = C.BufferHelper.getBuffered(P[F]);
        n.appendError = 0, n.hls.trigger(S.Events.BUFFER_APPENDED, { type: g, frag: c, part: y, chunkMeta: u, parent: c.type, timeRanges: M });
      }, onError: function(x) {
        A.logger.error("[buffer-controller]: Error encountered while trying to append to the " + g + " SourceBuffer", x);
        var P = { type: k.ErrorTypes.MEDIA_ERROR, parent: c.type, details: k.ErrorDetails.BUFFER_APPEND_ERROR, err: x, fatal: !1 };
        x.code === DOMException.QUOTA_EXCEEDED_ERR ? P.details = k.ErrorDetails.BUFFER_FULL_ERROR : (n.appendError++, P.details = k.ErrorDetails.BUFFER_APPEND_ERROR, n.appendError > r.config.appendErrorMaxRetry && (A.logger.error("[buffer-controller]: Failed " + r.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), P.fatal = !0)), r.trigger(S.Events.ERROR, P);
      } };
      a.append(O, g);
    }, l.onBufferFlushing = function(e, s) {
      var n = this, r = this.operationQueue, a = function(i) {
        return { execute: n.removeExecutor.bind(n, i, s.startOffset, s.endOffset), onStart: function() {
        }, onComplete: function() {
          n.hls.trigger(S.Events.BUFFER_FLUSHED, { type: i });
        }, onError: function(h) {
          A.logger.warn("[buffer-controller]: Failed to remove from " + i + " SourceBuffer", h);
        } };
      };
      s.type ? r.append(a(s.type), s.type) : this.getSourceBufferTypes().forEach(function(i) {
        r.append(a(i), i);
      });
    }, l.onFragParsed = function(e, s) {
      var n = this, r = s.frag, a = s.part, i = [], h = a ? a.elementaryStreams : r.elementaryStreams;
      h[d.ElementaryStreamTypes.AUDIOVIDEO] ? i.push("audiovideo") : (h[d.ElementaryStreamTypes.AUDIO] && i.push("audio"), h[d.ElementaryStreamTypes.VIDEO] && i.push("video")), i.length === 0 && A.logger.warn("Fragments must have at least one ElementaryStreamType set. type: " + r.type + " level: " + r.level + " sn: " + r.sn), this.blockBuffers(function() {
        var g = self.performance.now();
        r.stats.buffering.end = g, a && (a.stats.buffering.end = g);
        var c = a ? a.stats : r.stats;
        n.hls.trigger(S.Events.FRAG_BUFFERED, { frag: r, part: a, stats: c, id: r.type });
      }, i);
    }, l.onFragChanged = function(e, s) {
      this.flushBackBuffer();
    }, l.onBufferEos = function(e, s) {
      var n = this;
      this.getSourceBufferTypes().reduce(function(r, a) {
        var i = n.sourceBuffer[a];
        return s.type && s.type !== a || i && !i.ended && (i.ended = !0, A.logger.log("[buffer-controller]: " + a + " sourceBuffer now EOS")), r && !(i && !i.ended);
      }, !0) && this.blockBuffers(function() {
        var r = n.mediaSource;
        r && r.readyState === "open" && r.endOfStream();
      });
    }, l.onLevelUpdated = function(e, s) {
      var n = s.details;
      n.fragments.length && (this.details = n, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration());
    }, l.flushBackBuffer = function() {
      var e = this.hls, s = this.details, n = this.media, r = this.sourceBuffer;
      if (n && s !== null) {
        var a = this.getSourceBufferTypes();
        if (a.length) {
          var i = s.live && e.config.liveBackBufferLength !== null ? e.config.liveBackBufferLength : e.config.backBufferLength;
          if (Object(R.isFiniteNumber)(i) && !(i < 0)) {
            var h = n.currentTime, g = s.levelTargetDuration, c = Math.max(i, g), y = Math.floor(h / g) * g - c;
            a.forEach(function(u) {
              var t = r[u];
              if (t) {
                var o = C.BufferHelper.getBuffered(t);
                o.length > 0 && y > o.start(0) && (e.trigger(S.Events.BACK_BUFFER_REACHED, { bufferEnd: y }), s.live && e.trigger(S.Events.LIVE_BACK_BUFFER_REACHED, { bufferEnd: y }), e.trigger(S.Events.BUFFER_FLUSHING, { startOffset: 0, endOffset: y, type: u }));
              }
            });
          }
        }
      }
    }, l.updateMediaElementDuration = function() {
      if (this.details && this.media && this.mediaSource && this.mediaSource.readyState === "open") {
        var e = this.details, s = this.hls, n = this.media, r = this.mediaSource, a = e.fragments[0].start + e.totalduration, i = n.duration, h = Object(R.isFiniteNumber)(r.duration) ? r.duration : 0;
        e.live && s.config.liveDurationInfinity ? (A.logger.log("[buffer-controller]: Media Source duration is set to Infinity"), r.duration = 1 / 0, this.updateSeekableRange(e)) : (a > h && a > i || !Object(R.isFiniteNumber)(i)) && (A.logger.log("[buffer-controller]: Updating Media Source duration to " + a.toFixed(3)), r.duration = a);
      }
    }, l.updateSeekableRange = function(e) {
      var s = this.mediaSource, n = e.fragments;
      if (n.length && e.live && s != null && s.setLiveSeekableRange) {
        var r = Math.max(0, n[0].start), a = Math.max(r, r + e.totalduration);
        s.setLiveSeekableRange(r, a);
      }
    }, l.checkPendingTracks = function() {
      var e = this.bufferCodecEventsExpected, s = this.operationQueue, n = this.pendingTracks, r = Object.keys(n).length;
      if (r && !e || r === 2) {
        this.createSourceBuffers(n), this.pendingTracks = {};
        var a = this.getSourceBufferTypes();
        if (a.length === 0)
          return void this.hls.trigger(S.Events.ERROR, { type: k.ErrorTypes.MEDIA_ERROR, details: k.ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR, fatal: !0, reason: "could not create source buffer for media codec(s)" });
        a.forEach(function(i) {
          s.executeNext(i);
        });
      }
    }, l.createSourceBuffers = function(e) {
      var s = this.sourceBuffer, n = this.mediaSource;
      if (!n)
        throw Error("createSourceBuffers called when mediaSource was null");
      var r = 0;
      for (var a in e)
        if (!s[a]) {
          var i = e[a];
          if (!i)
            throw Error("source buffer exists for track " + a + ", however track does not");
          var h = i.levelCodec || i.codec, g = i.container + ";codecs=" + h;
          A.logger.log("[buffer-controller]: creating sourceBuffer(" + g + ")");
          try {
            var c = s[a] = n.addSourceBuffer(g), y = a;
            this.addBufferListener(y, "updatestart", this._onSBUpdateStart), this.addBufferListener(y, "updateend", this._onSBUpdateEnd), this.addBufferListener(y, "error", this._onSBUpdateError), this.tracks[a] = { buffer: c, codec: h, container: i.container, levelCodec: i.levelCodec, id: i.id }, r++;
          } catch (u) {
            A.logger.error("[buffer-controller]: error while trying to add sourceBuffer: " + u.message), this.hls.trigger(S.Events.ERROR, { type: k.ErrorTypes.MEDIA_ERROR, details: k.ErrorDetails.BUFFER_ADD_CODEC_ERROR, fatal: !1, error: u, mimeType: g });
          }
        }
      r && this.hls.trigger(S.Events.BUFFER_CREATED, { tracks: this.tracks });
    }, l._onSBUpdateStart = function(e) {
      this.operationQueue.current(e).onStart();
    }, l._onSBUpdateEnd = function(e) {
      var s = this.operationQueue;
      s.current(e).onComplete(), s.shiftAndExecuteNext(e);
    }, l._onSBUpdateError = function(e, s) {
      A.logger.error("[buffer-controller]: " + e + " SourceBuffer error", s), this.hls.trigger(S.Events.ERROR, { type: k.ErrorTypes.MEDIA_ERROR, details: k.ErrorDetails.BUFFER_APPENDING_ERROR, fatal: !1 });
      var n = this.operationQueue.current(e);
      n && n.onError(s);
    }, l.removeExecutor = function(e, s, n) {
      var r = this.media, a = this.mediaSource, i = this.operationQueue, h = this.sourceBuffer[e];
      if (!r || !a || !h)
        return A.logger.warn("[buffer-controller]: Attempting to remove from the " + e + " SourceBuffer, but it does not exist"), void i.shiftAndExecuteNext(e);
      var g = Object(R.isFiniteNumber)(r.duration) ? r.duration : 1 / 0, c = Object(R.isFiniteNumber)(a.duration) ? a.duration : 1 / 0, y = Math.max(0, s), u = Math.min(n, g, c);
      u > y ? (A.logger.log("[buffer-controller]: Removing [" + y + "," + u + "] from the " + e + " SourceBuffer"), console.assert(!h.updating, e + " sourceBuffer must not be updating"), h.remove(y, u)) : i.shiftAndExecuteNext(e);
    }, l.appendExecutor = function(e, s) {
      var n = this.operationQueue, r = this.sourceBuffer[s];
      if (!r)
        return A.logger.warn("[buffer-controller]: Attempting to append to the " + s + " SourceBuffer, but it does not exist"), void n.shiftAndExecuteNext(s);
      r.ended = !1, console.assert(!r.updating, s + " sourceBuffer must not be updating"), r.appendBuffer(e);
    }, l.blockBuffers = function(e, s) {
      var n = this;
      if (s === void 0 && (s = this.getSourceBufferTypes()), !s.length)
        return A.logger.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"), void Promise.resolve(e);
      var r = this.operationQueue, a = s.map(function(i) {
        return r.appendBlocker(i);
      });
      Promise.all(a).then(function() {
        e(), s.forEach(function(i) {
          var h = n.sourceBuffer[i];
          h && h.updating || r.shiftAndExecuteNext(i);
        });
      });
    }, l.getSourceBufferTypes = function() {
      return Object.keys(this.sourceBuffer);
    }, l.addBufferListener = function(e, s, n) {
      var r = this.sourceBuffer[e];
      if (r) {
        var a = n.bind(this, e);
        this.listeners[e].push({ event: s, listener: a }), r.addEventListener(s, a);
      }
    }, l.removeBufferListeners = function(e) {
      var s = this.sourceBuffer[e];
      s && this.listeners[e].forEach(function(n) {
        s.removeEventListener(n.event, n.listener);
      });
    }, v;
  }();
}, "./src/controller/buffer-operation-queue.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return S;
  });
  var R = f("./src/utils/logger.ts"), S = function() {
    function A(C) {
      this.buffers = void 0, this.queues = { video: [], audio: [], audiovideo: [] }, this.buffers = C;
    }
    var k = A.prototype;
    return k.append = function(C, D) {
      var d = this.queues[D];
      d.push(C), d.length === 1 && this.buffers[D] && this.executeNext(D);
    }, k.insertAbort = function(C, D) {
      this.queues[D].unshift(C), this.executeNext(D);
    }, k.appendBlocker = function(C) {
      var D, d = new Promise(function(p) {
        D = p;
      }), T = { execute: D, onStart: function() {
      }, onComplete: function() {
      }, onError: function() {
      } };
      return this.append(T, C), d;
    }, k.executeNext = function(C) {
      var D = this.buffers, d = this.queues, T = D[C], p = d[C];
      if (p.length) {
        var m = p[0];
        try {
          m.execute();
        } catch (E) {
          R.logger.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"), m.onError(E), T && T.updating || (p.shift(), this.executeNext(C));
        }
      }
    }, k.shiftAndExecuteNext = function(C) {
      this.queues[C].shift(), this.executeNext(C);
    }, k.current = function(C) {
      return this.queues[C][0];
    }, A;
  }();
}, "./src/controller/cap-level-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/events.ts");
  function S(k, C) {
    for (var D = 0; D < C.length; D++) {
      var d = C[D];
      d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(k, d.key, d);
    }
  }
  var A = function() {
    function k(p) {
      this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.hls = void 0, this.streamController = void 0, this.clientRect = void 0, this.hls = p, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners();
    }
    var C, D, d, T = k.prototype;
    return T.setStreamController = function(p) {
      this.streamController = p;
    }, T.destroy = function() {
      this.unregisterListener(), this.hls.config.capLevelToPlayerSize && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null;
    }, T.registerListeners = function() {
      var p = this.hls;
      p.on(R.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), p.on(R.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), p.on(R.Events.MANIFEST_PARSED, this.onManifestParsed, this), p.on(R.Events.BUFFER_CODECS, this.onBufferCodecs, this), p.on(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
    }, T.unregisterListener = function() {
      var p = this.hls;
      p.off(R.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), p.off(R.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), p.off(R.Events.MANIFEST_PARSED, this.onManifestParsed, this), p.off(R.Events.BUFFER_CODECS, this.onBufferCodecs, this), p.off(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
    }, T.onFpsDropLevelCapping = function(p, m) {
      k.isLevelAllowed(m.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(m.droppedLevel);
    }, T.onMediaAttaching = function(p, m) {
      this.media = m.media instanceof HTMLVideoElement ? m.media : null;
    }, T.onManifestParsed = function(p, m) {
      var E = this.hls;
      this.restrictedLevels = [], this.firstLevel = m.firstLevel, E.config.capLevelToPlayerSize && m.video && this.startCapping();
    }, T.onBufferCodecs = function(p, m) {
      this.hls.config.capLevelToPlayerSize && m.video && this.startCapping();
    }, T.onMediaDetaching = function() {
      this.stopCapping();
    }, T.detectPlayerSize = function() {
      if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
        var p = this.hls.levels;
        if (p.length) {
          var m = this.hls;
          m.autoLevelCapping = this.getMaxLevel(p.length - 1), m.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = m.autoLevelCapping;
        }
      }
    }, T.getMaxLevel = function(p) {
      var m = this, E = this.hls.levels;
      if (!E.length)
        return -1;
      var v = E.filter(function(l, e) {
        return k.isLevelAllowed(e, m.restrictedLevels) && e <= p;
      });
      return this.clientRect = null, k.getMaxLevelByMediaSize(v, this.mediaWidth, this.mediaHeight);
    }, T.startCapping = function() {
      this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize());
    }, T.stopCapping = function() {
      this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0);
    }, T.getDimensions = function() {
      if (this.clientRect)
        return this.clientRect;
      var p = this.media, m = { width: 0, height: 0 };
      if (p) {
        var E = p.getBoundingClientRect();
        m.width = E.width, m.height = E.height, m.width || m.height || (m.width = E.right - E.left || p.width || 0, m.height = E.bottom - E.top || p.height || 0);
      }
      return this.clientRect = m, m;
    }, k.isLevelAllowed = function(p, m) {
      return m === void 0 && (m = []), m.indexOf(p) === -1;
    }, k.getMaxLevelByMediaSize = function(p, m, E) {
      if (!p || !p.length)
        return -1;
      for (var v, l, e = p.length - 1, s = 0; s < p.length; s += 1) {
        var n = p[s];
        if ((n.width >= m || n.height >= E) && (v = n, !(l = p[s + 1]) || v.width !== l.width || v.height !== l.height)) {
          e = s;
          break;
        }
      }
      return e;
    }, C = k, d = [{ key: "contentScaleFactor", get: function() {
      var p = 1;
      try {
        p = self.devicePixelRatio;
      } catch {
      }
      return p;
    } }], (D = [{ key: "mediaWidth", get: function() {
      return this.getDimensions().width * k.contentScaleFactor;
    } }, { key: "mediaHeight", get: function() {
      return this.getDimensions().height * k.contentScaleFactor;
    } }]) && S(C.prototype, D), d && S(C, d), k;
  }();
  w.default = A;
}, "./src/controller/eme-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/events.ts"), S = f("./src/errors.ts"), A = f("./src/utils/logger.ts"), k = f("./src/utils/mediakeys-helper.ts");
  function C(d, T) {
    for (var p = 0; p < T.length; p++) {
      var m = T[p];
      m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(d, m.key, m);
    }
  }
  var D = function() {
    function d(v) {
      this.hls = void 0, this._widevineLicenseUrl = void 0, this._licenseXhrSetup = void 0, this._licenseResponseCallback = void 0, this._emeEnabled = void 0, this._requestMediaKeySystemAccess = void 0, this._drmSystemOptions = void 0, this._config = void 0, this._mediaKeysList = [], this._media = null, this._hasSetMediaKeys = !1, this._requestLicenseFailureCount = 0, this.mediaKeysPromise = null, this._onMediaEncrypted = this.onMediaEncrypted.bind(this), this.hls = v, this._config = v.config, this._widevineLicenseUrl = this._config.widevineLicenseUrl, this._licenseXhrSetup = this._config.licenseXhrSetup, this._licenseResponseCallback = this._config.licenseResponseCallback, this._emeEnabled = this._config.emeEnabled, this._requestMediaKeySystemAccess = this._config.requestMediaKeySystemAccessFunc, this._drmSystemOptions = this._config.drmSystemOptions, this._registerListeners();
    }
    var T, p, m, E = d.prototype;
    return E.destroy = function() {
      this._unregisterListeners(), this.hls = this._onMediaEncrypted = null, this._requestMediaKeySystemAccess = null;
    }, E._registerListeners = function() {
      this.hls.on(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(R.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(R.Events.MANIFEST_PARSED, this.onManifestParsed, this);
    }, E._unregisterListeners = function() {
      this.hls.off(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(R.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(R.Events.MANIFEST_PARSED, this.onManifestParsed, this);
    }, E.getLicenseServerUrl = function(v) {
      switch (v) {
        case k.KeySystems.WIDEVINE:
          if (!this._widevineLicenseUrl)
            break;
          return this._widevineLicenseUrl;
      }
      throw new Error('no license server URL configured for key-system "' + v + '"');
    }, E._attemptKeySystemAccess = function(v, l, e) {
      var s = this, n = function(a, i, h, g) {
        switch (a) {
          case k.KeySystems.WIDEVINE:
            return function(c, y, u) {
              var t = { audioCapabilities: [], videoCapabilities: [] };
              return c.forEach(function(o) {
                t.audioCapabilities.push({ contentType: 'audio/mp4; codecs="' + o + '"', robustness: u.audioRobustness || "" });
              }), y.forEach(function(o) {
                t.videoCapabilities.push({ contentType: 'video/mp4; codecs="' + o + '"', robustness: u.videoRobustness || "" });
              }), [t];
            }(i, h, g);
          default:
            throw new Error("Unknown key-system: " + a);
        }
      }(v, l, e, this._drmSystemOptions);
      A.logger.log("Requesting encrypted media key-system access");
      var r = this.requestMediaKeySystemAccess(v, n);
      this.mediaKeysPromise = r.then(function(a) {
        return s._onMediaKeySystemAccessObtained(v, a);
      }), r.catch(function(a) {
        A.logger.error('Failed to obtain key-system "' + v + '" access:', a);
      });
    }, E._onMediaKeySystemAccessObtained = function(v, l) {
      var e = this;
      A.logger.log('Access for key-system "' + v + '" obtained');
      var s = { mediaKeysSessionInitialized: !1, mediaKeySystemAccess: l, mediaKeySystemDomain: v };
      this._mediaKeysList.push(s);
      var n = Promise.resolve().then(function() {
        return l.createMediaKeys();
      }).then(function(r) {
        return s.mediaKeys = r, A.logger.log('Media-keys created for key-system "' + v + '"'), e._onMediaKeysCreated(), r;
      });
      return n.catch(function(r) {
        A.logger.error("Failed to create media-keys:", r);
      }), n;
    }, E._onMediaKeysCreated = function() {
      var v = this;
      this._mediaKeysList.forEach(function(l) {
        l.mediaKeysSession || (l.mediaKeysSession = l.mediaKeys.createSession(), v._onNewMediaKeySession(l.mediaKeysSession));
      });
    }, E._onNewMediaKeySession = function(v) {
      var l = this;
      A.logger.log("New key-system session " + v.sessionId), v.addEventListener("message", function(e) {
        l._onKeySessionMessage(v, e.message);
      }, !1);
    }, E._onKeySessionMessage = function(v, l) {
      A.logger.log("Got EME message event, creating license request"), this._requestLicense(l, function(e) {
        A.logger.log("Received license data (length: " + (e && e.byteLength) + "), updating key-session"), v.update(e);
      });
    }, E.onMediaEncrypted = function(v) {
      var l = this;
      if (A.logger.log('Media is encrypted using "' + v.initDataType + '" init data type'), !this.mediaKeysPromise)
        return A.logger.error("Fatal: Media is encrypted but no CDM access or no keys have been requested"), void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_KEYS, fatal: !0 });
      var e = function(s) {
        l._media && (l._attemptSetMediaKeys(s), l._generateRequestWithPreferredKeySession(v.initDataType, v.initData));
      };
      this.mediaKeysPromise.then(e).catch(e);
    }, E._attemptSetMediaKeys = function(v) {
      if (!this._media)
        throw new Error("Attempted to set mediaKeys without first attaching a media element");
      if (!this._hasSetMediaKeys) {
        var l = this._mediaKeysList[0];
        if (!l || !l.mediaKeys)
          return A.logger.error("Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"), void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_KEYS, fatal: !0 });
        A.logger.log("Setting keys for encrypted media"), this._media.setMediaKeys(l.mediaKeys), this._hasSetMediaKeys = !0;
      }
    }, E._generateRequestWithPreferredKeySession = function(v, l) {
      var e = this, s = this._mediaKeysList[0];
      if (!s)
        return A.logger.error("Fatal: Media is encrypted but not any key-system access has been obtained yet"), void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_ACCESS, fatal: !0 });
      if (s.mediaKeysSessionInitialized)
        A.logger.warn("Key-Session already initialized but requested again");
      else {
        var n = s.mediaKeysSession;
        if (!n)
          return A.logger.error("Fatal: Media is encrypted but no key-session existing"), void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_SESSION, fatal: !0 });
        if (!l)
          return A.logger.warn("Fatal: initData required for generating a key session is null"), void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_INIT_DATA, fatal: !0 });
        A.logger.log('Generating key-session request for "' + v + '" init data type'), s.mediaKeysSessionInitialized = !0, n.generateRequest(v, l).then(function() {
          A.logger.debug("Key-session generation succeeded");
        }).catch(function(r) {
          A.logger.error("Error generating key-session request:", r), e.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_SESSION, fatal: !1 });
        });
      }
    }, E._createLicenseXhr = function(v, l, e) {
      var s = new XMLHttpRequest();
      s.responseType = "arraybuffer", s.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, s, v, l, e);
      var n = this._licenseXhrSetup;
      if (n)
        try {
          n.call(this.hls, s, v), n = void 0;
        } catch (r) {
          A.logger.error(r);
        }
      try {
        s.readyState || s.open("POST", v, !0), n && n.call(this.hls, s, v);
      } catch (r) {
        throw new Error("issue setting up KeySystem license XHR " + r);
      }
      return s;
    }, E._onLicenseRequestReadyStageChange = function(v, l, e, s) {
      switch (v.readyState) {
        case 4:
          if (v.status === 200) {
            this._requestLicenseFailureCount = 0, A.logger.log("License request succeeded");
            var n = v.response, r = this._licenseResponseCallback;
            if (r)
              try {
                n = r.call(this.hls, v, l);
              } catch (i) {
                A.logger.error(i);
              }
            s(n);
          } else {
            if (A.logger.error("License Request XHR failed (" + l + "). Status: " + v.status + " (" + v.statusText + ")"), this._requestLicenseFailureCount++, this._requestLicenseFailureCount > 3)
              return void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED, fatal: !0 });
            var a = 3 - this._requestLicenseFailureCount + 1;
            A.logger.warn("Retrying license request, " + a + " attempts left"), this._requestLicense(e, s);
          }
      }
    }, E._generateLicenseRequestChallenge = function(v, l) {
      switch (v.mediaKeySystemDomain) {
        case k.KeySystems.WIDEVINE:
          return l;
      }
      throw new Error("unsupported key-system: " + v.mediaKeySystemDomain);
    }, E._requestLicense = function(v, l) {
      A.logger.log("Requesting content license for key-system");
      var e = this._mediaKeysList[0];
      if (!e)
        return A.logger.error("Fatal error: Media is encrypted but no key-system access has been obtained yet"), void this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_NO_ACCESS, fatal: !0 });
      try {
        var s = this.getLicenseServerUrl(e.mediaKeySystemDomain), n = this._createLicenseXhr(s, v, l);
        A.logger.log("Sending license request to URL: " + s);
        var r = this._generateLicenseRequestChallenge(e, v);
        n.send(r);
      } catch (a) {
        A.logger.error("Failure requesting DRM license: " + a), this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.KEY_SYSTEM_ERROR, details: S.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED, fatal: !0 });
      }
    }, E.onMediaAttached = function(v, l) {
      if (this._emeEnabled) {
        var e = l.media;
        this._media = e, e.addEventListener("encrypted", this._onMediaEncrypted);
      }
    }, E.onMediaDetached = function() {
      var v = this._media, l = this._mediaKeysList;
      v && (v.removeEventListener("encrypted", this._onMediaEncrypted), this._media = null, this._mediaKeysList = [], Promise.all(l.map(function(e) {
        if (e.mediaKeysSession)
          return e.mediaKeysSession.close().catch(function() {
          });
      })).then(function() {
        return v.setMediaKeys(null);
      }).catch(function() {
      }));
    }, E.onManifestParsed = function(v, l) {
      if (this._emeEnabled) {
        var e = l.levels.map(function(n) {
          return n.audioCodec;
        }).filter(function(n) {
          return !!n;
        }), s = l.levels.map(function(n) {
          return n.videoCodec;
        }).filter(function(n) {
          return !!n;
        });
        this._attemptKeySystemAccess(k.KeySystems.WIDEVINE, e, s);
      }
    }, T = d, (p = [{ key: "requestMediaKeySystemAccess", get: function() {
      if (!this._requestMediaKeySystemAccess)
        throw new Error("No requestMediaKeySystemAccess function configured");
      return this._requestMediaKeySystemAccess;
    } }]) && C(T.prototype, p), m && C(T, m), d;
  }();
  w.default = D;
}, "./src/controller/fps-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/events.ts"), S = f("./src/utils/logger.ts"), A = function() {
    function k(D) {
      this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = D, this.registerListeners();
    }
    var C = k.prototype;
    return C.setStreamController = function(D) {
      this.streamController = D;
    }, C.registerListeners = function() {
      this.hls.on(R.Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
    }, C.unregisterListeners = function() {
      this.hls.off(R.Events.MEDIA_ATTACHING, this.onMediaAttaching);
    }, C.destroy = function() {
      this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null;
    }, C.onMediaAttaching = function(D, d) {
      var T = this.hls.config;
      if (T.capLevelOnFPSDrop) {
        var p = d.media instanceof self.HTMLVideoElement ? d.media : null;
        this.media = p, p && typeof p.getVideoPlaybackQuality == "function" && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), T.fpsDroppedMonitoringPeriod);
      }
    }, C.checkFPS = function(D, d, T) {
      var p = performance.now();
      if (d) {
        if (this.lastTime) {
          var m = p - this.lastTime, E = T - this.lastDroppedFrames, v = d - this.lastDecodedFrames, l = 1e3 * E / m, e = this.hls;
          if (e.trigger(R.Events.FPS_DROP, { currentDropped: E, currentDecoded: v, totalDroppedFrames: T }), l > 0 && E > e.config.fpsDroppedMonitoringThreshold * v) {
            var s = e.currentLevel;
            S.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + s), s > 0 && (e.autoLevelCapping === -1 || e.autoLevelCapping >= s) && (s -= 1, e.trigger(R.Events.FPS_DROP_LEVEL_CAPPING, { level: s, droppedLevel: e.currentLevel }), e.autoLevelCapping = s, this.streamController.nextLevelSwitch());
          }
        }
        this.lastTime = p, this.lastDroppedFrames = T, this.lastDecodedFrames = d;
      }
    }, C.checkFPSInterval = function() {
      var D = this.media;
      if (D)
        if (this.isVideoPlaybackQualityAvailable) {
          var d = D.getVideoPlaybackQuality();
          this.checkFPS(D, d.totalVideoFrames, d.droppedVideoFrames);
        } else
          this.checkFPS(D, D.webkitDecodedFrameCount, D.webkitDroppedFrameCount);
    }, k;
  }();
  w.default = A;
}, "./src/controller/fragment-finders.ts": function(B, w, f) {
  f.r(w), f.d(w, "findFragmentByPDT", function() {
    return A;
  }), f.d(w, "findFragmentByPTS", function() {
    return k;
  }), f.d(w, "fragmentWithinToleranceTest", function() {
    return C;
  }), f.d(w, "pdtWithinToleranceTest", function() {
    return D;
  }), f.d(w, "findFragWithCC", function() {
    return d;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/utils/binary-search.ts");
  function A(T, p, m) {
    if (p === null || !Array.isArray(T) || !T.length || !Object(R.isFiniteNumber)(p) || p < (T[0].programDateTime || 0) || p >= (T[T.length - 1].endProgramDateTime || 0))
      return null;
    m = m || 0;
    for (var E = 0; E < T.length; ++E) {
      var v = T[E];
      if (D(p, m, v))
        return v;
    }
    return null;
  }
  function k(T, p, m, E) {
    m === void 0 && (m = 0), E === void 0 && (E = 0);
    var v = null;
    if (T ? v = p[T.sn - p[0].sn + 1] || null : m === 0 && p[0].start === 0 && (v = p[0]), v && C(m, E, v) === 0)
      return v;
    var l = S.default.search(p, C.bind(null, m, E));
    return l || v;
  }
  function C(T, p, m) {
    T === void 0 && (T = 0), p === void 0 && (p = 0);
    var E = Math.min(p, m.duration + (m.deltaPTS ? m.deltaPTS : 0));
    return m.start + m.duration - E <= T ? 1 : m.start - E > T && m.start ? -1 : 0;
  }
  function D(T, p, m) {
    var E = 1e3 * Math.min(p, m.duration + (m.deltaPTS ? m.deltaPTS : 0));
    return (m.endProgramDateTime || 0) - E > T;
  }
  function d(T, p) {
    return S.default.search(T, function(m) {
      return m.cc < p ? 1 : m.cc > p ? -1 : 0;
    });
  }
}, "./src/controller/fragment-tracker.ts": function(B, w, f) {
  f.r(w), f.d(w, "FragmentState", function() {
    return R;
  }), f.d(w, "FragmentTracker", function() {
    return C;
  });
  var R, S, A = f("./src/events.ts"), k = f("./src/types/loader.ts");
  (S = R || (R = {})).NOT_LOADED = "NOT_LOADED", S.BACKTRACKED = "BACKTRACKED", S.APPENDING = "APPENDING", S.PARTIAL = "PARTIAL", S.OK = "OK";
  var C = function() {
    function T(m) {
      this.activeFragment = null, this.activeParts = null, this.fragments = /* @__PURE__ */ Object.create(null), this.timeRanges = /* @__PURE__ */ Object.create(null), this.bufferPadding = 0.2, this.hls = void 0, this.hls = m, this._registerListeners();
    }
    var p = T.prototype;
    return p._registerListeners = function() {
      var m = this.hls;
      m.on(A.Events.BUFFER_APPENDED, this.onBufferAppended, this), m.on(A.Events.FRAG_BUFFERED, this.onFragBuffered, this), m.on(A.Events.FRAG_LOADED, this.onFragLoaded, this);
    }, p._unregisterListeners = function() {
      var m = this.hls;
      m.off(A.Events.BUFFER_APPENDED, this.onBufferAppended, this), m.off(A.Events.FRAG_BUFFERED, this.onFragBuffered, this), m.off(A.Events.FRAG_LOADED, this.onFragLoaded, this);
    }, p.destroy = function() {
      this._unregisterListeners(), this.fragments = this.timeRanges = null;
    }, p.getAppendedFrag = function(m, E) {
      if (E === k.PlaylistLevelType.MAIN) {
        var v = this.activeFragment, l = this.activeParts;
        if (!v)
          return null;
        if (l)
          for (var e = l.length; e--; ) {
            var s = l[e], n = s ? s.end : v.appendedPTS;
            if (s.start <= m && n !== void 0 && m <= n)
              return e > 9 && (this.activeParts = l.slice(e - 9)), s;
          }
        else if (v.start <= m && v.appendedPTS !== void 0 && m <= v.appendedPTS)
          return v;
      }
      return this.getBufferedFrag(m, E);
    }, p.getBufferedFrag = function(m, E) {
      for (var v = this.fragments, l = Object.keys(v), e = l.length; e--; ) {
        var s = v[l[e]];
        if ((s == null ? void 0 : s.body.type) === E && s.buffered) {
          var n = s.body;
          if (n.start <= m && m <= n.end)
            return n;
        }
      }
      return null;
    }, p.detectEvictedFragments = function(m, E, v) {
      var l = this;
      Object.keys(this.fragments).forEach(function(e) {
        var s = l.fragments[e];
        if (s)
          if (s.buffered) {
            var n = s.range[m];
            n && n.time.some(function(r) {
              var a = !l.isTimeBuffered(r.startPTS, r.endPTS, E);
              return a && l.removeFragment(s.body), a;
            });
          } else
            s.body.type === v && l.removeFragment(s.body);
      });
    }, p.detectPartialFragments = function(m) {
      var E = this, v = this.timeRanges, l = m.frag, e = m.part;
      if (v && l.sn !== "initSegment") {
        var s = d(l), n = this.fragments[s];
        n && (Object.keys(v).forEach(function(r) {
          var a = l.elementaryStreams[r];
          if (a) {
            var i = v[r], h = e !== null || a.partial === !0;
            n.range[r] = E.getBufferedTimes(l, e, h, i);
          }
        }), n.backtrack = n.loaded = null, Object.keys(n.range).length ? n.buffered = !0 : this.removeFragment(n.body));
      }
    }, p.fragBuffered = function(m) {
      var E = d(m), v = this.fragments[E];
      v && (v.backtrack = v.loaded = null, v.buffered = !0);
    }, p.getBufferedTimes = function(m, E, v, l) {
      for (var e = { time: [], partial: v }, s = E ? E.start : m.start, n = E ? E.end : m.end, r = m.minEndPTS || n, a = m.maxStartPTS || s, i = 0; i < l.length; i++) {
        var h = l.start(i) - this.bufferPadding, g = l.end(i) + this.bufferPadding;
        if (a >= h && r <= g) {
          e.time.push({ startPTS: Math.max(s, l.start(i)), endPTS: Math.min(n, l.end(i)) });
          break;
        }
        if (s < g && n > h)
          e.partial = !0, e.time.push({ startPTS: Math.max(s, l.start(i)), endPTS: Math.min(n, l.end(i)) });
        else if (n <= h)
          break;
      }
      return e;
    }, p.getPartialFragment = function(m) {
      var E, v, l, e = null, s = 0, n = this.bufferPadding, r = this.fragments;
      return Object.keys(r).forEach(function(a) {
        var i = r[a];
        i && D(i) && (v = i.body.start - n, l = i.body.end + n, m >= v && m <= l && (E = Math.min(m - v, l - m), s <= E && (e = i.body, s = E)));
      }), e;
    }, p.getState = function(m) {
      var E = d(m), v = this.fragments[E];
      return v ? v.buffered ? D(v) ? R.PARTIAL : R.OK : v.backtrack ? R.BACKTRACKED : R.APPENDING : R.NOT_LOADED;
    }, p.backtrack = function(m, E) {
      var v = d(m), l = this.fragments[v];
      if (!l || l.backtrack)
        return null;
      var e = l.backtrack = E || l.loaded;
      return l.loaded = null, e;
    }, p.getBacktrackData = function(m) {
      var E = d(m), v = this.fragments[E];
      if (v) {
        var l, e = v.backtrack;
        if (e != null && (l = e.payload) !== null && l !== void 0 && l.byteLength)
          return e;
        this.removeFragment(m);
      }
      return null;
    }, p.isTimeBuffered = function(m, E, v) {
      for (var l, e, s = 0; s < v.length; s++) {
        if (l = v.start(s) - this.bufferPadding, e = v.end(s) + this.bufferPadding, m >= l && E <= e)
          return !0;
        if (E <= l)
          return !1;
      }
      return !1;
    }, p.onFragLoaded = function(m, E) {
      var v = E.frag, l = E.part;
      if (v.sn !== "initSegment" && !v.bitrateTest && !l) {
        var e = d(v);
        this.fragments[e] = { body: v, loaded: E, backtrack: null, buffered: !1, range: /* @__PURE__ */ Object.create(null) };
      }
    }, p.onBufferAppended = function(m, E) {
      var v = this, l = E.frag, e = E.part, s = E.timeRanges;
      if (l.type === k.PlaylistLevelType.MAIN)
        if (this.activeFragment = l, e) {
          var n = this.activeParts;
          n || (this.activeParts = n = []), n.push(e);
        } else
          this.activeParts = null;
      this.timeRanges = s, Object.keys(s).forEach(function(r) {
        var a = s[r];
        if (v.detectEvictedFragments(r, a), !e)
          for (var i = 0; i < a.length; i++)
            l.appendedPTS = Math.max(a.end(i), l.appendedPTS || 0);
      });
    }, p.onFragBuffered = function(m, E) {
      this.detectPartialFragments(E);
    }, p.hasFragment = function(m) {
      var E = d(m);
      return !!this.fragments[E];
    }, p.removeFragmentsInRange = function(m, E, v) {
      var l = this;
      Object.keys(this.fragments).forEach(function(e) {
        var s = l.fragments[e];
        if (s && s.buffered) {
          var n = s.body;
          n.type === v && n.start < E && n.end > m && l.removeFragment(n);
        }
      });
    }, p.removeFragment = function(m) {
      var E = d(m);
      m.stats.loaded = 0, m.clearElementaryStreamInfo(), delete this.fragments[E];
    }, p.removeAllFragments = function() {
      this.fragments = /* @__PURE__ */ Object.create(null), this.activeFragment = null, this.activeParts = null;
    }, T;
  }();
  function D(T) {
    var p, m;
    return T.buffered && (((p = T.range.video) === null || p === void 0 ? void 0 : p.partial) || ((m = T.range.audio) === null || m === void 0 ? void 0 : m.partial));
  }
  function d(T) {
    return T.type + "_" + T.level + "_" + T.urlId + "_" + T.sn;
  }
}, "./src/controller/gap-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "STALL_MINIMUM_DURATION_MS", function() {
    return C;
  }), f.d(w, "MAX_START_GAP_JUMP", function() {
    return D;
  }), f.d(w, "SKIP_BUFFER_HOLE_STEP_SECONDS", function() {
    return d;
  }), f.d(w, "SKIP_BUFFER_RANGE_START", function() {
    return T;
  }), f.d(w, "default", function() {
    return p;
  });
  var R = f("./src/utils/buffer-helper.ts"), S = f("./src/errors.ts"), A = f("./src/events.ts"), k = f("./src/utils/logger.ts"), C = 250, D = 2, d = 0.1, T = 0.05, p = function() {
    function m(v, l, e, s) {
      this.config = void 0, this.media = void 0, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = v, this.media = l, this.fragmentTracker = e, this.hls = s;
    }
    var E = m.prototype;
    return E.destroy = function() {
      this.hls = this.fragmentTracker = this.media = null;
    }, E.poll = function(v) {
      var l = this.config, e = this.media, s = this.stalled, n = e.currentTime, r = e.seeking, a = this.seeking && !r, i = !this.seeking && r;
      if (this.seeking = r, n === v) {
        if ((i || a) && (this.stalled = null), !e.paused && !e.ended && e.playbackRate !== 0 && R.BufferHelper.getBuffered(e).length) {
          var h = R.BufferHelper.bufferInfo(e, n, 0), g = h.len > 0, c = h.nextStart || 0;
          if (g || c) {
            if (r) {
              var y = h.len > D, u = !c || c - n > D && !this.fragmentTracker.getPartialFragment(n);
              if (y || u)
                return;
              this.moved = !1;
            }
            if (!this.moved && this.stalled !== null) {
              var t, o = Math.max(c, h.start || 0) - n, b = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, _ = !(b == null || (t = b.details) === null || t === void 0) && t.live ? 2 * b.details.targetduration : D;
              if (o > 0 && o <= _)
                return void this._trySkipBufferHole(null);
            }
            var L = self.performance.now();
            if (s !== null) {
              var I = L - s;
              !r && I >= C && this._reportStall(h.len);
              var O = R.BufferHelper.bufferInfo(e, n, l.maxBufferHole);
              this._tryFixBufferStall(O, I);
            } else
              this.stalled = L;
          }
        }
      } else if (this.moved = !0, s !== null) {
        if (this.stallReported) {
          var x = self.performance.now() - s;
          k.logger.warn("playback not stuck anymore @" + n + ", after " + Math.round(x) + "ms"), this.stallReported = !1;
        }
        this.stalled = null, this.nudgeRetry = 0;
      }
    }, E._tryFixBufferStall = function(v, l) {
      var e = this.config, s = this.fragmentTracker, n = this.media.currentTime, r = s.getPartialFragment(n);
      r && this._trySkipBufferHole(r) || v.len > e.maxBufferHole && l > 1e3 * e.highBufferWatchdogPeriod && (k.logger.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer());
    }, E._reportStall = function(v) {
      var l = this.hls, e = this.media;
      this.stallReported || (this.stallReported = !0, k.logger.warn("Playback stalling at @" + e.currentTime + " due to low buffer (buffer=" + v + ")"), l.trigger(A.Events.ERROR, { type: S.ErrorTypes.MEDIA_ERROR, details: S.ErrorDetails.BUFFER_STALLED_ERROR, fatal: !1, buffer: v }));
    }, E._trySkipBufferHole = function(v) {
      for (var l = this.config, e = this.hls, s = this.media, n = s.currentTime, r = 0, a = R.BufferHelper.getBuffered(s), i = 0; i < a.length; i++) {
        var h = a.start(i);
        if (n + l.maxBufferHole >= r && n < h) {
          var g = Math.max(h + T, s.currentTime + d);
          return k.logger.warn("skipping hole, adjusting currentTime from " + n + " to " + g), this.moved = !0, this.stalled = null, s.currentTime = g, v && e.trigger(A.Events.ERROR, { type: S.ErrorTypes.MEDIA_ERROR, details: S.ErrorDetails.BUFFER_SEEK_OVER_HOLE, fatal: !1, reason: "fragment loaded with buffer holes, seeking from " + n + " to " + g, frag: v }), g;
        }
        r = a.end(i);
      }
      return 0;
    }, E._tryNudgeBuffer = function() {
      var v = this.config, l = this.hls, e = this.media, s = e.currentTime, n = (this.nudgeRetry || 0) + 1;
      if (this.nudgeRetry = n, n < v.nudgeMaxRetry) {
        var r = s + n * v.nudgeOffset;
        k.logger.warn("Nudging 'currentTime' from " + s + " to " + r), e.currentTime = r, l.trigger(A.Events.ERROR, { type: S.ErrorTypes.MEDIA_ERROR, details: S.ErrorDetails.BUFFER_NUDGE_ON_STALL, fatal: !1 });
      } else
        k.logger.error("Playhead still not moving while enough data buffered @" + s + " after " + v.nudgeMaxRetry + " nudges"), l.trigger(A.Events.ERROR, { type: S.ErrorTypes.MEDIA_ERROR, details: S.ErrorDetails.BUFFER_STALLED_ERROR, fatal: !0 });
    }, m;
  }();
}, "./src/controller/id3-track-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/events.ts"), S = f("./src/utils/texttrack-utils.ts"), A = f("./src/demux/id3.ts"), k = function() {
    function C(d) {
      this.hls = void 0, this.id3Track = null, this.media = null, this.hls = d, this._registerListeners();
    }
    var D = C.prototype;
    return D.destroy = function() {
      this._unregisterListeners();
    }, D._registerListeners = function() {
      var d = this.hls;
      d.on(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), d.on(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this), d.on(R.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), d.on(R.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
    }, D._unregisterListeners = function() {
      var d = this.hls;
      d.off(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), d.off(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this), d.off(R.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), d.off(R.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
    }, D.onMediaAttached = function(d, T) {
      this.media = T.media;
    }, D.onMediaDetaching = function() {
      this.id3Track && (Object(S.clearCurrentCues)(this.id3Track), this.id3Track = null, this.media = null);
    }, D.getID3Track = function(d) {
      if (this.media) {
        for (var T = 0; T < d.length; T++) {
          var p = d[T];
          if (p.kind === "metadata" && p.label === "id3")
            return Object(S.sendAddTrackEvent)(p, this.media), p;
        }
        return this.media.addTextTrack("metadata", "id3");
      }
    }, D.onFragParsingMetadata = function(d, T) {
      if (this.media) {
        var p = T.frag, m = T.samples;
        this.id3Track || (this.id3Track = this.getID3Track(this.media.textTracks), this.id3Track.mode = "hidden");
        for (var E = self.WebKitDataCue || self.VTTCue || self.TextTrackCue, v = 0; v < m.length; v++) {
          var l = A.getID3Frames(m[v].data);
          if (l) {
            var e = m[v].pts, s = v < m.length - 1 ? m[v + 1].pts : p.end;
            s - e <= 0 && (s = e + 0.25);
            for (var n = 0; n < l.length; n++) {
              var r = l[n];
              if (!A.isTimeStampFrame(r)) {
                var a = new E(e, s, "");
                a.value = r, this.id3Track.addCue(a);
              }
            }
          }
        }
      }
    }, D.onBufferFlushing = function(d, T) {
      var p = T.startOffset, m = T.endOffset, E = T.type;
      if (!E || E === "audio") {
        var v = this.id3Track;
        v && Object(S.removeCuesInRange)(v, p, m);
      }
    }, C;
  }();
  w.default = k;
}, "./src/controller/latency-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return C;
  });
  var R = f("./src/errors.ts"), S = f("./src/events.ts"), A = f("./src/utils/logger.ts");
  function k(D, d) {
    for (var T = 0; T < d.length; T++) {
      var p = d[T];
      p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(D, p.key, p);
    }
  }
  var C = function() {
    function D(E) {
      var v = this;
      this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = function() {
        return v.timeupdate();
      }, this.hls = E, this.config = E.config, this.registerListeners();
    }
    var d, T, p, m = D.prototype;
    return m.destroy = function() {
      this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null;
    }, m.registerListeners = function() {
      this.hls.on(S.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(S.Events.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(S.Events.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(S.Events.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(S.Events.ERROR, this.onError, this);
    }, m.unregisterListeners = function() {
      this.hls.off(S.Events.MEDIA_ATTACHED, this.onMediaAttached), this.hls.off(S.Events.MEDIA_DETACHING, this.onMediaDetaching), this.hls.off(S.Events.MANIFEST_LOADING, this.onManifestLoading), this.hls.off(S.Events.LEVEL_UPDATED, this.onLevelUpdated), this.hls.off(S.Events.ERROR, this.onError);
    }, m.onMediaAttached = function(E, v) {
      this.media = v.media, this.media.addEventListener("timeupdate", this.timeupdateHandler);
    }, m.onMediaDetaching = function() {
      this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null);
    }, m.onManifestLoading = function() {
      this.levelDetails = null, this._latency = null, this.stallCount = 0;
    }, m.onLevelUpdated = function(E, v) {
      var l = v.details;
      this.levelDetails = l, l.advanced && this.timeupdate(), !l.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler);
    }, m.onError = function(E, v) {
      v.details === R.ErrorDetails.BUFFER_STALLED_ERROR && (this.stallCount++, A.logger.warn("[playback-rate-controller]: Stall detected, adjusting target latency"));
    }, m.timeupdate = function() {
      var E = this.media, v = this.levelDetails;
      if (E && v) {
        this.currentTime = E.currentTime;
        var l = this.computeLatency();
        if (l !== null) {
          this._latency = l;
          var e = this.config, s = e.lowLatencyMode, n = e.maxLiveSyncPlaybackRate;
          if (s && n !== 1) {
            var r = this.targetLatency;
            if (r !== null) {
              var a = l - r, i = a < Math.min(this.maxLatency, r + v.targetduration);
              if (v.live && i && a > 0.05 && this.forwardBufferLength > 1) {
                var h = Math.min(2, Math.max(1, n)), g = Math.round(2 / (1 + Math.exp(-0.75 * a - this.edgeStalled)) * 20) / 20;
                E.playbackRate = Math.min(h, Math.max(1, g));
              } else
                E.playbackRate !== 1 && E.playbackRate !== 0 && (E.playbackRate = 1);
            }
          }
        }
      }
    }, m.estimateLiveEdge = function() {
      var E = this.levelDetails;
      return E === null ? null : E.edge + E.age;
    }, m.computeLatency = function() {
      var E = this.estimateLiveEdge();
      return E === null ? null : E - this.currentTime;
    }, d = D, (T = [{ key: "latency", get: function() {
      return this._latency || 0;
    } }, { key: "maxLatency", get: function() {
      var E = this.config, v = this.levelDetails;
      return E.liveMaxLatencyDuration !== void 0 ? E.liveMaxLatencyDuration : v ? E.liveMaxLatencyDurationCount * v.targetduration : 0;
    } }, { key: "targetLatency", get: function() {
      var E = this.levelDetails;
      if (E === null)
        return null;
      var v = E.holdBack, l = E.partHoldBack, e = E.targetduration, s = this.config, n = s.liveSyncDuration, r = s.liveSyncDurationCount, a = s.lowLatencyMode, i = this.hls.userConfig, h = a && l || v;
      (i.liveSyncDuration || i.liveSyncDurationCount || h === 0) && (h = n !== void 0 ? n : r * e);
      var g = e;
      return h + Math.min(1 * this.stallCount, g);
    } }, { key: "liveSyncPosition", get: function() {
      var E = this.estimateLiveEdge(), v = this.targetLatency, l = this.levelDetails;
      if (E === null || v === null || l === null)
        return null;
      var e = l.edge, s = E - v - this.edgeStalled, n = e - l.totalduration, r = e - (this.config.lowLatencyMode && l.partTarget || l.targetduration);
      return Math.min(Math.max(n, s), r);
    } }, { key: "drift", get: function() {
      var E = this.levelDetails;
      return E === null ? 1 : E.drift;
    } }, { key: "edgeStalled", get: function() {
      var E = this.levelDetails;
      if (E === null)
        return 0;
      var v = 3 * (this.config.lowLatencyMode && E.partTarget || E.targetduration);
      return Math.max(E.age - v, 0);
    } }, { key: "forwardBufferLength", get: function() {
      var E = this.media, v = this.levelDetails;
      if (!E || !v)
        return 0;
      var l = E.buffered.length;
      return l ? E.buffered.end(l - 1) : v.edge - this.currentTime;
    } }]) && k(d.prototype, T), p && k(d, p), D;
  }();
}, "./src/controller/level-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return v;
  });
  var R = f("./src/types/level.ts"), S = f("./src/events.ts"), A = f("./src/errors.ts"), k = f("./src/utils/codecs.ts"), C = f("./src/controller/level-helper.ts"), D = f("./src/controller/base-playlist-controller.ts"), d = f("./src/types/loader.ts");
  function T() {
    return (T = Object.assign || function(l) {
      for (var e = 1; e < arguments.length; e++) {
        var s = arguments[e];
        for (var n in s)
          Object.prototype.hasOwnProperty.call(s, n) && (l[n] = s[n]);
      }
      return l;
    }).apply(this, arguments);
  }
  function p(l, e) {
    for (var s = 0; s < e.length; s++) {
      var n = e[s];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(l, n.key, n);
    }
  }
  function m(l, e) {
    return (m = Object.setPrototypeOf || function(s, n) {
      return s.__proto__ = n, s;
    })(l, e);
  }
  var E = /chrome|firefox/.test(navigator.userAgent.toLowerCase()), v = function(l) {
    var e, s;
    function n(g) {
      var c;
      return (c = l.call(this, g, "[level-controller]") || this)._levels = [], c._firstLevel = -1, c._startLevel = void 0, c.currentLevelIndex = -1, c.manualLevelIndex = -1, c.onParsedComplete = void 0, c._registerListeners(), c;
    }
    s = l, (e = n).prototype = Object.create(s.prototype), e.prototype.constructor = e, m(e, s);
    var r, a, i, h = n.prototype;
    return h._registerListeners = function() {
      var g = this.hls;
      g.on(S.Events.MANIFEST_LOADED, this.onManifestLoaded, this), g.on(S.Events.LEVEL_LOADED, this.onLevelLoaded, this), g.on(S.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), g.on(S.Events.FRAG_LOADED, this.onFragLoaded, this), g.on(S.Events.ERROR, this.onError, this);
    }, h._unregisterListeners = function() {
      var g = this.hls;
      g.off(S.Events.MANIFEST_LOADED, this.onManifestLoaded, this), g.off(S.Events.LEVEL_LOADED, this.onLevelLoaded, this), g.off(S.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), g.off(S.Events.FRAG_LOADED, this.onFragLoaded, this), g.off(S.Events.ERROR, this.onError, this);
    }, h.destroy = function() {
      this._unregisterListeners(), this.manualLevelIndex = -1, this._levels.length = 0, l.prototype.destroy.call(this);
    }, h.startLoad = function() {
      this._levels.forEach(function(g) {
        g.loadError = 0;
      }), l.prototype.startLoad.call(this);
    }, h.onManifestLoaded = function(g, c) {
      var y, u, t = [], o = [], b = [], _ = {}, L = !1, I = !1, O = !1;
      if (c.levels.forEach(function(F) {
        var N = F.attrs;
        L = L || !(!F.width || !F.height), I = I || !!F.videoCodec, O = O || !!F.audioCodec, E && F.audioCodec && F.audioCodec.indexOf("mp4a.40.34") !== -1 && (F.audioCodec = void 0);
        var U = F.bitrate + "-" + F.attrs.RESOLUTION + "-" + F.attrs.CODECS;
        (u = _[U]) ? u.url.push(F.url) : (u = new R.Level(F), _[U] = u, t.push(u)), N && (N.AUDIO && Object(C.addGroupId)(u, "audio", N.AUDIO), N.SUBTITLES && Object(C.addGroupId)(u, "text", N.SUBTITLES));
      }), (L || I) && O && (t = t.filter(function(F) {
        var N = F.videoCodec, U = F.width, G = F.height;
        return !!N || !(!U || !G);
      })), t = t.filter(function(F) {
        var N = F.audioCodec, U = F.videoCodec;
        return (!N || Object(k.isCodecSupportedInMp4)(N, "audio")) && (!U || Object(k.isCodecSupportedInMp4)(U, "video"));
      }), c.audioTracks && (o = c.audioTracks.filter(function(F) {
        return !F.audioCodec || Object(k.isCodecSupportedInMp4)(F.audioCodec, "audio");
      }), Object(C.assignTrackIdsByGroup)(o)), c.subtitles && (b = c.subtitles, Object(C.assignTrackIdsByGroup)(b)), t.length > 0) {
        y = t[0].bitrate, t.sort(function(F, N) {
          return F.bitrate - N.bitrate;
        }), this._levels = t;
        for (var x = 0; x < t.length; x++)
          if (t[x].bitrate === y) {
            this._firstLevel = x, this.log("manifest loaded, " + t.length + " level(s) found, first bitrate: " + y);
            break;
          }
        var P = O && !I, M = { levels: t, audioTracks: o, subtitleTracks: b, firstLevel: this._firstLevel, stats: c.stats, audio: O, video: I, altAudio: !P && o.some(function(F) {
          return !!F.url;
        }) };
        this.hls.trigger(S.Events.MANIFEST_PARSED, M), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition);
      } else
        this.hls.trigger(S.Events.ERROR, { type: A.ErrorTypes.MEDIA_ERROR, details: A.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR, fatal: !0, url: c.url, reason: "no level with compatible codecs found in manifest" });
    }, h.onError = function(g, c) {
      if (l.prototype.onError.call(this, g, c), !c.fatal) {
        var y = c.context, u = this._levels[this.currentLevelIndex];
        if (y && (y.type === d.PlaylistContextType.AUDIO_TRACK && u.audioGroupIds && y.groupId === u.audioGroupIds[u.urlId] || y.type === d.PlaylistContextType.SUBTITLE_TRACK && u.textGroupIds && y.groupId === u.textGroupIds[u.urlId]))
          this.redundantFailover(this.currentLevelIndex);
        else {
          var t, o = !1, b = !0;
          switch (c.details) {
            case A.ErrorDetails.FRAG_LOAD_ERROR:
            case A.ErrorDetails.FRAG_LOAD_TIMEOUT:
            case A.ErrorDetails.KEY_LOAD_ERROR:
            case A.ErrorDetails.KEY_LOAD_TIMEOUT:
              if (c.frag) {
                var _ = this._levels[c.frag.level];
                _ ? (_.fragmentError++, _.fragmentError > this.hls.config.fragLoadingMaxRetry && (t = c.frag.level)) : t = c.frag.level;
              }
              break;
            case A.ErrorDetails.LEVEL_LOAD_ERROR:
            case A.ErrorDetails.LEVEL_LOAD_TIMEOUT:
              y && (y.deliveryDirectives && (b = !1), t = y.level), o = !0;
              break;
            case A.ErrorDetails.REMUX_ALLOC_ERROR:
              t = c.level, o = !0;
          }
          t !== void 0 && this.recoverLevel(c, t, o, b);
        }
      }
    }, h.recoverLevel = function(g, c, y, u) {
      var t = g.details, o = this._levels[c];
      if (o.loadError++, y) {
        if (!this.retryLoadingOrFail(g))
          return void (this.currentLevelIndex = -1);
        g.levelRetry = !0;
      }
      if (u) {
        var b = o.url.length;
        if (b > 1 && o.loadError < b)
          g.levelRetry = !0, this.redundantFailover(c);
        else if (this.manualLevelIndex === -1) {
          var _ = c === 0 ? this._levels.length - 1 : c - 1;
          this.currentLevelIndex !== _ && this._levels[_].loadError === 0 && (this.warn(t + ": switch to " + _), g.levelRetry = !0, this.hls.nextAutoLevel = _);
        }
      }
    }, h.redundantFailover = function(g) {
      var c = this._levels[g], y = c.url.length;
      if (y > 1) {
        var u = (c.urlId + 1) % y;
        this.warn("Switching to redundant URL-id " + u), this._levels.forEach(function(t) {
          t.urlId = u;
        }), this.level = g;
      }
    }, h.onFragLoaded = function(g, c) {
      var y = c.frag;
      if (y !== void 0 && y.type === d.PlaylistLevelType.MAIN) {
        var u = this._levels[y.level];
        u !== void 0 && (u.fragmentError = 0, u.loadError = 0);
      }
    }, h.onLevelLoaded = function(g, c) {
      var y, u, t = c.level, o = c.details, b = this._levels[t];
      if (!b)
        return this.warn("Invalid level index " + t), void ((u = c.deliveryDirectives) !== null && u !== void 0 && u.skip && (o.deltaUpdateFailed = !0));
      t === this.currentLevelIndex ? (b.fragmentError === 0 && (b.loadError = 0, this.retryCount = 0), this.playlistLoaded(t, c, b.details)) : (y = c.deliveryDirectives) !== null && y !== void 0 && y.skip && (o.deltaUpdateFailed = !0);
    }, h.onAudioTrackSwitched = function(g, c) {
      var y = this.hls.levels[this.currentLevelIndex];
      if (y && y.audioGroupIds) {
        for (var u = -1, t = this.hls.audioTracks[c.id].groupId, o = 0; o < y.audioGroupIds.length; o++)
          if (y.audioGroupIds[o] === t) {
            u = o;
            break;
          }
        u !== y.urlId && (y.urlId = u, this.startLoad());
      }
    }, h.loadPlaylist = function(g) {
      var c = this.currentLevelIndex, y = this._levels[c];
      if (this.canLoad && y && y.url.length > 0) {
        var u = y.urlId, t = y.url[u];
        if (g)
          try {
            t = g.addDirectives(t);
          } catch (o) {
            this.warn("Could not construct new URL with HLS Delivery Directives: " + o);
          }
        this.log("Attempt loading level index " + c + (g ? " at sn " + g.msn + " part " + g.part : "") + " with URL-id " + u + " " + t), this.clearTimer(), this.hls.trigger(S.Events.LEVEL_LOADING, { url: t, level: c, id: u, deliveryDirectives: g || null });
      }
    }, h.removeLevel = function(g, c) {
      var y = function(t, o) {
        return o !== c;
      }, u = this._levels.filter(function(t, o) {
        return o !== g || t.url.length > 1 && c !== void 0 && (t.url = t.url.filter(y), t.audioGroupIds && (t.audioGroupIds = t.audioGroupIds.filter(y)), t.textGroupIds && (t.textGroupIds = t.textGroupIds.filter(y)), t.urlId = 0, !0);
      }).map(function(t, o) {
        var b = t.details;
        return b != null && b.fragments && b.fragments.forEach(function(_) {
          _.level = o;
        }), t;
      });
      this._levels = u, this.hls.trigger(S.Events.LEVELS_UPDATED, { levels: u });
    }, r = n, (a = [{ key: "levels", get: function() {
      return this._levels.length === 0 ? null : this._levels;
    } }, { key: "level", get: function() {
      return this.currentLevelIndex;
    }, set: function(g) {
      var c, y = this._levels;
      if (y.length !== 0 && (this.currentLevelIndex !== g || (c = y[g]) === null || c === void 0 || !c.details)) {
        if (g < 0 || g >= y.length) {
          var u = g < 0;
          if (this.hls.trigger(S.Events.ERROR, { type: A.ErrorTypes.OTHER_ERROR, details: A.ErrorDetails.LEVEL_SWITCH_ERROR, level: g, fatal: u, reason: "invalid level idx" }), u)
            return;
          g = Math.min(g, y.length - 1);
        }
        this.clearTimer();
        var t = this.currentLevelIndex, o = y[t], b = y[g];
        this.log("switching to level " + g + " from " + t), this.currentLevelIndex = g;
        var _ = T({}, b, { level: g, maxBitrate: b.maxBitrate, uri: b.uri, urlId: b.urlId });
        delete _._urlId, this.hls.trigger(S.Events.LEVEL_SWITCHING, _);
        var L = b.details;
        if (!L || L.live) {
          var I = this.switchParams(b.uri, o == null ? void 0 : o.details);
          this.loadPlaylist(I);
        }
      }
    } }, { key: "manualLevel", get: function() {
      return this.manualLevelIndex;
    }, set: function(g) {
      this.manualLevelIndex = g, this._startLevel === void 0 && (this._startLevel = g), g !== -1 && (this.level = g);
    } }, { key: "firstLevel", get: function() {
      return this._firstLevel;
    }, set: function(g) {
      this._firstLevel = g;
    } }, { key: "startLevel", get: function() {
      if (this._startLevel === void 0) {
        var g = this.hls.config.startLevel;
        return g !== void 0 ? g : this._firstLevel;
      }
      return this._startLevel;
    }, set: function(g) {
      this._startLevel = g;
    } }, { key: "nextLoadLevel", get: function() {
      return this.manualLevelIndex !== -1 ? this.manualLevelIndex : this.hls.nextAutoLevel;
    }, set: function(g) {
      this.level = g, this.manualLevelIndex === -1 && (this.hls.nextAutoLevel = g);
    } }]) && p(r.prototype, a), i && p(r, i), n;
  }(D.default);
}, "./src/controller/level-helper.ts": function(B, w, f) {
  f.r(w), f.d(w, "addGroupId", function() {
    return A;
  }), f.d(w, "assignTrackIdsByGroup", function() {
    return k;
  }), f.d(w, "updatePTS", function() {
    return C;
  }), f.d(w, "updateFragPTSDTS", function() {
    return d;
  }), f.d(w, "mergeDetails", function() {
    return T;
  }), f.d(w, "mapPartIntersection", function() {
    return p;
  }), f.d(w, "mapFragmentIntersection", function() {
    return m;
  }), f.d(w, "adjustSliding", function() {
    return E;
  }), f.d(w, "addSliding", function() {
    return v;
  }), f.d(w, "computeReloadInterval", function() {
    return l;
  }), f.d(w, "getFragmentWithSN", function() {
    return e;
  }), f.d(w, "getPartWith", function() {
    return s;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/utils/logger.ts");
  function A(n, r, a) {
    switch (r) {
      case "audio":
        n.audioGroupIds || (n.audioGroupIds = []), n.audioGroupIds.push(a);
        break;
      case "text":
        n.textGroupIds || (n.textGroupIds = []), n.textGroupIds.push(a);
    }
  }
  function k(n) {
    var r = {};
    n.forEach(function(a) {
      var i = a.groupId || "";
      a.id = r[i] = r[i] || 0, r[i]++;
    });
  }
  function C(n, r, a) {
    D(n[r], n[a]);
  }
  function D(n, r) {
    var a = r.startPTS;
    if (Object(R.isFiniteNumber)(a)) {
      var i, h = 0;
      r.sn > n.sn ? (h = a - n.start, i = n) : (h = n.start - a, i = r), i.duration !== h && (i.duration = h);
    } else
      r.sn > n.sn ? n.cc === r.cc && n.minEndPTS ? r.start = n.start + (n.minEndPTS - n.start) : r.start = n.start + n.duration : r.start = Math.max(n.start - r.duration, 0);
  }
  function d(n, r, a, i, h, g) {
    i - a <= 0 && (S.logger.warn("Fragment should have a positive duration", r), i = a + r.duration, g = h + r.duration);
    var c = a, y = i, u = r.startPTS, t = r.endPTS;
    if (Object(R.isFiniteNumber)(u)) {
      var o = Math.abs(u - a);
      Object(R.isFiniteNumber)(r.deltaPTS) ? r.deltaPTS = Math.max(o, r.deltaPTS) : r.deltaPTS = o, c = Math.max(a, u), a = Math.min(a, u), h = Math.min(h, r.startDTS), y = Math.min(i, t), i = Math.max(i, t), g = Math.max(g, r.endDTS);
    }
    r.duration = i - a;
    var b = a - r.start;
    r.appendedPTS = i, r.start = r.startPTS = a, r.maxStartPTS = c, r.startDTS = h, r.endPTS = i, r.minEndPTS = y, r.endDTS = g;
    var _, L = r.sn;
    if (!n || L < n.startSN || L > n.endSN)
      return 0;
    var I = L - n.startSN, O = n.fragments;
    for (O[I] = r, _ = I; _ > 0; _--)
      D(O[_], O[_ - 1]);
    for (_ = I; _ < O.length - 1; _++)
      D(O[_], O[_ + 1]);
    return n.fragmentHint && D(O[O.length - 1], n.fragmentHint), n.PTSKnown = n.alignedSliding = !0, b;
  }
  function T(n, r) {
    for (var a = null, i = n.fragments, h = i.length - 1; h >= 0; h--) {
      var g = i[h].initSegment;
      if (g) {
        a = g;
        break;
      }
    }
    n.fragmentHint && delete n.fragmentHint.endPTS;
    var c, y = 0;
    if (m(n, r, function(L, I) {
      var O;
      L.relurl && (y = L.cc - I.cc), Object(R.isFiniteNumber)(L.startPTS) && Object(R.isFiniteNumber)(L.endPTS) && (I.start = I.startPTS = L.startPTS, I.startDTS = L.startDTS, I.appendedPTS = L.appendedPTS, I.maxStartPTS = L.maxStartPTS, I.endPTS = L.endPTS, I.endDTS = L.endDTS, I.minEndPTS = L.minEndPTS, I.duration = L.endPTS - L.startPTS, I.duration && (c = I), r.PTSKnown = r.alignedSliding = !0), I.elementaryStreams = L.elementaryStreams, I.loader = L.loader, I.stats = L.stats, I.urlId = L.urlId, L.initSegment ? (I.initSegment = L.initSegment, a = L.initSegment) : I.initSegment && I.initSegment.relurl != ((O = a) === null || O === void 0 ? void 0 : O.relurl) || (I.initSegment = a);
    }), r.skippedSegments && (r.deltaUpdateFailed = r.fragments.some(function(L) {
      return !L;
    }), r.deltaUpdateFailed)) {
      S.logger.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
      for (var u = r.skippedSegments; u--; )
        r.fragments.shift();
      r.startSN = r.fragments[0].sn, r.startCC = r.fragments[0].cc;
    }
    var t = r.fragments;
    if (y) {
      S.logger.warn("discontinuity sliding from playlist, take drift into account");
      for (var o = 0; o < t.length; o++)
        t[o].cc += y;
    }
    r.skippedSegments && (r.startCC = r.fragments[0].cc), p(n.partList, r.partList, function(L, I) {
      I.elementaryStreams = L.elementaryStreams, I.stats = L.stats;
    }), c ? d(r, c, c.startPTS, c.endPTS, c.startDTS, c.endDTS) : E(n, r), t.length && (r.totalduration = r.edge - t[0].start), r.driftStartTime = n.driftStartTime, r.driftStart = n.driftStart;
    var b = r.advancedDateTime;
    if (r.advanced && b) {
      var _ = r.edge;
      r.driftStart || (r.driftStartTime = b, r.driftStart = _), r.driftEndTime = b, r.driftEnd = _;
    } else
      r.driftEndTime = n.driftEndTime, r.driftEnd = n.driftEnd, r.advancedDateTime = n.advancedDateTime;
  }
  function p(n, r, a) {
    if (n && r)
      for (var i = 0, h = 0, g = n.length; h <= g; h++) {
        var c = n[h], y = r[h + i];
        c && y && c.index === y.index && c.fragment.sn === y.fragment.sn ? a(c, y) : i--;
      }
  }
  function m(n, r, a) {
    for (var i = r.skippedSegments, h = Math.max(n.startSN, r.startSN) - r.startSN, g = (n.fragmentHint ? 1 : 0) + (i ? r.endSN : Math.min(n.endSN, r.endSN)) - r.startSN, c = r.startSN - n.startSN, y = r.fragmentHint ? r.fragments.concat(r.fragmentHint) : r.fragments, u = n.fragmentHint ? n.fragments.concat(n.fragmentHint) : n.fragments, t = h; t <= g; t++) {
      var o = u[c + t], b = y[t];
      i && !b && t < i && (b = r.fragments[t] = o), o && b && a(o, b);
    }
  }
  function E(n, r) {
    var a = r.startSN + r.skippedSegments - n.startSN, i = n.fragments;
    a < 0 || a >= i.length || v(r, i[a].start);
  }
  function v(n, r) {
    if (r) {
      for (var a = n.fragments, i = n.skippedSegments; i < a.length; i++)
        a[i].start += r;
      n.fragmentHint && (n.fragmentHint.start += r);
    }
  }
  function l(n, r) {
    var a, i = 1e3 * n.levelTargetDuration, h = i / 2, g = n.age, c = g > 0 && g < 3 * i, y = r.loading.end - r.loading.start, u = n.availabilityDelay;
    if (n.updated === !1)
      if (c) {
        var t = 333 * n.misses;
        a = Math.max(Math.min(h, 2 * y), t), n.availabilityDelay = (n.availabilityDelay || 0) + a;
      } else
        a = h;
    else
      c ? (u = Math.min(u || i / 2, g), n.availabilityDelay = u, a = u + i - g) : a = i - y;
    return Math.round(a);
  }
  function e(n, r, a) {
    if (!n || !n.details)
      return null;
    var i = n.details, h = i.fragments[r - i.startSN];
    return h || ((h = i.fragmentHint) && h.sn === r ? h : r < i.startSN && a && a.sn === r ? a : null);
  }
  function s(n, r, a) {
    if (!n || !n.details)
      return null;
    var i = n.details.partList;
    if (i)
      for (var h = i.length; h--; ) {
        var g = i[h];
        if (g.index === a && g.fragment.sn === r)
          return g;
      }
    return null;
  }
}, "./src/controller/stream-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return n;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/controller/base-stream-controller.ts"), A = f("./src/is-supported.ts"), k = f("./src/events.ts"), C = f("./src/utils/buffer-helper.ts"), D = f("./src/controller/fragment-tracker.ts"), d = f("./src/types/loader.ts"), T = f("./src/loader/fragment.ts"), p = f("./src/demux/transmuxer-interface.ts"), m = f("./src/types/transmuxer.ts"), E = f("./src/controller/gap-controller.ts"), v = f("./src/errors.ts"), l = f("./src/utils/logger.ts");
  function e(r, a) {
    for (var i = 0; i < a.length; i++) {
      var h = a[i];
      h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(r, h.key, h);
    }
  }
  function s(r, a) {
    return (s = Object.setPrototypeOf || function(i, h) {
      return i.__proto__ = h, i;
    })(r, a);
  }
  var n = function(r) {
    var a, i;
    function h(t, o) {
      var b;
      return (b = r.call(this, t, o, "[stream-controller]") || this).audioCodecSwap = !1, b.gapController = null, b.level = -1, b._forceStartLoad = !1, b.altAudio = !1, b.audioOnly = !1, b.fragPlaying = null, b.onvplaying = null, b.onvseeked = null, b.fragLastKbps = 0, b.stalled = !1, b.couldBacktrack = !1, b.audioCodecSwitch = !1, b.videoBuffer = null, b._registerListeners(), b;
    }
    i = r, (a = h).prototype = Object.create(i.prototype), a.prototype.constructor = a, s(a, i);
    var g, c, y, u = h.prototype;
    return u._registerListeners = function() {
      var t = this.hls;
      t.on(k.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(k.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(k.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(k.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(k.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(k.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(k.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.on(k.Events.ERROR, this.onError, this), t.on(k.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(k.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(k.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(k.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(k.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.on(k.Events.FRAG_BUFFERED, this.onFragBuffered, this);
    }, u._unregisterListeners = function() {
      var t = this.hls;
      t.off(k.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(k.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(k.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(k.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(k.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(k.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.off(k.Events.ERROR, this.onError, this), t.off(k.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(k.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(k.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(k.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(k.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.off(k.Events.FRAG_BUFFERED, this.onFragBuffered, this);
    }, u.onHandlerDestroying = function() {
      this._unregisterListeners(), this.onMediaDetaching();
    }, u.startLoad = function(t) {
      if (this.levels) {
        var o = this.lastCurrentTime, b = this.hls;
        if (this.stopLoad(), this.setInterval(100), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
          var _ = b.startLevel;
          _ === -1 && (b.config.testBandwidth ? (_ = 0, this.bitrateTest = !0) : _ = b.nextAutoLevel), this.level = b.nextLoadLevel = _, this.loadedmetadata = !1;
        }
        o > 0 && t === -1 && (this.log("Override startPosition with lastCurrentTime @" + o.toFixed(3)), t = o), this.state = S.State.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick();
      } else
        this._forceStartLoad = !0, this.state = S.State.STOPPED;
    }, u.stopLoad = function() {
      this._forceStartLoad = !1, r.prototype.stopLoad.call(this);
    }, u.doTick = function() {
      switch (this.state) {
        case S.State.IDLE:
          this.doTickIdle();
          break;
        case S.State.WAITING_LEVEL:
          var t, o = this.levels, b = this.level, _ = o == null || (t = o[b]) === null || t === void 0 ? void 0 : t.details;
          if (_ && (!_.live || this.levelLastLoaded === this.level)) {
            if (this.waitForCdnTuneIn(_))
              break;
            this.state = S.State.IDLE;
            break;
          }
          break;
        case S.State.FRAG_LOADING_WAITING_RETRY:
          var L, I = self.performance.now(), O = this.retryDate;
          (!O || I >= O || (L = this.media) !== null && L !== void 0 && L.seeking) && (this.log("retryDate reached, switch back to IDLE state"), this.state = S.State.IDLE);
      }
      this.onTickEnd();
    }, u.onTickEnd = function() {
      r.prototype.onTickEnd.call(this), this.checkBuffer(), this.checkFragmentChanged();
    }, u.doTickIdle = function() {
      var t, o, b = this.hls, _ = this.levelLastLoaded, L = this.levels, I = this.media, O = b.config, x = b.nextLoadLevel;
      if (_ !== null && (I || !this.startFragRequested && O.startFragPrefetch) && (!this.altAudio || !this.audioOnly) && L && L[x]) {
        var P = L[x];
        this.level = b.nextLoadLevel = x;
        var M = P.details;
        if (!M || this.state === S.State.WAITING_LEVEL || M.live && this.levelLastLoaded !== x)
          this.state = S.State.WAITING_LEVEL;
        else {
          var F = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : I, d.PlaylistLevelType.MAIN);
          if (F !== null && !(F.len >= this.getMaxBufferLength(P.maxBitrate))) {
            if (this._streamEnded(F, M)) {
              var N = {};
              return this.altAudio && (N.type = "video"), this.hls.trigger(k.Events.BUFFER_EOS, N), void (this.state = S.State.ENDED);
            }
            var U = F.end, G = this.getNextFragment(U, M);
            if (this.couldBacktrack && !this.fragPrevious && G && G.sn !== "initSegment") {
              var j = G.sn - M.startSN;
              j > 1 && (G = M.fragments[j - 1], this.fragmentTracker.removeFragment(G));
            }
            if (G && this.fragmentTracker.getState(G) === D.FragmentState.OK && this.nextLoadPosition > U) {
              var V = this.audioOnly && !this.altAudio ? T.ElementaryStreamTypes.AUDIO : T.ElementaryStreamTypes.VIDEO;
              this.afterBufferFlushed(I, V, d.PlaylistLevelType.MAIN), G = this.getNextFragment(this.nextLoadPosition, M);
            }
            G && (!G.initSegment || G.initSegment.data || this.bitrateTest || (G = G.initSegment), ((t = G.decryptdata) === null || t === void 0 ? void 0 : t.keyFormat) !== "identity" || (o = G.decryptdata) !== null && o !== void 0 && o.key ? this.loadFragment(G, M, U) : this.loadKey(G, M));
          }
        }
      }
    }, u.loadFragment = function(t, o, b) {
      var _, L = this.fragmentTracker.getState(t);
      if (this.fragCurrent = t, L === D.FragmentState.BACKTRACKED) {
        var I = this.fragmentTracker.getBacktrackData(t);
        if (I)
          return this._handleFragmentLoadProgress(I), void this._handleFragmentLoadComplete(I);
        L = D.FragmentState.NOT_LOADED;
      }
      L === D.FragmentState.NOT_LOADED || L === D.FragmentState.PARTIAL ? t.sn === "initSegment" ? this._loadInitSegment(t) : this.bitrateTest ? (t.bitrateTest = !0, this.log("Fragment " + t.sn + " of level " + t.level + " is being downloaded to test bitrate and will not be buffered"), this._loadBitrateTestFrag(t)) : (this.startFragRequested = !0, r.prototype.loadFragment.call(this, t, o, b)) : L === D.FragmentState.APPENDING ? this.reduceMaxBufferLength(t.duration) && this.fragmentTracker.removeFragment(t) : ((_ = this.media) === null || _ === void 0 ? void 0 : _.buffered.length) === 0 && this.fragmentTracker.removeAllFragments();
    }, u.getAppendedFrag = function(t) {
      var o = this.fragmentTracker.getAppendedFrag(t, d.PlaylistLevelType.MAIN);
      return o && "fragment" in o ? o.fragment : o;
    }, u.getBufferedFrag = function(t) {
      return this.fragmentTracker.getBufferedFrag(t, d.PlaylistLevelType.MAIN);
    }, u.followingBufferedFrag = function(t) {
      return t ? this.getBufferedFrag(t.end + 0.5) : null;
    }, u.immediateLevelSwitch = function() {
      this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
    }, u.nextLevelSwitch = function() {
      var t = this.levels, o = this.media;
      if (o != null && o.readyState) {
        var b, _ = this.getAppendedFrag(o.currentTime);
        if (_ && _.start > 1 && this.flushMainBuffer(0, _.start - 1), !o.paused && t) {
          var L = t[this.hls.nextLoadLevel], I = this.fragLastKbps;
          b = I && this.fragCurrent ? this.fragCurrent.duration * L.maxBitrate / (1e3 * I) + 1 : 0;
        } else
          b = 0;
        var O = this.getBufferedFrag(o.currentTime + b);
        if (O) {
          var x = this.followingBufferedFrag(O);
          if (x) {
            this.abortCurrentFrag();
            var P = x.maxStartPTS ? x.maxStartPTS : x.start, M = x.duration, F = Math.max(O.end, P + Math.min(Math.max(M - this.config.maxFragLookUpTolerance, 0.5 * M), 0.75 * M));
            this.flushMainBuffer(F, Number.POSITIVE_INFINITY);
          }
        }
      }
    }, u.abortCurrentFrag = function() {
      var t = this.fragCurrent;
      this.fragCurrent = null, t != null && t.loader && t.loader.abort(), this.state === S.State.KEY_LOADING && (this.state = S.State.IDLE), this.nextLoadPosition = this.getLoadPosition();
    }, u.flushMainBuffer = function(t, o) {
      r.prototype.flushMainBuffer.call(this, t, o, this.altAudio ? "video" : null);
    }, u.onMediaAttached = function(t, o) {
      r.prototype.onMediaAttached.call(this, t, o);
      var b = o.media;
      this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), b.addEventListener("playing", this.onvplaying), b.addEventListener("seeked", this.onvseeked), this.gapController = new E.default(this.config, b, this.fragmentTracker, this.hls);
    }, u.onMediaDetaching = function() {
      var t = this.media;
      t && (t.removeEventListener("playing", this.onvplaying), t.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), r.prototype.onMediaDetaching.call(this);
    }, u.onMediaPlaying = function() {
      this.tick();
    }, u.onMediaSeeked = function() {
      var t = this.media, o = t ? t.currentTime : null;
      Object(R.isFiniteNumber)(o) && this.log("Media seeked to " + o.toFixed(3)), this.tick();
    }, u.onManifestLoading = function() {
      this.log("Trigger BUFFER_RESET"), this.hls.trigger(k.Events.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = this.stalled = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null;
    }, u.onManifestParsed = function(t, o) {
      var b, _ = !1, L = !1;
      o.levels.forEach(function(I) {
        (b = I.audioCodec) && (b.indexOf("mp4a.40.2") !== -1 && (_ = !0), b.indexOf("mp4a.40.5") !== -1 && (L = !0));
      }), this.audioCodecSwitch = _ && L && !Object(A.changeTypeSupported)(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = o.levels, this.startFragRequested = !1;
    }, u.onLevelLoading = function(t, o) {
      var b = this.levels;
      if (b && this.state === S.State.IDLE) {
        var _ = b[o.level];
        (!_.details || _.details.live && this.levelLastLoaded !== o.level || this.waitForCdnTuneIn(_.details)) && (this.state = S.State.WAITING_LEVEL);
      }
    }, u.onLevelLoaded = function(t, o) {
      var b, _ = this.levels, L = o.level, I = o.details, O = I.totalduration;
      if (_) {
        this.log("Level " + L + " loaded [" + I.startSN + "," + I.endSN + "], cc [" + I.startCC + ", " + I.endCC + "] duration:" + O);
        var x = this.fragCurrent;
        !x || this.state !== S.State.FRAG_LOADING && this.state !== S.State.FRAG_LOADING_WAITING_RETRY || x.level !== o.level && x.loader && (this.state = S.State.IDLE, x.loader.abort());
        var P = _[L], M = 0;
        if (I.live || (b = P.details) !== null && b !== void 0 && b.live) {
          if (I.fragments[0] || (I.deltaUpdateFailed = !0), I.deltaUpdateFailed)
            return;
          M = this.alignPlaylists(I, P.details);
        }
        if (P.details = I, this.levelLastLoaded = L, this.hls.trigger(k.Events.LEVEL_UPDATED, { details: I, level: L }), this.state === S.State.WAITING_LEVEL) {
          if (this.waitForCdnTuneIn(I))
            return;
          this.state = S.State.IDLE;
        }
        this.startFragRequested ? I.live && this.synchronizeToLiveEdge(I) : this.setStartPosition(I, M), this.tick();
      } else
        this.warn("Levels were reset while loading level " + L);
    }, u._handleFragmentLoadProgress = function(t) {
      var o, b = t.frag, _ = t.part, L = t.payload, I = this.levels;
      if (I) {
        var O = I[b.level], x = O.details;
        if (x) {
          var P = O.videoCodec, M = x.PTSKnown || !x.live, F = (o = b.initSegment) === null || o === void 0 ? void 0 : o.data, N = this._getAudioCodec(O), U = this.transmuxer = this.transmuxer || new p.default(this.hls, d.PlaylistLevelType.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), G = _ ? _.index : -1, j = G !== -1, V = new m.ChunkMetadata(b.level, b.sn, b.stats.chunkCount, L.byteLength, G, j), Y = this.initPTS[b.cc];
          U.push(L, F, N, P, b, _, x.totalduration, M, V, Y);
        } else
          this.warn("Dropping fragment " + b.sn + " of level " + b.level + " after level details were reset");
      } else
        this.warn("Levels were reset while fragment load was in progress. Fragment " + b.sn + " of level " + b.level + " will not be buffered");
    }, u.onAudioTrackSwitching = function(t, o) {
      var b = this.altAudio, _ = !!o.url, L = o.id;
      if (!_) {
        if (this.mediaBuffer !== this.media) {
          this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
          var I = this.fragCurrent;
          I != null && I.loader && (this.log("Switching to main audio track, cancel main fragment load"), I.loader.abort()), this.resetTransmuxer(), this.resetLoadingState();
        } else
          this.audioOnly && this.resetTransmuxer();
        var O = this.hls;
        b && O.trigger(k.Events.BUFFER_FLUSHING, { startOffset: 0, endOffset: Number.POSITIVE_INFINITY, type: "audio" }), O.trigger(k.Events.AUDIO_TRACK_SWITCHED, { id: L });
      }
    }, u.onAudioTrackSwitched = function(t, o) {
      var b = o.id, _ = !!this.hls.audioTracks[b].url;
      if (_) {
        var L = this.videoBuffer;
        L && this.mediaBuffer !== L && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = L);
      }
      this.altAudio = _, this.tick();
    }, u.onBufferCreated = function(t, o) {
      var b, _, L = o.tracks, I = !1;
      for (var O in L) {
        var x = L[O];
        if (x.id === "main") {
          if (_ = O, b = x, O === "video") {
            var P = L[O];
            P && (this.videoBuffer = P.buffer);
          }
        } else
          I = !0;
      }
      I && b ? (this.log("Alternate track found, use " + _ + ".buffered to schedule main fragment loading"), this.mediaBuffer = b.buffer) : this.mediaBuffer = this.media;
    }, u.onFragBuffered = function(t, o) {
      var b = o.frag, _ = o.part;
      if (!b || b.type === d.PlaylistLevelType.MAIN) {
        if (this.fragContextChanged(b))
          return this.warn("Fragment " + b.sn + (_ ? " p: " + _.index : "") + " of level " + b.level + " finished buffering, but was aborted. state: " + this.state), void (this.state === S.State.PARSED && (this.state = S.State.IDLE));
        var L = _ ? _.stats : b.stats;
        this.fragLastKbps = Math.round(8 * L.total / (L.buffering.end - L.loading.first)), b.sn !== "initSegment" && (this.fragPrevious = b), this.fragBufferedComplete(b, _);
      }
    }, u.onError = function(t, o) {
      switch (o.details) {
        case v.ErrorDetails.FRAG_LOAD_ERROR:
        case v.ErrorDetails.FRAG_LOAD_TIMEOUT:
        case v.ErrorDetails.KEY_LOAD_ERROR:
        case v.ErrorDetails.KEY_LOAD_TIMEOUT:
          this.onFragmentOrKeyLoadError(d.PlaylistLevelType.MAIN, o);
          break;
        case v.ErrorDetails.LEVEL_LOAD_ERROR:
        case v.ErrorDetails.LEVEL_LOAD_TIMEOUT:
          this.state !== S.State.ERROR && (o.fatal ? (this.warn("" + o.details), this.state = S.State.ERROR) : o.levelRetry || this.state !== S.State.WAITING_LEVEL || (this.state = S.State.IDLE));
          break;
        case v.ErrorDetails.BUFFER_FULL_ERROR:
          if (o.parent === "main" && (this.state === S.State.PARSING || this.state === S.State.PARSED)) {
            var b = !0, _ = this.getFwdBufferInfo(this.media, d.PlaylistLevelType.MAIN);
            _ && _.len > 0.5 && (b = !this.reduceMaxBufferLength(_.len)), b && (this.warn("buffer full error also media.currentTime is not buffered, flush main"), this.immediateLevelSwitch()), this.resetLoadingState();
          }
      }
    }, u.checkBuffer = function() {
      var t = this.media, o = this.gapController;
      if (t && o && t.readyState) {
        var b = C.BufferHelper.getBuffered(t);
        !this.loadedmetadata && b.length ? (this.loadedmetadata = !0, this.seekToStartPos()) : o.poll(this.lastCurrentTime), this.lastCurrentTime = t.currentTime;
      }
    }, u.onFragLoadEmergencyAborted = function() {
      this.state = S.State.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate();
    }, u.onBufferFlushed = function(t, o) {
      var b = o.type;
      if (b !== T.ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
        var _ = (b === T.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
        this.afterBufferFlushed(_, b, d.PlaylistLevelType.MAIN);
      }
    }, u.onLevelsUpdated = function(t, o) {
      this.levels = o.levels;
    }, u.swapAudioCodec = function() {
      this.audioCodecSwap = !this.audioCodecSwap;
    }, u.seekToStartPos = function() {
      var t = this.media, o = t.currentTime, b = this.startPosition;
      if (b >= 0 && o < b) {
        if (t.seeking)
          return void l.logger.log("could not seek to " + b + ", already seeking at " + o);
        var _ = C.BufferHelper.getBuffered(t), L = (_.length ? _.start(0) : 0) - b;
        L > 0 && L < this.config.maxBufferHole && (l.logger.log("adjusting start position by " + L + " to match buffer start"), b += L, this.startPosition = b), this.log("seek to target start position " + b + " from current time " + o), t.currentTime = b;
      }
    }, u._getAudioCodec = function(t) {
      var o = this.config.defaultAudioCodec || t.audioCodec;
      return this.audioCodecSwap && o && (this.log("Swapping audio codec"), o = o.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5"), o;
    }, u._loadBitrateTestFrag = function(t) {
      var o = this;
      this._doFragLoad(t).then(function(b) {
        var _ = o.hls;
        if (b && !_.nextLoadLevel && !o.fragContextChanged(t)) {
          o.fragLoadError = 0, o.state = S.State.IDLE, o.startFragRequested = !1, o.bitrateTest = !1;
          var L = t.stats;
          L.parsing.start = L.parsing.end = L.buffering.start = L.buffering.end = self.performance.now(), _.trigger(k.Events.FRAG_LOADED, b);
        }
      });
    }, u._handleTransmuxComplete = function(t) {
      var o, b = "main", _ = this.hls, L = t.remuxResult, I = t.chunkMeta, O = this.getCurrentContext(I);
      if (!O)
        return this.warn("The loading context changed while buffering fragment " + I.sn + " of level " + I.level + ". This chunk will not be buffered."), void this.resetLiveStartWhenNotLoaded(I.level);
      var x = O.frag, P = O.part, M = O.level, F = L.video, N = L.text, U = L.id3, G = L.initSegment, j = this.altAudio ? void 0 : L.audio;
      if (!this.fragContextChanged(x)) {
        if (this.state = S.State.PARSING, G) {
          G.tracks && (this._bufferInitSegment(M, G.tracks, x, I), _.trigger(k.Events.FRAG_PARSING_INIT_SEGMENT, { frag: x, id: b, tracks: G.tracks }));
          var V = G.initPTS, Y = G.timescale;
          Object(R.isFiniteNumber)(V) && (this.initPTS[x.cc] = V, _.trigger(k.Events.INIT_PTS_FOUND, { frag: x, id: b, initPTS: V, timescale: Y }));
        }
        if (F && L.independent !== !1) {
          if (M.details) {
            var W = F.startPTS, q = F.endPTS, X = F.startDTS, J = F.endDTS;
            if (P)
              P.elementaryStreams[F.type] = { startPTS: W, endPTS: q, startDTS: X, endDTS: J };
            else if (F.firstKeyFrame && F.independent && (this.couldBacktrack = !0), F.dropped && F.independent) {
              if (this.getLoadPosition() + this.config.maxBufferHole < W)
                return void this.backtrack(x);
              x.setElementaryStreamInfo(F.type, x.start, q, x.start, J, !0);
            }
            x.setElementaryStreamInfo(F.type, W, q, X, J), this.bufferFragmentData(F, x, P, I);
          }
        } else if (L.independent === !1)
          return void this.backtrack(x);
        if (j) {
          var rt = j.startPTS, Q = j.endPTS, at = j.startDTS, z = j.endDTS;
          P && (P.elementaryStreams[T.ElementaryStreamTypes.AUDIO] = { startPTS: rt, endPTS: Q, startDTS: at, endDTS: z }), x.setElementaryStreamInfo(T.ElementaryStreamTypes.AUDIO, rt, Q, at, z), this.bufferFragmentData(j, x, P, I);
        }
        if (U != null && (o = U.samples) !== null && o !== void 0 && o.length) {
          var tt = { frag: x, id: b, samples: U.samples };
          _.trigger(k.Events.FRAG_PARSING_METADATA, tt);
        }
        if (N) {
          var it = { frag: x, id: b, samples: N.samples };
          _.trigger(k.Events.FRAG_PARSING_USERDATA, it);
        }
      }
    }, u._bufferInitSegment = function(t, o, b, _) {
      var L = this;
      if (this.state === S.State.PARSING) {
        this.audioOnly = !!o.audio && !o.video, this.altAudio && !this.audioOnly && delete o.audio;
        var I = o.audio, O = o.video, x = o.audiovideo;
        if (I) {
          var P = t.audioCodec, M = navigator.userAgent.toLowerCase();
          this.audioCodecSwitch && (P && (P = P.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5"), I.metadata.channelCount !== 1 && M.indexOf("firefox") === -1 && (P = "mp4a.40.5")), M.indexOf("android") !== -1 && I.container !== "audio/mpeg" && (P = "mp4a.40.2", this.log("Android: force audio codec to " + P)), t.audioCodec && t.audioCodec !== P && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + P + '"'), I.levelCodec = P, I.id = "main", this.log("Init audio buffer, container:" + I.container + ", codecs[selected/level/parsed]=[" + (P || "") + "/" + (t.audioCodec || "") + "/" + I.codec + "]");
        }
        O && (O.levelCodec = t.videoCodec, O.id = "main", this.log("Init video buffer, container:" + O.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + O.codec + "]")), x && this.log("Init audiovideo buffer, container:" + x.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + x.codec + "]"), this.hls.trigger(k.Events.BUFFER_CODECS, o), Object.keys(o).forEach(function(F) {
          var N = o[F].initSegment;
          N != null && N.byteLength && L.hls.trigger(k.Events.BUFFER_APPENDING, { type: F, data: N, frag: b, part: null, chunkMeta: _, parent: b.type });
        }), this.tick();
      }
    }, u.backtrack = function(t) {
      this.couldBacktrack = !0, this.resetTransmuxer(), this.flushBufferGap(t);
      var o = this.fragmentTracker.backtrack(t);
      this.fragPrevious = null, this.nextLoadPosition = t.start, o ? this.resetFragmentLoading(t) : this.state = S.State.BACKTRACKING;
    }, u.checkFragmentChanged = function() {
      var t = this.media, o = null;
      if (t && t.readyState > 1 && t.seeking === !1) {
        var b = t.currentTime;
        if (C.BufferHelper.isBuffered(t, b) ? o = this.getAppendedFrag(b) : C.BufferHelper.isBuffered(t, b + 0.1) && (o = this.getAppendedFrag(b + 0.1)), o) {
          var _ = this.fragPlaying, L = o.level;
          _ && o.sn === _.sn && _.level === L && o.urlId === _.urlId || (this.hls.trigger(k.Events.FRAG_CHANGED, { frag: o }), _ && _.level === L || this.hls.trigger(k.Events.LEVEL_SWITCHED, { level: L }), this.fragPlaying = o);
        }
      }
    }, g = h, (c = [{ key: "nextLevel", get: function() {
      var t = this.nextBufferedFrag;
      return t ? t.level : -1;
    } }, { key: "currentLevel", get: function() {
      var t = this.media;
      if (t) {
        var o = this.getAppendedFrag(t.currentTime);
        if (o)
          return o.level;
      }
      return -1;
    } }, { key: "nextBufferedFrag", get: function() {
      var t = this.media;
      if (t) {
        var o = this.getAppendedFrag(t.currentTime);
        return this.followingBufferedFrag(o);
      }
      return null;
    } }, { key: "forceStartLoad", get: function() {
      return this._forceStartLoad;
    } }]) && e(g.prototype, c), y && e(g, y), h;
  }(S.default);
}, "./src/controller/subtitle-stream-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "SubtitleStreamController", function() {
    return l;
  });
  var R = f("./src/events.ts"), S = f("./src/utils/logger.ts"), A = f("./src/utils/buffer-helper.ts"), k = f("./src/controller/fragment-finders.ts"), C = f("./src/utils/discontinuities.ts"), D = f("./src/controller/level-helper.ts"), d = f("./src/controller/fragment-tracker.ts"), T = f("./src/controller/base-stream-controller.ts"), p = f("./src/types/loader.ts"), m = f("./src/types/level.ts");
  function E(e, s) {
    for (var n = 0; n < s.length; n++) {
      var r = s[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function v(e, s) {
    return (v = Object.setPrototypeOf || function(n, r) {
      return n.__proto__ = r, n;
    })(e, s);
  }
  var l = function(e) {
    var s, n;
    function r(c, y) {
      var u;
      return (u = e.call(this, c, y, "[subtitle-stream-controller]") || this).levels = [], u.currentTrackId = -1, u.tracksBuffered = [], u.mainDetails = null, u._registerListeners(), u;
    }
    n = e, (s = r).prototype = Object.create(n.prototype), s.prototype.constructor = s, v(s, n);
    var a, i, h, g = r.prototype;
    return g.onHandlerDestroying = function() {
      this._unregisterListeners(), this.mainDetails = null;
    }, g._registerListeners = function() {
      var c = this.hls;
      c.on(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), c.on(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this), c.on(R.Events.MANIFEST_LOADING, this.onManifestLoading, this), c.on(R.Events.LEVEL_LOADED, this.onLevelLoaded, this), c.on(R.Events.ERROR, this.onError, this), c.on(R.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), c.on(R.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), c.on(R.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), c.on(R.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), c.on(R.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
    }, g._unregisterListeners = function() {
      var c = this.hls;
      c.off(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), c.off(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this), c.off(R.Events.MANIFEST_LOADING, this.onManifestLoading, this), c.off(R.Events.LEVEL_LOADED, this.onLevelLoaded, this), c.off(R.Events.ERROR, this.onError, this), c.off(R.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), c.off(R.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), c.off(R.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), c.off(R.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), c.off(R.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
    }, g.startLoad = function() {
      this.stopLoad(), this.state = T.State.IDLE, this.setInterval(500), this.tick();
    }, g.onManifestLoading = function() {
      this.mainDetails = null, this.fragmentTracker.removeAllFragments();
    }, g.onLevelLoaded = function(c, y) {
      this.mainDetails = y.details;
    }, g.onSubtitleFragProcessed = function(c, y) {
      var u = y.frag, t = y.success;
      if (this.fragPrevious = u, this.state = T.State.IDLE, t) {
        var o = this.tracksBuffered[this.currentTrackId];
        if (o) {
          for (var b, _ = u.start, L = 0; L < o.length; L++)
            if (_ >= o[L].start && _ <= o[L].end) {
              b = o[L];
              break;
            }
          var I = u.start + u.duration;
          b ? b.end = I : (b = { start: _, end: I }, o.push(b)), this.fragmentTracker.fragBuffered(u);
        }
      }
    }, g.onBufferFlushing = function(c, y) {
      var u = y.startOffset, t = y.endOffset;
      if (u === 0 && t !== Number.POSITIVE_INFINITY) {
        var o = this.currentTrackId, b = this.levels;
        if (!b.length || !b[o] || !b[o].details)
          return;
        var _ = t - b[o].details.targetduration;
        if (_ <= 0)
          return;
        y.endOffsetSubtitles = Math.max(0, _), this.tracksBuffered.forEach(function(L) {
          for (var I = 0; I < L.length; )
            if (L[I].end <= _)
              L.shift();
            else {
              if (!(L[I].start < _))
                break;
              L[I].start = _, I++;
            }
        }), this.fragmentTracker.removeFragmentsInRange(u, _, p.PlaylistLevelType.SUBTITLE);
      }
    }, g.onError = function(c, y) {
      var u, t = y.frag;
      t && t.type === p.PlaylistLevelType.SUBTITLE && ((u = this.fragCurrent) !== null && u !== void 0 && u.loader && this.fragCurrent.loader.abort(), this.state = T.State.IDLE);
    }, g.onSubtitleTracksUpdated = function(c, y) {
      var u = this, t = y.subtitleTracks;
      this.tracksBuffered = [], this.levels = t.map(function(o) {
        return new m.Level(o);
      }), this.fragmentTracker.removeAllFragments(), this.fragPrevious = null, this.levels.forEach(function(o) {
        u.tracksBuffered[o.id] = [];
      }), this.mediaBuffer = null;
    }, g.onSubtitleTrackSwitch = function(c, y) {
      if (this.currentTrackId = y.id, this.levels.length && this.currentTrackId !== -1) {
        var u = this.levels[this.currentTrackId];
        u != null && u.details ? (this.mediaBuffer = this.mediaBufferTimeRanges, this.setInterval(500)) : this.mediaBuffer = null;
      } else
        this.clearInterval();
    }, g.onSubtitleTrackLoaded = function(c, y) {
      var u, t = y.details, o = y.id, b = this.currentTrackId, _ = this.levels;
      if (_.length) {
        var L = _[b];
        if (!(o >= _.length || o !== b) && L) {
          if (this.mediaBuffer = this.mediaBufferTimeRanges, t.live || (u = L.details) !== null && u !== void 0 && u.live) {
            var I = this.mainDetails;
            if (t.deltaUpdateFailed || !I)
              return;
            var O = I.fragments[0];
            L.details ? this.alignPlaylists(t, L.details) === 0 && O && Object(D.addSliding)(t, O.start) : t.hasProgramDateTime && I.hasProgramDateTime ? Object(C.alignPDT)(t, I) : O && Object(D.addSliding)(t, O.start);
          }
          L.details = t, this.levelLastLoaded = o, this.tick(), t.live && !this.fragCurrent && this.media && this.state === T.State.IDLE && (Object(k.findFragmentByPTS)(null, t.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), L.details = void 0));
        }
      }
    }, g._handleFragmentLoadComplete = function(c) {
      var y = c.frag, u = c.payload, t = y.decryptdata, o = this.hls;
      if (!this.fragContextChanged(y) && u && u.byteLength > 0 && t && t.key && t.iv && t.method === "AES-128") {
        var b = performance.now();
        this.decrypter.webCryptoDecrypt(new Uint8Array(u), t.key.buffer, t.iv.buffer).then(function(_) {
          var L = performance.now();
          o.trigger(R.Events.FRAG_DECRYPTED, { frag: y, payload: _, stats: { tstart: b, tdecrypt: L } });
        });
      }
    }, g.doTick = function() {
      if (this.media) {
        if (this.state === T.State.IDLE) {
          var c, y = this.currentTrackId, u = this.levels;
          if (!u.length || !u[y] || !u[y].details)
            return;
          var t = u[y].details, o = t.targetduration, b = this.config, _ = this.media, L = A.BufferHelper.bufferedInfo(this.mediaBufferTimeRanges, _.currentTime - o, b.maxBufferHole), I = L.end;
          if (L.len > this.getMaxBufferLength() + o)
            return;
          console.assert(t, "Subtitle track details are defined on idle subtitle stream controller tick");
          var O, x = t.fragments, P = x.length, M = t.edge, F = this.fragPrevious;
          if (I < M) {
            var N = b.maxFragLookUpTolerance;
            F && t.hasProgramDateTime && (O = Object(k.findFragmentByPDT)(x, F.endProgramDateTime, N)), O || !(O = Object(k.findFragmentByPTS)(F, x, I, N)) && F && F.start < x[0].start && (O = x[0]);
          } else
            O = x[P - 1];
          (c = O) !== null && c !== void 0 && c.encrypted ? (S.logger.log("Loading key for " + O.sn), this.state = T.State.KEY_LOADING, this.hls.trigger(R.Events.KEY_LOADING, { frag: O })) : O && this.fragmentTracker.getState(O) === d.FragmentState.NOT_LOADED && this.loadFragment(O, t, I);
        }
      } else
        this.state = T.State.IDLE;
    }, g.loadFragment = function(c, y, u) {
      this.fragCurrent = c, e.prototype.loadFragment.call(this, c, y, u);
    }, a = r, (i = [{ key: "mediaBufferTimeRanges", get: function() {
      return this.tracksBuffered[this.currentTrackId] || [];
    } }]) && E(a.prototype, i), h && E(a, h), r;
  }(T.default);
}, "./src/controller/subtitle-track-controller.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/events.ts"), S = f("./src/utils/texttrack-utils.ts"), A = f("./src/controller/base-playlist-controller.ts"), k = f("./src/types/loader.ts");
  function C(p, m) {
    for (var E = 0; E < m.length; E++) {
      var v = m[E];
      v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(p, v.key, v);
    }
  }
  function D(p, m) {
    return (D = Object.setPrototypeOf || function(E, v) {
      return E.__proto__ = v, E;
    })(p, m);
  }
  var d = function(p) {
    var m, E;
    function v(r) {
      var a;
      return (a = p.call(this, r, "[subtitle-track-controller]") || this).media = null, a.tracks = [], a.groupId = null, a.tracksInGroup = [], a.trackId = -1, a.selectDefaultTrack = !0, a.queuedDefaultTrack = -1, a.trackChangeListener = function() {
        return a.onTextTracksChanged();
      }, a.asyncPollTrackChange = function() {
        return a.pollTrackChange(0);
      }, a.useTextTrackPolling = !1, a.subtitlePollingInterval = -1, a.subtitleDisplay = !0, a.registerListeners(), a;
    }
    E = p, (m = v).prototype = Object.create(E.prototype), m.prototype.constructor = m, D(m, E);
    var l, e, s, n = v.prototype;
    return n.destroy = function() {
      this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.trackChangeListener = this.asyncPollTrackChange = null, p.prototype.destroy.call(this);
    }, n.registerListeners = function() {
      var r = this.hls;
      r.on(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), r.on(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this), r.on(R.Events.MANIFEST_LOADING, this.onManifestLoading, this), r.on(R.Events.MANIFEST_PARSED, this.onManifestParsed, this), r.on(R.Events.LEVEL_LOADING, this.onLevelLoading, this), r.on(R.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), r.on(R.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), r.on(R.Events.ERROR, this.onError, this);
    }, n.unregisterListeners = function() {
      var r = this.hls;
      r.off(R.Events.MEDIA_ATTACHED, this.onMediaAttached, this), r.off(R.Events.MEDIA_DETACHING, this.onMediaDetaching, this), r.off(R.Events.MANIFEST_LOADING, this.onManifestLoading, this), r.off(R.Events.MANIFEST_PARSED, this.onManifestParsed, this), r.off(R.Events.LEVEL_LOADING, this.onLevelLoading, this), r.off(R.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), r.off(R.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), r.off(R.Events.ERROR, this.onError, this);
    }, n.onMediaAttached = function(r, a) {
      this.media = a.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange));
    }, n.pollTrackChange = function(r) {
      self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.trackChangeListener, r);
    }, n.onMediaDetaching = function() {
      this.media && (self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), T(this.media.textTracks).forEach(function(r) {
        Object(S.clearCurrentCues)(r);
      }), this.subtitleTrack = -1, this.media = null);
    }, n.onManifestLoading = function() {
      this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.selectDefaultTrack = !0;
    }, n.onManifestParsed = function(r, a) {
      this.tracks = a.subtitleTracks;
    }, n.onSubtitleTrackLoaded = function(r, a) {
      var i = a.id, h = a.details, g = this.trackId, c = this.tracksInGroup[g];
      if (c) {
        var y = c.details;
        c.details = a.details, this.log("subtitle track " + i + " loaded [" + h.startSN + "-" + h.endSN + "]"), i === this.trackId && (this.retryCount = 0, this.playlistLoaded(i, a, y));
      } else
        this.warn("Invalid subtitle track id " + i);
    }, n.onLevelLoading = function(r, a) {
      this.switchLevel(a.level);
    }, n.onLevelSwitching = function(r, a) {
      this.switchLevel(a.level);
    }, n.switchLevel = function(r) {
      var a = this.hls.levels[r];
      if (a != null && a.textGroupIds) {
        var i = a.textGroupIds[a.urlId];
        if (this.groupId !== i) {
          var h = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0, g = this.tracks.filter(function(u) {
            return !i || u.groupId === i;
          });
          this.tracksInGroup = g;
          var c = this.findTrackId(h == null ? void 0 : h.name) || this.findTrackId();
          this.groupId = i;
          var y = { subtitleTracks: g };
          this.log("Updating subtitle tracks, " + g.length + ' track(s) found in "' + i + '" group-id'), this.hls.trigger(R.Events.SUBTITLE_TRACKS_UPDATED, y), c !== -1 && this.setSubtitleTrack(c, h);
        }
      }
    }, n.findTrackId = function(r) {
      for (var a = this.tracksInGroup, i = 0; i < a.length; i++) {
        var h = a[i];
        if ((!this.selectDefaultTrack || h.default) && (!r || r === h.name))
          return h.id;
      }
      return -1;
    }, n.onError = function(r, a) {
      p.prototype.onError.call(this, r, a), !a.fatal && a.context && a.context.type === k.PlaylistContextType.SUBTITLE_TRACK && a.context.id === this.trackId && a.context.groupId === this.groupId && this.retryLoadingOrFail(a);
    }, n.loadPlaylist = function(r) {
      var a = this.tracksInGroup[this.trackId];
      if (this.shouldLoadTrack(a)) {
        var i = a.id, h = a.groupId, g = a.url;
        if (r)
          try {
            g = r.addDirectives(g);
          } catch (c) {
            this.warn("Could not construct new URL with HLS Delivery Directives: " + c);
          }
        this.log("Loading subtitle playlist for id " + i), this.hls.trigger(R.Events.SUBTITLE_TRACK_LOADING, { url: g, id: i, groupId: h, deliveryDirectives: r || null });
      }
    }, n.toggleTrackModes = function(r) {
      var a = this, i = this.media, h = this.subtitleDisplay, g = this.trackId;
      if (i) {
        var c = T(i.textTracks), y = c.filter(function(o) {
          return o.groupId === a.groupId;
        });
        if (r === -1)
          [].slice.call(c).forEach(function(o) {
            o.mode = "disabled";
          });
        else {
          var u = y[g];
          u && (u.mode = "disabled");
        }
        var t = y[r];
        t && (t.mode = h ? "showing" : "hidden");
      }
    }, n.setSubtitleTrack = function(r, a) {
      var i, h = this.tracksInGroup;
      if (this.media) {
        if (this.trackId !== r && this.toggleTrackModes(r), !(this.trackId === r && (r === -1 || (i = h[r]) !== null && i !== void 0 && i.details) || r < -1 || r >= h.length)) {
          this.clearTimer();
          var g = h[r];
          if (this.log("Switching to subtitle track " + r), this.trackId = r, g) {
            var c = g.id, y = g.groupId, u = y === void 0 ? "" : y, t = g.name, o = g.type, b = g.url;
            this.hls.trigger(R.Events.SUBTITLE_TRACK_SWITCH, { id: c, groupId: u, name: t, type: o, url: b });
            var _ = this.switchParams(g.url, a == null ? void 0 : a.details);
            this.loadPlaylist(_);
          } else
            this.hls.trigger(R.Events.SUBTITLE_TRACK_SWITCH, { id: r });
        }
      } else
        this.queuedDefaultTrack = r;
    }, n.onTextTracksChanged = function() {
      if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), this.media && this.hls.config.renderTextTracksNatively) {
        for (var r = -1, a = T(this.media.textTracks), i = 0; i < a.length; i++)
          if (a[i].mode === "hidden")
            r = i;
          else if (a[i].mode === "showing") {
            r = i;
            break;
          }
        this.subtitleTrack !== r && (this.subtitleTrack = r);
      }
    }, l = v, (e = [{ key: "subtitleTracks", get: function() {
      return this.tracksInGroup;
    } }, { key: "subtitleTrack", get: function() {
      return this.trackId;
    }, set: function(r) {
      this.selectDefaultTrack = !1;
      var a = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0;
      this.setSubtitleTrack(r, a);
    } }]) && C(l.prototype, e), s && C(l, s), v;
  }(A.default);
  function T(p) {
    for (var m = [], E = 0; E < p.length; E++) {
      var v = p[E];
      v.kind === "subtitles" && v.label && m.push(p[E]);
    }
    return m;
  }
  w.default = d;
}, "./src/controller/timeline-controller.ts": function(B, w, f) {
  f.r(w), f.d(w, "TimelineController", function() {
    return m;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/events.ts"), A = f("./src/utils/cea-608-parser.ts"), k = f("./src/utils/output-filter.ts"), C = f("./src/utils/webvtt-parser.ts"), D = f("./src/utils/texttrack-utils.ts"), d = f("./src/utils/imsc1-ttml-parser.ts"), T = f("./src/types/loader.ts"), p = f("./src/utils/logger.ts"), m = function() {
    function v(e) {
      if (this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.timescale = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastSn = -1, this.prevCC = -1, this.vttCCs = { ccOffset: 0, presentationOffset: 0, 0: { start: 0, prevCC: -1, new: !1 } }, this.captionsProperties = void 0, this.hls = e, this.config = e.config, this.Cues = e.config.cueHandler, this.captionsProperties = { textTrack1: { label: this.config.captionsTextTrack1Label, languageCode: this.config.captionsTextTrack1LanguageCode }, textTrack2: { label: this.config.captionsTextTrack2Label, languageCode: this.config.captionsTextTrack2LanguageCode }, textTrack3: { label: this.config.captionsTextTrack3Label, languageCode: this.config.captionsTextTrack3LanguageCode }, textTrack4: { label: this.config.captionsTextTrack4Label, languageCode: this.config.captionsTextTrack4LanguageCode } }, this.config.enableCEA708Captions) {
        var s = new k.default(this, "textTrack1"), n = new k.default(this, "textTrack2"), r = new k.default(this, "textTrack3"), a = new k.default(this, "textTrack4");
        this.cea608Parser1 = new A.default(1, s, n), this.cea608Parser2 = new A.default(3, r, a);
      }
      e.on(S.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(S.Events.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(S.Events.MANIFEST_LOADING, this.onManifestLoading, this), e.on(S.Events.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(S.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(S.Events.FRAG_LOADING, this.onFragLoading, this), e.on(S.Events.FRAG_LOADED, this.onFragLoaded, this), e.on(S.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.on(S.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), e.on(S.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(S.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.on(S.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
    }
    var l = v.prototype;
    return l.destroy = function() {
      var e = this.hls;
      e.off(S.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(S.Events.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(S.Events.MANIFEST_LOADING, this.onManifestLoading, this), e.off(S.Events.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(S.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(S.Events.FRAG_LOADING, this.onFragLoading, this), e.off(S.Events.FRAG_LOADED, this.onFragLoaded, this), e.off(S.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.off(S.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), e.off(S.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(S.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.off(S.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null;
    }, l.addCues = function(e, s, n, r, a) {
      for (var i, h, g, c, y = !1, u = a.length; u--; ) {
        var t = a[u], o = (i = t[0], h = t[1], g = s, c = n, Math.min(h, c) - Math.max(i, g));
        if (o >= 0 && (t[0] = Math.min(t[0], s), t[1] = Math.max(t[1], n), y = !0, o / (n - s) > 0.5))
          return;
      }
      if (y || a.push([s, n]), this.config.renderTextTracksNatively) {
        var b = this.captionsTracks[e];
        this.Cues.newCue(b, s, n, r);
      } else {
        var _ = this.Cues.newCue(null, s, n, r);
        this.hls.trigger(S.Events.CUES_PARSED, { type: "captions", cues: _, track: e });
      }
    }, l.onInitPtsFound = function(e, s) {
      var n = this, r = s.frag, a = s.id, i = s.initPTS, h = s.timescale, g = this.unparsedVttFrags;
      a === "main" && (this.initPTS[r.cc] = i, this.timescale[r.cc] = h), g.length && (this.unparsedVttFrags = [], g.forEach(function(c) {
        n.onFragLoaded(S.Events.FRAG_LOADED, c);
      }));
    }, l.getExistingTrack = function(e) {
      var s = this.media;
      if (s)
        for (var n = 0; n < s.textTracks.length; n++) {
          var r = s.textTracks[n];
          if (r[e])
            return r;
        }
      return null;
    }, l.createCaptionsTrack = function(e) {
      this.config.renderTextTracksNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e);
    }, l.createNativeTrack = function(e) {
      if (!this.captionsTracks[e]) {
        var s = this.captionsProperties, n = this.captionsTracks, r = this.media, a = s[e], i = a.label, h = a.languageCode, g = this.getExistingTrack(e);
        if (g)
          n[e] = g, Object(D.clearCurrentCues)(n[e]), Object(D.sendAddTrackEvent)(n[e], r);
        else {
          var c = this.createTextTrack("captions", i, h);
          c && (c[e] = !0, n[e] = c);
        }
      }
    }, l.createNonNativeTrack = function(e) {
      if (!this.nonNativeCaptionsTracks[e]) {
        var s = this.captionsProperties[e];
        if (s) {
          var n = { _id: e, label: s.label, kind: "captions", default: !!s.media && !!s.media.default, closedCaptions: s.media };
          this.nonNativeCaptionsTracks[e] = n, this.hls.trigger(S.Events.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: [n] });
        }
      }
    }, l.createTextTrack = function(e, s, n) {
      var r = this.media;
      if (r)
        return r.addTextTrack(e, s, n);
    }, l.onMediaAttaching = function(e, s) {
      this.media = s.media, this._cleanTracks();
    }, l.onMediaDetaching = function() {
      var e = this.captionsTracks;
      Object.keys(e).forEach(function(s) {
        Object(D.clearCurrentCues)(e[s]), delete e[s];
      }), this.nonNativeCaptionsTracks = {};
    }, l.onManifestLoading = function() {
      this.lastSn = -1, this.prevCC = -1, this.vttCCs = { ccOffset: 0, presentationOffset: 0, 0: { start: 0, prevCC: -1, new: !1 } }, this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.timescale = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
    }, l._cleanTracks = function() {
      var e = this.media;
      if (e) {
        var s = e.textTracks;
        if (s)
          for (var n = 0; n < s.length; n++)
            Object(D.clearCurrentCues)(s[n]);
      }
    }, l.onSubtitleTracksUpdated = function(e, s) {
      var n = this;
      this.textTracks = [];
      var r = s.subtitleTracks || [], a = r.some(function(c) {
        return c.textCodec === d.IMSC1_CODEC;
      });
      if (this.config.enableWebVTT || a && this.config.enableIMSC1) {
        var i = this.tracks && r && this.tracks.length === r.length;
        if (this.tracks = r || [], this.config.renderTextTracksNatively) {
          var h = this.media ? this.media.textTracks : [];
          this.tracks.forEach(function(c, y) {
            var u;
            if (y < h.length) {
              for (var t = null, o = 0; o < h.length; o++)
                if (E(h[o], c)) {
                  t = h[o];
                  break;
                }
              t && (u = t);
            }
            u ? Object(D.clearCurrentCues)(u) : (u = n.createTextTrack("subtitles", c.name, c.lang)) && (u.mode = "disabled"), u && (u.groupId = c.groupId, n.textTracks.push(u));
          });
        } else if (!i && this.tracks && this.tracks.length) {
          var g = this.tracks.map(function(c) {
            return { label: c.name, kind: c.type.toLowerCase(), default: c.default, subtitleTrack: c };
          });
          this.hls.trigger(S.Events.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: g });
        }
      }
    }, l.onManifestLoaded = function(e, s) {
      var n = this;
      this.config.enableCEA708Captions && s.captions && s.captions.forEach(function(r) {
        var a = /(?:CC|SERVICE)([1-4])/.exec(r.instreamId);
        if (a) {
          var i = "textTrack" + a[1], h = n.captionsProperties[i];
          h && (h.label = r.name, r.lang && (h.languageCode = r.lang), h.media = r);
        }
      });
    }, l.onFragLoading = function(e, s) {
      var n = this.cea608Parser1, r = this.cea608Parser2, a = this.lastSn;
      if (this.enabled && n && r && s.frag.type === T.PlaylistLevelType.MAIN) {
        var i = s.frag.sn;
        i !== a + 1 && (n.reset(), r.reset()), this.lastSn = i;
      }
    }, l.onFragLoaded = function(e, s) {
      var n = s.frag, r = s.payload, a = this.initPTS, i = this.unparsedVttFrags;
      if (n.type === T.PlaylistLevelType.SUBTITLE)
        if (r.byteLength) {
          if (!Object(R.isFiniteNumber)(a[n.cc]))
            return i.push(s), void (a.length && this.hls.trigger(S.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: n, error: new Error("Missing initial subtitle PTS") }));
          var h = n.decryptdata;
          if (h == null || h.key == null || h.method !== "AES-128") {
            var g = this.tracks[n.level], c = this.vttCCs;
            c[n.cc] || (c[n.cc] = { start: n.start, prevCC: this.prevCC, new: !0 }, this.prevCC = n.cc), g && g.textCodec === d.IMSC1_CODEC ? this._parseIMSC1(n, r) : this._parseVTTs(n, r, c);
          }
        } else
          this.hls.trigger(S.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: n, error: new Error("Empty subtitle payload") });
    }, l._parseIMSC1 = function(e, s) {
      var n = this, r = this.hls;
      Object(d.parseIMSC1)(s, this.initPTS[e.cc], this.timescale[e.cc], function(a) {
        n._appendCues(a, e.level), r.trigger(S.Events.SUBTITLE_FRAG_PROCESSED, { success: !0, frag: e });
      }, function(a) {
        p.logger.log("Failed to parse IMSC1: " + a), r.trigger(S.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: e, error: a });
      });
    }, l._parseVTTs = function(e, s, n) {
      var r = this, a = this.hls;
      Object(C.parseWebVTT)(s, this.initPTS[e.cc], this.timescale[e.cc], n, e.cc, e.start, function(i) {
        r._appendCues(i, e.level), a.trigger(S.Events.SUBTITLE_FRAG_PROCESSED, { success: !0, frag: e });
      }, function(i) {
        r._fallbackToIMSC1(e, s), p.logger.log("Failed to parse VTT cue: " + i), a.trigger(S.Events.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: e, error: i });
      });
    }, l._fallbackToIMSC1 = function(e, s) {
      var n = this, r = this.tracks[e.level];
      r.textCodec || Object(d.parseIMSC1)(s, this.initPTS[e.cc], this.timescale[e.cc], function() {
        r.textCodec = d.IMSC1_CODEC, n._parseIMSC1(e, s);
      }, function() {
        r.textCodec = "wvtt";
      });
    }, l._appendCues = function(e, s) {
      var n = this.hls;
      if (this.config.renderTextTracksNatively) {
        var r = this.textTracks[s];
        if (r.mode === "disabled")
          return;
        e.forEach(function(i) {
          return Object(D.addCueToTrack)(r, i);
        });
      } else {
        var a = this.tracks[s].default ? "default" : "subtitles" + s;
        n.trigger(S.Events.CUES_PARSED, { type: "subtitles", cues: e, track: a });
      }
    }, l.onFragDecrypted = function(e, s) {
      var n = s.frag;
      if (n.type === T.PlaylistLevelType.SUBTITLE) {
        if (!Object(R.isFiniteNumber)(this.initPTS[n.cc]))
          return void this.unparsedVttFrags.push(s);
        this.onFragLoaded(S.Events.FRAG_LOADED, s);
      }
    }, l.onSubtitleTracksCleared = function() {
      this.tracks = [], this.captionsTracks = {};
    }, l.onFragParsingUserdata = function(e, s) {
      var n = this.cea608Parser1, r = this.cea608Parser2;
      if (this.enabled && n && r)
        for (var a = 0; a < s.samples.length; a++) {
          var i = s.samples[a].bytes;
          if (i) {
            var h = this.extractCea608Data(i);
            n.addData(s.samples[a].pts, h[0]), r.addData(s.samples[a].pts, h[1]);
          }
        }
    }, l.onBufferFlushing = function(e, s) {
      var n = s.startOffset, r = s.endOffset, a = s.endOffsetSubtitles, i = s.type, h = this.media;
      if (h && !(h.currentTime < r)) {
        if (!i || i === "video") {
          var g = this.captionsTracks;
          Object.keys(g).forEach(function(y) {
            return Object(D.removeCuesInRange)(g[y], n, r);
          });
        }
        if (this.config.renderTextTracksNatively && n === 0 && a !== void 0) {
          var c = this.textTracks;
          Object.keys(c).forEach(function(y) {
            return Object(D.removeCuesInRange)(c[y], n, a);
          });
        }
      }
    }, l.extractCea608Data = function(e) {
      for (var s = 31 & e[0], n = 2, r = [[], []], a = 0; a < s; a++) {
        var i = e[n++], h = 127 & e[n++], g = 127 & e[n++], c = 3 & i;
        h === 0 && g === 0 || 4 & i && (c !== 0 && c !== 1 || (r[c].push(h), r[c].push(g)));
      }
      return r;
    }, v;
  }();
  function E(v, l) {
    return v && v.label === l.name && !(v.textTrack1 || v.textTrack2);
  }
}, "./src/crypt/aes-crypto.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return R;
  });
  var R = function() {
    function S(A, k) {
      this.subtle = void 0, this.aesIV = void 0, this.subtle = A, this.aesIV = k;
    }
    return S.prototype.decrypt = function(A, k) {
      return this.subtle.decrypt({ name: "AES-CBC", iv: this.aesIV }, k, A);
    }, S;
  }();
}, "./src/crypt/aes-decryptor.ts": function(B, w, f) {
  f.r(w), f.d(w, "removePadding", function() {
    return S;
  }), f.d(w, "default", function() {
    return A;
  });
  var R = f("./src/utils/typed-array.ts");
  function S(k) {
    var C = k.byteLength, D = C && new DataView(k.buffer).getUint8(C - 1);
    return D ? Object(R.sliceUint8)(k, 0, C - D) : k;
  }
  var A = function() {
    function k() {
      this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable();
    }
    var C = k.prototype;
    return C.uint8ArrayToUint32Array_ = function(D) {
      for (var d = new DataView(D), T = new Uint32Array(4), p = 0; p < 4; p++)
        T[p] = d.getUint32(4 * p);
      return T;
    }, C.initTable = function() {
      var D = this.sBox, d = this.invSBox, T = this.subMix, p = T[0], m = T[1], E = T[2], v = T[3], l = this.invSubMix, e = l[0], s = l[1], n = l[2], r = l[3], a = new Uint32Array(256), i = 0, h = 0, g = 0;
      for (g = 0; g < 256; g++)
        a[g] = g < 128 ? g << 1 : g << 1 ^ 283;
      for (g = 0; g < 256; g++) {
        var c = h ^ h << 1 ^ h << 2 ^ h << 3 ^ h << 4;
        c = c >>> 8 ^ 255 & c ^ 99, D[i] = c, d[c] = i;
        var y = a[i], u = a[y], t = a[u], o = 257 * a[c] ^ 16843008 * c;
        p[i] = o << 24 | o >>> 8, m[i] = o << 16 | o >>> 16, E[i] = o << 8 | o >>> 24, v[i] = o, o = 16843009 * t ^ 65537 * u ^ 257 * y ^ 16843008 * i, e[c] = o << 24 | o >>> 8, s[c] = o << 16 | o >>> 16, n[c] = o << 8 | o >>> 24, r[c] = o, i ? (i = y ^ a[a[a[t ^ y]]], h ^= a[a[h]]) : i = h = 1;
      }
    }, C.expandKey = function(D) {
      for (var d = this.uint8ArrayToUint32Array_(D), T = !0, p = 0; p < d.length && T; )
        T = d[p] === this.key[p], p++;
      if (!T) {
        this.key = d;
        var m = this.keySize = d.length;
        if (m !== 4 && m !== 6 && m !== 8)
          throw new Error("Invalid aes key size=" + m);
        var E, v, l, e, s = this.ksRows = 4 * (m + 6 + 1), n = this.keySchedule = new Uint32Array(s), r = this.invKeySchedule = new Uint32Array(s), a = this.sBox, i = this.rcon, h = this.invSubMix, g = h[0], c = h[1], y = h[2], u = h[3];
        for (E = 0; E < s; E++)
          E < m ? l = n[E] = d[E] : (e = l, E % m == 0 ? (e = a[(e = e << 8 | e >>> 24) >>> 24] << 24 | a[e >>> 16 & 255] << 16 | a[e >>> 8 & 255] << 8 | a[255 & e], e ^= i[E / m | 0] << 24) : m > 6 && E % m == 4 && (e = a[e >>> 24] << 24 | a[e >>> 16 & 255] << 16 | a[e >>> 8 & 255] << 8 | a[255 & e]), n[E] = l = (n[E - m] ^ e) >>> 0);
        for (v = 0; v < s; v++)
          E = s - v, e = 3 & v ? n[E] : n[E - 4], r[v] = v < 4 || E <= 4 ? e : g[a[e >>> 24]] ^ c[a[e >>> 16 & 255]] ^ y[a[e >>> 8 & 255]] ^ u[a[255 & e]], r[v] = r[v] >>> 0;
      }
    }, C.networkToHostOrderSwap = function(D) {
      return D << 24 | (65280 & D) << 8 | (16711680 & D) >> 8 | D >>> 24;
    }, C.decrypt = function(D, d, T) {
      for (var p, m, E, v, l, e, s, n, r, a, i, h, g, c, y = this.keySize + 6, u = this.invKeySchedule, t = this.invSBox, o = this.invSubMix, b = o[0], _ = o[1], L = o[2], I = o[3], O = this.uint8ArrayToUint32Array_(T), x = O[0], P = O[1], M = O[2], F = O[3], N = new Int32Array(D), U = new Int32Array(N.length), G = this.networkToHostOrderSwap; d < N.length; ) {
        for (r = G(N[d]), a = G(N[d + 1]), i = G(N[d + 2]), h = G(N[d + 3]), l = r ^ u[0], e = h ^ u[1], s = i ^ u[2], n = a ^ u[3], g = 4, c = 1; c < y; c++)
          p = b[l >>> 24] ^ _[e >> 16 & 255] ^ L[s >> 8 & 255] ^ I[255 & n] ^ u[g], m = b[e >>> 24] ^ _[s >> 16 & 255] ^ L[n >> 8 & 255] ^ I[255 & l] ^ u[g + 1], E = b[s >>> 24] ^ _[n >> 16 & 255] ^ L[l >> 8 & 255] ^ I[255 & e] ^ u[g + 2], v = b[n >>> 24] ^ _[l >> 16 & 255] ^ L[e >> 8 & 255] ^ I[255 & s] ^ u[g + 3], l = p, e = m, s = E, n = v, g += 4;
        p = t[l >>> 24] << 24 ^ t[e >> 16 & 255] << 16 ^ t[s >> 8 & 255] << 8 ^ t[255 & n] ^ u[g], m = t[e >>> 24] << 24 ^ t[s >> 16 & 255] << 16 ^ t[n >> 8 & 255] << 8 ^ t[255 & l] ^ u[g + 1], E = t[s >>> 24] << 24 ^ t[n >> 16 & 255] << 16 ^ t[l >> 8 & 255] << 8 ^ t[255 & e] ^ u[g + 2], v = t[n >>> 24] << 24 ^ t[l >> 16 & 255] << 16 ^ t[e >> 8 & 255] << 8 ^ t[255 & s] ^ u[g + 3], U[d] = G(p ^ x), U[d + 1] = G(v ^ P), U[d + 2] = G(E ^ M), U[d + 3] = G(m ^ F), x = r, P = a, M = i, F = h, d += 4;
      }
      return U.buffer;
    }, k;
  }();
}, "./src/crypt/decrypter.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return d;
  });
  var R = f("./src/crypt/aes-crypto.ts"), S = f("./src/crypt/fast-aes-key.ts"), A = f("./src/crypt/aes-decryptor.ts"), k = f("./src/utils/logger.ts"), C = f("./src/utils/mp4-tools.ts"), D = f("./src/utils/typed-array.ts"), d = function() {
    function T(m, E, v) {
      var l = (v === void 0 ? {} : v).removePKCS7Padding, e = l === void 0 || l;
      if (this.logEnabled = !0, this.observer = void 0, this.config = void 0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.observer = m, this.config = E, this.removePKCS7Padding = e, e)
        try {
          var s = self.crypto;
          s && (this.subtle = s.subtle || s.webkitSubtle);
        } catch {
        }
      this.subtle === null && (this.config.enableSoftwareAES = !0);
    }
    var p = T.prototype;
    return p.destroy = function() {
      this.observer = null;
    }, p.isSync = function() {
      return this.config.enableSoftwareAES;
    }, p.flush = function() {
      var m = this.currentResult;
      if (m) {
        var E = new Uint8Array(m);
        return this.reset(), this.removePKCS7Padding ? Object(A.removePadding)(E) : E;
      }
      this.reset();
    }, p.reset = function() {
      this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
    }, p.decrypt = function(m, E, v, l) {
      if (this.config.enableSoftwareAES) {
        this.softwareDecrypt(new Uint8Array(m), E, v);
        var e = this.flush();
        e && l(e.buffer);
      } else
        this.webCryptoDecrypt(new Uint8Array(m), E, v).then(l);
    }, p.softwareDecrypt = function(m, E, v) {
      var l = this.currentIV, e = this.currentResult, s = this.remainderData;
      this.logOnce("JS AES decrypt"), s && (m = Object(C.appendUint8Array)(s, m), this.remainderData = null);
      var n = this.getValidChunk(m);
      if (!n.length)
        return null;
      l && (v = l);
      var r = this.softwareDecrypter;
      r || (r = this.softwareDecrypter = new A.default()), r.expandKey(E);
      var a = e;
      return this.currentResult = r.decrypt(n.buffer, 0, v), this.currentIV = Object(D.sliceUint8)(n, -16).buffer, a || null;
    }, p.webCryptoDecrypt = function(m, E, v) {
      var l = this, e = this.subtle;
      return this.key === E && this.fastAesKey || (this.key = E, this.fastAesKey = new S.default(e, E)), this.fastAesKey.expandKey().then(function(s) {
        return e ? new R.default(e, v).decrypt(m.buffer, s) : Promise.reject(new Error("web crypto not initialized"));
      }).catch(function(s) {
        return l.onWebCryptoError(s, m, E, v);
      });
    }, p.onWebCryptoError = function(m, E, v, l) {
      return k.logger.warn("[decrypter.ts]: WebCrypto Error, disable WebCrypto API:", m), this.config.enableSoftwareAES = !0, this.logEnabled = !0, this.softwareDecrypt(E, v, l);
    }, p.getValidChunk = function(m) {
      var E = m, v = m.length - m.length % 16;
      return v !== m.length && (E = Object(D.sliceUint8)(m, 0, v), this.remainderData = Object(D.sliceUint8)(m, v)), E;
    }, p.logOnce = function(m) {
      this.logEnabled && (k.logger.log("[decrypter.ts]: " + m), this.logEnabled = !1);
    }, T;
  }();
}, "./src/crypt/fast-aes-key.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return R;
  });
  var R = function() {
    function S(A, k) {
      this.subtle = void 0, this.key = void 0, this.subtle = A, this.key = k;
    }
    return S.prototype.expandKey = function() {
      return this.subtle.importKey("raw", this.key, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"]);
    }, S;
  }();
}, "./src/demux/aacdemuxer.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/demux/base-audio-demuxer.ts"), S = f("./src/demux/adts.ts"), A = f("./src/utils/logger.ts"), k = f("./src/demux/id3.ts");
  function C(d, T) {
    return (C = Object.setPrototypeOf || function(p, m) {
      return p.__proto__ = m, p;
    })(d, T);
  }
  var D = function(d) {
    var T, p;
    function m(v, l) {
      var e;
      return (e = d.call(this) || this).observer = void 0, e.config = void 0, e.observer = v, e.config = l, e;
    }
    p = d, (T = m).prototype = Object.create(p.prototype), T.prototype.constructor = T, C(T, p);
    var E = m.prototype;
    return E.resetInitSegment = function(v, l, e) {
      d.prototype.resetInitSegment.call(this, v, l, e), this._audioTrack = { container: "audio/adts", type: "audio", id: 0, pid: -1, sequenceNumber: 0, isAAC: !0, samples: [], manifestCodec: v, duration: e, inputTimeScale: 9e4, dropped: 0 };
    }, m.probe = function(v) {
      if (!v)
        return !1;
      for (var l = (k.getID3Data(v, 0) || []).length, e = v.length; l < e; l++)
        if (S.probe(v, l))
          return A.logger.log("ADTS sync word found !"), !0;
      return !1;
    }, E.canParse = function(v, l) {
      return S.canParse(v, l);
    }, E.appendFrame = function(v, l, e) {
      S.initTrackConfig(v, this.observer, l, e, v.manifestCodec);
      var s = S.appendFrame(v, l, e, this.initPTS, this.frameIndex);
      if (s && s.missing === 0)
        return s;
    }, m;
  }(R.default);
  D.minProbeByteLength = 9, w.default = D;
}, "./src/demux/adts.ts": function(B, w, f) {
  f.r(w), f.d(w, "getAudioConfig", function() {
    return k;
  }), f.d(w, "isHeaderPattern", function() {
    return C;
  }), f.d(w, "getHeaderLength", function() {
    return D;
  }), f.d(w, "getFullFrameLength", function() {
    return d;
  }), f.d(w, "canGetFrameLength", function() {
    return T;
  }), f.d(w, "isHeader", function() {
    return p;
  }), f.d(w, "canParse", function() {
    return m;
  }), f.d(w, "probe", function() {
    return E;
  }), f.d(w, "initTrackConfig", function() {
    return v;
  }), f.d(w, "getFrameDuration", function() {
    return l;
  }), f.d(w, "parseFrameHeader", function() {
    return e;
  }), f.d(w, "appendFrame", function() {
    return s;
  });
  var R = f("./src/utils/logger.ts"), S = f("./src/errors.ts"), A = f("./src/events.ts");
  function k(n, r, a, i) {
    var h, g, c, y, u = navigator.userAgent.toLowerCase(), t = i, o = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
    h = 1 + ((192 & r[a + 2]) >>> 6);
    var b = (60 & r[a + 2]) >>> 2;
    if (!(b > o.length - 1))
      return c = (1 & r[a + 2]) << 2, c |= (192 & r[a + 3]) >>> 6, R.logger.log("manifest codec:" + i + ", ADTS type:" + h + ", samplingIndex:" + b), /firefox/i.test(u) ? b >= 6 ? (h = 5, y = new Array(4), g = b - 3) : (h = 2, y = new Array(2), g = b) : u.indexOf("android") !== -1 ? (h = 2, y = new Array(2), g = b) : (h = 5, y = new Array(4), i && (i.indexOf("mp4a.40.29") !== -1 || i.indexOf("mp4a.40.5") !== -1) || !i && b >= 6 ? g = b - 3 : ((i && i.indexOf("mp4a.40.2") !== -1 && (b >= 6 && c === 1 || /vivaldi/i.test(u)) || !i && c === 1) && (h = 2, y = new Array(2)), g = b)), y[0] = h << 3, y[0] |= (14 & b) >> 1, y[1] |= (1 & b) << 7, y[1] |= c << 3, h === 5 && (y[1] |= (14 & g) >> 1, y[2] = (1 & g) << 7, y[2] |= 8, y[3] = 0), { config: y, samplerate: o[b], channelCount: c, codec: "mp4a.40." + h, manifestCodec: t };
    n.trigger(A.Events.ERROR, { type: S.ErrorTypes.MEDIA_ERROR, details: S.ErrorDetails.FRAG_PARSING_ERROR, fatal: !0, reason: "invalid ADTS sampling index:" + b });
  }
  function C(n, r) {
    return n[r] === 255 && (246 & n[r + 1]) == 240;
  }
  function D(n, r) {
    return 1 & n[r + 1] ? 7 : 9;
  }
  function d(n, r) {
    return (3 & n[r + 3]) << 11 | n[r + 4] << 3 | (224 & n[r + 5]) >>> 5;
  }
  function T(n, r) {
    return r + 5 < n.length;
  }
  function p(n, r) {
    return r + 1 < n.length && C(n, r);
  }
  function m(n, r) {
    return T(n, r) && C(n, r) && d(n, r) <= n.length - r;
  }
  function E(n, r) {
    if (p(n, r)) {
      var a = D(n, r);
      if (r + a >= n.length)
        return !1;
      var i = d(n, r);
      if (i <= a)
        return !1;
      var h = r + i;
      return h === n.length || p(n, h);
    }
    return !1;
  }
  function v(n, r, a, i, h) {
    if (!n.samplerate) {
      var g = k(r, a, i, h);
      if (!g)
        return;
      n.config = g.config, n.samplerate = g.samplerate, n.channelCount = g.channelCount, n.codec = g.codec, n.manifestCodec = g.manifestCodec, R.logger.log("parsed codec:" + n.codec + ", rate:" + g.samplerate + ", channels:" + g.channelCount);
    }
  }
  function l(n) {
    return 9216e4 / n;
  }
  function e(n, r, a, i, h) {
    var g = D(n, r), c = d(n, r);
    if ((c -= g) > 0)
      return { headerLength: g, frameLength: c, stamp: a + i * h };
  }
  function s(n, r, a, i, h) {
    var g = e(r, a, i, h, l(n.samplerate));
    if (g) {
      var c, y = g.frameLength, u = g.headerLength, t = g.stamp, o = u + y, b = Math.max(0, a + o - r.length);
      b ? (c = new Uint8Array(o - u)).set(r.subarray(a + u, r.length), 0) : c = r.subarray(a + u, a + o);
      var _ = { unit: c, pts: t };
      return b || n.samples.push(_), { sample: _, length: o, missing: b };
    }
  }
}, "./src/demux/base-audio-demuxer.ts": function(B, w, f) {
  f.r(w), f.d(w, "initPTSFn", function() {
    return d;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/demux/id3.ts"), A = f("./src/demux/dummy-demuxed-track.ts"), k = f("./src/utils/mp4-tools.ts"), C = f("./src/utils/typed-array.ts"), D = function() {
    function T() {
      this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.initPTS = null;
    }
    var p = T.prototype;
    return p.resetInitSegment = function(m, E, v) {
      this._id3Track = { type: "id3", id: 0, pid: -1, inputTimeScale: 9e4, sequenceNumber: 0, samples: [], dropped: 0 };
    }, p.resetTimeStamp = function() {
    }, p.resetContiguity = function() {
    }, p.canParse = function(m, E) {
      return !1;
    }, p.appendFrame = function(m, E, v) {
    }, p.demux = function(m, E) {
      this.cachedData && (m = Object(k.appendUint8Array)(this.cachedData, m), this.cachedData = null);
      var v, l, e = S.getID3Data(m, 0), s = e ? e.length : 0, n = this._audioTrack, r = this._id3Track, a = e ? S.getTimeStamp(e) : void 0, i = m.length;
      for (this.frameIndex !== 0 && this.initPTS !== null || (this.initPTS = d(a, E)), e && e.length > 0 && r.samples.push({ pts: this.initPTS, dts: this.initPTS, data: e }), l = this.initPTS; s < i; ) {
        if (this.canParse(m, s)) {
          var h = this.appendFrame(n, m, s);
          h ? (this.frameIndex++, l = h.sample.pts, v = s += h.length) : s = i;
        } else
          S.canParse(m, s) ? (e = S.getID3Data(m, s), r.samples.push({ pts: l, dts: l, data: e }), v = s += e.length) : s++;
        if (s === i && v !== i) {
          var g = Object(C.sliceUint8)(m, v);
          this.cachedData ? this.cachedData = Object(k.appendUint8Array)(this.cachedData, g) : this.cachedData = g;
        }
      }
      return { audioTrack: n, avcTrack: Object(A.dummyTrack)(), id3Track: r, textTrack: Object(A.dummyTrack)() };
    }, p.demuxSampleAes = function(m, E, v) {
      return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"));
    }, p.flush = function(m) {
      var E = this.cachedData;
      return E && (this.cachedData = null, this.demux(E, 0)), this.frameIndex = 0, { audioTrack: this._audioTrack, avcTrack: Object(A.dummyTrack)(), id3Track: this._id3Track, textTrack: Object(A.dummyTrack)() };
    }, p.destroy = function() {
    }, T;
  }(), d = function(T, p) {
    return Object(R.isFiniteNumber)(T) ? 90 * T : 9e4 * p;
  };
  w.default = D;
}, "./src/demux/chunk-cache.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return R;
  });
  var R = function() {
    function S() {
      this.chunks = [], this.dataLength = 0;
    }
    var A = S.prototype;
    return A.push = function(k) {
      this.chunks.push(k), this.dataLength += k.length;
    }, A.flush = function() {
      var k, C = this.chunks, D = this.dataLength;
      return C.length ? (k = C.length === 1 ? C[0] : function(d, T) {
        for (var p = new Uint8Array(T), m = 0, E = 0; E < d.length; E++) {
          var v = d[E];
          p.set(v, m), m += v.length;
        }
        return p;
      }(C, D), this.reset(), k) : new Uint8Array(0);
    }, A.reset = function() {
      this.chunks.length = 0, this.dataLength = 0;
    }, S;
  }();
}, "./src/demux/dummy-demuxed-track.ts": function(B, w, f) {
  function R() {
    return { type: "", id: -1, pid: -1, inputTimeScale: 9e4, sequenceNumber: -1, samples: [], dropped: 0 };
  }
  f.r(w), f.d(w, "dummyTrack", function() {
    return R;
  });
}, "./src/demux/exp-golomb.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/utils/logger.ts"), S = function() {
    function A(C) {
      this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = C, this.bytesAvailable = C.byteLength, this.word = 0, this.bitsAvailable = 0;
    }
    var k = A.prototype;
    return k.loadWord = function() {
      var C = this.data, D = this.bytesAvailable, d = C.byteLength - D, T = new Uint8Array(4), p = Math.min(4, D);
      if (p === 0)
        throw new Error("no bytes available");
      T.set(C.subarray(d, d + p)), this.word = new DataView(T.buffer).getUint32(0), this.bitsAvailable = 8 * p, this.bytesAvailable -= p;
    }, k.skipBits = function(C) {
      var D;
      this.bitsAvailable > C ? (this.word <<= C, this.bitsAvailable -= C) : (C -= this.bitsAvailable, C -= (D = C >> 3) >> 3, this.bytesAvailable -= D, this.loadWord(), this.word <<= C, this.bitsAvailable -= C);
    }, k.readBits = function(C) {
      var D = Math.min(this.bitsAvailable, C), d = this.word >>> 32 - D;
      return C > 32 && R.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= D, this.bitsAvailable > 0 ? this.word <<= D : this.bytesAvailable > 0 && this.loadWord(), (D = C - D) > 0 && this.bitsAvailable ? d << D | this.readBits(D) : d;
    }, k.skipLZ = function() {
      var C;
      for (C = 0; C < this.bitsAvailable; ++C)
        if (this.word & 2147483648 >>> C)
          return this.word <<= C, this.bitsAvailable -= C, C;
      return this.loadWord(), C + this.skipLZ();
    }, k.skipUEG = function() {
      this.skipBits(1 + this.skipLZ());
    }, k.skipEG = function() {
      this.skipBits(1 + this.skipLZ());
    }, k.readUEG = function() {
      var C = this.skipLZ();
      return this.readBits(C + 1) - 1;
    }, k.readEG = function() {
      var C = this.readUEG();
      return 1 & C ? 1 + C >>> 1 : -1 * (C >>> 1);
    }, k.readBoolean = function() {
      return this.readBits(1) === 1;
    }, k.readUByte = function() {
      return this.readBits(8);
    }, k.readUShort = function() {
      return this.readBits(16);
    }, k.readUInt = function() {
      return this.readBits(32);
    }, k.skipScalingList = function(C) {
      for (var D = 8, d = 8, T = 0; T < C; T++)
        d !== 0 && (d = (D + this.readEG() + 256) % 256), D = d === 0 ? D : d;
    }, k.readSPS = function() {
      var C, D, d, T = 0, p = 0, m = 0, E = 0, v = this.readUByte.bind(this), l = this.readBits.bind(this), e = this.readUEG.bind(this), s = this.readBoolean.bind(this), n = this.skipBits.bind(this), r = this.skipEG.bind(this), a = this.skipUEG.bind(this), i = this.skipScalingList.bind(this);
      v();
      var h = v();
      if (l(5), n(3), v(), a(), h === 100 || h === 110 || h === 122 || h === 244 || h === 44 || h === 83 || h === 86 || h === 118 || h === 128) {
        var g = e();
        if (g === 3 && n(1), a(), a(), n(1), s())
          for (D = g !== 3 ? 8 : 12, d = 0; d < D; d++)
            s() && i(d < 6 ? 16 : 64);
      }
      a();
      var c = e();
      if (c === 0)
        e();
      else if (c === 1)
        for (n(1), r(), r(), C = e(), d = 0; d < C; d++)
          r();
      a(), n(1);
      var y = e(), u = e(), t = l(1);
      t === 0 && n(1), n(1), s() && (T = e(), p = e(), m = e(), E = e());
      var o = [1, 1];
      if (s() && s())
        switch (v()) {
          case 1:
            o = [1, 1];
            break;
          case 2:
            o = [12, 11];
            break;
          case 3:
            o = [10, 11];
            break;
          case 4:
            o = [16, 11];
            break;
          case 5:
            o = [40, 33];
            break;
          case 6:
            o = [24, 11];
            break;
          case 7:
            o = [20, 11];
            break;
          case 8:
            o = [32, 11];
            break;
          case 9:
            o = [80, 33];
            break;
          case 10:
            o = [18, 11];
            break;
          case 11:
            o = [15, 11];
            break;
          case 12:
            o = [64, 33];
            break;
          case 13:
            o = [160, 99];
            break;
          case 14:
            o = [4, 3];
            break;
          case 15:
            o = [3, 2];
            break;
          case 16:
            o = [2, 1];
            break;
          case 255:
            o = [v() << 8 | v(), v() << 8 | v()];
        }
      return { width: Math.ceil(16 * (y + 1) - 2 * T - 2 * p), height: (2 - t) * (u + 1) * 16 - (t ? 2 : 4) * (m + E), pixelRatio: o };
    }, k.readSliceType = function() {
      return this.readUByte(), this.readUEG(), this.readUEG();
    }, A;
  }();
  w.default = S;
}, "./src/demux/id3.ts": function(B, w, f) {
  f.r(w), f.d(w, "isHeader", function() {
    return S;
  }), f.d(w, "isFooter", function() {
    return A;
  }), f.d(w, "getID3Data", function() {
    return k;
  }), f.d(w, "canParse", function() {
    return D;
  }), f.d(w, "getTimeStamp", function() {
    return d;
  }), f.d(w, "isTimeStampFrame", function() {
    return T;
  }), f.d(w, "getID3Frames", function() {
    return m;
  }), f.d(w, "decodeFrame", function() {
    return E;
  }), f.d(w, "utf8ArrayToStr", function() {
    return n;
  }), f.d(w, "testables", function() {
    return r;
  });
  var R, S = function(a, i) {
    return i + 10 <= a.length && a[i] === 73 && a[i + 1] === 68 && a[i + 2] === 51 && a[i + 3] < 255 && a[i + 4] < 255 && a[i + 6] < 128 && a[i + 7] < 128 && a[i + 8] < 128 && a[i + 9] < 128;
  }, A = function(a, i) {
    return i + 10 <= a.length && a[i] === 51 && a[i + 1] === 68 && a[i + 2] === 73 && a[i + 3] < 255 && a[i + 4] < 255 && a[i + 6] < 128 && a[i + 7] < 128 && a[i + 8] < 128 && a[i + 9] < 128;
  }, k = function(a, i) {
    for (var h = i, g = 0; S(a, i); )
      g += 10, g += C(a, i + 6), A(a, i + 10) && (g += 10), i += g;
    if (g > 0)
      return a.subarray(h, h + g);
  }, C = function(a, i) {
    var h = 0;
    return h = (127 & a[i]) << 21, h |= (127 & a[i + 1]) << 14, h |= (127 & a[i + 2]) << 7, h |= 127 & a[i + 3];
  }, D = function(a, i) {
    return S(a, i) && C(a, i + 6) + 10 <= a.length - i;
  }, d = function(a) {
    for (var i = m(a), h = 0; h < i.length; h++) {
      var g = i[h];
      if (T(g))
        return s(g);
    }
  }, T = function(a) {
    return a && a.key === "PRIV" && a.info === "com.apple.streaming.transportStreamTimestamp";
  }, p = function(a) {
    var i = String.fromCharCode(a[0], a[1], a[2], a[3]), h = C(a, 4);
    return { type: i, size: h, data: a.subarray(10, 10 + h) };
  }, m = function(a) {
    for (var i = 0, h = []; S(a, i); ) {
      for (var g = C(a, i + 6), c = (i += 10) + g; i + 8 < c; ) {
        var y = p(a.subarray(i)), u = E(y);
        u && h.push(u), i += y.size + 10;
      }
      A(a, i) && (i += 10);
    }
    return h;
  }, E = function(a) {
    return a.type === "PRIV" ? v(a) : a.type[0] === "W" ? e(a) : l(a);
  }, v = function(a) {
    if (!(a.size < 2)) {
      var i = n(a.data, !0), h = new Uint8Array(a.data.subarray(i.length + 1));
      return { key: a.type, info: i, data: h.buffer };
    }
  }, l = function(a) {
    if (!(a.size < 2)) {
      if (a.type === "TXXX") {
        var i = 1, h = n(a.data.subarray(i), !0);
        i += h.length + 1;
        var g = n(a.data.subarray(i));
        return { key: a.type, info: h, data: g };
      }
      var c = n(a.data.subarray(1));
      return { key: a.type, data: c };
    }
  }, e = function(a) {
    if (a.type === "WXXX") {
      if (a.size < 2)
        return;
      var i = 1, h = n(a.data.subarray(i), !0);
      i += h.length + 1;
      var g = n(a.data.subarray(i));
      return { key: a.type, info: h, data: g };
    }
    var c = n(a.data);
    return { key: a.type, data: c };
  }, s = function(a) {
    if (a.data.byteLength === 8) {
      var i = new Uint8Array(a.data), h = 1 & i[3], g = (i[4] << 23) + (i[5] << 15) + (i[6] << 7) + i[7];
      return g /= 45, h && (g += 4772185884e-2), Math.round(g);
    }
  }, n = function(a, i) {
    i === void 0 && (i = !1);
    var h = (R || self.TextDecoder === void 0 || (R = new self.TextDecoder("utf-8")), R);
    if (h) {
      var g = h.decode(a);
      if (i) {
        var c = g.indexOf("\0");
        return c !== -1 ? g.substring(0, c) : g;
      }
      return g.replace(/\0/g, "");
    }
    for (var y, u, t, o = a.length, b = "", _ = 0; _ < o; ) {
      if ((y = a[_++]) === 0 && i)
        return b;
      if (y !== 0 && y !== 3)
        switch (y >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            b += String.fromCharCode(y);
            break;
          case 12:
          case 13:
            u = a[_++], b += String.fromCharCode((31 & y) << 6 | 63 & u);
            break;
          case 14:
            u = a[_++], t = a[_++], b += String.fromCharCode((15 & y) << 12 | (63 & u) << 6 | (63 & t) << 0);
        }
    }
    return b;
  }, r = { decodeTextFrame: l };
}, "./src/demux/mp3demuxer.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/demux/base-audio-demuxer.ts"), S = f("./src/demux/id3.ts"), A = f("./src/utils/logger.ts"), k = f("./src/demux/mpegaudio.ts");
  function C(d, T) {
    return (C = Object.setPrototypeOf || function(p, m) {
      return p.__proto__ = m, p;
    })(d, T);
  }
  var D = function(d) {
    var T, p;
    function m() {
      return d.apply(this, arguments) || this;
    }
    p = d, (T = m).prototype = Object.create(p.prototype), T.prototype.constructor = T, C(T, p);
    var E = m.prototype;
    return E.resetInitSegment = function(v, l, e) {
      d.prototype.resetInitSegment.call(this, v, l, e), this._audioTrack = { container: "audio/mpeg", type: "audio", id: 0, pid: -1, sequenceNumber: 0, isAAC: !1, samples: [], manifestCodec: v, duration: e, inputTimeScale: 9e4, dropped: 0 };
    }, m.probe = function(v) {
      if (!v)
        return !1;
      for (var l = (S.getID3Data(v, 0) || []).length, e = v.length; l < e; l++)
        if (k.probe(v, l))
          return A.logger.log("MPEG Audio sync word found !"), !0;
      return !1;
    }, E.canParse = function(v, l) {
      return k.canParse(v, l);
    }, E.appendFrame = function(v, l, e) {
      if (this.initPTS !== null)
        return k.appendFrame(v, l, e, this.initPTS, this.frameIndex);
    }, m;
  }(R.default);
  D.minProbeByteLength = 4, w.default = D;
}, "./src/demux/mp4demuxer.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/utils/mp4-tools.ts"), S = f("./src/demux/dummy-demuxed-track.ts"), A = function() {
    function k(D, d) {
      this.remainderData = null, this.config = void 0, this.config = d;
    }
    var C = k.prototype;
    return C.resetTimeStamp = function() {
    }, C.resetInitSegment = function() {
    }, C.resetContiguity = function() {
    }, k.probe = function(D) {
      return Object(R.findBox)({ data: D, start: 0, end: Math.min(D.length, 16384) }, ["moof"]).length > 0;
    }, C.demux = function(D) {
      var d = D, T = Object(S.dummyTrack)();
      if (this.config.progressive) {
        this.remainderData && (d = Object(R.appendUint8Array)(this.remainderData, D));
        var p = Object(R.segmentValidRange)(d);
        this.remainderData = p.remainder, T.samples = p.valid || new Uint8Array();
      } else
        T.samples = d;
      return { audioTrack: Object(S.dummyTrack)(), avcTrack: T, id3Track: Object(S.dummyTrack)(), textTrack: Object(S.dummyTrack)() };
    }, C.flush = function() {
      var D = Object(S.dummyTrack)();
      return D.samples = this.remainderData || new Uint8Array(), this.remainderData = null, { audioTrack: Object(S.dummyTrack)(), avcTrack: D, id3Track: Object(S.dummyTrack)(), textTrack: Object(S.dummyTrack)() };
    }, C.demuxSampleAes = function(D, d, T) {
      return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"));
    }, C.destroy = function() {
    }, k;
  }();
  A.minProbeByteLength = 1024, w.default = A;
}, "./src/demux/mpegaudio.ts": function(B, w, f) {
  f.r(w), f.d(w, "appendFrame", function() {
    return D;
  }), f.d(w, "parseHeader", function() {
    return d;
  }), f.d(w, "isHeaderPattern", function() {
    return T;
  }), f.d(w, "isHeader", function() {
    return p;
  }), f.d(w, "canParse", function() {
    return m;
  }), f.d(w, "probe", function() {
    return E;
  });
  var R = null, S = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160], A = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3], k = [[0, 72, 144, 12], [0, 0, 0, 0], [0, 72, 144, 12], [0, 144, 144, 12]], C = [0, 1, 1, 4];
  function D(v, l, e, s, n) {
    if (!(e + 24 > l.length)) {
      var r = d(l, e);
      if (r && e + r.frameLength <= l.length) {
        var a = s + n * (9e4 * r.samplesPerFrame / r.sampleRate), i = { unit: l.subarray(e, e + r.frameLength), pts: a, dts: a };
        return v.config = [], v.channelCount = r.channelCount, v.samplerate = r.sampleRate, v.samples.push(i), { sample: i, length: r.frameLength, missing: 0 };
      }
    }
  }
  function d(v, l) {
    var e = v[l + 1] >> 3 & 3, s = v[l + 1] >> 1 & 3, n = v[l + 2] >> 4 & 15, r = v[l + 2] >> 2 & 3;
    if (e !== 1 && n !== 0 && n !== 15 && r !== 3) {
      var a = v[l + 2] >> 1 & 1, i = v[l + 3] >> 6, h = 1e3 * S[14 * (e === 3 ? 3 - s : s === 3 ? 3 : 4) + n - 1], g = A[3 * (e === 3 ? 0 : e === 2 ? 1 : 2) + r], c = i === 3 ? 1 : 2, y = k[e][s], u = C[s], t = 8 * y * u, o = Math.floor(y * h / g + a) * u;
      if (R === null) {
        var b = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
        R = b ? parseInt(b[1]) : 0;
      }
      return R && R <= 87 && s === 2 && h >= 224e3 && i === 0 && (v[l + 3] = 128 | v[l + 3]), { sampleRate: g, channelCount: c, frameLength: o, samplesPerFrame: t };
    }
  }
  function T(v, l) {
    return v[l] === 255 && (224 & v[l + 1]) == 224 && (6 & v[l + 1]) != 0;
  }
  function p(v, l) {
    return l + 1 < v.length && T(v, l);
  }
  function m(v, l) {
    return T(v, l) && 4 <= v.length - l;
  }
  function E(v, l) {
    if (l + 1 < v.length && T(v, l)) {
      var e = d(v, l), s = 4;
      e != null && e.frameLength && (s = e.frameLength);
      var n = l + s;
      return n === v.length || p(v, n);
    }
    return !1;
  }
}, "./src/demux/sample-aes.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/crypt/decrypter.ts"), S = f("./src/demux/tsdemuxer.ts"), A = function() {
    function k(D, d, T) {
      this.keyData = void 0, this.decrypter = void 0, this.keyData = T, this.decrypter = new R.default(D, d, { removePKCS7Padding: !1 });
    }
    var C = k.prototype;
    return C.decryptBuffer = function(D, d) {
      this.decrypter.decrypt(D, this.keyData.key.buffer, this.keyData.iv.buffer, d);
    }, C.decryptAacSample = function(D, d, T, p) {
      var m = D[d].unit, E = m.subarray(16, m.length - m.length % 16), v = E.buffer.slice(E.byteOffset, E.byteOffset + E.length), l = this;
      this.decryptBuffer(v, function(e) {
        var s = new Uint8Array(e);
        m.set(s, 16), p || l.decryptAacSamples(D, d + 1, T);
      });
    }, C.decryptAacSamples = function(D, d, T) {
      for (; ; d++) {
        if (d >= D.length)
          return void T();
        if (!(D[d].unit.length < 32)) {
          var p = this.decrypter.isSync();
          if (this.decryptAacSample(D, d, T, p), !p)
            return;
        }
      }
    }, C.getAvcEncryptedData = function(D) {
      for (var d = 16 * Math.floor((D.length - 48) / 160) + 16, T = new Int8Array(d), p = 0, m = 32; m <= D.length - 16; m += 160, p += 16)
        T.set(D.subarray(m, m + 16), p);
      return T;
    }, C.getAvcDecryptedUnit = function(D, d) {
      for (var T = new Uint8Array(d), p = 0, m = 32; m <= D.length - 16; m += 160, p += 16)
        D.set(T.subarray(p, p + 16), m);
      return D;
    }, C.decryptAvcSample = function(D, d, T, p, m, E) {
      var v = Object(S.discardEPB)(m.data), l = this.getAvcEncryptedData(v), e = this;
      this.decryptBuffer(l.buffer, function(s) {
        m.data = e.getAvcDecryptedUnit(v, s), E || e.decryptAvcSamples(D, d, T + 1, p);
      });
    }, C.decryptAvcSamples = function(D, d, T, p) {
      if (D instanceof Uint8Array)
        throw new Error("Cannot decrypt samples of type Uint8Array");
      for (; ; d++, T = 0) {
        if (d >= D.length)
          return void p();
        for (var m = D[d].units; !(T >= m.length); T++) {
          var E = m[T];
          if (!(E.data.length <= 48 || E.type !== 1 && E.type !== 5)) {
            var v = this.decrypter.isSync();
            if (this.decryptAvcSample(D, d, T, p, E, v), !v)
              return;
          }
        }
      }
    }, k;
  }();
  w.default = A;
}, "./src/demux/transmuxer-interface.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return p;
  });
  var R = f("./node_modules/webworkify-webpack/index.js"), S = f("./src/events.ts"), A = f("./src/demux/transmuxer.ts"), k = f("./src/utils/logger.ts"), C = f("./src/errors.ts"), D = f("./src/utils/mediasource-helper.ts"), d = f("./node_modules/eventemitter3/index.js"), T = Object(D.getMediaSource)() || { isTypeSupported: function() {
    return !1;
  } }, p = function() {
    function m(v, l, e, s) {
      var n = this;
      this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.worker = void 0, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0, this.hls = v, this.id = l, this.onTransmuxComplete = e, this.onFlush = s;
      var r = v.config, a = function(c, y) {
        (y = y || {}).frag = n.frag, y.id = n.id, v.trigger(c, y);
      };
      this.observer = new d.EventEmitter(), this.observer.on(S.Events.FRAG_DECRYPTED, a), this.observer.on(S.Events.ERROR, a);
      var i = { mp4: T.isTypeSupported("video/mp4"), mpeg: T.isTypeSupported("audio/mpeg"), mp3: T.isTypeSupported('audio/mp4; codecs="mp3"') }, h = navigator.vendor;
      if (r.enableWorker && typeof Worker < "u") {
        var g;
        k.logger.log("demuxing in webworker");
        try {
          g = this.worker = R("./src/demux/transmuxer-worker.ts"), this.onwmsg = this.onWorkerMessage.bind(this), g.addEventListener("message", this.onwmsg), g.onerror = function(c) {
            v.trigger(S.Events.ERROR, { type: C.ErrorTypes.OTHER_ERROR, details: C.ErrorDetails.INTERNAL_EXCEPTION, fatal: !0, event: "demuxerWorker", error: new Error(c.message + "  (" + c.filename + ":" + c.lineno + ")") });
          }, g.postMessage({ cmd: "init", typeSupported: i, vendor: h, id: l, config: JSON.stringify(r) });
        } catch (c) {
          k.logger.warn("Error in worker:", c), k.logger.error("Error while initializing DemuxerWorker, fallback to inline"), g && self.URL.revokeObjectURL(g.objectURL), this.transmuxer = new A.default(this.observer, i, r, h, l), this.worker = null;
        }
      } else
        this.transmuxer = new A.default(this.observer, i, r, h, l);
    }
    var E = m.prototype;
    return E.destroy = function() {
      var v = this.worker;
      if (v)
        v.removeEventListener("message", this.onwmsg), v.terminate(), this.worker = null;
      else {
        var l = this.transmuxer;
        l && (l.destroy(), this.transmuxer = null);
      }
      var e = this.observer;
      e && e.removeAllListeners(), this.observer = null;
    }, E.push = function(v, l, e, s, n, r, a, i, h, g) {
      var c = this;
      h.transmuxing.start = self.performance.now();
      var y = this.transmuxer, u = this.worker, t = r ? r.start : n.start, o = n.decryptdata, b = this.frag, _ = !(b && n.cc === b.cc), L = !(b && h.level === b.level), I = b ? h.sn - b.sn : -1, O = this.part ? h.part - this.part.index : 1, x = !L && (I === 1 || I === 0 && O === 1), P = self.performance.now();
      (L || I || n.stats.parsing.start === 0) && (n.stats.parsing.start = P), !r || !O && x || (r.stats.parsing.start = P);
      var M = new A.TransmuxState(_, x, i, L, t);
      if (!x || _) {
        k.logger.log("[transmuxer-interface, " + n.type + "]: Starting new transmux session for sn: " + h.sn + " p: " + h.part + " level: " + h.level + " id: " + h.id + `
        discontinuity: ` + _ + `
        trackSwitch: ` + L + `
        contiguous: ` + x + `
        accurateTimeOffset: ` + i + `
        timeOffset: ` + t);
        var F = new A.TransmuxConfig(e, s, l, a, g);
        this.configureTransmuxer(F);
      }
      if (this.frag = n, this.part = r, u)
        u.postMessage({ cmd: "demux", data: v, decryptdata: o, chunkMeta: h, state: M }, v instanceof ArrayBuffer ? [v] : []);
      else if (y) {
        var N = y.push(v, o, h, M);
        Object(A.isPromise)(N) ? N.then(function(U) {
          c.handleTransmuxComplete(U);
        }) : this.handleTransmuxComplete(N);
      }
    }, E.flush = function(v) {
      var l = this;
      v.transmuxing.start = self.performance.now();
      var e = this.transmuxer, s = this.worker;
      if (s)
        s.postMessage({ cmd: "flush", chunkMeta: v });
      else if (e) {
        var n = e.flush(v);
        Object(A.isPromise)(n) ? n.then(function(r) {
          l.handleFlushResult(r, v);
        }) : this.handleFlushResult(n, v);
      }
    }, E.handleFlushResult = function(v, l) {
      var e = this;
      v.forEach(function(s) {
        e.handleTransmuxComplete(s);
      }), this.onFlush(l);
    }, E.onWorkerMessage = function(v) {
      var l = v.data, e = this.hls;
      switch (l.event) {
        case "init":
          self.URL.revokeObjectURL(this.worker.objectURL);
          break;
        case "transmuxComplete":
          this.handleTransmuxComplete(l.data);
          break;
        case "flush":
          this.onFlush(l.data);
          break;
        default:
          l.data = l.data || {}, l.data.frag = this.frag, l.data.id = this.id, e.trigger(l.event, l.data);
      }
    }, E.configureTransmuxer = function(v) {
      var l = this.worker, e = this.transmuxer;
      l ? l.postMessage({ cmd: "configure", config: v }) : e && e.configure(v);
    }, E.handleTransmuxComplete = function(v) {
      v.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(v);
    }, m;
  }();
}, "./src/demux/transmuxer-worker.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return C;
  });
  var R = f("./src/demux/transmuxer.ts"), S = f("./src/events.ts"), A = f("./src/utils/logger.ts"), k = f("./node_modules/eventemitter3/index.js");
  function C(p) {
    var m = new k.EventEmitter(), E = function(v, l) {
      p.postMessage({ event: v, data: l });
    };
    m.on(S.Events.FRAG_DECRYPTED, E), m.on(S.Events.ERROR, E), p.addEventListener("message", function(v) {
      var l = v.data;
      switch (l.cmd) {
        case "init":
          var e = JSON.parse(l.config);
          p.transmuxer = new R.default(m, l.typeSupported, e, l.vendor, l.id), Object(A.enableLogs)(e.debug), E("init", null);
          break;
        case "configure":
          p.transmuxer.configure(l.config);
          break;
        case "demux":
          var s = p.transmuxer.push(l.data, l.decryptdata, l.chunkMeta, l.state);
          Object(R.isPromise)(s) ? s.then(function(a) {
            D(p, a);
          }) : D(p, s);
          break;
        case "flush":
          var n = l.chunkMeta, r = p.transmuxer.flush(n);
          Object(R.isPromise)(r) ? r.then(function(a) {
            T(p, a, n);
          }) : T(p, r, n);
      }
    });
  }
  function D(p, m) {
    if ((E = m.remuxResult).audio || E.video || E.text || E.id3 || E.initSegment) {
      var E, v = [], l = m.remuxResult, e = l.audio, s = l.video;
      e && d(v, e), s && d(v, s), p.postMessage({ event: "transmuxComplete", data: m }, v);
    }
  }
  function d(p, m) {
    m.data1 && p.push(m.data1.buffer), m.data2 && p.push(m.data2.buffer);
  }
  function T(p, m, E) {
    m.forEach(function(v) {
      D(p, v);
    }), p.postMessage({ event: "flush", data: E });
  }
}, "./src/demux/transmuxer.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return n;
  }), f.d(w, "isPromise", function() {
    return a;
  }), f.d(w, "TransmuxConfig", function() {
    return i;
  }), f.d(w, "TransmuxState", function() {
    return h;
  });
  var R, S = f("./src/events.ts"), A = f("./src/errors.ts"), k = f("./src/crypt/decrypter.ts"), C = f("./src/demux/aacdemuxer.ts"), D = f("./src/demux/mp4demuxer.ts"), d = f("./src/demux/tsdemuxer.ts"), T = f("./src/demux/mp3demuxer.ts"), p = f("./src/remux/mp4-remuxer.ts"), m = f("./src/remux/passthrough-remuxer.ts"), E = f("./src/demux/chunk-cache.ts"), v = f("./src/utils/mp4-tools.ts"), l = f("./src/utils/logger.ts");
  try {
    R = self.performance.now.bind(self.performance);
  } catch {
    l.logger.debug("Unable to use Performance API on this environment"), R = self.Date.now;
  }
  var e = [{ demux: d.default, remux: p.default }, { demux: D.default, remux: m.default }, { demux: C.default, remux: p.default }, { demux: T.default, remux: p.default }], s = 1024;
  e.forEach(function(g) {
    var c = g.demux;
    s = Math.max(s, c.minProbeByteLength);
  });
  var n = function() {
    function g(y, u, t, o, b) {
      this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.cache = new E.default(), this.observer = y, this.typeSupported = u, this.config = t, this.vendor = o, this.id = b;
    }
    var c = g.prototype;
    return c.configure = function(y) {
      this.transmuxConfig = y, this.decrypter && this.decrypter.reset();
    }, c.push = function(y, u, t, o) {
      var b = this, _ = t.transmuxing;
      _.executeStart = R();
      var L = new Uint8Array(y), I = this.cache, O = this.config, x = this.currentTransmuxState, P = this.transmuxConfig;
      o && (this.currentTransmuxState = o);
      var M = function(it, nt) {
        var dt = null;
        return it.byteLength > 0 && nt != null && nt.key != null && nt.iv !== null && nt.method != null && (dt = nt), dt;
      }(L, u);
      if (M && M.method === "AES-128") {
        var F = this.getDecrypter();
        if (!O.enableSoftwareAES)
          return this.decryptionPromise = F.webCryptoDecrypt(L, M.key.buffer, M.iv.buffer).then(function(it) {
            var nt = b.push(it, null, t);
            return b.decryptionPromise = null, nt;
          }), this.decryptionPromise;
        var N = F.softwareDecrypt(L, M.key.buffer, M.iv.buffer);
        if (!N)
          return _.executeEnd = R(), r(t);
        L = new Uint8Array(N);
      }
      var U = o || x, G = U.contiguous, j = U.discontinuity, V = U.trackSwitch, Y = U.accurateTimeOffset, W = U.timeOffset, q = P.audioCodec, X = P.videoCodec, J = P.defaultInitPts, rt = P.duration, Q = P.initSegmentData;
      if ((j || V) && this.resetInitSegment(Q, q, X, rt), j && this.resetInitialTimestamp(J), G || this.resetContiguity(), this.needsProbing(L, j, V)) {
        if (I.dataLength) {
          var at = I.flush();
          L = Object(v.appendUint8Array)(at, L);
        }
        this.configureTransmuxer(L, P);
      }
      var z = this.transmux(L, M, W, Y, t), tt = this.currentTransmuxState;
      return tt.contiguous = !0, tt.discontinuity = !1, tt.trackSwitch = !1, _.executeEnd = R(), z;
    }, c.flush = function(y) {
      var u = this, t = y.transmuxing;
      t.executeStart = R();
      var o = this.decrypter, b = this.cache, _ = this.currentTransmuxState, L = this.decryptionPromise;
      if (L)
        return L.then(function() {
          return u.flush(y);
        });
      var I = [], O = _.timeOffset;
      if (o) {
        var x = o.flush();
        x && I.push(this.push(x, null, y));
      }
      var P = b.dataLength;
      b.reset();
      var M = this.demuxer, F = this.remuxer;
      if (!M || !F)
        return P >= s && this.observer.emit(S.Events.ERROR, S.Events.ERROR, { type: A.ErrorTypes.MEDIA_ERROR, details: A.ErrorDetails.FRAG_PARSING_ERROR, fatal: !0, reason: "no demux matching with content found" }), t.executeEnd = R(), [r(y)];
      var N = M.flush(O);
      return a(N) ? N.then(function(U) {
        return u.flushRemux(I, U, y), I;
      }) : (this.flushRemux(I, N, y), I);
    }, c.flushRemux = function(y, u, t) {
      var o = u.audioTrack, b = u.avcTrack, _ = u.id3Track, L = u.textTrack, I = this.currentTransmuxState, O = I.accurateTimeOffset, x = I.timeOffset;
      l.logger.log("[transmuxer.ts]: Flushed fragment " + t.sn + (t.part > -1 ? " p: " + t.part : "") + " of level " + t.level);
      var P = this.remuxer.remux(o, b, _, L, x, O, !0, this.id);
      y.push({ remuxResult: P, chunkMeta: t }), t.transmuxing.executeEnd = R();
    }, c.resetInitialTimestamp = function(y) {
      var u = this.demuxer, t = this.remuxer;
      u && t && (u.resetTimeStamp(y), t.resetTimeStamp(y));
    }, c.resetContiguity = function() {
      var y = this.demuxer, u = this.remuxer;
      y && u && (y.resetContiguity(), u.resetNextTimestamp());
    }, c.resetInitSegment = function(y, u, t, o) {
      var b = this.demuxer, _ = this.remuxer;
      b && _ && (b.resetInitSegment(u, t, o), _.resetInitSegment(y, u, t));
    }, c.destroy = function() {
      this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
    }, c.transmux = function(y, u, t, o, b) {
      return u && u.method === "SAMPLE-AES" ? this.transmuxSampleAes(y, u, t, o, b) : this.transmuxUnencrypted(y, t, o, b);
    }, c.transmuxUnencrypted = function(y, u, t, o) {
      var b = this.demuxer.demux(y, u, !1, !this.config.progressive), _ = b.audioTrack, L = b.avcTrack, I = b.id3Track, O = b.textTrack;
      return { remuxResult: this.remuxer.remux(_, L, I, O, u, t, !1, this.id), chunkMeta: o };
    }, c.transmuxSampleAes = function(y, u, t, o, b) {
      var _ = this;
      return this.demuxer.demuxSampleAes(y, u, t).then(function(L) {
        return { remuxResult: _.remuxer.remux(L.audioTrack, L.avcTrack, L.id3Track, L.textTrack, t, o, !1, _.id), chunkMeta: b };
      });
    }, c.configureTransmuxer = function(y, u) {
      for (var t, o = this.config, b = this.observer, _ = this.typeSupported, L = this.vendor, I = u.audioCodec, O = u.defaultInitPts, x = u.duration, P = u.initSegmentData, M = u.videoCodec, F = 0, N = e.length; F < N; F++)
        if (e[F].demux.probe(y)) {
          t = e[F];
          break;
        }
      t || (l.logger.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"), t = { demux: D.default, remux: m.default });
      var U = this.demuxer, G = this.remuxer, j = t.remux, V = t.demux;
      G && G instanceof j || (this.remuxer = new j(b, o, _, L)), U && U instanceof V || (this.demuxer = new V(b, o, _), this.probe = V.probe), this.resetInitSegment(P, I, M, x), this.resetInitialTimestamp(O);
    }, c.needsProbing = function(y, u, t) {
      return !this.demuxer || !this.remuxer || u || t;
    }, c.getDecrypter = function() {
      var y = this.decrypter;
      return y || (y = this.decrypter = new k.default(this.observer, this.config)), y;
    }, g;
  }(), r = function(g) {
    return { remuxResult: {}, chunkMeta: g };
  };
  function a(g) {
    return "then" in g && g.then instanceof Function;
  }
  var i = function(g, c, y, u, t) {
    this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = g, this.videoCodec = c, this.initSegmentData = y, this.duration = u, this.defaultInitPts = t;
  }, h = function(g, c, y, u, t) {
    this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.discontinuity = g, this.contiguous = c, this.accurateTimeOffset = y, this.trackSwitch = u, this.timeOffset = t;
  };
}, "./src/demux/tsdemuxer.ts": function(B, w, f) {
  f.r(w), f.d(w, "discardEPB", function() {
    return a;
  });
  var R = f("./src/demux/adts.ts"), S = f("./src/demux/mpegaudio.ts"), A = f("./src/demux/exp-golomb.ts"), k = f("./src/demux/id3.ts"), C = f("./src/demux/sample-aes.ts"), D = f("./src/events.ts"), d = f("./src/utils/mp4-tools.ts"), T = f("./src/utils/logger.ts"), p = f("./src/errors.ts"), m = { video: 1, audio: 2, id3: 3, text: 4 }, E = function() {
    function i(g, c, y) {
      this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this.aacLastPTS = null, this._initPTS = null, this._initDTS = null, this._pmtId = -1, this._avcTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.observer = g, this.config = c, this.typeSupported = y;
    }
    i.probe = function(g) {
      var c = i.syncOffset(g);
      return !(c < 0 || (c && T.logger.warn("MPEG2-TS detected but first sync word found @ offset " + c + ", junk ahead ?"), 0));
    }, i.syncOffset = function(g) {
      for (var c = Math.min(1e3, g.length - 564), y = 0; y < c; ) {
        if (g[y] === 71 && g[y + 188] === 71 && g[y + 376] === 71)
          return y;
        y++;
      }
      return -1;
    }, i.createTrack = function(g, c) {
      return { container: g === "video" || g === "audio" ? "video/mp2t" : void 0, type: g, id: m[g], pid: -1, inputTimeScale: 9e4, sequenceNumber: 0, samples: [], dropped: 0, duration: g === "audio" ? c : void 0 };
    };
    var h = i.prototype;
    return h.resetInitSegment = function(g, c, y) {
      this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = i.createTrack("video", y), this._audioTrack = i.createTrack("audio", y), this._id3Track = i.createTrack("id3", y), this._txtTrack = i.createTrack("text", y), this._audioTrack.isAAC = !0, this.aacOverFlow = null, this.aacLastPTS = null, this.avcSample = null, this.audioCodec = g, this.videoCodec = c, this._duration = y;
    }, h.resetTimeStamp = function() {
    }, h.resetContiguity = function() {
      var g = this._audioTrack, c = this._avcTrack, y = this._id3Track;
      g && (g.pesData = null), c && (c.pesData = null), y && (y.pesData = null), this.aacOverFlow = null, this.aacLastPTS = null;
    }, h.demux = function(g, c, y, u) {
      var t;
      y === void 0 && (y = !1), u === void 0 && (u = !1), y || (this.sampleAes = null);
      var o = this._avcTrack, b = this._audioTrack, _ = this._id3Track, L = o.pid, I = o.pesData, O = b.pid, x = _.pid, P = b.pesData, M = _.pesData, F = !1, N = this.pmtParsed, U = this._pmtId, G = g.length;
      if (this.remainderData && (G = (g = Object(d.appendUint8Array)(this.remainderData, g)).length, this.remainderData = null), G < 188 && !u)
        return this.remainderData = g, { audioTrack: b, avcTrack: o, id3Track: _, textTrack: this._txtTrack };
      var j = Math.max(0, i.syncOffset(g));
      (G -= (G + j) % 188) < g.byteLength && !u && (this.remainderData = new Uint8Array(g.buffer, G, g.buffer.byteLength - G));
      for (var V = j; V < G; V += 188)
        if (g[V] === 71) {
          var Y = !!(64 & g[V + 1]), W = ((31 & g[V + 1]) << 8) + g[V + 2], q = void 0;
          if ((48 & g[V + 3]) >> 4 > 1) {
            if ((q = V + 5 + g[V + 4]) === V + 188)
              continue;
          } else
            q = V + 4;
          switch (W) {
            case L:
              Y && (I && (t = s(I)) && this.parseAVCPES(t, !1), I = { data: [], size: 0 }), I && (I.data.push(g.subarray(q, V + 188)), I.size += V + 188 - q);
              break;
            case O:
              Y && (P && (t = s(P)) && (b.isAAC ? this.parseAACPES(t) : this.parseMPEGPES(t)), P = { data: [], size: 0 }), P && (P.data.push(g.subarray(q, V + 188)), P.size += V + 188 - q);
              break;
            case x:
              Y && (M && (t = s(M)) && this.parseID3PES(t), M = { data: [], size: 0 }), M && (M.data.push(g.subarray(q, V + 188)), M.size += V + 188 - q);
              break;
            case 0:
              Y && (q += g[q] + 1), U = this._pmtId = l(g, q);
              break;
            case U:
              Y && (q += g[q] + 1);
              var X = e(g, q, this.typeSupported.mpeg === !0 || this.typeSupported.mp3 === !0, y);
              (L = X.avc) > 0 && (o.pid = L), (O = X.audio) > 0 && (b.pid = O, b.isAAC = X.isAAC), (x = X.id3) > 0 && (_.pid = x), F && !N && (T.logger.log("reparse from beginning"), F = !1, V = j - 188), N = this.pmtParsed = !0;
              break;
            case 17:
            case 8191:
              break;
            default:
              F = !0;
          }
        } else
          this.observer.emit(D.Events.ERROR, D.Events.ERROR, { type: p.ErrorTypes.MEDIA_ERROR, details: p.ErrorDetails.FRAG_PARSING_ERROR, fatal: !1, reason: "TS packet did not start with 0x47" });
      o.pesData = I, b.pesData = P, _.pesData = M;
      var J = { audioTrack: b, avcTrack: o, id3Track: _, textTrack: this._txtTrack };
      return u && this.extractRemainingSamples(J), J;
    }, h.flush = function() {
      var g, c = this.remainderData;
      return this.remainderData = null, g = c ? this.demux(c, -1, !1, !0) : { audioTrack: this._audioTrack, avcTrack: this._avcTrack, textTrack: this._txtTrack, id3Track: this._id3Track }, this.extractRemainingSamples(g), this.sampleAes ? this.decrypt(g, this.sampleAes) : g;
    }, h.extractRemainingSamples = function(g) {
      var c, y = g.audioTrack, u = g.avcTrack, t = g.id3Track, o = u.pesData, b = y.pesData, _ = t.pesData;
      o && (c = s(o)) ? (this.parseAVCPES(c, !0), u.pesData = null) : u.pesData = o, b && (c = s(b)) ? (y.isAAC ? this.parseAACPES(c) : this.parseMPEGPES(c), y.pesData = null) : (b != null && b.size && T.logger.log("last AAC PES packet truncated,might overlap between fragments"), y.pesData = b), _ && (c = s(_)) ? (this.parseID3PES(c), t.pesData = null) : t.pesData = _;
    }, h.demuxSampleAes = function(g, c, y) {
      var u = this.demux(g, y, !0, !this.config.progressive), t = this.sampleAes = new C.default(this.observer, this.config, c);
      return this.decrypt(u, t);
    }, h.decrypt = function(g, c) {
      return new Promise(function(y) {
        var u = g.audioTrack, t = g.avcTrack;
        u.samples && u.isAAC ? c.decryptAacSamples(u.samples, 0, function() {
          t.samples ? c.decryptAvcSamples(t.samples, 0, 0, function() {
            y(g);
          }) : y(g);
        }) : t.samples && c.decryptAvcSamples(t.samples, 0, 0, function() {
          y(g);
        });
      });
    }, h.destroy = function() {
      this._initPTS = this._initDTS = null, this._duration = 0;
    }, h.parseAVCPES = function(g, c) {
      var y, u = this, t = this._avcTrack, o = this.parseAVCNALu(g.data), b = this.avcSample, _ = !1;
      g.data = null, b && o.length && !t.audFound && (n(b, t), b = this.avcSample = v(!1, g.pts, g.dts, "")), o.forEach(function(L) {
        switch (L.type) {
          case 1:
            y = !0, b || (b = u.avcSample = v(!0, g.pts, g.dts, "")), b.frame = !0;
            var I = L.data;
            if (_ && I.length > 4) {
              var O = new A.default(I).readSliceType();
              O !== 2 && O !== 4 && O !== 7 && O !== 9 || (b.key = !0);
            }
            break;
          case 5:
            y = !0, b || (b = u.avcSample = v(!0, g.pts, g.dts, "")), b.key = !0, b.frame = !0;
            break;
          case 6:
            y = !0;
            var x = new A.default(a(L.data));
            x.readUByte();
            for (var P = 0, M = 0, F = !1, N = 0; !F && x.bytesAvailable > 1; ) {
              P = 0;
              do
                P += N = x.readUByte();
              while (N === 255);
              M = 0;
              do
                M += N = x.readUByte();
              while (N === 255);
              if (P === 4 && x.bytesAvailable !== 0) {
                if (F = !0, x.readUByte() === 181 && x.readUShort() === 49 && x.readUInt() === 1195456820 && x.readUByte() === 3) {
                  for (var U = x.readUByte(), G = 31 & U, j = [U, x.readUByte()], V = 0; V < G; V++)
                    j.push(x.readUByte()), j.push(x.readUByte()), j.push(x.readUByte());
                  r(u._txtTrack.samples, { type: 3, pts: g.pts, bytes: j });
                }
              } else if (P === 5 && x.bytesAvailable !== 0) {
                if (F = !0, M > 16) {
                  for (var Y = [], W = 0; W < 16; W++)
                    Y.push(x.readUByte().toString(16)), W !== 3 && W !== 5 && W !== 7 && W !== 9 || Y.push("-");
                  for (var q = M - 16, X = new Uint8Array(q), J = 0; J < q; J++)
                    X[J] = x.readUByte();
                  r(u._txtTrack.samples, { pts: g.pts, payloadType: P, uuid: Y.join(""), userData: Object(k.utf8ArrayToStr)(X), userDataBytes: X });
                }
              } else if (M < x.bytesAvailable)
                for (var rt = 0; rt < M; rt++)
                  x.readUByte();
            }
            break;
          case 7:
            if (y = !0, _ = !0, !t.sps) {
              var Q = new A.default(L.data).readSPS();
              t.width = Q.width, t.height = Q.height, t.pixelRatio = Q.pixelRatio, t.sps = [L.data], t.duration = u._duration;
              for (var at = L.data.subarray(1, 4), z = "avc1.", tt = 0; tt < 3; tt++) {
                var it = at[tt].toString(16);
                it.length < 2 && (it = "0" + it), z += it;
              }
              t.codec = z;
            }
            break;
          case 8:
            y = !0, t.pps || (t.pps = [L.data]);
            break;
          case 9:
            y = !1, t.audFound = !0, b && n(b, t), b = u.avcSample = v(!1, g.pts, g.dts, "");
            break;
          case 12:
            y = !1;
            break;
          default:
            y = !1, b && (b.debug += "unknown NAL " + L.type + " ");
        }
        b && y && b.units.push(L);
      }), c && b && (n(b, t), this.avcSample = null);
    }, h.getLastNalUnit = function() {
      var g, c, y = this.avcSample;
      if (!y || y.units.length === 0) {
        var u = this._avcTrack.samples;
        y = u[u.length - 1];
      }
      if ((g = y) !== null && g !== void 0 && g.units) {
        var t = y.units;
        c = t[t.length - 1];
      }
      return c;
    }, h.parseAVCNALu = function(g) {
      var c, y, u = g.byteLength, t = this._avcTrack, o = t.naluState || 0, b = o, _ = [], L = 0, I = -1, O = 0;
      for (o === -1 && (I = 0, O = 31 & g[0], o = 0, L = 1); L < u; )
        if (c = g[L++], o)
          if (o !== 1)
            if (c)
              if (c === 1) {
                if (I >= 0) {
                  var x = { data: g.subarray(I, L - o - 1), type: O };
                  _.push(x);
                } else {
                  var P = this.getLastNalUnit();
                  if (P && (b && L <= 4 - b && P.state && (P.data = P.data.subarray(0, P.data.byteLength - b)), (y = L - o - 1) > 0)) {
                    var M = new Uint8Array(P.data.byteLength + y);
                    M.set(P.data, 0), M.set(g.subarray(0, y), P.data.byteLength), P.data = M;
                  }
                }
                L < u ? (I = L, O = 31 & g[L], o = 0) : o = -1;
              } else
                o = 0;
            else
              o = 3;
          else
            o = c ? 0 : 2;
        else
          o = c ? 0 : 1;
      if (I >= 0 && o >= 0) {
        var F = { data: g.subarray(I, u), type: O, state: o };
        _.push(F);
      }
      if (_.length === 0) {
        var N = this.getLastNalUnit();
        if (N) {
          var U = new Uint8Array(N.data.byteLength + g.byteLength);
          U.set(N.data, 0), U.set(g, N.data.byteLength), N.data = U;
        }
      }
      return t.naluState = o, _;
    }, h.parseAACPES = function(g) {
      var c, y, u, t, o, b = 0, _ = this._audioTrack, L = this.aacOverFlow, I = g.data;
      if (L) {
        this.aacOverFlow = null;
        var O = L.sample.unit.byteLength, x = Math.min(L.missing, O), P = O - x;
        L.sample.unit.set(I.subarray(0, x), P), _.samples.push(L.sample), b = L.missing;
      }
      for (c = b, y = I.length; c < y - 1 && !R.isHeader(I, c); c++)
        ;
      if (c === b || (c < y - 1 ? (u = "AAC PES did not start with ADTS header,offset:" + c, t = !1) : (u = "no ADTS header found in AAC PES", t = !0), T.logger.warn("parsing error:" + u), this.observer.emit(D.Events.ERROR, D.Events.ERROR, { type: p.ErrorTypes.MEDIA_ERROR, details: p.ErrorDetails.FRAG_PARSING_ERROR, fatal: t, reason: u }), !t)) {
        if (R.initTrackConfig(_, this.observer, I, c, this.audioCodec), g.pts !== void 0)
          o = g.pts;
        else {
          if (!L)
            return void T.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
          var M = R.getFrameDuration(_.samplerate);
          o = L.sample.pts + M;
        }
        for (var F = 0; c < y; ) {
          if (R.isHeader(I, c)) {
            if (c + 5 < y) {
              var N = R.appendFrame(_, I, c, o, F);
              if (N) {
                if (!N.missing) {
                  c += N.length, F++;
                  continue;
                }
                this.aacOverFlow = N;
              }
            }
            break;
          }
          c++;
        }
      }
    }, h.parseMPEGPES = function(g) {
      var c = g.data, y = c.length, u = 0, t = 0, o = g.pts;
      if (o !== void 0)
        for (; t < y; )
          if (S.isHeader(c, t)) {
            var b = S.appendFrame(this._audioTrack, c, t, o, u);
            if (!b)
              break;
            t += b.length, u++;
          } else
            t++;
      else
        T.logger.warn("[tsdemuxer]: MPEG PES unknown PTS");
    }, h.parseID3PES = function(g) {
      g.pts !== void 0 ? this._id3Track.samples.push(g) : T.logger.warn("[tsdemuxer]: ID3 PES unknown PTS");
    }, i;
  }();
  function v(i, h, g, c) {
    return { key: i, frame: !1, pts: h, dts: g, units: [], debug: c, length: 0 };
  }
  function l(i, h) {
    return (31 & i[h + 10]) << 8 | i[h + 11];
  }
  function e(i, h, g, c) {
    var y = { audio: -1, avc: -1, id3: -1, isAAC: !0 }, u = h + 3 + ((15 & i[h + 1]) << 8 | i[h + 2]) - 4;
    for (h += 12 + ((15 & i[h + 10]) << 8 | i[h + 11]); h < u; ) {
      var t = (31 & i[h + 1]) << 8 | i[h + 2];
      switch (i[h]) {
        case 207:
          if (!c) {
            T.logger.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream");
            break;
          }
        case 15:
          y.audio === -1 && (y.audio = t);
          break;
        case 21:
          y.id3 === -1 && (y.id3 = t);
          break;
        case 219:
          if (!c) {
            T.logger.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream");
            break;
          }
        case 27:
          y.avc === -1 && (y.avc = t);
          break;
        case 3:
        case 4:
          g ? y.audio === -1 && (y.audio = t, y.isAAC = !1) : T.logger.log("MPEG audio found, not supported in this browser");
          break;
        case 36:
          T.logger.warn("Unsupported HEVC stream type found");
      }
      h += 5 + ((15 & i[h + 3]) << 8 | i[h + 4]);
    }
    return y;
  }
  function s(i) {
    var h, g, c, y, u, t = 0, o = i.data;
    if (!i || i.size === 0)
      return null;
    for (; o[0].length < 19 && o.length > 1; ) {
      var b = new Uint8Array(o[0].length + o[1].length);
      b.set(o[0]), b.set(o[1], o[0].length), o[0] = b, o.splice(1, 1);
    }
    if (((h = o[0])[0] << 16) + (h[1] << 8) + h[2] === 1) {
      if ((g = (h[4] << 8) + h[5]) && g > i.size - 6)
        return null;
      var _ = h[7];
      192 & _ && (y = 536870912 * (14 & h[9]) + 4194304 * (255 & h[10]) + 16384 * (254 & h[11]) + 128 * (255 & h[12]) + (254 & h[13]) / 2, 64 & _ ? y - (u = 536870912 * (14 & h[14]) + 4194304 * (255 & h[15]) + 16384 * (254 & h[16]) + 128 * (255 & h[17]) + (254 & h[18]) / 2) > 54e5 && (T.logger.warn(Math.round((y - u) / 9e4) + "s delta between PTS and DTS, align them"), y = u) : u = y);
      var L = (c = h[8]) + 9;
      if (i.size <= L)
        return null;
      i.size -= L;
      for (var I = new Uint8Array(i.size), O = 0, x = o.length; O < x; O++) {
        var P = (h = o[O]).byteLength;
        if (L) {
          if (L > P) {
            L -= P;
            continue;
          }
          h = h.subarray(L), P -= L, L = 0;
        }
        I.set(h, t), t += P;
      }
      return g && (g -= c + 3), { data: I, pts: y, dts: u, len: g };
    }
    return null;
  }
  function n(i, h) {
    if (i.units.length && i.frame) {
      if (i.pts === void 0) {
        var g = h.samples, c = g.length;
        if (!c)
          return void h.dropped++;
        var y = g[c - 1];
        i.pts = y.pts, i.dts = y.dts;
      }
      h.samples.push(i);
    }
    i.debug.length && T.logger.log(i.pts + "/" + i.dts + ":" + i.debug);
  }
  function r(i, h) {
    var g = i.length;
    if (g > 0) {
      if (h.pts >= i[g - 1].pts)
        i.push(h);
      else
        for (var c = g - 1; c >= 0; c--)
          if (h.pts < i[c].pts) {
            i.splice(c, 0, h);
            break;
          }
    } else
      i.push(h);
  }
  function a(i) {
    for (var h = i.byteLength, g = [], c = 1; c < h - 2; )
      i[c] === 0 && i[c + 1] === 0 && i[c + 2] === 3 ? (g.push(c + 2), c += 2) : c++;
    if (g.length === 0)
      return i;
    var y = h - g.length, u = new Uint8Array(y), t = 0;
    for (c = 0; c < y; t++, c++)
      t === g[0] && (t++, g.shift()), u[c] = i[t];
    return u;
  }
  E.minProbeByteLength = 188, w.default = E;
}, "./src/errors.ts": function(B, w, f) {
  var R, S, A, k;
  f.r(w), f.d(w, "ErrorTypes", function() {
    return R;
  }), f.d(w, "ErrorDetails", function() {
    return A;
  }), (S = R || (R = {})).NETWORK_ERROR = "networkError", S.MEDIA_ERROR = "mediaError", S.KEY_SYSTEM_ERROR = "keySystemError", S.MUX_ERROR = "muxError", S.OTHER_ERROR = "otherError", (k = A || (A = {})).KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", k.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", k.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", k.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", k.KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData", k.MANIFEST_LOAD_ERROR = "manifestLoadError", k.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", k.MANIFEST_PARSING_ERROR = "manifestParsingError", k.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", k.LEVEL_EMPTY_ERROR = "levelEmptyError", k.LEVEL_LOAD_ERROR = "levelLoadError", k.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", k.LEVEL_SWITCH_ERROR = "levelSwitchError", k.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", k.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", k.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", k.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", k.FRAG_LOAD_ERROR = "fragLoadError", k.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", k.FRAG_DECRYPT_ERROR = "fragDecryptError", k.FRAG_PARSING_ERROR = "fragParsingError", k.REMUX_ALLOC_ERROR = "remuxAllocError", k.KEY_LOAD_ERROR = "keyLoadError", k.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", k.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", k.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", k.BUFFER_APPEND_ERROR = "bufferAppendError", k.BUFFER_APPENDING_ERROR = "bufferAppendingError", k.BUFFER_STALLED_ERROR = "bufferStalledError", k.BUFFER_FULL_ERROR = "bufferFullError", k.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", k.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", k.INTERNAL_EXCEPTION = "internalException", k.INTERNAL_ABORTED = "aborted", k.UNKNOWN = "unknown";
}, "./src/events.ts": function(B, w, f) {
  var R, S;
  f.r(w), f.d(w, "Events", function() {
    return R;
  }), (S = R || (R = {})).MEDIA_ATTACHING = "hlsMediaAttaching", S.MEDIA_ATTACHED = "hlsMediaAttached", S.MEDIA_DETACHING = "hlsMediaDetaching", S.MEDIA_DETACHED = "hlsMediaDetached", S.BUFFER_RESET = "hlsBufferReset", S.BUFFER_CODECS = "hlsBufferCodecs", S.BUFFER_CREATED = "hlsBufferCreated", S.BUFFER_APPENDING = "hlsBufferAppending", S.BUFFER_APPENDED = "hlsBufferAppended", S.BUFFER_EOS = "hlsBufferEos", S.BUFFER_FLUSHING = "hlsBufferFlushing", S.BUFFER_FLUSHED = "hlsBufferFlushed", S.MANIFEST_LOADING = "hlsManifestLoading", S.MANIFEST_LOADED = "hlsManifestLoaded", S.MANIFEST_PARSED = "hlsManifestParsed", S.LEVEL_SWITCHING = "hlsLevelSwitching", S.LEVEL_SWITCHED = "hlsLevelSwitched", S.LEVEL_LOADING = "hlsLevelLoading", S.LEVEL_LOADED = "hlsLevelLoaded", S.LEVEL_UPDATED = "hlsLevelUpdated", S.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", S.LEVELS_UPDATED = "hlsLevelsUpdated", S.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", S.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", S.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", S.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", S.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", S.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", S.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", S.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", S.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", S.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", S.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", S.CUES_PARSED = "hlsCuesParsed", S.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", S.INIT_PTS_FOUND = "hlsInitPtsFound", S.FRAG_LOADING = "hlsFragLoading", S.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", S.FRAG_LOADED = "hlsFragLoaded", S.FRAG_DECRYPTED = "hlsFragDecrypted", S.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", S.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", S.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", S.FRAG_PARSED = "hlsFragParsed", S.FRAG_BUFFERED = "hlsFragBuffered", S.FRAG_CHANGED = "hlsFragChanged", S.FPS_DROP = "hlsFpsDrop", S.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", S.ERROR = "hlsError", S.DESTROYING = "hlsDestroying", S.KEY_LOADING = "hlsKeyLoading", S.KEY_LOADED = "hlsKeyLoaded", S.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", S.BACK_BUFFER_REACHED = "hlsBackBufferReached";
}, "./src/hls.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return n;
  });
  var R = f("./node_modules/url-toolkit/src/url-toolkit.js"), S = f("./src/loader/playlist-loader.ts"), A = f("./src/loader/key-loader.ts"), k = f("./src/controller/id3-track-controller.ts"), C = f("./src/controller/latency-controller.ts"), D = f("./src/controller/level-controller.ts"), d = f("./src/controller/fragment-tracker.ts"), T = f("./src/controller/stream-controller.ts"), p = f("./src/is-supported.ts"), m = f("./src/utils/logger.ts"), E = f("./src/config.ts"), v = f("./node_modules/eventemitter3/index.js"), l = f("./src/events.ts"), e = f("./src/errors.ts");
  function s(r, a) {
    for (var i = 0; i < a.length; i++) {
      var h = a[i];
      h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(r, h.key, h);
    }
  }
  var n = function() {
    function r(c) {
      c === void 0 && (c = {}), this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new v.EventEmitter(), this._autoLevelCapping = void 0, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this._media = null, this.url = null;
      var y = this.config = Object(E.mergeConfig)(r.DefaultConfig, c);
      this.userConfig = c, Object(m.enableLogs)(y.debug), this._autoLevelCapping = -1, y.progressive && Object(E.enableStreamingMode)(y);
      var u = y.abrController, t = y.bufferController, o = y.capLevelController, b = y.fpsController, _ = this.abrController = new u(this), L = this.bufferController = new t(this), I = this.capLevelController = new o(this), O = new b(this), x = new S.default(this), P = new A.default(this), M = new k.default(this), F = this.levelController = new D.default(this), N = new d.FragmentTracker(this), U = this.streamController = new T.default(this, N);
      I.setStreamController(U), O.setStreamController(U);
      var G = [F, U];
      this.networkControllers = G;
      var j = [x, P, _, L, I, O, M, N];
      this.audioTrackController = this.createController(y.audioTrackController, null, G), this.createController(y.audioStreamController, N, G), this.subtitleTrackController = this.createController(y.subtitleTrackController, null, G), this.createController(y.subtitleStreamController, N, G), this.createController(y.timelineController, null, j), this.emeController = this.createController(y.emeController, null, j), this.latencyController = this.createController(C.default, null, j), this.coreComponents = j;
    }
    r.isSupported = function() {
      return Object(p.isSupported)();
    };
    var a, i, h, g = r.prototype;
    return g.createController = function(c, y, u) {
      if (c) {
        var t = y ? new c(this, y) : new c(this);
        return u && u.push(t), t;
      }
      return null;
    }, g.on = function(c, y, u) {
      u === void 0 && (u = this), this._emitter.on(c, y, u);
    }, g.once = function(c, y, u) {
      u === void 0 && (u = this), this._emitter.once(c, y, u);
    }, g.removeAllListeners = function(c) {
      this._emitter.removeAllListeners(c);
    }, g.off = function(c, y, u, t) {
      u === void 0 && (u = this), this._emitter.off(c, y, u, t);
    }, g.listeners = function(c) {
      return this._emitter.listeners(c);
    }, g.emit = function(c, y, u) {
      return this._emitter.emit(c, y, u);
    }, g.trigger = function(c, y) {
      if (this.config.debug)
        return this.emit(c, c, y);
      try {
        return this.emit(c, c, y);
      } catch (u) {
        m.logger.error("An internal error happened while handling event " + c + '. Error message: "' + u.message + '". Here is a stacktrace:', u), this.trigger(l.Events.ERROR, { type: e.ErrorTypes.OTHER_ERROR, details: e.ErrorDetails.INTERNAL_EXCEPTION, fatal: !1, event: c, error: u });
      }
      return !1;
    }, g.listenerCount = function(c) {
      return this._emitter.listenerCount(c);
    }, g.destroy = function() {
      m.logger.log("destroy"), this.trigger(l.Events.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach(function(c) {
        return c.destroy();
      }), this.networkControllers.length = 0, this.coreComponents.forEach(function(c) {
        return c.destroy();
      }), this.coreComponents.length = 0;
    }, g.attachMedia = function(c) {
      m.logger.log("attachMedia"), this._media = c, this.trigger(l.Events.MEDIA_ATTACHING, { media: c });
    }, g.detachMedia = function() {
      m.logger.log("detachMedia"), this.trigger(l.Events.MEDIA_DETACHING, void 0), this._media = null;
    }, g.loadSource = function(c) {
      this.stopLoad();
      var y = this.media, u = this.url, t = this.url = R.buildAbsoluteURL(self.location.href, c, { alwaysNormalize: !0 });
      m.logger.log("loadSource:" + t), y && u && u !== t && this.bufferController.hasSourceTypes() && (this.detachMedia(), this.attachMedia(y)), this.trigger(l.Events.MANIFEST_LOADING, { url: c });
    }, g.startLoad = function(c) {
      c === void 0 && (c = -1), m.logger.log("startLoad(" + c + ")"), this.networkControllers.forEach(function(y) {
        y.startLoad(c);
      });
    }, g.stopLoad = function() {
      m.logger.log("stopLoad"), this.networkControllers.forEach(function(c) {
        c.stopLoad();
      });
    }, g.swapAudioCodec = function() {
      m.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec();
    }, g.recoverMediaError = function() {
      m.logger.log("recoverMediaError");
      var c = this._media;
      this.detachMedia(), c && this.attachMedia(c);
    }, g.removeLevel = function(c, y) {
      y === void 0 && (y = 0), this.levelController.removeLevel(c, y);
    }, a = r, h = [{ key: "version", get: function() {
      return "1.0.10";
    } }, { key: "Events", get: function() {
      return l.Events;
    } }, { key: "ErrorTypes", get: function() {
      return e.ErrorTypes;
    } }, { key: "ErrorDetails", get: function() {
      return e.ErrorDetails;
    } }, { key: "DefaultConfig", get: function() {
      return r.defaultConfig ? r.defaultConfig : E.hlsDefaultConfig;
    }, set: function(c) {
      r.defaultConfig = c;
    } }], (i = [{ key: "levels", get: function() {
      var c = this.levelController.levels;
      return c || [];
    } }, { key: "currentLevel", get: function() {
      return this.streamController.currentLevel;
    }, set: function(c) {
      m.logger.log("set currentLevel:" + c), this.loadLevel = c, this.abrController.clearTimer(), this.streamController.immediateLevelSwitch();
    } }, { key: "nextLevel", get: function() {
      return this.streamController.nextLevel;
    }, set: function(c) {
      m.logger.log("set nextLevel:" + c), this.levelController.manualLevel = c, this.streamController.nextLevelSwitch();
    } }, { key: "loadLevel", get: function() {
      return this.levelController.level;
    }, set: function(c) {
      m.logger.log("set loadLevel:" + c), this.levelController.manualLevel = c;
    } }, { key: "nextLoadLevel", get: function() {
      return this.levelController.nextLoadLevel;
    }, set: function(c) {
      this.levelController.nextLoadLevel = c;
    } }, { key: "firstLevel", get: function() {
      return Math.max(this.levelController.firstLevel, this.minAutoLevel);
    }, set: function(c) {
      m.logger.log("set firstLevel:" + c), this.levelController.firstLevel = c;
    } }, { key: "startLevel", get: function() {
      return this.levelController.startLevel;
    }, set: function(c) {
      m.logger.log("set startLevel:" + c), c !== -1 && (c = Math.max(c, this.minAutoLevel)), this.levelController.startLevel = c;
    } }, { key: "capLevelToPlayerSize", get: function() {
      return this.config.capLevelToPlayerSize;
    }, set: function(c) {
      var y = !!c;
      y !== this.config.capLevelToPlayerSize && (y ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = y);
    } }, { key: "autoLevelCapping", get: function() {
      return this._autoLevelCapping;
    }, set: function(c) {
      this._autoLevelCapping !== c && (m.logger.log("set autoLevelCapping:" + c), this._autoLevelCapping = c);
    } }, { key: "bandwidthEstimate", get: function() {
      var c = this.abrController.bwEstimator;
      return c ? c.getEstimate() : NaN;
    } }, { key: "autoLevelEnabled", get: function() {
      return this.levelController.manualLevel === -1;
    } }, { key: "manualLevel", get: function() {
      return this.levelController.manualLevel;
    } }, { key: "minAutoLevel", get: function() {
      var c = this.levels, y = this.config.minAutoBitrate;
      if (!c)
        return 0;
      for (var u = c.length, t = 0; t < u; t++)
        if (c[t].maxBitrate > y)
          return t;
      return 0;
    } }, { key: "maxAutoLevel", get: function() {
      var c = this.levels, y = this.autoLevelCapping;
      return y === -1 && c && c.length ? c.length - 1 : y;
    } }, { key: "nextAutoLevel", get: function() {
      return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel);
    }, set: function(c) {
      this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, c);
    } }, { key: "audioTracks", get: function() {
      var c = this.audioTrackController;
      return c ? c.audioTracks : [];
    } }, { key: "audioTrack", get: function() {
      var c = this.audioTrackController;
      return c ? c.audioTrack : -1;
    }, set: function(c) {
      var y = this.audioTrackController;
      y && (y.audioTrack = c);
    } }, { key: "subtitleTracks", get: function() {
      var c = this.subtitleTrackController;
      return c ? c.subtitleTracks : [];
    } }, { key: "subtitleTrack", get: function() {
      var c = this.subtitleTrackController;
      return c ? c.subtitleTrack : -1;
    }, set: function(c) {
      var y = this.subtitleTrackController;
      y && (y.subtitleTrack = c);
    } }, { key: "media", get: function() {
      return this._media;
    } }, { key: "subtitleDisplay", get: function() {
      var c = this.subtitleTrackController;
      return !!c && c.subtitleDisplay;
    }, set: function(c) {
      var y = this.subtitleTrackController;
      y && (y.subtitleDisplay = c);
    } }, { key: "lowLatencyMode", get: function() {
      return this.config.lowLatencyMode;
    }, set: function(c) {
      this.config.lowLatencyMode = c;
    } }, { key: "liveSyncPosition", get: function() {
      return this.latencyController.liveSyncPosition;
    } }, { key: "latency", get: function() {
      return this.latencyController.latency;
    } }, { key: "maxLatency", get: function() {
      return this.latencyController.maxLatency;
    } }, { key: "targetLatency", get: function() {
      return this.latencyController.targetLatency;
    } }, { key: "drift", get: function() {
      return this.latencyController.drift;
    } }, { key: "forceStartLoad", get: function() {
      return this.streamController.forceStartLoad;
    } }]) && s(a.prototype, i), h && s(a, h), r;
  }();
  n.defaultConfig = void 0;
}, "./src/is-supported.ts": function(B, w, f) {
  f.r(w), f.d(w, "isSupported", function() {
    return A;
  }), f.d(w, "changeTypeSupported", function() {
    return k;
  });
  var R = f("./src/utils/mediasource-helper.ts");
  function S() {
    return self.SourceBuffer || self.WebKitSourceBuffer;
  }
  function A() {
    var C = Object(R.getMediaSource)();
    if (!C)
      return !1;
    var D = S(), d = C && typeof C.isTypeSupported == "function" && C.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'), T = !D || D.prototype && typeof D.prototype.appendBuffer == "function" && typeof D.prototype.remove == "function";
    return !!d && !!T;
  }
  function k() {
    var C, D = S();
    return typeof (D == null || (C = D.prototype) === null || C === void 0 ? void 0 : C.changeType) == "function";
  }
}, "./src/loader/fragment-loader.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return p;
  }), f.d(w, "LoadError", function() {
    return E;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/errors.ts");
  function A(v) {
    var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return (A = function(e) {
      if (e === null || (s = e, Function.toString.call(s).indexOf("[native code]") === -1))
        return e;
      var s;
      if (typeof e != "function")
        throw new TypeError("Super expression must either be null or a function");
      if (l !== void 0) {
        if (l.has(e))
          return l.get(e);
        l.set(e, n);
      }
      function n() {
        return k(e, arguments, d(this).constructor);
      }
      return n.prototype = Object.create(e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), D(n, e);
    })(v);
  }
  function k(v, l, e) {
    return (k = C() ? Reflect.construct : function(s, n, r) {
      var a = [null];
      a.push.apply(a, n);
      var i = new (Function.bind.apply(s, a))();
      return r && D(i, r.prototype), i;
    }).apply(null, arguments);
  }
  function C() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function")
      return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function D(v, l) {
    return (D = Object.setPrototypeOf || function(e, s) {
      return e.__proto__ = s, e;
    })(v, l);
  }
  function d(v) {
    return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(l) {
      return l.__proto__ || Object.getPrototypeOf(l);
    })(v);
  }
  var T = Math.pow(2, 17), p = function() {
    function v(e) {
      this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = e;
    }
    var l = v.prototype;
    return l.destroy = function() {
      this.loader && (this.loader.destroy(), this.loader = null);
    }, l.abort = function() {
      this.loader && this.loader.abort();
    }, l.load = function(e, s) {
      var n = this, r = e.url;
      if (!r)
        return Promise.reject(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.FRAG_LOAD_ERROR, fatal: !1, frag: e, networkDetails: null }, "Fragment does not have a " + (r ? "part list" : "url")));
      this.abort();
      var a = this.config, i = a.fLoader, h = a.loader;
      return new Promise(function(g, c) {
        n.loader && n.loader.destroy();
        var y = n.loader = e.loader = i ? new i(a) : new h(a), u = m(e), t = { timeout: a.fragLoadingTimeOut, maxRetry: 0, retryDelay: 0, maxRetryDelay: a.fragLoadingMaxRetryTimeout, highWaterMark: T };
        e.stats = y.stats, y.load(u, t, { onSuccess: function(o, b, _, L) {
          n.resetLoader(e, y), g({ frag: e, part: null, payload: o.data, networkDetails: L });
        }, onError: function(o, b, _) {
          n.resetLoader(e, y), c(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.FRAG_LOAD_ERROR, fatal: !1, frag: e, response: o, networkDetails: _ }));
        }, onAbort: function(o, b, _) {
          n.resetLoader(e, y), c(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.INTERNAL_ABORTED, fatal: !1, frag: e, networkDetails: _ }));
        }, onTimeout: function(o, b, _) {
          n.resetLoader(e, y), c(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: !1, frag: e, networkDetails: _ }));
        }, onProgress: function(o, b, _, L) {
          s && s({ frag: e, part: null, payload: _, networkDetails: L });
        } });
      });
    }, l.loadPart = function(e, s, n) {
      var r = this;
      this.abort();
      var a = this.config, i = a.fLoader, h = a.loader;
      return new Promise(function(g, c) {
        r.loader && r.loader.destroy();
        var y = r.loader = e.loader = i ? new i(a) : new h(a), u = m(e, s), t = { timeout: a.fragLoadingTimeOut, maxRetry: 0, retryDelay: 0, maxRetryDelay: a.fragLoadingMaxRetryTimeout, highWaterMark: T };
        s.stats = y.stats, y.load(u, t, { onSuccess: function(o, b, _, L) {
          r.resetLoader(e, y), r.updateStatsFromPart(e, s);
          var I = { frag: e, part: s, payload: o.data, networkDetails: L };
          n(I), g(I);
        }, onError: function(o, b, _) {
          r.resetLoader(e, y), c(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.FRAG_LOAD_ERROR, fatal: !1, frag: e, part: s, response: o, networkDetails: _ }));
        }, onAbort: function(o, b, _) {
          e.stats.aborted = s.stats.aborted, r.resetLoader(e, y), c(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.INTERNAL_ABORTED, fatal: !1, frag: e, part: s, networkDetails: _ }));
        }, onTimeout: function(o, b, _) {
          r.resetLoader(e, y), c(new E({ type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: !1, frag: e, part: s, networkDetails: _ }));
        } });
      });
    }, l.updateStatsFromPart = function(e, s) {
      var n = e.stats, r = s.stats, a = r.total;
      if (n.loaded += r.loaded, a) {
        var i = Math.round(e.duration / s.duration), h = Math.min(Math.round(n.loaded / a), i), g = (i - h) * Math.round(n.loaded / h);
        n.total = n.loaded + g;
      } else
        n.total = Math.max(n.loaded, n.total);
      var c = n.loading, y = r.loading;
      c.start ? c.first += y.first - y.start : (c.start = y.start, c.first = y.first), c.end = y.end;
    }, l.resetLoader = function(e, s) {
      e.loader = null, this.loader === s && (self.clearTimeout(this.partLoadTimeout), this.loader = null), s.destroy();
    }, v;
  }();
  function m(v, l) {
    l === void 0 && (l = null);
    var e = l || v, s = { frag: v, part: l, responseType: "arraybuffer", url: e.url, rangeStart: 0, rangeEnd: 0 }, n = e.byteRangeStartOffset, r = e.byteRangeEndOffset;
    return Object(R.isFiniteNumber)(n) && Object(R.isFiniteNumber)(r) && (s.rangeStart = n, s.rangeEnd = r), s;
  }
  var E = function(v) {
    var l, e;
    function s(n) {
      for (var r, a = arguments.length, i = new Array(a > 1 ? a - 1 : 0), h = 1; h < a; h++)
        i[h - 1] = arguments[h];
      return (r = v.call.apply(v, [this].concat(i)) || this).data = void 0, r.data = n, r;
    }
    return e = v, (l = s).prototype = Object.create(e.prototype), l.prototype.constructor = l, D(l, e), s;
  }(A(Error));
}, "./src/loader/fragment.ts": function(B, w, f) {
  f.r(w), f.d(w, "ElementaryStreamTypes", function() {
    return R;
  }), f.d(w, "BaseSegment", function() {
    return v;
  }), f.d(w, "Fragment", function() {
    return l;
  }), f.d(w, "Part", function() {
    return e;
  });
  var R, S, A = f("./src/polyfills/number.ts"), k = f("./node_modules/url-toolkit/src/url-toolkit.js"), C = f("./src/utils/logger.ts"), D = f("./src/loader/level-key.ts"), d = f("./src/loader/load-stats.ts");
  function T(s, n) {
    s.prototype = Object.create(n.prototype), s.prototype.constructor = s, p(s, n);
  }
  function p(s, n) {
    return (p = Object.setPrototypeOf || function(r, a) {
      return r.__proto__ = a, r;
    })(s, n);
  }
  function m(s, n) {
    for (var r = 0; r < n.length; r++) {
      var a = n[r];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(s, a.key, a);
    }
  }
  function E(s, n, r) {
    return n && m(s.prototype, n), r && m(s, r), s;
  }
  (S = R || (R = {})).AUDIO = "audio", S.VIDEO = "video", S.AUDIOVIDEO = "audiovideo";
  var v = function() {
    function s(n) {
      var r;
      this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = ((r = {})[R.AUDIO] = null, r[R.VIDEO] = null, r[R.AUDIOVIDEO] = null, r), this.baseurl = n;
    }
    return s.prototype.setByteRange = function(n, r) {
      var a = n.split("@", 2), i = [];
      a.length === 1 ? i[0] = r ? r.byteRangeEndOffset : 0 : i[0] = parseInt(a[1]), i[1] = parseInt(a[0]) + i[0], this._byteRange = i;
    }, E(s, [{ key: "byteRange", get: function() {
      return this._byteRange ? this._byteRange : [];
    } }, { key: "byteRangeStartOffset", get: function() {
      return this.byteRange[0];
    } }, { key: "byteRangeEndOffset", get: function() {
      return this.byteRange[1];
    } }, { key: "url", get: function() {
      return !this._url && this.baseurl && this.relurl && (this._url = Object(k.buildAbsoluteURL)(this.baseurl, this.relurl, { alwaysNormalize: !0 })), this._url || "";
    }, set: function(n) {
      this._url = n;
    } }]), s;
  }(), l = function(s) {
    function n(a, i) {
      var h;
      return (h = s.call(this, i) || this)._decryptdata = null, h.rawProgramDateTime = null, h.programDateTime = null, h.tagList = [], h.duration = 0, h.sn = 0, h.levelkey = void 0, h.type = void 0, h.loader = null, h.level = -1, h.cc = 0, h.startPTS = void 0, h.endPTS = void 0, h.appendedPTS = void 0, h.startDTS = void 0, h.endDTS = void 0, h.start = 0, h.deltaPTS = void 0, h.maxStartPTS = void 0, h.minEndPTS = void 0, h.stats = new d.LoadStats(), h.urlId = 0, h.data = void 0, h.bitrateTest = !1, h.title = null, h.initSegment = null, h.type = a, h;
    }
    T(n, s);
    var r = n.prototype;
    return r.createInitializationVector = function(a) {
      for (var i = new Uint8Array(16), h = 12; h < 16; h++)
        i[h] = a >> 8 * (15 - h) & 255;
      return i;
    }, r.setDecryptDataFromLevelKey = function(a, i) {
      var h = a;
      return (a == null ? void 0 : a.method) === "AES-128" && a.uri && !a.iv && ((h = D.LevelKey.fromURI(a.uri)).method = a.method, h.iv = this.createInitializationVector(i), h.keyFormat = "identity"), h;
    }, r.setElementaryStreamInfo = function(a, i, h, g, c, y) {
      y === void 0 && (y = !1);
      var u = this.elementaryStreams, t = u[a];
      t ? (t.startPTS = Math.min(t.startPTS, i), t.endPTS = Math.max(t.endPTS, h), t.startDTS = Math.min(t.startDTS, g), t.endDTS = Math.max(t.endDTS, c)) : u[a] = { startPTS: i, endPTS: h, startDTS: g, endDTS: c, partial: y };
    }, r.clearElementaryStreamInfo = function() {
      var a = this.elementaryStreams;
      a[R.AUDIO] = null, a[R.VIDEO] = null, a[R.AUDIOVIDEO] = null;
    }, E(n, [{ key: "decryptdata", get: function() {
      if (!this.levelkey && !this._decryptdata)
        return null;
      if (!this._decryptdata && this.levelkey) {
        var a = this.sn;
        typeof a != "number" && (this.levelkey && this.levelkey.method === "AES-128" && !this.levelkey.iv && C.logger.warn('missing IV for initialization segment with method="' + this.levelkey.method + '" - compliance issue'), a = 0), this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, a);
      }
      return this._decryptdata;
    } }, { key: "end", get: function() {
      return this.start + this.duration;
    } }, { key: "endProgramDateTime", get: function() {
      if (this.programDateTime === null || !Object(A.isFiniteNumber)(this.programDateTime))
        return null;
      var a = Object(A.isFiniteNumber)(this.duration) ? this.duration : 0;
      return this.programDateTime + 1e3 * a;
    } }, { key: "encrypted", get: function() {
      var a;
      return !((a = this.decryptdata) === null || a === void 0 || !a.keyFormat || !this.decryptdata.uri);
    } }]), n;
  }(v), e = function(s) {
    function n(r, a, i, h, g) {
      var c;
      (c = s.call(this, i) || this).fragOffset = 0, c.duration = 0, c.gap = !1, c.independent = !1, c.relurl = void 0, c.fragment = void 0, c.index = void 0, c.stats = new d.LoadStats(), c.duration = r.decimalFloatingPoint("DURATION"), c.gap = r.bool("GAP"), c.independent = r.bool("INDEPENDENT"), c.relurl = r.enumeratedString("URI"), c.fragment = a, c.index = h;
      var y = r.enumeratedString("BYTERANGE");
      return y && c.setByteRange(y, g), g && (c.fragOffset = g.fragOffset + g.duration), c;
    }
    return T(n, s), E(n, [{ key: "start", get: function() {
      return this.fragment.start + this.fragOffset;
    } }, { key: "end", get: function() {
      return this.start + this.duration;
    } }, { key: "loaded", get: function() {
      var r = this.elementaryStreams;
      return !!(r.audio || r.video || r.audiovideo);
    } }]), n;
  }(v);
}, "./src/loader/key-loader.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return k;
  });
  var R = f("./src/events.ts"), S = f("./src/errors.ts"), A = f("./src/utils/logger.ts"), k = function() {
    function C(d) {
      this.hls = void 0, this.loaders = {}, this.decryptkey = null, this.decrypturl = null, this.hls = d, this._registerListeners();
    }
    var D = C.prototype;
    return D._registerListeners = function() {
      this.hls.on(R.Events.KEY_LOADING, this.onKeyLoading, this);
    }, D._unregisterListeners = function() {
      this.hls.off(R.Events.KEY_LOADING, this.onKeyLoading);
    }, D.destroy = function() {
      for (var d in this._unregisterListeners(), this.loaders) {
        var T = this.loaders[d];
        T && T.destroy();
      }
      this.loaders = {};
    }, D.onKeyLoading = function(d, T) {
      var p = T.frag, m = p.type, E = this.loaders[m];
      if (p.decryptdata) {
        var v = p.decryptdata.uri;
        if (v !== this.decrypturl || this.decryptkey === null) {
          var l = this.hls.config;
          if (E && (A.logger.warn("abort previous key loader for type:" + m), E.abort()), !v)
            return void A.logger.warn("key uri is falsy");
          var e = l.loader, s = p.loader = this.loaders[m] = new e(l);
          this.decrypturl = v, this.decryptkey = null;
          var n = { url: v, frag: p, responseType: "arraybuffer" }, r = { timeout: l.fragLoadingTimeOut, maxRetry: 0, retryDelay: l.fragLoadingRetryDelay, maxRetryDelay: l.fragLoadingMaxRetryTimeout, highWaterMark: 0 }, a = { onSuccess: this.loadsuccess.bind(this), onError: this.loaderror.bind(this), onTimeout: this.loadtimeout.bind(this) };
          s.load(n, r, a);
        } else
          this.decryptkey && (p.decryptdata.key = this.decryptkey, this.hls.trigger(R.Events.KEY_LOADED, { frag: p }));
      } else
        A.logger.warn("Missing decryption data on fragment in onKeyLoading");
    }, D.loadsuccess = function(d, T, p) {
      var m = p.frag;
      m.decryptdata ? (this.decryptkey = m.decryptdata.key = new Uint8Array(d.data), m.loader = null, delete this.loaders[m.type], this.hls.trigger(R.Events.KEY_LOADED, { frag: m })) : A.logger.error("after key load, decryptdata unset");
    }, D.loaderror = function(d, T) {
      var p = T.frag, m = p.loader;
      m && m.abort(), delete this.loaders[p.type], this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.KEY_LOAD_ERROR, fatal: !1, frag: p, response: d });
    }, D.loadtimeout = function(d, T) {
      var p = T.frag, m = p.loader;
      m && m.abort(), delete this.loaders[p.type], this.hls.trigger(R.Events.ERROR, { type: S.ErrorTypes.NETWORK_ERROR, details: S.ErrorDetails.KEY_LOAD_TIMEOUT, fatal: !1, frag: p });
    }, C;
  }();
}, "./src/loader/level-details.ts": function(B, w, f) {
  f.r(w), f.d(w, "LevelDetails", function() {
    return A;
  });
  var R = f("./src/polyfills/number.ts");
  function S(k, C) {
    for (var D = 0; D < C.length; D++) {
      var d = C[D];
      d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(k, d.key, d);
    }
  }
  var A = function() {
    function k(T) {
      this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.needSidxRanges = !1, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.fragments = [], this.url = T;
    }
    var C, D, d;
    return k.prototype.reloaded = function(T) {
      if (!T)
        return this.advanced = !0, void (this.updated = !0);
      var p = this.lastPartSn - T.lastPartSn, m = this.lastPartIndex - T.lastPartIndex;
      this.updated = this.endSN !== T.endSN || !!m || !!p, this.advanced = this.endSN > T.endSN || p > 0 || p === 0 && m > 0, this.updated || this.advanced ? this.misses = Math.floor(0.6 * T.misses) : this.misses = T.misses + 1, this.availabilityDelay = T.availabilityDelay;
    }, C = k, (D = [{ key: "hasProgramDateTime", get: function() {
      return !!this.fragments.length && Object(R.isFiniteNumber)(this.fragments[this.fragments.length - 1].programDateTime);
    } }, { key: "levelTargetDuration", get: function() {
      return this.averagetargetduration || this.targetduration || 10;
    } }, { key: "drift", get: function() {
      var T = this.driftEndTime - this.driftStartTime;
      return T > 0 ? 1e3 * (this.driftEnd - this.driftStart) / T : 1;
    } }, { key: "edge", get: function() {
      return this.partEnd || this.fragmentEnd;
    } }, { key: "partEnd", get: function() {
      var T;
      return (T = this.partList) !== null && T !== void 0 && T.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd;
    } }, { key: "fragmentEnd", get: function() {
      var T;
      return (T = this.fragments) !== null && T !== void 0 && T.length ? this.fragments[this.fragments.length - 1].end : 0;
    } }, { key: "age", get: function() {
      return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0;
    } }, { key: "lastPartIndex", get: function() {
      var T;
      return (T = this.partList) !== null && T !== void 0 && T.length ? this.partList[this.partList.length - 1].index : -1;
    } }, { key: "lastPartSn", get: function() {
      var T;
      return (T = this.partList) !== null && T !== void 0 && T.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN;
    } }]) && S(C.prototype, D), d && S(C, d), k;
  }();
}, "./src/loader/level-key.ts": function(B, w, f) {
  f.r(w), f.d(w, "LevelKey", function() {
    return A;
  });
  var R = f("./node_modules/url-toolkit/src/url-toolkit.js");
  function S(k, C) {
    for (var D = 0; D < C.length; D++) {
      var d = C[D];
      d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(k, d.key, d);
    }
  }
  var A = function() {
    function k(T, p) {
      this._uri = null, this.method = null, this.keyFormat = null, this.keyFormatVersions = null, this.keyID = null, this.key = null, this.iv = null, this._uri = p ? Object(R.buildAbsoluteURL)(T, p, { alwaysNormalize: !0 }) : T;
    }
    var C, D, d;
    return k.fromURL = function(T, p) {
      return new k(T, p);
    }, k.fromURI = function(T) {
      return new k(T);
    }, C = k, (D = [{ key: "uri", get: function() {
      return this._uri;
    } }]) && S(C.prototype, D), d && S(C, d), k;
  }();
}, "./src/loader/load-stats.ts": function(B, w, f) {
  f.r(w), f.d(w, "LoadStats", function() {
    return R;
  });
  var R = function() {
    this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = { start: 0, first: 0, end: 0 }, this.parsing = { start: 0, end: 0 }, this.buffering = { start: 0, first: 0, end: 0 };
  };
}, "./src/loader/m3u8-parser.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return e;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./node_modules/url-toolkit/src/url-toolkit.js"), A = f("./src/loader/fragment.ts"), k = f("./src/loader/level-details.ts"), C = f("./src/loader/level-key.ts"), D = f("./src/utils/attr-list.ts"), d = f("./src/utils/logger.ts"), T = f("./src/utils/codecs.ts"), p = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+/g, m = /#EXT-X-MEDIA:(.*)/g, E = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /(?!#) *(\S[\S ]*)/.source, /#EXT-X-BYTERANGE:*(.+)/.source, /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /#.*/.source].join("|"), "g"), v = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(PLAYLIST-TYPE):(.+)/.source, /#EXT-X-(MEDIA-SEQUENCE): *(\d+)/.source, /#EXT-X-(SKIP):(.+)/.source, /#EXT-X-(TARGETDURATION): *(\d+)/.source, /#EXT-X-(KEY):(.+)/.source, /#EXT-X-(START):(.+)/.source, /#EXT-X-(ENDLIST)/.source, /#EXT-X-(DISCONTINUITY-SEQ)UENCE: *(\d+)/.source, /#EXT-X-(DIS)CONTINUITY/.source, /#EXT-X-(VERSION):(\d+)/.source, /#EXT-X-(MAP):(.+)/.source, /#EXT-X-(SERVER-CONTROL):(.+)/.source, /#EXT-X-(PART-INF):(.+)/.source, /#EXT-X-(GAP)/.source, /#EXT-X-(BITRATE):\s*(\d+)/.source, /#EXT-X-(PART):(.+)/.source, /#EXT-X-(PRELOAD-HINT):(.+)/.source, /#EXT-X-(RENDITION-REPORT):(.+)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|")), l = /\.(mp4|m4s|m4v|m4a)$/i, e = function() {
    function a() {
    }
    return a.findGroup = function(i, h) {
      for (var g = 0; g < i.length; g++) {
        var c = i[g];
        if (c.id === h)
          return c;
      }
    }, a.convertAVC1ToAVCOTI = function(i) {
      var h = i.split(".");
      if (h.length > 2) {
        var g = h.shift() + ".";
        return g += parseInt(h.shift()).toString(16), g += ("000" + parseInt(h.shift()).toString(16)).substr(-4);
      }
      return i;
    }, a.resolve = function(i, h) {
      return S.buildAbsoluteURL(h, i, { alwaysNormalize: !0 });
    }, a.parseMasterPlaylist = function(i, h) {
      var g, c = [], y = {}, u = !1;
      for (p.lastIndex = 0; (g = p.exec(i)) != null; )
        if (g[1]) {
          var t = new D.AttrList(g[1]), o = { attrs: t, bitrate: t.decimalInteger("AVERAGE-BANDWIDTH") || t.decimalInteger("BANDWIDTH"), name: t.NAME, url: a.resolve(g[2], h) }, b = t.decimalResolution("RESOLUTION");
          b && (o.width = b.width, o.height = b.height), s((t.CODECS || "").split(/[ ,]+/).filter(function(L) {
            return L;
          }), o), o.videoCodec && o.videoCodec.indexOf("avc1") !== -1 && (o.videoCodec = a.convertAVC1ToAVCOTI(o.videoCodec)), c.push(o);
        } else if (g[3]) {
          var _ = new D.AttrList(g[3]);
          _["DATA-ID"] && (u = !0, y[_["DATA-ID"]] = _);
        }
      return { levels: c, sessionData: u ? y : null };
    }, a.parseMasterPlaylistMedia = function(i, h, g, c) {
      var y;
      c === void 0 && (c = []);
      var u = [], t = 0;
      for (m.lastIndex = 0; (y = m.exec(i)) !== null; ) {
        var o = new D.AttrList(y[1]);
        if (o.TYPE === g) {
          var b = { attrs: o, bitrate: 0, id: t++, groupId: o["GROUP-ID"], instreamId: o["INSTREAM-ID"], name: o.NAME || o.LANGUAGE || "", type: g, default: o.bool("DEFAULT"), autoselect: o.bool("AUTOSELECT"), forced: o.bool("FORCED"), lang: o.LANGUAGE, url: o.URI ? a.resolve(o.URI, h) : "" };
          if (c.length) {
            var _ = a.findGroup(c, b.groupId) || c[0];
            n(b, _, "audioCodec"), n(b, _, "textCodec");
          }
          u.push(b);
        }
      }
      return u;
    }, a.parseLevelPlaylist = function(i, h, g, c, y) {
      var u, t, o, b = new k.LevelDetails(h), _ = b.fragments, L = null, I = 0, O = 0, x = 0, P = 0, M = null, F = new A.Fragment(c, h), N = -1, U = !1;
      for (E.lastIndex = 0, b.m3u8 = i; (u = E.exec(i)) !== null; ) {
        U && (U = !1, (F = new A.Fragment(c, h)).start = x, F.sn = I, F.cc = P, F.level = g, L && (F.initSegment = L, F.rawProgramDateTime = L.rawProgramDateTime));
        var G = u[1];
        if (G) {
          F.duration = parseFloat(G);
          var j = (" " + u[2]).slice(1);
          F.title = j || null, F.tagList.push(j ? ["INF", G, j] : ["INF", G]);
        } else if (u[3])
          Object(R.isFiniteNumber)(F.duration) && (F.start = x, o && (F.levelkey = o), F.sn = I, F.level = g, F.cc = P, F.urlId = y, _.push(F), F.relurl = (" " + u[3]).slice(1), r(F, M), M = F, x += F.duration, I++, O = 0, U = !0);
        else if (u[4]) {
          var V = (" " + u[4]).slice(1);
          M ? F.setByteRange(V, M) : F.setByteRange(V);
        } else if (u[5])
          F.rawProgramDateTime = (" " + u[5]).slice(1), F.tagList.push(["PROGRAM-DATE-TIME", F.rawProgramDateTime]), N === -1 && (N = _.length);
        else {
          if (!(u = u[0].match(v))) {
            d.logger.warn("No matches on slow regex match for level playlist!");
            continue;
          }
          for (t = 1; t < u.length && u[t] === void 0; t++)
            ;
          var Y = (" " + u[t]).slice(1), W = (" " + u[t + 1]).slice(1), q = u[t + 2] ? (" " + u[t + 2]).slice(1) : "";
          switch (Y) {
            case "PLAYLIST-TYPE":
              b.type = W.toUpperCase();
              break;
            case "MEDIA-SEQUENCE":
              I = b.startSN = parseInt(W);
              break;
            case "SKIP":
              var X = new D.AttrList(W), J = X.decimalInteger("SKIPPED-SEGMENTS");
              if (Object(R.isFiniteNumber)(J)) {
                b.skippedSegments = J;
                for (var rt = J; rt--; )
                  _.unshift(null);
                I += J;
              }
              var Q = X.enumeratedString("RECENTLY-REMOVED-DATERANGES");
              Q && (b.recentlyRemovedDateranges = Q.split("	"));
              break;
            case "TARGETDURATION":
              b.targetduration = parseFloat(W);
              break;
            case "VERSION":
              b.version = parseInt(W);
              break;
            case "EXTM3U":
              break;
            case "ENDLIST":
              b.live = !1;
              break;
            case "#":
              (W || q) && F.tagList.push(q ? [W, q] : [W]);
              break;
            case "DIS":
              P++;
            case "GAP":
              F.tagList.push([Y]);
              break;
            case "BITRATE":
              F.tagList.push([Y, W]);
              break;
            case "DISCONTINUITY-SEQ":
              P = parseInt(W);
              break;
            case "KEY":
              var at, z = new D.AttrList(W), tt = z.enumeratedString("METHOD"), it = z.URI, nt = z.hexadecimalInteger("IV"), dt = z.enumeratedString("KEYFORMATVERSIONS"), gt = z.enumeratedString("KEYID"), vt = (at = z.enumeratedString("KEYFORMAT")) != null ? at : "identity";
              if (["com.apple.streamingkeydelivery", "com.microsoft.playready", "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine"].indexOf(vt) > -1) {
                d.logger.warn("Keyformat " + vt + " is not supported from the manifest");
                continue;
              }
              if (vt !== "identity")
                continue;
              tt && (o = C.LevelKey.fromURL(h, it), it && ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(tt) >= 0 && (o.method = tt, o.keyFormat = vt, gt && (o.keyID = gt), dt && (o.keyFormatVersions = dt), o.iv = nt));
              break;
            case "START":
              var mt = new D.AttrList(W).decimalFloatingPoint("TIME-OFFSET");
              Object(R.isFiniteNumber)(mt) && (b.startTimeOffset = mt);
              break;
            case "MAP":
              var lt = new D.AttrList(W);
              F.relurl = lt.URI, lt.BYTERANGE && F.setByteRange(lt.BYTERANGE), F.level = g, F.sn = "initSegment", o && (F.levelkey = o), F.initSegment = null, L = F, U = !0;
              break;
            case "SERVER-CONTROL":
              var ot = new D.AttrList(W);
              b.canBlockReload = ot.bool("CAN-BLOCK-RELOAD"), b.canSkipUntil = ot.optionalFloat("CAN-SKIP-UNTIL", 0), b.canSkipDateRanges = b.canSkipUntil > 0 && ot.bool("CAN-SKIP-DATERANGES"), b.partHoldBack = ot.optionalFloat("PART-HOLD-BACK", 0), b.holdBack = ot.optionalFloat("HOLD-BACK", 0);
              break;
            case "PART-INF":
              var Nt = new D.AttrList(W);
              b.partTarget = Nt.decimalFloatingPoint("PART-TARGET");
              break;
            case "PART":
              var yt = b.partList;
              yt || (yt = b.partList = []);
              var Lt = O > 0 ? yt[yt.length - 1] : void 0, Bt = O++, kt = new A.Part(new D.AttrList(W), F, h, Bt, Lt);
              yt.push(kt), F.duration += kt.duration;
              break;
            case "PRELOAD-HINT":
              var St = new D.AttrList(W);
              b.preloadHint = St;
              break;
            case "RENDITION-REPORT":
              var Kt = new D.AttrList(W);
              b.renditionReports = b.renditionReports || [], b.renditionReports.push(Kt);
              break;
            default:
              d.logger.warn("line parsed but not handled: " + u);
          }
        }
      }
      M && !M.relurl ? (_.pop(), x -= M.duration, b.partList && (b.fragmentHint = M)) : b.partList && (r(F, M), F.cc = P, b.fragmentHint = F);
      var Ut = _.length, bt = _[0], Vt = _[Ut - 1];
      if ((x += b.skippedSegments * b.targetduration) > 0 && Ut && Vt) {
        b.averagetargetduration = x / Ut;
        var Gt = Vt.sn;
        b.endSN = Gt !== "initSegment" ? Gt : 0, bt && (b.startCC = bt.cc, bt.initSegment || b.fragments.every(function(Rt) {
          return Rt.relurl && (At = Rt.relurl, l.test((_t = (Et = S.parseURL(At)) === null || Et === void 0 ? void 0 : Et.path) != null ? _t : ""));
          var At, _t, Et;
        }) && (d.logger.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"), (F = new A.Fragment(c, h)).relurl = Vt.relurl, F.level = g, F.sn = "initSegment", bt.initSegment = F, b.needSidxRanges = !0));
      } else
        b.endSN = 0, b.startCC = 0;
      return b.fragmentHint && (x += b.fragmentHint.duration), b.totalduration = x, b.endCC = P, N > 0 && function(Rt, At) {
        for (var _t = Rt[At], Et = At; Et--; ) {
          var It = Rt[Et];
          if (!It)
            return;
          It.programDateTime = _t.programDateTime - 1e3 * It.duration, _t = It;
        }
      }(_, N), b;
    }, a;
  }();
  function s(a, i) {
    ["video", "audio", "text"].forEach(function(h) {
      var g = a.filter(function(y) {
        return Object(T.isCodecType)(y, h);
      });
      if (g.length) {
        var c = g.filter(function(y) {
          return y.lastIndexOf("avc1", 0) === 0 || y.lastIndexOf("mp4a", 0) === 0;
        });
        i[h + "Codec"] = c.length > 0 ? c[0] : g[0], a = a.filter(function(y) {
          return g.indexOf(y) === -1;
        });
      }
    }), i.unknownCodecs = a;
  }
  function n(a, i, h) {
    var g = i[h];
    g && (a[h] = g);
  }
  function r(a, i) {
    a.rawProgramDateTime ? a.programDateTime = Date.parse(a.rawProgramDateTime) : i != null && i.programDateTime && (a.programDateTime = i.endProgramDateTime), Object(R.isFiniteNumber)(a.programDateTime) || (a.programDateTime = null, a.rawProgramDateTime = null);
  }
}, "./src/loader/playlist-loader.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/polyfills/number.ts"), S = f("./src/events.ts"), A = f("./src/errors.ts"), k = f("./src/utils/logger.ts"), C = f("./src/utils/mp4-tools.ts"), D = f("./src/loader/m3u8-parser.ts"), d = f("./src/types/loader.ts"), T = f("./src/utils/attr-list.ts");
  function p(E, v) {
    var l = E.url;
    return l !== void 0 && l.indexOf("data:") !== 0 || (l = v.url), l;
  }
  var m = function() {
    function E(l) {
      this.hls = void 0, this.loaders = /* @__PURE__ */ Object.create(null), this.hls = l, this.registerListeners();
    }
    var v = E.prototype;
    return v.registerListeners = function() {
      var l = this.hls;
      l.on(S.Events.MANIFEST_LOADING, this.onManifestLoading, this), l.on(S.Events.LEVEL_LOADING, this.onLevelLoading, this), l.on(S.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), l.on(S.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
    }, v.unregisterListeners = function() {
      var l = this.hls;
      l.off(S.Events.MANIFEST_LOADING, this.onManifestLoading, this), l.off(S.Events.LEVEL_LOADING, this.onLevelLoading, this), l.off(S.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), l.off(S.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
    }, v.createInternalLoader = function(l) {
      var e = this.hls.config, s = e.pLoader, n = e.loader, r = new (s || n)(e);
      return l.loader = r, this.loaders[l.type] = r, r;
    }, v.getInternalLoader = function(l) {
      return this.loaders[l.type];
    }, v.resetInternalLoader = function(l) {
      this.loaders[l] && delete this.loaders[l];
    }, v.destroyInternalLoaders = function() {
      for (var l in this.loaders) {
        var e = this.loaders[l];
        e && e.destroy(), this.resetInternalLoader(l);
      }
    }, v.destroy = function() {
      this.unregisterListeners(), this.destroyInternalLoaders();
    }, v.onManifestLoading = function(l, e) {
      var s = e.url;
      this.load({ id: null, groupId: null, level: 0, responseType: "text", type: d.PlaylistContextType.MANIFEST, url: s, deliveryDirectives: null });
    }, v.onLevelLoading = function(l, e) {
      var s = e.id, n = e.level, r = e.url, a = e.deliveryDirectives;
      this.load({ id: s, groupId: null, level: n, responseType: "text", type: d.PlaylistContextType.LEVEL, url: r, deliveryDirectives: a });
    }, v.onAudioTrackLoading = function(l, e) {
      var s = e.id, n = e.groupId, r = e.url, a = e.deliveryDirectives;
      this.load({ id: s, groupId: n, level: null, responseType: "text", type: d.PlaylistContextType.AUDIO_TRACK, url: r, deliveryDirectives: a });
    }, v.onSubtitleTrackLoading = function(l, e) {
      var s = e.id, n = e.groupId, r = e.url, a = e.deliveryDirectives;
      this.load({ id: s, groupId: n, level: null, responseType: "text", type: d.PlaylistContextType.SUBTITLE_TRACK, url: r, deliveryDirectives: a });
    }, v.load = function(l) {
      var e, s, n, r, a, i, h = this.hls.config, g = this.getInternalLoader(l);
      if (g) {
        var c = g.context;
        if (c && c.url === l.url)
          return void k.logger.trace("[playlist-loader]: playlist request ongoing");
        k.logger.log("[playlist-loader]: aborting previous loader for type: " + l.type), g.abort();
      }
      switch (l.type) {
        case d.PlaylistContextType.MANIFEST:
          s = h.manifestLoadingMaxRetry, n = h.manifestLoadingTimeOut, r = h.manifestLoadingRetryDelay, a = h.manifestLoadingMaxRetryTimeout;
          break;
        case d.PlaylistContextType.LEVEL:
        case d.PlaylistContextType.AUDIO_TRACK:
        case d.PlaylistContextType.SUBTITLE_TRACK:
          s = 0, n = h.levelLoadingTimeOut;
          break;
        default:
          s = h.levelLoadingMaxRetry, n = h.levelLoadingTimeOut, r = h.levelLoadingRetryDelay, a = h.levelLoadingMaxRetryTimeout;
      }
      if (g = this.createInternalLoader(l), (e = l.deliveryDirectives) !== null && e !== void 0 && e.part && (l.type === d.PlaylistContextType.LEVEL && l.level !== null ? i = this.hls.levels[l.level].details : l.type === d.PlaylistContextType.AUDIO_TRACK && l.id !== null ? i = this.hls.audioTracks[l.id].details : l.type === d.PlaylistContextType.SUBTITLE_TRACK && l.id !== null && (i = this.hls.subtitleTracks[l.id].details), i)) {
        var y = i.partTarget, u = i.targetduration;
        y && u && (n = Math.min(1e3 * Math.max(3 * y, 0.8 * u), n));
      }
      var t = { timeout: n, maxRetry: s, retryDelay: r, maxRetryDelay: a, highWaterMark: 0 }, o = { onSuccess: this.loadsuccess.bind(this), onError: this.loaderror.bind(this), onTimeout: this.loadtimeout.bind(this) };
      g.load(l, t, o);
    }, v.loadsuccess = function(l, e, s, n) {
      if (n === void 0 && (n = null), s.isSidxRequest)
        return this.handleSidxRequest(l, s), void this.handlePlaylistLoaded(l, e, s, n);
      this.resetInternalLoader(s.type);
      var r = l.data;
      r.indexOf("#EXTM3U") === 0 ? (e.parsing.start = performance.now(), r.indexOf("#EXTINF:") > 0 || r.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this.handleTrackOrLevelPlaylist(l, e, s, n) : this.handleMasterPlaylist(l, e, s, n)) : this.handleManifestParsingError(l, s, "no EXTM3U delimiter", n);
    }, v.loaderror = function(l, e, s) {
      s === void 0 && (s = null), this.handleNetworkError(e, s, !1, l);
    }, v.loadtimeout = function(l, e, s) {
      s === void 0 && (s = null), this.handleNetworkError(e, s, !0);
    }, v.handleMasterPlaylist = function(l, e, s, n) {
      var r = this.hls, a = l.data, i = p(l, s), h = D.default.parseMasterPlaylist(a, i), g = h.levels, c = h.sessionData;
      if (g.length) {
        var y = g.map(function(_) {
          return { id: _.attrs.AUDIO, audioCodec: _.audioCodec };
        }), u = g.map(function(_) {
          return { id: _.attrs.SUBTITLES, textCodec: _.textCodec };
        }), t = D.default.parseMasterPlaylistMedia(a, i, "AUDIO", y), o = D.default.parseMasterPlaylistMedia(a, i, "SUBTITLES", u), b = D.default.parseMasterPlaylistMedia(a, i, "CLOSED-CAPTIONS");
        t.length && (t.some(function(_) {
          return !_.url;
        }) || !g[0].audioCodec || g[0].attrs.AUDIO || (k.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), t.unshift({ type: "main", name: "main", default: !1, autoselect: !1, forced: !1, id: -1, attrs: new T.AttrList({}), bitrate: 0, url: "" }))), r.trigger(S.Events.MANIFEST_LOADED, { levels: g, audioTracks: t, subtitles: o, captions: b, url: i, stats: e, networkDetails: n, sessionData: c });
      } else
        this.handleManifestParsingError(l, s, "no level found in manifest", n);
    }, v.handleTrackOrLevelPlaylist = function(l, e, s, n) {
      var r = this.hls, a = s.id, i = s.level, h = s.type, g = p(l, s), c = Object(R.isFiniteNumber)(a) ? a : 0, y = Object(R.isFiniteNumber)(i) ? i : c, u = function(L) {
        switch (L.type) {
          case d.PlaylistContextType.AUDIO_TRACK:
            return d.PlaylistLevelType.AUDIO;
          case d.PlaylistContextType.SUBTITLE_TRACK:
            return d.PlaylistLevelType.SUBTITLE;
          default:
            return d.PlaylistLevelType.MAIN;
        }
      }(s), t = D.default.parseLevelPlaylist(l.data, g, y, u, c);
      if (t.fragments.length) {
        if (h === d.PlaylistContextType.MANIFEST) {
          var o = { attrs: new T.AttrList({}), bitrate: 0, details: t, name: "", url: g };
          r.trigger(S.Events.MANIFEST_LOADED, { levels: [o], audioTracks: [], url: g, stats: e, networkDetails: n, sessionData: null });
        }
        if (e.parsing.end = performance.now(), t.needSidxRanges) {
          var b, _ = (b = t.fragments[0].initSegment) === null || b === void 0 ? void 0 : b.url;
          this.load({ url: _, isSidxRequest: !0, type: h, level: i, levelDetails: t, id: a, groupId: null, rangeStart: 0, rangeEnd: 2048, responseType: "arraybuffer", deliveryDirectives: null });
        } else
          s.levelDetails = t, this.handlePlaylistLoaded(l, e, s, n);
      } else
        r.trigger(S.Events.ERROR, { type: A.ErrorTypes.NETWORK_ERROR, details: A.ErrorDetails.LEVEL_EMPTY_ERROR, fatal: !1, url: g, reason: "no fragments found in level", level: typeof s.level == "number" ? s.level : void 0 });
    }, v.handleSidxRequest = function(l, e) {
      var s = Object(C.parseSegmentIndex)(new Uint8Array(l.data));
      if (s) {
        var n = s.references, r = e.levelDetails;
        n.forEach(function(a, i) {
          var h = a.info, g = r.fragments[i];
          g.byteRange.length === 0 && g.setByteRange(String(1 + h.end - h.start) + "@" + String(h.start)), g.initSegment && g.initSegment.setByteRange(String(s.moovEndOffset) + "@0");
        });
      }
    }, v.handleManifestParsingError = function(l, e, s, n) {
      this.hls.trigger(S.Events.ERROR, { type: A.ErrorTypes.NETWORK_ERROR, details: A.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: e.type === d.PlaylistContextType.MANIFEST, url: l.url, reason: s, response: l, context: e, networkDetails: n });
    }, v.handleNetworkError = function(l, e, s, n) {
      s === void 0 && (s = !1), k.logger.warn("[playlist-loader]: A network " + (s ? "timeout" : "error") + " occurred while loading " + l.type + " level: " + l.level + " id: " + l.id + ' group-id: "' + l.groupId + '"');
      var r = A.ErrorDetails.UNKNOWN, a = !1, i = this.getInternalLoader(l);
      switch (l.type) {
        case d.PlaylistContextType.MANIFEST:
          r = s ? A.ErrorDetails.MANIFEST_LOAD_TIMEOUT : A.ErrorDetails.MANIFEST_LOAD_ERROR, a = !0;
          break;
        case d.PlaylistContextType.LEVEL:
          r = s ? A.ErrorDetails.LEVEL_LOAD_TIMEOUT : A.ErrorDetails.LEVEL_LOAD_ERROR, a = !1;
          break;
        case d.PlaylistContextType.AUDIO_TRACK:
          r = s ? A.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : A.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, a = !1;
          break;
        case d.PlaylistContextType.SUBTITLE_TRACK:
          r = s ? A.ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : A.ErrorDetails.SUBTITLE_LOAD_ERROR, a = !1;
      }
      i && this.resetInternalLoader(l.type);
      var h = { type: A.ErrorTypes.NETWORK_ERROR, details: r, fatal: a, url: l.url, loader: i, context: l, networkDetails: e };
      n && (h.response = n), this.hls.trigger(S.Events.ERROR, h);
    }, v.handlePlaylistLoaded = function(l, e, s, n) {
      var r = s.type, a = s.level, i = s.id, h = s.groupId, g = s.loader, c = s.levelDetails, y = s.deliveryDirectives;
      if (c != null && c.targetduration) {
        if (g)
          switch (c.live && (g.getCacheAge && (c.ageHeader = g.getCacheAge() || 0), g.getCacheAge && !isNaN(c.ageHeader) || (c.ageHeader = 0)), r) {
            case d.PlaylistContextType.MANIFEST:
            case d.PlaylistContextType.LEVEL:
              this.hls.trigger(S.Events.LEVEL_LOADED, { details: c, level: a || 0, id: i || 0, stats: e, networkDetails: n, deliveryDirectives: y });
              break;
            case d.PlaylistContextType.AUDIO_TRACK:
              this.hls.trigger(S.Events.AUDIO_TRACK_LOADED, { details: c, id: i || 0, groupId: h || "", stats: e, networkDetails: n, deliveryDirectives: y });
              break;
            case d.PlaylistContextType.SUBTITLE_TRACK:
              this.hls.trigger(S.Events.SUBTITLE_TRACK_LOADED, { details: c, id: i || 0, groupId: h || "", stats: e, networkDetails: n, deliveryDirectives: y });
          }
      } else
        this.handleManifestParsingError(l, s, "invalid target duration", n);
    }, E;
  }();
  w.default = m;
}, "./src/polyfills/number.ts": function(B, w, f) {
  f.r(w), f.d(w, "isFiniteNumber", function() {
    return R;
  }), f.d(w, "MAX_SAFE_INTEGER", function() {
    return S;
  });
  var R = Number.isFinite || function(A) {
    return typeof A == "number" && isFinite(A);
  }, S = Number.MAX_SAFE_INTEGER || 9007199254740991;
}, "./src/remux/aac-helper.ts": function(B, w, f) {
  f.r(w);
  var R = function() {
    function S() {
    }
    return S.getSilentFrame = function(A, k) {
      switch (A) {
        case "mp4a.40.2":
          if (k === 1)
            return new Uint8Array([0, 200, 0, 128, 35, 128]);
          if (k === 2)
            return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
          if (k === 3)
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
          if (k === 4)
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
          if (k === 5)
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
          if (k === 6)
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
          break;
        default:
          if (k === 1)
            return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
          if (k === 2)
            return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
          if (k === 3)
            return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
      }
    }, S;
  }();
  w.default = R;
}, "./src/remux/mp4-generator.ts": function(B, w, f) {
  f.r(w);
  var R = Math.pow(2, 32) - 1, S = function() {
    function A() {
    }
    return A.init = function() {
      var k;
      for (k in A.types = { avc1: [], avcC: [], btrt: [], dinf: [], dref: [], esds: [], ftyp: [], hdlr: [], mdat: [], mdhd: [], mdia: [], mfhd: [], minf: [], moof: [], moov: [], mp4a: [], ".mp3": [], mvex: [], mvhd: [], pasp: [], sdtp: [], stbl: [], stco: [], stsc: [], stsd: [], stsz: [], stts: [], tfdt: [], tfhd: [], traf: [], trak: [], trun: [], trex: [], tkhd: [], vmhd: [], smhd: [] }, A.types)
        A.types.hasOwnProperty(k) && (A.types[k] = [k.charCodeAt(0), k.charCodeAt(1), k.charCodeAt(2), k.charCodeAt(3)]);
      var C = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]), D = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
      A.HDLR_TYPES = { video: C, audio: D };
      var d = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]), T = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
      A.STTS = A.STSC = A.STCO = T, A.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), A.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), A.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), A.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
      var p = new Uint8Array([105, 115, 111, 109]), m = new Uint8Array([97, 118, 99, 49]), E = new Uint8Array([0, 0, 0, 1]);
      A.FTYP = A.box(A.types.ftyp, p, E, p, m), A.DINF = A.box(A.types.dinf, A.box(A.types.dref, d));
    }, A.box = function(k) {
      for (var C = 8, D = arguments.length, d = new Array(D > 1 ? D - 1 : 0), T = 1; T < D; T++)
        d[T - 1] = arguments[T];
      for (var p = d.length, m = p; p--; )
        C += d[p].byteLength;
      var E = new Uint8Array(C);
      for (E[0] = C >> 24 & 255, E[1] = C >> 16 & 255, E[2] = C >> 8 & 255, E[3] = 255 & C, E.set(k, 4), p = 0, C = 8; p < m; p++)
        E.set(d[p], C), C += d[p].byteLength;
      return E;
    }, A.hdlr = function(k) {
      return A.box(A.types.hdlr, A.HDLR_TYPES[k]);
    }, A.mdat = function(k) {
      return A.box(A.types.mdat, k);
    }, A.mdhd = function(k, C) {
      C *= k;
      var D = Math.floor(C / (R + 1)), d = Math.floor(C % (R + 1));
      return A.box(A.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, k >> 24 & 255, k >> 16 & 255, k >> 8 & 255, 255 & k, D >> 24, D >> 16 & 255, D >> 8 & 255, 255 & D, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, 85, 196, 0, 0]));
    }, A.mdia = function(k) {
      return A.box(A.types.mdia, A.mdhd(k.timescale, k.duration), A.hdlr(k.type), A.minf(k));
    }, A.mfhd = function(k) {
      return A.box(A.types.mfhd, new Uint8Array([0, 0, 0, 0, k >> 24, k >> 16 & 255, k >> 8 & 255, 255 & k]));
    }, A.minf = function(k) {
      return k.type === "audio" ? A.box(A.types.minf, A.box(A.types.smhd, A.SMHD), A.DINF, A.stbl(k)) : A.box(A.types.minf, A.box(A.types.vmhd, A.VMHD), A.DINF, A.stbl(k));
    }, A.moof = function(k, C, D) {
      return A.box(A.types.moof, A.mfhd(k), A.traf(D, C));
    }, A.moov = function(k) {
      for (var C = k.length, D = []; C--; )
        D[C] = A.trak(k[C]);
      return A.box.apply(null, [A.types.moov, A.mvhd(k[0].timescale, k[0].duration)].concat(D).concat(A.mvex(k)));
    }, A.mvex = function(k) {
      for (var C = k.length, D = []; C--; )
        D[C] = A.trex(k[C]);
      return A.box.apply(null, [A.types.mvex].concat(D));
    }, A.mvhd = function(k, C) {
      C *= k;
      var D = Math.floor(C / (R + 1)), d = Math.floor(C % (R + 1)), T = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, k >> 24 & 255, k >> 16 & 255, k >> 8 & 255, 255 & k, D >> 24, D >> 16 & 255, D >> 8 & 255, 255 & D, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
      return A.box(A.types.mvhd, T);
    }, A.sdtp = function(k) {
      var C, D, d = k.samples || [], T = new Uint8Array(4 + d.length);
      for (C = 0; C < d.length; C++)
        D = d[C].flags, T[C + 4] = D.dependsOn << 4 | D.isDependedOn << 2 | D.hasRedundancy;
      return A.box(A.types.sdtp, T);
    }, A.stbl = function(k) {
      return A.box(A.types.stbl, A.stsd(k), A.box(A.types.stts, A.STTS), A.box(A.types.stsc, A.STSC), A.box(A.types.stsz, A.STSZ), A.box(A.types.stco, A.STCO));
    }, A.avc1 = function(k) {
      var C, D, d, T = [], p = [];
      for (C = 0; C < k.sps.length; C++)
        d = (D = k.sps[C]).byteLength, T.push(d >>> 8 & 255), T.push(255 & d), T = T.concat(Array.prototype.slice.call(D));
      for (C = 0; C < k.pps.length; C++)
        d = (D = k.pps[C]).byteLength, p.push(d >>> 8 & 255), p.push(255 & d), p = p.concat(Array.prototype.slice.call(D));
      var m = A.box(A.types.avcC, new Uint8Array([1, T[3], T[4], T[5], 255, 224 | k.sps.length].concat(T).concat([k.pps.length]).concat(p))), E = k.width, v = k.height, l = k.pixelRatio[0], e = k.pixelRatio[1];
      return A.box(A.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, E >> 8 & 255, 255 & E, v >> 8 & 255, 255 & v, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), m, A.box(A.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), A.box(A.types.pasp, new Uint8Array([l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e])));
    }, A.esds = function(k) {
      var C = k.config.length;
      return new Uint8Array([0, 0, 0, 0, 3, 23 + C, 0, 1, 0, 4, 15 + C, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([C]).concat(k.config).concat([6, 1, 2]));
    }, A.mp4a = function(k) {
      var C = k.samplerate;
      return A.box(A.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, k.channelCount, 0, 16, 0, 0, 0, 0, C >> 8 & 255, 255 & C, 0, 0]), A.box(A.types.esds, A.esds(k)));
    }, A.mp3 = function(k) {
      var C = k.samplerate;
      return A.box(A.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, k.channelCount, 0, 16, 0, 0, 0, 0, C >> 8 & 255, 255 & C, 0, 0]));
    }, A.stsd = function(k) {
      return k.type === "audio" ? k.isAAC || k.codec !== "mp3" ? A.box(A.types.stsd, A.STSD, A.mp4a(k)) : A.box(A.types.stsd, A.STSD, A.mp3(k)) : A.box(A.types.stsd, A.STSD, A.avc1(k));
    }, A.tkhd = function(k) {
      var C = k.id, D = k.duration * k.timescale, d = k.width, T = k.height, p = Math.floor(D / (R + 1)), m = Math.floor(D % (R + 1));
      return A.box(A.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, C >> 24 & 255, C >> 16 & 255, C >> 8 & 255, 255 & C, 0, 0, 0, 0, p >> 24, p >> 16 & 255, p >> 8 & 255, 255 & p, m >> 24, m >> 16 & 255, m >> 8 & 255, 255 & m, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, d >> 8 & 255, 255 & d, 0, 0, T >> 8 & 255, 255 & T, 0, 0]));
    }, A.traf = function(k, C) {
      var D = A.sdtp(k), d = k.id, T = Math.floor(C / (R + 1)), p = Math.floor(C % (R + 1));
      return A.box(A.types.traf, A.box(A.types.tfhd, new Uint8Array([0, 0, 0, 0, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d])), A.box(A.types.tfdt, new Uint8Array([1, 0, 0, 0, T >> 24, T >> 16 & 255, T >> 8 & 255, 255 & T, p >> 24, p >> 16 & 255, p >> 8 & 255, 255 & p])), A.trun(k, D.length + 16 + 20 + 8 + 16 + 8 + 8), D);
    }, A.trak = function(k) {
      return k.duration = k.duration || 4294967295, A.box(A.types.trak, A.tkhd(k), A.mdia(k));
    }, A.trex = function(k) {
      var C = k.id;
      return A.box(A.types.trex, new Uint8Array([0, 0, 0, 0, C >> 24, C >> 16 & 255, C >> 8 & 255, 255 & C, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]));
    }, A.trun = function(k, C) {
      var D, d, T, p, m, E, v = k.samples || [], l = v.length, e = 12 + 16 * l, s = new Uint8Array(e);
      for (C += 8 + e, s.set([0, 0, 15, 1, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l, C >>> 24 & 255, C >>> 16 & 255, C >>> 8 & 255, 255 & C], 0), D = 0; D < l; D++)
        T = (d = v[D]).duration, p = d.size, m = d.flags, E = d.cts, s.set([T >>> 24 & 255, T >>> 16 & 255, T >>> 8 & 255, 255 & T, p >>> 24 & 255, p >>> 16 & 255, p >>> 8 & 255, 255 & p, m.isLeading << 2 | m.dependsOn, m.isDependedOn << 6 | m.hasRedundancy << 4 | m.paddingValue << 1 | m.isNonSync, 61440 & m.degradPrio, 15 & m.degradPrio, E >>> 24 & 255, E >>> 16 & 255, E >>> 8 & 255, 255 & E], 12 + 16 * D);
      return A.box(A.types.trun, s);
    }, A.initSegment = function(k) {
      A.types || A.init();
      var C = A.moov(k), D = new Uint8Array(A.FTYP.byteLength + C.byteLength);
      return D.set(A.FTYP), D.set(C, A.FTYP.byteLength), D;
    }, A;
  }();
  S.types = void 0, S.HDLR_TYPES = void 0, S.STTS = void 0, S.STSC = void 0, S.STCO = void 0, S.STSZ = void 0, S.VMHD = void 0, S.SMHD = void 0, S.STSD = void 0, S.FTYP = void 0, S.DINF = void 0, w.default = S;
}, "./src/remux/mp4-remuxer.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return l;
  }), f.d(w, "normalizePts", function() {
    return e;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/remux/aac-helper.ts"), A = f("./src/remux/mp4-generator.ts"), k = f("./src/events.ts"), C = f("./src/errors.ts"), D = f("./src/utils/logger.ts"), d = f("./src/types/loader.ts"), T = f("./src/utils/timescale-conversion.ts");
  function p() {
    return (p = Object.assign || function(r) {
      for (var a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        for (var h in i)
          Object.prototype.hasOwnProperty.call(i, h) && (r[h] = i[h]);
      }
      return r;
    }).apply(this, arguments);
  }
  var m = null, E = null, v = !1, l = function() {
    function r(i, h, g, c) {
      if (this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = void 0, this._initDTS = void 0, this.nextAvcDts = null, this.nextAudioPts = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.observer = i, this.config = h, this.typeSupported = g, this.ISGenerated = !1, m === null) {
        var y = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
        m = y ? parseInt(y[1]) : 0;
      }
      if (E === null) {
        var u = navigator.userAgent.match(/Safari\/(\d+)/i);
        E = u ? parseInt(u[1]) : 0;
      }
      v = !!m && m < 75 || !!E && E < 600;
    }
    var a = r.prototype;
    return a.destroy = function() {
    }, a.resetTimeStamp = function(i) {
      D.logger.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = i;
    }, a.resetNextTimestamp = function() {
      D.logger.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
    }, a.resetInitSegment = function() {
      D.logger.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1;
    }, a.getVideoStartPts = function(i) {
      var h = !1, g = i.reduce(function(c, y) {
        var u = y.pts - c;
        return u < -4294967296 ? (h = !0, e(c, y.pts)) : u > 0 ? c : y.pts;
      }, i[0].pts);
      return h && D.logger.debug("PTS rollover detected"), g;
    }, a.remux = function(i, h, g, c, y, u, t, o) {
      var b, _, L, I, O, x, P = y, M = y, F = i.pid > -1, N = h.pid > -1, U = h.samples.length, G = i.samples.length > 0, j = U > 1;
      if ((!F || G) && (!N || j) || this.ISGenerated || t) {
        this.ISGenerated || (L = this.generateIS(i, h, y));
        var V = this.isVideoContiguous, Y = -1;
        if (j && (Y = function(rt) {
          for (var Q = 0; Q < rt.length; Q++)
            if (rt[Q].key)
              return Q;
          return -1;
        }(h.samples), !V && this.config.forceKeyFrameOnDiscontinuity))
          if (x = !0, Y > 0) {
            D.logger.warn("[mp4-remuxer]: Dropped " + Y + " out of " + U + " video samples due to a missing keyframe");
            var W = this.getVideoStartPts(h.samples);
            h.samples = h.samples.slice(Y), h.dropped += Y, M += (h.samples[0].pts - W) / (h.timescale || 9e4);
          } else
            Y === -1 && (D.logger.warn("[mp4-remuxer]: No keyframe found out of " + U + " video samples"), x = !1);
        if (this.ISGenerated) {
          if (G && j) {
            var q = this.getVideoStartPts(h.samples), X = (e(i.samples[0].pts, q) - q) / h.inputTimeScale;
            P += Math.max(0, X), M += Math.max(0, -X);
          }
          if (G) {
            if (i.samplerate || (D.logger.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), L = this.generateIS(i, h, y)), _ = this.remuxAudio(i, P, this.isAudioContiguous, u, N || j || o === d.PlaylistLevelType.AUDIO ? M : void 0), j) {
              var J = _ ? _.endPTS - _.startPTS : 0;
              h.inputTimeScale || (D.logger.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), L = this.generateIS(i, h, y)), b = this.remuxVideo(h, M, V, J);
            }
          } else
            j && (b = this.remuxVideo(h, M, V, 0));
          b && (b.firstKeyFrame = Y, b.independent = Y !== -1);
        }
      }
      return this.ISGenerated && (g.samples.length && (O = this.remuxID3(g, y)), c.samples.length && (I = this.remuxText(c, y))), { audio: _, video: b, initSegment: L, independent: x, text: I, id3: O };
    }, a.generateIS = function(i, h, g) {
      var c, y, u, t = i.samples, o = h.samples, b = this.typeSupported, _ = {}, L = !Object(R.isFiniteNumber)(this._initPTS), I = "audio/mp4";
      if (L && (c = y = 1 / 0), i.config && t.length && (i.timescale = i.samplerate, i.isAAC || (b.mpeg ? (I = "audio/mpeg", i.codec = "") : b.mp3 && (i.codec = "mp3")), _.audio = { id: "audio", container: I, codec: i.codec, initSegment: !i.isAAC && b.mpeg ? new Uint8Array(0) : A.default.initSegment([i]), metadata: { channelCount: i.channelCount } }, L && (u = i.inputTimeScale, c = y = t[0].pts - Math.round(u * g))), h.sps && h.pps && o.length && (h.timescale = h.inputTimeScale, _.video = { id: "main", container: "video/mp4", codec: h.codec, initSegment: A.default.initSegment([h]), metadata: { width: h.width, height: h.height } }, L)) {
        u = h.inputTimeScale;
        var O = this.getVideoStartPts(o), x = Math.round(u * g);
        y = Math.min(y, e(o[0].dts, O) - x), c = Math.min(c, O - x);
      }
      if (Object.keys(_).length)
        return this.ISGenerated = !0, L && (this._initPTS = c, this._initDTS = y), { tracks: _, initPTS: c, timescale: u };
    }, a.remuxVideo = function(i, h, g, c) {
      var y, u, t, o = i.inputTimeScale, b = i.samples, _ = [], L = b.length, I = this._initPTS, O = this.nextAvcDts, x = 8, P = Number.POSITIVE_INFINITY, M = Number.NEGATIVE_INFINITY, F = 0, N = !1;
      g && O !== null || (O = h * o - (b[0].pts - e(b[0].dts, b[0].pts)));
      for (var U = 0; U < L; U++) {
        var G = b[U];
        G.pts = e(G.pts - I, O), G.dts = e(G.dts - I, O), G.dts > G.pts && (F = Math.max(Math.min(F, G.pts - G.dts), -18e3)), G.dts < b[U > 0 ? U - 1 : U].dts && (N = !0);
      }
      N && b.sort(function(Et, It) {
        var ye = Et.dts - It.dts, Ee = Et.pts - It.pts;
        return ye || Ee;
      }), u = b[0].dts, t = b[b.length - 1].dts;
      var j = Math.round((t - u) / (L - 1));
      if (F < 0) {
        if (F < -2 * j) {
          D.logger.warn("PTS < DTS detected in video samples, offsetting DTS from PTS by " + Object(T.toMsFromMpegTsClock)(-j, !0) + " ms");
          for (var V = F, Y = 0; Y < L; Y++)
            b[Y].dts = V = Math.max(V, b[Y].pts - j), b[Y].pts = Math.max(V, b[Y].pts);
        } else {
          D.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Object(T.toMsFromMpegTsClock)(F, !0) + " ms to overcome this issue");
          for (var W = 0; W < L; W++)
            b[W].dts = b[W].dts + F;
        }
        u = b[0].dts;
      }
      if (g) {
        var q = u - O, X = q > j;
        if (X || q < -1) {
          X ? D.logger.warn("AVC: " + Object(T.toMsFromMpegTsClock)(q, !0) + " ms (" + q + "dts) hole between fragments detected, filling it") : D.logger.warn("AVC: " + Object(T.toMsFromMpegTsClock)(-q, !0) + " ms (" + q + "dts) overlapping between fragments detected"), u = O;
          var J = b[0].pts - q;
          b[0].dts = u, b[0].pts = J, D.logger.log("Video: First PTS/DTS adjusted: " + Object(T.toMsFromMpegTsClock)(J, !0) + "/" + Object(T.toMsFromMpegTsClock)(u, !0) + ", delta: " + Object(T.toMsFromMpegTsClock)(q, !0) + " ms");
        }
      }
      v && (u = Math.max(0, u));
      for (var rt = 0, Q = 0, at = 0; at < L; at++) {
        for (var z = b[at], tt = z.units, it = tt.length, nt = 0, dt = 0; dt < it; dt++)
          nt += tt[dt].data.length;
        Q += nt, rt += it, z.length = nt, z.dts = Math.max(z.dts, u), z.pts = Math.max(z.pts, z.dts, 0), P = Math.min(z.pts, P), M = Math.max(z.pts, M);
      }
      t = b[L - 1].dts;
      var gt, vt = Q + 4 * rt + 8;
      try {
        gt = new Uint8Array(vt);
      } catch {
        return void this.observer.emit(k.Events.ERROR, k.Events.ERROR, { type: C.ErrorTypes.MUX_ERROR, details: C.ErrorDetails.REMUX_ALLOC_ERROR, fatal: !1, bytes: vt, reason: "fail allocating video mdat " + vt });
      }
      var mt = new DataView(gt.buffer);
      mt.setUint32(0, vt), gt.set(A.default.types.mdat, 4);
      for (var lt = 0; lt < L; lt++) {
        for (var ot = b[lt], Nt = ot.units, yt = 0, Lt = 0, Bt = Nt.length; Lt < Bt; Lt++) {
          var kt = Nt[Lt], St = kt.data, Kt = kt.data.byteLength;
          mt.setUint32(x, Kt), x += 4, gt.set(St, x), x += Kt, yt += 4 + Kt;
        }
        if (lt < L - 1)
          y = b[lt + 1].dts - ot.dts;
        else {
          var Ut = this.config, bt = ot.dts - b[lt > 0 ? lt - 1 : lt].dts;
          if (Ut.stretchShortVideoTrack && this.nextAudioPts !== null) {
            var Vt = Math.floor(Ut.maxBufferHole * o), Gt = (c ? P + c * o : this.nextAudioPts) - ot.pts;
            Gt > Vt ? ((y = Gt - bt) < 0 && (y = bt), D.logger.log("[mp4-remuxer]: It is approximately " + Gt / 90 + " ms to the next segment; using duration " + y / 90 + " ms for the last video frame.")) : y = bt;
          } else
            y = bt;
        }
        var Rt = Math.round(ot.pts - ot.dts);
        _.push(new s(ot.key, y, yt, Rt));
      }
      if (_.length && m && m < 70) {
        var At = _[0].flags;
        At.dependsOn = 2, At.isNonSync = 0;
      }
      console.assert(y !== void 0, "mp4SampleDuration must be computed"), this.nextAvcDts = O = t + y, this.isVideoContiguous = !0;
      var _t = { data1: A.default.moof(i.sequenceNumber++, u, p({}, i, { samples: _ })), data2: gt, startPTS: P / o, endPTS: (M + y) / o, startDTS: u / o, endDTS: O / o, type: "video", hasAudio: !1, hasVideo: !0, nb: _.length, dropped: i.dropped };
      return i.samples = [], i.dropped = 0, console.assert(gt.length, "MDAT length must not be zero"), _t;
    }, a.remuxAudio = function(i, h, g, c, y) {
      var u = i.inputTimeScale, t = u / (i.samplerate ? i.samplerate : u), o = i.isAAC ? 1024 : 1152, b = o * t, _ = this._initPTS, L = !i.isAAC && this.typeSupported.mpeg, I = [], O = i.samples, x = L ? 0 : 8, P = this.nextAudioPts || -1, M = h * u;
      if (this.isAudioContiguous = g = g || O.length && P > 0 && (c && Math.abs(M - P) < 9e3 || Math.abs(e(O[0].pts - _, M) - P) < 20 * b), O.forEach(function(St) {
        St.pts = e(St.pts - _, M);
      }), !g || P < 0) {
        if (!(O = O.filter(function(St) {
          return St.pts >= 0;
        })).length)
          return;
        P = y === 0 ? 0 : c ? Math.max(0, M) : O[0].pts;
      }
      if (i.isAAC)
        for (var F = y !== void 0, N = this.config.maxAudioFramesDrift, U = 0, G = P; U < O.length; U++) {
          var j = O[U], V = j.pts, Y = V - G, W = Math.abs(1e3 * Y / u);
          if (Y <= -N * b && F)
            U === 0 && (D.logger.warn("Audio frame @ " + (V / u).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1e3 * Y / u) + " ms."), this.nextAudioPts = P = G = V);
          else if (Y >= N * b && W < 1e4 && F) {
            var q = Math.round(Y / b);
            (G = V - q * b) < 0 && (q--, G += b), U === 0 && (this.nextAudioPts = P = G), D.logger.warn("[mp4-remuxer]: Injecting " + q + " audio frame @ " + (G / u).toFixed(3) + "s due to " + Math.round(1e3 * Y / u) + " ms gap.");
            for (var X = 0; X < q; X++) {
              var J = Math.max(G, 0), rt = S.default.getSilentFrame(i.manifestCodec || i.codec, i.channelCount);
              rt || (D.logger.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), rt = j.unit.subarray()), O.splice(U, 0, { unit: rt, pts: J }), G += b, U++;
            }
          }
          j.pts = G, G += b;
        }
      for (var Q, at = null, z = null, tt = 0, it = O.length; it--; )
        tt += O[it].unit.byteLength;
      for (var nt = 0, dt = O.length; nt < dt; nt++) {
        var gt = O[nt], vt = gt.unit, mt = gt.pts;
        if (z !== null)
          I[nt - 1].duration = Math.round((mt - z) / t);
        else {
          if (g && i.isAAC && (mt = P), at = mt, !(tt > 0))
            return;
          tt += x;
          try {
            Q = new Uint8Array(tt);
          } catch {
            return void this.observer.emit(k.Events.ERROR, k.Events.ERROR, { type: C.ErrorTypes.MUX_ERROR, details: C.ErrorDetails.REMUX_ALLOC_ERROR, fatal: !1, bytes: tt, reason: "fail allocating audio mdat " + tt });
          }
          L || (new DataView(Q.buffer).setUint32(0, tt), Q.set(A.default.types.mdat, 4));
        }
        Q.set(vt, x);
        var lt = vt.byteLength;
        x += lt, I.push(new s(!0, o, lt, 0)), z = mt;
      }
      var ot = I.length;
      if (ot) {
        var Nt = I[I.length - 1];
        this.nextAudioPts = P = z + t * Nt.duration;
        var yt = L ? new Uint8Array(0) : A.default.moof(i.sequenceNumber++, at / t, p({}, i, { samples: I }));
        i.samples = [];
        var Lt = at / u, Bt = P / u, kt = { data1: yt, data2: Q, startPTS: Lt, endPTS: Bt, startDTS: Lt, endDTS: Bt, type: "audio", hasAudio: !0, hasVideo: !1, nb: ot };
        return this.isAudioContiguous = !0, console.assert(Q.length, "MDAT length must not be zero"), kt;
      }
    }, a.remuxEmptyAudio = function(i, h, g, c) {
      var y = i.inputTimeScale, u = y / (i.samplerate ? i.samplerate : y), t = this.nextAudioPts, o = (t !== null ? t : c.startDTS * y) + this._initDTS, b = c.endDTS * y + this._initDTS, _ = 1024 * u, L = Math.ceil((b - o) / _), I = S.default.getSilentFrame(i.manifestCodec || i.codec, i.channelCount);
      if (D.logger.warn("[mp4-remuxer]: remux empty Audio"), I) {
        for (var O = [], x = 0; x < L; x++) {
          var P = o + x * _;
          O.push({ unit: I, pts: P, dts: P });
        }
        return i.samples = O, this.remuxAudio(i, h, g, !1);
      }
      D.logger.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec");
    }, a.remuxID3 = function(i, h) {
      var g = i.samples.length;
      if (g) {
        for (var c = i.inputTimeScale, y = this._initPTS, u = this._initDTS, t = 0; t < g; t++) {
          var o = i.samples[t];
          o.pts = e(o.pts - y, h * c) / c, o.dts = e(o.dts - u, h * c) / c;
        }
        var b = i.samples;
        return i.samples = [], { samples: b };
      }
    }, a.remuxText = function(i, h) {
      var g = i.samples.length;
      if (g) {
        for (var c = i.inputTimeScale, y = this._initPTS, u = 0; u < g; u++) {
          var t = i.samples[u];
          t.pts = e(t.pts - y, h * c) / c;
        }
        i.samples.sort(function(b, _) {
          return b.pts - _.pts;
        });
        var o = i.samples;
        return i.samples = [], { samples: o };
      }
    }, r;
  }();
  function e(r, a) {
    var i;
    if (a === null)
      return r;
    for (i = a < r ? -8589934592 : 8589934592; Math.abs(r - a) > 4294967296; )
      r += i;
    return r;
  }
  var s = function(r, a, i, h) {
    this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = a, this.size = i, this.cts = h, this.flags = new n(r);
  }, n = function(r) {
    this.isLeading = 0, this.isDependedOn = 0, this.hasRedundancy = 0, this.degradPrio = 0, this.dependsOn = 1, this.isNonSync = 1, this.dependsOn = r ? 2 : 1, this.isNonSync = r ? 0 : 1;
  };
}, "./src/remux/passthrough-remuxer.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/polyfills/number.ts"), S = f("./src/utils/mp4-tools.ts"), A = f("./src/loader/fragment.ts"), k = f("./src/utils/logger.ts"), C = function() {
    function T() {
      this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = void 0, this.initTracks = void 0, this.lastEndDTS = null;
    }
    var p = T.prototype;
    return p.destroy = function() {
    }, p.resetTimeStamp = function(m) {
      this.initPTS = m, this.lastEndDTS = null;
    }, p.resetNextTimestamp = function() {
      this.lastEndDTS = null;
    }, p.resetInitSegment = function(m, E, v) {
      this.audioCodec = E, this.videoCodec = v, this.generateInitSegment(m), this.emitInitSegment = !0;
    }, p.generateInitSegment = function(m) {
      var E = this.audioCodec, v = this.videoCodec;
      if (!m || !m.byteLength)
        return this.initTracks = void 0, void (this.initData = void 0);
      var l = this.initData = Object(S.parseInitSegment)(m);
      E || (E = d(l.audio, A.ElementaryStreamTypes.AUDIO)), v || (v = d(l.video, A.ElementaryStreamTypes.VIDEO));
      var e = {};
      l.audio && l.video ? e.audiovideo = { container: "video/mp4", codec: E + "," + v, initSegment: m, id: "main" } : l.audio ? e.audio = { container: "audio/mp4", codec: E, initSegment: m, id: "audio" } : l.video ? e.video = { container: "video/mp4", codec: v, initSegment: m, id: "main" } : k.logger.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = e;
    }, p.remux = function(m, E, v, l, e) {
      var s = this.initPTS, n = this.lastEndDTS, r = { audio: void 0, video: void 0, text: l, id3: v, initSegment: void 0 };
      Object(R.isFiniteNumber)(n) || (n = this.lastEndDTS = e || 0);
      var a = E.samples;
      if (!a || !a.length)
        return r;
      var i = { initPTS: void 0, timescale: 1 }, h = this.initData;
      if (h && h.length || (this.generateInitSegment(a), h = this.initData), !h || !h.length)
        return k.logger.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), r;
      this.emitInitSegment && (i.tracks = this.initTracks, this.emitInitSegment = !1), Object(R.isFiniteNumber)(s) || (this.initPTS = i.initPTS = s = D(h, a, n));
      var g = Object(S.getDuration)(a, h), c = n, y = g + c;
      Object(S.offsetStartDTS)(h, a, s), g > 0 ? this.lastEndDTS = y : (k.logger.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
      var u = !!h.audio, t = !!h.video, o = "";
      u && (o += "audio"), t && (o += "video");
      var b = { data1: a, startPTS: c, startDTS: c, endPTS: y, endDTS: y, type: o, hasAudio: u, hasVideo: t, nb: 1, dropped: 0 };
      return r.audio = b.type === "audio" ? b : void 0, r.video = b.type !== "audio" ? b : void 0, r.text = l, r.id3 = v, r.initSegment = i, r;
    }, T;
  }(), D = function(T, p, m) {
    return Object(S.getStartDTS)(T, p) - m;
  };
  function d(T, p) {
    var m = T == null ? void 0 : T.codec;
    return m && m.length > 4 ? m : m === "hvc1" ? "hvc1.1.c.L120.90" : m === "av01" ? "av01.0.04M.08" : m === "avc1" || p === A.ElementaryStreamTypes.VIDEO ? "avc1.42e01e" : "mp4a.40.5";
  }
  w.default = C;
}, "./src/task-loop.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return R;
  });
  var R = function() {
    function S() {
      this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this);
    }
    var A = S.prototype;
    return A.destroy = function() {
      this.onHandlerDestroying(), this.onHandlerDestroyed();
    }, A.onHandlerDestroying = function() {
      this.clearNextTick(), this.clearInterval();
    }, A.onHandlerDestroyed = function() {
    }, A.hasInterval = function() {
      return !!this._tickInterval;
    }, A.hasNextTick = function() {
      return !!this._tickTimer;
    }, A.setInterval = function(k) {
      return !this._tickInterval && (this._tickInterval = self.setInterval(this._boundTick, k), !0);
    }, A.clearInterval = function() {
      return !!this._tickInterval && (self.clearInterval(this._tickInterval), this._tickInterval = null, !0);
    }, A.clearNextTick = function() {
      return !!this._tickTimer && (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0);
    }, A.tick = function() {
      this._tickCallCount++, this._tickCallCount === 1 && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0);
    }, A.tickImmediate = function() {
      this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0);
    }, A.doTick = function() {
    }, S;
  }();
}, "./src/types/level.ts": function(B, w, f) {
  function R(d, T) {
    for (var p = 0; p < T.length; p++) {
      var m = T[p];
      m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(d, m.key, m);
    }
  }
  var S, A;
  function k(d, T) {
    var p = d.canSkipUntil, m = d.canSkipDateRanges, E = d.endSN;
    return p && (T !== void 0 ? T - E : 0) < p ? m ? S.v2 : S.Yes : S.No;
  }
  f.r(w), f.d(w, "HlsSkip", function() {
    return S;
  }), f.d(w, "getSkipValue", function() {
    return k;
  }), f.d(w, "HlsUrlParameters", function() {
    return C;
  }), f.d(w, "Level", function() {
    return D;
  }), (A = S || (S = {})).No = "", A.Yes = "YES", A.v2 = "v2";
  var C = function() {
    function d(T, p, m) {
      this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = T, this.part = p, this.skip = m;
    }
    return d.prototype.addDirectives = function(T) {
      var p = new self.URL(T);
      return this.msn !== void 0 && p.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && p.searchParams.set("_HLS_part", this.part.toString()), this.skip && p.searchParams.set("_HLS_skip", this.skip), p.toString();
    }, d;
  }(), D = function() {
    function d(E) {
      this.attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.unknownCodecs = void 0, this.audioGroupIds = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.textGroupIds = void 0, this.url = void 0, this._urlId = 0, this.url = [E.url], this.attrs = E.attrs, this.bitrate = E.bitrate, E.details && (this.details = E.details), this.id = E.id || 0, this.name = E.name, this.width = E.width || 0, this.height = E.height || 0, this.audioCodec = E.audioCodec, this.videoCodec = E.videoCodec, this.unknownCodecs = E.unknownCodecs, this.codecSet = [E.videoCodec, E.audioCodec].filter(function(v) {
        return v;
      }).join(",").replace(/\.[^.,]+/g, "");
    }
    var T, p, m;
    return T = d, (p = [{ key: "maxBitrate", get: function() {
      return Math.max(this.realBitrate, this.bitrate);
    } }, { key: "uri", get: function() {
      return this.url[this._urlId] || "";
    } }, { key: "urlId", get: function() {
      return this._urlId;
    }, set: function(E) {
      var v = E % this.url.length;
      this._urlId !== v && (this.details = void 0, this._urlId = v);
    } }]) && R(T.prototype, p), m && R(T, m), d;
  }();
}, "./src/types/loader.ts": function(B, w, f) {
  var R, S, A, k;
  f.r(w), f.d(w, "PlaylistContextType", function() {
    return R;
  }), f.d(w, "PlaylistLevelType", function() {
    return A;
  }), (S = R || (R = {})).MANIFEST = "manifest", S.LEVEL = "level", S.AUDIO_TRACK = "audioTrack", S.SUBTITLE_TRACK = "subtitleTrack", (k = A || (A = {})).MAIN = "main", k.AUDIO = "audio", k.SUBTITLE = "subtitle";
}, "./src/types/transmuxer.ts": function(B, w, f) {
  f.r(w), f.d(w, "ChunkMetadata", function() {
    return R;
  });
  var R = function(S, A, k, C, D, d) {
    C === void 0 && (C = 0), D === void 0 && (D = -1), d === void 0 && (d = !1), this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = { start: 0, executeStart: 0, executeEnd: 0, end: 0 }, this.buffering = { audio: { start: 0, executeStart: 0, executeEnd: 0, end: 0 }, video: { start: 0, executeStart: 0, executeEnd: 0, end: 0 }, audiovideo: { start: 0, executeStart: 0, executeEnd: 0, end: 0 } }, this.level = S, this.sn = A, this.id = k, this.size = C, this.part = D, this.partial = d;
  };
}, "./src/utils/attr-list.ts": function(B, w, f) {
  f.r(w), f.d(w, "AttrList", function() {
    return A;
  });
  var R = /^(\d+)x(\d+)$/, S = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g, A = function() {
    function k(D) {
      for (var d in typeof D == "string" && (D = k.parseAttrList(D)), D)
        D.hasOwnProperty(d) && (this[d] = D[d]);
    }
    var C = k.prototype;
    return C.decimalInteger = function(D) {
      var d = parseInt(this[D], 10);
      return d > Number.MAX_SAFE_INTEGER ? 1 / 0 : d;
    }, C.hexadecimalInteger = function(D) {
      if (this[D]) {
        var d = (this[D] || "0x").slice(2);
        d = (1 & d.length ? "0" : "") + d;
        for (var T = new Uint8Array(d.length / 2), p = 0; p < d.length / 2; p++)
          T[p] = parseInt(d.slice(2 * p, 2 * p + 2), 16);
        return T;
      }
      return null;
    }, C.hexadecimalIntegerAsNumber = function(D) {
      var d = parseInt(this[D], 16);
      return d > Number.MAX_SAFE_INTEGER ? 1 / 0 : d;
    }, C.decimalFloatingPoint = function(D) {
      return parseFloat(this[D]);
    }, C.optionalFloat = function(D, d) {
      var T = this[D];
      return T ? parseFloat(T) : d;
    }, C.enumeratedString = function(D) {
      return this[D];
    }, C.bool = function(D) {
      return this[D] === "YES";
    }, C.decimalResolution = function(D) {
      var d = R.exec(this[D]);
      if (d !== null)
        return { width: parseInt(d[1], 10), height: parseInt(d[2], 10) };
    }, k.parseAttrList = function(D) {
      var d, T = {};
      for (S.lastIndex = 0; (d = S.exec(D)) !== null; ) {
        var p = d[2];
        p.indexOf('"') === 0 && p.lastIndexOf('"') === p.length - 1 && (p = p.slice(1, -1)), T[d[1]] = p;
      }
      return T;
    }, k;
  }();
}, "./src/utils/binary-search.ts": function(B, w, f) {
  f.r(w), w.default = { search: function(R, S) {
    for (var A = 0, k = R.length - 1, C = null, D = null; A <= k; ) {
      var d = S(D = R[C = (A + k) / 2 | 0]);
      if (d > 0)
        A = C + 1;
      else {
        if (!(d < 0))
          return D;
        k = C - 1;
      }
    }
    return null;
  } };
}, "./src/utils/buffer-helper.ts": function(B, w, f) {
  f.r(w), f.d(w, "BufferHelper", function() {
    return A;
  });
  var R = f("./src/utils/logger.ts"), S = { length: 0, start: function() {
    return 0;
  }, end: function() {
    return 0;
  } }, A = function() {
    function k() {
    }
    return k.isBuffered = function(C, D) {
      try {
        if (C) {
          for (var d = k.getBuffered(C), T = 0; T < d.length; T++)
            if (D >= d.start(T) && D <= d.end(T))
              return !0;
        }
      } catch {
      }
      return !1;
    }, k.bufferInfo = function(C, D, d) {
      try {
        if (C) {
          var T, p = k.getBuffered(C), m = [];
          for (T = 0; T < p.length; T++)
            m.push({ start: p.start(T), end: p.end(T) });
          return this.bufferedInfo(m, D, d);
        }
      } catch {
      }
      return { len: 0, start: D, end: D, nextStart: void 0 };
    }, k.bufferedInfo = function(C, D, d) {
      D = Math.max(0, D), C.sort(function(i, h) {
        var g = i.start - h.start;
        return g || h.end - i.end;
      });
      var T = [];
      if (d)
        for (var p = 0; p < C.length; p++) {
          var m = T.length;
          if (m) {
            var E = T[m - 1].end;
            C[p].start - E < d ? C[p].end > E && (T[m - 1].end = C[p].end) : T.push(C[p]);
          } else
            T.push(C[p]);
        }
      else
        T = C;
      for (var v, l = 0, e = D, s = D, n = 0; n < T.length; n++) {
        var r = T[n].start, a = T[n].end;
        if (D + d >= r && D < a)
          e = r, l = (s = a) - D;
        else if (D + d < r) {
          v = r;
          break;
        }
      }
      return { len: l, start: e || 0, end: s || 0, nextStart: v };
    }, k.getBuffered = function(C) {
      try {
        return C.buffered;
      } catch (D) {
        return R.logger.log("failed to get media.buffered", D), S;
      }
    }, k;
  }();
}, "./src/utils/cea-608-parser.ts": function(B, w, f) {
  f.r(w), f.d(w, "Row", function() {
    return r;
  }), f.d(w, "CaptionScreen", function() {
    return a;
  });
  var R, S, A = f("./src/utils/logger.ts"), k = { 42: 225, 92: 233, 94: 237, 95: 243, 96: 250, 123: 231, 124: 247, 125: 209, 126: 241, 127: 9608, 128: 174, 129: 176, 130: 189, 131: 191, 132: 8482, 133: 162, 134: 163, 135: 9834, 136: 224, 137: 32, 138: 232, 139: 226, 140: 234, 141: 238, 142: 244, 143: 251, 144: 193, 145: 201, 146: 211, 147: 218, 148: 220, 149: 252, 150: 8216, 151: 161, 152: 42, 153: 8217, 154: 9473, 155: 169, 156: 8480, 157: 8226, 158: 8220, 159: 8221, 160: 192, 161: 194, 162: 199, 163: 200, 164: 202, 165: 203, 166: 235, 167: 206, 168: 207, 169: 239, 170: 212, 171: 217, 172: 249, 173: 219, 174: 171, 175: 187, 176: 195, 177: 227, 178: 205, 179: 204, 180: 236, 181: 210, 182: 242, 183: 213, 184: 245, 185: 123, 186: 125, 187: 92, 188: 94, 189: 95, 190: 124, 191: 8764, 192: 196, 193: 228, 194: 214, 195: 246, 196: 223, 197: 165, 198: 164, 199: 9475, 200: 197, 201: 229, 202: 216, 203: 248, 204: 9487, 205: 9491, 206: 9495, 207: 9499 }, C = function(y) {
    var u = y;
    return k.hasOwnProperty(y) && (u = k[y]), String.fromCharCode(u);
  }, D = 15, d = 100, T = { 17: 1, 18: 3, 21: 5, 22: 7, 23: 9, 16: 11, 19: 12, 20: 14 }, p = { 17: 2, 18: 4, 21: 6, 22: 8, 23: 10, 19: 13, 20: 15 }, m = { 25: 1, 26: 3, 29: 5, 30: 7, 31: 9, 24: 11, 27: 12, 28: 14 }, E = { 25: 2, 26: 4, 29: 6, 30: 8, 31: 10, 27: 13, 28: 15 }, v = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"];
  (S = R || (R = {}))[S.ERROR = 0] = "ERROR", S[S.TEXT = 1] = "TEXT", S[S.WARNING = 2] = "WARNING", S[S.INFO = 2] = "INFO", S[S.DEBUG = 3] = "DEBUG", S[S.DATA = 3] = "DATA";
  var l = function() {
    function y() {
      this.time = null, this.verboseLevel = R.ERROR;
    }
    return y.prototype.log = function(u, t) {
      this.verboseLevel >= u && A.logger.log(this.time + " [" + u + "] " + t);
    }, y;
  }(), e = function(y) {
    for (var u = [], t = 0; t < y.length; t++)
      u.push(y[t].toString(16));
    return u;
  }, s = function() {
    function y(t, o, b, _, L) {
      this.foreground = void 0, this.underline = void 0, this.italics = void 0, this.background = void 0, this.flash = void 0, this.foreground = t || "white", this.underline = o || !1, this.italics = b || !1, this.background = _ || "black", this.flash = L || !1;
    }
    var u = y.prototype;
    return u.reset = function() {
      this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
    }, u.setStyles = function(t) {
      for (var o = ["foreground", "underline", "italics", "background", "flash"], b = 0; b < o.length; b++) {
        var _ = o[b];
        t.hasOwnProperty(_) && (this[_] = t[_]);
      }
    }, u.isDefault = function() {
      return this.foreground === "white" && !this.underline && !this.italics && this.background === "black" && !this.flash;
    }, u.equals = function(t) {
      return this.foreground === t.foreground && this.underline === t.underline && this.italics === t.italics && this.background === t.background && this.flash === t.flash;
    }, u.copy = function(t) {
      this.foreground = t.foreground, this.underline = t.underline, this.italics = t.italics, this.background = t.background, this.flash = t.flash;
    }, u.toString = function() {
      return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash;
    }, y;
  }(), n = function() {
    function y(t, o, b, _, L, I) {
      this.uchar = void 0, this.penState = void 0, this.uchar = t || " ", this.penState = new s(o, b, _, L, I);
    }
    var u = y.prototype;
    return u.reset = function() {
      this.uchar = " ", this.penState.reset();
    }, u.setChar = function(t, o) {
      this.uchar = t, this.penState.copy(o);
    }, u.setPenState = function(t) {
      this.penState.copy(t);
    }, u.equals = function(t) {
      return this.uchar === t.uchar && this.penState.equals(t.penState);
    }, u.copy = function(t) {
      this.uchar = t.uchar, this.penState.copy(t.penState);
    }, u.isEmpty = function() {
      return this.uchar === " " && this.penState.isDefault();
    }, y;
  }(), r = function() {
    function y(t) {
      this.chars = void 0, this.pos = void 0, this.currPenState = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chars = [];
      for (var o = 0; o < d; o++)
        this.chars.push(new n());
      this.logger = t, this.pos = 0, this.currPenState = new s();
    }
    var u = y.prototype;
    return u.equals = function(t) {
      for (var o = !0, b = 0; b < d; b++)
        if (!this.chars[b].equals(t.chars[b])) {
          o = !1;
          break;
        }
      return o;
    }, u.copy = function(t) {
      for (var o = 0; o < d; o++)
        this.chars[o].copy(t.chars[o]);
    }, u.isEmpty = function() {
      for (var t = !0, o = 0; o < d; o++)
        if (!this.chars[o].isEmpty()) {
          t = !1;
          break;
        }
      return t;
    }, u.setCursor = function(t) {
      this.pos !== t && (this.pos = t), this.pos < 0 ? (this.logger.log(R.DEBUG, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > d && (this.logger.log(R.DEBUG, "Too large cursor position " + this.pos), this.pos = d);
    }, u.moveCursor = function(t) {
      var o = this.pos + t;
      if (t > 1)
        for (var b = this.pos + 1; b < o + 1; b++)
          this.chars[b].setPenState(this.currPenState);
      this.setCursor(o);
    }, u.backSpace = function() {
      this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState);
    }, u.insertChar = function(t) {
      t >= 144 && this.backSpace();
      var o = C(t);
      this.pos >= d ? this.logger.log(R.ERROR, "Cannot insert " + t.toString(16) + " (" + o + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(o, this.currPenState), this.moveCursor(1));
    }, u.clearFromPos = function(t) {
      var o;
      for (o = t; o < d; o++)
        this.chars[o].reset();
    }, u.clear = function() {
      this.clearFromPos(0), this.pos = 0, this.currPenState.reset();
    }, u.clearToEndOfRow = function() {
      this.clearFromPos(this.pos);
    }, u.getTextString = function() {
      for (var t = [], o = !0, b = 0; b < d; b++) {
        var _ = this.chars[b].uchar;
        _ !== " " && (o = !1), t.push(_);
      }
      return o ? "" : t.join("");
    }, u.setPenStyles = function(t) {
      this.currPenState.setStyles(t), this.chars[this.pos].setPenState(this.currPenState);
    }, y;
  }(), a = function() {
    function y(t) {
      this.rows = void 0, this.currRow = void 0, this.nrRollUpRows = void 0, this.lastOutputScreen = void 0, this.logger = void 0, this.rows = [];
      for (var o = 0; o < D; o++)
        this.rows.push(new r(t));
      this.logger = t, this.currRow = 14, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset();
    }
    var u = y.prototype;
    return u.reset = function() {
      for (var t = 0; t < D; t++)
        this.rows[t].clear();
      this.currRow = 14;
    }, u.equals = function(t) {
      for (var o = !0, b = 0; b < D; b++)
        if (!this.rows[b].equals(t.rows[b])) {
          o = !1;
          break;
        }
      return o;
    }, u.copy = function(t) {
      for (var o = 0; o < D; o++)
        this.rows[o].copy(t.rows[o]);
    }, u.isEmpty = function() {
      for (var t = !0, o = 0; o < D; o++)
        if (!this.rows[o].isEmpty()) {
          t = !1;
          break;
        }
      return t;
    }, u.backSpace = function() {
      this.rows[this.currRow].backSpace();
    }, u.clearToEndOfRow = function() {
      this.rows[this.currRow].clearToEndOfRow();
    }, u.insertChar = function(t) {
      this.rows[this.currRow].insertChar(t);
    }, u.setPen = function(t) {
      this.rows[this.currRow].setPenStyles(t);
    }, u.moveCursor = function(t) {
      this.rows[this.currRow].moveCursor(t);
    }, u.setCursor = function(t) {
      this.logger.log(R.INFO, "setCursor: " + t), this.rows[this.currRow].setCursor(t);
    }, u.setPAC = function(t) {
      this.logger.log(R.INFO, "pacData = " + JSON.stringify(t));
      var o = t.row - 1;
      if (this.nrRollUpRows && o < this.nrRollUpRows - 1 && (o = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== o) {
        for (var b = 0; b < D; b++)
          this.rows[b].clear();
        var _ = this.currRow + 1 - this.nrRollUpRows, L = this.lastOutputScreen;
        if (L) {
          var I = L.rows[_].cueStartTime, O = this.logger.time;
          if (I && O !== null && I < O)
            for (var x = 0; x < this.nrRollUpRows; x++)
              this.rows[o - this.nrRollUpRows + x + 1].copy(L.rows[_ + x]);
        }
      }
      this.currRow = o;
      var P = this.rows[this.currRow];
      if (t.indent !== null) {
        var M = t.indent, F = Math.max(M - 1, 0);
        P.setCursor(t.indent), t.color = P.chars[F].penState.foreground;
      }
      var N = { foreground: t.color, underline: t.underline, italics: t.italics, background: "black", flash: !1 };
      this.setPen(N);
    }, u.setBkgData = function(t) {
      this.logger.log(R.INFO, "bkgData = " + JSON.stringify(t)), this.backSpace(), this.setPen(t), this.insertChar(32);
    }, u.setRollUpRows = function(t) {
      this.nrRollUpRows = t;
    }, u.rollUp = function() {
      if (this.nrRollUpRows !== null) {
        this.logger.log(R.TEXT, this.getDisplayText());
        var t = this.currRow + 1 - this.nrRollUpRows, o = this.rows.splice(t, 1)[0];
        o.clear(), this.rows.splice(this.currRow, 0, o), this.logger.log(R.INFO, "Rolling up");
      } else
        this.logger.log(R.DEBUG, "roll_up but nrRollUpRows not set yet");
    }, u.getDisplayText = function(t) {
      t = t || !1;
      for (var o = [], b = "", _ = -1, L = 0; L < D; L++) {
        var I = this.rows[L].getTextString();
        I && (_ = L + 1, t ? o.push("Row " + _ + ": '" + I + "'") : o.push(I.trim()));
      }
      return o.length > 0 && (b = t ? "[" + o.join(" | ") + "]" : o.join(`
`)), b;
    }, u.getTextAndFormat = function() {
      return this.rows;
    }, y;
  }(), i = function() {
    function y(t, o, b) {
      this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = t, this.outputFilter = o, this.mode = null, this.verbose = 0, this.displayedMemory = new a(b), this.nonDisplayedMemory = new a(b), this.lastOutputScreen = new a(b), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = b;
    }
    var u = y.prototype;
    return u.reset = function() {
      this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null;
    }, u.getHandler = function() {
      return this.outputFilter;
    }, u.setHandler = function(t) {
      this.outputFilter = t;
    }, u.setPAC = function(t) {
      this.writeScreen.setPAC(t);
    }, u.setBkgData = function(t) {
      this.writeScreen.setBkgData(t);
    }, u.setMode = function(t) {
      t !== this.mode && (this.mode = t, this.logger.log(R.INFO, "MODE=" + t), this.mode === "MODE_POP-ON" ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), this.mode !== "MODE_ROLL-UP" && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = t);
    }, u.insertChars = function(t) {
      for (var o = 0; o < t.length; o++)
        this.writeScreen.insertChar(t[o]);
      var b = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
      this.logger.log(R.INFO, b + ": " + this.writeScreen.getDisplayText(!0)), this.mode !== "MODE_PAINT-ON" && this.mode !== "MODE_ROLL-UP" || (this.logger.log(R.TEXT, "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate());
    }, u.ccRCL = function() {
      this.logger.log(R.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON");
    }, u.ccBS = function() {
      this.logger.log(R.INFO, "BS - BackSpace"), this.mode !== "MODE_TEXT" && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate());
    }, u.ccAOF = function() {
    }, u.ccAON = function() {
    }, u.ccDER = function() {
      this.logger.log(R.INFO, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate();
    }, u.ccRU = function(t) {
      this.logger.log(R.INFO, "RU(" + t + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(t);
    }, u.ccFON = function() {
      this.logger.log(R.INFO, "FON - Flash On"), this.writeScreen.setPen({ flash: !0 });
    }, u.ccRDC = function() {
      this.logger.log(R.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON");
    }, u.ccTR = function() {
      this.logger.log(R.INFO, "TR"), this.setMode("MODE_TEXT");
    }, u.ccRTD = function() {
      this.logger.log(R.INFO, "RTD"), this.setMode("MODE_TEXT");
    }, u.ccEDM = function() {
      this.logger.log(R.INFO, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0);
    }, u.ccCR = function() {
      this.logger.log(R.INFO, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0);
    }, u.ccENM = function() {
      this.logger.log(R.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset();
    }, u.ccEOC = function() {
      if (this.logger.log(R.INFO, "EOC - End Of Caption"), this.mode === "MODE_POP-ON") {
        var t = this.displayedMemory;
        this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = t, this.writeScreen = this.nonDisplayedMemory, this.logger.log(R.TEXT, "DISP: " + this.displayedMemory.getDisplayText());
      }
      this.outputDataUpdate(!0);
    }, u.ccTO = function(t) {
      this.logger.log(R.INFO, "TO(" + t + ") - Tab Offset"), this.writeScreen.moveCursor(t);
    }, u.ccMIDROW = function(t) {
      var o = { flash: !1 };
      if (o.underline = t % 2 == 1, o.italics = t >= 46, o.italics)
        o.foreground = "white";
      else {
        var b = Math.floor(t / 2) - 16;
        o.foreground = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"][b];
      }
      this.logger.log(R.INFO, "MIDROW: " + JSON.stringify(o)), this.writeScreen.setPen(o);
    }, u.outputDataUpdate = function(t) {
      t === void 0 && (t = !1);
      var o = this.logger.time;
      o !== null && this.outputFilter && (this.cueStartTime !== null || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, o, this.lastOutputScreen), t && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : o) : this.cueStartTime = o, this.lastOutputScreen.copy(this.displayedMemory));
    }, u.cueSplitAtTime = function(t) {
      this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory), this.cueStartTime = t));
    }, y;
  }(), h = function() {
    function y(t, o, b) {
      this.channels = void 0, this.currentChannel = 0, this.cmdHistory = void 0, this.logger = void 0;
      var _ = new l();
      this.channels = [null, new i(t, o, _), new i(t + 1, b, _)], this.cmdHistory = { a: null, b: null }, this.logger = _;
    }
    var u = y.prototype;
    return u.getHandler = function(t) {
      return this.channels[t].getHandler();
    }, u.setHandler = function(t, o) {
      this.channels[t].setHandler(o);
    }, u.addData = function(t, o) {
      var b, _, L, I = !1;
      this.logger.time = t;
      for (var O = 0; O < o.length; O += 2)
        if (_ = 127 & o[O], L = 127 & o[O + 1], _ !== 0 || L !== 0) {
          if (this.logger.log(R.DATA, "[" + e([o[O], o[O + 1]]) + "] -> (" + e([_, L]) + ")"), (b = this.parseCmd(_, L)) || (b = this.parseMidrow(_, L)), b || (b = this.parsePAC(_, L)), b || (b = this.parseBackgroundAttributes(_, L)), !b && (I = this.parseChars(_, L))) {
            var x = this.currentChannel;
            x && x > 0 ? this.channels[x].insertChars(I) : this.logger.log(R.WARNING, "No channel found yet. TEXT-MODE?");
          }
          b || I || this.logger.log(R.WARNING, "Couldn't parse cleaned data " + e([_, L]) + " orig: " + e([o[O], o[O + 1]]));
        }
    }, u.parseCmd = function(t, o) {
      var b = this.cmdHistory;
      if (!((t === 20 || t === 28 || t === 21 || t === 29) && o >= 32 && o <= 47 || (t === 23 || t === 31) && o >= 33 && o <= 35))
        return !1;
      if (c(t, o, b))
        return g(null, null, b), this.logger.log(R.DEBUG, "Repeated command (" + e([t, o]) + ") is dropped"), !0;
      var _ = t === 20 || t === 21 || t === 23 ? 1 : 2, L = this.channels[_];
      return t === 20 || t === 21 || t === 28 || t === 29 ? o === 32 ? L.ccRCL() : o === 33 ? L.ccBS() : o === 34 ? L.ccAOF() : o === 35 ? L.ccAON() : o === 36 ? L.ccDER() : o === 37 ? L.ccRU(2) : o === 38 ? L.ccRU(3) : o === 39 ? L.ccRU(4) : o === 40 ? L.ccFON() : o === 41 ? L.ccRDC() : o === 42 ? L.ccTR() : o === 43 ? L.ccRTD() : o === 44 ? L.ccEDM() : o === 45 ? L.ccCR() : o === 46 ? L.ccENM() : o === 47 && L.ccEOC() : L.ccTO(o - 32), g(t, o, b), this.currentChannel = _, !0;
    }, u.parseMidrow = function(t, o) {
      var b = 0;
      if ((t === 17 || t === 25) && o >= 32 && o <= 47) {
        if ((b = t === 17 ? 1 : 2) !== this.currentChannel)
          return this.logger.log(R.ERROR, "Mismatch channel in midrow parsing"), !1;
        var _ = this.channels[b];
        return !!_ && (_.ccMIDROW(o), this.logger.log(R.DEBUG, "MIDROW (" + e([t, o]) + ")"), !0);
      }
      return !1;
    }, u.parsePAC = function(t, o) {
      var b, _ = this.cmdHistory;
      if (!((t >= 17 && t <= 23 || t >= 25 && t <= 31) && o >= 64 && o <= 127 || (t === 16 || t === 24) && o >= 64 && o <= 95))
        return !1;
      if (c(t, o, _))
        return g(null, null, _), !0;
      var L = t <= 23 ? 1 : 2;
      b = o >= 64 && o <= 95 ? L === 1 ? T[t] : m[t] : L === 1 ? p[t] : E[t];
      var I = this.channels[L];
      return !!I && (I.setPAC(this.interpretPAC(b, o)), g(t, o, _), this.currentChannel = L, !0);
    }, u.interpretPAC = function(t, o) {
      var b, _ = { color: null, italics: !1, indent: null, underline: !1, row: t };
      return b = o > 95 ? o - 96 : o - 64, _.underline = (1 & b) == 1, b <= 13 ? _.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(b / 2)] : b <= 15 ? (_.italics = !0, _.color = "white") : _.indent = 4 * Math.floor((b - 16) / 2), _;
    }, u.parseChars = function(t, o) {
      var b, _, L = null, I = null;
      if (t >= 25 ? (b = 2, I = t - 8) : (b = 1, I = t), I >= 17 && I <= 19 ? (_ = I === 17 ? o + 80 : I === 18 ? o + 112 : o + 144, this.logger.log(R.INFO, "Special char '" + C(_) + "' in channel " + b), L = [_]) : t >= 32 && t <= 127 && (L = o === 0 ? [t] : [t, o]), L) {
        var O = e(L);
        this.logger.log(R.DEBUG, "Char codes =  " + O.join(",")), g(t, o, this.cmdHistory);
      }
      return L;
    }, u.parseBackgroundAttributes = function(t, o) {
      var b;
      if (!((t === 16 || t === 24) && o >= 32 && o <= 47 || (t === 23 || t === 31) && o >= 45 && o <= 47))
        return !1;
      var _ = {};
      t === 16 || t === 24 ? (b = Math.floor((o - 32) / 2), _.background = v[b], o % 2 == 1 && (_.background = _.background + "_semi")) : o === 45 ? _.background = "transparent" : (_.foreground = "black", o === 47 && (_.underline = !0));
      var L = t <= 23 ? 1 : 2;
      return this.channels[L].setBkgData(_), g(t, o, this.cmdHistory), !0;
    }, u.reset = function() {
      for (var t = 0; t < Object.keys(this.channels).length; t++) {
        var o = this.channels[t];
        o && o.reset();
      }
      this.cmdHistory = { a: null, b: null };
    }, u.cueSplitAtTime = function(t) {
      for (var o = 0; o < this.channels.length; o++) {
        var b = this.channels[o];
        b && b.cueSplitAtTime(t);
      }
    }, y;
  }();
  function g(y, u, t) {
    t.a = y, t.b = u;
  }
  function c(y, u, t) {
    return t.a === y && t.b === u;
  }
  w.default = h;
}, "./src/utils/codecs.ts": function(B, w, f) {
  f.r(w), f.d(w, "isCodecType", function() {
    return S;
  }), f.d(w, "isCodecSupportedInMp4", function() {
    return A;
  });
  var R = { audio: { a3ds: !0, "ac-3": !0, "ac-4": !0, alac: !0, alaw: !0, dra1: !0, "dts+": !0, "dts-": !0, dtsc: !0, dtse: !0, dtsh: !0, "ec-3": !0, enca: !0, g719: !0, g726: !0, m4ae: !0, mha1: !0, mha2: !0, mhm1: !0, mhm2: !0, mlpa: !0, mp4a: !0, "raw ": !0, Opus: !0, samr: !0, sawb: !0, sawp: !0, sevc: !0, sqcp: !0, ssmv: !0, twos: !0, ulaw: !0 }, video: { avc1: !0, avc2: !0, avc3: !0, avc4: !0, avcp: !0, av01: !0, drac: !0, dvav: !0, dvhe: !0, encv: !0, hev1: !0, hvc1: !0, mjp2: !0, mp4v: !0, mvc1: !0, mvc2: !0, mvc3: !0, mvc4: !0, resv: !0, rv60: !0, s263: !0, svc1: !0, svc2: !0, "vc-1": !0, vp08: !0, vp09: !0 }, text: { stpp: !0, wvtt: !0 } };
  function S(k, C) {
    var D = R[C];
    return !!D && D[k.slice(0, 4)] === !0;
  }
  function A(k, C) {
    return MediaSource.isTypeSupported((C || "video") + '/mp4;codecs="' + k + '"');
  }
}, "./src/utils/cues.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/utils/vttparser.ts"), S = f("./src/utils/webvtt-parser.ts"), A = f("./src/utils/texttrack-utils.ts"), k = /\s/, C = { newCue: function(D, d, T, p) {
    for (var m, E, v, l, e, s = [], n = self.VTTCue || self.TextTrackCue, r = 0; r < p.rows.length; r++)
      if (v = !0, l = 0, e = "", !(m = p.rows[r]).isEmpty()) {
        for (var a = 0; a < m.chars.length; a++)
          k.test(m.chars[a].uchar) && v ? l++ : (e += m.chars[a].uchar, v = !1);
        m.cueStartTime = d, d === T && (T += 1e-4), l >= 16 ? l-- : l++;
        var i = Object(R.fixLineBreaks)(e.trim()), h = Object(S.generateCueId)(d, T, i);
        D && D.cues && D.cues.getCueById(h) || ((E = new n(d, T, i)).id = h, E.line = r + 1, E.align = "left", E.position = 10 + Math.min(80, 10 * Math.floor(8 * l / 32)), s.push(E));
      }
    return D && s.length && (s.sort(function(g, c) {
      return g.line === "auto" || c.line === "auto" ? 0 : g.line > 8 && c.line > 8 ? c.line - g.line : g.line - c.line;
    }), s.forEach(function(g) {
      return Object(A.addCueToTrack)(D, g);
    })), s;
  } };
  w.default = C;
}, "./src/utils/discontinuities.ts": function(B, w, f) {
  f.r(w), f.d(w, "findFirstFragWithCC", function() {
    return k;
  }), f.d(w, "shouldAlignOnDiscontinuities", function() {
    return C;
  }), f.d(w, "findDiscontinuousReferenceFrag", function() {
    return D;
  }), f.d(w, "adjustSlidingStart", function() {
    return T;
  }), f.d(w, "alignStream", function() {
    return p;
  }), f.d(w, "alignPDT", function() {
    return m;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/utils/logger.ts"), A = f("./src/controller/level-helper.ts");
  function k(E, v) {
    for (var l = null, e = 0, s = E.length; e < s; e++) {
      var n = E[e];
      if (n && n.cc === v) {
        l = n;
        break;
      }
    }
    return l;
  }
  function C(E, v, l) {
    return !(!v.details || !(l.endCC > l.startCC || E && E.cc < l.startCC));
  }
  function D(E, v) {
    var l = E.fragments, e = v.fragments;
    if (e.length && l.length) {
      var s = k(l, e[0].cc);
      if (s && (!s || s.startPTS))
        return s;
      S.logger.log("No frag in previous level to align on");
    } else
      S.logger.log("No fragments to align");
  }
  function d(E, v) {
    if (E) {
      var l = E.start + v;
      E.start = E.startPTS = l, E.endPTS = l + E.duration;
    }
  }
  function T(E, v) {
    for (var l = v.fragments, e = 0, s = l.length; e < s; e++)
      d(l[e], E);
    v.fragmentHint && d(v.fragmentHint, E), v.alignedSliding = !0;
  }
  function p(E, v, l) {
    v && (function(e, s, n) {
      if (C(e, n, s)) {
        var r = D(n.details, s);
        r && Object(R.isFiniteNumber)(r.start) && (S.logger.log("Adjusting PTS using last level due to CC increase within current level " + s.url), T(r.start, s));
      }
    }(E, l, v), !l.alignedSliding && v.details && m(l, v.details), l.alignedSliding || !v.details || l.skippedSegments || Object(A.adjustSliding)(v.details, l));
  }
  function m(E, v) {
    if (v.fragments.length && E.hasProgramDateTime && v.hasProgramDateTime) {
      var l = v.fragments[0].programDateTime, e = E.fragments[0].programDateTime, s = (e - l) / 1e3 + v.fragments[0].start;
      s && Object(R.isFiniteNumber)(s) && (S.logger.log("Adjusting PTS using programDateTime delta " + (e - l) + "ms, sliding:" + s.toFixed(3) + " " + E.url + " "), T(s, E));
    }
  }
}, "./src/utils/ewma-bandwidth-estimator.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/utils/ewma.ts"), S = function() {
    function A(C, D, d) {
      this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultEstimate_ = d, this.minWeight_ = 1e-3, this.minDelayMs_ = 50, this.slow_ = new R.default(C), this.fast_ = new R.default(D);
    }
    var k = A.prototype;
    return k.update = function(C, D) {
      var d = this.slow_, T = this.fast_;
      this.slow_.halfLife !== C && (this.slow_ = new R.default(C, d.getEstimate(), d.getTotalWeight())), this.fast_.halfLife !== D && (this.fast_ = new R.default(D, T.getEstimate(), T.getTotalWeight()));
    }, k.sample = function(C, D) {
      var d = (C = Math.max(C, this.minDelayMs_)) / 1e3, T = 8 * D / d;
      this.fast_.sample(d, T), this.slow_.sample(d, T);
    }, k.canEstimate = function() {
      var C = this.fast_;
      return C && C.getTotalWeight() >= this.minWeight_;
    }, k.getEstimate = function() {
      return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_;
    }, k.destroy = function() {
    }, A;
  }();
  w.default = S;
}, "./src/utils/ewma.ts": function(B, w, f) {
  f.r(w);
  var R = function() {
    function S(k, C, D) {
      C === void 0 && (C = 0), D === void 0 && (D = 0), this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = k, this.alpha_ = k ? Math.exp(Math.log(0.5) / k) : 0, this.estimate_ = C, this.totalWeight_ = D;
    }
    var A = S.prototype;
    return A.sample = function(k, C) {
      var D = Math.pow(this.alpha_, k);
      this.estimate_ = C * (1 - D) + D * this.estimate_, this.totalWeight_ += k;
    }, A.getTotalWeight = function() {
      return this.totalWeight_;
    }, A.getEstimate = function() {
      if (this.alpha_) {
        var k = 1 - Math.pow(this.alpha_, this.totalWeight_);
        if (k)
          return this.estimate_ / k;
      }
      return this.estimate_;
    }, S;
  }();
  w.default = R;
}, "./src/utils/fetch-loader.ts": function(B, w, f) {
  f.r(w), f.d(w, "fetchSupported", function() {
    return p;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/loader/load-stats.ts"), A = f("./src/demux/chunk-cache.ts");
  function k(l) {
    var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return (k = function(s) {
      if (s === null || (n = s, Function.toString.call(n).indexOf("[native code]") === -1))
        return s;
      var n;
      if (typeof s != "function")
        throw new TypeError("Super expression must either be null or a function");
      if (e !== void 0) {
        if (e.has(s))
          return e.get(s);
        e.set(s, r);
      }
      function r() {
        return C(s, arguments, T(this).constructor);
      }
      return r.prototype = Object.create(s.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), d(r, s);
    })(l);
  }
  function C(l, e, s) {
    return (C = D() ? Reflect.construct : function(n, r, a) {
      var i = [null];
      i.push.apply(i, r);
      var h = new (Function.bind.apply(n, i))();
      return a && d(h, a.prototype), h;
    }).apply(null, arguments);
  }
  function D() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function")
      return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function d(l, e) {
    return (d = Object.setPrototypeOf || function(s, n) {
      return s.__proto__ = n, s;
    })(l, e);
  }
  function T(l) {
    return (T = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(l);
  }
  function p() {
    if (self.fetch && self.AbortController && self.ReadableStream && self.Request)
      try {
        return new self.ReadableStream({}), !0;
      } catch {
      }
    return !1;
  }
  var m = function() {
    function l(s) {
      this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = void 0, this.response = void 0, this.controller = void 0, this.context = void 0, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = s.fetchSetup || E, this.controller = new self.AbortController(), this.stats = new S.LoadStats();
    }
    var e = l.prototype;
    return e.destroy = function() {
      this.loader = this.callbacks = null, this.abortInternal();
    }, e.abortInternal = function() {
      var s = this.response;
      s && s.ok || (this.stats.aborted = !0, this.controller.abort());
    }, e.abort = function() {
      var s;
      this.abortInternal(), (s = this.callbacks) !== null && s !== void 0 && s.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response);
    }, e.load = function(s, n, r) {
      var a = this, i = this.stats;
      if (i.loading.start)
        throw new Error("Loader can only be used once.");
      i.loading.start = self.performance.now();
      var h = function(u, t) {
        var o = { method: "GET", mode: "cors", credentials: "same-origin", signal: t };
        return u.rangeEnd && (o.headers = new self.Headers({ Range: "bytes=" + u.rangeStart + "-" + String(u.rangeEnd - 1) })), o;
      }(s, this.controller.signal), g = r.onProgress, c = s.responseType === "arraybuffer", y = c ? "byteLength" : "length";
      this.context = s, this.config = n, this.callbacks = r, this.request = this.fetchSetup(s, h), self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(function() {
        a.abortInternal(), r.onTimeout(i, s, a.response);
      }, n.timeout), self.fetch(this.request).then(function(u) {
        if (a.response = a.loader = u, !u.ok) {
          var t = u.status, o = u.statusText;
          throw new v(o || "fetch, bad network response", t, u);
        }
        return i.loading.first = Math.max(self.performance.now(), i.loading.start), i.total = parseInt(u.headers.get("Content-Length") || "0"), g && Object(R.isFiniteNumber)(n.highWaterMark) ? a.loadProgressively(u, i, s, n.highWaterMark, g) : c ? u.arrayBuffer() : u.text();
      }).then(function(u) {
        var t = a.response;
        self.clearTimeout(a.requestTimeout), i.loading.end = Math.max(self.performance.now(), i.loading.first), i.loaded = i.total = u[y];
        var o = { url: t.url, data: u };
        g && !Object(R.isFiniteNumber)(n.highWaterMark) && g(i, s, u, t), r.onSuccess(o, i, s, t);
      }).catch(function(u) {
        if (self.clearTimeout(a.requestTimeout), !i.aborted) {
          var t = u.code || 0;
          r.onError({ code: t, text: u.message }, s, u.details);
        }
      });
    }, e.getCacheAge = function() {
      var s = null;
      if (this.response) {
        var n = this.response.headers.get("age");
        s = n ? parseFloat(n) : null;
      }
      return s;
    }, e.loadProgressively = function(s, n, r, a, i) {
      a === void 0 && (a = 0);
      var h = new A.default(), g = s.body.getReader();
      return function c() {
        return g.read().then(function(y) {
          if (y.done)
            return h.dataLength && i(n, r, h.flush(), s), Promise.resolve(new ArrayBuffer(0));
          var u = y.value, t = u.length;
          return n.loaded += t, t < a || h.dataLength ? (h.push(u), h.dataLength >= a && i(n, r, h.flush(), s)) : i(n, r, u, s), c();
        }).catch(function() {
          return Promise.reject();
        });
      }();
    }, l;
  }();
  function E(l, e) {
    return new self.Request(l.url, e);
  }
  var v = function(l) {
    var e, s;
    function n(r, a, i) {
      var h;
      return (h = l.call(this, r) || this).code = void 0, h.details = void 0, h.code = a, h.details = i, h;
    }
    return s = l, (e = n).prototype = Object.create(s.prototype), e.prototype.constructor = e, d(e, s), n;
  }(k(Error));
  w.default = m;
}, "./src/utils/imsc1-ttml-parser.ts": function(B, w, f) {
  f.r(w), f.d(w, "IMSC1_CODEC", function() {
    return T;
  }), f.d(w, "parseIMSC1", function() {
    return v;
  });
  var R = f("./src/utils/mp4-tools.ts"), S = f("./src/utils/vttparser.ts"), A = f("./src/utils/vttcue.ts"), k = f("./src/demux/id3.ts"), C = f("./src/utils/timescale-conversion.ts"), D = f("./src/utils/webvtt-parser.ts");
  function d() {
    return (d = Object.assign || function(i) {
      for (var h = 1; h < arguments.length; h++) {
        var g = arguments[h];
        for (var c in g)
          Object.prototype.hasOwnProperty.call(g, c) && (i[c] = g[c]);
      }
      return i;
    }).apply(this, arguments);
  }
  var T = "stpp.ttml.im1t", p = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, m = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, E = { left: "start", center: "center", right: "end", start: "start", end: "end" };
  function v(i, h, g, c, y) {
    var u = Object(R.findBox)(new Uint8Array(i), ["mdat"]);
    if (u.length !== 0) {
      var t = u[0], o = Object(k.utf8ArrayToStr)(new Uint8Array(i, t.start, t.end - t.start)), b = Object(C.toTimescaleFromScale)(h, 1, g);
      try {
        c(function(_, L) {
          var I = new DOMParser().parseFromString(_, "text/xml").getElementsByTagName("tt")[0];
          if (!I)
            throw new Error("Invalid ttml");
          var O = { frameRate: 30, subFrameRate: 1, frameRateMultiplier: 0, tickRate: 0 }, x = Object.keys(O).reduce(function(U, G) {
            return U[G] = I.getAttribute("ttp:" + G) || O[G], U;
          }, {}), P = I.getAttribute("xml:space") !== "preserve", M = e(l(I, "styling", "style")), F = e(l(I, "layout", "region")), N = l(I, "body", "[begin]");
          return [].map.call(N, function(U) {
            var G = s(U, P);
            if (!G || !U.hasAttribute("begin"))
              return null;
            var j = a(U.getAttribute("begin"), x), V = a(U.getAttribute("dur"), x), Y = a(U.getAttribute("end"), x);
            if (j === null)
              throw r(U);
            if (Y === null) {
              if (V === null)
                throw r(U);
              Y = j + V;
            }
            var W = new A.default(j - L, Y - L, G);
            W.id = Object(D.generateCueId)(W.startTime, W.endTime, W.text);
            var q = F[U.getAttribute("region")], X = M[U.getAttribute("style")];
            W.position = 10, W.size = 80;
            var J = function(at, z) {
              var tt = "http://www.w3.org/ns/ttml#styling";
              return ["displayAlign", "textAlign", "color", "backgroundColor", "fontSize", "fontFamily"].reduce(function(it, nt) {
                var dt = n(z, tt, nt) || n(at, tt, nt);
                return dt && (it[nt] = dt), it;
              }, {});
            }(q, X), rt = J.textAlign;
            if (rt) {
              var Q = E[rt];
              Q && (W.lineAlign = Q), W.align = rt;
            }
            return d(W, J), W;
          }).filter(function(U) {
            return U !== null;
          });
        }(o, b));
      } catch (_) {
        y(_);
      }
    } else
      y(new Error("Could not parse IMSC1 mdat"));
  }
  function l(i, h, g) {
    var c = i.getElementsByTagName(h)[0];
    return c ? [].slice.call(c.querySelectorAll(g)) : [];
  }
  function e(i) {
    return i.reduce(function(h, g) {
      var c = g.getAttribute("xml:id");
      return c && (h[c] = g), h;
    }, {});
  }
  function s(i, h) {
    return [].slice.call(i.childNodes).reduce(function(g, c, y) {
      var u;
      return c.nodeName === "br" && y ? g + `
` : (u = c.childNodes) !== null && u !== void 0 && u.length ? s(c, h) : h ? g + c.textContent.trim().replace(/\s+/g, " ") : g + c.textContent;
    }, "");
  }
  function n(i, h, g) {
    return i.hasAttributeNS(h, g) ? i.getAttributeNS(h, g) : null;
  }
  function r(i) {
    return new Error("Could not parse ttml timestamp " + i);
  }
  function a(i, h) {
    if (!i)
      return null;
    var g = Object(S.parseTimeStamp)(i);
    return g === null && (p.test(i) ? g = function(c, y) {
      var u = p.exec(c), t = (0 | u[4]) + (0 | u[5]) / y.subFrameRate;
      return 3600 * (0 | u[1]) + 60 * (0 | u[2]) + (0 | u[3]) + t / y.frameRate;
    }(i, h) : m.test(i) && (g = function(c, y) {
      var u = m.exec(c), t = Number(u[1]);
      switch (u[2]) {
        case "h":
          return 3600 * t;
        case "m":
          return 60 * t;
        case "ms":
          return 1e3 * t;
        case "f":
          return t / y.frameRate;
        case "t":
          return t / y.tickRate;
      }
      return t;
    }(i, h))), g;
  }
}, "./src/utils/logger.ts": function(B, w, f) {
  f.r(w), f.d(w, "enableLogs", function() {
    return C;
  }), f.d(w, "logger", function() {
    return D;
  });
  var R = function() {
  }, S = { trace: R, debug: R, log: R, warn: R, info: R, error: R }, A = S;
  function k(d) {
    var T = self.console[d];
    return T ? T.bind(self.console, "[" + d + "] >") : R;
  }
  function C(d) {
    if (self.console && d === !0 || typeof d == "object") {
      (function(T) {
        for (var p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), E = 1; E < p; E++)
          m[E - 1] = arguments[E];
        m.forEach(function(v) {
          A[v] = T[v] ? T[v].bind(T) : k(v);
        });
      })(d, "debug", "log", "info", "warn", "error");
      try {
        A.log();
      } catch {
        A = S;
      }
    } else
      A = S;
  }
  var D = S;
}, "./src/utils/mediakeys-helper.ts": function(B, w, f) {
  var R, S;
  f.r(w), f.d(w, "KeySystems", function() {
    return R;
  }), f.d(w, "requestMediaKeySystemAccess", function() {
    return A;
  }), (S = R || (R = {})).WIDEVINE = "com.widevine.alpha", S.PLAYREADY = "com.microsoft.playready";
  var A = typeof self < "u" && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
}, "./src/utils/mediasource-helper.ts": function(B, w, f) {
  function R() {
    return self.MediaSource || self.WebKitMediaSource;
  }
  f.r(w), f.d(w, "getMediaSource", function() {
    return R;
  });
}, "./src/utils/mp4-tools.ts": function(B, w, f) {
  f.r(w), f.d(w, "bin2str", function() {
    return C;
  }), f.d(w, "readUint16", function() {
    return D;
  }), f.d(w, "readUint32", function() {
    return d;
  }), f.d(w, "writeUint32", function() {
    return T;
  }), f.d(w, "findBox", function() {
    return p;
  }), f.d(w, "parseSegmentIndex", function() {
    return m;
  }), f.d(w, "parseInitSegment", function() {
    return E;
  }), f.d(w, "getStartDTS", function() {
    return v;
  }), f.d(w, "getDuration", function() {
    return l;
  }), f.d(w, "computeRawDurationFromSamples", function() {
    return e;
  }), f.d(w, "offsetStartDTS", function() {
    return s;
  }), f.d(w, "segmentValidRange", function() {
    return n;
  }), f.d(w, "appendUint8Array", function() {
    return r;
  });
  var R = f("./src/utils/typed-array.ts"), S = f("./src/loader/fragment.ts"), A = Math.pow(2, 32) - 1, k = [].push;
  function C(a) {
    return String.fromCharCode.apply(null, a);
  }
  function D(a, i) {
    "data" in a && (i += a.start, a = a.data);
    var h = a[i] << 8 | a[i + 1];
    return h < 0 ? 65536 + h : h;
  }
  function d(a, i) {
    "data" in a && (i += a.start, a = a.data);
    var h = a[i] << 24 | a[i + 1] << 16 | a[i + 2] << 8 | a[i + 3];
    return h < 0 ? 4294967296 + h : h;
  }
  function T(a, i, h) {
    "data" in a && (i += a.start, a = a.data), a[i] = h >> 24, a[i + 1] = h >> 16 & 255, a[i + 2] = h >> 8 & 255, a[i + 3] = 255 & h;
  }
  function p(a, i) {
    var h, g, c, y = [];
    if (!i.length)
      return y;
    "data" in a ? (h = a.data, g = a.start, c = a.end) : (g = 0, c = (h = a).byteLength);
    for (var u = g; u < c; ) {
      var t = d(h, u), o = t > 1 ? u + t : c;
      if (C(h.subarray(u + 4, u + 8)) === i[0])
        if (i.length === 1)
          y.push({ data: h, start: u + 8, end: o });
        else {
          var b = p({ data: h, start: u + 8, end: o }, i.slice(1));
          b.length && k.apply(y, b);
        }
      u = o;
    }
    return y;
  }
  function m(a) {
    var i = p(a, ["moov"])[0], h = i ? i.end : null, g = p(a, ["sidx"]);
    if (!g || !g[0])
      return null;
    var c = [], y = g[0], u = y.data[0], t = u === 0 ? 8 : 16, o = d(y, t);
    t += 4, t += u === 0 ? 8 : 16, t += 2;
    var b = y.end + 0, _ = D(y, t);
    t += 2;
    for (var L = 0; L < _; L++) {
      var I = t, O = d(y, I);
      I += 4;
      var x = 2147483647 & O;
      if ((2147483648 & O) >>> 31 == 1)
        return console.warn("SIDX has hierarchical references (not supported)"), null;
      var P = d(y, I);
      I += 4, c.push({ referenceSize: x, subsegmentDuration: P, info: { duration: P / o, start: b, end: b + x - 1 } }), b += x, t = I += 4;
    }
    return { earliestPresentationTime: 0, timescale: o, version: u, referencesCount: _, references: c, moovEndOffset: h };
  }
  function E(a) {
    for (var i = [], h = p(a, ["moov", "trak"]), g = 0; g < h.length; g++) {
      var c = h[g], y = p(c, ["tkhd"])[0];
      if (y) {
        var u = y.data[y.start], t = u === 0 ? 12 : 20, o = d(y, t), b = p(c, ["mdia", "mdhd"])[0];
        if (b) {
          var _ = d(b, t = (u = b.data[b.start]) === 0 ? 12 : 20), L = p(c, ["mdia", "hdlr"])[0];
          if (L) {
            var I = C(L.data.subarray(L.start + 8, L.start + 12)), O = { soun: S.ElementaryStreamTypes.AUDIO, vide: S.ElementaryStreamTypes.VIDEO }[I];
            if (O) {
              var x = p(c, ["mdia", "minf", "stbl", "stsd"])[0], P = void 0;
              x && (P = C(x.data.subarray(x.start + 12, x.start + 16))), i[o] = { timescale: _, type: O }, i[O] = { timescale: _, id: o, codec: P };
            }
          }
        }
      }
    }
    return p(a, ["moov", "mvex", "trex"]).forEach(function(M) {
      var F = d(M, 4), N = i[F];
      N && (N.default = { duration: d(M, 12), flags: d(M, 20) });
    }), i;
  }
  function v(a, i) {
    return p(i, ["moof", "traf"]).reduce(function(h, g) {
      var c = p(g, ["tfdt"])[0], y = c.data[c.start], u = p(g, ["tfhd"]).reduce(function(t, o) {
        var b = d(o, 4), _ = a[b];
        if (_) {
          var L = d(c, 4);
          y === 1 && (L *= Math.pow(2, 32), L += d(c, 8));
          var I = L / (_.timescale || 9e4);
          if (isFinite(I) && (t === null || I < t))
            return I;
        }
        return t;
      }, null);
      return u !== null && isFinite(u) && (h === null || u < h) ? u : h;
    }, null) || 0;
  }
  function l(a, i) {
    for (var h = 0, g = 0, c = 0, y = p(a, ["moof", "traf"]), u = 0; u < y.length; u++) {
      var t = y[u], o = p(t, ["tfhd"])[0], b = i[d(o, 4)];
      if (b) {
        var _ = b.default, L = d(o, 0) | (_ == null ? void 0 : _.flags), I = _ == null ? void 0 : _.duration;
        8 & L && (I = d(o, 2 & L ? 12 : 8));
        for (var O = b.timescale || 9e4, x = p(t, ["trun"]), P = 0; P < x.length; P++)
          h = I ? I * d(x[P], 4) : e(x[P]), b.type === S.ElementaryStreamTypes.VIDEO ? g += h / O : b.type === S.ElementaryStreamTypes.AUDIO && (c += h / O);
      }
    }
    if (g === 0 && c === 0) {
      var M = m(a);
      if (M != null && M.references)
        return M.references.reduce(function(F, N) {
          return F + N.info.duration || 0;
        }, 0);
    }
    return g || c;
  }
  function e(a) {
    var i = d(a, 0), h = 8;
    1 & i && (h += 4), 4 & i && (h += 4);
    for (var g = 0, c = d(a, 4), y = 0; y < c; y++)
      256 & i && (g += d(a, h), h += 4), 512 & i && (h += 4), 1024 & i && (h += 4), 2048 & i && (h += 4);
    return g;
  }
  function s(a, i, h) {
    p(i, ["moof", "traf"]).forEach(function(g) {
      p(g, ["tfhd"]).forEach(function(c) {
        var y = d(c, 4), u = a[y];
        if (u) {
          var t = u.timescale || 9e4;
          p(g, ["tfdt"]).forEach(function(o) {
            var b = o.data[o.start], _ = d(o, 4);
            if (b === 0)
              T(o, 4, _ - h * t);
            else {
              _ *= Math.pow(2, 32), _ += d(o, 8), _ -= h * t, _ = Math.max(_, 0);
              var L = Math.floor(_ / (A + 1)), I = Math.floor(_ % (A + 1));
              T(o, 4, L), T(o, 8, I);
            }
          });
        }
      });
    });
  }
  function n(a) {
    var i = { valid: null, remainder: null }, h = p(a, ["moof"]);
    if (!h)
      return i;
    if (h.length < 2)
      return i.remainder = a, i;
    var g = h[h.length - 1];
    return i.valid = Object(R.sliceUint8)(a, 0, g.start - 8), i.remainder = Object(R.sliceUint8)(a, g.start - 8), i;
  }
  function r(a, i) {
    var h = new Uint8Array(a.length + i.length);
    return h.set(a), h.set(i, a.length), h;
  }
}, "./src/utils/output-filter.ts": function(B, w, f) {
  f.r(w), f.d(w, "default", function() {
    return R;
  });
  var R = function() {
    function S(k, C) {
      this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = k, this.trackName = C;
    }
    var A = S.prototype;
    return A.dispatchCue = function() {
      this.startTime !== null && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null);
    }, A.newCue = function(k, C, D) {
      (this.startTime === null || this.startTime > k) && (this.startTime = k), this.endTime = C, this.screen = D, this.timelineController.createCaptionsTrack(this.trackName);
    }, A.reset = function() {
      this.cueRanges = [];
    }, S;
  }();
}, "./src/utils/texttrack-utils.ts": function(B, w, f) {
  f.r(w), f.d(w, "sendAddTrackEvent", function() {
    return S;
  }), f.d(w, "addCueToTrack", function() {
    return A;
  }), f.d(w, "clearCurrentCues", function() {
    return k;
  }), f.d(w, "removeCuesInRange", function() {
    return C;
  }), f.d(w, "getCuesInRange", function() {
    return D;
  });
  var R = f("./src/utils/logger.ts");
  function S(d, T) {
    var p;
    try {
      p = new Event("addtrack");
    } catch {
      (p = document.createEvent("Event")).initEvent("addtrack", !1, !1);
    }
    p.track = d, T.dispatchEvent(p);
  }
  function A(d, T) {
    var p = d.mode;
    if (p === "disabled" && (d.mode = "hidden"), d.cues && !d.cues.getCueById(T.id))
      try {
        if (d.addCue(T), !d.cues.getCueById(T.id))
          throw new Error("addCue is failed for: " + T);
      } catch (E) {
        R.logger.debug("[texttrack-utils]: " + E);
        var m = new self.TextTrackCue(T.startTime, T.endTime, T.text);
        m.id = T.id, d.addCue(m);
      }
    p === "disabled" && (d.mode = p);
  }
  function k(d) {
    var T = d.mode;
    if (T === "disabled" && (d.mode = "hidden"), d.cues)
      for (var p = d.cues.length; p--; )
        d.removeCue(d.cues[p]);
    T === "disabled" && (d.mode = T);
  }
  function C(d, T, p) {
    var m = d.mode;
    if (m === "disabled" && (d.mode = "hidden"), d.cues && d.cues.length > 0)
      for (var E = D(d.cues, T, p), v = 0; v < E.length; v++)
        d.removeCue(E[v]);
    m === "disabled" && (d.mode = m);
  }
  function D(d, T, p) {
    var m = [], E = function(s, n) {
      if (n < s[0].startTime)
        return 0;
      var r = s.length - 1;
      if (n > s[r].endTime)
        return -1;
      for (var a = 0, i = r; a <= i; ) {
        var h = Math.floor((i + a) / 2);
        if (n < s[h].startTime)
          i = h - 1;
        else {
          if (!(n > s[h].startTime && a < r))
            return h;
          a = h + 1;
        }
      }
      return s[a].startTime - n < n - s[i].startTime ? a : i;
    }(d, T);
    if (E > -1)
      for (var v = E, l = d.length; v < l; v++) {
        var e = d[v];
        if (e.startTime >= T && e.endTime <= p)
          m.push(e);
        else if (e.startTime > p)
          return m;
      }
    return m;
  }
}, "./src/utils/time-ranges.ts": function(B, w, f) {
  f.r(w), w.default = { toString: function(R) {
    for (var S = "", A = R.length, k = 0; k < A; k++)
      S += "[" + R.start(k).toFixed(3) + "," + R.end(k).toFixed(3) + "]";
    return S;
  } };
}, "./src/utils/timescale-conversion.ts": function(B, w, f) {
  function R(C, D, d, T) {
    d === void 0 && (d = 1), T === void 0 && (T = !1);
    var p = C * D * d;
    return T ? Math.round(p) : p;
  }
  function S(C, D, d, T) {
    return d === void 0 && (d = 1), T === void 0 && (T = !1), R(C, D, 1 / d, T);
  }
  function A(C, D) {
    return D === void 0 && (D = !1), R(C, 1e3, 1 / 9e4, D);
  }
  function k(C, D) {
    return D === void 0 && (D = 1), R(C, 9e4, 1 / D);
  }
  f.r(w), f.d(w, "toTimescaleFromBase", function() {
    return R;
  }), f.d(w, "toTimescaleFromScale", function() {
    return S;
  }), f.d(w, "toMsFromMpegTsClock", function() {
    return A;
  }), f.d(w, "toMpegTsClockFromTimescale", function() {
    return k;
  });
}, "./src/utils/typed-array.ts": function(B, w, f) {
  function R(S, A, k) {
    return Uint8Array.prototype.slice ? S.slice(A, k) : new Uint8Array(Array.prototype.slice.call(S, A, k));
  }
  f.r(w), f.d(w, "sliceUint8", function() {
    return R;
  });
}, "./src/utils/vttcue.ts": function(B, w, f) {
  f.r(w), w.default = function() {
    if (typeof self < "u" && self.VTTCue)
      return self.VTTCue;
    var R = ["", "lr", "rl"], S = ["start", "middle", "end", "left", "right"];
    function A(d, T) {
      if (typeof T != "string" || !Array.isArray(d))
        return !1;
      var p = T.toLowerCase();
      return !!~d.indexOf(p) && p;
    }
    function k(d) {
      return A(S, d);
    }
    function C(d) {
      for (var T = arguments.length, p = new Array(T > 1 ? T - 1 : 0), m = 1; m < T; m++)
        p[m - 1] = arguments[m];
      for (var E = 1; E < arguments.length; E++) {
        var v = arguments[E];
        for (var l in v)
          d[l] = v[l];
      }
      return d;
    }
    function D(d, T, p) {
      var m = this, E = { enumerable: !0 };
      m.hasBeenReset = !1;
      var v = "", l = !1, e = d, s = T, n = p, r = null, a = "", i = !0, h = "auto", g = "start", c = 50, y = "middle", u = 50, t = "middle";
      Object.defineProperty(m, "id", C({}, E, { get: function() {
        return v;
      }, set: function(o) {
        v = "" + o;
      } })), Object.defineProperty(m, "pauseOnExit", C({}, E, { get: function() {
        return l;
      }, set: function(o) {
        l = !!o;
      } })), Object.defineProperty(m, "startTime", C({}, E, { get: function() {
        return e;
      }, set: function(o) {
        if (typeof o != "number")
          throw new TypeError("Start time must be set to a number.");
        e = o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "endTime", C({}, E, { get: function() {
        return s;
      }, set: function(o) {
        if (typeof o != "number")
          throw new TypeError("End time must be set to a number.");
        s = o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "text", C({}, E, { get: function() {
        return n;
      }, set: function(o) {
        n = "" + o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "region", C({}, E, { get: function() {
        return r;
      }, set: function(o) {
        r = o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "vertical", C({}, E, { get: function() {
        return a;
      }, set: function(o) {
        var b = function(_) {
          return A(R, _);
        }(o);
        if (b === !1)
          throw new SyntaxError("An invalid or illegal string was specified.");
        a = b, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "snapToLines", C({}, E, { get: function() {
        return i;
      }, set: function(o) {
        i = !!o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "line", C({}, E, { get: function() {
        return h;
      }, set: function(o) {
        if (typeof o != "number" && o !== "auto")
          throw new SyntaxError("An invalid number or illegal string was specified.");
        h = o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "lineAlign", C({}, E, { get: function() {
        return g;
      }, set: function(o) {
        var b = k(o);
        if (!b)
          throw new SyntaxError("An invalid or illegal string was specified.");
        g = b, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "position", C({}, E, { get: function() {
        return c;
      }, set: function(o) {
        if (o < 0 || o > 100)
          throw new Error("Position must be between 0 and 100.");
        c = o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "positionAlign", C({}, E, { get: function() {
        return y;
      }, set: function(o) {
        var b = k(o);
        if (!b)
          throw new SyntaxError("An invalid or illegal string was specified.");
        y = b, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "size", C({}, E, { get: function() {
        return u;
      }, set: function(o) {
        if (o < 0 || o > 100)
          throw new Error("Size must be between 0 and 100.");
        u = o, this.hasBeenReset = !0;
      } })), Object.defineProperty(m, "align", C({}, E, { get: function() {
        return t;
      }, set: function(o) {
        var b = k(o);
        if (!b)
          throw new SyntaxError("An invalid or illegal string was specified.");
        t = b, this.hasBeenReset = !0;
      } })), m.displayState = void 0;
    }
    return D.prototype.getCueAsHTML = function() {
      return self.WebVTT.convertCueToDOMTree(self, this.text);
    }, D;
  }();
}, "./src/utils/vttparser.ts": function(B, w, f) {
  f.r(w), f.d(w, "parseTimeStamp", function() {
    return A;
  }), f.d(w, "fixLineBreaks", function() {
    return p;
  }), f.d(w, "VTTParser", function() {
    return m;
  });
  var R = f("./src/utils/vttcue.ts"), S = function() {
    function E() {
    }
    return E.prototype.decode = function(v, l) {
      if (!v)
        return "";
      if (typeof v != "string")
        throw new Error("Error - expected string data.");
      return decodeURIComponent(encodeURIComponent(v));
    }, E;
  }();
  function A(E) {
    function v(e, s, n, r) {
      return 3600 * (0 | e) + 60 * (0 | s) + (0 | n) + parseFloat(r || 0);
    }
    var l = E.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
    return l ? parseFloat(l[2]) > 59 ? v(l[2], l[3], 0, l[4]) : v(l[1], l[2], l[3], l[4]) : null;
  }
  var k = function() {
    function E() {
      this.values = /* @__PURE__ */ Object.create(null);
    }
    var v = E.prototype;
    return v.set = function(l, e) {
      this.get(l) || e === "" || (this.values[l] = e);
    }, v.get = function(l, e, s) {
      return s ? this.has(l) ? this.values[l] : e[s] : this.has(l) ? this.values[l] : e;
    }, v.has = function(l) {
      return l in this.values;
    }, v.alt = function(l, e, s) {
      for (var n = 0; n < s.length; ++n)
        if (e === s[n]) {
          this.set(l, e);
          break;
        }
    }, v.integer = function(l, e) {
      /^-?\d+$/.test(e) && this.set(l, parseInt(e, 10));
    }, v.percent = function(l, e) {
      if (/^([\d]{1,3})(\.[\d]*)?%$/.test(e)) {
        var s = parseFloat(e);
        if (s >= 0 && s <= 100)
          return this.set(l, s), !0;
      }
      return !1;
    }, E;
  }();
  function C(E, v, l, e) {
    var s = e ? E.split(e) : [E];
    for (var n in s)
      if (typeof s[n] == "string") {
        var r = s[n].split(l);
        r.length === 2 && v(r[0], r[1]);
      }
  }
  var D = new R.default(0, 0, ""), d = D.align === "middle" ? "middle" : "center";
  function T(E, v, l) {
    var e = E;
    function s() {
      var r = A(E);
      if (r === null)
        throw new Error("Malformed timestamp: " + e);
      return E = E.replace(/^[^\sa-zA-Z-]+/, ""), r;
    }
    function n() {
      E = E.replace(/^\s+/, "");
    }
    if (n(), v.startTime = s(), n(), E.substr(0, 3) !== "-->")
      throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + e);
    E = E.substr(3), n(), v.endTime = s(), n(), function(r, a) {
      var i = new k();
      C(r, function(c, y) {
        var u;
        switch (c) {
          case "region":
            for (var t = l.length - 1; t >= 0; t--)
              if (l[t].id === y) {
                i.set(c, l[t].region);
                break;
              }
            break;
          case "vertical":
            i.alt(c, y, ["rl", "lr"]);
            break;
          case "line":
            u = y.split(","), i.integer(c, u[0]), i.percent(c, u[0]) && i.set("snapToLines", !1), i.alt(c, u[0], ["auto"]), u.length === 2 && i.alt("lineAlign", u[1], ["start", d, "end"]);
            break;
          case "position":
            u = y.split(","), i.percent(c, u[0]), u.length === 2 && i.alt("positionAlign", u[1], ["start", d, "end", "line-left", "line-right", "auto"]);
            break;
          case "size":
            i.percent(c, y);
            break;
          case "align":
            i.alt(c, y, ["start", d, "end", "left", "right"]);
        }
      }, /:/, /\s/), a.region = i.get("region", null), a.vertical = i.get("vertical", "");
      var h = i.get("line", "auto");
      h === "auto" && D.line === -1 && (h = -1), a.line = h, a.lineAlign = i.get("lineAlign", "start"), a.snapToLines = i.get("snapToLines", !0), a.size = i.get("size", 100), a.align = i.get("align", d);
      var g = i.get("position", "auto");
      g === "auto" && D.position === 50 && (g = a.align === "start" || a.align === "left" ? 0 : a.align === "end" || a.align === "right" ? 100 : 50), a.position = g;
    }(E, v);
  }
  function p(E) {
    return E.replace(/<br(?: \/)?>/gi, `
`);
  }
  var m = function() {
    function E() {
      this.state = "INITIAL", this.buffer = "", this.decoder = new S(), this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
    }
    var v = E.prototype;
    return v.parse = function(l) {
      var e = this;
      function s() {
        var h = e.buffer, g = 0;
        for (h = p(h); g < h.length && h[g] !== "\r" && h[g] !== `
`; )
          ++g;
        var c = h.substr(0, g);
        return h[g] === "\r" && ++g, h[g] === `
` && ++g, e.buffer = h.substr(g), c;
      }
      l && (e.buffer += e.decoder.decode(l, { stream: !0 }));
      try {
        var n = "";
        if (e.state === "INITIAL") {
          if (!/\r\n|\n/.test(e.buffer))
            return this;
          var r = (n = s()).match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
          if (!r || !r[0])
            throw new Error("Malformed WebVTT signature.");
          e.state = "HEADER";
        }
        for (var a = !1; e.buffer; ) {
          if (!/\r\n|\n/.test(e.buffer))
            return this;
          switch (a ? a = !1 : n = s(), e.state) {
            case "HEADER":
              /:/.test(n) ? C(n, function(h, g) {
              }, /:/) : n || (e.state = "ID");
              continue;
            case "NOTE":
              n || (e.state = "ID");
              continue;
            case "ID":
              if (/^NOTE($|[ \t])/.test(n)) {
                e.state = "NOTE";
                break;
              }
              if (!n)
                continue;
              if (e.cue = new R.default(0, 0, ""), e.state = "CUE", n.indexOf("-->") === -1) {
                e.cue.id = n;
                continue;
              }
            case "CUE":
              if (!e.cue) {
                e.state = "BADCUE";
                continue;
              }
              try {
                T(n, e.cue, e.regionList);
              } catch {
                e.cue = null, e.state = "BADCUE";
                continue;
              }
              e.state = "CUETEXT";
              continue;
            case "CUETEXT":
              var i = n.indexOf("-->") !== -1;
              if (!n || i && (a = !0)) {
                e.oncue && e.cue && e.oncue(e.cue), e.cue = null, e.state = "ID";
                continue;
              }
              if (e.cue === null)
                continue;
              e.cue.text && (e.cue.text += `
`), e.cue.text += n;
              continue;
            case "BADCUE":
              n || (e.state = "ID");
          }
        }
      } catch {
        e.state === "CUETEXT" && e.cue && e.oncue && e.oncue(e.cue), e.cue = null, e.state = e.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
      }
      return this;
    }, v.flush = function() {
      var l = this;
      try {
        if ((l.cue || l.state === "HEADER") && (l.buffer += `

`, l.parse()), l.state === "INITIAL" || l.state === "BADWEBVTT")
          throw new Error("Malformed WebVTT signature.");
      } catch (e) {
        l.onparsingerror && l.onparsingerror(e);
      }
      return l.onflush && l.onflush(), this;
    }, E;
  }();
}, "./src/utils/webvtt-parser.ts": function(B, w, f) {
  f.r(w), f.d(w, "generateCueId", function() {
    return p;
  }), f.d(w, "parseWebVTT", function() {
    return m;
  });
  var R = f("./src/polyfills/number.ts"), S = f("./src/utils/vttparser.ts"), A = f("./src/demux/id3.ts"), k = f("./src/utils/timescale-conversion.ts"), C = f("./src/remux/mp4-remuxer.ts"), D = /\r\n|\n\r|\n|\r/g, d = function(E, v, l) {
    return l === void 0 && (l = 0), E.substr(l, v.length) === v;
  }, T = function(E) {
    for (var v = 5381, l = E.length; l; )
      v = 33 * v ^ E.charCodeAt(--l);
    return (v >>> 0).toString();
  };
  function p(E, v, l) {
    return T(E.toString()) + T(v.toString()) + T(l);
  }
  function m(E, v, l, e, s, n, r, a) {
    var i, h = new S.VTTParser(), g = Object(A.utf8ArrayToStr)(new Uint8Array(E)).trim().replace(D, `
`).split(`
`), c = [], y = Object(k.toMpegTsClockFromTimescale)(v, l), u = "00:00.000", t = 0, o = 0, b = !0, _ = !1;
    h.oncue = function(L) {
      var I = e[s], O = e.ccOffset, x = (t - y) / 9e4;
      if (I != null && I.new && (o !== void 0 ? O = e.ccOffset = I.start : function(N, U, G) {
        var j = N[U], V = N[j.prevCC];
        if (!V || !V.new && j.new)
          return N.ccOffset = N.presentationOffset = j.start, void (j.new = !1);
        for (; (Y = V) !== null && Y !== void 0 && Y.new; ) {
          var Y;
          N.ccOffset += j.start - V.start, j.new = !1, V = N[(j = V).prevCC];
        }
        N.presentationOffset = G;
      }(e, s, x)), x && (O = x - e.presentationOffset), _) {
        var P = L.endTime - L.startTime, M = Object(C.normalizePts)(9e4 * (L.startTime + O - o), 9e4 * n) / 9e4;
        L.startTime = M, L.endTime = M + P;
      }
      var F = L.text.trim();
      L.text = decodeURIComponent(encodeURIComponent(F)), L.id || (L.id = p(L.startTime, L.endTime, F)), L.endTime > 0 && c.push(L);
    }, h.onparsingerror = function(L) {
      i = L;
    }, h.onflush = function() {
      i ? a(i) : r(c);
    }, g.forEach(function(L) {
      if (b) {
        if (d(L, "X-TIMESTAMP-MAP=")) {
          b = !1, _ = !0, L.substr(16).split(",").forEach(function(I) {
            d(I, "LOCAL:") ? u = I.substr(6) : d(I, "MPEGTS:") && (t = parseInt(I.substr(7)));
          });
          try {
            o = function(I) {
              var O = parseInt(I.substr(-3)), x = parseInt(I.substr(-6, 2)), P = parseInt(I.substr(-9, 2)), M = I.length > 9 ? parseInt(I.substr(0, I.indexOf(":"))) : 0;
              if (!(Object(R.isFiniteNumber)(O) && Object(R.isFiniteNumber)(x) && Object(R.isFiniteNumber)(P) && Object(R.isFiniteNumber)(M)))
                throw Error("Malformed X-TIMESTAMP-MAP: Local:" + I);
              return O += 1e3 * x, (O += 6e4 * P) + 36e5 * M;
            }(u) / 1e3;
          } catch (I) {
            _ = !1, i = I;
          }
          return;
        }
        L === "" && (b = !1);
      }
      h.parse(L + `
`);
    }), h.flush();
  }
}, "./src/utils/xhr-loader.ts": function(B, w, f) {
  f.r(w);
  var R = f("./src/utils/logger.ts"), S = f("./src/loader/load-stats.ts"), A = /^age:\s*[\d.]+\s*$/m, k = function() {
    function C(d) {
      this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = void 0, this.loader = null, this.stats = void 0, this.xhrSetup = d ? d.xhrSetup : null, this.stats = new S.LoadStats(), this.retryDelay = 0;
    }
    var D = C.prototype;
    return D.destroy = function() {
      this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null;
    }, D.abortInternal = function() {
      var d = this.loader;
      self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), d && (d.onreadystatechange = null, d.onprogress = null, d.readyState !== 4 && (this.stats.aborted = !0, d.abort()));
    }, D.abort = function() {
      var d;
      this.abortInternal(), (d = this.callbacks) !== null && d !== void 0 && d.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader);
    }, D.load = function(d, T, p) {
      if (this.stats.loading.start)
        throw new Error("Loader can only be used once.");
      this.stats.loading.start = self.performance.now(), this.context = d, this.config = T, this.callbacks = p, this.retryDelay = T.retryDelay, this.loadInternal();
    }, D.loadInternal = function() {
      var d = this.config, T = this.context;
      if (d) {
        var p = this.loader = new self.XMLHttpRequest(), m = this.stats;
        m.loading.first = 0, m.loaded = 0;
        var E = this.xhrSetup;
        try {
          if (E)
            try {
              E(p, T.url);
            } catch {
              p.open("GET", T.url, !0), E(p, T.url);
            }
          p.readyState || p.open("GET", T.url, !0);
        } catch (v) {
          return void this.callbacks.onError({ code: p.status, text: v.message }, T, p);
        }
        T.rangeEnd && p.setRequestHeader("Range", "bytes=" + T.rangeStart + "-" + (T.rangeEnd - 1)), p.onreadystatechange = this.readystatechange.bind(this), p.onprogress = this.loadprogress.bind(this), p.responseType = T.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), d.timeout), p.send();
      }
    }, D.readystatechange = function() {
      var d = this.context, T = this.loader, p = this.stats;
      if (d && T) {
        var m = T.readyState, E = this.config;
        if (!p.aborted && m >= 2)
          if (self.clearTimeout(this.requestTimeout), p.loading.first === 0 && (p.loading.first = Math.max(self.performance.now(), p.loading.start)), m === 4) {
            T.onreadystatechange = null, T.onprogress = null;
            var v = T.status;
            if (v >= 200 && v < 300) {
              var l, e;
              if (p.loading.end = Math.max(self.performance.now(), p.loading.first), e = d.responseType === "arraybuffer" ? (l = T.response).byteLength : (l = T.responseText).length, p.loaded = p.total = e, !this.callbacks)
                return;
              var s = this.callbacks.onProgress;
              if (s && s(p, d, l, T), !this.callbacks)
                return;
              var n = { url: T.responseURL, data: l };
              this.callbacks.onSuccess(n, p, d, T);
            } else
              p.retry >= E.maxRetry || v >= 400 && v < 499 ? (R.logger.error(v + " while loading " + d.url), this.callbacks.onError({ code: v, text: T.statusText }, d, T)) : (R.logger.warn(v + " while loading " + d.url + ", retrying in " + this.retryDelay + "..."), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, E.maxRetryDelay), p.retry++);
          } else
            self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), E.timeout);
      }
    }, D.loadtimeout = function() {
      R.logger.warn("timeout while loading " + this.context.url);
      var d = this.callbacks;
      d && (this.abortInternal(), d.onTimeout(this.stats, this.context, this.loader));
    }, D.loadprogress = function(d) {
      var T = this.stats;
      T.loaded = d.loaded, d.lengthComputable && (T.total = d.total);
    }, D.getCacheAge = function() {
      var d = null;
      if (this.loader && A.test(this.loader.getAllResponseHeaders())) {
        var T = this.loader.getResponseHeader("age");
        d = T ? parseFloat(T) : null;
      }
      return d;
    }, C;
  }();
  w.default = k;
} }).default);
var Qt = Ie(ge.exports);
const Ce = { name: "d-icon" }, pt = Object.assign(Ce, { props: { icon: String, size: [Number, String] }, setup: function(B) {
  const w = B, f = xt(() => ({ fontSize: /^\d+$/.test(w.size) ? w.size + "px" : w.size }));
  return (R, S) => ($(), Z("i", { class: Ct(["d-icon iconfont", B.icon]), style: wt(K(f)) }, null, 6));
} });
pt.__scopeId = "data-v-0c690e66";
Pt("data-v-4cb76d59");
const we = { class: "d-player-top" }, Oe = { class: "top-title" }, xe = { class: "top-title" };
Ft();
const Pe = { props: { title: { default: "" } }, setup(B) {
  Date.prototype.format = function(R) {
    let S = { "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds() };
    for (var A in S)
      new RegExp("(" + A + ")").test(R) && (R = R.replace(RegExp.$1, RegExp.$1.length == 1 ? S[A] : ("00" + S[A]).substr(("" + S[A]).length)));
    return R;
  };
  let w = Dt("00:00:00");
  w.value = new Date().format("hh:mm:ss");
  let f = null;
  return f = setInterval(() => {
    w.value = new Date().format("hh:mm:ss");
  }, 1e3), ue(() => {
    clearInterval(f);
  }), (R, S) => ($(), Z("div", we, [H("p", Oe, st(B.title || ""), 1), H("p", xe, st(K(w)), 1)]));
}, __scopeId: "data-v-4cb76d59" };
Pt("data-v-ac2469ec");
const Fe = { class: "d-status" }, Me = { class: "d-flex-center" }, Ne = { class: "d-flex-center" }, Be = Tt("5X速播放中 ");
Ft();
var ve = Mt({ props: ["state"], setup: (B) => (w, f) => ht(($(), Z("div", Fe, [ht(H("li", Me, [et(pt, { size: "18", class: "d-status-icon", icon: "icon-volume-" + (B.state.volume == 0 ? "mute" : B.state.volume > 0.5 ? "up" : "down") }, null, 8, ["icon"]), Tt(" " + st(~~(100 * B.state.volume)) + "% ", 1)], 512), [[ft, B.state.handleType == "volume"]]), ht(H("li", Ne, [et(pt, { size: "12", icon: "icon-play" }), et(pt, { size: "12", icon: "icon-play", style: { "margin-right": "5px" } }), Be], 512), [[ft, B.state.handleType == "playbackRate" || B.state.isMultiplesPlay]])], 512)), [[ft, B.state.handleType || B.state.isMultiplesPlay]]) });
ve.__scopeId = "data-v-ac2469ec", Pt("data-v-385f7870");
const Ue = ["checked", "true-value", "false-value"], Ge = H("span", { class: "d-switch_action" }, null, -1);
Ft();
var qt = Mt({ props: { modelValue: { type: [Number, String, Boolean] }, width: { type: String, default: "40px" }, trueValue: { type: [Number, String, Boolean], default: !0 }, falseValue: { type: [Number, String, Boolean], default: !0 }, activeColor: { type: [String], default: "#409EFF" } }, emits: ["update:modelValue", "change"], setup(B, { emit: w }) {
  const f = B;
  ie((k) => ({ "014e5dc0": B.width, e4e32852: B.activeColor }));
  const R = Dt(null), S = xt(() => f.modelValue === f.trueValue), A = () => {
    de(() => {
      const k = R.value.checked;
      w("update:modelValue", k), w("change", k);
    });
  };
  return (k, C) => ($(), Z("div", { class: Ct(["d-switch", { "is-checked": K(S) }]) }, [H("input", { class: "d-switch__input", ref: R, type: "checkbox", checked: K(S), onChange: A, "true-value": B.trueValue, "false-value": B.falseValue }, null, 40, Ue), Ge], 2));
} });
qt.__scopeId = "data-v-385f7870", Pt("data-v-b2384226");
const je = { key: 0 }, Ke = H("i", { class: "rotating iconfont icon-loading f50" }, null, -1), Ve = [H("i", { class: "rotating iconfont icon-loading f50" }, null, -1), H("p", null, "正在缓冲...", -1)], He = [H("i", { class: "iconfont icon-replay f24 mr5" }, null, -1), Tt("重新播放 ")], We = [H("i", { class: "iconfont icon-replay f24 mr5" }, null, -1), Tt("请求错误 ")];
Ft();
var pe = Mt({ props: { loadType: String, text: { type: String, default: "" } }, setup(B) {
  const w = B, { proxy: f } = Te(), R = ["loadstart", "waiting", "ended", "error", "stalled"], S = () => {
    f.$parent.play();
  }, A = xt(() => {
    let k = "background: rgba(0, 0, 0, .1);z-index:1";
    return w.loadType == "loadstart" && (k = "background: rgba(0, 0, 0, 1);;z-index:3"), k;
  });
  return (k, C) => ht(($(), Z("div", { class: "d-loading", style: wt(K(A)) }, [H("div", null, [B.loadType == "loadstart" ? ($(), Z("span", je, [Ke, H("p", null, st(B.text), 1)])) : ut("", !0), ht(H("span", null, Ve, 512), [[ft, B.loadType == "waiting"]]), ht(H("span", null, [H("p", { onClick: S, class: "d-flex-x d-pointer" }, He)], 512), [[ft, B.loadType == "ended"]]), ht(H("span", null, [H("p", { onClick: S, class: "d-flex-x d-pointer" }, We)], 512), [[ft, B.loadType == "error" || B.loadType == "stalled"]])])], 4)), [[ft, R.includes(B.loadType)]]);
} });
pe.__scopeId = "data-v-b2384226";
const Ot = function(B, w, f, R = !1) {
  B && w && f && B.addEventListener(w, f, R);
}, ct = function(B, w, f, R = !1) {
  B && w && f && B.removeEventListener(w, f, R);
};
Pt("data-v-5a794390");
const Ye = ["onMousedown"];
Ft();
var jt = Mt(re(ee({}, { name: "DSlider" }), { props: { modelValue: { required: !0, type: Number, default: 0 }, disabled: { type: Boolean, default: !1 }, vertical: { type: Boolean, default: !1 }, hover: { type: Boolean, default: !0 }, hoverText: { type: String, default: "" }, preload: { type: Number, default: 0 }, size: { type: String, default: "10px" } }, emits: ["update:modelValue", "change", "onMousemove"], setup: function(B, { emit: w }) {
  const f = B;
  ie((e) => ({ "5242b67b": B.size }));
  const R = Dt(null), S = Dt(null), A = Xt({ dragging: !1, hoverPosition: 0, hoverTipsLeft: "50%" }), k = xt(() => {
    let e = f.modelValue < 0 ? 0 : f.modelValue > 1 ? 1 : f.modelValue;
    return f.vertical ? `height:${100 * e}%` : `width:${100 * e}%`;
  }), C = xt(() => {
    let e = f.preload < 0 ? 0 : f.preload > 1 ? 1 : f.preload;
    return f.vertical ? `height:${100 * e}%` : `width:${100 * e}%`;
  }), D = xt(() => {
    let e = A.hoverPosition < 0 ? 0 : A.hoverPosition > 1 ? 1 : A.hoverPosition;
    return f.vertical ? `bottom:${100 * e}%` : `left:${100 * e}%`;
  }), d = (e) => {
    e.preventDefault();
  }, T = (e) => {
    f.disabled || (e.preventDefault(), A.dragging = !0, m(e), Ot(window, "mousemove", v), Ot(window, "touchmove", v), Ot(window, "mouseup", l), Ot(window, "touchend", l));
  }, p = (e) => {
    if (!f.hover)
      return;
    let s = E(e);
    if (w("onMousemove", e, s), A.hoverPosition = s, f.vertical)
      return;
    let n = R.value, r = S.value.clientWidth / 2, a = e.clientX - n.getBoundingClientRect().left;
    a < r ? A.hoverTipsLeft = r - a + "px" : n.clientWidth - a < r ? A.hoverTipsLeft = n.clientWidth - a - r + "px" : A.hoverTipsLeft = "50%";
  }, m = (e) => {
    let s = E(e);
    w("update:modelValue", s), w("change", e, s);
  }, E = (e) => {
    let s = R.value, n = 0;
    if (f.vertical) {
      let r = s.clientHeight;
      n = (s.getBoundingClientRect().bottom - e.clientY) / r;
    } else
      n = (e.clientX - s.getBoundingClientRect().left) / s.clientWidth;
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }, v = (e) => {
    m(e);
  }, l = (e) => {
    A.dragging && (ct(window, "mousemove", v), ct(window, "touchmove", v), ct(window, "mouseup", l), ct(window, "touchend", l), ct(window, "contextmenu", l), setTimeout(() => {
      A.dragging = !1;
    }, 0));
  };
  return (e, s) => ($(), Z("div", { ref: R, class: Ct(["d-slider", { "is-vertical": f.vertical }]), onMousedown: Se(T, ["stop"]), onContextmenu: d }, [H("div", { class: "d-slider__runway", onMousemove: p }, [ht(H("div", { class: "d-slider__cursor", style: wt(K(D)) }, [ht(H("div", { class: "d-slider__tips", ref: S, style: wt({ left: K(A).hoverTipsLeft }) }, st(f.hoverText), 5), [[ft, f.hoverText]])], 4), [[ft, f.hover]]), H("div", { class: "d-slider__preload", style: wt(K(C)) }, null, 4), H("div", { class: "d-slider__bar", style: wt(K(k)) }, null, 4)], 32)], 42, Ye));
} }));
jt.__scopeId = "data-v-5a794390";
Pt("data-v-570fa0d1");
const qe = { key: 0, class: "d-player-dialog" }, Xe = { class: "d-player-dialog-body" }, ze = { class: "d-player-dialog-title" }, $e = { class: "d-player-hotkey-panel" }, Qe = { class: "d-player-filter-panel" }, Ze = { class: "d-player-filter-panel-item" }, Je = H("span", null, "饱和度", -1), tr = { class: "d-player-filter-panel-item" }, er = H("span", null, "亮度", -1), rr = { class: "d-player-filter-panel-item" }, ir = H("span", null, "对比度", -1), nr = { key: 0, class: "d-player-contextmenu" }, ar = ["dplayerKeyCode"], sr = H("input", { class: "d-player-copyText" }, null, -1);
Ft();
var me = Mt({ setup(B) {
  const w = Xt({ show: !1, dialogType: "", dialogTitle: "", version: "1.3.1-beta.6", mouseX: 0, mouseY: 0 }), f = [{ label: "视频色彩调整", key: "filter" }, { label: "快捷键说明", key: "hotkey" }, { label: "复制视频网址", key: "copy" }, { label: "版本：1.3.1-beta.6", key: "version" }], R = [{ key: "Space", label: "播放/暂停" }, { key: "→", label: "单次快进10s，长按5倍速播放" }, { key: "←", label: "快退5s" }, { key: "↑", label: "音量增加10%" }, { key: "↓", label: "音量增加降低10%" }, { key: "Esc", label: "退出全屏/退出网页全屏" }, { key: "F", label: "全屏/退出全屏" }], S = Xt({ saturate: 0.392, brightness: 0.392, contrast: 0.392 }), A = xt(() => ({ left: w.mouseX + "px", top: w.mouseY + "px" }));
  ce(S, (T) => {
    let p = document.querySelector("#dPlayerVideo"), m = (2.55 * T.saturate).toFixed(2), E = (2.55 * T.brightness).toFixed(2), v = (2.55 * T.contrast).toFixed(2);
    p.style.filter = `saturate(${m}) brightness(${E}) contrast(${v})`;
  });
  const k = () => {
    S.saturate = 0.392, S.brightness = 0.392, S.contrast = 0.392;
  }, C = (T) => {
    T.key == "Escape" && d(0);
  }, D = (T) => {
    T.preventDefault(), Ot(window, "keydown", C), Ot(window, "click", d);
    let p = document.querySelector("#refPlayerWrap"), m = p.clientWidth;
    p.clientHeight, w.mouseX = T.clientX - p.getBoundingClientRect().left, m - w.mouseX < 130 && (w.mouseX = w.mouseX + (m - w.mouseX - 130)), w.mouseY = T.clientY - p.getBoundingClientRect().top, w.show = !0;
  }, d = (T) => {
    let p = T.path[0].tagName == "LI", m = T.path[0].attributes.dplayerKeyCode && T.path[0].attributes.dplayerKeyCode.value, E = f.map((v) => v.key);
    if (p && E.includes(m))
      if (w.dialogTitle = T.path[0].innerText, w.dialogType = m, m == "copy") {
        let v = document.querySelector(".d-player-copyText");
        v.value = window.location.href, v.select(), document.execCommand("copy"), w.dialogType = "";
      } else
        m == "version" && (w.dialogType = "");
    w.show = !1, ct(window, "keydown", C), ct(window, "click", d);
  };
  return he(() => {
    let T = document.querySelector("#refPlayerWrap");
    ct(window, "keydown", C), ct(window, "click", d), ct(T, "contextmenu", D), Ot(T, "contextmenu", D);
  }), ue(() => {
    let T = document.querySelector("#refPlayerWrap");
    ct(window, "keydown", C), ct(window, "click", d), ct(T, "contextmenu", D);
  }), (T, p) => ($(), Z("div", null, [et(Jt, { name: "d-fade-in" }, { default: te(() => [K(w).dialogType ? ($(), Z("div", qe, [H("div", Xe, [H("h5", ze, [Tt(st(K(w).dialogTitle) + " ", 1), H("i", { onClick: p[0] || (p[0] = (m) => K(w).dialogType = !1), class: "icon icon-close" }, "X")]), ht(H("ul", $e, [($(), Z(zt, null, $t(R, (m) => H("li", { class: "d-player-hotkey-panel-item", key: m.key }, [H("span", null, st(m.key), 1), H("span", null, st(m.label), 1)])), 64))], 512), [[ft, K(w).dialogType == "hotkey"]]), ht(H("ul", Qe, [H("li", Ze, [Je, et(jt, { class: "filter-panel-slider", size: "5px", modelValue: K(S).saturate, "onUpdate:modelValue": p[1] || (p[1] = (m) => K(S).saturate = m) }, null, 8, ["modelValue"]), H("span", null, st(Math.round(255 * K(S).saturate)), 1)]), H("li", tr, [er, et(jt, { class: "filter-panel-slider", size: "5px", modelValue: K(S).brightness, "onUpdate:modelValue": p[2] || (p[2] = (m) => K(S).brightness = m) }, null, 8, ["modelValue"]), H("span", null, st(Math.round(255 * K(S).brightness)), 1)]), H("li", rr, [ir, et(jt, { class: "filter-panel-slider", size: "5px", modelValue: K(S).contrast, "onUpdate:modelValue": p[3] || (p[3] = (m) => K(S).contrast = m) }, null, 8, ["modelValue"]), H("span", null, st(Math.round(255 * K(S).contrast)), 1)]), H("span", { onClick: k, title: "重置", "aria-label": "重置", class: "d-player-filter-reset" }, "重置")], 512), [[ft, K(w).dialogType == "filter"]])])])) : ut("", !0)]), _: 1 }), K(w).show ? ($(), Z("div", nr, [H("ul", { class: "d-player-contextmenu-body", style: wt(K(A)) }, [($(), Z(zt, null, $t(f, (m) => H("li", { dplayerKeyCode: m.key, key: m.key }, st(m.label), 9, ar)), 64))], 4), sr])) : ut("", !0)]));
} });
me.__scopeId = "data-v-570fa0d1";
const Zt = (B) => {
  let w = ~~(B / 3600), f = ~~(B % 3600 / 60), R = ~~(B % 60);
  return w = w < 10 ? "0" + w : w, f = f < 10 ? "0" + f : f, R = R < 10 ? "0" + R : R, `${w}:${f}:${R}`;
}, Wt = "ontouchstart" in window, le = ["loadstart", "play", "pause", "playing", "seeking", "seeked", "waiting", "durationchange", "progress", "canplay", "timeupdate", "ended", "error", "stalled"], or = { width: { type: String, default: "800px" }, height: { type: String, default: "450px" }, color: { type: String, default: "#409eff" }, src: { required: !0, type: String, default: "" }, title: { type: String, default: "" }, type: { type: String, default: "video/mp4" }, poster: { type: String, default: "" }, webFullScreen: { type: Boolean, default: !1 }, speed: { type: Boolean, default: !0 }, currentTime: { type: Number, default: 0 }, playsinline: { type: Boolean, default: !1 }, muted: { type: Boolean, default: !1 }, speedRate: { type: Array, default: () => ["2.0", "1.5", "1.25", "1.0", "0.75", "0.5"] }, autoPlay: { type: Boolean, default: !1 }, loop: { type: Boolean, default: !1 }, mirror: { type: Boolean, default: !1 }, ligthOff: { type: Boolean, default: !1 }, volume: { type: [String, Number], default: 0.3 }, control: { type: Boolean, default: !0 }, controlBtns: { type: Array, default: ["audioTrack", "quality", "speedRate", "volume", "setting", "pip", "pageFullScreen", "fullScreen"] }, preload: { type: String, default: "auto" } };
Pt("data-v-01791e9e");
const lr = { class: "d-player-video", id: "dPlayerVideo" }, ur = ["controls", "webkit-playsinline", "playsinline", "volume", "muted", "loop", "preload", "src", "poster"], dr = { class: "d-player-lightoff" }, cr = { key: 1, class: "d-player-state" }, hr = { class: "d-play-btn" }, fr = ["onKeyup", "onKeydown"], gr = { class: "d-control-progress" }, vr = { class: "d-tool-bar" }, pr = { key: 0, class: "d-tool-item d-tool-time audioTrack-btn" }, mr = H("span", { style: { margin: "0 3px" } }, "/", -1), yr = { class: "total-time" }, Er = { class: "d-tool-bar" }, Tr = { key: 0, class: "d-tool-item quality-btn" }, Sr = { class: "d-tool-item-main" }, br = { class: "speed-main", style: { "text-align": "center" } }, Lr = ["onClick"], Ar = { key: 1, class: "d-tool-item speedRate-btn" }, Dr = { class: "d-tool-item-main" }, kr = { class: "speed-main" }, Rr = ["onClick"], _r = { key: 2, class: "d-tool-item volume-btn" }, Ir = { class: "d-tool-item-main volume-box", style: { width: "52px" } }, Cr = { class: "volume-text-size" }, wr = { key: 3, class: "d-tool-item setting-btn" }, Or = { class: "d-tool-item-main" }, xr = { class: "speed-main" }, Pr = Tt(" 镜像画面 "), Fr = Tt(" 循环播放 "), Mr = Tt(" 关灯模式 "), Nr = H("div", { class: "d-tool-item-main" }, "画中画", -1), Br = H("div", { class: "d-tool-item-main" }, "网页全屏", -1), Ur = H("div", { class: "d-tool-item-main" }, "全屏", -1);
Ft();
var Yt = Mt(re(ee({}, { name: "vue3VideoPlay", inheritAttrs: !1 }), { props: or, emits: [...le, "mirrorChange", "loopChange", "lightOffChange"], setup: function(B, { expose: w, emit: f }) {
  const R = B;
  ie((O) => ({ "51d4439c": K(E), "77e758a6": O.width, b8a1afc0: O.height }));
  const S = new Qt({ fragLoadingTimeOut: 2e3 }), A = Dt(null), k = Dt(null), C = Dt(null), D = Dt(null), d = Xt(re(ee({ dVideo: null }, R), { muted: R.muted, playBtnState: R.autoPlay ? "pause" : "play", loadStateType: "loadstart", fullScreen: !1, handleType: "", currentTime: "00:00:00", preloadBar: 0, totalTime: "00:00:00", isVideoHovering: !0, speedActive: "1.0", playProgress: 0, isMultiplesPlay: !1, longPressTimeout: null, progressCursorTime: "00:00:00", qualityLevels: [], currentLevel: 0 })), T = (...O) => (x) => O.reverse().reduce((P, M) => M(P), x), p = le.reduce((O, x) => {
    var P;
    return O[`on${P = x, P.charAt(0).toUpperCase() + P.slice(1)}`] = (M) => {
      d.loadStateType = x, f(x, M);
    }, O;
  }, {});
  p.onCanplay = T(p.onCanplay, () => {
    d.playBtnState != "play" && d.dVideo.play(), d.autoPlay && (d.dVideo.play(), d.playBtnState = "pause");
  }), p.onEnded = T(p.onEnded, () => {
    d.playBtnState = "replay";
  }), p.onDurationchange = (O) => {
    f("durationchange", O), R.currentTime != 0 && (d.dVideo.currentTime = R.currentTime), p.onTimeupdate(O);
  }, p.onProgress = (O) => {
    console.log("缓冲中..."), f("progress", O);
    let x = O.target.duration, P = O.target.buffered, M = O.target.buffered.length && O.target.buffered.end(P - 1);
    d.preloadBar = M / x;
  }, p.onTimeupdate = (O) => {
    f("timeupdate", O);
    let x = O.duration || O.target.duration || 0, P = O.currentTime || O.target.currentTime;
    d.playProgress = P / x, d.currentTime = Zt(P), d.totalTime = Zt(x);
  }, p.onError = T(p.onError, () => {
    d.playBtnState = "replay";
  });
  let m = be();
  for (let O in m)
    p[O] = m[O];
  const E = (v = d.color, `${parseInt("0x" + v.slice(1, 3))},${parseInt("0x" + v.slice(3, 5))},${parseInt("0x" + v.slice(5, 7))}`);
  var v;
  const l = oe(500, () => {
    d.handleType = "";
  }), e = (O) => {
    O.preventDefault(), O.code == "ArrowUp" ? d.volume = d.volume + 0.1 > 1 ? 1 : d.volume + 0.1 : d.volume = d.volume - 0.1 < 0 ? 0 : d.volume - 0.1, d.muted = !1, d.handleType = "volume", l();
  }, s = (O) => {
    R.speed && (d.dVideo.currentTime = d.dVideo.currentTime < 10 ? 0.1 : d.dVideo.currentTime - 10, p.onTimeupdate(d.dVideo), a());
  }, n = (O) => {
    O.preventDefault();
    let x = O.type;
    if (O.key == "ArrowRight") {
      if (a(), x == "keyup") {
        if (clearTimeout(d.longPressTimeout), !R.speed && !d.longPressTimeout)
          return;
        d.isMultiplesPlay ? (d.dVideo.playbackRate = d.speedActive, d.isMultiplesPlay = !1) : (d.dVideo.currentTime = d.dVideo.currentTime + 10, p.onTimeupdate(d.dVideo));
      } else if (x == "keydown") {
        if (!R.speed)
          return;
        d.isMultiplesPlay && clearTimeout(d.longPressTimeout), d.longPressTimeout = setTimeout(() => {
          d.isMultiplesPlay = !0, d.dVideo.playbackRate = 5, d.handleType = "playbackRate", l();
        }, 500);
      }
    }
  }, r = () => {
    Wt || D.value.focus();
  }, a = () => {
    d.loadStateType = "play", d.dVideo.play().catch(() => {
      setTimeout(() => {
        d.playBtnState = "replay", d.loadStateType = "error";
      }, 500);
    }), d.playBtnState = "pause";
  }, i = () => {
    d.dVideo.pause(), d.playBtnState = "play";
  }, h = (O) => {
    O && O.preventDefault(), d.playBtnState == "play" || d.playBtnState == "replay" ? a() : d.playBtnState == "pause" && i();
  }, g = () => {
    d.muted = !d.muted, d.volume == 0 && (d.volume = 0.05);
  }, c = (O, x) => {
    let P = d.dVideo.duration || d.dVideo.target.duration;
    d.dVideo.currentTime = P * x, d.playBtnState == "play" && (d.dVideo.play(), d.playBtnState = "pause");
  }, y = (O, x) => {
    d.progressCursorTime = Zt(d.dVideo.duration * x);
  }, u = oe(2500, () => {
    d.isVideoHovering = !1;
  }), t = (O) => {
    d.isVideoHovering = !0, u();
  }, o = (O) => {
    f("mirrorChange", O, d.dVideo);
  }, b = (O) => {
    f("loopChange", O, d.dVideo);
  }, _ = (O) => {
    f("lightOffChange", O, d.dVideo);
  }, L = () => {
    var O;
    O = d.dVideo, document.pictureInPictureElement ? document.exitPictureInPicture().catch((x) => {
      console.log(x, "Video failed to leave Picture-in-Picture mode.");
    }) : O.requestPictureInPicture().catch((x) => {
      console.log(x, "Video failed to enter Picture-in-Picture mode.");
    });
  }, I = () => {
    d.fullScreen = ((O) => {
      let x = document, P = x.webkitIsFullScreen || x.fullscreen;
      return P ? (document.exitFullscreen || x.webkitExitFullScreen).call(x) : (O.requestFullscreen || O.webkitRequestFullScreen).call(O), !P;
    })(A.value);
  };
  return ce(() => R.src, () => {
    de(() => {
      d.dVideo.canPlayType(R.type) || d.dVideo.canPlayType("application/vnd.apple.mpegurl") ? d.muted = R.autoPlay : Qt.isSupported() && (S.detachMedia(), S.attachMedia(d.dVideo), S.on(Qt.Events.MEDIA_ATTACHED, () => {
        S.loadSource(R.src), S.on("hlsManifestParsed", (O, x) => {
          console.log(x), d.currentLevel = x.level, d.qualityLevels = x.levels || [];
        });
      }), S.on("hlsLevelSwitching", (O, x) => {
        console.log(x), console.log("LEVEL_SWITCHING");
      }), S.on("hlsLevelSwitched", (O, x) => {
        d.currentLevel = x.level, console.log("LEVEL_SWITCHED");
      }));
    });
  }, { immediate: !0 }), he(() => {
    d.dVideo = k, r();
  }), w({ play: a, pause: i, togglePlay: h }), (O, x) => ($(), Z("div", { ref: A, id: "refPlayerWrap", class: Ct(["d-player-wrap", { "web-full-screen": K(d).webFullScreen, "is-lightoff": K(d).lightOff, "d-player-wrap-hover": K(d).playBtnState == "play" || K(d).isVideoHovering }]), onMousemove: t }, [H("div", lr, [H("video", Le({ ref: k, class: ["d-player-video-main", { "video-mirror": K(d).mirror }], id: "dPlayerVideoMain", controls: !(!K(Wt) || !K(d).speed), "webkit-playsinline": R.playsinline, playsinline: R.playsinline }, K(p), { volume: K(d).volume, muted: K(d).muted, loop: K(d).loop, preload: O.preload, width: "100%", height: "100%", src: R.src, poster: R.poster }), "您的浏览器不支持Video标签。", 16, ur)]), et(Jt, { name: "d-fade-in" }, { default: te(() => [ht(H("div", dr, null, 512), [[ft, K(d).lightOff]])]), _: 1 }), K(d).fullScreen ? ($(), fe(Pe, { key: 0, title: R.title }, null, 8, ["title"])) : ut("", !0), K(Wt) ? ut("", !0) : ($(), Z("div", cr, [et(Jt, { name: "d-scale-out" }, { default: te(() => [ht(H("div", hr, [et(pt, { icon: "icon-play", size: 40 })], 512), [[ft, K(d).playBtnState == "play"]])]), _: 1 }), et(ve, { state: K(d) }, null, 8, ["state"])])), K(Wt) ? ut("", !0) : ($(), Z("input", { key: 2, type: "input", readonly: "readonly", ref: D, onDblclick: I, onKeyup: [Ht(I, ["f"]), x[0] || (x[0] = Ht((P) => K(d).webFullScreen = !1, ["esc"])), n], onClick: h, onKeydown: [Ht(h, ["space"]), Ht(s, ["arrow-left"]), Ht(e, ["arrow-up", "arrow-down"]), n], class: "d-player-input", maxlength: "0" }, null, 40, fr)), et(pe, { loadType: K(d).loadStateType }, null, 8, ["loadType"]), et(me), !K(Wt) && K(d).control ? ($(), Z("div", { key: 3, class: "d-player-control", ref: C }, [H("div", gr, [et(jt, { class: "d-progress-bar", onOnMousemove: y, onChange: c, disabled: !K(d).speed, hoverText: K(d).progressCursorTime, modelValue: K(d).playProgress, "onUpdate:modelValue": x[1] || (x[1] = (P) => K(d).playProgress = P), preload: K(d).preloadBar }, null, 8, ["disabled", "hoverText", "modelValue", "preload"])]), H("div", { class: "d-control-tool", onClick: r }, [H("div", vr, [H("div", { class: "d-tool-item", onClick: h }, [et(pt, { size: "24", icon: `icon-${K(d).playBtnState}` }, null, 8, ["icon"])]), R.controlBtns.includes("audioTrack") ? ($(), Z("div", pr, [H("span", null, st(K(d).currentTime), 1), mr, H("span", yr, st(K(d).totalTime), 1)])) : ut("", !0)]), H("div", Er, [K(d).qualityLevels.length && R.controlBtns.includes("quality") ? ($(), Z("div", Tr, [Tt(st(K(d).qualityLevels.length && (K(d).qualityLevels[K(d).currentLevel] || {}).height) + "P ", 1), H("div", Sr, [H("ul", br, [($(!0), Z(zt, null, $t(K(d).qualityLevels, (P, M) => ($(), Z("li", { class: Ct({ "speed-active": K(d).currentLevel == M }), onClick: (F) => ((N, U) => {
    S.currentLevel = U, d.currentLevel = U;
  })(0, M), key: P }, st(P.height) + "P", 11, Lr))), 128))])])])) : ut("", !0), R.controlBtns.includes("speedRate") ? ($(), Z("div", Ar, [Tt(st(K(d).speedActive == "1.0" ? "倍速" : K(d).speedActive + "x") + " ", 1), H("div", Dr, [H("ul", kr, [($(!0), Z(zt, null, $t(K(d).speedRate, (P) => ($(), Z("li", { class: Ct({ "speed-active": K(d).speedActive == P }), onClick: (M) => ((F) => {
    d.speedActive = F, d.dVideo.playbackRate = F;
  })(P), key: P }, st(P) + "x", 11, Rr))), 128))])])])) : ut("", !0), R.controlBtns.includes("volume") ? ($(), Z("div", _r, [H("div", Ir, [H("div", { class: Ct(["volume-main", { "is-muted": K(d).muted }]) }, [H("span", Cr, st(K(d).muted ? 0 : ~~(100 * K(d).volume)) + "%", 1), et(jt, { onChange: x[2] || (x[2] = (P) => K(d).muted = !1), hover: !1, size: "5px", vertical: !0, modelValue: K(d).volume, "onUpdate:modelValue": x[3] || (x[3] = (P) => K(d).volume = P) }, null, 8, ["modelValue"])], 2)]), H("span", { onClick: g, style: { display: "flex" } }, [et(pt, { size: "20", icon: "icon-volume-" + (K(d).volume == 0 || K(d).muted ? "mute" : K(d).volume > 0.5 ? "up" : "down") }, null, 8, ["icon"])])])) : ut("", !0), R.controlBtns.includes("setting") ? ($(), Z("div", wr, [et(pt, { size: "20", class: "rotateHover", icon: "icon-settings" }), H("div", Or, [H("ul", xr, [H("li", null, [Pr, et(qt, { onChange: o, modelValue: K(d).mirror, "onUpdate:modelValue": x[4] || (x[4] = (P) => K(d).mirror = P) }, null, 8, ["modelValue"])]), H("li", null, [Fr, et(qt, { onChange: b, modelValue: K(d).loop, "onUpdate:modelValue": x[5] || (x[5] = (P) => K(d).loop = P) }, null, 8, ["modelValue"])]), H("li", null, [Mr, et(qt, { onChange: _, modelValue: K(d).lightOff, "onUpdate:modelValue": x[6] || (x[6] = (P) => K(d).lightOff = P) }, null, 8, ["modelValue"])])])])])) : ut("", !0), R.controlBtns.includes("pip") ? ($(), Z("div", { key: 4, class: "d-tool-item pip-btn", onClick: L }, [et(pt, { size: "20", icon: "icon-pip" }), Nr])) : ut("", !0), R.controlBtns.includes("pageFullScreen") ? ($(), Z("div", { key: 5, class: "d-tool-item pip-btn", onClick: x[7] || (x[7] = (P) => K(d).webFullScreen = !K(d).webFullScreen) }, [et(pt, { size: "20", icon: "icon-web-screen" }), Br])) : ut("", !0), R.controlBtns.includes("fullScreen") ? ($(), Z("div", { key: 6, class: "d-tool-item fullScreen-btn", onClick: I }, [Ur, et(pt, { size: "20", icon: "icon-screen" })])) : ut("", !0)])])], 512)) : ut("", !0)], 34));
} }));
function Gr(B) {
  B.component(Yt.name, Yt);
}
Yt.__scopeId = "data-v-01791e9e", Yt.install = Gr;
const Kr = /* @__PURE__ */ Mt({
  __name: "index",
  setup(B) {
    return (w, f) => ($(), fe(K(Yt)));
  }
});
export {
  Kr as default
};
