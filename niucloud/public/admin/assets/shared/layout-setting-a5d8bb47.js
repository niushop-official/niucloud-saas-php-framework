import { defineComponent as S, ref as w, computed as u, resolveComponent as n, openBlock as C, createElementBlock as T, createVNode as a, unref as i, withCtx as f, createElementVNode as o, toDisplayString as c, pushScopeId as J, popScopeId as K } from "vue";
import { co as U, gT as D, gU as I, gV as g, s as j, t as r, _ as B } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "flex" }, N = { class: "setting-item flex items-center justify-between mb-[10px]" }, $ = { class: "title text-base text-tx-secondary" }, z = { class: "setting-item flex items-center justify-between mb-[10px]" }, M = { class: "title text-base text-tx-secondary" }, q = { class: "setting-item flex items-center justify-between mb-[10px]" }, A = { class: "title text-base text-tx-secondary" }, F = /* @__PURE__ */ S({
  __name: "layout-setting",
  setup(G) {
    const d = w(!1), t = U(), x = D(), y = I(x), m = u({
      get() {
        return t.dark;
      },
      set(l) {
        t.setTheme("dark", l), y(l), g(t.theme, t.dark ? "dark" : "light");
      }
    }), _ = u({
      get() {
        return t.tab;
      },
      set(l) {
        t.$patch((e) => {
          e.tab = l, j.set({ key: "tab", data: l });
        });
      }
    }), p = u({
      get() {
        return t.theme;
      },
      set(l) {
        t.setTheme("theme", l), g(t.theme, t.dark ? "dark" : "light");
      }
    });
    return (l, e) => {
      const k = n("icon"), v = n("el-switch"), b = n("el-color-picker"), h = n("el-scrollbar"), V = n("el-drawer");
      return C(), T("div", E, [
        a(k, {
          name: "element Setting",
          onClick: e[0] || (e[0] = (s) => d.value = !0)
        }),
        a(V, {
          modelValue: d.value,
          "onUpdate:modelValue": e[4] || (e[4] = (s) => d.value = s),
          title: i(r)("layout.layoutSetting"),
          size: "300px"
        }, {
          default: f(() => [
            a(h, null, {
              default: f(() => [
                o("div", N, [
                  o("div", $, c(i(r)("layout.darkMode")), 1),
                  o("div", null, [
                    a(v, {
                      modelValue: m.value,
                      "onUpdate:modelValue": e[1] || (e[1] = (s) => m.value = s),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", z, [
                  o("div", M, c(i(r)("layout.themeColor")), 1),
                  o("div", null, [
                    a(b, {
                      modelValue: p.value,
                      "onUpdate:modelValue": e[2] || (e[2] = (s) => p.value = s)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", q, [
                  o("div", A, c(i(r)("layout.tab")), 1),
                  o("div", null, [
                    a(v, {
                      modelValue: _.value,
                      "onUpdate:modelValue": e[3] || (e[3] = (s) => _.value = s),
                      "active-value": !0,
                      "inactive-value": !1
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
const Y = /* @__PURE__ */ B(F, [["__scopeId", "data-v-62ca2f34"]]);
export {
  Y as default
};
