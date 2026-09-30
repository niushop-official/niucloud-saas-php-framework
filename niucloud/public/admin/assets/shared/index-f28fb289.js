import { defineComponent as c, computed as l, watch as p, resolveComponent as t, openBlock as m, createBlock as d, withCtx as r, createVNode as s } from "vue";
import { useRoute as i } from "vue-router";
import u from "./side-fb2704d0.js";
import { u as f, a as x } from "./core-shared-c6ad4e77.js";
import "./menu-item-d84cc262.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const y = /* @__PURE__ */ c({
  __name: "index",
  setup(b) {
    const e = f(), h = l(() => e.dark), a = i();
    return p(a, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, k) => {
      const n = t("el-scrollbar"), _ = t("el-aside");
      return m(), d(_, { class: "layout-aside dark w-auto" }, {
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
