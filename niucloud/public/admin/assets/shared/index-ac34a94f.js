import { defineComponent as G, ref as _, reactive as N, onUnmounted as Z, watch as ee, resolveComponent as m, openBlock as C, createElementBlock as P, createVNode as i, withCtx as r, createElementVNode as l, toDisplayString as p, withDirectives as x, vShow as g, unref as o, createTextVNode as y, createCommentVNode as R, normalizeClass as te, pushScopeId as Oe, popScopeId as Ne, nextTick as ae } from "vue";
import { M as le, t as s, i as se, bj as oe, s as ne, bk as ie, _ as pe } from "./core-shared-0b2facad.js";
import { useRouter as re } from "vue-router";
import { ElMessage as T } from "element-plus";
import { b as de } from "./browser-04e4c77a.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ue = { class: "main-container" }, ce = {
  key: 0,
  class: "flex flex-wrap min-w-[1200px]"
}, me = { class: "page-item relative w-[340px] mr-[40px] pt-[90px] pb-[20px] bg-[#f7f7f7] bg-no-repeat" }, _e = { class: "absolute top-[54px] left-[50%] translate-x-[-50%] w-[130px] text-[14px] truncate text-center" }, fe = { class: "w-[320px] h-[550px] mx-auto" }, ve = ["id", "src"], we = { class: "w-[320px] h-[550px] mx-auto bg-body pt-[20px] px-[20px]" }, xe = { class: "font-bold text-xl mb-[40px]" }, ge = { class: "mb-[20px] flex flex-col" }, ye = { class: "mb-[10px]" }, he = { class: "flex" }, be = { class: "overflow-hidden w-[320px] h-[550px] mx-auto" }, De = ["src"], Ie = { class: "w-[700px]" }, ke = { class: "flex flex-wrap" }, Ce = { class: "info-wrap" }, Pe = { class: "mt-[20px] p-[20px] flex items-center justify-between bg" }, Te = { class: "font-bold" }, Ue = { class: "text-[#999] text-base" }, Se = { class: "text-center" }, Le = /* @__PURE__ */ G({
  __name: "index",
  setup(Ve) {
    const f = _("DIY_INDEX"), e = N({}), U = re(), v = _(""), S = _(""), n = _({
      name: ""
    }), u = N({
      type: "",
      name: "",
      parent: "",
      page: "",
      title: "",
      action: ""
    }), L = () => {
      oe({
        type: f.value
      }).then((a) => {
        for (const t in a.data)
          e[t] = a.data[t];
        n.value.name = e.use_template.name, n.value.title = e.use_template.title, n.value.url = e.use_template.page, n.value.action = e.use_template.action, n.value.parent = e.use_template.parent, e.use_template.url && (e.loadingIframe = !1, e.loadingDev = !1, e.isDisabledPop = !1, e.difference = 0, h.value = !1, v.value = e.domain_url.wap_domain, e.wapUrl = e.domain_url.wap_url, !0 && E());
      });
    };
    L();
    const h = _(!1);
    let c = null, b = null;
    const I = () => {
      c && (clearInterval(c), c = null), b && (clearTimeout(b), b = null);
    }, V = (a) => {
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
          let D = new Date().getTime();
          e.difference = D - e.timeIframe, e.isDisabledPop = !1, h.value = !0, I();
        }
      } catch (t) {
        console.log("diy index 后台接受数据错误", t);
      }
    };
    window.addEventListener("message", V, !1), Z(() => {
      window.removeEventListener("message", V, !1), I();
    });
    const M = () => {
      const a = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window["previewIframe_" + f.value] && window["previewIframe_" + f.value].contentWindow.postMessage(a, "*");
    }, $ = () => {
      e.loadingDev = !0, e.isDisabledPop = !0, e.loadingIframe = !1;
    }, j = () => {
      if (v.value.trim().length == 0) {
        T({
          type: "warning",
          message: `${s("wapDomainPlaceholder")}`
        });
        return;
      }
      const a = v.value + "/wap";
      ne.set({ key: "wap_domain", data: a }), e.use_template.url && (e.wapUrl = a, E()), setTimeout(() => {
        e.use_template.url && (e.loadingIframe = !0, e.loadingDev = !1, e.isDisabledPop = !1);
      }, 100 * 3);
    }, q = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/configLocalDevEnv.html");
    }, E = () => {
      e.use_template.wapPreview = e.wapUrl + e.use_template.url, e.shareUrl = e.wapUrl + "/", de.toDataURL(e.shareUrl, { errorCorrectionLevel: "L", margin: 0, width: 100 }).then((t) => {
        S.value = t;
      });
      const a = () => {
        e.timeIframe = new Date().getTime(), M();
      };
      I(), ae(() => {
        a();
        let t = 0;
        c = setInterval(() => {
          if (h.value || t >= 50) {
            c && (clearInterval(c), c = null);
            return;
          }
          a(), t++;
        }, 200), b = setTimeout(() => {
          e.difference == 0 && !h.value && $();
        }, 1e3 * 10);
      });
    }, B = () => {
      const a = {
        back: "/site/diy/index"
      };
      e.use_template.id ? a.id = e.use_template.id : e.use_template.type ? a.name = e.use_template.type : e.use_template.url && (a.url = e.use_template.url);
      const t = U.resolve({
        path: "/decorate/edit",
        query: a
      });
      window.open(t.href);
    }, H = () => {
      let a = e.use_template.page;
      e.use_template.url ? a = e.use_template.url : e.use_template.id && (a += "?id=" + e.use_template.id);
      const t = U.resolve({
        path: "/preview/wap",
        query: {
          page: a
        }
      });
      window.open(t.href);
    }, k = _(!1), J = () => {
      u.type = f.value, u.name = n.value.name, u.page = n.value.url, u.title = n.value.title, u.action = n.value.action, u.parent = n.value.parent, !k.value && (k.value = !0, ie({
        ...u
      }).then((a) => {
        k.value = !1, L();
      }));
    }, { copy: z, isSupported: A, copied: O } = le(), K = (a) => {
      A.value || T({
        message: s("notSupportCopy"),
        type: "warning"
      }), z(a);
    };
    return ee(O, () => {
      O.value && T({
        message: s("copySuccess"),
        type: "success"
      });
    }), (a, t) => {
      const D = m("el-input"), w = m("el-button"), Q = m("diy-link"), W = m("el-form-item"), X = m("el-form"), Y = m("el-image"), F = m("el-card");
      return C(), P("div", ue, [
        i(F, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            e.use_template ? (C(), P("div", ce, [
              l("div", me, [
                l("p", _e, p(e.use_template.title), 1),
                x(l("div", fe, [
                  x(l("iframe", {
                    id: "previewIframe_" + f.value,
                    class: "w-[320px] h-[550px] mx-auto",
                    src: e.use_template.wapPreview,
                    frameborder: "0"
                  }, null, 8, ve), [
                    [g, e.loadingIframe]
                  ]),
                  x(l("div", we, [
                    l("div", xe, p(o(s)("developTitle")), 1),
                    l("div", ge, [
                      l("text", ye, p(o(s)("wapDomain")), 1),
                      i(D, {
                        modelValue: v.value,
                        "onUpdate:modelValue": t[0] || (t[0] = (d) => v.value = d),
                        modelModifiers: { trim: !0 },
                        placeholder: o(s)("wapDomainPlaceholder"),
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    l("div", he, [
                      i(w, {
                        type: "primary",
                        onClick: t[1] || (t[1] = (d) => j())
                      }, {
                        default: r(() => [
                          y(p(o(s)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      i(w, {
                        type: "primary",
                        onClick: t[2] || (t[2] = (d) => q()),
                        plain: ""
                      }, {
                        default: r(() => [
                          y(p(o(s)("settingTips")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ], 512), [
                    [g, e.loadingDev]
                  ])
                ], 512), [
                  [g, e.use_template.url]
                ]),
                x(l("div", be, [
                  e.use_template.cover ? (C(), P("img", {
                    key: 0,
                    class: "max-w-full",
                    src: o(se)(e.use_template.cover)
                  }, null, 8, De)) : R("", !0)
                ], 512), [
                  [g, !e.use_template.wapPreview]
                ]),
                l("div", {
                  class: te(["popup-wrap absolute inset-x-0 inset-y-0 select-none", { disabled: e.isDisabledPop }])
                }, null, 2)
              ]),
              l("div", Ie, [
                l("div", ke, [
                  i(Q, {
                    modelValue: n.value,
                    "onUpdate:modelValue": t[3] || (t[3] = (d) => n.value = d),
                    ignore: ["OTHER_LINK"],
                    onSuccess: J
                  }, {
                    default: r(() => [
                      i(w, { type: "primary" }, {
                        default: r(() => [
                          y(p(o(s)("changePage")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  x(i(w, {
                    type: "primary",
                    onClick: t[4] || (t[4] = (d) => B()),
                    class: "ml-[12px]"
                  }, {
                    default: r(() => [
                      y(p(o(s)("decorate")), 1)
                    ]),
                    _: 1
                  }, 512), [
                    [g, e.use_template.action == "decorate"]
                  ])
                ]),
                l("div", Ce, [
                  l("div", Pe, [
                    l("div", null, [
                      l("div", Te, p(o(s)("H5")), 1),
                      i(X, {
                        "label-width": "40px",
                        class: "mt-[5px]"
                      }, {
                        default: r(() => [
                          i(W, {
                            label: o(s)("link"),
                            class: "mb-[5px]"
                          }, {
                            default: r(() => [
                              i(D, {
                                readonly: "",
                                value: e.shareUrl,
                                class: "!w-[390px]"
                              }, {
                                append: r(() => [
                                  i(w, {
                                    onClick: t[5] || (t[5] = (d) => K(e.shareUrl)),
                                    class: "bg-primary copy"
                                  }, {
                                    default: r(() => [
                                      y(p(o(s)("copy")), 1)
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
                      l("div", Ue, p(o(s)("scanQRCodeOnRight")), 1)
                    ]),
                    l("div", Se, [
                      i(Y, {
                        class: "w-[100px] h-[100px] mb-[5px]",
                        src: S.value
                      }, null, 8, ["src"]),
                      l("div", {
                        onClick: t[6] || (t[6] = (d) => H()),
                        class: "text-primary text-base cursor-pointer"
                      }, p(o(s)("preview")), 1)
                    ])
                  ])
                ])
              ])
            ])) : R("", !0)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const ze = /* @__PURE__ */ pe(Le, [["__scopeId", "data-v-8815bd4e"]]);
export {
  ze as default
};
