import { defineComponent as d, ref as m, resolveComponent as u, resolveDirective as f, openBlock as n, createElementBlock as h, withDirectives as x, createBlock as v, withCtx as g, createElementVNode as e, toDisplayString as c, unref as a } from "vue";
import { t, gB as w, _ as C } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as b } from "element-plus";
import { useRoute as B } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const y = { class: "main-container" }, D = { class: "flex justify-between items-center" }, k = { class: "text-page-title" }, E = { class: "flex flex-wrap px-2 plug-list pb-10 mt-[20px]" }, T = { class: "flex items-center p-3 w-[295px] relative plug-item mr-4 mb-4 bg-[var(--el-color-info-light-9)] cursor-pointer" }, N = { class: "flex flex-col ml-2" }, j = { class: "text-sm truncate w-[190px]" }, I = ["title"], M = /* @__PURE__ */ d({
  __name: "updatecache",
  setup(R) {
    const s = m(!1), r = B().meta.title, i = () => {
      b.confirm(
        t("clearCacheTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value = !0, w().then((l) => {
          s.value = !1;
        }).catch(() => {
          s.value = !1;
        });
      });
    };
    return (l, o) => {
      const p = u("el-card"), _ = f("loading");
      return n(), h("div", y, [
        x((n(), v(p, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: g(() => [
            e("div", D, [
              e("span", k, c(a(r)), 1)
            ]),
            e("div", E, [
              e("div", T, [
                e("div", N, [
                  e("span", j, c(a(t)("dataCache")), 1),
                  e("span", {
                    class: "text-xs text-gray-400 mt-1 truncate w-[190px]",
                    title: a(t)("dataCacheDesc")
                  }, c(a(t)("dataCacheDesc")), 9, I)
                ]),
                e("span", {
                  class: "plug-item-operate",
                  onClick: o[0] || (o[0] = (V) => i())
                }, c(a(t)("refresh")), 1)
              ])
            ])
          ]),
          _: 1
        })), [
          [_, s.value]
        ])
      ]);
    };
  }
});
const K = /* @__PURE__ */ C(M, [["__scopeId", "data-v-4cfdcba5"]]);
export {
  K as default
};
