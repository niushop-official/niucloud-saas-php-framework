import { defineComponent as A, computed as x, resolveComponent as S, unref as o, openBlock as r, createElementBlock as c, Fragment as f, createBlock as i, withCtx as m, createElementVNode as h, toDisplayString as y, renderList as E, normalizeClass as v, createCommentVNode as g, pushScopeId as N, popScopeId as O } from "vue";
import { useRouter as B, useRoute as J } from "vue-router";
import { h as L, hA as V, m as k, a as q } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const D = {
  class: /* @__PURE__ */ v(["ml-[10px]"])
}, R = {
  key: 2,
  class: "!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"
}, $ = /* @__PURE__ */ A({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const l = e, C = B(), M = J(), a = L().siteInfo, n = x(() => l.routes.meta), { handleMenuJump: I } = V(), _ = x(() => !l.routes.children || !Array.isArray(l.routes.children) ? !1 : l.routes.children.some((s) => {
      var t;
      return ((t = s.meta) == null ? void 0 : t.show) === 1;
    })), F = x(() => {
      const s = {};
      return a == null || a.apps.forEach((t) => {
        s[t.key] = t;
      }), a == null || a.site_addons.forEach((t) => {
        s[t.key] = t;
      }), s;
    }), b = (s) => {
      const t = k.get("specialMenuNames"), d = k.get("specialMenuNamesLevel1");
      if (t.includes(s) || k.remove("activeAppKey"), d.includes(s) && (s = "addon_list"), I(s, n.value))
        return;
      const u = M.name === s ? { refresh: Date.now() } : {};
      C.push({ name: s, query: u });
    };
    return (s, t) => {
      const d = S("el-sub-menu"), p = S("el-menu-item");
      return o(n).show ? (r(), c(f, { key: 0 }, [
        o(_) ? (r(), i(d, {
          key: 0,
          index: String(e.routes.name)
        }, {
          title: m(() => [
            h("span", D, y(o(n).title), 1)
          ]),
          default: m(() => [
            (r(!0), c(f, null, E(e.routes.children, (u, w) => (r(), i(j, {
              routes: u,
              key: w
            }, null, 8, ["routes"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (r(), c(f, { key: 1 }, [
          o(n).addon && o(n).parent_route && o(n).parent_route.addon == "" ? (r(), i(p, {
            key: 0,
            index: String(e.routes.name),
            onClick: t[0] || (t[0] = (u) => b(e.routes.name))
          }, {
            title: m(() => [
              h("span", {
                class: v([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, y(o(n).title), 3)
            ]),
            _: 1
          }, 8, ["index"])) : (r(), i(p, {
            key: 1,
            index: String(e.routes.name),
            onClick: t[1] || (t[1] = (u) => b(e.routes.name))
          }, {
            title: m(() => [
              h("span", {
                class: v([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, y(o(n).title), 3)
            ]),
            _: 1
          }, 8, ["index"]))
        ], 64)),
        e.routes.is_border ? (r(), c("div", R)) : g("", !0)
      ], 64)) : g("", !0);
    };
  }
});
const j = /* @__PURE__ */ q($, [["__scopeId", "data-v-19f4981b"]]);
export {
  j as default
};
