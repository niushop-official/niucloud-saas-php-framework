import { defineComponent as B, computed as l, resolveComponent as s, openBlock as o, createElementBlock as m, Fragment as g, renderList as y, unref as a, createBlock as p, normalizeClass as u, withCtx as d, createTextVNode as x, toDisplayString as k, createVNode as C, createElementVNode as $, createCommentVNode as z, pushScopeId as q, popScopeId as G } from "vue";
import { a as D } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "table-actions" }, F = ["title"], M = /* @__PURE__ */ B({
  __name: "index",
  props: {
    actions: { default: () => [] },
    max: { default: 2 },
    moreText: { default: "更多" }
  },
  setup(f) {
    const r = f, i = l(() => (r.actions || []).filter((e) => e && e.show !== !1)), b = l(() => i.value.length > r.max + 1), w = l(() => b.value ? i.value.slice(0, r.max) : i.value), c = l(() => b.value ? i.value.slice(r.max) : []), v = l(() => c.value.every((e) => e.disabled || e.loading)), h = (e) => e.type === "danger" ? "default" : e.type === "success" ? "success" : e.type === "warning" ? "warning" : e.type === "default" ? "default" : "primary", T = (e) => {
      const n = c.value[e];
      !n || n.disabled || n.onClick && n.onClick();
    };
    return (e, n) => {
      const A = s("el-button"), I = s("icon"), N = s("el-dropdown-item"), S = s("el-dropdown-menu"), V = s("el-dropdown");
      return o(), m("div", E, [
        (o(!0), m(g, null, y(a(w), (t, _) => (o(), p(A, {
          key: `visible-${_}`,
          type: h(t),
          class: u({ "table-delete": t.type === "danger" }),
          link: "",
          disabled: t.disabled,
          loading: t.loading,
          onClick: (L) => t.onClick && t.onClick()
        }, {
          default: d(() => [
            x(k(t.label), 1)
          ]),
          _: 2
        }, 1032, ["type", "class", "disabled", "loading", "onClick"]))), 128)),
        a(c).length ? (o(), p(V, {
          key: 0,
          trigger: "hover",
          disabled: a(v),
          onCommand: T
        }, {
          dropdown: d(() => [
            C(S, { class: "table-actions__menu" }, {
              default: d(() => [
                (o(!0), m(g, null, y(a(c), (t, _) => (o(), p(N, {
                  key: `more-${_}`,
                  command: _,
                  disabled: t.disabled || t.loading,
                  class: u({ "is-danger": t.type === "danger" })
                }, {
                  default: d(() => [
                    x(k(t.label), 1)
                  ]),
                  _: 2
                }, 1032, ["command", "disabled", "class"]))), 128))
              ]),
              _: 1
            })
          ]),
          default: d(() => [
            $("span", {
              class: u(["table-actions__more", { "is-disabled": a(v) }]),
              title: f.moreText
            }, [
              C(I, {
                name: "element MoreFilled",
                size: "14px"
              })
            ], 10, F)
          ]),
          _: 1
        }, 8, ["disabled"])) : z("", !0)
      ]);
    };
  }
});
const U = /* @__PURE__ */ D(M, [["__scopeId", "data-v-a484c556"]]);
export {
  U as default
};
