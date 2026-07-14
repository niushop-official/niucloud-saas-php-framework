import { defineComponent as q, ref as g, reactive as M, computed as A, resolveComponent as d, resolveDirective as F, openBlock as w, createBlock as y, unref as o, withCtx as n, createElementVNode as K, createVNode as a, createTextVNode as _, toDisplayString as f, withDirectives as N } from "vue";
import { t, dU as R, dV as j } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "dialog-footer" }, W = /* @__PURE__ */ q({
  __name: "sms-tencent",
  emits: ["complete"],
  setup(O, { expose: S, emit: D }) {
    const c = g(!1), s = g(!0), v = {
      sms_type: "",
      sign: "",
      access_key: "",
      secret_key: "",
      is_use: "",
      app_id: "",
      secret_id: ""
    }, l = M({ ...v }), b = g(), U = A(() => ({
      sign: [
        { required: !0, message: t("tencentSignPlaceholder"), trigger: "blur" }
      ],
      app_id: [
        { required: !0, message: t("tencentAppIdPlaceholder"), trigger: "blur" }
      ],
      secret_id: [
        { required: !0, message: t("tencentSecretIdPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: t("tencentSecretKeyPlaceholder"), trigger: "blur" }
      ]
    })), P = D, k = async (u) => {
      s.value || !u || await u.validate(async (e) => {
        e && (s.value = !0, R(l).then((V) => {
          s.value = !1, c.value = !1, P("complete");
        }).catch(() => {
          s.value = !1;
        }));
      });
    };
    return S({
      showDialog: c,
      setFormData: async (u = null) => {
        if (s.value = !0, Object.assign(l, v), u) {
          const e = await (await j(u.sms_type)).data;
          Object.keys(l).forEach((i) => {
            e[i] != null && (l[i] = e[i]), e.params[i] != null && (l[i] = e.params[i].value);
          });
        }
        s.value = !1;
      }
    }), (u, e) => {
      const i = d("el-radio"), V = d("el-radio-group"), m = d("el-form-item"), p = d("el-input"), x = d("el-form"), h = d("el-button"), I = d("el-dialog"), C = F("loading");
      return w(), y(I, {
        modelValue: c.value,
        "onUpdate:modelValue": e[7] || (e[7] = (r) => c.value = r),
        title: o(t)("tencentSms"),
        width: "580px",
        "destroy-on-close": !0
      }, {
        footer: n(() => [
          K("span", B, [
            a(h, {
              onClick: e[5] || (e[5] = (r) => c.value = !1)
            }, {
              default: n(() => [
                _(f(o(t)("cancel")), 1)
              ]),
              _: 1
            }),
            a(h, {
              type: "primary",
              loading: s.value,
              onClick: e[6] || (e[6] = (r) => k(b.value))
            }, {
              default: n(() => [
                _(f(o(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: n(() => [
          N((w(), y(x, {
            model: l,
            "label-width": "140px",
            ref_key: "formRef",
            ref: b,
            rules: U.value,
            class: "page-form"
          }, {
            default: n(() => [
              a(m, {
                label: o(t)("isUse")
              }, {
                default: n(() => [
                  a(V, {
                    modelValue: l.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => l.is_use = r)
                  }, {
                    default: n(() => [
                      a(i, { label: 1 }, {
                        default: n(() => [
                          _(f(o(t)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      a(i, { label: 0 }, {
                        default: n(() => [
                          _(f(o(t)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(t)("tencentSign"),
                prop: "sign"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: l.sign,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => l.sign = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(t)("tencentSignPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(t)("tencentAppId"),
                prop: "app_id"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: l.app_id,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => l.app_id = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(t)("tencentAppIdPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(t)("tencentSecretId"),
                prop: "secret_id"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: l.secret_id,
                    "onUpdate:modelValue": e[3] || (e[3] = (r) => l.secret_id = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(t)("tencentSecretIdPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(t)("tencentSecretKey"),
                prop: "secret_key"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: l.secret_key,
                    "onUpdate:modelValue": e[4] || (e[4] = (r) => l.secret_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(t)("tencentSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [C, s.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  W as default
};
