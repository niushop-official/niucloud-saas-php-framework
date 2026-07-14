import { defineComponent as y, ref as m, resolveComponent as u, resolveDirective as g, withDirectives as k, openBlock as o, createElementBlock as l, Fragment as n, createVNode as c, createTextVNode as r, toDisplayString as C, withCtx as p, createCommentVNode as _, createElementVNode as d } from "vue";
import { useRoute as w } from "vue-router";
import { ct as b, Q as z } from "./core-shared-11c0a673.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const N = { class: "flex w-screen h-screen flex-col items-center justify-center" }, V = /* @__PURE__ */ d("h3", { class: "text-xl mt-[20px]" }, "授权绑定成功", -1), B = /* @__PURE__ */ d("h3", { class: "text-xl mt-[20px]" }, "抱歉，授权绑定失败", -1), D = {
  key: 2,
  class: "text-secondary mt-[5px]"
}, W = /* @__PURE__ */ y({
  __name: "wxoplatform_callback",
  setup(F) {
    const h = w(), s = m(!0), e = m({
      result: "fail",
      msg: ""
    });
    b(h.query).then(({ data: t }) => {
      e.value.result = "success", s.value = !1;
    }).catch((t) => {
      e.value.msg = t.toString(), s.value = !1;
    });
    const f = () => {
      z().then(({ data: t }) => {
        location.href = t;
      });
    }, x = () => {
      window.close();
    };
    return (t, R) => {
      const a = u("icon"), i = u("el-button"), v = g("loading");
      return k((o(), l("div", N, [
        s.value ? _("", !0) : (o(), l(n, { key: 0 }, [
          e.value.result == "success" ? (o(), l(n, { key: 0 }, [
            c(a, {
              name: "element CircleCheckFilled",
              size: "50px",
              color: "#0eb118"
            }),
            V
          ], 64)) : (o(), l(n, { key: 1 }, [
            c(a, {
              name: "element CircleCloseFilled",
              size: "50px",
              color: "#e70000"
            }),
            B
          ], 64)),
          e.value.result == "fail" ? (o(), l("p", D, [
            r(C(e.value.msg) + " ", 1),
            c(i, {
              type: "primary",
              link: "",
              onClick: f
            }, {
              default: p(() => [
                r("重新授权")
              ]),
              _: 1
            })
          ])) : _("", !0),
          c(i, {
            type: "primary",
            class: "mt-[20px] w-[150px]",
            onClick: x
          }, {
            default: p(() => [
              r("确认")
            ]),
            _: 1
          })
        ], 64))
      ])), [
        [v, s.value]
      ]);
    };
  }
});
export {
  W as default
};
