import { defineComponent as X, watch as Y, ref as G, onMounted as O, nextTick as v, resolveComponent as m, openBlock as f, createElementBlock as w, Fragment as D, withDirectives as A, createElementVNode as a, toDisplayString as s, unref as e, createVNode as l, withCtx as i, createTextVNode as u, normalizeClass as b, withModifiers as I, vShow as g, renderList as T, createBlock as z, createCommentVNode as N, renderSlot as E } from "vue";
import { t as n, b6 as H } from "./core-shared-9b1e55e9.js";
import { u as q } from "./diy-f9fec2a3.js";
import { r as R } from "./lodash-8c6c2daa.js";
const Z = "data:image/png;base64,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", W = "data:image/png;base64,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", j = { class: "content-wrap notice-content-wrap" }, J = { class: "edit-attr-item-wrap" }, _ = { class: "mb-[10px]" }, $ = { class: "flex items-center flex-wrap py-[8px] px-[10px] bg-[#f4f3f7] rounded mb-[18px] mx-[18px]" }, ee = { class: "edit-attr-item-wrap" }, oe = { class: "mb-[10px]" }, te = { class: "text-sm text-gray-400 mb-[10px]" }, le = ["onClick"], ne = { class: "style-wrap" }, ie = { class: "edit-attr-item-wrap" }, de = { class: "mb-[10px]" }, ae = /* @__PURE__ */ X({
  __name: "edit-notice",
  setup(re, { expose: M }) {
    const o = q();
    o.editComponent.ignore = [], o.editComponent.verify = (r) => {
      const t = { code: !0, message: "" };
      return o.value[r].noticeType == "text" && o.value[r].noticeTitle == "" ? (t.code = !1, t.message = n("noticeTypeTextPlaceholder"), t) : (o.value[r].list.forEach((p) => {
        if (p.text == "")
          return t.code = !1, t.message = n("noticePlaceholderText"), t;
      }), t);
    }, o.editComponent.list.forEach((r) => {
      r.id || (r.id = o.generateRandom());
    });
    const B = (r) => {
      o.editComponent.systemUrl = r, o.editComponent.imgType = "system";
    };
    Y(
      () => o.editComponent.imageUrl,
      (r, t) => {
        r ? o.editComponent.imgType = "diy" : B("style_1");
      }
    );
    const S = () => {
      o.editComponent.list.push({
        id: o.generateRandom(),
        text: "公告",
        link: { name: "" }
      });
    }, P = G();
    return O(() => {
      v(() => {
        const r = H.create(P.value, {
          group: "item-wrap",
          animation: 200,
          onEnd: (t) => {
            const p = o.editComponent.list[t.oldIndex];
            o.editComponent.list.splice(t.oldIndex, 1), o.editComponent.list.splice(t.newIndex, 0, p), r.sort(
              R(o.editComponent.list.length).map((C) => C.toString())
            );
          }
        });
      });
    }), M({}), (r, t) => {
      const p = m("el-radio"), C = m("el-radio-group"), c = m("el-form-item"), h = m("upload-image"), V = m("el-input"), y = m("el-form"), U = m("icon"), k = m("diy-link"), K = m("el-button"), L = m("el-slider"), Q = m("el-color-picker");
      return f(), w(D, null, [
        A(a("div", j, [
          a("div", J, [
            a("h3", _, s(e(n)("noticeStyle")), 1),
            l(y, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                l(c, {
                  label: e(n)("noticeType")
                }, {
                  default: i(() => [
                    l(C, {
                      modelValue: e(o).editComponent.noticeType,
                      "onUpdate:modelValue": t[0] || (t[0] = (d) => e(o).editComponent.noticeType = d)
                    }, {
                      default: i(() => [
                        l(p, { label: "img" }, {
                          default: i(() => [
                            u(s(e(n)("noticeTypeImg")), 1)
                          ]),
                          _: 1
                        }),
                        l(p, { label: "text" }, {
                          default: i(() => [
                            u(s(e(n)("noticeTypeText")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                A(a("div", $, [
                  a("div", {
                    class: b(["mr-[10px] rounded cursor-pointer border-[1px] border-solid", { "border-[var(--el-color-primary)]": e(o).editComponent.systemUrl == "style_1" && e(o).editComponent.imgType == "system" }])
                  }, [
                    a("img", {
                      src: Z,
                      class: b(["h-[28px] px-[10px] py-[5px]"]),
                      onClick: t[1] || (t[1] = (d) => B("style_1"))
                    })
                  ], 2),
                  a("div", {
                    class: b(["mr-[10px] rounded cursor-pointer w-[100px] border-[1px] border-solid", { "border-[var(--el-color-primary)]": e(o).editComponent.systemUrl == "style_2" && e(o).editComponent.imgType == "system" }])
                  }, [
                    a("img", {
                      src: W,
                      class: "px-[10px] py-[5px]",
                      onClick: t[2] || (t[2] = (d) => B("style_2"))
                    })
                  ], 2),
                  a("div", {
                    onClick: t[4] || (t[4] = I((d) => e(o).editComponent.imgType = "diy", ["stop"])),
                    class: b(["mr-[10px] rounded cursor-pointer diy-upload-img border-[1px] border-solid", { "border-[var(--el-color-primary)]": e(o).editComponent.imageUrl && e(o).editComponent.imgType == "diy" }])
                  }, [
                    l(h, {
                      modelValue: e(o).editComponent.imageUrl,
                      "onUpdate:modelValue": t[3] || (t[3] = (d) => e(o).editComponent.imageUrl = d),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ], 2)
                ], 512), [
                  [g, e(o).editComponent.noticeType == "img"]
                ]),
                A(l(c, {
                  label: e(n)("noticeTitle")
                }, {
                  default: i(() => [
                    l(V, {
                      modelValue: e(o).editComponent.noticeTitle,
                      "onUpdate:modelValue": t[5] || (t[5] = (d) => e(o).editComponent.noticeTitle = d),
                      modelModifiers: { trim: !0 },
                      placeholder: e(n)("titlePlaceholder"),
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]), [
                  [g, e(o).editComponent.noticeType == "text"]
                ])
              ]),
              _: 1
            })
          ]),
          a("div", ee, [
            a("h3", oe, s(e(n)("noticeText")), 1),
            l(y, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                l(c, {
                  label: e(n)("noticeScrollWay")
                }, {
                  default: i(() => [
                    l(C, {
                      modelValue: e(o).editComponent.scrollWay,
                      "onUpdate:modelValue": t[6] || (t[6] = (d) => e(o).editComponent.scrollWay = d)
                    }, {
                      default: i(() => [
                        l(p, { label: "upDown" }, {
                          default: i(() => [
                            u(s(e(n)("noticeUpDown")), 1)
                          ]),
                          _: 1
                        }),
                        l(p, { label: "horizontal" }, {
                          default: i(() => [
                            u(s(e(n)("noticeHorizontal")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(c, {
                  label: e(n)("noticeShowType")
                }, {
                  default: i(() => [
                    l(C, {
                      modelValue: e(o).editComponent.showType,
                      "onUpdate:modelValue": t[7] || (t[7] = (d) => e(o).editComponent.showType = d)
                    }, {
                      default: i(() => [
                        l(p, { label: "popup" }, {
                          default: i(() => [
                            u(s(e(n)("noticeShowPopUp")), 1)
                          ]),
                          _: 1
                        }),
                        l(p, { label: "link" }, {
                          default: i(() => [
                            u(s(e(n)("noticeShowLink")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a("p", te, s(e(n)("dragMouseAdjustOrder")), 1),
                a("div", {
                  ref_key: "noticeBoxRef",
                  ref: P
                }, [
                  (f(!0), w(D, null, T(e(o).editComponent.list, (d, F) => (f(), w("div", {
                    key: d.id,
                    class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                  }, [
                    l(c, {
                      label: e(n)("noticeText")
                    }, {
                      default: i(() => [
                        l(V, {
                          modelValue: d.text,
                          "onUpdate:modelValue": (x) => d.text = x,
                          modelModifiers: { trim: !0 },
                          placeholder: e(n)("noticePlaceholderText"),
                          clearable: "",
                          maxlength: "40",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label"]),
                    A(a("div", {
                      class: "del absolute cursor-pointer z-[2] top-[-8px] right-[-8px]",
                      onClick: (x) => e(o).editComponent.list.splice(F, 1)
                    }, [
                      l(U, {
                        name: "element CircleCloseFilled",
                        color: "#bbb",
                        size: "20px"
                      })
                    ], 8, le), [
                      [g, e(o).editComponent.list.length > 1]
                    ]),
                    e(o).editComponent.showType == "link" ? (f(), z(c, {
                      key: 0,
                      label: e(n)("link")
                    }, {
                      default: i(() => [
                        l(k, {
                          modelValue: d.link,
                          "onUpdate:modelValue": (x) => d.link = x
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label"])) : N("", !0)
                  ]))), 128))
                ], 512),
                l(K, {
                  class: "w-full",
                  onClick: S
                }, {
                  default: i(() => [
                    u(s(e(n)("addNotice")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ], 512), [
          [g, e(o).editTab == "content"]
        ]),
        A(a("div", ne, [
          a("div", ie, [
            a("h3", de, s(e(n)("textSet")), 1),
            l(y, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                l(c, {
                  label: e(n)("textFontSize")
                }, {
                  default: i(() => [
                    l(L, {
                      modelValue: e(o).editComponent.fontSize,
                      "onUpdate:modelValue": t[8] || (t[8] = (d) => e(o).editComponent.fontSize = d),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 12,
                      max: 20
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(c, {
                  label: e(n)("textFontWeight")
                }, {
                  default: i(() => [
                    l(C, {
                      modelValue: e(o).editComponent.fontWeight,
                      "onUpdate:modelValue": t[9] || (t[9] = (d) => e(o).editComponent.fontWeight = d)
                    }, {
                      default: i(() => [
                        l(p, { label: "normal" }, {
                          default: i(() => [
                            u(s(e(n)("fontWeightNormal")), 1)
                          ]),
                          _: 1
                        }),
                        l(p, { label: "bold" }, {
                          default: i(() => [
                            u(s(e(n)("fontWeightBold")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(c, {
                  label: e(n)("textColor")
                }, {
                  default: i(() => [
                    l(Q, {
                      modelValue: e(o).editComponent.textColor,
                      "onUpdate:modelValue": t[10] || (t[10] = (d) => e(o).editComponent.textColor = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          E(r.$slots, "style")
        ], 512), [
          [g, e(o).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ae
}, Symbol.toStringTag, { value: "Module" }));
export {
  ue as _
};
