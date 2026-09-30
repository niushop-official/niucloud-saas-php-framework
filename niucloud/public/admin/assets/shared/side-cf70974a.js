import { defineComponent as x, ref as S, computed as I, resolveComponent as n, openBlock as i, createBlock as _, normalizeClass as y, unref as t, withCtx as a, createVNode as u, createElementBlock as b, Fragment as k, renderList as w, pushScopeId as C, popScopeId as E, createElementVNode as B } from "vue";
import { useRoute as N, useRouter as R } from "vue-router";
import { u as T, h as V, a as q } from "./core-shared-c6ad4e77.js";
import z from "./menu-item-e508e055.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const A = (s) => (C("data-v-4e131e14"), s = s(), E(), s), F = /* @__PURE__ */ A(() => /* @__PURE__ */ B("div", { class: "h-[48px]" }, null, -1)), L = /* @__PURE__ */ x({
  __name: "side",
  setup(s) {
    const U = S("@/app/assets/images/login_logo.png"), c = T(), r = V(), m = N(), j = R(), D = r.siteInfo, f = I(() => String(m.name));
    return r.routers = r.routers.filter((e, h) => {
      if (e.name == "setting_manage")
        return e.children && e.children.forEach((o, d) => {
          o.meta.class = 1, o.children && o.children.forEach((l, p) => {
            l.meta.class = 2;
          });
        }), e.children;
    }), (e, h) => {
      const o = n("el-menu"), d = n("el-scrollbar"), l = n("el-main"), p = n("el-container");
      return i(), _(p, {
        class: y(["w-100", [{ "sidebar-dark-mode": t(c).sidebar == "twoType" }, { "sidebar-brightness-mode": t(c).sidebar == "oneType" }]])
      }, {
        default: a(() => [
          u(l, { class: "menu-wrap" }, {
            default: a(() => [
              u(d, null, {
                default: a(() => [
                  u(o, {
                    "default-active": t(f),
                    router: !0,
                    class: "aside-menu h-full",
                    "unique-opened": !0,
                    collapse: t(c).menuIsCollapse
                  }, {
                    default: a(() => [
                      (i(!0), b(k, null, w(t(r).routers[0].children, (g, v) => (i(), _(z, {
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
const X = /* @__PURE__ */ q(L, [["__scopeId", "data-v-4e131e14"]]);
export {
  X as default
};
