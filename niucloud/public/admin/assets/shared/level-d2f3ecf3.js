import { defineComponent as $, reactive as R, ref as j, resolveComponent as s, resolveDirective as U, openBlock as d, createElementBlock as c, createVNode as t, withCtx as o, createElementVNode as u, toDisplayString as m, unref as r, createTextVNode as f, withDirectives as q, createBlock as G, Fragment as b, renderList as k, createCommentVNode as C } from "vue";
import { bl as P, t as l, d9 as A, bo as H, da as I } from "./core-shared-5b3bfa35.js";
import { ElMessageBox as J } from "element-plus";
import { useRoute as K, useRouter as O } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Q = { class: "main-container" }, W = { class: "flex justify-between items-center" }, X = { class: "text-page-title" }, Y = { class: "mt-[10px]" }, Z = { key: 0 }, ee = { key: 0 }, te = { class: "mt-[16px] flex justify-end" }, pe = /* @__PURE__ */ $({
  __name: "level",
  setup(le) {
    const L = K(), h = O(), N = L.meta.title, e = R({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        level_name: ""
      }
    }), y = j(), B = (i) => {
      i && (i.resetFields(), _());
    }, _ = (i = 1) => {
      e.loading = !0, e.page = i, A({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((a) => {
        e.loading = !1, e.data = a.data.data, e.total = a.data.total, H(e.page, e.limit, e.searchParam);
      }).catch(() => {
        e.loading = !1;
      });
    };
    _(P(e.searchParam).page);
    const T = () => {
      h.push({ path: "/member/level_edit" });
    }, V = (i) => {
      h.push({ path: "/member/level_edit", query: { id: i.level_id } });
    }, z = (i) => {
      J.confirm(
        l("memberLevelDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        I(i).then(() => {
          _(P(e.searchParam).page);
        }).catch(() => {
        });
      });
    };
    return (i, a) => {
      const g = s("el-button"), D = s("el-input"), w = s("el-form-item"), M = s("el-form"), x = s("el-card"), v = s("el-table-column"), E = s("el-table"), F = s("el-pagination"), S = U("loading");
      return d(), c("div", Q, [
        t(x, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            u("div", W, [
              u("span", X, m(r(N)), 1),
              t(g, {
                type: "primary",
                onClick: T
              }, {
                default: o(() => [
                  f(m(r(l)("addMemberLevel")), 1)
                ]),
                _: 1
              })
            ]),
            t(x, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                t(M, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: y
                }, {
                  default: o(() => [
                    t(w, {
                      label: r(l)("levelName"),
                      prop: "level_name"
                    }, {
                      default: o(() => [
                        t(D, {
                          modelValue: e.searchParam.level_name,
                          "onUpdate:modelValue": a[0] || (a[0] = (n) => e.searchParam.level_name = n),
                          modelModifiers: { trim: !0 },
                          placeholder: r(l)("levelNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(w, null, {
                      default: o(() => [
                        t(g, {
                          type: "primary",
                          onClick: a[1] || (a[1] = (n) => _())
                        }, {
                          default: o(() => [
                            f(m(r(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(g, {
                          onClick: a[2] || (a[2] = (n) => B(y.value))
                        }, {
                          default: o(() => [
                            f(m(r(l)("reset")), 1)
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
            u("div", Y, [
              q((d(), G(E, {
                data: e.data,
                size: "large"
              }, {
                empty: o(() => [
                  u("span", null, m(e.loading ? "" : r(l)("emptyData")), 1)
                ]),
                default: o(() => [
                  t(v, {
                    prop: "level_name",
                    label: r(l)("levelName"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(v, {
                    prop: "growth",
                    label: r(l)("growth"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(v, {
                    label: r(l)("levelBenefits"),
                    "min-width": "120",
                    "show-overflow-tooltip": !0
                  }, {
                    default: o(({ row: n }) => [
                      u("div", null, [
                        (d(!0), c(b, null, k(n.level_benefits, (p) => (d(), c(b, null, [
                          p.content ? (d(), c("div", Z, m(p.content), 1)) : C("", !0)
                        ], 64))), 256))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(v, {
                    label: r(l)("levelGifts"),
                    "min-width": "120"
                  }, {
                    default: o(({ row: n }) => [
                      u("div", null, [
                        (d(!0), c(b, null, k(n.level_gifts, (p) => (d(), c(b, null, [
                          p.content ? (d(), c("div", ee, m(p.content), 1)) : C("", !0)
                        ], 64))), 256))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(v, {
                    prop: "member_num",
                    label: r(l)("memberNumber"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(v, {
                    label: r(l)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: o(({ row: n }) => [
                      t(g, {
                        type: "primary",
                        link: "",
                        onClick: (p) => V(n)
                      }, {
                        default: o(() => [
                          f(m(r(l)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(g, {
                        type: "primary",
                        link: "",
                        onClick: (p) => z(n.level_id)
                      }, {
                        default: o(() => [
                          f(m(r(l)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [S, e.loading]
              ]),
              u("div", te, [
                t(F, {
                  "current-page": e.page,
                  "onUpdate:currentPage": a[3] || (a[3] = (n) => e.page = n),
                  "page-size": e.limit,
                  "onUpdate:pageSize": a[4] || (a[4] = (n) => e.limit = n),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: a[5] || (a[5] = (n) => _()),
                  onCurrentChange: _
                }, null, 8, ["current-page", "page-size", "total"])
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
  pe as default
};
