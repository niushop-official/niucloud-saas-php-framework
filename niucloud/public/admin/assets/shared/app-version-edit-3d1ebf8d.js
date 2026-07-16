import { defineComponent as J, ref as V, computed as F, reactive as M, watch as T, resolveComponent as c, resolveDirective as Q, openBlock as w, createElementBlock as C, Fragment as $, createVNode as a, unref as p, withCtx as o, createElementVNode as d, createTextVNode as n, toDisplayString as m, withDirectives as _, vShow as f, createBlock as q, renderList as W, createCommentVNode as N } from "vue";
import { t as r, Y as X, Z as ee, $ as le, a0 as ae } from "./core-shared-e1759ce4.js";
import te from "./generate-sing-cert-cca0bcae.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const oe = { class: "h-[400px]" }, re = { class: "form-tip" }, pe = { class: "h-[400px]" }, de = { class: "input-width" }, se = {
  key: 0,
  class: "form-tip"
}, ie = {
  key: 1,
  class: "form-tip"
}, ne = { class: "input-width" }, ue = { class: "form-tip !leading-[1.5]" }, ce = /* @__PURE__ */ d("div", { class: "form-tip !leading-[1.5]" }, "只支持上传.zip 在drawable的根目录进行压缩", -1), me = { class: "form-tip" }, _e = { class: "form-tip !leading-[1.5]" }, fe = { class: "form-tip flex items-center" }, ge = { class: "input-width" }, ve = { class: "dialog-footer" }, ze = /* @__PURE__ */ J({
  __name: "app-version-edit",
  emits: ["complete"],
  setup(be, { expose: R, emit: E }) {
    const y = V(!1), g = V(!1), P = V({}), b = V(1), D = V(null);
    (async () => {
      await X().then(({ data: u }) => {
        P.value = u, x.platform = Object.keys(u)[0];
      });
    })();
    const S = F(() => e.upgrade_type == "app" ? ".apk" : e.upgrade_type == "hot" ? ".wgt" : ""), x = {
      id: "",
      version_code: "",
      version_name: "",
      version_desc: "",
      platform: "",
      is_forced_upgrade: 0,
      package_path: "",
      package_type: "file",
      upgrade_type: "app",
      build: {
        icon: ""
      },
      cert: {
        type: "public",
        file: "",
        key_alias: "",
        key_password: "",
        store_password: ""
      }
    }, e = M({ ...x }), z = V();
    T(() => e.upgrade_type, () => {
      (e.upgrade_type == "app" || e.upgrade_type == "hot") && (e.package_type = "file"), e.package_path = "", e.cert.type = "public";
    });
    const O = F(() => ({
      version_code: [
        { required: !0, message: r("versionCodePlaceholder"), trigger: "blur" },
        {
          trigger: "blur",
          validator: (u, l, s) => {
            isNaN(l) || !/^\d{0,10}$/.test(l) ? s(new Error(r("versionCodeTips"))) : l < 0 ? s(new Error(r("versionCodeTips"))) : s();
          }
        }
      ],
      version_name: [
        { required: !0, message: r("versionNamePlaceholder"), trigger: "blur" }
      ],
      package_path: [
        { required: e.upgrade_type != "market" && e.package_type == "file", message: "请上传资源文件", trigger: "blur" },
        { required: e.upgrade_type == "market", message: "请输入应用市场链接", trigger: "blur" }
      ],
      "build.icon": [
        { required: e.package_type == "cloud", message: "请上传图标文件", trigger: "blur" }
      ],
      "cert.file": [
        { required: e.package_type == "cloud" && e.cert.type == "private", message: "请上传证书文件", trigger: "blur" }
      ],
      "cert.key_alias": [
        { required: e.package_type == "cloud" && e.cert.type == "private", message: "请输入证书别名", trigger: "blur" }
      ],
      "cert.key_password": [
        { required: e.package_type == "cloud" && e.cert.type == "private", message: "请上传证书密码", trigger: "blur" }
      ],
      "cert.store_password": [
        { required: e.package_type == "cloud" && e.cert.type == "private", message: "请上传证书库密码", trigger: "blur" }
      ]
    })), j = E, B = async (u) => {
      if (g.value || !u)
        return;
      const l = e.id ? ee : le;
      await u.validate(async (s) => {
        s && (g.value = !0, l(e).then((i) => {
          g.value = !1, y.value = !1, j("complete");
        }).catch(() => {
          g.value = !1;
        }));
      });
    }, I = async (u = null) => {
      if (Object.assign(e, x), g.value = !0, u) {
        const l = await (await ae(u.id)).data;
        l && Object.keys(e).forEach((s) => {
          l[s] != null && (e[s] = l[s]);
        });
      }
      g.value = !1;
    };
    T(() => y.value, () => {
      b.value = 1;
    });
    const A = (u) => {
      window.open(u);
    };
    return R({
      showDialog: y,
      setFormData: I
    }), (u, l) => {
      const s = c("el-input"), i = c("el-form-item"), v = c("el-radio"), k = c("el-radio-group"), K = c("el-switch"), U = c("upload-file"), L = c("el-scrollbar"), Y = c("el-form"), h = c("el-button"), Z = c("el-dialog"), G = Q("loading");
      return w(), C($, null, [
        a(Z, {
          modelValue: y.value,
          "onUpdate:modelValue": l[22] || (l[22] = (t) => y.value = t),
          title: e.id ? p(r)("updateAppVersion") : p(r)("addAppVersion"),
          width: "60%",
          class: "diy-dialog-wrap",
          "destroy-on-close": !0
        }, {
          footer: o(() => [
            d("span", ve, [
              a(h, {
                onClick: l[18] || (l[18] = (t) => y.value = !1)
              }, {
                default: o(() => [
                  n(m(p(r)("cancel")), 1)
                ]),
                _: 1
              }),
              _(d("view", null, [
                a(h, {
                  type: "primary",
                  class: "ml-3",
                  onClick: l[19] || (l[19] = (t) => b.value = 2)
                }, {
                  default: o(() => [
                    n(m(p(r)("next")), 1)
                  ]),
                  _: 1
                })
              ], 512), [
                [f, b.value == 1]
              ]),
              _(d("view", null, [
                a(h, {
                  type: "primary",
                  class: "ml-3",
                  onClick: l[20] || (l[20] = (t) => b.value = 1)
                }, {
                  default: o(() => [
                    n(m(p(r)("prev")), 1)
                  ]),
                  _: 1
                }),
                a(h, {
                  type: "primary",
                  loading: g.value,
                  onClick: l[21] || (l[21] = (t) => B(z.value))
                }, {
                  default: o(() => [
                    n(m(p(r)("confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ], 512), [
                [f, b.value == 2]
              ])
            ])
          ]),
          default: o(() => [
            _((w(), q(Y, {
              model: e,
              "label-width": "120px",
              ref_key: "formRef",
              ref: z,
              rules: O.value,
              class: "page-form"
            }, {
              default: o(() => [
                _(d("div", oe, [
                  a(i, {
                    label: p(r)("versionName"),
                    prop: "version_name"
                  }, {
                    default: o(() => [
                      a(s, {
                        modelValue: e.version_name,
                        "onUpdate:modelValue": l[0] || (l[0] = (t) => e.version_name = t),
                        clearable: "",
                        placeholder: p(r)("versionNamePlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(i, {
                    label: p(r)("versionCode"),
                    prop: "version_code"
                  }, {
                    default: o(() => [
                      a(s, {
                        modelValue: e.version_code,
                        "onUpdate:modelValue": l[1] || (l[1] = (t) => e.version_code = t),
                        clearable: "",
                        placeholder: p(r)("versionCodePlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"]),
                      d("div", re, m(p(r)("versionCodeTips")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(i, {
                    label: p(r)("versionDesc"),
                    prop: "version_desc"
                  }, {
                    default: o(() => [
                      a(s, {
                        modelValue: e.version_desc,
                        "onUpdate:modelValue": l[2] || (l[2] = (t) => e.version_desc = t),
                        type: "textarea",
                        rows: "6",
                        clearable: "",
                        placeholder: p(r)("versionDescPlaceholder"),
                        class: "input-width"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(i, {
                    label: p(r)("platform"),
                    prop: "platform"
                  }, {
                    default: o(() => [
                      a(k, {
                        modelValue: e.platform,
                        "onUpdate:modelValue": l[3] || (l[3] = (t) => e.platform = t)
                      }, {
                        default: o(() => [
                          (w(!0), C($, null, W(P.value, (t, H) => (w(), q(v, {
                            label: H,
                            size: "large"
                          }, {
                            default: o(() => [
                              n(m(t), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 256))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(i, {
                    label: p(r)("isForcedUpgrade"),
                    prop: "is_forced_upgrade"
                  }, {
                    default: o(() => [
                      a(K, {
                        modelValue: e.is_forced_upgrade,
                        "onUpdate:modelValue": l[4] || (l[4] = (t) => e.is_forced_upgrade = t),
                        "active-value": 1,
                        "inactive-value": 0
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ], 512), [
                  [f, b.value == 1]
                ]),
                _(d("div", pe, [
                  a(L, null, {
                    default: o(() => [
                      a(i, {
                        label: p(r)("upgradeType")
                      }, {
                        default: o(() => [
                          a(k, {
                            modelValue: e.upgrade_type,
                            "onUpdate:modelValue": l[5] || (l[5] = (t) => e.upgrade_type = t)
                          }, {
                            default: o(() => [
                              a(v, {
                                label: "app",
                                size: "large"
                              }, {
                                default: o(() => [
                                  n("APP整包升级")
                                ]),
                                _: 1
                              }),
                              a(v, {
                                label: "hot",
                                size: "large"
                              }, {
                                default: o(() => [
                                  n("wgt资源包升级")
                                ]),
                                _: 1
                              }),
                              a(v, {
                                label: "market",
                                size: "large"
                              }, {
                                default: o(() => [
                                  n("应用市场升级")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      _(a(i, {
                        label: p(r)("resourceFile")
                      }, {
                        default: o(() => [
                          a(k, {
                            modelValue: e.package_type,
                            "onUpdate:modelValue": l[6] || (l[6] = (t) => e.package_type = t)
                          }, {
                            default: o(() => [
                              a(v, {
                                label: "file",
                                size: "large"
                              }, {
                                default: o(() => [
                                  n("上传资源包")
                                ]),
                                _: 1
                              }),
                              a(v, {
                                label: "cloud",
                                size: "large"
                              }, {
                                default: o(() => [
                                  n("云打包")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]), [
                        [f, e.upgrade_type == "app"]
                      ]),
                      _(d("div", null, [
                        a(i, {
                          label: "",
                          prop: "package_path"
                        }, {
                          default: o(() => [
                            d("div", de, [
                              a(U, {
                                modelValue: e.package_path,
                                "onUpdate:modelValue": l[7] || (l[7] = (t) => e.package_path = t),
                                accept: S.value,
                                api: "sys/document/app_package"
                              }, null, 8, ["modelValue", "accept"])
                            ]),
                            e.upgrade_type == "app" ? (w(), C("div", se, m(p(r)("androidResourceFileTips")), 1)) : N("", !0),
                            e.upgrade_type == "hot" ? (w(), C("div", ie, m(p(r)("iosResourceFileTips")), 1)) : N("", !0)
                          ]),
                          _: 1
                        })
                      ], 512), [
                        [f, e.package_type == "file" && e.upgrade_type != "market"]
                      ]),
                      _(d("div", null, [
                        a(i, {
                          label: "应用市场链接",
                          prop: "package_path"
                        }, {
                          default: o(() => [
                            a(s, {
                              modelValue: e.package_path,
                              "onUpdate:modelValue": l[8] || (l[8] = (t) => e.package_path = t),
                              clearable: "",
                              class: "input-width"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ], 512), [
                        [f, e.upgrade_type == "market"]
                      ]),
                      _(d("div", null, [
                        a(i, {
                          label: p(r)("icon"),
                          prop: "build.icon"
                        }, {
                          default: o(() => [
                            d("div", ne, [
                              a(U, {
                                modelValue: e.build.icon,
                                "onUpdate:modelValue": l[9] || (l[9] = (t) => e.build.icon = t),
                                accept: ".zip",
                                api: "sys/document/applet"
                              }, null, 8, ["modelValue"])
                            ]),
                            d("div", ue, [
                              n("应用图标和启动界面图片 icon.png为应用的图标 push.png为推送消息的图标 splash.png为应用启动页的图标 将icon.png、push.png、splash.png放置到drawable，drawable-ldpi，drawable-mdpi，drawable-hdpi，drawable-xhdpi，drawable-xxhdpi文件夹下压缩成压缩包上传， 具体详情可查看 "),
                              d("span", {
                                class: "text-primary cursor-pointer",
                                onClick: l[10] || (l[10] = (t) => A("https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html"))
                              }, "uniapp App离线打包"),
                              n("中“配置应用图标和启动界面”片段")
                            ]),
                            ce
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        a(i, {
                          label: p(r)("certType")
                        }, {
                          default: o(() => [
                            a(k, {
                              modelValue: e.cert.type,
                              "onUpdate:modelValue": l[11] || (l[11] = (t) => e.cert.type = t)
                            }, {
                              default: o(() => [
                                a(v, {
                                  label: "public",
                                  size: "large"
                                }, {
                                  default: o(() => [
                                    n("公共证书")
                                  ]),
                                  _: 1
                                }),
                                a(v, {
                                  label: "private",
                                  size: "large"
                                }, {
                                  default: o(() => [
                                    n("自有证书")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"]),
                            d("div", me, m(p(r)("publicCertTips")), 1),
                            d("div", _e, [
                              n(m(p(r)("privateCertTips")), 1),
                              d("span", {
                                class: "text-primary cursor-pointer",
                                onClick: l[12] || (l[12] = (t) => A("https://ask.dcloud.net.cn/article/35777"))
                              }, "《Android平台签名证书说明》")
                            ]),
                            d("div", fe, [
                              n("证书可以自己生成也可通过niucloud提供的"),
                              d("span", {
                                class: "text-primary cursor-pointer",
                                onClick: l[13] || (l[13] = (t) => D.value.open())
                              }, "证书生成工具生成")
                            ])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        _(d("div", null, [
                          a(i, {
                            label: p(r)("certFile"),
                            prop: "cert.file"
                          }, {
                            default: o(() => [
                              d("div", ge, [
                                a(U, {
                                  modelValue: e.cert.file,
                                  "onUpdate:modelValue": l[14] || (l[14] = (t) => e.cert.file = t),
                                  accept: "",
                                  api: "sys/document/android_cert"
                                }, null, 8, ["modelValue"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(i, {
                            label: p(r)("certAlias"),
                            prop: "cert.key_alias"
                          }, {
                            default: o(() => [
                              a(s, {
                                modelValue: e.cert.key_alias,
                                "onUpdate:modelValue": l[15] || (l[15] = (t) => e.cert.key_alias = t),
                                clearable: "",
                                placeholder: p(r)("versionDescPlaceholder"),
                                class: "input-width"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(i, {
                            label: p(r)("certKeyPassword"),
                            prop: "cert.key_password"
                          }, {
                            default: o(() => [
                              a(s, {
                                modelValue: e.cert.key_password,
                                "onUpdate:modelValue": l[16] || (l[16] = (t) => e.cert.key_password = t),
                                clearable: "",
                                placeholder: p(r)("versionDescPlaceholder"),
                                class: "input-width"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          a(i, {
                            label: p(r)("certStorePassword"),
                            prop: "cert.store_password"
                          }, {
                            default: o(() => [
                              a(s, {
                                modelValue: e.cert.store_password,
                                "onUpdate:modelValue": l[17] || (l[17] = (t) => e.cert.store_password = t),
                                clearable: "",
                                placeholder: p(r)("versionDescPlaceholder"),
                                class: "input-width"
                              }, null, 8, ["modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ], 512), [
                          [f, e.cert.type == "private"]
                        ])
                      ], 512), [
                        [f, e.package_type == "cloud"]
                      ])
                    ]),
                    _: 1
                  })
                ], 512), [
                  [f, b.value == 2]
                ])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [G, g.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(te, {
          ref_key: "generateSingCertRef",
          ref: D
        }, null, 512)
      ], 64);
    };
  }
});
export {
  ze as default
};
