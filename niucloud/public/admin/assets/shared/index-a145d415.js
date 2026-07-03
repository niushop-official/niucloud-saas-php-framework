import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as l, createBlock as p, KeepAlive as y, resolveDynamicComponent as b, createCommentVNode as S, pushScopeId as z, popScopeId as D } from "vue";
import g from "./index-62a4d2d2.js";
import k from "./index-66d656d6.js";
import { gR as w, dO as C, _ as I } from "./core-shared-c8d7774e.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-b1ebe82d.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-95cdec99.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-c25637d4.js";
import "./message-f5fe5383.js";
import "./message_empty-a77792f0.js";
import "./index-0cd3442c.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-db4625f4.js";
import "./dark-3dd028d8.js";
import "./menu-item-e4a0ce12.js";
import "./module-fd14206b.js";
const N = { class: "flex w-full h-screen" }, A = { class: "p-[15px]" }, B = /* @__PURE__ */ f({
  __name: "index",
  setup(V) {
    const a = w(), c = C();
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
                          l(a).routeRefreshTag ? (r(), p(m, { key: 0 }, {
                            default: t(({ Component: d, route: u }) => [
                              (r(), p(y, {
                                include: l(c).tabNames,
                                max: 15
                              }, [
                                (r(), p(b(d), {
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
const ne = /* @__PURE__ */ I(B, [["__scopeId", "data-v-37e2c420"]]);
export {
  ne as default
};
