import { defineComponent as z, reactive as D, resolveComponent as d, resolveDirective as N, openBlock as f, createElementBlock as B, normalizeStyle as R, unref as l, createVNode as n, withCtx as i, createElementVNode as p, toDisplayString as c, withDirectives as S, createBlock as j, createTextVNode as E } from "vue";
import { t as o, bg as T } from "./core-shared-c6ad4e77.js";
import { useRoute as V, useRouter as L } from "vue-router";
import { c as U } from "./lodash-8c6c2daa.js";
import { u as $ } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const G = { class: "flex justify-between items-center" }, H = { class: "text-page-title" }, M = { class: "table-fill-page__table mt-[20px]" }, P = { class: "mt-[16px] flex justify-end" }, ee = /* @__PURE__ */ z({
  __name: "tabbar",
  setup(q) {
    const b = V(), h = L(), y = b.meta.title, { pageRef: v, pageStyle: x } = $(), e = D({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), _ = (m = 1) => {
      e.loading = !0, e.page = m, T({}).then((t) => {
        e.loading = !1;
        const r = Math.ceil(t.data.length / e.limit), u = U(t.data), g = [];
        for (let s = 0; s < r; s++)
          g[s] = u.splice(0, e.limit);
        e.data = g[e.page - 1], e.total = t.data.length;
      }).catch(() => {
        e.loading = !1;
      });
    };
    _();
    const k = (m) => {
      h.push("/diy/tabbar_edit?key=" + m.key);
    };
    return (m, t) => {
      const r = d("el-table-column"), u = d("el-button"), g = d("el-table"), s = d("el-pagination"), w = d("el-card"), C = N("loading");
      return f(), B("div", {
        ref_key: "pageRef",
        ref: v,
        class: "main-container table-fill-page",
        style: R(l(x))
      }, [
        n(w, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: i(() => [
            p("div", G, [
              p("span", H, c(l(y)), 1)
            ]),
            p("div", M, [
              S((f(), j(g, {
                height: "100%",
                data: e.data,
                size: "large"
              }, {
                empty: i(() => [
                  p("span", null, c(e.loading ? "" : l(o)("emptyData")), 1)
                ]),
                default: i(() => [
                  n(r, {
                    prop: "title",
                    label: l(o)("title"),
                    "min-width": "120"
                  }, {
                    default: i(({ row: a }) => [
                      p("span", null, c(a.info.title), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(r, {
                    prop: "key",
                    label: l(o)("key"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  n(r, {
                    label: l(o)("type"),
                    "min-width": "120"
                  }, {
                    default: i(({ row: a }) => [
                      p("span", null, c(a.info.type === "app" ? l(o)("app") : l(o)("addon")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(r, {
                    label: l(o)("operation"),
                    fixed: "right",
                    align: "right",
                    "min-width": "160"
                  }, {
                    default: i(({ row: a }) => [
                      n(u, {
                        type: "primary",
                        link: "",
                        onClick: (A) => k(a)
                      }, {
                        default: i(() => [
                          E(c(l(o)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [C, e.loading]
              ])
            ]),
            p("div", P, [
              n(s, {
                "current-page": e.page,
                "onUpdate:current-page": t[0] || (t[0] = (a) => e.page = a),
                "page-size": e.limit,
                "onUpdate:page-size": t[1] || (t[1] = (a) => e.limit = a),
                layout: "total, sizes, prev, pager, next, jumper",
                total: e.total,
                onSizeChange: t[2] || (t[2] = (a) => _()),
                onCurrentChange: _
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  ee as default
};
