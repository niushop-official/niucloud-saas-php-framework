import { defineComponent as U, computed as N, ref as v, watch as q, resolveComponent as g, openBlock as a, createElementBlock as c, normalizeClass as k, createElementVNode as _, unref as l, Fragment as w, renderList as F, normalizeStyle as W, createBlock as V, toDisplayString as I, createCommentVNode as M, createVNode as R, withCtx as L, pushScopeId as $, popScopeId as G } from "vue";
import { useRoute as H, useRouter as P } from "vue-router";
import { u as Q, cm as T, cq as z, aI as X, s as K, gW as Y, g as Z, _ as ee } from "./core-shared-9b1e55e9.js";
import te from "./menu-item-2d301937.js";
import { a as re } from "./module-f399f84a.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const se = (x) => ($("data-v-e24718b8"), x = x(), G(), x), ne = { class: "flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border overflow-hidden" }, oe = { class: "flex flex-col items-center" }, ae = ["title", "onClick"], le = {
  key: 0,
  class: "text-left text-[14px] mt-[3px] w-[75px] using-hidden ml-[10px]"
}, ce = {
  key: 1,
  class: "text-center text-[12px] using-hidden mt-1"
}, ie = {
  key: 0,
  class: "flex flex-col two-menu w-[185px]"
}, ue = /* @__PURE__ */ se(() => /* @__PURE__ */ _("div", { class: "h-[48px]" }, null, -1)), de = /* @__PURE__ */ U({
  __name: "index",
  setup(x) {
    const o = H(), S = Q(), j = S.routers, i = T(), r = S.siteInfo, B = P(), y = {}, D = S.addonIndexRoute, O = N(() => i.dark), p = v([]), m = v([]);
    if (j.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = z(e.children)), m.value.push(e)) : e.meta.addon != "" && (r == null ? void 0 : r.apps.length) <= 1 && (r == null ? void 0 : r.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = z(t.children));
      }), m.value.unshift(...e.children)) : m.value.unshift(e) : y[e.meta.addon] = e, m.value.sort((t, n) => t.meta.sort && n.meta.sort ? n.meta.sort - t.meta.sort : t.meta.sort ? -1 : n.meta.sort ? 1 : 0);
    }), (r == null ? void 0 : r.apps.length) > 1) {
      const e = [];
      r == null || r.apps.forEach((t) => {
        y[t.key] && (y[t.key].name = D[t.key], e.push(y[t.key]));
      }), m.value.unshift(...e), m.value.sort((t, n) => t.meta.sort && n.meta.sort ? n.meta.sort - t.meta.sort : t.meta.sort ? -1 : n.meta.sort ? 1 : 0);
    }
    const h = v(o.matched[1].name), pe = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((n) => {
        Array.isArray(n.list) && n.list.forEach((u) => {
          u.key && t.push(u.key);
        });
      }), t;
    }, me = () => {
      const e = K.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), n = K.get("activeAppKey");
        t.forEach((d) => {
          d.children && Array.isArray(d.children) && ((s) => {
            s.forEach((f) => {
              f && f.is_show !== void 0 && (f.is_show = f.menu_key === n ? 1 : 0);
            });
          })(d.children);
        });
        const u = t.filter((d) => d.children && d.children.length > 0);
        return Y(u);
      }
      return [];
    };
    q(o, () => {
      if (o.meta.attr != "")
        h.value = o.matched[1].name, p.value = o.matched[1].children ?? [];
      else if ((r == null ? void 0 : r.apps.length) > 1)
        p.value = o.matched[2].children, h.value = o.matched[2].name;
      else {
        const e = o.matched[2];
        e.meta.addon == "" ? (h.value = o.matched[2].name, p.value = o.matched[2].children ?? []) : e.meta.addon == (r == null ? void 0 : r.apps[0].key) ? (h.value = o.matched[3].name, p.value = o.matched[3].children ?? []) : (h.value = o.matched[2].name, p.value = o.matched[2].children ?? []);
      }
    }, { immediate: !0 });
    const C = v([]), J = N(() => {
      if (!b.value || b.value.version_no === A.value)
        return !1;
      const e = String(A.value), t = String(b.value.version_no), n = parseInt(e.replace(/\./g, ""), 10);
      return parseInt(t.replace(/\./g, ""), 10) > n;
    });
    (() => {
      re().then(({ data: e }) => {
        C.value = e;
      }).catch(() => {
      });
    })();
    const b = N(() => C.value.length ? C.value[0] : null), A = v("");
    return (() => {
      Z().then((e) => {
        A.value = e.data.version.version;
      });
    })(), (e, t) => {
      const n = g("el-image"), u = g("icon"), d = g("el-menu"), E = g("el-scrollbar");
      return a(), c("div", {
        class: k(["layout-aside ease-in duration-200 flex box-border", { bright: !O.value }])
      }, [
        _("div", ne, [
          _("div", {
            class: k(["w-[150px] one-menu hide-scrollbar", { expanded: l(i).menuIsCollapse }])
          }, [
            _("div", oe, [
              (a(!0), c(w, null, F(m.value, (s, f) => (a(), c(w, null, [
                s.meta.show ? (a(), c("div", {
                  key: 0,
                  title: l(i).menuIsCollapse ? s.meta.title : s.meta.short_title,
                  class: k(["menu-item my-[2px] p-2 flex w-full box-border cursor-pointer relative", { "is-active": h.value === s.original_name, "hover-left": l(i).menuIsCollapse, vertical: !l(i).menuIsCollapse, horizontal: l(i).menuIsCollapse }]),
                  style: W({ height: l(i).menuIsCollapse ? "40px" : "55px" }),
                  onClick: (ve) => l(B).push({ name: s.name })
                }, [
                  _("div", {
                    class: k(["w-[20px] h-[20px] flex items-center justify-center menu-icon", { "is-active": h.value === s.original_name }])
                  }, [
                    s.meta.icon ? (a(), c(w, { key: 0 }, [
                      l(X)(s.meta.icon) ? (a(), V(n, {
                        key: 0,
                        class: "w-[20px] h-[20px] overflow-hidden",
                        src: s.meta.icon,
                        fit: "fill"
                      }, null, 8, ["src"])) : (a(), V(u, {
                        key: 1,
                        name: s.meta.icon,
                        size: "20px",
                        color: "#1D1F3A"
                      }, null, 8, ["name"]))
                    ], 64)) : (a(), V(u, {
                      key: 1,
                      name: "iconfont iconshezhi1",
                      color: "#1D1F3A"
                    }))
                  ], 2),
                  l(i).menuIsCollapse ? (a(), c("div", le, I(s.meta.title || s.meta.short_title), 1)) : (a(), c("div", ce, I(s.meta.short_title || s.meta.title), 1))
                ], 14, ae)) : M("", !0)
              ], 64))), 256))
            ])
          ], 2)
        ]),
        p.value.length ? (a(), c("div", ie, [
          R(E, { class: "flex-1" }, {
            default: L(() => [
              R(d, {
                "default-active": l(o).name,
                router: !0,
                class: "aside-menu"
              }, {
                default: L(() => [
                  (a(!0), c(w, null, F(p.value, (s, f) => (a(), V(te, {
                    routes: s,
                    key: f,
                    isNewVersion: J.value
                  }, null, 8, ["routes", "isNewVersion"]))), 128))
                ]),
                _: 1
              }, 8, ["default-active"]),
              ue
            ]),
            _: 1
          })
        ])) : M("", !0)
      ], 2);
    };
  }
});
const Ae = /* @__PURE__ */ ee(de, [["__scopeId", "data-v-e24718b8"]]);
export {
  Ae as default
};
