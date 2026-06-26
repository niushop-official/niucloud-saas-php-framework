import { defineComponent as Z, ref as w, computed as S, resolveComponent as d, openBlock as s, createBlock as p, withCtx as i, createElementVNode as e, normalizeClass as I, unref as l, createVNode as a, createElementBlock as f, Fragment as C, renderList as V, createTextVNode as L, toDisplayString as u, withDirectives as M, vModelText as D, pushScopeId as ee, popScopeId as te } from "vue";
import { _ as H } from "./logo.default-aeaa7888.js";
import { ck as oe, gN as ne, u as E, s as c, i as B, t as _, aK as F, _ as se } from "./core-shared-ca1fcae5.js";
import { useRoute as ie, useRouter as le } from "vue-router";
import re from "./user-info-b2d4dc7b.js";
import ae from "./layout-setting-9922fda2.js";
import ce from "./message-32c56eab.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "./message_empty-a77792f0.js";
import "./index-97f1117f.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-84f9cff9.js";
import "./dark-eb307d84.js";
const b = (x) => (ee("data-v-f168f374"), x = x(), te(), x), de = { class: "flex items-center" }, pe = { class: "w-full h-[40px] overflow-hidden" }, ue = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[70px]",
    src: H,
    alt: "",
    "object-fit": "contain"
  })
], -1)), me = /* @__PURE__ */ b(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[180px]",
    src: H,
    alt: "",
    "object-fit": "contain"
  })
], -1)), fe = { class: "left-panel flex items-center text-[14px] leading-[1]" }, _e = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, xe = { class: "right-panel h-full flex items-center justify-end" }, ge = /* @__PURE__ */ b(() => /* @__PURE__ */ e("span", { class: "iconfont iconguanliduan !text-primary mr-1" }, null, -1)), he = /* @__PURE__ */ b(() => /* @__PURE__ */ e("span", { class: "text-[14px] text-primary" }, "客户端", -1)), ve = [
  ge,
  he
], ye = { class: "navbar-item flex items-center h-full cursor-pointer" }, we = { class: "navbar-item flex items-center h-full cursor-pointer" }, be = { class: "navbar-item flex items-center h-full cursor-pointer" }, ke = { class: "dialog-footer" }, Se = { class: "flex flex-wrap" }, Ie = ["onClick"], Ce = ["onClick"], Ve = { class: "dialog-footer" }, Le = /* @__PURE__ */ Z({
  __name: "index",
  setup(x) {
    const T = w(!1), r = oe(), $ = ie(), O = le(), j = ne(), g = E(), z = S(() => g.siteInfo.icon ? g.siteInfo.icon : r.website.icon), A = S(() => g.siteInfo.logo ? g.siteInfo.logo : r.website.logo), h = w(!1), v = w(""), y = w("");
    c.get("comparisonTokenStorage") && (v.value = c.get("comparisonTokenStorage")), c.get("comparisonSiteIdStorage") && (y.value = c.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (o) => {
      document.visibilityState === "visible" && (y.value != c.get("siteId") || v.value != c.get("token")) && (h.value = !0);
    });
    const J = () => {
      h.value = !1, location.reload();
    }, K = () => {
      j.routeRefreshTag && j.refreshRouterView();
    }, q = S(() => {
      const o = $.matched.filter((n) => n.meta.title);
      return o[0] && o[0].path == "/" && o.splice(0, 1), o;
    });
    c.set({ key: "currHeadMenuName", data: "" }), r.toggleMenuCollapse(c.get("menuiscollapse") || !1);
    const G = () => {
      r.toggleMenuCollapse(!r.menuIsCollapse);
    }, P = () => {
      window.localStorage.getItem("site.token") || (window.localStorage.setItem("site.token", F()), window.localStorage.setItem("site.comparisonTokenStorage", F())), window.localStorage.getItem("site.userinfo") || window.localStorage.setItem("site.userinfo", JSON.stringify(E().userInfo)), O.push({ path: "/home/index" });
    };
    return (o, n) => {
      const U = d("el-image"), k = d("icon"), Q = d("el-breadcrumb-item"), W = d("el-breadcrumb"), N = d("el-button"), R = d("el-dialog"), X = d("el-container");
      return s(), p(X, { class: "h-[64px] w-full layout-admin flex items-center justify-between pr-[15px] border-b-[1px] border-solid border-[var(--el-color-info-light-8)]" }, {
        default: i(() => [
          e("div", de, [
            e("div", {
              class: I(["flex justify-center items-center flex-shrink-0", { "w-[185px]": l(r).menuIsCollapse, "w-[78px]": !l(r).menuIsCollapse }])
            }, [
              e("div", pe, [
                l(r).menuIsCollapse ? (s(), p(U, {
                  key: 1,
                  style: { width: "100%", height: "100%" },
                  src: l(B)(A.value),
                  fit: "contain"
                }, {
                  error: i(() => [
                    me
                  ]),
                  _: 1
                }, 8, ["src"])) : (s(), p(U, {
                  key: 0,
                  style: { width: "100%", height: "100%" },
                  src: l(B)(z.value),
                  fit: "contain"
                }, {
                  error: i(() => [
                    ue
                  ]),
                  _: 1
                }, 8, ["src"]))
              ])
            ], 2),
            e("div", fe, [
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: G
              }, [
                l(r).menuIsCollapse ? (s(), p(k, {
                  key: 0,
                  name: "element Fold"
                })) : (s(), p(k, {
                  key: 1,
                  name: "element Expand"
                }))
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: K
              }, [
                a(k, { name: "element Refresh" })
              ]),
              e("div", _e, [
                a(W, { separator: "/" }, {
                  default: i(() => [
                    (s(!0), f(C, null, V(q.value, (t, m) => (s(), p(Q, {
                      key: m,
                      to: t.path,
                      class: "inter"
                    }, {
                      default: i(() => [
                        L(u(t.meta.title), 1)
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
                class: "border-primary border-[1px] h-[30px] px-[15px] flex items-center rounded-[6px] mr-[10px] cursor-pointer",
                onClick: n[0] || (n[0] = (t) => P())
              }, ve),
              e("div", ye, [
                a(ce)
              ]),
              e("div", we, [
                a(ae)
              ]),
              e("div", be, [
                a(re)
              ])
            ])
          ]),
          M(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[1] || (n[1] = (t) => v.value = t)
          }, null, 512), [
            [D, v.value]
          ]),
          M(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[2] || (n[2] = (t) => y.value = t)
          }, null, 512), [
            [D, y.value]
          ]),
          a(R, {
            modelValue: h.value,
            "onUpdate:modelValue": n[3] || (n[3] = (t) => h.value = t),
            title: l(_)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1
          }, {
            footer: i(() => [
              e("span", ke, [
                a(N, { onClick: J }, {
                  default: i(() => [
                    L(u(l(_)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: i(() => [
              e("span", null, u(l(_)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          a(R, {
            modelValue: T.value,
            "onUpdate:modelValue": n[4] || (n[4] = (t) => T.value = t),
            title: l(_)("indexTemplate"),
            width: "550px",
            "destroy-on-close": !0
          }, {
            footer: i(() => [
              e("span", Ve, [
                a(N, {
                  type: "primary",
                  onClick: o.submitIndex
                }, {
                  default: i(() => [
                    L(u(l(_)("confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ]),
            default: i(() => [
              e("div", Se, [
                o.index_path == "" ? (s(!0), f(C, { key: 0 }, V(o.indexList, (t, m) => (s(), f("div", { key: m }, [
                  e("div", {
                    onClick: (Y) => o.index_path = t.view_path,
                    class: I(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", t.is_use == 1 ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, u(t.name), 1)
                  ], 10, Ie)
                ]))), 128)) : (s(!0), f(C, { key: 1 }, V(o.indexList, (t, m) => (s(), f("div", { key: m }, [
                  e("div", {
                    onClick: (Y) => o.index_path = t.view_path,
                    class: I(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", o.index_path == t.view_path ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, u(t.name), 1)
                  ], 10, Ce)
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
const Qe = /* @__PURE__ */ se(Le, [["__scopeId", "data-v-f168f374"]]);
export {
  Qe as default
};
