import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as x, createElementVNode as v, unref as p, createBlock as n, KeepAlive as b, resolveDynamicComponent as y, createCommentVNode as g } from "vue";
import k from "./index-d377ff08.js";
import C from "./index-4e84dc9a.js";
import { gN as N, dL as S, _ as w } from "./core-shared-ca1fcae5.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-ee980f67.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index.vue_vue_type_script_setup_true_lang-5c1af677.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-5140541a.js";
import "./message-38fd10e0.js";
import "./message_empty-a77792f0.js";
import "./index-97f1117f.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-84f9cff9.js";
import "./dark-eb307d84.js";
import "./side-7445a8d8.js";
import "./menu-item-d9725e9f.js";
const A = { class: "flex w-full h-screen" }, B = { class: "p-[15px]" }, V = /* @__PURE__ */ f({
  __name: "index",
  setup(E) {
    const a = N(), c = S();
    return (T, z) => {
      const i = o("el-header"), m = o("router-view"), _ = o("el-scrollbar"), s = o("el-main"), l = o("el-container");
      return r(), h("div", A, [
        e(l, null, {
          default: t(() => [
            e(i, null, {
              default: t(() => [
                e(k)
              ]),
              _: 1
            }),
            e(l, {
              style: x({ height: "calc(100vh - 64px)" })
            }, {
              default: t(() => [
                e(C),
                e(s, { class: "h-full p-0 bg-page" }, {
                  default: t(() => [
                    e(_, null, {
                      default: t(() => [
                        v("div", B, [
                          p(a).routeRefreshTag ? (r(), n(m, { key: 0 }, {
                            default: t(({ Component: d, route: u }) => [
                              (r(), n(b, {
                                include: p(c).tabNames,
                                max: 15
                              }, [
                                (r(), n(y(d), {
                                  key: u.fullPath
                                }))
                              ], 1032, ["include"]))
                            ]),
                            _: 1
                          })) : g("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["style"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const re = /* @__PURE__ */ w(V, [["__scopeId", "data-v-96005bcc"]]);
export {
  re as default
};
