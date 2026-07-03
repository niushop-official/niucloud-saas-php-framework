import { defineComponent as A, ref as u, reactive as G, computed as H, watch as J, resolveComponent as m, resolveDirective as L, openBlock as T, createBlock as U, unref as o, withCtx as r, createElementVNode as s, createVNode as i, createTextVNode as j, toDisplayString as n, withDirectives as g, vShow as D } from "vue";
import { a3 as Q, t, M as X, az as b } from "./core-shared-c8d7774e.js";
import { ElMessage as I } from "element-plus";
import { c as Y } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Z = { class: "form-tip" }, ee = { class: "form-tip" }, te = { class: "input-width" }, le = { class: "form-tip" }, oe = { class: "input-width" }, ae = { class: "form-tip" }, ie = { class: "input-width" }, ce = { class: "input-width" }, re = { class: "form-tip !leading-normal" }, se = { class: "form-tip !leading-normal" }, ne = { class: "form-tip !leading-normal" }, de = { class: "dialog-footer" }, we = /* @__PURE__ */ A({
  __name: "pay-wechatpay",
  emits: ["complete"],
  setup(pe, { expose: M, emit: N }) {
    const _ = u(!1), h = u(!0), f = u(""), y = u(""), v = u(null);
    Q().then((a) => {
      f.value = a.data.wap_domain, y.value = a.data.service_domain;
    });
    const w = {
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
    }, e = G({ ...w }), P = u(), q = H(() => ({
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
    })), k = N, E = async (a) => {
      h.value || !a || await a.validate(async (l) => {
        l && (k("complete", e), _.value = !1);
      });
    }, K = () => {
      Object.assign(e, w), v.value && (Object.keys(e).forEach((a) => {
        v.value[a] != null && (e[a] = v.value[a]);
      }), e.channel = v.value.redio_key.split("_")[0], e.status = Number(e.status)), k("complete", e), _.value = !1;
    }, O = async (a = null) => {
      v.value = Y(a), h.value = !0, Object.assign(e, w), a && (Object.keys(e).forEach((l) => {
        a[l] != null && (e[l] = a[l]);
      }), e.channel = a.redio_key.split("_")[0], e.status = Number(e.status)), h.value = !1;
    }, $ = () => {
      let a = !0;
      return (b.empty(e.config.mch_id) || b.empty(e.config.mch_secret_key) || b.empty(e.config.mch_secret_cert) || b.empty(e.config.mch_public_cert_path)) && (a = !1), a;
    }, { copy: R, isSupported: B, copied: S } = X(), V = (a) => {
      if (!B.value) {
        I({
          message: t("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      R(a);
    };
    return J(S, () => {
      S.value && I({
        message: t("copySuccess"),
        type: "success"
      });
    }), M({
      showDialog: _,
      setFormData: O,
      enableVerify: $
    }), (a, l) => {
      const p = m("el-input"), d = m("el-form-item"), C = m("upload-file"), F = m("el-form"), x = m("el-button"), z = m("el-dialog"), W = L("loading");
      return T(), U(z, {
        modelValue: _.value,
        "onUpdate:modelValue": l[10] || (l[10] = (c) => _.value = c),
        title: o(t)("updateWechat"),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          s("span", de, [
            i(x, { onClick: K }, {
              default: r(() => [
                j(n(o(t)("cancel")), 1)
              ]),
              _: 1
            }),
            i(x, {
              type: "primary",
              loading: h.value,
              onClick: l[9] || (l[9] = (c) => E(P.value))
            }, {
              default: r(() => [
                j(n(o(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          g((T(), U(F, {
            model: e,
            "label-width": "140px",
            ref_key: "formRef",
            ref: P,
            rules: q.value,
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
                  s("div", Z, n(o(t)("mchIdTips")), 1)
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
                  s("div", ee, n(o(t)("mchSecretKeyTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("mchSecretCert"),
                prop: "config.mch_secret_cert"
              }, {
                default: r(() => [
                  s("div", te, [
                    i(C, {
                      modelValue: e.config.mch_secret_cert,
                      "onUpdate:modelValue": l[2] || (l[2] = (c) => e.config.mch_secret_cert = c),
                      api: "sys/document/wechat"
                    }, null, 8, ["modelValue"])
                  ]),
                  s("div", le, n(o(t)("mchSecretCertTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("mchPublicCertPath"),
                prop: "config.mch_public_cert_path"
              }, {
                default: r(() => [
                  s("div", oe, [
                    i(C, {
                      modelValue: e.config.mch_public_cert_path,
                      "onUpdate:modelValue": l[3] || (l[3] = (c) => e.config.mch_public_cert_path = c),
                      api: "sys/document/wechat"
                    }, null, 8, ["modelValue"])
                  ]),
                  s("div", ae, n(o(t)("mchPublicCertPathTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(d, {
                label: o(t)("wechatpayPublicCert"),
                prop: "config.wechat_public_cert_path"
              }, {
                default: r(() => [
                  s("div", ie, [
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
                  s("div", ce, [
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
                  s("div", re, n(o(t)("jsapiDirTips")), 1)
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
                  s("div", se, n(o(t)("h5DomainTips")), 1)
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
                    "model-value": y.value,
                    placeholder: "Please input",
                    class: "input-width",
                    readonly: !0,
                    disabled: !0
                  }, {
                    append: r(() => [
                      s("div", {
                        class: "cursor-pointer",
                        onClick: l[8] || (l[8] = (c) => V(y.value))
                      }, n(o(t)("copy")), 1)
                    ]),
                    _: 1
                  }, 8, ["model-value"]),
                  s("div", ne, n(o(t)("nativeDomainTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]), [
                [D, e.channel == "pc"]
              ])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [W, h.value]
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
