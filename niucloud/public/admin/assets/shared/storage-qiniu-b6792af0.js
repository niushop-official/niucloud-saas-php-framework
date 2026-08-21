import { defineComponent as C, ref as g, reactive as M, computed as j, resolveComponent as d, resolveDirective as A, openBlock as V, createBlock as h, unref as o, withCtx as i, createElementVNode as q, createVNode as a, createTextVNode as _, toDisplayString as p, withDirectives as F } from "vue";
import { t as l, ej as N, ek as R } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "form-tip" }, O = { class: "dialog-footer" }, X = /* @__PURE__ */ C({
  __name: "storage-qiniu",
  emits: ["complete"],
  setup(T, { expose: w, emit: D }) {
    const c = g(!1), u = g(!0), b = {
      storage_type: "",
      bucket: "",
      access_key: "",
      secret_key: "",
      domain: "",
      is_use: ""
    }, t = M({ ...b }), v = g(), P = j(() => ({
      bucket: [
        { required: !0, message: l("qiniuBucketPlaceholder"), trigger: "blur" }
      ],
      access_key: [
        { required: !0, message: l("qiniuAccessKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: l("qiniuSecretKeyPlaceholder"), trigger: "blur" }
      ],
      endpoint: [
        { required: !0, message: l("aliEndpointPlaceholder"), trigger: "blur" }
      ],
      domain: [
        { required: !0, message: l("domainPlaceholder"), trigger: "blur" }
      ]
    })), U = D, x = async (n) => {
      u.value || !n || await n.validate(async (e) => {
        e && (u.value = !0, N(t).then((y) => {
          u.value = !1, c.value = !1, U("complete");
        }).catch(() => {
          u.value = !1;
        }));
      });
    };
    return w({
      showDialog: c,
      setFormData: async (n = null) => {
        if (u.value = !0, Object.assign(t, b), n) {
          const e = await (await R(n.storage_type)).data;
          Object.keys(t).forEach((s) => {
            e[s] != null && (t[s] = e[s]), e.params[s] != null && (t[s] = e.params[s].value);
          });
        }
        u.value = !1;
      }
    }), (n, e) => {
      const s = d("el-radio"), y = d("el-radio-group"), m = d("el-form-item"), f = d("el-input"), S = d("el-form"), k = d("el-button"), B = d("el-dialog"), K = A("loading");
      return V(), h(B, {
        modelValue: c.value,
        "onUpdate:modelValue": e[7] || (e[7] = (r) => c.value = r),
        title: o(l)("qiniuStorage"),
        width: "580px",
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          q("span", O, [
            a(k, {
              onClick: e[5] || (e[5] = (r) => c.value = !1)
            }, {
              default: i(() => [
                _(p(o(l)("cancel")), 1)
              ]),
              _: 1
            }),
            a(k, {
              type: "primary",
              loading: u.value,
              onClick: e[6] || (e[6] = (r) => x(v.value))
            }, {
              default: i(() => [
                _(p(o(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          F((V(), h(S, {
            model: t,
            "label-width": "140px",
            ref_key: "formRef",
            ref: v,
            rules: P.value,
            class: "page-form"
          }, {
            default: i(() => [
              a(m, {
                label: o(l)("isUse")
              }, {
                default: i(() => [
                  a(y, {
                    modelValue: t.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_use = r)
                  }, {
                    default: i(() => [
                      a(s, { label: "1" }, {
                        default: i(() => [
                          _(p(o(l)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      a(s, { label: "0" }, {
                        default: i(() => [
                          _(p(o(l)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(l)("qiniuBucket"),
                prop: "bucket"
              }, {
                default: i(() => [
                  a(f, {
                    modelValue: t.bucket,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.bucket = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("qiniuBucketPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  q("div", E, p(o(l)("qiniuBucketTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(l)("qiniuAccessKey"),
                prop: "access_key"
              }, {
                default: i(() => [
                  a(f, {
                    modelValue: t.access_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => t.access_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("qiniuAccessKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(l)("qiniuSecretKey"),
                prop: "secret_key"
              }, {
                default: i(() => [
                  a(f, {
                    modelValue: t.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (r) => t.secret_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("qiniuSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(m, {
                label: o(l)("domain"),
                prop: "domain"
              }, {
                default: i(() => [
                  a(f, {
                    modelValue: t.domain,
                    "onUpdate:modelValue": e[4] || (e[4] = (r) => t.domain = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("domainPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [K, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  X as default
};
