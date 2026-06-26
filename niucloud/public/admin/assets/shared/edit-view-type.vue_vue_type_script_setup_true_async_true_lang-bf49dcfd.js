import { defineComponent as J, ref as m, computed as K, resolveComponent as i, openBlock as n, createBlock as p, withCtx as u, createElementVNode as Q, createVNode as s, createTextVNode as w, toDisplayString as h, unref as r, createElementBlock as b, Fragment as g, renderList as V, createCommentVNode as k, toRaw as W } from "vue";
import { t as o, x as X, gb as Y, gd as Z, ge as ee } from "./core-shared-ca1fcae5.js";
import { c as le } from "./cloneDeep-70d647ec.js";
const ae = { class: "dialog-footer" }, re = /* @__PURE__ */ J({
  __name: "edit-view-type",
  emits: ["complete"],
  setup(te, { expose: U, emit: E }) {
    const v = m(!1), $ = m(""), F = {
      select_type: 1,
      dict_type: "",
      addon: "",
      model: "",
      value_key: "",
      label_key: ""
    }, e = m({ ...F }), D = m(), L = m([]), T = m([]), P = (t) => {
      Y(t).then((a) => {
        T.value = a.data;
      });
    }, C = m([]);
    (async () => {
      let { data: t } = await X({});
      C.value = [{ title: "系统", key: "system" }], C.value.push(...t), P({ addon: "system" });
    })();
    const G = (t) => {
      e.value.model = "", P({ addon: t });
    }, x = m([]), A = (t) => {
      Z(t).then((a) => {
        x.value = a.data;
      });
    }, N = (t) => {
      A({ model: t });
    }, R = K(() => ({
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
      ee().then((t) => {
        L.value = t.data;
      });
    }, j = E, O = async (t) => {
      t && await t.validate(async (a) => {
        a && (j("complete", W(e.value)), v.value = !1);
      });
    }, S = async (t = null) => {
      e.value = le(Object.assign(F, t)), B(), e.value.model != "" && (P({ addon: e.value.addon }), A({ model: e.value.model })), v.value = !0;
    }, q = (t) => {
      var a;
      (a = D.value) == null || a.clearValidate(), t();
    };
    return U({
      showDialog: v,
      setFormData: S
    }), (t, a) => {
      const d = i("el-radio"), z = i("el-radio-group"), c = i("el-form-item"), _ = i("el-option"), y = i("el-select"), H = i("el-form"), M = i("el-button"), I = i("el-dialog");
      return n(), p(I, {
        modelValue: v.value,
        "onUpdate:modelValue": a[8] || (a[8] = (l) => v.value = l),
        title: $.value,
        width: "480px",
        "before-close": q,
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          Q("span", ae, [
            s(M, {
              onClick: a[6] || (a[6] = (l) => v.value = !1)
            }, {
              default: u(() => [
                w(h(r(o)("cancel")), 1)
              ]),
              _: 1
            }),
            s(M, {
              type: "primary",
              onClick: a[7] || (a[7] = (l) => O(D.value))
            }, {
              default: u(() => [
                w(h(r(o)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: u(() => [
          s(H, {
            model: e.value,
            "label-width": "130px",
            ref_key: "formRef",
            ref: D,
            rules: R.value,
            class: "page-form"
          }, {
            default: u(() => [
              s(c, {
                label: r(o)("selectType"),
                prop: "type"
              }, {
                default: u(() => [
                  s(z, {
                    modelValue: e.value.select_type,
                    "onUpdate:modelValue": a[0] || (a[0] = (l) => e.value.select_type = l)
                  }, {
                    default: u(() => [
                      s(d, { label: 1 }, {
                        default: u(() => [
                          w(h(r(o)("dictType")), 1)
                        ]),
                        _: 1
                      }),
                      s(d, { label: 2 }, {
                        default: u(() => [
                          w(h(r(o)("remotePullDown")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              e.value.select_type == 1 ? (n(), p(c, {
                key: 0,
                label: r(o)("dictType"),
                prop: "dict_type"
              }, {
                default: u(() => [
                  s(y, {
                    class: "input-width",
                    placeholder: r(o)("dictTypePlaceholder"),
                    modelValue: e.value.dict_type,
                    "onUpdate:modelValue": a[1] || (a[1] = (l) => e.value.dict_type = l),
                    filterable: "",
                    remote: "",
                    clearable: ""
                  }, {
                    default: u(() => [
                      (n(!0), b(g, null, V(L.value, (l) => (n(), p(_, {
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
              e.value.select_type == 2 ? (n(), p(c, {
                key: 1,
                label: r(o)("addons"),
                prop: "addon"
              }, {
                default: u(() => [
                  s(y, {
                    modelValue: e.value.addon,
                    "onUpdate:modelValue": a[2] || (a[2] = (l) => e.value.addon = l),
                    placeholder: r(o)("addonsPlaceholder"),
                    class: "input-width",
                    onChange: G
                  }, {
                    default: u(() => [
                      (n(!0), b(g, null, V(C.value, (l, f) => (n(), p(_, {
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
              e.value.select_type == 2 ? (n(), p(c, {
                key: 2,
                label: r(o)("associatedModel"),
                prop: "model"
              }, {
                default: u(() => [
                  s(y, {
                    placeholder: r(o)("associatedModelPlaceholder"),
                    modelValue: e.value.model,
                    "onUpdate:modelValue": a[3] || (a[3] = (l) => e.value.model = l),
                    class: "input-width",
                    filterable: "",
                    onChange: N
                  }, {
                    default: u(() => [
                      (n(!0), b(g, null, V(T.value, (l) => (n(), p(_, {
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
              e.value.select_type == 2 ? (n(), p(c, {
                key: 3,
                prop: "value_key",
                label: r(o)("remotePullDownValue")
              }, {
                default: u(() => [
                  s(y, {
                    class: "input-width",
                    placeholder: r(o)("remotePullDownValuePlaceholder"),
                    modelValue: e.value.value_key,
                    "onUpdate:modelValue": a[4] || (a[4] = (l) => e.value.value_key = l)
                  }, {
                    default: u(() => [
                      (n(!0), b(g, null, V(x.value, (l, f) => (n(), p(_, {
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
              e.value.select_type == 2 ? (n(), p(c, {
                key: 4,
                prop: "label_key",
                label: r(o)("remotePullDownLabel")
              }, {
                default: u(() => [
                  s(y, {
                    class: "input-width",
                    placeholder: r(o)("remotePullDownLabelPlaceholder"),
                    modelValue: e.value.label_key,
                    "onUpdate:modelValue": a[5] || (a[5] = (l) => e.value.label_key = l)
                  }, {
                    default: u(() => [
                      (n(!0), b(g, null, V(x.value, (l, f) => (n(), p(_, {
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
  re as _
};
