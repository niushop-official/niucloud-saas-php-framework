import { defineComponent as H, ref as m, onMounted as P, reactive as G, resolveComponent as w, openBlock as u, createElementBlock as _, Fragment as T, withDirectives as B, createElementVNode as n, renderSlot as k, createVNode as p, withModifiers as Q, withCtx as f, unref as t, renderList as M, normalizeClass as W, createCommentVNode as y, toDisplayString as g, createBlock as U, vShow as F, pushScopeId as X, popScopeId as Z } from "vue";
import { t as d, _ as ee } from "./core-shared-ae4a556b.js";
import { u as te } from "./diy-30711e15.js";
const v = (S) => (X("data-v-6943b994"), S = S(), Z(), S), oe = { class: "content-wrap" }, ne = { class: "flex items-center justify-between" }, le = { class: "flex" }, se = { class: "flex" }, ae = ["onClick"], ie = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", { class: "cursor-pointer ml-[5px] nc-iconfont nc-icon-xiaV6xx" }, null, -1)), re = {
  key: 0,
  class: "flex"
}, de = { class: "text-[#999] mr-3" }, ce = ["onClick"], ue = {
  key: 1,
  class: "flex"
}, pe = ["onClick"], me = {
  key: 2,
  class: "flex"
}, _e = /* @__PURE__ */ v(() => /* @__PURE__ */ n("div", { class: "text-[#999] mr-3" }, "精确到详细地址", -1)), ve = ["onClick"], fe = { class: "text-primary cursor-pointer mr-[10px]" }, he = ["onClick"], be = { class: "py-1 text-[var(--el-text-color-primary]" }, ye = { class: "flex items-center" }, ge = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", null, "默认显示", -1)), xe = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", null, "项", -1)), Ce = { class: "flex items-center my-1" }, we = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", null, "最少填写", -1)), Se = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", null, "项", -1)), Ve = { class: "flex items-center" }, $e = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", null, "最多填写", -1)), ke = /* @__PURE__ */ v(() => /* @__PURE__ */ n("span", null, "项", -1)), Oe = /* @__PURE__ */ v(() => /* @__PURE__ */ n("div", null, null, -1)), Ie = { class: "style-wrap" }, Le = /* @__PURE__ */ H({
  __name: "edit-form-table",
  setup(S, { expose: z }) {
    const l = te();
    l.editComponent.ignore = ["componentBgUrl"], l.editComponent.verify = (e) => ({ code: !0, message: "" });
    const R = m([
      { label: "单选项", value: "radio" },
      { label: "文本", value: "text" },
      { label: "数字", value: "number" },
      { label: "手机号", value: "mobile" },
      { label: "地址", value: "address" },
      { label: "身份证", value: "idcard" },
      { label: "性别", value: "gender" },
      { label: "日期", value: "date" }
    ]), J = (e) => {
      switch (e) {
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
    }, Y = m(), x = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5), j = (e) => {
      const s = {
        id: x(),
        name: e.label,
        type: e.value,
        // 列类型
        value: ""
        // 默认值（可选）
      };
      e.value === "radio" && (s.options = [
        { id: x(), label: "选项1" },
        { id: x(), label: "选项2" }
      ]), e.value === "date" && (s.dateFormat = "YYYY年M月D日"), e.value === "address" && (s.addressFormat = "province/city/district/address"), l.editComponent.columnList.push(s);
    }, q = (e) => {
      l.editComponent.columnList.splice(e, 1);
    };
    P(() => {
      console.log(l.editComponent.columnList);
    });
    const E = m({}), c = m({}), D = m(0), V = m(!1), Te = m(), O = m(""), K = m(!1), $ = G({
      format1: "",
      format2: "",
      format3: "",
      format4: ""
    }), I = (e, s) => {
      if (D.value = s, E.value = e, c.value = JSON.parse(JSON.stringify(e)), e.type == "radio")
        c.value.options || (c.value.options = []), V.value = !0;
      else if (e.type == "date") {
        const a = new Date(), i = a.getFullYear(), r = String(a.getMonth() + 1).padStart(2, "0"), h = String(a.getDate()).padStart(2, "0"), L = String(a.getHours()).padStart(2, "0"), o = String(a.getMinutes()).padStart(2, "0");
        $.format1 = `${i}年${r}月${h}日`, $.format2 = `${i}-${r}-${h}`, $.format3 = `${i}/${r}/${h}`, $.format4 = `${i}-${r}-${h} ${L}:${o}`, V.value = !0;
      } else
        e.type == "address" && (V.value = !0);
    }, De = () => {
      console.log(c.value), l.editComponent.columnList[D.value] = JSON.parse(JSON.stringify(c.value)), V.value = !1;
    }, Be = () => {
      const e = { id: x(), label: "选项" + (c.value.options.length + 1) };
      c.value.options.push(e);
    }, Me = () => {
      const e = { id: x(), label: "其他" };
      c.value.options.push(e);
    }, Ue = (e) => {
      c.value.options.splice(e, 1);
    }, A = (e, s) => {
      const a = /* @__PURE__ */ new Set();
      return e.filter((i) => {
        const r = JSON.stringify(i[s]);
        return a.has(r) ? !1 : a.add(r);
      });
    }, Fe = () => {
      if (O.value.trim()) {
        const e = O.value.split(",").map((i) => ({
          id: l.generateRandom(),
          label: i.trim()
        })).filter((i) => i.label !== ""), a = A(e, "label").filter(
          (i) => !c.value.options.some((r) => r.label === i.label)
        );
        a.length > 0 ? c.value.options.push(...a) : ElMessage({
          message: d("errorTipsTwo"),
          type: "warning"
        }), O.value = "", K.value = !1;
      }
    };
    return z({}), (e, s) => {
      const a = w("el-input"), i = w("el-popover"), r = w("el-form-item"), h = w("el-switch"), L = w("el-form");
      return u(), _(T, null, [
        B(n("div", oe, [
          k(e.$slots, "field", {}, void 0, !0),
          p(L, {
            "label-width": "100px",
            class: "px-[10px]",
            onSubmit: s[5] || (s[5] = Q(() => {
            }, ["prevent"]))
          }, {
            default: f(() => [
              p(r, {
                label: t(d)("列设置")
              }, {
                default: f(() => [
                  n("div", {
                    ref_key: "imageBoxRef",
                    ref: Y
                  }, [
                    (u(!0), _(T, null, M(t(l).editComponent.columnList, (o, b) => {
                      var N;
                      return u(), _("div", {
                        key: o.id,
                        class: "border-b-[1px] border-[#e0e0e0] py-1"
                      }, [
                        n("div", ne, [
                          n("div", le, [
                            n("span", {
                              class: W(["iconfont", "ml-[5px]", "cursor-pointer", J(o.type)])
                            }, null, 2),
                            p(a, {
                              modelValue: o.name,
                              "onUpdate:modelValue": (C) => o.name = C,
                              class: "input-style",
                              "input-style": { boxShadow: "none" },
                              placeholder: t(d)("请输入列名")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ]),
                          n("div", se, [
                            t(l).editComponent.columnList.length > 1 ? (u(), _("span", {
                              key: 0,
                              onClick: (C) => q(b),
                              class: "cursor-pointer ml-[5px] nc-iconfont nc-icon-shanchu-yuangaizhiV6xx"
                            }, null, 8, ae)) : y("", !0),
                            ie
                          ])
                        ]),
                        o.type == "radio" ? (u(), _("div", re, [
                          n("div", de, g(((N = o.options) == null ? void 0 : N.length) || 0) + "个选项", 1),
                          n("span", {
                            class: "text-primary cursor-pointer mr-[10px]",
                            onClick: (C) => I(o, b)
                          }, g(t(d)("编辑")), 9, ce)
                        ])) : y("", !0),
                        o.type == "date" ? (u(), _("div", ue, [
                          n("span", {
                            class: "text-primary cursor-pointer mr-[10px]",
                            onClick: (C) => I(o, b)
                          }, g(t(d)("设置日期格式")), 9, pe)
                        ])) : y("", !0),
                        o.type == "address" ? (u(), _("div", me, [
                          _e,
                          n("span", {
                            class: "text-primary cursor-pointer mr-[10px]",
                            onClick: (C) => I(o, b)
                          }, g(t(d)("设置")), 9, ve)
                        ])) : y("", !0)
                      ]);
                    }), 128))
                  ], 512),
                  p(i, {
                    placement: "bottom",
                    width: 50,
                    trigger: "hover"
                  }, {
                    reference: f(() => [
                      n("span", fe, g(t(d)("添加")), 1)
                    ]),
                    default: f(() => [
                      (u(!0), _(T, null, M(R.value, (o, b) => (u(), _("div", {
                        key: b,
                        onClick: (N) => j(o),
                        class: "cursor-pointer hover:bg-[#d1e1ff] rounded text-center"
                      }, [
                        n("div", be, g(o.label), 1)
                      ], 8, he))), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label"]),
              p(r, {
                label: t(d)("是否自增")
              }, {
                default: f(() => [
                  p(h, {
                    modelValue: t(l).editComponent.autoIncrementControl,
                    "onUpdate:modelValue": s[0] || (s[0] = (o) => t(l).editComponent.autoIncrementControl = o)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(l).editComponent.autoIncrementControl ? (u(), U(r, {
                key: 0,
                label: t(d)("填写限制")
              }, {
                default: f(() => [
                  n("div", ye, [
                    ge,
                    p(a, {
                      modelValue: t(l).editComponent.writeLimit.default,
                      "onUpdate:modelValue": s[1] || (s[1] = (o) => t(l).editComponent.writeLimit.default = o),
                      class: "input-short",
                      placeholder: t(d)("")
                    }, null, 8, ["modelValue", "placeholder"]),
                    xe
                  ]),
                  n("div", Ce, [
                    we,
                    p(a, {
                      modelValue: t(l).editComponent.writeLimit.min,
                      "onUpdate:modelValue": s[2] || (s[2] = (o) => t(l).editComponent.writeLimit.min = o),
                      class: "input-short",
                      placeholder: t(d)("")
                    }, null, 8, ["modelValue", "placeholder"]),
                    Se
                  ]),
                  n("div", Ve, [
                    $e,
                    p(a, {
                      modelValue: t(l).editComponent.writeLimit.max,
                      "onUpdate:modelValue": s[3] || (s[3] = (o) => t(l).editComponent.writeLimit.max = o),
                      class: "input-short",
                      placeholder: t(d)("")
                    }, null, 8, ["modelValue", "placeholder"]),
                    ke
                  ])
                ]),
                _: 1
              }, 8, ["label"])) : y("", !0),
              t(l).editComponent.autoIncrementControl ? (u(), U(r, {
                key: 1,
                label: t(d)("按钮名称")
              }, {
                default: f(() => [
                  p(a, {
                    modelValue: t(l).editComponent.btnText,
                    "onUpdate:modelValue": s[4] || (s[4] = (o) => t(l).editComponent.btnText = o),
                    placeholder: t(d)("请输入按钮名称")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : y("", !0)
            ]),
            _: 1
          }),
          Oe,
          k(e.$slots, "other", {}, void 0, !0)
        ], 512), [
          [F, t(l).editTab == "content"]
        ]),
        B(n("div", Ie, [
          k(e.$slots, "style-field", {}, void 0, !0),
          k(e.$slots, "style", {}, void 0, !0)
        ], 512), [
          [F, t(l).editTab == "style"]
        ])
      ], 64);
    };
  }
});
const Ne = /* @__PURE__ */ ee(Le, [["__scopeId", "data-v-6943b994"]]), Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ye as _
};
