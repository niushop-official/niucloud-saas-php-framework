import { defineComponent as h, ref as u, reactive as w, computed as N, watch as d, resolveComponent as s, openBlock as j, createBlock as k, withCtx as p, createVNode as i, createElementVNode as r } from "vue";
import { aH as C } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const O = { class: "flex items-center" }, R = /* @__PURE__ */ r("span", { class: "ml-[10px] el-form-item__label" }, "送", -1), $ = { class: "w-[70px]" }, B = /* @__PURE__ */ r("span", { class: "ml-[15px] el-form-item__label" }, "元红包", -1), A = /* @__PURE__ */ h({
  __name: "gift-balance",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(f, { expose: _, emit: c }) {
    const v = f, t = u({
      is_use: 0,
      money: ""
    }), n = u(null), y = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, b = w({
      money: [
        {
          validator: (o, e, l) => {
            t.value.is_use && (C.empty(e) ? l("请输入红包金额") : isNaN(e) || !y.digit.test(e) ? l("红包金额格式错误") : e <= 0 && l("红包金额不能小于等于0")), l();
          },
          trigger: "blur"
        }
      ]
    }), m = N({
      get() {
        return v.modelValue;
      },
      set(o) {
        c("update:modelValue", o);
      }
    });
    return d(() => m.value, (o, e) => {
      (!e || !Object.keys(e).length) && Object.keys(o).length && (t.value = m.value);
    }, { immediate: !0 }), d(() => t.value, () => {
      m.value = t.value;
    }, { deep: !0 }), _({
      verify: async () => {
        var e;
        let o = !0;
        return await ((e = n.value) == null ? void 0 : e.validate((l) => {
          o = l;
        })), o;
      }
    }), (o, e) => {
      const l = s("el-checkbox"), V = s("el-input"), g = s("el-form-item"), x = s("el-form");
      return j(), k(x, {
        ref_key: "formRef",
        ref: n,
        model: t.value,
        rules: b
      }, {
        default: p(() => [
          i(g, {
            label: "",
            prop: "money"
          }, {
            default: p(() => [
              r("div", O, [
                i(l, {
                  modelValue: t.value.is_use,
                  "onUpdate:modelValue": e[0] || (e[0] = (a) => t.value.is_use = a),
                  "true-label": 1,
                  "false-label": 0,
                  label: "",
                  size: "large"
                }, null, 8, ["modelValue"]),
                R,
                r("div", $, [
                  i(V, {
                    modelValue: t.value.money,
                    "onUpdate:modelValue": e[1] || (e[1] = (a) => t.value.money = a),
                    modelModifiers: { trim: !0 },
                    maxlength: 5,
                    clearable: "",
                    disabled: t.value.is_use == 0
                  }, null, 8, ["modelValue", "disabled"])
                ]),
                B
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
  A as default
};
