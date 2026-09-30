import { defineComponent as S, resolveComponent as p, openBlock as b, createElementBlock as V, Fragment as w, withDirectives as U, createElementVNode as s, toDisplayString as _, unref as e, createVNode as o, withCtx as u, renderList as g, vShow as y, renderSlot as B } from "vue";
import { t as d } from "./core-shared-c6ad4e77.js";
import { u as O } from "./diy-452683aa.js";
const R = { class: "content-wrap" }, F = { class: "edit-attr-item-wrap" }, z = { class: "mb-[10px]" }, M = { class: "edit-attr-item-wrap" }, P = { class: "mb-[10px]" }, E = { class: "style-wrap" }, I = { class: "edit-attr-item-wrap" }, D = { class: "mb-[10px]" }, j = /* @__PURE__ */ S({
  __name: "edit-picture-show",
  setup(N, { expose: k }) {
    const t = O();
    return t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (c) => {
      const a = { code: !0, message: "" };
      return t.value[c].moduleOne.list.forEach((r) => {
        if (r.imageUrl === "")
          return a.code = !1, a.message = d("imageUrlTip"), a;
      }), t.value[c].moduleTwo.list.forEach((r) => {
        if (r.imageUrl === "")
          return a.code = !1, a.message = d("imageUrlTip"), a;
      }), a;
    }, k({}), (c, a) => {
      const r = p("upload-image"), m = p("el-form-item"), h = p("el-input"), i = p("el-color-picker"), x = p("icon"), T = p("diy-link"), C = p("el-form"), f = p("el-slider");
      return b(), V(w, null, [
        U(s("div", R, [
          s("div", F, [
            s("h3", z, _(e(d)("pictureShowBlockOne")), 1),
            o(C, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: u(() => [
                o(m, {
                  label: e(d)("image")
                }, {
                  default: u(() => [
                    o(r, {
                      modelValue: e(t).editComponent.moduleOne.head.textImg,
                      "onUpdate:modelValue": a[0] || (a[0] = (l) => e(t).editComponent.moduleOne.head.textImg = l),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("subTitle")
                }, {
                  default: u(() => [
                    o(h, {
                      modelValue: e(t).editComponent.moduleOne.head.subText,
                      "onUpdate:modelValue": a[1] || (a[1] = (l) => e(t).editComponent.moduleOne.head.subText = l),
                      modelModifiers: { trim: !0 },
                      placeholder: e(d)("subTitlePlaceholder"),
                      clearable: "",
                      maxlength: "8",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("subTitleTextColor")
                }, {
                  default: u(() => [
                    o(i, {
                      modelValue: e(t).editComponent.moduleOne.head.subTextColor,
                      "onUpdate:modelValue": a[2] || (a[2] = (l) => e(t).editComponent.moduleOne.head.subTextColor = l),
                      "show-alpha": ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("pictureShowBgColor")
                }, {
                  default: u(() => [
                    o(i, {
                      modelValue: e(t).editComponent.moduleOne.listFrame.startColor,
                      "onUpdate:modelValue": a[3] || (a[3] = (l) => e(t).editComponent.moduleOne.listFrame.startColor = l),
                      "show-alpha": ""
                    }, null, 8, ["modelValue"]),
                    o(x, {
                      name: "iconfont iconmap-connect",
                      size: "20px",
                      class: "block !text-gray-400 mx-[5px]"
                    }),
                    o(i, {
                      modelValue: e(t).editComponent.moduleOne.listFrame.endColor,
                      "onUpdate:modelValue": a[4] || (a[4] = (l) => e(t).editComponent.moduleOne.listFrame.endColor = l),
                      "show-alpha": ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                (b(!0), V(w, null, g(e(t).editComponent.moduleOne.list, (l, v) => (b(), V("div", {
                  key: l.id,
                  class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                }, [
                  o(m, {
                    label: e(d)("image")
                  }, {
                    default: u(() => [
                      o(r, {
                        modelValue: l.imageUrl,
                        "onUpdate:modelValue": (n) => l.imageUrl = n,
                        limit: 1
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("pictureShowBtnText")
                  }, {
                    default: u(() => [
                      o(h, {
                        modelValue: l.btnTitle.text,
                        "onUpdate:modelValue": (n) => l.btnTitle.text = n,
                        modelModifiers: { trim: !0 },
                        placeholder: e(d)("activeCubeTitlePlaceholder"),
                        clearable: "",
                        maxlength: "4",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("pictureShowBtnColor")
                  }, {
                    default: u(() => [
                      o(i, {
                        modelValue: l.btnTitle.color,
                        "onUpdate:modelValue": (n) => l.btnTitle.color = n,
                        "show-alpha": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("pictureShowBtnBgColor")
                  }, {
                    default: u(() => [
                      o(i, {
                        modelValue: l.btnTitle.startColor,
                        "onUpdate:modelValue": (n) => l.btnTitle.startColor = n,
                        "show-alpha": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      o(x, {
                        name: "iconfont iconmap-connect",
                        size: "20px",
                        class: "block !text-gray-400 mx-[5px]"
                      }),
                      o(i, {
                        modelValue: l.btnTitle.endColor,
                        "onUpdate:modelValue": (n) => l.btnTitle.endColor = n,
                        "show-alpha": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("link")
                  }, {
                    default: u(() => [
                      o(T, {
                        modelValue: l.link,
                        "onUpdate:modelValue": (n) => l.link = n
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"])
                ]))), 128))
              ]),
              _: 1
            })
          ]),
          s("div", M, [
            s("h3", P, _(e(d)("pictureShowBlockTwo")), 1),
            o(C, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: u(() => [
                o(m, {
                  label: e(d)("image")
                }, {
                  default: u(() => [
                    o(r, {
                      modelValue: e(t).editComponent.moduleTwo.head.textImg,
                      "onUpdate:modelValue": a[5] || (a[5] = (l) => e(t).editComponent.moduleTwo.head.textImg = l),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("subTitle")
                }, {
                  default: u(() => [
                    o(h, {
                      modelValue: e(t).editComponent.moduleTwo.head.subText,
                      "onUpdate:modelValue": a[6] || (a[6] = (l) => e(t).editComponent.moduleTwo.head.subText = l),
                      modelModifiers: { trim: !0 },
                      placeholder: e(d)("subTitlePlaceholder"),
                      clearable: "",
                      maxlength: "8",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("subTitleTextColor")
                }, {
                  default: u(() => [
                    o(i, {
                      modelValue: e(t).editComponent.moduleTwo.head.subTextColor,
                      "onUpdate:modelValue": a[7] || (a[7] = (l) => e(t).editComponent.moduleTwo.head.subTextColor = l),
                      "show-alpha": ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("pictureShowBgColor")
                }, {
                  default: u(() => [
                    o(i, {
                      modelValue: e(t).editComponent.moduleTwo.listFrame.startColor,
                      "onUpdate:modelValue": a[8] || (a[8] = (l) => e(t).editComponent.moduleTwo.listFrame.startColor = l),
                      "show-alpha": ""
                    }, null, 8, ["modelValue"]),
                    o(x, {
                      name: "iconfont iconmap-connect",
                      size: "20px",
                      class: "block !text-gray-400 mx-[5px]"
                    }),
                    o(i, {
                      modelValue: e(t).editComponent.moduleTwo.listFrame.endColor,
                      "onUpdate:modelValue": a[9] || (a[9] = (l) => e(t).editComponent.moduleTwo.listFrame.endColor = l),
                      "show-alpha": ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                (b(!0), V(w, null, g(e(t).editComponent.moduleTwo.list, (l, v) => (b(), V("div", {
                  key: l.id,
                  class: "item-wrap p-[10px] pb-0 relative border border-dashed border-gray-300 mb-[16px]"
                }, [
                  o(m, {
                    label: e(d)("image")
                  }, {
                    default: u(() => [
                      o(r, {
                        modelValue: l.imageUrl,
                        "onUpdate:modelValue": (n) => l.imageUrl = n,
                        limit: 1
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("pictureShowBtnText")
                  }, {
                    default: u(() => [
                      o(h, {
                        modelValue: l.btnTitle.text,
                        "onUpdate:modelValue": (n) => l.btnTitle.text = n,
                        modelModifiers: { trim: !0 },
                        placeholder: e(d)("activeCubeTitlePlaceholder"),
                        clearable: "",
                        maxlength: "4",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("pictureShowBtnColor")
                  }, {
                    default: u(() => [
                      o(i, {
                        modelValue: l.btnTitle.color,
                        "onUpdate:modelValue": (n) => l.btnTitle.color = n,
                        "show-alpha": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("pictureShowBtnBgColor")
                  }, {
                    default: u(() => [
                      o(i, {
                        modelValue: l.btnTitle.startColor,
                        "onUpdate:modelValue": (n) => l.btnTitle.startColor = n,
                        "show-alpha": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      o(x, {
                        name: "iconfont iconmap-connect",
                        size: "20px",
                        class: "block !text-gray-400 mx-[5px]"
                      }),
                      o(i, {
                        modelValue: l.btnTitle.endColor,
                        "onUpdate:modelValue": (n) => l.btnTitle.endColor = n,
                        "show-alpha": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 2
                  }, 1032, ["label"]),
                  o(m, {
                    label: e(d)("link")
                  }, {
                    default: u(() => [
                      o(T, {
                        modelValue: l.link,
                        "onUpdate:modelValue": (n) => l.link = n
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
        U(s("div", E, [
          s("div", I, [
            s("h3", D, _(e(d)("pictureShowBlockStyle")), 1),
            o(C, {
              "label-width": "90px",
              class: "px-[10px]"
            }, {
              default: u(() => [
                o(m, {
                  label: e(d)("topRounded")
                }, {
                  default: u(() => [
                    o(f, {
                      modelValue: e(t).editComponent.moduleRounded.topRounded,
                      "onUpdate:modelValue": a[10] || (a[10] = (l) => e(t).editComponent.moduleRounded.topRounded = l),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 100
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(m, {
                  label: e(d)("bottomRounded")
                }, {
                  default: u(() => [
                    o(f, {
                      modelValue: e(t).editComponent.moduleRounded.bottomRounded,
                      "onUpdate:modelValue": a[11] || (a[11] = (l) => e(t).editComponent.moduleRounded.bottomRounded = l),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      max: 100
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          B(c.$slots, "style")
        ], 512), [
          [y, e(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as _
};
