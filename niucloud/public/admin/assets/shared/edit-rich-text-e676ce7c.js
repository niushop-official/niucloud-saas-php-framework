import { defineComponent as m, resolveComponent as p, openBlock as _, createElementBlock as u, Fragment as h, withDirectives as s, createElementVNode as n, toDisplayString as f, unref as o, createVNode as v, vShow as i, renderSlot as g } from "vue";
import { t as l } from "./core-shared-5b3bfa35.js";
import { u as y } from "./diy-9018bebd.js";
const b = { class: "content-wrap" }, S = { class: "edit-attr-item-wrap" }, C = { class: "mb-[10px]" }, w = { class: "style-wrap" }, x = /* @__PURE__ */ m({
  __name: "edit-rich-text",
  setup(T, { expose: d }) {
    const e = y();
    return e.editComponent.ignore = [], e.editComponent.verify = (r) => {
      const t = { code: !0, message: "" };
      return e.value[r].html == "<p><br></p>" && (t.code = !1, t.message = l("richTextPlaceholder")), t;
    }, d({}), (r, t) => {
      const a = p("editor");
      return _(), u(h, null, [
        s(n("div", b, [
          n("div", S, [
            n("h3", C, f(o(l)("richTextContentSet")), 1),
            v(a, {
              modelValue: o(e).editComponent.html,
              "onUpdate:modelValue": t[0] || (t[0] = (c) => o(e).editComponent.html = c),
              height: 600,
              class: "editor-width"
            }, null, 8, ["modelValue"])
          ])
        ], 512), [
          [i, o(e).editTab == "content"]
        ]),
        s(n("div", w, [
          g(r.$slots, "style")
        ], 512), [
          [i, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x
}, Symbol.toStringTag, { value: "Module" }));
export {
  k as _
};
