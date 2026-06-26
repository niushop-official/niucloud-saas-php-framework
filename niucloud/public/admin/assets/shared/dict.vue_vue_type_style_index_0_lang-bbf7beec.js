import { defineComponent as H, ref as i, computed as K, resolveComponent as s, resolveDirective as L, openBlock as $, createBlock as M, unref as a, withCtx as n, createElementVNode as V, createVNode as t, createTextVNode as v, toDisplayString as m, withDirectives as Q } from "vue";
import { t as l, b0 as W, b1 as X } from "./core-shared-ca1fcae5.js";
import { c as y } from "./cloneDeep-70d647ec.js";
const Y = { class: "mb-[10px]" }, Z = { class: "dialog-footer" }, ee = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, le = { class: "dialog-footer" }, de = /* @__PURE__ */ H({
  __name: "dict",
  emits: ["complete"],
  setup(ae, { expose: E, emit: F }) {
    const f = i(!1), _ = i(!1), b = i(!1), p = i([]), h = i(), D = i("add"), C = i(), x = i(""), k = {
      name: "",
      value: "",
      sort: 0,
      memo: ""
    }, u = i({ ...k }), R = K(() => ({
      name: [
        { required: !0, message: l("dataNamePlaceholder"), trigger: "blur" }
      ],
      value: [
        { required: !0, message: l("dataValuePlaceholder"), trigger: "blur" }
      ]
    })), q = () => {
      D.value = "add", u.value = y(k), b.value = !0;
    }, N = i(0), B = (d, e) => {
      D.value = "edit", N.value = e, u.value = y(k), u.value = Object.assign(u.value, y(d)), b.value = !0;
    }, I = async (d) => {
      d && await d.validate(async (e) => {
        e && (D.value != "edit" ? p.value.push(y(u.value)) : p.value.splice(N.value, 1, y(u.value)), p.value.sort(function(r, c) {
          return c.sort - r.sort;
        }), b.value = !1);
      });
    }, O = F, S = (d) => {
      p.value.splice(d, 1);
    }, j = async () => {
      _.value = !0, W(h.value, { dictionary: JSON.stringify(p.value) }).then((d) => {
        _.value = !1, f.value = !1, O("complete");
      }).catch(() => {
        _.value = !1;
      });
    };
    return E({
      showDialog: f,
      setFormData: async (d = null) => {
        f.value = !0, _.value = !0, h.value = d.id, x.value = d.name;
        const e = await (await X(d.id)).data;
        p.value = e.dictionary, _.value = !1;
      }
    }), (d, e) => {
      const r = s("el-button"), c = s("el-table-column"), z = s("el-table"), w = s("el-input"), g = s("el-form-item"), J = s("el-input-number"), T = s("el-form"), U = s("el-dialog"), A = L("loading");
      return $(), M(U, {
        modelValue: f.value,
        "onUpdate:modelValue": e[10] || (e[10] = (o) => f.value = o),
        title: a(l)("dictData"),
        width: "60%",
        class: "diy-dialog-wrap",
        "destroy-on-close": !0
      }, {
        footer: n(() => [
          V("span", Z, [
            t(r, {
              onClick: e[0] || (e[0] = (o) => f.value = !1)
            }, {
              default: n(() => [
                v(m(a(l)("cancel")), 1)
              ]),
              _: 1
            }),
            t(r, {
              type: "primary",
              onClick: e[1] || (e[1] = (o) => j())
            }, {
              default: n(() => [
                v(m(a(l)("confirm")), 1)
              ]),
              _: 1
            })
          ])
        ]),
        default: n(() => [
          V("div", Y, [
            t(r, {
              type: "primary",
              onClick: q
            }, {
              default: n(() => [
                v(m(a(l)("addDictData")), 1)
              ]),
              _: 1
            })
          ]),
          Q(($(), M(z, {
            data: p.value,
            size: "large"
          }, {
            default: n(() => [
              t(c, {
                label: a(l)("dataName"),
                prop: "name"
              }, null, 8, ["label"]),
              t(c, {
                label: a(l)("dataValue"),
                prop: "value"
              }, null, 8, ["label"]),
              t(c, {
                label: a(l)("sort"),
                align: "center",
                "min-width": "100px",
                prop: "sort"
              }, null, 8, ["label"]),
              t(c, {
                label: a(l)("memo"),
                prop: "memo"
              }, null, 8, ["label"]),
              t(c, {
                label: a(l)("operation"),
                align: "right",
                fixed: "right",
                width: "120"
              }, {
                default: n(({ row: o, $index: P }) => [
                  t(r, {
                    type: "primary",
                    link: "",
                    onClick: (G) => B(o, P)
                  }, {
                    default: n(() => [
                      v(m(a(l)("edit")), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  t(r, {
                    type: "primary",
                    link: "",
                    onClick: (G) => S(P)
                  }, {
                    default: n(() => [
                      v(m(a(l)("delete")), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["data"])), [
            [A, _.value]
          ]),
          t(U, {
            modelValue: b.value,
            "onUpdate:modelValue": e[9] || (e[9] = (o) => b.value = o),
            title: D.value != "edit" ? a(l)("addDictData") : a(l)("editDictData"),
            width: "480",
            class: "diy-dialog-wrap",
            "destroy-on-close": !0
          }, {
            footer: n(() => [
              V("span", le, [
                t(r, {
                  onClick: e[7] || (e[7] = (o) => b.value = !1)
                }, {
                  default: n(() => [
                    v(m(a(l)("cancel")), 1)
                  ]),
                  _: 1
                }),
                t(r, {
                  type: "primary",
                  onClick: e[8] || (e[8] = (o) => I(C.value))
                }, {
                  default: n(() => [
                    v(m(a(l)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: n(() => [
              t(T, {
                model: u.value,
                "label-width": "120px",
                ref_key: "formRef",
                ref: C,
                rules: R.value,
                class: "page-form"
              }, {
                default: n(() => [
                  t(g, {
                    label: a(l)("name")
                  }, {
                    default: n(() => [
                      t(w, {
                        modelValue: x.value,
                        "onUpdate:modelValue": e[2] || (e[2] = (o) => x.value = o),
                        modelModifiers: { trim: !0 },
                        disabled: "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(g, {
                    label: a(l)("dataName"),
                    prop: "name"
                  }, {
                    default: n(() => [
                      t(w, {
                        modelValue: u.value.name,
                        "onUpdate:modelValue": e[3] || (e[3] = (o) => u.value.name = o),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: a(l)("dataNamePlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(g, {
                    label: a(l)("dataValue"),
                    prop: "value"
                  }, {
                    default: n(() => [
                      t(w, {
                        modelValue: u.value.value,
                        "onUpdate:modelValue": e[4] || (e[4] = (o) => u.value.value = o),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: a(l)("dataValuePlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(g, {
                    label: a(l)("sort"),
                    prop: "sort"
                  }, {
                    default: n(() => [
                      V("div", null, [
                        t(J, {
                          modelValue: u.value.sort,
                          "onUpdate:modelValue": e[5] || (e[5] = (o) => u.value.sort = o),
                          ":step": 1,
                          "step-strictly": "",
                          "value-on-clear": 0,
                          min: 0,
                          class: "input-width"
                        }, null, 8, ["modelValue"]),
                        V("p", ee, m(a(l)("sortPlaceholder")), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(g, {
                    label: a(l)("memo")
                  }, {
                    default: n(() => [
                      t(w, {
                        modelValue: u.value.memo,
                        "onUpdate:modelValue": e[6] || (e[6] = (o) => u.value.memo = o),
                        modelModifiers: { trim: !0 },
                        type: "textarea",
                        clearable: "",
                        placeholder: a(l)("momePlaceholder"),
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
          }, 8, ["modelValue", "title"])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  de as _
};
