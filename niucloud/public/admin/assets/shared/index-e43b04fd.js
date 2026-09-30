import { defineComponent as u, computed as _, watch as c, resolveComponent as a, openBlock as f, createElementBlock as w, Fragment as x, createVNode as t, withCtx as s, unref as n } from "vue";
import { useRoute as y } from "vue-router";
import d from "./side-994192e0.js";
import { u as h, a as k } from "./core-shared-c6ad4e77.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-b85341b9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const v = /* @__PURE__ */ u({
  __name: "index",
  setup(V) {
    const e = h(), C = _(() => e.dark), m = y();
    return c(m, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, r) => {
      const l = a("el-aside"), i = a("el-drawer");
      return f(), w(x, null, [
        t(l, { class: "layout-aside dark w-auto" }, {
          default: s(() => [
            t(d, { class: "hidden-xs-only slide" })
          ]),
          _: 1
        }),
        t(i, {
          modelValue: n(e).menuDrawer,
          "onUpdate:modelValue": r[0] || (r[0] = (p) => n(e).menuDrawer = p),
          direction: "ltr",
          "with-header": !1,
          "custom-class": "aside-drawer",
          size: "210px"
        }, {
          default: s(() => [
            t(d)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const U = /* @__PURE__ */ k(v, [["__scopeId", "data-v-37104757"]]);
export {
  U as default
};
