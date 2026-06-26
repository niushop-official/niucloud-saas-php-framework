import { defineComponent as u, resolveComponent as n, openBlock as f, createBlock as g, withCtx as o, createVNode as t, unref as r, createTextVNode as s } from "vue";
import { ck as w, s as h, gR as b } from "./core-shared-ca1fcae5.js";
import { useRoute as x } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const V = /* @__PURE__ */ u({
  __name: "switch-lang",
  setup(k) {
    const l = x(), e = w(), m = (a) => {
      e.$patch((d) => {
        d.lang = a, h.set({ key: "lang", data: a });
      }), b.loadLocaleMessages(l.path, e.lang), location.reload();
    };
    return (a, d) => {
      const p = n("icon"), c = n("el-dropdown-item"), i = n("el-dropdown-menu"), _ = n("el-dropdown");
      return f(), g(_, {
        onCommand: m,
        tabindex: 1
      }, {
        dropdown: o(() => [
          t(i, null, {
            default: o(() => [
              t(c, {
                command: "zh-cn",
                disabled: r(e).lang == "zh-cn"
              }, {
                default: o(() => [
                  s("简体中文")
                ]),
                _: 1
              }, 8, ["disabled"]),
              t(c, {
                command: "en",
                disabled: r(e).lang == "en"
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
          t(p, { name: "iconfont-iconfanyi" })
        ]),
        _: 1
      });
    };
  }
});
export {
  V as default
};
