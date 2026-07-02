import { defineComponent as h, computed as b, resolveComponent as t, openBlock as r, createElementBlock as y, createVNode as e, withCtx as o, createElementVNode as k, unref as a, createBlock as n, KeepAlive as v, resolveDynamicComponent as x, createCommentVNode as S } from "vue";
import C from "./index-1af1e604.js";
import g from "./index-958215d3.js";
import w from "./tabs-cc46b959.js";
import { gR as N, dO as A, cm as B } from "./core-shared-ae4a556b.js";
import "./layout-setting-294adceb.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-b23d90de.js";
import "./member_head-81b0c11e.js";
import "./index-bee8054b.js";
import "./side-f9944a77.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-2c356df2.js";
const T = { class: "flex w-full h-screen" }, V = { class: "p-[15px]" }, $ = /* @__PURE__ */ h({
  __name: "index",
  setup(E) {
    const l = N(), m = A(), c = B(), R = b(() => c.dark);
    return (D, H) => {
      const p = t("el-header"), s = t("router-view"), i = t("el-scrollbar"), _ = t("el-main"), u = t("el-container");
      return r(), y("div", T, [
        e(g),
        e(u, null, {
          default: o(() => [
            e(p, null, {
              default: o(() => [
                e(C)
              ]),
              _: 1
            }),
            e(w),
            e(_, { class: "h-full p-0 bg-page" }, {
              default: o(() => [
                e(i, null, {
                  default: o(() => [
                    k("div", V, [
                      a(l).routeRefreshTag ? (r(), n(s, { key: 0 }, {
                        default: o(({ Component: d, route: f }) => [
                          (r(), n(v, {
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
  $ as default
};
