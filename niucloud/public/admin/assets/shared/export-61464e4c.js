import { defineComponent as Y, reactive as A, ref as k, resolveComponent as s, resolveDirective as H, openBlock as i, createElementBlock as w, normalizeStyle as M, unref as r, createVNode as l, withCtx as n, Fragment as S, renderList as L, createBlock as f, createTextVNode as u, toDisplayString as p, createElementVNode as y, withDirectives as j, createCommentVNode as I } from "vue";
import { t, eU as O, eV as W, eW as X, j as q, eX as G } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as J } from "element-plus";
import Q from "./index-559a9b12.js";
import Z from "./index-997caa57.js";
import { useRoute as ee } from "vue-router";
import { u as te } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ae = { class: "table-panel mt-[10px] table-fill-page__panel" }, le = { class: "table-fill-page__table" }, oe = { class: "flex justify-end" }, ye = /* @__PURE__ */ Y({
  __name: "export",
  setup(re) {
    const T = ee().meta.title, { pageRef: D, pageStyle: z } = te(), o = A({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        export_key: "",
        export_status: "",
        create_time: []
      }
    }), P = k(), E = k([]);
    (async () => {
      E.value = await (await O({})).data;
    })();
    const V = k([]);
    (async () => {
      V.value = await (await W({})).data;
    })();
    const K = (d) => {
      d && (d.resetFields(), b());
    }, b = (d = 1) => {
      o.loading = !0, o.page = d, X({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((a) => {
        o.loading = !1, o.data = a.data.data, o.total = a.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    b();
    const B = (d) => {
      const a = q(d.file_path), g = a.substring(a.lastIndexOf("."), a.length), m = document.createElement("a");
      m.setAttribute("download", a), m.setAttribute("target", "_blank"), m.setAttribute("href", a), m.click();
    }, N = (d) => {
      J.confirm(
        t("exportDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        G(d).then(() => {
          b();
        });
      });
    };
    return (d, a) => {
      const g = s("el-option"), m = s("el-select"), x = s("el-form-item"), U = s("el-date-picker"), h = s("el-button"), F = s("el-form"), C = s("el-card"), c = s("el-table-column"), v = s("el-tag"), R = s("el-table"), $ = H("loading");
      return i(), w("div", {
        ref_key: "pageRef",
        ref: D,
        class: "main-container table-fill-page",
        style: M(r(z))
      }, [
        l(C, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: n(() => [
            l(C, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: n(() => [
                l(F, {
                  inline: !0,
                  model: o.searchParam,
                  ref_key: "searchFormRef",
                  ref: P
                }, {
                  default: n(() => [
                    l(x, {
                      label: r(t)("exportKey"),
                      prop: "export_key"
                    }, {
                      default: n(() => [
                        l(m, {
                          modelValue: o.searchParam.export_key,
                          "onUpdate:modelValue": a[0] || (a[0] = (e) => o.searchParam.export_key = e),
                          clearable: "",
                          placeholder: r(t)("exportKeyPlaceholder"),
                          class: "input-width"
                        }, {
                          default: n(() => [
                            l(g, {
                              label: r(t)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (i(!0), w(S, null, L(V.value, (e, _) => (i(), f(g, {
                              label: e,
                              value: _,
                              key: _
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(x, {
                      label: r(t)("exportStatus"),
                      prop: "export_status"
                    }, {
                      default: n(() => [
                        l(m, {
                          modelValue: o.searchParam.export_status,
                          "onUpdate:modelValue": a[1] || (a[1] = (e) => o.searchParam.export_status = e),
                          clearable: "",
                          placeholder: r(t)("exportStatusPlaceholder"),
                          class: "input-width"
                        }, {
                          default: n(() => [
                            l(g, {
                              label: r(t)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (i(!0), w(S, null, L(E.value, (e, _) => (i(), f(g, {
                              label: e,
                              value: _,
                              key: _
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(x, {
                      label: r(t)("createTime"),
                      prop: "create_time"
                    }, {
                      default: n(() => [
                        l(U, {
                          modelValue: o.searchParam.create_time,
                          "onUpdate:modelValue": a[2] || (a[2] = (e) => o.searchParam.create_time = e),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": r(t)("startDate"),
                          "end-placeholder": r(t)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(x, null, {
                      default: n(() => [
                        l(h, {
                          type: "primary",
                          onClick: a[3] || (a[3] = (e) => b())
                        }, {
                          default: n(() => [
                            u(p(r(t)("search")), 1)
                          ]),
                          _: 1
                        }),
                        l(h, {
                          onClick: a[4] || (a[4] = (e) => K(P.value))
                        }, {
                          default: n(() => [
                            u(p(r(t)("reset")), 1)
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
            y("div", ae, [
              l(Z, {
                title: r(T),
                selectable: !1
              }, null, 8, ["title"]),
              y("div", le, [
                j((i(), f(R, {
                  height: "100%",
                  data: o.data,
                  size: "large"
                }, {
                  empty: n(() => [
                    y("span", null, p(o.loading ? "" : r(t)("emptyData")), 1)
                  ]),
                  default: n(() => [
                    l(c, {
                      prop: "id",
                      label: r(t)("id"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    l(c, {
                      prop: "export_key_name",
                      label: r(t)("exportKey"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    l(c, {
                      prop: "export_num",
                      label: r(t)("exportNum"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    l(c, {
                      prop: "file_path",
                      label: r(t)("filePath"),
                      "min-width": "180",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    l(c, {
                      prop: "file_size",
                      label: r(t)("fileSize"),
                      "min-width": "110"
                    }, {
                      default: n(({ row: e }) => [
                        u(p(e.file_size / 1e3) + "k ", 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(c, {
                      prop: "export_status",
                      label: r(t)("exportStatus"),
                      "min-width": "120",
                      align: "center"
                    }, {
                      default: n(({ row: e }) => [
                        e.export_status == 1 ? (i(), f(v, {
                          key: 0,
                          type: "warning",
                          class: "cursor-pointer"
                        }, {
                          default: n(() => [
                            u(p(e.export_status_name), 1)
                          ]),
                          _: 2
                        }, 1024)) : e.export_status == 2 ? (i(), f(v, {
                          key: 1,
                          type: "success",
                          class: "cursor-pointer"
                        }, {
                          default: n(() => [
                            u(p(e.export_status_name), 1)
                          ]),
                          _: 2
                        }, 1024)) : (i(), f(v, {
                          key: 2,
                          type: "error",
                          class: "cursor-pointer"
                        }, {
                          default: n(() => [
                            u(p(e.export_status_name), 1)
                          ]),
                          _: 2
                        }, 1024))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(c, {
                      label: r(t)("createTime"),
                      "min-width": "150",
                      align: "center"
                    }, {
                      default: n(({ row: e }) => [
                        u(p(e.create_time || ""), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(c, {
                      label: r(t)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "130"
                    }, {
                      default: n(({ row: e }) => [
                        y("div", oe, [
                          e.export_status == 2 ? (i(), f(h, {
                            key: 0,
                            type: "primary",
                            link: "",
                            onClick: (_) => B(e)
                          }, {
                            default: n(() => [
                              u(p(r(t)("download")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : I("", !0),
                          l(h, {
                            type: "primary",
                            link: "",
                            onClick: (_) => N(e.id)
                          }, {
                            default: n(() => [
                              u(p(r(t)("delete")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [$, o.loading]
                ])
              ]),
              l(Q, {
                "current-page": o.page,
                "onUpdate:current-page": a[5] || (a[5] = (e) => o.page = e),
                "page-size": o.limit,
                "onUpdate:page-size": a[6] || (a[6] = (e) => o.limit = e),
                total: o.total,
                onSizeChange: a[7] || (a[7] = (e) => b()),
                onCurrentChange: b
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  ye as default
};
