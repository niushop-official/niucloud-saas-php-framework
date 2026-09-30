import { defineComponent as _, computed as d, resolveComponent as p, openBlock as t, createElementBlock as n, Fragment as u, renderList as f, createBlock as g, unref as r, normalizeClass as v } from "vue";
import { j as o } from "./core-shared-c6ad4e77.js";
const h = /* @__PURE__ */ _({
  __name: "detail-form-image",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(i) {
    const e = i, c = d(() => e.data.handle_field_value.map((a) => o(a)));
    return (a, x) => {
      const s = p("el-image");
      return t(), n("div", null, [
        (t(!0), n(u, null, f(e.data.handle_field_value, (m, l) => (t(), g(s, {
          src: r(o)(m),
          class: v(["w-[70px] h-[70px]", { "mr-[5px]": l + 1 < e.data.handle_field_value.length }]),
          fit: "contain",
          "preview-src-list": r(c),
          "zoom-rate": 1.2,
          "max-scale": 7,
          "min-scale": 0.2,
          "initial-index": l,
          "hide-on-click-modal": !0
        }, null, 8, ["src", "class", "preview-src-list", "zoom-rate", "min-scale", "initial-index"]))), 256))
      ]);
    };
  }
}), k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  k as _
};
