import { defineComponent as o, openBlock as _, createElementBlock as r, toDisplayString as n, pushScopeId as m, popScopeId as u } from "vue";
import { _ as a } from "./core-shared-e1759ce4.js";
const d = { class: "form-render" }, c = /* @__PURE__ */ o({
  __name: "detail-form-render",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e;
    return (s, l) => (_(), r("div", d, n(t.data.render_value), 1));
  }
});
const p = /* @__PURE__ */ a(c, [["__scopeId", "data-v-2b402684"]]), b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as _
};
