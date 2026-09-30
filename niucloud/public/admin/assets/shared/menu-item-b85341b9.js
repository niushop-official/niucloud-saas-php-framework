import { defineComponent as H, computed as _, ref as b, watch as P, onMounted as Q, onUnmounted as T, resolveComponent as E, unref as c, openBlock as l, createElementBlock as h, Fragment as g, createBlock as x, withCtx as S, createVNode as I, createCommentVNode as v, createElementVNode as C, toDisplayString as K, renderList as W, pushScopeId as he, popScopeId as ve } from "vue";
import { useRouter as X, useRoute as Y } from "vue-router";
import { h as R, u as Z, hC as ee, hA as te, m as k, hJ as ne, a as se } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const re = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, oe = { class: "ml-[10px]" }, ae = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, le = { class: "ml-[10px]" }, ie = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, ce = { class: "ml-[10px]" }, ue = {
  key: 2,
  class: "!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"
}, de = /* @__PURE__ */ H({
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
  setup(u) {
    const o = u, j = X(), d = Y(), A = R(), B = R().routers, me = Z(), f = _(() => o.routes.meta), w = _(() => {
      var e;
      return ee((e = f.value) == null ? void 0 : e.icon);
    }), { handleMenuJump: q } = te(), L = b([]), J = b([]), fe = _(() => {
      var t, s;
      const e = {};
      return (t = A.siteInfo) == null || t.apps.forEach((n) => {
        e[n.key] = n;
      }), (s = A.siteInfo) == null || s.site_addons.forEach((n) => {
        e[n.key] = n;
      }), e;
    }), U = _(() => {
      var e;
      return (e = A.siteInfo) == null ? void 0 : e.site_addons.map((t) => t.key);
    }), $ = _(() => !o.routes.children || !Array.isArray(o.routes.children) ? !1 : o.routes.children.some((e) => {
      var t;
      return ((t = e.meta) == null ? void 0 : t.show) === 1;
    })), y = {};
    B.forEach((e) => {
      e.original_name = e.name, e.meta.addon && (y[e.meta.addon] = e), e.meta.attr && (y[e.meta.attr] = e);
    });
    const p = b(null), F = (e) => {
      const t = [], s = (n) => {
        n.forEach((r) => {
          r.name && t.push(r.name), r.children && Array.isArray(r.children) && s(r.children);
        });
      };
      return e.forEach((n) => {
        n.children && Array.isArray(n.children) && s(n.children);
      }), t;
    }, z = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, D = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((n) => {
          n.key && t.push(n.key);
        });
      }), t;
    }, M = () => {
      const e = k.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), s = k.get("activeAppKey");
        t.forEach((r) => {
          r.children && Array.isArray(r.children) && ((a) => {
            a.forEach((m) => {
              m && m.is_show !== void 0 && (m.is_show = m.menu_key === s ? 1 : 0);
            });
          })(r.children);
        });
        const n = t.filter((r) => r.children && r.children.length > 0);
        return ne(n);
      }
      return [];
    }, N = (e) => {
      if (L.value.includes(e) || k.remove("activeAppKey"), J.value.includes(e) && (e = "addon_list"), q(e, f.value))
        return;
      const s = d.name === e ? { refresh: Date.now() } : {};
      j.push({ name: e, query: s });
    };
    return P(d, () => {
      var n;
      const e = k.get("defaultAppList");
      if (o.routes.name == "addon_list") {
        const r = D(e);
        if (o.routes.children) {
          o.routes.children = o.routes.children.filter((a) => !a.name || !r.includes(a.name));
          const i = M();
          if (i.length) {
            const a = [...o.routes.children || []];
            i.forEach((m) => {
              const O = a.findIndex((G) => G.name === m.name);
              O !== -1 ? a[O] = m : a.push(m);
            }), o.routes.children = a;
          }
        }
        U.value.includes(d.meta.addon) && y[d.meta.addon] ? p.value = y[d.meta.addon] : d.meta.attr && y[d.meta.attr] ? p.value = y[d.meta.attr] : p.value = null;
      }
      const t = k.get("defaultMarketingKeys"), s = (n = d.matched[1]) == null ? void 0 : n.name;
      o.routes.name == "marketing_list" && (t && t.includes(s) ? (p.value = d.matched[1] ?? [], p.value.meta.show = 1) : p.value = null);
    }, { immediate: !0 }), Q(() => {
      const e = M();
      L.value = F(e), J.value = z(e);
      const t = (s) => {
        if (s.key === "activeAppKey" && o.routes.name == "addon_list") {
          const n = M();
          if (n.length && o.routes.children) {
            const r = [...o.routes.children || []];
            n.forEach((i) => {
              const a = r.findIndex((m) => m.name === i.name);
              a !== -1 ? r[a] = i : r.push(i);
            }), o.routes.children = r;
          }
        }
      };
      window.addEventListener("storage", t), T(() => {
        window.removeEventListener("storage", t);
      });
    }), (e, t) => {
      const s = E("icon"), n = E("el-sub-menu"), r = E("el-menu-item");
      return c(f).show ? (l(), h(g, { key: 0 }, [
        c($) ? (l(), x(n, {
          key: 0,
          index: String(u.routes.name)
        }, {
          title: S(() => [
            o.level == 1 ? (l(), h("div", re, [
              I(s, {
                name: c(w),
                class: "absolute !w-auto"
              }, null, 8, ["name"])
            ])) : v("", !0),
            C("span", oe, K(c(f).title), 1)
          ]),
          default: S(() => [
            (l(!0), h(g, null, W(u.routes.children, (i, a) => (l(), x(V, {
              routes: i,
              key: a,
              level: o.level + 1
            }, null, 8, ["routes", "level"]))), 128)),
            u.routes.name == "addon_list" || u.routes.name == "marketing_list" ? (l(), h(g, { key: 0 }, [
              p.value ? (l(), x(V, {
                routes: p.value,
                key: e.index,
                level: o.level + 1
              }, null, 8, ["routes", "level"])) : v("", !0)
            ], 64)) : v("", !0)
          ]),
          _: 1
        }, 8, ["index"])) : (l(), h(g, { key: 1 }, [
          c(f).addon && c(f).parent_route && c(f).parent_route.addon == "" ? (l(), x(r, {
            key: 0,
            index: String(u.routes.name),
            onClick: t[0] || (t[0] = (i) => N(u.routes.name))
          }, {
            title: S(() => [
              o.level == 1 ? (l(), h("div", ae, [
                I(s, {
                  name: c(w),
                  class: "absolute !w-auto"
                }, null, 8, ["name"])
              ])) : v("", !0),
              C("span", le, K(c(f).title), 1)
            ]),
            _: 1
          }, 8, ["index"])) : (l(), x(r, {
            key: 1,
            index: String(u.routes.name),
            onClick: t[1] || (t[1] = (i) => N(u.routes.name))
          }, {
            title: S(() => [
              o.level == 1 ? (l(), h("div", ie, [
                I(s, {
                  name: c(w),
                  class: "absolute !w-auto"
                }, null, 8, ["name"])
              ])) : v("", !0),
              C("span", ce, K(c(f).title), 1)
            ]),
            _: 1
          }, 8, ["index"]))
        ], 64)),
        u.routes.is_border ? (l(), h("div", ue)) : v("", !0)
      ], 64)) : v("", !0);
    };
  }
});
const V = /* @__PURE__ */ se(de, [["__scopeId", "data-v-bf367454"]]);
export {
  V as default
};
