import { defineComponent as E, ref as w, reactive as U, computed as K, resolveComponent as p, resolveDirective as P, openBlock as y, createElementBlock as k, createVNode as a, withCtx as n, createElementVNode as t, toDisplayString as _, unref as s, withDirectives as $, createBlock as V, createTextVNode as g, createCommentVNode as h, Fragment as q, pushScopeId as B, popScopeId as O } from "vue";
import { t as i, eC as R, eD as j, _ as Y } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const c = (v) => (B("data-v-a9858369"), v = v(), O(), v), J = { class: "main-container" }, Q = { class: "flex justify-between items-center" }, Z = { class: "text-page-title" }, z = /* @__PURE__ */ c(() => /* @__PURE__ */ t("div", { class: "text-sm text-gray-400 mt-[10px] leading-none" }, "选择地图服务提供商", -1)), G = { class: "flex items-center" }, H = { class: "flex items-center" }, L = /* @__PURE__ */ c(() => /* @__PURE__ */ t("div", { class: "text-sm text-gray-400 mt-[10px] leading-none" }, "天地图服务器端API密钥，用于后端地理编码等服务，请求从业务服务器发起，不支持前端地图瓦片加载与 JS API 渲染。", -1)), W = /* @__PURE__ */ c(() => /* @__PURE__ */ t("div", { class: "text-sm text-gray-400 mt-[10px] leading-none" }, "使用场景：如地理编码、逆地理编码、坐标转换、批量 POI 查询等。", -1)), X = { class: "flex items-center" }, ee = /* @__PURE__ */ c(() => /* @__PURE__ */ t("div", { class: "text-sm text-gray-400 mt-[10px] leading-none" }, "天地图浏览器端API密钥，用于前端加载地图，不可用于后端接口鉴权。", -1)), te = /* @__PURE__ */ c(() => /* @__PURE__ */ t("div", { class: "text-sm text-gray-400 mt-[10px] leading-none" }, "使用场景：展示地图瓦片、实现地图交互（缩放、拖拽、图层切换、标注、可视化展示、地图选位置等）。", -1)), oe = { class: "ml-[10px]" }, le = { class: "ml-[150px] text-sm text-gray-400" }, ae = { class: "fixed-footer-wrap" }, ne = { class: "fixed-footer" }, ie = /* @__PURE__ */ E({
  __name: "map",
  setup(v) {
    const d = w(!0), b = w(), o = U({
      map_type: "tencent",
      key: "",
      tianditu_map_key: "",
      tianditu_map_web_key: "",
      is_open: 0,
      valid_time: 0
    }), C = K(() => ({
      valid_time: [
        {
          required: !0,
          trigger: "blur",
          validator: (r, e, m) => {
            e === "" ? m(new Error(i("validTimePlaceholder"))) : isNaN(e) || !/^\d{0,10}$/.test(e) ? m(new Error(i("validTimeFormatTips"))) : e < 5 ? m(new Error(i("validTimeNotZeroTips"))) : m();
          }
        }
      ]
    }));
    (async () => {
      d.value = !0;
      const r = await (await R()).data;
      Object.assign(o, r), d.value = !1;
    })();
    const T = async (r) => {
      d.value || !r || await r.validate(async (e) => {
        e && (d.value = !0, j(o).then(() => {
          d.value = !1;
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, I = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/tencentMapKey.html");
    }, x = (r) => {
      window.open(r);
    };
    return (r, e) => {
      const m = p("el-radio"), D = p("el-radio-group"), u = p("el-form-item"), f = p("el-input"), F = p("el-switch"), M = p("el-form"), N = p("el-card"), S = p("el-button"), A = P("loading");
      return y(), k("div", J, [
        a(N, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            t("div", Q, [
              t("span", Z, _(s(i)("mapSetting")), 1)
            ]),
            $((y(), V(M, {
              class: "page-form mt-[20px]",
              model: o,
              rules: C.value,
              "label-width": "150px",
              ref_key: "formRef",
              ref: b
            }, {
              default: n(() => [
                a(u, {
                  label: "地图类型",
                  prop: "map_type"
                }, {
                  default: n(() => [
                    t("div", null, [
                      a(D, {
                        modelValue: o.map_type,
                        "onUpdate:modelValue": e[0] || (e[0] = (l) => o.map_type = l)
                      }, {
                        default: n(() => [
                          a(m, { label: "tianditu" }, {
                            default: n(() => [
                              g("天地图")
                            ]),
                            _: 1
                          }),
                          a(m, { label: "tencent" }, {
                            default: n(() => [
                              g("腾讯地图")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      z
                    ])
                  ]),
                  _: 1
                }),
                o.map_type === "tencent" ? (y(), V(u, {
                  key: 0,
                  label: s(i)("mapKey"),
                  prop: "key"
                }, {
                  default: n(() => [
                    t("div", null, [
                      t("div", G, [
                        a(f, {
                          modelValue: o.key,
                          "onUpdate:modelValue": e[1] || (e[1] = (l) => o.key = l),
                          modelModifiers: { trim: !0 },
                          class: "input-width",
                          clearable: ""
                        }, null, 8, ["modelValue"]),
                        t("span", {
                          class: "ml-2 cursor-pointer tutorial-btn",
                          onClick: I
                        }, _(s(i)("clickTutorial")), 1),
                        t("span", {
                          class: "ml-2 cursor-pointer secret-btn",
                          onClick: e[2] || (e[2] = (l) => x("https://lbs.qq.com/dev/console/key/manage"))
                        }, _(s(i)("clickSecretKey")), 1)
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])) : h("", !0),
                o.map_type === "tianditu" ? (y(), k(q, { key: 1 }, [
                  a(u, {
                    label: "天地图服务端KEY",
                    prop: "tianditu_map_key"
                  }, {
                    default: n(() => [
                      t("div", null, [
                        t("div", H, [
                          a(f, {
                            modelValue: o.tianditu_map_key,
                            "onUpdate:modelValue": e[3] || (e[3] = (l) => o.tianditu_map_key = l),
                            modelModifiers: { trim: !0 },
                            class: "input-width",
                            clearable: ""
                          }, null, 8, ["modelValue"]),
                          t("span", {
                            class: "ml-2 cursor-pointer secret-btn",
                            onClick: e[4] || (e[4] = (l) => x("https://cloudcenter.tianditu.gov.cn/center/development/myApp"))
                          }, "获取密钥")
                        ]),
                        L,
                        W
                      ])
                    ]),
                    _: 1
                  }),
                  a(u, {
                    label: "天地图浏览器端KEY",
                    prop: "tianditu_map_web_key"
                  }, {
                    default: n(() => [
                      t("div", null, [
                        t("div", X, [
                          a(f, {
                            modelValue: o.tianditu_map_web_key,
                            "onUpdate:modelValue": e[5] || (e[5] = (l) => o.tianditu_map_web_key = l),
                            modelModifiers: { trim: !0 },
                            class: "input-width",
                            clearable: ""
                          }, null, 8, ["modelValue"]),
                          t("span", {
                            class: "ml-2 cursor-pointer secret-btn",
                            onClick: e[6] || (e[6] = (l) => x("https://cloudcenter.tianditu.gov.cn/center/development/myApp"))
                          }, "获取密钥")
                        ]),
                        ee,
                        te
                      ])
                    ]),
                    _: 1
                  })
                ], 64)) : h("", !0),
                a(u, {
                  label: s(i)("isOpen"),
                  prop: "is_open"
                }, {
                  default: n(() => [
                    a(F, {
                      modelValue: o.is_open,
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => o.is_open = l),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, {
                  label: s(i)("validTime"),
                  prop: "valid_time"
                }, {
                  default: n(() => [
                    a(f, {
                      modelValue: o.valid_time,
                      "onUpdate:modelValue": e[8] || (e[8] = (l) => o.valid_time = l),
                      modelModifiers: { trim: !0 },
                      class: "!w-[120px]"
                    }, null, 8, ["modelValue"]),
                    t("span", oe, _(s(i)("minutes")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t("div", le, _(s(i)("validTimeTips")), 1)
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [A, d.value]
            ])
          ]),
          _: 1
        }),
        t("div", ae, [
          t("div", ne, [
            a(S, {
              type: "primary",
              loading: d.value,
              onClick: e[9] || (e[9] = (l) => T(b.value))
            }, {
              default: n(() => [
                g(_(s(i)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const fe = /* @__PURE__ */ Y(ie, [["__scopeId", "data-v-a9858369"]]);
export {
  fe as default
};
