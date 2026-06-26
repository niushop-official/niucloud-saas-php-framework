import { defineComponent as R, onMounted as S, watch as j, resolveComponent as i, withDirectives as B, openBlock as _, createElementBlock as h, createVNode as r, unref as s, withCtx as n, Fragment as E, renderList as N, createBlock as V, createTextVNode as p, toDisplayString as m, createElementVNode as $, normalizeClass as q, vShow as D } from "vue";
import { dL as z, ck as F, t as u, _ as I } from "./core-shared-ca1fcae5.js";
import { useRoute as M, useRouter as A } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const G = { class: "tab-wrap w-full px-[16px]" }, H = /* @__PURE__ */ R({
  __name: "tabs",
  setup(J) {
    const o = z(), k = F(), d = M(), l = A();
    S(() => {
      o.addTab(d);
    }), j(d, (e) => {
      o.addTab(e);
    });
    const v = (e) => {
      const t = o.tabs[e.props.name];
      l.push({ name: t.name, query: t.query });
    }, y = (e) => {
      if (d.name == e) {
        const t = Object.keys(o.tabs);
        t.indexOf(e) == 0 ? l.push({ name: t[1] }) : l.push({ name: t[t.indexOf(e) - 1] });
      }
      o.removeTab(e);
    }, w = (e) => {
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
      const a = i("el-dropdown-item"), x = i("el-dropdown-menu"), O = i("el-dropdown"), T = i("el-tab-pane"), L = i("el-tabs");
      return B((_(), h("div", G, [
        r(L, {
          closable: s(o).tabLength > 1,
          "model-value": s(d).name,
          onTabClick: v,
          onTabRemove: y
        }, {
          default: n(() => [
            (_(!0), h(E, null, N(s(o).tabs, (c, K, b) => (_(), V(T, {
              name: c.name,
              key: b
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
                          disabled: b == 0,
                          onClick: (f) => w(c.name)
                        }, {
                          default: n(() => [
                            p(m(s(u)("tabs.closeLeft")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        r(a, {
                          icon: "Right",
                          disabled: b == s(o).tabLength - 1,
                          onClick: (f) => C(c.name)
                        }, {
                          default: n(() => [
                            p(m(s(u)("tabs.closeRight")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        r(a, {
                          icon: "Close",
                          disabled: s(o).tabLength == 1,
                          onClick: (f) => g(c.name)
                        }, {
                          default: n(() => [
                            p(m(s(u)("tabs.closeOther")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  default: n(() => [
                    $("span", {
                      class: q([{ "text-primary": s(d).name == c.name }, "tab-name"])
                    }, m(c.title), 3)
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
        [D, s(k).tab]
      ]);
    };
  }
});
const te = /* @__PURE__ */ I(H, [["__scopeId", "data-v-3e10629a"]]);
export {
  te as default
};
