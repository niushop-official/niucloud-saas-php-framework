import { defineComponent as ie, ref as p, reactive as ne, computed as R, resolveComponent as m, resolveDirective as ue, openBlock as n, createElementBlock as _, Fragment as V, createVNode as r, unref as o, withCtx as d, createElementVNode as f, createTextVNode as v, toDisplayString as g, withDirectives as j, createBlock as w, renderList as M, vShow as pe, pushScopeId as Be, popScopeId as Ee, nextTick as me } from "vue";
import { _ as G } from "./member_head-81b0c11e.js";
import { t, j as F, fT as ce, fU as _e, fV as fe, fW as ge, fX as ve, a as we } from "./core-shared-c6ad4e77.js";
import { a as he } from "./addon-bae583af.js";
import be from "./index-41dc1a99.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const xe = { key: 0 }, Ve = { class: "flex items-center" }, ye = { class: "flex items-center" }, ke = {
  key: 1,
  src: G,
  alt: "",
  class: "mr-[10px] w-[24px]"
}, Pe = {
  key: 1,
  class: "account-control"
}, Ue = { key: 1 }, Me = { class: "input-width manager-field flex items-center" }, Se = { class: "flex items-center" }, Ce = {
  key: 1,
  src: G,
  alt: "",
  class: "mr-[10px] w-[24px]"
}, Ie = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, Te = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, De = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, Ne = { class: "dialog-footer" }, $e = /* @__PURE__ */ ie({
  __name: "edit-site",
  emits: ["complete"],
  setup(Le, { expose: z, emit: O }) {
    const b = p(!1), c = p(!0), S = p([]), C = p([]), W = p([]), $ = p(), I = () => ce({}).then(({ data: s }) => {
      C.value = s;
    });
    I();
    const X = () => {
      var s;
      (s = $.value) == null || s.open();
    }, H = (s) => {
      s.status && I().then(() => {
        s.uid && (a.uid = s.uid);
      });
    }, T = new Date();
    T.setTime(T.getTime() + 3600 * 1e3 * 2 * 360);
    const L = {
      site_id: "",
      site_name: "",
      real_name: "",
      uid: "",
      username: "",
      password: "",
      confirm_password: "",
      expire_time: T,
      site_domain: "",
      group_id: ""
    }, a = ne({ ...L }), D = p(), y = p(!0), k = p(!0), P = p(!0), q = () => {
      y.value = !0, k.value = !0, P.value = !0;
    }, A = () => {
      a.username = "", a.password = "", a.confirm_password = "", q();
    }, B = () => {
      me(() => {
        var s;
        (s = D.value) == null || s.clearValidate(["uid", "username", "password", "confirm_password"]);
      });
    }, J = () => {
      A(), B();
    }, K = () => {
      A(), a.uid = "", B();
    };
    (async () => {
      S.value = await (await _e()).data;
    })();
    const Q = p([]);
    he().then(({ data: s }) => {
      Q.value = s;
    }).catch();
    const Y = async (s = null) => {
      if (c.value = !0, Object.assign(a, L), q(), s) {
        const l = await (await fe(s.site_id)).data;
        W.value = l, Object.keys(a).forEach((i) => {
          l[i] != null && (a[i] = l[i]);
        });
      }
      c.value = !1;
    }, Z = R(() => {
      const s = a.site_id == 0 && a.uid === 0;
      return {
        site_name: [
          { required: !0, message: t("siteNamePlaceholder"), trigger: "blur" }
        ],
        group_id: [
          { required: !0, message: t("groupIdPlaceholder"), trigger: "blur" }
        ],
        uid: s ? [] : [
          { required: !0, message: t("uIdPlaceholder"), trigger: "change" },
          {
            validator: (l, i, u) => {
              a.uid === "" ? u(new Error(t("managerPlaceholder"))) : u();
            },
            trigger: "change"
          }
        ],
        username: [{ required: s, message: t("addManagerUsernamePlaceholder"), trigger: "blur" }],
        password: [{ required: s, message: t("addManagerPasswordPlaceholder"), trigger: "blur" }],
        confirm_password: [
          { required: s, message: t("addManagerConfirmPasswordPlaceholder"), trigger: "blur" },
          {
            validator: (l, i, u) => {
              s && i != a.password ? u(new Error(t("addManagerConfirmPasswordError"))) : u();
            },
            trigger: "blur"
          }
        ],
        expire_time: [
          { required: !0, message: t("expireTimePlaceholder"), trigger: "blur" }
        ]
      };
    }), ee = R(() => c.value ? "" : a.site_id ? t("editSite") : t("addSite")), le = async (s) => {
      c.value || !s || await s.validate(async (l) => {
        if (l) {
          c.value = !0;
          const i = { ...a };
          i.site_id == 0 && i.uid === 0 || (delete i.username, delete i.password), delete i.confirm_password, (i.site_id ? ge : ve)(i).then((x) => {
            c.value = !1, b.value = !1, I(), O("complete");
          }).catch(() => {
            c.value = !1;
          });
        }
      });
    };
    return z({
      showDialog: b,
      setFormData: Y,
      loading: c
    }), (s, l) => {
      const i = m("el-input"), u = m("el-form-item"), h = m("el-option"), x = m("el-select"), ae = m("Plus"), te = m("el-icon"), E = m("el-avatar"), U = m("el-button"), oe = m("el-date-picker"), re = m("el-form"), se = m("el-dialog"), de = ue("loading");
      return n(), _(V, null, [
        r(se, {
          modelValue: b.value,
          "onUpdate:modelValue": l[18] || (l[18] = (e) => b.value = e),
          title: o(ee),
          width: "560px",
          "destroy-on-close": !0
        }, {
          footer: d(() => [
            f("span", Ne, [
              r(U, {
                onClick: l[16] || (l[16] = (e) => b.value = !1)
              }, {
                default: d(() => [
                  v(g(o(t)("cancel")), 1)
                ]),
                _: 1
              }),
              r(U, {
                type: "primary",
                loading: c.value,
                onClick: l[17] || (l[17] = (e) => le(D.value))
              }, {
                default: d(() => [
                  v(g(o(t)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: d(() => [
            j((n(), w(re, {
              model: a,
              "label-width": "100px",
              ref_key: "formRef",
              ref: D,
              rules: o(Z),
              class: "page-form",
              autocomplete: "off"
            }, {
              default: d(() => [
                a.site_id == 0 ? (n(), _("div", xe, [
                  r(u, {
                    label: o(t)("siteName"),
                    prop: "site_name"
                  }, {
                    default: d(() => [
                      r(i, {
                        modelValue: a.site_name,
                        "onUpdate:modelValue": l[0] || (l[0] = (e) => a.site_name = e),
                        modelModifiers: { trim: !0 },
                        maxlength: "20",
                        clearable: "",
                        placeholder: o(t)("siteNamePlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(u, {
                    label: o(t)("groupId"),
                    prop: "group_id"
                  }, {
                    default: d(() => [
                      r(x, {
                        modelValue: a.group_id,
                        "onUpdate:modelValue": l[1] || (l[1] = (e) => a.group_id = e),
                        clearable: "",
                        placeholder: o(t)("groupIdPlaceholder"),
                        class: "input-width"
                      }, {
                        default: d(() => [
                          (n(!0), _(V, null, M(S.value, (e, N) => (n(), w(h, {
                            label: e.group_name,
                            value: e.group_id,
                            key: N
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(u, {
                    label: a.uid === 0 ? o(t)("addManagerUsername") : o(t)("manager"),
                    prop: a.uid === 0 ? "username" : "uid"
                  }, {
                    default: d(() => [
                      a.uid !== 0 ? (n(), w(x, {
                        key: 0,
                        modelValue: a.uid,
                        "onUpdate:modelValue": l[2] || (l[2] = (e) => a.uid = e),
                        placeholder: o(t)("managerPlaceholder"),
                        filterable: "",
                        class: "input-width",
                        onChange: J
                      }, {
                        default: d(() => [
                          r(h, {
                            label: "新增站点管理员",
                            value: 0
                          }, {
                            default: d(() => [
                              f("div", Ve, [
                                r(te, { class: "mr-[10px]" }, {
                                  default: d(() => [
                                    r(ae)
                                  ]),
                                  _: 1
                                }),
                                v(" 新增站点管理员 ")
                              ])
                            ]),
                            _: 1
                          }),
                          (n(!0), _(V, null, M(C.value, (e) => (n(), w(h, {
                            key: e.uid,
                            label: e.username,
                            value: e.uid
                          }, {
                            default: d(() => [
                              f("div", ye, [
                                e.head_img ? (n(), w(E, {
                                  key: 0,
                                  src: o(F)(e.head_img),
                                  size: "small",
                                  class: "mr-[10px]"
                                }, null, 8, ["src"])) : (n(), _("img", ke)),
                                v(" " + g(e.username), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])) : (n(), _("div", Pe, [
                        r(i, {
                          modelValue: a.username,
                          "onUpdate:modelValue": l[3] || (l[3] = (e) => a.username = e),
                          modelModifiers: { trim: !0 },
                          clearable: "",
                          placeholder: o(t)("addManagerUsernamePlaceholder"),
                          autocomplete: "off",
                          readonly: y.value,
                          onClick: l[4] || (l[4] = (e) => y.value = !1),
                          onBlur: l[5] || (l[5] = (e) => y.value = !0)
                        }, null, 8, ["modelValue", "placeholder", "readonly"]),
                        r(U, {
                          link: "",
                          type: "primary",
                          class: "ml-[10px] shrink-0",
                          onClick: K
                        }, {
                          default: d(() => [
                            v(" 选择 ")
                          ]),
                          _: 1
                        })
                      ]))
                    ]),
                    _: 1
                  }, 8, ["label", "prop"]),
                  j(f("div", null, [
                    r(u, {
                      label: o(t)("addManagerPassword"),
                      prop: "password"
                    }, {
                      default: d(() => [
                        r(i, {
                          modelValue: a.password,
                          "onUpdate:modelValue": l[6] || (l[6] = (e) => a.password = e),
                          modelModifiers: { trim: !0 },
                          clearable: "",
                          placeholder: o(t)("addManagerPasswordPlaceholder"),
                          class: "input-width",
                          autocomplete: "new-password",
                          "show-password": !0,
                          type: "password",
                          readonly: k.value,
                          onClick: l[7] || (l[7] = (e) => k.value = !1),
                          onBlur: l[8] || (l[8] = (e) => k.value = !0)
                        }, null, 8, ["modelValue", "placeholder", "readonly"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    r(u, {
                      label: o(t)("addManagerConfirmPassword"),
                      prop: "confirm_password"
                    }, {
                      default: d(() => [
                        r(i, {
                          modelValue: a.confirm_password,
                          "onUpdate:modelValue": l[9] || (l[9] = (e) => a.confirm_password = e),
                          modelModifiers: { trim: !0 },
                          clearable: "",
                          placeholder: o(t)("addManagerConfirmPasswordPlaceholder"),
                          class: "input-width",
                          autocomplete: "new-password",
                          "show-password": !0,
                          type: "password",
                          readonly: P.value,
                          onClick: l[10] || (l[10] = (e) => P.value = !1),
                          onBlur: l[11] || (l[11] = (e) => P.value = !0)
                        }, null, 8, ["modelValue", "placeholder", "readonly"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ], 512), [
                    [pe, a.uid === 0]
                  ])
                ])) : (n(), _("div", Ue, [
                  r(u, {
                    label: o(t)("siteName")
                  }, {
                    default: d(() => [
                      v(g(a.site_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(u, {
                    label: o(t)("groupId"),
                    prop: "group_id"
                  }, {
                    default: d(() => [
                      r(x, {
                        modelValue: a.group_id,
                        "onUpdate:modelValue": l[12] || (l[12] = (e) => a.group_id = e),
                        clearable: "",
                        placeholder: o(t)("groupIdPlaceholder"),
                        class: "input-width"
                      }, {
                        default: d(() => [
                          (n(!0), _(V, null, M(S.value, (e, N) => (n(), w(h, {
                            label: e.group_name,
                            value: e.group_id,
                            key: N
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(u, {
                    label: o(t)("manager"),
                    prop: "uid"
                  }, {
                    default: d(() => [
                      f("div", Me, [
                        r(x, {
                          modelValue: a.uid,
                          "onUpdate:modelValue": l[13] || (l[13] = (e) => a.uid = e),
                          placeholder: o(t)("managerPlaceholder"),
                          class: "min-w-0 flex-1",
                          filterable: ""
                        }, {
                          default: d(() => [
                            (n(!0), _(V, null, M(C.value, (e) => (n(), w(h, {
                              key: e.uid,
                              label: e.username,
                              value: e.uid
                            }, {
                              default: d(() => [
                                f("div", Se, [
                                  e.head_img ? (n(), w(E, {
                                    key: 0,
                                    src: o(F)(e.head_img),
                                    size: "small",
                                    class: "mr-[10px]"
                                  }, null, 8, ["src"])) : (n(), _("img", Ce)),
                                  v(" " + g(e.username), 1)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"]),
                        r(U, {
                          class: "ml-[8px] shrink-0",
                          onClick: X
                        }, {
                          default: d(() => [
                            v(g(o(t)("addManagerAction")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])),
                r(u, {
                  label: o(t)("siteDomain"),
                  prop: "site_domain"
                }, {
                  default: d(() => [
                    r(i, {
                      modelValue: a.site_domain,
                      "onUpdate:modelValue": l[14] || (l[14] = (e) => a.site_domain = e),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: o(t)("siteDomainPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"]),
                    f("div", null, [
                      f("p", Ie, g(o(t)("siteDomainTips")), 1),
                      f("p", Te, g(o(t)("siteDomainTipsTwo")), 1),
                      f("p", De, g(o(t)("siteDomainTipsThree")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(u, {
                  label: o(t)("expireTime"),
                  prop: "expire_time",
                  class: "input-width"
                }, {
                  default: d(() => [
                    r(oe, {
                      class: "flex-1 !flex",
                      modelValue: a.expire_time,
                      "onUpdate:modelValue": l[15] || (l[15] = (e) => a.expire_time = e),
                      clearable: "",
                      type: "datetime",
                      placeholder: o(t)("expireTimePlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [de, c.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        r(be, {
          ref_key: "addUserRef",
          ref: $,
          onSuccess: H
        }, null, 512)
      ], 64);
    };
  }
});
const Ke = /* @__PURE__ */ we($e, [["__scopeId", "data-v-32433ddf"]]);
export {
  Ke as default
};
