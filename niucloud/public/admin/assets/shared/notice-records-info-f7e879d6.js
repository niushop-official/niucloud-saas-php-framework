import { defineComponent as N, ref as u, reactive as B, computed as E, resolveComponent as _, resolveDirective as F, openBlock as c, createBlock as b, unref as t, withCtx as a, createElementVNode as s, createVNode as n, createTextVNode as R, toDisplayString as i, withDirectives as T, createElementBlock as f, createCommentVNode as v } from "vue";
import { t as o } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const j = { class: "input-width" }, O = { class: "input-width" }, I = { key: 0 }, K = { key: 1 }, S = { key: 2 }, U = { class: "input-width" }, $ = { class: "input-width" }, q = { class: "input-width" }, z = { class: "dialog-footer" }, Y = /* @__PURE__ */ N({
  __name: "notice-records-info",
  setup(A, { expose: g }) {
    const m = u(!1), p = u(!0), h = {
      create_time: 0,
      message_data: "",
      message_key: "",
      message_type: "",
      name: "",
      nickname: "",
      receiver: "",
      notice_type: ""
    }, e = B({ ...h }), w = u(), k = E(() => ({}));
    return g({
      showDialog: m,
      setFormData: async (d = null) => {
        p.value = !0, Object.assign(e, h), d && Object.keys(e).forEach((l) => {
          d[l] != null && (e[l] = d[l]);
        }), p.value = !1;
      }
    }), (d, l) => {
      const r = _("el-form-item"), D = _("el-form"), V = _("el-button"), x = _("el-dialog"), C = F("loading");
      return c(), b(x, {
        modelValue: m.value,
        "onUpdate:modelValue": l[1] || (l[1] = (y) => m.value = y),
        title: t(o)("messageInfo"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          s("span", z, [
            n(V, {
              type: "primary",
              onClick: l[0] || (l[0] = (y) => m.value = !1)
            }, {
              default: a(() => [
                R(i(t(o)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: a(() => [
          T((c(), b(D, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: w,
            rules: t(k),
            class: "page-form"
          }, {
            default: a(() => [
              n(r, {
                label: t(o)("messageKey")
              }, {
                default: a(() => [
                  s("div", j, i(e.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(r, {
                label: t(o)("smsType")
              }, {
                default: a(() => [
                  s("div", O, [
                    e.notice_type == "sms" ? (c(), f("div", I, i(t(o)("sms")), 1)) : v("", !0),
                    e.notice_type == "wechat" ? (c(), f("div", K, i(t(o)("wechat")), 1)) : v("", !0),
                    e.notice_type == "weapp" ? (c(), f("div", S, i(t(o)("weapp")), 1)) : v("", !0)
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              n(r, {
                label: t(o)("nickname")
              }, {
                default: a(() => [
                  s("div", U, i(e.nickname), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(r, {
                label: t(o)("receiver")
              }, {
                default: a(() => [
                  s("div", $, i(e.receiver), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(r, {
                label: t(o)("createTime")
              }, {
                default: a(() => [
                  s("div", q, i(e.create_time), 1)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [C, p.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Y as default
};
