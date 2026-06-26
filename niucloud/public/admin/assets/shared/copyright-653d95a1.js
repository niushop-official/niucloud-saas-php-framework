import { defineComponent as U, ref as f, reactive as g, resolveComponent as u, resolveDirective as C, openBlock as v, createElementBlock as E, withDirectives as D, createBlock as F, withCtx as i, createVNode as r, createElementVNode as d, toDisplayString as n, unref as l, createTextVNode as M } from "vue";
import { t as o, eg as R, eh as N } from "./core-shared-ca1fcae5.js";
import { useRoute as B } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const S = { class: "main-container" }, L = { class: "text-[16px] text-[#1D1F3A] font-bold mb-4" }, O = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, $ = { class: "mt-[20px]" }, j = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, A = { class: "form-tip" }, I = { class: "form-tip" }, T = { class: "form-tip" }, q = { class: "form-tip" }, z = { class: "fixed-footer-wrap" }, G = { class: "fixed-footer" }, te = /* @__PURE__ */ U({
  __name: "copyright",
  setup(H) {
    const b = B().meta.title, p = f(!0), t = g({
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
      }), p.value = !1;
    })();
    const h = f(), y = g({
      copyright_link: [
        {
          validator(c, e, _) {
            if (!e)
              return _();
            /^.*?(http|https).*?$/i.test(e) ? _() : _(new Error("链接必须包含 http 或 https"));
          },
          trigger: "blur"
        }
      ]
    }), V = async (c) => {
      p.value || !c || await c.validate(async (e) => {
        e && (p.value = !0, N(t).then(() => {
          p.value = !1;
        }).catch(() => {
          p.value = !1;
        }));
      });
    };
    return (c, e) => {
      const _ = u("upload-image"), s = u("el-form-item"), m = u("el-input"), x = u("el-card"), w = u("el-form"), k = u("el-button"), P = C("loading");
      return v(), E("div", S, [
        D((v(), F(w, {
          class: "page-form",
          model: t,
          "label-width": "150px",
          ref_key: "formRef",
          ref: h,
          rules: y
        }, {
          default: i(() => [
            r(x, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: i(() => [
                d("h3", L, n(l(b)), 1),
                d("h3", O, n(l(o)("copyrightEdit")), 1),
                r(s, {
                  label: l(o)("logo")
                }, {
                  default: i(() => [
                    r(_, {
                      modelValue: t.logo,
                      "onUpdate:modelValue": e[0] || (e[0] = (a) => t.logo = a)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(s, {
                  label: l(o)("companyName"),
                  prop: "company_name"
                }, {
                  default: i(() => [
                    r(m, {
                      modelValue: t.company_name,
                      "onUpdate:modelValue": e[1] || (e[1] = (a) => t.company_name = a),
                      modelModifiers: { trim: !0 },
                      placeholder: l(o)("companyNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(s, {
                  label: l(o)("copyrightLink"),
                  prop: "copyright_link"
                }, {
                  default: i(() => [
                    r(m, {
                      modelValue: t.copyright_link,
                      "onUpdate:modelValue": e[2] || (e[2] = (a) => t.copyright_link = a),
                      modelModifiers: { trim: !0 },
                      placeholder: l(o)("copyrightLinkPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(s, {
                  label: l(o)("copyrightDesc")
                }, {
                  default: i(() => [
                    r(m, {
                      modelValue: t.copyright_desc,
                      "onUpdate:modelValue": e[3] || (e[3] = (a) => t.copyright_desc = a),
                      modelModifiers: { trim: !0 },
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      placeholder: l(o)("copyrightDescPlaceholder"),
                      class: "input-width",
                      maxlength: "150"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                d("div", $, [
                  d("h3", j, n(l(o)("putOnRecordEdit")), 1),
                  r(s, {
                    label: l(o)("icp"),
                    prop: "icp"
                  }, {
                    default: i(() => [
                      r(m, {
                        modelValue: t.icp,
                        "onUpdate:modelValue": e[4] || (e[4] = (a) => t.icp = a),
                        modelModifiers: { trim: !0 },
                        placeholder: l(o)("icpPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "20"
                      }, null, 8, ["modelValue", "placeholder"]),
                      d("div", A, n(l(o)("网站的ICP备案号,显示在PC端底部")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(s, {
                    label: l(o)("govRecord")
                  }, {
                    default: i(() => [
                      r(m, {
                        modelValue: t.gov_record,
                        "onUpdate:modelValue": e[5] || (e[5] = (a) => t.gov_record = a),
                        modelModifiers: { trim: !0 },
                        placeholder: l(o)("govRecordPlaceholder"),
                        class: "input-width",
                        clearable: "",
                        maxlength: "50"
                      }, null, 8, ["modelValue", "placeholder"]),
                      d("div", I, n(l(o)("公安部门登记的备案信息,显示在PC底部")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(s, {
                    label: l(o)("govUrl")
                  }, {
                    default: i(() => [
                      r(m, {
                        modelValue: t.gov_url,
                        "onUpdate:modelValue": e[6] || (e[6] = (a) => t.gov_url = a),
                        modelModifiers: { trim: !0 },
                        placeholder: l(o)("govUrlPlaceholder"),
                        class: "input-width",
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"]),
                      d("div", T, n(l(o)("PC底部显示的网站公安点击跳转的链接")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  r(s, {
                    label: l(o)("marketSupervisionUrl")
                  }, {
                    default: i(() => [
                      r(m, {
                        modelValue: t.market_supervision_url,
                        "onUpdate:modelValue": e[7] || (e[7] = (a) => t.market_supervision_url = a),
                        modelModifiers: { trim: !0 },
                        rows: "4",
                        clearable: "",
                        placeholder: l(o)("marketSupervisionUrlPlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"]),
                      d("div", q, n(l(o)("PC底部显示的市场监督管理局点击跳转的链接")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [P, p.value]
        ]),
        d("div", z, [
          d("div", G, [
            r(k, {
              type: "primary",
              loading: p.value,
              onClick: e[8] || (e[8] = (a) => V(h.value))
            }, {
              default: i(() => [
                M(n(l(o)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
export {
  te as default
};
