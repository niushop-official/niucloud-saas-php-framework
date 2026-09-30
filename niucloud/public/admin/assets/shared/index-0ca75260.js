import { defineComponent as re, ref as f, computed as $, onMounted as ae, resolveComponent as r, openBlock as c, createBlock as w, normalizeClass as H, unref as s, withCtx as l, createVNode as i, createElementVNode as t, createElementBlock as y, Fragment as O, renderList as P, createTextVNode as F, toDisplayString as d, createCommentVNode as ce, withDirectives as q, vModelText as G, pushScopeId as de, popScopeId as ue } from "vue";
import pe from "./layout-setting-370c9fed.js";
import me from "./user-info-eab2686f.js";
import _e from "./index-835144c3.js";
import { m, hL as fe, u as he, hv as xe, h as ve, t as k, a as ge } from "./core-shared-c6ad4e77.js";
import { useRoute as be, useRouter as we } from "vue-router";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-31b5b072.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ye = (S) => (de("data-v-3797bf2d"), S = S(), ue(), S), ke = { class: "left-panel h-full flex items-center" }, Se = { class: "flex items-center h-full pl-[10px]" }, Ce = { class: "right-panel h-full flex items-center justify-end" }, Ie = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ve = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, Te = { class: "mr-[6px] text-[12px] !text-[#333]" }, Le = { class: "text-[14px]" }, Re = {
  key: 0,
  class: "text-[14px]"
}, Ee = {
  key: 1,
  class: "text-[14px]"
}, We = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ue = /* @__PURE__ */ ye(() => /* @__PURE__ */ t("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), $e = { class: "flex items-center" }, Fe = ["title"], Me = { class: "navbar-item flex items-center h-full cursor-pointer" }, De = { class: "navbar-item flex items-center h-full cursor-pointer" }, Ne = { class: "dialog-footer" }, Be = /* @__PURE__ */ re({
  __name: "index",
  setup(S) {
    const J = m.get("app_type"), { toggle: je } = fe(), h = he(), M = xe(), K = be(), Q = we(), D = f(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), N = ve(), u = $(() => N.siteInfo), X = $(() => h.dark), C = f(!1), Y = N.routers, Z = (o) => {
      let n = [], a = o == null ? void 0 : o.parent_route;
      for (; a; )
        a.short_title && n.unshift(a.short_title), a = a.parent_route;
      return n.join(" - ");
    }, B = (o, n = null, a = 1) => {
      let _ = [];
      return o.forEach((L) => {
        const { path: R, name: E, meta: p = {}, short_title: W, children: x } = L, v = (p.show === void 0 ? 1 : p.show) && a;
        if (p.type === 1 && v === 1) {
          const g = p.title || W || "", b = Z(p), U = b ? `${b} - ${g}` : g, e = {
            path: R,
            name: E,
            title: g,
            parent_title: b,
            full_title: U
          };
          _.push(e);
        }
        x && x.length > 0 && (_ = _.concat(B(x, L, v)));
      }), _;
    }, ee = B(Y), j = f(""), te = (o) => {
      o && (Q.push({ name: o }), C.value = !1);
    }, I = f(!1), V = f(""), T = f("");
    m.get("comparisonTokenStorage") && (V.value = m.get("comparisonTokenStorage")), m.get("comparisonSiteIdStorage") && (T.value = m.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (o) => {
      document.visibilityState === "visible" && (T.value != m.get("siteId") || V.value != m.get("token")) && (I.value = !0);
    });
    const oe = () => {
      I.value = !1, location.href = `${location.origin}/site/`;
    };
    ae(() => {
      window.onresize = () => (() => {
        D.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const ne = () => {
      h.$patch((o) => {
        D.value < 768 ? (o.menuDrawer = !0, o.menuIsCollapse = !1) : h.toggleMenuCollapse(!h.menuIsCollapse);
      });
    }, le = () => {
      M.routeRefreshTag && M.refreshRouterView();
    }, se = $(() => {
      const o = K.matched.filter((n) => n.meta.title);
      return o[0] && o[0].path == "/" && o.splice(0, 1), o;
    });
    return (o, n) => {
      const a = r("icon"), _ = r("el-breadcrumb-item"), L = r("el-breadcrumb"), R = r("el-col"), E = r("el-dropdown-item"), p = r("el-dropdown-menu"), W = r("el-dropdown"), x = r("el-option"), z = r("el-select"), v = r("el-button"), A = r("el-popover"), g = r("el-row"), b = r("el-dialog"), U = r("el-container");
      return c(), w(U, {
        class: H(["h-full px-[10px]", { "layout-header border-b border-color": !s(X) }])
      }, {
        default: l(() => [
          i(g, { class: "w-100 h-full w-full" }, {
            default: l(() => [
              i(R, { span: 10 }, {
                default: l(() => [
                  t("div", ke, [
                    t("div", {
                      class: "hidden-sm-and-up navbar-item flex items-center h-full cursor-pointer",
                      onClick: ne
                    }, [
                      s(h).menuIsCollapse ? (c(), w(a, {
                        key: 0,
                        name: "element Expand"
                      })) : (c(), w(a, {
                        key: 1,
                        name: "element Fold"
                      }))
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: le
                    }, [
                      i(a, { name: "element Refresh" })
                    ]),
                    t("div", Se, [
                      i(L, { separator: "/" }, {
                        default: l(() => [
                          (c(!0), y(O, null, P(s(se), (e, ie) => (c(), w(_, {
                            to: e.path,
                            class: "inter",
                            key: ie
                          }, {
                            default: l(() => [
                              F(d(e.meta.title), 1)
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
              i(R, { span: 14 }, {
                default: l(() => [
                  t("div", Ce, [
                    t("div", Ie, [
                      i(W, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: l(() => [
                          i(p, null, {
                            default: l(() => [
                              i(E, null, {
                                default: l(() => [
                                  t("div", Le, "站点编号：" + d(s(u).site_id), 1)
                                ]),
                                _: 1
                              }),
                              i(E, null, {
                                default: l(() => [
                                  s(u).expire_time == 0 ? (c(), y("div", Re, "到期时间：永久")) : (c(), y("div", Ee, "到期时间：" + d(s(u).expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: l(() => [
                          t("div", Ve, [
                            t("span", Te, d(s(u).site_name), 1),
                            t("span", {
                              class: H(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": s(u).status == 1, "!text-[#f56c6c]": s(u).status == 3 }])
                            }, d(s(u).status_name), 3)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", We, [
                      i(A, {
                        placement: "bottom",
                        width: 330,
                        trigger: "click",
                        visible: C.value,
                        "onUpdate:visible": n[2] || (n[2] = (e) => C.value = e)
                      }, {
                        reference: l(() => [
                          Ue
                        ]),
                        default: l(() => [
                          t("div", $e, [
                            i(z, {
                              modelValue: j.value,
                              "onUpdate:modelValue": n[0] || (n[0] = (e) => j.value = e),
                              filterable: "",
                              class: "!w-[250px] mr-[20px] menu-select",
                              teleported: !1,
                              clearable: "",
                              onChange: te
                            }, {
                              default: l(() => [
                                (c(!0), y(O, null, P(s(ee), (e) => (c(), w(x, {
                                  key: e.name,
                                  label: e.full_title,
                                  value: e.name
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            i(v, {
                              type: "primary",
                              link: "",
                              onClick: n[1] || (n[1] = (e) => C.value = !1)
                            }, {
                              default: l(() => [
                                F(d(s(k)("取消")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["visible"])
                    ]),
                    i(_e, { class: "px-[8px]" }),
                    s(J) == "site" ? (c(), y("i", {
                      key: 0,
                      class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                      title: s(k)("newInfo")
                    }, null, 8, Fe)) : ce("", !0),
                    t("div", Me, [
                      i(pe)
                    ]),
                    t("div", De, [
                      i(me)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          q(t("input", {
            type: "hidden",
            "onUpdate:modelValue": n[3] || (n[3] = (e) => V.value = e)
          }, null, 512), [
            [G, V.value]
          ]),
          q(t("input", {
            type: "hidden",
            "onUpdate:modelValue": n[4] || (n[4] = (e) => T.value = e)
          }, null, 512), [
            [G, T.value]
          ]),
          i(b, {
            modelValue: I.value,
            "onUpdate:modelValue": n[5] || (n[5] = (e) => I.value = e),
            title: s(k)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: l(() => [
              t("span", Ne, [
                i(v, { onClick: oe }, {
                  default: l(() => [
                    F(d(s(k)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: l(() => [
              t("span", null, d(s(k)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const et = /* @__PURE__ */ ge(Be, [["__scopeId", "data-v-3797bf2d"]]);
export {
  et as default
};
