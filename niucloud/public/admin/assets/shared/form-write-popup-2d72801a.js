import { defineComponent as G, ref as V, reactive as S, computed as X, resolveComponent as s, resolveDirective as Y, openBlock as _, createBlock as y, unref as m, withCtx as i, createElementVNode as b, createVNode as o, createTextVNode as f, toDisplayString as d, withDirectives as ee, createElementBlock as L, Fragment as E, renderList as h, createCommentVNode as w, normalizeClass as N } from "vue";
import { t as r, bH as le, bI as te, bE as j, bJ as ie, bK as oe } from "./core-shared-e1759ce4.js";
const ae = { class: "flex items-center" }, re = /* @__PURE__ */ b("span", null, "每", -1), me = /* @__PURE__ */ b("span", null, "可填写", -1), ne = /* @__PURE__ */ b("span", null, "次", -1), _e = { class: "flex items-center" }, ue = /* @__PURE__ */ b("span", null, "每", -1), se = /* @__PURE__ */ b("span", null, "可填写", -1), de = /* @__PURE__ */ b("span", { class: "mr-[5px]" }, "次", -1), pe = { class: "w-[250px]" }, fe = {
  key: 1,
  class: "flex items-center mt-[5px]"
}, be = /* @__PURE__ */ b("span", { class: "mr-[5px]" }, "每天", -1), ye = /* @__PURE__ */ b("span", { class: "ml-[5px]" }, "可填写", -1), ce = { class: "dialog-footer" }, ve = /* @__PURE__ */ G({
  __name: "form-write-popup",
  emits: ["complete"],
  setup(we, { expose: O, emit: R }) {
    const g = V(!1), c = V(!1), C = {
      id: 0,
      form_id: 0,
      // 万能表单id
      write_way: "no_limit",
      // 填写方式，no_limit：不限制，scan：仅限微信扫一扫，url：仅限链接进入
      join_member_type: "all_member",
      // 参与会员，all_member：所有会员参与，selected_member_level：指定会员等级，selected_member_label：指定会员标签
      level_ids: [],
      // 会员等级id集合
      label_ids: [],
      // 会员标签id集合
      member_write_type: "no_limit",
      // 每人可填写次数，no_limit：不限制，diy：自定义
      // 每人可填写次数自定义规则
      member_write_rule: {
        time_value: 1,
        // 时间
        time_unit: "day",
        // 时间单位
        num: 1
        // 可填写次数
      },
      form_write_type: "no_limit",
      // 表单可填写数量，no_limit：不限制，diy：自定义
      // 表单可填写总数自定义规则
      form_write_rule: {
        time_value: 1,
        // 时间
        time_unit: "day",
        // 时间单位
        num: 1
        // 可填写次数
      },
      time_limit_type: "no_limit",
      // 填写时间限制类型，no_limit：不限制，specify_time：指定开始结束时间，open_day_time：设置每日开启时间
      // 填写时间限制规则
      time_limit_rule: {
        specify_time: [],
        // 指定开始结束时间
        open_day_time: []
        // 设置每日开启时间
      },
      is_allow_update_content: 0,
      // 是否允许修改自己填写的内容，0：否，1：是
      write_instruction: ""
      // 表单填写须知
    }, t = S({ ...C }), D = V(), H = X(() => ({
      label_ids: [
        { required: !0, message: r("labelTips"), trigger: "blur" }
      ],
      level_ids: [
        { required: !0, message: r("levelTips"), trigger: "blur" }
      ],
      member_write_rule: [
        {
          validator: (n, e, a) => {
            let p = "";
            U.forEach((u, v) => {
              u.value == e.time_unit && (p = u.text);
            }), t.member_write_type == "diy" ? e.time_value ? e.num ? a() : a(new Error(r("numCannotNull"))) : a(new Error(`${p}数不能为空`)) : a();
          },
          trigger: ["blur", "change"]
        }
      ],
      form_write_rule: [
        {
          validator: (n, e, a) => {
            let p = "";
            U.forEach((u, v) => {
              u.value == e.time_unit && (p = u.text);
            }), t.member_write_type == "diy" ? e.time_value ? e.num ? a() : a(new Error(r("numCannotNull"))) : a(new Error(`${p}数不能为空`)) : a();
          },
          trigger: ["blur", "change"]
        }
      ],
      time_limit_rule: [
        {
          validator: (n, e, a) => {
            t.time_limit_type == "specify_time" && (!e.specify_time || !e.specify_time.length) ? a(new Error(r("timeLimitRuleOne"))) : t.time_limit_type == "open_day_time" && (!e.open_day_time || !e.open_day_time.length) ? a(new Error(r("timeLimitRuleTwo"))) : t.time_limit_type == "open_day_time" && e.open_day_time && e.open_day_time.length && e.open_day_time[0] == e.open_day_time[1] ? a(new Error(r("timeLimitRuleThree"))) : a();
          },
          trigger: ["blur", "change"]
        }
      ]
    })), M = V([]), z = V([]);
    le().then(({ data: n }) => {
      z.value = n;
    }), te().then(({ data: n }) => {
      M.value = n;
    });
    const U = S([
      {
        text: "天",
        value: "day"
      },
      {
        text: "周",
        value: "week"
      },
      {
        text: "月",
        value: "month"
      },
      {
        text: "年",
        value: "year"
      }
    ]), K = R, P = async (n = null) => {
      if (Object.assign(t, C), c.value = !0, n) {
        const e = await (await ie(n.form_id)).data;
        e && Object.keys(e).length ? Object.keys(t).forEach((a) => {
          e[a] != null && (t[a] = e[a]);
        }) : t.form_id = n.form_id;
      }
      c.value = !1;
    }, $ = async (n) => {
      c.value || !n || await n.validate(async (e) => {
        e && (c.value = !0, oe(t).then((p) => {
          c.value = !1, g.value = !1, K("complete");
        }).catch((p) => {
          c.value = !1;
        }));
      });
    }, ge = (n) => {
      n.target.value = n.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ""), n.target.value = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
    };
    return O({
      showDialog: g,
      setFormData: P
    }), (n, e) => {
      const a = s("el-radio"), p = s("el-radio-group"), u = s("el-form-item"), v = s("el-option"), T = s("el-select"), k = s("el-input"), Q = s("QuestionFilled"), A = s("el-icon"), B = s("el-tooltip"), W = s("el-date-picker"), q = s("el-time-picker"), I = s("el-form"), F = s("el-button"), J = s("el-dialog"), Z = Y("loading");
      return _(), y(J, {
        modelValue: g.value,
        "onUpdate:modelValue": e[20] || (e[20] = (l) => g.value = l),
        title: m(r)("writeSet"),
        width: "600px",
        class: "diy-dialog-wrap",
        "close-on-press-escape": !0,
        "destroy-on-close": !0,
        "close-on-click-modal": !1
      }, {
        footer: i(() => [
          b("span", ce, [
            o(F, {
              onClick: e[18] || (e[18] = (l) => g.value = !1)
            }, {
              default: i(() => [
                f(d(m(r)("cancel")), 1)
              ]),
              _: 1
            }),
            o(F, {
              type: "primary",
              loading: c.value,
              onClick: e[19] || (e[19] = (l) => $(D.value))
            }, {
              default: i(() => [
                f(d(m(r)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          ee((_(), y(I, {
            model: t,
            "label-width": "120px",
            ref_key: "formRef",
            ref: D,
            rules: H.value,
            class: "page-form"
          }, {
            default: i(() => [
              o(u, {
                label: m(r)("joinMemberType")
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.join_member_type,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => t.join_member_type = l)
                  }, {
                    default: i(() => [
                      o(a, { label: "all_member" }, {
                        default: i(() => [
                          f(d(m(r)("allMember")), 1)
                        ]),
                        _: 1
                      }),
                      o(a, { label: "selected_member_level" }, {
                        default: i(() => [
                          f(d(m(r)("selectedMemberLevel")), 1)
                        ]),
                        _: 1
                      }),
                      o(a, { label: "selected_member_label" }, {
                        default: i(() => [
                          f(d(m(r)("selectedMemberLabel")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t.join_member_type == "selected_member_label" ? (_(), y(u, {
                key: 0,
                label: m(r)("memberLabel"),
                prop: "label_ids"
              }, {
                default: i(() => [
                  o(T, {
                    modelValue: t.label_ids,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => t.label_ids = l),
                    clearable: "",
                    multiple: "",
                    placeholder: m(r)("memberLabelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: i(() => [
                      (_(!0), L(E, null, h(z.value, (l, x) => (_(), y(v, {
                        label: l.label_name,
                        value: l.label_id,
                        key: x
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : w("", !0),
              t.join_member_type == "selected_member_level" ? (_(), y(u, {
                key: 1,
                label: m(r)("memberLevel"),
                prop: "level_ids"
              }, {
                default: i(() => [
                  o(T, {
                    modelValue: t.level_ids,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => t.level_ids = l),
                    clearable: "",
                    multiple: "",
                    placeholder: m(r)("memberLevelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: i(() => [
                      (_(!0), L(E, null, h(M.value, (l, x) => (_(), y(v, {
                        label: l.level_name,
                        value: l.level_id,
                        key: x
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : w("", !0),
              o(u, {
                label: m(r)("apieceFillQuantity"),
                class: N({ "!mb-[5px]": t.member_write_type == "diy" })
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.member_write_type,
                    "onUpdate:modelValue": e[3] || (e[3] = (l) => t.member_write_type = l)
                  }, {
                    default: i(() => [
                      o(a, { label: "no_limit" }, {
                        default: i(() => [
                          f(d(m(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      o(a, { label: "diy" }, {
                        default: i(() => [
                          f(d(m(r)("diy")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"]),
              t.member_write_type == "diy" ? (_(), y(u, {
                key: 2,
                label: " ",
                prop: "member_write_rule"
              }, {
                default: i(() => [
                  b("div", ae, [
                    re,
                    o(k, {
                      modelValue: t.member_write_rule.time_value,
                      "onUpdate:modelValue": e[4] || (e[4] = (l) => t.member_write_rule.time_value = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[5] || (e[5] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    o(T, {
                      modelValue: t.member_write_rule.time_unit,
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => t.member_write_rule.time_unit = l),
                      class: "!w-[60px] pr-[5px]",
                      size: "small"
                    }, {
                      default: i(() => [
                        (_(!0), L(E, null, h(U, (l, x) => (_(), y(v, {
                          key: l.value,
                          label: l.text,
                          value: l.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    me,
                    o(k, {
                      modelValue: t.member_write_rule.num,
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => t.member_write_rule.num = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[8] || (e[8] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    ne
                  ])
                ]),
                _: 1
              })) : w("", !0),
              o(u, {
                label: m(r)("fillQuantityTotal"),
                class: N({ "!mb-[5px]": t.form_write_type == "diy" })
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.form_write_type,
                    "onUpdate:modelValue": e[9] || (e[9] = (l) => t.form_write_type = l)
                  }, {
                    default: i(() => [
                      o(a, { label: "no_limit" }, {
                        default: i(() => [
                          f(d(m(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      o(a, { label: "diy" }, {
                        default: i(() => [
                          f(d(m(r)("diy")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"]),
              t.form_write_type == "diy" ? (_(), y(u, {
                key: 3,
                label: " ",
                prop: "form_write_rule"
              }, {
                default: i(() => [
                  b("div", _e, [
                    ue,
                    o(k, {
                      modelValue: t.form_write_rule.time_value,
                      "onUpdate:modelValue": e[10] || (e[10] = (l) => t.form_write_rule.time_value = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[11] || (e[11] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    o(T, {
                      modelValue: t.form_write_rule.time_unit,
                      "onUpdate:modelValue": e[12] || (e[12] = (l) => t.form_write_rule.time_unit = l),
                      class: "!w-[60px] pr-[5px]",
                      size: "small"
                    }, {
                      default: i(() => [
                        (_(!0), L(E, null, h(U, (l, x) => (_(), y(v, {
                          key: l.value,
                          label: l.text,
                          value: l.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    se,
                    o(k, {
                      modelValue: t.form_write_rule.num,
                      "onUpdate:modelValue": e[13] || (e[13] = (l) => t.form_write_rule.num = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[14] || (e[14] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    de,
                    o(B, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: i(() => [
                        b("p", pe, d(m(r)("writeTips")), 1)
                      ]),
                      default: i(() => [
                        o(A, null, {
                          default: i(() => [
                            o(Q, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })) : w("", !0),
              o(u, {
                label: m(r)("fillInTheTimePeriod"),
                prop: "time_limit_rule"
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.time_limit_type,
                    "onUpdate:modelValue": e[15] || (e[15] = (l) => t.time_limit_type = l)
                  }, {
                    default: i(() => [
                      o(a, { label: "no_limit" }, {
                        default: i(() => [
                          f(d(m(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      o(a, { label: "specify_time" }, {
                        default: i(() => [
                          f(d(m(r)("setSpecifyTime")), 1)
                        ]),
                        _: 1
                      }),
                      o(a, { label: "open_day_time" }, {
                        default: i(() => [
                          f(d(m(r)("openDayTime")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  t.time_limit_type == "specify_time" ? (_(), y(W, {
                    key: 0,
                    modelValue: t.time_limit_rule.specify_time,
                    "onUpdate:modelValue": e[16] || (e[16] = (l) => t.time_limit_rule.specify_time = l),
                    type: "datetimerange",
                    "range-separator": "至",
                    "start-placeholder": "开始时间",
                    "end-placeholder": "结束时间"
                  }, null, 8, ["modelValue"])) : w("", !0),
                  t.time_limit_type == "open_day_time" ? (_(), L("div", fe, [
                    be,
                    o(q, {
                      class: "!w-[180px]",
                      modelValue: t.time_limit_rule.open_day_time,
                      "onUpdate:modelValue": e[17] || (e[17] = (l) => t.time_limit_rule.open_day_time = l),
                      format: "HH:mm",
                      "value-format": "HH:mm",
                      "is-range": "",
                      "range-separator": "-",
                      "start-placeholder": "开始时间",
                      "end-placeholder": "结束时间"
                    }, null, 8, ["modelValue"]),
                    ye
                  ])) : w("", !0)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [Z, c.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" }));
export {
  Le as _,
  ve as a
};
