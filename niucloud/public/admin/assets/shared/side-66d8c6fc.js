import { defineComponent as x, ref as S, computed as y, resolveComponent as s, openBlock as u, createBlock as p, normalizeClass as I, unref as n, withCtx as a, createVNode as i, createElementBlock as b, Fragment as k, renderList as w, pushScopeId as C, popScopeId as E, createElementVNode as B } from "vue";
import { useRoute as N, useRouter as R } from "vue-router";
import { ck as T, u as V, _ as q } from "./core-shared-ca1fcae5.js";
import z from "./menu-item-a19693ae.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const A = (o) => (C("data-v-4e131e14"), o = o(), E(), o), F = /* @__PURE__ */ A(() => /* @__PURE__ */ B("div", { class: "h-[48px]" }, null, -1)), L = /* @__PURE__ */ x({
  __name: "side",
  setup(o) {
    S("@/app/assets/images/login_logo.png");
    const l = T(), r = V(), m = N();
    R(), r.siteInfo;
    const f = y(() => String(m.name));
    return r.routers = r.routers.filter((e, h) => {
      if (e.name == "setting_manage")
        return e.children && e.children.forEach((t, d) => {
          t.meta.class = 1, t.children && t.children.forEach((c, _) => {
            c.meta.class = 2;
          });
        }), e.children;
    }), (e, h) => {
      const t = s("el-menu"), d = s("el-scrollbar"), c = s("el-main"), _ = s("el-container");
      return u(), p(_, {
        class: I(["w-100", [{ "sidebar-dark-mode": n(l).sidebar == "twoType" }, { "sidebar-brightness-mode": n(l).sidebar == "oneType" }]])
      }, {
        default: a(() => [
          i(c, { class: "menu-wrap" }, {
            default: a(() => [
              i(d, null, {
                default: a(() => [
                  i(t, {
                    "default-active": f.value,
                    router: !0,
                    class: "aside-menu h-full",
                    "unique-opened": !0,
                    collapse: n(l).menuIsCollapse
                  }, {
                    default: a(() => [
                      (u(!0), b(k, null, w(n(r).routers[0].children, (g, v) => (u(), p(z, {
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
const P = /* @__PURE__ */ q(L, [["__scopeId", "data-v-4e131e14"]]);
export {
  P as default
};
