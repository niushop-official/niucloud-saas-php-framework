import { defineComponent as J, ref as v, reactive as K, computed as Q, resolveComponent as _, resolveDirective as W, openBlock as r, createElementBlock as f, normalizeStyle as X, unref as t, createElementVNode as y, createVNode as l, withCtx as a, createTextVNode as s, toDisplayString as i, withDirectives as H, createBlock as c, createCommentVNode as m, h as C } from "vue";
import { t as e, r as Y, v as Z, w as ee } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as O } from "element-plus";
import te from "./edit-menu-f0e5d97f.js";
import le from "./import-menu-72ea8dac.js";
import ae from "./export-menu-1b149ff3.js";
import P from "./index-997caa57.js";
import { u as ne } from "./useTablePageHeight-33d60cf6.js";
import { useRoute as ie } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const oe = { class: "table-fill-page__card" }, se = { class: "table-panel table-fill-page__panel" }, ue = { class: "table-fill-page__table" }, re = { key: 0 }, pe = { key: 1 }, ce = { key: 2 }, me = { class: "table-panel table-fill-page__panel" }, de = { class: "table-fill-page__table" }, _e = { key: 0 }, fe = { key: 1 }, ye = { key: 2 }, Ne = /* @__PURE__ */ J({
  __name: "site_menu",
  setup(ge) {
    const U = ie(), T = v("system"), w = U.meta.title, { pageRef: j, pageStyle: q } = ne(), p = K({
      loading: !0,
      system: [],
      application: []
    }), k = () => {
      p.loading = !0, Y("site").then(({ data: d }) => {
        p.loading = !1;
        const g = [], u = [];
        d.forEach((o) => {
          o.addon == "" ? g.push(o) : u.push(o);
        }), p.system = g, p.application = u;
      }).catch(() => {
      });
    };
    k();
    const h = v(!1), x = () => {
      O.confirm(
        C("div", null, [
          C("p", null, e("initializeMenuTipsOne")),
          C("p", null, e("initializeMenuTipsTwo"))
        ]),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
          // type: 'warning'
        }
      ).then(() => {
        h.value = !0, Z({}).then((d) => {
          h.value = !1;
        }).catch(() => {
          h.value = !1;
        });
      }).catch(() => {
      });
    }, B = v(null), E = () => {
      B.value.showDialog = !0;
    }, A = Q(() => [...p.system, ...p.application]), z = v(null), N = () => {
      z.value.showDialog = !0;
    }, b = v(null), V = () => {
      b.value.setFormData({ app_type: "site" }), b.value.showDialog = !0;
    }, $ = (d) => {
      b.value.setFormData(d), b.value.showDialog = !0;
    }, R = (d) => {
      O.confirm(
        e("menuDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        ee("site", d).then((g) => {
          k();
        }).catch(() => {
        });
      });
    };
    return (d, g) => {
      const u = _("el-button"), o = _("el-table-column"), I = _("icon"), M = _("el-tag"), S = _("el-table"), F = _("el-tab-pane"), G = _("el-tabs"), L = W("loading");
      return r(), f("div", {
        ref_key: "pageRef",
        ref: j,
        class: "main-container table-fill-page",
        style: X(t(q))
      }, [
        y("div", oe, [
          l(G, {
            modelValue: T.value,
            "onUpdate:modelValue": g[0] || (g[0] = (n) => T.value = n)
          }, {
            default: a(() => [
              l(F, {
                label: t(e)("system"),
                name: "system"
              }, {
                default: a(() => [
                  y("div", se, [
                    l(P, {
                      title: t(w),
                      selectable: !1
                    }, {
                      actions: a(() => [
                        l(u, { onClick: E }, {
                          default: a(() => [
                            s(i(t(e)("importMenu")), 1)
                          ]),
                          _: 1
                        }),
                        l(u, { onClick: N }, {
                          default: a(() => [
                            s(i(t(e)("exportMenu")), 1)
                          ]),
                          _: 1
                        }),
                        l(u, {
                          loading: h.value,
                          onClick: x
                        }, {
                          default: a(() => [
                            s(i(t(e)("initializeMenu")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"]),
                        l(u, {
                          type: "primary",
                          onClick: V
                        }, {
                          default: a(() => [
                            s(i(t(e)("addMenu")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["title"]),
                    y("div", ue, [
                      H((r(), c(S, {
                        height: "100%",
                        data: p.system,
                        "row-key": "menu_key",
                        size: "large"
                      }, {
                        empty: a(() => [
                          y("span", null, i(p.loading ? "" : t(e)("emptyData")), 1)
                        ]),
                        default: a(() => [
                          l(o, {
                            prop: "menu_name",
                            "show-overflow-tooltip": !0,
                            label: t(e)("menuName"),
                            "min-width": "150"
                          }, null, 8, ["label"]),
                          l(o, {
                            label: t(e)("icon"),
                            width: "100",
                            align: "center"
                          }, {
                            default: a(({ row: n }) => [
                              n.icon ? (r(), c(I, {
                                key: 0,
                                name: n.icon,
                                size: "18px"
                              }, null, 8, ["name"])) : m("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          l(o, {
                            label: t(e)("menuType"),
                            width: "80"
                          }, {
                            default: a(({ row: n }) => [
                              n.menu_type == 0 ? (r(), f("div", re, i(t(e)("menuTypeDir")), 1)) : n.menu_type == 1 ? (r(), f("div", pe, i(t(e)("menuTypeMenu")), 1)) : n.menu_type == 2 ? (r(), f("div", ce, i(t(e)("menuTypeButton")), 1)) : m("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          l(o, {
                            prop: "api_url",
                            label: t(e)("authId"),
                            "min-width": "150",
                            align: "center"
                          }, null, 8, ["label"]),
                          l(o, {
                            label: t(e)("status"),
                            "min-width": "120",
                            align: "center"
                          }, {
                            default: a(({ row: n }) => [
                              n.status == 1 ? (r(), c(M, {
                                key: 0,
                                class: "ml-2",
                                type: "success"
                              }, {
                                default: a(() => [
                                  s(i(t(e)("statusNormal")), 1)
                                ]),
                                _: 1
                              })) : m("", !0),
                              n.status == 0 ? (r(), c(M, {
                                key: 1,
                                class: "ml-2",
                                type: "error"
                              }, {
                                default: a(() => [
                                  s(i(t(e)("statusDeactivate")), 1)
                                ]),
                                _: 1
                              })) : m("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          l(o, {
                            prop: "sort",
                            label: t(e)("sort"),
                            "min-width": "100"
                          }, null, 8, ["label"]),
                          l(o, {
                            label: t(e)("operation"),
                            align: "right",
                            fixed: "right",
                            width: "130"
                          }, {
                            default: a(({ row: n }) => [
                              l(u, {
                                type: "primary",
                                link: "",
                                onClick: (D) => $(n)
                              }, {
                                default: a(() => [
                                  s(i(t(e)("edit")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              l(u, {
                                type: "primary",
                                link: "",
                                onClick: (D) => R(n.menu_key)
                              }, {
                                default: a(() => [
                                  s(i(t(e)("delete")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["data"])), [
                        [L, p.loading]
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              l(F, {
                label: t(e)("application"),
                name: "application"
              }, {
                default: a(() => [
                  y("div", me, [
                    l(P, {
                      title: t(w),
                      selectable: !1
                    }, {
                      actions: a(() => [
                        l(u, { onClick: E }, {
                          default: a(() => [
                            s(i(t(e)("importMenu")), 1)
                          ]),
                          _: 1
                        }),
                        l(u, { onClick: N }, {
                          default: a(() => [
                            s(i(t(e)("exportMenu")), 1)
                          ]),
                          _: 1
                        }),
                        l(u, {
                          loading: h.value,
                          onClick: x
                        }, {
                          default: a(() => [
                            s(i(t(e)("initializeMenu")), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"]),
                        l(u, {
                          type: "primary",
                          onClick: V
                        }, {
                          default: a(() => [
                            s(i(t(e)("addMenu")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["title"]),
                    y("div", de, [
                      H((r(), c(S, {
                        height: "100%",
                        data: p.application,
                        "row-key": "menu_key",
                        size: "large"
                      }, {
                        empty: a(() => [
                          y("span", null, i(p.loading ? "" : t(e)("emptyData")), 1)
                        ]),
                        default: a(() => [
                          l(o, {
                            prop: "menu_name",
                            "show-overflow-tooltip": !0,
                            label: t(e)("menuName"),
                            "min-width": "150"
                          }, null, 8, ["label"]),
                          l(o, {
                            label: t(e)("icon"),
                            width: "100",
                            align: "center"
                          }, {
                            default: a(({ row: n }) => [
                              n.icon ? (r(), c(I, {
                                key: 0,
                                name: n.icon,
                                size: "18px"
                              }, null, 8, ["name"])) : m("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          l(o, {
                            label: t(e)("menuType"),
                            width: "80"
                          }, {
                            default: a(({ row: n }) => [
                              n.menu_type == 0 ? (r(), f("div", _e, i(t(e)("menuTypeDir")), 1)) : n.menu_type == 1 ? (r(), f("div", fe, i(t(e)("menuTypeMenu")), 1)) : n.menu_type == 2 ? (r(), f("div", ye, i(t(e)("menuTypeButton")), 1)) : m("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          l(o, {
                            prop: "api_url",
                            label: t(e)("authId"),
                            "min-width": "150",
                            align: "center"
                          }, null, 8, ["label"]),
                          l(o, {
                            label: t(e)("status"),
                            "min-width": "120",
                            align: "center"
                          }, {
                            default: a(({ row: n }) => [
                              n.status == 1 ? (r(), c(M, {
                                key: 0,
                                class: "ml-2",
                                type: "success"
                              }, {
                                default: a(() => [
                                  s(i(t(e)("statusNormal")), 1)
                                ]),
                                _: 1
                              })) : m("", !0),
                              n.status == 0 ? (r(), c(M, {
                                key: 1,
                                class: "ml-2",
                                type: "error"
                              }, {
                                default: a(() => [
                                  s(i(t(e)("statusDeactivate")), 1)
                                ]),
                                _: 1
                              })) : m("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          l(o, {
                            prop: "sort",
                            label: t(e)("sort"),
                            "min-width": "100"
                          }, null, 8, ["label"]),
                          l(o, {
                            label: t(e)("operation"),
                            align: "right",
                            fixed: "right",
                            width: "130"
                          }, {
                            default: a(({ row: n }) => [
                              l(u, {
                                type: "primary",
                                link: "",
                                onClick: (D) => $(n)
                              }, {
                                default: a(() => [
                                  s(i(t(e)("edit")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              l(u, {
                                type: "primary",
                                link: "",
                                onClick: (D) => R(n.menu_key)
                              }, {
                                default: a(() => [
                                  s(i(t(e)("delete")), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["data"])), [
                        [L, p.loading]
                      ])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        l(te, {
          ref_key: "editMenuDialog",
          ref: b,
          "menu-tree": p.data,
          onComplete: k
        }, null, 8, ["menu-tree"]),
        l(le, {
          ref_key: "importMenuDialog",
          ref: B,
          "app-type": "site",
          onComplete: k
        }, null, 512),
        l(ae, {
          ref_key: "exportMenuDialog",
          ref: z,
          "app-type": "site",
          menus: t(A)
        }, null, 8, ["menus"])
      ], 4);
    };
  }
});
export {
  Ne as default
};
