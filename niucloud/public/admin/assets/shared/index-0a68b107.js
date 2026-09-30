import { defineComponent as h, resolveComponent as t, openBlock as r, createElementBlock as v, createVNode as e, withCtx as o, createElementVNode as a, unref as n, createBlock as i, KeepAlive as x, resolveDynamicComponent as b, createCommentVNode as y, pushScopeId as H, popScopeId as K } from "vue";
import g from "./index-7a822e69.js";
import w from "./index-b236486d.js";
import S from "./tabs-5da2aeb4.js";
import { hv as k, eb as C, a as I } from "./core-shared-c6ad4e77.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-b5649b1f.js";
import "./index-31b5b072.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-835144c3.js";
import "./index-38fee933.js";
import "./index-cb00d4d0.js";
import "./index-bc96ee75.js";
import "./menu-item-0942064b.js";
import "./module-f32436cf.js";
import "./index-88d19fa0.js";
const N = { class: "layout-lightside flex flex-col w-full h-screen" }, B = { class: "layout-lightside__body flex flex-1 min-h-0" }, V = { class: "layout-lightside__content" }, A = /* @__PURE__ */ h({
  __name: "index",
  setup(E) {
    const l = k(), _ = C();
    return (T, $) => {
      const c = t("el-header"), s = t("router-view"), p = t("el-scrollbar"), m = t("el-main"), d = t("el-container");
      return r(), v("div", N, [
        e(c, { class: "layout-lightside__header-wrap" }, {
          default: o(() => [
            e(g)
          ]),
          _: 1
        }),
        a("div", B, [
          e(w),
          e(d, {
            direction: "vertical",
            class: "min-w-0"
          }, {
            default: o(() => [
              e(S),
              e(m, { class: "layout-lightside__main h-full p-0" }, {
                default: o(() => [
                  e(p, null, {
                    default: o(() => [
                      a("div", V, [
                        n(l).routeRefreshTag ? (r(), i(s, { key: 0 }, {
                          default: o(({ Component: f, route: u }) => [
                            (r(), i(x, {
                              include: n(_).tabNames,
                              max: 15
                            }, [
                              (r(), i(b(f), {
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
        ])
      ]);
    };
  }
});
const re = /* @__PURE__ */ I(A, [["__scopeId", "data-v-4b042ff8"]]);
export {
  re as default
};
