import { defineComponent as N, reactive as S, ref as g, resolveComponent as s, resolveDirective as U, openBlock as D, createElementBlock as M, normalizeStyle as A, unref as n, createElementVNode as p, createVNode as t, withCtx as r, createTextVNode as b, toDisplayString as u, withDirectives as L, createBlock as H } from "vue";
import { t as a, bc as j, bd as q } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as G } from "element-plus";
import I from "./edit-19974a1f.js";
import J from "./dict-ffb99c80.js";
import K from "./index-c14157f3.js";
import O from "./index-559a9b12.js";
import Q from "./index-997caa57.js";
import { useRoute as W } from "vue-router";
import { u as X } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./lodash-8c6c2daa.js";
const Y = { class: "table-fill-page__card" }, Z = { class: "table-panel table-fill-page__panel" }, ee = { class: "table-fill-page__table" }, he = /* @__PURE__ */ N({
  __name: "list",
  setup(te) {
    const k = W().meta.title, { pageRef: C, pageStyle: w } = X(), P = (o) => [
      { label: a("edit"), onClick: () => x(o) },
      { label: a("dictData"), onClick: () => V(o) },
      { label: a("delete"), type: "danger", onClick: () => F(o.id) }
    ], e = S({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: "",
        key: ""
      }
    }), h = g(), m = (o = 1) => {
      e.loading = !0, e.page = o, j({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((l) => {
        e.loading = !1, e.data = l.data.data, e.total = l.data.total;
      }).catch(() => {
        e.loading = !1;
      });
    };
    m();
    const c = g(null), T = () => {
      c.value.setFormData(), c.value.showDialog = !0;
    }, x = (o) => {
      c.value.setFormData(o), c.value.showDialog = !0;
    }, y = g(null), V = (o) => {
      y.value.setFormData(o);
    }, F = (o) => {
      G.confirm(
        a("dictDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        q(o).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, z = (o) => {
      o && (o.resetFields(), m());
    };
    return (o, l) => {
      const v = s("el-input"), f = s("el-form-item"), _ = s("el-button"), B = s("el-form"), E = s("el-card"), d = s("el-table-column"), R = s("el-table"), $ = U("loading");
      return D(), M("div", {
        ref_key: "pageRef",
        ref: C,
        class: "main-container table-fill-page",
        style: A(n(w))
      }, [
        p("div", Y, [
          t(E, {
            class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
            shadow: "never"
          }, {
            default: r(() => [
              t(B, {
                inline: !0,
                model: e.searchParam,
                ref_key: "searchFormRef",
                ref: h
              }, {
                default: r(() => [
                  t(f, {
                    label: n(a)("name"),
                    prop: "name"
                  }, {
                    default: r(() => [
                      t(v, {
                        modelValue: e.searchParam.name,
                        "onUpdate:modelValue": l[0] || (l[0] = (i) => e.searchParam.name = i),
                        modelModifiers: { trim: !0 },
                        placeholder: n(a)("namePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(f, {
                    label: n(a)("key"),
                    prop: "key"
                  }, {
                    default: r(() => [
                      t(v, {
                        modelValue: e.searchParam.key,
                        "onUpdate:modelValue": l[1] || (l[1] = (i) => e.searchParam.key = i),
                        modelModifiers: { trim: !0 },
                        placeholder: n(a)("keyPlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(f, null, {
                    default: r(() => [
                      t(_, {
                        type: "primary",
                        onClick: l[2] || (l[2] = (i) => m())
                      }, {
                        default: r(() => [
                          b(u(n(a)("search")), 1)
                        ]),
                        _: 1
                      }),
                      t(_, {
                        onClick: l[3] || (l[3] = (i) => z(h.value))
                      }, {
                        default: r(() => [
                          b(u(n(a)("reset")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ]),
            _: 1
          }),
          p("div", Z, [
            t(Q, {
              title: n(k),
              selectable: !1
            }, {
              actions: r(() => [
                t(_, {
                  type: "primary",
                  onClick: T
                }, {
                  default: r(() => [
                    b(u(n(a)("addDict")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            p("div", ee, [
              L((D(), H(R, {
                height: "100%",
                data: e.data,
                size: "large"
              }, {
                empty: r(() => [
                  p("span", null, u(e.loading ? "" : n(a)("emptyData")), 1)
                ]),
                default: r(() => [
                  t(d, {
                    prop: "name",
                    label: n(a)("name"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(d, {
                    prop: "key",
                    label: n(a)("key"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(d, {
                    prop: "memo",
                    label: n(a)("memo"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(d, {
                    prop: "create_time",
                    label: n(a)("createTime"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(d, {
                    label: n(a)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "200"
                  }, {
                    default: r(({ row: i }) => [
                      t(K, {
                        actions: P(i)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [$, e.loading]
              ])
            ]),
            t(O, {
              "current-page": e.page,
              "onUpdate:current-page": l[4] || (l[4] = (i) => e.page = i),
              "page-size": e.limit,
              "onUpdate:page-size": l[5] || (l[5] = (i) => e.limit = i),
              total: e.total,
              onSizeChange: l[6] || (l[6] = (i) => m()),
              onCurrentChange: m
            }, null, 8, ["current-page", "page-size", "total"])
          ]),
          t(I, {
            ref_key: "editDictDialog",
            ref: c,
            onComplete: m
          }, null, 512),
          t(J, {
            ref_key: "dictDialog",
            ref: y,
            onComplete: m
          }, null, 512)
        ])
      ], 4);
    };
  }
});
export {
  he as default
};
