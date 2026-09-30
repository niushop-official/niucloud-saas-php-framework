import { defineComponent as F, ref as v, computed as N, resolveComponent as s, openBlock as p, createBlock as _, withCtx as i, createElementVNode as $, createVNode as o, createTextVNode as c, toDisplayString as x, unref as m, createElementBlock as g, Fragment as V, toRaw as j } from "vue";
import { t as a } from "./core-shared-c6ad4e77.js";
import { c as O } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const S = { class: "dialog-footer" }, X = /* @__PURE__ */ F({
  __name: "edit-verify",
  emits: ["complete"],
  setup(T, { expose: y, emit: M }) {
    const u = v(!1), h = v(""), b = {
      validate_type: "",
      min_number: 1,
      max_number: 120,
      betweenMin: 1,
      betweenMax: 120
    }, l = v({ ...b }), f = v(), P = (r, e, t) => {
      e ? e > l.value.betweenMax ? t(new Error(a("minPlaceholder1"))) : t() : t(new Error(a("minPlaceholder")));
    }, E = (r, e, t) => {
      e ? e < l.value.betweenMin ? t(new Error(a("maxPlaceholder1"))) : t() : t(new Error(a("maxPlaceholder")));
    }, U = (r, e, t) => {
      e > l.value.view_max ? t(new Error(a("min1Placeholder1"))) : t();
    }, q = (r, e, t) => {
      e ? e < l.value.view_min ? t(new Error(a("max1Placeholder1"))) : t() : t(new Error(a("max1Placeholder")));
    }, C = N(() => ({
      min_number: [
        { required: !0, message: a("minPlaceholder"), trigger: "change" }
      ],
      max_number: [
        { required: !0, message: a("maxPlaceholder"), trigger: "change" }
      ],
      betweenMin: [
        { required: !0, validator: P, trigger: "change" }
      ],
      betweenMax: [
        { required: !0, validator: E, trigger: "change" }
      ],
      view_min: [
        { required: !0, validator: U, trigger: "change" }
      ],
      view_max: [
        { required: !0, validator: q, trigger: "change" }
      ]
    })), D = async (r) => {
      r && await r.validate(async (e) => {
        e && (M("complete", j(l.value)), u.value = !1);
      });
    }, L = async (r = null) => {
      l.value = O(Object.assign(b, r)), u.value = !0;
    }, R = (r) => {
      var e;
      (e = f.value) == null || e.clearValidate(), r();
    };
    return y({
      showDialog: u,
      setFormData: L
    }), (r, e) => {
      const t = s("el-input-number"), d = s("el-form-item"), k = s("el-form"), w = s("el-button"), B = s("el-dialog");
      return p(), _(B, {
        modelValue: u.value,
        "onUpdate:modelValue": e[8] || (e[8] = (n) => u.value = n),
        title: h.value,
        width: "480px",
        "before-close": R,
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          $("span", S, [
            o(w, {
              onClick: e[6] || (e[6] = (n) => u.value = !1)
            }, {
              default: i(() => [
                c(x(m(a)("cancel")), 1)
              ]),
              _: 1
            }),
            o(w, {
              type: "primary",
              onClick: e[7] || (e[7] = (n) => D(f.value))
            }, {
              default: i(() => [
                c(x(m(a)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: i(() => [
          o(k, {
            model: l.value,
            "label-width": "130px",
            ref_key: "formRef",
            ref: f,
            rules: m(C),
            class: "page-form"
          }, {
            default: i(() => [
              l.value.validate_type == "min" ? (p(), _(d, {
                key: 0,
                label: m(a)("minLabel"),
                prop: "min_number"
              }, {
                default: i(() => [
                  o(t, {
                    modelValue: l.value.min_number,
                    "onUpdate:modelValue": e[0] || (e[0] = (n) => l.value.min_number = n),
                    step: 1,
                    "step-strictly": "",
                    min: 1,
                    class: "input-width"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : l.value.validate_type == "max" ? (p(), _(d, {
                key: 1,
                label: m(a)("maxLabel"),
                prop: "max_number"
              }, {
                default: i(() => [
                  o(t, {
                    modelValue: l.value.max_number,
                    "onUpdate:modelValue": e[1] || (e[1] = (n) => l.value.max_number = n),
                    step: 1,
                    "step-strictly": "",
                    min: 1,
                    class: "input-width"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : l.value.view_type === "number" ? (p(), g(V, { key: 2 }, [
                o(d, {
                  label: m(a)("minLabel1"),
                  prop: "view_min"
                }, {
                  default: i(() => [
                    o(t, {
                      modelValue: l.value.view_min,
                      "onUpdate:modelValue": e[2] || (e[2] = (n) => l.value.view_min = n),
                      min: 0,
                      "value-on-clear": 0,
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: m(a)("maxLabel1"),
                  prop: "view_max"
                }, {
                  default: i(() => [
                    o(t, {
                      modelValue: l.value.view_max,
                      "onUpdate:modelValue": e[3] || (e[3] = (n) => l.value.view_max = n),
                      min: 1,
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ], 64)) : (p(), g(V, { key: 3 }, [
                o(d, {
                  label: m(a)("minLabel"),
                  prop: "betweenMin"
                }, {
                  default: i(() => [
                    o(t, {
                      modelValue: l.value.betweenMin,
                      "onUpdate:modelValue": e[4] || (e[4] = (n) => l.value.betweenMin = n),
                      step: 1,
                      "step-strictly": "",
                      min: 1,
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(d, {
                  label: m(a)("maxLabel"),
                  prop: "betweenMax"
                }, {
                  default: i(() => [
                    o(t, {
                      modelValue: l.value.betweenMax,
                      "onUpdate:modelValue": e[5] || (e[5] = (n) => l.value.betweenMax = n),
                      step: 1,
                      "step-strictly": "",
                      min: 1,
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ], 64))
            ]),
            _: 1
          }, 8, ["model", "rules"])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  X as default
};
