import { defineComponent as w, resolveComponent as d, openBlock as b, createElementBlock as g, Fragment as T, withDirectives as h, createElementVNode as t, renderSlot as c, createVNode as n, withModifiers as C, withCtx as o, unref as e, toDisplayString as p, vShow as v } from "vue";
import { t as s } from "./core-shared-c6ad4e77.js";
import { u as V } from "./diy-452683aa.js";
const P = { class: "content-wrap" }, S = { class: "flex items-center" }, D = { class: "mr-[3px]" }, O = /* @__PURE__ */ t("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), U = { class: "flex items-center" }, $ = { class: "mr-[3px]" }, k = /* @__PURE__ */ t("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), B = { class: "text-sm text-gray-400" }, M = { class: "style-wrap" }, j = /* @__PURE__ */ w({
  __name: "edit-form-identity",
  setup(q, { expose: x }) {
    const l = V();
    return l.editComponent.ignore = ["componentBgUrl"], l.editComponent.verify = (r) => ({ code: !0, message: "" }), x({}), (r, i) => {
      const y = d("el-input"), m = d("el-form-item"), u = d("el-form"), _ = d("el-tooltip"), f = d("el-switch");
      return b(), g(T, null, [
        h(t("div", P, [
          c(r.$slots, "field"),
          n(u, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: i[1] || (i[1] = C(() => {
            }, ["prevent"]))
          }, {
            default: o(() => [
              n(m, {
                label: e(s)("formPlaceholder")
              }, {
                default: o(() => [
                  n(y, {
                    modelValue: e(l).editComponent.placeholder,
                    "onUpdate:modelValue": i[0] || (i[0] = (a) => e(l).editComponent.placeholder = a),
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
          c(r.$slots, "other"),
          n(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              n(m, null, {
                label: o(() => [
                  t("div", S, [
                    t("span", D, p(e(s)("preventDuplication")), 1),
                    n(_, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: o(() => [
                        t("p", null, p(e(s)("preventDuplicationTipsOne")), 1),
                        t("p", null, p(e(s)("preventDuplicationTipsTwo")), 1)
                      ]),
                      default: o(() => [
                        O
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: o(() => [
                  n(f, {
                    modelValue: e(l).editComponent.field.unique,
                    "onUpdate:modelValue": i[2] || (i[2] = (a) => e(l).editComponent.field.unique = a)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n(m, { class: "display-block" }, {
                label: o(() => [
                  t("div", U, [
                    t("span", $, p(e(s)("privacyProtection")), 1),
                    n(_, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: o(() => [
                        t("p", null, p(e(s)("privacyProtectionTipsOne")), 1),
                        t("p", null, p(e(s)("privacyProtectionTipsTwo")), 1)
                      ]),
                      default: o(() => [
                        k
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: o(() => [
                  n(f, {
                    modelValue: e(l).editComponent.field.privacyProtection,
                    "onUpdate:modelValue": i[3] || (i[3] = (a) => e(l).editComponent.field.privacyProtection = a)
                  }, null, 8, ["modelValue"]),
                  t("div", B, p(e(s)("privacyProtectionTipsThree")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [v, e(l).editTab == "content"]
        ]),
        h(t("div", M, [
          c(r.$slots, "style-field"),
          c(r.$slots, "style")
        ], 512), [
          [v, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
}), F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" }));
export {
  F as _
};
