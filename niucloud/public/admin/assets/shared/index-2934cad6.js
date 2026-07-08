import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as c, createBlock as p, KeepAlive as b, resolveDynamicComponent as y, createCommentVNode as S, pushScopeId as z, popScopeId as D } from "vue";
import g from "./index-309a7969.js";
import k from "./index-b00d4b0f.js";
import { gR as w, dO as C, _ as I } from "./core-shared-9b1e55e9.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-ab45fefb.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-33e96a1c.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-d26c6ff5.js";
import "./message-044045b6.js";
import "./message_empty-a77792f0.js";
import "./index-5b072af6.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-ab6efca8.js";
import "./dark-3dd028d8.js";
import "./side-4d523551.js";
import "./menu-item-e432abb9.js";
const N = { class: "flex w-full h-screen" }, A = { class: "p-[15px]" }, B = /* @__PURE__ */ f({
  __name: "index",
  setup(V) {
    const l = w(), a = C();
    return (E, R) => {
      const i = o("el-header"), m = o("router-view"), _ = o("el-scrollbar"), s = o("el-main"), n = o("el-container");
      return r(), h("div", N, [
        e(n, null, {
          default: t(() => [
            e(i, null, {
              default: t(() => [
                e(g)
              ]),
              _: 1
            }),
            e(n, {
              style: v({ height: "calc(100vh - 64px)" })
            }, {
              default: t(() => [
                e(k),
                e(s, { class: "h-full p-0 bg-page" }, {
                  default: t(() => [
                    e(_, null, {
                      default: t(() => [
                        x("div", A, [
                          c(l).routeRefreshTag ? (r(), p(m, { key: 0 }, {
                            default: t(({ Component: d, route: u }) => [
                              (r(), p(b, {
                                include: c(a).tabNames,
                                max: 15
                              }, [
                                (r(), p(y(d), {
                                  key: u.fullPath
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
            }, 8, ["style"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const ne = /* @__PURE__ */ I(B, [["__scopeId", "data-v-96005bcc"]]);
export {
  ne as default
};
