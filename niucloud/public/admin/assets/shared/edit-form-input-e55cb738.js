import { defineComponent as v, resolveComponent as r, openBlock as V, createElementBlock as g, Fragment as C, withDirectives as h, createElementVNode as n, renderSlot as p, createVNode as l, withModifiers as y, withCtx as o, unref as e, toDisplayString as m, vShow as x } from "vue";
import { t as s } from "./core-shared-c6ad4e77.js";
import { u as S } from "./diy-452683aa.js";
const T = { class: "content-wrap" }, D = { class: "flex items-center" }, M = { class: "mr-[3px]" }, P = /* @__PURE__ */ n("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), U = { class: "flex items-center" }, $ = { class: "mr-[3px]" }, B = /* @__PURE__ */ n("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), O = { class: "style-wrap" }, j = /* @__PURE__ */ v({
  __name: "edit-form-input",
  setup(k, { expose: w }) {
    const t = S();
    return t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (d) => ({ code: !0, message: "" }), w({}), (d, i) => {
      const c = r("el-input"), u = r("el-form-item"), f = r("el-tooltip"), _ = r("el-form"), b = r("el-switch");
      return V(), g(C, null, [
        h(n("div", T, [
          p(d.$slots, "field"),
          l(_, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: i[2] || (i[2] = y(() => {
            }, ["prevent"]))
          }, {
            default: o(() => [
              l(u, {
                label: e(s)("formPlaceholder")
              }, {
                default: o(() => [
                  l(c, {
                    modelValue: e(t).editComponent.placeholder,
                    "onUpdate:modelValue": i[0] || (i[0] = (a) => e(t).editComponent.placeholder = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(s)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              l(u, null, {
                label: o(() => [
                  n("div", D, [
                    n("span", M, m(e(s)("defaultValue")), 1),
                    l(f, {
                      effect: "light",
                      content: e(s)("defaultValueTips"),
                      placement: "top"
                    }, {
                      default: o(() => [
                        P
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: o(() => [
                  l(c, {
                    modelValue: e(t).editComponent.field.default,
                    "onUpdate:modelValue": i[1] || (i[1] = (a) => e(t).editComponent.field.default = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(s)("defaultValuePlaceholder"),
                    clearable: "",
                    maxlength: "18",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          p(d.$slots, "other"),
          l(_, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              l(u, null, {
                label: o(() => [
                  n("div", U, [
                    n("span", $, m(e(s)("preventDuplication")), 1),
                    l(f, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: o(() => [
                        n("p", null, m(e(s)("preventDuplicationTipsOne")), 1),
                        n("p", null, m(e(s)("preventDuplicationTipsTwo")), 1)
                      ]),
                      default: o(() => [
                        B
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: o(() => [
                  l(b, {
                    modelValue: e(t).editComponent.field.unique,
                    "onUpdate:modelValue": i[3] || (i[3] = (a) => e(t).editComponent.field.unique = a)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [x, e(t).editTab == "content"]
        ]),
        h(n("div", O, [
          p(d.$slots, "style-field"),
          p(d.$slots, "style")
        ], 512), [
          [x, e(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as _
};
