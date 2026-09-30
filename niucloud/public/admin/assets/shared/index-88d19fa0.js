import { defineComponent as q, computed as F, onMounted as M, watch as U, resolveComponent as h, withDirectives as G, openBlock as i, createElementBlock as f, createElementVNode as p, Fragment as z, renderList as K, unref as t, createBlock as w, withCtx as n, createVNode as a, createTextVNode as b, toDisplayString as m, normalizeClass as P, createCommentVNode as y, withModifiers as Q, vShow as H, pushScopeId as he, popScopeId as fe } from "vue";
import { useRoute as J, useRouter as W } from "vue-router";
import { eb as X, u as Y, hv as Z, h as ee, t as l, aQ as te, hw as v, cA as oe, a as se } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ne = { class: "tab-bar" }, ae = { class: "tab-bar__list" }, ce = ["onClick"], re = {
  key: 0,
  class: "tab-item__divider"
}, ie = ["title"], le = ["onClick"], de = { class: "tab-bar__toolbar" }, me = ["title"], _e = ["title"], ue = /* @__PURE__ */ q({
  __name: "index",
  setup(pe) {
    const o = X(), x = Y(), S = Z(), N = ee(), c = J(), _ = W(), V = F(() => Object.values(o.tabs));
    M(() => {
      o.addTab(c);
    }), U(c, (e) => {
      o.addTab(e);
    });
    const B = (e) => {
      e.name != c.name && _.push({ name: e.name, query: e.query, state: { [v]: !0 } });
    }, T = (e, r) => {
      const C = Object.keys(o.tabs), d = C[r - 1] || C[r + 1];
      o.removeTab(e), e == c.name && d && _.push({ name: d, state: { [v]: !0 } });
    }, E = () => {
      const e = Object.keys(o.tabs);
      if (e.length <= 1)
        return;
      const r = e.indexOf(c.name);
      r != -1 && T(c.name, r);
    }, $ = (e) => {
      o.removeLeft(e), _.push({ name: e, state: { [v]: !0 } });
    }, A = (e) => {
      o.removeRight(e), _.push({ name: e, state: { [v]: !0 } });
    }, R = (e) => {
      o.removeOthers(e), _.push({ name: e, state: { [v]: !0 } });
    }, I = () => {
      o.clearTab();
      const e = oe(N.routers);
      e && e != c.name ? _.push({ name: e }) : o.addTab(c);
    }, j = (e) => {
      const r = c.name;
      r && (e == "current" ? E() : e == "others" ? R(r) : e == "all" && I());
    }, D = () => {
      S.routeRefreshTag && S.refreshRouterView();
    };
    return (e, r) => {
      const C = h("el-image"), d = h("icon"), u = h("el-dropdown-item"), L = h("el-dropdown-menu"), O = h("el-dropdown");
      return G((i(), f("div", ne, [
        p("div", ae, [
          (i(!0), f(z, null, K(t(V), (s, k) => (i(), w(O, {
            key: s.name,
            trigger: "contextmenu",
            placement: "bottom-start"
          }, {
            dropdown: n(() => [
              a(L, null, {
                default: n(() => [
                  a(u, {
                    icon: "Back",
                    disabled: k == 0,
                    onClick: (g) => $(s.name)
                  }, {
                    default: n(() => [
                      b(m(t(l)("tabs.closeLeft")), 1)
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick"]),
                  a(u, {
                    icon: "Right",
                    disabled: k == t(o).tabLength - 1,
                    onClick: (g) => A(s.name)
                  }, {
                    default: n(() => [
                      b(m(t(l)("tabs.closeRight")), 1)
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick"]),
                  a(u, {
                    icon: "Close",
                    disabled: t(o).tabLength == 1,
                    onClick: (g) => R(s.name)
                  }, {
                    default: n(() => [
                      b(m(t(l)("tabs.closeOther")), 1)
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick"])
                ]),
                _: 2
              }, 1024)
            ]),
            default: n(() => [
              p("div", {
                class: P(["tab-item", { "is-active": s.name == t(c).name }]),
                onClick: (g) => B(s)
              }, [
                k > 0 && t(o).tabLength > 1 ? (i(), f("span", re)) : y("", !0),
                typeof s.icon == "string" && s.icon ? (i(), f(z, { key: 1 }, [
                  t(te)(s.icon) ? (i(), w(C, {
                    key: 0,
                    class: "tab-item__image",
                    src: s.icon,
                    fit: "fill"
                  }, null, 8, ["src"])) : (i(), w(d, {
                    key: 1,
                    class: "tab-item__icon",
                    name: s.icon,
                    size: "var(--cmp-tabbar-icon-size)"
                  }, null, 8, ["name"]))
                ], 64)) : y("", !0),
                p("span", {
                  class: "tab-item__title",
                  title: s.title
                }, m(s.title), 9, ie),
                t(o).tabLength > 1 ? (i(), f("span", {
                  key: 2,
                  class: "tab-item__close",
                  onClick: Q((g) => T(s.name, k), ["stop"])
                }, [
                  a(d, {
                    name: "element Close",
                    size: "var(--cmp-tabbar-close-icon-size)"
                  })
                ], 8, le)) : y("", !0)
              ], 10, ce)
            ]),
            _: 2
          }, 1024))), 128))
        ]),
        p("div", de, [
          a(O, {
            trigger: "click",
            onCommand: j
          }, {
            dropdown: n(() => [
              a(L, null, {
                default: n(() => [
                  a(u, {
                    command: "current",
                    icon: "Close"
                  }, {
                    default: n(() => [
                      b(m(t(l)("tabs.closeCurrent")), 1)
                    ]),
                    _: 1
                  }),
                  a(u, {
                    command: "others",
                    icon: "Close"
                  }, {
                    default: n(() => [
                      b(m(t(l)("tabs.closeOther")), 1)
                    ]),
                    _: 1
                  }),
                  a(u, {
                    command: "all",
                    icon: "Delete"
                  }, {
                    default: n(() => [
                      b(m(t(l)("tabs.closeAll")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            default: n(() => [
              p("div", {
                class: "tab-bar__action",
                title: t(l)("tabs.more")
              }, [
                a(d, {
                  name: "element Grid",
                  size: "var(--cmp-tabbar-action-icon-size)"
                })
              ], 8, me)
            ]),
            _: 1
          }),
          p("div", {
            class: "tab-bar__action",
            title: t(l)("refresh"),
            onClick: D
          }, [
            a(d, {
              name: "element Refresh",
              size: "var(--cmp-tabbar-action-icon-size)"
            })
          ], 8, _e)
        ])
      ], 512)), [
        [H, t(x).tab]
      ]);
    };
  }
});
const Te = /* @__PURE__ */ se(ue, [["__scopeId", "data-v-b27d5945"]]);
export {
  Te as default
};
