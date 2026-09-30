import { defineComponent as ee, ref as c, computed as L, onMounted as te, resolveComponent as a, openBlock as m, createBlock as N, normalizeClass as $, unref as n, withCtx as s, createVNode as o, createElementVNode as t, createElementBlock as S, Fragment as oe, renderList as ne, createTextVNode as B, toDisplayString as u, createCommentVNode as se, withDirectives as D, vModelText as M, pushScopeId as $e, popScopeId as Be } from "vue";
import le from "./index-38fee933.js";
import ie from "./index-bc96ee75.js";
import re from "./index-cb00d4d0.js";
import ae from "./user-info-6de724aa.js";
import ce from "./index-835144c3.js";
import { m as p, hL as de, u as ue, h as pe, t as I, a as fe } from "./core-shared-c6ad4e77.js";
import { useRoute as me, useRouter as _e } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./index-31b5b072.js";
const he = { class: "left-panel h-full flex items-center" }, xe = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, ve = { class: "right-panel h-full flex items-center justify-end" }, ge = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, ye = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, be = { class: "mr-[6px] text-[12px] !text-[#333]" }, ke = { class: "text-[14px]" }, we = {
  key: 0,
  class: "text-[14px]"
}, Se = {
  key: 1,
  class: "text-[14px]"
}, Ie = { class: "navbar-item flex items-center h-full cursor-pointer" }, Ce = ["title"], Re = { class: "dialog-footer" }, Le = /* @__PURE__ */ ee({
  __name: "index",
  setup(Te) {
    const j = p.get("app_type"), T = c(), V = c(), W = c(), z = () => {
      var e;
      return (e = T.value) == null ? void 0 : e.open();
    }, H = () => {
      var e;
      return (e = V.value) == null ? void 0 : e.open();
    }, O = () => {
      var e;
      return (e = W.value) == null ? void 0 : e.open();
    }, { toggle: Ve, isFullscreen: We } = de(), P = ue(), q = me(), A = _e(), G = c(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), E = pe(), d = L(() => E.siteInfo), J = L(() => P.dark), K = c(!1), Q = E.routers, X = (e) => {
      let l = [], i = e == null ? void 0 : e.parent_route;
      for (; i; )
        i.short_title && l.unshift(i.short_title), i = i.parent_route;
      return l.join(" - ");
    }, F = (e, l = null) => {
      let i = [];
      return e.forEach((b) => {
        const { path: k, name: w, meta: f = {}, short_title: C, children: _ } = b;
        if (f.type == 1 && f.show == 1) {
          const h = f.title || C || "", x = X(f), r = x ? `${x} - ${h}` : h, R = {
            path: k,
            name: w,
            title: h,
            parent_title: x,
            full_title: r
          };
          i.push(R);
        }
        _ && _.length > 0 && (i = i.concat(F(_, b)));
      }), i;
    }, Ee = F(Q), Fe = c(""), Ue = (e) => {
      e && (A.push({ name: e }), K.value = !1);
    }, v = c(!1), g = c(""), y = c("");
    p.get("comparisonTokenStorage") && (g.value = p.get("comparisonTokenStorage")), p.get("comparisonSiteIdStorage") && (y.value = p.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (y.value != p.get("siteId") || g.value != p.get("token")) && (v.value = !0);
    });
    const Y = () => {
      v.value = !1, location.href = `${location.origin}/site/`;
    };
    te(() => {
      window.onresize = () => (() => {
        G.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const Z = L(() => {
      const e = q.matched.filter((l) => l.meta.title);
      return e[0] && e[0].path == "/" && e.splice(0, 1), e;
    });
    return (e, l) => {
      const i = a("el-breadcrumb-item"), b = a("el-breadcrumb"), k = a("el-col"), w = a("el-dropdown-item"), f = a("el-dropdown-menu"), C = a("el-dropdown"), _ = a("el-row"), U = a("el-button"), h = a("el-dialog"), x = a("el-container");
      return m(), N(x, {
        class: $(["h-full px-[10px]", { "layout-header border-b border-color": !n(J) }])
      }, {
        default: s(() => [
          o(_, { class: "w-100 h-full w-full" }, {
            default: s(() => [
              o(k, { span: 10 }, {
                default: s(() => [
                  t("div", he, [
                    t("div", xe, [
                      o(b, { separator: "/" }, {
                        default: s(() => [
                          (m(!0), S(oe, null, ne(n(Z), (r, R) => (m(), N(i, {
                            key: R,
                            to: r.path,
                            class: "inter"
                          }, {
                            default: s(() => [
                              B(u(r.meta.title), 1)
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
              o(k, { span: 14 }, {
                default: s(() => [
                  t("div", ve, [
                    t("div", ge, [
                      o(C, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: s(() => [
                          o(f, null, {
                            default: s(() => [
                              o(w, null, {
                                default: s(() => [
                                  t("div", ke, "站点编号：" + u(n(d).site_id), 1)
                                ]),
                                _: 1
                              }),
                              o(w, null, {
                                default: s(() => [
                                  n(d).expire_time == 0 ? (m(), S("div", we, "到期时间：永久")) : (m(), S("div", Se, "到期时间：" + u(n(d).expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: s(() => [
                          t("div", ye, [
                            t("span", be, u(n(d).site_name), 1),
                            t("span", {
                              class: $(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": n(d).status == 1, "!text-[#f56c6c]": n(d).status == 3 }])
                            }, u(n(d).status_name), 3)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", Ie, [
                      o(ie)
                    ]),
                    o(ce, { class: "px-[8px]" }),
                    n(j) == "site" ? (m(), S("i", {
                      key: 0,
                      class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                      title: n(I)("newInfo")
                    }, null, 8, Ce)) : se("", !0),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: z
                    }, [
                      o(re, {
                        ref_key: "taskIndicatorRef",
                        ref: T
                      }, null, 512)
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: H
                    }, [
                      o(le, {
                        ref_key: "layoutSettingRef",
                        ref: V,
                        "show-tab": !0
                      }, null, 512)
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: O
                    }, [
                      o(ae, {
                        ref_key: "userInfoRef",
                        ref: W
                      }, null, 512)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          D(t("input", {
            type: "hidden",
            "onUpdate:modelValue": l[0] || (l[0] = (r) => g.value = r)
          }, null, 512), [
            [M, g.value]
          ]),
          D(t("input", {
            type: "hidden",
            "onUpdate:modelValue": l[1] || (l[1] = (r) => y.value = r)
          }, null, 512), [
            [M, y.value]
          ]),
          o(h, {
            modelValue: v.value,
            "onUpdate:modelValue": l[2] || (l[2] = (r) => v.value = r),
            title: n(I)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: s(() => [
              t("span", Re, [
                o(U, { onClick: Y }, {
                  default: s(() => [
                    B(u(n(I)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: s(() => [
              t("span", null, u(n(I)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const Ye = /* @__PURE__ */ fe(Le, [["__scopeId", "data-v-e080fdbd"]]);
export {
  Ye as default
};
