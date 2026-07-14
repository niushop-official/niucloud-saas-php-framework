import { defineComponent as p, computed as _, watch as u, resolveComponent as s, openBlock as f, createElementBlock as w, Fragment as x, createVNode as t, withCtx as a, unref as n } from "vue";
import { useRoute as y } from "vue-router";
import d from "./side-6f0d1b43.js";
import { cm as h, _ as b } from "./core-shared-11c0a673.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-39ce0aab.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const k = /* @__PURE__ */ p({
  __name: "index",
  setup(v) {
    const e = h(), V = _(() => e.dark), m = y();
    return u(m, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, r) => {
      const l = s("el-aside"), i = s("el-drawer");
      return f(), w(x, null, [
        t(l, { class: "layout-aside w-auto" }, {
          default: a(() => [
            t(d, { class: "hidden-xs-only slide" })
          ]),
          _: 1
        }),
        t(i, {
          modelValue: n(e).menuDrawer,
          "onUpdate:modelValue": r[0] || (r[0] = (c) => n(e).menuDrawer = c),
          direction: "ltr",
          "with-header": !1,
          "custom-class": "aside-drawer",
          size: "210px"
        }, {
          default: a(() => [
            t(d)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const R = /* @__PURE__ */ b(k, [["__scopeId", "data-v-cb57f8db"]]);
export {
  R as default
};
