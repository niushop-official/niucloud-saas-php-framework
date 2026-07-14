import { defineComponent as r, openBlock as n, createElementBlock as s, createElementVNode as e, toDisplayString as i, unref as _, renderSlot as c } from "vue";
import { t as a } from "./core-shared-11c0a673.js";
import { u as m } from "./poster-534eaa75.js";
const p = { class: "content-wrap" }, l = { class: "edit-attr-item-wrap" }, d = { class: "mb-[10px] text-sm text-primary" }, u = /* @__PURE__ */ r({
  __name: "edit-nickname",
  setup(f, { expose: t }) {
    const S = m();
    return t({}), (o, b) => (n(), s("div", p, [
      e("div", l, [
        e("div", d, i(_(a)("needLoginTips")), 1)
      ]),
      c(o.$slots, "common")
    ]));
  }
}), h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  h as _
};
