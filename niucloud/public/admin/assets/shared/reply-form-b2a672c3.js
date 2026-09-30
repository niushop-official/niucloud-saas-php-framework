import { defineComponent as E, ref as C, computed as O, watch as M, reactive as T, resolveComponent as u, openBlock as a, createElementBlock as r, createElementVNode as i, normalizeClass as f, createVNode as l, createTextVNode as v, createCommentVNode as x, withCtx as m, createBlock as S, toDisplayString as F, unref as A, pushScopeId as H, popScopeId as W } from "vue";
import { t as G, aH as y, a as J } from "./core-shared-c6ad4e77.js";
import P from "./upload-media-51766e79.js";
import h from "./select-wechat-media-0659762d.js";
import { ElMessage as b } from "element-plus";
import K from "./news-card-d0250d8d.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const d = (p) => (H("data-v-0e730071"), p = p(), W(), p), L = { class: "border border-br-light rounded" }, Q = { class: "py-[10px] px-[30px] flex text-sm border-0 border-b border-br-light text-tx-regular" }, X = { class: "py-[20px] px-[30px] h-[350px]" }, Y = { key: 0 }, Z = {
  key: 1,
  class: "flex w-full h-full justify-center items-center image-media"
}, ee = {
  key: 0,
  class: "w-full h-full"
}, te = {
  key: 1,
  class: "flex w-full h-full justify-center items-center image-media"
}, le = { class: "flex flex-1 h-full border border-br-light cursor-pointer select-media" }, ie = { class: "flex items-center justify-center flex-col" }, oe = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "leading-none text-xs mt-[10px] text-secondary" }, "从素材库选择", -1)), se = { class: "flex flex-1 h-full ml-[20px] border border-br-light cursor-pointer" }, ae = { class: "flex items-center justify-center flex-col" }, re = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "leading-none text-xs mt-[10px] text-secondary" }, "上传图片", -1)), ne = {
  key: 2,
  class: "flex w-full h-full justify-center items-center video-media"
}, me = {
  key: 0,
  class: "w-full h-full"
}, de = {
  key: 1,
  class: "flex w-full h-full justify-center items-center video-media"
}, ue = { class: "flex flex-1 h-full border border-br-light cursor-pointer select-media" }, pe = { class: "flex items-center justify-center flex-col" }, ce = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "leading-none text-xs mt-[10px] text-secondary" }, "从素材库选择", -1)), fe = { class: "flex flex-1 h-full ml-[20px] border border-br-light cursor-pointer" }, ve = { class: "flex items-center justify-center flex-col" }, xe = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "leading-none text-xs mt-[10px] text-secondary" }, "上传视频", -1)), ge = {
  key: 3,
  class: "flex w-full h-full justify-center items-center image-media"
}, _e = {
  key: 0,
  class: "w-full h-full"
}, ye = {
  key: 1,
  class: "flex w-full h-full justify-center items-center image-media"
}, he = { class: "flex flex-1 h-full border border-br-light cursor-pointer select-media" }, be = { class: "flex items-center justify-center flex-col" }, we = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "leading-none text-xs mt-[10px] text-secondary" }, "从素材库选择", -1)), Ve = { key: 4 }, ke = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "form-tip" }, "小程序需已经与公众号关联", -1)), je = { class: "rounded cursor-pointer overflow-hidden relative border border-solid border-color image-wrap mr-[10px] w-[100px] h-[100px]" }, ze = { class: "w-full h-full flex items-center justify-center flex-col content-wrap" }, Ce = { class: "leading-none text-xs mt-[10px] text-secondary" }, Me = /* @__PURE__ */ d(() => /* @__PURE__ */ i("div", { class: "form-tip" }, "小程序卡片图片建议大小为520*416", -1)), Se = /* @__PURE__ */ E({
  __name: "reply-form",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(p, { expose: U, emit: $ }) {
    const I = p, e = C({
      msgtype: "text",
      text: {
        content: ""
      },
      image: {
        media_id: "",
        url: ""
      },
      video: {
        media_id: "",
        url: ""
      },
      miniprogrampage: {
        appid: "",
        title: "",
        pagepath: "",
        thumb_media_url: "",
        thumb_media_id: ""
      },
      mpnewsarticle: null
    }), w = O({
      get() {
        return I.modelValue;
      },
      set(o) {
        $("update:modelValue", o);
      }
    });
    M(() => w.value, (o, t) => {
      (!t || !Object.keys(t).length) && Object.keys(o).length && (e.value = w.value);
    }, { immediate: !0 }), M(() => e.value, () => {
      w.value = e.value;
    }, { deep: !0 });
    const c = (o) => {
      e.value.msgtype = o;
    }, V = (o) => {
      e.value.image.media_id = o.media_id, e.value.image.url = o.value;
    }, k = (o) => {
      e.value.video.media_id = o.media_id, e.value.video.url = o.value;
    }, N = (o) => {
      e.value.miniprogrampage.thumb_media_id = o.media_id, e.value.miniprogrampage.thumb_media_url = o.value;
    }, q = (o) => {
      e.value.mpnewsarticle = {
        article_id: o.media_id,
        value: o.value
      };
    }, j = C(), R = T({
      appid: [
        { required: !0, message: "请填写小程序appid", trigger: "blur" }
      ],
      title: [
        { required: !0, message: "请填写小程序卡片标题", trigger: "blur" }
      ],
      pagepath: [
        { required: !0, message: "请填写小程序卡片跳转页面", trigger: "blur" }
      ],
      thumb_media_url: [
        { required: !0, message: "请上传小程序卡片封面", trigger: "blur" }
      ]
    });
    return U({
      verify: async () => {
        let o = !0;
        switch (e.value.msgtype) {
          case "text":
            y.empty(e.value.text.content) && (b({ message: "请输入回复内容", type: "warning" }), o = !1);
            break;
          case "image":
            y.empty(e.value.image.url) && (b({ message: "请上传回复图片", type: "warning" }), o = !1);
            break;
          case "video":
            y.empty(e.value.video.url) && (b({ message: "请上传回复视频", type: "warning" }), o = !1);
            break;
          case "miniprogrampage":
            await j.value.validate(async (t) => {
              o = t;
            });
            break;
          case "mpnewsarticle":
            y.empty(e.value.mpnewsarticle) && (b({ message: "请选择图文", type: "warning" }), o = !1);
            break;
        }
        return o;
      }
    }), (o, t) => {
      const n = u("icon"), g = u("el-input"), z = u("upload-image"), B = u("upload-video"), _ = u("el-form-item"), D = u("el-form");
      return a(), r("div", L, [
        i("div", Q, [
          i("div", {
            class: f(["pr-[25px] cursor-pointer flex items-center", { "text-primary": e.value.msgtype == "text" }]),
            onClick: t[0] || (t[0] = (s) => c("text"))
          }, [
            l(n, {
              name: "iconfont iconxingzhuang-wenzi",
              size: "18",
              class: "mr-[5px]"
            }),
            v(" 文本 ")
          ], 2),
          i("div", {
            class: f(["pr-[25px] cursor-pointer flex items-center", { "text-primary": e.value.msgtype == "image" }]),
            onClick: t[1] || (t[1] = (s) => c("image"))
          }, [
            l(n, {
              name: "iconfont icontupian",
              size: "18px",
              class: "mr-[5px]"
            }),
            v(" 图片 ")
          ], 2),
          i("div", {
            class: f(["pr-[25px] cursor-pointer flex items-center", { "text-primary": e.value.msgtype == "video" }]),
            onClick: t[2] || (t[2] = (s) => c("video"))
          }, [
            l(n, {
              name: "iconfont iconshipin1",
              size: "18",
              class: "mr-[5px]"
            }),
            v(" 视频 ")
          ], 2),
          i("div", {
            class: f(["pr-[25px] cursor-pointer flex items-center", { "text-primary": e.value.msgtype == "mpnewsarticle" }]),
            onClick: t[3] || (t[3] = (s) => c("mpnewsarticle"))
          }, [
            l(n, {
              name: "iconfont icontuwendaohang2",
              size: "13px",
              class: "mr-[5px]"
            }),
            v(" 图文 ")
          ], 2),
          i("div", {
            class: f(["pr-[25px] cursor-pointer flex items-center", { "text-primary": e.value.msgtype == "miniprogrampage" }]),
            onClick: t[4] || (t[4] = (s) => c("miniprogrampage"))
          }, [
            l(n, {
              name: "iconfont iconxiaochengxu",
              size: "14px",
              class: "mr-[5px]"
            }),
            v(" 小程序卡片 ")
          ], 2)
        ]),
        i("div", X, [
          e.value.msgtype == "text" ? (a(), r("div", Y, [
            l(g, {
              modelValue: e.value.text.content,
              "onUpdate:modelValue": t[5] || (t[5] = (s) => e.value.text.content = s),
              modelModifiers: { trim: !0 },
              rows: 5,
              type: "textarea",
              placeholder: "",
              maxlength: "600",
              "show-word-limit": !0,
              resize: "none",
              "input-style": "box-shadow: none;height:300px"
            }, null, 8, ["modelValue"])
          ])) : x("", !0),
          e.value.msgtype == "image" ? (a(), r("div", Z, [
            e.value.image.url ? (a(), r("div", ee, [
              l(z, {
                limit: 1,
                width: "150px",
                height: "150px",
                modelValue: e.value.image.url,
                "onUpdate:modelValue": t[6] || (t[6] = (s) => e.value.image.url = s)
              }, null, 8, ["modelValue"])
            ])) : (a(), r("div", te, [
              i("div", le, [
                l(h, {
                  type: "image",
                  onSuccess: V
                }, {
                  default: m(() => [
                    i("div", ie, [
                      l(n, {
                        name: "element Plus",
                        size: "20px",
                        color: "var(--el-text-color-secondary)"
                      }),
                      oe
                    ])
                  ]),
                  _: 1
                })
              ]),
              i("div", se, [
                l(P, {
                  type: "image",
                  class: "w-full h-full flex items-center justify-center",
                  onSuccess: V
                }, {
                  default: m(() => [
                    i("div", ae, [
                      l(n, {
                        name: "element Plus",
                        size: "20px",
                        color: "var(--el-text-color-secondary)"
                      }),
                      re
                    ])
                  ]),
                  _: 1
                })
              ])
            ]))
          ])) : x("", !0),
          e.value.msgtype == "video" ? (a(), r("div", ne, [
            e.value.video.url ? (a(), r("div", me, [
              l(B, {
                limit: 1,
                width: "150px",
                height: "150px",
                modelValue: e.value.video.url,
                "onUpdate:modelValue": t[7] || (t[7] = (s) => e.value.video.url = s)
              }, null, 8, ["modelValue"])
            ])) : (a(), r("div", de, [
              i("div", ue, [
                l(h, {
                  type: "video",
                  onSuccess: k
                }, {
                  default: m(() => [
                    i("div", pe, [
                      l(n, {
                        name: "element Plus",
                        size: "20px",
                        color: "var(--el-text-color-secondary)"
                      }),
                      ce
                    ])
                  ]),
                  _: 1
                })
              ]),
              i("div", fe, [
                l(P, {
                  type: "video",
                  class: "w-full h-full flex items-center justify-center",
                  onSuccess: k
                }, {
                  default: m(() => [
                    i("div", ve, [
                      l(n, {
                        name: "element Plus",
                        size: "20px",
                        color: "var(--el-text-color-secondary)"
                      }),
                      xe
                    ])
                  ]),
                  _: 1
                })
              ])
            ]))
          ])) : x("", !0),
          e.value.msgtype == "mpnewsarticle" ? (a(), r("div", ge, [
            e.value.mpnewsarticle ? (a(), r("div", _e, [
              l(K, {
                modelValue: e.value.mpnewsarticle,
                "onUpdate:modelValue": t[8] || (t[8] = (s) => e.value.mpnewsarticle = s)
              }, null, 8, ["modelValue"])
            ])) : (a(), r("div", ye, [
              i("div", he, [
                l(h, {
                  type: "news",
                  onSuccess: q
                }, {
                  default: m(() => [
                    i("div", be, [
                      l(n, {
                        name: "element Plus",
                        size: "20px",
                        color: "var(--el-text-color-secondary)"
                      }),
                      we
                    ])
                  ]),
                  _: 1
                })
              ])
            ]))
          ])) : x("", !0),
          e.value.msgtype == "miniprogrampage" ? (a(), r("div", Ve, [
            l(D, {
              model: e.value.miniprogrampage,
              "label-width": "140px",
              class: "page-form",
              ref_key: "formRef",
              ref: j,
              rules: R
            }, {
              default: m(() => [
                l(_, {
                  label: "小程序APPID",
                  prop: "appid"
                }, {
                  default: m(() => [
                    l(g, {
                      modelValue: e.value.miniprogrampage.appid,
                      "onUpdate:modelValue": t[9] || (t[9] = (s) => e.value.miniprogrampage.appid = s),
                      modelModifiers: { trim: !0 },
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    ke
                  ]),
                  _: 1
                }),
                l(_, {
                  label: "小程序卡片标题",
                  prop: "title"
                }, {
                  default: m(() => [
                    l(g, {
                      modelValue: e.value.miniprogrampage.title,
                      "onUpdate:modelValue": t[10] || (t[10] = (s) => e.value.miniprogrampage.title = s),
                      modelModifiers: { trim: !0 },
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(_, {
                  label: "小程序的页面路径",
                  prop: "pagepath"
                }, {
                  default: m(() => [
                    l(g, {
                      modelValue: e.value.miniprogrampage.pagepath,
                      "onUpdate:modelValue": t[11] || (t[11] = (s) => e.value.miniprogrampage.pagepath = s),
                      modelModifiers: { trim: !0 },
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(_, {
                  label: "小程序卡片图片",
                  prop: "thumb_media_url"
                }, {
                  default: m(() => [
                    e.value.miniprogrampage.thumb_media_url ? (a(), S(z, {
                      key: 0,
                      limit: 1,
                      width: "100px",
                      height: "100px",
                      modelValue: e.value.miniprogrampage.thumb_media_url,
                      "onUpdate:modelValue": t[12] || (t[12] = (s) => e.value.miniprogrampage.thumb_media_url = s)
                    }, null, 8, ["modelValue"])) : (a(), S(h, {
                      key: 1,
                      type: "image",
                      onSuccess: N
                    }, {
                      default: m(() => [
                        i("div", je, [
                          i("div", ze, [
                            l(n, {
                              name: "element Plus",
                              size: "20px",
                              color: "var(--el-text-color-secondary)"
                            }),
                            i("div", Ce, F(A(G)("upload.root")), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    })),
                    Me
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ])) : x("", !0)
        ])
      ]);
    };
  }
});
const Fe = /* @__PURE__ */ J(Se, [["__scopeId", "data-v-0e730071"]]);
export {
  Fe as default
};
