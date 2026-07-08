import { defineComponent as y, resolveComponent as i, openBlock as S, createElementBlock as T, Fragment as U, withDirectives as _, createElementVNode as s, createVNode as l, withCtx as a, unref as e, createTextVNode as V, toDisplayString as r, vShow as c, withModifiers as g, renderSlot as P } from "vue";
import { t as n } from "./core-shared-9b1e55e9.js";
import { u as N } from "./diy-f9fec2a3.js";
const E = { class: "content-wrap" }, R = { class: "edit-attr-item-wrap" }, k = { class: "text-sm text-gray-400 mb-[10px] leading-[1.4]" }, M = { class: "edit-attr-item-wrap" }, z = { class: "mb-[10px]" }, D = { class: "edit-attr-item-wrap" }, j = { class: "mb-[10px]" }, F = { class: "style-wrap" }, O = { class: "edit-attr-item-wrap" }, $ = { class: "mb-[10px]" }, q = /* @__PURE__ */ y({
  __name: "edit-form-submit",
  setup(A, { expose: B }) {
    const o = N();
    o.editComponent.ignore = ["componentBgUrl"];
    const w = (p) => {
      p == "hover_screen_bottom" && (o.editComponent.margin.bottom = 0, o.editComponent.margin.both = 0, o.editComponent.margin.top = 0);
    };
    return o.editComponent.verify = (p) => {
      const t = { code: !0, message: "" };
      return o.value[p].submitBtn.text == "" ? (t.code = !1, t.message = n("submitBtnNamePlaceholder"), t) : (o.value[p].resetBtn.text == "" && (t.code = !1, t.message = n("resetBtnNamePlaceholder")), t);
    }, B({}), (p, t) => {
      const f = i("el-radio"), v = i("el-radio-group"), m = i("el-form-item"), u = i("el-form"), x = i("el-input"), b = i("el-color-picker"), h = i("el-switch"), C = i("el-slider");
      return S(), T(U, null, [
        _(s("div", E, [
          s("div", R, [
            l(u, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: a(() => [
                l(m, {
                  label: e(n)("floatBtnButton"),
                  class: "display-block"
                }, {
                  default: a(() => [
                    l(v, {
                      modelValue: e(o).editComponent.btnPosition,
                      "onUpdate:modelValue": t[0] || (t[0] = (d) => e(o).editComponent.btnPosition = d),
                      onChange: w
                    }, {
                      default: a(() => [
                        l(f, { label: "follow_content" }, {
                          default: a(() => [
                            V(r(e(n)("followContent")), 1)
                          ]),
                          _: 1
                        }),
                        l(f, { label: "hover_screen_bottom" }, {
                          default: a(() => [
                            V(r(e(n)("hoverScreenBottom")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    _(s("div", { class: "text-sm text-gray-400 mb-[5px] leading-[1.4]" }, r(e(n)("btnTips")), 513), [
                      [c, e(o).editComponent.btnPosition == "follow_content"]
                    ]),
                    _(s("div", { class: "text-sm text-gray-400 mb-[5px]" }, r(e(n)("btnTipsTwo")), 513), [
                      [c, e(o).editComponent.btnPosition == "hover_screen_bottom"]
                    ]),
                    s("div", k, r(e(n)("btnTipsThree")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          s("div", M, [
            s("h3", z, r(e(n)("submitBtn")), 1),
            l(u, {
              "label-width": "80px",
              class: "px-[10px]",
              onSubmit: t[4] || (t[4] = g(() => {
              }, ["prevent"]))
            }, {
              default: a(() => [
                l(m, {
                  label: e(n)("submitBtnName")
                }, {
                  default: a(() => [
                    l(x, {
                      modelValue: e(o).editComponent.submitBtn.text,
                      "onUpdate:modelValue": t[1] || (t[1] = (d) => e(o).editComponent.submitBtn.text = d),
                      modelModifiers: { trim: !0 },
                      placeholder: e(n)("btnNamePlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(n)("textColor")
                }, {
                  default: a(() => [
                    l(b, {
                      modelValue: e(o).editComponent.submitBtn.color,
                      "onUpdate:modelValue": t[2] || (t[2] = (d) => e(o).editComponent.submitBtn.color = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(n)("subTextBgColor")
                }, {
                  default: a(() => [
                    l(b, {
                      modelValue: e(o).editComponent.submitBtn.bgColor,
                      "onUpdate:modelValue": t[3] || (t[3] = (d) => e(o).editComponent.submitBtn.bgColor = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          s("div", D, [
            s("h3", j, r(e(n)("resetBtn")), 1),
            l(u, {
              "label-width": "80px",
              class: "px-[10px]",
              onSubmit: t[9] || (t[9] = g(() => {
              }, ["prevent"]))
            }, {
              default: a(() => [
                l(m, {
                  label: e(n)("carouselSearchTabControl")
                }, {
                  default: a(() => [
                    l(h, {
                      modelValue: e(o).editComponent.resetBtn.control,
                      "onUpdate:modelValue": t[5] || (t[5] = (d) => e(o).editComponent.resetBtn.control = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(n)("submitBtnName")
                }, {
                  default: a(() => [
                    l(x, {
                      modelValue: e(o).editComponent.resetBtn.text,
                      "onUpdate:modelValue": t[6] || (t[6] = (d) => e(o).editComponent.resetBtn.text = d),
                      modelModifiers: { trim: !0 },
                      placeholder: e(n)("btnNamePlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(n)("textColor")
                }, {
                  default: a(() => [
                    l(b, {
                      modelValue: e(o).editComponent.resetBtn.color,
                      "onUpdate:modelValue": t[7] || (t[7] = (d) => e(o).editComponent.resetBtn.color = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(n)("subTextBgColor")
                }, {
                  default: a(() => [
                    l(b, {
                      modelValue: e(o).editComponent.resetBtn.bgColor,
                      "onUpdate:modelValue": t[8] || (t[8] = (d) => e(o).editComponent.resetBtn.bgColor = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [c, e(o).editTab == "content"]
        ]),
        _(s("div", F, [
          s("div", O, [
            s("h3", $, r(e(n)("btnStyle")), 1),
            l(u, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: a(() => [
                l(m, {
                  label: e(n)("topRounded")
                }, {
                  default: a(() => [
                    l(C, {
                      modelValue: e(o).editComponent.topElementRounded,
                      "onUpdate:modelValue": t[10] || (t[10] = (d) => e(o).editComponent.topElementRounded = d),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(m, {
                  label: e(n)("bottomRounded")
                }, {
                  default: a(() => [
                    l(C, {
                      modelValue: e(o).editComponent.bottomElementRounded,
                      "onUpdate:modelValue": t[11] || (t[11] = (d) => e(o).editComponent.bottomElementRounded = d),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          P(p.$slots, "style")
        ], 512), [
          [c, e(o).editTab == "style"]
        ])
      ], 64);
    };
  }
}), J = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: q
}, Symbol.toStringTag, { value: "Module" }));
export {
  J as _
};
