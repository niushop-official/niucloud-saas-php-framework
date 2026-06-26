import { defineComponent as Ge, ref as r, computed as Je, watch as We, resolveComponent as b, openBlock as p, createElementBlock as f, Fragment as C, createVNode as s, unref as i, withCtx as a, createElementVNode as t, createBlock as I, createTextVNode as d, toDisplayString as o, createCommentVNode as w, withDirectives as U, vShow as A, renderList as me, normalizeClass as Xe, h as Te, pushScopeId as Ye, popScopeId as Ze } from "vue";
import { a as el, _ as ll } from "./success_icon-605a2b43.js";
import { g as tl, t as u, aq as al, ar as sl, as as nl, at as ol, au as ul, av as rl, s as Ve, aw as xe, _ as il } from "./core-shared-ca1fcae5.js";
import { c as pl } from "./module-15a2966b.js";
import { T as dl, _ as cl } from "./dark-eb307d84.js";
import { ElMessageBox as he, ElMessage as oe, ElNotification as vl } from "element-plus";
import { useRouter as fl } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const E = (K) => (Ye("data-v-77ddf864"), K = K(), Ze(), K), _l = { class: "text-lg" }, gl = { class: "font-bold px-[2px]" }, ml = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, "升级到", -1)), xl = { class: "font-bold px-[2px]" }, hl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, "版本", -1)), kl = { class: "font-bold px-[2px]" }, yl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, "当前版本", -1)), bl = { class: "font-bold px-[2px]" }, wl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, [
  /* @__PURE__ */ d("如需升级到最新版可在"),
  /* @__PURE__ */ t("a", {
    class: "text-primary",
    href: "https://www.niucloud.com",
    target: "_blank"
  }, "niucloud-admin官网"),
  /* @__PURE__ */ d("购买相关服务后再进行升级")
], -1)), Cl = {
  class: "h-[400px]",
  style: { overflow: "auto" }
}, El = {
  key: 0,
  class: "flex flex-col"
}, Bl = {
  key: 0,
  class: "bg-[#fff] my-3"
}, Tl = { class: "px-[20px] pt-[10px] text-[14px] el-table" }, Vl = { style: { height: "calc(300px)", overflow: "auto" } }, Ul = { key: 0 }, Al = { key: 1 }, $l = { key: 0 }, Sl = { key: 1 }, Il = { class: "h-[370px] mt-[30px]" }, Dl = { class: "flex flex-col" }, Fl = { class: "bg-[#fff] my-3" }, Ml = {
  key: 0,
  class: "p-[20px] mt-[20px] mx-[10px] border-[1px] border-[#E6E6E6] rounded-[10px]"
}, jl = { class: "flex justify-between items-center mt-[-9px]" }, Ll = { class: "text-[14px] text-[#374151] mb-[10px]" }, Nl = { class: "text-[14px] text-[#9699B6]" }, Ol = { key: 1 }, Hl = { class: "mt-[10px]" }, Rl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("img", {
  src: el,
  alt: ""
}, null, -1)), zl = {
  key: 0,
  class: "w-[750px]"
}, Pl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", { class: "text-error" }, "警告：", -1)), ql = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", { class: "text-black" }, "升级过程中发生云编译错误", -1)), Kl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("div", { class: "text-left mt-[10px] leading-8" }, [
  /* @__PURE__ */ t("div", { class: "font-bold" }, "为了保证系统稳定，建议您做以下处理:"),
  /* @__PURE__ */ t("div", null, [
    /* @__PURE__ */ t("span", { class: "w-[6px] h-[6px] rounded-[6px] bg-black inline-block mr-[10px]" }),
    /* @__PURE__ */ d("如果您是开发者，安装的框架或者插件二开过或者正在开发中，可能是因为您的本地代码不完整导致的云编译失败，需要自己调试并重新进行编译才算升级完成(云编译会把本地插件前端代码上传编译)。")
  ]),
  /* @__PURE__ */ t("div", null, [
    /* @__PURE__ */ t("span", { class: "w-[6px] h-[6px] rounded-[6px] bg-black inline-block mr-[10px]" }),
    /* @__PURE__ */ d("如果您没有二开过任何代码，可能是本地插件存在兼容性问题，请联系插件开发者或者官方客服解决。")
  ]),
  /* @__PURE__ */ t("div", null, [
    /* @__PURE__ */ t("span", { class: "w-[6px] h-[6px] rounded-[6px] bg-black inline-block mr-[10px]" }),
    /* @__PURE__ */ d("如果您的项目已经投入正式运营中，请立即回滚。")
  ])
], -1)), Ql = { class: "text-left mt-[10px]" }, Gl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("div", { class: "font-bold" }, "编译信息错误", -1)), Jl = { class: "mt-[10px] text-secondary overflow-hidden line-clamp-4" }, Wl = { class: "mt-[20px]" }, Xl = {
  key: 1,
  class: "mt-[20px]"
}, Yl = { class: "mt-[20px] h-[370px]" }, Zl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("img", {
  src: ll,
  alt: ""
}, null, -1)), et = { class: "dialog-footer" }, lt = ["innerHTML"], tt = { class: "flex justify-end" }, at = ["innerHTML"], st = { class: "flex justify-end" }, nt = /* @__PURE__ */ E(() => /* @__PURE__ */ t("div", { class: "flex items-center" }, [
  /* @__PURE__ */ t("span", null, "如需升级框架，请点击升级框架操作。")
], -1)), ot = { class: "dialog-footer" }, ut = /* @__PURE__ */ Ge({
  __name: "index",
  emits: ["complete", "cloudbuild"],
  setup(K, { expose: Ue, emit: Ae }) {
    const $e = fl(), Se = r(Date.now()), k = r(!1), c = r(null), j = r(!0), g = r(null), _ = r("upgrade"), y = r(1), L = r(null), B = r(!1), D = r(null), Ie = Ae, F = r(!1);
    let Q = [], ue = [];
    const G = r(!1), J = r(30);
    let N = null;
    const W = r({
      is_need_backup: !0,
      is_need_cloudbuild: !1
    });
    r([
      {
        name: "备份源码",
        code: "backupCode"
      },
      {
        name: "备份数据库",
        code: "backupSql"
      }
    ]);
    const X = r(!1), O = r(!1), De = r(null), re = r(0);
    let V = null;
    const H = r(!1), ie = r(""), M = () => {
      sl().then(({ data: l }) => {
        if (l) {
          if (!c.value) {
            if (c.value = l.upgrade_content, !l.upgrade_content || !Array.isArray(l.upgrade_content.content))
              return;
            let e = 0, m = 0;
            for (let x = 0; x < c.value.content.length; x++)
              c.value.content[x].version_list.length ? e++ : m++;
            c.value.content.length == e ? j.value = !0 : c.value.content.length == m && (j.value = !1);
          }
          if (!k.value) {
            je();
            return;
          }
          if (g.value || (O.value = !0, D.value.execute("clear"), D.value.execute("开始升级"), X.value = !0, De.value = Date.now(), re.value = 0, V && clearInterval(V), V = setInterval(() => {
            re.value++;
          }, 1e3)), g.value = l, l.log.forEach((e) => {
            Q.includes(e) || (e.indexOf("云编译任务正在排队") != -1 ? (ae = e, Q.push(e)) : (ae = null, D.value.pushMessage({ content: `${e}` }), Q.push(e)));
          }), l.error && (l.error.forEach((e) => {
            ue.includes(e) || (D.value.pushMessage({ content: e, class: "error" }), ue.push(e), ie.value = e);
          }), V && (clearInterval(V), V = null), X.value = !1), l.step == "restoreComplete") {
            P && clearInterval(P), y.value = 3, _.value = "fail";
            return;
          }
          if (l.step == "upgradeComplete") {
            l.cloud_build_error && D.value.pushMessage({ content: l.cloud_build_error, class: "error" }), y.value = 3, _.value = "complete", T.value = 4, R && R.close(), Ie("complete"), V && (clearInterval(V), V = null), X.value = !1;
            return;
          }
          T.value = 2, _.value = "upgrade", ee();
        }
      }).catch((l) => {
        console.log(l);
      });
    };
    M();
    const Fe = () => {
      z.value = !1, fe("niucloud-admin");
    }, Y = r(!1), Z = () => {
      _.value = "upgrade", Y.value = !0, O.value = !0, H.value = !1, y.value = 2;
    }, Me = Je(() => {
      const l = re.value, e = Math.floor(l / 3600), m = Math.floor(l % 3600 / 60), x = l % 60;
      return [
        e > 0 ? `${e}小时` : "",
        m > 0 ? `${m}分钟` : "",
        `${x}秒`
      ].filter(Boolean).join("");
    }), ee = () => {
      nl().then(() => {
        M();
      }).catch((l) => {
        l.msg.indexOf("队列") != -1 ? (J.value = 30, N = setInterval(() => {
          J.value--, J.value == 0 && q("retry");
        }, 1e3), G.value = !0) : l.code && l.code == 601 ? he.confirm(
          "云编译服务未启动，必须在启动后进行云编译！",
          "提示",
          {
            distinguishCancelAndClose: !0,
            confirmButtonText: "重新检测",
            cancelButtonText: "查看操作手册",
            type: "warning"
          }
        ).then(() => {
          fe();
        }).catch((e) => {
          e == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : l.response && l.response.status && l.response.status == 502 ? (oe({ dangerouslyUseHTMLString: !0, duration: 5e3, message: '程序执行超时请先调整超时限制, 具体操作方法<a style="text-decoration: underline;" href="https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-ba-3001-an-88c5-sheng-ji-guo-cheng-zhong-ti-shi-201c-502-bad-gateway-201d-wen-ti-jie-jue.html#%E5%AE%89%E8%A3%85-%E5%8D%87%E7%BA%A7%E5%AE%8C%E6%88%90%E5%90%8E-%E4%BA%91%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B%E4%B8%AD%E6%8F%90%E7%A4%BA-502-bad-gateway-%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3" target="blank">点击查看相关手册</a>', type: "error" }), setTimeout(() => {
          ee();
        }, 5e3)) : oe({ message: l.message, type: "error" });
      });
    };
    let R = null;
    const je = () => {
      R = vl.success({
        title: u("warning"),
        dangerouslyUseHTMLString: !0,
        message: Te("div", {}, [u("upgrade.upgradingTips"), Te("span", {
          class: "text-primary cursor-pointer",
          onClick: Le
        }, [u("upgrade.clickView")])]),
        duration: 0,
        showClose: !1
      });
    }, Le = () => {
      k.value = !0, M(), y.value = 2, T.value = 3, _.value = "upgrade", R && R.close();
    }, pe = r("");
    tl().then((l) => {
      pe.value = l.data.version.version;
    });
    const de = r("");
    pl().then(({ data: l }) => {
      de.value = l.last_version;
    });
    const ce = r(!1), le = r(!1), te = r(!1), ke = async () => {
      var e, m;
      if (le.value)
        return;
      le.value = !0, te.value = !0;
      const l = ((e = c.value) == null ? void 0 : e.upgrade_apps.join(",")) != "niucloud-admin" ? (m = c.value) == null ? void 0 : m.upgrade_apps.join(",") : "";
      await ol(l).then(async ({ data: x }) => {
        L.value = x, ce.value = x.is_pass, _.value = "upgrade", g.value ? T.value : T.value = 0, F.value = !1, k.value = !0, le.value = !1, te.value = !1;
      }).catch(() => {
        le.value = !1, te.value = !1;
      });
    }, Ne = () => {
      c.value.last_backup ? (_.value = "backup", T.value = 1) : ve();
    }, ve = () => {
      var e, m;
      if (!ce.value || B.value)
        return;
      B.value = !0;
      const l = ((e = c.value) == null ? void 0 : e.upgrade_apps.join(",")) != "niucloud-admin" ? (m = c.value) == null ? void 0 : m.upgrade_apps.join(",") : "";
      ul(l, W.value).then(() => {
        M();
      }).catch((x) => {
        B.value = !1, x.code && x.code == 601 ? he.confirm(
          "云编译服务未启动，必须在启动后进行云编译！",
          "提示",
          {
            distinguishCancelAndClose: !0,
            confirmButtonText: "重新检测",
            cancelButtonText: "查看操作手册",
            type: "warning"
          }
        ).then(() => {
          ve();
        }).catch(($) => {
          $ == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : oe({ message: x.msg, type: "error" });
      });
    }, z = r(!1), ye = r(""), be = r(""), we = r("app"), fe = (l = "", e = null, m = {}) => {
      if (H.value = !1, g.value)
        oe({ message: "已有正在执行中的升级任务", type: "error" }), k.value = !0, y.value = 2, T.value = 3, _.value = "upgrade", e && e();
      else {
        if (l && l.indexOf("niucloud-admin") == -1 && pe.value != de.value) {
          ye.value = m.install_info.version, be.value = m.version, we.value = m.type, z.value = !0, e && e();
          return;
        }
        if (B.value)
          return;
        B.value = !0, rl(l).then(({ data: x }) => {
          B.value = !1, c.value = x;
          let $ = 0, h = 0;
          for (let S = 0; S < c.value.content.length; S++)
            c.value.content[S].version_list.length ? $++ : h++;
          c.value.content.length == $ ? j.value = !0 : c.value.content.length == h && (j.value = !1), Ve.get("upgradeTipsLock") ? ke() : F.value = !0, e && e();
        }).catch(() => {
          B.value = !1, e && e();
        });
      }
    };
    let P = null;
    const _e = new dl();
    let ae = null;
    const Oe = (l, e, m, x, $) => {
      if (e == "开始升级") {
        m(_e);
        const h = He(["/", "——", "\\", "|"]);
        P = setInterval(() => {
          ae ? _e.flush(ae + "<br>> " + h.next().value) : _e.flush("> " + h.next().value);
        }, 150);
      }
    }, He = (l) => {
      let e = 0;
      return {
        next() {
          return e + 1 == l.length && (e = 0), { value: l[e++] };
        }
      };
    }, Re = (l) => {
      _.value == "upgrade" && g.value && ["upgradeComplete", "restoreComplete"].includes(g.value.step) === !1 && !Y.value ? he.confirm(u("upgrade.showDialogCloseTips"), u("warning"), {
        confirmButtonText: u("confirm"),
        cancelButtonText: u("cancel"),
        type: "warning"
      }).then(() => {
        l();
      }) : l();
    };
    window.addEventListener("beforeunload", function(l) {
      if (k.value && _.value == "upgrade" && g.value && ["upgradeComplete", "restoreComplete"].includes(g.value.step) === !1 && !Y.value)
        return l.preventDefault(), l.returnValue = "", u("upgrade.showDialogCloseTips");
    }), We(
      () => k.value,
      () => {
        k.value || ze();
      }
    );
    const ze = () => {
      _.value = "upgrade", B.value = !1, g.value = null, Y.value = !1, H.value = !1, ie.value = "", O.value = !1, Q = [], ue = [], T.value = 0, P && clearInterval(P), N && clearInterval(N), W.value = {
        is_need_backup: !0,
        is_need_cloudbuild: !0
      }, y.value = 1, al().then(() => {
      });
    }, q = (l) => {
      switch (G.value = !1, l) {
        case "local":
          xe(l).then(() => {
            M();
          });
          break;
        case "retry":
          ee(), N && clearInterval(N);
          break;
        case "rollback":
          xe(l).then(() => {
            M();
          });
          break;
        case "cloud_build_error_rollback":
          xe(l).then(() => {
            Z(), ee();
          });
          break;
      }
    }, Pe = (l = !1) => {
      l && Ve.set({ key: "upgradeTipsLock", data: l }), F.value = !1, !l && (k.value = !0);
    };
    r(0);
    const T = r(0), qe = () => {
      const l = $e.resolve({
        path: "/tools/backup_records"
      });
      window.open(l.href, "_blank");
    };
    return Ue({
      open: fe,
      loading: B
    }), (l, e) => {
      const m = b("el-alert"), x = b("el-step"), $ = b("el-steps"), h = b("el-col"), S = b("el-row"), Ce = b("Select"), se = b("el-icon"), Ee = b("CloseBold"), ge = b("el-scrollbar"), Ke = b("el-checkbox"), v = b("el-button"), Be = b("el-result"), ne = b("el-dialog");
      return p(), f(C, null, [
        s(ne, {
          modelValue: k.value,
          "onUpdate:modelValue": e[12] || (e[12] = (n) => k.value = n),
          title: i(u)("upgrade.title"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "before-close": Re
        }, {
          footer: a(() => [
            t("div", et, [
              y.value == 1 && c.value.content.length && j.value ? (p(), I(v, {
                key: 0,
                onClick: e[8] || (e[8] = (n) => y.value = 2),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.upgradeButton")), 1)
                ]),
                _: 1
              })) : w("", !0),
              U(s(v, {
                type: "primary",
                loading: X.value,
                class: "!w-[140px]"
              }, {
                default: a(() => [
                  d("已用时 " + o(Me.value), 1)
                ]),
                _: 1
              }, 8, ["loading"]), [
                [A, y.value == 2 && O.value && g.value && !H.value]
              ]),
              y.value == 2 && _.value != "complete" ? (p(), f(C, { key: 1 }, [
                _.value == "upgrade" && !g.value ? (p(), I(v, {
                  key: 0,
                  type: "primary",
                  disabled: !ce.value,
                  onClick: Ne
                }, {
                  default: a(() => [
                    d(o(i(u)("nextStep")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : w("", !0),
                _.value == "backup" ? (p(), I(v, {
                  key: 1,
                  onClick: e[9] || (e[9] = () => {
                    _.value = "upgrade", T.value = 1;
                  })
                }, {
                  default: a(() => [
                    d(o(i(u)("prev")), 1)
                  ]),
                  _: 1
                })) : w("", !0),
                _.value == "backup" ? (p(), I(v, {
                  key: 2,
                  type: "primary",
                  loading: B.value,
                  onClick: e[10] || (e[10] = () => {
                    ve();
                  })
                }, {
                  default: a(() => [
                    d(o(i(u)("nextStep")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])) : w("", !0),
                _.value == "complete" ? (p(), I(v, {
                  key: 3,
                  onClick: e[11] || (e[11] = (n) => k.value = !1)
                }, {
                  default: a(() => [
                    d(o(i(u)("complete")), 1)
                  ]),
                  _: 1
                })) : w("", !0)
              ], 64)) : w("", !0)
            ])
          ]),
          default: a(() => [
            c.value ? (p(), f(C, { key: 0 }, [
              y.value == 1 ? (p(!0), f(C, { key: 0 }, me(c.value.content, (n, Qe) => (p(), f(C, null, [
                t("div", _l, [
                  n.upgrade_version ? (p(), f(C, { key: 0 }, [
                    t("span", null, "【" + o(n.app.app_name) + "】本次升级将从", 1),
                    t("span", gl, o(n.version), 1),
                    ml,
                    t("span", xl, o(n.upgrade_version), 1),
                    hl
                  ], 64)) : (p(), f(C, { key: 1 }, [
                    c.value.content.length > 1 ? (p(), f(C, { key: 0 }, [
                      t("span", null, "【" + o(n.app.app_name) + "】当前版本", 1),
                      t("span", kl, o(n.version), 1)
                    ], 64)) : (p(), f(C, { key: 1 }, [
                      yl,
                      t("span", bl, o(n.version), 1)
                    ], 64))
                  ], 64))
                ]),
                n.upgrade_version != n.last_version ? (p(), f("div", {
                  key: 0,
                  class: Xe(["mt-[10px]", { "mb-[10px]": Qe + 1 < c.value.content.length }])
                }, [
                  s(m, {
                    type: "info",
                    "show-icon": "",
                    closable: !1
                  }, {
                    title: a(() => [
                      t("span", null, "当前最新版本为" + o(n.last_version) + "，您的服务" + o(n.expire_time ? `已于${n.expire_time}到期` : "长期有效") + "。", 1),
                      wl
                    ]),
                    _: 2
                  }, 1024)
                ], 2)) : w("", !0)
              ], 64))), 256)) : w("", !0),
              U(t("div", null, [
                s($, {
                  active: T.value,
                  "align-center": "",
                  class: "number-of-steps",
                  "process-status": "process"
                }, {
                  default: a(() => [
                    s(x, {
                      title: i(u)("testDirectoryPermissions")
                    }, null, 8, ["title"]),
                    s(x, {
                      title: i(u)("upgrade.option")
                    }, null, 8, ["title"]),
                    s(x, {
                      title: i(u)("startUpgrade")
                    }, null, 8, ["title"]),
                    s(x, {
                      title: i(u)("upgradeEnd")
                    }, null, 8, ["title"])
                  ]),
                  _: 1
                }, 8, ["active"]),
                t("div", Cl, [
                  U(t("div", null, [
                    L.value && !g.value ? (p(), f("div", El, [
                      s(ge, null, {
                        default: a(() => [
                          L.value.dir ? (p(), f("div", Bl, [
                            t("div", Tl, [
                              s(S, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
                                default: a(() => [
                                  s(h, { span: 18 }, {
                                    default: a(() => [
                                      t("span", null, o(i(u)("upgrade.path")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  s(h, { span: 3 }, {
                                    default: a(() => [
                                      t("span", null, o(i(u)("upgrade.demand")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  s(h, { span: 3 }, {
                                    default: a(() => [
                                      t("span", null, o(i(u)("status")), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              t("div", Vl, [
                                (p(!0), f(C, null, me(L.value.dir.is_readable, (n) => (p(), I(S, { class: "pb-[10px] items pl-[15px]" }, {
                                  default: a(() => [
                                    s(h, { span: 18 }, {
                                      default: a(() => [
                                        t("span", null, o(n.dir), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    s(h, { span: 3 }, {
                                      default: a(() => [
                                        t("span", null, o(i(u)("upgrade.readable")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    s(h, { span: 3 }, {
                                      default: a(() => [
                                        n.status ? (p(), f("span", Ul, [
                                          s(se, { color: "green" }, {
                                            default: a(() => [
                                              s(Ce)
                                            ]),
                                            _: 1
                                          })
                                        ])) : (p(), f("span", Al, [
                                          s(se, { color: "red" }, {
                                            default: a(() => [
                                              s(Ee)
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
                                (p(!0), f(C, null, me(L.value.dir.is_write, (n) => (p(), I(S, { class: "pb-[10px] items pl-[15px]" }, {
                                  default: a(() => [
                                    s(h, { span: 18 }, {
                                      default: a(() => [
                                        t("span", null, o(n.dir), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    s(h, { span: 3 }, {
                                      default: a(() => [
                                        t("span", null, o(i(u)("upgrade.write")), 1)
                                      ]),
                                      _: 1
                                    }),
                                    s(h, { span: 3 }, {
                                      default: a(() => [
                                        n.status ? (p(), f("span", $l, [
                                          s(se, { color: "green" }, {
                                            default: a(() => [
                                              s(Ce)
                                            ]),
                                            _: 1
                                          })
                                        ])) : (p(), f("span", Sl, [
                                          s(se, { color: "red" }, {
                                            default: a(() => [
                                              s(Ee)
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
                              ])
                            ])
                          ])) : w("", !0)
                        ]),
                        _: 1
                      })
                    ])) : w("", !0),
                    U(t("div", Il, [
                      s(i(cl), {
                        ref_key: "terminalRef",
                        ref: D,
                        name: `upgrade-${Se.value}`,
                        context: g.value ? g.value.upgrade.app_key : "",
                        "init-log": null,
                        "show-header": !1,
                        "show-log-time": !0,
                        onExecCmd: Oe
                      }, null, 8, ["name", "context"])
                    ], 512), [
                      [A, O.value && g.value && !H.value]
                    ])
                  ], 512), [
                    [A, _.value == "upgrade"]
                  ]),
                  U(t("div", Dl, [
                    s(ge, null, {
                      default: a(() => [
                        t("div", Fl, [
                          c.value.last_backup ? (p(), f("div", Ml, [
                            t("div", jl, [
                              s(Ke, {
                                modelValue: W.value.is_need_backup,
                                "onUpdate:modelValue": e[0] || (e[0] = (n) => W.value.is_need_backup = n),
                                label: i(u)("upgrade.isNeedBackup"),
                                "true-value": !0,
                                "false-value": !1,
                                size: "large"
                              }, null, 8, ["modelValue", "label"]),
                              s(v, {
                                link: "",
                                type: "primary",
                                class: "!text-[#9699B6]",
                                onClick: qe
                              }, {
                                default: a(() => [
                                  d(o(i(u)("upgrade.isNeedBackupBtn")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            t("div", Ll, o(i(u)("upgrade.isNeedBackupTips")), 1),
                            t("div", Nl, o(i(u)("上次备份时间：")) + o(c.value.last_backup.complete_time), 1)
                          ])) : w("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ], 512), [
                    [A, _.value == "backup"]
                  ])
                ])
              ], 512), [
                [A, y.value == 2]
              ]),
              y.value == 3 ? (p(), f("div", Ol, [
                U(t("div", Hl, [
                  s(Be, {
                    icon: "success",
                    title: i(u)("upgrade.upgradeSuccess")
                  }, {
                    icon: a(() => [
                      Rl
                    ]),
                    extra: a(() => [
                      U(t("div", { class: "text-[16px] text-[#4F516D] mt-[-5px]" }, o(i(u)("upgrade.upgradeCompleteTips")), 513), [
                        [A, g.value && g.value.executed && !g.value.executed.includes("cloudBuild")]
                      ]),
                      g.value.cloud_build_error ? (p(), f("div", zl, [
                        s(m, {
                          class: "!w-[750px] border-warning !border-[1px] !rounded-[0px] border-solid",
                          type: "warning",
                          closable: !1
                        }, {
                          title: a(() => [
                            Pl,
                            ql
                          ]),
                          _: 1
                        }),
                        Kl,
                        t("div", Ql, [
                          Gl,
                          t("div", Jl, o(g.value.cloud_build_error), 1)
                        ]),
                        t("div", Wl, [
                          s(v, {
                            onClick: e[1] || (e[1] = (n) => Z()),
                            class: "!w-[90px]"
                          }, {
                            default: a(() => [
                              d("更多信息")
                            ]),
                            _: 1
                          }),
                          s(v, {
                            onClick: e[2] || (e[2] = (n) => k.value = !1),
                            type: "primary",
                            plain: "",
                            class: "!w-[90px]"
                          }, {
                            default: a(() => [
                              d("我已知晓")
                            ]),
                            _: 1
                          }),
                          s(v, {
                            onClick: e[3] || (e[3] = (n) => q("cloud_build_error_rollback")),
                            type: "primary",
                            class: "!w-[90px]"
                          }, {
                            default: a(() => [
                              d("回滚")
                            ]),
                            _: 1
                          })
                        ])
                      ])) : (p(), f("div", Xl, [
                        s(v, {
                          onClick: e[4] || (e[4] = (n) => Z()),
                          class: "!w-[90px]"
                        }, {
                          default: a(() => [
                            d("返回")
                          ]),
                          _: 1
                        }),
                        s(v, {
                          onClick: e[5] || (e[5] = (n) => k.value = !1),
                          type: "primary",
                          class: "!w-[90px]"
                        }, {
                          default: a(() => [
                            d("完成")
                          ]),
                          _: 1
                        })
                      ]))
                    ]),
                    _: 1
                  }, 8, ["title"])
                ], 512), [
                  [A, _.value == "complete"]
                ]),
                U(t("div", Yl, [
                  s(Be, {
                    icon: "error",
                    title: i(u)("升级失败")
                  }, {
                    icon: a(() => [
                      Zl
                    ]),
                    extra: a(() => [
                      s(ge, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                        default: a(() => [
                          d(o(ie.value), 1)
                        ]),
                        _: 1
                      }),
                      s(v, {
                        onClick: e[6] || (e[6] = (n) => Z()),
                        class: "!w-[90px]"
                      }, {
                        default: a(() => [
                          d("错误信息")
                        ]),
                        _: 1
                      }),
                      s(v, {
                        onClick: e[7] || (e[7] = (n) => k.value = !1),
                        type: "primary",
                        class: "!w-[90px]"
                      }, {
                        default: a(() => [
                          d("完成")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["title"])
                ], 512), [
                  [A, _.value == "fail"]
                ])
              ])) : w("", !0)
            ], 64)) : w("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        s(ne, {
          modelValue: F.value,
          "onUpdate:modelValue": e[16] || (e[16] = (n) => F.value = n),
          title: i(u)("warning"),
          width: "500px",
          draggable: ""
        }, {
          footer: a(() => [
            t("div", tt, [
              s(v, {
                onClick: e[13] || (e[13] = (n) => Pe(!0)),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.knownToKnow")), 1)
                ]),
                _: 1
              }),
              s(v, {
                onClick: e[14] || (e[14] = (n) => ke()),
                type: "primary",
                plain: "",
                loading: te.value
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.upgradeButton")), 1)
                ]),
                _: 1
              }, 8, ["loading"]),
              s(v, {
                onClick: e[15] || (e[15] = (n) => F.value = !1)
              }, {
                default: a(() => [
                  d(o(i(u)("cancel")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            t("span", {
              innerHTML: i(u)("upgrade.upgradeTips")
            }, null, 8, lt)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        s(ne, {
          modelValue: G.value,
          "onUpdate:modelValue": e[20] || (e[20] = (n) => G.value = n),
          title: i(u)("warning"),
          width: "500px",
          draggable: "",
          "show-close": !1
        }, {
          footer: a(() => [
            t("div", st, [
              s(v, {
                onClick: e[17] || (e[17] = (n) => q("local")),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.localBuild")), 1)
                ]),
                _: 1
              }),
              s(v, {
                onClick: e[18] || (e[18] = (n) => q("retry")),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.cloudBuild")) + "（" + o(J.value) + "S）", 1)
                ]),
                _: 1
              }),
              s(v, {
                onClick: e[19] || (e[19] = (n) => q("rollback")),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.rollback")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            t("span", {
              innerHTML: i(u)("upgrade.cloudBuildErrorTips")
            }, null, 8, at)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        s(ne, {
          modelValue: z.value,
          "onUpdate:modelValue": e[22] || (e[22] = (n) => z.value = n),
          title: "升级提示",
          width: "500",
          "before-close": l.handleClose
        }, {
          footer: a(() => [
            t("div", ot, [
              s(v, {
                type: "primary",
                onClick: Fe
              }, {
                default: a(() => [
                  d("升级框架")
                ]),
                _: 1
              }),
              s(v, {
                onClick: e[21] || (e[21] = (n) => z.value = !1)
              }, {
                default: a(() => [
                  d("取消")
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            t("p", null, "您当前使用的" + o(we.value == "app" ? "应用" : "插件") + "版本是 " + o(ye.value) + "，若想升级到 " + o(be.value) + " 版本，需要先把框架从 v" + o(pe.value) + " 升级到 v" + o(de.value) + " 。", 1),
            nt
          ]),
          _: 1
        }, 8, ["modelValue", "before-close"])
      ], 64);
    };
  }
});
const ht = /* @__PURE__ */ il(ut, [["__scopeId", "data-v-77ddf864"]]);
export {
  ht as default
};
