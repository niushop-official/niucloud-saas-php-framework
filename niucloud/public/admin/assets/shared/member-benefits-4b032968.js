import { defineComponent as y, ref as u, computed as b, watch as c, openBlock as m, createElementBlock as s, Fragment as k, renderList as V, createBlock as _, resolveDynamicComponent as h, createCommentVNode as g } from "vue";
import { dk as j, c5 as B } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const F = /* @__PURE__ */ y({
  __name: "member-benefits",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: i, emit: f }) {
    const v = p, a = u({}), o = u({}), r = b({
      get() {
        return v.modelValue;
      },
      set(e) {
        f("update:modelValue", e);
      }
    }), l = u([]);
    return c(() => r.value, (e, t) => {
      (!t || !Object.keys(t).length) && Object.keys(e).length && (o.value = r.value);
    }, { immediate: !0 }), c(() => o.value, () => {
      r.value = o.value;
    }, { deep: !0 }), j().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].component && (e[t].component = B(e[t].component));
      }), a.value = e;
    }), i({
      verify: async () => {
        let e = !0;
        for (let t = 0; t < l.value.length; t++)
          !await l.value[t].verify() && (e = !1);
        return e;
      }
    }), (e, t) => (m(!0), s(k, null, V(a.value, (n) => (m(), s("div", null, [
      n.component ? (m(), _(h(n.component), {
        key: 0,
        modelValue: o.value[n.key],
        "onUpdate:modelValue": (d) => o.value[n.key] = d,
        ref_for: !0,
        ref_key: "benefitsRefs",
        ref: l
      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : g("", !0)
    ]))), 256));
  }
});
export {
  F as default
};
