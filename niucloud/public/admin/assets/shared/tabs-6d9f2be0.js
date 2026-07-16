import { defineComponent as R, onMounted as L, watch as S, resolveComponent as d, openBlock as i, createElementBlock as f, createVNode as c, unref as s, withCtx as n, Fragment as j, renderList as B, createBlock as I, createTextVNode as m, toDisplayString as b, createElementVNode as E, normalizeClass as N, pushScopeId as H, popScopeId as J } from "vue";
import { dO as V, t as u, _ as $ } from "./core-shared-e1759ce4.js";
import { useRoute as q, useRouter as z } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const D = { class: "tab-wrap w-full px-[16px]" }, F = /* @__PURE__ */ R({
  __name: "tabs",
  setup(M) {
    const t = V(), r = q(), p = z();
    L(() => {
      t.addTab(r);
    }), S(r, (e) => {
      t.addTab(e);
    });
    const k = (e) => {
      const o = t.tabs[e.props.name];
      p.push({ path: o.path, query: o.query });
    }, v = (e) => {
      if (r.path == e) {
        const o = Object.keys(t.tabs);
        p.push({ path: o[o.indexOf(e) - 1] });
      }
      t.removeTab(e);
    }, C = (e) => {
      const o = Object.keys(t.tabs);
      for (let a = o.indexOf(e) - 1; a >= 0; a--)
        delete t.tabs[o[a]];
      p.push({ path: e });
    }, g = (e) => {
      const o = Object.keys(t.tabs);
      for (let a = o.indexOf(e) + 1; a < o.length; a++)
        delete t.tabs[o[a]];
      p.push({ path: e });
    }, w = (e) => {
      Object.keys(t.tabs).forEach((a) => {
        a != e && delete t.tabs[a];
      }), p.push({ path: e });
    };
    return (e, o) => {
      const a = d("el-dropdown-item"), x = d("el-dropdown-menu"), y = d("el-dropdown"), O = d("el-tab-pane"), T = d("el-tabs");
      return i(), f("div", D, [
        c(T, {
          closable: s(t).tabLength > 1,
          "model-value": s(r).path,
          onTabClick: k,
          onTabRemove: v
        }, {
          default: n(() => [
            (i(!0), f(j, null, B(s(t).tabs, (l, A, _) => (i(), I(O, {
              name: l.path,
              key: _
            }, {
              label: n(() => [
                c(y, {
                  trigger: "contextmenu",
                  placement: "bottom-start"
                }, {
                  dropdown: n(() => [
                    c(x, null, {
                      default: n(() => [
                        c(a, {
                          icon: "Back",
                          disabled: _ == 0,
                          onClick: (h) => C(l.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeLeft")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        c(a, {
                          icon: "Right",
                          disabled: _ == s(t).tabLength - 1,
                          onClick: (h) => g(l.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeRight")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        c(a, {
                          icon: "Close",
                          disabled: s(t).tabLength == 1,
                          onClick: (h) => w(l.path)
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
                      class: N([{ "text-primary": s(r).path == l.path }, "tab-name"])
                    }, b(l.title), 3)
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
const Z = /* @__PURE__ */ $(F, [["__scopeId", "data-v-e396e61f"]]);
export {
  Z as default
};
