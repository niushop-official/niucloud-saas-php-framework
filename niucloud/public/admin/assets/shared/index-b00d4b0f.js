import { defineComponent as c, computed as l, watch as m, resolveComponent as t, openBlock as p, createBlock as d, withCtx as r, createVNode as s } from "vue";
import { useRoute as i } from "vue-router";
import u from "./side-4d523551.js";
import { cm as f, _ as x } from "./core-shared-9b1e55e9.js";
import "./menu-item-e432abb9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const y = /* @__PURE__ */ c({
  __name: "index",
  setup(b) {
    const e = f(), h = l(() => e.dark), a = i();
    return m(a, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, k) => {
      const n = t("el-scrollbar"), _ = t("el-aside");
      return p(), d(_, { class: "layout-aside dark w-auto" }, {
        default: r(() => [
          s(n, null, {
            default: r(() => [
              s(u, { class: "hidden-xs-only slide" })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const R = /* @__PURE__ */ x(y, [["__scopeId", "data-v-768315bb"]]);
export {
  R as default
};
