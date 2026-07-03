import { defineComponent as N, ref as f, reactive as B, computed as E, resolveComponent as _, resolveDirective as F, openBlock as r, createBlock as g, unref as s, withCtx as t, createElementVNode as m, createVNode as a, createTextVNode as R, toDisplayString as i, withDirectives as T, createElementBlock as p, createCommentVNode as v } from "vue";
import { t as l } from "./core-shared-c8d7774e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const j = { class: "input-width" }, O = { class: "input-width" }, I = { class: "input-width" }, K = { class: "input-width" }, S = {
  key: 0,
  class: "input-width"
}, U = {
  key: 1,
  class: "input-width"
}, $ = {
  key: 2,
  class: "input-width"
}, q = { class: "dialog-footer" }, X = /* @__PURE__ */ N({
  __name: "sms-records-info",
  setup(z, { expose: y }) {
    const c = f(!1), u = f(!0), h = {
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
      showDialog: c,
      setFormData: async (d = null) => {
        u.value = !0, Object.assign(e, h), d && Object.keys(e).forEach((o) => {
          d[o] != null && (e[o] = d[o]);
        }), u.value = !1;
      }
    }), (d, o) => {
      const n = _("el-form-item"), D = _("el-form"), x = _("el-button"), V = _("el-dialog"), C = F("loading");
      return r(), g(V, {
        modelValue: c.value,
        "onUpdate:modelValue": o[1] || (o[1] = (b) => c.value = b),
        title: s(l)("messageInfo"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: t(() => [
          m("span", q, [
            a(x, {
              type: "primary",
              onClick: o[0] || (o[0] = (b) => c.value = !1)
            }, {
              default: t(() => [
                R(i(s(l)("confirm")), 1)
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
                label: s(l)("messageKey")
              }, {
                default: t(() => [
                  m("div", j, i(e.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: s(l)("smsType")
              }, {
                default: t(() => [
                  m("div", O, i(e.sms_type_name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: s(l)("receiver")
              }, {
                default: t(() => [
                  m("div", I, i(e.mobile), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: s(l)("createTime")
              }, {
                default: t(() => [
                  m("div", K, i(e.create_time), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              a(n, {
                label: s(l)("发送结果")
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
  X as default
};
