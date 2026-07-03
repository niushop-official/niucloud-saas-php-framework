import { defineComponent as u, resolveComponent as n, openBlock as f, createElementBlock as x, createElementVNode as s, toDisplayString as h, unref as t, createVNode as a, withCtx as m, renderSlot as b } from "vue";
import { t as l } from "./core-shared-c8d7774e.js";
import { u as v } from "./poster-f5d41b69.js";
const g = { class: "content-wrap" }, w = { class: "edit-attr-item-wrap" }, S = { class: "mb-[10px]" }, C = /* @__PURE__ */ u({
  __name: "edit-text",
  setup(y, { expose: i }) {
    const o = v();
    return o.editComponent.verify = (r) => {
      const e = { code: !0, message: "" };
      return o.value[r].value == "" && (e.code = !1, e.message = l("textPlaceholder")), e;
    }, i({}), (r, e) => {
      const d = n("el-input"), p = n("el-form-item"), _ = n("el-form");
      return f(), x("div", g, [
        s("div", w, [
          s("h3", S, h(t(l)("textSet")), 1),
          a(_, {
            "label-width": "80px",
            class: "px-[10px]"
          }, {
            default: m(() => [
              a(p, {
                label: t(l)("textLabel")
              }, {
                default: m(() => [
                  a(d, {
                    modelValue: t(o).editComponent.value,
                    "onUpdate:modelValue": e[0] || (e[0] = (c) => t(o).editComponent.value = c),
                    modelModifiers: { trim: !0 },
                    type: "textarea",
                    rows: "4",
                    placeholder: t(l)("textPlaceholder"),
                    clearable: "",
                    maxlength: "50",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          })
        ]),
        b(r.$slots, "common")
      ]);
    };
  }
}), k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: C
}, Symbol.toStringTag, { value: "Module" }));
export {
  k as _
};
