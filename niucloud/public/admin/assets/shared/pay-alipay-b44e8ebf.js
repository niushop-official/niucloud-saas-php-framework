import { defineComponent as O, ref as f, reactive as S, computed as F, resolveComponent as c, resolveDirective as M, openBlock as w, createBlock as C, unref as p, withCtx as r, createElementVNode as d, createVNode as i, createTextVNode as D, toDisplayString as h, withDirectives as T } from "vue";
import { t as a, aA as m } from "./core-shared-0b2facad.js";
import { c as A } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "form-tip" }, E = { class: "input-width" }, $ = { class: "input-width" }, z = { class: "input-width" }, G = { class: "dialog-footer" }, ae = /* @__PURE__ */ O({
  __name: "pay-alipay",
  emits: ["complete"],
  setup(H, { expose: x, emit: U }) {
    const n = f(!1), u = f(!0), s = f(null), g = {
      type: "alipay",
      app_id: "",
      config: {
        app_secret_cert: "",
        app_public_cert_path: "",
        alipay_public_cert_path: "",
        alipay_root_cert_path: ""
      },
      channel: "",
      status: 0,
      is_default: 0
    }, e = S({ ...g }), y = f(), k = F(() => ({
      "config.app_id": [
        { required: !0, message: a("appIdPlaceholder"), trigger: "blur" }
      ],
      "config.app_secret_cert": [
        { required: !0, message: a("appSecretCertPlaceholder"), trigger: "blur" }
      ],
      "config.app_public_cert_path": [
        { required: !0, message: a("appPublicCertPathPlaceholder"), trigger: "blur" }
      ],
      "config.alipay_public_cert_path": [
        { required: !0, message: a("alipayPublicCertPathPlaceholder"), trigger: "blur" }
      ],
      "config.alipay_root_cert_path": [
        { required: !0, message: a("alipayRootCertPathPlaceholder"), trigger: "blur" }
      ]
    })), v = U, q = async (l) => {
      u.value || !l || await l.validate(async (t) => {
        t && (v("complete", e), n.value = !1);
      });
    }, N = () => {
      Object.assign(e, g), s.value && (Object.keys(e).forEach((l) => {
        s.value[l] != null && (e[l] = s.value[l]);
      }), e.channel = s.value.redio_key.split("_")[0], e.status = Number(e.status)), v("complete", e), n.value = !1;
    };
    return x({
      showDialog: n,
      setFormData: async (l = null) => {
        s.value = A(l), u.value = !0, Object.assign(e, g), l && (Object.keys(e).forEach((t) => {
          l[t] != null && (e[t] = l[t]);
        }), e.channel = l.redio_key.split("_")[0], e.status = Number(e.status)), u.value = !1;
      },
      enableVerify: () => {
        let l = !0;
        return (m.empty(e.config.app_id) || m.empty(e.config.app_secret_cert) || m.empty(e.config.app_public_cert_path) || m.empty(e.config.alipay_public_cert_path) || m.empty(e.config.alipay_root_cert_path)) && (l = !1), l;
      }
    }), (l, t) => {
      const V = c("el-input"), _ = c("el-form-item"), b = c("upload-file"), R = c("el-form"), P = c("el-button"), j = c("el-dialog"), I = M("loading");
      return w(), C(j, {
        modelValue: n.value,
        "onUpdate:modelValue": t[6] || (t[6] = (o) => n.value = o),
        title: p(a)("updateAlipay"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          d("span", G, [
            i(P, { onClick: N }, {
              default: r(() => [
                D(h(p(a)("cancel")), 1)
              ]),
              _: 1
            }),
            i(P, {
              type: "primary",
              loading: u.value,
              onClick: t[5] || (t[5] = (o) => q(y.value))
            }, {
              default: r(() => [
                D(h(p(a)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          T((w(), C(R, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: k.value,
            class: "page-form"
          }, {
            default: r(() => [
              i(_, {
                label: p(a)("appId"),
                prop: "config.app_id"
              }, {
                default: r(() => [
                  i(V, {
                    modelValue: e.config.app_id,
                    "onUpdate:modelValue": t[0] || (t[0] = (o) => e.config.app_id = o),
                    modelModifiers: { trim: !0 },
                    placeholder: p(a)("appIdPlaceholder"),
                    class: "input-width",
                    maxlength: "32",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  d("div", B, h(p(a)("appIdTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(_, {
                label: p(a)("appSecretCert"),
                prop: "config.app_secret_cert"
              }, {
                default: r(() => [
                  i(V, {
                    modelValue: e.config.app_secret_cert,
                    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.config.app_secret_cert = o),
                    modelModifiers: { trim: !0 },
                    placeholder: p(a)("appSecretCertPlaceholder"),
                    class: "input-width",
                    type: "textarea",
                    rows: "4",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(_, {
                label: p(a)("appPublicCertPath"),
                prop: "config.app_public_cert_path"
              }, {
                default: r(() => [
                  d("div", E, [
                    i(b, {
                      modelValue: e.config.app_public_cert_path,
                      "onUpdate:modelValue": t[2] || (t[2] = (o) => e.config.app_public_cert_path = o),
                      modelModifiers: { trim: !0 },
                      api: "sys/document/aliyun"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              i(_, {
                label: p(a)("alipayPublicCertPath"),
                prop: "config.alipay_public_cert_path"
              }, {
                default: r(() => [
                  d("div", $, [
                    i(b, {
                      modelValue: e.config.alipay_public_cert_path,
                      "onUpdate:modelValue": t[3] || (t[3] = (o) => e.config.alipay_public_cert_path = o),
                      api: "sys/document/aliyun"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              i(_, {
                label: p(a)("alipayRootCertPath"),
                prop: "config.alipay_root_cert_path"
              }, {
                default: r(() => [
                  d("div", z, [
                    i(b, {
                      modelValue: e.config.alipay_root_cert_path,
                      "onUpdate:modelValue": t[4] || (t[4] = (o) => e.config.alipay_root_cert_path = o),
                      api: "sys/document/aliyun"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [I, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  ae as default
};
