import { defineComponent as W, ref as u, reactive as z, computed as A, watch as G, resolveComponent as m, resolveDirective as J, openBlock as x, createBlock as U, unref as o, withCtx as r, createElementVNode as s, createVNode as i, createTextVNode as j, toDisplayString as n, withDirectives as g, vShow as D } from "vue";
import { aw as L, t, a1 as Q, aH as b } from "./core-shared-c6ad4e77.js";
import { ElMessage as I } from "element-plus";
import { c as X } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Y = { class: "form-tip" }, Z = { class: "form-tip" }, ee = { class: "input-width" }, te = { class: "form-tip" }, le = { class: "input-width" }, oe = { class: "form-tip" }, ae = { class: "input-width" }, ie = { class: "input-width" }, ce = { class: "form-tip !leading-normal" }, re = { class: "form-tip !leading-normal" }, se = { class: "form-tip !leading-normal" }, ne = { class: "dialog-footer" }, we = /* @__PURE__ */ W({
  __name: "pay-wechatpay",
  emits: ["complete"],
  setup(de, { expose: N, emit: P }) {
    const _ = u(!1), h = u(!0), f = u(""), w = u(""), v = u(null);
    L().then((a) => {
      f.value = a.data.wap_domain, w.value = a.data.service_domain;
    });
    const y = {
      type: "wechatpay",
      config: {
        mch_id: "",
        mch_secret_key: "",
        mch_secret_cert: "",
        mch_public_cert_path: "",
        wechat_public_cert_path: "",
        wechat_public_cert_id: ""
      },
      channel: "",
      status: 0,
      is_default: 0
    }, e = z({ ...y }), k = u(), q = A(() => ({
      "config.mch_id": [
        { required: !0, message: t("mchIdPlaceholder"), trigger: "blur" }
      ],
      "config.mch_secret_key": [
        { required: !0, message: t("mchSecretKeyPlaceholder"), trigger: "blur" }
      ],
      "config.mch_secret_cert": [
        { required: !0, message: t("mchSecretCertPlaceholder"), trigger: "blur" }
      ],
      "config.mch_public_cert_path": [
        { required: !0, message: t("mchPublicCertPathPlaceholder"), trigger: "blur" }
      ]
    })), E = async (a) => {
      h.value || !a || await a.validate(async (l) => {
        l && (P("complete", e), _.value = !1);
      });
    }, K = () => {
      Object.assign(e, y), v.value && (Object.keys(e).forEach((a) => {
        v.value[a] != null && (e[a] = v.value[a]);
      }), e.channel = v.value.redio_key.split("_")[0], e.status = Number(e.status)), P("complete", e), _.value = !1;
    }, M = async (a = null) => {
      v.value = X(a), h.value = !0, Object.assign(e, y), a && (Object.keys(e).forEach((l) => {
        a[l] != null && (e[l] = a[l]);
      }), e.channel = a.redio_key.split("_")[0], e.status = Number(e.status)), h.value = !1;
    }, O = () => {
      let a = !0;
      return (b.empty(e.config.mch_id) || b.empty(e.config.mch_secret_key) || b.empty(e.config.mch_secret_cert) || b.empty(e.config.mch_public_cert_path)) && (a = !1), a;
    }, { copy: $, isSupported: R, copied: S } = Q(), V = (a) => {
      if (!R.value) {
        I({
          message: t("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      $(a);
    };
    return G(S, () => {
      S.value && I({
        message: t("copySuccess"),
        type: "success"
      });
    }), N({
      showDialog: _,
      setFormData: M,
      enableVerify: O
    }), (a, l) => {
      const p = m("el-input"), d = m("el-form-item"), C = m("upload-file"), B = m("el-form"), T = m("el-button"), F = m("el-dialog"), H = J("loading");
      return x(), U(F, {
        modelValue: _.value,
        "onUpdate:modelValue": l[10] || (l[10] = (c) => _.value = c),
        title: o(t)("updateWechat"),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          s("span", ne, [
            i(T, { onClick: K }, {
              default: r(() => [
                j(n(o(t)("cancel")), 1)
              ]),
              _: 1
            }),
            i(T, {
              type: "primary",
              loading: h.value,
              onClick: l[9] || (l[9] = (c) => E(k.value))
            }, {
              default: r(() => [
                j(n(o(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          g((x(), U(B, {
            model: e,
            "label-width": "140px",
            ref_key: "formRef",
            ref: k,
            rules: o(q),
            class: "page-form"
          }, {
            default: r(() => [
              i(d, {
                label: o(t)("mchId"),
                prop: "config.mch_id"
              }, {
                default: r(() => [
                  i(p, {
                    modelValue: e.config.mch_id,
                    "onUpdate:modelValue": l[0] || (l[0] = (c) => e.config.mch_id = c),
                    modelModifiers: { trim: !0 },
                    placeholder: o(t)("mchIdPlaceholder"),
                    class: "input-width",
                    maxlength: "32",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  s("div", Y, n(o(t)("mchIdTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("mchSecretKey"),
                prop: "config.mch_secret_key"
              }, {
                default: r(() => [
                  i(p, {
                    modelValue: e.config.mch_secret_key,
                    "onUpdate:modelValue": l[1] || (l[1] = (c) => e.config.mch_secret_key = c),
                    modelModifiers: { trim: !0 },
                    placeholder: o(t)("mchSecretKeyPlaceholder"),
                    class: "input-width",
                    maxlength: "32",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  s("div", Z, n(o(t)("mchSecretKeyTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("mchSecretCert"),
                prop: "config.mch_secret_cert"
              }, {
                default: r(() => [
                  s("div", ee, [
                    i(C, {
                      modelValue: e.config.mch_secret_cert,
                      "onUpdate:modelValue": l[2] || (l[2] = (c) => e.config.mch_secret_cert = c),
                      api: "sys/document/wechat"
                    }, null, 8, ["modelValue"])
                  ]),
                  s("div", te, n(o(t)("mchSecretCertTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("mchPublicCertPath"),
                prop: "config.mch_public_cert_path"
              }, {
                default: r(() => [
                  s("div", le, [
                    i(C, {
                      modelValue: e.config.mch_public_cert_path,
                      "onUpdate:modelValue": l[3] || (l[3] = (c) => e.config.mch_public_cert_path = c),
                      api: "sys/document/wechat"
                    }, null, 8, ["modelValue"])
                  ]),
                  s("div", oe, n(o(t)("mchPublicCertPathTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("wechatpayPublicCert"),
                prop: "config.wechat_public_cert_path"
              }, {
                default: r(() => [
                  s("div", ae, [
                    i(C, {
                      modelValue: e.config.wechat_public_cert_path,
                      "onUpdate:modelValue": l[4] || (l[4] = (c) => e.config.wechat_public_cert_path = c),
                      api: "sys/document/wechat"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("wechatpayPublicCertId"),
                prop: "config.wechat_public_cert_id"
              }, {
                default: r(() => [
                  s("div", ie, [
                    i(p, {
                      modelValue: e.config.wechat_public_cert_id,
                      "onUpdate:modelValue": l[5] || (l[5] = (c) => e.config.wechat_public_cert_id = c),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              g(i(d, {
                label: o(t)("jsapiDir")
              }, {
                default: r(() => [
                  i(p, {
                    "model-value": f.value + "/",
                    placeholder: "Please input",
                    class: "input-width",
                    readonly: !0,
                    disabled: !0
                  }, {
                    append: r(() => [
                      s("div", {
                        class: "cursor-pointer",
                        onClick: l[6] || (l[6] = (c) => V(f.value + "/"))
                      }, n(o(t)("copy")), 1)
                    ]),
                    _: 1
                  }, 8, ["model-value"]),
                  s("div", ce, n(o(t)("jsapiDirTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]), [
                [D, e.channel == "wechat" || e.channel == "weapp"]
              ]),
              g(i(d, {
                label: o(t)("h5Domain")
              }, {
                default: r(() => [
                  i(p, {
                    "model-value": f.value.replace("http://", "").replace("https://", ""),
                    placeholder: "Please input",
                    class: "input-width",
                    readonly: !0,
                    disabled: !0
                  }, {
                    append: r(() => [
                      s("div", {
                        class: "cursor-pointer",
                        onClick: l[7] || (l[7] = (c) => V(f.value.replace("http://", "").replace("https://", "")))
                      }, n(o(t)("copy")), 1)
                    ]),
                    _: 1
                  }, 8, ["model-value"]),
                  s("div", re, n(o(t)("h5DomainTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]), [
                [D, e.channel == "h5"]
              ]),
              g(i(d, {
                label: o(t)("nativeDomain")
              }, {
                default: r(() => [
                  i(p, {
                    "model-value": w.value,
                    placeholder: "Please input",
                    class: "input-width",
                    readonly: !0,
                    disabled: !0
                  }, {
                    append: r(() => [
                      s("div", {
                        class: "cursor-pointer",
                        onClick: l[8] || (l[8] = (c) => V(w.value))
                      }, n(o(t)("copy")), 1)
                    ]),
                    _: 1
                  }, 8, ["model-value"]),
                  s("div", se, n(o(t)("nativeDomainTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]), [
                [D, e.channel == "pc"]
              ])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [H, h.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  we as default
};
