import { defineComponent as M, ref as h, reactive as w, resolveComponent as u, resolveDirective as N, openBlock as g, createElementBlock as v, withDirectives as V, createBlock as S, withCtx as i, createElementVNode as s, toDisplayString as c, unref as t, createVNode as a, vShow as D, createCommentVNode as I, createTextVNode as E, pushScopeId as re, popScopeId as ne } from "vue";
import { ad as T, t as l, fF as C, fG as q, fH as B, u as F, h as R, a as W } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const K = { class: "main-container" }, L = { class: "form-section form-section--has-header" }, j = { class: "form-section__header" }, A = { class: "form-section__title" }, G = { class: "form-section__body" }, H = { class: "form-tip" }, O = { class: "form-tip" }, $ = { class: "form-section form-section--has-header" }, z = { class: "form-section__header" }, J = { class: "form-section__title" }, Q = { class: "form-section__body" }, X = {
  key: 0,
  class: "form-section form-section--has-header"
}, Y = { class: "form-section__header" }, Z = { class: "form-section__title" }, ee = { class: "form-section__body" }, oe = { class: "fixed-footer-wrap" }, le = { class: "fixed-footer fixed-footer--form" }, te = { class: "fixed-footer__inner fixed-footer__inner--narrow" }, ae = /* @__PURE__ */ M({
  __name: "system",
  setup(de) {
    const m = h(!0), p = h(T()), o = w({
      site_name: "",
      logo: "",
      desc: "",
      latitude: "",
      keywords: "",
      longitude: "",
      province_id: "",
      city_id: "",
      district_id: "",
      address: "",
      full_address: "",
      business_hours: "",
      phone: "",
      front_end_name: "",
      front_end_logo: "",
      front_end_icon: "",
      icon: "",
      wechat_code: "",
      enterprise_wechat: "",
      tel: "",
      site_login_logo: "",
      site_login_bg_img: "",
      meta_title: "",
      meta_desc: "",
      meta_keyword: ""
    });
    (async () => {
      const _ = await (await C()).data;
      Object.keys(o).forEach((r) => {
        _[r] != null && (o[r] = _[r]);
      });
      const e = await (await q()).data;
      o.wechat_code = e.wechat_code, o.enterprise_wechat = e.enterprise_wechat, o.tel = e.tel, o.site_login_logo = e.site_login_logo, o.site_login_bg_img = e.site_login_bg_img, m.value = !1;
    })();
    const b = h(), y = w({
      site_name: [
        { required: !0, message: l("siteNamePlaceholder"), trigger: "blur" }
      ],
      logo: [
        { required: !0, message: l("请选择长方形Logo"), trigger: "blur" }
      ],
      icon: [
        { required: !0, message: l("请选择正方形Logo"), trigger: "blur" }
      ],
      front_end_name: [
        { required: !0, message: l("frontEndNamePlaceholder"), trigger: "blur" }
      ]
    }), x = async (_) => {
      m.value || !_ || await _.validate(async (e) => {
        e && (m.value = !0, B(o).then(() => {
          m.value = !1, p.value == "admin" ? F().getWebsiteInfo() : R().getSiteInfo();
        }).catch(() => {
          m.value = !1;
        }));
      });
    };
    return (_, e) => {
      const r = u("el-input"), n = u("el-form-item"), f = u("upload-image"), k = u("el-form"), U = u("el-button"), P = N("loading");
      return g(), v("div", K, [
        V((g(), S(k, {
          class: "page-form page-form--stacked form-page form-page--narrow loading-box",
          model: o,
          "label-position": "top",
          ref_key: "formRef",
          ref: b,
          rules: y
        }, {
          default: i(() => [
            s("section", L, [
              s("div", j, [
                s("h3", A, c(t(l)("websiteInfo")), 1)
              ]),
              s("div", G, [
                a(n, {
                  label: t(l)("siteName"),
                  prop: "site_name"
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.site_name,
                      "onUpdate:modelValue": e[0] || (e[0] = (d) => o.site_name = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("siteNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("logo"),
                  prop: "logo"
                }, {
                  default: i(() => [
                    s("div", null, [
                      a(f, {
                        modelValue: o.logo,
                        "onUpdate:modelValue": e[1] || (e[1] = (d) => o.logo = d)
                      }, null, 8, ["modelValue"]),
                      s("p", H, c(t(l)("logoPlaceholder")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("icon"),
                  prop: "icon"
                }, {
                  default: i(() => [
                    s("div", null, [
                      a(f, {
                        modelValue: o.icon,
                        "onUpdate:modelValue": e[2] || (e[2] = (d) => o.icon = d)
                      }, null, 8, ["modelValue"]),
                      s("p", O, c(t(l)("iconPlaceholder")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("keywords")
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.keywords,
                      "onUpdate:modelValue": e[3] || (e[3] = (d) => o.keywords = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("keywordsPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("desc"),
                  class: "form-item--wide"
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.desc,
                      "onUpdate:modelValue": e[4] || (e[4] = (d) => o.desc = d),
                      modelModifiers: { trim: !0 },
                      type: "textarea",
                      rows: 4,
                      clearable: "",
                      placeholder: t(l)("descPlaceholder"),
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ]),
            V(s("section", $, [
              s("div", z, [
                s("h3", J, c(t(l)("frontEndInfo")), 1)
              ]),
              s("div", Q, [
                a(n, {
                  label: t(l)("frontEndName")
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.front_end_name,
                      "onUpdate:modelValue": e[5] || (e[5] = (d) => o.front_end_name = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("frontEndNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("phone")
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.phone,
                      "onUpdate:modelValue": e[6] || (e[6] = (d) => o.phone = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("phonePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("logo")
                }, {
                  default: i(() => [
                    a(f, {
                      modelValue: o.front_end_logo,
                      "onUpdate:modelValue": e[7] || (e[7] = (d) => o.front_end_logo = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("icon")
                }, {
                  default: i(() => [
                    a(f, {
                      modelValue: o.front_end_icon,
                      "onUpdate:modelValue": e[8] || (e[8] = (d) => o.front_end_icon = d)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("metaTitle"),
                  class: "form-item--wide"
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.meta_title,
                      "onUpdate:modelValue": e[9] || (e[9] = (d) => o.meta_title = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("MetaPlaceholder"),
                      clearable: "",
                      maxlength: "40",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("metaDescription"),
                  class: "form-item--wide"
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.meta_desc,
                      "onUpdate:modelValue": e[10] || (e[10] = (d) => o.meta_desc = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("metaDescriptionPlaceholder"),
                      clearable: "",
                      maxlength: "200",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(n, {
                  label: t(l)("metaKeywords"),
                  class: "form-item--wide"
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.meta_keyword,
                      "onUpdate:modelValue": e[11] || (e[11] = (d) => o.meta_keyword = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("metaKeywordsPlaceholder"),
                      clearable: "",
                      maxlength: "200",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ], 512), [
              [D, p.value == "site"]
            ]),
            p.value == "admin" ? (g(), v("section", X, [
              s("div", Y, [
                s("h3", Z, c(t(l)("serviceInformation")), 1)
              ]),
              s("div", ee, [
                a(n, {
                  label: t(l)("contactsTel")
                }, {
                  default: i(() => [
                    a(r, {
                      modelValue: o.tel,
                      "onUpdate:modelValue": e[12] || (e[12] = (d) => o.tel = d),
                      modelModifiers: { trim: !0 },
                      placeholder: t(l)("contactsTelPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ])) : I("", !0)
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [P, m.value]
        ]),
        s("div", oe, [
          s("div", le, [
            s("div", te, [
              a(U, {
                type: "primary",
                loading: m.value,
                onClick: e[13] || (e[13] = (d) => x(b.value))
              }, {
                default: i(() => [
                  E(c(t(l)("save")), 1)
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
const ge = /* @__PURE__ */ W(ae, [["__scopeId", "data-v-aeb0617a"]]);
export {
  ge as default
};
