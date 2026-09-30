import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as l, createBlock as a, KeepAlive as y, resolveDynamicComponent as b, createCommentVNode as S, pushScopeId as H, popScopeId as K } from "vue";
import g from "./index-c2e7c526.js";
import k from "./index-f28fb289.js";
import w from "./tabs-e344b793.js";
import { hv as C, eb as I, a as N } from "./core-shared-c6ad4e77.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-544011ae.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-31b5b072.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-38fee933.js";
import "./index-53e23d65.js";
import "./index-bc96ee75.js";
import "./side-fb2704d0.js";
import "./menu-item-d84cc262.js";
import "./index-88d19fa0.js";
const A = { class: "flex w-full h-screen" }, B = { class: "p-[15px]" }, V = /* @__PURE__ */ f({
  __name: "index",
  setup(E) {
    const p = C(), c = I();
    return (T, z) => {
      const i = o("el-header"), _ = o("router-view"), m = o("el-scrollbar"), s = o("el-main"), n = o("el-container");
      return r(), h("div", A, [
        e(n, null, {
          default: t(() => [
            e(i, null, {
              default: t(() => [
                e(g)
              ]),
              _: 1
            }),
            e(n, {
              style: v({ height: "calc(100vh - 64px)" })
            }, {
              default: t(() => [
                e(k),
                e(n, { direction: "vertical" }, {
                  default: t(() => [
                    e(w),
                    e(s, { class: "h-full p-0 bg-page" }, {
                      default: t(() => [
                        e(m, null, {
                          default: t(() => [
                            x("div", B, [
                              l(p).routeRefreshTag ? (r(), a(_, { key: 0 }, {
                                default: t(({ Component: d, route: u }) => [
                                  (r(), a(y, {
                                    include: l(c).tabNames,
                                    max: 15
                                  }, [
                                    (r(), a(b(d), {
                                      key: u.fullPath
                                    }))
                                  ], 1032, ["include"]))
                                ]),
                                _: 1
                              })) : S("", !0)
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
              ]),
              _: 1
            }, 8, ["style"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const re = /* @__PURE__ */ N(V, [["__scopeId", "data-v-02f083f4"]]);
export {
  re as default
};
