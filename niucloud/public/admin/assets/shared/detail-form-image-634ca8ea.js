import { defineComponent as m, computed as _, resolveComponent as u, openBlock as t, createElementBlock as n, Fragment as d, renderList as p, createBlock as f, unref as g, normalizeClass as v } from "vue";
import { i as r } from "./core-shared-9b1e55e9.js";
const h = /* @__PURE__ */ m({
  __name: "detail-form-image",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(o) {
    const e = o, i = _(() => e.data.handle_field_value.map((l) => r(l)));
    return (l, x) => {
      const c = u("el-image");
      return t(), n("div", null, [
        (t(!0), n(d, null, p(e.data.handle_field_value, (s, a) => (t(), f(c, {
          src: g(r)(s),
          class: v(["w-[70px] h-[70px]", { "mr-[5px]": a + 1 < e.data.handle_field_value.length }]),
          fit: "contain",
          "preview-src-list": i.value,
          "zoom-rate": 1.2,
          "max-scale": 7,
          "min-scale": 0.2,
          "initial-index": a,
          "hide-on-click-modal": !0
        }, null, 8, ["src", "class", "preview-src-list", "initial-index"]))), 256))
      ]);
    };
  }
}), j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  j as _
};
