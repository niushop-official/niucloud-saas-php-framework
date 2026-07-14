import { defineComponent as S, ref as b, reactive as T, computed as k, resolveComponent as d, resolveDirective as C, openBlock as g, createElementBlock as F, withDirectives as h, createBlock as B, withModifiers as R, withCtx as n, createVNode as a, createElementVNode as i, toDisplayString as r, unref as o, vShow as A, createTextVNode as N } from "vue";
import { t, ey as P, ez as E } from "./core-shared-11c0a673.js";
import { c as I } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const L = { class: "main-container" }, j = { class: "panel-title !text-sm" }, z = { class: "form-tip mb-[10px]" }, O = { class: "form-tip" }, $ = { class: "form-tip" }, q = { class: "form-tip" }, G = { class: "panel-title !text-sm" }, H = { class: "form-tip" }, J = { class: "form-tip" }, K = { class: "panel-title !text-sm" }, Q = { class: "text-[12px] text-[#a9a9a9]" }, W = { class: "fixed-footer-wrap" }, X = { class: "fixed-footer" }, de = /* @__PURE__ */ S({
  __name: "login",
  setup(Y) {
    const _ = b(!0), v = b(), l = T({
      is_username: 0,
      is_mobile: 0,
      is_auth_register: 0,
      is_force_access_user_info: 0,
      is_bind_mobile: 0,
      agreement_show: 0,
      bg_url: "",
      logo: "",
      desc: ""
    }), V = k(() => ({
      // type: [
      //     {
      //         required: true,
      //         trigger: 'change',
      //         validator: (rule: any, value: any, callback: any) => {
      //             if (!formData.is_mobile && !formData.is_username) {
      //                 callback(new Error(t('mobileOrUsernameNoEmpty')))
      //             } else {
      //                 callback()
      //             }
      //         }
      //     }
      // ]
    }));
    (async () => {
      const u = await (await P()).data;
      Object.keys(l).forEach((e) => {
        u[e] != null && (l[e] = u[e]);
      }), _.value = !1;
    })();
    const x = async (u) => {
      _.value || !u || await u.validate((e) => {
        if (e) {
          const c = I(l);
          E(c).then(() => {
            _.value = !1;
          }).catch(() => {
            _.value = !1;
          });
        }
      });
    };
    return (u, e) => {
      const c = d("el-checkbox"), m = d("el-form-item"), p = d("el-switch"), f = d("el-card"), w = d("upload-image"), U = d("el-input"), D = d("el-form"), y = d("el-button"), M = C("loading");
      return g(), F("div", L, [
        h((g(), B(D, {
          class: "page-form",
          model: l,
          rules: V.value,
          "label-width": "150px",
          ref_key: "ruleFormRef",
          ref: v,
          onSubmit: e[8] || (e[8] = R(() => {
          }, ["prevent"]))
        }, {
          default: n(() => [
            a(f, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: n(() => [
                i("h3", j, r(o(t)("commonSetting")), 1),
                a(m, {
                  label: o(t)("logonMode"),
                  prop: "type"
                }, {
                  default: n(() => [
                    a(c, {
                      modelValue: l.is_username,
                      "onUpdate:modelValue": e[0] || (e[0] = (s) => l.is_username = s),
                      "true-value": 1,
                      "false-value": 0,
                      label: o(t)("isUsername")
                    }, null, 8, ["modelValue", "label"]),
                    i("div", z, r(o(t)("isUsernameTip")), 1),
                    a(c, {
                      modelValue: l.is_mobile,
                      "onUpdate:modelValue": e[1] || (e[1] = (s) => l.is_mobile = s),
                      "true-value": 1,
                      "false-value": 0,
                      label: o(t)("isMobile")
                    }, null, 8, ["modelValue", "label"]),
                    i("div", O, r(o(t)("isMobileTip")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(m, {
                  label: o(t)("isBindMobile"),
                  prop: "formData.is_bind_mobile"
                }, {
                  default: n(() => [
                    a(p, {
                      modelValue: l.is_bind_mobile,
                      "onUpdate:modelValue": e[2] || (e[2] = (s) => l.is_bind_mobile = s),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"]),
                    i("div", $, r(o(t)("isBindMobileTip")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(m, {
                  label: o(t)("agreement"),
                  prop: "formData.agreement_show"
                }, {
                  default: n(() => [
                    a(p, {
                      modelValue: l.agreement_show,
                      "onUpdate:modelValue": e[3] || (e[3] = (s) => l.agreement_show = s),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"]),
                    i("div", q, r(o(t)("agreementTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            a(f, {
              class: "box-card mt-[15px] !border-none",
              shadow: "never"
            }, {
              default: n(() => [
                i("h3", G, r(o(t)("tripartiteSetting")), 1),
                a(m, {
                  label: o(t)("isAuthRegister"),
                  prop: "formData.is_auth_register"
                }, {
                  default: n(() => [
                    a(p, {
                      modelValue: l.is_auth_register,
                      "onUpdate:modelValue": e[4] || (e[4] = (s) => l.is_auth_register = s),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"]),
                    i("div", H, r(o(t)("isAuthRegisterTip")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                h(a(m, {
                  label: o(t)("isForceAccessUserInfo"),
                  prop: "formData.is_force_access_user_info"
                }, {
                  default: n(() => [
                    a(p, {
                      modelValue: l.is_force_access_user_info,
                      "onUpdate:modelValue": e[5] || (e[5] = (s) => l.is_force_access_user_info = s),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"]),
                    i("div", J, r(o(t)("isForceAccessUserInfoTip")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]), [
                  [A, l.is_auth_register == 1]
                ])
              ]),
              _: 1
            }),
            a(f, {
              class: "box-card mt-[15px] !border-none",
              shadow: "never"
            }, {
              default: n(() => [
                i("h3", K, r(o(t)("loginPageSet")), 1),
                a(m, {
                  label: o(t)("bgUrl")
                }, {
                  default: n(() => [
                    i("div", null, [
                      a(w, {
                        modelValue: l.bg_url,
                        "onUpdate:modelValue": e[6] || (e[6] = (s) => l.bg_url = s)
                      }, null, 8, ["modelValue"]),
                      i("p", Q, r(o(t)("bgUrlPlaceholder")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(m, {
                  label: o(t)("desc")
                }, {
                  default: n(() => [
                    a(U, {
                      modelValue: l.desc,
                      "onUpdate:modelValue": e[7] || (e[7] = (s) => l.desc = s),
                      modelModifiers: { trim: !0 },
                      placeholder: o(t)("descPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
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
          [M, _.value]
        ]),
        i("div", W, [
          i("div", X, [
            a(y, {
              type: "primary",
              onClick: e[9] || (e[9] = (s) => x(v.value))
            }, {
              default: n(() => [
                N(r(o(t)("save")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
export {
  de as default
};
