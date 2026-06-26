import { defineComponent as R, ref as v, computed as j, watch as F, resolveComponent as s, resolveDirective as M, openBlock as p, createBlock as g, unref as r, withCtx as a, createElementVNode as C, createVNode as m, createTextVNode as b, toDisplayString as f, withDirectives as T, createElementBlock as y, Fragment as Z, renderList as $, createCommentVNode as E } from "vue";
import { t as l, fh as I, fi as O, fj as z } from "./core-shared-ca1fcae5.js";
const A = {
  key: 0,
  class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]"
}, H = { class: "dialog-footer" }, Q = /* @__PURE__ */ R({
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
    const c = w, u = v(!1), h = v(null), t = v({
      id: 0,
      uid: c.uid,
      group_id: "",
      num: 1,
      month: 1
    }), d = v(!1), N = j(() => ({
      group_id: [
        { required: !0, message: l("siteGroupPlaceholder"), trigger: "blur" }
      ],
      num: [
        { required: !0, message: l("numPlaceholder"), trigger: "blur" },
        {
          validator: (n, e, i) => {
            e <= 0 && i(l("numCannotLtZero")), i();
          }
        }
      ],
      month: [
        { required: !0, message: l("monthPlaceholder"), trigger: "blur" },
        {
          validator: (n, e, i) => {
            e <= 0 && i(l("monthCannotLtZero")), i();
          }
        }
      ]
    })), U = S, D = async (n) => {
      d.value || !n || await n.validate(async (e) => {
        e && (d.value = !0, (t.value.id ? I : O)(t.value).then(() => {
          d.value = !1, u.value = !1, U("complete");
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, G = (n = 0) => {
      n ? z(n).then(({ data: e }) => {
        t.value = e, u.value = !0;
      }) : u.value = !0;
    };
    return F(() => u.value, () => {
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
    }), (n, e) => {
      const i = s("el-option"), k = s("el-select"), _ = s("el-form-item"), V = s("el-input"), P = s("el-form"), x = s("el-button"), q = s("el-dialog"), B = M("loading");
      return p(), g(q, {
        modelValue: u.value,
        "onUpdate:modelValue": e[5] || (e[5] = (o) => u.value = o),
        title: r(l)("userCreateSiteLimit"),
        width: "700px",
        "destroy-on-close": !0
      }, {
        footer: a(() => [
          C("span", H, [
            m(x, {
              onClick: e[3] || (e[3] = (o) => u.value = !1)
            }, {
              default: a(() => [
                b(f(r(l)("cancel")), 1)
              ]),
              _: 1
            }),
            m(x, {
              type: "primary",
              loading: d.value,
              onClick: e[4] || (e[4] = (o) => D(h.value))
            }, {
              default: a(() => [
                b(f(r(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: a(() => [
          T((p(), g(P, {
            model: t.value,
            "label-width": "130px",
            ref_key: "formRef",
            ref: h,
            rules: N.value,
            class: "page-form",
            autocomplete: "off"
          }, {
            default: a(() => [
              m(_, {
                label: r(l)("siteGroup"),
                prop: "group_id"
              }, {
                default: a(() => [
                  m(k, {
                    modelValue: t.value.group_id,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => t.value.group_id = o),
                    placeholder: r(l)("siteGroupPlaceholder"),
                    disabled: t.value.id
                  }, {
                    default: a(() => [
                      (p(!0), y(Z, null, $(c.siteGroup, (o) => (p(), g(i, {
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
                label: r(l)("createSiteNum"),
                prop: "num"
              }, {
                default: a(() => [
                  C("div", null, [
                    m(V, {
                      modelValue: t.value.num,
                      "onUpdate:modelValue": e[1] || (e[1] = (o) => t.value.num = o),
                      modelModifiers: { number: !0, trim: !0 },
                      class: "!w-[150px]"
                    }, null, 8, ["modelValue"]),
                    t.value.group_id ? (p(), y("p", A, f(r(l)("createdSiteNum")) + "：" + f(c.siteGroup[t.value.group_id].site_num), 1)) : E("", !0)
                  ])
                ]),
                _: 1
              }, 8, ["label"]),
              m(_, {
                label: r(l)("createSiteTimeLimit"),
                prop: "month"
              }, {
                default: a(() => [
                  m(V, {
                    modelValue: t.value.month,
                    "onUpdate:modelValue": e[2] || (e[2] = (o) => t.value.month = o),
                    modelModifiers: { number: !0, trim: !0 },
                    class: "!w-[150px]"
                  }, {
                    append: a(() => [
                      b(f(r(l)("month")), 1)
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
  Q as _
};
