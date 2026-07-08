import { defineComponent as r, watch as a, resolveComponent as _, openBlock as n, createBlock as m, withCtx as p, createVNode as c } from "vue";
import { useRoute as i } from "vue-router";
import d from "./side-f68aec8b.js";
import { cm as l, _ as u } from "./core-shared-9b1e55e9.js";
import "./menu-item-19c03e3a.js";
import "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = /* @__PURE__ */ r({
  __name: "index",
  setup(x) {
    const t = l(), o = i();
    return a(o, () => {
      t.$patch((e) => {
        e.menuDrawer = !1;
      });
    }), (e, y) => {
      const s = _("el-aside");
      return n(), m(s, { class: "layout-aside w-auto" }, {
        default: p(() => [
          c(d, { class: "hidden-xs-only" })
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
