import { defineComponent as I, ref as k, reactive as J, resolveComponent as p, resolveDirective as K, openBlock as h, createElementBlock as Q, normalizeStyle as X, unref as n, createVNode as a, withCtx as r, createElementVNode as f, toDisplayString as c, createTextVNode as m, withDirectives as Y, createBlock as P } from "vue";
import { bt as b, t as e, d_ as Z, bw as ee, d$ as te, e0 as ae, e1 as ne, e2 as le } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as x } from "element-plus";
import { useRoute as re, useRouter as oe } from "vue-router";
import { u as ie } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const se = { class: "flex justify-between items-center mb-[5px]" }, pe = { class: "text-lg" }, ce = { class: "mt-[10px] table-fill-page__panel" }, me = { class: "table-fill-page__table" }, de = { class: "mt-[16px] flex justify-end" }, xe = /* @__PURE__ */ I({
  __name: "list",
  setup(ue) {
    const S = re(), v = oe(), z = S.meta.title, { pageRef: N, pageStyle: R } = ie(), s = k(!1), V = (o) => {
      v.push({ path: o });
    }, t = J({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        printer_name: ""
      }
    }), C = k(), d = (o = 1) => {
      t.loading = !0, t.page = o, Z({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((l) => {
        t.loading = !1, t.data = l.data.data, t.total = l.data.total, ee(t.page, t.limit, t.searchParam);
      }).catch(() => {
        t.loading = !1;
      });
    };
    d(b(t.searchParam).page);
    const y = k(!1), w = (o, l) => {
      y.value || (y.value = !0, te({
        printer_id: o,
        status: l
      }).then((u) => {
        d(b(t.searchParam).page), y.value = !1;
      }));
    }, D = () => {
      v.push("/printer/add");
    }, F = (o) => {
      v.push("/printer/edit?printer_id=" + o.printer_id);
    }, j = (o) => {
      x.confirm(
        e("printerDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value || (s.value = !0, ae(o).then(() => {
          d(b(t.searchParam).page), s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    }, M = (o) => {
      o && (o.resetFields(), d());
    }, U = (o) => {
      x.confirm(
        e("testPrintTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value || (s.value = !0, ne(o).then((l) => {
          s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    }, L = (o) => {
      x.confirm(
        e("refreshTokenTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value || (s.value = !0, le(o).then((l) => {
          d(b(t.searchParam).page), s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    };
    return (o, l) => {
      const u = p("el-button"), T = p("el-tab-pane"), O = p("el-tabs"), H = p("el-input"), B = p("el-form-item"), W = p("el-form"), $ = p("el-card"), _ = p("el-table-column"), E = p("el-tag"), q = p("el-table"), A = p("el-pagination"), G = K("loading");
      return h(), Q("div", {
        ref_key: "pageRef",
        ref: N,
        class: "main-container table-fill-page",
        style: X(n(R))
      }, [
        a($, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: r(() => [
            f("div", se, [
              f("span", pe, c(n(z)), 1),
              a(u, {
                type: "primary",
                onClick: D
              }, {
                default: r(() => [
                  m(c(n(e)("addPrinter")), 1)
                ]),
                _: 1
              })
            ]),
            a(O, {
              class: "demo-tabs",
              "model-value": "/printer/list",
              onTabChange: V
            }, {
              default: r(() => [
                a(T, {
                  label: n(e)("tabPrinterManager"),
                  name: "/printer/list"
                }, null, 8, ["label"]),
                a(T, {
                  label: n(e)("tabPrinterTemplate"),
                  name: "/printer/template/list"
                }, null, 8, ["label"])
              ]),
              _: 1
            }),
            a($, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: r(() => [
                a(W, {
                  inline: !0,
                  model: t.searchParam,
                  ref_key: "searchFormRef",
                  ref: C
                }, {
                  default: r(() => [
                    a(B, {
                      label: n(e)("printerName"),
                      prop: "printer_name"
                    }, {
                      default: r(() => [
                        a(H, {
                          modelValue: t.searchParam.printer_name,
                          "onUpdate:modelValue": l[0] || (l[0] = (i) => t.searchParam.printer_name = i),
                          modelModifiers: { trim: !0 },
                          placeholder: n(e)("printerNamePlaceholder"),
                          maxlength: "20"
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(B, null, {
                      default: r(() => [
                        a(u, {
                          type: "primary",
                          onClick: l[1] || (l[1] = (i) => d())
                        }, {
                          default: r(() => [
                            m(c(n(e)("search")), 1)
                          ]),
                          _: 1
                        }),
                        a(u, {
                          onClick: l[2] || (l[2] = (i) => M(C.value))
                        }, {
                          default: r(() => [
                            m(c(n(e)("reset")), 1)
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
            f("div", ce, [
              f("div", me, [
                Y((h(), P(q, {
                  height: "100%",
                  data: t.data,
                  size: "large"
                }, {
                  empty: r(() => [
                    f("span", null, c(t.loading ? "" : n(e)("emptyData")), 1)
                  ]),
                  default: r(() => [
                    a(_, {
                      prop: "printer_name",
                      label: n(e)("printerName"),
                      "min-width": "220",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    a(_, {
                      prop: "brand_name",
                      label: n(e)("brand"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    a(_, {
                      prop: "print_width",
                      label: n(e)("printWidth"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    a(_, {
                      prop: "status",
                      label: n(e)("status"),
                      "min-width": "80",
                      "show-overflow-tooltip": !0
                    }, {
                      default: r(({ row: i }) => [
                        i.status == 1 ? (h(), P(E, {
                          key: 0,
                          type: "success",
                          onClick: (g) => w(i.printer_id, 0),
                          class: "cursor-pointer"
                        }, {
                          default: r(() => [
                            m(c(n(e)("statusOn")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : (h(), P(E, {
                          key: 1,
                          type: "info",
                          onClick: (g) => w(i.printer_id, 1),
                          class: "cursor-pointer"
                        }, {
                          default: r(() => [
                            m(c(n(e)("statusOff")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(_, {
                      label: n(e)("operation"),
                      fixed: "right",
                      "min-width": "250"
                    }, {
                      default: r(({ row: i }) => [
                        a(u, {
                          type: "primary",
                          link: "",
                          onClick: (g) => U(i.printer_id)
                        }, {
                          default: r(() => [
                            m(c(n(e)("testPrint")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        a(u, {
                          type: "primary",
                          link: "",
                          onClick: (g) => L(i.printer_id)
                        }, {
                          default: r(() => [
                            m(c(n(e)("refreshToken")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        a(u, {
                          type: "primary",
                          link: "",
                          onClick: (g) => F(i)
                        }, {
                          default: r(() => [
                            m(c(n(e)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        a(u, {
                          type: "primary",
                          link: "",
                          onClick: (g) => j(i.printer_id)
                        }, {
                          default: r(() => [
                            m(c(n(e)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [G, t.loading]
                ])
              ]),
              f("div", de, [
                a(A, {
                  "current-page": t.page,
                  "onUpdate:current-page": l[3] || (l[3] = (i) => t.page = i),
                  "page-size": t.limit,
                  "onUpdate:page-size": l[4] || (l[4] = (i) => t.limit = i),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: t.total,
                  onSizeChange: l[5] || (l[5] = (i) => d()),
                  onCurrentChange: d
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  xe as default
};
