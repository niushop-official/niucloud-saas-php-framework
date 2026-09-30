import { defineComponent as B, computed as p, resolveComponent as u, unref as e, openBlock as s, createElementBlock as d, Fragment as y, createBlock as l, withCtx as _, createElementVNode as f, toDisplayString as k, renderList as J, createCommentVNode as w, pushScopeId as $, popScopeId as z } from "vue";
import { useRouter as L, useRoute as V } from "vue-router";
import { hC as q, hA as D, aQ as g, m as h, a as E } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const N = { class: "menu-icon-slot w-[25px] h-full flex items-center justify-center" }, R = { class: "text-[14px]" }, F = {
  key: 0,
  class: "menu-icon-slot w-[25px] h-full flex items-center justify-center"
}, K = { class: "text-[14px]" }, O = /* @__PURE__ */ B({
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
  setup(c) {
    const i = c, I = L(), M = V(), n = p(() => i.routes.meta), v = p(() => {
      var t;
      return q((t = n.value) == null ? void 0 : t.icon);
    }), { handleMenuJump: S } = D(), C = p(() => !i.routes.children || !Array.isArray(i.routes.children) ? !1 : i.routes.children.some((t) => {
      var o;
      return ((o = t.meta) == null ? void 0 : o.show) === 1;
    })), b = (t) => {
      const o = h.get("specialMenuNames"), r = h.get("specialMenuNamesLevel1");
      if (o.includes(t) || h.remove("activeAppKey"), r.includes(t) && (t = "addon_list"), S(t, n.value))
        return;
      const m = M.name === t ? { refresh: Date.now() } : {};
      I.push({ name: t, query: m });
    };
    return (t, o) => {
      const r = u("el-image"), a = u("icon"), m = u("el-sub-menu"), A = u("el-menu-item");
      return e(n).show ? (s(), d(y, { key: 0 }, [
        e(C) ? (s(), l(m, {
          key: 0,
          index: String(c.routes.name)
        }, {
          title: _(() => [
            f("div", N, [
              e(n).icon && e(g)(e(n).icon) ? (s(), l(r, {
                key: 0,
                class: "w-[16px] h-[16px] overflow-hidden",
                src: e(n).icon,
                fit: "fill"
              }, null, 8, ["src"])) : (s(), l(a, {
                key: 1,
                name: e(v)
              }, null, 8, ["name"]))
            ]),
            f("span", R, k(e(n).title), 1)
          ]),
          default: _(() => [
            (s(!0), d(y, null, J(c.routes.children, (x, j) => (s(), l(Q, {
              routes: x,
              key: j,
              level: i.level + 1
            }, null, 8, ["routes", "level"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (s(), l(A, {
          key: 1,
          index: String(c.routes.name),
          onClick: o[0] || (o[0] = (x) => b(c.routes.name))
        }, {
          title: _(() => [
            i.level == 1 ? (s(), d("div", F, [
              e(n).icon && e(g)(e(n).icon) ? (s(), l(r, {
                key: 0,
                class: "w-[16px] h-[16px] overflow-hidden",
                src: e(n).icon,
                fit: "fill"
              }, null, 8, ["src"])) : (s(), l(a, {
                key: 1,
                name: e(v)
              }, null, 8, ["name"]))
            ])) : w("", !0),
            f("span", K, k(e(n).title), 1)
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : w("", !0);
    };
  }
});
const Q = /* @__PURE__ */ E(O, [["__scopeId", "data-v-6f0168a6"]]);
export {
  Q as default
};
