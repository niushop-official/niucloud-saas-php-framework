import { defineComponent as w, ref as C, computed as p, resolveComponent as i, openBlock as D, createElementBlock as I, createVNode as n, unref as a, withCtx as x, createElementVNode as o, toDisplayString as _, isRef as v, pushScopeId as J, popScopeId as K } from "vue";
import { u as T, hE as U, hF as j, hG as g, m as E, t as r, a as B } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const N = { class: "flex" }, $ = { class: "setting-item flex items-center justify-between mb-[10px]" }, z = { class: "title text-base text-tx-secondary" }, F = { class: "setting-item flex items-center justify-between mb-[10px]" }, G = { class: "title text-base text-tx-secondary" }, M = { class: "setting-item flex items-center justify-between mb-[10px]" }, R = { class: "title text-base text-tx-secondary" }, q = /* @__PURE__ */ w({
  __name: "layout-setting",
  setup(A) {
    const d = C(!1), t = T(), y = U(), h = j(y), u = p({
      get() {
        return t.dark;
      },
      set(l) {
        t.setTheme("dark", l), h(l), g(t.theme, t.dark ? "dark" : "light");
      }
    }), m = p({
      get() {
        return t.tab;
      },
      set(l) {
        t.$patch((e) => {
          e.tab = l, E.set({ key: "tab", data: l });
        });
      }
    }), c = p({
      get() {
        return t.theme;
      },
      set(l) {
        t.setTheme("theme", l), g(t.theme, t.dark ? "dark" : "light");
      }
    });
    return (l, e) => {
      const k = i("icon"), f = i("el-switch"), b = i("el-color-picker"), V = i("el-scrollbar"), S = i("el-drawer");
      return D(), I("div", N, [
        n(k, {
          name: "element Setting",
          onClick: e[0] || (e[0] = (s) => d.value = !0)
        }),
        n(S, {
          modelValue: d.value,
          "onUpdate:modelValue": e[4] || (e[4] = (s) => d.value = s),
          title: a(r)("layout.layoutSetting"),
          size: "300px"
        }, {
          default: x(() => [
            n(V, null, {
              default: x(() => [
                o("div", $, [
                  o("div", z, _(a(r)("layout.darkMode")), 1),
                  o("div", null, [
                    n(f, {
                      modelValue: a(u),
                      "onUpdate:modelValue": e[1] || (e[1] = (s) => v(u) ? u.value = s : null),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", F, [
                  o("div", G, _(a(r)("layout.themeColor")), 1),
                  o("div", null, [
                    n(b, {
                      modelValue: a(c),
                      "onUpdate:modelValue": e[2] || (e[2] = (s) => v(c) ? c.value = s : null)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", M, [
                  o("div", R, _(a(r)("layout.tab")), 1),
                  o("div", null, [
                    n(f, {
                      modelValue: a(m),
                      "onUpdate:modelValue": e[3] || (e[3] = (s) => v(m) ? m.value = s : null),
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
const Z = /* @__PURE__ */ B(q, [["__scopeId", "data-v-5eeda2f8"]]);
export {
  Z as default
};
