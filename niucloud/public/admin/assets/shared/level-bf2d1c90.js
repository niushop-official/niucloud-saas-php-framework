import { defineComponent as j, reactive as U, ref as q, resolveComponent as m, resolveDirective as G, openBlock as d, createElementBlock as u, normalizeStyle as H, unref as a, createVNode as t, withCtx as r, createElementVNode as p, toDisplayString as s, createTextVNode as v, withDirectives as A, createBlock as I, Fragment as b, renderList as k, createCommentVNode as C } from "vue";
import { bt as P, t as l, dp as J, bw as K, dq as O } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as Q } from "element-plus";
import { useRoute as W, useRouter as X } from "vue-router";
import { u as Y } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Z = { class: "flex justify-between items-center" }, ee = { class: "text-page-title" }, te = { class: "mt-[10px] table-fill-page__panel" }, le = { class: "table-fill-page__table" }, ae = { key: 0 }, ne = { key: 0 }, oe = { class: "mt-[16px] flex justify-end" }, fe = /* @__PURE__ */ j({
  __name: "level",
  setup(re) {
    const L = W(), h = X(), N = L.meta.title, { pageRef: T, pageStyle: z } = Y(), e = U({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        level_name: ""
      }
    }), y = q(), B = (i) => {
      i && (i.resetFields(), _());
    }, _ = (i = 1) => {
      e.loading = !0, e.page = i, J({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((n) => {
        e.loading = !1, e.data = n.data.data, e.total = n.data.total, K(e.page, e.limit, e.searchParam);
      }).catch(() => {
        e.loading = !1;
      });
    };
    _(P(e.searchParam).page);
    const V = () => {
      h.push({ path: "/member/level_edit" });
    }, D = (i) => {
      h.push({ path: "/member/level_edit", query: { id: i.level_id } });
    }, M = (i) => {
      Q.confirm(
        l("memberLevelDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        O(i).then(() => {
          _(P(e.searchParam).page);
        }).catch(() => {
        });
      });
    };
    return (i, n) => {
      const f = m("el-button"), R = m("el-input"), w = m("el-form-item"), S = m("el-form"), x = m("el-card"), g = m("el-table-column"), E = m("el-table"), F = m("el-pagination"), $ = G("loading");
      return d(), u("div", {
        ref_key: "pageRef",
        ref: T,
        class: "main-container table-fill-page",
        style: H(a(z))
      }, [
        t(x, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: r(() => [
            p("div", Z, [
              p("span", ee, s(a(N)), 1),
              t(f, {
                type: "primary",
                onClick: V
              }, {
                default: r(() => [
                  v(s(a(l)("addMemberLevel")), 1)
                ]),
                _: 1
              })
            ]),
            t(x, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: r(() => [
                t(S, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: y
                }, {
                  default: r(() => [
                    t(w, {
                      label: a(l)("levelName"),
                      prop: "level_name"
                    }, {
                      default: r(() => [
                        t(R, {
                          modelValue: e.searchParam.level_name,
                          "onUpdate:modelValue": n[0] || (n[0] = (o) => e.searchParam.level_name = o),
                          modelModifiers: { trim: !0 },
                          placeholder: a(l)("levelNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(w, null, {
                      default: r(() => [
                        t(f, {
                          type: "primary",
                          onClick: n[1] || (n[1] = (o) => _())
                        }, {
                          default: r(() => [
                            v(s(a(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(f, {
                          onClick: n[2] || (n[2] = (o) => B(y.value))
                        }, {
                          default: r(() => [
                            v(s(a(l)("reset")), 1)
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
            p("div", te, [
              p("div", le, [
                A((d(), I(E, {
                  height: "100%",
                  data: e.data,
                  size: "large"
                }, {
                  empty: r(() => [
                    p("span", null, s(e.loading ? "" : a(l)("emptyData")), 1)
                  ]),
                  default: r(() => [
                    t(g, {
                      prop: "level_name",
                      label: a(l)("levelName"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(g, {
                      prop: "growth",
                      label: a(l)("growth"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(g, {
                      label: a(l)("levelBenefits"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, {
                      default: r(({ row: o }) => [
                        p("div", null, [
                          (d(!0), u(b, null, k(o.level_benefits, (c) => (d(), u(b, null, [
                            c.content ? (d(), u("div", ae, s(c.content), 1)) : C("", !0)
                          ], 64))), 256))
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(g, {
                      label: a(l)("levelGifts"),
                      "min-width": "120"
                    }, {
                      default: r(({ row: o }) => [
                        p("div", null, [
                          (d(!0), u(b, null, k(o.level_gifts, (c) => (d(), u(b, null, [
                            c.content ? (d(), u("div", ne, s(c.content), 1)) : C("", !0)
                          ], 64))), 256))
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(g, {
                      prop: "member_num",
                      label: a(l)("memberNumber"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(g, {
                      label: a(l)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "130"
                    }, {
                      default: r(({ row: o }) => [
                        t(f, {
                          type: "primary",
                          link: "",
                          onClick: (c) => D(o)
                        }, {
                          default: r(() => [
                            v(s(a(l)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(f, {
                          type: "primary",
                          link: "",
                          onClick: (c) => M(o.level_id)
                        }, {
                          default: r(() => [
                            v(s(a(l)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [$, e.loading]
                ])
              ]),
              p("div", oe, [
                t(F, {
                  "current-page": e.page,
                  "onUpdate:current-page": n[3] || (n[3] = (o) => e.page = o),
                  "page-size": e.limit,
                  "onUpdate:page-size": n[4] || (n[4] = (o) => e.limit = o),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: n[5] || (n[5] = (o) => _()),
                  onCurrentChange: _
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  fe as default
};
