import { defineComponent as k, reactive as w, ref as f, resolveComponent as u, openBlock as S, createBlock as F, unref as n, withCtx as a, createElementVNode as b, createVNode as t, createTextVNode as h, toDisplayString as _ } from "vue";
import { u as B, t as r, ax as R, ay as $, I as j } from "./core-shared-ca1fcae5.js";
const D = { class: "flex justify-end" }, q = /* @__PURE__ */ k({
  __name: "index",
  setup(M, { expose: x }) {
    const p = B(), l = w({}), c = f(), s = f(!0), d = f(!1), g = () => {
      R().then((i) => {
        s.value = !1;
        const e = i.data;
        l.head_img = e.head_img, l.real_name = e.real_name, l.username = e.username;
      });
    };
    g();
    const I = () => {
      d.value = !0, g();
    }, U = (i) => {
      s.value || !i || i.validate((e) => {
        if (e)
          s.value = !0, $(l).then((v) => {
            s.value = !1, d.value = !1;
            let m = j(p.userInfo);
            m.head_img = l.head_img, p.setUserInfo(m);
          }).catch(() => {
            s.value = !1;
          });
        else
          return !1;
      });
    };
    return x({
      open: I
    }), (i, e) => {
      const v = u("upload-image"), m = u("el-form-item"), y = u("el-input"), C = u("el-form"), V = u("el-button"), N = u("el-dialog");
      return S(), F(N, {
        modelValue: d.value,
        "onUpdate:modelValue": e[4] || (e[4] = (o) => d.value = o),
        title: n(r)("accountSettings"),
        width: "500"
      }, {
        footer: a(() => [
          b("div", D, [
            t(V, {
              type: "primary",
              onClick: e[2] || (e[2] = (o) => U(c.value)),
              loading: s.value
            }, {
              default: a(() => [
                h(_(n(r)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"]),
            t(V, {
              onClick: e[3] || (e[3] = (o) => d.value = !1)
            }, {
              default: a(() => [
                h(_(n(r)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: a(() => [
          t(C, {
            model: l,
            "label-width": "90px",
            ref_key: "formRef",
            ref: c,
            class: "page-form"
          }, {
            default: a(() => [
              t(m, {
                label: n(r)("headImg")
              }, {
                default: a(() => [
                  t(v, {
                    modelValue: l.head_img,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => l.head_img = o),
                    limit: 1,
                    imageFit: "cover"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(m, {
                label: n(r)("userName")
              }, {
                default: a(() => [
                  b("span", null, _(l.username), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              t(m, {
                label: n(r)("realName")
              }, {
                default: a(() => [
                  t(y, {
                    modelValue: l.real_name,
                    "onUpdate:modelValue": e[1] || (e[1] = (o) => l.real_name = o),
                    modelModifiers: { trim: !0 },
                    placeholder: n(r)("realNamePlaceholder"),
                    clearable: "",
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  q as _
};
