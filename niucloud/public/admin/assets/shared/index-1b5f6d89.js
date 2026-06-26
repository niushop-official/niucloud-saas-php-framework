import { defineComponent as re, ref as f, computed as W, onMounted as ae, resolveComponent as i, openBlock as a, createBlock as U, normalizeClass as M, withCtx as o, createVNode as s, createElementVNode as e, createElementBlock as g, Fragment as z, renderList as P, createTextVNode as E, toDisplayString as c, unref as u, createCommentVNode as ce, withDirectives as q, vModelText as A, pushScopeId as ue, popScopeId as de } from "vue";
import pe from "./layout-setting-2e381ed3.js";
import _e from "./user-info-62c890e4.js";
import { s as _, gU as me, ck as fe, gN as he, u as ve, t as h, _ as xe } from "./core-shared-ca1fcae5.js";
import { useRoute as ge, useRouter as be } from "vue-router";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const we = (b) => (ue("data-v-676a8107"), b = b(), de(), b), ye = { class: "left-panel h-full flex items-center" }, ke = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, Se = { class: "right-panel h-full flex items-center justify-end" }, Ve = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ce = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, Ie = { class: "mr-[6px] text-[12px] !text-[#333]" }, Te = { class: "text-[14px]" }, Re = {
  key: 0,
  class: "text-[14px]"
}, Le = {
  key: 1,
  class: "text-[14px]"
}, We = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ue = /* @__PURE__ */ we(() => /* @__PURE__ */ e("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), Ee = { class: "flex items-center" }, Ne = ["title"], $e = ["title"], je = { class: "navbar-item flex items-center h-full cursor-pointer" }, Be = { class: "navbar-item flex items-center h-full cursor-pointer" }, De = { class: "dialog-footer" }, Fe = /* @__PURE__ */ re({
  __name: "index",
  setup(b) {
    const H = _.get("app_type");
    me();
    const O = fe(), N = he(), G = ge(), $ = be(), J = f(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), j = ve(), d = W(() => j.siteInfo), K = W(() => O.dark), w = f(!1), Q = j.routers, X = (n) => {
      let t = [], r = n == null ? void 0 : n.parent_route;
      for (; r; )
        r.short_title && t.unshift(r.short_title), r = r.parent_route;
      return t.join(" - ");
    }, B = (n, t = null) => {
      let r = [];
      return n.forEach((V) => {
        const { path: I, name: C, meta: p = {}, short_title: T, children: v } = V;
        if (p.type == 1 && p.show == 1) {
          const x = p.title || T || "", m = X(p), R = m ? `${m} - ${x}` : x, L = {
            path: I,
            name: C,
            title: x,
            parent_title: m,
            full_title: R
          };
          r.push(L);
        }
        v && v.length > 0 && (r = r.concat(B(v, V)));
      }), r;
    }, Y = B(Q), D = f(""), Z = (n) => {
      n && ($.push({ name: n }), w.value = !1);
    }, y = f(!1), k = f(""), S = f("");
    _.get("comparisonTokenStorage") && (k.value = _.get("comparisonTokenStorage")), _.get("comparisonSiteIdStorage") && (S.value = _.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (n) => {
      document.visibilityState === "visible" && (S.value != _.get("siteId") || k.value != _.get("token")) && (y.value = !0);
    });
    const ee = () => {
      y.value = !1, location.href = `${location.origin}/site/`;
    };
    ae(() => {
      window.onresize = () => (() => {
        J.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const te = () => {
      N.routeRefreshTag && N.refreshRouterView();
    }, oe = W(() => {
      const n = G.matched.filter((t) => t.meta.title);
      return n[0] && n[0].path == "/" && n.splice(0, 1), n;
    }), ne = () => {
      const n = $.resolve({
        path: "/preview/wap",
        query: {
          page: "/"
        }
      });
      window.open(n.href);
    };
    return (n, t) => {
      const r = i("icon"), V = i("el-breadcrumb-item"), I = i("el-breadcrumb"), C = i("el-col"), p = i("el-dropdown-item"), T = i("el-dropdown-menu"), v = i("el-dropdown"), F = i("el-option"), x = i("el-select"), m = i("el-button"), R = i("el-popover"), L = i("el-row"), le = i("el-dialog"), se = i("el-container");
      return a(), U(se, {
        class: M(["h-full px-[10px]", { "layout-header border-b border-color": !K.value }])
      }, {
        default: o(() => [
          s(L, { class: "w-100 h-full w-full" }, {
            default: o(() => [
              s(C, { span: 10 }, {
                default: o(() => [
                  e("div", ye, [
                    e("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: te
                    }, [
                      s(r, { name: "element Refresh" })
                    ]),
                    e("div", ke, [
                      s(I, { separator: "/" }, {
                        default: o(() => [
                          (a(!0), g(z, null, P(oe.value, (l, ie) => (a(), U(V, {
                            key: ie,
                            to: l.path,
                            class: "inter"
                          }, {
                            default: o(() => [
                              E(c(l.meta.title), 1)
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
              s(C, { span: 14 }, {
                default: o(() => [
                  e("div", Se, [
                    e("div", Ve, [
                      s(v, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: o(() => [
                          s(T, null, {
                            default: o(() => [
                              s(p, null, {
                                default: o(() => [
                                  e("div", Te, "站点编号：" + c(d.value.site_id), 1)
                                ]),
                                _: 1
                              }),
                              s(p, null, {
                                default: o(() => [
                                  d.value.expire_time == 0 ? (a(), g("div", Re, "到期时间：永久")) : (a(), g("div", Le, "到期时间：" + c(d.value.expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: o(() => [
                          e("div", Ce, [
                            e("span", Ie, c(d.value.site_name), 1),
                            e("span", {
                              class: M(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": d.value.status == 1, "!text-[#f56c6c]": d.value.status == 3 }])
                            }, c(d.value.status_name), 3)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    e("div", We, [
                      s(R, {
                        placement: "bottom",
                        width: 330,
                        trigger: "click",
                        visible: w.value,
                        "onUpdate:visible": t[2] || (t[2] = (l) => w.value = l)
                      }, {
                        reference: o(() => [
                          Ue
                        ]),
                        default: o(() => [
                          e("div", Ee, [
                            s(x, {
                              modelValue: D.value,
                              "onUpdate:modelValue": t[0] || (t[0] = (l) => D.value = l),
                              filterable: "",
                              class: "!w-[250px] mr-[20px] menu-select",
                              teleported: !1,
                              clearable: "",
                              onChange: Z
                            }, {
                              default: o(() => [
                                (a(!0), g(z, null, P(u(Y), (l) => (a(), U(F, {
                                  key: l.name,
                                  label: l.full_title,
                                  value: l.name
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            s(m, {
                              type: "primary",
                              link: "",
                              onClick: t[1] || (t[1] = (l) => w.value = !1)
                            }, {
                              default: o(() => [
                                E(c(u(h)("取消")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["visible"])
                    ]),
                    e("i", {
                      class: "iconfont iconicon_huojian1 cursor-pointer px-[8px]",
                      title: u(h)("visitWap"),
                      onClick: ne
                    }, null, 8, Ne),
                    u(H) == "site" ? (a(), g("i", {
                      key: 0,
                      class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                      title: u(h)("newInfo")
                    }, null, 8, $e)) : ce("", !0),
                    e("div", je, [
                      s(pe)
                    ]),
                    e("div", Be, [
                      s(_e)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          q(e("input", {
            type: "hidden",
            "onUpdate:modelValue": t[3] || (t[3] = (l) => k.value = l)
          }, null, 512), [
            [A, k.value]
          ]),
          q(e("input", {
            type: "hidden",
            "onUpdate:modelValue": t[4] || (t[4] = (l) => S.value = l)
          }, null, 512), [
            [A, S.value]
          ]),
          s(le, {
            modelValue: y.value,
            "onUpdate:modelValue": t[5] || (t[5] = (l) => y.value = l),
            title: u(h)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: o(() => [
              e("span", De, [
                s(m, { onClick: ee }, {
                  default: o(() => [
                    E(c(u(h)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              e("span", null, c(u(h)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const Ye = /* @__PURE__ */ xe(Fe, [["__scopeId", "data-v-676a8107"]]);
export {
  Ye as default
};
