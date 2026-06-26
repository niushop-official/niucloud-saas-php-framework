import { defineComponent as o, openBlock as r, createElementBlock as _, toDisplayString as n } from "vue";
import { _ as a } from "./core-shared-ca1fcae5.js";
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
    return (l, p) => (r(), _("div", d, n(t.data.render_value), 1));
  }
});
const s = /* @__PURE__ */ a(c, [["__scopeId", "data-v-2b402684"]]), u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as _
};
