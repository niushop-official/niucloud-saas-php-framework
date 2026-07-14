import { defineComponent as g, ref as d, reactive as j, computed as C, watch as c, resolveComponent as u, openBlock as N, createBlock as O, withCtx as n, createVNode as r, createElementVNode as s, withDirectives as R, createTextVNode as k, vShow as z } from "vue";
import { az as p } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "flex items-center" }, D = /* @__PURE__ */ s("span", { class: "ml-[10px] el-form-item__label" }, "消费折扣", -1), F = { class: "w-[120px]" }, T = /* @__PURE__ */ s("div", { class: "text-sm text-gray-400 mb-[5px]" }, "会员购买产品默认折扣，需要商品设置参与会员折扣有效", -1), J = /* @__PURE__ */ g({
  __name: "benefits-discount",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(f, { expose: _, emit: v }) {
    const x = f, V = v, e = d({
      is_use: 0,
      discount: ""
    }), m = d(null), y = j({
      discount: [
        {
          validator: (l, t, o) => {
            e.value.is_use && (p.empty(e.value.discount) && o("请输入折扣"), p.decimal(e.value.discount, 1) || o("折扣格式错误"), (parseFloat(e.value.discount) < 0 || parseFloat(e.value.discount) > 9.9) && o("折扣只能输入0~9.9之间的值"), e.value.discount < 0 && o("折扣不能小于0")), o();
          }
        }
      ]
    }), a = C({
      get() {
        return x.modelValue;
      },
      set(l) {
        V("update:modelValue", l);
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
      const o = u("el-checkbox"), b = u("el-input"), h = u("el-form-item"), w = u("el-form");
      return N(), O(w, {
        ref_key: "formRef",
        ref: m,
        model: e.value,
        rules: y
      }, {
        default: n(() => [
          r(h, {
            label: "",
            prop: "discount",
            class: "!mb-[10px]"
          }, {
            default: n(() => [
              s("div", null, [
                s("div", B, [
                  r(o, {
                    modelValue: e.value.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (i) => e.value.is_use = i),
                    "true-label": 1,
                    "false-label": 0,
                    label: "",
                    size: "large"
                  }, null, 8, ["modelValue"]),
                  D,
                  R(s("div", F, [
                    r(b, {
                      modelValue: e.value.discount,
                      "onUpdate:modelValue": t[1] || (t[1] = (i) => e.value.discount = i),
                      modelModifiers: { trim: !0 },
                      clearable: ""
                    }, {
                      append: n(() => [
                        k("折")
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ], 512), [
                    [z, e.value.is_use]
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
  J as default
};
