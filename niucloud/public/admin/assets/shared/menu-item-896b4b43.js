import { defineComponent as Z, computed as p, ref as N, watch as ee, onMounted as ne, onUnmounted as se, resolveComponent as R, unref as s, openBlock as l, createElementBlock as u, Fragment as g, createElementVNode as S, toDisplayString as w, renderList as D, createBlock as _, createCommentVNode as m, normalizeClass as O, withCtx as M, createVNode as V } from "vue";
import { useRouter as te, useRoute as oe } from "vue-router";
import { h as F, u as re, hC as ae, hA as le, m as A, hJ as ie } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ue = {
  key: 0,
  class: "aside-menu-group"
}, ce = { class: "aside-menu-group-title" }, de = /* @__PURE__ */ S("div", { class: "aside-menu-group-divider" }, null, -1), me = {
  key: 0,
  class: "aside-menu-icon-wrap"
}, he = {
  key: 1,
  class: "aside-menu-dot"
}, ve = { class: "aside-menu-label" }, fe = {
  key: 0,
  class: "aside-menu-icon-wrap"
}, ye = {
  key: 1,
  class: "aside-menu-dot"
}, pe = { class: "aside-menu-label" }, _e = {
  key: 0,
  class: "aside-menu-icon-wrap"
}, ke = {
  key: 1,
  class: "aside-menu-dot"
}, ge = { class: "aside-menu-label" }, Ae = {
  key: 3,
  class: "menu-section-divider"
}, E = /* @__PURE__ */ Z({
  __name: "menu-item",
  props: {
    routes: {
      type: Object,
      required: !0
    },
    level: {
      type: Number,
      default: 1
    }
  },
  setup(c) {
    const t = c, G = te(), h = oe(), x = F(), H = F().routers, Se = re(), v = p(() => t.routes.meta), C = p(() => {
      var e;
      return ae((e = v.value) == null ? void 0 : e.icon);
    }), { handleMenuJump: P } = le(), j = N([]), B = N([]), we = p(() => {
      var n, r;
      const e = {};
      return (n = x.siteInfo) == null || n.apps.forEach((o) => {
        e[o.key] = o;
      }), (r = x.siteInfo) == null || r.site_addons.forEach((o) => {
        e[o.key] = o;
      }), e;
    }), Q = p(() => {
      var e;
      return (e = x.siteInfo) == null ? void 0 : e.site_addons.map((n) => n.key);
    }), K = p(() => !t.routes.children || !Array.isArray(t.routes.children) ? !1 : t.routes.children.some((e) => {
      var n;
      return ((n = e.meta) == null ? void 0 : n.show) === 1;
    })), q = p(() => t.level === 1 && K.value), b = p(() => t.level === 2 || t.level === 1 && !K.value), I = p(() => t.level >= 4), z = p(() => "16px"), L = p(() => t.level <= 2 ? "aside-menu-lv2" : t.level === 3 ? "aside-menu-lv3" : "aside-menu-lv4"), k = {};
    H.forEach((e) => {
      e.original_name = e.name, e.meta.addon && (k[e.meta.addon] = e), e.meta.attr && (k[e.meta.attr] = e);
    });
    const f = N(null), T = (e) => {
      const n = [], r = (o) => {
        o.forEach((a) => {
          a.name && n.push(a.name), a.children && Array.isArray(a.children) && r(a.children);
        });
      };
      return e.forEach((o) => {
        o.children && Array.isArray(o.children) && r(o.children);
      }), n;
    }, W = (e) => {
      const n = [];
      return e.forEach((r) => {
        r.name && n.push(r.name);
      }), n;
    }, X = (e) => {
      if (!e || typeof e != "object")
        return [];
      const n = [];
      return Object.values(e).forEach((r) => {
        Array.isArray(r.list) && r.list.forEach((o) => {
          o.key && n.push(o.key);
        });
      }), n;
    }, J = () => {
      const e = A.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const n = JSON.parse(JSON.stringify(e)), r = A.get("activeAppKey");
        n.forEach((a) => {
          a.children && Array.isArray(a.children) && ((i) => {
            i.forEach((y) => {
              y && y.is_show !== void 0 && (y.is_show = y.menu_key === r ? 1 : 0);
            });
          })(a.children);
        });
        const o = n.filter((a) => a.children && a.children.length > 0);
        return ie(o);
      }
      return [];
    }, U = (e) => {
      if (j.value.includes(e) || A.remove("activeAppKey"), B.value.includes(e) && (e = "addon_list"), P(e, v.value))
        return;
      const r = h.name === e ? { refresh: Date.now() } : {};
      G.push({ name: e, query: r });
    };
    return ee(h, () => {
      var o;
      const e = A.get("defaultAppList");
      if (t.routes.name == "addon_list") {
        const a = X(e);
        if (t.routes.children) {
          t.routes.children = t.routes.children.filter((i) => !i.name || !a.includes(i.name));
          const d = J();
          if (d.length) {
            const i = [...t.routes.children || []];
            d.forEach((y) => {
              const $ = i.findIndex((Y) => Y.name === y.name);
              $ !== -1 ? i[$] = y : i.push(y);
            }), t.routes.children = i;
          }
        }
        Q.value.includes(h.meta.addon) && k[h.meta.addon] ? f.value = k[h.meta.addon] : h.meta.attr && k[h.meta.attr] ? f.value = k[h.meta.attr] : f.value = null;
      }
      const n = A.get("defaultMarketingKeys"), r = (o = h.matched[1]) == null ? void 0 : o.name;
      t.routes.name == "marketing_list" && (n && n.includes(r) ? (f.value = h.matched[1] ?? [], f.value.meta.show = 1) : f.value = null);
    }, { immediate: !0 }), ne(() => {
      const e = J();
      j.value = T(e), B.value = W(e);
      const n = (r) => {
        if (r.key === "activeAppKey" && t.routes.name == "addon_list") {
          const o = J();
          if (o.length && t.routes.children) {
            const a = [...t.routes.children || []];
            o.forEach((d) => {
              const i = a.findIndex((y) => y.name === d.name);
              i !== -1 ? a[i] = d : a.push(d);
            }), t.routes.children = a;
          }
        }
      };
      window.addEventListener("storage", n), se(() => {
        window.removeEventListener("storage", n);
      });
    }), (e, n) => {
      const r = R("icon"), o = R("el-sub-menu"), a = R("el-menu-item");
      return s(v).show ? (l(), u(g, { key: 0 }, [
        s(q) ? (l(), u("div", ue, [
          S("div", ce, w(s(v).title), 1),
          (l(!0), u(g, null, D(c.routes.children, (d, i) => (l(), _(E, {
            routes: d,
            key: i,
            level: t.level + 1
          }, null, 8, ["routes", "level"]))), 128)),
          c.routes.name == "addon_list" || c.routes.name == "marketing_list" ? (l(), u(g, { key: 0 }, [
            f.value ? (l(), _(E, {
              routes: f.value,
              key: e.index,
              level: t.level + 1
            }, null, 8, ["routes", "level"])) : m("", !0)
          ], 64)) : m("", !0),
          de
        ])) : s(K) ? (l(), _(o, {
          key: 1,
          index: String(c.routes.name),
          class: O(s(L))
        }, {
          title: M(() => [
            s(b) ? (l(), u("div", me, [
              V(r, {
                name: s(C),
                size: s(z),
                class: "aside-menu-icon"
              }, null, 8, ["name", "size"])
            ])) : m("", !0),
            s(I) ? (l(), u("span", he)) : m("", !0),
            S("span", ve, w(s(v).title), 1)
          ]),
          default: M(() => [
            (l(!0), u(g, null, D(c.routes.children, (d, i) => (l(), _(E, {
              routes: d,
              key: i,
              level: t.level + 1
            }, null, 8, ["routes", "level"]))), 128)),
            c.routes.name == "addon_list" || c.routes.name == "marketing_list" ? (l(), u(g, { key: 0 }, [
              f.value ? (l(), _(E, {
                routes: f.value,
                key: e.index,
                level: t.level + 1
              }, null, 8, ["routes", "level"])) : m("", !0)
            ], 64)) : m("", !0)
          ]),
          _: 1
        }, 8, ["index", "class"])) : (l(), u(g, { key: 2 }, [
          s(v).addon && s(v).parent_route && s(v).parent_route.addon == "" ? (l(), _(a, {
            key: 0,
            class: O(s(L)),
            index: String(c.routes.name),
            onClick: n[0] || (n[0] = (d) => U(c.routes.name))
          }, {
            title: M(() => [
              s(b) ? (l(), u("div", fe, [
                V(r, {
                  name: s(C),
                  size: s(z),
                  class: "aside-menu-icon"
                }, null, 8, ["name", "size"])
              ])) : m("", !0),
              s(I) ? (l(), u("span", ye)) : m("", !0),
              S("span", pe, w(s(v).title), 1)
            ]),
            _: 1
          }, 8, ["class", "index"])) : (l(), _(a, {
            key: 1,
            class: O(s(L)),
            index: String(c.routes.name),
            onClick: n[1] || (n[1] = (d) => U(c.routes.name))
          }, {
            title: M(() => [
              s(b) ? (l(), u("div", _e, [
                V(r, {
                  name: s(C),
                  size: s(z),
                  class: "aside-menu-icon"
                }, null, 8, ["name", "size"])
              ])) : m("", !0),
              s(I) ? (l(), u("span", ke)) : m("", !0),
              S("span", ge, w(s(v).title), 1)
            ]),
            _: 1
          }, 8, ["class", "index"]))
        ], 64)),
        c.routes.is_border && !s(q) ? (l(), u("div", Ae)) : m("", !0)
      ], 64)) : m("", !0);
    };
  }
});
export {
  E as default
};
