import { defineComponent as ee, ref as p, computed as te, onMounted as se, watch as ae, resolveComponent as m, openBlock as c, createBlock as g, withCtx as u, createVNode as k, createElementVNode as h, unref as y, createElementBlock as x, Fragment as j, renderList as B, toDisplayString as F, createCommentVNode as J, pushScopeId as ne, popScopeId as oe } from "vue";
import { _ as le } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as re, useRouter as ce } from "vue-router";
import { cm as ie, u as ue, cq as U, s as f, gW as de, i as pe, aI as he, a as me, gX as fe, _ as _e } from "./core-shared-ae4a556b.js";
import ve from "./menu-item-30d2251e.js";
import { c as ye } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const b = (S) => (ne("data-v-0b7ed489"), S = S(), oe(), S), xe = { class: "one-menu w-[124px] h-screen px-[8px] bg-[#1c2233]" }, ge = {
  key: 0,
  class: "logo flex items-center m-auto h-[64px]"
}, ke = /* @__PURE__ */ b(() => /* @__PURE__ */ h("div", { class: "flex justify-center items-center w-full h-[40px]" }, [
  /* @__PURE__ */ h("img", {
    class: "max-w-[40px]",
    src: le,
    alt: "",
    "object-fit": "contain"
  })
], -1)), we = {
  key: 1,
  class: "logo flex items-center justify-center h-[64px]"
}, Se = /* @__PURE__ */ b(() => /* @__PURE__ */ h("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), Ae = [
  Se
], Me = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex justify-center"
}, Le = {
  key: 1,
  class: "w-[16px] h-[16px]"
}, be = { class: "relative flex-1 w-0" }, Ee = { class: "ml-[10px] w-full truncate" }, Ce = /* @__PURE__ */ b(() => /* @__PURE__ */ h("div", { class: "h-[48px]" }, null, -1)), Ne = { class: "w-[152px] h-[64px] flex items-center justify-center text-[16px] border-b-[1px] border-solid border-[var(--el-border-color-lighter)]" }, je = /* @__PURE__ */ b(() => /* @__PURE__ */ h("div", { class: "h-[48px]" }, null, -1)), Ke = /* @__PURE__ */ ee({
  __name: "side",
  setup(S) {
    const n = re(), q = ce(), A = ie(), w = ue(), a = w.siteInfo, D = w.routers, W = w.addonIndexRoute, _ = p([]), l = p([]), M = {}, X = te(() => w.siteInfo.icon ? w.siteInfo.icon : A.website.icon);
    if (D.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = U(e.children)), _.value.push(e)) : e.meta.addon != "" && (a == null ? void 0 : a.apps.length) <= 1 && (a == null ? void 0 : a.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = U(t.children));
      }), _.value.unshift(...e.children)) : _.value.unshift(e) : M[e.meta.addon] = e, _.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }), (a == null ? void 0 : a.apps.length) > 1) {
      const e = [];
      a == null || a.apps.forEach((t) => {
        M[t.key] && (M[t.key].name = W[t.key], e.push(M[t.key]));
      }), _.value.unshift(...e), _.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }
    const K = p(null), Ie = p(null), d = p(n.matched[1].name), $ = async () => {
      const e = await me();
      K.value = e.data, f.set({ key: "defaultAppList", data: K.value });
    }, I = p([]), z = async () => {
      const e = await fe();
      I.value = e.data.list, f.set({ key: "specialAppList", data: I.value });
    }, E = p([]), R = p([]);
    se(() => {
      $(), z();
      const e = O();
      E.value = P(e), R.value = Q(e), f.set({ key: "specialMenuNames", data: E.value }), f.set({ key: "specialMenuNamesLevel1", data: R.value });
    });
    const C = p([]), G = () => {
      if (C.value = [], d.value !== "active" && d.value !== "addon" && l.value && Object.values(l.value).length) {
        const e = ye(l.value);
        for (const t in e)
          C.value.push(e[t].name);
      }
    }, H = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((r) => {
          r.key && t.push(r.key);
        });
      }), t;
    }, O = () => {
      const e = f.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), s = f.get("activeAppKey");
        t.forEach((o) => {
          o.children && Array.isArray(o.children) && ((L) => {
            L.forEach((v) => {
              v && v.is_show !== void 0 && (v.is_show = v.menu_key === s ? 1 : 0);
            });
          })(o.children);
        });
        const r = t.filter((o) => o.children && o.children.length > 0);
        return de(r);
      }
      return [];
    }, P = (e) => {
      const t = [], s = (r) => {
        r.forEach((o) => {
          o.name && t.push(o.name), o.children && Array.isArray(o.children) && s(o.children);
        });
      };
      return e.forEach((r) => {
        r.children && Array.isArray(r.children) && s(r.children);
      }), t;
    }, Q = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, T = (e) => {
      E.value.includes(e) || f.remove("activeAppKey"), q.push({ name: e });
    };
    return ae(n, () => {
      if (n.meta.attr != "")
        d.value = n.matched[1].name, l.value = n.matched[1].children ?? [];
      else if ((a == null ? void 0 : a.apps.length) > 1)
        l.value = n.matched[2].children, d.value = n.matched[2].name;
      else {
        const s = n.matched[2];
        s.meta.addon == "" ? (d.value = n.matched[2].name, l.value = n.matched[2].children ?? []) : s.meta.addon == (a == null ? void 0 : a.apps[0].key) ? (d.value = n.matched[3].name, l.value = n.matched[3].children ?? []) : (d.value = n.matched[2].name, l.value = n.matched[2].children ?? []);
      }
      G();
      const e = f.get("defaultAppList"), t = H(e);
      if (l.value = l.value.filter((s) => !s.name || !t.includes(s.name)), d.value == "addon") {
        const s = O();
        if (s.length) {
          const r = l.value.findIndex(
            (o) => o.name === "addon_list"
          );
          r !== -1 ? l.value.splice(
            r + 1,
            0,
            ...s
          ) : l.value.push(...s);
        }
      }
    }, { immediate: !0 }), (e, t) => {
      const s = m("el-image"), r = m("el-header"), o = m("icon"), V = m("el-menu-item"), L = m("el-menu"), v = m("el-scrollbar"), Y = m("el-main"), Z = m("el-container");
      return c(), g(Z, { class: "w-100 h-screen" }, {
        default: u(() => [
          k(Y, { class: "flex p-0" }, {
            default: u(() => [
              h("div", xe, [
                k(r, { class: "logo-wrap" }, {
                  default: u(() => [
                    y(A).menuIsCollapse ? (c(), x("div", we, Ae)) : (c(), x("div", ge, [
                      k(s, {
                        style: { width: "40px", height: "40px" },
                        src: y(pe)(X.value),
                        fit: "contain"
                      }, {
                        error: u(() => [
                          ke
                        ]),
                        _: 1
                      }, 8, ["src"])
                    ]))
                  ]),
                  _: 1
                }),
                k(v, { class: "h-[calc( 100vh - 64px )]" }, {
                  default: u(() => [
                    k(L, {
                      "default-active": d.value,
                      router: !0,
                      class: "aside-menu",
                      "unique-opened": !0,
                      collapse: y(A).menuIsCollapse
                    }, {
                      default: u(() => [
                        (c(!0), x(j, null, B(_.value, (i, N) => (c(), x(j, { key: N }, [
                          i.meta.show ? (c(), g(V, {
                            key: 0,
                            index: i.original_name,
                            onClick: (Re) => T(i.name)
                          }, {
                            title: u(() => [
                              h("div", be, [
                                h("span", Ee, F(i.meta.short_title || i.meta.title), 1)
                              ])
                            ]),
                            default: u(() => [
                              i.meta.icon ? (c(), x("div", Me, [
                                y(he)(i.meta.icon) ? (c(), g(s, {
                                  key: 0,
                                  class: "w-[16px] h-[16px] rounded-[50%] overflow-hidden",
                                  src: i.meta.icon,
                                  fit: "fill"
                                }, null, 8, ["src"])) : (c(), g(o, {
                                  key: 1,
                                  name: i.meta.icon,
                                  class: "absolute top-[50%] -translate-y-[50%]"
                                }, null, 8, ["name"]))
                              ])) : (c(), x("div", Le))
                            ]),
                            _: 2
                          }, 1032, ["index", "onClick"])) : J("", !0)
                        ], 64))), 128))
                      ]),
                      _: 1
                    }, 8, ["default-active", "collapse"]),
                    Ce
                  ]),
                  _: 1
                })
              ]),
              l.value.length ? (c(), g(v, {
                key: 0,
                class: "two-menu w-[152px]"
              }, {
                default: u(() => [
                  h("div", Ne, F(y(n).matched[2].meta.title), 1),
                  k(L, {
                    class: "aside-menu",
                    "default-active": y(n).name,
                    "default-openeds": C.value,
                    router: !0,
                    collapse: y(A).menuIsCollapse
                  }, {
                    default: u(() => [
                      (c(!0), x(j, null, B(l.value, (i, N) => (c(), g(ve, {
                        routes: i,
                        key: N
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "default-openeds", "collapse"]),
                  je
                ]),
                _: 1
              })) : J("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const ze = /* @__PURE__ */ _e(Ke, [["__scopeId", "data-v-0b7ed489"]]);
export {
  ze as default
};
