import { defineComponent as w, ref as S, computed as d, resolveComponent as n, openBlock as C, createElementBlock as D, createVNode as a, unref as i, withCtx as g, createElementVNode as o, toDisplayString as m } from "vue";
import { ck as T, gO as U, gP as j, gQ as f, s as B, t as r, _ as E } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const N = { class: "flex" }, $ = { class: "setting-item flex items-center justify-between mb-[10px]" }, z = { class: "title text-base text-tx-secondary" }, I = { class: "setting-item flex items-center justify-between mb-[10px]" }, M = { class: "title text-base text-tx-secondary" }, O = { class: "setting-item flex items-center justify-between mb-[10px]" }, P = { class: "title text-base text-tx-secondary" }, Q = /* @__PURE__ */ w({
  __name: "layout-setting",
  setup(q) {
    const u = S(!1), t = T(), x = U(), y = j(x), c = d({
      get() {
        return t.dark;
      },
      set(l) {
        t.setTheme("dark", l), y(l), f(t.theme, t.dark ? "dark" : "light");
      }
    }), _ = d({
      get() {
        return t.tab;
      },
      set(l) {
        t.$patch((e) => {
          e.tab = l, B.set({ key: "tab", data: l });
        });
      }
    }), p = d({
      get() {
        return t.theme;
      },
      set(l) {
        t.setTheme("theme", l), f(t.theme, t.dark ? "dark" : "light");
      }
    });
    return (l, e) => {
      const k = n("icon"), v = n("el-switch"), b = n("el-color-picker"), V = n("el-scrollbar"), h = n("el-drawer");
      return C(), D("div", N, [
        a(k, {
          name: "element Setting",
          onClick: e[0] || (e[0] = (s) => u.value = !0)
        }),
        a(h, {
          modelValue: u.value,
          "onUpdate:modelValue": e[4] || (e[4] = (s) => u.value = s),
          title: i(r)("layout.layoutSetting"),
          size: "300px"
        }, {
          default: g(() => [
            a(V, null, {
              default: g(() => [
                o("div", $, [
                  o("div", z, m(i(r)("layout.darkMode")), 1),
                  o("div", null, [
                    a(v, {
                      modelValue: c.value,
                      "onUpdate:modelValue": e[1] || (e[1] = (s) => c.value = s),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", I, [
                  o("div", M, m(i(r)("layout.themeColor")), 1),
                  o("div", null, [
                    a(b, {
                      modelValue: p.value,
                      "onUpdate:modelValue": e[2] || (e[2] = (s) => p.value = s)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", O, [
                  o("div", P, m(i(r)("layout.tab")), 1),
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
const W = /* @__PURE__ */ E(Q, [["__scopeId", "data-v-62ca2f34"]]);
export {
  W as default
};
