import { defineComponent as me, reactive as _e, watch as K, ref as y, onMounted as fe, computed as O, resolveComponent as c, resolveDirective as ve, openBlock as m, createElementBlock as x, createElementVNode as p, createVNode as a, withCtx as t, unref as o, Fragment as w, renderList as R, createBlock as k, createTextVNode as v, toDisplayString as i, withDirectives as Q, createCommentVNode as E } from "vue";
import { t as n, eb as ce, ec as be, ed as ye, ee as ge, ef as ke, eg as he } from "./core-shared-ae4a556b.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const xe = { class: "flex justify-between items-start my-[10px]" }, Ve = {
  key: 0,
  class: "text-red-600"
}, Ce = { class: "mt-[16px] flex justify-end" }, je = { class: "dialog-footer" }, De = { class: "input-width" }, Pe = /* @__PURE__ */ p("div", { class: "ml-[100px] mb-[10px] mt-[-10px] text-[12px] text-[#999] leading-[20px]" }, [
  /* @__PURE__ */ p("div", null, "验证码：仅支持验证码类型变量"),
  /* @__PURE__ */ p("div", null, "行业通知：不支持验证码类型变量"),
  /* @__PURE__ */ p("div", null, "营销推广：不支持变量")
], -1), Te = { class: "flex flex-1 items-center" }, Ee = { class: "w-32 mr-1" }, Ue = { class: "dialog-footer" }, $e = {
  key: 0,
  class: "h-[500px] overflow-y-auto"
}, we = { class: "dialog-footer" }, Ie = /* @__PURE__ */ me({
  __name: "sms_template",
  props: {
    username: {
      type: String,
      default: ""
    },
    signature: {
      type: String,
      default: ""
    }
  },
  setup(X) {
    const j = X, r = _e({
      page: 1,
      limit: 10,
      total: 0,
      loading: !1,
      data: [],
      // 当前页展示的数据（通过 computed 生成）
      allData: [],
      // 原始完整数据
      searchParam: {
        template_id: "",
        name: "",
        status: ""
      }
    }), Y = () => {
      const { template_id: s, name: l, status: g } = r.searchParam;
      return r.allData.filter((_) => {
        const V = !s || String(_.template_id || "").includes(s), D = !l || String(_.name || "").includes(l), b = !g || _.audit_info.audit_status == g;
        return V && D && b;
      });
    };
    K(() => [r.limit, r.page], () => {
      A();
    });
    const P = () => {
      r.loading = !0, ce({ sms_type: "niuyun", username: j.username }).then((s) => {
        r.allData = s.data, r.page = 1, A();
      }).catch(() => {
        r.loading = !1;
      });
    }, z = y(null), Z = (s) => {
      s && (r.searchParam = {
        template_id: "",
        name: "",
        status: ""
      }, P());
    }, I = y([]), A = () => {
      const s = Y();
      r.total = s.length;
      const l = (r.page - 1) * r.limit, g = l + r.limit;
      I.value = s.slice(l, g), r.loading = !1;
    };
    fe(() => {
      j.username && P();
    });
    const U = y(!1), $ = y({}), ee = () => {
      be("niuyun", j.username).then((s) => {
        $.value = s.data.repeat_list, $.value && Object.keys($.value).length > 0 ? U.value = !0 : P();
      });
    }, te = O(() => Object.entries($.value).map(([s, l]) => ({
      name: s,
      platforms: l
    }))), u = y(null), M = y(!1), le = (s) => {
      M.value = !0, u.value = s;
    }, ae = (s) => {
      ElMessageBox.confirm(n("确定要清除报备信息吗"), n("提示"), {
        confirmButtonText: n("确定"),
        cancelButtonText: n("取消"),
        type: "warning"
      }).then(() => {
        ye(j.username, s.template_id).then(() => {
          P();
        });
      }).catch(() => {
      });
    }, B = y({}), J = y({}), W = y({}), T = y(!1), f = y({
      template_type: 1,
      template_key: "",
      params_json: {}
    });
    (() => {
      ge().then((s) => {
        B.value = s.data.template_params_type_list, J.value = s.data.template_type_list, W.value = s.data.template_status_list;
      });
    })();
    const ne = O(() => f.value.template_type === 1 ? B.value.filter((s) => s.type === "valid_code") : B.value), F = O(() => f.value.template_type === 3 && u.value.variable && Object.keys(u.value.variable).length > 0);
    K(F, (s) => {
      s && ElMessage.error("营销推广类型不支持变量");
    });
    const S = y(!1), oe = (s) => {
      S.value = !0, j.signature ? s.template_id ? (T.value = !0, u.value = s, ke("niuyun", j.username, { template_key: s.key }).then((g) => {
        var V;
        const _ = ((V = g.data) == null ? void 0 : V.param_json) ?? {};
        if (f.value.template_key = g.data.template_key, f.value.template_type = Number(g.data.template_type), f.value.params_json = {}, u.value.variable)
          for (const D in u.value.variable)
            f.value.params_json[D] = _[D] ?? "";
        S.value = !1;
      })) : (T.value = !0, S.value = !1, u.value = s, f.value.template_type = 1, f.value.template_key = u.value.key, f.value.params_json = {}) : ElMessage.error("请先配置签名");
    }, se = () => {
      if (!u.value.sms) {
        ElMessage.error("请先配置模版内容");
        return;
      }
      if (Object.entries(u.value.variable).some(
        ([l]) => !f.value.params_json[l]
      )) {
        ElMessage.error("请为每个变量选择类型");
        return;
      }
      u.value.template_id && (f.value.template_id = Number(u.value.template_id)), he(u.value.sms_type, j.username, f.value).then((l) => {
        T.value = !1, P();
      });
    };
    return (s, l) => {
      const g = c("el-input"), _ = c("el-form-item"), V = c("el-option"), D = c("el-select"), b = c("el-button"), N = c("el-form"), C = c("el-table-column"), q = c("el-table"), re = c("el-pagination"), L = c("el-dialog"), ie = c("el-radio"), ue = c("el-radio-group"), pe = c("el-alert"), de = c("el-tag"), G = ve("loading");
      return m(), x("div", null, [
        p("div", xe, [
          a(N, {
            inline: !0,
            model: r.searchParam,
            ref_key: "searchFormRef",
            ref: z
          }, {
            default: t(() => [
              a(_, {
                label: o(n)("模版ID"),
                prop: "template_id"
              }, {
                default: t(() => [
                  a(g, {
                    modelValue: r.searchParam.template_id,
                    "onUpdate:modelValue": l[0] || (l[0] = (e) => r.searchParam.template_id = e),
                    modelModifiers: { trim: !0 },
                    placeholder: o(n)("请输入模版ID")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, {
                label: o(n)("模版名称"),
                prop: "name"
              }, {
                default: t(() => [
                  a(g, {
                    modelValue: r.searchParam.name,
                    "onUpdate:modelValue": l[1] || (l[1] = (e) => r.searchParam.name = e),
                    modelModifiers: { trim: !0 },
                    placeholder: o(n)("请输入模版名称")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, {
                label: o(n)("状态"),
                prop: "status"
              }, {
                default: t(() => [
                  a(D, {
                    modelValue: r.searchParam.status,
                    "onUpdate:modelValue": l[2] || (l[2] = (e) => r.searchParam.status = e),
                    placeholder: o(n)("请选择状态")
                  }, {
                    default: t(() => [
                      a(V, {
                        label: o(n)("全部"),
                        value: ""
                      }, null, 8, ["label"]),
                      (m(!0), x(w, null, R(W.value, (e, d) => (m(), k(V, {
                        key: d,
                        label: e,
                        value: d
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, null, {
                default: t(() => [
                  a(b, {
                    type: "primary",
                    onClick: l[3] || (l[3] = (e) => P())
                  }, {
                    default: t(() => [
                      v(i(o(n)("search")), 1)
                    ]),
                    _: 1
                  }),
                  a(b, {
                    onClick: l[4] || (l[4] = (e) => Z(z.value))
                  }, {
                    default: t(() => [
                      v(i(o(n)("reset")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"]),
          a(b, {
            type: "primary",
            onClick: l[5] || (l[5] = (e) => ee())
          }, {
            default: t(() => [
              v(i(o(n)("同步模版状态")), 1)
            ]),
            _: 1
          })
        ]),
        Q((m(), k(q, {
          data: I.value,
          size: "large",
          ref: "goodBankListTableRef"
        }, {
          empty: t(() => [
            p("span", null, i(r.loading ? "" : o(n)("emptyData")), 1)
          ]),
          default: t(() => [
            a(C, {
              prop: "template_id",
              label: o(n)("模版ID"),
              "min-width": "100"
            }, null, 8, ["label"]),
            a(C, {
              prop: "name",
              label: o(n)("模版名称"),
              "min-width": "130"
            }, null, 8, ["label"]),
            a(C, {
              prop: "template_type_name",
              label: o(n)("模版类型"),
              "min-width": "130"
            }, {
              default: t(({ row: e }) => [
                p("div", null, i(e.template_type_name ? e.template_type_name : "--"), 1)
              ]),
              _: 1
            }, 8, ["label"]),
            a(C, {
              prop: "sms",
              label: o(n)("模版内容"),
              "min-width": "200"
            }, {
              default: t(({ row: e }) => {
                var d;
                return [
                  p("div", null, i((d = e.sms) == null ? void 0 : d.content), 1)
                ];
              }),
              _: 1
            }, 8, ["label"]),
            a(C, {
              prop: "audit_info",
              label: o(n)("审核状态"),
              "min-width": "130"
            }, {
              default: t(({ row: e }) => {
                var d, h, H;
                return [
                  p("div", null, [
                    v(i((d = e.audit_info) == null ? void 0 : d.audit_status_name) + " ", 1),
                    (h = e.audit_info) != null && h.error_status_name ? (m(), x("span", Ve, "（" + i((H = e.audit_info) == null ? void 0 : H.error_status_name) + "）", 1)) : E("", !0)
                  ])
                ];
              }),
              _: 1
            }, 8, ["label"]),
            a(C, {
              label: o(n)("operation"),
              fixed: "right",
              align: "right",
              "min-width": "120"
            }, {
              default: t(({ row: e }) => [
                e.audit_info.audit_status != 2 ? (m(), k(b, {
                  key: 0,
                  type: "primary",
                  link: "",
                  onClick: (d) => oe(e)
                }, {
                  default: t(() => [
                    v(i(e.audit_info.audit_status != 1 && e.audit_info.audit_status != 2 ? o(n)("报备") : o(n)("修改")), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"])) : E("", !0),
                e.audit_info.audit_status == 2 ? (m(), k(b, {
                  key: 1,
                  type: "primary",
                  link: "",
                  onClick: (d) => ae(e)
                }, {
                  default: t(() => [
                    v(i(o(n)("清除报备信息")), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"])) : E("", !0),
                a(b, {
                  type: "primary",
                  link: "",
                  onClick: (d) => le(e)
                }, {
                  default: t(() => [
                    v(i(o(n)("详情")), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          _: 1
        }, 8, ["data"])), [
          [G, r.loading]
        ]),
        p("div", Ce, [
          a(re, {
            "current-page": r.page,
            "onUpdate:currentPage": l[6] || (l[6] = (e) => r.page = e),
            "page-size": r.limit,
            "onUpdate:pageSize": l[7] || (l[7] = (e) => r.limit = e),
            layout: "total, sizes, prev, pager, next, jumper",
            total: r.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        a(L, {
          modelValue: M.value,
          "onUpdate:modelValue": l[9] || (l[9] = (e) => M.value = e),
          title: o(n)("模版详情"),
          width: "600px",
          "destroy-on-close": ""
        }, {
          footer: t(() => [
            p("span", je, [
              a(b, {
                type: "primary",
                onClick: l[8] || (l[8] = (e) => M.value = !1)
              }, {
                default: t(() => [
                  v(i(o(n)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            a(N, {
              "label-width": "100px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: t(() => [
                a(_, {
                  label: o(n)("短信类型"),
                  prop: "template_id"
                }, {
                  default: t(() => [
                    p("div", null, i(u.value.sms_type), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(_, {
                  label: o(n)("模版名称"),
                  prop: "template_id"
                }, {
                  default: t(() => [
                    p("div", null, i(u.value.name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(_, {
                  label: o(n)("模版类型"),
                  prop: "title"
                }, {
                  default: t(() => [
                    p("div", null, i(u.value.title), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                u.value.sms ? (m(), k(_, {
                  key: 0,
                  label: o(n)("短信内容"),
                  prop: "title"
                }, {
                  default: t(() => {
                    var e;
                    return [
                      p("div", null, i((e = u.value.sms) == null ? void 0 : e.content), 1)
                    ];
                  }),
                  _: 1
                }, 8, ["label"])) : E("", !0),
                a(_, {
                  label: o(n)("审核状态"),
                  prop: "title"
                }, {
                  default: t(() => [
                    p("div", null, i(u.value.audit_info.audit_status_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 512)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(L, {
          modelValue: T.value,
          "onUpdate:modelValue": l[13] || (l[13] = (e) => T.value = e),
          title: o(n)("模版报备"),
          width: "820px",
          "destroy-on-close": ""
        }, {
          footer: t(() => [
            p("span", Ue, [
              a(b, {
                onClick: l[11] || (l[11] = (e) => T.value = !1)
              }, {
                default: t(() => [
                  v(i(o(n)("cancel")), 1)
                ]),
                _: 1
              }),
              a(b, {
                type: "primary",
                onClick: l[12] || (l[12] = (e) => se()),
                disabled: F.value
              }, {
                default: t(() => [
                  v(i(o(n)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ])
          ]),
          default: t(() => [
            Q((m(), k(N, {
              "label-width": "100px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: t(() => [
                a(_, {
                  label: o(n)("模版名称"),
                  prop: "template_id"
                }, {
                  default: t(() => [
                    p("div", De, i(u.value.name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(_, {
                  label: o(n)("模版类型"),
                  prop: "title"
                }, {
                  default: t(() => [
                    a(ue, {
                      modelValue: f.value.template_type,
                      "onUpdate:modelValue": l[10] || (l[10] = (e) => f.value.template_type = e)
                    }, {
                      default: t(() => [
                        (m(!0), x(w, null, R(Object.entries(J.value), ([e, d]) => (m(), k(ie, {
                          key: e,
                          label: Number(e)
                        }, {
                          default: t(() => [
                            v(i(d), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                Pe,
                u.value.variable && Object.keys(u.value.variable).length > 0 ? (m(), k(_, {
                  key: 0,
                  label: o(n)("变量类型"),
                  prop: "params_json"
                }, {
                  default: t(() => [
                    (m(!0), x(w, null, R(u.value.variable, (e, d) => (m(), x("div", {
                      key: d,
                      class: "mb-2 flex items-center"
                    }, [
                      p("div", Te, [
                        p("div", Ee, i(e), 1),
                        a(D, {
                          modelValue: f.value.params_json[d],
                          "onUpdate:modelValue": (h) => f.value.params_json[d] = h,
                          placeholder: "请选择类型",
                          class: "flex-1",
                          filterable: "",
                          clearable: "",
                          disabled: F.value
                        }, {
                          default: t(() => [
                            (m(!0), x(w, null, R(ne.value, (h) => (m(), k(V, {
                              key: h.type,
                              label: h.name + "（" + h.desc + "）",
                              value: h.type
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ])
                    ]))), 128))
                  ]),
                  _: 1
                }, 8, ["label"])) : E("", !0)
              ]),
              _: 1
            })), [
              [G, S.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(L, {
          modelValue: U.value,
          "onUpdate:modelValue": l[16] || (l[16] = (e) => U.value = e),
          title: o(n)("同步模版状态"),
          width: "800px",
          "destroy-on-close": ""
        }, {
          footer: t(() => [
            p("span", we, [
              a(b, {
                onClick: l[14] || (l[14] = (e) => U.value = !1)
              }, {
                default: t(() => [
                  v(i(o(n)("cancel")), 1)
                ]),
                _: 1
              }),
              a(b, {
                type: "primary",
                onClick: l[15] || (l[15] = (e) => U.value = !1)
              }, {
                default: t(() => [
                  v(i(o(n)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            a(pe, {
              type: "warning",
              closable: !1,
              class: "!mb-[10px]"
            }, {
              default: t(() => [
                v(" 以下模版名称重复，请先调整模版名称后重新同步模版 ")
              ]),
              _: 1
            }),
            a(N, {
              "label-width": "100px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: t(() => [
                Object.keys($.value).length ? (m(), x("div", $e, [
                  a(q, {
                    data: te.value,
                    border: "",
                    style: { width: "100%" }
                  }, {
                    default: t(() => [
                      a(C, {
                        label: "模版名称",
                        prop: "name"
                      }),
                      a(C, { label: "插件名称" }, {
                        default: t(({ row: e }) => [
                          (m(!0), x(w, null, R(e.platforms, (d) => (m(), k(de, {
                            key: d,
                            class: "mr-1 mb-1"
                          }, {
                            default: t(() => [
                              v(i(d), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ])) : E("", !0)
              ]),
              _: 1
            }, 512)
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  Ie as default
};
