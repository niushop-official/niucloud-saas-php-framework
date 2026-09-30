import { defineComponent as x, useSlots as D, computed as L, resolveComponent as i, openBlock as t, createElementBlock as s, createElementVNode as c, renderSlot as m, createTextVNode as l, toDisplayString as r, unref as d, createCommentVNode as o, createVNode as b, withCtx as a, createBlock as f, Fragment as y, pushScopeId as I, popScopeId as N } from "vue";
import { a as P } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const V = (e) => (I("data-v-7615fa38"), e = e(), N(), e), $ = { class: "table-toolbar" }, A = { class: "table-toolbar__title" }, T = { class: "table-toolbar__content" }, E = {
  key: 0,
  class: "table-toolbar__selection"
}, z = {
  key: 0,
  class: "table-toolbar__selected"
}, F = /* @__PURE__ */ V(() => /* @__PURE__ */ c("span", { class: "table-toolbar__divider" }, null, -1)), j = { class: "table-toolbar__batch-actions" }, q = {
  key: 0,
  class: "table-toolbar__divider"
}, G = { class: "table-toolbar__actions" }, H = /* @__PURE__ */ x({
  __name: "index",
  props: {
    title: { default: "" },
    selectable: { type: Boolean, default: !0 },
    selectedCount: { default: 0 },
    currentPageCount: { default: 0 },
    totalCount: { default: 0 },
    selectionLoading: { type: Boolean, default: !1 },
    selectionDisabled: { type: Boolean, default: !1 },
    allowSelectAll: { type: Boolean, default: !0 }
  },
  emits: ["select-page", "select-all", "clear-selection"],
  setup(e, { emit: _ }) {
    const v = e, g = D(), u = L(() => v.selectedCount > 0), k = (n) => {
      n == "page" && _("select-page"), n == "all" && _("select-all");
    };
    return (n, C) => {
      const w = i("icon"), h = i("el-button"), p = i("el-dropdown-item"), S = i("el-dropdown-menu"), B = i("el-dropdown");
      return t(), s("div", $, [
        c("div", A, [
          m(n.$slots, "title", {}, () => [
            l(r(e.title), 1)
          ], !0)
        ]),
        c("div", T, [
          e.selectable ? (t(), s("div", E, [
            d(u) ? (t(), s("span", z, [
              l(" 已选 "),
              c("strong", null, r(e.selectedCount), 1),
              l(" 条 ")
            ])) : o("", !0),
            b(B, {
              trigger: "click",
              disabled: e.selectionDisabled || e.selectionLoading || !e.currentPageCount && !e.totalCount,
              onCommand: k
            }, {
              dropdown: a(() => [
                b(S, null, {
                  default: a(() => [
                    b(p, {
                      command: "page",
                      disabled: e.currentPageCount <= 0
                    }, {
                      default: a(() => [
                        l(" 选择当前页（" + r(e.currentPageCount) + " 条） ", 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    e.allowSelectAll ? (t(), f(p, {
                      key: 0,
                      command: "all",
                      disabled: e.totalCount <= 0
                    }, {
                      default: a(() => [
                        l(" 选择全部筛选结果（" + r(e.totalCount) + " 条） ", 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])) : o("", !0)
                  ]),
                  _: 1
                })
              ]),
              default: a(() => [
                b(h, {
                  class: "table-toolbar__selection-trigger",
                  type: "primary",
                  link: "",
                  disabled: e.selectionDisabled,
                  loading: e.selectionLoading
                }, {
                  default: a(() => [
                    l(r(d(u) ? "重新选择" : "选择数据") + " ", 1),
                    e.selectionLoading ? o("", !0) : (t(), f(w, {
                      key: 0,
                      class: "table-toolbar__selection-arrow",
                      name: "element ArrowDown",
                      size: "12px"
                    }))
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"])
              ]),
              _: 1
            }, 8, ["disabled"]),
            d(u) ? (t(), f(h, {
              key: 1,
              class: "table-toolbar__clear",
              link: "",
              disabled: e.selectionDisabled || e.selectionLoading,
              onClick: C[0] || (C[0] = (J) => _("clear-selection"))
            }, {
              default: a(() => [
                l(" 清空 ")
              ]),
              _: 1
            }, 8, ["disabled"])) : o("", !0),
            d(g)["batch-actions"] ? (t(), s(y, { key: 2 }, [
              F,
              c("div", j, [
                m(n.$slots, "batch-actions", {
                  selectedCount: e.selectedCount,
                  hasSelection: d(u)
                }, void 0, !0)
              ])
            ], 64)) : o("", !0)
          ])) : o("", !0),
          d(g).actions ? (t(), s(y, { key: 1 }, [
            e.selectable ? (t(), s("span", q)) : o("", !0),
            c("div", G, [
              m(n.$slots, "actions", {}, void 0, !0)
            ])
          ], 64)) : o("", !0)
        ])
      ]);
    };
  }
});
const Y = /* @__PURE__ */ P(H, [["__scopeId", "data-v-7615fa38"]]);
export {
  Y as default
};
