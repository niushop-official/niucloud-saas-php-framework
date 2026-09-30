import { defineComponent as s, computed as o, openBlock as a, createElementBlock as p, normalizeStyle as i, unref as r, createElementVNode as u } from "vue";
import { j as _ } from "./core-shared-c6ad4e77.js";
const m = ["src"], d = /* @__PURE__ */ s({
  __name: "preview-qrcode",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(n, { expose: l }) {
    const t = n, f = o(() => t.value), c = o(() => {
      let e = "";
      return e += `width: ${t.value.width}px;`, e;
    });
    return l({}), (e, v) => (a(), p("div", {
      class: "pointer-events-none max-w-[720px]",
      style: i(r(c))
    }, [
      u("img", {
        src: r(_)("static/resource/images/diy/qrcode.png"),
        class: "w-full h-full"
      }, null, 8, m)
    ], 4));
  }
}), b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as _
};
