import { defineComponent as G, ref as v, reactive as D, resolveComponent as d, resolveDirective as H, openBlock as s, createElementBlock as m, createVNode as o, withCtx as a, unref as n, withDirectives as J, createBlock as W, createElementVNode as f, toDisplayString as i, Fragment as X, renderList as Y, createCommentVNode as h, createTextVNode as g } from "vue";
import { t, aP as Z, aQ as ee, aR as le } from "./core-shared-e1759ce4.js";
import { ArrowLeft as oe } from "@element-plus/icons-vue";
import { useRoute as te, useRouter as ae } from "vue-router";
import ne from "./reply-form-ca616310.js";
import re from "./news-card-8b1471ef.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./upload-media-9ed5dabe.js";
import "./select-wechat-media-1d0e379f.js";
const de = { class: "main-container" }, pe = { class: "form-tip" }, se = { class: "flex flex-col" }, ie = { class: "flex items-center" }, ue = {
  key: 0,
  class: "w-[300px] bg-page p-[10px] mr-[10px] mb-[10px] rounded leading-none"
}, me = {
  key: 1,
  class: "w-[300px] bg-page p-[10px] mr-[10px] mb-[10px] rounded"
}, ce = {
  key: 2,
  class: "w-[300px] bg-page p-[10px] mr-[10px] mb-[10px] rounded"
}, _e = {
  key: 3,
  class: "w-[300px] bg-page p-[10px] mr-[10px] mb-[10px] rounded"
}, fe = {
  key: 4,
  class: "w-[300px] bg-page p-[10px] mr-[10px] mb-[10px] rounded"
}, ge = { class: "mt-[10px]" }, ye = { class: "fixed-footer-wrap" }, ve = { class: "fixed-footer" }, he = { class: "dialog-footer" }, qe = /* @__PURE__ */ G({
  __name: "keyword_reply_edit",
  setup(xe) {
    const V = te(), P = ae(), $ = V.meta.title, q = () => {
      P.push("/channel/wechat/reply");
    }, y = v(!1), r = D({
      id: 0,
      name: "",
      keyword: "",
      content: [],
      matching_type: "full",
      reply_method: "all"
    }), x = v({}), k = v(null), B = () => {
      var p;
      (p = k.value) == null || p.verify().then((e) => {
        e && (r.content.push(x.value), x.value = {}, y.value = !1);
      });
    }, E = (p) => {
      r.content.splice(p, 1);
    }, R = v(), K = D({
      name: [
        { required: !0, message: t("ruleNamePlaceholder"), trigger: "blur" }
      ],
      keyword: [
        { required: !0, message: t("keywordPlaceholder"), trigger: "blur" }
      ],
      content: [
        {
          validator: (p, e, c) => {
            r.content.length || c(new Error(t("contentPlaceholder"))), c();
          },
          trigger: "blur"
        }
      ]
    }), u = v(!1);
    V.query.id ? Z(V.query.id).then(({ data: p }) => {
      Object.keys(r).forEach((e) => {
        p[e] != null && (r[e] = p[e]);
      }), u.value = !1;
    }).catch() : u.value = !1;
    const z = async (p) => {
      u.value || !p || await p.validate(async (e) => {
        if (e) {
          const c = r.id ? ee : le;
          u.value = !0, c(r).then(() => {
            u.value = !1;
          }).catch(() => {
            u.value = !1;
          });
        }
      });
    };
    return (p, e) => {
      const c = d("el-page-header"), C = d("el-card"), U = d("el-input"), w = d("el-form-item"), N = d("el-option"), A = d("el-select"), F = d("upload-image"), L = d("upload-video"), T = d("icon"), b = d("el-button"), M = d("el-radio"), j = d("el-radio-group"), I = d("el-form"), O = d("el-dialog"), Q = H("loading");
      return s(), m("div", de, [
        o(C, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: a(() => [
            o(c, {
              content: n($),
              icon: n(oe),
              onBack: e[0] || (e[0] = (l) => q())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        J((s(), W(I, {
          class: "page-form mt-[15px]",
          model: r,
          "label-width": "150px",
          ref_key: "formRef",
          ref: R,
          rules: K
        }, {
          default: a(() => [
            o(C, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: a(() => [
                o(w, {
                  label: n(t)("ruleName"),
                  prop: "name"
                }, {
                  default: a(() => [
                    o(U, {
                      modelValue: r.name,
                      "onUpdate:modelValue": e[1] || (e[1] = (l) => r.name = l),
                      modelModifiers: { trim: !0 },
                      placeholder: n(t)("ruleNamePlaceholder"),
                      class: "input-width",
                      clearable: "",
                      maxlength: "60"
                    }, null, 8, ["modelValue", "placeholder"]),
                    f("div", pe, i(n(t)("ruleNameTips")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(w, {
                  label: n(t)("keyword"),
                  prop: "keyword"
                }, {
                  default: a(() => [
                    o(U, {
                      modelValue: r.keyword,
                      "onUpdate:modelValue": e[3] || (e[3] = (l) => r.keyword = l),
                      modelModifiers: { trim: !0 },
                      placeholder: n(t)("keywordPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, {
                      prepend: a(() => [
                        o(A, {
                          modelValue: r.matching_type,
                          "onUpdate:modelValue": e[2] || (e[2] = (l) => r.matching_type = l),
                          style: { width: "115px" }
                        }, {
                          default: a(() => [
                            o(N, {
                              label: n(t)("allMatching"),
                              value: "full"
                            }, null, 8, ["label"]),
                            o(N, {
                              label: n(t)("fuzzyMatching"),
                              value: "like"
                            }, null, 8, ["label"])
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(w, {
                  label: n(t)("content"),
                  prop: "content"
                }, {
                  default: a(() => [
                    f("div", se, [
                      (s(!0), m(X, null, Y(r.content, (l, S) => (s(), m("div", ie, [
                        l.msgtype == "text" ? (s(), m("div", ue, i(l.text.content), 1)) : h("", !0),
                        l.msgtype == "image" ? (s(), m("div", me, [
                          o(F, {
                            limit: 1,
                            width: "120px",
                            height: "120px",
                            modelValue: l.image.url,
                            "onUpdate:modelValue": (_) => l.image.url = _
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])) : h("", !0),
                        l.msgtype == "video" ? (s(), m("div", ce, [
                          o(L, {
                            limit: 1,
                            width: "120px",
                            height: "120px",
                            modelValue: l.video.url,
                            "onUpdate:modelValue": (_) => l.video.url = _
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])) : h("", !0),
                        l.msgtype == "mpnewsarticle" ? (s(), m("div", _e, [
                          o(re, {
                            modelValue: l.mpnewsarticle,
                            "onUpdate:modelValue": (_) => l.mpnewsarticle = _,
                            mode: "show"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])) : h("", !0),
                        l.msgtype == "miniprogrampage" ? (s(), m("div", fe, " 小程序卡片【" + i(l.miniprogrampage.appid) + "】 ", 1)) : h("", !0),
                        o(T, {
                          name: "element Delete",
                          class: "cursor-pointer",
                          onClick: (_) => E(S)
                        }, null, 8, ["onClick"])
                      ]))), 256)),
                      f("div", ge, [
                        o(b, {
                          type: "primary",
                          onClick: e[4] || (e[4] = (l) => y.value = !0)
                        }, {
                          default: a(() => [
                            g(i(n(t)("addReplyContent")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(w, {
                  label: n(t)("replyMethod"),
                  prop: "reply_method"
                }, {
                  default: a(() => [
                    o(j, {
                      modelValue: r.reply_method,
                      "onUpdate:modelValue": e[5] || (e[5] = (l) => r.reply_method = l)
                    }, {
                      default: a(() => [
                        o(M, { label: "all" }, {
                          default: a(() => [
                            g(i(n(t)("replyMethodAll")), 1)
                          ]),
                          _: 1
                        }),
                        o(M, { label: "rand" }, {
                          default: a(() => [
                            g(i(n(t)("replyMethodRand")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [Q, u.value]
        ]),
        f("div", ye, [
          f("div", ve, [
            o(b, {
              type: "primary",
              loading: u.value,
              onClick: e[6] || (e[6] = (l) => z(R.value))
            }, {
              default: a(() => [
                g(i(n(t)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        o(O, {
          modelValue: y.value,
          "onUpdate:modelValue": e[9] || (e[9] = (l) => y.value = l),
          title: n(t)("addReplyContent"),
          width: "60%",
          "destroy-on-close": !0
        }, {
          footer: a(() => [
            f("span", he, [
              o(b, {
                onClick: e[8] || (e[8] = (l) => y.value = !1)
              }, {
                default: a(() => [
                  g(i(n(t)("cancel")), 1)
                ]),
                _: 1
              }),
              o(b, {
                type: "primary",
                onClick: B
              }, {
                default: a(() => [
                  g(i(n(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            o(ne, {
              modelValue: x.value,
              "onUpdate:modelValue": e[7] || (e[7] = (l) => x.value = l),
              ref_key: "ReplyRef",
              ref: k
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  qe as default
};
