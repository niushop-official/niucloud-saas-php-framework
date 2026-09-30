import { defineComponent as x, computed as V, ref as b, resolveComponent as i, openBlock as y, createBlock as w, withCtx as n, renderSlot as S, createVNode as p, unref as u, isRef as k, createElementVNode as C, createTextVNode as s, toDisplayString as c } from "vue";
import { t as f } from "./core-shared-c6ad4e77.js";
import { ElMessage as N } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const B = { class: "text-right mt-[15px]" }, j = /* @__PURE__ */ x({
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
  setup(v, { emit: m }) {
    const t = v, l = V({
      get() {
        return t.modelValue;
      },
      set(a) {
        m("update:modelValue", a);
      }
    }), o = b(!1), g = () => {
      if (!/[\S]+/.test(l.value)) {
        N.error(t.placeholder || "不能为空");
        return;
      }
      m("confirm", l.value), o.value = !1;
    };
    return (a, e) => {
      const _ = i("el-input"), d = i("el-button"), h = i("el-popover");
      return y(), w(h, {
        placement: "top",
        trigger: "click",
        width: t.width,
        visible: o.value,
        "onUpdate:visible": e[2] || (e[2] = (r) => o.value = r)
      }, {
        reference: n(() => [
          S(a.$slots, "default")
        ]),
        default: n(() => [
          p(_, {
            modelValue: u(l),
            "onUpdate:modelValue": e[0] || (e[0] = (r) => k(l) ? l.value = r : null),
            placeholder: t.placeholder,
            clearable: "",
            class: "mr-[10px]",
            maxlength: t.maxlength,
            "show-word-limit": !0
          }, null, 8, ["modelValue", "placeholder", "maxlength"]),
          C("div", B, [
            p(d, {
              onClick: e[1] || (e[1] = (r) => o.value = !1)
            }, {
              default: n(() => [
                s(c(u(f)("cancel")), 1)
              ]),
              _: 1
            }),
            p(d, {
              type: "primary",
              onClick: g
            }, {
              default: n(() => [
                s(c(u(f)("confirm")), 1)
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
  j as default
};
