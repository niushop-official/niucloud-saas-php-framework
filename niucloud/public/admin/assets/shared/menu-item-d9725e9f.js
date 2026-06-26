import { defineComponent as N, computed as y, ref as R, watch as V, resolveComponent as k, openBlock as l, createElementBlock as i, Fragment as d, createBlock as u, withCtx as v, unref as h, createCommentVNode as c, createElementVNode as p, toDisplayString as _, normalizeClass as I, renderList as q } from "vue";
import { useRouter as A, useRoute as D } from "vue-router";
import { u as S, ck as F, _ as K } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const L = {
  key: 0,
  class: "flex h-full flex-col items-center justify-center"
}, M = { class: "leading-none mt-[5px]" }, O = {
  key: 0,
  class: "flex h-full flex-col items-center justify-center"
}, U = { class: "leading-none mt-[5px]" }, $ = /* @__PURE__ */ N({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    },
    level: {
      type: Number,
      default: 1
    }
  },
  setup(r) {
    const z = A(), m = D(), f = S(), E = S().routers, t = r, g = F(), e = y(() => t.routes.meta);
    y(() => {
      var o, s;
      const n = {};
      return (o = f.siteInfo) == null || o.apps.forEach((a) => {
        n[a.key] = a;
      }), (s = f.siteInfo) == null || s.site_addons.forEach((a) => {
        n[a.key] = a;
      }), n;
    });
    const j = y(() => {
      var n;
      return (n = f.siteInfo) == null ? void 0 : n.site_addons.map((o) => o.key);
    }), x = {};
    E.forEach((n) => {
      n.original_name = n.name, n.meta.addon && (x[n.meta.addon] = n);
    });
    const b = R(null);
    return V(m, () => {
      t.routes.name == "addon_list" && (j.value.includes(m.meta.addon) && x[m.meta.addon] ? b.value = x[m.meta.addon] : b.value = null);
    }, { immediate: !0 }), (n, o) => {
      const s = k("icon"), a = k("el-sub-menu"), w = k("el-menu-item");
      return e.value.show ? (l(), i(d, { key: 0 }, [
        e.value.type == 0 && r.routes.children ? (l(), u(a, {
          key: 0,
          index: String(r.routes.name)
        }, {
          title: v(() => [
            h(g).menuIsCollapse && t.level == 1 ? (l(), i("div", L, [
              e.value.icon ? (l(), u(s, {
                key: 0,
                name: e.value.icon,
                size: "20px",
                class: "leading-none"
              }, null, 8, ["name"])) : c("", !0),
              p("div", M, _(e.value.short_title || e.value.title), 1)
            ])) : (l(), i(d, { key: 1 }, [
              e.value.icon && t.level != 1 ? (l(), u(s, {
                key: 0,
                name: e.value.icon,
                size: t.level == 1 ? "20px" : "16px",
                class: "absolute"
              }, null, 8, ["name", "size"])) : c("", !0)
            ], 64)),
            p("span", {
              class: I(["text-[14px]", { "font-bold": t.level === 1, " ml-[20px]": e.value.icon && t.level != 1 }])
            }, _(e.value.title), 3)
          ]),
          default: v(() => [
            (l(!0), i(d, null, q(r.routes.children, (C, B) => (l(), u(G, {
              routes: C,
              key: B,
              level: t.level + 1
            }, null, 8, ["routes", "level"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (l(), u(w, {
          key: 1,
          index: String(r.routes.name),
          onClick: o[0] || (o[0] = (C) => h(z).push({ name: r.routes.name }))
        }, {
          title: v(() => [
            p("span", {
              class: I(["text-[14px]", { "font-bold": t.level === 1, " ml-[20px]": e.value.icon && t.level != 1 }])
            }, _(e.value.title), 3)
          ]),
          default: v(() => [
            h(g).menuIsCollapse && t.level == 1 ? (l(), i("div", O, [
              e.value.icon ? (l(), u(s, {
                key: 0,
                name: e.value.icon,
                size: "20px",
                class: "leading-none"
              }, null, 8, ["name"])) : c("", !0),
              p("div", U, _(e.value.short_title || e.value.title), 1)
            ])) : (l(), i(d, { key: 1 }, [
              e.value.icon && t.level != 1 ? (l(), u(s, {
                key: 0,
                name: e.value.icon,
                size: t.level == 1 ? "20px" : "16px",
                class: "absolute"
              }, null, 8, ["name", "size"])) : c("", !0)
            ], 64))
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : c("", !0);
    };
  }
});
const G = /* @__PURE__ */ K($, [["__scopeId", "data-v-f8e328de"]]);
export {
  G as default
};
