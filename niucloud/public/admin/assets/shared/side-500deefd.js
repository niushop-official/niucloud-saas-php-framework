import { defineComponent as B, ref as r, onMounted as J, watch as V, resolveComponent as m, openBlock as f, createBlock as y, withCtx as h, createVNode as L, unref as x, createElementBlock as F, Fragment as R, renderList as z, createCommentVNode as U, pushScopeId as W, popScopeId as q, createElementVNode as D } from "vue";
import { useRoute as G } from "vue-router";
import H from "./menu-item-c87d4c02.js";
import { hz as P, u as Q, h as T, m as u, hJ as X, k as Y, hK as Z, a as $ } from "./core-shared-c6ad4e77.js";
import { c as ee } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const te = (p) => (W("data-v-3043f0df"), p = p(), q(), p), ae = /* @__PURE__ */ te(() => /* @__PURE__ */ D("div", { class: "h-[48px]" }, null, -1)), se = /* @__PURE__ */ B({
  __name: "side",
  setup(p) {
    const o = G(), { menuActive: N } = P(), E = Q(), i = T().siteInfo, A = r(null), n = r([]), c = r(o.matched[1].name), K = async () => {
      const e = await Y();
      A.value = e.data, u.set({ key: "defaultAppList", data: A.value });
    }, S = r([]), C = async () => {
      const e = await Z();
      S.value = e.data.list, u.set({ key: "specialAppList", data: S.value });
    }, M = r([]), g = r([]);
    J(() => {
      K(), C();
      const e = k();
      M.value = O(e), g.value = j(e), u.set({ key: "specialMenuNames", data: M.value }), u.set({ key: "specialMenuNamesLevel1", data: g.value });
    });
    const v = r([]), I = () => {
      if (v.value = [], c.value !== "active" && c.value !== "addon" && n.value && Object.values(n.value).length) {
        const e = ee(n.value);
        for (const a in e)
          v.value.push(e[a].name);
      }
    }, b = (e) => {
      if (!e || typeof e != "object")
        return [];
      const a = [];
      return Object.values(e).forEach((t) => {
        Array.isArray(t.list) && t.list.forEach((l) => {
          l.key && a.push(l.key);
        });
      }), a;
    }, k = () => {
      const e = u.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const a = JSON.parse(JSON.stringify(e)), t = u.get("activeAppKey");
        a.forEach((s) => {
          s.children && Array.isArray(s.children) && ((_) => {
            _.forEach((d) => {
              d && d.is_show !== void 0 && (d.is_show = d.menu_key === t ? 1 : 0);
            });
          })(s.children);
        });
        const l = a.filter((s) => s.children && s.children.length > 0);
        return X(l);
      }
      return [];
    };
    V(o, () => {
      if (o.meta.attr != "")
        c.value = o.matched[1].name, n.value = o.matched[1].children ?? [];
      else if ((i == null ? void 0 : i.apps.length) > 1)
        n.value = o.matched[2].children, c.value = o.matched[2].name;
      else {
        const t = o.matched[2];
        t.meta.addon == "" ? (c.value = o.matched[2].name, n.value = o.matched[2].children ?? []) : t.meta.addon == (i == null ? void 0 : i.apps[0].key) ? (c.value = o.matched[3].name, n.value = o.matched[3].children ?? []) : (c.value = o.matched[2].name, n.value = o.matched[2].children ?? []);
      }
      I();
      const e = u.get("defaultAppList"), a = b(e);
      if (n.value = n.value.filter((t) => !t.name || !a.includes(t.name)), c.value == "addon") {
        const t = k();
        if (t.length) {
          const l = n.value.findIndex(
            (s) => s.name === "addon_list"
          );
          l !== -1 ? n.value.splice(
            l + 1,
            0,
            ...t
          ) : n.value.push(...t);
        }
      }
    }, { immediate: !0 });
    const O = (e) => {
      const a = [], t = (l) => {
        l.forEach((s) => {
          s.name && a.push(s.name), s.children && Array.isArray(s.children) && t(s.children);
        });
      };
      return e.forEach((l) => {
        l.children && Array.isArray(l.children) && t(l.children);
      }), a;
    }, j = (e) => {
      const a = [];
      return e.forEach((t) => {
        t.name && a.push(t.name);
      }), a;
    };
    return (e, a) => {
      const t = m("el-menu"), l = m("el-scrollbar"), s = m("el-main"), w = m("el-container");
      return f(), y(w, { class: "w-100 h-[100%]" }, {
        default: h(() => [
          L(s, { class: "p-0 flex" }, {
            default: h(() => [
              n.value.length ? (f(), y(l, {
                key: 0,
                class: "two-menu w-[200px]"
              }, {
                default: h(() => [
                  L(t, {
                    class: "aside-menu",
                    "default-active": x(N),
                    "default-openeds": v.value,
                    router: !1,
                    collapse: x(E).menuIsCollapse
                  }, {
                    default: h(() => [
                      (f(!0), F(R, null, z(n.value, (_, d) => (f(), y(H, {
                        routes: _,
                        key: d
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "default-openeds", "collapse"]),
                  ae
                ]),
                _: 1
              })) : U("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const he = /* @__PURE__ */ $(se, [["__scopeId", "data-v-3043f0df"]]);
export {
  he as default
};
