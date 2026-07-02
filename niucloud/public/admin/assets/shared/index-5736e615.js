import { defineComponent as ae, ref as f, computed as F, onMounted as ce, resolveComponent as i, openBlock as a, createBlock as y, normalizeClass as A, withCtx as l, createVNode as s, createElementVNode as t, unref as c, createElementBlock as k, Fragment as H, renderList as O, createTextVNode as M, toDisplayString as u, createCommentVNode as ue, withDirectives as Y, vModelText as G, pushScopeId as de, popScopeId as pe } from "vue";
import me from "./layout-setting-52f5dd48.js";
import _e from "./user-info-baeb24f4.js";
import { s as m, gY as fe, cm as he, gR as ve, u as xe, t as h, _ as ge } from "./core-shared-ae4a556b.js";
import { useRoute as we, useRouter as be } from "vue-router";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-bee8054b.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ye = (S) => (de("data-v-fe6968fc"), S = S(), pe(), S), ke = { class: "left-panel h-full flex items-center" }, Se = { class: "flex items-center h-full pl-[10px]" }, Ce = { class: "right-panel h-full flex items-center justify-end" }, Ie = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ve = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, Re = { class: "mr-[6px] text-[12px] !text-[#333]" }, Te = { class: "text-[14px]" }, Le = {
  key: 0,
  class: "text-[14px]"
}, We = {
  key: 1,
  class: "text-[14px]"
}, Ee = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ue = /* @__PURE__ */ ye(() => /* @__PURE__ */ t("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), Fe = { class: "flex items-center" }, Me = ["title"], $e = ["title"], De = { class: "navbar-item flex items-center h-full cursor-pointer" }, Ne = { class: "navbar-item flex items-center h-full cursor-pointer" }, je = { class: "dialog-footer" }, Be = /* @__PURE__ */ ae({
  __name: "index",
  setup(S) {
    const J = m.get("app_type"), { toggle: ze } = fe(), v = he(), $ = ve(), K = we(), D = be(), N = f(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), j = xe(), d = F(() => j.siteInfo), Q = F(() => v.dark), C = f(!1), X = j.routers, Z = (e) => {
      let n = [], r = e == null ? void 0 : e.parent_route;
      for (; r; )
        r.short_title && n.unshift(r.short_title), r = r.parent_route;
      return n.join(" - ");
    }, B = (e, n = null, r = 1) => {
      let _ = [];
      return e.forEach((T) => {
        const { path: L, name: W, meta: p = {}, short_title: E, children: x } = T, g = (p.show === void 0 ? 1 : p.show) && r;
        if (p.type === 1 && g === 1) {
          const w = p.title || E || "", b = Z(p), U = b ? `${b} - ${w}` : w, o = {
            path: L,
            name: W,
            title: w,
            parent_title: b,
            full_title: U
          };
          _.push(o);
        }
        x && x.length > 0 && (_ = _.concat(B(x, T, g)));
      }), _;
    }, ee = B(X), z = f(""), te = (e) => {
      e && (D.push({ name: e }), C.value = !1);
    }, I = f(!1), V = f(""), R = f("");
    m.get("comparisonTokenStorage") && (V.value = m.get("comparisonTokenStorage")), m.get("comparisonSiteIdStorage") && (R.value = m.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (R.value != m.get("siteId") || V.value != m.get("token")) && (I.value = !0);
    });
    const oe = () => {
      I.value = !1, location.href = `${location.origin}/site/`;
    };
    ce(() => {
      window.onresize = () => (() => {
        N.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const ne = () => {
      v.$patch((e) => {
        N.value < 768 ? (e.menuDrawer = !0, e.menuIsCollapse = !1) : v.toggleMenuCollapse(!v.menuIsCollapse);
      });
    }, le = () => {
      $.routeRefreshTag && $.refreshRouterView();
    }, se = F(() => {
      const e = K.matched.filter((n) => n.meta.title);
      return e[0] && e[0].path == "/" && e.splice(0, 1), e;
    }), ie = () => {
      const e = D.resolve({
        path: "/preview/wap",
        query: {
          page: "/"
        }
      });
      window.open(e.href);
    };
    return (e, n) => {
      const r = i("icon"), _ = i("el-breadcrumb-item"), T = i("el-breadcrumb"), L = i("el-col"), W = i("el-dropdown-item"), p = i("el-dropdown-menu"), E = i("el-dropdown"), x = i("el-option"), P = i("el-select"), g = i("el-button"), q = i("el-popover"), w = i("el-row"), b = i("el-dialog"), U = i("el-container");
      return a(), y(U, {
        class: A(["h-full px-[10px]", { "layout-header border-b border-color": !Q.value }])
      }, {
        default: l(() => [
          s(w, { class: "w-100 h-full w-full" }, {
            default: l(() => [
              s(L, { span: 10 }, {
                default: l(() => [
                  t("div", ke, [
                    t("div", {
                      class: "hidden-sm-and-up navbar-item flex items-center h-full cursor-pointer",
                      onClick: ne
                    }, [
                      c(v).menuIsCollapse ? (a(), y(r, {
                        key: 0,
                        name: "element Expand"
                      })) : (a(), y(r, {
                        key: 1,
                        name: "element Fold"
                      }))
                    ]),
                    t("div", {
                      class: "navbar-item flex items-center h-full cursor-pointer",
                      onClick: le
                    }, [
                      s(r, { name: "element Refresh" })
                    ]),
                    t("div", Se, [
                      s(T, { separator: "/" }, {
                        default: l(() => [
                          (a(!0), k(H, null, O(se.value, (o, re) => (a(), y(_, {
                            to: o.path,
                            class: "inter",
                            key: re
                          }, {
                            default: l(() => [
                              M(u(o.meta.title), 1)
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
              s(L, { span: 14 }, {
                default: l(() => [
                  t("div", Ce, [
                    t("div", Ie, [
                      s(E, {
                        trigger: "hover",
                        "hide-on-click": !1,
                        "popper-class": "site-info-wrap",
                        class: "mr-[8px]"
                      }, {
                        dropdown: l(() => [
                          s(p, null, {
                            default: l(() => [
                              s(W, null, {
                                default: l(() => [
                                  t("div", Te, "站点编号：" + u(d.value.site_id), 1)
                                ]),
                                _: 1
                              }),
                              s(W, null, {
                                default: l(() => [
                                  d.value.expire_time == 0 ? (a(), k("div", Le, "到期时间：永久")) : (a(), k("div", We, "到期时间：" + u(d.value.expire_time), 1))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: l(() => [
                          t("div", Ve, [
                            t("span", Re, u(d.value.site_name), 1),
                            t("span", {
                              class: A(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": d.value.status == 1, "!text-[#f56c6c]": d.value.status == 3 }])
                            }, u(d.value.status_name), 3)
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    t("div", Ee, [
                      s(q, {
                        placement: "bottom",
                        width: 330,
                        trigger: "click",
                        visible: C.value,
                        "onUpdate:visible": n[2] || (n[2] = (o) => C.value = o)
                      }, {
                        reference: l(() => [
                          Ue
                        ]),
                        default: l(() => [
                          t("div", Fe, [
                            s(P, {
                              modelValue: z.value,
                              "onUpdate:modelValue": n[0] || (n[0] = (o) => z.value = o),
                              filterable: "",
                              class: "!w-[250px] mr-[20px] menu-select",
                              teleported: !1,
                              clearable: "",
                              onChange: te
                            }, {
                              default: l(() => [
                                (a(!0), k(H, null, O(c(ee), (o) => (a(), y(x, {
                                  key: o.name,
                                  label: o.full_title,
                                  value: o.name
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            s(g, {
                              type: "primary",
                              link: "",
                              onClick: n[1] || (n[1] = (o) => C.value = !1)
                            }, {
                              default: l(() => [
                                M(u(c(h)("取消")), 1)
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
                      onClick: ie
                    }, null, 8, Me),
                    c(J) == "site" ? (a(), k("i", {
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
          Y(t("input", {
            type: "hidden",
            "onUpdate:modelValue": n[3] || (n[3] = (o) => V.value = o)
          }, null, 512), [
            [G, V.value]
          ]),
          Y(t("input", {
            type: "hidden",
            "onUpdate:modelValue": n[4] || (n[4] = (o) => R.value = o)
          }, null, 512), [
            [G, R.value]
          ]),
          s(b, {
            modelValue: I.value,
            "onUpdate:modelValue": n[5] || (n[5] = (o) => I.value = o),
            title: c(h)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: l(() => [
              t("span", je, [
                s(g, { onClick: oe }, {
                  default: l(() => [
                    M(u(c(h)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: l(() => [
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
const et = /* @__PURE__ */ ge(Be, [["__scopeId", "data-v-fe6968fc"]]);
export {
  et as default
};
