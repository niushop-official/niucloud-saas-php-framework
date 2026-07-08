import { defineComponent as oe, ref as R, reactive as E, onMounted as ie, nextTick as ne, resolveComponent as p, openBlock as c, createElementBlock as x, Fragment as D, withDirectives as T, createElementVNode as a, toDisplayString as C, unref as t, createVNode as l, withModifiers as se, withCtx as s, createBlock as z, createTextVNode as F, renderList as P, normalizeClass as O, vShow as y, createCommentVNode as q, renderSlot as de } from "vue";
import { t as n, b6 as re, i as G } from "./core-shared-9b1e55e9.js";
import { u as ae } from "./diy-f9fec2a3.js";
import { r as me } from "./lodash-8c6c2daa.js";
const Ce = { class: "content-wrap" }, pe = { class: "edit-attr-item-wrap" }, ue = { class: "mb-[10px]" }, ce = { class: "flex flex-wrap" }, be = ["onClick"], Fe = ["src"], fe = { class: "dialog-footer" }, xe = { class: "edit-attr-item-wrap" }, Te = { class: "mb-[10px]" }, ye = { class: "flex flex-wrap" }, _e = ["onClick"], ve = ["src"], Ve = { class: "dialog-footer" }, ge = { class: "text-sm text-gray-400 mb-[10px]" }, he = ["onClick"], ke = { class: "style-wrap" }, Se = {
  key: 0,
  class: "edit-attr-item-wrap"
}, we = { class: "mb-[10px]" }, Ue = { class: "edit-attr-item-wrap" }, Be = { class: "mb-[10px]" }, Ee = { class: "edit-attr-item-wrap" }, De = { class: "mb-[10px]" }, Ae = /* @__PURE__ */ oe({
  __name: "edit-active-cube",
  setup(Re, { expose: H }) {
    const e = ae();
    e.editComponent.ignore = [], e.editComponent.verify = (m) => {
      const i = { code: !0, message: "" };
      return e.value[m].text == "" ? (i.code = !1, i.message = n("activeCubeTitlePlaceholder"), i) : (e.value[m].list.forEach((b) => {
        if (b.imageUrl === "")
          return i.code = !1, i.message = n("imageUrlTip"), i;
        if (b.title.text === "")
          return i.code = !1, i.message = n("activeCubeTitlePlaceholder"), i;
        if (["style-1", "style-2", "style-4"].indexOf(e.value[m].blockStyle.value) != -1 && b.subTitle.text === "")
          return i.code = !1, i.message = n("activeCubeSubTitlePlaceholder"), i;
        if (["style-1", "style-2"].indexOf(e.value[m].blockStyle.value) != -1 && b.moreTitle.text === "")
          return i.code = !1, i.message = n("activeCubeButtonPlaceholder"), i;
      }), i);
    }, e.editComponent.list.forEach((m) => {
      m.id || (m.id = e.generateRandom());
    });
    const _ = R(!1), W = () => {
      f.title = e.editComponent.titleStyle.title, f.value = e.editComponent.titleStyle.value, _.value = !0;
    }, J = E([
      {
        url: "static/resource/images/diy/active_cube/title_style1.png",
        title: "风格1",
        value: "style-1"
      },
      {
        url: "static/resource/images/diy/active_cube/title_style2.png",
        title: "风格2",
        value: "style-2"
      },
      {
        url: "static/resource/images/diy/active_cube/title_style3.png",
        title: "风格3",
        value: "style-3"
      },
      {
        url: "static/resource/images/diy/active_cube/title_style5.png",
        title: "风格4",
        value: "style-4"
      },
      {
        url: "static/resource/images/diy/active_cube/title_style6.png",
        title: "风格5",
        value: "style-5"
      }
    ]), f = E({
      title: e.editComponent.titleStyle.title,
      value: e.editComponent.titleStyle.value
    }), K = (m) => {
      f.title = m.title, f.value = m.value;
    }, Q = () => {
      e.editComponent.titleStyle.title = f.title, e.editComponent.titleStyle.value = f.value, X(e.editComponent.titleStyle.value), _.value = !1;
    }, X = (m) => {
      e.editComponent.titleStyle.value == "style-1" || e.editComponent.titleStyle.value == "style-2" || e.editComponent.titleStyle.value == "style-3" ? (e.editComponent.titleColor = "#F91700", e.editComponent.subTitle.textColor = "#FFFFFF", e.editComponent.subTitle.startColor = "#FB792F", e.editComponent.subTitle.endColor = "#F91700") : e.editComponent.titleStyle.value == "style-4" ? (e.editComponent.titleColor = "#FFFFFF", e.editComponent.subTitle.textColor = "#333333", e.editComponent.subTitle.startColor = "#FFFFFF", e.editComponent.subTitle.endColor = "#FFFFFF") : e.editComponent.titleStyle.value == "style-5" && (e.editComponent.titleColor = "", e.editComponent.subTitle.textColor = "#999999", e.editComponent.subTitle.startColor = "#FFFFFF", e.editComponent.subTitle.endColor = "#FFFFFF");
    }, v = R(!1), M = () => {
      v.value = !0;
    }, Y = E([
      {
        url: "static/resource/images/diy/active_cube/block_style1.png",
        title: "风格1",
        value: "style-1"
      },
      {
        url: "static/resource/images/diy/active_cube/block_style2.png",
        title: "风格2",
        value: "style-2"
      },
      {
        url: "static/resource/images/diy/active_cube/block_style3.png",
        title: "风格3",
        value: "style-3"
      },
      {
        url: "static/resource/images/diy/active_cube/block_style4.png",
        title: "风格4",
        value: "style-4"
      }
    ]), V = E({
      title: e.editComponent.blockStyle.title,
      value: e.editComponent.blockStyle.value
    }), Z = (m) => {
      V.title = m.title, V.value = m.value;
    }, ee = () => {
      e.editComponent.blockStyle.title = V.title, e.editComponent.blockStyle.value = V.value, te(e.editComponent.blockStyle.value), v.value = !1;
    }, te = (m) => {
      m == "style-1" ? (e.editComponent.blockStyle.fontWeight = "normal", e.editComponent.blockStyle.btnText = "normal", e.editComponent.list[0].title.textColor = "#303133", e.editComponent.list[0].subTitle.textColor = "#999999", e.editComponent.list[0].subTitle.startColor = "", e.editComponent.list[0].subTitle.endColor = "", e.editComponent.list[0].moreTitle.startColor = "#FEA715", e.editComponent.list[0].moreTitle.endColor = "#FE1E00", e.editComponent.list[0].listFrame.startColor = "#FFFAF5", e.editComponent.list[0].listFrame.endColor = "#FFFFFF", e.editComponent.list[1].title.textColor = "#303133", e.editComponent.list[1].subTitle.textColor = "#999999", e.editComponent.list[1].subTitle.startColor = "", e.editComponent.list[1].subTitle.endColor = "", e.editComponent.list[1].moreTitle.startColor = "#FFBF50", e.editComponent.list[1].moreTitle.endColor = "#FF9E03", e.editComponent.list[1].listFrame.startColor = "#FFFAF5", e.editComponent.list[1].listFrame.endColor = "#FFFFFF", e.editComponent.list[2].title.textColor = "#303133", e.editComponent.list[2].subTitle.textColor = "#999999", e.editComponent.list[2].subTitle.startColor = "", e.editComponent.list[2].subTitle.endColor = "", e.editComponent.list[2].moreTitle.startColor = "#A2E792", e.editComponent.list[2].moreTitle.endColor = "#49CD2D", e.editComponent.list[2].listFrame.startColor = "#FFFAF5", e.editComponent.list[2].listFrame.endColor = "#FFFFFF", e.editComponent.list[3].title.textColor = "#303133", e.editComponent.list[3].subTitle.textColor = "#999999", e.editComponent.list[3].subTitle.startColor = "", e.editComponent.list[3].subTitle.endColor = "", e.editComponent.list[3].moreTitle.startColor = "#4AC1FF", e.editComponent.list[3].moreTitle.endColor = "#1D7CFF", e.editComponent.list[3].listFrame.startColor = "#FFFAF5", e.editComponent.list[3].listFrame.endColor = "#FFFFFF") : m == "style-2" ? (e.editComponent.blockStyle.fontWeight = "normal", e.editComponent.blockStyle.btnText = "normal", e.editComponent.blockStyle.fontWeight = "bold", e.editComponent.blockStyle.btnText = "italics", e.editComponent.list[0].title.textColor = "#303133", e.editComponent.list[0].subTitle.textColor = "#999999", e.editComponent.list[0].subTitle.startColor = "", e.editComponent.list[0].subTitle.endColor = "", e.editComponent.list[0].moreTitle.startColor = "#FFC051", e.editComponent.list[0].moreTitle.endColor = "#FF9C00", e.editComponent.list[0].listFrame.startColor = "#FFF1DB", e.editComponent.list[0].listFrame.endColor = "#FFFBF4", e.editComponent.list[1].title.textColor = "#303133", e.editComponent.list[1].subTitle.textColor = "#999999", e.editComponent.list[1].subTitle.startColor = "", e.editComponent.list[1].subTitle.endColor = "", e.editComponent.list[1].moreTitle.startColor = "#A4E894", e.editComponent.list[1].moreTitle.endColor = "#45CC2A", e.editComponent.list[1].listFrame.startColor = "#E6F6E2", e.editComponent.list[1].listFrame.endColor = "#F5FDF3", e.editComponent.list[2].title.textColor = "#303133", e.editComponent.list[2].subTitle.textColor = "#999999", e.editComponent.list[2].subTitle.startColor = "", e.editComponent.list[2].subTitle.endColor = "", e.editComponent.list[2].moreTitle.startColor = "#4BC2FF", e.editComponent.list[2].moreTitle.endColor = "#1F7DFF", e.editComponent.list[2].listFrame.startColor = "#E2F6FF", e.editComponent.list[2].listFrame.endColor = "#F2FAFF", e.editComponent.list[3].title.textColor = "#303133", e.editComponent.list[3].subTitle.textColor = "#999999", e.editComponent.list[3].subTitle.startColor = "", e.editComponent.list[3].subTitle.endColor = "", e.editComponent.list[3].moreTitle.startColor = "#FB792F", e.editComponent.list[3].moreTitle.endColor = "#F91700", e.editComponent.list[3].listFrame.startColor = "#FFEAEA", e.editComponent.list[3].listFrame.endColor = "#FFFCFB") : m == "style-3" ? (e.editComponent.blockStyle.fontWeight = "normal", e.editComponent.blockStyle.btnText = "normal", e.editComponent.list[0].title.textColor = "#FF1128", e.editComponent.list[0].subTitle.textColor = "", e.editComponent.list[0].subTitle.startColor = "", e.editComponent.list[0].subTitle.endColor = "", e.editComponent.list[0].moreTitle.startColor = "", e.editComponent.list[0].moreTitle.endColor = "", e.editComponent.list[0].listFrame.startColor = "", e.editComponent.list[0].listFrame.endColor = "", e.editComponent.list[1].title.textColor = "#303133", e.editComponent.list[1].subTitle.textColor = "", e.editComponent.list[1].subTitle.startColor = "", e.editComponent.list[1].subTitle.endColor = "", e.editComponent.list[1].moreTitle.startColor = "", e.editComponent.list[1].moreTitle.endColor = "", e.editComponent.list[1].listFrame.startColor = "", e.editComponent.list[1].listFrame.endColor = "", e.editComponent.list[2].title.textColor = "#303133", e.editComponent.list[2].subTitle.textColor = "", e.editComponent.list[2].subTitle.startColor = "", e.editComponent.list[2].subTitle.endColor = "", e.editComponent.list[2].moreTitle.startColor = "", e.editComponent.list[2].moreTitle.endColor = "", e.editComponent.list[2].listFrame.startColor = "", e.editComponent.list[2].listFrame.endColor = "", e.editComponent.list[3].title.textColor = "#303133", e.editComponent.list[3].subTitle.textColor = "", e.editComponent.list[3].subTitle.startColor = "", e.editComponent.list[3].subTitle.endColor = "", e.editComponent.list[3].moreTitle.startColor = "", e.editComponent.list[3].moreTitle.endColor = "", e.editComponent.list[3].listFrame.startColor = "", e.editComponent.list[3].listFrame.endColor = "") : m == "style-4" && (e.editComponent.blockStyle.fontWeight = "bold", e.editComponent.blockStyle.btnText = "normal", e.editComponent.list[0].title.textColor = "#303133", e.editComponent.list[0].subTitle.textColor = "#ED6E00", e.editComponent.list[0].subTitle.startColor = "#FFE4D9", e.editComponent.list[0].subTitle.endColor = "#FFE4D9", e.editComponent.list[0].moreTitle.startColor = "", e.editComponent.list[0].moreTitle.endColor = "", e.editComponent.list[0].listFrame.startColor = "#FFAD4D", e.editComponent.list[0].listFrame.endColor = "#F93D02", e.editComponent.list[1].title.textColor = "#303133", e.editComponent.list[1].subTitle.textColor = "#2E59E9", e.editComponent.list[1].subTitle.startColor = "#CAD7F8", e.editComponent.list[1].subTitle.endColor = "#CAD7F8", e.editComponent.list[1].moreTitle.startColor = "", e.editComponent.list[1].moreTitle.endColor = "", e.editComponent.list[1].listFrame.startColor = "#7CA7F4", e.editComponent.list[1].listFrame.endColor = "#2B56E9", e.editComponent.list[2].title.textColor = "#303133", e.editComponent.list[2].subTitle.textColor = "#F62F55", e.editComponent.list[2].subTitle.startColor = "#FCD6D9", e.editComponent.list[2].subTitle.endColor = "#FCD6D9", e.editComponent.list[2].moreTitle.startColor = "", e.editComponent.list[2].moreTitle.endColor = "", e.editComponent.list[2].listFrame.startColor = "#FF7F48", e.editComponent.list[2].listFrame.endColor = "#EE335B", e.editComponent.list[3].title.textColor = "#303133", e.editComponent.list[3].subTitle.textColor = "#139B3C", e.editComponent.list[3].subTitle.startColor = "#D3F1DA", e.editComponent.list[3].subTitle.endColor = "#D3F1DA", e.editComponent.list[3].moreTitle.startColor = "", e.editComponent.list[3].moreTitle.endColor = "", e.editComponent.list[3].listFrame.startColor = "#90D48C", e.editComponent.list[3].listFrame.endColor = "#299F4F");
    }, le = () => {
      e.editComponent.list.push({
        id: e.generateRandom(),
        title: {
          title: "标题",
          textColor: "#000000"
        },
        subTitle: {
          text: "副标题",
          textColor: "#999999",
          startColor: "",
          endColor: ""
        },
        listFrame: {
          startColor: "#4AC1FF",
          endColor: "#1D7CFF"
        },
        moreTitle: {
          text: "去看看",
          startColor: "#FEA715",
          endColor: "#FE1E00"
        },
        imageUrl: "",
        link: { name: "" }
      });
    }, I = R();
    return ie(() => {
      ne(() => {
        const m = re.create(I.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (i) => {
            const b = e.editComponent.list[i.oldIndex];
            e.editComponent.list.splice(i.oldIndex, 1), e.editComponent.list.splice(i.newIndex, 0, b), m.sort(
              me(e.editComponent.list.length).map((U) => U.toString())
            );
          }
        });
      });
    }), H({}), (m, i) => {
      const b = p("ArrowRight"), U = p("el-icon"), r = p("el-form-item"), g = p("el-input"), L = p("upload-image"), A = p("diy-link"), h = p("el-form"), k = p("el-button"), N = p("el-dialog"), u = p("el-color-picker"), S = p("icon"), B = p("el-radio"), $ = p("el-radio-group"), j = p("el-slider");
      return c(), x(D, null, [
        T(a("div", Ce, [
          a("div", pe, [
            a("h3", ue, C(t(n)("titleContent")), 1),
            l(h, {
              "label-width": "80px",
              class: "px-[10px]",
              onSubmit: i[5] || (i[5] = se(() => {
              }, ["prevent"]))
            }, {
              default: s(() => [
                l(r, {
                  label: t(n)("selectStyle"),
                  class: "flex"
                }, {
                  default: s(() => [
                    a("span", {
                      class: "text-primary flex-1 cursor-pointer",
                      onClick: W
                    }, C(t(e).editComponent.titleStyle.title), 1),
                    l(U, {
                      onClick: W,
                      class: "cursor-pointer"
                    }, {
                      default: s(() => [
                        l(b)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(e).editComponent && t(e).editComponent.titleStyle && t(e).editComponent.titleStyle.value != "style-5" ? (c(), z(r, {
                  key: 0,
                  label: t(n)("title")
                }, {
                  default: s(() => [
                    l(g, {
                      modelValue: t(e).editComponent.text,
                      "onUpdate:modelValue": i[0] || (i[0] = (o) => t(e).editComponent.text = o),
                      modelModifiers: { trim: !0 },
                      placeholder: t(n)("titlePlaceholder"),
                      clearable: "",
                      maxlength: "10",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : (c(), z(r, {
                  key: 1,
                  label: t(n)("image")
                }, {
                  default: s(() => [
                    l(L, {
                      modelValue: t(e).editComponent.textImg,
                      "onUpdate:modelValue": i[1] || (i[1] = (o) => t(e).editComponent.textImg = o),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])),
                l(r, {
                  label: t(n)("link")
                }, {
                  default: s(() => [
                    l(A, {
                      modelValue: t(e).editComponent.textLink,
                      "onUpdate:modelValue": i[2] || (i[2] = (o) => t(e).editComponent.textLink = o)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: t(n)("subTitle")
                }, {
                  default: s(() => [
                    l(g, {
                      modelValue: t(e).editComponent.subTitle.text,
                      "onUpdate:modelValue": i[3] || (i[3] = (o) => t(e).editComponent.subTitle.text = o),
                      modelModifiers: { trim: !0 },
                      placeholder: t(n)("subTitlePlaceholder"),
                      clearable: "",
                      maxlength: "8",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: t(n)("link")
                }, {
                  default: s(() => [
                    l(A, {
                      modelValue: t(e).editComponent.subTitle.link,
                      "onUpdate:modelValue": i[4] || (i[4] = (o) => t(e).editComponent.subTitle.link = o)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            l(N, {
              modelValue: _.value,
              "onUpdate:modelValue": i[7] || (i[7] = (o) => _.value = o),
              title: t(n)("selectStyle"),
              width: "460px"
            }, {
              footer: s(() => [
                a("span", fe, [
                  l(k, {
                    onClick: i[6] || (i[6] = (o) => _.value = !1)
                  }, {
                    default: s(() => [
                      F(C(t(n)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  l(k, {
                    type: "primary",
                    onClick: Q
                  }, {
                    default: s(() => [
                      F(C(t(n)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: s(() => [
                a("div", ce, [
                  (c(!0), x(D, null, P(J, (o, w) => (c(), x("div", {
                    key: w,
                    class: O([{ "border-primary": f.value == o.value }, "flex items-center justify-center overflow-hidden w-[200px] h-[100px] mr-[12px] mb-[12px] cursor-pointer border bg-[#eee]"]),
                    onClick: (d) => K(o)
                  }, [
                    a("img", {
                      src: t(G)(o.url)
                    }, null, 8, Fe)
                  ], 10, be))), 128))
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ]),
          a("div", xe, [
            a("h3", Te, C(t(n)("activeCubeBlockContent")), 1),
            l(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: s(() => [
                l(r, {
                  label: t(n)("selectStyle"),
                  class: "flex"
                }, {
                  default: s(() => [
                    a("span", {
                      class: "text-primary flex-1 cursor-pointer",
                      onClick: M
                    }, C(t(e).editComponent.blockStyle.title), 1),
                    l(U, {
                      onClick: M,
                      class: "cursor-pointer"
                    }, {
                      default: s(() => [
                        l(b)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(N, {
                  modelValue: v.value,
                  "onUpdate:modelValue": i[9] || (i[9] = (o) => v.value = o),
                  title: t(n)("selectStyle"),
                  width: "600px"
                }, {
                  footer: s(() => [
                    a("span", Ve, [
                      l(k, {
                        onClick: i[8] || (i[8] = (o) => v.value = !1)
                      }, {
                        default: s(() => [
                          F(C(t(n)("cancel")), 1)
                        ]),
                        _: 1
                      }),
                      l(k, {
                        type: "primary",
                        onClick: ee
                      }, {
                        default: s(() => [
                          F(C(t(n)("confirm")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  default: s(() => [
                    a("div", ye, [
                      (c(!0), x(D, null, P(Y, (o, w) => (c(), x("div", {
                        key: w,
                        class: O([{ "border-primary": V.value == o.value }, "flex items-center justify-center overflow-hidden w-[250px] h-[150px] mr-[12px] mb-[12px] cursor-pointer border bg-[#eee]"]),
                        onClick: (d) => Z(o)
                      }, [
                        a("img", {
                          src: t(G)(o.url)
                        }, null, 8, ve)
                      ], 10, _e))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "title"]),
                a("p", ge, C(t(n)("dragMouseAdjustOrder")), 1),
                a("div", {
                  ref_key: "blockBoxRef",
                  ref: I
                }, [
                  (c(!0), x(D, null, P(t(e).editComponent.list, (o, w) => (c(), x("div", {
                    key: o.id,
                    class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    l(r, {
                      label: t(n)("image")
                    }, {
                      default: s(() => [
                        l(L, {
                          modelValue: o.imageUrl,
                          "onUpdate:modelValue": (d) => o.imageUrl = d,
                          limit: 1
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    l(r, {
                      label: t(n)("activeCubeTitle")
                    }, {
                      default: s(() => [
                        l(g, {
                          modelValue: o.title.text,
                          "onUpdate:modelValue": (d) => o.title.text = d,
                          modelModifiers: { trim: !0 },
                          placeholder: t(n)("activeCubeTitlePlaceholder"),
                          clearable: "",
                          maxlength: "4",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    T(l(r, {
                      label: t(n)("activeCubeSubTitleTextColor")
                    }, {
                      default: s(() => [
                        l(u, {
                          modelValue: o.title.textColor,
                          "onUpdate:modelValue": (d) => o.title.textColor = d,
                          "show-alpha": "",
                          predefine: t(e).predefineColors
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"])
                      ]),
                      _: 2
                    }, 1032, ["label"]), [
                      [y, t(e).editComponent.blockStyle.value == "style-3"]
                    ]),
                    t(e).editComponent.blockStyle.value != "style-3" ? (c(), z(r, {
                      key: 0,
                      label: t(n)("activeCubeSubTitle")
                    }, {
                      default: s(() => [
                        l(g, {
                          modelValue: o.subTitle.text,
                          "onUpdate:modelValue": (d) => o.subTitle.text = d,
                          modelModifiers: { trim: !0 },
                          placeholder: t(n)("activeCubeSubTitlePlaceholder"),
                          clearable: "",
                          maxlength: "6",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label"])) : q("", !0),
                    T(a("div", null, [
                      l(r, {
                        label: t(n)("activeCubeSubTitleTextColor")
                      }, {
                        default: s(() => [
                          l(u, {
                            modelValue: o.subTitle.textColor,
                            "onUpdate:modelValue": (d) => o.subTitle.textColor = d,
                            "show-alpha": "",
                            predefine: t(e).predefineColors
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"])
                        ]),
                        _: 2
                      }, 1032, ["label"]),
                      l(r, {
                        label: t(n)("activeCubeSubTitleBgColor")
                      }, {
                        default: s(() => [
                          l(u, {
                            modelValue: o.subTitle.startColor,
                            "onUpdate:modelValue": (d) => o.subTitle.startColor = d,
                            "show-alpha": "",
                            predefine: t(e).predefineColors
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"]),
                          l(S, {
                            name: "iconfont iconmap-connect",
                            size: "20px",
                            class: "block !text-gray-400 mx-[5px]"
                          }),
                          l(u, {
                            modelValue: o.subTitle.endColor,
                            "onUpdate:modelValue": (d) => o.subTitle.endColor = d,
                            "show-alpha": "",
                            predefine: t(e).predefineColors
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"])
                        ]),
                        _: 2
                      }, 1032, ["label"])
                    ], 512), [
                      [y, t(e).editComponent.blockStyle.value == "style-4"]
                    ]),
                    l(r, {
                      label: t(n)("activeListFrameColor")
                    }, {
                      default: s(() => [
                        l(u, {
                          modelValue: o.listFrame.startColor,
                          "onUpdate:modelValue": (d) => o.listFrame.startColor = d,
                          "show-alpha": "",
                          predefine: t(e).predefineColors
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"]),
                        l(S, {
                          name: "iconfont iconmap-connect",
                          size: "20px",
                          class: "block !text-gray-400 mx-[5px]"
                        }),
                        l(u, {
                          modelValue: o.listFrame.endColor,
                          "onUpdate:modelValue": (d) => o.listFrame.endColor = d,
                          "show-alpha": "",
                          predefine: t(e).predefineColors
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    T(a("div", null, [
                      l(r, {
                        label: t(n)("activeCubeButton")
                      }, {
                        default: s(() => [
                          l(g, {
                            modelValue: o.moreTitle.text,
                            "onUpdate:modelValue": (d) => o.moreTitle.text = d,
                            modelModifiers: { trim: !0 },
                            placeholder: t(n)("activeCubeButtonPlaceholder"),
                            clearable: "",
                            maxlength: "3",
                            "show-word-limit": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                        ]),
                        _: 2
                      }, 1032, ["label"]),
                      l(r, {
                        label: t(n)("activeCubeButtonColor")
                      }, {
                        default: s(() => [
                          l(u, {
                            modelValue: o.moreTitle.startColor,
                            "onUpdate:modelValue": (d) => o.moreTitle.startColor = d,
                            "show-alpha": "",
                            predefine: t(e).predefineColors
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"]),
                          l(S, {
                            name: "iconfont iconmap-connect",
                            size: "20px",
                            class: "block !text-gray-400 mx-[5px]"
                          }),
                          l(u, {
                            modelValue: o.moreTitle.endColor,
                            "onUpdate:modelValue": (d) => o.moreTitle.endColor = d,
                            "show-alpha": "",
                            predefine: t(e).predefineColors
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"])
                        ]),
                        _: 2
                      }, 1032, ["label"])
                    ], 512), [
                      [y, t(e).editComponent.blockStyle.value != "style-4" && t(e).editComponent.blockStyle.value != "style-3"]
                    ]),
                    l(r, {
                      label: t(n)("link")
                    }, {
                      default: s(() => [
                        l(A, {
                          modelValue: o.link,
                          "onUpdate:modelValue": (d) => o.link = d
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    T(a("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (d) => t(e).editComponent.list.splice(w, 1)
                    }, [
                      l(S, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, he), [
                      [y, t(e).editComponent.list.length > 1]
                    ])
                  ]))), 128))
                ], 512),
                T(l(k, {
                  class: "w-full",
                  onClick: le
                }, {
                  default: s(() => [
                    F(C(t(n)("activeCubeAddItem")), 1)
                  ]),
                  _: 1
                }, 512), [
                  [y, t(e).editComponent.list.length < 10]
                ])
              ]),
              _: 1
            })
          ])
        ], 512), [
          [y, t(e).editTab == "content"]
        ]),
        T(a("div", ke, [
          f.value != "style-5" ? (c(), x("div", Se, [
            a("h3", we, C(t(n)("titleStyle")), 1),
            l(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: s(() => [
                l(r, {
                  label: t(n)("textColor")
                }, {
                  default: s(() => [
                    l(u, {
                      modelValue: t(e).editComponent.titleColor,
                      "onUpdate:modelValue": i[10] || (i[10] = (o) => t(e).editComponent.titleColor = o),
                      "show-alpha": "",
                      predefine: t(e).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ])) : q("", !0),
          a("div", Ue, [
            a("h3", Be, C(t(n)("subTitleStyle")), 1),
            l(h, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: s(() => [
                l(r, {
                  label: t(n)("textColor")
                }, {
                  default: s(() => [
                    l(u, {
                      modelValue: t(e).editComponent.subTitle.textColor,
                      "onUpdate:modelValue": i[11] || (i[11] = (o) => t(e).editComponent.subTitle.textColor = o),
                      "show-alpha": "",
                      predefine: t(e).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: t(n)("subTextBgColor")
                }, {
                  default: s(() => [
                    l(u, {
                      modelValue: t(e).editComponent.subTitle.startColor,
                      "onUpdate:modelValue": i[12] || (i[12] = (o) => t(e).editComponent.subTitle.startColor = o),
                      "show-alpha": "",
                      predefine: t(e).predefineColors
                    }, null, 8, ["modelValue", "predefine"]),
                    l(S, {
                      name: "iconfont iconmap-connect",
                      size: "20px",
                      class: "block !text-gray-400 mx-[5px]"
                    }),
                    l(u, {
                      modelValue: t(e).editComponent.subTitle.endColor,
                      "onUpdate:modelValue": i[13] || (i[13] = (o) => t(e).editComponent.subTitle.endColor = o),
                      "show-alpha": "",
                      predefine: t(e).predefineColors
                    }, null, 8, ["modelValue", "predefine"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          a("div", Ee, [
            a("h3", De, C(t(n)("activeCubeBlockStyle")), 1),
            l(h, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: s(() => [
                l(r, {
                  label: t(n)("activeCubeBlockTextFontWeight")
                }, {
                  default: s(() => [
                    l($, {
                      modelValue: t(e).editComponent.blockStyle.fontWeight,
                      "onUpdate:modelValue": i[14] || (i[14] = (o) => t(e).editComponent.blockStyle.fontWeight = o)
                    }, {
                      default: s(() => [
                        l(B, { label: "normal" }, {
                          default: s(() => [
                            F(C(t(n)("fontWeightNormal")), 1)
                          ]),
                          _: 1
                        }),
                        l(B, { label: "bold" }, {
                          default: s(() => [
                            F(C(t(n)("fontWeightBold")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: t(n)("activeCubeBlockBtnText"),
                  class: "flex"
                }, {
                  default: s(() => [
                    l($, {
                      modelValue: t(e).editComponent.blockStyle.btnText,
                      "onUpdate:modelValue": i[15] || (i[15] = (o) => t(e).editComponent.blockStyle.btnText = o)
                    }, {
                      default: s(() => [
                        l(B, { label: "normal" }, {
                          default: s(() => [
                            F(C(t(n)("btnTextNormal")), 1)
                          ]),
                          _: 1
                        }),
                        l(B, { label: "italics" }, {
                          default: s(() => [
                            F(C(t(n)("btnTextItalics")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: t(n)("topRounded")
                }, {
                  default: s(() => [
                    l(j, {
                      modelValue: t(e).editComponent.topElementRounded,
                      "onUpdate:modelValue": i[16] || (i[16] = (o) => t(e).editComponent.topElementRounded = o),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 50
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: t(n)("bottomRounded")
                }, {
                  default: s(() => [
                    l(j, {
                      modelValue: t(e).editComponent.bottomElementRounded,
                      "onUpdate:modelValue": i[17] || (i[17] = (o) => t(e).editComponent.bottomElementRounded = o),
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
          de(m.$slots, "style")
        ], 512), [
          [y, t(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ie as _
};
