import { defineComponent as pe, ref as r, reactive as H, resolveComponent as h, resolveDirective as ue, withDirectives as me, openBlock as c, createElementBlock as b, createVNode as l, withCtx as o, createElementVNode as n, toDisplayString as v, unref as i, normalizeClass as k, createCommentVNode as C, createTextVNode as g, createBlock as D, pushScopeId as rt, popScopeId as pt } from "vue";
import { t as u, eF as _e, eG as fe, eH as ve, eI as be, i as he, eJ as xe, eK as ge, eL as we, _ as ye } from "./core-shared-11c0a673.js";
import ke from "./notice-sms-a87b8266.js";
import Ce from "./notice-wechat-88989c88.js";
import De from "./notice-weapp-67311dae.js";
import { b as Ve } from "./browser-27fdd455.js";
import { SuccessFilled as V } from "@element-plus/icons-vue";
import { ElMessageBox as Be, ElMessage as $e } from "element-plus";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Ie = { class: "main-container" }, Fe = { class: "panel-title !text-sm" }, Se = { class: "flex flex-row flex-wrap" }, Ne = { class: "flex" }, qe = ["onClick"], Ue = { class: "ml-0.5" }, Oe = ["onClick"], Te = { class: "ml-0.5" }, Re = ["onClick"], Ee = { class: "ml-0.5" }, Le = { class: "flex items-center mb-[20px] gap-[10px]" }, Ae = { class: "panel-title !text-sm !mb-[0]" }, We = { class: "flex flex-row flex-wrap" }, je = { class: "flex" }, ze = ["onClick"], Me = { class: "ml-0.5" }, Ge = ["onClick"], He = { class: "ml-0.5" }, Je = ["onClick"], Ke = { class: "ml-0.5" }, Qe = { class: "flex flex-col justify-center items-center" }, Pe = { class: "mb-[15px]" }, Xe = { class: "account-bind-options" }, Ye = { class: "option-item" }, Ze = { class: "flex flex-col" }, et = {
  key: 0,
  class: "title"
}, tt = {
  key: 1,
  class: "info"
}, lt = { class: "option-item" }, at = { class: "flex flex-col" }, st = {
  key: 0,
  class: "title"
}, ot = {
  key: 1,
  class: "info"
}, nt = /* @__PURE__ */ pe({
  __name: "notice",
  setup(it) {
    const E = r(null), L = r(null), A = r(null), q = r(!1), ee = () => {
      q.value = !0;
    }, te = () => {
      q.value = !1;
    }, _ = H({ loading: !0, buyer: [], seller: [] }), U = () => {
      _.loading = !0, _e({}).then((t) => {
        _.buyer = [], _.seller = [], t.data.forEach((e) => {
          if (e.notice.length) {
            const p = [], f = [];
            Object.keys(e.notice).forEach((R, M) => {
              const m = e.notice[R];
              m.addon_name = e.title, m.receiver_type == 1 ? p.push(m) : f.push(m);
            }), p.length && (p[0].rowspan = p.length, _.buyer = _.buyer.concat(p)), f.length && (f[0].rowspan = f.length, _.seller = _.seller.concat(f));
          }
        }), _.loading = !1;
      }).catch((t) => {
        _.loading = !1;
      });
    }, s = r({
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
    }), B = (t = !1) => {
      fe().then((e) => {
        Object.keys(e.data).length > 0 && (s.value.bind_sms = e.data.mobile ? 1 : 0, s.value.bind_wechat = e.data.wechat_openid ? 1 : 0, s.value.bind_weapp = e.data.weapp_openid ? 1 : 0, s.value.bind_sms_info = e.data.mobile, s.value.bind_wechat_info = e.data.wechat_openid, s.value.bind_weapp_info = e.data.weapp_openid, !t && s.value[`bind_${s.value.key}`] && K());
      });
    };
    B(!0);
    let x = !1;
    const $ = r(!1), W = r(), le = () => {
      x || (x = !0, ve().then((t) => {
        var e;
        x = !1, (e = t == null ? void 0 : t.data) != null && e.url && ae(t.data.url, "wechat_qrcode"), $.value = !0, s.value.title = "微信扫一扫，绑定接收信息微信", s.value.key = "wechat", W.value = setInterval(B, 1e3);
      }).catch((t) => {
        x = !1;
      }));
    }, ct = () => {
      x || (x = !0, be().then((t) => {
        var e;
        x = !1, (e = t == null ? void 0 : t.data) != null && e.url && (s.value.weapp_qrcode = he(t.data.url)), $.value = !0, s.value.title = "微信扫一扫，绑定接收信息小程序", s.value.key = "weapp", W.value = setInterval(B, 1e3);
      }).catch((t) => {
        x = !1;
      }));
    }, ae = async (t, e) => {
      try {
        s.value[e] = await Ve.toDataURL(t, {
          errorCorrectionLevel: "L",
          margin: 0,
          width: 120
        });
      } catch (p) {
        s.value[e] = "", console.error("生成二维码失败", p);
      }
    }, O = r(!1), J = (t) => {
      Be.confirm("确定取消绑定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        O.value || (O.value = !0, xe({ unbind_type: [t] }).then((e) => {
          $e({ message: "取消绑定成功", type: "success" }), B(), O.value = !1;
        }).catch((e) => {
          O.value = !1;
        }));
      });
    }, K = () => {
      clearInterval(W.value), $.value = !1;
    }, I = r(!1), F = r(), j = r(!1), T = r(!0), z = r(!1), S = r("发送验证码"), w = r(60), d = H({
      mobile: "",
      // 手机号
      code: "",
      // 验证码
      mobile_key: ""
      // 发送验证码返回的key
    }), se = H({
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
        const t = await ge({ mobile: d.mobile });
        if (t.data) {
          d.mobile_key = t.data.key || "", T.value = !1, S.value = `${w.value}秒后重新发送`;
          const e = setInterval(() => {
            w.value--, S.value = `${w.value}秒后重新发送`, w.value <= 0 && (clearInterval(e), T.value = !0, S.value = "发送验证码", w.value = 60);
          }, 1e3);
        }
      } catch {
      } finally {
        z.value = !1;
      }
    }, ie = async () => {
      if (F.value)
        try {
          await F.value.validate(), j.value = !0, await we({
            mobile: d.mobile,
            mobile_key: d.mobile_key,
            mobile_code: d.code
          }) && (I.value = !1, B());
        } catch {
        } finally {
          j.value = !1;
        }
    }, Q = () => {
      d.mobile = "", d.code = "", d.mobile_key = "", T.value = !0, S.value = "发送验证码", w.value = 60, F.value && F.value.clearValidate();
    }, ce = () => {
      I.value = !0, Q();
    }, P = (t) => {
      if (t.columnIndex === 0)
        return t.row.rowspan ? { rowspan: t.row.rowspan, colspan: 1 } : { rowspan: 0, colspan: 0 };
    };
    U();
    const y = (t, e) => {
      t.type = e, t.status = t["is_" + e], e === "sms" ? (t.bind_sms = s.value.bind_sms, E.value.setFormData(t), E.value.showDialog = !0) : e === "wechat" ? (t.bind_wechat = s.value.bind_wechat, L.value.setFormData(t), L.value.showDialog = !0) : e === "weapp" && (t.bind_weapp = s.value.bind_weapp, A.value.setFormData(t), A.value.showDialog = !0);
    };
    return (t, e) => {
      const p = h("el-table-column"), f = h("el-icon"), R = h("el-table"), M = h("el-card"), m = h("el-button"), X = h("el-image"), G = h("el-dialog"), Y = h("el-input"), Z = h("el-form-item"), de = h("el-form"), re = ue("loading");
      return me((c(), b("div", Ie, [
        l(M, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            n("h3", Fe, v(i(u)("buyerNotice")), 1),
            n("div", Se, [
              l(R, {
                data: _.buyer,
                size: "large",
                "span-method": P
              }, {
                default: o(() => [
                  l(p, {
                    prop: "addon_name",
                    label: i(u)("addon"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(p, {
                    prop: "name",
                    label: i(u)("noticeType"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(p, {
                    label: i(u)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "300"
                  }, {
                    default: o(({ row: a }) => [
                      n("div", Ne, [
                        a.support_type.indexOf("sms") != -1 ? (c(), b("div", {
                          key: 0,
                          class: "text-sm mr-1 flex items-center cursor-pointer",
                          onClick: (N) => y(a, "sms")
                        }, [
                          l(f, {
                            class: k(["text-[15px] mr-[3px]", a.is_sms ? "open" : ""])
                          }, {
                            default: o(() => [
                              l(i(V))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Ue, v(i(u)("sms")), 1)
                        ], 8, qe)) : C("", !0),
                        a.support_type.indexOf("wechat") != -1 ? (c(), b("div", {
                          key: 1,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (N) => y(a, "wechat")
                        }, [
                          l(f, {
                            class: k(["text-[15px] mr-[3px]", a.is_wechat ? "open" : ""])
                          }, {
                            default: o(() => [
                              l(i(V))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Te, v(i(u)("wechat")), 1)
                        ], 8, Oe)) : C("", !0),
                        a.support_type.indexOf("weapp") != -1 ? (c(), b("div", {
                          key: 2,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (N) => y(a, "weapp")
                        }, [
                          l(f, {
                            class: k(["text-[15px] mr-[3px]", a.is_weapp ? "open" : ""])
                          }, {
                            default: o(() => [
                              l(i(V))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Ee, v(i(u)("weapp")), 1)
                        ], 8, Re)) : C("", !0)
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
          default: o(() => [
            n("div", Le, [
              n("h3", Ae, v(i(u)("sellerNotice")), 1),
              l(m, {
                type: "primary",
                onClick: ee,
                class: "!text-[12px]"
              }, {
                default: o(() => [
                  g("绑定接收信息账号")
                ]),
                _: 1
              })
            ]),
            n("div", We, [
              l(R, {
                data: _.seller,
                size: "large",
                "span-method": P
              }, {
                default: o(() => [
                  l(p, {
                    prop: "addon_name",
                    label: i(u)("addon"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(p, {
                    prop: "name",
                    label: i(u)("noticeType"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(p, {
                    label: i(u)("operation"),
                    align: "right",
                    fixed: "right",
                    "min-width": "300"
                  }, {
                    default: o(({ row: a }) => [
                      n("div", je, [
                        a.support_type.indexOf("sms") != -1 ? (c(), b("div", {
                          key: 0,
                          class: "text-sm mr-1 flex items-center cursor-pointer",
                          onClick: (N) => y(a, "sms")
                        }, [
                          l(f, {
                            class: k(["text-[15px] mr-[3px]", a.is_sms ? "open" : ""])
                          }, {
                            default: o(() => [
                              l(i(V))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Me, v(i(u)("sms")), 1)
                        ], 8, ze)) : C("", !0),
                        a.support_type.indexOf("wechat") != -1 ? (c(), b("div", {
                          key: 1,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (N) => y(a, "wechat")
                        }, [
                          l(f, {
                            class: k(["text-[15px] mr-[3px]", a.is_wechat ? "open" : ""])
                          }, {
                            default: o(() => [
                              l(i(V))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", He, v(i(u)("wechat")), 1)
                        ], 8, Ge)) : C("", !0),
                        a.support_type.indexOf("weapp") != -1 ? (c(), b("div", {
                          key: 2,
                          class: "text-sm flex items-center cursor-pointer ml-[20px]",
                          onClick: (N) => y(a, "weapp")
                        }, [
                          l(f, {
                            class: k(["text-[15px] mr-[3px]", a.is_weapp ? "open" : ""])
                          }, {
                            default: o(() => [
                              l(i(V))
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          n("span", Ke, v(i(u)("weapp")), 1)
                        ], 8, Je)) : C("", !0)
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
        l(ke, {
          ref_key: "smsDialog",
          ref: E,
          onComplete: e[0] || (e[0] = (a) => U())
        }, null, 512),
        l(Ce, {
          ref_key: "wechatDialog",
          ref: L,
          onComplete: e[1] || (e[1] = (a) => U())
        }, null, 512),
        l(De, {
          ref_key: "weappDialog",
          ref: A,
          onComplete: e[2] || (e[2] = (a) => U())
        }, null, 512),
        l(G, {
          modelValue: $.value,
          "onUpdate:modelValue": e[3] || (e[3] = (a) => $.value = a),
          onClose: K,
          width: "300"
        }, {
          default: o(() => [
            n("view", Qe, [
              n("span", Pe, v(s.value.title), 1),
              s.value.key == "weapp" ? (c(), D(X, {
                key: 0,
                class: "w-[120px] h-[120px]",
                src: s.value.weapp_qrcode,
                fit: t.contain
              }, null, 8, ["src", "fit"])) : (c(), D(X, {
                key: 1,
                class: "w-[120px] h-[120px]",
                src: s.value.wechat_qrcode,
                fit: t.contain
              }, null, 8, ["src", "fit"]))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        l(G, {
          modelValue: q.value,
          "onUpdate:modelValue": e[6] || (e[6] = (a) => q.value = a),
          title: "绑定接收信息账号",
          width: "500px",
          onClose: te
        }, {
          default: o(() => [
            n("div", Xe, [
              n("div", Ye, [
                n("div", Ze, [
                  s.value.bind_sms_info ? (c(), b("span", tt, "手机号：" + v(s.value.bind_sms_info), 1)) : (c(), b("span", et, "手机号"))
                ]),
                Number(s.value.bind_sms) ? (c(), D(m, {
                  key: 1,
                  type: "danger",
                  onClick: e[4] || (e[4] = (a) => J("sms")),
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    g("解绑")
                  ]),
                  _: 1
                })) : (c(), D(m, {
                  key: 0,
                  type: "primary",
                  onClick: ce,
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    g("绑定")
                  ]),
                  _: 1
                }))
              ]),
              n("div", lt, [
                n("div", at, [
                  s.value.bind_wechat_info ? (c(), b("span", ot, "微信openId：" + v(s.value.bind_wechat_info), 1)) : (c(), b("span", st, "微信账号"))
                ]),
                Number(s.value.bind_wechat) ? (c(), D(m, {
                  key: 1,
                  type: "danger",
                  onClick: e[5] || (e[5] = (a) => J("wechat")),
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    g("解绑")
                  ]),
                  _: 1
                })) : (c(), D(m, {
                  key: 0,
                  type: "primary",
                  onClick: le,
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    g("绑定")
                  ]),
                  _: 1
                }))
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        l(G, {
          modelValue: I.value,
          "onUpdate:modelValue": e[10] || (e[10] = (a) => I.value = a),
          title: "绑定接收信息手机号",
          width: "400px",
          onClose: Q
        }, {
          footer: o(() => [
            l(m, {
              onClick: e[9] || (e[9] = (a) => I.value = !1)
            }, {
              default: o(() => [
                g("取消")
              ]),
              _: 1
            }),
            l(m, {
              type: "primary",
              loading: j.value,
              onClick: ie
            }, {
              default: o(() => [
                g(" 确认绑定 ")
              ]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: o(() => [
            l(de, {
              model: d,
              rules: se,
              ref_key: "smsBindFormRef",
              ref: F,
              "label-width": "80px"
            }, {
              default: o(() => [
                l(Z, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: o(() => [
                    l(Y, {
                      modelValue: d.mobile,
                      "onUpdate:modelValue": e[7] || (e[7] = (a) => d.mobile = a),
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
                  default: o(() => [
                    l(Y, {
                      modelValue: d.code,
                      "onUpdate:modelValue": e[8] || (e[8] = (a) => d.code = a),
                      placeholder: "请输入验证码",
                      maxlength: "6",
                      style: { width: "50%" }
                    }, null, 8, ["modelValue"]),
                    l(m, {
                      class: "ml-2",
                      type: "primary",
                      disabled: !T.value || z.value || d.mobile.length !== 11,
                      onClick: ne
                    }, {
                      default: o(() => [
                        g(v(S.value), 1)
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
const kt = /* @__PURE__ */ ye(nt, [["__scopeId", "data-v-86aed594"]]);
export {
  kt as default
};
