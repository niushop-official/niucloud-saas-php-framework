import { defineComponent as x, resolveComponent as l, openBlock as C, createElementBlock as V, Fragment as T, withDirectives as p, createElementVNode as _, renderSlot as i, createVNode as e, withCtx as o, toDisplayString as d, unref as t, createTextVNode as m, vShow as u } from "vue";
import { t as r } from "./core-shared-0b2facad.js";
import { u as $ } from "./diy-fa1f4a9b.js";
const B = { class: "content-wrap" }, D = { class: "flex items-center" }, F = { class: "mr-[3px]" }, M = { class: "style-wrap" }, N = /* @__PURE__ */ x({
  __name: "edit-form-video",
  setup(j, { expose: f }) {
    const n = $();
    return n.editComponent.ignore = ["componentBgUrl"], f({}), (s, a) => {
      const b = l("QuestionFilled"), h = l("el-icon"), g = l("el-tooltip"), c = l("el-radio"), y = l("el-radio-group"), v = l("el-form-item"), S = l("el-form");
      return C(), V(T, null, [
        p(_("div", B, [
          i(s.$slots, "field"),
          e(S, {
            "label-width": "100px",
            class: "px-[10px]"
          }, {
            default: o(() => [
              e(v, null, {
                label: o(() => [
                  _("div", D, [
                    _("span", F, d(t(r)("上传方式")), 1),
                    e(g, {
                      effect: "light",
                      content: t(r)("拍摄时长限制1分钟，从相册上传不限制时长。"),
                      placement: "top"
                    }, {
                      default: o(() => [
                        e(h, null, {
                          default: o(() => [
                            e(b, { color: "#999999" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: o(() => [
                  e(y, {
                    modelValue: t(n).editComponent.uploadMode,
                    "onUpdate:modelValue": a[0] || (a[0] = (w) => t(n).editComponent.uploadMode = w)
                  }, {
                    default: o(() => [
                      e(c, { label: "shoot_and_album" }, {
                        default: o(() => [
                          m(d(t(r)("拍摄和相册")), 1)
                        ]),
                        _: 1
                      }),
                      e(c, { label: "shoot_only" }, {
                        default: o(() => [
                          m(d(t(r)("只允许拍摄")), 1)
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
          i(s.$slots, "other")
        ], 512), [
          [u, t(n).editTab == "content"]
        ]),
        p(_("div", M, [
          i(s.$slots, "style-field"),
          i(s.$slots, "style")
        ], 512), [
          [u, t(n).editTab == "style"]
        ])
      ], 64);
    };
  }
}), Q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: N
}, Symbol.toStringTag, { value: "Module" }));
export {
  Q as _
};
