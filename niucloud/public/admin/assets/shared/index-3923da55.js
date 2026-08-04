import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as l, createBlock as p, KeepAlive as y, resolveDynamicComponent as b, createCommentVNode as S, pushScopeId as z, popScopeId as D } from "vue";
import g from "./index-f03ea506.js";
import k from "./index-134b849f.js";
import { gR as w, dO as C, _ as I } from "./core-shared-5b3bfa35.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-d2069831.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-83995d3b.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-d0ae2b2f.js";
import "./message-086c160f.js";
import "./message_empty-a77792f0.js";
import "./index-4c2fc990.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-a8fd87f6.js";
import "./dark-3dd028d8.js";
import "./menu-item-41c5d41c.js";
import "./module-02824048.js";
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
