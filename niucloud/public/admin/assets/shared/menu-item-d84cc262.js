import { defineComponent as V, computed as i, ref as D, watch as q, resolveComponent as k, unref as t, openBlock as s, createElementBlock as c, Fragment as f, createBlock as d, withCtx as _, createVNode as C, createElementVNode as v, toDisplayString as h, createCommentVNode as I, normalizeClass as z, renderList as F, pushScopeId as te, popScopeId as ne } from "vue";
import { useRouter as K, useRoute as L } from "vue-router";
import { h as B, u as O, hC as U, hB as $, hA as G, a as H } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const P = {
  key: 0,
  class: "flex h-full flex-col items-center justify-center"
}, Q = { class: "leading-none mt-[5px]" }, T = {
  key: 0,
  class: "flex h-full flex-col items-center justify-center"
}, W = { class: "leading-none mt-[5px]" }, X = /* @__PURE__ */ V({
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
  setup(u) {
    const n = u, E = K(), m = L(), y = B(), M = B().routers, g = O(), o = i(() => n.routes.meta), p = i(() => {
      var e;
      return U((e = o.value) == null ? void 0 : e.icon);
    }), w = i(() => {
      var l;
      if (n.level !== 1)
        return !1;
      const e = n.routes.children;
      return !Array.isArray(e) || e.length !== 1 ? !1 : !$((l = e[0]) == null ? void 0 : l.meta);
    }), { handleMenuJump: A } = G(), j = (e) => {
      A(e, o.value) || E.push({ name: e });
    }, Z = i(() => {
      var l, a;
      const e = {};
      return (l = y.siteInfo) == null || l.apps.forEach((r) => {
        e[r.key] = r;
      }), (a = y.siteInfo) == null || a.site_addons.forEach((r) => {
        e[r.key] = r;
      }), e;
    }), J = i(() => {
      var e;
      return (e = y.siteInfo) == null ? void 0 : e.site_addons.map((l) => l.key);
    }), x = {};
    M.forEach((e) => {
      e.original_name = e.name, e.meta.addon && (x[e.meta.addon] = e);
    });
    const S = D(null);
    return q(m, () => {
      n.routes.name == "addon_list" && (J.value.includes(m.meta.addon) && x[m.meta.addon] ? S.value = x[m.meta.addon] : S.value = null);
    }, { immediate: !0 }), (e, l) => {
      const a = k("icon"), r = k("el-sub-menu"), N = k("el-menu-item");
      return t(o).show ? (s(), c(f, { key: 0 }, [
        t(o).type == 0 && u.routes.children && !t(w) ? (s(), d(r, {
          key: 0,
          index: String(u.routes.name)
        }, {
          title: _(() => [
            t(g).menuIsCollapse && n.level == 1 ? (s(), c("div", P, [
              C(a, {
                name: t(p),
                size: "20px",
                class: "leading-none"
              }, null, 8, ["name"]),
              v("div", Q, h(t(o).short_title || t(o).title), 1)
            ])) : (s(), c(f, { key: 1 }, [
              n.level != 1 ? (s(), d(a, {
                key: 0,
                name: t(p),
                size: "16px",
                class: "absolute"
              }, null, 8, ["name"])) : I("", !0)
            ], 64)),
            v("span", {
              class: z(["text-[14px]", { "font-bold": n.level === 1, " ml-[20px]": n.level != 1 }])
            }, h(t(o).title), 3)
          ]),
          default: _(() => [
            (s(!0), c(f, null, F(u.routes.children, (b, R) => (s(), d(Y, {
              routes: b,
              key: R,
              level: n.level + 1
            }, null, 8, ["routes", "level"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (s(), d(N, {
          key: 1,
          index: String(u.routes.name),
          onClick: l[0] || (l[0] = (b) => j(u.routes.name))
        }, {
          title: _(() => [
            v("span", {
              class: z(["text-[14px]", { "font-bold": n.level === 1, " ml-[20px]": n.level != 1 }])
            }, h(t(o).title), 3)
          ]),
          default: _(() => [
            t(g).menuIsCollapse && n.level == 1 ? (s(), c("div", T, [
              C(a, {
                name: t(p),
                size: "20px",
                class: "leading-none"
              }, null, 8, ["name"]),
              v("div", W, h(t(o).short_title || t(o).title), 1)
            ])) : (s(), c(f, { key: 1 }, [
              n.level != 1 ? (s(), d(a, {
                key: 0,
                name: t(p),
                size: "16px",
                class: "absolute"
              }, null, 8, ["name"])) : I("", !0)
            ], 64))
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : I("", !0);
    };
  }
});
const Y = /* @__PURE__ */ H(X, [["__scopeId", "data-v-20dcb053"]]);
export {
  Y as default
};
