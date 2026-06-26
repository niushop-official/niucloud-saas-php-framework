import { defineComponent as E, ref as g, reactive as O, computed as T, resolveComponent as c, resolveDirective as $, openBlock as _, createBlock as w, unref as o, withCtx as a, createElementVNode as f, createVNode as n, createTextVNode as v, toDisplayString as d, createCommentVNode as G, withDirectives as K, createElementBlock as D, Fragment as L, renderList as q } from "vue";
import { t as i, aG as z } from "./core-shared-ca1fcae5.js";
const A = { class: "input-width" }, H = { class: "input-width" }, I = { class: "input-width" }, J = { class: "dialog-footer" }, X = /* @__PURE__ */ E({
  __name: "notice-weapp",
  emits: ["complete"],
  setup(M, { expose: x, emit: k }) {
    const u = g(!1), s = g(!0), h = {
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
    }, t = O({ ...h }), y = g(), C = T(() => ({})), N = k, F = async (l) => {
      s.value || !l || await l.validate(async (e) => {
        if (e) {
          s.value = !0;
          const p = t;
          p.status = p.is_weapp, z(p).then((b) => {
            s.value = !1, u.value = !1, N("complete");
          }).catch(() => {
            s.value = !1;
          });
        }
      });
    };
    return x({
      showDialog: u,
      setFormData: async (l = null) => {
        s.value = !0, Object.assign(t, h), l && Object.keys(t).forEach((e) => {
          l[e] != null && (t[e] = l[e]), l.weapp && l.weapp[e] != null && (t[e] = l.weapp[e]);
        }), s.value = !1;
      }
    }), (l, e) => {
      const p = c("el-alert"), b = c("el-radio"), B = c("el-radio-group"), m = c("el-form-item"), R = c("el-form"), V = c("el-button"), S = c("el-dialog"), U = $("loading");
      return _(), w(S, {
        modelValue: u.value,
        "onUpdate:modelValue": e[3] || (e[3] = (r) => u.value = r),
        title: o(i)("noticeSetting"),
        width: "550px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          f("span", J, [
            n(V, {
              onClick: e[1] || (e[1] = (r) => u.value = !1)
            }, {
              default: a(() => [
                v(d(o(i)("cancel")), 1)
              ]),
              _: 1
            }),
            n(V, {
              type: "primary",
              loading: s.value,
              onClick: e[2] || (e[2] = (r) => F(y.value))
            }, {
              default: a(() => [
                v(d(o(i)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: a(() => [
          !t.bind_weapp && t.is_need_bind_merchant ? (_(), w(p, {
            key: 0,
            title: "未绑定接收者小程序",
            type: "error",
            closable: !1
          })) : G("", !0),
          K((_(), w(R, {
            model: t,
            "label-width": "110px",
            ref_key: "formRef",
            ref: y,
            rules: C.value,
            class: "page-form"
          }, {
            default: a(() => [
              n(m, {
                label: o(i)("status")
              }, {
                default: a(() => [
                  n(B, {
                    modelValue: t.is_weapp,
                    "onUpdate:modelValue": e[0] || (e[0] = (r) => t.is_weapp = r)
                  }, {
                    default: a(() => [
                      n(b, { label: 1 }, {
                        default: a(() => [
                          v(d(o(i)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      n(b, { label: 0 }, {
                        default: a(() => [
                          v(d(o(i)("statusDeactivate")), 1)
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
                default: a(() => [
                  f("div", A, d(t.name), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: o(i)("weappTempKey")
              }, {
                default: a(() => [
                  f("div", H, d(t.tid), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              n(m, {
                label: o(i)("content")
              }, {
                default: a(() => [
                  f("div", I, [
                    (_(!0), D(L, null, q(t.content, (r, j) => (_(), D("div", { key: j }, d(r[0]) + "：" + d(r[1]), 1))), 128))
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
  X as _
};
