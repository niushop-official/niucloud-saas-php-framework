import { defineComponent as le, ref as u, resolveComponent as d, resolveDirective as se, openBlock as v, createElementBlock as b, Fragment as L, createElementVNode as e, normalizeStyle as ae, unref as s, createVNode as c, withDirectives as ne, createBlock as ue, withCtx as n, toDisplayString as p, createTextVNode as T, renderList as ce, normalizeClass as z, createCommentVNode as ie, pushScopeId as re, popScopeId as _e } from "vue";
import { _ as de } from "./icon-addon-one-2b9cfff5.js";
import { t as i, j as D, e$ as ye, f0 as ve, f1 as pe, f2 as me, a as fe } from "./core-shared-c6ad4e77.js";
import { useRoute as ge } from "vue-router";
import { a as be } from "./addon-bae583af.js";
import he from "./index-997caa57.js";
import xe from "./index-c14157f3.js";
import { u as je } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const P = "bussiness", M = "/static/resource/images/system/layout_bussiness.png", $e = {
  layout: P,
  cover: M
}, Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: M,
  default: $e,
  layout: P
}, Symbol.toStringTag, { value: "Module" })), V = "darkside", I = "/static/resource/images/system/layout_darkside.png", ke = {
  layout: V,
  cover: I
}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: I,
  default: ke,
  layout: V
}, Symbol.toStringTag, { value: "Module" })), N = "default", A = "/static/resource/images/system/layout_default.png", we = {
  layout: N,
  cover: A
}, Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: A,
  default: we,
  layout: N
}, Symbol.toStringTag, { value: "Module" })), E = "lightside", B = "/static/resource/images/system/layout_lightside.png", Le = {
  layout: E,
  cover: B
}, Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: B,
  default: Le,
  layout: E
}, Symbol.toStringTag, { value: "Module" })), R = "profession", F = "/static/resource/images/system/layout_profession.png", ze = {
  layout: R,
  cover: F
}, De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: F,
  default: ze,
  layout: R
}, Symbol.toStringTag, { value: "Module" })), H = "routine", U = "/static/resource/images/system/layout_routine.png", Pe = {
  layout: H,
  cover: U
}, Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: U,
  default: Pe,
  layout: H
}, Symbol.toStringTag, { value: "Module" })), q = "site", G = "/static/resource/images/system/layout_site.png", Ve = {
  layout: q,
  cover: G
}, Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: G,
  default: Ve,
  layout: q
}, Symbol.toStringTag, { value: "Module" })), j = (m) => (re("data-v-dd491c41"), m = m(), _e(), m), Ne = { class: "table-fill-page__card" }, Ae = { class: "table-panel table-fill-page__panel" }, Ee = { class: "table-fill-page__table" }, Be = { class: "flex items-center" }, Re = /* @__PURE__ */ j(() => /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "w-full h-full",
    src: de,
    alt: ""
  })
], -1)), Fe = { class: "flex-1 ml-2 truncate" }, He = { class: "h-[330px]" }, Ue = { class: "flex justify-between items-center mb-[20px]" }, qe = { class: "!text-sm !text-[#444]" }, Ge = /* @__PURE__ */ j(() => /* @__PURE__ */ e("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1)), Je = /* @__PURE__ */ j(() => /* @__PURE__ */ e("div", { class: "ml-[2px] text-[12px] text-[#999]" }, "如何开发自定义布局", -1)), Ke = [
  Ge,
  Je
], Qe = { class: "flex flex-wrap justify-items-stretch" }, We = ["onClick"], Xe = ["src"], Ye = ["src"], Ze = { class: "dialog-footer" }, et = /* @__PURE__ */ le({
  __name: "layout",
  setup(m) {
    const J = ge().meta.title, { pageRef: K, pageStyle: Q } = je(), f = u(!0), h = u({}), $ = u([]), r = u(null), x = u({}), S = u([
      {
        title: i("manyApp"),
        key: "system",
        icon: ""
      }
    ]), k = /* @__PURE__ */ Object.assign({ "/src/layout/bussiness/layout.json": Se, "/src/layout/darkside/layout.json": Oe, "/src/layout/default/layout.json": Ce, "/src/layout/lightside/layout.json": Te, "/src/layout/profession/layout.json": De, "/src/layout/routine/layout.json": Me, "/src/layout/site/layout.json": Ie });
    for (const t in k) {
      const o = k[t];
      $.value.push(o.default);
    }
    const O = /* @__PURE__ */ Object.assign({});
    be().then(({ data: t }) => {
      Object.keys(t).forEach((o) => {
        const g = t[o];
        g.type == "app" && S.value.push(g);
      }), f.value = !1;
    }), (() => {
      ye().then(({ data: t }) => {
        h.value = t;
      }), ve().then(({ data: t }) => {
        x.value = t;
      });
    })();
    const _ = u(""), y = u(!1), a = u(""), W = async (t) => {
      t != "system" && (r.value = null, Object.keys(O).forEach((o) => {
        o.indexOf(`/addon/${t}/`) != -1 && (r.value = O[o].default);
      })), _.value = t, a.value = h.value[t] || "", y.value = !0;
    }, X = () => {
      h.value[_.value] = a.value, pe({
        key: _.value,
        value: x.value[_.value] ? x.value[_.value] : ""
      }), me({
        key: _.value,
        value: a.value ? a.value : "site"
      }), y.value = !1;
    }, Y = () => {
      let t = "https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/diyLayoutDev.html";
      window.open(t);
    };
    return (t, o) => {
      const g = d("el-image"), w = d("el-table-column"), Z = d("el-table"), ee = d("el-scrollbar"), C = d("el-button"), te = d("el-dialog"), oe = se("loading");
      return v(), b(L, null, [
        e("div", {
          ref_key: "pageRef",
          ref: K,
          class: "main-container table-fill-page",
          style: ae(s(Q))
        }, [
          e("div", Ne, [
            e("div", Ae, [
              c(he, {
                title: s(J),
                selectable: !1
              }, null, 8, ["title"]),
              e("div", Ee, [
                ne((v(), ue(Z, {
                  height: "100%",
                  data: S.value,
                  size: "large"
                }, {
                  empty: n(() => [
                    e("span", null, p(f.value ? "" : s(i)("emptyData")), 1)
                  ]),
                  default: n(() => [
                    c(w, {
                      prop: "title",
                      label: s(i)("app"),
                      "min-width": "120"
                    }, {
                      default: n(({ row: l }) => [
                        e("div", Be, [
                          c(g, {
                            class: "w-[40px] h-[40px] rounded-md overflow-hidden",
                            src: l.icon,
                            fit: "contain"
                          }, {
                            error: n(() => [
                              Re
                            ]),
                            _: 2
                          }, 1032, ["src"]),
                          e("div", Fe, p(l.title), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    c(w, {
                      label: s(i)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "120"
                    }, {
                      default: n(({ row: l }) => [
                        c(xe, {
                          actions: [{ label: s(i)("setting"), onClick: () => W(l.key) }]
                        }, null, 8, ["actions"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [oe, f.value]
                ])
              ])
            ])
          ])
        ], 4),
        c(te, {
          modelValue: y.value,
          "onUpdate:modelValue": o[3] || (o[3] = (l) => y.value = l),
          title: s(i)("selectLayout"),
          width: "800",
          "destroy-on-close": !0
        }, {
          footer: n(() => [
            e("span", Ze, [
              c(C, {
                onClick: o[1] || (o[1] = (l) => y.value = !1)
              }, {
                default: n(() => [
                  T(p(s(i)("cancel")), 1)
                ]),
                _: 1
              }),
              c(C, {
                type: "primary",
                loading: f.value,
                onClick: o[2] || (o[2] = (l) => X())
              }, {
                default: n(() => [
                  T(p(s(i)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: n(() => [
            e("div", He, [
              c(ee, null, {
                default: n(() => [
                  e("div", Ue, [
                    e("h3", qe, p(s(i)("layout")), 1),
                    e("div", {
                      class: "flex items-center cursor-pointer",
                      onClick: Y
                    }, Ke)
                  ]),
                  e("div", Qe, [
                    (v(!0), b(L, null, ce($.value, (l) => (v(), b("div", {
                      class: z(["layout-item mr-[10px] mb-[10px]", { "is-active": !a.value && l.layout == "site" || a.value == l.layout }]),
                      onClick: (lt) => a.value = l.layout
                    }, [
                      e("img", {
                        src: s(D)(l.cover),
                        class: "w-full h-full"
                      }, null, 8, Xe)
                    ], 10, We))), 256)),
                    r.value ? (v(), b("div", {
                      key: 0,
                      class: z(["layout-item mr-[20px] mb-[10px]", { "is-active": !a.value && r.value.layout == "site" || a.value == r.value.layout }]),
                      onClick: o[0] || (o[0] = (l) => a.value = r.value.layout)
                    }, [
                      e("img", {
                        src: s(D)(r.value.cover),
                        class: "w-full h-full"
                      }, null, 8, Ye)
                    ], 2)) : ie("", !0)
                  ])
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
const ft = /* @__PURE__ */ fe(et, [["__scopeId", "data-v-dd491c41"]]);
export {
  ft as default
};
