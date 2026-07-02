import { defineComponent as r, watch as a, resolveComponent as n, openBlock as _, createBlock as c, withCtx as m, createVNode as p } from "vue";
import { useRoute as i } from "vue-router";
import d from "./side-1e422913.js";
import { cm as l, _ as u } from "./core-shared-ae4a556b.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-bf890c1d.js";
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
      const s = n("el-aside");
      return _(), c(s, { class: "h-screen layout-aside w-auto" }, {
        default: m(() => [
          p(d, { class: "hidden-xs-only" })
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
