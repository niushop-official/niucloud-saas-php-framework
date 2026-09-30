import { defineComponent as k, ref as q, computed as c, resolveComponent as d, openBlock as h, createElementBlock as v, Fragment as w, createElementVNode as b, toDisplayString as m, unref as e, createVNode as o, withCtx as u, createTextVNode as _, withDirectives as V, vShow as y, createCommentVNode as B } from "vue";
import { t, aP as N, aQ as A } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const D = { class: "panel-title" }, R = { class: "form-tip" }, S = { class: "mt-[40px]" }, J = /* @__PURE__ */ k({
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
    const s = x, f = q(), l = c({
      get() {
        return s.data;
      },
      set(p) {
      }
    }), M = c(() => ({
      name: [
        { required: !0, message: t("menuNamePlaceholder"), trigger: "blur" },
        {
          validator: (p, a, r) => {
            l.value.sub_button && N(a) > 8 ? r(new Error(t("menuNameTips"))) : !l.value.sub_button && N(a) > 16 ? r(new Error(t("subMenuNameTips"))) : r();
          },
          trigger: ["blur", "change"]
        }
      ],
      url: [
        { required: !l.value.sub_button || !l.value.sub_button.length, message: t("webpageUrlPlaceholder"), trigger: "blur" },
        {
          validator: (p, a, r) => {
            !l.value.sub_button || !l.value.sub_button.length ? A(a) ? r() : r(new Error(t("menuUrlErrorTips"))) : r();
          }
        }
      ],
      appid: [
        { required: (!l.value.sub_button || !l.value.sub_button.length) && l.value.type == "miniprogram", message: t("weappAppidPlaceholder"), trigger: "blur" }
      ],
      pagepath: [
        { required: (!l.value.sub_button || !l.value.sub_button.length) && l.value.type == "miniprogram", message: t("weappPagePlaceholder"), trigger: "blur" }
      ]
    })), T = () => {
      U("delete");
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
      const r = d("el-input"), i = d("el-form-item"), g = d("el-radio"), E = d("el-radio-group"), C = d("el-button"), I = d("el-form");
      return h(), v(w, null, [
        b("div", D, m(e(l).sub_button ? e(t)("menuNameInfo") : e(t)("subMenuNameInfo")), 1),
        o(I, {
          model: e(l),
          "label-width": "140px",
          ref_key: "formRef",
          ref: f,
          rules: e(M),
          class: "page-form mt-[30px]"
        }, {
          default: u(() => [
            o(i, {
              label: e(t)("menuName"),
              prop: "name"
            }, {
              default: u(() => [
                o(r, {
                  modelValue: e(l).name,
                  "onUpdate:modelValue": a[0] || (a[0] = (n) => e(l).name = n),
                  modelModifiers: { trim: !0 },
                  placeholder: e(t)("menuNamePlaceholder"),
                  class: "input-width",
                  clearable: ""
                }, null, 8, ["modelValue", "placeholder"]),
                b("div", R, m(e(l).sub_button ? e(t)("menuNameTips") : e(t)("subMenuNameTips")), 1)
              ]),
              _: 1
            }, 8, ["label"]),
            !e(l).sub_button || !e(l).sub_button.length ? (h(), v(w, { key: 0 }, [
              o(i, {
                label: e(t)("messageType")
              }, {
                default: u(() => [
                  o(E, {
                    modelValue: e(l).type,
                    "onUpdate:modelValue": a[1] || (a[1] = (n) => e(l).type = n)
                  }, {
                    default: u(() => [
                      o(g, { label: "view" }, {
                        default: u(() => [
                          _(m(e(t)("skipWebpage")), 1)
                        ]),
                        _: 1
                      }),
                      o(g, { label: "miniprogram" }, {
                        default: u(() => [
                          _(m(e(t)("skipWeapp")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              o(i, {
                label: e(t)("webpageUrl"),
                prop: "url"
              }, {
                default: u(() => [
                  o(r, {
                    modelValue: e(l).url,
                    "onUpdate:modelValue": a[2] || (a[2] = (n) => e(l).url = n),
                    modelModifiers: { trim: !0 },
                    placeholder: e(t)("webpageUrlPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              V(o(i, {
                label: e(t)("weappAppid"),
                prop: "appid"
              }, {
                default: u(() => [
                  o(r, {
                    modelValue: e(l).appid,
                    "onUpdate:modelValue": a[3] || (a[3] = (n) => e(l).appid = n),
                    modelModifiers: { trim: !0 },
                    placeholder: e(t)("weappAppidPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e(l).type == "miniprogram"]
              ]),
              V(o(i, {
                label: e(t)("weappPage"),
                prop: "pagepath"
              }, {
                default: u(() => [
                  o(r, {
                    modelValue: e(l).pagepath,
                    "onUpdate:modelValue": a[4] || (a[4] = (n) => e(l).pagepath = n),
                    modelModifiers: { trim: !0 },
                    placeholder: e(t)("weappPagePlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e(l).type == "miniprogram"]
              ])
            ], 64)) : B("", !0),
            b("div", S, [
              o(C, {
                type: "primary",
                link: "",
                onClick: T
              }, {
                default: u(() => [
                  _(m(e(t)("deleteMemu")), 1)
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
  J as default
};
