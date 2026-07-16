import { defineComponent as L, ref as v, resolveComponent as _, resolveDirective as D, withDirectives as I, openBlock as t, createElementBlock as s, createVNode as d, withCtx as g, Fragment as u, renderList as h, createElementVNode as o, toDisplayString as x, createCommentVNode as i, unref as y, pushScopeId as N, popScopeId as O } from "vue";
import { _ as R } from "./app_default-234e8a31.js";
import { u as V, i as B, t as E, a as F, s as K, _ as U } from "./core-shared-e1759ce4.js";
import { useRouter as $ } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const q = (n) => (N("data-v-5f943208"), n = n(), O(), n), z = { class: "main-container" }, G = {
  key: 0,
  class: "flex justify-between items-center"
}, H = { class: "text-page-title" }, J = {
  key: 1,
  class: "flex flex-wrap plug-list pb-10 plug-large"
}, M = ["onClick"], P = { class: "w-[264px] flex py-[20px] px-[17px] app-item relative" }, Q = /* @__PURE__ */ q(() => /* @__PURE__ */ o("div", { class: "image-slot" }, [
  /* @__PURE__ */ o("img", {
    class: "w-[40px] h-[40px]",
    src: R
  })
], -1)), T = { class: "flex flex-col justify-between w-[180px]" }, W = { class: "text-[14px] flex items-center" }, X = { class: "app-text max-w-[170px]" }, Y = { class: "app-text text-[12px] text-[#999]" }, Z = {
  key: 1,
  class: "empty flex items-center justify-center"
}, ee = /* @__PURE__ */ L({
  __name: "index",
  setup(n) {
    const f = V().addonIndexRoute, p = $(), r = v([]), l = v(!0);
    (async () => {
      const e = await F();
      r.value = e.data, l.value = !1;
    })();
    const k = (e) => {
      if (e.url)
        if (e.url.indexOf("is_target=true") != -1) {
          const m = p.resolve(e.url);
          window.open(m.href);
        } else
          p.push(e.url);
      else
        f[e.key] && p.push({ name: f[e.key] });
      K.set({ key: "activeAppKey", data: e.key });
    };
    return (e, m) => {
      const w = _("el-image"), b = _("el-empty"), C = _("el-card"), S = D("loading");
      return I((t(), s("div", z, [
        d(C, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: g(() => [
            Object.keys(r.value).length ? (t(!0), s(u, { key: 0 }, h(r.value, (a, j) => (t(), s(u, {
              key: j + "b"
            }, [
              a.list.length ? (t(), s("div", G, [
                o("span", H, x(a.title), 1)
              ])) : i("", !0),
              a.list.length ? (t(), s("div", J, [
                (t(!0), s(u, null, h(a.list, (c, A) => (t(), s("div", {
                  class: "cursor-pointer mt-[20px] mr-4 bg-[#f7f7f7]",
                  key: A,
                  onClick: (se) => k(c)
                }, [
                  o("div", P, [
                    d(w, {
                      class: "w-[40px] h-[40px] mr-[10px]",
                      src: y(B)(c.icon),
                      fit: "contain"
                    }, {
                      error: g(() => [
                        Q
                      ]),
                      _: 2
                    }, 1032, ["src"]),
                    o("div", T, [
                      o("div", W, [
                        o("span", X, x(c.title), 1)
                      ]),
                      o("p", Y, x(c.desc), 1)
                    ])
                  ])
                ], 8, M))), 128))
              ])) : i("", !0)
            ], 64))), 128)) : i("", !0),
            !l.value && !Object.keys(r.value).length ? (t(), s("div", Z, [
              d(b, {
                description: y(E)("emptyAppData")
              }, null, 8, ["description"])
            ])) : i("", !0)
          ]),
          _: 1
        })
      ])), [
        [S, l.value]
      ]);
    };
  }
});
const de = /* @__PURE__ */ U(ee, [["__scopeId", "data-v-5f943208"]]);
export {
  de as default
};
