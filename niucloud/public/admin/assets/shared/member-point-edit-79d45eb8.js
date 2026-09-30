import { defineComponent as N, ref as _, reactive as $, computed as k, resolveComponent as i, resolveDirective as A, openBlock as y, createBlock as P, unref as l, withCtx as a, createElementVNode as j, createVNode as n, createTextVNode as v, toDisplayString as f, withDirectives as B, withModifiers as O } from "vue";
import { t as o, dd as S } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const T = { class: "input-width" }, q = { class: "dialog-footer" }, Y = /* @__PURE__ */ N({
  __name: "member-point-edit",
  emits: ["complete"],
  setup(z, { expose: w, emit: x }) {
    const p = _(!1), d = _(!0), c = _(!1), b = {
      member_id: 0,
      point: "",
      memo: "",
      adjust: "",
      account_data: "",
      adjust_type: 1
    }, t = $({ ...b }), g = _(), h = k(() => ({
      adjust: [
        { required: !0, message: o("adjustPointPlaceholder"), trigger: "blur" },
        {
          validator: (s, e, u) => {
            t.adjust = Math.floor(t.adjust);
            const m = Math.abs(parseFloat(t.adjust));
            m || u(new Error(o("adjustPointPlaceholder"))), t.adjust_type == -1 && parseFloat(t.point) - m < 0 && u(new Error(o("adjustPointMaxAccountMessage"))), u();
          },
          trigger: "blur"
        }
      ]
    })), D = async (s) => {
      d.value || !s || await s.validate(async (e) => {
        if (e) {
          if (d.value = !0, c.value)
            return;
          c.value = !0, t.account_data = Math.abs(parseFloat(t.adjust)) * t.adjust_type, S(t).then((m) => {
            d.value = !1, c.value = !1, p.value = !1, x("complete");
          }).catch(() => {
            d.value = !1, c.value = !1;
          });
        }
      });
    };
    return w({
      showDialog: p,
      setFormData: async (s = null) => {
        d.value = !0, Object.assign(t, b), s && Object.keys(t).forEach((e) => {
          s[e] != null && (t[e] = s[e]);
        }), d.value = !1;
      }
    }), (s, e) => {
      const u = i("el-form-item"), m = i("el-radio"), F = i("el-radio-group"), M = i("el-input-number"), C = i("el-input"), R = i("el-form"), V = i("el-button"), U = i("el-dialog"), E = A("loading");
      return y(), P(U, {
        modelValue: p.value,
        "onUpdate:modelValue": e[7] || (e[7] = (r) => p.value = r),
        title: l(o)("adjustPoint"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          j("span", q, [
            n(V, {
              onClick: e[5] || (e[5] = (r) => p.value = !1)
            }, {
              default: a(() => [
                v(f(l(o)("cancel")), 1)
              ]),
              _: 1
            }),
            n(V, {
              type: "primary",
              loading: d.value,
              onClick: e[6] || (e[6] = (r) => D(g.value))
            }, {
              default: a(() => [
                v(f(l(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: a(() => [
          B((y(), P(R, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: g,
            rules: l(h),
            class: "page-form",
            onSubmit: e[4] || (e[4] = O(() => {
            }, ["prevent"]))
          }, {
            default: a(() => [
              n(u, {
                label: l(o)("currPoint")
              }, {
                default: a(() => [
                  j("div", T, f(t.point), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: l(o)("adjustType")
              }, {
                default: a(() => [
                  n(F, {
                    modelValue: t.adjust_type,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.adjust_type = r)
                  }, {
                    default: a(() => [
                      n(m, { label: 1 }, {
                        default: a(() => [
                          v(f(l(o)("adjustAddPoint")), 1)
                        ]),
                        _: 1
                      }),
                      n(m, { label: -1 }, {
                        default: a(() => [
                          v(f(l(o)("adjustReducePoint")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: l(o)("adjustPoint"),
                prop: "adjust"
              }, {
                default: a(() => [
                  j("div", null, [
                    n(M, {
                      modelValue: t.adjust,
                      "onUpdate:modelValue": e[1] || (e[1] = (r) => t.adjust = r),
                      clearable: "",
                      min: 0,
                      max: 999999,
                      placeholder: l(o)("adjustPlaceholder"),
                      onFocus: e[2] || (e[2] = (r) => t.adjust = ""),
                      class: "!w-[200px]"
                    }, null, 8, ["modelValue", "placeholder"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: l(o)("memo"),
                prop: "memo"
              }, {
                default: a(() => [
                  n(C, {
                    modelValue: t.memo,
                    "onUpdate:modelValue": e[3] || (e[3] = (r) => t.memo = r),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    rows: "4",
                    clearable: "",
                    placeholder: l(o)("memoPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [E, d.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Y as default
};
