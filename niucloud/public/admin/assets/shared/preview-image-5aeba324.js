import { defineComponent as _, computed as c, openBlock as l, createElementBlock as o, normalizeStyle as p, unref as e } from "vue";
import { j as s } from "./core-shared-c6ad4e77.js";
const m = ["src"], f = ["src"], d = /* @__PURE__ */ _({
  __name: "preview-image",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(a, { expose: u }) {
    const r = a, n = c(() => r.value), i = c(() => {
      let t = "";
      return t += `width: ${r.value.width}px;`, t;
    });
    return u({}), (t, g) => (l(), o("div", {
      class: "pointer-events-none max-w-[720px]",
      style: p(e(i))
    }, [
      e(n).value ? (l(), o("img", {
        key: 0,
        src: e(s)(e(n).value),
        class: "w-full h-full"
      }, null, 8, m)) : (l(), o("img", {
        key: 1,
        src: e(s)("static/resource/images/diy/crack_figure.png"),
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
