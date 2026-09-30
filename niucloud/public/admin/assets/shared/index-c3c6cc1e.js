import { defineComponent as oe, ref as c, computed as V, onMounted as ne, resolveComponent as r, openBlock as d, createBlock as S, normalizeClass as N, unref as o, withCtx as l, createVNode as n, createElementVNode as t, createElementBlock as I, Fragment as le, renderList as se, createTextVNode as B, toDisplayString as m, createCommentVNode as ie, withDirectives as j, vModelText as z, pushScopeId as De, popScopeId as Ne } from "vue";
import re from "./index-38fee933.js";
import ae from "./index-bc96ee75.js";
import ce from "./index-cb00d4d0.js";
import de from "./user-info-ae93588b.js";
import ue from "./index-835144c3.js";
import { m as f, hL as pe, u as me, h as fe, t as C, a as _e } from "./core-shared-c6ad4e77.js";
import { useRoute as he, useRouter as xe } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./index-31b5b072.js";
const ve = { class: "left-panel h-full flex items-center" }, ge = { class: "flex items-center h-full pl-[10px]" }, ye = { class: "right-panel h-full flex items-center justify-end" }, be = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, ke = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, we = { class: "mr-[6px] text-[12px] !text-[#333]" }, Se = { class: "text-[14px]" }, Ie = {
  key: 0,
  class: "text-[14px]"
}, Ce = {
  key: 1,
  class: "text-[14px]"
}, Re = { class: "navbar-item flex items-center h-full cursor-pointer" }, Le = ["title"], Te = { class: "dialog-footer" }, Ve = /* @__PURE__ */ oe({
  __name: "index",
  setup(Ee) {
    const H = f.get("app_type"), E = c(), W = c(), F = c(), O = () => {
      var e;
      return (e = E.value) == null ? void 0 : e.open();
    }, P = () => {
      var e;
      return (e = W.value) == null ? void 0 : e.open();
    }, q = () => {
      var e;
      return (e = F.value) == null ? void 0 : e.open();
    }, { toggle: We } = pe(), _ = me(), A = he(), G = xe(), M = c(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), U = fe(), u = V(() => U.siteInfo), J = V(() => _.dark), K = c(!1), Q = U.routers, X = (e) => {
      let i = [], s = e == null ? void 0 : e.parent_route;
      for (; s; )
        s.short_title && i.unshift(s.short_title), s = s.parent_route;
      return i.join(" - ");
    }, $ = (e, i = null) => {
      let s = [];
      return e.forEach((k) => {
        const { path: R, name: w, meta: p = {}, short_title: L, children: h } = k;
        if (p.type == 1 && p.show == 1) {
          const x = p.title || L || "", v = X(p), T = v ? `${v} - ${x}` : x, a = {
            path: R,
            name: w,
            title: x,
            parent_title: v,
            full_title: T
          };
          s.push(a);
        }
        h && h.length > 0 && (s = s.concat($(h, k)));
      }), s;
    }, Fe = $(Q), Me = c(""), Ue = (e) => {
      e && (G.push({ name: e }), K.value = !1);
    }, g = c(!1), y = c(""), b = c("");
    f.get("comparisonTokenStorage") && (y.value = f.get("comparisonTokenStorage")), f.get("comparisonSiteIdStorage") && (b.value = f.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (b.value != f.get("siteId") || y.value != f.get("token")) && (g.value = !0);
    });
    const Y = () => {
      g.value = !1, location.href = `${location.origin}/site/`;
    };
    ne(() => {
      window.onresize = () => (() => {
        M.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const Z = () => {
      _.$patch((e) => {
        M.value < 768 ? (e.menuDrawer = !0, e.menuIsCollapse = !1) : _.toggleMenuCollapse(!_.menuIsCollapse);
      });
    }, ee = V(() => {
      const e = A.matched.filter((i) => i.meta.title);
      return e[0] && e[0].path == "/" && e.splice(0, 1), e;
    });
    return (e, i) => {
      const s = r("icon"), k = r("el-breadcrumb-item"), R = r("el-breadcrumb"), w = r("el-col"), p = r("el-dropdown-item"), L = r("el-dropdown-menu"), h = r("el-dropdown"), D = r("el-row"), x = r("el-button"), v = r("el-dialog"), T = r("el-container");
      return d(), S(T, {
        class: N(["h-full px-[10px]", { "layout-header border-b border-color": !o(J) }])
      }, {
        default: l(() => [
          n(D, { class: "w-100 h-full w-full" }, {
            default: l(() => [
              n(w, { span: 10 }, {
                default: l(() => [
                  t("div", ve, [
                    t("div", {
                      class: "hidden-sm-and-up navbar-item flex items-center h-full cursor-pointer",
                      onClick: Z
                    }, [
                      o(_).menuIsCollapse ? (d(), S(s, {
                        key: 0,
                        name: "element Expand"
                      })) : (d(), S(s, {
                        key: 1,
                        name: "element Fold"
                      }))
                    ]),
                    t("div", ge, [
                      n(R, { separator: "/" }, {
                        default: l(() => [
                          (d(!0), I(le, null, se(o(ee), (a, te) => (d(), S(k, {
                            key: te,
                            to: a.path,
                            class: "inter"
                          }, {
                            default: l(() => [
                              B(m(a.meta.title), 1)
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
              n(w, { span: 14 }, {
                default: l(() => [
                  t("div", ye, [
                    t("div", be, [
                      n(h, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: l(() => [
                          n(L, null, {
                            default: l(() => [
                              n(p, null, {
                                default: l(() => [
                                  t("div", Se, "站点编号：" + m(o(u).site_id), 1)
                                ]),
                                _: 1
                              }),
                              n(p, null, {
                                default: l(() => [
                                  o(u).expire_time == 0 ? (d(), I("div", Ie, "到期时间：永久")) : (d(), I("div", Ce, "到期时间：" + m(o(u).expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: l(() => [
                          t("div", ke, [
                            t("span", we, m(o(u).site_name), 1),
                            t("span", {
                              class: N(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": o(u).status == 1, "!text-[#f56c6c]": o(u).status == 3 }])
                            }, m(o(u).status_name), 3)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", Re, [
                      n(ae)
                    ]),
                    n(ue, { class: "px-[8px]" }),
                    o(H) == "site" ? (d(), I("i", {
                      key: 0,
                      class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                      title: o(C)("newInfo")
                    }, null, 8, Le)) : ie("", !0),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: O
                    }, [
                      n(ce, {
                        ref_key: "taskIndicatorRef",
                        ref: E
                      }, null, 512)
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: P
                    }, [
                      n(re, {
                        ref_key: "layoutSettingRef",
                        ref: W,
                        "show-tab": !0
                      }, null, 512)
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: q
                    }, [
                      n(de, {
                        ref_key: "userInfoRef",
                        ref: F
                      }, null, 512)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          j(t("input", {
            type: "hidden",
            "onUpdate:modelValue": i[0] || (i[0] = (a) => y.value = a)
          }, null, 512), [
            [z, y.value]
          ]),
          j(t("input", {
            type: "hidden",
            "onUpdate:modelValue": i[1] || (i[1] = (a) => b.value = a)
          }, null, 512), [
            [z, b.value]
          ]),
          n(v, {
            modelValue: g.value,
            "onUpdate:modelValue": i[2] || (i[2] = (a) => g.value = a),
            title: o(C)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: l(() => [
              t("span", Te, [
                n(x, { onClick: Y }, {
                  default: l(() => [
                    B(m(o(C)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: l(() => [
              t("span", null, m(o(C)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const Ze = /* @__PURE__ */ _e(Ve, [["__scopeId", "data-v-45afb39f"]]);
export {
  Ze as default
};
