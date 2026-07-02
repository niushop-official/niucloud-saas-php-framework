import { defineComponent as I, ref as y, reactive as P, computed as T, resolveComponent as p, resolveDirective as D, openBlock as b, createElementBlock as S, createVNode as a, withCtx as n, createElementVNode as l, toDisplayString as _, unref as o, withDirectives as U, createBlock as F, createTextVNode as N } from "vue";
import { t as c, fc as R, fd as B } from "./core-shared-ae4a556b.js";
import { useRoute as K } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const M = { class: "main-container" }, j = { class: "flex justify-between items-center" }, E = { class: "text-page-title" }, $ = { class: "mt-[20px]" }, q = { class: "!text-[14px]" }, z = { class: "panel-title !text-sm" }, A = { class: "form-tip" }, G = { class: "form-tip" }, H = { class: "input-width" }, J = { class: "form-tip" }, L = { class: "input-width" }, O = { class: "form-tip" }, Q = { class: "input-width" }, W = { class: "input-width" }, X = { class: "fixed-footer-wrap" }, Y = { class: "fixed-footer" }, pe = /* @__PURE__ */ I({
  __name: "transfer",
  setup(Z) {
    const g = K().meta.title, r = y(!1), e = P({ ...{
      wechatpay_config: {
        mch_id: "",
        mch_secret_key: "",
        mch_secret_cert: "",
        mch_public_cert_path: "",
        wechat_public_cert_path: "",
        wechat_public_cert_id: ""
      },
      alipay_config: {
        app_secret_cert: "",
        app_public_cert_path: "",
        alipay_public_cert_path: "",
        alipay_root_cert_path: "",
        app_id: ""
      }
    } });
    (async () => {
      r.value = !0;
      const s = await (await R("transfer")).data;
      s && s.length && (e.wechatpay_config = s[0].config, e.alipay_config = s[1].config), r.value = !1;
    })();
    const f = y(), v = T(() => ({
      // 'wechatpay_config.mch_id': [
      //     { required: true, message: t('mchIdPlaceholder'), trigger: 'blur' }
      // ],
      // 'wechatpay_config.mch_secret_key': [
      //     { required: true, message: t('mchSecretKeyPlaceholder'), trigger: 'blur' }
      // ],
      // 'wechatpay_config.mch_secret_cert': [
      //     { required: true, message: t('mchSecretCertPlaceholder'), trigger: 'blur' }
      // ],
      // 'wechatpay_config.mch_public_cert_path': [
      //     { required: true, message: t('mchPublicCertPathPlaceholder'), trigger: 'blur' }
      // ],
      // 'alipay_config.app_id': [
      //     { required: true, message: t('appIdPlaceholder'), trigger: 'blur' }
      // ],
      // 'alipay_config.app_secret_cert': [
      //     { required: true, message: t('appSecretCertPlaceholder'), trigger: 'blur' }
      // ],
      // 'alipay_config.app_public_cert_path': [
      //     { required: true, message: t('appPublicCertPathPlaceholder'), trigger: 'blur' }
      // ],
      // 'alipay_config.alipay_public_cert_path': [
      //     { required: true, message: t('alipayPublicCertPathPlaceholder'), trigger: 'blur' }
      // ],
      // 'alipay_config.alipay_root_cert_path': [
      //     { required: true, message: t('alipayRootCertPathPlaceholder'), trigger: 'blur' }
      // ]
    })), V = async (s) => {
      r.value || !s || await s.validate(async (t) => {
        t && (r.value = !0, B(e).then((m) => {
          r.value = !1;
        }).catch(() => {
          r.value = !1;
        }));
      });
    };
    return (s, t) => {
      const w = p("el-alert"), m = p("el-card"), h = p("el-input"), d = p("el-form-item"), u = p("upload-file"), x = p("el-form"), C = p("el-button"), k = D("loading");
      return b(), S("div", M, [
        a(m, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            l("div", j, [
              l("span", E, _(o(g)), 1)
            ]),
            l("div", $, [
              a(w, {
                type: "warning",
                "show-icon": ""
              }, {
                title: n(() => [
                  l("span", q, _(o(c)("operationTip")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }),
        U((b(), F(x, {
          class: "page-form",
          model: e,
          "label-width": "200px",
          ref_key: "formRef",
          ref: f,
          rules: v.value
        }, {
          default: n(() => [
            a(m, {
              class: "box-card mt-[15px] !border-none",
              shadow: "never"
            }, {
              default: n(() => [
                l("h3", z, _(o(c)("wechatpay")), 1),
                a(d, {
                  label: o(c)("mchId"),
                  prop: "wechatpay_config.mch_id"
                }, {
                  default: n(() => [
                    a(h, {
                      modelValue: e.wechatpay_config.mch_id,
                      "onUpdate:modelValue": t[0] || (t[0] = (i) => e.wechatpay_config.mch_id = i),
                      modelModifiers: { trim: !0 },
                      placeholder: o(c)("mchIdPlaceholder"),
                      class: "input-width",
                      maxlength: "32",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    l("div", A, _(o(c)("mchIdTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(d, {
                  label: o(c)("mchSecretKey"),
                  prop: "wechatpay_config.mch_secret_key"
                }, {
                  default: n(() => [
                    a(h, {
                      modelValue: e.wechatpay_config.mch_secret_key,
                      "onUpdate:modelValue": t[1] || (t[1] = (i) => e.wechatpay_config.mch_secret_key = i),
                      modelModifiers: { trim: !0 },
                      placeholder: o(c)("mchSecretKeyPlaceholder"),
                      class: "input-width",
                      maxlength: "32",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    l("div", G, _(o(c)("mchSecretKeyTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(d, {
                  label: o(c)("mchSecretCert"),
                  prop: "wechatpay_config.mch_secret_cert"
                }, {
                  default: n(() => [
                    l("div", H, [
                      a(u, {
                        modelValue: e.wechatpay_config.mch_secret_cert,
                        "onUpdate:modelValue": t[2] || (t[2] = (i) => e.wechatpay_config.mch_secret_cert = i),
                        api: "sys/document/wechat"
                      }, null, 8, ["modelValue"])
                    ]),
                    l("div", J, _(o(c)("mchSecretCertTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(d, {
                  label: o(c)("mchPublicCertPath"),
                  prop: "wechatpay_config.mch_public_cert_path"
                }, {
                  default: n(() => [
                    l("div", L, [
                      a(u, {
                        modelValue: e.wechatpay_config.mch_public_cert_path,
                        "onUpdate:modelValue": t[3] || (t[3] = (i) => e.wechatpay_config.mch_public_cert_path = i),
                        api: "sys/document/wechat"
                      }, null, 8, ["modelValue"])
                    ]),
                    l("div", O, _(o(c)("mchPublicCertPathTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(d, {
                  label: o(c)("wechatpayPublicCert"),
                  prop: "wechatpay_config.wechat_public_cert_path"
                }, {
                  default: n(() => [
                    l("div", Q, [
                      a(u, {
                        modelValue: e.wechatpay_config.wechat_public_cert_path,
                        "onUpdate:modelValue": t[4] || (t[4] = (i) => e.wechatpay_config.wechat_public_cert_path = i),
                        api: "sys/document/wechat"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(d, {
                  label: o(c)("wechatpayPublicCertId"),
                  prop: "wechatpay_config.wechat_public_cert_id"
                }, {
                  default: n(() => [
                    l("div", W, [
                      a(h, {
                        modelValue: e.wechatpay_config.wechat_public_cert_id,
                        "onUpdate:modelValue": t[5] || (t[5] = (i) => e.wechatpay_config.wechat_public_cert_id = i),
                        modelModifiers: { trim: !0 },
                        placeholder: "",
                        class: "input-width",
                        "show-word-limit": "",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [k, r.value]
        ]),
        l("div", X, [
          l("div", Y, [
            a(C, {
              type: "primary",
              loading: r.value,
              onClick: t[6] || (t[6] = (i) => V(f.value))
            }, {
              default: n(() => [
                N(_(o(c)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
export {
  pe as default
};
