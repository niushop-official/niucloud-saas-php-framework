import { defineComponent as O, ref as o, watch as T, resolveComponent as m, resolveDirective as A, withDirectives as F, openBlock as x, createBlock as j, withCtx as r, createElementVNode as a, createElementBlock as P, Fragment as z, renderList as U, normalizeClass as $, toDisplayString as i, createVNode as v, createTextVNode as d, pushScopeId as q, popScopeId as G } from "vue";
import { e0 as H, e1 as J, e2 as K, e3 as Q, _ as W } from "./core-shared-c8d7774e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const h = (l) => (q("data-v-5a8d6146"), l = l(), G(), l), X = /* @__PURE__ */ h(() => /* @__PURE__ */ a("div", { class: "panel-title" }, "选择套餐", -1)), Y = { class: "flex flex-wrap mb-[30px]" }, Z = ["onClick"], ee = { class: "text-[14px] mb-1 using-hidden" }, ae = { class: "text-[24px] text-primary" }, te = { class: "flex mt-2 text-[14px] justify-center items-center" }, se = { class: "line-through ml-2" }, oe = /* @__PURE__ */ h(() => /* @__PURE__ */ a("div", { class: "panel-title" }, "选择支付方式", -1)), le = { class: "mb-4 text-[14px] ml-[10px] mt-[10px]" }, ne = { class: "text-[24px] font-semibold text-primary" }, ce = /* @__PURE__ */ h(() => /* @__PURE__ */ a("span", { class: "text-[14px] font-400" }, "￥", -1)), re = { class: "ml-[50px]" }, ie = /* @__PURE__ */ O({
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
  setup(l, { emit: B }) {
    const n = l, g = B, p = o([]), s = o(null), y = o("alipay"), _ = o(!1), k = o(0), S = () => {
      _.value = !0, H().then((e) => {
        p.value = e.data.data, _.value = !1, p.value.length > 0 && n.username && b(p.value[0]);
      }).catch(() => {
        _.value = !1;
      });
    }, b = (e) => {
      s.value = e, I();
    }, I = () => {
      s.value && J(
        n.username,
        {
          package_id: s.value.id
        }
      ).then((e) => {
        k.value = e.data.pay_money;
      });
    }, c = o(!1), V = async () => {
      if (!(!s.value || c.value)) {
        c.value = !0;
        try {
          const e = await K(n.username, {
            package_id: s.value.id
          });
          if (e.data.order_status === "payment")
            g("complete");
          else {
            const u = e.data.out_trade_no, f = await Q(n.username, { out_trade_no: u });
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
    }, E = () => {
      g("back");
    }, N = o(!1);
    return T(() => n.isRecharge, (e) => {
      N.value = e, e && S();
    }), (e, u) => {
      const f = m("el-radio"), R = m("el-radio-group"), w = m("el-button"), D = m("el-card"), L = A("loading");
      return F((x(), j(D, {
        class: "box-card !border-none p-[10px]",
        shadow: "never"
      }, {
        default: r(() => [
          X,
          a("div", Y, [
            (x(!0), P(z, null, U(p.value, (t, M) => {
              var C;
              return x(), P("div", {
                key: M,
                span: 4
              }, [
                a("div", {
                  class: $(["package-card mr-[10px] mb-[10px]", { active: ((C = s.value) == null ? void 0 : C.id) === t.id }]),
                  onClick: (de) => b(t)
                }, [
                  a("div", ee, i(t.package_name), 1),
                  a("div", ae, i(t.sms_num) + "条", 1),
                  a("div", te, [
                    a("div", null, "￥" + i(t.price), 1),
                    a("div", se, "￥" + i(t.original_price), 1)
                  ])
                ], 10, Z)
              ]);
            }), 128))
          ]),
          oe,
          v(R, {
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
          a("div", le, [
            d(" 应付："),
            a("span", ne, [
              ce,
              d(i(k.value), 1)
            ])
          ]),
          a("div", re, [
            v(w, {
              type: "primary",
              disabled: !s.value || c.value,
              loading: c.value,
              onClick: V
            }, {
              default: r(() => [
                d("支付")
              ]),
              _: 1
            }, 8, ["disabled", "loading"]),
            v(w, { onClick: E }, {
              default: r(() => [
                d("返回")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      })), [
        [L, _.value]
      ]);
    };
  }
});
const he = /* @__PURE__ */ W(ie, [["__scopeId", "data-v-5a8d6146"]]);
export {
  he as default
};
