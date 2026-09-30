import { defineComponent as ie, computed as R, ref as p, resolveComponent as i, openBlock as m, createBlock as L, withCtx as l, createElementVNode as t, normalizeClass as z, unref as o, createVNode as n, createElementBlock as T, Fragment as ae, renderList as re, createTextVNode as H, toDisplayString as g, createCommentVNode as ce, withDirectives as A, vModelText as O, pushScopeId as ue, popScopeId as de } from "vue";
import { _ as pe } from "./logo.default-aeaa7888.js";
import { u as me, h as _e, m as c, j as fe, t as V, a as he } from "./core-shared-c6ad4e77.js";
import { useRoute as ge, useRouter as ve } from "vue-router";
import xe from "./user-info-b5649b1f.js";
import ye from "./index-835144c3.js";
import ke from "./index-38fee933.js";
import we from "./index-cb00d4d0.js";
import be from "./index-bc96ee75.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-31b5b072.js";
const N = (y) => (ue("data-v-710f8a13"), y = y(), de(), y), Ie = { class: "left-panel flex min-w-0 items-center text-[14px] leading-[1]" }, Se = /* @__PURE__ */ N(() => /* @__PURE__ */ t("img", {
  src: pe,
  alt: ""
}, null, -1)), Ce = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, Re = { class: "right-panel h-full flex items-center justify-end" }, Le = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Te = ["title"], Ve = { class: "site-status__name" }, Ue = { class: "text-[14px]" }, Me = {
  key: 0,
  class: "text-[14px]"
}, Ee = {
  key: 1,
  class: "text-[14px]"
}, Ne = { class: "header-search flex items-center h-full" }, je = /* @__PURE__ */ N(() => /* @__PURE__ */ t("span", { class: "header-divider" }, null, -1)), De = ["title"], Be = /* @__PURE__ */ N(() => /* @__PURE__ */ t("span", { class: "header-divider" }, null, -1)), Fe = { class: "dialog-footer" }, $e = /* @__PURE__ */ ie({
  __name: "index",
  setup(y) {
    const u = me(), P = ge(), q = ve(), f = _e(), G = f.routers, h = R(() => f.siteInfo), J = R(() => f.siteInfo.icon ? f.siteInfo.icon : u.website.icon), K = R(() => f.siteInfo.logo ? f.siteInfo.logo : u.website.logo), k = p(!1), w = p(""), b = p("");
    c.get("comparisonTokenStorage") && (w.value = c.get("comparisonTokenStorage")), c.get("comparisonSiteIdStorage") && (b.value = c.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (b.value != c.get("siteId") || w.value != c.get("token")) && (k.value = !0);
    });
    const Q = (e) => {
      let s = [], a = e == null ? void 0 : e.parent_route;
      for (; a; )
        a.short_title && s.unshift(a.short_title), a = a.parent_route;
      return s.join(" - ");
    }, j = (e, s = null, a = 1) => {
      let d = [];
      return e.forEach((I) => {
        const { path: U, name: S, meta: _ = {}, short_title: M, children: v } = I, C = (_.show === void 0 ? 1 : _.show) && a;
        if (_.type === 1 && C === 1) {
          const x = _.title || M || "", E = Q(_), se = E ? `${E} - ${x}` : x, le = {
            path: U,
            name: S,
            title: x,
            parent_title: E,
            full_title: se
          };
          d.push(le);
        }
        v && v.length > 0 && (d = d.concat(j(v, I, C)));
      }), d;
    }, W = p(!1), ze = p(""), He = j(G), Ae = (e) => {
      e && (q.push({ name: e }), W.value = !1);
    }, X = () => {
      k.value = !1, location.reload();
    }, Y = R(() => {
      const e = P.matched.filter((s) => s.meta.title);
      return e[0] && e[0].path == "/" && e.splice(0, 1), e;
    });
    c.set({ key: "currHeadMenuName", data: "" }), u.toggleMenuCollapse(c.get("menuiscollapse") || !1);
    const Z = () => {
      u.toggleMenuCollapse(!u.menuIsCollapse);
    }, ee = c.get("app_type"), D = p(), B = p(), F = p(), te = () => {
      var e;
      return (e = D.value) == null ? void 0 : e.open();
    }, oe = () => {
      var e;
      return (e = B.value) == null ? void 0 : e.open();
    }, ne = () => {
      var e;
      return (e = F.value) == null ? void 0 : e.open();
    };
    return (e, s) => {
      const a = i("el-image"), d = i("icon"), I = i("el-breadcrumb-item"), U = i("el-breadcrumb"), S = i("el-dropdown-item"), _ = i("el-dropdown-menu"), M = i("el-dropdown"), v = i("el-button"), $ = i("el-dialog"), C = i("el-container");
      return m(), L(C, { class: "layout-lightside__header w-full flex items-center justify-between" }, {
        default: l(() => [
          t("div", Ie, [
            t("div", {
              class: z(["header-logo", { "is-expanded": o(u).menuIsCollapse }])
            }, [
              n(a, {
                class: "header-logo__image",
                src: o(fe)(o(u).menuIsCollapse ? o(K) : o(J)),
                fit: "contain"
              }, {
                error: l(() => [
                  Se
                ]),
                _: 1
              }, 8, ["src"])
            ], 2),
            t("div", {
              class: "navbar-item flex items-center h-full cursor-pointer",
              onClick: Z
            }, [
              o(u).menuIsCollapse ? (m(), L(d, {
                key: 0,
                name: "element Fold"
              })) : (m(), L(d, {
                key: 1,
                name: "element Expand"
              }))
            ]),
            t("div", Ce, [
              n(U, { separator: "/" }, {
                default: l(() => [
                  (m(!0), T(ae, null, re(o(Y), (r, x) => (m(), L(I, {
                    key: x,
                    to: r.path,
                    class: "inter"
                  }, {
                    default: l(() => [
                      H(g(r.meta.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["to"]))), 128))
                ]),
                _: 1
              })
            ])
          ]),
          t("div", null, [
            t("div", Re, [
              t("div", Le, [
                n(M, {
                  trigger: "hover",
                  "hide-on-click": !1,
                  "popper-class": "site-info-wrap",
                  class: "mr-[8px]"
                }, {
                  dropdown: l(() => [
                    n(_, null, {
                      default: l(() => [
                        n(S, null, {
                          default: l(() => [
                            t("div", Ue, "站点编号：" + g(o(h).site_id), 1)
                          ]),
                          _: 1
                        }),
                        n(S, null, {
                          default: l(() => [
                            o(h).expire_time == 0 ? (m(), T("div", Me, "到期时间：永久")) : (m(), T("div", Ee, "到期时间：" + g(o(h).expire_time), 1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  default: l(() => [
                    t("div", {
                      class: "site-status flex items-center",
                      title: o(h).status_name
                    }, [
                      t("span", {
                        class: z(["site-status__dot", o(h).status == 1 ? "is-success" : "is-danger"])
                      }, null, 2),
                      t("span", Ve, g(o(h).site_name), 1),
                      n(d, {
                        name: "element ArrowDown",
                        size: "14px",
                        color: "var(--sys-color-text-placeholder)",
                        class: "site-status__arrow"
                      })
                    ], 8, Te)
                  ]),
                  _: 1
                })
              ]),
              t("div", Ne, [
                n(be)
              ]),
              je,
              n(ye, { class: "navbar-item" }),
              o(ee) == "site" ? (m(), T("i", {
                key: 0,
                class: "navbar-item iconfont iconlingdang-xianxing cursor-pointer",
                title: o(V)("newInfo")
              }, null, 8, De)) : ce("", !0),
              t("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: te
              }, [
                n(we, {
                  ref_key: "taskIndicatorRef",
                  ref: D
                }, null, 512)
              ]),
              t("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: oe
              }, [
                n(ke, {
                  ref_key: "layoutSettingRef",
                  ref: B,
                  "show-tab": !0
                }, null, 512)
              ]),
              Be,
              t("div", {
                class: "navbar-item navbar-item--user flex items-center h-full cursor-pointer",
                onClick: ne
              }, [
                n(xe, {
                  ref_key: "userInfoRef",
                  ref: F
                }, null, 512)
              ])
            ])
          ]),
          A(t("input", {
            type: "hidden",
            "onUpdate:modelValue": s[0] || (s[0] = (r) => w.value = r)
          }, null, 512), [
            [O, w.value]
          ]),
          A(t("input", {
            type: "hidden",
            "onUpdate:modelValue": s[1] || (s[1] = (r) => b.value = r)
          }, null, 512), [
            [O, b.value]
          ]),
          n($, {
            modelValue: k.value,
            "onUpdate:modelValue": s[2] || (s[2] = (r) => k.value = r),
            title: o(V)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: l(() => [
              t("span", Fe, [
                n(v, { onClick: X }, {
                  default: l(() => [
                    H(g(o(V)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: l(() => [
              t("span", null, g(o(V)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      });
    };
  }
});
const st = /* @__PURE__ */ he($e, [["__scopeId", "data-v-710f8a13"]]);
export {
  st as default
};
