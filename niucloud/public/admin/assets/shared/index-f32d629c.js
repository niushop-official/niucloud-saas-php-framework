import { defineComponent as r, watch as a, resolveComponent as _, openBlock as n, createBlock as p, withCtx as i, createVNode as m } from "vue";
import { useRoute as c } from "vue-router";
import d from "./side-36ea9deb.js";
import { ck as l, _ as u } from "./core-shared-ca1fcae5.js";
import "./menu-item.vue_vue_type_script_setup_true_lang-11227f78.js";
import "./cloneDeep-70d647ec.js";
import "./isArrayLike-62604998.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = /* @__PURE__ */ r({
  __name: "index",
  setup(x) {
    const t = l(), o = c();
    return a(o, () => {
      t.$patch((e) => {
        e.menuDrawer = !1;
      });
    }), (e, y) => {
      const s = _("el-aside");
      return n(), p(s, { class: "layout-aside w-auto" }, {
        default: i(() => [
          m(d, { class: "hidden-xs-only" })
        ]),
        _: 1
      });
    };
  }
});
const R = /* @__PURE__ */ u(f, [["__scopeId", "data-v-d836187a"]]);
export {
  R as default
};
