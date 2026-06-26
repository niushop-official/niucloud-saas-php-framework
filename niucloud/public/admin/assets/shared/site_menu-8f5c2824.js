import { defineComponent as O, ref as z, reactive as S, resolveComponent as m, resolveDirective as U, openBlock as s, createElementBlock as y, createVNode as a, withCtx as l, createElementVNode as b, toDisplayString as o, unref as t, createTextVNode as c, withDirectives as E, createBlock as p, createCommentVNode as d, h as w } from "vue";
import { t as e, d as q, m as A, e as G } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as V } from "element-plus";
import { _ as H } from "./edit-menu.vue_vue_type_script_setup_true_lang-f60289b8.js";
import { useRoute as J } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const K = { class: "main-container" }, P = { class: "flex justify-between items-center" }, Q = { class: "text-page-title" }, W = { class: "flex items-center" }, X = { key: 0 }, Y = { key: 1 }, Z = { key: 2 }, ee = { key: 0 }, te = { key: 1 }, ne = { key: 2 }, de = /* @__PURE__ */ O({
  __name: "site_menu",
  setup(le) {
    const $ = J(), x = z("system"), F = $.meta.title, u = S({
      loading: !0,
      system: [],
      application: []
    }), k = () => {
      u.loading = !0, q("site").then(({ data: _ }) => {
        u.loading = !1;
        const f = [], r = [];
        _.forEach((i) => {
          i.addon == "" ? f.push(i) : r.push(i);
        }), u.system = f, u.application = r;
      }).catch(() => {
      });
    };
    k();
    const I = () => {
      V.confirm(
        w("div", null, [
          w("p", null, e("initializeMenuTipsOne")),
          w("p", null, e("initializeMenuTipsTwo"))
        ]),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
          // type: 'warning'
        }
      ).then(() => {
        A().then((_) => {
          location.reload();
        }).catch(() => {
        });
      }).catch(() => {
      });
    }, h = z(null), R = () => {
      h.value.setFormData({ app_type: "site" }), h.value.showDialog = !0;
    }, T = (_) => {
      h.value.setFormData(_), h.value.showDialog = !0;
    }, D = (_) => {
      V.confirm(
        e("menuDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        G("site", _).then((f) => {
          k();
        }).catch(() => {
        });
      });
    };
    return (_, f) => {
      const r = m("el-button"), i = m("el-table-column"), C = m("icon"), g = m("el-tag"), M = m("el-table"), B = m("el-tab-pane"), j = m("el-tabs"), L = m("el-card"), N = U("loading");
      return s(), y("div", K, [
        a(L, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            b("div", P, [
              b("span", Q, o(t(F)), 1),
              b("div", W, [
                a(r, {
                  type: "primary",
                  class: "w-[100px]",
                  onClick: R
                }, {
                  default: l(() => [
                    c(o(t(e)("addMenu")), 1)
                  ]),
                  _: 1
                }),
                a(r, {
                  class: "w-[100px]",
                  onClick: I
                }, {
                  default: l(() => [
                    c(o(t(e)("initializeMenu")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            a(j, {
              modelValue: x.value,
              "onUpdate:modelValue": f[0] || (f[0] = (n) => x.value = n)
            }, {
              default: l(() => [
                a(B, {
                  label: t(e)("system"),
                  name: "system"
                }, {
                  default: l(() => [
                    E((s(), p(M, {
                      data: u.system,
                      "row-key": "menu_key",
                      size: "large"
                    }, {
                      empty: l(() => [
                        b("span", null, o(u.loading ? "" : t(e)("emptyData")), 1)
                      ]),
                      default: l(() => [
                        a(i, {
                          prop: "menu_name",
                          "show-overflow-tooltip": !0,
                          label: t(e)("menuName"),
                          "min-width": "150"
                        }, null, 8, ["label"]),
                        a(i, {
                          label: t(e)("icon"),
                          width: "100",
                          align: "center"
                        }, {
                          default: l(({ row: n }) => [
                            n.icon ? (s(), p(C, {
                              key: 0,
                              name: n.icon,
                              size: "18px"
                            }, null, 8, ["name"])) : d("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          label: t(e)("menuType"),
                          width: "80"
                        }, {
                          default: l(({ row: n }) => [
                            n.menu_type == 0 ? (s(), y("div", X, o(t(e)("menuTypeDir")), 1)) : n.menu_type == 1 ? (s(), y("div", Y, o(t(e)("menuTypeMenu")), 1)) : n.menu_type == 2 ? (s(), y("div", Z, o(t(e)("menuTypeButton")), 1)) : d("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          prop: "api_url",
                          label: t(e)("authId"),
                          "min-width": "150",
                          align: "center"
                        }, null, 8, ["label"]),
                        a(i, {
                          label: t(e)("status"),
                          "min-width": "120",
                          align: "center"
                        }, {
                          default: l(({ row: n }) => [
                            n.status == 1 ? (s(), p(g, {
                              key: 0,
                              class: "ml-2",
                              type: "success"
                            }, {
                              default: l(() => [
                                c(o(t(e)("statusNormal")), 1)
                              ]),
                              _: 1
                            })) : d("", !0),
                            n.status == 0 ? (s(), p(g, {
                              key: 1,
                              class: "ml-2",
                              type: "error"
                            }, {
                              default: l(() => [
                                c(o(t(e)("statusDeactivate")), 1)
                              ]),
                              _: 1
                            })) : d("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          prop: "sort",
                          label: t(e)("sort"),
                          "min-width": "100"
                        }, null, 8, ["label"]),
                        a(i, {
                          label: t(e)("operation"),
                          align: "right",
                          fixed: "right",
                          width: "130"
                        }, {
                          default: l(({ row: n }) => [
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (v) => T(n)
                            }, {
                              default: l(() => [
                                c(o(t(e)("edit")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (v) => D(n.menu_key)
                            }, {
                              default: l(() => [
                                c(o(t(e)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [N, u.loading]
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(B, {
                  label: t(e)("application"),
                  name: "application"
                }, {
                  default: l(() => [
                    E((s(), p(M, {
                      data: u.application,
                      "row-key": "menu_key",
                      size: "large"
                    }, {
                      empty: l(() => [
                        b("span", null, o(u.loading ? "" : t(e)("emptyData")), 1)
                      ]),
                      default: l(() => [
                        a(i, {
                          prop: "menu_name",
                          "show-overflow-tooltip": !0,
                          label: t(e)("menuName"),
                          "min-width": "150"
                        }, null, 8, ["label"]),
                        a(i, {
                          label: t(e)("icon"),
                          width: "100",
                          align: "center"
                        }, {
                          default: l(({ row: n }) => [
                            n.icon ? (s(), p(C, {
                              key: 0,
                              name: n.icon,
                              size: "18px"
                            }, null, 8, ["name"])) : d("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          label: t(e)("menuType"),
                          width: "80"
                        }, {
                          default: l(({ row: n }) => [
                            n.menu_type == 0 ? (s(), y("div", ee, o(t(e)("menuTypeDir")), 1)) : n.menu_type == 1 ? (s(), y("div", te, o(t(e)("menuTypeMenu")), 1)) : n.menu_type == 2 ? (s(), y("div", ne, o(t(e)("menuTypeButton")), 1)) : d("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          prop: "api_url",
                          label: t(e)("authId"),
                          "min-width": "150",
                          align: "center"
                        }, null, 8, ["label"]),
                        a(i, {
                          label: t(e)("status"),
                          "min-width": "120",
                          align: "center"
                        }, {
                          default: l(({ row: n }) => [
                            n.status == 1 ? (s(), p(g, {
                              key: 0,
                              class: "ml-2",
                              type: "success"
                            }, {
                              default: l(() => [
                                c(o(t(e)("statusNormal")), 1)
                              ]),
                              _: 1
                            })) : d("", !0),
                            n.status == 0 ? (s(), p(g, {
                              key: 1,
                              class: "ml-2",
                              type: "error"
                            }, {
                              default: l(() => [
                                c(o(t(e)("statusDeactivate")), 1)
                              ]),
                              _: 1
                            })) : d("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          prop: "sort",
                          label: t(e)("sort"),
                          "min-width": "100"
                        }, null, 8, ["label"]),
                        a(i, {
                          label: t(e)("operation"),
                          align: "right",
                          fixed: "right",
                          width: "130"
                        }, {
                          default: l(({ row: n }) => [
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (v) => T(n)
                            }, {
                              default: l(() => [
                                c(o(t(e)("edit")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            a(r, {
                              type: "primary",
                              link: "",
                              onClick: (v) => D(n.menu_key)
                            }, {
                              default: l(() => [
                                c(o(t(e)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [N, u.loading]
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            a(H, {
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
  de as default
};
