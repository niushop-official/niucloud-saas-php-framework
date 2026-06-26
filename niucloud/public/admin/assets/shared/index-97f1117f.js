import { defineComponent as Te, ref as h, computed as De, watch as $e, resolveComponent as g, resolveDirective as Fe, openBlock as v, createBlock as D, unref as E, withCtx as a, withDirectives as U, createElementBlock as C, createElementVNode as n, toDisplayString as I, createVNode as o, Fragment as de, renderList as ve, createCommentVNode as R, vShow as Q, createTextVNode as w, pushScopeId as Le, popScopeId as Ne } from "vue";
import { _ as Oe, a as je } from "./success_icon-605a2b43.js";
import { _ as Re } from "./icon-addon-one-2b9cfff5.js";
import { ah as z, t as p, ai as ze, aj as Je, ak as _e, ag as Ve, al as Ae, am as Pe, an as Ue, ao as Qe, _ as We } from "./core-shared-ca1fcae5.js";
import { g as qe } from "./addon-84f9cff9.js";
import { _ as Ge, T as He } from "./dark-eb307d84.js";
import { ElMessageBox as le, ElMessage as pe } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const q = (G) => (Le("data-v-5e2f0f19"), G = G(), Ne(), G), Ke = { class: "h-[50vh]" }, Xe = {
  key: 0,
  class: "h-[50vh] flex flex-col"
}, Ye = {
  key: 0,
  class: "bg-[#fff] my-3"
}, Ze = { class: "pl-[20px]" }, el = { class: "flex items-center" }, ll = /* @__PURE__ */ q(() => /* @__PURE__ */ n("span", { class: "ml-[5px] leading-[20px]" }, "编译权限错误，查看解决方案", -1)), tl = /* @__PURE__ */ q(() => /* @__PURE__ */ n("div", { class: "border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center" }, "立即查看", -1)), al = { class: "px-[20px] pt-[10px] text-[14px] el-table" }, ol = { key: 0 }, sl = { key: 1 }, nl = { key: 0 }, rl = { key: 1 }, cl = { class: "h-[45vh]" }, ul = { class: "flex justify-end mt-[20px]" }, il = { class: "h-[50vh] flex flex-col" }, dl = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, vl = /* @__PURE__ */ q(() => /* @__PURE__ */ n("img", {
  src: Oe,
  alt: ""
}, null, -1)), _l = { class: "text-left" }, pl = { class: "h-[50vh] flex flex-col" }, fl = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, ml = /* @__PURE__ */ q(() => /* @__PURE__ */ n("img", {
  src: je,
  alt: ""
}, null, -1)), hl = { class: "h-[50vh] flex flex-col" }, gl = { class: "flex-1 h-0 flex items-center flex-col" }, xl = { class: "flex items-center cursor-pointer relative left-[-10px]" }, bl = /* @__PURE__ */ q(() => /* @__PURE__ */ n("div", { class: "flex items-center w-full h-full rounded-[5px]" }, [
  /* @__PURE__ */ n("img", {
    class: "max-w-full max-h-full",
    src: Re,
    alt: ""
  })
], -1)), wl = { class: "flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]" }, yl = { class: "w-[236px] truncate leading-[18px]" }, Sl = {
  key: 0,
  class: "flex items-center"
}, kl = {
  key: 1,
  class: "flex items-center"
}, Il = { class: "flex justify-end mt-[20px]" }, Cl = /* @__PURE__ */ Te({
  __name: "index",
  setup(G, { expose: fe }) {
    const i = h(!1), me = h(Date.now()), y = h(null), u = h("build"), W = h(null), k = h(!1), c = h(null), te = h([]), X = h([]), ae = h(null);
    qe().then(({ data: e }) => {
      X.value = Object.values(e);
    });
    const he = (e) => {
      te.value = e.map((t) => t.key);
    };
    let f = [], m = null;
    const Y = (e) => {
      m && m.close();
      const t = Qe(e);
      m = new EventSource(t), m.onopen = () => {
        console.log("SSE connected");
      }, m.onmessage = (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE parse error:", l);
        }
      }, m.addEventListener("progress", (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE progress parse error:", l);
        }
      }), m.addEventListener("complete", (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE complete parse error:", l);
        }
      }), m.addEventListener("failed", (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE failed parse error:", l);
        }
      }), m.addEventListener("heartbeat", () => {
        console.log("SSE heartbeat");
      }), m.addEventListener("download_start", (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE download_start parse error:", l);
        }
      }), m.addEventListener("download_progress", (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE download_progress parse error:", l);
        }
      }), m.addEventListener("download_complete", (s) => {
        try {
          const l = JSON.parse(s.data);
          $(l);
        } catch (l) {
          console.error("SSE download_complete parse error:", l);
        }
      }), m.onerror = (s) => {
        console.error("SSE error:", s), setTimeout(() => {
          i.value && y.value && J();
        }, 5e3);
      };
    }, $ = (e) => {
      if (i.value)
        if (e.type === "progress" && e.action) {
          if (!f.includes(e.action)) {
            if (f.length === 0) {
              const t = localStorage.getItem("cloud_build_start_time");
              if (t)
                x.value = Number(t);
              else {
                const s = Date.now();
                x.value = s, localStorage.setItem("cloud_build_start_time", String(s));
              }
              M.value = Math.floor((Date.now() - x.value) / 1e3), r && clearInterval(r), r = setInterval(() => {
                x.value && (M.value = Math.floor((Date.now() - x.value) / 1e3));
              }, 1e3), c.value.execute("clear"), c.value.execute("开始编译");
            }
            if (e.action.indexOf("云编译任务正在排队") != -1) {
              A = e.action, f.push(e.action);
              return;
            } else
              A = null;
            c.value.pushMessage({ content: `${e.action}` }), f.push(e.action), e.code === "0" && e.msg && (N.value = {}, T.value = e.msg, c.value.pushMessage({ content: e.msg, class: "error" }), L.value = !1, u.value = "error", c.value.execute("clear"), z(), r && clearInterval(r), r = null, localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"), F());
          }
        } else if (e.type === "complete")
          c.value.pushMessage({ content: "编译完成" });
        else if (e.type === "failed")
          T.value = e.msg || "编译失败", u.value = "error", c.value.execute("clear"), z(), r && clearInterval(r), r = null, localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"), F();
        else if (e.type === "download_start")
          e.action && !f.includes(e.action) && (c.value.pushMessage({ content: e.action }), f.push(e.action));
        else if (e.type === "download_progress") {
          const t = e.download_percent || 0, s = e.downloaded_bytes || 0, l = e.total_bytes || 0, d = (s / 1024 / 1024).toFixed(2), B = (l / 1024 / 1024).toFixed(2);
          c.value.pushMessage({ content: `下载进度: ${t}% (${d}MB / ${B}MB)` });
        } else
          e.type === "download_complete" && (e.action && !f.includes(e.action) && (c.value.pushMessage({ content: e.action }), f.push(e.action)), e.download_url && e.task_id && ge(e.task_id, e.download_url, e.authorize_code, e.timestamp));
    };
    let b = null;
    const ge = async (e, t, s, l) => {
      try {
        c.value.pushMessage({ content: "正在启动后台下载..." });
        const d = new URL(t, Ve), B = d.searchParams.get("authorize_code") || s || "", K = d.searchParams.get("timestamp") || l || "";
        await Ae(e, t, B, K), b = setTimeout(async () => {
          if (b)
            try {
              const O = await Pe(e);
              if (O.code === 1) {
                const { status: j, percent: S, msg: P } = O.data;
                j === "downloading" ? c.value.pushMessage({ content: `下载进度: ${S}% - ${P}` }) : j === "unzipping" ? c.value.pushMessage({ content: P }) : j === "completed" ? (c.value.pushMessage({ content: "部署完成!" }), b && clearInterval(b), b = null, u.value = "complete", L.value = !1, c.value.execute("clear"), z(), r && clearInterval(r), r = null, localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"), F(), pe.success("编译部署完成")) : j === "error" && (c.value.pushMessage({ content: `错误: ${P}`, class: "error" }), b && clearInterval(b), b = null, T.value = P, u.value = "error", L.value = !1, z(), F());
              } else
                c.value.pushMessage({ content: "获取下载进度失败", class: "error" }), b && clearInterval(b), b = null;
            } catch (O) {
              console.error("Polling error:", O);
            }
        }, 2e3);
      } catch (d) {
        console.error("启动后台下载失败:", d), c.value.pushMessage({ content: "启动后台下载失败", class: "error" }), T.value = "启动后台下载失败", u.value = "error";
      }
    }, F = () => {
      m && (m.close(), m = null), b && (clearInterval(b), b = null);
    }, x = h(null), M = h(0);
    let r = null;
    const oe = De(() => {
      const e = M.value, t = Math.floor(e / 60), s = e % 60;
      return t > 0 ? `${t}分${s}秒` : `${s}秒`;
    }), se = () => {
      ze().then(({ data: e }) => {
        e && (y.value = e, i.value || localStorage.setItem("cloud_build_task", "true"));
      }).catch();
    };
    se();
    const T = h(""), L = h(!1), N = h({}), J = () => {
      L.value = !0, Ue().then((e) => {
        if (!e.data) {
          i.value && f.length && (u.value = "complete", L.value = !1, c.value.execute("clear"), z(), r && clearInterval(r), localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"));
          return;
        }
        const t = e.data.data ?? [];
        let s = "";
        if (t[0] && t[0].length && i.value) {
          if (f.length == 0) {
            const l = localStorage.getItem("cloud_build_start_time");
            if (l)
              x.value = Number(l);
            else {
              const d = Date.now();
              x.value = d, localStorage.setItem("cloud_build_start_time", String(d));
            }
            M.value = Math.floor((Date.now() - x.value) / 1e3), r && clearInterval(r), r = setInterval(() => {
              x.value && (M.value = Math.floor((Date.now() - x.value) / 1e3));
            }, 1e3), c.value.execute("clear"), c.value.execute("开始编译");
          }
          t[0].forEach((l) => {
            if (!f.includes(l.action)) {
              if (l.action.indexOf("云编译任务正在排队") != -1) {
                A = l.action, f.push(l.action);
                return;
              } else
                A = null;
              c.value.pushMessage({ content: `${l.action}` }), f.push(l.action), l.code === "0" && (N.value = e.data.error_analysis || {}, s = l.msg, c.value.pushMessage({ content: l.msg, class: "error" }), L.value = !1, u.value = "error", c.value.execute("clear"), z(), T.value = l.msg, r && (clearInterval(r), r = null), x.value && (M.value = Math.floor((Date.now() - x.value) / 1e3)), localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"));
            }
          });
        }
        s || setTimeout(() => {
          J();
        }, 5e3);
      }).catch();
    }, H = h("normal"), ne = () => {
      u.value = "build", H.value = "success";
    }, xe = () => {
      i.value = !0, u.value = "build", J();
    }, re = async () => {
      if (k.value = !0, u.value = "build", H.value = "normal", f = [], y.value) {
        i.value = !0, k.value = !1;
        const e = y.value.task_id;
        e ? Y(e) : J();
        return;
      }
      Je().then(async ({ data: e }) => {
        e.is_pass ? _e().then(({ data: t }) => {
          k.value = !1, y.value = t, i.value = !0;
          const s = t.task_id;
          s ? Y(s) : J();
        }).catch(() => {
          i.value = !1, k.value = !1;
        }) : (k.value = !1, W.value = e, i.value = !0);
      }).catch((e) => {
        k.value = !1, i.value = !1, e.code && e.code == 601 ? le.confirm(
          "云编译服务未启动，必须在启动后进行云编译！",
          "提示",
          {
            distinguishCancelAndClose: !0,
            confirmButtonText: "重新检测",
            cancelButtonText: "查看操作手册",
            type: "warning"
          }
        ).then(() => {
          re();
        }).catch((t) => {
          t == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : pe({ message: e.msg, type: "error" });
      });
    }, ce = () => {
      if (u.value != "again_build") {
        u.value = "again_build", te.value = X.value.map((e) => (ae.value.toggleRowSelection(e, !0), e.key));
        return;
      }
      k.value = !0, f = [], _e().then(({ data: e }) => {
        u.value = "build", k.value = !1, y.value = e, i.value = !0, localStorage.removeItem("cloud_build_start_time");
        const t = e.task_id;
        t ? Y(t) : J();
      }).catch(() => {
        i.value = !1, k.value = !1;
      });
    };
    let Z = null, V = null, A = null;
    const be = (e, t, s, l, d) => {
      if (t == "开始编译") {
        V = new He(), s(V);
        const B = we(["/", "——", "\\", "|"]);
        Z = setInterval(() => {
          A ? V.flush(A + "<br>> " + B.next().value) : V.flush("> " + B.next().value);
        }, 150);
      }
    }, we = (e) => {
      let t = 0;
      return {
        next() {
          return t + 1 == e.length && (t = 0), { value: e[t++] };
        }
      };
    }, ye = (e) => {
      F(), u.value == "build" && y.value && H.value == "normal" ? le.confirm(
        p("cloudbuild.showDialogCloseTips"),
        p("warning"),
        {
          confirmButtonText: p("confirm"),
          cancelButtonText: p("cancel"),
          type: "warning"
        }
      ).then(() => {
        c.value.execute("clear"), localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"), e(), r && clearInterval(r), r = null, x.value = null, M.value = 0;
      }).catch(() => {
      }) : e();
    }, ue = () => {
      F(), u.value == "build" && y.value && H.value == "normal" ? le.confirm(
        p("cloudbuild.showDialogCloseTips"),
        p("warning"),
        {
          confirmButtonText: p("confirm"),
          cancelButtonText: p("cancel"),
          type: "warning"
        }
      ).then(() => {
        c.value.execute("clear"), localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task"), r && clearInterval(r), r = null, x.value = null, M.value = 0, i.value = !1;
      }).catch(() => {
      }) : i.value = !1;
    }, Se = () => {
      window.open("https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html");
    };
    return $e(() => i.value, () => {
      i.value || (F(), y.value = null, u.value = "build", f = [], Z && clearInterval(Z), V && V.finish(), r && clearInterval(r), x.value = null, M.value = 0, z());
    }), fe({
      open: re,
      cloudBuildTask: y,
      loading: k,
      elNotificationClick: xe,
      getCloudBuildTaskFn: se
    }), (e, t) => {
      const s = g("QuestionFilled"), l = g("el-icon"), d = g("el-col"), B = g("el-row"), K = g("Select"), O = g("CloseBold"), j = g("el-scrollbar"), S = g("el-button"), P = g("el-alert"), ie = g("el-result"), ee = g("el-table-column"), ke = g("el-image"), Ie = g("SuccessFilled"), Ce = g("WarningFilled"), Be = g("el-table"), Ee = g("el-dialog"), Me = Fe("loading");
      return v(), D(Ee, {
        modelValue: i.value,
        "onUpdate:modelValue": t[6] || (t[6] = (_) => i.value = _),
        title: E(p)("cloudbuild.title"),
        width: "850px",
        "close-on-click-modal": !1,
        "close-on-press-escape": !1,
        "before-close": ye
      }, {
        default: a(() => [
          U((v(), C("div", Ke, [
            W.value && !y.value ? (v(), C("div", Xe, [
              W.value.dir ? (v(), C("div", Ye, [
                n("div", null, [
                  n("p", Ze, I(E(p)("cloudbuild.dirPermission")), 1),
                  n("div", {
                    class: "mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]",
                    onClick: Se
                  }, [
                    n("div", el, [
                      o(l, { size: 17 }, {
                        default: a(() => [
                          o(s)
                        ]),
                        _: 1
                      }),
                      ll
                    ]),
                    tl
                  ])
                ]),
                n("div", al, [
                  o(B, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                    default: a(() => [
                      o(d, { span: 18 }, {
                        default: a(() => [
                          n("span", null, I(E(p)("cloudbuild.path")), 1)
                        ]),
                        _: 1
                      }),
                      o(d, { span: 3 }, {
                        default: a(() => [
                          n("span", null, I(E(p)("cloudbuild.demand")), 1)
                        ]),
                        _: 1
                      }),
                      o(d, { span: 3 }, {
                        default: a(() => [
                          n("span", null, I(E(p)("status")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  o(j, { style: { height: "calc(300px)", overflow: "auto" } }, {
                    default: a(() => [
                      (v(!0), C(de, null, ve(W.value.dir.is_readable, (_) => (v(), D(B, { class: "pb-[10px] items pl-[15px]" }, {
                        default: a(() => [
                          o(d, { span: 18 }, {
                            default: a(() => [
                              n("span", null, I(_.dir), 1)
                            ]),
                            _: 2
                          }, 1024),
                          o(d, { span: 3 }, {
                            default: a(() => [
                              n("span", null, I(E(p)("cloudbuild.readable")), 1)
                            ]),
                            _: 1
                          }),
                          o(d, { span: 3 }, {
                            default: a(() => [
                              _.status ? (v(), C("span", ol, [
                                o(l, { color: "green" }, {
                                  default: a(() => [
                                    o(K)
                                  ]),
                                  _: 1
                                })
                              ])) : (v(), C("span", sl, [
                                o(l, { color: "red" }, {
                                  default: a(() => [
                                    o(O)
                                  ]),
                                  _: 1
                                })
                              ]))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024))), 256)),
                      (v(!0), C(de, null, ve(W.value.dir.is_write, (_) => (v(), D(B, { class: "pb-[10px] items pl-[15px]" }, {
                        default: a(() => [
                          o(d, { span: 18 }, {
                            default: a(() => [
                              n("span", null, I(_.dir), 1)
                            ]),
                            _: 2
                          }, 1024),
                          o(d, { span: 3 }, {
                            default: a(() => [
                              n("span", null, I(E(p)("cloudbuild.write")), 1)
                            ]),
                            _: 1
                          }),
                          o(d, { span: 3 }, {
                            default: a(() => [
                              _.status ? (v(), C("span", nl, [
                                o(l, { color: "green" }, {
                                  default: a(() => [
                                    o(K)
                                  ]),
                                  _: 1
                                })
                              ])) : (v(), C("span", rl, [
                                o(l, { color: "red" }, {
                                  default: a(() => [
                                    o(O)
                                  ]),
                                  _: 1
                                })
                              ]))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024))), 256))
                    ]),
                    _: 1
                  })
                ])
              ])) : R("", !0)
            ])) : R("", !0),
            U(n("div", cl, [
              o(E(Ge), {
                ref_key: "terminalRef",
                ref: c,
                name: `cloud-build-${me.value}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: be
              }, null, 8, ["name"])
            ], 512), [
              [Q, y.value]
            ]),
            U(n("div", ul, [
              o(S, {
                onClick: t[0] || (t[0] = (_) => ue()),
                class: "!w-[90px]"
              }, {
                default: a(() => [
                  w("取消")
                ]),
                _: 1
              }),
              T.value ? R("", !0) : (v(), D(S, {
                key: 0,
                type: "primary",
                loading: L.value,
                class: "!w-[140px]"
              }, {
                default: a(() => [
                  w("已用时 " + I(oe.value), 1)
                ]),
                _: 1
              }, 8, ["loading"])),
              T.value ? (v(), D(S, {
                key: 1,
                type: "primary",
                onClick: t[1] || (t[1] = (_) => u.value = "error")
              }, {
                default: a(() => [
                  w("下一步")
                ]),
                _: 1
              })) : R("", !0)
            ], 512), [
              [Q, y.value]
            ])
          ])), [
            [Q, u.value == "build"],
            [Me, k.value]
          ]),
          U(n("div", null, [
            n("div", il, [
              n("div", dl, [
                o(ie, {
                  icon: "error",
                  title: E(p)("编译失败")
                }, {
                  icon: a(() => [
                    vl
                  ]),
                  extra: a(() => [
                    T.value ? (v(), D(j, {
                      key: 0,
                      class: "max-h-[150px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]"
                    }, {
                      default: a(() => [
                        w(I(T.value), 1)
                      ]),
                      _: 1
                    })) : R("", !0),
                    N.value.analysis ? (v(), D(P, {
                      key: 1,
                      closable: !1,
                      class: "!mb-[15px] !w-full",
                      type: "warning"
                    }, {
                      default: a(() => [
                        n("div", _l, " 错误分析：" + I(N.value.analysis), 1)
                      ]),
                      _: 1
                    })) : R("", !0),
                    o(S, {
                      onClick: ne,
                      class: "!w-[90px]"
                    }, {
                      default: a(() => [
                        w("错误信息")
                      ]),
                      _: 1
                    }),
                    N.value.error_addon ? (v(), D(S, {
                      key: 2,
                      onClick: ce,
                      type: "primary",
                      plain: "",
                      class: "!w-[90px]"
                    }, {
                      default: a(() => [
                        w("重新编译")
                      ]),
                      _: 1
                    })) : R("", !0),
                    o(S, {
                      onClick: t[2] || (t[2] = (_) => i.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: a(() => [
                        w("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title"])
              ])
            ])
          ], 512), [
            [Q, u.value == "error"]
          ]),
          U(n("div", null, [
            n("div", pl, [
              n("div", fl, [
                o(ie, {
                  icon: "success",
                  title: E(p)("cloudbuild.cloudbuildSuccess"),
                  "sub-title": `编译耗时${oe.value}，成功编译完成。`
                }, {
                  icon: a(() => [
                    ml
                  ]),
                  extra: a(() => [
                    o(S, {
                      onClick: ne,
                      class: "!w-[90px]"
                    }, {
                      default: a(() => [
                        w("返回")
                      ]),
                      _: 1
                    }),
                    o(S, {
                      onClick: t[3] || (t[3] = (_) => i.value = !1),
                      type: "primary",
                      class: "!w-[90px]"
                    }, {
                      default: a(() => [
                        w("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "sub-title"])
              ])
            ])
          ], 512), [
            [Q, u.value == "complete"]
          ]),
          U(n("div", null, [
            n("div", hl, [
              n("div", gl, [
                o(Be, {
                  ref_key: "tableRef",
                  ref: ae,
                  data: X.value,
                  "row-key": "key",
                  size: "large",
                  onSelectionChange: he
                }, {
                  default: a(() => [
                    o(ee, {
                      type: "selection",
                      width: "55"
                    }),
                    o(ee, {
                      label: "应用信息",
                      align: "left",
                      width: "300"
                    }, {
                      default: a(({ row: _ }) => [
                        n("div", xl, [
                          o(ke, {
                            class: "w-[54px] h-[54px] rounded-[5px]",
                            src: _.icon,
                            fit: "contain"
                          }, {
                            error: a(() => [
                              bl
                            ]),
                            _: 2
                          }, 1032, ["src"]),
                          n("div", wl, [
                            n("div", yl, I(_.title), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    o(ee, {
                      label: "编译结果",
                      align: "left"
                    }, {
                      default: a(({ row: _ }) => [
                        N.value.error_addon && N.value.error_addon != _.key ? (v(), C("div", Sl, [
                          o(l, { class: "text-success mr-1" }, {
                            default: a(() => [
                              o(Ie)
                            ]),
                            _: 1
                          }),
                          w(" 编译成功 ")
                        ])) : (v(), C("div", kl, [
                          o(l, { class: "text-error mr-1" }, {
                            default: a(() => [
                              o(Ce)
                            ]),
                            _: 1
                          }),
                          w(" 编译失败，请排除该插件后重新进行编译 ")
                        ]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])
              ]),
              n("div", Il, [
                o(S, {
                  onClick: t[4] || (t[4] = (_) => ue()),
                  class: "!w-[90px]"
                }, {
                  default: a(() => [
                    w("取消")
                  ]),
                  _: 1
                }),
                o(S, {
                  onClick: t[5] || (t[5] = (_) => u.value = "error"),
                  plain: "",
                  type: "primary",
                  class: "!w-[90px]"
                }, {
                  default: a(() => [
                    w("上一步")
                  ]),
                  _: 1
                }),
                o(S, {
                  type: "primary",
                  onClick: ce,
                  loading: k.value,
                  class: "!w-[100px]"
                }, {
                  default: a(() => [
                    w("开始编译")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ])
          ], 512), [
            [Q, u.value == "again_build"]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const zl = /* @__PURE__ */ We(Cl, [["__scopeId", "data-v-5e2f0f19"]]);
export {
  zl as default
};
