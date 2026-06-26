import { defineComponent as G, ref as y, reactive as H, resolveComponent as p, resolveDirective as I, openBlock as h, createElementBlock as J, createVNode as a, withCtx as l, createElementVNode as g, toDisplayString as c, unref as n, createTextVNode as d, withDirectives as K, createBlock as P } from "vue";
import { bl as v, t as e, dy as Q, bo as X, dz as Y, dA as Z, dB as ee, dC as te } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as C } from "element-plus";
import { useRoute as ae, useRouter as ne } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const re = { class: "main-container" }, le = { class: "flex justify-between items-center mb-[5px]" }, oe = { class: "text-lg" }, ie = { class: "mt-[10px]" }, se = { class: "mt-[16px] flex justify-end" }, ve = /* @__PURE__ */ G({
  __name: "list",
  setup(pe) {
    const z = ae(), b = ne(), N = z.meta.title, s = y(!1), S = (o) => {
      b.push({ path: o });
    }, t = H({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        printer_name: ""
      }
    }), x = y(), m = (o = 1) => {
      t.loading = !0, t.page = o, Q({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((r) => {
        t.loading = !1, t.data = r.data.data, t.total = r.data.total, X(t.page, t.limit, t.searchParam);
      }).catch(() => {
        t.loading = !1;
      });
    };
    m(v(t.searchParam).page);
    const k = y(!1), w = (o, r) => {
      k.value || (k.value = !0, Y({
        printer_id: o,
        status: r
      }).then((u) => {
        m(v(t.searchParam).page), k.value = !1;
      }));
    }, V = () => {
      b.push("/printer/add");
    }, D = (o) => {
      b.push("/printer/edit?printer_id=" + o.printer_id);
    }, R = (o) => {
      C.confirm(
        e("printerDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value || (s.value = !0, Z(o).then(() => {
          m(v(t.searchParam).page), s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    }, F = (o) => {
      o && (o.resetFields(), m());
    }, j = (o) => {
      C.confirm(
        e("testPrintTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value || (s.value = !0, ee(o).then((r) => {
          s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    }, M = (o) => {
      C.confirm(
        e("refreshTokenTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        s.value || (s.value = !0, te(o).then((r) => {
          m(v(t.searchParam).page), s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    };
    return (o, r) => {
      const u = p("el-button"), T = p("el-tab-pane"), U = p("el-tabs"), L = p("el-input"), B = p("el-form-item"), O = p("el-form"), $ = p("el-card"), f = p("el-table-column"), E = p("el-tag"), A = p("el-table"), W = p("el-pagination"), q = I("loading");
      return h(), J("div", re, [
        a($, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            g("div", le, [
              g("span", oe, c(n(N)), 1),
              a(u, {
                type: "primary",
                onClick: V
              }, {
                default: l(() => [
                  d(c(n(e)("addPrinter")), 1)
                ]),
                _: 1
              })
            ]),
            a(U, {
              class: "demo-tabs",
              "model-value": "/printer/list",
              onTabChange: S
            }, {
              default: l(() => [
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
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: l(() => [
                a(O, {
                  inline: !0,
                  model: t.searchParam,
                  ref_key: "searchFormRef",
                  ref: x
                }, {
                  default: l(() => [
                    a(B, {
                      label: n(e)("printerName"),
                      prop: "printer_name"
                    }, {
                      default: l(() => [
                        a(L, {
                          modelValue: t.searchParam.printer_name,
                          "onUpdate:modelValue": r[0] || (r[0] = (i) => t.searchParam.printer_name = i),
                          modelModifiers: { trim: !0 },
                          placeholder: n(e)("printerNamePlaceholder"),
                          maxlength: "20"
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(B, null, {
                      default: l(() => [
                        a(u, {
                          type: "primary",
                          onClick: r[1] || (r[1] = (i) => m())
                        }, {
                          default: l(() => [
                            d(c(n(e)("search")), 1)
                          ]),
                          _: 1
                        }),
                        a(u, {
                          onClick: r[2] || (r[2] = (i) => F(x.value))
                        }, {
                          default: l(() => [
                            d(c(n(e)("reset")), 1)
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
            g("div", ie, [
              K((h(), P(A, {
                data: t.data,
                size: "large"
              }, {
                empty: l(() => [
                  g("span", null, c(t.loading ? "" : n(e)("emptyData")), 1)
                ]),
                default: l(() => [
                  a(f, {
                    prop: "printer_name",
                    label: n(e)("printerName"),
                    "min-width": "220",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(f, {
                    prop: "brand_name",
                    label: n(e)("brand"),
                    "min-width": "120",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(f, {
                    prop: "print_width",
                    label: n(e)("printWidth"),
                    "min-width": "120",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  a(f, {
                    prop: "status",
                    label: n(e)("status"),
                    "min-width": "80",
                    "show-overflow-tooltip": !0
                  }, {
                    default: l(({ row: i }) => [
                      i.status == 1 ? (h(), P(E, {
                        key: 0,
                        type: "success",
                        onClick: (_) => w(i.printer_id, 0),
                        class: "cursor-pointer"
                      }, {
                        default: l(() => [
                          d(c(n(e)("statusOn")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : (h(), P(E, {
                        key: 1,
                        type: "info",
                        onClick: (_) => w(i.printer_id, 1),
                        class: "cursor-pointer"
                      }, {
                        default: l(() => [
                          d(c(n(e)("statusOff")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("operation"),
                    fixed: "right",
                    "min-width": "120"
                  }, {
                    default: l(({ row: i }) => [
                      a(u, {
                        type: "primary",
                        link: "",
                        onClick: (_) => j(i.printer_id)
                      }, {
                        default: l(() => [
                          d(c(n(e)("testPrint")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a(u, {
                        type: "primary",
                        link: "",
                        onClick: (_) => M(i.printer_id)
                      }, {
                        default: l(() => [
                          d(c(n(e)("refreshToken")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a(u, {
                        type: "primary",
                        link: "",
                        onClick: (_) => D(i)
                      }, {
                        default: l(() => [
                          d(c(n(e)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a(u, {
                        type: "primary",
                        link: "",
                        onClick: (_) => R(i.printer_id)
                      }, {
                        default: l(() => [
                          d(c(n(e)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [q, t.loading]
              ]),
              g("div", se, [
                a(W, {
                  "current-page": t.page,
                  "onUpdate:currentPage": r[3] || (r[3] = (i) => t.page = i),
                  "page-size": t.limit,
                  "onUpdate:pageSize": r[4] || (r[4] = (i) => t.limit = i),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: t.total,
                  onSizeChange: r[5] || (r[5] = (i) => m()),
                  onCurrentChange: m
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  ve as default
};
