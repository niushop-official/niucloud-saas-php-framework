import { defineComponent as H, ref as m, computed as I, resolveComponent as i, openBlock as r, createBlock as p, withCtx as u, createElementVNode as J, createVNode as s, createTextVNode as w, toDisplayString as h, unref as n, createElementBlock as b, Fragment as g, renderList as V, createCommentVNode as k, toRaw as Q } from "vue";
import { t as o, gK as W, G as X, gM as Y, gN as Z } from "./core-shared-c6ad4e77.js";
import { c as ee } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const le = { class: "dialog-footer" }, ve = /* @__PURE__ */ H({
  __name: "edit-view-type",
  emits: ["complete"],
  setup(ae, { expose: x, emit: E }) {
    const v = m(!1), $ = m(""), L = {
      select_type: 1,
      dict_type: "",
      addon: "",
      model: "",
      value_key: "",
      label_key: ""
    }, e = m({ ...L }), D = m(), M = m([]), T = m([]), P = (t) => {
      W(t).then((a) => {
        T.value = a.data;
      });
    }, C = m([]);
    (async () => {
      let { data: t } = await X({});
      C.value = [{ title: "系统", key: "system" }], C.value.push(...t), P({ addon: "system" });
    })();
    const G = (t) => {
      e.value.model = "", P({ addon: t });
    }, F = m([]), A = (t) => {
      Y(t).then((a) => {
        F.value = a.data;
      });
    }, N = (t) => {
      A({ model: t });
    }, R = I(() => ({
      dict_type: [
        {
          validator: (t, a, d) => {
            e.value.select_type == 1 && e.value.dict_type == "" ? d(new Error(o("dictTypePlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ],
      addon: [
        {
          validator: (t, a, d) => {
            e.value.select_type == 2 && e.value.addon == "" ? d(new Error(o("addonsPlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ],
      model: [
        {
          validator: (t, a, d) => {
            e.value.select_type == 2 && e.value.model == "" ? d(new Error(o("associatedModelPlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ],
      value_key: [
        {
          validator: (t, a, d) => {
            e.value.select_type == 2 && e.value.value_key == "" ? d(new Error(o("remotePullDownValuePlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ],
      label_key: [
        {
          validator: (t, a, d) => {
            e.value.select_type == 2 && e.value.label_key == "" ? d(new Error(o("remotePullDownLabelPlaceholder"))) : d();
          },
          trigger: "blur"
        }
      ]
    })), B = () => {
      Z().then((t) => {
        M.value = t.data;
      });
    }, j = async (t) => {
      t && await t.validate(async (a) => {
        a && (E("complete", Q(e.value)), v.value = !1);
      });
    }, K = async (t = null) => {
      e.value = ee(Object.assign(L, t)), B(), e.value.model != "" && (P({ addon: e.value.addon }), A({ model: e.value.model })), v.value = !0;
    }, O = (t) => {
      var a;
      (a = D.value) == null || a.clearValidate(), t();
    };
    return x({
      showDialog: v,
      setFormData: K
    }), (t, a) => {
      const d = i("el-radio"), S = i("el-radio-group"), c = i("el-form-item"), _ = i("el-option"), y = i("el-select"), q = i("el-form"), U = i("el-button"), z = i("el-dialog");
      return r(), p(z, {
        modelValue: v.value,
        "onUpdate:modelValue": a[8] || (a[8] = (l) => v.value = l),
        title: $.value,
        width: "480px",
        "before-close": O,
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          J("span", le, [
            s(U, {
              onClick: a[6] || (a[6] = (l) => v.value = !1)
            }, {
              default: u(() => [
                w(h(n(o)("cancel")), 1)
              ]),
              _: 1
            }),
            s(U, {
              type: "primary",
              onClick: a[7] || (a[7] = (l) => j(D.value))
            }, {
              default: u(() => [
                w(h(n(o)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: u(() => [
          s(q, {
            model: e.value,
            "label-width": "130px",
            ref_key: "formRef",
            ref: D,
            rules: n(R),
            class: "page-form"
          }, {
            default: u(() => [
              s(c, {
                label: n(o)("selectType"),
                prop: "type"
              }, {
                default: u(() => [
                  s(S, {
                    modelValue: e.value.select_type,
                    "onUpdate:modelValue": a[0] || (a[0] = (l) => e.value.select_type = l)
                  }, {
                    default: u(() => [
                      s(d, { label: 1 }, {
                        default: u(() => [
                          w(h(n(o)("dictType")), 1)
                        ]),
                        _: 1
                      }),
                      s(d, { label: 2 }, {
                        default: u(() => [
                          w(h(n(o)("remotePullDown")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              e.value.select_type == 1 ? (r(), p(c, {
                key: 0,
                label: n(o)("dictType"),
                prop: "dict_type"
              }, {
                default: u(() => [
                  s(y, {
                    class: "input-width",
                    placeholder: n(o)("dictTypePlaceholder"),
                    modelValue: e.value.dict_type,
                    "onUpdate:modelValue": a[1] || (a[1] = (l) => e.value.dict_type = l),
                    filterable: "",
                    remote: "",
                    clearable: ""
                  }, {
                    default: u(() => [
                      (r(!0), b(g, null, V(M.value, (l) => (r(), p(_, {
                        label: l.name,
                        value: l.key,
                        key: l.key
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : k("", !0),
              e.value.select_type == 2 ? (r(), p(c, {
                key: 1,
                label: n(o)("addons"),
                prop: "addon"
              }, {
                default: u(() => [
                  s(y, {
                    modelValue: e.value.addon,
                    "onUpdate:modelValue": a[2] || (a[2] = (l) => e.value.addon = l),
                    placeholder: n(o)("addonsPlaceholder"),
                    class: "input-width",
                    onChange: G
                  }, {
                    default: u(() => [
                      (r(!0), b(g, null, V(C.value, (l, f) => (r(), p(_, {
                        label: l.title,
                        value: l.key,
                        key: f
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])) : k("", !0),
              e.value.select_type == 2 ? (r(), p(c, {
                key: 2,
                label: n(o)("associatedModel"),
                prop: "model"
              }, {
                default: u(() => [
                  s(y, {
                    placeholder: n(o)("associatedModelPlaceholder"),
                    modelValue: e.value.model,
                    "onUpdate:modelValue": a[3] || (a[3] = (l) => e.value.model = l),
                    class: "input-width",
                    filterable: "",
                    onChange: N
                  }, {
                    default: u(() => [
                      (r(!0), b(g, null, V(T.value, (l) => (r(), p(_, {
                        label: l,
                        value: l,
                        key: l
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : k("", !0),
              e.value.select_type == 2 ? (r(), p(c, {
                key: 3,
                prop: "value_key",
                label: n(o)("remotePullDownValue")
              }, {
                default: u(() => [
                  s(y, {
                    class: "input-width",
                    placeholder: n(o)("remotePullDownValuePlaceholder"),
                    modelValue: e.value.value_key,
                    "onUpdate:modelValue": a[4] || (a[4] = (l) => e.value.value_key = l)
                  }, {
                    default: u(() => [
                      (r(!0), b(g, null, V(F.value, (l, f) => (r(), p(_, {
                        label: `${l.name}:${l.comment}`,
                        value: l.name,
                        key: f
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : k("", !0),
              e.value.select_type == 2 ? (r(), p(c, {
                key: 4,
                prop: "label_key",
                label: n(o)("remotePullDownLabel")
              }, {
                default: u(() => [
                  s(y, {
                    class: "input-width",
                    placeholder: n(o)("remotePullDownLabelPlaceholder"),
                    modelValue: e.value.label_key,
                    "onUpdate:modelValue": a[5] || (a[5] = (l) => e.value.label_key = l)
                  }, {
                    default: u(() => [
                      (r(!0), b(g, null, V(F.value, (l, f) => (r(), p(_, {
                        label: `${l.name}:${l.comment}`,
                        value: l.name,
                        key: f
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["placeholder", "modelValue"])
                ]),
                _: 1
              }, 8, ["label"])) : k("", !0)
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
  ve as default
};
