import { defineComponent as r, watch as a, resolveComponent as n, openBlock as _, createBlock as c, withCtx as p, createVNode as i } from "vue";
import { useRoute as m } from "vue-router";
import d from "./side-3fef3412.js";
import { co as l, _ as u } from "./core-shared-0b2facad.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-e652ae70.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = /* @__PURE__ */ r({
  __name: "index",
  setup(x) {
    const o = l(), t = m();
    return a(t, () => {
      o.$patch((e) => {
        e.menuDrawer = !1;
      });
    }), (e, y) => {
      const s = n("el-aside");
      return _(), c(s, { class: "h-screen layout-aside w-auto" }, {
        default: p(() => [
          i(d, { class: "hidden-xs-only" })
        ]),
        _: 1
      });
    };
  }
});
const N = /* @__PURE__ */ u(f, [["__scopeId", "data-v-46908aed"]]);
export {
  N as default
};
