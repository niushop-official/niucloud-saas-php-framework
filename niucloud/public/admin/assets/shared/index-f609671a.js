import { defineComponent as h, computed as b, resolveComponent as t, openBlock as r, createElementBlock as y, createVNode as e, withCtx as o, createElementVNode as k, unref as a, createBlock as n, KeepAlive as v, resolveDynamicComponent as x, createCommentVNode as S } from "vue";
import C from "./index-1b5f6d89.js";
import N from "./index-253be94d.js";
import g from "./tabs-9751bc1f.js";
import { gN as w, dL as A, ck as B } from "./core-shared-ca1fcae5.js";
import "./layout-setting-2e381ed3.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-62c890e4.js";
import "./member_head-81b0c11e.js";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "./side-dea7868a.js";
import "./icon-addon-one-2b9cfff5.js";
import "./menu-item-78a4d2c5.js";
import "./cloneDeep-70d647ec.js";
import "./isArrayLike-62604998.js";
const T = { class: "flex w-full h-screen" }, V = { class: "p-[15px]" }, ee = /* @__PURE__ */ h({
  __name: "index",
  setup(E) {
    const l = w(), m = A(), p = B();
    return b(() => p.dark), (D, H) => {
      const c = t("el-header"), s = t("router-view"), i = t("el-scrollbar"), _ = t("el-main"), u = t("el-container");
      return r(), y("div", T, [
        e(N),
        e(u, null, {
          default: o(() => [
            e(c, null, {
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
  ee as default
};
