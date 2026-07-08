import { defineComponent as v, reactive as w, onMounted as H, resolveComponent as s, openBlock as _, createElementBlock as T, Fragment as F, withDirectives as D, createElementVNode as M, renderSlot as Y, createVNode as a, withModifiers as U, withCtx as d, unref as e, createTextVNode as f, toDisplayString as c, createBlock as C, createCommentVNode as V, vShow as S } from "vue";
import { t as i, bA as x } from "./core-shared-9b1e55e9.js";
import { u as P } from "./diy-f9fec2a3.js";
const B = { class: "content-wrap" }, N = { class: "style-wrap" }, O = /* @__PURE__ */ v({
  __name: "edit-form-date",
  setup(W, { expose: $ }) {
    const t = P();
    t.editComponent.ignore = ["componentBgUrl"], t.editComponent.verify = (l) => ({ code: !0, message: "" });
    const m = w({
      format1: "",
      format2: "",
      format3: "",
      format4: ""
    });
    H(() => {
      const l = new Date();
      t.editComponent.field.default.date || (t.editComponent.field.default.date = l.toISOString().split("T")[0], t.editComponent.field.default.timestamp = l.getTime() / 1e3);
      const o = l.getFullYear(), n = String(l.getMonth() + 1).padStart(2, "0"), u = String(l.getDate()).padStart(2, "0"), p = String(l.getHours()).padStart(2, "0"), b = String(l.getMinutes()).padStart(2, "0");
      m.format1 = `${o}年${n}月${u}日`, m.format2 = `${o}-${n}-${u}`, m.format3 = `${o}/${n}/${u}`, m.format4 = `${o}-${n}-${u} ${p}:${b}`;
    });
    const g = (l) => {
      t.editComponent.field.default.date = l, t.editComponent.field.default.timestamp = x(l);
    };
    return $({}), (l, o) => {
      const n = s("el-radio"), u = s("el-radio-group"), p = s("el-form-item"), b = s("el-input"), h = s("el-switch"), y = s("el-date-picker"), k = s("el-form");
      return _(), T(F, null, [
        D(M("div", B, [
          Y(l.$slots, "field"),
          a(k, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: o[6] || (o[6] = U(() => {
            }, ["prevent"]))
          }, {
            default: d(() => [
              a(p, {
                label: e(i)("dataFormat")
              }, {
                default: d(() => [
                  a(u, {
                    modelValue: e(t).editComponent.dateFormat,
                    "onUpdate:modelValue": o[0] || (o[0] = (r) => e(t).editComponent.dateFormat = r),
                    class: "!block"
                  }, {
                    default: d(() => [
                      a(n, {
                        class: "!block",
                        label: "YYYY年M月D日"
                      }, {
                        default: d(() => [
                          f(c(m.format1), 1)
                        ]),
                        _: 1
                      }),
                      a(n, {
                        class: "!block",
                        label: "YYYY-MM-DD"
                      }, {
                        default: d(() => [
                          f(c(m.format2), 1)
                        ]),
                        _: 1
                      }),
                      a(n, {
                        class: "!block",
                        label: "YYYY/MM/DD"
                      }, {
                        default: d(() => [
                          f(c(m.format3), 1)
                        ]),
                        _: 1
                      }),
                      a(n, {
                        class: "!block",
                        label: "YYYY-MM-DD HH:mm"
                      }, {
                        default: d(() => [
                          f(c(m.format4), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(p, {
                label: e(i)("formPlaceholder")
              }, {
                default: d(() => [
                  a(b, {
                    modelValue: e(t).editComponent.placeholder,
                    "onUpdate:modelValue": o[1] || (o[1] = (r) => e(t).editComponent.placeholder = r),
                    modelModifiers: { trim: !0 },
                    placeholder: e(i)("formPlaceholderTips"),
                    clearable: "",
                    maxlength: "15",
                    "show-word-limit": ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(p, {
                label: e(i)("defaultValue")
              }, {
                default: d(() => [
                  a(h, {
                    modelValue: e(t).editComponent.defaultControl,
                    "onUpdate:modelValue": o[2] || (o[2] = (r) => e(t).editComponent.defaultControl = r)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              e(t).editComponent.defaultControl ? (_(), C(p, { key: 0 }, {
                default: d(() => [
                  a(u, {
                    modelValue: e(t).editComponent.dateWay,
                    "onUpdate:modelValue": o[3] || (o[3] = (r) => e(t).editComponent.dateWay = r)
                  }, {
                    default: d(() => [
                      a(n, { label: "current" }, {
                        default: d(() => [
                          f(c(e(i)("currentDate")), 1)
                        ]),
                        _: 1
                      }),
                      a(n, { label: "diy" }, {
                        default: d(() => [
                          f(c(e(i)("diyDate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              })) : V("", !0),
              e(t).editComponent.defaultControl && e(t).editComponent.dateWay == "diy" ? (_(), C(p, { key: 1 }, {
                default: d(() => [
                  e(t).editComponent.dateFormat != "YYYY-MM-DD HH:mm" ? (_(), C(y, {
                    key: 0,
                    modelValue: e(t).editComponent.field.default.date,
                    "onUpdate:modelValue": o[4] || (o[4] = (r) => e(t).editComponent.field.default.date = r),
                    format: "YYYY/MM/DD",
                    "value-format": "YYYY-MM-DD",
                    type: "date",
                    placeholder: e(i)("dataPlaceholder"),
                    onChange: g
                  }, null, 8, ["modelValue", "placeholder"])) : (_(), C(y, {
                    key: 1,
                    modelValue: e(t).editComponent.field.default.date,
                    "onUpdate:modelValue": o[5] || (o[5] = (r) => e(t).editComponent.field.default.date = r),
                    format: "YYYY/MM/DD HH:mm",
                    "value-format": "YYYY-MM-DD HH:mm",
                    type: "datetime",
                    placeholder: e(i)("dataPlaceholder"),
                    onChange: g
                  }, null, 8, ["modelValue", "placeholder"]))
                ]),
                _: 1
              })) : V("", !0)
            ]),
            _: 1
          }),
          Y(l.$slots, "other")
        ], 512), [
          [S, e(t).editTab == "content"]
        ]),
        D(M("div", N, [
          Y(l.$slots, "style-field"),
          Y(l.$slots, "style")
        ], 512), [
          [S, e(t).editTab == "style"]
        ])
      ], 64);
    };
  }
}), A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: O
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as _
};
