import { defineComponent as O, ref as u, computed as j, resolveComponent as s, openBlock as m, createBlock as g, withCtx as d, createElementVNode as z, createVNode as t, createTextVNode as K, toDisplayString as M, unref as n, createElementBlock as b, Fragment as h, renderList as V, toRaw as H } from "vue";
import { t as a, gK as I, gL as J, G as Q } from "./core-shared-c6ad4e77.js";
import { c as q } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const W = { class: "dialog-footer" }, ue = /* @__PURE__ */ O({
  __name: "edit-associated",
  props: {
    table_name: {
      type: String,
      required: !0
    }
  },
  emits: ["complete"],
  setup(U, { expose: x, emit: N }) {
    const T = U, i = u(!1), A = u(""), k = {
      type: "has_one",
      name: "",
      addon: "system",
      model: "",
      local_key: "",
      foreign_key: ""
    }, o = u({ ...k }), v = u(), G = j(() => ({
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
    })), w = u([]), P = (r) => {
      I(r).then((e) => {
        w.value = e.data;
      });
    }, C = u([]), L = (r) => {
      J({ table_name: r }).then((e) => {
        C.value = e.data;
      });
    }, y = u([]);
    (async () => {
      const { data: r } = await Q({});
      y.value = [{ title: "系统", key: "system" }], y.value.push(...r), P({ addon: "system" });
    })();
    const R = (r) => {
      o.value.model = "", P({ addon: r });
    }, $ = (r) => {
      var e;
      (e = v.value) == null || e.clearValidate(), r();
    }, B = async (r) => {
      r && await r.validate(async (e) => {
        e && (N("complete", H(o.value)), i.value = !1);
      });
    };
    return x({
      showDialog: i,
      setFormData: async (r = null) => {
        L(T.table_name), r ? o.value = q(r) : o.value = q(k), i.value = !0;
      }
    }), (r, e) => {
      const c = s("el-option"), f = s("el-select"), p = s("el-form-item"), D = s("el-input"), S = s("el-form"), F = s("el-button"), E = s("el-dialog");
      return m(), g(E, {
        modelValue: i.value,
        "onUpdate:modelValue": e[8] || (e[8] = (l) => i.value = l),
        title: A.value,
        width: "500px",
        "before-close": $,
        "destroy-on-close": !0
      }, {
        footer: d(() => [
          z("span", W, [
            t(F, {
              onClick: e[6] || (e[6] = (l) => i.value = !1)
            }, {
              default: d(() => [
                K(M(n(a)("cancel")), 1)
              ]),
              _: 1
            }),
            t(F, {
              type: "primary",
              onClick: e[7] || (e[7] = (l) => B(v.value))
            }, {
              default: d(() => [
                K(M(n(a)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: d(() => [
          t(S, {
            model: o.value,
            "label-width": "120px",
            ref_key: "formRef",
            ref: v,
            rules: n(G),
            class: "page-form"
          }, {
            default: d(() => [
              t(p, {
                label: n(a)("associatedType"),
                prop: "type"
              }, {
                default: d(() => [
                  t(f, {
                    placeholder: n(a)("associatedTypePlaceholder"),
                    modelValue: o.value.type,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => o.value.type = l),
                    class: "input-width"
                  }, {
                    default: d(() => [
                      t(c, {
                        label: n(a)("hasOne"),
                        value: "has_one"
                      }, null, 8, ["label"]),
                      t(c, {
                        label: n(a)("hasMany"),
                        value: "has_many"
                      }, null, 8, ["label"])
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                label: n(a)("associatedName"),
                prop: "name"
              }, {
                default: d(() => [
                  t(D, {
                    modelValue: o.value.name,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => o.value.name = l),
                    modelModifiers: { trim: !0 },
                    placeholder: n(a)("associatedNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(p, {
                label: n(a)("addons"),
                prop: "addon"
              }, {
                default: d(() => [
                  t(f, {
                    modelValue: o.value.addon,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => o.value.addon = l),
                    placeholder: n(a)("addonsPlaceholder"),
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
                label: n(a)("associatedModel"),
                prop: "model"
              }, {
                default: d(() => [
                  t(f, {
                    placeholder: n(a)("associatedModelPlaceholder"),
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
                label: n(a)("localKey")
              }, {
                default: d(() => [
                  t(f, {
                    class: "input-width",
                    placeholder: n(a)("localKeyPlaceholder"),
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
                label: n(a)("foreignKey"),
                prop: "foreign_key"
              }, {
                default: d(() => [
                  t(D, {
                    modelValue: o.value.foreign_key,
                    "onUpdate:modelValue": e[5] || (e[5] = (l) => o.value.foreign_key = l),
                    modelModifiers: { trim: !0 },
                    placeholder: n(a)("foreignKeyPlaceholder"),
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
  ue as default
};
