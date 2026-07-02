import { defineComponent as E, ref as y, onMounted as O, nextTick as L, resolveComponent as m, openBlock as c, createElementBlock as u, Fragment as b, withDirectives as x, createElementVNode as s, toDisplayString as g, unref as t, createVNode as n, withCtx as r, renderList as k, normalizeClass as B, createCommentVNode as P, vShow as C, createTextVNode as j, renderSlot as A } from "vue";
import { t as i, b6 as D } from "./core-shared-ae4a556b.js";
import { u as $ } from "./diy-30711e15.js";
import { r as F } from "./lodash-8c6c2daa.js";
const M = { class: "content-wrap float-btn" }, q = { class: "edit-attr-item-wrap" }, G = { class: "mb-[10px]" }, H = { class: "ml-[10px] flex items-center" }, J = ["onClick"], K = { class: "edit-attr-item-wrap" }, Q = { class: "mb-[10px]" }, W = { class: "text-[12px] text-[#999] mb-[15px] mt-[5px]" }, X = ["onClick"], Y = { class: "style-wrap" }, Z = /* @__PURE__ */ E({
  __name: "edit-float-btn",
  setup(ee, { expose: S }) {
    const e = $();
    e.editComponent.ignore = ["pageBgColor", "marginTop", "marginBottom", "marginBoth", "componentBgUrl"], e.editComponent.verify = (a) => {
      const o = { code: !0, message: "" };
      return e.value[a].list.forEach((d) => {
        if (d.imageUrl === "")
          return o.code = !1, o.message = i("imageUrlTip"), o;
      }), o;
    };
    const h = y([
      {
        name: "左上",
        src: "iconzuoshangpc",
        className: "upperLeft"
      },
      {
        name: "右上",
        src: "iconyoushangpc",
        className: "upperRight"
      },
      {
        name: "左下",
        src: "iconzuoxiapc",
        className: "lowerLeft"
      },
      {
        name: "右下",
        src: "iconyouxiapc",
        className: "lowerRight"
      }
    ]), v = y({});
    h.value.forEach((a) => {
      a.className == e.editComponent.bottomPosition && (v.value = a);
    });
    const U = (a) => {
      v.value = a, e.editComponent.bottomPosition = a.className;
    }, z = () => {
      e.editComponent.list.push({
        id: e.generateRandom(),
        imageUrl: "",
        link: { name: "" }
      });
    }, V = y();
    return e.editComponent.list.forEach((a) => {
      a.id || (a.id = e.generateRandom());
    }), O(() => {
      L(() => {
        const a = D.create(V.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (o) => {
            const d = e.editComponent.list[o.oldIndex];
            e.editComponent.list.splice(o.oldIndex, 1), e.editComponent.list.splice(o.newIndex, 0, d), a.sort(
              F(e.editComponent.list.length).map((p) => p.toString())
            );
          }
        });
      });
    }), S({}), (a, o) => {
      const d = m("el-form-item"), p = m("el-slider"), w = m("el-form"), N = m("upload-image"), R = m("icon"), T = m("diy-link"), I = m("el-button");
      return c(), u(b, null, [
        x(s("div", M, [
          s("div", q, [
            s("h3", G, g(t(i)("floatBtnButton")), 1),
            n(w, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: r(() => [
                n(d, {
                  label: t(i)("floatBtnButton")
                }, {
                  default: r(() => [
                    s("span", null, g(v.value.name), 1),
                    s("ul", H, [
                      (c(!0), u(b, null, k(h.value, (l, f) => (c(), u(b, { key: f }, [
                        t(e).editComponent.style === "style-1" || t(e).editComponent.style === "style-2" && f > 1 ? (c(), u("li", {
                          key: 0,
                          class: B(["w-[50px] h-[32px] flex items-center justify-center border-solid  border-[1px] border-[#eee] cursor-pointer", { "border-r-transparent": h.value.length != f + 1 }, l.className == t(e).editComponent.bottomPosition ? "!border-[var(--el-color-primary)]" : ""]),
                          onClick: (_) => U(l)
                        }, [
                          s("span", {
                            class: B(["iconfont !text-[20px]", l.src])
                          }, null, 2)
                        ], 10, J)) : P("", !0)
                      ], 64))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(d, {
                  label: t(i)("floatBtnOffset")
                }, {
                  default: r(() => [
                    n(p, {
                      modelValue: t(e).editComponent.offset,
                      "onUpdate:modelValue": o[0] || (o[0] = (l) => t(e).editComponent.offset = l),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 100
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(d, {
                  label: t(i)("lateralBtnOffset")
                }, {
                  default: r(() => [
                    n(p, {
                      modelValue: t(e).editComponent.lateralOffset,
                      "onUpdate:modelValue": o[1] || (o[1] = (l) => t(e).editComponent.lateralOffset = l),
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
          s("div", K, [
            s("h3", Q, g(t(i)("floatBtnImageSet")), 1),
            n(w, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: r(() => [
                n(d, {
                  label: t(i)("floatBtnImageSize")
                }, {
                  default: r(() => [
                    n(p, {
                      modelValue: t(e).editComponent.imageSize,
                      "onUpdate:modelValue": o[2] || (o[2] = (l) => t(e).editComponent.imageSize = l),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 30,
                      max: 100
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(d, {
                  label: t(i)("floatBtnAroundRadius")
                }, {
                  default: r(() => [
                    n(p, {
                      modelValue: t(e).editComponent.aroundRadius,
                      "onUpdate:modelValue": o[3] || (o[3] = (l) => t(e).editComponent.aroundRadius = l),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s("div", W, g(t(i)("floatBtnImageSuggest")), 1),
                s("div", {
                  ref_key: "imageBoxRef",
                  ref: V
                }, [
                  (c(!0), u(b, null, k(t(e).editComponent.list, (l, f) => (c(), u("div", {
                    key: l.id,
                    class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    n(d, {
                      label: t(i)("image")
                    }, {
                      default: r(() => [
                        n(N, {
                          modelValue: l.imageUrl,
                          "onUpdate:modelValue": (_) => l.imageUrl = _,
                          limit: 1
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    x(s("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (_) => t(e).editComponent.list.splice(f, 1)
                    }, [
                      n(R, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, X), [
                      [C, t(e).editComponent.list.length > 1]
                    ]),
                    n(d, {
                      label: t(i)("link")
                    }, {
                      default: r(() => [
                        n(T, {
                          modelValue: l.link,
                          "onUpdate:modelValue": (_) => l.link = _
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"])
                  ]))), 128))
                ], 512)
              ]),
              _: 1
            }),
            x(n(I, {
              class: "w-full",
              onClick: z
            }, {
              default: r(() => [
                j(g(t(i)("addImageAd")), 1)
              ]),
              _: 1
            }, 512), [
              [C, t(e).editComponent.list.length < 3]
            ])
          ])
        ], 512), [
          [C, t(e).editTab == "content"]
        ]),
        x(s("div", Y, [
          A(a.$slots, "style")
        ], 512), [
          [C, t(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Z
}, Symbol.toStringTag, { value: "Module" }));
export {
  ae as _
};
