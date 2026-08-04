import { defineComponent as te, computed as ae, ref as u, reactive as C, watch as le, resolveComponent as m, openBlock as y, createElementBlock as b, createVNode as n, withCtx as p, createElementVNode as l, toDisplayString as r, withDirectives as h, vShow as D, unref as s, createTextVNode as _, createCommentVNode as R, normalizeClass as M, Fragment as oe, renderList as se, pushScopeId as Fe, popScopeId as He } from "vue";
import { u as ne, bm as ie, M as pe, t as o, i as re, bi as de, s as ce, bj as me, _ as ue } from "./core-shared-5b3bfa35.js";
import { useRouter as _e } from "vue-router";
import { ElMessage as U } from "element-plus";
import { b as fe } from "./browser-72c8d31f.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ve = { class: "main-container" }, we = {
  key: 0,
  class: "flex flex-wrap min-w-[1200px]"
}, xe = { class: "page-item relative w-[340px] mr-[40px] pt-[90px] pb-[20px] bg-[#f7f7f7] bg-no-repeat" }, ge = { class: "absolute top-[54px] left-[50%] translate-x-[-50%] w-[130px] text-[14px] truncate text-center" }, ye = { class: "w-[320px] h-[550px] mx-auto" }, be = ["id", "src"], he = { class: "w-[320px] h-[550px] mx-auto bg-body pt-[20px] px-[20px]" }, De = { class: "font-bold text-xl mb-[40px]" }, ke = { class: "mb-[20px] flex flex-col" }, Ie = { class: "mb-[10px]" }, Ce = { class: "flex" }, Ue = { class: "overflow-hidden w-[320px] h-[550px] mx-auto" }, Pe = ["src"], Se = { class: "w-[700px]" }, Te = { class: "flex flex-wrap" }, Ve = { class: "info-wrap" }, $e = { class: "mt-[20px] p-[20px] flex items-center justify-between bg" }, Le = { class: "font-bold" }, Ee = { class: "text-[#999] text-base" }, Oe = { class: "text-center" }, Re = { class: "flex items-start" }, Me = { class: "flex flex-wrap" }, Ne = ["onClick"], je = { class: "dialog-footer" }, Be = /* @__PURE__ */ te({
  __name: "member",
  setup(qe) {
    const N = ne(), Ae = ae(() => N.siteInfo.apps), w = u("DIY_MEMBER_INDEX"), e = C({}), P = _e(), x = u(""), S = u(""), d = u({
      name: ""
    }), f = C({
      type: "",
      name: "",
      page: "",
      title: "",
      action: ""
    }), g = u(!1), T = C({});
    ie({ type: "member_index" }).then((a) => {
      for (const t in a.data)
        T[t] = a.data[t];
    });
    const V = () => {
      de({
        type: w.value
      }).then((a) => {
        for (const t in a.data)
          e[t] = a.data[t];
        d.value.name = e.use_template.name, d.value.title = e.use_template.title, d.value.page = e.use_template.page, d.value.action = e.use_template.action, e.use_template.url && (e.loadingIframe = !1, e.loadingDev = !1, e.isDisabledPop = !1, e.difference = 0, x.value = e.domain_url.wap_domain, e.wapUrl = e.domain_url.wap_url, !0 && E());
      });
    };
    V();
    const $ = u(!1);
    window.addEventListener("message", (a) => {
      try {
        let t = {
          type: ""
        };
        if (typeof a.data == "string" ? t = JSON.parse(a.data) : typeof a.data == "object" && (t = a.data), t.type && ["appOnLaunch", "appOnReady"].indexOf(t.type) != -1) {
          e.loadingDev = !1, e.loadingIframe = !0;
          let v = new Date().getTime();
          e.difference = v - e.timeIframe, e.isDisabledPop = !1, $.value = !0;
        }
      } catch (t) {
        L(), console.log("diy member 后台接受数据错误", t);
      }
    }, !1);
    const j = () => {
      const a = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window["previewIframe_" + w.value] && window["previewIframe_" + w.value].contentWindow.postMessage(a, "*");
    }, L = () => {
      e.loadingDev = !0, e.isDisabledPop = !0, e.loadingIframe = !1;
    }, B = () => {
      if (x.value.trim().length == 0) {
        U({
          type: "warning",
          message: `${o("wapDomainPlaceholder")}`
        });
        return;
      }
      const a = x.value + "/wap";
      ce.set({ key: "wap_domain", data: a }), e.use_template.url && (e.wapUrl = a, E()), setTimeout(() => {
        e.use_template.url && (e.loadingIframe = !0, e.loadingDev = !1, e.isDisabledPop = !1);
      }, 100 * 3);
    }, q = () => {
      window.open("https://www.kancloud.cn/niucloud/niucloud-admin-develop/3213393");
    }, E = () => {
      e.use_template.wapPreview = e.wapUrl + e.use_template.url, e.shareUrl = e.wapUrl + e.page, fe.toDataURL(e.shareUrl, { errorCorrectionLevel: "L", margin: 0, width: 100 }).then((c) => {
        S.value = c;
      });
      const a = () => {
        e.timeIframe = new Date().getTime(), j();
      };
      a();
      let t = 0, v = setInterval(() => {
        if ($.value || t >= 50) {
          clearInterval(v);
          return;
        }
        a(), t++;
      }, 200);
      setTimeout(() => {
        e.difference == 0 && L();
      }, 1e3 * 10);
    }, A = () => {
      const a = {
        back: "/site/diy/member"
      };
      e.use_template.id ? a.id = e.use_template.id : e.use_template.type ? a.name = e.use_template.type : e.use_template.url && (a.url = e.use_template.url);
      const t = P.resolve({
        path: "/decorate/edit",
        query: a
      });
      window.open(t.href);
    }, J = () => {
      let a = e.use_template.page;
      e.use_template.url ? a = e.use_template.url : e.use_template.id && (a += "?id=" + e.use_template.id);
      const t = P.resolve({
        path: "/preview/wap",
        query: {
          page: a
        }
      });
      window.open(t.href);
    }, z = (a, t) => {
      d.value.name = a, d.value.page = t.page, d.value.title = t.title, d.value.action = t.action;
    }, k = u(!1), F = () => {
      f.type = w.value, f.name = d.value.name, f.page = d.value.page, f.title = d.value.title, f.action = d.value.action, !k.value && (k.value = !0, me({
        ...f
      }).then((a) => {
        k.value = !1, g.value = !1, V();
      }));
    }, { copy: H, isSupported: Q, copied: O } = pe(), W = (a) => {
      Q.value || U({
        message: o("notSupportCopy"),
        type: "warning"
      }), H(a);
    };
    return le(O, () => {
      O.value && U({
        message: o("copySuccess"),
        type: "success"
      });
    }), (a, t) => {
      const v = m("el-input"), c = m("el-button"), X = m("el-form-item"), Y = m("el-form"), G = m("el-image"), K = m("el-scrollbar"), Z = m("el-dialog"), ee = m("el-card");
      return y(), b("div", ve, [
        n(ee, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: p(() => [
            e.use_template ? (y(), b("div", we, [
              l("div", xe, [
                l("p", ge, r(e.use_template.title), 1),
                h(l("div", ye, [
                  h(l("iframe", {
                    id: "previewIframe_" + w.value,
                    class: "w-[320px] h-[550px] mx-auto",
                    src: e.use_template.wapPreview,
                    frameborder: "0"
                  }, null, 8, be), [
                    [D, e.loadingIframe]
                  ]),
                  h(l("div", he, [
                    l("div", De, r(s(o)("developTitle")), 1),
                    l("div", ke, [
                      l("text", Ie, r(s(o)("wapDomain")), 1),
                      n(v, {
                        modelValue: x.value,
                        "onUpdate:modelValue": t[0] || (t[0] = (i) => x.value = i),
                        modelModifiers: { trim: !0 },
                        placeholder: s(o)("wapDomainPlaceholder"),
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    l("div", Ce, [
                      n(c, {
                        type: "primary",
                        onClick: t[1] || (t[1] = (i) => B())
                      }, {
                        default: p(() => [
                          _(r(s(o)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      n(c, {
                        type: "primary",
                        onClick: t[2] || (t[2] = (i) => q()),
                        plain: ""
                      }, {
                        default: p(() => [
                          _(r(s(o)("settingTips")), 1)
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
                h(l("div", Ue, [
                  e.use_template.cover ? (y(), b("img", {
                    key: 0,
                    class: "max-w-full",
                    src: s(re)(e.use_template.cover)
                  }, null, 8, Pe)) : R("", !0)
                ], 512), [
                  [D, !e.use_template.wapPreview]
                ]),
                l("div", {
                  class: M(["popup-wrap absolute inset-x-0 inset-y-0 select-none", { disabled: e.isDisabledPop }])
                }, null, 2)
              ]),
              l("div", Se, [
                l("div", Te, [
                  n(c, {
                    type: "primary",
                    onClick: t[3] || (t[3] = (i) => g.value = !0)
                  }, {
                    default: p(() => [
                      _(r(s(o)("changePage")), 1)
                    ]),
                    _: 1
                  }),
                  h(n(c, {
                    type: "primary",
                    onClick: t[4] || (t[4] = (i) => A()),
                    class: "ml-[12px]"
                  }, {
                    default: p(() => [
                      _(r(s(o)("decorate")), 1)
                    ]),
                    _: 1
                  }, 512), [
                    [D, e.use_template.action == "decorate"]
                  ])
                ]),
                l("div", Ve, [
                  l("div", $e, [
                    l("div", null, [
                      l("div", Le, r(s(o)("H5")), 1),
                      n(Y, {
                        "label-width": "40px",
                        class: "mt-[5px]"
                      }, {
                        default: p(() => [
                          n(X, {
                            label: s(o)("link"),
                            class: "mb-[5px]"
                          }, {
                            default: p(() => [
                              n(v, {
                                readonly: "",
                                value: e.shareUrl,
                                class: "!w-[400px]"
                              }, {
                                append: p(() => [
                                  n(c, {
                                    onClick: t[5] || (t[5] = (i) => W(e.shareUrl)),
                                    class: "bg-primary copy"
                                  }, {
                                    default: p(() => [
                                      _(r(s(o)("copy")), 1)
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
                      l("div", Ee, r(s(o)("scanQRCodeOnRight")), 1)
                    ]),
                    l("div", Oe, [
                      n(G, {
                        class: "w-[100px] h-[100px] mb-[5px]",
                        src: S.value
                      }, null, 8, ["src"]),
                      l("div", {
                        onClick: t[6] || (t[6] = (i) => J()),
                        class: "text-primary text-base cursor-pointer"
                      }, r(s(o)("preview")), 1)
                    ])
                  ])
                ])
              ])
            ])) : R("", !0),
            n(Z, {
              modelValue: g.value,
              "onUpdate:modelValue": t[9] || (t[9] = (i) => g.value = i),
              title: s(o)("pageSelectTips"),
              width: "400px",
              "close-on-press-escape": !0,
              "destroy-on-close": !0,
              "close-on-click-modal": !1
            }, {
              footer: p(() => [
                l("span", je, [
                  n(c, {
                    onClick: t[7] || (t[7] = (i) => g.value = !1)
                  }, {
                    default: p(() => [
                      _(r(s(o)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  n(c, {
                    type: "primary",
                    onClick: t[8] || (t[8] = (i) => F())
                  }, {
                    default: p(() => [
                      _(r(s(o)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: p(() => [
                l("div", Re, [
                  n(K, { class: "pl-4 h-[300px] flex-1" }, {
                    default: p(() => [
                      l("div", Me, [
                        (y(!0), b(oe, null, se(T, (i, I) => (y(), b("div", {
                          key: I,
                          class: M(["border border-br rounded-[3px] mr-[10px] mb-[10px] px-4 h-[32px] leading-[32px] cursor-pointer hover:bg-primary-light-9 px-[10px] hover:text-primary", [I == d.value.name ? "border-primary text-primary" : ""]]),
                          onClick: (Je) => z(I, i)
                        }, r(i.title), 11, Ne))), 128))
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
const tt = /* @__PURE__ */ ue(Be, [["__scopeId", "data-v-82ccbf41"]]);
export {
  tt as default
};
