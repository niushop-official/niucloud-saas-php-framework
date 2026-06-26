import { defineComponent as X, ref as V, reactive as N, computed as Y, resolveComponent as s, resolveDirective as Z, openBlock as n, createBlock as y, unref as a, withCtx as i, createElementVNode as b, createVNode as o, createTextVNode as f, toDisplayString as d, withDirectives as ee, createElementBlock as L, Fragment as T, renderList as h, createCommentVNode as w, normalizeClass as R } from "vue";
import { t as r, bH as le, bI as te, bE as C, bJ as ie, bK as oe } from "./core-shared-ca1fcae5.js";
const me = { class: "flex items-center" }, re = /* @__PURE__ */ b("span", null, "每", -1), ae = /* @__PURE__ */ b("span", null, "可填写", -1), ne = /* @__PURE__ */ b("span", null, "次", -1), _e = { class: "flex items-center" }, ue = /* @__PURE__ */ b("span", null, "每", -1), se = /* @__PURE__ */ b("span", null, "可填写", -1), de = /* @__PURE__ */ b("span", { class: "mr-[5px]" }, "次", -1), pe = { class: "w-[250px]" }, fe = {
  key: 1,
  class: "flex items-center mt-[5px]"
}, be = /* @__PURE__ */ b("span", { class: "mr-[5px]" }, "每天", -1), ye = /* @__PURE__ */ b("span", { class: "ml-[5px]" }, "可填写", -1), ce = { class: "dialog-footer" }, ge = /* @__PURE__ */ X({
  __name: "form-write-popup",
  emits: ["complete"],
  setup(ve, { expose: H, emit: K }) {
    const x = V(!1), c = V(!1), D = {
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
    }, t = N({ ...D }), M = V(), O = Y(() => ({
      label_ids: [
        { required: !0, message: r("labelTips"), trigger: "blur" }
      ],
      level_ids: [
        { required: !0, message: r("levelTips"), trigger: "blur" }
      ],
      member_write_rule: [
        {
          validator: (_, e, m) => {
            let p = "";
            U.forEach((u, v) => {
              u.value == e.time_unit && (p = u.text);
            }), t.member_write_type == "diy" ? e.time_value ? e.num ? m() : m(new Error(r("numCannotNull"))) : m(new Error(`${p}数不能为空`)) : m();
          },
          trigger: ["blur", "change"]
        }
      ],
      form_write_rule: [
        {
          validator: (_, e, m) => {
            let p = "";
            U.forEach((u, v) => {
              u.value == e.time_unit && (p = u.text);
            }), t.member_write_type == "diy" ? e.time_value ? e.num ? m() : m(new Error(r("numCannotNull"))) : m(new Error(`${p}数不能为空`)) : m();
          },
          trigger: ["blur", "change"]
        }
      ],
      time_limit_rule: [
        {
          validator: (_, e, m) => {
            t.time_limit_type == "specify_time" && (!e.specify_time || !e.specify_time.length) ? m(new Error(r("timeLimitRuleOne"))) : t.time_limit_type == "open_day_time" && (!e.open_day_time || !e.open_day_time.length) ? m(new Error(r("timeLimitRuleTwo"))) : t.time_limit_type == "open_day_time" && e.open_day_time && e.open_day_time.length && e.open_day_time[0] == e.open_day_time[1] ? m(new Error(r("timeLimitRuleThree"))) : m();
          },
          trigger: ["blur", "change"]
        }
      ]
    })), j = V([]), F = V([]);
    le().then(({ data: _ }) => {
      F.value = _;
    }), te().then(({ data: _ }) => {
      j.value = _;
    });
    const U = N([
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
    ]), S = K, P = async (_ = null) => {
      if (Object.assign(t, D), c.value = !0, _) {
        const e = await (await ie(_.form_id)).data;
        e && Object.keys(e).length ? Object.keys(t).forEach((m) => {
          e[m] != null && (t[m] = e[m]);
        }) : t.form_id = _.form_id;
      }
      c.value = !1;
    }, Q = async (_) => {
      c.value || !_ || await _.validate(async (e) => {
        e && (c.value = !0, oe(t).then((p) => {
          c.value = !1, x.value = !1, S("complete");
        }).catch((p) => {
          c.value = !1;
        }));
      });
    };
    return H({
      showDialog: x,
      setFormData: P
    }), (_, e) => {
      const m = s("el-radio"), p = s("el-radio-group"), u = s("el-form-item"), v = s("el-option"), k = s("el-select"), E = s("el-input"), $ = s("QuestionFilled"), B = s("el-icon"), W = s("el-tooltip"), q = s("el-date-picker"), A = s("el-time-picker"), I = s("el-form"), z = s("el-button"), J = s("el-dialog"), G = Z("loading");
      return n(), y(J, {
        modelValue: x.value,
        "onUpdate:modelValue": e[20] || (e[20] = (l) => x.value = l),
        title: a(r)("writeSet"),
        width: "600px",
        class: "diy-dialog-wrap",
        "close-on-press-escape": !0,
        "destroy-on-close": !0,
        "close-on-click-modal": !1
      }, {
        footer: i(() => [
          b("span", ce, [
            o(z, {
              onClick: e[18] || (e[18] = (l) => x.value = !1)
            }, {
              default: i(() => [
                f(d(a(r)("cancel")), 1)
              ]),
              _: 1
            }),
            o(z, {
              type: "primary",
              loading: c.value,
              onClick: e[19] || (e[19] = (l) => Q(M.value))
            }, {
              default: i(() => [
                f(d(a(r)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          ee((n(), y(I, {
            model: t,
            "label-width": "120px",
            ref_key: "formRef",
            ref: M,
            rules: O.value,
            class: "page-form"
          }, {
            default: i(() => [
              o(u, {
                label: a(r)("joinMemberType")
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.join_member_type,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => t.join_member_type = l)
                  }, {
                    default: i(() => [
                      o(m, { label: "all_member" }, {
                        default: i(() => [
                          f(d(a(r)("allMember")), 1)
                        ]),
                        _: 1
                      }),
                      o(m, { label: "selected_member_level" }, {
                        default: i(() => [
                          f(d(a(r)("selectedMemberLevel")), 1)
                        ]),
                        _: 1
                      }),
                      o(m, { label: "selected_member_label" }, {
                        default: i(() => [
                          f(d(a(r)("selectedMemberLabel")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t.join_member_type == "selected_member_label" ? (n(), y(u, {
                key: 0,
                label: a(r)("memberLabel"),
                prop: "label_ids"
              }, {
                default: i(() => [
                  o(k, {
                    modelValue: t.label_ids,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => t.label_ids = l),
                    clearable: "",
                    multiple: "",
                    placeholder: a(r)("memberLabelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: i(() => [
                      (n(!0), L(T, null, h(F.value, (l, g) => (n(), y(v, {
                        label: l.label_name,
                        value: l.label_id,
                        key: g
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : w("", !0),
              t.join_member_type == "selected_member_level" ? (n(), y(u, {
                key: 1,
                label: a(r)("memberLevel"),
                prop: "level_ids"
              }, {
                default: i(() => [
                  o(k, {
                    modelValue: t.level_ids,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => t.level_ids = l),
                    clearable: "",
                    multiple: "",
                    placeholder: a(r)("memberLevelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: i(() => [
                      (n(!0), L(T, null, h(j.value, (l, g) => (n(), y(v, {
                        label: l.level_name,
                        value: l.level_id,
                        key: g
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : w("", !0),
              o(u, {
                label: a(r)("apieceFillQuantity"),
                class: R({ "!mb-[5px]": t.member_write_type == "diy" })
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.member_write_type,
                    "onUpdate:modelValue": e[3] || (e[3] = (l) => t.member_write_type = l)
                  }, {
                    default: i(() => [
                      o(m, { label: "no_limit" }, {
                        default: i(() => [
                          f(d(a(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      o(m, { label: "diy" }, {
                        default: i(() => [
                          f(d(a(r)("diy")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"]),
              t.member_write_type == "diy" ? (n(), y(u, {
                key: 2,
                label: " ",
                prop: "member_write_rule"
              }, {
                default: i(() => [
                  b("div", me, [
                    re,
                    o(E, {
                      modelValue: t.member_write_rule.time_value,
                      "onUpdate:modelValue": e[4] || (e[4] = (l) => t.member_write_rule.time_value = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[5] || (e[5] = (l) => a(C)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    o(k, {
                      modelValue: t.member_write_rule.time_unit,
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => t.member_write_rule.time_unit = l),
                      class: "!w-[60px] pr-[5px]",
                      size: "small"
                    }, {
                      default: i(() => [
                        (n(!0), L(T, null, h(U, (l, g) => (n(), y(v, {
                          key: l.value,
                          label: l.text,
                          value: l.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    ae,
                    o(E, {
                      modelValue: t.member_write_rule.num,
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => t.member_write_rule.num = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[8] || (e[8] = (l) => a(C)(l)),
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
                label: a(r)("fillQuantityTotal"),
                class: R({ "!mb-[5px]": t.form_write_type == "diy" })
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.form_write_type,
                    "onUpdate:modelValue": e[9] || (e[9] = (l) => t.form_write_type = l)
                  }, {
                    default: i(() => [
                      o(m, { label: "no_limit" }, {
                        default: i(() => [
                          f(d(a(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      o(m, { label: "diy" }, {
                        default: i(() => [
                          f(d(a(r)("diy")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"]),
              t.form_write_type == "diy" ? (n(), y(u, {
                key: 3,
                label: " ",
                prop: "form_write_rule"
              }, {
                default: i(() => [
                  b("div", _e, [
                    ue,
                    o(E, {
                      modelValue: t.form_write_rule.time_value,
                      "onUpdate:modelValue": e[10] || (e[10] = (l) => t.form_write_rule.time_value = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[11] || (e[11] = (l) => a(C)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    o(k, {
                      modelValue: t.form_write_rule.time_unit,
                      "onUpdate:modelValue": e[12] || (e[12] = (l) => t.form_write_rule.time_unit = l),
                      class: "!w-[60px] pr-[5px]",
                      size: "small"
                    }, {
                      default: i(() => [
                        (n(!0), L(T, null, h(U, (l, g) => (n(), y(v, {
                          key: l.value,
                          label: l.text,
                          value: l.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    se,
                    o(E, {
                      modelValue: t.form_write_rule.num,
                      "onUpdate:modelValue": e[13] || (e[13] = (l) => t.form_write_rule.num = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[14] || (e[14] = (l) => a(C)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    de,
                    o(W, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: i(() => [
                        b("p", pe, d(a(r)("writeTips")), 1)
                      ]),
                      default: i(() => [
                        o(B, null, {
                          default: i(() => [
                            o($, { color: "#999999" })
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
                label: a(r)("fillInTheTimePeriod"),
                prop: "time_limit_rule"
              }, {
                default: i(() => [
                  o(p, {
                    modelValue: t.time_limit_type,
                    "onUpdate:modelValue": e[15] || (e[15] = (l) => t.time_limit_type = l)
                  }, {
                    default: i(() => [
                      o(m, { label: "no_limit" }, {
                        default: i(() => [
                          f(d(a(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      o(m, { label: "specify_time" }, {
                        default: i(() => [
                          f(d(a(r)("setSpecifyTime")), 1)
                        ]),
                        _: 1
                      }),
                      o(m, { label: "open_day_time" }, {
                        default: i(() => [
                          f(d(a(r)("openDayTime")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  t.time_limit_type == "specify_time" ? (n(), y(q, {
                    key: 0,
                    modelValue: t.time_limit_rule.specify_time,
                    "onUpdate:modelValue": e[16] || (e[16] = (l) => t.time_limit_rule.specify_time = l),
                    type: "datetimerange",
                    "range-separator": "至",
                    "start-placeholder": "开始时间",
                    "end-placeholder": "结束时间"
                  }, null, 8, ["modelValue"])) : w("", !0),
                  t.time_limit_type == "open_day_time" ? (n(), L("div", fe, [
                    be,
                    o(A, {
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
            [G, c.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  ge as _
};
