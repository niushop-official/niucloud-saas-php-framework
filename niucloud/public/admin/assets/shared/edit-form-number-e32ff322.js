import { defineComponent as V, resolveComponent as a, openBlock as y, createElementBlock as C, Fragment as x, withDirectives as c, createElementVNode as s, renderSlot as m, createVNode as o, withModifiers as S, withCtx as r, unref as l, toDisplayString as T, vShow as _ } from "vue";
import { t as d, bB as $ } from "./core-shared-5b3bfa35.js";
import { u as M } from "./diy-9018bebd.js";
const P = { class: "content-wrap" }, B = { class: "flex items-center" }, D = { class: "mr-[3px]" }, E = { class: "style-wrap" }, N = /* @__PURE__ */ V({
  __name: "edit-form-number",
  setup(U, { expose: h }) {
    const t = M();
    t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (n) => {
      const e = { code: !0, message: "" };
      return t.value[n].field.default && (isNaN(t.value[n].field.default) || !b.digit.test(t.value[n].field.default) ? (e.code = !1, e.message = d("defaultErrorTips")) : t.value[n].field.default < 0 && (e.code = !1, e.message = d("defaultMustZeroTips"))), e;
    };
    const b = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    };
    return h({}), (n, e) => {
      const u = a("el-input"), p = a("el-form-item"), g = a("QuestionFilled"), v = a("el-icon"), w = a("el-tooltip"), f = a("el-form");
      return y(), C(x, null, [
        c(s("div", P, [
          m(n.$slots, "field"),
          o(f, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: e[4] || (e[4] = S(() => {
            }, ["prevent"]))
          }, {
            default: r(() => [
              o(p, {
                label: l(d)("formPlaceholder")
              }, {
                default: r(() => [
                  o(u, {
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
              o(p, {
                label: l(d)("unit")
              }, {
                default: r(() => [
                  o(u, {
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
              o(p, null, {
                label: r(() => [
                  s("div", B, [
                    s("span", D, T(l(d)("defaultValue")), 1),
                    o(w, {
                      effect: "light",
                      content: l(d)("defaultValueTips"),
                      placement: "top"
                    }, {
                      default: r(() => [
                        o(v, null, {
                          default: r(() => [
                            o(g, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: r(() => [
                  o(u, {
                    modelValue: l(t).editComponent.field.default,
                    "onUpdate:modelValue": e[2] || (e[2] = (i) => l(t).editComponent.field.default = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(d)("defaultValuePlaceholder"),
                    onKeyup: e[3] || (e[3] = (i) => l($)(i)),
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
          m(n.$slots, "other"),
          o(f, {
            "label-width": "100px",
            class: "px-[10px]"
          })
        ], 512), [
          [_, l(t).editTab == "content"]
        ]),
        c(s("div", E, [
          m(n.$slots, "style-field"),
          m(n.$slots, "style")
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
