import { defineComponent as w, computed as x, resolveComponent as g, openBlock as n, createElementBlock as l, Fragment as p, createBlock as i, withCtx as m, createElementVNode as f, toDisplayString as v, renderList as E, normalizeClass as k, createCommentVNode as b } from "vue";
import { useRouter as A, useRoute as B } from "vue-router";
import { u as I, s as y, _ as L } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const V = {
  class: /* @__PURE__ */ k(["ml-[10px]"])
}, q = {
  key: 2,
  class: "!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"
}, D = /* @__PURE__ */ w({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const S = A(), C = B(), u = e, a = I().siteInfo, o = x(() => u.routes.meta), M = x(() => !u.routes.children || !Array.isArray(u.routes.children) ? !1 : u.routes.children.some((s) => {
      var t;
      return ((t = s.meta) == null ? void 0 : t.show) === 1;
    }));
    x(() => {
      const s = {};
      return a == null || a.apps.forEach((t) => {
        s[t.key] = t;
      }), a == null || a.site_addons.forEach((t) => {
        s[t.key] = t;
      }), s;
    });
    const h = (s) => {
      const t = y.get("specialMenuNames"), c = y.get("specialMenuNamesLevel1");
      t.includes(s) || y.remove("activeAppKey"), c.includes(s) && (s = "addon_list");
      const r = C.name === s ? { refresh: Date.now() } : {};
      S.push({ name: s, query: r });
    };
    return (s, t) => {
      const c = g("el-sub-menu"), d = g("el-menu-item");
      return o.value.show ? (n(), l(p, { key: 0 }, [
        M.value ? (n(), i(c, {
          key: 0,
          index: String(e.routes.name)
        }, {
          title: m(() => [
            f("span", V, v(o.value.title), 1)
          ]),
          default: m(() => [
            (n(!0), l(p, null, E(e.routes.children, (r, _) => (n(), i(N, {
              routes: r,
              key: _
            }, null, 8, ["routes"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (n(), l(p, { key: 1 }, [
          o.value.addon && o.value.parent_route && o.value.parent_route.addon == "" ? (n(), i(d, {
            key: 0,
            index: String(e.routes.name),
            onClick: t[0] || (t[0] = (r) => h(e.routes.name))
          }, {
            title: m(() => [
              f("span", {
                class: k([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, v(o.value.title), 3)
            ]),
            _: 1
          }, 8, ["index"])) : (n(), i(d, {
            key: 1,
            index: String(e.routes.name),
            onClick: t[1] || (t[1] = (r) => h(e.routes.name))
          }, {
            title: m(() => [
              f("span", {
                class: k([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, v(o.value.title), 3)
            ]),
            _: 1
          }, 8, ["index"]))
        ], 64)),
        e.routes.is_border ? (n(), l("div", q)) : b("", !0)
      ], 64)) : b("", !0);
    };
  }
});
const N = /* @__PURE__ */ L(D, [["__scopeId", "data-v-1fafaad2"]]);
export {
  N as default
};
