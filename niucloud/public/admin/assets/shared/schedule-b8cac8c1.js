import { defineComponent as de, reactive as A, ref as h, computed as ue, resolveComponent as m, resolveDirective as me, openBlock as f, createElementBlock as V, createVNode as a, withCtx as o, createElementVNode as _, toDisplayString as u, unref as r, createTextVNode as y, Fragment as D, renderList as U, createBlock as g, withDirectives as I, createCommentVNode as B } from "vue";
import { t, gv as pe, gw as ce, gx as _e, gy as fe, gz as ye, gA as ve, gB as ge, gC as we, gD as ke } from "./core-shared-9b1e55e9.js";
import { ElMessageBox as F } from "element-plus";
import { useRoute as be, useRouter as he } from "vue-router";
import xe from "./cron-info-bba06145.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ce = { class: "main-container" }, Ve = { class: "flex justify-between items-center mb-[20px]" }, Te = { class: "text-page-title" }, De = { class: "flex items-center" }, Ue = { class: "mt-2" }, Be = { class: "flex justify-between" }, Pe = { class: "mt-[20px]" }, $e = { class: "flex items-center" }, Ee = { class: "el-dropdown-link text-primary" }, Fe = { class: "mt-[16px] flex justify-end" }, Le = { class: "flex" }, ze = { class: "input-width flex items-center text-sm" }, Re = { class: "dialog-footer" }, Xe = /* @__PURE__ */ de({
  __name: "schedule",
  setup(Me) {
    const W = be().meta.title, i = A({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        type: "",
        status: "all"
      }
    }), P = h([]), L = h([]), z = h([]), R = h(), G = (s) => {
      s && (s.resetFields(), k());
    };
    (async () => {
      P.value = await (await pe()).data, L.value = await (await ce()).data, z.value = await (await _e()).data;
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
    const H = he(), x = h(!1), n = A({ ...{
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
    } }), M = h(), J = () => {
      n.id = 0, n.key = "", n.status = 2, n.time.type = "min", n.time.week = "", n.time.day = "", n.time.hour = "", n.time.min = "", x.value = !0;
    }, K = ue(() => ({
      key: [
        { required: !0, message: t("titlePlaceholder"), trigger: "blur" }
      ],
      timeDate: [
        { required: !0, validator: Q, trigger: "blur" }
      ]
    })), Q = (s, l, p) => {
      const c = n.time, d = (b) => /^[1-9]\d*$/.test(b), v = () => p(new Error(t("cronTimeTips")));
      switch (c.type) {
        case "min":
          return d(c.min) ? p() : v();
        case "hour":
          return d(c.hour) && d(c.min) ? p() : v();
        case "day":
          return d(c.day) && d(c.hour) && d(c.min) ? p() : v();
        case "week":
          return c.week !== "" && d(c.hour) && d(c.min) ? p() : v();
        case "month":
          return d(c.day) && d(c.hour) && d(c.min) ? p() : v();
        default:
          return v();
      }
    }, T = h(!1), X = async (s) => {
      T.value || !s || await s.validate(async (l) => {
        if (l) {
          T.value = !0;
          const p = n;
          (n.id > 0 ? ye : ve)(p).then((d) => {
            T.value = !1, x.value = !1, k();
          }).catch(() => {
            T.value = !1;
          });
        }
      });
    }, Y = (s) => {
      n.id = s.id, n.key = s.key, n.status = s.status, n.time = s.time, x.value = !0;
    }, Z = (s) => {
      F.confirm(
        t("cronDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        ge(s).then(() => {
          k();
        }).catch(() => {
        });
      });
    }, ee = (s) => {
      F.confirm(
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
    }, te = (s) => {
      F.confirm(
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
    }, $ = h(null), Se = (s) => {
      $.value.setFormData(s), $.value.showDialog = !0;
    }, le = (s) => {
      H.push({ path: "/tools/schedule_log", query: { id: s } });
    };
    return (s, l) => {
      const p = m("el-button"), c = m("el-alert"), d = m("el-option"), v = m("el-select"), b = m("el-form-item"), N = m("el-form"), O = m("el-card"), C = m("el-table-column"), j = m("el-dropdown-item"), ae = m("el-dropdown-menu"), oe = m("el-dropdown"), ne = m("el-table"), re = m("el-pagination"), E = m("el-input"), S = m("el-radio"), se = m("el-radio-group"), ie = m("el-dialog"), q = me("loading");
      return f(), V("div", Ce, [
        a(O, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            _("div", Ve, [
              _("span", Te, u(r(W)), 1),
              _("div", null, [
                a(p, {
                  type: "primary",
                  onClick: J
                }, {
                  default: o(() => [
                    y(u(r(t)("addCron")), 1)
                  ]),
                  _: 1
                }),
                a(p, {
                  type: "primary",
                  onClick: te
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
            a(O, {
              class: "box-card !border-none mb-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                _("div", Be, [
                  a(N, {
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
                          a(v, {
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
                              (f(!0), V(D, null, U(P.value, (e) => (f(), g(d, {
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
                          a(v, {
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
                            onClick: l[3] || (l[3] = (e) => G(R.value))
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
            _("div", Pe, [
              I((f(), g(ne, {
                data: i.data,
                size: "large"
              }, {
                empty: o(() => [
                  _("span", null, u(i.loading ? "" : r(t)("emptyData")), 1)
                ]),
                default: o(() => [
                  a(C, {
                    prop: "key",
                    label: r(t)("key"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  a(C, {
                    prop: "name",
                    label: r(t)("title"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  a(C, {
                    label: r(t)("crondType"),
                    "min-width": "150"
                  }, {
                    default: o(({ row: e }) => [
                      y(u(e.crontab_content), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(C, {
                    prop: "status_name",
                    label: r(t)("openStatus"),
                    "min-width": "100"
                  }, null, 8, ["label"]),
                  a(C, {
                    label: r(t)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "180"
                  }, {
                    default: o(({ row: e }) => [
                      _("div", $e, [
                        a(p, {
                          type: "primary",
                          link: "",
                          onClick: (w) => Y(e)
                        }, {
                          default: o(() => [
                            y(u(r(t)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        a(p, {
                          type: "primary",
                          link: "",
                          onClick: (w) => Z(e.id)
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
                                a(j, {
                                  onClick: (w) => ee(e)
                                }, {
                                  default: o(() => [
                                    y(u(r(t)("doOne")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                a(j, {
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
                            _("span", Ee, u(r(t)("more")), 1)
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
              _("div", Fe, [
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
          ref: $,
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
            _("span", Re, [
              a(p, {
                type: "primary",
                onClick: l[14] || (l[14] = (e) => X(M.value))
              }, {
                default: o(() => [
                  y(u(r(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            I((f(), g(N, {
              model: n,
              "label-width": "110px",
              ref_key: "formRef",
              ref: M,
              rules: K.value,
              class: "page-form"
            }, {
              default: o(() => [
                a(b, {
                  label: r(t)("cronTemplate"),
                  class: "items-center",
                  prop: "key"
                }, {
                  default: o(() => [
                    a(v, {
                      modelValue: n.key,
                      "onUpdate:modelValue": l[7] || (l[7] = (e) => n.key = e)
                    }, {
                      default: o(() => [
                        (f(!0), V(D, null, U(P.value, (e) => (f(), g(d, {
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
                    a(v, {
                      modelValue: n.time.type,
                      "onUpdate:modelValue": l[8] || (l[8] = (e) => n.time.type = e),
                      class: "w-[150px]"
                    }, {
                      default: o(() => [
                        (f(!0), V(D, null, U(L.value, (e, w) => (f(), g(d, {
                          key: w,
                          label: e,
                          value: w
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    _("div", Le, [
                      n.time.type == "week" ? (f(), g(v, {
                        key: 0,
                        modelValue: n.time.week,
                        "onUpdate:modelValue": l[9] || (l[9] = (e) => n.time.week = e),
                        class: "ml-2 w-[120px]"
                      }, {
                        default: o(() => [
                          (f(!0), V(D, null, U(z.value, (e, w) => (f(), g(d, {
                            key: w,
                            label: e,
                            value: w
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])) : B("", !0),
                      ["month", "day"].indexOf(n.time.type) != -1 ? (f(), g(E, {
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
                      }, 8, ["modelValue"])) : B("", !0),
                      ["month", "day", "hour", "week"].indexOf(n.time.type) != -1 ? (f(), g(E, {
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
                      }, 8, ["modelValue"])) : B("", !0),
                      ["month", "day", "hour", "week", "min"].indexOf(n.time.type) != -1 ? (f(), g(E, {
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
                      }, 8, ["modelValue"])) : B("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: r(t)("isopen")
                }, {
                  default: o(() => [
                    _("div", ze, [
                      a(se, {
                        modelValue: n.status,
                        "onUpdate:modelValue": l[13] || (l[13] = (e) => n.status = e)
                      }, {
                        default: o(() => [
                          a(S, { label: 1 }, {
                            default: o(() => [
                              y(u(r(t)("yes")), 1)
                            ]),
                            _: 1
                          }),
                          a(S, { label: 2 }, {
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
  Xe as default
};
