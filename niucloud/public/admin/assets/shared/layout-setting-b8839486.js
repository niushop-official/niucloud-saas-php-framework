import { defineComponent as L, ref as m, computed as c, resolveComponent as a, openBlock as u, createElementBlock as _, createVNode as n, unref as r, withCtx as x, createElementVNode as o, toDisplayString as p, Fragment as j, renderList as z, normalizeClass as B, pushScopeId as te, popScopeId as oe } from "vue";
import { i as f, s as h, cm as E, gS as N, gT as $, gU as y, t as i, _ as F } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const M = { class: "flex" }, q = { class: "setting-item flex items-center justify-between mb-[10px]" }, A = { class: "title text-base text-tx-secondary" }, G = { class: "setting-item flex items-center justify-between mb-[10px]" }, H = { class: "title text-base text-tx-secondary" }, J = { class: "setting-item mb-[10px]" }, K = { class: "title text-base text-tx-secondary" }, O = { class: "flex mt-[10px] layout-style flex-wrap" }, P = ["onClick"], Q = ["src"], R = /* @__PURE__ */ L({
  __name: "layout-setting",
  setup(W) {
    const k = m([
      { key: "admin", image: f("static/resource/images/system/layout_bussiness.png") },
      { key: "admin_simplicity", image: f("static/resource/images/system/layout_darkside.png") }
    ]), b = m(h.get("admin_layout") || "admin"), d = m(!1), e = E(), S = N(), w = $(S), g = c({
      get() {
        return e.dark;
      },
      set(s) {
        e.setTheme("dark", s), w(s), y(e.theme, e.dark ? "dark" : "light");
      }
    }), X = c({
      get() {
        return e.sidebar;
      },
      set(s) {
        e.setTheme("sidebar", s), y(e.theme, e.dark ? "dark" : "light");
      }
    }), v = c({
      get() {
        return e.theme;
      },
      set(s) {
        e.setTheme("theme", s), y(e.theme, e.dark ? "dark" : "light");
      }
    }), V = (s) => {
      h.set({ key: "admin_layout", data: s }), location.reload();
    };
    return (s, l) => {
      const C = a("icon"), T = a("el-switch"), D = a("el-color-picker"), I = a("el-scrollbar"), U = a("el-drawer");
      return u(), _("div", M, [
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
            n(I, null, {
              default: x(() => [
                o("div", q, [
                  o("div", A, p(r(i)("layout.darkMode")), 1),
                  o("div", null, [
                    n(T, {
                      modelValue: g.value,
                      "onUpdate:modelValue": l[1] || (l[1] = (t) => g.value = t),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", G, [
                  o("div", H, p(r(i)("layout.themeColor")), 1),
                  o("div", null, [
                    n(D, {
                      modelValue: v.value,
                      "onUpdate:modelValue": l[2] || (l[2] = (t) => v.value = t)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                o("div", J, [
                  o("div", K, p(r(i)("layout.layoutStyle")), 1),
                  o("div", O, [
                    (u(!0), _(j, null, z(k.value, (t, Y) => (u(), _("div", {
                      class: B(["relative w-[125px] h-[100px] border mr-[10px] mb-[10px] hover:border-primary", { "border-primary": b.value == t.key }]),
                      onClick: (Z) => V(t.key)
                    }, [
                      o("img", {
                        src: t.image,
                        alt: "",
                        class: "w-full h-full"
                      }, null, 8, Q)
                    ], 10, P))), 256))
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
const me = /* @__PURE__ */ F(R, [["__scopeId", "data-v-bff779e0"]]);
export {
  me as default
};
