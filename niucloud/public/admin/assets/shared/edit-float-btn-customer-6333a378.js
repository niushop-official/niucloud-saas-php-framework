import { defineComponent as k, ref as O, onMounted as T, resolveComponent as u, openBlock as f, createElementBlock as g, Fragment as C, withDirectives as v, createElementVNode as i, toDisplayString as c, unref as t, createVNode as o, withCtx as d, renderList as R, vShow as B, renderSlot as E } from "vue";
import { t as n } from "./core-shared-c6ad4e77.js";
import { u as I } from "./diy-452683aa.js";
const z = { class: "content-wrap float-btn" }, M = { class: "edit-attr-item-wrap" }, N = { class: "mb-[10px]" }, L = { class: "edit-attr-item-wrap" }, D = { class: "mb-[10px]" }, P = { class: "text-[12px] text-[#999] mb-[15px] mt-[5px]" }, A = { class: "text-[12px] text-[#999] mt-[4px]" }, j = { class: "style-wrap" }, F = /* @__PURE__ */ k({
  __name: "edit-float-btn-customer",
  setup(K, { expose: h }) {
    const _ = {
      name: "MEMBER_CONTACT",
      parent: "MEMBER_LINK",
      title: "客服",
      url: "/app/pages/member/contact",
      action: ""
    }, b = "middleRight", e = I();
    e.editComponent.ignore = ["pageBgColor", "marginTop", "marginBottom", "marginBoth", "componentBgUrl"];
    const x = () => {
      if (e.editComponent.aroundRadius = 50, e.editComponent.bottomPosition = b, !Array.isArray(e.editComponent.list) || !e.editComponent.list.length) {
        e.editComponent.list = [{
          id: e.generateRandom(),
          imageUrl: "",
          link: { ..._ }
        }];
        return;
      }
      e.editComponent.list = e.editComponent.list.slice(0, 1).map((m) => ({
        ...m,
        id: m.id || e.generateRandom(),
        link: { ..._ }
      }));
    };
    x(), e.editComponent.verify = (m) => {
      var s;
      const l = { code: !0, message: "" }, r = ((s = e.value[m]) == null ? void 0 : s.list) || [];
      e.value[m].bottomPosition = b;
      for (const p of r) {
        if (!p.imageUrl)
          return l.code = !1, l.message = n("imageUrlTip"), l;
        p.link = { ..._ };
      }
      return l;
    };
    const y = O();
    return T(() => {
      x();
    }), h({}), (m, l) => {
      const r = u("el-slider"), s = u("el-form-item"), p = u("el-form"), V = u("upload-image"), w = u("el-input");
      return f(), g(C, null, [
        v(i("div", z, [
          i("div", M, [
            i("h3", N, c(t(n)("floatBtnButton")), 1),
            o(p, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                o(s, {
                  label: t(n)("floatBtnOffset")
                }, {
                  default: d(() => [
                    o(r, {
                      modelValue: t(e).editComponent.offset,
                      "onUpdate:modelValue": l[0] || (l[0] = (a) => t(e).editComponent.offset = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: -100,
                      max: 100
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(s, {
                  label: t(n)("lateralBtnOffset")
                }, {
                  default: d(() => [
                    o(r, {
                      modelValue: t(e).editComponent.lateralOffset,
                      "onUpdate:modelValue": l[1] || (l[1] = (a) => t(e).editComponent.lateralOffset = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 15,
                      min: -10
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          i("div", L, [
            i("h3", D, c(t(n)("floatBtnImageSet")), 1),
            o(p, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                o(s, {
                  label: t(n)("floatBtnImageSize")
                }, {
                  default: d(() => [
                    o(r, {
                      modelValue: t(e).editComponent.imageSize,
                      "onUpdate:modelValue": l[2] || (l[2] = (a) => t(e).editComponent.imageSize = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 30,
                      max: 100
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                i("div", P, c(t(n)("floatBtnImageCircle")), 1),
                i("div", {
                  ref_key: "imageBoxRef",
                  ref: y
                }, [
                  (f(!0), g(C, null, R(t(e).editComponent.list, (a, S) => (f(), g("div", {
                    key: a.id || S,
                    class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    o(s, {
                      label: t(n)("image")
                    }, {
                      default: d(() => [
                        o(V, {
                          modelValue: a.imageUrl,
                          "onUpdate:modelValue": (U) => a.imageUrl = U,
                          limit: 1
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    o(s, {
                      label: t(n)("link")
                    }, {
                      default: d(() => [
                        o(w, {
                          "model-value": _.title,
                          disabled: ""
                        }, null, 8, ["model-value"]),
                        i("div", A, c(t(n)("floatBtnCustomerLinkTip")), 1)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]))), 128))
                ], 512)
              ]),
              _: 1
            })
          ])
        ], 512), [
          [B, t(e).editTab == "content"]
        ]),
        v(i("div", j, [
          E(m.$slots, "style")
        ], 512), [
          [B, t(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), G = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: F
}, Symbol.toStringTag, { value: "Module" }));
export {
  G as _
};
