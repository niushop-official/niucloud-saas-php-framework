import { defineComponent as d, ref as f, resolveComponent as l, openBlock as b, createElementBlock as g, normalizeStyle as y, unref as o, createElementVNode as v, createVNode as e, withCtx as a, pushScopeId as w, popScopeId as B } from "vue";
import { t as i, a as x } from "./core-shared-c6ad4e77.js";
import { useRoute as I } from "vue-router";
import { u as S } from "./useTablePageHeight-33d60cf6.js";
import V from "./list-73466e68.js";
import h from "./group-c3958ff0.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./site_default-f84c6c4e.js";
import "./index-c14157f3.js";
import "./index-559a9b12.js";
import "./index-997caa57.js";
import "./edit-site-3a06f1f0.js";
import "./member_head-81b0c11e.js";
import "./addon-bae583af.js";
import "./index-41dc1a99.js";
const q = { class: "table-fill-page__card" }, k = /* @__PURE__ */ d({
  __name: "manage",
  setup(C) {
    const t = I(), p = f(typeof t.query.type == "string" ? t.query.type : "list"), m = typeof t.query.id == "string" ? t.query.id : "", { pageRef: n, pageStyle: _ } = S();
    return (N, r) => {
      const s = l("el-tab-pane"), c = l("el-tabs");
      return b(), g("div", {
        ref_key: "pageRef",
        ref: n,
        class: "main-container table-fill-page",
        style: y(o(_))
      }, [
        v("div", q, [
          e(c, {
            modelValue: p.value,
            "onUpdate:modelValue": r[0] || (r[0] = (u) => p.value = u),
            class: "site-manage-tabs",
            "tab-position": "top"
          }, {
            default: a(() => [
              e(s, {
                label: o(i)("siteList"),
                name: "list"
              }, {
                default: a(() => [
                  e(V, { status: o(m) }, null, 8, ["status"])
                ]),
                _: 1
              }, 8, ["label"]),
              e(s, {
                label: o(i)("siteGroup"),
                name: "group"
              }, {
                default: a(() => [
                  e(h)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ], 4);
    };
  }
});
const X = /* @__PURE__ */ x(k, [["__scopeId", "data-v-b81571c3"]]);
export {
  X as default
};
