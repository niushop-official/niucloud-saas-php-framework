import { defineComponent as H, reactive as q, ref as k, resolveComponent as i, resolveDirective as A, openBlock as g, createElementBlock as x, createVNode as t, withCtx as r, createElementVNode as c, toDisplayString as m, unref as n, createTextVNode as u, Fragment as I, renderList as J, createBlock as w, withDirectives as K } from "vue";
import { du as O, bl as C, t as a, dG as Q, bo as W, dH as X } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as Y } from "element-plus";
import { useRoute as Z, useRouter as ee } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const te = { class: "main-container" }, ae = { class: "flex justify-between items-center mb-[5px]" }, le = { class: "text-lg" }, ne = { class: "mt-[10px]" }, oe = { class: "mt-[16px] flex justify-end" }, ge = /* @__PURE__ */ H({
  __name: "template_list",
  setup(re) {
    const V = Z(), f = ee(), N = V.meta.title, z = (p) => {
      f.push({ path: p });
    }, e = q({
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
    O({}).then((p) => {
      p.data && (y.value = p.data);
    });
    const s = (p = 1) => {
      e.loading = !0, e.page = p, Q({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((l) => {
        e.loading = !1, e.data = l.data.data, e.total = l.data.total, W(e.page, e.limit, e.searchParam);
      }).catch(() => {
        e.loading = !1;
      });
    };
    s(C(e.searchParam).page);
    const B = () => {
      f.push("/printer/template/add");
    }, D = (p) => {
      f.push("/printer/template/edit?template_id=" + p.template_id);
    }, E = (p) => {
      Y.confirm(
        a("printerTemplateDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        X(p).then(() => {
          s(C(e.searchParam).page);
        });
      });
    }, F = (p) => {
      p && (p.resetFields(), s());
    };
    return (p, l) => {
      const d = i("el-button"), v = i("el-tab-pane"), S = i("el-tabs"), $ = i("el-input"), b = i("el-form-item"), R = i("el-option"), U = i("el-select"), j = i("el-form"), P = i("el-card"), _ = i("el-table-column"), L = i("el-table"), M = i("el-pagination"), G = A("loading");
      return g(), x("div", te, [
        t(P, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            c("div", ae, [
              c("span", le, m(n(N)), 1),
              t(d, {
                type: "primary",
                onClick: B
              }, {
                default: r(() => [
                  u(m(n(a)("addPrinterTemplate")), 1)
                ]),
                _: 1
              })
            ]),
            t(S, {
              class: "demo-tabs",
              "model-value": "/printer/template/list",
              onTabChange: z
            }, {
              default: r(() => [
                t(v, {
                  label: n(a)("tabPrinterManager"),
                  name: "/printer/list"
                }, null, 8, ["label"]),
                t(v, {
                  label: n(a)("tabPrinterTemplate"),
                  name: "/printer/template/list"
                }, null, 8, ["label"])
              ]),
              _: 1
            }),
            t(P, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                t(j, {
                  inline: !0,
                  model: e.searchParam,
                  ref_key: "searchFormRef",
                  ref: h
                }, {
                  default: r(() => [
                    t(b, {
                      label: n(a)("templateName"),
                      prop: "template_name"
                    }, {
                      default: r(() => [
                        t($, {
                          modelValue: e.searchParam.template_name,
                          "onUpdate:modelValue": l[0] || (l[0] = (o) => e.searchParam.template_name = o),
                          modelModifiers: { trim: !0 },
                          placeholder: n(a)("templateNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(b, {
                      label: n(a)("templateType"),
                      prop: "template_type"
                    }, {
                      default: r(() => [
                        t(U, {
                          modelValue: e.searchParam.template_type,
                          "onUpdate:modelValue": l[1] || (l[1] = (o) => e.searchParam.template_type = o),
                          placeholder: n(a)("templateTypePlaceholder"),
                          clearable: ""
                        }, {
                          default: r(() => [
                            (g(!0), x(I, null, J(y.value, (o, T) => (g(), w(R, {
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
                        t(d, {
                          type: "primary",
                          onClick: l[2] || (l[2] = (o) => s())
                        }, {
                          default: r(() => [
                            u(m(n(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, {
                          onClick: l[3] || (l[3] = (o) => F(h.value))
                        }, {
                          default: r(() => [
                            u(m(n(a)("reset")), 1)
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
            c("div", ne, [
              K((g(), w(L, {
                data: e.data,
                size: "large"
              }, {
                empty: r(() => [
                  c("span", null, m(e.loading ? "" : n(a)("emptyData")), 1)
                ]),
                default: r(() => [
                  t(_, {
                    prop: "template_name",
                    label: n(a)("templateName"),
                    "min-width": "220",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  t(_, {
                    prop: "template_type_name",
                    label: n(a)("templateType"),
                    "min-width": "180",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  t(_, {
                    prop: "create_time",
                    label: n(a)("createTime"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(_, {
                    label: n(a)("operation"),
                    fixed: "right",
                    "min-width": "120"
                  }, {
                    default: r(({ row: o }) => [
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (T) => D(o)
                      }, {
                        default: r(() => [
                          u(m(n(a)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (T) => E(o.template_id)
                      }, {
                        default: r(() => [
                          u(m(n(a)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [G, e.loading]
              ]),
              c("div", oe, [
                t(M, {
                  "current-page": e.page,
                  "onUpdate:currentPage": l[4] || (l[4] = (o) => e.page = o),
                  "page-size": e.limit,
                  "onUpdate:pageSize": l[5] || (l[5] = (o) => e.limit = o),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: l[6] || (l[6] = (o) => s()),
                  onCurrentChange: s
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
  ge as default
};
