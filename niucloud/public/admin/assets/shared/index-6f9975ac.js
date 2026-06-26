import { defineComponent as d, ref as u, openBlock as i, createElementBlock as p, normalizeClass as m, withDirectives as n, createElementVNode as r, vModelText as a } from "vue";
const v = ["placeholder"], f = /* @__PURE__ */ r("span", { class: "el-range-separator" }, "-", -1), g = ["placeholder"], _ = /* @__PURE__ */ d({
  __name: "index",
  props: {
    startPlaceholder: {
      type: String,
      default: ""
    },
    endPlaceholder: {
      type: String,
      default: ""
    },
    modelValue: {
      type: Array,
      default: () => ["", ""]
    }
  },
  setup(s) {
    const o = u(!1), t = s;
    return (V, e) => (i(), p("div", {
      class: m(["el-date-editor el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger", { "is-active": o.value }])
    }, [
      n(r("input", {
        class: "el-range-input",
        "onUpdate:modelValue": e[0] || (e[0] = (l) => t.modelValue[0] = l),
        onBlur: e[1] || (e[1] = (l) => o.value = !1),
        onFocus: e[2] || (e[2] = (l) => o.value = !0),
        placeholder: t.startPlaceholder
      }, null, 40, v), [
        [a, t.modelValue[0]]
      ]),
      f,
      n(r("input", {
        class: "el-range-input",
        "onUpdate:modelValue": e[3] || (e[3] = (l) => t.modelValue[1] = l),
        onBlur: e[4] || (e[4] = (l) => o.value = !1),
        onFocus: e[5] || (e[5] = (l) => o.value = !0),
        placeholder: t.endPlaceholder
      }, null, 40, g), [
        [a, t.modelValue[1]]
      ])
    ], 2));
  }
});
export {
  _ as default
};
