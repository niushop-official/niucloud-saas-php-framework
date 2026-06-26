import { defineComponent as A, computed as y, resolveComponent as a, openBlock as e, createElementBlock as r, Fragment as m, createBlock as t, withCtx as p, createElementVNode as f, unref as _, toDisplayString as x, renderList as B, createCommentVNode as k } from "vue";
import { useRouter as I, useRoute as L } from "vue-router";
import { aI as w, s as v } from "./core-shared-ca1fcae5.js";
const N = { class: "w-[25px] h-full flex items-center justify-center" }, V = { class: "text-[14px]" }, q = {
  key: 0,
  class: "w-[25px] h-full flex items-center justify-center"
}, z = { class: "text-[14px]" }, D = /* @__PURE__ */ A({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    },
    level: {
      type: Number,
      default: 1
    }
  },
  setup(i) {
    const g = I(), C = L(), o = i, n = y(() => o.routes.meta), M = y(() => !o.routes.children || !Array.isArray(o.routes.children) ? !1 : o.routes.children.some((s) => {
      var l;
      return ((l = s.meta) == null ? void 0 : l.show) === 1;
    })), b = (s) => {
      const l = v.get("specialMenuNames"), u = v.get("specialMenuNamesLevel1");
      l.includes(s) || v.remove("activeAppKey"), u.includes(s) && (s = "addon_list");
      const d = C.name === s ? { refresh: Date.now() } : {};
      g.push({ name: s, query: d });
    };
    return (s, l) => {
      const u = a("el-image"), c = a("icon"), d = a("el-sub-menu"), S = a("el-menu-item");
      return n.value.show ? (e(), r(m, { key: 0 }, [
        M.value ? (e(), t(d, {
          key: 0,
          index: String(i.routes.name)
        }, {
          title: p(() => [
            f("div", N, [
              n.value.icon ? (e(), r(m, { key: 0 }, [
                _(w)(n.value.icon) ? (e(), t(u, {
                  key: 0,
                  class: "w-[16px] h-[16px] overflow-hidden",
                  src: n.value.icon,
                  fit: "fill"
                }, null, 8, ["src"])) : (e(), t(c, {
                  key: 1,
                  name: n.value.icon
                }, null, 8, ["name"]))
              ], 64)) : (e(), t(c, {
                key: 1,
                name: "iconfont iconshezhi1"
              }))
            ]),
            f("span", V, x(n.value.title), 1)
          ]),
          default: p(() => [
            (e(!0), r(m, null, B(i.routes.children, (h, j) => (e(), t(D, {
              routes: h,
              key: j,
              level: o.level + 1
            }, null, 8, ["routes", "level"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (e(), t(S, {
          key: 1,
          index: String(i.routes.name),
          onClick: l[0] || (l[0] = (h) => b(i.routes.name))
        }, {
          title: p(() => [
            o.level == 1 ? (e(), r("div", q, [
              n.value.icon ? (e(), r(m, { key: 0 }, [
                _(w)(n.value.icon) ? (e(), t(u, {
                  key: 0,
                  class: "w-[16px] h-[16px] overflow-hidden",
                  src: n.value.icon,
                  fit: "fill"
                }, null, 8, ["src"])) : (e(), t(c, {
                  key: 1,
                  name: n.value.icon
                }, null, 8, ["name"]))
              ], 64)) : (e(), t(c, {
                key: 1,
                name: "iconfont iconshezhi1"
              }))
            ])) : k("", !0),
            f("span", z, x(n.value.title), 1)
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : k("", !0);
    };
  }
});
export {
  D as _
};
