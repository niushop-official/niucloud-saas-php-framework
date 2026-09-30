import { defineComponent as j, ref as h, resolveComponent as l, resolveDirective as D, withDirectives as I, openBlock as s, createElementBlock as o, createVNode as d, withCtx as g, Fragment as _, renderList as y, createElementVNode as t, toDisplayString as u, unref as k, createCommentVNode as v, pushScopeId as N, popScopeId as O } from "vue";
import { _ as R } from "./app_default-234e8a31.js";
import { h as V, j as B, t as E, k as F, m as K, a as U } from "./core-shared-c6ad4e77.js";
import { useRouter as $ } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const q = (a) => (N("data-v-7011f26f"), a = a(), O(), a), z = { class: "main-container" }, G = {
  key: 0,
  class: "app-group"
}, H = { class: "app-group-title" }, J = { class: "app-grid" }, M = ["onClick"], P = { class: "app-card-head" }, Q = { class: "app-card-avatar" }, T = /* @__PURE__ */ q(() => /* @__PURE__ */ t("img", {
  class: "w-full h-full",
  src: R
}, null, -1)), W = { class: "app-card-info" }, X = { class: "app-card-name" }, Y = { class: "app-card-desc" }, Z = {
  key: 1,
  class: "empty flex items-center justify-center"
}, ee = /* @__PURE__ */ j({
  __name: "index",
  setup(a) {
    const f = V().addonIndexRoute, c = $(), n = h([]), i = h(!0);
    (async () => {
      const e = await F();
      n.value = e.data, i.value = !1;
    })();
    const x = (e) => {
      if (e.url)
        if (e.url.indexOf("is_target=true") != -1) {
          const m = c.resolve(e.url);
          window.open(m.href);
        } else
          c.push(e.url);
      else
        f[e.key] && c.push({ name: f[e.key] });
      K.set({ key: "activeAppKey", data: e.key });
    };
    return (e, m) => {
      const w = l("el-image"), C = l("el-empty"), S = l("el-card"), b = D("loading");
      return I((s(), o("div", z, [
        d(S, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: g(() => [
            Object.keys(n.value).length ? (s(!0), o(_, { key: 0 }, y(n.value, (p, A) => (s(), o(_, {
              key: A + "b"
            }, [
              p.list.length ? (s(), o("div", G, [
                t("div", H, u(p.title), 1),
                t("div", J, [
                  (s(!0), o(_, null, y(p.list, (r, L) => (s(), o("div", {
                    class: "app-card",
                    key: L,
                    onClick: (se) => x(r)
                  }, [
                    t("div", P, [
                      t("div", Q, [
                        d(w, {
                          class: "w-full h-full",
                          src: k(B)(r.icon),
                          fit: "contain"
                        }, {
                          error: g(() => [
                            T
                          ]),
                          _: 2
                        }, 1032, ["src"])
                      ]),
                      t("div", W, [
                        t("div", X, u(r.title), 1)
                      ])
                    ]),
                    t("p", Y, u(r.desc), 1)
                  ], 8, M))), 128))
                ])
              ])) : v("", !0)
            ], 64))), 128)) : v("", !0),
            !i.value && !Object.keys(n.value).length ? (s(), o("div", Z, [
              d(C, {
                description: k(E)("emptyAppData")
              }, null, 8, ["description"])
            ])) : v("", !0)
          ]),
          _: 1
        })
      ])), [
        [b, i.value]
      ]);
    };
  }
});
const _e = /* @__PURE__ */ U(ee, [["__scopeId", "data-v-7011f26f"]]);
export {
  _e as default
};
