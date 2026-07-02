import { defineComponent as f, resolveComponent as o, openBlock as r, createElementBlock as h, createVNode as e, withCtx as t, normalizeStyle as v, createElementVNode as x, unref as c, createBlock as p, KeepAlive as b, resolveDynamicComponent as y, createCommentVNode as S, pushScopeId as z, popScopeId as D } from "vue";
import g from "./index-b84532fd.js";
import k from "./index-1d745d21.js";
import { gR as w, dO as C, _ as I } from "./core-shared-ae4a556b.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-ba5e32ce.js";
import "./member_head-81b0c11e.js";
import "@element-plus/icons-vue";
import "./index-bee8054b.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./layout-setting-52b15782.js";
import "./message-ff91082d.js";
import "./message_empty-a77792f0.js";
import "./index-96a6ebb9.js";
import "./success_icon-605a2b43.js";
import "./icon-addon-one-2b9cfff5.js";
import "./addon-295f549c.js";
import "./dark-3dd028d8.js";
import "./side-9f780565.js";
import "./menu-item-3bd75c30.js";
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
