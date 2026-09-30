import { defineComponent as V, reactive as $, ref as v, resolveComponent as m, resolveDirective as E, openBlock as y, createElementBlock as R, normalizeStyle as S, unref as o, createVNode as t, withCtx as n, createElementVNode as d, toDisplayString as p, createTextVNode as b, withDirectives as j, createBlock as U } from "vue";
import { t as l, dm as H, dn as q } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as A } from "element-plus";
import G from "./edit-label-0bfbd9ef.js";
import { useRoute as I } from "vue-router";
import { u as J } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const K = { class: "flex justify-between items-center" }, O = { class: "text-page-title" }, Q = { class: "mt-[10px] table-fill-page__panel" }, W = { class: "table-fill-page__table" }, X = { class: "mt-[16px] flex justify-end" }, pe = /* @__PURE__ */ V({
  __name: "label",
  setup(Y) {
    const x = I().meta.title, { pageRef: k, pageStyle: w } = J(), e = $({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        label_name: ""
      }
    }), f = v(), C = (i) => {
      i && (i.resetFields(), s());
    }, s = (i = 1) => {
      e.loading = !0, e.page = i, H({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((a) => {
        e.loading = !1, e.data = a.data.data, e.total = a.data.total;
      }).catch(() => {
        e.loading = !1;
      });
    };
    s();
    const c = v(null), D = () => {
      c.value.setFormData(), c.value.showDialog = !0;
    }, L = (i) => {
      c.value.setFormData(i), c.value.showDialog = !0;
    }, M = (i) => {
      A.confirm(
        l("memberLabelDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        q(i).then(() => {
          s();
        }).catch(() => {
        });
      });
    };
    return (i, a) => {
      const u = m("el-button"), N = m("el-input"), g = m("el-form-item"), z = m("el-form"), h = m("el-card"), _ = m("el-table-column"), P = m("el-table"), B = m("el-pagination"), F = E("loading");
      return y(), R("div", {
        ref_key: "pageRef",
        ref: k,
        class: "main-container table-fill-page",
        style: S(o(w))
      }, [
        t(h, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: n(() => [
            d("div", K, [
              d("span", O, p(o(x)), 1),
              t(u, {
                type: "primary",
                onClick: D
              }, {
                default: n(() => [
                  b(p(o(l)("addMemberLabel")), 1)
                ]),
                _: 1
              })
            ]),
            t(h, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: n(() => [
                t(z, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: f
                }, {
                  default: n(() => [
                    t(g, {
                      label: o(l)("labelName"),
                      prop: "label_name"
                    }, {
                      default: n(() => [
                        t(N, {
                          modelValue: e.searchParam.label_name,
                          "onUpdate:modelValue": a[0] || (a[0] = (r) => e.searchParam.label_name = r),
                          modelModifiers: { trim: !0 },
                          placeholder: o(l)("labelNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(g, null, {
                      default: n(() => [
                        t(u, {
                          type: "primary",
                          onClick: a[1] || (a[1] = (r) => s())
                        }, {
                          default: n(() => [
                            b(p(o(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, {
                          onClick: a[2] || (a[2] = (r) => C(f.value))
                        }, {
                          default: n(() => [
                            b(p(o(l)("reset")), 1)
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
            d("div", Q, [
              d("div", W, [
                j((y(), U(P, {
                  height: "100%",
                  data: e.data,
                  size: "large"
                }, {
                  empty: n(() => [
                    d("span", null, p(e.loading ? "" : o(l)("emptyData")), 1)
                  ]),
                  default: n(() => [
                    t(_, {
                      prop: "label_name",
                      label: o(l)("labelName"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(_, {
                      prop: "member_num",
                      label: o(l)("memberNumber"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(_, {
                      prop: "memo",
                      label: o(l)("memo"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(_, {
                      prop: "sort",
                      label: o(l)("sort"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(_, {
                      label: o(l)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "130"
                    }, {
                      default: n(({ row: r }) => [
                        t(u, {
                          type: "primary",
                          link: "",
                          onClick: (T) => L(r)
                        }, {
                          default: n(() => [
                            b(p(o(l)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(u, {
                          type: "primary",
                          link: "",
                          onClick: (T) => M(r.label_id)
                        }, {
                          default: n(() => [
                            b(p(o(l)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [F, e.loading]
                ])
              ]),
              d("div", X, [
                t(B, {
                  "current-page": e.page,
                  "onUpdate:current-page": a[3] || (a[3] = (r) => e.page = r),
                  "page-size": e.limit,
                  "onUpdate:page-size": a[4] || (a[4] = (r) => e.limit = r),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: a[5] || (a[5] = (r) => s()),
                  onCurrentChange: s
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            t(G, {
              ref_key: "editMemberLabelDialog",
              ref: c,
              onComplete: s
            }, null, 512)
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  pe as default
};
