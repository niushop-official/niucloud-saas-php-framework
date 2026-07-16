import { defineComponent as Ve, reactive as F, ref as k, onMounted as ae, nextTick as ve, watch as ke, resolveComponent as h, resolveDirective as Ue, openBlock as C, createElementBlock as _, Fragment as P, withDirectives as y, createElementVNode as r, toDisplayString as s, unref as e, createVNode as t, withCtx as d, createTextVNode as b, createCommentVNode as D, vShow as S, withModifiers as $, createBlock as A, renderList as E, normalizeClass as Te } from "vue";
import { t as n, b6 as L, b7 as We, i as ne } from "./core-shared-e1759ce4.js";
import { u as Ie } from "./diy-0e4556df.js";
import { ElTable as Pe } from "element-plus";
import { r as O, c as Be } from "./lodash-8c6c2daa.js";
const Re = { class: "content-wrap" }, ze = { class: "edit-attr-item-wrap" }, De = { class: "mb-[10px]" }, Ae = {
  key: 0,
  class: "text-sm text-gray-400 mb-[10px]"
}, Ee = { class: "edit-attr-item-wrap" }, He = { class: "mb-[10px]" }, Ne = { class: "text-sm text-gray-400 mb-[10px]" }, Me = { class: "text-sm text-gray-400 mt-[10px] leading-[1.5]" }, je = { class: "flex flex-wrap" }, Fe = ["onClick"], $e = ["src"], Le = { class: "dialog-footer" }, Oe = { class: "edit-attr-item-wrap mb-[20px]" }, Ge = { class: "mb-[10px]" }, qe = { class: "text-sm text-gray-400 mb-[10px]" }, Je = ["onClick"], Ke = { class: "edit-attr-item-wrap" }, Qe = { class: "text-sm text-gray-400 mb-[10px]" }, Xe = ["onClick"], Ye = ["onClick"], Ze = { class: "mt-[16px] flex justify-end" }, el = { class: "flex items-center justify-end mt-[15px]" }, ll = { class: "text-sm text-gray-400 mb-[10px]" }, tl = ["onClick"], ol = { class: "style-wrap" }, al = {
  key: 0,
  class: "edit-attr-item-wrap"
}, nl = { class: "mb-[10px]" }, dl = {
  key: 1,
  class: "edit-attr-item-wrap"
}, il = { class: "mb-[10px]" }, rl = { class: "edit-attr-item-wrap" }, sl = { class: "mb-[10px]" }, pl = { class: "edit-attr-item-wrap" }, ul = { class: "mb-[10px]" }, ml = { class: "edit-attr-item-wrap" }, cl = { class: "mb-[10px]" }, hl = { class: "edit-attr-item-wrap" }, bl = { class: "mb-[10px]" }, fl = /* @__PURE__ */ Ve({
  __name: "edit-carousel-search",
  setup(Cl, { expose: de }) {
    const l = Ie();
    l.editComponent.ignore = ["componentBgColor", "componentBgUrl", "marginTop", "marginBottom", "topRounded", "bottomRounded", "pageBgColor", "marginBoth"], l.editComponent.verify = (p) => {
      const o = { code: !0, message: "" };
      return l.value[p].search.hotWord.list.forEach((u) => {
        if (u.text == "")
          return o.code = !1, o.message = n("carouselSearchHotWordTextPlaceholder"), o;
      }), l.value[p].tab.list.forEach((u) => {
        if (u.text == "")
          return o.code = !1, o.message = n("carouselSearchTabCategoryTextPlaceholder"), o;
      }), l.value[p].swiper.control && l.value[p].swiper.list.forEach((u) => {
        if (u.imageUrl == "")
          return o.code = !1, o.message = n("imageUrlTip"), o;
      }), o;
    };
    const V = F({
      title: l.editComponent.search.styleName,
      value: l.editComponent.search.style
    }), U = k(!1), G = () => {
      U.value = !0, V.title = l.editComponent.search.styleName, V.value = l.editComponent.search.style;
    }, ie = (p) => {
      V.title = p.title, V.value = p.value;
    }, re = () => {
      l.editComponent.search.styleName = V.title, l.editComponent.search.style = V.value, U.value = !1;
    }, se = F([
      {
        url: "static/resource/images/diy/carousel_search/style_1.png",
        title: "风格1",
        value: "style-1"
      },
      {
        url: "static/resource/images/diy/carousel_search/style_2.png",
        title: "风格2",
        value: "style-2"
      }
    ]);
    l.editComponent.search.hotWord.list.forEach((p) => {
      p.id || (p.id = l.generateRandom());
    }), l.editComponent.tab.list.forEach((p) => {
      p.id || (p.id = l.generateRandom());
    }), l.editComponent.swiper.list.forEach((p) => {
      p.id || (p.id = l.generateRandom());
    });
    const q = k(["tab", "swiper"]), pe = (p) => {
    };
    ae(() => {
      H();
    });
    const ue = () => {
      l.editComponent.search.hotWord.list.push({
        id: l.generateRandom(),
        text: "关键词"
      });
    }, me = (p) => {
      l.editComponent.tab.list[p].diy_id = 0, l.editComponent.tab.list[p].diy_title = "";
    }, ce = () => {
      l.editComponent.tab.list.push({
        id: l.generateRandom(),
        text: "分类名称",
        // 最多4个字
        source: "diy_page",
        // 数据源类型，微页面：diy_page
        diy_id: "",
        diy_title: ""
      });
    }, J = k(), K = k(), Q = k();
    ae(() => {
      ve(() => {
        const p = L.create(J.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (m) => {
            const i = l.editComponent.search.hotWord.list[m.oldIndex];
            l.editComponent.search.hotWord.list.splice(m.oldIndex, 1), l.editComponent.search.hotWord.list.splice(m.newIndex, 0, i), o.sort(
              O(l.editComponent.search.hotWord.list.length).map((c) => c.toString())
            );
          }
        }), o = L.create(K.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (m) => {
            const i = l.editComponent.tab.list[m.oldIndex];
            l.editComponent.tab.list.splice(m.oldIndex, 1), l.editComponent.tab.list.splice(m.newIndex, 0, i), o.sort(
              O(l.editComponent.tab.list.length).map((c) => c.toString())
            );
          }
        }), u = L.create(Q.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (m) => {
            const i = l.editComponent.swiper.list[m.oldIndex];
            l.editComponent.swiper.list.splice(m.oldIndex, 1), l.editComponent.swiper.list.splice(m.newIndex, 0, i), u.sort(
              O(l.editComponent.swiper.list.length).map((c) => c.toString())
            ), B(!0);
          }
        });
      });
    });
    const T = k(!1), f = F({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {}
    }), X = k(), H = (p = 1) => {
      f.loading = !0, f.page = p, We({
        page: f.page,
        limit: f.limit,
        ...f.searchParam
      }).then((o) => {
        f.loading = !1;
        const u = o.data.data;
        let m = [], i = 0;
        if (l.id)
          for (let c = 0; c < u.length; c++)
            u[c].id == l.id ? i++ : m.push(u[c]);
        else
          m = Be(u);
        i && (o.data.total = o.data.total - i), f.data = m, f.total = o.data.total;
      }).catch(() => {
        f.loading = !1;
      });
    };
    let W = {}, N = 0;
    const he = (p) => {
      W = p;
    }, be = () => {
      l.editComponent.tab.list[N].diy_id = W.id, l.editComponent.tab.list[N].diy_title = W.title, T.value = !1;
    }, fe = (p) => {
      T.value = !0, N = p, W && setTimeout(() => {
        X.value.setCurrentRow(W);
      }, 200);
    };
    ke(
      () => l.editComponent.swiper.list,
      (p, o) => {
        B();
      },
      { deep: !0 }
    );
    const Ce = () => {
      l.editComponent.swiper.list.push({
        id: l.generateRandom(),
        imageUrl: "",
        imgWidth: 0,
        imgHeight: 0,
        link: { name: "" }
      });
    }, ge = (p) => {
      B(!0);
    }, _e = (p) => {
      B(!0);
    }, B = (p = !1) => {
      l.editComponent.swiper.list.forEach((o, u) => {
        const m = new Image();
        m.src = ne(o.imageUrl), m.onload = async () => {
          if (o.imgWidth = m.width, o.imgHeight = m.height, p && u == 0) {
            const i = o.imgHeight / o.imgWidth;
            l.editComponent.swiper.swiperStyle == "style-1" ? o.width = 375 * 0.92 : o.width = 355, o.height = o.width * i, l.editComponent.swiper.imageHeight = parseInt(o.height);
          }
        };
      });
    };
    return de({}), (p, o) => {
      const u = h("el-radio"), m = h("el-radio-group"), i = h("el-form-item"), c = h("el-color-picker"), x = h("el-form"), Y = h("ArrowRight"), M = h("el-icon"), I = h("el-input"), Z = h("upload-image"), ee = h("diy-link"), v = h("el-button"), le = h("el-dialog"), R = h("el-slider"), z = h("icon"), te = h("el-switch"), xe = h("Close"), j = h("el-table-column"), we = h("el-pagination"), oe = h("el-collapse-item"), ye = h("el-collapse"), Se = Ue("loading");
      return C(), _(P, null, [
        y(r("div", Re, [
          r("div", ze, [
            r("h3", De, s(e(n)("carouselSearchShowPosition")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchShowWay")
                }, {
                  default: d(() => [
                    t(m, {
                      modelValue: e(l).editComponent.positionWay,
                      "onUpdate:modelValue": o[0] || (o[0] = (a) => e(l).editComponent.positionWay = a)
                    }, {
                      default: d(() => [
                        t(u, { label: "static" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchShowWayStatic")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "fixed" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchShowWayFixed")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    e(l).editComponent.positionWay == "fixed" ? (C(), _("div", Ae, "滑动页面查看效果")) : D("", !0)
                  ]),
                  _: 1
                }, 8, ["label"]),
                y(t(i, {
                  label: e(n)("carouselSearchFixedBgColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.fixedBgColor,
                      "onUpdate:modelValue": o[1] || (o[1] = (a) => e(l).editComponent.fixedBgColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]), [
                  [S, e(l).editComponent.positionWay == "fixed"]
                ]),
                t(i, {
                  label: e(n)("carouselSearchBgGradient")
                }, {
                  default: d(() => [
                    t(m, {
                      modelValue: e(l).editComponent.bgGradient,
                      "onUpdate:modelValue": o[2] || (o[2] = (a) => e(l).editComponent.bgGradient = a)
                    }, {
                      default: d(() => [
                        t(u, { label: !0 }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchOpen")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: !1 }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchClose")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          r("div", Ee, [
            r("h3", He, s(e(n)("carouselSearchSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: o[7] || (o[7] = $(() => {
              }, ["prevent"]))
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("selectStyle"),
                  class: "flex"
                }, {
                  default: d(() => [
                    r("span", {
                      class: "text-primary flex-1 cursor-pointer",
                      onClick: G
                    }, s(e(l).editComponent.search.styleName), 1),
                    t(M, {
                      onClick: G,
                      class: "cursor-pointer"
                    }, {
                      default: d(() => [
                        t(Y)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(l).editComponent.search.style == "style-2" ? (C(), A(i, {
                  key: 0,
                  label: e(n)("carouselSearchSubTitle")
                }, {
                  default: d(() => [
                    t(I, {
                      modelValue: e(l).editComponent.search.subTitle.text,
                      "onUpdate:modelValue": o[3] || (o[3] = (a) => e(l).editComponent.search.subTitle.text = a),
                      modelModifiers: { trim: !0 },
                      placeholder: e(n)("carouselSearchSubTitlePlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : D("", !0),
                t(i, {
                  label: e(n)("logo")
                }, {
                  default: d(() => [
                    t(Z, {
                      modelValue: e(l).editComponent.search.logo,
                      "onUpdate:modelValue": o[4] || (o[4] = (a) => e(l).editComponent.search.logo = a),
                      limit: 1
                    }, null, 8, ["modelValue"]),
                    r("div", Ne, s(e(n)("carouselSearchLogoTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("carouselSearchText")
                }, {
                  default: d(() => [
                    r("div", null, [
                      t(I, {
                        modelValue: e(l).editComponent.search.text,
                        "onUpdate:modelValue": o[5] || (o[5] = (a) => e(l).editComponent.search.text = a),
                        modelModifiers: { trim: !0 },
                        placeholder: e(n)("carouselSearchPlaceholder"),
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      r("p", Me, s(e(n)("carouselSearchTextTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("link")
                }, {
                  default: d(() => [
                    t(ee, {
                      modelValue: e(l).editComponent.search.link,
                      "onUpdate:modelValue": o[6] || (o[6] = (a) => e(l).editComponent.search.link = a)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            t(le, {
              modelValue: U.value,
              "onUpdate:modelValue": o[9] || (o[9] = (a) => U.value = a),
              title: e(n)("selectStyle"),
              width: "500px"
            }, {
              footer: d(() => [
                r("span", Le, [
                  t(v, {
                    onClick: o[8] || (o[8] = (a) => U.value = !1)
                  }, {
                    default: d(() => [
                      b(s(e(n)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  t(v, {
                    type: "primary",
                    onClick: re
                  }, {
                    default: d(() => [
                      b(s(e(n)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: d(() => [
                r("div", je, [
                  (C(!0), _(P, null, E(se, (a, w) => (C(), _("div", {
                    key: w,
                    class: Te([{ "border-primary": V.value == a.value }, "flex items-center justify-center overflow-hidden w-[200px] h-[100px] m-[6px] cursor-pointer border bg-[#eee]"]),
                    onClick: (g) => ie(a)
                  }, [
                    r("img", {
                      src: e(ne)(a.url)
                    }, null, 8, $e)
                  ], 10, Fe))), 128))
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ]),
          r("div", Oe, [
            r("h3", Ge, s(e(n)("carouselSearchHotWordSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchHotWordInterval")
                }, {
                  default: d(() => [
                    t(R, {
                      modelValue: e(l).editComponent.search.hotWord.interval,
                      "onUpdate:modelValue": o[10] || (o[10] = (a) => e(l).editComponent.search.hotWord.interval = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 1,
                      max: 10
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r("p", qe, s(e(n)("dragMouseAdjustOrder")), 1),
                r("div", {
                  ref_key: "searchHotWordTabBoxRef",
                  ref: J
                }, [
                  (C(!0), _(P, null, E(e(l).editComponent.search.hotWord.list, (a, w) => (C(), _("div", {
                    key: a.id,
                    class: "item-wrap p-[10px] relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    t(i, {
                      label: e(n)("carouselSearchHotWordText"),
                      class: "!mb-0"
                    }, {
                      default: d(() => [
                        t(I, {
                          modelValue: a.text,
                          "onUpdate:modelValue": (g) => a.text = g,
                          modelModifiers: { trim: !0 },
                          placeholder: e(n)("carouselSearchHotWordTextPlaceholder"),
                          clearable: "",
                          maxlength: "4",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    r("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (g) => e(l).editComponent.search.hotWord.list.splice(w, 1)
                    }, [
                      t(z, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, Je)
                  ]))), 128)),
                  y(t(v, {
                    class: "w-full",
                    onClick: ue
                  }, {
                    default: d(() => [
                      b(s(e(n)("carouselSearchAddHotWordItem")), 1)
                    ]),
                    _: 1
                  }, 512), [
                    [S, e(l).editComponent.search.hotWord.list.length < 50]
                  ])
                ], 512)
              ]),
              _: 1
            })
          ]),
          t(ye, {
            modelValue: q.value,
            "onUpdate:modelValue": o[19] || (o[19] = (a) => q.value = a),
            onChange: pe,
            class: "collapse-wrap"
          }, {
            default: d(() => [
              t(oe, {
                title: e(n)("carouselSearchTabSet"),
                name: "tab"
              }, {
                default: d(() => [
                  r("div", Ke, [
                    t(x, {
                      "label-width": "100px",
                      class: "px-[10px]",
                      onSubmit: o[16] || (o[16] = $(() => {
                      }, ["prevent"]))
                    }, {
                      default: d(() => [
                        t(i, {
                          label: e(n)("carouselSearchTabControl")
                        }, {
                          default: d(() => [
                            t(te, {
                              modelValue: e(l).editComponent.tab.control,
                              "onUpdate:modelValue": o[11] || (o[11] = (a) => e(l).editComponent.tab.control = a)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        r("p", Qe, s(e(n)("dragMouseAdjustOrder")), 1),
                        r("div", {
                          ref_key: "tabBoxRef",
                          ref: K
                        }, [
                          (C(!0), _(P, null, E(e(l).editComponent.tab.list, (a, w) => (C(), _("div", {
                            key: a.id,
                            class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                          }, [
                            t(i, {
                              label: e(n)("carouselSearchTabCategoryText")
                            }, {
                              default: d(() => [
                                t(I, {
                                  modelValue: a.text,
                                  "onUpdate:modelValue": (g) => a.text = g,
                                  modelModifiers: { trim: !0 },
                                  placeholder: e(n)("carouselSearchTabCategoryTextPlaceholder"),
                                  clearable: "",
                                  maxlength: "4",
                                  "show-word-limit": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                              ]),
                              _: 2
                            }, 1032, ["label"]),
                            t(i, {
                              label: e(n)("dataSources")
                            }, {
                              default: d(() => [
                                t(I, {
                                  modelValue: a.diy_title,
                                  "onUpdate:modelValue": (g) => a.diy_title = g,
                                  modelModifiers: { trim: !0 },
                                  placeholder: e(n)("selectDiyPagePlaceholder"),
                                  readonly: "",
                                  class: "select-diy-page-input",
                                  onClick: (g) => fe(w)
                                }, {
                                  suffix: d(() => [
                                    r("div", {
                                      onClick: $((g) => me(w), ["stop"])
                                    }, [
                                      a.diy_title ? (C(), A(M, { key: 0 }, {
                                        default: d(() => [
                                          t(xe)
                                        ]),
                                        _: 1
                                      })) : (C(), A(M, { key: 1 }, {
                                        default: d(() => [
                                          t(Y)
                                        ]),
                                        _: 1
                                      }))
                                    ], 8, Xe)
                                  ]),
                                  _: 2
                                }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "onClick"])
                              ]),
                              _: 2
                            }, 1032, ["label"]),
                            y(r("div", {
                              class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                              onClick: (g) => e(l).editComponent.tab.list.splice(w, 1)
                            }, [
                              t(z, {
                                name: "element CircleCloseFilled",
                                color: "#bbb",
                                size: "20px"
                              })
                            ], 8, Ye), [
                              [S, e(l).editComponent.tab.list.length > 1]
                            ])
                          ]))), 128)),
                          y(t(v, {
                            class: "w-full",
                            onClick: ce
                          }, {
                            default: d(() => [
                              b(s(e(n)("carouselSearchAddTabItem")), 1)
                            ]),
                            _: 1
                          }, 512), [
                            [S, e(l).editComponent.tab.list.length < 50]
                          ])
                        ], 512),
                        t(le, {
                          modelValue: T.value,
                          "onUpdate:modelValue": o[15] || (o[15] = (a) => T.value = a),
                          title: e(n)("selectSourcesDiyPage"),
                          width: "1000px",
                          "close-on-press-escape": !0,
                          "destroy-on-close": !0,
                          "close-on-click-modal": !1
                        }, {
                          default: d(() => [
                            y((C(), A(e(Pe), {
                              data: f.data,
                              ref_key: "diyPageTableRef",
                              ref: X,
                              size: "large",
                              height: "490px",
                              onCurrentChange: he,
                              "row-key": "id",
                              "highlight-current-row": ""
                            }, {
                              empty: d(() => [
                                r("span", null, s(f.loading ? "" : e(n)("emptyData")), 1)
                              ]),
                              default: d(() => [
                                t(j, {
                                  prop: "page_title",
                                  label: e(n)("diyPageTitle"),
                                  "min-width": "120"
                                }, null, 8, ["label"]),
                                t(j, {
                                  prop: "addon_name",
                                  label: e(n)("diyPageTypeName"),
                                  "min-width": "80"
                                }, null, 8, ["label"]),
                                t(j, {
                                  prop: "type_name",
                                  label: e(n)("diyPageForAddon"),
                                  "min-width": "80"
                                }, null, 8, ["label"])
                              ]),
                              _: 1
                            }, 8, ["data"])), [
                              [Se, f.loading]
                            ]),
                            r("div", Ze, [
                              t(we, {
                                "current-page": f.page,
                                "onUpdate:currentPage": o[12] || (o[12] = (a) => f.page = a),
                                "page-size": f.limit,
                                "onUpdate:pageSize": o[13] || (o[13] = (a) => f.limit = a),
                                layout: "total, sizes, prev, pager, next, jumper",
                                total: f.total,
                                onSizeChange: H,
                                onCurrentChange: H
                              }, null, 8, ["current-page", "page-size", "total"])
                            ]),
                            r("div", el, [
                              t(v, {
                                type: "primary",
                                onClick: be
                              }, {
                                default: d(() => [
                                  b(s(e(n)("confirm")), 1)
                                ]),
                                _: 1
                              }),
                              t(v, {
                                onClick: o[14] || (o[14] = (a) => T.value = !1)
                              }, {
                                default: d(() => [
                                  b(s(e(n)("cancel")), 1)
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "title"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["title"]),
              t(oe, {
                title: e(n)("carouselSearchSwiperSet"),
                name: "swiper"
              }, {
                default: d(() => [
                  t(x, {
                    "label-width": "100px",
                    class: "px-[10px]"
                  }, {
                    default: d(() => [
                      t(i, {
                        label: e(n)("carouselSearchSwiperControl")
                      }, {
                        default: d(() => [
                          t(te, {
                            modelValue: e(l).editComponent.swiper.control,
                            "onUpdate:modelValue": o[17] || (o[17] = (a) => e(l).editComponent.swiper.control = a)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      t(i, {
                        label: e(n)("carouselSearchSwiperInterval")
                      }, {
                        default: d(() => [
                          t(R, {
                            modelValue: e(l).editComponent.swiper.interval,
                            "onUpdate:modelValue": o[18] || (o[18] = (a) => e(l).editComponent.swiper.interval = a),
                            "show-input": "",
                            size: "small",
                            class: "ml-[10px] diy-nav-slider",
                            min: 1,
                            max: 10
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      r("div", ll, s(e(n)("carouselSearchSwiperTips")), 1),
                      r("div", {
                        ref_key: "imageBoxRef",
                        ref: Q
                      }, [
                        (C(!0), _(P, null, E(e(l).editComponent.swiper.list, (a, w) => (C(), _("div", {
                          key: a.id,
                          class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                        }, [
                          t(i, {
                            label: e(n)("image")
                          }, {
                            default: d(() => [
                              t(Z, {
                                modelValue: a.imageUrl,
                                "onUpdate:modelValue": (g) => a.imageUrl = g,
                                limit: 1,
                                onChange: ge
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["label"]),
                          y(r("div", {
                            class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                            onClick: (g) => e(l).editComponent.swiper.list.splice(w, 1)
                          }, [
                            t(z, {
                              name: "element CircleCloseFilled",
                              color: "#bbb",
                              size: "20px"
                            })
                          ], 8, tl), [
                            [S, e(l).editComponent.swiper.list.length > 1]
                          ]),
                          t(i, {
                            label: e(n)("link")
                          }, {
                            default: d(() => [
                              t(ee, {
                                modelValue: a.link,
                                "onUpdate:modelValue": (g) => a.link = g
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["label"])
                        ]))), 128))
                      ], 512),
                      y(t(v, {
                        class: "w-full",
                        onClick: Ce
                      }, {
                        default: d(() => [
                          b(s(e(n)("addImageAd")), 1)
                        ]),
                        _: 1
                      }, 512), [
                        [S, e(l).editComponent.swiper.list.length < 10]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 512), [
          [S, e(l).editTab == "content"]
        ]),
        y(r("div", ol, [
          e(l).editComponent.search.style == "style-2" ? (C(), _("div", al, [
            r("h3", nl, s(e(n)("carouselSearchPositionStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchTextColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.positionColor,
                      "onUpdate:modelValue": o[20] || (o[20] = (a) => e(l).editComponent.search.positionColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])) : D("", !0),
          e(l).editComponent.search.style == "style-2" ? (C(), _("div", dl, [
            r("h3", il, s(e(n)("carouselSearchSubTitleStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchTextColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.subTitle.textColor,
                      "onUpdate:modelValue": o[21] || (o[21] = (a) => e(l).editComponent.search.subTitle.textColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("carouselSearchBgColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.subTitle.startColor,
                      "onUpdate:modelValue": o[22] || (o[22] = (a) => e(l).editComponent.search.subTitle.startColor = a),
                      predefine: e(l).predefineColors,
                      "show-alpha": ""
                    }, null, 8, ["modelValue", "predefine"]),
                    t(z, {
                      name: "iconfont iconmap-connect",
                      size: "20px",
                      class: "block !text-gray-400 mx-[5px]"
                    }),
                    t(c, {
                      modelValue: e(l).editComponent.search.subTitle.endColor,
                      "onUpdate:modelValue": o[23] || (o[23] = (a) => e(l).editComponent.search.subTitle.endColor = a),
                      predefine: e(l).predefineColors,
                      "show-alpha": ""
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])) : D("", !0),
          r("div", rl, [
            r("h3", sl, s(e(n)("carouselSearchStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchTextColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.color,
                      "onUpdate:modelValue": o[24] || (o[24] = (a) => e(l).editComponent.search.color = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("carouselSearchBgColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.bgColor,
                      "onUpdate:modelValue": o[25] || (o[25] = (a) => e(l).editComponent.search.bgColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("carouselSearchBtnColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.btnColor,
                      "onUpdate:modelValue": o[26] || (o[26] = (a) => e(l).editComponent.search.btnColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("carouselSearchBtnBgColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.btnBgColor,
                      "onUpdate:modelValue": o[27] || (o[27] = (a) => e(l).editComponent.search.btnBgColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          r("div", pl, [
            r("h3", ul, s(e(n)("carouselSearchTabStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("noColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.noColor,
                      "onUpdate:modelValue": o[28] || (o[28] = (a) => e(l).editComponent.tab.noColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("selectColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.selectColor,
                      "onUpdate:modelValue": o[29] || (o[29] = (a) => e(l).editComponent.tab.selectColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("fixedNoColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.fixedNoColor,
                      "onUpdate:modelValue": o[30] || (o[30] = (a) => e(l).editComponent.tab.fixedNoColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("fixedSelectColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.fixedSelectColor,
                      "onUpdate:modelValue": o[31] || (o[31] = (a) => e(l).editComponent.tab.fixedSelectColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          r("div", ml, [
            r("h3", cl, s(e(n)("carouselSearchSwiperSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchSwiperStyle"),
                  onChange: _e
                }, {
                  default: d(() => [
                    t(m, {
                      modelValue: e(l).editComponent.swiper.swiperStyle,
                      "onUpdate:modelValue": o[32] || (o[32] = (a) => e(l).editComponent.swiper.swiperStyle = a)
                    }, {
                      default: d(() => [
                        t(u, { label: "style-1" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "style-2" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "style-3" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchSwiperIndicatorStyle3")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("topRounded")
                }, {
                  default: d(() => [
                    t(R, {
                      modelValue: e(l).editComponent.swiper.topRounded,
                      "onUpdate:modelValue": o[33] || (o[33] = (a) => e(l).editComponent.swiper.topRounded = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("bottomRounded")
                }, {
                  default: d(() => [
                    t(R, {
                      modelValue: e(l).editComponent.swiper.bottomRounded,
                      "onUpdate:modelValue": o[34] || (o[34] = (a) => e(l).editComponent.swiper.bottomRounded = a),
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
          r("div", hl, [
            r("h3", bl, s(e(n)("carouselSearchSwiperIndicatorSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: d(() => [
                t(i, {
                  label: e(n)("carouselSearchSwiperIndicatorStyle")
                }, {
                  default: d(() => [
                    t(m, {
                      modelValue: e(l).editComponent.swiper.indicatorStyle,
                      "onUpdate:modelValue": o[35] || (o[35] = (a) => e(l).editComponent.swiper.indicatorStyle = a)
                    }, {
                      default: d(() => [
                        t(u, { label: "style-1" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "style-2" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "style-3" }, {
                          default: d(() => [
                            b(s(e(n)("carouselSearchSwiperIndicatorStyle3")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("carouselSearchSwiperIndicatorAlign")
                }, {
                  default: d(() => [
                    t(m, {
                      modelValue: e(l).editComponent.swiper.indicatorAlign,
                      "onUpdate:modelValue": o[36] || (o[36] = (a) => e(l).editComponent.swiper.indicatorAlign = a)
                    }, {
                      default: d(() => [
                        t(u, { label: "left" }, {
                          default: d(() => [
                            b(s(e(n)("alignLeft")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "center" }, {
                          default: d(() => [
                            b(s(e(n)("alignCenter")), 1)
                          ]),
                          _: 1
                        }),
                        t(u, { label: "right" }, {
                          default: d(() => [
                            b(s(e(n)("alignRight")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("noColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.swiper.indicatorColor,
                      "onUpdate:modelValue": o[37] || (o[37] = (a) => e(l).editComponent.swiper.indicatorColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(n)("selectColor")
                }, {
                  default: d(() => [
                    t(c, {
                      modelValue: e(l).editComponent.swiper.indicatorActiveColor,
                      "onUpdate:modelValue": o[38] || (o[38] = (a) => e(l).editComponent.swiper.indicatorActiveColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [S, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Sl as _
};
