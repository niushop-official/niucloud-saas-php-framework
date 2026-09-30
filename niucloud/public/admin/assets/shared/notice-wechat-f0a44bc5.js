import { defineComponent as E, ref as h, reactive as L, computed as O, resolveComponent as d, resolveDirective as S, openBlock as f, createBlock as w, unref as o, withCtx as l, createElementVNode as p, createVNode as n, createTextVNode as v, toDisplayString as s, createCommentVNode as $, withDirectives as K, createElementBlock as V, Fragment as T, renderList as q } from "vue";
import { t as i, ei as z } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const A = { class: "input-width" }, G = { class: "input-width" }, H = { class: "input-width" }, I = { class: "input-width" }, J = { class: "dialog-footer" }, oe = /* @__PURE__ */ E({
  __name: "notice-wechat",
  emits: ["complete"],
  setup(M, { expose: D, emit: x }) {
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
    }, t = L({ ...g }), y = h(), C = O(() => ({})), N = async (a) => {
      r.value || !a || await a.validate(async (e) => {
        if (e) {
          r.value = !0;
          const m = t;
          m.status = m.is_wechat, z(m).then((b) => {
            r.value = !1, _.value = !1, x("complete");
          }).catch(() => {
            r.value = !1;
          });
        }
      });
    };
    return D({
      showDialog: _,
      setFormData: async (a = null) => {
        r.value = !0, Object.assign(t, g), a && Object.keys(t).forEach((e) => {
          a[e] != null && (t[e] = a[e]), a.wechat && a.wechat[e] != null && (t[e] = a.wechat[e]);
        }), r.value = !1;
      }
    }), (a, e) => {
      const m = d("el-alert"), b = d("el-radio"), F = d("el-radio-group"), u = d("el-form-item"), j = d("el-form"), k = d("el-button"), B = d("el-dialog"), R = S("loading");
      return f(), w(B, {
        modelValue: _.value,
        "onUpdate:modelValue": e[3] || (e[3] = (c) => _.value = c),
        title: o(i)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: l(() => [
          p("span", J, [
            n(k, {
              onClick: e[1] || (e[1] = (c) => _.value = !1)
            }, {
              default: l(() => [
                v(s(o(i)("cancel")), 1)
              ]),
              _: 1
            }),
            n(k, {
              type: "primary",
              loading: r.value,
              onClick: e[2] || (e[2] = (c) => N(y.value))
            }, {
              default: l(() => [
                v(s(o(i)("confirm")), 1)
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
          K((f(), w(j, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: o(C),
            class: "page-form"
          }, {
            default: l(() => [
              n(u, {
                label: o(i)("status")
              }, {
                default: l(() => [
                  n(F, {
                    modelValue: t.is_wechat,
                    "onUpdate:modelValue": e[0] || (e[0] = (c) => t.is_wechat = c)
                  }, {
                    default: l(() => [
                      n(b, { label: 1 }, {
                        default: l(() => [
                          v(s(o(i)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      n(b, { label: 0 }, {
                        default: l(() => [
                          v(s(o(i)("statusDeactivate")), 1)
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
                label: o(i)("name")
              }, {
                default: l(() => [
                  p("div", A, s(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: o(i)("tempKey")
              }, {
                default: l(() => [
                  p("div", G, s(t.temp_key), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: o(i)("keywordNameList")
              }, {
                default: l(() => [
                  p("div", H, s(t.keyword_name_list ? t.keyword_name_list.join("，") : ""), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(u, {
                label: o(i)("content")
              }, {
                default: l(() => [
                  p("div", I, [
                    (f(!0), V(T, null, q(t.content, (c, U) => (f(), V("div", { key: U }, s(c[0]) + "：" + s(c[1]), 1))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [R, r.value]
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
