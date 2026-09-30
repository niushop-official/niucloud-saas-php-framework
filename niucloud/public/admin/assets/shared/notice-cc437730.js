import { defineComponent as ve, ref as i, reactive as K, computed as be, resolveComponent as m, resolveDirective as he, withDirectives as ge, openBlock as c, createElementBlock as f, createElementVNode as n, toDisplayString as v, unref as r, Fragment as ye, renderList as xe, normalizeClass as N, createVNode as s, withCtx as o, createBlock as x, createTextVNode as y, createCommentVNode as U, pushScopeId as vt, popScopeId as bt } from "vue";
import { t as b, fa as we, fb as ke, fc as Ce, fd as De, j as Ve, fe as Be, ff as $e, fg as Fe, aO as Ie, a as Se } from "./core-shared-c6ad4e77.js";
import Ne from "./notice-sms-e7832ddf.js";
import Ue from "./notice-wechat-f0a44bc5.js";
import qe from "./notice-weapp-83b0e257.js";
import { b as Te } from "./browser-f778b9ec.js";
import { SuccessFilled as E } from "@element-plus/icons-vue";
import { ElMessageBox as Le, ElMessage as Oe } from "element-plus";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Re = { class: "main-container" }, Ae = { class: "notice-layout" }, Ee = { class: "notice-addon" }, je = { class: "notice-addon__title" }, Me = { class: "notice-addon__list" }, We = ["onClick"], ze = { class: "notice-content" }, Qe = { class: "notice-tabs-bar" }, Ge = { class: "flex" }, He = ["onClick"], Je = { class: "ml-0.5" }, Ke = ["onClick"], Pe = { class: "ml-0.5" }, Xe = ["onClick"], Ye = { class: "ml-0.5" }, Ze = ["onClick"], et = { class: "ml-0.5" }, tt = { class: "flex flex-col justify-center items-center" }, lt = { class: "mb-[15px]" }, at = { class: "account-bind-options" }, st = { class: "option-item" }, ot = { class: "flex flex-col" }, nt = {
  key: 0,
  class: "title"
}, it = {
  key: 1,
  class: "info"
}, ct = { class: "option-item" }, dt = { class: "flex flex-col" }, ut = {
  key: 0,
  class: "title"
}, rt = {
  key: 1,
  class: "info"
}, pt = /* @__PURE__ */ ve({
  __name: "notice",
  setup(_t) {
    const j = i(null), M = i(null), W = i(null), q = i(!1), ae = () => {
      q.value = !0;
    }, se = () => {
      q.value = !1;
    }, p = K({ loading: !0, buyer: [], seller: [] }), P = i([]), C = i(""), T = i("buyer"), oe = be(() => (T.value === "seller" ? p.seller : p.buyer).filter((e) => e.addon_name === C.value)), D = () => {
      p.loading = !0, we({}).then((t) => {
        p.buyer = [], p.seller = [];
        const e = [];
        t.data.forEach((_) => {
          if (_.notice.length) {
            const g = [], u = [];
            Object.keys(_.notice).forEach((R, S) => {
              const k = _.notice[R];
              k.addon_name = _.title, k.receiver_type == 1 ? g.push(k) : u.push(k);
            }), g.length && (g[0].rowspan = g.length, p.buyer = p.buyer.concat(g)), u.length && (u[0].rowspan = u.length, p.seller = p.seller.concat(u)), (g.length || u.length) && _.title && !e.includes(_.title) && e.push(_.title);
          }
        }), P.value = e, e.includes(C.value) || (C.value = e[0] || ""), p.loading = !1;
      }).catch((t) => {
        p.loading = !1;
      });
    }, a = i({
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
    }), V = (t = !1) => {
      ke().then((e) => {
        Object.keys(e.data).length > 0 && (a.value.bind_sms = e.data.mobile ? 1 : 0, a.value.bind_wechat = e.data.wechat_openid ? 1 : 0, a.value.bind_weapp = e.data.weapp_openid ? 1 : 0, a.value.bind_sms_info = e.data.mobile, a.value.bind_wechat_info = e.data.wechat_openid, a.value.bind_weapp_info = e.data.weapp_openid, !t && a.value[`bind_${a.value.key}`] && Y());
      });
    };
    V(!0);
    let h = !1;
    const B = i(!1), z = i(), ne = () => {
      h || (h = !0, Ce().then((t) => {
        var e;
        h = !1, (e = t == null ? void 0 : t.data) != null && e.url && ie(t.data.url, "wechat_qrcode"), B.value = !0, a.value.title = "微信扫一扫，绑定接收信息微信", a.value.key = "wechat", z.value = setInterval(V, 1e3);
      }).catch((t) => {
        h = !1;
      }));
    }, mt = () => {
      h || (h = !0, De().then((t) => {
        var e;
        h = !1, (e = t == null ? void 0 : t.data) != null && e.url && (a.value.weapp_qrcode = Ve(t.data.url)), B.value = !0, a.value.title = "微信扫一扫，绑定接收信息小程序", a.value.key = "weapp", z.value = setInterval(V, 1e3);
      }).catch((t) => {
        h = !1;
      }));
    }, ie = async (t, e) => {
      try {
        a.value[e] = await Te.toDataURL(t, {
          errorCorrectionLevel: "L",
          margin: 0,
          width: 120
        });
      } catch (_) {
        a.value[e] = "", console.error("生成二维码失败", _);
      }
    }, L = i(!1), X = (t) => {
      Le.confirm("确定取消绑定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        L.value || (L.value = !0, Be({ unbind_type: [t] }).then((e) => {
          Oe({ message: "取消绑定成功", type: "success" }), V(), L.value = !1;
        }).catch((e) => {
          L.value = !1;
        }));
      });
    }, Y = () => {
      clearInterval(z.value), B.value = !1;
    }, $ = i(!1), F = i(), Q = i(!1), O = i(!0), G = i(!1), I = i("发送验证码"), w = i(60), d = K({
      mobile: "",
      // 手机号
      code: "",
      // 验证码
      mobile_key: ""
      // 发送验证码返回的key
    }), ce = K({
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
    }), de = (t) => {
      d.mobile = t.replace(/\D/g, "");
    }, ue = async () => {
      try {
        G.value = !0;
        const t = await $e({ mobile: d.mobile });
        if (t.data) {
          d.mobile_key = t.data.key || "", O.value = !1, I.value = `${w.value}秒后重新发送`;
          const e = setInterval(() => {
            w.value--, I.value = `${w.value}秒后重新发送`, w.value <= 0 && (clearInterval(e), O.value = !0, I.value = "发送验证码", w.value = 60);
          }, 1e3);
        }
      } catch {
      } finally {
        G.value = !1;
      }
    }, re = async () => {
      if (F.value)
        try {
          await F.value.validate(), Q.value = !0, await Fe({
            mobile: d.mobile,
            mobile_key: d.mobile_key,
            mobile_code: d.code
          }) && ($.value = !1, V());
        } catch {
        } finally {
          Q.value = !1;
        }
    }, Z = () => {
      d.mobile = "", d.code = "", d.mobile_key = "", O.value = !0, I.value = "发送验证码", w.value = 60, F.value && F.value.clearValidate();
    }, pe = () => {
      $.value = !0, Z();
    };
    D();
    const H = (t, e) => {
      t.type = e, t.status = t["is_" + e], e === "sms" ? (t.bind_sms = a.value.bind_sms, j.value.setFormData(t), j.value.showDialog = !0) : e === "wechat" ? (t.bind_wechat = a.value.bind_wechat, M.value.setFormData(t), M.value.showDialog = !0) : e === "weapp" && (t.bind_weapp = a.value.bind_weapp, W.value.setFormData(t), W.value.showDialog = !0);
    }, _e = (t) => {
      Ie({
        key: t.key,
        type: "message",
        status: t.is_message ? 0 : 1
      }).then(() => {
        t.is_message = t.is_message ? 0 : 1, D();
      }).catch(() => {
      });
    };
    return (t, e) => {
      const _ = m("el-tab-pane"), g = m("el-tabs"), u = m("el-button"), R = m("el-table-column"), S = m("el-icon"), k = m("el-table"), ee = m("el-image"), J = m("el-dialog"), te = m("el-input"), le = m("el-form-item"), me = m("el-form"), fe = he("loading");
      return ge((c(), f("div", Re, [
        n("div", Ae, [
          n("div", Ee, [
            n("div", je, v(r(b)("addon")), 1),
            n("div", Me, [
              (c(!0), f(ye, null, xe(P.value, (l) => (c(), f("div", {
                key: l,
                class: N(["notice-addon__item", { "is-active": l === C.value }]),
                onClick: (A) => C.value = l
              }, v(l), 11, We))), 128))
            ])
          ]),
          n("div", ze, [
            n("div", Qe, [
              s(g, {
                modelValue: T.value,
                "onUpdate:modelValue": e[0] || (e[0] = (l) => T.value = l)
              }, {
                default: o(() => [
                  s(_, {
                    label: r(b)("buyerNotice"),
                    name: "buyer"
                  }, null, 8, ["label"]),
                  s(_, {
                    label: r(b)("sellerNotice"),
                    name: "seller"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              T.value === "seller" ? (c(), x(u, {
                key: 0,
                type: "primary",
                onClick: ae,
                class: "!text-[12px]"
              }, {
                default: o(() => [
                  y("绑定接收信息账号")
                ]),
                _: 1
              })) : U("", !0)
            ]),
            s(k, {
              data: r(oe),
              size: "large"
            }, {
              empty: o(() => [
                n("span", null, v(p.loading ? "" : r(b)("emptyData")), 1)
              ]),
              default: o(() => [
                s(R, {
                  prop: "name",
                  label: r(b)("noticeType"),
                  "min-width": "160"
                }, null, 8, ["label"]),
                s(R, {
                  label: r(b)("operation"),
                  "min-width": "300"
                }, {
                  default: o(({ row: l }) => [
                    n("div", Ge, [
                      l.support_type.indexOf("sms") != -1 ? (c(), f("div", {
                        key: 0,
                        class: "text-sm mr-1 flex items-center cursor-pointer",
                        onClick: (A) => H(l, "sms")
                      }, [
                        s(S, {
                          class: N(["text-[15px] mr-[3px]", l.is_sms ? "open" : ""])
                        }, {
                          default: o(() => [
                            s(r(E))
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        n("span", Je, v(r(b)("sms")), 1)
                      ], 8, He)) : U("", !0),
                      l.support_type.indexOf("wechat") != -1 ? (c(), f("div", {
                        key: 1,
                        class: "text-sm flex items-center cursor-pointer ml-[20px]",
                        onClick: (A) => H(l, "wechat")
                      }, [
                        s(S, {
                          class: N(["text-[15px] mr-[3px]", l.is_wechat ? "open" : ""])
                        }, {
                          default: o(() => [
                            s(r(E))
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        n("span", Pe, v(r(b)("wechat")), 1)
                      ], 8, Ke)) : U("", !0),
                      l.support_type.indexOf("weapp") != -1 ? (c(), f("div", {
                        key: 2,
                        class: "text-sm flex items-center cursor-pointer ml-[20px]",
                        onClick: (A) => H(l, "weapp")
                      }, [
                        s(S, {
                          class: N(["text-[15px] mr-[3px]", l.is_weapp ? "open" : ""])
                        }, {
                          default: o(() => [
                            s(r(E))
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        n("span", Ye, v(r(b)("weapp")), 1)
                      ], 8, Xe)) : U("", !0),
                      l.support_type.indexOf("message") != -1 ? (c(), f("div", {
                        key: 3,
                        class: "text-sm flex items-center cursor-pointer ml-[20px]",
                        onClick: (A) => _e(l)
                      }, [
                        s(S, {
                          class: N(["text-[15px] mr-[3px]", l.is_message ? "open" : ""])
                        }, {
                          default: o(() => [
                            s(r(E))
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        n("span", et, v(r(b)("message")), 1)
                      ], 8, Ze)) : U("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])
          ])
        ]),
        s(Ne, {
          ref_key: "smsDialog",
          ref: j,
          onComplete: e[1] || (e[1] = (l) => D())
        }, null, 512),
        s(Ue, {
          ref_key: "wechatDialog",
          ref: M,
          onComplete: e[2] || (e[2] = (l) => D())
        }, null, 512),
        s(qe, {
          ref_key: "weappDialog",
          ref: W,
          onComplete: e[3] || (e[3] = (l) => D())
        }, null, 512),
        s(J, {
          modelValue: B.value,
          "onUpdate:modelValue": e[4] || (e[4] = (l) => B.value = l),
          onClose: Y,
          width: "300"
        }, {
          default: o(() => [
            n("view", tt, [
              n("span", lt, v(a.value.title), 1),
              a.value.key == "weapp" ? (c(), x(ee, {
                key: 0,
                class: "w-[120px] h-[120px]",
                src: a.value.weapp_qrcode,
                fit: t.contain
              }, null, 8, ["src", "fit"])) : (c(), x(ee, {
                key: 1,
                class: "w-[120px] h-[120px]",
                src: a.value.wechat_qrcode,
                fit: t.contain
              }, null, 8, ["src", "fit"]))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        s(J, {
          modelValue: q.value,
          "onUpdate:modelValue": e[7] || (e[7] = (l) => q.value = l),
          title: "绑定接收信息账号",
          width: "500px",
          onClose: se
        }, {
          default: o(() => [
            n("div", at, [
              n("div", st, [
                n("div", ot, [
                  a.value.bind_sms_info ? (c(), f("span", it, "手机号：" + v(a.value.bind_sms_info), 1)) : (c(), f("span", nt, "手机号"))
                ]),
                Number(a.value.bind_sms) ? (c(), x(u, {
                  key: 1,
                  type: "danger",
                  onClick: e[5] || (e[5] = (l) => X("sms")),
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    y("解绑")
                  ]),
                  _: 1
                })) : (c(), x(u, {
                  key: 0,
                  type: "primary",
                  onClick: pe,
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    y("绑定")
                  ]),
                  _: 1
                }))
              ]),
              n("div", ct, [
                n("div", dt, [
                  a.value.bind_wechat_info ? (c(), f("span", rt, "微信openId：" + v(a.value.bind_wechat_info), 1)) : (c(), f("span", ut, "微信账号"))
                ]),
                Number(a.value.bind_wechat) ? (c(), x(u, {
                  key: 1,
                  type: "danger",
                  onClick: e[6] || (e[6] = (l) => X("wechat")),
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    y("解绑")
                  ]),
                  _: 1
                })) : (c(), x(u, {
                  key: 0,
                  type: "primary",
                  onClick: ne,
                  class: "!text-[12px]"
                }, {
                  default: o(() => [
                    y("绑定")
                  ]),
                  _: 1
                }))
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        s(J, {
          modelValue: $.value,
          "onUpdate:modelValue": e[11] || (e[11] = (l) => $.value = l),
          title: "绑定接收信息手机号",
          width: "400px",
          onClose: Z
        }, {
          footer: o(() => [
            s(u, {
              onClick: e[10] || (e[10] = (l) => $.value = !1)
            }, {
              default: o(() => [
                y("取消")
              ]),
              _: 1
            }),
            s(u, {
              type: "primary",
              loading: Q.value,
              onClick: re
            }, {
              default: o(() => [
                y(" 确认绑定 ")
              ]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: o(() => [
            s(me, {
              model: d,
              rules: ce,
              ref_key: "smsBindFormRef",
              ref: F,
              "label-width": "80px"
            }, {
              default: o(() => [
                s(le, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: o(() => [
                    s(te, {
                      modelValue: d.mobile,
                      "onUpdate:modelValue": e[8] || (e[8] = (l) => d.mobile = l),
                      placeholder: "请输入手机号",
                      maxlength: "11",
                      onInput: de
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                s(le, {
                  label: "验证码",
                  prop: "code"
                }, {
                  default: o(() => [
                    s(te, {
                      modelValue: d.code,
                      "onUpdate:modelValue": e[9] || (e[9] = (l) => d.code = l),
                      placeholder: "请输入验证码",
                      maxlength: "6",
                      style: { width: "50%" }
                    }, null, 8, ["modelValue"]),
                    s(u, {
                      class: "ml-2",
                      type: "primary",
                      disabled: !O.value || G.value || d.mobile.length !== 11,
                      onClick: ue
                    }, {
                      default: o(() => [
                        y(v(I.value), 1)
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
        [fe, p.loading]
      ]);
    };
  }
});
const Ft = /* @__PURE__ */ Se(pt, [["__scopeId", "data-v-f0cf69ba"]]);
export {
  Ft as default
};
