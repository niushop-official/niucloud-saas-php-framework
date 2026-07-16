import { defineComponent as g, resolveComponent as r, openBlock as C, createElementBlock as h, Fragment as y, withDirectives as _, createElementVNode as o, toDisplayString as p, unref as e, createVNode as l, withCtx as i, vShow as c, renderSlot as v } from "vue";
import { t as s } from "./core-shared-e1759ce4.js";
import { u as w } from "./diy-0e4556df.js";
const S = { class: "content-wrap" }, V = { class: "edit-attr-item-wrap" }, U = { class: "mb-[10px]" }, k = { class: "style-wrap" }, B = { class: "edit-attr-item-wrap" }, D = { class: "mb-[10px]" }, T = /* @__PURE__ */ g({
  __name: "edit-member-info",
  setup(j, { expose: u }) {
    const t = w();
    return t.editComponent.ignore = ["componentBgUrl"], u({}), (b, n) => {
      const f = r("upload-image"), a = r("el-form-item"), d = r("el-form"), x = r("el-color-picker");
      return C(), h(y, null, [
        _(o("div", S, [
          o("div", V, [
            o("h3", U, p(e(s)("memberStyle")), 1),
            l(d, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                l(a, {
                  label: e(s)("bgUrl")
                }, {
                  default: i(() => [
                    l(f, {
                      modelValue: e(t).editComponent.bgUrl,
                      "onUpdate:modelValue": n[0] || (n[0] = (m) => e(t).editComponent.bgUrl = m),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [c, e(t).editTab == "content"]
        ]),
        _(o("div", k, [
          o("div", B, [
            o("h3", D, p(e(s)("memberStyle")), 1),
            l(d, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                l(a, {
                  label: e(s)("textColor")
                }, {
                  default: i(() => [
                    l(x, {
                      modelValue: e(t).editComponent.textColor,
                      "onUpdate:modelValue": n[1] || (n[1] = (m) => e(t).editComponent.textColor = m)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          v(b.$slots, "style")
        ], 512), [
          [c, e(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: T
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as _
};
