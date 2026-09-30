import { defineComponent as T, ref as y, reactive as E, computed as I, resolveComponent as m, resolveDirective as W, openBlock as k, createBlock as U, unref as c, withCtx as i, createElementVNode as t, createVNode as o, createTextVNode as d, toDisplayString as u, withDirectives as A, createElementBlock as C, Fragment as J, renderList as G } from "vue";
import { t as x, aJ as H, aK as M } from "./core-shared-c6ad4e77.js";
import K from "./setting-list-eab2dbbc.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const Q = { class: "h-[60vh]" }, X = { class: "text-center text-xl font-bold my-[20px]" }, Y = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "1. 开发者处理的信息", -1), Z = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "根据法律规定，开发者仅处理实现小程序功能所必要的信息。", -1), ee = { class: "setting-list" }, te = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "2. 第三方插件信息/SDK信息", -1), le = { class: "mb-[8px]" }, oe = { class: "mb-[15px]" }, se = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "3. 你的权益", -1), ie = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "3.1 关于收集你的位置信息，你可以通过以下路径：小程序主页右上角“…”—“设置”—点击特定信息—点击“不允许”，撤回对开发者的授权。", -1), ne = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "3.2 关于收集你的微信昵称、头像、收集你的手机号，你可以通过以下路径：小程序主页右上角“...” — “设置” — “小程序已获取的信息” — 点击特定信息 — 点击“通知开发者删除”，开发者承诺收到通知后将删除信息。法律法规另有规定的，开发者承诺将停止除存储和采取必要的安全保护措施之外的处理。", -1), ae = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "3.3 关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。", -1), de = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "3.4 若你在小程序中注册了账号，你可以通过以下方式与开发者联系，申请注销你在小程序中使用的账号。在受理你的申请后，开发者承诺在十五个工作日内完成核查和处理，并按照法律法规要求处理你的相关信息。", -1), _e = /* @__PURE__ */ t("div", { class: "form-tip" }, "信息收集方（开发者）的联系方式，4种联系方式至少要填一种", -1), re = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "4. 开发者对信息的存储", -1), pe = { class: "!w-[200px] inline-block mx-[5px]" }, me = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "5. 信息的使用规则", -1), ce = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "5.1 开发者将会在本指引所明示的用途内使用收集的信息", -1), ue = { class: "mb-[8px]" }, fe = { class: "!w-[180px] inline-block" }, ve = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "6. 信息对外提供", -1), xe = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "6.1 开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。", -1), ge = /* @__PURE__ */ t("div", { class: "mb-[8px]" }, "6.2 开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。", -1), ye = /* @__PURE__ */ t("h4", { class: "text-lg my-[10px]" }, "7. 你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。", -1), ke = { class: "dialog-footer" }, Re = /* @__PURE__ */ T({
  __name: "modify-privacy-agreement",
  props: {
    config: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["complete"],
  setup(b, { expose: L, emit: q }) {
    const be = b, g = y(!1), r = y(!1), V = y(null), h = y(null), w = {
      setting_list: [
        {
          privacy_key: "UserInfo",
          privacy_text: ""
        },
        {
          privacy_key: "Location",
          privacy_text: ""
        },
        {
          privacy_key: "PhoneNumber",
          privacy_text: ""
        }
      ],
      owner_setting: {
        notice_method: ""
      },
      sdk_privacy_info_list: [],
      store_expire_type: 0,
      store_expire_timestamp: ""
    }, e = E({ ...w }), S = y(), R = I(() => ({})), $ = () => {
      e.sdk_privacy_info_list.push({
        sdk_name: "",
        sdk_biz_name: "",
        sdk_list: []
      });
    }, F = (a) => {
      e.sdk_privacy_info_list.splice(a, 1);
    }, N = async (a) => {
      r.value || !a || await a.validate(async (l) => {
        if (l) {
          if (r.value)
            return;
          r.value = !0;
          const n = e;
          n.store_expire_type || (n.owner_setting.store_expire_timestamp = n.store_expire_timestamp), H(n).then((_) => {
            r.value = !1, g.value = !1, q("complete", n);
          }).catch(() => {
            r.value = !1;
          });
        }
      });
    };
    return L({
      showDialog: g,
      setFormData: async () => {
        M().then(({ data: a }) => {
          r.value = !1, Object.assign(e, w), a && (Object.keys(e).forEach((l) => {
            a[l] != null && (e[l] = a[l]);
          }), a.owner_setting.store_expire_timestamp && (e.store_expire_type = 1, e.store_expire_timestamp = a.owner_setting.store_expire_timestamp)), g.value = !0;
        });
      }
    }), (a, l) => {
      const n = m("el-button"), _ = m("el-input"), f = m("el-form-item"), D = m("el-radio"), j = m("el-radio-group"), z = m("el-form"), B = m("el-scrollbar"), O = m("el-dialog"), P = W("loading");
      return k(), U(O, {
        modelValue: g.value,
        "onUpdate:modelValue": l[11] || (l[11] = (s) => g.value = s),
        title: c(x)("privacyAgreementTitle"),
        width: "900px",
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          t("span", ke, [
            o(n, {
              onClick: l[9] || (l[9] = (s) => g.value = !1)
            }, {
              default: i(() => [
                d(u(c(x)("cancel")), 1)
              ]),
              _: 1
            }),
            o(n, {
              type: "primary",
              loading: r.value,
              onClick: l[10] || (l[10] = (s) => N(S.value))
            }, {
              default: i(() => [
                d(u(c(x)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          t("div", Q, [
            o(B, null, {
              default: i(() => [
                A((k(), U(z, {
                  model: e,
                  "label-width": "auto",
                  "label-position": "left",
                  ref_key: "formRef",
                  ref: S,
                  rules: c(R),
                  class: "page-form w-[700px] mx-auto"
                }, {
                  default: i(() => [
                    t("h3", X, u(b.config.weapp_name) + " 小程序隐私保护指引", 1),
                    Y,
                    Z,
                    t("div", ee, [
                      o(K, {
                        modelValue: e.setting_list,
                        "onUpdate:modelValue": l[0] || (l[0] = (s) => e.setting_list = s),
                        ref_key: "settingListRef",
                        ref: V
                      }, null, 8, ["modelValue"])
                    ]),
                    t("div", null, [
                      o(n, {
                        type: "primary",
                        link: "",
                        onClick: l[1] || (l[1] = (s) => V.value.addSettingList())
                      }, {
                        default: i(() => [
                          d(u(c(x)("addSettingType")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    te,
                    t("div", le, " 为实现特定功能，开发者可能会接入由第三方提供的插件/SDK。第三方插件/SDK的个人信息处理规则，请以其公示的官方说明为准。" + u(b.config.weapp_name) + "小程序接入的第三方插件信息/SDK信息如下： ", 1),
                    t("div", null, [
                      (k(!0), C(J, null, G(e.sdk_privacy_info_list, (s, p) => (k(), C("div", oe, [
                        o(f, {
                          label: "SDK名称",
                          class: "!mb-[8px]"
                        }, {
                          default: i(() => [
                            o(_, {
                              modelValue: e.sdk_privacy_info_list[p].sdk_name,
                              "onUpdate:modelValue": (v) => e.sdk_privacy_info_list[p].sdk_name = v,
                              class: "input-width",
                              placeholder: "请输入SDK名称"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            o(n, {
                              type: "primary",
                              class: "ml-[10px]",
                              link: "",
                              onClick: (v) => F(p)
                            }, {
                              default: i(() => [
                                d(u(c(x)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 2
                        }, 1024),
                        o(f, {
                          label: "SDK提供方名称",
                          class: "!mb-[8px]"
                        }, {
                          default: i(() => [
                            o(_, {
                              modelValue: e.sdk_privacy_info_list[p].sdk_biz_name,
                              "onUpdate:modelValue": (v) => e.sdk_privacy_info_list[p].sdk_biz_name = v,
                              class: "input-width",
                              placeholder: "请输入SDK提供方名称"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024),
                        o(K, {
                          modelValue: e.sdk_privacy_info_list[p].sdk_list,
                          "onUpdate:modelValue": (v) => e.sdk_privacy_info_list[p].sdk_list = v,
                          ref_for: !0,
                          ref_key: "sdkSettingListRef",
                          ref: h
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        o(f, {
                          label: "",
                          class: "!mb-[8px]"
                        }, {
                          default: i(() => [
                            o(n, {
                              type: "primary",
                              link: "",
                              onClick: (v) => h.value[p].addSettingList()
                            }, {
                              default: i(() => [
                                d(u(c(x)("addSdkSettingList")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]))), 256))
                    ]),
                    t("div", null, [
                      o(n, {
                        type: "primary",
                        link: "",
                        onClick: $
                      }, {
                        default: i(() => [
                          d(u(c(x)("addSdkInfo")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    se,
                    ie,
                    ne,
                    ae,
                    de,
                    t("div", null, [
                      o(f, {
                        label: "电话",
                        class: "!mb-[8px]"
                      }, {
                        default: i(() => [
                          o(_, {
                            modelValue: e.owner_setting.contact_phone,
                            "onUpdate:modelValue": l[2] || (l[2] = (s) => e.owner_setting.contact_phone = s),
                            class: "input-width",
                            placeholder: "请输入开发者的手机号"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      o(f, {
                        label: "邮箱",
                        class: "!mb-[8px]"
                      }, {
                        default: i(() => [
                          o(_, {
                            modelValue: e.owner_setting.contact_email,
                            "onUpdate:modelValue": l[3] || (l[3] = (s) => e.owner_setting.contact_email = s),
                            class: "input-width",
                            placeholder: "请输入开发者的邮箱"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      o(f, {
                        label: "微信号",
                        class: "!mb-[8px]"
                      }, {
                        default: i(() => [
                          o(_, {
                            modelValue: e.owner_setting.contact_weixin,
                            "onUpdate:modelValue": l[4] || (l[4] = (s) => e.owner_setting.contact_weixin = s),
                            class: "input-width",
                            placeholder: "请输入开发者的微信号"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      o(f, {
                        label: "qq号",
                        class: "!mb-[8px]"
                      }, {
                        default: i(() => [
                          o(_, {
                            modelValue: e.owner_setting.contact_qq,
                            "onUpdate:modelValue": l[5] || (l[5] = (s) => e.owner_setting.contact_qq = s),
                            class: "input-width",
                            placeholder: "请输入开发者的qq号"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      _e
                    ]),
                    re,
                    t("div", null, [
                      o(j, {
                        modelValue: e.store_expire_type,
                        "onUpdate:modelValue": l[7] || (l[7] = (s) => e.store_expire_type = s)
                      }, {
                        default: i(() => [
                          t("div", null, [
                            o(D, { label: 1 }, {
                              default: i(() => [
                                d(" 固定存储期限 "),
                                t("div", pe, [
                                  o(_, {
                                    modelValue: e.store_expire_timestamp,
                                    "onUpdate:modelValue": l[6] || (l[6] = (s) => e.store_expire_timestamp = s)
                                  }, null, 8, ["modelValue"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          t("div", null, [
                            o(D, { label: 0 }, {
                              default: i(() => [
                                d("开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    me,
                    ce,
                    t("div", ue, [
                      d(" 5.2 如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以 "),
                      t("div", fe, [
                        o(_, {
                          modelValue: e.owner_setting.notice_method,
                          "onUpdate:modelValue": l[8] || (l[8] = (s) => e.owner_setting.notice_method = s)
                        }, null, 8, ["modelValue"])
                      ]),
                      d(" 方式告知并征得你的明示同意。")
                    ]),
                    ve,
                    xe,
                    ge,
                    ye
                  ]),
                  _: 1
                }, 8, ["model", "rules"])), [
                  [P, r.value]
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Re as default
};
