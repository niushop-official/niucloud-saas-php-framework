import { defineComponent as C, watch as w, resolveComponent as a, openBlock as k, createElementBlock as V, Fragment as S, withDirectives as b, createElementVNode as n, renderSlot as _, createVNode as o, withCtx as t, unref as e, createTextVNode as p, toDisplayString as d, vShow as y } from "vue";
import { t as s } from "./core-shared-c6ad4e77.js";
import { u as F } from "./diy-452683aa.js";
const P = { class: "content-wrap" }, T = { class: "flex items-center" }, $ = { class: "mr-[3px]" }, B = /* @__PURE__ */ n("p", null, "会自动将提交的个人信息做加密展示。", -1), D = /* @__PURE__ */ n("p", null, "适用于公开展示收集的数据且不暴露用户隐私。", -1), N = /* @__PURE__ */ n("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), U = { class: "text-sm text-gray-400" }, j = { class: "style-wrap" }, E = /* @__PURE__ */ C({
  __name: "edit-form-address",
  setup(O, { expose: v }) {
    const l = F();
    return l.editComponent.ignore = ["componentBgUrl"], l.editComponent.verify = (i) => ({ code: !0, message: "" }), w(
      () => l.editComponent.addressFormat,
      (i) => {
        i !== "province/city/district/address" && (l.editComponent.field.privacyProtection = !1);
      },
      { immediate: !0 }
    ), v({}), (i, r) => {
      const c = a("el-radio"), h = a("el-radio-group"), f = a("el-form-item"), u = a("el-form"), x = a("el-tooltip"), g = a("el-switch");
      return k(), V(S, null, [
        b(n("div", P, [
          _(i.$slots, "field"),
          o(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: t(() => [
              o(f, {
                label: e(s)("地址格式")
              }, {
                default: t(() => [
                  o(h, {
                    modelValue: e(l).editComponent.addressFormat,
                    "onUpdate:modelValue": r[0] || (r[0] = (m) => e(l).editComponent.addressFormat = m),
                    class: "!block"
                  }, {
                    default: t(() => [
                      o(c, {
                        class: "!block",
                        label: "province/city/district/address"
                      }, {
                        default: t(() => [
                          p(d(e(s)("省/市/区/街道/详细地址")), 1)
                        ]),
                        _: 1
                      }),
                      o(c, {
                        class: "!block",
                        label: "province/city/district/street"
                      }, {
                        default: t(() => [
                          p(d(e(s)("省/市/区/街道(镇)")), 1)
                        ]),
                        _: 1
                      }),
                      o(c, {
                        class: "!block",
                        label: "province/city/district"
                      }, {
                        default: t(() => [
                          p(d(e(s)("省/市/区(县)")), 1)
                        ]),
                        _: 1
                      }),
                      o(c, {
                        class: "!block",
                        label: "province/city"
                      }, {
                        default: t(() => [
                          p(d(e(s)("省/市")), 1)
                        ]),
                        _: 1
                      }),
                      o(c, {
                        class: "!block",
                        label: "province"
                      }, {
                        default: t(() => [
                          p(d(e(s)("省")), 1)
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
          _(i.$slots, "other"),
          o(u, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: t(() => [
              o(f, { class: "display-block" }, {
                label: t(() => [
                  n("div", T, [
                    n("span", $, d(e(s)("隐私保护")), 1),
                    o(x, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: t(() => [
                        B,
                        D
                      ]),
                      default: t(() => [
                        N
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: t(() => [
                  o(g, {
                    modelValue: e(l).editComponent.field.privacyProtection,
                    "onUpdate:modelValue": r[1] || (r[1] = (m) => e(l).editComponent.field.privacyProtection = m),
                    disabled: e(l).editComponent.addressFormat != "province/city/district/address"
                  }, null, 8, ["modelValue", "disabled"]),
                  n("div", U, d(e(s)("提交后自动隐藏地址，仅管理员可查看")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [y, e(l).editTab == "content"]
        ]),
        b(n("div", j, [
          _(i.$slots, "style-field"),
          _(i.$slots, "style")
        ], 512), [
          [y, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
}), A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as _
};
