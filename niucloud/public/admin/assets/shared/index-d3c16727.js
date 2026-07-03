import { defineComponent as _, computed as u, watch as f, resolveComponent as s, openBlock as w, createElementBlock as x, Fragment as h, createVNode as t, normalizeClass as y, withCtx as a, unref as n } from "vue";
import { useRoute as v } from "vue-router";
import { cm as k, _ as C } from "./core-shared-c8d7774e.js";
import m from "./side-a6f6370e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-b967487d.js";
import "./lodash-8c6c2daa.js";
const V = /* @__PURE__ */ _({
  __name: "index",
  setup(g) {
    const l = v(), e = k(), d = u(() => e.dark);
    return f(l, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, r) => {
      const i = s("el-aside"), c = s("el-drawer");
      return w(), x(h, null, [
        t(i, {
          class: y(["layout-aside w-auto h-screen", { bright: !d.value }])
        }, {
          default: a(() => [
            t(m, { class: "hidden-xs-only" })
          ]),
          _: 1
        }, 8, ["class"]),
        t(c, {
          modelValue: n(e).menuDrawer,
          "onUpdate:modelValue": r[0] || (r[0] = (p) => n(e).menuDrawer = p),
          direction: "ltr",
          "with-header": !1,
          "custom-class": "aside-drawer",
          size: "210px"
        }, {
          default: a(() => [
            t(m)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const $ = /* @__PURE__ */ C(V, [["__scopeId", "data-v-652fdfc6"]]);
export {
  $ as default
};
