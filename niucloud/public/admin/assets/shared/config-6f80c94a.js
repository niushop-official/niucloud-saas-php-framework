import { defineComponent as j, ref as k, reactive as x, computed as K, watch as W, resolveComponent as m, resolveDirective as I, openBlock as b, createElementBlock as L, createVNode as o, withCtx as t, unref as l, withDirectives as Q, createBlock as w, createElementVNode as n, toDisplayString as s, createCommentVNode as P, createTextVNode as g } from "vue";
import { t as e, O as F, aN as G, M as H, aO as J } from "./core-shared-9b1e55e9.js";
import { ElMessage as M } from "element-plus";
import { ArrowLeft as X } from "@element-plus/icons-vue";
import { useRoute as Y, useRouter as Z } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const ee = { class: "main-container" }, le = { class: "panel-title !text-sm" }, oe = { class: "form-tip" }, ae = { class: "panel-title !text-sm" }, te = { class: "form-tip" }, re = { class: "form-tip" }, ie = { class: "form-tip" }, se = { class: "panel-title !text-sm" }, ne = { class: "form-tip" }, de = { class: "form-tip" }, pe = { class: "form-tip" }, ce = { class: "form-tip" }, ue = { class: "form-tip" }, me = { class: "flex" }, _e = { class: "panel-title !text-sm" }, he = { class: "form-tip" }, fe = { class: "fixed-footer-wrap" }, be = { class: "fixed-footer" }, Se = /* @__PURE__ */ j({
  __name: "config",
  setup(ge) {
    const S = Y(), C = Z(), T = S.meta.title, U = () => {
      C.push("/channel/wechat");
    }, _ = k(!0), r = x({
      wechat_name: "",
      wechat_original: "",
      app_id: "",
      app_secret: "",
      qr_code: "",
      token: "",
      encoding_aes_key: "",
      encryption_type: "not_encrypt",
      is_authorization: 0,
      base_uri: ""
    }), y = k(), q = K(() => ({
      wechat_name: [
        { required: !0, message: e("wechatNamePlaceholder"), trigger: "blur" }
      ],
      wechat_original: [
        { required: !0, message: e("wechatOriginalPlaceholder"), trigger: "blur" }
      ],
      app_id: [
        { required: !0, message: e("appidPlaceholder"), trigger: "blur" }
      ],
      app_secret: [
        { required: !r.is_authorization, message: e("appSecretPlaceholder"), trigger: "blur" }
      ],
      token: [
        { required: !0, message: e("tokenPlaceholder"), trigger: "blur" }
      ],
      encoding_aes_key: [
        { required: !0, message: e("encodingAesKeyPlaceholder"), trigger: "blur" }
      ]
    }));
    F().then((u) => {
      Object.assign(r, u.data), _.value = !1;
    });
    const c = x({
      business_domain: "",
      js_secure_domain: "",
      serve_url: "",
      web_auth_domain: ""
    });
    G().then((u) => {
      Object.assign(c, u.data), _.value = !1;
    });
    const { copy: A, isSupported: N, copied: V } = H(), f = (u) => {
      if (!N.value) {
        M({
          message: e("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      A(u);
    };
    W(V, () => {
      V.value && M({
        message: e("copySuccess"),
        type: "success"
      });
    });
    const D = async (u) => {
      _.value || !u || await u.validate(async (a) => {
        a && (_.value = !0, J(r).then(() => {
          _.value = !1;
        }).catch(() => {
          _.value = !1;
        }));
      });
    };
    return (u, a) => {
      const z = m("el-page-header"), h = m("el-card"), p = m("el-input"), d = m("el-form-item"), B = m("upload-image"), v = m("el-radio"), O = m("el-radio-group"), E = m("el-form"), R = m("el-button"), $ = I("loading");
      return b(), L("div", ee, [
        o(h, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: t(() => [
            o(z, {
              content: l(T),
              icon: l(X),
              onBack: a[0] || (a[0] = (i) => U())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        Q((b(), w(E, {
          class: "page-form mt-[15px]",
          model: r,
          "label-width": "150px",
          ref_key: "formRef",
          ref: y,
          rules: q.value
        }, {
          default: t(() => [
            o(h, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: t(() => [
                n("h3", le, s(l(e)("wechatInfo")), 1),
                o(d, {
                  label: l(e)("wechatName"),
                  prop: "wechat_name"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.wechat_name,
                      "onUpdate:modelValue": a[1] || (a[1] = (i) => r.wechat_name = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("wechatNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      readonly: r.is_authorization
                    }, null, 8, ["modelValue", "placeholder", "readonly"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: l(e)("wechatOriginal"),
                  prop: "wechat_original"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.wechat_original,
                      "onUpdate:modelValue": a[2] || (a[2] = (i) => r.wechat_original = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("wechatOriginalPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      readonly: r.is_authorization
                    }, null, 8, ["modelValue", "placeholder", "readonly"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: l(e)("wechatQrcode"),
                  prop: "qr_code"
                }, {
                  default: t(() => [
                    o(B, {
                      modelValue: r.qr_code,
                      "onUpdate:modelValue": a[3] || (a[3] = (i) => r.qr_code = i)
                    }, null, 8, ["modelValue"]),
                    n("div", oe, s(l(e)("wechatQrcodeTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            o(h, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: t(() => [
                n("h3", ae, s(l(e)("wechatDevelopInfo")), 1),
                o(d, {
                  label: l(e)("wechatAppid"),
                  prop: "app_id"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.app_id,
                      "onUpdate:modelValue": a[4] || (a[4] = (i) => r.app_id = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("appidPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      readonly: r.is_authorization
                    }, null, 8, ["modelValue", "placeholder", "readonly"]),
                    n("div", te, s(l(e)("wechatAppidTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r.is_authorization ? P("", !0) : (b(), w(d, {
                  key: 0,
                  label: l(e)("wechatAppsecret"),
                  prop: "app_secret"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.app_secret,
                      "onUpdate:modelValue": a[5] || (a[5] = (i) => r.app_secret = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("appSecretPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    n("div", re, s(l(e)("wechatAppsecretTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])),
                r.is_authorization ? P("", !0) : (b(), w(d, {
                  key: 1,
                  label: l(e)("wechatBaseUri"),
                  prop: "base_uri"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.base_uri,
                      "onUpdate:modelValue": a[6] || (a[6] = (i) => r.base_uri = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("wechatBaseUriPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    n("div", ie, s(l(e)("wechatBaseUriTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]))
              ]),
              _: 1
            }),
            o(h, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: t(() => [
                n("h3", se, s(l(e)("theServerSetting")), 1),
                o(d, { label: "URL" }, {
                  default: t(() => [
                    o(p, {
                      "model-value": c.serve_url,
                      placeholder: "Please input",
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: t(() => [
                        n("div", {
                          class: "cursor-pointer",
                          onClick: a[7] || (a[7] = (i) => f(c.serve_url))
                        }, s(l(e)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"])
                  ]),
                  _: 1
                }),
                o(d, {
                  label: "Token",
                  prop: "token"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.token,
                      "onUpdate:modelValue": a[8] || (a[8] = (i) => r.token = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("tokenPlaceholder"),
                      class: "input-width",
                      maxlength: "32",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    n("div", ne, s(l(e)("tokenTips")), 1)
                  ]),
                  _: 1
                }),
                o(d, {
                  label: "EncodingAESKey",
                  prop: "encoding_aes_key"
                }, {
                  default: t(() => [
                    o(p, {
                      modelValue: r.encoding_aes_key,
                      "onUpdate:modelValue": a[9] || (a[9] = (i) => r.encoding_aes_key = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(e)("encodingAesKeyPlaceholder"),
                      class: "input-width",
                      maxlength: "43",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    n("div", de, s(l(e)("encodingAESKeyTips")), 1)
                  ]),
                  _: 1
                }),
                o(d, {
                  label: l(e)("encryptionType"),
                  prop: "encryption_type"
                }, {
                  default: t(() => [
                    o(O, {
                      modelValue: r.encryption_type,
                      "onUpdate:modelValue": a[10] || (a[10] = (i) => r.encryption_type = i)
                    }, {
                      default: t(() => [
                        o(v, { label: "not_encrypt" }, {
                          default: t(() => [
                            g(s(l(e)("cleartextMode")), 1)
                          ]),
                          _: 1
                        }),
                        o(v, { label: "compatible" }, {
                          default: t(() => [
                            g(s(l(e)("compatibleMode")), 1)
                          ]),
                          _: 1
                        }),
                        o(v, { label: "safe" }, {
                          default: t(() => [
                            g(s(l(e)("safeMode")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    n("div", pe, s(l(e)("cleartextModeTips")), 1),
                    n("div", ce, s(l(e)("compatibleModeTips")), 1),
                    n("div", ue, s(l(e)("safeModeTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            o(h, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: t(() => [
                n("div", me, [
                  n("h3", _e, s(l(e)("functionSetting")), 1)
                ]),
                o(d, { label: "" }, {
                  default: t(() => [
                    n("div", he, s(l(e)("functionSettingTips")), 1)
                  ]),
                  _: 1
                }),
                o(d, {
                  label: l(e)("businessDomain")
                }, {
                  default: t(() => [
                    o(p, {
                      "model-value": c.business_domain,
                      placeholder: "Please input",
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: t(() => [
                        n("div", {
                          class: "cursor-pointer",
                          onClick: a[11] || (a[11] = (i) => f(c.business_domain))
                        }, s(l(e)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: l(e)("jsSecureDomain")
                }, {
                  default: t(() => [
                    o(p, {
                      "model-value": c.js_secure_domain,
                      placeholder: "Please input",
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: t(() => [
                        n("div", {
                          class: "cursor-pointer",
                          onClick: a[12] || (a[12] = (i) => f(c.business_domain))
                        }, s(l(e)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: l(e)("webAuthDomain")
                }, {
                  default: t(() => [
                    o(p, {
                      "model-value": c.web_auth_domain,
                      placeholder: "Please input",
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: t(() => [
                        n("div", {
                          class: "cursor-pointer",
                          onClick: a[13] || (a[13] = (i) => f(c.business_domain))
                        }, s(l(e)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [$, _.value]
        ]),
        n("div", fe, [
          n("div", be, [
            o(R, {
              type: "primary",
              loading: _.value,
              onClick: a[14] || (a[14] = (i) => D(y.value))
            }, {
              default: t(() => [
                g(s(l(e)("save")), 1)
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
  Se as default
};
