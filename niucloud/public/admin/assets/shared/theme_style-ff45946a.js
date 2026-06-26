import { defineComponent as S, ref as p, resolveComponent as a, resolveDirective as j, openBlock as u, createElementBlock as y, createVNode as l, withCtx as o, createElementVNode as t, toDisplayString as m, unref as _, withDirectives as I, createBlock as V, normalizeStyle as f, createCommentVNode as z, createTextVNode as B, pushScopeId as E, popScopeId as L } from "vue";
import { _ as R } from "./icon-addon-90fccbab.js";
import { t as b, i as T, bz as $, _ as O } from "./core-shared-ca1fcae5.js";
import { useRoute as q } from "vue-router";
import { t as A } from "./theme-list-3edf0961.js";
import { c as F } from "./cloneDeep-70d647ec.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./edit-theme.vue_vue_type_script_setup_true_lang-4f5dd913.js";
import "./add-theme.vue_vue_type_script_setup_true_lang-14cfad80.js";
import "./diy-f8acd48b.js";
import "./isArrayLike-62604998.js";
const G = (s) => (E("data-v-fed94f3a"), s = s(), L(), s), H = { class: "main-container" }, J = { class: "flex justify-between items-center" }, K = { class: "text-page-title" }, M = { class: "flex items-center" }, P = /* @__PURE__ */ G(() => /* @__PURE__ */ t("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ t("img", {
    class: "w-full h-full",
    src: R,
    alt: ""
  })
], -1)), Q = { class: "flex-1 ml-2 truncate" }, U = {
  key: 0,
  class: "rounded-[3px] inline-flex items-center justify-center border-[1px] border-solid border-[#f2f2f2] overflow-hidden"
}, W = /* @__PURE__ */ S({
  __name: "theme_style",
  setup(s) {
    const g = q().meta.title, i = p(!0), h = p(null), v = p([]), x = () => {
      i.value = !0, $({}).then((r) => {
        let n = F(r.data);
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
      const c = a("el-image"), d = a("el-table-column"), w = a("el-button"), C = a("el-table"), D = a("el-card"), N = j("loading");
      return u(), y("div", H, [
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
                    ])) : z("", !0)
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
                        B("编辑")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [N, i.value]
            ])
          ]),
          _: 1
        }),
        l(A, {
          ref_key: "themeListRef",
          ref: h,
          onConfirm: n[0] || (n[0] = (e) => x())
        }, null, 512)
      ]);
    };
  }
});
const ue = /* @__PURE__ */ O(W, [["__scopeId", "data-v-fed94f3a"]]);
export {
  ue as default
};
