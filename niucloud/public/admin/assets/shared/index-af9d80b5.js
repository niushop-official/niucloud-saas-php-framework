import { defineComponent as r, watch as a, resolveComponent as n, openBlock as _, createBlock as p, withCtx as i, createVNode as m } from "vue";
import { useRoute as c } from "vue-router";
import d from "./side-500deefd.js";
import { u, a as l } from "./core-shared-c6ad4e77.js";
import "./menu-item-c87d4c02.js";
import "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = /* @__PURE__ */ r({
  __name: "index",
  setup(x) {
    const t = u(), o = c();
    return a(o, () => {
      t.$patch((e) => {
        e.menuDrawer = !1;
      });
    }), (e, y) => {
      const s = n("el-aside");
      return _(), p(s, { class: "layout-aside w-auto" }, {
        default: i(() => [
          m(d, { class: "hidden-xs-only" })
        ]),
        _: 1
      });
    };
  }
});
const N = /* @__PURE__ */ l(f, [["__scopeId", "data-v-d836187a"]]);
export {
  N as default
};
