import { defineComponent as g, ref as l, computed as k, watch as c, openBlock as s, createElementBlock as m, Fragment as V, renderList as h, createBlock as b, resolveDynamicComponent as x, createCommentVNode as D } from "vue";
import { cA as j, b_ as C, _ as O } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = /* @__PURE__ */ g({
  __name: "sign-day",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: i, emit: d }) {
    const u = l({}), f = p, _ = d, o = l({}), r = k({
      get() {
        return f.modelValue;
      },
      set(e) {
        _("update:modelValue", e);
      }
    }), a = l([]);
    return c(() => r.value, (e, t) => {
      (!t || !Object.keys(t).length) && Object.keys(e).length && (o.value = r.value);
    }, { immediate: !0 }), c(() => o.value, () => {
      r.value = o.value;
    }, { deep: !0 }), j().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].component && (e[t].component = C(e[t].component));
      }), u.value = e;
    }), i({
      verify: async () => {
        let e = !0;
        for (let t = 0; t < a.value.length; t++)
          !await a.value[t].verify() && (e = !1);
        return e;
      }
    }), (e, t) => (s(!0), m(V, null, h(u.value, (n, v) => (s(), m("div", {
      key: v,
      class: "day-sign"
    }, [
      n.component ? (s(), b(x(n.component), {
        key: 0,
        modelValue: o.value[n.key],
        "onUpdate:modelValue": (y) => o.value[n.key] = y,
        ref_for: !0,
        ref_key: "giftRefs",
        ref: a
      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : D("", !0)
    ]))), 128));
  }
});
const N = /* @__PURE__ */ O(B, [["__scopeId", "data-v-7da2d549"]]);
export {
  N as default
};
