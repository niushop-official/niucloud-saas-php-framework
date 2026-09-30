import { defineComponent as w, ref as d, reactive as g, computed as j, watch as c, resolveComponent as u, openBlock as C, createBlock as N, withCtx as r, createVNode as n, createElementVNode as s, withDirectives as O, createTextVNode as R, vShow as k } from "vue";
import { aH as p } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "flex items-center" }, D = /* @__PURE__ */ s("span", { class: "ml-[10px] el-form-item__label" }, "消费折扣", -1), F = { class: "w-[120px]" }, T = /* @__PURE__ */ s("div", { class: "text-sm text-gray-400 mb-[5px]" }, "会员购买产品默认折扣，需要商品设置参与会员折扣有效", -1), I = /* @__PURE__ */ w({
  __name: "benefits-discount",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(f, { expose: _, emit: v }) {
    const x = f, e = d({
      is_use: 0,
      discount: ""
    }), m = d(null), V = g({
      discount: [
        {
          validator: (l, t, o) => {
            e.value.is_use && (p.empty(e.value.discount) && o("请输入折扣"), p.decimal(e.value.discount, 1) || o("折扣格式错误"), (parseFloat(e.value.discount) < 0 || parseFloat(e.value.discount) > 9.9) && o("折扣只能输入0~9.9之间的值"), e.value.discount < 0 && o("折扣不能小于0")), o();
          }
        }
      ]
    }), a = j({
      get() {
        return x.modelValue;
      },
      set(l) {
        v("update:modelValue", l);
      }
    });
    return c(() => a.value, (l, t) => {
      (!t || !Object.keys(t).length) && Object.keys(l).length && (e.value = a.value);
    }, { immediate: !0 }), c(() => e.value, () => {
      a.value = e.value;
    }, { deep: !0 }), _({
      verify: async () => {
        var t;
        let l = !0;
        return await ((t = m.value) == null ? void 0 : t.validate((o) => {
          l = o;
        })), l;
      }
    }), (l, t) => {
      const o = u("el-checkbox"), y = u("el-input"), b = u("el-form-item"), h = u("el-form");
      return C(), N(h, {
        ref_key: "formRef",
        ref: m,
        model: e.value,
        rules: V
      }, {
        default: r(() => [
          n(b, {
            label: "",
            prop: "discount",
            class: "!mb-[10px]"
          }, {
            default: r(() => [
              s("div", null, [
                s("div", B, [
                  n(o, {
                    modelValue: e.value.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (i) => e.value.is_use = i),
                    "true-label": 1,
                    "false-label": 0,
                    label: "",
                    size: "large"
                  }, null, 8, ["modelValue"]),
                  D,
                  O(s("div", F, [
                    n(y, {
                      modelValue: e.value.discount,
                      "onUpdate:modelValue": t[1] || (t[1] = (i) => e.value.discount = i),
                      modelModifiers: { trim: !0 },
                      clearable: ""
                    }, {
                      append: r(() => [
                        R("折")
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ], 512), [
                    [k, e.value.is_use]
                  ])
                ]),
                T
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
