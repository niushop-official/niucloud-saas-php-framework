import { defineComponent as $, ref as v, reactive as R, resolveComponent as c, resolveDirective as E, openBlock as g, createElementBlock as G, createVNode as s, withCtx as u, unref as r, withDirectives as T, createBlock as x, createElementVNode as i, toDisplayString as _, createCommentVNode as L, createTextVNode as A } from "vue";
import { t, az as j, db as z, bI as M, dc as F, dd as O } from "./core-shared-9b1e55e9.js";
import { ArrowLeft as S } from "@element-plus/icons-vue";
import { useRoute as H, useRouter as J } from "vue-router";
import K from "./member-benefits-5e6c746e.js";
import Q from "./member-gift-2e9e4f9f.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const W = { class: "main-container" }, X = { class: "panel-title !text-sm" }, Y = { class: "w-[150px]" }, Z = { class: "text-sm text-gray-400 mb-[5px]" }, ee = { class: "panel-title !text-sm" }, le = { class: "pl-[100px]" }, te = { class: "panel-title !text-sm" }, oe = { class: "pl-[100px]" }, re = { class: "fixed-footer-wrap" }, ae = { class: "fixed-footer" }, he = /* @__PURE__ */ $({
  __name: "level_edit",
  setup(ne) {
    const w = H(), V = J(), B = w.meta.title, C = () => {
      V.push("/member/level");
    }, y = v(null), k = v(null), p = v(!0), m = v({ min: 0, max: 0 }), l = R({
      level_id: 0,
      level_name: "",
      remark: "",
      growth: "",
      level_benefits: {},
      level_gifts: {}
    }), N = v(), P = R({
      level_name: [
        { required: !0, message: t("levelNamePlaceholder"), trigger: "blur" }
      ],
      growth: [
        { required: !0, message: t("growthPlaceholder"), trigger: "blur" },
        {
          validator: (a, e, o) => {
            j.digits(l.growth) || o(t("growthFormatError")), l.growth <= 0 && o(t("growthNeedGt") + 0), m.value.min && l.growth <= m.value.min && o(t("growthNeedGt") + m.value.min), m.value.max && l.growth >= m.value.max && o(t("growthNeedLt") + m.value.max), o();
          }
        }
      ]
    });
    w.query.id ? z(w.query.id).then(({ data: a }) => {
      Object.assign(l, a), M().then(({ data: e }) => {
        let o = 0;
        e.forEach((d, f) => {
          d.level_id == l.level_id && (o = f);
        }), e[o - 1] && (m.value.min = e[o - 1].growth), e[o + 1] && (m.value.max = e[o + 1].growth);
      }), p.value = !1;
    }) : (M().then(({ data: a }) => {
      a[a.length - 1] && (m.value.min = a[a.length - 1].growth);
    }), p.value = !1);
    const h = v(!1), U = async (a) => {
      h.value || !a || await a.validate(async (e) => {
        var o, d;
        if (e) {
          if (!await ((o = y.value) == null ? void 0 : o.verify()) || !await ((d = k.value) == null ? void 0 : d.verify()))
            return;
          h.value = !0, (l.level_id ? F : O)(l).then(() => {
            V.push({ path: "/member/level" });
          }).catch(() => {
            h.value = !1;
          });
        }
      });
    };
    return (a, e) => {
      const o = c("el-page-header"), d = c("el-card"), f = c("el-input"), b = c("el-form-item"), q = c("el-form"), D = c("el-button"), I = E("loading");
      return g(), G("div", W, [
        s(d, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: u(() => [
            s(o, {
              content: r(B),
              icon: r(S),
              onBack: e[0] || (e[0] = (n) => C())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        T((g(), x(d, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: u(() => [
            s(q, {
              class: "page-form",
              model: l,
              "label-width": "120px",
              ref_key: "formRef",
              ref: N,
              rules: P
            }, {
              default: u(() => [
                i("h3", X, _(r(t)("basicInfo")), 1),
                s(b, {
                  label: r(t)("levelName"),
                  prop: "level_name"
                }, {
                  default: u(() => [
                    s(f, {
                      modelValue: l.level_name,
                      "onUpdate:modelValue": e[1] || (e[1] = (n) => l.level_name = n),
                      modelModifiers: { trim: !0 },
                      placeholder: r(t)("levelNamePlaceholder"),
                      class: "input-width",
                      maxlength: "20",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(b, {
                  label: r(t)("remark"),
                  prop: "remark"
                }, {
                  default: u(() => [
                    s(f, {
                      modelValue: l.remark,
                      "onUpdate:modelValue": e[2] || (e[2] = (n) => l.remark = n),
                      modelModifiers: { trim: !0 },
                      type: "textarea",
                      placeholder: r(t)("remarkPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      rows: "4",
                      maxlength: "200",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(b, {
                  label: r(t)("growth"),
                  prop: "growth"
                }, {
                  default: u(() => [
                    i("div", null, [
                      i("div", Y, [
                        s(f, {
                          modelValue: l.growth,
                          "onUpdate:modelValue": e[3] || (e[3] = (n) => l.growth = n),
                          modelModifiers: { number: !0, trim: !0 },
                          placeholder: r(t)("growthPlaceholder"),
                          clearable: ""
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      i("div", Z, _(r(t)("growthTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"]),
            i("h3", ee, _(r(t)("levelBenefits")), 1),
            i("div", le, [
              p.value ? L("", !0) : (g(), x(K, {
                key: 0,
                ref_key: "benefitsRef",
                ref: y,
                modelValue: l.level_benefits,
                "onUpdate:modelValue": e[4] || (e[4] = (n) => l.level_benefits = n)
              }, null, 8, ["modelValue"]))
            ]),
            i("h3", te, _(r(t)("levelGift")), 1),
            i("div", oe, [
              p.value ? L("", !0) : (g(), x(Q, {
                key: 0,
                ref_key: "giftRef",
                ref: k,
                modelValue: l.level_gifts,
                "onUpdate:modelValue": e[5] || (e[5] = (n) => l.level_gifts = n)
              }, null, 8, ["modelValue"]))
            ])
          ]),
          _: 1
        })), [
          [I, p.value]
        ]),
        i("div", re, [
          i("div", ae, [
            s(D, {
              type: "primary",
              loading: h.value,
              onClick: e[6] || (e[6] = (n) => U(N.value))
            }, {
              default: u(() => [
                A(_(r(t)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
export {
  he as default
};
