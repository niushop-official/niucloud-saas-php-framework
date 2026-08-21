import { defineComponent as g, resolveComponent as r, openBlock as V, createElementBlock as x, Fragment as v, withDirectives as _, createElementVNode as a, toDisplayString as m, unref as e, createVNode as t, withCtx as l, createTextVNode as u, vShow as c, renderSlot as w } from "vue";
import { t as d } from "./core-shared-0b2facad.js";
import { u as z } from "./diy-fa1f4a9b.js";
const B = { class: "content-wrap" }, L = { class: "edit-attr-item-wrap" }, k = { class: "mb-[10px]" }, D = { class: "style-wrap" }, T = /* @__PURE__ */ g({
  __name: "edit-horz-line",
  setup(U, { expose: b }) {
    const o = z();
    return o.editComponent.ignore = ["pageBgColor", "componentBgColor", "componentBgUrl", "topRounded", "bottomRounded"], b({}), (f, n) => {
      const p = r("el-radio"), h = r("el-radio-group"), s = r("el-form-item"), C = r("el-color-picker"), y = r("el-slider"), S = r("el-form");
      return V(), x(v, null, [
        _(a("div", B, [
          a("div", L, [
            a("h3", k, m(e(d)("horzLineStyle")), 1),
            t(S, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: l(() => [
                t(s, {
                  label: e(d)("styleLabel")
                }, {
                  default: l(() => [
                    t(h, {
                      modelValue: e(o).editComponent.borderStyle,
                      "onUpdate:modelValue": n[0] || (n[0] = (i) => e(o).editComponent.borderStyle = i)
                    }, {
                      default: l(() => [
                        t(p, { label: "solid" }, {
                          default: l(() => [
                            u(m(e(d)("horzLineStyleSolid")), 1)
                          ]),
                          _: 1
                        }),
                        t(p, { label: "dashed" }, {
                          default: l(() => [
                            u(m(e(d)("horzLineStyleDashed")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(s, {
                  label: e(d)("horzLineBorderColor")
                }, {
                  default: l(() => [
                    t(C, {
                      modelValue: e(o).editComponent.borderColor,
                      "onUpdate:modelValue": n[1] || (n[1] = (i) => e(o).editComponent.borderColor = i),
                      "show-alpha": "",
                      predefine: e(o).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(s, {
                  label: e(d)("horzLineBorderWidth")
                }, {
                  default: l(() => [
                    t(y, {
                      modelValue: e(o).editComponent.borderWidth,
                      "onUpdate:modelValue": n[2] || (n[2] = (i) => e(o).editComponent.borderWidth = i),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 1,
                      max: 10
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [c, e(o).editTab == "content"]
        ]),
        _(a("div", D, [
          w(f.$slots, "style")
        ], 512), [
          [c, e(o).editTab == "style"]
        ])
      ], 64);
    };
  }
}), E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: T
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as _
};
