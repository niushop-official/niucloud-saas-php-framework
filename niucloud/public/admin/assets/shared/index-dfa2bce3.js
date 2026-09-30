import { defineComponent as h, computed as v, resolveComponent as t, openBlock as r, createElementBlock as y, createVNode as e, withCtx as o, createElementVNode as x, unref as n, createBlock as a, KeepAlive as S, resolveDynamicComponent as b, createCommentVNode as k, pushScopeId as R, popScopeId as j } from "vue";
import w from "./index-3f010c99.js";
import C from "./index-b219b690.js";
import I from "./tabs-50702ced.js";
import { hv as N, eb as B, u as V, a as g } from "./core-shared-c6ad4e77.js";
import "./index-38fee933.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./index-cb00d4d0.js";
import "./user-info-da178bb0.js";
import "./index-31b5b072.js";
import "./index-835144c3.js";
import "./side-28cef72e.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-896b4b43.js";
import "./index-88d19fa0.js";
const A = { class: "layout-default flex w-full h-screen" }, E = { class: "layout-default__content" }, T = /* @__PURE__ */ h({
  __name: "index",
  setup($) {
    const _ = N(), c = B(), l = V(), D = v(() => l.dark);
    return (H, K) => {
      const s = t("el-header"), m = t("router-view"), p = t("el-scrollbar"), d = t("el-main"), i = t("el-container");
      return r(), y("div", A, [
        e(C),
        e(i, null, {
          default: o(() => [
            e(s, null, {
              default: o(() => [
                e(w)
              ]),
              _: 1
            }),
            e(I),
            e(d, { class: "layout-default__main h-full p-0" }, {
              default: o(() => [
                e(p, null, {
                  default: o(() => [
                    x("div", E, [
                      n(_).routeRefreshTag ? (r(), a(m, { key: 0 }, {
                        default: o(({ Component: u, route: f }) => [
                          (r(), a(S, {
                            include: n(c).tabNames,
                            max: 15
                          }, [
                            (r(), a(b(u), {
                              key: f.fullPath
                            }))
                          ], 1032, ["include"]))
                        ]),
                        _: 1
                      })) : k("", !0)
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
const ne = /* @__PURE__ */ g(T, [["__scopeId", "data-v-4a4d0ded"]]);
export {
  ne as default
};
