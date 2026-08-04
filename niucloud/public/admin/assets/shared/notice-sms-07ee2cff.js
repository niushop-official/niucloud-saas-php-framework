import { defineComponent as B, ref as b, reactive as O, computed as P, resolveComponent as d, resolveDirective as S, openBlock as g, createBlock as h, unref as s, withCtx as l, createElementVNode as p, createVNode as a, createTextVNode as f, toDisplayString as m, createCommentVNode as T, withDirectives as $ } from "vue";
import { t as o, dT as q } from "./core-shared-5b3bfa35.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "input-width" }, M = { class: "input-width" }, z = { class: "input-width" }, A = { class: "dialog-footer" }, ee = /* @__PURE__ */ B({
  __name: "notice-sms",
  emits: ["complete"],
  setup(G, { expose: w, emit: x }) {
    const u = b(!1), i = b(!0), V = {
      is_sms: 0,
      key: "",
      name: "",
      sms_default_content: "",
      title: "",
      type: "",
      sms_id: "",
      content: "",
      bind_sms: "",
      is_need_bind_merchant: ""
    }, t = O({ ...V }), D = b(), C = P(() => ({
      sms_id: [
        { required: !0, message: o("smsIdPlaceholder"), trigger: "blur" }
      ]
    })), N = x, U = async (n) => {
      i.value || !n || await n.validate(async (e) => {
        if (e) {
          i.value = !0;
          const c = t;
          c.status = c.is_sms, q(c).then((v) => {
            i.value = !1, u.value = !1, N("complete");
          }).catch(() => {
            i.value = !1;
          });
        }
      });
    };
    return w({
      showDialog: u,
      setFormData: async (n = null) => {
        i.value = !0, Object.assign(t, V), n && Object.keys(t).forEach((e) => {
          n[e] != null && (t[e] = n[e]), n.sms && n.sms[e] != null && (t[e] = n.sms[e]);
        }), i.value = !1;
      }
    }), (n, e) => {
      const c = d("el-alert"), v = d("el-radio"), k = d("el-radio-group"), _ = d("el-form-item"), F = d("el-input"), I = d("el-form"), y = d("el-button"), R = d("el-dialog"), j = S("loading");
      return g(), h(R, {
        modelValue: u.value,
        "onUpdate:modelValue": e[4] || (e[4] = (r) => u.value = r),
        title: s(o)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: l(() => [
          p("span", A, [
            a(y, {
              onClick: e[2] || (e[2] = (r) => u.value = !1)
            }, {
              default: l(() => [
                f(m(s(o)("cancel")), 1)
              ]),
              _: 1
            }),
            a(y, {
              type: "primary",
              loading: i.value,
              onClick: e[3] || (e[3] = (r) => U(D.value))
            }, {
              default: l(() => [
                f(m(s(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: l(() => [
          !t.bind_sms && t.is_need_bind_merchant ? (g(), h(c, {
            key: 0,
            title: "未绑定接收者手机号",
            type: "error",
            closable: !1
          })) : T("", !0),
          $((g(), h(I, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: D,
            rules: C.value,
            class: "page-form"
          }, {
            default: l(() => [
              a(_, {
                label: s(o)("status")
              }, {
                default: l(() => [
                  a(k, {
                    modelValue: t.is_sms,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_sms = r)
                  }, {
                    default: l(() => [
                      a(v, { label: 1 }, {
                        default: l(() => [
                          f(m(s(o)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      a(v, { label: 0 }, {
                        default: l(() => [
                          f(m(s(o)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, {
                label: s(o)("name")
              }, {
                default: l(() => [
                  p("div", E, m(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, {
                label: s(o)("title")
              }, {
                default: l(() => [
                  p("div", M, m(t.title), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, {
                label: s(o)("smsId"),
                prop: "sms_id"
              }, {
                default: l(() => [
                  a(F, {
                    modelValue: t.sms_id,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.sms_id = r),
                    modelModifiers: { trim: !0 },
                    placeholder: s(o)("smsIdPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(_, {
                label: s(o)("smsContent")
              }, {
                default: l(() => [
                  p("div", z, m(t.content), 1)
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
  ee as default
};
