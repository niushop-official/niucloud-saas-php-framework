import { defineComponent as C, ref as g, reactive as E, computed as M, resolveComponent as n, resolveDirective as A, openBlock as k, createBlock as w, unref as a, withCtx as i, createElementVNode as b, createVNode as o, createTextVNode as _, toDisplayString as c, withDirectives as F } from "vue";
import { t as l, eh as N, ei as R } from "./core-shared-e1759ce4.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const T = { class: "form-tip" }, j = { class: "form-tip" }, O = { class: "dialog-footer" }, Y = /* @__PURE__ */ C({
  __name: "storage-ali",
  emits: ["complete"],
  setup($, { expose: P, emit: D }) {
    const p = g(!1), s = g(!0), v = {
      storage_type: "",
      bucket: "",
      access_key: "",
      secret_key: "",
      endpoint: "",
      domain: "",
      is_use: ""
    }, t = E({ ...v }), V = g(), U = M(() => ({
      bucket: [
        { required: !0, message: l("aliBucketPlaceholder"), trigger: "blur" }
      ],
      access_key: [
        { required: !0, message: l("aliAccessKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: l("aliSecretKeyPlaceholder"), trigger: "blur" }
      ],
      endpoint: [
        { required: !0, message: l("aliEndpointPlaceholder"), trigger: "blur" }
      ],
      domain: [
        { required: !0, message: l("domainPlaceholder"), trigger: "blur" }
      ]
    })), x = D, S = async (u) => {
      s.value || !u || await u.validate(async (e) => {
        e && (s.value = !0, N(t).then((y) => {
          s.value = !1, p.value = !1, x("complete");
        }).catch(() => {
          s.value = !1;
        }));
      });
    };
    return P({
      showDialog: p,
      setFormData: async (u = null) => {
        if (s.value = !0, Object.assign(t, v), u) {
          const e = await (await R(u.storage_type)).data;
          Object.keys(t).forEach((d) => {
            e[d] != null && (t[d] = e[d]), e.params[d] != null && (t[d] = e.params[d].value);
          });
        }
        s.value = !1;
      }
    }), (u, e) => {
      const d = n("el-radio"), y = n("el-radio-group"), m = n("el-form-item"), f = n("el-input"), B = n("el-form"), h = n("el-button"), K = n("el-dialog"), q = A("loading");
      return k(), w(K, {
        modelValue: p.value,
        "onUpdate:modelValue": e[8] || (e[8] = (r) => p.value = r),
        title: a(l)("aliStorage"),
        width: "580px",
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          b("span", O, [
            o(h, {
              onClick: e[6] || (e[6] = (r) => p.value = !1)
            }, {
              default: i(() => [
                _(c(a(l)("cancel")), 1)
              ]),
              _: 1
            }),
            o(h, {
              type: "primary",
              loading: s.value,
              onClick: e[7] || (e[7] = (r) => S(V.value))
            }, {
              default: i(() => [
                _(c(a(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: i(() => [
          F((k(), w(B, {
            model: t,
            "label-width": "140px",
            ref_key: "formRef",
            ref: V,
            rules: U.value,
            class: "page-form"
          }, {
            default: i(() => [
              o(m, {
                label: a(l)("isUse")
              }, {
                default: i(() => [
                  o(y, {
                    modelValue: t.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_use = r)
                  }, {
                    default: i(() => [
                      o(d, { label: "1" }, {
                        default: i(() => [
                          _(c(a(l)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      o(d, { label: "0" }, {
                        default: i(() => [
                          _(c(a(l)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              o(m, {
                label: a(l)("aliBucket"),
                prop: "bucket"
              }, {
                default: i(() => [
                  o(f, {
                    modelValue: t.bucket,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.bucket = r),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliBucketPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  b("div", T, c(a(l)("aliBucketTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              o(m, {
                label: a(l)("aliAccessKey"),
                prop: "access_key"
              }, {
                default: i(() => [
                  o(f, {
                    modelValue: t.access_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => t.access_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliAccessKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              o(m, {
                label: a(l)("aliSecretKey"),
                prop: "secret_key"
              }, {
                default: i(() => [
                  o(f, {
                    modelValue: t.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (r) => t.secret_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              o(m, {
                label: a(l)("aliEndpoint"),
                prop: "endpoint"
              }, {
                default: i(() => [
                  o(f, {
                    modelValue: t.endpoint,
                    "onUpdate:modelValue": e[4] || (e[4] = (r) => t.endpoint = r),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("aliEndpointPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  b("div", j, c(a(l)("aliEndpointTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              o(m, {
                label: a(l)("domain"),
                prop: "domain"
              }, {
                default: i(() => [
                  o(f, {
                    modelValue: t.domain,
                    "onUpdate:modelValue": e[5] || (e[5] = (r) => t.domain = r),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("domainPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [q, s.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Y as default
};
