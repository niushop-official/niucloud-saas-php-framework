import { defineComponent as Ve, reactive as F, ref as k, onMounted as ae, nextTick as ve, watch as ke, resolveComponent as h, resolveDirective as Ue, openBlock as C, createElementBlock as _, Fragment as P, withDirectives as y, createElementVNode as r, toDisplayString as p, unref as e, createVNode as t, withCtx as i, createTextVNode as b, createCommentVNode as D, vShow as S, withModifiers as $, createBlock as A, renderList as E, normalizeClass as Te } from "vue";
import { t as n, b6 as L, b7 as Ie, i as ne } from "./core-shared-ca1fcae5.js";
import { u as We } from "./diy-f8acd48b.js";
import { ElTable as Pe } from "element-plus";
import { r as O } from "./range-47374eec.js";
import { c as Be } from "./cloneDeep-70d647ec.js";
const Re = { class: "content-wrap" }, ze = { class: "edit-attr-item-wrap" }, De = { class: "mb-[10px]" }, Ae = {
  key: 0,
  class: "text-sm text-gray-400 mb-[10px]"
}, Ee = { class: "edit-attr-item-wrap" }, He = { class: "mb-[10px]" }, Ne = { class: "text-sm text-gray-400 mb-[10px]" }, Me = { class: "text-sm text-gray-400 mt-[10px] leading-[1.5]" }, je = { class: "flex flex-wrap" }, Fe = ["onClick"], $e = ["src"], Le = { class: "dialog-footer" }, Oe = { class: "edit-attr-item-wrap mb-[20px]" }, Ge = { class: "mb-[10px]" }, qe = { class: "text-sm text-gray-400 mb-[10px]" }, Je = ["onClick"], Ke = { class: "edit-attr-item-wrap" }, Qe = { class: "text-sm text-gray-400 mb-[10px]" }, Xe = ["onClick"], Ye = ["onClick"], Ze = { class: "mt-[16px] flex justify-end" }, el = { class: "flex items-center justify-end mt-[15px]" }, ll = { class: "text-sm text-gray-400 mb-[10px]" }, tl = ["onClick"], ol = { class: "style-wrap" }, al = {
  key: 0,
  class: "edit-attr-item-wrap"
}, nl = { class: "mb-[10px]" }, il = {
  key: 1,
  class: "edit-attr-item-wrap"
}, dl = { class: "mb-[10px]" }, rl = { class: "edit-attr-item-wrap" }, sl = { class: "mb-[10px]" }, pl = { class: "edit-attr-item-wrap" }, ul = { class: "mb-[10px]" }, ml = { class: "edit-attr-item-wrap" }, cl = { class: "mb-[10px]" }, hl = { class: "edit-attr-item-wrap" }, bl = { class: "mb-[10px]" }, fl = /* @__PURE__ */ Ve({
  __name: "edit-carousel-search",
  setup(Cl, { expose: ie }) {
    const l = We();
    l.editComponent.ignore = ["componentBgColor", "componentBgUrl", "marginTop", "marginBottom", "topRounded", "bottomRounded", "pageBgColor", "marginBoth"], l.editComponent.verify = (u) => {
      const o = { code: !0, message: "" };
      return l.value[u].search.hotWord.list.forEach((s) => {
        if (s.text == "")
          return o.code = !1, o.message = n("carouselSearchHotWordTextPlaceholder"), o;
      }), l.value[u].tab.list.forEach((s) => {
        if (s.text == "")
          return o.code = !1, o.message = n("carouselSearchTabCategoryTextPlaceholder"), o;
      }), l.value[u].swiper.control && l.value[u].swiper.list.forEach((s) => {
        if (s.imageUrl == "")
          return o.code = !1, o.message = n("imageUrlTip"), o;
      }), o;
    };
    const V = F({
      title: l.editComponent.search.styleName,
      value: l.editComponent.search.style
    }), U = k(!1), G = () => {
      U.value = !0, V.title = l.editComponent.search.styleName, V.value = l.editComponent.search.style;
    }, de = (u) => {
      V.title = u.title, V.value = u.value;
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
    l.editComponent.search.hotWord.list.forEach((u) => {
      u.id || (u.id = l.generateRandom());
    }), l.editComponent.tab.list.forEach((u) => {
      u.id || (u.id = l.generateRandom());
    }), l.editComponent.swiper.list.forEach((u) => {
      u.id || (u.id = l.generateRandom());
    });
    const q = k(["tab", "swiper"]), pe = (u) => {
    };
    ae(() => {
      H();
    });
    const ue = () => {
      l.editComponent.search.hotWord.list.push({
        id: l.generateRandom(),
        text: "关键词"
      });
    }, me = (u) => {
      l.editComponent.tab.list[u].diy_id = 0, l.editComponent.tab.list[u].diy_title = "";
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
        L.create(J.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (s) => {
            const m = l.editComponent.search.hotWord.list[s.oldIndex];
            l.editComponent.search.hotWord.list.splice(s.oldIndex, 1), l.editComponent.search.hotWord.list.splice(s.newIndex, 0, m), u.sort(
              O(l.editComponent.search.hotWord.list.length).map((d) => d.toString())
            );
          }
        });
        const u = L.create(K.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (s) => {
            const m = l.editComponent.tab.list[s.oldIndex];
            l.editComponent.tab.list.splice(s.oldIndex, 1), l.editComponent.tab.list.splice(s.newIndex, 0, m), u.sort(
              O(l.editComponent.tab.list.length).map((d) => d.toString())
            );
          }
        }), o = L.create(Q.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (s) => {
            const m = l.editComponent.swiper.list[s.oldIndex];
            l.editComponent.swiper.list.splice(s.oldIndex, 1), l.editComponent.swiper.list.splice(s.newIndex, 0, m), o.sort(
              O(l.editComponent.swiper.list.length).map((d) => d.toString())
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
    }), X = k(), H = (u = 1) => {
      f.loading = !0, f.page = u, Ie({
        page: f.page,
        limit: f.limit,
        ...f.searchParam
      }).then((o) => {
        f.loading = !1;
        const s = o.data.data;
        let m = [], d = 0;
        if (l.id)
          for (let c = 0; c < s.length; c++)
            s[c].id == l.id ? d++ : m.push(s[c]);
        else
          m = Be(s);
        d && (o.data.total = o.data.total - d), f.data = m, f.total = o.data.total;
      }).catch(() => {
        f.loading = !1;
      });
    };
    let I = {}, N = 0;
    const he = (u) => {
      I = u;
    }, be = () => {
      l.editComponent.tab.list[N].diy_id = I.id, l.editComponent.tab.list[N].diy_title = I.title, T.value = !1;
    }, fe = (u) => {
      T.value = !0, N = u, I && setTimeout(() => {
        X.value.setCurrentRow(I);
      }, 200);
    };
    ke(
      () => l.editComponent.swiper.list,
      (u, o) => {
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
    }, ge = (u) => {
      B(!0);
    }, _e = (u) => {
      B(!0);
    }, B = (u = !1) => {
      l.editComponent.swiper.list.forEach((o, s) => {
        const m = new Image();
        m.src = ne(o.imageUrl), m.onload = async () => {
          if (o.imgWidth = m.width, o.imgHeight = m.height, u && s == 0) {
            const d = o.imgHeight / o.imgWidth;
            l.editComponent.swiper.swiperStyle == "style-1" ? o.width = 375 * 0.92 : o.width = 355, o.height = o.width * d, l.editComponent.swiper.imageHeight = parseInt(o.height);
          }
        };
      });
    };
    return ie({}), (u, o) => {
      const s = h("el-radio"), m = h("el-radio-group"), d = h("el-form-item"), c = h("el-color-picker"), x = h("el-form"), Y = h("ArrowRight"), M = h("el-icon"), W = h("el-input"), Z = h("upload-image"), ee = h("diy-link"), v = h("el-button"), le = h("el-dialog"), R = h("el-slider"), z = h("icon"), te = h("el-switch"), xe = h("Close"), j = h("el-table-column"), we = h("el-pagination"), oe = h("el-collapse-item"), ye = h("el-collapse"), Se = Ue("loading");
      return C(), _(P, null, [
        y(r("div", Re, [
          r("div", ze, [
            r("h3", De, p(e(n)("carouselSearchShowPosition")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchShowWay")
                }, {
                  default: i(() => [
                    t(m, {
                      modelValue: e(l).editComponent.positionWay,
                      "onUpdate:modelValue": o[0] || (o[0] = (a) => e(l).editComponent.positionWay = a)
                    }, {
                      default: i(() => [
                        t(s, { label: "static" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchShowWayStatic")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "fixed" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchShowWayFixed")), 1)
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
                y(t(d, {
                  label: e(n)("carouselSearchFixedBgColor")
                }, {
                  default: i(() => [
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
                t(d, {
                  label: e(n)("carouselSearchBgGradient")
                }, {
                  default: i(() => [
                    t(m, {
                      modelValue: e(l).editComponent.bgGradient,
                      "onUpdate:modelValue": o[2] || (o[2] = (a) => e(l).editComponent.bgGradient = a)
                    }, {
                      default: i(() => [
                        t(s, { label: !0 }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchOpen")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: !1 }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchClose")), 1)
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
            r("h3", He, p(e(n)("carouselSearchSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: o[7] || (o[7] = $(() => {
              }, ["prevent"]))
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("selectStyle"),
                  class: "flex"
                }, {
                  default: i(() => [
                    r("span", {
                      class: "text-primary flex-1 cursor-pointer",
                      onClick: G
                    }, p(e(l).editComponent.search.styleName), 1),
                    t(M, {
                      onClick: G,
                      class: "cursor-pointer"
                    }, {
                      default: i(() => [
                        t(Y)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(l).editComponent.search.style == "style-2" ? (C(), A(d, {
                  key: 0,
                  label: e(n)("carouselSearchSubTitle")
                }, {
                  default: i(() => [
                    t(W, {
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
                t(d, {
                  label: e(n)("logo")
                }, {
                  default: i(() => [
                    t(Z, {
                      modelValue: e(l).editComponent.search.logo,
                      "onUpdate:modelValue": o[4] || (o[4] = (a) => e(l).editComponent.search.logo = a),
                      limit: 1
                    }, null, 8, ["modelValue"]),
                    r("div", Ne, p(e(n)("carouselSearchLogoTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("carouselSearchText")
                }, {
                  default: i(() => [
                    r("div", null, [
                      t(W, {
                        modelValue: e(l).editComponent.search.text,
                        "onUpdate:modelValue": o[5] || (o[5] = (a) => e(l).editComponent.search.text = a),
                        modelModifiers: { trim: !0 },
                        placeholder: e(n)("carouselSearchPlaceholder"),
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      r("p", Me, p(e(n)("carouselSearchTextTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("link")
                }, {
                  default: i(() => [
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
              footer: i(() => [
                r("span", Le, [
                  t(v, {
                    onClick: o[8] || (o[8] = (a) => U.value = !1)
                  }, {
                    default: i(() => [
                      b(p(e(n)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  t(v, {
                    type: "primary",
                    onClick: re
                  }, {
                    default: i(() => [
                      b(p(e(n)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: i(() => [
                r("div", je, [
                  (C(!0), _(P, null, E(se, (a, w) => (C(), _("div", {
                    key: w,
                    class: Te([{ "border-primary": V.value == a.value }, "flex items-center justify-center overflow-hidden w-[200px] h-[100px] m-[6px] cursor-pointer border bg-[#eee]"]),
                    onClick: (g) => de(a)
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
            r("h3", Ge, p(e(n)("carouselSearchHotWordSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchHotWordInterval")
                }, {
                  default: i(() => [
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
                r("p", qe, p(e(n)("dragMouseAdjustOrder")), 1),
                r("div", {
                  ref_key: "searchHotWordTabBoxRef",
                  ref: J
                }, [
                  (C(!0), _(P, null, E(e(l).editComponent.search.hotWord.list, (a, w) => (C(), _("div", {
                    key: a.id,
                    class: "item-wrap p-[10px] relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    t(d, {
                      label: e(n)("carouselSearchHotWordText"),
                      class: "!mb-0"
                    }, {
                      default: i(() => [
                        t(W, {
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
                    default: i(() => [
                      b(p(e(n)("carouselSearchAddHotWordItem")), 1)
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
            default: i(() => [
              t(oe, {
                title: e(n)("carouselSearchTabSet"),
                name: "tab"
              }, {
                default: i(() => [
                  r("div", Ke, [
                    t(x, {
                      "label-width": "100px",
                      class: "px-[10px]",
                      onSubmit: o[16] || (o[16] = $(() => {
                      }, ["prevent"]))
                    }, {
                      default: i(() => [
                        t(d, {
                          label: e(n)("carouselSearchTabControl")
                        }, {
                          default: i(() => [
                            t(te, {
                              modelValue: e(l).editComponent.tab.control,
                              "onUpdate:modelValue": o[11] || (o[11] = (a) => e(l).editComponent.tab.control = a)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        r("p", Qe, p(e(n)("dragMouseAdjustOrder")), 1),
                        r("div", {
                          ref_key: "tabBoxRef",
                          ref: K
                        }, [
                          (C(!0), _(P, null, E(e(l).editComponent.tab.list, (a, w) => (C(), _("div", {
                            key: a.id,
                            class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                          }, [
                            t(d, {
                              label: e(n)("carouselSearchTabCategoryText")
                            }, {
                              default: i(() => [
                                t(W, {
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
                            t(d, {
                              label: e(n)("dataSources")
                            }, {
                              default: i(() => [
                                t(W, {
                                  modelValue: a.diy_title,
                                  "onUpdate:modelValue": (g) => a.diy_title = g,
                                  modelModifiers: { trim: !0 },
                                  placeholder: e(n)("selectDiyPagePlaceholder"),
                                  readonly: "",
                                  class: "select-diy-page-input",
                                  onClick: (g) => fe(w)
                                }, {
                                  suffix: i(() => [
                                    r("div", {
                                      onClick: $((g) => me(w), ["stop"])
                                    }, [
                                      a.diy_title ? (C(), A(M, { key: 0 }, {
                                        default: i(() => [
                                          t(xe)
                                        ]),
                                        _: 1
                                      })) : (C(), A(M, { key: 1 }, {
                                        default: i(() => [
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
                            default: i(() => [
                              b(p(e(n)("carouselSearchAddTabItem")), 1)
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
                          default: i(() => [
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
                              empty: i(() => [
                                r("span", null, p(f.loading ? "" : e(n)("emptyData")), 1)
                              ]),
                              default: i(() => [
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
                                default: i(() => [
                                  b(p(e(n)("confirm")), 1)
                                ]),
                                _: 1
                              }),
                              t(v, {
                                onClick: o[14] || (o[14] = (a) => T.value = !1)
                              }, {
                                default: i(() => [
                                  b(p(e(n)("cancel")), 1)
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
                default: i(() => [
                  t(x, {
                    "label-width": "100px",
                    class: "px-[10px]"
                  }, {
                    default: i(() => [
                      t(d, {
                        label: e(n)("carouselSearchSwiperControl")
                      }, {
                        default: i(() => [
                          t(te, {
                            modelValue: e(l).editComponent.swiper.control,
                            "onUpdate:modelValue": o[17] || (o[17] = (a) => e(l).editComponent.swiper.control = a)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      t(d, {
                        label: e(n)("carouselSearchSwiperInterval")
                      }, {
                        default: i(() => [
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
                      r("div", ll, p(e(n)("carouselSearchSwiperTips")), 1),
                      r("div", {
                        ref_key: "imageBoxRef",
                        ref: Q
                      }, [
                        (C(!0), _(P, null, E(e(l).editComponent.swiper.list, (a, w) => (C(), _("div", {
                          key: a.id,
                          class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                        }, [
                          t(d, {
                            label: e(n)("image")
                          }, {
                            default: i(() => [
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
                          t(d, {
                            label: e(n)("link")
                          }, {
                            default: i(() => [
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
                        default: i(() => [
                          b(p(e(n)("addImageAd")), 1)
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
            r("h3", nl, p(e(n)("carouselSearchPositionStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchTextColor")
                }, {
                  default: i(() => [
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
          e(l).editComponent.search.style == "style-2" ? (C(), _("div", il, [
            r("h3", dl, p(e(n)("carouselSearchSubTitleStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchTextColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.subTitle.textColor,
                      "onUpdate:modelValue": o[21] || (o[21] = (a) => e(l).editComponent.search.subTitle.textColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("carouselSearchBgColor")
                }, {
                  default: i(() => [
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
            r("h3", sl, p(e(n)("carouselSearchStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchTextColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.color,
                      "onUpdate:modelValue": o[24] || (o[24] = (a) => e(l).editComponent.search.color = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("carouselSearchBgColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.bgColor,
                      "onUpdate:modelValue": o[25] || (o[25] = (a) => e(l).editComponent.search.bgColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("carouselSearchBtnColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.search.btnColor,
                      "onUpdate:modelValue": o[26] || (o[26] = (a) => e(l).editComponent.search.btnColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("carouselSearchBtnBgColor")
                }, {
                  default: i(() => [
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
            r("h3", ul, p(e(n)("carouselSearchTabStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("noColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.noColor,
                      "onUpdate:modelValue": o[28] || (o[28] = (a) => e(l).editComponent.tab.noColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("selectColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.selectColor,
                      "onUpdate:modelValue": o[29] || (o[29] = (a) => e(l).editComponent.tab.selectColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("fixedNoColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.tab.fixedNoColor,
                      "onUpdate:modelValue": o[30] || (o[30] = (a) => e(l).editComponent.tab.fixedNoColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("fixedSelectColor")
                }, {
                  default: i(() => [
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
            r("h3", cl, p(e(n)("carouselSearchSwiperSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchSwiperStyle"),
                  onChange: _e
                }, {
                  default: i(() => [
                    t(m, {
                      modelValue: e(l).editComponent.swiper.swiperStyle,
                      "onUpdate:modelValue": o[32] || (o[32] = (a) => e(l).editComponent.swiper.swiperStyle = a)
                    }, {
                      default: i(() => [
                        t(s, { label: "style-1" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "style-2" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "style-3" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchSwiperIndicatorStyle3")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("topRounded")
                }, {
                  default: i(() => [
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
                t(d, {
                  label: e(n)("bottomRounded")
                }, {
                  default: i(() => [
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
            r("h3", bl, p(e(n)("carouselSearchSwiperIndicatorSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                t(d, {
                  label: e(n)("carouselSearchSwiperIndicatorStyle")
                }, {
                  default: i(() => [
                    t(m, {
                      modelValue: e(l).editComponent.swiper.indicatorStyle,
                      "onUpdate:modelValue": o[35] || (o[35] = (a) => e(l).editComponent.swiper.indicatorStyle = a)
                    }, {
                      default: i(() => [
                        t(s, { label: "style-1" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "style-2" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "style-3" }, {
                          default: i(() => [
                            b(p(e(n)("carouselSearchSwiperIndicatorStyle3")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("carouselSearchSwiperIndicatorAlign")
                }, {
                  default: i(() => [
                    t(m, {
                      modelValue: e(l).editComponent.swiper.indicatorAlign,
                      "onUpdate:modelValue": o[36] || (o[36] = (a) => e(l).editComponent.swiper.indicatorAlign = a)
                    }, {
                      default: i(() => [
                        t(s, { label: "left" }, {
                          default: i(() => [
                            b(p(e(n)("alignLeft")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "center" }, {
                          default: i(() => [
                            b(p(e(n)("alignCenter")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, { label: "right" }, {
                          default: i(() => [
                            b(p(e(n)("alignRight")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("noColor")
                }, {
                  default: i(() => [
                    t(c, {
                      modelValue: e(l).editComponent.swiper.indicatorColor,
                      "onUpdate:modelValue": o[37] || (o[37] = (a) => e(l).editComponent.swiper.indicatorColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(d, {
                  label: e(n)("selectColor")
                }, {
                  default: i(() => [
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
const Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Vl as _
};
