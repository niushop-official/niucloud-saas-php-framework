import { defineComponent as U, ref as b, reactive as D, computed as N, resolveComponent as m, resolveDirective as T, openBlock as V, createElementBlock as B, createVNode as t, withCtx as n, unref as l, withDirectives as $, createBlock as K, createElementVNode as i, toDisplayString as r, createTextVNode as _ } from "vue";
import { Q as O, t as o, R as P } from "./core-shared-ca1fcae5.js";
import { useRoute as S, useRouter as j } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const E = { class: "main-container" }, L = { class: "panel-title !text-sm" }, Q = { class: "form-tip flex items-center" }, q = { class: "form-tip" }, z = { class: "form-tip" }, F = { class: "panel-title !text-sm" }, G = { class: "form-tip" }, H = { class: "fixed-footer-wrap" }, J = { class: "fixed-footer" }, pe = /* @__PURE__ */ U({
  __name: "config",
  setup(W) {
    const k = S(), y = j(), g = k.meta.title, s = b(!0), a = D({
      uni_app_id: "",
      app_name: "",
      android_app_key: "",
      application_id: "",
      wechat_app_id: "",
      wechat_app_secret: ""
    }), h = b(), x = N(() => ({}));
    O().then((d) => {
      Object.assign(a, d.data), s.value = !1;
    });
    const A = async (d) => {
      s.value || !d || await d.validate(async (e) => {
        e && (s.value = !0, P(a).then(() => {
          s.value = !1;
        }).catch(() => {
          s.value = !1;
        }));
      });
    }, v = (d) => {
      window.open(d);
    }, C = () => {
      y.push("/channel/app");
    };
    return (d, e) => {
      const I = m("el-page-header"), f = m("el-card"), c = m("el-input"), w = m("el-button"), u = m("el-form-item"), M = m("el-form"), R = T("loading");
      return V(), B("div", E, [
        t(f, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            t(I, {
              content: l(g),
              icon: d.ArrowLeft,
              onBack: e[0] || (e[0] = (p) => C())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        $((V(), K(M, {
          class: "page-form mt-[15px]",
          model: a,
          "label-width": "170px",
          ref_key: "formRef",
          ref: h,
          rules: x.value
        }, {
          default: n(() => [
            t(f, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: n(() => [
                i("h3", L, r(l(o)("appInfo")), 1),
                t(u, {
                  label: l(o)("uniAppId"),
                  prop: "uni_app_id"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: a.uni_app_id,
                      "onUpdate:modelValue": e[1] || (e[1] = (p) => a.uni_app_id = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"]),
                    i("div", Q, [
                      _(r(l(o)("uniAppIdTips")) + " ", 1),
                      t(w, {
                        link: "",
                        type: "primary",
                        onClick: e[2] || (e[2] = (p) => v("https://www.dcloud.io/"))
                      }, {
                        default: n(() => [
                          _(r(l(o)("toCreate")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(o)("appName"),
                  prop: "app_name"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: a.app_name,
                      "onUpdate:modelValue": e[3] || (e[3] = (p) => a.app_name = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(o)("androidAppKey"),
                  prop: "android_app_key"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: a.android_app_key,
                      "onUpdate:modelValue": e[4] || (e[4] = (p) => a.android_app_key = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"]),
                    i("div", q, [
                      _(r(l(o)("androidAppKeyTips")) + " ", 1),
                      i("span", {
                        class: "text-primary cursor-pointer",
                        onClick: e[5] || (e[5] = (p) => v("https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html"))
                      }, "查看详情")
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(o)("applicationId"),
                  prop: "application_id"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: a.application_id,
                      "onUpdate:modelValue": e[6] || (e[6] = (p) => a.application_id = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"]),
                    i("div", z, r(l(o)("applicationIdTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            t(f, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: n(() => [
                i("h3", F, r(l(o)("wechatAppInfo")), 1),
                t(u, {
                  label: l(o)("wechatAppid"),
                  prop: "app_id"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: a.wechat_app_id,
                      "onUpdate:modelValue": e[7] || (e[7] = (p) => a.wechat_app_id = p),
                      modelModifiers: { trim: !0 },
                      placeholder: l(o)("appidPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", G, r(l(o)("wechatAppidTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(o)("wechatAppsecret"),
                  prop: "app_secret"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: a.wechat_app_secret,
                      "onUpdate:modelValue": e[8] || (e[8] = (p) => a.wechat_app_secret = p),
                      modelModifiers: { trim: !0 },
                      placeholder: l(o)("appSecretPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [R, s.value]
        ]),
        i("div", H, [
          i("div", J, [
            t(w, {
              type: "primary",
              loading: s.value,
              onClick: e[9] || (e[9] = (p) => A(h.value))
            }, {
              default: n(() => [
                _(r(l(o)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
export {
  pe as default
};
