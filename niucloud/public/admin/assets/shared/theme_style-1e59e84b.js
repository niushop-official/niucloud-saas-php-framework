import { defineComponent as N, ref as p, resolveComponent as a, resolveDirective as S, openBlock as u, createElementBlock as y, createVNode as l, withCtx as o, createElementVNode as t, toDisplayString as m, unref as _, withDirectives as I, createBlock as V, normalizeStyle as f, createCommentVNode as B, createTextVNode as E, pushScopeId as L, popScopeId as R } from "vue";
import { _ as z } from "./icon-addon-90fccbab.js";
import { t as b, j as T, bH as $, a as H } from "./core-shared-c6ad4e77.js";
import { useRoute as O } from "vue-router";
import { t as q } from "./theme-list-9833e5dc.js";
import { c as A } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./edit-theme-c45d1a46.js";
import "./add-theme-d01c987c.js";
import "./diy-452683aa.js";
const F = (s) => (L("data-v-fed94f3a"), s = s(), R(), s), G = { class: "main-container" }, J = { class: "flex justify-between items-center" }, K = { class: "text-page-title" }, M = { class: "flex items-center" }, P = /* @__PURE__ */ F(() => /* @__PURE__ */ t("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ t("img", {
    class: "w-full h-full",
    src: z,
    alt: ""
  })
], -1)), Q = { class: "flex-1 ml-2 truncate" }, U = {
  key: 0,
  class: "rounded-[3px] inline-flex items-center justify-center border-[1px] border-solid border-[#f2f2f2] overflow-hidden"
}, W = /* @__PURE__ */ N({
  __name: "theme_style",
  setup(s) {
    const g = O().meta.title, i = p(!0), h = p(null), v = p([]), x = () => {
      i.value = !0, $({}).then((r) => {
        let n = A(r.data);
        for (let c in n)
          n[c].key = c;
        v.value = Object.values(n), i.value = !1;
      });
    };
    x();
    const k = (r) => {
      h.value.open(r);
    };
    return (r, n) => {
      const c = a("el-image"), d = a("el-table-column"), w = a("el-button"), C = a("el-table"), D = a("el-card"), j = S("loading");
      return u(), y("div", G, [
        l(D, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            t("div", J, [
              t("span", K, m(_(g)), 1)
            ]),
            I((u(), V(C, {
              data: v.value,
              size: "large",
              class: "mt-[20px]"
            }, {
              empty: o(() => [
                t("span", null, m(i.value ? "" : _(b)("emptyData")), 1)
              ]),
              default: o(() => [
                l(d, {
                  label: "应用",
                  "min-width": "120"
                }, {
                  default: o(({ row: e }) => [
                    t("div", M, [
                      l(c, {
                        class: "w-[40px] h-[40px] rounded-md overflow-hidden",
                        src: _(T)(e.icon),
                        fit: "contain"
                      }, {
                        error: o(() => [
                          P
                        ]),
                        _: 2
                      }, 1032, ["src"]),
                      t("div", Q, m(e.addon_title), 1)
                    ])
                  ]),
                  _: 1
                }),
                l(d, {
                  label: "配色名称",
                  "min-width": "120"
                }, {
                  default: o(({ row: e }) => [
                    t("div", null, m(e.title), 1)
                  ]),
                  _: 1
                }),
                l(d, {
                  label: "配色方案",
                  "min-width": "120"
                }, {
                  default: o(({ row: e }) => [
                    e.theme ? (u(), y("div", U, [
                      t("span", {
                        class: "w-[18px] h-[18px]",
                        style: f({ backgroundColor: e.theme["--primary-color"] })
                      }, null, 4),
                      t("span", {
                        class: "w-[18px] h-[18px]",
                        style: f({ backgroundColor: e.theme["--primary-help-color2"] })
                      }, null, 4),
                      t("span", {
                        class: "w-[18px] h-[18px]",
                        style: f({ backgroundColor: e.theme["--primary-color-dark"] })
                      }, null, 4)
                    ])) : B("", !0)
                  ]),
                  _: 1
                }),
                l(d, {
                  label: _(b)("operation"),
                  align: "right",
                  fixed: "right",
                  width: "100"
                }, {
                  default: o(({ row: e }) => [
                    l(w, {
                      type: "primary",
                      link: "",
                      onClick: (Y) => k(e)
                    }, {
                      default: o(() => [
                        E("编辑")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [j, i.value]
            ])
          ]),
          _: 1
        }),
        l(q, {
          ref_key: "themeListRef",
          ref: h,
          onConfirm: n[0] || (n[0] = (e) => x())
        }, null, 512)
      ]);
    };
  }
});
const pe = /* @__PURE__ */ H(W, [["__scopeId", "data-v-fed94f3a"]]);
export {
  pe as default
};
