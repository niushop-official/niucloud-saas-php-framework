import { defineComponent as w, ref as u, reactive as N, computed as j, watch as d, resolveComponent as s, openBlock as k, createBlock as C, withCtx as p, createVNode as i, createElementVNode as r } from "vue";
import { az as O } from "./core-shared-9b1e55e9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const R = { class: "flex items-center" }, $ = /* @__PURE__ */ r("span", { class: "ml-[10px] el-form-item__label" }, "送", -1), z = { class: "w-[70px]" }, B = /* @__PURE__ */ r("span", { class: "ml-[15px] el-form-item__label" }, "元红包", -1), G = /* @__PURE__ */ w({
  __name: "gift-balance",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(f, { expose: _, emit: c }) {
    const v = f, y = c, t = u({
      is_use: 0,
      money: ""
    }), n = u(null), b = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, x = N({
      money: [
        {
          validator: (o, e, l) => {
            t.value.is_use && (O.empty(e) ? l("请输入红包金额") : isNaN(e) || !b.digit.test(e) ? l("红包金额格式错误") : e <= 0 && l("红包金额不能小于等于0")), l();
          },
          trigger: "blur"
        }
      ]
    }), m = j({
      get() {
        return v.modelValue;
      },
      set(o) {
        y("update:modelValue", o);
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
      const l = s("el-checkbox"), V = s("el-input"), g = s("el-form-item"), h = s("el-form");
      return k(), C(h, {
        ref_key: "formRef",
        ref: n,
        model: t.value,
        rules: x
      }, {
        default: p(() => [
          i(g, {
            label: "",
            prop: "money"
          }, {
            default: p(() => [
              r("div", R, [
                i(l, {
                  modelValue: t.value.is_use,
                  "onUpdate:modelValue": e[0] || (e[0] = (a) => t.value.is_use = a),
                  "true-label": 1,
                  "false-label": 0,
                  label: "",
                  size: "large"
                }, null, 8, ["modelValue"]),
                $,
                r("div", z, [
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
  G as default
};
