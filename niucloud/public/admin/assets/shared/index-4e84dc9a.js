import { defineComponent as c, computed as l, watch as p, resolveComponent as t, openBlock as m, createBlock as i, withCtx as r, createVNode as s } from "vue";
import { useRoute as d } from "vue-router";
import u from "./side-7445a8d8.js";
import { ck as f, _ as x } from "./core-shared-ca1fcae5.js";
import "./menu-item-d9725e9f.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const y = /* @__PURE__ */ c({
  __name: "index",
  setup(b) {
    const e = f();
    l(() => e.dark);
    const a = d();
    return p(a, () => {
      e.$patch((o) => {
        o.menuDrawer = !1;
      });
    }), (o, h) => {
      const n = t("el-scrollbar"), _ = t("el-aside");
      return m(), i(_, { class: "layout-aside dark w-auto" }, {
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
const N = /* @__PURE__ */ x(y, [["__scopeId", "data-v-768315bb"]]);
export {
  N as default
};
