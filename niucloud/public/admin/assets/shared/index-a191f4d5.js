import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as x, createElementVNode as v, unref as a, createBlock as n, KeepAlive as b, resolveDynamicComponent as y, createCommentVNode as g } from "vue";
import k from "./index-36f321c4.js";
import C from "./index-2dbf12f9.js";
import { gN as N, dL as S, _ as w } from "./core-shared-ca1fcae5.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-2eb8f860.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-32bafaa2.js";
import "./menu-item-04ff052c.js";
import "./module-15a2966b.js";
const A = { class: "flex w-full h-screen" }, B = { class: "p-[15px]" }, V = /* @__PURE__ */ f({
  __name: "index",
  setup(E) {
    const c = N(), _ = S();
    return (T, z) => {
      const p = o("el-header"), s = o("router-view"), i = o("el-scrollbar"), m = o("el-main"), l = o("el-container");
      return r(), h("div", A, [
        e(l, null, {
          default: t(() => [
            e(p, null, {
              default: t(() => [
                e(k)
              ]),
              _: 1
            }),
            e(l, {
              style: x({ height: "calc(100vh - 64px)" })
            }, {
              default: t(() => [
                e(C),
                e(m, { class: "h-full p-0 bg-page" }, {
                  default: t(() => [
                    e(i, null, {
                      default: t(() => [
                        v("div", B, [
                          a(c).routeRefreshTag ? (r(), n(s, { key: 0 }, {
                            default: t(({ Component: d, route: u }) => [
                              (r(), n(b, {
                                include: a(_).tabNames,
                                max: 15
                              }, [
                                (r(), n(y(d), {
                                  key: u.fullPath
                                }))
                              ], 1032, ["include"]))
                            ]),
                            _: 1
                          })) : g("", !0)
                        ])
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
const X = /* @__PURE__ */ w(V, [["__scopeId", "data-v-b7d2c1f2"]]);
export {
  X as default
};
