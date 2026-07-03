import { defineComponent as w, reactive as C, resolveComponent as d, resolveDirective as D, openBlock as b, createElementBlock as z, createVNode as l, withCtx as i, createElementVNode as p, toDisplayString as c, unref as o, withDirectives as N, createBlock as B, createTextVNode as j } from "vue";
import { t as n, b8 as E } from "./core-shared-c8d7774e.js";
import { useRoute as S, useRouter as V } from "vue-router";
import { c as L } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const R = { class: "main-container" }, T = { class: "flex justify-between items-center" }, U = { class: "text-page-title" }, $ = { class: "mt-[16px] flex justify-end" }, Q = /* @__PURE__ */ w({
  __name: "tabbar",
  setup(G) {
    const f = S(), h = V(), v = f.meta.title, t = C({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), _ = (m = 1) => {
      t.loading = !0, t.page = m, E({}).then((e) => {
        t.loading = !1;
        const r = Math.ceil(e.data.length / t.limit), g = L(e.data), u = [];
        for (let s = 0; s < r; s++)
          u[s] = g.splice(0, t.limit);
        t.data = u[t.page - 1], t.total = e.data.length;
      }).catch(() => {
        t.loading = !1;
      });
    };
    _();
    const y = (m) => {
      h.push("/diy/tabbar_edit?key=" + m.key);
    };
    return (m, e) => {
      const r = d("el-table-column"), g = d("el-button"), u = d("el-table"), s = d("el-pagination"), x = d("el-card"), k = D("loading");
      return b(), z("div", R, [
        l(x, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            p("div", T, [
              p("span", U, c(o(v)), 1)
            ]),
            N((b(), B(u, {
              class: "mt-[20px]",
              data: t.data,
              size: "large"
            }, {
              empty: i(() => [
                p("span", null, c(t.loading ? "" : o(n)("emptyData")), 1)
              ]),
              default: i(() => [
                l(r, {
                  prop: "title",
                  label: o(n)("title"),
                  "min-width": "120"
                }, {
                  default: i(({ row: a }) => [
                    p("span", null, c(a.info.title), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  prop: "key",
                  label: o(n)("key"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                l(r, {
                  label: o(n)("type"),
                  "min-width": "120"
                }, {
                  default: i(({ row: a }) => [
                    p("span", null, c(a.info.type === "app" ? o(n)("app") : o(n)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: o(n)("operation"),
                  fixed: "right",
                  align: "right",
                  "min-width": "160"
                }, {
                  default: i(({ row: a }) => [
                    l(g, {
                      type: "primary",
                      link: "",
                      onClick: (M) => y(a)
                    }, {
                      default: i(() => [
                        j(c(o(n)("edit")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [k, t.loading]
            ]),
            p("div", $, [
              l(s, {
                "current-page": t.page,
                "onUpdate:currentPage": e[0] || (e[0] = (a) => t.page = a),
                "page-size": t.limit,
                "onUpdate:pageSize": e[1] || (e[1] = (a) => t.limit = a),
                layout: "total, sizes, prev, pager, next, jumper",
                total: t.total,
                onSizeChange: e[2] || (e[2] = (a) => _()),
                onCurrentChange: _
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  Q as default
};
