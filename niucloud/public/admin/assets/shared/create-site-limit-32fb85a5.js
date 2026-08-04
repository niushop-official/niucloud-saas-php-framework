import { defineComponent as R, ref as v, computed as F, watch as M, resolveComponent as s, resolveDirective as T, openBlock as p, createBlock as g, unref as a, withCtx as r, createElementVNode as C, createVNode as m, createTextVNode as b, toDisplayString as f, withDirectives as Z, createElementBlock as y, Fragment as $, renderList as j, createCommentVNode as E } from "vue";
import { t as l, fl as I, fm as O, fn as z } from "./core-shared-5b3bfa35.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const A = {
  key: 0,
  class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"
}, H = { class: "dialog-footer" }, le = /* @__PURE__ */ R({
  __name: "create-site-limit",
  props: {
    siteGroup: {
      type: Object,
      default: () => ({})
    },
    uid: {
      type: Number,
      default: 0
    }
  },
  emits: ["complete"],
  setup(w, { expose: L, emit: S }) {
    const c = w, u = v(!1), V = v(null), t = v({
      id: 0,
      uid: c.uid,
      group_id: "",
      num: 1,
      month: 1
    }), d = v(!1), N = F(() => ({
      group_id: [
        { required: !0, message: l("siteGroupPlaceholder"), trigger: "blur" }
      ],
      num: [
        { required: !0, message: l("numPlaceholder"), trigger: "blur" },
        {
          validator: (i, e, n) => {
            e <= 0 && n(l("numCannotLtZero")), n();
          }
        }
      ],
      month: [
        { required: !0, message: l("monthPlaceholder"), trigger: "blur" },
        {
          validator: (i, e, n) => {
            e <= 0 && n(l("monthCannotLtZero")), n();
          }
        }
      ]
    })), U = S, D = async (i) => {
      d.value || !i || await i.validate(async (e) => {
        e && (d.value = !0, (t.value.id ? I : O)(t.value).then(() => {
          d.value = !1, u.value = !1, U("complete");
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, G = (i = 0) => {
      i ? z(i).then(({ data: e }) => {
        t.value = e, u.value = !0;
      }) : u.value = !0;
    };
    return M(() => u.value, () => {
      u.value || (t.value = {
        id: 0,
        uid: c.uid,
        group_id: "",
        num: 1,
        month: 1
      });
    }), L({
      setFormData: G,
      loading: d
    }), (i, e) => {
      const n = s("el-option"), k = s("el-select"), _ = s("el-form-item"), h = s("el-input"), P = s("el-form"), x = s("el-button"), q = s("el-dialog"), B = T("loading");
      return p(), g(q, {
        modelValue: u.value,
        "onUpdate:modelValue": e[5] || (e[5] = (o) => u.value = o),
        title: a(l)("userCreateSiteLimit"),
        width: "700px",
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          C("span", H, [
            m(x, {
              onClick: e[3] || (e[3] = (o) => u.value = !1)
            }, {
              default: r(() => [
                b(f(a(l)("cancel")), 1)
              ]),
              _: 1
            }),
            m(x, {
              type: "primary",
              loading: d.value,
              onClick: e[4] || (e[4] = (o) => D(V.value))
            }, {
              default: r(() => [
                b(f(a(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: r(() => [
          Z((p(), g(P, {
            model: t.value,
            "label-width": "130px",
            ref_key: "formRef",
            ref: V,
            rules: N.value,
            class: "page-form",
            autocomplete: "off"
          }, {
            default: r(() => [
              m(_, {
                label: a(l)("siteGroup"),
                prop: "group_id"
              }, {
                default: r(() => [
                  m(k, {
                    modelValue: t.value.group_id,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => t.value.group_id = o),
                    placeholder: a(l)("siteGroupPlaceholder"),
                    disabled: t.value.id
                  }, {
                    default: r(() => [
                      (p(!0), y($, null, j(c.siteGroup, (o) => (p(), g(n, {
                        label: o.group_name,
                        value: o.group_id
                      }, null, 8, ["label", "value"]))), 256))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder", "disabled"])
                ]),
                _: 1
              }, 8, ["label"]),
              m(_, {
                label: a(l)("createSiteNum"),
                prop: "num"
              }, {
                default: r(() => [
                  C("div", null, [
                    m(h, {
                      modelValue: t.value.num,
                      "onUpdate:modelValue": e[1] || (e[1] = (o) => t.value.num = o),
                      modelModifiers: { number: !0, trim: !0 },
                      class: "!w-[150px]"
                    }, null, 8, ["modelValue"]),
                    t.value.group_id ? (p(), y("p", A, f(a(l)("createdSiteNum")) + "：" + f(c.siteGroup[t.value.group_id].site_num), 1)) : E("", !0)
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              m(_, {
                label: a(l)("createSiteTimeLimit"),
                prop: "month"
              }, {
                default: r(() => [
                  m(h, {
                    modelValue: t.value.month,
                    "onUpdate:modelValue": e[2] || (e[2] = (o) => t.value.month = o),
                    modelModifiers: { number: !0, trim: !0 },
                    class: "!w-[150px]"
                  }, {
                    append: r(() => [
                      b(f(a(l)("month")), 1)
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [B, d.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  le as default
};
