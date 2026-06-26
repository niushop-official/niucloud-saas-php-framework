import { defineComponent as O, ref as m, reactive as T, computed as z, resolveComponent as f, resolveDirective as A, openBlock as C, createBlock as k, unref as a, withCtx as d, createElementVNode as I, createVNode as s, createTextVNode as x, toDisplayString as M, withDirectives as K } from "vue";
import { t as o, bE as L, cH as S, cV as W, cW as Z } from "./core-shared-ca1fcae5.js";
const G = { class: "dialog-footer" }, ee = /* @__PURE__ */ O({
  __name: "add-member",
  emits: ["complete"],
  setup(J, { expose: $, emit: P }) {
    const p = m(!1), i = m(!1), b = m(!1);
    let c = "", v = "";
    const w = m(!0), g = m(!0), _ = m(!0), y = {
      member_id: "",
      nickname: "",
      member_no: "",
      init_member_no: "",
      mobile: "",
      password: "",
      password_copy: ""
    }, t = T({ ...y }), V = m(), D = z(() => ({
      member_no: [
        { required: !0, message: o("memberNoPlaceholder"), trigger: "blur" },
        { validator: q, trigger: "blur" }
      ],
      mobile: [
        { required: !0, message: o("mobilePlaceholder"), trigger: "blur" },
        { validator: U, trigger: "blur" }
      ],
      password: [
        { required: !0, message: o("passwordPlaceholder"), trigger: "blur" }
      ],
      password_copy: [
        { required: !0, message: o("passwordPlaceholder"), trigger: "blur" },
        { validator: B, trigger: "blur" }
      ]
    })), U = (n, e, r) => {
      e && !/^1[3-9]\d{9}$/.test(e) ? r(new Error(o("mobileHint"))) : r();
    }, B = (n, e, r) => {
      e != t.password ? r(o("doubleCipherHint")) : r();
    }, q = (n, e, r) => {
      e && !/^[0-9a-zA-Z]*$/g.test(e) ? r(new Error(o("memberNoHint"))) : r();
    }, E = async () => {
      await W().then((n) => {
        v = n.data;
      }).catch(() => {
      });
    }, H = P, F = async (n) => {
      if (i.value || !n)
        return;
      const e = Z;
      await n.validate(async (r) => {
        if (r) {
          if (i.value = !0, b.value)
            return;
          b.value = !0, e(t).then((h) => {
            i.value = !1, b.value = !1, p.value = !1, H("complete");
          }).catch(() => {
            i.value = !1, b.value = !1;
          });
        }
      });
    };
    return $({
      showDialog: p,
      setFormData: async (n = null) => {
        if (i.value = !0, Object.assign(t, y), c = o("addMember"), n) {
          c = o("updateMember");
          const e = await (await S(n.member_id)).data;
          e && Object.keys(t).forEach((r) => {
            e[r] != null && (t[r] = e[r]);
          });
        } else
          await E(), t.member_no = v, t.init_member_no = v;
        i.value = !1;
      }
    }), (n, e) => {
      const r = f("el-input"), u = f("el-form-item"), h = f("el-form"), N = f("el-button"), R = f("el-dialog"), j = A("loading");
      return C(), k(R, {
        modelValue: p.value,
        "onUpdate:modelValue": e[14] || (e[14] = (l) => p.value = l),
        title: a(c),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: d(() => [
          I("span", G, [
            s(N, {
              onClick: e[12] || (e[12] = (l) => p.value = !1)
            }, {
              default: d(() => [
                x(M(a(o)("cancel")), 1)
              ]),
              _: 1
            }),
            s(N, {
              type: "primary",
              loading: i.value,
              onClick: e[13] || (e[13] = (l) => F(V.value))
            }, {
              default: d(() => [
                x(M(a(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: d(() => [
          K((C(), k(h, {
            model: t,
            "label-width": "90px",
            ref_key: "formRef",
            ref: V,
            rules: D.value,
            class: "page-form"
          }, {
            default: d(() => [
              s(u, {
                label: a(o)("memberNo"),
                prop: "member_no"
              }, {
                default: d(() => [
                  s(r, {
                    modelValue: t.member_no,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => t.member_no = l),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    maxlength: "20",
                    placeholder: a(o)("memberNoPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              s(u, {
                label: a(o)("mobile"),
                prop: "mobile"
              }, {
                default: d(() => [
                  s(r, {
                    modelValue: t.mobile,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => t.mobile = l),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: a(o)("mobilePlaceholder"),
                    maxlength: "11",
                    onKeyup: e[2] || (e[2] = (l) => a(L)(l)),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              s(u, {
                label: a(o)("nickname")
              }, {
                default: d(() => [
                  s(r, {
                    modelValue: t.nickname,
                    "onUpdate:modelValue": e[3] || (e[3] = (l) => t.nickname = l),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: a(o)("nickNamePlaceholder"),
                    class: "input-width",
                    maxlength: "10",
                    "show-word-limit": "",
                    readonly: w.value,
                    onClick: e[4] || (e[4] = (l) => w.value = !1),
                    onBlur: e[5] || (e[5] = (l) => w.value = !0)
                  }, null, 8, ["modelValue", "placeholder", "readonly"])
                ]),
                _: 1
              }, 8, ["label"]),
              s(u, {
                label: a(o)("password"),
                prop: "password"
              }, {
                default: d(() => [
                  s(r, {
                    modelValue: t.password,
                    "onUpdate:modelValue": e[6] || (e[6] = (l) => t.password = l),
                    modelModifiers: { trim: !0 },
                    type: "password",
                    placeholder: a(o)("passwordPlaceholder"),
                    clearable: "",
                    class: "input-width",
                    "show-password": !0,
                    readonly: g.value,
                    onClick: e[7] || (e[7] = (l) => g.value = !1),
                    onBlur: e[8] || (e[8] = (l) => g.value = !0)
                  }, null, 8, ["modelValue", "placeholder", "readonly"])
                ]),
                _: 1
              }, 8, ["label"]),
              s(u, {
                label: a(o)("passwordCopy"),
                prop: "password_copy"
              }, {
                default: d(() => [
                  s(r, {
                    modelValue: t.password_copy,
                    "onUpdate:modelValue": e[9] || (e[9] = (l) => t.password_copy = l),
                    modelModifiers: { trim: !0 },
                    type: "password",
                    placeholder: a(o)("passwordPlaceholder"),
                    clearable: "",
                    class: "input-width",
                    "show-password": !0,
                    readonly: _.value,
                    onClick: e[10] || (e[10] = (l) => _.value = !1),
                    onBlur: e[11] || (e[11] = (l) => _.value = !0)
                  }, null, 8, ["modelValue", "placeholder", "readonly"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [j, i.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  ee as _
};
