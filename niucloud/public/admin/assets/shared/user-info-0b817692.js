import { defineComponent as G, ref as v, reactive as P, resolveComponent as i, openBlock as u, createElementBlock as y, createVNode as t, withCtx as r, createElementVNode as e, unref as o, createBlock as b, toDisplayString as _, createCommentVNode as J, createTextVNode as U, pushScopeId as K, popScopeId as M } from "vue";
import { _ as E } from "./member_head-81b0c11e.js";
import { UserFilled as S } from "@element-plus/icons-vue";
import { useRouter as O } from "vue-router";
import { u as Q, t as n, i as R, ay as W, _ as X } from "./core-shared-e1759ce4.js";
import Y from "./index-c85be5ad.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = (w) => (K("data-v-94fd6cc5"), w = w(), M(), w), Z = { class: "userinfo flex h-full items-center" }, ee = {
  key: 1,
  src: E,
  class: "w-[25px] rounded-full"
}, oe = { class: "user-name pl-[8px]" }, se = { class: "p-[10px]" }, le = { class: "userinfo flex h-full items-center pb-[10px] border-b-[1px] border-solid border-[#e5e5e5]" }, te = {
  key: 1,
  src: E,
  class: "w-[45px] rounded-full"
}, re = { class: "user-name pl-[8px] text-[14px]" }, ne = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "pl-[8px] text-[13px] text-[#9699B6]" }, "个人中心", -1)), ae = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconqiehuan ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "切换站点")
], -1)), de = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "账号设置")
], -1)), ie = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "修改密码")
], -1)), pe = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont icontuichudenglu ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "退出登录")
], -1)), ce = { class: "form-tip" }, ue = { class: "dialog-footer" }, me = /* @__PURE__ */ G({
  __name: "user-info",
  setup(w) {
    const N = localStorage.getItem("isAllowChange") === "true", p = Q(), $ = O(), q = (d) => {
      switch (d) {
        case "logout":
          p.logout();
          break;
      }
    }, B = () => {
      p.logout();
    }, z = (d) => {
      $.push(d);
    }, k = v(null), A = () => {
      var d;
      (d = k.value) == null || d.open();
    }, m = v(!1), I = v(), s = P({
      original_password: "",
      password: "",
      password_copy: ""
    }), D = P({
      original_password: [
        { required: !0, message: n("originalPasswordPlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: n("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: n("passwordPlaceholder"), trigger: "blur" }
      ]
    }), F = (d) => {
      d && d.validate((l) => {
        if (l) {
          let c = "";
          if (s.password && !s.original_password && (c = n("originalPasswordHint")), s.password && s.original_password && !s.password_copy && (c = n("newPasswordHint")), s.password && s.original_password && s.password_copy && s.password != s.password_copy && (c = n("doubleCipherHint")), c) {
            ElNotification({
              type: "error",
              message: c
            });
            return;
          }
          W(s).then((V) => {
            m.value = !1;
          });
        } else
          return !1;
      });
    };
    return (d, l) => {
      const c = i("el-avatar"), V = i("icon"), x = i("el-dropdown-item"), H = i("el-dropdown-menu"), T = i("el-dropdown"), g = i("el-input"), h = i("el-form-item"), L = i("el-form"), C = i("el-button"), j = i("el-dialog");
      return u(), y("div", null, [
        t(T, {
          onCommand: q,
          tabindex: 1
        }, {
          dropdown: r(() => [
            e("div", se, [
              e("div", le, [
                o(p).userInfo.head_img ? (u(), b(c, {
                  key: 0,
                  size: 45,
                  icon: o(S),
                  src: o(R)(o(p).userInfo.head_img)
                }, null, 8, ["icon", "src"])) : (u(), y("img", te)),
                e("div", null, [
                  e("div", re, _(o(p).userInfo.username), 1),
                  ne
                ])
              ]),
              t(H, null, {
                default: r(() => [
                  N ? (u(), b(x, {
                    key: 0,
                    onClick: l[0] || (l[0] = (a) => z("/home/index"))
                  }, {
                    default: r(() => [
                      ae
                    ]),
                    _: 1
                  })) : J("", !0),
                  t(x, { onClick: A }, {
                    default: r(() => [
                      de
                    ]),
                    _: 1
                  }),
                  t(x, {
                    onClick: l[1] || (l[1] = (a) => m.value = !0)
                  }, {
                    default: r(() => [
                      ie
                    ]),
                    _: 1
                  }),
                  t(x, { onClick: B }, {
                    default: r(() => [
                      pe
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            e("div", Z, [
              o(p).userInfo.head_img ? (u(), b(c, {
                key: 0,
                size: 25,
                icon: o(S),
                src: o(R)(o(p).userInfo.head_img)
              }, null, 8, ["icon", "src"])) : (u(), y("img", ee)),
              e("div", oe, _(o(p).userInfo.username), 1),
              t(V, {
                name: "element ArrowDown",
                class: "ml-[5px]"
              })
            ])
          ]),
          _: 1
        }),
        t(j, {
          modelValue: m.value,
          "onUpdate:modelValue": l[7] || (l[7] = (a) => m.value = a),
          width: "450px",
          title: "修改密码"
        }, {
          footer: r(() => [
            e("span", ue, [
              t(C, {
                onClick: l[5] || (l[5] = (a) => m.value = !1)
              }, {
                default: r(() => [
                  U(_(o(n)("cancel")), 1)
                ]),
                _: 1
              }),
              t(C, {
                type: "primary",
                onClick: l[6] || (l[6] = (a) => F(I.value))
              }, {
                default: r(() => [
                  U(_(o(n)("save")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            e("div", null, [
              t(L, {
                model: s,
                "label-width": "90px",
                ref_key: "formRef",
                ref: I,
                rules: D,
                class: "page-form"
              }, {
                default: r(() => [
                  t(h, {
                    label: o(n)("originalPassword"),
                    prop: "original_password"
                  }, {
                    default: r(() => [
                      t(g, {
                        modelValue: s.original_password,
                        "onUpdate:modelValue": l[2] || (l[2] = (a) => s.original_password = a),
                        type: "password",
                        placeholder: o(n)("originalPasswordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(h, {
                    label: o(n)("newPassword"),
                    prop: "password"
                  }, {
                    default: r(() => [
                      t(g, {
                        modelValue: s.password,
                        "onUpdate:modelValue": l[3] || (l[3] = (a) => s.password = a),
                        type: "password",
                        placeholder: o(n)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"]),
                      e("div", ce, _(o(n)("passwordTip")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(h, {
                    label: o(n)("passwordCopy"),
                    prop: "password_copy"
                  }, {
                    default: r(() => [
                      t(g, {
                        modelValue: s.password_copy,
                        "onUpdate:modelValue": l[4] || (l[4] = (a) => s.password_copy = a),
                        type: "password",
                        placeholder: o(n)("passwordPlaceholder"),
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
        t(Y, {
          ref_key: "userInfoEditRef",
          ref: k
        }, null, 512)
      ]);
    };
  }
});
const Ie = /* @__PURE__ */ X(me, [["__scopeId", "data-v-94fd6cc5"]]);
export {
  Ie as default
};
