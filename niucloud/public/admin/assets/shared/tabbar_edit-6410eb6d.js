import { defineComponent as oe, ref as b, reactive as E, onMounted as ae, nextTick as ne, resolveComponent as d, resolveDirective as se, openBlock as v, createElementBlock as y, createVNode as l, withCtx as s, unref as n, withDirectives as T, createBlock as H, createElementVNode as r, normalizeStyle as R, Fragment as j, renderList as L, createCommentVNode as M, toDisplayString as u, normalizeClass as re, createTextVNode as p, vShow as ie, pushScopeId as Oe, popScopeId as qe } from "vue";
import { b6 as de, i as ue, t as a, bx as ce, by as pe, _ as me } from "./core-shared-5b3bfa35.js";
import { ArrowLeft as _e } from "@element-plus/icons-vue";
import { r as ve } from "./lodash-8c6c2daa.js";
import { useRoute as fe, useRouter as xe } from "vue-router";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const be = { class: "main-container" }, ye = { class: "flex" }, ge = { class: "w-[360px] h-[400px] absolute mr-[30px] border-[1px] border-gray-300" }, ke = { class: "image-slot flex justify-center items-center mt-1" }, Ce = { class: "flex-1 ml-[430px]" }, he = { class: "flex items-center border-l-[3px] border-primary pl-[5px] leading-[1.1] mt-[10px]" }, Ve = { class: "text-[14px]" }, we = { class: "text-[14px] text-primary mx-[3px]" }, Se = { class: "text-[14px]" }, Ue = { class: "text-[12px] ml-[8px] text-gray-500" }, Fe = ["data-id"], $e = { class: "flex align-center" }, Ie = { class: "flex flex-col justify-center items-center" }, Pe = { class: "mr-[10px] text-sm" }, Ne = { class: "flex flex-col justify-center items-center" }, De = { class: "mr-[10px] text-sm" }, Be = { class: "flex align-center" }, Ee = { class: "flex align-center" }, Te = { class: "flex align-center" }, He = { class: "fixed-footer-wrap" }, Re = { class: "fixed-footer" }, je = /* @__PURE__ */ oe({
  __name: "tabbar_edit",
  setup(Le) {
    const k = fe(), z = xe(), O = k.meta.title, S = b("navPicture"), m = b(!1);
    k.query.key = k.query.key || "";
    const t = E({
      key: "",
      info: {},
      value: {
        backgroundColor: "#FFFFFF",
        textColor: "#333333",
        textHoverColor: "#333333",
        type: "1",
        list: []
      }
    }), q = E({
      text: "",
      link: {
        name: "",
        title: "",
        parent: "",
        url: ""
      },
      iconSelectPath: "",
      iconPath: ""
    }), U = () => {
      t.value.list.length >= 5 || t.value.list.push({ ...q });
    };
    U();
    const A = (i) => {
      t.value.list.splice(i, 1);
    }, F = b();
    (() => {
      m.value = !0, ce({
        key: k.query.key
      }).then((i) => {
        m.value = !1, Object.keys(t).forEach((e, c) => {
          t[e] = i.data[e];
        });
      }).catch(() => {
        m.value = !1;
      });
    })();
    const J = async (i) => {
      if (Y())
        return !1;
      m.value || !i || await i.validate(async (e) => {
        e && (m.value = !0, pe({ key: t.key, value: t.value }).then((c) => {
          m.value = !1;
        }).catch(() => {
          m.value = !1;
        }));
      });
    }, $ = () => {
      z.push("/diy/tabbar");
    }, Y = () => {
      if (t.value.list.length < 2)
        return ElNotification({
          type: "error",
          message: a("leastTwoNav")
        }), !0;
      try {
        const i = b("");
        t.value.list.forEach((e, c) => {
          if (e.iconPath || (i.value = `${a("pleaseUpload")}${c + 1}${a("navIcon")}`), e.iconSelectPath || (i.value = `${a("pleaseUpload")}${c + 1}${a("navSelectIcon")}`), e.text || (i.value = `${a("pleaseEnter")}[${c + 1}${a("navTitle")}`), e.link.url || (i.value = `${a("pleaseChoose")}${c + 1}${a("navLink")}`), i.value)
            throw ElNotification({
              type: "error",
              message: i.value
            }), Error();
        });
      } catch {
        return !0;
      }
      return !1;
    }, I = b();
    ae(() => {
      const i = de.create(I.value, {
        group: "item-wrap",
        animation: 200,
        filter: ".not-sort",
        // 过滤.not-sort的元素
        onEnd: (e) => {
          const c = t.value.list[e.oldIndex];
          t.value.list.splice(e.oldIndex, 1), t.value.list.splice(e.newIndex, 0, c), ne(() => {
            i.sort(
              ve(t.value.list.length).map((C) => C.toString())
            );
          });
        }
      });
    });
    const P = b(!1), G = (i) => {
      P.value = i;
    };
    return (i, e) => {
      const c = d("el-page-header"), C = d("el-card"), K = d("Picture"), N = d("el-icon"), Q = d("el-image"), D = d("upload-image"), f = d("el-form-item"), h = d("el-input"), W = d("diy-link"), X = d("CircleCloseFilled"), x = d("el-button"), B = d("el-tab-pane"), V = d("el-radio"), Z = d("el-radio-group"), w = d("el-color-picker"), ee = d("el-tabs"), te = d("el-form"), le = se("loading");
      return v(), y("div", be, [
        l(C, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            l(c, {
              content: n(O),
              icon: n(_e),
              onBack: e[0] || (e[0] = (o) => $())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        T((v(), H(C, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            r("div", ye, [
              r("div", ge, [
                r("div", {
                  class: "flex items-center justify-between absolute h-[60px] left-[0px] right-[0px] bottom-[0px] border-[1px] border-primary",
                  style: R({ backgroundColor: t.value.backgroundColor })
                }, [
                  (v(!0), y(j, null, L(t.value.list, (o, g) => (v(), y("div", {
                    class: "flex flex-1 flex-col items-center justify-center",
                    key: "b" + g
                  }, [
                    ["1", "2"].includes(t.value.type.toString()) ? (v(), H(Q, {
                      key: 0,
                      class: "w-[22px] h-[22px] mb-[5px] leading-1",
                      src: n(ue)(o.iconPath),
                      fit: i.contain
                    }, {
                      error: s(() => [
                        r("div", ke, [
                          l(N, null, {
                            default: s(() => [
                              l(K, { class: "text-3xl text-gray-500" })
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 2
                    }, 1032, ["src", "fit"])) : M("", !0),
                    ["1", "3"].includes(t.value.type.toString()) ? (v(), y("span", {
                      key: 1,
                      class: "text-[12px]",
                      style: R({ color: t.value.textColor })
                    }, u(o.text), 5)) : M("", !0)
                  ]))), 128))
                ], 4)
              ]),
              r("div", Ce, [
                r("div", he, [
                  r("span", Ve, u(n(a)("editing")), 1),
                  r("span", we, u(t.info.title), 1),
                  r("span", Se, u(n(a)("bottomNav")), 1),
                  r("span", Ue, u(n(a)("bottomNavHint")), 1)
                ]),
                l(te, {
                  model: t.value,
                  "label-width": "100px",
                  ref_key: "formRef",
                  ref: F
                }, {
                  default: s(() => [
                    l(ee, {
                      modelValue: S.value,
                      "onUpdate:modelValue": e[11] || (e[11] = (o) => S.value = o),
                      class: "demo-tabs mt-[15px]"
                    }, {
                      default: s(() => [
                        l(B, {
                          label: n(a)("navImage"),
                          name: "navPicture"
                        }, {
                          default: s(() => [
                            r("div", {
                              ref_key: "navItemRef",
                              ref: I
                            }, [
                              (v(!0), y(j, null, L(t.value.list, (o, g) => (v(), y("div", {
                                key: "a" + g,
                                "data-id": g,
                                class: re(["item-wrap border-2 border-dashed pt-[18px] m-[10px] mb-[15px] relative list-item", { "not-sort": P.value }])
                              }, [
                                l(f, {
                                  label: n(a)("navIconOne")
                                }, {
                                  default: s(() => [
                                    r("div", $e, [
                                      r("div", Ie, [
                                        l(D, {
                                          modelValue: o.iconPath,
                                          "onUpdate:modelValue": (_) => o.iconPath = _,
                                          width: "60px",
                                          height: "60px",
                                          limit: 1
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        r("span", Pe, u(n(a)("uploadImgUnselected")), 1)
                                      ]),
                                      r("div", Ne, [
                                        l(D, {
                                          modelValue: o.iconSelectPath,
                                          "onUpdate:modelValue": (_) => o.iconSelectPath = _,
                                          width: "60px",
                                          height: "60px",
                                          limit: 1
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        r("span", De, u(n(a)("uploadImgSelected")), 1)
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["label"]),
                                l(f, {
                                  label: n(a)("navTitleOne")
                                }, {
                                  default: s(() => [
                                    l(h, {
                                      class: "!w-[215px]",
                                      modelValue: o.text,
                                      "onUpdate:modelValue": (_) => o.text = _,
                                      modelModifiers: { trim: !0 },
                                      placeholder: n(a)("titleContent"),
                                      maxlength: "5",
                                      "show-word-limit": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                  ]),
                                  _: 2
                                }, 1032, ["label"]),
                                l(f, {
                                  label: n(a)("navLinkOne")
                                }, {
                                  default: s(() => [
                                    l(W, {
                                      modelValue: o.link,
                                      "onUpdate:modelValue": (_) => o.link = _,
                                      ignore: ["DIY_JUMP_OTHER_APPLET"],
                                      onConfirm: G
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1032, ["label"]),
                                l(N, {
                                  class: "close-icon cursor-pointer -top-[11px] -right-[8px]",
                                  onClick: (_) => A(g)
                                }, {
                                  default: s(() => [
                                    l(X)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ], 10, Fe))), 128))
                            ], 512),
                            T(l(x, {
                              type: "primary",
                              class: "mt-[15px]",
                              onClick: U
                            }, {
                              default: s(() => [
                                p(u(n(a)("addnav")), 1)
                              ]),
                              _: 1
                            }, 512), [
                              [ie, t.value.list.length < 5]
                            ])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        l(B, {
                          label: n(a)("styleSet"),
                          name: "setStyle"
                        }, {
                          default: s(() => [
                            l(f, {
                              label: n(a)("navType")
                            }, {
                              default: s(() => [
                                l(Z, {
                                  modelValue: t.value.type,
                                  "onUpdate:modelValue": e[1] || (e[1] = (o) => t.value.type = o),
                                  class: "ml-4"
                                }, {
                                  default: s(() => [
                                    l(V, {
                                      label: "1",
                                      size: "large"
                                    }, {
                                      default: s(() => [
                                        p(u(n(a)("imageText")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    l(V, {
                                      label: "2",
                                      size: "large"
                                    }, {
                                      default: s(() => [
                                        p(u(n(a)("image")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    l(V, {
                                      label: "3",
                                      size: "large"
                                    }, {
                                      default: s(() => [
                                        p(u(n(a)("text")), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            l(f, {
                              label: n(a)("textColor")
                            }, {
                              default: s(() => [
                                r("div", Be, [
                                  l(w, {
                                    modelValue: t.value.textColor,
                                    "onUpdate:modelValue": e[2] || (e[2] = (o) => t.value.textColor = o)
                                  }, null, 8, ["modelValue"]),
                                  l(h, {
                                    class: "ml-[10px]",
                                    modelValue: t.value.textColor,
                                    "onUpdate:modelValue": e[3] || (e[3] = (o) => t.value.textColor = o),
                                    modelModifiers: { trim: !0 },
                                    disabled: ""
                                  }, null, 8, ["modelValue"]),
                                  l(x, {
                                    class: "ml-[10px]",
                                    type: "primary",
                                    onClick: e[4] || (e[4] = (o) => t.value.textColor = "#333333")
                                  }, {
                                    default: s(() => [
                                      p(u(n(a)("reset")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            l(f, {
                              label: n(a)("textSelectColor")
                            }, {
                              default: s(() => [
                                r("div", Ee, [
                                  l(w, {
                                    modelValue: t.value.textHoverColor,
                                    "onUpdate:modelValue": e[5] || (e[5] = (o) => t.value.textHoverColor = o)
                                  }, null, 8, ["modelValue"]),
                                  l(h, {
                                    class: "ml-[10px]",
                                    modelValue: t.value.textHoverColor,
                                    "onUpdate:modelValue": e[6] || (e[6] = (o) => t.value.textHoverColor = o),
                                    modelModifiers: { trim: !0 },
                                    disabled: ""
                                  }, null, 8, ["modelValue"]),
                                  l(x, {
                                    class: "ml-[10px]",
                                    type: "primary",
                                    onClick: e[7] || (e[7] = (o) => t.value.textHoverColor = "#333333")
                                  }, {
                                    default: s(() => [
                                      p(u(n(a)("reset")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            l(f, {
                              label: n(a)("backgroundColor")
                            }, {
                              default: s(() => [
                                r("div", Te, [
                                  l(w, {
                                    modelValue: t.value.backgroundColor,
                                    "onUpdate:modelValue": e[8] || (e[8] = (o) => t.value.backgroundColor = o)
                                  }, null, 8, ["modelValue"]),
                                  l(h, {
                                    class: "ml-[10px]",
                                    modelValue: t.value.backgroundColor,
                                    "onUpdate:modelValue": e[9] || (e[9] = (o) => t.value.backgroundColor = o),
                                    modelModifiers: { trim: !0 },
                                    disabled: ""
                                  }, null, 8, ["modelValue"]),
                                  l(x, {
                                    class: "ml-[10px]",
                                    type: "primary",
                                    onClick: e[10] || (e[10] = (o) => t.value.backgroundColor = "#FFFFFF")
                                  }, {
                                    default: s(() => [
                                      p(u(n(a)("reset")), 1)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["model"])
              ])
            ])
          ]),
          _: 1
        })), [
          [le, m.value]
        ]),
        r("div", He, [
          r("div", Re, [
            l(x, {
              type: "primary",
              onClick: e[12] || (e[12] = (o) => J(F.value))
            }, {
              default: s(() => [
                p(u(n(a)("save")), 1)
              ]),
              _: 1
            }),
            l(x, {
              onClick: e[13] || (e[13] = (o) => $())
            }, {
              default: s(() => [
                p(u(n(a)("back")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const Ze = /* @__PURE__ */ me(je, [["__scopeId", "data-v-d4079ff7"]]);
export {
  Ze as default
};
