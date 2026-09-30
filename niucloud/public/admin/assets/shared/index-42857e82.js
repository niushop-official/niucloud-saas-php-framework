import { defineComponent as h, computed as b, resolveComponent as t, openBlock as r, createElementBlock as v, createVNode as e, withCtx as o, createElementVNode as y, unref as a, createBlock as n, KeepAlive as k, resolveDynamicComponent as x, createCommentVNode as S } from "vue";
import C from "./index-0ca75260.js";
import w from "./index-0184476a.js";
import N from "./tabs-ad383ebb.js";
import { hv as g, eb as A, u as B } from "./core-shared-c6ad4e77.js";
import "./layout-setting-370c9fed.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-eab2686f.js";
import "./member_head-81b0c11e.js";
import "./index-31b5b072.js";
import "./index-835144c3.js";
import "./side-3d6044a8.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-fcc21486.js";
const T = { class: "flex w-full h-screen" }, V = { class: "p-[15px]" }, ee = /* @__PURE__ */ h({
  __name: "index",
  setup(E) {
    const l = g(), m = A(), p = B(), D = b(() => p.dark);
    return (H, K) => {
      const c = t("el-header"), s = t("router-view"), i = t("el-scrollbar"), _ = t("el-main"), u = t("el-container");
      return r(), v("div", T, [
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
                e(i, null, {
                  default: o(() => [
                    y("div", V, [
                      a(l).routeRefreshTag ? (r(), n(s, { key: 0 }, {
                        default: o(({ Component: d, route: f }) => [
                          (r(), n(k, {
                            include: a(m).tabNames,
                            max: 15
                          }, [
                            (r(), n(x(d), {
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
  ee as default
};
