import { defineComponent as f, resolveComponent as t, openBlock as r, createElementBlock as v, createVNode as e, withCtx as o, createElementVNode as h, unref as n, createBlock as p, KeepAlive as b, resolveDynamicComponent as x, createCommentVNode as y, pushScopeId as H, popScopeId as K } from "vue";
import S from "./index-26056f98.js";
import w from "./index-af9d80b5.js";
import k from "./tabs-b6df1b73.js";
import { hv as C, eb as g, a as I } from "./core-shared-c6ad4e77.js";
import "./icon-addon-90fccbab.js";
import "./index-38fee933.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./index-bc96ee75.js";
import "./index-cb00d4d0.js";
import "./user-info-f67c1e4e.js";
import "./site_empty-63fceac6.js";
import "./index-31b5b072.js";
import "./index-835144c3.js";
import "./side-500deefd.js";
import "./menu-item-c87d4c02.js";
import "./lodash-8c6c2daa.js";
import "./index-88d19fa0.js";
const N = { class: "min-w-[1500px]" }, A = { class: "p-[10px]" }, B = /* @__PURE__ */ f({
  __name: "index",
  setup(V) {
    const c = C(), i = g();
    return (E, T) => {
      const l = t("el-header"), m = t("router-view"), _ = t("el-scrollbar"), s = t("el-main"), a = t("el-container");
      return r(), v("div", N, [
        e(l, null, {
          default: o(() => [
            e(S)
          ]),
          _: 1
        }),
        e(a, null, {
          default: o(() => [
            e(w, { class: "h-[calc(100vh-60px)]" }),
            e(a, { direction: "vertical" }, {
              default: o(() => [
                e(k),
                e(s, { class: "main-wrap h-[calc(100vh-60px)] p-0 bg-page relative" }, {
                  default: o(() => [
                    e(_, null, {
                      default: o(() => [
                        h("div", A, [
                          n(c).routeRefreshTag ? (r(), p(m, { key: 0 }, {
                            default: o(({ Component: d, route: u }) => [
                              (r(), p(b, {
                                include: n(i).tabNames
                              }, [
                                (r(), p(x(d), {
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
          ]),
          _: 1
        })
      ]);
    };
  }
});
const pe = /* @__PURE__ */ I(B, [["__scopeId", "data-v-57fe0cb0"]]);
export {
  pe as default
};
