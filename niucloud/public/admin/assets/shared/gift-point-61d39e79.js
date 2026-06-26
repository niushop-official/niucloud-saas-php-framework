import { defineComponent as w, ref as i, reactive as N, computed as j, watch as d, resolveComponent as s, openBlock as k, createBlock as C, withCtx as p, createVNode as r, createElementVNode as a } from "vue";
const O = /* @__PURE__ */ a("span", { class: "ml-[10px] el-form-item__label" }, "送", -1), R = { class: "w-[70px]" }, $ = /* @__PURE__ */ a("span", { class: "ml-[15px] el-form-item__label" }, "积分", -1), U = /* @__PURE__ */ w({
  __name: "gift-point",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(f, { expose: _, emit: c }) {
    const v = f, b = c, l = i({
      is_use: 0,
      num: ""
    }), m = i(null), V = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    }, g = N({
      num: [
        {
          validator: (o, e, t) => {
            l.value.is_use ? e.length == 0 ? t("请输入积分数量") : isNaN(e) || !V.number.test(e) ? t("积分数量格式错误") : e <= 0 ? t("积分数量不能小于等于0") : t() : t();
          },
          trigger: "blur"
        }
      ]
    }), u = j({
      get() {
        return v.modelValue;
      },
      set(o) {
        b("update:modelValue", o);
      }
    });
    return d(() => u.value, (o, e) => {
      (!e || !Object.keys(e).length) && Object.keys(o).length && (l.value = u.value);
    }, { immediate: !0 }), d(() => l.value, () => {
      u.value = l.value;
    }, { deep: !0 }), _({
      verify: async () => {
        var e;
        let o = !0;
        return await ((e = m.value) == null ? void 0 : e.validate((t) => {
          o = t;
        })), o;
      }
    }), (o, e) => {
      const t = s("el-checkbox"), x = s("el-input"), y = s("el-form-item"), h = s("el-form");
      return k(), C(h, {
        ref_key: "formRef",
        ref: m,
        model: l.value,
        rules: g
      }, {
        default: p(() => [
          r(y, {
            label: "",
            prop: "num"
          }, {
            default: p(() => [
              r(t, {
                modelValue: l.value.is_use,
                "onUpdate:modelValue": e[0] || (e[0] = (n) => l.value.is_use = n),
                "true-label": 1,
                "false-label": 0,
                label: "",
                size: "large"
              }, null, 8, ["modelValue"]),
              O,
              a("div", R, [
                r(x, {
                  modelValue: l.value.num,
                  "onUpdate:modelValue": e[1] || (e[1] = (n) => l.value.num = n),
                  modelModifiers: { trim: !0 },
                  clearable: "",
                  disabled: l.value.is_use == 0
                }, null, 8, ["modelValue", "disabled"])
              ]),
              $
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
  U as default
};
