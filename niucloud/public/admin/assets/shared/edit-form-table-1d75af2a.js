import { defineComponent as q, ref as u, onMounted as H, reactive as P, resolveComponent as C, openBlock as i, createElementBlock as p, Fragment as T, withDirectives as U, createElementVNode as o, renderSlot as w, createVNode as d, withModifiers as A, withCtx as _, unref as e, renderList as F, normalizeClass as G, createCommentVNode as b, toDisplayString as y, createBlock as M, vShow as O, pushScopeId as K, popScopeId as Q } from "vue";
import { t as a, _ as W } from "./core-shared-ca1fcae5.js";
import { u as X } from "./diy-f8acd48b.js";
const m = (g) => (K("data-v-6943b994"), g = g(), Q(), g), Z = { class: "content-wrap" }, ee = { class: "flex items-center justify-between" }, te = { class: "flex" }, oe = { class: "flex" }, ne = ["onClick"], le = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", { class: "cursor-pointer ml-[5px] nc-iconfont nc-icon-xiaV6xx" }, null, -1)), se = {
  key: 0,
  class: "flex"
}, ae = { class: "text-[#999] mr-3" }, re = ["onClick"], ie = {
  key: 1,
  class: "flex"
}, de = ["onClick"], ce = {
  key: 2,
  class: "flex"
}, ue = /* @__PURE__ */ m(() => /* @__PURE__ */ o("div", { class: "text-[#999] mr-3" }, "精确到详细地址", -1)), pe = ["onClick"], me = { class: "text-primary cursor-pointer mr-[10px]" }, _e = ["onClick"], ve = { class: "py-1 text-[var(--el-text-color-primary]" }, fe = { class: "flex items-center" }, he = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", null, "默认显示", -1)), be = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", null, "项", -1)), ye = { class: "flex items-center my-1" }, xe = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", null, "最少填写", -1)), Ce = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", null, "项", -1)), ge = { class: "flex items-center" }, Ve = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", null, "最多填写", -1)), we = /* @__PURE__ */ m(() => /* @__PURE__ */ o("span", null, "项", -1)), Se = /* @__PURE__ */ m(() => /* @__PURE__ */ o("div", null, null, -1)), $e = { class: "style-wrap" }, ke = /* @__PURE__ */ q({
  __name: "edit-form-table",
  setup(g, { expose: B }) {
    const n = X();
    n.editComponent.ignore = ["componentBgUrl"], n.editComponent.verify = (l) => ({ code: !0, message: "" });
    const z = u([
      { label: "单选项", value: "radio" },
      { label: "文本", value: "text" },
      { label: "数字", value: "number" },
      { label: "手机号", value: "mobile" },
      { label: "地址", value: "address" },
      { label: "身份证", value: "idcard" },
      { label: "性别", value: "gender" },
      { label: "日期", value: "date" }
    ]), N = (l) => {
      switch (l) {
        case "radio":
          return "icona-duihaopc30";
        case "text":
          return "icona-danhangwenben-1pc30";
        case "number":
          return "icona-shuzipc30-1";
        case "mobile":
          return "icona-shoujipc30";
        case "address":
          return "iconbiaotipc";
        case "idcard":
          return "icona-shenfenzhengpc30";
        case "gender":
          return "el-icon-s-opportunity";
        case "date":
          return "icona-riqipc30";
        default:
          return "";
      }
    }, Y = u(), S = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5), j = (l) => {
      const s = {
        id: S(),
        name: l.label,
        type: l.value,
        // 列类型
        value: ""
        // 默认值（可选）
      };
      l.value === "radio" && (s.options = [
        { id: S(), label: "选项1" },
        { id: S(), label: "选项2" }
      ]), l.value === "date" && (s.dateFormat = "YYYY年M月D日"), l.value === "address" && (s.addressFormat = "province/city/district/address"), n.editComponent.columnList.push(s);
    }, R = (l) => {
      n.editComponent.columnList.splice(l, 1);
    };
    H(() => {
      console.log(n.editComponent.columnList);
    });
    const E = u({}), $ = u({}), J = u(0), k = u(!1);
    u(), u(""), u(!1);
    const V = P({
      format1: "",
      format2: "",
      format3: "",
      format4: ""
    }), L = (l, s) => {
      if (J.value = s, E.value = l, $.value = JSON.parse(JSON.stringify(l)), l.type == "radio")
        $.value.options || ($.value.options = []), k.value = !0;
      else if (l.type == "date") {
        const r = new Date(), v = r.getFullYear(), c = String(r.getMonth() + 1).padStart(2, "0"), f = String(r.getDate()).padStart(2, "0"), I = String(r.getHours()).padStart(2, "0"), t = String(r.getMinutes()).padStart(2, "0");
        V.format1 = `${v}年${c}月${f}日`, V.format2 = `${v}-${c}-${f}`, V.format3 = `${v}/${c}/${f}`, V.format4 = `${v}-${c}-${f} ${I}:${t}`, k.value = !0;
      } else
        l.type == "address" && (k.value = !0);
    };
    return B({}), (l, s) => {
      const r = C("el-input"), v = C("el-popover"), c = C("el-form-item"), f = C("el-switch"), I = C("el-form");
      return i(), p(T, null, [
        U(o("div", Z, [
          w(l.$slots, "field", {}, void 0, !0),
          d(I, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: s[5] || (s[5] = A(() => {
            }, ["prevent"]))
          }, {
            default: _(() => [
              d(c, {
                label: e(a)("列设置")
              }, {
                default: _(() => [
                  o("div", {
                    ref_key: "imageBoxRef",
                    ref: Y
                  }, [
                    (i(!0), p(T, null, F(e(n).editComponent.columnList, (t, h) => {
                      var D;
                      return i(), p("div", {
                        key: t.id,
                        class: "border-b-[1px] border-[#e0e0e0] py-1"
                      }, [
                        o("div", ee, [
                          o("div", te, [
                            o("span", {
                              class: G(["iconfont", "ml-[5px]", "cursor-pointer", N(t.type)])
                            }, null, 2),
                            d(r, {
                              modelValue: t.name,
                              "onUpdate:modelValue": (x) => t.name = x,
                              class: "input-style",
                              "input-style": { boxShadow: "none" },
                              placeholder: e(a)("请输入列名")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ]),
                          o("div", oe, [
                            e(n).editComponent.columnList.length > 1 ? (i(), p("span", {
                              key: 0,
                              onClick: (x) => R(h),
                              class: "cursor-pointer ml-[5px] nc-iconfont nc-icon-shanchu-yuangaizhiV6xx"
                            }, null, 8, ne)) : b("", !0),
                            le
                          ])
                        ]),
                        t.type == "radio" ? (i(), p("div", se, [
                          o("div", ae, y(((D = t.options) == null ? void 0 : D.length) || 0) + "个选项", 1),
                          o("span", {
                            class: "text-primary cursor-pointer mr-[10px]",
                            onClick: (x) => L(t, h)
                          }, y(e(a)("编辑")), 9, re)
                        ])) : b("", !0),
                        t.type == "date" ? (i(), p("div", ie, [
                          o("span", {
                            class: "text-primary cursor-pointer mr-[10px]",
                            onClick: (x) => L(t, h)
                          }, y(e(a)("设置日期格式")), 9, de)
                        ])) : b("", !0),
                        t.type == "address" ? (i(), p("div", ce, [
                          ue,
                          o("span", {
                            class: "text-primary cursor-pointer mr-[10px]",
                            onClick: (x) => L(t, h)
                          }, y(e(a)("设置")), 9, pe)
                        ])) : b("", !0)
                      ]);
                    }), 128))
                  ], 512),
                  d(v, {
                    placement: "bottom",
                    width: 50,
                    trigger: "hover"
                  }, {
                    reference: _(() => [
                      o("span", me, y(e(a)("添加")), 1)
                    ]),
                    default: _(() => [
                      (i(!0), p(T, null, F(z.value, (t, h) => (i(), p("div", {
                        key: h,
                        onClick: (D) => j(t),
                        class: "cursor-pointer hover:bg-[#d1e1ff] rounded text-center"
                      }, [
                        o("div", ve, y(t.label), 1)
                      ], 8, _e))), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label"]),
              d(c, {
                label: e(a)("是否自增")
              }, {
                default: _(() => [
                  d(f, {
                    modelValue: e(n).editComponent.autoIncrementControl,
                    "onUpdate:modelValue": s[0] || (s[0] = (t) => e(n).editComponent.autoIncrementControl = t)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              e(n).editComponent.autoIncrementControl ? (i(), M(c, {
                key: 0,
                label: e(a)("填写限制")
              }, {
                default: _(() => [
                  o("div", fe, [
                    he,
                    d(r, {
                      modelValue: e(n).editComponent.writeLimit.default,
                      "onUpdate:modelValue": s[1] || (s[1] = (t) => e(n).editComponent.writeLimit.default = t),
                      class: "input-short",
                      placeholder: e(a)("")
                    }, null, 8, ["modelValue", "placeholder"]),
                    be
                  ]),
                  o("div", ye, [
                    xe,
                    d(r, {
                      modelValue: e(n).editComponent.writeLimit.min,
                      "onUpdate:modelValue": s[2] || (s[2] = (t) => e(n).editComponent.writeLimit.min = t),
                      class: "input-short",
                      placeholder: e(a)("")
                    }, null, 8, ["modelValue", "placeholder"]),
                    Ce
                  ]),
                  o("div", ge, [
                    Ve,
                    d(r, {
                      modelValue: e(n).editComponent.writeLimit.max,
                      "onUpdate:modelValue": s[3] || (s[3] = (t) => e(n).editComponent.writeLimit.max = t),
                      class: "input-short",
                      placeholder: e(a)("")
                    }, null, 8, ["modelValue", "placeholder"]),
                    we
                  ])
                ]),
                _: 1
              }, 8, ["label"])) : b("", !0),
              e(n).editComponent.autoIncrementControl ? (i(), M(c, {
                key: 1,
                label: e(a)("按钮名称")
              }, {
                default: _(() => [
                  d(r, {
                    modelValue: e(n).editComponent.btnText,
                    "onUpdate:modelValue": s[4] || (s[4] = (t) => e(n).editComponent.btnText = t),
                    placeholder: e(a)("请输入按钮名称")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : b("", !0)
            ]),
            _: 1
          }),
          Se,
          w(l.$slots, "other", {}, void 0, !0)
        ], 512), [
          [O, e(n).editTab == "content"]
        ]),
        U(o("div", $e, [
          w(l.$slots, "style-field", {}, void 0, !0),
          w(l.$slots, "style", {}, void 0, !0)
        ], 512), [
          [O, e(n).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const Le = /* @__PURE__ */ W(ke, [["__scopeId", "data-v-6943b994"]]), Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Le
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ue as _
};
