import { defineComponent as N, ref as f, computed as U, onMounted as q, resolveComponent as n, openBlock as c, createBlock as y, withCtx as r, createVNode as u, unref as d, createElementBlock as h, Fragment as D, renderList as T, pushScopeId as z, popScopeId as G, createElementVNode as _ } from "vue";
import { _ as H } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as J } from "vue-router";
import { ck as K, u as O, co as k, i as P, a as Q, s as w, gT as W, _ as X } from "./core-shared-ca1fcae5.js";
import Y from "./menu-item-b57be1e4.js";
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
}, te = /* @__PURE__ */ g(() => /* @__PURE__ */ _("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), oe = [
  te
], se = /* @__PURE__ */ g(() => /* @__PURE__ */ _("div", { class: "h-[48px]" }, null, -1)), ae = /* @__PURE__ */ N({
  __name: "side",
  setup(i) {
    const m = K(), l = O(), S = J(), o = l.siteInfo, L = l.routers, j = l.addonIndexRoute, a = f([]), p = {}, C = U(() => l.siteInfo.logo ? l.siteInfo.logo : m.website.logo), x = f([]), E = async () => {
      const e = await Q();
      x.value = e.data, w.set({ key: "defaultAppList", data: x.value });
    }, v = f([]), I = async () => {
      const e = await W();
      v.value = e.data.list, w.set({ key: "specialAppList", data: v.value });
    };
    if (q(() => {
      E(), I();
    }), L.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && e.name != "sign" && e.name != "verify" && (e.children && e.children.length && (e.name = k(e.children)), a.value.push(e)) : e.meta.addon != "" && (o == null ? void 0 : o.apps.length) == 1 && (o == null ? void 0 : o.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = k(t.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : p[e.meta.addon] = e, a.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }), (o == null ? void 0 : o.apps.length) > 1) {
      const e = [];
      o == null || o.apps.forEach((t) => {
        p[t.key] && (p[t.key].name = j[t.key], e.push(p[t.key]));
      }), a.value.unshift(...e), a.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }
    return (e, t) => {
      const s = n("el-image"), R = n("el-header"), A = n("el-menu"), b = n("el-scrollbar"), B = n("el-main"), M = n("el-container");
      return c(), y(M, { class: "w-[200px] h-screen layout-aside flex flex-col" }, {
        default: r(() => [
          u(R, { class: "logo-wrap flex items-center justify-center h-[64px]" }, {
            default: r(() => [
              d(m).menuIsCollapse ? (c(), h("div", ee, oe)) : (c(), h("div", Z, [
                u(s, {
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
                      (c(!0), h(D, null, T(a.value, (V, F) => (c(), y(Y, {
                        routes: V,
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
const fe = /* @__PURE__ */ X(ae, [["__scopeId", "data-v-1abe206e"]]);
export {
  fe as default
};
