import { defineComponent as R, watch as E, ref as A, onMounted as P, nextTick as B, resolveComponent as _, openBlock as V, createElementBlock as w, Fragment as x, withDirectives as g, createElementVNode as u, toDisplayString as r, unref as e, createVNode as t, withCtx as o, createTextVNode as p, vShow as f, renderList as G, renderSlot as L, pushScopeId as se, popScopeId as me } from "vue";
import { t as a, i as W, b6 as D, _ as H } from "./core-shared-c8d7774e.js";
import { r as j } from "./lodash-8c6c2daa.js";
import { u as O } from "./diy-268d832e.js";
const $ = { class: "content-wrap" }, q = { class: "edit-attr-item-wrap" }, J = { class: "mb-[10px]" }, K = { class: "edit-attr-item-wrap" }, Q = { class: "mb-[10px]" }, X = { class: "text-sm text-gray-400 mb-[10px]" }, Y = ["onClick"], Z = { class: "style-wrap" }, ee = { class: "edit-attr-item-wrap" }, le = { class: "mb-[10px]" }, te = { class: "edit-attr-item-wrap" }, oe = { class: "mb-[10px]" }, ae = { class: "edit-attr-item-wrap" }, ie = { class: "mb-[10px]" }, ne = /* @__PURE__ */ R({
  __name: "edit-graphic-nav",
  setup(re, { expose: y }) {
    const l = O();
    l.editComponent.ignore = [], l.editComponent.verify = (s) => {
      const i = { code: !0, message: "" };
      return l.value[s].list.forEach((d) => {
        if ((l.value[s].mode === "graphic" || l.value[s].mode === "img") && d.imageUrl === "")
          return i.code = !1, i.message = a("imageUrlTip"), i;
        if ((l.value[s].mode === "graphic" || l.value[s].mode === "text") && d.title === "")
          return i.code = !1, i.message = a("graphicNavTitlePlaceholder"), i;
      }), i;
    }, l.editComponent.list.forEach((s) => {
      s.id || (s.id = l.generateRandom());
    }), E(
      () => l.editComponent.list,
      (s, i) => {
        l.editComponent.list.forEach((d) => {
          const c = new Image();
          c.src = W(d.imageUrl), c.onload = async () => {
            d.imgWidth = c.width, d.imgHeight = c.height;
          };
        });
      },
      { deep: !0 }
    );
    const N = () => {
      l.editComponent.list.push({
        id: l.generateRandom(),
        title: "",
        imageUrl: "",
        imgWidth: 0,
        imgHeight: 0,
        link: { name: "" },
        label: {
          control: !1,
          text: "热门",
          textColor: "#FFFFFF",
          bgColorStart: "#F83287",
          bgColorEnd: "#FE3423"
        }
      });
    }, v = A();
    P(() => {
      B(() => {
        const s = D.create(v.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (i) => {
            const d = l.editComponent.list[i.oldIndex];
            l.editComponent.list.splice(i.oldIndex, 1), l.editComponent.list.splice(i.newIndex, 0, d), s.sort(
              j(l.editComponent.list.length).map((c) => c.toString())
            );
          }
        });
      });
    });
    const U = (s) => {
      s == "1" ? l.editComponent.showStyle = "singleSlide" : s == "2" && (l.editComponent.showStyle = "fixed");
    };
    return y({}), (s, i) => {
      const d = _("el-radio"), c = _("el-radio-group"), m = _("el-form-item"), h = _("el-form"), I = _("upload-image"), k = _("el-input"), z = _("icon"), F = _("diy-link"), M = _("el-button"), C = _("el-slider"), S = _("el-color-picker");
      return V(), w(x, null, [
        g(u("div", $, [
          u("div", q, [
            u("h3", J, r(e(a)("graphicNavModeTitle")), 1),
            t(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: o(() => [
                t(m, {
                  label: e(a)("layoutMode")
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: e(l).editComponent.layout,
                      "onUpdate:modelValue": i[0] || (i[0] = (n) => e(l).editComponent.layout = n)
                    }, {
                      default: o(() => [
                        t(d, { label: "horizontal" }, {
                          default: o(() => [
                            p(r(e(a)("layoutModeHorizontal")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "vertical" }, {
                          default: o(() => [
                            p(r(e(a)("layoutModeVertical")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("graphicNavSelectMode")
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: e(l).editComponent.mode,
                      "onUpdate:modelValue": i[1] || (i[1] = (n) => e(l).editComponent.mode = n)
                    }, {
                      default: o(() => [
                        t(d, { label: "graphic" }, {
                          default: o(() => [
                            p(r(e(a)("graphicNavModeGraphic")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "img" }, {
                          default: o(() => [
                            p(r(e(a)("graphicNavModeImg")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "text" }, {
                          default: o(() => [
                            p(r(e(a)("graphicNavModeText")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                g(u("view", null, [
                  t(m, {
                    label: e(a)("graphicNavPageCount")
                  }, {
                    default: o(() => [
                      t(c, {
                        modelValue: e(l).editComponent.pageCount,
                        "onUpdate:modelValue": i[2] || (i[2] = (n) => e(l).editComponent.pageCount = n),
                        onChange: U
                      }, {
                        default: o(() => [
                          t(d, { label: 1 }, {
                            default: o(() => [
                              p(r(e(a)("singleLine")), 1)
                            ]),
                            _: 1
                          }),
                          t(d, { label: 2 }, {
                            default: o(() => [
                              p(r(e(a)("multiline")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: e(a)("graphicNavShowStyle")
                  }, {
                    default: o(() => [
                      t(c, {
                        modelValue: e(l).editComponent.showStyle,
                        "onUpdate:modelValue": i[3] || (i[3] = (n) => e(l).editComponent.showStyle = n),
                        onChange: s.changeShowStyle
                      }, {
                        default: o(() => [
                          t(d, { label: "fixed" }, {
                            default: o(() => [
                              p(r(e(a)("graphicNavStyleFixed")), 1)
                            ]),
                            _: 1
                          }),
                          t(d, { label: "singleSlide" }, {
                            default: o(() => [
                              p(r(e(l).editComponent.pageCount == 2 ? e(a)("graphicNavStyleMultiLine") : e(a)("graphicNavStyleSingleSlide")), 1)
                            ]),
                            _: 1
                          }),
                          t(d, { label: "pageSlide" }, {
                            default: o(() => [
                              p(r(e(a)("graphicNavStylePageSlide")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onChange"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: e(a)("graphicNavRowCount")
                  }, {
                    default: o(() => [
                      t(c, {
                        modelValue: e(l).editComponent.rowCount,
                        "onUpdate:modelValue": i[4] || (i[4] = (n) => e(l).editComponent.rowCount = n)
                      }, {
                        default: o(() => [
                          t(d, { label: 3 }, {
                            default: o(() => [
                              p("3" + r(e(a)("piece")), 1)
                            ]),
                            _: 1
                          }),
                          t(d, { label: 4 }, {
                            default: o(() => [
                              p("4" + r(e(a)("piece")), 1)
                            ]),
                            _: 1
                          }),
                          t(d, { label: 5 }, {
                            default: o(() => [
                              p("5" + r(e(a)("piece")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ], 512), [
                  [f, e(l).editComponent.layout == "horizontal"]
                ])
              ]),
              _: 1
            })
          ]),
          u("div", K, [
            u("h3", Q, r(e(a)("graphicNavSetLabel")), 1),
            t(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: o(() => [
                u("p", X, r(e(a)("graphicNavTips")), 1),
                u("div", {
                  ref_key: "imageBoxRef",
                  ref: v
                }, [
                  (V(!0), w(x, null, G(e(l).editComponent.list, (n, T) => (V(), w("div", {
                    key: n.id,
                    class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    g(t(m, {
                      label: e(a)("image")
                    }, {
                      default: o(() => [
                        t(I, {
                          modelValue: n.imageUrl,
                          "onUpdate:modelValue": (b) => n.imageUrl = b,
                          limit: 1
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"]), [
                      [f, e(l).editComponent.mode === "graphic" || e(l).editComponent.mode === "img"]
                    ]),
                    g(t(m, {
                      label: e(a)("graphicNavTitle")
                    }, {
                      default: o(() => [
                        t(k, {
                          modelValue: n.title,
                          "onUpdate:modelValue": (b) => n.title = b,
                          modelModifiers: { trim: !0 },
                          placeholder: e(a)("graphicNavTitlePlaceholder"),
                          clearable: "",
                          maxlength: "20",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label"]), [
                      [f, e(l).editComponent.mode === "graphic" || e(l).editComponent.mode === "text"]
                    ]),
                    g(u("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (b) => e(l).editComponent.list.splice(T, 1)
                    }, [
                      t(z, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, Y), [
                      [f, e(l).editComponent.list.length > 1]
                    ]),
                    t(m, {
                      label: e(a)("link")
                    }, {
                      default: o(() => [
                        t(F, {
                          modelValue: n.link,
                          "onUpdate:modelValue": (b) => n.link = b
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"])
                  ]))), 128))
                ], 512),
                g(t(M, {
                  class: "w-full",
                  onClick: N
                }, {
                  default: o(() => [
                    p(r(e(a)("addGraphicNav")), 1)
                  ]),
                  _: 1
                }, 512), [
                  [f, e(l).editComponent.list.length < 50]
                ])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [f, e(l).editTab == "content"]
        ]),
        g(u("div", Z, [
          g(u("div", ee, [
            u("h3", le, r(e(a)("graphicNavImageSet")), 1),
            t(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: o(() => [
                t(m, {
                  label: e(a)("graphicNavImageSize")
                }, {
                  default: o(() => [
                    t(C, {
                      modelValue: e(l).editComponent.imageSize,
                      "onUpdate:modelValue": i[5] || (i[5] = (n) => e(l).editComponent.imageSize = n),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 20,
                      max: 60
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("graphicNavAroundRadius")
                }, {
                  default: o(() => [
                    t(C, {
                      modelValue: e(l).editComponent.aroundRadius,
                      "onUpdate:modelValue": i[6] || (i[6] = (n) => e(l).editComponent.aroundRadius = n),
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
          ], 512), [
            [f, ["graphic", "img"].includes(e(l).editComponent.mode)]
          ]),
          g(u("div", te, [
            u("h3", oe, r(e(a)("textSet")), 1),
            t(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: o(() => [
                t(m, {
                  label: e(a)("textFontSize")
                }, {
                  default: o(() => [
                    t(C, {
                      modelValue: e(l).editComponent.font.size,
                      "onUpdate:modelValue": i[7] || (i[7] = (n) => e(l).editComponent.font.size = n),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 12,
                      max: 16
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("textFontWeight")
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: e(l).editComponent.font.weight,
                      "onUpdate:modelValue": i[8] || (i[8] = (n) => e(l).editComponent.font.weight = n)
                    }, {
                      default: o(() => [
                        t(d, { label: "normal" }, {
                          default: o(() => [
                            p(r(e(a)("fontWeightNormal")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "bold" }, {
                          default: o(() => [
                            p(r(e(a)("fontWeightBold")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("textColor")
                }, {
                  default: o(() => [
                    t(S, {
                      modelValue: e(l).editComponent.font.color,
                      "onUpdate:modelValue": i[9] || (i[9] = (n) => e(l).editComponent.font.color = n),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ], 512), [
            [f, ["graphic", "text"].includes(e(l).editComponent.mode)]
          ]),
          g(u("div", ae, [
            u("h3", ie, r(e(a)("carouselSearchSwiperIndicatorSet")), 1),
            t(h, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: o(() => [
                t(m, {
                  label: e(a)("carouselSearchSwiperIndicatorStyle")
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: e(l).editComponent.swiper.indicatorStyle,
                      "onUpdate:modelValue": i[10] || (i[10] = (n) => e(l).editComponent.swiper.indicatorStyle = n)
                    }, {
                      default: o(() => [
                        t(d, { label: "style-1" }, {
                          default: o(() => [
                            p(r(e(a)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "style-2" }, {
                          default: o(() => [
                            p(r(e(a)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "style-3" }, {
                          default: o(() => [
                            p(r(e(a)("carouselSearchSwiperIndicatorStyle3")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("carouselSearchSwiperIndicatorAlign")
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: e(l).editComponent.swiper.indicatorAlign,
                      "onUpdate:modelValue": i[11] || (i[11] = (n) => e(l).editComponent.swiper.indicatorAlign = n)
                    }, {
                      default: o(() => [
                        t(d, { label: "left" }, {
                          default: o(() => [
                            p(r(e(a)("alignLeft")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "center" }, {
                          default: o(() => [
                            p(r(e(a)("alignCenter")), 1)
                          ]),
                          _: 1
                        }),
                        t(d, { label: "right" }, {
                          default: o(() => [
                            p(r(e(a)("alignRight")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("noColor")
                }, {
                  default: o(() => [
                    t(S, {
                      modelValue: e(l).editComponent.swiper.indicatorColor,
                      "onUpdate:modelValue": i[12] || (i[12] = (n) => e(l).editComponent.swiper.indicatorColor = n),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(m, {
                  label: e(a)("selectColor")
                }, {
                  default: o(() => [
                    t(S, {
                      modelValue: e(l).editComponent.swiper.indicatorActiveColor,
                      "onUpdate:modelValue": i[13] || (i[13] = (n) => e(l).editComponent.swiper.indicatorActiveColor = n),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ], 512), [
            [f, e(l).editComponent.showStyle == "pageSlide" && e(l).editComponent.layout == "horizontal"]
          ]),
          L(s.$slots, "style", {}, void 0, !0)
        ], 512), [
          [f, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const de = /* @__PURE__ */ H(ne, [["__scopeId", "data-v-118ccbc8"]]), ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" }));
export {
  ge as _
};
