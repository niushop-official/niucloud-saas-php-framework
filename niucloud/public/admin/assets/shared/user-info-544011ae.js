import { defineComponent as G, ref as g, reactive as C, resolveComponent as d, openBlock as _, createElementBlock as y, createVNode as o, withCtx as n, createElementVNode as e, unref as s, createBlock as U, toDisplayString as m, createTextVNode as R, pushScopeId as J, popScopeId as K } from "vue";
import { _ as q } from "./member_head-81b0c11e.js";
import { UserFilled as S } from "@element-plus/icons-vue";
import { h as L, t as r, j as E, au as M, a as Q } from "./core-shared-c6ad4e77.js";
import W from "./index-31b5b072.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const f = (x) => (J("data-v-a0190ee4"), x = x(), K(), x), X = { class: "user-info-root" }, Y = { class: "userinfo navbar-hit flex h-full items-center" }, Z = {
  key: 1,
  src: q,
  class: "w-[25px] rounded-full"
}, ee = { class: "user-name pl-[8px]" }, oe = { class: "p-[10px]" }, se = { class: "userinfo flex h-full items-center pb-[10px] border-b-[1px] border-solid border-[#e5e5e5]" }, le = {
  key: 1,
  src: q,
  class: "w-[45px] rounded-full"
}, te = { class: "user-name pl-[8px] text-[14px]" }, ne = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "pl-[8px] text-[13px] text-[#9699B6]" }, "个人中心", -1)), re = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "账号设置")
], -1)), ae = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshouquanxinxi2 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "授权信息")
], -1)), de = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "修改密码")
], -1)), pe = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont icontuichudenglu ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "退出登录")
], -1)), ie = { class: "form-tip" }, ce = { class: "dialog-footer" }, ue = /* @__PURE__ */ G({
  __name: "user-info",
  setup(x, { expose: z }) {
    const i = L(), b = g();
    z({ open: () => {
      var a;
      (a = b.value) == null || a.handleOpen();
    } });
    const B = (a) => {
      switch (a) {
        case "logout":
          i.logout();
          break;
      }
    }, N = () => {
      i.logout();
    }, k = g(null), $ = () => {
      var a;
      (a = k.value) == null || a.open();
    }, u = g(!1), I = g(), l = C({
      original_password: "",
      password: "",
      password_copy: ""
    }), D = C({
      original_password: [
        { required: !0, message: r("originalPasswordPlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: r("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: r("passwordPlaceholder"), trigger: "blur" }
      ]
    }), F = (a) => {
      a && a.validate((t) => {
        if (t) {
          let c = "";
          if (l.password && !l.original_password && (c = r("originalPasswordHint")), l.password && l.original_password && !l.password_copy && (c = r("newPasswordHint")), l.password && l.original_password && l.password_copy && l.password != l.password_copy && (c = r("doubleCipherHint")), c) {
            ElNotification({
              type: "error",
              message: c
            });
            return;
          }
          M(l).then((V) => {
            u.value = !1;
          });
        } else
          return !1;
      });
    };
    return (a, t) => {
      const c = d("el-avatar"), V = d("icon"), w = d("el-dropdown-item"), H = d("router-link"), T = d("el-dropdown-menu"), j = d("el-dropdown"), h = d("el-input"), v = d("el-form-item"), A = d("el-form"), P = d("el-button"), O = d("el-dialog");
      return _(), y("div", X, [
        o(j, {
          ref_key: "dropdownRef",
          ref: b,
          class: "user-info-dropdown",
          onCommand: B,
          tabindex: 1
        }, {
          dropdown: n(() => [
            e("div", oe, [
              e("div", se, [
                s(i).userInfo.head_img ? (_(), U(c, {
                  key: 0,
                  size: 45,
                  icon: s(S),
                  src: s(E)(s(i).userInfo.head_img)
                }, null, 8, ["icon", "src"])) : (_(), y("img", le)),
                e("div", null, [
                  e("div", te, m(s(i).userInfo.username), 1),
                  ne
                ])
              ]),
              o(T, null, {
                default: n(() => [
                  o(w, {
                    onClick: $,
                    class: "rounded-[4px]"
                  }, {
                    default: n(() => [
                      re
                    ]),
                    _: 1
                  }),
                  o(w, { class: "rounded-[4px]" }, {
                    default: n(() => [
                      o(H, { to: "/tools/authorize" }, {
                        default: n(() => [
                          ae
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  o(w, {
                    onClick: t[0] || (t[0] = (p) => u.value = !0),
                    class: "rounded-[4px]"
                  }, {
                    default: n(() => [
                      de
                    ]),
                    _: 1
                  }),
                  o(w, {
                    onClick: N,
                    class: "rounded-[4px]"
                  }, {
                    default: n(() => [
                      pe
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            e("div", Y, [
              s(i).userInfo.head_img ? (_(), U(c, {
                key: 0,
                size: 25,
                icon: s(S),
                src: s(E)(s(i).userInfo.head_img)
              }, null, 8, ["icon", "src"])) : (_(), y("img", Z)),
              e("div", ee, m(s(i).userInfo.username), 1),
              o(V, {
                name: "element ArrowDown",
                class: "ml-[5px]"
              })
            ])
          ]),
          _: 1
        }, 512),
        o(O, {
          modelValue: u.value,
          "onUpdate:modelValue": t[6] || (t[6] = (p) => u.value = p),
          width: "450px",
          title: "修改密码"
        }, {
          footer: n(() => [
            e("span", ce, [
              o(P, {
                onClick: t[4] || (t[4] = (p) => u.value = !1)
              }, {
                default: n(() => [
                  R(m(s(r)("cancel")), 1)
                ]),
                _: 1
              }),
              o(P, {
                type: "primary",
                onClick: t[5] || (t[5] = (p) => F(I.value))
              }, {
                default: n(() => [
                  R(m(s(r)("save")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            e("div", null, [
              o(A, {
                model: l,
                "label-width": "90px",
                ref_key: "formRef",
                ref: I,
                rules: D,
                class: "page-form"
              }, {
                default: n(() => [
                  o(v, {
                    label: s(r)("originalPassword"),
                    prop: "original_password"
                  }, {
                    default: n(() => [
                      o(h, {
                        modelValue: l.original_password,
                        "onUpdate:modelValue": t[1] || (t[1] = (p) => l.original_password = p),
                        type: "password",
                        placeholder: s(r)("originalPasswordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(v, {
                    label: s(r)("newPassword"),
                    prop: "password"
                  }, {
                    default: n(() => [
                      o(h, {
                        modelValue: l.password,
                        "onUpdate:modelValue": t[2] || (t[2] = (p) => l.password = p),
                        type: "password",
                        placeholder: s(r)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"]),
                      e("div", ie, m(s(r)("passwordTip")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(v, {
                    label: s(r)("passwordCopy"),
                    prop: "password_copy"
                  }, {
                    default: n(() => [
                      o(h, {
                        modelValue: l.password_copy,
                        "onUpdate:modelValue": t[3] || (t[3] = (p) => l.password_copy = p),
                        type: "password",
                        placeholder: s(r)("passwordPlaceholder"),
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
        o(W, {
          ref_key: "userInfoEditRef",
          ref: k
        }, null, 512)
      ]);
    };
  }
});
const Ie = /* @__PURE__ */ Q(ue, [["__scopeId", "data-v-a0190ee4"]]);
export {
  Ie as default
};
