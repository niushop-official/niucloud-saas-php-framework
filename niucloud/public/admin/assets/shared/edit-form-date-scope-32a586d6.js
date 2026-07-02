import { defineComponent as F, reactive as I, onMounted as O, resolveComponent as u, openBlock as b, createElementBlock as P, Fragment as z, withDirectives as x, createElementVNode as f, renderSlot as S, createVNode as l, withCtx as a, unref as o, createTextVNode as C, toDisplayString as p, withModifiers as w, createBlock as D, createCommentVNode as V, vShow as T } from "vue";
import { t as d, bA as y } from "./core-shared-ae4a556b.js";
import { u as B } from "./diy-30711e15.js";
const N = { class: "content-wrap" }, E = { class: "flex flex-col" }, j = { class: "edit-attr-item-wrap" }, H = { class: "mb-[10px]" }, A = { class: "edit-attr-item-wrap" }, q = { class: "mb-[10px]" }, G = { class: "style-wrap" }, J = { class: "edit-attr-item-wrap" }, K = { class: "mb-[10px]" }, L = /* @__PURE__ */ F({
  __name: "edit-form-date-scope",
  setup(Q, { expose: M }) {
    const e = B();
    e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (n) => {
      const t = { code: !0, message: "" };
      let m = e.value[n].field.default.start.date, s = e.value[n].field.default.end.date;
      const r = new Date(), c = String(r.getHours()).padStart(2, "0"), g = String(r.getMinutes()).padStart(2, "0");
      return e.editComponent.start.dateWay == "current" && (m = r.toISOString().split("T")[0]), e.editComponent.end.dateWay == "current" && (s = r.toISOString().split("T")[0]), e.editComponent.start.defaultControl && m == "" && e.editComponent.end.dateWay == "diy" ? (t.code = !1, t.message = d("startDataTips"), t) : e.editComponent.end.defaultControl && s == "" && e.editComponent.end.dateWay == "diy" ? (t.code = !1, t.message = d("endDataTips"), t) : (e.editComponent.start.defaultControl && e.editComponent.end.defaultControl && y(m) > y(s) && (t.code = !1, t.message = d("startEndDataTips")), t);
    };
    const _ = I({
      format1: "",
      format2: "",
      format3: ""
    }), v = (n) => {
      let t = null, m = !1;
      return e.editComponent.start && e.editComponent.start.defaultControl && (e.editComponent.start.dateWay == "diy" ? t = new Date(e.editComponent.field.default.start.date) : t = new Date(), m = n.getTime() < t.getTime()), m;
    };
    O(() => {
      const n = new Date(), t = new Date();
      t.setDate(t.getDate() + 7), e.editComponent.field.default.start.timestamp && (e.editComponent.field.default.start.date = n.toISOString().split("T")[0], e.editComponent.field.default.start.timestamp = parseInt(n.getTime() / 1e3)), e.editComponent.field.default.end.timestamp && (e.editComponent.field.default.end.date = t.toISOString().split("T")[0], e.editComponent.field.default.end.timestamp = parseInt(t.getTime() / 1e3));
      const m = n.getFullYear(), s = String(n.getMonth() + 1).padStart(2, "0"), r = String(n.getDate()).padStart(2, "0"), c = String(n.getHours()).padStart(2, "0"), g = String(n.getMinutes()).padStart(2, "0");
      _.format1 = `${m}年${s}月${r}日`, _.format2 = `${m}-${s}-${r}`, _.format3 = `${m}/${s}/${r}`, _.format4 = `${m}-${s}-${r} ${c}:${g}`;
    });
    const $ = (n) => {
      e.editComponent.field.default.start.date = n, e.editComponent.field.default.start.timestamp = y(n);
      const t = new Date(n);
      t.setDate(t.getDate() + 7), e.editComponent.field.default.end.date = t.toISOString().split("T")[0], e.editComponent.field.default.end.timestamp = parseInt(t.getTime() / 1e3);
    }, W = (n) => {
      e.editComponent.field.default.end.date = n, e.editComponent.field.default.end.timestamp = y(n);
    };
    return M({}), (n, t) => {
      const m = u("el-radio"), s = u("el-radio-group"), r = u("el-form-item"), c = u("el-form"), g = u("el-input"), h = u("el-switch"), Y = u("el-date-picker"), U = u("el-slider"), k = u("el-color-picker");
      return b(), P(z, null, [
        x(f("div", N, [
          S(n.$slots, "field"),
          l(c, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: a(() => [
              l(r, {
                label: o(d)("dataFormat")
              }, {
                default: a(() => [
                  l(s, {
                    modelValue: o(e).editComponent.dateFormat,
                    "onUpdate:modelValue": t[0] || (t[0] = (i) => o(e).editComponent.dateFormat = i)
                  }, {
                    default: a(() => [
                      f("div", E, [
                        l(m, { label: "YYYY年M月D日" }, {
                          default: a(() => [
                            C(p(_.format1), 1)
                          ]),
                          _: 1
                        }),
                        l(m, { label: "YYYY-MM-DD" }, {
                          default: a(() => [
                            C(p(_.format2), 1)
                          ]),
                          _: 1
                        }),
                        l(m, { label: "YYYY/MM/DD" }, {
                          default: a(() => [
                            C(p(_.format3), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          f("div", j, [
            f("h3", H, p(o(d)("startDate")), 1),
            l(c, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: t[5] || (t[5] = w(() => {
              }, ["prevent"]))
            }, {
              default: a(() => [
                l(r, {
                  label: o(d)("formPlaceholder")
                }, {
                  default: a(() => [
                    l(g, {
                      modelValue: o(e).editComponent.start.placeholder,
                      "onUpdate:modelValue": t[1] || (t[1] = (i) => o(e).editComponent.start.placeholder = i),
                      modelModifiers: { trim: !0 },
                      placeholder: o(d)("formPlaceholderTips"),
                      clearable: "",
                      maxlength: "15",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: o(d)("defaultValue")
                }, {
                  default: a(() => [
                    l(h, {
                      modelValue: o(e).editComponent.start.defaultControl,
                      "onUpdate:modelValue": t[2] || (t[2] = (i) => o(e).editComponent.start.defaultControl = i)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(e).editComponent.start.defaultControl ? (b(), D(r, { key: 0 }, {
                  default: a(() => [
                    l(s, {
                      modelValue: o(e).editComponent.start.dateWay,
                      "onUpdate:modelValue": t[3] || (t[3] = (i) => o(e).editComponent.start.dateWay = i)
                    }, {
                      default: a(() => [
                        l(m, { label: "current" }, {
                          default: a(() => [
                            C(p(o(d)("currentDate")), 1)
                          ]),
                          _: 1
                        }),
                        l(m, { label: "diy" }, {
                          default: a(() => [
                            C(p(o(d)("diyDate")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : V("", !0),
                o(e).editComponent.start.defaultControl && o(e).editComponent.start.dateWay == "diy" ? (b(), D(r, { key: 1 }, {
                  default: a(() => [
                    l(Y, {
                      modelValue: o(e).editComponent.field.default.start.date,
                      "onUpdate:modelValue": t[4] || (t[4] = (i) => o(e).editComponent.field.default.start.date = i),
                      format: "YYYY/MM/DD",
                      "value-format": "YYYY-MM-DD",
                      type: "date",
                      placeholder: o(d)("startDataPlaceholder"),
                      onChange: $
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                })) : V("", !0)
              ]),
              _: 1
            })
          ]),
          f("div", A, [
            f("h3", q, p(o(d)("endDate")), 1),
            l(c, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: t[10] || (t[10] = w(() => {
              }, ["prevent"]))
            }, {
              default: a(() => [
                l(r, {
                  label: o(d)("formPlaceholder")
                }, {
                  default: a(() => [
                    l(g, {
                      modelValue: o(e).editComponent.end.placeholder,
                      "onUpdate:modelValue": t[6] || (t[6] = (i) => o(e).editComponent.end.placeholder = i),
                      modelModifiers: { trim: !0 },
                      placeholder: o(d)("formPlaceholderTips"),
                      clearable: "",
                      maxlength: "15",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: o(d)("defaultValue")
                }, {
                  default: a(() => [
                    l(h, {
                      modelValue: o(e).editComponent.end.defaultControl,
                      "onUpdate:modelValue": t[7] || (t[7] = (i) => o(e).editComponent.end.defaultControl = i)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(e).editComponent.end.defaultControl ? (b(), D(r, { key: 0 }, {
                  default: a(() => [
                    l(s, {
                      modelValue: o(e).editComponent.end.dateWay,
                      "onUpdate:modelValue": t[8] || (t[8] = (i) => o(e).editComponent.end.dateWay = i)
                    }, {
                      default: a(() => [
                        l(m, { label: "current" }, {
                          default: a(() => [
                            C(p(o(d)("currentDate")), 1)
                          ]),
                          _: 1
                        }),
                        l(m, { label: "diy" }, {
                          default: a(() => [
                            C(p(o(d)("diyDate")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : V("", !0),
                o(e).editComponent.end.defaultControl && o(e).editComponent.end.dateWay == "diy" ? (b(), D(r, { key: 1 }, {
                  default: a(() => [
                    l(Y, {
                      "disabled-date": v,
                      modelValue: o(e).editComponent.field.default.end.date,
                      "onUpdate:modelValue": t[9] || (t[9] = (i) => o(e).editComponent.field.default.end.date = i),
                      format: "YYYY/MM/DD",
                      "value-format": "YYYY-MM-DD",
                      type: "date",
                      placeholder: o(d)("endDataPlaceholder"),
                      onChange: W
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                })) : V("", !0)
              ]),
              _: 1
            })
          ]),
          S(n.$slots, "other")
        ], 512), [
          [T, o(e).editTab == "content"]
        ]),
        x(f("div", G, [
          f("div", J, [
            f("h3", K, p(o(d)("textStyle")), 1),
            l(c, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: a(() => [
                l(r, {
                  label: o(d)("textFontSize")
                }, {
                  default: a(() => [
                    l(U, {
                      modelValue: o(e).editComponent.fontSize,
                      "onUpdate:modelValue": t[11] || (t[11] = (i) => o(e).editComponent.fontSize = i),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 12,
                      max: 18
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(r, {
                  label: o(d)("textFontWeight")
                }, {
                  default: a(() => [
                    l(s, {
                      modelValue: o(e).editComponent.fontWeight,
                      "onUpdate:modelValue": t[12] || (t[12] = (i) => o(e).editComponent.fontWeight = i)
                    }, {
                      default: a(() => [
                        l(m, { label: "normal" }, {
                          default: a(() => [
                            C(p(o(d)("fontWeightNormal")), 1)
                          ]),
                          _: 1
                        }),
                        l(m, { label: "bold" }, {
                          default: a(() => [
                            C(p(o(d)("fontWeightBold")), 1)
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
                  label: o(d)("textColor")
                }, {
                  default: a(() => [
                    l(k, {
                      modelValue: o(e).editComponent.textColor,
                      "onUpdate:modelValue": t[13] || (t[13] = (i) => o(e).editComponent.textColor = i)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          S(n.$slots, "style")
        ], 512), [
          [T, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: L
}, Symbol.toStringTag, { value: "Module" }));
export {
  ee as _
};
