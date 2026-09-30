import { defineComponent as x, resolveComponent as n, openBlock as w, createElementBlock as S, Fragment as C, withDirectives as c, createElementVNode as s, renderSlot as r, createVNode as t, withCtx as o, toDisplayString as i, unref as e, createTextVNode as m, vShow as u } from "vue";
import { t as _ } from "./core-shared-c6ad4e77.js";
import { u as V } from "./diy-452683aa.js";
const T = { class: "content-wrap" }, $ = { class: "flex items-center" }, B = { class: "mr-[3px]" }, D = /* @__PURE__ */ s("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), M = { class: "style-wrap" }, N = /* @__PURE__ */ x({
  __name: "edit-form-video",
  setup(j, { expose: f }) {
    const l = V();
    return l.editComponent.ignore = ["componentBgUrl"], f({}), (a, d) => {
      const h = n("el-tooltip"), p = n("el-radio"), b = n("el-radio-group"), g = n("el-form-item"), y = n("el-form");
      return w(), S(C, null, [
        c(s("div", T, [
          r(a.$slots, "field"),
          t(y, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              t(g, null, {
                label: o(() => [
                  s("div", $, [
                    s("span", B, i(e(_)("上传方式")), 1),
                    t(h, {
                      effect: "light",
                      content: e(_)("拍摄时长限制1分钟，从相册上传不限制时长。"),
                      placement: "top"
                    }, {
                      default: o(() => [
                        D
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: o(() => [
                  t(b, {
                    modelValue: e(l).editComponent.uploadMode,
                    "onUpdate:modelValue": d[0] || (d[0] = (v) => e(l).editComponent.uploadMode = v)
                  }, {
                    default: o(() => [
                      t(p, { label: "shoot_and_album" }, {
                        default: o(() => [
                          m(i(e(_)("拍摄和相册")), 1)
                        ]),
                        _: 1
                      }),
                      t(p, { label: "shoot_only" }, {
                        default: o(() => [
                          m(i(e(_)("只允许拍摄")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          r(a.$slots, "other")
        ], 512), [
          [u, e(l).editTab == "content"]
        ]),
        c(s("div", M, [
          r(a.$slots, "style-field"),
          r(a.$slots, "style")
        ], 512), [
          [u, e(l).editTab == "style"]
        ])
      ], 64);
    };
  }
}), U = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: N
}, Symbol.toStringTag, { value: "Module" }));
export {
  U as _
};
