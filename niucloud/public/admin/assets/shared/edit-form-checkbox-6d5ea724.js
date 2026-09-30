import { defineComponent as U, ref as h, onMounted as B, nextTick as D, resolveComponent as c, openBlock as b, createElementBlock as g, Fragment as S, withDirectives as T, createElementVNode as m, renderSlot as v, createVNode as r, withCtx as p, unref as n, createTextVNode as _, toDisplayString as d, renderList as I, createCommentVNode as P, vShow as N } from "vue";
import { t as l, be as j } from "./core-shared-c6ad4e77.js";
import { u as K } from "./diy-452683aa.js";
import { r as A } from "./lodash-8c6c2daa.js";
import { ElMessage as F } from "element-plus";
const J = { class: "content-wrap" }, L = ["onClick"], G = { class: "mb-[5px]" }, H = { class: "text-[#888] text-[12px] mb-[5px]" }, Q = { class: "mt-[10px] text-right" }, W = { class: "style-wrap" }, X = /* @__PURE__ */ U({
  __name: "edit-form-checkbox",
  setup(Y, { expose: $ }) {
    const e = K();
    e.editComponent.ignore = ["componentBgUrl"], e.editComponent.verify = (o) => {
      const t = { code: !0, message: "" };
      let i = !0;
      for (let a = 0; a < e.value[o].options.length; a++)
        if (!e.value[o].options[a].text) {
          t.code = !1, t.message = l("optionPlaceholder"), i = !1;
          break;
        }
      return i && C(e.value[o].options, "text").length != e.value[o].options.length && (t.code = !1, t.message = l("errorTipsOne")), t;
    }, e.editComponent.options.forEach((o) => {
      o.id || (o.id = e.generateRandom());
    });
    const x = h(!1), f = h(), M = () => {
      e.editComponent.options.push({
        id: e.generateRandom(),
        text: "选项" + (e.editComponent.options.length + 1)
      });
    }, q = (o) => {
      e.editComponent.options.splice(o, 1);
    }, z = () => {
      if (f.value.trim()) {
        const o = f.value.split(",").map((s) => ({
          id: e.generateRandom(),
          text: s.trim()
        })).filter((s) => s.text !== ""), i = C(o, "text").filter(
          (s) => !e.editComponent.options.some((a) => a.text === s.text)
        );
        i.length > 0 ? e.editComponent.options.push(...i) : F({
          message: l("errorTipsTwo"),
          type: "error"
        }), f.value = "", x.value = !1;
      }
    }, C = (o, t) => {
      const i = /* @__PURE__ */ new Set();
      return o.filter((s) => {
        const a = JSON.stringify(s[t]);
        return i.has(a) ? !1 : i.add(a);
      });
    }, w = h();
    return B(() => {
      D(() => {
        const o = j.create(w.value, {
          group: "option-item",
          animation: 200,
          onEnd: (t) => {
            const i = e.editComponent.options[t.oldIndex];
            e.editComponent.options.splice(t.oldIndex, 1), e.editComponent.options.splice(t.newIndex, 0, i), o.sort(
              A(e.editComponent.options.length).map((s) => s.toString())
            );
          }
        });
      });
    }), $({}), (o, t) => {
      const i = c("el-radio"), s = c("el-radio-group"), a = c("el-form-item"), O = c("el-input"), k = c("el-button"), E = c("el-popover"), R = c("el-form");
      return b(), g(S, null, [
        T(m("div", J, [
          v(o.$slots, "field"),
          r(R, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: p(() => [
              r(a, {
                label: n(l)("style")
              }, {
                default: p(() => [
                  r(s, {
                    modelValue: n(e).editComponent.style,
                    "onUpdate:modelValue": t[0] || (t[0] = (u) => n(e).editComponent.style = u)
                  }, {
                    default: p(() => [
                      r(i, { label: "style-1" }, {
                        default: p(() => [
                          _(d(n(l)("defaultSources")), 1)
                        ]),
                        _: 1
                      }),
                      r(i, { label: "style-2" }, {
                        default: p(() => [
                          _(d(n(l)("listStyle")), 1)
                        ]),
                        _: 1
                      }),
                      r(i, { label: "style-3" }, {
                        default: p(() => [
                          _(d(n(l)("dropDownStyle")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(a, {
                label: n(l)("option")
              }, {
                default: p(() => [
                  m("div", {
                    ref_key: "formCheckboxRef",
                    ref: w
                  }, [
                    (b(!0), g(S, null, I(n(e).editComponent.options, (u, y) => (b(), g("div", {
                      key: u.id,
                      class: "option-item flex items-center mb-[15px]"
                    }, [
                      r(O, {
                        modelValue: n(e).editComponent.options[y].text,
                        "onUpdate:modelValue": (V) => n(e).editComponent.options[y].text = V,
                        class: "!w-[215px]",
                        placeholder: n(l)("optionPlaceholder"),
                        maxlength: "30",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                      n(e).editComponent.options.length > 1 ? (b(), g("span", {
                        key: 0,
                        onClick: (V) => q(y),
                        class: "cursor-pointer ml-[5px] nc-iconfont nc-icon-shanchu-yuangaizhiV6xx"
                      }, null, 8, L)) : P("", !0)
                    ]))), 128))
                  ], 512),
                  m("span", {
                    class: "text-primary cursor-pointer mr-[10px]",
                    onClick: M
                  }, d(n(l)("addSingleOption")), 1),
                  r(E, {
                    visible: x.value,
                    placement: "bottom",
                    width: 300
                  }, {
                    reference: p(() => [
                      m("span", {
                        class: "text-primary cursor-pointer",
                        onClick: t[3] || (t[3] = (u) => x.value = !0)
                      }, d(n(l)("addMultipleOption")), 1)
                    ]),
                    default: p(() => [
                      m("p", G, d(n(l)("addMultipleOption")), 1),
                      m("p", H, d(n(l)("addOptionTips")), 1),
                      r(O, {
                        modelValue: f.value,
                        "onUpdate:modelValue": t[1] || (t[1] = (u) => f.value = u),
                        modelModifiers: { trim: !0 },
                        type: "textarea",
                        clearable: "",
                        maxlength: "200",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue"]),
                      m("div", Q, [
                        r(k, {
                          size: "small",
                          text: "",
                          onClick: t[2] || (t[2] = (u) => x.value = !1)
                        }, {
                          default: p(() => [
                            _(d(n(l)("cancel")), 1)
                          ]),
                          _: 1
                        }),
                        r(k, {
                          size: "small",
                          type: "primary",
                          onClick: z
                        }, {
                          default: p(() => [
                            _(d(n(l)("confirm")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["visible"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          v(o.$slots, "other")
        ], 512), [
          [N, n(e).editTab == "content"]
        ]),
        T(m("div", W, [
          v(o.$slots, "style-field"),
          v(o.$slots, "style")
        ], 512), [
          [N, n(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: X
}, Symbol.toStringTag, { value: "Module" }));
export {
  le as _
};
