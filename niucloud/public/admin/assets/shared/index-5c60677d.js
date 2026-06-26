import { defineComponent as _, computed as u, watch as c, resolveComponent as s, openBlock as f, createElementBlock as w, Fragment as x, createVNode as t, withCtx as a, unref as n } from "vue";
import { useRoute as y } from "vue-router";
import m from "./side-d414f382.js";
import { ck as h, _ as k } from "./core-shared-ca1fcae5.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-19ded380.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const v = /* @__PURE__ */ _({
  __name: "index",
  setup(V) {
    const e = h();
    u(() => e.dark);
    const d = y();
    return c(d, () => {
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
const R = /* @__PURE__ */ k(v, [["__scopeId", "data-v-37104757"]]);
export {
  R as default
};
