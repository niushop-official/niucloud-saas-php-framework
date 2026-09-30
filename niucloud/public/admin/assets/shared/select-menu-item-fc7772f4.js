import { defineComponent as d, computed as v, resolveComponent as m, openBlock as l, createElementBlock as u, Fragment as o, createVNode as f, withCtx as k, createElementVNode as y, unref as h, renderList as b, createBlock as C, createCommentVNode as r } from "vue";
const L = ["innerHTML"], x = /* @__PURE__ */ d({
  __name: "select-menu-item",
  props: {
    menu: Object,
    level: {
      type: Number,
      default: 0
    }
  },
  setup(c) {
    const e = c, a = v(() => {
      let t = "";
      for (let n = 0; n < e.level; n++)
        t += n == 0 ? "&emsp;|--" : "--";
      return t;
    });
    return (t, n) => {
      const _ = m("el-option"), p = m("select-menu-item", !0);
      return e.menu.menu_type != 2 ? (l(), u(o, { key: 0 }, [
        f(_, {
          label: `${e.menu.menu_name}`,
          value: e.menu.menu_key
        }, {
          default: k(() => [
            y("span", {
              innerHTML: `${h(a)}${e.menu.menu_name}`
            }, null, 8, L)
          ]),
          _: 1
        }, 8, ["label", "value"]),
        e.menu.children ? (l(!0), u(o, { key: 0 }, b(e.menu.children, (s, i) => (l(), C(p, {
          menu: s,
          level: e.level + 1,
          key: i
        }, null, 8, ["menu", "level"]))), 128)) : r("", !0)
      ], 64)) : r("", !0);
    };
  }
});
export {
  x as default
};
