import { defineComponent as f, resolveComponent as l, openBlock as b, createElementBlock as g, Fragment as v, withDirectives as i, createElementVNode as o, toDisplayString as x, unref as e, createVNode as n, withCtx as r, vShow as a, renderSlot as y } from "vue";
import { t as m } from "./core-shared-ca1fcae5.js";
import { u as w } from "./diy-f8acd48b.js";
const S = { class: "content-wrap" }, C = { class: "edit-attr-item-wrap" }, k = { class: "mb-[10px]" }, V = { class: "style-wrap" }, B = /* @__PURE__ */ f({
  __name: "edit-horz-blank",
  setup(z, { expose: _ }) {
    const t = w();
    return t.editComponent.ignore = ["pageBgColor", "componentBgUrl"], _({}), (d, s) => {
      const p = l("el-slider"), c = l("el-form-item"), u = l("el-form");
      return b(), g(v, null, [
        i(o("div", S, [
          o("div", C, [
            o("h3", k, x(e(m)("blankHeightSet")), 1),
            n(u, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: r(() => [
                n(c, {
                  label: e(m)("blankHeight")
                }, {
                  default: r(() => [
                    n(p, {
                      modelValue: e(t).editComponent.height,
                      "onUpdate:modelValue": s[0] || (s[0] = (h) => e(t).editComponent.height = h),
                      "show-input": "",
                      size: "small",
                      max: "200",
                      class: "ml-[10px] diy-nav-slider"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [a, e(t).editTab == "content"]
        ]),
        i(o("div", V, [
          y(d.$slots, "style")
        ], 512), [
          [a, e(t).editTab == "style"]
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
