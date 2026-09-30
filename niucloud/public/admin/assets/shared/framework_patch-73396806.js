import { defineComponent as Y, ref as g, reactive as B, resolveComponent as u, resolveDirective as Z, openBlock as _, createElementBlock as y, normalizeStyle as ee, unref as n, createElementVNode as r, createVNode as a, withCtx as o, createTextVNode as p, toDisplayString as c, withDirectives as I, createBlock as P, Fragment as le, createCommentVNode as L, pushScopeId as De, popScopeId as Fe } from "vue";
import { t as e, g$ as te, h0 as ae, h1 as oe, h2 as ne, a as se } from "./core-shared-c6ad4e77.js";
import { ElMessage as D, ElMessageBox as ie } from "element-plus";
import ce from "./index-c14157f3.js";
import de from "./index-559a9b12.js";
import re from "./index-997caa57.js";
import { useRoute as pe } from "vue-router";
import { u as ue } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const _e = { class: "table-fill-page__card" }, me = { class: "table-panel table-fill-page__panel" }, ve = { class: "table-fill-page__table" }, fe = { class: "mb-[12px]" }, be = { class: "text-[16px] font-bold text-[#1D1F3A] mb-[8px]" }, he = { class: "flex items-center flex-wrap gap-[8px]" }, ge = { class: "mb-[12px]" }, ye = { class: "text-[13px] text-[#6b7280] mb-[6px]" }, ke = {
  key: 0,
  class: "patch-content-box"
}, we = ["innerHTML"], xe = {
  key: 1,
  class: "patch-content-box"
}, Ne = { class: "flex items-center justify-end gap-[8px]" }, Te = /* @__PURE__ */ Y({
  __name: "framework_patch",
  setup(Pe) {
    const M = pe().meta.title, { pageRef: U, pageStyle: A } = ue(), F = g(), d = B({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), m = B({
      title: "",
      is_resolved: ""
    }), k = g(!1), w = g(!1), x = g(!1), i = g({}), E = (t) => {
      t && (t.resetFields(), v());
    }, H = (t) => [
      { label: e("patchDetail"), onClick: () => q(t) },
      { label: e("download"), show: !!t.attach_url, onClick: () => R(t) },
      { label: e("markResolved"), type: "success", show: Number(t.is_resolved) !== 1, onClick: () => z(t) }
    ], v = (t = 1) => {
      d.loading = !0, t && (d.page = t);
      const l = m.is_resolved;
      te({
        page: d.page,
        limit: d.limit,
        title: m.title,
        is_resolved: l === 0 || l === 1 ? l : ""
      }).then((N) => {
        d.data = N.data.data, d.total = N.data.total, d.loading = !1;
      }).catch(() => {
        d.loading = !1;
      });
    }, j = () => {
      k.value || (k.value = !0, ae().then((t) => {
        const l = (t == null ? void 0 : t.data) ?? {};
        D({
          message: Number(l.new) > 0 ? `${e("syncPatchTip")}：新增 ${l.new} 条（共 ${l.total ?? 0} 条）` : e("syncPatchNone"),
          type: "success"
        }), v();
      }).catch((t) => {
        D({ message: (t == null ? void 0 : t.msg) || (t == null ? void 0 : t.message) || e("syncPatchFail"), type: "error" });
      }).finally(() => {
        k.value = !1;
      }));
    }, z = (t) => {
      Number(t.is_resolved) !== 1 && ie.confirm(e("markResolvedTips"), e("warning"), {
        confirmButtonText: e("confirm"),
        cancelButtonText: e("cancel"),
        type: "warning"
      }).then(() => {
        oe(Number(t.id), 1).then(() => {
          v(), w.value && i.value.id === Number(t.id) && S(Number(t.id));
        }).catch((l) => {
          D({ message: (l == null ? void 0 : l.msg) || (l == null ? void 0 : l.message) || e("resolveFail"), type: "error" });
        });
      }).catch(() => {
      });
    }, S = (t) => {
      x.value = !0, ne(t).then((l) => {
        i.value = (l == null ? void 0 : l.data) ?? {}, x.value = !1;
      }).catch(() => {
        i.value = {}, x.value = !1;
      });
    }, q = (t) => {
      i.value = {}, w.value = !0, S(Number(t.id));
    }, R = (t) => {
      t.attach_url && window.open(t.attach_url, "_blank");
    };
    return v(), (t, l) => {
      const N = u("el-input"), V = u("el-form-item"), C = u("el-option"), G = u("el-select"), h = u("el-button"), J = u("el-form"), K = u("el-card"), f = u("el-table-column"), T = u("el-tag"), O = u("el-table"), b = u("el-descriptions-item"), Q = u("el-descriptions"), W = u("el-empty"), X = u("el-drawer"), $ = Z("loading");
      return _(), y("div", {
        ref_key: "pageRef",
        ref: U,
        class: "main-container table-fill-page",
        style: ee(n(A))
      }, [
        r("div", _e, [
          a(K, {
            class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
            shadow: "never"
          }, {
            default: o(() => [
              a(J, {
                inline: !0,
                model: m,
                ref_key: "searchFormRef",
                ref: F
              }, {
                default: o(() => [
                  a(V, {
                    label: n(e)("patchTitle"),
                    prop: "title"
                  }, {
                    default: o(() => [
                      a(N, {
                        modelValue: m.title,
                        "onUpdate:modelValue": l[0] || (l[0] = (s) => m.title = s),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: n(e)("patchTitlePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(V, {
                    label: n(e)("resolveStatus"),
                    prop: "is_resolved"
                  }, {
                    default: o(() => [
                      a(G, {
                        modelValue: m.is_resolved,
                        "onUpdate:modelValue": l[1] || (l[1] = (s) => m.is_resolved = s),
                        clearable: "",
                        placeholder: n(e)("resolveStatusPlaceholder")
                      }, {
                        default: o(() => [
                          a(C, {
                            label: n(e)("all"),
                            value: ""
                          }, null, 8, ["label"]),
                          a(C, {
                            label: n(e)("unresolved"),
                            value: 0
                          }, null, 8, ["label"]),
                          a(C, {
                            label: n(e)("resolved"),
                            value: 1
                          }, null, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(V, null, {
                    default: o(() => [
                      a(h, {
                        type: "primary",
                        onClick: l[2] || (l[2] = (s) => v())
                      }, {
                        default: o(() => [
                          p(c(n(e)("search")), 1)
                        ]),
                        _: 1
                      }),
                      a(h, {
                        onClick: l[3] || (l[3] = (s) => E(F.value))
                      }, {
                        default: o(() => [
                          p(c(n(e)("reset")), 1)
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
          r("div", me, [
            a(re, {
              title: n(M),
              selectable: !1
            }, {
              actions: o(() => [
                a(h, {
                  type: "primary",
                  loading: k.value,
                  onClick: j
                }, {
                  default: o(() => [
                    p(c(n(e)("syncPatch")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ]),
              _: 1
            }, 8, ["title"]),
            r("div", ve, [
              I((_(), P(O, {
                height: "100%",
                data: d.data,
                size: "large"
              }, {
                empty: o(() => [
                  r("span", null, c(d.loading ? "" : n(e)("emptyData")), 1)
                ]),
                default: o(() => [
                  a(f, {
                    label: n(e)("patchNo"),
                    "min-width": "120"
                  }, {
                    default: o(({ row: s }) => [
                      r("span", null, c(s.patch_no || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("appName"),
                    "min-width": "130"
                  }, {
                    default: o(({ row: s }) => [
                      r("span", null, c(s.app_key || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("patchTitle"),
                    "min-width": "200",
                    "show-overflow-tooltip": ""
                  }, {
                    default: o(({ row: s }) => [
                      r("span", null, c(s.title || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("frameworkVersion"),
                    "min-width": "120"
                  }, {
                    default: o(({ row: s }) => [
                      r("span", null, c(s.app_version || s.framework_version_no || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("releaseTime"),
                    "min-width": "160"
                  }, {
                    default: o(({ row: s }) => [
                      r("span", null, c(s.release_time || "-"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("resolveStatus"),
                    "min-width": "110"
                  }, {
                    default: o(({ row: s }) => [
                      a(T, {
                        type: Number(s.is_resolved) === 1 ? "success" : "warning",
                        size: "small",
                        effect: "light"
                      }, {
                        default: o(() => [
                          p(c(s.resolve_name), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(f, {
                    label: n(e)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "220"
                  }, {
                    default: o(({ row: s }) => [
                      a(ce, {
                        actions: H(s)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [$, d.loading]
              ])
            ]),
            a(de, {
              "current-page": d.page,
              "onUpdate:current-page": l[4] || (l[4] = (s) => d.page = s),
              "page-size": d.limit,
              "onUpdate:page-size": l[5] || (l[5] = (s) => d.limit = s),
              total: d.total,
              onSizeChange: l[6] || (l[6] = (s) => v()),
              onCurrentChange: v
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ]),
        a(X, {
          modelValue: w.value,
          "onUpdate:modelValue": l[9] || (l[9] = (s) => w.value = s),
          title: i.value.title || n(e)("patchDetail"),
          size: "55%"
        }, {
          default: o(() => [
            I((_(), y("div", null, [
              i.value.id ? (_(), y(le, { key: 0 }, [
                r("div", fe, [
                  r("div", be, c(i.value.title), 1),
                  r("div", he, [
                    a(T, {
                      size: "small",
                      effect: "plain"
                    }, {
                      default: o(() => [
                        p(c(i.value.patch_no || "-"), 1)
                      ]),
                      _: 1
                    }),
                    a(T, {
                      size: "small",
                      effect: "plain"
                    }, {
                      default: o(() => [
                        p(c(i.value.app_key || "-"), 1)
                      ]),
                      _: 1
                    }),
                    a(T, {
                      size: "small",
                      effect: "plain",
                      type: Number(i.value.is_resolved) === 1 ? "success" : "warning"
                    }, {
                      default: o(() => [
                        p(c(i.value.resolve_name), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])
                  ])
                ]),
                a(Q, {
                  column: 2,
                  border: "",
                  class: "mb-[12px]"
                }, {
                  default: o(() => [
                    a(b, {
                      label: n(e)("appName")
                    }, {
                      default: o(() => [
                        p(c(i.value.app_key || "-"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(b, {
                      label: n(e)("frameworkVersion")
                    }, {
                      default: o(() => [
                        p(c(i.value.app_version || i.value.framework_version_no || "-"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(b, {
                      label: n(e)("releaseTime")
                    }, {
                      default: o(() => [
                        p(c(i.value.release_time || "-"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(b, {
                      label: n(e)("syncTime")
                    }, {
                      default: o(() => [
                        p(c(i.value.create_time || "-"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(b, {
                      label: n(e)("resolveStatus")
                    }, {
                      default: o(() => [
                        p(c(i.value.resolve_name), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(b, {
                      label: n(e)("resolvedTime")
                    }, {
                      default: o(() => [
                        p(c(Number(i.value.is_resolved) === 1 && i.value.resolved_time || "-"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }),
                r("div", ge, [
                  r("div", ye, c(n(e)("patchDesc")), 1),
                  i.value.description ? (_(), y("div", ke, [
                    r("div", {
                      innerHTML: i.value.description
                    }, null, 8, we)
                  ])) : (_(), y("div", xe, c(n(e)("noPatchDesc")), 1))
                ]),
                r("div", Ne, [
                  i.value.attach_url ? (_(), P(h, {
                    key: 0,
                    type: "primary",
                    onClick: l[7] || (l[7] = (s) => R(i.value))
                  }, {
                    default: o(() => [
                      p(c(n(e)("downloadPatch")), 1)
                    ]),
                    _: 1
                  })) : L("", !0),
                  Number(i.value.is_resolved) !== 1 ? (_(), P(h, {
                    key: 1,
                    type: "success",
                    plain: "",
                    onClick: l[8] || (l[8] = (s) => z(i.value))
                  }, {
                    default: o(() => [
                      p(c(n(e)("markResolved")), 1)
                    ]),
                    _: 1
                  })) : L("", !0)
                ])
              ], 64)) : (_(), P(W, {
                key: 1,
                description: n(e)("emptyData")
              }, null, 8, ["description"]))
            ])), [
              [$, x.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 4);
    };
  }
});
const He = /* @__PURE__ */ se(Te, [["__scopeId", "data-v-75d3c465"]]);
export {
  He as default
};
