import { defineComponent as de, ref as u, reactive as xe, toRefs as ue, computed as _e, watch as me, resolveComponent as _, resolveDirective as fe, openBlock as n, createElementBlock as l, Fragment as w, createElementVNode as e, createVNode as i, unref as c, withCtx as p, toDisplayString as x, createCommentVNode as g, normalizeStyle as ve, normalizeClass as m, renderList as F, withKeys as he, withModifiers as ge, createBlock as ye, createTextVNode as b, withDirectives as N, vShow as R, pushScopeId as we, popScopeId as be } from "vue";
import { _ as ke } from "./logo.default-aeaa7888.js";
import { _ as Ce } from "./site_default-f84c6c4e.js";
import { _ as Se } from "./site_empty-63fceac6.js";
import { Search as Ee } from "@element-plus/icons-vue";
import { u as J, cl as Fe, cm as Ve, cn as Ie, az as W, i as q, co as De, aK as Q, cp as $e, _ as Ae } from "./core-shared-5b3bfa35.js";
import { a as Be } from "./addon-a8fd87f6.js";
import { ElMessage as L } from "element-plus";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const s = (D) => (we("data-v-79cbf48c"), D = D(), be(), D), je = { class: "bg-[#F7F9FA] min-h-screen" }, ze = { class: "flex justify-between items-center py-[24px] pr-[64px] home-head" }, Pe = {
  key: 0,
  class: "flex items-center w-[219px] justify-center"
}, Ue = { class: "max-w-[82px] h-[40px] overflow-hidden" }, He = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "flex justify-center items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "max-w-[70px]",
    src: ke,
    alt: "",
    "object-fit": "contain"
  })
], -1)), Ne = { class: "ml-[10px] max-w-[120px] text-[16px] font-bold truncate" }, Le = { class: "flex items-center" }, Me = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconguanliduan !text-primary mr-1" }, null, -1)), Te = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "text-[14px] text-primary" }, "控制台", -1)), Ge = [
  Me,
  Te
], Ke = { class: "mr-[12px] text-[14px]" }, Oe = { class: "flex justify-between h-full" }, Re = { class: "text-[14px] whitespace-nowrap w-[220px] bg-white h-full border-r-[1px] border-[var(--el-border-color-light)]" }, Je = { class: "px-[20px] mt-[20px]" }, We = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "mt-3 text-[#9699B6] mb-1" }, "应用", -1)), qe = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconsuoyouyingyongc !text-[17px] mr-[10px]" }, null, -1)), Qe = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", null, "所有应用", -1)), Xe = [
  qe,
  Qe
], Ye = ["onClick"], Ze = ["src"], et = {
  key: 1,
  class: "iconfont iconsuoyouyingyongc !text-[17px] mr-[10px]"
}, tt = { class: "px-[20px] mt-[20px]" }, ot = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "text-[#9699B6] mb-1" }, "平台分类", -1)), st = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconH5c !text-[17px] mr-[10px]" }, null, -1)), nt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", null, "H5", -1)), lt = [
  st,
  nt
], at = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconxiaochengxutongbuc !text-[17px] mr-[10px]" }, null, -1)), it = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", null, "微信小程序", -1)), pt = [
  at,
  it
], rt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconPCc !text-[17px] mr-[10px]" }, null, -1)), ct = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", null, "PC", -1)), dt = [
  rt,
  ct
], xt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconAPPc !text-[17px] mr-[10px]" }, null, -1)), ut = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", null, "APP", -1)), _t = [
  xt,
  ut
], mt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont iconzhifubaoxiaochengxuc !text-[17px] mr-[10px]" }, null, -1)), ft = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", null, "支付宝小程序", -1)), vt = [
  mt,
  ft
], ht = { class: "flex-1 h-full p-[20px] flex flex-col" }, gt = { class: "flex-1 min-h-0" }, yt = { class: "flex justify-between items-center input-box" }, wt = { class: "flex items-center text-[14px] cursor-pointer pr-[10px] h-[40px]" }, bt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "text-[#9699B6]" }, "排序：", -1)), kt = { class: "ml-[-20px]" }, Ct = { class: "flex flex-wrap mt-[30px]" }, St = ["onClick"], Et = { class: "flex items-center px-[24px] pt-[22px] pb-[10px] home-item-head relative" }, Ft = ["src"], Vt = {
  key: 1,
  class: "w-[46px] h-[46px] mr-[15px] rounded-[6px] img-shadow overflow-hidden",
  src: Ce
}, It = { class: "flex flex-col flex-1 justify-center" }, Dt = { class: "flex items-center flex-wrap" }, $t = { class: "text-[16px] text-[#000] max-w-[160px] truncate mr-[10px]" }, At = {
  key: 0,
  class: "flex items-center justify-center min-w-[42px] h-[18px] bg-[#FF5500] rounded-tl-md rounded-br-md items-tab"
}, Bt = { class: "text-[12px] text-[#000]" }, jt = { class: "text-[12px] mt-[3px] text-[#666]" }, zt = { class: "px-[24px] py-[20px] text-[#666]" }, Pt = { class: "text-[14px] mt-[2px] text-[var(--el-color-primary)]" }, Ut = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "iconfont icona-Frame427322133 !text-[14px]" }, null, -1)), Ht = {
  key: 0,
  class: "m-auto mt-[100px]"
}, Nt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("img", {
  src: Se,
  class: "w-[220px] h-[165px]"
}, null, -1)), Lt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("p", { class: "text-center text-gray-400 text-[14px] mt-[20px]" }, "暂无站点", -1)), Mt = [
  Nt,
  Lt
], Tt = { class: "mt-[16px] flex justify-center pr-[10px]" }, Gt = {
  key: 0,
  class: "flex justify-between text-[12px] mt-[20px] text-[#666]"
}, Kt = ["href"], Ot = {
  key: 0,
  class: "mr-3"
}, Rt = {
  key: 0,
  href: "https://beian.miit.gov.cn/",
  target: "_blank"
}, Jt = { class: "mr-3" }, Wt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "mx-1" }, "开发者联盟与隐私的声明", -1)), qt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "mx-1" }, "隐私政策", -1)), Qt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "mx-1" }, "联系我们", -1)), Xt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("span", { class: "mx-1" }, "Cookies", -1)), Yt = { class: "dialog-footer" }, Zt = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "text-[#333333] text-[22px] ml-[15px] leading-[1] mt-[10px]" }, "创建站点", -1)), eo = { class: "flex flex-col mx-[25px] h-[430px] mt-[15px]" }, to = { class: "flex items-center" }, oo = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "text-[18px] text-[#333333]" }, "站点名称", -1)), so = { class: "w-[350px] h-[34px] ml-[10px]" }, no = { class: "flex-1 mt-[20px] h-[160px]" }, lo = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "text-[18px] text-[#333333]" }, "店铺套餐", -1)), ao = { class: "w-full whitespace-nowrap" }, io = ["onClick"], po = { class: "w-[140px] h-[40px] px-[15px] truncate text-white text-[16px] text-center leading-[40px] creatBg relative -left-[1px] -top-[2px]" }, ro = { class: "flex mx-[30px] mt-[14px] leading-[1] items-center" }, co = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "nc-iconfont nc-icon-duiV6mm text-[#466CEA]" }, null, -1)), xo = { class: "text-[14px] text-[#666666] ml-[3px] truncate" }, uo = { class: "flex mx-[30px] mt-[14px] leading-[1] text-center" }, _o = /* @__PURE__ */ s(() => /* @__PURE__ */ e("div", { class: "nc-iconfont nc-icon-duiV6mm text-[#466CEA]" }, null, -1)), mo = { class: "text-[14px] text-[#666666] ml-[3px] truncate" }, fo = { class: "dialog-footer" }, vo = /* @__PURE__ */ de({
  __name: "index",
  setup(D) {
    const j = J(), V = u(!1), f = u(null);
    Fe().then(({ data: a }) => {
      f.value = a;
    });
    const $ = u(!1), X = () => {
      f.value.copyright_desc && ($.value = !0);
    }, Y = u([
      // {
      //     label: '全部',
      //     value: 'all'
      // },
      {
        label: "创建时间",
        value: "create_time"
      },
      {
        label: "站点编号",
        value: "site_id"
      }
      // {
      //     label: '站点类型',
      //     value: 'app_name'
      // }
    ]), ho = u([
      {
        title: "H5",
        key: "H5"
      },
      {
        title: "微信小程序",
        key: "weapp"
      },
      {
        title: "PC",
        key: "pc"
      },
      {
        title: "APP",
        key: "app"
      },
      {
        title: "支付宝小程序",
        key: "aliapp"
      }
    ]), d = xe({
      params: {
        keywords: "",
        page: 1,
        limit: 20,
        app: "",
        sort: "create_time"
      },
      loading: !1,
      tableData: [],
      total: 0
    }), { params: k, loading: M, tableData: T } = ue(d), v = (a = 1) => {
      d.params.page = a, d.loading = !0, De(d.params).then((o) => {
        d.tableData = o.data.data, d.total = o.data.total, d.loading = !1;
      }).catch(() => {
        d.loading = !1;
      });
    };
    v();
    const G = (a) => {
      d.params.app = a, v();
    }, C = u(""), I = (a) => {
      C.value = a, v();
    }, z = _e(() => Ve().website), Z = (a) => {
      window.localStorage.setItem("site.siteId", a.site_id), window.localStorage.setItem("site.siteInfo", a), window.localStorage.setItem("site.comparisonSiteIdStorage", a.site_id), window.open(`${location.origin}/site/`);
    }, ee = () => {
      window.localStorage.setItem("admin.siteId", 0), window.localStorage.getItem("admin.token") || (window.localStorage.setItem("admin.token", Q()), window.localStorage.setItem("admin.comparisonTokenStorage", Q())), window.localStorage.getItem("admin.userinfo") || window.localStorage.setItem("admin.userinfo", JSON.stringify(J().userInfo)), location.replace(location.origin + "/admin");
    }, te = () => {
      j.logout();
    }, A = u([]);
    Be().then(({ data: a }) => {
      const o = [];
      Object.keys(a).forEach((U) => {
        const y = a[U];
        y.type == "app" && o.push(y);
      }), A.value = o;
    }).catch();
    const P = u(!0), B = u([]);
    Ie().then(({ data: a }) => {
      !W.empty(a) && (B.value = a), P.value = !1;
    }).catch(() => {
      P.value = !1;
    });
    const S = u(!1), oe = () => {
      if (!B.value.length) {
        L("暂无店铺套餐");
        return;
      }
      S.value = !0;
    }, r = u({
      step: 1,
      loading: !1,
      formData: {
        group_id: 0,
        site_name: ""
      }
    }), se = () => {
      if (!r.value.formData.group_id) {
        L({ message: "请先选择店铺套餐", type: "error" });
        return;
      }
      if (W.empty(r.value.formData.site_name)) {
        L({ message: "请输入站点名称", type: "error" });
        return;
      }
      r.value.loading || (r.value.loading = !0, $e(r.value.formData).then(() => {
        r.value.loading = !1, S.value = !1, v();
      }).catch(() => {
        r.value.loading = !1;
      }));
    };
    return me(() => S.value, () => {
      S.value || (r.value = {
        step: 1,
        loading: !1,
        formData: {
          group_id: 0,
          site_name: ""
        }
      });
    }), (a, o) => {
      const U = _("el-image"), y = _("el-scrollbar"), ne = _("el-icon"), K = _("el-input"), le = _("el-option"), ae = _("el-select"), H = _("el-button"), ie = _("el-pagination"), O = _("el-dialog"), pe = _("el-form-item"), re = _("el-form"), ce = fe("loading");
      return n(), l(w, null, [
        e("div", je, [
          e("div", ze, [
            z.value ? (n(), l("div", Pe, [
              e("div", Ue, [
                i(U, {
                  class: "h-[40px]",
                  src: c(q)(z.value.icon),
                  fit: "contain"
                }, {
                  error: p(() => [
                    He
                  ]),
                  _: 1
                }, 8, ["src"])
              ]),
              e("span", Ne, x(z.value.site_name), 1)
            ])) : g("", !0),
            e("div", Le, [
              c(j).userInfo.is_super_admin ? (n(), l("div", {
                key: 0,
                class: "border-primary border-[1px] h-[30px] px-[15px] flex items-center rounded-[6px] mr-[10px] cursor-pointer",
                onClick: ee
              }, Ge)) : g("", !0),
              e("span", Ke, x(c(j).userInfo.username), 1),
              e("span", {
                onClick: o[0] || (o[0] = (t) => te()),
                class: "text-[14px] cursor-pointer text-[var(--el-color-primary)]"
              }, "退出")
            ])
          ]),
          e("div", {
            class: "w-full m-auto",
            style: ve({ height: "calc(100vh - 80px)" })
          }, [
            e("div", Oe, [
              e("div", Re, [
                i(y, { always: !0 }, {
                  default: p(() => [
                    e("div", Je, [
                      We,
                      e("div", null, [
                        e("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px]", { "bg-[#EAEBF0] rounded-[4px]": c(k).app == "" }]),
                          onClick: o[1] || (o[1] = (t) => G(""))
                        }, Xe, 2),
                        (n(!0), l(w, null, F(V.value ? A.value : A.value.slice(0, 4), (t, h) => (n(), l("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center", { "bg-[#EAEBF0] rounded-[4px]": c(k).app == t.key }]),
                          onClick: (E) => G(t.key),
                          key: h
                        }, [
                          t.icon ? (n(), l("img", {
                            key: 0,
                            src: t.icon,
                            class: "w-[17px] h-[17px] mr-[10px] rounded-full"
                          }, null, 8, Ze)) : (n(), l("span", et)),
                          e("span", null, x(t.title), 1)
                        ], 10, Ye))), 128))
                      ]),
                      A.value.length > 4 ? (n(), l("div", {
                        key: 0,
                        class: "text-[#9699B6] text-[14px] cursor-pointer flex items-center mt-1",
                        onClick: o[2] || (o[2] = (t) => V.value = !V.value)
                      }, [
                        e("span", {
                          class: m(["iconfont iconjiantouxia ml-[4px] !text-[14px] mr-[10px] transition-transform duration-300", { "rotate-180": V.value }])
                        }, null, 2),
                        e("span", null, x(V.value ? "收起" : "更多"), 1)
                      ])) : g("", !0)
                    ]),
                    e("div", tt, [
                      ot,
                      e("div", null, [
                        e("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center", { "bg-[#EAEBF0] rounded-[4px]": C.value == "h5" }]),
                          onClick: o[3] || (o[3] = (t) => I("h5"))
                        }, lt, 2),
                        e("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center", { "bg-[#EAEBF0] rounded-[4px]": C.value == "wx" }]),
                          onClick: o[4] || (o[4] = (t) => I("wx"))
                        }, pt, 2),
                        e("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center", { "bg-[#EAEBF0] rounded-[4px]": C.value == "pc" }]),
                          onClick: o[5] || (o[5] = (t) => I("pc"))
                        }, dt, 2),
                        e("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center", { "bg-[#EAEBF0] rounded-[4px]": C.value == "app" }]),
                          onClick: o[6] || (o[6] = (t) => I("app"))
                        }, _t, 2),
                        e("div", {
                          class: m(["px-[25px] cursor-pointer h-[40px] leading-[40px] flex items-center", { "bg-[#EAEBF0] rounded-[4px]": C.value == "zfb" }]),
                          onClick: o[7] || (o[7] = (t) => I("zfb"))
                        }, vt, 2)
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", ht, [
                e("div", gt, [
                  i(y, null, {
                    default: p(() => [
                      e("div", yt, [
                        i(K, {
                          modelValue: c(k).keywords,
                          "onUpdate:modelValue": o[9] || (o[9] = (t) => c(k).keywords = t),
                          modelModifiers: { trim: !0 },
                          class: "!w-[350px] !h-[40px]",
                          placeholder: "请输入要搜索的站点名称/编号",
                          onKeyup: o[10] || (o[10] = he((t) => v(), ["enter", "native"]))
                        }, {
                          suffix: p(() => [
                            i(ne, {
                              onClick: o[8] || (o[8] = ge((t) => v(), ["stop"])),
                              class: "cursor-pointer"
                            }, {
                              default: p(() => [
                                i(c(Ee))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        e("div", wt, [
                          bt,
                          e("div", null, [
                            i(ae, {
                              modelValue: c(k).sort,
                              "onUpdate:modelValue": o[11] || (o[11] = (t) => c(k).sort = t),
                              placeholder: "请选择",
                              class: "!w-[200px] !h-[40px] !border-none",
                              onChange: o[12] || (o[12] = (t) => v())
                            }, {
                              default: p(() => [
                                (n(!0), l(w, null, F(Y.value, (t) => (n(), ye(le, {
                                  key: t.value,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          i(H, {
                            type: "primary",
                            class: "w-[90px] !h-[34px] ml-[20px]",
                            disabled: P.value,
                            onClick: oe
                          }, {
                            default: p(() => [
                              b("创建站点")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ]),
                      e("div", kt, [
                        N((n(), l("div", Ct, [
                          (n(!0), l(w, null, F(c(T), (t, h) => (n(), l("div", {
                            key: h,
                            onClick: (E) => Z(t),
                            class: m(["home-item w-[313px] ml-[20px] box-border mb-[20px] border-[1px] border-[#E8E9EB] rounded-[6px] cursor-pointer"])
                          }, [
                            e("div", Et, [
                              t.icon ? (n(), l("img", {
                                key: 0,
                                class: "w-[46px] h-[46px] mr-[15px] img-shadow rounded-[6px] overflow-hidden",
                                src: c(q)(t.icon)
                              }, null, 8, Ft)) : (n(), l("img", Vt)),
                              e("div", It, [
                                e("div", Dt, [
                                  e("span", $t, x(t.site_name), 1),
                                  t.app_name ? (n(), l("div", At, [
                                    e("span", Bt, x(t.app_name), 1)
                                  ])) : g("", !0)
                                ]),
                                e("span", jt, "NO：" + x(t.site_id), 1)
                              ])
                            ]),
                            e("div", zt, [
                              e("p", Pt, [
                                Ut,
                                e("span", null, x(t.group_name || "--"), 1)
                              ])
                            ])
                          ], 8, St))), 128)),
                          !c(T).length && !c(M) ? (n(), l("div", Ht, Mt)) : g("", !0)
                        ])), [
                          [ce, c(M)]
                        ])
                      ]),
                      e("div", Tt, [
                        i(ie, {
                          "current-page": d.params.page,
                          "onUpdate:currentPage": o[13] || (o[13] = (t) => d.params.page = t),
                          "page-size": d.params.limit,
                          "onUpdate:pageSize": o[14] || (o[14] = (t) => d.params.limit = t),
                          layout: "total, sizes, prev, pager, next, jumper",
                          total: d.total,
                          onSizeChange: o[15] || (o[15] = (t) => v()),
                          onCurrentChange: v,
                          "hide-on-single-page": !0
                        }, null, 8, ["current-page", "page-size", "total"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                f.value ? (n(), l("div", Gt, [
                  e("div", null, [
                    e("a", {
                      href: f.value.copyright_link,
                      target: "_blank"
                    }, [
                      f.value.company_name ? (n(), l("span", Ot, x(f.value.company_name), 1)) : g("", !0)
                    ], 8, Kt),
                    f.value.icp ? (n(), l("a", Rt, [
                      e("span", Jt, x(f.value.icp), 1)
                    ])) : g("", !0)
                  ]),
                  e("div", { class: "flex items-center cursor-pointer" }, [
                    e("span", {
                      class: "mx-1",
                      onClick: X
                    }, "版权信息"),
                    b(" | "),
                    Wt,
                    b(" | "),
                    qt,
                    b(" | "),
                    Qt,
                    b(" | "),
                    Xt
                  ])
                ])) : g("", !0)
              ])
            ])
          ], 4)
        ]),
        i(O, {
          modelValue: $.value,
          "onUpdate:modelValue": o[17] || (o[17] = (t) => $.value = t),
          title: "版权信息",
          width: "500"
        }, {
          footer: p(() => [
            e("div", Yt, [
              i(H, {
                type: "primary",
                onClick: o[16] || (o[16] = (t) => $.value = !1)
              }, {
                default: p(() => [
                  b("确定")
                ]),
                _: 1
              })
            ])
          ]),
          default: p(() => [
            e("span", null, x(f.value.copyright_desc), 1)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        i(O, {
          modelValue: S.value,
          "onUpdate:modelValue": o[19] || (o[19] = (t) => S.value = t),
          width: "54vw",
          "destroy-on-close": !0,
          style: { "border-radius": "25px" }
        }, {
          title: p(() => [
            Zt
          ]),
          footer: p(() => [
            e("span", fo, [
              i(H, {
                type: "primary",
                onClick: se,
                class: "w-[118px] h-[44px] mt-[10px] text-[16px]"
              }, {
                default: p(() => [
                  b("创建站点")
                ]),
                _: 1
              })
            ])
          ]),
          default: p(() => [
            e("div", eo, [
              e("div", to, [
                oo,
                e("div", so, [
                  i(re, {
                    model: r.value.formData,
                    ref: "formRef"
                  }, {
                    default: p(() => [
                      i(pe, { prop: "username" }, {
                        default: p(() => [
                          i(K, {
                            class: "create-site-name",
                            modelValue: r.value.formData.site_name,
                            "onUpdate:modelValue": o[18] || (o[18] = (t) => r.value.formData.site_name = t),
                            modelModifiers: { trim: !0 },
                            maxlength: "20",
                            placeholder: "请输入站点名称",
                            autocomplete: "off"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"])
                ])
              ]),
              N(e("div", no, [
                lo,
                i(y, {
                  class: "w-full mt-[10px] meal-site -ml-[10px]",
                  height: "350px"
                }, {
                  default: p(() => [
                    N(e("div", ao, [
                      (n(!0), l(w, null, F(B.value, (t, h) => (n(), l("div", {
                        key: h,
                        class: m(["inline-flex flex-col w-[300px] h-[330px] box-border rounded-[17px] border-transparent border-[2px] border-solid create-site-item my-[10px]", { "bg-[#F6F7FF] border-[#466CEA]": r.value.formData.group_id == t.group_id, "ml-[20px]": h > 0, " ml-[10px]": h == 0, "mr-[10px]": B.value.length - 1 == h }]),
                        onClick: (E) => r.value.formData.group_id = t.group_id
                      }, [
                        e("div", po, x(t.site_group.group_name), 1),
                        i(y, { class: "flex pb-[20px] pt-[4px] box-border !h-[260px] w-[100%] scrollbarBox" }, {
                          default: p(() => [
                            (n(!0), l(w, null, F(t.site_group.app_name, (E) => (n(), l("div", ro, [
                              co,
                              e("div", xo, x(E), 1)
                            ]))), 256)),
                            (n(!0), l(w, null, F(t.site_group.addon_name, (E) => (n(), l("div", uo, [
                              _o,
                              e("div", mo, x(E), 1)
                            ]))), 256))
                          ]),
                          _: 2
                        }, 1024)
                      ], 10, io))), 128))
                    ], 512), [
                      [R, r.value.step == 1]
                    ])
                  ]),
                  _: 1
                })
              ], 512), [
                [R, r.value.step == 1]
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const $o = /* @__PURE__ */ Ae(vo, [["__scopeId", "data-v-79cbf48c"]]);
export {
  $o as default
};
