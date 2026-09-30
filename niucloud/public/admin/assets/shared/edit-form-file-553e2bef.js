import { defineComponent as b, resolveComponent as i, openBlock as S, createElementBlock as v, Fragment as y, withDirectives as s, createElementVNode as m, renderSlot as n, createVNode as r, withModifiers as g, withCtx as d, unref as t, createTextVNode as w, vShow as a } from "vue";
import { t as h } from "./core-shared-c6ad4e77.js";
import { u as C } from "./diy-452683aa.js";
const V = { class: "content-wrap" }, B = { class: "style-wrap" }, x = /* @__PURE__ */ b({
  __name: "edit-form-file",
  setup(M, { expose: p }) {
    const e = C();
    return e.editComponent.ignore = ["componentBgUrl"], p({}), (o, l) => {
      const _ = i("el-input"), f = i("el-form-item"), u = i("el-form");
      return S(), v(y, null, [
        s(m("div", V, [
          n(o.$slots, "field"),
          r(u, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: l[1] || (l[1] = g(() => {
            }, ["prevent"]))
          }, {
            default: d(() => [
              r(f, {
                label: t(h)("限制上传大小")
              }, {
                default: d(() => [
                  r(_, {
                    modelValue: t(e).editComponent.limitUploadSize,
                    "onUpdate:modelValue": l[0] || (l[0] = (c) => t(e).editComponent.limitUploadSize = c),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "15"
                  }, null, 8, ["modelValue"]),
                  w(" /单位MB，目前是Bit，要转换，*1024 ")
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          n(o.$slots, "other")
        ], 512), [
          [a, t(e).editTab == "content"]
        ]),
        s(m("div", B, [
          n(o.$slots, "style-field"),
          n(o.$slots, "style")
        ], 512), [
          [a, t(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as _
};
