import { defineComponent as l, ref as d, openBlock as i, createElementBlock as c, createElementVNode as e, toDisplayString as n, renderSlot as _, createCommentVNode as s, pushScopeId as p, popScopeId as u, createStaticVNode as f } from "vue";
import { a as v } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const h = (t) => (p("data-v-f591358d"), t = t(), u(), t), m = {
  key: 0,
  class: "tip-notice"
}, k = /* @__PURE__ */ f('<span class="tip-notice__icon" data-v-f591358d><svg class="tip-notice__glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-v-f591358d><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" data-v-f591358d></circle><path d="M12 11v5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-v-f591358d></path><circle cx="12" cy="7.6" r="1.1" fill="currentColor" data-v-f591358d></circle></svg></span>', 1), y = { class: "tip-notice__body" }, x = { class: "tip-notice__title" }, g = { class: "tip-notice__text" }, C = /* @__PURE__ */ h(() => /* @__PURE__ */ e("svg", {
  class: "tip-notice__close-glyph",
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ e("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    "stroke-width": "1.8",
    "stroke-linecap": "round"
  })
], -1)), w = [
  C
], S = /* @__PURE__ */ l({
  __name: "index",
  props: {
    title: { default: "温馨提示" },
    closable: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = d(!0), r = () => {
      o.value = !1;
    };
    return (a, B) => o.value ? (i(), c("div", m, [
      k,
      e("div", y, [
        e("div", x, n(t.title), 1),
        e("div", g, [
          _(a.$slots, "default", {}, void 0, !0)
        ])
      ]),
      t.closable ? (i(), c("span", {
        key: 0,
        class: "tip-notice__close",
        title: "关闭",
        onClick: r
      }, w)) : s("", !0)
    ])) : s("", !0);
  }
});
const T = /* @__PURE__ */ v(S, [["__scopeId", "data-v-f591358d"]]);
export {
  T as default
};
