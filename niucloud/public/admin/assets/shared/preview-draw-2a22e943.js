import { defineComponent as a, computed as l, openBlock as u, createElementBlock as i, normalizeStyle as d, unref as p } from "vue";
const s = /* @__PURE__ */ a({
  __name: "preview-draw",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(n, { expose: r }) {
    const e = n, _ = l(() => e.value), c = l(() => {
      let t = "";
      t += `background-color: ${e.value.bgColor};`, t += `width: ${e.value.width}px;height: ${e.value.height}px;`;
      const o = document.getElementById(e.value.id);
      return o && (t += `width:${o.offsetWidth}px;height:${o.offsetHeight}px;`), t;
    });
    return r({}), (t, o) => (u(), i("div", {
      class: "overflow-hidden",
      style: d(p(c))
    }, null, 4));
  }
}), h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  h as _
};
