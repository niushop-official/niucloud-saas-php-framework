import { defineComponent as R, onMounted as L, watch as j, resolveComponent as p, withDirectives as B, openBlock as b, createElementBlock as h, createVNode as r, unref as s, withCtx as n, Fragment as I, renderList as E, createBlock as N, createTextVNode as _, toDisplayString as i, createElementVNode as V, normalizeClass as $, vShow as q, pushScopeId as Q, popScopeId as U } from "vue";
import { dO as D, cm as z, t as u, _ as F } from "./core-shared-9b1e55e9.js";
import { useRoute as M, useRouter as A } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const G = { class: "tab-wrap w-full px-[16px]" }, H = /* @__PURE__ */ R({
  __name: "tabs",
  setup(J) {
    const o = D(), k = z(), d = M(), l = A();
    L(() => {
      o.addTab(d);
    }), j(d, (e) => {
      o.addTab(e);
    });
    const v = (e) => {
      const t = o.tabs[e.props.name];
      l.push({ name: t.name, query: t.query });
    }, w = (e) => {
      if (d.name == e) {
        const t = Object.keys(o.tabs);
        t.indexOf(e) == 0 ? l.push({ name: t[1] }) : l.push({ name: t[t.indexOf(e) - 1] });
      }
      o.removeTab(e);
    }, y = (e) => {
      const t = Object.keys(o.tabs);
      for (let a = t.indexOf(e) - 1; a >= 0; a--)
        delete o.tabs[t[a]];
      l.push({ name: e });
    }, C = (e) => {
      const t = Object.keys(o.tabs);
      for (let a = t.indexOf(e) + 1; a < t.length; a++)
        delete o.tabs[t[a]];
      l.push({ name: e });
    }, g = (e) => {
      Object.keys(o.tabs).forEach((a) => {
        a != e && delete o.tabs[a];
      }), l.push({ name: e });
    };
    return (e, t) => {
      const a = p("el-dropdown-item"), x = p("el-dropdown-menu"), O = p("el-dropdown"), S = p("el-tab-pane"), T = p("el-tabs");
      return B((b(), h("div", G, [
        r(T, {
          closable: s(o).tabLength > 1,
          "model-value": s(d).name,
          onTabClick: v,
          onTabRemove: w
        }, {
          default: n(() => [
            (b(!0), h(I, null, E(s(o).tabs, (c, K, m) => (b(), N(S, {
              name: c.name,
              key: m
            }, {
              label: n(() => [
                r(O, {
                  trigger: "contextmenu",
                  placement: "bottom-start"
                }, {
                  dropdown: n(() => [
                    r(x, null, {
                      default: n(() => [
                        r(a, {
                          icon: "Back",
                          disabled: m == 0,
                          onClick: (f) => y(c.name)
                        }, {
                          default: n(() => [
                            _(i(s(u)("tabs.closeLeft")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        r(a, {
                          icon: "Right",
                          disabled: m == s(o).tabLength - 1,
                          onClick: (f) => C(c.name)
                        }, {
                          default: n(() => [
                            _(i(s(u)("tabs.closeRight")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        r(a, {
                          icon: "Close",
                          disabled: s(o).tabLength == 1,
                          onClick: (f) => g(c.name)
                        }, {
                          default: n(() => [
                            _(i(s(u)("tabs.closeOther")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  default: n(() => [
                    V("span", {
                      class: $([{ "text-primary": s(d).name == c.name }, "tab-name"])
                    }, i(c.title), 3)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["name"]))), 128))
          ]),
          _: 1
        }, 8, ["closable", "model-value"])
      ], 512)), [
        [q, s(k).tab]
      ]);
    };
  }
});
const ae = /* @__PURE__ */ F(H, [["__scopeId", "data-v-23f82a56"]]);
export {
  ae as default
};
