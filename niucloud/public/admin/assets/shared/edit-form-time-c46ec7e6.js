import { defineComponent as k, onMounted as H, watch as M, resolveComponent as m, openBlock as p, createElementBlock as T, Fragment as x, withDirectives as c, createElementVNode as _, renderSlot as u, createVNode as n, withModifiers as U, withCtx as r, unref as o, createBlock as C, createTextVNode as g, toDisplayString as y, createCommentVNode as S, vShow as h } from "vue";
import { t as s } from "./core-shared-5b3bfa35.js";
import { u as B } from "./diy-9018bebd.js";
const N = { class: "content-wrap" }, P = { class: "style-wrap" }, W = /* @__PURE__ */ k({
  __name: "edit-form-time",
  setup(j, { expose: V }) {
    const e = B();
    e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (l) => ({ code: !0, message: "" }), H(() => {
      if (!e.editComponent.field.default) {
        const l = new Date(), t = String(l.getHours()).padStart(2, "0"), a = String(l.getMinutes()).padStart(2, "0");
        e.editComponent.field.default = `${t}:${a}`;
      }
    });
    const w = (l) => {
      if (l) {
        const t = new Date(), a = String(t.getHours()).padStart(2, "0"), d = String(t.getMinutes()).padStart(2, "0");
        e.editComponent.field.default = `${a}:${d}`;
      }
    };
    return M(
      () => e.editComponent.timeWay,
      (l) => {
        const t = new Date(), a = String(t.getHours()).padStart(2, "0"), d = String(t.getMinutes()).padStart(2, "0");
        e.editComponent.field.default = `${a}:${d}`;
      }
    ), V({}), (l, t) => {
      const a = m("el-input"), d = m("el-form-item"), b = m("el-switch"), f = m("el-radio"), v = m("el-radio-group"), $ = m("el-time-picker"), D = m("el-form");
      return p(), T(x, null, [
        c(_("div", N, [
          u(l.$slots, "field"),
          n(D, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: t[4] || (t[4] = U(() => {
            }, ["prevent"]))
          }, {
            default: r(() => [
              n(d, {
                label: o(s)("formPlaceholder")
              }, {
                default: r(() => [
                  n(a, {
                    modelValue: o(e).editComponent.placeholder,
                    "onUpdate:modelValue": t[0] || (t[0] = (i) => o(e).editComponent.placeholder = i),
                    modelModifiers: { trim: !0 },
                    placeholder: o(s)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(d, {
                label: o(s)("defaultValue")
              }, {
                default: r(() => [
                  n(b, {
                    modelValue: o(e).editComponent.defaultControl,
                    "onUpdate:modelValue": t[1] || (t[1] = (i) => o(e).editComponent.defaultControl = i),
                    onChange: w
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              o(e).editComponent.defaultControl ? (p(), C(d, { key: 0 }, {
                default: r(() => [
                  n(v, {
                    modelValue: o(e).editComponent.timeWay,
                    "onUpdate:modelValue": t[2] || (t[2] = (i) => o(e).editComponent.timeWay = i)
                  }, {
                    default: r(() => [
                      n(f, { label: "current" }, {
                        default: r(() => [
                          g(y(o(s)("currentTime")), 1)
                        ]),
                        _: 1
                      }),
                      n(f, { label: "diy" }, {
                        default: r(() => [
                          g(y(o(s)("diyTime")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              })) : S("", !0),
              o(e).editComponent.defaultControl && o(e).editComponent.timeWay == "diy" ? (p(), C(d, { key: 1 }, {
                default: r(() => [
                  n($, {
                    modelValue: o(e).editComponent.field.default,
                    "onUpdate:modelValue": t[3] || (t[3] = (i) => o(e).editComponent.field.default = i),
                    placeholder: o(s)("timePlaceholder"),
                    format: "HH:mm",
                    "value-format": "HH:mm"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              })) : S("", !0)
            ]),
            _: 1
          }),
          u(l.$slots, "other")
        ], 512), [
          [h, o(e).editTab == "content"]
        ]),
        c(_("div", P, [
          u(l.$slots, "style-field"),
          u(l.$slots, "style")
        ], 512), [
          [h, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: W
}, Symbol.toStringTag, { value: "Module" }));
export {
  F as _
};
