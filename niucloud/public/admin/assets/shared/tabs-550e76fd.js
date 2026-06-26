import { defineComponent as L, onMounted as R, watch as j, resolveComponent as p, openBlock as i, createElementBlock as h, createVNode as c, unref as s, withCtx as n, Fragment as B, renderList as E, createBlock as N, createTextVNode as m, toDisplayString as b, createElementVNode as S, normalizeClass as V } from "vue";
import { dL as $, t as u, _ as q } from "./core-shared-ca1fcae5.js";
import { useRoute as I, useRouter as z } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const D = { class: "tab-wrap w-full px-[16px]" }, F = /* @__PURE__ */ L({
  __name: "tabs",
  setup(M) {
    const o = $(), r = I(), d = z();
    R(() => {
      o.addTab(r);
    }), j(r, (e) => {
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
    }, x = (e) => {
      Object.keys(o.tabs).forEach((t) => {
        t != e && delete o.tabs[t];
      }), d.push({ path: e });
    };
    return (e, a) => {
      const t = p("el-dropdown-item"), w = p("el-dropdown-menu"), y = p("el-dropdown"), O = p("el-tab-pane"), T = p("el-tabs");
      return i(), h("div", D, [
        c(T, {
          closable: s(o).tabLength > 1,
          "model-value": s(r).path,
          onTabClick: k,
          onTabRemove: v
        }, {
          default: n(() => [
            (i(!0), h(B, null, E(s(o).tabs, (l, A, _) => (i(), N(O, {
              name: l.path,
              key: _
            }, {
              label: n(() => [
                c(y, {
                  trigger: "contextmenu",
                  placement: "bottom-start"
                }, {
                  dropdown: n(() => [
                    c(w, null, {
                      default: n(() => [
                        c(t, {
                          icon: "Back",
                          disabled: _ == 0,
                          onClick: (f) => C(l.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeLeft")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        c(t, {
                          icon: "Right",
                          disabled: _ == s(o).tabLength - 1,
                          onClick: (f) => g(l.path)
                        }, {
                          default: n(() => [
                            m(b(s(u)("tabs.closeRight")), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled", "onClick"]),
                        c(t, {
                          icon: "Close",
                          disabled: s(o).tabLength == 1,
                          onClick: (f) => x(l.path)
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
                    S("span", {
                      class: V([{ "text-primary": s(r).path == l.path }, "tab-name"])
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
const X = /* @__PURE__ */ q(F, [["__scopeId", "data-v-38fb54d6"]]);
export {
  X as default
};
