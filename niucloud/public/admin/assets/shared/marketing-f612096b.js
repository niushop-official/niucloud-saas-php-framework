import { defineComponent as I, ref as v, resolveComponent as a, resolveDirective as L, withDirectives as N, openBlock as s, createElementBlock as o, createVNode as p, withCtx as g, Fragment as _, renderList as h, createElementVNode as e, toDisplayString as d, createCommentVNode as u, unref as y, pushScopeId as O, popScopeId as R } from "vue";
import { _ as V } from "./app_default-234e8a31.js";
import { u as B, i as E, t as A, _ as F } from "./core-shared-ca1fcae5.js";
import { useRouter as U } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const $ = (n) => (O("data-v-5eef5614"), n = n(), R(), n), q = { class: "main-container" }, z = {
  key: 0,
  class: "flex justify-between items-center"
}, G = { class: "text-page-title" }, H = { class: "flex flex-wrap plug-list pb-10 plug-large" }, J = ["onClick"], K = { class: "w-[264px] flex py-[20px] px-[17px] app-item relative" }, M = /* @__PURE__ */ $(() => /* @__PURE__ */ e("div", { class: "image-slot" }, [
  /* @__PURE__ */ e("img", {
    class: "w-[40px] h-[40px]",
    src: V
  })
], -1)), P = { class: "flex flex-col justify-between w-[180px]" }, Q = { class: "text-[14px] flex items-center" }, T = { class: "app-text max-w-[170px]" }, W = { class: "app-text text-[12px] text-[#999]" }, X = {
  key: 1,
  class: "empty flex items-center justify-center"
}, Y = /* @__PURE__ */ I({
  __name: "marketing",
  setup(n) {
    const m = B().addonIndexRoute, i = U(), c = v([]), x = v(!0), k = (t) => {
      if (t.url)
        if (t.url.indexOf("is_target=true") != -1) {
          const f = i.resolve(t.url);
          window.open(f.href);
        } else
          i.push(t.url);
      else
        m[t.key] && i.push({ name: m[t.key] });
    };
    return (t, f) => {
      const w = a("el-image"), b = a("el-empty"), C = a("el-card"), j = L("loading");
      return N((s(), o("div", q, [
        p(C, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: g(() => [
            Object.keys(c.value).length ? (s(!0), o(_, { key: 0 }, h(c.value, (l, S) => (s(), o(_, {
              key: S + "b"
            }, [
              l.list.length > 0 ? (s(), o("div", z, [
                e("span", G, d(l.title), 1)
              ])) : u("", !0),
              e("div", H, [
                (s(!0), o(_, null, h(l.list, (r, D) => (s(), o("div", {
                  class: "cursor-pointer mt-[20px] mr-4 bg-[#f7f7f7]",
                  key: D,
                  onClick: (Z) => k(r)
                }, [
                  e("div", K, [
                    p(w, {
                      class: "w-[40px] h-[40px] mr-[10px] rounded-[6px] overflow-hidden",
                      src: y(E)(r.icon),
                      fit: "contain"
                    }, {
                      error: g(() => [
                        M
                      ]),
                      _: 2
                    }, 1032, ["src"]),
                    e("div", P, [
                      e("div", Q, [
                        e("span", T, d(r.title), 1)
                      ]),
                      e("p", W, d(r.desc), 1)
                    ])
                  ])
                ], 8, J))), 128))
              ])
            ], 64))), 128)) : u("", !0),
            !x.value && !Object.keys(c.value).length ? (s(), o("div", X, [
              p(b, {
                description: y(A)("emptyAppData")
              }, null, 8, ["description"])
            ])) : u("", !0)
          ]),
          _: 1
        })
      ])), [
        [j, x.value]
      ]);
    };
  }
});
const ae = /* @__PURE__ */ F(Y, [["__scopeId", "data-v-5eef5614"]]);
export {
  ae as default
};
