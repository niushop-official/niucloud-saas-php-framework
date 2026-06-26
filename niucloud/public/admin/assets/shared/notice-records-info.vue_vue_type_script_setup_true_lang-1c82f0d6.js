import { defineComponent as N, ref as f, reactive as B, computed as E, resolveComponent as m, resolveDirective as F, openBlock as r, createBlock as b, unref as t, withCtx as a, createElementVNode as n, createVNode as i, createTextVNode as R, toDisplayString as s, withDirectives as T, createElementBlock as p, createCommentVNode as v } from "vue";
import { t as o } from "./core-shared-ca1fcae5.js";
const j = { class: "input-width" }, O = { class: "input-width" }, I = { key: 0 }, K = { key: 1 }, S = { key: 2 }, U = { class: "input-width" }, $ = { class: "input-width" }, q = { class: "input-width" }, z = { class: "dialog-footer" }, L = /* @__PURE__ */ N({
  __name: "notice-records-info",
  setup(A, { expose: g }) {
    const _ = f(!1), u = f(!0), h = {
      create_time: 0,
      message_data: "",
      message_key: "",
      message_type: "",
      name: "",
      nickname: "",
      receiver: "",
      notice_type: ""
    }, e = B({ ...h }), w = f(), k = E(() => ({}));
    return g({
      showDialog: _,
      setFormData: async (d = null) => {
        u.value = !0, Object.assign(e, h), d && Object.keys(e).forEach((l) => {
          d[l] != null && (e[l] = d[l]);
        }), u.value = !1;
      }
    }), (d, l) => {
      const c = m("el-form-item"), D = m("el-form"), x = m("el-button"), V = m("el-dialog"), C = F("loading");
      return r(), b(V, {
        modelValue: _.value,
        "onUpdate:modelValue": l[1] || (l[1] = (y) => _.value = y),
        title: t(o)("messageInfo"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          n("span", z, [
            i(x, {
              type: "primary",
              onClick: l[0] || (l[0] = (y) => _.value = !1)
            }, {
              default: a(() => [
                R(s(t(o)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: a(() => [
          T((r(), b(D, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: w,
            rules: k.value,
            class: "page-form"
          }, {
            default: a(() => [
              i(c, {
                label: t(o)("messageKey")
              }, {
                default: a(() => [
                  n("div", j, s(e.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: t(o)("smsType")
              }, {
                default: a(() => [
                  n("div", O, [
                    e.notice_type == "sms" ? (r(), p("div", I, s(t(o)("sms")), 1)) : v("", !0),
                    e.notice_type == "wechat" ? (r(), p("div", K, s(t(o)("wechat")), 1)) : v("", !0),
                    e.notice_type == "weapp" ? (r(), p("div", S, s(t(o)("weapp")), 1)) : v("", !0)
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: t(o)("nickname")
              }, {
                default: a(() => [
                  n("div", U, s(e.nickname), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: t(o)("receiver")
              }, {
                default: a(() => [
                  n("div", $, s(e.receiver), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: t(o)("createTime")
              }, {
                default: a(() => [
                  n("div", q, s(e.create_time), 1)
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
  L as _
};
