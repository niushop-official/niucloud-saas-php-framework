import { defineComponent as d, ref as _, resolveDirective as l, withDirectives as m, openBlock as h, createElementBlock as u, createElementVNode as e, toDisplayString as c, unref as s, pushScopeId as M, popScopeId as R } from "vue";
import { t, hm as f, a as v } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as g } from "element-plus";
import { useRoute as x } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const C = { class: "main-container" }, w = { class: "flex justify-between items-center mb-3" }, y = { class: "text-page-title" }, B = { class: "app-grid" }, D = { class: "app-card-head" }, I = { class: "app-card-info" }, S = { class: "app-card-name" }, k = { class: "app-card-desc" }, E = /* @__PURE__ */ d({
  __name: "updatecache",
  setup(T) {
    const a = _(!1), n = x().meta.title, i = () => {
      g.confirm(
        t("clearCacheTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        a.value = !0, f({}).then((r) => {
          a.value = !1;
        }).catch(() => {
          a.value = !1;
        });
      });
    };
    return (r, o) => {
      const p = l("loading");
      return m((h(), u("div", C, [
        e("div", w, [
          e("span", y, c(s(n)), 1)
        ]),
        e("div", B, [
          e("div", {
            class: "app-card",
            onClick: o[0] || (o[0] = (N) => i())
          }, [
            e("div", D, [
              e("div", I, [
                e("div", S, c(s(t)("dataCache")), 1)
              ])
            ]),
            e("p", k, c(s(t)("dataCacheDesc")), 1)
          ])
        ])
      ])), [
        [p, a.value]
      ]);
    };
  }
});
const H = /* @__PURE__ */ v(E, [["__scopeId", "data-v-3a4f6410"]]);
export {
  H as default
};
