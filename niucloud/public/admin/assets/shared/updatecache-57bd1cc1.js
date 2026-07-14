import { defineComponent as _, ref as m, resolveComponent as u, resolveDirective as f, openBlock as n, createElementBlock as h, withDirectives as x, createBlock as v, withCtx as g, createElementVNode as e, toDisplayString as o, unref as c, pushScopeId as $, popScopeId as q } from "vue";
import { t, gH as w, _ as C } from "./core-shared-11c0a673.js";
import { ElMessageBox as b } from "element-plus";
import { useRoute as y } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const B = { class: "main-container" }, D = { class: "flex justify-between items-center" }, k = { class: "text-page-title" }, I = { class: "flex flex-wrap px-2 plug-list pb-10 mt-[20px]" }, S = { class: "flex items-center p-3 w-[295px] relative plug-item mr-4 mb-4 bg-[var(--el-color-info-light-9)] cursor-pointer" }, E = { class: "flex flex-col ml-2" }, T = { class: "text-sm truncate w-[190px]" }, N = ["title"], j = /* @__PURE__ */ _({
  __name: "updatecache",
  setup(H) {
    const a = m(!1), r = y().meta.title, i = () => {
      b.confirm(
        t("clearCacheTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        a.value = !0, w({}).then((l) => {
          a.value = !1;
        }).catch(() => {
          a.value = !1;
        });
      });
    };
    return (l, s) => {
      const p = u("el-card"), d = f("loading");
      return n(), h("div", B, [
        x((n(), v(p, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: g(() => [
            e("div", D, [
              e("span", k, o(c(r)), 1)
            ]),
            e("div", I, [
              e("div", S, [
                e("div", E, [
                  e("span", T, o(c(t)("dataCache")), 1),
                  e("span", {
                    class: "text-xs text-gray-400 mt-1 truncate w-[190px]",
                    title: c(t)("dataCacheDesc")
                  }, o(c(t)("dataCacheDesc")), 9, N)
                ]),
                e("span", {
                  class: "plug-item-operate",
                  onClick: s[0] || (s[0] = (R) => i())
                }, o(c(t)("refresh")), 1)
              ])
            ])
          ]),
          _: 1
        })), [
          [d, a.value]
        ])
      ]);
    };
  }
});
const O = /* @__PURE__ */ C(j, [["__scopeId", "data-v-4cfdcba5"]]);
export {
  O as default
};
