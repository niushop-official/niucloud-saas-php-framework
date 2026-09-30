import { defineComponent as be, ref as v, computed as L, watch as Te, resolveComponent as k, resolveDirective as xe, openBlock as r, createBlock as z, unref as a, withCtx as _, createElementVNode as o, createVNode as m, createTextVNode as y, toDisplayString as t, withDirectives as ae, createElementBlock as c, Fragment as b, createCommentVNode as w, withModifiers as Fe, normalizeClass as D, renderList as X, normalizeStyle as Pe, pushScopeId as Se, popScopeId as Ie, nextTick as Ae } from "vue";
import { t as l, O as Ce, P as Le, a as Ne } from "./core-shared-c6ad4e77.js";
import { ElMessage as G } from "element-plus";
import { ArrowRight as $e } from "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Re = (S) => (Se("data-v-0c0a8746"), S = S(), Ie(), S), Ee = ["element-loading-text"], Ve = { class: "import-body__inner" }, Be = { class: "import-card import-file-card" }, ze = { class: "upload-body" }, De = { class: "upload-actions" }, Ue = { class: "upload-info" }, je = { class: "upload-title" }, Oe = { class: "upload-desc" }, qe = { class: "upload-tip" }, Ke = { class: "upload-title" }, Xe = { class: "upload-desc" }, Ge = {
  key: 0,
  class: "file-too-large"
}, He = /* @__PURE__ */ Re(() => /* @__PURE__ */ o("div", { class: "file-card-divider" }, null, -1)), Je = { class: "preview-title" }, We = {
  key: 0,
  class: "preview-brief"
}, Ye = {
  key: 1,
  class: "preview-brief"
}, Qe = {
  key: 0,
  class: "preview-body"
}, Ze = {
  key: 0,
  class: "preview-error"
}, et = { class: "preview-stats" }, tt = { class: "preview-stat" }, lt = { class: "preview-stat" }, at = { class: "preview-stat" }, ot = { class: "preview-stat" }, st = { class: "preview-apps" }, nt = { class: "preview-app-label" }, it = { class: "preview-app-list" }, rt = {
  key: 1,
  class: "preview-stat"
}, ut = {
  key: 0,
  class: "preview-tip"
}, ct = { class: "import-card overwrite-row" }, dt = { class: "overwrite-row__text" }, pt = { class: "overwrite-row__title" }, vt = { class: "overwrite-row__desc" }, _t = {
  key: 0,
  class: "import-card import-result"
}, mt = { class: "result-header" }, ft = { class: "result-title" }, ht = { class: "legend" }, yt = { class: "legend__item" }, wt = { class: "legend__item" }, gt = { class: "legend__item" }, Mt = { class: "ratio-bar" }, kt = { class: "section-head" }, bt = { class: "section-head__title" }, Tt = { class: "section-head__meta" }, xt = { class: "failure-list" }, Ft = ["title"], Pt = { class: "failure-list__reason" }, St = { class: "dialog-footer" }, It = /* @__PURE__ */ be({
  __name: "import-menu",
  props: {
    appType: {
      type: String,
      default: "admin"
    }
  },
  emits: ["complete"],
  setup(S, { expose: oe, emit: se }) {
    const ne = S, I = v(!1), T = v(!1), N = v(!1), A = v(), f = v(null), d = v(null), ie = L(() => {
      const e = d.value || {}, s = Number(e.total || 0);
      if (!s)
        return [];
      const n = Number(e.insert || 0) + Number(e.update || 0) + Number(e.skip || 0), p = Number(e.fail || 0);
      return [
        { key: "ok", value: n },
        { key: "fail", value: p }
      ].filter((u) => u.value > 0).map((u) => ({ key: u.key, width: `${u.value / s * 100}%` }));
    }), re = L(() => {
      const e = d.value || {}, s = Number(e.total || 0), n = Number(e.fail || 0);
      return s > 0 ? (n / s * 100).toFixed(1) : "0.0";
    }), $ = 2 * 1024 * 1024, U = v($), j = v(!1), H = v(!1), F = v(!1), J = 2e3, g = v(!1), R = v(!1), E = v(!1), O = v([]), x = v(""), q = v(!1), K = () => ({ total: 0, dir: 0, menu: 0, button: 0, addons: [], hasSystem: !1 }), h = v(K()), W = (e) => e ? e >= 1024 * 1024 * 1024 ? `${(e / 1024 / 1024 / 1024).toFixed(2)} GB` : e >= 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(2)} MB` : e >= 1024 ? `${(e / 1024).toFixed(2)} KB` : `${e} B` : "-", Y = L(() => W(U.value)), ue = L(() => l(j.value ? "importMenuLimitAdjustPhp" : "importMenuLimitAdjustSplit")), Q = L(() => l(j.value ? "importMenuFileTooLarge" : "importMenuFileOverMax")), ce = (e) => e === "0" ? l("menuTypeDir") : e === "1" ? l("menuTypeMenu") : e === "2" ? l("menuTypeButton") : l("menuType"), de = (e) => e === "0" ? "info" : e === "2" ? "warning" : "success", V = () => {
      O.value = [], x.value = "", q.value = !1, h.value = K();
    }, Z = (e, s) => {
      e.forEach((n) => {
        if (!n || typeof n != "object")
          return;
        s.total++;
        const p = String(n.menu_type ?? "");
        p === "0" ? s.dir++ : p === "1" ? s.menu++ : p === "2" && s.button++;
        const M = `${n.addon ?? ""}`;
        M === "" ? s.hasSystem = !0 : s.addons.includes(M) || s.addons.push(M), Array.isArray(n.children) && n.children.length && Z(n.children, s);
      });
    }, ee = (e, s, n, p = "") => {
      const M = [];
      return e.forEach((u, P) => {
        if (n.count >= s || !u || typeof u != "object")
          return;
        n.count++;
        const C = {
          __key: `${p}/${P}-${u.menu_key ?? ""}`,
          menu_name: `${u.menu_name ?? ""}`,
          menu_type: String(u.menu_type ?? ""),
          menu_key: `${u.menu_key ?? ""}`,
          api_url: `${u.api_url ?? ""}`,
          addon: `${u.addon ?? ""}`
        };
        Array.isArray(u.children) && u.children.length && (C.children = ee(u.children, s, n, C.__key)), M.push(C);
      }), M;
    }, pe = async () => {
      if (V(), !!f.value) {
        R.value = !0;
        try {
          const e = await f.value.text();
          let s = null;
          try {
            s = JSON.parse(e);
          } catch {
            x.value = l("importMenuPreviewInvalid");
            return;
          }
          if (!Array.isArray(s)) {
            x.value = l("importMenuPreviewInvalid");
            return;
          }
          if (!s.length) {
            x.value = l("importMenuPreviewEmpty");
            return;
          }
          const n = K();
          Z(s, n), h.value = n;
          const p = { count: 0 };
          O.value = ee(s, J, p), q.value = n.total > J;
        } catch {
          x.value = l("importMenuPreviewInvalid");
        } finally {
          R.value = !1;
        }
      }
    }, ve = async () => {
      if (g.value) {
        g.value = !1;
        return;
      }
      E.value = !0, await new Promise((e) => requestAnimationFrame(() => requestAnimationFrame(e))), g.value = !0, await Ae(), E.value = !1;
    }, _e = () => {
      H.value || Ce().then((e) => {
        const s = (e == null ? void 0 : e.data) || {}, n = Number(s.max_upload_byte || 0), p = Number(s.limit_byte || 0) || Math.min(n > 0 ? n : $, $);
        p > 0 && (U.value = p), j.value = s.limit_source ? s.limit_source === "php" : n > 0 && n < $, H.value = !0;
      }).catch(() => {
      });
    };
    Te(I, (e) => {
      e && _e();
    });
    const me = async (e) => {
      d.value = null, f.value = e.raw || null, F.value = !1, f.value && f.value.size > U.value && (F.value = !0, G.error(Q.value)), await pe();
    }, fe = () => {
      f.value = null, F.value = !1, g.value = !1, V();
    }, he = () => {
      var e;
      f.value = null, d.value = null, F.value = !1, g.value = !1, V(), (e = A.value) == null || e.clearFiles();
    }, ye = (e) => {
      var n, p;
      (n = A.value) == null || n.clearFiles();
      const s = e[0];
      s && ((p = A.value) == null || p.handleStart(s));
    }, we = () => {
      var e;
      T.value = !1, N.value = !1, f.value = null, d.value = null, F.value = !1, g.value = !1, V(), (e = A.value) == null || e.clearFiles();
    }, ge = () => {
      if (T.value)
        return;
      if (!f.value) {
        G.error(l("importMenuFileRequired"));
        return;
      }
      if (F.value) {
        G.error(l("importMenuFileTooLarge"));
        return;
      }
      g.value = !1;
      const e = new FormData();
      e.append("file", f.value), e.append("overwrite", N.value ? "1" : "0"), T.value = !0, Le(ne.appType, e).then((s) => {
        T.value = !1, d.value = s.data || null, se("complete");
      }).catch(() => {
        T.value = !1;
      });
    };
    return oe({
      showDialog: I
    }), (e, s) => {
      const n = k("el-button"), p = k("el-upload"), M = k("el-icon"), u = k("el-tag"), P = k("el-table-column"), C = k("el-table"), Me = k("el-switch"), te = k("el-scrollbar"), ke = k("el-dialog"), le = xe("loading");
      return r(), z(ke, {
        modelValue: I.value,
        "onUpdate:modelValue": s[2] || (s[2] = (i) => I.value = i),
        title: a(l)("importMenu"),
        width: "760px",
        "destroy-on-close": !0,
        "close-on-click-modal": !T.value,
        onClosed: we
      }, {
        footer: _(() => [
          o("span", St, [
            m(n, {
              onClick: s[1] || (s[1] = (i) => I.value = !1)
            }, {
              default: _(() => [
                y(t(a(l)("cancel")), 1)
              ]),
              _: 1
            }),
            m(n, {
              type: "primary",
              loading: T.value,
              onClick: ge
            }, {
              default: _(() => [
                y(t(a(l)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: _(() => [
          ae((r(), c("div", {
            "element-loading-text": a(l)("importMenuImporting"),
            class: "import-body"
          }, [
            m(te, { class: "import-scrollbar" }, {
              default: _(() => [
                o("div", Ve, [
                  o("div", Be, [
                    m(p, {
                      ref_key: "uploadRef",
                      ref: A,
                      class: "w-full import-upload",
                      drag: "",
                      "auto-upload": !1,
                      limit: 1,
                      "show-file-list": !1,
                      accept: ".json",
                      "on-change": me,
                      "on-remove": fe,
                      "on-exceed": ye
                    }, {
                      default: _(() => {
                        var i, B;
                        return [
                          o("div", ze, [
                            o("div", De, [
                              m(n, {
                                type: "primary",
                                class: "upload-badge"
                              }, {
                                default: _(() => [
                                  y(t(a(l)("importMenuLocalUpload")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            o("div", Ue, [
                              f.value ? (r(), c(b, { key: 1 }, [
                                o("div", Ke, t((i = f.value) == null ? void 0 : i.name), 1),
                                o("div", Xe, t(W(((B = f.value) == null ? void 0 : B.size) ?? 0)) + " · " + t(a(l)("importMenuReplaceTips")), 1)
                              ], 64)) : (r(), c(b, { key: 0 }, [
                                o("div", je, t(a(l)("importMenuUploadTitle")), 1),
                                o("div", Oe, [
                                  y(t(a(l)("importMenuUploadDesc")), 1),
                                  a(Y) ? (r(), c(b, { key: 0 }, [
                                    y(t(a(l)("importMenuUploadLimitInline")) + t(a(Y)), 1)
                                  ], 64)) : w("", !0)
                                ]),
                                o("div", qe, t(a(ue)), 1)
                              ], 64))
                            ]),
                            f.value ? (r(), z(n, {
                              key: 0,
                              link: "",
                              class: "upload-remove",
                              onClick: Fe(he, ["stop"])
                            }, {
                              default: _(() => [
                                y(t(a(l)("importMenuRemoveFile")), 1)
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : w("", !0)
                          ])
                        ];
                      }),
                      _: 1
                    }, 512),
                    F.value ? (r(), c("div", Ge, t(a(Q)), 1)) : w("", !0),
                    f.value ? (r(), c(b, { key: 1 }, [
                      He,
                      o("div", {
                        class: "preview-header",
                        onClick: ve
                      }, [
                        o("span", Je, [
                          m(M, {
                            class: D(["preview-arrow", { "is-open": g.value }])
                          }, {
                            default: _(() => [
                              m(a($e))
                            ]),
                            _: 1
                          }, 8, ["class"]),
                          y(" " + t(a(l)("importMenuPreview")), 1)
                        ]),
                        R.value || E.value ? (r(), c("span", We, t(a(l)("importMenuPreviewParsing")), 1)) : !x.value && !g.value ? (r(), c("span", Ye, t(a(l)("importMenuPreviewTotal")) + "：" + t(h.value.total), 1)) : w("", !0)
                      ]),
                      g.value ? ae((r(), c("div", Qe, [
                        x.value ? (r(), c("div", Ze, t(x.value), 1)) : (r(), c(b, { key: 1 }, [
                          o("div", et, [
                            o("span", tt, t(a(l)("importMenuPreviewTotal")) + "：" + t(h.value.total), 1),
                            o("span", lt, t(a(l)("menuTypeDir")) + "：" + t(h.value.dir), 1),
                            o("span", at, t(a(l)("menuTypeMenu")) + "：" + t(h.value.menu), 1),
                            o("span", ot, t(a(l)("menuTypeButton")) + "：" + t(h.value.button), 1)
                          ]),
                          o("div", st, [
                            o("span", nt, t(a(l)("importMenuPreviewApp")) + "：", 1),
                            o("div", it, [
                              h.value.hasSystem ? (r(), z(u, {
                                key: 0,
                                size: "small",
                                type: "info"
                              }, {
                                default: _(() => [
                                  y(t(a(l)("exportMenuSystem")), 1)
                                ]),
                                _: 1
                              })) : w("", !0),
                              (r(!0), c(b, null, X(h.value.addons, (i) => (r(), z(u, {
                                key: i,
                                size: "small"
                              }, {
                                default: _(() => [
                                  y(t(i), 1)
                                ]),
                                _: 2
                              }, 1024))), 128)),
                              !h.value.hasSystem && !h.value.addons.length ? (r(), c("span", rt, "-")) : w("", !0)
                            ])
                          ]),
                          m(C, {
                            data: O.value,
                            "row-key": "__key",
                            size: "small",
                            "max-height": "240",
                            "tree-props": { children: "children" },
                            class: "preview-table"
                          }, {
                            default: _(() => [
                              m(P, {
                                prop: "menu_name",
                                label: a(l)("menuName"),
                                "min-width": "160"
                              }, null, 8, ["label"]),
                              m(P, {
                                label: a(l)("menuType"),
                                width: "70",
                                align: "center"
                              }, {
                                default: _(({ row: i }) => [
                                  m(u, {
                                    size: "small",
                                    type: de(i.menu_type)
                                  }, {
                                    default: _(() => [
                                      y(t(ce(i.menu_type)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["type"])
                                ]),
                                _: 1
                              }, 8, ["label"]),
                              m(P, {
                                prop: "menu_key",
                                label: a(l)("menuKey"),
                                "min-width": "140"
                              }, null, 8, ["label"]),
                              m(P, {
                                prop: "api_url",
                                label: a(l)("authId"),
                                "min-width": "140"
                              }, null, 8, ["label"]),
                              m(P, {
                                label: a(l)("addon"),
                                width: "110"
                              }, {
                                default: _(({ row: i }) => [
                                  y(t(i.addon || a(l)("exportMenuSystem")), 1)
                                ]),
                                _: 1
                              }, 8, ["label"])
                            ]),
                            _: 1
                          }, 8, ["data"]),
                          q.value ? (r(), c("div", ut, t(a(l)("importMenuPreviewTruncated")), 1)) : w("", !0)
                        ], 64))
                      ])), [
                        [le, R.value || E.value]
                      ]) : w("", !0)
                    ], 64)) : w("", !0)
                  ]),
                  o("div", ct, [
                    o("div", dt, [
                      o("div", pt, t(a(l)("importMenuOverwrite")), 1),
                      o("div", vt, t(a(l)("importMenuOverwriteTips")), 1)
                    ]),
                    m(Me, {
                      modelValue: N.value,
                      "onUpdate:modelValue": s[0] || (s[0] = (i) => N.value = i)
                    }, null, 8, ["modelValue"])
                  ]),
                  d.value ? (r(), c("div", _t, [
                    o("div", mt, [
                      o("span", ft, t(a(l)("importMenuResult")), 1),
                      o("span", {
                        class: D(["result-status", d.value.fail ? "is-danger" : "is-success"])
                      }, t(d.value.fail ? a(l)("importMenuHasFail") : a(l)("importMenuDone")), 3)
                    ]),
                    o("div", ht, [
                      o("span", yt, t(a(l)("importMenuTotal")) + " " + t(d.value.total), 1),
                      o("span", wt, t(a(l)("importMenuInsert")) + " " + t(d.value.insert), 1),
                      o("span", gt, t(a(l)("importMenuSkip")) + " " + t(d.value.skip), 1),
                      o("span", {
                        class: D(["legend__item", { "is-fail": d.value.fail }])
                      }, t(a(l)("importMenuFail")) + " " + t(d.value.fail), 3)
                    ]),
                    o("div", Mt, [
                      (r(!0), c(b, null, X(a(ie), (i) => (r(), c("div", {
                        key: i.key,
                        class: D(["ratio-bar__seg", `seg--${i.key}`]),
                        style: Pe({ width: i.width })
                      }, null, 6))), 128))
                    ]),
                    d.value.fail_list && d.value.fail_list.length ? (r(), c(b, { key: 0 }, [
                      o("div", kt, [
                        o("span", bt, t(a(l)("importMenuFailList")), 1),
                        o("span", Tt, t(a(l)("importMenuFail")) + " " + t(d.value.fail) + " " + t(a(l)("importMenuUnit")) + " · " + t(a(l)("importMenuFailRatio")) + " " + t(a(re)) + "% ", 1)
                      ]),
                      o("div", xt, [
                        m(te, { "max-height": "240px" }, {
                          default: _(() => [
                            (r(!0), c(b, null, X(d.value.fail_list, (i, B) => (r(), c("div", {
                              key: B,
                              class: "failure-list__row"
                            }, [
                              o("div", {
                                class: "failure-list__name",
                                title: i.menu_name || i.menu_key
                              }, t(i.menu_name || i.menu_key || "-"), 9, Ft),
                              o("span", Pt, t(i.reason), 1)
                            ]))), 128))
                          ]),
                          _: 1
                        })
                      ])
                    ], 64)) : w("", !0)
                  ])) : w("", !0)
                ])
              ]),
              _: 1
            })
          ], 8, Ee)), [
            [le, T.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title", "close-on-click-modal"]);
    };
  }
});
const Bt = /* @__PURE__ */ Ne(It, [["__scopeId", "data-v-0c0a8746"]]);
export {
  Bt as default
};
