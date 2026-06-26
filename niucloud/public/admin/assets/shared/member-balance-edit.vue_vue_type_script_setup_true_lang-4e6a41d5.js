import { defineComponent as N, ref as _, reactive as $, computed as k, resolveComponent as i, resolveDirective as A, openBlock as y, createBlock as B, unref as o, withCtx as l, createElementVNode as b, createVNode as n, createTextVNode as v, toDisplayString as p, withDirectives as O, withModifiers as S } from "vue";
import { t, cZ as T } from "./core-shared-ca1fcae5.js";
const q = { class: "input-width" }, Z = { class: "dialog-footer" }, J = /* @__PURE__ */ N({
  __name: "member-balance-edit",
  emits: ["complete"],
  setup(z, { expose: w, emit: x }) {
    const c = _(!1), r = _(!0), f = _(!1), j = {
      member_id: 0,
      balance: "",
      memo: "",
      adjust: "",
      account_data: "",
      adjust_type: 1
    }, a = $({ ...j }), g = _(), h = k(() => ({
      adjust: [
        { required: !0, message: t("adjustBalancePlaceholder"), trigger: "blur" },
        {
          validator: (d, e, s) => {
            const m = Math.abs(parseFloat(a.adjust));
            m || s(new Error(t("adjustBalancePlaceholder"))), a.adjust_type == -1 && parseFloat(a.balance) - m < 0 && s(new Error(t("adjustBalanceMaxAccountMessage"))), s();
          },
          trigger: "blur"
        }
      ]
    })), D = async (d) => {
      r.value || !d || await d.validate(async (e) => {
        if (e) {
          if (r.value = !0, f.value)
            return;
          f.value = !0, a.account_data = Math.abs(parseFloat(a.adjust)) * a.adjust_type, T(a).then((m) => {
            r.value = !1, f.value = !1, c.value = !1, F("complete");
          }).catch(() => {
            r.value = !1, f.value = !1;
          });
        }
      });
    }, F = x;
    return w({
      showDialog: c,
      setFormData: async (d = null) => {
        r.value = !0, Object.assign(a, j), d && Object.keys(a).forEach((e) => {
          d[e] != null && (a[e] = d[e]);
        }), r.value = !1;
      }
    }), (d, e) => {
      const s = i("el-form-item"), m = i("el-radio"), M = i("el-radio-group"), C = i("el-input-number"), P = i("el-input"), R = i("el-form"), V = i("el-button"), U = i("el-dialog"), E = A("loading");
      return y(), B(U, {
        modelValue: c.value,
        "onUpdate:modelValue": e[7] || (e[7] = (u) => c.value = u),
        title: o(t)("adjustBalance"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: l(() => [
          b("span", Z, [
            n(V, {
              onClick: e[5] || (e[5] = (u) => c.value = !1)
            }, {
              default: l(() => [
                v(p(o(t)("cancel")), 1)
              ]),
              _: 1
            }),
            n(V, {
              type: "primary",
              loading: r.value,
              onClick: e[6] || (e[6] = (u) => D(g.value))
            }, {
              default: l(() => [
                v(p(o(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: l(() => [
          O((y(), B(R, {
            model: a,
            "label-width": "110px",
            ref_key: "formRef",
            ref: g,
            rules: h.value,
            class: "page-form",
            onSubmit: e[4] || (e[4] = S(() => {
            }, ["prevent"]))
          }, {
            default: l(() => [
              n(s, {
                label: o(t)("currBalance")
              }, {
                default: l(() => [
                  b("div", q, p(a.balance), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(s, {
                label: o(t)("adjustType")
              }, {
                default: l(() => [
                  n(M, {
                    modelValue: a.adjust_type,
                    "onUpdate:modelValue": e[0] || (e[0] = (u) => a.adjust_type = u)
                  }, {
                    default: l(() => [
                      n(m, { label: 1 }, {
                        default: l(() => [
                          v(p(o(t)("adjustAddBalance")), 1)
                        ]),
                        _: 1
                      }),
                      n(m, { label: -1 }, {
                        default: l(() => [
                          v(p(o(t)("adjustReduceBalance")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(s, {
                label: o(t)("adjustBalance"),
                prop: "adjust"
              }, {
                default: l(() => [
                  b("div", null, [
                    n(C, {
                      modelValue: a.adjust,
                      "onUpdate:modelValue": e[1] || (e[1] = (u) => a.adjust = u),
                      clearable: "",
                      min: 0,
                      max: 999999,
                      placeholder: o(t)("adjustBalancePlaceholder"),
                      onFocus: e[2] || (e[2] = (u) => a.adjust = ""),
                      class: "!w-[200px]"
                    }, null, 8, ["modelValue", "placeholder"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              n(s, {
                label: o(t)("memo"),
                prop: "memo"
              }, {
                default: l(() => [
                  n(P, {
                    modelValue: a.memo,
                    "onUpdate:modelValue": e[3] || (e[3] = (u) => a.memo = u),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    rows: "4",
                    clearable: "",
                    placeholder: o(t)("memoPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [E, r.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  J as _
};
