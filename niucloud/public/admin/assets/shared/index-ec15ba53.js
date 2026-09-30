import { defineComponent as te, ref as d, computed as S, resolveComponent as u, openBlock as a, createBlock as I, withCtx as i, createElementVNode as e, normalizeClass as b, unref as s, createVNode as l, createElementBlock as f, Fragment as w, renderList as C, createTextVNode as L, toDisplayString as p, withDirectives as E, vModelText as j, pushScopeId as oe, popScopeId as ne } from "vue";
import { _ as se } from "./logo.default-aeaa7888.js";
import { u as le, h as B, m as c, j as ie, t as _, aS as F, a as ae } from "./core-shared-c6ad4e77.js";
import { useRoute as re, useRouter as ce } from "vue-router";
import de from "./user-info-282b83bf.js";
import ue from "./index-38fee933.js";
import pe from "./index-53e23d65.js";
import me from "./index-bc96ee75.js";
import fe from "./index-cb00d4d0.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-31b5b072.js";
const g = (v) => (oe("data-v-056ff65e"), v = v(), ne(), v), _e = { class: "left-panel flex min-w-0 items-center text-[14px] leading-[1]" }, ge = /* @__PURE__ */ g(() => /* @__PURE__ */ e("img", {
  src: se,
  alt: ""
}, null, -1)), ve = { class: "left-panel__nav flex items-center" }, he = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, xe = { class: "right-panel h-full flex items-center justify-end" }, ye = /* @__PURE__ */ g(() => /* @__PURE__ */ e("span", { class: "iconfont iconguanliduan !text-primary mr-1" }, null, -1)), ke = /* @__PURE__ */ g(() => /* @__PURE__ */ e("span", { class: "text-[14px] text-primary" }, "客户端", -1)), Ie = [
  ye,
  ke
], Se = { class: "header-search flex items-center h-full" }, be = /* @__PURE__ */ g(() => /* @__PURE__ */ e("span", { class: "header-divider" }, null, -1)), we = { class: "navbar-item flex items-center h-full cursor-pointer" }, Ce = /* @__PURE__ */ g(() => /* @__PURE__ */ e("span", { class: "header-divider" }, null, -1)), Le = { class: "dialog-footer" }, Ve = { class: "flex flex-wrap" }, Re = ["onClick"], Te = ["onClick"], Ue = { class: "dialog-footer" }, Me = /* @__PURE__ */ te({
  __name: "index",
  setup(v) {
    const V = d(!1), R = d(), T = d(), U = d(), H = () => {
      var t;
      return (t = R.value) == null ? void 0 : t.open();
    }, $ = () => {
      var t;
      return (t = T.value) == null ? void 0 : t.open();
    }, O = () => {
      var t;
      return (t = U.value) == null ? void 0 : t.open();
    }, r = le(), z = re(), J = ce(), h = B(), q = S(() => h.siteInfo.icon ? h.siteInfo.icon : r.website.icon), A = S(() => h.siteInfo.logo ? h.siteInfo.logo : r.website.logo), x = d(!1), y = d(""), k = d("");
    c.get("comparisonTokenStorage") && (y.value = c.get("comparisonTokenStorage")), c.get("comparisonSiteIdStorage") && (k.value = c.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (t) => {
      document.visibilityState === "visible" && (k.value != c.get("siteId") || y.value != c.get("token")) && (x.value = !0);
    });
    const G = () => {
      x.value = !1, location.reload();
    }, K = S(() => {
      const t = z.matched.filter((n) => n.meta.title);
      return t[0] && t[0].path == "/" && t.splice(0, 1), t;
    });
    c.set({ key: "currHeadMenuName", data: "" }), r.toggleMenuCollapse(c.get("menuiscollapse") || !1);
    const P = () => {
      r.toggleMenuCollapse(!r.menuIsCollapse);
    }, Q = () => {
      window.localStorage.getItem("site.token") || (window.localStorage.setItem("site.token", F()), window.localStorage.setItem("site.comparisonTokenStorage", F())), window.localStorage.getItem("site.userinfo") || window.localStorage.setItem("site.userinfo", JSON.stringify(B().userInfo)), J.push({ path: "/home/index" });
    };
    return (t, n) => {
      const W = u("el-image"), M = u("icon"), X = u("el-breadcrumb-item"), Y = u("el-breadcrumb"), N = u("el-button"), D = u("el-dialog"), Z = u("el-container");
      return a(), I(Z, { class: "layout-header h-full w-full flex items-center justify-between" }, {
        default: i(() => [
          e("div", _e, [
            e("div", {
              class: b(["header-logo", { "is-expanded": s(r).menuIsCollapse }])
            }, [
              l(W, {
                class: "header-logo__image",
                src: s(ie)(s(r).menuIsCollapse ? s(A) : s(q)),
                fit: "contain"
              }, {
                error: i(() => [
                  ge
                ]),
                _: 1
              }, 8, ["src"])
            ], 2),
            e("div", ve, [
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: P
              }, [
                s(r).menuIsCollapse ? (a(), I(M, {
                  key: 0,
                  name: "element Fold"
                })) : (a(), I(M, {
                  key: 1,
                  name: "element Expand"
                }))
              ]),
              e("div", he, [
                l(Y, { separator: "/" }, {
                  default: i(() => [
                    (a(!0), f(w, null, C(s(K), (o, m) => (a(), I(X, {
                      key: m,
                      to: o.path,
                      class: "inter"
                    }, {
                      default: i(() => [
                        L(p(o.meta.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"]))), 128))
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          e("div", null, [
            e("div", xe, [
              e("div", {
                class: "client-entry px-[12px] mr-[8px] flex items-center cursor-pointer",
                onClick: n[0] || (n[0] = (o) => Q())
              }, Ie),
              e("div", Se, [
                l(me)
              ]),
              be,
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: H
              }, [
                l(fe, {
                  ref_key: "taskIndicatorRef",
                  ref: R
                }, null, 512)
              ]),
              e("div", we, [
                l(pe)
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: $
              }, [
                l(ue, {
                  ref_key: "layoutSettingRef",
                  ref: T,
                  "show-layout-style": !0
                }, null, 512)
              ]),
              Ce,
              e("div", {
                class: "navbar-item navbar-item--user flex items-center h-full cursor-pointer",
                onClick: O
              }, [
                l(de, {
                  ref_key: "userInfoRef",
                  ref: U
                }, null, 512)
              ])
            ])
          ]),
          E(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[1] || (n[1] = (o) => y.value = o)
          }, null, 512), [
            [j, y.value]
          ]),
          E(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[2] || (n[2] = (o) => k.value = o)
          }, null, 512), [
            [j, k.value]
          ]),
          l(D, {
            modelValue: x.value,
            "onUpdate:modelValue": n[3] || (n[3] = (o) => x.value = o),
            title: s(_)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1
          }, {
            footer: i(() => [
              e("span", Le, [
                l(N, { onClick: G }, {
                  default: i(() => [
                    L(p(s(_)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: i(() => [
              e("span", null, p(s(_)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          l(D, {
            modelValue: V.value,
            "onUpdate:modelValue": n[4] || (n[4] = (o) => V.value = o),
            title: s(_)("indexTemplate"),
            width: "550px",
            "destroy-on-close": !0
          }, {
            footer: i(() => [
              e("span", Ue, [
                l(N, {
                  type: "primary",
                  onClick: t.submitIndex
                }, {
                  default: i(() => [
                    L(p(s(_)("confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ]),
            default: i(() => [
              e("div", Ve, [
                t.index_path == "" ? (a(!0), f(w, { key: 0 }, C(t.indexList, (o, m) => (a(), f("div", { key: m }, [
                  e("div", {
                    onClick: (ee) => t.index_path = o.view_path,
                    class: b(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", o.is_use == 1 ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, p(o.name), 1)
                  ], 10, Re)
                ]))), 128)) : (a(!0), f(w, { key: 1 }, C(t.indexList, (o, m) => (a(), f("div", { key: m }, [
                  e("div", {
                    onClick: (ee) => t.index_path = o.view_path,
                    class: b(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", t.index_path == o.view_path ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, p(o.name), 1)
                  ], 10, Te)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      });
    };
  }
});
const Pe = /* @__PURE__ */ ae(Me, [["__scopeId", "data-v-056ff65e"]]);
export {
  Pe as default
};
