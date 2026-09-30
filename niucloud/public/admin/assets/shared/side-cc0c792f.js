import { defineComponent as ee, ref as m, computed as te, onMounted as se, watch as ne, resolveComponent as f, openBlock as d, createBlock as w, withCtx as c, createVNode as y, createElementVNode as i, unref as x, createElementBlock as k, Fragment as j, renderList as V, toDisplayString as B, createCommentVNode as O, pushScopeId as ae, popScopeId as oe } from "vue";
import { _ as le } from "./icon-addon-one-2b9cfff5.js";
import { useRoute as re, useRouter as ce } from "vue-router";
import { u as ie, h as ue, cA as D, hz as de, hA as pe, m as _, hJ as he, j as me, hC as fe, k as _e, hK as ve, hD as ye, a as xe } from "./core-shared-c6ad4e77.js";
import ge from "./menu-item-4ed3e0f2.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const L = (A) => (ae("data-v-58e0783f"), A = A(), oe(), A), ke = { class: "w-[64px] bg-[#282c34] h-screen one-menu" }, Ae = {
  key: 0,
  class: "logo flex items-center m-auto h-[64px]"
}, Me = /* @__PURE__ */ L(() => /* @__PURE__ */ i("div", { class: "flex justify-center items-center w-full h-[40px]" }, [
  /* @__PURE__ */ i("img", {
    class: "max-w-[40px]",
    src: le,
    alt: "",
    "object-fit": "contain"
  })
], -1)), Se = {
  key: 1,
  class: "logo flex items-center justify-center h-[64px]"
}, we = /* @__PURE__ */ L(() => /* @__PURE__ */ i("i", { class: "text-3xl iconfont iconyunkongjian" }, null, -1)), Le = [
  we
], Ee = { class: "w-[16px] h-[16px] relative flex justify-center" }, Ce = { class: "relative" }, be = { class: "ml-[10px] text-[15px]" }, je = /* @__PURE__ */ L(() => /* @__PURE__ */ i("div", { class: "h-[48px]" }, null, -1)), Ke = { class: "w-[190px] h-[64px] flex items-center justify-center text-[16px] border-0 border-b-[1px] border-solid border-[#eee]" }, Ne = /* @__PURE__ */ L(() => /* @__PURE__ */ i("div", { class: "h-[48px]" }, null, -1)), Re = /* @__PURE__ */ ee({
  __name: "side",
  setup(A) {
    const E = ie(), g = ue(), l = re(), F = ce(), n = g.siteInfo, U = g.routers, q = g.addonIndexRoute, p = m([]), r = m([]), M = {}, z = te(() => g.siteInfo.icon ? g.siteInfo.icon : E.website.icon);
    if (U.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = D(e.children)), p.value.push(e)) : e.meta.addon != "" && (n == null ? void 0 : n.apps.length) <= 1 && (n == null ? void 0 : n.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = D(t.children));
      }), p.value.unshift(...e.children)) : p.value.unshift(e) : M[e.meta.addon] = e, p.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }), (n == null ? void 0 : n.apps.length) > 1) {
      const e = [];
      n == null || n.apps.forEach((t) => {
        M[t.key] && (M[t.key].name = q[t.key], e.push(M[t.key]));
      }), p.value.unshift(...e), p.value.sort((t, s) => t.meta.sort && s.meta.sort ? s.meta.sort - t.meta.sort : t.meta.sort ? -1 : s.meta.sort ? 1 : 0);
    }
    const u = m(l.matched[1].name), { menuActive: $ } = de(), { handleMenuJump: G } = pe(), K = m(null), Ie = m(null), H = async () => {
      const e = await _e();
      K.value = e.data, _.set({ key: "defaultAppList", data: K.value });
    }, N = m([]), P = async () => {
      const e = await ve();
      N.value = e.data.list, _.set({ key: "specialAppList", data: N.value });
    }, C = m([]), R = m([]);
    se(() => {
      H(), P();
      const e = I();
      R.value = W(e), C.value = T(e), _.set({ key: "specialMenuNames", data: C.value }), _.set({ key: "specialMenuNamesLevel1", data: R.value });
    });
    const Q = (e) => {
      if (!e || typeof e != "object")
        return [];
      const t = [];
      return Object.values(e).forEach((s) => {
        Array.isArray(s.list) && s.list.forEach((a) => {
          a.key && t.push(a.key);
        });
      }), t;
    }, I = () => {
      const e = _.get("specialAppList");
      if (Array.isArray(e) && e.length) {
        const t = JSON.parse(JSON.stringify(e)), s = _.get("activeAppKey");
        t.forEach((o) => {
          o.children && Array.isArray(o.children) && ((S) => {
            S.forEach((v) => {
              v && v.is_show !== void 0 && (v.is_show = v.menu_key === s ? 1 : 0);
            });
          })(o.children);
        });
        const a = t.filter((o) => o.children && o.children.length > 0);
        return he(a);
      }
      return [];
    }, T = (e) => {
      const t = [], s = (a) => {
        a.forEach((o) => {
          o.name && t.push(o.name), o.children && Array.isArray(o.children) && s(o.children);
        });
      };
      return e.forEach((a) => {
        a.children && Array.isArray(a.children) && s(a.children);
      }), t;
    }, W = (e) => {
      const t = [];
      return e.forEach((s) => {
        s.name && t.push(s.name);
      }), t;
    }, X = (e) => {
      C.value.includes(e) || _.remove("activeAppKey");
      const s = p.value.find((a) => a.name === e);
      if (G(e, s == null ? void 0 : s.meta)) {
        ye(u, u.value);
        return;
      }
      F.push({ name: e });
    };
    return ne(l, () => {
      if (l.meta.attr != "")
        u.value = l.matched[1].name, r.value = l.matched[1].children ?? [];
      else if ((n == null ? void 0 : n.apps.length) > 1)
        r.value = l.matched[2].children, u.value = l.matched[2].name;
      else {
        const s = l.matched[2];
        s.meta.addon == "" ? (u.value = l.matched[2].name, r.value = l.matched[2].children ?? []) : s.meta.addon == (n == null ? void 0 : n.apps[0].key) ? (u.value = l.matched[3].name, r.value = l.matched[3].children ?? []) : (u.value = l.matched[2].name, r.value = l.matched[2].children ?? []);
      }
      const e = _.get("defaultAppList"), t = Q(e);
      if (r.value = r.value.filter((s) => !s.name || !t.includes(s.name)), u.value == "addon") {
        const s = I();
        if (s.length) {
          const a = r.value.findIndex(
            (o) => o.name === "addon_list"
          );
          a !== -1 ? r.value.splice(
            a + 1,
            0,
            ...s
          ) : r.value.push(...s);
        }
      }
    }, { immediate: !0 }), (e, t) => {
      const s = f("el-image"), a = f("el-header"), o = f("icon"), J = f("el-menu-item"), S = f("el-menu"), v = f("el-scrollbar"), Y = f("el-main"), Z = f("el-container");
      return d(), w(Z, { class: "w-100 h-screen" }, {
        default: c(() => [
          y(Y, { class: "p-0 flex" }, {
            default: c(() => [
              i("div", ke, [
                y(a, { class: "logo-wrap" }, {
                  default: c(() => [
                    x(E).menuIsCollapse ? (d(), k("div", Se, Le)) : (d(), k("div", Ae, [
                      y(s, {
                        style: { width: "40px", height: "40px" },
                        src: x(me)(x(z)),
                        fit: "contain"
                      }, {
                        error: c(() => [
                          Me
                        ]),
                        _: 1
                      }, 8, ["src"])
                    ]))
                  ]),
                  _: 1
                }),
                y(v, { class: "h-[calc( 100vh - 64px )]" }, {
                  default: c(() => [
                    y(S, {
                      "default-active": u.value,
                      router: !1,
                      class: "aside-menu",
                      "unique-opened": !0
                    }, {
                      default: c(() => [
                        (d(!0), k(j, null, V(p.value, (h, b) => (d(), k(j, { key: b }, [
                          h.meta.show ? (d(), w(J, {
                            key: 0,
                            index: h.original_name,
                            onClick: (Je) => X(h.name)
                          }, {
                            title: c(() => [
                              i("div", Ce, [
                                i("span", be, B(h.meta.short_title || h.meta.title), 1)
                              ])
                            ]),
                            default: c(() => [
                              i("div", Ee, [
                                y(o, {
                                  name: x(fe)(h.meta.icon),
                                  class: "absolute top-[50%] -translate-y-[50%]"
                                }, null, 8, ["name"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["index", "onClick"])) : O("", !0)
                        ], 64))), 128))
                      ]),
                      _: 1
                    }, 8, ["default-active"]),
                    je
                  ]),
                  _: 1
                })
              ]),
              r.value.length ? (d(), w(v, {
                key: 0,
                class: "two-menu w-[190px]"
              }, {
                default: c(() => [
                  i("div", Ke, B(x(l).matched[2].meta.title), 1),
                  y(S, {
                    "default-active": x($),
                    router: !1,
                    class: "aside-menu",
                    collapse: x(E).menuIsCollapse
                  }, {
                    default: c(() => [
                      (d(!0), k(j, null, V(r.value, (h, b) => (d(), w(ge, {
                        routes: h,
                        key: b
                      }, null, 8, ["routes"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["default-active", "collapse"]),
                  Ne
                ]),
                _: 1
              })) : O("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const He = /* @__PURE__ */ xe(Re, [["__scopeId", "data-v-58e0783f"]]);
export {
  He as default
};
