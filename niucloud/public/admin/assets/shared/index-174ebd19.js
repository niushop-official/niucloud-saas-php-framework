import { defineComponent as P, ref as h, computed as R, resolveComponent as a, openBlock as l, createBlock as y, withCtx as s, createElementVNode as e, createVNode as i, unref as c, createElementBlock as u, Fragment as k, renderList as w, createTextVNode as S, toDisplayString as p, withDirectives as j, vModelText as M, normalizeClass as N, pushScopeId as Q, popScopeId as W } from "vue";
import { _ as X } from "./logo.default-aeaa7888.js";
import { gR as Y, cm as Z, s as r, i as ee, t as f, aK as U, u as te, _ as oe } from "./core-shared-11c0a673.js";
import { useRoute as ne, useRouter as se } from "vue-router";
import ie from "./user-info-8cf18b19.js";
import le from "./layout-setting-8be1aa48.js";
import re from "./message-ab428190.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./index-5ea06ae6.js";
import "./message_empty-a77792f0.js";
import "./index-313713a8.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-051e3aa2.js";
import "./dark-3dd028d8.js";
const C = (_) => (Q("data-v-247585bf"), _ = _(), W(), _), ae = { class: "flex items-center" }, ce = { class: "max-w-[120px] flex justify-center items-center flex-shrink-0" }, pe = { class: "max-w-[120px] h-[40px] overflow-hidden" }, de = /* @__PURE__ */ C(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[120px]",
    src: X,
    alt: "",
    "object-fit": "contain"
  })
], -1)), me = { class: "left-panel flex items-center text-[14px] leading-[1]" }, ue = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, fe = { class: "right-panel h-full flex items-center justify-end" }, _e = /* @__PURE__ */ C(() => /* @__PURE__ */ e("span", { class: "iconfont iconguanliduan !text-primary mr-1" }, null, -1)), xe = /* @__PURE__ */ C(() => /* @__PURE__ */ e("span", { class: "text-[14px] text-primary" }, "客户端", -1)), ve = [
  _e,
  xe
], ge = { class: "navbar-item flex items-center h-full cursor-pointer" }, he = { class: "navbar-item flex items-center h-full cursor-pointer" }, ye = { class: "navbar-item flex items-center h-full cursor-pointer" }, be = { class: "dialog-footer" }, ke = { class: "flex flex-wrap" }, we = ["onClick"], Se = ["onClick"], Ce = { class: "dialog-footer" }, Ie = /* @__PURE__ */ P({
  __name: "index",
  setup(_) {
    const I = h(!1), D = ne(), E = se(), V = Y(), d = Z(), B = R(() => d.website), x = h(!1), v = h(""), g = h("");
    r.get("comparisonTokenStorage") && (v.value = r.get("comparisonTokenStorage")), r.get("comparisonSiteIdStorage") && (g.value = r.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (o) => {
      document.visibilityState === "visible" && (g.value != r.get("siteId") || v.value != r.get("token")) && (x.value = !0);
    }), d.toggleMenuCollapse(r.get("menuiscollapse") || !1);
    const F = () => {
      x.value = !1, location.reload();
    }, H = () => {
      V.routeRefreshTag && V.refreshRouterView();
    }, $ = R(() => {
      const o = D.matched.filter((n) => n.meta.title);
      return o[0] && o[0].path == "/" && o.splice(0, 1), o;
    });
    r.set({ key: "currHeadMenuName", data: "" });
    const O = () => {
      d.toggleMenuCollapse(!d.menuIsCollapse);
    }, z = () => {
      window.localStorage.getItem("site.token") || (window.localStorage.setItem("site.token", U()), window.localStorage.setItem("site.comparisonTokenStorage", U())), window.localStorage.getItem("site.userinfo") || window.localStorage.setItem("site.userinfo", JSON.stringify(te().userInfo)), E.push({ path: "/home/index" });
    };
    return (o, n) => {
      const A = a("el-image"), b = a("icon"), J = a("el-breadcrumb-item"), K = a("el-breadcrumb"), L = a("el-button"), T = a("el-dialog"), q = a("el-container");
      return l(), y(q, { class: "h-[64px] layout-admin flex items-center justify-between px-[15px]" }, {
        default: s(() => [
          e("div", ae, [
            e("div", ce, [
              e("div", pe, [
                i(A, {
                  class: "w-full h-full",
                  src: c(ee)(B.value.icon),
                  fit: "contain"
                }, {
                  error: s(() => [
                    de
                  ]),
                  _: 1
                }, 8, ["src"])
              ])
            ]),
            e("div", me, [
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: O
              }, [
                c(d).menuIsCollapse ? (l(), y(b, {
                  key: 0,
                  name: "element Expand"
                })) : (l(), y(b, {
                  key: 1,
                  name: "element Fold"
                }))
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: H
              }, [
                i(b, { name: "element Refresh" })
              ]),
              e("div", ue, [
                i(K, { separator: "/" }, {
                  default: s(() => [
                    (l(!0), u(k, null, w($.value, (t, m) => (l(), y(J, {
                      key: m,
                      to: t.path,
                      class: "inter"
                    }, {
                      default: s(() => [
                        S(p(t.meta.title), 1)
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
            e("div", fe, [
              e("div", {
                class: "border-primary border-[1px] h-[30px] px-[15px] flex items-center rounded-[6px] mr-[10px] cursor-pointer",
                onClick: n[0] || (n[0] = (t) => z())
              }, ve),
              e("div", ge, [
                i(re)
              ]),
              e("div", he, [
                i(le)
              ]),
              e("div", ye, [
                i(ie)
              ])
            ])
          ]),
          j(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[1] || (n[1] = (t) => v.value = t)
          }, null, 512), [
            [M, v.value]
          ]),
          j(e("input", {
            type: "hidden",
            "onUpdate:modelValue": n[2] || (n[2] = (t) => g.value = t)
          }, null, 512), [
            [M, g.value]
          ]),
          i(T, {
            modelValue: x.value,
            "onUpdate:modelValue": n[3] || (n[3] = (t) => x.value = t),
            title: c(f)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1
          }, {
            footer: s(() => [
              e("span", be, [
                i(L, { onClick: F }, {
                  default: s(() => [
                    S(p(c(f)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: s(() => [
              e("span", null, p(c(f)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          i(T, {
            modelValue: I.value,
            "onUpdate:modelValue": n[4] || (n[4] = (t) => I.value = t),
            title: c(f)("indexTemplate"),
            width: "550px",
            "destroy-on-close": !0
          }, {
            footer: s(() => [
              e("span", Ce, [
                i(L, {
                  type: "primary",
                  onClick: o.submitIndex
                }, {
                  default: s(() => [
                    S(p(c(f)("confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ]),
            default: s(() => [
              e("div", ke, [
                o.index_path == "" ? (l(!0), u(k, { key: 0 }, w(o.indexList, (t, m) => (l(), u("div", { key: m }, [
                  e("div", {
                    onClick: (G) => o.index_path = t.view_path,
                    class: N(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", t.is_use == 1 ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, p(t.name), 1)
                  ], 10, we)
                ]))), 128)) : (l(!0), u(k, { key: 1 }, w(o.indexList, (t, m) => (l(), u("div", { key: m }, [
                  e("div", {
                    onClick: (G) => o.index_path = t.view_path,
                    class: N(["index-item py-[5px] px-[10px] mr-[10px] rounded-[3px] cursor-pointer", o.index_path == t.view_path ? "bg-primary text-[#fff]" : ""])
                  }, [
                    e("span", null, p(t.name), 1)
                  ], 10, Se)
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
const Ge = /* @__PURE__ */ oe(Ie, [["__scopeId", "data-v-247585bf"]]);
export {
  Ge as default
};
