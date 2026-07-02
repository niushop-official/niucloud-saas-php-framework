import { defineComponent as ye, reactive as U, computed as H, ref as b, resolveComponent as m, resolveDirective as ge, openBlock as p, createElementBlock as v, createVNode as a, withCtx as n, createElementVNode as w, toDisplayString as s, unref as o, createTextVNode as c, Fragment as F, renderList as E, createBlock as P, withDirectives as he, createCommentVNode as N } from "vue";
import { t as l, bk as _e, bl as $, bm as be, bn as ve, bo as Pe, bp as we, bq as ke, br as Ve, bs as Ce } from "./core-shared-ae4a556b.js";
import { ElMessageBox as K } from "element-plus";
import { useRoute as xe, useRouter as De } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Te = { class: "main-container" }, Ue = { class: "flex justify-between items-center" }, $e = { class: "text-page-title" }, Se = { key: 0 }, Fe = {
  key: 0,
  class: "text-primary"
}, Ne = { key: 1 }, Re = { class: "mt-[16px] flex justify-end" }, Ae = { class: "dialog-footer" }, Be = { class: "dialog-footer" }, Je = /* @__PURE__ */ ye({
  __name: "list",
  setup(Ee) {
    const Q = xe(), R = De(), W = Q.meta.title, C = U({}), h = U({
      title: "",
      type: ""
    }), X = H(() => ({
      title: [
        { required: !0, message: l("titlePlaceholder"), trigger: "blur" }
      ],
      type: [
        { required: !0, message: l("pageTypePlaceholder"), trigger: "blur" }
      ]
    })), q = b(), x = b(!1), Z = async (r) => {
      r && await r.validate(async (e) => {
        if (e) {
          const d = { type: h.type, title: h.title }, k = R.resolve({
            path: "/decorate/edit",
            query: d
          });
          window.open(k.href), x.value = !1, h.title = "", h.type = "";
        }
      });
    }, z = (r = "") => {
      be({ mode: "", addon: r }).then((e) => {
        for (const d in C)
          delete C[d];
        for (const d in e.data)
          C[d] = e.data[d];
      });
    };
    z();
    const I = U({});
    _e({}).then((r) => {
      if (r.data)
        for (const e in r.data)
          I[e] = r.data[e];
    });
    const ee = (r) => {
      i.searchParam.type = "", z(r);
    }, i = U({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        title: "",
        type: "",
        mode: "",
        addon_name: ""
      }
    }), M = b(), _ = (r = 1) => {
      i.loading = !0, i.page = r, ve({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((e) => {
        i.loading = !1, i.data = e.data.data, i.total = e.data.total, Pe(i.page, i.limit, i.searchParam);
      }).catch(() => {
        i.loading = !1;
      });
    };
    _($(i.searchParam).page);
    const le = (r) => {
      const e = R.resolve({
        path: "/decorate/edit",
        query: { id: r.id }
      });
      window.open(e.href);
    }, te = (r) => {
      we({ id: r }).then(() => {
        _($(i.searchParam).page);
      });
    }, S = b(!1), ae = (r) => {
      K.confirm(
        l("diyPageCopyTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        S.value || (S.value = !0, ke({ id: r }).then((e) => {
          e.code == 1 && _($(i.searchParam).page), S.value = !1;
        }).catch((e) => {
          S.value = !1;
        }));
      });
    }, oe = (r) => {
      K.confirm(
        l("diyPageDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        Ve(r).then(() => {
          _($(i.searchParam).page);
        }).catch(() => {
        });
      });
    }, ne = (r) => {
      const e = R.resolve({
        path: "/preview/wap",
        query: {
          page: r.type_page + "?id=" + r.id
        }
      });
      window.open(e.href);
    }, f = b("wechat"), j = b(""), G = b(0), y = U({
      wechat: {
        title: "",
        desc: "",
        url: ""
      },
      weapp: {
        title: "",
        url: ""
      }
    }), D = b(!1), re = H(() => ({})), L = b(), ie = async (r) => {
      G.value = r.id, j.value = r.title;
      const e = r.share ? JSON.parse(r.share) : {
        wechat: { title: "", desc: "", url: "" },
        weapp: { title: "", url: "" }
      };
      e && (y.wechat = e.wechat, y.weapp = e.weapp), D.value = !0;
    }, de = async (r) => {
      r && await r.validate(async (e) => {
        e && Ce({
          id: G.value,
          share: JSON.stringify(y)
        }).then(() => {
          _($(i.searchParam).page), D.value = !1;
        }).catch(() => {
        });
      });
    }, se = (r) => {
      r && (r.resetFields(), _());
    };
    return (r, e) => {
      const d = m("el-button"), k = m("el-input"), g = m("el-form-item"), T = m("el-option"), A = m("el-select"), B = m("el-form"), Y = m("el-card"), V = m("el-table-column"), pe = m("el-table"), ue = m("el-pagination"), J = m("el-dialog"), O = m("el-tab-pane"), me = m("el-tabs"), ce = m("upload-image"), fe = ge("loading");
      return p(), v("div", Te, [
        a(Y, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            w("div", Ue, [
              w("span", $e, s(o(W)), 1),
              a(d, {
                type: "primary",
                class: "w-[100px]",
                onClick: e[0] || (e[0] = (t) => x.value = !0)
              }, {
                default: n(() => [
                  c(s(o(l)("addDiyPage")), 1)
                ]),
                _: 1
              })
            ]),
            a(Y, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                a(B, {
                  inline: !0,
                  model: i.searchParam,
                  ref_key: "searchFormDiyPageRef",
                  ref: M
                }, {
                  default: n(() => [
                    a(g, {
                      label: o(l)("title"),
                      prop: "title"
                    }, {
                      default: n(() => [
                        a(k, {
                          modelValue: i.searchParam.title,
                          "onUpdate:modelValue": e[1] || (e[1] = (t) => i.searchParam.title = t),
                          modelModifiers: { trim: !0 },
                          placeholder: o(l)("titlePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(g, {
                      label: o(l)("forAddon"),
                      prop: "addon_name"
                    }, {
                      default: n(() => [
                        a(A, {
                          modelValue: i.searchParam.addon_name,
                          "onUpdate:modelValue": e[2] || (e[2] = (t) => i.searchParam.addon_name = t),
                          placeholder: o(l)("forAddonPlaceholder"),
                          onChange: ee
                        }, {
                          default: n(() => [
                            a(T, {
                              label: o(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (p(!0), v(F, null, E(I, (t, u) => (p(), P(T, {
                              label: t.title,
                              value: u,
                              key: u
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(g, {
                      label: o(l)("typeName"),
                      prop: "type"
                    }, {
                      default: n(() => [
                        a(A, {
                          modelValue: i.searchParam.type,
                          "onUpdate:modelValue": e[3] || (e[3] = (t) => i.searchParam.type = t),
                          placeholder: o(l)("pageTypePlaceholder")
                        }, {
                          default: n(() => [
                            a(T, {
                              label: o(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (p(!0), v(F, null, E(C, (t, u) => (p(), P(T, {
                              label: t.title,
                              value: u,
                              key: u
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(g, null, {
                      default: n(() => [
                        a(d, {
                          type: "primary",
                          onClick: e[4] || (e[4] = (t) => _())
                        }, {
                          default: n(() => [
                            c(s(o(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        a(d, {
                          onClick: e[5] || (e[5] = (t) => se(M.value))
                        }, {
                          default: n(() => [
                            c(s(o(l)("reset")), 1)
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
            he((p(), P(pe, {
              data: i.data,
              size: "large"
            }, {
              empty: n(() => [
                w("span", null, s(i.loading ? "" : o(l)("emptyData")), 1)
              ]),
              default: n(() => [
                a(V, {
                  prop: "page_title",
                  label: o(l)("title"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                a(V, {
                  prop: "addon_name",
                  label: o(l)("forAddon"),
                  "min-width": "80"
                }, null, 8, ["label"]),
                a(V, {
                  prop: "type_name",
                  label: o(l)("typeName"),
                  "min-width": "80"
                }, null, 8, ["label"]),
                a(V, {
                  label: o(l)("status"),
                  "min-width": "80"
                }, {
                  default: n(({ row: t }) => [
                    t.type == "DIY_PAGE" ? (p(), v("span", Se, "-")) : (p(), v(F, { key: 1 }, [
                      t.is_default == 1 ? (p(), v("span", Fe, s(o(l)("isUse")), 1)) : (p(), v("span", Ne, s(o(l)("unused")), 1))
                    ], 64))
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(V, {
                  prop: "update_time",
                  label: o(l)("updateTime"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                a(V, {
                  label: o(l)("operation"),
                  fixed: "right",
                  align: "right",
                  "min-width": "160"
                }, {
                  default: n(({ row: t }) => [
                    a(d, {
                      type: "primary",
                      link: "",
                      onClick: (u) => ne(t)
                    }, {
                      default: n(() => [
                        c(s(o(l)("preview")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    t.is_default == 0 ? (p(), P(d, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (u) => te(t.id)
                    }, {
                      default: n(() => [
                        c(s(o(l)("use")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : N("", !0),
                    t.type == "DIY_PAGE" ? (p(), P(d, {
                      key: 1,
                      type: "primary",
                      link: "",
                      onClick: (u) => ie(t)
                    }, {
                      default: n(() => [
                        c(s(o(l)("shareSet")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : N("", !0),
                    a(d, {
                      type: "primary",
                      link: "",
                      onClick: (u) => le(t)
                    }, {
                      default: n(() => [
                        c(s(o(l)("edit")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    t.is_default == 0 || t.type == "DIY_PAGE" ? (p(), P(d, {
                      key: 2,
                      type: "primary",
                      link: "",
                      onClick: (u) => oe(t.id)
                    }, {
                      default: n(() => [
                        c(s(o(l)("delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : N("", !0),
                    a(d, {
                      type: "primary",
                      link: "",
                      onClick: (u) => ae(t.id)
                    }, {
                      default: n(() => [
                        c(s(o(l)("copy")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [fe, i.loading]
            ]),
            w("div", Re, [
              a(ue, {
                "current-page": i.page,
                "onUpdate:currentPage": e[6] || (e[6] = (t) => i.page = t),
                "page-size": i.limit,
                "onUpdate:pageSize": e[7] || (e[7] = (t) => i.limit = t),
                layout: "total, sizes, prev, pager, next, jumper",
                total: i.total,
                onSizeChange: e[8] || (e[8] = (t) => _()),
                onCurrentChange: _
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        a(J, {
          modelValue: x.value,
          "onUpdate:modelValue": e[13] || (e[13] = (t) => x.value = t),
          title: o(l)("addPageTips"),
          width: "350px"
        }, {
          footer: n(() => [
            w("span", Ae, [
              a(d, {
                onClick: e[11] || (e[11] = (t) => x.value = !1)
              }, {
                default: n(() => [
                  c(s(o(l)("cancel")), 1)
                ]),
                _: 1
              }),
              a(d, {
                type: "primary",
                onClick: e[12] || (e[12] = (t) => Z(q.value))
              }, {
                default: n(() => [
                  c(s(o(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            a(B, {
              model: h,
              "label-width": "90px",
              ref_key: "formRef",
              ref: q,
              rules: X.value
            }, {
              default: n(() => [
                a(g, {
                  label: o(l)("title"),
                  prop: "title"
                }, {
                  default: n(() => [
                    a(k, {
                      modelValue: h.title,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => h.title = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("titlePlaceholder"),
                      clearable: "",
                      maxlength: "12",
                      "show-word-limit": "",
                      class: "w-full"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(g, {
                  label: o(l)("typeName"),
                  prop: "type"
                }, {
                  default: n(() => [
                    a(A, {
                      modelValue: h.type,
                      "onUpdate:modelValue": e[10] || (e[10] = (t) => h.type = t),
                      placeholder: o(l)("pageTypePlaceholder"),
                      class: "!w-full"
                    }, {
                      default: n(() => [
                        (p(!0), v(F, null, E(C, (t, u) => (p(), P(T, {
                          label: t.title,
                          value: u,
                          key: u
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(J, {
          modelValue: D.value,
          "onUpdate:modelValue": e[20] || (e[20] = (t) => D.value = t),
          title: o(l)("shareSet"),
          width: "30%"
        }, {
          footer: n(() => [
            w("span", Be, [
              a(d, {
                onClick: e[18] || (e[18] = (t) => D.value = !1)
              }, {
                default: n(() => [
                  c(s(o(l)("cancel")), 1)
                ]),
                _: 1
              }),
              a(d, {
                type: "primary",
                onClick: e[19] || (e[19] = (t) => de(L.value))
              }, {
                default: n(() => [
                  c(s(o(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            a(me, {
              modelValue: f.value,
              "onUpdate:modelValue": e[14] || (e[14] = (t) => f.value = t)
            }, {
              default: n(() => [
                a(O, {
                  label: o(l)("wechat"),
                  name: "wechat"
                }, null, 8, ["label"]),
                a(O, {
                  label: o(l)("weapp"),
                  name: "weapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            a(B, {
              model: y[f.value],
              "label-width": "90px",
              ref_key: "shareFormRef",
              ref: L,
              rules: re.value
            }, {
              default: n(() => [
                a(g, {
                  label: o(l)("sharePage")
                }, {
                  default: n(() => [
                    w("span", null, s(j.value), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(g, {
                  label: o(l)("shareTitle"),
                  prop: "title"
                }, {
                  default: n(() => [
                    a(k, {
                      modelValue: y[f.value].title,
                      "onUpdate:modelValue": e[15] || (e[15] = (t) => y[f.value].title = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("shareTitlePlaceholder"),
                      clearable: "",
                      maxlength: "30",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                f.value == "wechat" ? (p(), P(g, {
                  key: 0,
                  label: o(l)("shareDesc"),
                  prop: "desc"
                }, {
                  default: n(() => [
                    a(k, {
                      modelValue: y[f.value].desc,
                      "onUpdate:modelValue": e[16] || (e[16] = (t) => y[f.value].desc = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("shareDescPlaceholder"),
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : N("", !0),
                a(g, {
                  label: o(l)("shareImageUrl"),
                  prop: "url"
                }, {
                  default: n(() => [
                    a(ce, {
                      modelValue: y[f.value].url,
                      "onUpdate:modelValue": e[17] || (e[17] = (t) => y[f.value].url = t),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  Je as default
};
