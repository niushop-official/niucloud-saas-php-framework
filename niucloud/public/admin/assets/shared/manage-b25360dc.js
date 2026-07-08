import { defineComponent as f, resolveComponent as s, openBlock as b, createElementBlock as x, createVNode as t, withCtx as o, createElementVNode as m, toDisplayString as g, unref as e, isRef as v } from "vue";
import { t as i } from "./core-shared-9b1e55e9.js";
import { useRoute as y } from "vue-router";
import V from "./list-2fc5e661.js";
import h from "./group-ff65484a.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./site_default-f84c6c4e.js";
import "./edit-site-33e5ff99.js";
import "./member_head-81b0c11e.js";
import "./addon-ab6efca8.js";
const N = { class: "main-container" }, w = { class: "flex justify-between items-center" }, C = { class: "text-page-title" }, J = /* @__PURE__ */ f({
  __name: "manage",
  setup(k) {
    const a = y(), p = a.meta.title, n = a.query.type || "list", c = a.query.id || "";
    return (q, l) => {
      const r = s("el-tab-pane"), u = s("el-tabs"), _ = s("el-card");
      return b(), x("div", N, [
        t(_, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            m("div", w, [
              m("span", C, g(e(p)), 1)
            ]),
            t(u, {
              modelValue: e(n),
              "onUpdate:modelValue": l[0] || (l[0] = (d) => v(n) ? n.value = d : null),
              class: "mt-[20px]",
              "tab-position": "top"
            }, {
              default: o(() => [
                t(r, {
                  label: e(i)("站点列表"),
                  name: "list"
                }, {
                  default: o(() => [
                    t(V, { status: e(c) }, null, 8, ["status"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(r, {
                  label: e(i)("站点套餐"),
                  name: "group"
                }, {
                  default: o(() => [
                    t(h)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  J as default
};
