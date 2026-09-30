import { defineComponent as b, resolveComponent as r, openBlock as w, createElementBlock as v, Fragment as y, withDirectives as s, createElementVNode as m, renderSlot as n, createVNode as i, withModifiers as g, withCtx as d, unref as o, vShow as a } from "vue";
import { t as p } from "./core-shared-c6ad4e77.js";
import { u as C } from "./diy-452683aa.js";
const S = { class: "content-wrap" }, V = { class: "style-wrap" }, x = /* @__PURE__ */ b({
  __name: "edit-form-wechat-name",
  setup(T, { expose: c }) {
    const e = C();
    return e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (t) => ({ code: !0, message: "" }), c({}), (t, l) => {
      const _ = r("el-input"), f = r("el-form-item"), u = r("el-form");
      return w(), v(y, null, [
        s(m("div", S, [
          n(t.$slots, "field"),
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
          n(t.$slots, "other")
        ], 512), [
          [a, o(e).editTab == "content"]
        ]),
        s(m("div", V, [
          n(t.$slots, "style-field"),
          n(t.$slots, "style")
        ], 512), [
          [a, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x
}, Symbol.toStringTag, { value: "Module" }));
export {
  P as _
};
