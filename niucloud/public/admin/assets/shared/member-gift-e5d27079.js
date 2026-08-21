import { defineComponent as g, ref as u, computed as V, watch as c, openBlock as m, createElementBlock as s, Fragment as _, renderList as k, createBlock as h, resolveDynamicComponent as b, createCommentVNode as j } from "vue";
import { cA as C, b_ as O } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const G = /* @__PURE__ */ g({
  __name: "member-gift",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: i, emit: f }) {
    const a = u({}), v = p, d = f, o = u({}), n = V({
      get() {
        return v.modelValue;
      },
      set(e) {
        d("update:modelValue", e);
      }
    }), l = u([]);
    return c(() => n.value, (e, t) => {
      (!t || !Object.keys(t).length) && Object.keys(e).length && (o.value = n.value);
    }, { immediate: !0 }), c(() => o.value, () => {
      n.value = o.value;
    }, { deep: !0 }), C().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].component && (e[t].component = O(e[t].component));
      }), a.value = e;
    }), i({
      verify: async () => {
        let e = !0;
        for (let t = 0; t < l.value.length; t++)
          !await l.value[t].verify() && (e = !1);
        return e;
      }
    }), (e, t) => (m(!0), s(_, null, k(a.value, (r) => (m(), s("div", null, [
      r.component ? (m(), h(b(r.component), {
        key: 0,
        modelValue: o.value[r.key],
        "onUpdate:modelValue": (y) => o.value[r.key] = y,
        ref_for: !0,
        ref_key: "giftRefs",
        ref: l
      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : j("", !0)
    ]))), 256));
  }
});
export {
  G as default
};
