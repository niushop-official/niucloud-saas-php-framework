import { defineComponent as ue, computed as U, ref as k, resolveComponent as i, openBlock as a, createBlock as x, withCtx as l, createElementVNode as e, normalizeClass as A, unref as s, createVNode as r, createElementBlock as S, Fragment as O, renderList as W, createTextVNode as B, toDisplayString as f, createCommentVNode as pe, withDirectives as G, vModelText as J, pushScopeId as de, popScopeId as fe } from "vue";
import { _ as Q } from "./logo.default-aeaa7888.js";
import { co as me, gS as _e, u as xe, s as p, i as K, t as v, _ as he } from "./core-shared-0b2facad.js";
import { useRoute as ve, useRouter as ge } from "vue-router";
import ye from "./user-info-b690312f.js";
import we from "./layout-setting-8318339f.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./index-d7cabf7a.js";
const D = (C) => (de("data-v-f1e446fa"), C = C(), fe(), C), be = { class: "flex items-center" }, ke = { class: "w-full h-[40px] overflow-hidden" }, Se = /* @__PURE__ */ D(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[70px]",
    src: Q,
    alt: "",
    "object-fit": "contain"
  })
], -1)), Ce = /* @__PURE__ */ D(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[180px]",
    src: Q,
    alt: "",
    "object-fit": "contain"
  })
], -1)), Ie = { class: "left-panel flex items-center text-[14px] leading-[1]" }, Ve = { class: "flex items-center h-full pl-[10px] hidden-xs-only" }, Te = { class: "right-panel h-full flex items-center justify-end" }, Le = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Re = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, je = { class: "mr-[6px] text-[12px] !text-[#333]" }, Ue = { class: "text-[14px]" }, Me = {
  key: 0,
  class: "text-[14px]"
}, Ee = {
  key: 1,
  class: "text-[14px]"
}, Ne = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Be = /* @__PURE__ */ D(() => /* @__PURE__ */ e("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), De = { class: "flex items-center" }, Fe = ["title"], $e = ["title"], He = { class: "navbar-item flex items-center h-full cursor-pointer" }, Pe = { class: "navbar-item flex items-center h-full cursor-pointer" }, qe = { class: "dialog-footer" }, ze = /* @__PURE__ */ ue({
  __name: "index",
  setup(C) {
    const u = me(), X = ve(), F = ge(), $ = _e(), h = xe(), Y = h.routers, m = U(() => h.siteInfo), Z = U(() => h.siteInfo.icon ? h.siteInfo.icon : u.website.icon), ee = U(() => h.siteInfo.logo ? h.siteInfo.logo : u.website.logo), I = k(!1), V = k(""), T = k("");
    p.get("comparisonTokenStorage") && (V.value = p.get("comparisonTokenStorage")), p.get("comparisonSiteIdStorage") && (T.value = p.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (n) => {
      document.visibilityState === "visible" && (T.value != p.get("siteId") || V.value != p.get("token")) && (I.value = !0);
    });
    const te = (n) => {
      let o = [], c = n == null ? void 0 : n.parent_route;
      for (; c; )
        c.short_title && o.unshift(c.short_title), c = c.parent_route;
      return o.join(" - ");
    }, H = (n, o = null, c = 1) => {
      let d = [];
      return n.forEach((R) => {
        const { path: M, name: j, meta: _ = {}, short_title: E, children: g } = R, y = (_.show === void 0 ? 1 : _.show) && c;
        if (_.type === 1 && y === 1) {
          const w = _.title || E || "", b = te(_), t = b ? `${b} - ${w}` : w, N = {
            path: M,
            name: j,
            title: w,
            parent_title: b,
            full_title: t
          };
          d.push(N);
        }
        g && g.length > 0 && (d = d.concat(H(g, R, y)));
      }), d;
    }, L = k(!1), P = k(""), oe = H(Y), ne = (n) => {
      n && (F.push({ name: n }), L.value = !1);
    }, le = () => {
      I.value = !1, location.reload();
    }, se = () => {
      $.routeRefreshTag && $.refreshRouterView();
    }, ie = U(() => {
      const n = X.matched.filter((o) => o.meta.title);
      return n[0] && n[0].path == "/" && n.splice(0, 1), n;
    });
    p.set({ key: "currHeadMenuName", data: "" }), u.toggleMenuCollapse(p.get("menuiscollapse") || !1);
    const re = () => {
      u.toggleMenuCollapse(!u.menuIsCollapse);
    }, ae = p.get("app_type"), ce = () => {
      const n = F.resolve({
        path: "/preview/wap",
        query: {
          page: "/"
        }
      });
      window.open(n.href);
    };
    return (n, o) => {
      const c = i("el-image"), d = i("icon"), R = i("el-breadcrumb-item"), M = i("el-breadcrumb"), j = i("el-dropdown-item"), _ = i("el-dropdown-menu"), E = i("el-dropdown"), g = i("el-option"), q = i("el-select"), y = i("el-button"), z = i("el-popover"), w = i("el-dialog"), b = i("el-container");
      return a(), x(b, { class: "h-[64px] w-full layout-admin flex items-center justify-between pr-[15px] border-b-[1px] border-solid border-[var(--el-color-info-light-8)]" }, {
        default: l(() => [
          e("div", be, [
            e("div", {
              class: A(["flex justify-center items-center flex-shrink-0", { "w-[185px]": s(u).menuIsCollapse, "w-[78px]": !s(u).menuIsCollapse }])
            }, [
              e("div", ke, [
                s(u).menuIsCollapse ? (a(), x(c, {
                  key: 1,
                  style: { width: "100%", height: "100%" },
                  src: s(K)(ee.value),
                  fit: "contain"
                }, {
                  error: l(() => [
                    Ce
                  ]),
                  _: 1
                }, 8, ["src"])) : (a(), x(c, {
                  key: 0,
                  style: { width: "100%", height: "100%" },
                  src: s(K)(Z.value),
                  fit: "contain"
                }, {
                  error: l(() => [
                    Se
                  ]),
                  _: 1
                }, 8, ["src"]))
              ])
            ], 2),
            e("div", Ie, [
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: re
              }, [
                s(u).menuIsCollapse ? (a(), x(d, {
                  key: 0,
                  name: "element Fold"
                })) : (a(), x(d, {
                  key: 1,
                  name: "element Expand"
                }))
              ]),
              e("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: se
              }, [
                r(d, { name: "element Refresh" })
              ]),
              e("div", Ve, [
                r(M, { separator: "/" }, {
                  default: l(() => [
                    (a(!0), S(O, null, W(ie.value, (t, N) => (a(), x(R, {
                      key: N,
                      to: t.path,
                      class: "inter"
                    }, {
                      default: l(() => [
                        B(f(t.meta.title), 1)
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
            e("div", Te, [
              e("div", Le, [
                r(E, {
                  trigger: "hover",
                  "hide-on-click": !1,
                  "popper-class": "site-info-wrap",
                  class: "mr-[8px]"
                }, {
                  dropdown: l(() => [
                    r(_, null, {
                      default: l(() => [
                        r(j, null, {
                          default: l(() => [
                            e("div", Ue, "站点编号：" + f(m.value.site_id), 1)
                          ]),
                          _: 1
                        }),
                        r(j, null, {
                          default: l(() => [
                            m.value.expire_time == 0 ? (a(), S("div", Me, "到期时间：永久")) : (a(), S("div", Ee, "到期时间：" + f(m.value.expire_time), 1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  default: l(() => [
                    e("div", Re, [
                      e("span", je, f(m.value.site_name), 1),
                      e("span", {
                        class: A(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": m.value.status == 1, "!text-[#f56c6c]": m.value.status == 3 }])
                      }, f(m.value.status_name), 3)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", Ne, [
                r(z, {
                  placement: "bottom",
                  width: 330,
                  trigger: "click",
                  visible: L.value,
                  "onUpdate:visible": o[2] || (o[2] = (t) => L.value = t)
                }, {
                  reference: l(() => [
                    Be
                  ]),
                  default: l(() => [
                    e("div", De, [
                      r(q, {
                        modelValue: P.value,
                        "onUpdate:modelValue": o[0] || (o[0] = (t) => P.value = t),
                        filterable: "",
                        class: "!w-[250px] mr-[20px] menu-select",
                        teleported: !1,
                        clearable: "",
                        onChange: ne
                      }, {
                        default: l(() => [
                          (a(!0), S(O, null, W(s(oe), (t) => (a(), x(g, {
                            key: t.name,
                            label: t.full_title,
                            value: t.name
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      r(y, {
                        type: "primary",
                        link: "",
                        onClick: o[1] || (o[1] = (t) => L.value = !1)
                      }, {
                        default: l(() => [
                          B(f(s(v)("取消")), 1)
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
                title: s(v)("visitWap"),
                onClick: ce
              }, null, 8, Fe),
              s(ae) == "site" ? (a(), S("i", {
                key: 0,
                class: "iconfont iconlingdang-xianxing cursor-pointer px-[8px]",
                title: s(v)("newInfo")
              }, null, 8, $e)) : pe("", !0),
              e("div", He, [
                r(we)
              ]),
              e("div", Pe, [
                r(ye)
              ])
            ])
          ]),
          G(e("input", {
            type: "hidden",
            "onUpdate:modelValue": o[3] || (o[3] = (t) => V.value = t)
          }, null, 512), [
            [J, V.value]
          ]),
          G(e("input", {
            type: "hidden",
            "onUpdate:modelValue": o[4] || (o[4] = (t) => T.value = t)
          }, null, 512), [
            [J, T.value]
          ]),
          r(w, {
            modelValue: I.value,
            "onUpdate:modelValue": o[5] || (o[5] = (t) => I.value = t),
            title: s(v)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: l(() => [
              e("span", qe, [
                r(y, { onClick: le }, {
                  default: l(() => [
                    B(f(s(v)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: l(() => [
              e("span", null, f(s(v)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      });
    };
  }
});
const nt = /* @__PURE__ */ he(ze, [["__scopeId", "data-v-f1e446fa"]]);
export {
  nt as default
};
