import { defineComponent as R, ref as f, computed as C, onMounted as A, resolveComponent as l, openBlock as u, createBlock as h, withCtx as r, createVNode as d, unref as i, createElementBlock as B, Fragment as V, renderList as F, pushScopeId as I, popScopeId as M, createElementVNode as N } from "vue";
import { useRoute as q } from "vue-router";
import { u as z, h as D, hz as L, cA as m, a as O } from "./core-shared-c6ad4e77.js";
import U from "./menu-item-d84cc262.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const j = (s) => (I("data-v-d757af61"), s = s(), M(), s), G = /* @__PURE__ */ j(() => /* @__PURE__ */ N("div", { class: "h-[48px]" }, null, -1)), H = /* @__PURE__ */ R({
  __name: "side",
  setup(s) {
    const p = z(), c = D(), J = q(), n = c.siteInfo, { menuActive: v } = L(), x = c.routers, y = c.addonIndexRoute, a = f([]), t = {}, K = C(() => p.website), _ = f([]);
    if (A(() => {
    }), x.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? (e.children && e.children.length && (e.name = m(e.children)), a.value.push(e)) : e.meta.addon != "" && (n == null ? void 0 : n.apps.length) == 1 && (n == null ? void 0 : n.apps[0].key) == e.meta.addon ? e.children ? (e.children.forEach((o) => {
        o.original_name = o.name, o.children && o.children.length && (o.name = m(o.children));
      }), a.value.unshift(...e.children)) : a.value.unshift(e) : t[e.meta.addon] = e;
    }), (n == null ? void 0 : n.apps.length) > 1) {
      const e = [];
      n == null || n.apps.forEach((o) => {
        t[o.key] && (t[o.key].name = y[o.key], e.push(t[o.key]));
      }), a.value.unshift(...e);
    }
    return _.value = a.value.map((e) => e.name), (e, o) => {
      const k = l("el-menu"), g = l("el-scrollbar"), S = l("el-main"), b = l("el-container");
      return u(), h(b, { class: "flex flex-col" }, {
        default: r(() => [
          d(S, { class: "menu-wrap" }, {
            default: r(() => [
              d(g, { class: "menu-scrollbar flex-1 h-0" }, {
                default: r(() => [
                  d(k, {
                    "default-active": i(v),
                    "default-openeds": _.value,
                    router: !1,
                    "unique-opened": !1,
                    collapse: i(p).menuIsCollapse
                  }, {
                    default: r(() => [
                      (u(!0), B(V, null, F(a.value, (w, E) => (u(), h(U, {
                        routes: w,
                        key: E
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "default-openeds", "collapse"]),
                  G
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
const ne = /* @__PURE__ */ O(H, [["__scopeId", "data-v-d757af61"]]);
export {
  ne as default
};
