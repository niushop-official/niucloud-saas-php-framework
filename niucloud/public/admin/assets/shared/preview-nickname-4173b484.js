import { defineComponent as r, computed as l, openBlock as u, createElementBlock as f, normalizeStyle as s } from "vue";
import { u as c } from "./poster-c3597310.js";
const p = /* @__PURE__ */ r({
  __name: "preview-nickname",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  setup(n, { expose: i }) {
    const v = c(), e = n, d = l(() => e.value), a = l(() => {
      let t = "";
      t += `font-size: ${e.value.fontSize}px;color: ${e.value.fontColor};line-height: ${e.value.lineHeight + e.value.fontSize}px;`, (e.value.x == "left" || e.value.x == "center" || e.value.x == "right") && (t += `text-align: ${e.value.x};`), e.value.weight && (t += "font-weight: bold;"), (!e.value.fontFamily || e.value.fontFamily == "static/font/PingFang-Medium.ttf") && (t += "font-family: poster_default_font;");
      const o = document.getElementById(e.value.id);
      return o ? t += `width:${o.offsetWidth}px;height:${o.offsetHeight}px;` : t += `width:${e.value.width}px;height:${e.value.height}px;`, t;
    });
    return i({}), (t, o) => (u(), f("div", {
      class: "overflow-hidden",
      style: s(a.value)
    }, "会员昵称", 4));
  }
}), _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  _
};
