import { defineComponent as I, ref as y, reactive as P, computed as T, resolveComponent as p, resolveDirective as D, openBlock as b, createElementBlock as S, createVNode as o, withCtx as n, createElementVNode as l, toDisplayString as _, unref as e, withDirectives as U, createBlock as F, createTextVNode as N } from "vue";
import { t as c, fI as R, fJ as B } from "./core-shared-c6ad4e77.js";
import { useRoute as K } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const M = { class: "main-container" }, j = { class: "flex justify-between items-center" }, E = { class: "text-page-title" }, J = { class: "mt-[20px]" }, $ = { class: "!text-[14px]" }, q = { class: "panel-title !text-sm" }, z = { class: "form-tip" }, A = { class: "form-tip" }, G = { class: "input-width" }, H = { class: "form-tip" }, L = { class: "input-width" }, O = { class: "form-tip" }, Q = { class: "input-width" }, W = { class: "input-width" }, X = { class: "fixed-footer-wrap" }, Y = { class: "fixed-footer" }, pe = /* @__PURE__ */ I({
  __name: "transfer",
  setup(Z) {
    const g = K().meta.title, r = y(!1), t = P({ ...{
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
      s && s.length && (t.wechatpay_config = s[0].config, t.alipay_config = s[1].config), r.value = !1;
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
      r.value || !s || await s.validate(async (a) => {
        a && (r.value = !0, B(t).then((m) => {
          r.value = !1;
        }).catch(() => {
          r.value = !1;
        }));
      });
    };
    return (s, a) => {
      const w = p("el-alert"), m = p("el-card"), h = p("el-input"), d = p("el-form-item"), u = p("upload-file"), x = p("el-form"), C = p("el-button"), k = D("loading");
      return b(), S("div", M, [
        o(m, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            l("div", j, [
              l("span", E, _(e(g)), 1)
            ]),
            l("div", J, [
              o(w, {
                type: "warning",
                "show-icon": ""
              }, {
                title: n(() => [
                  l("span", $, _(e(c)("operationTip")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }),
        U((b(), F(x, {
          class: "page-form",
          model: t,
          "label-width": "200px",
          ref_key: "formRef",
          ref: f,
          rules: e(v)
        }, {
          default: n(() => [
            o(m, {
              class: "box-card mt-[15px] !border-none",
              shadow: "never"
            }, {
              default: n(() => [
                l("h3", q, _(e(c)("wechatpay")), 1),
                o(d, {
                  label: e(c)("mchId"),
                  prop: "wechatpay_config.mch_id"
                }, {
                  default: n(() => [
                    o(h, {
                      modelValue: t.wechatpay_config.mch_id,
                      "onUpdate:modelValue": a[0] || (a[0] = (i) => t.wechatpay_config.mch_id = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(c)("mchIdPlaceholder"),
                      class: "input-width",
                      maxlength: "32",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    l("div", z, _(e(c)("mchIdTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: e(c)("mchSecretKey"),
                  prop: "wechatpay_config.mch_secret_key"
                }, {
                  default: n(() => [
                    o(h, {
                      modelValue: t.wechatpay_config.mch_secret_key,
                      "onUpdate:modelValue": a[1] || (a[1] = (i) => t.wechatpay_config.mch_secret_key = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(c)("mchSecretKeyPlaceholder"),
                      class: "input-width",
                      maxlength: "32",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    l("div", A, _(e(c)("mchSecretKeyTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: e(c)("mchSecretCert"),
                  prop: "wechatpay_config.mch_secret_cert"
                }, {
                  default: n(() => [
                    l("div", G, [
                      o(u, {
                        modelValue: t.wechatpay_config.mch_secret_cert,
                        "onUpdate:modelValue": a[2] || (a[2] = (i) => t.wechatpay_config.mch_secret_cert = i),
                        api: "sys/document/wechat"
                      }, null, 8, ["modelValue"])
                    ]),
                    l("div", H, _(e(c)("mchSecretCertTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: e(c)("mchPublicCertPath"),
                  prop: "wechatpay_config.mch_public_cert_path"
                }, {
                  default: n(() => [
                    l("div", L, [
                      o(u, {
                        modelValue: t.wechatpay_config.mch_public_cert_path,
                        "onUpdate:modelValue": a[3] || (a[3] = (i) => t.wechatpay_config.mch_public_cert_path = i),
                        api: "sys/document/wechat"
                      }, null, 8, ["modelValue"])
                    ]),
                    l("div", O, _(e(c)("mchPublicCertPathTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: e(c)("wechatpayPublicCert"),
                  prop: "wechatpay_config.wechat_public_cert_path"
                }, {
                  default: n(() => [
                    l("div", Q, [
                      o(u, {
                        modelValue: t.wechatpay_config.wechat_public_cert_path,
                        "onUpdate:modelValue": a[4] || (a[4] = (i) => t.wechatpay_config.wechat_public_cert_path = i),
                        api: "sys/document/wechat"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: e(c)("wechatpayPublicCertId"),
                  prop: "wechatpay_config.wechat_public_cert_id"
                }, {
                  default: n(() => [
                    l("div", W, [
                      o(h, {
                        modelValue: t.wechatpay_config.wechat_public_cert_id,
                        "onUpdate:modelValue": a[5] || (a[5] = (i) => t.wechatpay_config.wechat_public_cert_id = i),
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
            o(C, {
              type: "primary",
              loading: r.value,
              onClick: a[6] || (a[6] = (i) => V(f.value))
            }, {
              default: n(() => [
                N(_(e(c)("save")), 1)
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
