import { defineComponent as P, onMounted as z, resolveComponent as u, openBlock as b, createElementBlock as B, Fragment as N, withDirectives as x, createElementVNode as c, renderSlot as S, toDisplayString as p, unref as o, createVNode as l, withModifiers as v, withCtx as a, createBlock as V, createTextVNode as g, createCommentVNode as h, vShow as H } from "vue";
import { t as i } from "./core-shared-ca1fcae5.js";
import { u as E } from "./diy-f8acd48b.js";
const A = { class: "content-wrap" }, F = { class: "edit-attr-item-wrap" }, I = { class: "mb-[10px]" }, j = { class: "edit-attr-item-wrap" }, O = { class: "mb-[10px]" }, R = { class: "style-wrap" }, q = { class: "edit-attr-item-wrap" }, G = { class: "mb-[10px]" }, J = /* @__PURE__ */ P({
  __name: "edit-form-time-scope",
  setup(K, { expose: $ }) {
    const t = E();
    t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (r) => {
      const e = { code: !0, message: "" };
      let d = t.value[r].field.default.start.date, n = t.value[r].field.default.end.date;
      const f = new Date(), s = String(f.getHours()).padStart(2, "0"), _ = String(f.getMinutes()).padStart(2, "0");
      return t.editComponent.start.timeWay == "current" && (d = `${s}:${_}`), t.editComponent.end.timeWay == "current" && (n = `${s}:${_}`), t.editComponent.start.defaultControl && d == "" ? (e.code = !1, e.message = i("startTimeTips"), e) : t.editComponent.end.defaultControl && n == "" ? (e.code = !1, e.message = i("endTimeTips"), e) : (t.editComponent.start.defaultControl && t.editComponent.end.defaultControl && C(d) > C(n) && (e.code = !1, e.message = i("startEndTimeTips")), e);
    }, z(() => {
      const r = new Date(), e = String(r.getHours()).padStart(2, "0"), d = String(r.getMinutes()).padStart(2, "0");
      if (t.editComponent.field.default.start.date || (t.editComponent.field.default.start.date = `${e}:${d}`, t.editComponent.field.default.start.timestamp = C(`${e}:${d}`)), !t.editComponent.field.default.end.date) {
        const n = new Date();
        n.setHours(r.getHours(), r.getMinutes() + 10, 0, 0);
        const f = String(n.getHours()).padStart(2, "0"), s = String(n.getMinutes()).padStart(2, "0");
        t.editComponent.field.default.end.date = `${f}:${s}`, t.editComponent.field.default.end.timestamp = C(`${f}:${s}`);
      }
    });
    const M = (r) => {
      t.editComponent.field.default.start.timestamp = C(r);
      const e = r.split(":"), d = new Date();
      d.setHours(parseInt(e[0]), parseInt(e[1]), 0, 0), d.setMinutes(d.getMinutes() + 10);
      const n = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      t.editComponent.field.default.end.date = n, t.editComponent.field.default.end.timestamp = C(n);
    }, k = () => {
      const r = t.editComponent.field.default.start.date.split(":");
      return T(0, r[0]);
    }, W = (r) => {
      const e = t.editComponent.field.default.start.date.split(":");
      return T(0, e[1]);
    }, T = (r, e) => {
      const d = [];
      for (let n = r; n < e; n++)
        d.push(n);
      return d;
    }, C = (r) => {
      const e = r.split(":");
      let d = 0;
      return e[0] && (d += e[0] * 60 * 60), e[1] && (d += e[1] * 60), e[2] && (d += e[2]), d;
    };
    return $({}), (r, e) => {
      const d = u("el-input"), n = u("el-form-item"), f = u("el-switch"), s = u("el-radio"), _ = u("el-radio-group"), w = u("el-time-picker"), y = u("el-form"), U = u("el-slider"), D = u("el-color-picker");
      return b(), B(N, null, [
        x(c("div", A, [
          S(r.$slots, "field"),
          c("div", F, [
            c("h3", I, p(o(i)("startTime")), 1),
            l(y, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: e[4] || (e[4] = v(() => {
              }, ["prevent"]))
            }, {
              default: a(() => [
                l(n, {
                  label: o(i)("formPlaceholder")
                }, {
                  default: a(() => [
                    l(d, {
                      modelValue: o(t).editComponent.start.placeholder,
                      "onUpdate:modelValue": e[0] || (e[0] = (m) => o(t).editComponent.start.placeholder = m),
                      modelModifiers: { trim: !0 },
                      placeholder: o(i)("formPlaceholderTips"),
                      clearable: "",
                      maxlength: "15",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(n, {
                  label: o(i)("defaultValue")
                }, {
                  default: a(() => [
                    l(f, {
                      modelValue: o(t).editComponent.start.defaultControl,
                      "onUpdate:modelValue": e[1] || (e[1] = (m) => o(t).editComponent.start.defaultControl = m)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(t).editComponent.start.defaultControl ? (b(), V(n, { key: 0 }, {
                  default: a(() => [
                    l(_, {
                      modelValue: o(t).editComponent.start.timeWay,
                      "onUpdate:modelValue": e[2] || (e[2] = (m) => o(t).editComponent.start.timeWay = m)
                    }, {
                      default: a(() => [
                        l(s, { label: "current" }, {
                          default: a(() => [
                            g(p(o(i)("currentTime")), 1)
                          ]),
                          _: 1
                        }),
                        l(s, { label: "diy" }, {
                          default: a(() => [
                            g(p(o(i)("diyTime")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : h("", !0),
                o(t).editComponent.start.defaultControl && o(t).editComponent.start.timeWay == "diy" ? (b(), V(n, { key: 1 }, {
                  default: a(() => [
                    l(w, {
                      modelValue: o(t).editComponent.field.default.start.date,
                      "onUpdate:modelValue": e[3] || (e[3] = (m) => o(t).editComponent.field.default.start.date = m),
                      placeholder: o(i)("startTimePlaceholder"),
                      format: "HH:mm",
                      "value-format": "HH:mm",
                      onChange: M
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                })) : h("", !0)
              ]),
              _: 1
            })
          ]),
          c("div", j, [
            c("h3", O, p(o(i)("endTime")), 1),
            l(y, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: e[9] || (e[9] = v(() => {
              }, ["prevent"]))
            }, {
              default: a(() => [
                l(n, {
                  label: o(i)("formPlaceholder")
                }, {
                  default: a(() => [
                    l(d, {
                      modelValue: o(t).editComponent.end.placeholder,
                      "onUpdate:modelValue": e[5] || (e[5] = (m) => o(t).editComponent.end.placeholder = m),
                      modelModifiers: { trim: !0 },
                      placeholder: o(i)("formPlaceholderTips"),
                      clearable: "",
                      maxlength: "15",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(n, {
                  label: o(i)("defaultValue")
                }, {
                  default: a(() => [
                    l(f, {
                      modelValue: o(t).editComponent.end.defaultControl,
                      "onUpdate:modelValue": e[6] || (e[6] = (m) => o(t).editComponent.end.defaultControl = m)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(t).editComponent.end.defaultControl ? (b(), V(n, { key: 0 }, {
                  default: a(() => [
                    l(_, {
                      modelValue: o(t).editComponent.end.timeWay,
                      "onUpdate:modelValue": e[7] || (e[7] = (m) => o(t).editComponent.end.timeWay = m)
                    }, {
                      default: a(() => [
                        l(s, { label: "current" }, {
                          default: a(() => [
                            g(p(o(i)("currentTime")), 1)
                          ]),
                          _: 1
                        }),
                        l(s, { label: "diy" }, {
                          default: a(() => [
                            g(p(o(i)("diyTime")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : h("", !0),
                o(t).editComponent.end.defaultControl && o(t).editComponent.end.timeWay == "diy" ? (b(), V(n, { key: 1 }, {
                  default: a(() => [
                    l(w, {
                      "disabled-hours": k,
                      "disabled-minutes": W,
                      modelValue: o(t).editComponent.field.default.end.date,
                      "onUpdate:modelValue": e[8] || (e[8] = (m) => o(t).editComponent.field.default.end.date = m),
                      placeholder: o(i)("endTimePlaceholder"),
                      format: "HH:mm",
                      "value-format": "HH:mm"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                })) : h("", !0)
              ]),
              _: 1
            })
          ]),
          S(r.$slots, "other")
        ], 512), [
          [H, o(t).editTab == "content"]
        ]),
        x(c("div", R, [
          c("div", q, [
            c("h3", G, p(o(i)("textStyle")), 1),
            l(y, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: a(() => [
                l(n, {
                  label: o(i)("textFontSize")
                }, {
                  default: a(() => [
                    l(U, {
                      modelValue: o(t).editComponent.fontSize,
                      "onUpdate:modelValue": e[10] || (e[10] = (m) => o(t).editComponent.fontSize = m),
                      "show-input": "",
                      size: "small",
                      class: "ml-[10px] diy-nav-slider",
                      min: 12,
                      max: 18
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(n, {
                  label: o(i)("textFontWeight")
                }, {
                  default: a(() => [
                    l(_, {
                      modelValue: o(t).editComponent.fontWeight,
                      "onUpdate:modelValue": e[11] || (e[11] = (m) => o(t).editComponent.fontWeight = m)
                    }, {
                      default: a(() => [
                        l(s, { label: "normal" }, {
                          default: a(() => [
                            g(p(o(i)("fontWeightNormal")), 1)
                          ]),
                          _: 1
                        }),
                        l(s, { label: "bold" }, {
                          default: a(() => [
                            g(p(o(i)("fontWeightBold")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(n, {
                  label: o(i)("textColor")
                }, {
                  default: a(() => [
                    l(D, {
                      modelValue: o(t).editComponent.textColor,
                      "onUpdate:modelValue": e[12] || (e[12] = (m) => o(t).editComponent.textColor = m)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          S(r.$slots, "style")
        ], 512), [
          [H, o(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J
}, Symbol.toStringTag, { value: "Module" }));
export {
  Y as _
};
