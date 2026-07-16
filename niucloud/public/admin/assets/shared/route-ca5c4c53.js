import { defineComponent as se, reactive as x, ref as _, watch as ie, computed as re, resolveComponent as r, resolveDirective as de, openBlock as y, createElementBlock as E, createVNode as l, withCtx as n, createElementVNode as g, toDisplayString as p, unref as s, Fragment as pe, renderList as ue, createBlock as R, createTextVNode as b, withDirectives as me, createCommentVNode as I } from "vue";
import { bt as ce, bm as fe, M as _e, t as o, a3 as he, bu as ge, bv as be, bw as ve } from "./core-shared-e1759ce4.js";
import { ElMessage as O } from "element-plus";
import { useRoute as ye, useRouter as Ve } from "vue-router";
import { c as J } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const De = { class: "main-container" }, we = { class: "flex justify-between items-center" }, ke = { class: "text-page-title" }, xe = { class: "mr-[10px]" }, Ce = { class: "mr-[10px]" }, Re = { class: "mt-[16px] flex justify-end" }, Pe = { class: "dialog-footer" }, Oe = /* @__PURE__ */ se({
  __name: "route",
  setup(Se) {
    const G = ye(), Ue = Ve(), q = G.meta.title, H = x({}), Fe = _(), Ne = _(!1), i = x({
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
      P.value = (await he()).data.wap_url;
    })();
    const F = x({});
    ce().then((a) => {
      if (a.data)
        for (const e in a.data)
          F[e] = a.data[e];
    });
    const C = () => {
      ge({}).then((a) => {
        i.loading = !1, U.value = J(a.data), S(i.page);
      }).catch(() => {
        i.loading = !1;
      });
    };
    C();
    const S = (a = 1) => {
      i.page = a;
      const e = J(U.value), d = [];
      for (let u = 0; u < e.length; u++) {
        let m = !0;
        i.searchParam.title && e[u].title.indexOf(i.searchParam.title) == -1 && (m = !1), i.searchParam.addon_name && e[u].addon_info && e[u].addon_info.key != i.searchParam.addon_name && (m = !1), m && d.push(e[u]);
      }
      i.total = d.length;
      const h = Math.ceil(d.length / i.limit), D = [];
      for (let u = 0; u < h; u++)
        D[u] = d.splice(0, i.limit);
      i.data = D[i.page - 1];
    };
    fe({}).then((a) => {
      for (const e in a.data)
        H[e] = a.data[e];
    });
    const N = _(), { copy: K, isSupported: Q, copied: T } = _e(), $ = (a) => {
      Q.value || O({
        message: o("notSupportCopy"),
        type: "warning"
      }), K(a);
    };
    ie(T, () => {
      T.value && O({
        message: o("copySuccess"),
        type: "success"
      });
    });
    const c = _("wechat"), z = _(""), L = _(0), v = x({
      title: "",
      name: "",
      page: "",
      is_share: 0,
      sort: 0
    }), f = x({
      wechat: {
        title: "",
        desc: "",
        url: ""
      },
      weapp: {
        title: "",
        url: ""
      }
    }), V = _(!1), W = re(() => ({})), M = _(), X = async (a) => {
      const e = (await be({
        name: a.name
      })).data;
      e.title && (a.id = e.id, a.title = e.title, a.name = e.name, a.page = e.page, a.is_share = e.is_share, a.sort = e.sort, a.share = e.share), v.title = a.title, v.name = a.name, v.page = a.page, v.is_share = a.is_share, v.sort = a.sort, L.value = a.id, z.value = a.title;
      const d = a.share ? JSON.parse(a.share) : {
        wechat: { title: "", desc: "", url: "" },
        weapp: { title: "", url: "" }
      };
      d && (f.wechat = d.wechat, f.weapp = d.weapp), V.value = !0;
    }, Y = async (a) => {
      a && await a.validate(async (e) => {
        e && ve({
          id: L.value,
          share: JSON.stringify(f),
          ...v
        }).then(() => {
          C(), V.value = !1;
        }).catch(() => {
        });
      });
    }, Z = (a) => {
      a && (a.resetFields(), C());
    };
    return (a, e) => {
      const d = r("el-input"), h = r("el-form-item"), D = r("el-option"), u = r("el-select"), m = r("el-button"), A = r("el-form"), j = r("el-card"), w = r("el-table-column"), ee = r("el-table"), ae = r("el-pagination"), B = r("el-tab-pane"), te = r("el-tabs"), le = r("upload-image"), oe = r("el-dialog"), ne = de("loading");
      return y(), E("div", De, [
        l(j, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            g("div", we, [
              g("span", ke, p(s(q)), 1)
            ]),
            l(j, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                l(A, {
                  inline: !0,
                  model: i.searchParam,
                  ref_key: "searchFormDiyRouteRef",
                  ref: N
                }, {
                  default: n(() => [
                    l(h, {
                      label: s(o)("title"),
                      prop: "title"
                    }, {
                      default: n(() => [
                        l(d, {
                          modelValue: i.searchParam.title,
                          "onUpdate:modelValue": e[0] || (e[0] = (t) => i.searchParam.title = t),
                          modelModifiers: { trim: !0 },
                          placeholder: s(o)("titlePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(h, {
                      label: s(o)("forAddon"),
                      prop: "addon_name"
                    }, {
                      default: n(() => [
                        l(u, {
                          modelValue: i.searchParam.addon_name,
                          "onUpdate:modelValue": e[1] || (e[1] = (t) => i.searchParam.addon_name = t),
                          placeholder: s(o)("forAddonPlaceholder")
                        }, {
                          default: n(() => [
                            l(D, {
                              label: s(o)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (y(!0), E(pe, null, ue(F, (t, k) => (y(), R(D, {
                              label: t.title,
                              value: k,
                              key: k
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(h, null, {
                      default: n(() => [
                        l(m, {
                          type: "primary",
                          onClick: e[2] || (e[2] = (t) => S())
                        }, {
                          default: n(() => [
                            b(p(s(o)("search")), 1)
                          ]),
                          _: 1
                        }),
                        l(m, {
                          onClick: e[3] || (e[3] = (t) => Z(N.value))
                        }, {
                          default: n(() => [
                            b(p(s(o)("reset")), 1)
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
            me((y(), R(ee, {
              data: i.data,
              size: "large"
            }, {
              empty: n(() => [
                g("span", null, p(i.loading ? "" : s(o)("emptyData")), 1)
              ]),
              default: n(() => [
                l(w, {
                  prop: "title",
                  label: s(o)("title"),
                  "min-width": "70"
                }, null, 8, ["label"]),
                l(w, {
                  prop: "addon_title",
                  label: s(o)("forAddon"),
                  "min-width": "70"
                }, {
                  default: n(({ row: t }) => [
                    g("span", null, p(t.addon_info.title), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(w, {
                  prop: "page",
                  label: s(o)("wapUrl"),
                  "min-width": "230"
                }, {
                  default: n(({ row: t }) => [
                    g("span", xe, p(P.value + t.page), 1),
                    l(m, {
                      type: "primary",
                      link: "",
                      onClick: (k) => $(P.value + t.page)
                    }, {
                      default: n(() => [
                        b(p(s(o)("copy")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(w, {
                  prop: "page",
                  label: s(o)("weappUrl"),
                  "min-width": "120"
                }, {
                  default: n(({ row: t }) => [
                    g("span", Ce, p(t.page), 1),
                    l(m, {
                      type: "primary",
                      link: "",
                      onClick: (k) => $(t.page)
                    }, {
                      default: n(() => [
                        b(p(s(o)("copy")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(w, {
                  label: s(o)("share"),
                  fixed: "right",
                  align: "right",
                  "min-width": "40"
                }, {
                  default: n(({ row: t }) => [
                    t.is_share == 1 ? (y(), R(m, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (k) => X(t)
                    }, {
                      default: n(() => [
                        b(p(s(o)("shareSet")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : I("", !0)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [ne, i.loading]
            ]),
            g("div", Re, [
              l(ae, {
                "current-page": i.page,
                "onUpdate:currentPage": e[4] || (e[4] = (t) => i.page = t),
                "page-size": i.limit,
                "onUpdate:pageSize": e[5] || (e[5] = (t) => i.limit = t),
                layout: "total, sizes, prev, pager, next, jumper",
                total: i.total,
                onSizeChange: C,
                onCurrentChange: S
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        l(oe, {
          modelValue: V.value,
          "onUpdate:modelValue": e[12] || (e[12] = (t) => V.value = t),
          title: s(o)("shareSet"),
          width: "30%"
        }, {
          footer: n(() => [
            g("span", Pe, [
              l(m, {
                onClick: e[10] || (e[10] = (t) => V.value = !1)
              }, {
                default: n(() => [
                  b(p(s(o)("cancel")), 1)
                ]),
                _: 1
              }),
              l(m, {
                type: "primary",
                onClick: e[11] || (e[11] = (t) => Y(M.value))
              }, {
                default: n(() => [
                  b(p(s(o)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            l(te, {
              modelValue: c.value,
              "onUpdate:modelValue": e[6] || (e[6] = (t) => c.value = t)
            }, {
              default: n(() => [
                l(B, {
                  label: s(o)("wechat"),
                  name: "wechat"
                }, null, 8, ["label"]),
                l(B, {
                  label: s(o)("weapp"),
                  name: "weapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            l(A, {
              model: f[c.value],
              "label-width": "90px",
              ref_key: "shareFormRef",
              ref: M,
              rules: W.value
            }, {
              default: n(() => [
                l(h, {
                  label: s(o)("sharePage")
                }, {
                  default: n(() => [
                    g("span", null, p(z.value), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(h, {
                  label: s(o)("shareTitle"),
                  prop: "title"
                }, {
                  default: n(() => [
                    l(d, {
                      modelValue: f[c.value].title,
                      "onUpdate:modelValue": e[7] || (e[7] = (t) => f[c.value].title = t),
                      modelModifiers: { trim: !0 },
                      placeholder: s(o)("shareTitlePlaceholder"),
                      clearable: "",
                      maxlength: "30",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                c.value == "wechat" ? (y(), R(h, {
                  key: 0,
                  label: s(o)("shareDesc"),
                  prop: "desc"
                }, {
                  default: n(() => [
                    l(d, {
                      modelValue: f[c.value].desc,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => f[c.value].desc = t),
                      modelModifiers: { trim: !0 },
                      placeholder: s(o)("shareDescPlaceholder"),
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : I("", !0),
                l(h, {
                  label: s(o)("shareImageUrl"),
                  prop: "url"
                }, {
                  default: n(() => [
                    l(le, {
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
      ]);
    };
  }
});
export {
  Oe as default
};
