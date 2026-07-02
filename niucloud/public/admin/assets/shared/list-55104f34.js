import { defineComponent as N, reactive as U, ref as b, resolveComponent as d, resolveDirective as j, openBlock as x, createElementBlock as M, createVNode as t, withCtx as n, createElementVNode as f, toDisplayString as s, unref as o, createTextVNode as p, withDirectives as R, createBlock as S } from "vue";
import { t as a, b4 as L, b5 as q } from "./core-shared-ae4a556b.js";
import { ElMessageBox as A } from "element-plus";
import G from "./edit-15ae0397.js";
import H from "./dict-36b4634d.js";
import { useRoute as I } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./lodash-8c6c2daa.js";
const J = { class: "main-container" }, K = { class: "flex justify-between items-center" }, O = { class: "text-page-title" }, Q = { class: "mt-[10px]" }, W = { class: "mt-[16px] flex justify-end" }, se = /* @__PURE__ */ N({
  __name: "list",
  setup(X) {
    const C = I().meta.title, e = U({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: "",
        key: ""
      }
    }), h = b(), m = (r = 1) => {
      e.loading = !0, e.page = r, L({
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
    const u = b(null), w = () => {
      u.value.setFormData(), u.value.showDialog = !0;
    }, P = (r) => {
      u.value.setFormData(r), u.value.showDialog = !0;
    }, y = b(null), V = (r) => {
      y.value.setFormData(r);
    }, $ = (r) => {
      A.confirm(
        a("dictDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        q(r).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, F = (r) => {
      r && (r.resetFields(), m());
    };
    return (r, l) => {
      const c = d("el-button"), v = d("el-input"), g = d("el-form-item"), z = d("el-form"), k = d("el-card"), _ = d("el-table-column"), B = d("el-table"), T = d("el-pagination"), E = j("loading");
      return x(), M("div", J, [
        t(k, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            f("div", K, [
              f("span", O, s(o(C)), 1),
              t(c, {
                type: "primary",
                onClick: w
              }, {
                default: n(() => [
                  p(s(o(a)("addDict")), 1)
                ]),
                _: 1
              })
            ]),
            t(k, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                t(z, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: h
                }, {
                  default: n(() => [
                    t(g, {
                      label: o(a)("name"),
                      prop: "name"
                    }, {
                      default: n(() => [
                        t(v, {
                          modelValue: e.searchParam.name,
                          "onUpdate:modelValue": l[0] || (l[0] = (i) => e.searchParam.name = i),
                          modelModifiers: { trim: !0 },
                          placeholder: o(a)("namePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(g, {
                      label: o(a)("key"),
                      prop: "key"
                    }, {
                      default: n(() => [
                        t(v, {
                          modelValue: e.searchParam.key,
                          "onUpdate:modelValue": l[1] || (l[1] = (i) => e.searchParam.key = i),
                          modelModifiers: { trim: !0 },
                          placeholder: o(a)("keyPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(g, null, {
                      default: n(() => [
                        t(c, {
                          type: "primary",
                          onClick: l[2] || (l[2] = (i) => m())
                        }, {
                          default: n(() => [
                            p(s(o(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(c, {
                          onClick: l[3] || (l[3] = (i) => F(h.value))
                        }, {
                          default: n(() => [
                            p(s(o(a)("reset")), 1)
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
            f("div", Q, [
              R((x(), S(B, {
                data: e.data,
                size: "large"
              }, {
                empty: n(() => [
                  f("span", null, s(e.loading ? "" : o(a)("emptyData")), 1)
                ]),
                default: n(() => [
                  t(_, {
                    prop: "name",
                    label: o(a)("name"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(_, {
                    prop: "key",
                    label: o(a)("key"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(_, {
                    prop: "memo",
                    label: o(a)("memo"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(_, {
                    prop: "create_time",
                    label: o(a)("createTime"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(_, {
                    label: o(a)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "120"
                  }, {
                    default: n(({ row: i }) => [
                      t(c, {
                        type: "primary",
                        link: "",
                        onClick: (D) => V(i)
                      }, {
                        default: n(() => [
                          p(s(o(a)("dictData")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(c, {
                        type: "primary",
                        link: "",
                        onClick: (D) => P(i)
                      }, {
                        default: n(() => [
                          p(s(o(a)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(c, {
                        type: "primary",
                        link: "",
                        onClick: (D) => $(i.id)
                      }, {
                        default: n(() => [
                          p(s(o(a)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [E, e.loading]
              ]),
              f("div", W, [
                t(T, {
                  "current-page": e.page,
                  "onUpdate:currentPage": l[4] || (l[4] = (i) => e.page = i),
                  "page-size": e.limit,
                  "onUpdate:pageSize": l[5] || (l[5] = (i) => e.limit = i),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: l[6] || (l[6] = (i) => m()),
                  onCurrentChange: m
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            t(G, {
              ref_key: "editDictDialog",
              ref: u,
              onComplete: m
            }, null, 512),
            t(H, {
              ref_key: "dictDialog",
              ref: y,
              onComplete: m
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  se as default
};
