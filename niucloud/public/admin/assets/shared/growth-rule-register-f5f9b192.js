import { defineComponent as x, ref as n, reactive as b, computed as j, watch as d, resolveComponent as s, openBlock as C, createBlock as O, withCtx as p, createVNode as i, createElementVNode as r, withDirectives as R, vShow as B } from "vue";
import { aH as _ } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const D = /* @__PURE__ */ r("span", { class: "el-form-item__label" }, "会员注册", -1), N = { class: "flex mt-[10px]" }, U = /* @__PURE__ */ r("span", { class: "el-form-item__label" }, "发放", -1), k = { class: "w-[70px]" }, E = /* @__PURE__ */ r("span", { class: "ml-[10px] el-form-item__label" }, "成长值", -1), I = /* @__PURE__ */ x({
  __name: "growth-rule-register",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(v, { expose: f, emit: c }) {
    const h = v, e = n({
      is_use: 0,
      growth: ""
    }), m = n(null), w = b({
      growth: [
        {
          validator: (o, t, l) => {
            e.value.is_use && (_.empty(e.value.growth) && l("请输入发放成长值数量"), _.digits(e.value.growth) || l("成长值数量格式错误"), e.value.growth <= 0 && l("成长值数量不能小于等于0")), l();
          }
        }
      ]
    }), u = j({
      get() {
        return h.modelValue;
      },
      set(o) {
        c("update:modelValue", o);
      }
    });
    return d(() => u.value, (o, t) => {
      (!t || !Object.keys(t).length) && Object.keys(o).length && (e.value = u.value);
    }, { immediate: !0 }), d(() => e.value, () => {
      u.value = e.value;
    }, { deep: !0 }), f({
      verify: async () => {
        var t;
        let o = !0;
        return await ((t = m.value) == null ? void 0 : t.validate((l) => {
          o = l;
        })), o;
      }
    }), (o, t) => {
      const l = s("el-switch"), g = s("el-input"), V = s("el-form-item"), y = s("el-form");
      return C(), O(y, {
        ref_key: "formRef",
        ref: m,
        model: e.value,
        rules: w
      }, {
        default: p(() => [
          i(V, {
            label: "",
            prop: "growth"
          }, {
            default: p(() => [
              r("div", null, [
                r("div", null, [
                  D,
                  i(l, {
                    modelValue: e.value.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.value.is_use = a),
                    "active-value": 1,
                    "inactive-value": 0
                  }, null, 8, ["modelValue"])
                ]),
                R(r("div", N, [
                  U,
                  r("div", k, [
                    i(g, {
                      modelValue: e.value.growth,
                      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.value.growth = a),
                      modelModifiers: { number: !0, trim: !0 },
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  E
                ], 512), [
                  [B, e.value.is_use]
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
  I as default
};
