import { defineComponent as W, ref as f, reactive as O, watch as X, resolveComponent as m, openBlock as b, createElementBlock as D, createVNode as i, withCtx as r, createElementVNode as s, toDisplayString as p, withDirectives as x, vShow as g, unref as o, createTextVNode as y, createCommentVNode as L, normalizeClass as Y, pushScopeId as Ue, popScopeId as Se } from "vue";
import { M as F, t as l, i as G, bi as Z, s as ee, bj as te, _ as ae } from "./core-shared-9b1e55e9.js";
import { useRouter as se } from "vue-router";
import { ElMessage as I } from "element-plus";
import { b as le } from "./browser-d198bf0a.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const oe = { class: "main-container" }, ne = {
  key: 0,
  class: "flex flex-wrap min-w-[1200px]"
}, ie = { class: "page-item relative w-[340px] mr-[40px] pt-[90px] pb-[20px] bg-[#f7f7f7] bg-no-repeat" }, pe = { class: "absolute top-[54px] left-[50%] translate-x-[-50%] w-[130px] text-[14px] truncate text-center" }, re = { class: "w-[320px] h-[550px] mx-auto" }, de = ["id", "src"], ue = { class: "w-[320px] h-[550px] mx-auto bg-body pt-[20px] px-[20px]" }, ce = { class: "font-bold text-xl mb-[40px]" }, me = { class: "mb-[20px] flex flex-col" }, _e = { class: "mb-[10px]" }, fe = { class: "flex" }, ve = { class: "overflow-hidden w-[320px] h-[550px] mx-auto" }, we = ["src"], xe = { class: "w-[700px]" }, ge = { class: "flex flex-wrap" }, ye = { class: "info-wrap" }, he = { class: "mt-[20px] p-[20px] flex items-center justify-between bg" }, be = { class: "font-bold" }, De = { class: "text-[#999] text-base" }, Ie = { class: "text-center" }, ke = /* @__PURE__ */ W({
  __name: "index",
  setup(Ce) {
    const v = f("DIY_INDEX"), e = O({}), k = se(), w = f(""), C = f(""), n = f({
      name: ""
    }), u = O({
      type: "",
      name: "",
      parent: "",
      page: "",
      title: "",
      action: ""
    }), P = () => {
      Z({
        type: v.value
      }).then((a) => {
        for (const t in a.data)
          e[t] = a.data[t];
        n.value.name = e.use_template.name, n.value.title = e.use_template.title, n.value.url = e.use_template.page, n.value.action = e.use_template.action, n.value.parent = e.use_template.parent, e.use_template.url && (e.loadingIframe = !1, e.loadingDev = !1, e.isDisabledPop = !1, e.difference = 0, w.value = e.domain_url.wap_domain, e.wapUrl = e.domain_url.wap_url, !0 && T());
      });
    };
    P();
    const U = f(!1);
    window.addEventListener("message", (a) => {
      try {
        let t = {
          type: ""
        };
        if (typeof a.data == "string" ? t = JSON.parse(a.data) : typeof a.data == "object" && (t = a.data), t.type && ["appOnLaunch", "appOnReady"].indexOf(t.type) != -1) {
          e.loadingDev = !1, e.loadingIframe = !0;
          let _ = new Date().getTime();
          e.difference = _ - e.timeIframe, e.isDisabledPop = !1, U.value = !0;
        }
      } catch (t) {
        S(), console.log("diy index 后台接受数据错误", t);
      }
    }, !1);
    const N = () => {
      const a = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window["previewIframe_" + v.value] && window["previewIframe_" + v.value].contentWindow.postMessage(a, "*");
    }, S = () => {
      e.loadingDev = !0, e.isDisabledPop = !0, e.loadingIframe = !1;
    }, R = () => {
      if (w.value.trim().length == 0) {
        I({
          type: "warning",
          message: `${l("wapDomainPlaceholder")}`
        });
        return;
      }
      const a = w.value + "/wap";
      ee.set({ key: "wap_domain", data: a }), e.use_template.url && (e.wapUrl = a, T()), setTimeout(() => {
        e.use_template.url && (e.loadingIframe = !0, e.loadingDev = !1, e.isDisabledPop = !1);
      }, 100 * 3);
    }, E = () => {
      window.open("https://www.kancloud.cn/niucloud/niucloud-admin-develop/3213393");
    }, T = () => {
      e.use_template.wapPreview = e.wapUrl + e.use_template.url, e.shareUrl = e.wapUrl + "/", le.toDataURL(e.shareUrl, { errorCorrectionLevel: "L", margin: 0, width: 100 }).then((c) => {
        C.value = c;
      });
      const a = () => {
        e.timeIframe = new Date().getTime(), N();
      };
      a();
      let t = 0, _ = setInterval(() => {
        if (U.value || t >= 50) {
          clearInterval(_);
          return;
        }
        a(), t++;
      }, 200);
      setTimeout(() => {
        e.difference == 0 && S();
      }, 1e3 * 10);
    }, $ = () => {
      const a = {
        back: "/site/diy/index"
      };
      e.use_template.id ? a.id = e.use_template.id : e.use_template.type ? a.name = e.use_template.type : e.use_template.url && (a.url = e.use_template.url);
      const t = k.resolve({
        path: "/decorate/edit",
        query: a
      });
      window.open(t.href);
    }, M = () => {
      let a = e.use_template.page;
      e.use_template.url ? a = e.use_template.url : e.use_template.id && (a += "?id=" + e.use_template.id);
      const t = k.resolve({
        path: "/preview/wap",
        query: {
          page: a
        }
      });
      window.open(t.href);
    }, h = f(!1), j = () => {
      u.type = v.value, u.name = n.value.name, u.page = n.value.url, u.title = n.value.title, u.action = n.value.action, u.parent = n.value.parent, !h.value && (h.value = !0, te({
        ...u
      }).then((a) => {
        h.value = !1, P();
      }));
    }, { copy: q, isSupported: B, copied: V } = F(), H = (a) => {
      B.value || I({
        message: l("notSupportCopy"),
        type: "warning"
      }), q(a);
    };
    return X(V, () => {
      V.value && I({
        message: l("copySuccess"),
        type: "success"
      });
    }), (a, t) => {
      const _ = m("el-input"), c = m("el-button"), J = m("diy-link"), z = m("el-form-item"), A = m("el-form"), K = m("el-image"), Q = m("el-card");
      return b(), D("div", oe, [
        i(Q, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            e.use_template ? (b(), D("div", ne, [
              s("div", ie, [
                s("p", pe, p(e.use_template.title), 1),
                x(s("div", re, [
                  x(s("iframe", {
                    id: "previewIframe_" + v.value,
                    class: "w-[320px] h-[550px] mx-auto",
                    src: e.use_template.wapPreview,
                    frameborder: "0"
                  }, null, 8, de), [
                    [g, e.loadingIframe]
                  ]),
                  x(s("div", ue, [
                    s("div", ce, p(o(l)("developTitle")), 1),
                    s("div", me, [
                      s("text", _e, p(o(l)("wapDomain")), 1),
                      i(_, {
                        modelValue: w.value,
                        "onUpdate:modelValue": t[0] || (t[0] = (d) => w.value = d),
                        modelModifiers: { trim: !0 },
                        placeholder: o(l)("wapDomainPlaceholder"),
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    s("div", fe, [
                      i(c, {
                        type: "primary",
                        onClick: t[1] || (t[1] = (d) => R())
                      }, {
                        default: r(() => [
                          y(p(o(l)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      i(c, {
                        type: "primary",
                        onClick: t[2] || (t[2] = (d) => E()),
                        plain: ""
                      }, {
                        default: r(() => [
                          y(p(o(l)("settingTips")), 1)
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
                x(s("div", ve, [
                  e.use_template.cover ? (b(), D("img", {
                    key: 0,
                    class: "max-w-full",
                    src: o(G)(e.use_template.cover)
                  }, null, 8, we)) : L("", !0)
                ], 512), [
                  [g, !e.use_template.wapPreview]
                ]),
                s("div", {
                  class: Y(["popup-wrap absolute inset-x-0 inset-y-0 select-none", { disabled: e.isDisabledPop }])
                }, null, 2)
              ]),
              s("div", xe, [
                s("div", ge, [
                  i(J, {
                    modelValue: n.value,
                    "onUpdate:modelValue": t[3] || (t[3] = (d) => n.value = d),
                    ignore: ["OTHER_LINK"],
                    onSuccess: j
                  }, {
                    default: r(() => [
                      i(c, { type: "primary" }, {
                        default: r(() => [
                          y(p(o(l)("changePage")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  x(i(c, {
                    type: "primary",
                    onClick: t[4] || (t[4] = (d) => $()),
                    class: "ml-[12px]"
                  }, {
                    default: r(() => [
                      y(p(o(l)("decorate")), 1)
                    ]),
                    _: 1
                  }, 512), [
                    [g, e.use_template.action == "decorate"]
                  ])
                ]),
                s("div", ye, [
                  s("div", he, [
                    s("div", null, [
                      s("div", be, p(o(l)("H5")), 1),
                      i(A, {
                        "label-width": "40px",
                        class: "mt-[5px]"
                      }, {
                        default: r(() => [
                          i(z, {
                            label: o(l)("link"),
                            class: "mb-[5px]"
                          }, {
                            default: r(() => [
                              i(_, {
                                readonly: "",
                                value: e.shareUrl,
                                class: "!w-[390px]"
                              }, {
                                append: r(() => [
                                  i(c, {
                                    onClick: t[5] || (t[5] = (d) => H(e.shareUrl)),
                                    class: "bg-primary copy"
                                  }, {
                                    default: r(() => [
                                      y(p(o(l)("copy")), 1)
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
                      s("div", De, p(o(l)("scanQRCodeOnRight")), 1)
                    ]),
                    s("div", Ie, [
                      i(K, {
                        class: "w-[100px] h-[100px] mb-[5px]",
                        src: C.value
                      }, null, 8, ["src"]),
                      s("div", {
                        onClick: t[6] || (t[6] = (d) => M()),
                        class: "text-primary text-base cursor-pointer"
                      }, p(o(l)("preview")), 1)
                    ])
                  ])
                ])
              ])
            ])) : L("", !0)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Me = /* @__PURE__ */ ae(ke, [["__scopeId", "data-v-51aafd86"]]);
export {
  Me as default
};
