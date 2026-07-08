import { defineComponent as C, ref as h, onMounted as N, onBeforeUnmount as I, resolveComponent as a, openBlock as s, createElementBlock as S, createVNode as n, withCtx as o, unref as c, createBlock as p, createTextVNode as k, toDisplayString as v } from "vue";
import { useRouter as $, useRoute as q } from "vue-router";
import { f6 as R, t as b } from "./core-shared-9b1e55e9.js";
import { ArrowLeft as V } from "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const A = { class: "main-container" }, z = /* @__PURE__ */ C({
  __name: "sms_niu_pay_result",
  setup(D) {
    const x = $(), l = q(), g = l.meta.title, w = l.query.username || "", u = () => {
      x.push("/setting/niusms/setting");
    }, i = h("wait");
    let r = null;
    N(() => {
      const t = l.query.out_trade_no;
      t && (_(t), r = setInterval(() => {
        _(t);
      }, 2e3));
    }), I(() => {
      r && clearInterval(r);
    });
    const _ = async (t) => {
      try {
        const e = await R(w, {
          out_trade_no: t
        });
        i.value = e.data.order_status, (e.data.order_status === "payment" || e.data.order_status === "close") && r && clearInterval(r);
      } catch (e) {
        console.error("获取支付状态失败", e);
      }
    };
    return (t, e) => {
      const B = a("el-page-header"), d = a("el-card"), f = a("el-button"), m = a("el-result");
      return s(), S("div", A, [
        n(d, {
          class: "box-card !border-none mb-[15px]",
          shadow: "never"
        }, {
          default: o(() => [
            n(B, {
              content: c(g),
              icon: c(V),
              onBack: e[0] || (e[0] = (y) => u())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        n(d, {
          class: "box-card !border-none mb-[15px]",
          shadow: "never"
        }, {
          default: o(() => [
            i.value === "payment" ? (s(), p(m, {
              key: 0,
              icon: "success",
              title: "支付成功"
            }, {
              extra: o(() => [
                n(f, {
                  type: "primary",
                  onClick: e[1] || (e[1] = (y) => u())
                }, {
                  default: o(() => [
                    k(v(c(b)("back")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : i.value === "close" ? (s(), p(m, {
              key: 1,
              icon: "error",
              title: "订单已关闭"
            }, {
              extra: o(() => [
                n(f, {
                  type: "primary",
                  onClick: e[2] || (e[2] = (y) => u())
                }, {
                  default: o(() => [
                    k(v(c(b)("back")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : (s(), p(m, {
              key: 2,
              icon: "info",
              title: "支付状态查询中",
              "sub-title": "请稍候，正在确认支付状态..."
            }))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  z as default
};
