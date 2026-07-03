import { defineComponent as k, watch as V, resolveComponent as s, openBlock as F, createElementBlock as S, Fragment as P, withDirectives as b, createElementVNode as r, renderSlot as _, createVNode as t, withCtx as o, unref as e, createTextVNode as p, toDisplayString as d, vShow as y } from "vue";
import { t as n } from "./core-shared-c8d7774e.js";
import { u as T } from "./diy-268d832e.js";
const $ = { class: "content-wrap" }, B = { class: "flex items-center" }, D = { class: "mr-[3px]" }, N = /* @__PURE__ */ r("p", null, "会自动将提交的个人信息做加密展示。", -1), U = /* @__PURE__ */ r("p", null, "适用于公开展示收集的数据且不暴露用户隐私。", -1), j = { class: "text-sm text-gray-400" }, E = { class: "style-wrap" }, O = /* @__PURE__ */ k({
  __name: "edit-form-address",
  setup(Q, { expose: v }) {
    const l = T();
    return l.editComponent.ignore = ["componentBgUrl"], l.editComponent.verify = (i) => ({ code: !0, message: "" }), V(
      () => l.editComponent.addressFormat,
      (i) => {
        i !== "province/city/district/address" && (l.editComponent.field.privacyProtection = !1);
      },
      { immediate: !0 }
    ), v({}), (i, a) => {
      const c = s("el-radio"), h = s("el-radio-group"), u = s("el-form-item"), f = s("el-form"), g = s("QuestionFilled"), x = s("el-icon"), C = s("el-tooltip"), w = s("el-switch");
      return F(), S(P, null, [
        b(r("div", $, [
          _(i.$slots, "field"),
          t(f, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              t(u, {
                label: e(n)("地址格式")
              }, {
                default: o(() => [
                  t(h, {
                    modelValue: e(l).editComponent.addressFormat,
                    "onUpdate:modelValue": a[0] || (a[0] = (m) => e(l).editComponent.addressFormat = m),
                    class: "!block"
                  }, {
                    default: o(() => [
                      t(c, {
                        class: "!block",
                        label: "province/city/district/address"
                      }, {
                        default: o(() => [
                          p(d(e(n)("省/市/区/街道/详细地址")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, {
                        class: "!block",
                        label: "province/city/district/street"
                      }, {
                        default: o(() => [
                          p(d(e(n)("省/市/区/街道(镇)")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, {
                        class: "!block",
                        label: "province/city/district"
                      }, {
                        default: o(() => [
                          p(d(e(n)("省/市/区(县)")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, {
                        class: "!block",
                        label: "province/city"
                      }, {
                        default: o(() => [
                          p(d(e(n)("省/市")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, {
                        class: "!block",
                        label: "province"
                      }, {
                        default: o(() => [
                          p(d(e(n)("省")), 1)
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
          t(f, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              t(u, { class: "display-block" }, {
                label: o(() => [
                  r("div", B, [
                    r("span", D, d(e(n)("隐私保护")), 1),
                    t(C, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: o(() => [
                        N,
                        U
                      ]),
                      default: o(() => [
                        t(x, null, {
                          default: o(() => [
                            t(g, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: o(() => [
                  t(w, {
                    modelValue: e(l).editComponent.field.privacyProtection,
                    "onUpdate:modelValue": a[1] || (a[1] = (m) => e(l).editComponent.field.privacyProtection = m),
                    disabled: e(l).editComponent.addressFormat != "province/city/district/address"
                  }, null, 8, ["modelValue", "disabled"]),
                  r("div", j, d(e(n)("提交后自动隐藏地址，仅管理员可查看")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 512), [
          [y, e(l).editTab == "content"]
        ]),
        b(r("div", E, [
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
  default: O
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as _
};
