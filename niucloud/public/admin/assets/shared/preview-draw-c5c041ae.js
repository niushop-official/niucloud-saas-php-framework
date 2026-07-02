import { defineComponent as c, computed as l, openBlock as u, createElementBlock as i, normalizeStyle as p } from "vue";
const d = /* @__PURE__ */ c({
  __name: "preview-draw",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(n, { expose: r }) {
    const e = n, s = l(() => e.value), a = l(() => {
      let t = "";
      t += `background-color: ${e.value.bgColor};`, t += `width: ${e.value.width}px;height: ${e.value.height}px;`;
      const o = document.getElementById(e.value.id);
      return o && (t += `width:${o.offsetWidth}px;height:${o.offsetHeight}px;`), t;
    });
    return r({}), (t, o) => (u(), i("div", {
      class: "overflow-hidden",
      style: p(a.value)
    }, null, 4));
  }
}), f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as _
};
