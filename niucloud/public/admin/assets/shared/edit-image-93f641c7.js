import { defineComponent as c, watch as u, resolveComponent as l, openBlock as f, createElementBlock as g, createElementVNode as v, createVNode as a, withCtx as i, unref as m, renderSlot as C } from "vue";
import { t as r, i as h } from "./core-shared-e1759ce4.js";
import { u as w } from "./poster-c3597310.js";
const b = { class: "content-wrap" }, V = { class: "edit-attr-item-wrap" }, x = /* @__PURE__ */ c({
  __name: "edit-image",
  setup(S, { expose: s }) {
    const e = w();
    return e.editComponent.verify = (n) => {
      const o = { code: !0, message: "" };
      return e.value[n].value == "" && (o.code = !1, o.message = r("imageUrlTip")), o;
    }, u(
      () => e.editComponent.value,
      (n, o) => {
        const t = new Image();
        t.src = h(e.editComponent.value), t.onload = async () => {
          e.editComponent.imgWidth = t.width, e.editComponent.imgHeight = t.height;
        };
      }
    ), s({}), (n, o) => {
      const t = l("upload-image"), d = l("el-form-item"), p = l("el-form");
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
                  a(t, {
                    modelValue: m(e).editComponent.value,
                    "onUpdate:modelValue": o[0] || (o[0] = (_) => m(e).editComponent.value = _),
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
