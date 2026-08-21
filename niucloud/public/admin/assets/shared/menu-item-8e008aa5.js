import { defineComponent as M, computed as p, resolveComponent as b, openBlock as n, createElementBlock as l, Fragment as x, createBlock as c, withCtx as i, createElementVNode as v, toDisplayString as f, renderList as w, normalizeClass as h, createCommentVNode as S, pushScopeId as z, popScopeId as F } from "vue";
import { useRouter as E, useRoute as A } from "vue-router";
import { u as B, s as y, _ as L } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const V = {
  class: /* @__PURE__ */ h(["ml-[10px]"])
}, q = {
  key: 2,
  class: "!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"
}, D = /* @__PURE__ */ M({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const g = E(), C = A(), u = e, a = B().siteInfo, o = p(() => u.routes.meta), _ = p(() => !u.routes.children || !Array.isArray(u.routes.children) ? !1 : u.routes.children.some((s) => {
      var t;
      return ((t = s.meta) == null ? void 0 : t.show) === 1;
    })), $ = p(() => {
      const s = {};
      return a == null || a.apps.forEach((t) => {
        s[t.key] = t;
      }), a == null || a.site_addons.forEach((t) => {
        s[t.key] = t;
      }), s;
    }), k = (s) => {
      const t = y.get("specialMenuNames"), m = y.get("specialMenuNamesLevel1");
      t.includes(s) || y.remove("activeAppKey"), m.includes(s) && (s = "addon_list");
      const r = C.name === s ? { refresh: Date.now() } : {};
      g.push({ name: s, query: r });
    };
    return (s, t) => {
      const m = b("el-sub-menu"), d = b("el-menu-item");
      return o.value.show ? (n(), l(x, { key: 0 }, [
        _.value ? (n(), c(m, {
          key: 0,
          index: String(e.routes.name)
        }, {
          title: i(() => [
            v("span", V, f(o.value.title), 1)
          ]),
          default: i(() => [
            (n(!0), l(x, null, w(e.routes.children, (r, I) => (n(), c(N, {
              routes: r,
              key: I
            }, null, 8, ["routes"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (n(), l(x, { key: 1 }, [
          o.value.addon && o.value.parent_route && o.value.parent_route.addon == "" ? (n(), c(d, {
            key: 0,
            index: String(e.routes.name),
            onClick: t[0] || (t[0] = (r) => k(e.routes.name))
          }, {
            title: i(() => [
              v("span", {
                class: h([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, f(o.value.title), 3)
            ]),
            _: 1
          }, 8, ["index"])) : (n(), c(d, {
            key: 1,
            index: String(e.routes.name),
            onClick: t[1] || (t[1] = (r) => k(e.routes.name))
          }, {
            title: i(() => [
              v("span", {
                class: h([{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }])
              }, f(o.value.title), 3)
            ]),
            _: 1
          }, 8, ["index"]))
        ], 64)),
        e.routes.is_border ? (n(), l("div", q)) : S("", !0)
      ], 64)) : S("", !0);
    };
  }
});
const N = /* @__PURE__ */ L(D, [["__scopeId", "data-v-b7fcaac2"]]);
export {
  N as default
};
