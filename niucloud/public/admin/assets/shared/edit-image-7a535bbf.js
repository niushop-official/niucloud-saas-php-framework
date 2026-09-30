import { defineComponent as c, watch as u, resolveComponent as l, openBlock as f, createElementBlock as g, createElementVNode as v, createVNode as a, withCtx as i, unref as m, renderSlot as C } from "vue";
import { t as r, j as h } from "./core-shared-c6ad4e77.js";
import { u as w } from "./poster-22fc17db.js";
const b = { class: "content-wrap" }, V = { class: "edit-attr-item-wrap" }, x = /* @__PURE__ */ c({
  __name: "edit-image",
  setup(S, { expose: s }) {
    const e = w();
    return e.editComponent.verify = (n) => {
      const t = { code: !0, message: "" };
      return e.value[n].value == "" && (t.code = !1, t.message = r("imageUrlTip")), t;
    }, u(
      () => e.editComponent.value,
      (n, t) => {
        const o = new Image();
        o.src = h(e.editComponent.value), o.onload = async () => {
          e.editComponent.imgWidth = o.width, e.editComponent.imgHeight = o.height;
        };
      }
    ), s({}), (n, t) => {
      const o = l("upload-image"), d = l("el-form-item"), p = l("el-form");
      return f(), g("div", b, [
        v("div", V, [
          a(p, {
            "label-width": "80px",
            class: "px-[10px]"
          }, {
            default: i(() => [
              a(d, {
                label: m(r)("image")
              }, {
                default: i(() => [
                  a(o, {
                    modelValue: m(e).editComponent.value,
                    "onUpdate:modelValue": t[0] || (t[0] = (_) => m(e).editComponent.value = _),
                    limit: 1
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          })
        ]),
        C(n.$slots, "common")
      ]);
    };
  }
}), B = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x
}, Symbol.toStringTag, { value: "Module" }));
export {
  B as _
};
