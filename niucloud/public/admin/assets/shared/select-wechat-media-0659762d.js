import { defineComponent as Q, ref as y, reactive as X, resolveComponent as u, resolveDirective as Y, openBlock as t, createElementBlock as o, Fragment as S, createElementVNode as i, renderSlot as Z, createVNode as s, unref as _, withCtx as c, createTextVNode as $, toDisplayString as v, withDirectives as R, renderList as T, createBlock as F, createCommentVNode as B, vShow as M, normalizeStyle as ee, normalizeClass as te, nextTick as le } from "vue";
import { t as j, j as A, aT as oe, aU as ne, B as se } from "./core-shared-c6ad4e77.js";
import ae from "./upload-media-51766e79.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const ie = { class: "flex border-t border-b main-wrap border-color w-full h-[40vh]" }, ce = { class: "attachment-list-wrap flex flex-col p-[15px] flex-1 overflow-hidden" }, re = {
  key: 0,
  class: "flex"
}, de = {
  key: 1,
  class: "flex"
}, ue = { class: "flex-1 my-[15px] h-0" }, pe = { key: 0 }, fe = {
  key: 0,
  class: "flex flex-wrap"
}, me = ["onClick"], _e = { class: "attachment-wrap w-full rounded cursor-pointer overflow-hidden relative flex items-center justify-center h-[120px]" }, ve = ["src"], he = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" }, ge = ["onClick"], ye = { class: "relative" }, we = { class: "w-full h-[130px] relative" }, xe = {
  key: 0,
  class: "absolute left-0 bottom-0 p-[10px] w-full truncate text-white leading-none"
}, ke = { key: 0 }, be = { class: "flex-1 w-0 truncate" }, Ce = { class: "w-[50px] h-[50px] ml-[10px]" }, ze = {
  key: 1,
  class: "px-[15px] py-[10px]"
}, Se = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" }, je = {
  key: 1,
  class: "flex items-center justify-center"
}, Ee = { class: "flex h-full justify-end items-center" }, Ne = { class: "dialog-footer" }, He = /* @__PURE__ */ Q({
  __name: "select-wechat-media",
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  emits: ["success"],
  setup(w, { emit: P }) {
    const h = w, E = y(!1), q = () => {
      h.type == "news" && L(), E.value = !0;
    }, n = X({
      loading: !0,
      page: 1,
      total: 0,
      limit: 10,
      data: []
    }), x = (C = 1) => {
      n.loading = !0, n.page = C, oe({
        page: n.page,
        limit: n.limit,
        type: h.type
      }).then((l) => {
        n.data = l.data.data, n.total = l.data.total, n.loading = !1, h.type == "news" && L();
      }).catch(() => {
        n.loading = !1;
      });
    };
    x();
    const k = y({}), G = () => {
      P("success", k.value);
    }, g = y(!1), J = () => {
      g.value || (g.value = !0, ne().then(() => {
        g.value = !1, x();
      }).catch(() => {
        g.value = !1;
      }));
    }, D = document.createElement("meta");
    D.content = "same-origin", D.name = "referrer", document.getElementsByTagName("head")[0].appendChild(D);
    const U = y(null), H = y([]), b = y([]), L = se(() => {
      le(() => {
        const C = U.value.clientWidth, l = parseInt(C / 292), d = [], p = [];
        H.value.forEach((f, a) => {
          if (a < l) {
            const r = {};
            r.top = "0px", a % l == 0 ? r.left = f.clientWidth * a + "px" : r.left = f.clientWidth * a + a % l * 10 + "px", p[a] = r, d[a] = f.clientHeight + 10;
          } else {
            const r = Math.min(...d), N = d.findIndex((W) => W === r), z = {};
            z.top = r + 10 + "px", z.left = p[N].left, p[a] = z, d[N] += f.clientHeight + 10;
          }
        }), b.value = p;
      });
    }, 800);
    return window.addEventListener("resize", () => L()), (C, l) => {
      const d = u("el-button"), p = u("el-col"), f = u("el-row"), a = u("el-image"), r = u("icon"), N = u("el-empty"), z = u("el-scrollbar"), W = u("el-pagination"), K = u("el-dialog"), O = Y("loading");
      return t(), o(S, null, [
        i("div", { onClick: q }, [
          Z(C.$slots, "default")
        ]),
        s(K, {
          modelValue: E.value,
          "onUpdate:modelValue": l[5] || (l[5] = (e) => E.value = e),
          title: _(j)("upload.select" + w.type),
          width: "60%",
          class: "attachment-dialog",
          "destroy-on-close": !0
        }, {
          footer: c(() => [
            i("span", Ne, [
              s(d, {
                onClick: l[4] || (l[4] = (e) => E.value = !1)
              }, {
                default: c(() => [
                  $(v(_(j)("cancel")), 1)
                ]),
                _: 1
              }),
              s(d, {
                type: "primary",
                onClick: G
              }, {
                default: c(() => [
                  $(v(_(j)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: c(() => [
            i("div", ie, [
              i("div", ce, [
                s(f, {
                  gutter: 15,
                  class: "h-[32px]"
                }, {
                  default: c(() => [
                    s(p, { span: 10 }, {
                      default: c(() => [
                        h.type != "news" ? (t(), o("div", re, [
                          s(ae, {
                            type: h.type,
                            onSuccess: l[0] || (l[0] = (e) => x())
                          }, {
                            default: c(() => [
                              s(d, { type: "primary" }, {
                                default: c(() => [
                                  $(v(_(j)("upload.upload" + w.type)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["type"])
                        ])) : (t(), o("div", de, [
                          s(d, {
                            type: "primary",
                            loading: g.value,
                            onClick: J
                          }, {
                            default: c(() => [
                              $(v(g.value ? "同步中" : "同步微信图文"), 1)
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                R((t(), o("div", ue, [
                  s(z, null, {
                    default: c(() => [
                      n.data.length ? (t(), o("div", pe, [
                        h.type != "news" ? (t(), o("div", fe, [
                          (t(!0), o(S, null, T(n.data, (e, m) => (t(), o("div", {
                            class: "attachment-item mr-[10px] mb-[10px] w-[120px]",
                            key: m,
                            onClick: (V) => k.value = e
                          }, [
                            i("div", _e, [
                              w.type == "image" ? (t(), F(a, {
                                key: 0,
                                src: _(A)(e.value),
                                fit: "contain",
                                "preview-src-list": e.image_list
                              }, null, 8, ["src", "preview-src-list"])) : w.type == "video" ? (t(), o("video", {
                                key: 1,
                                src: _(A)(e.value)
                              }, null, 8, ve)) : B("", !0),
                              R(i("div", he, [
                                s(r, {
                                  name: "element Select",
                                  color: "#fff",
                                  size: "40px"
                                })
                              ], 512), [
                                [M, k.value.id == e.id]
                              ])
                            ])
                          ], 8, me))), 128))
                        ])) : (t(), o("div", {
                          key: 1,
                          class: "relative",
                          ref_key: "waterfallContainerRef",
                          ref: U
                        }, [
                          (t(!0), o(S, null, T(n.data, (e, m) => (t(), o("div", {
                            ref_for: !0,
                            ref_key: "waterfallItemRef",
                            ref: H,
                            class: "absolute attachment-item mr-[10px] mb-[10px] w-[280px] rounded-lg overflow-hidden border border-color",
                            style: ee({ left: b.value[m] ? b.value[m].left : "", top: b.value[m] ? b.value[m].top : "" }),
                            key: m,
                            onClick: (V) => k.value = e
                          }, [
                            i("div", ye, [
                              i("div", we, [
                                s(a, {
                                  src: e.value.news_item[0].thumb_url,
                                  class: "w-full h-full"
                                }, null, 8, ["src"]),
                                e.value.news_item.length > 1 ? (t(), o("div", xe, v(e.value.news_item[0].title), 1)) : B("", !0)
                              ]),
                              e.value.news_item.length > 1 ? (t(), o("div", ke, [
                                (t(!0), o(S, null, T(e.value.news_item, (V, I) => (t(), o(S, null, [
                                  I > 0 ? (t(), o("div", {
                                    key: 0,
                                    class: te(["px-[15px] py-[10px] flex", { "border-b border-color": I < e.value.news_item.length - 1 }])
                                  }, [
                                    i("div", be, v(V.title), 1),
                                    i("div", Ce, [
                                      s(a, {
                                        src: V.thumb_url,
                                        class: "w-full h-full"
                                      }, null, 8, ["src"])
                                    ])
                                  ], 2)) : B("", !0)
                                ], 64))), 256))
                              ])) : (t(), o("div", ze, v(e.value.news_item[0].title), 1)),
                              R(i("div", Se, [
                                s(r, {
                                  name: "element Select",
                                  color: "#fff",
                                  size: "40px"
                                })
                              ], 512), [
                                [M, k.value.id == e.id]
                              ])
                            ])
                          ], 12, ge))), 128))
                        ], 512))
                      ])) : (t(), o("div", je, [
                        n.loading ? B("", !0) : (t(), F(N, {
                          key: 0,
                          description: _(j)("upload.mediaEmpty"),
                          "image-size": 100
                        }, null, 8, ["description"]))
                      ]))
                    ]),
                    _: 1
                  })
                ])), [
                  [O, n.loading]
                ]),
                s(f, { gutter: 20 }, {
                  default: c(() => [
                    s(p, { span: "24" }, {
                      default: c(() => [
                        i("div", Ee, [
                          s(W, {
                            "current-page": n.page,
                            "onUpdate:current-page": l[1] || (l[1] = (e) => n.page = e),
                            small: !0,
                            "page-size": n.limit,
                            "onUpdate:page-size": l[2] || (l[2] = (e) => n.limit = e),
                            "page-sizes": [10, 20, 30, 40, 60],
                            layout: "total, sizes, prev, pager, next, jumper",
                            total: n.total,
                            onSizeChange: l[3] || (l[3] = (e) => x()),
                            onCurrentChange: x
                          }, null, 8, ["current-page", "page-size", "total"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
export {
  He as default
};
