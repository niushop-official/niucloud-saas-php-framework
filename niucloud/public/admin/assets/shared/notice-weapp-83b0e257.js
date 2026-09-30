import { defineComponent as U, ref as g, reactive as j, computed as E, resolveComponent as p, resolveDirective as T, openBlock as m, createBlock as w, unref as l, withCtx as a, createElementVNode as f, createVNode as n, createTextVNode as v, toDisplayString as d, createCommentVNode as $, withDirectives as K, createElementBlock as D, Fragment as L, renderList as q } from "vue";
import { t as i, aO as z } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const A = { class: "input-width" }, G = { class: "input-width" }, H = { class: "input-width" }, I = { class: "dialog-footer" }, ae = /* @__PURE__ */ U({
  __name: "notice-weapp",
  emits: ["complete"],
  setup(J, { expose: k, emit: x }) {
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
    }, t = j({ ...h }), y = g(), C = E(() => ({})), N = async (o) => {
      s.value || !o || await o.validate(async (e) => {
        if (e) {
          s.value = !0;
          const u = t;
          u.status = u.is_weapp, z(u).then((b) => {
            s.value = !1, c.value = !1, x("complete");
          }).catch(() => {
            s.value = !1;
          });
        }
      });
    };
    return k({
      showDialog: c,
      setFormData: async (o = null) => {
        s.value = !0, Object.assign(t, h), o && Object.keys(t).forEach((e) => {
          o[e] != null && (t[e] = o[e]), o.weapp && o.weapp[e] != null && (t[e] = o.weapp[e]);
        }), s.value = !1;
      }
    }), (o, e) => {
      const u = p("el-alert"), b = p("el-radio"), F = p("el-radio-group"), _ = p("el-form-item"), B = p("el-form"), V = p("el-button"), O = p("el-dialog"), R = T("loading");
      return m(), w(O, {
        modelValue: c.value,
        "onUpdate:modelValue": e[3] || (e[3] = (r) => c.value = r),
        title: l(i)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          f("span", I, [
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
              onClick: e[2] || (e[2] = (r) => N(y.value))
            }, {
              default: a(() => [
                v(d(l(i)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: a(() => [
          !t.bind_weapp && t.is_need_bind_merchant ? (m(), w(u, {
            key: 0,
            title: "未绑定接收者小程序",
            type: "error",
            closable: !1
          })) : $("", !0),
          K((m(), w(B, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: l(C),
            class: "page-form"
          }, {
            default: a(() => [
              n(_, {
                label: l(i)("status")
              }, {
                default: a(() => [
                  n(F, {
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
                  f("div", G, d(t.tid), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(_, {
                label: l(i)("content")
              }, {
                default: a(() => [
                  f("div", H, [
                    (m(!0), D(L, null, q(t.content, (r, S) => (m(), D("div", { key: S }, d(r[0]) + "：" + d(r[1]), 1))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [R, s.value]
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
