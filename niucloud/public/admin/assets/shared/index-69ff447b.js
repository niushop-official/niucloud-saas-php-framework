import { defineComponent as re, ref as f, computed as W, onMounted as ae, resolveComponent as i, openBlock as a, createBlock as E, normalizeClass as M, withCtx as o, createVNode as s, createElementVNode as e, createElementBlock as g, Fragment as z, renderList as P, createTextVNode as U, toDisplayString as c, unref as u, createCommentVNode as ce, withDirectives as q, vModelText as A, pushScopeId as ue, popScopeId as de } from "vue";
import pe from "./layout-setting-de17f77a.js";
import _e from "./user-info-b318852f.js";
import { s as _, gY as me, cm as fe, gR as he, u as ve, t as h, _ as xe } from "./core-shared-ae4a556b.js";
import { useRoute as ge, useRouter as be } from "vue-router";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-bee8054b.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const we = (b) => (ue("data-v-676a8107"), b = b(), de(), b), ye = { class: "left-panel h-full flex items-center" }, ke = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, Se = { class: "right-panel h-full flex items-center justify-end" }, Ve = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ce = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, Ie = { class: "mr-[6px] text-[12px] !text-[#333]" }, Re = { class: "text-[14px]" }, Te = {
  key: 0,
  class: "text-[14px]"
}, Le = {
  key: 1,
  class: "text-[14px]"
}, We = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ee = /* @__PURE__ */ we(() => /* @__PURE__ */ e("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), Ue = { class: "flex items-center" }, Fe = ["title"], Ne = ["title"], $e = { class: "navbar-item flex items-center h-full cursor-pointer" }, je = { class: "navbar-item flex items-center h-full cursor-pointer" }, Be = { class: "dialog-footer" }, De = /* @__PURE__ */ re({
  __name: "index",
  setup(b) {
    const H = _.get("app_type"), { toggle: Me } = me(), O = fe(), F = he(), Y = ge(), N = be(), G = f(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), $ = ve(), d = W(() => $.siteInfo), J = W(() => O.dark), w = f(!1), K = $.routers, Q = (n) => {
      let t = [], r = n == null ? void 0 : n.parent_route;
      for (; r; )
        r.short_title && t.unshift(r.short_title), r = r.parent_route;
      return t.join(" - ");
    }, j = (n, t = null) => {
      let r = [];
      return n.forEach((V) => {
        const { path: I, name: C, meta: p = {}, short_title: R, children: v } = V;
        if (p.type == 1 && p.show == 1) {
          const x = p.title || R || "", m = Q(p), T = m ? `${m} - ${x}` : x, L = {
            path: I,
            name: C,
            title: x,
            parent_title: m,
            full_title: T
          };
          r.push(L);
        }
        v && v.length > 0 && (r = r.concat(j(v, V)));
      }), r;
    }, X = j(K), B = f(""), Z = (n) => {
      n && (N.push({ name: n }), w.value = !1);
    }, y = f(!1), k = f(""), S = f("");
    _.get("comparisonTokenStorage") && (k.value = _.get("comparisonTokenStorage")), _.get("comparisonSiteIdStorage") && (S.value = _.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (n) => {
      document.visibilityState === "visible" && (S.value != _.get("siteId") || k.value != _.get("token")) && (y.value = !0);
    });
    const ee = () => {
      y.value = !1, location.href = `${location.origin}/site/`;
    };
    ae(() => {
      window.onresize = () => (() => {
        G.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const te = () => {
      F.routeRefreshTag && F.refreshRouterView();
    }, oe = W(() => {
      const n = Y.matched.filter((t) => t.meta.title);
      return n[0] && n[0].path == "/" && n.splice(0, 1), n;
    }), ne = () => {
      const n = N.resolve({
        path: "/preview/wap",
        query: {
          page: "/"
        }
      });
      window.open(n.href);
    };
    return (n, t) => {
      const r = i("icon"), V = i("el-breadcrumb-item"), I = i("el-breadcrumb"), C = i("el-col"), p = i("el-dropdown-item"), R = i("el-dropdown-menu"), v = i("el-dropdown"), D = i("el-option"), x = i("el-select"), m = i("el-button"), T = i("el-popover"), L = i("el-row"), le = i("el-dialog"), se = i("el-container");
      return a(), E(se, {
        class: M(["h-full px-[10px]", { "layout-header border-b border-color": !J.value }])
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
                          (a(!0), g(z, null, P(oe.value, (l, ie) => (a(), E(V, {
                            key: ie,
                            to: l.path,
                            class: "inter"
                          }, {
                            default: o(() => [
                              U(c(l.meta.title), 1)
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
                          s(R, null, {
                            default: o(() => [
                              s(p, null, {
                                default: o(() => [
                                  e("div", Re, "站点编号：" + c(d.value.site_id), 1)
                                ]),
                                _: 1
                              }),
                              s(p, null, {
                                default: o(() => [
                                  d.value.expire_time == 0 ? (a(), g("div", Te, "到期时间：永久")) : (a(), g("div", Le, "到期时间：" + c(d.value.expire_time), 1))
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
                      s(T, {
                        placement: "bottom",
                        width: 330,
                        trigger: "click",
                        visible: w.value,
                        "onUpdate:visible": t[2] || (t[2] = (l) => w.value = l)
                      }, {
                        reference: o(() => [
                          Ee
                        ]),
                        default: o(() => [
                          e("div", Ue, [
                            s(x, {
                              modelValue: B.value,
                              "onUpdate:modelValue": t[0] || (t[0] = (l) => B.value = l),
                              filterable: "",
                              class: "!w-[250px] mr-[20px] menu-select",
                              teleported: !1,
                              clearable: "",
                              onChange: Z
                            }, {
                              default: o(() => [
                                (a(!0), g(z, null, P(u(X), (l) => (a(), E(D, {
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
                                U(c(u(h)("取消")), 1)
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
                    }, null, 8, Fe),
                    u(H) == "site" ? (a(), g("i", {
                      key: 0,
                      class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                      title: u(h)("newInfo")
                    }, null, 8, Ne)) : ce("", !0),
                    e("div", $e, [
                      s(pe)
                    ]),
                    e("div", je, [
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
              e("span", Be, [
                s(m, { onClick: ee }, {
                  default: o(() => [
                    U(c(u(h)("layout.detectionLoginOperation")), 1)
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
const Ze = /* @__PURE__ */ xe(De, [["__scopeId", "data-v-676a8107"]]);
export {
  Ze as default
};
