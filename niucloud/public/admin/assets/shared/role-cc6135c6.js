import { defineComponent as j, reactive as S, ref as y, resolveComponent as s, resolveDirective as U, openBlock as v, createElementBlock as L, createVNode as a, withCtx as n, createElementVNode as p, toDisplayString as c, unref as r, createTextVNode as d, withDirectives as M, createBlock as b } from "vue";
import { t as o, f as q, h as A, j as G } from "./core-shared-9b1e55e9.js";
import { ElMessageBox as H } from "element-plus";
import I from "./edit-role-653aff06.js";
import { useRoute as J } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const K = { class: "main-container" }, O = { class: "flex justify-between items-center" }, Q = { class: "text-page-title" }, W = { class: "flex justify-between items-center mt-[20px]" }, X = { class: "mt-[16px] flex justify-end" }, ce = /* @__PURE__ */ j({
  __name: "role",
  setup(Y) {
    const $ = J().meta.title, e = S({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        search: ""
      }
    }), k = y(), w = (i) => {
      i && (i.resetFields(), m());
    }, m = (i = 1) => {
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
    m();
    const u = y(null), N = () => {
      u.value.setFormData(), u.value.showDialog = !0;
    }, P = (i) => {
      u.value.setFormData(i), u.value.showDialog = !0;
    }, z = (i) => {
      H.confirm(
        o("roleDeleteTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning"
        }
      ).then(() => {
        A(i).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, f = y(!1), x = (i, t) => {
      f.value || (f.value = !0, G({
        role_id: i,
        status: t
      }).then((C) => {
        m(), f.value = !1;
      }).catch(() => {
        f.value = !1;
      }));
    };
    return (i, t) => {
      const C = s("el-input"), D = s("el-form-item"), _ = s("el-button"), B = s("el-form"), g = s("el-table-column"), R = s("el-tag"), E = s("el-table"), F = s("el-pagination"), T = s("el-card"), V = U("loading");
      return v(), L("div", K, [
        a(T, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            p("div", O, [
              p("span", Q, c(r($)), 1)
            ]),
            p("div", W, [
              a(B, {
                inline: !0,
                model: e.searchParam,
                ref_key: "searchFormRef",
                ref: k
              }, {
                default: n(() => [
                  a(D, {
                    label: r(o)("roleName"),
                    prop: "search"
                  }, {
                    default: n(() => [
                      a(C, {
                        modelValue: e.searchParam.search,
                        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.searchParam.search = l),
                        modelModifiers: { trim: !0 },
                        class: "w-[240px]",
                        placeholder: r(o)("roleNamePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(D, null, {
                    default: n(() => [
                      a(_, {
                        type: "primary",
                        onClick: t[1] || (t[1] = (l) => m())
                      }, {
                        default: n(() => [
                          d(c(r(o)("search")), 1)
                        ]),
                        _: 1
                      }),
                      a(_, {
                        onClick: t[2] || (t[2] = (l) => w(k.value))
                      }, {
                        default: n(() => [
                          d(c(r(o)("reset")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              a(_, {
                type: "primary",
                class: "w-[100px] self-start",
                onClick: N
              }, {
                default: n(() => [
                  d(c(r(o)("addRole")), 1)
                ]),
                _: 1
              })
            ]),
            p("div", null, [
              M((v(), b(E, {
                data: e.data,
                size: "large"
              }, {
                empty: n(() => [
                  p("span", null, c(e.loading ? "" : r(o)("emptyData")), 1)
                ]),
                default: n(() => [
                  a(g, {
                    prop: "role_name",
                    label: r(o)("roleName")
                  }, null, 8, ["label"]),
                  a(g, {
                    label: r(o)("status")
                  }, {
                    default: n(({ row: l }) => [
                      l.status == 1 ? (v(), b(R, {
                        key: 0,
                        type: "success",
                        onClick: (h) => x(l.role_id, 0),
                        class: "cursor-pointer"
                      }, {
                        default: n(() => [
                          d(c(l.status_name), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : (v(), b(R, {
                        key: 1,
                        type: "error",
                        onClick: (h) => x(l.role_id, 1),
                        class: "cursor-pointer"
                      }, {
                        default: n(() => [
                          d(c(l.status_name), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(g, {
                    prop: "create_time",
                    label: r(o)("createTime")
                  }, null, 8, ["label"]),
                  a(g, {
                    label: r(o)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: n(({ row: l }) => [
                      a(_, {
                        type: "primary",
                        link: "",
                        onClick: (h) => P(l)
                      }, {
                        default: n(() => [
                          d(c(r(o)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a(_, {
                        type: "primary",
                        link: "",
                        onClick: (h) => z(l.role_id)
                      }, {
                        default: n(() => [
                          d(c(r(o)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [V, e.loading]
              ]),
              p("div", X, [
                a(F, {
                  "current-page": e.page,
                  "onUpdate:currentPage": t[3] || (t[3] = (l) => e.page = l),
                  "page-size": e.limit,
                  "onUpdate:pageSize": t[4] || (t[4] = (l) => e.limit = l),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: t[5] || (t[5] = (l) => m()),
                  onCurrentChange: m
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            a(I, {
              ref_key: "editRoleDialog",
              ref: u,
              onComplete: t[6] || (t[6] = (l) => m())
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  ce as default
};
