import { defineComponent as _, computed as c, watch as u, resolveComponent as s, openBlock as f, createElementBlock as w, Fragment as x, createVNode as t, withCtx as a, unref as n } from "vue";
import { useRoute as y } from "vue-router";
import m from "./side-f9944a77.js";
import { cm as h, _ as k } from "./core-shared-ae4a556b.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-2c356df2.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const v = /* @__PURE__ */ _({
  __name: "index",
  setup(V) {
    const e = h(), C = c(() => e.dark), d = y();
    return u(d, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, r) => {
      const l = s("el-aside"), i = s("el-drawer");
      return f(), w(x, null, [
        t(l, { class: "layout-aside dark w-auto" }, {
          default: a(() => [
            t(m, { class: "hidden-xs-only slide" })
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
          default: a(() => [
            t(m)
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
