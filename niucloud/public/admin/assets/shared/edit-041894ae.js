import { defineComponent as G, ref as g, onMounted as O, resolveComponent as m, resolveDirective as H, withDirectives as J, openBlock as i, createElementBlock as f, createVNode as r, withCtx as n, unref as t, createElementVNode as s, toDisplayString as c, createBlock as V, createTextVNode as C, createCommentVNode as b, Fragment as E, renderList as T } from "vue";
import { t as e, gh as Q, gi as W, gj as X, gk as Y, gl as ee, gm as le, gn as te } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as oe, ElMessage as ae } from "element-plus";
import { ArrowLeft as re } from "@element-plus/icons-vue";
import { useRoute as ne, useRouter as de } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const se = { class: "main-container form-sections" }, ue = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, pe = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, ie = { class: "text-[12px] text-[#a9a9a9] leading-normal" }, ce = {
  key: 1,
  class: "text-[12px] text-[#a9a9a9] leading-normal"
}, me = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, ve = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, ge = { class: "text-[12px] text-[#a9a9a9] leading-normal mt-[5px]" }, he = { class: "text-[12px] text-[#a9a9a9] leading-normal" }, fe = {
  key: 0,
  class: "fixed-footer-wrap"
}, ye = { class: "fixed-footer" }, Ee = /* @__PURE__ */ G({
  __name: "edit",
  setup(_e) {
    const h = ne(), w = de(), N = h.meta.title, $ = () => {
      w.push("/tools/addon/list");
    }, o = g({
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
    }), U = g([]), v = g(!1), D = g(), P = g([]), F = (d, l, u) => l !== "" ? /^[a-zA-Z][a-zA-Z0-9_]*$/.test(l) ? u() : u(new Error(e("keyPlaceholderErr"))) : u(new Error(e("keyPlaceholder"))), R = (d, l, u) => l !== "" ? /^([0-9]\d|[0-9])(\.([0-9]){1}){2}$/.test(l) ? u() : u(new Error(e("versionPlaceholderErr"))) : u(new Error(e("versionPlaceholder"))), S = g({
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
      const d = await Q();
      U.value = d.data, h.query.key && j(h.query.key);
    });
    const L = () => {
      o.value.support_app = "";
    }, j = (d) => {
      v.value = !0, W(d).then((l) => {
        o.value = Object.assign(o.value, l.data), v.value = !1;
      }).catch(() => {
        v.value = !1;
      });
    }, B = g([]);
    (async () => {
      const { data: d } = await Y();
      B.value = d;
    })();
    const z = (d) => {
      ee(d).then((l) => {
        oe.alert(l.data ? e("warningText") : e("successText"), e("warning"), {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: e("confirm"),
          callback: (u) => {
          }
        });
      });
    }, I = async (d) => {
      await d.validate(async (l) => {
        if (l) {
          const u = h.query.key ? le : te;
          v.value = !0, u(o.value.key, o.value).then((y) => {
            v.value = !1, ae({
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
      const u = m("el-page-header"), y = m("el-card"), _ = m("el-input"), p = m("el-form-item"), M = m("upload-image"), A = m("el-button"), x = m("el-option"), q = m("el-select"), K = m("el-form"), Z = H("loading");
      return J((i(), f("div", se, [
        r(y, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            r(u, {
              content: t(N),
              icon: t(re),
              onBack: l[0] || (l[0] = (a) => $())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        r(y, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            r(K, {
              model: o.value,
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
                      modelValue: o.value.title,
                      "onUpdate:modelValue": l[1] || (l[1] = (a) => o.value.title = a),
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
                    s("div", null, [
                      r(M, {
                        modelValue: o.value.icon,
                        "onUpdate:modelValue": l[2] || (l[2] = (a) => o.value.icon = a)
                      }, null, 8, ["modelValue"]),
                      s("p", ue, c(t(e)("iconPlaceholder1")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("key"),
                  prop: "key"
                }, {
                  default: n(() => [
                    s("div", null, [
                      r(_, {
                        modelValue: o.value.key,
                        "onUpdate:modelValue": l[3] || (l[3] = (a) => o.value.key = a),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        disabled: t(h).query.key,
                        placeholder: t(e)("keyPlaceholder"),
                        class: "input-width mr-[15px]"
                      }, null, 8, ["modelValue", "disabled", "placeholder"]),
                      t(h).query.key ? b("", !0) : (i(), V(A, {
                        key: 0,
                        type: "primary",
                        disabled: o.value.key == "",
                        onClick: l[4] || (l[4] = (a) => z(o.value.key))
                      }, {
                        default: n(() => [
                          C("官方市场标识检测")
                        ]),
                        _: 1
                      }, 8, ["disabled"])),
                      s("p", pe, c(t(e)("keyPlaceholder1")), 1),
                      s("p", ie, c(t(e)("keyPlaceholder2")), 1),
                      P.value.length ? (i(), f("p", ce, " 插件标识不能定义成黑名单中的值，插件标识黑名单：" + c(P.value.join("，")), 1)) : b("", !0)
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
                      modelValue: o.value.desc,
                      "onUpdate:modelValue": l[5] || (l[5] = (a) => o.value.desc = a),
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
                      modelValue: o.value.author,
                      "onUpdate:modelValue": l[6] || (l[6] = (a) => o.value.author = a),
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
                    s("div", null, [
                      r(_, {
                        modelValue: o.value.version,
                        "onUpdate:modelValue": l[7] || (l[7] = (a) => o.value.version = a),
                        modelModifiers: { trim: !0 },
                        clearable: "",
                        placeholder: t(e)("versionPlaceholder"),
                        class: "input-width",
                        onkeyup: "this.value = this.value.replace(/[^\\d\\.]/g,'');"
                      }, null, 8, ["modelValue", "placeholder"]),
                      s("p", me, c(t(e)("versionPlaceholder1")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("cover"),
                  prop: "cover"
                }, {
                  default: n(() => [
                    s("div", null, [
                      r(M, {
                        modelValue: o.value.cover,
                        "onUpdate:modelValue": l[8] || (l[8] = (a) => o.value.cover = a)
                      }, null, 8, ["modelValue"]),
                      s("p", ve, c(t(e)("coverPlaceholder1")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                r(p, {
                  label: t(e)("type"),
                  prop: "type"
                }, {
                  default: n(() => [
                    s("div", null, [
                      r(q, {
                        modelValue: o.value.type,
                        "onUpdate:modelValue": l[9] || (l[9] = (a) => o.value.type = a),
                        placeholder: t(e)("typePlaceholder"),
                        class: "input-width",
                        clearable: "",
                        onChange: L
                      }, {
                        default: n(() => [
                          (i(!0), f(E, null, T(U.value, (a, k) => (i(), V(x, {
                            key: k,
                            label: a,
                            value: k
                          }, null, 8, ["label", "value"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "placeholder"]),
                      s("p", ge, c(t(e)("typePlaceholder1")), 1),
                      s("p", he, c(t(e)("typePlaceholder2")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o.value.type === "addon" ? (i(), f(E, { key: 0 }, [
                  r(p, {
                    label: t(e)("supportType")
                  }, {
                    default: n(() => [
                      s("div", null, [
                        r(q, {
                          modelValue: o.value.support_type,
                          "onUpdate:modelValue": l[10] || (l[10] = (a) => o.value.support_type = a),
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
                  o.value.support_type != 1 ? (i(), V(p, {
                    key: 0,
                    label: t(e)("supportApp"),
                    prop: "support_app"
                  }, {
                    default: n(() => [
                      r(q, {
                        modelValue: o.value.support_app,
                        "onUpdate:modelValue": l[11] || (l[11] = (a) => o.value.support_app = a),
                        placeholder: t(e)("supportAppPlaceholder"),
                        class: "input-width"
                      }, {
                        default: n(() => [
                          (i(!0), f(E, null, T(B.value, (a, k) => (i(), V(x, {
                            label: a.title,
                            value: a.key,
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
        v.value ? b("", !0) : (i(), f("div", fe, [
          s("div", ye, [
            r(A, {
              type: "primary",
              onClick: l[12] || (l[12] = (a) => I(D.value))
            }, {
              default: n(() => [
                C(c(t(e)("GeneratePlugins")), 1)
              ]),
              _: 1
            }),
            r(A, {
              onClick: l[13] || (l[13] = (a) => t(w).push({ path: "/tools/addon" }))
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
  Ee as default
};
