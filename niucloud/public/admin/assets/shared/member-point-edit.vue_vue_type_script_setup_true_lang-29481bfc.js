import { defineComponent as $, ref as _, reactive as k, computed as A, resolveComponent as i, resolveDirective as B, openBlock as y, createBlock as P, unref as a, withCtx as l, createElementVNode as j, createVNode as n, createTextVNode as v, toDisplayString as c, withDirectives as O, withModifiers as S } from "vue";
import { t as o, cY as T } from "./core-shared-ca1fcae5.js";
const q = { class: "input-width" }, Y = { class: "dialog-footer" }, J = /* @__PURE__ */ $({
  __name: "member-point-edit",
  emits: ["complete"],
  setup(z, { expose: w, emit: x }) {
    const p = _(!1), r = _(!0), f = _(!1), b = {
      member_id: 0,
      point: "",
      memo: "",
      adjust: "",
      account_data: "",
      adjust_type: 1
    }, t = k({ ...b }), g = _(), h = A(() => ({
      adjust: [
        { required: !0, message: o("adjustPointPlaceholder"), trigger: "blur" },
        {
          validator: (d, e, s) => {
            t.adjust = Math.floor(t.adjust);
            const m = Math.abs(parseFloat(t.adjust));
            m || s(new Error(o("adjustPointPlaceholder"))), t.adjust_type == -1 && parseFloat(t.point) - m < 0 && s(new Error(o("adjustPointMaxAccountMessage"))), s();
          },
          trigger: "blur"
        }
      ]
    })), D = async (d) => {
      r.value || !d || await d.validate(async (e) => {
        if (e) {
          if (r.value = !0, f.value)
            return;
          f.value = !0, t.account_data = Math.abs(parseFloat(t.adjust)) * t.adjust_type, T(t).then((m) => {
            r.value = !1, f.value = !1, p.value = !1, F("complete");
          }).catch(() => {
            r.value = !1, f.value = !1;
          });
        }
      });
    }, F = x;
    return w({
      showDialog: p,
      setFormData: async (d = null) => {
        r.value = !0, Object.assign(t, b), d && Object.keys(t).forEach((e) => {
          d[e] != null && (t[e] = d[e]);
        }), r.value = !1;
      }
    }), (d, e) => {
      const s = i("el-form-item"), m = i("el-radio"), M = i("el-radio-group"), C = i("el-input-number"), R = i("el-input"), U = i("el-form"), V = i("el-button"), E = i("el-dialog"), N = B("loading");
      return y(), P(E, {
        modelValue: p.value,
        "onUpdate:modelValue": e[7] || (e[7] = (u) => p.value = u),
        title: a(o)("adjustPoint"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: l(() => [
          j("span", Y, [
            n(V, {
              onClick: e[5] || (e[5] = (u) => p.value = !1)
            }, {
              default: l(() => [
                v(c(a(o)("cancel")), 1)
              ]),
              _: 1
            }),
            n(V, {
              type: "primary",
              loading: r.value,
              onClick: e[6] || (e[6] = (u) => D(g.value))
            }, {
              default: l(() => [
                v(c(a(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: l(() => [
          O((y(), P(U, {
            model: t,
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
                label: a(o)("currPoint")
              }, {
                default: l(() => [
                  j("div", q, c(t.point), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(s, {
                label: a(o)("adjustType")
              }, {
                default: l(() => [
                  n(M, {
                    modelValue: t.adjust_type,
                    "onUpdate:modelValue": e[0] || (e[0] = (u) => t.adjust_type = u)
                  }, {
                    default: l(() => [
                      n(m, { label: 1 }, {
                        default: l(() => [
                          v(c(a(o)("adjustAddPoint")), 1)
                        ]),
                        _: 1
                      }),
                      n(m, { label: -1 }, {
                        default: l(() => [
                          v(c(a(o)("adjustReducePoint")), 1)
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
                label: a(o)("adjustPoint"),
                prop: "adjust"
              }, {
                default: l(() => [
                  j("div", null, [
                    n(C, {
                      modelValue: t.adjust,
                      "onUpdate:modelValue": e[1] || (e[1] = (u) => t.adjust = u),
                      clearable: "",
                      min: 0,
                      max: 999999,
                      placeholder: a(o)("adjustPlaceholder"),
                      onFocus: e[2] || (e[2] = (u) => t.adjust = ""),
                      class: "!w-[200px]"
                    }, null, 8, ["modelValue", "placeholder"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              n(s, {
                label: a(o)("memo"),
                prop: "memo"
              }, {
                default: l(() => [
                  n(R, {
                    modelValue: t.memo,
                    "onUpdate:modelValue": e[3] || (e[3] = (u) => t.memo = u),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    rows: "4",
                    clearable: "",
                    placeholder: a(o)("memoPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [N, r.value]
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
