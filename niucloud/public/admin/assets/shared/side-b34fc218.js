import { defineComponent as F, ref as f, computed as N, onMounted as U, resolveComponent as n, openBlock as c, createBlock as y, withCtx as r, createVNode as u, unref as d, createElementBlock as h, Fragment as D, renderList as X, pushScopeId as z, popScopeId as G, createElementVNode as _ } from "vue";
import { _ as H } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as J } from "vue-router";
import { cm as K, u as O, cq as w, i as P, a as Q, s as k, gX as T, _ as W } from "./core-shared-5b3bfa35.js";
import Y from "./menu-item-e11f2eac.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const g = (i) => (z("data-v-1abe206e"), i = i(), G(), i), Z = {
  key: 0,
  class: "logo flex items-center m-auto h-[64px]"
}, $ = /* @__PURE__ */ g(() => /* @__PURE__ */ _("div", { class: "flex justify-center items-center w-full h-[40px]" }, [
  /* @__PURE__ */ _("img", {
    class: "max-w-[40px]",
    src: H,
    alt: "",
    "object-fit": "contain"
  })
], -1)), ee = {
  key: 1,
  class: "logo flex items-center justify-center h-[64px]"
}, te = /* @__PURE__ */ g(() => /* @__PURE__ */ _("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), se = [
  te
], oe = /* @__PURE__ */ g(() => /* @__PURE__ */ _("div", { class: "h-[48px]" }, null, -1)), ae = /* @__PURE__ */ F({
  __name: "side",
  setup(i) {
    const m = K(), l = O(), S = J(), s = l.siteInfo, L = l.routers, j = l.addonIndexRoute, a = f([]), p = {}, C = N(() => l.siteInfo.logo ? l.siteInfo.logo : m.website.logo), x = f([]), E = async () => {
      const e = await Q();
      x.value = e.data, k.set({ key: "defaultAppList", data: x.value });
    }, v = f([]), I = async () => {
      const e = await T();
      v.value = e.data.list, k.set({ key: "specialAppList", data: v.value });
    };
    if (U(() => {
      E(), I();
    }), L.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && e.name != "sign" && e.name != "verify" && (e.children && e.children.length && (e.name = w(e.children)), a.value.push(e)) : e.meta.addon != "" && (s == null ? void 0 : s.apps.length) == 1 && (s == null ? void 0 : s.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = w(t.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : p[e.meta.addon] = e, a.value.sort((t, o) => t.meta.sort && o.meta.sort ? o.meta.sort - t.meta.sort : t.meta.sort ? -1 : o.meta.sort ? 1 : 0);
    }), (s == null ? void 0 : s.apps.length) > 1) {
      const e = [];
      s == null || s.apps.forEach((t) => {
        p[t.key] && (p[t.key].name = j[t.key], e.push(p[t.key]));
      }), a.value.unshift(...e), a.value.sort((t, o) => t.meta.sort && o.meta.sort ? o.meta.sort - t.meta.sort : t.meta.sort ? -1 : o.meta.sort ? 1 : 0);
    }
    return (e, t) => {
      const o = n("el-image"), R = n("el-header"), A = n("el-menu"), b = n("el-scrollbar"), B = n("el-main"), M = n("el-container");
      return c(), y(M, { class: "w-[200px] h-screen layout-aside flex flex-col" }, {
        default: r(() => [
          u(R, { class: "logo-wrap flex items-center justify-center h-[64px]" }, {
            default: r(() => [
              d(m).menuIsCollapse ? (c(), h("div", ee, se)) : (c(), h("div", Z, [
                u(o, {
                  style: { width: "40px", height: "40px" },
                  src: d(P)(C.value),
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
          u(B, { class: "menu-wrap" }, {
            default: r(() => [
              u(b, null, {
                default: r(() => [
                  u(A, {
                    "default-active": d(S).name,
                    router: !0,
                    class: "aside-menu h-full",
                    "unique-opened": !0,
                    collapse: d(m).menuIsCollapse
                  }, {
                    default: r(() => [
                      (c(!0), h(D, null, X(a.value, (V, q) => (c(), y(Y, {
                        routes: V,
                        key: q
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  oe
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
const fe = /* @__PURE__ */ W(ae, [["__scopeId", "data-v-1abe206e"]]);
export {
  fe as default
};
