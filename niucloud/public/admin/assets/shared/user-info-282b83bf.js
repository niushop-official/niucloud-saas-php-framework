import { defineComponent as T, ref as g, computed as j, reactive as C, resolveComponent as i, openBlock as m, createElementBlock as f, createVNode as s, withCtx as n, createElementVNode as e, unref as t, toDisplayString as u, createTextVNode as U, pushScopeId as O, popScopeId as A } from "vue";
import { h as G, t as a, j as R, au as J, a as K } from "./core-shared-c6ad4e77.js";
import L from "./index-31b5b072.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const x = (w) => (O("data-v-3f3cc781"), w = w(), A(), w), M = { class: "user-info-root" }, Q = { class: "userinfo navbar-hit flex h-full items-center" }, W = { class: "userinfo-avatar" }, X = ["src"], Y = { key: 1 }, Z = { class: "p-[10px]" }, ee = { class: "userinfo flex h-full items-center pb-[10px] border-b-[1px] border-solid border-[#e5e5e5]" }, oe = { class: "userinfo-avatar is-lg" }, se = ["src"], te = { key: 1 }, le = { class: "user-name pl-[8px] text-[14px]" }, ne = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "pl-[8px] text-[13px] text-[#9699B6]" }, "个人中心", -1)), ae = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshezhi1 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "账号设置")
], -1)), re = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshouquanxinxi2 ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "授权信息")
], -1)), de = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconxiugai ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "修改密码")
], -1)), pe = /* @__PURE__ */ x(() => /* @__PURE__ */ e("div", { class: "flex items-center leading-[1] py-[5px]" }, [
  /* @__PURE__ */ e("span", { class: "iconfont icontuichudenglu ml-[4px] !text-[14px] mr-[10px]" }),
  /* @__PURE__ */ e("span", { class: "text-[14px]" }, "退出登录")
], -1)), ie = { class: "form-tip" }, ce = { class: "dialog-footer" }, ue = /* @__PURE__ */ T({
  __name: "user-info",
  setup(w, { expose: S }) {
    const c = G(), y = g();
    S({ open: () => {
      var r;
      (r = y.value) == null || r.handleOpen();
    } });
    const b = j(() => {
      var r;
      return String(((r = c.userInfo) == null ? void 0 : r.username) || "U").slice(0, 1).toUpperCase();
    }), E = (r) => {
      switch (r) {
        case "logout":
          c.logout();
          break;
      }
    }, q = () => {
      c.logout();
    }, I = g(null), N = () => {
      var r;
      (r = I.value) == null || r.open();
    }, _ = g(!1), k = g(), o = C({
      original_password: "",
      password: "",
      password_copy: ""
    }), $ = C({
      original_password: [
        { required: !0, message: a("originalPasswordPlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: a("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: a("passwordPlaceholder"), trigger: "blur" }
      ]
    }), B = (r) => {
      r && r.validate((l) => {
        if (l) {
          let d = "";
          if (o.password && !o.original_password && (d = a("originalPasswordHint")), o.password && o.original_password && !o.password_copy && (d = a("newPasswordHint")), o.password && o.original_password && o.password_copy && o.password != o.password_copy && (d = a("doubleCipherHint")), d) {
            ElNotification({
              type: "error",
              message: d
            });
            return;
          }
          J(o).then((V) => {
            _.value = !1;
          });
        } else
          return !1;
      });
    };
    return (r, l) => {
      const d = i("el-dropdown-item"), V = i("router-link"), H = i("el-dropdown-menu"), z = i("el-dropdown"), h = i("el-input"), v = i("el-form-item"), D = i("el-form"), P = i("el-button"), F = i("el-dialog");
      return m(), f("div", M, [
        s(z, {
          ref_key: "dropdownRef",
          ref: y,
          class: "user-info-dropdown",
          onCommand: E,
          tabindex: 1,
          "popper-class": "layout-admin-user-menu"
        }, {
          dropdown: n(() => [
            e("div", Z, [
              e("div", ee, [
                e("div", oe, [
                  t(c).userInfo.head_img ? (m(), f("img", {
                    key: 0,
                    src: t(R)(t(c).userInfo.head_img),
                    alt: ""
                  }, null, 8, se)) : (m(), f("span", te, u(t(b)), 1))
                ]),
                e("div", null, [
                  e("div", le, u(t(c).userInfo.username), 1),
                  ne
                ])
              ]),
              s(H, null, {
                default: n(() => [
                  s(d, {
                    onClick: N,
                    class: "rounded-[4px]"
                  }, {
                    default: n(() => [
                      ae
                    ]),
                    _: 1
                  }),
                  s(d, { class: "rounded-[4px]" }, {
                    default: n(() => [
                      s(V, { to: "/tools/authorize" }, {
                        default: n(() => [
                          re
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  s(d, {
                    onClick: l[0] || (l[0] = (p) => _.value = !0),
                    class: "rounded-[4px]"
                  }, {
                    default: n(() => [
                      de
                    ]),
                    _: 1
                  }),
                  s(d, {
                    onClick: q,
                    class: "is-danger rounded-[4px]"
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
            e("div", Q, [
              e("div", W, [
                t(c).userInfo.head_img ? (m(), f("img", {
                  key: 0,
                  src: t(R)(t(c).userInfo.head_img),
                  alt: ""
                }, null, 8, X)) : (m(), f("span", Y, u(t(b)), 1))
              ])
            ])
          ]),
          _: 1
        }, 512),
        s(F, {
          modelValue: _.value,
          "onUpdate:modelValue": l[6] || (l[6] = (p) => _.value = p),
          width: "450px",
          title: "修改密码"
        }, {
          footer: n(() => [
            e("span", ce, [
              s(P, {
                onClick: l[4] || (l[4] = (p) => _.value = !1)
              }, {
                default: n(() => [
                  U(u(t(a)("cancel")), 1)
                ]),
                _: 1
              }),
              s(P, {
                type: "primary",
                onClick: l[5] || (l[5] = (p) => B(k.value))
              }, {
                default: n(() => [
                  U(u(t(a)("save")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            e("div", null, [
              s(D, {
                model: o,
                "label-width": "90px",
                ref_key: "formRef",
                ref: k,
                rules: $,
                class: "page-form"
              }, {
                default: n(() => [
                  s(v, {
                    label: t(a)("originalPassword"),
                    prop: "original_password"
                  }, {
                    default: n(() => [
                      s(h, {
                        modelValue: o.original_password,
                        "onUpdate:modelValue": l[1] || (l[1] = (p) => o.original_password = p),
                        type: "password",
                        placeholder: t(a)("originalPasswordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(v, {
                    label: t(a)("newPassword"),
                    prop: "password"
                  }, {
                    default: n(() => [
                      s(h, {
                        modelValue: o.password,
                        "onUpdate:modelValue": l[2] || (l[2] = (p) => o.password = p),
                        type: "password",
                        placeholder: t(a)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"]),
                      e("div", ie, u(t(a)("passwordTip")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(v, {
                    label: t(a)("passwordCopy"),
                    prop: "password_copy"
                  }, {
                    default: n(() => [
                      s(h, {
                        modelValue: o.password_copy,
                        "onUpdate:modelValue": l[3] || (l[3] = (p) => o.password_copy = p),
                        type: "password",
                        placeholder: t(a)("passwordPlaceholder"),
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
        s(L, {
          ref_key: "userInfoEditRef",
          ref: I
        }, null, 512)
      ]);
    };
  }
});
const Ie = /* @__PURE__ */ K(ue, [["__scopeId", "data-v-3f3cc781"]]);
export {
  Ie as default
};
