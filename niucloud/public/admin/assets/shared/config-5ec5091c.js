import { defineComponent as E, ref as v, reactive as M, watch as B, resolveComponent as u, resolveDirective as R, openBlock as h, createElementBlock as $, createVNode as e, withCtx as s, unref as l, withDirectives as O, createBlock as W, createElementVNode as n, toDisplayString as d, createTextVNode as g } from "vue";
import { $ as L, a0 as Q, a1 as j, t as a, a2 as I } from "./core-shared-c6ad4e77.js";
import { ElMessage as V } from "element-plus";
import { ArrowLeft as z } from "@element-plus/icons-vue";
import { useRoute as F, useRouter as G } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const H = { class: "main-container" }, J = { class: "panel-title !text-sm" }, X = { class: "form-tip" }, Y = { class: "panel-title !text-sm" }, Z = { class: "input-width" }, ee = { class: "form-tip" }, le = { class: "input-width" }, ae = { class: "form-tip" }, te = { class: "input-width" }, oe = { class: "form-tip" }, ie = { class: "panel-title !text-sm" }, se = { class: "panel-title !text-sm" }, ne = { class: "fixed-footer-wrap" }, de = { class: "fixed-footer" }, ve = /* @__PURE__ */ E({
  __name: "config",
  setup(re) {
    const w = F(), k = G(), x = w.meta.title, C = () => {
      k.push("/channel/aliapp");
    }, c = v(!0), o = M({
      name: "",
      qrcode: "",
      private_key: "",
      app_id: "",
      aes_key: "",
      public_key_crt: "",
      alipay_public_key_crt: "",
      alipay_with_crt: "",
      request_url: ""
    }), y = v();
    L().then((p) => {
      Object.assign(o, p.data), c.value = !1;
    }), Q().then((p) => {
      o.request_url = p.data.domain;
    });
    const { copy: S, isSupported: U, copied: b } = j(), q = (p) => {
      if (!U.value) {
        V({
          message: a("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      S(p);
    };
    B(b, () => {
      b.value && V({
        message: a("copySuccess"),
        type: "success"
      });
    });
    const A = async (p) => {
      c.value || !p || await p.validate(async (t) => {
        t && (c.value = !0, I(o).then(() => {
          c.value = !1;
        }).catch(() => {
          c.value = !1;
        }));
      });
    };
    return (p, t) => {
      const K = u("el-page-header"), m = u("el-card"), _ = u("el-input"), r = u("el-form-item"), N = u("upload-image"), f = u("upload-file"), P = u("el-form"), T = u("el-button"), D = R("loading");
      return h(), $("div", H, [
        e(m, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            e(K, {
              content: l(x),
              icon: l(z),
              onBack: t[0] || (t[0] = (i) => C())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        O((h(), W(P, {
          class: "page-form mt-[15px]",
          model: o,
          "label-width": "150px",
          ref_key: "formRef",
          ref: y
        }, {
          default: s(() => [
            e(m, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: s(() => [
                n("h3", J, d(l(a)("aliappSet")), 1),
                e(r, {
                  label: l(a)("aliappName")
                }, {
                  default: s(() => [
                    e(_, {
                      modelValue: o.name,
                      "onUpdate:modelValue": t[1] || (t[1] = (i) => o.name = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(a)("aliappNamePlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(r, {
                  label: l(a)("aliappQrcode")
                }, {
                  default: s(() => [
                    e(N, {
                      modelValue: o.qrcode,
                      "onUpdate:modelValue": t[2] || (t[2] = (i) => o.qrcode = i)
                    }, null, 8, ["modelValue"]),
                    n("div", X, d(l(a)("aliappQrcodeTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            e(m, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: s(() => [
                n("h3", Y, d(l(a)("aliappDevelopInfo")), 1),
                e(r, {
                  label: l(a)("aliappOriginal")
                }, {
                  default: s(() => [
                    e(_, {
                      modelValue: o.private_key,
                      "onUpdate:modelValue": t[3] || (t[3] = (i) => o.private_key = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(a)("aliappOriginalPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(r, {
                  label: l(a)("aliappAppid")
                }, {
                  default: s(() => [
                    e(_, {
                      modelValue: o.app_id,
                      "onUpdate:modelValue": t[4] || (t[4] = (i) => o.app_id = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(a)("appidPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(r, {
                  label: l(a)("countersignType")
                }, {
                  default: s(() => [
                    g(d(l(a)("certificate")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(r, {
                  label: l(a)("publicKey")
                }, {
                  default: s(() => [
                    n("div", Z, [
                      e(f, {
                        modelValue: o.public_key_crt,
                        "onUpdate:modelValue": t[5] || (t[5] = (i) => o.public_key_crt = i),
                        api: "sys/document/aliyun"
                      }, null, 8, ["modelValue"])
                    ]),
                    n("div", ee, d(l(a)("publicKeyTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(r, {
                  label: l(a)("alipayPublicKey")
                }, {
                  default: s(() => [
                    n("div", le, [
                      e(f, {
                        modelValue: o.alipay_public_key_crt,
                        "onUpdate:modelValue": t[6] || (t[6] = (i) => o.alipay_public_key_crt = i),
                        api: "sys/document/aliyun"
                      }, null, 8, ["modelValue"])
                    ]),
                    n("div", ae, d(l(a)("alipayPublicKeyTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(r, {
                  label: l(a)("alipayWithCrt")
                }, {
                  default: s(() => [
                    n("div", te, [
                      e(f, {
                        modelValue: o.alipay_with_crt,
                        "onUpdate:modelValue": t[7] || (t[7] = (i) => o.alipay_with_crt = i),
                        api: "sys/document/aliyun"
                      }, null, 8, ["modelValue"])
                    ]),
                    n("div", oe, d(l(a)("alipayWithCrtTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            e(m, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: s(() => [
                n("h3", ie, d(l(a)("theServerSetting")), 1),
                e(r, { label: "AESKey" }, {
                  default: s(() => [
                    e(_, {
                      modelValue: o.aes_key,
                      "onUpdate:modelValue": t[8] || (t[8] = (i) => o.aes_key = i),
                      modelModifiers: { trim: !0 },
                      placeholder: l(a)("AESKeyPlaceholder"),
                      class: "input-width",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e(m, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: s(() => [
                n("h3", se, d(l(a)("functionSetting")), 1),
                e(r, {
                  label: l(a)("serveWhiteList")
                }, {
                  default: s(() => [
                    e(_, {
                      "model-value": o.request_url,
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: s(() => [
                        n("div", {
                          class: "cursor-pointer",
                          onClick: t[9] || (t[9] = (i) => q(o.request_url))
                        }, d(l(a)("copy")), 1)
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
        }, 8, ["model"])), [
          [D, c.value]
        ]),
        n("div", ne, [
          n("div", de, [
            e(T, {
              type: "primary",
              loading: c.value,
              onClick: t[10] || (t[10] = (i) => A(y.value))
            }, {
              default: s(() => [
                g(d(l(a)("save")), 1)
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
  ve as default
};
