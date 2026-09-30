import { defineComponent as E, watch as N, ref as R, onMounted as j, nextTick as z, resolveComponent as s, openBlock as g, createElementBlock as C, Fragment as v, withDirectives as u, createElementVNode as r, toDisplayString as _, unref as o, createVNode as a, withCtx as p, createBlock as D, createCommentVNode as M, createTextVNode as y, renderList as P, vShow as h, renderSlot as W, pushScopeId as le, popScopeId as ie } from "vue";
import { t as l, j as $, be as F, a as O } from "./core-shared-c6ad4e77.js";
import { r as L } from "./lodash-8c6c2daa.js";
import { u as q } from "./diy-452683aa.js";
const G = { class: "content-wrap" }, J = { class: "edit-attr-item-wrap" }, K = { class: "mb-[10px]" }, Q = { class: "text-sm text-gray-400 leading-[1.4]" }, X = { class: "text-sm text-gray-400 mb-[10px]" }, Y = ["onClick"], Z = { class: "style-wrap" }, ee = /* @__PURE__ */ E({
  __name: "edit-image-ads",
  setup(oe, { expose: w }) {
    const e = q();
    e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (n) => {
      const t = { code: !0, message: "" };
      return e.value[n].imageHeight == 0 ? (t.code = !1, t.message = l("imageHeightPlaceholder"), t) : /^\d+.?\d{0,2}$/.test(e.value[n].imageHeight) ? (e.value[n].list.forEach((m) => {
        if (m.imageUrl === "")
          return t.code = !1, t.message = l("imageUrlTip"), t;
      }), t) : (t.code = !1, t.message = l("imageHeightRegNum"), t);
    }, e.editComponent.list.forEach((n) => {
      n.id || (n.id = e.generateRandom());
    }), N(
      () => e.editComponent.list,
      (n, t) => {
        f();
      },
      { deep: !0 }
    );
    const S = () => {
      e.editComponent.list.push({
        id: e.generateRandom(),
        imageUrl: "",
        imgWidth: 0,
        imgHeight: 0,
        link: { name: "" }
      });
    }, V = (n) => {
      f(!0);
    }, f = (n = !1) => {
      e.editComponent.list.forEach((t, m) => {
        const i = new Image();
        i.src = $(t.imageUrl), i.onload = async () => {
          if (t.imgWidth = i.width, t.imgHeight = i.height, n && m == 0) {
            const b = t.imgHeight / t.imgWidth;
            t.width = 375 - e.editComponent.margin.both * 2, t.height = t.width * b, e.editComponent.imageHeight = parseInt(t.height);
          }
        };
      });
    }, k = () => {
      e.editComponent.imageHeight = e.editComponent.imageHeight ? parseInt(e.editComponent.imageHeight) : 0;
    }, x = R();
    return j(() => {
      z(() => {
        const n = F.create(x.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (t) => {
            const m = e.editComponent.list[t.oldIndex];
            e.editComponent.list.splice(t.oldIndex, 1), e.editComponent.list.splice(t.newIndex, 0, m), n.sort(
              L(e.editComponent.list.length).map((i) => i.toString())
            ), f(!0);
          }
        });
      });
    }), w({}), (n, t) => {
      const m = s("el-switch"), i = s("el-form-item"), b = s("el-input"), H = s("upload-image"), I = s("icon"), U = s("diy-link"), T = s("el-button"), B = s("el-form");
      return g(), C(v, null, [
        u(r("div", G, [
          r("div", J, [
            r("h3", K, _(o(l)("imageSet")), 1),
            a(B, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: p(() => [
                o(e).currentIndex == 0 ? (g(), D(i, {
                  key: 0,
                  label: o(l)("sameScreen")
                }, {
                  default: p(() => [
                    a(m, {
                      modelValue: o(e).editComponent.isSameScreen,
                      "onUpdate:modelValue": t[0] || (t[0] = (d) => o(e).editComponent.isSameScreen = d)
                    }, null, 8, ["modelValue"]),
                    r("div", Q, _(o(l)("imageAdsSameScreenTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])) : M("", !0),
                a(i, {
                  label: o(l)("imageHeight"),
                  class: "display-block"
                }, {
                  default: p(() => [
                    a(b, {
                      modelValue: o(e).editComponent.imageHeight,
                      "onUpdate:modelValue": t[1] || (t[1] = (d) => o(e).editComponent.imageHeight = d),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("imageHeightPlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      onBlur: k
                    }, {
                      append: p(() => [
                        y("px")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"]),
                    r("div", X, _(o(l)("imageAdsTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r("div", {
                  ref_key: "imageBoxRef",
                  ref: x
                }, [
                  (g(!0), C(v, null, P(o(e).editComponent.list, (d, A) => (g(), C("div", {
                    key: d.id,
                    class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    a(i, {
                      label: o(l)("image")
                    }, {
                      default: p(() => [
                        a(H, {
                          modelValue: d.imageUrl,
                          "onUpdate:modelValue": (c) => d.imageUrl = c,
                          limit: 1,
                          onChange: V
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    u(r("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (c) => o(e).editComponent.list.splice(A, 1)
                    }, [
                      a(I, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, Y), [
                      [h, o(e).editComponent.list.length > 1]
                    ]),
                    a(i, {
                      label: o(l)("link")
                    }, {
                      default: p(() => [
                        a(U, {
                          modelValue: d.link,
                          "onUpdate:modelValue": (c) => d.link = c
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"])
                  ]))), 128))
                ], 512),
                u(a(T, {
                  class: "w-full",
                  onClick: S
                }, {
                  default: p(() => [
                    y(_(o(l)("addImageAd")), 1)
                  ]),
                  _: 1
                }, 512), [
                  [h, o(e).editComponent.list.length < 10]
                ])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [h, o(e).editTab == "content"]
        ]),
        u(r("div", Z, [
          W(n.$slots, "style", {}, void 0, !0)
        ], 512), [
          [h, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const te = /* @__PURE__ */ O(ee, [["__scopeId", "data-v-513b5921"]]), re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: te
}, Symbol.toStringTag, { value: "Module" }));
export {
  re as _
};
