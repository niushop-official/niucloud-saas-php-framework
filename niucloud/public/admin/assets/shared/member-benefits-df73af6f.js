import { defineComponent as b, ref as u, computed as V, watch as s, openBlock as m, createElementBlock as c, Fragment as _, renderList as k, createBlock as h, resolveDynamicComponent as g, createCommentVNode as j } from "vue";
import { d7 as B, b_ as C } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const L = /* @__PURE__ */ b({
  __name: "member-benefits",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: i, emit: f }) {
    const a = u({}), v = p, d = f, o = u({}), r = V({
      get() {
        return v.modelValue;
      },
      set(e) {
        d("update:modelValue", e);
      }
    }), l = u([]);
    return s(() => r.value, (e, t) => {
      (!t || !Object.keys(t).length) && Object.keys(e).length && (o.value = r.value);
    }, { immediate: !0 }), s(() => o.value, () => {
      r.value = o.value;
    }, { deep: !0 }), B().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].component && (e[t].component = C(e[t].component));
      }), a.value = e;
    }), i({
      verify: async () => {
        let e = !0;
        for (let t = 0; t < l.value.length; t++)
          !await l.value[t].verify() && (e = !1);
        return e;
      }
    }), (e, t) => (m(!0), c(_, null, k(a.value, (n) => (m(), c("div", null, [
      n.component ? (m(), h(g(n.component), {
        key: 0,
        modelValue: o.value[n.key],
        "onUpdate:modelValue": (y) => o.value[n.key] = y,
        ref_for: !0,
        ref_key: "benefitsRefs",
        ref: l
      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : j("", !0)
    ]))), 256));
  }
});
export {
  L as default
};
