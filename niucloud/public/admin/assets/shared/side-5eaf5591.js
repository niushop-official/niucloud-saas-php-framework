import { defineComponent as R, ref as f, computed as C, onMounted as B, resolveComponent as l, openBlock as u, createBlock as h, withCtx as r, createVNode as d, unref as m, createElementBlock as V, Fragment as F, renderList as I, pushScopeId as N, popScopeId as q, createElementVNode as D } from "vue";
import { useRoute as L } from "vue-router";
import { co as M, u as O, cs as i, _ as U } from "./core-shared-0b2facad.js";
import j from "./menu-item-3569f0b7.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const z = (s) => (N("data-v-28367514"), s = s(), q(), s), A = /* @__PURE__ */ z(() => /* @__PURE__ */ D("div", { class: "h-[48px]" }, null, -1)), G = /* @__PURE__ */ R({
  __name: "side",
  setup(s) {
    const p = M(), c = O(), v = L(), o = c.siteInfo, x = c.routers, y = c.addonIndexRoute, a = f([]), t = {}, H = C(() => p.website), _ = f([]);
    if (B(() => {
    }), x.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? (e.children && e.children.length && (e.name = i(e.children)), a.value.push(e)) : e.meta.addon != "" && (o == null ? void 0 : o.apps.length) == 1 && (o == null ? void 0 : o.apps[0].key) == e.meta.addon ? e.children ? (e.children.forEach((n) => {
        n.original_name = n.name, n.children && n.children.length && (n.name = i(n.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : t[e.meta.addon] = e;
    }), (o == null ? void 0 : o.apps.length) > 1) {
      const e = [];
      o == null || o.apps.forEach((n) => {
        t[n.key] && (t[n.key].name = y[n.key], e.push(t[n.key]));
      }), a.value.unshift(...e);
    }
    return _.value = a.value.map((e) => e.name), (e, n) => {
      const k = l("el-menu"), g = l("el-scrollbar"), S = l("el-main"), b = l("el-container");
      return u(), h(b, { class: "flex flex-col" }, {
        default: r(() => [
          d(S, { class: "menu-wrap" }, {
            default: r(() => [
              d(g, { class: "menu-scrollbar flex-1 h-0" }, {
                default: r(() => [
                  d(k, {
                    "default-active": m(v).name,
                    "default-openeds": _.value,
                    router: !0,
                    "unique-opened": !1,
                    collapse: m(p).menuIsCollapse
                  }, {
                    default: r(() => [
                      (u(!0), V(F, null, I(a.value, (w, E) => (u(), h(j, {
                        routes: w,
                        key: E
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "default-openeds", "collapse"]),
                  A
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
const $ = /* @__PURE__ */ U(G, [["__scopeId", "data-v-28367514"]]);
export {
  $ as default
};
