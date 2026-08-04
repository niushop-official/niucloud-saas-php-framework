import { defineComponent as R, reactive as A, ref as M, resolveComponent as c, resolveDirective as q, openBlock as p, createElementBlock as x, createVNode as o, withCtx as n, createElementVNode as m, toDisplayString as r, unref as l, createTextVNode as _, withDirectives as z, createBlock as h, createCommentVNode as w } from "vue";
import { _ as D } from "./category_default-e8ea3d4a.js";
import { t as e, i as L, r as S, fW as U, fX as W, cs as X } from "./core-shared-5b3bfa35.js";
import { ElMessageBox as C } from "element-plus";
import { useRoute as G, useRouter as H } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const I = { class: "main-container" }, J = { class: "flex justify-between items-center" }, K = { class: "text-page-title" }, Q = { class: "mt-[20px]" }, Y = { class: "flex items-center justify-between" }, Z = /* @__PURE__ */ m("img", {
  class: "w-[45px] h-[45px]",
  src: D,
  alt: ""
}, null, -1), ee = {
  key: 1,
  class: "w-[45px] h-[45px]",
  src: D,
  alt: ""
}, te = { class: "flex-1 w-[236px] pl-[15px] truncate" }, _e = /* @__PURE__ */ R({
  __name: "list",
  setup(le) {
    const B = G().meta.title, t = A({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        search: ""
      }
    }), b = M(), V = (i) => {
      i && (i.resetFields(), f());
    }, f = (i = 1) => {
      t.loading = !0, t.page = i, S({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((s) => {
        t.loading = !1, t.data = s.data, t.total = s.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    f();
    const P = H(), j = (i) => {
      P.push({ path: "/tools/addon_edit", query: { key: i } });
    }, F = (i) => {
      t.loading = !0, U(i.key).then((s) => {
        t.loading = !1, W(i.key).then((g) => {
          C.alert(`插件打包成功，插件包所在位置：网站根目录${g.data}下请手动进行下载`, e("warning"));
        }).catch();
      }).catch(() => {
        t.loading = !1;
      });
    }, N = (i) => {
      C.confirm(
        e("codeDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        t.loading = !0, X(i).then(() => {
          f();
        }).catch(() => {
          t.loading = !1;
        });
      });
    };
    return (i, s) => {
      const g = c("el-input"), y = c("el-form-item"), u = c("el-button"), T = c("el-form"), k = c("el-card"), $ = c("el-image"), d = c("el-table-column"), E = c("el-table"), O = q("loading");
      return p(), x("div", I, [
        o(k, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            m("div", J, [
              m("span", K, r(l(B)), 1)
            ]),
            o(k, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                o(T, {
                  inline: !0,
                  model: t.searchParam,
                  ref_key: "searchFormRef",
                  ref: b,
                  class: "search-form"
                }, {
                  default: n(() => [
                    o(y, {
                      label: l(e)("title"),
                      prop: "search"
                    }, {
                      default: n(() => [
                        o(g, {
                          modelValue: t.searchParam.search,
                          "onUpdate:modelValue": s[0] || (s[0] = (a) => t.searchParam.search = a),
                          modelModifiers: { trim: !0 },
                          placeholder: l(e)("titlePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(y, null, {
                      default: n(() => [
                        o(u, {
                          type: "primary",
                          onClick: f
                        }, {
                          default: n(() => [
                            _(r(l(e)("search")), 1)
                          ]),
                          _: 1
                        }),
                        o(u, {
                          onClick: s[1] || (s[1] = (a) => V(b.value))
                        }, {
                          default: n(() => [
                            _(r(l(e)("reset")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model"])
              ]),
              _: 1
            }),
            m("div", Q, [
              z((p(), h(E, {
                data: t.data,
                size: "large"
              }, {
                empty: n(() => [
                  m("span", null, r(l(e)("emptyData")), 1)
                ]),
                default: n(() => [
                  o(d, {
                    label: l(e)("title"),
                    align: "left",
                    "min-width": "320"
                  }, {
                    default: n(({ row: a }) => [
                      m("div", Y, [
                        a.icon ? (p(), h($, {
                          key: 0,
                          class: "w-[45px] h-[45px]",
                          src: a.icon.indexOf("data:image") != -1 ? a.icon : l(L)(a.icon),
                          fit: "contain"
                        }, {
                          error: n(() => [
                            Z
                          ]),
                          _: 2
                        }, 1032, ["src"])) : (p(), x("img", ee)),
                        m("div", te, r(a.title), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(d, {
                    prop: "key",
                    label: l(e)("key"),
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  o(d, {
                    prop: "type_name",
                    label: l(e)("type"),
                    align: "center",
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  o(d, {
                    prop: "author",
                    label: l(e)("author"),
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  o(d, {
                    prop: "version",
                    label: l(e)("version"),
                    align: "center",
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  o(d, {
                    label: l(e)("status"),
                    align: "center",
                    "min-width": "200"
                  }, {
                    default: n(({ row: a }) => [
                      _(r(Object.keys(a.install_info).length ? "已安装" : "未安装"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(d, {
                    label: l(e)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "180",
                    "show-overflow-tooltip": !0
                  }, {
                    default: n(({ row: a }) => [
                      Object.keys(a.install_info).length ? (p(), h(u, {
                        key: 0,
                        type: "primary",
                        link: "",
                        onClick: (v) => F(a)
                      }, {
                        default: n(() => [
                          _(r(l(e)("step4")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : w("", !0),
                      Object.keys(a.install_info).length ? w("", !0) : (p(), h(u, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (v) => N(a.key)
                      }, {
                        default: n(() => [
                          _(r(l(e)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])),
                      o(u, {
                        type: "primary",
                        link: "",
                        onClick: (v) => j(a.key)
                      }, {
                        default: n(() => [
                          _(r(l(e)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [O, t.loading]
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _e as default
};
