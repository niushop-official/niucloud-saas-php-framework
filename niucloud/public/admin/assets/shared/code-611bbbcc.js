import { defineComponent as ye, ref as f, reactive as X, resolveComponent as m, resolveDirective as we, openBlock as _, createElementBlock as k, Fragment as be, createElementVNode as p, createVNode as a, withCtx as t, toDisplayString as r, unref as o, createTextVNode as c, createCommentVNode as h, withDirectives as ke, createBlock as x, resolveDynamicComponent as xe } from "vue";
import { a6 as Ve, t as e, a9 as Ce, aa as Te, ab as Ue, W as Re, ac as Be, s as De, ad as Me } from "./core-shared-ca1fcae5.js";
import { useRoute as $e, useRouter as ze } from "vue-router";
import { g as Ae } from "./module-15a2966b.js";
import { ElMessageBox as R } from "element-plus";
import { _ as Ee } from "./index.vue_vue_type_script_setup_true_lang-fa6b1e42.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./dark-eb307d84.js";
const Fe = { class: "main-container" }, We = { class: "flex justify-between items-center" }, Pe = { class: "text-page-title" }, Se = {
  key: 0,
  class: "mt-[20px]"
}, Ie = {
  key: 1,
  class: "mt-[20px]"
}, Le = { class: "text-[14px] mt-[15px]" }, Ne = { class: "flex items-center" }, je = { key: 0 }, He = { class: "mr-10 text-primary" }, Ke = { key: 1 }, qe = { class: "flex items-center" }, Qe = {
  key: 0,
  class: "mt-2"
}, Ge = { class: "mr-10 text-primary" }, Je = {
  key: 1,
  class: "mt-2"
}, Oe = { class: "mt-[16px] flex justify-end" }, Xe = { class: "dialog-footer" }, Ye = /* @__PURE__ */ p("div", { class: "mt-[10px] text-[12px] text-[#999] leading-[20px]" }, "默认为列表版本号递增，自定义则为手动输入版本号进行上传，首位必须大于1", -1), Ze = { class: "flex items-end" }, el = { class: "mx-[10px]" }, ll = { class: "mx-[10px]" }, al = { class: "dialog-footer" }, tl = ["innerHTML"], ol = { class: "dialog-footer" }, nl = ["innerHTML"], il = { class: "flex justify-end" }, yl = /* @__PURE__ */ ye({
  __name: "code",
  setup(sl) {
    const Y = $e(), F = ze(), Z = Y.meta.title, W = f(!1), C = f(!0), V = f(null), d = X({
      page: 1,
      limit: 10,
      total: 0,
      loading: !1,
      data: [],
      version_info: {}
    }), s = f({
      type: 1,
      version: "",
      code1: "1",
      code2: "0",
      code3: "0"
    }), B = f(!1), D = f("");
    Ae().then((i) => {
      i.data.data && i.data.data.auth_code && (D.value = i.data.data.auth_code, S()), C.value = !1;
    }).catch(() => {
      C.value = !1;
    });
    const M = f({
      app_id: "",
      app_secret: "",
      is_authorization: 0
    });
    Ve().then((i) => {
      M.value = i.data;
    });
    const P = f("/channel/weapp/code"), ee = (i) => {
      F.push({ path: P.value });
    }, I = f(null), L = f(null), le = X({
      code1: [
        {
          validator: (i, l, u) => {
            l < 1 ? u(new Error(e("必须大于1"))) : u();
          },
          trigger: "blur"
        }
      ],
      code2: [
        {
          validator: (i, l, u) => {
            l < 0 ? u(new Error(e("必须大于0"))) : u();
          },
          trigger: "blur"
        }
      ],
      code3: [
        {
          validator: (i, l, u) => {
            l < 0 ? u(new Error(e("必须大于0"))) : u();
          },
          trigger: "blur"
        }
      ],
      version: [
        {
          required: !0,
          validator: (i, l, u) => {
            s.value.type == 2 && (!s.value.code1 || !s.value.code2 || !s.value.code3) ? u(new Error(e("请填写版本号"))) : u();
          }
        }
      ]
    }), y = (i) => (d.loading = !0, i && (d.page = i), Te({
      page: d.page,
      limit: d.limit
    }).then((l) => {
      d.loading = !1, d.data = l.data.data, d.total = l.data.total, d.version_info = l.data.version_info;
      const u = l.data.data.find((w) => w.status == 0);
      u && V.value && (V.value.setTask(u), V.value.open(u.task_key, u));
    }).catch(() => {
      d.loading = !1;
    }));
    y();
    const ae = () => {
      if (!D.value) {
        H();
        return;
      }
      if (!M.value.app_id) {
        K();
        return;
      }
      s.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      }, T.value = !0;
    }, te = () => {
      I.value.clearValidate();
    }, T = f(!1), N = () => {
      T.value = !1, s.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      };
    }, oe = () => {
      L.value.validate((i) => {
        i && (s.value.type == 2 && (s.value.version = `${s.value.code1}.${s.value.code2}.${s.value.code3}`), delete s.value.code1, delete s.value.code2, delete s.value.code3, delete s.value.type, T.value = !1, j());
      });
    }, g = f(!1), j = () => {
      if (!D.value) {
        H();
        return;
      }
      if (!M.value.app_id) {
        K();
        return;
      }
      if (g.value) {
        const i = V.value;
        i && i.cloudBuildTask && i.cloudBuildTask.task_key ? i.open(i.cloudBuildTask.task_key, i.cloudBuildTask) : i && (i.showDialog = !0);
        return;
      }
      g.value = !0, $.value = "", Ue(s.value).then((i) => {
        const l = i.data;
        y().then(() => {
          const u = d.data.find((w) => w.id === l);
          if (u && u.task_key) {
            const w = V.value;
            w && w.open(u.task_key, u);
          }
          S(), g.value = !1;
        }).catch(() => {
          g.value = !1;
        });
      }).catch(() => {
        g.value = !1;
      });
    }, ne = () => {
      R.alert(e("localInsertTips"), e("warning"), {
        confirmButtonText: e("confirm")
      });
    }, $ = f(""), S = () => {
      D.value && Ce().then((i) => {
        i.data && ($.value = `<img src="${i.data}" class="w-[150px]">`);
      }).catch();
    };
    f(null), f(0);
    const H = () => {
      Re() == "admin" ? R.confirm(
        e("authTips"),
        e("warning"),
        {
          distinguishCancelAndClose: !0,
          confirmButtonText: e("toBind"),
          cancelButtonText: e("toNiucloud")
        }
      ).then(() => {
        F.push({ path: "/app/authorize" });
      }).catch((i) => {
        i === "cancel" && window.open("https://www.niucloud.com/app");
      }) : R.alert(e("siteAuthTips"), e("warning"));
    }, K = () => {
      R.confirm(
        e("weappTips"),
        e("warning"),
        {
          confirmButtonText: e("toSetting"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        F.push({ path: "/channel/weapp/config" });
      });
    }, ie = (i) => {
      R.confirm(
        e("undoAuditTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        Be({ id: i.id }).then(() => {
          y();
        });
      });
    }, q = f(""), z = f(!1), se = (i) => {
      q.value = i.fail_reason, z.value = !0;
    }, de = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html");
    }, ue = () => {
      De.set({ key: "weappUploadTipsLock", data: !0 }), B.value = !1;
    }, Q = () => {
      g.value || (g.value = !0, Me().then(() => {
        y(), S(), g.value = !1;
      }).catch(() => {
        g.value = !1;
      }));
    };
    return (i, l) => {
      const u = m("el-tab-pane"), w = m("el-tabs"), v = m("el-button"), A = m("el-table-column"), re = m("el-tooltip"), pe = m("el-table"), ce = m("el-pagination"), fe = m("el-card"), U = m("el-input"), b = m("el-form-item"), me = m("upload-file"), G = m("el-form"), E = m("el-dialog"), J = m("el-radio"), ve = m("el-radio-group"), _e = m("el-scrollbar"), ge = we("loading");
      return _(), k(be, null, [
        p("div", Fe, [
          a(fe, {
            class: "card !border-none",
            shadow: "never"
          }, {
            default: t(() => [
              p("div", We, [
                p("span", Pe, r(o(Z)), 1)
              ]),
              a(w, {
                modelValue: P.value,
                "onUpdate:modelValue": l[0] || (l[0] = (n) => P.value = n),
                class: "my-[20px]",
                onTabChange: ee
              }, {
                default: t(() => [
                  a(u, {
                    label: o(e)("weappAccessFlow"),
                    name: "/channel/weapp"
                  }, null, 8, ["label"]),
                  a(u, {
                    label: o(e)("subscribeMessage"),
                    name: "/channel/weapp/message"
                  }, null, 8, ["label"]),
                  a(u, {
                    label: o(e)("weappRelease"),
                    name: "/channel/weapp/code"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              M.value.is_authorization ? (_(), k("div", Ie, [
                a(v, {
                  type: "primary",
                  onClick: Q,
                  loading: g.value,
                  disabled: C.value
                }, {
                  default: t(() => [
                    c(r(o(e)("uploadWeapp")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])) : (_(), k("div", Se, [
                a(v, {
                  type: "primary",
                  onClick: ae,
                  loading: g.value,
                  disabled: C.value
                }, {
                  default: t(() => [
                    c(r(o(e)("cloudRelease")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"]),
                a(v, {
                  onClick: ne,
                  disabled: C.value
                }, {
                  default: t(() => [
                    c(r(o(e)("localRelease")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])),
              p("div", Le, [
                p("div", Ne, [
                  d.version_info.release_version ? (_(), k("div", je, [
                    c(" 线上版本: "),
                    p("span", He, r(d.version_info.release_version), 1)
                  ])) : h("", !0),
                  d.version_info.release_time ? (_(), k("div", Ke, [
                    c(" 发布时间: "),
                    p("span", null, r(d.version_info.release_time), 1)
                  ])) : h("", !0)
                ]),
                p("div", qe, [
                  d.version_info.exp_version ? (_(), k("div", Qe, [
                    c(" 体验版本: "),
                    p("span", Ge, r(d.version_info.exp_version), 1)
                  ])) : h("", !0),
                  d.version_info.exp_time ? (_(), k("div", Je, [
                    c(" 过期时间: "),
                    p("span", null, r(d.version_info.exp_time), 1)
                  ])) : h("", !0)
                ])
              ]),
              ke((_(), x(pe, {
                class: "mt-[15px]",
                data: d.data,
                size: "default"
              }, {
                empty: t(() => [
                  p("span", null, r(o(e)("emptyData")), 1)
                ]),
                default: t(() => [
                  a(A, {
                    prop: "version",
                    label: o(e)("code"),
                    align: "left"
                  }, null, 8, ["label"]),
                  a(A, {
                    prop: "status_name",
                    label: o(e)("status"),
                    align: "left"
                  }, {
                    default: t(({ row: n }) => [
                      p("div", null, r(n.status_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(A, {
                    prop: "create_time",
                    label: o(e)("createTime"),
                    align: "center"
                  }, null, 8, ["label"]),
                  a(A, {
                    label: o(e)("operation"),
                    fixed: "right",
                    align: "right",
                    "min-width": "120"
                  }, {
                    default: t(({ row: n, $index: he }) => [
                      $.value && he == 0 && (n.status == 1 || n.status == 2) && d.page == 1 ? (_(), x(re, {
                        key: 0,
                        content: $.value,
                        "raw-content": "",
                        effect: "light"
                      }, {
                        default: t(() => [
                          a(v, {
                            type: "primary",
                            link: ""
                          }, {
                            default: t(() => [
                              c(r(o(e)("preview")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])) : h("", !0),
                      n.status == -1 || n.status == -2 ? (_(), x(v, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (O) => se(n)
                      }, {
                        default: t(() => [
                          c(r(o(e)("failReason")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : h("", !0),
                      n.status == -2 ? (_(), x(v, {
                        key: 2,
                        type: "primary",
                        link: "",
                        onClick: (O) => Q(),
                        loading: g.value
                      }, {
                        default: t(() => [
                          c(r(o(e)("againUpload")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "loading"])) : h("", !0),
                      n.status == 2 ? (_(), x(v, {
                        key: 3,
                        type: "primary",
                        link: "",
                        onClick: (O) => ie(n)
                      }, {
                        default: t(() => [
                          c(r(o(e)("undoAudit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : h("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [ge, d.loading]
              ]),
              p("div", Oe, [
                a(ce, {
                  "current-page": d.page,
                  "onUpdate:currentPage": l[1] || (l[1] = (n) => d.page = n),
                  "page-size": d.limit,
                  "onUpdate:pageSize": l[2] || (l[2] = (n) => d.limit = n),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: d.total,
                  onSizeChange: l[3] || (l[3] = (n) => y()),
                  onCurrentChange: y
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            _: 1
          }),
          a(E, {
            modelValue: W.value,
            "onUpdate:modelValue": l[8] || (l[8] = (n) => W.value = n),
            title: o(e)("codeDownTwoDesc"),
            width: "30%",
            "before-close": te
          }, {
            footer: t(() => [
              p("span", Xe, [
                a(v, {
                  onClick: l[7] || (l[7] = (n) => W.value = !1)
                }, {
                  default: t(() => [
                    c(r(o(e)("cancel")), 1)
                  ]),
                  _: 1
                }),
                a(v, {
                  type: "primary",
                  onClick: j
                }, {
                  default: t(() => [
                    c(r(o(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: t(() => [
              a(G, {
                ref_key: "ruleFormRef",
                ref: I,
                model: s.value,
                "label-width": "120px"
              }, {
                default: t(() => [
                  a(b, {
                    prop: "code",
                    label: o(e)("code")
                  }, {
                    default: t(() => [
                      a(U, {
                        modelValue: s.value.code,
                        "onUpdate:modelValue": l[4] || (l[4] = (n) => s.value.code = n),
                        modelModifiers: { trim: !0 },
                        placeholder: o(e)("codePlaceholder"),
                        onkeyup: "this.value = this.value.replace(/[^\\d\\.]/g,'');"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(b, {
                    prop: "path",
                    label: o(e)("path")
                  }, {
                    default: t(() => [
                      a(me, {
                        modelValue: s.value.path,
                        "onUpdate:modelValue": l[5] || (l[5] = (n) => s.value.path = n),
                        api: "weapp/upload",
                        accept: ".zip"
                      }, null, 8, ["modelValue", "accept"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(b, {
                    label: o(e)("content")
                  }, {
                    default: t(() => [
                      a(U, {
                        type: "textarea",
                        modelValue: s.value.content,
                        "onUpdate:modelValue": l[6] || (l[6] = (n) => s.value.content = n),
                        modelModifiers: { trim: !0 },
                        placeholder: o(e)("contentPlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["model"])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          a(E, {
            modelValue: T.value,
            "onUpdate:modelValue": l[13] || (l[13] = (n) => T.value = n),
            title: o(e)("codeDownTwoDesc"),
            width: "600px",
            "before-close": N
          }, {
            footer: t(() => [
              p("span", al, [
                a(v, { onClick: N }, {
                  default: t(() => [
                    c(r(o(e)("cancel")), 1)
                  ]),
                  _: 1
                }),
                a(v, {
                  type: "primary",
                  onClick: oe
                }, {
                  default: t(() => [
                    c(r(o(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: t(() => [
              a(G, {
                ref_key: "cloudRuleFormRef",
                ref: L,
                model: s.value,
                rules: le,
                "label-width": "120px"
              }, {
                default: t(() => [
                  a(b, {
                    prop: "type",
                    label: o(e)("版本号类型")
                  }, {
                    default: t(() => [
                      p("div", null, [
                        a(ve, {
                          modelValue: s.value.type,
                          "onUpdate:modelValue": l[9] || (l[9] = (n) => s.value.type = n)
                        }, {
                          default: t(() => [
                            a(J, { label: 1 }, {
                              default: t(() => [
                                c(r(o(e)("默认")), 1)
                              ]),
                              _: 1
                            }),
                            a(J, { label: 2 }, {
                              default: t(() => [
                                c(r(o(e)("自定义")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        Ye
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s.value.type == 2 ? (_(), x(b, {
                    key: 0,
                    prop: "version",
                    label: o(e)("code")
                  }, {
                    default: t(() => [
                      p("div", Ze, [
                        a(b, { prop: "code1" }, {
                          default: t(() => [
                            a(U, {
                              modelValue: s.value.code1,
                              "onUpdate:modelValue": l[10] || (l[10] = (n) => s.value.code1 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: o(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        }),
                        p("span", el, r(o(e)("weappUpload.dot")), 1),
                        a(b, { prop: "code2" }, {
                          default: t(() => [
                            a(U, {
                              modelValue: s.value.code2,
                              "onUpdate:modelValue": l[11] || (l[11] = (n) => s.value.code2 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: o(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        }),
                        p("span", ll, r(o(e)("weappUpload.dot")), 1),
                        a(b, { prop: "code3" }, {
                          default: t(() => [
                            a(U, {
                              modelValue: s.value.code3,
                              "onUpdate:modelValue": l[12] || (l[12] = (n) => s.value.code3 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: o(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])) : h("", !0)
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          a(E, {
            modelValue: z.value,
            "onUpdate:modelValue": l[15] || (l[15] = (n) => z.value = n),
            title: o(e)("failReason"),
            width: "60%"
          }, {
            footer: t(() => [
              p("span", ol, [
                a(v, {
                  type: "primary",
                  onClick: de
                }, {
                  default: t(() => [
                    c(r(o(e)("helpInfo")), 1)
                  ]),
                  _: 1
                }),
                a(v, {
                  onClick: l[14] || (l[14] = (n) => z.value = !1)
                }, {
                  default: t(() => [
                    c(r(o(e)("close")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: t(() => [
              a(_e, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
                default: t(() => [
                  p("div", { innerHTML: q.value }, null, 8, tl)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          a(E, {
            modelValue: B.value,
            "onUpdate:modelValue": l[17] || (l[17] = (n) => B.value = n),
            title: o(e)("warning"),
            width: "500px",
            draggable: ""
          }, {
            footer: t(() => [
              p("div", il, [
                a(v, {
                  onClick: ue,
                  type: "primary"
                }, {
                  default: t(() => [
                    c(r(o(e)("knownToKnow")), 1)
                  ]),
                  _: 1
                }),
                a(v, {
                  onClick: l[16] || (l[16] = (n) => B.value = !1),
                  type: "primary",
                  plain: ""
                }, {
                  default: t(() => [
                    c(r(o(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: t(() => [
              p("span", {
                innerHTML: o(e)("uploadSuccessTips")
              }, null, 8, nl)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        (_(), x(xe(Ee), {
          ref_key: "weappUploadRef",
          ref: V,
          onSuccess: y,
          onError: y
        }, null, 544))
      ], 64);
    };
  }
});
export {
  yl as default
};
