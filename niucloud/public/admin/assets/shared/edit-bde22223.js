import { defineComponent as K, ref as P, reactive as ee, computed as te, resolveComponent as b, resolveDirective as le, openBlock as u, createElementBlock as h, createVNode as r, withCtx as d, unref as o, withDirectives as ae, createBlock as F, createElementVNode as p, toDisplayString as f, Fragment as k, renderList as w, createTextVNode as B, createCommentVNode as O } from "vue";
import { t as a, dv as re, dw as oe, dx as ne, I as ie, dy as de, dz as pe, dA as se } from "./core-shared-5b3bfa35.js";
import { ArrowLeft as ue } from "@element-plus/icons-vue";
import { ElMessage as G } from "element-plus";
import { useRoute as ce, useRouter as _e } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const me = { class: "main-container" }, fe = { class: "panel-title !text-sm" }, ve = { class: "text-[12px] text-[#b2b2b2]" }, ge = { class: "text-[12px] text-[#b2b2b2]" }, be = { class: "text-[12px] text-[#b2b2b2]" }, he = { class: "text-[12px] text-[#b2b2b2]" }, xe = { class: "panel-title !text-sm" }, ke = { class: "flex mb-[10px] py-[8px] bg-[#F5F7F9] text-[14px]" }, ye = { class: "px-[12px] w-[200px]" }, Ve = { class: "px-[12px] w-[100px]" }, we = { class: "px-[12px] w-[250px]" }, Pe = { class: "px-[12px] w-[200px]" }, Ue = { class: "font-bold w-[200px] px-[12px]" }, Ce = { class: "w-[100px] px-[12px]" }, Te = { class: "w-[250px] px-[12px]" }, Ne = {
  key: 0,
  class: "w-[300px] px-[12px] flex-1"
}, qe = { class: "w-[200px] px-[12px]" }, Fe = { class: "fixed-footer-wrap" }, Me = { class: "fixed-footer" }, ze = /* @__PURE__ */ K({
  __name: "edit",
  setup($e) {
    const R = ce(), E = _e(), U = P(!1), M = P(!0), H = R.meta.title, I = {
      printer_id: R.query.printer_id || 0,
      brand: "",
      printer_name: "",
      printer_code: "",
      printer_key: "",
      open_id: "",
      apikey: "",
      template_type: [],
      trigger: [],
      value: {},
      print_width: "58mm",
      status: 1
    }, e = ee({ ...I }), A = P(), J = te(() => ({
      printer_name: [
        { required: !0, message: a("printerNamePlaceholder"), trigger: "blur" }
      ],
      brand: [
        { required: !0, message: a("brandPlaceholder"), trigger: "blur" }
      ],
      printer_code: [
        { required: !0, message: a("printerCodePlaceholder"), trigger: "blur" }
      ],
      printer_key: [
        { required: !0, message: a("printerKeyPlaceholder"), trigger: "blur" }
      ],
      open_id: [
        { required: !0, message: a("openIdPlaceholder"), trigger: "blur" }
      ],
      apikey: [
        { required: !0, message: a("apikeyPlaceholder"), trigger: "blur" }
      ]
    })), y = P([]);
    (async () => {
      await ne({}).then((g) => {
        if (g.data) {
          y.value = g.data;
          for (let l = 0; l < y.value.length; l++) {
            let n = y.value[l];
            e.value[n.key] = {};
            let i = {};
            for (let _ = 0; _ < n.condition.length; _++) {
              let m = n.condition[_];
              if (i[m.key] = [], m.type == "checkbox") {
                i[m.key] = [];
                for (let s = 0; s < m.list.length; s++)
                  i[m.key].push(m.list[s].value);
              }
            }
            for (let _ in n.trigger)
              e.value[n.key]["trigger_" + _] = {
                status: 1,
                template_id: "",
                print_num: 1
              }, Object.assign(e.value[n.key]["trigger_" + _], ie(i));
          }
        }
        e.printer_id || (M.value = !1);
      }), e.printer_id && de(e.printer_id).then((g) => {
        let l = g.data;
        l && Object.keys(e).forEach((n) => {
          if (l[n] != null)
            if (n == "value")
              for (let i in e[n])
                Object.assign(e[n][i], l[n][i]);
            else
              e[n] = l[n];
        }), M.value = !1;
      });
    })();
    const S = P([]);
    re({}).then((g) => {
      S.value = g.data;
    });
    const $ = P({});
    oe({}).then((g) => {
      if (g.data) {
        let l = g.data;
        for (let n = 0; n < l.length; n++) {
          let i = l[n];
          $.value[i.template_type] == null && ($.value[i.template_type] = []), $.value[i.template_type].push({
            template_id: i.template_id,
            template_name: i.template_name
          });
        }
      }
    });
    const Q = async (g) => {
      if (M.value || !g)
        return;
      if (y.value.length == 0) {
        G({
          type: "warning",
          message: a("printTypeEmpty")
        });
        return;
      }
      let l = e.printer_id ? pe : se;
      await g.validate(async (n) => {
        if (n) {
          let i = !1, _ = "";
          for (let s = 0; s < y.value.length; s++) {
            let c = y.value[s];
            for (let C = 0; C < Object.keys(c.trigger).length; C++) {
              let V = Object.keys(c.trigger)[C];
              if (e.value[c.key]["trigger_" + V].status == 0)
                continue;
              if (!e.value[c.key]["trigger_" + V].template_id) {
                i = !0, _ = `请设置${c.title}[${c.trigger[V]}]的小票打印模板`;
                break;
              }
              let T = !1;
              for (let N = 0; N < c.condition.length; N++) {
                let q = c.condition[N];
                if (q.type == "checkbox" && e.value[c.key]["trigger_" + V][q.key].length == 0) {
                  i = !0, _ = `请设置${c.title}[${c.trigger[V]}]的${q.title}`, T = !0;
                  break;
                }
              }
              if (T)
                break;
            }
            if (i)
              break;
          }
          if (i) {
            G({
              type: "warning",
              message: _
            });
            return;
          }
          e.template_type = [], e.trigger = [];
          for (let s in e.value) {
            for (let c in e.value[s])
              e.trigger.push(s + "_" + c);
            e.template_type.push(s);
          }
          if (U.value)
            return;
          U.value = !0, l(e).then((s) => {
            U.value = !1, e.printer_id || E.push("/printer/list");
          }).catch((s) => {
            U.value = !1;
          });
        }
      });
    }, z = () => {
      E.push("/printer/list");
    };
    return (g, l) => {
      const n = b("el-page-header"), i = b("el-card"), _ = b("el-input"), m = b("el-form-item"), s = b("el-option"), c = b("el-select"), C = b("el-radio"), V = b("el-radio-group"), T = b("el-switch"), N = b("el-checkbox"), q = b("el-checkbox-group"), X = b("el-form"), W = b("el-button"), Y = le("loading");
      return u(), h("div", me, [
        r(i, {
          class: "card !border-none mb-[15px]",
          shadow: "never"
        }, {
          default: d(() => [
            r(n, {
              content: o(H),
              icon: o(ue),
              onBack: z
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        ae((u(), F(X, {
          class: "page-form",
          model: e,
          rules: J.value,
          "label-width": "150px",
          ref_key: "formRef",
          ref: A
        }, {
          default: d(() => [
            r(i, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: d(() => [
                p("h3", fe, f(o(a)("printerSet")), 1),
                r(m, {
                  label: o(a)("printerName"),
                  prop: "printer_name"
                }, {
                  default: d(() => [
                    r(_, {
                      modelValue: e.printer_name,
                      "onUpdate:modelValue": l[0] || (l[0] = (t) => e.printer_name = t),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: o(a)("printerNamePlaceholder"),
                      class: "input-width",
                      maxlength: "20"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("brand"),
                  prop: "brand"
                }, {
                  default: d(() => [
                    r(c, {
                      modelValue: e.brand,
                      "onUpdate:modelValue": l[1] || (l[1] = (t) => e.brand = t),
                      placeholder: o(a)("brandPlaceholder"),
                      clearable: ""
                    }, {
                      default: d(() => [
                        (u(!0), h(k, null, w(S.value, (t, L) => (u(), F(s, {
                          key: L,
                          label: t,
                          value: L
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("printerCode"),
                  prop: "printer_code"
                }, {
                  default: d(() => [
                    p("div", null, [
                      r(_, {
                        modelValue: e.printer_code,
                        "onUpdate:modelValue": l[2] || (l[2] = (t) => e.printer_code = t),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: o(a)("printerCodePlaceholder"),
                        class: "input-width",
                        maxlength: "30"
                      }, null, 8, ["modelValue", "placeholder"]),
                      p("p", ve, f(o(a)("printerCodeTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("printerKey"),
                  prop: "printer_key"
                }, {
                  default: d(() => [
                    p("div", null, [
                      r(_, {
                        modelValue: e.printer_key,
                        "onUpdate:modelValue": l[3] || (l[3] = (t) => e.printer_key = t),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: o(a)("printerKeyPlaceholder"),
                        class: "input-width",
                        maxlength: "30"
                      }, null, 8, ["modelValue", "placeholder"]),
                      p("p", ge, f(o(a)("printerKeyTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("openId"),
                  prop: "open_id"
                }, {
                  default: d(() => [
                    p("div", null, [
                      r(_, {
                        modelValue: e.open_id,
                        "onUpdate:modelValue": l[4] || (l[4] = (t) => e.open_id = t),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: o(a)("openIdPlaceholder"),
                        class: "input-width",
                        maxlength: "30"
                      }, null, 8, ["modelValue", "placeholder"]),
                      p("p", be, f(o(a)("openIdTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("apikey"),
                  prop: "apikey"
                }, {
                  default: d(() => [
                    p("div", null, [
                      r(_, {
                        modelValue: e.apikey,
                        "onUpdate:modelValue": l[5] || (l[5] = (t) => e.apikey = t),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: o(a)("apikeyPlaceholder"),
                        class: "input-width",
                        maxlength: "60"
                      }, null, 8, ["modelValue", "placeholder"]),
                      p("p", he, f(o(a)("apikeyTips")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("printWidth"),
                  prop: "print_width"
                }, {
                  default: d(() => [
                    r(V, {
                      modelValue: e.print_width,
                      "onUpdate:modelValue": l[6] || (l[6] = (t) => e.print_width = t)
                    }, {
                      default: d(() => [
                        r(C, { label: "58mm" }, {
                          default: d(() => [
                            B("58mm")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(m, {
                  label: o(a)("status")
                }, {
                  default: d(() => [
                    r(T, {
                      modelValue: e.status,
                      "onUpdate:modelValue": l[7] || (l[7] = (t) => e.status = t),
                      "active-value": 1,
                      "inactive-value": 0
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            (u(!0), h(k, null, w(y.value, (t, L) => (u(), F(i, {
              key: t.key,
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: d(() => [
                p("h3", xe, f(t.title), 1),
                p("div", ke, [
                  p("div", ye, f(o(a)("printTrigger")), 1),
                  p("div", Ve, f(o(a)("status")), 1),
                  p("div", we, f(o(a)("usePrintTemplate")), 1),
                  (u(!0), h(k, null, w(t.condition, (D) => (u(), h("div", {
                    class: "px-[12px] w-[300px] flex-1",
                    key: D.key
                  }, f(D.title), 1))), 128)),
                  p("div", Pe, f(o(a)("printNum")), 1)
                ]),
                t.trigger ? (u(!0), h(k, { key: 0 }, w(t.trigger, (D, x) => (u(), h("div", {
                  class: "flex bg-[#f8f8f9] mb-[10px] py-[20px]",
                  key: x
                }, [
                  e.value[t.key]["trigger_" + x] ? (u(), h(k, { key: 0 }, [
                    p("div", Ue, f(D), 1),
                    p("div", Ce, [
                      r(T, {
                        modelValue: e.value[t.key]["trigger_" + x].status,
                        "onUpdate:modelValue": (v) => e.value[t.key]["trigger_" + x].status = v,
                        "active-value": 1,
                        "inactive-value": 0
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    p("div", Te, [
                      r(c, {
                        modelValue: e.value[t.key]["trigger_" + x].template_id,
                        "onUpdate:modelValue": (v) => e.value[t.key]["trigger_" + x].template_id = v,
                        placeholder: o(a)("请选择小票打印模板"),
                        clearable: ""
                      }, {
                        default: d(() => [
                          (u(!0), h(k, null, w($.value[t.key], (v) => (u(), F(s, {
                            key: v.template_id,
                            label: v.template_name,
                            value: v.template_id
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    (u(!0), h(k, null, w(t.condition, (v) => (u(), h(k, null, [
                      v.type == "checkbox" ? (u(), h("div", Ne, [
                        r(q, {
                          modelValue: e.value[t.key]["trigger_" + x][v.key],
                          "onUpdate:modelValue": (j) => e.value[t.key]["trigger_" + x][v.key] = j
                        }, {
                          default: d(() => [
                            (u(!0), h(k, null, w(v.list, (j, Z) => (u(), F(N, {
                              label: j.value,
                              key: Z
                            }, {
                              default: d(() => [
                                B(f(j.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["label"]))), 128))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ])) : O("", !0)
                    ], 64))), 256)),
                    p("div", qe, [
                      r(c, {
                        modelValue: e.value[t.key]["trigger_" + x].print_num,
                        "onUpdate:modelValue": (v) => e.value[t.key]["trigger_" + x].print_num = v
                      }, {
                        default: d(() => [
                          r(s, {
                            label: "1联",
                            value: 1
                          }),
                          r(s, {
                            label: "2联",
                            value: 2
                          }),
                          r(s, {
                            label: "3联",
                            value: 3
                          }),
                          r(s, {
                            label: "4联",
                            value: 4
                          })
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ], 64)) : O("", !0)
                ]))), 128)) : O("", !0)
              ]),
              _: 2
            }, 1024))), 128))
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [Y, M.value]
        ]),
        p("div", Fe, [
          p("div", Me, [
            r(W, {
              type: "primary",
              loading: U.value,
              onClick: l[8] || (l[8] = (t) => Q(A.value))
            }, {
              default: d(() => [
                B(f(o(a)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"]),
            r(W, {
              onClick: l[9] || (l[9] = (t) => z())
            }, {
              default: d(() => [
                B(f(o(a)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
export {
  ze as default
};
