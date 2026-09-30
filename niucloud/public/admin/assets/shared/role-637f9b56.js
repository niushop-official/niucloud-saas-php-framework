import { defineComponent as V, reactive as U, ref as h, resolveComponent as c, resolveDirective as L, openBlock as v, createElementBlock as M, normalizeStyle as j, unref as r, createElementVNode as f, createVNode as l, withCtx as n, createTextVNode as p, toDisplayString as m, withDirectives as H, createBlock as y } from "vue";
import { t as o, x as q, y as A, z as G } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as I } from "element-plus";
import J from "./edit-role-8d579ed5.js";
import K from "./index-559a9b12.js";
import O from "./index-997caa57.js";
import { useRoute as Q } from "vue-router";
import { u as W } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const X = { class: "table-fill-page__card" }, Y = { class: "table-search-wrap table-search-wrap--panel flex justify-between items-center" }, Z = { class: "table-panel table-fill-page__panel" }, ee = { class: "table-fill-page__table" }, _e = /* @__PURE__ */ V({
  __name: "role",
  setup(te) {
    const T = Q().meta.title, { pageRef: $, pageStyle: P } = W(), e = U({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        search: ""
      }
    }), k = h(), z = (i) => {
      i && (i.resetFields(), s());
    }, s = (i = 1) => {
      e.loading = !0, e.page = i, q({
        page: e.page,
        limit: e.limit,
        role_name: e.searchParam.search
      }).then((t) => {
        e.loading = !1, e.data = t.data.data, e.total = t.data.total;
      }).catch(() => {
        e.loading = !1;
      });
    };
    s();
    const d = h(null), N = () => {
      d.value.setFormData(), d.value.showDialog = !0;
    }, w = (i) => {
      d.value.setFormData(i), d.value.showDialog = !0;
    }, B = (i) => {
      I.confirm(
        o("roleDeleteTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning"
        }
      ).then(() => {
        A(i).then(() => {
          s();
        }).catch(() => {
        });
      });
    }, _ = h(!1), C = (i, t) => {
      _.value || (_.value = !0, G({
        role_id: i,
        status: t
      }).then((R) => {
        s(), _.value = !1;
      }).catch(() => {
        _.value = !1;
      }));
    };
    return (i, t) => {
      const R = c("el-input"), D = c("el-form-item"), u = c("el-button"), E = c("el-form"), g = c("el-table-column"), x = c("el-tag"), F = c("el-table"), S = L("loading");
      return v(), M("div", {
        ref_key: "pageRef",
        ref: $,
        class: "main-container table-fill-page",
        style: j(r(P))
      }, [
        f("div", X, [
          f("div", Y, [
            l(E, {
              inline: !0,
              model: e.searchParam,
              ref_key: "searchFormRef",
              ref: k
            }, {
              default: n(() => [
                l(D, {
                  label: r(o)("roleName"),
                  prop: "search"
                }, {
                  default: n(() => [
                    l(R, {
                      modelValue: e.searchParam.search,
                      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.searchParam.search = a),
                      modelModifiers: { trim: !0 },
                      class: "w-[240px]",
                      placeholder: r(o)("roleNamePlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(D, null, {
                  default: n(() => [
                    l(u, {
                      type: "primary",
                      onClick: t[1] || (t[1] = (a) => s())
                    }, {
                      default: n(() => [
                        p(m(r(o)("search")), 1)
                      ]),
                      _: 1
                    }),
                    l(u, {
                      onClick: t[2] || (t[2] = (a) => z(k.value))
                    }, {
                      default: n(() => [
                        p(m(r(o)("reset")), 1)
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
          f("div", Z, [
            l(O, {
              title: r(T),
              selectable: !1
            }, {
              actions: n(() => [
                l(u, {
                  type: "primary",
                  onClick: N
                }, {
                  default: n(() => [
                    p(m(r(o)("addRole")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            f("div", ee, [
              H((v(), y(F, {
                height: "100%",
                data: e.data,
                size: "large"
              }, {
                empty: n(() => [
                  f("span", null, m(e.loading ? "" : r(o)("emptyData")), 1)
                ]),
                default: n(() => [
                  l(g, {
                    prop: "role_name",
                    label: r(o)("roleName")
                  }, null, 8, ["label"]),
                  l(g, {
                    label: r(o)("status")
                  }, {
                    default: n(({ row: a }) => [
                      a.status == 1 ? (v(), y(x, {
                        key: 0,
                        type: "success",
                        onClick: (b) => C(a.role_id, 0),
                        class: "cursor-pointer"
                      }, {
                        default: n(() => [
                          p(m(a.status_name), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : (v(), y(x, {
                        key: 1,
                        type: "error",
                        onClick: (b) => C(a.role_id, 1),
                        class: "cursor-pointer"
                      }, {
                        default: n(() => [
                          p(m(a.status_name), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(g, {
                    prop: "create_time",
                    label: r(o)("createTime")
                  }, null, 8, ["label"]),
                  l(g, {
                    label: r(o)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: n(({ row: a }) => [
                      l(u, {
                        type: "primary",
                        link: "",
                        onClick: (b) => w(a)
                      }, {
                        default: n(() => [
                          p(m(r(o)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      l(u, {
                        type: "primary",
                        link: "",
                        onClick: (b) => B(a.role_id)
                      }, {
                        default: n(() => [
                          p(m(r(o)("delete")), 1)
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
              ])
            ]),
            l(K, {
              "current-page": e.page,
              "onUpdate:current-page": t[3] || (t[3] = (a) => e.page = a),
              "page-size": e.limit,
              "onUpdate:page-size": t[4] || (t[4] = (a) => e.limit = a),
              total: e.total,
              onSizeChange: t[5] || (t[5] = (a) => s()),
              onCurrentChange: s
            }, null, 8, ["current-page", "page-size", "total"])
          ]),
          l(J, {
            ref_key: "editRoleDialog",
            ref: d,
            onComplete: t[6] || (t[6] = (a) => s())
          }, null, 512)
        ])
      ], 4);
    };
  }
});
export {
  _e as default
};
