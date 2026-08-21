import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as l, createBlock as p, KeepAlive as y, resolveDynamicComponent as S, createCommentVNode as b, pushScopeId as D, popScopeId as H } from "vue";
import g from "./index-e03e7df9.js";
import k from "./index-0924db80.js";
import { gS as w, dQ as C, _ as I } from "./core-shared-0b2facad.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-c5a7cf41.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-d7cabf7a.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-51750e32.js";
import "./message-d56a0f4c.js";
import "./message_empty-a77792f0.js";
import "./index-b00953f5.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-82d5ce4e.js";
import "./dark-3dd028d8.js";
import "./menu-item-c4a2f207.js";
import "./module-ef2a531c.js";
const N = { class: "flex w-full h-screen" }, A = { class: "p-[15px]" }, B = /* @__PURE__ */ f({
  __name: "index",
  setup(V) {
    const a = w(), c = C();
    return (E, T) => {
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
                          l(a).routeRefreshTag ? (r(), p(m, { key: 0 }, {
                            default: t(({ Component: d, route: u }) => [
                              (r(), p(y, {
                                include: l(c).tabNames,
                                max: 15
                              }, [
                                (r(), p(S(d), {
                                  key: u.fullPath
                                }))
                              ], 1032, ["include"]))
                            ]),
                            _: 1
                          })) : b("", !0)
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
const ne = /* @__PURE__ */ I(B, [["__scopeId", "data-v-37e2c420"]]);
export {
  ne as default
};
