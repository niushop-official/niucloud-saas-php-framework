import { defineComponent as b, ref as m, reactive as g, computed as j, watch as p, resolveComponent as s, openBlock as C, createBlock as O, withCtx as d, createVNode as a, createElementVNode as i, withDirectives as R, vShow as B } from "vue";
import { aH as _ } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const D = /* @__PURE__ */ i("span", { class: "el-form-item__label" }, "会员注册", -1), N = { class: "flex mt-[10px]" }, U = /* @__PURE__ */ i("span", { class: "el-form-item__label" }, "发放", -1), k = { class: "w-[70px]" }, E = /* @__PURE__ */ i("span", { class: "ml-[10px] el-form-item__label" }, "积分", -1), I = /* @__PURE__ */ b({
  __name: "point-rule-register",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(v, { expose: f, emit: c }) {
    const V = v, e = m({
      is_use: 0,
      point: ""
    }), r = m(null), h = g({
      point: [
        {
          validator: (o, t, l) => {
            e.value.is_use && (_.empty(e.value.point) && l("请输入发放积分数量"), _.digits(e.value.point) || l("积分数量格式错误"), e.value.point <= 0 && l("积分数量不能小于等于0")), l();
          }
        }
      ]
    }), u = j({
      get() {
        return V.modelValue;
      },
      set(o) {
        c("update:modelValue", o);
      }
    });
    return p(() => u.value, (o, t) => {
      (!t || !Object.keys(t).length) && Object.keys(o).length && (e.value = u.value);
    }, { immediate: !0 }), p(() => e.value, () => {
      u.value = e.value;
    }, { deep: !0 }), f({
      verify: async () => {
        var t;
        let o = !0;
        return await ((t = r.value) == null ? void 0 : t.validate((l) => {
          o = l;
        })), o;
      }
    }), (o, t) => {
      const l = s("el-switch"), y = s("el-input"), w = s("el-form-item"), x = s("el-form");
      return C(), O(x, {
        ref_key: "formRef",
        ref: r,
        model: e.value,
        rules: h
      }, {
        default: d(() => [
          a(w, {
            label: "",
            prop: "point"
          }, {
            default: d(() => [
              i("div", null, [
                i("div", null, [
                  D,
                  a(l, {
                    modelValue: e.value.is_use,
                    "onUpdate:modelValue": t[0] || (t[0] = (n) => e.value.is_use = n),
                    "active-value": 1,
                    "inactive-value": 0
                  }, null, 8, ["modelValue"])
                ]),
                R(i("div", N, [
                  U,
                  i("div", k, [
                    a(y, {
                      modelValue: e.value.point,
                      "onUpdate:modelValue": t[1] || (t[1] = (n) => e.value.point = n),
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
