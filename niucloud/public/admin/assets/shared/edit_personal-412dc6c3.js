import { defineComponent as N, reactive as U, ref as v, resolveComponent as s, resolveDirective as k, withDirectives as C, openBlock as F, createElementBlock as D, createElementVNode as d, toDisplayString as _, unref as o, createVNode as a, withCtx as n, createTextVNode as g } from "vue";
import { t as r, ax as R, ay as j, _ as B } from "./core-shared-ca1fcae5.js";
import { useRouter as P } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const $ = { class: "main-container w-full pt-[64px]" }, E = { class: "flex justify-between items-center h-[32px] mb-4" }, M = { class: "text-page-title" }, S = { class: "flex justify-center mt-[50px]" }, T = /* @__PURE__ */ N({
  __name: "edit_personal",
  setup(q) {
    const h = P(), t = U({
      head_img: "",
      real_name: "",
      username: ""
    }), c = v(), l = v(!0);
    (() => {
      l.value = !0, R().then((m) => {
        l.value = !1;
        const e = m.data;
        t.head_img = e.head_img, t.real_name = e.real_name, t.username = e.username;
      }).catch(() => {
        l.value = !1;
      });
    })();
    const b = (m) => {
      l.value || !m || m.validate((e) => {
        if (e)
          l.value = !0, j(t).then((p) => {
            l.value = !1;
          }).catch(() => {
            l.value = !1;
          });
        else
          return !1;
      });
    }, x = () => {
      h.push("/user/center");
    };
    return (m, e) => {
      const p = s("upload-image"), u = s("el-form-item"), y = s("el-input"), V = s("el-form"), f = s("el-button"), w = s("el-card"), I = k("loading");
      return C((F(), D("div", $, [
        d("div", E, [
          d("span", M, _(o(r)("editPersonal")), 1)
        ]),
        a(w, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            a(V, {
              model: t,
              "label-width": "90px",
              ref_key: "formRef",
              ref: c,
              class: "page-form"
            }, {
              default: n(() => [
                a(u, {
                  label: o(r)("headImg")
                }, {
                  default: n(() => [
                    a(p, {
                      modelValue: t.head_img,
                      "onUpdate:modelValue": e[0] || (e[0] = (i) => t.head_img = i),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, {
                  label: o(r)("userName")
                }, {
                  default: n(() => [
                    d("span", null, _(t.username), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, {
                  label: o(r)("realName")
                }, {
                  default: n(() => [
                    a(y, {
                      modelValue: t.real_name,
                      "onUpdate:modelValue": e[1] || (e[1] = (i) => t.real_name = i),
                      modelModifiers: { trim: !0 },
                      placeholder: o(r)("realNamePlaceholder"),
                      clearable: "",
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model"]),
            d("div", S, [
              a(f, {
                type: "primary",
                onClick: e[2] || (e[2] = (i) => b(c.value))
              }, {
                default: n(() => [
                  g(_(o(r)("save")), 1)
                ]),
                _: 1
              }),
              a(f, {
                type: "primary",
                onClick: e[3] || (e[3] = (i) => x())
              }, {
                default: n(() => [
                  g(_(o(r)("cancel")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ])), [
        [I, l.value]
      ]);
    };
  }
});
const W = /* @__PURE__ */ B(T, [["__scopeId", "data-v-7a2d2af4"]]);
export {
  W as default
};
