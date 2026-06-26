import { defineComponent as y, ref as s, reactive as f, watch as v, resolveComponent as _, openBlock as n, createBlock as r, normalizeStyle as i, normalizeClass as p, withCtx as d, resolveDynamicComponent as S, createElementBlock as k } from "vue";
const C = /* @__PURE__ */ y({
  __name: "index",
  props: {
    name: {
      type: String,
      required: !0
    },
    color: {
      type: String,
      default: "var(--color)"
    },
    class: {
      type: [String, Object],
      default: ""
    },
    size: {
      type: String,
      default: "16px"
    }
  },
  setup(m) {
    const e = m, t = s(""), l = s(""), a = f({
      color: e.color,
      fontSize: e.size
    }), c = () => {
      const o = e.name.split(" ");
      t.value = o[0], l.value = o[1];
    };
    return c(), v(() => e.name, () => {
      c();
    }), (o, x) => {
      const u = _("el-icon");
      return t.value == "element" ? (n(), r(u, {
        key: 0,
        style: i(a),
        class: p(["icon el-icon", e.class])
      }, {
        default: d(() => [
          (n(), r(S(l.value)))
        ]),
        _: 1
      }, 8, ["style", "class"])) : (n(), k("i", {
        key: 1,
        class: p([t.value, l.value, e.class]),
        style: i(a)
      }, null, 6));
    };
  }
});
export {
  C as default
};
