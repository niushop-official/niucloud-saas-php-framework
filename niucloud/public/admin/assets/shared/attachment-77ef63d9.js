import { defineComponent as h, ref as b, resolveComponent as n, openBlock as m, createElementBlock as s, createVNode as t, withCtx as o, createElementVNode as c, toDisplayString as v, unref as i, Fragment as y, renderList as x } from "vue";
import { t as g } from "./core-shared-11c0a673.js";
import V from "./attachment-91f4d472.js";
import { useRoute as k } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const w = { class: "main-container attachment-container" }, C = { class: "flex justify-between items-center mb-[20px]" }, N = { class: "text-page-title" }, A = /* @__PURE__ */ h({
  __name: "attachment",
  setup(B) {
    const p = k().meta.title, a = ["image", "video", "icon"], l = b(a[0]);
    return (j, r) => {
      const _ = n("el-tab-pane"), d = n("el-tabs"), u = n("el-card");
      return m(), s("div", w, [
        t(u, {
          class: "box-card !border-none full-container",
          shadow: "never"
        }, {
          default: o(() => [
            c("div", C, [
              c("span", N, v(i(p)), 1)
            ]),
            t(d, {
              modelValue: l.value,
              "onUpdate:modelValue": r[0] || (r[0] = (e) => l.value = e),
              "tab-position": "top"
            }, {
              default: o(() => [
                (m(), s(y, null, x(a, (e, f) => t(_, {
                  label: i(g)(e),
                  name: e,
                  key: f
                }, {
                  default: o(() => [
                    t(V, {
                      scene: "attachment",
                      type: e
                    }, null, 8, ["type"])
                  ]),
                  _: 2
                }, 1032, ["label", "name"])), 64))
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
  A as default
};
