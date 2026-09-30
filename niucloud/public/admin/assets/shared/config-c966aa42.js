import { defineComponent as W, ref as w, reactive as G, computed as H, watch as J, resolveComponent as m, resolveDirective as X, openBlock as p, createElementBlock as u, Fragment as Y, createElementVNode as n, createVNode as a, withCtx as t, unref as l, withDirectives as C, createBlock as b, toDisplayString as d, createCommentVNode as g, createTextVNode as y, vShow as Z } from "vue";
import { t as e, aA as ee, a1 as oe, aL as le } from "./core-shared-c6ad4e77.js";
import { ElMessage as A } from "element-plus";
import { ArrowLeft as ae } from "@element-plus/icons-vue";
import { useRoute as te, useRouter as de } from "vue-router";
import ie from "./modify-domain-164efe51.js";
import ne from "./modify-privacy-agreement-03387c58.js";
import "axios";
import "vue-i18n";
import "pinia";
import "./setting-list-eab2dbbc.js";
const re = { class: "main-container" }, se = { class: "panel-title !text-sm" }, pe = { class: "form-tip" }, ue = { class: "panel-title !text-sm" }, ce = { class: "form-tip" }, me = { class: "form-tip" }, _e = { class: "panel-title !text-sm" }, fe = { class: "input-width" }, ve = { class: "form-tip" }, ye = { class: "form-tip" }, he = { class: "panel-title !text-sm" }, be = { class: "form-tip" }, we = { class: "form-tip" }, ge = { class: "form-tip" }, ke = { class: "form-tip" }, xe = { class: "form-tip" }, Ve = { class: "flex items-start justify-between" }, qe = { class: "panel-title !text-sm" }, Ue = { key: 0 }, Pe = { key: 1 }, Ce = { key: 0 }, Ae = { key: 1 }, Te = { key: 0 }, ze = { key: 1 }, Me = { key: 0 }, Se = { key: 1 }, De = { key: 0 }, Re = { key: 1 }, $e = { key: 0 }, Ne = { key: 1 }, Ee = { key: 0 }, Ke = { key: 1 }, Fe = { class: "flex items-start justify-between" }, Be = { class: "panel-title !text-sm" }, Oe = { class: "flex items-center" }, je = { class: "form-tip !mt-0" }, Ie = { class: "fixed-footer-wrap" }, Le = { class: "fixed-footer" }, to = /* @__PURE__ */ W({
  __name: "config",
  setup(Qe) {
    const T = te(), z = de(), M = T.meta.title, S = () => {
      z.push("/channel/weapp");
    }, f = w(!0), o = G({
      weapp_name: "",
      weapp_original: "",
      app_id: "",
      app_secret: "",
      qr_code: "",
      token: "",
      encoding_aes_key: "",
      encryption_type: "not_encrypt",
      serve_url: "",
      request_url: "",
      socket_url: "",
      upload_url: "",
      download_url: "",
      upload_private_key: "",
      is_authorization: 0,
      domain: {
        requestdomain: "",
        wsrequestdomain: "",
        uploaddomain: "",
        downloaddomain: "",
        tcpdomain: "",
        udpdomain: ""
      }
    }), q = w(), D = H(() => ({
      weapp_name: [
        { required: !0, message: e("weappNamePlaceholder"), trigger: "blur" }
      ],
      weapp_original: [
        { required: !0, message: e("weappOriginalPlaceholder"), trigger: "blur" }
      ],
      app_id: [
        { required: !0, message: e("appidPlaceholder"), trigger: "blur" }
      ],
      app_secret: [
        { required: !o.is_authorization, message: e("appSecretPlaceholder"), trigger: "blur" }
      ],
      token: [
        { required: !o.is_authorization, message: e("tokenPlaceholder"), trigger: "blur" }
      ],
      encoding_aes_key: [
        { required: !o.is_authorization, message: e("encodingAesKeyPlaceholder"), trigger: "blur" }
      ]
    }));
    ee().then((_) => {
      Object.assign(o, _.data), f.value = !1;
    });
    const { copy: R, isSupported: $, copied: U } = oe(), h = (_) => {
      if (!$.value) {
        A({
          message: e("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      R(_);
    };
    J(U, () => {
      U.value && A({
        message: e("copySuccess"),
        type: "success"
      });
    });
    const N = async (_) => {
      f.value || !_ || await _.validate(async (i) => {
        i && (f.value = !0, le(o).then(() => {
          f.value = !1;
        }).catch(() => {
          f.value = !1;
        }));
      });
    }, k = w(null), E = () => {
      k.value.setFormData(o.domain), k.value.showDialog = !0;
    }, K = (_) => {
      o.domain = _;
    }, P = w(null), F = () => {
      P.value.setFormData();
    };
    return (_, i) => {
      const B = m("el-page-header"), v = m("el-card"), c = m("el-input"), s = m("el-form-item"), O = m("upload-image"), j = m("upload-file"), x = m("el-radio"), I = m("el-radio-group"), V = m("el-button"), L = m("el-form"), Q = X("loading");
      return p(), u(Y, null, [
        n("div", re, [
          a(v, {
            class: "card !border-none",
            shadow: "never"
          }, {
            default: t(() => [
              a(B, {
                content: l(M),
                icon: l(ae),
                onBack: i[0] || (i[0] = (r) => S())
              }, null, 8, ["content", "icon"])
            ]),
            _: 1
          }),
          C((p(), b(L, {
            class: "page-form mt-[15px]",
            model: o,
            "label-width": "170px",
            ref_key: "formRef",
            ref: q,
            rules: l(D)
          }, {
            default: t(() => [
              a(v, {
                class: "box-card !border-none",
                shadow: "never"
              }, {
                default: t(() => [
                  n("h3", se, d(l(e)("weappInfo")), 1),
                  a(s, {
                    label: l(e)("weappName"),
                    prop: "weapp_name"
                  }, {
                    default: t(() => [
                      a(c, {
                        modelValue: o.weapp_name,
                        "onUpdate:modelValue": i[1] || (i[1] = (r) => o.weapp_name = r),
                        modelModifiers: { trim: !0 },
                        placeholder: l(e)("weappNamePlaceholder"),
                        class: "input-width",
                        clearable: "",
                        readonly: o.is_authorization
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(s, {
                    label: l(e)("weappOriginal"),
                    prop: "weapp_original"
                  }, {
                    default: t(() => [
                      a(c, {
                        modelValue: o.weapp_original,
                        "onUpdate:modelValue": i[2] || (i[2] = (r) => o.weapp_original = r),
                        modelModifiers: { trim: !0 },
                        placeholder: l(e)("weappOriginalPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        readonly: o.is_authorization
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(s, {
                    label: l(e)("weappQrcode"),
                    prop: "qr_code"
                  }, {
                    default: t(() => [
                      a(O, {
                        modelValue: o.qr_code,
                        "onUpdate:modelValue": i[3] || (i[3] = (r) => o.qr_code = r)
                      }, null, 8, ["modelValue"]),
                      n("div", pe, d(l(e)("weappQrcodeTips")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }),
              a(v, {
                class: "box-card !border-none mt-[15px]",
                shadow: "never"
              }, {
                default: t(() => [
                  n("h3", ue, d(l(e)("weappDevelopInfo")), 1),
                  a(s, {
                    label: l(e)("weappAppid"),
                    prop: "app_id"
                  }, {
                    default: t(() => [
                      a(c, {
                        modelValue: o.app_id,
                        "onUpdate:modelValue": i[4] || (i[4] = (r) => o.app_id = r),
                        modelModifiers: { trim: !0 },
                        placeholder: l(e)("appidPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        readonly: o.is_authorization
                      }, null, 8, ["modelValue", "placeholder", "readonly"]),
                      n("div", ce, d(l(e)("weappAppidTips")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o.is_authorization ? g("", !0) : (p(), b(s, {
                    key: 0,
                    label: l(e)("weappAppsecret"),
                    prop: "app_secret"
                  }, {
                    default: t(() => [
                      a(c, {
                        modelValue: o.app_secret,
                        "onUpdate:modelValue": i[5] || (i[5] = (r) => o.app_secret = r),
                        modelModifiers: { trim: !0 },
                        placeholder: l(e)("appSecretPlaceholder"),
                        class: "input-width",
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      n("div", me, d(l(e)("weappAppsecretTips")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]))
                ]),
                _: 1
              }),
              o.is_authorization ? g("", !0) : (p(), b(v, {
                key: 0,
                class: "box-card !border-none mt-[15px]",
                shadow: "never"
              }, {
                default: t(() => [
                  n("h3", _e, d(l(e)("weappUpload")), 1),
                  a(s, {
                    label: l(e)("uploadKey"),
                    prop: "upload_private_key"
                  }, {
                    default: t(() => [
                      n("div", fe, [
                        a(j, {
                          modelValue: o.upload_private_key,
                          "onUpdate:modelValue": i[6] || (i[6] = (r) => o.upload_private_key = r),
                          api: "sys/document/wechat"
                        }, null, 8, ["modelValue"])
                      ]),
                      n("div", ve, d(l(e)("uploadKeyTips")), 1),
                      n("div", ye, d(l(e)("uploadIpTips")) + d(o.upload_ip), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              })),
              C(a(v, {
                class: "box-card !border-none mt-[15px]",
                shadow: "never"
              }, {
                default: t(() => [
                  n("h3", he, d(l(e)("theServerSetting")), 1),
                  a(s, { label: "URL" }, {
                    default: t(() => [
                      a(c, {
                        "model-value": o.serve_url,
                        placeholder: "Please input",
                        class: "input-width",
                        readonly: !0
                      }, {
                        append: t(() => [
                          n("div", {
                            class: "cursor-pointer",
                            onClick: i[7] || (i[7] = (r) => h(o.serve_url))
                          }, d(l(e)("copy")), 1)
                        ]),
                        _: 1
                      }, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  a(s, {
                    label: "Token",
                    prop: "token"
                  }, {
                    default: t(() => [
                      a(c, {
                        modelValue: o.token,
                        "onUpdate:modelValue": i[8] || (i[8] = (r) => o.token = r),
                        modelModifiers: { trim: !0 },
                        placeholder: l(e)("tokenPlaceholder"),
                        class: "input-width",
                        maxlength: "32",
                        "show-word-limit": "",
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      n("div", be, d(l(e)("tokenTips")), 1)
                    ]),
                    _: 1
                  }),
                  a(s, {
                    label: "EncodingAESKey",
                    prop: "encoding_aes_key"
                  }, {
                    default: t(() => [
                      a(c, {
                        modelValue: o.encoding_aes_key,
                        "onUpdate:modelValue": i[9] || (i[9] = (r) => o.encoding_aes_key = r),
                        modelModifiers: { trim: !0 },
                        placeholder: l(e)("encodingAesKeyPlaceholder"),
                        class: "input-width",
                        maxlength: "43",
                        "show-word-limit": "",
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      n("div", we, d(l(e)("encodingAESKeyTips")), 1)
                    ]),
                    _: 1
                  }),
                  a(s, {
                    label: l(e)("encryptionType"),
                    prop: "encryption_type"
                  }, {
                    default: t(() => [
                      a(I, {
                        modelValue: o.encryption_type,
                        "onUpdate:modelValue": i[10] || (i[10] = (r) => o.encryption_type = r)
                      }, {
                        default: t(() => [
                          a(x, { label: "not_encrypt" }, {
                            default: t(() => [
                              y(d(l(e)("cleartextMode")), 1)
                            ]),
                            _: 1
                          }),
                          a(x, { label: "compatible" }, {
                            default: t(() => [
                              y(d(l(e)("compatibleMode")), 1)
                            ]),
                            _: 1
                          }),
                          a(x, { label: "safe" }, {
                            default: t(() => [
                              y(d(l(e)("safeMode")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      n("div", ge, d(l(e)("cleartextModeTips")), 1),
                      n("div", ke, d(l(e)("compatibleModeTips")), 1),
                      n("div", xe, d(l(e)("safeModeTips")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 512), [
                [Z, !o.is_authorization]
              ]),
              a(v, {
                class: "box-card !border-none mt-[15px]",
                shadow: "never"
              }, {
                default: t(() => [
                  n("div", Ve, [
                    n("h3", qe, d(l(e)("functionSetting")), 1),
                    o.is_authorization ? (p(), b(V, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: E
                    }, {
                      default: t(() => [
                        y(d(l(e)("update")), 1)
                      ]),
                      _: 1
                    })) : g("", !0)
                  ]),
                  o.is_authorization ? (p(), u("div", Pe, [
                    a(s, {
                      label: l(e)("requestUrl")
                    }, {
                      default: t(() => [
                        o.domain.requestdomain ? (p(), u("div", Ce, d(o.domain.requestdomain), 1)) : (p(), u("div", Ae, "-"))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("socketUrl")
                    }, {
                      default: t(() => [
                        o.domain.wsrequestdomain ? (p(), u("div", Te, d(o.domain.wsrequestdomain), 1)) : (p(), u("div", ze, "-"))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("uploadUrl")
                    }, {
                      default: t(() => [
                        o.domain.uploaddomain ? (p(), u("div", Me, d(o.domain.uploaddomain), 1)) : (p(), u("div", Se, "-"))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("downloadUrl")
                    }, {
                      default: t(() => [
                        o.domain.downloaddomain ? (p(), u("div", De, d(o.domain.downloaddomain), 1)) : (p(), u("div", Re, "-"))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("udpUrl")
                    }, {
                      default: t(() => [
                        o.domain.udpdomain ? (p(), u("div", $e, d(o.domain.udpdomain), 1)) : (p(), u("div", Ne, "-"))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("tcpUrl")
                    }, {
                      default: t(() => [
                        o.domain.tcpdomain ? (p(), u("div", Ee, d(o.domain.tcpdomain), 1)) : (p(), u("div", Ke, "-"))
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ])) : (p(), u("div", Ue, [
                    a(s, {
                      label: l(e)("requestUrl")
                    }, {
                      default: t(() => [
                        a(c, {
                          "model-value": o.request_url,
                          placeholder: "Please input",
                          class: "input-width",
                          readonly: !0
                        }, {
                          append: t(() => [
                            n("div", {
                              class: "cursor-pointer",
                              onClick: i[11] || (i[11] = (r) => h(o.request_url))
                            }, d(l(e)("copy")), 1)
                          ]),
                          _: 1
                        }, 8, ["model-value"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("socketUrl")
                    }, {
                      default: t(() => [
                        a(c, {
                          "model-value": o.socket_url,
                          placeholder: "Please input",
                          class: "input-width",
                          readonly: !0
                        }, {
                          append: t(() => [
                            n("div", {
                              class: "cursor-pointer",
                              onClick: i[12] || (i[12] = (r) => h(o.socket_url))
                            }, d(l(e)("copy")), 1)
                          ]),
                          _: 1
                        }, 8, ["model-value"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("uploadUrl")
                    }, {
                      default: t(() => [
                        a(c, {
                          "model-value": o.upload_url,
                          placeholder: "Please input",
                          class: "input-width",
                          readonly: !0
                        }, {
                          append: t(() => [
                            n("div", {
                              class: "cursor-pointer",
                              onClick: i[13] || (i[13] = (r) => h(o.upload_url))
                            }, d(l(e)("copy")), 1)
                          ]),
                          _: 1
                        }, 8, ["model-value"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(s, {
                      label: l(e)("downloadUrl")
                    }, {
                      default: t(() => [
                        a(c, {
                          "model-value": o.download_url,
                          placeholder: "Please input",
                          class: "input-width",
                          readonly: !0
                        }, {
                          append: t(() => [
                            n("div", {
                              class: "cursor-pointer",
                              onClick: i[14] || (i[14] = (r) => h(o.download_url))
                            }, d(l(e)("copy")), 1)
                          ]),
                          _: 1
                        }, 8, ["model-value"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]))
                ]),
                _: 1
              }),
              o.is_authorization ? (p(), b(v, {
                key: 1,
                class: "box-card !border-none mt-[15px]",
                shadow: "never"
              }, {
                default: t(() => [
                  n("div", Fe, [
                    n("h3", Be, d(l(e)("serviceContentStatement")), 1)
                  ]),
                  a(s, {
                    label: l(e)("privacyAgreement")
                  }, {
                    default: t(() => [
                      n("div", Oe, [
                        n("div", je, d(l(e)("privacyAgreementTips")), 1),
                        a(V, {
                          type: "primary",
                          link: "",
                          onClick: F
                        }, {
                          default: t(() => [
                            y(d(l(e)("setting")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              })) : g("", !0)
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [Q, f.value]
          ]),
          n("div", Ie, [
            n("div", Le, [
              a(V, {
                type: "primary",
                loading: f.value,
                onClick: i[15] || (i[15] = (r) => N(q.value))
              }, {
                default: t(() => [
                  y(d(l(e)("save")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ])
        ]),
        a(ie, {
          ref_key: "modifyDomainRef",
          ref: k,
          onComplete: K
        }, null, 512),
        a(ne, {
          config: o,
          ref_key: "modifyPrivacyAgreementRef",
          ref: P
        }, null, 8, ["config"])
      ], 64);
    };
  }
});
export {
  to as default
};
