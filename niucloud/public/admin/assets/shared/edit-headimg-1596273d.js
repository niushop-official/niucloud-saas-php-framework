import { defineComponent as u, resolveComponent as l, openBlock as x, createElementBlock as f, createElementVNode as e, toDisplayString as v, unref as t, renderSlot as h, createVNode as i, withCtx as p, normalizeClass as a } from "vue";
import { t as m } from "./core-shared-ca1fcae5.js";
import { u as g } from "./poster-ba7254e7.js";
const C = { class: "content-wrap" }, S = { class: "edit-attr-item-wrap" }, D = { class: "mb-[10px] text-sm text-primary" }, F = { class: "flex items-center" }, w = /* @__PURE__ */ u({
  __name: "edit-headimg",
  setup(y, { expose: d }) {
    const r = g(), s = (n) => {
      r.editComponent.shape = n;
    };
    return d({}), (n, o) => {
      const c = l("el-form-item"), _ = l("el-form");
      return x(), f("div", C, [
        e("div", S, [
          e("div", D, v(t(m)("needLoginTips")), 1)
        ]),
        h(n.$slots, "common"),
        i(_, {
          "label-width": "80px",
          class: "px-[10px]"
        }, {
          default: p(() => [
            i(c, {
              label: t(m)("imgShape")
            }, {
              default: p(() => [
                e("div", F, [
                  e("div", {
                    class: a(["bg-[#DFDFDF] cursor-pointer w-[50px] h-[50px] border-solid border-[1px] border-transparent rounded-[50%]", { "border-[var(--el-color-primary)]": t(r).editComponent.shape == "circle" }]),
                    onClick: o[0] || (o[0] = (b) => s("circle"))
                  }, null, 2),
                  e("div", {
                    class: a(["bg-[#DFDFDF] cursor-pointer w-[50px] h-[50px] ml-[25px] border-solid border-[1px] border-transparent", { "border-[var(--el-color-primary)]": t(r).editComponent.shape == "normal" }]),
                    onClick: o[1] || (o[1] = (b) => s("normal"))
                  }, null, 2)
                ])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        })
      ]);
    };
  }
}), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: w
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as _
};
