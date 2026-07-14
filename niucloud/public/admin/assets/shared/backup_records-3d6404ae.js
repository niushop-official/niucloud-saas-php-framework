import { defineComponent as tt, ref as d, reactive as Ce, computed as lt, watch as at, resolveComponent as _, resolveDirective as nt, openBlock as c, createElementBlock as h, createVNode as t, withCtx as n, createElementVNode as p, toDisplayString as i, unref as o, createTextVNode as v, withDirectives as M, createBlock as R, createCommentVNode as re, Fragment as Q, renderList as Be, normalizeClass as z, vShow as W, pushScopeId as ot, popScopeId as st, h as X, nextTick as Se } from "vue";
import { a as rt, _ as it } from "./success_icon-605a2b43.js";
import { t as e, g3 as ut, g4 as ct, g5 as Ie, g6 as dt, g7 as pt, g8 as mt, g9 as De, ga as vt, gb as $e, _ as ft } from "./core-shared-11c0a673.js";
import { ElMessageBox as O, ElMessage as _t } from "element-plus";
import { useRoute as gt } from "vue-router";
import { T as ht, _ as kt } from "./dark-3dd028d8.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ee = (q) => (ot("data-v-7ff85649"), q = q(), st(), q), xt = { class: "main-container" }, bt = { class: "flex justify-between items-center" }, yt = { class: "text-page-title" }, wt = {
  key: 0,
  class: "multi-hidden"
}, Tt = {
  key: 1,
  class: "multi-hidden"
}, Ct = {
  key: 2,
  class: "multi-hidden"
}, Bt = {
  key: 0,
  class: "multi-hidden"
}, St = { key: 1 }, It = { class: "mt-[10px] flex items-center" }, Dt = { class: "mt-[16px] flex justify-end" }, $t = {
  class: "h-[400px]",
  style: { overflow: "auto" }
}, Et = { class: "flex flex-col" }, Vt = { class: "bg-[#fff] my-3" }, Mt = { class: "px-[20px] pt-[10px] text-[14px] el-table" }, Rt = {
  key: 0,
  style: { height: "calc(300px)", overflow: "auto" }
}, Ft = { key: 1 }, Pt = { style: { height: "calc(300px)", overflow: "auto" } }, Ut = { class: "h-[370px] mt-[30px]" }, Nt = { class: "mt-[20px]" }, zt = /* @__PURE__ */ Ee(() => /* @__PURE__ */ p("img", {
  src: rt,
  alt: ""
}, null, -1)), Lt = { class: "mt-[20px] h-[370px]" }, jt = /* @__PURE__ */ Ee(() => /* @__PURE__ */ p("img", {
  src: it,
  alt: ""
}, null, -1)), Ht = {
  key: 0,
  class: "dialog-footer"
}, Ot = {
  key: 1,
  class: "dialog-footer"
}, qt = { class: "dialog-footer" }, At = /* @__PURE__ */ tt({
  __name: "backup_records",
  setup(q) {
    const Ve = gt(), Me = d(Date.now()), Re = Ve.meta.title, ie = d(), Y = d([]), Fe = d(), g = d(!1), F = d(null), u = Ce({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        content: ""
      }
    }), T = d(!1), m = d("check"), L = d(!1), k = d(null), w = d(null), A = [];
    let P = null;
    const Z = d(!1), U = d(!1), S = d(0), ue = d(0);
    let ee = [], G = [];
    const Pe = (l) => {
      l && (l.resetFields(), x());
    }, Ue = (l) => {
      Y.value = l;
    }, x = (l = 1) => {
      u.loading = !0, u.page = l, ut({
        page: u.page,
        limit: u.limit,
        ...u.searchParam
      }).then((a) => {
        u.loading = !1, u.data = a.data.data, u.total = a.data.total;
      }).catch(() => {
        u.loading = !1;
      });
    };
    x();
    const C = d(0), Ne = () => {
      O.confirm(
        e("manualBackupTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        ee = [], S.value = 0, C.value = 1, T.value = !0, U.value = !0, m.value = "check", L.value = !1, pe();
      });
    }, J = d(!1), b = d(null), D = d(0);
    let f = null;
    const te = lt(() => {
      const l = D.value, a = Math.floor(l / 60), s = l % 60;
      return a > 0 ? `${a}分${s}秒` : `${s}秒`;
    }), le = d(""), ce = (l = "") => {
      L.value || (l == "" && (S.value = 1, m.value = "execute"), ct({ task: l }).then((a) => {
        const s = a.data;
        if (l == "") {
          w.value.execute("clear"), w.value.execute("开始执行"), J.value = !0;
          const y = localStorage.getItem("manual_back_start_time");
          if (y)
            b.value = Number(y);
          else {
            const B = Date.now();
            b.value = B, localStorage.setItem("manual_back_start_time", String(B));
          }
          D.value = Math.floor((Date.now() - b.value) / 1e3), f && clearInterval(f), f = setInterval(() => {
            b.value && (D.value = Math.floor((Date.now() - b.value) / 1e3));
          }, 1e3);
        }
        s.content && !ee.includes(s.content) && (ee.push(s.content), w.value.pushMessage({ content: `${s.content}` })), s.task == "end" ? (S.value = 2, setTimeout(() => {
          S.value = 3, m.value = "complete", J.value = !0, f && clearInterval(f), localStorage.removeItem("manual_back_start_time"), x(), g.value = !1;
        }, 1500)) : s.task == "fail" ? (setTimeout(() => {
          x(), g.value = !1;
        }, 2e3), le.value = s.content, m.value = "error", J.value = !0, f && (clearInterval(f), f = null), b.value && (D.value = Math.floor((Date.now() - b.value) / 1e3)), localStorage.removeItem("manual_back_start_time")) : setTimeout(() => {
          ce(s.task);
        }, 2e3);
      }).catch(() => {
        g.value = !1, u.loading = !1;
      }));
    }, Gt = () => {
      Ie({}).then(({ data: l }) => {
        l && (F.value = l, !T.value && l.data && l.data.length > 0 && ze());
      }).catch();
    }, ze = () => {
      P = ElNotification.success({
        title: e("warning"),
        dangerouslyUseHTMLString: !0,
        message: X("div", {}, [
          e("cloudbuild.executingTips"),
          X("span", { class: "text-primary cursor-pointer", onClick: Le }, [e("cloudbuild.clickView")])
        ]),
        duration: 0,
        showClose: !1
      });
    }, Le = () => {
      C.value = 1, T.value = !0, Se(() => {
        P && P.close(), w.value.execute("clear"), w.value.execute("开始执行"), de();
      });
    }, de = () => {
      Ie({}).then(({ data: l }) => {
        if (!l)
          return;
        F.value = l, F.value.data.forEach((s) => {
          A.includes(s.content) || (w.value.pushMessage({ content: `${s.content}` }), A.push(s.content));
        });
        const a = l.data[l.data.length - 1].task;
        a === "end" || l.data.length == 0 ? setTimeout(() => {
          m.value = "complete", x(), g.value = !1;
        }, 1500) : setTimeout(a === "fail" ? () => {
          x(), g.value = !1;
        } : () => {
          de();
        }, 2e3);
      });
    }, je = (l) => {
      O.confirm(
        e("restoreTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        S.value = 0, G = [], C.value = 2, ue.value = l.id, m.value = "check", L.value = !1, He(l.id);
      });
    }, He = (l) => {
      dt({ id: l }).then(({ data: a }) => {
        a && (T.value = !0, U.value = !0, pe());
      });
    }, pe = () => {
      pt({}).then(({ data: l }) => {
        k.value = l, Z.value = !l.is_pass, U.value = !1;
      });
    }, me = (l, a = "") => {
      L.value || (a == "" && (S.value = 1, m.value = "execute"), mt({
        id: l,
        task: a
      }).then((s) => {
        const y = s.data;
        if (a == "") {
          U.value = !1, w.value.execute("clear"), w.value.execute("开始执行");
          const B = localStorage.getItem("manual_back_start_time");
          if (B)
            b.value = Number(B);
          else {
            const V = Date.now();
            b.value = V, localStorage.setItem("manual_back_start_time", String(V));
          }
          D.value = Math.floor((Date.now() - b.value) / 1e3), f && clearInterval(f), f = setInterval(() => {
            b.value && (D.value = Math.floor((Date.now() - b.value) / 1e3));
          }, 1e3);
        }
        y.content && !G.includes(y.content) && (G.push(y.content), w.value.pushMessage({ content: `${y.content}` })), y.task == "end" ? (S.value = 2, setTimeout(() => {
          S.value = 3, m.value = "complete", f && clearInterval(f), localStorage.removeItem("manual_back_start_time"), x(), g.value = !1;
        }, 1500)) : y.task == "fail" ? (setTimeout(() => {
          x(), g.value = !1;
        }, 2e3), le.value = y.content, m.value = "error", f && (clearInterval(f), f = null), b.value && (D.value = Math.floor((Date.now() - b.value) / 1e3)), localStorage.removeItem("manual_back_start_time")) : setTimeout(() => {
          G = [], me(l, y.task);
        }, 2e3);
      }).catch(() => {
        g.value = !1, u.loading = !1;
      }));
    }, Jt = () => {
      De({}).then(({ data: l }) => {
        l && (F.value = l, !T.value && l.data && l.data.length > 0 && Oe());
      }).catch();
    }, Oe = () => {
      P = ElNotification.success({
        title: e("warning"),
        dangerouslyUseHTMLString: !0,
        message: X("div", {}, [
          e("cloudbuild.executingTips"),
          X("span", { class: "text-primary cursor-pointer", onClick: qe }, [e("cloudbuild.clickView")])
        ]),
        duration: 0,
        showClose: !1
      });
    }, qe = () => {
      C.value = 2, T.value = !0, Se(() => {
        P && P.close(), w.value.execute("clear"), w.value.execute("开始执行"), ve();
      });
    }, ve = () => {
      De({}).then(({ data: l }) => {
        if (!l)
          return;
        F.value = l, F.value.data.forEach((s) => {
          A.includes(s.content) || (w.value.pushMessage({ content: `${s.content}` }), A.push(s.content));
        });
        const a = l.data[l.data.length - 1].task;
        a === "end" || l.data.length == 0 ? setTimeout(() => {
          m.value = "complete", x(), g.value = !1;
        }, 1500) : setTimeout(a === "fail" ? () => {
          x(), g.value = !1;
        } : () => {
          ve();
        }, 2e3);
      });
    }, fe = d(!1), _e = () => {
      m.value = "execute", fe.value = !0;
    }, Ae = (l) => {
      m.value == "execute" && !fe.value ? O.confirm(
        e("showDialogCloseTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        w.value.execute("clear"), L.value = !0, l(), localStorage.removeItem("manual_back_start_time"), f && clearInterval(f), f = null, b.value = null, D.value = 0;
      }).catch(() => {
      }) : (m.value == "complete" && setTimeout(() => {
        location.reload();
      }, 500), l());
    };
    let ae = null;
    const ge = new ht(), Ge = (l, a, s, y, B) => {
      if (a == "开始执行") {
        s(ge);
        const V = Je(["/", "——", "\\", "|"]);
        ae = setInterval(() => {
          ge.flush("> " + V.next().value);
        }, 150);
      }
    }, Je = (l) => {
      let a = 0;
      return {
        next() {
          return a + 1 == l.length && (a = 0), { value: l[a++] };
        }
      };
    };
    at(() => T.value, () => {
      T.value || (m.value = "execute", ae && clearInterval(ae));
    });
    const j = d(!1), H = d(!1), E = Ce({
      id: 0,
      remark: ""
    }), Ke = (l) => {
      E.id = l.id, E.remark = l.remark, j.value = !0;
    }, Qe = () => {
      H.value = !0, vt({
        id: E.id,
        remark: E.remark
      }).then(() => {
        j.value = !1, H.value = !1, x();
      }).catch(() => {
        H.value = !1;
      });
    }, We = (l) => {
      O.confirm(
        e("deleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        g.value || (g.value = !0, u.loading = !0, $e({
          ids: l
        }).then(() => {
          x(), g.value = !1;
        }).catch(() => {
          g.value = !1, u.loading = !1;
        }));
      });
    }, Xe = () => {
      if (Y.value.length == 0) {
        _t({
          type: "warning",
          message: `${e("batchEmptySelectedTips")}`
        });
        return;
      }
      O.confirm(
        e("deleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        if (u.loading = !0, g.value)
          return;
        g.value = !0;
        const l = [];
        Y.value.forEach((a) => {
          l.push(a.id);
        }), $e({
          ids: l
        }).then(() => {
          x(), g.value = !1;
        }).catch(() => {
          g.value = !1, u.loading = !1;
        });
      });
    };
    return (l, a) => {
      const s = _("el-button"), y = _("el-input"), B = _("el-form-item"), V = _("el-form"), he = _("el-card"), $ = _("el-table-column"), ne = _("el-tag"), Ye = _("el-table"), Ze = _("el-pagination"), N = _("el-step"), et = _("el-steps"), I = _("el-col"), oe = _("el-row"), ke = _("Select"), K = _("el-icon"), xe = _("CloseBold"), be = _("el-scrollbar"), ye = _("el-result"), we = _("el-dialog"), se = nt("loading");
      return c(), h("div", xt, [
        t(he, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            p("div", bt, [
              p("span", yt, i(o(Re)), 1),
              t(s, {
                type: "primary",
                onClick: Ne
              }, {
                default: n(() => [
                  v(i(o(e)("manualBackup")), 1)
                ]),
                _: 1
              })
            ]),
            t(he, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: n(() => [
                t(V, {
                  inline: !0,
                  model: u.searchParam,
                  ref_key: "searchFormRef",
                  ref: ie
                }, {
                  default: n(() => [
                    t(B, {
                      label: o(e)("content"),
                      prop: "content"
                    }, {
                      default: n(() => [
                        t(y, {
                          modelValue: u.searchParam.content,
                          "onUpdate:modelValue": a[0] || (a[0] = (r) => u.searchParam.content = r),
                          modelModifiers: { trim: !0 },
                          placeholder: o(e)("contentPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(B, null, {
                      default: n(() => [
                        t(s, {
                          type: "primary",
                          onClick: a[1] || (a[1] = (r) => x())
                        }, {
                          default: n(() => [
                            v(i(o(e)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(s, {
                          onClick: a[2] || (a[2] = (r) => Pe(ie.value))
                        }, {
                          default: n(() => [
                            v(i(o(e)("reset")), 1)
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
            M((c(), R(Ye, {
              data: u.data,
              size: "large",
              ref_key: "tableRef",
              ref: Fe,
              onSelectionChange: Ue
            }, {
              empty: n(() => [
                p("span", null, i(u.loading ? "" : o(e)("emptyData")), 1)
              ]),
              default: n(() => [
                t($, {
                  type: "selection",
                  width: "55"
                }),
                t($, {
                  prop: "id",
                  label: o(e)("id"),
                  width: "120"
                }, null, 8, ["label"]),
                t($, {
                  prop: "content",
                  label: o(e)("操作"),
                  width: "120",
                  align: "left"
                }, {
                  default: n(({ row: r }) => [
                    r.content == "手动备份" ? (c(), h("span", wt, [
                      t(ne, { type: "primary" }, {
                        default: n(() => [
                          v(i(r.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])) : r.content == "自动备份" ? (c(), h("span", Tt, [
                      t(ne, { type: "success" }, {
                        default: n(() => [
                          v(i(r.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (c(), h("span", Ct, [
                      t(ne, { type: "warning" }, {
                        default: n(() => [
                          v(i(r.content), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]))
                  ]),
                  _: 1
                }, 8, ["label"]),
                t($, {
                  prop: "version",
                  label: o(e)("currentVersion"),
                  width: "120"
                }, null, 8, ["label"]),
                t($, {
                  prop: "backup_dir",
                  label: o(e)("backupDir"),
                  width: "220"
                }, null, 8, ["label"]),
                t($, {
                  prop: "complete_time",
                  label: o(e)("completeTime"),
                  width: "220"
                }, null, 8, ["label"]),
                t($, {
                  prop: "remark",
                  label: o(e)("remark")
                }, {
                  default: n(({ row: r }) => [
                    r.remark ? (c(), h("span", Bt, i(r.remark), 1)) : (c(), h("span", St, i(o(e)("remarkEmpty")), 1))
                  ]),
                  _: 1
                }, 8, ["label"]),
                t($, {
                  label: o(e)("operation"),
                  align: "right",
                  fixed: "right",
                  width: "200"
                }, {
                  default: n(({ row: r }) => [
                    t(s, {
                      type: "primary",
                      link: "",
                      onClick: (Te) => Ke(r)
                    }, {
                      default: n(() => [
                        v(i(o(e)("remark")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    t(s, {
                      type: "primary",
                      link: "",
                      onClick: (Te) => je(r)
                    }, {
                      default: n(() => [
                        v(i(o(e)("restore")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    t(s, {
                      type: "primary",
                      link: "",
                      onClick: (Te) => We(r.id)
                    }, {
                      default: n(() => [
                        v(i(o(e)("delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [se, u.loading]
            ]),
            p("div", It, [
              t(s, {
                onClick: Xe,
                size: "small"
              }, {
                default: n(() => [
                  v(i(o(e)("batchDelete")), 1)
                ]),
                _: 1
              })
            ]),
            p("div", Dt, [
              t(Ze, {
                "current-page": u.page,
                "onUpdate:currentPage": a[3] || (a[3] = (r) => u.page = r),
                "page-size": u.limit,
                "onUpdate:pageSize": a[4] || (a[4] = (r) => u.limit = r),
                layout: "total, sizes, prev, pager, next, jumper",
                total: u.total,
                onSizeChange: a[5] || (a[5] = (r) => x()),
                onCurrentChange: x
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        t(we, {
          modelValue: T.value,
          "onUpdate:modelValue": a[10] || (a[10] = (r) => T.value = r),
          title: C.value == 1 ? o(e)("manualBackupTitle") : o(e)("restoreTitle"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "show-close": !0,
          "before-close": Ae
        }, {
          footer: n(() => [
            m.value == "check" ? (c(), h("div", Ht, [
              C.value == 1 ? (c(), R(s, {
                key: 0,
                type: "primary",
                loading: U.value,
                disabled: Z.value,
                onClick: a[8] || (a[8] = (r) => ce())
              }, {
                default: n(() => [
                  v(i(o(e)("nextStep")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"])) : (c(), R(s, {
                key: 1,
                type: "primary",
                loading: U.value,
                disabled: Z.value,
                onClick: a[9] || (a[9] = (r) => me(ue.value))
              }, {
                default: n(() => [
                  v(i(o(e)("nextStep")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"]))
            ])) : re("", !0),
            m.value == "execute" ? (c(), h("div", Ot, [
              t(s, {
                type: "primary",
                loading: J.value,
                class: "!w-[140px]"
              }, {
                default: n(() => [
                  v("已用时 " + i(te.value), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])) : re("", !0)
          ]),
          default: n(() => [
            m.value != "error" && m.value != "complete" ? (c(), R(et, {
              key: 0,
              active: S.value,
              "align-center": "",
              class: "number-of-steps",
              "finish-status": "success",
              "process-status": "process"
            }, {
              default: n(() => [
                C.value == 1 ? (c(), h(Q, { key: 0 }, [
                  t(N, {
                    title: o(e)("testDirectoryPermissions")
                  }, null, 8, ["title"]),
                  t(N, {
                    title: o(e)("startBackUp")
                  }, null, 8, ["title"]),
                  t(N, {
                    title: o(e)("backUpEnd")
                  }, null, 8, ["title"])
                ], 64)) : (c(), h(Q, { key: 1 }, [
                  t(N, {
                    title: o(e)("testDirectoryPermissions")
                  }, null, 8, ["title"]),
                  t(N, {
                    title: o(e)("startUpgrade")
                  }, null, 8, ["title"]),
                  t(N, {
                    title: o(e)("upgradeEnd")
                  }, null, 8, ["title"])
                ], 64))
              ]),
              _: 1
            }, 8, ["active"])) : re("", !0),
            p("div", $t, [
              M(p("div", Et, [
                t(be, null, {
                  default: n(() => [
                    p("div", Vt, [
                      p("div", Mt, [
                        t(oe, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                          default: n(() => [
                            t(I, { span: 18 }, {
                              default: n(() => [
                                p("span", null, i(o(e)("upgrade.path")), 1)
                              ]),
                              _: 1
                            }),
                            t(I, { span: 3 }, {
                              default: n(() => [
                                p("span", null, i(o(e)("upgrade.demand")), 1)
                              ]),
                              _: 1
                            }),
                            t(I, { span: 3 }, {
                              default: n(() => [
                                p("span", null, i(o(e)("status")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        k.value && k.value.dir ? (c(), h("div", Rt, [
                          (c(!0), h(Q, null, Be(k.value.dir.is_readable, (r) => (c(), R(oe, { class: "pb-[10px] items pl-[15px]" }, {
                            default: n(() => [
                              t(I, { span: 18 }, {
                                default: n(() => [
                                  p("span", null, i(r.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              t(I, { span: 3 }, {
                                default: n(() => [
                                  p("span", {
                                    class: z({ "mx-[10px]": k.value.dir.is_readable.length + k.value.dir.is_write.length > 9 })
                                  }, i(o(e)("upgrade.readable")), 3)
                                ]),
                                _: 1
                              }),
                              t(I, { span: 3 }, {
                                default: n(() => [
                                  r.status ? (c(), h("span", {
                                    key: 0,
                                    class: z({ "mx-[20px]": k.value.dir.is_readable.length + k.value.dir.is_write.length > 9 })
                                  }, [
                                    t(K, { color: "green" }, {
                                      default: n(() => [
                                        t(ke)
                                      ]),
                                      _: 1
                                    })
                                  ], 2)) : (c(), h("span", {
                                    key: 1,
                                    class: z({ "mx-[20px]": k.value.dir.is_readable.length + k.value.dir.is_write.length > 9 })
                                  }, [
                                    t(K, { color: "red" }, {
                                      default: n(() => [
                                        t(xe)
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
                          (c(!0), h(Q, null, Be(k.value.dir.is_write, (r) => (c(), R(oe, { class: "pb-[10px] items pl-[15px]" }, {
                            default: n(() => [
                              t(I, { span: 18 }, {
                                default: n(() => [
                                  p("span", null, i(r.dir), 1)
                                ]),
                                _: 2
                              }, 1024),
                              t(I, { span: 3 }, {
                                default: n(() => [
                                  p("span", {
                                    class: z({ "mx-[10px]": k.value.dir.is_readable.length + k.value.dir.is_write.length > 9 })
                                  }, i(o(e)("upgrade.write")), 3)
                                ]),
                                _: 1
                              }),
                              t(I, { span: 3 }, {
                                default: n(() => [
                                  r.status ? (c(), h("span", {
                                    key: 0,
                                    class: z({ "mx-[20px]": k.value.dir.is_readable.length + k.value.dir.is_write.length > 9 })
                                  }, [
                                    t(K, { color: "green" }, {
                                      default: n(() => [
                                        t(ke)
                                      ]),
                                      _: 1
                                    })
                                  ], 2)) : (c(), h("span", {
                                    key: 1,
                                    class: z({ "mx-[20px]": k.value.dir.is_readable.length + k.value.dir.is_write.length > 9 })
                                  }, [
                                    t(K, { color: "red" }, {
                                      default: n(() => [
                                        t(xe)
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
                        ])) : (c(), h("div", Ft, [
                          M(p("div", Pt, null, 512), [
                            [se, !0]
                          ])
                        ]))
                      ])
                    ])
                  ]),
                  _: 1
                })
              ], 512), [
                [W, m.value == "check"]
              ]),
              M(p("div", Ut, [
                t(o(kt), {
                  ref_key: "terminalRef",
                  ref: w,
                  name: `backup-restore-${Me.value}`,
                  context: "",
                  "init-log": null,
                  "show-header": !1,
                  "show-log-time": !0,
                  onExecCmd: Ge
                }, null, 8, ["name"])
              ], 512), [
                [W, m.value == "execute"]
              ]),
              M(p("div", Nt, [
                t(ye, {
                  icon: "success",
                  title: C.value == 1 ? o(e)("backupCompleteTips") : o(e)("restoreCompleteTips"),
                  "sub-title": C.value == 1 ? `备份耗时${te.value}，成功备份完成。` : `恢复耗时${te.value}，成功恢复完成。`
                }, {
                  icon: n(() => [
                    zt
                  ]),
                  extra: n(() => [
                    t(s, {
                      onClick: _e,
                      class: "!w-[90px]"
                    }, {
                      default: n(() => [
                        v("返回")
                      ]),
                      _: 1
                    }),
                    t(s, {
                      onClick: a[6] || (a[6] = (r) => T.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: n(() => [
                        v("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "sub-title"])
              ], 512), [
                [W, m.value == "complete"]
              ]),
              M(p("div", Lt, [
                t(ye, {
                  icon: "success",
                  title: C.value == 1 ? o(e)("备份失败") : o(e)("恢复失败")
                }, {
                  icon: n(() => [
                    jt
                  ]),
                  extra: n(() => [
                    t(be, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                      default: n(() => [
                        v(i(le.value), 1)
                      ]),
                      _: 1
                    }),
                    t(s, {
                      onClick: _e,
                      class: "!w-[90px]"
                    }, {
                      default: n(() => [
                        v("错误信息")
                      ]),
                      _: 1
                    }),
                    t(s, {
                      onClick: a[7] || (a[7] = (r) => T.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: n(() => [
                        v("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title"])
              ], 512), [
                [W, m.value == "error"]
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(we, {
          modelValue: j.value,
          "onUpdate:modelValue": a[14] || (a[14] = (r) => j.value = r),
          title: o(e)("remark"),
          width: "460px",
          "destroy-on-close": !0
        }, {
          footer: n(() => [
            p("span", qt, [
              t(s, {
                onClick: a[12] || (a[12] = (r) => j.value = !1)
              }, {
                default: n(() => [
                  v(i(o(e)("cancel")), 1)
                ]),
                _: 1
              }),
              t(s, {
                type: "primary",
                loading: H.value,
                onClick: a[13] || (a[13] = (r) => Qe())
              }, {
                default: n(() => [
                  v(i(o(e)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: n(() => [
            M((c(), R(V, {
              model: E,
              ref: "formRef",
              class: "page-form"
            }, {
              default: n(() => [
                t(B, { class: "mb-0" }, {
                  default: n(() => [
                    t(y, {
                      modelValue: E.remark,
                      "onUpdate:modelValue": a[11] || (a[11] = (r) => E.remark = r),
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
              [se, H.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const nl = /* @__PURE__ */ ft(At, [["__scopeId", "data-v-7ff85649"]]);
export {
  nl as default
};
