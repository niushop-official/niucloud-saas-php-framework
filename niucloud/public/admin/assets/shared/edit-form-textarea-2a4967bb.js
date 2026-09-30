import { defineComponent as b, resolveComponent as s, openBlock as C, createElementBlock as V, Fragment as g, withDirectives as c, createElementVNode as i, renderSlot as m, createVNode as l, withModifiers as x, withCtx as r, unref as e, toDisplayString as v, vShow as f } from "vue";
import { t as n } from "./core-shared-c6ad4e77.js";
import { u as y } from "./diy-452683aa.js";
const S = { class: "content-wrap" }, M = { class: "flex items-center" }, P = { class: "mr-[3px]" }, T = /* @__PURE__ */ i("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), U = { class: "style-wrap" }, $ = /* @__PURE__ */ b({
  __name: "edit-form-textarea",
  setup(B, { expose: _ }) {
    const o = y();
    return o.editComponent.ignore = ["componentBgUrl"], o.editComponent.verify = (d) => ({ code: !0, message: "" }), _({}), (d, t) => {
      const p = s("el-input"), u = s("el-form-item"), h = s("el-tooltip"), w = s("el-form");
      return C(), V(g, null, [
        c(i("div", S, [
          m(d.$slots, "field"),
          l(w, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: t[3] || (t[3] = x(() => {
            }, ["prevent"]))
          }, {
            default: r(() => [
              l(u, {
                label: e(n)("formPlaceholder")
              }, {
                default: r(() => [
                  l(p, {
                    modelValue: e(o).editComponent.placeholder,
                    "onUpdate:modelValue": t[0] || (t[0] = (a) => e(o).editComponent.placeholder = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(n)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              l(u, null, {
                label: r(() => [
                  i("div", M, [
                    i("span", P, v(e(n)("defaultValue")), 1),
                    l(h, {
                      effect: "light",
                      content: e(n)("defaultValueTips"),
                      placement: "top"
                    }, {
                      default: r(() => [
                        T
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: r(() => [
                  l(p, {
                    modelValue: e(o).editComponent.field.default,
                    "onUpdate:modelValue": t[1] || (t[1] = (a) => e(o).editComponent.field.default = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(n)("defaultValuePlaceholder"),
                    clearable: "",
                    maxlength: "18",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }),
              l(u, {
                label: e(n)("rowCount")
              }, {
                default: r(() => [
                  l(p, {
                    modelValue: e(o).editComponent.rowCount,
                    "onUpdate:modelValue": t[2] || (t[2] = (a) => e(o).editComponent.rowCount = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(n)("rowCountPlaceholder"),
                    clearable: "",
                    maxlength: "2",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          m(d.$slots, "other")
        ], 512), [
          [f, e(o).editTab == "content"]
        ]),
        c(i("div", U, [
          m(d.$slots, "style-field"),
          m(d.$slots, "style")
        ], 512), [
          [f, e(o).editTab == "style"]
        ])
      ], 64);
    };
  }
}), E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as _
};
