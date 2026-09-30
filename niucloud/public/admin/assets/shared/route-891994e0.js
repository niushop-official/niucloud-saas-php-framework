import { defineComponent as re, reactive as R, ref as _, watch as de, computed as pe, resolveComponent as r, resolveDirective as ue, openBlock as y, createElementBlock as j, normalizeStyle as me, unref as o, createVNode as l, withCtx as s, createElementVNode as h, toDisplayString as p, Fragment as ce, renderList as fe, createBlock as C, createTextVNode as b, withDirectives as _e, createCommentVNode as I } from "vue";
import { bB as he, bu as ge, a1 as be, t as n, aw as ve, bC as ye, bD as Ve, bE as De } from "./core-shared-c6ad4e77.js";
import { ElMessage as O } from "element-plus";
import { useRoute as ke, useRouter as we } from "vue-router";
import { c as J } from "./lodash-8c6c2daa.js";
import { u as Re } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const xe = { class: "flex justify-between items-center" }, Ce = { class: "text-page-title" }, Pe = { class: "table-fill-page__table" }, Se = { class: "mr-[10px]" }, Ue = { class: "mr-[10px]" }, Fe = { class: "mt-[16px] flex justify-end" }, Te = { class: "dialog-footer" }, Ke = /* @__PURE__ */ re({
  __name: "route",
  setup(ze) {
    const G = ke(), Ne = we(), H = G.meta.title, { pageRef: q, pageStyle: K } = Re(), Q = R({}), $e = _(), Le = _(!1), i = R({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        title: "",
        addon_name: ""
      }
    }), U = _([]), P = _("");
    (async () => {
      P.value = (await ve()).data.wap_url;
    })();
    const F = R({});
    he().then((a) => {
      if (a.data)
        for (const e in a.data)
          F[e] = a.data[e];
    });
    const x = () => {
      ye({}).then((a) => {
        i.loading = !1, U.value = J(a.data), S(i.page);
      }).catch(() => {
        i.loading = !1;
      });
    };
    x();
    const S = (a = 1) => {
      i.page = a;
      const e = J(U.value), d = [];
      for (let u = 0; u < e.length; u++) {
        let m = !0;
        i.searchParam.title && e[u].title.indexOf(i.searchParam.title) == -1 && (m = !1), i.searchParam.addon_name && e[u].addon_info && e[u].addon_info.key != i.searchParam.addon_name && (m = !1), m && d.push(e[u]);
      }
      i.total = d.length;
      const g = Math.ceil(d.length / i.limit), D = [];
      for (let u = 0; u < g; u++)
        D[u] = d.splice(0, i.limit);
      i.data = D[i.page - 1];
    };
    ge({}).then((a) => {
      for (const e in a.data)
        Q[e] = a.data[e];
    });
    const T = _(), { copy: W, isSupported: X, copied: z } = be(), N = (a) => {
      X.value || O({
        message: n("notSupportCopy"),
        type: "warning"
      }), W(a);
    };
    de(z, () => {
      z.value && O({
        message: n("copySuccess"),
        type: "success"
      });
    });
    const c = _("wechat"), $ = _(""), L = _(0), v = R({
      title: "",
      name: "",
      page: "",
      is_share: 0,
      sort: 0
    }), f = R({
      wechat: {
        title: "",
        desc: "",
        url: ""
      },
      weapp: {
        title: "",
        url: ""
      }
    }), V = _(!1), Y = pe(() => ({})), A = _(), Z = async (a) => {
      const e = (await Ve({
        name: a.name
      })).data;
      e.title && (a.id = e.id, a.title = e.title, a.name = e.name, a.page = e.page, a.is_share = e.is_share, a.sort = e.sort, a.share = e.share), v.title = a.title, v.name = a.name, v.page = a.page, v.is_share = a.is_share, v.sort = a.sort, L.value = a.id, $.value = a.title;
      const d = a.share ? JSON.parse(a.share) : {
        wechat: { title: "", desc: "", url: "" },
        weapp: { title: "", url: "" }
      };
      d && (f.wechat = d.wechat, f.weapp = d.weapp), V.value = !0;
    }, ee = async (a) => {
      a && await a.validate(async (e) => {
        e && De({
          id: L.value,
          share: JSON.stringify(f),
          ...v
        }).then(() => {
          x(), V.value = !1;
        }).catch(() => {
        });
      });
    }, ae = (a) => {
      a && (a.resetFields(), x());
    };
    return (a, e) => {
      const d = r("el-input"), g = r("el-form-item"), D = r("el-option"), u = r("el-select"), m = r("el-button"), M = r("el-form"), B = r("el-card"), k = r("el-table-column"), te = r("el-table"), le = r("el-pagination"), E = r("el-tab-pane"), oe = r("el-tabs"), ne = r("upload-image"), se = r("el-dialog"), ie = ue("loading");
      return y(), j("div", {
        ref_key: "pageRef",
        ref: q,
        class: "main-container table-fill-page",
        style: me(o(K))
      }, [
        l(B, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: s(() => [
            h("div", xe, [
              h("span", Ce, p(o(H)), 1)
            ]),
            l(B, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: s(() => [
                l(M, {
                  inline: !0,
                  model: i.searchParam,
                  ref_key: "searchFormDiyRouteRef",
                  ref: T
                }, {
                  default: s(() => [
                    l(g, {
                      label: o(n)("title"),
                      prop: "title"
                    }, {
                      default: s(() => [
                        l(d, {
                          modelValue: i.searchParam.title,
                          "onUpdate:modelValue": e[0] || (e[0] = (t) => i.searchParam.title = t),
                          modelModifiers: { trim: !0 },
                          placeholder: o(n)("titlePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(g, {
                      label: o(n)("forAddon"),
                      prop: "addon_name"
                    }, {
                      default: s(() => [
                        l(u, {
                          modelValue: i.searchParam.addon_name,
                          "onUpdate:modelValue": e[1] || (e[1] = (t) => i.searchParam.addon_name = t),
                          placeholder: o(n)("forAddonPlaceholder")
                        }, {
                          default: s(() => [
                            l(D, {
                              label: o(n)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (y(!0), j(ce, null, fe(F, (t, w) => (y(), C(D, {
                              label: t.title,
                              value: w,
                              key: w
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(g, null, {
                      default: s(() => [
                        l(m, {
                          type: "primary",
                          onClick: e[2] || (e[2] = (t) => S())
                        }, {
                          default: s(() => [
                            b(p(o(n)("search")), 1)
                          ]),
                          _: 1
                        }),
                        l(m, {
                          onClick: e[3] || (e[3] = (t) => ae(T.value))
                        }, {
                          default: s(() => [
                            b(p(o(n)("reset")), 1)
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
            h("div", Pe, [
              _e((y(), C(te, {
                height: "100%",
                data: i.data,
                size: "large"
              }, {
                empty: s(() => [
                  h("span", null, p(i.loading ? "" : o(n)("emptyData")), 1)
                ]),
                default: s(() => [
                  l(k, {
                    prop: "title",
                    label: o(n)("title"),
                    "min-width": "70"
                  }, null, 8, ["label"]),
                  l(k, {
                    prop: "addon_title",
                    label: o(n)("forAddon"),
                    "min-width": "70"
                  }, {
                    default: s(({ row: t }) => [
                      h("span", null, p(t.addon_info.title), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(k, {
                    prop: "page",
                    label: o(n)("wapUrl"),
                    "min-width": "230"
                  }, {
                    default: s(({ row: t }) => [
                      h("span", Se, p(P.value + t.page), 1),
                      l(m, {
                        type: "primary",
                        link: "",
                        onClick: (w) => N(P.value + t.page)
                      }, {
                        default: s(() => [
                          b(p(o(n)("copy")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(k, {
                    prop: "page",
                    label: o(n)("weappUrl"),
                    "min-width": "120"
                  }, {
                    default: s(({ row: t }) => [
                      h("span", Ue, p(t.page), 1),
                      l(m, {
                        type: "primary",
                        link: "",
                        onClick: (w) => N(t.page)
                      }, {
                        default: s(() => [
                          b(p(o(n)("copy")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(k, {
                    label: o(n)("share"),
                    fixed: "right",
                    align: "right",
                    "min-width": "40"
                  }, {
                    default: s(({ row: t }) => [
                      t.is_share == 1 ? (y(), C(m, {
                        key: 0,
                        type: "primary",
                        link: "",
                        onClick: (w) => Z(t)
                      }, {
                        default: s(() => [
                          b(p(o(n)("shareSet")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : I("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [ie, i.loading]
              ])
            ]),
            h("div", Fe, [
              l(le, {
                "current-page": i.page,
                "onUpdate:current-page": e[4] || (e[4] = (t) => i.page = t),
                "page-size": i.limit,
                "onUpdate:page-size": e[5] || (e[5] = (t) => i.limit = t),
                layout: "total, sizes, prev, pager, next, jumper",
                total: i.total,
                onSizeChange: x,
                onCurrentChange: S
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        l(se, {
          modelValue: V.value,
          "onUpdate:modelValue": e[12] || (e[12] = (t) => V.value = t),
          title: o(n)("shareSet"),
          width: "30%"
        }, {
          footer: s(() => [
            h("span", Te, [
              l(m, {
                onClick: e[10] || (e[10] = (t) => V.value = !1)
              }, {
                default: s(() => [
                  b(p(o(n)("cancel")), 1)
                ]),
                _: 1
              }),
              l(m, {
                type: "primary",
                onClick: e[11] || (e[11] = (t) => ee(A.value))
              }, {
                default: s(() => [
                  b(p(o(n)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            l(oe, {
              modelValue: c.value,
              "onUpdate:modelValue": e[6] || (e[6] = (t) => c.value = t)
            }, {
              default: s(() => [
                l(E, {
                  label: o(n)("wechat"),
                  name: "wechat"
                }, null, 8, ["label"]),
                l(E, {
                  label: o(n)("weapp"),
                  name: "weapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            l(M, {
              model: f[c.value],
              "label-width": "90px",
              ref_key: "shareFormRef",
              ref: A,
              rules: o(Y)
            }, {
              default: s(() => [
                l(g, {
                  label: o(n)("sharePage")
                }, {
                  default: s(() => [
                    h("span", null, p($.value), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(g, {
                  label: o(n)("shareTitle"),
                  prop: "title"
                }, {
                  default: s(() => [
                    l(d, {
                      modelValue: f[c.value].title,
                      "onUpdate:modelValue": e[7] || (e[7] = (t) => f[c.value].title = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(n)("shareTitlePlaceholder"),
                      clearable: "",
                      maxlength: "30",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                c.value == "wechat" ? (y(), C(g, {
                  key: 0,
                  label: o(n)("shareDesc"),
                  prop: "desc"
                }, {
                  default: s(() => [
                    l(d, {
                      modelValue: f[c.value].desc,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => f[c.value].desc = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(n)("shareDescPlaceholder"),
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : I("", !0),
                l(g, {
                  label: o(n)("shareImageUrl"),
                  prop: "url"
                }, {
                  default: s(() => [
                    l(ne, {
                      modelValue: f[c.value].url,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => f[c.value].url = t),
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
  Ke as default
};
