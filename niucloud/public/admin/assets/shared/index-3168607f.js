import { defineComponent as h, computed as b, resolveComponent as t, openBlock as r, createElementBlock as y, createVNode as e, withCtx as o, createElementVNode as k, unref as a, createBlock as n, KeepAlive as v, resolveDynamicComponent as x, createCommentVNode as S } from "vue";
import C from "./index-c0bfd060.js";
import N from "./index-c3d5d4e7.js";
import g from "./tabs-d4c438a0.js";
import { gN as w, dL as A, ck as B } from "./core-shared-ca1fcae5.js";
import "./layout-setting-6521991c.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-09e737d8.js";
import "./member_head-81b0c11e.js";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "./side-fbbdbfe8.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-e0d47a81.js";
const T = { class: "flex w-full h-screen" }, V = { class: "p-[15px]" }, Z = /* @__PURE__ */ h({
  __name: "index",
  setup(E) {
    const l = w(), m = A(), c = B();
    return b(() => c.dark), (D, H) => {
      const p = t("el-header"), s = t("router-view"), i = t("el-scrollbar"), _ = t("el-main"), u = t("el-container");
      return r(), y("div", T, [
        e(N),
        e(u, null, {
          default: o(() => [
            e(p, null, {
              default: o(() => [
                e(C)
              ]),
              _: 1
            }),
            e(g),
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
  Z as default
};
