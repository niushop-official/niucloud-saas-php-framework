import { defineComponent as q, ref as u, reactive as I, computed as R, resolveComponent as p, resolveDirective as h, openBlock as y, createBlock as V, unref as t, withCtx as s, createElementVNode as E, createVNode as n, createTextVNode as M, toDisplayString as P, withDirectives as T } from "vue";
import { t as a, fY as F } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const S = { class: "dialog-footer" }, O = /* @__PURE__ */ q({
  __name: "index",
  emits: ["success"],
  setup(Y, { expose: C, emit: U }) {
    const i = u(!1), d = u(!1), _ = u(), f = u(!0), w = u(!0), v = u(!0), r = I({
      username: "",
      password: "",
      confirm_password: ""
    }), $ = R(() => ({
      username: [
        { required: !0, message: a("addManagerUsernamePlaceholder"), trigger: "blur" }
      ],
      password: [
        { required: !0, message: a("addManagerPasswordPlaceholder"), trigger: "blur" }
      ],
      confirm_password: [
        { required: !0, message: a("addManagerConfirmPasswordPlaceholder"), trigger: "blur" },
        {
          validator: (c, e, l) => {
            e != r.password ? l(new Error(a("addManagerConfirmPasswordError"))) : l();
          },
          trigger: "blur"
        }
      ]
    })), k = () => {
      r.username = "", r.password = "", r.confirm_password = "", f.value = !0, w.value = !0, v.value = !0;
    }, x = () => {
      k(), d.value = !1, i.value = !0;
    }, B = async (c) => {
      d.value || !c || await c.validate(async (e) => {
        e && (d.value = !0, F({
          username: r.username,
          password: r.password
        }).then((l) => {
          var g;
          d.value = !1, i.value = !1;
          const m = Number(((g = l == null ? void 0 : l.data) == null ? void 0 : g.uid) || 0);
          U("success", { uid: m, status: !0 });
        }).catch(() => {
          d.value = !1;
        }));
      });
    };
    return C({
      open: x
    }), (c, e) => {
      const l = p("el-input"), m = p("el-form-item"), g = p("el-form"), b = p("el-button"), D = p("el-dialog"), N = h("loading");
      return y(), V(D, {
        modelValue: i.value,
        "onUpdate:modelValue": e[11] || (e[11] = (o) => i.value = o),
        title: t(a)("addManagerTitle"),
        width: "480px",
        "destroy-on-close": !0,
        "append-to-body": ""
      }, {
        footer: s(() => [
          E("span", S, [
            n(b, {
              onClick: e[9] || (e[9] = (o) => i.value = !1)
            }, {
              default: s(() => [
                M(P(t(a)("cancel")), 1)
              ]),
              _: 1
            }),
            n(b, {
              type: "primary",
              loading: d.value,
              onClick: e[10] || (e[10] = (o) => B(_.value))
            }, {
              default: s(() => [
                M(P(t(a)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: s(() => [
          T((y(), V(g, {
            model: r,
            "label-width": "100px",
            ref_key: "formRef",
            ref: _,
            rules: t($),
            class: "page-form",
            autocomplete: "off"
          }, {
            default: s(() => [
              n(m, {
                label: t(a)("addManagerUsername"),
                prop: "username"
              }, {
                default: s(() => [
                  n(l, {
                    modelValue: r.username,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => r.username = o),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: t(a)("addManagerUsernamePlaceholder"),
                    class: "input-width",
                    autocomplete: "off",
                    readonly: f.value,
                    onClick: e[1] || (e[1] = (o) => f.value = !1),
                    onBlur: e[2] || (e[2] = (o) => f.value = !0)
                  }, null, 8, ["modelValue", "placeholder", "readonly"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: t(a)("addManagerPassword"),
                prop: "password"
              }, {
                default: s(() => [
                  n(l, {
                    modelValue: r.password,
                    "onUpdate:modelValue": e[3] || (e[3] = (o) => r.password = o),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: t(a)("addManagerPasswordPlaceholder"),
                    class: "input-width",
                    autocomplete: "new-password",
                    "show-password": !0,
                    type: "password",
                    readonly: w.value,
                    onClick: e[4] || (e[4] = (o) => w.value = !1),
                    onBlur: e[5] || (e[5] = (o) => w.value = !0)
                  }, null, 8, ["modelValue", "placeholder", "readonly"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: t(a)("addManagerConfirmPassword"),
                prop: "confirm_password"
              }, {
                default: s(() => [
                  n(l, {
                    modelValue: r.confirm_password,
                    "onUpdate:modelValue": e[6] || (e[6] = (o) => r.confirm_password = o),
                    modelModifiers: { trim: !0 },
                    clearable: "",
                    placeholder: t(a)("addManagerConfirmPasswordPlaceholder"),
                    class: "input-width",
                    autocomplete: "new-password",
                    "show-password": !0,
                    type: "password",
                    readonly: v.value,
                    onClick: e[7] || (e[7] = (o) => v.value = !1),
                    onBlur: e[8] || (e[8] = (o) => v.value = !0)
                  }, null, 8, ["modelValue", "placeholder", "readonly"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [N, d.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  O as default
};
