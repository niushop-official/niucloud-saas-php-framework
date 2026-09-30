import { defineComponent as y, ref as l, computed as g, watch as s, openBlock as u, createElementBlock as m, Fragment as k, renderList as V, createBlock as h, resolveDynamicComponent as D, createCommentVNode as b } from "vue";
import { cN as j, c5 as x, a as C } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const O = /* @__PURE__ */ y({
  __name: "sign-day",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: i, emit: d }) {
    const f = p, c = l({}), o = l({}), r = g({
      get() {
        return f.modelValue;
      },
      set(e) {
        d("update:modelValue", e);
      }
    }), a = l([]);
    return s(() => r.value, (e, t) => {
      (!t || !Object.keys(t).length) && Object.keys(e).length && (o.value = r.value);
    }, { immediate: !0 }), s(() => o.value, () => {
      r.value = o.value;
    }, { deep: !0 }), j().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].component && (e[t].component = x(e[t].component));
      }), c.value = e;
    }), i({
      verify: async () => {
        let e = !0;
        for (let t = 0; t < a.value.length; t++)
          !await a.value[t].verify() && (e = !1);
        return e;
      }
    }), (e, t) => (u(!0), m(k, null, V(c.value, (n, v) => (u(), m("div", {
      key: v,
      class: "day-sign"
    }, [
      n.component ? (u(), h(D(n.component), {
        key: 0,
        modelValue: o.value[n.key],
        "onUpdate:modelValue": (_) => o.value[n.key] = _,
        ref_for: !0,
        ref_key: "giftRefs",
        ref: a
      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0)
    ]))), 128));
  }
});
const I = /* @__PURE__ */ C(O, [["__scopeId", "data-v-7da2d549"]]);
export {
  I as default
};
