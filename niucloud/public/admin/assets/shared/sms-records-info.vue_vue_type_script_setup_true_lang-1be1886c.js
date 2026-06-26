import { defineComponent as N, ref as f, reactive as B, computed as E, resolveComponent as _, resolveDirective as F, openBlock as r, createBlock as g, unref as o, withCtx as t, createElementVNode as c, createVNode as a, createTextVNode as R, toDisplayString as i, withDirectives as T, createElementBlock as p, createCommentVNode as v } from "vue";
import { t as l } from "./core-shared-ca1fcae5.js";
const j = { class: "input-width" }, O = { class: "input-width" }, I = { class: "input-width" }, K = { class: "input-width" }, S = {
  key: 0,
  class: "input-width"
}, U = {
  key: 1,
  class: "input-width"
}, $ = {
  key: 2,
  class: "input-width"
}, q = { class: "dialog-footer" }, J = /* @__PURE__ */ N({
  __name: "sms-records-info",
  setup(z, { expose: y }) {
    const m = f(!1), u = f(!0), h = {
      create_time: 0,
      message_data: "",
      message_key: "",
      message_type: "",
      name: "",
      nickname: "",
      mobile: "",
      sms_type_name: "",
      status: "",
      result: ""
    }, e = B({ ...h }), w = f(), k = E(() => ({}));
    return y({
      showDialog: m,
      setFormData: async (d = null) => {
        u.value = !0, Object.assign(e, h), d && Object.keys(e).forEach((s) => {
          d[s] != null && (e[s] = d[s]);
        }), u.value = !1;
      }
    }), (d, s) => {
      const n = _("el-form-item"), D = _("el-form"), x = _("el-button"), V = _("el-dialog"), C = F("loading");
      return r(), g(V, {
        modelValue: m.value,
        "onUpdate:modelValue": s[1] || (s[1] = (b) => m.value = b),
        title: o(l)("messageInfo"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: t(() => [
          c("span", q, [
            a(x, {
              type: "primary",
              onClick: s[0] || (s[0] = (b) => m.value = !1)
            }, {
              default: t(() => [
                R(i(o(l)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: t(() => [
          T((r(), g(D, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: w,
            rules: k.value,
            class: "page-form"
          }, {
            default: t(() => [
              a(n, {
                label: o(l)("messageKey")
              }, {
                default: t(() => [
                  c("div", j, i(e.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: o(l)("smsType")
              }, {
                default: t(() => [
                  c("div", O, i(e.sms_type_name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: o(l)("receiver")
              }, {
                default: t(() => [
                  c("div", I, i(e.mobile), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: o(l)("createTime")
              }, {
                default: t(() => [
                  c("div", K, i(e.create_time), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: o(l)("发送结果")
              }, {
                default: t(() => [
                  e.status == "sending" ? (r(), p("div", S, " 发送失败 ")) : v("", !0),
                  e.status == "success" ? (r(), p("div", U, " 发送成功 ")) : v("", !0),
                  e.status == "fail" ? (r(), p("div", $, i(e.result), 1)) : v("", !0)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [C, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  J as _
};
