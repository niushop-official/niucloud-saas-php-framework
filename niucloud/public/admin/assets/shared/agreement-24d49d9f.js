import { defineComponent as y, reactive as k, resolveComponent as r, resolveDirective as x, openBlock as p, createElementBlock as C, createVNode as o, withCtx as a, createElementVNode as s, toDisplayString as c, unref as t, withDirectives as D, createBlock as N, createTextVNode as _ } from "vue";
import { t as n, dK as E } from "./core-shared-ca1fcae5.js";
import { useRoute as A, useRouter as B } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const L = { class: "main-container" }, T = { class: "flex justify-between items-center" }, V = { class: "text-page-title" }, j = { class: "mt-[20px]" }, M = /* @__PURE__ */ y({
  __name: "agreement",
  setup(R) {
    const u = A().meta.title, e = k({
      loading: !0,
      data: []
    });
    (() => {
      e.loading = !0, e.data = [], E().then((l) => {
        Object.keys(l.data).forEach((m) => e.data.push(l.data[m])), e.loading = !1;
      }).catch(() => {
        e.loading = !1;
      });
    })();
    const g = B(), f = (l) => {
      g.push(`/setting/agreement/edit?key=${l.agreement_key}`);
    };
    return (l, m) => {
      const i = r("el-table-column"), h = r("el-button"), b = r("el-table"), v = r("el-card"), w = x("loading");
      return p(), C("div", L, [
        o(v, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            s("div", T, [
              s("span", V, c(t(u)), 1)
            ]),
            s("div", j, [
              D((p(), N(b, {
                data: e.data,
                size: "large"
              }, {
                empty: a(() => [
                  s("span", null, c(e.loading ? "" : t(n)("emptyData")), 1)
                ]),
                default: a(() => [
                  o(i, {
                    prop: "type_name",
                    label: t(n)("typeName"),
                    "min-width": "100",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  o(i, {
                    prop: "title",
                    label: t(n)("title"),
                    "min-width": "100",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  o(i, {
                    label: t(n)("updateTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: a(({ row: d }) => [
                      _(c(d.update_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(i, {
                    label: t(n)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: a(({ row: d }) => [
                      o(h, {
                        type: "primary",
                        link: "",
                        onClick: (K) => f(d)
                      }, {
                        default: a(() => [
                          _(c(t(n)("config")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [w, e.loading]
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  M as default
};
