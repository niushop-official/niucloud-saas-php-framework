import { defineComponent as oe, ref as c, reactive as re, computed as E, resolveComponent as p, resolveDirective as te, openBlock as u, createBlock as g, withCtx as s, createElementVNode as m, createVNode as t, createTextVNode as b, toDisplayString as _, unref as r, withDirectives as B, createElementBlock as v, Fragment as U, renderList as D, vShow as R } from "vue";
import { _ as j } from "./member_head-81b0c11e.js";
import { fo as F, t as a, i as G, fp as se, fq as de, fr as ie, fs as ue } from "./core-shared-e1759ce4.js";
import { g as ne } from "./addon-066ea9ee.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const pe = { key: 0 }, me = { class: "flex items-center" }, fe = { class: "flex items-center" }, ce = {
  key: 1,
  src: j,
  alt: "",
  class: "mr-[10px] w-[24px]"
}, _e = { key: 1 }, ge = { class: "flex items-center" }, ve = { class: "flex items-center" }, we = {
  key: 1,
  src: j,
  alt: "",
  class: "mr-[10px] w-[24px]"
}, be = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, Ve = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, he = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, xe = { class: "dialog-footer" }, Se = /* @__PURE__ */ oe({
  __name: "edit-site",
  emits: ["complete"],
  setup(ye, { expose: z, emit: O }) {
    const x = c(!1), f = c(!0), $ = c([]), T = c([]), H = c([]);
    F({}).then(({ data: i }) => {
      T.value = i;
    });
    const C = new Date();
    C.setTime(C.getTime() + 3600 * 1e3 * 2 * 360);
    const q = {
      site_id: "",
      site_name: "",
      real_name: "",
      uid: "",
      username: "",
      password: "",
      confirm_password: "",
      expire_time: C,
      site_domain: "",
      group_id: ""
    }, o = re({ ...q }), N = c(), y = c(!0), P = c(!0), k = c(!0), V = (i) => {
      let e = setTimeout(() => {
        clearTimeout(e), i == "user_name_input" && (y.value = !1), i == "password_input" && (P.value = !1), i == "confirm_password_input" && (k.value = !1);
      }, 200);
    };
    (async () => {
      $.value = await (await se()).data;
    })();
    const J = c([]);
    ne().then(({ data: i }) => {
      J.value = i;
    }).catch();
    const K = async (i = null) => {
      if (f.value = !0, Object.assign(o, q), i) {
        const e = await (await de(i.site_id)).data;
        H.value = e, Object.keys(o).forEach((d) => {
          e[d] != null && (o[d] = e[d]);
        });
      }
      f.value = !1;
    }, Q = E(() => ({
      site_name: [
        { required: !0, message: a("siteNamePlaceholder"), trigger: "blur" }
      ],
      group_id: [
        { required: !0, message: a("groupIdPlaceholder"), trigger: "blur" }
      ],
      uid: [
        { required: !0, message: a("uIdPlaceholder"), trigger: "blur" },
        {
          validator: (i, e, d) => {
            o.uid === "" ? d(new Error(a("managerPlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ],
      username: [
        { required: o.uid == 0, message: a("usernamePlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: o.uid == 0, message: a("passwordPlaceholder"), trigger: "blur" }
      ],
      real_name: [
        { required: !0, message: a("userRealNamePlaceholder"), trigger: "blur" }
      ],
      confirm_password: [
        { required: o.uid == 0, message: a("confirmPasswordPlaceholder"), trigger: "blur" },
        {
          validator: (i, e, d) => {
            o.uid == 0 && e != o.password ? d(new Error(a("confirmPasswordError"))) : d();
          },
          trigger: "blur"
        }
      ],
      expire_time: [
        { required: !0, message: a("expireTimePlaceholder"), trigger: "blur" }
      ]
    })), W = O, X = E(() => f.value ? "" : o.site_id ? a("editSite") : a("addSite")), Y = async (i) => {
      f.value || !i || await i.validate(async (e) => {
        if (e) {
          f.value = !0;
          const d = o;
          (d.site_id ? ie : ue)(d).then((w) => {
            f.value = !1, x.value = !1, F({}).then(({ data: h }) => {
              T.value = h;
            }), W("complete");
          }).catch(() => {
            f.value = !1;
          });
        }
      });
    };
    return window.onload = function() {
      const i = document.getElementsByTagName("input");
      for (let e = 0; e < i.length; e++)
        i[e].setAttribute("autocomplete", "off");
    }, z({
      showDialog: x,
      setFormData: K,
      loading: f
    }), (i, e) => {
      const d = p("el-input"), n = p("el-form-item"), w = p("el-option"), h = p("el-select"), S = p("Plus"), I = p("el-icon"), A = p("el-avatar"), Z = p("el-date-picker"), ee = p("el-form"), L = p("el-button"), le = p("el-dialog"), ae = te("loading");
      return u(), g(le, {
        modelValue: x.value,
        "onUpdate:modelValue": e[27] || (e[27] = (l) => x.value = l),
        title: X.value,
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: s(() => [
          m("span", xe, [
            t(L, {
              onClick: e[25] || (e[25] = (l) => x.value = !1)
            }, {
              default: s(() => [
                b(_(r(a)("cancel")), 1)
              ]),
              _: 1
            }),
            t(L, {
              type: "primary",
              loading: f.value,
              onClick: e[26] || (e[26] = (l) => Y(N.value))
            }, {
              default: s(() => [
                b(_(r(a)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: s(() => [
          B((u(), g(ee, {
            model: o,
            "label-width": "100px",
            ref_key: "formRef",
            ref: N,
            rules: Q.value,
            class: "page-form",
            autocomplete: "off"
          }, {
            default: s(() => [
              o.site_id == 0 ? (u(), v("div", pe, [
                t(n, {
                  label: r(a)("siteName"),
                  prop: "site_name"
                }, {
                  default: s(() => [
                    t(d, {
                      modelValue: o.site_name,
                      "onUpdate:modelValue": e[0] || (e[0] = (l) => o.site_name = l),
                      modelModifiers: { trim: !0 },
                      maxlength: "20",
                      clearable: "",
                      placeholder: r(a)("siteNamePlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(n, {
                  label: r(a)("groupId"),
                  prop: "group_id"
                }, {
                  default: s(() => [
                    t(h, {
                      modelValue: o.group_id,
                      "onUpdate:modelValue": e[1] || (e[1] = (l) => o.group_id = l),
                      clearable: "",
                      placeholder: r(a)("groupIdPlaceholder"),
                      class: "input-width"
                    }, {
                      default: s(() => [
                        (u(!0), v(U, null, D($.value, (l, M) => (u(), g(w, {
                          label: l.group_name,
                          value: l.group_id,
                          key: M
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(n, {
                  label: r(a)("manager"),
                  prop: "uid"
                }, {
                  default: s(() => [
                    t(h, {
                      modelValue: o.uid,
                      "onUpdate:modelValue": e[2] || (e[2] = (l) => o.uid = l),
                      placeholder: r(a)("managerPlaceholder"),
                      class: "input-width",
                      filterable: ""
                    }, {
                      default: s(() => [
                        t(w, {
                          label: r(a)("newAddManager"),
                          value: 0
                        }, {
                          default: s(() => [
                            m("div", me, [
                              t(I, { class: "mr-[10px]" }, {
                                default: s(() => [
                                  t(S)
                                ]),
                                _: 1
                              }),
                              b(" " + _(r(a)("newAddManager")), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        (u(!0), v(U, null, D(T.value, (l) => (u(), g(w, {
                          key: l.uid,
                          label: l.username,
                          value: l.uid
                        }, {
                          default: s(() => [
                            m("div", fe, [
                              l.head_img ? (u(), g(A, {
                                key: 0,
                                src: r(G)(l.head_img),
                                size: "small",
                                class: "mr-[10px]"
                              }, null, 8, ["src"])) : (u(), v("img", ce)),
                              b(" " + _(l.username), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                B(m("div", null, [
                  t(n, {
                    label: r(a)("username"),
                    prop: "username"
                  }, {
                    default: s(() => [
                      t(d, {
                        modelValue: o.username,
                        "onUpdate:modelValue": e[3] || (e[3] = (l) => o.username = l),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: r(a)("usernamePlaceholder"),
                        class: "input-width",
                        readonly: y.value,
                        onClick: e[4] || (e[4] = (l) => V("user_name_input")),
                        onBlur: e[5] || (e[5] = (l) => y.value = !0)
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(n, {
                    label: r(a)("password"),
                    prop: "password"
                  }, {
                    default: s(() => [
                      t(d, {
                        modelValue: o.password,
                        "onUpdate:modelValue": e[6] || (e[6] = (l) => o.password = l),
                        modelModifiers: { trim: !0 },
                        autocomplete: "off",
                        clearable: "",
                        placeholder: r(a)("passwordPlaceholder"),
                        class: "input-width",
                        "show-password": !0,
                        type: "password",
                        readonly: P.value,
                        onClick: e[7] || (e[7] = (l) => V("password_input")),
                        onBlur: e[8] || (e[8] = (l) => P.value = !0)
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(n, {
                    label: r(a)("confirmPassword"),
                    prop: "confirm_password"
                  }, {
                    default: s(() => [
                      t(d, {
                        modelValue: o.confirm_password,
                        "onUpdate:modelValue": e[9] || (e[9] = (l) => o.confirm_password = l),
                        modelModifiers: { trim: !0 },
                        autocomplete: "off",
                        placeholder: r(a)("confirmPasswordPlaceholder"),
                        type: "password",
                        "show-password": !0,
                        clearable: "",
                        class: "input-width",
                        readonly: k.value,
                        onClick: e[10] || (e[10] = (l) => V("confirm_password_input")),
                        onBlur: e[11] || (e[11] = (l) => k.value = !0)
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ], 512), [
                  [R, o.uid === 0]
                ])
              ])) : (u(), v("div", _e, [
                t(n, {
                  label: r(a)("siteName")
                }, {
                  default: s(() => [
                    b(_(o.site_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(n, {
                  label: r(a)("groupId"),
                  prop: "group_id"
                }, {
                  default: s(() => [
                    t(h, {
                      modelValue: o.group_id,
                      "onUpdate:modelValue": e[12] || (e[12] = (l) => o.group_id = l),
                      clearable: "",
                      placeholder: r(a)("groupIdPlaceholder"),
                      class: "input-width"
                    }, {
                      default: s(() => [
                        (u(!0), v(U, null, D($.value, (l, M) => (u(), g(w, {
                          label: l.group_name,
                          value: l.group_id,
                          key: M
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(n, {
                  label: r(a)("manager"),
                  prop: "uid"
                }, {
                  default: s(() => [
                    t(h, {
                      modelValue: o.uid,
                      "onUpdate:modelValue": e[13] || (e[13] = (l) => o.uid = l),
                      placeholder: r(a)("managerPlaceholder"),
                      class: "input-width",
                      filterable: ""
                    }, {
                      default: s(() => [
                        t(w, {
                          label: r(a)("newAddManager"),
                          value: 0
                        }, {
                          default: s(() => [
                            m("div", ge, [
                              t(I, { class: "mr-[10px]" }, {
                                default: s(() => [
                                  t(S)
                                ]),
                                _: 1
                              }),
                              b(" " + _(r(a)("newAddManager")), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        (u(!0), v(U, null, D(T.value, (l) => (u(), g(w, {
                          key: l.uid,
                          label: l.username,
                          value: l.uid
                        }, {
                          default: s(() => [
                            m("div", ve, [
                              l.head_img ? (u(), g(A, {
                                key: 0,
                                src: r(G)(l.head_img),
                                size: "small",
                                class: "mr-[10px]"
                              }, null, 8, ["src"])) : (u(), v("img", we)),
                              b(" " + _(l.username), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                B(m("div", null, [
                  t(n, {
                    label: r(a)("username"),
                    prop: "username"
                  }, {
                    default: s(() => [
                      t(d, {
                        modelValue: o.username,
                        "onUpdate:modelValue": e[14] || (e[14] = (l) => o.username = l),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: r(a)("usernamePlaceholder"),
                        class: "input-width",
                        readonly: y.value,
                        onClick: e[15] || (e[15] = (l) => V("user_name_input")),
                        onBlur: e[16] || (e[16] = (l) => y.value = !0)
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(n, {
                    label: r(a)("password"),
                    prop: "password"
                  }, {
                    default: s(() => [
                      t(d, {
                        modelValue: o.password,
                        "onUpdate:modelValue": e[17] || (e[17] = (l) => o.password = l),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: r(a)("passwordPlaceholder"),
                        class: "input-width",
                        "show-password": !0,
                        type: "password",
                        readonly: P.value,
                        onClick: e[18] || (e[18] = (l) => V("password_input")),
                        onBlur: e[19] || (e[19] = (l) => P.value = !0)
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(n, {
                    label: r(a)("confirmPassword"),
                    prop: "confirm_password"
                  }, {
                    default: s(() => [
                      t(d, {
                        modelValue: o.confirm_password,
                        "onUpdate:modelValue": e[20] || (e[20] = (l) => o.confirm_password = l),
                        modelModifiers: { trim: !0 },
                        placeholder: r(a)("confirmPasswordPlaceholder"),
                        type: "password",
                        "show-password": !0,
                        clearable: "",
                        class: "input-width",
                        readonly: k.value,
                        onClick: e[21] || (e[21] = (l) => V("confirm_password_input")),
                        onBlur: e[22] || (e[22] = (l) => k.value = !0)
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ], 512), [
                  [R, o.uid === 0]
                ])
              ])),
              t(n, {
                label: r(a)("siteDomain"),
                prop: "site_domain"
              }, {
                default: s(() => [
                  t(d, {
                    modelValue: o.site_domain,
                    "onUpdate:modelValue": e[23] || (e[23] = (l) => o.site_domain = l),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: r(a)("siteDomainPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"]),
                  m("div", null, [
                    m("p", be, _(r(a)("siteDomainTips")), 1),
                    m("p", Ve, _(r(a)("siteDomainTipsTwo")), 1),
                    m("p", he, _(r(a)("siteDomainTipsThree")), 1)
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              t(n, {
                label: r(a)("expireTime"),
                prop: "expire_time",
                class: "input-width"
              }, {
                default: s(() => [
                  t(Z, {
                    class: "flex-1 !flex",
                    modelValue: o.expire_time,
                    "onUpdate:modelValue": e[24] || (e[24] = (l) => o.expire_time = l),
                    clearable: "",
                    type: "datetime",
                    placeholder: r(a)("expireTimePlaceholder")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [ae, f.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Se as default
};
