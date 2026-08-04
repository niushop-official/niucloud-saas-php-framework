import { defineComponent as q, ref as p, reactive as M, computed as N, resolveComponent as u, resolveDirective as R, openBlock as b, createBlock as h, unref as a, withCtx as n, createElementVNode as w, createVNode as d, createTextVNode as V, toDisplayString as f, withDirectives as T } from "vue";
import { t, b2 as $, b3 as j, b1 as B } from "./core-shared-5b3bfa35.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "form-tip" }, O = { class: "dialog-footer" }, Q = /* @__PURE__ */ q({
  __name: "edit",
  emits: ["complete"],
  setup(z, { expose: k, emit: D }) {
    const m = p(!1), i = p(!1), _ = {
      id: "",
      name: "",
      key: "",
      memo: ""
    }, l = M({ ..._ }), g = p(), x = N(() => ({
      name: [
        { required: !0, message: t("namePlaceholder"), trigger: "blur" }
      ],
      key: [
        { required: !0, message: t("keyPlaceholder"), trigger: "blur" },
        {
          validator: (s, e, o) => {
            /^[a-zA-Z_]+$/.test(e) ? o() : o(new Error(t("keyFormatTips")));
          },
          trigger: "blur"
        }
      ],
      data: [
        { required: !0, message: t("dataPlaceholder"), trigger: "blur" }
      ]
    })), P = D, C = async (s) => {
      if (i.value || !s)
        return;
      const e = l.id ? $ : j;
      await s.validate(async (o) => {
        o && (i.value = !0, e(l).then((v) => {
          i.value = !1, m.value = !1, P("complete");
        }).catch(() => {
          i.value = !1;
        }));
      });
    };
    return k({
      showDialog: m,
      setFormData: async (s = null) => {
        if (Object.assign(l, _), i.value = !0, s) {
          const e = await (await B(s.id)).data;
          e && Object.keys(l).forEach((o) => {
            e[o] != null && (l[o] = e[o]);
          });
        }
        i.value = !1;
      }
    }), (s, e) => {
      const o = u("el-input"), c = u("el-form-item"), v = u("el-form"), y = u("el-button"), F = u("el-dialog"), U = R("loading");
      return b(), h(F, {
        modelValue: m.value,
        "onUpdate:modelValue": e[5] || (e[5] = (r) => m.value = r),
        title: l.id ? a(t)("updateDict") : a(t)("addDict"),
        width: "480",
        class: "diy-dialog-wrap",
        "destroy-on-close": !0
      }, {
        footer: n(() => [
          w("span", O, [
            d(y, {
              onClick: e[3] || (e[3] = (r) => m.value = !1)
            }, {
              default: n(() => [
                V(f(a(t)("cancel")), 1)
              ]),
              _: 1
            }),
            d(y, {
              type: "primary",
              loading: i.value,
              onClick: e[4] || (e[4] = (r) => C(g.value))
            }, {
              default: n(() => [
                V(f(a(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: n(() => [
          T((b(), h(v, {
            model: l,
            "label-width": "120px",
            ref_key: "formRef",
            ref: g,
            rules: x.value,
            class: "page-form"
          }, {
            default: n(() => [
              d(c, {
                label: a(t)("name"),
                prop: "name"
              }, {
                default: n(() => [
                  d(o, {
                    modelValue: l.name,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => l.name = r),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "40",
                    "show-word-limit": "",
                    placeholder: a(t)("namePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              d(c, {
                label: a(t)("key"),
                prop: "key"
              }, {
                default: n(() => [
                  d(o, {
                    modelValue: l.key,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => l.key = r),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "40",
                    "show-word-limit": "",
                    placeholder: a(t)("keyPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"]),
                  w("p", E, f(a(t)("keyFormatTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              d(c, {
                label: a(t)("memo")
              }, {
                default: n(() => [
                  d(o, {
                    modelValue: l.memo,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => l.memo = r),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    clearable: "",
                    placeholder: a(t)("memoPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [U, i.value]
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
