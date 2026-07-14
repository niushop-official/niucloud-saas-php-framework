import { defineComponent as j, ref as u, computed as z, resolveComponent as s, openBlock as m, createBlock as g, withCtx as d, createElementVNode as H, createVNode as t, createTextVNode as M, toDisplayString as q, unref as r, createElementBlock as b, Fragment as h, renderList as V, toRaw as I } from "vue";
import { t as a, gh as J, gi as Q, r as W } from "./core-shared-11c0a673.js";
import { c as x } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const X = { class: "dialog-footer" }, se = /* @__PURE__ */ j({
  __name: "edit-associated",
  props: {
    table_name: {
      type: String,
      required: !0
    }
  },
  emits: ["complete"],
  setup(K, { expose: U, emit: N }) {
    const i = u(!1), T = u(""), A = K, k = {
      type: "has_one",
      name: "",
      addon: "system",
      model: "",
      local_key: "",
      foreign_key: ""
    }, o = u({ ...k }), v = u(), G = z(() => ({
      type: [
        { required: !0, message: a("associatedTypePlaceholder"), trigger: "change" }
      ],
      name: [
        { required: !0, message: a("associatedNamePlaceholder"), trigger: "blur" }
      ],
      addon: [
        { required: !0, message: a("addonsPlaceholder"), trigger: "change" }
      ],
      model: [
        { required: !0, message: a("associatedModelPlaceholder"), trigger: "change" }
      ],
      local_key: [
        { required: !0, message: a("localKeyPlaceholder"), trigger: "change" }
      ],
      foreign_key: [
        { required: !0, message: a("foreignKeyPlaceholder"), trigger: "blur" }
      ]
    })), w = u([]), P = (n) => {
      J(n).then((e) => {
        w.value = e.data;
      });
    }, C = u([]), L = (n) => {
      Q({ table_name: n }).then((e) => {
        C.value = e.data;
      });
    }, y = u([]);
    (async () => {
      const { data: n } = await W({});
      y.value = [{ title: "系统", key: "system" }], y.value.push(...n), P({ addon: "system" });
    })();
    const R = (n) => {
      o.value.model = "", P({ addon: n });
    }, $ = (n) => {
      var e;
      (e = v.value) == null || e.clearValidate(), n();
    }, B = N, S = async (n) => {
      n && await n.validate(async (e) => {
        e && (B("complete", I(o.value)), i.value = !1);
      });
    };
    return U({
      showDialog: i,
      setFormData: async (n = null) => {
        L(A.table_name), n ? o.value = x(n) : o.value = x(k), i.value = !0;
      }
    }), (n, e) => {
      const c = s("el-option"), f = s("el-select"), p = s("el-form-item"), D = s("el-input"), E = s("el-form"), F = s("el-button"), O = s("el-dialog");
      return m(), g(O, {
        modelValue: i.value,
        "onUpdate:modelValue": e[8] || (e[8] = (l) => i.value = l),
        title: T.value,
        width: "500px",
        "before-close": $,
        "destroy-on-close": !0
      }, {
        footer: d(() => [
          H("span", X, [
            t(F, {
              onClick: e[6] || (e[6] = (l) => i.value = !1)
            }, {
              default: d(() => [
                M(q(r(a)("cancel")), 1)
              ]),
              _: 1
            }),
            t(F, {
              type: "primary",
              onClick: e[7] || (e[7] = (l) => S(v.value))
            }, {
              default: d(() => [
                M(q(r(a)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: d(() => [
          t(E, {
            model: o.value,
            "label-width": "120px",
            ref_key: "formRef",
            ref: v,
            rules: G.value,
            class: "page-form"
          }, {
            default: d(() => [
              t(p, {
                label: r(a)("associatedType"),
                prop: "type"
              }, {
                default: d(() => [
                  t(f, {
                    placeholder: r(a)("associatedTypePlaceholder"),
                    modelValue: o.value.type,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => o.value.type = l),
                    class: "input-width"
                  }, {
                    default: d(() => [
                      t(c, {
                        label: r(a)("hasOne"),
                        value: "has_one"
                      }, null, 8, ["label"]),
                      t(c, {
                        label: r(a)("hasMany"),
                        value: "has_many"
                      }, null, 8, ["label"])
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                label: r(a)("associatedName"),
                prop: "name"
              }, {
                default: d(() => [
                  t(D, {
                    modelValue: o.value.name,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => o.value.name = l),
                    modelModifiers: { trim: !0 },
                    placeholder: r(a)("associatedNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                label: r(a)("addons"),
                prop: "addon"
              }, {
                default: d(() => [
                  t(f, {
                    modelValue: o.value.addon,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => o.value.addon = l),
                    placeholder: r(a)("addonsPlaceholder"),
                    class: "input-width",
                    onChange: R
                  }, {
                    default: d(() => [
                      (m(!0), b(h, null, V(y.value, (l, _) => (m(), g(c, {
                        label: l.title,
                        value: l.key,
                        key: _
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                label: r(a)("associatedModel"),
                prop: "model"
              }, {
                default: d(() => [
                  t(f, {
                    placeholder: r(a)("associatedModelPlaceholder"),
                    modelValue: o.value.model,
                    "onUpdate:modelValue": e[3] || (e[3] = (l) => o.value.model = l),
                    class: "input-width",
                    filterable: ""
                  }, {
                    default: d(() => [
                      (m(!0), b(h, null, V(w.value, (l) => (m(), g(c, {
                        label: l,
                        value: l,
                        key: l
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                prop: "local_key",
                label: r(a)("localKey")
              }, {
                default: d(() => [
                  t(f, {
                    class: "input-width",
                    placeholder: r(a)("localKeyPlaceholder"),
                    modelValue: o.value.local_key,
                    "onUpdate:modelValue": e[4] || (e[4] = (l) => o.value.local_key = l)
                  }, {
                    default: d(() => [
                      (m(!0), b(h, null, V(C.value, (l, _) => (m(), g(c, {
                        label: `${l.name}:${l.comment}`,
                        value: l.name,
                        key: _
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                label: r(a)("foreignKey"),
                prop: "foreign_key"
              }, {
                default: d(() => [
                  t(D, {
                    modelValue: o.value.foreign_key,
                    "onUpdate:modelValue": e[5] || (e[5] = (l) => o.value.foreign_key = l),
                    modelModifiers: { trim: !0 },
                    placeholder: r(a)("foreignKeyPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  se as default
};
