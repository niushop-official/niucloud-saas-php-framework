import { defineComponent as ue, ref as g, reactive as _e, computed as O, resolveComponent as _, resolveDirective as me, openBlock as u, createElementBlock as f, Fragment as D, createElementVNode as r, normalizeStyle as ge, unref as s, createVNode as n, withCtx as o, createTextVNode as v, toDisplayString as i, withDirectives as fe, createBlock as z, renderList as ve, normalizeClass as he, createCommentVNode as E, pushScopeId as we, popScopeId as et, nextTick as N } from "vue";
import { ak as ye, t as c, hn as be, ho as ke, a as xe } from "./core-shared-c6ad4e77.js";
import { ElTable as Se, ElMessage as I, ElMessageBox as Ce } from "element-plus";
import { ArrowDown as Re } from "@element-plus/icons-vue";
import Te from "./index-559a9b12.js";
import Pe from "./index-997caa57.js";
import { useRoute as Be, useRouter as Ve } from "vue-router";
import { u as De } from "./useTablePageHeight-33d60cf6.js";
import "axios";
import "vue-i18n";
import "pinia";
const ze = { class: "table-fill-page__card" }, Ee = { class: "table-panel table-fill-page__panel" }, Ne = { class: "table-fill-page__table" }, Ie = {
  key: 0,
  class: "upgrade-item"
}, Fe = { class: "upgrade-item__app" }, Me = { class: "upgrade-item__version" }, Ue = {
  key: 1,
  class: "upgrade-items"
}, $e = { class: "upgrade-item" }, Ae = { class: "upgrade-item__app" }, Le = { class: "upgrade-item__version" }, He = { class: "upgrade-item__app" }, Ke = { class: "upgrade-item__version" }, je = ["onClick"], qe = {
  key: 0,
  class: "flex items-center gap-[6px]"
}, Ge = { class: "text-[13px]" }, Je = {
  key: 1,
  class: "text-[13px] text-[#a0a3bd]"
}, Oe = ["innerHTML"], Qe = /* @__PURE__ */ ue({
  __name: "upgrade_records",
  setup(We) {
    const Q = ye(), W = Be(), Xe = Ve(), X = W.meta.title, { pageRef: Y, pageStyle: Z } = De(), F = g(), C = g(), l = _e({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        name: ""
      }
    }), w = (e) => {
      e && (e.resetFields(), k());
    }, h = (e) => !(e != null && e.content) || typeof e.content == "string" ? [] : Array.isArray(e.content.content) ? e.content.content : [], P = g(/* @__PURE__ */ new Set()), M = (e) => String((e == null ? void 0 : e.upgrade_key) || (e == null ? void 0 : e.id) || ""), B = (e) => P.value.has(M(e)), ee = (e) => {
      const a = M(e);
      if (a === "")
        return;
      const d = new Set(P.value);
      d.has(a) ? d.delete(a) : d.add(a), P.value = d;
    }, te = (e) => e === "complete" ? "success" : e === "fail" ? "danger" : e === "cancel" ? "info" : "primary", k = (e = 1) => (l.loading = !0, l.page = e, be({
      page: l.page,
      limit: l.limit,
      ...l.searchParam
    }).then(async (a) => {
      l.data = a.data.data, l.total = a.data.total, await K();
    }).catch(() => {
    }).finally(() => {
      l.loading = !1;
    }));
    k();
    const ae = (e) => {
      if (!(e != null && e.upgrade_key)) {
        I.warning("该记录缺少任务标识");
        return;
      }
      Q.openDetail(String(e.upgrade_key), "upgrade");
    }, U = g(""), V = g(!1), Ye = (e) => {
      U.value = e.fail_reason, V.value = !0;
    }, $ = (e) => !!e.backup_dir, y = g([]), A = g(!1), S = g(!1), L = O(() => y.value.length), H = O(() => y.value.map((e) => e.upgrade_key).filter(Boolean)), K = async () => {
      var a;
      await N(), S.value = !0, (a = C.value) == null || a.clearSelection();
      const e = new Set(y.value.map((d) => d.id));
      l.data.forEach((d) => {
        var b;
        e.has(d.id) && ((b = C.value) == null || b.toggleRowSelection(d, !0));
      }), await N(), S.value = !1;
    }, le = (e) => {
      if (S.value)
        return;
      const a = new Set(l.data.map((p) => p.id)), d = y.value.filter((p) => !a.has(p.id)), b = e.map((p) => ({ id: p.id, upgrade_key: String(p.upgrade_key ?? "") })), m = /* @__PURE__ */ new Map();
      [...d, ...b].forEach((p) => m.set(p.id, p)), y.value = Array.from(m.values());
    }, ne = () => {
      y.value = l.data.filter((e) => $(e)).map((e) => ({ id: e.id, upgrade_key: String(e.upgrade_key ?? "") })), K();
    }, j = () => {
      var e;
      y.value = [], S.value = !0, (e = C.value) == null || e.clearSelection(), N(() => {
        S.value = !1;
      });
    }, oe = () => {
      if (!H.value.length) {
        I({ message: "请先勾选要删除备份的记录", type: "error", duration: 5e3 });
        return;
      }
      q([...H.value]);
    }, q = (e) => {
      const a = (e ?? []).filter(Boolean);
      if (!a.length) {
        I({ message: "该记录暂无可删除的备份", type: "warning" });
        return;
      }
      Ce.confirm(
        "确认删除该升级产生的备份？备份文件将被清除且不可恢复（升级记录本身保留）。",
        c("warning"),
        {
          confirmButtonText: c("confirm"),
          cancelButtonText: c("cancel"),
          type: "warning"
        }
      ).then(() => {
        ke(a).then(() => {
          j(), k();
        }).catch(() => {
        });
      }).catch(() => {
      });
    };
    return (e, a) => {
      const d = _("el-input"), b = _("el-form-item"), m = _("el-button"), p = _("el-form"), se = _("el-card"), x = _("el-table-column"), ie = _("el-icon"), G = _("el-tag"), ce = _("el-scrollbar"), re = _("el-dialog"), de = me("loading");
      return u(), f(D, null, [
        r("div", {
          ref_key: "pageRef",
          ref: Y,
          class: "main-container table-fill-page",
          style: ge(s(Z))
        }, [
          r("div", ze, [
            n(se, {
              class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
              shadow: "never"
            }, {
              default: o(() => [
                n(p, {
                  inline: !0,
                  model: l.searchParam,
                  ref_key: "searchFormRef",
                  ref: F
                }, {
                  default: o(() => [
                    n(b, {
                      label: s(c)("upgradeName"),
                      prop: "name"
                    }, {
                      default: o(() => [
                        n(d, {
                          modelValue: l.searchParam.name,
                          "onUpdate:modelValue": a[0] || (a[0] = (t) => l.searchParam.name = t),
                          modelModifiers: { trim: !0 },
                          placeholder: s(c)("upgradeNamePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    n(b, null, {
                      default: o(() => [
                        n(m, {
                          type: "primary",
                          onClick: a[1] || (a[1] = (t) => k())
                        }, {
                          default: o(() => [
                            v(i(s(c)("search")), 1)
                          ]),
                          _: 1
                        }),
                        n(m, {
                          onClick: a[2] || (a[2] = (t) => w(F.value))
                        }, {
                          default: o(() => [
                            v(i(s(c)("reset")), 1)
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
            r("div", Ee, [
              n(Pe, {
                title: s(X),
                "selected-count": s(L),
                "current-page-count": l.data.length,
                "total-count": l.total,
                "selection-loading": A.value,
                "allow-select-all": !1,
                onSelectPage: ne,
                onClearSelection: j
              }, {
                "batch-actions": o(() => [
                  n(m, {
                    class: "table-delete",
                    link: "",
                    disabled: !s(L) || A.value,
                    onClick: oe
                  }, {
                    default: o(() => [
                      v(" 批量删除备份 ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["title", "selected-count", "current-page-count", "total-count", "selection-loading"]),
              r("div", Ne, [
                fe((u(), z(s(Se), {
                  height: "100%",
                  data: l.data,
                  size: "large",
                  ref_key: "tableRef",
                  ref: C,
                  "row-key": "id",
                  onSelectionChange: le
                }, {
                  empty: o(() => [
                    r("span", null, i(l.loading ? "" : s(c)("emptyData")), 1)
                  ]),
                  default: o(() => [
                    n(x, {
                      type: "selection",
                      width: "55",
                      "reserve-selection": "",
                      selectable: $
                    }),
                    n(x, {
                      prop: "name",
                      label: s(c)("upgradeName"),
                      "min-width": "320",
                      "class-name": "upgrade-name-col"
                    }, {
                      default: o(({ row: t }) => {
                        var R;
                        return [
                          h(t).length ? (u(), f("div", Ue, [
                            r("div", $e, [
                              r("span", Ae, i((R = h(t)[0].app) == null ? void 0 : R.app_name), 1),
                              r("span", Le, " 从 " + i(h(t)[0].version) + " 升级到 " + i(h(t)[0].upgrade_version), 1)
                            ]),
                            h(t).length > 1 ? (u(), f(D, { key: 0 }, [
                              (u(!0), f(D, null, ve(B(t) ? h(t).slice(1) : [], (T, pe) => {
                                var J;
                                return u(), f("div", {
                                  key: pe,
                                  class: "upgrade-item"
                                }, [
                                  r("span", He, i((J = T.app) == null ? void 0 : J.app_name), 1),
                                  r("span", Ke, " 从 " + i(T.version) + " 升级到 " + i(T.upgrade_version), 1)
                                ]);
                              }), 128)),
                              r("div", {
                                class: "upgrade-items__toggle",
                                onClick: (T) => ee(t)
                              }, [
                                n(ie, {
                                  class: he(["upgrade-items__arrow", { "is-open": B(t) }])
                                }, {
                                  default: o(() => [
                                    n(s(Re))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]),
                                v(" " + i(B(t) ? s(c)("collapse") : s(c)("expandAll", { count: h(t).length })), 1)
                              ], 8, je)
                            ], 64)) : E("", !0)
                          ])) : (u(), f("div", Ie, [
                            r("span", Fe, i(t.name), 1),
                            r("span", Me, "从 " + i(t.prev_version) + " 升级到 " + i(t.current_version), 1)
                          ]))
                        ];
                      }),
                      _: 1
                    }, 8, ["label"]),
                    n(x, {
                      prop: "create_time",
                      label: s(c)("completeTime"),
                      width: "220px"
                    }, null, 8, ["label"]),
                    n(x, {
                      prop: "status_name",
                      label: s(c)("status"),
                      width: "120px"
                    }, {
                      default: o(({ row: t }) => [
                        n(G, {
                          type: te(t.status),
                          size: "small",
                          effect: "light"
                        }, {
                          default: o(() => [
                            v(i(t.status_name), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    n(x, {
                      label: "备份路径",
                      width: "220px",
                      "show-overflow-tooltip": ""
                    }, {
                      default: o(({ row: t }) => [
                        t.backup_dir ? (u(), f("div", qe, [
                          r("span", Ge, i(t.backup_dir), 1),
                          t.backup_own ? E("", !0) : (u(), z(G, {
                            key: 0,
                            size: "small",
                            effect: "plain",
                            type: "info"
                          }, {
                            default: o(() => [
                              v("沿用上次备份")
                            ]),
                            _: 1
                          }))
                        ])) : (u(), f("span", Je, "-"))
                      ]),
                      _: 1
                    }),
                    n(x, {
                      label: s(c)("operation"),
                      align: "right",
                      width: "220px"
                    }, {
                      default: o(({ row: t }) => [
                        n(m, {
                          type: "primary",
                          link: "",
                          onClick: (R) => ae(t)
                        }, {
                          default: o(() => [
                            v(i(s(c)("detail")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        t.backup_dir ? (u(), z(m, {
                          key: 0,
                          class: "table-delete",
                          link: "",
                          onClick: (R) => q([t.upgrade_key])
                        }, {
                          default: o(() => [
                            v(" 删除备份 ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : E("", !0)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [de, l.loading]
                ])
              ]),
              n(Te, {
                "current-page": l.page,
                "onUpdate:current-page": a[3] || (a[3] = (t) => l.page = t),
                "page-size": l.limit,
                "onUpdate:page-size": a[4] || (a[4] = (t) => l.limit = t),
                total: l.total,
                onSizeChange: a[5] || (a[5] = (t) => k()),
                onCurrentChange: k
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ])
        ], 4),
        n(re, {
          modelValue: V.value,
          "onUpdate:modelValue": a[6] || (a[6] = (t) => V.value = t),
          title: s(c)("failReason"),
          width: "60%"
        }, {
          default: o(() => [
            n(ce, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
              default: o(() => [
                r("div", { innerHTML: U.value }, null, 8, Oe)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
const pt = /* @__PURE__ */ xe(Qe, [["__scopeId", "data-v-af52c5c5"]]);
export {
  pt as default
};
