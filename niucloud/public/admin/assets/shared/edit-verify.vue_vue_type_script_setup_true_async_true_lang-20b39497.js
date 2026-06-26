import { defineComponent as N, ref as v, computed as $, resolveComponent as d, openBlock as p, createBlock as _, withCtx as i, createElementVNode as j, createVNode as o, createTextVNode as c, toDisplayString as x, unref as m, createElementBlock as g, Fragment as V, toRaw as O } from "vue";
import { t as a } from "./core-shared-ca1fcae5.js";
import { c as S } from "./cloneDeep-70d647ec.js";
const T = { class: "dialog-footer" }, I = /* @__PURE__ */ N({
  __name: "edit-verify",
  emits: ["complete"],
  setup(z, { expose: y, emit: M }) {
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
    }, C = $(() => ({
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
    })), D = M, L = async (r) => {
      r && await r.validate(async (e) => {
        e && (D("complete", O(l.value)), u.value = !1);
      });
    }, R = async (r = null) => {
      l.value = S(Object.assign(b, r)), u.value = !0;
    }, k = (r) => {
      var e;
      (e = f.value) == null || e.clearValidate(), r();
    };
    return y({
      showDialog: u,
      setFormData: R
    }), (r, e) => {
      const t = d("el-input-number"), s = d("el-form-item"), B = d("el-form"), w = d("el-button"), F = d("el-dialog");
      return p(), _(F, {
        modelValue: u.value,
        "onUpdate:modelValue": e[8] || (e[8] = (n) => u.value = n),
        title: h.value,
        width: "480px",
        "before-close": k,
        "destroy-on-close": !0
      }, {
        footer: i(() => [
          j("span", T, [
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
              onClick: e[7] || (e[7] = (n) => L(f.value))
            }, {
              default: i(() => [
                c(x(m(a)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: i(() => [
          o(B, {
            model: l.value,
            "label-width": "130px",
            ref_key: "formRef",
            ref: f,
            rules: C.value,
            class: "page-form"
          }, {
            default: i(() => [
              l.value.validate_type == "min" ? (p(), _(s, {
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
              }, 8, ["label"])) : l.value.validate_type == "max" ? (p(), _(s, {
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
                o(s, {
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
                o(s, {
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
                o(s, {
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
                o(s, {
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
  I as _
};
