import { defineComponent as V, resolveComponent as n, openBlock as P, createElementBlock as S, Fragment as T, withDirectives as f, createElementVNode as i, renderSlot as d, createVNode as o, withCtx as t, unref as e, createTextVNode as y, toDisplayString as a, vShow as h } from "vue";
import { t as s } from "./core-shared-e1759ce4.js";
import { u as F } from "./diy-0e4556df.js";
const $ = { class: "content-wrap" }, k = { class: "flex items-center" }, z = { class: "mr-[3px]" }, B = { class: "text-sm text-gray-400" }, D = { class: "style-wrap" }, N = /* @__PURE__ */ V({
  __name: "edit-form-location",
  setup(O, { expose: v }) {
    const l = F();
    return l.editComponent.ignore = ["componentBgUrl"], l.editComponent.verify = (r) => ({ code: !0, message: "" }), v({}), (r, c) => {
      const _ = n("el-radio"), b = n("el-radio-group"), m = n("el-form-item"), u = n("el-form"), g = n("QuestionFilled"), x = n("el-icon"), w = n("el-tooltip"), C = n("el-switch");
      return P(), S(T, null, [
        f(i("div", $, [
          d(r.$slots, "field"),
          o(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: t(() => [
              o(m, {
                label: e(s)("access")
              }, {
                default: t(() => [
                  o(b, {
                    modelValue: e(l).editComponent.mode,
                    "onUpdate:modelValue": c[0] || (c[0] = (p) => e(l).editComponent.mode = p)
                  }, {
                    default: t(() => [
                      o(_, {
                        class: "!mr-[20px]",
                        label: "authorized_wechat_location"
                      }, {
                        default: t(() => [
                          y(a(e(s)("authorizeWeChatLocation")), 1)
                        ]),
                        _: 1
                      }),
                      o(_, { label: "open_choose_location" }, {
                        default: t(() => [
                          y(a(e(s)("manuallySelectPositioning")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          d(r.$slots, "other"),
          o(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: t(() => [
              o(m, { class: "display-block" }, {
                label: t(() => [
                  i("div", k, [
                    i("span", z, a(e(s)("privacyProtection")), 1),
                    o(w, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: t(() => [
                        i("p", null, a(e(s)("privacyProtectionTipsOne")), 1),
                        i("p", null, a(e(s)("privacyProtectionTipsTwo")), 1)
                      ]),
                      default: t(() => [
                        o(x, null, {
                          default: t(() => [
                            o(g, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: t(() => [
                  o(C, {
                    modelValue: e(l).editComponent.field.privacyProtection,
                    "onUpdate:modelValue": c[1] || (c[1] = (p) => e(l).editComponent.field.privacyProtection = p)
                  }, null, 8, ["modelValue"]),
                  i("div", B, a(e(s)("privacyProtectionTipsFour")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [h, e(l).editTab == "content"]
        ]),
        f(i("div", D, [
          d(r.$slots, "style-field"),
          d(r.$slots, "style")
        ], 512), [
          [h, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
}), Q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: N
}, Symbol.toStringTag, { value: "Module" }));
export {
  Q as _
};
