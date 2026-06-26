import { defineComponent as b, ref as w, computed as u, resolveComponent as n, openBlock as S, createElementBlock as C, createVNode as a, unref as i, withCtx as _, createElementVNode as l, toDisplayString as p } from "vue";
import { ck as D, gO as T, gP as U, gQ as v, t as d, _ as j } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "flex" }, E = { class: "setting-item flex items-center justify-between mb-[10px]" }, N = { class: "title text-base text-tx-secondary" }, z = { class: "" }, I = { class: "setting-item flex items-center justify-between mb-[10px]" }, M = { class: "title text-base text-tx-secondary" }, O = { class: "" }, P = /* @__PURE__ */ b({
  __name: "layout-setting",
  setup(Q) {
    const r = w(!1), e = D(), g = T(), f = U(g), m = u({
      get() {
        return e.dark;
      },
      set(s) {
        e.setTheme("dark", s), f(s), v(e.theme, e.dark ? "dark" : "light");
      }
    }), c = u({
      get() {
        return e.theme;
      },
      set(s) {
        e.setTheme("theme", s), v(e.theme, e.dark ? "dark" : "light");
      }
    });
    return (s, t) => {
      const k = n("icon"), x = n("el-switch"), y = n("el-color-picker"), h = n("el-scrollbar"), V = n("el-drawer");
      return S(), C("div", B, [
        a(k, {
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
            a(h, null, {
              default: _(() => [
                l("div", E, [
                  l("div", N, p(i(d)("layout.darkMode")), 1),
                  l("div", z, [
                    a(x, {
                      modelValue: m.value,
                      "onUpdate:modelValue": t[1] || (t[1] = (o) => m.value = o),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                l("div", I, [
                  l("div", M, p(i(d)("layout.themeColor")), 1),
                  l("div", O, [
                    a(y, {
                      modelValue: c.value,
                      "onUpdate:modelValue": t[2] || (t[2] = (o) => c.value = o)
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
const L = /* @__PURE__ */ j(P, [["__scopeId", "data-v-e063248d"]]);
export {
  L as default
};
