import { defineComponent as Oe, ref as d, reactive as ke, computed as qe, watch as Ae, resolveComponent as _, resolveDirective as Ge, openBlock as c, createElementBlock as g, createVNode as e, withCtx as l, createElementVNode as p, toDisplayString as i, unref as n, createTextVNode as v, withDirectives as R, createBlock as M, createCommentVNode as ae, Fragment as H, renderList as xe, normalizeClass as U, vShow as J, pushScopeId as He, popScopeId as Je } from "vue";
import { a as Ke, _ as Qe } from "./success_icon-605a2b43.js";
import { t, f$ as We, g0 as Xe, g1 as Ye, g2 as Ze, g3 as et, g4 as tt, g5 as be, _ as lt } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as L, ElMessage as at } from "element-plus";
import { useRoute as nt } from "vue-router";
import { T as ot, _ as st } from "./dark-eb307d84.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ye = (O) => (He("data-v-7ff85649"), O = O(), Je(), O), rt = { class: "main-container" }, it = { class: "flex justify-between items-center" }, ut = { class: "text-page-title" }, ct = {
  key: 0,
  class: "multi-hidden"
}, dt = {
  key: 1,
  class: "multi-hidden"
}, pt = {
  key: 2,
  class: "multi-hidden"
}, mt = {
  key: 0,
  class: "multi-hidden"
}, vt = { key: 1 }, ft = { class: "mt-[10px] flex items-center" }, _t = { class: "mt-[16px] flex justify-end" }, gt = {
  class: "h-[400px]",
  style: { overflow: "auto" }
}, ht = { class: "flex flex-col" }, kt = { class: "bg-[#fff] my-3" }, xt = { class: "px-[20px] pt-[10px] text-[14px] el-table" }, bt = {
  key: 0,
  style: { height: "calc(300px)", overflow: "auto" }
}, yt = { key: 1 }, wt = { style: { height: "calc(300px)", overflow: "auto" } }, Ct = { class: "h-[370px] mt-[30px]" }, Tt = { class: "mt-[20px]" }, Bt = /* @__PURE__ */ ye(() => /* @__PURE__ */ p("img", {
  src: Ke,
  alt: ""
}, null, -1)), It = { class: "mt-[20px] h-[370px]" }, St = /* @__PURE__ */ ye(() => /* @__PURE__ */ p("img", {
  src: Qe,
  alt: ""
}, null, -1)), Dt = {
  key: 0,
  class: "dialog-footer"
}, $t = {
  key: 1,
  class: "dialog-footer"
}, Vt = { class: "dialog-footer" }, Et = /* @__PURE__ */ Oe({
  __name: "backup_records",
  setup(O) {
    const we = nt(), Ce = d(Date.now()), Te = we.meta.title, ne = d(), K = d([]), Be = d(), b = d(!1);
    d(null);
    const u = ke({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        content: ""
      }
    }), B = d(!1), m = d("check"), z = d(!1), h = d(null), I = d(null), Q = d(!1), F = d(!1), C = d(0), oe = d(0);
    let W = [], q = [];
    const Ie = (o) => {
      o && (o.resetFields(), y());
    }, Se = (o) => {
      K.value = o;
    }, y = (o = 1) => {
      u.loading = !0, u.page = o, We({
        page: u.page,
        limit: u.limit,
        ...u.searchParam
      }).then((a) => {
        u.loading = !1, u.data = a.data.data, u.total = a.data.total;
      }).catch(() => {
        u.loading = !1;
      });
    };
    y();
    const S = d(0), De = () => {
      L.confirm(
        t("manualBackupTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        W = [], C.value = 0, S.value = 1, B.value = !0, F.value = !0, m.value = "check", z.value = !1, re();
      });
    }, A = d(!1), k = d(null), D = d(0);
    let f = null;
    const X = qe(() => {
      const o = D.value, a = Math.floor(o / 60), r = o % 60;
      return a > 0 ? `${a}分${r}秒` : `${r}秒`;
    }), Y = d(""), se = (o = "") => {
      z.value || (o == "" && (C.value = 1, m.value = "execute"), Xe({ task: o }).then((a) => {
        const r = a.data;
        if (o == "") {
          I.value.execute("clear"), I.value.execute("开始执行"), A.value = !0;
          const x = localStorage.getItem("manual_back_start_time");
          if (x)
            k.value = Number(x);
          else {
            const w = Date.now();
            k.value = w, localStorage.setItem("manual_back_start_time", String(w));
          }
          D.value = Math.floor((Date.now() - k.value) / 1e3), f && clearInterval(f), f = setInterval(() => {
            k.value && (D.value = Math.floor((Date.now() - k.value) / 1e3));
          }, 1e3);
        }
        r.content && !W.includes(r.content) && (W.push(r.content), I.value.pushMessage({ content: `${r.content}` })), r.task == "end" ? (C.value = 2, setTimeout(() => {
          C.value = 3, m.value = "complete", A.value = !0, f && clearInterval(f), localStorage.removeItem("manual_back_start_time"), y(), b.value = !1;
        }, 1500)) : r.task == "fail" ? (setTimeout(() => {
          y(), b.value = !1;
        }, 2e3), Y.value = r.content, m.value = "error", A.value = !0, f && (clearInterval(f), f = null), k.value && (D.value = Math.floor((Date.now() - k.value) / 1e3)), localStorage.removeItem("manual_back_start_time")) : setTimeout(() => {
          se(r.task);
        }, 2e3);
      }).catch(() => {
        b.value = !1, u.loading = !1;
      }));
    }, $e = (o) => {
      L.confirm(
        t("restoreTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        C.value = 0, q = [], S.value = 2, oe.value = o.id, m.value = "check", z.value = !1, Ve(o.id);
      });
    }, Ve = (o) => {
      Ye({ id: o }).then(({ data: a }) => {
        a && (B.value = !0, F.value = !0, re());
      });
    }, re = () => {
      Ze({}).then(({ data: o }) => {
        h.value = o, Q.value = !o.is_pass, F.value = !1;
      });
    }, ie = (o, a = "") => {
      z.value || (a == "" && (C.value = 1, m.value = "execute"), et({
        id: o,
        task: a
      }).then((r) => {
        const x = r.data;
        if (a == "") {
          F.value = !1, I.value.execute("clear"), I.value.execute("开始执行");
          const w = localStorage.getItem("manual_back_start_time");
          if (w)
            k.value = Number(w);
          else {
            const E = Date.now();
            k.value = E, localStorage.setItem("manual_back_start_time", String(E));
          }
          D.value = Math.floor((Date.now() - k.value) / 1e3), f && clearInterval(f), f = setInterval(() => {
            k.value && (D.value = Math.floor((Date.now() - k.value) / 1e3));
          }, 1e3);
        }
        x.content && !q.includes(x.content) && (q.push(x.content), I.value.pushMessage({ content: `${x.content}` })), x.task == "end" ? (C.value = 2, setTimeout(() => {
          C.value = 3, m.value = "complete", f && clearInterval(f), localStorage.removeItem("manual_back_start_time"), y(), b.value = !1;
        }, 1500)) : x.task == "fail" ? (setTimeout(() => {
          y(), b.value = !1;
        }, 2e3), Y.value = x.content, m.value = "error", f && (clearInterval(f), f = null), k.value && (D.value = Math.floor((Date.now() - k.value) / 1e3)), localStorage.removeItem("manual_back_start_time")) : setTimeout(() => {
          q = [], ie(o, x.task);
        }, 2e3);
      }).catch(() => {
        b.value = !1, u.loading = !1;
      }));
    }, ue = d(!1), ce = () => {
      m.value = "execute", ue.value = !0;
    }, Ee = (o) => {
      m.value == "execute" && !ue.value ? L.confirm(
        t("showDialogCloseTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        I.value.execute("clear"), z.value = !0, o(), localStorage.removeItem("manual_back_start_time"), f && clearInterval(f), f = null, k.value = null, D.value = 0;
      }).catch(() => {
      }) : (m.value == "complete" && setTimeout(() => {
        location.reload();
      }, 500), o());
    };
    let Z = null;
    const de = new ot(), Re = (o, a, r, x, w) => {
      if (a == "开始执行") {
        r(de);
        const E = Me(["/", "——", "\\", "|"]);
        Z = setInterval(() => {
          de.flush("> " + E.next().value);
        }, 150);
      }
    }, Me = (o) => {
      let a = 0;
      return {
        next() {
          return a + 1 == o.length && (a = 0), { value: o[a++] };
        }
      };
    };
    Ae(() => B.value, () => {
      B.value || (m.value = "execute", Z && clearInterval(Z));
    });
    const N = d(!1), j = d(!1), V = ke({
      id: 0,
      remark: ""
    }), Fe = (o) => {
      V.id = o.id, V.remark = o.remark, N.value = !0;
    }, Pe = () => {
      j.value = !0, tt({
        id: V.id,
        remark: V.remark
      }).then(() => {
        N.value = !1, j.value = !1, y();
      }).catch(() => {
        j.value = !1;
      });
    }, Ue = (o) => {
      L.confirm(
        t("deleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        b.value || (b.value = !0, u.loading = !0, be({
          ids: o
        }).then(() => {
          y(), b.value = !1;
        }).catch(() => {
          b.value = !1, u.loading = !1;
        }));
      });
    }, ze = () => {
      if (K.value.length == 0) {
        at({
          type: "warning",
          message: `${t("batchEmptySelectedTips")}`
        });
        return;
      }
      L.confirm(
        t("deleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        if (u.loading = !0, b.value)
          return;
        b.value = !0;
        const o = [];
        K.value.forEach((a) => {
          o.push(a.id);
        }), be({
          ids: o
        }).then(() => {
          y(), b.value = !1;
        }).catch(() => {
          b.value = !1, u.loading = !1;
        });
      });
    };
    return (o, a) => {
      const r = _("el-button"), x = _("el-input"), w = _("el-form-item"), E = _("el-form"), pe = _("el-card"), $ = _("el-table-column"), ee = _("el-tag"), Ne = _("el-table"), je = _("el-pagination"), P = _("el-step"), Le = _("el-steps"), T = _("el-col"), te = _("el-row"), me = _("Select"), G = _("el-icon"), ve = _("CloseBold"), fe = _("el-scrollbar"), _e = _("el-result"), ge = _("el-dialog"), le = Ge("loading");
      return c(), g("div", rt, [
        e(pe, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: l(() => [
            p("div", it, [
              p("span", ut, i(n(Te)), 1),
              e(r, {
                type: "primary",
                onClick: De
              }, {
                default: l(() => [
                  v(i(n(t)("manualBackup")), 1)
                ]),
                _: 1
              })
            ]),
            e(pe, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: l(() => [
                e(E, {
                  inline: !0,
                  model: u.searchParam,
                  ref_key: "searchFormRef",
                  ref: ne
                }, {
                  default: l(() => [
                    e(w, {
                      label: n(t)("content"),
                      prop: "content"
                    }, {
                      default: l(() => [
                        e(x, {
                          modelValue: u.searchParam.content,
                          "onUpdate:modelValue": a[0] || (a[0] = (s) => u.searchParam.content = s),
                          modelModifiers: { trim: !0 },
                          placeholder: n(t)("contentPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(w, null, {
                      default: l(() => [
                        e(r, {
                          type: "primary",
                          onClick: a[1] || (a[1] = (s) => y())
                        }, {
                          default: l(() => [
                            v(i(n(t)("search")), 1)
                          ]),
                          _: 1
                        }),
                        e(r, {
                          onClick: a[2] || (a[2] = (s) => Ie(ne.value))
                        }, {
                          default: l(() => [
                            v(i(n(t)("reset")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model"])
              ]),
              _: 1
            }),
            R((c(), M(Ne, {
              data: u.data,
              size: "large",
              ref_key: "tableRef",
              ref: Be,
              onSelectionChange: Se
            }, {
              empty: l(() => [
                p("span", null, i(u.loading ? "" : n(t)("emptyData")), 1)
              ]),
              default: l(() => [
                e($, {
                  type: "selection",
                  width: "55"
                }),
                e($, {
                  prop: "id",
                  label: n(t)("id"),
                  width: "120"
                }, null, 8, ["label"]),
                e($, {
                  prop: "content",
                  label: n(t)("操作"),
                  width: "120",
                  align: "left"
                }, {
                  default: l(({ row: s }) => [
                    s.content == "手动备份" ? (c(), g("span", ct, [
                      e(ee, { type: "primary" }, {
                        default: l(() => [
                          v(i(s.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])) : s.content == "自动备份" ? (c(), g("span", dt, [
                      e(ee, { type: "success" }, {
                        default: l(() => [
                          v(i(s.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (c(), g("span", pt, [
                      e(ee, { type: "warning" }, {
                        default: l(() => [
                          v(i(s.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]))
                  ]),
                  _: 1
                }, 8, ["label"]),
                e($, {
                  prop: "version",
                  label: n(t)("currentVersion"),
                  width: "120"
                }, null, 8, ["label"]),
                e($, {
                  prop: "backup_dir",
                  label: n(t)("backupDir"),
                  width: "220"
                }, null, 8, ["label"]),
                e($, {
                  prop: "complete_time",
                  label: n(t)("completeTime"),
                  width: "220"
                }, null, 8, ["label"]),
                e($, {
                  prop: "remark",
                  label: n(t)("remark")
                }, {
                  default: l(({ row: s }) => [
                    s.remark ? (c(), g("span", mt, i(s.remark), 1)) : (c(), g("span", vt, i(n(t)("remarkEmpty")), 1))
                  ]),
                  _: 1
                }, 8, ["label"]),
                e($, {
                  label: n(t)("operation"),
                  align: "right",
                  fixed: "right",
                  width: "200"
                }, {
                  default: l(({ row: s }) => [
                    e(r, {
                      type: "primary",
                      link: "",
                      onClick: (he) => Fe(s)
                    }, {
                      default: l(() => [
                        v(i(n(t)("remark")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    e(r, {
                      type: "primary",
                      link: "",
                      onClick: (he) => $e(s)
                    }, {
                      default: l(() => [
                        v(i(n(t)("restore")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    e(r, {
                      type: "primary",
                      link: "",
                      onClick: (he) => Ue(s.id)
                    }, {
                      default: l(() => [
                        v(i(n(t)("delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [le, u.loading]
            ]),
            p("div", ft, [
              e(r, {
                onClick: ze,
                size: "small"
              }, {
                default: l(() => [
                  v(i(n(t)("batchDelete")), 1)
                ]),
                _: 1
              })
            ]),
            p("div", _t, [
              e(je, {
                "current-page": u.page,
                "onUpdate:currentPage": a[3] || (a[3] = (s) => u.page = s),
                "page-size": u.limit,
                "onUpdate:pageSize": a[4] || (a[4] = (s) => u.limit = s),
                layout: "total, sizes, prev, pager, next, jumper",
                total: u.total,
                onSizeChange: a[5] || (a[5] = (s) => y()),
                onCurrentChange: y
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        e(ge, {
          modelValue: B.value,
          "onUpdate:modelValue": a[10] || (a[10] = (s) => B.value = s),
          title: S.value == 1 ? n(t)("manualBackupTitle") : n(t)("restoreTitle"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "show-close": !0,
          "before-close": Ee
        }, {
          footer: l(() => [
            m.value == "check" ? (c(), g("div", Dt, [
              S.value == 1 ? (c(), M(r, {
                key: 0,
                type: "primary",
                loading: F.value,
                disabled: Q.value,
                onClick: a[8] || (a[8] = (s) => se())
              }, {
                default: l(() => [
                  v(i(n(t)("nextStep")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"])) : (c(), M(r, {
                key: 1,
                type: "primary",
                loading: F.value,
                disabled: Q.value,
                onClick: a[9] || (a[9] = (s) => ie(oe.value))
              }, {
                default: l(() => [
                  v(i(n(t)("nextStep")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"]))
            ])) : ae("", !0),
            m.value == "execute" ? (c(), g("div", $t, [
              e(r, {
                type: "primary",
                loading: A.value,
                class: "!w-[140px]"
              }, {
                default: l(() => [
                  v("已用时 " + i(X.value), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])) : ae("", !0)
          ]),
          default: l(() => [
            m.value != "error" && m.value != "complete" ? (c(), M(Le, {
              key: 0,
              active: C.value,
              "align-center": "",
              class: "number-of-steps",
              "finish-status": "success",
              "process-status": "process"
            }, {
              default: l(() => [
                S.value == 1 ? (c(), g(H, { key: 0 }, [
                  e(P, {
                    title: n(t)("testDirectoryPermissions")
                  }, null, 8, ["title"]),
                  e(P, {
                    title: n(t)("startBackUp")
                  }, null, 8, ["title"]),
                  e(P, {
                    title: n(t)("backUpEnd")
                  }, null, 8, ["title"])
                ], 64)) : (c(), g(H, { key: 1 }, [
                  e(P, {
                    title: n(t)("testDirectoryPermissions")
                  }, null, 8, ["title"]),
                  e(P, {
                    title: n(t)("startUpgrade")
                  }, null, 8, ["title"]),
                  e(P, {
                    title: n(t)("upgradeEnd")
                  }, null, 8, ["title"])
                ], 64))
              ]),
              _: 1
            }, 8, ["active"])) : ae("", !0),
            p("div", gt, [
              R(p("div", ht, [
                e(fe, null, {
                  default: l(() => [
                    p("div", kt, [
                      p("div", xt, [
                        e(te, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                          default: l(() => [
                            e(T, { span: 18 }, {
                              default: l(() => [
                                p("span", null, i(n(t)("upgrade.path")), 1)
                              ]),
                              _: 1
                            }),
                            e(T, { span: 3 }, {
                              default: l(() => [
                                p("span", null, i(n(t)("upgrade.demand")), 1)
                              ]),
                              _: 1
                            }),
                            e(T, { span: 3 }, {
                              default: l(() => [
                                p("span", null, i(n(t)("status")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        h.value && h.value.dir ? (c(), g("div", bt, [
                          (c(!0), g(H, null, xe(h.value.dir.is_readable, (s) => (c(), M(te, { class: "pb-[10px] items pl-[15px]" }, {
                            default: l(() => [
                              e(T, { span: 18 }, {
                                default: l(() => [
                                  p("span", null, i(s.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              e(T, { span: 3 }, {
                                default: l(() => [
                                  p("span", {
                                    class: U({ "mx-[10px]": h.value.dir.is_readable.length + h.value.dir.is_write.length > 9 })
                                  }, i(n(t)("upgrade.readable")), 3)
                                ]),
                                _: 1
                              }),
                              e(T, { span: 3 }, {
                                default: l(() => [
                                  s.status ? (c(), g("span", {
                                    key: 0,
                                    class: U({ "mx-[20px]": h.value.dir.is_readable.length + h.value.dir.is_write.length > 9 })
                                  }, [
                                    e(G, { color: "green" }, {
                                      default: l(() => [
                                        e(me)
                                      ]),
                                      _: 1
                                    })
                                  ], 2)) : (c(), g("span", {
                                    key: 1,
                                    class: U({ "mx-[20px]": h.value.dir.is_readable.length + h.value.dir.is_write.length > 9 })
                                  }, [
                                    e(G, { color: "red" }, {
                                      default: l(() => [
                                        e(ve)
                                      ]),
                                      _: 1
                                    })
                                  ], 2))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))), 256)),
                          (c(!0), g(H, null, xe(h.value.dir.is_write, (s) => (c(), M(te, { class: "pb-[10px] items pl-[15px]" }, {
                            default: l(() => [
                              e(T, { span: 18 }, {
                                default: l(() => [
                                  p("span", null, i(s.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              e(T, { span: 3 }, {
                                default: l(() => [
                                  p("span", {
                                    class: U({ "mx-[10px]": h.value.dir.is_readable.length + h.value.dir.is_write.length > 9 })
                                  }, i(n(t)("upgrade.write")), 3)
                                ]),
                                _: 1
                              }),
                              e(T, { span: 3 }, {
                                default: l(() => [
                                  s.status ? (c(), g("span", {
                                    key: 0,
                                    class: U({ "mx-[20px]": h.value.dir.is_readable.length + h.value.dir.is_write.length > 9 })
                                  }, [
                                    e(G, { color: "green" }, {
                                      default: l(() => [
                                        e(me)
                                      ]),
                                      _: 1
                                    })
                                  ], 2)) : (c(), g("span", {
                                    key: 1,
                                    class: U({ "mx-[20px]": h.value.dir.is_readable.length + h.value.dir.is_write.length > 9 })
                                  }, [
                                    e(G, { color: "red" }, {
                                      default: l(() => [
                                        e(ve)
                                      ]),
                                      _: 1
                                    })
                                  ], 2))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))), 256))
                        ])) : (c(), g("div", yt, [
                          R(p("div", wt, null, 512), [
                            [le, !0]
                          ])
                        ]))
                      ])
                    ])
                  ]),
                  _: 1
                })
              ], 512), [
                [J, m.value == "check"]
              ]),
              R(p("div", Ct, [
                e(n(st), {
                  ref_key: "terminalRef",
                  ref: I,
                  name: `backup-restore-${Ce.value}`,
                  context: "",
                  "init-log": null,
                  "show-header": !1,
                  "show-log-time": !0,
                  onExecCmd: Re
                }, null, 8, ["name"])
              ], 512), [
                [J, m.value == "execute"]
              ]),
              R(p("div", Tt, [
                e(_e, {
                  icon: "success",
                  title: S.value == 1 ? n(t)("backupCompleteTips") : n(t)("restoreCompleteTips"),
                  "sub-title": S.value == 1 ? `备份耗时${X.value}，成功备份完成。` : `恢复耗时${X.value}，成功恢复完成。`
                }, {
                  icon: l(() => [
                    Bt
                  ]),
                  extra: l(() => [
                    e(r, {
                      onClick: ce,
                      class: "!w-[90px]"
                    }, {
                      default: l(() => [
                        v("返回")
                      ]),
                      _: 1
                    }),
                    e(r, {
                      onClick: a[6] || (a[6] = (s) => B.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: l(() => [
                        v("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "sub-title"])
              ], 512), [
                [J, m.value == "complete"]
              ]),
              R(p("div", It, [
                e(_e, {
                  icon: "success",
                  title: S.value == 1 ? n(t)("备份失败") : n(t)("恢复失败")
                }, {
                  icon: l(() => [
                    St
                  ]),
                  extra: l(() => [
                    e(fe, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                      default: l(() => [
                        v(i(Y.value), 1)
                      ]),
                      _: 1
                    }),
                    e(r, {
                      onClick: ce,
                      class: "!w-[90px]"
                    }, {
                      default: l(() => [
                        v("错误信息")
                      ]),
                      _: 1
                    }),
                    e(r, {
                      onClick: a[7] || (a[7] = (s) => B.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: l(() => [
                        v("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title"])
              ], 512), [
                [J, m.value == "error"]
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        e(ge, {
          modelValue: N.value,
          "onUpdate:modelValue": a[14] || (a[14] = (s) => N.value = s),
          title: n(t)("remark"),
          width: "460px",
          "destroy-on-close": !0
        }, {
          footer: l(() => [
            p("span", Vt, [
              e(r, {
                onClick: a[12] || (a[12] = (s) => N.value = !1)
              }, {
                default: l(() => [
                  v(i(n(t)("cancel")), 1)
                ]),
                _: 1
              }),
              e(r, {
                type: "primary",
                loading: j.value,
                onClick: a[13] || (a[13] = (s) => Pe())
              }, {
                default: l(() => [
                  v(i(n(t)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: l(() => [
            R((c(), M(E, {
              model: V,
              ref: "formRef",
              class: "page-form"
            }, {
              default: l(() => [
                e(w, { class: "mb-0" }, {
                  default: l(() => [
                    e(x, {
                      modelValue: V.remark,
                      "onUpdate:modelValue": a[11] || (a[11] = (s) => V.remark = s),
                      modelModifiers: { trim: !0 },
                      rows: 5,
                      type: "textarea",
                      maxlength: "200",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])), [
              [le, j.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const qt = /* @__PURE__ */ lt(Et, [["__scopeId", "data-v-7ff85649"]]);
export {
  qt as default
};
