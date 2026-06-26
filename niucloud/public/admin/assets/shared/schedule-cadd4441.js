import { defineComponent as de, reactive as S, ref as h, computed as ue, resolveComponent as m, resolveDirective as me, openBlock as f, createElementBlock as C, createVNode as a, withCtx as o, createElementVNode as _, toDisplayString as u, unref as r, createTextVNode as y, Fragment as D, renderList as U, createBlock as v, withDirectives as I, createCommentVNode as P } from "vue";
import { t, gp as pe, gq as ce, gr as _e, gs as fe, gt as ye, gu as ge, gv as ve, gw as we, gx as ke } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as L } from "element-plus";
import { useRoute as be, useRouter as he } from "vue-router";
import { _ as xe } from "./cron-info.vue_vue_type_script_setup_true_lang-12290ad9.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ve = { class: "main-container" }, Ce = { class: "flex justify-between items-center mb-[20px]" }, Te = { class: "text-page-title" }, De = { class: "flex items-center" }, Ue = { class: "mt-2" }, Pe = { class: "flex justify-between" }, $e = { class: "mt-[20px]" }, Be = { class: "flex items-center" }, Le = { class: "el-dropdown-link text-primary" }, Ee = { class: "mt-[16px] flex justify-end" }, Fe = { class: "flex" }, Re = { class: "input-width flex items-center text-sm" }, ze = { class: "dialog-footer" }, Qe = /* @__PURE__ */ de({
  __name: "schedule",
  setup(Me) {
    const W = be().meta.title, i = S({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        type: "",
        status: "all"
      }
    }), $ = h([]), E = h([]), F = h([]), R = h(), A = (s) => {
      s && (s.resetFields(), k());
    };
    (async () => {
      $.value = await (await pe()).data, E.value = await (await ce()).data, F.value = await (await _e()).data;
    })();
    const k = (s = 1) => {
      i.loading = !0, i.page = s, fe({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((l) => {
        i.loading = !1, i.data = l.data.data, i.total = l.data.total;
      }).catch(() => {
        i.loading = !1;
      });
    };
    k();
    const G = he(), x = h(!1), n = S({ ...{
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
    } }), z = h(), H = () => {
      n.id = 0, n.key = "", n.status = 2, n.time.type = "min", n.time.week = "", n.time.day = "", n.time.hour = "", n.time.min = "", x.value = !0;
    }, J = ue(() => ({
      key: [
        { required: !0, message: t("titlePlaceholder"), trigger: "blur" }
      ],
      timeDate: [
        { required: !0, validator: K, trigger: "blur" }
      ]
    })), K = (s, l, p) => {
      const c = n.time, d = (b) => /^[1-9]\d*$/.test(b), g = () => p(new Error(t("cronTimeTips")));
      switch (c.type) {
        case "min":
          return d(c.min) ? p() : g();
        case "hour":
          return d(c.hour) && d(c.min) ? p() : g();
        case "day":
          return d(c.day) && d(c.hour) && d(c.min) ? p() : g();
        case "week":
          return c.week !== "" && d(c.hour) && d(c.min) ? p() : g();
        case "month":
          return d(c.day) && d(c.hour) && d(c.min) ? p() : g();
        default:
          return g();
      }
    }, T = h(!1), Q = async (s) => {
      T.value || !s || await s.validate(async (l) => {
        if (l) {
          T.value = !0;
          const p = n;
          (n.id > 0 ? ye : ge)(p).then((d) => {
            T.value = !1, x.value = !1, k();
          }).catch(() => {
            T.value = !1;
          });
        }
      });
    }, X = (s) => {
      n.id = s.id, n.key = s.key, n.status = s.status, n.time = s.time, x.value = !0;
    }, Y = (s) => {
      L.confirm(
        t("cronDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        ve(s).then(() => {
          k();
        }).catch(() => {
        });
      });
    }, Z = (s) => {
      L.confirm(
        t(`确认要立即执行一次"${s.name}"任务吗？`),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        we({ id: s.id }).then((l) => {
        }).catch(() => {
        });
      });
    }, ee = (s) => {
      L.confirm(
        t("确认要重置计划任务吗？"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        ke().then((l) => {
          ElMessage.success(l.msg);
        }).catch(() => {
        });
      });
    }, te = h(null), le = (s) => {
      G.push({ path: "/tools/schedule_log", query: { id: s } });
    };
    return (s, l) => {
      const p = m("el-button"), c = m("el-alert"), d = m("el-option"), g = m("el-select"), b = m("el-form-item"), M = m("el-form"), N = m("el-card"), V = m("el-table-column"), O = m("el-dropdown-item"), ae = m("el-dropdown-menu"), oe = m("el-dropdown"), ne = m("el-table"), re = m("el-pagination"), B = m("el-input"), j = m("el-radio"), se = m("el-radio-group"), ie = m("el-dialog"), q = me("loading");
      return f(), C("div", Ve, [
        a(N, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            _("div", Ce, [
              _("span", Te, u(r(W)), 1),
              _("div", null, [
                a(p, {
                  type: "primary",
                  onClick: H
                }, {
                  default: o(() => [
                    y(u(r(t)("addCron")), 1)
                  ]),
                  _: 1
                }),
                a(p, {
                  type: "primary",
                  onClick: ee
                }, {
                  default: o(() => [
                    y(u(r(t)("重置计划任务")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            a(c, { type: "info" }, {
              default: o(() => [
                _("div", De, [
                  _("div", null, [
                    _("p", null, u(r(t)("cronTipsOne")), 1),
                    _("p", Ue, u(r(t)("cronTipsTwo")), 1)
                  ])
                ])
              ]),
              _: 1
            }),
            a(N, {
              class: "box-card !border-none mb-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                _("div", Pe, [
                  a(M, {
                    inline: !0,
                    model: i.searchParam,
                    ref_key: "searchFormRef",
                    ref: R
                  }, {
                    default: o(() => [
                      a(b, {
                        label: r(t)("title"),
                        prop: "key"
                      }, {
                        default: o(() => [
                          a(g, {
                            modelValue: i.searchParam.key,
                            "onUpdate:modelValue": l[0] || (l[0] = (e) => i.searchParam.key = e),
                            placeholder: "全部",
                            filterable: "",
                            remote: "",
                            clearable: ""
                          }, {
                            default: o(() => [
                              a(d, {
                                label: "全部",
                                value: "all"
                              }),
                              (f(!0), C(D, null, U($.value, (e) => (f(), v(d, {
                                key: e.key,
                                label: e.name,
                                value: e.key
                              }, null, 8, ["label", "value"]))), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      a(b, {
                        label: r(t)("status"),
                        prop: "status"
                      }, {
                        default: o(() => [
                          a(g, {
                            modelValue: i.searchParam.status,
                            "onUpdate:modelValue": l[1] || (l[1] = (e) => i.searchParam.status = e),
                            placeholder: "全部",
                            clearable: ""
                          }, {
                            default: o(() => [
                              a(d, {
                                label: "全部",
                                value: "all"
                              }),
                              a(d, {
                                label: "启用",
                                value: "1"
                              }),
                              a(d, {
                                label: "关闭",
                                value: "0"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      a(b, null, {
                        default: o(() => [
                          a(p, {
                            type: "primary",
                            onClick: l[2] || (l[2] = (e) => k())
                          }, {
                            default: o(() => [
                              y(u(r(t)("search")), 1)
                            ]),
                            _: 1
                          }),
                          a(p, {
                            onClick: l[3] || (l[3] = (e) => A(R.value))
                          }, {
                            default: o(() => [
                              y(u(r(t)("reset")), 1)
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
            _("div", $e, [
              I((f(), v(ne, {
                data: i.data,
                size: "large"
              }, {
                empty: o(() => [
                  _("span", null, u(i.loading ? "" : r(t)("emptyData")), 1)
                ]),
                default: o(() => [
                  a(V, {
                    prop: "key",
                    label: r(t)("key"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  a(V, {
                    prop: "name",
                    label: r(t)("title"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  a(V, {
                    label: r(t)("crondType"),
                    "min-width": "150"
                  }, {
                    default: o(({ row: e }) => [
                      y(u(e.crontab_content), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(V, {
                    prop: "status_name",
                    label: r(t)("openStatus"),
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  a(V, {
                    label: r(t)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "180"
                  }, {
                    default: o(({ row: e }) => [
                      _("div", Be, [
                        a(p, {
                          type: "primary",
                          link: "",
                          onClick: (w) => X(e)
                        }, {
                          default: o(() => [
                            y(u(r(t)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        a(p, {
                          type: "primary",
                          link: "",
                          onClick: (w) => Y(e.id)
                        }, {
                          default: o(() => [
                            y(u(r(t)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        a(oe, { class: "ml-[12px]" }, {
                          dropdown: o(() => [
                            a(ae, null, {
                              default: o(() => [
                                a(O, {
                                  onClick: (w) => Z(e)
                                }, {
                                  default: o(() => [
                                    y(u(r(t)("doOne")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                a(O, {
                                  onClick: (w) => le(e.id)
                                }, {
                                  default: o(() => [
                                    y(u(r(t)("cronLog")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          default: o(() => [
                            _("span", Le, u(r(t)("more")), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [q, i.loading]
              ]),
              _("div", Ee, [
                a(re, {
                  "current-page": i.page,
                  "onUpdate:currentPage": l[4] || (l[4] = (e) => i.page = e),
                  "page-size": i.limit,
                  "onUpdate:pageSize": l[5] || (l[5] = (e) => i.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: i.total,
                  onSizeChange: l[6] || (l[6] = (e) => k()),
                  onCurrentChange: k
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        a(xe, {
          ref_key: "cronDialog",
          ref: te,
          onComplete: k
        }, null, 512),
        a(ie, {
          modelValue: x.value,
          "onUpdate:modelValue": l[15] || (l[15] = (e) => x.value = e),
          title: r(t)("editCron"),
          width: "750px",
          "destroy-on-close": !0
        }, {
          footer: o(() => [
            _("span", ze, [
              a(p, {
                type: "primary",
                onClick: l[14] || (l[14] = (e) => Q(z.value))
              }, {
                default: o(() => [
                  y(u(r(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            I((f(), v(M, {
              model: n,
              "label-width": "110px",
              ref_key: "formRef",
              ref: z,
              rules: J.value,
              class: "page-form"
            }, {
              default: o(() => [
                a(b, {
                  label: r(t)("cronTemplate"),
                  class: "items-center",
                  prop: "key"
                }, {
                  default: o(() => [
                    a(g, {
                      modelValue: n.key,
                      "onUpdate:modelValue": l[7] || (l[7] = (e) => n.key = e)
                    }, {
                      default: o(() => [
                        (f(!0), C(D, null, U($.value, (e) => (f(), v(d, {
                          key: e.key,
                          label: e.name,
                          value: e.key
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: r(t)("cronTime"),
                  prop: "timeDate"
                }, {
                  default: o(() => [
                    a(g, {
                      modelValue: n.time.type,
                      "onUpdate:modelValue": l[8] || (l[8] = (e) => n.time.type = e),
                      class: "w-[150px]"
                    }, {
                      default: o(() => [
                        (f(!0), C(D, null, U(E.value, (e, w) => (f(), v(d, {
                          key: w,
                          label: e,
                          value: w
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    _("div", Fe, [
                      n.time.type == "week" ? (f(), v(g, {
                        key: 0,
                        modelValue: n.time.week,
                        "onUpdate:modelValue": l[9] || (l[9] = (e) => n.time.week = e),
                        class: "ml-2 w-[120px]"
                      }, {
                        default: o(() => [
                          (f(!0), C(D, null, U(F.value, (e, w) => (f(), v(d, {
                            key: w,
                            label: e,
                            value: w
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0),
                      ["month", "day"].indexOf(n.time.type) != -1 ? (f(), v(B, {
                        key: 1,
                        modelValue: n.time.day,
                        "onUpdate:modelValue": l[10] || (l[10] = (e) => n.time.day = e),
                        modelModifiers: { trim: !0 },
                        class: "ml-2 w-[120px]"
                      }, {
                        append: o(() => [
                          y(u(r(t)("day")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0),
                      ["month", "day", "hour", "week"].indexOf(n.time.type) != -1 ? (f(), v(B, {
                        key: 2,
                        modelValue: n.time.hour,
                        "onUpdate:modelValue": l[11] || (l[11] = (e) => n.time.hour = e),
                        modelModifiers: { trim: !0 },
                        class: "ml-2 w-[120px]"
                      }, {
                        append: o(() => [
                          y(u(r(t)("hour")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0),
                      ["month", "day", "hour", "week", "min"].indexOf(n.time.type) != -1 ? (f(), v(B, {
                        key: 3,
                        modelValue: n.time.min,
                        "onUpdate:modelValue": l[12] || (l[12] = (e) => n.time.min = e),
                        modelModifiers: { trim: !0 },
                        class: "ml-2 w-[120px]"
                      }, {
                        append: o(() => [
                          y(u(r(t)("min")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : P("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: r(t)("isopen")
                }, {
                  default: o(() => [
                    _("div", Re, [
                      a(se, {
                        modelValue: n.status,
                        "onUpdate:modelValue": l[13] || (l[13] = (e) => n.status = e)
                      }, {
                        default: o(() => [
                          a(j, { label: 1 }, {
                            default: o(() => [
                              y(u(r(t)("yes")), 1)
                            ]),
                            _: 1
                          }),
                          a(j, { label: 2 }, {
                            default: o(() => [
                              y(u(r(t)("no")), 1)
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
              [q, s.loading]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  Qe as default
};
