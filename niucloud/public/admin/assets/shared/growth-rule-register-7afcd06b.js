import { defineComponent as b, ref as n, reactive as j, computed as C, watch as d, resolveComponent as s, openBlock as O, createBlock as R, withCtx as p, createVNode as i, createElementVNode as r, withDirectives as B, vShow as D } from "vue";
import { az as _ } from "./core-shared-ae4a556b.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const N = /* @__PURE__ */ r("span", { class: "el-form-item__label" }, "会员注册", -1), U = { class: "flex mt-[10px]" }, k = /* @__PURE__ */ r("span", { class: "el-form-item__label" }, "发放", -1), z = { class: "w-[70px]" }, E = /* @__PURE__ */ r("span", { class: "ml-[10px] el-form-item__label" }, "成长值", -1), J = /* @__PURE__ */ b({
  __name: "growth-rule-register",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(v, { expose: f, emit: c }) {
    const h = v, w = c, e = n({
      is_use: 0,
      growth: ""
    }), m = n(null), g = j({
      growth: [
        {
          validator: (l, t, o) => {
            e.value.is_use && (_.empty(e.value.growth) && o("请输入发放成长值数量"), _.digits(e.value.growth) || o("成长值数量格式错误"), e.value.growth <= 0 && o("成长值数量不能小于等于0")), o();
          }
        }
      ]
    }), u = C({
      get() {
        return h.modelValue;
      },
      set(l) {
        w("update:modelValue", l);
      }
    });
    return d(() => u.value, (l, t) => {
      (!t || !Object.keys(t).length) && Object.keys(l).length && (e.value = u.value);
    }, { immediate: !0 }), d(() => e.value, () => {
      u.value = e.value;
    }, { deep: !0 }), f({
      verify: async () => {
        var t;
        let l = !0;
        return await ((t = m.value) == null ? void 0 : t.validate((o) => {
          l = o;
        })), l;
      }
    }), (l, t) => {
      const o = s("el-switch"), V = s("el-input"), y = s("el-form-item"), x = s("el-form");
      return O(), R(x, {
        ref_key: "formRef",
        ref: m,
        model: e.value,
        rules: g
      }, {
        default: p(() => [
          i(y, {
            label: "",
            prop: "growth"
          }, {
            default: p(() => [
              r("div", null, [
                r("div", null, [
                  N,
                  i(o, {
                    modelValue: e.value.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.value.is_use = a),
                    "active-value": 1,
                    "inactive-value": 0
                  }, null, 8, ["modelValue"])
                ]),
                B(r("div", U, [
                  k,
                  r("div", z, [
                    i(V, {
                      modelValue: e.value.growth,
                      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.value.growth = a),
                      modelModifiers: { number: !0, trim: !0 },
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  E
                ], 512), [
                  [D, e.value.is_use]
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
export {
  J as default
};
