import { defineComponent as G, computed as _, ref as M, watch as H, onMounted as P, onUnmounted as Q, resolveComponent as E, unref as c, openBlock as l, createElementBlock as h, Fragment as g, createBlock as x, withCtx as S, createVNode as I, createCommentVNode as v, createElementVNode as C, toDisplayString as K, renderList as T, pushScopeId as fe, popScopeId as pe } from "vue";
import { useRouter as W, useRoute as X } from "vue-router";
import { h as R, u as Y, hC as Z, m as k, hJ as ee, a as te } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ne = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, se = { class: "ml-[10px]" }, re = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, oe = { class: "ml-[10px]" }, ae = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, le = { class: "ml-[10px]" }, ie = {
  key: 2,
  class: "!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"
}, ce = /* @__PURE__ */ G({
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
    const o = u, j = W(), d = X(), A = R(), B = R().routers, ue = Y(), f = _(() => o.routes.meta), w = _(() => {
      var e;
      return Z((e = f.value) == null ? void 0 : e.icon);
    }), L = M([]), N = M([]), de = _(() => {
      var t, s;
      const e = {};
      return (t = A.siteInfo) == null || t.apps.forEach((n) => {
        e[n.key] = n;
      }), (s = A.siteInfo) == null || s.site_addons.forEach((n) => {
        e[n.key] = n;
      }), e;
    }), q = _(() => {
      var e;
      return (e = A.siteInfo) == null ? void 0 : e.site_addons.map((t) => t.key);
    }), U = _(() => !o.routes.children || !Array.isArray(o.routes.children) ? !1 : o.routes.children.some((e) => {
      var t;
      return ((t = e.meta) == null ? void 0 : t.show) === 1;
    })), y = {};
    B.forEach((e) => {
      e.original_name = e.name, e.meta.addon && (y[e.meta.addon] = e), e.meta.attr && (y[e.meta.attr] = e);
    });
    const p = M(null), $ = (e) => {
      const t = [], s = (n) => {
        n.forEach((r) => {
          r.name && t.push(r.name), r.children && Array.isArray(r.children) && s(r.children);
        });
      };
      return e.forEach((n) => {
        n.children && Array.isArray(n.children) && s(n.children);
      }), t;
    }, F = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, z = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((n) => {
          n.key && t.push(n.key);
        });
      }), t;
    }, b = () => {
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
        return ee(n);
      }
      return [];
    }, J = (e) => {
      L.value.includes(e) || k.remove("activeAppKey"), N.value.includes(e) && (e = "addon_list");
      const s = d.name === e ? { refresh: Date.now() } : {};
      j.push({ name: e, query: s });
    };
    return H(d, () => {
      var n;
      const e = k.get("defaultAppList");
      if (o.routes.name == "addon_list") {
        const r = z(e);
        if (o.routes.children) {
          o.routes.children = o.routes.children.filter((a) => !a.name || !r.includes(a.name));
          const i = b();
          if (i.length) {
            const a = [...o.routes.children || []];
            i.forEach((m) => {
              const O = a.findIndex((D) => D.name === m.name);
              O !== -1 ? a[O] = m : a.push(m);
            }), o.routes.children = a;
          }
        }
        q.value.includes(d.meta.addon) && y[d.meta.addon] ? p.value = y[d.meta.addon] : d.meta.attr && y[d.meta.attr] ? p.value = y[d.meta.attr] : p.value = null;
      }
      const t = k.get("defaultMarketingKeys"), s = (n = d.matched[1]) == null ? void 0 : n.name;
      o.routes.name == "marketing_list" && (t && t.includes(s) ? (p.value = d.matched[1] ?? [], p.value.meta.show = 1) : p.value = null);
    }, { immediate: !0 }), P(() => {
      const e = b();
      L.value = $(e), N.value = F(e);
      const t = (s) => {
        if (s.key === "activeAppKey" && o.routes.name == "addon_list") {
          const n = b();
          if (n.length && o.routes.children) {
            const r = [...o.routes.children || []];
            n.forEach((i) => {
              const a = r.findIndex((m) => m.name === i.name);
              a !== -1 ? r[a] = i : r.push(i);
            }), o.routes.children = r;
          }
        }
      };
      window.addEventListener("storage", t), Q(() => {
        window.removeEventListener("storage", t);
      });
    }), (e, t) => {
      const s = E("icon"), n = E("el-sub-menu"), r = E("el-menu-item");
      return c(f).show ? (l(), h(g, { key: 0 }, [
        c(U) ? (l(), x(n, {
          key: 0,
          index: String(u.routes.name)
        }, {
          title: S(() => [
            o.level == 1 ? (l(), h("div", ne, [
              I(s, {
                name: c(w),
                class: "absolute !w-auto"
              }, null, 8, ["name"])
            ])) : v("", !0),
            C("span", se, K(c(f).title), 1)
          ]),
          default: S(() => [
            (l(!0), h(g, null, T(u.routes.children, (i, a) => (l(), x(V, {
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
            onClick: t[0] || (t[0] = (i) => J(u.routes.name))
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
            _: 1
          }, 8, ["index"])) : (l(), x(r, {
            key: 1,
            index: String(u.routes.name),
            onClick: t[1] || (t[1] = (i) => J(u.routes.name))
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
          }, 8, ["index"]))
        ], 64)),
        u.routes.is_border ? (l(), h("div", ie)) : v("", !0)
      ], 64)) : v("", !0);
    };
  }
});
const V = /* @__PURE__ */ te(ce, [["__scopeId", "data-v-7f8d27b8"]]);
export {
  V as default
};
