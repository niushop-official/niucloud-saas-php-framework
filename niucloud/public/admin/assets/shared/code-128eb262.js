import { defineComponent as Ve, ref as f, reactive as ee, resolveComponent as m, resolveDirective as Ce, openBlock as _, createElementBlock as k, Fragment as Te, createElementVNode as p, createVNode as t, withCtx as o, toDisplayString as r, unref as i, createTextVNode as c, createCommentVNode as b, withDirectives as Ue, createBlock as V, resolveDynamicComponent as Re } from "vue";
import { a7 as Be, t as e, a9 as De, aa as Me, ab as We, ac as $e, s as le, X as Fe, ad as ze, ae as Ae } from "./core-shared-11c0a673.js";
import { useRoute as Ee, useRouter as Le } from "vue-router";
import { g as Pe } from "./module-ef8dc18a.js";
import { ElMessageBox as M } from "element-plus";
import ae from "./index-d1a1ce34.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./dark-3dd028d8.js";
const Se = { class: "main-container" }, Ie = { class: "flex justify-between items-center" }, Ne = { class: "text-page-title" }, je = {
  key: 0,
  class: "mt-[20px]"
}, He = {
  key: 1,
  class: "mt-[20px]"
}, Ke = { class: "text-[14px] mt-[15px]" }, qe = { class: "flex items-center" }, Qe = { key: 0 }, Xe = { class: "mr-10 text-primary" }, Ge = { key: 1 }, Je = { class: "flex items-center" }, Oe = {
  key: 0,
  class: "mt-2"
}, Ye = { class: "mr-10 text-primary" }, Ze = {
  key: 1,
  class: "mt-2"
}, el = { class: "mt-[16px] flex justify-end" }, ll = { class: "dialog-footer" }, al = /* @__PURE__ */ p("div", { class: "mt-[10px] text-[12px] text-[#999] leading-[20px]" }, "默认为列表版本号递增，自定义则为手动输入版本号进行上传，首位必须大于1", -1), tl = { class: "flex items-end" }, ol = { class: "mx-[10px]" }, nl = { class: "mx-[10px]" }, il = { class: "dialog-footer" }, sl = ["innerHTML"], dl = { class: "dialog-footer" }, ul = ["innerHTML"], rl = { class: "flex justify-end" }, pl = 150, Cl = /* @__PURE__ */ Ve({
  __name: "code",
  setup(cl) {
    const fl = ae, te = Ee(), P = Le(), oe = te.meta.title, S = f(!1), U = f(!0), C = f(null), u = ee({
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
    }), R = f(!1), W = f("");
    Pe().then((a) => {
      a.data.data && a.data.data.auth_code && (W.value = a.data.data.auth_code, z()), U.value = !1;
    }).catch(() => {
      U.value = !1;
    });
    const $ = f({
      app_id: "",
      app_secret: "",
      is_authorization: 0
    });
    Be().then((a) => {
      $.value = a.data;
    });
    const I = f("/channel/weapp/code"), ne = (a) => {
      P.push({ path: I.value });
    }, N = f(null), j = f(null), ie = ee({
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
    }), w = (a) => (u.loading = !0, a && (u.page = a), Me({
      page: u.page,
      limit: u.limit
    }).then((l) => {
      u.loading = !1, u.data = l.data.data, u.total = l.data.total, u.version_info = l.data.version_info;
      const d = l.data.data.find((h) => h.status == 0);
      d && C.value && (C.value.setTask(d), C.value.open(d.task_key, d));
    }).catch(() => {
      u.loading = !1;
    }));
    w();
    const se = () => {
      if (!W.value) {
        Q();
        return;
      }
      if (!$.value.app_id) {
        X();
        return;
      }
      s.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      }, B.value = !0;
    }, de = () => {
      N.value.clearValidate();
    }, B = f(!1), H = () => {
      B.value = !1, s.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      };
    }, ue = () => {
      j.value.validate((a) => {
        a && (s.value.type == 2 && (s.value.version = `${s.value.code1}.${s.value.code2}.${s.value.code3}`), delete s.value.code1, delete s.value.code2, delete s.value.code3, delete s.value.type, B.value = !1, K());
      });
    }, g = f(!1), K = () => {
      if (!W.value) {
        Q();
        return;
      }
      if (!$.value.app_id) {
        X();
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
          const d = u.data.find((h) => h.id === l);
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
      M.alert(e("localInsertTips"), e("warning"), {
        confirmButtonText: e("confirm")
      });
    }, F = f(""), z = () => {
      W.value && De().then((a) => {
        a.data && (F.value = `<img src="${a.data}" class="w-[150px]">`);
      }).catch();
    }, y = f(null), T = f(0), q = (a) => {
      if (a) {
        if (y.value !== a && (y.value = a, T.value = 0), T.value++, T.value > pl) {
          y.value = null, T.value = 0, g.value = !1;
          return;
        }
        $e(a).then((l) => {
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
            q(a);
          }, 2e3);
        }).catch(() => {
          y.value === a && setTimeout(() => {
            q(a);
          }, 2e3);
        });
      }
    }, Q = () => {
      Fe() == "admin" ? M.confirm(
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
      }) : M.alert(e("siteAuthTips"), e("warning"));
    }, X = () => {
      M.confirm(
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
      M.confirm(
        e("undoAuditTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        ze({ id: a.id }).then(() => {
          w();
        });
      });
    }, G = f(""), A = f(!1), ce = (a) => {
      G.value = a.fail_reason, A.value = !0;
    }, fe = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html");
    }, me = () => {
      le.set({ key: "weappUploadTipsLock", data: !0 }), R.value = !1;
    }, J = () => {
      g.value || (g.value = !0, Ae().then(() => {
        w(), z(), g.value = !1;
      }).catch(() => {
        g.value = !1;
      }));
    };
    return (a, l) => {
      const d = m("el-tab-pane"), h = m("el-tabs"), v = m("el-button"), E = m("el-table-column"), ve = m("el-tooltip"), _e = m("el-table"), ge = m("el-pagination"), he = m("el-card"), D = m("el-input"), x = m("el-form-item"), we = m("upload-file"), O = m("el-form"), L = m("el-dialog"), Y = m("el-radio"), be = m("el-radio-group"), ye = m("el-scrollbar"), xe = Ce("loading");
      return _(), k(Te, null, [
        p("div", Se, [
          t(he, {
            class: "card !border-none",
            shadow: "never"
          }, {
            default: o(() => [
              p("div", Ie, [
                p("span", Ne, r(i(oe)), 1)
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
              $.value.is_authorization ? (_(), k("div", He, [
                t(v, {
                  type: "primary",
                  onClick: J,
                  loading: g.value,
                  disabled: U.value
                }, {
                  default: o(() => [
                    c(r(i(e)("uploadWeapp")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])) : (_(), k("div", je, [
                t(v, {
                  type: "primary",
                  onClick: se,
                  loading: g.value,
                  disabled: U.value
                }, {
                  default: o(() => [
                    c(r(i(e)("cloudRelease")), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"]),
                t(v, {
                  onClick: re,
                  disabled: U.value
                }, {
                  default: o(() => [
                    c(r(i(e)("localRelease")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])),
              p("div", Ke, [
                p("div", qe, [
                  u.version_info.release_version ? (_(), k("div", Qe, [
                    c(" 线上版本: "),
                    p("span", Xe, r(u.version_info.release_version), 1)
                  ])) : b("", !0),
                  u.version_info.release_time ? (_(), k("div", Ge, [
                    c(" 发布时间: "),
                    p("span", null, r(u.version_info.release_time), 1)
                  ])) : b("", !0)
                ]),
                p("div", Je, [
                  u.version_info.exp_version ? (_(), k("div", Oe, [
                    c(" 体验版本: "),
                    p("span", Ye, r(u.version_info.exp_version), 1)
                  ])) : b("", !0),
                  u.version_info.exp_time ? (_(), k("div", Ze, [
                    c(" 过期时间: "),
                    p("span", null, r(u.version_info.exp_time), 1)
                  ])) : b("", !0)
                ])
              ]),
              Ue((_(), V(_e, {
                class: "mt-[15px]",
                data: u.data,
                size: "default"
              }, {
                empty: o(() => [
                  p("span", null, r(i(e)("emptyData")), 1)
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
                      p("div", null, r(n.status_name), 1)
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
                    default: o(({ row: n, $index: ke }) => [
                      F.value && ke == 0 && (n.status == 1 || n.status == 2) && u.page == 1 ? (_(), V(ve, {
                        key: 0,
                        content: F.value,
                        "raw-content": "",
                        effect: "light"
                      }, {
                        default: o(() => [
                          t(v, {
                            type: "primary",
                            link: ""
                          }, {
                            default: o(() => [
                              c(r(i(e)("preview")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])) : b("", !0),
                      n.status == -1 || n.status == -2 ? (_(), V(v, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (Z) => ce(n)
                      }, {
                        default: o(() => [
                          c(r(i(e)("failReason")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : b("", !0),
                      n.status == -2 ? (_(), V(v, {
                        key: 2,
                        type: "primary",
                        link: "",
                        onClick: (Z) => J(n),
                        loading: g.value
                      }, {
                        default: o(() => [
                          c(r(i(e)("againUpload")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "loading"])) : b("", !0),
                      n.status == 2 ? (_(), V(v, {
                        key: 3,
                        type: "primary",
                        link: "",
                        onClick: (Z) => pe(n)
                      }, {
                        default: o(() => [
                          c(r(i(e)("undoAudit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : b("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [xe, u.loading]
              ]),
              p("div", el, [
                t(ge, {
                  "current-page": u.page,
                  "onUpdate:currentPage": l[1] || (l[1] = (n) => u.page = n),
                  "page-size": u.limit,
                  "onUpdate:pageSize": l[2] || (l[2] = (n) => u.limit = n),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: u.total,
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
              p("span", ll, [
                t(v, {
                  onClick: l[7] || (l[7] = (n) => S.value = !1)
                }, {
                  default: o(() => [
                    c(r(i(e)("cancel")), 1)
                  ]),
                  _: 1
                }),
                t(v, {
                  type: "primary",
                  onClick: K
                }, {
                  default: o(() => [
                    c(r(i(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              t(O, {
                ref_key: "ruleFormRef",
                ref: N,
                model: s.value,
                "label-width": "120px"
              }, {
                default: o(() => [
                  t(x, {
                    prop: "code",
                    label: i(e)("code")
                  }, {
                    default: o(() => [
                      t(D, {
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
                      t(we, {
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
                      t(D, {
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
            modelValue: B.value,
            "onUpdate:modelValue": l[13] || (l[13] = (n) => B.value = n),
            title: i(e)("codeDownTwoDesc"),
            width: "600px",
            "before-close": H
          }, {
            footer: o(() => [
              p("span", il, [
                t(v, { onClick: H }, {
                  default: o(() => [
                    c(r(i(e)("cancel")), 1)
                  ]),
                  _: 1
                }),
                t(v, {
                  type: "primary",
                  onClick: ue
                }, {
                  default: o(() => [
                    c(r(i(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              t(O, {
                ref_key: "cloudRuleFormRef",
                ref: j,
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
                        t(be, {
                          modelValue: s.value.type,
                          "onUpdate:modelValue": l[9] || (l[9] = (n) => s.value.type = n)
                        }, {
                          default: o(() => [
                            t(Y, { label: 1 }, {
                              default: o(() => [
                                c(r(i(e)("默认")), 1)
                              ]),
                              _: 1
                            }),
                            t(Y, { label: 2 }, {
                              default: o(() => [
                                c(r(i(e)("自定义")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        al
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
                      p("div", tl, [
                        t(x, { prop: "code1" }, {
                          default: o(() => [
                            t(D, {
                              modelValue: s.value.code1,
                              "onUpdate:modelValue": l[10] || (l[10] = (n) => s.value.code1 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: i(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        }),
                        p("span", ol, r(i(e)("weappUploadDot")), 1),
                        t(x, { prop: "code2" }, {
                          default: o(() => [
                            t(D, {
                              modelValue: s.value.code2,
                              "onUpdate:modelValue": l[11] || (l[11] = (n) => s.value.code2 = n),
                              modelModifiers: { number: !0 },
                              class: "!w-[70px]",
                              placeholder: i(e)("codePlaceholder")
                            }, null, 8, ["modelValue", "placeholder"])
                          ]),
                          _: 1
                        }),
                        p("span", nl, r(i(e)("weappUploadDot")), 1),
                        t(x, { prop: "code3" }, {
                          default: o(() => [
                            t(D, {
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
              p("span", dl, [
                t(v, {
                  type: "primary",
                  onClick: fe
                }, {
                  default: o(() => [
                    c(r(i(e)("helpInfo")), 1)
                  ]),
                  _: 1
                }),
                t(v, {
                  onClick: l[14] || (l[14] = (n) => A.value = !1)
                }, {
                  default: o(() => [
                    c(r(i(e)("close")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              t(ye, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
                default: o(() => [
                  p("div", { innerHTML: G.value }, null, 8, sl)
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
              p("div", rl, [
                t(v, {
                  onClick: me,
                  type: "primary"
                }, {
                  default: o(() => [
                    c(r(i(e)("knownToKnow")), 1)
                  ]),
                  _: 1
                }),
                t(v, {
                  onClick: l[16] || (l[16] = (n) => R.value = !1),
                  type: "primary",
                  plain: ""
                }, {
                  default: o(() => [
                    c(r(i(e)("confirm")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: o(() => [
              p("span", {
                innerHTML: i(e)("uploadSuccessTips")
              }, null, 8, ul)
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
  Cl as default
};
