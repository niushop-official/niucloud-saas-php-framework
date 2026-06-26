import { defineComponent as Y, ref as i, resolveComponent as _, resolveDirective as Z, openBlock as p, createElementBlock as g, Fragment as O, createElementVNode as e, createVNode as r, withCtx as a, toDisplayString as y, unref as n, withDirectives as ee, createBlock as te, createTextVNode as x, renderList as oe, normalizeClass as L, createCommentVNode as le } from "vue";
import { _ as se } from "./icon-addon-one-2b9cfff5.js";
import { t as c, i as S, er as ae, es as ne, et as ue, eu as re } from "./core-shared-ca1fcae5.js";
import { useRoute as ce } from "vue-router";
import { g as ie } from "./addon-84f9cff9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const T = "bussiness", z = "/static/resource/images/system/layout_bussiness.png", de = {
  layout: T,
  cover: z
}, _e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: z,
  default: de,
  layout: T
}, Symbol.toStringTag, { value: "Module" })), D = "darkside", V = "/static/resource/images/system/layout_darkside.png", ye = {
  layout: D,
  cover: V
}, ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: V,
  default: ye,
  layout: D
}, Symbol.toStringTag, { value: "Module" })), M = "default", P = "/static/resource/images/system/layout_default.png", pe = {
  layout: M,
  cover: P
}, me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: P,
  default: pe,
  layout: M
}, Symbol.toStringTag, { value: "Module" })), N = "lightside", E = "/static/resource/images/system/layout_lightside.png", fe = {
  layout: N,
  cover: E
}, ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: E,
  default: fe,
  layout: N
}, Symbol.toStringTag, { value: "Module" })), A = "profession", B = "/static/resource/images/system/layout_profession.png", be = {
  layout: A,
  cover: B
}, he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: B,
  default: be,
  layout: A
}, Symbol.toStringTag, { value: "Module" })), F = "routine", I = "/static/resource/images/system/layout_routine.png", xe = {
  layout: F,
  cover: I
}, je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cover: I,
  default: xe,
  layout: F
}, Symbol.toStringTag, { value: "Module" })), ke = { class: "main-container" }, $e = { class: "flex justify-between items-center" }, we = { class: "text-page-title" }, Ce = { class: "mt-[20px]" }, Oe = { class: "flex items-center" }, Le = /* @__PURE__ */ e("div", { class: "flex items-center w-full h-full" }, [
  /* @__PURE__ */ e("img", {
    class: "w-full h-full",
    src: se,
    alt: ""
  })
], -1), Se = { class: "flex-1 ml-2 truncate" }, Te = { class: "h-[330px]" }, ze = { class: "flex justify-between items-center mb-[20px]" }, De = { class: "!text-sm !text-[#444]" }, Ve = /* @__PURE__ */ e("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), Me = /* @__PURE__ */ e("div", { class: "ml-[2px] text-[12px] text-[#999]" }, "如何开发自定义布局", -1), Pe = [
  Ve,
  Me
], Ne = { class: "flex flex-wrap justify-items-stretch" }, Ee = ["onClick"], Ae = ["src"], Be = ["src"], Fe = { class: "dialog-footer" }, et = /* @__PURE__ */ Y({
  __name: "layout",
  setup(Ie) {
    const R = ce().meta.title, m = i(!0), u = i({}), j = i([]), d = i(null), b = i({}), k = i([
      {
        title: c("manyApp"),
        key: "system",
        icon: ""
      }
    ]), $ = /* @__PURE__ */ Object.assign({ "/src/layout/bussiness/layout.json": _e, "/src/layout/darkside/layout.json": ve, "/src/layout/default/layout.json": me, "/src/layout/lightside/layout.json": ge, "/src/layout/profession/layout.json": he, "/src/layout/routine/layout.json": je });
    for (const t in $) {
      const o = $[t];
      j.value.push(o.default);
    }
    const w = /* @__PURE__ */ Object.assign({});
    ie().then(({ data: t }) => {
      Object.keys(t).forEach((o) => {
        const f = t[o];
        f.type == "app" && k.value.push(f);
      }), m.value = !1;
    }), (() => {
      ae().then(({ data: t }) => {
        u.value = t;
      }), ne().then(({ data: t }) => {
        b.value = t;
      });
    })();
    const s = i(""), v = i(!1), U = async (t) => {
      t != "system" && (d.value = null, Object.keys(w).forEach((o) => {
        o.indexOf(`/addon/${t}/`) != -1 && (d.value = w[o].default);
      })), s.value = t, v.value = !0;
    }, q = () => {
      ue({
        key: s.value,
        value: b.value[s.value] ? b.value[s.value] : ""
      }), re({
        key: s.value,
        value: u.value[s.value] ? u.value[s.value] : "default"
      }), v.value = !1;
    }, G = () => {
      let t = "https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/diyLayoutDev.html";
      window.open(t);
    };
    return (t, o) => {
      const f = _("el-image"), C = _("el-table-column"), h = _("el-button"), H = _("el-table"), J = _("el-card"), K = _("el-scrollbar"), Q = _("el-dialog"), W = Z("loading");
      return p(), g(O, null, [
        e("div", ke, [
          r(J, {
            class: "box-card !border-none",
            shadow: "never"
          }, {
            default: a(() => [
              e("div", $e, [
                e("span", we, y(n(R)), 1)
              ]),
              e("div", Ce, [
                ee((p(), te(H, {
                  data: k.value,
                  size: "large"
                }, {
                  empty: a(() => [
                    e("span", null, y(m.value ? "" : n(c)("emptyData")), 1)
                  ]),
                  default: a(() => [
                    r(C, {
                      prop: "title",
                      label: n(c)("app"),
                      "min-width": "120"
                    }, {
                      default: a(({ row: l }) => [
                        e("div", Oe, [
                          r(f, {
                            class: "w-[40px] h-[40px] rounded-md overflow-hidden",
                            src: l.icon,
                            fit: "contain"
                          }, {
                            error: a(() => [
                              Le
                            ]),
                            _: 2
                          }, 1032, ["src"]),
                          e("div", Se, y(l.title), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    r(C, {
                      label: n(c)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "100"
                    }, {
                      default: a(({ row: l }) => [
                        r(h, {
                          type: "primary",
                          link: "",
                          onClick: (X) => U(l.key)
                        }, {
                          default: a(() => [
                            x(y(n(c)("setting")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [W, m.value]
                ])
              ])
            ]),
            _: 1
          })
        ]),
        r(Q, {
          modelValue: v.value,
          "onUpdate:modelValue": o[3] || (o[3] = (l) => v.value = l),
          title: n(c)("selectLayout"),
          width: "800",
          "destroy-on-close": !0
        }, {
          footer: a(() => [
            e("span", Fe, [
              r(h, {
                onClick: o[1] || (o[1] = (l) => v.value = !1)
              }, {
                default: a(() => [
                  x(y(n(c)("cancel")), 1)
                ]),
                _: 1
              }),
              r(h, {
                type: "primary",
                loading: m.value,
                onClick: o[2] || (o[2] = (l) => q())
              }, {
                default: a(() => [
                  x(y(n(c)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: a(() => [
            e("div", Te, [
              r(K, null, {
                default: a(() => [
                  e("div", ze, [
                    e("h3", De, y(n(c)("layout")), 1),
                    e("div", {
                      class: "flex items-center cursor-pointer",
                      onClick: G
                    }, Pe)
                  ]),
                  e("div", Ne, [
                    (p(!0), g(O, null, oe(j.value, (l) => (p(), g("div", {
                      class: L(["w-[180px] h-[130px] mr-[10px] mb-[10px] border hover:border-primary cursor-pointer", { "border-primary": !u.value[s.value] && l.layout == "default" || u.value[s.value] == l.layout }]),
                      onClick: (X) => u.value[s.value] = l.layout
                    }, [
                      e("img", {
                        src: n(S)(l.cover),
                        class: "w-full h-full"
                      }, null, 8, Ae)
                    ], 10, Ee))), 256)),
                    d.value ? (p(), g("div", {
                      key: 0,
                      class: L(["w-[180px] h-[130px] mr-[20px] border hover:border-primary cursor-pointer", { "border-primary": !u.value[s.value] && d.value.layout == "default" || u.value[s.value] == d.value.layout }]),
                      onClick: o[0] || (o[0] = (l) => u.value[s.value] = d.value.layout)
                    }, [
                      e("img", {
                        src: n(S)(d.value.cover),
                        class: "w-full h-full"
                      }, null, 8, Be)
                    ], 2)) : le("", !0)
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
export {
  et as default
};
