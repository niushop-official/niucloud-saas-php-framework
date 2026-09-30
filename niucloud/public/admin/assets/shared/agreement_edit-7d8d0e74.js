import { defineComponent as q, ref as h, reactive as A, computed as F, resolveComponent as d, resolveDirective as M, openBlock as w, createElementBlock as P, createVNode as n, withCtx as i, unref as r, withDirectives as U, createBlock as $, createElementVNode as k, createTextVNode as x, toDisplayString as V } from "vue";
import { eb as j, t as a, ec as O, ed as I } from "./core-shared-c6ad4e77.js";
import { ArrowLeft as L } from "@element-plus/icons-vue";
import { useRoute as z, useRouter as G } from "vue-router";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const H = { class: "main-container" }, J = { class: "fixed-footer-wrap" }, K = { class: "fixed-footer" }, ae = /* @__PURE__ */ q({
  __name: "agreement_edit",
  setup(Q) {
    const c = z(), D = G(), f = c.query.key || "", s = h(!1), C = j(), R = c.meta.title, g = {
      agreement_key: "",
      content: "",
      title: "",
      agreement_key_name: ""
    }, t = A({ ...g });
    s.value = !0, f && (async (m = "") => {
      Object.assign(t, g);
      const e = await (await O(m)).data;
      Object.keys(t).forEach((o) => {
        e[o] != null && (t[o] = e[o]);
      }), s.value = !1;
    })(f);
    const v = h(), B = F(() => ({
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
    })), E = async (m) => {
      s.value || !m || await m.validate(async (e) => {
        if (e) {
          s.value = !0;
          const o = t;
          o.key = t.agreement_key, I(o).then((_) => {
            s.value = !1, u();
          }).catch(() => {
            s.value = !1;
          });
        }
      });
    }, u = () => {
      C.removeTab(c.name), D.push({ path: "/setting/agreement" });
    };
    return (m, e) => {
      const o = d("el-page-header"), _ = d("el-card"), b = d("el-input"), p = d("el-form-item"), N = d("editor"), S = d("el-form"), y = d("el-button"), T = M("loading");
      return w(), P("div", H, [
        n(_, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            n(o, {
              content: r(R),
              icon: r(L),
              onBack: e[0] || (e[0] = (l) => u())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        U((w(), $(_, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            n(S, {
              model: t,
              "label-width": "90px",
              ref_key: "formRef",
              ref: v,
              rules: r(B),
              class: "page-form"
            }, {
              default: i(() => [
                n(p, {
                  label: r(a)("type")
                }, {
                  default: i(() => [
                    n(b, {
                      modelValue: t.agreement_key_name,
                      "onUpdate:modelValue": e[1] || (e[1] = (l) => t.agreement_key_name = l),
                      modelModifiers: { trim: !0 },
                      readonly: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(p, {
                  label: r(a)("title"),
                  prop: "title"
                }, {
                  default: i(() => [
                    n(b, {
                      modelValue: t.title,
                      "onUpdate:modelValue": e[2] || (e[2] = (l) => t.title = l),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: r(a)("titlePlaceholder"),
                      class: "input-width",
                      maxlength: "20"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(p, {
                  label: r(a)("content"),
                  prop: "content"
                }, {
                  default: i(() => [
                    n(N, {
                      modelValue: t.content,
                      "onUpdate:modelValue": e[3] || (e[3] = (l) => t.content = l)
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
          [T, s.value]
        ]),
        k("div", J, [
          k("div", K, [
            n(y, {
              type: "primary",
              onClick: e[4] || (e[4] = (l) => E(v.value))
            }, {
              default: i(() => [
                x(V(r(a)("save")), 1)
              ]),
              _: 1
            }),
            n(y, {
              onClick: e[5] || (e[5] = (l) => u())
            }, {
              default: i(() => [
                x(V(r(a)("cancel")), 1)
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
  ae as default
};
