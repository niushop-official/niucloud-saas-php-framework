import { defineComponent as q, ref as m, computed as v, onMounted as z, resolveComponent as r, openBlock as _, createBlock as y, withCtx as l, createVNode as p, createElementVNode as f, normalizeClass as K, unref as n, createElementBlock as x, toDisplayString as G, createCommentVNode as H, Fragment as J, renderList as O, pushScopeId as P, popScopeId as Q } from "vue";
import { _ as T } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as W } from "vue-router";
import { u as X, h as Y, cA as S, j as Z, k as $, m as k, hK as b, a as ee } from "./core-shared-c6ad4e77.js";
import te from "./menu-item-fcc21486.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const w = (i) => (P("data-v-6154a1a9"), i = i(), Q(), i), se = /* @__PURE__ */ w(() => /* @__PURE__ */ f("img", {
  class: "logo__image",
  src: T,
  alt: ""
}, null, -1)), oe = {
  key: 0,
  class: "logo__name"
}, ae = /* @__PURE__ */ w(() => /* @__PURE__ */ f("div", { class: "h-[48px]" }, null, -1)), ne = /* @__PURE__ */ q({
  __name: "side",
  setup(i) {
    const c = X(), u = Y(), C = W(), s = u.siteInfo, L = u.routers, I = u.addonIndexRoute, a = m([]), d = {}, A = v(() => {
      var t;
      const e = c.website;
      return ((t = u.siteInfo) == null ? void 0 : t.icon) || (e == null ? void 0 : e.icon);
    }), E = v(() => {
      var t;
      const e = c.website;
      return (e == null ? void 0 : e.site_name) || ((t = u.siteInfo) == null ? void 0 : t.site_name) || "";
    }), h = m([]), R = async () => {
      const e = await $();
      h.value = e.data, k.set({ key: "defaultAppList", data: h.value });
    }, g = m([]), N = async () => {
      const e = await b();
      g.value = e.data.list, k.set({ key: "specialAppList", data: g.value });
    };
    if (z(() => {
      R(), N();
    }), L.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && e.name != "sign" && e.name != "verify" && (e.children && e.children.length && (e.name = S(e.children)), a.value.push(e)) : e.meta.addon != "" && (s == null ? void 0 : s.apps.length) == 1 && (s == null ? void 0 : s.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = S(t.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : d[e.meta.addon] = e, a.value.sort((t, o) => t.meta.sort && o.meta.sort ? o.meta.sort - t.meta.sort : t.meta.sort ? -1 : o.meta.sort ? 1 : 0);
    }), (s == null ? void 0 : s.apps.length) > 1) {
      const e = [];
      s == null || s.apps.forEach((t) => {
        d[t.key] && (d[t.key].name = I[t.key], e.push(d[t.key]));
      }), a.value.unshift(...e), a.value.sort((t, o) => t.meta.sort && o.meta.sort ? o.meta.sort - t.meta.sort : t.meta.sort ? -1 : o.meta.sort ? 1 : 0);
    }
    return (e, t) => {
      const o = r("el-image"), V = r("el-header"), B = r("el-menu"), M = r("el-scrollbar"), D = r("el-main"), F = r("el-container");
      return _(), y(F, { class: "w-[200px] h-screen layout-aside flex flex-col" }, {
        default: l(() => [
          p(V, { class: "logo-wrap flex items-center h-[64px]" }, {
            default: l(() => [
              f("div", {
                class: K(["logo flex items-center min-w-0 h-[64px]", { "is-collapse": n(c).menuIsCollapse }])
              }, [
                p(o, {
                  class: "logo__image",
                  src: n(Z)(n(A)),
                  fit: "contain"
                }, {
                  error: l(() => [
                    se
                  ]),
                  _: 1
                }, 8, ["src"]),
                n(c).menuIsCollapse ? H("", !0) : (_(), x("span", oe, G(n(E)), 1))
              ], 2)
            ]),
            _: 1
          }),
          p(D, { class: "menu-wrap" }, {
            default: l(() => [
              p(M, null, {
                default: l(() => [
                  p(B, {
                    "default-active": n(C).name,
                    router: !0,
                    class: "aside-menu h-full",
                    "unique-opened": !0,
                    collapse: n(c).menuIsCollapse
                  }, {
                    default: l(() => [
                      (_(!0), x(J, null, O(a.value, (U, j) => (_(), y(te, {
                        routes: U,
                        key: j
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  ae
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const he = /* @__PURE__ */ ee(ne, [["__scopeId", "data-v-6154a1a9"]]);
export {
  he as default
};
