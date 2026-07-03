import { defineComponent as j, ref as P, reactive as R, resolveComponent as r, resolveDirective as T, openBlock as _, createElementBlock as m, createVNode as a, withCtx as o, createElementVNode as i, toDisplayString as c, unref as l, withDirectives as A, createBlock as v, createCommentVNode as w, createTextVNode as y, pushScopeId as B, popScopeId as U } from "vue";
import { _ as k } from "./member_head-81b0c11e.js";
import { _ as q } from "./category_default-e8ea3d4a.js";
import { t as s, i as z, eN as E, _ as $ } from "./core-shared-c8d7774e.js";
import { useRoute as L } from "vue-router";
import F from "./weapp_version-57a8d527.js";
import G from "./setting-c5696021.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const N = (d) => (B("data-v-7634b5b1"), d = d(), U(), d), H = { class: "main-container" }, J = { class: "flex justify-between items-center p-[20px]" }, K = { class: "text-page-title" }, M = { class: "flex items-center" }, O = { class: "mr-[10px] rounded-full w-[60px] h-[60px] flex items-center justify-center" }, Q = /* @__PURE__ */ N(() => /* @__PURE__ */ i("div", { class: "image-slot" }, [
  /* @__PURE__ */ i("img", {
    class: "w-[60px] h-[60px]",
    src: k,
    fit: "contain"
  })
], -1)), W = {
  key: 1,
  class: "max-w-[60px] max-h-[60px]",
  src: k,
  alt: ""
}, X = { class: "flex flex-col" }, Y = { class: "text-info text-sm" }, Z = { key: 0 }, ee = { key: 1 }, te = /* @__PURE__ */ N(() => /* @__PURE__ */ i("div", { class: "image-slot" }, [
  /* @__PURE__ */ i("img", {
    class: "w-[60px] h-[60px]",
    src: q,
    fit: "contain"
  })
], -1)), ae = { class: "mt-[16px] flex justify-end" }, oe = /* @__PURE__ */ j({
  __name: "oplatform",
  setup(d) {
    const V = L().meta.title, g = P("xcx"), t = R({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {}
    }), u = (h = 1) => {
      t.loading = !0, t.page = h, E({
        page: t.page,
        limit: t.limit
      }).then((n) => {
        t.loading = !1, t.data = n.data.data, t.total = n.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    return u(), (h, n) => {
      const f = r("el-tab-pane"), x = r("el-image"), p = r("el-table-column"), C = r("el-table"), D = r("el-pagination"), b = r("el-card"), I = r("el-tabs"), S = T("loading");
      return _(), m("div", H, [
        a(b, {
          class: "box-card !border-none setting-card",
          shadow: "never"
        }, {
          default: o(() => [
            i("div", J, [
              i("span", K, c(l(V)), 1)
            ]),
            a(I, {
              modelValue: g.value,
              "onUpdate:modelValue": n[3] || (n[3] = (e) => g.value = e)
            }, {
              default: o(() => [
                a(f, {
                  label: l(s)("小程序同步"),
                  name: "xcx"
                }, {
                  default: o(() => [
                    a(F)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(f, {
                  label: l(s)("开放平台配置"),
                  name: "setting"
                }, {
                  default: o(() => [
                    a(G)
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(f, {
                  label: l(s)("授权记录"),
                  name: "auth_record"
                }, {
                  default: o(() => [
                    a(b, {
                      class: "box-card !border-none p-[20px]",
                      shadow: "never"
                    }, {
                      default: o(() => [
                        A((_(), v(C, {
                          data: t.data,
                          size: "large"
                        }, {
                          empty: o(() => [
                            i("span", null, c(t.loading ? "" : l(s)("emptyData")), 1)
                          ]),
                          default: o(() => [
                            a(p, {
                              prop: "user_version",
                              label: l(s)("publicInfo"),
                              "show-overflow-tooltip": !0,
                              "min-width": "150px"
                            }, {
                              default: o(({ row: e }) => [
                                i("div", M, [
                                  i("div", O, [
                                    e.value.authorizer_info.head_img ? (_(), v(x, {
                                      key: 0,
                                      class: "w-[60px] h-[60px]",
                                      src: l(z)(e.value.authorizer_info.head_img),
                                      fit: "contain"
                                    }, {
                                      error: o(() => [
                                        Q
                                      ]),
                                      _: 2
                                    }, 1032, ["src"])) : (_(), m("img", W))
                                  ]),
                                  i("div", X, [
                                    i("span", null, c(e.value.authorizer_info.nick_name || ""), 1),
                                    i("span", Y, c(e.value.authorizer_info.principal_name || ""), 1)
                                  ])
                                ])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            a(p, {
                              prop: "user_version",
                              label: l(s)("publicType")
                            }, {
                              default: o(({ row: e }) => [
                                e.config_key == "wechat_authorization_info" ? (_(), m("div", Z, "微信公众号")) : w("", !0),
                                e.config_key == "weapp_authorization_info" ? (_(), m("div", ee, "微信小程序")) : w("", !0)
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            a(p, {
                              prop: "user_version",
                              label: l(s)("qrcode")
                            }, {
                              default: o(({ row: e }) => [
                                a(x, {
                                  class: "w-[60px] h-[60px]",
                                  src: l(z)(e.value.authorizer_info.qrcode_url),
                                  fit: "contain"
                                }, {
                                  error: o(() => [
                                    te
                                  ]),
                                  _: 2
                                }, 1032, ["src"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            a(p, {
                              label: l(s)("APPID"),
                              "show-overflow-tooltip": !0
                            }, {
                              default: o(({ row: e }) => [
                                y(c(e.value.authorization_info.authorizer_appid), 1)
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            a(p, {
                              label: l(s)("siteName")
                            }, {
                              default: o(({ row: e }) => [
                                y(c(e.site.site_name), 1)
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            a(p, {
                              prop: "create_time",
                              label: l(s)("authTime")
                            }, null, 8, ["label"])
                          ]),
                          _: 1
                        }, 8, ["data"])), [
                          [S, t.loading]
                        ]),
                        i("div", ae, [
                          a(D, {
                            "current-page": t.page,
                            "onUpdate:currentPage": n[0] || (n[0] = (e) => t.page = e),
                            "page-size": t.limit,
                            "onUpdate:pageSize": n[1] || (n[1] = (e) => t.limit = e),
                            layout: "total, sizes, prev, pager, next, jumper",
                            total: t.total,
                            onSizeChange: n[2] || (n[2] = (e) => u()),
                            onCurrentChange: u
                          }, null, 8, ["current-page", "page-size", "total"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const he = /* @__PURE__ */ $(oe, [["__scopeId", "data-v-7634b5b1"]]);
export {
  he as default
};
