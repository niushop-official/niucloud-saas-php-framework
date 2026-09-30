import { defineComponent as w, resolveComponent as s, openBlock as C, createElementBlock as V, Fragment as P, withDirectives as f, createElementVNode as n, renderSlot as d, createVNode as o, withCtx as t, unref as e, createTextVNode as y, toDisplayString as a, vShow as h } from "vue";
import { t as i } from "./core-shared-c6ad4e77.js";
import { u as S } from "./diy-452683aa.js";
const T = { class: "content-wrap" }, $ = { class: "flex items-center" }, k = { class: "mr-[3px]" }, z = /* @__PURE__ */ n("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), B = { class: "text-sm text-gray-400" }, D = { class: "style-wrap" }, N = /* @__PURE__ */ w({
  __name: "edit-form-location",
  setup(O, { expose: v }) {
    const l = S();
    return l.editComponent.ignore = ["componentBgUrl"], l.editComponent.verify = (r) => ({ code: !0, message: "" }), v({}), (r, c) => {
      const _ = s("el-radio"), x = s("el-radio-group"), m = s("el-form-item"), u = s("el-form"), b = s("el-tooltip"), g = s("el-switch");
      return C(), V(P, null, [
        f(n("div", T, [
          d(r.$slots, "field"),
          o(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: t(() => [
              o(m, {
                label: e(i)("access")
              }, {
                default: t(() => [
                  o(x, {
                    modelValue: e(l).editComponent.mode,
                    "onUpdate:modelValue": c[0] || (c[0] = (p) => e(l).editComponent.mode = p)
                  }, {
                    default: t(() => [
                      o(_, {
                        class: "!mr-[20px]",
                        label: "authorized_wechat_location"
                      }, {
                        default: t(() => [
                          y(a(e(i)("authorizeWeChatLocation")), 1)
                        ]),
                        _: 1
                      }),
                      o(_, { label: "open_choose_location" }, {
                        default: t(() => [
                          y(a(e(i)("manuallySelectPositioning")), 1)
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
                  n("div", $, [
                    n("span", k, a(e(i)("privacyProtection")), 1),
                    o(b, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: t(() => [
                        n("p", null, a(e(i)("privacyProtectionTipsOne")), 1),
                        n("p", null, a(e(i)("privacyProtectionTipsTwo")), 1)
                      ]),
                      default: t(() => [
                        z
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: t(() => [
                  o(g, {
                    modelValue: e(l).editComponent.field.privacyProtection,
                    "onUpdate:modelValue": c[1] || (c[1] = (p) => e(l).editComponent.field.privacyProtection = p)
                  }, null, 8, ["modelValue"]),
                  n("div", B, a(e(i)("privacyProtectionTipsFour")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [h, e(l).editTab == "content"]
        ]),
        f(n("div", D, [
          d(r.$slots, "style-field"),
          d(r.$slots, "style")
        ], 512), [
          [h, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
}), F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: N
}, Symbol.toStringTag, { value: "Module" }));
export {
  F as _
};
