import { defineComponent as f, computed as l, openBlock as p, createElementBlock as s, normalizeStyle as c, unref as n, toDisplayString as v } from "vue";
import { u as d } from "./poster-22fc17db.js";
const h = /* @__PURE__ */ f({
  __name: "preview-text",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(i, { expose: a }) {
    const e = i, m = d(), r = l(() => e.value), u = l(() => {
      let t = "";
      t += `font-size: ${e.value.fontSize}px;color: ${e.value.fontColor};line-height: ${e.value.lineHeight + e.value.fontSize}px;`, (e.value.x == "left" || e.value.x == "center" || e.value.x == "right") && (t += `text-align: ${e.value.x};`), e.value.weight && (t += "font-weight: bold;"), (!e.value.fontFamily || e.value.fontFamily == "static/font/PingFang-Medium.ttf") && (t += "font-family: poster_default_font;");
      let o = document.getElementById(e.value.id);
      return o ? t += `width:${o.offsetWidth}px;height:${o.offsetHeight}px;` : t += `width:${e.value.width}px;height:${e.value.height}px;`, t;
    });
    return a({}), (t, o) => (p(), s("div", {
      class: "overflow-hidden",
      style: c(n(u))
    }, v(n(r).value), 5));
  }
}), x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  x as _
};
