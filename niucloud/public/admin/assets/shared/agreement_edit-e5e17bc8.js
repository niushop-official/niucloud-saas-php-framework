import { defineComponent as T, ref as h, reactive as q, computed as A, resolveComponent as d, resolveDirective as F, openBlock as w, createElementBlock as P, createVNode as n, withCtx as l, unref as i, withDirectives as U, createBlock as $, createElementVNode as k, createTextVNode as x, toDisplayString as V } from "vue";
import { dL as j, t as a, dM as L, dN as O } from "./core-shared-ca1fcae5.js";
import { ArrowLeft as I } from "@element-plus/icons-vue";
import { useRoute as z, useRouter as G } from "vue-router";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const H = { class: "main-container" }, J = { class: "fixed-footer-wrap" }, K = { class: "fixed-footer" }, re = /* @__PURE__ */ T({
  __name: "agreement_edit",
  setup(Q) {
    const c = z(), D = G(), f = c.query.key || "", s = h(!1), C = j(), N = c.meta.title, g = {
      agreement_key: "",
      content: "",
      title: "",
      agreement_key_name: ""
    }, t = q({ ...g });
    s.value = !0, f && (async (m = "") => {
      Object.assign(t, g);
      const e = await (await L(m)).data;
      Object.keys(t).forEach((o) => {
        e[o] != null && (t[o] = e[o]);
      }), s.value = !1;
    })(f);
    const v = h(), R = A(() => ({
      title: [
        { required: !0, message: a("titlePlaceholder"), trigger: "blur" }
      ],
      content: [
        {
          required: !0,
          trigger: ["blur", "change"],
          validator: (m, e, o) => {
            if (e === "")
              o(new Error(a("contentPlaceholder")));
            else {
              if (e.length < 5 || e.length > 1e5)
                return o(new Error(a("contentMaxTips"))), !1;
              o();
            }
          }
        }
      ]
    })), B = async (m) => {
      s.value || !m || await m.validate(async (e) => {
        if (e) {
          s.value = !0;
          const o = t;
          o.key = t.agreement_key, O(o).then((_) => {
            s.value = !1, u();
          }).catch(() => {
            s.value = !1;
          });
        }
      });
    }, u = () => {
      C.removeTab(c.path), D.push({ path: "/setting/agreement" });
    };
    return (m, e) => {
      const o = d("el-page-header"), _ = d("el-card"), b = d("el-input"), p = d("el-form-item"), E = d("editor"), M = d("el-form"), y = d("el-button"), S = F("loading");
      return w(), P("div", H, [
        n(_, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            n(o, {
              content: i(N),
              icon: i(I),
              onBack: e[0] || (e[0] = (r) => u())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        U((w(), $(_, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            n(M, {
              model: t,
              "label-width": "90px",
              ref_key: "formRef",
              ref: v,
              rules: R.value,
              class: "page-form"
            }, {
              default: l(() => [
                n(p, {
                  label: i(a)("type")
                }, {
                  default: l(() => [
                    n(b, {
                      modelValue: t.agreement_key_name,
                      "onUpdate:modelValue": e[1] || (e[1] = (r) => t.agreement_key_name = r),
                      modelModifiers: { trim: !0 },
                      readonly: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(p, {
                  label: i(a)("title"),
                  prop: "title"
                }, {
                  default: l(() => [
                    n(b, {
                      modelValue: t.title,
                      "onUpdate:modelValue": e[2] || (e[2] = (r) => t.title = r),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: i(a)("titlePlaceholder"),
                      class: "input-width",
                      maxlength: "20"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(p, {
                  label: i(a)("content"),
                  prop: "content"
                }, {
                  default: l(() => [
                    n(E, {
                      modelValue: t.content,
                      "onUpdate:modelValue": e[3] || (e[3] = (r) => t.content = r)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        })), [
          [S, s.value]
        ]),
        k("div", J, [
          k("div", K, [
            n(y, {
              type: "primary",
              onClick: e[4] || (e[4] = (r) => B(v.value))
            }, {
              default: l(() => [
                x(V(i(a)("save")), 1)
              ]),
              _: 1
            }),
            n(y, {
              onClick: e[5] || (e[5] = (r) => u())
            }, {
              default: l(() => [
                x(V(i(a)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
export {
  re as default
};
