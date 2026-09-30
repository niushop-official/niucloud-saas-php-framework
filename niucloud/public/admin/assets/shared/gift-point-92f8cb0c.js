import { defineComponent as h, ref as i, reactive as w, computed as N, watch as d, resolveComponent as u, openBlock as j, createBlock as k, withCtx as f, createVNode as r, createElementVNode as a } from "vue";
const C = /* @__PURE__ */ a("span", { class: "ml-[10px] el-form-item__label" }, "送", -1), O = { class: "w-[70px]" }, R = /* @__PURE__ */ a("span", { class: "ml-[15px] el-form-item__label" }, "积分", -1), E = /* @__PURE__ */ h({
  __name: "gift-point",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: _, emit: c }) {
    const v = p, l = i({
      is_use: 0,
      num: ""
    }), m = i(null), b = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, V = w({
      num: [
        {
          validator: (o, e, t) => {
            l.value.is_use ? e.length == 0 ? t("请输入积分数量") : isNaN(e) || !b.number.test(e) ? t("积分数量格式错误") : e <= 0 ? t("积分数量不能小于等于0") : t() : t();
          },
          trigger: "blur"
        }
      ]
    }), s = N({
      get() {
        return v.modelValue;
      },
      set(o) {
        c("update:modelValue", o);
      }
    });
    return d(() => s.value, (o, e) => {
      (!e || !Object.keys(e).length) && Object.keys(o).length && (l.value = s.value);
    }, { immediate: !0 }), d(() => l.value, () => {
      s.value = l.value;
    }, { deep: !0 }), _({
      verify: async () => {
        var e;
        let o = !0;
        return await ((e = m.value) == null ? void 0 : e.validate((t) => {
          o = t;
        })), o;
      }
    }), (o, e) => {
      const t = u("el-checkbox"), g = u("el-input"), x = u("el-form-item"), y = u("el-form");
      return j(), k(y, {
        ref_key: "formRef",
        ref: m,
        model: l.value,
        rules: V
      }, {
        default: f(() => [
          r(x, {
            label: "",
            prop: "num"
          }, {
            default: f(() => [
              r(t, {
                modelValue: l.value.is_use,
                "onUpdate:modelValue": e[0] || (e[0] = (n) => l.value.is_use = n),
                "true-label": 1,
                "false-label": 0,
                label: "",
                size: "large"
              }, null, 8, ["modelValue"]),
              C,
              a("div", O, [
                r(g, {
                  modelValue: l.value.num,
                  "onUpdate:modelValue": e[1] || (e[1] = (n) => l.value.num = n),
                  modelModifiers: { trim: !0 },
                  clearable: "",
                  disabled: l.value.is_use == 0
                }, null, 8, ["modelValue", "disabled"])
              ]),
              R
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
  E as default
};
