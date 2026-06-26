import { defineComponent as L, ref as h, reactive as O, computed as S, resolveComponent as d, resolveDirective as $, openBlock as f, createBlock as w, unref as o, withCtx as l, createElementVNode as p, createVNode as n, createTextVNode as v, toDisplayString as s, createCommentVNode as K, withDirectives as Q, createElementBlock as V, Fragment as T, renderList as q } from "vue";
import { t as i, dQ as z } from "./core-shared-ca1fcae5.js";
const A = { class: "input-width" }, G = { class: "input-width" }, H = { class: "input-width" }, I = { class: "input-width" }, J = { class: "dialog-footer" }, Y = /* @__PURE__ */ L({
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
    }, t = O({ ...g }), y = h(), C = S(() => ({})), N = x, F = async (a) => {
      r.value || !a || await a.validate(async (e) => {
        if (e) {
          r.value = !0;
          const u = t;
          u.status = u.is_wechat, z(u).then((b) => {
            r.value = !1, _.value = !1, N("complete");
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
      const u = d("el-alert"), b = d("el-radio"), j = d("el-radio-group"), m = d("el-form-item"), B = d("el-form"), k = d("el-button"), R = d("el-dialog"), U = $("loading");
      return f(), w(R, {
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
              onClick: e[2] || (e[2] = (c) => F(y.value))
            }, {
              default: l(() => [
                v(s(o(i)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: l(() => [
          !t.bind_wechat && t.is_need_bind_merchant ? (f(), w(u, {
            key: 0,
            title: "未绑定接收者微信",
            type: "error",
            closable: !1
          })) : K("", !0),
          Q((f(), w(B, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: C.value,
            class: "page-form"
          }, {
            default: l(() => [
              n(m, {
                label: o(i)("status")
              }, {
                default: l(() => [
                  n(j, {
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
              n(m, {
                label: o(i)("name")
              }, {
                default: l(() => [
                  p("div", A, s(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: o(i)("tempKey")
              }, {
                default: l(() => [
                  p("div", G, s(t.temp_key), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: o(i)("keywordNameList")
              }, {
                default: l(() => [
                  p("div", H, s(t.keyword_name_list ? t.keyword_name_list.join("，") : ""), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: o(i)("content")
              }, {
                default: l(() => [
                  p("div", I, [
                    (f(!0), V(T, null, q(t.content, (c, E) => (f(), V("div", { key: E }, s(c[0]) + "：" + s(c[1]), 1))), 128))
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
  Y as _
};
