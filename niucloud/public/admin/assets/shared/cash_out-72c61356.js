import { defineComponent as z, ref as g, reactive as k, resolveComponent as s, resolveDirective as S, openBlock as m, createElementBlock as R, createVNode as r, withCtx as l, createElementVNode as d, toDisplayString as c, unref as a, withDirectives as W, createBlock as p, createCommentVNode as v, createTextVNode as b, Fragment as j, renderList as H } from "vue";
import { t as n, bB as C, c4 as K, dR as P, dS as L } from "./core-shared-ae4a556b.js";
import { useRoute as $ } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const q = { class: "main-container" }, G = { class: "flex justify-between items-center" }, I = { class: "text-page-title" }, J = { class: "text-[12px] text-[#999] leading-[24px]" }, Q = /* @__PURE__ */ d("span", { class: "ml-2" }, "%", -1), X = { class: "text-[12px] text-[#999] leading-[24px]" }, Y = { class: "fixed-footer-wrap" }, Z = { class: "fixed-footer" }, _e = /* @__PURE__ */ z({
  __name: "cash_out",
  setup(ee) {
    const N = $().meta.title, _ = g(!0), y = g(), t = k({
      is_auto_transfer: "0",
      is_auto_verify: "0",
      is_open: "0",
      min: "0",
      rate: "0",
      transfer_type: []
    }), h = g([]);
    (async () => {
      h.value = await (await K()).data;
    })(), (async () => {
      const u = await (await P()).data;
      Object.keys(t).forEach((e) => {
        u[e] != null && (t[e] = u[e]);
      }), _.value = !1;
    })();
    const D = k({
      min: [
        { validator: (u, e, i) => {
          Number(e) < 0.01 ? i(new Error(n("cashWithdrawalAmountHint"))) : i();
        }, trigger: "blur" }
      ],
      rate: [
        { validator: (u, e, i) => {
          Number(e) > 100 || Number(e) < 0 ? i(new Error(n("commissionRatioHint"))) : i();
        }, trigger: "blur" }
      ]
    }), F = async (u) => {
      _.value || !u || await u.validate((e) => {
        if (e) {
          const i = { ...t };
          L(i).then(() => {
            _.value = !1;
          }).catch(() => {
            _.value = !1;
          });
        }
      });
    };
    return (u, e) => {
      const i = s("el-switch"), f = s("el-form-item"), x = s("el-input"), w = s("el-radio"), T = s("el-radio-group"), A = s("el-checkbox"), U = s("el-checkbox-group"), V = s("el-card"), B = s("el-form"), E = s("el-button"), M = S("loading");
      return m(), R("div", q, [
        r(V, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            d("div", G, [
              d("span", I, c(a(N)), 1)
            ]),
            W((m(), p(B, {
              class: "page-form mt-[20px]",
              model: t,
              "label-width": "150px",
              ref_key: "ruleFormRef",
              ref: y,
              rules: D
            }, {
              default: l(() => [
                r(V, {
                  class: "box-card !border-none",
                  shadow: "never"
                }, {
                  default: l(() => [
                    r(f, {
                      label: a(n)("isOpen")
                    }, {
                      default: l(() => [
                        r(i, {
                          modelValue: t.is_open,
                          "onUpdate:modelValue": e[0] || (e[0] = (o) => t.is_open = o),
                          "active-value": "1",
                          "inactive-value": "0"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t.is_open ? (m(), p(f, {
                      key: 0,
                      label: a(n)("cashWithdrawalAmount"),
                      prop: "min"
                    }, {
                      default: l(() => [
                        d("div", null, [
                          r(x, {
                            modelValue: t.min,
                            "onUpdate:modelValue": e[1] || (e[1] = (o) => t.min = o),
                            modelModifiers: { trim: !0 },
                            onKeyup: e[2] || (e[2] = (o) => a(C)(o)),
                            class: "input-width",
                            placeholder: a(n)("cashWithdrawalAmountPlaceholder")
                          }, null, 8, ["modelValue", "placeholder"]),
                          d("div", J, c(a(n)("minTips")), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"])) : v("", !0),
                    t.is_open ? (m(), p(f, {
                      key: 1,
                      label: a(n)("commissionRatio"),
                      prop: "rate"
                    }, {
                      default: l(() => [
                        r(x, {
                          modelValue: t.rate,
                          "onUpdate:modelValue": e[3] || (e[3] = (o) => t.rate = o),
                          modelModifiers: { trim: !0 },
                          onKeyup: e[4] || (e[4] = (o) => a(C)(o)),
                          class: "input-width",
                          placeholder: a(n)("commissionRatioPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"]),
                        Q
                      ]),
                      _: 1
                    }, 8, ["label"])) : v("", !0),
                    t.is_open ? (m(), p(f, {
                      key: 2,
                      label: a(n)("audit"),
                      class: "items-center"
                    }, {
                      default: l(() => [
                        r(T, {
                          modelValue: t.is_auto_verify,
                          "onUpdate:modelValue": e[5] || (e[5] = (o) => t.is_auto_verify = o)
                        }, {
                          default: l(() => [
                            r(w, {
                              label: "0",
                              size: "large"
                            }, {
                              default: l(() => [
                                b(c(a(n)("manualAudit")), 1)
                              ]),
                              _: 1
                            }),
                            r(w, {
                              label: "1",
                              size: "large"
                            }, {
                              default: l(() => [
                                b(c(a(n)("automaticAudit")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : v("", !0),
                    t.is_open ? (m(), p(f, {
                      key: 3,
                      label: a(n)("transferMode"),
                      class: "items-baseline"
                    }, {
                      default: l(() => [
                        d("div", null, [
                          r(U, {
                            modelValue: t.transfer_type,
                            "onUpdate:modelValue": e[6] || (e[6] = (o) => t.transfer_type = o),
                            size: "large"
                          }, {
                            default: l(() => [
                              (m(!0), R(j, null, H(h.value, (o, O) => (m(), p(A, {
                                label: o.key,
                                key: "a" + O
                              }, {
                                default: l(() => [
                                  b(c(o.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["label"]))), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue"]),
                          d("div", X, c(a(n)("transferModeTips")), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"])) : v("", !0)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [M, _.value]
            ])
          ]),
          _: 1
        }),
        d("div", Y, [
          d("div", Z, [
            r(E, {
              type: "primary",
              onClick: e[7] || (e[7] = (o) => F(y.value))
            }, {
              default: l(() => [
                b(c(a(n)("save")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
export {
  _e as default
};
