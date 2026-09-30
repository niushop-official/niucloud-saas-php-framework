import { defineComponent as x, ref as h, reactive as g, resolveComponent as _, resolveDirective as P, openBlock as v, createElementBlock as U, withDirectives as C, createBlock as D, withCtx as s, createElementVNode as i, toDisplayString as p, unref as o, createVNode as r, createTextVNode as M } from "vue";
import { t as l, eQ as R, eR as E } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const N = { class: "main-container" }, B = { class: "form-section form-section--has-header" }, S = { class: "form-section__header" }, F = { class: "form-section__title" }, L = { class: "form-section__body" }, O = { class: "form-section form-section--has-header" }, $ = { class: "form-section__header" }, j = { class: "form-section__title" }, I = { class: "form-section__body" }, Q = { class: "form-tip" }, T = { class: "form-tip" }, q = { class: "form-tip" }, z = { class: "form-tip" }, A = { class: "fixed-footer-wrap" }, G = { class: "fixed-footer fixed-footer--form" }, H = { class: "fixed-footer__inner fixed-footer__inner--narrow" }, re = /* @__PURE__ */ x({
  __name: "copyright",
  setup(J) {
    const n = h(!0), t = g({
      icp: "",
      gov_record: "",
      gov_url: "",
      market_supervision_url: "",
      logo: "",
      company_name: "",
      copyright_link: "",
      copyright_desc: ""
    });
    (async () => {
      const c = await (await R()).data;
      Object.keys(t).forEach((e) => {
        c[e] != null && (t[e] = c[e]);
      }), n.value = !1;
    })();
    const f = h(), y = g({
      copyright_link: [
        {
          validator(c, e, u) {
            if (!e)
              return u();
            /^.*?(http|https).*?$/i.test(e) ? u() : u(new Error("链接必须包含 http 或 https"));
          },
          trigger: "blur"
        }
      ]
    }), b = async (c) => {
      n.value || !c || await c.validate(async (e) => {
        e && (n.value = !0, E(t).then(() => {
          n.value = !1;
        }).catch(() => {
          n.value = !1;
        }));
      });
    };
    return (c, e) => {
      const u = _("upload-image"), d = _("el-form-item"), m = _("el-input"), V = _("el-form"), w = _("el-button"), k = P("loading");
      return v(), U("div", N, [
        C((v(), D(V, {
          class: "page-form page-form--stacked form-page form-page--narrow",
          model: t,
          "label-position": "top",
          ref_key: "formRef",
          ref: f,
          rules: y
        }, {
          default: s(() => [
            i("section", B, [
              i("div", S, [
                i("h3", F, p(o(l)("copyrightEdit")), 1)
              ]),
              i("div", L, [
                r(d, {
                  label: o(l)("logo")
                }, {
                  default: s(() => [
                    r(u, {
                      modelValue: t.logo,
                      "onUpdate:modelValue": e[0] || (e[0] = (a) => t.logo = a)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(d, {
                  label: o(l)("companyName"),
                  prop: "company_name"
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.company_name,
                      "onUpdate:modelValue": e[1] || (e[1] = (a) => t.company_name = a),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("companyNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(d, {
                  label: o(l)("copyrightLink"),
                  prop: "copyright_link"
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.copyright_link,
                      "onUpdate:modelValue": e[2] || (e[2] = (a) => t.copyright_link = a),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("copyrightLinkPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(d, {
                  label: o(l)("copyrightDesc"),
                  class: "form-item--wide"
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.copyright_desc,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => t.copyright_desc = a),
                      modelModifiers: { trim: !0 },
                      type: "textarea",
                      rows: 4,
                      clearable: "",
                      placeholder: o(l)("copyrightDescPlaceholder"),
                      maxlength: "150",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ]),
            i("section", O, [
              i("div", $, [
                i("h3", j, p(o(l)("putOnRecordEdit")), 1)
              ]),
              i("div", I, [
                r(d, {
                  label: o(l)("icp"),
                  prop: "icp"
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.icp,
                      "onUpdate:modelValue": e[4] || (e[4] = (a) => t.icp = a),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("icpPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "20"
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", Q, p(o(l)("网站的ICP备案号,显示在PC端底部")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(d, {
                  label: o(l)("govRecord")
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.gov_record,
                      "onUpdate:modelValue": e[5] || (e[5] = (a) => t.gov_record = a),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("govRecordPlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "50"
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", T, p(o(l)("公安部门登记的备案信息,显示在PC底部")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(d, {
                  label: o(l)("govUrl")
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.gov_url,
                      "onUpdate:modelValue": e[6] || (e[6] = (a) => t.gov_url = a),
                      modelModifiers: { trim: !0 },
                      placeholder: o(l)("govUrlPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", q, p(o(l)("PC底部显示的网站公安点击跳转的链接")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(d, {
                  label: o(l)("marketSupervisionUrl")
                }, {
                  default: s(() => [
                    r(m, {
                      modelValue: t.market_supervision_url,
                      "onUpdate:modelValue": e[7] || (e[7] = (a) => t.market_supervision_url = a),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: o(l)("marketSupervisionUrlPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"]),
                    i("div", z, p(o(l)("PC底部显示的市场监督管理局点击跳转的链接")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ])
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [k, n.value]
        ]),
        i("div", A, [
          i("div", G, [
            i("div", H, [
              r(w, {
                type: "primary",
                loading: n.value,
                onClick: e[8] || (e[8] = (a) => b(f.value))
              }, {
                default: s(() => [
                  M(p(o(l)("save")), 1)
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
export {
  re as default
};
