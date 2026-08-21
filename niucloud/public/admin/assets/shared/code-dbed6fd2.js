import { defineComponent as Ce, ref as f, reactive as ee, resolveComponent as v, resolveDirective as Te, openBlock as _, createElementBlock as k, Fragment as Ue, createElementVNode as p, createVNode as t, withCtx as o, toDisplayString as u, unref as i, createTextVNode as c, createCommentVNode as b, withDirectives as Be, createBlock as V, resolveDynamicComponent as Re } from "vue";
import { a7 as De, t as e, a9 as Me, aa as $e, ab as We, ac as Fe, s as le, X as ze, ad as Ae, ae as Ee, af as Le } from "./core-shared-0b2facad.js";
import { useRoute as Pe, useRouter as Se } from "vue-router";
import { g as Ie } from "./module-ef2a531c.js";
import { ElMessageBox as U } from "element-plus";
import ae from "./index-0d894b88.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./dark-3dd028d8.js";
const Ne = { class: "main-container" }, je = { class: "flex justify-between items-center" }, He = { class: "text-page-title" }, Ke = {
  key: 0,
  class: "mt-[20px]"
}, qe = {
  key: 1,
  class: "mt-[20px]"
}, Qe = { class: "text-[14px] mt-[15px]" }, Xe = { class: "flex items-center" }, Ge = { key: 0 }, Je = { class: "mr-10 text-primary" }, Oe = { key: 1 }, Ye = { class: "flex items-center" }, Ze = {
  key: 0,
  class: "mt-2"
}, el = { class: "mr-10 text-primary" }, ll = {
  key: 1,
  class: "mt-2"
}, al = { class: "mt-[16px] flex justify-end" }, tl = { class: "dialog-footer" }, ol = /* @__PURE__ */ p("div", { class: "mt-[10px] text-[12px] text-[#999] leading-[20px]" }, "默认为列表版本号递增，自定义则为手动输入版本号进行上传，首位必须大于1", -1), nl = { class: "flex items-end" }, il = { class: "mx-[10px]" }, sl = { class: "mx-[10px]" }, dl = { class: "dialog-footer" }, ul = ["innerHTML"], rl = { class: "dialog-footer" }, pl = ["innerHTML"], cl = { class: "flex justify-end" }, fl = 150, Ul = /* @__PURE__ */ Ce({
  __name: "code",
  setup(ml) {
    const vl = ae, te = Pe(), P = Se(), oe = te.meta.title, S = f(!1), B = f(!0), C = f(null), r = ee({
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
    }), R = f(!1), $ = f("");
    Ie().then((a) => {
      a.data.data && a.data.data.auth_code && ($.value = a.data.data.auth_code, z()), B.value = !1;
    }).catch(() => {
      B.value = !1;
    });
    const W = f({
      app_id: "",
      app_secret: "",
      is_authorization: 0
    });
    De().then((a) => {
      W.value = a.data;
    });
    const I = f("/channel/weapp/code"), ne = (a) => {
      P.push({ path: I.value });
    }, j = f(null), H = f(null), ie = ee({
      code1: [
        {
          validator: (a, l, d) => {
            l < 1 ? d(new Error(e("必须大于1"))) : d();
          },
          trigger: "blur"
        }
      ],
      code2: [
        {
          validator: (a, l, d) => {
            l < 0 ? d(new Error(e("必须大于0"))) : d();
          },
          trigger: "blur"
        }
      ],
      code3: [
        {
          validator: (a, l, d) => {
            l < 0 ? d(new Error(e("必须大于0"))) : d();
          },
          trigger: "blur"
        }
      ],
      version: [
        {
          required: !0,
          validator: (a, l, d) => {
            s.value.type == 2 && (!s.value.code1 || !s.value.code2 || !s.value.code3) ? d(new Error(e("请填写版本号"))) : d();
          }
        }
      ]
    }), w = (a) => (r.loading = !0, a && (r.page = a), $e({
      page: r.page,
      limit: r.limit
    }).then((l) => {
      r.loading = !1, r.data = l.data.data, r.total = l.data.total, r.version_info = l.data.version_info;
      const d = l.data.data.find((h) => h.status == 0);
      d && C.value && (C.value.setTask(d), C.value.open(d.task_key, d));
    }).catch(() => {
      r.loading = !1;
    }));
    w();
    const se = () => {
      if (!$.value) {
        X();
        return;
      }
      if (!W.value.app_id) {
        G();
        return;
      }
      s.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      }, D.value = !0;
    }, de = () => {
      j.value.clearValidate();
    }, D = f(!1), K = () => {
      D.value = !1, s.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      };
    }, ue = () => {
      H.value.validate((a) => {
        a && (s.value.type == 2 && (s.value.version = `${s.value.code1}.${s.value.code2}.${s.value.code3}`), delete s.value.code1, delete s.value.code2, delete s.value.code3, delete s.value.type, D.value = !1, q());
      });
    }, g = f(!1), q = () => {
      if (!$.value) {
        X();
        return;
      }
      if (!W.value.app_id) {
        G();
        return;
      }
      if (g.value) {
        const a = C.value;
        a && a.cloudBuildTask && a.cloudBuildTask.task_key ? a.open(a.cloudBuildTask.task_key, a.cloudBuildTask) : a && (a.showDialog = !0);
        return;
      }
      g.value = !0, F.value = "", We(s.value).then((a) => {
        const l = a.data;
        w().then(() => {
          const d = r.data.find((h) => h.id === l);
          if (d && d.task_key) {
            const h = C.value;
            h && h.open(d.task_key, d);
          }
          z(), g.value = !1;
        }).catch(() => {
          g.value = !1;
        });
      }).catch(() => {
        g.value = !1;
      });
    }, re = () => {
      U.alert(e("localInsertTips"), e("warning"), {
        confirmButtonText: e("confirm")
      });
    }, F = f(""), z = () => {
      $.value && Me().then((a) => {
        a.data && (F.value = `<img src="${a.data}" class="w-[150px]">`);
      }).catch();
    }, y = f(null), T = f(0), Q = (a) => {
      if (a) {
        if (y.value !== a && (y.value = a, T.value = 0), T.value++, T.value > fl) {
          y.value = null, T.value = 0, g.value = !1;
          return;
        }
        Fe(a).then((l) => {
          if (y.value !== a)
            return;
          const d = l.data && l.data.data ? l.data.data : [];
          if (d[0] && d[0].length) {
            const h = d[0][d[0].length - 1];
            if (h.code == 0) {
              y.value = null, T.value = 0, w();
              return;
            }
            if (h.code == 1 && h.percent == 100) {
              y.value = null, T.value = 0, w(), z(), !le.get("weappUploadTipsLock") && (R.value = !0);
              return;
            }
          }
          y.value === a && setTimeout(() => {
            Q(a);
          }, 2e3);
        }).catch(() => {
          y.value === a && setTimeout(() => {
            Q(a);
          }, 2e3);
        });
      }
    }, X = () => {
      ze() == "admin" ? U.confirm(
        e("authTips"),
        e("warning"),
        {
          distinguishCancelAndClose: !0,
          confirmButtonText: e("toBind"),
          cancelButtonText: e("toNiucloud")
        }
      ).then(() => {
        P.push({ path: "/app/authorize" });
      }).catch((a) => {
        a === "cancel" && window.open("https://www.niucloud.com/app");
      }) : U.alert(e("siteAuthTips"), e("warning"));
    }, G = () => {
      U.confirm(
        e("weappTips"),
        e("warning"),
        {
          confirmButtonText: e("toSetting"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        P.push({ path: "/channel/weapp/config" });
      });
    }, pe = (a) => {
      U.confirm(
        e("undoAuditTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        Ae({ id: a.id }).then(() => {
          w();
        });
      });
    }, ce = (a) => {
      U.confirm(
        e("versionDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        Ee(a.id).then(() => {
          w();
        });
      }).catch(() => {
      });
    }, J = f(""), A = f(!1), fe = (a) => {
      J.value = a.fail_reason, A.value = !0;
    }, me = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html");
    }, ve = () => {
      le.set({ key: "weappUploadTipsLock", data: !0 }), R.value = !1;
    }, O = () => {
      g.value || (g.value = !0, Le().then(() => {
        w(), z(), g.value = !1;
      }).catch(() => {
        g.value = !1;
      }));
    };
    return (a, l) => {
      const d = v("el-tab-pane"), h = v("el-tabs"), m = v("el-button"), E = v("el-table-column"), _e = v("el-tooltip"), ge = v("el-table"), he = v("el-pagination"), we = v("el-card"), M = v("el-input"), x = v("el-form-item"), be = v("upload-file"), Y = v("el-form"), L = v("el-dialog"), Z = v("el-radio"), ye = v("el-radio-group"), xe = v("el-scrollbar"), ke = Te("loading");
      return _(), k(Ue, null, [
        p("div", Ne, [
          t(we, {
            class: "card !border-none",
            shadow: "never"
          }, {
            default: o(() => [
              p("div", je, [
                p("span", He, u(i(oe)), 1)
              ]),
              t(h, {
                modelValue: I.value,
                "onUpdate:modelValue": l[0] || (l[0] = (n) => I.value = n),
                class: "my-[20px]",
                onTabChange: ne
              }, {
                default: o(() => [
                  t(d, {
                    label: i(e)("weappAccessFlow"),
                    name: "/channel/weapp"
                  }, null, 8, ["label"]),
                  t(d, {
                    label: i(e)("subscribeMessage"),
                    name: "/channel/weapp/message"
                  }, null, 8, ["label"]),
                  t(d, {
                    label: i(e)("weappRelease"),
                    name: "/channel/weapp/code"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              W.value.is_authorization ? (_(), k("div", qe, [
                t(m, {
                  type: "primary",
                  onClick: O,
                  loading: g.value,
                  disabled: B.value
                }, {
                  default: o(() => [
                    c(u(i(e)("uploadWeapp")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])) : (_(), k("div", Ke, [
                t(m, {
                  type: "primary",
                  onClick: se,
                  loading: g.value,
                  disabled: B.value
                }, {
                  default: o(() => [
                    c(u(i(e)("cloudRelease")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"]),
                t(m, {
                  onClick: re,
                  disabled: B.value
                }, {
                  default: o(() => [
                    c(u(i(e)("localRelease")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])),
              p("div", Qe, [
                p("div", Xe, [
                  r.version_info.release_version ? (_(), k("div", Ge, [
                    c(" 线上版本: "),
                    p("span", Je, u(r.version_info.release_version), 1)
                  ])) : b("", !0),
                  r.version_info.release_time ? (_(), k("div", Oe, [
                    c(" 发布时间: "),
                    p("span", null, u(r.version_info.release_time), 1)
                  ])) : b("", !0)
                ]),
                p("div", Ye, [
                  r.version_info.exp_version ? (_(), k("div", Ze, [
                    c(" 体验版本: "),
                    p("span", el, u(r.version_info.exp_version), 1)
                  ])) : b("", !0),
                  r.version_info.exp_time ? (_(), k("div", ll, [
                    c(" 过期时间: "),
                    p("span", null, u(r.version_info.exp_time), 1)
                  ])) : b("", !0)
                ])
              ]),
              Be((_(), V(ge, {
                class: "mt-[15px]",
                data: r.data,
                size: "default"
              }, {
                empty: o(() => [
                  p("span", null, u(i(e)("emptyData")), 1)
                ]),
                default: o(() => [
                  t(E, {
                    prop: "version",
                    label: i(e)("code"),
                    align: "left"
                  }, null, 8, ["label"]),
                  t(E, {
                    prop: "status_name",
                    label: i(e)("status"),
                    align: "left"
                  }, {
                    default: o(({ row: n }) => [
                      p("div", null, u(n.status_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(E, {
                    prop: "create_time",
                    label: i(e)("createTime"),
                    align: "center"
                  }, null, 8, ["label"]),
                  t(E, {
                    label: i(e)("operation"),
                    fixed: "right",
                    align: "right",
                    "min-width": "120"
                  }, {
                    default: o(({ row: n, $index: Ve }) => [
                      F.value && Ve == 0 && (n.status == 1 || n.status == 2) && r.page == 1 ? (_(), V(_e, {
                        key: 0,
                        content: F.value,
                        "raw-content": "",
                        effect: "light"
                      }, {
                        default: o(() => [
                          t(m, {
                            type: "primary",
                            link: ""
                          }, {
                            default: o(() => [
                              c(u(i(e)("preview")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])) : b("", !0),
                      n.status == -1 || n.status == -2 ? (_(), V(m, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (N) => fe(n)
                      }, {
                        default: o(() => [
                          c(u(i(e)("failReason")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : b("", !0),
                      n.status == -2 ? (_(), V(m, {
                        key: 2,
                        type: "primary",
                        link: "",
                        onClick: (N) => O(n),
                        loading: g.value
                      }, {
                        default: o(() => [
                          c(u(i(e)("againUpload")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "loading"])) : b("", !0),
                      n.status == 2 ? (_(), V(m, {
                        key: 3,
                        type: "primary",
                        link: "",
                        onClick: (N) => pe(n)
                      }, {
                        default: o(() => [
                          c(u(i(e)("undoAudit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : b("", !0),
                      t(m, {
                        type: "danger",
                        link: "",
                        onClick: (N) => ce(n)
                      }, {
                        default: o(() => [
                          c(u(i(e)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [ke, r.loading]
              ]),
              p("div", al, [
                t(he, {
                  "current-page": r.page,
                  "onUpdate:currentPage": l[1] || (l[1] = (n) => r.page = n),
                  "page-size": r.limit,
                  "onUpdate:pageSize": l[2] || (l[2] = (n) => r.limit = n),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: r.total,
                  onSizeChange: l[3] || (l[3] = (n) => w()),
                  onCurrentChange: w
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            _: 1
          }),
          t(L, {
            modelValue: S.value,
            "onUpdate:modelValue": l[8] || (l[8] = (n) => S.value = n),
            title: i(e)("codeDownTwoDesc"),
            width: "30%",
            "before-close": de
          }, {
            footer: o(() => [
              p("span", tl, [
                t(m, {
                  onClick: l[7] || (l[7] = (n) => S.value = !1)
                }, {
                  default: o(() => [
                    c(u(i(e)("cancel")), 1)
                  ]),
                  _: 1
                }),
                t(m, {
                  type: "primary",
                  onClick: q
                }, {
                  default: o(() => [
                    c(u(i(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              t(Y, {
                ref_key: "ruleFormRef",
                ref: j,
                model: s.value,
                "label-width": "120px"
              }, {
                default: o(() => [
                  t(x, {
                    prop: "code",
                    label: i(e)("code")
                  }, {
                    default: o(() => [
                      t(M, {
                        modelValue: s.value.code,
                        "onUpdate:modelValue": l[4] || (l[4] = (n) => s.value.code = n),
                        modelModifiers: { trim: !0 },
                        placeholder: i(e)("codePlaceholder"),
                        onkeyup: "this.value = this.value.replace(/[^\\d\\.]/g,'');"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(x, {
                    prop: "path",
                    label: i(e)("path")
                  }, {
                    default: o(() => [
                      t(be, {
                        modelValue: s.value.path,
                        "onUpdate:modelValue": l[5] || (l[5] = (n) => s.value.path = n),
                        api: "weapp/upload",
                        accept: ".zip"
                      }, null, 8, ["modelValue", "accept"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(x, {
                    label: i(e)("content")
                  }, {
                    default: o(() => [
                      t(M, {
                        type: "textarea",
                        modelValue: s.value.content,
                        "onUpdate:modelValue": l[6] || (l[6] = (n) => s.value.content = n),
                        modelModifiers: { trim: !0 },
                        placeholder: i(e)("contentPlaceholder")
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
          t(L, {
            modelValue: D.value,
            "onUpdate:modelValue": l[13] || (l[13] = (n) => D.value = n),
            title: i(e)("codeDownTwoDesc"),
            width: "600px",
            "before-close": K
          }, {
            footer: o(() => [
              p("span", dl, [
                t(m, { onClick: K }, {
                  default: o(() => [
                    c(u(i(e)("cancel")), 1)
                  ]),
                  _: 1
                }),
                t(m, {
                  type: "primary",
                  onClick: ue
                }, {
                  default: o(() => [
                    c(u(i(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              t(Y, {
                ref_key: "cloudRuleFormRef",
                ref: H,
                model: s.value,
                rules: ie,
                "label-width": "120px"
              }, {
                default: o(() => [
                  t(x, {
                    prop: "type",
                    label: i(e)("版本号类型")
                  }, {
                    default: o(() => [
                      p("div", null, [
                        t(ye, {
                          modelValue: s.value.type,
                          "onUpdate:modelValue": l[9] || (l[9] = (n) => s.value.type = n)
                        }, {
                          default: o(() => [
                            t(Z, { label: 1 }, {
                              default: o(() => [
                                c(u(i(e)("默认")), 1)
                              ]),
                              _: 1
                            }),
                            t(Z, { label: 2 }, {
                              default: o(() => [
                                c(u(i(e)("自定义")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        ol
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s.value.type == 2 ? (_(), V(x, {
                    key: 0,
                    prop: "version",
                    label: i(e)("code")
                  }, {
                    default: o(() => [
                      p("div", nl, [
                        t(x, { prop: "code1" }, {
                          default: o(() => [
                            t(M, {
                              modelValue: s.value.code1,
                              "onUpdate:modelValue": l[10] || (l[10] = (n) => s.value.code1 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: i(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        }),
                        p("span", il, u(i(e)("weappUploadDot")), 1),
                        t(x, { prop: "code2" }, {
                          default: o(() => [
                            t(M, {
                              modelValue: s.value.code2,
                              "onUpdate:modelValue": l[11] || (l[11] = (n) => s.value.code2 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: i(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        }),
                        p("span", sl, u(i(e)("weappUploadDot")), 1),
                        t(x, { prop: "code3" }, {
                          default: o(() => [
                            t(M, {
                              modelValue: s.value.code3,
                              "onUpdate:modelValue": l[12] || (l[12] = (n) => s.value.code3 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: i(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])) : b("", !0)
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          t(L, {
            modelValue: A.value,
            "onUpdate:modelValue": l[15] || (l[15] = (n) => A.value = n),
            title: i(e)("failReason"),
            width: "60%"
          }, {
            footer: o(() => [
              p("span", rl, [
                t(m, {
                  type: "primary",
                  onClick: me
                }, {
                  default: o(() => [
                    c(u(i(e)("helpInfo")), 1)
                  ]),
                  _: 1
                }),
                t(m, {
                  onClick: l[14] || (l[14] = (n) => A.value = !1)
                }, {
                  default: o(() => [
                    c(u(i(e)("close")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              t(xe, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
                default: o(() => [
                  p("div", { innerHTML: J.value }, null, 8, ul)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          t(L, {
            modelValue: R.value,
            "onUpdate:modelValue": l[17] || (l[17] = (n) => R.value = n),
            title: i(e)("warning"),
            width: "500px",
            draggable: ""
          }, {
            footer: o(() => [
              p("div", cl, [
                t(m, {
                  onClick: ve,
                  type: "primary"
                }, {
                  default: o(() => [
                    c(u(i(e)("knownToKnow")), 1)
                  ]),
                  _: 1
                }),
                t(m, {
                  onClick: l[16] || (l[16] = (n) => R.value = !1),
                  type: "primary",
                  plain: ""
                }, {
                  default: o(() => [
                    c(u(i(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              p("span", {
                innerHTML: i(e)("uploadSuccessTips")
              }, null, 8, pl)
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        (_(), V(Re(ae), {
          ref_key: "weappUploadRef",
          ref: C,
          onSuccess: w,
          onError: w
        }, null, 544))
      ], 64);
    };
  }
});
export {
  Ul as default
};
