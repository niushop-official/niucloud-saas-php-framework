import { defineComponent as H, ref as v, reactive as q, resolveComponent as d, resolveDirective as A, openBlock as p, createElementBlock as g, Fragment as w, createElementVNode as c, createVNode as l, withCtx as o, toDisplayString as i, unref as r, createTextVNode as h, withDirectives as G, createBlock as D, renderList as I, createCommentVNode as J } from "vue";
import { t as n, gC as K, gD as O } from "./core-shared-ca1fcae5.js";
import { ElMessage as Q, ElMessageBox as W } from "element-plus";
import { useRoute as X } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Y = { class: "main-container" }, Z = { class: "flex justify-between items-center" }, ee = { class: "text-page-title" }, te = { key: 0 }, ae = { key: 1 }, le = { class: "mt-[10px] flex items-center" }, ne = { class: "mt-[16px] flex justify-end" }, oe = ["innerHTML"], ge = /* @__PURE__ */ H({
  __name: "upgrade_records",
  setup(re) {
    const N = X().meta.title, x = v(), z = v(), t = q({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: ""
      }
    }), P = (s) => {
      s && (s.resetFields(), m());
    }, m = (s = 1) => {
      t.loading = !0, t.page = s, K({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((a) => {
        t.loading = !1, t.data = a.data.data, t.total = a.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    m();
    const k = v(""), b = v(!1), T = (s) => {
      k.value = s.fail_reason, b.value = !0;
    };
    let y = [];
    const B = (s) => {
      y = s.map((a) => a.id);
    }, F = () => {
      if (!y.length) {
        Q({ message: "请先勾选要删除的记录", type: "error", duration: 5e3 });
        return;
      }
      C(y);
    }, C = (s) => {
      W.confirm(
        n("deleteTips"),
        n("warning"),
        {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning"
        }
      ).then(() => {
        O({
          ids: s
        }).then(() => {
          m();
        }).catch(() => {
        });
      });
    };
    return (s, a) => {
      const U = d("el-input"), R = d("el-form-item"), _ = d("el-button"), M = d("el-form"), V = d("el-card"), u = d("el-table-column"), S = d("el-table"), $ = d("el-pagination"), E = d("el-scrollbar"), L = d("el-dialog"), j = A("loading");
      return p(), g(w, null, [
        c("div", Y, [
          l(V, {
            class: "box-card !border-none",
            shadow: "never"
          }, {
            default: o(() => [
              c("div", Z, [
                c("span", ee, i(r(N)), 1)
              ]),
              l(V, {
                class: "box-card !border-none my-[10px] table-search-wrap",
                shadow: "never"
              }, {
                default: o(() => [
                  l(M, {
                    inline: !0,
                    model: t.searchParam,
                    ref_key: "searchFormRef",
                    ref: x
                  }, {
                    default: o(() => [
                      l(R, {
                        label: r(n)("upgradeName"),
                        prop: "name"
                      }, {
                        default: o(() => [
                          l(U, {
                            modelValue: t.searchParam.name,
                            "onUpdate:modelValue": a[0] || (a[0] = (e) => t.searchParam.name = e),
                            modelModifiers: { trim: !0 },
                            placeholder: r(n)("upgradeNamePlaceholder")
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      l(R, null, {
                        default: o(() => [
                          l(_, {
                            type: "primary",
                            onClick: a[1] || (a[1] = (e) => m())
                          }, {
                            default: o(() => [
                              h(i(r(n)("search")), 1)
                            ]),
                            _: 1
                          }),
                          l(_, {
                            onClick: a[2] || (a[2] = (e) => P(x.value))
                          }, {
                            default: o(() => [
                              h(i(r(n)("reset")), 1)
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
              G((p(), D(S, {
                data: t.data,
                size: "large",
                ref_key: "tableRef",
                ref: z,
                onSelectionChange: B
              }, {
                empty: o(() => [
                  c("span", null, i(t.loading ? "" : r(n)("emptyData")), 1)
                ]),
                default: o(() => [
                  l(u, {
                    type: "selection",
                    width: "55"
                  }),
                  l(u, {
                    prop: "id",
                    label: r(n)("id"),
                    width: "140"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "name",
                    label: r(n)("upgradeName")
                  }, {
                    default: o(({ row: e }) => [
                      !e.content || typeof e.content == "string" ? (p(), g("div", te, " 【" + i(e.name) + "】从" + i(e.prev_version) + "升级到" + i(e.current_version), 1)) : (p(), g("div", ae, [
                        (p(!0), g(w, null, I(e.content.content, (f) => (p(), g("div", null, "【" + i(f.app.app_name) + "】从" + i(f.version) + "升级到" + i(f.upgrade_version), 1))), 256))
                      ]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(u, {
                    prop: "create_time",
                    label: r(n)("completeTime"),
                    width: "220px"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "status_name",
                    label: r(n)("status"),
                    width: "120px"
                  }, null, 8, ["label"]),
                  l(u, {
                    label: r(n)("operation"),
                    align: "right",
                    width: "160px"
                  }, {
                    default: o(({ row: e }) => [
                      e.status == "fail" ? (p(), D(_, {
                        key: 0,
                        type: "primary",
                        link: "",
                        onClick: (f) => T(e)
                      }, {
                        default: o(() => [
                          h(i(r(n)("failReason")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : J("", !0),
                      l(_, {
                        type: "primary",
                        link: "",
                        onClick: (f) => C(e.id)
                      }, {
                        default: o(() => [
                          h(i(r(n)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [j, t.loading]
              ]),
              c("div", le, [
                l(_, {
                  onClick: F,
                  size: "small"
                }, {
                  default: o(() => [
                    h(i(r(n)("batchDelete")), 1)
                  ]),
                  _: 1
                })
              ]),
              c("div", ne, [
                l($, {
                  "current-page": t.page,
                  "onUpdate:currentPage": a[3] || (a[3] = (e) => t.page = e),
                  "page-size": t.limit,
                  "onUpdate:pageSize": a[4] || (a[4] = (e) => t.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: t.total,
                  onSizeChange: a[5] || (a[5] = (e) => m()),
                  onCurrentChange: m
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            _: 1
          })
        ]),
        l(L, {
          modelValue: b.value,
          "onUpdate:modelValue": a[6] || (a[6] = (e) => b.value = e),
          title: r(n)("failReason"),
          width: "60%"
        }, {
          default: o(() => [
            l(E, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
              default: o(() => [
                c("div", { innerHTML: k.value }, null, 8, oe)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
export {
  ge as default
};
