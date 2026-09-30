import { defineComponent as c, computed as u, watch as _, resolveComponent as s, openBlock as f, createElementBlock as w, Fragment as x, createVNode as t, withCtx as a, unref as n } from "vue";
import { useRoute as y } from "vue-router";
import d from "./side-3d6044a8.js";
import { u as h, a as b } from "./core-shared-c6ad4e77.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-fcc21486.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const k = /* @__PURE__ */ c({
  __name: "index",
  setup(v) {
    const e = h(), V = u(() => e.dark), m = y();
    return _(m, () => {
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
          "onUpdate:modelValue": r[0] || (r[0] = (p) => n(e).menuDrawer = p),
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
