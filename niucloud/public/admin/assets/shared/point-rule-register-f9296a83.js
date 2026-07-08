import { defineComponent as g, ref as m, reactive as j, computed as C, watch as p, resolveComponent as s, openBlock as O, createBlock as R, withCtx as d, createVNode as a, createElementVNode as i, withDirectives as B, vShow as D } from "vue";
import { az as _ } from "./core-shared-9b1e55e9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const N = /* @__PURE__ */ i("span", { class: "el-form-item__label" }, "会员注册", -1), U = { class: "flex mt-[10px]" }, k = /* @__PURE__ */ i("span", { class: "el-form-item__label" }, "发放", -1), z = { class: "w-[70px]" }, E = /* @__PURE__ */ i("span", { class: "ml-[10px] el-form-item__label" }, "积分", -1), J = /* @__PURE__ */ g({
  __name: "point-rule-register",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(v, { expose: f, emit: c }) {
    const V = v, h = c, e = m({
      is_use: 0,
      point: ""
    }), r = m(null), y = j({
      point: [
        {
          validator: (l, t, o) => {
            e.value.is_use && (_.empty(e.value.point) && o("请输入发放积分数量"), _.digits(e.value.point) || o("积分数量格式错误"), e.value.point <= 0 && o("积分数量不能小于等于0")), o();
          }
        }
      ]
    }), u = C({
      get() {
        return V.modelValue;
      },
      set(l) {
        h("update:modelValue", l);
      }
    });
    return p(() => u.value, (l, t) => {
      (!t || !Object.keys(t).length) && Object.keys(l).length && (e.value = u.value);
    }, { immediate: !0 }), p(() => e.value, () => {
      u.value = e.value;
    }, { deep: !0 }), f({
      verify: async () => {
        var t;
        let l = !0;
        return await ((t = r.value) == null ? void 0 : t.validate((o) => {
          l = o;
        })), l;
      }
    }), (l, t) => {
      const o = s("el-switch"), w = s("el-input"), x = s("el-form-item"), b = s("el-form");
      return O(), R(b, {
        ref_key: "formRef",
        ref: r,
        model: e.value,
        rules: y
      }, {
        default: d(() => [
          a(x, {
            label: "",
            prop: "point"
          }, {
            default: d(() => [
              i("div", null, [
                i("div", null, [
                  N,
                  a(o, {
                    modelValue: e.value.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (n) => e.value.is_use = n),
                    "active-value": 1,
                    "inactive-value": 0
                  }, null, 8, ["modelValue"])
                ]),
                B(i("div", U, [
                  k,
                  i("div", z, [
                    a(w, {
                      modelValue: e.value.point,
                      "onUpdate:modelValue": t[1] || (t[1] = (n) => e.value.point = n),
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
