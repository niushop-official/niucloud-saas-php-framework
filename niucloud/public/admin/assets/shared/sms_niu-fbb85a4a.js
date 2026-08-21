import { defineComponent as ie, ref as m, reactive as ce, onMounted as re, computed as me, resolveComponent as d, resolveDirective as de, withDirectives as E, openBlock as f, createElementBlock as L, createVNode as e, withCtx as a, unref as i, createElementVNode as n, toDisplayString as r, createTextVNode as b, createCommentVNode as V, vShow as O, createBlock as D } from "vue";
import { f4 as pe, f5 as _e, t as c, f6 as ve, f7 as z, d$ as fe, e0 as be } from "./core-shared-0b2facad.js";
import { ArrowLeft as he } from "@element-plus/icons-vue";
import { useRouter as ge, useRoute as we } from "vue-router";
import xe from "./sms_niu_login-70cea402.js";
import ye from "./sms_template-631929e2.js";
import ke from "./sms_recharge_record-0b879430.js";
import Ve from "./sms_recharge-9052d602.js";
import Ce from "./sms_send-4573cfbb.js";
import $e from "./sms_signature-69d59bc8.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const Re = { class: "main-container" }, Se = { key: 0 }, De = { key: 0 }, Fe = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "牛云短信操作指引", -1), Ie = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "* 开启准备：若要开启牛云短信功能，需登录对应账号，并配置可用的短信签名。", -1), Ue = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "* 审核说明：短信签名设置与模板消息开启均需经过审核。审核时间为周一至周日的 9:30 - 22:00（法定节假日审核时间顺延）。工作日内，审核预计耗时 2 小时；非工作日，预计耗时 4 小时。", -1), Le = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "* 签名报备要求：签名可使用公司全称或简称（简称需为公司全称的一部分，不能增减或跳字，且签名需具备唯一性）。若使用非公司简称作为签名，需提供 app 在 ICP 备案截图或商标证明 ，且签名必须与资质名称完全一致。", -1), Ne = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "* 模版报备要点：报备模板时，请确认模板中变量对应的类型。若模板某变量内容超出长度限制，系统将自动截取，以确保短信正常发出。", -1), Ae = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "* 短信发送条件：短信成功发送需满足两个条件，一是签名审核通过且在运营商处实名认证成功；二是模板审核通过。", -1), Be = /* @__PURE__ */ n("p", { class: "mb-[5px]" }, "* 其他事项：短信数量不足时，请及时进行充值。如有任何疑问，可联系客服，客服电话：400 - 886 - 7993（服务时间为 9:00 - 18:00 ）。", -1), qe = { class: "panel-title" }, Ee = { class: "input-width" }, Me = { class: "input-width" }, je = { class: "input-width" }, Pe = { class: "input-width" }, Te = { class: "input-width" }, Oe = { class: "panel-title" }, ze = /* @__PURE__ */ n("div", { class: "mb-[10px] text-[12px] ml-[30px] text-[#999] leading-[20px]" }, "是否开启牛云短信模版", -1), Ge = { class: "panel-title" }, He = { class: "flex justify-between items-center" }, Je = { class: "text-primary text-[20px] mx-[5px]" }, Ke = { class: "flex items-center" }, Qe = ["src"], We = { class: "flex items-center" }, Xe = { key: 1 }, _l = /* @__PURE__ */ ie({
  __name: "sms_niu",
  setup(Ye) {
    const G = ge(), H = we().meta.title, F = m(!0), u = ce({
      mobiles: "",
      sms_count: "",
      username: "",
      company: "",
      signature: "",
      status_name: ""
    }), I = m(!1), M = m("template"), h = m(!0), y = m(!1), j = m(!0), U = m(0), v = m("");
    re(() => {
      C();
    });
    const J = () => {
      y.value = !1, C();
    }, C = () => {
      h.value = !0, pe().then((o) => {
        j.value = o.data.is_login, F.value = o.data.is_login, v.value = o.data.username, U.value = o.data.is_enable, o.data.is_login ? _e(v.value).then((l) => {
          Object.assign(u, l.data), h.value = !1, I.value = !0;
        }) : (h.value = !1, I.value = !0);
      }).catch((o) => {
        h.value = !1, I.value = !0;
      });
    }, P = m(null), K = () => {
      var o;
      (o = P.value) == null || o.open();
    }, Q = (o) => {
      if (!I.value)
        return !1;
      const l = U.value == 1 ? 0 : 1;
      return new Promise((_, k) => {
        ve({ is_enable: l }).then(() => {
          _(!0);
        }).catch(() => {
          k(!1);
        });
      });
    }, W = (o) => {
      h.value = !0, z(v.value, { signature: o.sign }).then((l) => {
        C();
      });
    }, N = m(), t = m({
      new_mobile: "",
      captcha_key: "",
      captcha_code: "",
      captcha_img: "",
      code: "",
      key: ""
    }), X = async () => {
      t.value.new_mobile = "", t.value.captcha_key = "", t.value.captcha_code = "", t.value.captcha_img = "", t.value.code = "", t.value.key = "";
      try {
        await A(), $.value = !0;
      } catch {
      }
    }, A = () => fe().then((o) => {
      t.value.captcha_key = o.data.captcha_key, t.value.captcha_img = o.data.img;
    }).catch((o) => {
    }), $ = m(!1), Y = me(() => ({
      new_mobile: [
        { required: !0, message: "请输入手机号", trigger: "blur" },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "请输入正确的手机号",
          trigger: ["blur", "change"]
        }
      ],
      captcha_code: [
        { required: !0, message: "请输入验证码", trigger: "blur" }
      ],
      code: [
        { required: !0, message: "请输入动态码", trigger: "blur" }
      ]
    })), R = m(!1), g = m(0), Z = () => {
      g.value > 0 || R.value || N.value.validateField(["captcha_code"], (o) => {
        if (!o)
          return;
        R.value = !0;
        const l = {
          mobile: u.mobiles,
          captcha_key: t.value.captcha_key,
          captcha_code: t.value.captcha_code
        };
        be(l).then((_) => {
          t.value.key = _.data.key, ee(60);
        }).catch((_) => {
          A(), R.value = !1;
        }).finally(() => {
          R.value = !1;
        });
      });
    }, ee = (o) => {
      g.value = o;
      const l = setInterval(() => {
        g.value--, g.value <= 0 && clearInterval(l);
      }, 1e3);
    }, le = async () => {
      var o;
      await ((o = N.value) == null ? void 0 : o.validate(async (l) => {
        if (l) {
          let _ = {};
          u.mobiles ? _ = {
            mobile: u.mobiles,
            new_mobile: t.value.new_mobile,
            key: t.value.key,
            code: t.value.code
          } : _ = {
            new_mobile: t.value.new_mobile
          }, z(v.value, _).then((k) => {
            $.value = !1, C();
          });
        }
      }));
    }, ae = () => {
      G.push("/setting/sms/setting");
    };
    return (o, l) => {
      const _ = d("el-page-header"), k = d("el-card"), te = d("el-alert"), w = d("el-button"), p = d("el-form-item"), x = d("el-col"), B = d("el-row"), oe = d("el-switch"), q = d("el-tab-pane"), ne = d("el-tabs"), T = d("el-form"), S = d("el-input"), se = d("el-dialog"), ue = de("loading");
      return E((f(), L("div", Re, [
        h.value ? (f(), L("div", Xe, [
          e(k, {
            class: "box-card !border-none mb-[15px] min-h-[100vh]",
            shadow: "never"
          })
        ])) : (f(), L("div", Se, [
          F.value && !y.value ? (f(), L("div", De, [
            e(k, {
              class: "box-card !border-none mb-[15px]",
              shadow: "never"
            }, {
              default: a(() => [
                e(_, {
                  content: i(H),
                  icon: i(he),
                  onBack: l[0] || (l[0] = (s) => ae())
                }, null, 8, ["content", "icon"])
              ]),
              _: 1
            }),
            e(T, {
              "label-width": "100px",
              ref: "formRef",
              class: "page-form"
            }, {
              default: a(() => [
                e(k, {
                  class: "box-card !border-none relative",
                  shadow: "never"
                }, {
                  default: a(() => [
                    e(te, {
                      type: "warning",
                      closable: !1,
                      class: "!mb-[30px]"
                    }, {
                      default: a(() => [
                        Fe,
                        Ie,
                        Ue,
                        Le,
                        Ne,
                        Ae,
                        Be
                      ]),
                      _: 1
                    }),
                    n("h3", qe, r(i(c)("短信信息")), 1),
                    e(B, { class: "row-bg px-[30px] mb-[20px]" }, {
                      default: a(() => [
                        e(x, { span: 8 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("用户名")
                            }, {
                              default: a(() => [
                                n("div", Ee, [
                                  n("span", null, r(u.username), 1),
                                  e(w, {
                                    type: "primary",
                                    link: "",
                                    onClick: l[1] || (l[1] = (s) => F.value = !1),
                                    class: "ml-[10px]"
                                  }, {
                                    default: a(() => [
                                      b(r(i(c)("切换账户")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }),
                        e(x, { span: 8 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("公司名称")
                            }, {
                              default: a(() => [
                                n("div", Me, r(u.company), 1)
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }),
                        e(x, { span: 8 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("账户状态")
                            }, {
                              default: a(() => [
                                n("div", je, r(u.status_name), 1)
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }),
                        e(x, { span: 8 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("手机号")
                            }, {
                              default: a(() => [
                                n("div", Pe, [
                                  n("span", null, r(u.mobiles ? u.mobiles : "暂无"), 1),
                                  e(w, {
                                    type: "primary",
                                    link: "",
                                    onClick: l[2] || (l[2] = (s) => X()),
                                    class: "ml-[10px]"
                                  }, {
                                    default: a(() => [
                                      b(r(i(c)("更换手机号")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }),
                        e(x, { span: 8 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("签名")
                            }, {
                              default: a(() => [
                                n("div", Te, [
                                  n("span", null, r(u.signature ? u.signature : "暂无"), 1),
                                  e(w, {
                                    type: "primary",
                                    link: "",
                                    onClick: K,
                                    class: "ml-[10px]"
                                  }, {
                                    default: a(() => [
                                      b(r(i(c)("更换签名")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    n("h3", Oe, r(i(c)("短信权限")), 1),
                    e(B, { class: "row-bg px-[30px] mb-[20px]" }, {
                      default: a(() => [
                        e(x, { span: 24 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("是否开启")
                            }, {
                              default: a(() => [
                                e(oe, {
                                  modelValue: U.value,
                                  "onUpdate:modelValue": l[3] || (l[3] = (s) => U.value = s),
                                  "active-value": 1,
                                  "inactive-value": 0,
                                  "before-change": Q
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            ze
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    n("h3", Ge, r(i(c)("短信条数")), 1),
                    e(B, { class: "row-bg px-[30px] mb-[20px]" }, {
                      default: a(() => [
                        e(x, { span: 24 }, {
                          default: a(() => [
                            e(p, {
                              label: i(c)("短信")
                            }, {
                              default: a(() => [
                                n("div", He, [
                                  n("span", Je, r(u.sms_count), 1),
                                  b("条 "),
                                  e(w, {
                                    onClick: l[4] || (l[4] = (s) => y.value = !0),
                                    class: "ml-[30px]"
                                  }, {
                                    default: a(() => [
                                      b(r(i(c)("短信充值")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    e(ne, {
                      modelValue: M.value,
                      "onUpdate:modelValue": l[5] || (l[5] = (s) => M.value = s),
                      class: "demo-tabs"
                    }, {
                      default: a(() => [
                        e(q, {
                          label: "短信模版",
                          name: "template"
                        }, {
                          default: a(() => [
                            e(ye, {
                              username: v.value,
                              signature: u.signature
                            }, null, 8, ["username", "signature"])
                          ]),
                          _: 1
                        }),
                        e(q, {
                          label: "充值记录",
                          name: "recharge"
                        }, {
                          default: a(() => [
                            e(ke, { username: v.value }, null, 8, ["username"])
                          ]),
                          _: 1
                        }),
                        e(q, {
                          label: "发送记录",
                          name: "send"
                        }, {
                          default: a(() => [
                            e(Ce, { username: v.value }, null, 8, ["username"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 512)
          ])) : V("", !0),
          E(e(xe, {
            info: u,
            isLogin: j.value,
            onComplete: C
          }, null, 8, ["info", "isLogin"]), [
            [O, !F.value]
          ]),
          E(e(Ve, {
            onBack: l[6] || (l[6] = (s) => y.value = !1),
            onComplete: J,
            username: v.value,
            isRecharge: y.value
          }, null, 8, ["username", "isRecharge"]), [
            [O, y.value]
          ]),
          e($e, {
            ref_key: "signatureDialogRef",
            ref: P,
            username: v.value,
            onSelect: W
          }, null, 8, ["username"]),
          e(se, {
            modelValue: $.value,
            "onUpdate:modelValue": l[14] || (l[14] = (s) => $.value = s),
            title: i(c)("更换手机号"),
            width: "600px",
            "destroy-on-close": ""
          }, {
            footer: a(() => [
              e(w, {
                onClick: l[12] || (l[12] = (s) => $.value = !1)
              }, {
                default: a(() => [
                  b(r(i(c)("cancel")), 1)
                ]),
                _: 1
              }),
              e(w, {
                type: "primary",
                onClick: l[13] || (l[13] = (s) => le())
              }, {
                default: a(() => [
                  b(r(i(c)("confirm")), 1)
                ]),
                _: 1
              })
            ]),
            default: a(() => [
              e(T, {
                "label-width": "120px",
                model: t.value,
                ref_key: "changeFormRef",
                ref: N,
                rules: Y.value,
                class: "page-form ml-[20px]"
              }, {
                default: a(() => [
                  u.mobiles ? (f(), D(p, {
                    key: 0,
                    label: "手机号",
                    prop: "mobile"
                  }, {
                    default: a(() => [
                      e(S, {
                        placeholder: "请输入手机号",
                        disabled: "",
                        class: "input-width",
                        maxlength: "11",
                        "show-word-limit": "",
                        modelValue: u.mobiles,
                        "onUpdate:modelValue": l[7] || (l[7] = (s) => u.mobiles = s),
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })) : V("", !0),
                  u.mobiles ? (f(), D(p, {
                    key: 1,
                    label: "新手机号",
                    prop: "new_mobile"
                  }, {
                    default: a(() => [
                      e(S, {
                        placeholder: "请输入新手机号",
                        class: "input-width",
                        maxlength: "11",
                        "show-word-limit": "",
                        modelValue: t.value.new_mobile,
                        "onUpdate:modelValue": l[8] || (l[8] = (s) => t.value.new_mobile = s),
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })) : V("", !0),
                  u.mobiles ? V("", !0) : (f(), D(p, {
                    key: 2,
                    label: "手机号",
                    prop: "new_mobile"
                  }, {
                    default: a(() => [
                      e(S, {
                        placeholder: "请输入手机号",
                        class: "input-width",
                        maxlength: "11",
                        "show-word-limit": "",
                        modelValue: t.value.new_mobile,
                        "onUpdate:modelValue": l[9] || (l[9] = (s) => t.value.new_mobile = s),
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })),
                  u.mobiles ? (f(), D(p, {
                    key: 3,
                    label: "验证码",
                    prop: "captcha_code"
                  }, {
                    default: a(() => [
                      n("div", Ke, [
                        e(S, {
                          placeholder: "请输入验证码",
                          class: "input-width",
                          maxlength: "4",
                          "show-word-limit": "",
                          modelValue: t.value.captcha_code,
                          "onUpdate:modelValue": l[10] || (l[10] = (s) => t.value.captcha_code = s),
                          clearable: ""
                        }, null, 8, ["modelValue"]),
                        n("img", {
                          src: t.value.captcha_img,
                          alt: "验证码",
                          class: "w-[100px] h-[32px] cursor-pointer ml-[10px]",
                          onClick: A
                        }, null, 8, Qe)
                      ])
                    ]),
                    _: 1
                  })) : V("", !0),
                  u.mobiles ? (f(), D(p, {
                    key: 4,
                    label: "动态码",
                    prop: "code"
                  }, {
                    default: a(() => [
                      n("div", We, [
                        e(S, {
                          placeholder: "请输入动态码",
                          class: "input-width",
                          maxlength: "4",
                          "show-word-limit": "",
                          modelValue: t.value.code,
                          "onUpdate:modelValue": l[11] || (l[11] = (s) => t.value.code = s),
                          clearable: ""
                        }, null, 8, ["modelValue"]),
                        e(w, {
                          class: "ml-[10px]",
                          onClick: Z,
                          disabled: g.value > 0,
                          loading: R.value
                        }, {
                          default: a(() => [
                            b(r(g.value > 0 ? `${g.value}秒后重新获取` : "获取动态码"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled", "loading"])
                      ])
                    ]),
                    _: 1
                  })) : V("", !0)
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]))
      ])), [
        [ue, h.value]
      ]);
    };
  }
});
export {
  _l as default
};
