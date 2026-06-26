import { defineComponent as q, ref as B, computed as v, resolveComponent as d, openBlock as c, createElementBlock as h, Fragment as w, createElementVNode as b, toDisplayString as m, unref as t, createVNode as u, withCtx as r, createTextVNode as _, withDirectives as V, vShow as y, createCommentVNode as A } from "vue";
import { t as l, aH as N, aI as D } from "./core-shared-ca1fcae5.js";
const R = { class: "panel-title" }, S = { class: "form-tip" }, W = { class: "mt-[40px]" }, L = /* @__PURE__ */ q({
  __name: "menu-form",
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    index: {
      type: Number,
      default: 0
    },
    subIndex: {
      type: Number,
      default: -1
    }
  },
  emits: ["delete"],
  setup(x, { expose: P, emit: U }) {
    const s = x, f = B(), e = v({
      get() {
        return s.data;
      },
      set(p) {
      }
    }), M = v(() => ({
      name: [
        { required: !0, message: l("menuNamePlaceholder"), trigger: "blur" },
        {
          validator: (p, a, o) => {
            e.value.sub_button && N(a) > 8 ? o(new Error(l("menuNameTips"))) : !e.value.sub_button && N(a) > 16 ? o(new Error(l("subMenuNameTips"))) : o();
          },
          trigger: ["blur", "change"]
        }
      ],
      url: [
        { required: !e.value.sub_button || !e.value.sub_button.length, message: l("webpageUrlPlaceholder"), trigger: "blur" },
        {
          validator: (p, a, o) => {
            !e.value.sub_button || !e.value.sub_button.length ? D(a) ? o() : o(new Error(l("menuUrlErrorTips"))) : o();
          }
        }
      ],
      appid: [
        { required: (!e.value.sub_button || !e.value.sub_button.length) && e.value.type == "miniprogram", message: l("weappAppidPlaceholder"), trigger: "blur" }
      ],
      pagepath: [
        { required: (!e.value.sub_button || !e.value.sub_button.length) && e.value.type == "miniprogram", message: l("weappPagePlaceholder"), trigger: "blur" }
      ]
    })), T = U, E = () => {
      T("delete");
    };
    return P({
      validate: async () => {
        let p = !1;
        return await f.value.validate(async (a) => {
          p = a;
        }), p;
      },
      index: s.index,
      subIndex: s.subIndex
    }), (p, a) => {
      const o = d("el-input"), i = d("el-form-item"), g = d("el-radio"), I = d("el-radio-group"), C = d("el-button"), k = d("el-form");
      return c(), h(w, null, [
        b("div", R, m(e.value.sub_button ? t(l)("menuNameInfo") : t(l)("subMenuNameInfo")), 1),
        u(k, {
          model: e.value,
          "label-width": "140px",
          ref_key: "formRef",
          ref: f,
          rules: M.value,
          class: "page-form mt-[30px]"
        }, {
          default: r(() => [
            u(i, {
              label: t(l)("menuName"),
              prop: "name"
            }, {
              default: r(() => [
                u(o, {
                  modelValue: e.value.name,
                  "onUpdate:modelValue": a[0] || (a[0] = (n) => e.value.name = n),
                  modelModifiers: { trim: !0 },
                  placeholder: t(l)("menuNamePlaceholder"),
                  class: "input-width",
                  clearable: ""
                }, null, 8, ["modelValue", "placeholder"]),
                b("div", S, m(e.value.sub_button ? t(l)("menuNameTips") : t(l)("subMenuNameTips")), 1)
              ]),
              _: 1
            }, 8, ["label"]),
            !e.value.sub_button || !e.value.sub_button.length ? (c(), h(w, { key: 0 }, [
              u(i, {
                label: t(l)("messageType")
              }, {
                default: r(() => [
                  u(I, {
                    modelValue: e.value.type,
                    "onUpdate:modelValue": a[1] || (a[1] = (n) => e.value.type = n)
                  }, {
                    default: r(() => [
                      u(g, { label: "view" }, {
                        default: r(() => [
                          _(m(t(l)("skipWebpage")), 1)
                        ]),
                        _: 1
                      }),
                      u(g, { label: "miniprogram" }, {
                        default: r(() => [
                          _(m(t(l)("skipWeapp")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              u(i, {
                label: t(l)("webpageUrl"),
                prop: "url"
              }, {
                default: r(() => [
                  u(o, {
                    modelValue: e.value.url,
                    "onUpdate:modelValue": a[2] || (a[2] = (n) => e.value.url = n),
                    modelModifiers: { trim: !0 },
                    placeholder: t(l)("webpageUrlPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              V(u(i, {
                label: t(l)("weappAppid"),
                prop: "appid"
              }, {
                default: r(() => [
                  u(o, {
                    modelValue: e.value.appid,
                    "onUpdate:modelValue": a[3] || (a[3] = (n) => e.value.appid = n),
                    modelModifiers: { trim: !0 },
                    placeholder: t(l)("weappAppidPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.value.type == "miniprogram"]
              ]),
              V(u(i, {
                label: t(l)("weappPage"),
                prop: "pagepath"
              }, {
                default: r(() => [
                  u(o, {
                    modelValue: e.value.pagepath,
                    "onUpdate:modelValue": a[4] || (a[4] = (n) => e.value.pagepath = n),
                    modelModifiers: { trim: !0 },
                    placeholder: t(l)("weappPagePlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.value.type == "miniprogram"]
              ])
            ], 64)) : A("", !0),
            b("div", W, [
              u(C, {
                type: "primary",
                link: "",
                onClick: E
              }, {
                default: r(() => [
                  _(m(t(l)("deleteMemu")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["model", "rules"])
      ], 64);
    };
  }
});
export {
  L as _
};
