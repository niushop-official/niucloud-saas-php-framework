import { defineComponent as C, ref as g, reactive as j, computed as q, resolveComponent as d, resolveDirective as A, openBlock as h, createBlock as k, unref as a, withCtx as o, createElementVNode as F, createVNode as r, createTextVNode as c, toDisplayString as f, withDirectives as M } from "vue";
import { t as l, ej as N, ek as R } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "dialog-footer" }, Q = /* @__PURE__ */ C({
  __name: "sms-niu",
  emits: ["complete"],
  setup(O, { expose: w, emit: S }) {
    const m = g(!1), n = g(!0), v = {
      sms_type: "",
      sign: "",
      app_key: "",
      secret_key: "",
      is_use: ""
    }, t = j({ ...v }), y = g(), D = q(() => ({
      sign: [
        { required: !0, message: l("aliSignPlaceholder"), trigger: "blur" }
      ],
      app_key: [
        { required: !0, message: l("aliAppKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: l("aliSecretKeyPlaceholder"), trigger: "blur" }
      ]
    })), U = async (u) => {
      n.value || !u || await u.validate(async (e) => {
        e && (n.value = !0, N(t).then((b) => {
          n.value = !1, m.value = !1, S("complete");
        }).catch(() => {
          n.value = !1;
        }));
      });
    };
    return w({
      showDialog: m,
      setFormData: async (u = null) => {
        if (n.value = !0, Object.assign(t, v), u) {
          const e = await (await R(u.sms_type)).data;
          Object.keys(t).forEach((s) => {
            e[s] != null && (t[s] = e[s]), e.params[s] != null && (t[s] = e.params[s].value);
          });
        }
        n.value = !1;
      }
    }), (u, e) => {
      const s = d("el-radio"), b = d("el-radio-group"), p = d("el-form-item"), _ = d("el-input"), x = d("el-form"), V = d("el-button"), K = d("el-dialog"), P = A("loading");
      return h(), k(K, {
        modelValue: m.value,
        "onUpdate:modelValue": e[6] || (e[6] = (i) => m.value = i),
        title: a(l)("aliSms"),
        width: "580px",
        "destroy-on-close": !0
      }, {
        footer: o(() => [
          F("span", B, [
            r(V, {
              onClick: e[4] || (e[4] = (i) => m.value = !1)
            }, {
              default: o(() => [
                c(f(a(l)("cancel")), 1)
              ]),
              _: 1
            }),
            r(V, {
              type: "primary",
              loading: n.value,
              onClick: e[5] || (e[5] = (i) => U(y.value))
            }, {
              default: o(() => [
                c(f(a(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: o(() => [
          M((h(), k(x, {
            model: t,
            "label-width": "140px",
            ref_key: "formRef",
            ref: y,
            rules: a(D),
            class: "page-form"
          }, {
            default: o(() => [
              r(p, {
                label: a(l)("isUse")
              }, {
                default: o(() => [
                  r(b, {
                    modelValue: t.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (i) => t.is_use = i)
                  }, {
                    default: o(() => [
                      r(s, { label: 1 }, {
                        default: o(() => [
                          c(f(a(l)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      r(s, { label: 0 }, {
                        default: o(() => [
                          c(f(a(l)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(p, {
                label: a(l)("aliSign"),
                prop: "sign"
              }, {
                default: o(() => [
                  r(_, {
                    modelValue: t.sign,
                    "onUpdate:modelValue": e[1] || (e[1] = (i) => t.sign = i),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliSignPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(p, {
                label: a(l)("aliAppKey"),
                prop: "app_key"
              }, {
                default: o(() => [
                  r(_, {
                    modelValue: t.app_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (i) => t.app_key = i),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliAppKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(p, {
                label: a(l)("aliSecretKey"),
                prop: "secret_key"
              }, {
                default: o(() => [
                  r(_, {
                    modelValue: t.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (i) => t.secret_key = i),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [P, n.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Q as default
};
