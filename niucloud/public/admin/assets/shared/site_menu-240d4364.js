import { defineComponent as S, ref as x, reactive as U, resolveComponent as m, resolveDirective as q, openBlock as s, createElementBlock as y, createVNode as a, withCtx as n, createElementVNode as b, toDisplayString as i, unref as t, createTextVNode as c, withDirectives as V, createBlock as d, createCommentVNode as p, h as T } from "vue";
import { t as e, d as A, m as G, e as H } from "./core-shared-9b1e55e9.js";
import { ElMessageBox as $ } from "element-plus";
import J from "./edit-menu-9cee1a4e.js";
import { useRoute as K } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const P = { class: "main-container" }, Q = { class: "flex justify-between items-center" }, W = { class: "text-page-title" }, X = { class: "flex items-center" }, Y = { key: 0 }, Z = { key: 1 }, ee = { key: 2 }, te = { key: 0 }, le = { key: 1 }, ne = { key: 2 }, _e = /* @__PURE__ */ S({
  __name: "site_menu",
  setup(ae) {
    const F = K(), D = x("system"), I = F.meta.title, u = U({
      loading: !0,
      system: [],
      application: []
    }), k = () => {
      u.loading = !0, A("site").then(({ data: _ }) => {
        u.loading = !1;
        const f = [], r = [];
        _.forEach((o) => {
          o.addon == "" ? f.push(o) : r.push(o);
        }), u.system = f, u.application = r;
      }).catch(() => {
      });
    };
    k();
    const g = x(!1), L = () => {
      $.confirm(
        T("div", null, [
          T("p", null, e("initializeMenuTipsOne")),
          T("p", null, e("initializeMenuTipsTwo"))
        ]),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
          // type: 'warning'
        }
      ).then(() => {
        g.value = !0, G({}).then((_) => {
          g.value = !1;
        }).catch(() => {
          g.value = !1;
        });
      }).catch(() => {
      });
    }, h = x(null), R = () => {
      h.value.setFormData({ app_type: "site" }), h.value.showDialog = !0;
    }, C = (_) => {
      h.value.setFormData(_), h.value.showDialog = !0;
    }, M = (_) => {
      $.confirm(
        e("menuDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        H("site", _).then((f) => {
          k();
        }).catch(() => {
        });
      });
    };
    return (_, f) => {
      const r = m("el-button"), o = m("el-table-column"), B = m("icon"), v = m("el-tag"), N = m("el-table"), z = m("el-tab-pane"), j = m("el-tabs"), O = m("el-card"), E = q("loading");
      return s(), y("div", P, [
        a(O, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            b("div", Q, [
              b("span", W, i(t(I)), 1),
              b("div", X, [
                a(r, {
                  type: "primary",
                  class: "w-[100px]",
                  onClick: R
                }, {
                  default: n(() => [
                    c(i(t(e)("addMenu")), 1)
                  ]),
                  _: 1
                }),
                a(r, {
                  class: "w-[100px]",
                  loading: g.value,
                  onClick: L
                }, {
                  default: n(() => [
                    c(i(t(e)("initializeMenu")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ]),
            a(j, {
              modelValue: D.value,
              "onUpdate:modelValue": f[0] || (f[0] = (l) => D.value = l)
            }, {
              default: n(() => [
                a(z, {
                  label: t(e)("system"),
                  name: "system"
                }, {
                  default: n(() => [
                    V((s(), d(N, {
                      data: u.system,
                      "row-key": "menu_key",
                      size: "large"
                    }, {
                      empty: n(() => [
                        b("span", null, i(u.loading ? "" : t(e)("emptyData")), 1)
                      ]),
                      default: n(() => [
                        a(o, {
                          prop: "menu_name",
                          "show-overflow-tooltip": !0,
                          label: t(e)("menuName"),
                          "min-width": "150"
                        }, null, 8, ["label"]),
                        a(o, {
                          label: t(e)("icon"),
                          width: "100",
                          align: "center"
                        }, {
                          default: n(({ row: l }) => [
                            l.icon ? (s(), d(B, {
                              key: 0,
                              name: l.icon,
                              size: "18px"
                            }, null, 8, ["name"])) : p("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(o, {
                          label: t(e)("menuType"),
                          width: "80"
                        }, {
                          default: n(({ row: l }) => [
                            l.menu_type == 0 ? (s(), y("div", Y, i(t(e)("menuTypeDir")), 1)) : l.menu_type == 1 ? (s(), y("div", Z, i(t(e)("menuTypeMenu")), 1)) : l.menu_type == 2 ? (s(), y("div", ee, i(t(e)("menuTypeButton")), 1)) : p("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(o, {
                          prop: "api_url",
                          label: t(e)("authId"),
                          "min-width": "150",
                          align: "center"
                        }, null, 8, ["label"]),
                        a(o, {
                          label: t(e)("status"),
                          "min-width": "120",
                          align: "center"
                        }, {
                          default: n(({ row: l }) => [
                            l.status == 1 ? (s(), d(v, {
                              key: 0,
                              class: "ml-2",
                              type: "success"
                            }, {
                              default: n(() => [
                                c(i(t(e)("statusNormal")), 1)
                              ]),
                              _: 1
                            })) : p("", !0),
                            l.status == 0 ? (s(), d(v, {
                              key: 1,
                              class: "ml-2",
                              type: "error"
                            }, {
                              default: n(() => [
                                c(i(t(e)("statusDeactivate")), 1)
                              ]),
                              _: 1
                            })) : p("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(o, {
                          prop: "sort",
                          label: t(e)("sort"),
                          "min-width": "100"
                        }, null, 8, ["label"]),
                        a(o, {
                          label: t(e)("operation"),
                          align: "right",
                          fixed: "right",
                          width: "130"
                        }, {
                          default: n(({ row: l }) => [
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (w) => C(l)
                            }, {
                              default: n(() => [
                                c(i(t(e)("edit")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (w) => M(l.menu_key)
                            }, {
                              default: n(() => [
                                c(i(t(e)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [E, u.loading]
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(z, {
                  label: t(e)("application"),
                  name: "application"
                }, {
                  default: n(() => [
                    V((s(), d(N, {
                      data: u.application,
                      "row-key": "menu_key",
                      size: "large"
                    }, {
                      empty: n(() => [
                        b("span", null, i(u.loading ? "" : t(e)("emptyData")), 1)
                      ]),
                      default: n(() => [
                        a(o, {
                          prop: "menu_name",
                          "show-overflow-tooltip": !0,
                          label: t(e)("menuName"),
                          "min-width": "150"
                        }, null, 8, ["label"]),
                        a(o, {
                          label: t(e)("icon"),
                          width: "100",
                          align: "center"
                        }, {
                          default: n(({ row: l }) => [
                            l.icon ? (s(), d(B, {
                              key: 0,
                              name: l.icon,
                              size: "18px"
                            }, null, 8, ["name"])) : p("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(o, {
                          label: t(e)("menuType"),
                          width: "80"
                        }, {
                          default: n(({ row: l }) => [
                            l.menu_type == 0 ? (s(), y("div", te, i(t(e)("menuTypeDir")), 1)) : l.menu_type == 1 ? (s(), y("div", le, i(t(e)("menuTypeMenu")), 1)) : l.menu_type == 2 ? (s(), y("div", ne, i(t(e)("menuTypeButton")), 1)) : p("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(o, {
                          prop: "api_url",
                          label: t(e)("authId"),
                          "min-width": "150",
                          align: "center"
                        }, null, 8, ["label"]),
                        a(o, {
                          label: t(e)("status"),
                          "min-width": "120",
                          align: "center"
                        }, {
                          default: n(({ row: l }) => [
                            l.status == 1 ? (s(), d(v, {
                              key: 0,
                              class: "ml-2",
                              type: "success"
                            }, {
                              default: n(() => [
                                c(i(t(e)("statusNormal")), 1)
                              ]),
                              _: 1
                            })) : p("", !0),
                            l.status == 0 ? (s(), d(v, {
                              key: 1,
                              class: "ml-2",
                              type: "error"
                            }, {
                              default: n(() => [
                                c(i(t(e)("statusDeactivate")), 1)
                              ]),
                              _: 1
                            })) : p("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(o, {
                          prop: "sort",
                          label: t(e)("sort"),
                          "min-width": "100"
                        }, null, 8, ["label"]),
                        a(o, {
                          label: t(e)("operation"),
                          align: "right",
                          fixed: "right",
                          width: "130"
                        }, {
                          default: n(({ row: l }) => [
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (w) => C(l)
                            }, {
                              default: n(() => [
                                c(i(t(e)("edit")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (w) => M(l.menu_key)
                            }, {
                              default: n(() => [
                                c(i(t(e)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [E, u.loading]
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            a(J, {
              ref_key: "editMenuDialog",
              ref: h,
              "menu-tree": u.data,
              onComplete: k
            }, null, 8, ["menu-tree"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _e as default
};
