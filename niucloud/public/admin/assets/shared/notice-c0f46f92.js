import { defineComponent as ue, ref as r, reactive as G, resolveComponent as h, resolveDirective as pe, withDirectives as me, openBlock as c, createElementBlock as b, createVNode as l, withCtx as a, createElementVNode as n, toDisplayString as v, unref as i, normalizeClass as y, createCommentVNode as k, createTextVNode as x, createBlock as C } from "vue";
import { t as p, eC as _e, eD as fe, eE as ve, eF as be, eG as he, eH as xe, _ as ge } from "./core-shared-ca1fcae5.js";
import { _ as we } from "./notice-sms.vue_vue_type_script_setup_true_lang-437bf910.js";
import { _ as ye } from "./notice-wechat.vue_vue_type_script_setup_true_lang-138a9a42.js";
import { _ as ke } from "./notice-weapp.vue_vue_type_script_setup_true_lang-320c2db5.js";
import { b as Ce } from "./browser-b31b1ebf.js";
import { SuccessFilled as D } from "@element-plus/icons-vue";
import { ElMessageBox as De, ElMessage as Ve } from "element-plus";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Be = { class: "main-container" }, $e = { class: "panel-title !text-sm" }, Fe = { class: "flex flex-row flex-wrap" }, Ie = { class: "flex" }, Ne = ["onClick"], Se = { class: "ml-0.5" }, qe = ["onClick"], Oe = { class: "ml-0.5" }, Te = ["onClick"], Ue = { class: "ml-0.5" }, Ee = { class: "flex items-center mb-[20px] gap-[10px]" }, Re = { class: "panel-title !text-sm !mb-[0]" }, Le = { class: "flex flex-row flex-wrap" }, Ae = { class: "flex" }, je = ["onClick"], ze = { class: "ml-0.5" }, Me = ["onClick"], We = { class: "ml-0.5" }, Ge = ["onClick"], He = { class: "ml-0.5" }, Qe = { class: "flex flex-col justify-center items-center" }, Je = { class: "mb-[15px]" }, Ke = { class: "account-bind-options" }, Pe = { class: "option-item" }, Xe = { class: "flex flex-col" }, Ye = {
  key: 0,
  class: "title"
}, Ze = {
  key: 1,
  class: "info"
}, et = { class: "option-item" }, tt = { class: "flex flex-col" }, lt = {
  key: 0,
  class: "title"
}, st = {
  key: 1,
  class: "info"
}, at = /* @__PURE__ */ ue({
  __name: "notice",
  setup(ot) {
    const R = r(null), L = r(null), A = r(null), I = r(!1), ee = () => {
      I.value = !0;
    }, te = () => {
      I.value = !1;
    }, _ = G({ loading: !0, buyer: [], seller: [] }), N = () => {
      _.loading = !0, _e({}).then((t) => {
        _.buyer = [], _.seller = [], t.data.forEach((e) => {
          if (e.notice.length) {
            const u = [], f = [];
            Object.keys(e.notice).forEach((E, M) => {
              const m = e.notice[E];
              m.addon_name = e.title, m.receiver_type == 1 ? u.push(m) : f.push(m);
            }), u.length && (u[0].rowspan = u.length, _.buyer = _.buyer.concat(u)), f.length && (f[0].rowspan = f.length, _.seller = _.seller.concat(f));
          }
        }), _.loading = !1;
      }).catch((t) => {
        _.loading = !1;
      });
    }, o = r({
      bind_sms: 0,
      // 新增：短信绑定状态
      bind_wechat: 0,
      bind_weapp: 0,
      bind_sms_info: "",
      bind_wechat_info: "",
      bind_weapp_info: "",
      wechat_qrcode: "",
      weapp_qrcode: "",
      title: "",
      key: "wechat"
    }), S = (t = !1) => {
      fe().then((e) => {
        Object.keys(e.data).length > 0 && (o.value.bind_sms = e.data.mobile ? 1 : 0, o.value.bind_wechat = e.data.wechat_openid ? 1 : 0, o.value.bind_weapp = e.data.weapp_openid ? 1 : 0, o.value.bind_sms_info = e.data.mobile, o.value.bind_wechat_info = e.data.wechat_openid, o.value.bind_weapp_info = e.data.weapp_openid, !t && o.value[`bind_${o.value.key}`] && J());
      });
    };
    S(!0);
    let q = !1;
    const O = r(!1), H = r(), le = () => {
      q || (q = !0, ve().then((t) => {
        var e;
        q = !1, (e = t == null ? void 0 : t.data) != null && e.url && se(t.data.url, "wechat_qrcode"), O.value = !0, o.value.title = "微信扫一扫，绑定接收信息微信", o.value.key = "wechat", H.value = setInterval(S, 1e3);
      }).catch((t) => {
        q = !1;
      }));
    }, se = async (t, e) => {
      try {
        o.value[e] = await Ce.toDataURL(t, {
          errorCorrectionLevel: "L",
          margin: 0,
          width: 120
        });
      } catch (u) {
        o.value[e] = "", console.error("生成二维码失败", u);
      }
    }, T = r(!1), Q = (t) => {
      De.confirm("确定取消绑定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        T.value || (T.value = !0, be({ unbind_type: [t] }).then((e) => {
          Ve({ message: "取消绑定成功", type: "success" }), S(), T.value = !1;
        }).catch((e) => {
          T.value = !1;
        }));
      });
    }, J = () => {
      clearInterval(H.value), O.value = !1;
    }, V = r(!1), B = r(), j = r(!1), U = r(!0), z = r(!1), $ = r("发送验证码"), g = r(60), d = G({
      mobile: "",
      // 手机号
      code: "",
      // 验证码
      mobile_key: ""
      // 发送验证码返回的key
    }), ae = G({
      mobile: [
        { required: !0, message: "请输入手机号", trigger: "blur" },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "请输入正确的手机号",
          trigger: "blur"
        }
      ],
      code: [
        { required: !0, message: "请输入验证码", trigger: "blur" },
        { pattern: /^\d{4}$/, message: "请输入6位数字验证码", trigger: "blur" }
      ]
    }), oe = (t) => {
      d.mobile = t.replace(/\D/g, "");
    }, ne = async () => {
      try {
        z.value = !0;
        const t = await he({ mobile: d.mobile });
        if (t.data) {
          d.mobile_key = t.data.key || "", U.value = !1, $.value = `${g.value}秒后重新发送`;
          const e = setInterval(() => {
            g.value--, $.value = `${g.value}秒后重新发送`, g.value <= 0 && (clearInterval(e), U.value = !0, $.value = "发送验证码", g.value = 60);
          }, 1e3);
        }
      } catch {
      } finally {
        z.value = !1;
      }
    }, ie = async () => {
      if (B.value)
        try {
          await B.value.validate(), j.value = !0, await xe({
            mobile: d.mobile,
            mobile_key: d.mobile_key,
            mobile_code: d.code
          }) && (V.value = !1, S());
        } catch {
        } finally {
          j.value = !1;
        }
    }, K = () => {
      d.mobile = "", d.code = "", d.mobile_key = "", U.value = !0, $.value = "发送验证码", g.value = 60, B.value && B.value.clearValidate();
    }, ce = () => {
      V.value = !0, K();
    }, P = (t) => {
      if (t.columnIndex === 0)
        return t.row.rowspan ? { rowspan: t.row.rowspan, colspan: 1 } : { rowspan: 0, colspan: 0 };
    };
    N();
    const w = (t, e) => {
      t.type = e, t.status = t["is_" + e], e === "sms" ? (t.bind_sms = o.value.bind_sms, R.value.setFormData(t), R.value.showDialog = !0) : e === "wechat" ? (t.bind_wechat = o.value.bind_wechat, L.value.setFormData(t), L.value.showDialog = !0) : e === "weapp" && (t.bind_weapp = o.value.bind_weapp, A.value.setFormData(t), A.value.showDialog = !0);
    };
    return (t, e) => {
      const u = h("el-table-column"), f = h("el-icon"), E = h("el-table"), M = h("el-card"), m = h("el-button"), X = h("el-image"), W = h("el-dialog"), Y = h("el-input"), Z = h("el-form-item"), de = h("el-form"), re = pe("loading");
      return me((c(), b("div", Be, [
        l(M, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            n("h3", $e, v(i(p)("buyerNotice")), 1),
            n("div", Fe, [
              l(E, {
                data: _.buyer,
                size: "large",
                "span-method": P
              }, {
                default: a(() => [
                  l(u, {
                    prop: "addon_name",
                    label: i(p)("addon"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "name",
                    label: i(p)("noticeType"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(u, {
                    label: i(p)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "300"
                  }, {
                    default: a(({ row: s }) => [
                      n("div", Ie, [
                        s.support_type.indexOf("sms") != -1 ? (c(), b("div", {
                          key: 0,
                          class: "text-sm mr-1 flex items-center cursor-pointer",
                          onClick: (F) => w(s, "sms")
                        }, [
                          l(f, {
                            class: y(["text-[15px] mr-[3px]", s.is_sms ? "open" : ""])
                          }, {
                            default: a(() => [
                              l(i(D))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Se, v(i(p)("sms")), 1)
                        ], 8, Ne)) : k("", !0),
                        s.support_type.indexOf("wechat") != -1 ? (c(), b("div", {
                          key: 1,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (F) => w(s, "wechat")
                        }, [
                          l(f, {
                            class: y(["text-[15px] mr-[3px]", s.is_wechat ? "open" : ""])
                          }, {
                            default: a(() => [
                              l(i(D))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Oe, v(i(p)("wechat")), 1)
                        ], 8, qe)) : k("", !0),
                        s.support_type.indexOf("weapp") != -1 ? (c(), b("div", {
                          key: 2,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (F) => w(s, "weapp")
                        }, [
                          l(f, {
                            class: y(["text-[15px] mr-[3px]", s.is_weapp ? "open" : ""])
                          }, {
                            default: a(() => [
                              l(i(D))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Ue, v(i(p)("weapp")), 1)
                        ], 8, Te)) : k("", !0)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])
            ])
          ]),
          _: 1
        }),
        l(M, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            n("div", Ee, [
              n("h3", Re, v(i(p)("sellerNotice")), 1),
              l(m, {
                type: "primary",
                onClick: ee,
                class: "!text-[12px]"
              }, {
                default: a(() => [
                  x("绑定接收信息账号")
                ]),
                _: 1
              })
            ]),
            n("div", Le, [
              l(E, {
                data: _.seller,
                size: "large",
                "span-method": P
              }, {
                default: a(() => [
                  l(u, {
                    prop: "addon_name",
                    label: i(p)("addon"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "name",
                    label: i(p)("noticeType"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(u, {
                    label: i(p)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "300"
                  }, {
                    default: a(({ row: s }) => [
                      n("div", Ae, [
                        s.support_type.indexOf("sms") != -1 ? (c(), b("div", {
                          key: 0,
                          class: "text-sm mr-1 flex items-center cursor-pointer",
                          onClick: (F) => w(s, "sms")
                        }, [
                          l(f, {
                            class: y(["text-[15px] mr-[3px]", s.is_sms ? "open" : ""])
                          }, {
                            default: a(() => [
                              l(i(D))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", ze, v(i(p)("sms")), 1)
                        ], 8, je)) : k("", !0),
                        s.support_type.indexOf("wechat") != -1 ? (c(), b("div", {
                          key: 1,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (F) => w(s, "wechat")
                        }, [
                          l(f, {
                            class: y(["text-[15px] mr-[3px]", s.is_wechat ? "open" : ""])
                          }, {
                            default: a(() => [
                              l(i(D))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", We, v(i(p)("wechat")), 1)
                        ], 8, Me)) : k("", !0),
                        s.support_type.indexOf("weapp") != -1 ? (c(), b("div", {
                          key: 2,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (F) => w(s, "weapp")
                        }, [
                          l(f, {
                            class: y(["text-[15px] mr-[3px]", s.is_weapp ? "open" : ""])
                          }, {
                            default: a(() => [
                              l(i(D))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", He, v(i(p)("weapp")), 1)
                        ], 8, Ge)) : k("", !0)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])
            ])
          ]),
          _: 1
        }),
        l(we, {
          ref_key: "smsDialog",
          ref: R,
          onComplete: e[0] || (e[0] = (s) => N())
        }, null, 512),
        l(ye, {
          ref_key: "wechatDialog",
          ref: L,
          onComplete: e[1] || (e[1] = (s) => N())
        }, null, 512),
        l(ke, {
          ref_key: "weappDialog",
          ref: A,
          onComplete: e[2] || (e[2] = (s) => N())
        }, null, 512),
        l(W, {
          modelValue: O.value,
          "onUpdate:modelValue": e[3] || (e[3] = (s) => O.value = s),
          onClose: J,
          width: "300"
        }, {
          default: a(() => [
            n("view", Qe, [
              n("span", Je, v(o.value.title), 1),
              o.value.key == "weapp" ? (c(), C(X, {
                key: 0,
                class: "w-[120px] h-[120px]",
                src: o.value.weapp_qrcode,
                fit: t.contain
              }, null, 8, ["src", "fit"])) : (c(), C(X, {
                key: 1,
                class: "w-[120px] h-[120px]",
                src: o.value.wechat_qrcode,
                fit: t.contain
              }, null, 8, ["src", "fit"]))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        l(W, {
          modelValue: I.value,
          "onUpdate:modelValue": e[6] || (e[6] = (s) => I.value = s),
          title: "绑定接收信息账号",
          width: "500px",
          onClose: te
        }, {
          default: a(() => [
            n("div", Ke, [
              n("div", Pe, [
                n("div", Xe, [
                  o.value.bind_sms_info ? (c(), b("span", Ze, "手机号：" + v(o.value.bind_sms_info), 1)) : (c(), b("span", Ye, "手机号"))
                ]),
                Number(o.value.bind_sms) ? (c(), C(m, {
                  key: 1,
                  type: "danger",
                  onClick: e[4] || (e[4] = (s) => Q("sms")),
                  class: "!text-[12px]"
                }, {
                  default: a(() => [
                    x("解绑")
                  ]),
                  _: 1
                })) : (c(), C(m, {
                  key: 0,
                  type: "primary",
                  onClick: ce,
                  class: "!text-[12px]"
                }, {
                  default: a(() => [
                    x("绑定")
                  ]),
                  _: 1
                }))
              ]),
              n("div", et, [
                n("div", tt, [
                  o.value.bind_wechat_info ? (c(), b("span", st, "微信openId：" + v(o.value.bind_wechat_info), 1)) : (c(), b("span", lt, "微信账号"))
                ]),
                Number(o.value.bind_wechat) ? (c(), C(m, {
                  key: 1,
                  type: "danger",
                  onClick: e[5] || (e[5] = (s) => Q("wechat")),
                  class: "!text-[12px]"
                }, {
                  default: a(() => [
                    x("解绑")
                  ]),
                  _: 1
                })) : (c(), C(m, {
                  key: 0,
                  type: "primary",
                  onClick: le,
                  class: "!text-[12px]"
                }, {
                  default: a(() => [
                    x("绑定")
                  ]),
                  _: 1
                }))
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        l(W, {
          modelValue: V.value,
          "onUpdate:modelValue": e[10] || (e[10] = (s) => V.value = s),
          title: "绑定接收信息手机号",
          width: "400px",
          onClose: K
        }, {
          footer: a(() => [
            l(m, {
              onClick: e[9] || (e[9] = (s) => V.value = !1)
            }, {
              default: a(() => [
                x("取消")
              ]),
              _: 1
            }),
            l(m, {
              type: "primary",
              loading: j.value,
              onClick: ie
            }, {
              default: a(() => [
                x(" 确认绑定 ")
              ]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: a(() => [
            l(de, {
              model: d,
              rules: ae,
              ref_key: "smsBindFormRef",
              ref: B,
              "label-width": "80px"
            }, {
              default: a(() => [
                l(Z, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: a(() => [
                    l(Y, {
                      modelValue: d.mobile,
                      "onUpdate:modelValue": e[7] || (e[7] = (s) => d.mobile = s),
                      placeholder: "请输入手机号",
                      maxlength: "11",
                      onInput: oe
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(Z, {
                  label: "验证码",
                  prop: "code"
                }, {
                  default: a(() => [
                    l(Y, {
                      modelValue: d.code,
                      "onUpdate:modelValue": e[8] || (e[8] = (s) => d.code = s),
                      placeholder: "请输入验证码",
                      maxlength: "6",
                      style: { width: "50%" }
                    }, null, 8, ["modelValue"]),
                    l(m, {
                      class: "ml-2",
                      type: "primary",
                      disabled: !U.value || z.value || d.mobile.length !== 11,
                      onClick: ne
                    }, {
                      default: a(() => [
                        x(v($.value), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])), [
        [re, _.loading]
      ]);
    };
  }
});
const ht = /* @__PURE__ */ ge(at, [["__scopeId", "data-v-86aed594"]]);
export {
  ht as default
};
