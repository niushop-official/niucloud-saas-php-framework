import { defineComponent as G, ref as f, onMounted as O, resolveComponent as m, resolveDirective as Q, withDirectives as H, openBlock as i, createElementBlock as h, createVNode as r, withCtx as n, unref as t, createElementVNode as u, toDisplayString as c, createBlock as V, createTextVNode as C, createCommentVNode as b, Fragment as U, renderList as T } from "vue";
import { t as e, fP as J, fQ as W, fR as X, fS as Y, fT as ee, fU as le, fV as te } from "./core-shared-5b3bfa35.js";
import { ElMessageBox as ae, ElMessage as oe } from "element-plus";
import { ArrowLeft as re } from "@element-plus/icons-vue";
import { useRoute as ne, useRouter as de } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const ue = { class: "main-container" }, se = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, pe = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, ie = { class: "text-[12px] text-[#a9a9a9] leading-normal" }, ce = {
  key: 1,
  class: "text-[12px] text-[#a9a9a9] leading-normal"
}, me = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, ve = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, fe = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, ge = { class: "text-[12px] text-[#a9a9a9] leading-normal" }, he = {
  key: 0,
  class: "fixed-footer-wrap"
}, ye = { class: "fixed-footer" }, Ue = /* @__PURE__ */ G({
  __name: "edit",
  setup(_e) {
    const g = ne(), w = de(), N = g.meta.title, $ = () => {
      w.push("/tools/addon/list");
    }, a = f({
      title: "",
      icon: "",
      key: "",
      desc: "",
      author: "",
      version: "",
      cover: "",
      type: "",
      support_app: "",
      support_type: 1
    }), E = f([]), v = f(!1), D = f(), P = f([]), F = (d, l, s) => l !== "" ? /^[a-zA-Z][a-zA-Z0-9_]*$/.test(l) ? s() : s(new Error(e("keyPlaceholderErr"))) : s(new Error(e("keyPlaceholder"))), R = (d, l, s) => l !== "" ? /^([0-9]\d|[0-9])(\.([0-9]){1}){2}$/.test(l) ? s() : s(new Error(e("versionPlaceholderErr"))) : s(new Error(e("versionPlaceholder"))), S = f({
      title: [
        { required: !0, message: e("titlePlaceholder"), trigger: "blur" }
      ],
      icon: [
        { required: !0, message: e("iconPlaceholder"), trigger: "change" }
      ],
      key: [
        { required: !0, validator: F, trigger: "blur" }
      ],
      author: [
        { required: !0, message: e("authorPlaceholder"), trigger: "blur" }
      ],
      version: [
        { required: !0, validator: R, trigger: "blur" }
      ],
      cover: [
        { required: !0, message: e("coverPlaceholder"), trigger: "change" }
      ],
      type: [
        { required: !0, message: e("typePlaceholder"), trigger: "change" }
      ],
      support_app: [
        { required: !0, message: e("typePlaceholder"), trigger: "change" }
      ]
    });
    O(async () => {
      const d = await J();
      E.value = d.data, g.query.key && j(g.query.key);
    });
    const L = () => {
      a.value.support_app = "";
    }, j = (d) => {
      v.value = !0, W(d).then((l) => {
        a.value = Object.assign(a.value, l.data), v.value = !1;
      }).catch(() => {
        v.value = !1;
      });
    }, B = f([]);
    (async () => {
      const { data: d } = await Y();
      B.value = d;
    })();
    const z = (d) => {
      ee(d).then((l) => {
        ae.alert(l.data ? e("warningText") : e("successText"), e("warning"), {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: e("confirm"),
          callback: (s) => {
          }
        });
      });
    }, I = async (d) => {
      await d.validate(async (l) => {
        if (l) {
          const s = g.query.key ? le : te;
          v.value = !0, s(a.value.key, a.value).then((y) => {
            v.value = !1, oe({
              message: e("onSaveSuccessText"),
              type: "success"
            }), setTimeout(() => {
              window.addonActiveName = "pluginList", w.push({ path: "/tools/addon" });
            }, 650);
          }).catch(() => {
            v.value = !1;
          });
        }
      });
    };
    return X().then(({ data: d }) => {
      P.value = d;
    }), (d, l) => {
      const s = m("el-page-header"), y = m("el-card"), _ = m("el-input"), p = m("el-form-item"), M = m("upload-image"), A = m("el-button"), x = m("el-option"), q = m("el-select"), K = m("el-form"), Z = Q("loading");
      return H((i(), h("div", ue, [
        r(y, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            r(s, {
              content: t(N),
              icon: t(re),
              onBack: l[0] || (l[0] = (o) => $())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        r(y, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            r(K, {
              model: a.value,
              "label-width": "90px",
              ref_key: "formRef",
              ref: D,
              rules: S.value,
              class: "page-form"
            }, {
              default: n(() => [
                r(p, {
                  label: t(e)("title"),
                  prop: "title"
                }, {
                  default: n(() => [
                    r(_, {
                      modelValue: a.value.title,
                      "onUpdate:modelValue": l[1] || (l[1] = (o) => a.value.title = o),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: t(e)("titlePlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("icon"),
                  prop: "icon"
                }, {
                  default: n(() => [
                    u("div", null, [
                      r(M, {
                        modelValue: a.value.icon,
                        "onUpdate:modelValue": l[2] || (l[2] = (o) => a.value.icon = o)
                      }, null, 8, ["modelValue"]),
                      u("p", se, c(t(e)("iconPlaceholder1")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("key"),
                  prop: "key"
                }, {
                  default: n(() => [
                    u("div", null, [
                      r(_, {
                        modelValue: a.value.key,
                        "onUpdate:modelValue": l[3] || (l[3] = (o) => a.value.key = o),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        disabled: t(g).query.key,
                        placeholder: t(e)("keyPlaceholder"),
                        class: "input-width mr-[15px]"
                      }, null, 8, ["modelValue", "disabled", "placeholder"]),
                      t(g).query.key ? b("", !0) : (i(), V(A, {
                        key: 0,
                        type: "primary",
                        disabled: a.value.key == "",
                        onClick: l[4] || (l[4] = (o) => z(a.value.key))
                      }, {
                        default: n(() => [
                          C("官方市场标识检测")
                        ]),
                        _: 1
                      }, 8, ["disabled"])),
                      u("p", pe, c(t(e)("keyPlaceholder1")), 1),
                      u("p", ie, c(t(e)("keyPlaceholder2")), 1),
                      P.value.length ? (i(), h("p", ce, " 插件标识不能定义成黑名单中的值，插件标识黑名单：" + c(P.value.join("，")), 1)) : b("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("desc"),
                  prop: "desc"
                }, {
                  default: n(() => [
                    r(_, {
                      type: "textarea",
                      modelValue: a.value.desc,
                      "onUpdate:modelValue": l[5] || (l[5] = (o) => a.value.desc = o),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: t(e)("descPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("author"),
                  prop: "author"
                }, {
                  default: n(() => [
                    r(_, {
                      modelValue: a.value.author,
                      "onUpdate:modelValue": l[6] || (l[6] = (o) => a.value.author = o),
                      modelModifiers: { trim: !0 },
                      clearable: "",
                      placeholder: t(e)("authorPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("version"),
                  prop: "version"
                }, {
                  default: n(() => [
                    u("div", null, [
                      r(_, {
                        modelValue: a.value.version,
                        "onUpdate:modelValue": l[7] || (l[7] = (o) => a.value.version = o),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: t(e)("versionPlaceholder"),
                        class: "input-width",
                        onkeyup: "this.value = this.value.replace(/[^\\d\\.]/g,'');"
                      }, null, 8, ["modelValue", "placeholder"]),
                      u("p", me, c(t(e)("versionPlaceholder1")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("cover"),
                  prop: "cover"
                }, {
                  default: n(() => [
                    u("div", null, [
                      r(M, {
                        modelValue: a.value.cover,
                        "onUpdate:modelValue": l[8] || (l[8] = (o) => a.value.cover = o)
                      }, null, 8, ["modelValue"]),
                      u("p", ve, c(t(e)("coverPlaceholder1")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("type"),
                  prop: "type"
                }, {
                  default: n(() => [
                    u("div", null, [
                      r(q, {
                        modelValue: a.value.type,
                        "onUpdate:modelValue": l[9] || (l[9] = (o) => a.value.type = o),
                        placeholder: t(e)("typePlaceholder"),
                        class: "input-width",
                        clearable: "",
                        onChange: L
                      }, {
                        default: n(() => [
                          (i(!0), h(U, null, T(E.value, (o, k) => (i(), V(x, {
                            key: k,
                            label: o,
                            value: k
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"]),
                      u("p", fe, c(t(e)("typePlaceholder1")), 1),
                      u("p", ge, c(t(e)("typePlaceholder2")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a.value.type === "addon" ? (i(), h(U, { key: 0 }, [
                  r(p, {
                    label: t(e)("supportType")
                  }, {
                    default: n(() => [
                      u("div", null, [
                        r(q, {
                          modelValue: a.value.support_type,
                          "onUpdate:modelValue": l[10] || (l[10] = (o) => a.value.support_type = o),
                          class: "input-width",
                          onChange: L
                        }, {
                          default: n(() => [
                            r(x, {
                              label: "通用插件",
                              value: 1
                            }),
                            r(x, {
                              label: "支持应用",
                              value: 2
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a.value.support_type != 1 ? (i(), V(p, {
                    key: 0,
                    label: t(e)("supportApp"),
                    prop: "support_app"
                  }, {
                    default: n(() => [
                      r(q, {
                        modelValue: a.value.support_app,
                        "onUpdate:modelValue": l[11] || (l[11] = (o) => a.value.support_app = o),
                        placeholder: t(e)("supportAppPlaceholder"),
                        class: "input-width"
                      }, {
                        default: n(() => [
                          (i(!0), h(U, null, T(B.value, (o, k) => (i(), V(x, {
                            label: o.title,
                            value: o.key,
                            key: k
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"])) : b("", !0)
                ], 64)) : b("", !0)
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }),
        v.value ? b("", !0) : (i(), h("div", he, [
          u("div", ye, [
            r(A, {
              type: "primary",
              onClick: l[12] || (l[12] = (o) => I(D.value))
            }, {
              default: n(() => [
                C(c(t(e)("GeneratePlugins")), 1)
              ]),
              _: 1
            }),
            r(A, {
              onClick: l[13] || (l[13] = (o) => t(w).push({ path: "/tools/addon" }))
            }, {
              default: n(() => [
                C(c(t(e)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ]))
      ])), [
        [Z, v.value]
      ]);
    };
  }
});
export {
  Ue as default
};
