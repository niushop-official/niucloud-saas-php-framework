import { defineComponent as N, computed as v, resolveComponent as i, unref as u, openBlock as e, createElementBlock as a, Fragment as h, createBlock as l, withCtx as c, createCommentVNode as r, createElementVNode as y, toDisplayString as f, renderList as V, createTextVNode as C, pushScopeId as L, popScopeId as O } from "vue";
import { useRouter as S } from "vue-router";
import { hC as B, hA as J, a as M } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const j = { class: "aside-menu-label using-hidden" }, E = { class: "aside-menu-label using-hidden" }, q = {
  key: 0,
  class: "w-[7px] h-[7px] bg-[var(--sys-color-danger)] absolute flex items-center justify-center rounded-full top-[10px] right-[65px]"
}, A = /* @__PURE__ */ N({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    },
    level: {
      type: Number,
      default: 1
    },
    isNewVersion: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    const n = t, x = S(), o = v(() => n.routes.meta), m = v(() => {
      var s;
      return B((s = o.value) == null ? void 0 : s.icon);
    }), { handleMenuJump: g } = J(), k = (s) => {
      g(s, o.value) || x.push({ name: s });
    };
    return (s, d) => {
      const p = i("icon"), w = i("el-sub-menu"), I = i("el-menu-item");
      return u(o).show ? (e(), a(h, { key: 0 }, [
        t.routes.children ? (e(), l(w, {
          key: 0,
          index: String(t.routes.name)
        }, {
          title: c(() => [
            n.level == 1 ? (e(), l(p, {
              key: 0,
              name: u(m),
              class: "aside-menu-icon"
            }, null, 8, ["name"])) : r("", !0),
            y("span", j, f(u(o).title), 1)
          ]),
          default: c(() => [
            (e(!0), a(h, null, V(t.routes.children, (_, b) => (e(), l(D, {
              routes: _,
              level: n.level + 1,
              key: b,
              isNewVersion: n.isNewVersion
            }, null, 8, ["routes", "level", "isNewVersion"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (e(), l(I, {
          key: 1,
          index: String(t.routes.name),
          onClick: d[0] || (d[0] = (_) => k(t.routes.name))
        }, {
          title: c(() => [
            n.level == 1 ? (e(), l(p, {
              key: 0,
              name: u(m),
              class: "aside-menu-icon"
            }, null, 8, ["name"])) : r("", !0),
            y("span", E, [
              C(f(u(o).title) + " ", 1),
              u(o).view == "app/upgrade" && n.isNewVersion ? (e(), a("div", q)) : r("", !0)
            ])
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : r("", !0);
    };
  }
});
const D = /* @__PURE__ */ M(A, [["__scopeId", "data-v-a2ca9e33"]]);
export {
  D as default
};
