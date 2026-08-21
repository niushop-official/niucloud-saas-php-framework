import { defineComponent as j, ref as v, reactive as P, resolveComponent as a, openBlock as _, createElementBlock as y, createVNode as o, withCtx as r, createElementVNode as e, unref as s, createBlock as C, toDisplayString as m, createTextVNode as U, pushScopeId as G, popScopeId as J } from "vue";
import { _ as E } from "./member_head-81b0c11e.js";
import { UserFilled as S } from "@element-plus/icons-vue";
import { u as K, t as n, i as z, az as L, _ as M } from "./core-shared-0b2facad.js";
import O from "./index-d7cabf7a.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const f = (x) => (G("data-v-276acbf3"), x = x(), J(), x), Q = { class: "userinfo flex h-full items-center" }, W = {
  key: 1,
  src: E,
  class: "w-[25px] rounded-full"
}, X = { class: "user-name pl-[8px]" }, Y = { class: "p-[10px]" }, Z = { class: "userinfo flex h-full items-center pb-[10px] border-b-[1px] border-solid border-[#e5e5e5]" }, ee = {
  key: 1,
  src: E,
  class: "w-[45px] rounded-full"
}, oe = { class: "user-name pl-[8px] text-[14px]" }, se = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "pl-[8px] text-[13px] text-[#9699B6]" }, "个人中心", -1)), le = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "账号设置")
], -1)), te = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshouquanxinxi2 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "授权信息")
], -1)), re = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "修改密码")
], -1)), ne = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont icontuichudenglu ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "退出登录")
], -1)), ae = { class: "form-tip" }, de = { class: "dialog-footer" }, pe = /* @__PURE__ */ j({
  __name: "user-info",
  setup(x) {
    const p = K(), R = (i) => {
      switch (i) {
        case "logout":
          p.logout();
          break;
      }
    }, q = () => {
      p.logout();
    }, b = v(null), B = () => {
      var i;
      (i = b.value) == null || i.open();
    }, u = v(!1), k = v(), l = P({
      original_password: "",
      password: "",
      password_copy: ""
    }), N = P({
      original_password: [
        { required: !0, message: n("originalPasswordPlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: n("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: n("passwordPlaceholder"), trigger: "blur" }
      ]
    }), $ = (i) => {
      i && i.validate((t) => {
        if (t) {
          let c = "";
          if (l.password && !l.original_password && (c = n("originalPasswordHint")), l.password && l.original_password && !l.password_copy && (c = n("newPasswordHint")), l.password && l.original_password && l.password_copy && l.password != l.password_copy && (c = n("doubleCipherHint")), c) {
            ElNotification({
              type: "error",
              message: c
            });
            return;
          }
          L(l).then((I) => {
            u.value = !1;
          });
        } else
          return !1;
      });
    };
    return (i, t) => {
      const c = a("el-avatar"), I = a("icon"), w = a("el-dropdown-item"), D = a("router-link"), F = a("el-dropdown-menu"), H = a("el-dropdown"), g = a("el-input"), h = a("el-form-item"), T = a("el-form"), V = a("el-button"), A = a("el-dialog");
      return _(), y("div", null, [
        o(H, {
          onCommand: R,
          tabindex: 1
        }, {
          dropdown: r(() => [
            e("div", Y, [
              e("div", Z, [
                s(p).userInfo.head_img ? (_(), C(c, {
                  key: 0,
                  size: 45,
                  icon: s(S),
                  src: s(z)(s(p).userInfo.head_img)
                }, null, 8, ["icon", "src"])) : (_(), y("img", ee)),
                e("div", null, [
                  e("div", oe, m(s(p).userInfo.username), 1),
                  se
                ])
              ]),
              o(F, null, {
                default: r(() => [
                  o(w, {
                    onClick: B,
                    class: "rounded-[4px]"
                  }, {
                    default: r(() => [
                      le
                    ]),
                    _: 1
                  }),
                  o(w, { class: "rounded-[4px]" }, {
                    default: r(() => [
                      o(D, { to: "/tools/authorize" }, {
                        default: r(() => [
                          te
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  o(w, {
                    onClick: t[0] || (t[0] = (d) => u.value = !0),
                    class: "rounded-[4px]"
                  }, {
                    default: r(() => [
                      re
                    ]),
                    _: 1
                  }),
                  o(w, {
                    onClick: q,
                    class: "rounded-[4px]"
                  }, {
                    default: r(() => [
                      ne
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            e("div", Q, [
              s(p).userInfo.head_img ? (_(), C(c, {
                key: 0,
                size: 25,
                icon: s(S),
                src: s(z)(s(p).userInfo.head_img)
              }, null, 8, ["icon", "src"])) : (_(), y("img", W)),
              e("div", X, m(s(p).userInfo.username), 1),
              o(I, {
                name: "element ArrowDown",
                class: "ml-[5px]"
              })
            ])
          ]),
          _: 1
        }),
        o(A, {
          modelValue: u.value,
          "onUpdate:modelValue": t[6] || (t[6] = (d) => u.value = d),
          width: "450px",
          title: "修改密码"
        }, {
          footer: r(() => [
            e("span", de, [
              o(V, {
                onClick: t[4] || (t[4] = (d) => u.value = !1)
              }, {
                default: r(() => [
                  U(m(s(n)("cancel")), 1)
                ]),
                _: 1
              }),
              o(V, {
                type: "primary",
                onClick: t[5] || (t[5] = (d) => $(k.value))
              }, {
                default: r(() => [
                  U(m(s(n)("save")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            e("div", null, [
              o(T, {
                model: l,
                "label-width": "90px",
                ref_key: "formRef",
                ref: k,
                rules: N,
                class: "page-form"
              }, {
                default: r(() => [
                  o(h, {
                    label: s(n)("originalPassword"),
                    prop: "original_password"
                  }, {
                    default: r(() => [
                      o(g, {
                        modelValue: l.original_password,
                        "onUpdate:modelValue": t[1] || (t[1] = (d) => l.original_password = d),
                        type: "password",
                        placeholder: s(n)("originalPasswordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(h, {
                    label: s(n)("newPassword"),
                    prop: "password"
                  }, {
                    default: r(() => [
                      o(g, {
                        modelValue: l.password,
                        "onUpdate:modelValue": t[2] || (t[2] = (d) => l.password = d),
                        type: "password",
                        placeholder: s(n)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"]),
                      e("div", ae, m(s(n)("passwordTip")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(h, {
                    label: s(n)("passwordCopy"),
                    prop: "password_copy"
                  }, {
                    default: r(() => [
                      o(g, {
                        modelValue: l.password_copy,
                        "onUpdate:modelValue": t[3] || (t[3] = (d) => l.password_copy = d),
                        type: "password",
                        placeholder: s(n)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        o(O, {
          ref_key: "userInfoEditRef",
          ref: b
        }, null, 512)
      ]);
    };
  }
});
const ve = /* @__PURE__ */ M(pe, [["__scopeId", "data-v-276acbf3"]]);
export {
  ve as default
};
