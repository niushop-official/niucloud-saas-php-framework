import { resolveComponent as e, openBlock as r, createBlock as n, withCtx as c, createVNode as i } from "vue";
import { _ } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const m = {};
function p(s, a) {
  const o = e("router-view"), t = e("el-container");
  return r(), n(t, { class: "w-screen h-screen min-w-[1200px]" }, {
    default: c(() => [
      i(o)
    ]),
    _: 1
  });
}
const k = /* @__PURE__ */ _(m, [["render", p]]);
export {
  k as default
};
