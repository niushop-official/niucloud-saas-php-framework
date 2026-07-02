import { defineComponent as b, resolveComponent as n, openBlock as v, createElementBlock as w, Fragment as y, withDirectives as s, createElementVNode as m, renderSlot as r, createVNode as i, withModifiers as g, withCtx as d, unref as o, vShow as a } from "vue";
import { t as p } from "./core-shared-ae4a556b.js";
import { u as C } from "./diy-30711e15.js";
const S = { class: "content-wrap" }, x = { class: "style-wrap" }, V = /* @__PURE__ */ b({
  __name: "edit-form-email",
  setup(T, { expose: c }) {
    const e = C();
    return e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (t) => ({ code: !0, message: "" }), c({}), (t, l) => {
      const _ = n("el-input"), f = n("el-form-item"), u = n("el-form");
      return v(), w(y, null, [
        s(m("div", S, [
          r(t.$slots, "field"),
          i(u, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: l[1] || (l[1] = g(() => {
            }, ["prevent"]))
          }, {
            default: d(() => [
              i(f, {
                label: o(p)("formPlaceholder")
              }, {
                default: d(() => [
                  i(_, {
                    modelValue: o(e).editComponent.placeholder,
                    "onUpdate:modelValue": l[0] || (l[0] = (h) => o(e).editComponent.placeholder = h),
                    modelModifiers: { trim: !0 },
                    placeholder: o(p)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          r(t.$slots, "other")
        ], 512), [
          [a, o(e).editTab == "content"]
        ]),
        s(m("div", x, [
          r(t.$slots, "style-field"),
          r(t.$slots, "style")
        ], 512), [
          [a, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: V
}, Symbol.toStringTag, { value: "Module" }));
export {
  P as _
};
