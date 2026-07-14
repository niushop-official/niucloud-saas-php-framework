import { defineComponent as D, onMounted as z, resolveComponent as u, openBlock as b, createElementBlock as B, Fragment as N, withDirectives as x, createElementVNode as c, renderSlot as S, toDisplayString as p, unref as o, createVNode as l, withModifiers as v, withCtx as i, createBlock as V, createTextVNode as g, createCommentVNode as h, vShow as H } from "vue";
import { t as r } from "./core-shared-11c0a673.js";
import { u as E } from "./diy-4662fd66.js";
const A = { class: "content-wrap" }, F = { class: "edit-attr-item-wrap" }, I = { class: "mb-[10px]" }, j = { class: "edit-attr-item-wrap" }, O = { class: "mb-[10px]" }, R = { class: "style-wrap" }, q = { class: "edit-attr-item-wrap" }, G = { class: "mb-[10px]" }, J = /* @__PURE__ */ D({
  __name: "edit-form-time-scope",
  setup(K, { expose: $ }) {
    const t = E();
    t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (d) => {
      const e = { code: !0, message: "" };
      let a = t.value[d].field.default.start.date, n = t.value[d].field.default.end.date;
      const f = new Date(), s = String(f.getHours()).padStart(2, "0"), _ = String(f.getMinutes()).padStart(2, "0");
      return t.editComponent.start.timeWay == "current" && (a = `${s}:${_}`), t.editComponent.end.timeWay == "current" && (n = `${s}:${_}`), t.editComponent.start.defaultControl && a == "" ? (e.code = !1, e.message = r("startTimeTips"), e) : t.editComponent.end.defaultControl && n == "" ? (e.code = !1, e.message = r("endTimeTips"), e) : (t.editComponent.start.defaultControl && t.editComponent.end.defaultControl && C(a) > C(n) && (e.code = !1, e.message = r("startEndTimeTips")), e);
    }, z(() => {
      const d = new Date(), e = String(d.getHours()).padStart(2, "0"), a = String(d.getMinutes()).padStart(2, "0");
      if (t.editComponent.field.default.start.date || (t.editComponent.field.default.start.date = `${e}:${a}`, t.editComponent.field.default.start.timestamp = C(`${e}:${a}`)), !t.editComponent.field.default.end.date) {
        const n = new Date();
        n.setHours(d.getHours(), d.getMinutes() + 10, 0, 0);
        const f = String(n.getHours()).padStart(2, "0"), s = String(n.getMinutes()).padStart(2, "0");
        t.editComponent.field.default.end.date = `${f}:${s}`, t.editComponent.field.default.end.timestamp = C(`${f}:${s}`);
      }
    });
    const k = (d) => {
      t.editComponent.field.default.start.timestamp = C(d);
      const e = d.split(":"), a = new Date();
      a.setHours(parseInt(e[0]), parseInt(e[1]), 0, 0), a.setMinutes(a.getMinutes() + 10);
      const n = `${String(a.getHours()).padStart(2, "0")}:${String(a.getMinutes()).padStart(2, "0")}`;
      t.editComponent.field.default.end.date = n, t.editComponent.field.default.end.timestamp = C(n);
    }, L = (d) => {
      t.editComponent.field.default.end.timestamp = C(d);
    }, M = () => {
      const d = t.editComponent.field.default.start.date.split(":");
      return T(0, d[0]);
    }, W = (d) => {
      const e = t.editComponent.field.default.start.date.split(":");
      return T(0, e[1]);
    }, T = (d, e) => {
      const a = [];
      for (let n = d; n < e; n++)
        a.push(n);
      return a;
    }, C = (d) => {
      const e = d.split(":");
      let a = 0;
      return e[0] && (a += e[0] * 60 * 60), e[1] && (a += e[1] * 60), e[2] && (a += e[2]), a;
    };
    return $({}), (d, e) => {
      const a = u("el-input"), n = u("el-form-item"), f = u("el-switch"), s = u("el-radio"), _ = u("el-radio-group"), w = u("el-time-picker"), y = u("el-form"), U = u("el-slider"), P = u("el-color-picker");
      return b(), B(N, null, [
        x(c("div", A, [
          S(d.$slots, "field"),
          c("div", F, [
            c("h3", I, p(o(r)("startTime")), 1),
            l(y, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: e[4] || (e[4] = v(() => {
              }, ["prevent"]))
            }, {
              default: i(() => [
                l(n, {
                  label: o(r)("formPlaceholder")
                }, {
                  default: i(() => [
                    l(a, {
                      modelValue: o(t).editComponent.start.placeholder,
                      "onUpdate:modelValue": e[0] || (e[0] = (m) => o(t).editComponent.start.placeholder = m),
                      modelModifiers: { trim: !0 },
                      placeholder: o(r)("formPlaceholderTips"),
                      clearable: "",
                      maxlength: "15",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(n, {
                  label: o(r)("defaultValue")
                }, {
                  default: i(() => [
                    l(f, {
                      modelValue: o(t).editComponent.start.defaultControl,
                      "onUpdate:modelValue": e[1] || (e[1] = (m) => o(t).editComponent.start.defaultControl = m)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(t).editComponent.start.defaultControl ? (b(), V(n, { key: 0 }, {
                  default: i(() => [
                    l(_, {
                      modelValue: o(t).editComponent.start.timeWay,
                      "onUpdate:modelValue": e[2] || (e[2] = (m) => o(t).editComponent.start.timeWay = m)
                    }, {
                      default: i(() => [
                        l(s, { label: "current" }, {
                          default: i(() => [
                            g(p(o(r)("currentTime")), 1)
                          ]),
                          _: 1
                        }),
                        l(s, { label: "diy" }, {
                          default: i(() => [
                            g(p(o(r)("diyTime")), 1)
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
                  default: i(() => [
                    l(w, {
                      modelValue: o(t).editComponent.field.default.start.date,
                      "onUpdate:modelValue": e[3] || (e[3] = (m) => o(t).editComponent.field.default.start.date = m),
                      placeholder: o(r)("startTimePlaceholder"),
                      format: "HH:mm",
                      "value-format": "HH:mm",
                      onChange: k
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                })) : h("", !0)
              ]),
              _: 1
            })
          ]),
          c("div", j, [
            c("h3", O, p(o(r)("endTime")), 1),
            l(y, {
              "label-width": "100px",
              class: "px-[10px]",
              onSubmit: e[9] || (e[9] = v(() => {
              }, ["prevent"]))
            }, {
              default: i(() => [
                l(n, {
                  label: o(r)("formPlaceholder")
                }, {
                  default: i(() => [
                    l(a, {
                      modelValue: o(t).editComponent.end.placeholder,
                      "onUpdate:modelValue": e[5] || (e[5] = (m) => o(t).editComponent.end.placeholder = m),
                      modelModifiers: { trim: !0 },
                      placeholder: o(r)("formPlaceholderTips"),
                      clearable: "",
                      maxlength: "15",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(n, {
                  label: o(r)("defaultValue")
                }, {
                  default: i(() => [
                    l(f, {
                      modelValue: o(t).editComponent.end.defaultControl,
                      "onUpdate:modelValue": e[6] || (e[6] = (m) => o(t).editComponent.end.defaultControl = m)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(t).editComponent.end.defaultControl ? (b(), V(n, { key: 0 }, {
                  default: i(() => [
                    l(_, {
                      modelValue: o(t).editComponent.end.timeWay,
                      "onUpdate:modelValue": e[7] || (e[7] = (m) => o(t).editComponent.end.timeWay = m)
                    }, {
                      default: i(() => [
                        l(s, { label: "current" }, {
                          default: i(() => [
                            g(p(o(r)("currentTime")), 1)
                          ]),
                          _: 1
                        }),
                        l(s, { label: "diy" }, {
                          default: i(() => [
                            g(p(o(r)("diyTime")), 1)
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
                  default: i(() => [
                    l(w, {
                      "disabled-hours": M,
                      "disabled-minutes": W,
                      modelValue: o(t).editComponent.field.default.end.date,
                      "onUpdate:modelValue": e[8] || (e[8] = (m) => o(t).editComponent.field.default.end.date = m),
                      placeholder: o(r)("endTimePlaceholder"),
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
          S(d.$slots, "other")
        ], 512), [
          [H, o(t).editTab == "content"]
        ]),
        x(c("div", R, [
          c("div", q, [
            c("h3", G, p(o(r)("textStyle")), 1),
            l(y, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                l(n, {
                  label: o(r)("textFontSize")
                }, {
                  default: i(() => [
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
                  label: o(r)("textFontWeight")
                }, {
                  default: i(() => [
                    l(_, {
                      modelValue: o(t).editComponent.fontWeight,
                      "onUpdate:modelValue": e[11] || (e[11] = (m) => o(t).editComponent.fontWeight = m)
                    }, {
                      default: i(() => [
                        l(s, { label: "normal" }, {
                          default: i(() => [
                            g(p(o(r)("fontWeightNormal")), 1)
                          ]),
                          _: 1
                        }),
                        l(s, { label: "bold" }, {
                          default: i(() => [
                            g(p(o(r)("fontWeightBold")), 1)
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
                  label: o(r)("textColor")
                }, {
                  default: i(() => [
                    l(P, {
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
          S(d.$slots, "style")
        ], 512), [
          [H, o(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), Z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: J
}, Symbol.toStringTag, { value: "Module" }));
export {
  Z as _
};
