import { defineComponent as q, ref as B, computed as v, resolveComponent as d, openBlock as c, createElementBlock as h, Fragment as w, createElementVNode as b, toDisplayString as m, unref as a, createVNode as o, withCtx as r, createTextVNode as _, withDirectives as V, vShow as y, createCommentVNode as A } from "vue";
import { t as l, aI as N, aJ as D } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const R = { class: "panel-title" }, S = { class: "form-tip" }, W = { class: "mt-[40px]" }, Q = /* @__PURE__ */ q({
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
          validator: (p, t, u) => {
            e.value.sub_button && N(t) > 8 ? u(new Error(l("menuNameTips"))) : !e.value.sub_button && N(t) > 16 ? u(new Error(l("subMenuNameTips"))) : u();
          },
          trigger: ["blur", "change"]
        }
      ],
      url: [
        { required: !e.value.sub_button || !e.value.sub_button.length, message: l("webpageUrlPlaceholder"), trigger: "blur" },
        {
          validator: (p, t, u) => {
            !e.value.sub_button || !e.value.sub_button.length ? D(t) ? u() : u(new Error(l("menuUrlErrorTips"))) : u();
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
        return await f.value.validate(async (t) => {
          p = t;
        }), p;
      },
      index: s.index,
      subIndex: s.subIndex
    }), (p, t) => {
      const u = d("el-input"), i = d("el-form-item"), g = d("el-radio"), I = d("el-radio-group"), C = d("el-button"), k = d("el-form");
      return c(), h(w, null, [
        b("div", R, m(e.value.sub_button ? a(l)("menuNameInfo") : a(l)("subMenuNameInfo")), 1),
        o(k, {
          model: e.value,
          "label-width": "140px",
          ref_key: "formRef",
          ref: f,
          rules: M.value,
          class: "page-form mt-[30px]"
        }, {
          default: r(() => [
            o(i, {
              label: a(l)("menuName"),
              prop: "name"
            }, {
              default: r(() => [
                o(u, {
                  modelValue: e.value.name,
                  "onUpdate:modelValue": t[0] || (t[0] = (n) => e.value.name = n),
                  modelModifiers: { trim: !0 },
                  placeholder: a(l)("menuNamePlaceholder"),
                  class: "input-width",
                  clearable: ""
                }, null, 8, ["modelValue", "placeholder"]),
                b("div", S, m(e.value.sub_button ? a(l)("menuNameTips") : a(l)("subMenuNameTips")), 1)
              ]),
              _: 1
            }, 8, ["label"]),
            !e.value.sub_button || !e.value.sub_button.length ? (c(), h(w, { key: 0 }, [
              o(i, {
                label: a(l)("messageType")
              }, {
                default: r(() => [
                  o(I, {
                    modelValue: e.value.type,
                    "onUpdate:modelValue": t[1] || (t[1] = (n) => e.value.type = n)
                  }, {
                    default: r(() => [
                      o(g, { label: "view" }, {
                        default: r(() => [
                          _(m(a(l)("skipWebpage")), 1)
                        ]),
                        _: 1
                      }),
                      o(g, { label: "miniprogram" }, {
                        default: r(() => [
                          _(m(a(l)("skipWeapp")), 1)
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
                label: a(l)("webpageUrl"),
                prop: "url"
              }, {
                default: r(() => [
                  o(u, {
                    modelValue: e.value.url,
                    "onUpdate:modelValue": t[2] || (t[2] = (n) => e.value.url = n),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("webpageUrlPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              V(o(i, {
                label: a(l)("weappAppid"),
                prop: "appid"
              }, {
                default: r(() => [
                  o(u, {
                    modelValue: e.value.appid,
                    "onUpdate:modelValue": t[3] || (t[3] = (n) => e.value.appid = n),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("weappAppidPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.value.type == "miniprogram"]
              ]),
              V(o(i, {
                label: a(l)("weappPage"),
                prop: "pagepath"
              }, {
                default: r(() => [
                  o(u, {
                    modelValue: e.value.pagepath,
                    "onUpdate:modelValue": t[4] || (t[4] = (n) => e.value.pagepath = n),
                    modelModifiers: { trim: !0 },
                    placeholder: a(l)("weappPagePlaceholder"),
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
              o(C, {
                type: "primary",
                link: "",
                onClick: E
              }, {
                default: r(() => [
                  _(m(a(l)("deleteMemu")), 1)
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
  Q as default
};
