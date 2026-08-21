import { defineComponent as r, watch as a, resolveComponent as _, openBlock as n, createBlock as p, withCtx as c, createVNode as i } from "vue";
import { useRoute as m } from "vue-router";
import d from "./side-4a45c7d8.js";
import { co as l, _ as u } from "./core-shared-0b2facad.js";
import "./menu-item-e25c97a5.js";
import "./lodash-8c6c2daa.js";
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
      const s = _("el-aside");
      return n(), p(s, { class: "layout-aside w-auto" }, {
        default: c(() => [
          i(d, { class: "hidden-xs-only" })
        ]),
        _: 1
      });
    };
  }
});
const N = /* @__PURE__ */ u(f, [["__scopeId", "data-v-d836187a"]]);
export {
  N as default
};
