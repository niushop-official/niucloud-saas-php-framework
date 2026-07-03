import { defineComponent as X, ref as y, reactive as Y, resolveComponent as u, resolveDirective as Z, openBlock as t, createElementBlock as o, Fragment as S, createElementVNode as i, renderSlot as ee, createVNode as s, unref as _, withCtx as c, createTextVNode as j, toDisplayString as v, withDirectives as R, renderList as H, createBlock as U, createCommentVNode as L, vShow as F, normalizeStyle as te, normalizeClass as le, nextTick as oe } from "vue";
import { t as E, i as P, aL as ne, aM as se, n as ae } from "./core-shared-c8d7774e.js";
import ie from "./upload-media-01650f1a.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const ce = { class: "flex border-t border-b main-wrap border-color w-full h-[40vh]" }, re = { class: "attachment-list-wrap flex flex-col p-[15px] flex-1 overflow-hidden" }, de = {
  key: 0,
  class: "flex"
}, ue = {
  key: 1,
  class: "flex"
}, pe = { class: "flex-1 my-[15px] h-0" }, fe = { key: 0 }, me = {
  key: 0,
  class: "flex flex-wrap"
}, _e = ["onClick"], ve = { class: "attachment-wrap w-full rounded cursor-pointer overflow-hidden relative flex items-center justify-center h-[120px]" }, he = ["src"], ge = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" }, ye = ["onClick"], we = { class: "relative" }, xe = { class: "w-full h-[130px] relative" }, ke = {
  key: 0,
  class: "absolute left-0 bottom-0 p-[10px] w-full truncate text-white leading-none"
}, be = { key: 0 }, Ce = { class: "flex-1 w-0 truncate" }, ze = { class: "w-[50px] h-[50px] ml-[10px]" }, Se = {
  key: 1,
  class: "px-[15px] py-[10px]"
}, Ee = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60" }, Ne = {
  key: 1,
  class: "flex items-center justify-center"
}, Ve = { class: "flex h-full justify-end items-center" }, $e = { class: "dialog-footer" }, Te = /* @__PURE__ */ X({
  __name: "select-wechat-media",
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  emits: ["success"],
  setup(w, { emit: A }) {
    const h = w, N = y(!1), q = () => {
      h.type == "news" && W(), N.value = !0;
    }, n = Y({
      loading: !0,
      page: 1,
      total: 0,
      limit: 10,
      data: []
    }), x = (C = 1) => {
      n.loading = !0, n.page = C, ne({
        page: n.page,
        limit: n.limit,
        type: h.type
      }).then((l) => {
        n.data = l.data.data, n.total = l.data.total, n.loading = !1, h.type == "news" && W();
      }).catch(() => {
        n.loading = !1;
      });
    };
    x();
    const G = A, k = y({}), J = () => {
      G("success", k.value);
    }, g = y(!1), K = () => {
      g.value || (g.value = !0, se().then(() => {
        g.value = !1, x();
      }).catch(() => {
        g.value = !1;
      }));
    }, D = document.createElement("meta");
    D.content = "same-origin", D.name = "referrer", document.getElementsByTagName("head")[0].appendChild(D);
    const I = y(null), M = y([]), b = y([]), W = ae(() => {
      oe(() => {
        const C = I.value.clientWidth, l = parseInt(C / 292), d = [], p = [];
        M.value.forEach((f, a) => {
          if (a < l) {
            const r = {};
            r.top = "0px", a % l == 0 ? r.left = f.clientWidth * a + "px" : r.left = f.clientWidth * a + a % l * 10 + "px", p[a] = r, d[a] = f.clientHeight + 10;
          } else {
            const r = Math.min(...d), V = d.findIndex((B) => B === r), z = {};
            z.top = r + 10 + "px", z.left = p[V].left, p[a] = z, d[V] += f.clientHeight + 10;
          }
        }), b.value = p;
      });
    }, 800);
    return window.addEventListener("resize", () => W()), (C, l) => {
      const d = u("el-button"), p = u("el-col"), f = u("el-row"), a = u("el-image"), r = u("icon"), V = u("el-empty"), z = u("el-scrollbar"), B = u("el-pagination"), O = u("el-dialog"), Q = Z("loading");
      return t(), o(S, null, [
        i("div", { onClick: q }, [
          ee(C.$slots, "default")
        ]),
        s(O, {
          modelValue: N.value,
          "onUpdate:modelValue": l[5] || (l[5] = (e) => N.value = e),
          title: _(E)("upload.select" + w.type),
          width: "60%",
          class: "attachment-dialog",
          "destroy-on-close": !0
        }, {
          footer: c(() => [
            i("span", $e, [
              s(d, {
                onClick: l[4] || (l[4] = (e) => N.value = !1)
              }, {
                default: c(() => [
                  j(v(_(E)("cancel")), 1)
                ]),
                _: 1
              }),
              s(d, {
                type: "primary",
                onClick: J
              }, {
                default: c(() => [
                  j(v(_(E)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: c(() => [
            i("div", ce, [
              i("div", re, [
                s(f, {
                  gutter: 15,
                  class: "h-[32px]"
                }, {
                  default: c(() => [
                    s(p, { span: 10 }, {
                      default: c(() => [
                        h.type != "news" ? (t(), o("div", de, [
                          s(ie, {
                            type: h.type,
                            onSuccess: l[0] || (l[0] = (e) => x())
                          }, {
                            default: c(() => [
                              s(d, { type: "primary" }, {
                                default: c(() => [
                                  j(v(_(E)("upload.upload" + w.type)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["type"])
                        ])) : (t(), o("div", ue, [
                          s(d, {
                            type: "primary",
                            loading: g.value,
                            onClick: K
                          }, {
                            default: c(() => [
                              j(v(g.value ? "同步中" : "同步微信图文"), 1)
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
                R((t(), o("div", pe, [
                  s(z, null, {
                    default: c(() => [
                      n.data.length ? (t(), o("div", fe, [
                        h.type != "news" ? (t(), o("div", me, [
                          (t(!0), o(S, null, H(n.data, (e, m) => (t(), o("div", {
                            class: "attachment-item mr-[10px] mb-[10px] w-[120px]",
                            key: m,
                            onClick: ($) => k.value = e
                          }, [
                            i("div", ve, [
                              w.type == "image" ? (t(), U(a, {
                                key: 0,
                                src: _(P)(e.value),
                                fit: "contain",
                                "preview-src-list": e.image_list
                              }, null, 8, ["src", "preview-src-list"])) : w.type == "video" ? (t(), o("video", {
                                key: 1,
                                src: _(P)(e.value)
                              }, null, 8, he)) : L("", !0),
                              R(i("div", ge, [
                                s(r, {
                                  name: "element Select",
                                  color: "#fff",
                                  size: "40px"
                                })
                              ], 512), [
                                [F, k.value.id == e.id]
                              ])
                            ])
                          ], 8, _e))), 128))
                        ])) : (t(), o("div", {
                          key: 1,
                          class: "relative",
                          ref_key: "waterfallContainerRef",
                          ref: I
                        }, [
                          (t(!0), o(S, null, H(n.data, (e, m) => (t(), o("div", {
                            ref_for: !0,
                            ref_key: "waterfallItemRef",
                            ref: M,
                            class: "absolute attachment-item mr-[10px] mb-[10px] w-[280px] rounded-lg overflow-hidden border border-color",
                            style: te({ left: b.value[m] ? b.value[m].left : "", top: b.value[m] ? b.value[m].top : "" }),
                            key: m,
                            onClick: ($) => k.value = e
                          }, [
                            i("div", we, [
                              i("div", xe, [
                                s(a, {
                                  src: e.value.news_item[0].thumb_url,
                                  class: "w-full h-full"
                                }, null, 8, ["src"]),
                                e.value.news_item.length > 1 ? (t(), o("div", ke, v(e.value.news_item[0].title), 1)) : L("", !0)
                              ]),
                              e.value.news_item.length > 1 ? (t(), o("div", be, [
                                (t(!0), o(S, null, H(e.value.news_item, ($, T) => (t(), o(S, null, [
                                  T > 0 ? (t(), o("div", {
                                    key: 0,
                                    class: le(["px-[15px] py-[10px] flex", { "border-b border-color": T < e.value.news_item.length - 1 }])
                                  }, [
                                    i("div", Ce, v($.title), 1),
                                    i("div", ze, [
                                      s(a, {
                                        src: $.thumb_url,
                                        class: "w-full h-full"
                                      }, null, 8, ["src"])
                                    ])
                                  ], 2)) : L("", !0)
                                ], 64))), 256))
                              ])) : (t(), o("div", Se, v(e.value.news_item[0].title), 1)),
                              R(i("div", Ee, [
                                s(r, {
                                  name: "element Select",
                                  color: "#fff",
                                  size: "40px"
                                })
                              ], 512), [
                                [F, k.value.id == e.id]
                              ])
                            ])
                          ], 12, ye))), 128))
                        ], 512))
                      ])) : (t(), o("div", Ne, [
                        n.loading ? L("", !0) : (t(), U(V, {
                          key: 0,
                          description: _(E)("upload.mediaEmpty"),
                          "image-size": 100
                        }, null, 8, ["description"]))
                      ]))
                    ]),
                    _: 1
                  })
                ])), [
                  [Q, n.loading]
                ]),
                s(f, { gutter: 20 }, {
                  default: c(() => [
                    s(p, { span: "24" }, {
                      default: c(() => [
                        i("div", Ve, [
                          s(B, {
                            "current-page": n.page,
                            "onUpdate:currentPage": l[1] || (l[1] = (e) => n.page = e),
                            small: !0,
                            "page-size": n.limit,
                            "onUpdate:pageSize": l[2] || (l[2] = (e) => n.limit = e),
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
  Te as default
};
