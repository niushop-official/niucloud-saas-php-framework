import { defineComponent as D, ref as I, reactive as R, resolveComponent as _, resolveDirective as P, openBlock as p, createElementBlock as d, normalizeStyle as A, unref as o, createElementVNode as i, createVNode as a, withCtx as l, withDirectives as B, createBlock as v, toDisplayString as c, createCommentVNode as x, createTextVNode as y, pushScopeId as U, popScopeId as j } from "vue";
import { _ as w } from "./member_head-81b0c11e.js";
import { _ as q } from "./category_default-e8ea3d4a.js";
import { t as s, j as z, fi as E, a as $ } from "./core-shared-c6ad4e77.js";
import { useRoute as H } from "vue-router";
import { u as L } from "./useTablePageHeight-33d60cf6.js";
import F from "./weapp_version-30aa018a.js";
import G from "./setting-2b18b4c3.js";
import J from "./index-559a9b12.js";
import K from "./index-997caa57.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./index-c14157f3.js";
import "./index-e3370990.js";
import "./index-2fe2c142.js";
const k = (m) => (U("data-v-52bf663a"), m = m(), j(), m), M = { class: "table-fill-page__card" }, O = { class: "table-panel table-fill-page__panel" }, Q = { class: "table-fill-page__table" }, W = { class: "flex items-center" }, X = { class: "mr-[10px] rounded-full w-[60px] h-[60px] flex items-center justify-center" }, Y = /* @__PURE__ */ k(() => /* @__PURE__ */ i("div", { class: "image-slot" }, [
  /* @__PURE__ */ i("img", {
    class: "w-[60px] h-[60px]",
    src: w,
    fit: "contain"
  })
], -1)), Z = {
  key: 1,
  class: "max-w-[60px] max-h-[60px]",
  src: w,
  alt: ""
}, ee = { class: "flex flex-col" }, te = { class: "text-info text-sm" }, ae = { key: 0 }, oe = { key: 1 }, le = /* @__PURE__ */ k(() => /* @__PURE__ */ i("div", { class: "image-slot" }, [
  /* @__PURE__ */ i("img", {
    class: "w-[60px] h-[60px]",
    src: q,
    fit: "contain"
  })
], -1)), ie = /* @__PURE__ */ D({
  __name: "oplatform",
  setup(m) {
    const se = H().meta.title, { pageRef: T, pageStyle: V } = L(), g = I("xcx"), t = R({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {}
    }), u = (b = 1) => {
      t.loading = !0, t.page = b, E({
        page: t.page,
        limit: t.limit
      }).then((n) => {
        t.loading = !1, t.data = n.data.data, t.total = n.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    return u(), (b, n) => {
      const f = _("el-tab-pane"), h = _("el-image"), r = _("el-table-column"), C = _("el-table"), N = _("el-tabs"), S = P("loading");
      return p(), d("div", {
        ref_key: "pageRef",
        ref: T,
        class: "main-container table-fill-page",
        style: A(o(V))
      }, [
        i("div", M, [
          a(N, {
            modelValue: g.value,
            "onUpdate:modelValue": n[3] || (n[3] = (e) => g.value = e)
          }, {
            default: l(() => [
              a(f, {
                label: o(s)("小程序同步"),
                name: "xcx"
              }, {
                default: l(() => [
                  a(F)
                ]),
                _: 1
              }, 8, ["label"]),
              a(f, {
                label: o(s)("开放平台配置"),
                name: "setting"
              }, {
                default: l(() => [
                  a(G)
                ]),
                _: 1
              }, 8, ["label"]),
              a(f, {
                label: o(s)("授权记录"),
                name: "auth_record"
              }, {
                default: l(() => [
                  i("div", O, [
                    a(K, {
                      title: o(s)("授权记录"),
                      selectable: !1
                    }, null, 8, ["title"]),
                    i("div", Q, [
                      B((p(), v(C, {
                        height: "100%",
                        data: t.data,
                        size: "large"
                      }, {
                        empty: l(() => [
                          i("span", null, c(t.loading ? "" : o(s)("emptyData")), 1)
                        ]),
                        default: l(() => [
                          a(r, {
                            prop: "user_version",
                            label: o(s)("publicInfo"),
                            "show-overflow-tooltip": !0,
                            "min-width": "150px"
                          }, {
                            default: l(({ row: e }) => [
                              i("div", W, [
                                i("div", X, [
                                  e.value.authorizer_info.head_img ? (p(), v(h, {
                                    key: 0,
                                    class: "w-[60px] h-[60px]",
                                    src: o(z)(e.value.authorizer_info.head_img),
                                    fit: "contain"
                                  }, {
                                    error: l(() => [
                                      Y
                                    ]),
                                    _: 2
                                  }, 1032, ["src"])) : (p(), d("img", Z))
                                ]),
                                i("div", ee, [
                                  i("span", null, c(e.value.authorizer_info.nick_name || ""), 1),
                                  i("span", te, c(e.value.authorizer_info.principal_name || ""), 1)
                                ])
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(r, {
                            prop: "user_version",
                            label: o(s)("publicType")
                          }, {
                            default: l(({ row: e }) => [
                              e.config_key == "wechat_authorization_info" ? (p(), d("div", ae, "微信公众号")) : x("", !0),
                              e.config_key == "weapp_authorization_info" ? (p(), d("div", oe, "微信小程序")) : x("", !0)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(r, {
                            prop: "user_version",
                            label: o(s)("qrcode")
                          }, {
                            default: l(({ row: e }) => [
                              a(h, {
                                class: "w-[60px] h-[60px]",
                                src: o(z)(e.value.authorizer_info.qrcode_url),
                                fit: "contain"
                              }, {
                                error: l(() => [
                                  le
                                ]),
                                _: 2
                              }, 1032, ["src"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(r, {
                            label: o(s)("APPID"),
                            "show-overflow-tooltip": !0
                          }, {
                            default: l(({ row: e }) => [
                              y(c(e.value.authorization_info.authorizer_appid), 1)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(r, {
                            label: o(s)("siteName")
                          }, {
                            default: l(({ row: e }) => [
                              y(c(e.site.site_name), 1)
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(r, {
                            prop: "create_time",
                            label: o(s)("authTime")
                          }, null, 8, ["label"])
                        ]),
                        _: 1
                      }, 8, ["data"])), [
                        [S, t.loading]
                      ])
                    ]),
                    a(J, {
                      "current-page": t.page,
                      "onUpdate:current-page": n[0] || (n[0] = (e) => t.page = e),
                      "page-size": t.limit,
                      "onUpdate:page-size": n[1] || (n[1] = (e) => t.limit = e),
                      total: t.total,
                      onSizeChange: n[2] || (n[2] = (e) => u()),
                      onCurrentChange: u
                    }, null, 8, ["current-page", "page-size", "total"])
                  ])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ], 4);
    };
  }
});
const Ve = /* @__PURE__ */ $(ie, [["__scopeId", "data-v-52bf663a"]]);
export {
  Ve as default
};
