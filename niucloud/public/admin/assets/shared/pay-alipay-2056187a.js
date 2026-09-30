import { defineComponent as I, ref as f, reactive as O, computed as S, resolveComponent as c, resolveDirective as F, openBlock as w, createBlock as C, unref as i, withCtx as r, createElementVNode as d, createVNode as p, createTextVNode as D, toDisplayString as h, withDirectives as M } from "vue";
import { t as a, aH as m } from "./core-shared-c6ad4e77.js";
import { c as T } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "form-tip" }, E = { class: "input-width" }, A = { class: "input-width" }, H = { class: "input-width" }, $ = { class: "dialog-footer" }, le = /* @__PURE__ */ I({
  __name: "pay-alipay",
  emits: ["complete"],
  setup(z, { expose: x, emit: y }) {
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
    }, e = O({ ...g }), v = f(), U = S(() => ({
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
    })), k = async (l) => {
      u.value || !l || await l.validate(async (t) => {
        t && (y("complete", e), n.value = !1);
      });
    }, q = () => {
      Object.assign(e, g), s.value && (Object.keys(e).forEach((l) => {
        s.value[l] != null && (e[l] = s.value[l]);
      }), e.channel = s.value.redio_key.split("_")[0], e.status = Number(e.status)), y("complete", e), n.value = !1;
    };
    return x({
      showDialog: n,
      setFormData: async (l = null) => {
        s.value = T(l), u.value = !0, Object.assign(e, g), l && (Object.keys(e).forEach((t) => {
          l[t] != null && (e[t] = l[t]);
        }), e.channel = l.redio_key.split("_")[0], e.status = Number(e.status)), u.value = !1;
      },
      enableVerify: () => {
        let l = !0;
        return (m.empty(e.config.app_id) || m.empty(e.config.app_secret_cert) || m.empty(e.config.app_public_cert_path) || m.empty(e.config.alipay_public_cert_path) || m.empty(e.config.alipay_root_cert_path)) && (l = !1), l;
      }
    }), (l, t) => {
      const V = c("el-input"), _ = c("el-form-item"), b = c("upload-file"), N = c("el-form"), P = c("el-button"), R = c("el-dialog"), j = F("loading");
      return w(), C(R, {
        modelValue: n.value,
        "onUpdate:modelValue": t[6] || (t[6] = (o) => n.value = o),
        title: i(a)("updateAlipay"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          d("span", $, [
            p(P, { onClick: q }, {
              default: r(() => [
                D(h(i(a)("cancel")), 1)
              ]),
              _: 1
            }),
            p(P, {
              type: "primary",
              loading: u.value,
              onClick: t[5] || (t[5] = (o) => k(v.value))
            }, {
              default: r(() => [
                D(h(i(a)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          M((w(), C(N, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: v,
            rules: i(U),
            class: "page-form"
          }, {
            default: r(() => [
              p(_, {
                label: i(a)("appId"),
                prop: "config.app_id"
              }, {
                default: r(() => [
                  p(V, {
                    modelValue: e.config.app_id,
                    "onUpdate:modelValue": t[0] || (t[0] = (o) => e.config.app_id = o),
                    modelModifiers: { trim: !0 },
                    placeholder: i(a)("appIdPlaceholder"),
                    class: "input-width",
                    maxlength: "32",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  d("div", B, h(i(a)("appIdTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              p(_, {
                label: i(a)("appSecretCert"),
                prop: "config.app_secret_cert"
              }, {
                default: r(() => [
                  p(V, {
                    modelValue: e.config.app_secret_cert,
                    "onUpdate:modelValue": t[1] || (t[1] = (o) => e.config.app_secret_cert = o),
                    modelModifiers: { trim: !0 },
                    placeholder: i(a)("appSecretCertPlaceholder"),
                    class: "input-width",
                    type: "textarea",
                    rows: "4",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              p(_, {
                label: i(a)("appPublicCertPath"),
                prop: "config.app_public_cert_path"
              }, {
                default: r(() => [
                  d("div", E, [
                    p(b, {
                      modelValue: e.config.app_public_cert_path,
                      "onUpdate:modelValue": t[2] || (t[2] = (o) => e.config.app_public_cert_path = o),
                      modelModifiers: { trim: !0 },
                      api: "sys/document/aliyun"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              p(_, {
                label: i(a)("alipayPublicCertPath"),
                prop: "config.alipay_public_cert_path"
              }, {
                default: r(() => [
                  d("div", A, [
                    p(b, {
                      modelValue: e.config.alipay_public_cert_path,
                      "onUpdate:modelValue": t[3] || (t[3] = (o) => e.config.alipay_public_cert_path = o),
                      api: "sys/document/aliyun"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              p(_, {
                label: i(a)("alipayRootCertPath"),
                prop: "config.alipay_root_cert_path"
              }, {
                default: r(() => [
                  d("div", H, [
                    p(b, {
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
            [j, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  le as default
};
