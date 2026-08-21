import { defineComponent as xe, ref as f, computed as F, onMounted as ge, watch as ye, resolveComponent as u, openBlock as p, createBlock as G, normalizeClass as D, withCtx as r, createElementVNode as n, createVNode as c, unref as _, createElementBlock as m, toDisplayString as h, Fragment as K, renderList as Q, createCommentVNode as Y, createTextVNode as ee, withDirectives as te, vModelText as oe, pushScopeId as we, popScopeId as ke } from "vue";
import { _ as Se } from "./icon-addon-90fccbab.js";
import be from "./layout-setting-5bc8d261.js";
import Me from "./user-info-30df972c.js";
import { s as d, gZ as Ie, co as Ce, gS as Ae, u as Ee, cs as ne, gX as Ve, i as Le, t as k, _ as Ne } from "./core-shared-0b2facad.js";
import { useRoute as Re, useRouter as Te } from "vue-router";
import "./site_empty-63fceac6.js";
import "@element-plus/icons-vue";
import "element-plus";
import "./index-d7cabf7a.js";
import "axios";
import "vue-i18n";
import "pinia";
const B = (C) => (we("data-v-d97ce903"), C = C(), ke(), C), We = { class: "flex items-center h-full px-[10px] w-full box-border" }, je = { class: "left-panel h-full flex items-center" }, Ue = {
  key: 0,
  class: "logo flex items-center"
}, $e = /* @__PURE__ */ B(() => /* @__PURE__ */ n("div", { class: "flex justify-center items-center w-full h-[30px] rounded-[6px]" }, [
  /* @__PURE__ */ n("img", {
    class: "max-w-[30px]",
    src: Se,
    alt: "",
    "object-fit": "contain"
  })
], -1)), Fe = {
  key: 1,
  class: "logo flex items-center justify-center"
}, De = /* @__PURE__ */ B(() => /* @__PURE__ */ n("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), Ke = [
  De
], Be = { class: "ml-[10px] text-[#333] max-w-[150px] using-hidden" }, Je = { class: "flex items-center gap-[8px] h-[var(--layout-header-height)] text-[var(--layout-header-text-color)]" }, Oe = ["onClick"], ze = { class: "ml-auto right-panel h-full flex items-center justify-end" }, Pe = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, qe = { class: "mx-[8px] bg-[#f6f6f6] border-[1px] border-solid border-[#eee] rounded-[4px] px-[9px] py-[6px] flex items-center" }, He = { class: "mr-[6px] text-[12px] !text-[#333]" }, Xe = { class: "text-[14px]" }, Ze = {
  key: 0,
  class: "text-[14px]"
}, Ge = {
  key: 1,
  class: "text-[14px]"
}, Qe = { class: "flex items-center flex-shrink-0 hidden-xs-only" }, Ye = /* @__PURE__ */ B(() => /* @__PURE__ */ n("i", { class: "iconfont icona-sousuoV6xx-36 cursor-pointer px-[8px] !text-[14px]" }, null, -1)), et = { class: "flex items-center" }, tt = ["title"], ot = ["title"], nt = { class: "navbar-item flex items-center h-full cursor-pointer" }, st = { class: "navbar-item flex items-center h-full cursor-pointer" }, lt = { class: "dialog-footer" }, at = /* @__PURE__ */ xe({
  __name: "index",
  setup(C) {
    var H, X, Z;
    const se = d.get("app_type"), { toggle: it } = Ie(), T = Ce(), rt = Ae(), v = Re(), W = Te(), le = f(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth), S = Ee(), i = F(() => S.siteInfo), ae = S.addonIndexRoute, ie = F(() => T.dark), A = f(!1), J = S.routers, O = F(() => S.siteInfo.logo ? S.siteInfo.logo : T.website.logo), E = f(!1), V = f(""), L = f("");
    d.get("comparisonTokenStorage") && (V.value = d.get("comparisonTokenStorage")), d.get("comparisonSiteIdStorage") && (L.value = d.get("comparisonSiteIdStorage")), document.addEventListener("visibilitychange", (e) => {
      document.visibilityState === "visible" && (L.value != d.get("siteId") || V.value != d.get("token")) && (E.value = !0);
    });
    const re = () => {
      E.value = !1, location.href = `${location.origin}/site/`;
    }, j = f([]), z = f([]);
    ge(() => {
      const e = de();
      j.value = ue(e), z.value = pe(e), d.set({ key: "specialMenuNames", data: j.value }), d.set({ key: "specialMenuNamesLevel1", data: z.value }), window.onresize = () => (() => {
        le.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    });
    const x = f([]), N = {};
    if (J.forEach((e) => {
      var t, o;
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = ne(e.children)), x.value.push(e)) : e.meta.addon != "" && ((t = i.value) == null ? void 0 : t.apps.length) <= 1 && ((o = i.value) == null ? void 0 : o.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((s) => {
        s.original_name = s.name, s.children && s.children.length && (s.name = ne(s.children));
      }), x.value.unshift(...e.children)) : x.value.unshift(e) : N[e.meta.addon] = e, x.value.sort((s, a) => s.meta.sort && a.meta.sort ? a.meta.sort - s.meta.sort : s.meta.sort ? -1 : a.meta.sort ? 1 : 0);
    }), ((H = i.value) == null ? void 0 : H.apps.length) > 1) {
      const e = [];
      (X = i.value) == null || X.apps.forEach((t) => {
        N[t.key] && (N[t.key].name = ae[t.key], e.push(N[t.key]));
      }), x.value.unshift(...e), x.value.sort((t, o) => t.meta.sort && o.meta.sort ? o.meta.sort - t.meta.sort : t.meta.sort ? -1 : o.meta.sort ? 1 : 0);
    }
    const w = f(((Z = x.value[0]) == null ? void 0 : Z.name) || "");
    ye(v, () => {
      var e, t;
      if (v.meta.attr != "")
        w.value = v.matched[1].name;
      else if (((e = i.value) == null ? void 0 : e.apps.length) > 1)
        w.value = v.matched[2].name;
      else {
        const o = v.matched[2];
        o.meta.addon == "" ? w.value = v.matched[2].name : o.meta.addon == ((t = i.value) == null ? void 0 : t.apps[0].key) ? w.value = v.matched[3].name : w.value = v.matched[2].name;
      }
    }, { immediate: !0 });
    const ce = (e) => {
      j.value.includes(e) || d.remove("activeAppKey"), W.push({ name: e });
    }, de = () => {
      const e = d.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), o = d.get("activeAppKey");
        t.forEach((a) => {
          a.children && Array.isArray(a.children) && ((g) => {
            g.forEach((y) => {
              y && y.is_show !== void 0 && (y.is_show = y.menu_key === o ? 1 : 0);
            });
          })(a.children);
        });
        const s = t.filter((a) => a.children && a.children.length > 0);
        return Ve(s);
      }
      return [];
    }, ue = (e) => {
      const t = [], o = (s) => {
        s.forEach((a) => {
          a.name && t.push(a.name), a.children && Array.isArray(a.children) && o(a.children);
        });
      };
      return e.forEach((s) => {
        s.children && Array.isArray(s.children) && o(s.children);
      }), t;
    }, pe = (e) => {
      const t = [];
      return e.forEach((o) => {
        o.name && t.push(o.name);
      }), t;
    }, fe = () => {
      const e = W.resolve({
        path: "/preview/wap",
        query: {
          page: `/addon/mall/pages/index?site_id=${i.value.site_id}`
        }
      });
      window.open(e.href);
    }, _e = (e) => {
      const t = [];
      let o = e == null ? void 0 : e.parent_route;
      for (; o; )
        o.short_title && t.unshift(o.short_title), o = o.parent_route;
      return t.join(" - ");
    }, P = (e, t = null) => {
      let o = [];
      return e.forEach((s) => {
        const { path: a, name: R, meta: g = {}, short_title: y, children: b } = s;
        if (g.type == 1 && g.show == 1) {
          const M = g.title || y || "", I = _e(g), $ = I ? `${I} - ${M}` : M, l = {
            path: a,
            name: R,
            title: M,
            parent_title: I,
            full_title: $
          };
          o.push(l);
        }
        b && b.length > 0 && (o = o.concat(P(b, s)));
      }), o;
    }, me = P(J), q = f(""), he = (e) => {
      e && (W.push({ name: e }), A.value = !1);
    };
    return (e, t) => {
      const o = u("el-image"), s = u("el-header"), a = u("el-dropdown-item"), R = u("el-dropdown-menu"), g = u("el-dropdown"), y = u("el-option"), b = u("el-select"), U = u("el-button"), M = u("el-popover"), I = u("el-dialog"), $ = u("el-container");
      return p(), G($, {
        class: D(["h-full bg-[var(--layout-header-bg)]", { "layout-header border-b border-color": !ie.value }])
      }, {
        default: r(() => [
          n("div", We, [
            n("div", je, [
              c(s, { class: "logo-wrap flex items-center w-[190px]" }, {
                default: r(() => [
                  _(T).menuIsCollapse ? (p(), m("div", Fe, Ke)) : (p(), m("div", Ue, [
                    c(o, {
                      style: { width: "30px", height: "30px" },
                      class: "rounded-[6px]",
                      src: _(Le)(O.value ? O.value : ""),
                      fit: "contain"
                    }, {
                      error: r(() => [
                        $e
                      ]),
                      _: 1
                    }, 8, ["src"])
                  ])),
                  n("div", Be, h(i.value.site_name), 1)
                ]),
                _: 1
              })
            ]),
            n("div", Je, [
              (p(!0), m(K, null, Q(x.value, (l, ve) => (p(), m(K, { key: ve }, [
                l.meta.show ? (p(), m("div", {
                  key: 0,
                  class: "flex items-center cursor-pointer",
                  onClick: (ct) => ce(l.name)
                }, [
                  n("span", {
                    class: D(["px-[14px] truncate text-[14px] text-[#333] h-[60px] leading-[60px] rounded-[4px] hover:text-primary", { "!text-primary font-bold oneMenu": w.value === l.original_name }])
                  }, h(l.meta.short_title || l.meta.title), 3)
                ], 8, Oe)) : Y("", !0)
              ], 64))), 128))
            ]),
            n("div", ze, [
              n("div", Pe, [
                c(g, {
                  trigger: "hover",
                  "hide-on-click": !1,
                  "popper-class": "site-info-wrap",
                  class: "mr-[8px]"
                }, {
                  dropdown: r(() => [
                    c(R, null, {
                      default: r(() => [
                        c(a, null, {
                          default: r(() => [
                            n("div", Xe, "站点编号：" + h(i.value.site_id), 1)
                          ]),
                          _: 1
                        }),
                        c(a, null, {
                          default: r(() => [
                            i.value.expire_time == 0 ? (p(), m("div", Ze, "到期时间：永久")) : (p(), m("div", Ge, "到期时间：" + h(i.value.expire_time), 1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  default: r(() => [
                    n("div", qe, [
                      n("span", He, h(i.value.site_name), 1),
                      n("span", {
                        class: D(["!text-[10px] text-[#f56c6c]", { "!text-[#67c23a]": i.value.status == 1, "!text-[#f56c6c]": i.value.status == 3 }])
                      }, h(i.value.status_name), 3)
                    ])
                  ]),
                  _: 1
                })
              ]),
              n("div", Qe, [
                c(M, {
                  placement: "bottom",
                  width: 330,
                  trigger: "click",
                  visible: A.value,
                  "onUpdate:visible": t[2] || (t[2] = (l) => A.value = l)
                }, {
                  reference: r(() => [
                    Ye
                  ]),
                  default: r(() => [
                    n("div", et, [
                      c(b, {
                        modelValue: q.value,
                        "onUpdate:modelValue": t[0] || (t[0] = (l) => q.value = l),
                        filterable: "",
                        class: "!w-[250px] mr-[20px] menu-select",
                        teleported: !1,
                        clearable: "",
                        onChange: he
                      }, {
                        default: r(() => [
                          (p(!0), m(K, null, Q(_(me), (l) => (p(), G(y, {
                            key: l.name,
                            label: l.full_title,
                            value: l.name
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      c(U, {
                        type: "primary",
                        link: "",
                        onClick: t[1] || (t[1] = (l) => A.value = !1)
                      }, {
                        default: r(() => [
                          ee(h(_(k)("取消")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["visible"])
              ]),
              n("i", {
                class: "navbar-item iconfont iconicon_huojian1 cursor-pointer text-[#333]",
                title: _(k)("visitWap"),
                onClick: fe
              }, null, 8, tt),
              _(se) == "site" ? (p(), m("i", {
                key: 0,
                class: "navbar-item iconfont iconlingdang-xianxing cursor-pointer text-[#333]",
                title: _(k)("newInfo")
              }, null, 8, ot)) : Y("", !0),
              n("div", nt, [
                c(be)
              ]),
              n("div", st, [
                c(Me)
              ])
            ])
          ]),
          te(n("input", {
            type: "hidden",
            "onUpdate:modelValue": t[3] || (t[3] = (l) => V.value = l)
          }, null, 512), [
            [oe, V.value]
          ]),
          te(n("input", {
            type: "hidden",
            "onUpdate:modelValue": t[4] || (t[4] = (l) => L.value = l)
          }, null, 512), [
            [oe, L.value]
          ]),
          c(I, {
            modelValue: E.value,
            "onUpdate:modelValue": t[5] || (t[5] = (l) => E.value = l),
            title: _(k)("layout.detectionLoginTip"),
            width: "30%",
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !1,
            "append-to-body": !0
          }, {
            footer: r(() => [
              n("span", lt, [
                c(U, { onClick: re }, {
                  default: r(() => [
                    ee(h(_(k)("layout.detectionLoginOperation")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: r(() => [
              n("span", null, h(_(k)("layout.detectionLoginContent")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const St = /* @__PURE__ */ Ne(at, [["__scopeId", "data-v-d97ce903"]]);
export {
  St as default
};
