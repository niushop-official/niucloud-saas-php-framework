import { defineComponent as ue, ref as u, computed as D, onMounted as de, resolveComponent as a, openBlock as c, createBlock as y, normalizeClass as H, unref as n, withCtx as s, createVNode as l, createElementVNode as t, createElementBlock as w, Fragment as O, renderList as P, createTextVNode as q, toDisplayString as f, createCommentVNode as pe, withDirectives as G, vModelText as J, pushScopeId as me, popScopeId as _e } from "vue";
import fe from "./index-38fee933.js";
import he from "./index-cb00d4d0.js";
import ve from "./user-info-da178bb0.js";
import ge from "./index-835144c3.js";
import { m as p, hL as xe, u as ye, h as we, t as k, a as ke } from "./core-shared-c6ad4e77.js";
import { useRoute as be, useRouter as Se } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-31b5b072.js";
const K = (b) => (me("data-v-6286118e"), b = b(), _e(), b), Ie = { class: "left-panel h-full flex items-center" }, Ce = { class: "flex items-center h-full pl-[10px]" }, Re = { class: "right-panel h-full flex items-center justify-end" }, Ve = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Le = ["title"], Te = { class: "site-status__name" }, Ee = { class: "text-[14px]" }, We = {
  key: 0,
  class: "text-[14px]"
}, Ue = {
  key: 1,
  class: "text-[14px]"
}, De = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Fe = /* @__PURE__ */ K(() => /* @__PURE__ */ t("span", { class: "header-divider" }, null, -1)), $e = ["title"], Me = /* @__PURE__ */ K(() => /* @__PURE__ */ t("span", { class: "header-divider" }, null, -1)), Ne = { class: "dialog-footer" }, ze = /* @__PURE__ */ ue({
  __name: "index",
  setup(b) {
    const Q = p.get("app_type"), F = u(), $ = u(), M = u(), X = () => {
      var e;
      return (e = F.value) == null ? void 0 : e.open();
    }, Y = () => {
      var e;
      return (e = $.value) == null ? void 0 : e.open();
    }, Z = () => {
      var e;
      return (e = M.value) == null ? void 0 : e.open();
    }, { toggle: Be } = xe(), h = ye(), ee = be(), te = Se(), N = u(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), z = we(), m = D(() => z.siteInfo), oe = D(() => h.dark), ne = z.routers, le = (e) => {
      let i = [], r = e == null ? void 0 : e.parent_route;
      for (; r; )
        r.short_title && i.unshift(r.short_title), r = r.parent_route;
      return i.join(" - ");
    }, B = (e, i = null, r = 1) => {
      let _ = [];
      return e.forEach((R) => {
        const { path: V, name: L, meta: d = {}, short_title: W, children: v } = R, T = (d.show === void 0 ? 1 : d.show) && r;
        if (d.type === 1 && T === 1) {
          const g = d.title || W || "", x = le(d), o = x ? `${x} - ${g}` : g, U = {
            path: V,
            name: L,
            title: g,
            parent_title: x,
            full_title: o
          };
          _.push(U);
        }
        v && v.length > 0 && (_ = _.concat(B(v, R, T)));
      }), _;
    }, se = B(ne), E = u(""), ie = (e) => {
      e && te.push({ name: e }), E.value = "";
    }, S = u(!1), I = u(""), C = u("");
    p.get("comparisonTokenStorage") && (I.value = p.get("comparisonTokenStorage")), p.get("comparisonSiteIdStorage") && (C.value = p.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (C.value != p.get("siteId") || I.value != p.get("token")) && (S.value = !0);
    });
    const ae = () => {
      S.value = !1, location.href = `${location.origin}/site/`;
    };
    de(() => {
      window.onresize = () => (() => {
        N.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const re = () => {
      h.$patch((e) => {
        N.value < 768 ? (e.menuDrawer = !0, e.menuIsCollapse = !1) : h.toggleMenuCollapse(!h.menuIsCollapse);
      });
    }, ce = D(() => {
      const e = ee.matched.filter((i) => i.meta.title);
      return e[0] && e[0].path == "/" && e.splice(0, 1), e;
    });
    return (e, i) => {
      const r = a("icon"), _ = a("el-breadcrumb-item"), R = a("el-breadcrumb"), V = a("el-col"), L = a("el-dropdown-item"), d = a("el-dropdown-menu"), W = a("el-dropdown"), v = a("el-option"), j = a("el-select"), T = a("el-row"), A = a("el-button"), g = a("el-dialog"), x = a("el-container");
      return c(), y(x, {
        class: H(["layout-header h-full", { "border-b border-color": !n(oe) }])
      }, {
        default: s(() => [
          l(T, { class: "w-100 h-full w-full" }, {
            default: s(() => [
              l(V, { span: 10 }, {
                default: s(() => [
                  t("div", Ie, [
                    t("div", {
                      class: "hidden-sm-and-up navbar-item flex items-center h-full cursor-pointer",
                      onClick: re
                    }, [
                      n(h).menuIsCollapse ? (c(), y(r, {
                        key: 0,
                        name: "element Expand"
                      })) : (c(), y(r, {
                        key: 1,
                        name: "element Fold"
                      }))
                    ]),
                    t("div", Ce, [
                      l(R, { separator: "/" }, {
                        default: s(() => [
                          (c(!0), w(O, null, P(n(ce), (o, U) => (c(), y(_, {
                            to: o.path,
                            class: "inter",
                            key: U
                          }, {
                            default: s(() => [
                              q(f(o.meta.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"]))), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              l(V, { span: 14 }, {
                default: s(() => [
                  t("div", Re, [
                    t("div", Ve, [
                      l(W, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: s(() => [
                          l(d, null, {
                            default: s(() => [
                              l(L, null, {
                                default: s(() => [
                                  t("div", Ee, "站点编号：" + f(n(m).site_id), 1)
                                ]),
                                _: 1
                              }),
                              l(L, null, {
                                default: s(() => [
                                  n(m).expire_time == 0 ? (c(), w("div", We, "到期时间：永久")) : (c(), w("div", Ue, "到期时间：" + f(n(m).expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: s(() => [
                          t("div", {
                            class: "site-status flex items-center",
                            title: n(m).status_name
                          }, [
                            t("span", {
                              class: H(["site-status__dot", n(m).status == 1 ? "is-success" : "is-danger"])
                            }, null, 2),
                            t("span", Te, f(n(m).site_name), 1),
                            l(r, {
                              name: "element ArrowDown",
                              size: "14px",
                              color: "var(--sys-color-text-placeholder)",
                              class: "site-status__arrow"
                            })
                          ], 8, Le)
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", De, [
                      l(j, {
                        modelValue: E.value,
                        "onUpdate:modelValue": i[0] || (i[0] = (o) => E.value = o),
                        class: "menu-search-select",
                        placeholder: n(k)("search"),
                        filterable: "",
                        onChange: ie
                      }, {
                        default: s(() => [
                          (c(!0), w(O, null, P(n(se), (o) => (c(), y(v, {
                            key: o.name,
                            label: o.full_title,
                            value: o.name
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    Fe,
                    l(ge, { class: "navbar-item" }),
                    n(Q) == "site" ? (c(), w("i", {
                      key: 0,
                      class: "navbar-item iconfont iconlingdang-xianxing cursor-pointer",
                      title: n(k)("newInfo")
                    }, null, 8, $e)) : pe("", !0),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: X
                    }, [
                      l(he, {
                        ref_key: "taskIndicatorRef",
                        ref: F
                      }, null, 512)
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: Y
                    }, [
                      l(fe, {
                        ref_key: "layoutSettingRef",
                        ref: $,
                        "show-tab": !0
                      }, null, 512)
                    ]),
                    Me,
                    t("div", {
                      class: "navbar-item navbar-item--user flex items-center h-full cursor-pointer",
                      onClick: Z
                    }, [
                      l(ve, {
                        ref_key: "userInfoRef",
                        ref: M
                      }, null, 512)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          G(t("input", {
            type: "hidden",
            "onUpdate:modelValue": i[1] || (i[1] = (o) => I.value = o)
          }, null, 512), [
            [J, I.value]
          ]),
          G(t("input", {
            type: "hidden",
            "onUpdate:modelValue": i[2] || (i[2] = (o) => C.value = o)
          }, null, 512), [
            [J, C.value]
          ]),
          l(g, {
            modelValue: S.value,
            "onUpdate:modelValue": i[3] || (i[3] = (o) => S.value = o),
            title: n(k)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1
          }, {
            footer: s(() => [
              t("span", Ne, [
                l(A, { onClick: ae }, {
                  default: s(() => [
                    q(f(n(k)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: s(() => [
              t("span", null, f(n(k)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const et = /* @__PURE__ */ ke(ze, [["__scopeId", "data-v-6286118e"]]);
export {
  et as default
};
