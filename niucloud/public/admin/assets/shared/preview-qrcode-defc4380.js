import { defineComponent as c, computed as o, openBlock as s, createElementBlock as a, normalizeStyle as p, createElementVNode as i, unref as u } from "vue";
import { i as _ } from "./core-shared-9b1e55e9.js";
const m = ["src"], d = /* @__PURE__ */ c({
  __name: "preview-qrcode",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(r, { expose: n }) {
    const t = r, f = o(() => t.value), l = o(() => {
      let e = "";
      return e += `width: ${t.value.width}px;`, e;
    });
    return n({}), (e, v) => (s(), a("div", {
      class: "pointer-events-none max-w-[720px]",
      style: p(l.value)
    }, [
      i("img", {
        src: u(_)("static/resource/images/diy/qrcode.png"),
        class: "w-full h-full"
      }, null, 8, m)
    ], 4));
  }
}), x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  x as _
};
