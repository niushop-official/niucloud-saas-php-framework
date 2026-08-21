import { defineComponent as h, computed as b, resolveComponent as o, openBlock as r, createElementBlock as y, createVNode as e, withCtx as t, createElementVNode as S, unref as a, createBlock as n, KeepAlive as k, resolveDynamicComponent as v, createCommentVNode as x } from "vue";
import C from "./index-7ddf2ad7.js";
import g from "./index-e42c5ca8.js";
import w from "./tabs-778f3da2.js";
import { gS as N, dQ as A, co as B } from "./core-shared-0b2facad.js";
import "./layout-setting-ca8b6878.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-6ff2c767.js";
import "./member_head-81b0c11e.js";
import "./index-d7cabf7a.js";
import "./side-2d9b45c5.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-2d3aa2cf.js";
const T = { class: "flex w-full h-screen" }, V = { class: "p-[15px]" }, $ = /* @__PURE__ */ h({
  __name: "index",
  setup(E) {
    const l = N(), m = A(), c = B(), D = b(() => c.dark);
    return (H, K) => {
      const p = o("el-header"), s = o("router-view"), i = o("el-scrollbar"), _ = o("el-main"), u = o("el-container");
      return r(), y("div", T, [
        e(g),
        e(u, null, {
          default: t(() => [
            e(p, null, {
              default: t(() => [
                e(C)
              ]),
              _: 1
            }),
            e(w),
            e(_, { class: "h-full p-0 bg-page" }, {
              default: t(() => [
                e(i, null, {
                  default: t(() => [
                    S("div", V, [
                      a(l).routeRefreshTag ? (r(), n(s, { key: 0 }, {
                        default: t(({ Component: d, route: f }) => [
                          (r(), n(k, {
                            include: a(m).tabNames,
                            max: 15
                          }, [
                            (r(), n(v(d), {
                              key: f.fullPath
                            }))
                          ], 1032, ["include"]))
                        ]),
                        _: 1
                      })) : x("", !0)
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
  $ as default
};
