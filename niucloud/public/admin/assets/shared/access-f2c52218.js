import { defineComponent as Q, ref as m, onMounted as U, onUnmounted as I, resolveComponent as i, openBlock as v, createElementBlock as w, createVNode as s, withCtx as n, createElementVNode as o, toDisplayString as l, unref as e, createTextVNode as c, Fragment as C, createCommentVNode as L } from "vue";
import { P, t, i as D, a6 as G, a7 as H, a8 as J } from "./core-shared-ca1fcae5.js";
import { useRoute as K, useRouter as O } from "vue-router";
import { ElMessageBox as X } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Y = { class: "main-container" }, Z = { class: "flex justify-between items-center" }, ee = { class: "text-page-title" }, te = { class: "p-[20px]" }, ne = { class: "panel-title !text-sm" }, oe = { class: "text-[14px] font-[700]" }, se = { class: "text-[#999]" }, le = { class: "mt-[20px] mb-[40px] h-[32px]" }, ae = { class: "text-[14px] font-[700]" }, ie = { class: "text-[#999]" }, pe = { class: "mt-[20px] mb-[40px] h-[32px]" }, ce = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("div", null, " 非通过API创建的开放平台账号需要登录微信公众品平台进行取消授权操作 "),
  /* @__PURE__ */ o("div", null, [
    /* @__PURE__ */ c(" 微信公众平台： "),
    /* @__PURE__ */ o("a", {
      class: "ml-[3px] text-[var(--el-color-primary)]",
      target: "_blank",
      href: "https://mp.weixin.qq.com/cgi-bin/loginpage"
    }, "https://mp.weixin.qq.com/cgi-bin/loginpage")
  ])
], -1), re = { class: "text-[14px] font-[700]" }, _e = { class: "text-[#999]" }, ue = { class: "mt-[20px] mb-[40px] h-[32px]" }, me = { class: "text-[14px] font-[700]" }, de = { class: "text-[#999]" }, fe = /* @__PURE__ */ o("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), he = { class: "flex justify-center" }, xe = { class: "w-[100%] h-[100%] flex items-center justify-center bg-[#f5f7fa]" }, ve = { class: "mt-[22px] text-center" }, we = { class: "text-[12px]" }, Ee = /* @__PURE__ */ Q({
  __name: "access",
  setup(ge) {
    const q = K(), u = O(), B = q.meta.title, g = m("/channel/weapp"), d = m(""), f = m({}), b = m({}), k = async () => {
      await G().then(({ data: p }) => {
        f.value = p, d.value = p.qr_code;
      });
    };
    U(async () => {
      await k(), await P().then(({ data: p }) => {
        b.value = p;
      }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && k();
      });
    }), I(() => {
      document.removeEventListener("visibilitychange", () => {
      });
    });
    const V = (p) => {
      window.open(p, "_blank");
    }, E = (p) => {
      u.push({ path: g.value });
    }, N = () => {
      H().then(({ data: p }) => {
        window.open(p);
      });
    }, h = m(!1), S = () => {
      X.confirm(
        t("确认取消授权吗？"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        h.value || (h.value = !0, J({}).then(() => {
          h.value = !1;
        }).catch(() => {
          h.value = !1;
        }));
      });
    };
    return (p, a) => {
      const y = i("el-tab-pane"), z = i("el-tabs"), r = i("el-button"), x = i("el-step"), W = i("QuestionFilled"), $ = i("el-icon"), F = i("el-tooltip"), R = i("el-steps"), A = i("el-col"), T = i("el-image"), j = i("el-row"), M = i("el-card");
      return v(), w("div", Y, [
        s(M, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            o("div", Z, [
              o("span", ee, l(e(B)), 1)
            ]),
            s(z, {
              modelValue: g.value,
              "onUpdate:modelValue": a[0] || (a[0] = (_) => g.value = _),
              class: "mt-[20px]",
              onTabChange: E
            }, {
              default: n(() => [
                s(y, {
                  label: e(t)("weappAccessFlow"),
                  name: "/channel/weapp"
                }, null, 8, ["label"]),
                s(y, {
                  label: e(t)("subscribeMessage"),
                  name: "/channel/weapp/message"
                }, null, 8, ["label"]),
                s(y, {
                  label: e(t)("weappRelease"),
                  name: "/channel/weapp/code"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            o("div", te, [
              o("h3", ne, l(e(t)("weappInlet")), 1),
              s(j, null, {
                default: n(() => [
                  s(A, { span: 20 }, {
                    default: n(() => [
                      s(R, {
                        class: "!mt-[10px]",
                        active: 4,
                        direction: "vertical"
                      }, {
                        default: n(() => [
                          s(x, null, {
                            title: n(() => [
                              o("p", oe, l(e(t)("weappAttestation")), 1)
                            ]),
                            description: n(() => [
                              o("span", se, l(e(t)("weappAttest")), 1),
                              o("div", le, [
                                s(r, {
                                  type: "primary",
                                  onClick: a[1] || (a[1] = (_) => V("https://mp.weixin.qq.com/"))
                                }, {
                                  default: n(() => [
                                    c(l(e(t)("clickAccess")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          s(x, null, {
                            title: n(() => [
                              o("p", ae, l(e(t)("weappSetting")), 1)
                            ]),
                            description: n(() => [
                              o("span", ie, l(e(t)("emplace")), 1),
                              o("div", pe, [
                                b.value.app_id && b.value.app_secret ? (v(), w(C, { key: 0 }, [
                                  s(r, {
                                    type: "primary",
                                    onClick: a[2] || (a[2] = (_) => e(u).push("/channel/weapp/config"))
                                  }, {
                                    default: n(() => [
                                      c(l(f.value.app_id ? e(t)("seeConfig") : e(t)("weappSettingBtn")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  s(r, {
                                    type: "primary",
                                    plain: "",
                                    onClick: N
                                  }, {
                                    default: n(() => [
                                      c(l(f.value.is_authorization ? e(t)("refreshAuth") : e(t)("authWeapp")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  f.value.is_authorization ? (v(), w(C, { key: 0 }, [
                                    s(r, {
                                      type: "primary",
                                      plain: "",
                                      onClick: S
                                    }, {
                                      default: n(() => [
                                        c(l(e(t)("取消授权")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    s(F, {
                                      class: "box-item",
                                      effect: "light",
                                      placement: "top"
                                    }, {
                                      content: n(() => [
                                        ce
                                      ]),
                                      default: n(() => [
                                        s($, {
                                          color: "#666",
                                          size: "15px",
                                          class: "ml-[5px]"
                                        }, {
                                          default: n(() => [
                                            s(W)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ], 64)) : L("", !0)
                                ], 64)) : (v(), w(C, { key: 1 }, [
                                  s(r, {
                                    type: "primary",
                                    onClick: a[3] || (a[3] = (_) => e(u).push("/channel/weapp/config"))
                                  }, {
                                    default: n(() => [
                                      c(l(e(t)("weappSettingBtn")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  s(r, {
                                    type: "primary",
                                    plain: "",
                                    onClick: a[4] || (a[4] = (_) => e(u).push("/channel/weapp/course"))
                                  }, {
                                    default: n(() => [
                                      c("配置教程")
                                    ]),
                                    _: 1
                                  })
                                ], 64))
                              ])
                            ]),
                            _: 1
                          }),
                          s(x, null, {
                            title: n(() => [
                              o("p", re, l(e(t)("uploadVersion")), 1)
                            ]),
                            description: n(() => [
                              o("span", _e, l(e(t)("releaseCourse")), 1),
                              o("div", ue, [
                                s(r, {
                                  type: "primary",
                                  plain: "",
                                  onClick: a[5] || (a[5] = (_) => e(u).push("/channel/weapp/code"))
                                }, {
                                  default: n(() => [
                                    c(l(e(t)("weappRelease")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          s(x, null, {
                            title: n(() => [
                              o("p", me, l(e(t)("completeAccess")), 1)
                            ]),
                            description: n(() => [
                              o("span", de, l(e(t)("releaseCourse")), 1),
                              fe
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  s(A, { span: 4 }, {
                    default: n(() => [
                      o("div", he, [
                        s(T, {
                          class: "w-[180px] h-[180px]",
                          src: d.value ? e(D)(d.value) : ""
                        }, {
                          error: n(() => [
                            o("div", xe, [
                              o("span", null, l(d.value ? e(t)("fileErr") : e(t)("emptyQrCode")), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      o("div", ve, [
                        o("p", we, l(e(t)("clickAccess2")), 1)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  Ee as default
};
