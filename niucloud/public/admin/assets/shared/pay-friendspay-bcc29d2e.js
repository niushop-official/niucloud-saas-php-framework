import { defineComponent as j, ref as y, reactive as O, computed as S, resolveComponent as d, resolveDirective as R, openBlock as g, createBlock as h, unref as o, withCtx as r, createElementVNode as b, createVNode as i, createTextVNode as U, toDisplayString as v, withDirectives as G, createElementBlock as I, Fragment as W, createCommentVNode as x } from "vue";
import { t as l, az as u } from "./core-shared-c8d7774e.js";
import { c as $ } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const z = { class: "text-[12px] text-[#999] leading-[20px]" }, A = { class: "dialog-footer" }, oe = /* @__PURE__ */ j({
  __name: "pay-friendspay",
  emits: ["complete"],
  setup(H, { expose: C, emit: D }) {
    const c = y(!1), f = y(!0), s = y(null), w = {
      type: "friendspay",
      app_id: "",
      config: {
        pay_explain_switch: 0,
        pay_info_switch: 1,
        pay_explain_title: "",
        pay_explain_content: "",
        pay_type_name: "",
        pay_page_name: "",
        pay_button_name: "",
        pay_leave_message: "",
        pay_wechat_share_image: "",
        pay_weapp_share_image: ""
      },
      channel: "",
      status: 0,
      is_default: 0
    }, e = O({ ...w }), V = y(), T = S(() => ({
      "config.pay_explain_title": [
        { required: !0, message: l("friendsPayTitlePlaceholder"), trigger: "blur" },
        {
          validator: (n, a, m) => {
            e.config.pay_explain_switch == 1 && a === "" && m(new Error(l("friendsPayTitlePlaceholder"))), m();
          },
          trigger: "blur"
        }
      ],
      "config.pay_explain_content": [
        { required: !0, message: l("desContentPlaceholder"), trigger: "blur" },
        {
          validator: (n, a, m) => {
            e.config.pay_explain_switch == 1 && a === "" && m(new Error(l("desContentPlaceholder"))), m();
          },
          trigger: "blur"
        }
      ],
      "config.pay_type_name": [
        { required: !0, message: l("friendsPayNamePlaceholder"), trigger: "blur" }
      ],
      "config.pay_page_name": [
        { required: !0, message: l("helpNamePlaceholder"), trigger: "blur" }
      ],
      "config.pay_button_name": [
        { required: !0, message: l("helpBtnPlaceholder"), trigger: "blur" }
      ],
      "config.pay_leave_message": [
        { required: !0, message: l("remarkPlaceholder"), trigger: "blur" }
      ]
    })), P = D, q = async (n) => {
      f.value || !n || await n.validate(async (a) => {
        a && (P("complete", e), c.value = !1);
      });
    }, B = () => {
      Object.assign(e, w), s.value && (Object.keys(e).forEach((n) => {
        s.value[n] != null && (e[n] = s.value[n]);
      }), e.channel = s.value.redio_key.split("_")[0], e.status = Number(e.status)), P("complete", e), c.value = !1;
    };
    return C({
      showDialog: c,
      setFormData: async (n = null) => {
        s.value = $(n), f.value = !0, Object.assign(e, w), n && (Object.keys(e).forEach((a) => {
          n[a] != null && (e[a] = n[a]);
        }), e.channel = n.redio_key.split("_")[0], e.status = Number(e.status)), f.value = !1;
      },
      enableVerify: () => {
        let n = !0;
        return (e.config.pay_explain_switch == 1 && u.empty(e.config.pay_explain_title) || e.config.pay_explain_switch == 1 && u.empty(e.config.pay_explain_content) || u.empty(e.config.pay_type_name) || u.empty(e.config.pay_page_name) || u.empty(e.config.pay_button_name) || u.empty(e.config.pay_leave_message)) && (n = !1), n;
      }
    }), (n, a) => {
      const m = d("el-switch"), p = d("el-form-item"), _ = d("el-input"), k = d("upload-image"), M = d("el-form"), N = d("el-button"), E = d("el-dialog"), F = R("loading");
      return g(), h(E, {
        modelValue: c.value,
        "onUpdate:modelValue": a[12] || (a[12] = (t) => c.value = t),
        title: e.config.pay_type_name ? e.config.pay_type_name : o(l)("updateFriendsPay"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          b("span", A, [
            i(N, {
              onClick: a[10] || (a[10] = (t) => B())
            }, {
              default: r(() => [
                U(v(o(l)("cancel")), 1)
              ]),
              _: 1
            }),
            i(N, {
              type: "primary",
              loading: f.value,
              onClick: a[11] || (a[11] = (t) => q(V.value))
            }, {
              default: r(() => [
                U(v(o(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          G((g(), h(M, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: V,
            rules: T.value,
            class: "page-form"
          }, {
            default: r(() => [
              i(p, {
                label: o(l)("friendsPaySwitch")
              }, {
                default: r(() => [
                  i(m, {
                    modelValue: e.config.pay_explain_switch,
                    "onUpdate:modelValue": a[0] || (a[0] = (t) => e.config.pay_explain_switch = t),
                    "active-value": 1,
                    "inactive-value": 0
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              e.config.pay_explain_switch == 1 ? (g(), I(W, { key: 0 }, [
                i(p, {
                  label: o(l)("friendsPayTitle"),
                  prop: "config.pay_explain_title"
                }, {
                  default: r(() => [
                    i(_, {
                      modelValue: e.config.pay_explain_title,
                      "onUpdate:modelValue": a[1] || (a[1] = (t) => e.config.pay_explain_title = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("friendsPayTitlePlaceholder"),
                      class: "input-width",
                      maxlength: "10",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                i(p, {
                  label: o(l)("desContent"),
                  prop: "config.pay_explain_content"
                }, {
                  default: r(() => [
                    i(_, {
                      modelValue: e.config.pay_explain_content,
                      "onUpdate:modelValue": a[2] || (a[2] = (t) => e.config.pay_explain_content = t),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("desContentPlaceholder"),
                      class: "input-width",
                      type: "textarea",
                      rows: "4",
                      maxlength: "120",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ], 64)) : x("", !0),
              i(p, {
                label: o(l)("friendsPayGoodsSwitch")
              }, {
                default: r(() => [
                  b("div", null, [
                    i(m, {
                      modelValue: e.config.pay_info_switch,
                      "onUpdate:modelValue": a[3] || (a[3] = (t) => e.config.pay_info_switch = t),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"]),
                    b("div", z, v(o(l)("friendsPayGoodsSwitchTips")), 1)
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              i(p, {
                label: o(l)("friendsPayName"),
                prop: "config.pay_type_name"
              }, {
                default: r(() => [
                  i(_, {
                    modelValue: e.config.pay_type_name,
                    "onUpdate:modelValue": a[4] || (a[4] = (t) => e.config.pay_type_name = t),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("friendsPayNamePlaceholder"),
                    class: "input-width",
                    maxlength: "10",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(p, {
                label: o(l)("helpName"),
                prop: "config.pay_page_name"
              }, {
                default: r(() => [
                  i(_, {
                    modelValue: e.config.pay_page_name,
                    "onUpdate:modelValue": a[5] || (a[5] = (t) => e.config.pay_page_name = t),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("helpNamePlaceholder"),
                    class: "input-width",
                    maxlength: "10",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(p, {
                label: o(l)("helpBtn"),
                prop: "config.pay_button_name"
              }, {
                default: r(() => [
                  i(_, {
                    modelValue: e.config.pay_button_name,
                    "onUpdate:modelValue": a[6] || (a[6] = (t) => e.config.pay_button_name = t),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("helpBtnPlaceholder"),
                    class: "input-width",
                    maxlength: "10",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(p, {
                label: o(l)("remark"),
                prop: "config.pay_leave_message"
              }, {
                default: r(() => [
                  i(_, {
                    modelValue: e.config.pay_leave_message,
                    "onUpdate:modelValue": a[7] || (a[7] = (t) => e.config.pay_leave_message = t),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("remarkPlaceholder"),
                    class: "input-width",
                    type: "textarea",
                    rows: "4",
                    maxlength: "20",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              s.value.redio_key == "wechat_friendspay" ? (g(), h(p, {
                key: 1,
                label: o(l)("payWechatImage"),
                prop: "config.pay_wechat_share_image"
              }, {
                default: r(() => [
                  i(k, {
                    modelValue: e.config.pay_wechat_share_image,
                    "onUpdate:modelValue": a[8] || (a[8] = (t) => e.config.pay_wechat_share_image = t),
                    limit: 1
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : x("", !0),
              s.value.redio_key == "weapp_friendspay" ? (g(), h(p, {
                key: 2,
                label: o(l)("payWeappImage"),
                prop: "config.pay_weapp_share_image"
              }, {
                default: r(() => [
                  i(k, {
                    modelValue: e.config.pay_weapp_share_image,
                    "onUpdate:modelValue": a[9] || (a[9] = (t) => e.config.pay_weapp_share_image = t),
                    limit: 1
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : x("", !0)
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [F, f.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  oe as default
};
