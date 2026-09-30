import { defineComponent as k, ref as p, resolveComponent as v, openBlock as n, createElementBlock as l, createVNode as C, withCtx as _, createElementVNode as c, unref as g, Fragment as b, renderList as w, normalizeClass as B, createBlock as h, resolveDynamicComponent as N, createCommentVNode as V, toDisplayString as m } from "vue";
import { Monitor as A, Iphone as D } from "@element-plus/icons-vue";
import { t as E, hy as L } from "./core-shared-c6ad4e77.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const M = { class: "visit-channel inline-flex items-center" }, S = ["title"], j = {
  key: 0,
  class: "text-[13px] text-[#999]"
}, z = {
  key: 1,
  class: "text-[13px] text-[#999]"
}, F = { key: 2 }, H = ["onClick"], I = { class: "flex items-center text-[14px] text-[#333]" }, P = { class: "mt-[6px] text-[13px] text-[#666] break-all" }, U = /* @__PURE__ */ k({
  __name: "index",
  setup(W) {
    const u = {
      pc: { label: "PC端", icon: A },
      h5: { label: "H5端", icon: D }
    }, i = p(!1), r = p(!1), a = p([]), x = () => {
      i.value || r.value || (r.value = !0, L().then((o) => {
        const d = Array.isArray(o.data) ? o.data : [];
        a.value = d.filter((e) => e && e.url).map((e) => {
          var s, t;
          return {
            key: e.key,
            url: e.url,
            label: ((s = u[e.key]) == null ? void 0 : s.label) || e.name,
            icon: (t = u[e.key]) == null ? void 0 : t.icon
          };
        }), i.value = !0;
      }).catch(() => {
        a.value = [];
      }).finally(() => {
        r.value = !1;
      }));
    }, f = (o) => {
      o && window.open(o);
    };
    return (o, d) => {
      const e = v("el-icon"), s = v("el-popover");
      return n(), l("span", M, [
        C(s, {
          placement: "bottom",
          trigger: "hover",
          width: 360,
          "popper-class": "visit-channel-popper",
          onShow: x
        }, {
          reference: _(() => [
            c("i", {
              class: "iconfont iconicon_huojian1 cursor-pointer",
              title: g(E)("visitWap")
            }, null, 8, S)
          ]),
          default: _(() => [
            i.value ? a.value.length ? (n(), l("div", F, [
              (n(!0), l(b, null, w(a.value, (t, y) => (n(), l("div", {
                key: t.key,
                class: B(["visit-channel-item", { "is-split": y > 0 }]),
                onClick: ($) => f(t.url)
              }, [
                c("div", I, [
                  t.icon ? (n(), h(e, {
                    key: 0,
                    class: "mr-[6px] text-[16px]"
                  }, {
                    default: _(() => [
                      (n(), h(N(t.icon)))
                    ]),
                    _: 2
                  }, 1024)) : V("", !0),
                  c("span", null, m(t.label), 1)
                ]),
                c("div", P, "链接：" + m(t.url), 1)
              ], 10, H))), 128))
            ])) : (n(), l("div", z, "暂无可用链接")) : (n(), l("div", j, "加载中"))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  U as default
};
