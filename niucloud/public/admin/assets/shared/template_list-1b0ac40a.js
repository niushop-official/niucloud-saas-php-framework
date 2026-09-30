import { defineComponent as A, reactive as G, ref as k, resolveComponent as i, resolveDirective as I, openBlock as g, createElementBlock as x, normalizeStyle as J, unref as l, createVNode as t, withCtx as r, createElementVNode as d, toDisplayString as m, createTextVNode as _, Fragment as K, renderList as O, createBlock as w, withDirectives as Q } from "vue";
import { dW as X, bt as C, t as a, e6 as Y, bw as Z, e7 as ee } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as te } from "element-plus";
import { useRoute as ae, useRouter as le } from "vue-router";
import { u as ne } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const oe = { class: "flex justify-between items-center mb-[5px]" }, re = { class: "text-lg" }, pe = { class: "mt-[10px] table-fill-page__panel" }, ie = { class: "table-fill-page__table" }, me = { class: "mt-[16px] flex justify-end" }, ve = /* @__PURE__ */ A({
  __name: "template_list",
  setup(se) {
    const V = ae(), f = le(), z = V.meta.title, { pageRef: N, pageStyle: B } = ne(), R = (p) => {
      f.push({ path: p });
    }, e = G({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        template_name: "",
        template_type: ""
      }
    }), h = k(), y = k([]);
    X({}).then((p) => {
      p.data && (y.value = p.data);
    });
    const s = (p = 1) => {
      e.loading = !0, e.page = p, Y({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((n) => {
        e.loading = !1, e.data = n.data.data, e.total = n.data.total, Z(e.page, e.limit, e.searchParam);
      }).catch(() => {
        e.loading = !1;
      });
    };
    s(C(e.searchParam).page);
    const S = () => {
      f.push("/printer/template/add");
    }, D = (p) => {
      f.push("/printer/template/edit?template_id=" + p.template_id);
    }, E = (p) => {
      te.confirm(
        a("printerTemplateDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        ee(p).then(() => {
          s(C(e.searchParam).page);
        });
      });
    }, F = (p) => {
      p && (p.resetFields(), s());
    };
    return (p, n) => {
      const c = i("el-button"), v = i("el-tab-pane"), $ = i("el-tabs"), U = i("el-input"), b = i("el-form-item"), j = i("el-option"), L = i("el-select"), M = i("el-form"), P = i("el-card"), u = i("el-table-column"), H = i("el-table"), W = i("el-pagination"), q = I("loading");
      return g(), x("div", {
        ref_key: "pageRef",
        ref: N,
        class: "main-container table-fill-page",
        style: J(l(B))
      }, [
        t(P, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: r(() => [
            d("div", oe, [
              d("span", re, m(l(z)), 1),
              t(c, {
                type: "primary",
                onClick: S
              }, {
                default: r(() => [
                  _(m(l(a)("addPrinterTemplate")), 1)
                ]),
                _: 1
              })
            ]),
            t($, {
              class: "demo-tabs",
              "model-value": "/printer/template/list",
              onTabChange: R
            }, {
              default: r(() => [
                t(v, {
                  label: l(a)("tabPrinterManager"),
                  name: "/printer/list"
                }, null, 8, ["label"]),
                t(v, {
                  label: l(a)("tabPrinterTemplate"),
                  name: "/printer/template/list"
                }, null, 8, ["label"])
              ]),
              _: 1
            }),
            t(P, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: r(() => [
                t(M, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: h
                }, {
                  default: r(() => [
                    t(b, {
                      label: l(a)("templateName"),
                      prop: "template_name"
                    }, {
                      default: r(() => [
                        t(U, {
                          modelValue: e.searchParam.template_name,
                          "onUpdate:modelValue": n[0] || (n[0] = (o) => e.searchParam.template_name = o),
                          modelModifiers: { trim: !0 },
                          placeholder: l(a)("templateNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(b, {
                      label: l(a)("templateType"),
                      prop: "template_type"
                    }, {
                      default: r(() => [
                        t(L, {
                          modelValue: e.searchParam.template_type,
                          "onUpdate:modelValue": n[1] || (n[1] = (o) => e.searchParam.template_type = o),
                          placeholder: l(a)("templateTypePlaceholder"),
                          clearable: ""
                        }, {
                          default: r(() => [
                            (g(!0), x(K, null, O(y.value, (o, T) => (g(), w(j, {
                              key: p.itemkey,
                              label: o.title,
                              value: o.key
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(b, null, {
                      default: r(() => [
                        t(c, {
                          type: "primary",
                          onClick: n[2] || (n[2] = (o) => s())
                        }, {
                          default: r(() => [
                            _(m(l(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(c, {
                          onClick: n[3] || (n[3] = (o) => F(h.value))
                        }, {
                          default: r(() => [
                            _(m(l(a)("reset")), 1)
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
            d("div", pe, [
              d("div", ie, [
                Q((g(), w(H, {
                  height: "100%",
                  data: e.data,
                  size: "large"
                }, {
                  empty: r(() => [
                    d("span", null, m(e.loading ? "" : l(a)("emptyData")), 1)
                  ]),
                  default: r(() => [
                    t(u, {
                      prop: "template_name",
                      label: l(a)("templateName"),
                      "min-width": "220",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    t(u, {
                      prop: "template_type_name",
                      label: l(a)("templateType"),
                      "min-width": "180",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    t(u, {
                      prop: "create_time",
                      label: l(a)("createTime"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    t(u, {
                      label: l(a)("operation"),
                      fixed: "right",
                      "min-width": "140"
                    }, {
                      default: r(({ row: o }) => [
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (T) => D(o)
                        }, {
                          default: r(() => [
                            _(m(l(a)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t(c, {
                          type: "primary",
                          link: "",
                          onClick: (T) => E(o.template_id)
                        }, {
                          default: r(() => [
                            _(m(l(a)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [q, e.loading]
                ])
              ]),
              d("div", me, [
                t(W, {
                  "current-page": e.page,
                  "onUpdate:current-page": n[4] || (n[4] = (o) => e.page = o),
                  "page-size": e.limit,
                  "onUpdate:page-size": n[5] || (n[5] = (o) => e.limit = o),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: n[6] || (n[6] = (o) => s()),
                  onCurrentChange: s
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
  ve as default
};
