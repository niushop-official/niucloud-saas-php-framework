import { defineComponent as L, ref as M, reactive as R, resolveComponent as m, resolveDirective as U, openBlock as l, createElementBlock as i, createVNode as n, withCtx as o, createElementVNode as r, withModifiers as q, unref as p, createTextVNode as v, toDisplayString as u, withDirectives as A, createBlock as b, Fragment as g, renderList as k, createCommentVNode as w, pushScopeId as H, popScopeId as J } from "vue";
import { t as s, fw as K, fx as O, _ as Q } from "./core-shared-11c0a673.js";
import { ElMessageBox as W } from "element-plus";
import { useRouter as X } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const z = (y) => (H("data-v-152a56f2"), y = y(), J(), y), Y = { class: "main-container" }, Z = { class: "flex justify-between items-center" }, ee = { class: "flex justify-between items-center" }, te = { class: "mt-[20px] table-wrap" }, oe = { class: "flex flex-wrap gap-[8px] max-w-[315x]" }, le = ["src"], ae = { class: "mt-1" }, ne = { class: "flex items-center overflow-hidden whitespace-nowrap" }, se = ["src"], ie = {
  key: 0,
  class: "flex items-end h-[65px]"
}, re = /* @__PURE__ */ z(() => /* @__PURE__ */ r("span", { class: "ml-1 text-sm" }, "...", -1)), pe = [
  re
], de = { class: "flex flex-wrap gap-[8px] max-w-[315px]" }, ce = ["src"], _e = { class: "mt-1" }, me = { class: "flex items-center overflow-hidden whitespace-nowrap min-w-[250px]" }, ue = ["src"], fe = {
  key: 0,
  class: "flex items-end h-[65px]"
}, ge = /* @__PURE__ */ z(() => /* @__PURE__ */ r("span", { class: "ml-1 text-sm" }, "...", -1)), he = [
  ge
], xe = { class: "mt-[16px] flex justify-end" }, ve = /* @__PURE__ */ L({
  __name: "group",
  setup(y) {
    const C = X(), S = M(), t = R({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        keywords: ""
      }
    }), B = (c) => {
      c && (c.resetFields(), f());
    }, f = (c = 1) => {
      t.loading = !0, t.page = c, K({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((a) => {
        t.loading = !1, t.data = a.data.data, t.total = a.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    f();
    const D = () => {
      C.push("/admin/site/group_edit");
    }, T = (c) => {
      C.push({ path: "/admin/site/group_edit", query: { id: c.group_id } });
    }, E = (c) => {
      W.confirm(
        s("groupDeleteTips"),
        s("warning"),
        {
          confirmButtonText: s("confirm"),
          cancelButtonText: s("cancel"),
          type: "warning"
        }
      ).then(() => {
        O(c).then(() => {
          f();
        }).catch(() => {
        });
      });
    };
    return (c, a) => {
      const F = m("el-input"), N = m("el-form-item"), h = m("el-button"), G = m("el-form"), P = m("el-card"), x = m("el-table-column"), V = m("el-tooltip"), $ = m("el-table"), j = m("el-pagination"), I = U("loading");
      return l(), i("div", Y, [
        n(P, {
          class: "box-card !border-none setting-card",
          shadow: "never"
        }, {
          default: o(() => [
            n(P, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                r("div", Z, [
                  n(G, {
                    inline: !0,
                    model: t.searchParam,
                    ref_key: "searchFormRef",
                    ref: S,
                    onSubmit: a[3] || (a[3] = q(() => {
                    }, ["prevent"])),
                    class: "search-form"
                  }, {
                    default: o(() => [
                      n(N, { prop: "keywords" }, {
                        default: o(() => [
                          n(F, {
                            modelValue: t.searchParam.keywords,
                            "onUpdate:modelValue": a[0] || (a[0] = (e) => t.searchParam.keywords = e),
                            modelModifiers: { trim: !0 },
                            placeholder: p(s)("groupNamePlaceholder")
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      n(N, null, {
                        default: o(() => [
                          n(h, {
                            type: "primary",
                            onClick: a[1] || (a[1] = (e) => f())
                          }, {
                            default: o(() => [
                              v(u(p(s)("search")), 1)
                            ]),
                            _: 1
                          }),
                          n(h, {
                            onClick: a[2] || (a[2] = (e) => B(S.value))
                          }, {
                            default: o(() => [
                              v(u(p(s)("reset")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"]),
                  r("div", ee, [
                    n(h, {
                      type: "primary",
                      class: "w-[100px]",
                      onClick: D
                    }, {
                      default: o(() => [
                        v(u(p(s)("addSiteGroup")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              _: 1
            }),
            r("div", te, [
              A((l(), b($, {
                data: t.data,
                size: "large"
              }, {
                empty: o(() => [
                  r("span", null, u(t.loading ? "" : p(s)("emptyData")), 1)
                ]),
                default: o(() => [
                  n(x, {
                    prop: "group_name",
                    label: p(s)("groupName"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  n(x, {
                    label: p(s)("appName"),
                    "min-width": "250"
                  }, {
                    default: o(({ row: e }) => [
                      e.app_list.length > 0 ? (l(), b(V, {
                        key: 0,
                        effect: "dark",
                        placement: "top-start",
                        "popper-class": "tip-class"
                      }, {
                        content: o(() => [
                          r("div", oe, [
                            (l(!0), i(g, null, k(e.app_list, (d, _) => (l(), i("div", {
                              key: _,
                              class: "flex flex-col items-center"
                            }, [
                              r("img", {
                                src: d.icon,
                                class: "w-[54px] h-[54px] rounded-[4px]"
                              }, null, 8, le),
                              r("span", ae, u(d.title), 1)
                            ]))), 128))
                          ])
                        ]),
                        default: o(() => [
                          r("div", ne, [
                            (l(!0), i(g, null, k(e.app_list, (d, _) => (l(), i("div", { key: _ }, [
                              _ < 4 ? (l(), i("img", {
                                key: 0,
                                src: d.icon,
                                class: "w-[54px] h-[54px] mr-[8px] shrink-0 rounded-[4px]"
                              }, null, 8, se)) : w("", !0)
                            ]))), 128)),
                            e.app_list.length > 4 ? (l(), i("div", ie, pe)) : w("", !0)
                          ])
                        ]),
                        _: 2
                      }, 1024)) : (l(), i(g, { key: 1 }, [], 64))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(x, {
                    label: p(s)("addonName"),
                    "min-width": "250"
                  }, {
                    default: o(({ row: e }) => [
                      e.addon_list.length > 0 ? (l(), b(V, {
                        key: 0,
                        effect: "dark",
                        placement: "top-start",
                        "popper-class": "tip-class"
                      }, {
                        content: o(() => [
                          r("div", de, [
                            (l(!0), i(g, null, k(e.addon_list, (d, _) => (l(), i("div", {
                              key: _,
                              class: "flex flex-col items-center"
                            }, [
                              r("img", {
                                src: d.icon,
                                class: "w-[54px] h-[54px] rounded-[4px]"
                              }, null, 8, ce),
                              r("span", _e, u(d.title), 1)
                            ]))), 128))
                          ])
                        ]),
                        default: o(() => [
                          r("div", me, [
                            (l(!0), i(g, null, k(e.addon_list, (d, _) => (l(), i("div", { key: _ }, [
                              _ < 4 ? (l(), i("img", {
                                key: 0,
                                src: d.icon,
                                class: "w-[54px] h-[54px] mr-[8px] shrink-0 rounded-[4px]"
                              }, null, 8, ue)) : w("", !0)
                            ]))), 128)),
                            e.addon_list.length > 4 ? (l(), i("div", fe, he)) : w("", !0)
                          ])
                        ]),
                        _: 2
                      }, 1024)) : (l(), i(g, { key: 1 }, [], 64))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(x, {
                    prop: "create_time",
                    label: p(s)("createTime"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  n(x, {
                    prop: "group_roles",
                    label: p(s)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "120"
                  }, {
                    default: o(({ row: e }) => [
                      n(h, {
                        type: "primary",
                        link: "",
                        onClick: (d) => T(e)
                      }, {
                        default: o(() => [
                          v(u(p(s)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(h, {
                        type: "primary",
                        link: "",
                        onClick: (d) => E(e.group_id)
                      }, {
                        default: o(() => [
                          v(u(p(s)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [I, t.loading]
              ]),
              r("div", xe, [
                n(j, {
                  "current-page": t.page,
                  "onUpdate:currentPage": a[4] || (a[4] = (e) => t.page = e),
                  "page-size": t.limit,
                  "onUpdate:pageSize": a[5] || (a[5] = (e) => t.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: t.total,
                  onSizeChange: a[6] || (a[6] = (e) => f()),
                  onCurrentChange: f
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
const Ve = /* @__PURE__ */ Q(ve, [["__scopeId", "data-v-152a56f2"]]);
export {
  Ve as default
};
