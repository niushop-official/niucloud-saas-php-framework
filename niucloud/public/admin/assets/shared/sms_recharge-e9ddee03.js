import { defineComponent as M, ref as o, watch as O, resolveComponent as m, resolveDirective as T, withDirectives as A, openBlock as x, createBlock as F, withCtx as r, createElementVNode as a, createElementBlock as P, Fragment as j, renderList as z, normalizeClass as U, toDisplayString as i, createVNode as v, createTextVNode as d, pushScopeId as $, popScopeId as q } from "vue";
import { er as G, es as H, et as J, eu as K, a as Q } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const h = (l) => ($("data-v-5a8d6146"), l = l(), q(), l), W = /* @__PURE__ */ h(() => /* @__PURE__ */ a("div", { class: "panel-title" }, "选择套餐", -1)), X = { class: "flex flex-wrap mb-[30px]" }, Y = ["onClick"], Z = { class: "text-[14px] mb-1 using-hidden" }, ee = { class: "text-[24px] text-primary" }, ae = { class: "flex mt-2 text-[14px] justify-center items-center" }, te = { class: "line-through ml-2" }, se = /* @__PURE__ */ h(() => /* @__PURE__ */ a("div", { class: "panel-title" }, "选择支付方式", -1)), oe = { class: "mb-4 text-[14px] ml-[10px] mt-[10px]" }, le = { class: "text-[24px] font-semibold text-primary" }, ne = /* @__PURE__ */ h(() => /* @__PURE__ */ a("span", { class: "text-[14px] font-400" }, "￥", -1)), ce = { class: "ml-[50px]" }, re = /* @__PURE__ */ M({
  __name: "sms_recharge",
  props: {
    username: {
      type: String,
      default: ""
    },
    isRecharge: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["back", "complete"],
  setup(l, { emit: g }) {
    const n = l, p = o([]), s = o(null), y = o("alipay"), _ = o(!1), k = o(0), B = () => {
      _.value = !0, G().then((e) => {
        p.value = e.data.data, _.value = !1, p.value.length > 0 && n.username && b(p.value[0]);
      }).catch(() => {
        _.value = !1;
      });
    }, b = (e) => {
      s.value = e, S();
    }, S = () => {
      s.value && H(
        n.username,
        {
          package_id: s.value.id
        }
      ).then((e) => {
        k.value = e.data.pay_money;
      });
    }, c = o(!1), I = async () => {
      if (!(!s.value || c.value)) {
        c.value = !0;
        try {
          const e = await J(n.username, {
            package_id: s.value.id
          });
          if (e.data.order_status === "payment")
            g("complete");
          else {
            const u = e.data.out_trade_no, f = await K(n.username, { out_trade_no: u });
            window.open(f.data.pay_info.url, "_blank"), await ElMessageBox.confirm("请确认支付是否完成", "支付提示", {
              confirmButtonText: "已完成支付",
              cancelButtonText: "返回",
              type: "warning"
            }), g("complete");
          }
        } catch {
          ElMessage.error("支付失败，请重试");
        } finally {
          c.value = !1;
        }
      }
    }, V = () => {
      g("back");
    }, E = o(!1);
    return O(() => n.isRecharge, (e) => {
      E.value = e, e && B();
    }), (e, u) => {
      const f = m("el-radio"), N = m("el-radio-group"), w = m("el-button"), R = m("el-card"), D = T("loading");
      return A((x(), F(R, {
        class: "box-card !border-none p-[10px]",
        shadow: "never"
      }, {
        default: r(() => [
          W,
          a("div", X, [
            (x(!0), P(j, null, z(p.value, (t, L) => {
              var C;
              return x(), P("div", {
                key: L,
                span: 4
              }, [
                a("div", {
                  class: U(["package-card mr-[10px] mb-[10px]", { active: ((C = s.value) == null ? void 0 : C.id) === t.id }]),
                  onClick: (ie) => b(t)
                }, [
                  a("div", Z, i(t.package_name), 1),
                  a("div", ee, i(t.sms_num) + "条", 1),
                  a("div", ae, [
                    a("div", null, "￥" + i(t.price), 1),
                    a("div", te, "￥" + i(t.original_price), 1)
                  ])
                ], 10, Y)
              ]);
            }), 128))
          ]),
          se,
          v(N, {
            modelValue: y.value,
            "onUpdate:modelValue": u[0] || (u[0] = (t) => y.value = t),
            class: "mb-4"
          }, {
            default: r(() => [
              v(f, { label: "alipay" }, {
                default: r(() => [
                  d("支付宝")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          a("div", oe, [
            d(" 应付："),
            a("span", le, [
              ne,
              d(i(k.value), 1)
            ])
          ]),
          a("div", ce, [
            v(w, {
              type: "primary",
              disabled: !s.value || c.value,
              loading: c.value,
              onClick: I
            }, {
              default: r(() => [
                d("支付")
              ]),
              _: 1
            }, 8, ["disabled", "loading"]),
            v(w, { onClick: V }, {
              default: r(() => [
                d("返回")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      })), [
        [D, _.value]
      ]);
    };
  }
});
const xe = /* @__PURE__ */ Q(re, [["__scopeId", "data-v-5a8d6146"]]);
export {
  xe as default
};
