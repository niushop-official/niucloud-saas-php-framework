import { defineComponent as y, computed as h, resolveComponent as a, openBlock as n, createElementBlock as s, Fragment as i, createBlock as u, withCtx as r, createCommentVNode as l, createElementVNode as m, normalizeClass as d, toDisplayString as p, renderList as w, createTextVNode as k, pushScopeId as D, popScopeId as A } from "vue";
import { _ as g } from "./core-shared-5b3bfa35.js";
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
}, I = /* @__PURE__ */ y({
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
    const o = e, t = h(() => o.routes.meta);
    return (C, j) => {
      const c = a("icon"), x = a("el-sub-menu"), v = a("el-menu-item");
      return t.value.show ? (n(), s(i, { key: 0 }, [
        e.routes.children ? (n(), u(x, {
          key: 0,
          index: String(e.routes.name)
        }, {
          title: r(() => [
            t.value.icon && o.level != 2 ? (n(), s("div", N, [
              t.value.icon && o.level != 2 ? (n(), u(c, {
                key: 0,
                name: t.value.icon,
                color: "#1D1F3A",
                class: "absolute !w-auto"
              }, null, 8, ["name"])) : l("", !0)
            ])) : l("", !0),
            m("span", {
              class: d(["using-hidden", ["ml-[10px]", { "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }]])
            }, p(t.value.title), 3)
          ]),
          default: r(() => [
            (n(!0), s(i, null, w(e.routes.children, (_, f) => (n(), u(S, {
              routes: _,
              level: o.level + 1,
              key: f,
              isNewVersion: o.isNewVersion
            }, null, 8, ["routes", "level", "isNewVersion"]))), 128))
          ]),
          _: 1
        }, 8, ["index"])) : (n(), u(v, {
          key: 1,
          index: String(e.routes.name),
          route: e.routes.path
        }, {
          title: r(() => [
            t.value.icon && o.level != 2 ? (n(), s("div", b, [
              t.value.icon && o.level != 2 ? (n(), u(c, {
                key: 0,
                color: "#1D1F3A",
                name: t.value.icon,
                class: "absolute !w-auto"
              }, null, 8, ["name"])) : l("", !0)
            ])) : l("", !0),
            m("span", {
              class: d(["using-hidden", [{ "text-[15px]": e.routes.meta.class == 1 }, { "text-[14px]": e.routes.meta.class != 1 }, { "ml-[10px]": e.routes.meta.class == 2, "ml-[15px]": e.routes.meta.class == 3 }]])
            }, [
              k(p(t.value.title) + " ", 1),
              t.value.view == "app/upgrade" && o.isNewVersion ? (n(), s("div", V)) : l("", !0)
            ], 2)
          ]),
          _: 1
        }, 8, ["index", "route"]))
      ], 64)) : l("", !0);
    };
  }
});
const S = /* @__PURE__ */ g(I, [["__scopeId", "data-v-1d7fe9c2"]]);
export {
  S as default
};
