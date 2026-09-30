import { defineComponent as J, reactive as I, ref as K, resolveComponent as v, resolveDirective as Q, openBlock as o, createElementBlock as n, Fragment as _, createVNode as g, withCtx as d, createElementVNode as c, withModifiers as X, unref as f, createTextVNode as u, toDisplayString as i, withDirectives as G, renderList as b, createCommentVNode as C, createBlock as T, pushScopeId as Y, popScopeId as Z } from "vue";
import { t as p, f$ as w, g0 as ee, a as te } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as oe } from "element-plus";
import ae from "./index-997caa57.js";
import { useRoute as ne, useRouter as se } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const D = (V) => (Y("data-v-9906f8eb"), V = V(), Z(), V), re = { class: "flex justify-between items-center" }, le = { class: "table-panel table-fill-page__panel" }, ie = { class: "table-fill-page__table" }, de = { class: "group-card-list" }, ce = {
  key: 0,
  class: "group-card-empty"
}, pe = {
  key: 1,
  class: "group-card-grid"
}, ue = { class: "group-card__head" }, _e = { class: "min-w-0" }, ge = { class: "group-card__name" }, me = { class: "group-card__time" }, fe = { class: "shrink-0" }, he = { class: "group-card__block" }, ye = { class: "group-card__label" }, ve = { class: "group-card__tags" }, ke = {
  key: 0,
  class: "group-card__tags-measure",
  "aria-hidden": "true"
}, be = /* @__PURE__ */ D(() => /* @__PURE__ */ c("span", { class: "iconfont icongengduopc group-more" }, null, -1)), Ce = { class: "group-more-tip" }, $e = /* @__PURE__ */ D(() => /* @__PURE__ */ c("span", { class: "iconfont icongengduopc group-more" }, null, -1)), xe = {
  key: 2,
  class: "group-card__none"
}, Se = { class: "group-card__block" }, Te = { class: "group-card__label" }, Fe = { class: "group-card__tags" }, Ne = {
  key: 0,
  class: "group-card__tags-measure",
  "aria-hidden": "true"
}, Ve = /* @__PURE__ */ D(() => /* @__PURE__ */ c("span", { class: "iconfont icongengduopc group-more" }, null, -1)), ze = { class: "group-more-tip" }, Be = /* @__PURE__ */ D(() => /* @__PURE__ */ c("span", { class: "iconfont icongengduopc group-more" }, null, -1)), De = {
  key: 2,
  class: "group-card__none"
}, Ee = {
  key: 0,
  class: "group-pagination"
}, Ge = /* @__PURE__ */ J({
  __name: "group",
  setup(V) {
    const Me = ne(), M = se(), L = "站点套餐", z = I({}), $ = /* @__PURE__ */ new WeakMap(), A = (a) => {
      const e = $.get(a);
      if (!e)
        return;
      const l = a.clientWidth;
      if (l <= 0)
        return;
      const h = a.querySelector(".group-card__tags-measure");
      if (!h)
        return;
      const m = Array.from(h.querySelectorAll(".el-tag"));
      if (!m.length)
        return;
      if (m.some((y) => y.offsetWidth === 0)) {
        e.retry < 5 && (e.retry += 1, requestAnimationFrame(() => e.measure()));
        return;
      }
      e.retry = 0;
      const F = h.querySelector(".group-more"), E = (F == null ? void 0 : F.offsetWidth) || 0, k = parseFloat(getComputedStyle(h).columnGap) || 0;
      let N = 0, S = 0;
      for (let y = 0; y < m.length; y++) {
        const t = y < m.length - 1 ? k + E : 0, r = N + (S > 0 ? k : 0) + m[y].offsetWidth;
        if (r + t > l)
          break;
        N = r, S++;
      }
      z[e.key] !== S && (z[e.key] = S);
    }, P = {
      mounted(a, e) {
        var h;
        const l = {
          key: e.value,
          retry: 0,
          observer: null,
          measure: () => {
          }
        };
        l.measure = () => A(a), l.observer = new ResizeObserver(() => l.measure()), $.set(a, l), l.observer.observe(a), l.measure(), (h = document.fonts) == null || h.ready.then(() => {
          $.get(a) === l && l.measure();
        });
      },
      updated(a, e) {
        const l = $.get(a);
        l && (l.key = e.value, l.measure());
      },
      unmounted(a) {
        const e = $.get(a);
        e == null || e.observer.disconnect(), $.delete(a), e != null && e.key && delete z[e.key];
      }
    }, W = (a, e) => {
      const l = z[a];
      return l ?? e;
    }, q = (a, e) => e.slice(0, W(a, e.length)), B = (a, e) => e.slice(W(a, e.length)), R = K(), s = I({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        keywords: ""
      }
    }), U = (a) => {
      a && (a.resetFields(), x());
    }, x = (a = 1) => {
      s.loading = !0, s.page = a, w({
        page: s.page,
        limit: s.limit,
        ...s.searchParam
      }).then((e) => {
        s.loading = !1, s.data = e.data.data, s.total = e.data.total;
      }).catch(() => {
        s.loading = !1;
      });
    };
    x();
    const j = () => {
      M.push("/admin/site/group_edit");
    }, O = (a) => {
      M.push({ path: "/admin/site/group_edit", query: { id: a.group_id } });
    }, H = (a) => {
      oe.confirm(
        p("groupDeleteTips"),
        p("warning"),
        {
          confirmButtonText: p("confirm"),
          cancelButtonText: p("cancel"),
          type: "warning"
        }
      ).then(() => {
        ee(a).then(() => {
          x();
        }).catch(() => {
        });
      });
    };
    return (a, e) => {
      const l = v("el-input"), h = v("el-form-item"), m = v("el-button"), F = v("el-form"), E = v("el-card"), k = v("el-tag"), N = v("el-tooltip"), S = v("el-pagination"), y = Q("loading");
      return o(), n(_, null, [
        g(E, {
          class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
          shadow: "never"
        }, {
          default: d(() => [
            c("div", re, [
              g(F, {
                inline: !0,
                model: s.searchParam,
                ref_key: "searchFormRef",
                ref: R,
                onSubmit: e[3] || (e[3] = X(() => {
                }, ["prevent"]))
              }, {
                default: d(() => [
                  g(h, {
                    label: f(p)("groupName"),
                    prop: "keywords"
                  }, {
                    default: d(() => [
                      g(l, {
                        modelValue: s.searchParam.keywords,
                        "onUpdate:modelValue": e[0] || (e[0] = (t) => s.searchParam.keywords = t),
                        modelModifiers: { trim: !0 },
                        placeholder: f(p)("groupNamePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  g(h, null, {
                    default: d(() => [
                      g(m, {
                        type: "primary",
                        onClick: e[1] || (e[1] = (t) => x())
                      }, {
                        default: d(() => [
                          u(i(f(p)("search")), 1)
                        ]),
                        _: 1
                      }),
                      g(m, {
                        onClick: e[2] || (e[2] = (t) => U(R.value))
                      }, {
                        default: d(() => [
                          u(i(f(p)("reset")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ])
          ]),
          _: 1
        }),
        c("div", le, [
          g(ae, {
            title: L,
            selectable: !1
          }, {
            actions: d(() => [
              g(m, {
                type: "primary",
                onClick: j
              }, {
                default: d(() => [
                  u(i(f(p)("addSiteGroup")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          c("div", ie, [
            G((o(), n("div", de, [
              !s.loading && !s.data.length ? (o(), n("div", ce, i(f(p)("emptyData")), 1)) : (o(), n("div", pe, [
                (o(!0), n(_, null, b(s.data, (t) => (o(), n("div", {
                  key: t.group_id,
                  class: "group-card"
                }, [
                  c("div", ue, [
                    c("div", _e, [
                      c("div", ge, i(t.group_name), 1),
                      c("div", me, i(f(p)("createTime")) + " " + i(t.create_time), 1)
                    ]),
                    c("div", fe, [
                      g(m, {
                        type: "primary",
                        link: "",
                        onClick: (r) => O(t)
                      }, {
                        default: d(() => [
                          u(i(f(p)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      g(m, {
                        type: "primary",
                        link: "",
                        onClick: (r) => H(t.group_id)
                      }, {
                        default: d(() => [
                          u(i(f(p)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ])
                  ]),
                  c("div", he, [
                    c("div", ye, [
                      u(i(f(p)("appName")), 1),
                      t.app_list.length ? (o(), n(_, { key: 0 }, [
                        u(" · 共" + i(t.app_list.length) + "项应用", 1)
                      ], 64)) : C("", !0)
                    ]),
                    G((o(), n("div", ve, [
                      t.app_list.length ? (o(), n("div", ke, [
                        (o(!0), n(_, null, b(t.app_list, (r) => (o(), T(k, {
                          key: `m-${r.key}`,
                          effect: "plain"
                        }, {
                          default: d(() => [
                            u(i(r.title), 1)
                          ]),
                          _: 2
                        }, 1024))), 128)),
                        be
                      ])) : C("", !0),
                      t.app_list.length ? (o(), n(_, { key: 1 }, [
                        (o(!0), n(_, null, b(q(`app-${t.group_id}`, t.app_list), (r) => (o(), T(k, {
                          key: r.key,
                          effect: "plain"
                        }, {
                          default: d(() => [
                            u(i(r.title), 1)
                          ]),
                          _: 2
                        }, 1024))), 128)),
                        B(`app-${t.group_id}`, t.app_list).length ? (o(), T(N, {
                          key: 0,
                          placement: "top",
                          effect: "dark"
                        }, {
                          content: d(() => [
                            c("div", Ce, [
                              (o(!0), n(_, null, b(B(`app-${t.group_id}`, t.app_list), (r) => (o(), n("span", {
                                key: r.key
                              }, i(r.title), 1))), 128))
                            ])
                          ]),
                          default: d(() => [
                            $e
                          ]),
                          _: 2
                        }, 1024)) : C("", !0)
                      ], 64)) : (o(), n("span", xe, "无"))
                    ])), [
                      [P, `app-${t.group_id}`]
                    ])
                  ]),
                  c("div", Se, [
                    c("div", Te, [
                      u(i(f(p)("addonName")), 1),
                      t.addon_list.length ? (o(), n(_, { key: 0 }, [
                        u(" · 共" + i(t.addon_list.length) + "项插件", 1)
                      ], 64)) : C("", !0)
                    ]),
                    G((o(), n("div", Fe, [
                      t.addon_list.length ? (o(), n("div", Ne, [
                        (o(!0), n(_, null, b(t.addon_list, (r) => (o(), T(k, {
                          key: `m-${r.key}`,
                          effect: "plain"
                        }, {
                          default: d(() => [
                            u(i(r.title), 1)
                          ]),
                          _: 2
                        }, 1024))), 128)),
                        Ve
                      ])) : C("", !0),
                      t.addon_list.length ? (o(), n(_, { key: 1 }, [
                        (o(!0), n(_, null, b(q(`addon-${t.group_id}`, t.addon_list), (r) => (o(), T(k, {
                          key: r.key,
                          effect: "plain"
                        }, {
                          default: d(() => [
                            u(i(r.title), 1)
                          ]),
                          _: 2
                        }, 1024))), 128)),
                        B(`addon-${t.group_id}`, t.addon_list).length ? (o(), T(N, {
                          key: 0,
                          placement: "top",
                          effect: "dark"
                        }, {
                          content: d(() => [
                            c("div", ze, [
                              (o(!0), n(_, null, b(B(`addon-${t.group_id}`, t.addon_list), (r) => (o(), n("span", {
                                key: r.key
                              }, i(r.title), 1))), 128))
                            ])
                          ]),
                          default: d(() => [
                            Be
                          ]),
                          _: 2
                        }, 1024)) : C("", !0)
                      ], 64)) : (o(), n("span", De, "无"))
                    ])), [
                      [P, `addon-${t.group_id}`]
                    ])
                  ])
                ]))), 128))
              ]))
            ])), [
              [y, s.loading]
            ])
          ]),
          s.total ? (o(), n("div", Ee, [
            g(S, {
              "current-page": s.page,
              "onUpdate:current-page": e[4] || (e[4] = (t) => s.page = t),
              "page-size": s.limit,
              "onUpdate:page-size": e[5] || (e[5] = (t) => s.limit = t),
              layout: "total, sizes, prev, pager, next, jumper",
              total: s.total,
              onSizeChange: e[6] || (e[6] = (t) => x()),
              onCurrentChange: x
            }, null, 8, ["current-page", "page-size", "total"])
          ])) : C("", !0)
        ])
      ], 64);
    };
  }
});
const Oe = /* @__PURE__ */ te(Ge, [["__scopeId", "data-v-9906f8eb"]]);
export {
  Oe as default
};
