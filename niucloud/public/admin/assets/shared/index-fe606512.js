import { defineComponent as ae, ref as f, computed as U, onMounted as ce, resolveComponent as r, openBlock as a, createBlock as b, normalizeClass as P, withCtx as n, createVNode as s, createElementVNode as t, unref as c, createElementBlock as w, Fragment as q, renderList as A, createTextVNode as F, toDisplayString as u, createCommentVNode as ue, withDirectives as H, vModelText as O, pushScopeId as de, popScopeId as pe } from "vue";
import me from "./layout-setting-5ca47682.js";
import _e from "./user-info-f4a92226.js";
import { s as m, gY as fe, cm as he, gR as ve, u as xe, t as h, _ as ge } from "./core-shared-e1759ce4.js";
import { useRoute as be, useRouter as we } from "vue-router";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-c85be5ad.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ye = (y) => (de("data-v-64d4d568"), y = y(), pe(), y), ke = { class: "left-panel h-full flex items-center" }, Se = { class: "flex items-center h-full pl-[10px]" }, Ce = { class: "right-panel h-full flex items-center justify-end" }, Ie = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ve = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, Re = { class: "mr-[6px] text-[12px] !text-[#333]" }, Te = { class: "text-[14px]" }, Le = {
  key: 0,
  class: "text-[14px]"
}, We = {
  key: 1,
  class: "text-[14px]"
}, Ee = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ue = /* @__PURE__ */ ye(() => /* @__PURE__ */ t("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), Fe = { class: "flex items-center" }, Me = ["title"], $e = ["title"], De = { class: "navbar-item flex items-center h-full cursor-pointer" }, Ne = { class: "navbar-item flex items-center h-full cursor-pointer" }, je = { class: "dialog-footer" }, Be = /* @__PURE__ */ ae({
  __name: "index",
  setup(y) {
    const Y = m.get("app_type"), { toggle: ze } = fe(), v = he(), M = ve(), G = be(), $ = we(), D = f(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), N = xe(), d = U(() => N.siteInfo), J = U(() => v.dark), k = f(!1), K = N.routers, Q = (e) => {
      let o = [], i = e == null ? void 0 : e.parent_route;
      for (; i; )
        i.short_title && o.unshift(i.short_title), i = i.parent_route;
      return o.join(" - ");
    }, j = (e, o = null) => {
      let i = [];
      return e.forEach((V) => {
        const { path: T, name: R, meta: p = {}, short_title: L, children: x } = V;
        if (p.type == 1 && p.show == 1) {
          const g = p.title || L || "", _ = Q(p), W = _ ? `${_} - ${g}` : g, E = {
            path: T,
            name: R,
            title: g,
            parent_title: _,
            full_title: W
          };
          i.push(E);
        }
        x && x.length > 0 && (i = i.concat(j(x, V)));
      }), i;
    }, X = j(K), B = f(""), Z = (e) => {
      e && ($.push({ name: e }), k.value = !1);
    }, S = f(!1), C = f(""), I = f("");
    m.get("comparisonTokenStorage") && (C.value = m.get("comparisonTokenStorage")), m.get("comparisonSiteIdStorage") && (I.value = m.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (I.value != m.get("siteId") || C.value != m.get("token")) && (S.value = !0);
    });
    const ee = () => {
      S.value = !1, location.href = `${location.origin}/site/`;
    };
    ce(() => {
      window.onresize = () => (() => {
        D.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const te = () => {
      v.$patch((e) => {
        D.value < 768 ? (e.menuDrawer = !0, e.menuIsCollapse = !1) : v.toggleMenuCollapse(!v.menuIsCollapse);
      });
    }, oe = () => {
      M.routeRefreshTag && M.refreshRouterView();
    }, ne = U(() => {
      const e = G.matched.filter((o) => o.meta.title);
      return e[0] && e[0].path == "/" && e.splice(0, 1), e;
    }), le = () => {
      const e = $.resolve({
        path: "/preview/wap",
        query: {
          page: "/"
        }
      });
      window.open(e.href);
    };
    return (e, o) => {
      const i = r("icon"), V = r("el-breadcrumb-item"), T = r("el-breadcrumb"), R = r("el-col"), p = r("el-dropdown-item"), L = r("el-dropdown-menu"), x = r("el-dropdown"), z = r("el-option"), g = r("el-select"), _ = r("el-button"), W = r("el-popover"), E = r("el-row"), se = r("el-dialog"), ie = r("el-container");
      return a(), b(ie, {
        class: P(["h-full px-[10px]", { "layout-header border-b border-color": !J.value }])
      }, {
        default: n(() => [
          s(E, { class: "w-100 h-full w-full" }, {
            default: n(() => [
              s(R, { span: 10 }, {
                default: n(() => [
                  t("div", ke, [
                    t("div", {
                      class: "hidden-sm-and-up navbar-item flex items-center h-full cursor-pointer",
                      onClick: te
                    }, [
                      c(v).menuIsCollapse ? (a(), b(i, {
                        key: 0,
                        name: "element Expand"
                      })) : (a(), b(i, {
                        key: 1,
                        name: "element Fold"
                      }))
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: oe
                    }, [
                      s(i, { name: "element Refresh" })
                    ]),
                    t("div", Se, [
                      s(T, { separator: "/" }, {
                        default: n(() => [
                          (a(!0), w(q, null, A(ne.value, (l, re) => (a(), b(V, {
                            key: re,
                            to: l.path,
                            class: "inter"
                          }, {
                            default: n(() => [
                              F(u(l.meta.title), 1)
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
              s(R, { span: 14 }, {
                default: n(() => [
                  t("div", Ce, [
                    t("div", Ie, [
                      s(x, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: n(() => [
                          s(L, null, {
                            default: n(() => [
                              s(p, null, {
                                default: n(() => [
                                  t("div", Te, "站点编号：" + u(d.value.site_id), 1)
                                ]),
                                _: 1
                              }),
                              s(p, null, {
                                default: n(() => [
                                  d.value.expire_time == 0 ? (a(), w("div", Le, "到期时间：永久")) : (a(), w("div", We, "到期时间：" + u(d.value.expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: n(() => [
                          t("div", Ve, [
                            t("span", Re, u(d.value.site_name), 1),
                            t("span", {
                              class: P(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": d.value.status == 1, "!text-[#f56c6c]": d.value.status == 3 }])
                            }, u(d.value.status_name), 3)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", Ee, [
                      s(W, {
                        placement: "bottom",
                        width: 330,
                        trigger: "click",
                        visible: k.value,
                        "onUpdate:visible": o[2] || (o[2] = (l) => k.value = l)
                      }, {
                        reference: n(() => [
                          Ue
                        ]),
                        default: n(() => [
                          t("div", Fe, [
                            s(g, {
                              modelValue: B.value,
                              "onUpdate:modelValue": o[0] || (o[0] = (l) => B.value = l),
                              filterable: "",
                              class: "!w-[250px] mr-[20px] menu-select",
                              teleported: !1,
                              clearable: "",
                              onChange: Z
                            }, {
                              default: n(() => [
                                (a(!0), w(q, null, A(c(X), (l) => (a(), b(z, {
                                  key: l.name,
                                  label: l.full_title,
                                  value: l.name
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            s(_, {
                              type: "primary",
                              link: "",
                              onClick: o[1] || (o[1] = (l) => k.value = !1)
                            }, {
                              default: n(() => [
                                F(u(c(h)("取消")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["visible"])
                    ]),
                    t("i", {
                      class: "iconfont iconicon_huojian1 cursor-pointer px-[8px]",
                      title: c(h)("visitWap"),
                      onClick: le
                    }, null, 8, Me),
                    c(Y) == "site" ? (a(), w("i", {
                      key: 0,
                      class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                      title: c(h)("newInfo")
                    }, null, 8, $e)) : ue("", !0),
                    t("div", De, [
                      s(me)
                    ]),
                    t("div", Ne, [
                      s(_e)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          H(t("input", {
            type: "hidden",
            "onUpdate:modelValue": o[3] || (o[3] = (l) => C.value = l)
          }, null, 512), [
            [O, C.value]
          ]),
          H(t("input", {
            type: "hidden",
            "onUpdate:modelValue": o[4] || (o[4] = (l) => I.value = l)
          }, null, 512), [
            [O, I.value]
          ]),
          s(se, {
            modelValue: S.value,
            "onUpdate:modelValue": o[5] || (o[5] = (l) => S.value = l),
            title: c(h)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: n(() => [
              t("span", je, [
                s(_, { onClick: ee }, {
                  default: n(() => [
                    F(u(c(h)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: n(() => [
              t("span", null, u(c(h)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const et = /* @__PURE__ */ ge(Be, [["__scopeId", "data-v-64d4d568"]]);
export {
  et as default
};
