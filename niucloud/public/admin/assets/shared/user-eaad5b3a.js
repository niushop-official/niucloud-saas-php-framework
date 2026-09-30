import { defineComponent as j, reactive as A, ref as y, resolveComponent as p, resolveDirective as I, openBlock as c, createElementBlock as g, normalizeStyle as M, unref as l, createElementVNode as _, createVNode as i, withCtx as o, createTextVNode as d, toDisplayString as r, withDirectives as H, createBlock as h, createCommentVNode as k } from "vue";
import { _ as Q } from "./member_head-81b0c11e.js";
import { t as e, j as q, Q as G, R as J, S as K, T as O } from "./core-shared-c6ad4e77.js";
import W from "./edit-user-c7e6f5f8.js";
import { ElMessageBox as v } from "element-plus";
import X from "./index-c14157f3.js";
import Y from "./index-559a9b12.js";
import Z from "./index-997caa57.js";
import { useRoute as ee } from "vue-router";
import { u as te } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ae = { class: "table-fill-page__card" }, le = { class: "table-search-wrap table-search-wrap--panel flex justify-between items-center" }, ne = { class: "table-panel table-fill-page__panel" }, oe = { class: "table-fill-page__table" }, ie = { class: "w-[35px] h-[35px] flex items-center justify-center" }, se = ["src"], re = {
  key: 1,
  src: Q,
  class: "w-[35px] rounded-full"
}, ce = { key: 0 }, me = { key: 1 }, Ne = /* @__PURE__ */ j({
  __name: "user",
  setup(ue) {
    const C = ee().meta.title, { pageRef: D, pageStyle: U } = te(), N = (n) => [
      { label: e("edit"), onClick: () => R(n) },
      { label: n.status ? e("lock") : e("unlock"), onClick: () => n.status ? E(n.uid) : L(n.uid) },
      { label: e("delete"), type: "danger", onClick: () => V(n.uid) }
    ], a = A({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        search: "",
        user_type: ""
      }
    }), pe = y("userList"), w = y(), B = (n) => {
      n && (n.resetFields(), m());
    }, m = (n = 1) => {
      a.loading = !0, a.page = n, G({
        page: a.page,
        limit: a.limit,
        username: a.searchParam.search,
        user_type: a.searchParam.user_type
      }).then((s) => {
        a.loading = !1, a.data = s.data.data, a.total = s.data.total;
      }).catch(() => {
        a.loading = !1;
      });
    };
    m();
    const f = y(null), P = () => {
      f.value.setFormData(), f.value.showDialog = !0;
    }, R = (n) => {
      f.value.setFormData(n), f.value.showDialog = !0;
    }, E = (n) => {
      v.confirm(
        e("userLockTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        J(n).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, L = (n) => {
      v.confirm(
        e("userUnlockTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        K(n).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, V = (n) => {
      v.confirm(
        e("userDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        O(n).then(() => {
          m();
        }).catch(() => {
        });
      });
    };
    return (n, s) => {
      const z = p("el-input"), x = p("el-form-item"), b = p("el-button"), F = p("el-form"), u = p("el-table-column"), T = p("el-tag"), S = p("el-table"), $ = I("loading");
      return c(), g("div", {
        ref_key: "pageRef",
        ref: D,
        class: "main-container table-fill-page",
        style: M(l(U))
      }, [
        _("div", ae, [
          _("div", le, [
            i(F, {
              inline: !0,
              model: a.searchParam,
              ref_key: "searchFormRef",
              ref: w
            }, {
              default: o(() => [
                i(x, {
                  label: l(e)("accountNumber"),
                  prop: "search"
                }, {
                  default: o(() => [
                    i(z, {
                      modelValue: a.searchParam.search,
                      "onUpdate:modelValue": s[0] || (s[0] = (t) => a.searchParam.search = t),
                      modelModifiers: { trim: !0 },
                      class: "input-width",
                      placeholder: l(e)("accountNumberPlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                i(x, null, {
                  default: o(() => [
                    i(b, {
                      type: "primary",
                      onClick: s[1] || (s[1] = (t) => m())
                    }, {
                      default: o(() => [
                        d(r(l(e)("search")), 1)
                      ]),
                      _: 1
                    }),
                    i(b, {
                      onClick: s[2] || (s[2] = (t) => B(w.value))
                    }, {
                      default: o(() => [
                        d(r(l(e)("reset")), 1)
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
          _("div", ne, [
            i(Z, {
              title: l(C),
              selectable: !1
            }, {
              actions: o(() => [
                i(b, {
                  type: "primary",
                  onClick: P
                }, {
                  default: o(() => [
                    d(r(l(e)("addUser")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            _("div", oe, [
              H((c(), h(S, {
                height: "100%",
                data: a.data,
                size: "large"
              }, {
                empty: o(() => [
                  _("span", null, r(a.loading ? "" : l(e)("emptyData")), 1)
                ]),
                default: o(() => [
                  i(u, {
                    label: l(e)("headImg"),
                    width: "100",
                    align: "left"
                  }, {
                    default: o(({ row: t }) => [
                      _("div", ie, [
                        t.head_img ? (c(), g("img", {
                          key: 0,
                          src: l(q)(t.head_img),
                          class: "w-[35px] rounded-full"
                        }, null, 8, se)) : (c(), g("img", re))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(u, {
                    prop: "username",
                    label: l(e)("accountNumber"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  i(u, {
                    prop: "real_name",
                    label: l(e)("userRealName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, {
                    default: o(({ row: t }) => [
                      _("span", null, r(t.real_name ? t.real_name : "--"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(u, {
                    label: l(e)("userRoleName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, {
                    default: o(({ row: t }) => [
                      t.is_admin ? (c(), g("span", ce, r(l(e)("administrator")), 1)) : t.role_array.length ? (c(), g("span", me, r(t.role_array.join(" | ")), 1)) : k("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(u, {
                    label: l(e)("status"),
                    "min-width": "90",
                    align: "center"
                  }, {
                    default: o(({ row: t }) => [
                      t.status == 1 ? (c(), h(T, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: o(() => [
                          d(r(l(e)("statusUnlock")), 1)
                        ]),
                        _: 1
                      })) : k("", !0),
                      t.status == 0 ? (c(), h(T, {
                        key: 1,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: o(() => [
                          d(r(l(e)("statusLock")), 1)
                        ]),
                        _: 1
                      })) : k("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(u, {
                    prop: "last_time",
                    label: l(e)("lastLoginTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: o(({ row: t }) => [
                      d(r(t.last_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(u, {
                    label: l(e)("lastLoginIP"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: o(({ row: t }) => [
                      d(r(t.last_ip || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  i(u, {
                    label: l(e)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "180"
                  }, {
                    default: o(({ row: t }) => [
                      t.is_admin != 1 ? (c(), h(X, {
                        key: 0,
                        actions: N(t)
                      }, null, 8, ["actions"])) : (c(), h(b, {
                        key: 1,
                        link: "",
                        disabled: ""
                      }, {
                        default: o(() => [
                          d(r(l(e)("adminDisabled")), 1)
                        ]),
                        _: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [$, a.loading]
              ])
            ]),
            i(Y, {
              "current-page": a.page,
              "onUpdate:current-page": s[3] || (s[3] = (t) => a.page = t),
              "page-size": a.limit,
              "onUpdate:page-size": s[4] || (s[4] = (t) => a.limit = t),
              total: a.total,
              onSizeChange: s[5] || (s[5] = (t) => m()),
              onCurrentChange: m
            }, null, 8, ["current-page", "page-size", "total"])
          ]),
          i(W, {
            ref_key: "editUserDialog",
            ref: f,
            onComplete: s[6] || (s[6] = (t) => m())
          }, null, 512)
        ])
      ], 4);
    };
  }
});
export {
  Ne as default
};
