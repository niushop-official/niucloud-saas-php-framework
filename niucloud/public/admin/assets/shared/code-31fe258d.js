import { defineComponent as Pe, ref as f, reactive as Z, computed as ze, watch as $e, resolveComponent as v, resolveDirective as Ae, openBlock as _, createElementBlock as w, normalizeStyle as Me, unref as o, createVNode as t, withCtx as i, createElementVNode as c, toDisplayString as p, createTextVNode as r, createCommentVNode as b, withDirectives as Ee, createBlock as V, nextTick as Se } from "vue";
import { ak as Fe, aA as Ne, t as e, aC as We, aD as Ie, an as ee, aE as Le, ad as je, aF as He, aG as qe } from "./core-shared-c6ad4e77.js";
import { useRoute as Ge, useRouter as Ke } from "vue-router";
import { a as Qe } from "./module-f32436cf.js";
import { ElMessage as E, ElMessageBox as C } from "element-plus";
import Je from "./index-2fe2c142.js";
import { u as Oe } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Xe = { class: "flex justify-between items-center" }, Ye = { class: "text-page-title" }, Ze = {
  key: 0,
  class: "mt-[20px]"
}, el = {
  key: 1,
  class: "mt-[20px]"
}, ll = { class: "text-[14px] mt-[15px]" }, al = { class: "flex items-center" }, tl = { key: 0 }, ol = { class: "mr-10 text-primary" }, nl = { key: 1 }, il = { class: "flex items-center" }, sl = {
  key: 0,
  class: "mt-2"
}, dl = { class: "mr-10 text-primary" }, ul = {
  key: 1,
  class: "mt-2"
}, pl = { class: "table-fill-page__table mt-[15px]" }, cl = { class: "mt-[16px] flex justify-end" }, rl = { class: "dialog-footer" }, ml = /* @__PURE__ */ c("div", { class: "mt-[10px] text-[12px] text-[#999] leading-[20px]" }, "默认为列表版本号递增，自定义则为手动输入版本号进行上传，首位必须大于1", -1), fl = { class: "flex items-end" }, vl = { class: "mx-[10px]" }, _l = { class: "mx-[10px]" }, gl = { class: "dialog-footer" }, hl = ["innerHTML"], bl = { class: "dialog-footer" }, yl = { class: "min-h-[150px]" }, $l = /* @__PURE__ */ Pe({
  __name: "code",
  setup(xl) {
    const g = Fe(), le = Ge(), S = Ke(), ae = le.meta.title, { pageRef: te, pageStyle: oe } = Oe(), F = f(!1), D = f(!0), u = Z({
      page: 1,
      limit: 10,
      total: 0,
      loading: !1,
      data: [],
      version_info: {}
    }), d = f({
      type: 1,
      version: "",
      code1: "1",
      code2: "0",
      code3: "0"
    }), N = f("");
    Qe().then((a) => {
      a.data.data && a.data.data.auth_code && (N.value = a.data.data.auth_code, H()), D.value = !1;
    }).catch(() => {
      D.value = !1;
    });
    const W = f({
      app_id: "",
      app_secret: "",
      is_authorization: 0
    });
    Ne().then((a) => {
      W.value = a.data;
    });
    const I = f("/channel/weapp/code"), ne = (a) => {
      S.push({ path: I.value });
    }, G = f(null), K = f(null), ie = Z({
      code1: [
        {
          validator: (a, l, s) => {
            l < 1 ? s(new Error(e("必须大于1"))) : s();
          },
          trigger: "blur"
        }
      ],
      code2: [
        {
          validator: (a, l, s) => {
            l < 0 ? s(new Error(e("必须大于0"))) : s();
          },
          trigger: "blur"
        }
      ],
      code3: [
        {
          validator: (a, l, s) => {
            l < 0 ? s(new Error(e("必须大于0"))) : s();
          },
          trigger: "blur"
        }
      ],
      version: [
        {
          required: !0,
          validator: (a, l, s) => {
            d.value.type == 2 && (!d.value.code1 || !d.value.code2 || !d.value.code3) ? s(new Error(e("请填写版本号"))) : s();
          }
        }
      ]
    }), y = (a) => (u.loading = !0, a && (u.page = a), Ie({
      page: u.page,
      limit: u.limit
    }).then((l) => {
      u.loading = !1, u.data = l.data.data, u.total = l.data.total, u.version_info = l.data.version_info;
    }).catch(() => {
      u.loading = !1;
    }));
    y();
    const se = () => {
      if (!N.value) {
        fe();
        return;
      }
      if (!W.value.app_id) {
        ve();
        return;
      }
      d.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      }, R.value = !0;
    }, de = () => {
      G.value.clearValidate();
    }, R = f(!1), L = () => {
      R.value = !1, d.value = {
        type: 1,
        version: "",
        code1: "1",
        code2: "0",
        code3: "0"
      };
    }, h = f(!1), U = f(""), T = f(!1), j = f("upload"), P = f(""), ue = ze(() => ({
      version: P.value,
      mode: j.value
    })), Q = (a, l = "") => {
      T.value || (j.value = a, P.value = l, T.value = !0);
    }, pe = () => {
      Se(() => {
        T.value = !1;
      });
      const a = j.value, l = P.value;
      if (P.value = "", a === "commit") {
        ce();
        return;
      }
      z.value = "", h.value = !0, g.openPendingDetail("weapp_upload", "正在发起发布"), ee("weapp_upload", { version: l }).then((s) => {
        var m;
        h.value = !1;
        const x = (m = s == null ? void 0 : s.data) == null ? void 0 : m.task_key;
        if (!x) {
          g.closePendingDetail(), E.error("发布任务创建失败");
          return;
        }
        g.openDetail(x, "weapp_upload"), U.value = x, y();
      }).catch((s) => {
        h.value = !1, g.closePendingDetail(), E({ message: (s == null ? void 0 : s.msg) || (s == null ? void 0 : s.message) || "发布任务创建失败", type: "error" });
      });
    }, ce = () => {
      h.value = !0, Le().then(() => {
        y(), H(), h.value = !1;
      }).catch(() => {
        h.value = !1;
      });
    }, re = () => {
      K.value.validate((a) => {
        if (a) {
          const l = d.value.type == 2 ? `${d.value.code1}.${d.value.code2}.${d.value.code3}` : "";
          R.value = !1, L(), Q("upload", l);
        }
      });
    }, me = () => {
      C.alert(e("localInsertTips"), e("warning"), {
        confirmButtonText: e("confirm")
      });
    }, z = f(""), H = () => {
      N.value && We().then((a) => {
        a.data && (z.value = `<img src="${a.data}" class="w-[150px]">`);
      }).catch();
    }, fe = () => {
      je() == "admin" ? C.confirm(
        e("authTips"),
        e("warning"),
        {
          distinguishCancelAndClose: !0,
          confirmButtonText: e("toBind"),
          cancelButtonText: e("toNiucloud")
        }
      ).then(() => {
        S.push({ path: "/app/authorize" });
      }).catch((a) => {
        a === "cancel" && window.open("https://www.niucloud.com/app");
      }) : C.alert(e("siteAuthTips"), e("warning"));
    }, ve = () => {
      C.confirm(
        e("weappTips"),
        e("warning"),
        {
          confirmButtonText: e("toSetting"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        S.push({ path: "/channel/weapp/config" });
      });
    }, _e = (a) => {
      C.confirm(
        e("undoAuditTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        He({ id: a.id }).then(() => {
          y();
        });
      });
    }, ge = (a) => Number(a.status) === 1 && !!a.source_zip, he = (a) => {
      C.confirm(
        `确认回退到版本 ${a.version}？${e("rollbackTips")}`,
        e("rollback"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        g.openPendingDetail("weapp_upload", "正在发起回退"), ee("weapp_upload", {
          version: a.version,
          source_zip: a.source_zip
        }).then((l) => {
          var x;
          const s = (x = l == null ? void 0 : l.data) == null ? void 0 : x.task_key;
          if (!s) {
            g.closePendingDetail(), E.error("回退任务创建失败");
            return;
          }
          g.openDetail(s, "weapp_upload"), U.value = s, y();
        }).catch((l) => {
          g.closePendingDetail(), E({ message: (l == null ? void 0 : l.msg) || (l == null ? void 0 : l.message) || "回退任务创建失败", type: "error" });
        });
      }).catch(() => {
      });
    }, be = (a) => {
      C.confirm(
        e("versionDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel")
        }
      ).then(() => {
        qe(a.id).then(() => {
          y();
        });
      }).catch(() => {
      });
    }, ye = f(""), q = f(!1), xe = (a) => {
      g.openDetail(String(a.upload_task_key), "weapp_upload");
    }, ke = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html");
    }, J = () => {
      h.value || Q("commit");
    };
    return $e(() => {
      var a;
      return U.value ? String(((a = g.tasks[U.value]) == null ? void 0 : a.status) ?? "") : "";
    }, (a) => {
      a && ["success", "failed", "canceled"].includes(a) && (y(), H(), U.value = "");
    }), (a, l) => {
      const s = v("el-tab-pane"), x = v("el-tabs"), m = v("el-button"), $ = v("el-table-column"), we = v("el-tooltip"), Ve = v("el-table"), Ce = v("el-pagination"), Te = v("el-card"), B = v("el-input"), k = v("el-form-item"), De = v("upload-file"), O = v("el-form"), A = v("el-dialog"), X = v("el-radio"), Re = v("el-radio-group"), Ue = v("el-scrollbar"), Be = Ae("loading");
      return _(), w("div", {
        ref_key: "pageRef",
        ref: te,
        class: "main-container table-fill-page",
        style: Me(o(oe))
      }, [
        t(Te, {
          class: "card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: i(() => [
            c("div", Xe, [
              c("span", Ye, p(o(ae)), 1)
            ]),
            t(x, {
              modelValue: I.value,
              "onUpdate:modelValue": l[0] || (l[0] = (n) => I.value = n),
              class: "my-[20px]",
              onTabChange: ne
            }, {
              default: i(() => [
                t(s, {
                  label: o(e)("weappAccessFlow"),
                  name: "/channel/weapp"
                }, null, 8, ["label"]),
                t(s, {
                  label: o(e)("subscribeMessage"),
                  name: "/channel/weapp/message"
                }, null, 8, ["label"]),
                t(s, {
                  label: o(e)("weappRelease"),
                  name: "/channel/weapp/code"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            W.value.is_authorization ? (_(), w("div", el, [
              t(m, {
                type: "primary",
                onClick: J,
                loading: h.value,
                disabled: D.value
              }, {
                default: i(() => [
                  r(p(o(e)("uploadWeapp")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
            ])) : (_(), w("div", Ze, [
              t(m, {
                type: "primary",
                onClick: se,
                loading: h.value,
                disabled: D.value
              }, {
                default: i(() => [
                  r(p(o(e)("cloudRelease")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"]),
              t(m, {
                onClick: me,
                disabled: D.value
              }, {
                default: i(() => [
                  r(p(o(e)("localRelease")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ])),
            c("div", ll, [
              c("div", al, [
                u.version_info.release_version ? (_(), w("div", tl, [
                  r(" 线上版本: "),
                  c("span", ol, p(u.version_info.release_version), 1)
                ])) : b("", !0),
                u.version_info.release_time ? (_(), w("div", nl, [
                  r(" 发布时间: "),
                  c("span", null, p(u.version_info.release_time), 1)
                ])) : b("", !0)
              ]),
              c("div", il, [
                u.version_info.exp_version ? (_(), w("div", sl, [
                  r(" 体验版本: "),
                  c("span", dl, p(u.version_info.exp_version), 1)
                ])) : b("", !0),
                u.version_info.exp_time ? (_(), w("div", ul, [
                  r(" 过期时间: "),
                  c("span", null, p(u.version_info.exp_time), 1)
                ])) : b("", !0)
              ])
            ]),
            c("div", pl, [
              Ee((_(), V(Ve, {
                height: "100%",
                data: u.data,
                size: "default"
              }, {
                empty: i(() => [
                  c("span", null, p(o(e)("emptyData")), 1)
                ]),
                default: i(() => [
                  t($, {
                    prop: "version",
                    label: o(e)("code"),
                    align: "left"
                  }, null, 8, ["label"]),
                  t($, {
                    prop: "status_name",
                    label: o(e)("status"),
                    align: "left"
                  }, {
                    default: i(({ row: n }) => [
                      c("div", null, p(n.status_name), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t($, {
                    prop: "create_time",
                    label: o(e)("createTime"),
                    align: "center"
                  }, null, 8, ["label"]),
                  t($, {
                    label: o(e)("operation"),
                    fixed: "right",
                    align: "right",
                    "min-width": "250"
                  }, {
                    default: i(({ row: n, $index: Y }) => [
                      z.value && Y == 0 && (n.status == 1 || n.status == 2) && u.page == 1 ? (_(), V(we, {
                        key: 0,
                        content: z.value,
                        "raw-content": "",
                        effect: "light"
                      }, {
                        default: i(() => [
                          t(m, {
                            type: "primary",
                            link: ""
                          }, {
                            default: i(() => [
                              r(p(o(e)("preview")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])) : b("", !0),
                      t(m, {
                        type: "primary",
                        link: "",
                        onClick: (M) => xe(n)
                      }, {
                        default: i(() => [
                          r(p(o(e)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      (Y > 0 || u.page > 1) && ge(n) ? (_(), V(m, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (M) => he(n)
                      }, {
                        default: i(() => [
                          r(p(o(e)("rollback")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : b("", !0),
                      n.status == -2 ? (_(), V(m, {
                        key: 2,
                        type: "primary",
                        link: "",
                        onClick: (M) => J(n),
                        loading: h.value
                      }, {
                        default: i(() => [
                          r(p(o(e)("againUpload")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "loading"])) : b("", !0),
                      n.status == 2 ? (_(), V(m, {
                        key: 3,
                        type: "primary",
                        link: "",
                        onClick: (M) => _e(n)
                      }, {
                        default: i(() => [
                          r(p(o(e)("undoAudit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : b("", !0),
                      t(m, {
                        class: "table-delete",
                        link: "",
                        onClick: (M) => be(n)
                      }, {
                        default: i(() => [
                          r(p(o(e)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [Be, u.loading]
              ])
            ]),
            c("div", cl, [
              t(Ce, {
                "current-page": u.page,
                "onUpdate:current-page": l[1] || (l[1] = (n) => u.page = n),
                "page-size": u.limit,
                "onUpdate:page-size": l[2] || (l[2] = (n) => u.limit = n),
                layout: "total, sizes, prev, pager, next, jumper",
                total: u.total,
                onSizeChange: l[3] || (l[3] = (n) => y()),
                onCurrentChange: y
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        t(A, {
          modelValue: F.value,
          "onUpdate:modelValue": l[8] || (l[8] = (n) => F.value = n),
          title: o(e)("codeDownTwoDesc"),
          width: "30%",
          "before-close": de
        }, {
          footer: i(() => [
            c("span", rl, [
              t(m, {
                onClick: l[7] || (l[7] = (n) => F.value = !1)
              }, {
                default: i(() => [
                  r(p(o(e)("cancel")), 1)
                ]),
                _: 1
              }),
              t(m, {
                type: "primary",
                onClick: a.insert
              }, {
                default: i(() => [
                  r(p(o(e)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ]),
          default: i(() => [
            t(O, {
              ref_key: "ruleFormRef",
              ref: G,
              model: d.value,
              "label-width": "120px"
            }, {
              default: i(() => [
                t(k, {
                  prop: "code",
                  label: o(e)("code")
                }, {
                  default: i(() => [
                    t(B, {
                      modelValue: d.value.code,
                      "onUpdate:modelValue": l[4] || (l[4] = (n) => d.value.code = n),
                      modelModifiers: { trim: !0 },
                      placeholder: o(e)("codePlaceholder"),
                      onkeyup: "this.value = this.value.replace(/[^\\d\\.]/g,'');"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(k, {
                  prop: "path",
                  label: o(e)("path")
                }, {
                  default: i(() => [
                    t(De, {
                      modelValue: d.value.path,
                      "onUpdate:modelValue": l[5] || (l[5] = (n) => d.value.path = n),
                      api: "weapp/upload",
                      accept: ".zip"
                    }, null, 8, ["modelValue", "accept"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(k, {
                  label: o(e)("content")
                }, {
                  default: i(() => [
                    t(B, {
                      type: "textarea",
                      modelValue: d.value.content,
                      "onUpdate:modelValue": l[6] || (l[6] = (n) => d.value.content = n),
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
        t(A, {
          modelValue: R.value,
          "onUpdate:modelValue": l[13] || (l[13] = (n) => R.value = n),
          title: o(e)("codeDownTwoDesc"),
          width: "600px",
          "before-close": L
        }, {
          footer: i(() => [
            c("span", gl, [
              t(m, { onClick: L }, {
                default: i(() => [
                  r(p(o(e)("cancel")), 1)
                ]),
                _: 1
              }),
              t(m, {
                type: "primary",
                onClick: re
              }, {
                default: i(() => [
                  r(p(o(e)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            t(O, {
              ref_key: "cloudRuleFormRef",
              ref: K,
              model: d.value,
              rules: ie,
              "label-width": "120px"
            }, {
              default: i(() => [
                t(k, {
                  prop: "type",
                  label: o(e)("版本号类型")
                }, {
                  default: i(() => [
                    c("div", null, [
                      t(Re, {
                        modelValue: d.value.type,
                        "onUpdate:modelValue": l[9] || (l[9] = (n) => d.value.type = n)
                      }, {
                        default: i(() => [
                          t(X, { label: 1 }, {
                            default: i(() => [
                              r(p(o(e)("默认")), 1)
                            ]),
                            _: 1
                          }),
                          t(X, { label: 2 }, {
                            default: i(() => [
                              r(p(o(e)("自定义")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      ml
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                d.value.type == 2 ? (_(), V(k, {
                  key: 0,
                  prop: "version",
                  label: o(e)("code")
                }, {
                  default: i(() => [
                    c("div", fl, [
                      t(k, { prop: "code1" }, {
                        default: i(() => [
                          t(B, {
                            modelValue: d.value.code1,
                            "onUpdate:modelValue": l[10] || (l[10] = (n) => d.value.code1 = n),
                            modelModifiers: { number: !0 },
                            class: "!w-[70px]",
                            placeholder: o(e)("codePlaceholder")
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      c("span", vl, p(o(e)("weappUploadDot")), 1),
                      t(k, { prop: "code2" }, {
                        default: i(() => [
                          t(B, {
                            modelValue: d.value.code2,
                            "onUpdate:modelValue": l[11] || (l[11] = (n) => d.value.code2 = n),
                            modelModifiers: { number: !0 },
                            class: "!w-[70px]",
                            placeholder: o(e)("codePlaceholder")
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }),
                      c("span", _l, p(o(e)("weappUploadDot")), 1),
                      t(k, { prop: "code3" }, {
                        default: i(() => [
                          t(B, {
                            modelValue: d.value.code3,
                            "onUpdate:modelValue": l[12] || (l[12] = (n) => d.value.code3 = n),
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
                }, 8, ["label"])) : b("", !0)
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(A, {
          modelValue: q.value,
          "onUpdate:modelValue": l[15] || (l[15] = (n) => q.value = n),
          title: o(e)("failReason"),
          width: "60%"
        }, {
          footer: i(() => [
            c("span", bl, [
              t(m, {
                type: "primary",
                onClick: ke
              }, {
                default: i(() => [
                  r(p(o(e)("helpInfo")), 1)
                ]),
                _: 1
              }),
              t(m, {
                onClick: l[14] || (l[14] = (n) => q.value = !1)
              }, {
                default: i(() => [
                  r(p(o(e)("close")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            t(Ue, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
              default: i(() => [
                c("div", { innerHTML: ye.value }, null, 8, hl)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(A, {
          modelValue: T.value,
          "onUpdate:modelValue": l[16] || (l[16] = (n) => T.value = n),
          title: "发布前校验",
          width: "580px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1
        }, {
          default: i(() => [
            c("div", yl, [
              T.value ? (_(), V(Je, {
                key: 0,
                scene: "weapp_upload",
                params: o(ue),
                "auto-next": !0,
                "auto-next-delay": 500,
                "show-prev": !1,
                "next-text": o(e)("nextStep"),
                onNext: pe
              }, null, 8, ["params", "next-text"])) : b("", !0)
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 4);
    };
  }
});
export {
  $l as default
};
