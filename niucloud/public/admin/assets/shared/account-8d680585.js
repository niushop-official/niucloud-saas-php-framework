import { defineComponent as H, reactive as q, ref as h, watch as G, resolveComponent as _, resolveDirective as I, openBlock as m, createElementBlock as y, createVNode as e, withCtx as t, createElementVNode as o, toDisplayString as s, unref as a, Fragment as J, renderList as K, createBlock as F, createTextVNode as b, withDirectives as O, createCommentVNode as P } from "vue";
import { t as l, b$ as Q, c0 as W, c1 as X } from "./core-shared-11c0a673.js";
import { useRoute as Z } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ee = { class: "main-container" }, te = { class: "flex justify-between items-center" }, ae = { class: "text-page-title" }, le = { class: "statistic-card" }, oe = { class: "statistic-footer" }, ne = { class: "footer-item text-[14px] text-[#666]" }, se = { class: "statistic-card" }, ie = { class: "statistic-footer" }, re = { class: "footer-item text-[14px] text-[#666]" }, de = { class: "statistic-card" }, ce = { class: "statistic-footer" }, _e = { class: "footer-item text-[14px] text-[#666]" }, ue = { class: "mt-[10px]" }, pe = { class: "mt-[16px] flex justify-end" }, me = { class: "input-width" }, fe = { class: "input-width" }, ve = { class: "input-width" }, he = { key: 0 }, ye = { class: "input-width" }, be = { class: "input-width" }, ge = { class: "input-width" }, we = { class: "input-width" }, xe = { class: "input-width" }, ke = { key: 1 }, Te = { class: "input-width" }, Ve = { class: "input-width" }, Pe = { class: "input-width" }, Ce = { class: "input-width" }, De = { key: 2 }, Ne = { class: "input-width" }, Ae = { class: "input-width" }, Fe = { class: "input-width" }, Se = { class: "input-width" }, Re = { class: "dialog-footer" }, Ie = /* @__PURE__ */ H({
  __name: "account",
  setup(ze) {
    const S = Z().meta.title, n = q({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        site_id: "",
        type: "",
        money: "",
        trade_no: "",
        create_time: ""
      }
    }), C = h();
    G(() => n.searchParam.trade_no, (u) => {
      n.searchParam.trade_no = u.trim();
    });
    const f = (u = 1) => {
      n.loading = !0, n.page = u, Q({
        page: n.page,
        limit: n.limit,
        ...n.searchParam
      }).then((i) => {
        n.loading = !1, n.data = i.data.data, n.total = i.data.total;
      }).catch(() => {
        n.loading = !1;
      });
    };
    f();
    const R = (u) => {
      u && (u.resetFields(), f());
    }, D = h([]);
    (() => {
      W().then((u) => {
        D.value = u.data;
      });
    })();
    const g = h(!1), r = h({
      trade_no: "",
      type_name: "",
      money: 0,
      create_time: "",
      type: "",
      pay_info: {
        transfer_no: "",
        transfer_time: "",
        transfer_type: "",
        money: 0,
        remark: "",
        out_trade_no: "",
        create_time: "",
        fail_reason: "",
        body: ""
      }
    }), z = (u) => {
      g.value = !0, r.value = u;
    }, p = h({
      pay: 0,
      refund: 0,
      transfer: 0
    });
    return (async () => {
      p.value = await (await X()).data;
    })(), (u, i) => {
      const x = _("el-statistic"), k = _("el-col"), U = _("el-row"), T = _("el-card"), N = _("el-option"), $ = _("el-select"), c = _("el-form-item"), L = _("el-input"), M = _("el-date-picker"), w = _("el-button"), A = _("el-form"), v = _("el-table-column"), Y = _("el-table"), j = _("el-pagination"), B = _("el-dialog"), E = I("loading");
      return m(), y("div", ee, [
        e(T, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: t(() => [
            o("div", te, [
              o("span", ae, s(a(S)), 1)
            ]),
            e(T, {
              class: "box-card !border-none !px-[35px]",
              shadow: "never"
            }, {
              default: t(() => [
                e(U, { class: "flex" }, {
                  default: t(() => [
                    e(k, {
                      span: 8,
                      class: "min-w-[100px]"
                    }, {
                      default: t(() => [
                        o("div", le, [
                          e(x, {
                            value: p.value.pay ? p.value.pay.toFixed(2) : "0.00"
                          }, null, 8, ["value"]),
                          o("div", oe, [
                            o("div", ne, [
                              o("span", null, s(a(l)("totalPay")), 1)
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    e(k, {
                      span: 8,
                      class: "min-w-[100px]"
                    }, {
                      default: t(() => [
                        o("div", se, [
                          e(x, {
                            value: p.value.refund ? p.value.refund.toFixed(2) : "0.00"
                          }, null, 8, ["value"]),
                          o("div", ie, [
                            o("div", re, [
                              o("span", null, s(a(l)("totalRefund")), 1)
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    e(k, {
                      span: 8,
                      class: "min-w-[100px]"
                    }, {
                      default: t(() => [
                        o("div", de, [
                          e(x, {
                            value: p.value.transfer ? p.value.transfer.toFixed(2) : "0.00"
                          }, null, 8, ["value"]),
                          o("div", ce, [
                            o("div", _e, [
                              o("span", null, s(a(l)("totalTransfer")), 1)
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e(T, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: t(() => [
                e(A, {
                  inline: !0,
                  model: n.searchParam,
                  ref_key: "searchFormRef",
                  ref: C
                }, {
                  default: t(() => [
                    e(c, {
                      label: a(l)("type"),
                      class: "items-center",
                      prop: "type"
                    }, {
                      default: t(() => [
                        e($, {
                          modelValue: n.searchParam.type,
                          "onUpdate:modelValue": i[0] || (i[0] = (d) => n.searchParam.type = d),
                          class: "m-2",
                          placeholder: a(l)("accountType")
                        }, {
                          default: t(() => [
                            e(N, {
                              label: a(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (m(!0), y(J, null, K(D.value, (d, V) => (m(), F(N, {
                              key: V,
                              label: d,
                              value: V
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(c, {
                      label: a(l)("tradeNo"),
                      prop: "trade_no"
                    }, {
                      default: t(() => [
                        e(L, {
                          modelValue: n.searchParam.trade_no,
                          "onUpdate:modelValue": i[1] || (i[1] = (d) => n.searchParam.trade_no = d),
                          modelModifiers: { trim: !0 },
                          placeholder: a(l)("tradeNoPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(c, {
                      label: a(l)("createTime"),
                      prop: "create_time"
                    }, {
                      default: t(() => [
                        e(M, {
                          modelValue: n.searchParam.create_time,
                          "onUpdate:modelValue": i[2] || (i[2] = (d) => n.searchParam.create_time = d),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": a(l)("startDate"),
                          "end-placeholder": a(l)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(c, null, {
                      default: t(() => [
                        e(w, {
                          type: "primary",
                          onClick: i[3] || (i[3] = (d) => f())
                        }, {
                          default: t(() => [
                            b(s(a(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        e(w, {
                          onClick: i[4] || (i[4] = (d) => R(C.value))
                        }, {
                          default: t(() => [
                            b(s(a(l)("reset")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model"])
              ]),
              _: 1
            }),
            o("div", ue, [
              O((m(), F(Y, {
                data: n.data,
                size: "large"
              }, {
                empty: t(() => [
                  o("span", null, s(n.loading ? "" : a(l)("emptyData")), 1)
                ]),
                default: t(() => [
                  e(v, {
                    prop: "trade_no",
                    label: a(l)("tradeNo"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  e(v, {
                    prop: "type_name",
                    label: a(l)("type"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  e(v, {
                    prop: "money",
                    label: a(l)("money"),
                    "min-width": "120",
                    align: "right"
                  }, null, 8, ["label"]),
                  e(v, {
                    label: a(l)("createTime"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: t(({ row: d }) => [
                      b(s(d.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(v, {
                    label: a(l)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "120"
                  }, {
                    default: t(({ row: d }) => [
                      e(w, {
                        type: "primary",
                        link: "",
                        onClick: (V) => z(d)
                      }, {
                        default: t(() => [
                          b(s(a(l)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [E, n.loading]
              ]),
              o("div", pe, [
                e(j, {
                  "current-page": n.page,
                  "onUpdate:currentPage": i[5] || (i[5] = (d) => n.page = d),
                  "page-size": n.limit,
                  "onUpdate:pageSize": i[6] || (i[6] = (d) => n.limit = d),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: n.total,
                  onSizeChange: i[7] || (i[7] = (d) => f()),
                  onCurrentChange: f
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        e(B, {
          modelValue: g.value,
          "onUpdate:modelValue": i[9] || (i[9] = (d) => g.value = d),
          title: a(l)("accountDetail"),
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: t(() => [
            o("span", Re, [
              e(w, {
                type: "primary",
                onClick: i[8] || (i[8] = (d) => g.value = !1)
              }, {
                default: t(() => [
                  b(s(a(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            e(A, {
              model: r.value,
              "label-width": "110px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: t(() => [
                e(c, {
                  label: a(l)("type")
                }, {
                  default: t(() => [
                    o("div", me, s(r.value.type_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(c, {
                  label: a(l)("money")
                }, {
                  default: t(() => [
                    o("div", fe, s(r.value.money), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(c, {
                  label: a(l)("createTime")
                }, {
                  default: t(() => [
                    o("div", ve, s(r.value.create_time), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r.value.type == "transfer" ? (m(), y("div", he, [
                  e(c, {
                    label: a(l)("transferNo")
                  }, {
                    default: t(() => [
                      o("div", ye, s(r.value.pay_info.transfer_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("transferTime")
                  }, {
                    default: t(() => [
                      o("div", be, s(r.value.pay_info.transfer_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("transferType")
                  }, {
                    default: t(() => [
                      o("div", ge, s(r.value.pay_info.transfer_type), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("transferMoney")
                  }, {
                    default: t(() => [
                      o("div", we, s(r.value.pay_info.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("transferRemark")
                  }, {
                    default: t(() => [
                      o("div", xe, s(r.value.pay_info.remark), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])) : P("", !0),
                r.value.type == "refund" ? (m(), y("div", ke, [
                  e(c, {
                    label: a(l)("outTradeNo")
                  }, {
                    default: t(() => [
                      o("div", Te, s(r.value.pay_info.out_trade_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("createTime")
                  }, {
                    default: t(() => [
                      o("div", Ve, s(r.value.pay_info.create_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("refundMoney")
                  }, {
                    default: t(() => [
                      o("div", Pe, s(r.value.pay_info.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("failReason")
                  }, {
                    default: t(() => [
                      o("div", Ce, s(r.value.pay_info.fail_reason), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])) : P("", !0),
                r.value.type == "pay" ? (m(), y("div", De, [
                  e(c, {
                    label: a(l)("outTradeNo")
                  }, {
                    default: t(() => [
                      o("div", Ne, s(r.value.pay_info.out_trade_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("createTime")
                  }, {
                    default: t(() => [
                      o("div", Ae, s(r.value.pay_info.create_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("money")
                  }, {
                    default: t(() => [
                      o("div", Fe, s(r.value.pay_info.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: a(l)("body")
                  }, {
                    default: t(() => [
                      o("div", Se, s(r.value.pay_info.body), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])) : P("", !0)
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
export {
  Ie as default
};
