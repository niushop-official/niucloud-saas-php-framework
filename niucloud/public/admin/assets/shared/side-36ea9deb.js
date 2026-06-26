import { defineComponent as j, ref as r, onMounted as B, watch as V, resolveComponent as m, openBlock as f, createBlock as y, withCtx as v, createVNode as L, unref as x, createElementBlock as F, Fragment as J, renderList as R, createCommentVNode as T, pushScopeId as U, popScopeId as W, createElementVNode as $ } from "vue";
import { useRoute as q } from "vue-router";
import { _ as z } from "./menu-item.vue_vue_type_script_setup_true_lang-11227f78.js";
import { ck as D, u as G, s as i, gS as H, a as P, gT as Q, _ as X } from "./core-shared-ca1fcae5.js";
import { c as Y } from "./cloneDeep-70d647ec.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./isArrayLike-62604998.js";
const Z = (p) => (U("data-v-779ffd65"), p = p(), W(), p), ee = /* @__PURE__ */ Z(() => /* @__PURE__ */ $("div", { class: "h-[48px]" }, null, -1)), te = /* @__PURE__ */ j({
  __name: "side",
  setup(p) {
    const n = q(), N = D(), u = G().siteInfo, S = r(null), o = r([]), c = r(n.matched[1].name), E = async () => {
      const e = await P();
      S.value = e.data, i.set({ key: "defaultAppList", data: S.value });
    }, A = r([]), C = async () => {
      const e = await Q();
      A.value = e.data.list, i.set({ key: "specialAppList", data: A.value });
    }, g = r([]), M = r([]);
    B(() => {
      E(), C();
      const e = k();
      g.value = I(e), M.value = O(e), i.set({ key: "specialMenuNames", data: g.value }), i.set({ key: "specialMenuNamesLevel1", data: M.value });
    });
    const _ = r([]), K = () => {
      if (_.value = [], c.value !== "active" && c.value !== "addon" && o.value && Object.values(o.value).length) {
        const e = Y(o.value);
        for (const a in e)
          _.value.push(e[a].name);
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
      const e = i.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const a = JSON.parse(JSON.stringify(e)), t = i.get("activeAppKey");
        a.forEach((s) => {
          s.children && Array.isArray(s.children) && ((h) => {
            h.forEach((d) => {
              d && d.is_show !== void 0 && (d.is_show = d.menu_key === t ? 1 : 0);
            });
          })(s.children);
        });
        const l = a.filter((s) => s.children && s.children.length > 0);
        return H(l);
      }
      return [];
    };
    V(n, () => {
      if (n.meta.attr != "")
        c.value = n.matched[1].name, o.value = n.matched[1].children ?? [];
      else if ((u == null ? void 0 : u.apps.length) > 1)
        o.value = n.matched[2].children, c.value = n.matched[2].name;
      else {
        const t = n.matched[2];
        t.meta.addon == "" ? (c.value = n.matched[2].name, o.value = n.matched[2].children ?? []) : t.meta.addon == (u == null ? void 0 : u.apps[0].key) ? (c.value = n.matched[3].name, o.value = n.matched[3].children ?? []) : (c.value = n.matched[2].name, o.value = n.matched[2].children ?? []);
      }
      K();
      const e = i.get("defaultAppList"), a = b(e);
      if (o.value = o.value.filter((t) => !t.name || !a.includes(t.name)), c.value == "addon") {
        const t = k();
        if (t.length) {
          const l = o.value.findIndex(
            (s) => s.name === "addon_list"
          );
          l !== -1 ? o.value.splice(
            l + 1,
            0,
            ...t
          ) : o.value.push(...t);
        }
      }
    }, { immediate: !0 });
    const I = (e) => {
      const a = [], t = (l) => {
        l.forEach((s) => {
          s.name && a.push(s.name), s.children && Array.isArray(s.children) && t(s.children);
        });
      };
      return e.forEach((l) => {
        l.children && Array.isArray(l.children) && t(l.children);
      }), a;
    }, O = (e) => {
      const a = [];
      return e.forEach((t) => {
        t.name && a.push(t.name);
      }), a;
    };
    return (e, a) => {
      const t = m("el-menu"), l = m("el-scrollbar"), s = m("el-main"), w = m("el-container");
      return f(), y(w, { class: "w-100 h-[100%]" }, {
        default: v(() => [
          L(s, { class: "p-0 flex" }, {
            default: v(() => [
              o.value.length ? (f(), y(l, {
                key: 0,
                class: "two-menu w-[200px]"
              }, {
                default: v(() => [
                  L(t, {
                    class: "aside-menu",
                    "default-active": x(n).name,
                    "default-openeds": _.value,
                    router: !0,
                    collapse: x(N).menuIsCollapse
                  }, {
                    default: v(() => [
                      (f(!0), F(J, null, R(o.value, (h, d) => (f(), y(z, {
                        routes: h,
                        key: d
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "default-openeds", "collapse"]),
                  ee
                ]),
                _: 1
              })) : T("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const fe = /* @__PURE__ */ X(te, [["__scopeId", "data-v-779ffd65"]]);
export {
  fe as default
};
