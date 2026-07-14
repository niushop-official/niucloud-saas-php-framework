import { defineComponent as De, ref as h, computed as $e, watch as Fe, resolveComponent as g, resolveDirective as Le, openBlock as v, createBlock as D, unref as E, withCtx as a, withDirectives as U, createElementBlock as C, createElementVNode as n, toDisplayString as I, createVNode as o, Fragment as de, renderList as ve, createCommentVNode as R, vShow as Q, createTextVNode as w, pushScopeId as Ne, popScopeId as Oe } from "vue";
import { _ as je, a as Re } from "./success_icon-605a2b43.js";
import { _ as ze } from "./icon-addon-one-2b9cfff5.js";
import { ah as z, t as p, ai as Je, af as Ve, aj as Ae, ak as Pe, al as Ue, am as Qe, an as We, ao as _e, _ as qe } from "./core-shared-11c0a673.js";
import { g as Ge } from "./addon-051e3aa2.js";
import { _ as He, T as Ke } from "./dark-3dd028d8.js";
import { ElMessage as pe, ElMessageBox as te } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const q = (G) => (Ne("data-v-5e2f0f19"), G = G(), Oe(), G), Xe = { class: "h-[50vh]" }, Ye = {
  key: 0,
  class: "h-[50vh] flex flex-col"
}, Ze = {
  key: 0,
  class: "bg-[#fff] my-3"
}, el = { class: "pl-[20px]" }, ll = { class: "flex items-center" }, tl = /* @__PURE__ */ q(() => /* @__PURE__ */ n("span", { class: "ml-[5px] leading-[20px]" }, "编译权限错误，查看解决方案", -1)), al = /* @__PURE__ */ q(() => /* @__PURE__ */ n("div", { class: "border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center" }, "立即查看", -1)), ol = { class: "px-[20px] pt-[10px] text-[14px] el-table" }, sl = { key: 0 }, nl = { key: 1 }, rl = { key: 0 }, cl = { key: 1 }, ul = { class: "h-[45vh]" }, il = { class: "flex justify-end mt-[20px]" }, dl = { class: "h-[50vh] flex flex-col" }, vl = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, _l = /* @__PURE__ */ q(() => /* @__PURE__ */ n("img", {
  src: je,
  alt: ""
}, null, -1)), pl = { class: "text-left" }, fl = { class: "h-[50vh] flex flex-col" }, ml = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, hl = /* @__PURE__ */ q(() => /* @__PURE__ */ n("img", {
  src: Re,
  alt: ""
}, null, -1)), gl = { class: "h-[50vh] flex flex-col" }, xl = { class: "flex-1 h-0 flex items-center flex-col" }, bl = { class: "flex items-center cursor-pointer relative left-[-10px]" }, wl = /* @__PURE__ */ q(() => /* @__PURE__ */ n("div", { class: "flex items-center w-full h-full rounded-[5px]" }, [
  /* @__PURE__ */ n("img", {
    class: "max-w-full max-h-full",
    src: ze,
    alt: ""
  })
], -1)), yl = { class: "flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]" }, Sl = { class: "w-[236px] truncate leading-[18px]" }, kl = {
  key: 0,
  class: "flex items-center"
}, Il = {
  key: 1,
  class: "flex items-center"
}, Cl = { class: "flex justify-end mt-[20px]" }, fe = null, Bl = /* @__PURE__ */ De({
  __name: "index",
  setup(G, { expose: me }) {
    const i = h(!1), he = h(Date.now()), y = h(null), u = h("build"), W = h(null), k = h(!1), c = h(null), X = h([]), Y = h([]), ae = h(null);
    Ge().then(({ data: e }) => {
      Y.value = Object.values(e);
    });
    const ge = (e) => {
      X.value = e.map((t) => t.key);
    };
    let f = [], m = null;
    const Z = (e) => {
      m && m.close();
      const t = Je(e);
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
          e.type === "download_complete" && (e.action && !f.includes(e.action) && (c.value.pushMessage({ content: e.action }), f.push(e.action)), e.download_url && e.task_id && xe(e.task_id, e.download_url, e.authorize_code, e.timestamp));
    };
    let b = null;
    const xe = async (e, t, s, l) => {
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
    const oe = $e(() => {
      const e = M.value, t = Math.floor(e / 60), s = e % 60;
      return t > 0 ? `${t}分${s}秒` : `${s}秒`;
    }), se = () => {
      Ue().then(({ data: e }) => {
        e && (y.value = e, i.value || localStorage.setItem("cloud_build_task", "true"));
      }).catch();
    };
    se();
    const T = h(""), L = h(!1), N = h({}), J = () => {
      L.value = !0, Qe().then((e) => {
        if (!e.data) {
          i.value && f.length && (u.value = "complete", L.value = !1, c.value.execute("clear"), z(), r && clearInterval(r), localStorage.removeItem("cloud_build_start_time"), localStorage.removeItem("cloud_build_task")), fe && fe.close();
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
    }, be = () => {
      i.value = !0, u.value = "build", J();
    }, re = async () => {
      if (k.value = !0, u.value = "build", H.value = "normal", f = [], y.value) {
        i.value = !0, k.value = !1;
        const e = y.value.task_id;
        e ? Z(e) : J();
        return;
      }
      We().then(async ({ data: e }) => {
        e.is_pass ? _e().then(({ data: t }) => {
          k.value = !1, y.value = t, i.value = !0;
          const s = t.task_id;
          s ? Z(s) : J();
        }).catch(() => {
          i.value = !1, k.value = !1;
        }) : (k.value = !1, W.value = e, i.value = !0);
      }).catch((e) => {
        k.value = !1, i.value = !1, e.code && e.code == 601 ? te.confirm(
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
        u.value = "again_build", X.value = Y.value.map((e) => (ae.value.toggleRowSelection(e, !0), e.key));
        return;
      }
      k.value = !0, f = [], _e().then(({ data: e }) => {
        u.value = "build", k.value = !1, y.value = e, i.value = !0, localStorage.removeItem("cloud_build_start_time");
        const t = e.task_id;
        t ? Z(t) : J();
      }).catch(() => {
        i.value = !1, k.value = !1;
      });
    }, El = (e) => X.value.includes(e.key);
    let ee = null, V = null, A = null;
    const we = (e, t, s, l, d) => {
      if (t == "开始编译") {
        V = new Ke(), s(V);
        const B = ye(["/", "——", "\\", "|"]);
        ee = setInterval(() => {
          A ? V.flush(A + "<br>> " + B.next().value) : V.flush("> " + B.next().value);
        }, 150);
      }
    }, ye = (e) => {
      let t = 0;
      return {
        next() {
          return t + 1 == e.length && (t = 0), { value: e[t++] };
        }
      };
    }, Se = (e) => {
      F(), u.value == "build" && y.value && H.value == "normal" ? te.confirm(
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
      F(), u.value == "build" && y.value && H.value == "normal" ? te.confirm(
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
    }, ke = () => {
      window.open("https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html");
    };
    return Fe(() => i.value, () => {
      i.value || (F(), y.value = null, u.value = "build", f = [], ee && clearInterval(ee), V && V.finish(), r && clearInterval(r), x.value = null, M.value = 0, z());
    }), me({
      open: re,
      cloudBuildTask: y,
      loading: k,
      elNotificationClick: be,
      getCloudBuildTaskFn: se
    }), (e, t) => {
      const s = g("QuestionFilled"), l = g("el-icon"), d = g("el-col"), B = g("el-row"), K = g("Select"), O = g("CloseBold"), j = g("el-scrollbar"), S = g("el-button"), P = g("el-alert"), ie = g("el-result"), le = g("el-table-column"), Ie = g("el-image"), Ce = g("SuccessFilled"), Be = g("WarningFilled"), Ee = g("el-table"), Me = g("el-dialog"), Te = Le("loading");
      return v(), D(Me, {
        modelValue: i.value,
        "onUpdate:modelValue": t[6] || (t[6] = (_) => i.value = _),
        title: E(p)("cloudbuild.title"),
        width: "850px",
        "close-on-click-modal": !1,
        "close-on-press-escape": !1,
        "before-close": Se
      }, {
        default: a(() => [
          U((v(), C("div", Xe, [
            W.value && !y.value ? (v(), C("div", Ye, [
              W.value.dir ? (v(), C("div", Ze, [
                n("div", null, [
                  n("p", el, I(E(p)("cloudbuild.dirPermission")), 1),
                  n("div", {
                    class: "mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]",
                    onClick: ke
                  }, [
                    n("div", ll, [
                      o(l, { size: 17 }, {
                        default: a(() => [
                          o(s)
                        ]),
                        _: 1
                      }),
                      tl
                    ]),
                    al
                  ])
                ]),
                n("div", ol, [
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
                              _.status ? (v(), C("span", sl, [
                                o(l, { color: "green" }, {
                                  default: a(() => [
                                    o(K)
                                  ]),
                                  _: 1
                                })
                              ])) : (v(), C("span", nl, [
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
                              _.status ? (v(), C("span", rl, [
                                o(l, { color: "green" }, {
                                  default: a(() => [
                                    o(K)
                                  ]),
                                  _: 1
                                })
                              ])) : (v(), C("span", cl, [
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
            U(n("div", ul, [
              o(E(He), {
                ref_key: "terminalRef",
                ref: c,
                name: `cloud-build-${he.value}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: we
              }, null, 8, ["name"])
            ], 512), [
              [Q, y.value]
            ]),
            U(n("div", il, [
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
            [Te, k.value]
          ]),
          U(n("div", null, [
            n("div", dl, [
              n("div", vl, [
                o(ie, {
                  icon: "error",
                  title: E(p)("编译失败")
                }, {
                  icon: a(() => [
                    _l
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
                        n("div", pl, " 错误分析：" + I(N.value.analysis), 1)
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
            n("div", fl, [
              n("div", ml, [
                o(ie, {
                  icon: "success",
                  title: E(p)("cloudbuild.cloudbuildSuccess"),
                  "sub-title": `编译耗时${oe.value}，成功编译完成。`
                }, {
                  icon: a(() => [
                    hl
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
            n("div", gl, [
              n("div", xl, [
                o(Ee, {
                  ref_key: "tableRef",
                  ref: ae,
                  data: Y.value,
                  "row-key": "key",
                  size: "large",
                  onSelectionChange: ge
                }, {
                  default: a(() => [
                    o(le, {
                      type: "selection",
                      width: "55"
                    }),
                    o(le, {
                      label: "应用信息",
                      align: "left",
                      width: "300"
                    }, {
                      default: a(({ row: _ }) => [
                        n("div", bl, [
                          o(Ie, {
                            class: "w-[54px] h-[54px] rounded-[5px]",
                            src: _.icon,
                            fit: "contain"
                          }, {
                            error: a(() => [
                              wl
                            ]),
                            _: 2
                          }, 1032, ["src"]),
                          n("div", yl, [
                            n("div", Sl, I(_.title), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    o(le, {
                      label: "编译结果",
                      align: "left"
                    }, {
                      default: a(({ row: _ }) => [
                        N.value.error_addon && N.value.error_addon != _.key ? (v(), C("div", kl, [
                          o(l, { class: "text-success mr-1" }, {
                            default: a(() => [
                              o(Ce)
                            ]),
                            _: 1
                          }),
                          w(" 编译成功 ")
                        ])) : (v(), C("div", Il, [
                          o(l, { class: "text-error mr-1" }, {
                            default: a(() => [
                              o(Be)
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
              n("div", Cl, [
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
const Vl = /* @__PURE__ */ qe(Bl, [["__scopeId", "data-v-5e2f0f19"]]);
export {
  Vl as default
};
