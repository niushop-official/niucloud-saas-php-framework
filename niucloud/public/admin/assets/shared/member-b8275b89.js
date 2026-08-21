import { defineComponent as oe, computed as ne, ref as f, reactive as S, onUnmounted as ie, watch as re, resolveComponent as c, openBlock as y, createElementBlock as b, createVNode as n, withCtx as r, createElementVNode as l, toDisplayString as p, withDirectives as h, vShow as D, unref as o, createTextVNode as _, createCommentVNode as j, normalizeClass as B, Fragment as pe, renderList as de, pushScopeId as Ge, popScopeId as Ke, nextTick as ce } from "vue";
import { u as me, bn as ue, M as fe, t as s, i as _e, bj as ve, s as we, bk as xe, _ as ge } from "./core-shared-0b2facad.js";
import { useRouter as ye } from "vue-router";
import { ElMessage as L } from "element-plus";
import { b as be } from "./browser-04e4c77a.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const he = { class: "main-container" }, De = {
  key: 0,
  class: "flex flex-wrap min-w-[1200px]"
}, ke = { class: "page-item relative w-[340px] mr-[40px] pt-[90px] pb-[20px] bg-[#f7f7f7] bg-no-repeat" }, Ie = { class: "absolute top-[54px] left-[50%] translate-x-[-50%] w-[130px] text-[14px] truncate text-center" }, Ce = { class: "w-[320px] h-[550px] mx-auto" }, Te = ["id", "src"], Ue = { class: "w-[320px] h-[550px] mx-auto bg-body pt-[20px] px-[20px]" }, Pe = { class: "font-bold text-xl mb-[40px]" }, Se = { class: "mb-[20px] flex flex-col" }, Le = { class: "mb-[10px]" }, Ve = { class: "flex" }, Ee = { class: "overflow-hidden w-[320px] h-[550px] mx-auto" }, $e = ["src"], Me = { class: "w-[700px]" }, Oe = { class: "flex flex-wrap" }, Re = { class: "info-wrap" }, Ne = { class: "mt-[20px] p-[20px] flex items-center justify-between bg" }, je = { class: "font-bold" }, Be = { class: "text-[#999] text-base" }, qe = { class: "text-center" }, Ae = { class: "flex items-start" }, Je = { class: "flex flex-wrap" }, ze = ["onClick"], Fe = { class: "dialog-footer" }, He = /* @__PURE__ */ oe({
  __name: "member",
  setup(Qe) {
    const q = me(), We = ne(() => q.siteInfo.apps), w = f("DIY_MEMBER_INDEX"), e = S({}), V = ye(), x = f(""), E = f(""), d = f({
      name: ""
    }), v = S({
      type: "",
      name: "",
      page: "",
      title: "",
      action: ""
    }), g = f(!1), $ = S({});
    ue({ type: "member_index" }).then((a) => {
      for (const t in a.data)
        $[t] = a.data[t];
    });
    const M = () => {
      ve({
        type: w.value
      }).then((a) => {
        for (const t in a.data)
          e[t] = a.data[t];
        d.value.name = e.use_template.name, d.value.title = e.use_template.title, d.value.page = e.use_template.page, d.value.action = e.use_template.action, e.use_template.url && (e.loadingIframe = !1, e.loadingDev = !1, e.isDisabledPop = !1, e.difference = 0, k.value = !1, x.value = e.domain_url.wap_domain, e.wapUrl = e.domain_url.wap_url, !0 && R());
      });
    };
    M();
    const k = f(!1);
    let m = null, I = null;
    const T = () => {
      m && (clearInterval(m), m = null), I && (clearTimeout(I), I = null);
    }, O = (a) => {
      try {
        let t = {
          type: ""
        };
        if (typeof a.data == "string")
          t = JSON.parse(a.data);
        else if (a.data && typeof a.data == "object")
          t = a.data;
        else
          return;
        if (t.type && ["appOnLaunch", "appOnReady"].indexOf(t.type) != -1) {
          e.loadingDev = !1, e.loadingIframe = !0;
          let C = new Date().getTime();
          e.difference = C - e.timeIframe, e.isDisabledPop = !1, k.value = !0, T();
        }
      } catch (t) {
        console.log("diy member 后台接受数据错误", t);
      }
    };
    window.addEventListener("message", O, !1), ie(() => {
      window.removeEventListener("message", O, !1), T();
    });
    const A = () => {
      const a = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window["previewIframe_" + w.value] && window["previewIframe_" + w.value].contentWindow.postMessage(a, "*");
    }, J = () => {
      e.loadingDev = !0, e.isDisabledPop = !0, e.loadingIframe = !1;
    }, z = () => {
      if (x.value.trim().length == 0) {
        L({
          type: "warning",
          message: `${s("wapDomainPlaceholder")}`
        });
        return;
      }
      const a = x.value + "/wap";
      we.set({ key: "wap_domain", data: a }), e.use_template.url && (e.wapUrl = a, R()), setTimeout(() => {
        e.use_template.url && (e.loadingIframe = !0, e.loadingDev = !1, e.isDisabledPop = !1);
      }, 100 * 3);
    }, F = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/configLocalDevEnv.html");
    }, R = () => {
      e.use_template.wapPreview = e.wapUrl + e.use_template.url, e.shareUrl = e.wapUrl + e.page, be.toDataURL(e.shareUrl, { errorCorrectionLevel: "L", margin: 0, width: 100 }).then((t) => {
        E.value = t;
      });
      const a = () => {
        e.timeIframe = new Date().getTime(), A();
      };
      T(), ce(() => {
        a();
        let t = 0;
        m = setInterval(() => {
          if (k.value || t >= 50) {
            m && (clearInterval(m), m = null);
            return;
          }
          a(), t++;
        }, 200), I = setTimeout(() => {
          e.difference == 0 && !k.value && J();
        }, 1e3 * 10);
      });
    }, H = () => {
      const a = {
        back: "/site/diy/member"
      };
      e.use_template.id ? a.id = e.use_template.id : e.use_template.type ? a.name = e.use_template.type : e.use_template.url && (a.url = e.use_template.url);
      const t = V.resolve({
        path: "/decorate/edit",
        query: a
      });
      window.open(t.href);
    }, Q = () => {
      let a = e.use_template.page;
      e.use_template.url ? a = e.use_template.url : e.use_template.id && (a += "?id=" + e.use_template.id);
      const t = V.resolve({
        path: "/preview/wap",
        query: {
          page: a
        }
      });
      window.open(t.href);
    }, W = (a, t) => {
      d.value.name = a, d.value.page = t.page, d.value.title = t.title, d.value.action = t.action;
    }, U = f(!1), X = () => {
      v.type = w.value, v.name = d.value.name, v.page = d.value.page, v.title = d.value.title, v.action = d.value.action, !U.value && (U.value = !0, xe({
        ...v
      }).then((a) => {
        U.value = !1, g.value = !1, M();
      }));
    }, { copy: Y, isSupported: G, copied: N } = fe(), K = (a) => {
      G.value || L({
        message: s("notSupportCopy"),
        type: "warning"
      }), Y(a);
    };
    return re(N, () => {
      N.value && L({
        message: s("copySuccess"),
        type: "success"
      });
    }), (a, t) => {
      const C = c("el-input"), u = c("el-button"), Z = c("el-form-item"), ee = c("el-form"), te = c("el-image"), ae = c("el-scrollbar"), le = c("el-dialog"), se = c("el-card");
      return y(), b("div", he, [
        n(se, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            e.use_template ? (y(), b("div", De, [
              l("div", ke, [
                l("p", Ie, p(e.use_template.title), 1),
                h(l("div", Ce, [
                  h(l("iframe", {
                    id: "previewIframe_" + w.value,
                    class: "w-[320px] h-[550px] mx-auto",
                    src: e.use_template.wapPreview,
                    frameborder: "0"
                  }, null, 8, Te), [
                    [D, e.loadingIframe]
                  ]),
                  h(l("div", Ue, [
                    l("div", Pe, p(o(s)("developTitle")), 1),
                    l("div", Se, [
                      l("text", Le, p(o(s)("wapDomain")), 1),
                      n(C, {
                        modelValue: x.value,
                        "onUpdate:modelValue": t[0] || (t[0] = (i) => x.value = i),
                        modelModifiers: { trim: !0 },
                        placeholder: o(s)("wapDomainPlaceholder"),
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    l("div", Ve, [
                      n(u, {
                        type: "primary",
                        onClick: t[1] || (t[1] = (i) => z())
                      }, {
                        default: r(() => [
                          _(p(o(s)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      n(u, {
                        type: "primary",
                        onClick: t[2] || (t[2] = (i) => F()),
                        plain: ""
                      }, {
                        default: r(() => [
                          _(p(o(s)("settingTips")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ], 512), [
                    [D, e.loadingDev]
                  ])
                ], 512), [
                  [D, e.use_template.url]
                ]),
                h(l("div", Ee, [
                  e.use_template.cover ? (y(), b("img", {
                    key: 0,
                    class: "max-w-full",
                    src: o(_e)(e.use_template.cover)
                  }, null, 8, $e)) : j("", !0)
                ], 512), [
                  [D, !e.use_template.wapPreview]
                ]),
                l("div", {
                  class: B(["popup-wrap absolute inset-x-0 inset-y-0 select-none", { disabled: e.isDisabledPop }])
                }, null, 2)
              ]),
              l("div", Me, [
                l("div", Oe, [
                  n(u, {
                    type: "primary",
                    onClick: t[3] || (t[3] = (i) => g.value = !0)
                  }, {
                    default: r(() => [
                      _(p(o(s)("changePage")), 1)
                    ]),
                    _: 1
                  }),
                  h(n(u, {
                    type: "primary",
                    onClick: t[4] || (t[4] = (i) => H()),
                    class: "ml-[12px]"
                  }, {
                    default: r(() => [
                      _(p(o(s)("decorate")), 1)
                    ]),
                    _: 1
                  }, 512), [
                    [D, e.use_template.action == "decorate"]
                  ])
                ]),
                l("div", Re, [
                  l("div", Ne, [
                    l("div", null, [
                      l("div", je, p(o(s)("H5")), 1),
                      n(ee, {
                        "label-width": "40px",
                        class: "mt-[5px]"
                      }, {
                        default: r(() => [
                          n(Z, {
                            label: o(s)("link"),
                            class: "mb-[5px]"
                          }, {
                            default: r(() => [
                              n(C, {
                                readonly: "",
                                value: e.shareUrl,
                                class: "!w-[400px]"
                              }, {
                                append: r(() => [
                                  n(u, {
                                    onClick: t[5] || (t[5] = (i) => K(e.shareUrl)),
                                    class: "bg-primary copy"
                                  }, {
                                    default: r(() => [
                                      _(p(o(s)("copy")), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["value"])
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        _: 1
                      }),
                      l("div", Be, p(o(s)("scanQRCodeOnRight")), 1)
                    ]),
                    l("div", qe, [
                      n(te, {
                        class: "w-[100px] h-[100px] mb-[5px]",
                        src: E.value
                      }, null, 8, ["src"]),
                      l("div", {
                        onClick: t[6] || (t[6] = (i) => Q()),
                        class: "text-primary text-base cursor-pointer"
                      }, p(o(s)("preview")), 1)
                    ])
                  ])
                ])
              ])
            ])) : j("", !0),
            n(le, {
              modelValue: g.value,
              "onUpdate:modelValue": t[9] || (t[9] = (i) => g.value = i),
              title: o(s)("pageSelectTips"),
              width: "400px",
              "close-on-press-escape": !0,
              "destroy-on-close": !0,
              "close-on-click-modal": !1
            }, {
              footer: r(() => [
                l("span", Fe, [
                  n(u, {
                    onClick: t[7] || (t[7] = (i) => g.value = !1)
                  }, {
                    default: r(() => [
                      _(p(o(s)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  n(u, {
                    type: "primary",
                    onClick: t[8] || (t[8] = (i) => X())
                  }, {
                    default: r(() => [
                      _(p(o(s)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: r(() => [
                l("div", Ae, [
                  n(ae, { class: "pl-4 h-[300px] flex-1" }, {
                    default: r(() => [
                      l("div", Je, [
                        (y(!0), b(pe, null, de($, (i, P) => (y(), b("div", {
                          key: P,
                          class: B(["border border-br rounded-[3px] mr-[10px] mb-[10px] px-4 h-[32px] leading-[32px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary", [P == d.value.name ? "border-primary text-primary" : ""]]),
                          onClick: (Xe) => W(P, i)
                        }, p(i.title), 11, ze))), 128))
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const it = /* @__PURE__ */ ge(He, [["__scopeId", "data-v-dfa760ea"]]);
export {
  it as default
};
