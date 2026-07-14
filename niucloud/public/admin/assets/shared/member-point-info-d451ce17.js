import { defineComponent as C, ref as p, reactive as N, computed as B, resolveComponent as d, resolveDirective as E, openBlock as _, createBlock as h, unref as o, withCtx as t, createElementVNode as a, createVNode as i, createTextVNode as F, toDisplayString as n, withDirectives as R, createElementBlock as v } from "vue";
import { _ as T } from "./member_head-81b0c11e.js";
import { t as l, i as j } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const I = { class: "flex items-center" }, O = ["src"], S = {
  key: 1,
  class: "w-[50px] h-[50px] mr-[10px] rounded-full",
  src: T,
  alt: ""
}, U = { class: "input-width" }, $ = { class: "input-width" }, q = { class: "input-width" }, z = { class: "input-width" }, A = { class: "input-width" }, G = { class: "input-width" }, H = { class: "input-width" }, J = { class: "dialog-footer" }, oe = /* @__PURE__ */ C({
  __name: "member-point-info",
  setup(K, { expose: g }) {
    const r = p(!1), u = p(!0), f = {
      account_data: 0,
      account_type: "",
      create_time: "",
      from_type: "",
      from_type_name: "",
      member_id: "",
      memo: "",
      related_id: "",
      member: {
        headimg: "",
        mobile: "",
        member_no: "",
        username: "",
        nickname: ""
      }
    }, e = N({ ...f }), x = p(), w = B(() => ({}));
    return g({
      showDialog: r,
      setFormData: async (c = null) => {
        u.value = !0, Object.assign(e, f), c && Object.keys(e).forEach((m) => {
          c[m] != null && (e[m] = c[m]);
        }), u.value = !1;
      }
    }), (c, m) => {
      const s = d("el-form-item"), y = d("el-form"), k = d("el-button"), D = d("el-dialog"), V = E("loading");
      return _(), h(D, {
        modelValue: r.value,
        "onUpdate:modelValue": m[1] || (m[1] = (b) => r.value = b),
        title: o(l)("pointInfo"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: t(() => [
          a("span", J, [
            i(k, {
              type: "primary",
              onClick: m[0] || (m[0] = (b) => r.value = !1)
            }, {
              default: t(() => [
                F(n(o(l)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: t(() => [
          R((_(), h(y, {
            model: e,
            "label-width": "110px",
            ref_key: "formRef",
            ref: x,
            rules: w.value,
            class: "page-form"
          }, {
            default: t(() => [
              i(s, {
                label: o(l)("headimg")
              }, {
                default: t(() => [
                  a("div", I, [
                    e.member.headimg ? (_(), v("img", {
                      key: 0,
                      class: "w-[50px] h-[50px] mr-[10px]",
                      src: o(j)(e.member.headimg),
                      alt: ""
                    }, null, 8, O)) : (_(), v("img", S))
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("memberId")
              }, {
                default: t(() => [
                  a("div", U, n(e.member.member_no), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("nickName")
              }, {
                default: t(() => [
                  a("div", $, n(e.member.nickname), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("mobile")
              }, {
                default: t(() => [
                  a("div", q, n(e.member.mobile), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("accountData")
              }, {
                default: t(() => [
                  a("div", z, n(e.account_data), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("fromType")
              }, {
                default: t(() => [
                  a("div", A, n(e.from_type_name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("memo")
              }, {
                default: t(() => [
                  a("div", G, n(e.memo), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(s, {
                label: o(l)("createTime")
              }, {
                default: t(() => [
                  a("div", H, n(e.create_time), 1)
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [V, u.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  oe as default
};
