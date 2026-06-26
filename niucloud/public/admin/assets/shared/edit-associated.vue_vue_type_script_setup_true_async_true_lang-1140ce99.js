import { defineComponent as j, ref as u, computed as z, resolveComponent as s, openBlock as m, createBlock as g, withCtx as r, createElementVNode as H, createVNode as t, createTextVNode as F, toDisplayString as M, unref as d, createElementBlock as b, Fragment as h, renderList as V, toRaw as I } from "vue";
import { t as a, x as J, gb as Q, gc as W } from "./core-shared-ca1fcae5.js";
import { c as q } from "./cloneDeep-70d647ec.js";
const X = { class: "dialog-footer" }, oe = /* @__PURE__ */ j({
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
      Q(n).then((e) => {
        w.value = e.data;
      });
    }, C = u([]), L = (n) => {
      W({ table_name: n }).then((e) => {
        C.value = e.data;
      });
    }, y = u([]);
    (async () => {
      const { data: n } = await J({});
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
        L(A.table_name), n ? o.value = q(n) : o.value = q(k), i.value = !0;
      }
    }), (n, e) => {
      const p = s("el-option"), f = s("el-select"), c = s("el-form-item"), D = s("el-input"), E = s("el-form"), x = s("el-button"), O = s("el-dialog");
      return m(), g(O, {
        modelValue: i.value,
        "onUpdate:modelValue": e[8] || (e[8] = (l) => i.value = l),
        title: T.value,
        width: "500px",
        "before-close": $,
        "destroy-on-close": !0
      }, {
        footer: r(() => [
          H("span", X, [
            t(x, {
              onClick: e[6] || (e[6] = (l) => i.value = !1)
            }, {
              default: r(() => [
                F(M(d(a)("cancel")), 1)
              ]),
              _: 1
            }),
            t(x, {
              type: "primary",
              onClick: e[7] || (e[7] = (l) => S(v.value))
            }, {
              default: r(() => [
                F(M(d(a)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: r(() => [
          t(E, {
            model: o.value,
            "label-width": "120px",
            ref_key: "formRef",
            ref: v,
            rules: G.value,
            class: "page-form"
          }, {
            default: r(() => [
              t(c, {
                label: d(a)("associatedType"),
                prop: "type"
              }, {
                default: r(() => [
                  t(f, {
                    placeholder: d(a)("associatedTypePlaceholder"),
                    modelValue: o.value.type,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => o.value.type = l),
                    class: "input-width"
                  }, {
                    default: r(() => [
                      t(p, {
                        label: d(a)("hasOne"),
                        value: "has_one"
                      }, null, 8, ["label"]),
                      t(p, {
                        label: d(a)("hasMany"),
                        value: "has_many"
                      }, null, 8, ["label"])
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(c, {
                label: d(a)("associatedName"),
                prop: "name"
              }, {
                default: r(() => [
                  t(D, {
                    modelValue: o.value.name,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => o.value.name = l),
                    modelModifiers: { trim: !0 },
                    placeholder: d(a)("associatedNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(c, {
                label: d(a)("addons"),
                prop: "addon"
              }, {
                default: r(() => [
                  t(f, {
                    modelValue: o.value.addon,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => o.value.addon = l),
                    placeholder: d(a)("addonsPlaceholder"),
                    class: "input-width",
                    onChange: R
                  }, {
                    default: r(() => [
                      (m(!0), b(h, null, V(y.value, (l, _) => (m(), g(p, {
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
              t(c, {
                label: d(a)("associatedModel"),
                prop: "model"
              }, {
                default: r(() => [
                  t(f, {
                    placeholder: d(a)("associatedModelPlaceholder"),
                    modelValue: o.value.model,
                    "onUpdate:modelValue": e[3] || (e[3] = (l) => o.value.model = l),
                    class: "input-width",
                    filterable: ""
                  }, {
                    default: r(() => [
                      (m(!0), b(h, null, V(w.value, (l) => (m(), g(p, {
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
              t(c, {
                prop: "local_key",
                label: d(a)("localKey")
              }, {
                default: r(() => [
                  t(f, {
                    class: "input-width",
                    placeholder: d(a)("localKeyPlaceholder"),
                    modelValue: o.value.local_key,
                    "onUpdate:modelValue": e[4] || (e[4] = (l) => o.value.local_key = l)
                  }, {
                    default: r(() => [
                      (m(!0), b(h, null, V(C.value, (l, _) => (m(), g(p, {
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
              t(c, {
                label: d(a)("foreignKey"),
                prop: "foreign_key"
              }, {
                default: r(() => [
                  t(D, {
                    modelValue: o.value.foreign_key,
                    "onUpdate:modelValue": e[5] || (e[5] = (l) => o.value.foreign_key = l),
                    modelModifiers: { trim: !0 },
                    placeholder: d(a)("foreignKeyPlaceholder"),
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
  oe as _
};
