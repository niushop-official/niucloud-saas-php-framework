import { defineComponent as pe, reactive as me, ref as h, watch as ue, resolveComponent as r, resolveDirective as _e, openBlock as p, createElementBlock as N, normalizeStyle as fe, unref as s, createElementVNode as u, createVNode as o, withCtx as i, Fragment as ge, renderList as he, createBlock as b, createTextVNode as V, toDisplayString as w, withDirectives as U, createCommentVNode as be } from "vue";
import { a1 as ve, t as a, gU as ye, bw as ke, gV as we, gS as xe, gT as Ce, j as Te, gW as Pe } from "./core-shared-c6ad4e77.js";
import { ElMessage as D, ElMessageBox as O } from "element-plus";
import Ve from "./index-c14157f3.js";
import Fe from "./index-559a9b12.js";
import Se from "./index-997caa57.js";
import { useRouter as Ne, useRoute as De } from "vue-router";
import { u as ze } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Be = { class: "table-fill-page__card" }, Ae = { class: "table-panel table-fill-page__panel" }, Re = { class: "table-fill-page__table" }, je = { class: "flex h-[50vh]" }, Ee = { class: "w-[600px]" }, Le = { class: "flex items-center" }, Ue = { class: "pl-[5px]" }, Oe = {
  class: "ml-[20px] relative",
  style: { width: "calc(100% - 285px)" }
}, tt = /* @__PURE__ */ pe({
  __name: "list",
  setup(Ge) {
    const G = Ne(), M = De().meta.title, { pageRef: $, pageStyle: H } = ze(), K = (t) => [
      { label: a("edit"), onClick: () => I(t) },
      { label: a("preview"), onClick: () => Q(t.id) },
      { label: a("saveAndSync"), onClick: () => J(t.id) },
      { label: a("download"), onClick: () => B(t.id, 2) },
      { label: a("delete"), type: "danger", onClick: () => q(t.id) }
    ], l = me({
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
    }), z = h(), W = (t) => {
      t && (t.resetFields(), _());
    }, _ = (t = 1) => {
      l.loading = !0, l.page = t, ye({
        page: l.page,
        limit: l.limit,
        ...l.searchParam
      }).then((e) => {
        l.loading = !1, l.data = e.data.data, l.total = e.data.total, ke(l.page, l.limit, l.searchParam);
      }).catch(() => {
        l.loading = !1;
      });
    };
    _();
    const q = (t) => {
      O.confirm(
        a("codeDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        we(t).then(() => {
          _();
        }).catch(() => {
        });
      });
    }, I = (t) => {
      G.push("/tools/code/edit?id=" + t.id);
    }, J = (t) => {
      xe({ id: t }).then((e) => {
        l.loading = !1, O.confirm(
          e.msg != "2" ? a("saveAndSyncText") : a("saveAndSyncText1"),
          a("warning"),
          {
            confirmButtonText: a("confirm"),
            cancelButtonText: a("cancel")
          }
        ).then(() => {
          B(t, 3);
        }).catch(() => {
        });
      }).catch(() => {
        l.loading = !1;
      });
    }, B = (t, e) => {
      l.loading = !0, Ce({ id: t, generate_type: e }).then((c) => {
        D({
          type: "success",
          message: "操作成功"
        }), e != 3 ? (l.loading = !1, window.open(Te(c.data.file), "_blank")) : _();
      }).catch(() => {
        l.loading = !1;
      });
    }, F = h([]), S = h(!1), C = h([]), T = h(!1), x = h(""), P = h(""), Q = (t) => {
      S.value = !0, T.value = !0, x.value = "", C.value = [], P.value = "", Pe(t).then((e) => {
        F.value = e.data, C.value = Y(e.data.map((c) => c.file_dir + c.name)), x.value = F.value[0].content, T.value = !1;
      }).catch(() => {
        T.value = !1;
      });
    }, X = (t) => {
      F.value.forEach((e) => {
        t.path === e.file_dir + e.name && (x.value = e.content);
      });
    }, Y = (t) => {
      const e = [];
      if (Array.isArray(t))
        for (let f = 0; f < t.length; ++f) {
          const v = t[f].split("/");
          let y = e;
          for (let g = 0; g < v.length; ++g) {
            const k = v[g];
            let d = null;
            for (var c = 0; c < y.length; ++c) {
              const m = y[c];
              if (m.name === k) {
                d = m;
                break;
              }
            }
            d || (d = { name: k, path: k.indexOf(".") < 0 ? "" : t[f], key: "k" + f + g + c }, k.indexOf(".") < 0 && (d.children = []), d.path === t[0] && (P.value = d.key), y.push(d)), d.children && (y = d.children);
          }
        }
      return e;
    }, { copy: Z, isSupported: ee, copied: A } = ve(), te = () => {
      if (!ee.value) {
        D({
          message: a("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      Z(x.value);
    };
    return ue(A, () => {
      A.value && D({
        message: a("copySuccess"),
        type: "success"
      });
    }), (t, e) => {
      const c = r("el-option"), f = r("el-select"), v = r("el-form-item"), y = r("el-input"), g = r("el-button"), k = r("el-form"), d = r("el-card"), m = r("el-table-column"), le = r("el-table"), ae = r("Folder"), oe = r("FolderOpened"), R = r("el-icon"), ne = r("Document"), ie = r("el-tree"), j = r("el-scrollbar"), re = r("highlightjs"), se = r("icon"), ce = r("el-tooltip"), de = r("el-dialog"), E = _e("loading");
      return p(), N("div", {
        ref_key: "pageRef",
        ref: $,
        class: "main-container table-fill-page",
        style: fe(s(H))
      }, [
        u("div", Be, [
          o(d, {
            class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
            shadow: "never"
          }, {
            default: i(() => [
              o(k, {
                inline: !0,
                model: l.searchParam,
                ref_key: "searchFormRef",
                ref: z
              }, {
                default: i(() => [
                  o(v, {
                    label: s(a)("addonName"),
                    prop: "addon_name"
                  }, {
                    default: i(() => [
                      o(f, {
                        modelValue: l.searchParam.addon_name,
                        "onUpdate:modelValue": e[0] || (e[0] = (n) => l.searchParam.addon_name = n),
                        placeholder: "全部",
                        filterable: "",
                        remote: "",
                        clearable: "",
                        "remote-method": _
                      }, {
                        default: i(() => [
                          o(c, {
                            label: "全部",
                            value: ""
                          }),
                          o(c, {
                            label: "系统",
                            value: "2"
                          }),
                          (p(!0), N(ge, null, he(t.addonList, (n) => (p(), b(c, {
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
                  o(v, {
                    label: s(a)("tableName"),
                    prop: "table_name"
                  }, {
                    default: i(() => [
                      o(y, {
                        modelValue: l.searchParam.table_name,
                        "onUpdate:modelValue": e[1] || (e[1] = (n) => l.searchParam.table_name = n),
                        modelModifiers: { trim: !0 },
                        placeholder: s(a)("tableNamePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(v, null, {
                    default: i(() => [
                      o(g, {
                        type: "primary",
                        onClick: e[2] || (e[2] = (n) => _())
                      }, {
                        default: i(() => [
                          V(w(s(a)("search")), 1)
                        ]),
                        _: 1
                      }),
                      o(g, {
                        onClick: e[3] || (e[3] = (n) => W(z.value))
                      }, {
                        default: i(() => [
                          V(w(s(a)("reset")), 1)
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
          u("div", Ae, [
            o(Se, {
              title: s(M),
              selectable: !1
            }, null, 8, ["title"]),
            u("div", Re, [
              U((p(), b(le, {
                height: "100%",
                data: l.data,
                size: "large"
              }, {
                empty: i(() => [
                  u("span", null, w(l.loading ? "" : s(a)("emptyData")), 1)
                ]),
                default: i(() => [
                  o(m, {
                    prop: "table_name",
                    "show-overflow-tooltip": !0,
                    label: s(a)("tableName"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(m, {
                    prop: "title",
                    "show-overflow-tooltip": !0,
                    label: s(a)("addonName"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(m, {
                    prop: "table_content",
                    "show-overflow-tooltip": !0,
                    label: s(a)("tableContent"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(m, {
                    prop: "edit_type",
                    label: s(a)("editType"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: i(({ row: n }) => [
                      V(w(n.edit_type == 1 ? s(a)("popup") : s(a)("page")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(m, {
                    label: s(a)("createTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: i(({ row: n }) => [
                      V(w(n.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(m, {
                    label: s(a)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "200"
                  }, {
                    default: i(({ row: n }) => [
                      o(Ve, {
                        actions: K(n)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [E, l.loading]
              ])
            ]),
            o(Fe, {
              "current-page": l.page,
              "onUpdate:current-page": e[4] || (e[4] = (n) => l.page = n),
              "page-size": l.limit,
              "onUpdate:page-size": e[5] || (e[5] = (n) => l.limit = n),
              total: l.total,
              onSizeChange: e[6] || (e[6] = (n) => _()),
              onCurrentChange: _
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ]),
        o(de, {
          modelValue: S.value,
          "onUpdate:modelValue": e[7] || (e[7] = (n) => S.value = n),
          class: "dialog-visible",
          width: "70%",
          title: "代码预览"
        }, {
          default: i(() => [
            U((p(), N("div", je, [
              o(j, { class: "h-[100%] w-[270px]" }, {
                default: i(() => [
                  u("div", Ee, [
                    C.value.length && P.value != "" ? (p(), b(ie, {
                      key: 0,
                      data: C.value,
                      props: { label: "name", value: "key" },
                      "node-key": "key",
                      "current-node-key": P.value,
                      "expand-on-click-node": !1,
                      "highlight-current": "",
                      "default-expand-all": "",
                      ref: "treeRef",
                      onNodeClick: X
                    }, {
                      default: i(({ node: n, data: L }) => [
                        u("div", Le, [
                          L.children ? (p(), b(R, { key: 0 }, {
                            default: i(() => [
                              n.expanded ? (p(), b(oe, { key: 1 })) : (p(), b(ae, { key: 0 }))
                            ]),
                            _: 2
                          }, 1024)) : (p(), b(R, { key: 1 }, {
                            default: i(() => [
                              o(ne)
                            ]),
                            _: 1
                          })),
                          u("span", Ue, w(L.name), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["data", "current-node-key"])) : be("", !0)
                  ])
                ]),
                _: 1
              }),
              u("div", Oe, [
                o(j, { class: "h-[100%] w-[100%]" }, {
                  default: i(() => [
                    o(re, {
                      autodetect: "",
                      class: "h-[100%]",
                      code: x.value
                    }, null, 8, ["code"])
                  ]),
                  _: 1
                }),
                u("div", {
                  class: "absolute top-0 right-[15px] z-5 cursor-pointer hover:text-primary",
                  onClick: te
                }, [
                  o(ce, {
                    content: "点击复制",
                    placement: "top"
                  }, {
                    default: i(() => [
                      o(se, { name: "iconfont icondingdanzhongxinPC-3" })
                    ]),
                    _: 1
                  })
                ])
              ])
            ])), [
              [E, T.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 4);
    };
  }
});
export {
  tt as default
};
