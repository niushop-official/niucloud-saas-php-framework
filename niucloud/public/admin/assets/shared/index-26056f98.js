import { defineComponent as ve, ref as c, computed as j, onMounted as xe, watch as ge, resolveComponent as x, openBlock as m, createBlock as ye, normalizeClass as N, unref as l, withCtx as p, createElementVNode as s, createVNode as d, createElementBlock as g, toDisplayString as y, Fragment as G, renderList as ke, createCommentVNode as Q, withDirectives as X, vModelText as Y, createTextVNode as we, pushScopeId as Se, popScopeId as Ie } from "vue";
import { _ as be } from "./icon-addon-90fccbab.js";
import Me from "./index-38fee933.js";
import Ce from "./index-bc96ee75.js";
import Re from "./index-cb00d4d0.js";
import Ae from "./user-info-f67c1e4e.js";
import Le from "./index-835144c3.js";
import { m as u, hL as Ee, u as Te, hv as Ve, hA as je, h as Ne, cA as Z, hJ as We, j as Je, t as E, a as Ue } from "./core-shared-c6ad4e77.js";
import { useRoute as Fe, useRouter as $e } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./site_empty-63fceac6.js";
import "./index-31b5b072.js";
const ee = (b) => (Se("data-v-f2ec80d5"), b = b(), Ie(), b), De = { class: "flex items-center h-full px-[10px] w-full box-border" }, Ke = { class: "left-panel h-full flex items-center" }, Be = { class: "flex items-center justify-center min-w-0 max-w-full" }, Oe = {
  key: 0,
  class: "logo flex items-center shrink-0"
}, ze = /* @__PURE__ */ ee(() => /* @__PURE__ */ s("div", { class: "flex justify-center items-center w-full h-[30px] rounded-[6px]" }, [
  /* @__PURE__ */ s("img", {
    class: "max-w-[30px]",
    src: be,
    alt: "",
    "object-fit": "contain"
  })
], -1)), He = {
  key: 1,
  class: "logo flex items-center justify-center shrink-0"
}, Pe = /* @__PURE__ */ ee(() => /* @__PURE__ */ s("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), qe = [
  Pe
], Ge = { class: "ml-[10px] text-[20px] text-[#333] min-w-0 using-hidden" }, Qe = { class: "flex items-center gap-[8px] h-[var(--layout-header-height)] text-[var(--layout-header-text-color)]" }, Xe = ["onClick"], Ye = { class: "ml-auto right-panel h-full flex items-center justify-end" }, Ze = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, et = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, tt = { class: "mr-[6px] text-[12px] !text-[#333]" }, nt = { class: "text-[14px]" }, ot = {
  key: 0,
  class: "text-[14px]"
}, st = {
  key: 1,
  class: "text-[14px]"
}, at = { class: "navbar-item flex items-center h-full cursor-pointer" }, lt = ["title"], rt = { class: "dialog-footer" }, it = /* @__PURE__ */ ve({
  __name: "index",
  setup(b) {
    var O, z, H;
    const te = u.get("app_type"), W = c(), J = c(), U = c(), ne = () => {
      var e;
      return (e = W.value) == null ? void 0 : e.open();
    }, oe = () => {
      var e;
      return (e = J.value) == null ? void 0 : e.open();
    }, se = () => {
      var e;
      return (e = U.value) == null ? void 0 : e.open();
    }, { toggle: ct } = Ee(), T = Te(), dt = Ve(), h = Fe(), F = $e(), { handleMenuJump: ae } = je(), le = c(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), w = Ne(), i = j(() => w.siteInfo), re = w.addonIndexRoute, ie = j(() => T.dark), ce = c(!1), $ = w.routers, D = j(() => w.siteInfo.logo ? w.siteInfo.logo : T.website.logo), M = c(!1), C = c(""), R = c("");
    u.get("comparisonTokenStorage") && (C.value = u.get("comparisonTokenStorage")), u.get("comparisonSiteIdStorage") && (R.value = u.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (R.value != u.get("siteId") || C.value != u.get("token")) && (M.value = !0);
    });
    const de = () => {
      M.value = !1, location.href = `${location.origin}/site/`;
    }, V = c([]), K = c([]);
    xe(() => {
      const e = pe();
      V.value = fe(e), K.value = me(e), u.set({ key: "specialMenuNames", data: V.value }), u.set({ key: "specialMenuNamesLevel1", data: K.value }), window.onresize = () => (() => {
        le.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const f = c([]), A = {};
    if ($.forEach((e) => {
      var t, n;
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = Z(e.children)), f.value.push(e)) : e.meta.addon != "" && ((t = i.value) == null ? void 0 : t.apps.length) <= 1 && ((n = i.value) == null ? void 0 : n.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((o) => {
        o.original_name = o.name, o.children && o.children.length && (o.name = Z(o.children));
      }), f.value.unshift(...e.children)) : f.value.unshift(e) : A[e.meta.addon] = e, f.value.sort((o, a) => o.meta.sort && a.meta.sort ? a.meta.sort - o.meta.sort : o.meta.sort ? -1 : a.meta.sort ? 1 : 0);
    }), ((O = i.value) == null ? void 0 : O.apps.length) > 1) {
      const e = [];
      (z = i.value) == null || z.apps.forEach((t) => {
        A[t.key] && (A[t.key].name = re[t.key], e.push(A[t.key]));
      }), f.value.unshift(...e), f.value.sort((t, n) => t.meta.sort && n.meta.sort ? n.meta.sort - t.meta.sort : t.meta.sort ? -1 : n.meta.sort ? 1 : 0);
    }
    const k = c(((H = f.value[0]) == null ? void 0 : H.name) || "");
    ge(h, () => {
      var e, t;
      if (h.meta.attr != "")
        k.value = h.matched[1].name;
      else if (((e = i.value) == null ? void 0 : e.apps.length) > 1)
        k.value = h.matched[2].name;
      else {
        const n = h.matched[2];
        n.meta.addon == "" ? k.value = h.matched[2].name : n.meta.addon == ((t = i.value) == null ? void 0 : t.apps[0].key) ? k.value = h.matched[3].name : k.value = h.matched[2].name;
      }
    }, { immediate: !0 });
    const ue = (e) => {
      V.value.includes(e) || u.remove("activeAppKey");
      const n = f.value.find((o) => o.name === e);
      ae(e, n == null ? void 0 : n.meta) || F.push({ name: e });
    }, pe = () => {
      const e = u.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), n = u.get("activeAppKey");
        t.forEach((a) => {
          a.children && Array.isArray(a.children) && ((_) => {
            _.forEach((v) => {
              v && v.is_show !== void 0 && (v.is_show = v.menu_key === n ? 1 : 0);
            });
          })(a.children);
        });
        const o = t.filter((a) => a.children && a.children.length > 0);
        return We(o);
      }
      return [];
    }, fe = (e) => {
      const t = [], n = (o) => {
        o.forEach((a) => {
          a.name && t.push(a.name), a.children && Array.isArray(a.children) && n(a.children);
        });
      };
      return e.forEach((o) => {
        o.children && Array.isArray(o.children) && n(o.children);
      }), t;
    }, me = (e) => {
      const t = [];
      return e.forEach((n) => {
        n.name && t.push(n.name);
      }), t;
    }, he = (e) => {
      const t = [];
      let n = e == null ? void 0 : e.parent_route;
      for (; n; )
        n.short_title && t.unshift(n.short_title), n = n.parent_route;
      return t.join(" - ");
    }, B = (e, t = null) => {
      let n = [];
      return e.forEach((o) => {
        const { path: a, name: L, meta: _ = {}, short_title: v, children: S } = o;
        if (_.type == 1 && _.show == 1) {
          const r = _.title || v || "", I = he(_), q = I ? `${I} - ${r}` : r, _e = {
            path: a,
            name: L,
            title: r,
            parent_title: I,
            full_title: q
          };
          n.push(_e);
        }
        S && S.length > 0 && (n = n.concat(B(S, o)));
      }), n;
    }, ut = B($), pt = c(""), ft = (e) => {
      e && (F.push({ name: e }), ce.value = !1);
    };
    return (e, t) => {
      const n = x("el-image"), o = x("el-header"), a = x("el-dropdown-item"), L = x("el-dropdown-menu"), _ = x("el-dropdown"), v = x("el-button"), S = x("el-dialog"), P = x("el-container");
      return m(), ye(P, {
        class: N(["h-full bg-[var(--layout-header-bg)]", { "layout-header border-b border-color": !l(ie) }])
      }, {
        default: p(() => [
          s("div", De, [
            s("div", Ke, [
              d(o, { class: "logo-wrap flex items-center justify-center w-[190px]" }, {
                default: p(() => [
                  s("div", Be, [
                    l(T).menuIsCollapse ? (m(), g("div", He, qe)) : (m(), g("div", Oe, [
                      d(n, {
                        style: { width: "30px", height: "30px" },
                        class: "rounded-[6px]",
                        src: l(Je)(l(D) ? l(D) : ""),
                        fit: "contain"
                      }, {
                        error: p(() => [
                          ze
                        ]),
                        _: 1
                      }, 8, ["src"])
                    ])),
                    s("div", Ge, y(l(i).site_name), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            s("div", Qe, [
              (m(!0), g(G, null, ke(f.value, (r, I) => (m(), g(G, { key: I }, [
                r.meta.show ? (m(), g("div", {
                  key: 0,
                  class: "flex items-center cursor-pointer",
                  onClick: (q) => ue(r.name)
                }, [
                  s("span", {
                    class: N(["px-[14px] truncate text-[14px] text-[#333] h-[60px] leading-[60px] rounded-[4px] hover:text-primary", { "!text-primary font-bold oneMenu": k.value === r.original_name }])
                  }, y(r.meta.short_title || r.meta.title), 3)
                ], 8, Xe)) : Q("", !0)
              ], 64))), 128))
            ]),
            s("div", Ye, [
              s("div", Ze, [
                d(_, {
                  trigger: "hover",
                  "hide-on-click": !1,
                  "popper-class": "site-info-wrap",
                  class: "mr-[8px]"
                }, {
                  dropdown: p(() => [
                    d(L, null, {
                      default: p(() => [
                        d(a, null, {
                          default: p(() => [
                            s("div", nt, "站点编号：" + y(l(i).site_id), 1)
                          ]),
                          _: 1
                        }),
                        d(a, null, {
                          default: p(() => [
                            l(i).expire_time == 0 ? (m(), g("div", ot, "到期时间：永久")) : (m(), g("div", st, "到期时间：" + y(l(i).expire_time), 1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  default: p(() => [
                    s("div", et, [
                      s("span", tt, y(l(i).site_name), 1),
                      s("span", {
                        class: N(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": l(i).status == 1, "!text-[#f56c6c]": l(i).status == 3 }])
                      }, y(l(i).status_name), 3)
                    ])
                  ]),
                  _: 1
                })
              ]),
              s("div", at, [
                d(Ce)
              ]),
              d(Le, { class: "navbar-item text-[#333]" }),
              l(te) == "site" ? (m(), g("i", {
                key: 0,
                class: "navbar-item iconfont iconlingdang-xianxing cursor-pointer text-[#333]",
                title: l(E)("newInfo")
              }, null, 8, lt)) : Q("", !0),
              s("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: ne
              }, [
                d(Re, {
                  ref_key: "taskIndicatorRef",
                  ref: W
                }, null, 512)
              ]),
              s("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: oe
              }, [
                d(Me, {
                  ref_key: "layoutSettingRef",
                  ref: J,
                  "icon-color": "#333"
                }, null, 512)
              ]),
              s("div", {
                class: "navbar-item flex items-center h-full cursor-pointer",
                onClick: se
              }, [
                d(Ae, {
                  ref_key: "userInfoRef",
                  ref: U
                }, null, 512)
              ])
            ])
          ]),
          X(s("input", {
            type: "hidden",
            "onUpdate:modelValue": t[0] || (t[0] = (r) => C.value = r)
          }, null, 512), [
            [Y, C.value]
          ]),
          X(s("input", {
            type: "hidden",
            "onUpdate:modelValue": t[1] || (t[1] = (r) => R.value = r)
          }, null, 512), [
            [Y, R.value]
          ]),
          d(S, {
            modelValue: M.value,
            "onUpdate:modelValue": t[2] || (t[2] = (r) => M.value = r),
            title: l(E)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: p(() => [
              s("span", rt, [
                d(v, { onClick: de }, {
                  default: p(() => [
                    we(y(l(E)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: p(() => [
              s("span", null, y(l(E)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const Lt = /* @__PURE__ */ Ue(it, [["__scopeId", "data-v-f2ec80d5"]]);
export {
  Lt as default
};
