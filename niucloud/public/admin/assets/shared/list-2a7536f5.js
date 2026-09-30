import { defineComponent as oe, reactive as R, computed as ne, ref as y, resolveComponent as u, resolveDirective as re, openBlock as p, createElementBlock as v, normalizeStyle as se, unref as a, createVNode as o, withCtx as n, createElementVNode as _, toDisplayString as i, createTextVNode as c, createCommentVNode as C, Fragment as H, renderList as O, createBlock as h, withDirectives as ie } from "vue";
import { t as l, bt as V, j as de, dO as pe, dP as ue, bw as me, dQ as ce, dR as fe, dS as _e, dN as ge, dT as ye } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as ve } from "element-plus";
import { useRouter as he, useRoute as be } from "vue-router";
import { u as ke } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Pe = { class: "flex justify-between items-center" }, we = { class: "text-page-title" }, xe = {
  key: 0,
  class: "mt-[20px]"
}, Ce = /* @__PURE__ */ _("span", { class: "!text-[14px]" }, "检测到PHP未安装ImageMagick扩展，需安装后才能使用海报功能", -1), Ve = { class: "table-fill-page__panel" }, Te = { class: "table-fill-page__table" }, De = {
  key: 0,
  class: "text-primary"
}, Ne = { key: 1 }, $e = { class: "mt-[16px] flex justify-end" }, Re = { class: "dialog-footer" }, Fe = { key: 0 }, Se = ["src"], Ge = /* @__PURE__ */ oe({
  __name: "list",
  setup(Ue) {
    const F = he(), Q = be().meta.title, { pageRef: A, pageStyle: G } = ke(), k = R({}), f = R({
      name: "",
      type: ""
    }), J = ne(() => ({
      name: [
        { required: !0, message: l("posterNamePlaceholder"), trigger: "blur" }
      ],
      type: [
        { required: !0, message: l("posterTypePlaceholder"), trigger: "blur" }
      ]
    })), S = y(), P = y(!1), K = async (s) => {
      s && await s.validate(async (e) => {
        if (e) {
          const m = { type: f.type, name: f.name }, N = F.resolve({
            path: "/poster/edit",
            query: m
          });
          window.open(N.href), P.value = !1, f.name = "", f.type = "";
        }
      });
    };
    (() => {
      pe({}).then((s) => {
        for (const e in k)
          delete k[e];
        for (const e in s.data)
          k[e] = s.data[e];
      });
    })();
    const r = R({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: "",
        type: ""
      }
    }), U = y(), g = (s = 1) => {
      r.loading = !0, r.page = s, ue({
        page: r.page,
        limit: r.limit,
        ...r.searchParam
      }).then((e) => {
        r.loading = !1, r.data = e.data.data, r.total = e.data.total, me(r.page, r.limit, r.searchParam);
      }).catch(() => {
        r.loading = !1;
      });
    };
    g(V(r.searchParam).page);
    const W = (s) => {
      const e = F.resolve({
        path: "/poster/edit",
        query: { id: s.id }
      });
      window.open(e.href);
    }, d = y(!1), z = (s, e) => {
      d.value || (d.value = !0, ce({
        id: s,
        status: e
      }).then((m) => {
        g(V(r.searchParam).page), d.value = !1;
      }));
    }, X = (s) => {
      d.value || (d.value = !0, fe({
        id: s
      }).then((e) => {
        g(V(r.searchParam).page), d.value = !1;
      }));
    }, Y = (s) => {
      ve.confirm(
        l("diyPosterDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        d.value || (d.value = !0, _e(s).then(() => {
          g(V(r.searchParam).page), d.value = !1;
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, T = y(!1), D = y(""), Z = (s) => {
      d.value || (d.value = !0, ge({
        id: s.id,
        type: s.type
      }).then((e) => {
        e.data && (D.value = e.data, T.value = !0), d.value = !1;
      }).catch(() => {
        d.value = !1;
      }));
    }, ee = (s) => {
      s && (s.resetFields(), g());
    }, B = y(!0);
    return (() => {
      ye().then((s) => {
        B.value = s.data;
      });
    })(), (s, e) => {
      const m = u("el-button"), N = u("el-alert"), I = u("el-input"), w = u("el-form-item"), $ = u("el-option"), j = u("el-select"), q = u("el-form"), E = u("el-card"), b = u("el-table-column"), M = u("el-tag"), te = u("el-table"), le = u("el-pagination"), L = u("el-dialog"), ae = re("loading");
      return p(), v("div", {
        ref_key: "pageRef",
        ref: A,
        class: "main-container table-fill-page",
        style: se(a(G))
      }, [
        o(E, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: n(() => [
            _("div", Pe, [
              _("span", we, i(a(Q)), 1),
              o(m, {
                type: "primary",
                class: "w-[100px]",
                onClick: e[0] || (e[0] = (t) => P.value = !0)
              }, {
                default: n(() => [
                  c(i(a(l)("添加海报")), 1)
                ]),
                _: 1
              })
            ]),
            !B.value && !r.loading ? (p(), v("div", xe, [
              o(N, {
                type: "warning",
                "show-icon": "",
                closable: !1
              }, {
                title: n(() => [
                  Ce
                ]),
                _: 1
              })
            ])) : C("", !0),
            o(E, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: n(() => [
                o(q, {
                  inline: !0,
                  model: r.searchParam,
                  ref_key: "searchFormDiyPosterRef",
                  ref: U
                }, {
                  default: n(() => [
                    o(w, {
                      label: a(l)("posterName"),
                      prop: "name"
                    }, {
                      default: n(() => [
                        o(I, {
                          modelValue: r.searchParam.name,
                          "onUpdate:modelValue": e[1] || (e[1] = (t) => r.searchParam.name = t),
                          modelModifiers: { trim: !0 },
                          placeholder: a(l)("posterNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(w, {
                      label: a(l)("posterType"),
                      prop: "type"
                    }, {
                      default: n(() => [
                        o(j, {
                          modelValue: r.searchParam.type,
                          "onUpdate:modelValue": e[2] || (e[2] = (t) => r.searchParam.type = t),
                          placeholder: a(l)("posterTypePlaceholder")
                        }, {
                          default: n(() => [
                            o($, {
                              label: a(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (p(!0), v(H, null, O(k, (t) => (p(), h($, {
                              label: t.name,
                              value: t.type,
                              key: t.type
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(w, null, {
                      default: n(() => [
                        o(m, {
                          type: "primary",
                          onClick: e[3] || (e[3] = (t) => g())
                        }, {
                          default: n(() => [
                            c(i(a(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        o(m, {
                          onClick: e[4] || (e[4] = (t) => ee(U.value))
                        }, {
                          default: n(() => [
                            c(i(a(l)("reset")), 1)
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
            _("div", Ve, [
              _("div", Te, [
                ie((p(), h(te, {
                  height: "100%",
                  data: r.data,
                  size: "large"
                }, {
                  empty: n(() => [
                    _("span", null, i(r.loading ? "" : a(l)("emptyData")), 1)
                  ]),
                  default: n(() => [
                    o(b, {
                      prop: "name",
                      label: a(l)("posterName"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    o(b, {
                      prop: "type_name",
                      label: a(l)("posterType"),
                      "min-width": "80"
                    }, null, 8, ["label"]),
                    o(b, {
                      label: a(l)("status"),
                      "min-width": "80"
                    }, {
                      default: n(({ row: t }) => [
                        t.status == 1 ? (p(), h(M, {
                          key: 0,
                          type: "success",
                          onClick: (x) => z(t.id, 0),
                          class: "cursor-pointer"
                        }, {
                          default: n(() => [
                            c(i(a(l)("启用")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : (p(), h(M, {
                          key: 1,
                          type: "info",
                          onClick: (x) => z(t.id, 1),
                          class: "cursor-pointer"
                        }, {
                          default: n(() => [
                            c(i(a(l)("未启用")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(b, {
                      label: a(l)("isDefault"),
                      "min-width": "80"
                    }, {
                      default: n(({ row: t }) => [
                        t.is_default == 1 ? (p(), v("span", De, i(a(l)("defaultPoster")), 1)) : (p(), v("span", Ne, i(a(l)("noDefault")), 1))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(b, {
                      prop: "update_time",
                      label: a(l)("updateTime"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    o(b, {
                      label: a(l)("operation"),
                      fixed: "right",
                      align: "right",
                      "min-width": "250"
                    }, {
                      default: n(({ row: t }) => [
                        o(m, {
                          type: "primary",
                          link: "",
                          onClick: (x) => Z(t)
                        }, {
                          default: n(() => [
                            c(i(a(l)("preview")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t.is_default == 0 ? (p(), h(m, {
                          key: 0,
                          type: "primary",
                          link: "",
                          onClick: (x) => X(t.id)
                        }, {
                          default: n(() => [
                            c(i(a(l)("modifyDefault")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : C("", !0),
                        o(m, {
                          type: "primary",
                          link: "",
                          onClick: (x) => W(t)
                        }, {
                          default: n(() => [
                            c(i(a(l)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t.is_default == 0 ? (p(), h(m, {
                          key: 1,
                          type: "primary",
                          link: "",
                          onClick: (x) => Y(t.id)
                        }, {
                          default: n(() => [
                            c(i(a(l)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : C("", !0)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [ae, r.loading]
                ])
              ]),
              _("div", $e, [
                o(le, {
                  "current-page": r.page,
                  "onUpdate:current-page": e[5] || (e[5] = (t) => r.page = t),
                  "page-size": r.limit,
                  "onUpdate:page-size": e[6] || (e[6] = (t) => r.limit = t),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: r.total,
                  onSizeChange: e[7] || (e[7] = (t) => g()),
                  onCurrentChange: g
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        o(L, {
          modelValue: P.value,
          "onUpdate:modelValue": e[12] || (e[12] = (t) => P.value = t),
          title: a(l)("addPosterTitle"),
          width: "350px",
          "destroy-on-close": "true"
        }, {
          footer: n(() => [
            _("span", Re, [
              o(m, {
                onClick: e[10] || (e[10] = (t) => P.value = !1)
              }, {
                default: n(() => [
                  c(i(a(l)("cancel")), 1)
                ]),
                _: 1
              }),
              o(m, {
                type: "primary",
                onClick: e[11] || (e[11] = (t) => K(S.value))
              }, {
                default: n(() => [
                  c(i(a(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            o(q, {
              model: f,
              "label-width": "90px",
              ref_key: "formRef",
              ref: S,
              rules: a(J)
            }, {
              default: n(() => [
                o(w, {
                  label: a(l)("posterName"),
                  prop: "name"
                }, {
                  default: n(() => [
                    o(I, {
                      modelValue: f.name,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => f.name = t),
                      modelModifiers: { trim: !0 },
                      placeholder: a(l)("posterNamePlaceholder"),
                      clearable: "",
                      maxlength: "12",
                      "show-word-limit": "",
                      class: "w-full"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(w, {
                  label: a(l)("posterType"),
                  prop: "type"
                }, {
                  default: n(() => [
                    o(j, {
                      modelValue: f.type,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => f.type = t),
                      placeholder: a(l)("posterTypePlaceholder"),
                      class: "!w-full"
                    }, {
                      default: n(() => [
                        (p(!0), v(H, null, O(k, (t) => (p(), h($, {
                          label: t.name,
                          value: t.type,
                          key: t.type
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
        o(L, {
          modelValue: T.value,
          "onUpdate:modelValue": e[13] || (e[13] = (t) => T.value = t),
          title: a(l)("previewDialogTitle"),
          width: "400px",
          height: "640px"
        }, {
          default: n(() => [
            D.value ? (p(), v("div", Fe, [
              _("img", {
                src: a(de)(D.value),
                class: "w-[360px] h-[640px]"
              }, null, 8, Se)
            ])) : C("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 4);
    };
  }
});
export {
  Ge as default
};
