import { defineComponent as B, ref as w, reactive as L, resolveComponent as d, resolveDirective as T, openBlock as f, createElementBlock as g, createVNode as t, withCtx as r, createElementVNode as _, toDisplayString as s, unref as n, createTextVNode as m, withDirectives as S, createBlock as j, Fragment as M, createCommentVNode as Y } from "vue";
import { _ as H } from "./member_head-81b0c11e.js";
import { t as a, i as I, fG as q, fH as G, _ as A } from "./core-shared-ca1fcae5.js";
import { useRouter as J, useRoute as K } from "vue-router";
import O from "./user-edit-d11636f0.js";
import { ElMessageBox as Q } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const W = { class: "main-container" }, X = { class: "flex justify-between items-center" }, Z = { class: "text-page-title" }, ee = { class: "w-[54px] h-[54px] flex items-center justify-center" }, te = ["src"], le = {
  key: 1,
  src: H,
  class: "w-[54px] rounded-full"
}, ae = { class: "mt-[16px] flex justify-end" }, oe = /* @__PURE__ */ B({
  __name: "user",
  setup(ne) {
    const C = J(), D = K().meta.title, h = w(null), o = L({
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
    }), y = w(), P = (i) => {
      i && (i.resetFields(), u());
    }, u = (i = 1) => {
      o.loading = !0, o.page = i, q({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((l) => {
        o.loading = !1, o.data = l.data.data, o.total = l.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    u();
    const k = (i, l = "") => {
      C.push({ path: "/admin/site/user_info", query: { uid: i, tab: l } });
    }, V = (i) => {
      h.value.setFormData(i);
    }, N = (i) => {
      Q.confirm(
        a("userDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        G(i).then((l) => {
          u();
        }).catch(() => {
        });
      });
    };
    return (i, l) => {
      const c = d("el-button"), $ = d("el-input"), v = d("el-form-item"), E = d("el-date-picker"), U = d("el-form"), x = d("el-card"), p = d("el-table-column"), F = d("el-table"), R = d("el-pagination"), z = T("loading");
      return f(), g("div", W, [
        t(x, {
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
                  onClick: l[0] || (l[0] = (e) => h.value.setFormData())
                }, {
                  default: r(() => [
                    m(s(n(a)("addUser")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            t(x, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                t(U, {
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
                          "onUpdate:modelValue": l[1] || (l[1] = (e) => o.searchParam.username = e),
                          modelModifiers: { trim: !0 },
                          placeholder: n(a)("userNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }),
                    t(v, { prop: "last_time" }, {
                      default: r(() => [
                        t(E, {
                          modelValue: o.searchParam.last_time,
                          "onUpdate:modelValue": l[2] || (l[2] = (e) => o.searchParam.last_time = e),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": n(a)("startDate"),
                          "end-placeholder": n(a)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }),
                    t(v, null, {
                      default: r(() => [
                        t(c, {
                          type: "primary",
                          onClick: l[3] || (l[3] = (e) => u())
                        }, {
                          default: r(() => [
                            m(s(n(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(c, {
                          onClick: l[4] || (l[4] = (e) => P(y.value))
                        }, {
                          default: r(() => [
                            m(s(n(a)("reset")), 1)
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
              S((f(), j(F, {
                data: o.data,
                size: "large"
              }, {
                empty: r(() => [
                  _("span", null, s(o.loading ? "" : n(a)("emptyData")), 1)
                ]),
                default: r(() => [
                  t(p, {
                    label: n(a)("headImg"),
                    width: "100",
                    align: "left"
                  }, {
                    default: r(({ row: e }) => [
                      _("div", ee, [
                        e.head_img ? (f(), g("img", {
                          key: 0,
                          src: n(I)(e.head_img),
                          class: "w-[54px] rounded-full"
                        }, null, 8, te)) : (f(), g("img", le))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    prop: "username",
                    label: n(a)("accountNumber"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "mobile",
                    label: n(a)("手机号"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "real_name",
                    label: n(a)("userRealName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "site_num",
                    label: n(a)("siteNum"),
                    "min-width": "120",
                    "show-overflow-tooltip": "",
                    align: "center"
                  }, null, 8, ["label"]),
                  t(p, {
                    prop: "last_time",
                    label: n(a)("lastLoginTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: r(({ row: e }) => [
                      m(s(e.last_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: n(a)("lastLoginIP"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: r(({ row: e }) => [
                      m(s(e.last_ip || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: n(a)("operation"),
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
                          m(s(n(a)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      e.is_super_admin ? Y("", !0) : (f(), g(M, { key: 0 }, [
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (b) => V(e.uid)
                        }, {
                          default: r(() => [
                            m(s(n(a)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (b) => k(e.uid, "userCreateSiteLimit")
                        }, {
                          default: r(() => [
                            m(s(n(a)("userCreateSiteLimit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (b) => N(e.uid)
                        }, {
                          default: r(() => [
                            m(s(n(a)("delete")), 1)
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
                [z, o.loading]
              ]),
              _("div", ae, [
                t(R, {
                  "current-page": o.page,
                  "onUpdate:currentPage": l[5] || (l[5] = (e) => o.page = e),
                  "page-size": o.limit,
                  "onUpdate:pageSize": l[6] || (l[6] = (e) => o.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: o.total,
                  onSizeChange: l[7] || (l[7] = (e) => u()),
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
          onComplete: l[8] || (l[8] = (e) => u())
        }, null, 512)
      ]);
    };
  }
});
const he = /* @__PURE__ */ A(oe, [["__scopeId", "data-v-e81a0bc0"]]);
export {
  he as default
};
