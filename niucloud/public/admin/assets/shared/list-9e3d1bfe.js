import { defineComponent as le, reactive as F, computed as ae, ref as _, resolveComponent as u, resolveDirective as oe, openBlock as p, createElementBlock as g, createVNode as o, withCtx as n, createElementVNode as h, toDisplayString as i, unref as a, createTextVNode as c, createCommentVNode as C, Fragment as H, renderList as A, createBlock as v, withDirectives as ne } from "vue";
import { t as l, bl as V, i as re, dp as se, dq as ie, bo as de, dr as pe, ds as ue, dt as me, dn as ce, du as fe } from "./core-shared-9b1e55e9.js";
import { ElMessageBox as ye } from "element-plus";
import { useRouter as _e, useRoute as ge } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ve = { class: "main-container" }, he = { class: "flex justify-between items-center" }, be = { class: "text-page-title" }, ke = {
  key: 0,
  class: "mt-[20px]"
}, Pe = /* @__PURE__ */ h("span", { class: "!text-[14px]" }, "检测到PHP未安装ImageMagick扩展，需安装后才能使用海报功能", -1), we = {
  key: 0,
  class: "text-primary"
}, xe = { key: 1 }, Ce = { class: "mt-[16px] flex justify-end" }, Ve = { class: "dialog-footer" }, Te = { key: 0 }, De = ["src"], je = /* @__PURE__ */ le({
  __name: "list",
  setup($e) {
    const U = _e(), G = ge().meta.title, k = F({}), f = F({
      name: "",
      type: ""
    }), J = ae(() => ({
      name: [
        { required: !0, message: l("posterNamePlaceholder"), trigger: "blur" }
      ],
      type: [
        { required: !0, message: l("posterTypePlaceholder"), trigger: "blur" }
      ]
    })), R = _(), P = _(!1), K = async (s) => {
      s && await s.validate(async (e) => {
        if (e) {
          const m = { type: f.type, name: f.name }, $ = U.resolve({
            path: "/poster/edit",
            query: m
          });
          window.open($.href), P.value = !1, f.name = "", f.type = "";
        }
      });
    };
    (() => {
      se({}).then((s) => {
        for (const e in k)
          delete k[e];
        for (const e in s.data)
          k[e] = s.data[e];
      });
    })();
    const r = F({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: "",
        type: ""
      }
    }), S = _(), y = (s = 1) => {
      r.loading = !0, r.page = s, ie({
        page: r.page,
        limit: r.limit,
        ...r.searchParam
      }).then((e) => {
        r.loading = !1, r.data = e.data.data, r.total = e.data.total, de(r.page, r.limit, r.searchParam);
      }).catch(() => {
        r.loading = !1;
      });
    };
    y(V(r.searchParam).page);
    const O = (s) => {
      const e = U.resolve({
        path: "/poster/edit",
        query: { id: s.id }
      });
      window.open(e.href);
    }, d = _(!1), z = (s, e) => {
      d.value || (d.value = !0, pe({
        id: s,
        status: e
      }).then((m) => {
        y(V(r.searchParam).page), d.value = !1;
      }));
    }, Q = (s) => {
      d.value || (d.value = !0, ue({
        id: s
      }).then((e) => {
        y(V(r.searchParam).page), d.value = !1;
      }));
    }, W = (s) => {
      ye.confirm(
        l("diyPosterDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        d.value || (d.value = !0, me(s).then(() => {
          y(V(r.searchParam).page), d.value = !1;
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, T = _(!1), D = _(""), X = (s) => {
      d.value || (d.value = !0, ce({
        id: s.id,
        type: s.type
      }).then((e) => {
        e.data && (D.value = e.data, T.value = !0), d.value = !1;
      }).catch(() => {
        d.value = !1;
      }));
    }, Y = (s) => {
      s && (s.resetFields(), y());
    }, B = _(!0);
    return (() => {
      fe().then((s) => {
        B.value = s.data;
      });
    })(), (s, e) => {
      const m = u("el-button"), $ = u("el-alert"), q = u("el-input"), w = u("el-form-item"), N = u("el-option"), I = u("el-select"), E = u("el-form"), M = u("el-card"), b = u("el-table-column"), j = u("el-tag"), Z = u("el-table"), ee = u("el-pagination"), L = u("el-dialog"), te = oe("loading");
      return p(), g("div", ve, [
        o(M, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            h("div", he, [
              h("span", be, i(a(G)), 1),
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
            !B.value && !r.loading ? (p(), g("div", ke, [
              o($, {
                type: "warning",
                "show-icon": "",
                closable: !1
              }, {
                title: n(() => [
                  Pe
                ]),
                _: 1
              })
            ])) : C("", !0),
            o(M, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                o(E, {
                  inline: !0,
                  model: r.searchParam,
                  ref_key: "searchFormDiyPosterRef",
                  ref: S
                }, {
                  default: n(() => [
                    o(w, {
                      label: a(l)("posterName"),
                      prop: "name"
                    }, {
                      default: n(() => [
                        o(q, {
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
                        o(I, {
                          modelValue: r.searchParam.type,
                          "onUpdate:modelValue": e[2] || (e[2] = (t) => r.searchParam.type = t),
                          placeholder: a(l)("posterTypePlaceholder")
                        }, {
                          default: n(() => [
                            o(N, {
                              label: a(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (p(!0), g(H, null, A(k, (t) => (p(), v(N, {
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
                          onClick: e[3] || (e[3] = (t) => y())
                        }, {
                          default: n(() => [
                            c(i(a(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        o(m, {
                          onClick: e[4] || (e[4] = (t) => Y(S.value))
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
            ne((p(), v(Z, {
              data: r.data,
              size: "large"
            }, {
              empty: n(() => [
                h("span", null, i(r.loading ? "" : a(l)("emptyData")), 1)
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
                    t.status == 1 ? (p(), v(j, {
                      key: 0,
                      type: "success",
                      onClick: (x) => z(t.id, 0),
                      class: "cursor-pointer"
                    }, {
                      default: n(() => [
                        c(i(a(l)("启用")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : (p(), v(j, {
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
                    t.is_default == 1 ? (p(), g("span", we, i(a(l)("defaultPoster")), 1)) : (p(), g("span", xe, i(a(l)("noDefault")), 1))
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
                  "min-width": "160"
                }, {
                  default: n(({ row: t }) => [
                    o(m, {
                      type: "primary",
                      link: "",
                      onClick: (x) => X(t)
                    }, {
                      default: n(() => [
                        c(i(a(l)("preview")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    t.is_default == 0 ? (p(), v(m, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (x) => Q(t.id)
                    }, {
                      default: n(() => [
                        c(i(a(l)("modifyDefault")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : C("", !0),
                    o(m, {
                      type: "primary",
                      link: "",
                      onClick: (x) => O(t)
                    }, {
                      default: n(() => [
                        c(i(a(l)("edit")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    t.is_default == 0 ? (p(), v(m, {
                      key: 1,
                      type: "primary",
                      link: "",
                      onClick: (x) => W(t.id)
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
              [te, r.loading]
            ]),
            h("div", Ce, [
              o(ee, {
                "current-page": r.page,
                "onUpdate:currentPage": e[5] || (e[5] = (t) => r.page = t),
                "page-size": r.limit,
                "onUpdate:pageSize": e[6] || (e[6] = (t) => r.limit = t),
                layout: "total, sizes, prev, pager, next, jumper",
                total: r.total,
                onSizeChange: e[7] || (e[7] = (t) => y()),
                onCurrentChange: y
              }, null, 8, ["current-page", "page-size", "total"])
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
            h("span", Ve, [
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
                onClick: e[11] || (e[11] = (t) => K(R.value))
              }, {
                default: n(() => [
                  c(i(a(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            o(E, {
              model: f,
              "label-width": "90px",
              ref_key: "formRef",
              ref: R,
              rules: J.value
            }, {
              default: n(() => [
                o(w, {
                  label: a(l)("posterName"),
                  prop: "name"
                }, {
                  default: n(() => [
                    o(q, {
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
                    o(I, {
                      modelValue: f.type,
                      "onUpdate:modelValue": e[9] || (e[9] = (t) => f.type = t),
                      placeholder: a(l)("posterTypePlaceholder"),
                      class: "!w-full"
                    }, {
                      default: n(() => [
                        (p(!0), g(H, null, A(k, (t) => (p(), v(N, {
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
            D.value ? (p(), g("div", Te, [
              h("img", {
                src: a(re)(D.value),
                class: "w-[360px] h-[640px]"
              }, null, 8, De)
            ])) : C("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  je as default
};
