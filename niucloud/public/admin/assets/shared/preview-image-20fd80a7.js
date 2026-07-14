import { defineComponent as p, computed as n, openBlock as t, createElementBlock as l, normalizeStyle as _, unref as s } from "vue";
import { i as c } from "./core-shared-11c0a673.js";
const m = ["src"], f = ["src"], d = /* @__PURE__ */ p({
  __name: "preview-image",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(a, { expose: u }) {
    const o = a, r = n(() => o.value), i = n(() => {
      let e = "";
      return e += `width: ${o.value.width}px;`, e;
    });
    return u({}), (e, v) => (t(), l("div", {
      class: "pointer-events-none max-w-[720px]",
      style: _(i.value)
    }, [
      r.value.value ? (t(), l("img", {
        key: 0,
        src: s(c)(r.value.value),
        class: "w-full h-full"
      }, null, 8, m)) : (t(), l("img", {
        key: 1,
        src: s(c)("static/resource/images/diy/crack_figure.png"),
        class: "w-full h-full"
      }, null, 8, f))
    ], 4));
  }
}), h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  h as _
};
