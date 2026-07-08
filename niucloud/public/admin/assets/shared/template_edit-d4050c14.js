import { _ as te } from "./preview-goods-order-edb1cdf9.js";
import { defineComponent as le, ref as N, reactive as ae, computed as oe, resolveComponent as m, resolveDirective as ne, openBlock as n, createElementBlock as v, createVNode as u, withCtx as d, unref as x, withDirectives as se, createBlock as h, createElementVNode as f, toDisplayString as V, Fragment as P, renderList as O, createTextVNode as z, createCommentVNode as w, normalizeStyle as re, resolveDynamicComponent as ue } from "vue";
import { t as _, dx as de, dG as pe, dH as ie, dI as ce } from "./core-shared-9b1e55e9.js";
import { ArrowLeft as me } from "@element-plus/icons-vue";
import { ElMessage as B } from "element-plus";
import { useRoute as ve, useRouter as _e } from "vue-router";
import "./virtual_addon-empty-c6937308.js";
import "axios";
import "vue-i18n";
import "pinia";
const fe = { class: "main-container" }, ye = { class: "flex" }, be = { class: "flex-1 mr-[20px] bg-[#fff]" }, ke = { class: "panel-title !text-sm" }, ge = { class: "panel-title !text-sm" }, xe = { class: "panel-title !text-sm" }, he = { class: "flex" }, Ve = { class: "leading-[30px] w-[50px] text-center text-[#707070] bg-[#d7d7d7] border-1 border-solid border-[#ededed]" }, we = {
  key: 4,
  class: "flex mr-[30px]"
}, Ue = /* @__PURE__ */ f("div", { class: "leading-[30px] w-[50px] text-center text-[#707070] bg-[#d7d7d7] border-1 border-solid border-[#ededed]" }, "字号", -1), Te = {
  key: 5,
  class: "flex mr-[30px]"
}, Ne = /* @__PURE__ */ f("div", { class: "leading-[30px] w-[50px] text-center text-[#707070] bg-[#d7d7d7] border-1 border-solid border-[#ededed]" }, "粗细", -1), Pe = {
  key: 0,
  class: "text-[12px] text-[#b2b2b2] mt-[10px]"
}, Ce = { class: "panel-title !text-sm" }, je = { class: "fixed-footer-wrap" }, De = { class: "fixed-footer" }, Ae = /* @__PURE__ */ le({
  __name: "template_edit",
  setup(Oe) {
    const M = ve(), H = _e(), J = M.meta.title, C = N(!1), j = N(!0), K = {
      template_id: M.query.template_id || 0,
      template_type: "",
      template_name: "",
      value: {}
    }, e = ae({ ...K }), R = N(), Q = oe(() => ({
      template_name: [
        { required: !0, message: _("templateNamePlaceholder"), trigger: "blur" }
      ],
      template_type: [
        { required: !0, message: _("templateTypePlaceholder"), trigger: "blur" }
      ]
    })), W = /* @__PURE__ */ Object.assign({}), $ = /* @__PURE__ */ Object.assign({ "/src/addon/shop/views/printer/components/preview-goods-order.vue": te });
    $ && Object.assign(W, $);
    const L = {};
    for (const [r, o] of Object.entries(W)) {
      const s = r.split("/").pop().split(".")[0];
      L[s] = o.default;
    }
    const q = N(""), y = N([]), U = N([]);
    (async () => {
      await de({}).then((r) => {
        r.data && r.data.length && (y.value = r.data, A(y.value[0].key, Boolean(parseInt(e.template_id)))), e.template_id || (j.value = !1);
      }), e.template_id && pe(e.template_id).then((r) => {
        let o = r.data;
        o && Object.keys(o).length ? (Object.keys(e).forEach((a) => {
          if (a == "value")
            for (let s in e[a])
              Object.assign(e[a][s], o[a][s]);
          else
            e[a] = o[a];
        }), j.value = !1) : (B({
          type: "warning",
          duration: 1500,
          message: _("printTemplateEmpty")
        }), setTimeout(() => {
          S(), j.value = !1;
        }, 2e3));
      });
    })();
    const A = (r, o = !1) => {
      for (let a = 0; a < y.value.length; a++)
        if (y.value[a].key == r) {
          e.template_type = y.value[a].key, q.value = y.value[a].path, U.value = y.value[a].template;
          break;
        }
      for (let a in e.value)
        delete e.value[a];
      X();
    }, X = () => {
      for (let r = 0; r < U.value.length; r++) {
        let o = U.value[r];
        e.value[o.key] = {};
        for (let a = 0; a < o.list.length; a++) {
          let s = o.list[a];
          e.value[o.key][s.key] = {
            type: s.type,
            value: s.value,
            status: s.status,
            fontSize: s.fontSize,
            fontWeight: s.fontWeight
          };
        }
      }
    }, Y = async (r) => {
      if (j.value || !r)
        return;
      if (y.value.length == 0) {
        B({
          type: "warning",
          message: _("printTypeEmpty")
        });
        return;
      }
      let o = e.template_id ? ie : ce;
      await r.validate(async (a) => {
        if (a) {
          let s = !1, T = "";
          for (let b = 0; b < U.value.length; b++) {
            let c = U.value[b], k = !1;
            for (let g = 0; g < c.list.length; g++) {
              let i = c.list[g];
              if (e.value[c.key][i.key].status != 0) {
                if (i.type == "input") {
                  if (e.value[c.key][i.key].value == "") {
                    s = !0, T = `请输入${i.label}`, k = !0;
                    break;
                  }
                } else if (i.type == "select" && e.value[c.key][i.key].value == "") {
                  s = !0, T = `${i.label}未设置[${i.text}]`, k = !0;
                  break;
                }
              }
            }
            if (k)
              break;
          }
          if (s) {
            B({
              type: "warning",
              message: T
            });
            return;
          }
          for (let b = 0; b < U.value.length; b++) {
            let c = U.value[b];
            for (let k = 0; k < c.list.length; k++) {
              let g = c.list[k];
              g.type == "checkbox" && (e.value[c.key][g.key].value.length ? e.value[c.key][g.key].status = 1 : e.value[c.key][g.key].status = 0);
            }
          }
          if (C.value)
            return;
          C.value = !0, o(e).then((b) => {
            C.value = !1, e.template_id || S();
          }).catch((b) => {
            C.value = !1;
          });
        }
      });
    }, S = () => {
      H.push("/printer/template/list");
    };
    return (r, o) => {
      const a = m("el-page-header"), s = m("el-card"), T = m("el-input"), E = m("el-form-item"), b = m("el-radio"), c = m("el-radio-group"), k = m("el-checkbox"), g = m("el-checkbox-group"), i = m("el-option"), F = m("el-select"), Z = m("el-form"), G = m("el-button"), I = ne("loading");
      return n(), v("div", fe, [
        u(s, {
          class: "card !border-none mb-[15px]",
          shadow: "never"
        }, {
          default: d(() => [
            u(a, {
              content: x(J),
              icon: x(me),
              onBack: S
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        se((n(), h(Z, {
          class: "page-form",
          model: e,
          rules: Q.value,
          "label-width": "150px",
          ref_key: "formRef",
          ref: R
        }, {
          default: d(() => [
            f("div", ye, [
              f("div", be, [
                u(s, {
                  class: "box-card !border-none",
                  shadow: "never"
                }, {
                  default: d(() => [
                    f("h3", ke, V(x(_)("templateInfoLabel")), 1),
                    u(E, {
                      label: x(_)("templateName"),
                      prop: "template_name"
                    }, {
                      default: d(() => [
                        u(T, {
                          modelValue: e.template_name,
                          "onUpdate:modelValue": o[0] || (o[0] = (l) => e.template_name = l),
                          modelModifiers: { trim: !0 },
                          clearable: "",
                          placeholder: x(_)("templateNamePlaceholder"),
                          class: "input-width",
                          maxlength: "20"
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    y.value.length ? (n(), h(E, {
                      key: 0,
                      label: x(_)("templateType"),
                      prop: "template_type"
                    }, {
                      default: d(() => [
                        u(c, {
                          modelValue: e.template_type,
                          "onUpdate:modelValue": o[1] || (o[1] = (l) => e.template_type = l)
                        }, {
                          default: d(() => [
                            (n(!0), v(P, null, O(y.value, (l) => (n(), h(b, {
                              key: l.key,
                              label: l.key,
                              onChange: A
                            }, {
                              default: d(() => [
                                z(V(l.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["label"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : w("", !0)
                  ]),
                  _: 1
                }),
                y.value.length ? (n(), h(s, {
                  key: 0,
                  class: "box-card !border-none",
                  shadow: "never"
                }, {
                  default: d(() => [
                    f("h3", ge, V(x(_)("templateEditLabel")), 1),
                    (n(!0), v(P, null, O(U.value, (l) => (n(), v("div", {
                      key: l.key,
                      class: "bg-[#f8f8f9] mb-[20px] py-[20px] px-[40px] text-[14px]"
                    }, [
                      f("h4", xe, V(l.title), 1),
                      (n(!0), v(P, null, O(l.list, (t, ee) => (n(), v("div", {
                        key: t.key,
                        class: "ml-[30px]",
                        style: re({ "margin-bottom": l.list.length == ee + 1 ? "0" : "20px" })
                      }, [
                        f("div", he, [
                          t.label ? (n(), h(k, {
                            key: 0,
                            modelValue: e.value[l.key][t.key].status,
                            "onUpdate:modelValue": (p) => e.value[l.key][t.key].status = p,
                            label: t.label,
                            value: t.status,
                            "true-value": 1,
                            "false-value": 0,
                            class: "w-[180px] mr-[10px]",
                            disabled: t.disabled
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value", "disabled"])) : w("", !0),
                          t.type == "input" ? (n(), h(T, {
                            key: 1,
                            modelValue: e.value[l.key][t.key].value,
                            "onUpdate:modelValue": (p) => e.value[l.key][t.key].value = p,
                            modelModifiers: { trim: !0 },
                            clearable: "",
                            placeholder: "请输入" + (t.placeholder ? t.placeholder : t.label),
                            class: "input-width mr-[30px]",
                            maxlength: "32"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : w("", !0),
                          t.type == "checkbox" ? (n(), h(g, {
                            key: 2,
                            modelValue: e.value[l.key][t.key].value,
                            "onUpdate:modelValue": (p) => e.value[l.key][t.key].value = p,
                            class: "mr-[30px]"
                          }, {
                            default: d(() => [
                              (n(!0), v(P, null, O(t.list, (p, D) => (n(), h(k, {
                                label: D,
                                key: D,
                                disabled: t.disabled
                              }, {
                                default: d(() => [
                                  z(V(p), 1)
                                ]),
                                _: 2
                              }, 1032, ["label", "disabled"]))), 128))
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue"])) : w("", !0),
                          t.type == "select" ? (n(), v(P, { key: 3 }, [
                            f("div", Ve, V(t.text), 1),
                            u(F, {
                              modelValue: e.value[l.key][t.key].value,
                              "onUpdate:modelValue": (p) => e.value[l.key][t.key].value = p,
                              class: "!w-[130px] mr-[30px]"
                            }, {
                              default: d(() => [
                                (n(!0), v(P, null, O(t.list, (p, D) => (n(), h(i, {
                                  key: D,
                                  label: p,
                                  value: D
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ], 64)) : w("", !0),
                          t.fontSize ? (n(), v("div", we, [
                            Ue,
                            u(F, {
                              modelValue: e.value[l.key][t.key].fontSize,
                              "onUpdate:modelValue": (p) => e.value[l.key][t.key].fontSize = p,
                              class: "!w-[130px]"
                            }, {
                              default: d(() => [
                                u(i, {
                                  label: "小",
                                  value: "normal"
                                }),
                                u(i, {
                                  label: "大",
                                  value: "big"
                                })
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ])) : w("", !0),
                          t.fontWeight ? (n(), v("div", Te, [
                            Ne,
                            u(F, {
                              modelValue: e.value[l.key][t.key].fontWeight,
                              "onUpdate:modelValue": (p) => e.value[l.key][t.key].fontWeight = p,
                              class: "!w-[130px]"
                            }, {
                              default: d(() => [
                                u(i, {
                                  label: "正常",
                                  value: "normal"
                                }),
                                u(i, {
                                  label: "加粗",
                                  value: "bold"
                                })
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ])) : w("", !0)
                        ]),
                        t.remark ? (n(), v("div", Pe, V(t.remark), 1)) : w("", !0)
                      ], 4))), 128))
                    ]))), 128))
                  ]),
                  _: 1
                })) : w("", !0)
              ]),
              u(s, {
                class: "box-card !border-none w-[450px]",
                shadow: "never"
              }, {
                default: d(() => [
                  f("h3", Ce, V(x(_)("preview")), 1),
                  (n(), h(ue(L[q.value]), {
                    value: e.value
                  }, null, 8, ["value"]))
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [I, j.value]
        ]),
        f("div", je, [
          f("div", De, [
            u(G, {
              type: "primary",
              loading: C.value,
              onClick: o[2] || (o[2] = (l) => Y(R.value))
            }, {
              default: d(() => [
                z(V(x(_)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"]),
            u(G, {
              onClick: o[3] || (o[3] = (l) => S())
            }, {
              default: d(() => [
                z(V(x(_)("cancel")), 1)
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
  Ae as default
};
