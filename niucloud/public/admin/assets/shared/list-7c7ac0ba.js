import { defineComponent as ce, reactive as de, ref as y, watch as pe, resolveComponent as r, resolveDirective as me, openBlock as u, createElementBlock as j, createVNode as t, withCtx as o, createElementVNode as _, toDisplayString as m, unref as s, Fragment as ue, renderList as _e, createBlock as k, createTextVNode as g, withDirectives as R, createCommentVNode as fe } from "vue";
import { M as ge, t as a, gl as he, bo as ve, gm as be, gj as ye, gk as ke, i as xe, gn as we } from "./core-shared-ca1fcae5.js";
import { ElMessage as D, ElMessageBox as U } from "element-plus";
import { useRouter as Ce, useRoute as Te } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Fe = { class: "main-container" }, Pe = { class: "flex justify-between items-center" }, Ve = { class: "text-page-title" }, Ne = { class: "mt-[16px] flex justify-end" }, Se = { class: "flex h-[50vh]" }, je = { class: "w-[600px]" }, De = { class: "flex items-center" }, ze = { class: "pl-[5px]" }, Be = {
  class: "ml-[20px] relative",
  style: { width: "calc(100% - 285px)" }
}, qe = /* @__PURE__ */ ce({
  __name: "list",
  setup($e) {
    const M = Ce(), O = Te().meta.title, l = de({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        table_name: "",
        table_content: "",
        addon_name: ""
      }
    }), z = y(), G = (i) => {
      i && (i.resetFields(), h());
    }, h = (i = 1) => {
      l.loading = !0, l.page = i, he({
        page: l.page,
        limit: l.limit,
        ...l.searchParam
      }).then((e) => {
        l.loading = !1, l.data = e.data.data, l.total = e.data.total, ve(l.page, l.limit, l.searchParam);
      }).catch(() => {
        l.loading = !1;
      });
    };
    h();
    const K = (i) => {
      U.confirm(
        a("codeDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        be(i).then(() => {
          h();
        }).catch(() => {
        });
      });
    }, q = (i) => {
      M.push("/tools/code/edit?id=" + i.id);
    }, H = (i) => {
      ye({ id: i }).then((e) => {
        l.loading = !1, U.confirm(
          e.msg != "2" ? a("saveAndSyncText") : a("saveAndSyncText1"),
          a("warning"),
          {
            confirmButtonText: a("confirm"),
            cancelButtonText: a("cancel")
          }
        ).then(() => {
          B(i, 3);
        }).catch(() => {
        });
      }).catch(() => {
        l.loading = !1;
      });
    }, B = (i, e) => {
      l.loading = !0, ke({ id: i, generate_type: e }).then((c) => {
        D({
          type: "success",
          message: "操作成功"
        }), e != 3 ? (l.loading = !1, window.open(xe(c.data.file), "_blank")) : h();
      }).catch(() => {
        l.loading = !1;
      });
    }, N = y([]), S = y(!1), F = y([]), P = y(!1), T = y(""), V = y(""), I = (i) => {
      S.value = !0, P.value = !0, T.value = "", F.value = [], V.value = "", we(i).then((e) => {
        N.value = e.data, F.value = Q(e.data.map((c) => c.file_dir + c.name)), T.value = N.value[0].content, P.value = !1;
      }).catch(() => {
        P.value = !1;
      });
    }, J = (i) => {
      N.value.forEach((e) => {
        i.path === e.file_dir + e.name && (T.value = e.content);
      });
    }, Q = (i) => {
      const e = [];
      if (Array.isArray(i))
        for (let v = 0; v < i.length; ++v) {
          const x = i[v].split("/");
          let w = e;
          for (let d = 0; d < x.length; ++d) {
            const C = x[d];
            let p = null;
            for (var c = 0; c < w.length; ++c) {
              const f = w[c];
              if (f.name === C) {
                p = f;
                break;
              }
            }
            p || (p = { name: C, path: C.indexOf(".") < 0 ? "" : i[v], key: "k" + v + d + c }, C.indexOf(".") < 0 && (p.children = []), p.path === i[0] && (V.value = p.key), w.push(p)), p.children && (w = p.children);
          }
        }
      return e;
    }, { copy: W, isSupported: X, copied: $ } = ge(), Y = () => {
      if (!X.value) {
        D({
          message: a("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      W(T.value);
    };
    return pe($, () => {
      $.value && D({
        message: a("copySuccess"),
        type: "success"
      });
    }), (i, e) => {
      const c = r("el-option"), v = r("el-select"), x = r("el-form-item"), w = r("el-input"), d = r("el-button"), C = r("el-form"), p = r("el-card"), f = r("el-table-column"), Z = r("el-table"), ee = r("el-pagination"), te = r("Folder"), le = r("FolderOpened"), E = r("el-icon"), ae = r("Document"), ne = r("el-tree"), L = r("el-scrollbar"), oe = r("highlightjs"), ie = r("icon"), re = r("el-tooltip"), se = r("el-dialog"), A = me("loading");
      return u(), j("div", Fe, [
        t(p, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            _("div", Pe, [
              _("span", Ve, m(s(O)), 1)
            ]),
            t(p, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                t(C, {
                  inline: !0,
                  model: l.searchParam,
                  ref_key: "searchFormRef",
                  ref: z
                }, {
                  default: o(() => [
                    t(x, {
                      label: s(a)("addonName"),
                      prop: "addon_name"
                    }, {
                      default: o(() => [
                        t(v, {
                          modelValue: l.searchParam.addon_name,
                          "onUpdate:modelValue": e[0] || (e[0] = (n) => l.searchParam.addon_name = n),
                          placeholder: "全部",
                          filterable: "",
                          remote: "",
                          clearable: "",
                          "remote-method": h
                        }, {
                          default: o(() => [
                            t(c, {
                              label: "全部",
                              value: ""
                            }),
                            t(c, {
                              label: "系统",
                              value: "2"
                            }),
                            (u(!0), j(ue, null, _e(i.addonList, (n) => (u(), k(c, {
                              label: n.title,
                              value: n.key,
                              key: n.key
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(x, {
                      label: s(a)("tableName"),
                      prop: "table_name"
                    }, {
                      default: o(() => [
                        t(w, {
                          modelValue: l.searchParam.table_name,
                          "onUpdate:modelValue": e[1] || (e[1] = (n) => l.searchParam.table_name = n),
                          modelModifiers: { trim: !0 },
                          placeholder: s(a)("tableNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(x, null, {
                      default: o(() => [
                        t(d, {
                          type: "primary",
                          onClick: e[2] || (e[2] = (n) => h())
                        }, {
                          default: o(() => [
                            g(m(s(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, {
                          onClick: e[3] || (e[3] = (n) => G(z.value))
                        }, {
                          default: o(() => [
                            g(m(s(a)("reset")), 1)
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
            _("div", null, [
              R((u(), k(Z, {
                data: l.data,
                size: "large"
              }, {
                empty: o(() => [
                  _("span", null, m(l.loading ? "" : s(a)("emptyData")), 1)
                ]),
                default: o(() => [
                  t(f, {
                    prop: "table_name",
                    "show-overflow-tooltip": !0,
                    label: s(a)("tableName"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(f, {
                    prop: "title",
                    "show-overflow-tooltip": !0,
                    label: s(a)("addonName"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(f, {
                    prop: "table_content",
                    "show-overflow-tooltip": !0,
                    label: s(a)("tableContent"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  t(f, {
                    prop: "edit_type",
                    label: s(a)("editType"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: o(({ row: n }) => [
                      g(m(n.edit_type == 1 ? s(a)("popup") : s(a)("page")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(f, {
                    label: s(a)("createTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: o(({ row: n }) => [
                      g(m(n.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(f, {
                    label: s(a)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "330"
                  }, {
                    default: o(({ row: n }) => [
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (b) => q(n)
                      }, {
                        default: o(() => [
                          g(m(s(a)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (b) => I(n.id)
                      }, {
                        default: o(() => [
                          g(m(s(a)("preview")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (b) => H(n.id)
                      }, {
                        default: o(() => [
                          g(m(s(a)("saveAndSync")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (b) => B(n.id, 2)
                      }, {
                        default: o(() => [
                          g(m(s(a)("download")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(d, {
                        type: "primary",
                        link: "",
                        onClick: (b) => K(n.id)
                      }, {
                        default: o(() => [
                          g(m(s(a)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [A, l.loading]
              ]),
              _("div", Ne, [
                t(ee, {
                  "current-page": l.page,
                  "onUpdate:currentPage": e[4] || (e[4] = (n) => l.page = n),
                  "page-size": l.limit,
                  "onUpdate:pageSize": e[5] || (e[5] = (n) => l.limit = n),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: l.total,
                  onSizeChange: e[6] || (e[6] = (n) => h()),
                  onCurrentChange: h
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        t(se, {
          modelValue: S.value,
          "onUpdate:modelValue": e[7] || (e[7] = (n) => S.value = n),
          class: "dialog-visible",
          width: "70%",
          title: "代码预览"
        }, {
          default: o(() => [
            R((u(), j("div", Se, [
              t(L, { class: "h-[100%] w-[270px]" }, {
                default: o(() => [
                  _("div", je, [
                    F.value.length && V.value != "" ? (u(), k(ne, {
                      key: 0,
                      data: F.value,
                      props: { label: "name", value: "key" },
                      "node-key": "key",
                      "current-node-key": V.value,
                      "expand-on-click-node": !1,
                      "highlight-current": "",
                      "default-expand-all": "",
                      ref: "treeRef",
                      onNodeClick: J
                    }, {
                      default: o(({ node: n, data: b }) => [
                        _("div", De, [
                          b.children ? (u(), k(E, { key: 0 }, {
                            default: o(() => [
                              n.expanded ? (u(), k(le, { key: 1 })) : (u(), k(te, { key: 0 }))
                            ]),
                            _: 2
                          }, 1024)) : (u(), k(E, { key: 1 }, {
                            default: o(() => [
                              t(ae)
                            ]),
                            _: 1
                          })),
                          _("span", ze, m(b.name), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["data", "current-node-key"])) : fe("", !0)
                  ])
                ]),
                _: 1
              }),
              _("div", Be, [
                t(L, { class: "h-[100%] w-[100%]" }, {
                  default: o(() => [
                    t(oe, {
                      autodetect: "",
                      class: "h-[100%]",
                      code: T.value
                    }, null, 8, ["code"])
                  ]),
                  _: 1
                }),
                _("div", {
                  class: "absolute top-0 right-[15px] z-5 cursor-pointer hover:text-primary",
                  onClick: Y
                }, [
                  t(re, {
                    content: "点击复制",
                    placement: "top"
                  }, {
                    default: o(() => [
                      t(ie, { name: "iconfont icondingdanzhongxinPC-3" })
                    ]),
                    _: 1
                  })
                ])
              ])
            ])), [
              [A, P.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
export {
  qe as default
};
