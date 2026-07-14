import { defineComponent as E, ref as g, reactive as O, computed as T, resolveComponent as p, resolveDirective as $, openBlock as u, createBlock as w, unref as l, withCtx as a, createElementVNode as f, createVNode as n, createTextVNode as v, toDisplayString as d, createCommentVNode as G, withDirectives as K, createElementBlock as D, Fragment as L, renderList as q } from "vue";
import { t as i, aG as z } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const A = { class: "input-width" }, H = { class: "input-width" }, I = { class: "input-width" }, J = { class: "dialog-footer" }, oe = /* @__PURE__ */ E({
  __name: "notice-weapp",
  emits: ["complete"],
  setup(M, { expose: x, emit: k }) {
    const c = g(!1), s = g(!0), h = {
      is_weapp: 0,
      key: "",
      name: "",
      title: "",
      type: "",
      content: [],
      first: "",
      remark: "",
      tid: "",
      bind_weapp: "",
      is_need_bind_merchant: ""
    }, t = O({ ...h }), y = g(), C = T(() => ({})), N = k, F = async (o) => {
      s.value || !o || await o.validate(async (e) => {
        if (e) {
          s.value = !0;
          const m = t;
          m.status = m.is_weapp, z(m).then((b) => {
            s.value = !1, c.value = !1, N("complete");
          }).catch(() => {
            s.value = !1;
          });
        }
      });
    };
    return x({
      showDialog: c,
      setFormData: async (o = null) => {
        s.value = !0, Object.assign(t, h), o && Object.keys(t).forEach((e) => {
          o[e] != null && (t[e] = o[e]), o.weapp && o.weapp[e] != null && (t[e] = o.weapp[e]);
        }), s.value = !1;
      }
    }), (o, e) => {
      const m = p("el-alert"), b = p("el-radio"), B = p("el-radio-group"), _ = p("el-form-item"), R = p("el-form"), V = p("el-button"), S = p("el-dialog"), U = $("loading");
      return u(), w(S, {
        modelValue: c.value,
        "onUpdate:modelValue": e[3] || (e[3] = (r) => c.value = r),
        title: l(i)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          f("span", J, [
            n(V, {
              onClick: e[1] || (e[1] = (r) => c.value = !1)
            }, {
              default: a(() => [
                v(d(l(i)("cancel")), 1)
              ]),
              _: 1
            }),
            n(V, {
              type: "primary",
              loading: s.value,
              onClick: e[2] || (e[2] = (r) => F(y.value))
            }, {
              default: a(() => [
                v(d(l(i)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: a(() => [
          !t.bind_weapp && t.is_need_bind_merchant ? (u(), w(m, {
            key: 0,
            title: "未绑定接收者小程序",
            type: "error",
            closable: !1
          })) : G("", !0),
          K((u(), w(R, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: C.value,
            class: "page-form"
          }, {
            default: a(() => [
              n(_, {
                label: l(i)("status")
              }, {
                default: a(() => [
                  n(B, {
                    modelValue: t.is_weapp,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_weapp = r)
                  }, {
                    default: a(() => [
                      n(b, { label: 1 }, {
                        default: a(() => [
                          v(d(l(i)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      n(b, { label: 0 }, {
                        default: a(() => [
                          v(d(l(i)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              n(_, {
                label: l(i)("name")
              }, {
                default: a(() => [
                  f("div", A, d(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(_, {
                label: l(i)("weappTempKey")
              }, {
                default: a(() => [
                  f("div", H, d(t.tid), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(_, {
                label: l(i)("content")
              }, {
                default: a(() => [
                  f("div", I, [
                    (u(!0), D(L, null, q(t.content, (r, j) => (u(), D("div", { key: j }, d(r[0]) + "：" + d(r[1]), 1))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [U, s.value]
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
