import { defineComponent as f, resolveComponent as t, openBlock as r, createElementBlock as v, createVNode as e, withCtx as o, createElementVNode as h, unref as a, createBlock as n, KeepAlive as x, resolveDynamicComponent as b, createCommentVNode as y } from "vue";
import g from "./index-20b5031b.js";
import k from "./index-f32d629c.js";
import { gN as w, dL as C, _ as N } from "./core-shared-ca1fcae5.js";
import "./icon-addon-90fccbab.js";
import "./layout-setting-bcd22e00.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./user-info-d160ef61.js";
import "./site_empty-63fceac6.js";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "./side-36ea9deb.js";
import "./menu-item.vue_vue_type_script_setup_true_lang-11227f78.js";
import "./cloneDeep-70d647ec.js";
import "./isArrayLike-62604998.js";
const S = { class: "min-w-[1500px]" }, A = { class: "p-[10px]" }, B = /* @__PURE__ */ f({
  __name: "index",
  setup(V) {
    const p = w(), c = C();
    return (E, T) => {
      const l = t("el-header"), _ = t("router-view"), i = t("el-scrollbar"), m = t("el-main"), s = t("el-container");
      return r(), v("div", S, [
        e(l, null, {
          default: o(() => [
            e(g)
          ]),
          _: 1
        }),
        e(s, null, {
          default: o(() => [
            e(k, { class: "h-[calc(100vh-60px)]" }),
            e(m, { class: "main-wrap h-[calc(100vh-60px)] p-0 bg-page relative" }, {
              default: o(() => [
                e(i, null, {
                  default: o(() => [
                    h("div", A, [
                      a(p).routeRefreshTag ? (r(), n(_, { key: 0 }, {
                        default: o(({ Component: d, route: u }) => [
                          (r(), n(x, {
                            include: a(c).tabNames
                          }, [
                            (r(), n(b(d), {
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
      ]);
    };
  }
});
const Y = /* @__PURE__ */ N(B, [["__scopeId", "data-v-e49a6e37"]]);
export {
  Y as default
};
