import { defineComponent as j, ref as f, computed as x, onMounted as q, resolveComponent as r, openBlock as m, createBlock as y, withCtx as l, createVNode as p, createElementVNode as h, normalizeClass as K, unref as n, createElementBlock as k, toDisplayString as G, createCommentVNode as H, Fragment as J, renderList as O, pushScopeId as P, popScopeId as Q } from "vue";
import { _ as T } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as W } from "vue-router";
import { u as X, h as Y, hz as Z, cA as S, j as $, k as b, m as w, hK as ee, a as te } from "./core-shared-c6ad4e77.js";
import oe from "./menu-item-b85341b9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const C = (d) => (P("data-v-61177df1"), d = d(), Q(), d), se = /* @__PURE__ */ C(() => /* @__PURE__ */ h("img", {
  class: "logo__image",
  src: T,
  alt: ""
}, null, -1)), ae = {
  key: 0,
  class: "logo__name"
}, ne = /* @__PURE__ */ C(() => /* @__PURE__ */ h("div", { class: "h-[48px]" }, null, -1)), re = /* @__PURE__ */ j({
  __name: "side",
  setup(d) {
    const c = X(), u = Y(), le = W(), s = u.siteInfo, { menuActive: A } = Z(), L = u.routers, I = u.addonIndexRoute, a = f([]), _ = {}, E = x(() => {
      var t;
      const e = c.website;
      return ((t = u.siteInfo) == null ? void 0 : t.icon) || (e == null ? void 0 : e.icon);
    }), R = x(() => {
      var t;
      const e = c.website;
      return ((t = u.siteInfo) == null ? void 0 : t.site_name) || (e == null ? void 0 : e.site_name) || "";
    }), g = f([]), M = async () => {
      const e = await b();
      g.value = e.data, w.set({ key: "defaultAppList", data: g.value });
    }, v = f([]), N = async () => {
      const e = await ee();
      v.value = e.data.list, w.set({ key: "specialAppList", data: v.value });
    };
    if (q(() => {
      M(), N();
    }), L.forEach((e, t) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && e.name != "sign" && e.name != "verify" && (e.children && e.children.length && (e.name = S(e.children)), a.value.push(e)) : e.meta.addon != "" && (s == null ? void 0 : s.apps.length) == 1 && (s == null ? void 0 : s.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((o) => {
        o.original_name = o.name, o.children && o.children.length && (o.name = S(o.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : _[e.meta.addon] = e, a.value.sort((o, i) => o.meta.sort && i.meta.sort ? i.meta.sort - o.meta.sort : o.meta.sort ? -1 : i.meta.sort ? 1 : 0);
    }), (s == null ? void 0 : s.apps.length) > 1) {
      const e = [];
      s == null || s.apps.forEach((t) => {
        _[t.key] && (_[t.key].name = I[t.key], e.push(_[t.key]));
      }), a.value.unshift(...e), a.value.sort((t, o) => t.meta.sort && o.meta.sort ? o.meta.sort - t.meta.sort : t.meta.sort ? -1 : o.meta.sort ? 1 : 0);
    }
    return (e, t) => {
      const o = r("el-image"), i = r("el-header"), V = r("el-menu"), B = r("el-scrollbar"), z = r("el-main"), D = r("el-container");
      return m(), y(D, { class: "w-[200px] h-screen flex flex-col" }, {
        default: l(() => [
          p(i, { class: "logo-wrap flex items-center h-[64px]" }, {
            default: l(() => [
              h("div", {
                class: K(["logo flex items-center min-w-0 h-[64px]", { "is-collapse": n(c).menuIsCollapse }])
              }, [
                p(o, {
                  class: "logo__image",
                  src: n($)(n(E)),
                  fit: "contain"
                }, {
                  error: l(() => [
                    se
                  ]),
                  _: 1
                }, 8, ["src"]),
                n(c).menuIsCollapse ? H("", !0) : (m(), k("span", ae, G(n(R)), 1))
              ], 2)
            ]),
            _: 1
          }),
          p(z, { class: "menu-wrap" }, {
            default: l(() => [
              p(B, null, {
                default: l(() => [
                  p(V, {
                    "default-active": n(A),
                    router: !1,
                    "background-color": "--side-dark-color",
                    "text-color": "#fff",
                    "active-text-color": "#fff",
                    "unique-opened": !0,
                    collapse: n(c).menuIsCollapse
                  }, {
                    default: l(() => [
                      (m(!0), k(J, null, O(a.value, (F, U) => (m(), y(oe, {
                        routes: F,
                        key: U
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  ne
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
const ve = /* @__PURE__ */ te(re, [["__scopeId", "data-v-61177df1"]]);
export {
  ve as default
};
