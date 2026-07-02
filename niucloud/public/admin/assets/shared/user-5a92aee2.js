import { defineComponent as R, ref as x, reactive as z, resolveComponent as d, resolveDirective as B, openBlock as f, createElementBlock as g, createVNode as t, withCtx as r, createElementVNode as _, toDisplayString as s, unref as n, createTextVNode as m, withDirectives as I, createBlock as T, Fragment as j, createCommentVNode as M, pushScopeId as se, popScopeId as de } from "vue";
import { _ as Y } from "./member_head-81b0c11e.js";
import { t as l, i as H, fK as q, fL as K, _ as A } from "./core-shared-ae4a556b.js";
import { useRouter as G, useRoute as J } from "vue-router";
import O from "./user-edit-cbf80b46.js";
import { ElMessageBox as Q } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const W = { class: "main-container" }, X = { class: "flex justify-between items-center" }, Z = { class: "text-page-title" }, ee = { class: "w-[54px] h-[54px] flex items-center justify-center" }, te = ["src"], ae = {
  key: 1,
  src: Y,
  class: "w-[54px] rounded-full"
}, le = { class: "mt-[16px] flex justify-end" }, oe = /* @__PURE__ */ R({
  __name: "user",
  setup(ne) {
    const C = G(), D = J().meta.title, h = x(null), o = z({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        username: "",
        site_name: "",
        // create_time: [],
        last_time: []
      }
    }), y = x(), P = (i) => {
      i && (i.resetFields(), u());
    }, u = (i = 1) => {
      o.loading = !0, o.page = i, q({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((a) => {
        o.loading = !1, o.data = a.data.data, o.total = a.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    u();
    const k = (i, a = "") => {
      C.push({ path: "/admin/site/user_info", query: { uid: i, tab: a } });
    }, V = (i) => {
      h.value.setFormData(i);
    }, N = (i) => {
      Q.confirm(
        l("userDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        K(i).then((a) => {
          u();
        }).catch(() => {
        });
      });
    };
    return (i, a) => {
      const c = d("el-button"), $ = d("el-input"), v = d("el-form-item"), E = d("el-date-picker"), S = d("el-form"), w = d("el-card"), p = d("el-table-column"), U = d("el-table"), F = d("el-pagination"), L = B("loading");
      return f(), g("div", W, [
        t(w, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            _("div", X, [
              _("span", Z, s(n(D)), 1),
              _("div", null, [
                t(c, {
                  type: "primary",
                  class: "w-[100px]",
                  onClick: a[0] || (a[0] = (e) => h.value.setFormData())
                }, {
                  default: r(() => [
                    m(s(n(l)("addUser")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            t(w, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                t(S, {
                  inline: !0,
                  model: o.searchParam,
                  ref_key: "searchFormRef",
                  ref: y,
                  class: "search-form"
                }, {
                  default: r(() => [
                    t(v, { prop: "username" }, {
                      default: r(() => [
                        t($, {
                          modelValue: o.searchParam.username,
                          "onUpdate:modelValue": a[1] || (a[1] = (e) => o.searchParam.username = e),
                          modelModifiers: { trim: !0 },
                          placeholder: n(l)("userNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }),
                    t(v, { prop: "last_time" }, {
                      default: r(() => [
                        t(E, {
                          modelValue: o.searchParam.last_time,
                          "onUpdate:modelValue": a[2] || (a[2] = (e) => o.searchParam.last_time = e),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": n(l)("startDate"),
                          "end-placeholder": n(l)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }),
                    t(v, null, {
                      default: r(() => [
                        t(c, {
                          type: "primary",
                          onClick: a[3] || (a[3] = (e) => u())
                        }, {
                          default: r(() => [
                            m(s(n(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(c, {
                          onClick: a[4] || (a[4] = (e) => P(y.value))
                        }, {
                          default: r(() => [
                            m(s(n(l)("reset")), 1)
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
            _("div", null, [
              I((f(), T(U, {
                data: o.data,
                size: "large"
              }, {
                empty: r(() => [
                  _("span", null, s(o.loading ? "" : n(l)("emptyData")), 1)
                ]),
                default: r(() => [
                  t(p, {
                    label: n(l)("headImg"),
                    width: "100",
                    align: "left"
                  }, {
                    default: r(({ row: e }) => [
                      _("div", ee, [
                        e.head_img ? (f(), g("img", {
                          key: 0,
                          src: n(H)(e.head_img),
                          class: "w-[54px] rounded-full"
                        }, null, 8, te)) : (f(), g("img", ae))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    prop: "username",
                    label: n(l)("accountNumber"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "mobile",
                    label: n(l)("手机号"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "real_name",
                    label: n(l)("userRealName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "site_num",
                    label: n(l)("siteNum"),
                    "min-width": "120",
                    "show-overflow-tooltip": "",
                    align: "center"
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "last_time",
                    label: n(l)("lastLoginTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: r(({ row: e }) => [
                      m(s(e.last_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: n(l)("lastLoginIP"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: r(({ row: e }) => [
                      m(s(e.last_ip || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: n(l)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "180"
                  }, {
                    default: r(({ row: e }) => [
                      t(c, {
                        type: "primary",
                        link: "",
                        onClick: (b) => k(e.uid)
                      }, {
                        default: r(() => [
                          m(s(n(l)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      e.is_super_admin ? M("", !0) : (f(), g(j, { key: 0 }, [
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (b) => V(e.uid)
                        }, {
                          default: r(() => [
                            m(s(n(l)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (b) => k(e.uid, "userCreateSiteLimit")
                        }, {
                          default: r(() => [
                            m(s(n(l)("userCreateSiteLimit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (b) => N(e.uid)
                        }, {
                          default: r(() => [
                            m(s(n(l)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ], 64))
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [L, o.loading]
              ]),
              _("div", le, [
                t(F, {
                  "current-page": o.page,
                  "onUpdate:currentPage": a[5] || (a[5] = (e) => o.page = e),
                  "page-size": o.limit,
                  "onUpdate:pageSize": a[6] || (a[6] = (e) => o.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: o.total,
                  onSizeChange: a[7] || (a[7] = (e) => u()),
                  onCurrentChange: u
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        t(O, {
          ref_key: "userEditRef",
          ref: h,
          onComplete: a[8] || (a[8] = (e) => u())
        }, null, 512)
      ]);
    };
  }
});
const be = /* @__PURE__ */ A(oe, [["__scopeId", "data-v-e81a0bc0"]]);
export {
  be as default
};
