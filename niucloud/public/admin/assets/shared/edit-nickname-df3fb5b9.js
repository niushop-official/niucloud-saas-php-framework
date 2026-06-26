import { defineComponent as r, openBlock as n, createElementBlock as s, createElementVNode as e, toDisplayString as i, unref as _, renderSlot as c } from "vue";
import { t as a } from "./core-shared-ca1fcae5.js";
import { u as m } from "./poster-ba7254e7.js";
const p = { class: "content-wrap" }, l = { class: "edit-attr-item-wrap" }, d = { class: "mb-[10px] text-sm text-primary" }, u = /* @__PURE__ */ r({
  __name: "edit-nickname",
  setup(f, { expose: t }) {
    return m(), t({}), (o, b) => (n(), s("div", p, [
      e("div", l, [
        e("div", d, i(_(a)("needLoginTips")), 1)
      ]),
      c(o.$slots, "common")
    ]));
  }
}), S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  S as _
};
