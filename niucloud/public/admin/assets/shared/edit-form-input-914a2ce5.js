import { defineComponent as g, resolveComponent as s, openBlock as C, createElementBlock as y, Fragment as S, withDirectives as w, createElementVNode as i, renderSlot as p, createVNode as t, withModifiers as T, withCtx as l, unref as e, toDisplayString as m, vShow as v } from "vue";
import { t as d } from "./core-shared-5b3bfa35.js";
import { u as D } from "./diy-9018bebd.js";
const M = { class: "content-wrap" }, P = { class: "flex items-center" }, U = { class: "mr-[3px]" }, $ = { class: "flex items-center" }, B = { class: "mr-[3px]" }, F = { class: "style-wrap" }, O = /* @__PURE__ */ g({
  __name: "edit-form-input",
  setup(j, { expose: V }) {
    const o = D();
    return o.editComponent.ignore = ["componentBgUrl"], o.editComponent.verify = (r) => ({ code: !0, message: "" }), V({}), (r, n) => {
      const c = s("el-input"), u = s("el-form-item"), _ = s("QuestionFilled"), f = s("el-icon"), h = s("el-tooltip"), b = s("el-form"), x = s("el-switch");
      return C(), y(S, null, [
        w(i("div", M, [
          p(r.$slots, "field"),
          t(b, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: n[2] || (n[2] = T(() => {
            }, ["prevent"]))
          }, {
            default: l(() => [
              t(u, {
                label: e(d)("formPlaceholder")
              }, {
                default: l(() => [
                  t(c, {
                    modelValue: e(o).editComponent.placeholder,
                    "onUpdate:modelValue": n[0] || (n[0] = (a) => e(o).editComponent.placeholder = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(d)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(u, null, {
                label: l(() => [
                  i("div", P, [
                    i("span", U, m(e(d)("defaultValue")), 1),
                    t(h, {
                      effect: "light",
                      content: e(d)("defaultValueTips"),
                      placement: "top"
                    }, {
                      default: l(() => [
                        t(f, null, {
                          default: l(() => [
                            t(_, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: l(() => [
                  t(c, {
                    modelValue: e(o).editComponent.field.default,
                    "onUpdate:modelValue": n[1] || (n[1] = (a) => e(o).editComponent.field.default = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(d)("defaultValuePlaceholder"),
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
          p(r.$slots, "other"),
          t(b, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: l(() => [
              t(u, null, {
                label: l(() => [
                  i("div", $, [
                    i("span", B, m(e(d)("preventDuplication")), 1),
                    t(h, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: l(() => [
                        i("p", null, m(e(d)("preventDuplicationTipsOne")), 1),
                        i("p", null, m(e(d)("preventDuplicationTipsTwo")), 1)
                      ]),
                      default: l(() => [
                        t(f, null, {
                          default: l(() => [
                            t(_, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: l(() => [
                  t(x, {
                    modelValue: e(o).editComponent.field.unique,
                    "onUpdate:modelValue": n[3] || (n[3] = (a) => e(o).editComponent.field.unique = a)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [v, e(o).editTab == "content"]
        ]),
        w(i("div", F, [
          p(r.$slots, "style-field"),
          p(r.$slots, "style")
        ], 512), [
          [v, e(o).editTab == "style"]
        ])
      ], 64);
    };
  }
}), N = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: O
}, Symbol.toStringTag, { value: "Module" }));
export {
  N as _
};
