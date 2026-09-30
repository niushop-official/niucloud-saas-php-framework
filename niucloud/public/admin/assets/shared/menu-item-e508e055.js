import { defineComponent as N, computed as f, resolveComponent as l, unref as u, openBlock as e, createElementBlock as a, Fragment as v, createBlock as r, withCtx as m, createCommentVNode as i, createElementVNode as h, toDisplayString as x, renderList as V, createTextVNode as C, pushScopeId as L, popScopeId as O } from "vue";
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
    const n = t, y = S(), o = f(() => n.routes.meta), c = f(() => {
      var s;
      return B((s = o.value) == null ? void 0 : s.icon);
    }), { handleMenuJump: b } = J(), g = (s) => {
      b(s, o.value) || y.push({ name: s });
    };
    return (s, d) => {
      const p = l("icon"), k = l("el-sub-menu"), w = l("el-menu-item");
      return u(o).show ? (e(), a(v, { key: 0 }, [
        t.routes.children ? (e(), r(k, {
          key: 0,
          index: String(t.routes.name)
        }, {
          title: m(() => [
            n.level == 1 ? (e(), r(p, {
              key: 0,
              name: u(c),
              class: "aside-menu-icon"
            }, null, 8, ["name"])) : i("", !0),
            h("span", j, x(u(o).title), 1)
          ]),
          default: m(() => [
            (e(!0), a(v, null, V(t.routes.children, (_, I) => (e(), r(D, {
              routes: _,
              level: n.level + 1,
              key: I,
              isNewVersion: n.isNewVersion
            }, null, 8, ["routes", "level", "isNewVersion"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (e(), r(w, {
          key: 1,
          index: String(t.routes.name),
          onClick: d[0] || (d[0] = (_) => g(t.routes.name))
        }, {
          title: m(() => [
            n.level == 1 ? (e(), r(p, {
              key: 0,
              name: u(c),
              class: "aside-menu-icon"
            }, null, 8, ["name"])) : i("", !0),
            h("span", E, [
              C(x(u(o).title) + " ", 1),
              u(o).view == "app/upgrade" && n.isNewVersion ? (e(), a("div", q)) : i("", !0)
            ])
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : i("", !0);
    };
  }
});
const D = /* @__PURE__ */ M(A, [["__scopeId", "data-v-1fd310b3"]]);
export {
  D as default
};
