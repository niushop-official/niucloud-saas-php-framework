import { defineComponent as I, ref as _, computed as V, resolveComponent as h, openBlock as i, createElementBlock as u, Fragment as k, createVNode as d, normalizeClass as T, unref as p, withKeys as C, withModifiers as U, withCtx as S, createElementVNode as f, toDisplayString as b, createCommentVNode as E, renderList as M, pushScopeId as H, popScopeId as J, nextTick as N } from "vue";
import { useRouter as B } from "vue-router";
import { Search as K } from "@element-plus/icons-vue";
import { a as F } from "./core-shared-c6ad4e77.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const z = ["onKeydown"], A = { class: "menu-search-input" }, D = { class: "menu-search-list" }, O = {
  key: 0,
  class: "menu-search-empty"
}, W = ["title", "onClick"], X = /* @__PURE__ */ I({
  __name: "index",
  setup(j) {
    const m = B(), s = _(!1), l = _(""), v = _(null), g = 60, x = V(() => m.getRoutes().filter((e) => {
      var o, a;
      return ((o = e.meta) == null ? void 0 : o.type) == 1 && ((a = e.meta) == null ? void 0 : a.show) !== !1;
    }).filter((e) => !String(e.path).endsWith("/login")).map((e) => {
      var a, c, n;
      const o = String(((a = e.meta) == null ? void 0 : a.title) || ((c = e.meta) == null ? void 0 : c.short_title) || "");
      return {
        name: String(e.name ?? ""),
        title: o,
        path: String(e.path ?? ""),
        searchText: `${o} ${((n = e.meta) == null ? void 0 : n.short_title) || ""} ${e.path || ""} ${e.name ?? ""}`.toLowerCase()
      };
    }).filter((e) => e.title !== "")), r = V(() => {
      const t = l.value.trim().toLowerCase();
      return t ? x.value.filter((e) => e.searchText.includes(t)).slice(0, g) : x.value.slice(0, g);
    }), y = () => {
      s.value = !0;
    }, L = () => {
      N(() => {
        var t, e;
        return (e = (t = v.value) == null ? void 0 : t.focus) == null ? void 0 : e.call(t);
      });
    }, R = () => {
      l.value = "";
    }, w = (t) => {
      !t.path && !t.name || (s.value = !1, m.push(t.path || { name: t.name }).catch(() => {
        t.name && m.push({ name: t.name }).catch(() => {
        });
      }));
    }, $ = () => {
      r.value.length && w(r.value[0]);
    };
    return (t, e) => {
      const o = h("el-input"), a = h("el-scrollbar"), c = h("el-dialog");
      return i(), u(k, null, [
        d(o, {
          modelValue: l.value,
          "onUpdate:modelValue": e[0] || (e[0] = (n) => l.value = n),
          class: T(["menu-search-trigger", { "is-active": s.value }]),
          placeholder: "菜单搜索",
          readonly: "",
          "prefix-icon": p(K),
          onClick: y,
          onKeydown: C(U(y, ["prevent"]), ["enter"])
        }, null, 8, ["modelValue", "class", "prefix-icon", "onKeydown"]),
        d(c, {
          modelValue: s.value,
          "onUpdate:modelValue": e[2] || (e[2] = (n) => s.value = n),
          class: "menu-search-dialog",
          width: "450px",
          top: "56px",
          "show-close": !1,
          "append-to-body": "",
          onOpened: L,
          onClosed: R
        }, {
          default: S(() => [
            f("div", {
              class: "menu-search-body",
              onKeydown: C($, ["enter"])
            }, [
              f("div", A, [
                d(o, {
                  ref_key: "inputRef",
                  ref: v,
                  modelValue: l.value,
                  "onUpdate:modelValue": e[1] || (e[1] = (n) => l.value = n),
                  placeholder: "菜单搜索: 支持中文、路由路径",
                  clearable: "",
                  "prefix-icon": p(K)
                }, null, 8, ["modelValue", "prefix-icon"])
              ]),
              f("div", D, [
                d(a, { "max-height": "300px" }, {
                  default: S(() => [
                    p(r).length ? E("", !0) : (i(), u("div", O, b(l.value ? "未找到匹配的菜单" : "暂无可搜索的菜单"), 1)),
                    (i(!0), u(k, null, M(p(r), (n) => (i(), u("div", {
                      key: n.path || n.name,
                      class: "menu-search-item",
                      title: n.path,
                      onClick: (q) => w(n)
                    }, b(n.title), 9, W))), 128))
                  ]),
                  _: 1
                })
              ])
            ], 40, z)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const oe = /* @__PURE__ */ F(X, [["__scopeId", "data-v-a9d6ce32"]]);
export {
  oe as default
};
