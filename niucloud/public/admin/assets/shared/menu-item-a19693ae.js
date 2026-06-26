import { defineComponent as y, computed as h, resolveComponent as r, openBlock as n, createElementBlock as o, Fragment as c, createBlock as u, withCtx as a, createCommentVNode as s, createElementVNode as m, normalizeClass as d, toDisplayString as x, renderList as w, createTextVNode as k } from "vue";
import { _ as g } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const N = {
  key: 0,
  class: "w-[13px] h-[13px] mr-[10rpx] relative flex justify-center items-center"
}, b = {
  key: 0,
  class: "w-[13px] h-[13px] mr-[10rpx] relative flex justify-center items-center"
}, V = {
  key: 0,
  class: "w-[7px] h-[7px] bg-[#DA203E] absolute flex items-center justify-center rounded-full top-[10px] right-[65px]"
}, C = /* @__PURE__ */ y({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    },
    level: {
      type: Number,
      default: 1
    },
    isNewVersion: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const l = e, t = h(() => l.routes.meta);
    return (B, D) => {
      const i = r("icon"), p = r("el-sub-menu"), v = r("el-menu-item");
      return t.value.show ? (n(), o(c, { key: 0 }, [
        e.routes.children ? (n(), u(p, {
          key: 0,
          index: String(e.routes.name)
        }, {
          title: a(() => [
            t.value.icon && l.level != 2 ? (n(), o("div", N, [
              t.value.icon && l.level != 2 ? (n(), u(i, {
                key: 0,
                name: t.value.icon,
                color: "#1D1F3A",
                class: "absolute !w-auto"
              }, null, 8, ["name"])) : s("", !0)
            ])) : s("", !0),
            m("span", {
              class: d(["using-hidden", ["ml-[10px]", { "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }]])
            }, x(t.value.title), 3)
          ]),
          default: a(() => [
            (n(!0), o(c, null, w(e.routes.children, (_, f) => (n(), u(j, {
              routes: _,
              level: l.level + 1,
              key: f,
              isNewVersion: l.isNewVersion
            }, null, 8, ["routes", "level", "isNewVersion"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (n(), u(v, {
          key: 1,
          index: String(e.routes.name),
          route: e.routes.path
        }, {
          title: a(() => [
            t.value.icon && l.level != 2 ? (n(), o("div", b, [
              t.value.icon && l.level != 2 ? (n(), u(i, {
                key: 0,
                color: "#1D1F3A",
                name: t.value.icon,
                class: "absolute !w-auto"
              }, null, 8, ["name"])) : s("", !0)
            ])) : s("", !0),
            m("span", {
              class: d(["using-hidden", [{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }]])
            }, [
              k(x(t.value.title) + " ", 1),
              t.value.view == "app/upgrade" && l.isNewVersion ? (n(), o("div", V)) : s("", !0)
            ], 2)
          ]),
          _: 1
        }, 8, ["index", "route"]))
      ], 64)) : s("", !0);
    };
  }
});
const j = /* @__PURE__ */ g(C, [["__scopeId", "data-v-1d7fe9c2"]]);
export {
  j as default
};
