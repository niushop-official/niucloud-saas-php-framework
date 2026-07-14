import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, createElementVNode as v, unref as n, createBlock as a, KeepAlive as x, resolveDynamicComponent as b, createCommentVNode as y, pushScopeId as T, popScopeId as D } from "vue";
import S from "./index-87707f50.js";
import w from "./index-8338e7c2.js";
import { gR as g, dO as k, _ as C } from "./core-shared-11c0a673.js";
import "./icon-addon-90fccbab.js";
import "./layout-setting-f302333c.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-fc1df0f2.js";
import "./site_empty-63fceac6.js";
import "./index-5ea06ae6.js";
import "./side-ab2ce500.js";
import "./menu-item-ca2619d6.js";
import "./lodash-8c6c2daa.js";
const I = { class: "min-w-[1500px]" }, N = { class: "p-[10px]" }, A = /* @__PURE__ */ f({
  __name: "index",
  setup(B) {
    const p = g(), c = k();
    return (V, E) => {
      const l = o("el-header"), _ = o("router-view"), i = o("el-scrollbar"), s = o("el-main"), m = o("el-container");
      return r(), h("div", I, [
        e(l, null, {
          default: t(() => [
            e(S)
          ]),
          _: 1
        }),
        e(m, null, {
          default: t(() => [
            e(w, { class: "h-[calc(100vh-60px)]" }),
            e(s, { class: "main-wrap h-[calc(100vh-60px)] p-0 bg-page relative" }, {
              default: t(() => [
                e(i, null, {
                  default: t(() => [
                    v("div", N, [
                      n(p).routeRefreshTag ? (r(), a(_, { key: 0 }, {
                        default: t(({ Component: d, route: u }) => [
                          (r(), a(x, {
                            include: n(c).tabNames
                          }, [
                            (r(), a(b(d), {
                              key: u.fullPath
                            }))
                          ], 1032, ["include"]))
                        ]),
                        _: 1
                      })) : y("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Z = /* @__PURE__ */ C(A, [["__scopeId", "data-v-e49a6e37"]]);
export {
  Z as default
};
