import { defineComponent as L, ref as y, reactive as S, resolveComponent as m, resolveDirective as $, openBlock as _, createElementBlock as h, normalizeStyle as M, unref as i, createElementVNode as c, createVNode as a, withCtx as r, createTextVNode as u, toDisplayString as d, withDirectives as Y, createBlock as H } from "vue";
import { _ as j } from "./member_head-81b0c11e.js";
import { t as e, j as A, gc as I, gd as q } from "./core-shared-c6ad4e77.js";
import { useRouter as G, useRoute as J } from "vue-router";
import { u as K } from "./useTablePageHeight-33d60cf6.js";
import O from "./user-edit-5162ab2d.js";
import Q from "./index-c14157f3.js";
import W from "./index-559a9b12.js";
import X from "./index-997caa57.js";
import { ElMessageBox as Z } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ee = { class: "table-fill-page__card" }, te = { class: "table-panel table-fill-page__panel" }, le = { class: "table-fill-page__table" }, ae = { class: "w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] flex items-center justify-center" }, oe = ["src"], ie = {
  key: 1,
  src: j,
  class: "w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] rounded-full"
}, ke = /* @__PURE__ */ L({
  __name: "user",
  setup(ne) {
    const k = G(), C = (n) => [
      { label: e("detail"), onClick: () => w(n.uid) },
      { label: e("edit"), show: !n.is_super_admin, onClick: () => x(n.uid) },
      { label: e("userCreateSiteLimit"), show: !n.is_super_admin, onClick: () => w(n.uid, "userCreateSiteLimit") },
      { label: e("delete"), type: "danger", show: !n.is_super_admin, onClick: () => R(n.uid) }
    ], z = J().meta.title, { pageRef: D, pageStyle: T } = K(), f = y(null), l = S({
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
    }), v = y(), P = (n) => {
      n && (n.resetFields(), p());
    }, p = (n = 1) => {
      l.loading = !0, l.page = n, I({
        page: l.page,
        limit: l.limit,
        ...l.searchParam
      }).then((t) => {
        l.loading = !1, l.data = t.data.data, l.total = t.data.total;
      }).catch(() => {
        l.loading = !1;
      });
    };
    p();
    const w = (n, t = "") => {
      k.push({ path: "/admin/site/user_info", query: { uid: n, tab: t } });
    }, x = (n) => {
      f.value.setFormData(n);
    }, R = (n) => {
      Z.confirm(
        e("userDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        q(n).then((t) => {
          p();
        }).catch(() => {
        });
      });
    };
    return (n, t) => {
      const V = m("el-input"), g = m("el-form-item"), E = m("el-date-picker"), b = m("el-button"), N = m("el-form"), U = m("el-card"), s = m("el-table-column"), B = m("el-table"), F = $("loading");
      return _(), h("div", {
        ref_key: "pageRef",
        ref: D,
        class: "main-container table-fill-page",
        style: M(i(T))
      }, [
        c("div", ee, [
          a(U, {
            class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
            shadow: "never"
          }, {
            default: r(() => [
              a(N, {
                inline: !0,
                model: l.searchParam,
                ref_key: "searchFormRef",
                ref: v
              }, {
                default: r(() => [
                  a(g, {
                    label: i(e)("username"),
                    prop: "username"
                  }, {
                    default: r(() => [
                      a(V, {
                        modelValue: l.searchParam.username,
                        "onUpdate:modelValue": t[0] || (t[0] = (o) => l.searchParam.username = o),
                        modelModifiers: { trim: !0 },
                        placeholder: i(e)("userNamePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(g, {
                    label: i(e)("loginTime"),
                    prop: "last_time"
                  }, {
                    default: r(() => [
                      a(E, {
                        modelValue: l.searchParam.last_time,
                        "onUpdate:modelValue": t[1] || (t[1] = (o) => l.searchParam.last_time = o),
                        type: "datetimerange",
                        "value-format": "YYYY-MM-DD HH:mm:ss",
                        "start-placeholder": i(e)("startDate"),
                        "end-placeholder": i(e)("endDate")
                      }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(g, null, {
                    default: r(() => [
                      a(b, {
                        type: "primary",
                        onClick: t[2] || (t[2] = (o) => p())
                      }, {
                        default: r(() => [
                          u(d(i(e)("search")), 1)
                        ]),
                        _: 1
                      }),
                      a(b, {
                        onClick: t[3] || (t[3] = (o) => P(v.value))
                      }, {
                        default: r(() => [
                          u(d(i(e)("reset")), 1)
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
          c("div", te, [
            a(X, {
              title: i(z),
              selectable: !1
            }, {
              actions: r(() => [
                a(b, {
                  type: "primary",
                  onClick: t[4] || (t[4] = (o) => f.value.setFormData())
                }, {
                  default: r(() => [
                    u(d(i(e)("addUser")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            c("div", le, [
              Y((_(), H(B, {
                height: "100%",
                data: l.data,
                size: "large"
              }, {
                empty: r(() => [
                  c("span", null, d(l.loading ? "" : i(e)("emptyData")), 1)
                ]),
                default: r(() => [
                  a(s, {
                    label: i(e)("headImg"),
                    width: "100",
                    align: "left"
                  }, {
                    default: r(({ row: o }) => [
                      c("div", ae, [
                        o.head_img ? (_(), h("img", {
                          key: 0,
                          src: i(A)(o.head_img),
                          class: "w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] rounded-full"
                        }, null, 8, oe)) : (_(), h("img", ie))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(s, {
                    prop: "username",
                    label: i(e)("accountNumber"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  a(s, {
                    prop: "mobile",
                    label: i(e)("手机号"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  a(s, {
                    prop: "real_name",
                    label: i(e)("userRealName"),
                    "min-width": "120",
                    "show-overflow-tooltip": ""
                  }, null, 8, ["label"]),
                  a(s, {
                    prop: "site_num",
                    label: i(e)("siteNum"),
                    "min-width": "120",
                    "show-overflow-tooltip": "",
                    align: "center"
                  }, null, 8, ["label"]),
                  a(s, {
                    prop: "last_time",
                    label: i(e)("lastLoginTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: r(({ row: o }) => [
                      u(d(o.last_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(s, {
                    label: i(e)("lastLoginIP"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: r(({ row: o }) => [
                      u(d(o.last_ip || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(s, {
                    label: i(e)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "180"
                  }, {
                    default: r(({ row: o }) => [
                      a(Q, {
                        actions: C(o)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [F, l.loading]
              ])
            ]),
            a(W, {
              "current-page": l.page,
              "onUpdate:current-page": t[5] || (t[5] = (o) => l.page = o),
              "page-size": l.limit,
              "onUpdate:page-size": t[6] || (t[6] = (o) => l.limit = o),
              total: l.total,
              onSizeChange: t[7] || (t[7] = (o) => p()),
              onCurrentChange: p
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ]),
        a(O, {
          ref_key: "userEditRef",
          ref: f,
          onComplete: t[8] || (t[8] = (o) => p())
        }, null, 512)
      ], 4);
    };
  }
});
export {
  ke as default
};
