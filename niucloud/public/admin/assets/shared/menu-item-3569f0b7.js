import { defineComponent as N, computed as y, ref as R, watch as V, resolveComponent as k, openBlock as o, createElementBlock as i, Fragment as m, createBlock as u, withCtx as p, unref as h, createCommentVNode as c, createElementVNode as v, toDisplayString as _, normalizeClass as b, renderList as q, pushScopeId as P, popScopeId as Q } from "vue";
import { useRouter as A, useRoute as D } from "vue-router";
import { u as C, co as F, _ as K } from "./core-shared-0b2facad.js";
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
    const z = A(), d = D(), f = C(), E = C().routers, t = r, I = F(), e = y(() => t.routes.meta), H = y(() => {
      var l, s;
      const n = {};
      return (l = f.siteInfo) == null || l.apps.forEach((a) => {
        n[a.key] = a;
      }), (s = f.siteInfo) == null || s.site_addons.forEach((a) => {
        n[a.key] = a;
      }), n;
    }), w = y(() => {
      var n;
      return (n = f.siteInfo) == null ? void 0 : n.site_addons.map((l) => l.key);
    }), x = {};
    E.forEach((n) => {
      n.original_name = n.name, n.meta.addon && (x[n.meta.addon] = n);
    });
    const S = R(null);
    return V(d, () => {
      t.routes.name == "addon_list" && (w.value.includes(d.meta.addon) && x[d.meta.addon] ? S.value = x[d.meta.addon] : S.value = null);
    }, { immediate: !0 }), (n, l) => {
      const s = k("icon"), a = k("el-sub-menu"), j = k("el-menu-item");
      return e.value.show ? (o(), i(m, { key: 0 }, [
        e.value.type == 0 && r.routes.children ? (o(), u(a, {
          key: 0,
          index: String(r.routes.name)
        }, {
          title: p(() => [
            h(I).menuIsCollapse && t.level == 1 ? (o(), i("div", L, [
              e.value.icon ? (o(), u(s, {
                key: 0,
                name: e.value.icon,
                size: "20px",
                class: "leading-none"
              }, null, 8, ["name"])) : c("", !0),
              v("div", M, _(e.value.short_title || e.value.title), 1)
            ])) : (o(), i(m, { key: 1 }, [
              e.value.icon && t.level != 1 ? (o(), u(s, {
                key: 0,
                name: e.value.icon,
                size: t.level == 1 ? "20px" : "16px",
                class: "absolute"
              }, null, 8, ["name", "size"])) : c("", !0)
            ], 64)),
            v("span", {
              class: b(["text-[14px]", { "font-bold": t.level === 1, " ml-[20px]": e.value.icon && t.level != 1 }])
            }, _(e.value.title), 3)
          ]),
          default: p(() => [
            (o(!0), i(m, null, q(r.routes.children, (g, B) => (o(), u(G, {
              routes: g,
              key: B,
              level: t.level + 1
            }, null, 8, ["routes", "level"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (o(), u(j, {
          key: 1,
          index: String(r.routes.name),
          onClick: l[0] || (l[0] = (g) => h(z).push({ name: r.routes.name }))
        }, {
          title: p(() => [
            v("span", {
              class: b(["text-[14px]", { "font-bold": t.level === 1, " ml-[20px]": e.value.icon && t.level != 1 }])
            }, _(e.value.title), 3)
          ]),
          default: p(() => [
            h(I).menuIsCollapse && t.level == 1 ? (o(), i("div", O, [
              e.value.icon ? (o(), u(s, {
                key: 0,
                name: e.value.icon,
                size: "20px",
                class: "leading-none"
              }, null, 8, ["name"])) : c("", !0),
              v("div", U, _(e.value.short_title || e.value.title), 1)
            ])) : (o(), i(m, { key: 1 }, [
              e.value.icon && t.level != 1 ? (o(), u(s, {
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
