import { defineComponent as A, computed as y, resolveComponent as a, openBlock as e, createElementBlock as r, Fragment as m, createBlock as n, withCtx as d, createElementVNode as f, unref as _, toDisplayString as x, renderList as B, createCommentVNode as k } from "vue";
import { useRouter as I, useRoute as L } from "vue-router";
import { aI as w, s as v } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
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
    const g = I(), C = L(), l = i, t = y(() => l.routes.meta), M = y(() => !l.routes.children || !Array.isArray(l.routes.children) ? !1 : l.routes.children.some((s) => {
      var o;
      return ((o = s.meta) == null ? void 0 : o.show) === 1;
    })), b = (s) => {
      const o = v.get("specialMenuNames"), u = v.get("specialMenuNamesLevel1");
      o.includes(s) || v.remove("activeAppKey"), u.includes(s) && (s = "addon_list");
      const p = C.name === s ? { refresh: Date.now() } : {};
      g.push({ name: s, query: p });
    };
    return (s, o) => {
      const u = a("el-image"), c = a("icon"), p = a("el-sub-menu"), S = a("el-menu-item");
      return t.value.show ? (e(), r(m, { key: 0 }, [
        M.value ? (e(), n(p, {
          key: 0,
          index: String(i.routes.name)
        }, {
          title: d(() => [
            f("div", N, [
              t.value.icon ? (e(), r(m, { key: 0 }, [
                _(w)(t.value.icon) ? (e(), n(u, {
                  key: 0,
                  class: "w-[16px] h-[16px] overflow-hidden",
                  src: t.value.icon,
                  fit: "fill"
                }, null, 8, ["src"])) : (e(), n(c, {
                  key: 1,
                  name: t.value.icon
                }, null, 8, ["name"]))
              ], 64)) : (e(), n(c, {
                key: 1,
                name: "iconfont iconshezhi1"
              }))
            ]),
            f("span", V, x(t.value.title), 1)
          ]),
          default: d(() => [
            (e(!0), r(m, null, B(i.routes.children, (h, j) => (e(), n(D, {
              routes: h,
              key: j,
              level: l.level + 1
            }, null, 8, ["routes", "level"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (e(), n(S, {
          key: 1,
          index: String(i.routes.name),
          onClick: o[0] || (o[0] = (h) => b(i.routes.name))
        }, {
          title: d(() => [
            l.level == 1 ? (e(), r("div", q, [
              t.value.icon ? (e(), r(m, { key: 0 }, [
                _(w)(t.value.icon) ? (e(), n(u, {
                  key: 0,
                  class: "w-[16px] h-[16px] overflow-hidden",
                  src: t.value.icon,
                  fit: "fill"
                }, null, 8, ["src"])) : (e(), n(c, {
                  key: 1,
                  name: t.value.icon
                }, null, 8, ["name"]))
              ], 64)) : (e(), n(c, {
                key: 1,
                name: "iconfont iconshezhi1"
              }))
            ])) : k("", !0),
            f("span", z, x(t.value.title), 1)
          ]),
          _: 1
        }, 8, ["index"]))
      ], 64)) : k("", !0);
    };
  }
});
export {
  D as default
};
