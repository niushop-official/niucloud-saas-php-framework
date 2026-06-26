import { defineComponent as I, ref as x, reactive as b, resolveComponent as m, resolveDirective as O, openBlock as v, createElementBlock as F, createVNode as s, withCtx as d, withDirectives as P, createBlock as V, createElementVNode as i, toDisplayString as p, unref as a, Fragment as S, renderList as U, createTextVNode as z } from "vue";
import { t as l, bE as A, ez as H, eA as L, eB as T } from "./core-shared-ca1fcae5.js";
import { useRouter as j } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const q = { class: "main-container" }, K = { class: "panel-title !text-sm" }, Y = { class: "form-tip" }, Z = { class: "text-lg" }, G = { class: "panel-title" }, J = { class: "ml-[10px]" }, Q = { class: "fixed-footer-wrap" }, W = { class: "fixed-footer" }, me = /* @__PURE__ */ I({
  __name: "member",
  setup(X) {
    const D = j(), c = x(!0), u = x({}), y = x(""), C = b({
      prefix: [
        { validator: (r, e, n) => {
          e && !/^[a-zA-Z]*$/g.test(e) ? n(new Error(l("prefixHint"))) : n();
        }, trigger: "blur" }
      ],
      length: [
        { required: !0, message: l("lengthPlaceholder"), trigger: ["blur", "change"] },
        {
          validator: (r, e, n) => {
            parseInt(e) > 30 || parseInt(e) - o.prefix.length < 4 ? n(new Error(l("lengthHint"))) : n();
          },
          trigger: "blur"
        }
      ]
    }), o = b({
      prefix: "",
      length: 10,
      form_id: ""
    });
    (async () => {
      const r = await (await H()).data;
      Object.keys(o).forEach((e) => {
        r[e] != null && (o[e] = r[e]);
      }), _(u.value), c.value = !1;
    })();
    const _ = async (r) => {
      await r.validate((e) => {
        if (e) {
          let n = "";
          const f = o.length - o.prefix.length - 1;
          for (let g = 1; g <= f; g++)
            n += "0";
          y.value = o.prefix + n + "1";
        }
      });
    }, h = b([]), E = () => {
      const r = D.resolve({
        path: "/diy_form/list"
      });
      window.open(r.href);
    }, w = (r = !1) => {
      L({
        type: "DIY_FORM_MEMBER_INFO",
        status: 1
      }).then((e) => {
        const n = e.data;
        n && (h.splice(0, h.length, ...n), r && ElMessage({
          message: l("refreshSuccess"),
          type: "success"
        }));
      });
    };
    w();
    const M = async (r) => {
      c.value || !r || await r.validate((e) => {
        e && T(o).then(() => {
          c.value = !1, _(u.value);
        }).catch(() => {
          c.value = !1;
        });
      });
    };
    return (r, e) => {
      const n = m("el-input"), f = m("el-form-item"), g = m("el-option"), N = m("el-select"), R = m("el-form"), B = m("el-card"), k = m("el-button"), $ = O("loading");
      return v(), F("div", q, [
        s(B, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: d(() => [
            P((v(), V(R, {
              class: "page-form",
              model: o,
              "label-width": "150px",
              ref_key: "ruleFormRef",
              ref: u,
              rules: C
            }, {
              default: d(() => [
                i("h3", K, p(a(l)("memberNoRule")), 1),
                s(f, {
                  label: a(l)("prefix"),
                  prop: "prefix"
                }, {
                  default: d(() => [
                    s(n, {
                      modelValue: o.prefix,
                      "onUpdate:modelValue": e[0] || (e[0] = (t) => o.prefix = t),
                      modelModifiers: { trim: !0 },
                      placeholder: a(l)("prefixPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      onChange: e[1] || (e[1] = (t) => _(u.value))
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(f, {
                  label: a(l)("length"),
                  prop: "length"
                }, {
                  default: d(() => [
                    s(n, {
                      modelValue: o.length,
                      "onUpdate:modelValue": e[2] || (e[2] = (t) => o.length = t),
                      modelModifiers: { trim: !0 },
                      placeholder: a(l)("lengthPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      onKeyup: e[3] || (e[3] = (t) => a(A)(t)),
                      onChange: e[4] || (e[4] = (t) => _(u.value)),
                      onBlur: e[5] || (e[5] = (t) => o.length = t.target.value)
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", Y, p(a(l)("lengthTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(f, null, {
                  default: d(() => [
                    i("div", Z, p(y.value), 1)
                  ]),
                  _: 1
                }),
                i("h3", G, p(a(l)("diyForm")), 1),
                s(f, {
                  label: a(l)("personalForm")
                }, {
                  default: d(() => [
                    s(N, {
                      modelValue: o.form_id,
                      "onUpdate:modelValue": e[6] || (e[6] = (t) => o.form_id = t),
                      placeholder: a(l)("diyFormPlaceholder"),
                      clearable: ""
                    }, {
                      default: d(() => [
                        (v(!0), F(S, null, U(h, (t) => (v(), V(g, {
                          key: t.form_id,
                          label: t.page_title,
                          value: t.form_id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"]),
                    i("div", J, [
                      i("span", {
                        class: "cursor-pointer text-primary mr-[10px]",
                        onClick: e[7] || (e[7] = (t) => w(!0))
                      }, p(a(l)("refresh")), 1),
                      i("span", {
                        class: "cursor-pointer text-primary",
                        onClick: E
                      }, p(a(l)("addDiyForm")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [$, c.value]
            ])
          ]),
          _: 1
        }),
        i("div", Q, [
          i("div", W, [
            s(k, {
              type: "primary",
              onClick: e[8] || (e[8] = (t) => M(u.value))
            }, {
              default: d(() => [
                z(p(a(l)("save")), 1)
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
  me as default
};
