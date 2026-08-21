import { defineComponent as B, ref as d, computed as F, watch as h, reactive as I, resolveComponent as p, openBlock as c, createBlock as S, withCtx as a, createVNode as u, unref as r, createElementVNode as s, toDisplayString as v, createElementBlock as C, Fragment as M, renderList as P, resolveDynamicComponent as k, createCommentVNode as q, createTextVNode as w, pushScopeId as te, popScopeId as oe } from "vue";
import { cz as $, cA as G, b_ as z, t as i, aA as K, bF as Z, _ as H } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const J = { class: "ml-[10px]" }, Q = { class: "flex-1" }, W = { class: "flex" }, X = { class: "ml-[10px]" }, Y = /* @__PURE__ */ B({
  __name: "sign-continue",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    sign_period: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:modelValue"],
  setup(E, { expose: U, emit: D }) {
    const g = d({}), V = E, L = D, t = d({
      continue_sign: 0,
      continue_tag: $(),
      receive_limit: 1,
      receive_num: 0
    }), f = F({
      get() {
        return V.modelValue;
      },
      set(o) {
        L("update:modelValue", o);
      }
    }), _ = d([]);
    h(() => f.value, (o, e) => {
      (!e || !Object.keys(e).length) && Object.keys(o).length && (t.value = f.value);
    }, { immediate: !0 }), h(() => t.value, () => {
      f.value = t.value;
    }, { deep: !0 }), G().then(({ data: o }) => {
      Object.keys(o).forEach((e) => {
        o[e].component && (o[e].component = z(o[e].component));
      }), g.value = o;
    });
    const y = d(null), b = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, O = I({
      continue_sign: [
        { required: !0, message: i("continueSignPlaceholder"), trigger: "blur" },
        {
          validator: (o, e, l) => {
            isNaN(e) || !b.number.test(e) ? l(i("continueSignFormatError")) : e < 2 || e > 365 ? l(i("continueSignBerweenDays")) : Number(e) > Number(V.sign_period) ? l(i("continueSignMustLessThanSignPeriod")) : l();
          },
          trigger: "blur"
        }
      ],
      receive_num: [
        { required: !0, message: i("receiveNumPlaceholder"), trigger: "blur" },
        {
          validator: (o, e, l) => {
            t.value.receive_limit == 2 && (K.empty(t.value.receive_num) && l(i("receiveNumPlaceholder")), (isNaN(t.value.receive_num) || !b.number.test(t.value.receive_num)) && l(i("receiveNumFormatError")), t.value.receive_num <= 0 && l(i("receiveNumMustGreaterThanZeroTip"))), l();
          }
        }
      ]
    }), R = async () => {
      var e;
      let o = !0;
      if (await ((e = y.value) == null ? void 0 : e.validate((l) => {
        o = l;
      })), !o)
        return o;
      for (let l = 0; l < _.value.length; l++)
        !await _.value[l].verify() && (o = !1);
      return o;
    }, x = (o, e) => {
      t[e] = o;
    };
    return U({
      verify: R
    }), (o, e) => {
      const l = p("el-input"), m = p("el-form-item"), N = p("el-radio"), T = p("el-form");
      return c(), S(T, {
        model: t.value,
        rules: O,
        class: "page-form",
        ref_key: "formRef",
        ref: y
      }, {
        default: a(() => [
          u(m, {
            label: r(i)("continueSign"),
            prop: "continue_sign"
          }, {
            default: a(() => [
              u(l, {
                class: "input-width",
                modelValue: t.value.continue_sign,
                "onUpdate:modelValue": e[0] || (e[0] = (n) => t.value.continue_sign = n),
                modelModifiers: { trim: !0 },
                onKeyup: e[1] || (e[1] = (n) => r(Z)(n)),
                maxlength: 3,
                clearable: ""
              }, null, 8, ["modelValue"]),
              s("span", J, v(r(i)("day")), 1)
            ]),
            _: 1
          }, 8, ["label"]),
          u(m, {
            label: r(i)("continueSignAward")
          }, {
            default: a(() => [
              s("div", Q, [
                (c(!0), C(M, null, P(g.value, (n, j) => (c(), C("div", {
                  key: j,
                  class: "mb-[15px]"
                }, [
                  n.component ? (c(), S(k(n.component), {
                    key: 0,
                    modelValue: t.value[n.key],
                    "onUpdate:modelValue": (A) => t.value[n.key] = A,
                    ref_for: !0,
                    ref_key: "giftRefs",
                    ref: _
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : q("", !0)
                ]))), 128))
              ])
            ]),
            _: 1
          }, 8, ["label"]),
          u(m, {
            label: r(i)("receiveLimit"),
            prop: "receive_num"
          }, {
            default: a(() => [
              s("div", null, [
                u(N, {
                  class: "mb-[15px]",
                  modelValue: t.value.receive_limit,
                  "onUpdate:modelValue": e[2] || (e[2] = (n) => t.value.receive_limit = n),
                  label: 1,
                  onChange: e[3] || (e[3] = (n) => x(n, 1))
                }, {
                  default: a(() => [
                    w(v(r(i)("noLimit")), 1)
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                s("div", W, [
                  u(N, {
                    class: "!mr-[15px]",
                    modelValue: t.value.receive_limit,
                    "onUpdate:modelValue": e[4] || (e[4] = (n) => t.value.receive_limit = n),
                    label: 2,
                    onChange: e[5] || (e[5] = (n) => x(n, 2))
                  }, {
                    default: a(() => [
                      w(v(r(i)("everyOneLimit")), 1)
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  u(l, {
                    class: "input-width",
                    modelValue: t.value.receive_num,
                    "onUpdate:modelValue": e[6] || (e[6] = (n) => t.value.receive_num = n),
                    modelModifiers: { trim: !0 },
                    maxlength: 5,
                    clearable: ""
                  }, null, 8, ["modelValue"]),
                  s("span", X, v(r(i)("time")), 1)
                ])
              ])
            ]),
            _: 1
          }, 8, ["label"])
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const me = /* @__PURE__ */ H(Y, [["__scopeId", "data-v-7665fd87"]]);
export {
  me as default
};
