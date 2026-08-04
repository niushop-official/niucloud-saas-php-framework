import { defineComponent as v, resolveComponent as i, openBlock as C, createElementBlock as y, Fragment as w, withDirectives as p, createElementVNode as l, toDisplayString as x, unref as n, createVNode as a, withCtx as s, vShow as _, renderSlot as S } from "vue";
import { t as r, i as U } from "./core-shared-5b3bfa35.js";
import { u as V } from "./diy-9018bebd.js";
const B = { class: "content-wrap" }, T = { class: "edit-attr-item-wrap" }, k = { class: "mb-[10px]" }, A = { ref: "imageBoxRef" }, D = { class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]" }, j = { class: "style-wrap" }, E = /* @__PURE__ */ v({
  __name: "edit-hot-area",
  setup(H, { expose: c }) {
    const e = V();
    e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (t) => {
      const o = { code: !0, message: "" };
      return e.value[t].imageUrl === "" && (o.code = !1, o.message = r("imageUrlTip")), o;
    };
    const u = (t) => {
      g();
    }, g = () => {
      const t = new Image();
      t.src = U(e.editComponent.imageUrl), t.onload = async () => {
        e.editComponent.imgWidth = t.width, e.editComponent.imgHeight = t.height;
      };
    };
    return c({}), (t, o) => {
      const h = i("upload-image"), d = i("el-form-item"), f = i("heat-map"), b = i("el-form");
      return C(), y(w, null, [
        p(l("div", B, [
          l("div", T, [
            l("h3", k, x(n(r)("hotAreaSet")), 1),
            a(b, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: s(() => [
                l("div", A, [
                  l("div", D, [
                    a(d, {
                      label: n(r)("hotAreaBackground")
                    }, {
                      default: s(() => [
                        a(h, {
                          modelValue: n(e).editComponent.imageUrl,
                          "onUpdate:modelValue": o[0] || (o[0] = (m) => n(e).editComponent.imageUrl = m),
                          limit: 1,
                          onChange: u
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(d, {
                      label: n(r)("hotAreaSet")
                    }, {
                      default: s(() => [
                        a(f, {
                          modelValue: n(e).editComponent,
                          "onUpdate:modelValue": o[1] || (o[1] = (m) => n(e).editComponent = m)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ])
                ], 512)
              ]),
              _: 1
            })
          ])
        ], 512), [
          [_, n(e).editTab == "content"]
        ]),
        p(l("div", j, [
          S(t.$slots, "style")
        ], 512), [
          [_, n(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as _
};
