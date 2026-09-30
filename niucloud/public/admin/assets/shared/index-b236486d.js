import { defineComponent as Q, computed as _, ref as v, watch as T, resolveComponent as g, openBlock as i, createElementBlock as p, normalizeClass as b, unref as d, createElementVNode as y, createVNode as C, withCtx as N, Fragment as M, renderList as F, createBlock as E, toDisplayString as $, createCommentVNode as L } from "vue";
import { useRoute as q, useRouter as G } from "vue-router";
import { h as H, u as P, cA as K, aQ as W, hC as X, m as O, hJ as Y, n as Z } from "./core-shared-c6ad4e77.js";
import I from "./menu-item-0942064b.js";
import { g as ee } from "./module-f32436cf.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ne = { class: "one-menu__list" }, te = ["title", "onClick"], re = { class: "one-menu__icon" }, se = { class: "one-menu__label" }, ae = {
  key: 0,
  class: "two-menu flex flex-col"
}, xe = /* @__PURE__ */ Q({
  __name: "index",
  setup(oe) {
    const s = q(), k = H(), B = k.routers, V = P(), r = k.siteInfo, z = G(), f = {}, J = k.addonIndexRoute, j = _(() => V.dark), l = v([]), h = v([]);
    if (B.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = K(e.children)), h.value.push(e)) : e.meta.addon != "" && (r == null ? void 0 : r.apps.length) <= 1 && (r == null ? void 0 : r.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((n) => {
        n.original_name = n.name, n.children && n.children.length && (n.name = K(n.children));
      }), h.value.unshift(...e.children)) : h.value.unshift(e) : f[e.meta.addon] = e;
    }), (r == null ? void 0 : r.apps.length) > 1) {
      const e = [];
      r == null || r.apps.forEach((n) => {
        f[n.key] && (f[n.key].name = J[n.key], e.push(f[n.key]));
      }), h.value.unshift(...e);
    }
    const m = v(s.matched[1].name), U = _(() => s.matched.map((e) => e.name).filter(Boolean)), w = (e) => m.value && m.value === e.original_name ? !0 : [e.original_name, e.name].some((n) => !!n && U.value.includes(n)), le = _(() => {
      var n, t;
      const e = h.value.find((o) => w(o));
      return ((n = e == null ? void 0 : e.meta) == null ? void 0 : n.title) || ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.short_title) || "";
    }), ce = (e) => {
      if (!e || typeof e != "object")
        return [];
      const n = [];
      return Object.values(e).forEach((t) => {
        Array.isArray(t.list) && t.list.forEach((o) => {
          o.key && n.push(o.key);
        });
      }), n;
    }, ie = () => {
      const e = O.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const n = JSON.parse(JSON.stringify(e)), t = O.get("activeAppKey");
        n.forEach((c) => {
          c.children && Array.isArray(c.children) && ((a) => {
            a.forEach((u) => {
              u && u.is_show !== void 0 && (u.is_show = u.menu_key === t ? 1 : 0);
            });
          })(c.children);
        });
        const o = n.filter((c) => c.children && c.children.length > 0);
        return Y(o);
      }
      return [];
    };
    T(s, () => {
      var e, n;
      if (s.meta.attr != "")
        m.value = s.matched[1].name, l.value = s.matched[1].children ?? [];
      else if ((r == null ? void 0 : r.apps.length) > 1)
        l.value = s.matched[2].children, m.value = s.matched[2].name;
      else {
        const t = s.matched[2];
        t.meta.addon == "" ? (m.value = s.matched[2].name, l.value = s.matched[2].children ?? []) : t.meta.addon == (r == null ? void 0 : r.apps[0].key) ? (m.value = s.matched[3].name, l.value = s.matched[3].children ?? []) : (m.value = s.matched[2].name, l.value = s.matched[2].children ?? []);
      }
      if (!((e = l.value) != null && e.length)) {
        const t = h.value.find((o) => w(o));
        l.value = (n = t == null ? void 0 : t.children) != null && n.length ? t.children : [];
      }
    }, { immediate: !0 });
    const x = v([]), D = _(() => {
      if (!S.value || S.value.version_no === A.value)
        return !1;
      const e = String(A.value), n = String(S.value.version_no), t = parseInt(e.replace(/\./g, ""), 10);
      return parseInt(n.replace(/\./g, ""), 10) > t;
    });
    (() => {
      ee().then(({ data: e }) => {
        x.value = e;
      }).catch(() => {
      });
    })();
    const S = _(() => x.value.length ? x.value[0] : null), A = v("");
    return (() => {
      Z().then((e) => {
        A.value = e.data.version.version;
      });
    })(), (e, n) => {
      const t = g("el-image"), o = g("icon"), c = g("el-scrollbar"), R = g("el-menu");
      return i(), p("aside", {
        class: b(["lightside-aside flex h-full box-border", { "is-bright": !d(j) }])
      }, [
        y("div", {
          class: b(["one-menu flex flex-col box-border overflow-hidden", { "is-expanded": d(V).menuIsCollapse }])
        }, [
          C(c, { class: "one-menu__scrollbar" }, {
            default: N(() => [
              y("div", ne, [
                (i(!0), p(M, null, F(h.value, (a, u) => (i(), p(M, { key: u }, [
                  a.meta.show ? (i(), p("div", {
                    key: 0,
                    title: a.meta.title || a.meta.short_title,
                    class: b(["one-menu__item", {
                      "is-active": w(a),
                      "is-expanded": d(V).menuIsCollapse
                    }]),
                    onClick: (he) => d(z).push({ name: a.name })
                  }, [
                    y("div", re, [
                      a.meta.icon && d(W)(a.meta.icon) ? (i(), E(t, {
                        key: 0,
                        class: "one-menu__icon-image",
                        src: a.meta.icon,
                        fit: "contain"
                      }, null, 8, ["src"])) : (i(), E(o, {
                        key: 1,
                        name: d(X)(a.meta.icon),
                        size: "var(--cmp-lightside-primary-icon-size)"
                      }, null, 8, ["name"]))
                    ]),
                    y("div", se, $(a.meta.short_title || a.meta.title), 1)
                  ], 10, te)) : L("", !0)
                ], 64))), 128))
              ])
            ]),
            _: 1
          })
        ], 2),
        l.value.length ? (i(), p("div", ae, [
          C(c, { class: "two-menu__scrollbar" }, {
            default: N(() => [
              C(R, {
                "default-active": d(s).name,
                router: !0,
                class: "aside-menu"
              }, {
                default: N(() => [
                  (i(!0), p(M, null, F(l.value, (a, u) => (i(), E(I, {
                    routes: a,
                    key: u,
                    isNewVersion: d(D)
                  }, null, 8, ["routes", "isNewVersion"]))), 128))
                ]),
                _: 1
              }, 8, ["default-active"])
            ]),
            _: 1
          })
        ])) : L("", !0)
      ], 2);
    };
  }
});
export {
  xe as default
};
