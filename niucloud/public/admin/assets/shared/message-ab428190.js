import { defineComponent as g, ref as d, resolveComponent as m, openBlock as l, createElementBlock as n, Fragment as y, createVNode as p, withCtx as u, createElementVNode as e, createCommentVNode as k, pushScopeId as w, popScopeId as F } from "vue";
import { _ as b, a as C } from "./message_empty-a77792f0.js";
import I from "./index-313713a8.js";
import { _ as B } from "./core-shared-11c0a673.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-051e3aa2.js";
import "./dark-3dd028d8.js";
import "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const i = (s) => (w("data-v-ea3ff4a9"), s = s(), F(), s), j = { class: "relative" }, D = {
  key: 0,
  class: "absolute top-[-3px] right-[-5px] w-[12px] h-[12px] rounded-full bg-[#DA203E] text-white text-[12px] flex justify-center items-center"
}, N = {
  key: 0,
  class: "flex items-center bg-[#F8FAFF] p-[10px] rounded-[8px]"
}, S = /* @__PURE__ */ i(() => /* @__PURE__ */ e("div", { class: "w-[36px] h-[36px] rounded-full flex justify-center items-center" }, [
  /* @__PURE__ */ e("img", {
    src: b,
    alt: "",
    class: "w-[36px] h-[36px]"
  })
], -1)), A = { class: "py-[3px] ml-[5px] flex-1" }, E = /* @__PURE__ */ i(() => /* @__PURE__ */ e("div", { class: "text-[16px] font-bold text-[#1D1F3A] mb-[5px]" }, "云编译", -1)), R = { class: "text-[12px] text-[#4F516D] flex justify-between items-center" }, T = /* @__PURE__ */ i(() => /* @__PURE__ */ e("span", null, "有正在执行的编译任务", -1)), V = {
  key: 1,
  class: "flex items-center justify-center"
}, P = /* @__PURE__ */ i(() => /* @__PURE__ */ e("img", {
  src: C,
  alt: ""
}, null, -1)), $ = [
  P
], q = /* @__PURE__ */ g({
  __name: "message",
  setup(s) {
    const c = d(null), r = d(!1);
    let t = null;
    const f = () => {
      var a;
      t || ((a = c.value) == null || a.getCloudBuildTaskFn(), t = setInterval(() => {
        const o = localStorage.getItem("cloud_build_task");
        r.value = !!o, o || x();
      }, 1e3));
    }, x = () => {
      t && (clearInterval(t), t = null);
    };
    return f(), (a, o) => {
      const v = m("icon"), h = m("el-popover");
      return l(), n(y, null, [
        p(h, {
          class: "box-item",
          width: 322
        }, {
          reference: u(() => [
            e("div", j, [
              p(v, { name: "iconfont iconFramec-1" }),
              r.value ? (l(), n("span", D, "1")) : k("", !0)
            ])
          ]),
          default: u(() => [
            r.value ? (l(), n("div", N, [
              S,
              e("div", A, [
                E,
                e("div", R, [
                  T,
                  e("span", {
                    class: "text-primary cursor-pointer ml-auto",
                    onClick: o[0] || (o[0] = (z) => {
                      var _;
                      return (_ = c.value) == null ? void 0 : _.elNotificationClick();
                    })
                  }, "点击查看")
                ])
              ])
            ])) : (l(), n("div", V, $))
          ]),
          _: 1
        }),
        p(I, {
          ref_key: "cloudBuildRef",
          ref: c
        }, null, 512)
      ], 64);
    };
  }
});
const te = /* @__PURE__ */ B(q, [["__scopeId", "data-v-ea3ff4a9"]]);
export {
  te as default
};
