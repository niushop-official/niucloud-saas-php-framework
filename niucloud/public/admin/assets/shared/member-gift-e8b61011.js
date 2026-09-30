import { defineComponent as y, ref as u, computed as g, watch as c, openBlock as m, createElementBlock as p, Fragment as V, renderList as k, createBlock as _, resolveDynamicComponent as h, createCommentVNode as b } from "vue";
import { cN as j, c5 as C } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const A = /* @__PURE__ */ y({
  __name: "member-gift",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(i, { expose: s, emit: f }) {
    const v = i, a = u({}), o = u({}), n = g({
      get() {
        return v.modelValue;
      },
      set(e) {
        f("update:modelValue", e);
      }
    }), l = u([]);
    return c(() => n.value, (e, t) => {
      (!t || !Object.keys(t).length) && Object.keys(e).length && (o.value = n.value);
    }, { immediate: !0 }), c(() => o.value, () => {
      n.value = o.value;
    }, { deep: !0 }), j().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].component && (e[t].component = C(e[t].component));
      }), a.value = e;
    }), s({
      verify: async () => {
        let e = !0;
        for (let t = 0; t < l.value.length; t++)
          !await l.value[t].verify() && (e = !1);
        return e;
      }
    }), (e, t) => (m(!0), p(V, null, k(a.value, (r) => (m(), p("div", null, [
      r.component ? (m(), _(h(r.component), {
        key: 0,
        modelValue: o.value[r.key],
        "onUpdate:modelValue": (d) => o.value[r.key] = d,
        ref_for: !0,
        ref_key: "giftRefs",
        ref: l
      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0)
    ]))), 256));
  }
});
export {
  A as default
};
