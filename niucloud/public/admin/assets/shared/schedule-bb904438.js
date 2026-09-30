import { defineComponent as de, reactive as A, ref as h, computed as j, resolveComponent as _, resolveDirective as me, openBlock as p, createElementBlock as V, normalizeStyle as pe, unref as i, createElementVNode as b, createVNode as o, withCtx as r, toDisplayString as c, Fragment as x, renderList as D, createBlock as y, createTextVNode as g, withDirectives as G, createCommentVNode as P } from "vue";
import { t as l, h5 as ce, h6 as fe, h7 as _e, h8 as ye, h9 as ge, ha as be, hb as ve, hc as he, hd as ke } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as R } from "element-plus";
import we from "./index-c14157f3.js";
import Ve from "./index-559a9b12.js";
import Ce from "./index-997caa57.js";
import Te from "./index-e3370990.js";
import { useRoute as xe } from "vue-router";
import De from "./schedule_log-1bee9024.js";
import { u as Le } from "./useTablePageHeight-33d60cf6.js";
import Pe from "./cron-info-db93bca5.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ue = { class: "table-fill-page__card" }, Be = { class: "flex justify-between" }, Ee = { class: "table-panel table-fill-page__panel" }, Re = { class: "table-fill-page__table" }, Fe = { class: "flex" }, $e = { class: "input-width flex items-center text-sm" }, ze = { class: "dialog-footer" }, at = /* @__PURE__ */ de({
  __name: "schedule",
  setup(Me) {
    const H = xe().meta.title, { pageRef: I, pageStyle: W } = Le(), J = (a) => [
      { label: l("edit"), onClick: () => te(a) },
      { label: l("cronLog"), onClick: () => ne(a.id) },
      { label: l("doOne"), onClick: () => ae(a) },
      { label: l("delete"), type: "danger", onClick: () => le(a.id) }
    ], s = A({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        type: "",
        status: "all"
      }
    }), U = h([]), K = j(() => {
      const a = [], e = {};
      return U.value.forEach((d) => {
        const u = d.addon || "";
        e[u] === void 0 && (e[u] = a.length, a.push({
          addon: u,
          label: d.addon_name || u,
          list: []
        })), a[e[u]].list.push(d);
      }), a;
    }), F = h([]), $ = h([]), z = h(), Q = (a) => {
      a && (a.resetFields(), k());
    };
    (async () => {
      U.value = await (await ce()).data, F.value = await (await fe()).data, $.value = await (await _e()).data;
    })();
    const k = (a = 1) => {
      s.loading = !0, s.page = a, ye({
        page: s.page,
        limit: s.limit,
        ...s.searchParam
      }).then((e) => {
        s.loading = !1, s.data = e.data.data, s.total = e.data.total;
      }).catch(() => {
        s.loading = !1;
      });
    };
    k();
    const C = h(!1), n = A({ ...{
      id: 0,
      key: "",
      status: 2,
      time: {
        type: "min",
        week: "",
        day: "",
        hour: "",
        min: ""
      }
    } }), M = h(), X = () => {
      n.id = 0, n.key = "", n.status = 2, n.time.type = "min", n.time.week = "", n.time.day = "", n.time.hour = "", n.time.min = "", C.value = !0;
    }, Y = j(() => ({
      key: [
        { required: !0, message: l("titlePlaceholder"), trigger: "blur" }
      ],
      timeDate: [
        { required: !0, validator: Z, trigger: "blur" }
      ]
    })), Z = (a, e, d) => {
      const u = n.time, m = (w) => /^[1-9]\d*$/.test(w), f = () => d(new Error(l("cronTimeTips")));
      switch (u.type) {
        case "min":
          return m(u.min) ? d() : f();
        case "hour":
          return m(u.hour) && m(u.min) ? d() : f();
        case "day":
          return m(u.day) && m(u.hour) && m(u.min) ? d() : f();
        case "week":
          return u.week !== "" && m(u.hour) && m(u.min) ? d() : f();
        case "month":
          return m(u.day) && m(u.hour) && m(u.min) ? d() : f();
        default:
          return f();
      }
    }, L = h(!1), ee = async (a) => {
      L.value || !a || await a.validate(async (e) => {
        if (e) {
          L.value = !0;
          const d = n;
          (n.id > 0 ? ge : be)(d).then((m) => {
            L.value = !1, C.value = !1, k();
          }).catch(() => {
            L.value = !1;
          });
        }
      });
    }, te = (a) => {
      n.id = a.id, n.key = a.key, n.status = a.status, n.time = a.time, C.value = !0;
    }, le = (a) => {
      R.confirm(
        l("cronDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        ve(a).then(() => {
          k();
        }).catch(() => {
        });
      });
    }, ae = (a) => {
      R.confirm(
        l(`确认要立即执行一次"${a.name}"任务吗？`),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        he({ id: a.id }).then((e) => {
        }).catch(() => {
        });
      });
    }, oe = (a) => {
      R.confirm(
        l("确认要重置计划任务吗？"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        ke().then((e) => {
          ElMessage.success(e.msg);
        }).catch(() => {
        });
      });
    }, B = h(null), qe = (a) => {
      B.value.setFormData(a), B.value.showDialog = !0;
    }, N = h(null), ne = (a) => {
      var e;
      (e = N.value) == null || e.open(a);
    };
    return (a, e) => {
      const d = _("el-option"), u = _("el-option-group"), m = _("el-select"), f = _("el-form-item"), w = _("el-button"), O = _("el-form"), re = _("el-card"), T = _("el-table-column"), ie = _("el-table"), E = _("el-input"), S = _("el-radio"), se = _("el-radio-group"), ue = _("el-dialog"), q = me("loading");
      return p(), V("div", {
        ref_key: "pageRef",
        ref: I,
        class: "main-container table-fill-page",
        style: pe(i(W))
      }, [
        b("div", Ue, [
          o(Te, { closable: "" }, {
            default: r(() => [
              b("p", null, c(i(l)("cronTipsOne")), 1),
              b("p", null, c(i(l)("cronTipsTwo")), 1)
            ]),
            _: 1
          }),
          o(re, {
            class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
            shadow: "never"
          }, {
            default: r(() => [
              b("div", Be, [
                o(O, {
                  inline: !0,
                  model: s.searchParam,
                  ref_key: "searchFormRef",
                  ref: z
                }, {
                  default: r(() => [
                    o(f, {
                      label: i(l)("title"),
                      prop: "key"
                    }, {
                      default: r(() => [
                        o(m, {
                          modelValue: s.searchParam.key,
                          "onUpdate:modelValue": e[0] || (e[0] = (t) => s.searchParam.key = t),
                          placeholder: "全部",
                          filterable: "",
                          clearable: "",
                          "popper-class": "schedule-name-select"
                        }, {
                          default: r(() => [
                            (p(!0), V(x, null, D(i(K), (t) => (p(), y(u, {
                              key: t.addon,
                              label: t.label
                            }, {
                              default: r(() => [
                                (p(!0), V(x, null, D(t.list, (v) => (p(), y(d, {
                                  key: v.key,
                                  label: v.name,
                                  value: v.key
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["label"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(f, {
                      label: i(l)("status"),
                      prop: "status"
                    }, {
                      default: r(() => [
                        o(m, {
                          modelValue: s.searchParam.status,
                          "onUpdate:modelValue": e[1] || (e[1] = (t) => s.searchParam.status = t),
                          placeholder: "全部",
                          clearable: ""
                        }, {
                          default: r(() => [
                            o(d, {
                              label: "全部",
                              value: "all"
                            }),
                            o(d, {
                              label: "启用",
                              value: "1"
                            }),
                            o(d, {
                              label: "关闭",
                              value: "0"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(f, null, {
                      default: r(() => [
                        o(w, {
                          type: "primary",
                          onClick: e[2] || (e[2] = (t) => k())
                        }, {
                          default: r(() => [
                            g(c(i(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        o(w, {
                          onClick: e[3] || (e[3] = (t) => Q(z.value))
                        }, {
                          default: r(() => [
                            g(c(i(l)("reset")), 1)
                          ]),
                          _: 1
                        })
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
          b("div", Ee, [
            o(Ce, {
              title: i(H),
              selectable: !1
            }, {
              actions: r(() => [
                o(w, {
                  type: "primary",
                  onClick: X
                }, {
                  default: r(() => [
                    g(c(i(l)("addCron")), 1)
                  ]),
                  _: 1
                }),
                o(w, {
                  type: "primary",
                  onClick: oe
                }, {
                  default: r(() => [
                    g(c(i(l)("重置计划任务")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            b("div", Re, [
              G((p(), y(ie, {
                height: "100%",
                data: s.data,
                size: "large"
              }, {
                empty: r(() => [
                  b("span", null, c(s.loading ? "" : i(l)("emptyData")), 1)
                ]),
                default: r(() => [
                  o(T, {
                    prop: "name",
                    label: i(l)("title"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  o(T, {
                    prop: "key",
                    label: i(l)("key"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  o(T, {
                    label: i(l)("crondType"),
                    "min-width": "150"
                  }, {
                    default: r(({ row: t }) => [
                      g(c(t.crontab_content), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(T, {
                    prop: "status_name",
                    label: i(l)("openStatus"),
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  o(T, {
                    label: i(l)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "200"
                  }, {
                    default: r(({ row: t }) => [
                      o(we, {
                        actions: J(t)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [q, s.loading]
              ])
            ]),
            o(Ve, {
              "current-page": s.page,
              "onUpdate:current-page": e[4] || (e[4] = (t) => s.page = t),
              "page-size": s.limit,
              "onUpdate:page-size": e[5] || (e[5] = (t) => s.limit = t),
              total: s.total,
              onSizeChange: e[6] || (e[6] = (t) => k()),
              onCurrentChange: k
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ]),
        o(Pe, {
          ref_key: "cronDialog",
          ref: B,
          onComplete: k
        }, null, 512),
        o(De, {
          ref_key: "scheduleLogRef",
          ref: N
        }, null, 512),
        o(ue, {
          modelValue: C.value,
          "onUpdate:modelValue": e[15] || (e[15] = (t) => C.value = t),
          title: i(l)("editCron"),
          width: "750px",
          "destroy-on-close": !0
        }, {
          footer: r(() => [
            b("span", ze, [
              o(w, {
                type: "primary",
                onClick: e[14] || (e[14] = (t) => ee(M.value))
              }, {
                default: r(() => [
                  g(c(i(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            G((p(), y(O, {
              model: n,
              "label-width": "110px",
              ref_key: "formRef",
              ref: M,
              rules: i(Y),
              class: "page-form"
            }, {
              default: r(() => [
                o(f, {
                  label: i(l)("cronTemplate"),
                  class: "items-center",
                  prop: "key"
                }, {
                  default: r(() => [
                    o(m, {
                      modelValue: n.key,
                      "onUpdate:modelValue": e[7] || (e[7] = (t) => n.key = t)
                    }, {
                      default: r(() => [
                        (p(!0), V(x, null, D(U.value, (t) => (p(), y(d, {
                          key: t.key,
                          label: t.name,
                          value: t.key
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(f, {
                  label: i(l)("cronTime"),
                  prop: "timeDate"
                }, {
                  default: r(() => [
                    o(m, {
                      modelValue: n.time.type,
                      "onUpdate:modelValue": e[8] || (e[8] = (t) => n.time.type = t),
                      class: "w-[150px]"
                    }, {
                      default: r(() => [
                        (p(!0), V(x, null, D(F.value, (t, v) => (p(), y(d, {
                          key: v,
                          label: t,
                          value: v
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    b("div", Fe, [
                      n.time.type == "week" ? (p(), y(m, {
                        key: 0,
                        modelValue: n.time.week,
                        "onUpdate:modelValue": e[9] || (e[9] = (t) => n.time.week = t),
                        class: "ml-2 w-[120px]"
                      }, {
                        default: r(() => [
                          (p(!0), V(x, null, D($.value, (t, v) => (p(), y(d, {
                            key: v,
                            label: t,
                            value: v
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0),
                      ["month", "day"].indexOf(n.time.type) != -1 ? (p(), y(E, {
                        key: 1,
                        modelValue: n.time.day,
                        "onUpdate:modelValue": e[10] || (e[10] = (t) => n.time.day = t),
                        modelModifiers: { trim: !0 },
                        class: "ml-2 w-[120px]"
                      }, {
                        append: r(() => [
                          g(c(i(l)("day")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0),
                      ["month", "day", "hour", "week"].indexOf(n.time.type) != -1 ? (p(), y(E, {
                        key: 2,
                        modelValue: n.time.hour,
                        "onUpdate:modelValue": e[11] || (e[11] = (t) => n.time.hour = t),
                        modelModifiers: { trim: !0 },
                        class: "ml-2 w-[120px]"
                      }, {
                        append: r(() => [
                          g(c(i(l)("hour")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0),
                      ["month", "day", "hour", "week", "min"].indexOf(n.time.type) != -1 ? (p(), y(E, {
                        key: 3,
                        modelValue: n.time.min,
                        "onUpdate:modelValue": e[12] || (e[12] = (t) => n.time.min = t),
                        modelModifiers: { trim: !0 },
                        class: "ml-2 w-[120px]"
                      }, {
                        append: r(() => [
                          g(c(i(l)("min")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(f, {
                  label: i(l)("isopen")
                }, {
                  default: r(() => [
                    b("div", $e, [
                      o(se, {
                        modelValue: n.status,
                        "onUpdate:modelValue": e[13] || (e[13] = (t) => n.status = t)
                      }, {
                        default: r(() => [
                          o(S, { label: 1 }, {
                            default: r(() => [
                              g(c(i(l)("yes")), 1)
                            ]),
                            _: 1
                          }),
                          o(S, { label: 2 }, {
                            default: r(() => [
                              g(c(i(l)("no")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [q, a.loading]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 4);
    };
  }
});
export {
  at as default
};
