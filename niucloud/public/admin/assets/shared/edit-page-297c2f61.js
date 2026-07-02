import { defineComponent as C, resolveComponent as s, openBlock as w, createElementBlock as U, createElementVNode as m, toDisplayString as p, unref as e, createVNode as o, withCtx as r, createTextVNode as _, withDirectives as u, vShow as b } from "vue";
import { t } from "./core-shared-ae4a556b.js";
import { u as T } from "./poster-0e6af6c1.js";
const h = { class: "content-wrap" }, S = { class: "edit-attr-item-wrap" }, k = { class: "mb-[10px]" }, N = { class: "text-sm text-gray-400 mt-[10px]" }, P = { class: "text-sm text-gray-400" }, j = /* @__PURE__ */ C({
  __name: "edit-page",
  setup(B, { expose: c }) {
    const l = T();
    return c({}), (D, a) => {
      const g = s("el-input"), d = s("el-form-item"), i = s("el-radio"), f = s("el-radio-group"), V = s("upload-image"), x = s("el-color-picker"), v = s("el-switch"), y = s("el-form");
      return w(), U("div", h, [
        m("div", S, [
          m("h3", k, p(e(t)("pageContent")), 1),
          o(y, {
            "label-width": "80px",
            class: "px-[10px]"
          }, {
            default: r(() => [
              o(d, {
                label: e(t)("posterName")
              }, {
                default: r(() => [
                  o(g, {
                    modelValue: e(l).name,
                    "onUpdate:modelValue": a[0] || (a[0] = (n) => e(l).name = n),
                    modelModifiers: { trim: !0 },
                    placeholder: e(t)("posterNamePlaceholder"),
                    clearable: "",
                    maxlength: "12",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              o(d, {
                label: e(t)("bgType")
              }, {
                default: r(() => [
                  o(f, {
                    modelValue: e(l).global.bgType,
                    "onUpdate:modelValue": a[1] || (a[1] = (n) => e(l).global.bgType = n)
                  }, {
                    default: r(() => [
                      o(i, { label: "url" }, {
                        default: r(() => [
                          _(p(e(t)("bgUrl")), 1)
                        ]),
                        _: 1
                      }),
                      o(i, { label: "color" }, {
                        default: r(() => [
                          _(p(e(t)("bgColor")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              u(o(d, {
                label: e(t)("bgUrl")
              }, {
                default: r(() => [
                  o(V, {
                    modelValue: e(l).global.bgUrl,
                    "onUpdate:modelValue": a[2] || (a[2] = (n) => e(l).global.bgUrl = n),
                    limit: 1
                  }, null, 8, ["modelValue"]),
                  m("div", N, p(e(t)("bgUrlTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]), [
                [b, e(l).global.bgType == "url"]
              ]),
              u(o(d, {
                label: e(t)("bgColor")
              }, {
                default: r(() => [
                  o(x, {
                    modelValue: e(l).editComponent.bgColor,
                    "onUpdate:modelValue": a[3] || (a[3] = (n) => e(l).editComponent.bgColor = n),
                    predefine: e(l).predefineColors
                  }, null, 8, ["modelValue", "predefine"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [b, e(l).global.bgType == "color"]
              ]),
              o(d, {
                label: e(t)("statusLabel"),
                class: "display-block"
              }, {
                default: r(() => [
                  o(v, {
                    modelValue: e(l).status,
                    "onUpdate:modelValue": a[4] || (a[4] = (n) => e(l).status = n),
                    "active-value": 1,
                    "inactive-value": 0
                  }, null, 8, ["modelValue"]),
                  m("div", P, p(e(t)("statusTips")), 1)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
}), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as _
};
