import { defineComponent as X, ref as m, computed as Y, resolveComponent as d, resolveDirective as Z, openBlock as f, createBlock as g, unref as u, withCtx as r, createElementVNode as b, createVNode as s, createTextVNode as y, toDisplayString as c, withDirectives as ee, normalizeClass as $, resolveDynamicComponent as B, createElementBlock as le, Fragment as ae, renderList as oe, createCommentVNode as te, pushScopeId as ge, popScopeId as be } from "vue";
import { u as re, t as o, az as M, fp as se, ft as ue, fu as ie, fv as ne, _ as de } from "./core-shared-c8d7774e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const me = { class: "max-h-[60vh]" }, pe = { class: "w-full" }, _e = { class: "dialog-footer" }, ve = /* @__PURE__ */ X({
  __name: "user-edit",
  emits: ["complete"],
  setup(fe, { expose: D, emit: R }) {
    const x = re(), _ = m(!1), p = m(!0), l = m({
      uid: 0,
      username: "",
      password: "",
      head_img: "",
      mobile: "",
      real_name: "",
      confirm_password: "",
      create_site_limit: [],
      group_ids: []
    }), w = m({}), N = m(), q = Y(() => ({
      username: [
        { required: !0, message: o("usernamePlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: x.userInfo && x.userInfo.is_super_admin == !0, message: o("passwordPlaceholder"), trigger: "blur" }
      ],
      mobile: [
        { required: !0, message: o("请输入手机号"), trigger: "blur" },
        {
          validator: (i, e, t) => {
            M.mobile(e) ? t() : t(new Error(o("手机号格式错误")));
          },
          trigger: "blur"
        }
      ],
      real_name: [
        { required: !0, message: o("userRealNamePlaceholder"), trigger: "blur" }
      ],
      confirm_password: [
        { required: x.userInfo && x.userInfo.is_super_admin == !0, message: o("confirmPasswordPlaceholder"), trigger: "blur" },
        {
          validator: (i, e, t) => {
            e != l.value.password ? t(new Error(o("confirmPasswordError"))) : t();
          },
          trigger: "blur"
        }
      ],
      create_site_limit: [
        {
          validator: (i, e, t) => {
            l.value.uid && t();
            let n = !0;
            for (let h = 0; h < l.value.create_site_limit.length; h++) {
              const v = l.value.create_site_limit[h];
              if (M.empty(v.num)) {
                t(o("siteNumPlaceholder")), n = !1;
                break;
              }
              if (v.num < 1) {
                t(o("siteNumCannotLtOne")), n = !1;
                break;
              }
              if (M.empty(v.month)) {
                t(o("siteMonthPlaceholder")), n = !1;
                break;
              }
              if (v.month < 0) {
                t(o("siteMonthCannotLtOne")), n = !1;
                break;
              }
            }
            n && t();
          }
        }
      ]
    }));
    se().then(({ data: i }) => {
      const e = {};
      i.forEach((t) => {
        e[t.group_id] = t;
      }), w.value = e;
    });
    const L = (i = 0) => {
      i ? ue(i).then(({ data: e }) => {
        l.value.uid = e.uid, l.value.username = e.username, l.value.mobile = e.mobile, l.value.real_name = e.real_name, l.value.head_img = e.head_img, p.value = !1, _.value = !0;
      }) : (l.value = {
        uid: 0,
        username: "",
        password: "",
        head_img: "",
        mobile: "",
        real_name: "",
        confirm_password: "",
        create_site_limit: [],
        group_ids: []
      }, p.value = !1, _.value = !0);
    }, G = R, T = (i) => {
      const e = [];
      i.forEach((t) => {
        e.push({
          group_id: t,
          num: 1,
          month: 1
        });
      }), l.value.create_site_limit = e;
    }, z = async (i) => {
      p.value || !i || await i.validate(async (e) => {
        e && (p.value = !0, (l.value.uid ? ie : ne)(l.value).then(() => {
          p.value = !1, _.value = !1, G("complete");
        }).catch(() => {
          p.value = !1;
        }));
      });
    }, V = m(!0), U = m(!0), k = m(!0), C = m("password"), O = () => {
      C.value = C.value === "password" ? "text" : "password";
    }, P = m("password"), F = () => {
      P.value = P.value === "password" ? "text" : "password";
    };
    return D({
      showDialog: _,
      setFormData: L
    }), (i, e) => {
      const t = d("el-input"), n = d("el-form-item"), h = d("upload-image"), v = d("el-icon"), H = d("el-checkbox"), j = d("el-checkbox-group"), I = d("el-table-column"), A = d("el-table"), J = d("el-form"), K = d("el-scrollbar"), E = d("el-button"), Q = d("el-dialog"), W = Z("loading");
      return f(), g(Q, {
        modelValue: _.value,
        "onUpdate:modelValue": e[17] || (e[17] = (a) => _.value = a),
        title: l.value.uid ? u(o)("updateUser") : u(o)("addUser"),
        width: "750px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          b("span", _e, [
            s(E, {
              onClick: e[15] || (e[15] = (a) => _.value = !1)
            }, {
              default: r(() => [
                y(c(u(o)("cancel")), 1)
              ]),
              _: 1
            }),
            s(E, {
              type: "primary",
              loading: p.value,
              onClick: e[16] || (e[16] = (a) => z(N.value))
            }, {
              default: r(() => [
                y(c(u(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          s(K, null, {
            default: r(() => [
              b("div", me, [
                ee((f(), g(J, {
                  model: l.value,
                  "label-width": "120px",
                  ref_key: "formRef",
                  ref: N,
                  rules: q.value,
                  class: "page-form",
                  autocomplete: "off"
                }, {
                  default: r(() => [
                    s(n, {
                      label: u(o)("username"),
                      prop: "username"
                    }, {
                      default: r(() => [
                        s(t, {
                          modelValue: l.value.username,
                          "onUpdate:modelValue": e[0] || (e[0] = (a) => l.value.username = a),
                          modelModifiers: { trim: !0 },
                          clearable: "",
                          placeholder: u(o)("usernamePlaceholder"),
                          class: "input-width",
                          readonly: l.value.uid,
                          disabled: l.value.uid,
                          onClick: e[1] || (e[1] = (a) => V.value = !1),
                          onBlur: e[2] || (e[2] = (a) => V.value = !0)
                        }, null, 8, ["modelValue", "placeholder", "readonly", "disabled"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(n, {
                      label: u(o)("headImg")
                    }, {
                      default: r(() => [
                        s(h, {
                          modelValue: l.value.head_img,
                          "onUpdate:modelValue": e[3] || (e[3] = (a) => l.value.head_img = a)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(n, {
                      label: u(o)("手机号"),
                      prop: "mobile"
                    }, {
                      default: r(() => [
                        s(t, {
                          modelValue: l.value.mobile,
                          "onUpdate:modelValue": e[4] || (e[4] = (a) => l.value.mobile = a),
                          modelModifiers: { trim: !0 },
                          placeholder: u(o)("请输入手机号"),
                          clearable: "",
                          class: "input-width",
                          maxlength: "11",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(n, {
                      label: u(o)("userRealName"),
                      prop: "real_name"
                    }, {
                      default: r(() => [
                        s(t, {
                          modelValue: l.value.real_name,
                          "onUpdate:modelValue": e[5] || (e[5] = (a) => l.value.real_name = a),
                          modelModifiers: { trim: !0 },
                          placeholder: u(o)("userRealNamePlaceholder"),
                          readonly: V.value,
                          onClick: e[6] || (e[6] = (a) => V.value = !1),
                          onBlur: e[7] || (e[7] = (a) => V.value = !0),
                          clearable: "",
                          class: "input-width",
                          maxlength: "10",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "placeholder", "readonly"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(n, {
                      label: u(o)("password"),
                      prop: "password"
                    }, {
                      default: r(() => [
                        s(t, {
                          modelValue: l.value.password,
                          "onUpdate:modelValue": e[8] || (e[8] = (a) => l.value.password = a),
                          modelModifiers: { trim: !0 },
                          class: $([C.value == "text" ? "" : "displayPass", "input-width"]),
                          clearable: "",
                          placeholder: u(o)("passwordPlaceholder"),
                          readonly: U.value,
                          onClick: e[9] || (e[9] = (a) => U.value = !1),
                          onBlur: e[10] || (e[10] = (a) => U.value = !0)
                        }, {
                          suffix: r(() => [
                            s(v, {
                              onClick: O,
                              class: "cursor-pointer"
                            }, {
                              default: r(() => [
                                (f(), g(B(C.value === "password" ? "Hide" : "View")))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "class", "placeholder", "readonly"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(n, {
                      label: u(o)("confirmPassword"),
                      prop: "confirm_password"
                    }, {
                      default: r(() => [
                        s(t, {
                          modelValue: l.value.confirm_password,
                          "onUpdate:modelValue": e[11] || (e[11] = (a) => l.value.confirm_password = a),
                          modelModifiers: { trim: !0 },
                          class: $([P.value == "text" ? "" : "displayPass", "input-width"]),
                          placeholder: u(o)("confirmPasswordPlaceholder"),
                          clearable: "",
                          readonly: k.value,
                          onClick: e[12] || (e[12] = (a) => k.value = !1),
                          onBlur: e[13] || (e[13] = (a) => k.value = !0)
                        }, {
                          suffix: r(() => [
                            s(v, {
                              onClick: F,
                              class: "cursor-pointer"
                            }, {
                              default: r(() => [
                                (f(), g(B(P.value === "password" ? "Hide" : "View")))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "class", "placeholder", "readonly"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    !l.value.uid && Object.keys(w.value).length ? (f(), g(n, {
                      key: 0,
                      label: u(o)("userCreateSiteLimit"),
                      prop: "create_site_limit"
                    }, {
                      default: r(() => [
                        b("div", null, [
                          b("div", null, c(u(o)("siteGroup")), 1),
                          s(j, {
                            modelValue: l.value.group_ids,
                            "onUpdate:modelValue": e[14] || (e[14] = (a) => l.value.group_ids = a),
                            onChange: T
                          }, {
                            default: r(() => [
                              (f(!0), le(ae, null, oe(w.value, (a) => (f(), g(H, {
                                label: a.group_id
                              }, {
                                default: r(() => [
                                  y(c(a.group_name), 1)
                                ]),
                                _: 2
                              }, 1032, ["label"]))), 256))
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        b("div", pe, [
                          b("div", null, c(u(o)("userCreateSiteLimit")), 1),
                          s(A, {
                            data: l.value.create_site_limit,
                            size: "large",
                            class: "w-full"
                          }, {
                            default: r(() => [
                              s(I, {
                                label: u(o)("siteGroup"),
                                "show-overflow-tooltip": !0
                              }, {
                                default: r(({ row: a }) => [
                                  y(c(w.value[a.group_id] ? w.value[a.group_id].group_name : ""), 1)
                                ]),
                                _: 1
                              }, 8, ["label"]),
                              s(I, {
                                label: u(o)("createSiteNum")
                              }, {
                                default: r(({ $index: a }) => [
                                  s(t, {
                                    modelValue: l.value.create_site_limit[a].num,
                                    "onUpdate:modelValue": (S) => l.value.create_site_limit[a].num = S,
                                    modelModifiers: { number: !0, trim: !0 }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }, 8, ["label"]),
                              s(I, {
                                label: u(o)("siteMonth")
                              }, {
                                default: r(({ $index: a }) => [
                                  s(t, {
                                    modelValue: l.value.create_site_limit[a].month,
                                    "onUpdate:modelValue": (S) => l.value.create_site_limit[a].month = S,
                                    modelModifiers: { number: !0, trim: !0 }
                                  }, {
                                    append: r(() => [
                                      y(c(u(o)("month")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }, 8, ["label"])
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"])) : te("", !0)
                  ]),
                  _: 1
                }, 8, ["model", "rules"])), [
                  [W, p.value]
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const Ue = /* @__PURE__ */ de(ve, [["__scopeId", "data-v-726eaa84"]]);
export {
  Ue as default
};
