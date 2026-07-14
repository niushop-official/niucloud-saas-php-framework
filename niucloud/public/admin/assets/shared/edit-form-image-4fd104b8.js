import { defineComponent as y, resolveComponent as m, openBlock as C, createElementBlock as T, Fragment as w, withDirectives as p, createElementVNode as c, renderSlot as a, createVNode as r, withModifiers as S, withCtx as n, unref as l, vShow as _ } from "vue";
import { t as i } from "./core-shared-11c0a673.js";
import { u as V } from "./diy-4662fd66.js";
const k = { class: "content-wrap" }, E = { class: "style-wrap" }, L = /* @__PURE__ */ y({
  __name: "edit-form-image",
  setup($, { expose: f }) {
    const t = V();
    t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (o) => {
      const e = { code: !0, message: "" };
      return t.value[o].limit == "" ? (e.code = !1, e.message = i("imageLimitPlaceholder"), e) : isNaN(t.value[o].limit) || !g.number.test(t.value[o].limit) ? (e.code = !1, e.message = i("imageLimitErrorTips"), e) : t.value[o].limit < 0 ? (e.code = !1, e.message = i("imageLimitErrorTipsTwo"), e) : t.value[o].limit == 0 ? (e.code = !1, e.message = i("imageLimitErrorTipsThree"), e) : (t.value[o].limit > 9 && (e.code = !1, e.message = i("imageLimitErrorTipsFour")), e);
    };
    const g = {
      required: /[\S]+/,
      number: /^\d{0,10}$/,
      digit: /^\d{0,10}(.?\d{0,2})$/,
      special: /^\d{0,10}(.?\d{0,3})$/
    };
    return f({}), (o, e) => {
      const b = m("el-input"), d = m("el-form-item"), u = m("el-checkbox"), v = m("el-checkbox-group"), h = m("el-form");
      return C(), T(w, null, [
        p(c("div", k, [
          a(o.$slots, "field"),
          r(h, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: e[2] || (e[2] = S(() => {
            }, ["prevent"]))
          }, {
            default: n(() => [
              r(d, {
                label: l(i)("imageLimit")
              }, {
                default: n(() => [
                  r(b, {
                    modelValue: l(t).editComponent.limit,
                    "onUpdate:modelValue": e[0] || (e[0] = (s) => l(t).editComponent.limit = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(i)("imageLimitPlaceholder"),
                    clearable: "",
                    maxlength: "2"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(d, {
                label: l(i)("上传方式")
              }, {
                default: n(() => [
                  r(v, {
                    modelValue: l(t).editComponent.uploadMode,
                    "onUpdate:modelValue": e[1] || (e[1] = (s) => l(t).editComponent.uploadMode = s),
                    min: 1
                  }, {
                    default: n(() => [
                      r(u, {
                        label: "拍照上传",
                        value: "take_pictures"
                      }),
                      r(u, {
                        label: "从相册选择",
                        value: "select_from_album"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          a(o.$slots, "other")
        ], 512), [
          [_, l(t).editTab == "content"]
        ]),
        p(c("div", E, [
          a(o.$slots, "style-field"),
          a(o.$slots, "style")
        ], 512), [
          [_, l(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), B = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: L
}, Symbol.toStringTag, { value: "Module" }));
export {
  B as _
};
