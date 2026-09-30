import { defineComponent as z, ref as h, computed as L, reactive as P, resolveComponent as u, openBlock as c, createElementBlock as w, createVNode as t, withCtx as a, createElementVNode as e, unref as l, toDisplayString as _, createBlock as O, createCommentVNode as G, createTextVNode as U, pushScopeId as J, popScopeId as K } from "vue";
import { useRouter as M } from "vue-router";
import { h as Q, t as r, j as R, au as W, a as X } from "./core-shared-c6ad4e77.js";
import Y from "./index-31b5b072.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const f = (g) => (J("data-v-019a73cb"), g = g(), K(), g), Z = { class: "user-info-root" }, ee = { class: "userinfo navbar-hit flex h-full items-center" }, oe = { class: "userinfo-avatar" }, se = ["src"], le = { key: 1 }, ne = { class: "userinfo-pop" }, te = { class: "userinfo-pop-head" }, ae = { class: "userinfo-avatar is-lg" }, re = ["src"], ie = { key: 1 }, de = { class: "userinfo-pop-info" }, pe = { class: "userinfo-pop-name" }, ue = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "userinfo-pop-role" }, "个人中心", -1)), ce = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "userinfo-pop-divider" }, null, -1)), _e = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "userinfo-pop-item" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconqiehuan" }),
  /* @__PURE__ */ e("span", null, "切换站点")
], -1)), fe = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "userinfo-pop-item" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconshezhi1" }),
  /* @__PURE__ */ e("span", null, "账号设置")
], -1)), me = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "userinfo-pop-item" }, [
  /* @__PURE__ */ e("span", { class: "iconfont iconxiugai" }),
  /* @__PURE__ */ e("span", null, "修改密码")
], -1)), we = /* @__PURE__ */ f(() => /* @__PURE__ */ e("div", { class: "userinfo-pop-item" }, [
  /* @__PURE__ */ e("span", { class: "iconfont icontuichudenglu" }),
  /* @__PURE__ */ e("span", null, "退出登录")
], -1)), ge = { class: "form-tip" }, he = { class: "dialog-footer" }, ve = /* @__PURE__ */ z({
  __name: "user-info",
  setup(g, { expose: S }) {
    const E = localStorage.getItem("isAllowChange") === "true", p = Q(), b = h();
    S({ open: () => {
      var n;
      (n = b.value) == null || n.handleOpen();
    } });
    const N = M(), k = L(() => {
      var n;
      return String(((n = p.userInfo) == null ? void 0 : n.username) || "U").slice(0, 1).toUpperCase();
    }), $ = (n) => {
      switch (n) {
        case "logout":
          p.logout();
          break;
      }
    }, q = () => {
      p.logout();
    }, B = (n) => {
      N.push(n);
    }, I = h(null), H = () => {
      var n;
      (n = I.value) == null || n.open();
    }, m = h(!1), x = h(), o = P({
      original_password: "",
      password: "",
      password_copy: ""
    }), A = P({
      original_password: [
        { required: !0, message: r("originalPasswordPlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: r("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: r("passwordPlaceholder"), trigger: "blur" }
      ]
    }), D = (n) => {
      n && n.validate((s) => {
        if (s) {
          let d = "";
          if (o.password && !o.original_password && (d = r("originalPasswordHint")), o.password && o.original_password && !o.password_copy && (d = r("newPasswordHint")), o.password && o.original_password && o.password_copy && o.password != o.password_copy && (d = r("doubleCipherHint")), d) {
            ElNotification({
              type: "error",
              message: d
            });
            return;
          }
          W(o).then((C) => {
            m.value = !1;
          });
        } else
          return !1;
      });
    };
    return (n, s) => {
      const d = u("el-dropdown-item"), C = u("el-dropdown-menu"), F = u("el-dropdown"), v = u("el-input"), y = u("el-form-item"), T = u("el-form"), V = u("el-button"), j = u("el-dialog");
      return c(), w("div", Z, [
        t(F, {
          ref_key: "dropdownRef",
          ref: b,
          class: "user-info-dropdown",
          onCommand: $,
          tabindex: 1,
          "popper-class": "layout-lightside-user-menu"
        }, {
          dropdown: a(() => [
            e("div", ne, [
              e("div", te, [
                e("div", ae, [
                  l(p).userInfo.head_img ? (c(), w("img", {
                    key: 0,
                    src: l(R)(l(p).userInfo.head_img),
                    alt: ""
                  }, null, 8, re)) : (c(), w("span", ie, _(l(k)), 1))
                ]),
                e("div", de, [
                  e("div", pe, _(l(p).userInfo.username), 1),
                  ue
                ])
              ]),
              ce,
              t(C, null, {
                default: a(() => [
                  E ? (c(), O(d, {
                    key: 0,
                    onClick: s[0] || (s[0] = (i) => B("/home/index"))
                  }, {
                    default: a(() => [
                      _e
                    ]),
                    _: 1
                  })) : G("", !0),
                  t(d, { onClick: H }, {
                    default: a(() => [
                      fe
                    ]),
                    _: 1
                  }),
                  t(d, {
                    onClick: s[1] || (s[1] = (i) => m.value = !0)
                  }, {
                    default: a(() => [
                      me
                    ]),
                    _: 1
                  }),
                  t(d, {
                    class: "is-danger",
                    onClick: q
                  }, {
                    default: a(() => [
                      we
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            e("div", ee, [
              e("div", oe, [
                l(p).userInfo.head_img ? (c(), w("img", {
                  key: 0,
                  src: l(R)(l(p).userInfo.head_img),
                  alt: ""
                }, null, 8, se)) : (c(), w("span", le, _(l(k)), 1))
              ])
            ])
          ]),
          _: 1
        }, 512),
        t(j, {
          modelValue: m.value,
          "onUpdate:modelValue": s[7] || (s[7] = (i) => m.value = i),
          width: "450px",
          title: "修改密码"
        }, {
          footer: a(() => [
            e("span", he, [
              t(V, {
                onClick: s[5] || (s[5] = (i) => m.value = !1)
              }, {
                default: a(() => [
                  U(_(l(r)("cancel")), 1)
                ]),
                _: 1
              }),
              t(V, {
                type: "primary",
                onClick: s[6] || (s[6] = (i) => D(x.value))
              }, {
                default: a(() => [
                  U(_(l(r)("save")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            e("div", null, [
              t(T, {
                model: o,
                "label-width": "90px",
                ref_key: "formRef",
                ref: x,
                rules: A,
                class: "page-form"
              }, {
                default: a(() => [
                  t(y, {
                    label: l(r)("originalPassword"),
                    prop: "original_password"
                  }, {
                    default: a(() => [
                      t(v, {
                        modelValue: o.original_password,
                        "onUpdate:modelValue": s[2] || (s[2] = (i) => o.original_password = i),
                        type: "password",
                        placeholder: l(r)("originalPasswordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(y, {
                    label: l(r)("newPassword"),
                    prop: "password"
                  }, {
                    default: a(() => [
                      t(v, {
                        modelValue: o.password,
                        "onUpdate:modelValue": s[3] || (s[3] = (i) => o.password = i),
                        type: "password",
                        placeholder: l(r)("passwordPlaceholder"),
                        clearable: "",
                        class: "input-width",
                        maxlength: "40"
                      }, null, 8, ["modelValue", "placeholder"]),
                      e("div", ge, _(l(r)("passwordTip")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(y, {
                    label: l(r)("passwordCopy"),
                    prop: "password_copy"
                  }, {
                    default: a(() => [
                      t(v, {
                        modelValue: o.password_copy,
                        "onUpdate:modelValue": s[4] || (s[4] = (i) => o.password_copy = i),
                        type: "password",
                        placeholder: l(r)("passwordPlaceholder"),
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
          ref: I
        }, null, 512)
      ]);
    };
  }
});
const Se = /* @__PURE__ */ X(ve, [["__scopeId", "data-v-019a73cb"]]);
export {
  Se as default
};
