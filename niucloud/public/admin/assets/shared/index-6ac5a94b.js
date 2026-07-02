import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, createElementVNode as v, unref as n, createBlock as a, KeepAlive as x, resolveDynamicComponent as b, createCommentVNode as y, pushScopeId as T, popScopeId as D } from "vue";
import S from "./index-70d9690a.js";
import w from "./index-55e507bf.js";
import { gR as g, dO as k, _ as C } from "./core-shared-ae4a556b.js";
import "./icon-addon-90fccbab.js";
import "./layout-setting-ee221261.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-beb3e270.js";
import "./site_empty-63fceac6.js";
import "./index-bee8054b.js";
import "./side-8f7bcbb1.js";
import "./menu-item-b88fc1f3.js";
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
