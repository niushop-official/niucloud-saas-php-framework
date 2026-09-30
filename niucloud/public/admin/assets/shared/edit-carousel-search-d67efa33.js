import { defineComponent as De, computed as k, reactive as J, ref as U, onMounted as se, nextTick as ze, watch as Ee, resolveComponent as c, resolveDirective as Ae, openBlock as C, createElementBlock as w, Fragment as B, withDirectives as y, createElementVNode as s, toDisplayString as p, unref as e, createVNode as t, withModifiers as M, withCtx as n, isRef as pe, createBlock as H, createCommentVNode as D, createTextVNode as h, vShow as V, renderList as N, normalizeClass as Me } from "vue";
import { t as d, be as Q, bf as Ne, j as ue } from "./core-shared-c6ad4e77.js";
import { u as je } from "./diy-452683aa.js";
import { useRoute as Fe } from "vue-router";
import { ElTable as $e } from "element-plus";
import { r as X, c as Oe } from "./lodash-8c6c2daa.js";
const Le = { class: "content-wrap" }, Ge = { class: "edit-attr-item-wrap" }, Ke = { class: "mb-[10px]" }, qe = { class: "text-sm text-gray-400 leading-[1.5]" }, Je = { class: "edit-attr-item-wrap" }, Qe = { class: "mb-[10px]" }, Xe = {
  key: 0,
  class: "text-sm text-gray-400 mb-[10px]"
}, Ye = { class: "edit-attr-item-wrap" }, Ze = { class: "mb-[10px]" }, el = { class: "text-sm text-gray-400 mb-[10px]" }, ll = { class: "text-sm text-gray-400 mt-[10px] leading-[1.5]" }, tl = { class: "flex flex-wrap" }, ol = ["onClick"], al = ["src"], dl = { class: "dialog-footer" }, nl = { class: "edit-attr-item-wrap mb-[20px]" }, il = { class: "mb-[10px]" }, rl = { class: "text-sm text-gray-400 mb-[10px]" }, sl = ["onClick"], pl = { class: "edit-attr-item-wrap" }, ul = { class: "text-sm text-gray-400 mb-[10px]" }, ml = ["onClick"], cl = ["onClick"], hl = { class: "mt-[16px] flex justify-end" }, bl = { class: "flex items-center justify-end mt-[15px]" }, fl = { class: "text-sm text-gray-400 mb-[10px]" }, Cl = ["onClick"], gl = { class: "style-wrap" }, _l = {
  key: 0,
  class: "edit-attr-item-wrap"
}, xl = { class: "mb-[10px]" }, wl = {
  key: 1,
  class: "edit-attr-item-wrap"
}, Sl = { class: "mb-[10px]" }, yl = { class: "edit-attr-item-wrap" }, Vl = { class: "mb-[10px]" }, vl = { class: "edit-attr-item-wrap" }, Tl = { class: "mb-[10px]" }, kl = { class: "edit-attr-item-wrap" }, Ul = { class: "mb-[10px]" }, Il = { class: "edit-attr-item-wrap" }, Pl = { class: "mb-[10px]" }, Wl = /* @__PURE__ */ De({
  __name: "edit-carousel-search",
  setup(Rl, { expose: me }) {
    const l = je(), ce = Fe();
    l.editComponent.ignore = ["componentBgColor", "componentBgUrl", "marginTop", "marginBottom", "topRounded", "bottomRounded", "pageBgColor", "marginBoth"];
    const he = {
      backIsShow: !1,
      // 返回箭头
      titleIsShow: !1,
      // 标题
      title: (() => ({
        mall: "商城"
      })[ce.meta.addon || ""] || "商城")(),
      // 标题文字
      positionIsShow: !0,
      // 地址定位
      textColor: "#333333",
      // 文字颜色
      iconColor: "#333333"
      // 图标颜色
    };
    l.editComponent.header = Object.assign({}, he, l.editComponent.header || {});
    const be = k(() => {
      const r = l.editComponent.search.style;
      return r == "style-1" || r == "style-2" || r == "style-3";
    }), j = k(() => be.value), F = k(() => l.editComponent.search.style == "style-1"), fe = k(() => F.value), $ = k({
      get: () => j.value ? !1 : l.editComponent.header.titleIsShow,
      set: (r) => {
        l.editComponent.header.titleIsShow = r;
      }
    }), O = k({
      get: () => F.value ? !1 : l.editComponent.header.positionIsShow,
      set: (r) => {
        l.editComponent.header.positionIsShow = r;
      }
    }), Ce = k(() => {
      const r = l.editComponent.search.style;
      return r == "style-1" ? "carouselSearchHeaderStyle1Tips" : r == "style-2" ? "carouselSearchHeaderStyle2Tips" : "carouselSearchHeaderTips";
    });
    l.editComponent.verify = (r) => {
      const o = { code: !0, message: "" };
      return l.value[r].search.hotWord.list.forEach((m) => {
        if (m.text == "")
          return o.code = !1, o.message = d("carouselSearchHotWordTextPlaceholder"), o;
      }), l.value[r].tab.list.forEach((m) => {
        if (m.text == "")
          return o.code = !1, o.message = d("carouselSearchTabCategoryTextPlaceholder"), o;
      }), l.value[r].swiper.control && l.value[r].swiper.list.forEach((m) => {
        if (m.imageUrl == "")
          return o.code = !1, o.message = d("imageUrlTip"), o;
      }), o;
    };
    const v = J({
      title: l.editComponent.search.styleName,
      value: l.editComponent.search.style
    }), I = U(!1), Y = () => {
      I.value = !0, v.title = l.editComponent.search.styleName, v.value = l.editComponent.search.style;
    }, ge = (r) => {
      v.title = r.title, v.value = r.value;
    }, _e = () => {
      l.editComponent.search.styleName = v.title, l.editComponent.search.style = v.value, I.value = !1;
    }, xe = J([
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
    l.editComponent.search.hotWord.list.forEach((r) => {
      r.id || (r.id = l.generateRandom());
    }), l.editComponent.tab.list.forEach((r) => {
      r.id || (r.id = l.generateRandom());
    }), l.editComponent.swiper.list.forEach((r) => {
      r.id || (r.id = l.generateRandom());
    });
    const Z = U(["tab", "swiper"]), we = (r) => {
    };
    se(() => {
      L();
    });
    const Se = () => {
      l.editComponent.search.hotWord.list.push({
        id: l.generateRandom(),
        text: "关键词"
      });
    }, ye = (r) => {
      l.editComponent.tab.list[r].diy_id = 0, l.editComponent.tab.list[r].diy_title = "";
    }, Ve = () => {
      l.editComponent.tab.list.push({
        id: l.generateRandom(),
        text: "分类名称",
        // 最多4个字
        source: "diy_page",
        // 数据源类型，微页面：diy_page
        diy_id: "",
        diy_title: ""
      });
    }, ee = U(), le = U(), te = U();
    se(() => {
      ze(() => {
        const r = Q.create(ee.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (i) => {
            const b = l.editComponent.search.hotWord.list[i.oldIndex];
            l.editComponent.search.hotWord.list.splice(i.oldIndex, 1), l.editComponent.search.hotWord.list.splice(i.newIndex, 0, b), o.sort(
              X(l.editComponent.search.hotWord.list.length).map((u) => u.toString())
            );
          }
        }), o = Q.create(le.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (i) => {
            const b = l.editComponent.tab.list[i.oldIndex];
            l.editComponent.tab.list.splice(i.oldIndex, 1), l.editComponent.tab.list.splice(i.newIndex, 0, b), o.sort(
              X(l.editComponent.tab.list.length).map((u) => u.toString())
            );
          }
        }), m = Q.create(te.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (i) => {
            const b = l.editComponent.swiper.list[i.oldIndex];
            l.editComponent.swiper.list.splice(i.oldIndex, 1), l.editComponent.swiper.list.splice(i.newIndex, 0, b), m.sort(
              X(l.editComponent.swiper.list.length).map((u) => u.toString())
            ), z(!0);
          }
        });
      });
    });
    const P = U(!1), f = J({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {}
    }), oe = U(), L = (r = 1) => {
      f.loading = !0, f.page = r, Ne({
        page: f.page,
        limit: f.limit,
        ...f.searchParam
      }).then((o) => {
        f.loading = !1;
        const m = o.data.data;
        let i = [], b = 0;
        if (l.id)
          for (let u = 0; u < m.length; u++)
            m[u].id == l.id ? b++ : i.push(m[u]);
        else
          i = Oe(m);
        b && (o.data.total = o.data.total - b), f.data = i, f.total = o.data.total;
      }).catch(() => {
        f.loading = !1;
      });
    };
    let W = {}, G = 0;
    const ve = (r) => {
      W = r;
    }, Te = () => {
      l.editComponent.tab.list[G].diy_id = W.id, l.editComponent.tab.list[G].diy_title = W.title, P.value = !1;
    }, ke = (r) => {
      P.value = !0, G = r, W && setTimeout(() => {
        oe.value.setCurrentRow(W);
      }, 200);
    };
    Ee(
      () => l.editComponent.swiper.list,
      (r, o) => {
        z();
      },
      { deep: !0 }
    );
    const Ue = () => {
      l.editComponent.swiper.list.push({
        id: l.generateRandom(),
        imageUrl: "",
        imgWidth: 0,
        imgHeight: 0,
        link: { name: "" }
      });
    }, Ie = (r) => {
      z(!0);
    }, Pe = (r) => {
      z(!0);
    }, z = (r = !1) => {
      l.editComponent.swiper.list.forEach((o, m) => {
        const i = new Image();
        i.src = ue(o.imageUrl), i.onload = async () => {
          if (o.imgWidth = i.width, o.imgHeight = i.height, r && m == 0) {
            const b = o.imgHeight / o.imgWidth;
            l.editComponent.swiper.swiperStyle == "style-1" ? o.width = 375 * 0.92 : o.width = 355, o.height = o.width * b, l.editComponent.swiper.imageHeight = parseInt(o.height);
          }
        };
      });
    };
    return me({}), (r, o) => {
      const m = c("el-switch"), i = c("el-form-item"), b = c("el-input"), u = c("el-color-picker"), x = c("el-form"), _ = c("el-radio"), R = c("el-radio-group"), ae = c("ArrowRight"), K = c("el-icon"), de = c("upload-image"), ne = c("diy-link"), T = c("el-button"), ie = c("el-dialog"), E = c("el-slider"), A = c("icon"), We = c("Close"), q = c("el-table-column"), Re = c("el-pagination"), re = c("el-collapse-item"), Be = c("el-collapse"), He = Ae("loading");
      return C(), w(B, null, [
        y(s("div", Le, [
          s("div", Ge, [
            s("h3", Ke, p(e(d)("carouselSearchHeaderSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: o[6] || (o[6] = M(() => {
              }, ["prevent"]))
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchHeaderBackIsShow")
                }, {
                  default: n(() => [
                    t(m, {
                      modelValue: e(l).editComponent.header.backIsShow,
                      "onUpdate:modelValue": o[0] || (o[0] = (a) => e(l).editComponent.header.backIsShow = a)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchHeaderTitleIsShow")
                }, {
                  default: n(() => [
                    t(m, {
                      modelValue: e($),
                      "onUpdate:modelValue": o[1] || (o[1] = (a) => pe($) ? $.value = a : null),
                      disabled: e(j)
                    }, null, 8, ["modelValue", "disabled"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(l).editComponent.header.titleIsShow && !e(j) ? (C(), H(i, {
                  key: 0,
                  label: e(d)("carouselSearchHeaderTitle")
                }, {
                  default: n(() => [
                    t(b, {
                      modelValue: e(l).editComponent.header.title,
                      "onUpdate:modelValue": o[2] || (o[2] = (a) => e(l).editComponent.header.title = a),
                      modelModifiers: { trim: !0 },
                      placeholder: e(d)("carouselSearchHeaderTitlePlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : D("", !0),
                t(i, {
                  label: e(d)("carouselSearchHeaderPositionIsShow")
                }, {
                  default: n(() => [
                    t(m, {
                      modelValue: e(O),
                      "onUpdate:modelValue": o[3] || (o[3] = (a) => pe(O) ? O.value = a : null),
                      disabled: e(F)
                    }, null, 8, ["modelValue", "disabled"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchHeaderTextColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.header.textColor,
                      "onUpdate:modelValue": o[4] || (o[4] = (a) => e(l).editComponent.header.textColor = a),
                      disabled: e(fe),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "disabled", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchHeaderIconColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.header.iconColor,
                      "onUpdate:modelValue": o[5] || (o[5] = (a) => e(l).editComponent.header.iconColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s("div", qe, p(e(d)(e(Ce))), 1)
              ]),
              _: 1
            })
          ]),
          s("div", Je, [
            s("h3", Qe, p(e(d)("carouselSearchShowPosition")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchShowWay")
                }, {
                  default: n(() => [
                    t(R, {
                      modelValue: e(l).editComponent.positionWay,
                      "onUpdate:modelValue": o[7] || (o[7] = (a) => e(l).editComponent.positionWay = a)
                    }, {
                      default: n(() => [
                        t(_, { label: "static" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchShowWayStatic")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "fixed" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchShowWayFixed")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    e(l).editComponent.positionWay == "fixed" ? (C(), w("div", Xe, "滑动页面查看效果")) : D("", !0)
                  ]),
                  _: 1
                }, 8, ["label"]),
                y(t(i, {
                  label: e(d)("carouselSearchFixedBgColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.fixedBgColor,
                      "onUpdate:modelValue": o[8] || (o[8] = (a) => e(l).editComponent.fixedBgColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]), [
                  [V, e(l).editComponent.positionWay == "fixed"]
                ]),
                t(i, {
                  label: e(d)("carouselSearchBgGradient")
                }, {
                  default: n(() => [
                    t(R, {
                      modelValue: e(l).editComponent.bgGradient,
                      "onUpdate:modelValue": o[9] || (o[9] = (a) => e(l).editComponent.bgGradient = a)
                    }, {
                      default: n(() => [
                        t(_, { label: !0 }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchOpen")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: !1 }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchClose")), 1)
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
          s("div", Ye, [
            s("h3", Ze, p(e(d)("carouselSearchSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: o[14] || (o[14] = M(() => {
              }, ["prevent"]))
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("selectStyle"),
                  class: "flex"
                }, {
                  default: n(() => [
                    s("span", {
                      class: "text-primary flex-1 cursor-pointer",
                      onClick: Y
                    }, p(e(l).editComponent.search.styleName), 1),
                    t(K, {
                      onClick: Y,
                      class: "cursor-pointer"
                    }, {
                      default: n(() => [
                        t(ae)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"]),
                e(l).editComponent.search.style == "style-2" ? (C(), H(i, {
                  key: 0,
                  label: e(d)("carouselSearchSubTitle")
                }, {
                  default: n(() => [
                    t(b, {
                      modelValue: e(l).editComponent.search.subTitle.text,
                      "onUpdate:modelValue": o[10] || (o[10] = (a) => e(l).editComponent.search.subTitle.text = a),
                      modelModifiers: { trim: !0 },
                      placeholder: e(d)("carouselSearchSubTitlePlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : D("", !0),
                t(i, {
                  label: e(d)("logo")
                }, {
                  default: n(() => [
                    t(de, {
                      modelValue: e(l).editComponent.search.logo,
                      "onUpdate:modelValue": o[11] || (o[11] = (a) => e(l).editComponent.search.logo = a),
                      limit: 1
                    }, null, 8, ["modelValue"]),
                    s("div", el, p(e(d)("carouselSearchLogoTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchText")
                }, {
                  default: n(() => [
                    s("div", null, [
                      t(b, {
                        modelValue: e(l).editComponent.search.text,
                        "onUpdate:modelValue": o[12] || (o[12] = (a) => e(l).editComponent.search.text = a),
                        modelModifiers: { trim: !0 },
                        placeholder: e(d)("carouselSearchPlaceholder"),
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      s("p", ll, p(e(d)("carouselSearchTextTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("link")
                }, {
                  default: n(() => [
                    t(ne, {
                      modelValue: e(l).editComponent.search.link,
                      "onUpdate:modelValue": o[13] || (o[13] = (a) => e(l).editComponent.search.link = a)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            t(ie, {
              modelValue: I.value,
              "onUpdate:modelValue": o[16] || (o[16] = (a) => I.value = a),
              title: e(d)("selectStyle"),
              width: "500px"
            }, {
              footer: n(() => [
                s("span", dl, [
                  t(T, {
                    onClick: o[15] || (o[15] = (a) => I.value = !1)
                  }, {
                    default: n(() => [
                      h(p(e(d)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  t(T, {
                    type: "primary",
                    onClick: _e
                  }, {
                    default: n(() => [
                      h(p(e(d)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: n(() => [
                s("div", tl, [
                  (C(!0), w(B, null, N(xe, (a, S) => (C(), w("div", {
                    key: S,
                    class: Me([{ "border-primary": v.value == a.value }, "flex items-center justify-center overflow-hidden w-[200px] h-[100px] m-[6px] cursor-pointer border bg-[#eee]"]),
                    onClick: (g) => ge(a)
                  }, [
                    s("img", {
                      src: e(ue)(a.url)
                    }, null, 8, al)
                  ], 10, ol))), 128))
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ]),
          s("div", nl, [
            s("h3", il, p(e(d)("carouselSearchHotWordSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchHotWordInterval")
                }, {
                  default: n(() => [
                    t(E, {
                      modelValue: e(l).editComponent.search.hotWord.interval,
                      "onUpdate:modelValue": o[17] || (o[17] = (a) => e(l).editComponent.search.hotWord.interval = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 1,
                      max: 10
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s("p", rl, p(e(d)("dragMouseAdjustOrder")), 1),
                s("div", {
                  ref_key: "searchHotWordTabBoxRef",
                  ref: ee
                }, [
                  (C(!0), w(B, null, N(e(l).editComponent.search.hotWord.list, (a, S) => (C(), w("div", {
                    key: a.id,
                    class: "item-wrap p-[10px] relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    t(i, {
                      label: e(d)("carouselSearchHotWordText"),
                      class: "!mb-0"
                    }, {
                      default: n(() => [
                        t(b, {
                          modelValue: a.text,
                          "onUpdate:modelValue": (g) => a.text = g,
                          modelModifiers: { trim: !0 },
                          placeholder: e(d)("carouselSearchHotWordTextPlaceholder"),
                          clearable: "",
                          maxlength: "4",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    s("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (g) => e(l).editComponent.search.hotWord.list.splice(S, 1)
                    }, [
                      t(A, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, sl)
                  ]))), 128)),
                  y(t(T, {
                    class: "w-full",
                    onClick: Se
                  }, {
                    default: n(() => [
                      h(p(e(d)("carouselSearchAddHotWordItem")), 1)
                    ]),
                    _: 1
                  }, 512), [
                    [V, e(l).editComponent.search.hotWord.list.length < 50]
                  ])
                ], 512)
              ]),
              _: 1
            })
          ]),
          t(Be, {
            modelValue: Z.value,
            "onUpdate:modelValue": o[26] || (o[26] = (a) => Z.value = a),
            onChange: we,
            class: "collapse-wrap"
          }, {
            default: n(() => [
              t(re, {
                title: e(d)("carouselSearchTabSet"),
                name: "tab"
              }, {
                default: n(() => [
                  s("div", pl, [
                    t(x, {
                      "label-width": "100px",
                      class: "px-[10px]",
                      onSubmit: o[23] || (o[23] = M(() => {
                      }, ["prevent"]))
                    }, {
                      default: n(() => [
                        t(i, {
                          label: e(d)("carouselSearchTabControl")
                        }, {
                          default: n(() => [
                            t(m, {
                              modelValue: e(l).editComponent.tab.control,
                              "onUpdate:modelValue": o[18] || (o[18] = (a) => e(l).editComponent.tab.control = a)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        s("p", ul, p(e(d)("dragMouseAdjustOrder")), 1),
                        s("div", {
                          ref_key: "tabBoxRef",
                          ref: le
                        }, [
                          (C(!0), w(B, null, N(e(l).editComponent.tab.list, (a, S) => (C(), w("div", {
                            key: a.id,
                            class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                          }, [
                            t(i, {
                              label: e(d)("carouselSearchTabCategoryText")
                            }, {
                              default: n(() => [
                                t(b, {
                                  modelValue: a.text,
                                  "onUpdate:modelValue": (g) => a.text = g,
                                  modelModifiers: { trim: !0 },
                                  placeholder: e(d)("carouselSearchTabCategoryTextPlaceholder"),
                                  clearable: "",
                                  maxlength: "4",
                                  "show-word-limit": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                              ]),
                              _: 2
                            }, 1032, ["label"]),
                            t(i, {
                              label: e(d)("dataSources")
                            }, {
                              default: n(() => [
                                t(b, {
                                  modelValue: a.diy_title,
                                  "onUpdate:modelValue": (g) => a.diy_title = g,
                                  modelModifiers: { trim: !0 },
                                  placeholder: e(d)("selectDiyPagePlaceholder"),
                                  readonly: "",
                                  class: "select-diy-page-input",
                                  onClick: (g) => ke(S)
                                }, {
                                  suffix: n(() => [
                                    s("div", {
                                      onClick: M((g) => ye(S), ["stop"])
                                    }, [
                                      a.diy_title ? (C(), H(K, { key: 0 }, {
                                        default: n(() => [
                                          t(We)
                                        ]),
                                        _: 1
                                      })) : (C(), H(K, { key: 1 }, {
                                        default: n(() => [
                                          t(ae)
                                        ]),
                                        _: 1
                                      }))
                                    ], 8, ml)
                                  ]),
                                  _: 2
                                }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "onClick"])
                              ]),
                              _: 2
                            }, 1032, ["label"]),
                            y(s("div", {
                              class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                              onClick: (g) => e(l).editComponent.tab.list.splice(S, 1)
                            }, [
                              t(A, {
                                name: "element CircleCloseFilled",
                                color: "#bbb",
                                size: "20px"
                              })
                            ], 8, cl), [
                              [V, e(l).editComponent.tab.list.length > 1]
                            ])
                          ]))), 128)),
                          y(t(T, {
                            class: "w-full",
                            onClick: Ve
                          }, {
                            default: n(() => [
                              h(p(e(d)("carouselSearchAddTabItem")), 1)
                            ]),
                            _: 1
                          }, 512), [
                            [V, e(l).editComponent.tab.list.length < 50]
                          ])
                        ], 512),
                        t(ie, {
                          modelValue: P.value,
                          "onUpdate:modelValue": o[22] || (o[22] = (a) => P.value = a),
                          title: e(d)("selectSourcesDiyPage"),
                          width: "1000px",
                          "close-on-press-escape": !0,
                          "destroy-on-close": !0,
                          "close-on-click-modal": !1
                        }, {
                          default: n(() => [
                            y((C(), H(e($e), {
                              data: f.data,
                              ref_key: "diyPageTableRef",
                              ref: oe,
                              size: "large",
                              height: "490px",
                              onCurrentChange: ve,
                              "row-key": "id",
                              "highlight-current-row": ""
                            }, {
                              empty: n(() => [
                                s("span", null, p(f.loading ? "" : e(d)("emptyData")), 1)
                              ]),
                              default: n(() => [
                                t(q, {
                                  prop: "page_title",
                                  label: e(d)("diyPageTitle"),
                                  "min-width": "120"
                                }, null, 8, ["label"]),
                                t(q, {
                                  prop: "addon_name",
                                  label: e(d)("diyPageTypeName"),
                                  "min-width": "80"
                                }, null, 8, ["label"]),
                                t(q, {
                                  prop: "type_name",
                                  label: e(d)("diyPageForAddon"),
                                  "min-width": "80"
                                }, null, 8, ["label"])
                              ]),
                              _: 1
                            }, 8, ["data"])), [
                              [He, f.loading]
                            ]),
                            s("div", hl, [
                              t(Re, {
                                "current-page": f.page,
                                "onUpdate:current-page": o[19] || (o[19] = (a) => f.page = a),
                                "page-size": f.limit,
                                "onUpdate:page-size": o[20] || (o[20] = (a) => f.limit = a),
                                layout: "total, sizes, prev, pager, next, jumper",
                                total: f.total,
                                onSizeChange: L,
                                onCurrentChange: L
                              }, null, 8, ["current-page", "page-size", "total"])
                            ]),
                            s("div", bl, [
                              t(T, {
                                type: "primary",
                                onClick: Te
                              }, {
                                default: n(() => [
                                  h(p(e(d)("confirm")), 1)
                                ]),
                                _: 1
                              }),
                              t(T, {
                                onClick: o[21] || (o[21] = (a) => P.value = !1)
                              }, {
                                default: n(() => [
                                  h(p(e(d)("cancel")), 1)
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
              t(re, {
                title: e(d)("carouselSearchSwiperSet"),
                name: "swiper"
              }, {
                default: n(() => [
                  t(x, {
                    "label-width": "100px",
                    class: "px-[10px]"
                  }, {
                    default: n(() => [
                      t(i, {
                        label: e(d)("carouselSearchSwiperControl")
                      }, {
                        default: n(() => [
                          t(m, {
                            modelValue: e(l).editComponent.swiper.control,
                            "onUpdate:modelValue": o[24] || (o[24] = (a) => e(l).editComponent.swiper.control = a)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      t(i, {
                        label: e(d)("carouselSearchSwiperInterval")
                      }, {
                        default: n(() => [
                          t(E, {
                            modelValue: e(l).editComponent.swiper.interval,
                            "onUpdate:modelValue": o[25] || (o[25] = (a) => e(l).editComponent.swiper.interval = a),
                            "show-input": "",
                            size: "small",
                            class: "ml-[10px] diy-nav-slider",
                            min: 1,
                            max: 10
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      s("div", fl, p(e(d)("carouselSearchSwiperTips")), 1),
                      s("div", {
                        ref_key: "imageBoxRef",
                        ref: te
                      }, [
                        (C(!0), w(B, null, N(e(l).editComponent.swiper.list, (a, S) => (C(), w("div", {
                          key: a.id,
                          class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                        }, [
                          t(i, {
                            label: e(d)("image")
                          }, {
                            default: n(() => [
                              t(de, {
                                modelValue: a.imageUrl,
                                "onUpdate:modelValue": (g) => a.imageUrl = g,
                                limit: 1,
                                onChange: Ie
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["label"]),
                          y(s("div", {
                            class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                            onClick: (g) => e(l).editComponent.swiper.list.splice(S, 1)
                          }, [
                            t(A, {
                              name: "element CircleCloseFilled",
                              color: "#bbb",
                              size: "20px"
                            })
                          ], 8, Cl), [
                            [V, e(l).editComponent.swiper.list.length > 1]
                          ]),
                          t(i, {
                            label: e(d)("link")
                          }, {
                            default: n(() => [
                              t(ne, {
                                modelValue: a.link,
                                "onUpdate:modelValue": (g) => a.link = g
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["label"])
                        ]))), 128))
                      ], 512),
                      y(t(T, {
                        class: "w-full",
                        onClick: Ue
                      }, {
                        default: n(() => [
                          h(p(e(d)("addImageAd")), 1)
                        ]),
                        _: 1
                      }, 512), [
                        [V, e(l).editComponent.swiper.list.length < 10]
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
          [V, e(l).editTab == "content"]
        ]),
        y(s("div", gl, [
          e(l).editComponent.search.style == "style-2" ? (C(), w("div", _l, [
            s("h3", xl, p(e(d)("carouselSearchPositionStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchTextColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.positionColor,
                      "onUpdate:modelValue": o[27] || (o[27] = (a) => e(l).editComponent.search.positionColor = a),
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
          e(l).editComponent.search.style == "style-2" ? (C(), w("div", wl, [
            s("h3", Sl, p(e(d)("carouselSearchSubTitleStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchTextColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.subTitle.textColor,
                      "onUpdate:modelValue": o[28] || (o[28] = (a) => e(l).editComponent.search.subTitle.textColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchBgColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.subTitle.startColor,
                      "onUpdate:modelValue": o[29] || (o[29] = (a) => e(l).editComponent.search.subTitle.startColor = a),
                      predefine: e(l).predefineColors,
                      "show-alpha": ""
                    }, null, 8, ["modelValue", "predefine"]),
                    t(A, {
                      name: "iconfont iconmap-connect",
                      size: "20px",
                      class: "block !text-gray-400 mx-[5px]"
                    }),
                    t(u, {
                      modelValue: e(l).editComponent.search.subTitle.endColor,
                      "onUpdate:modelValue": o[30] || (o[30] = (a) => e(l).editComponent.search.subTitle.endColor = a),
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
          s("div", yl, [
            s("h3", Vl, p(e(d)("carouselSearchStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchTextColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.color,
                      "onUpdate:modelValue": o[31] || (o[31] = (a) => e(l).editComponent.search.color = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchBgColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.bgColor,
                      "onUpdate:modelValue": o[32] || (o[32] = (a) => e(l).editComponent.search.bgColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchBtnColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.btnColor,
                      "onUpdate:modelValue": o[33] || (o[33] = (a) => e(l).editComponent.search.btnColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("carouselSearchBtnBgColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.search.btnBgColor,
                      "onUpdate:modelValue": o[34] || (o[34] = (a) => e(l).editComponent.search.btnBgColor = a),
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
          s("div", vl, [
            s("h3", Tl, p(e(d)("carouselSearchTabStyle")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("noColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.tab.noColor,
                      "onUpdate:modelValue": o[35] || (o[35] = (a) => e(l).editComponent.tab.noColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("selectColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.tab.selectColor,
                      "onUpdate:modelValue": o[36] || (o[36] = (a) => e(l).editComponent.tab.selectColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("fixedNoColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.tab.fixedNoColor,
                      "onUpdate:modelValue": o[37] || (o[37] = (a) => e(l).editComponent.tab.fixedNoColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("fixedSelectColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.tab.fixedSelectColor,
                      "onUpdate:modelValue": o[38] || (o[38] = (a) => e(l).editComponent.tab.fixedSelectColor = a),
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
          s("div", kl, [
            s("h3", Ul, p(e(d)("carouselSearchSwiperSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchSwiperStyle"),
                  onChange: Pe
                }, {
                  default: n(() => [
                    t(R, {
                      modelValue: e(l).editComponent.swiper.swiperStyle,
                      "onUpdate:modelValue": o[39] || (o[39] = (a) => e(l).editComponent.swiper.swiperStyle = a)
                    }, {
                      default: n(() => [
                        t(_, { label: "style-1" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "style-2" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "style-3" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchSwiperIndicatorStyle3")), 1)
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
                  label: e(d)("topRounded")
                }, {
                  default: n(() => [
                    t(E, {
                      modelValue: e(l).editComponent.swiper.topRounded,
                      "onUpdate:modelValue": o[40] || (o[40] = (a) => e(l).editComponent.swiper.topRounded = a),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("bottomRounded")
                }, {
                  default: n(() => [
                    t(E, {
                      modelValue: e(l).editComponent.swiper.bottomRounded,
                      "onUpdate:modelValue": o[41] || (o[41] = (a) => e(l).editComponent.swiper.bottomRounded = a),
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
          s("div", Il, [
            s("h3", Pl, p(e(d)("carouselSearchSwiperIndicatorSet")), 1),
            t(x, {
              "label-width": "100px",
              class: "px-[10px]"
            }, {
              default: n(() => [
                t(i, {
                  label: e(d)("carouselSearchSwiperIndicatorStyle")
                }, {
                  default: n(() => [
                    t(R, {
                      modelValue: e(l).editComponent.swiper.indicatorStyle,
                      "onUpdate:modelValue": o[42] || (o[42] = (a) => e(l).editComponent.swiper.indicatorStyle = a)
                    }, {
                      default: n(() => [
                        t(_, { label: "style-1" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchSwiperIndicatorStyle1")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "style-2" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchSwiperIndicatorStyle2")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "style-3" }, {
                          default: n(() => [
                            h(p(e(d)("carouselSearchSwiperIndicatorStyle3")), 1)
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
                  label: e(d)("carouselSearchSwiperIndicatorAlign")
                }, {
                  default: n(() => [
                    t(R, {
                      modelValue: e(l).editComponent.swiper.indicatorAlign,
                      "onUpdate:modelValue": o[43] || (o[43] = (a) => e(l).editComponent.swiper.indicatorAlign = a)
                    }, {
                      default: n(() => [
                        t(_, { label: "left" }, {
                          default: n(() => [
                            h(p(e(d)("alignLeft")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "center" }, {
                          default: n(() => [
                            h(p(e(d)("alignCenter")), 1)
                          ]),
                          _: 1
                        }),
                        t(_, { label: "right" }, {
                          default: n(() => [
                            h(p(e(d)("alignRight")), 1)
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
                  label: e(d)("noColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.swiper.indicatorColor,
                      "onUpdate:modelValue": o[44] || (o[44] = (a) => e(l).editComponent.swiper.indicatorColor = a),
                      "show-alpha": "",
                      predefine: e(l).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(i, {
                  label: e(d)("selectColor")
                }, {
                  default: n(() => [
                    t(u, {
                      modelValue: e(l).editComponent.swiper.indicatorActiveColor,
                      "onUpdate:modelValue": o[45] || (o[45] = (a) => e(l).editComponent.swiper.indicatorActiveColor = a),
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
          [V, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Nl as _
};
