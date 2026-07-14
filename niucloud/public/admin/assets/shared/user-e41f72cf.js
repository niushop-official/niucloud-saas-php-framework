import { defineComponent as S, reactive as I, ref as v, resolveComponent as u, resolveDirective as M, openBlock as c, createElementBlock as g, createVNode as o, withCtx as l, createElementVNode as f, toDisplayString as s, unref as a, createTextVNode as d, withDirectives as A, createBlock as y, createCommentVNode as b } from "vue";
import { _ as q } from "./member_head-81b0c11e.js";
import { t as e, i as G, A as H, B as J, C as K, D as O } from "./core-shared-11c0a673.js";
import Q from "./edit-user-48b5d617.js";
import { ElMessageBox as x } from "element-plus";
import { useRoute as W } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const X = { class: "main-container" }, Y = { class: "flex justify-between items-center" }, Z = { class: "text-page-title" }, ee = { class: "flex justify-between items-center mt-[20px]" }, te = { class: "w-[35px] h-[35px] flex items-center justify-center" }, ae = ["src"], le = {
  key: 1,
  src: q,
  class: "w-[35px] rounded-full"
}, ne = { key: 0 }, oe = { key: 1 }, ie = { key: 0 }, se = { key: 1 }, re = { class: "mt-[16px] flex justify-end" }, xe = /* @__PURE__ */ S({
  __name: "user",
  setup(ce) {
    const U = W().meta.title, n = I({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        search: "",
        user_type: ""
      }
    }), me = v("userList"), w = v(), T = (r) => {
      r && (r.resetFields(), m());
    }, m = (r = 1) => {
      n.loading = !0, n.page = r, H({
        page: n.page,
        limit: n.limit,
        username: n.searchParam.search,
        user_type: n.searchParam.user_type
      }).then((i) => {
        n.loading = !1, n.data = i.data.data, n.total = i.data.total;
      }).catch(() => {
        n.loading = !1;
      });
    };
    m();
    const h = v(null), B = () => {
      h.value.setFormData(), h.value.showDialog = !0;
    }, N = (r) => {
      h.value.setFormData(r), h.value.showDialog = !0;
    }, P = (r) => {
      x.confirm(
        e("userLockTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        J(r).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, $ = (r) => {
      x.confirm(
        e("userUnlockTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        K(r).then(() => {
          m();
        }).catch(() => {
        });
      });
    }, E = (r) => {
      x.confirm(
        e("userDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        O(r).then(() => {
          m();
        }).catch(() => {
        });
      });
    };
    return (r, i) => {
      const L = u("el-input"), C = u("el-form-item"), p = u("el-button"), V = u("el-form"), _ = u("el-table-column"), D = u("el-tag"), j = u("el-table"), z = u("el-pagination"), F = u("el-card"), R = M("loading");
      return c(), g("div", X, [
        o(F, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            f("div", Y, [
              f("span", Z, s(a(U)), 1)
            ]),
            f("div", ee, [
              o(V, {
                inline: !0,
                model: n.searchParam,
                ref_key: "searchFormRef",
                ref: w
              }, {
                default: l(() => [
                  o(C, {
                    label: a(e)("accountNumber"),
                    prop: "search"
                  }, {
                    default: l(() => [
                      o(L, {
                        modelValue: n.searchParam.search,
                        "onUpdate:modelValue": i[0] || (i[0] = (t) => n.searchParam.search = t),
                        modelModifiers: { trim: !0 },
                        class: "input-width",
                        placeholder: a(e)("accountNumberPlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(C, null, {
                    default: l(() => [
                      o(p, {
                        type: "primary",
                        onClick: i[1] || (i[1] = (t) => m())
                      }, {
                        default: l(() => [
                          d(s(a(e)("search")), 1)
                        ]),
                        _: 1
                      }),
                      o(p, {
                        onClick: i[2] || (i[2] = (t) => T(w.value))
                      }, {
                        default: l(() => [
                          d(s(a(e)("reset")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              o(p, {
                type: "primary",
                class: "w-[100px] self-start",
                onClick: B
              }, {
                default: l(() => [
                  d(s(a(e)("addUser")), 1)
                ]),
                _: 1
              })
            ]),
            f("div", null, [
              A((c(), y(j, {
                data: n.data,
                size: "large"
              }, {
                empty: l(() => [
                  f("span", null, s(n.loading ? "" : a(e)("emptyData")), 1)
                ]),
                default: l(() => [
                  o(_, {
                    label: a(e)("headImg"),
                    width: "100",
                    align: "left"
                  }, {
                    default: l(({ row: t }) => [
                      f("div", te, [
                        t.head_img ? (c(), g("img", {
                          key: 0,
                          src: a(G)(t.head_img),
                          class: "w-[35px] rounded-full"
                        }, null, 8, ae)) : (c(), g("img", le))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(_, {
                    prop: "username",
                    label: a(e)("accountNumber"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  o(_, {
                    prop: "real_name",
                    label: a(e)("userRealName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, {
                    default: l(({ row: t }) => [
                      f("span", null, s(t.real_name ? t.real_name : "--"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(_, {
                    label: a(e)("userRoleName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, {
                    default: l(({ row: t }) => [
                      t.is_admin ? (c(), g("span", ne, s(a(e)("administrator")), 1)) : t.role_array.length ? (c(), g("span", oe, s(t.role_array.join(" | ")), 1)) : b("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(_, {
                    label: a(e)("status"),
                    "min-width": "90",
                    align: "center"
                  }, {
                    default: l(({ row: t }) => [
                      t.status == 1 ? (c(), y(D, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: l(() => [
                          d(s(a(e)("statusUnlock")), 1)
                        ]),
                        _: 1
                      })) : b("", !0),
                      t.status == 0 ? (c(), y(D, {
                        key: 1,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: l(() => [
                          d(s(a(e)("statusLock")), 1)
                        ]),
                        _: 1
                      })) : b("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(_, {
                    prop: "last_time",
                    label: a(e)("lastLoginTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: l(({ row: t }) => [
                      d(s(t.last_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(_, {
                    label: a(e)("lastLoginIP"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: l(({ row: t }) => [
                      d(s(t.last_ip || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(_, {
                    label: a(e)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "160"
                  }, {
                    default: l(({ row: t }) => [
                      t.is_admin != 1 ? (c(), g("div", ie, [
                        o(p, {
                          type: "primary",
                          link: "",
                          onClick: (k) => N(t)
                        }, {
                          default: l(() => [
                            d(s(a(e)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t.status ? (c(), y(p, {
                          key: 0,
                          type: "primary",
                          link: "",
                          onClick: (k) => P(t.uid)
                        }, {
                          default: l(() => [
                            d(s(a(e)("lock")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : (c(), y(p, {
                          key: 1,
                          type: "primary",
                          link: "",
                          onClick: (k) => $(t.uid)
                        }, {
                          default: l(() => [
                            d(s(a(e)("unlock")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])),
                        o(p, {
                          type: "primary",
                          link: "",
                          onClick: (k) => E(t.uid)
                        }, {
                          default: l(() => [
                            d(s(a(e)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])) : (c(), g("div", se, [
                        o(p, {
                          link: "",
                          disabled: ""
                        }, {
                          default: l(() => [
                            d(s(a(e)("adminDisabled")), 1)
                          ]),
                          _: 1
                        })
                      ]))
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [R, n.loading]
              ]),
              f("div", re, [
                o(z, {
                  "current-page": n.page,
                  "onUpdate:currentPage": i[3] || (i[3] = (t) => n.page = t),
                  "page-size": n.limit,
                  "onUpdate:pageSize": i[4] || (i[4] = (t) => n.limit = t),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: n.total,
                  onSizeChange: i[5] || (i[5] = (t) => m()),
                  onCurrentChange: m
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            o(Q, {
              ref_key: "editUserDialog",
              ref: h,
              onComplete: i[6] || (i[6] = (t) => m())
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  xe as default
};
