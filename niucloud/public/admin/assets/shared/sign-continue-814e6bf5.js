import { defineComponent as j, ref as d, computed as B, watch as h, reactive as I, resolveComponent as p, openBlock as c, createBlock as S, withCtx as a, createVNode as u, unref as r, createElementVNode as s, toDisplayString as v, createElementBlock as C, Fragment as P, renderList as k, resolveDynamicComponent as q, createCommentVNode as F, createTextVNode as w, pushScopeId as ee, popScopeId as te } from "vue";
import { cM as $, cN as A, c5 as G, t as i, aH as H, bM as K, a as Z } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const z = { class: "ml-[10px]" }, J = { class: "flex-1" }, Q = { class: "flex" }, W = { class: "ml-[10px]" }, X = /* @__PURE__ */ j({
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
  setup(E, { expose: M, emit: U }) {
    const g = E, V = d({}), t = d({
      continue_sign: 0,
      continue_tag: $(),
      receive_limit: 1,
      receive_num: 0
    }), f = B({
      get() {
        return g.modelValue;
      },
      set(o) {
        U("update:modelValue", o);
      }
    }), _ = d([]);
    h(() => f.value, (o, e) => {
      (!e || !Object.keys(e).length) && Object.keys(o).length && (t.value = f.value);
    }, { immediate: !0 }), h(() => t.value, () => {
      f.value = t.value;
    }, { deep: !0 }), A().then(({ data: o }) => {
      Object.keys(o).forEach((e) => {
        o[e].component && (o[e].component = G(o[e].component));
      }), V.value = o;
    });
    const y = d(null), b = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, D = I({
      continue_sign: [
        { required: !0, message: i("continueSignPlaceholder"), trigger: "blur" },
        {
          validator: (o, e, l) => {
            isNaN(e) || !b.number.test(e) ? l(i("continueSignFormatError")) : e < 2 || e > 365 ? l(i("continueSignBerweenDays")) : Number(e) > Number(g.sign_period) ? l(i("continueSignMustLessThanSignPeriod")) : l();
          },
          trigger: "blur"
        }
      ],
      receive_num: [
        { required: !0, message: i("receiveNumPlaceholder"), trigger: "blur" },
        {
          validator: (o, e, l) => {
            t.value.receive_limit == 2 && (H.empty(t.value.receive_num) && l(i("receiveNumPlaceholder")), (isNaN(t.value.receive_num) || !b.number.test(t.value.receive_num)) && l(i("receiveNumFormatError")), t.value.receive_num <= 0 && l(i("receiveNumMustGreaterThanZeroTip"))), l();
          }
        }
      ]
    }), L = async () => {
      var e;
      let o = !0;
      if (await ((e = y.value) == null ? void 0 : e.validate((l) => {
        o = l;
      })), !o)
        return o;
      for (let l = 0; l < _.value.length; l++)
        !await _.value[l].verify() && (o = !1);
      return o;
    }, N = (o, e) => {
      t[e] = o;
    };
    return M({
      verify: L
    }), (o, e) => {
      const l = p("el-input"), m = p("el-form-item"), x = p("el-radio"), O = p("el-form");
      return c(), S(O, {
        model: t.value,
        rules: D,
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
                onKeyup: e[1] || (e[1] = (n) => r(K)(n)),
                maxlength: 3,
                clearable: ""
              }, null, 8, ["modelValue"]),
              s("span", z, v(r(i)("day")), 1)
            ]),
            _: 1
          }, 8, ["label"]),
          u(m, {
            label: r(i)("continueSignAward")
          }, {
            default: a(() => [
              s("div", J, [
                (c(!0), C(P, null, k(V.value, (n, R) => (c(), C("div", {
                  key: R,
                  class: "mb-[15px]"
                }, [
                  n.component ? (c(), S(q(n.component), {
                    key: 0,
                    modelValue: t.value[n.key],
                    "onUpdate:modelValue": (T) => t.value[n.key] = T,
                    ref_for: !0,
                    ref_key: "giftRefs",
                    ref: _
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : F("", !0)
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
                u(x, {
                  class: "mb-[15px]",
                  modelValue: t.value.receive_limit,
                  "onUpdate:modelValue": e[2] || (e[2] = (n) => t.value.receive_limit = n),
                  label: 1,
                  onChange: e[3] || (e[3] = (n) => N(n, 1))
                }, {
                  default: a(() => [
                    w(v(r(i)("noLimit")), 1)
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                s("div", Q, [
                  u(x, {
                    class: "!mr-[15px]",
                    modelValue: t.value.receive_limit,
                    "onUpdate:modelValue": e[4] || (e[4] = (n) => t.value.receive_limit = n),
                    label: 2,
                    onChange: e[5] || (e[5] = (n) => N(n, 2))
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
                  s("span", W, v(r(i)("time")), 1)
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
const se = /* @__PURE__ */ Z(X, [["__scopeId", "data-v-7665fd87"]]);
export {
  se as default
};
