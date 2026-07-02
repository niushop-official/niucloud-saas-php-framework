import { defineComponent as x, ref as S, computed as I, resolveComponent as r, openBlock as u, createBlock as m, normalizeClass as y, unref as n, withCtx as a, createVNode as i, createElementBlock as b, Fragment as k, renderList as w, pushScopeId as C, popScopeId as E, createElementVNode as B } from "vue";
import { useRoute as N, useRouter as R } from "vue-router";
import { cm as T, u as V, _ as q } from "./core-shared-ae4a556b.js";
import z from "./menu-item-5129d607.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const A = (t) => (C("data-v-1936ac73"), t = t(), E(), t), F = /* @__PURE__ */ A(() => /* @__PURE__ */ B("div", { class: "h-[48px]" }, null, -1)), L = /* @__PURE__ */ x({
  __name: "side",
  setup(t) {
    const U = S("@/app/assets/images/login_logo.png"), c = T(), s = V(), p = N(), j = R(), D = s.siteInfo, f = I(() => String(p.name));
    return s.routers = s.routers.filter((e, h) => {
      if (e.name == "setting_manage")
        return e.children && e.children.forEach((o, d) => {
          o.meta.class = 1, o.children && o.children.forEach((l, _) => {
            l.meta.class = 2;
          });
        }), e.children;
    }), (e, h) => {
      const o = r("el-menu"), d = r("el-scrollbar"), l = r("el-main"), _ = r("el-container");
      return u(), m(_, {
        class: y(["w-100", [{ "sidebar-dark-mode": n(c).sidebar == "twoType" }, { "sidebar-brightness-mode": n(c).sidebar == "oneType" }]])
      }, {
        default: a(() => [
          i(l, { class: "menu-wrap" }, {
            default: a(() => [
              i(d, null, {
                default: a(() => [
                  i(o, {
                    "default-active": f.value,
                    router: !0,
                    class: "aside-menu h-full",
                    "unique-opened": !0,
                    collapse: n(c).menuIsCollapse
                  }, {
                    default: a(() => [
                      (u(!0), b(k, null, w(n(s).routers[0].children, (g, v) => (u(), m(z, {
                        routes: g,
                        key: v
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  F
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const X = /* @__PURE__ */ q(L, [["__scopeId", "data-v-1936ac73"]]);
export {
  X as default
};
