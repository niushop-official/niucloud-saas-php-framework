import { defineComponent as L, ref as v, resolveComponent as p, resolveDirective as I, withDirectives as N, openBlock as s, createElementBlock as o, createVNode as _, withCtx as g, Fragment as d, renderList as h, createElementVNode as e, toDisplayString as u, createCommentVNode as m, unref as y, pushScopeId as O, popScopeId as R } from "vue";
import { _ as V } from "./app_default-234e8a31.js";
import { u as B, i as E, t as A, _ as F } from "./core-shared-11c0a673.js";
import { useRouter as M } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const U = (n) => (O("data-v-5eef5614"), n = n(), R(), n), $ = { class: "main-container" }, q = {
  key: 0,
  class: "flex justify-between items-center"
}, z = { class: "text-page-title" }, G = { class: "flex flex-wrap plug-list pb-10 plug-large" }, H = ["onClick"], J = { class: "w-[264px] flex py-[20px] px-[17px] app-item relative" }, K = /* @__PURE__ */ U(() => /* @__PURE__ */ e("div", { class: "image-slot" }, [
  /* @__PURE__ */ e("img", {
    class: "w-[40px] h-[40px]",
    src: V
  })
], -1)), P = { class: "flex flex-col justify-between w-[180px]" }, Q = { class: "text-[14px] flex items-center" }, T = { class: "app-text max-w-[170px]" }, W = { class: "app-text text-[12px] text-[#999]" }, X = {
  key: 1,
  class: "empty flex items-center justify-center"
}, Y = /* @__PURE__ */ L({
  __name: "marketing",
  setup(n) {
    const x = B().addonIndexRoute, i = M(), c = v([]), a = v(!0), Z = async () => {
      a.value = !1;
    }, k = (t) => {
      if (t.url)
        if (t.url.indexOf("is_target=true") != -1) {
          const f = i.resolve(t.url);
          window.open(f.href);
        } else
          i.push(t.url);
      else
        x[t.key] && i.push({ name: x[t.key] });
    };
    return (t, f) => {
      const w = p("el-image"), b = p("el-empty"), C = p("el-card"), j = I("loading");
      return N((s(), o("div", $, [
        _(C, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: g(() => [
            Object.keys(c.value).length ? (s(!0), o(d, { key: 0 }, h(c.value, (l, S) => (s(), o(d, {
              key: S + "b"
            }, [
              l.list.length > 0 ? (s(), o("div", q, [
                e("span", z, u(l.title), 1)
              ])) : m("", !0),
              e("div", G, [
                (s(!0), o(d, null, h(l.list, (r, D) => (s(), o("div", {
                  class: "cursor-pointer mt-[20px] mr-4 bg-[#f7f7f7]",
                  key: D,
                  onClick: (ee) => k(r)
                }, [
                  e("div", J, [
                    _(w, {
                      class: "w-[40px] h-[40px] mr-[10px] rounded-[6px] overflow-hidden",
                      src: y(E)(r.icon),
                      fit: "contain"
                    }, {
                      error: g(() => [
                        K
                      ]),
                      _: 2
                    }, 1032, ["src"]),
                    e("div", P, [
                      e("div", Q, [
                        e("span", T, u(r.title), 1)
                      ]),
                      e("p", W, u(r.desc), 1)
                    ])
                  ])
                ], 8, H))), 128))
              ])
            ], 64))), 128)) : m("", !0),
            !a.value && !Object.keys(c.value).length ? (s(), o("div", X, [
              _(b, {
                description: y(A)("emptyAppData")
              }, null, 8, ["description"])
            ])) : m("", !0)
          ]),
          _: 1
        })
      ])), [
        [j, a.value]
      ]);
    };
  }
});
const pe = /* @__PURE__ */ F(Y, [["__scopeId", "data-v-5eef5614"]]);
export {
  pe as default
};
