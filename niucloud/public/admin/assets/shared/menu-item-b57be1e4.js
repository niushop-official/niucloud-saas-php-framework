import { defineComponent as F, computed as k, ref as w, watch as z, onMounted as D, onUnmounted as G, resolveComponent as E, openBlock as a, createElementBlock as p, Fragment as x, createBlock as v, withCtx as g, createCommentVNode as f, createElementVNode as M, toDisplayString as b, renderList as H } from "vue";
import { useRouter as P, useRoute as Q } from "vue-router";
import { u as N, ck as T, s as _, gS as W, _ as X } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const Y = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, Z = { class: "ml-[10px]" }, ee = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, te = { class: "ml-[10px]" }, ne = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex items-center"
}, se = { class: "ml-[10px]" }, re = {
  key: 2,
  class: "!border-0 !border-t-[1px] border-solid mx-[25px] bg-[#f7f7f7] my-[5px]"
}, oe = /* @__PURE__ */ F({
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
    const R = P(), d = Q(), A = N(), j = N().routers, o = c;
    T();
    const i = k(() => o.routes.meta), C = w([]), K = w([]);
    k(() => {
      var t, s;
      const e = {};
      return (t = A.siteInfo) == null || t.apps.forEach((n) => {
        e[n.key] = n;
      }), (s = A.siteInfo) == null || s.site_addons.forEach((n) => {
        e[n.key] = n;
      }), e;
    });
    const B = k(() => {
      var e;
      return (e = A.siteInfo) == null ? void 0 : e.site_addons.map((t) => t.key);
    }), J = k(() => !o.routes.children || !Array.isArray(o.routes.children) ? !1 : o.routes.children.some((e) => {
      var t;
      return ((t = e.meta) == null ? void 0 : t.show) === 1;
    })), y = {};
    j.forEach((e) => {
      e.original_name = e.name, e.meta.addon && (y[e.meta.addon] = e), e.meta.attr && (y[e.meta.attr] = e);
    });
    const h = w(null), V = (e) => {
      const t = [], s = (n) => {
        n.forEach((r) => {
          r.name && t.push(r.name), r.children && Array.isArray(r.children) && s(r.children);
        });
      };
      return e.forEach((n) => {
        n.children && Array.isArray(n.children) && s(n.children);
      }), t;
    }, q = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, U = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((n) => {
          n.key && t.push(n.key);
        });
      }), t;
    }, S = () => {
      const e = _.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), s = _.get("activeAppKey");
        t.forEach((r) => {
          r.children && Array.isArray(r.children) && ((l) => {
            l.forEach((m) => {
              m && m.is_show !== void 0 && (m.is_show = m.menu_key === s ? 1 : 0);
            });
          })(r.children);
        });
        const n = t.filter((r) => r.children && r.children.length > 0);
        return W(n);
      }
      return [];
    }, I = (e) => {
      C.value.includes(e) || _.remove("activeAppKey"), K.value.includes(e) && (e = "addon_list");
      const s = d.name === e ? { refresh: Date.now() } : {};
      R.push({ name: e, query: s });
    };
    return z(d, () => {
      var n;
      const e = _.get("defaultAppList");
      if (o.routes.name == "addon_list") {
        const r = U(e);
        if (o.routes.children) {
          o.routes.children = o.routes.children.filter((l) => !l.name || !r.includes(l.name));
          const u = S();
          if (u.length) {
            const l = [...o.routes.children || []];
            u.forEach((m) => {
              const L = l.findIndex(($) => $.name === m.name);
              L !== -1 ? l[L] = m : l.push(m);
            }), o.routes.children = l;
          }
        }
        B.value.includes(d.meta.addon) && y[d.meta.addon] ? h.value = y[d.meta.addon] : d.meta.attr && y[d.meta.attr] ? h.value = y[d.meta.attr] : h.value = null;
      }
      const t = _.get("defaultMarketingKeys"), s = (n = d.matched[1]) == null ? void 0 : n.name;
      o.routes.name == "marketing_list" && (t && t.includes(s) ? (h.value = d.matched[1] ?? [], h.value.meta.show = 1) : h.value = null);
    }, { immediate: !0 }), D(() => {
      const e = S();
      C.value = V(e), K.value = q(e);
      const t = (s) => {
        if (s.key === "activeAppKey" && o.routes.name == "addon_list") {
          const n = S();
          if (n.length && o.routes.children) {
            const r = [...o.routes.children || []];
            n.forEach((u) => {
              const l = r.findIndex((m) => m.name === u.name);
              l !== -1 ? r[l] = u : r.push(u);
            }), o.routes.children = r;
          }
        }
      };
      window.addEventListener("storage", t), G(() => {
        window.removeEventListener("storage", t);
      });
    }), (e, t) => {
      const s = E("icon"), n = E("el-sub-menu"), r = E("el-menu-item");
      return i.value.show ? (a(), p(x, { key: 0 }, [
        J.value ? (a(), v(n, {
          key: 0,
          index: String(c.routes.name)
        }, {
          title: g(() => [
            o.level == 1 ? (a(), p("div", Y, [
              i.value.icon ? (a(), v(s, {
                key: 0,
                name: i.value.icon,
                class: "absolute !w-auto"
              }, null, 8, ["name"])) : f("", !0)
            ])) : f("", !0),
            M("span", Z, b(i.value.title), 1)
          ]),
          default: g(() => [
            (a(!0), p(x, null, H(c.routes.children, (u, l) => (a(), v(O, {
              routes: u,
              key: l,
              level: o.level + 1
            }, null, 8, ["routes", "level"]))), 128)),
            c.routes.name == "addon_list" || c.routes.name == "marketing_list" ? (a(), p(x, { key: 0 }, [
              h.value ? (a(), v(O, {
                routes: h.value,
                key: e.index,
                level: o.level + 1
              }, null, 8, ["routes", "level"])) : f("", !0)
            ], 64)) : f("", !0)
          ]),
          _: 1
        }, 8, ["index"])) : (a(), p(x, { key: 1 }, [
          i.value.addon && i.value.parent_route && i.value.parent_route.addon == "" ? (a(), v(r, {
            key: 0,
            index: String(c.routes.name),
            onClick: t[0] || (t[0] = (u) => I(c.routes.name))
          }, {
            title: g(() => [
              o.level == 1 ? (a(), p("div", ee, [
                i.value.icon ? (a(), v(s, {
                  key: 0,
                  name: i.value.icon,
                  class: "absolute !w-auto"
                }, null, 8, ["name"])) : f("", !0)
              ])) : f("", !0),
              M("span", te, b(i.value.title), 1)
            ]),
            _: 1
          }, 8, ["index"])) : (a(), v(r, {
            key: 1,
            index: String(c.routes.name),
            onClick: t[1] || (t[1] = (u) => I(c.routes.name))
          }, {
            title: g(() => [
              o.level == 1 ? (a(), p("div", ne, [
                i.value.icon ? (a(), v(s, {
                  key: 0,
                  name: i.value.icon,
                  class: "absolute !w-auto"
                }, null, 8, ["name"])) : f("", !0)
              ])) : f("", !0),
              M("span", se, b(i.value.title), 1)
            ]),
            _: 1
          }, 8, ["index"]))
        ], 64)),
        c.routes.is_border ? (a(), p("div", re)) : f("", !0)
      ], 64)) : f("", !0);
    };
  }
});
const O = /* @__PURE__ */ X(oe, [["__scopeId", "data-v-70a05578"]]);
export {
  O as default
};
