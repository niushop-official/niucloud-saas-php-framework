import { defineComponent as G, reactive as I, ref as h, watch as J, resolveComponent as _, resolveDirective as K, openBlock as m, createElementBlock as y, normalizeStyle as O, unref as t, createVNode as e, withCtx as a, createElementVNode as o, toDisplayString as s, Fragment as Q, renderList as W, createBlock as R, createTextVNode as b, withDirectives as X, createCommentVNode as P } from "vue";
import { t as l, c8 as Z, c9 as ee, ca as te } from "./core-shared-c6ad4e77.js";
import { useRoute as ae } from "vue-router";
import { u as le } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const oe = { class: "flex justify-between items-center" }, ne = { class: "text-page-title" }, se = { class: "statistic-card" }, ie = { class: "statistic-footer" }, re = { class: "footer-item text-[14px] text-[#666]" }, de = { class: "statistic-card" }, ce = { class: "statistic-footer" }, _e = { class: "footer-item text-[14px] text-[#666]" }, ue = { class: "statistic-card" }, pe = { class: "statistic-footer" }, me = { class: "footer-item text-[14px] text-[#666]" }, fe = { class: "mt-[10px] table-fill-page__panel" }, ve = { class: "table-fill-page__table" }, he = { class: "mt-[16px] flex justify-end" }, ye = { class: "input-width" }, be = { class: "input-width" }, ge = { class: "input-width" }, we = { key: 0 }, xe = { class: "input-width" }, ke = { class: "input-width" }, Te = { class: "input-width" }, Ve = { class: "input-width" }, Pe = { class: "input-width" }, Ce = { key: 1 }, De = { class: "input-width" }, Ne = { class: "input-width" }, Ae = { class: "input-width" }, Re = { class: "input-width" }, Se = { key: 2 }, Fe = { class: "input-width" }, ze = { class: "input-width" }, Ue = { class: "input-width" }, Le = { class: "input-width" }, Me = { class: "dialog-footer" }, We = /* @__PURE__ */ G({
  __name: "account",
  setup($e) {
    const S = ae().meta.title, { pageRef: F, pageStyle: z } = le(), n = I({
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
    J(() => n.searchParam.trade_no, (u) => {
      n.searchParam.trade_no = u.trim();
    });
    const f = (u = 1) => {
      n.loading = !0, n.page = u, Z({
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
    const U = (u) => {
      u && (u.resetFields(), f());
    }, D = h([]);
    (() => {
      ee().then((u) => {
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
    }), L = (u) => {
      g.value = !0, r.value = u;
    }, p = h({
      pay: 0,
      refund: 0,
      transfer: 0
    });
    return (async () => {
      p.value = await (await te()).data;
    })(), (u, i) => {
      const x = _("el-statistic"), k = _("el-col"), M = _("el-row"), T = _("el-card"), N = _("el-option"), $ = _("el-select"), c = _("el-form-item"), Y = _("el-input"), j = _("el-date-picker"), w = _("el-button"), A = _("el-form"), v = _("el-table-column"), B = _("el-table"), H = _("el-pagination"), E = _("el-dialog"), q = K("loading");
      return m(), y("div", {
        ref_key: "pageRef",
        ref: F,
        class: "main-container table-fill-page",
        style: O(t(z))
      }, [
        e(T, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: a(() => [
            o("div", oe, [
              o("span", ne, s(t(S)), 1)
            ]),
            e(T, {
              class: "box-card !border-none !px-[35px]",
              shadow: "never"
            }, {
              default: a(() => [
                e(M, { class: "flex" }, {
                  default: a(() => [
                    e(k, {
                      span: 8,
                      class: "min-w-[100px]"
                    }, {
                      default: a(() => [
                        o("div", se, [
                          e(x, {
                            value: p.value.pay ? p.value.pay.toFixed(2) : "0.00"
                          }, null, 8, ["value"]),
                          o("div", ie, [
                            o("div", re, [
                              o("span", null, s(t(l)("totalPay")), 1)
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
                      default: a(() => [
                        o("div", de, [
                          e(x, {
                            value: p.value.refund ? p.value.refund.toFixed(2) : "0.00"
                          }, null, 8, ["value"]),
                          o("div", ce, [
                            o("div", _e, [
                              o("span", null, s(t(l)("totalRefund")), 1)
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
                      default: a(() => [
                        o("div", ue, [
                          e(x, {
                            value: p.value.transfer ? p.value.transfer.toFixed(2) : "0.00"
                          }, null, 8, ["value"]),
                          o("div", pe, [
                            o("div", me, [
                              o("span", null, s(t(l)("totalTransfer")), 1)
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
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: a(() => [
                e(A, {
                  inline: !0,
                  model: n.searchParam,
                  ref_key: "searchFormRef",
                  ref: C
                }, {
                  default: a(() => [
                    e(c, {
                      label: t(l)("type"),
                      class: "items-center",
                      prop: "type"
                    }, {
                      default: a(() => [
                        e($, {
                          modelValue: n.searchParam.type,
                          "onUpdate:modelValue": i[0] || (i[0] = (d) => n.searchParam.type = d),
                          class: "m-2",
                          placeholder: t(l)("accountType")
                        }, {
                          default: a(() => [
                            e(N, {
                              label: t(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (m(!0), y(Q, null, W(D.value, (d, V) => (m(), R(N, {
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
                      label: t(l)("tradeNo"),
                      prop: "trade_no"
                    }, {
                      default: a(() => [
                        e(Y, {
                          modelValue: n.searchParam.trade_no,
                          "onUpdate:modelValue": i[1] || (i[1] = (d) => n.searchParam.trade_no = d),
                          modelModifiers: { trim: !0 },
                          placeholder: t(l)("tradeNoPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(c, {
                      label: t(l)("createTime"),
                      prop: "create_time"
                    }, {
                      default: a(() => [
                        e(j, {
                          modelValue: n.searchParam.create_time,
                          "onUpdate:modelValue": i[2] || (i[2] = (d) => n.searchParam.create_time = d),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": t(l)("startDate"),
                          "end-placeholder": t(l)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(c, null, {
                      default: a(() => [
                        e(w, {
                          type: "primary",
                          onClick: i[3] || (i[3] = (d) => f())
                        }, {
                          default: a(() => [
                            b(s(t(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        e(w, {
                          onClick: i[4] || (i[4] = (d) => U(C.value))
                        }, {
                          default: a(() => [
                            b(s(t(l)("reset")), 1)
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
            o("div", fe, [
              o("div", ve, [
                X((m(), R(B, {
                  height: "100%",
                  data: n.data,
                  size: "large"
                }, {
                  empty: a(() => [
                    o("span", null, s(n.loading ? "" : t(l)("emptyData")), 1)
                  ]),
                  default: a(() => [
                    e(v, {
                      prop: "trade_no",
                      label: t(l)("tradeNo"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    e(v, {
                      prop: "type_name",
                      label: t(l)("type"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    e(v, {
                      prop: "money",
                      label: t(l)("money"),
                      "min-width": "120",
                      align: "right"
                    }, null, 8, ["label"]),
                    e(v, {
                      label: t(l)("createTime"),
                      "min-width": "150",
                      align: "center"
                    }, {
                      default: a(({ row: d }) => [
                        b(s(d.create_time || ""), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(v, {
                      label: t(l)("operation"),
                      align: "right",
                      fixed: "right",
                      "min-width": "120"
                    }, {
                      default: a(({ row: d }) => [
                        e(w, {
                          type: "primary",
                          link: "",
                          onClick: (V) => L(d)
                        }, {
                          default: a(() => [
                            b(s(t(l)("detail")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [q, n.loading]
                ])
              ]),
              o("div", he, [
                e(H, {
                  "current-page": n.page,
                  "onUpdate:current-page": i[5] || (i[5] = (d) => n.page = d),
                  "page-size": n.limit,
                  "onUpdate:page-size": i[6] || (i[6] = (d) => n.limit = d),
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
        e(E, {
          modelValue: g.value,
          "onUpdate:modelValue": i[9] || (i[9] = (d) => g.value = d),
          title: t(l)("accountDetail"),
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: a(() => [
            o("span", Me, [
              e(w, {
                type: "primary",
                onClick: i[8] || (i[8] = (d) => g.value = !1)
              }, {
                default: a(() => [
                  b(s(t(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            e(A, {
              model: r.value,
              "label-width": "110px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: a(() => [
                e(c, {
                  label: t(l)("type")
                }, {
                  default: a(() => [
                    o("div", ye, s(r.value.type_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(c, {
                  label: t(l)("money")
                }, {
                  default: a(() => [
                    o("div", be, s(r.value.money), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(c, {
                  label: t(l)("createTime")
                }, {
                  default: a(() => [
                    o("div", ge, s(r.value.create_time), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r.value.type == "transfer" ? (m(), y("div", we, [
                  e(c, {
                    label: t(l)("transferNo")
                  }, {
                    default: a(() => [
                      o("div", xe, s(r.value.pay_info.transfer_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("transferTime")
                  }, {
                    default: a(() => [
                      o("div", ke, s(r.value.pay_info.transfer_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("transferType")
                  }, {
                    default: a(() => [
                      o("div", Te, s(r.value.pay_info.transfer_type), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("transferMoney")
                  }, {
                    default: a(() => [
                      o("div", Ve, s(r.value.pay_info.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("transferRemark")
                  }, {
                    default: a(() => [
                      o("div", Pe, s(r.value.pay_info.remark), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])) : P("", !0),
                r.value.type == "refund" ? (m(), y("div", Ce, [
                  e(c, {
                    label: t(l)("outTradeNo")
                  }, {
                    default: a(() => [
                      o("div", De, s(r.value.pay_info.out_trade_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("createTime")
                  }, {
                    default: a(() => [
                      o("div", Ne, s(r.value.pay_info.create_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("refundMoney")
                  }, {
                    default: a(() => [
                      o("div", Ae, s(r.value.pay_info.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("failReason")
                  }, {
                    default: a(() => [
                      o("div", Re, s(r.value.pay_info.fail_reason), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])) : P("", !0),
                r.value.type == "pay" ? (m(), y("div", Se, [
                  e(c, {
                    label: t(l)("outTradeNo")
                  }, {
                    default: a(() => [
                      o("div", Fe, s(r.value.pay_info.out_trade_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("createTime")
                  }, {
                    default: a(() => [
                      o("div", ze, s(r.value.pay_info.create_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("money")
                  }, {
                    default: a(() => [
                      o("div", Ue, s(r.value.pay_info.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(c, {
                    label: t(l)("body")
                  }, {
                    default: a(() => [
                      o("div", Le, s(r.value.pay_info.body), 1)
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
      ], 4);
    };
  }
});
export {
  We as default
};
