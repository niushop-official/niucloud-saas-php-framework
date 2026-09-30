import { defineComponent as u, computed as _, watch as f, resolveComponent as a, openBlock as w, createElementBlock as x, Fragment as h, createVNode as t, normalizeClass as y, unref as o, withCtx as n } from "vue";
import { useRoute as k } from "vue-router";
import { u as v, a as C } from "./core-shared-c6ad4e77.js";
import m from "./side-feb73409.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-cdb23d02.js";
import "./lodash-8c6c2daa.js";
const V = /* @__PURE__ */ u({
  __name: "index",
  setup(g) {
    const d = k(), e = v(), l = _(() => e.dark);
    return f(d, () => {
      e.$patch((r) => {
        r.menuDrawer = !1;
      });
    }), (r, s) => {
      const i = a("el-aside"), c = a("el-drawer");
      return w(), x(h, null, [
        t(i, {
          class: y(["layout-aside w-auto h-screen", { bright: !o(l) }])
        }, {
          default: n(() => [
            t(m, { class: "hidden-xs-only" })
          ]),
          _: 1
        }, 8, ["class"]),
        t(c, {
          modelValue: o(e).menuDrawer,
          "onUpdate:modelValue": s[0] || (s[0] = (p) => o(e).menuDrawer = p),
          direction: "ltr",
          "with-header": !1,
          "custom-class": "aside-drawer",
          size: "210px"
        }, {
          default: n(() => [
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
