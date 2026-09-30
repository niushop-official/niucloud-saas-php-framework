import { defineComponent as f, resolveComponent as l, openBlock as b, createElementBlock as g, Fragment as v, withDirectives as i, createElementVNode as o, toDisplayString as y, unref as e, createVNode as n, withCtx as r, vShow as a, renderSlot as w } from "vue";
import { t as m } from "./core-shared-c6ad4e77.js";
import { u as x } from "./diy-452683aa.js";
const S = { class: "content-wrap" }, C = { class: "edit-attr-item-wrap" }, k = { class: "mb-[10px]" }, V = { class: "style-wrap" }, B = /* @__PURE__ */ f({
  __name: "edit-horz-blank",
  setup(z, { expose: _ }) {
    const t = x();
    return t.editComponent.ignore = ["pageBgColor", "componentBgUrl"], _({}), (d, s) => {
      const p = l("el-slider"), c = l("el-form-item"), u = l("el-form");
      return b(), g(v, null, [
        i(o("div", S, [
          o("div", C, [
            o("h3", k, y(e(m)("blankHeightSet")), 1),
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
          w(d.$slots, "style")
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
