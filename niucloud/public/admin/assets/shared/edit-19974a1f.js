import { defineComponent as U, ref as p, reactive as q, computed as M, resolveComponent as u, resolveDirective as N, openBlock as y, createBlock as h, unref as o, withCtx as d, createElementVNode as w, createVNode as n, createTextVNode as V, toDisplayString as f, withDirectives as R } from "vue";
import { t as l, ba as T, bb as $, b9 as j } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "form-tip" }, E = { class: "dialog-footer" }, L = /* @__PURE__ */ U({
  __name: "edit",
  emits: ["complete"],
  setup(O, { expose: k, emit: D }) {
    const m = p(!1), i = p(!1), _ = {
      id: "",
      name: "",
      key: "",
      memo: ""
    }, t = q({ ..._ }), g = p(), x = M(() => ({
      name: [
        { required: !0, message: l("namePlaceholder"), trigger: "blur" }
      ],
      key: [
        { required: !0, message: l("keyPlaceholder"), trigger: "blur" },
        {
          validator: (s, e, a) => {
            /^[a-zA-Z_]+$/.test(e) ? a() : a(new Error(l("keyFormatTips")));
          },
          trigger: "blur"
        }
      ],
      data: [
        { required: !0, message: l("dataPlaceholder"), trigger: "blur" }
      ]
    })), P = async (s) => {
      if (i.value || !s)
        return;
      const e = t.id ? T : $;
      await s.validate(async (a) => {
        a && (i.value = !0, e(t).then((v) => {
          i.value = !1, m.value = !1, D("complete");
        }).catch(() => {
          i.value = !1;
        }));
      });
    };
    return k({
      showDialog: m,
      setFormData: async (s = null) => {
        if (Object.assign(t, _), i.value = !0, s) {
          const e = await (await j(s.id)).data;
          e && Object.keys(t).forEach((a) => {
            e[a] != null && (t[a] = e[a]);
          });
        }
        i.value = !1;
      }
    }), (s, e) => {
      const a = u("el-input"), c = u("el-form-item"), v = u("el-form"), b = u("el-button"), C = u("el-dialog"), F = N("loading");
      return y(), h(C, {
        modelValue: m.value,
        "onUpdate:modelValue": e[5] || (e[5] = (r) => m.value = r),
        title: t.id ? o(l)("updateDict") : o(l)("addDict"),
        width: "480",
        class: "diy-dialog-wrap",
        "destroy-on-close": !0
      }, {
        footer: d(() => [
          w("span", E, [
            n(b, {
              onClick: e[3] || (e[3] = (r) => m.value = !1)
            }, {
              default: d(() => [
                V(f(o(l)("cancel")), 1)
              ]),
              _: 1
            }),
            n(b, {
              type: "primary",
              loading: i.value,
              onClick: e[4] || (e[4] = (r) => P(g.value))
            }, {
              default: d(() => [
                V(f(o(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: d(() => [
          R((y(), h(v, {
            model: t,
            "label-width": "100px",
            ref_key: "formRef",
            ref: g,
            rules: o(x),
            class: "page-form"
          }, {
            default: d(() => [
              n(c, {
                label: o(l)("name"),
                prop: "name"
              }, {
                default: d(() => [
                  n(a, {
                    modelValue: t.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.name = r),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "40",
                    "show-word-limit": "",
                    placeholder: o(l)("namePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(c, {
                label: o(l)("key"),
                prop: "key"
              }, {
                default: d(() => [
                  n(a, {
                    modelValue: t.key,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.key = r),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "40",
                    "show-word-limit": "",
                    placeholder: o(l)("keyPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"]),
                  w("p", B, f(o(l)("keyFormatTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(c, {
                label: o(l)("memo")
              }, {
                default: d(() => [
                  n(a, {
                    modelValue: t.memo,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => t.memo = r),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    clearable: "",
                    placeholder: o(l)("memoPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [F, i.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  L as default
};
