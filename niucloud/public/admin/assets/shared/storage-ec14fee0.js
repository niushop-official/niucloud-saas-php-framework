import { defineComponent as L, ref as D, reactive as R, resolveComponent as c, resolveDirective as j, openBlock as l, createElementBlock as b, createVNode as i, withCtx as o, createElementVNode as u, toDisplayString as m, unref as n, withDirectives as F, createBlock as p, createTextVNode as h, createCommentVNode as y, Fragment as k, renderList as $, resolveDynamicComponent as z } from "vue";
import { t as s, fa as A, b_ as O } from "./core-shared-0b2facad.js";
import { useRoute as U } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const q = { class: "main-container" }, G = { class: "flex justify-between items-center" }, H = { class: "text-page-title" }, I = { class: "mt-[20px]" }, te = /* @__PURE__ */ L({
  __name: "storage",
  setup(J) {
    const x = U().meta.title, _ = D([]), d = R({
      data: []
    }), r = D(!0), w = () => {
      r.value = !0, A().then(({ data: t }) => {
        Object.keys(t).forEach((e) => {
          t[e].component && (t[e].component = O(t[e].component));
        }), d.data = t, r.value = !1;
      }).catch(() => {
        r.value = !1;
      });
    };
    w();
    const N = (t, e) => {
      _.value[e] = t;
    }, E = (t, e) => {
      _.value[e].setFormData(t), _.value[e].showDialog = !0;
    };
    return (t, e) => {
      const f = c("el-table-column"), C = c("el-tag"), S = c("el-button"), T = c("el-table"), V = c("el-card"), B = j("loading");
      return l(), b("div", q, [
        i(V, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            u("div", G, [
              u("span", H, m(n(x)), 1)
            ]),
            u("div", I, [
              F((l(), p(T, {
                data: d.data,
                size: "large"
              }, {
                empty: o(() => [
                  u("span", null, m(r.value ? "" : n(s)("emptyData")), 1)
                ]),
                default: o(() => [
                  i(f, {
                    prop: "name",
                    label: n(s)("name"),
                    "min-width": "100",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  i(f, {
                    label: n(s)("isUse"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: o(({ row: a }) => [
                      a.is_use == 1 ? (l(), p(C, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: o(() => [
                          h(m(n(s)("statusNormal")), 1)
                        ]),
                        _: 1
                      })) : y("", !0),
                      a.is_use == 0 ? (l(), p(C, {
                        key: 1,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: o(() => [
                          h(m(n(s)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })) : y("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(f, {
                    label: n(s)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: o(({ row: a, $index: v }) => [
                      i(S, {
                        type: "primary",
                        link: "",
                        onClick: (g) => E(a, v)
                      }, {
                        default: o(() => [
                          h(m(n(s)("config")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [B, r.value]
              ])
            ]),
            (l(!0), b(k, null, $(d.data, (a, v) => (l(), b(k, null, [
              a.component ? (l(), p(z(a.component), {
                key: 0,
                ref_for: !0,
                ref: (g) => N(g, v),
                onComplete: e[0] || (e[0] = (g) => w())
              }, null, 544)) : y("", !0)
            ], 64))), 256))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  te as default
};
