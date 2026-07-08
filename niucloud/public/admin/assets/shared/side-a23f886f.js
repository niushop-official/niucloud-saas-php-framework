import { defineComponent as N, ref as h, computed as U, onMounted as b, resolveComponent as a, openBlock as u, createBlock as k, withCtx as r, createVNode as i, unref as _, createElementBlock as g, Fragment as D, renderList as X, pushScopeId as z, popScopeId as G, createElementVNode as f } from "vue";
import { _ as H } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as J } from "vue-router";
import { cm as K, u as O, cq as w, i as P, a as Q, s as S, gX as T, _ as W } from "./core-shared-9b1e55e9.js";
import Y from "./menu-item-cc9042a3.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const x = (d) => (z("data-v-caef4e65"), d = d(), G(), d), Z = {
  key: 0,
  class: "logo flex items-center m-auto h-[64px]"
}, $ = /* @__PURE__ */ x(() => /* @__PURE__ */ f("div", { class: "flex justify-center items-center w-full h-[40px]" }, [
  /* @__PURE__ */ f("img", {
    class: "max-w-[40px]",
    src: H,
    alt: "",
    "object-fit": "contain"
  })
], -1)), ee = {
  key: 1,
  class: "logo flex items-center justify-center h-[64px]"
}, te = /* @__PURE__ */ x(() => /* @__PURE__ */ f("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), oe = [
  te
], se = /* @__PURE__ */ x(() => /* @__PURE__ */ f("div", { class: "h-[48px]" }, null, -1)), ne = /* @__PURE__ */ N({
  __name: "side",
  setup(d) {
    const m = K(), l = O(), L = J(), o = l.siteInfo, j = l.routers, C = l.addonIndexRoute, n = h([]), p = {}, E = U(() => l.siteInfo.logo ? l.siteInfo.logo : m.website.logo), v = h([]), I = async () => {
      const e = await Q();
      v.value = e.data, S.set({ key: "defaultAppList", data: v.value });
    }, y = h([]), R = async () => {
      const e = await T();
      y.value = e.data.list, S.set({ key: "specialAppList", data: y.value });
    };
    if (b(() => {
      I(), R();
    }), j.forEach((e, s) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && e.name != "sign" && e.name != "verify" && (e.children && e.children.length && (e.name = w(e.children)), n.value.push(e)) : e.meta.addon != "" && (o == null ? void 0 : o.apps.length) == 1 && (o == null ? void 0 : o.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = w(t.children));
      }), n.value.unshift(...e.children)) : n.value.unshift(e) : p[e.meta.addon] = e, n.value.sort((t, c) => t.meta.sort && c.meta.sort ? c.meta.sort - t.meta.sort : t.meta.sort ? -1 : c.meta.sort ? 1 : 0);
    }), (o == null ? void 0 : o.apps.length) > 1) {
      const e = [];
      o == null || o.apps.forEach((s) => {
        p[s.key] && (p[s.key].name = C[s.key], e.push(p[s.key]));
      }), n.value.unshift(...e), n.value.sort((s, t) => s.meta.sort && t.meta.sort ? t.meta.sort - s.meta.sort : s.meta.sort ? -1 : t.meta.sort ? 1 : 0);
    }
    return (e, s) => {
      const t = a("el-image"), c = a("el-header"), A = a("el-menu"), B = a("el-scrollbar"), M = a("el-main"), V = a("el-container");
      return u(), k(V, { class: "w-[200px] h-screen flex flex-col" }, {
        default: r(() => [
          i(c, { class: "logo-wrap flex items-center justify-center h-[64px]" }, {
            default: r(() => [
              _(m).menuIsCollapse ? (u(), g("div", ee, oe)) : (u(), g("div", Z, [
                i(t, {
                  style: { width: "40px", height: "40px" },
                  src: _(P)(E.value),
                  fit: "contain"
                }, {
                  error: r(() => [
                    $
                  ]),
                  _: 1
                }, 8, ["src"])
              ]))
            ]),
            _: 1
          }),
          i(M, { class: "menu-wrap" }, {
            default: r(() => [
              i(B, null, {
                default: r(() => [
                  i(A, {
                    "default-active": _(L).name,
                    router: !0,
                    "background-color": "--side-dark-color",
                    "text-color": "#fff",
                    "active-text-color": "#fff",
                    "unique-opened": !0,
                    collapse: _(m).menuIsCollapse
                  }, {
                    default: r(() => [
                      (u(!0), g(D, null, X(n.value, (q, F) => (u(), k(Y, {
                        routes: q,
                        key: F
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  se
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
const me = /* @__PURE__ */ W(ne, [["__scopeId", "data-v-caef4e65"]]);
export {
  me as default
};
