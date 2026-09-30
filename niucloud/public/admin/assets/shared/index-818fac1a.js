import { defineComponent as h, computed as b, resolveComponent as t, openBlock as r, createElementBlock as v, createVNode as e, withCtx as o, createElementVNode as k, unref as m, createBlock as n, KeepAlive as x, resolveDynamicComponent as y, createCommentVNode as S } from "vue";
import C from "./index-a6e3d4fc.js";
import w from "./index-391cf147.js";
import N from "./tabs-9385c6a4.js";
import { hv as g, eb as A, u as B } from "./core-shared-c6ad4e77.js";
import "./index-38fee933.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./index-bc96ee75.js";
import "./index-cb00d4d0.js";
import "./user-info-6de724aa.js";
import "./member_head-81b0c11e.js";
import "./index-31b5b072.js";
import "./index-835144c3.js";
import "./side-cc0c792f.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-4ed3e0f2.js";
import "./index-88d19fa0.js";
const V = { class: "flex w-full h-screen" }, E = { class: "p-[15px]" }, re = /* @__PURE__ */ h({
  __name: "index",
  setup(T) {
    const a = g(), l = A(), p = B(), D = b(() => p.dark);
    return (H, K) => {
      const c = t("el-header"), i = t("router-view"), s = t("el-scrollbar"), _ = t("el-main"), u = t("el-container");
      return r(), v("div", V, [
        e(w),
        e(u, null, {
          default: o(() => [
            e(c, null, {
              default: o(() => [
                e(C)
              ]),
              _: 1
            }),
            e(N),
            e(_, { class: "h-full p-0 bg-page" }, {
              default: o(() => [
                e(s, null, {
                  default: o(() => [
                    k("div", E, [
                      m(a).routeRefreshTag ? (r(), n(i, { key: 0 }, {
                        default: o(({ Component: d, route: f }) => [
                          (r(), n(x, {
                            include: m(l).tabNames,
                            max: 15
                          }, [
                            (r(), n(y(d), {
                              key: f.fullPath
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
      ]);
    };
  }
});
export {
  re as default
};
