import { defineComponent as w, computed as x, resolveComponent as b, openBlock as n, createElementBlock as l, Fragment as p, createBlock as c, withCtx as i, createElementVNode as v, toDisplayString as f, renderList as E, normalizeClass as k, createCommentVNode as g } from "vue";
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
    const S = A(), C = B(), u = e, r = I().siteInfo, o = x(() => u.routes.meta), M = x(() => !u.routes.children || !Array.isArray(u.routes.children) ? !1 : u.routes.children.some((s) => {
      var t;
      return ((t = s.meta) == null ? void 0 : t.show) === 1;
    }));
    x(() => {
      const s = {};
      return r == null || r.apps.forEach((t) => {
        s[t.key] = t;
      }), r == null || r.site_addons.forEach((t) => {
        s[t.key] = t;
      }), s;
    });
    const h = (s) => {
      const t = y.get("specialMenuNames"), m = y.get("specialMenuNamesLevel1");
      t.includes(s) || y.remove("activeAppKey"), m.includes(s) && (s = "addon_list");
      const a = C.name === s ? { refresh: Date.now() } : {};
      S.push({ name: s, query: a });
    };
    return (s, t) => {
      const m = b("el-sub-menu"), d = b("el-menu-item");
      return o.value.show ? (n(), l(p, { key: 0 }, [
        M.value ? (n(), c(m, {
          key: 0,
          index: String(e.routes.name)
        }, {
          title: i(() => [
            v("span", V, f(o.value.title), 1)
          ]),
          default: i(() => [
            (n(!0), l(p, null, E(e.routes.children, (a, _) => (n(), c(N, {
              routes: a,
              key: _
            }, null, 8, ["routes"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (n(), l(p, { key: 1 }, [
          o.value.addon && o.value.parent_route && o.value.parent_route.addon == "" ? (n(), c(d, {
            key: 0,
            index: String(e.routes.name),
            onClick: t[0] || (t[0] = (a) => h(e.routes.name))
          }, {
            title: i(() => [
              v("span", {
                class: k([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, f(o.value.title), 3)
            ]),
            _: 1
          }, 8, ["index"])) : (n(), c(d, {
            key: 1,
            index: String(e.routes.name),
            onClick: t[1] || (t[1] = (a) => h(e.routes.name))
          }, {
            title: i(() => [
              v("span", {
                class: k([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, f(o.value.title), 3)
            ]),
            _: 1
          }, 8, ["index"]))
        ], 64)),
        e.routes.is_border ? (n(), l("div", q)) : g("", !0)
      ], 64)) : g("", !0);
    };
  }
});
const N = /* @__PURE__ */ L(D, [["__scopeId", "data-v-b7fcaac2"]]);
export {
  N as default
};
