import { defineComponent as de, ref as c, reactive as O, computed as me, resolveComponent as g, resolveDirective as pe, openBlock as x, createBlock as V, unref as C, withCtx as n, createElementVNode as u, createVNode as t, createElementBlock as fe, Fragment as _e, renderList as ge, createTextVNode as b, toDisplayString as r, withDirectives as G, nextTick as R } from "vue";
import { u as ve, he, t as J, i as be, h5 as ye, hf as we, hg as K, hh as ke } from "./core-shared-c6ad4e77.js";
import { ElTable as xe, ElMessageBox as $, ElMessage as Ce } from "element-plus";
import Te from "./index-559a9b12.js";
import Se from "./index-997caa57.js";
import { useRoute as Le } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Pe = { class: "schedule-log-drawer table-fill-page" }, Ve = { class: "table-fill-page__card" }, De = { class: "flex justify-between" }, Be = { class: "table-panel table-fill-page__panel" }, Ee = { class: "table-fill-page__table" }, Re = { class: "input-width" }, $e = { class: "input-width" }, ze = { class: "input-width" }, Ue = { class: "input-width" }, Fe = { class: "input-width" }, Ie = { class: "input-width" }, Me = { class: "dialog-footer" }, Xe = /* @__PURE__ */ de({
  __name: "schedule_log",
  setup(je, { expose: Q }) {
    const W = ve();
    he.loadLocaleMessages("", "tools/schedule_log", W.lang || "zh-cn");
    const e = (o) => {
      const l = `tools.schedule_log.${o}`, i = be.global.t(l);
      return i != l ? i : J(o);
    }, w = Le(), z = String(w.path).includes("schedule_log") ? String(w.meta.title || "") : J("cronLog"), D = c(!1), U = c(""), a = O({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        schedule_id: "",
        key: "",
        status: "all",
        execute_time: []
      }
    }), F = c([]), I = c(), X = (o) => {
      o && (o.resetFields(), h());
    };
    (async () => {
      F.value = await (await ye()).data;
    })();
    const M = (o) => {
      U.value = o, a.searchParam.schedule_id = o, a.searchParam.key = "", a.searchParam.status = "all", a.searchParam.execute_time = [], m.value = [], D.value = !0, h();
    }, Z = () => {
      a.data = [], a.total = 0;
    }, h = (o = 1) => (a.loading = !0, a.page = o, we({
      page: a.page,
      limit: a.limit,
      ...a.searchParam
    }).then(async (l) => {
      a.data = l.data.data, a.total = l.data.total, await Y();
    }).catch(() => {
    }).finally(() => {
      a.loading = !1;
    })), T = c(!1), B = c(!0), d = c(!1), S = c(!1), L = c(!1), j = {
      id: "",
      name: "",
      key: "",
      execute_result: "",
      status_name: "",
      class: "",
      job: "",
      execute_time: ""
    }, f = O({ ...j }), ee = (o) => {
      B.value = !0, Object.assign(f, j), o && Object.keys(f).forEach((l) => {
        o[l] != null && (f[l] = o[l]);
      }), B.value = !1, T.value = !0;
    }, le = (o) => {
      $.confirm(
        e("deleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        d.value || (d.value = !0, K({
          ids: o.id
        }).then((l) => {
          l.code == 1 && (m.value = m.value.filter((i) => i != o.id), h()), d.value = !1;
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, P = c(), m = c([]), A = c(!1), k = c(!1), N = me(() => m.value.length), Y = async () => {
      var l;
      await R(), k.value = !0, (l = P.value) == null || l.clearSelection();
      const o = new Set(m.value);
      a.data.forEach((i) => {
        var p;
        o.has(i.id) && ((p = P.value) == null || p.toggleRowSelection(i, !0));
      }), await R(), k.value = !1;
    }, te = (o) => {
      if (k.value)
        return;
      const l = new Set(a.data.map((p) => p.id)), i = m.value.filter((p) => !l.has(p));
      m.value = Array.from(/* @__PURE__ */ new Set([
        ...i,
        ...o.map((p) => p.id)
      ]));
    }, ae = () => {
      m.value = a.data.map((o) => o.id), Y();
    }, E = () => {
      var o;
      m.value = [], k.value = !0, (o = P.value) == null || o.clearSelection(), R(() => {
        k.value = !1;
      });
    }, oe = () => {
      if (m.value.length == 0) {
        Ce({
          type: "warning",
          message: `${e("batchEmptySelectedCronLogTips")}`
        });
        return;
      }
      $.confirm(
        e("batchDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        if (d.value)
          return;
        d.value = !0, S.value = !0;
        const o = [...m.value];
        K({
          ids: o
        }).then(() => {
          E(), h(), d.value = !1, S.value = !1;
        }).catch(() => {
          d.value = !1, S.value = !1;
        });
      });
    }, ne = () => {
      $.confirm(
        e("clearAllTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        if (d.value)
          return;
        d.value = !0, L.value = !0;
        let o = U.value ?? "";
        ke({
          schedule_id: o
        }).then(() => {
          E(), h(), d.value = !1, L.value = !1;
        }).catch(() => {
          d.value = !1, L.value = !1;
        });
      });
    };
    return String(w.path).includes("schedule_log") && w.query.id && M(w.query.id), Q({
      open: M
    }), (o, l) => {
      const i = g("el-option"), p = g("el-select"), _ = g("el-form-item"), se = g("el-date-picker"), y = g("el-button"), q = g("el-form"), ie = g("el-card"), v = g("el-table-column"), re = g("el-dialog"), ce = g("el-drawer"), H = pe("loading");
      return x(), V(ce, {
        modelValue: D.value,
        "onUpdate:modelValue": l[10] || (l[10] = (s) => D.value = s),
        class: "schedule-log-drawer-root",
        title: C(z),
        direction: "rtl",
        size: "80%",
        "destroy-on-close": !1,
        onClosed: Z
      }, {
        default: n(() => [
          u("div", Pe, [
            u("div", Ve, [
              t(ie, {
                class: "box-card !border-none table-search-wrap table-fill-page__search",
                shadow: "never"
              }, {
                default: n(() => [
                  u("div", De, [
                    t(q, {
                      inline: !0,
                      model: a.searchParam,
                      ref_key: "searchFormRef",
                      ref: I
                    }, {
                      default: n(() => [
                        t(_, {
                          label: e("name"),
                          prop: "key"
                        }, {
                          default: n(() => [
                            t(p, {
                              modelValue: a.searchParam.key,
                              "onUpdate:modelValue": l[0] || (l[0] = (s) => a.searchParam.key = s),
                              placeholder: "全部",
                              filterable: "",
                              remote: "",
                              clearable: ""
                            }, {
                              default: n(() => [
                                t(i, {
                                  label: "全部",
                                  value: "all"
                                }),
                                (x(!0), fe(_e, null, ge(F.value, (s) => (x(), V(i, {
                                  key: s.key,
                                  label: s.name,
                                  value: s.key
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        t(_, {
                          label: e("status"),
                          prop: "status"
                        }, {
                          default: n(() => [
                            t(p, {
                              modelValue: a.searchParam.status,
                              "onUpdate:modelValue": l[1] || (l[1] = (s) => a.searchParam.status = s),
                              placeholder: "全部",
                              filterable: "",
                              remote: "",
                              clearable: ""
                            }, {
                              default: n(() => [
                                t(i, {
                                  label: "全部",
                                  value: "all"
                                }),
                                t(i, {
                                  label: "成功",
                                  value: "success"
                                }),
                                t(i, {
                                  label: "失败",
                                  value: "error"
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        t(_, {
                          label: e("executeTime"),
                          prop: "execute_time"
                        }, {
                          default: n(() => [
                            t(se, {
                              modelValue: a.searchParam.execute_time,
                              "onUpdate:modelValue": l[2] || (l[2] = (s) => a.searchParam.execute_time = s),
                              type: "datetimerange",
                              "value-format": "YYYY-MM-DD HH:mm:ss",
                              "start-placeholder": e("startDate"),
                              "end-placeholder": e("endDate")
                            }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        t(_, null, {
                          default: n(() => [
                            t(y, {
                              type: "primary",
                              onClick: l[3] || (l[3] = (s) => h())
                            }, {
                              default: n(() => [
                                b(r(e("search")), 1)
                              ]),
                              _: 1
                            }),
                            t(y, {
                              onClick: l[4] || (l[4] = (s) => X(I.value))
                            }, {
                              default: n(() => [
                                b(r(e("reset")), 1)
                              ]),
                              _: 1
                            }),
                            t(y, {
                              onClick: ne,
                              loading: L.value
                            }, {
                              default: n(() => [
                                b(r(e("clearAll")), 1)
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ])
                ]),
                _: 1
              }),
              u("div", Be, [
                t(Se, {
                  title: C(z),
                  "selected-count": C(N),
                  "current-page-count": a.data.length,
                  "total-count": a.total,
                  "selection-loading": A.value,
                  "allow-select-all": !1,
                  onSelectPage: ae,
                  onClearSelection: E
                }, {
                  "batch-actions": n(() => [
                    t(y, {
                      class: "table-delete",
                      link: "",
                      disabled: !C(N) || A.value,
                      loading: S.value,
                      onClick: oe
                    }, {
                      default: n(() => [
                        b(r(e("batchDelete")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "loading"])
                  ]),
                  _: 1
                }, 8, ["title", "selected-count", "current-page-count", "total-count", "selection-loading"]),
                u("div", Ee, [
                  G((x(), V(C(xe), {
                    height: "100%",
                    data: a.data,
                    size: "large",
                    ref_key: "cronLogListTableRef",
                    ref: P,
                    "row-key": "id",
                    onSelectionChange: te
                  }, {
                    empty: n(() => [
                      u("span", null, r(a.loading ? "" : e("emptyData")), 1)
                    ]),
                    default: n(() => [
                      t(v, {
                        type: "selection",
                        width: "55",
                        "reserve-selection": ""
                      }),
                      t(v, {
                        prop: "id",
                        label: e("id"),
                        "min-width": "80"
                      }, null, 8, ["label"]),
                      t(v, {
                        prop: "name",
                        label: e("name"),
                        "min-width": "150"
                      }, null, 8, ["label"]),
                      t(v, {
                        prop: "key",
                        label: e("key"),
                        "min-width": "150"
                      }, null, 8, ["label"]),
                      t(v, {
                        prop: "class",
                        label: e("class"),
                        "min-width": "150"
                      }, null, 8, ["label"]),
                      t(v, {
                        label: e("executeResult"),
                        "min-width": "150"
                      }, {
                        default: n(({ row: s }) => [
                          b(r(s.execute_result), 1)
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      t(v, {
                        prop: "status_name",
                        label: e("status"),
                        "min-width": "100"
                      }, null, 8, ["label"]),
                      t(v, {
                        prop: "execute_time",
                        label: e("executeTime"),
                        "min-width": "100"
                      }, null, 8, ["label"]),
                      t(v, {
                        label: e("operation"),
                        align: "right",
                        fixed: "right",
                        width: "130"
                      }, {
                        default: n(({ row: s }) => [
                          t(y, {
                            type: "primary",
                            link: "",
                            onClick: (ue) => ee(s)
                          }, {
                            default: n(() => [
                              b(r(e("info")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          t(y, {
                            type: "primary",
                            link: "",
                            onClick: (ue) => le(s)
                          }, {
                            default: n(() => [
                              b(r(e("delete")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["label"])
                    ]),
                    _: 1
                  }, 8, ["data"])), [
                    [H, a.loading]
                  ])
                ]),
                t(Te, {
                  "current-page": a.page,
                  "onUpdate:current-page": l[5] || (l[5] = (s) => a.page = s),
                  "page-size": a.limit,
                  "onUpdate:page-size": l[6] || (l[6] = (s) => a.limit = s),
                  total: a.total,
                  onSizeChange: l[7] || (l[7] = (s) => h()),
                  onCurrentChange: h
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            t(re, {
              modelValue: T.value,
              "onUpdate:modelValue": l[9] || (l[9] = (s) => T.value = s),
              title: e("cronInfo"),
              width: "550px",
              "destroy-on-close": !0
            }, {
              footer: n(() => [
                u("span", Me, [
                  t(y, {
                    type: "primary",
                    onClick: l[8] || (l[8] = (s) => T.value = !1)
                  }, {
                    default: n(() => [
                      b(r(e("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: n(() => [
                G((x(), V(q, {
                  model: f,
                  "label-width": "110px",
                  ref: "formRef",
                  class: "page-form"
                }, {
                  default: n(() => [
                    t(_, {
                      label: e("name")
                    }, {
                      default: n(() => [
                        u("div", Re, r(f.name), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(_, {
                      label: e("key")
                    }, {
                      default: n(() => [
                        u("div", $e, r(f.key), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(_, {
                      label: e("class")
                    }, {
                      default: n(() => [
                        u("div", ze, r(f.class), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(_, {
                      label: e("executeResult")
                    }, {
                      default: n(() => [
                        u("div", Ue, r(f.execute_result), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(_, {
                      label: e("status")
                    }, {
                      default: n(() => [
                        u("div", Fe, r(f.status_name), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(_, {
                      label: e("executeTime")
                    }, {
                      default: n(() => [
                        u("div", Ie, r(f.execute_time), 1)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["model"])), [
                  [H, B.value]
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Xe as default
};
