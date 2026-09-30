import { defineComponent as Z, ref as d, computed as U, resolveComponent as r, openBlock as l, createBlock as y, withCtx as i, createElementVNode as e, createVNode as s, unref as a, createElementBlock as f, Fragment as k, renderList as b, createTextVNode as w, toDisplayString as p, withDirectives as M, vModelText as N, normalizeClass as D, pushScopeId as ee, popScopeId as te } from "vue";
import { _ as oe } from "./logo.default-aeaa7888.js";
import { u as ne, m as c, j as se, t as _, aS as E, h as ie, a as le } from "./core-shared-c6ad4e77.js";
import { useRoute as ae, useRouter as re } from "vue-router";
import ce from "./user-info-544011ae.js";
import de from "./index-38fee933.js";
import pe from "./index-53e23d65.js";
import ue from "./index-bc96ee75.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./index-31b5b072.js";
const S = (x) => (ee("data-v-d1b74827"), x = x(), te(), x), me = { class: "flex items-center" }, fe = { class: "max-w-[120px] flex justify-center items-center flex-shrink-0" }, _e = { class: "max-w-[120px] h-[40px] overflow-hidden" }, xe = /* @__PURE__ */ S(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[120px]",
    src: oe,
    alt: "",
    "object-fit": "contain"
  })
], -1)), ve = { class: "left-panel flex items-center text-[14px] leading-[1]" }, ge = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, he = { class: "right-panel h-full flex items-center justify-end" }, ye = /* @__PURE__ */ S(() => /* @__PURE__ */ e("span", { class: "iconfont iconguanliduan !text-primary mr-1" }, null, -1)), ke = /* @__PURE__ */ S(() => /* @__PURE__ */ e("span", { class: "text-[14px] text-primary" }, "客户端", -1)), be = [
  ye,
  ke
], we = { class: "navbar-item flex items-center h-full cursor-pointer" }, Se = { class: "navbar-item flex items-center h-full cursor-pointer" }, Ie = { class: "dialog-footer" }, Ce = { class: "flex flex-wrap" }, Ve = ["onClick"], Le = ["onClick"], Re = { class: "dialog-footer" }, Te = /* @__PURE__ */ Z({
  __name: "index",
  setup(x) {
    const I = d(!1), C = d(), V = d(), L = d(), B = () => {
      var t;
      return (t = C.value) == null ? void 0 : t.open();
    }, F = () => {
      var t;
      return (t = V.value) == null ? void 0 : t.open();
    }, H = () => {
      var t;
      return (t = L.value) == null ? void 0 : t.open();
    }, $ = ae(), O = re(), u = ne(), z = U(() => u.website), v = d(!1), g = d(""), h = d("");
    c.get("comparisonTokenStorage") && (g.value = c.get("comparisonTokenStorage")), c.get("comparisonSiteIdStorage") && (h.value = c.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (t) => {
      document.visibilityState === "visible" && (h.value != c.get("siteId") || g.value != c.get("token")) && (v.value = !0);
    }), u.toggleMenuCollapse(c.get("menuiscollapse") || !1);
    const J = () => {
      v.value = !1, location.reload();
    }, q = U(() => {
      const t = $.matched.filter((n) => n.meta.title);
      return t[0] && t[0].path == "/" && t.splice(0, 1), t;
    });
    c.set({ key: "currHeadMenuName", data: "" });
    const A = () => {
      u.toggleMenuCollapse(!u.menuIsCollapse);
    }, G = () => {
      window.localStorage.getItem("site.token") || (window.localStorage.setItem("site.token", E()), window.localStorage.setItem("site.comparisonTokenStorage", E())), window.localStorage.getItem("site.userinfo") || window.localStorage.setItem("site.userinfo", JSON.stringify(ie().userInfo)), O.push({ path: "/home/index" });
    };
    return (t, n) => {
      const K = r("el-image"), R = r("icon"), P = r("el-breadcrumb-item"), Q = r("el-breadcrumb"), W = r("task-indicator"), T = r("el-button"), j = r("el-dialog"), X = r("el-container");
      return l(), y(X, { class: "h-[64px] layout-admin flex items-center justify-between px-[15px]" }, {
        default: i(() => [
          e("div", me, [
            e("div", fe, [
              e("div", _e, [
                s(K, {
                  class: "w-full h-full",
                  src: a(se)(a(z).icon),
                  fit: "contain"
                }, {
                  error: i(() => [
                    xe
                  ]),
                  _: 1
                }, 8, ["src"])
              ])
            ]),
            e("div", ve, [
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: A
              }, [
                a(u).menuIsCollapse ? (l(), y(R, {
                  key: 0,
                  name: "element Expand"
                })) : (l(), y(R, {
                  key: 1,
                  name: "element Fold"
                }))
              ]),
              e("div", ge, [
                s(Q, { separator: "/" }, {
                  default: i(() => [
                    (l(!0), f(k, null, b(a(q), (o, m) => (l(), y(P, {
                      key: m,
                      to: o.path,
                      class: "inter"
                    }, {
                      default: i(() => [
                        w(p(o.meta.title), 1)
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
            e("div", he, [
              e("div", {
                class: "border-primary border-[1px] h-[30px] px-[15px] flex items-center rounded-[6px] mr-[10px] cursor-pointer",
                onClick: n[0] || (n[0] = (o) => G())
              }, be),
              e("div", we, [
                s(ue)
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: B
              }, [
                s(W, {
                  ref_key: "taskIndicatorRef",
                  ref: C
                }, null, 512)
              ]),
              e("div", Se, [
                s(pe)
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: F
              }, [
                s(de, {
                  ref_key: "layoutSettingRef",
                  ref: V,
                  "show-layout-style": !0
                }, null, 512)
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: H
              }, [
                s(ce, {
                  ref_key: "userInfoRef",
                  ref: L
                }, null, 512)
              ])
            ])
          ]),
          M(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[1] || (n[1] = (o) => g.value = o)
          }, null, 512), [
            [N, g.value]
          ]),
          M(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[2] || (n[2] = (o) => h.value = o)
          }, null, 512), [
            [N, h.value]
          ]),
          s(j, {
            modelValue: v.value,
            "onUpdate:modelValue": n[3] || (n[3] = (o) => v.value = o),
            title: a(_)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1
          }, {
            footer: i(() => [
              e("span", Ie, [
                s(T, { onClick: J }, {
                  default: i(() => [
                    w(p(a(_)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: i(() => [
              e("span", null, p(a(_)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          s(j, {
            modelValue: I.value,
            "onUpdate:modelValue": n[4] || (n[4] = (o) => I.value = o),
            title: a(_)("indexTemplate"),
            width: "550px",
            "destroy-on-close": !0
          }, {
            footer: i(() => [
              e("span", Re, [
                s(T, {
                  type: "primary",
                  onClick: t.submitIndex
                }, {
                  default: i(() => [
                    w(p(a(_)("confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ]),
            default: i(() => [
              e("div", Ce, [
                t.index_path == "" ? (l(!0), f(k, { key: 0 }, b(t.indexList, (o, m) => (l(), f("div", { key: m }, [
                  e("div", {
                    onClick: (Y) => t.index_path = o.view_path,
                    class: D(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", o.is_use == 1 ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, p(o.name), 1)
                  ], 10, Ve)
                ]))), 128)) : (l(!0), f(k, { key: 1 }, b(t.indexList, (o, m) => (l(), f("div", { key: m }, [
                  e("div", {
                    onClick: (Y) => t.index_path = o.view_path,
                    class: D(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", t.index_path == o.view_path ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, p(o.name), 1)
                  ], 10, Le)
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
const Ge = /* @__PURE__ */ le(Te, [["__scopeId", "data-v-d1b74827"]]);
export {
  Ge as default
};
