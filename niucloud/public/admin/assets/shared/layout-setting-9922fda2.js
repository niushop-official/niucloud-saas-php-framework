import { defineComponent as j, ref as m, computed as u, resolveComponent as a, openBlock as c, createElementBlock as _, createVNode as n, unref as r, withCtx as x, createElementVNode as o, toDisplayString as p, Fragment as z, renderList as B, normalizeClass as E } from "vue";
import { i as k, s as f, ck as N, gO as $, gP as F, gQ as y, t as i, _ as I } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const M = { class: "flex" }, O = { class: "setting-item flex items-center justify-between mb-[10px]" }, P = { class: "title text-base text-tx-secondary" }, Q = { class: "setting-item flex items-center justify-between mb-[10px]" }, q = { class: "title text-base text-tx-secondary" }, A = { class: "setting-item mb-[10px]" }, G = { class: "title text-base text-tx-secondary" }, H = { class: "flex mt-[10px] layout-style flex-wrap" }, J = ["onClick"], K = ["src"], R = /* @__PURE__ */ j({
  __name: "layout-setting",
  setup(W) {
    const h = m([
      { key: "admin", image: k("static/resource/images/system/layout_bussiness.png") },
      { key: "admin_simplicity", image: k("static/resource/images/system/layout_darkside.png") }
    ]), b = m(f.get("admin_layout") || "admin"), d = m(!1), e = N(), w = $(), V = F(w), g = u({
      get() {
        return e.dark;
      },
      set(s) {
        e.setTheme("dark", s), V(s), y(e.theme, e.dark ? "dark" : "light");
      }
    });
    u({
      get() {
        return e.sidebar;
      },
      set(s) {
        e.setTheme("sidebar", s), y(e.theme, e.dark ? "dark" : "light");
      }
    });
    const v = u({
      get() {
        return e.theme;
      },
      set(s) {
        e.setTheme("theme", s), y(e.theme, e.dark ? "dark" : "light");
      }
    }), S = (s) => {
      f.set({ key: "admin_layout", data: s }), location.reload();
    };
    return (s, l) => {
      const C = a("icon"), T = a("el-switch"), D = a("el-color-picker"), L = a("el-scrollbar"), U = a("el-drawer");
      return c(), _("div", M, [
        n(C, {
          name: "element Setting",
          onClick: l[0] || (l[0] = (t) => d.value = !0)
        }),
        n(U, {
          modelValue: d.value,
          "onUpdate:modelValue": l[3] || (l[3] = (t) => d.value = t),
          title: r(i)("layout.layoutSetting"),
          size: "300px"
        }, {
          default: x(() => [
            n(L, null, {
              default: x(() => [
                o("div", O, [
                  o("div", P, p(r(i)("layout.darkMode")), 1),
                  o("div", null, [
                    n(T, {
                      modelValue: g.value,
                      "onUpdate:modelValue": l[1] || (l[1] = (t) => g.value = t),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", Q, [
                  o("div", q, p(r(i)("layout.themeColor")), 1),
                  o("div", null, [
                    n(D, {
                      modelValue: v.value,
                      "onUpdate:modelValue": l[2] || (l[2] = (t) => v.value = t)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", A, [
                  o("div", G, p(r(i)("layout.layoutStyle")), 1),
                  o("div", H, [
                    (c(!0), _(z, null, B(h.value, (t, X) => (c(), _("div", {
                      class: E(["relative w-[125px] h-[100px] border mr-[10px] mb-[10px] hover:border-primary", { "border-primary": b.value == t.key }]),
                      onClick: (Y) => S(t.key)
                    }, [
                      o("img", {
                        src: t.image,
                        alt: "",
                        class: "w-full h-full"
                      }, null, 8, K)
                    ], 10, J))), 256))
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
const re = /* @__PURE__ */ I(R, [["__scopeId", "data-v-bff779e0"]]);
export {
  re as default
};
