import { defineComponent as R, onMounted as L, watch as j, resolveComponent as b, withDirectives as B, openBlock as m, createElementBlock as h, createVNode as r, unref as s, withCtx as n, Fragment as I, renderList as E, createBlock as N, createTextVNode as _, toDisplayString as p, createElementVNode as V, normalizeClass as $, vShow as q, pushScopeId as Q, popScopeId as U } from "vue";
import { dO as D, cm as z, t as u, _ as F } from "./core-shared-11c0a673.js";
import { useRoute as M, useRouter as A } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const G = { class: "tab-wrap w-full px-[16px]" }, H = /* @__PURE__ */ R({
  __name: "tabs",
  setup(J) {
    const o = D(), k = z(), d = M(), c = A();
    L(() => {
      o.addTab(d);
    }), j(d, (e) => {
      o.addTab(e);
    });
    const v = (e) => {
      const t = o.tabs[e.props.name];
      c.push({ name: t.name, query: t.query });
    }, w = (e) => {
      if (d.name == e) {
        const t = Object.keys(o.tabs);
        t.indexOf(e) == 0 ? c.push({ name: t[1] }) : c.push({ name: t[t.indexOf(e) - 1] });
      }
      o.removeTab(e);
    }, y = (e) => {
      const t = Object.keys(o.tabs);
      for (let a = t.indexOf(e) - 1; a >= 0; a--)
        delete o.tabs[t[a]];
      c.push({ name: e });
    }, C = (e) => {
      const t = Object.keys(o.tabs);
      for (let a = t.indexOf(e) + 1; a < t.length; a++)
        delete o.tabs[t[a]];
      c.push({ name: e });
    }, g = (e) => {
      Object.keys(o.tabs).forEach((a) => {
        a != e && delete o.tabs[a];
      }), c.push({ name: e });
    };
    return (e, t) => {
      const a = b("el-dropdown-item"), x = b("el-dropdown-menu"), O = b("el-dropdown"), S = b("el-tab-pane"), T = b("el-tabs");
      return B((m(), h("div", G, [
        r(T, {
          closable: s(o).tabLength > 1,
          "model-value": s(d).name,
          onTabClick: v,
          onTabRemove: w
        }, {
          default: n(() => [
            (m(!0), h(I, null, E(s(o).tabs, (l, K, i) => (m(), N(S, {
              name: l.name,
              key: i
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
                          disabled: i == 0,
                          onClick: (f) => y(l.name)
                        }, {
                          default: n(() => [
                            _(p(s(u)("tabs.closeLeft")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        r(a, {
                          icon: "Right",
                          disabled: i == s(o).tabLength - 1,
                          onClick: (f) => C(l.name)
                        }, {
                          default: n(() => [
                            _(p(s(u)("tabs.closeRight")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        r(a, {
                          icon: "Close",
                          disabled: s(o).tabLength == 1,
                          onClick: (f) => g(l.name)
                        }, {
                          default: n(() => [
                            _(p(s(u)("tabs.closeOther")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  default: n(() => [
                    V("span", {
                      class: $([{ "text-primary": s(d).name == l.name }, "tab-name"])
                    }, p(l.title), 3)
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
const ae = /* @__PURE__ */ F(H, [["__scopeId", "data-v-ba2bc230"]]);
export {
  ae as default
};
