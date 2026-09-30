import { defineComponent as H, reactive as O, ref as g, resolveComponent as d, resolveDirective as P, openBlock as r, createElementBlock as h, normalizeStyle as j, unref as t, createElementVNode as y, createVNode as n, withCtx as l, createTextVNode as u, toDisplayString as o, withDirectives as q, createBlock as v, createCommentVNode as b, h as k } from "vue";
import { t as e, r as A, v as G, w as J } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as w } from "element-plus";
import K from "./edit-menu-f0e5d97f.js";
import Q from "./import-menu-72ea8dac.js";
import U from "./export-menu-1b149ff3.js";
import W from "./index-997caa57.js";
import { u as X } from "./useTablePageHeight-33d60cf6.js";
import { useRoute as Y } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Z = { class: "table-fill-page__card" }, ee = { class: "table-panel table-fill-page__panel" }, te = { class: "table-fill-page__table" }, ne = { key: 0 }, le = { key: 1 }, ae = { key: 2 }, ke = /* @__PURE__ */ H({
  __name: "menu",
  setup(oe) {
    const x = Y().meta.title, { pageRef: C, pageStyle: B } = X(), i = O({
      loading: !0,
      data: []
    }), _ = () => {
      i.loading = !0, A("admin").then((s) => {
        i.loading = !1, i.data = s.data;
      }).catch(() => {
      });
    };
    _();
    const f = g(!1), E = () => {
      w.confirm(
        k("div", null, [
          k("p", null, e("initializeMenuTipsOne")),
          k("p", null, e("initializeMenuTipsTwo"))
        ]),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
          // type: 'warning'
        }
      ).then(() => {
        f.value = !0, G({}).then((s) => {
          f.value = !1;
        }).catch(() => {
          f.value = !1;
        });
      }).catch(() => {
      });
    }, D = g(null), N = () => {
      D.value.showDialog = !0;
    }, M = g(null), z = () => {
      M.value.showDialog = !0;
    }, p = g(null), R = () => {
      p.value.setFormData({ app_type: "admin" }), p.value.showDialog = !0;
    }, V = (s) => {
      p.value.setFormData(s), p.value.showDialog = !0;
    }, S = (s) => {
      w.confirm(
        e("menuDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        J("admin", s).then(() => {
          _();
        }).catch(() => {
        });
      });
    };
    return (s, re) => {
      const m = d("el-button"), c = d("el-table-column"), $ = d("icon"), T = d("el-tag"), F = d("el-table"), I = P("loading");
      return r(), h("div", {
        ref_key: "pageRef",
        ref: C,
        class: "main-container table-fill-page",
        style: j(t(B))
      }, [
        y("div", Z, [
          y("div", ee, [
            n(W, {
              title: t(x),
              selectable: !1
            }, {
              actions: l(() => [
                n(m, { onClick: N }, {
                  default: l(() => [
                    u(o(t(e)("importMenu")), 1)
                  ]),
                  _: 1
                }),
                n(m, { onClick: z }, {
                  default: l(() => [
                    u(o(t(e)("exportMenu")), 1)
                  ]),
                  _: 1
                }),
                n(m, {
                  loading: f.value,
                  onClick: E
                }, {
                  default: l(() => [
                    u(o(t(e)("initializeMenu")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"]),
                n(m, {
                  type: "primary",
                  onClick: R
                }, {
                  default: l(() => [
                    u(o(t(e)("addMenu")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            y("div", te, [
              q((r(), v(F, {
                height: "100%",
                data: i.data,
                "row-key": "menu_key",
                size: "large"
              }, {
                empty: l(() => [
                  y("span", null, o(i.loading ? "" : t(e)("emptyData")), 1)
                ]),
                default: l(() => [
                  n(c, {
                    prop: "menu_name",
                    "show-overflow-tooltip": !0,
                    label: t(e)("menuName"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  n(c, {
                    label: t(e)("icon"),
                    width: "100",
                    align: "center"
                  }, {
                    default: l(({ row: a }) => [
                      a.icon ? (r(), v($, {
                        key: 0,
                        name: a.icon,
                        size: "18px"
                      }, null, 8, ["name"])) : b("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    label: t(e)("menuType"),
                    width: "80"
                  }, {
                    default: l(({ row: a }) => [
                      a.menu_type == 0 ? (r(), h("div", ne, o(t(e)("menuTypeDir")), 1)) : a.menu_type == 1 ? (r(), h("div", le, o(t(e)("menuTypeMenu")), 1)) : a.menu_type == 2 ? (r(), h("div", ae, o(t(e)("menuTypeButton")), 1)) : b("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    prop: "api_url",
                    label: t(e)("authId"),
                    "min-width": "150",
                    align: "left"
                  }, null, 8, ["label"]),
                  n(c, {
                    label: t(e)("status"),
                    "min-width": "120",
                    align: "center"
                  }, {
                    default: l(({ row: a }) => [
                      a.status == 1 ? (r(), v(T, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: l(() => [
                          u(o(t(e)("statusNormal")), 1)
                        ]),
                        _: 1
                      })) : b("", !0),
                      a.status == 0 ? (r(), v(T, {
                        key: 1,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: l(() => [
                          u(o(t(e)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })) : b("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    prop: "sort",
                    label: t(e)("sort"),
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  n(c, {
                    label: t(e)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: l(({ row: a }) => [
                      n(m, {
                        type: "primary",
                        link: "",
                        onClick: (L) => V(a)
                      }, {
                        default: l(() => [
                          u(o(t(e)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(m, {
                        type: "primary",
                        link: "",
                        onClick: (L) => S(a.menu_key)
                      }, {
                        default: l(() => [
                          u(o(t(e)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [I, i.loading]
              ])
            ])
          ]),
          n(K, {
            ref_key: "editMenuDialog",
            ref: p,
            "menu-tree": i.data,
            onComplete: _,
            "app-type": "admin"
          }, null, 8, ["menu-tree"]),
          n(Q, {
            ref_key: "importMenuDialog",
            ref: D,
            "app-type": "admin",
            onComplete: _
          }, null, 512),
          n(U, {
            ref_key: "exportMenuDialog",
            ref: M,
            "app-type": "admin",
            menus: i.data
          }, null, 8, ["menus"])
        ])
      ], 4);
    };
  }
});
export {
  ke as default
};
