import { defineComponent as $e, ref as u, reactive as Ue, watch as se, resolveComponent as m, resolveDirective as Le, openBlock as d, createElementBlock as x, createVNode as a, withCtx as l, createElementVNode as c, unref as n, createBlock as v, createCommentVNode as F, Fragment as H, renderList as G, createTextVNode as p, toDisplayString as r, normalizeClass as Ee, withDirectives as Ae, pushScopeId as Pt, popScopeId as Dt } from "vue";
import { _ as ze } from "./site_default-f84c6c4e.js";
import { fB as ne, t as o, i as Me, fp as Ye, fC as je, fD as Be, fE as Re, fF as Ne, aK as ie, u as re, fG as He, fH as Ge, fI as qe, fJ as Oe, _ as Je } from "./core-shared-c8d7774e.js";
import { ElMessage as Qe, ElMessageBox as Ke } from "element-plus";
import { useRouter as We } from "vue-router";
import Xe from "./edit-site-d707daaa.js";
import { g as Ze } from "./addon-db4625f4.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
const et = { class: "main-container" }, tt = { class: "flex justify-between items-start" }, at = { class: "flex justify-end items-center flex-1" }, lt = { class: "right-btn-group" }, ot = { class: "text-[14px] mr-[10px] flex items-center" }, st = { class: "mt-[20px]" }, nt = { class: "flex items-center" }, it = ["src"], rt = {
  key: 1,
  class: "w-[54px] h-[54px] mr-[10px] rounded-[4px]",
  src: ze,
  alt: ""
}, ct = { class: "flex flex-col" }, dt = { class: "flex items-center" }, ut = { class: "flex flex-col" }, pt = { key: 0 }, mt = { key: 1 }, _t = { class: "operation-buttons" }, ft = { class: "button-row" }, vt = { class: "button-row" }, ht = { class: "mt-[16px] flex justify-end" }, gt = { class: "flex items-center" }, yt = ["src"], wt = { class: "dialog-footer" }, kt = { class: "flex items-center" }, xt = ["src"], bt = { class: "dialog-footer" }, Ct = /* @__PURE__ */ $e({
  __name: "list",
  props: {
    status: {
      type: String,
      default: ""
    }
  },
  setup(ce) {
    const T = u(5), z = u(!1);
    let L = null;
    const $ = u(5), M = u(!1);
    let E = null;
    const S = u(!1), de = () => {
      T.value = 5, z.value = !1, L && clearInterval(L), L = setInterval(() => {
        T.value > 0 ? T.value-- : (z.value = !0, clearInterval(L));
      }, 1e3);
    }, ue = () => {
      $.value = 5, M.value = !1, E && clearInterval(E), E = setInterval(() => {
        $.value > 0 ? $.value-- : (M.value = !0, clearInterval(E));
      }, 1e3);
    }, pe = ce, V = u({
      all: []
    }), C = u(!1), q = u([]), i = Ue({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        keywords: "",
        group_id: "",
        app: "all",
        status: "",
        site_domain: "",
        create_time: [],
        expire_time: []
      }
    });
    i.searchParam.status = pe.status || "", (async () => {
      const s = await (await Ye({})).data;
      V.value.all = s, s.forEach((t, w) => {
        V.value[t.app] || (V.value[t.app] = []), V.value[t.app].push(t);
      });
    })();
    const A = u(0), O = () => {
      je().then(({ data: s }) => {
        A.value = s.is_allow;
        let t = !!A.value;
        localStorage.setItem("isAllowChange", t.toString());
      });
    };
    O();
    const me = (s) => {
      Be({ is_allow: s ? 1 : 0 }).then(() => {
        O();
      });
    };
    (async () => {
      q.value = await (await Re()).data;
    })();
    const J = u(), _e = (s) => {
      s && (s.resetFields(), h());
    }, fe = () => {
      i.searchParam.group_id = "";
    }, Q = u([]);
    Ze().then(({ data: s }) => {
      Q.value = s;
    }).catch();
    const h = (s = 1) => {
      i.loading = !0, i.page = s, i.searchParam.app = i.searchParam.app == "all" ? "" : i.searchParam.app, Ne({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((t) => {
        i.loading = !1, i.data = t.data.data, i.total = t.data.total;
      }).catch(() => {
        i.loading = !1;
      });
    };
    h();
    const K = We(), U = u(null), ve = (s) => {
      U.value.setFormData(), U.value.showDialog = !0;
    }, he = (s) => {
      K.push({ path: "/admin/site/info", query: { id: s.site_id } });
    }, ge = (s) => {
      U.value.setFormData(s), U.value.showDialog = !0;
    }, W = (s = 0) => {
      if (window.localStorage.setItem("site.token", ie()), window.localStorage.setItem("site.comparisonTokenStorage", ie()), window.localStorage.setItem("site.userinfo", JSON.stringify(re().userInfo)), s) {
        const t = re().userInfo;
        if (t.is_super_admin != null && !t.is_super_admin && (t.site_ids || []).indexOf(s) == -1) {
          Qe({
            message: o("noPermission"),
            type: "warning"
          });
          return;
        }
        window.localStorage.setItem("site.siteId", s), window.localStorage.setItem("site.comparisonSiteIdStorage", s), window.open(`${location.origin}/site/`);
      } else
        K.push({ path: "/home/index" });
    }, ye = (s, t) => {
      s == 1 && Ke.confirm(
        o("closeSiteTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning"
        }
      ).then(() => {
        He({ site_id: t }).then((w) => {
          h();
        });
      }), s == 3 && Ge({ site_id: t }).then((w) => {
        h();
      });
    }, I = u(!1), X = u({}), P = u(!1), Z = u({}), ee = u(), g = u({
      captcha_code: "",
      captcha_key: "",
      captcha_img: ""
    }), te = u(), y = u({
      captcha_code: "",
      captcha_key: "",
      captcha_img: ""
    });
    se(I, (s) => {
      s && (de(), Y());
    }), se(P, (s) => {
      s && (ue(), j());
    });
    const Y = () => {
      ne().then((s) => {
        g.value.captcha_key = s.data.captcha_key, g.value.captcha_img = s.data.img, g.value.captcha_code = "";
      }).catch(() => {
      });
    }, j = () => {
      ne().then((s) => {
        y.value.captcha_key = s.data.captcha_key, y.value.captcha_img = s.data.img, y.value.captcha_code = "";
      }).catch(() => {
      });
    }, we = (s) => {
      I.value = !0, X.value = s;
    }, ke = (s) => {
      P.value = !0, Z.value = s;
    }, xe = () => {
      ee.value.validate((s) => {
        if (!s)
          return;
        S.value = !0;
        const t = {
          site_id: X.value.site_id,
          captcha_code: g.value.captcha_code,
          captcha_key: g.value.captcha_key
        };
        qe(t).then((w) => {
          h(), I.value = !1;
        }).catch(() => {
          Y();
        }).finally(() => {
          S.value = !1;
        });
      });
    }, be = () => {
      te.value.validate((s) => {
        if (!s)
          return;
        S.value = !0;
        const t = {
          site_id: Z.value.site_id,
          captcha_code: y.value.captcha_code,
          captcha_key: y.value.captcha_key
        };
        Oe(t).then((w) => {
          h(), P.value = !1;
        }).catch(() => {
          j();
        }).finally(() => {
          S.value = !1;
        });
      });
    };
    return (s, t) => {
      const w = m("el-input"), k = m("el-form-item"), D = m("el-option"), B = m("el-select"), ae = m("el-date-picker"), _ = m("el-button"), R = m("el-form"), Ce = m("QuestionFilled"), Se = m("el-icon"), Ve = m("el-tooltip"), Ie = m("el-switch"), Pe = m("tempalte"), le = m("el-card"), b = m("el-table-column"), N = m("el-tag"), De = m("el-table"), Fe = m("el-pagination"), oe = m("el-dialog"), Te = Le("loading");
      return d(), x("div", et, [
        a(le, {
          class: "box-card !border-none setting-card",
          shadow: "never"
        }, {
          default: l(() => [
            a(le, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: l(() => [
                c("div", tt, [
                  a(R, {
                    inline: !0,
                    model: i.searchParam,
                    ref_key: "searchFormRef",
                    ref: J,
                    class: "search-form"
                  }, {
                    default: l(() => [
                      a(k, { prop: "keywords" }, {
                        default: l(() => [
                          a(w, {
                            modelValue: i.searchParam.keywords,
                            "onUpdate:modelValue": t[0] || (t[0] = (e) => i.searchParam.keywords = e),
                            modelModifiers: { trim: !0 },
                            placeholder: n(o)("siteNamePlaceholder")
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      C.value ? (d(), v(k, {
                        key: 0,
                        prop: "site_domain"
                      }, {
                        default: l(() => [
                          a(w, {
                            modelValue: i.searchParam.site_domain,
                            "onUpdate:modelValue": t[1] || (t[1] = (e) => i.searchParam.site_domain = e),
                            modelModifiers: { trim: !0 },
                            placeholder: n(o)("siteDomainPlaceholder")
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      })) : F("", !0),
                      a(k, { prop: "app" }, {
                        default: l(() => [
                          a(B, {
                            modelValue: i.searchParam.app,
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => i.searchParam.app = e),
                            clearable: "",
                            onChange: fe,
                            placeholder: n(o)("appIdPlaceholder"),
                            class: "input-width"
                          }, {
                            default: l(() => [
                              a(D, {
                                label: n(o)("selectPlaceholder"),
                                value: "all"
                              }, null, 8, ["label"]),
                              (d(!0), x(H, null, G(Object.values(Q.value), (e, f) => (d(), v(D, {
                                label: e.title,
                                value: e.key,
                                key: f
                              }, null, 8, ["label", "value"]))), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      a(k, { prop: "group_id" }, {
                        default: l(() => [
                          a(B, {
                            modelValue: i.searchParam.group_id,
                            "onUpdate:modelValue": t[3] || (t[3] = (e) => i.searchParam.group_id = e),
                            clearable: "",
                            placeholder: n(o)("groupIdPlaceholder"),
                            class: "input-width"
                          }, {
                            default: l(() => [
                              a(D, {
                                label: n(o)("selectPlaceholder"),
                                value: ""
                              }, null, 8, ["label"]),
                              (d(!0), x(H, null, G(V.value.all, (e, f) => (d(), v(D, {
                                label: e.group_name,
                                value: e.group_id,
                                key: f
                              }, null, 8, ["label", "value"]))), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      a(k, { prop: "status" }, {
                        default: l(() => [
                          a(B, {
                            modelValue: i.searchParam.status,
                            "onUpdate:modelValue": t[4] || (t[4] = (e) => i.searchParam.status = e),
                            clearable: "",
                            placeholder: n(o)("请选择状态"),
                            class: "input-width"
                          }, {
                            default: l(() => [
                              a(D, {
                                label: n(o)("selectPlaceholder"),
                                value: ""
                              }, null, 8, ["label"]),
                              (d(!0), x(H, null, G(q.value, (e, f) => (d(), v(D, {
                                label: e,
                                value: f,
                                key: f
                              }, null, 8, ["label", "value"]))), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      C.value ? (d(), v(k, {
                        key: 1,
                        prop: "create_time"
                      }, {
                        default: l(() => [
                          a(ae, {
                            modelValue: i.searchParam.create_time,
                            "onUpdate:modelValue": t[5] || (t[5] = (e) => i.searchParam.create_time = e),
                            type: "datetimerange",
                            "value-format": "YYYY-MM-DD HH:mm:ss",
                            "start-placeholder": n(o)("createTimeStartDate"),
                            "end-placeholder": n(o)("createTimeEndDate")
                          }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                        ]),
                        _: 1
                      })) : F("", !0),
                      C.value ? (d(), v(k, {
                        key: 2,
                        prop: "expire_time"
                      }, {
                        default: l(() => [
                          a(ae, {
                            modelValue: i.searchParam.expire_time,
                            "onUpdate:modelValue": t[6] || (t[6] = (e) => i.searchParam.expire_time = e),
                            type: "datetimerange",
                            "value-format": "YYYY-MM-DD HH:mm:ss",
                            "start-placeholder": n(o)("expireTimeStartDate"),
                            "end-placeholder": n(o)("expireTimeEndDate")
                          }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                        ]),
                        _: 1
                      })) : F("", !0),
                      a(k, null, {
                        default: l(() => [
                          a(_, {
                            type: "primary",
                            onClick: t[7] || (t[7] = (e) => h())
                          }, {
                            default: l(() => [
                              p(r(n(o)("search")), 1)
                            ]),
                            _: 1
                          }),
                          a(_, {
                            onClick: t[8] || (t[8] = (e) => _e(J.value))
                          }, {
                            default: l(() => [
                              p(r(n(o)("reset")), 1)
                            ]),
                            _: 1
                          }),
                          a(_, {
                            type: "primary",
                            link: "",
                            onClick: t[9] || (t[9] = (e) => C.value = !C.value)
                          }, {
                            default: l(() => [
                              p(r(C.value ? n(o)("收起") : n(o)("更多")) + " ", 1),
                              c("span", {
                                class: Ee(["iconfont iconjiantouxia ml-[4px] !text-[10px] mr-[10px] transition-transform duration-300", { "rotate-180": C.value }])
                              }, null, 2)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"]),
                  c("div", at, [
                    c("div", lt, [
                      a(Pe, { class: "flex items-center" }, {
                        default: l(() => [
                          a(Ve, {
                            class: "box-item",
                            effect: "dark",
                            content: "前台用户登录某站点后，是否允许切换至站点管理列表或进入其他站点",
                            placement: "top-start"
                          }, {
                            default: l(() => [
                              c("span", ot, [
                                p("允许切换站点 "),
                                a(Se, null, {
                                  default: l(() => [
                                    a(Ce)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          a(Ie, {
                            modelValue: A.value,
                            "onUpdate:modelValue": t[10] || (t[10] = (e) => A.value = e),
                            onChange: me,
                            lazy: "",
                            class: "mr-[25px]",
                            "active-value": 1,
                            "inactive-value": 0
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      a(_, {
                        type: "primary",
                        class: "w-[100px]",
                        onClick: ve
                      }, {
                        default: l(() => [
                          p(r(n(o)("addSite")), 1)
                        ]),
                        _: 1
                      }),
                      a(_, {
                        class: "w-[100px]",
                        onClick: t[11] || (t[11] = (e) => W())
                      }, {
                        default: l(() => [
                          p(r(n(o)("toSite")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              _: 1
            }),
            c("div", st, [
              Ae((d(), v(De, {
                data: i.data,
                size: "large"
              }, {
                empty: l(() => [
                  c("span", null, r(i.loading ? "" : n(o)("emptyData")), 1)
                ]),
                default: l(() => [
                  a(b, {
                    prop: "site_id",
                    label: n(o)("siteId"),
                    width: "100",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(b, {
                    label: n(o)("siteInfo"),
                    width: "300",
                    align: "left"
                  }, {
                    default: l(({ row: e }) => [
                      c("div", nt, [
                        e.icon ? (d(), x("img", {
                          key: 0,
                          class: "w-[54px] h-[54px] mr-[10px] rounded-[4px]",
                          src: n(Me)(e.icon),
                          alt: ""
                        }, null, 8, it)) : (d(), x("img", rt)),
                        c("div", ct, [
                          c("span", null, r(e.site_name || ""), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(b, {
                    label: n(o)("manager"),
                    width: "150",
                    align: "left"
                  }, {
                    default: l(({ row: e }) => [
                      c("div", dt, [
                        c("div", ut, [
                          c("span", null, r(e.admin.username || ""), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(b, {
                    prop: "group_name",
                    label: n(o)("groupId"),
                    width: "150",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(b, {
                    prop: "site_domain",
                    label: n(o)("siteDomain"),
                    width: "250",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(b, {
                    prop: "create_time",
                    label: n(o)("createTime"),
                    width: "200",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(b, {
                    prop: "expire_time",
                    label: n(o)("expireTime"),
                    width: "200",
                    "show-overflow-tooltip": !0
                  }, {
                    default: l(({ row: e }) => [
                      e.expire_time == 0 ? (d(), x("div", pt, "永久")) : (d(), x("div", mt, r(e.expire_time), 1))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(b, {
                    label: n(o)("status"),
                    width: "100",
                    align: "center"
                  }, {
                    default: l(({ row: e }) => [
                      e.status == 1 ? (d(), v(N, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: l(() => [
                          p(r(e.status_name), 1)
                        ]),
                        _: 2
                      }, 1024)) : e.status == 3 ? (d(), v(N, {
                        key: 1,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: l(() => [
                          p(r(e.status_name), 1)
                        ]),
                        _: 2
                      }, 1024)) : (d(), v(N, {
                        key: 2,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: l(() => [
                          p(r(e.status_name), 1)
                        ]),
                        _: 2
                      }, 1024))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(b, {
                    label: n(o)("operation"),
                    "min-width": "250",
                    align: "right",
                    fixed: "right"
                  }, {
                    default: l(({ row: e }) => [
                      c("div", _t, [
                        c("div", ft, [
                          a(_, {
                            type: "primary",
                            link: "",
                            onClick: (f) => W(e.site_id)
                          }, {
                            default: l(() => [
                              p(r(n(o)("toSite")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          e.status == 1 || e.status == 3 ? (d(), v(_, {
                            key: 0,
                            type: "primary",
                            link: "",
                            onClick: (f) => ye(e.status, e.site_id)
                          }, {
                            default: l(() => [
                              p(r(e.status == 1 ? n(o)("closeTxt") : n(o)("openTxt")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : F("", !0),
                          a(_, {
                            type: "primary",
                            link: "",
                            onClick: (f) => he(e)
                          }, {
                            default: l(() => [
                              p(r(n(o)("info")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        c("div", vt, [
                          a(_, {
                            type: "primary",
                            link: "",
                            onClick: (f) => ke(e)
                          }, {
                            default: l(() => [
                              p(r(n(o)("站点初始化")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          a(_, {
                            type: "primary",
                            link: "",
                            onClick: (f) => ge(e)
                          }, {
                            default: l(() => [
                              p(r(n(o)("edit")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          a(_, {
                            type: "primary",
                            link: "",
                            onClick: (f) => we(e)
                          }, {
                            default: l(() => [
                              p(r(n(o)("delete")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [Te, i.loading]
              ]),
              c("div", ht, [
                a(Fe, {
                  "current-page": i.page,
                  "onUpdate:currentPage": t[12] || (t[12] = (e) => i.page = e),
                  "page-size": i.limit,
                  "onUpdate:pageSize": t[13] || (t[13] = (e) => i.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: i.total,
                  onSizeChange: t[14] || (t[14] = (e) => h()),
                  onCurrentChange: h
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        a(Xe, {
          ref_key: "addSiteDialog",
          ref: U,
          onComplete: t[15] || (t[15] = (e) => h())
        }, null, 512),
        a(oe, {
          modelValue: I.value,
          "onUpdate:modelValue": t[18] || (t[18] = (e) => I.value = e),
          title: n(o)("warning"),
          width: "500px",
          "destroy-on-close": !0
        }, {
          footer: l(() => [
            c("span", wt, [
              a(_, {
                onClick: t[17] || (t[17] = (e) => I.value = !1)
              }, {
                default: l(() => [
                  p(r(n(o)("cancel")), 1)
                ]),
                _: 1
              }),
              a(_, {
                type: "primary",
                onClick: xe,
                disabled: !z.value,
                loading: S.value
              }, {
                default: l(() => [
                  p(r(n(o)("confirm") + (T.value > 0 ? ` (${T.value}s)` : "")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])
            ])
          ]),
          default: l(() => [
            c("div", null, r(n(o)("siteDeleteTips")), 1),
            a(R, {
              model: g.value,
              ref_key: "captchaFormRef",
              ref: ee,
              class: "mt-4"
            }, {
              default: l(() => [
                a(k, {
                  label: "验证码",
                  prop: "captcha_code",
                  rules: [{ required: !0, message: "请输入验证码", trigger: "blur" }]
                }, {
                  default: l(() => [
                    c("div", gt, [
                      a(w, {
                        placeholder: "请输入验证码",
                        class: "w-[200px]",
                        maxlength: "4",
                        "show-word-limit": "",
                        modelValue: g.value.captcha_code,
                        "onUpdate:modelValue": t[16] || (t[16] = (e) => g.value.captcha_code = e)
                      }, null, 8, ["modelValue"]),
                      g.value.captcha_img ? (d(), x("img", {
                        key: 0,
                        src: g.value.captcha_img,
                        alt: "验证码",
                        class: "w-[100px] h-[32px] cursor-pointer ml-[10px]",
                        onClick: Y
                      }, null, 8, yt)) : F("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(oe, {
          modelValue: P.value,
          "onUpdate:modelValue": t[21] || (t[21] = (e) => P.value = e),
          title: n(o)("warning"),
          width: "500px",
          "destroy-on-close": !0
        }, {
          footer: l(() => [
            c("span", bt, [
              a(_, {
                onClick: t[20] || (t[20] = (e) => P.value = !1)
              }, {
                default: l(() => [
                  p(r(n(o)("cancel")), 1)
                ]),
                _: 1
              }),
              a(_, {
                type: "primary",
                onClick: be,
                disabled: !M.value,
                loading: S.value
              }, {
                default: l(() => [
                  p(r(n(o)("confirm") + ($.value > 0 ? ` (${$.value}s)` : "")), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading"])
            ])
          ]),
          default: l(() => [
            c("div", null, r(n(o)("siteInitTips")), 1),
            a(R, {
              model: y.value,
              ref_key: "initCaptchaFormRef",
              ref: te,
              class: "mt-4"
            }, {
              default: l(() => [
                a(k, {
                  label: "验证码",
                  prop: "captcha_code",
                  rules: [{ required: !0, message: "请输入验证码", trigger: "blur" }]
                }, {
                  default: l(() => [
                    c("div", kt, [
                      a(w, {
                        placeholder: "请输入验证码",
                        class: "w-[200px]",
                        maxlength: "4",
                        "show-word-limit": "",
                        modelValue: y.value.captcha_code,
                        "onUpdate:modelValue": t[19] || (t[19] = (e) => y.value.captcha_code = e)
                      }, null, 8, ["modelValue"]),
                      y.value.captcha_img ? (d(), x("img", {
                        key: 0,
                        src: y.value.captcha_img,
                        alt: "验证码",
                        class: "w-[100px] h-[32px] cursor-pointer ml-[10px]",
                        onClick: j
                      }, null, 8, xt)) : F("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const Bt = /* @__PURE__ */ Je(Ct, [["__scopeId", "data-v-a08aa448"]]);
export {
  Bt as default
};
