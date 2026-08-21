import { defineComponent as u, computed as l, openBlock as f, createElementBlock as s, normalizeStyle as p, toDisplayString as c } from "vue";
import { u as v } from "./poster-2f43adce.js";
const d = /* @__PURE__ */ u({
  __name: "preview-friendspay-message",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(n, { expose: i }) {
    const h = v(), e = n, a = l(() => e.value), r = l(() => {
      let t = "";
      t += `font-size: ${e.value.fontSize}px;color: ${e.value.fontColor};line-height: ${e.value.lineHeight + e.value.fontSize}px;`, (e.value.x == "left" || e.value.x == "center" || e.value.x == "right") && (t += `text-align: ${e.value.x};`), e.value.weight && (t += "font-weight: bold;"), (!e.value.fontFamily || e.value.fontFamily == "static/font/PingFang-Medium.ttf") && (t += "font-family: poster_default_font;");
      const o = document.getElementById(e.value.id);
      return o ? t += `width:${o.offsetWidth}px;height:${o.offsetHeight}px;` : t += `width:${e.value.width}px;height:${e.value.height}px;`, t;
    });
    return i({}), (t, o) => (f(), s("div", {
      class: "overflow-hidden",
      style: p(r.value)
    }, c(a.value.value), 5));
  }
}), _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  _
};
