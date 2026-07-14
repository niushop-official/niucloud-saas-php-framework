import { defineComponent as y, ref as c, reactive as D, resolveComponent as n, resolveDirective as V, openBlock as v, createElementBlock as T, createVNode as a, withCtx as r, withDirectives as C, createBlock as B, createElementVNode as d, toDisplayString as m, unref as s, createTextVNode as N } from "vue";
import { el as R, t as i, em as E } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const P = { class: "main-container" }, q = { class: "panel-title !text-sm" }, M = { class: "text-[14px] text-[#a9a9a9] leading-tight mt-[10px]" }, I = /* @__PURE__ */ y({
  __name: "developer_token",
  setup(S) {
    const e = c(!0), l = c({
      token: ""
    });
    R().then(({ data: t }) => {
      e.value = !1, t.token && (l.value = t);
    });
    const u = c(), f = D({
      token: [
        { required: !0, message: i("tokenPlaceholder"), trigger: "blur" }
      ]
    }), k = async (t) => {
      e.value || !t || await t.validate(async (o) => {
        o && (e.value = !0, E(l.value).then(() => {
          e.value = !1;
        }).catch(() => {
          e.value = !1;
        }));
      });
    };
    return (t, o) => {
      const h = n("el-input"), p = n("el-form-item"), g = n("el-button"), x = n("el-form"), b = n("el-card"), w = V("loading");
      return v(), T("div", P, [
        a(b, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            C((v(), B(x, {
              class: "page-form",
              model: l.value,
              "label-width": "0",
              ref_key: "formRef",
              ref: u,
              rules: f
            }, {
              default: r(() => [
                d("h3", q, m(s(i)("developerTokenEdit")), 1),
                a(p, {
                  label: "",
                  prop: "token"
                }, {
                  default: r(() => [
                    d("div", null, [
                      a(h, {
                        modelValue: l.value.token,
                        "onUpdate:modelValue": o[0] || (o[0] = (_) => l.value.token = _),
                        modelModifiers: { trim: !0 },
                        placeholder: s(i)("tokenPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "30"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    d("div", M, m(s(i)("tokenTips")), 1)
                  ]),
                  _: 1
                }),
                a(p, { label: "" }, {
                  default: r(() => [
                    a(g, {
                      type: "primary",
                      loading: e.value,
                      onClick: o[1] || (o[1] = (_) => k(u.value))
                    }, {
                      default: r(() => [
                        N(m(s(i)("save")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [w, e.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  I as default
};
