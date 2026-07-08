import { defineComponent as C, ref as f, reactive as U, computed as q, resolveComponent as d, resolveDirective as M, openBlock as b, createBlock as v, unref as c, withCtx as i, createElementVNode as A, createVNode as n, createTextVNode as V, toDisplayString as h, withDirectives as F } from "vue";
import { t as o } from "./core-shared-9b1e55e9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const O = { class: "dialog-footer" }, J = /* @__PURE__ */ C({
  __name: "pay-offlinepay",
  emits: ["complete"],
  setup(R, { expose: y, emit: k }) {
    const r = f(!1), u = f(!0), p = {
      type: "offlinepay",
      config: {
        collection_name: "",
        collection_bank: "",
        collection_account: "",
        collection_desc: ""
      },
      channel: "",
      status: 0,
      is_default: 0
    }, l = U({ ...p }), _ = f(), w = q(() => ({
      "config.collection_name": [
        { required: !0, message: o("collectionNamePlaceholder"), trigger: "blur" }
      ],
      "config.collection_bank": [
        { required: !0, message: o("collectionBankPlaceholder"), trigger: "blur" }
      ],
      "config.collection_account": [
        { required: !0, message: o("collectionAccountPlaceholder"), trigger: "blur" }
      ],
      "config.collection_desc": [
        { required: !0, message: o("collectionDescPlaceholder"), trigger: "blur" }
      ]
    })), D = k, x = async (a) => {
      u.value || !a || await a.validate(async (e) => {
        e && (D("complete", l), r.value = !1);
      });
    };
    return y({
      showDialog: r,
      setFormData: async (a = null) => {
        u.value = !0, Object.assign(l, p), a && (Object.keys(l).forEach((e) => {
          a[e] != null && (l[e] = a[e]);
        }), l.channel = a.redio_key.split("_")[0], l.status = Number(l.status)), u.value = !1;
      }
    }), (a, e) => {
      const s = d("el-input"), m = d("el-form-item"), P = d("el-form"), g = d("el-button"), N = d("el-dialog"), B = M("loading");
      return b(), v(N, {
        modelValue: r.value,
        "onUpdate:modelValue": e[6] || (e[6] = (t) => r.value = t),
        title: c(o)("updateOfflinepay"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          A("span", O, [
            n(g, {
              onClick: e[4] || (e[4] = (t) => r.value = !1)
            }, {
              default: i(() => [
                V(h(c(o)("cancel")), 1)
              ]),
              _: 1
            }),
            n(g, {
              type: "primary",
              loading: u.value,
              onClick: e[5] || (e[5] = (t) => x(_.value))
            }, {
              default: i(() => [
                V(h(c(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          F((b(), v(P, {
            model: l,
            "label-width": "110px",
            ref_key: "formRef",
            ref: _,
            rules: w.value,
            class: "page-form"
          }, {
            default: i(() => [
              n(m, {
                label: c(o)("collectionName"),
                prop: "config.collection_name"
              }, {
                default: i(() => [
                  n(s, {
                    modelValue: l.config.collection_name,
                    "onUpdate:modelValue": e[0] || (e[0] = (t) => l.config.collection_name = t),
                    modelModifiers: { trim: !0 },
                    placeholder: c(o)("collectionNamePlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: c(o)("collectionBank"),
                prop: "config.collection_bank"
              }, {
                default: i(() => [
                  n(s, {
                    modelValue: l.config.collection_bank,
                    "onUpdate:modelValue": e[1] || (e[1] = (t) => l.config.collection_bank = t),
                    modelModifiers: { trim: !0 },
                    placeholder: c(o)("collectionBankPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: c(o)("collectionAccount"),
                prop: "config.collection_account"
              }, {
                default: i(() => [
                  n(s, {
                    modelValue: l.config.collection_account,
                    "onUpdate:modelValue": e[2] || (e[2] = (t) => l.config.collection_account = t),
                    modelModifiers: { trim: !0 },
                    placeholder: c(o)("collectionAccountPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: c(o)("collectionDesc"),
                prop: "config.collection_desc"
              }, {
                default: i(() => [
                  n(s, {
                    modelValue: l.config.collection_desc,
                    "onUpdate:modelValue": e[3] || (e[3] = (t) => l.config.collection_desc = t),
                    modelModifiers: { trim: !0 },
                    placeholder: c(o)("collectionDescPlaceholder"),
                    class: "input-width",
                    type: "textarea",
                    rows: "4",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [B, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  J as default
};
