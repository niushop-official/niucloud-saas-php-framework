import { defineComponent as D, ref as b, reactive as N, computed as R, resolveComponent as m, resolveDirective as T, openBlock as V, createElementBlock as B, createVNode as t, withCtx as n, unref as l, withDirectives as $, createBlock as K, createElementVNode as i, toDisplayString as r, createTextVNode as _ } from "vue";
import { a6 as O, t as a, a7 as P } from "./core-shared-c6ad4e77.js";
import { useRoute as S, useRouter as j } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const E = { class: "main-container" }, L = { class: "panel-title !text-sm" }, q = { class: "form-tip flex items-center" }, z = { class: "form-tip" }, F = { class: "form-tip" }, G = { class: "panel-title !text-sm" }, H = { class: "form-tip" }, J = { class: "fixed-footer-wrap" }, Q = { class: "fixed-footer" }, pe = /* @__PURE__ */ D({
  __name: "config",
  setup(W) {
    const k = S(), y = j(), g = k.meta.title, s = b(!0), o = N({
      uni_app_id: "",
      app_name: "",
      android_app_key: "",
      application_id: "",
      wechat_app_id: "",
      wechat_app_secret: ""
    }), h = b(), x = R(() => ({}));
    O().then((d) => {
      Object.assign(o, d.data), s.value = !1;
    });
    const A = async (d) => {
      s.value || !d || await d.validate(async (e) => {
        e && (s.value = !0, P(o).then(() => {
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
      const I = m("el-page-header"), f = m("el-card"), c = m("el-input"), w = m("el-button"), u = m("el-form-item"), M = m("el-form"), U = T("loading");
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
          model: o,
          "label-width": "170px",
          ref_key: "formRef",
          ref: h,
          rules: l(x)
        }, {
          default: n(() => [
            t(f, {
              class: "box-card !border-none mt-[15px]",
              shadow: "never"
            }, {
              default: n(() => [
                i("h3", L, r(l(a)("appInfo")), 1),
                t(u, {
                  label: l(a)("uniAppId"),
                  prop: "uni_app_id"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: o.uni_app_id,
                      "onUpdate:modelValue": e[1] || (e[1] = (p) => o.uni_app_id = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"]),
                    i("div", q, [
                      _(r(l(a)("uniAppIdTips")) + " ", 1),
                      t(w, {
                        link: "",
                        type: "primary",
                        onClick: e[2] || (e[2] = (p) => v("https://www.dcloud.io/"))
                      }, {
                        default: n(() => [
                          _(r(l(a)("toCreate")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(a)("appName"),
                  prop: "app_name"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: o.app_name,
                      "onUpdate:modelValue": e[3] || (e[3] = (p) => o.app_name = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(a)("androidAppKey"),
                  prop: "android_app_key"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: o.android_app_key,
                      "onUpdate:modelValue": e[4] || (e[4] = (p) => o.android_app_key = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"]),
                    i("div", z, [
                      _(r(l(a)("androidAppKeyTips")) + " ", 1),
                      i("span", {
                        class: "text-primary cursor-pointer",
                        onClick: e[5] || (e[5] = (p) => v("https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html"))
                      }, "查看详情")
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(a)("applicationId"),
                  prop: "application_id"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: o.application_id,
                      "onUpdate:modelValue": e[6] || (e[6] = (p) => o.application_id = p),
                      modelModifiers: { trim: !0 },
                      placeholder: "",
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"]),
                    i("div", F, r(l(a)("applicationIdTips")), 1)
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
                i("h3", G, r(l(a)("wechatAppInfo")), 1),
                t(u, {
                  label: l(a)("wechatAppid"),
                  prop: "app_id"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: o.wechat_app_id,
                      "onUpdate:modelValue": e[7] || (e[7] = (p) => o.wechat_app_id = p),
                      modelModifiers: { trim: !0 },
                      placeholder: l(a)("appidPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", H, r(l(a)("wechatAppidTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(u, {
                  label: l(a)("wechatAppsecret"),
                  prop: "app_secret"
                }, {
                  default: n(() => [
                    t(c, {
                      modelValue: o.wechat_app_secret,
                      "onUpdate:modelValue": e[8] || (e[8] = (p) => o.wechat_app_secret = p),
                      modelModifiers: { trim: !0 },
                      placeholder: l(a)("appSecretPlaceholder"),
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
          [U, s.value]
        ]),
        i("div", J, [
          i("div", Q, [
            t(w, {
              type: "primary",
              loading: s.value,
              onClick: e[9] || (e[9] = (p) => A(h.value))
            }, {
              default: n(() => [
                _(r(l(a)("save")), 1)
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
