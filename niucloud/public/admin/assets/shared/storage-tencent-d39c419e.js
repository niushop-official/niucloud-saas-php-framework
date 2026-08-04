import { defineComponent as C, ref as g, reactive as M, computed as A, resolveComponent as d, resolveDirective as F, openBlock as h, createBlock as k, unref as o, withCtx as n, createElementVNode as w, createVNode as a, createTextVNode as _, toDisplayString as f, withDirectives as N } from "vue";
import { t as l, eh as R, ei as j } from "./core-shared-5b3bfa35.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const O = { class: "form-tip" }, T = { class: "dialog-footer" }, X = /* @__PURE__ */ C({
  __name: "storage-tencent",
  emits: ["complete"],
  setup($, { expose: P, emit: D }) {
    const m = g(!1), s = g(!0), b = {
      storage_type: "",
      bucket: "",
      access_key: "",
      secret_key: "",
      domain: "",
      is_use: "",
      region: ""
    }, t = M({ ...b }), v = g(), U = A(() => ({
      bucket: [
        { required: !0, message: l("tencentBucketPlaceholder"), trigger: "blur" }
      ],
      access_key: [
        { required: !0, message: l("tencentAccessKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: l("tencentSecretKeyPlaceholder"), trigger: "blur" }
      ],
      region: [
        { required: !0, message: l("regionPlaceholder"), trigger: "blur" }
      ],
      domain: [
        { required: !0, message: l("domainPlaceholder"), trigger: "blur" }
      ]
    })), x = D, S = async (u) => {
      s.value || !u || await u.validate(async (e) => {
        e && (s.value = !0, R(t).then((V) => {
          s.value = !1, m.value = !1, x("complete");
        }).catch(() => {
          s.value = !1;
        }));
      });
    };
    return P({
      showDialog: m,
      setFormData: async (u = null) => {
        if (s.value = !0, Object.assign(t, b), u) {
          const e = await (await j(u.storage_type)).data;
          Object.keys(t).forEach((i) => {
            e[i] != null && (t[i] = e[i]), e.params[i] != null && (t[i] = e.params[i].value);
          });
        }
        s.value = !1;
      }
    }), (u, e) => {
      const i = d("el-radio"), V = d("el-radio-group"), c = d("el-form-item"), p = d("el-input"), B = d("el-form"), y = d("el-button"), K = d("el-dialog"), q = F("loading");
      return h(), k(K, {
        modelValue: m.value,
        "onUpdate:modelValue": e[8] || (e[8] = (r) => m.value = r),
        title: o(l)("tencentStorage"),
        width: "580px",
        "destroy-on-close": !0
      }, {
        footer: n(() => [
          w("span", T, [
            a(y, {
              onClick: e[6] || (e[6] = (r) => m.value = !1)
            }, {
              default: n(() => [
                _(f(o(l)("cancel")), 1)
              ]),
              _: 1
            }),
            a(y, {
              type: "primary",
              loading: s.value,
              onClick: e[7] || (e[7] = (r) => S(v.value))
            }, {
              default: n(() => [
                _(f(o(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: n(() => [
          N((h(), k(B, {
            model: t,
            "label-width": "140px",
            ref_key: "formRef",
            ref: v,
            rules: U.value,
            class: "page-form"
          }, {
            default: n(() => [
              a(c, {
                label: o(l)("isUse")
              }, {
                default: n(() => [
                  a(V, {
                    modelValue: t.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_use = r)
                  }, {
                    default: n(() => [
                      a(i, { label: "1" }, {
                        default: n(() => [
                          _(f(o(l)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      a(i, { label: "0" }, {
                        default: n(() => [
                          _(f(o(l)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(l)("tencentBucket"),
                prop: "bucket"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: t.bucket,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.bucket = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("tencentBucketPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  w("div", O, f(o(l)("tencentBucketTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(l)("tencentAccessKey"),
                prop: "access_key"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: t.access_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (r) => t.access_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("tencentAccessKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(l)("tencentSecretKey"),
                prop: "secret_key"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: t.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (r) => t.secret_key = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("tencentSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(l)("region"),
                prop: "region"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: t.region,
                    "onUpdate:modelValue": e[4] || (e[4] = (r) => t.region = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(l)("regionPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(l)("domain"),
                prop: "domain"
              }, {
                default: n(() => [
                  a(p, {
                    modelValue: t.domain,
                    "onUpdate:modelValue": e[5] || (e[5] = (r) => t.domain = r),
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
            [q, s.value]
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
