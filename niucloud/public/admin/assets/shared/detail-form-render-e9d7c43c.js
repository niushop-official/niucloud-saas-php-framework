import { defineComponent as o, openBlock as r, createElementBlock as _, toDisplayString as a, pushScopeId as m, popScopeId as u } from "vue";
import { a as n } from "./core-shared-c6ad4e77.js";
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
    return (s, l) => (r(), _("div", d, a(t.data.render_value), 1));
  }
});
const p = /* @__PURE__ */ n(c, [["__scopeId", "data-v-2b402684"]]), b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as _
};
