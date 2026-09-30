import { defineComponent as _, ref as u, resolveComponent as m, openBlock as l, createElementBlock as r, createElementVNode as d, createVNode as t, withCtx as c, Fragment as f, renderList as h, unref as v } from "vue";
import { t as y } from "./core-shared-c6ad4e77.js";
import b from "./attachment-700594dc.js";
import { useRoute as g } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const V = { class: "main-container attachment-container" }, x = { class: "attachment-page" }, z = /* @__PURE__ */ _({
  __name: "attachment",
  setup(k) {
    const N = g().meta.title, n = ["image", "video", "icon"], o = u(n[0]);
    return (B, a) => {
      const s = m("el-tab-pane"), p = m("el-tabs");
      return l(), r("div", V, [
        d("div", x, [
          t(p, {
            modelValue: o.value,
            "onUpdate:modelValue": a[0] || (a[0] = (e) => o.value = e),
            "tab-position": "top",
            class: "attachment-tabs"
          }, {
            default: c(() => [
              (l(), r(f, null, h(n, (e, i) => t(s, {
                label: v(y)(e),
                name: e,
                key: i
              }, {
                default: c(() => [
                  t(b, {
                    scene: "attachment",
                    type: e
                  }, null, 8, ["type"])
                ]),
                _: 2
              }, 1032, ["label", "name"])), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ]);
    };
  }
});
export {
  z as default
};
