import { defineComponent as p, computed as c, watch as _, resolveComponent as a, openBlock as f, createElementBlock as w, Fragment as x, createVNode as t, withCtx as n, unref as s } from "vue";
import { useRoute as y } from "vue-router";
import m from "./side-28cef72e.js";
import { u as h } from "./core-shared-c6ad4e77.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-896b4b43.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const N = /* @__PURE__ */ p({
  __name: "index",
  setup(k) {
    const e = h(), v = c(() => e.dark), l = y();
    return _(l, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, r) => {
      const d = a("el-aside"), i = a("el-drawer");
      return f(), w(x, null, [
        t(d, { class: "layout-aside w-auto" }, {
          default: n(() => [
            t(m, { class: "hidden-xs-only slide" })
          ]),
          _: 1
        }),
        t(i, {
          modelValue: s(e).menuDrawer,
          "onUpdate:modelValue": r[0] || (r[0] = (u) => s(e).menuDrawer = u),
          direction: "ltr",
          "with-header": !1,
          "custom-class": "aside-drawer layout-default",
          size: "var(--cmp-sidebar-width)"
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
export {
  N as default
};
