import { defineComponent as E, reactive as L, ref as y, onMounted as N, resolveComponent as s, resolveDirective as P, openBlock as h, createElementBlock as R, withDirectives as x, createBlock as C, withCtx as a, createElementVNode as d, toDisplayString as i, unref as e, createVNode as l, createTextVNode as k } from "vue";
import { t, e4 as U, e5 as j } from "./core-shared-5b3bfa35.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const O = { class: "mt-[16px] flex justify-end" }, T = { class: "dialog-footer" }, Q = /* @__PURE__ */ E({
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
      const u = s("el-table-column"), g = s("el-button"), V = s("el-table"), S = s("el-pagination"), m = s("el-form-item"), B = s("el-form"), $ = s("el-dialog"), w = P("loading");
      return h(), R("div", null, [
        x((h(), C(V, {
          data: n.data,
          size: "large",
          ref: "goodBankListTableRef"
        }, {
          empty: a(() => [
            d("span", null, i(n.loading ? "" : e(t)("emptyData")), 1)
          ]),
          default: a(() => [
            l(u, {
              prop: "order_no",
              label: e(t)("订单编号"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "package_name",
              label: e(t)("短信套餐"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "sms_num",
              label: e(t)("短信条数"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "order_money",
              label: e(t)("订单总价"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "pay_money",
              label: e(t)("实付金额"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "order_status_name",
              label: e(t)("订单状态"),
              "min-width": "130"
            }, null, 8, ["label"]),
            l(u, {
              prop: "sms",
              label: e(t)("创建时间"),
              "min-width": "130"
            }, {
              default: a(({ row: r }) => [
                d("div", null, i(r.create_time), 1)
              ]),
              _: 1
            }, 8, ["label"]),
            l(u, {
              label: e(t)("operation"),
              fixed: "right",
              align: "right",
              "min-width": "120"
            }, {
              default: a(({ row: r }) => [
                l(g, {
                  type: "primary",
                  link: "",
                  onClick: (I) => D(r)
                }, {
                  default: a(() => [
                    k(i(e(t)("详情")), 1)
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
          title: e(t)("模版详情"),
          width: "600px",
          "destroy-on-close": ""
        }, {
          footer: a(() => [
            d("span", T, [
              l(g, {
                onClick: o[3] || (o[3] = (r) => _.value = !1)
              }, {
                default: a(() => [
                  k(i(e(t)("cancel")), 1)
                ]),
                _: 1
              }),
              l(g, {
                type: "primary",
                onClick: o[4] || (o[4] = (r) => _.value = !1)
              }, {
                default: a(() => [
                  k(i(e(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            x((h(), C(B, {
              "label-width": "100px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: a(() => [
                l(m, {
                  label: e(t)("订单编号"),
                  prop: "template_id"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.order_no), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("用户名称"),
                  prop: "template_id"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.username), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("套餐名称"),
                  prop: "template_id"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.package_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("订单状态"),
                  prop: "title"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.order_status_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("短信条数"),
                  prop: "title"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.sms_num), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("订单金额"),
                  prop: "title"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.order_money), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("付款金额"),
                  prop: "title"
                }, {
                  default: a(() => [
                    d("div", null, i(p.value.pay_money), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(t)("创建时间"),
                  prop: "title"
                }, {
                  default: a(() => [
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
  Q as default
};
