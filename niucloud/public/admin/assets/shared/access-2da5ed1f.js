import { defineComponent as M, ref as m, onMounted as U, onUnmounted as F, resolveComponent as i, openBlock as v, createElementBlock as w, createVNode as s, withCtx as o, createElementVNode as n, toDisplayString as a, unref as e, createTextVNode as c, Fragment as C, createCommentVNode as I } from "vue";
import { a4 as L, t, j as D, aA as G, a5 as P, aB as Q } from "./core-shared-c6ad4e77.js";
import { useRoute as H, useRouter as J } from "vue-router";
import { ElMessageBox as K } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const O = { class: "main-container" }, X = { class: "flex justify-between items-center" }, Y = { class: "text-page-title" }, Z = { class: "p-[20px]" }, ee = { class: "panel-title !text-sm" }, te = { class: "text-[14px] font-[700]" }, ne = { class: "text-[#999]" }, oe = { class: "mt-[20px] mb-[40px] h-[32px]" }, se = { class: "text-[14px] font-[700]" }, ae = { class: "text-[#999]" }, le = { class: "mt-[20px] mb-[40px] h-[32px]" }, pe = /* @__PURE__ */ n("span", { class: "iconfont iconwenhao text-[#999] !text-[14px] ml-[5px]" }, null, -1), ie = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("div", null, " 非通过API创建的开放平台账号需要登录微信公众品平台进行取消授权操作 "),
  /* @__PURE__ */ n("div", null, [
    /* @__PURE__ */ c(" 微信公众平台： "),
    /* @__PURE__ */ n("a", {
      class: "ml-[3px] text-[var(--el-color-primary)]",
      target: "_blank",
      href: "https://mp.weixin.qq.com/cgi-bin/loginpage"
    }, "https://mp.weixin.qq.com/cgi-bin/loginpage")
  ])
], -1), ce = { class: "text-[14px] font-[700]" }, re = { class: "text-[#999]" }, _e = { class: "mt-[20px] mb-[40px] h-[32px]" }, ue = { class: "text-[14px] font-[700]" }, me = { class: "text-[#999]" }, de = /* @__PURE__ */ n("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), he = { class: "flex justify-center" }, fe = { class: "w-[100%] h-[100%] flex items-center justify-center bg-[#f5f7fa]" }, xe = { class: "mt-[22px] text-center" }, ve = { class: "text-[12px]" }, Ve = /* @__PURE__ */ M({
  __name: "access",
  setup(we) {
    const B = H(), u = J(), q = B.meta.title, g = m("/channel/weapp"), d = m(""), h = m({}), b = m({}), k = async () => {
      await G().then(({ data: p }) => {
        h.value = p, d.value = p.qr_code;
      });
    };
    U(async () => {
      await k(), await L().then(({ data: p }) => {
        b.value = p;
      }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && k();
      });
    }), F(() => {
      document.removeEventListener("visibilitychange", () => {
      });
    });
    const V = (p) => {
      window.open(p, "_blank");
    }, E = (p) => {
      u.push({ path: g.value });
    }, N = () => {
      P().then(({ data: p }) => {
        window.open(p);
      });
    }, f = m(!1), S = () => {
      K.confirm(
        t("确认取消授权吗？"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        f.value || (f.value = !0, Q({}).then(() => {
          f.value = !1;
        }).catch(() => {
          f.value = !1;
        }));
      });
    };
    return (p, l) => {
      const y = i("el-tab-pane"), W = i("el-tabs"), r = i("el-button"), x = i("el-step"), $ = i("el-tooltip"), j = i("el-steps"), A = i("el-col"), z = i("el-image"), R = i("el-row"), T = i("el-card");
      return v(), w("div", O, [
        s(T, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            n("div", X, [
              n("span", Y, a(e(q)), 1)
            ]),
            s(W, {
              modelValue: g.value,
              "onUpdate:modelValue": l[0] || (l[0] = (_) => g.value = _),
              class: "mt-[20px]",
              onTabChange: E
            }, {
              default: o(() => [
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
            n("div", Z, [
              n("h3", ee, a(e(t)("weappInlet")), 1),
              s(R, null, {
                default: o(() => [
                  s(A, { span: 20 }, {
                    default: o(() => [
                      s(j, {
                        class: "!mt-[10px]",
                        active: 4,
                        direction: "vertical"
                      }, {
                        default: o(() => [
                          s(x, null, {
                            title: o(() => [
                              n("p", te, a(e(t)("weappAttestation")), 1)
                            ]),
                            description: o(() => [
                              n("span", ne, a(e(t)("weappAttest")), 1),
                              n("div", oe, [
                                s(r, {
                                  type: "primary",
                                  onClick: l[1] || (l[1] = (_) => V("https://mp.weixin.qq.com/"))
                                }, {
                                  default: o(() => [
                                    c(a(e(t)("clickAccess")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          s(x, null, {
                            title: o(() => [
                              n("p", se, a(e(t)("weappSetting")), 1)
                            ]),
                            description: o(() => [
                              n("span", ae, a(e(t)("emplace")), 1),
                              n("div", le, [
                                b.value.app_id && b.value.app_secret ? (v(), w(C, { key: 0 }, [
                                  s(r, {
                                    type: "primary",
                                    onClick: l[2] || (l[2] = (_) => e(u).push("/channel/weapp/config"))
                                  }, {
                                    default: o(() => [
                                      c(a(h.value.app_id ? e(t)("seeConfig") : e(t)("weappSettingBtn")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  s(r, {
                                    type: "primary",
                                    plain: "",
                                    onClick: N
                                  }, {
                                    default: o(() => [
                                      c(a(h.value.is_authorization ? e(t)("refreshAuth") : e(t)("authWeapp")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  h.value.is_authorization ? (v(), w(C, { key: 0 }, [
                                    s(r, {
                                      type: "primary",
                                      plain: "",
                                      onClick: S
                                    }, {
                                      default: o(() => [
                                        c(a(e(t)("取消授权")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    s($, {
                                      class: "box-item",
                                      effect: "light",
                                      placement: "top"
                                    }, {
                                      content: o(() => [
                                        ie
                                      ]),
                                      default: o(() => [
                                        pe
                                      ]),
                                      _: 1
                                    })
                                  ], 64)) : I("", !0)
                                ], 64)) : (v(), w(C, { key: 1 }, [
                                  s(r, {
                                    type: "primary",
                                    onClick: l[3] || (l[3] = (_) => e(u).push("/channel/weapp/config"))
                                  }, {
                                    default: o(() => [
                                      c(a(e(t)("weappSettingBtn")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  s(r, {
                                    type: "primary",
                                    plain: "",
                                    onClick: l[4] || (l[4] = (_) => e(u).push("/channel/weapp/course"))
                                  }, {
                                    default: o(() => [
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
                            title: o(() => [
                              n("p", ce, a(e(t)("uploadVersion")), 1)
                            ]),
                            description: o(() => [
                              n("span", re, a(e(t)("releaseCourse")), 1),
                              n("div", _e, [
                                s(r, {
                                  type: "primary",
                                  plain: "",
                                  onClick: l[5] || (l[5] = (_) => e(u).push("/channel/weapp/code"))
                                }, {
                                  default: o(() => [
                                    c(a(e(t)("weappRelease")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          s(x, null, {
                            title: o(() => [
                              n("p", ue, a(e(t)("completeAccess")), 1)
                            ]),
                            description: o(() => [
                              n("span", me, a(e(t)("releaseCourse")), 1),
                              de
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
                    default: o(() => [
                      n("div", he, [
                        s(z, {
                          class: "w-[180px] h-[180px]",
                          src: d.value ? e(D)(d.value) : ""
                        }, {
                          error: o(() => [
                            n("div", fe, [
                              n("span", null, a(d.value ? e(t)("fileErr") : e(t)("emptyQrCode")), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      n("div", xe, [
                        n("p", ve, a(e(t)("clickAccess2")), 1)
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
  Ve as default
};
