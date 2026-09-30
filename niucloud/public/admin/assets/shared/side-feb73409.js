import { defineComponent as se, ref as h, computed as ae, onMounted as ne, watch as le, resolveComponent as _, openBlock as u, createBlock as x, withCtx as d, createVNode as g, createElementVNode as p, unref as m, createElementBlock as w, Fragment as K, renderList as V, toDisplayString as B, createCommentVNode as D, pushScopeId as oe, popScopeId as ce } from "vue";
import { _ as re } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as ie, useRouter as ue } from "vue-router";
import { u as de, h as pe, cA as F, hz as he, hA as me, m as v, hJ as fe, j as _e, aQ as ve, hC as ye, k as xe, hK as ge, hD as ke, a as we } from "./core-shared-c6ad4e77.js";
import Ae from "./menu-item-cdb23d02.js";
import { c as Me } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const C = (A) => (oe("data-v-433726ad"), A = A(), ce(), A), Se = { class: "one-menu w-[124px] h-screen px-[8px] bg-[#1c2233]" }, Le = {
  key: 0,
  class: "logo flex items-center m-auto h-[64px]"
}, Ce = /* @__PURE__ */ C(() => /* @__PURE__ */ p("div", { class: "flex justify-center items-center w-full h-[40px]" }, [
  /* @__PURE__ */ p("img", {
    class: "max-w-[40px]",
    src: re,
    alt: "",
    "object-fit": "contain"
  })
], -1)), Ee = {
  key: 1,
  class: "logo flex items-center justify-center h-[64px]"
}, be = /* @__PURE__ */ C(() => /* @__PURE__ */ p("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), je = [
  be
], Ke = { class: "w-[16px] h-[16px] relative flex justify-center" }, Ne = { class: "relative flex-1 w-0" }, Ie = { class: "ml-[10px] w-full truncate" }, Re = /* @__PURE__ */ C(() => /* @__PURE__ */ p("div", { class: "h-[48px]" }, null, -1)), Je = { class: "w-[152px] h-[64px] flex items-center justify-center text-[16px] border-b-[1px] border-solid border-[var(--el-border-color-lighter)]" }, Oe = /* @__PURE__ */ C(() => /* @__PURE__ */ p("div", { class: "h-[48px]" }, null, -1)), Ve = /* @__PURE__ */ se({
  __name: "side",
  setup(A) {
    const o = ie(), U = ue(), M = de(), k = pe(), a = k.siteInfo, q = k.routers, z = k.addonIndexRoute, f = h([]), c = h([]), S = {}, Q = ae(() => k.siteInfo.icon ? k.siteInfo.icon : M.website.icon);
    if (q.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = F(e.children)), f.value.push(e)) : e.meta.addon != "" && (a == null ? void 0 : a.apps.length) <= 1 && (a == null ? void 0 : a.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = F(t.children));
      }), f.value.unshift(...e.children)) : f.value.unshift(e) : S[e.meta.addon] = e, f.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }), (a == null ? void 0 : a.apps.length) > 1) {
      const e = [];
      a == null || a.apps.forEach((t) => {
        S[t.key] && (S[t.key].name = z[t.key], e.push(S[t.key]));
      }), f.value.unshift(...e), f.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }
    const N = h(null), Be = h(null), r = h(o.matched[1].name), { menuActive: W } = he(), { handleMenuJump: $ } = me(), G = async () => {
      const e = await xe();
      N.value = e.data, v.set({ key: "defaultAppList", data: N.value });
    }, I = h([]), H = async () => {
      const e = await ge();
      I.value = e.data.list, v.set({ key: "specialAppList", data: I.value });
    }, E = h([]), R = h([]);
    ne(() => {
      G(), H();
      const e = J();
      E.value = X(e), R.value = Y(e), v.set({ key: "specialMenuNames", data: E.value }), v.set({ key: "specialMenuNamesLevel1", data: R.value });
    });
    const b = h([]), P = () => {
      if (b.value = [], r.value !== "active" && r.value !== "addon" && c.value && Object.values(c.value).length) {
        const e = Me(c.value);
        for (const t in e)
          b.value.push(e[t].name);
      }
    }, T = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((n) => {
          n.key && t.push(n.key);
        });
      }), t;
    }, J = () => {
      const e = v.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), s = v.get("activeAppKey");
        t.forEach((l) => {
          l.children && Array.isArray(l.children) && ((L) => {
            L.forEach((y) => {
              y && y.is_show !== void 0 && (y.is_show = y.menu_key === s ? 1 : 0);
            });
          })(l.children);
        });
        const n = t.filter((l) => l.children && l.children.length > 0);
        return fe(n);
      }
      return [];
    }, X = (e) => {
      const t = [], s = (n) => {
        n.forEach((l) => {
          l.name && t.push(l.name), l.children && Array.isArray(l.children) && s(l.children);
        });
      };
      return e.forEach((n) => {
        n.children && Array.isArray(n.children) && s(n.children);
      }), t;
    }, Y = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, Z = (e) => {
      E.value.includes(e) || v.remove("activeAppKey");
      const s = f.value.find((n) => n.name === e);
      if ($(e, s == null ? void 0 : s.meta)) {
        ke(r, r.value);
        return;
      }
      U.push({ name: e });
    };
    return le(o, () => {
      if (o.meta.attr != "")
        r.value = o.matched[1].name, c.value = o.matched[1].children ?? [];
      else if ((a == null ? void 0 : a.apps.length) > 1)
        c.value = o.matched[2].children, r.value = o.matched[2].name;
      else {
        const s = o.matched[2];
        s.meta.addon == "" ? (r.value = o.matched[2].name, c.value = o.matched[2].children ?? []) : s.meta.addon == (a == null ? void 0 : a.apps[0].key) ? (r.value = o.matched[3].name, c.value = o.matched[3].children ?? []) : (r.value = o.matched[2].name, c.value = o.matched[2].children ?? []);
      }
      P();
      const e = v.get("defaultAppList"), t = T(e);
      if (c.value = c.value.filter((s) => !s.name || !t.includes(s.name)), r.value == "addon") {
        const s = J();
        if (s.length) {
          const n = c.value.findIndex(
            (l) => l.name === "addon_list"
          );
          n !== -1 ? c.value.splice(
            n + 1,
            0,
            ...s
          ) : c.value.push(...s);
        }
      }
    }, { immediate: !0 }), (e, t) => {
      const s = _("el-image"), n = _("el-header"), l = _("icon"), O = _("el-menu-item"), L = _("el-menu"), y = _("el-scrollbar"), ee = _("el-main"), te = _("el-container");
      return u(), x(te, { class: "w-100 h-screen" }, {
        default: d(() => [
          g(ee, { class: "flex p-0" }, {
            default: d(() => [
              p("div", Se, [
                g(n, { class: "logo-wrap" }, {
                  default: d(() => [
                    m(M).menuIsCollapse ? (u(), w("div", Ee, je)) : (u(), w("div", Le, [
                      g(s, {
                        style: { width: "40px", height: "40px" },
                        src: m(_e)(m(Q)),
                        fit: "contain"
                      }, {
                        error: d(() => [
                          Ce
                        ]),
                        _: 1
                      }, 8, ["src"])
                    ]))
                  ]),
                  _: 1
                }),
                g(y, { class: "h-[calc( 100vh - 64px )]" }, {
                  default: d(() => [
                    g(L, {
                      "default-active": r.value,
                      router: !1,
                      class: "aside-menu",
                      "unique-opened": !0,
                      collapse: m(M).menuIsCollapse
                    }, {
                      default: d(() => [
                        (u(!0), w(K, null, V(f.value, (i, j) => (u(), w(K, { key: j }, [
                          i.meta.show ? (u(), x(O, {
                            key: 0,
                            index: i.original_name,
                            onClick: (De) => Z(i.name)
                          }, {
                            title: d(() => [
                              p("div", Ne, [
                                p("span", Ie, B(i.meta.short_title || i.meta.title), 1)
                              ])
                            ]),
                            default: d(() => [
                              p("div", Ke, [
                                i.meta.icon && m(ve)(i.meta.icon) ? (u(), x(s, {
                                  key: 0,
                                  class: "w-[16px] h-[16px] rounded-[50%] overflow-hidden",
                                  src: i.meta.icon,
                                  fit: "fill"
                                }, null, 8, ["src"])) : (u(), x(l, {
                                  key: 1,
                                  name: m(ye)(i.meta.icon),
                                  class: "absolute top-[50%] -translate-y-[50%]"
                                }, null, 8, ["name"]))
                              ])
                            ]),
                            _: 2
                          }, 1032, ["index", "onClick"])) : D("", !0)
                        ], 64))), 128))
                      ]),
                      _: 1
                    }, 8, ["default-active", "collapse"]),
                    Re
                  ]),
                  _: 1
                })
              ]),
              c.value.length ? (u(), x(y, {
                key: 0,
                class: "two-menu w-[152px]"
              }, {
                default: d(() => [
                  p("div", Je, B(m(o).matched[2].meta.title), 1),
                  g(L, {
                    class: "aside-menu",
                    "default-active": m(W),
                    "default-openeds": b.value,
                    router: !1,
                    collapse: m(M).menuIsCollapse
                  }, {
                    default: d(() => [
                      (u(!0), w(K, null, V(c.value, (i, j) => (u(), x(Ae, {
                        routes: i,
                        key: j
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "default-openeds", "collapse"]),
                  Oe
                ]),
                _: 1
              })) : D("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const Xe = /* @__PURE__ */ we(Ve, [["__scopeId", "data-v-433726ad"]]);
export {
  Xe as default
};
