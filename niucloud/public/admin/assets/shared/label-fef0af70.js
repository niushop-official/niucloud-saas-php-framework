import { defineComponent as F, reactive as V, ref as v, resolveComponent as m, resolveDirective as $, openBlock as y, createElementBlock as E, createVNode as t, withCtx as n, createElementVNode as _, toDisplayString as d, unref as o, createTextVNode as b, withDirectives as T, createBlock as j } from "vue";
import { t as a, d7 as R, d8 as S } from "./core-shared-e1759ce4.js";
import { ElMessageBox as U } from "element-plus";
import q from "./edit-label-bb7d2ec7.js";
import { useRoute as A } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const G = { class: "main-container" }, H = { class: "flex justify-between items-center" }, I = { class: "text-page-title" }, J = { class: "mt-[10px]" }, K = { class: "mt-[16px] flex justify-end" }, ne = /* @__PURE__ */ F({
  __name: "label",
  setup(O) {
    const x = A().meta.title, e = V({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        label_name: ""
      }
    }), f = v(), k = (i) => {
      i && (i.resetFields(), s());
    }, s = (i = 1) => {
      e.loading = !0, e.page = i, R({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((l) => {
        e.loading = !1, e.data = l.data.data, e.total = l.data.total;
      }).catch(() => {
        e.loading = !1;
      });
    };
    s();
    const p = v(null), w = () => {
      p.value.setFormData(), p.value.showDialog = !0;
    }, C = (i) => {
      p.value.setFormData(i), p.value.showDialog = !0;
    }, D = (i) => {
      U.confirm(
        a("memberLabelDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        S(i).then(() => {
          s();
        }).catch(() => {
        });
      });
    };
    return (i, l) => {
      const c = m("el-button"), L = m("el-input"), g = m("el-form-item"), M = m("el-form"), h = m("el-card"), u = m("el-table-column"), N = m("el-table"), P = m("el-pagination"), z = $("loading");
      return y(), E("div", G, [
        t(h, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            _("div", H, [
              _("span", I, d(o(x)), 1),
              t(c, {
                type: "primary",
                onClick: w
              }, {
                default: n(() => [
                  b(d(o(a)("addMemberLabel")), 1)
                ]),
                _: 1
              })
            ]),
            t(h, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                t(M, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: f
                }, {
                  default: n(() => [
                    t(g, {
                      label: o(a)("labelName"),
                      prop: "label_name"
                    }, {
                      default: n(() => [
                        t(L, {
                          modelValue: e.searchParam.label_name,
                          "onUpdate:modelValue": l[0] || (l[0] = (r) => e.searchParam.label_name = r),
                          modelModifiers: { trim: !0 },
                          placeholder: o(a)("labelNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(g, null, {
                      default: n(() => [
                        t(c, {
                          type: "primary",
                          onClick: l[1] || (l[1] = (r) => s())
                        }, {
                          default: n(() => [
                            b(d(o(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(c, {
                          onClick: l[2] || (l[2] = (r) => k(f.value))
                        }, {
                          default: n(() => [
                            b(d(o(a)("reset")), 1)
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
            _("div", J, [
              T((y(), j(N, {
                data: e.data,
                size: "large"
              }, {
                empty: n(() => [
                  _("span", null, d(e.loading ? "" : o(a)("emptyData")), 1)
                ]),
                default: n(() => [
                  t(u, {
                    prop: "label_name",
                    label: o(a)("labelName"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(u, {
                    prop: "member_num",
                    label: o(a)("memberNumber"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(u, {
                    prop: "memo",
                    label: o(a)("memo"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(u, {
                    prop: "sort",
                    label: o(a)("sort"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(u, {
                    label: o(a)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: n(({ row: r }) => [
                      t(c, {
                        type: "primary",
                        link: "",
                        onClick: (B) => C(r)
                      }, {
                        default: n(() => [
                          b(d(o(a)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(c, {
                        type: "primary",
                        link: "",
                        onClick: (B) => D(r.label_id)
                      }, {
                        default: n(() => [
                          b(d(o(a)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [z, e.loading]
              ]),
              _("div", K, [
                t(P, {
                  "current-page": e.page,
                  "onUpdate:currentPage": l[3] || (l[3] = (r) => e.page = r),
                  "page-size": e.limit,
                  "onUpdate:pageSize": l[4] || (l[4] = (r) => e.limit = r),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: l[5] || (l[5] = (r) => s()),
                  onCurrentChange: s
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            t(q, {
              ref_key: "editMemberLabelDialog",
              ref: p,
              onComplete: s
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  ne as default
};
