import { defineComponent as L, onMounted as R, watch as j, resolveComponent as p, openBlock as i, createElementBlock as f, createVNode as c, unref as s, withCtx as n, Fragment as B, renderList as E, createBlock as N, createTextVNode as m, toDisplayString as b, createElementVNode as S, normalizeClass as V } from "vue";
import { dL as $, t as u, _ as q } from "./core-shared-ca1fcae5.js";
import { useRoute as z, useRouter as D } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const F = { class: "tab-wrap w-full px-[16px]" }, I = /* @__PURE__ */ L({
  __name: "tabs",
  setup(M) {
    const t = $(), r = z(), d = D();
    R(() => {
      t.addTab(r);
    }), j(r, (e) => {
      t.addTab(e);
    });
    const k = (e) => {
      const o = t.tabs[e.props.name];
      d.push({ path: o.path, query: o.query });
    }, v = (e) => {
      if (r.path == e) {
        const o = Object.keys(t.tabs);
        d.push({ path: o[o.indexOf(e) - 1] });
      }
      t.removeTab(e);
    }, C = (e) => {
      const o = Object.keys(t.tabs);
      for (let a = o.indexOf(e) - 1; a >= 0; a--)
        delete t.tabs[o[a]];
      d.push({ path: e });
    }, g = (e) => {
      const o = Object.keys(t.tabs);
      for (let a = o.indexOf(e) + 1; a < o.length; a++)
        delete t.tabs[o[a]];
      d.push({ path: e });
    }, w = (e) => {
      Object.keys(t.tabs).forEach((a) => {
        a != e && delete t.tabs[a];
      }), d.push({ path: e });
    };
    return (e, o) => {
      const a = p("el-dropdown-item"), x = p("el-dropdown-menu"), y = p("el-dropdown"), O = p("el-tab-pane"), T = p("el-tabs");
      return i(), f("div", F, [
        c(T, {
          closable: s(t).tabLength > 1,
          "model-value": s(r).path,
          onTabClick: k,
          onTabRemove: v
        }, {
          default: n(() => [
            (i(!0), f(B, null, E(s(t).tabs, (l, A, _) => (i(), N(O, {
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
const X = /* @__PURE__ */ q(I, [["__scopeId", "data-v-300f8334"]]);
export {
  X as default
};
