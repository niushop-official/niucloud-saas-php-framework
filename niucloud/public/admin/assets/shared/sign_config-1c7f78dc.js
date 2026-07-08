import { defineComponent as ue, ref as m, reactive as O, resolveComponent as v, resolveDirective as ce, openBlock as r, createElementBlock as f, withDirectives as G, createBlock as x, withCtx as l, createVNode as d, createElementVNode as u, toDisplayString as s, unref as n, createCommentVNode as h, Fragment as K, renderList as Z, createTextVNode as S, pushScopeId as _e, popScopeId as pe } from "vue";
import { t as a, bE as fe, cA as me, cB as H, cC as ve, _ as ge } from "./core-shared-9b1e55e9.js";
import ye from "./sign-day-14f5031e.js";
import we from "./sign-continue-6fb36114.js";
import { useRoute as be } from "vue-router";
import { c as g } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const J = (P) => (_e("data-v-1e045545"), P = P(), pe(), P), xe = { class: "main-container" }, he = { class: "text-page-title" }, Se = /* @__PURE__ */ J(() => /* @__PURE__ */ u("span", { class: "ml-[10px]" }, "天", -1)), ke = { key: 0 }, Ce = {
  key: 1,
  class: "flex ml-[5px]"
}, Ve = /* @__PURE__ */ J(() => /* @__PURE__ */ u("span", { class: "ml-[5px] mr-[5px]" }, "|", -1)), Ae = { class: "form-tip" }, De = { class: "form-tip" }, Ee = { class: "mt-[10px]" }, Te = { key: 0 }, $e = { key: 0 }, Oe = { key: 1 }, Pe = { class: "flex mt-[10px]" }, Ne = { class: "form-tip" }, Re = { class: "flex" }, Ue = { class: "dialog-footer" }, Be = { class: "dialog-footer" }, Me = { class: "fixed-footer-wrap" }, Fe = { class: "fixed-footer" }, Ie = /* @__PURE__ */ ue({
  __name: "sign_config",
  setup(P) {
    const je = be().meta.title, qe = m("signSet"), E = m(!0), T = m(!1), C = m(!1), B = m(), c = m({});
    let N = !1, R = 0;
    const Q = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, W = O({
      day_award: [
        {
          required: !0,
          trigger: "change",
          validator: (o, e, _) => {
            let p = !1;
            $.value.forEach((V) => {
              V.is_use && (p = !0);
            }), p ? _() : _(a("daySignAwardPlaceholder"));
          }
        }
      ],
      sign_period: [{
        required: !0,
        trigger: "blur",
        validator: (o, e, _) => {
          e === null || e === "" ? _(a("signPeriodTip")) : isNaN(e) || !Q.number.test(e) ? _(a("signPeriodLimitTips")) : e < 2 || e > 365 ? _(a("signPeriodMustZeroTips")) : _();
        }
      }]
    }), y = O({
      gifts: []
    }), U = m([]), t = O({
      is_use: 0,
      sign_period: 30,
      day_award: "",
      continue_award: [],
      rule_explain: ""
    }), k = O({
      receive_num: "",
      continue_sign: "",
      receive_limit: "",
      continue_award: []
    }), w = O({
      loading: !1,
      data: []
    });
    (async () => {
      const o = await (await me()).data;
      Object.keys(t).forEach((e) => {
        o[e] != null && (t[e] = o[e]);
      }), t.day_award && (y.gifts = t.day_award, M()), t.continue_award && t.continue_award.forEach((e, _) => {
        w.data.push(g(e)), y.gifts = [];
        const p = g(e);
        delete p.continue_sign, delete p.continue_tag, delete p.receive_limit, delete p.receive_num, y.gifts = p, F(y, e, _);
      }), E.value = !1;
    })();
    const $ = m([]), M = async () => {
      const o = await (await H(y)).data;
      $.value = [], Object.values(o).forEach((e) => {
        $.value.push(e);
      });
    }, F = async (o, e, _ = 0, p = 0) => {
      const V = await (await H(o)).data;
      U.value = [], Object.values(V).forEach((A) => {
        U.value.push(A);
      }), k.receive_num = e.receive_num, k.continue_sign = e.continue_sign, k.receive_limit = e.receive_limit, k.continue_award = U.value, N ? w.data.splice(R, 1, g(k)) : p == 0 ? w.data.splice(_, 1, g(k)) : w.data.push(g(k)), N = !1, R = 0;
    }, X = async (o) => {
      E.value || !o || await o.validate((e) => {
        if (e) {
          const _ = g(t);
          ve(_).then(() => {
            E.value = !1;
          }).catch(() => {
            E.value = !1;
          });
        }
      });
    }, I = () => {
      T.value = !0;
    }, L = m(null), Y = async () => {
      var o;
      await ((o = L.value) == null ? void 0 : o.verify()) && (T.value = !1, !t.day_award.hasOwnProperty("balance") && !t.day_award.hasOwnProperty("point") && t.day_award.shop_coupon.is_use == 0 && (t.day_award = ""), t.day_award.hasOwnProperty("balance") && t.day_award.balance.is_use == 1 && (t.day_award.balance.money = Number(t.day_award.balance.money)), y.gifts = t.day_award, M());
    }, ee = () => {
      t.day_award = "", $.value = [];
    }, te = () => {
      c.value = "", C.value = !0;
    }, ae = (o, e) => {
      N = o, R = e, c.value = t.continue_award[e], C.value = !0;
    }, j = m(null), ne = async () => {
      var o;
      if (await ((o = j.value) == null ? void 0 : o.verify()) && (C.value = !1, !c.value.hasOwnProperty("balance") && !c.value.hasOwnProperty("point") && c.value.shop_coupon.is_use == 0 && (c.value = ""), c.value.hasOwnProperty("balance") && c.value.balance.is_use == 1 && (c.value.balance.money = Number(c.value.balance.money)), Object.keys(c.value).length > 0)) {
        const e = g(c.value);
        delete e.continue_sign, delete e.continue_tag, delete e.receive_limit, delete e.receive_num, y.gifts = e;
        let _ = 0;
        t.continue_award.length > 0 && (_ = t.continue_award.length - 1), F(y, c.value, 0, 1), N ? t.continue_award.splice(R, 1, g(c.value)) : t.continue_award.push(g(c.value));
      }
    }, ie = (o) => {
      w.data.splice(o, 1), t.continue_award.splice(o, 1);
    }, le = () => {
      t.rule_explain = a("ruleExplainDefault");
    };
    return (o, e) => {
      const _ = v("el-switch"), p = v("el-form-item"), V = v("el-input"), A = v("el-table-column"), b = v("el-button"), oe = v("el-table"), se = v("el-card"), re = v("el-form"), q = v("el-dialog"), z = ce("loading");
      return r(), f("div", xe, [
        G((r(), x(re, {
          class: "page-form",
          model: t,
          "label-width": "150px",
          ref_key: "ruleFormRef",
          ref: B,
          rules: W
        }, {
          default: l(() => [
            d(se, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: l(() => [
                u("h3", he, s(n(a)("signRule")), 1),
                d(p, {
                  label: n(a)("isUse")
                }, {
                  default: l(() => [
                    d(_, {
                      modelValue: t.is_use,
                      "onUpdate:modelValue": e[0] || (e[0] = (i) => t.is_use = i)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t.is_use ? (r(), x(p, {
                  key: 0,
                  label: n(a)("signPeriod"),
                  prop: "sign_period"
                }, {
                  default: l(() => [
                    d(V, {
                      modelValue: t.sign_period,
                      "onUpdate:modelValue": e[1] || (e[1] = (i) => t.sign_period = i),
                      modelModifiers: { trim: !0 },
                      onKeyup: e[2] || (e[2] = (i) => n(fe)(i)),
                      maxlength: "3",
                      clearable: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    Se
                  ]),
                  _: 1
                }, 8, ["label"])) : h("", !0),
                t.is_use ? (r(), x(p, {
                  key: 1,
                  label: n(a)("daySignAward"),
                  prop: "day_award"
                }, {
                  default: l(() => [
                    (r(!0), f(K, null, Z($.value, (i, D) => (r(), f("div", { key: D }, [
                      i.is_use == "1" ? (r(), f("span", ke, s(i.content) + "  ", 1)) : h("", !0)
                    ]))), 128)),
                    t.day_award == "" ? (r(), f("span", {
                      key: 0,
                      class: "cursor-pointer tutorial-btn ml-[5px]",
                      onClick: I
                    }, s(n(a)("set")), 1)) : (r(), f("div", Ce, [
                      u("span", {
                        class: "cursor-pointer tutorial-btn",
                        onClick: I
                      }, s(n(a)("modify")), 1),
                      Ve,
                      u("span", {
                        class: "cursor-pointer tutorial-btn",
                        onClick: ee
                      }, s(n(a)("delete")), 1)
                    ])),
                    u("div", Ae, s(n(a)("daySignAwardTip")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])) : h("", !0),
                t.is_use ? (r(), x(p, {
                  key: 2,
                  label: n(a)("continueSignAward"),
                  prop: "continue_award"
                }, {
                  default: l(() => [
                    u("div", null, [
                      u("div", De, s(n(a)("continueSignAwardTipTop")), 1),
                      u("div", Ee, [
                        G((r(), x(oe, {
                          data: w.data,
                          size: "large"
                        }, {
                          empty: l(() => [
                            u("span", null, s(w.loading ? "" : n(a)("emptyData")), 1)
                          ]),
                          default: l(() => [
                            d(A, {
                              prop: "continue_sign",
                              label: n(a)("continueSign"),
                              "min-width": "120"
                            }, null, 8, ["label"]),
                            d(A, {
                              label: n(a)("continueSignAward"),
                              "min-width": "300"
                            }, {
                              default: l(({ row: i }) => [
                                (r(!0), f(K, null, Z(i.continue_award, (D, de) => (r(), f("div", { key: de }, [
                                  D.is_use == "1" ? (r(), f("span", Te, s(D.content), 1)) : h("", !0)
                                ]))), 128))
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            d(A, {
                              label: n(a)("receiveLimit"),
                              "min-width": "120"
                            }, {
                              default: l(({ row: i }) => [
                                i.receive_limit == 1 ? (r(), f("span", $e, s(n(a)("noLimit")), 1)) : (r(), f("span", Oe, s(n(a)("everyOneLimit")) + s(i.receive_num) + s(n(a)("time")), 1))
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            d(A, {
                              label: n(a)("operation"),
                              align: "right",
                              fixed: "right",
                              width: "130"
                            }, {
                              default: l((i) => [
                                d(b, {
                                  type: "primary",
                                  link: "",
                                  onClick: (D) => ae(!0, i.$index)
                                }, {
                                  default: l(() => [
                                    S(s(n(a)("modify")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                d(b, {
                                  type: "primary",
                                  link: "",
                                  onClick: (D) => ie(i.$index)
                                }, {
                                  default: l(() => [
                                    S(s(n(a)("delete")), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }, 8, ["data"])), [
                          [z, w.loading]
                        ])
                      ]),
                      u("div", Pe, [
                        u("span", {
                          class: "cursor-pointer tutorial-btn",
                          onClick: te
                        }, s(n(a)("add")), 1)
                      ]),
                      u("div", Ne, s(n(a)("continueSignAwardTipBottom")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])) : h("", !0),
                t.is_use ? (r(), x(p, {
                  key: 3,
                  label: n(a)("ruleExplain"),
                  prop: "rule_explain"
                }, {
                  default: l(() => [
                    u("div", Re, [
                      d(V, {
                        modelValue: t.rule_explain,
                        "onUpdate:modelValue": e[3] || (e[3] = (i) => t.rule_explain = i),
                        modelModifiers: { trim: !0 },
                        placeholder: n(a)("ruleExplainTip"),
                        type: "textarea",
                        maxlength: "500",
                        "show-word-limit": "",
                        rows: "5",
                        class: "textarea-width",
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      d(b, {
                        class: "ml-[20px]",
                        type: "primary",
                        onClick: e[4] || (e[4] = (i) => le()),
                        plain: ""
                      }, {
                        default: l(() => [
                          S(s(n(a)("useDefaultExplain")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])) : h("", !0)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [z, E.value]
        ]),
        t.is_use ? (r(), x(q, {
          key: 0,
          modelValue: T.value,
          "onUpdate:modelValue": e[8] || (e[8] = (i) => T.value = i),
          title: n(a)("daySignTitle"),
          width: "1000px",
          "destroy-on-close": !0
        }, {
          footer: l(() => [
            u("span", Ue, [
              d(b, {
                onClick: e[6] || (e[6] = (i) => T.value = !1)
              }, {
                default: l(() => [
                  S(s(n(a)("cancel")), 1)
                ]),
                _: 1
              }),
              d(b, {
                type: "primary",
                onClick: e[7] || (e[7] = (i) => Y())
              }, {
                default: l(() => [
                  S(s(n(a)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            d(ye, {
              ref_key: "benefitsRef",
              ref: L,
              modelValue: t.day_award,
              "onUpdate:modelValue": e[5] || (e[5] = (i) => t.day_award = i)
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])) : h("", !0),
        t.is_use ? (r(), x(q, {
          key: 1,
          modelValue: C.value,
          "onUpdate:modelValue": e[12] || (e[12] = (i) => C.value = i),
          title: n(a)("continueSignTitle"),
          width: "1200px",
          "destroy-on-close": !0
        }, {
          footer: l(() => [
            u("span", Be, [
              d(b, {
                onClick: e[10] || (e[10] = (i) => C.value = !1)
              }, {
                default: l(() => [
                  S(s(n(a)("cancel")), 1)
                ]),
                _: 1
              }),
              d(b, {
                type: "primary",
                onClick: e[11] || (e[11] = (i) => ne())
              }, {
                default: l(() => [
                  S(s(n(a)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            d(we, {
              ref_key: "continueRef",
              ref: j,
              modelValue: c.value,
              "onUpdate:modelValue": e[9] || (e[9] = (i) => c.value = i),
              sign_period: t.sign_period
            }, null, 8, ["modelValue", "sign_period"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])) : h("", !0),
        u("div", Me, [
          u("div", Fe, [
            d(b, {
              type: "primary",
              onClick: e[13] || (e[13] = (i) => X(B.value))
            }, {
              default: l(() => [
                S(s(n(a)("save")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const at = /* @__PURE__ */ ge(Ie, [["__scopeId", "data-v-1e045545"]]);
export {
  at as default
};
