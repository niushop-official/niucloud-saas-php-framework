import { defineComponent as Y, ref as m, computed as B, reactive as Z, resolveComponent as i, resolveDirective as z, openBlock as c, createBlock as v, unref as r, withCtx as u, createElementVNode as G, createVNode as t, createTextVNode as g, toDisplayString as w, withDirectives as H, createElementBlock as P, createCommentVNode as k, Fragment as J, renderList as K, toRaw as Q } from "vue";
import { t as a, U as ee, V as le, W as oe, X as ae, Y as re, Z as te } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const se = { key: 0 }, de = { key: 0 }, ue = { class: "dialog-footer" }, Ve = /* @__PURE__ */ Y({
  __name: "edit-user",
  emits: ["complete"],
  setup(ne, { expose: E, emit: q }) {
    const F = m([]), f = m(""), ie = (s) => {
      f.value = s, typeof s == "string" && (l.username = s);
    }, N = () => {
      le({}).then(({ data: s }) => {
        F.value = s;
      }).catch();
    };
    N();
    const b = m(!0), V = m(!0), y = m(!0), L = B(() => !!(l.uid || !f.value || typeof f.value == "string")), _ = m(!1), p = m(!1);
    let h = "";
    const R = {
      uid: 0,
      username: "",
      head_img: "",
      real_name: "",
      password: "",
      confirm_password: "",
      status: 1,
      role_ids: [],
      userrole: {}
    }, l = Z({ ...R }), C = m(), M = B(() => ({
      uid: [
        {
          validator: (s, e, d) => {
            !l.uid && f.value === "" ? d(new Error(a("managerPlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ],
      username: [
        { required: l.uid == 0, message: a("accountNumberPlaceholder"), trigger: "blur" }
      ],
      real_name: [
        { required: !0, message: a("userRealNamePlaceholder"), trigger: "blur" }
      ],
      role_ids: [
        { required: !0, message: a("userRolePlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: l.uid == 0, message: a("passwordPlaceholder"), trigger: "blur" }
      ],
      confirm_password: [
        { required: l.uid == 0, message: a("confirmPasswordPlaceholder"), trigger: "blur" },
        {
          validator: (s, e, d) => {
            e != l.password ? d(new Error(a("confirmPasswordError"))) : d();
          },
          trigger: "blur"
        }
      ]
    })), U = m([]);
    ee().then((s) => {
      U.value = s.data, U.value.forEach((e) => {
        e.role_id = e.role_id.toString();
      });
    });
    const I = async (s) => {
      if (p.value || !s)
        return;
      const e = l.uid ? oe : ae;
      await s.validate(async (d) => {
        if (d) {
          p.value = !0;
          const n = re(Q(l));
          !l.uid && typeof f.value == "number" && (n.uid = f.value), e(n).then((x) => {
            p.value = !1, _.value = !1, !l.uid && N(), q("complete");
          }).catch(() => {
            p.value = !1;
          });
        }
      });
    };
    return E({
      showDialog: _,
      setFormData: async (s = null) => {
        if (p.value = !0, f.value = "", Object.assign(l, R), h = a("addUser"), s) {
          h = a("updateUser");
          const e = await (await te(s.uid)).data;
          e.role_ids = e.role_ids || [], Object.keys(l).forEach((d) => {
            e[d] != null && (l[d] = e[d]);
          });
        }
        p.value = !1;
      }
    }), (s, e) => {
      const d = i("el-input"), n = i("el-form-item"), x = i("upload-image"), j = i("el-option"), A = i("el-select"), D = i("el-radio"), O = i("el-radio-group"), S = i("el-form"), $ = i("el-button"), T = i("el-dialog"), W = z("loading");
      return c(), v(T, {
        modelValue: _.value,
        "onUpdate:modelValue": e[15] || (e[15] = (o) => _.value = o),
        title: r(h),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          G("span", ue, [
            t($, {
              onClick: e[13] || (e[13] = (o) => _.value = !1)
            }, {
              default: u(() => [
                g(w(r(a)("cancel")), 1)
              ]),
              _: 1
            }),
            t($, {
              type: "primary",
              loading: p.value,
              onClick: e[14] || (e[14] = (o) => I(C.value))
            }, {
              default: u(() => [
                g(w(r(a)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: u(() => [
          H((c(), v(S, {
            model: l,
            "label-width": "90px",
            ref_key: "formRef",
            ref: C,
            rules: r(M),
            class: "page-form"
          }, {
            default: u(() => [
              t(n, {
                label: r(a)("accountNumber"),
                prop: "username"
              }, {
                default: u(() => [
                  t(d, {
                    modelValue: l.username,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => l.username = o),
                    modelModifiers: { trim: !0 },
                    placeholder: r(a)("accountNumberPlaceholder"),
                    clearable: "",
                    disabled: l.uid,
                    class: "input-width",
                    maxlength: "20",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder", "disabled"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(L) ? (c(), P("div", se, [
                t(n, {
                  label: r(a)("headImg")
                }, {
                  default: u(() => [
                    t(x, {
                      modelValue: l.head_img,
                      "onUpdate:modelValue": e[1] || (e[1] = (o) => l.head_img = o)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(n, {
                  label: r(a)("userRealName"),
                  prop: "real_name"
                }, {
                  default: u(() => [
                    t(d, {
                      modelValue: l.real_name,
                      "onUpdate:modelValue": e[2] || (e[2] = (o) => l.real_name = o),
                      modelModifiers: { trim: !0 },
                      placeholder: r(a)("userRealNamePlaceholder"),
                      readonly: b.value,
                      onClick: e[3] || (e[3] = (o) => b.value = !1),
                      onBlur: e[4] || (e[4] = (o) => b.value = !0),
                      clearable: "",
                      class: "input-width",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder", "readonly"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l.uid ? k("", !0) : (c(), P("div", de, [
                  t(n, {
                    label: r(a)("password"),
                    prop: "password"
                  }, {
                    default: u(() => [
                      t(d, {
                        modelValue: l.password,
                        "onUpdate:modelValue": e[5] || (e[5] = (o) => l.password = o),
                        modelModifiers: { trim: !0 },
                        placeholder: r(a)("passwordPlaceholder"),
                        readonly: V.value,
                        onClick: e[6] || (e[6] = (o) => V.value = !1),
                        onBlur: e[7] || (e[7] = (o) => V.value = !0),
                        type: "password",
                        "show-password": !0,
                        clearable: "",
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(n, {
                    label: r(a)("confirmPassword"),
                    prop: "confirm_password"
                  }, {
                    default: u(() => [
                      t(d, {
                        modelValue: l.confirm_password,
                        "onUpdate:modelValue": e[8] || (e[8] = (o) => l.confirm_password = o),
                        modelModifiers: { trim: !0 },
                        placeholder: r(a)("confirmPasswordPlaceholder"),
                        readonly: y.value,
                        onClick: e[9] || (e[9] = (o) => y.value = !1),
                        onBlur: e[10] || (e[10] = (o) => y.value = !0),
                        type: "password",
                        "show-password": !0,
                        clearable: "",
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder", "readonly"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]))
              ])) : k("", !0),
              l.userrole.is_admin ? k("", !0) : (c(), v(n, {
                key: 1,
                label: r(a)("userRoleName"),
                prop: "role_ids"
              }, {
                default: u(() => [
                  t(A, {
                    modelValue: l.role_ids,
                    "onUpdate:modelValue": e[11] || (e[11] = (o) => l.role_ids = o),
                    placeholder: r(a)("userRolePlaceholder"),
                    class: "input-width",
                    multiple: "",
                    "collapse-tags": "",
                    "collapse-tags-tooltip": ""
                  }, {
                    default: u(() => [
                      (c(!0), P(J, null, K(U.value, (o, X) => (c(), v(j, {
                        label: o.role_name,
                        value: o.role_id,
                        key: X,
                        disabled: o.disabled
                      }, null, 8, ["label", "value", "disabled"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])),
              t(n, {
                label: r(a)("status")
              }, {
                default: u(() => [
                  t(O, {
                    modelValue: l.status,
                    "onUpdate:modelValue": e[12] || (e[12] = (o) => l.status = o)
                  }, {
                    default: u(() => [
                      t(D, { label: 1 }, {
                        default: u(() => [
                          g(w(r(a)("statusUnlock")), 1)
                        ]),
                        _: 1
                      }),
                      t(D, { label: 0 }, {
                        default: u(() => [
                          g(w(r(a)("lock")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [W, p.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Ve as default
};
