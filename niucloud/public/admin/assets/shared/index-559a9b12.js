import { defineComponent as f, computed as s, resolveComponent as z, openBlock as m, createElementBlock as h, createVNode as S, unref as d, isRef as g, pushScopeId as x, popScopeId as P } from "vue";
import { a as _ } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const v = { class: "table-pagination" }, y = /* @__PURE__ */ f({
  __name: "index",
  props: {
    currentPage: { default: 1 },
    pageSize: { default: 10 },
    pageSizes: { default: () => [10, 20, 50, 100] },
    total: { default: 0 },
    disabled: { type: Boolean, default: !1 },
    hideOnSinglePage: { type: Boolean, default: !1 },
    layout: { default: "total, sizes, ->, prev, pager, next, jumper" }
  },
  emits: ["update:currentPage", "update:pageSize", "size-change", "current-change"],
  setup(a, { emit: t }) {
    const p = a, o = s({
      get: () => p.currentPage,
      set: (e) => t("update:currentPage", e)
    }), i = s({
      get: () => p.pageSize,
      set: (e) => t("update:pageSize", e)
    }), r = (e) => t("size-change", e), u = (e) => t("current-change", e);
    return (e, n) => {
      const c = z("el-pagination");
      return m(), h("div", v, [
        S(c, {
          "current-page": d(o),
          "onUpdate:current-page": n[0] || (n[0] = (l) => g(o) ? o.value = l : null),
          "page-size": d(i),
          "onUpdate:page-size": n[1] || (n[1] = (l) => g(i) ? i.value = l : null),
          "page-sizes": a.pageSizes,
          total: a.total,
          disabled: a.disabled,
          "hide-on-single-page": a.hideOnSinglePage,
          layout: a.layout,
          onSizeChange: r,
          onCurrentChange: u
        }, null, 8, ["current-page", "page-size", "page-sizes", "total", "disabled", "hide-on-single-page", "layout"])
      ]);
    };
  }
});
const j = /* @__PURE__ */ _(y, [["__scopeId", "data-v-ac4ce3a5"]]);
export {
  j as default
};
