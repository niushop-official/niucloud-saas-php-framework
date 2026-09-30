import { defineComponent as L, ref as g, reactive as U, computed as B, resolveComponent as _, resolveDirective as q, openBlock as d, createElementBlock as k, withDirectives as O, createBlock as f, unref as n, withCtx as l, createElementVNode as e, Fragment as V, renderList as R, normalizeClass as z, createVNode as i, resolveDynamicComponent as C, toDisplayString as p, createTextVNode as T, createCommentVNode as w, pushScopeId as J, popScopeId as W } from "vue";
import { t as a, f5 as Y, f6 as j, a as Q } from "./core-shared-c6ad4e77.js";
import { Location as I, MapLocation as S } from "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const v = (y) => (J("data-v-c629c90e"), y = y(), W(), y), Z = { class: "main-container" }, G = { class: "form-section form-section--has-header" }, H = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "form-section__header" }, [
  /* @__PURE__ */ e("h3", { class: "form-section__title" }, "地图类型")
], -1)), X = { class: "form-section__body map-type-list" }, ee = ["onClick"], te = { class: "flex-1 min-w-0 ml-[10px]" }, oe = { class: "flex items-center min-w-0" }, se = { class: "text-[14px] font-bold leading-[22px] truncate" }, ie = { class: "text-[12px] leading-[18px] text-[var(--el-text-color-secondary)] mt-[2px] truncate" }, ne = { class: "form-section form-section--has-header" }, ae = { class: "flex items-center form-section__header" }, le = { class: "form-section__title !leading-[17px] !ml-[5px]" }, re = { class: "form-section__body" }, ce = { class: "flex items-center" }, de = { class: "flex items-center" }, pe = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "form-tip" }, "天地图服务器端API密钥，用于后端地理编码等服务，请求从业务服务器发起，不支持前端地图瓦片加载与 JS API 渲染。", -1)), me = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "form-tip" }, "使用场景：如地理编码、逆地理编码、坐标转换、批量 POI 查询等。", -1)), _e = { class: "flex items-center" }, ue = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "form-tip" }, "天地图浏览器端API密钥，用于前端加载地图，不可用于后端接口鉴权。", -1)), fe = /* @__PURE__ */ v(() => /* @__PURE__ */ e("div", { class: "form-tip" }, "使用场景：展示地图瓦片、实现地图交互（缩放、拖拽、图层切换、标注、可视化展示、地图选位置等）。", -1)), ve = { class: "ml-[10px]" }, ye = { class: "form-tip" }, he = { class: "fixed-footer-wrap" }, xe = { class: "fixed-footer fixed-footer--form" }, ke = { class: "fixed-footer__inner fixed-footer__inner--narrow" }, we = /* @__PURE__ */ L({
  __name: "map",
  setup(y) {
    const r = g(!0), b = g(), s = U({
      map_type: "tencent",
      key: "",
      tianditu_map_key: "",
      tianditu_map_web_key: "",
      is_open: 0,
      valid_time: 0
    }), A = [
      {
        value: "tianditu",
        name: "天地图",
        desc: "国家地理信息公共服务平台 Web API 4.0",
        icon: S
      },
      {
        value: "tencent",
        name: "腾讯地图",
        desc: "腾讯位置服务 LBS WebService / JavaScript API",
        icon: I
      }
    ], M = B(() => ({
      valid_time: [
        {
          required: !0,
          trigger: "blur",
          validator: (c, t, m) => {
            t === "" ? m(new Error(a("validTimePlaceholder"))) : isNaN(t) || !/^\d{0,10}$/.test(t) ? m(new Error(a("validTimeFormatTips"))) : t < 5 ? m(new Error(a("validTimeNotZeroTips"))) : m();
          }
        }
      ]
    }));
    (async () => {
      r.value = !0;
      const c = await (await Y()).data;
      Object.assign(s, c), r.value = !1;
    })();
    const D = async (c) => {
      r.value || !c || await c.validate(async (t) => {
        t && (r.value = !0, j(s).then(() => {
          r.value = !1;
        }).catch(() => {
          r.value = !1;
        }));
      });
    }, F = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/tencentMapKey.html");
    }, x = (c) => {
      window.open(c);
    };
    return (c, t) => {
      const m = _("el-icon"), N = _("el-tag"), h = _("el-input"), u = _("el-form-item"), P = _("el-switch"), E = _("el-form"), $ = _("el-button"), K = q("loading");
      return d(), k("div", Z, [
        O((d(), f(E, {
          class: "page-form page-form--stacked form-page form-page--narrow",
          model: s,
          rules: n(M),
          "label-position": "top",
          ref_key: "formRef",
          ref: b
        }, {
          default: l(() => [
            e("section", G, [
              H,
              e("div", X, [
                (d(), k(V, null, R(A, (o) => e("div", {
                  key: o.value,
                  class: z(["map-type-item", { "is-active": s.map_type === o.value }]),
                  onClick: (ge) => s.map_type = o.value
                }, [
                  i(m, { class: "map-type-icon" }, {
                    default: l(() => [
                      (d(), f(C(o.icon)))
                    ]),
                    _: 2
                  }, 1024),
                  e("div", te, [
                    e("div", oe, [
                      e("span", se, p(o.name), 1),
                      s.map_type === o.value ? (d(), f(N, {
                        key: 0,
                        type: "primary",
                        size: "small",
                        class: "ml-[6px] shrink-0"
                      }, {
                        default: l(() => [
                          T("当前")
                        ]),
                        _: 1
                      })) : w("", !0)
                    ]),
                    e("div", ie, p(o.desc), 1)
                  ])
                ], 10, ee)), 64))
              ])
            ]),
            e("section", ne, [
              e("div", ae, [
                i(m, { class: "text-[20px]" }, {
                  default: l(() => [
                    (d(), f(C(s.map_type === "tencent" ? n(I) : n(S))))
                  ]),
                  _: 1
                }),
                e("h3", le, p(s.map_type === "tencent" ? "腾讯地图配置" : "天地图配置"), 1)
              ]),
              e("div", re, [
                s.map_type === "tencent" ? (d(), f(u, {
                  key: 0,
                  label: n(a)("mapKey"),
                  prop: "key"
                }, {
                  default: l(() => [
                    e("div", null, [
                      e("div", ce, [
                        i(h, {
                          modelValue: s.key,
                          "onUpdate:modelValue": t[0] || (t[0] = (o) => s.key = o),
                          modelModifiers: { trim: !0 },
                          class: "input-width",
                          clearable: ""
                        }, null, 8, ["modelValue"]),
                        e("span", {
                          class: "ml-2 cursor-pointer tutorial-btn",
                          onClick: F
                        }, p(n(a)("clickTutorial")), 1),
                        e("span", {
                          class: "ml-2 cursor-pointer secret-btn",
                          onClick: t[1] || (t[1] = (o) => x("https://lbs.qq.com/dev/console/key/manage"))
                        }, p(n(a)("clickSecretKey")), 1)
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])) : w("", !0),
                s.map_type === "tianditu" ? (d(), k(V, { key: 1 }, [
                  i(u, {
                    label: "天地图服务端KEY",
                    prop: "tianditu_map_key"
                  }, {
                    default: l(() => [
                      e("div", null, [
                        e("div", de, [
                          i(h, {
                            modelValue: s.tianditu_map_key,
                            "onUpdate:modelValue": t[2] || (t[2] = (o) => s.tianditu_map_key = o),
                            modelModifiers: { trim: !0 },
                            class: "input-width",
                            clearable: ""
                          }, null, 8, ["modelValue"]),
                          e("span", {
                            class: "ml-2 cursor-pointer secret-btn",
                            onClick: t[3] || (t[3] = (o) => x("https://cloudcenter.tianditu.gov.cn/center/development/myApp"))
                          }, "获取密钥")
                        ]),
                        pe,
                        me
                      ])
                    ]),
                    _: 1
                  }),
                  i(u, {
                    label: "天地图浏览器端KEY",
                    prop: "tianditu_map_web_key"
                  }, {
                    default: l(() => [
                      e("div", null, [
                        e("div", _e, [
                          i(h, {
                            modelValue: s.tianditu_map_web_key,
                            "onUpdate:modelValue": t[4] || (t[4] = (o) => s.tianditu_map_web_key = o),
                            modelModifiers: { trim: !0 },
                            class: "input-width",
                            clearable: ""
                          }, null, 8, ["modelValue"]),
                          e("span", {
                            class: "ml-2 cursor-pointer secret-btn",
                            onClick: t[5] || (t[5] = (o) => x("https://cloudcenter.tianditu.gov.cn/center/development/myApp"))
                          }, "获取密钥")
                        ]),
                        ue,
                        fe
                      ])
                    ]),
                    _: 1
                  })
                ], 64)) : w("", !0),
                i(u, {
                  label: n(a)("isOpen"),
                  prop: "is_open"
                }, {
                  default: l(() => [
                    i(P, {
                      modelValue: s.is_open,
                      "onUpdate:modelValue": t[6] || (t[6] = (o) => s.is_open = o),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                i(u, {
                  label: n(a)("validTime"),
                  prop: "valid_time"
                }, {
                  default: l(() => [
                    i(h, {
                      modelValue: s.valid_time,
                      "onUpdate:modelValue": t[7] || (t[7] = (o) => s.valid_time = o),
                      modelModifiers: { trim: !0 },
                      class: "!w-[120px]"
                    }, null, 8, ["modelValue"]),
                    e("span", ve, p(n(a)("minutes")), 1),
                    e("div", ye, p(n(a)("validTimeTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ])
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [K, r.value]
        ]),
        e("div", he, [
          e("div", xe, [
            e("div", ke, [
              i($, {
                type: "primary",
                loading: r.value,
                onClick: t[8] || (t[8] = (o) => D(b.value))
              }, {
                default: l(() => [
                  T(p(n(a)("save")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ])
        ])
      ]);
    };
  }
});
const Fe = /* @__PURE__ */ Q(we, [["__scopeId", "data-v-c629c90e"]]);
export {
  Fe as default
};
