import { defineComponent as U, ref as L, computed as A, reactive as T, resolveComponent as f, resolveDirective as F, openBlock as c, createElementBlock as M, withDirectives as I, createBlock as m, withCtx as r, createVNode as a, createElementVNode as h, toDisplayString as n, unref as e, createTextVNode as p, createCommentVNode as w } from "vue";
import { h as N, t as l, eg as B, eh as E } from "./core-shared-c6ad4e77.js";
import { useRoute as R } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const H = { class: "main-container" }, $ = { class: "text-[16px] text-[#1D1F3A] font-bold mb-4" }, j = { class: "flex items-center text-[14px] font-bold text-[#1D1F3A] mb-[15px]" }, z = /* @__PURE__ */ h("span", { class: "w-[4px] h-[14px] bg-[#1D1F3A] inline-block mr-[8px]" }, null, -1), G = { class: "w-[500px]" }, J = { class: "text-[12px] text-[#a9a9a9] leading-[22px]" }, K = { class: "flex items-center text-[14px] font-bold text-[#1D1F3A] mt-[20px] mb-[15px]" }, O = /* @__PURE__ */ h("span", { class: "w-[4px] h-[14px] bg-[#1D1F3A] inline-block mr-[8px]" }, null, -1), Q = { class: "w-[500px]" }, X = { class: "text-[12px] text-[#a9a9a9] leading-[22px]" }, Y = { class: "fixed-footer-wrap" }, Z = { class: "fixed-footer" }, se = /* @__PURE__ */ U({
  __name: "channel",
  setup(ee) {
    const q = R(), P = N(), D = q.meta.title, x = L(!0), g = A(() => {
      var s, k;
      const d = ((s = P.siteInfo) == null ? void 0 : s.apps) || [], o = ((k = P.siteInfo) == null ? void 0 : k.site_addons) || [];
      return [...d, ...o].some((u) => u.key == "shop_customer");
    }), t = T({
      h5: {
        type: "none",
        work_weixin_link: "",
        third_link: "",
        phone: ""
      },
      weapp: {
        type: "none",
        corp_id: "",
        work_weixin_link: "",
        third_link: "",
        phone: ""
      }
    });
    (async () => {
      var o, s, k, u, _, b, v, y, V, S, i;
      const d = await (await B()).data;
      t.h5 = {
        // 插件已卸载时历史配置的 self 无对应选项，回退为不启用
        type: !g.value && ((o = d.h5) == null ? void 0 : o.type) == "self" ? "none" : ((s = d.h5) == null ? void 0 : s.type) || "none",
        work_weixin_link: ((k = d.h5) == null ? void 0 : k.work_weixin_link) || "",
        third_link: ((u = d.h5) == null ? void 0 : u.third_link) || "",
        phone: ((_ = d.h5) == null ? void 0 : _.phone) || ""
      }, t.weapp = {
        // 插件已卸载时历史配置的 self 无对应选项，回退为不启用
        type: !g.value && ((b = d.weapp) == null ? void 0 : b.type) == "self" ? "none" : ((v = d.weapp) == null ? void 0 : v.type) || "none",
        corp_id: ((y = d.weapp) == null ? void 0 : y.corp_id) || "",
        work_weixin_link: ((V = d.weapp) == null ? void 0 : V.work_weixin_link) || "",
        third_link: ((S = d.weapp) == null ? void 0 : S.third_link) || "",
        phone: ((i = d.weapp) == null ? void 0 : i.phone) || ""
      }, x.value = !1;
    })();
    const W = L(), C = async (d) => {
      x.value || !d || await d.validate(async (o) => {
        o && (x.value = !0, E(t).then(() => {
          x.value = !1;
        }).catch(() => {
          x.value = !1;
        }));
      });
    };
    return (d, o) => {
      const s = f("el-radio"), k = f("el-radio-group"), u = f("el-form-item"), _ = f("el-input"), b = f("el-link"), v = f("el-card"), y = f("el-form"), V = f("el-button"), S = F("loading");
      return c(), M("div", H, [
        I((c(), m(y, {
          class: "page-form",
          model: t,
          "label-width": "150px",
          ref_key: "formRef",
          ref: W
        }, {
          default: r(() => [
            a(v, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: r(() => [
                h("h3", $, n(e(D)), 1),
                h("h4", j, [
                  z,
                  p(" " + n(e(l)("h5Wechat")), 1)
                ]),
                a(u, {
                  label: e(l)("serviceType")
                }, {
                  default: r(() => [
                    a(k, {
                      modelValue: t.h5.type,
                      "onUpdate:modelValue": o[0] || (o[0] = (i) => t.h5.type = i)
                    }, {
                      default: r(() => [
                        a(s, { label: "none" }, {
                          default: r(() => [
                            p(n(e(l)("notEnabled")), 1)
                          ]),
                          _: 1
                        }),
                        e(g) ? (c(), m(s, {
                          key: 0,
                          label: "self"
                        }, {
                          default: r(() => [
                            p(n(e(l)("selfService")), 1)
                          ]),
                          _: 1
                        })) : w("", !0),
                        a(s, { label: "work_weixin" }, {
                          default: r(() => [
                            p(n(e(l)("workWeixinService")), 1)
                          ]),
                          _: 1
                        }),
                        a(s, { label: "third" }, {
                          default: r(() => [
                            p(n(e(l)("thirdService")), 1)
                          ]),
                          _: 1
                        }),
                        a(s, { label: "phone" }, {
                          default: r(() => [
                            p(n(e(l)("phoneContact")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t.h5.type == "work_weixin" ? (c(), m(u, {
                  key: 0,
                  label: e(l)("workWeixinLink"),
                  prop: "h5.work_weixin_link",
                  rules: [{ required: !0, message: e(l)("workWeixinLinkPlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    h("div", G, [
                      a(_, {
                        modelValue: t.h5.work_weixin_link,
                        "onUpdate:modelValue": o[1] || (o[1] = (i) => t.h5.work_weixin_link = i),
                        modelModifiers: { trim: !0 },
                        placeholder: e(l)("workWeixinLinkPlaceholder"),
                        clearable: "",
                        maxlength: "500"
                      }, null, 8, ["modelValue", "placeholder"]),
                      h("p", J, [
                        p(n(e(l)("workWeixinH5Tips")) + " ", 1),
                        a(b, {
                          type: "primary",
                          underline: !1,
                          href: "https://developer.work.weixin.qq.com/document/path/94638",
                          target: "_blank"
                        }, {
                          default: r(() => [
                            p(n(e(l)("inWechatPageAccess")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0),
                t.h5.type == "third" ? (c(), m(u, {
                  key: 1,
                  label: e(l)("thirdServiceLink"),
                  prop: "h5.third_link",
                  rules: [{ required: !0, message: e(l)("thirdServiceLinkPlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    a(_, {
                      modelValue: t.h5.third_link,
                      "onUpdate:modelValue": o[2] || (o[2] = (i) => t.h5.third_link = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(l)("thirdServiceLinkPlaceholder"),
                      class: "!w-[500px]",
                      clearable: "",
                      maxlength: "500"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0),
                t.h5.type == "phone" ? (c(), m(u, {
                  key: 2,
                  label: e(l)("contactsTel"),
                  prop: "h5.phone",
                  rules: [{ required: !0, message: e(l)("phonePlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    a(_, {
                      modelValue: t.h5.phone,
                      "onUpdate:modelValue": o[3] || (o[3] = (i) => t.h5.phone = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(l)("phonePlaceholder"),
                      class: "!w-[500px]",
                      clearable: "",
                      maxlength: "20"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0),
                h("h4", K, [
                  O,
                  p(" " + n(e(l)("weappTerminal")), 1)
                ]),
                a(u, {
                  label: e(l)("serviceType")
                }, {
                  default: r(() => [
                    a(k, {
                      modelValue: t.weapp.type,
                      "onUpdate:modelValue": o[4] || (o[4] = (i) => t.weapp.type = i)
                    }, {
                      default: r(() => [
                        a(s, { label: "none" }, {
                          default: r(() => [
                            p(n(e(l)("notEnabled")), 1)
                          ]),
                          _: 1
                        }),
                        e(g) ? (c(), m(s, {
                          key: 0,
                          label: "self"
                        }, {
                          default: r(() => [
                            p(n(e(l)("selfService")), 1)
                          ]),
                          _: 1
                        })) : w("", !0),
                        a(s, { label: "weapp" }, {
                          default: r(() => [
                            p(n(e(l)("weappService")), 1)
                          ]),
                          _: 1
                        }),
                        a(s, { label: "work_weixin" }, {
                          default: r(() => [
                            p(n(e(l)("workWeixinService")), 1)
                          ]),
                          _: 1
                        }),
                        a(s, { label: "third" }, {
                          default: r(() => [
                            p(n(e(l)("thirdService")), 1)
                          ]),
                          _: 1
                        }),
                        a(s, { label: "phone" }, {
                          default: r(() => [
                            p(n(e(l)("phoneContact")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t.weapp.type == "work_weixin" ? (c(), m(u, {
                  key: 3,
                  label: e(l)("corpId"),
                  prop: "weapp.corp_id",
                  rules: [{ required: !0, message: e(l)("corpIdPlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    a(_, {
                      modelValue: t.weapp.corp_id,
                      "onUpdate:modelValue": o[5] || (o[5] = (i) => t.weapp.corp_id = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(l)("corpIdPlaceholder"),
                      class: "!w-[500px]",
                      clearable: "",
                      maxlength: "100"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0),
                t.weapp.type == "work_weixin" ? (c(), m(u, {
                  key: 4,
                  label: e(l)("workWeixinLink"),
                  prop: "weapp.work_weixin_link",
                  rules: [{ required: !0, message: e(l)("workWeixinLinkPlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    h("div", Q, [
                      a(_, {
                        modelValue: t.weapp.work_weixin_link,
                        "onUpdate:modelValue": o[6] || (o[6] = (i) => t.weapp.work_weixin_link = i),
                        modelModifiers: { trim: !0 },
                        placeholder: e(l)("workWeixinLinkPlaceholder"),
                        clearable: "",
                        maxlength: "500"
                      }, null, 8, ["modelValue", "placeholder"]),
                      h("p", X, [
                        p(n(e(l)("workWeixinWeappTips")) + " ", 1),
                        a(b, {
                          type: "primary",
                          underline: !1,
                          href: "https://developer.work.weixin.qq.com/document/path/94739",
                          target: "_blank"
                        }, {
                          default: r(() => [
                            p(n(e(l)("inWeappAccess")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0),
                t.weapp.type == "third" ? (c(), m(u, {
                  key: 5,
                  label: e(l)("thirdServiceLink"),
                  prop: "weapp.third_link",
                  rules: [{ required: !0, message: e(l)("thirdServiceLinkPlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    a(_, {
                      modelValue: t.weapp.third_link,
                      "onUpdate:modelValue": o[7] || (o[7] = (i) => t.weapp.third_link = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(l)("thirdServiceLinkPlaceholder"),
                      class: "!w-[500px]",
                      clearable: "",
                      maxlength: "500"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0),
                t.weapp.type == "phone" ? (c(), m(u, {
                  key: 6,
                  label: e(l)("contactsTel"),
                  prop: "weapp.phone",
                  rules: [{ required: !0, message: e(l)("phonePlaceholder"), trigger: "blur" }]
                }, {
                  default: r(() => [
                    a(_, {
                      modelValue: t.weapp.phone,
                      "onUpdate:modelValue": o[8] || (o[8] = (i) => t.weapp.phone = i),
                      modelModifiers: { trim: !0 },
                      placeholder: e(l)("phonePlaceholder"),
                      class: "!w-[500px]",
                      clearable: "",
                      maxlength: "20"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label", "rules"])) : w("", !0)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])), [
          [S, x.value]
        ]),
        h("div", Y, [
          h("div", Z, [
            a(V, {
              type: "primary",
              loading: x.value,
              onClick: o[9] || (o[9] = (i) => C(W.value))
            }, {
              default: r(() => [
                p(n(e(l)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
export {
  se as default
};
