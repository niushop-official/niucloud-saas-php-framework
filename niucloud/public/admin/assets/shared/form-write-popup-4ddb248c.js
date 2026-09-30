import { defineComponent as I, ref as V, reactive as N, computed as Z, resolveComponent as f, resolveDirective as G, openBlock as _, createBlock as y, unref as m, withCtx as i, createElementVNode as d, createVNode as a, createTextVNode as b, toDisplayString as s, withDirectives as J, createElementBlock as L, Fragment as k, renderList as M, createCommentVNode as w, normalizeClass as O } from "vue";
import { t as r, bP as X, bQ as Y, bM as j, bR as ee, bS as le } from "./core-shared-c6ad4e77.js";
const te = { class: "flex items-center" }, ie = /* @__PURE__ */ d("span", null, "每", -1), oe = /* @__PURE__ */ d("span", null, "可填写", -1), ae = /* @__PURE__ */ d("span", null, "次", -1), re = { class: "flex items-center" }, me = /* @__PURE__ */ d("span", null, "每", -1), ne = /* @__PURE__ */ d("span", null, "可填写", -1), _e = /* @__PURE__ */ d("span", { class: "mr-[5px]" }, "次", -1), ue = { class: "w-[250px]" }, se = /* @__PURE__ */ d("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), de = {
  key: 1,
  class: "flex items-center mt-[5px]"
}, pe = /* @__PURE__ */ d("span", { class: "mr-[5px]" }, "每天", -1), fe = /* @__PURE__ */ d("span", { class: "ml-[5px]" }, "可填写", -1), be = { class: "dialog-footer" }, ye = /* @__PURE__ */ I({
  __name: "form-write-popup",
  emits: ["complete"],
  setup(ce, { expose: R, emit: F }) {
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
    }, t = N({ ...C }), D = V(), P = Z(() => ({
      label_ids: [
        { required: !0, message: r("labelTips"), trigger: "blur" }
      ],
      level_ids: [
        { required: !0, message: r("levelTips"), trigger: "blur" }
      ],
      member_write_rule: [
        {
          validator: (n, e, o) => {
            let p = "";
            U.forEach((u, v) => {
              u.value == e.time_unit && (p = u.text);
            }), t.member_write_type == "diy" ? e.time_value ? e.num ? o() : o(new Error(r("numCannotNull"))) : o(new Error(`${p}数不能为空`)) : o();
          },
          trigger: ["blur", "change"]
        }
      ],
      form_write_rule: [
        {
          validator: (n, e, o) => {
            let p = "";
            U.forEach((u, v) => {
              u.value == e.time_unit && (p = u.text);
            }), t.member_write_type == "diy" ? e.time_value ? e.num ? o() : o(new Error(r("numCannotNull"))) : o(new Error(`${p}数不能为空`)) : o();
          },
          trigger: ["blur", "change"]
        }
      ],
      time_limit_rule: [
        {
          validator: (n, e, o) => {
            t.time_limit_type == "specify_time" && (!e.specify_time || !e.specify_time.length) ? o(new Error(r("timeLimitRuleOne"))) : t.time_limit_type == "open_day_time" && (!e.open_day_time || !e.open_day_time.length) ? o(new Error(r("timeLimitRuleTwo"))) : t.time_limit_type == "open_day_time" && e.open_day_time && e.open_day_time.length && e.open_day_time[0] == e.open_day_time[1] ? o(new Error(r("timeLimitRuleThree"))) : o();
          },
          trigger: ["blur", "change"]
        }
      ]
    })), E = V([]), z = V([]);
    X().then(({ data: n }) => {
      z.value = n;
    }), Y().then(({ data: n }) => {
      E.value = n;
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
    ]), $ = async (n = null) => {
      if (Object.assign(t, C), c.value = !0, n) {
        const e = await (await ee(n.form_id)).data;
        e && Object.keys(e).length ? Object.keys(t).forEach((o) => {
          e[o] != null && (t[o] = e[o]);
        }) : t.form_id = n.form_id;
      }
      c.value = !1;
    }, H = async (n) => {
      c.value || !n || await n.validate(async (e) => {
        e && (c.value = !0, le(t).then((p) => {
          c.value = !1, g.value = !1, F("complete");
        }).catch((p) => {
          c.value = !1;
        }));
      });
    }, ve = (n) => {
      n.target.value = n.target.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ""), n.target.value = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
    };
    return R({
      showDialog: g,
      setFormData: $
    }), (n, e) => {
      const o = f("el-radio"), p = f("el-radio-group"), u = f("el-form-item"), v = f("el-option"), h = f("el-select"), T = f("el-input"), K = f("el-tooltip"), A = f("el-date-picker"), B = f("el-time-picker"), Q = f("el-form"), S = f("el-button"), W = f("el-dialog"), q = G("loading");
      return _(), y(W, {
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
          d("span", be, [
            a(S, {
              onClick: e[18] || (e[18] = (l) => g.value = !1)
            }, {
              default: i(() => [
                b(s(m(r)("cancel")), 1)
              ]),
              _: 1
            }),
            a(S, {
              type: "primary",
              loading: c.value,
              onClick: e[19] || (e[19] = (l) => H(D.value))
            }, {
              default: i(() => [
                b(s(m(r)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          J((_(), y(Q, {
            model: t,
            "label-width": "120px",
            ref_key: "formRef",
            ref: D,
            rules: m(P),
            class: "page-form"
          }, {
            default: i(() => [
              a(u, {
                label: m(r)("joinMemberType")
              }, {
                default: i(() => [
                  a(p, {
                    modelValue: t.join_member_type,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => t.join_member_type = l)
                  }, {
                    default: i(() => [
                      a(o, { label: "all_member" }, {
                        default: i(() => [
                          b(s(m(r)("allMember")), 1)
                        ]),
                        _: 1
                      }),
                      a(o, { label: "selected_member_level" }, {
                        default: i(() => [
                          b(s(m(r)("selectedMemberLevel")), 1)
                        ]),
                        _: 1
                      }),
                      a(o, { label: "selected_member_label" }, {
                        default: i(() => [
                          b(s(m(r)("selectedMemberLabel")), 1)
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
                  a(h, {
                    modelValue: t.label_ids,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => t.label_ids = l),
                    clearable: "",
                    multiple: "",
                    placeholder: m(r)("memberLabelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: i(() => [
                      (_(!0), L(k, null, M(z.value, (l, x) => (_(), y(v, {
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
                  a(h, {
                    modelValue: t.level_ids,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => t.level_ids = l),
                    clearable: "",
                    multiple: "",
                    placeholder: m(r)("memberLevelPlaceholder"),
                    class: "input-width"
                  }, {
                    default: i(() => [
                      (_(!0), L(k, null, M(E.value, (l, x) => (_(), y(v, {
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
              a(u, {
                label: m(r)("apieceFillQuantity"),
                class: O({ "!mb-[5px]": t.member_write_type == "diy" })
              }, {
                default: i(() => [
                  a(p, {
                    modelValue: t.member_write_type,
                    "onUpdate:modelValue": e[3] || (e[3] = (l) => t.member_write_type = l)
                  }, {
                    default: i(() => [
                      a(o, { label: "no_limit" }, {
                        default: i(() => [
                          b(s(m(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      a(o, { label: "diy" }, {
                        default: i(() => [
                          b(s(m(r)("diy")), 1)
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
                  d("div", te, [
                    ie,
                    a(T, {
                      modelValue: t.member_write_rule.time_value,
                      "onUpdate:modelValue": e[4] || (e[4] = (l) => t.member_write_rule.time_value = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[5] || (e[5] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    a(h, {
                      modelValue: t.member_write_rule.time_unit,
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => t.member_write_rule.time_unit = l),
                      class: "!w-[60px] pr-[5px]",
                      size: "small"
                    }, {
                      default: i(() => [
                        (_(!0), L(k, null, M(U, (l, x) => (_(), y(v, {
                          key: l.value,
                          label: l.text,
                          value: l.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    oe,
                    a(T, {
                      modelValue: t.member_write_rule.num,
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => t.member_write_rule.num = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[8] || (e[8] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    ae
                  ])
                ]),
                _: 1
              })) : w("", !0),
              a(u, {
                label: m(r)("fillQuantityTotal"),
                class: O({ "!mb-[5px]": t.form_write_type == "diy" })
              }, {
                default: i(() => [
                  a(p, {
                    modelValue: t.form_write_type,
                    "onUpdate:modelValue": e[9] || (e[9] = (l) => t.form_write_type = l)
                  }, {
                    default: i(() => [
                      a(o, { label: "no_limit" }, {
                        default: i(() => [
                          b(s(m(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      a(o, { label: "diy" }, {
                        default: i(() => [
                          b(s(m(r)("diy")), 1)
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
                  d("div", re, [
                    me,
                    a(T, {
                      modelValue: t.form_write_rule.time_value,
                      "onUpdate:modelValue": e[10] || (e[10] = (l) => t.form_write_rule.time_value = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[11] || (e[11] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    a(h, {
                      modelValue: t.form_write_rule.time_unit,
                      "onUpdate:modelValue": e[12] || (e[12] = (l) => t.form_write_rule.time_unit = l),
                      class: "!w-[60px] pr-[5px]",
                      size: "small"
                    }, {
                      default: i(() => [
                        (_(!0), L(k, null, M(U, (l, x) => (_(), y(v, {
                          key: l.value,
                          label: l.text,
                          value: l.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    ne,
                    a(T, {
                      modelValue: t.form_write_rule.num,
                      "onUpdate:modelValue": e[13] || (e[13] = (l) => t.form_write_rule.num = l),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[14] || (e[14] = (l) => m(j)(l)),
                      size: "small",
                      class: "!w-[50px] px-[5px]",
                      maxlength: "3"
                    }, null, 8, ["modelValue"]),
                    _e,
                    a(K, {
                      effect: "light",
                      placement: "top"
                    }, {
                      content: i(() => [
                        d("p", ue, s(m(r)("writeTips")), 1)
                      ]),
                      default: i(() => [
                        se
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })) : w("", !0),
              a(u, {
                label: m(r)("fillInTheTimePeriod"),
                prop: "time_limit_rule"
              }, {
                default: i(() => [
                  a(p, {
                    modelValue: t.time_limit_type,
                    "onUpdate:modelValue": e[15] || (e[15] = (l) => t.time_limit_type = l)
                  }, {
                    default: i(() => [
                      a(o, { label: "no_limit" }, {
                        default: i(() => [
                          b(s(m(r)("noLimit")), 1)
                        ]),
                        _: 1
                      }),
                      a(o, { label: "specify_time" }, {
                        default: i(() => [
                          b(s(m(r)("setSpecifyTime")), 1)
                        ]),
                        _: 1
                      }),
                      a(o, { label: "open_day_time" }, {
                        default: i(() => [
                          b(s(m(r)("openDayTime")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  t.time_limit_type == "specify_time" ? (_(), y(A, {
                    key: 0,
                    modelValue: t.time_limit_rule.specify_time,
                    "onUpdate:modelValue": e[16] || (e[16] = (l) => t.time_limit_rule.specify_time = l),
                    type: "datetimerange",
                    "range-separator": "至",
                    "start-placeholder": "开始时间",
                    "end-placeholder": "结束时间"
                  }, null, 8, ["modelValue"])) : w("", !0),
                  t.time_limit_type == "open_day_time" ? (_(), L("div", de, [
                    pe,
                    a(B, {
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
                    fe
                  ])) : w("", !0)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [q, c.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ye
}, Symbol.toStringTag, { value: "Module" }));
export {
  xe as _,
  ye as a
};
