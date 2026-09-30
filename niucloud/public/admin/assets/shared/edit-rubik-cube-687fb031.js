import { defineComponent as A, ref as I, computed as T, watch as j, resolveComponent as x, openBlock as r, createElementBlock as u, Fragment as h, withDirectives as b, createElementVNode as n, toDisplayString as _, unref as e, createVNode as a, withCtx as c, renderList as z, normalizeClass as w, vShow as y, renderSlot as H, pushScopeId as se, popScopeId as oe } from "vue";
import { t as m, j as k, a as L } from "./core-shared-c6ad4e77.js";
import { u as D } from "./diy-452683aa.js";
const G = { class: "content-wrap rubik-cube" }, B = { class: "edit-attr-item-wrap" }, O = { class: "mb-[10px]" }, W = { class: "selected-template-list" }, $ = ["onClick"], F = { class: "edit-attr-item-wrap" }, M = { class: "mb-[10px]" }, P = { class: "layout" }, q = { class: "have-preview-image" }, J = ["src"], K = { class: "style-wrap" }, Q = { class: "edit-attr-item-wrap" }, X = { class: "mb-[10px]" }, Y = /* @__PURE__ */ A({
  __name: "edit-rubik-cube",
  setup(ee, { expose: V }) {
    const t = D();
    t.editComponent.ignore = [], t.editComponent.verify = (p) => {
      const l = { code: !0, message: "" };
      return t.value[p].list.forEach((i) => {
        if (i.imageUrl === "")
          return l.code = !1, l.message = m("imageUrlTip"), l;
      }), l;
    };
    const g = I([
      {
        name: "1行2个",
        src: "iconyihang2gepc1",
        className: "row1-of2",
        dimensionScale: [
          {
            desc: "宽度50%",
            size: "200px * 200px",
            name: "图一"
          },
          {
            desc: "宽度50%",
            size: "200px * 200px",
            name: "图二"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：200px"
      },
      {
        name: "1行3个",
        src: "iconyihang3gepc",
        className: "row1-of3",
        dimensionScale: [
          {
            desc: "宽度33.33%",
            size: "200px * 200px",
            name: "图一"
          },
          {
            desc: "宽度33.33%",
            size: "200px * 200px",
            name: "图二"
          },
          {
            desc: "宽度33.33%",
            size: "200px * 200px",
            name: "图三"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：130px"
      },
      {
        name: "1行4个",
        src: "iconyihang4gepc",
        className: "row1-of4",
        dimensionScale: [
          {
            desc: "宽度25%",
            size: "200px * 200px",
            name: "图一"
          },
          {
            desc: "宽度25%",
            size: "200px * 200px",
            name: "图二"
          },
          {
            desc: "宽度25%",
            size: "200px * 200px",
            name: "图三"
          },
          {
            desc: "宽度25%",
            size: "200px * 200px",
            name: "图四"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：100px"
      },
      {
        name: "2左2右",
        src: "iconliangzuoliangyoupc",
        className: "row2-lt-of2-rt",
        dimensionScale: [
          {
            desc: "宽度50%",
            size: "200px * 200px",
            name: "图一"
          },
          {
            desc: "宽度50%",
            size: "200px * 200px",
            name: "图二"
          },
          {
            desc: "宽度50%",
            size: "200px * 200px",
            name: "图三"
          },
          {
            desc: "宽度50%",
            size: "200px * 200px",
            name: "图四"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，建议添加尺寸一致的图片，宽度最小建议为：200px"
      },
      {
        name: "1左2右",
        src: "iconyizuoliangyoupc",
        className: "row1-lt-of2-rt",
        dimensionScale: [
          {
            desc: "宽度50% * 高度100%",
            size: "200px * 400px",
            name: "图一"
          },
          {
            desc: "宽度50% * 高度50%",
            size: "200px * 200px",
            name: "图二"
          },
          {
            desc: "宽度50% * 高度50%",
            size: "200px * 200px",
            name: "图三"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，宽度最小建议为：200px，右侧两张图片高度一致，左侧图片高度为右侧两张图片高度之和（例：左侧图片尺寸：200px * 300px，右侧两张图片尺寸：200px * 150px）"
      },
      {
        name: "1上2下",
        src: "iconyishangliangxiapc",
        className: "row1-tp-of2-bm",
        dimensionScale: [
          {
            desc: "宽度100% * 高度50%",
            size: "400px * 200px",
            name: "图一"
          },
          {
            desc: "宽度50% * 高度50%",
            size: "200px * 200px",
            name: "图二"
          },
          {
            desc: "宽度50% * 高度50%",
            size: "200px * 200px",
            name: "图三"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，上方一张图片的宽度为下方两张图片宽度之和，下放两张图片尺寸一致，高度可根据实际需求自行确定（例：上方图片尺寸：400px * 150px，下方两张图片尺寸：200px * 150px）"
      },
      {
        name: "1左3右",
        src: "iconyizuosanyoupc",
        className: "row1-lt-of1-tp-of2-bm",
        dimensionScale: [
          {
            desc: "宽度50% * 高度100%",
            size: "200px * 400px",
            name: "图一"
          },
          {
            desc: "宽度50% * 高度50%",
            size: "200px * 200px",
            name: "图二"
          },
          {
            desc: "宽度25% * 高度50%",
            size: "100px * 200px",
            name: "图三"
          },
          {
            desc: "宽度25% * 高度50%",
            size: "100px * 200px",
            name: "图四"
          }
        ],
        descAux: "选定布局区域，在下方添加图片，左右两侧内容宽高相同，右侧上下区域高度各占50%，右侧内容下半部分两张图片的宽度相同，各占右侧内容宽度的50%（例：左侧图片尺寸：200px * 400px，右侧上半部分图片尺寸：200px * 200px，右侧下半部分两张图片尺寸：100px * 200px）"
      }
    ]), f = T(() => {
      let p;
      return g.value.forEach((l) => {
        l.className == t.editComponent.mode && (p = l);
      }), p;
    }), U = (p) => {
      for (let l = 0; l < g.value.length; l++)
        if (l == p) {
          t.editComponent.mode = g.value[l].className;
          const i = g.value[l].dimensionScale.length;
          if (i > t.editComponent.list.length)
            for (let o = 0; o < i; o++)
              o + 1 > t.editComponent.list.length && t.editComponent.list.push({
                imageUrl: "",
                imgWidth: 0,
                imgHeight: 0,
                link: { name: "" }
              });
          else if (i != t.editComponent.list.length)
            for (let o = 0; o < t.editComponent.list.length; o++)
              o + 1 > i && (t.editComponent.list.splice(o, 1), o = 0);
        }
    }, N = (p) => {
      S(!0);
    }, S = (p = !1) => {
      t.editComponent.list.forEach((l, i) => {
        const o = new Image();
        o.src = k(l.imageUrl), o.onload = async () => {
          l.imgWidth = o.width, l.imgHeight = o.height;
        };
      });
    };
    return j(() => t.editComponent.list, () => {
      S(!0);
    }, { deep: !0 }), V({}), (p, l) => {
      const i = x("el-form-item"), o = x("icon"), C = x("el-form"), E = x("upload-image"), R = x("diy-link"), v = x("el-slider");
      return r(), u(h, null, [
        b(n("div", G, [
          n("div", B, [
            n("h3", O, _(e(m)("selectStyle")), 1),
            a(C, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: c(() => [
                a(i, {
                  label: e(m)("template")
                }, {
                  default: c(() => [
                    n("span", null, _(e(f).name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n("ul", W, [
                  (r(!0), u(h, null, z(g.value, (s, d) => (r(), u("li", {
                    key: d,
                    class: w([s.className == e(t).editComponent.mode ? "selected" : ""]),
                    onClick: (te) => U(d)
                  }, [
                    a(o, {
                      name: "iconfont " + s.src,
                      size: "16px"
                    }, null, 8, ["name"])
                  ], 10, $))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          n("div", F, [
            n("h3", M, _(e(m)("rubikCubeLayout")), 1),
            a(C, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: c(() => [
                n("ul", P, [
                  (r(!0), u(h, null, z(e(f).dimensionScale, (s, d) => (r(), u("li", {
                    key: d,
                    class: w([e(f).className])
                  }, [
                    b(n("div", q, [
                      n("img", {
                        src: e(k)(e(t).editComponent.list[d].imageUrl)
                      }, null, 8, J)
                    ], 512), [
                      [y, e(t).editComponent.list[d].imageUrl && e(t).editComponent.list[d].imageUrl != "static/resource/images/diy/figure.png"]
                    ]),
                    b(n("div", {
                      class: w(["empty", [e(f).className]])
                    }, [
                      n("p", null, _(s.name), 1),
                      n("p", null, _(s.desc), 1)
                    ], 2), [
                      [y, !e(t).editComponent.list[d].imageUrl || e(t).editComponent.list[d].imageUrl == "static/resource/images/diy/figure.png"]
                    ])
                  ], 2))), 128))
                ]),
                (r(!0), u(h, null, z(e(t).editComponent.list, (s) => (r(), u("div", {
                  key: s.id,
                  class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                }, [
                  a(i, {
                    label: e(m)("image")
                  }, {
                    default: c(() => [
                      a(E, {
                        modelValue: s.imageUrl,
                        "onUpdate:modelValue": (d) => s.imageUrl = d,
                        limit: 1,
                        onChange: N
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  a(i, {
                    label: e(m)("link")
                  }, {
                    default: c(() => [
                      a(R, {
                        modelValue: s.link,
                        "onUpdate:modelValue": (d) => s.link = d
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"])
                ]))), 128))
              ]),
              _: 1
            })
          ])
        ], 512), [
          [y, e(t).editTab == "content"]
        ]),
        b(n("div", K, [
          n("div", Q, [
            n("h3", X, _(e(m)("rubikCubeStyle")), 1),
            a(C, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: c(() => [
                a(i, {
                  label: e(m)("imageGap")
                }, {
                  default: c(() => [
                    a(v, {
                      modelValue: e(t).editComponent.imageGap,
                      "onUpdate:modelValue": l[0] || (l[0] = (s) => e(t).editComponent.imageGap = s),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 30
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: e(m)("topRounded")
                }, {
                  default: c(() => [
                    a(v, {
                      modelValue: e(t).editComponent.topElementRounded,
                      "onUpdate:modelValue": l[1] || (l[1] = (s) => e(t).editComponent.topElementRounded = s),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: e(m)("bottomRounded")
                }, {
                  default: c(() => [
                    a(v, {
                      modelValue: e(t).editComponent.bottomElementRounded,
                      "onUpdate:modelValue": l[2] || (l[2] = (s) => e(t).editComponent.bottomElementRounded = s),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          H(p.$slots, "style", {}, void 0, !0)
        ], 512), [
          [y, e(t).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const Z = /* @__PURE__ */ L(Y, [["__scopeId", "data-v-a2d802b7"]]), ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Z
}, Symbol.toStringTag, { value: "Module" }));
export {
  ie as _
};
