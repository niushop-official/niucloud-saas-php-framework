import { defineComponent as _e, reactive as U, computed as H, ref as b, resolveComponent as m, resolveDirective as he, openBlock as p, createElementBlock as v, normalizeStyle as be, unref as t, createVNode as o, withCtx as n, createElementVNode as P, toDisplayString as s, createTextVNode as c, Fragment as R, renderList as B, createBlock as w, withDirectives as ve, createCommentVNode as F } from "vue";
import { t as l, bs as Pe, bt as S, bu as we, bv as ke, bw as Ve, bx as Ce, by as xe, bz as De, bA as Te } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as K } from "element-plus";
import { useRoute as Ue, useRouter as Se } from "vue-router";
import { u as $e } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Re = { class: "flex justify-between items-center" }, Fe = { class: "text-page-title" }, Ne = { class: "table-fill-page__table" }, Ae = { key: 0 }, ze = {
  key: 0,
  class: "text-primary"
}, Be = { key: 1 }, Ee = { class: "mt-[16px] flex justify-end" }, qe = { class: "dialog-footer" }, Ie = { class: "dialog-footer" }, We = /* @__PURE__ */ _e({
  __name: "list",
  setup(Me) {
    const Q = Ue(), N = Se(), W = Q.meta.title, { pageRef: X, pageStyle: Z } = $e(), C = U({}), _ = U({
      title: "",
      type: ""
    }), ee = H(() => ({
      title: [
        { required: !0, message: l("titlePlaceholder"), trigger: "blur" }
      ],
      type: [
        { required: !0, message: l("pageTypePlaceholder"), trigger: "blur" }
      ]
    })), E = b(), x = b(!1), le = async (r) => {
      r && await r.validate(async (e) => {
        if (e) {
          const d = { type: _.type, title: _.title }, k = N.resolve({
            path: "/decorate/edit",
            query: d
          });
          window.open(k.href), x.value = !1, _.title = "", _.type = "";
        }
      });
    }, q = (r = "") => {
      we({ mode: "", addon: r }).then((e) => {
        for (const d in C)
          delete C[d];
        for (const d in e.data)
          C[d] = e.data[d];
      });
    };
    q();
    const I = U({});
    Pe({}).then((r) => {
      if (r.data)
        for (const e in r.data)
          I[e] = r.data[e];
    });
    const ae = (r) => {
      i.searchParam.type = "", q(r);
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
    }), M = b(), h = (r = 1) => {
      i.loading = !0, i.page = r, ke({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((e) => {
        i.loading = !1, i.data = e.data.data, i.total = e.data.total, Ve(i.page, i.limit, i.searchParam);
      }).catch(() => {
        i.loading = !1;
      });
    };
    h(S(i.searchParam).page);
    const te = (r) => {
      const e = N.resolve({
        path: "/decorate/edit",
        query: { id: r.id }
      });
      window.open(e.href);
    }, oe = (r) => {
      Ce({ id: r }).then(() => {
        h(S(i.searchParam).page);
      });
    }, $ = b(!1), ne = (r) => {
      K.confirm(
        l("diyPageCopyTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        $.value || ($.value = !0, xe({ id: r }).then((e) => {
          e.code == 1 && h(S(i.searchParam).page), $.value = !1;
        }).catch((e) => {
          $.value = !1;
        }));
      });
    }, re = (r) => {
      K.confirm(
        l("diyPageDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        De(r).then(() => {
          h(S(i.searchParam).page);
        }).catch(() => {
        });
      });
    }, ie = (r) => {
      const e = N.resolve({
        path: "/preview/wap",
        query: {
          page: r.type_page + "?id=" + r.id
        }
      });
      window.open(e.href);
    }, f = b("wechat"), j = b(""), G = b(0), g = U({
      wechat: {
        title: "",
        desc: "",
        url: ""
      },
      weapp: {
        title: "",
        url: ""
      }
    }), D = b(!1), de = H(() => ({})), L = b(), se = async (r) => {
      G.value = r.id, j.value = r.title;
      const e = r.share ? JSON.parse(r.share) : {
        wechat: { title: "", desc: "", url: "" },
        weapp: { title: "", url: "" }
      };
      e && (g.wechat = e.wechat, g.weapp = e.weapp), D.value = !0;
    }, pe = async (r) => {
      r && await r.validate(async (e) => {
        e && Te({
          id: G.value,
          share: JSON.stringify(g)
        }).then(() => {
          h(S(i.searchParam).page), D.value = !1;
        }).catch(() => {
        });
      });
    }, ue = (r) => {
      r && (r.resetFields(), h());
    };
    return (r, e) => {
      const d = m("el-button"), k = m("el-input"), y = m("el-form-item"), T = m("el-option"), A = m("el-select"), z = m("el-form"), Y = m("el-card"), V = m("el-table-column"), me = m("el-table"), ce = m("el-pagination"), J = m("el-dialog"), O = m("el-tab-pane"), fe = m("el-tabs"), ge = m("upload-image"), ye = he("loading");
      return p(), v("div", {
        ref_key: "pageRef",
        ref: X,
        class: "main-container table-fill-page",
        style: be(t(Z))
      }, [
        o(Y, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: n(() => [
            P("div", Re, [
              P("span", Fe, s(t(W)), 1),
              o(d, {
                type: "primary",
                class: "w-[100px]",
                onClick: e[0] || (e[0] = (a) => x.value = !0)
              }, {
                default: n(() => [
                  c(s(t(l)("addDiyPage")), 1)
                ]),
                _: 1
              })
            ]),
            o(Y, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: n(() => [
                o(z, {
                  inline: !0,
                  model: i.searchParam,
                  ref_key: "searchFormDiyPageRef",
                  ref: M
                }, {
                  default: n(() => [
                    o(y, {
                      label: t(l)("title"),
                      prop: "title"
                    }, {
                      default: n(() => [
                        o(k, {
                          modelValue: i.searchParam.title,
                          "onUpdate:modelValue": e[1] || (e[1] = (a) => i.searchParam.title = a),
                          modelModifiers: { trim: !0 },
                          placeholder: t(l)("titlePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(y, {
                      label: t(l)("forAddon"),
                      prop: "addon_name"
                    }, {
                      default: n(() => [
                        o(A, {
                          modelValue: i.searchParam.addon_name,
                          "onUpdate:modelValue": e[2] || (e[2] = (a) => i.searchParam.addon_name = a),
                          placeholder: t(l)("forAddonPlaceholder"),
                          onChange: ae
                        }, {
                          default: n(() => [
                            o(T, {
                              label: t(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (p(!0), v(R, null, B(I, (a, u) => (p(), w(T, {
                              label: a.title,
                              value: u,
                              key: u
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(y, {
                      label: t(l)("typeName"),
                      prop: "type"
                    }, {
                      default: n(() => [
                        o(A, {
                          modelValue: i.searchParam.type,
                          "onUpdate:modelValue": e[3] || (e[3] = (a) => i.searchParam.type = a),
                          placeholder: t(l)("pageTypePlaceholder")
                        }, {
                          default: n(() => [
                            o(T, {
                              label: t(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (p(!0), v(R, null, B(C, (a, u) => (p(), w(T, {
                              label: a.title,
                              value: u,
                              key: u
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(y, null, {
                      default: n(() => [
                        o(d, {
                          type: "primary",
                          onClick: e[4] || (e[4] = (a) => h())
                        }, {
                          default: n(() => [
                            c(s(t(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        o(d, {
                          onClick: e[5] || (e[5] = (a) => ue(M.value))
                        }, {
                          default: n(() => [
                            c(s(t(l)("reset")), 1)
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
            P("div", Ne, [
              ve((p(), w(me, {
                height: "100%",
                data: i.data,
                size: "large"
              }, {
                empty: n(() => [
                  P("span", null, s(i.loading ? "" : t(l)("emptyData")), 1)
                ]),
                default: n(() => [
                  o(V, {
                    prop: "page_title",
                    label: t(l)("title"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(V, {
                    prop: "addon_name",
                    label: t(l)("forAddon"),
                    "min-width": "80"
                  }, null, 8, ["label"]),
                  o(V, {
                    prop: "type_name",
                    label: t(l)("typeName"),
                    "min-width": "80"
                  }, null, 8, ["label"]),
                  o(V, {
                    label: t(l)("status"),
                    "min-width": "80"
                  }, {
                    default: n(({ row: a }) => [
                      a.type == "DIY_PAGE" ? (p(), v("span", Ae, "-")) : (p(), v(R, { key: 1 }, [
                        a.is_default == 1 ? (p(), v("span", ze, s(t(l)("isUse")), 1)) : (p(), v("span", Be, s(t(l)("unused")), 1))
                      ], 64))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(V, {
                    prop: "update_time",
                    label: t(l)("updateTime"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(V, {
                    label: t(l)("operation"),
                    fixed: "right",
                    align: "right",
                    "min-width": "340"
                  }, {
                    default: n(({ row: a }) => [
                      o(d, {
                        type: "primary",
                        link: "",
                        onClick: (u) => ie(a)
                      }, {
                        default: n(() => [
                          c(s(t(l)("preview")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a.is_default == 0 ? (p(), w(d, {
                        key: 0,
                        type: "primary",
                        link: "",
                        onClick: (u) => oe(a.id)
                      }, {
                        default: n(() => [
                          c(s(t(l)("use")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : F("", !0),
                      a.type == "DIY_PAGE" ? (p(), w(d, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (u) => se(a)
                      }, {
                        default: n(() => [
                          c(s(t(l)("shareSet")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : F("", !0),
                      o(d, {
                        type: "primary",
                        link: "",
                        onClick: (u) => te(a)
                      }, {
                        default: n(() => [
                          c(s(t(l)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a.is_default == 0 || a.type == "DIY_PAGE" ? (p(), w(d, {
                        key: 2,
                        type: "primary",
                        link: "",
                        onClick: (u) => re(a.id)
                      }, {
                        default: n(() => [
                          c(s(t(l)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : F("", !0),
                      o(d, {
                        type: "primary",
                        link: "",
                        onClick: (u) => ne(a.id)
                      }, {
                        default: n(() => [
                          c(s(t(l)("copy")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [ye, i.loading]
              ])
            ]),
            P("div", Ee, [
              o(ce, {
                "current-page": i.page,
                "onUpdate:current-page": e[6] || (e[6] = (a) => i.page = a),
                "page-size": i.limit,
                "onUpdate:page-size": e[7] || (e[7] = (a) => i.limit = a),
                layout: "total, sizes, prev, pager, next, jumper",
                total: i.total,
                onSizeChange: e[8] || (e[8] = (a) => h()),
                onCurrentChange: h
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        o(J, {
          modelValue: x.value,
          "onUpdate:modelValue": e[13] || (e[13] = (a) => x.value = a),
          title: t(l)("addPageTips"),
          width: "350px"
        }, {
          footer: n(() => [
            P("span", qe, [
              o(d, {
                onClick: e[11] || (e[11] = (a) => x.value = !1)
              }, {
                default: n(() => [
                  c(s(t(l)("cancel")), 1)
                ]),
                _: 1
              }),
              o(d, {
                type: "primary",
                onClick: e[12] || (e[12] = (a) => le(E.value))
              }, {
                default: n(() => [
                  c(s(t(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            o(z, {
              model: _,
              "label-width": "90px",
              ref_key: "formRef",
              ref: E,
              rules: t(ee)
            }, {
              default: n(() => [
                o(y, {
                  label: t(l)("title"),
                  prop: "title"
                }, {
                  default: n(() => [
                    o(k, {
                      modelValue: _.title,
                      "onUpdate:modelValue": e[9] || (e[9] = (a) => _.title = a),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("titlePlaceholder"),
                      clearable: "",
                      maxlength: "12",
                      "show-word-limit": "",
                      class: "w-full"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(y, {
                  label: t(l)("typeName"),
                  prop: "type"
                }, {
                  default: n(() => [
                    o(A, {
                      modelValue: _.type,
                      "onUpdate:modelValue": e[10] || (e[10] = (a) => _.type = a),
                      placeholder: t(l)("pageTypePlaceholder"),
                      class: "!w-full"
                    }, {
                      default: n(() => [
                        (p(!0), v(R, null, B(C, (a, u) => (p(), w(T, {
                          label: a.title,
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
        o(J, {
          modelValue: D.value,
          "onUpdate:modelValue": e[20] || (e[20] = (a) => D.value = a),
          title: t(l)("shareSet"),
          width: "30%"
        }, {
          footer: n(() => [
            P("span", Ie, [
              o(d, {
                onClick: e[18] || (e[18] = (a) => D.value = !1)
              }, {
                default: n(() => [
                  c(s(t(l)("cancel")), 1)
                ]),
                _: 1
              }),
              o(d, {
                type: "primary",
                onClick: e[19] || (e[19] = (a) => pe(L.value))
              }, {
                default: n(() => [
                  c(s(t(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            o(fe, {
              modelValue: f.value,
              "onUpdate:modelValue": e[14] || (e[14] = (a) => f.value = a)
            }, {
              default: n(() => [
                o(O, {
                  label: t(l)("wechat"),
                  name: "wechat"
                }, null, 8, ["label"]),
                o(O, {
                  label: t(l)("weapp"),
                  name: "weapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            o(z, {
              model: g[f.value],
              "label-width": "90px",
              ref_key: "shareFormRef",
              ref: L,
              rules: t(de)
            }, {
              default: n(() => [
                o(y, {
                  label: t(l)("sharePage")
                }, {
                  default: n(() => [
                    P("span", null, s(j.value), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(y, {
                  label: t(l)("shareTitle"),
                  prop: "title"
                }, {
                  default: n(() => [
                    o(k, {
                      modelValue: g[f.value].title,
                      "onUpdate:modelValue": e[15] || (e[15] = (a) => g[f.value].title = a),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("shareTitlePlaceholder"),
                      clearable: "",
                      maxlength: "30",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                f.value == "wechat" ? (p(), w(y, {
                  key: 0,
                  label: t(l)("shareDesc"),
                  prop: "desc"
                }, {
                  default: n(() => [
                    o(k, {
                      modelValue: g[f.value].desc,
                      "onUpdate:modelValue": e[16] || (e[16] = (a) => g[f.value].desc = a),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("shareDescPlaceholder"),
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : F("", !0),
                o(y, {
                  label: t(l)("shareImageUrl"),
                  prop: "url"
                }, {
                  default: n(() => [
                    o(ge, {
                      modelValue: g[f.value].url,
                      "onUpdate:modelValue": e[17] || (e[17] = (a) => g[f.value].url = a),
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
      ], 4);
    };
  }
});
export {
  We as default
};
