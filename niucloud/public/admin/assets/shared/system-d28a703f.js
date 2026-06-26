import { defineComponent as N, ref as b, reactive as w, resolveComponent as _, resolveDirective as M, openBlock as g, createElementBlock as V, withDirectives as x, createBlock as D, withCtx as r, createVNode as t, createElementVNode as n, toDisplayString as u, unref as a, vShow as S, createCommentVNode as C, createTextVNode as I } from "vue";
import { W as T, t as o, f5 as q, f6 as R, f7 as W, ck as B, u as A, _ as K } from "./core-shared-ca1fcae5.js";
import { useRoute as L } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const j = { class: "main-container" }, O = { class: "text-[16px] text-[#1D1F3A] font-bold mb-4" }, $ = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, z = { class: "text-[12px] text-[#a9a9a9]" }, G = { class: "text-[12px] text-[#a9a9a9]" }, H = { class: "mt-[20px]" }, J = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, Q = {
  key: 0,
  class: "mt-[20px]"
}, X = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, Y = { class: "fixed-footer-wrap" }, Z = { class: "fixed-footer" }, ee = /* @__PURE__ */ N({
  __name: "system",
  setup(le) {
    const v = L().meta.title, m = b(!0), f = b(T()), l = w({
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
      const p = await (await q()).data;
      Object.keys(l).forEach((i) => {
        p[i] != null && (l[i] = p[i]);
      });
      const e = await (await R()).data;
      l.wechat_code = e.wechat_code, l.enterprise_wechat = e.enterprise_wechat, l.tel = e.tel, l.site_login_logo = e.site_login_logo, l.site_login_bg_img = e.site_login_bg_img, m.value = !1;
    })();
    const h = b(), y = w({
      site_name: [
        { required: !0, message: o("siteNamePlaceholder"), trigger: "blur" }
      ],
      logo: [
        { required: !0, message: o("请选择长方形Logo"), trigger: "blur" }
      ],
      icon: [
        { required: !0, message: o("请选择正方形Logo"), trigger: "blur" }
      ],
      front_end_name: [
        { required: !0, message: o("frontEndNamePlaceholder"), trigger: "blur" }
      ]
    }), U = async (p) => {
      m.value || !p || await p.validate(async (e) => {
        e && (m.value = !0, W(l).then(() => {
          m.value = !1, f.value == "admin" ? B().getWebsiteInfo() : A().getSiteInfo();
        }).catch(() => {
          m.value = !1;
        }));
      });
    };
    return (p, e) => {
      const i = _("el-input"), s = _("el-form-item"), c = _("upload-image"), E = _("el-card"), k = _("el-form"), P = _("el-button"), F = M("loading");
      return g(), V("div", j, [
        x((g(), D(k, {
          class: "page-form loading-box",
          model: l,
          "label-width": "150px",
          ref_key: "formRef",
          ref: h,
          rules: y
        }, {
          default: r(() => [
            t(E, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: r(() => [
                n("h3", O, u(a(v)), 1),
                n("h3", $, u(a(o)("websiteInfo")), 1),
                t(s, {
                  label: a(o)("siteName"),
                  prop: "site_name"
                }, {
                  default: r(() => [
                    t(i, {
                      modelValue: l.site_name,
                      "onUpdate:modelValue": e[0] || (e[0] = (d) => l.site_name = d),
                      modelModifiers: { trim: !0 },
                      placeholder: a(o)("siteNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(s, {
                  label: a(o)("logo"),
                  prop: "logo"
                }, {
                  default: r(() => [
                    n("div", null, [
                      t(c, {
                        modelValue: l.logo,
                        "onUpdate:modelValue": e[1] || (e[1] = (d) => l.logo = d)
                      }, null, 8, ["modelValue"]),
                      n("p", z, u(a(o)("logoPlaceholder")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(s, {
                  label: a(o)("icon"),
                  prop: "icon"
                }, {
                  default: r(() => [
                    n("div", null, [
                      t(c, {
                        modelValue: l.icon,
                        "onUpdate:modelValue": e[2] || (e[2] = (d) => l.icon = d)
                      }, null, 8, ["modelValue"]),
                      n("p", G, u(a(o)("iconPlaceholder")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(s, {
                  label: a(o)("keywords")
                }, {
                  default: r(() => [
                    t(i, {
                      modelValue: l.keywords,
                      "onUpdate:modelValue": e[3] || (e[3] = (d) => l.keywords = d),
                      modelModifiers: { trim: !0 },
                      placeholder: a(o)("keywordsPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(s, {
                  label: a(o)("desc")
                }, {
                  default: r(() => [
                    t(i, {
                      modelValue: l.desc,
                      "onUpdate:modelValue": e[4] || (e[4] = (d) => l.desc = d),
                      modelModifiers: { trim: !0 },
                      type: "textarea",
                      rows: 4,
                      clearable: "",
                      placeholder: a(o)("descPlaceholder"),
                      class: "input-width",
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                x(n("div", H, [
                  n("h3", J, u(a(o)("frontEndInfo")), 1),
                  t(s, {
                    label: a(o)("frontEndName")
                  }, {
                    default: r(() => [
                      t(i, {
                        modelValue: l.front_end_name,
                        "onUpdate:modelValue": e[5] || (e[5] = (d) => l.front_end_name = d),
                        modelModifiers: { trim: !0 },
                        placeholder: a(o)("frontEndNamePlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("phone")
                  }, {
                    default: r(() => [
                      t(i, {
                        modelValue: l.phone,
                        "onUpdate:modelValue": e[6] || (e[6] = (d) => l.phone = d),
                        modelModifiers: { trim: !0 },
                        placeholder: a(o)("phonePlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("logo")
                  }, {
                    default: r(() => [
                      t(c, {
                        modelValue: l.front_end_logo,
                        "onUpdate:modelValue": e[7] || (e[7] = (d) => l.front_end_logo = d)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("icon")
                  }, {
                    default: r(() => [
                      t(c, {
                        modelValue: l.front_end_icon,
                        "onUpdate:modelValue": e[8] || (e[8] = (d) => l.front_end_icon = d)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("metaTitle")
                  }, {
                    default: r(() => [
                      t(i, {
                        modelValue: l.meta_title,
                        "onUpdate:modelValue": e[9] || (e[9] = (d) => l.meta_title = d),
                        modelModifiers: { trim: !0 },
                        placeholder: a(o)("MetaPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "40",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("metaDescription")
                  }, {
                    default: r(() => [
                      t(i, {
                        modelValue: l.meta_desc,
                        "onUpdate:modelValue": e[10] || (e[10] = (d) => l.meta_desc = d),
                        modelModifiers: { trim: !0 },
                        placeholder: a(o)("metaDescriptionPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "200",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("metaKeywords")
                  }, {
                    default: r(() => [
                      t(i, {
                        modelValue: l.meta_keyword,
                        "onUpdate:modelValue": e[11] || (e[11] = (d) => l.meta_keyword = d),
                        modelModifiers: { trim: !0 },
                        placeholder: a(o)("metaKeywordsPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "200",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ], 512), [
                  [S, f.value == "site"]
                ]),
                f.value == "admin" ? (g(), V("div", Q, [
                  n("h3", X, u(a(o)("serviceInformation")), 1),
                  t(s, {
                    label: a(o)("contactsTel")
                  }, {
                    default: r(() => [
                      t(i, {
                        modelValue: l.tel,
                        "onUpdate:modelValue": e[12] || (e[12] = (d) => l.tel = d),
                        modelModifiers: { trim: !0 },
                        placeholder: a(o)("contactsTelPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("wechatCode")
                  }, {
                    default: r(() => [
                      t(c, {
                        modelValue: l.wechat_code,
                        "onUpdate:modelValue": e[13] || (e[13] = (d) => l.wechat_code = d)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(s, {
                    label: a(o)("customerServiceCode")
                  }, {
                    default: r(() => [
                      t(c, {
                        modelValue: l.enterprise_wechat,
                        "onUpdate:modelValue": e[14] || (e[14] = (d) => l.enterprise_wechat = d)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])) : C("", !0)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [F, m.value]
        ]),
        n("div", Y, [
          n("div", Z, [
            t(P, {
              type: "primary",
              loading: m.value,
              onClick: e[15] || (e[15] = (d) => U(h.value))
            }, {
              default: r(() => [
                I(u(a(o)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const pe = /* @__PURE__ */ K(ee, [["__scopeId", "data-v-b4ee6768"]]);
export {
  pe as default
};
