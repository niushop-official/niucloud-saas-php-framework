import { defineComponent as V, computed as b, ref as y, resolveComponent as i, openBlock as w, createBlock as S, withCtx as n, renderSlot as k, createVNode as p, createElementVNode as C, createTextVNode as d, toDisplayString as s, unref as c } from "vue";
import { t as f } from "./core-shared-5b3bfa35.js";
import { ElMessage as N } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "text-right mt-[15px]" }, z = /* @__PURE__ */ V({
  __name: "index",
  props: {
    width: {
      type: String,
      default: "350px"
    },
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: !0
    },
    maxlength: {
      type: Number,
      default: 10
    }
  },
  emits: ["confirm"],
  setup(v, { emit: g }) {
    const t = v, l = b({
      get() {
        return t.modelValue;
      },
      set(a) {
        m("update:modelValue", a);
      }
    }), o = y(!1), m = g, _ = () => {
      if (!/[\S]+/.test(l.value)) {
        N.error(t.placeholder || "不能为空");
        return;
      }
      m("confirm", l.value), o.value = !1;
    };
    return (a, e) => {
      const h = i("el-input"), u = i("el-button"), x = i("el-popover");
      return w(), S(x, {
        placement: "top",
        trigger: "click",
        width: t.width,
        visible: o.value,
        "onUpdate:visible": e[2] || (e[2] = (r) => o.value = r)
      }, {
        reference: n(() => [
          k(a.$slots, "default")
        ]),
        default: n(() => [
          p(h, {
            modelValue: l.value,
            "onUpdate:modelValue": e[0] || (e[0] = (r) => l.value = r),
            placeholder: t.placeholder,
            clearable: "",
            class: "mr-[10px]",
            maxlength: t.maxlength,
            "show-word-limit": !0
          }, null, 8, ["modelValue", "placeholder", "maxlength"]),
          C("div", B, [
            p(u, {
              onClick: e[1] || (e[1] = (r) => o.value = !1)
            }, {
              default: n(() => [
                d(s(c(f)("cancel")), 1)
              ]),
              _: 1
            }),
            p(u, {
              type: "primary",
              onClick: _
            }, {
              default: n(() => [
                d(s(c(f)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        _: 3
      }, 8, ["width", "visible"]);
    };
  }
});
export {
  z as default
};
