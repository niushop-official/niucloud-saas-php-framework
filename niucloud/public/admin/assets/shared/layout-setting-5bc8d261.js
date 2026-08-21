import { defineComponent as S, ref as w, computed as u, resolveComponent as n, openBlock as b, createElementBlock as C, createVNode as a, unref as i, withCtx as _, createElementVNode as l, toDisplayString as p, pushScopeId as G, popScopeId as H } from "vue";
import { co as T, gT as D, gU as I, gV as v, t as d, _ as U } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const j = { class: "flex" }, B = { class: "setting-item flex items-center justify-between mb-[10px]" }, E = { class: "title text-base text-tx-secondary" }, N = { class: "" }, z = { class: "setting-item flex items-center justify-between mb-[10px]" }, M = { class: "title text-base text-tx-secondary" }, $ = { class: "" }, q = /* @__PURE__ */ S({
  __name: "layout-setting",
  setup(A) {
    const r = w(!1), e = T(), g = D(), f = I(g), c = u({
      get() {
        return e.dark;
      },
      set(s) {
        e.setTheme("dark", s), f(s), v(e.theme, e.dark ? "dark" : "light");
      }
    }), m = u({
      get() {
        return e.theme;
      },
      set(s) {
        e.setTheme("theme", s), v(e.theme, e.dark ? "dark" : "light");
      }
    });
    return (s, t) => {
      const x = n("icon"), h = n("el-switch"), k = n("el-color-picker"), y = n("el-scrollbar"), V = n("el-drawer");
      return b(), C("div", j, [
        a(x, {
          name: "element Setting",
          color: "#333",
          onClick: t[0] || (t[0] = (o) => r.value = !0)
        }),
        a(V, {
          modelValue: r.value,
          "onUpdate:modelValue": t[3] || (t[3] = (o) => r.value = o),
          title: i(d)("layout.layoutSetting"),
          size: "300px"
        }, {
          default: _(() => [
            a(y, null, {
              default: _(() => [
                l("div", B, [
                  l("div", E, p(i(d)("layout.darkMode")), 1),
                  l("div", N, [
                    a(h, {
                      modelValue: c.value,
                      "onUpdate:modelValue": t[1] || (t[1] = (o) => c.value = o),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                l("div", z, [
                  l("div", M, p(i(d)("layout.themeColor")), 1),
                  l("div", $, [
                    a(k, {
                      modelValue: m.value,
                      "onUpdate:modelValue": t[2] || (t[2] = (o) => m.value = o)
                    }, null, 8, ["modelValue"])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const W = /* @__PURE__ */ U(q, [["__scopeId", "data-v-e063248d"]]);
export {
  W as default
};
