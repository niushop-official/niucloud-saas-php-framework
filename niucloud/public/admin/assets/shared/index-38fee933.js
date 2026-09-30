import { defineComponent as z, ref as x, computed as g, resolveComponent as i, openBlock as r, createElementBlock as d, createVNode as n, unref as a, withCtx as k, createElementVNode as t, toDisplayString as m, isRef as h, createCommentVNode as w, Fragment as F, renderList as $, normalizeClass as G, pushScopeId as re, popScopeId as de } from "vue";
import { j as S, m as f, u as M, hE as R, hF as q, hG as V, t as u, a as A } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const H = { class: "layout-setting-trigger navbar-hit" }, J = { class: "setting-item flex items-center justify-between mb-[10px]" }, K = { class: "title text-base text-tx-secondary" }, O = { class: "setting-item flex items-center justify-between mb-[10px]" }, P = { class: "title text-base text-tx-secondary" }, Q = {
  key: 0,
  class: "setting-item flex items-center justify-between mb-[10px]"
}, W = { class: "title text-base text-tx-secondary" }, X = {
  key: 1,
  class: "setting-item mb-[10px]"
}, Y = { class: "title text-base text-tx-secondary" }, Z = { class: "flex mt-[10px] layout-style flex-wrap" }, ee = ["onClick"], te = ["src"], oe = /* @__PURE__ */ z({
  __name: "index",
  props: {
    /** 展示「标签栏」开关 */
    showTab: { type: Boolean, default: !1 },
    /** 展示「布局风格」选择（admin 系布局） */
    showLayoutStyle: { type: Boolean, default: !1 },
    /** 图标颜色，默认跟随主题变量 */
    iconColor: { type: String, default: "var(--color)" }
  },
  setup(c, { expose: C }) {
    const le = c, T = x([
      { key: "admin", image: S("static/resource/images/system/layout_bussiness.png") },
      { key: "admin_simplicity", image: S("static/resource/images/system/layout_darkside.png") }
    ]), L = x(f.get("admin_layout") || "admin"), p = x(!1), o = M(), j = R(), B = q(j), _ = g({
      get() {
        return o.dark;
      },
      set(l) {
        o.setTheme("dark", l), B(l), V(o.theme, o.dark ? "dark" : "light");
      }
    }), y = g({
      get() {
        return o.tab;
      },
      set(l) {
        o.$patch((s) => {
          s.tab = l, f.set({ key: "tab", data: l });
        });
      }
    }), v = g({
      get() {
        return o.theme;
      },
      set(l) {
        o.setTheme("theme", l), V(o.theme, o.dark ? "dark" : "light");
      }
    }), D = (l) => {
      f.set({ key: "admin_layout", data: l }), location.reload();
    };
    return C({ open: () => {
      p.value = !0;
    } }), (l, s) => {
      const I = i("icon"), b = i("el-switch"), U = i("el-color-picker"), E = i("el-scrollbar"), N = i("el-drawer");
      return r(), d("div", H, [
        n(I, {
          name: "element Setting",
          color: c.iconColor
        }, null, 8, ["color"]),
        n(N, {
          modelValue: p.value,
          "onUpdate:modelValue": s[3] || (s[3] = (e) => p.value = e),
          title: a(u)("layout.layoutSetting"),
          size: "300px"
        }, {
          default: k(() => [
            n(E, null, {
              default: k(() => [
                t("div", J, [
                  t("div", K, m(a(u)("layout.darkMode")), 1),
                  t("div", null, [
                    n(b, {
                      modelValue: a(_),
                      "onUpdate:modelValue": s[0] || (s[0] = (e) => h(_) ? _.value = e : null),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                t("div", O, [
                  t("div", P, m(a(u)("layout.themeColor")), 1),
                  t("div", null, [
                    n(U, {
                      modelValue: a(v),
                      "onUpdate:modelValue": s[1] || (s[1] = (e) => h(v) ? v.value = e : null)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                c.showTab ? (r(), d("div", Q, [
                  t("div", W, m(a(u)("layout.tab")), 1),
                  t("div", null, [
                    n(b, {
                      modelValue: a(y),
                      "onUpdate:modelValue": s[2] || (s[2] = (e) => h(y) ? y.value = e : null),
                      "active-value": !0,
                      "inactive-value": !1
                    }, null, 8, ["modelValue"])
                  ])
                ])) : w("", !0),
                c.showLayoutStyle ? (r(), d("div", X, [
                  t("div", Y, m(a(u)("layout.layoutStyle")), 1),
                  t("div", Z, [
                    (r(!0), d(F, null, $(T.value, (e, ae) => (r(), d("div", {
                      class: G(["relative w-[125px] h-[100px] border mr-[10px] mb-[10px] hover:border-primary", { "border-primary": L.value == e.key }]),
                      onClick: (ne) => D(e.key)
                    }, [
                      t("img", {
                        src: e.image,
                        alt: "",
                        class: "w-full h-full"
                      }, null, 8, te)
                    ], 10, ee))), 256))
                  ])
                ])) : w("", !0)
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
const xe = /* @__PURE__ */ A(oe, [["__scopeId", "data-v-60400a1e"]]);
export {
  xe as default
};
