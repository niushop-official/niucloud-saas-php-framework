import { defineComponent as E, reactive as L, ref as y, onMounted as N, resolveComponent as m, resolveDirective as P, openBlock as h, createElementBlock as R, withDirectives as x, createBlock as C, withCtx as t, createElementVNode as d, toDisplayString as i, unref as e, createVNode as l, createTextVNode as k } from "vue";
import { t as a, e1 as U, e2 as j } from "./core-shared-ca1fcae5.js";
const O = { class: "mt-[16px] flex justify-end" }, T = { class: "dialog-footer" }, A = /* @__PURE__ */ E({
  __name: "sms_recharge_record",
  props: {
    username: {
      type: String,
      default: ""
    }
  },
  setup(z) {
    const c = z, n = L({
      page: 1,
      limit: 10,
      total: 0,
      loading: !1,
      data: [],
      searchParam: {
        name: "",
        order: "",
        sort: ""
      }
    }), b = () => {
      n.loading = !0;
      const f = {
        page: n.page,
        limit: n.limit,
        ...n.searchParam
      };
      U(c.username, f).then((o) => {
        n.loading = !1, n.data = o.data.data, n.total = o.data.total;
      }).catch(() => {
        n.loading = !1;
      });
    }, p = y({}), _ = y(!1), v = y(!1), D = (f) => {
      v.value = !0, _.value = !0, j(c.username, { out_trade_no: f.out_trade_no }).then((o) => {
        p.value = o.data, v.value = !1;
      }), _.value = !0;
    };
    return N(() => {
      c.username && b();
    }), (f, o) => {
      const u = m("el-table-column"), g = m("el-button"), V = m("el-table"), S = m("el-pagination"), s = m("el-form-item"), B = m("el-form"), $ = m("el-dialog"), w = P("loading");
      return h(), R("div", null, [
        x((h(), C(V, {
          data: n.data,
          size: "large",
          ref: "goodBankListTableRef"
        }, {
          empty: t(() => [
            d("span", null, i(n.loading ? "" : e(a)("emptyData")), 1)
          ]),
          default: t(() => [
            l(u, {
              prop: "order_no",
              label: e(a)("订单编号"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "package_name",
              label: e(a)("短信套餐"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "sms_num",
              label: e(a)("短信条数"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "order_money",
              label: e(a)("订单总价"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "pay_money",
              label: e(a)("实付金额"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "order_status_name",
              label: e(a)("订单状态"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "sms",
              label: e(a)("创建时间"),
              "min-width": "130"
            }, {
              default: t(({ row: r }) => [
                d("div", null, i(r.create_time), 1)
              ]),
              _: 1
            }, 8, ["label"]),
            l(u, {
              label: e(a)("operation"),
              fixed: "right",
              align: "right",
              "min-width": "120"
            }, {
              default: t(({ row: r }) => [
                l(g, {
                  type: "primary",
                  link: "",
                  onClick: (I) => D(r)
                }, {
                  default: t(() => [
                    k(i(e(a)("详情")), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        }, 8, ["data"])), [
          [w, n.loading]
        ]),
        d("div", O, [
          l(S, {
            "current-page": n.page,
            "onUpdate:currentPage": o[0] || (o[0] = (r) => n.page = r),
            "page-size": n.limit,
            "onUpdate:pageSize": o[1] || (o[1] = (r) => n.limit = r),
            layout: "total, sizes, prev, pager, next, jumper",
            total: n.total,
            onSizeChange: o[2] || (o[2] = (r) => b()),
            onCurrentChange: b
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l($, {
          modelValue: _.value,
          "onUpdate:modelValue": o[5] || (o[5] = (r) => _.value = r),
          title: e(a)("模版详情"),
          width: "600px",
          "destroy-on-close": ""
        }, {
          footer: t(() => [
            d("span", T, [
              l(g, {
                onClick: o[3] || (o[3] = (r) => _.value = !1)
              }, {
                default: t(() => [
                  k(i(e(a)("cancel")), 1)
                ]),
                _: 1
              }),
              l(g, {
                type: "primary",
                onClick: o[4] || (o[4] = (r) => _.value = !1)
              }, {
                default: t(() => [
                  k(i(e(a)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            x((h(), C(B, {
              "label-width": "100px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: t(() => [
                l(s, {
                  label: e(a)("订单编号"),
                  prop: "template_id"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.order_no), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("用户名称"),
                  prop: "template_id"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.username), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("套餐名称"),
                  prop: "template_id"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.package_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("订单状态"),
                  prop: "title"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.order_status_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("短信条数"),
                  prop: "title"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.sms_num), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("订单金额"),
                  prop: "title"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.order_money), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("付款金额"),
                  prop: "title"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.pay_money), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(s, {
                  label: e(a)("创建时间"),
                  prop: "title"
                }, {
                  default: t(() => [
                    d("div", null, i(p.value.create_time), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })), [
              [w, v.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  A as _
};
