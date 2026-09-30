import { defineComponent as q, ref as v, resolveComponent as d, resolveDirective as F, openBlock as r, createElementBlock as I, Fragment as L, createElementVNode as n, createVNode as s, withCtx as a, unref as l, withDirectives as M, createBlock as u, toDisplayString as i, createCommentVNode as c, createTextVNode as k } from "vue";
import { t, j as x, cr as j, cp as z, cq as G } from "./core-shared-c6ad4e77.js";
import { useRoute as H } from "vue-router";
import { ElMessageBox as T } from "element-plus";
import { ArrowLeft as J } from "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const K = { class: "main-container" }, O = { class: "input-width" }, Q = { class: "input-width" }, U = { class: "input-width" }, W = { class: "input-width" }, X = { class: "input-width" }, Y = { class: "input-width" }, Z = { class: "input-width" }, ee = { class: "input-width" }, te = { class: "input-width" }, ae = { class: "input-width" }, le = { class: "input-width cursor-pointer" }, me = /* @__PURE__ */ q({
  __name: "pay_detail",
  setup(oe) {
    const y = H(), B = y.meta.title, C = parseInt(y.query.id || 0), m = v(!0), e = v(null), f = async () => {
      m.value = !0, e.value = null, await j(C).then(({ data: _ }) => {
        e.value = _;
      }), m.value = !1;
    };
    f();
    const E = () => {
      T.confirm(
        t("passTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(({ value: _ }) => {
        z(e.value.out_trade_no).then(() => {
          f();
        });
      });
    }, D = () => {
      T.prompt(t("refuseReason"), t("warning"), {
        confirmButtonText: t("confirm"),
        cancelButtonText: t("cancel"),
        inputErrorMessage: t("refuseReason"),
        inputPattern: /\S/,
        inputType: "textarea"
      }).then(({ value: _ }) => {
        G({ out_trade_no: e.value.out_trade_no, reason: _ }).then(() => {
          f();
        });
      });
    }, b = v([]), h = v(!1), N = () => {
      b.value[0] = x(e.value.voucher), h.value = !0;
    };
    return (_, p) => {
      const R = d("el-page-header"), w = d("el-card"), o = d("el-form-item"), V = d("el-image"), g = d("el-button"), S = d("el-form"), A = d("el-image-viewer"), P = F("loading");
      return r(), I(L, null, [
        n("div", K, [
          s(w, {
            class: "card !border-none",
            shadow: "never"
          }, {
            default: a(() => [
              s(R, {
                content: l(B),
                icon: l(J),
                onBack: p[0] || (p[0] = ($) => _.$router.back())
              }, null, 8, ["content", "icon"])
            ]),
            _: 1
          }),
          M((r(), u(w, {
            class: "box-card mt-[15px] !border-none",
            shadow: "never"
          }, {
            default: a(() => [
              m.value ? c("", !0) : (r(), u(S, {
                key: 0,
                model: e.value,
                "label-width": "150px",
                ref: "formRef",
                class: "page-form mt-[10px]"
              }, {
                default: a(() => [
                  s(o, {
                    label: l(t)("outTradeNo")
                  }, {
                    default: a(() => [
                      n("div", O, i(e.value.out_trade_no), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(o, {
                    label: l(t)("createTime")
                  }, {
                    default: a(() => [
                      n("div", Q, i(e.value.create_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(o, {
                    label: l(t)("money")
                  }, {
                    default: a(() => [
                      n("div", U, i(e.value.money), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(o, {
                    label: l(t)("body")
                  }, {
                    default: a(() => [
                      n("div", W, i(e.value.body), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(o, {
                    label: l(t)("channel")
                  }, {
                    default: a(() => [
                      n("div", X, i(e.value.channel_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(o, {
                    label: l(t)("payStatus")
                  }, {
                    default: a(() => [
                      n("div", Y, i(e.value.status_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e.value.type_name ? (r(), u(o, {
                    key: 0,
                    label: l(t)("payType")
                  }, {
                    default: a(() => [
                      n("div", Z, i(e.value.type_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])) : c("", !0),
                  e.value.pay_time ? (r(), u(o, {
                    key: 1,
                    label: l(t)("payTime")
                  }, {
                    default: a(() => [
                      n("div", ee, i(e.value.pay_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])) : c("", !0),
                  e.value.close_time ? (r(), u(o, {
                    key: 2,
                    label: l(t)("failTime")
                  }, {
                    default: a(() => [
                      n("div", te, i(e.value.close_time), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])) : c("", !0),
                  e.value.fail_reason ? (r(), u(o, {
                    key: 3,
                    label: l(t)("failReason")
                  }, {
                    default: a(() => [
                      n("div", ae, i(e.value.fail_reason), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])) : c("", !0),
                  e.value.type == "offlinepay" && e.value.voucher ? (r(), u(o, {
                    key: 4,
                    label: l(t)("voucher")
                  }, {
                    default: a(() => [
                      n("div", le, [
                        s(V, {
                          style: { width: "100%" },
                          src: l(x)(e.value.voucher),
                          fit: "cover",
                          onClick: N
                        }, null, 8, ["src"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])) : c("", !0),
                  e.value.type == "offlinepay" && e.value.status == 3 ? (r(), u(o, {
                    key: 5,
                    label: l(t)("auditVoucher")
                  }, {
                    default: a(() => [
                      s(g, {
                        type: "primary",
                        onClick: E
                      }, {
                        default: a(() => [
                          k(i(l(t)("pass")), 1)
                        ]),
                        _: 1
                      }),
                      s(g, {
                        type: "primary",
                        onClick: D
                      }, {
                        default: a(() => [
                          k(i(l(t)("refuse")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["label"])) : c("", !0)
                ]),
                _: 1
              }, 8, ["model"]))
            ]),
            _: 1
          })), [
            [P, m.value]
          ])
        ]),
        h.value ? (r(), u(A, {
          key: 0,
          "url-list": b.value,
          onClose: p[1] || (p[1] = ($) => h.value = !1),
          "initial-index": 0,
          "zoom-rate": 1
        }, null, 8, ["url-list"])) : c("", !0)
      ], 64);
    };
  }
});
export {
  me as default
};
