import { defineComponent as j, ref as b, reactive as B, computed as O, resolveComponent as d, resolveDirective as P, openBlock as g, createBlock as h, unref as o, withCtx as l, createElementVNode as f, createVNode as a, createTextVNode as p, toDisplayString as m, createCommentVNode as S, withDirectives as $ } from "vue";
import { t as s, ei as q } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const E = { class: "input-width" }, M = { class: "input-width" }, T = { class: "input-width" }, z = { class: "dialog-footer" }, Z = /* @__PURE__ */ j({
  __name: "notice-sms",
  emits: ["complete"],
  setup(A, { expose: w, emit: C }) {
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
    }, t = B({ ...V }), D = b(), x = O(() => ({
      sms_id: [
        { required: !0, message: s("smsIdPlaceholder"), trigger: "blur" }
      ]
    })), N = async (n) => {
      i.value || !n || await n.validate(async (e) => {
        if (e) {
          i.value = !0;
          const _ = t;
          _.status = _.is_sms, q(_).then((v) => {
            i.value = !1, u.value = !1, C("complete");
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
      const _ = d("el-alert"), v = d("el-radio"), U = d("el-radio-group"), c = d("el-form-item"), k = d("el-input"), F = d("el-form"), y = d("el-button"), I = d("el-dialog"), R = P("loading");
      return g(), h(I, {
        modelValue: u.value,
        "onUpdate:modelValue": e[4] || (e[4] = (r) => u.value = r),
        title: o(s)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: l(() => [
          f("span", z, [
            a(y, {
              onClick: e[2] || (e[2] = (r) => u.value = !1)
            }, {
              default: l(() => [
                p(m(o(s)("cancel")), 1)
              ]),
              _: 1
            }),
            a(y, {
              type: "primary",
              loading: i.value,
              onClick: e[3] || (e[3] = (r) => N(D.value))
            }, {
              default: l(() => [
                p(m(o(s)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: l(() => [
          !t.bind_sms && t.is_need_bind_merchant ? (g(), h(_, {
            key: 0,
            title: "未绑定接收者手机号",
            type: "error",
            closable: !1
          })) : S("", !0),
          $((g(), h(F, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: D,
            rules: o(x),
            class: "page-form"
          }, {
            default: l(() => [
              a(c, {
                label: o(s)("status")
              }, {
                default: l(() => [
                  a(U, {
                    modelValue: t.is_sms,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_sms = r)
                  }, {
                    default: l(() => [
                      a(v, { label: 1 }, {
                        default: l(() => [
                          p(m(o(s)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      a(v, { label: 0 }, {
                        default: l(() => [
                          p(m(o(s)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(s)("name")
              }, {
                default: l(() => [
                  f("div", E, m(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(s)("title")
              }, {
                default: l(() => [
                  f("div", M, m(t.title), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(s)("smsId"),
                prop: "sms_id"
              }, {
                default: l(() => [
                  a(k, {
                    modelValue: t.sms_id,
                    "onUpdate:modelValue": e[1] || (e[1] = (r) => t.sms_id = r),
                    modelModifiers: { trim: !0 },
                    placeholder: o(s)("smsIdPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(c, {
                label: o(s)("smsContent")
              }, {
                default: l(() => [
                  f("div", T, m(t.content), 1)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [R, i.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Z as default
};
