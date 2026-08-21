import { defineComponent as r, computed as l, openBlock as f, createElementBlock as p, normalizeStyle as s, toDisplayString as v } from "vue";
import { u as c } from "./poster-2f43adce.js";
const d = /* @__PURE__ */ r({
  __name: "preview-text",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(i, { expose: n }) {
    const h = c(), e = i, a = l(() => e.value), u = l(() => {
      let t = "";
      t += `font-size: ${e.value.fontSize}px;color: ${e.value.fontColor};line-height: ${e.value.lineHeight + e.value.fontSize}px;`, (e.value.x == "left" || e.value.x == "center" || e.value.x == "right") && (t += `text-align: ${e.value.x};`), e.value.weight && (t += "font-weight: bold;"), (!e.value.fontFamily || e.value.fontFamily == "static/font/PingFang-Medium.ttf") && (t += "font-family: poster_default_font;");
      let o = document.getElementById(e.value.id);
      return o ? t += `width:${o.offsetWidth}px;height:${o.offsetHeight}px;` : t += `width:${e.value.width}px;height:${e.value.height}px;`, t;
    });
    return n({}), (t, o) => (f(), p("div", {
      class: "overflow-hidden",
      style: s(u.value)
    }, v(a.value.value), 5));
  }
}), g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as _
};
