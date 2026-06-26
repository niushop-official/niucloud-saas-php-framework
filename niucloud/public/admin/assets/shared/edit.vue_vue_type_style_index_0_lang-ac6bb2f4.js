import { defineComponent as q, ref as p, reactive as M, computed as N, resolveComponent as u, resolveDirective as R, openBlock as b, createBlock as h, unref as o, withCtx as n, createElementVNode as w, createVNode as d, createTextVNode as V, toDisplayString as f, withDirectives as T } from "vue";
import { t as l, b2 as $, b3 as j, b1 as B } from "./core-shared-ca1fcae5.js";
const E = { class: "form-tip" }, O = { class: "dialog-footer" }, Z = /* @__PURE__ */ q({
  __name: "edit",
  emits: ["complete"],
  setup(z, { expose: k, emit: D }) {
    const m = p(!1), i = p(!1), _ = {
      id: "",
      name: "",
      key: "",
      memo: ""
    }, t = M({ ..._ }), g = p(), x = N(() => ({
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
    })), P = D, C = async (s) => {
      if (i.value || !s)
        return;
      const e = t.id ? $ : j;
      await s.validate(async (a) => {
        a && (i.value = !0, e(t).then((v) => {
          i.value = !1, m.value = !1, P("complete");
        }).catch(() => {
          i.value = !1;
        }));
      });
    };
    return k({
      showDialog: m,
      setFormData: async (s = null) => {
        if (Object.assign(t, _), i.value = !0, s) {
          const e = await (await B(s.id)).data;
          e && Object.keys(t).forEach((a) => {
            e[a] != null && (t[a] = e[a]);
          });
        }
        i.value = !1;
      }
    }), (s, e) => {
      const a = u("el-input"), c = u("el-form-item"), v = u("el-form"), y = u("el-button"), F = u("el-dialog"), U = R("loading");
      return b(), h(F, {
        modelValue: m.value,
        "onUpdate:modelValue": e[5] || (e[5] = (r) => m.value = r),
        title: t.id ? o(l)("updateDict") : o(l)("addDict"),
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
                V(f(o(l)("cancel")), 1)
              ]),
              _: 1
            }),
            d(y, {
              type: "primary",
              loading: i.value,
              onClick: e[4] || (e[4] = (r) => C(g.value))
            }, {
              default: n(() => [
                V(f(o(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: n(() => [
          T((b(), h(v, {
            model: t,
            "label-width": "120px",
            ref_key: "formRef",
            ref: g,
            rules: x.value,
            class: "page-form"
          }, {
            default: n(() => [
              d(c, {
                label: o(l)("name"),
                prop: "name"
              }, {
                default: n(() => [
                  d(a, {
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
              d(c, {
                label: o(l)("key"),
                prop: "key"
              }, {
                default: n(() => [
                  d(a, {
                    modelValue: t.key,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.key = r),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "40",
                    "show-word-limit": "",
                    placeholder: o(l)("keyPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"]),
                  w("p", E, f(o(l)("keyFormatTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              d(c, {
                label: o(l)("memo")
              }, {
                default: n(() => [
                  d(a, {
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
            [U, i.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Z as _
};
