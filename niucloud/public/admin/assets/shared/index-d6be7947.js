import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as a, createBlock as n, KeepAlive as b, resolveDynamicComponent as y, createCommentVNode as S, pushScopeId as z, popScopeId as D } from "vue";
import g from "./index-01f10721.js";
import k from "./index-41a66a2a.js";
import { gR as w, dO as C, _ as I } from "./core-shared-ae4a556b.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-417d863a.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-bee8054b.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-e906f404.js";
import "./menu-item-5129d607.js";
import "./module-f2459599.js";
const N = { class: "flex w-full h-screen" }, A = { class: "p-[15px]" }, B = /* @__PURE__ */ f({
  __name: "index",
  setup(V) {
    const c = w(), p = C();
    return (E, R) => {
      const _ = o("el-header"), s = o("router-view"), i = o("el-scrollbar"), m = o("el-main"), l = o("el-container");
      return r(), h("div", N, [
        e(l, null, {
          default: t(() => [
            e(_, null, {
              default: t(() => [
                e(g)
              ]),
              _: 1
            }),
            e(l, {
              style: v({ height: "calc(100vh - 64px)" })
            }, {
              default: t(() => [
                e(k),
                e(m, { class: "h-full p-0 bg-page" }, {
                  default: t(() => [
                    e(i, null, {
                      default: t(() => [
                        x("div", A, [
                          a(c).routeRefreshTag ? (r(), n(s, { key: 0 }, {
                            default: t(({ Component: d, route: u }) => [
                              (r(), n(b, {
                                include: a(p).tabNames,
                                max: 15
                              }, [
                                (r(), n(y(d), {
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
            }, 8, ["style"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Z = /* @__PURE__ */ I(B, [["__scopeId", "data-v-b7d2c1f2"]]);
export {
  Z as default
};
