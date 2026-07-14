import { defineComponent as V, resolveComponent as d, openBlock as g, createElementBlock as v, Fragment as x, withDirectives as c, createElementVNode as s, renderSlot as m, createVNode as l, withModifiers as y, withCtx as n, unref as e, toDisplayString as S, vShow as f } from "vue";
import { t as r } from "./core-shared-11c0a673.js";
import { u as M } from "./diy-4662fd66.js";
const P = { class: "content-wrap" }, T = { class: "flex items-center" }, U = { class: "mr-[3px]" }, $ = { class: "style-wrap" }, B = /* @__PURE__ */ V({
  __name: "edit-form-textarea",
  setup(D, { expose: _ }) {
    const o = M();
    return o.editComponent.ignore = ["componentBgUrl"], o.editComponent.verify = (i) => ({ code: !0, message: "" }), _({}), (i, t) => {
      const p = d("el-input"), u = d("el-form-item"), h = d("QuestionFilled"), w = d("el-icon"), b = d("el-tooltip"), C = d("el-form");
      return g(), v(x, null, [
        c(s("div", P, [
          m(i.$slots, "field"),
          l(C, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: t[3] || (t[3] = y(() => {
            }, ["prevent"]))
          }, {
            default: n(() => [
              l(u, {
                label: e(r)("formPlaceholder")
              }, {
                default: n(() => [
                  l(p, {
                    modelValue: e(o).editComponent.placeholder,
                    "onUpdate:modelValue": t[0] || (t[0] = (a) => e(o).editComponent.placeholder = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(r)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              l(u, null, {
                label: n(() => [
                  s("div", T, [
                    s("span", U, S(e(r)("defaultValue")), 1),
                    l(b, {
                      effect: "light",
                      content: e(r)("defaultValueTips"),
                      placement: "top"
                    }, {
                      default: n(() => [
                        l(w, null, {
                          default: n(() => [
                            l(h, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: n(() => [
                  l(p, {
                    modelValue: e(o).editComponent.field.default,
                    "onUpdate:modelValue": t[1] || (t[1] = (a) => e(o).editComponent.field.default = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(r)("defaultValuePlaceholder"),
                    clearable: "",
                    maxlength: "18",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }),
              l(u, {
                label: e(r)("rowCount")
              }, {
                default: n(() => [
                  l(p, {
                    modelValue: e(o).editComponent.rowCount,
                    "onUpdate:modelValue": t[2] || (t[2] = (a) => e(o).editComponent.rowCount = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(r)("rowCountPlaceholder"),
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
          m(i.$slots, "other")
        ], 512), [
          [f, e(o).editTab == "content"]
        ]),
        c(s("div", $, [
          m(i.$slots, "style-field"),
          m(i.$slots, "style")
        ], 512), [
          [f, e(o).editTab == "style"]
        ])
      ], 64);
    };
  }
}), E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: B
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as _
};
