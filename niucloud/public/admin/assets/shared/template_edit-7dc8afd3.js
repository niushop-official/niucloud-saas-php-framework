import { _ as te } from "./_addon-external_empty-b652abd0.js";
import { defineComponent as le, ref as N, reactive as ae, computed as oe, resolveComponent as _, resolveDirective as ne, openBlock as s, createElementBlock as y, createVNode as u, withCtx as d, unref as g, withDirectives as se, createBlock as h, createElementVNode as k, toDisplayString as V, Fragment as C, renderList as O, createTextVNode as F, createCommentVNode as U, normalizeStyle as re, resolveDynamicComponent as ue, defineAsyncComponent as de } from "vue";
import { t as b, dW as pe, e3 as ie, e4 as ce, e5 as me } from "./core-shared-c6ad4e77.js";
import { ArrowLeft as fe } from "@element-plus/icons-vue";
import { ElMessage as $ } from "element-plus";
import { useRoute as ve, useRouter as _e } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const ye = { class: "main-container" }, be = { class: "flex" }, ke = { class: "flex-1 mr-[20px] bg-[#fff]" }, ge = { class: "panel-title !text-sm" }, xe = { class: "panel-title !text-sm" }, he = { class: "panel-title !text-sm" }, Ve = { class: "flex" }, we = { class: "leading-[30px] w-[50px] text-center text-[#707070] bg-[#d7d7d7] border-1 border-solid border-[#ededed]" }, Ue = {
  key: 4,
  class: "flex mr-[30px]"
}, Te = /* @__PURE__ */ k("div", { class: "leading-[30px] w-[50px] text-center text-[#707070] bg-[#d7d7d7] border-1 border-solid border-[#ededed]" }, "字号", -1), Pe = {
  key: 5,
  class: "flex mr-[30px]"
}, Ne = /* @__PURE__ */ k("div", { class: "leading-[30px] w-[50px] text-center text-[#707070] bg-[#d7d7d7] border-1 border-solid border-[#ededed]" }, "粗细", -1), Ce = {
  key: 0,
  class: "text-[12px] text-[#b2b2b2] mt-[10px]"
}, je = { class: "panel-title !text-sm" }, De = { class: "fixed-footer-wrap" }, Ee = { class: "fixed-footer" }, Ae = /* @__PURE__ */ le({
  __name: "template_edit",
  setup(Oe) {
    const B = ve(), K = _e(), G = B.meta.title, j = N(!1), D = N(!0), J = {
      template_id: B.query.template_id || 0,
      template_type: "",
      template_name: "",
      value: {}
    }, e = ae({ ...J }), M = N(), Q = oe(() => ({
      template_name: [
        { required: !0, message: b("templateNamePlaceholder"), trigger: "blur" }
      ],
      template_type: [
        { required: !0, message: b("templateTypePlaceholder"), trigger: "blur" }
      ]
    })), R = /* @__PURE__ */ Object.assign({}), L = /* @__PURE__ */ Object.assign({ "/src/addon/shop/views/printer/components/preview-goods-order.vue": te });
    L && Object.assign(R, L);
    const S = {};
    for (const [r, l] of Object.entries(R)) {
      const n = r.split("/").pop().split(".")[0];
      S[n] = l.default;
    }
    const q = N(""), f = N([]), T = N([]);
    (async () => {
      await pe({}).then((r) => {
        r.data && r.data.length && (f.value = r.data, f.value.length && import("./core-shared-c6ad4e77.js").then((l) => l.jH).then(({ loadAddonComponent: l, getInstalledAddonKeys: a }) => {
          const n = a();
          for (const P of f.value) {
            const w = P.path;
            !w || S[w] || (S[w] = de(
              () => (async () => {
                for (const v of n) {
                  const p = l(v, "printer/components", w);
                  try {
                    const i = await p();
                    if (i != null && i.default)
                      return i.default;
                  } catch {
                  }
                }
                throw new Error(`Printer component "${w}" not found in any addon`);
              })()
            ));
          }
        }), A(f.value[0].key, Boolean(parseInt(e.template_id)))), e.template_id || (D.value = !1);
      }), e.template_id && ie(e.template_id).then((r) => {
        let l = r.data;
        l && Object.keys(l).length ? (Object.keys(e).forEach((a) => {
          if (a == "value")
            for (let n in e[a])
              Object.assign(e[a][n], l[a][n]);
          else
            e[a] = l[a];
        }), D.value = !1) : ($({
          type: "warning",
          duration: 1500,
          message: b("printTemplateEmpty")
        }), setTimeout(() => {
          z(), D.value = !1;
        }, 2e3));
      });
    })();
    const A = (r, l = !1) => {
      for (let a = 0; a < f.value.length; a++)
        if (f.value[a].key == r) {
          e.template_type = f.value[a].key, q.value = f.value[a].path, T.value = f.value[a].template;
          break;
        }
      for (let a in e.value)
        delete e.value[a];
      X();
    }, X = () => {
      for (let r = 0; r < T.value.length; r++) {
        let l = T.value[r];
        e.value[l.key] = {};
        for (let a = 0; a < l.list.length; a++) {
          let n = l.list[a];
          e.value[l.key][n.key] = {
            type: n.type,
            value: n.value,
            status: n.status,
            fontSize: n.fontSize,
            fontWeight: n.fontWeight
          };
        }
      }
    }, Y = async (r) => {
      if (D.value || !r)
        return;
      if (f.value.length == 0) {
        $({
          type: "warning",
          message: b("printTypeEmpty")
        });
        return;
      }
      let l = e.template_id ? ce : me;
      await r.validate(async (a) => {
        if (a) {
          let n = !1, P = "";
          for (let v = 0; v < T.value.length; v++) {
            let p = T.value[v], i = !1;
            for (let x = 0; x < p.list.length; x++) {
              let m = p.list[x];
              if (e.value[p.key][m.key].status != 0) {
                if (m.type == "input") {
                  if (e.value[p.key][m.key].value == "") {
                    n = !0, P = `请输入${m.label}`, i = !0;
                    break;
                  }
                } else if (m.type == "select" && e.value[p.key][m.key].value == "") {
                  n = !0, P = `${m.label}未设置[${m.text}]`, i = !0;
                  break;
                }
              }
            }
            if (i)
              break;
          }
          if (n) {
            $({
              type: "warning",
              message: P
            });
            return;
          }
          for (let v = 0; v < T.value.length; v++) {
            let p = T.value[v];
            for (let i = 0; i < p.list.length; i++) {
              let x = p.list[i];
              x.type == "checkbox" && (e.value[p.key][x.key].value.length ? e.value[p.key][x.key].status = 1 : e.value[p.key][x.key].status = 0);
            }
          }
          if (j.value)
            return;
          j.value = !0, l(e).then((v) => {
            j.value = !1, e.template_id || z();
          }).catch((v) => {
            j.value = !1;
          });
        }
      });
    }, z = () => {
      K.push("/printer/template/list");
    };
    return (r, l) => {
      const a = _("el-page-header"), n = _("el-card"), P = _("el-input"), w = _("el-form-item"), v = _("el-radio"), p = _("el-radio-group"), i = _("el-checkbox"), x = _("el-checkbox-group"), m = _("el-option"), W = _("el-select"), Z = _("el-form"), H = _("el-button"), I = ne("loading");
      return s(), y("div", ye, [
        u(n, {
          class: "card !border-none mb-[15px]",
          shadow: "never"
        }, {
          default: d(() => [
            u(a, {
              content: g(G),
              icon: g(fe),
              onBack: z
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        se((s(), h(Z, {
          class: "page-form",
          model: e,
          rules: g(Q),
          "label-width": "150px",
          ref_key: "formRef",
          ref: M
        }, {
          default: d(() => [
            k("div", be, [
              k("div", ke, [
                u(n, {
                  class: "box-card !border-none",
                  shadow: "never"
                }, {
                  default: d(() => [
                    k("h3", ge, V(g(b)("templateInfoLabel")), 1),
                    u(w, {
                      label: g(b)("templateName"),
                      prop: "template_name"
                    }, {
                      default: d(() => [
                        u(P, {
                          modelValue: e.template_name,
                          "onUpdate:modelValue": l[0] || (l[0] = (o) => e.template_name = o),
                          modelModifiers: { trim: !0 },
                          clearable: "",
                          placeholder: g(b)("templateNamePlaceholder"),
                          class: "input-width",
                          maxlength: "20"
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    f.value.length ? (s(), h(w, {
                      key: 0,
                      label: g(b)("templateType"),
                      prop: "template_type"
                    }, {
                      default: d(() => [
                        u(p, {
                          modelValue: e.template_type,
                          "onUpdate:modelValue": l[1] || (l[1] = (o) => e.template_type = o)
                        }, {
                          default: d(() => [
                            (s(!0), y(C, null, O(f.value, (o) => (s(), h(v, {
                              key: o.key,
                              label: o.key,
                              onChange: A
                            }, {
                              default: d(() => [
                                F(V(o.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["label"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : U("", !0)
                  ]),
                  _: 1
                }),
                f.value.length ? (s(), h(n, {
                  key: 0,
                  class: "box-card !border-none",
                  shadow: "never"
                }, {
                  default: d(() => [
                    k("h3", xe, V(g(b)("templateEditLabel")), 1),
                    (s(!0), y(C, null, O(T.value, (o) => (s(), y("div", {
                      key: o.key,
                      class: "bg-[#f8f8f9] mb-[20px] py-[20px] px-[40px] text-[14px]"
                    }, [
                      k("h4", he, V(o.title), 1),
                      (s(!0), y(C, null, O(o.list, (t, ee) => (s(), y("div", {
                        key: t.key,
                        class: "ml-[30px]",
                        style: re({ "margin-bottom": o.list.length == ee + 1 ? "0" : "20px" })
                      }, [
                        k("div", Ve, [
                          t.label ? (s(), h(i, {
                            key: 0,
                            modelValue: e.value[o.key][t.key].status,
                            "onUpdate:modelValue": (c) => e.value[o.key][t.key].status = c,
                            label: t.label,
                            value: t.status,
                            "true-value": 1,
                            "false-value": 0,
                            class: "w-[180px] mr-[10px]",
                            disabled: t.disabled
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value", "disabled"])) : U("", !0),
                          t.type == "input" ? (s(), h(P, {
                            key: 1,
                            modelValue: e.value[o.key][t.key].value,
                            "onUpdate:modelValue": (c) => e.value[o.key][t.key].value = c,
                            modelModifiers: { trim: !0 },
                            clearable: "",
                            placeholder: "请输入" + (t.placeholder ? t.placeholder : t.label),
                            class: "input-width mr-[30px]",
                            maxlength: "32"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : U("", !0),
                          t.type == "checkbox" ? (s(), h(x, {
                            key: 2,
                            modelValue: e.value[o.key][t.key].value,
                            "onUpdate:modelValue": (c) => e.value[o.key][t.key].value = c,
                            class: "mr-[30px]"
                          }, {
                            default: d(() => [
                              (s(!0), y(C, null, O(t.list, (c, E) => (s(), h(i, {
                                label: E,
                                key: E,
                                disabled: t.disabled
                              }, {
                                default: d(() => [
                                  F(V(c), 1)
                                ]),
                                _: 2
                              }, 1032, ["label", "disabled"]))), 128))
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue"])) : U("", !0),
                          t.type == "select" ? (s(), y(C, { key: 3 }, [
                            k("div", we, V(t.text), 1),
                            u(W, {
                              modelValue: e.value[o.key][t.key].value,
                              "onUpdate:modelValue": (c) => e.value[o.key][t.key].value = c,
                              class: "!w-[130px] mr-[30px]"
                            }, {
                              default: d(() => [
                                (s(!0), y(C, null, O(t.list, (c, E) => (s(), h(m, {
                                  key: E,
                                  label: c,
                                  value: E
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ], 64)) : U("", !0),
                          t.fontSize ? (s(), y("div", Ue, [
                            Te,
                            u(W, {
                              modelValue: e.value[o.key][t.key].fontSize,
                              "onUpdate:modelValue": (c) => e.value[o.key][t.key].fontSize = c,
                              class: "!w-[130px]"
                            }, {
                              default: d(() => [
                                u(m, {
                                  label: "小",
                                  value: "normal"
                                }),
                                u(m, {
                                  label: "大",
                                  value: "big"
                                })
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ])) : U("", !0),
                          t.fontWeight ? (s(), y("div", Pe, [
                            Ne,
                            u(W, {
                              modelValue: e.value[o.key][t.key].fontWeight,
                              "onUpdate:modelValue": (c) => e.value[o.key][t.key].fontWeight = c,
                              class: "!w-[130px]"
                            }, {
                              default: d(() => [
                                u(m, {
                                  label: "正常",
                                  value: "normal"
                                }),
                                u(m, {
                                  label: "加粗",
                                  value: "bold"
                                })
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])
                          ])) : U("", !0)
                        ]),
                        t.remark ? (s(), y("div", Ce, V(t.remark), 1)) : U("", !0)
                      ], 4))), 128))
                    ]))), 128))
                  ]),
                  _: 1
                })) : U("", !0)
              ]),
              u(n, {
                class: "box-card !border-none w-[450px]",
                shadow: "never"
              }, {
                default: d(() => [
                  k("h3", je, V(g(b)("preview")), 1),
                  (s(), h(ue(S[q.value]), {
                    value: e.value
                  }, null, 8, ["value"]))
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [I, D.value]
        ]),
        k("div", De, [
          k("div", Ee, [
            u(H, {
              type: "primary",
              loading: j.value,
              onClick: l[2] || (l[2] = (o) => Y(M.value))
            }, {
              default: d(() => [
                F(V(g(b)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"]),
            u(H, {
              onClick: l[3] || (l[3] = (o) => z())
            }, {
              default: d(() => [
                F(V(g(b)("cancel")), 1)
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
