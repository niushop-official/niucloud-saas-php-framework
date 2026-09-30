import { defineComponent as ue, ref as g, reactive as _e, computed as S, resolveComponent as f, resolveDirective as ge, openBlock as l, createElementBlock as p, createElementVNode as n, toDisplayString as i, unref as a, createVNode as d, withCtx as c, createTextVNode as m, withDirectives as fe, Fragment as B, renderList as z, normalizeClass as A, createBlock as v, createCommentVNode as D, resolveDynamicComponent as j, pushScopeId as gt, popScopeId as ft } from "vue";
import { t, m as me, eK as ye, c5 as ve, eL as xe, eM as he, eN as be, eO as O, eP as Ce, a as ke } from "./core-shared-c6ad4e77.js";
import { ElMessage as we, ElMessageBox as K } from "element-plus";
import { useRoute as Se } from "vue-router";
import { ArrowRight as De, Monitor as Te, Files as Ne, Cloudy as G, PartlyCloudy as Ve, MostlyCloudy as Ie } from "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ee = { class: "main-container" }, Le = { class: "page-card" }, Me = { class: "flex justify-between items-center" }, Pe = { class: "text-page-title" }, Be = { class: "mt-[20px]" }, ze = {
  key: 0,
  class: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[12px]"
}, je = { class: "flex justify-between items-center" }, Fe = { class: "flex-1 mr-[8px] min-w-0" }, Ue = { class: "flex items-center min-w-0" }, qe = ["title"], Re = { class: "inline-flex shrink-0" }, $e = { class: "mb-[8px] mt-[4px] min-h-[56px]" }, Ae = {
  key: 0,
  class: "text-[12px] leading-[18px] text-[var(--el-text-color-secondary)]"
}, Oe = { class: "w-[72px] shrink-0 text-[var(--el-text-color-secondary)] truncate" }, Ke = { class: "flex-1 min-w-0 break-all" }, Ge = {
  key: 0,
  class: "mt-[auto] pt-[10px] border-t border-solid border-[var(--el-border-color-lighter)] flex justify-end items-center"
}, He = {
  key: 1,
  class: "py-[40px] text-center text-[var(--el-text-color-secondary)]"
}, Je = { class: "flex items-stretch min-h-[420px]" }, Qe = { class: "storage-type-panel" }, We = ["onClick"], Xe = { class: "flex-1 min-w-0 ml-[10px]" }, Ye = { class: "text-[13px] font-bold leading-[20px] truncate" }, Ze = {
  key: 1,
  class: "storage-type-item is-active"
}, et = { class: "flex-1 min-w-0 ml-[10px]" }, tt = { class: "flex items-center min-w-0" }, ot = { class: "text-[13px] font-bold leading-[20px] truncate" }, st = { class: "flex-1 min-w-0 pl-[16px]" }, at = { class: "flex justify-between items-start pb-[12px] mb-[16px] border-b border-solid border-[var(--el-border-color-lighter)]" }, nt = { class: "min-w-0" }, lt = { class: "text-[16px] font-bold leading-[24px] truncate" }, it = {
  key: 1,
  class: "py-[30px] text-center text-[var(--el-text-color-secondary)]"
}, ct = { class: "dialog-footer" }, rt = /* @__PURE__ */ ue({
  __name: "storage-config",
  setup(dt) {
    const H = Se().meta.title, T = g(!0), I = g(!1), E = g([]), b = g([]), C = g(!1), x = g(!1), L = g(""), F = g(null), N = g(null), r = _e({
      storage_type: "",
      name: ""
    }), J = S(() => x.value ? t("editStorageConfig") : t("addStorageConfig")), U = S(() => {
      const e = b.value.find((o) => o.storage_type == r.storage_type);
      return e ? e.component : null;
    }), q = S(() => {
      const e = b.value.find((o) => o.storage_type == r.storage_type);
      return e ? e.name : r.storage_type;
    }), Q = {
      local: Te,
      qiniu: Ne,
      aliyun: G,
      tencent: Ve,
      huaweicloud: Ie
    }, R = (e) => Q[e] || G, W = S(() => Number(me.get("siteId") || 0) === 0), $ = S(() => W.value ? t("localStorageTips") : t("localStorageTipsForSite")), X = {
      qiniu: "qiniuStorageDesc",
      aliyun: "aliStorageDesc",
      tencent: "tencentStorageDesc",
      huaweicloud: "huaweiStorageDesc"
    }, ut = (e, o) => {
      var w;
      if (o)
        return $.value;
      const u = X[e];
      if (u)
        return t(u);
      const _ = ((w = b.value.find((y) => y.storage_type == e)) == null ? void 0 : w.name) || "";
      return t("storageTypeDesc").replace("{name}", _);
    }, k = S(() => {
      const e = N.value;
      return e ? e.is_use == 1 ? { text: t("inUse"), type: "success" } : e.is_complete != 1 ? { text: t("notConfigured"), type: "warning" } : { text: t("configured"), type: "info" } : null;
    }), Y = () => {
      ye().then(({ data: e }) => {
        b.value = (e || []).filter((o) => o.storage_type != "local").map((o) => ({
          ...o,
          component: o.component ? ve(o.component) : null
        }));
      });
    }, V = () => {
      T.value = !0, xe().then(({ data: e }) => {
        E.value = (e || []).map((o) => ({
          ...o,
          is_use: Number(o.is_use),
          is_local: Number(o.is_local),
          is_complete: Number(o.is_complete)
        })), T.value = !1;
      }).catch(() => {
        T.value = !1;
      });
    };
    Y(), V();
    const Z = (e) => {
      r.storage_type != e.storage_type && (r.storage_type = e.storage_type, N.value = null);
    }, ee = () => {
      var e;
      x.value = !1, L.value = "", r.name = "", N.value = null, r.storage_type = ((e = b.value[0]) == null ? void 0 : e.storage_type) || "", C.value = !0;
    }, te = (e) => {
      x.value = !0, L.value = e.id, r.name = e.name, r.storage_type = e.storage_type, N.value = e, C.value = !0;
    }, oe = async () => {
      const e = F.value;
      if (!e) {
        we.warning(t("storageTypePlaceholder"));
        return;
      }
      if (!await e.validate())
        return;
      const u = e.getFormData() || {}, _ = {
        storage_type: r.storage_type,
        name: r.name
      };
      Object.keys(u).forEach((y) => {
        y == "storage_type" || y == "is_use" || (_[y] = u[y]);
      }), I.value = !0, (x.value ? he(L.value, _) : be(_)).then(() => {
        I.value = !1, C.value = !1, V();
      }).catch(() => {
        I.value = !1;
      });
    }, M = (e) => e.is_local || e.is_complete === void 0 || e.is_complete === null || Number.isNaN(e.is_complete) ? !1 : e.is_complete != 1, se = (e) => e.is_local ? e.is_use == 1 : M(e), ae = (e) => e.is_use != 1 ? new Promise((o) => {
      O(e.id).then(() => {
        V(), o(!0);
      }).catch(() => {
        o(!1);
      });
    }) : new Promise((o) => {
      K.confirm(t("disableStorageConfigTips"), t("warning"), {
        confirmButtonText: t("confirm"),
        cancelButtonText: t("cancel"),
        type: "warning"
      }).then(() => {
        O("local").then(() => {
          V(), o(!0);
        }).catch(() => {
          o(!1);
        });
      }).catch(() => {
        o(!1);
      });
    }), ne = (e) => {
      K.confirm(t("storageConfigDeleteTips"), t("warning"), {
        confirmButtonText: t("confirm"),
        cancelButtonText: t("cancel"),
        type: "warning"
      }).then(() => {
        Ce(e.id).then(() => {
          V();
        });
      }).catch(() => {
      });
    };
    return (e, o) => {
      const u = f("el-button"), _ = f("el-tag"), w = f("el-tooltip"), y = f("el-switch"), P = f("el-icon"), le = f("el-input"), ie = f("el-form-item"), ce = f("el-form"), re = f("el-dialog"), de = ge("loading");
      return l(), p("div", Ee, [
        n("div", Le, [
          n("div", Me, [
            n("span", Pe, i(a(H)), 1),
            d(u, {
              type: "primary",
              onClick: ee
            }, {
              default: c(() => [
                m(i(a(t)("addStorageConfig")), 1)
              ]),
              _: 1
            })
          ]),
          fe((l(), p("div", Be, [
            E.value.length ? (l(), p("div", ze, [
              (l(!0), p(B, null, z(E.value, (s) => (l(), p("div", {
                key: s.id,
                class: A(["storage-card", { "is-active": s.is_use == 1 }])
              }, [
                n("div", je, [
                  n("div", Fe, [
                    n("div", Ue, [
                      n("span", {
                        class: "text-[14px] font-bold leading-[20px] truncate",
                        title: s.name
                      }, i(s.name), 9, qe),
                      M(s) ? (l(), v(w, {
                        key: 0,
                        placement: "top",
                        content: a(t)("storageConfigMissingTips") + (s.missing_params || []).join("、")
                      }, {
                        default: c(() => [
                          d(_, {
                            type: "warning",
                            size: "small",
                            class: "ml-[6px] shrink-0"
                          }, {
                            default: c(() => [
                              m(i(a(t)("notConfigured")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["content"])) : D("", !0)
                    ])
                  ]),
                  d(w, {
                    disabled: !M(s),
                    content: a(t)("storageConfigNotCompleteTips"),
                    placement: "top"
                  }, {
                    default: c(() => [
                      n("span", Re, [
                        d(y, {
                          modelValue: s.is_use,
                          "onUpdate:modelValue": (h) => s.is_use = h,
                          "active-value": 1,
                          "inactive-value": 0,
                          disabled: se(s),
                          "before-change": () => ae(s)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "before-change"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["disabled", "content"])
                ]),
                n("div", $e, [
                  s.is_local ? (l(), p("div", Ae, i(a($)), 1)) : (l(!0), p(B, { key: 1 }, z(s.params, (h, pe) => (l(), p("div", {
                    key: pe,
                    class: "flex text-[12px] leading-[18px]"
                  }, [
                    n("span", Oe, i(h.name) + "：", 1),
                    n("span", Ke, i(h.value || "-"), 1)
                  ]))), 128))
                ]),
                s.is_local ? D("", !0) : (l(), p("div", Ge, [
                  d(u, {
                    type: "primary",
                    link: "",
                    size: "small",
                    onClick: (h) => te(s)
                  }, {
                    default: c(() => [
                      m(i(a(t)("config")), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  s.is_use != 1 ? (l(), v(u, {
                    key: 0,
                    class: "table-delete",
                    link: "",
                    size: "small",
                    onClick: (h) => ne(s)
                  }, {
                    default: c(() => [
                      m(i(a(t)("delete")), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])) : D("", !0)
                ]))
              ], 2))), 128))
            ])) : T.value ? D("", !0) : (l(), p("div", He, i(a(t)("emptyData")), 1))
          ])), [
            [de, T.value]
          ])
        ]),
        d(re, {
          modelValue: C.value,
          "onUpdate:modelValue": o[2] || (o[2] = (s) => C.value = s),
          title: a(J),
          width: "900px",
          "destroy-on-close": !0
        }, {
          footer: c(() => [
            n("span", ct, [
              d(u, {
                onClick: o[1] || (o[1] = (s) => C.value = !1)
              }, {
                default: c(() => [
                  m(i(a(t)("cancel")), 1)
                ]),
                _: 1
              }),
              d(u, {
                type: "primary",
                loading: I.value,
                onClick: oe
              }, {
                default: c(() => [
                  m(i(a(t)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: c(() => [
            n("div", Je, [
              n("div", Qe, [
                x.value ? (l(), p("div", Ze, [
                  d(P, { class: "storage-type-icon" }, {
                    default: c(() => [
                      (l(), v(j(R(r.storage_type))))
                    ]),
                    _: 1
                  }),
                  n("div", et, [
                    n("div", tt, [
                      n("span", ot, i(a(q)), 1),
                      a(k) ? (l(), v(_, {
                        key: 0,
                        type: a(k).type,
                        size: "small",
                        class: "ml-[6px] shrink-0"
                      }, {
                        default: c(() => [
                          m(i(a(k).text), 1)
                        ]),
                        _: 1
                      }, 8, ["type"])) : D("", !0)
                    ])
                  ])
                ])) : (l(!0), p(B, { key: 0 }, z(b.value, (s) => (l(), p("div", {
                  key: s.storage_type,
                  class: A(["storage-type-item", { "is-active": r.storage_type == s.storage_type }]),
                  onClick: (h) => Z(s)
                }, [
                  d(P, { class: "storage-type-icon" }, {
                    default: c(() => [
                      (l(), v(j(R(s.storage_type))))
                    ]),
                    _: 2
                  }, 1024),
                  n("div", Xe, [
                    n("div", Ye, i(s.name), 1)
                  ]),
                  d(P, { class: "shrink-0 text-[var(--el-text-color-placeholder)]" }, {
                    default: c(() => [
                      d(a(De))
                    ]),
                    _: 1
                  })
                ], 10, We))), 128))
              ]),
              n("div", st, [
                n("div", at, [
                  n("div", nt, [
                    n("div", lt, i(a(q) || a(t)("storageTypePlaceholder")), 1)
                  ]),
                  x.value && a(k) ? (l(), v(_, {
                    key: 0,
                    type: a(k).type,
                    size: "small",
                    class: "shrink-0 ml-[10px]"
                  }, {
                    default: c(() => [
                      m(i(a(k).text), 1)
                    ]),
                    _: 1
                  }, 8, ["type"])) : x.value ? D("", !0) : (l(), v(_, {
                    key: 1,
                    type: "warning",
                    size: "small",
                    class: "shrink-0 ml-[10px]"
                  }, {
                    default: c(() => [
                      m(i(a(t)("notConfigured")), 1)
                    ]),
                    _: 1
                  }))
                ]),
                d(ce, { "label-position": "top" }, {
                  default: c(() => [
                    d(ie, {
                      label: a(t)("configName")
                    }, {
                      default: c(() => [
                        d(le, {
                          modelValue: r.name,
                          "onUpdate:modelValue": o[0] || (o[0] = (s) => r.name = s),
                          modelModifiers: { trim: !0 },
                          placeholder: a(t)("configNamePlaceholder"),
                          maxlength: "50",
                          "show-word-limit": "",
                          clearable: ""
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }),
                a(U) ? (l(), v(j(a(U)), {
                  key: r.storage_type,
                  ref_key: "typeFormRef",
                  ref: F,
                  inline: "",
                  "config-data": N.value
                }, null, 8, ["config-data"])) : (l(), p("div", it, i(a(t)("storageTypePlaceholder")), 1))
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const kt = /* @__PURE__ */ ke(rt, [["__scopeId", "data-v-2d13c417"]]);
export {
  kt as default
};
