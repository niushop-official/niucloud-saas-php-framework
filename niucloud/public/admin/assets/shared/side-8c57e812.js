import { defineComponent as R, ref as f, computed as C, onMounted as B, resolveComponent as l, openBlock as u, createBlock as m, withCtx as r, createVNode as d, unref as h, createElementBlock as V, Fragment as q, renderList as F, pushScopeId as I, popScopeId as N, createElementVNode as D } from "vue";
import { useRoute as L } from "vue-router";
import { cm as M, u as O, cq as i, _ as U } from "./core-shared-11c0a673.js";
import j from "./menu-item-30098fbc.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const z = (t) => (I("data-v-28367514"), t = t(), N(), t), A = /* @__PURE__ */ z(() => /* @__PURE__ */ D("div", { class: "h-[48px]" }, null, -1)), G = /* @__PURE__ */ R({
  __name: "side",
  setup(t) {
    const p = M(), c = O(), v = L(), n = c.siteInfo, x = c.routers, y = c.addonIndexRoute, a = f([]), s = {}, H = C(() => p.website), _ = f([]);
    if (B(() => {
    }), x.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? (e.children && e.children.length && (e.name = i(e.children)), a.value.push(e)) : e.meta.addon != "" && (n == null ? void 0 : n.apps.length) == 1 && (n == null ? void 0 : n.apps[0].key) == e.meta.addon ? e.children ? (e.children.forEach((o) => {
        o.original_name = o.name, o.children && o.children.length && (o.name = i(o.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : s[e.meta.addon] = e;
    }), (n == null ? void 0 : n.apps.length) > 1) {
      const e = [];
      n == null || n.apps.forEach((o) => {
        s[o.key] && (s[o.key].name = y[o.key], e.push(s[o.key]));
      }), a.value.unshift(...e);
    }
    return _.value = a.value.map((e) => e.name), (e, o) => {
      const k = l("el-menu"), g = l("el-scrollbar"), S = l("el-main"), b = l("el-container");
      return u(), m(b, { class: "flex flex-col" }, {
        default: r(() => [
          d(S, { class: "menu-wrap" }, {
            default: r(() => [
              d(g, { class: "menu-scrollbar flex-1 h-0" }, {
                default: r(() => [
                  d(k, {
                    "default-active": h(v).name,
                    "default-openeds": _.value,
                    router: !0,
                    "unique-opened": !1,
                    collapse: h(p).menuIsCollapse
                  }, {
                    default: r(() => [
                      (u(!0), V(q, null, F(a.value, (w, E) => (u(), m(j, {
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
