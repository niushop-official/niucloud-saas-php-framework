import { defineComponent as y, ref as i, reactive as b, resolveComponent as s, resolveDirective as D, openBlock as p, createElementBlock as T, withDirectives as V, createBlock as C, withCtx as c, createElementVNode as e, toDisplayString as d, unref as a, createVNode as m, createTextVNode as B } from "vue";
import { eS as N, t as l, eT as R } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "main-container" }, P = { class: "form-section form-section--has-header" }, S = { class: "form-section__header" }, q = { class: "form-section__title" }, M = { class: "form-section__body" }, U = { class: "form-tip" }, $ = { class: "fixed-footer-wrap" }, j = { class: "fixed-footer fixed-footer--form" }, z = { class: "fixed-footer__inner fixed-footer__inner--narrow" }, Q = /* @__PURE__ */ y({
  __name: "developer_token",
  setup(A) {
    const o = i(!0), n = i({
      token: ""
    });
    N().then(({ data: t }) => {
      o.value = !1, t.token && (n.value = t);
    });
    const _ = i(), u = b({
      token: [
        { required: !0, message: l("tokenPlaceholder"), trigger: "blur" }
      ]
    }), v = async (t) => {
      o.value || !t || await t.validate(async (r) => {
        r && (o.value = !0, R(n.value).then(() => {
          o.value = !1;
        }).catch(() => {
          o.value = !1;
        }));
      });
    };
    return (t, r) => {
      const h = s("el-input"), k = s("el-form-item"), g = s("el-form"), x = s("el-button"), w = D("loading");
      return p(), T("div", E, [
        V((p(), C(g, {
          class: "page-form page-form--stacked form-page form-page--narrow",
          model: n.value,
          "label-position": "top",
          ref_key: "formRef",
          ref: _,
          rules: u
        }, {
          default: c(() => [
            e("section", P, [
              e("div", S, [
                e("h3", q, d(a(l)("developerTokenEdit")), 1)
              ]),
              e("div", M, [
                m(k, {
                  prop: "token",
                  class: "form-item--wide"
                }, {
                  default: c(() => [
                    m(h, {
                      modelValue: n.value.token,
                      "onUpdate:modelValue": r[0] || (r[0] = (f) => n.value.token = f),
                      modelModifiers: { trim: !0 },
                      placeholder: a(l)("tokenPlaceholder"),
                      clearable: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "placeholder"]),
                    e("div", U, d(a(l)("tokenTips")), 1)
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [w, o.value]
        ]),
        e("div", $, [
          e("div", j, [
            e("div", z, [
              m(x, {
                type: "primary",
                loading: o.value,
                onClick: r[1] || (r[1] = (f) => v(_.value))
              }, {
                default: c(() => [
                  B(d(a(l)("save")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  Q as default
};
