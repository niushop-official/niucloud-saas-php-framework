import { defineComponent as u, resolveComponent as n, openBlock as f, createBlock as g, withCtx as o, createVNode as t, unref as c, createTextVNode as s } from "vue";
import { u as h, m as w, he as x } from "./core-shared-c6ad4e77.js";
import { useRoute as b } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const v = /* @__PURE__ */ u({
  __name: "index",
  setup(y) {
    const l = b(), e = h(), m = (a) => {
      e.$patch((d) => {
        d.lang = a, w.set({ key: "lang", data: a });
      }), x.loadLocaleMessages(l.path, e.lang), location.reload();
    };
    return (a, d) => {
      const p = n("icon"), r = n("el-dropdown-item"), i = n("el-dropdown-menu"), _ = n("el-dropdown");
      return f(), g(_, {
        onCommand: m,
        tabindex: 1
      }, {
        dropdown: o(() => [
          t(i, null, {
            default: o(() => [
              t(r, {
                command: "zh-cn",
                disabled: c(e).lang == "zh-cn"
              }, {
                default: o(() => [
                  s("简体中文")
                ]),
                _: 1
              }, 8, ["disabled"]),
              t(r, {
                command: "en",
                disabled: c(e).lang == "en"
              }, {
                default: o(() => [
                  s("English")
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            _: 1
          })
        ]),
        default: o(() => [
          t(p, { name: "iconfont iconfanyi" })
        ]),
        _: 1
      });
    };
  }
});
export {
  v as default
};
