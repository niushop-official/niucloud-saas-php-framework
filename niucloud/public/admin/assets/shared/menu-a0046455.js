import { defineComponent as F, reactive as L, ref as x, resolveComponent as u, resolveDirective as R, openBlock as i, createElementBlock as f, createVNode as n, withCtx as a, createElementVNode as h, toDisplayString as o, unref as t, createTextVNode as m, withDirectives as j, createBlock as g, createCommentVNode as y, h as b } from "vue";
import { t as e, d as I, m as O, e as S } from "./core-shared-e1759ce4.js";
import { ElMessageBox as w } from "element-plus";
import q from "./edit-menu-bf54549b.js";
import { useRoute as A } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const G = { class: "main-container" }, H = { class: "flex justify-between items-center" }, J = { class: "text-page-title" }, K = { class: "flex items-center" }, P = { key: 0 }, Q = { key: 1 }, U = { key: 2 }, ce = /* @__PURE__ */ F({
  __name: "menu",
  setup(W) {
    const D = A().meta.title, s = L({
      loading: !0,
      data: []
    }), v = () => {
      s.loading = !0, I("admin").then((c) => {
        s.loading = !1, s.data = c.data;
      }).catch(() => {
      });
    };
    v();
    const p = x(!1), T = () => {
      w.confirm(
        b("div", null, [
          b("p", null, e("initializeMenuTipsOne")),
          b("p", null, e("initializeMenuTipsTwo"))
        ]),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
          // type: 'warning'
        }
      ).then(() => {
        p.value = !0, O({}).then((c) => {
          p.value = !1;
        }).catch(() => {
          p.value = !1;
        });
      }).catch(() => {
      });
    }, d = x(null), M = () => {
      d.value.setFormData({ app_type: "admin" }), d.value.showDialog = !0;
    }, C = (c) => {
      d.value.setFormData(c), d.value.showDialog = !0;
    }, B = (c) => {
      w.confirm(
        e("menuDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        S("admin", c).then(() => {
          v();
        }).catch(() => {
        });
      });
    };
    return (c, Y) => {
      const _ = u("el-button"), r = u("el-table-column"), N = u("icon"), k = u("el-tag"), E = u("el-table"), z = u("el-card"), V = R("loading");
      return i(), f("div", G, [
        n(z, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            h("div", H, [
              h("span", J, o(t(D)), 1),
              h("div", K, [
                n(_, {
                  type: "primary",
                  class: "w-[100px]",
                  onClick: M
                }, {
                  default: a(() => [
                    m(o(t(e)("addMenu")), 1)
                  ]),
                  _: 1
                }),
                n(_, {
                  class: "w-[100px]",
                  loading: p.value,
                  onClick: T
                }, {
                  default: a(() => [
                    m(o(t(e)("initializeMenu")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ]),
            j((i(), g(E, {
              class: "mt-[20px]",
              data: s.data,
              "row-key": "menu_key",
              size: "large"
            }, {
              empty: a(() => [
                h("span", null, o(s.loading ? "" : t(e)("emptyData")), 1)
              ]),
              default: a(() => [
                n(r, {
                  prop: "menu_name",
                  "show-overflow-tooltip": !0,
                  label: t(e)("menuName"),
                  "min-width": "150"
                }, null, 8, ["label"]),
                n(r, {
                  label: t(e)("icon"),
                  width: "100",
                  align: "center"
                }, {
                  default: a(({ row: l }) => [
                    l.icon ? (i(), g(N, {
                      key: 0,
                      name: l.icon,
                      size: "18px"
                    }, null, 8, ["name"])) : y("", !0)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(r, {
                  label: t(e)("menuType"),
                  width: "80"
                }, {
                  default: a(({ row: l }) => [
                    l.menu_type == 0 ? (i(), f("div", P, o(t(e)("menuTypeDir")), 1)) : l.menu_type == 1 ? (i(), f("div", Q, o(t(e)("menuTypeMenu")), 1)) : l.menu_type == 2 ? (i(), f("div", U, o(t(e)("menuTypeButton")), 1)) : y("", !0)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(r, {
                  prop: "api_url",
                  label: t(e)("authId"),
                  "min-width": "150",
                  align: "left"
                }, null, 8, ["label"]),
                n(r, {
                  label: t(e)("status"),
                  "min-width": "120",
                  align: "center"
                }, {
                  default: a(({ row: l }) => [
                    l.status == 1 ? (i(), g(k, {
                      key: 0,
                      class: "ml-2",
                      type: "success"
                    }, {
                      default: a(() => [
                        m(o(t(e)("statusNormal")), 1)
                      ]),
                      _: 1
                    })) : y("", !0),
                    l.status == 0 ? (i(), g(k, {
                      key: 1,
                      class: "ml-2",
                      type: "error"
                    }, {
                      default: a(() => [
                        m(o(t(e)("statusDeactivate")), 1)
                      ]),
                      _: 1
                    })) : y("", !0)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(r, {
                  prop: "sort",
                  label: t(e)("sort"),
                  "min-width": "100"
                }, null, 8, ["label"]),
                n(r, {
                  label: t(e)("operation"),
                  align: "right",
                  fixed: "right",
                  width: "130"
                }, {
                  default: a(({ row: l }) => [
                    n(_, {
                      type: "primary",
                      link: "",
                      onClick: ($) => C(l)
                    }, {
                      default: a(() => [
                        m(o(t(e)("edit")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    n(_, {
                      type: "primary",
                      link: "",
                      onClick: ($) => B(l.menu_key)
                    }, {
                      default: a(() => [
                        m(o(t(e)("delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [V, s.loading]
            ]),
            n(q, {
              ref_key: "editMenuDialog",
              ref: d,
              "menu-tree": s.data,
              onComplete: v,
              "app-type": "admin"
            }, null, 8, ["menu-tree"])
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
