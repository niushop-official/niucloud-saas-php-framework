import { defineComponent as J, ref as g, reactive as R, resolveComponent as p, openBlock as u, createElementBlock as y, createVNode as t, withCtx as n, createElementVNode as e, unref as o, createBlock as b, toDisplayString as m, createCommentVNode as K, createTextVNode as U, pushScopeId as M, popScopeId as Q } from "vue";
import { _ as N } from "./member_head-81b0c11e.js";
import { UserFilled as S } from "@element-plus/icons-vue";
import { useRouter as W } from "vue-router";
import { h as X, t as r, j as E, au as Y, a as Z } from "./core-shared-c6ad4e77.js";
import ee from "./index-31b5b072.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = (w) => (M("data-v-8ba3de87"), w = w(), Q(), w), oe = { class: "user-info-root" }, se = { class: "userinfo navbar-hit flex h-full items-center" }, le = {
  key: 1,
  src: N,
  class: "w-[25px] rounded-full"
}, te = { class: "user-name pl-[8px]" }, ne = { class: "p-[10px]" }, re = { class: "userinfo flex h-full items-center pb-[10px] border-b-[1px] border-solid border-[#e5e5e5]" }, ae = {
  key: 1,
  src: N,
  class: "w-[45px] rounded-full"
}, de = { class: "user-name pl-[8px] text-[14px]" }, pe = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "pl-[8px] text-[13px] text-[#9699B6]" }, "个人中心", -1)), ie = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconqiehuan ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "切换站点")
], -1)), ce = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "账号设置")
], -1)), ue = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "修改密码")
], -1)), _e = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont icontuichudenglu ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "退出登录")
], -1)), me = { class: "form-tip" }, fe = { class: "dialog-footer" }, we = /* @__PURE__ */ J({
  __name: "user-info",
  setup(w, { expose: $ }) {
    const q = localStorage.getItem("isAllowChange") === "true", i = X(), k = g();
    $({ open: () => {
      var a;
      (a = k.value) == null || a.handleOpen();
    } });
    const B = W(), z = (a) => {
      switch (a) {
        case "logout":
          i.logout();
          break;
      }
    }, A = () => {
      i.logout();
    }, D = (a) => {
      B.push(a);
    }, I = g(null), F = () => {
      var a;
      (a = I.value) == null || a.open();
    }, _ = g(!1), V = g(), s = R({
      original_password: "",
      password: "",
      password_copy: ""
    }), H = R({
      original_password: [
        { required: !0, message: r("originalPasswordPlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: r("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: r("passwordPlaceholder"), trigger: "blur" }
      ]
    }), T = (a) => {
      a && a.validate((l) => {
        if (l) {
          let c = "";
          if (s.password && !s.original_password && (c = r("originalPasswordHint")), s.password && s.original_password && !s.password_copy && (c = r("newPasswordHint")), s.password && s.original_password && s.password_copy && s.password != s.password_copy && (c = r("doubleCipherHint")), c) {
            ElNotification({
              type: "error",
              message: c
            });
            return;
          }
          Y(s).then((C) => {
            _.value = !1;
          });
        } else
          return !1;
      });
    };
    return (a, l) => {
      const c = p("el-avatar"), C = p("icon"), x = p("el-dropdown-item"), j = p("el-dropdown-menu"), L = p("el-dropdown"), h = p("el-input"), v = p("el-form-item"), O = p("el-form"), P = p("el-button"), G = p("el-dialog");
      return u(), y("div", oe, [
        t(L, {
          ref_key: "dropdownRef",
          ref: k,
          class: "user-info-dropdown",
          onCommand: z,
          tabindex: 1
        }, {
          dropdown: n(() => [
            e("div", ne, [
              e("div", re, [
                o(i).userInfo.head_img ? (u(), b(c, {
                  key: 0,
                  size: 45,
                  icon: o(S),
                  src: o(E)(o(i).userInfo.head_img)
                }, null, 8, ["icon", "src"])) : (u(), y("img", ae)),
                e("div", null, [
                  e("div", de, m(o(i).userInfo.username), 1),
                  pe
                ])
              ]),
              t(j, null, {
                default: n(() => [
                  q ? (u(), b(x, {
                    key: 0,
                    onClick: l[0] || (l[0] = (d) => D("/home/index"))
                  }, {
                    default: n(() => [
                      ie
                    ]),
                    _: 1
                  })) : K("", !0),
                  t(x, { onClick: F }, {
                    default: n(() => [
                      ce
                    ]),
                    _: 1
                  }),
                  t(x, {
                    onClick: l[1] || (l[1] = (d) => _.value = !0)
                  }, {
                    default: n(() => [
                      ue
                    ]),
                    _: 1
                  }),
                  t(x, { onClick: A }, {
                    default: n(() => [
                      _e
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            e("div", se, [
              o(i).userInfo.head_img ? (u(), b(c, {
                key: 0,
                size: 25,
                icon: o(S),
                src: o(E)(o(i).userInfo.head_img)
              }, null, 8, ["icon", "src"])) : (u(), y("img", le)),
              e("div", te, m(o(i).userInfo.username), 1),
              t(C, {
                name: "element ArrowDown",
                class: "ml-[5px]"
              })
            ])
          ]),
          _: 1
        }, 512),
        t(G, {
          modelValue: _.value,
          "onUpdate:modelValue": l[7] || (l[7] = (d) => _.value = d),
          width: "450px",
          title: "修改密码"
        }, {
          footer: n(() => [
            e("span", fe, [
              t(P, {
                onClick: l[5] || (l[5] = (d) => _.value = !1)
              }, {
                default: n(() => [
                  U(m(o(r)("cancel")), 1)
                ]),
                _: 1
              }),
              t(P, {
                type: "primary",
                onClick: l[6] || (l[6] = (d) => T(V.value))
              }, {
                default: n(() => [
                  U(m(o(r)("save")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            e("div", null, [
              t(O, {
                model: s,
                "label-width": "90px",
                ref_key: "formRef",
                ref: V,
                rules: H,
                class: "page-form"
              }, {
                default: n(() => [
                  t(v, {
                    label: o(r)("originalPassword"),
                    prop: "original_password"
                  }, {
                    default: n(() => [
                      t(h, {
                        modelValue: s.original_password,
                        "onUpdate:modelValue": l[2] || (l[2] = (d) => s.original_password = d),
                        type: "password",
                        placeholder: o(r)("originalPasswordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(v, {
                    label: o(r)("newPassword"),
                    prop: "password"
                  }, {
                    default: n(() => [
                      t(h, {
                        modelValue: s.password,
                        "onUpdate:modelValue": l[3] || (l[3] = (d) => s.password = d),
                        type: "password",
                        placeholder: o(r)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"]),
                      e("div", me, m(o(r)("passwordTip")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(v, {
                    label: o(r)("passwordCopy"),
                    prop: "password_copy"
                  }, {
                    default: n(() => [
                      t(h, {
                        modelValue: s.password_copy,
                        "onUpdate:modelValue": l[4] || (l[4] = (d) => s.password_copy = d),
                        type: "password",
                        placeholder: o(r)("passwordPlaceholder"),
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
        t(ee, {
          ref_key: "userInfoEditRef",
          ref: I
        }, null, 512)
      ]);
    };
  }
});
const Re = /* @__PURE__ */ Z(we, [["__scopeId", "data-v-8ba3de87"]]);
export {
  Re as default
};
