import { defineComponent as B, ref as f, reactive as C, computed as U, resolveComponent as d, resolveDirective as q, openBlock as b, createBlock as v, unref as t, withCtx as a, createElementVNode as M, createVNode as n, createTextVNode as V, toDisplayString as h, withDirectives as A } from "vue";
import { t as o } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const F = { class: "dialog-footer" }, I = /* @__PURE__ */ B({
  __name: "pay-offlinepay",
  emits: ["complete"],
  setup(O, { expose: y, emit: k }) {
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
    }, l = C({ ...p }), _ = f(), w = U(() => ({
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
    })), D = async (i) => {
      u.value || !i || await i.validate(async (e) => {
        e && (k("complete", l), r.value = !1);
      });
    };
    return y({
      showDialog: r,
      setFormData: async (i = null) => {
        u.value = !0, Object.assign(l, p), i && (Object.keys(l).forEach((e) => {
          i[e] != null && (l[e] = i[e]);
        }), l.channel = i.redio_key.split("_")[0], l.status = Number(l.status)), u.value = !1;
      }
    }), (i, e) => {
      const s = d("el-input"), m = d("el-form-item"), P = d("el-form"), g = d("el-button"), x = d("el-dialog"), N = q("loading");
      return b(), v(x, {
        modelValue: r.value,
        "onUpdate:modelValue": e[6] || (e[6] = (c) => r.value = c),
        title: t(o)("updateOfflinepay"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          M("span", F, [
            n(g, {
              onClick: e[4] || (e[4] = (c) => r.value = !1)
            }, {
              default: a(() => [
                V(h(t(o)("cancel")), 1)
              ]),
              _: 1
            }),
            n(g, {
              type: "primary",
              loading: u.value,
              onClick: e[5] || (e[5] = (c) => D(_.value))
            }, {
              default: a(() => [
                V(h(t(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: a(() => [
          A((b(), v(P, {
            model: l,
            "label-width": "110px",
            ref_key: "formRef",
            ref: _,
            rules: t(w),
            class: "page-form"
          }, {
            default: a(() => [
              n(m, {
                label: t(o)("collectionName"),
                prop: "config.collection_name"
              }, {
                default: a(() => [
                  n(s, {
                    modelValue: l.config.collection_name,
                    "onUpdate:modelValue": e[0] || (e[0] = (c) => l.config.collection_name = c),
                    modelModifiers: { trim: !0 },
                    placeholder: t(o)("collectionNamePlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: t(o)("collectionBank"),
                prop: "config.collection_bank"
              }, {
                default: a(() => [
                  n(s, {
                    modelValue: l.config.collection_bank,
                    "onUpdate:modelValue": e[1] || (e[1] = (c) => l.config.collection_bank = c),
                    modelModifiers: { trim: !0 },
                    placeholder: t(o)("collectionBankPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: t(o)("collectionAccount"),
                prop: "config.collection_account"
              }, {
                default: a(() => [
                  n(s, {
                    modelValue: l.config.collection_account,
                    "onUpdate:modelValue": e[2] || (e[2] = (c) => l.config.collection_account = c),
                    modelModifiers: { trim: !0 },
                    placeholder: t(o)("collectionAccountPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: t(o)("collectionDesc"),
                prop: "config.collection_desc"
              }, {
                default: a(() => [
                  n(s, {
                    modelValue: l.config.collection_desc,
                    "onUpdate:modelValue": e[3] || (e[3] = (c) => l.config.collection_desc = c),
                    modelModifiers: { trim: !0 },
                    placeholder: t(o)("collectionDescPlaceholder"),
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
            [N, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  I as default
};
