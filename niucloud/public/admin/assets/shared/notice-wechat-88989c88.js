import { defineComponent as L, ref as h, reactive as O, computed as S, resolveComponent as d, resolveDirective as T, openBlock as f, createBlock as w, unref as a, withCtx as l, createElementVNode as p, createVNode as n, createTextVNode as v, toDisplayString as s, createCommentVNode as $, withDirectives as K, createElementBlock as V, Fragment as q, renderList as z } from "vue";
import { t as i, dT as A } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const G = { class: "input-width" }, H = { class: "input-width" }, I = { class: "input-width" }, J = { class: "input-width" }, M = { class: "dialog-footer" }, ae = /* @__PURE__ */ L({
  __name: "notice-wechat",
  emits: ["complete"],
  setup(P, { expose: D, emit: x }) {
    const _ = h(!1), r = h(!0), g = {
      is_wechat: 0,
      key: "",
      name: "",
      title: "",
      type: "",
      content: [],
      // first: '',
      // remark: '',
      temp_key: "",
      keyword_name_list: "",
      // wechat_first: '',
      // wechat_remark: ''
      bind_wechat: "",
      is_need_bind_merchant: ""
    }, t = O({ ...g }), y = h(), C = S(() => ({})), N = x, F = async (o) => {
      r.value || !o || await o.validate(async (e) => {
        if (e) {
          r.value = !0;
          const m = t;
          m.status = m.is_wechat, A(m).then((b) => {
            r.value = !1, _.value = !1, N("complete");
          }).catch(() => {
            r.value = !1;
          });
        }
      });
    };
    return D({
      showDialog: _,
      setFormData: async (o = null) => {
        r.value = !0, Object.assign(t, g), o && Object.keys(t).forEach((e) => {
          o[e] != null && (t[e] = o[e]), o.wechat && o.wechat[e] != null && (t[e] = o.wechat[e]);
        }), r.value = !1;
      }
    }), (o, e) => {
      const m = d("el-alert"), b = d("el-radio"), j = d("el-radio-group"), u = d("el-form-item"), B = d("el-form"), k = d("el-button"), R = d("el-dialog"), U = T("loading");
      return f(), w(R, {
        modelValue: _.value,
        "onUpdate:modelValue": e[3] || (e[3] = (c) => _.value = c),
        title: a(i)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: l(() => [
          p("span", M, [
            n(k, {
              onClick: e[1] || (e[1] = (c) => _.value = !1)
            }, {
              default: l(() => [
                v(s(a(i)("cancel")), 1)
              ]),
              _: 1
            }),
            n(k, {
              type: "primary",
              loading: r.value,
              onClick: e[2] || (e[2] = (c) => F(y.value))
            }, {
              default: l(() => [
                v(s(a(i)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: l(() => [
          !t.bind_wechat && t.is_need_bind_merchant ? (f(), w(m, {
            key: 0,
            title: "未绑定接收者微信",
            type: "error",
            closable: !1
          })) : $("", !0),
          K((f(), w(B, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: C.value,
            class: "page-form"
          }, {
            default: l(() => [
              n(u, {
                label: a(i)("status")
              }, {
                default: l(() => [
                  n(j, {
                    modelValue: t.is_wechat,
                    "onUpdate:modelValue": e[0] || (e[0] = (c) => t.is_wechat = c)
                  }, {
                    default: l(() => [
                      n(b, { label: 1 }, {
                        default: l(() => [
                          v(s(a(i)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      n(b, { label: 0 }, {
                        default: l(() => [
                          v(s(a(i)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: a(i)("name")
              }, {
                default: l(() => [
                  p("div", G, s(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: a(i)("tempKey")
              }, {
                default: l(() => [
                  p("div", H, s(t.temp_key), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: a(i)("keywordNameList")
              }, {
                default: l(() => [
                  p("div", I, s(t.keyword_name_list ? t.keyword_name_list.join("，") : ""), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: a(i)("content")
              }, {
                default: l(() => [
                  p("div", J, [
                    (f(!0), V(q, null, z(t.content, (c, E) => (f(), V("div", { key: E }, s(c[0]) + "：" + s(c[1]), 1))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [U, r.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  ae as default
};
