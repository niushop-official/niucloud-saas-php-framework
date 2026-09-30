import { defineComponent as w, resolveComponent as s, openBlock as v, createElementBlock as V, Fragment as x, withDirectives as c, createElementVNode as r, renderSlot as m, createVNode as n, withModifiers as y, withCtx as a, unref as l, toDisplayString as C, vShow as _ } from "vue";
import { t as d, bJ as S } from "./core-shared-c6ad4e77.js";
import { u as T } from "./diy-452683aa.js";
const $ = { class: "content-wrap" }, M = { class: "flex items-center" }, P = { class: "mr-[3px]" }, D = /* @__PURE__ */ r("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), E = { class: "style-wrap" }, N = /* @__PURE__ */ w({
  __name: "edit-form-number",
  setup(U, { expose: h }) {
    const t = T();
    t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (o) => {
      const e = { code: !0, message: "" };
      return t.value[o].field.default && (isNaN(t.value[o].field.default) || !b.digit.test(t.value[o].field.default) ? (e.code = !1, e.message = d("defaultErrorTips")) : t.value[o].field.default < 0 && (e.code = !1, e.message = d("defaultMustZeroTips"))), e;
    };
    const b = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    };
    return h({}), (o, e) => {
      const u = s("el-input"), p = s("el-form-item"), g = s("el-tooltip"), f = s("el-form");
      return v(), V(x, null, [
        c(r("div", $, [
          m(o.$slots, "field"),
          n(f, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: e[4] || (e[4] = y(() => {
            }, ["prevent"]))
          }, {
            default: a(() => [
              n(p, {
                label: l(d)("formPlaceholder")
              }, {
                default: a(() => [
                  n(u, {
                    modelValue: l(t).editComponent.placeholder,
                    "onUpdate:modelValue": e[0] || (e[0] = (i) => l(t).editComponent.placeholder = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(d)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(p, {
                label: l(d)("unit")
              }, {
                default: a(() => [
                  n(u, {
                    modelValue: l(t).editComponent.unit,
                    "onUpdate:modelValue": e[1] || (e[1] = (i) => l(t).editComponent.unit = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(d)("unitPlaceholder"),
                    clearable: "",
                    maxlength: "5",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(p, null, {
                label: a(() => [
                  r("div", M, [
                    r("span", P, C(l(d)("defaultValue")), 1),
                    n(g, {
                      effect: "light",
                      content: l(d)("defaultValueTips"),
                      placement: "top"
                    }, {
                      default: a(() => [
                        D
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: a(() => [
                  n(u, {
                    modelValue: l(t).editComponent.field.default,
                    "onUpdate:modelValue": e[2] || (e[2] = (i) => l(t).editComponent.field.default = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(d)("defaultValuePlaceholder"),
                    onKeyup: e[3] || (e[3] = (i) => l(S)(i)),
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
          m(o.$slots, "other"),
          n(f, {
            "label-width": "100px",
            class: "px-[10px]"
          })
        ], 512), [
          [_, l(t).editTab == "content"]
        ]),
        c(r("div", E, [
          m(o.$slots, "style-field"),
          m(o.$slots, "style")
        ], 512), [
          [_, l(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: N
}, Symbol.toStringTag, { value: "Module" }));
export {
  O as _
};
