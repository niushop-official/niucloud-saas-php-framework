import { defineComponent as se, reactive as F, ref as m, resolveComponent as u, resolveDirective as ie, openBlock as k, createElementBlock as M, createVNode as e, withCtx as a, unref as n, createElementVNode as c, toDisplayString as r, Fragment as re, renderList as ue, createBlock as P, createTextVNode as v, withDirectives as N } from "vue";
import { t as l, gp as ce, gy as de, gz as Y, gA as me } from "./core-shared-ca1fcae5.js";
import { ArrowLeft as pe } from "@element-plus/icons-vue";
import { ElMessageBox as z, ElMessage as fe } from "element-plus";
import { useRoute as _e, useRouter as ge } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const ve = { class: "main-container" }, he = { class: "text-large font-600 mr-3" }, be = { class: "flex justify-between" }, xe = { class: "mt-[20px]" }, ye = { class: "mb-[10px] flex items-center" }, ke = { class: "mt-[16px] flex justify-end" }, we = { class: "input-width" }, Ce = { class: "input-width" }, Te = { class: "input-width" }, Le = { class: "input-width" }, Ve = { class: "input-width" }, De = { class: "input-width" }, Be = { class: "dialog-footer" }, Me = /* @__PURE__ */ se({
  __name: "schedule_log",
  setup(Pe) {
    const V = _e(), q = ge(), H = V.meta.title, I = () => {
      q.push("/tools/schedule");
    }, o = F({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        schedule_id: V.query.id,
        key: "",
        status: "all",
        execute_time: []
      }
    }), R = m([]), E = m(), O = (i) => {
      i && (i.resetFields(), g());
    };
    (async () => {
      R.value = await (await ce()).data;
    })();
    const g = (i = 1) => {
      o.loading = !0, o.page = i, de({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((t) => {
        o.loading = !1, o.data = t.data.data, o.total = t.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    g();
    const w = m(!1), D = m(!0), d = m(!1), C = m(!1), T = m(!1), S = {
      id: "",
      name: "",
      key: "",
      execute_result: "",
      status_name: "",
      class: "",
      job: "",
      execute_time: ""
    }, p = F({ ...S }), G = (i) => {
      D.value = !0, Object.assign(p, S), i && Object.keys(p).forEach((t) => {
        i[t] != null && (p[t] = i[t]);
      }), D.value = !1, w.value = !0;
    }, J = (i) => {
      z.confirm(
        l("deleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        d.value || (d.value = !0, Y({
          ids: i.id
        }).then((t) => {
          t.code == 1 && g(), d.value = !1;
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, x = m(), L = m(!1), K = (i) => {
      L.value = !1, $.value.toggleAllSelection();
    }, $ = m(), h = m([]), Q = (i) => {
      h.value = i, x.value = !1, h.value.length > 0 && h.value.length < o.data.length ? L.value = !0 : L.value = !1, h.value.length == o.data.length && o.data.length && h.value.length && (x.value = !0);
    }, W = () => {
      if (h.value.length == 0) {
        fe({
          type: "warning",
          message: `${l("batchEmptySelectedCronLogTips")}`
        });
        return;
      }
      z.confirm(
        l("batchDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        if (d.value)
          return;
        d.value = !0, C.value = !0;
        const i = [];
        h.value.forEach((t) => {
          i.push(t.id);
        }), Y({
          ids: i
        }).then(() => {
          g(), x.value = !1, d.value = !1, C.value = !1;
        }).catch(() => {
          d.value = !1, C.value = !1;
        });
      });
    }, X = () => {
      z.confirm(
        l("clearAllTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        if (d.value)
          return;
        d.value = !0, T.value = !0;
        let i = V.query.id ?? "";
        me({
          schedule_id: i
        }).then(() => {
          g(), x.value = !1, d.value = !1, T.value = !1;
        }).catch(() => {
          d.value = !1, T.value = !1;
        });
      });
    };
    return (i, t) => {
      const Z = u("el-page-header"), B = u("el-card"), y = u("el-option"), U = u("el-select"), f = u("el-form-item"), ee = u("el-date-picker"), b = u("el-button"), j = u("el-form"), le = u("el-checkbox"), _ = u("el-table-column"), te = u("el-table"), ae = u("el-pagination"), ne = u("el-dialog"), A = ie("loading");
      return k(), M("div", ve, [
        e(B, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            e(Z, {
              icon: n(pe),
              onBack: t[0] || (t[0] = (s) => I())
            }, {
              content: a(() => [
                c("span", he, r(n(H)), 1)
              ]),
              _: 1
            }, 8, ["icon"])
          ]),
          _: 1
        }),
        e(B, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            e(B, {
              class: "box-card !border-none mb-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: a(() => [
                c("div", be, [
                  e(j, {
                    inline: !0,
                    model: o.searchParam,
                    ref_key: "searchFormRef",
                    ref: E
                  }, {
                    default: a(() => [
                      e(f, {
                        label: n(l)("name"),
                        prop: "key"
                      }, {
                        default: a(() => [
                          e(U, {
                            modelValue: o.searchParam.key,
                            "onUpdate:modelValue": t[1] || (t[1] = (s) => o.searchParam.key = s),
                            placeholder: "全部",
                            filterable: "",
                            remote: "",
                            clearable: ""
                          }, {
                            default: a(() => [
                              e(y, {
                                label: "全部",
                                value: "all"
                              }),
                              (k(!0), M(re, null, ue(R.value, (s) => (k(), P(y, {
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
                      e(f, {
                        label: n(l)("status"),
                        prop: "status"
                      }, {
                        default: a(() => [
                          e(U, {
                            modelValue: o.searchParam.status,
                            "onUpdate:modelValue": t[2] || (t[2] = (s) => o.searchParam.status = s),
                            placeholder: "全部",
                            filterable: "",
                            remote: "",
                            clearable: ""
                          }, {
                            default: a(() => [
                              e(y, {
                                label: "全部",
                                value: "all"
                              }),
                              e(y, {
                                label: "成功",
                                value: "success"
                              }),
                              e(y, {
                                label: "失败",
                                value: "error"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      e(f, {
                        label: n(l)("executeTime"),
                        prop: "execute_time"
                      }, {
                        default: a(() => [
                          e(ee, {
                            modelValue: o.searchParam.execute_time,
                            "onUpdate:modelValue": t[3] || (t[3] = (s) => o.searchParam.execute_time = s),
                            type: "datetimerange",
                            "value-format": "YYYY-MM-DD HH:mm:ss",
                            "start-placeholder": n(l)("startDate"),
                            "end-placeholder": n(l)("endDate")
                          }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      e(f, null, {
                        default: a(() => [
                          e(b, {
                            type: "primary",
                            onClick: t[4] || (t[4] = (s) => g())
                          }, {
                            default: a(() => [
                              v(r(n(l)("search")), 1)
                            ]),
                            _: 1
                          }),
                          e(b, {
                            onClick: t[5] || (t[5] = (s) => O(E.value))
                          }, {
                            default: a(() => [
                              v(r(n(l)("reset")), 1)
                            ]),
                            _: 1
                          }),
                          e(b, {
                            onClick: X,
                            loading: T.value
                          }, {
                            default: a(() => [
                              v(r(n(l)("clearAll")), 1)
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
            c("div", xe, [
              c("div", ye, [
                e(le, {
                  modelValue: x.value,
                  "onUpdate:modelValue": t[6] || (t[6] = (s) => x.value = s),
                  size: "large",
                  class: "px-[14px]",
                  onChange: K,
                  indeterminate: L.value
                }, null, 8, ["modelValue", "indeterminate"]),
                e(b, {
                  onClick: W,
                  size: "small",
                  loading: C.value
                }, {
                  default: a(() => [
                    v(r(n(l)("batchDelete")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ]),
              N((k(), P(te, {
                data: o.data,
                size: "large",
                ref_key: "cronLogListTableRef",
                ref: $,
                onSelectionChange: Q
              }, {
                empty: a(() => [
                  c("span", null, r(o.loading ? "" : n(l)("emptyData")), 1)
                ]),
                default: a(() => [
                  e(_, {
                    type: "selection",
                    width: "55"
                  }),
                  e(_, {
                    prop: "id",
                    label: n(l)("id"),
                    "min-width": "80"
                  }, null, 8, ["label"]),
                  e(_, {
                    prop: "name",
                    label: n(l)("name"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  e(_, {
                    prop: "key",
                    label: n(l)("key"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  e(_, {
                    prop: "class",
                    label: n(l)("class"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  e(_, {
                    label: n(l)("executeResult"),
                    "min-width": "150"
                  }, {
                    default: a(({ row: s }) => [
                      v(r(s.execute_result), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(_, {
                    prop: "status_name",
                    label: n(l)("status"),
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  e(_, {
                    prop: "execute_time",
                    label: n(l)("executeTime"),
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  e(_, {
                    label: n(l)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: a(({ row: s }) => [
                      e(b, {
                        type: "primary",
                        link: "",
                        onClick: (oe) => G(s)
                      }, {
                        default: a(() => [
                          v(r(n(l)("info")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      e(b, {
                        type: "primary",
                        link: "",
                        onClick: (oe) => J(s)
                      }, {
                        default: a(() => [
                          v(r(n(l)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [A, o.loading]
              ]),
              c("div", ke, [
                e(ae, {
                  "current-page": o.page,
                  "onUpdate:currentPage": t[7] || (t[7] = (s) => o.page = s),
                  "page-size": o.limit,
                  "onUpdate:pageSize": t[8] || (t[8] = (s) => o.limit = s),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: o.total,
                  onSizeChange: t[9] || (t[9] = (s) => g()),
                  onCurrentChange: g
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        e(ne, {
          modelValue: w.value,
          "onUpdate:modelValue": t[11] || (t[11] = (s) => w.value = s),
          title: n(l)("cronInfo"),
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: a(() => [
            c("span", Be, [
              e(b, {
                type: "primary",
                onClick: t[10] || (t[10] = (s) => w.value = !1)
              }, {
                default: a(() => [
                  v(r(n(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            N((k(), P(j, {
              model: p,
              "label-width": "110px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: a(() => [
                e(f, {
                  label: n(l)("name")
                }, {
                  default: a(() => [
                    c("div", we, r(p.name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(f, {
                  label: n(l)("key")
                }, {
                  default: a(() => [
                    c("div", Ce, r(p.key), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(f, {
                  label: n(l)("class")
                }, {
                  default: a(() => [
                    c("div", Te, r(p.class), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(f, {
                  label: n(l)("executeResult")
                }, {
                  default: a(() => [
                    c("div", Le, r(p.execute_result), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(f, {
                  label: n(l)("status")
                }, {
                  default: a(() => [
                    c("div", Ve, r(p.status_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(f, {
                  label: n(l)("executeTime")
                }, {
                  default: a(() => [
                    c("div", De, r(p.execute_time), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model"])), [
              [A, D.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  Me as default
};
