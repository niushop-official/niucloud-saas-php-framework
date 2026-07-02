import { defineComponent as R, onMounted as L, watch as S, resolveComponent as p, openBlock as i, createElementBlock as f, createVNode as l, unref as s, withCtx as n, Fragment as I, renderList as j, createBlock as B, createTextVNode as m, toDisplayString as b, createElementVNode as E, normalizeClass as N, pushScopeId as H, popScopeId as J } from "vue";
import { dO as V, t as u, _ as $ } from "./core-shared-ae4a556b.js";
import { useRoute as q, useRouter as z } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const D = { class: "tab-wrap w-full px-[16px]" }, F = /* @__PURE__ */ R({
  __name: "tabs",
  setup(M) {
    const o = V(), r = q(), d = z();
    L(() => {
      o.addTab(r);
    }), S(r, (e) => {
      o.addTab(e);
    });
    const k = (e) => {
      const a = o.tabs[e.props.name];
      d.push({ path: a.path, query: a.query });
    }, v = (e) => {
      if (r.path == e) {
        const a = Object.keys(o.tabs), t = a.indexOf(e);
        t > 0 && d.push({ path: a[t - 1] });
      }
      o.removeTab(e);
    }, C = (e) => {
      const a = Object.keys(o.tabs);
      for (let t = a.indexOf(e) - 1; t >= 0; t--)
        delete o.tabs[a[t]];
      d.push({ path: e });
    }, g = (e) => {
      const a = Object.keys(o.tabs);
      for (let t = a.indexOf(e) + 1; t < a.length; t++)
        delete o.tabs[a[t]];
      d.push({ path: e });
    }, w = (e) => {
      Object.keys(o.tabs).forEach((t) => {
        t != e && delete o.tabs[t];
      }), d.push({ path: e });
    };
    return (e, a) => {
      const t = p("el-dropdown-item"), x = p("el-dropdown-menu"), y = p("el-dropdown"), O = p("el-tab-pane"), T = p("el-tabs");
      return i(), f("div", D, [
        l(T, {
          closable: s(o).tabLength > 1,
          "model-value": s(r).path,
          onTabClick: k,
          onTabRemove: v
        }, {
          default: n(() => [
            (i(!0), f(I, null, j(s(o).tabs, (c, A, _) => (i(), B(O, {
              name: c.path,
              key: _
            }, {
              label: n(() => [
                l(y, {
                  trigger: "contextmenu",
                  placement: "bottom-start"
                }, {
                  dropdown: n(() => [
                    l(x, null, {
                      default: n(() => [
                        l(t, {
                          icon: "Back",
                          disabled: _ == 0,
                          onClick: (h) => C(c.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeLeft")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        l(t, {
                          icon: "Right",
                          disabled: _ == s(o).tabLength - 1,
                          onClick: (h) => g(c.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeRight")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        l(t, {
                          icon: "Close",
                          disabled: s(o).tabLength == 1,
                          onClick: (h) => w(c.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeOther")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  default: n(() => [
                    E("span", {
                      class: N([{ "text-primary": s(r).path == c.path }, "tab-name"])
                    }, b(c.title), 3)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["name"]))), 128))
          ]),
          _: 1
        }, 8, ["closable", "model-value"])
      ]);
    };
  }
});
const Z = /* @__PURE__ */ $(F, [["__scopeId", "data-v-38fb54d6"]]);
export {
  Z as default
};
