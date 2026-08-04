import { defineComponent as Y, ref as p, computed as Z, onMounted as ee, watch as te, resolveComponent as m, openBlock as c, createBlock as M, withCtx as i, createVNode as y, createElementVNode as d, unref as k, createElementBlock as x, Fragment as N, renderList as J, toDisplayString as O, createCommentVNode as j, pushScopeId as se, popScopeId as ae } from "vue";
import { _ as ne } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as oe, useRouter as le } from "vue-router";
import { cm as re, u as ce, cq as q, s as h, gW as ie, i as ue, a as de, gX as pe, _ as me } from "./core-shared-5b3bfa35.js";
import he from "./menu-item-cb8eaf1e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const L = (S) => (se("data-v-7dfcb058"), S = S(), ae(), S), _e = { class: "w-[64px] bg-[#282c34] h-screen one-menu" }, fe = {
  key: 0,
  class: "logo flex items-center m-auto h-[64px]"
}, ve = /* @__PURE__ */ L(() => /* @__PURE__ */ d("div", { class: "flex justify-center items-center w-full h-[40px]" }, [
  /* @__PURE__ */ d("img", {
    class: "max-w-[40px]",
    src: ne,
    alt: "",
    "object-fit": "contain"
  })
], -1)), ye = {
  key: 1,
  class: "logo flex items-center justify-center h-[64px]"
}, xe = /* @__PURE__ */ L(() => /* @__PURE__ */ d("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), ge = [
  xe
], ke = {
  key: 0,
  class: "w-[16px] h-[16px] relative flex justify-center"
}, Se = { class: "relative" }, we = { class: "ml-[10px] text-[15px]" }, Ae = /* @__PURE__ */ L(() => /* @__PURE__ */ d("div", { class: "h-[48px]" }, null, -1)), Me = { class: "w-[190px] h-[64px] flex items-center justify-center text-[16px] border-0 border-b-[1px] border-solid border-[#eee]" }, Le = /* @__PURE__ */ L(() => /* @__PURE__ */ d("div", { class: "h-[48px]" }, null, -1)), be = /* @__PURE__ */ Y({
  __name: "side",
  setup(S) {
    const b = re(), g = ce(), n = oe(), F = le(), a = g.siteInfo, U = g.routers, D = g.addonIndexRoute, _ = p([]), r = p([]), w = {}, W = Z(() => g.siteInfo.icon ? g.siteInfo.icon : b.website.icon);
    if (U.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = q(e.children)), _.value.push(e)) : e.meta.addon != "" && (a == null ? void 0 : a.apps.length) <= 1 && (a == null ? void 0 : a.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = q(t.children));
      }), _.value.unshift(...e.children)) : _.value.unshift(e) : w[e.meta.addon] = e, _.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }), (a == null ? void 0 : a.apps.length) > 1) {
      const e = [];
      a == null || a.apps.forEach((t) => {
        w[t.key] && (w[t.key].name = D[t.key], e.push(w[t.key]));
      }), _.value.unshift(...e), _.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }
    const f = p(n.matched[1].name), K = p(null), Ee = p(null), X = async () => {
      const e = await de();
      K.value = e.data, h.set({ key: "defaultAppList", data: K.value });
    }, R = p([]), $ = async () => {
      const e = await pe();
      R.value = e.data.list, h.set({ key: "specialAppList", data: R.value });
    }, E = p([]), I = p([]);
    ee(() => {
      X(), $();
      const e = V();
      I.value = H(e), E.value = G(e), h.set({ key: "specialMenuNames", data: E.value }), h.set({ key: "specialMenuNamesLevel1", data: I.value });
    });
    const z = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((l) => {
          l.key && t.push(l.key);
        });
      }), t;
    }, V = () => {
      const e = h.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), s = h.get("activeAppKey");
        t.forEach((o) => {
          o.children && Array.isArray(o.children) && ((A) => {
            A.forEach((v) => {
              v && v.is_show !== void 0 && (v.is_show = v.menu_key === s ? 1 : 0);
            });
          })(o.children);
        });
        const l = t.filter((o) => o.children && o.children.length > 0);
        return ie(l);
      }
      return [];
    }, G = (e) => {
      const t = [], s = (l) => {
        l.forEach((o) => {
          o.name && t.push(o.name), o.children && Array.isArray(o.children) && s(o.children);
        });
      };
      return e.forEach((l) => {
        l.children && Array.isArray(l.children) && s(l.children);
      }), t;
    }, H = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, P = (e) => {
      E.value.includes(e) || h.remove("activeAppKey"), F.push({ name: e });
    };
    return te(n, () => {
      if (n.meta.attr != "")
        f.value = n.matched[1].name, r.value = n.matched[1].children ?? [];
      else if ((a == null ? void 0 : a.apps.length) > 1)
        r.value = n.matched[2].children, f.value = n.matched[2].name;
      else {
        const s = n.matched[2];
        s.meta.addon == "" ? (f.value = n.matched[2].name, r.value = n.matched[2].children ?? []) : s.meta.addon == (a == null ? void 0 : a.apps[0].key) ? (f.value = n.matched[3].name, r.value = n.matched[3].children ?? []) : (f.value = n.matched[2].name, r.value = n.matched[2].children ?? []);
      }
      const e = h.get("defaultAppList"), t = z(e);
      if (r.value = r.value.filter((s) => !s.name || !t.includes(s.name)), f.value == "addon") {
        const s = V();
        if (s.length) {
          const l = r.value.findIndex(
            (o) => o.name === "addon_list"
          );
          l !== -1 ? r.value.splice(
            l + 1,
            0,
            ...s
          ) : r.value.push(...s);
        }
      }
    }, { immediate: !0 }), (e, t) => {
      const s = m("el-image"), l = m("el-header"), o = m("icon"), B = m("el-menu-item"), A = m("el-menu"), v = m("el-scrollbar"), Q = m("el-main"), T = m("el-container");
      return c(), M(T, { class: "w-100 h-screen" }, {
        default: i(() => [
          y(Q, { class: "p-0 flex" }, {
            default: i(() => [
              d("div", _e, [
                y(l, { class: "logo-wrap" }, {
                  default: i(() => [
                    k(b).menuIsCollapse ? (c(), x("div", ye, ge)) : (c(), x("div", fe, [
                      y(s, {
                        style: { width: "40px", height: "40px" },
                        src: k(ue)(W.value),
                        fit: "contain"
                      }, {
                        error: i(() => [
                          ve
                        ]),
                        _: 1
                      }, 8, ["src"])
                    ]))
                  ]),
                  _: 1
                }),
                y(v, { class: "h-[calc( 100vh - 64px )]" }, {
                  default: i(() => [
                    y(A, {
                      "default-active": f.value,
                      router: !0,
                      class: "aside-menu",
                      "unique-opened": !0
                    }, {
                      default: i(() => [
                        (c(!0), x(N, null, J(_.value, (u, C) => (c(), x(N, { key: C }, [
                          u.meta.show ? (c(), M(B, {
                            key: 0,
                            index: u.original_name,
                            onClick: (Ce) => P(u.name)
                          }, {
                            title: i(() => [
                              d("div", Se, [
                                d("span", we, O(u.meta.short_title || u.meta.title), 1)
                              ])
                            ]),
                            default: i(() => [
                              u.meta.icon ? (c(), x("div", ke, [
                                y(o, {
                                  name: u.meta.icon,
                                  class: "absolute top-[50%] -translate-y-[50%]"
                                }, null, 8, ["name"])
                              ])) : j("", !0)
                            ]),
                            _: 2
                          }, 1032, ["index", "onClick"])) : j("", !0)
                        ], 64))), 128))
                      ]),
                      _: 1
                    }, 8, ["default-active"]),
                    Ae
                  ]),
                  _: 1
                })
              ]),
              r.value.length ? (c(), M(v, {
                key: 0,
                class: "two-menu w-[190px]"
              }, {
                default: i(() => [
                  d("div", Me, O(k(n).matched[2].meta.title), 1),
                  y(A, {
                    "default-active": k(n).name,
                    router: !0,
                    class: "aside-menu",
                    collapse: k(b).menuIsCollapse
                  }, {
                    default: i(() => [
                      (c(!0), x(N, null, J(r.value, (u, C) => (c(), M(he, {
                        routes: u,
                        key: C
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  Le
                ]),
                _: 1
              })) : j("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const Fe = /* @__PURE__ */ me(be, [["__scopeId", "data-v-7dfcb058"]]);
export {
  Fe as default
};
