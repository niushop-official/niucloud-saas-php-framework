import { defineComponent as g, resolveComponent as r, openBlock as C, createElementBlock as T, Fragment as V, withDirectives as y, createElementVNode as l, renderSlot as c, createVNode as t, withModifiers as P, withCtx as o, unref as e, toDisplayString as p, vShow as b } from "vue";
import { t as s } from "./core-shared-ae4a556b.js";
import { u as S } from "./diy-30711e15.js";
const D = { class: "content-wrap" }, F = { class: "flex items-center" }, O = { class: "mr-[3px]" }, U = { class: "flex items-center" }, $ = { class: "mr-[3px]" }, k = { class: "text-sm text-gray-400" }, B = { class: "style-wrap" }, M = /* @__PURE__ */ g({
  __name: "edit-form-mobile",
  setup(j, { expose: w }) {
    const n = S();
    return n.editComponent.ignore = ["componentBgUrl"], n.editComponent.verify = (d) => ({ code: !0, message: "" }), w({}), (d, i) => {
      const x = r("el-input"), m = r("el-form-item"), u = r("el-form"), _ = r("QuestionFilled"), f = r("el-icon"), v = r("el-tooltip"), h = r("el-switch");
      return C(), T(V, null, [
        y(l("div", D, [
          c(d.$slots, "field"),
          t(u, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: i[1] || (i[1] = P(() => {
            }, ["prevent"]))
          }, {
            default: o(() => [
              t(m, {
                label: e(s)("formPlaceholder")
              }, {
                default: o(() => [
                  t(x, {
                    modelValue: e(n).editComponent.placeholder,
                    "onUpdate:modelValue": i[0] || (i[0] = (a) => e(n).editComponent.placeholder = a),
                    modelModifiers: { trim: !0 },
                    placeholder: e(s)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          c(d.$slots, "other"),
          t(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              t(m, null, {
                label: o(() => [
                  l("div", F, [
                    l("span", O, p(e(s)("preventDuplication")), 1),
                    t(v, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: o(() => [
                        l("p", null, p(e(s)("preventDuplicationTipsOne")), 1),
                        l("p", null, p(e(s)("preventDuplicationTipsTwo")), 1)
                      ]),
                      default: o(() => [
                        t(f, null, {
                          default: o(() => [
                            t(_, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: o(() => [
                  t(h, {
                    modelValue: e(n).editComponent.field.unique,
                    "onUpdate:modelValue": i[2] || (i[2] = (a) => e(n).editComponent.field.unique = a)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(m, { class: "display-block" }, {
                label: o(() => [
                  l("div", U, [
                    l("span", $, p(e(s)("privacyProtection")), 1),
                    t(v, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: o(() => [
                        l("p", null, p(e(s)("privacyProtectionTipsOne")), 1),
                        l("p", null, p(e(s)("privacyProtectionTipsTwo")), 1)
                      ]),
                      default: o(() => [
                        t(f, null, {
                          default: o(() => [
                            t(_, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: o(() => [
                  t(h, {
                    modelValue: e(n).editComponent.field.privacyProtection,
                    "onUpdate:modelValue": i[3] || (i[3] = (a) => e(n).editComponent.field.privacyProtection = a)
                  }, null, 8, ["modelValue"]),
                  l("div", k, p(e(s)("privacyProtectionTipsFive")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [b, e(n).editTab == "content"]
        ]),
        y(l("div", B, [
          c(d.$slots, "style-field"),
          c(d.$slots, "style")
        ], 512), [
          [b, e(n).editTab == "style"]
        ])
      ], 64);
    };
  }
}), Q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M
}, Symbol.toStringTag, { value: "Module" }));
export {
  Q as _
};
