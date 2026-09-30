import { defineComponent as ze, ref as p, reactive as Ue, toRefs as De, onMounted as Te, nextTick as le, onUnmounted as Me, computed as ae, watch as Ee, resolveComponent as g, resolveDirective as Fe, openBlock as l, createElementBlock as a, Fragment as f, createElementVNode as o, unref as n, createVNode as r, withCtx as m, toDisplayString as c, createCommentVNode as h, withDirectives as T, vShow as P, normalizeClass as k, renderList as C, withModifiers as V, withKeys as Ae, createBlock as ne, createTextVNode as x, pushScopeId as Pe, popScopeId as He } from "vue";
import { _ as Ne } from "./logo.default-aeaa7888.js";
import { _ as je } from "./site_default-f84c6c4e.js";
import { _ as Oe } from "./site_empty-63fceac6.js";
import { ArrowLeft as Re, ArrowRight as Be, Search as Ge } from "@element-plus/icons-vue";
import { h as ie, cw as We, cx as Ke, u as Je, cy as Ye, aH as qe, j as re, cz as Qe, aS as ce, a as Xe } from "./core-shared-c6ad4e77.js";
import { g as Ze } from "./addon-bae583af.js";
import { ElMessage as et } from "element-plus";
import tt from "./create-site-dialog-0a748746.js";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const v = (M) => (Pe("data-v-419d1a31"), M = M(), He(), M), ot = { class: "home-workbench" }, st = { class: "home-header" }, lt = {
  key: 0,
  class: "home-brand"
}, at = { class: "home-brand-logo" }, nt = /* @__PURE__ */ v(() => /* @__PURE__ */ o("img", {
  class: "w-full h-full object-contain",
  src: Ne,
  alt: ""
}, null, -1)), it = { class: "home-brand-name" }, rt = { class: "home-header-right" }, ct = { class: "home-user" }, ut = { class: "home-user-avatar" }, dt = { class: "home-user-menu" }, pt = { class: "home-user-menu-head" }, mt = { class: "home-user-avatar is-lg" }, _t = { class: "home-user-menu-info" }, vt = { class: "home-user-menu-name" }, ht = { class: "home-user-menu-role" }, gt = /* @__PURE__ */ v(() => /* @__PURE__ */ o("div", { class: "home-user-menu-divider" }, null, -1)), ft = { class: "home-main" }, kt = { class: "home-toolbar" }, yt = { class: "home-menu-container" }, bt = { class: "home-scroll-wrap" }, wt = ["onClick"], St = {
  key: 0,
  class: "home-popover-wrap shrink-0"
}, Ct = ["onClick"], xt = ["onClick"], It = { class: "home-toolbar-right" }, Vt = { class: "home-popover-wrap" }, $t = ["onClick"], Lt = { class: "home-filter-group" }, zt = /* @__PURE__ */ v(() => /* @__PURE__ */ o("label", { class: "home-filter-label" }, "平台分类", -1)), Ut = { class: "home-filter-group" }, Dt = /* @__PURE__ */ v(() => /* @__PURE__ */ o("label", { class: "home-filter-label" }, "状态", -1)), Tt = { class: "home-filter-group" }, Mt = /* @__PURE__ */ v(() => /* @__PURE__ */ o("label", { class: "home-filter-label" }, "排序方式", -1)), Et = { class: "home-filter-actions" }, Ft = { class: "home-content page-scrollbar" }, At = {
  key: 0,
  class: "home-grid"
}, Pt = ["onClick"], Ht = { class: "home-card-head" }, Nt = { class: "home-card-avatar" }, jt = ["src"], Ot = {
  key: 1,
  src: je,
  alt: ""
}, Rt = { class: "home-card-info" }, Bt = { class: "home-card-name" }, Gt = { class: "home-card-id" }, Wt = {
  key: 0,
  class: "home-card-tags"
}, Kt = { class: "home-card-footer" }, Jt = { class: "home-expire" }, Yt = /* @__PURE__ */ v(() => /* @__PURE__ */ o("span", { class: "home-expire-label" }, "到期时间", -1)), qt = {
  key: 0,
  class: "home-channels"
}, Qt = ["title", "onClick"], Xt = ["title", "onClick"], Zt = {
  key: 1,
  class: "home-empty"
}, eo = /* @__PURE__ */ v(() => /* @__PURE__ */ o("img", {
  src: Oe,
  class: "w-[220px] h-[165px]"
}, null, -1)), to = /* @__PURE__ */ v(() => /* @__PURE__ */ o("p", { class: "home-empty-text" }, "暂无站点", -1)), oo = [
  eo,
  to
], so = {
  key: 0,
  class: "home-pagination"
}, lo = {
  key: 1,
  class: "home-copyright"
}, ao = ["href"], no = {
  key: 0,
  class: "mr-3"
}, io = {
  key: 0,
  href: "https://beian.miit.gov.cn/",
  target: "_blank"
}, ro = { class: "mr-3" }, co = /* @__PURE__ */ v(() => /* @__PURE__ */ o("span", { class: "mx-1" }, "开发者联盟与隐私的声明", -1)), uo = /* @__PURE__ */ v(() => /* @__PURE__ */ o("span", { class: "mx-1" }, "隐私政策", -1)), po = /* @__PURE__ */ v(() => /* @__PURE__ */ o("span", { class: "mx-1" }, "联系我们", -1)), mo = /* @__PURE__ */ v(() => /* @__PURE__ */ o("span", { class: "mx-1" }, "Cookies", -1)), _o = { class: "dialog-footer" }, vo = /* @__PURE__ */ ze({
  __name: "index",
  setup(M) {
    const L = ie(), y = p(null);
    We().then(({ data: s }) => {
      y.value = s;
    });
    const E = p(!1), ue = () => {
      y.value.copyright_desc && (E.value = !0);
    }, de = p([
      {
        label: "创建时间",
        value: "create_time"
      },
      {
        label: "站点编号",
        value: "site_id"
      }
    ]), K = p([
      { label: "全部状态", value: "" }
    ]);
    Ke().then((s) => {
      const e = s.data || {};
      K.value = [
        { label: "全部状态", value: "" },
        ...Object.keys(e).map((_) => ({ label: e[_], value: String(_) }))
      ];
    }).catch(() => {
    });
    const pe = [
      { label: "H5", value: "h5" },
      { label: "微信小程序", value: "wx" },
      { label: "PC", value: "pc" },
      { label: "APP", value: "app" },
      { label: "支付宝小程序", value: "zfb" }
    ], i = Ue({
      params: {
        keywords: "",
        page: 1,
        limit: 20,
        app: "",
        sort: "create_time",
        status: ""
      },
      loading: !1,
      tableData: [],
      total: 0
    }), { params: $, loading: J, tableData: Y } = De(i), b = (s = 1) => {
      i.params.page = s, i.loading = !0, Qe(i.params).then((e) => {
        i.tableData = e.data.data, i.total = e.data.total, i.loading = !1;
      }).catch(() => {
        i.loading = !1;
      });
    };
    b();
    const F = p(""), d = p({
      appType: "",
      sort: "create_time",
      status: ""
    }), I = p(!1), w = p(!1), q = (s) => {
      var _;
      const e = s.target;
      (_ = e == null ? void 0 : e.closest) != null && _.call(e, ".el-popper, .el-select__popper, .el-select-dropdown") || (I.value = !1, w.value = !1);
    }, H = p(null), Q = p(!1), X = p(!1), z = () => {
      const s = H.value;
      if (!s)
        return;
      const e = s.scrollWidth - s.clientWidth;
      Q.value = s.scrollLeft > 1, X.value = e > 1 && s.scrollLeft < e - 1;
    }, Z = (s) => {
      const e = H.value;
      if (!e)
        return;
      const _ = Math.max(e.clientWidth * 0.8, 120);
      e.scrollBy({ left: s * _, behavior: "smooth" });
    };
    Te(() => {
      document.addEventListener("click", q), window.addEventListener("resize", z), le(z);
    }), Me(() => {
      document.removeEventListener("click", q), window.removeEventListener("resize", z);
    });
    const me = () => {
      w.value = !1, I.value = !I.value;
    }, _e = () => {
      I.value = !1, w.value || (d.value.appType = F.value, d.value.sort = i.params.sort, d.value.status = i.params.status), w.value = !w.value;
    }, A = (s) => {
      i.params.app = s, I.value = !1, b(1);
    }, ve = () => {
      F.value = d.value.appType, i.params.sort = d.value.sort, i.params.status = d.value.status, w.value = !1, b(1);
    }, he = () => {
      d.value.appType = "", d.value.sort = "create_time", d.value.status = "", F.value = "", i.params.sort = "create_time", i.params.status = "", w.value = !1, b(1);
    }, N = ae(() => Je().website), ee = ae(() => {
      var s;
      return String(((s = L.userInfo) == null ? void 0 : s.username) || "U").slice(0, 1).toUpperCase();
    }), j = (s, e) => {
      if (window.localStorage.setItem("site.siteId", s.site_id), window.localStorage.setItem("site.siteInfo", s), window.localStorage.setItem("site.comparisonSiteIdStorage", s.site_id), e) {
        e.url && window.open(e.url);
        return;
      }
      window.open(`${location.origin}/site/`);
    }, ge = () => {
      window.localStorage.setItem("admin.siteId", 0), window.localStorage.getItem("admin.token") || (window.localStorage.setItem("admin.token", ce()), window.localStorage.setItem("admin.comparisonTokenStorage", ce())), window.localStorage.getItem("admin.userinfo") || window.localStorage.setItem("admin.userinfo", JSON.stringify(ie().userInfo)), location.replace(location.origin + "/admin");
    }, fe = () => {
      L.logout();
    }, U = p([]);
    Ze().then(({ data: s }) => {
      const e = [];
      Object.keys(s).forEach((_) => {
        const S = s[_];
        S.type == "app" && e.push(S);
      }), U.value = e;
    }).catch(), Ee(U, () => le(z), { flush: "post" });
    const ke = {
      pc: "iconPCc",
      h5: "iconH5c",
      app: "iconAPPc",
      weapp: "iconxiaochengxutongbuc",
      aliapp: "iconzhifubaoxiaochengxuc",
      wechat: "iconweixingongzhonghao"
    }, te = (s) => ke[s] || "", ye = (s) => s == 1 ? "is-normal" : s == 2 ? "is-expired" : "is-closed", be = (s) => {
      if (!s || s === "0")
        return "--";
      if (typeof s == "number") {
        const e = new Date(s * 1e3), _ = String(e.getMonth() + 1).padStart(2, "0"), S = String(e.getDate()).padStart(2, "0");
        return `${e.getFullYear()}-${_}-${S}`;
      }
      return String(s).split(" ")[0];
    }, O = p(!0), R = p([]);
    Ye().then(({ data: s }) => {
      !qe.empty(s) && (R.value = s), O.value = !1;
    }).catch(() => {
      O.value = !1;
    });
    const B = p(!1), we = () => {
      if (!R.value.length) {
        et("暂无店铺套餐");
        return;
      }
      B.value = !0;
    };
    return (s, e) => {
      const _ = g("el-image"), S = g("el-icon"), Se = g("el-input"), oe = g("el-option"), se = g("el-select"), Ce = g("el-radio"), xe = g("el-radio-group"), G = g("el-button"), Ie = g("el-pagination"), Ve = g("el-dialog"), $e = Fe("loading");
      return l(), a(f, null, [
        o("div", ot, [
          o("header", st, [
            n(N) ? (l(), a("div", lt, [
              o("div", at, [
                r(_, {
                  class: "w-full h-full",
                  src: n(re)(n(N).icon),
                  fit: "contain"
                }, {
                  error: m(() => [
                    nt
                  ]),
                  _: 1
                }, 8, ["src"])
              ]),
              o("span", it, c(n(N).site_name), 1)
            ])) : h("", !0),
            o("div", rt, [
              n(L).userInfo.is_super_admin ? (l(), a("button", {
                key: 0,
                class: "home-console-btn",
                onClick: ge
              }, "控制台")) : h("", !0),
              o("div", ct, [
                o("div", ut, c(n(ee)), 1),
                o("div", dt, [
                  o("div", pt, [
                    o("div", mt, c(n(ee)), 1),
                    o("div", _t, [
                      o("span", vt, c(n(L).userInfo.username), 1),
                      o("span", ht, c(n(L).userInfo.is_super_admin ? "超级管理员" : "站点管理员"), 1)
                    ])
                  ]),
                  gt,
                  o("div", {
                    class: "home-user-menu-item is-danger",
                    onClick: e[0] || (e[0] = (t) => fe())
                  }, "退出登录")
                ])
              ])
            ])
          ]),
          o("main", ft, [
            o("div", kt, [
              o("div", yt, [
                o("div", bt, [
                  T(o("button", {
                    type: "button",
                    class: "home-scroll-arrow is-left",
                    onClick: e[1] || (e[1] = (t) => Z(-1))
                  }, [
                    r(S, null, {
                      default: m(() => [
                        r(n(Re))
                      ]),
                      _: 1
                    })
                  ], 512), [
                    [P, Q.value]
                  ]),
                  o("div", {
                    class: "home-scroll-menu",
                    ref_key: "scrollMenuRef",
                    ref: H,
                    onScroll: z
                  }, [
                    o("div", {
                      class: k(["home-menu-tab", { "is-active": n($).app === "" }]),
                      onClick: e[2] || (e[2] = (t) => A(""))
                    }, "所有应用", 2),
                    (l(!0), a(f, null, C(U.value, (t, D) => (l(), a("div", {
                      key: D,
                      class: k(["home-menu-tab", { "is-active": n($).app === t.key }]),
                      onClick: (u) => A(t.key)
                    }, c(t.title), 11, wt))), 128))
                  ], 544),
                  T(o("button", {
                    type: "button",
                    class: "home-scroll-arrow is-right",
                    onClick: e[3] || (e[3] = (t) => Z(1))
                  }, [
                    r(S, null, {
                      default: m(() => [
                        r(n(Be))
                      ]),
                      _: 1
                    })
                  ], 512), [
                    [P, X.value]
                  ])
                ]),
                U.value.length ? (l(), a("div", St, [
                  o("button", {
                    class: k(["home-more-btn", { "is-open": I.value }]),
                    onClick: V(me, ["stop"])
                  }, "全部应用", 10, Ct),
                  T(o("div", {
                    class: "home-popover home-apps-popover",
                    onClick: e[5] || (e[5] = V(() => {
                    }, ["stop"]))
                  }, [
                    o("div", {
                      class: k(["home-app-tag", { "is-active": n($).app === "" }]),
                      onClick: e[4] || (e[4] = (t) => A(""))
                    }, "所有应用", 2),
                    (l(!0), a(f, null, C(U.value, (t, D) => (l(), a("div", {
                      key: D,
                      class: k(["home-app-tag", { "is-active": n($).app === t.key }]),
                      onClick: (u) => A(t.key)
                    }, c(t.title), 11, xt))), 128))
                  ], 512), [
                    [P, I.value]
                  ])
                ])) : h("", !0)
              ]),
              o("div", It, [
                r(Se, {
                  modelValue: n($).keywords,
                  "onUpdate:modelValue": e[7] || (e[7] = (t) => n($).keywords = t),
                  modelModifiers: { trim: !0 },
                  class: "home-search",
                  placeholder: "站点名称/编号",
                  onKeyup: e[8] || (e[8] = Ae((t) => b(1), ["enter"]))
                }, {
                  suffix: m(() => [
                    r(S, {
                      class: "cursor-pointer",
                      onClick: e[6] || (e[6] = V((t) => b(1), ["stop"]))
                    }, {
                      default: m(() => [
                        r(n(Ge))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                o("div", Vt, [
                  o("button", {
                    class: k(["home-filter-btn", { "is-open": w.value || !!F.value || !!i.params.status }]),
                    onClick: V(_e, ["stop"])
                  }, "筛选", 10, $t),
                  T(o("div", {
                    class: "home-popover home-filter-popover",
                    onClick: e[12] || (e[12] = V(() => {
                    }, ["stop"]))
                  }, [
                    o("div", Lt, [
                      zt,
                      r(se, {
                        modelValue: d.value.appType,
                        "onUpdate:modelValue": e[9] || (e[9] = (t) => d.value.appType = t),
                        class: "w-full",
                        placeholder: "全部平台"
                      }, {
                        default: m(() => [
                          (l(), a(f, null, C(pe, (t) => r(oe, {
                            key: t.value,
                            label: t.label,
                            value: t.value
                          }, null, 8, ["label", "value"])), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    o("div", Ut, [
                      Dt,
                      r(se, {
                        modelValue: d.value.status,
                        "onUpdate:modelValue": e[10] || (e[10] = (t) => d.value.status = t),
                        class: "w-full",
                        placeholder: "全部状态"
                      }, {
                        default: m(() => [
                          (l(!0), a(f, null, C(K.value, (t) => (l(), ne(oe, {
                            key: t.value,
                            label: t.label,
                            value: t.value
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    o("div", Tt, [
                      Mt,
                      r(xe, {
                        modelValue: d.value.sort,
                        "onUpdate:modelValue": e[11] || (e[11] = (t) => d.value.sort = t)
                      }, {
                        default: m(() => [
                          (l(!0), a(f, null, C(de.value, (t) => (l(), ne(Ce, {
                            key: t.value,
                            value: t.value
                          }, {
                            default: m(() => [
                              x(c(t.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    o("div", Et, [
                      o("button", {
                        class: "home-btn-ghost",
                        onClick: he
                      }, "重置"),
                      r(G, {
                        type: "primary",
                        class: "home-btn-apply",
                        onClick: ve
                      }, {
                        default: m(() => [
                          x("确定")
                        ]),
                        _: 1
                      })
                    ])
                  ], 512), [
                    [P, w.value]
                  ])
                ]),
                r(G, {
                  type: "primary",
                  class: "home-create-btn",
                  disabled: O.value,
                  onClick: we
                }, {
                  default: m(() => [
                    x("+ 创建站点")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            T((l(), a("div", Ft, [
              n(Y).length ? (l(), a("div", At, [
                (l(!0), a(f, null, C(n(Y), (t, D) => (l(), a("div", {
                  key: D,
                  class: "home-card",
                  onClick: (u) => j(t)
                }, [
                  o("div", Ht, [
                    o("div", Nt, [
                      t.icon ? (l(), a("img", {
                        key: 0,
                        src: n(re)(t.icon),
                        alt: ""
                      }, null, 8, jt)) : (l(), a("img", Ot))
                    ]),
                    o("div", Rt, [
                      o("div", Bt, c(t.site_name), 1),
                      o("div", Gt, "ID: " + c(t.site_id), 1)
                    ]),
                    t.status_name ? (l(), a("div", {
                      key: 0,
                      class: k(["home-status-badge", ye(t.status)])
                    }, c(t.status_name), 3)) : h("", !0)
                  ]),
                  t.app_name && t.app_name.length ? (l(), a("div", Wt, [
                    (l(!0), a(f, null, C(t.app_name, (u, W) => (l(), a("span", {
                      class: "home-tag",
                      key: W
                    }, c(u), 1))), 128))
                  ])) : h("", !0),
                  o("div", Kt, [
                    o("div", Jt, [
                      Yt,
                      o("span", {
                        class: k(["home-expire-value", { "is-expired": t.status == 2 }])
                      }, c(be(t.expire_time)), 3)
                    ]),
                    t.channels && t.channels.length ? (l(), a("div", qt, [
                      (l(!0), a(f, null, C(t.channels, (u, W) => (l(), a(f, { key: W }, [
                        te(u.key) ? (l(), a("span", {
                          key: 0,
                          class: k(["iconfont home-channel-icon", [te(u.key), { "is-link": u.url }]]),
                          title: u.name,
                          onClick: V((Le) => u.url && j(t, u), ["stop"])
                        }, null, 10, Qt)) : (l(), a("span", {
                          key: 1,
                          class: k(["home-channel-icon is-text", { "is-link": u.url }]),
                          title: u.name,
                          onClick: V((Le) => u.url && j(t, u), ["stop"])
                        }, c(String(u.name || "").slice(0, 1)), 11, Xt))
                      ], 64))), 128))
                    ])) : h("", !0)
                  ])
                ], 8, Pt))), 128))
              ])) : n(J) ? h("", !0) : (l(), a("div", Zt, oo))
            ])), [
              [$e, n(J)]
            ]),
            i.total ? (l(), a("div", so, [
              r(Ie, {
                "current-page": i.params.page,
                "onUpdate:current-page": e[13] || (e[13] = (t) => i.params.page = t),
                "page-size": i.params.limit,
                "onUpdate:page-size": e[14] || (e[14] = (t) => i.params.limit = t),
                layout: "total, sizes, prev, pager, next, jumper",
                total: i.total,
                onSizeChange: e[15] || (e[15] = (t) => b()),
                onCurrentChange: b,
                "hide-on-single-page": !0
              }, null, 8, ["current-page", "page-size", "total"])
            ])) : h("", !0),
            y.value ? (l(), a("div", lo, [
              o("div", null, [
                o("a", {
                  href: y.value.copyright_link,
                  target: "_blank"
                }, [
                  y.value.company_name ? (l(), a("span", no, c(y.value.company_name), 1)) : h("", !0)
                ], 8, ao),
                y.value.icp ? (l(), a("a", io, [
                  o("span", ro, c(y.value.icp), 1)
                ])) : h("", !0)
              ]),
              o("div", { class: "home-copyright-links" }, [
                o("span", {
                  class: "mx-1",
                  onClick: ue
                }, "版权信息"),
                x(" | "),
                co,
                x(" | "),
                uo,
                x(" | "),
                po,
                x(" | "),
                mo
              ])
            ])) : h("", !0)
          ])
        ]),
        r(Ve, {
          modelValue: E.value,
          "onUpdate:modelValue": e[17] || (e[17] = (t) => E.value = t),
          title: "版权信息",
          width: "500"
        }, {
          footer: m(() => [
            o("div", _o, [
              r(G, {
                type: "primary",
                onClick: e[16] || (e[16] = (t) => E.value = !1)
              }, {
                default: m(() => [
                  x("确定")
                ]),
                _: 1
              })
            ])
          ]),
          default: m(() => [
            o("span", null, c(y.value.copyright_desc), 1)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        r(tt, {
          modelValue: B.value,
          "onUpdate:modelValue": e[18] || (e[18] = (t) => B.value = t),
          "site-group": R.value,
          onSuccess: b
        }, null, 8, ["modelValue", "site-group"])
      ], 64);
    };
  }
});
const Lo = /* @__PURE__ */ Xe(vo, [["__scopeId", "data-v-419d1a31"]]);
export {
  Lo as default
};
