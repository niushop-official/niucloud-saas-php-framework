import { defineComponent as f, resolveComponent as t, openBlock as r, createElementBlock as h, createVNode as e, withCtx as o, createElementVNode as v, unref as _, createBlock as n, KeepAlive as y, resolveDynamicComponent as x, createCommentVNode as b, pushScopeId as D, popScopeId as H } from "vue";
import S from "./index-ec15ba53.js";
import k from "./index-3ec94c08.js";
import w from "./tabs-f097cee3.js";
import { hv as C, eb as I, a as N } from "./core-shared-c6ad4e77.js";
import "./logo.default-aeaa7888.js";
import "vue-router";
import "./user-info-282b83bf.js";
import "./index-31b5b072.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-38fee933.js";
import "./index-53e23d65.js";
import "./index-bc96ee75.js";
import "./index-cb00d4d0.js";
import "./menu-item-e508e055.js";
import "./addon-bae583af.js";
import "./module-f32436cf.js";
import "./index-88d19fa0.js";
const B = { class: "layout-admin flex w-full h-screen" }, V = { class: "layout-admin__content" }, g = /* @__PURE__ */ f({
  __name: "index",
  setup(A) {
    const l = C(), i = I();
    return (E, T) => {
      const c = t("el-header"), m = t("router-view"), p = t("el-scrollbar"), s = t("el-main"), a = t("el-container");
      return r(), h("div", B, [
        e(a, null, {
          default: o(() => [
            e(c, null, {
              default: o(() => [
                e(S)
              ]),
              _: 1
            }),
            e(a, { class: "layout-admin__body" }, {
              default: o(() => [
                e(k),
                e(a, { direction: "vertical" }, {
                  default: o(() => [
                    e(w),
                    e(s, { class: "layout-admin__main h-full p-0" }, {
                      default: o(() => [
                        e(p, null, {
                          default: o(() => [
                            v("div", V, [
                              _(l).routeRefreshTag ? (r(), n(m, { key: 0 }, {
                                default: o(({ Component: d, route: u }) => [
                                  (r(), n(y, {
                                    include: _(i).tabNames,
                                    max: 15
                                  }, [
                                    (r(), n(x(d), {
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
const re = /* @__PURE__ */ N(g, [["__scopeId", "data-v-0e7f686a"]]);
export {
  re as default
};
