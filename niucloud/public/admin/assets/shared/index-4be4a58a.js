import { defineComponent as Je, ref as r, computed as We, watch as Xe, resolveComponent as b, openBlock as p, createElementBlock as g, Fragment as C, createVNode as s, unref as i, withCtx as a, createElementVNode as t, createBlock as $, createTextVNode as d, toDisplayString as o, createCommentVNode as w, withDirectives as I, vShow as S, renderList as me, normalizeClass as Ye, pushScopeId as Ze, popScopeId as el, h as Be } from "vue";
import { a as ll, _ as tl } from "./success_icon-605a2b43.js";
import { g as al, t as u, ar as sl, as as nl, at as ol, au as ul, av as rl, aw as il, s as Ae, ax as xe, _ as pl } from "./core-shared-0b2facad.js";
import { c as dl } from "./module-ef2a531c.js";
import { T as cl, _ as vl } from "./dark-3dd028d8.js";
import { ElMessageBox as he, ElMessage as re, ElNotification as fl } from "element-plus";
import { useRouter as _l } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const E = (Q) => (Ze("data-v-2e79ffdb"), Q = Q(), el(), Q), gl = { class: "text-lg" }, ml = { class: "font-bold px-[2px]" }, xl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, "升级到", -1)), hl = { class: "font-bold px-[2px]" }, kl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, "版本", -1)), yl = { class: "font-bold px-[2px]" }, bl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, "当前版本", -1)), wl = { class: "font-bold px-[2px]" }, Cl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", null, [
  /* @__PURE__ */ d("如需升级到最新版可在"),
  /* @__PURE__ */ t("a", {
    class: "text-primary",
    href: "https://www.niucloud.com",
    target: "_blank"
  }, "niucloud-admin官网"),
  /* @__PURE__ */ d("购买相关服务后再进行升级")
], -1)), El = {
  class: "h-[400px]",
  style: { overflow: "auto" }
}, Tl = {
  key: 0,
  class: "flex flex-col"
}, Bl = {
  key: 0,
  class: "bg-[#fff] my-3"
}, Al = { class: "px-[20px] pt-[10px] text-[14px] el-table" }, Ul = { style: { height: "calc(300px)", overflow: "auto" } }, Vl = { key: 0 }, $l = { key: 1 }, Il = { key: 0 }, Sl = { key: 1 }, Nl = { class: "h-[370px] mt-[30px]" }, Dl = { class: "flex flex-col" }, Ml = { class: "bg-[#fff] my-3" }, Fl = {
  key: 0,
  class: "p-[20px] mt-[20px] mx-[10px] border-[1px] border-[#E6E6E6] rounded-[10px]"
}, jl = { class: "flex justify-between items-center mt-[-9px]" }, Ll = { class: "text-[14px] text-[#374151] mb-[10px]" }, Ol = { class: "text-[14px] text-[#9699B6]" }, Hl = { key: 1 }, Rl = { class: "mt-[10px]" }, zl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("img", {
  src: ll,
  alt: ""
}, null, -1)), Pl = {
  key: 0,
  class: "w-[750px]"
}, ql = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", { class: "text-error" }, "警告：", -1)), Kl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("span", { class: "text-black" }, "升级过程中发生云编译错误", -1)), Ql = /* @__PURE__ */ E(() => /* @__PURE__ */ t("div", { class: "text-left mt-[10px] leading-8" }, [
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
], -1)), Gl = { class: "text-left mt-[10px]" }, Jl = /* @__PURE__ */ E(() => /* @__PURE__ */ t("div", { class: "font-bold" }, "编译信息错误", -1)), Wl = { class: "mt-[10px] text-secondary overflow-hidden line-clamp-4" }, Xl = { class: "mt-[20px]" }, Yl = {
  key: 1,
  class: "mt-[20px]"
}, Zl = { class: "mt-[20px] h-[370px]" }, et = /* @__PURE__ */ E(() => /* @__PURE__ */ t("img", {
  src: tl,
  alt: ""
}, null, -1)), lt = { class: "dialog-footer" }, tt = ["innerHTML"], at = { class: "flex justify-end" }, st = ["innerHTML"], nt = { class: "flex justify-end" }, ot = /* @__PURE__ */ E(() => /* @__PURE__ */ t("div", { class: "flex items-center" }, [
  /* @__PURE__ */ t("span", null, "如需升级框架，请点击升级框架操作。")
], -1)), ut = { class: "dialog-footer" }, rt = /* @__PURE__ */ Je({
  __name: "index",
  emits: ["complete", "cloudbuild"],
  setup(Q, { expose: Ue, emit: Ve }) {
    const $e = _l(), Ie = r(Date.now()), k = r(!1), c = r(null), F = r(!0), x = r(null), m = r("upgrade"), y = r(1), j = r(null), T = r(!1), N = r(null), Se = Ve, D = r(!1);
    let G = [], ie = [];
    const J = r(!1), W = r(30);
    let L = null;
    const X = r({
      is_need_backup: !0,
      is_need_cloudbuild: !1
    }), it = r([
      {
        name: "备份源码",
        code: "backupCode"
      },
      {
        name: "备份数据库",
        code: "backupSql"
      }
    ]), Y = r(!1), O = r(!1), Ne = r(null), pe = r(0);
    let A = null;
    const H = r(!1), de = r(""), M = () => {
      nl().then(({ data: l }) => {
        if (l) {
          if (!c.value) {
            if (c.value = l.upgrade_content, !l.upgrade_content || !Array.isArray(l.upgrade_content.content))
              return;
            let e = 0, v = 0;
            for (let f = 0; f < c.value.content.length; f++)
              c.value.content[f].version_list.length ? e++ : v++;
            c.value.content.length == e ? F.value = !0 : c.value.content.length == v && (F.value = !1);
          }
          if (!k.value) {
            Fe();
            return;
          }
          if (x.value || (O.value = !0, N.value.execute("clear"), N.value.execute("开始升级"), Y.value = !0, Ne.value = Date.now(), pe.value = 0, A && clearInterval(A), A = setInterval(() => {
            pe.value++;
          }, 1e3)), x.value = l, l.log.forEach((e) => {
            G.includes(e) || (e.indexOf("云编译任务正在排队") != -1 ? (ne = e, G.push(e)) : (ne = null, N.value.pushMessage({ content: `${e}` }), G.push(e)));
          }), l.error && (l.error.forEach((e) => {
            ie.includes(e) || (N.value.pushMessage({ content: e, class: "error" }), ie.push(e), de.value = e);
          }), A && (clearInterval(A), A = null), Y.value = !1), l.step == "restoreComplete") {
            q && clearInterval(q), y.value = 3, m.value = "fail";
            return;
          }
          if (l.step == "upgradeComplete") {
            l.cloud_build_error && N.value.pushMessage({ content: l.cloud_build_error, class: "error" }), y.value = 3, m.value = "complete", B.value = 4, z && z.close(), Se("complete"), A && (clearInterval(A), A = null), Y.value = !1;
            return;
          }
          B.value = 2, m.value = "upgrade", R();
        }
      }).catch((l) => {
        console.log(l), setTimeout(() => {
          R();
        }, 5e3);
      });
    };
    M();
    const De = () => {
      P.value = !1, fe("niucloud-admin");
    }, Z = r(!1), ee = () => {
      m.value = "upgrade", Z.value = !0, O.value = !0, H.value = !1, y.value = 2;
    }, Me = We(() => {
      const l = pe.value, e = Math.floor(l / 3600), v = Math.floor(l % 3600 / 60), f = l % 60;
      return [
        e > 0 ? `${e}小时` : "",
        v > 0 ? `${v}分钟` : "",
        `${f}秒`
      ].filter(Boolean).join("");
    }), R = () => {
      ol().then(() => {
        M();
      }).catch((l) => {
        l.msg.indexOf("队列") != -1 ? (W.value = 30, L = setInterval(() => {
          W.value--, W.value == 0 && K("retry");
        }, 1e3), J.value = !0) : l.code && l.code == 601 ? he.confirm(
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
        }) : l.response && l.response.status && l.response.status == 502 ? (re({ dangerouslyUseHTMLString: !0, duration: 5e3, message: '程序执行超时请先调整超时限制, 具体操作方法<a style="text-decoration: underline;" href="https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-ba-3001-an-88c5-sheng-ji-guo-cheng-zhong-ti-shi-201c-502-bad-gateway-201d-wen-ti-jie-jue.html#%E5%AE%89%E8%A3%85-%E5%8D%87%E7%BA%A7%E5%AE%8C%E6%88%90%E5%90%8E-%E4%BA%91%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B%E4%B8%AD%E6%8F%90%E7%A4%BA-502-bad-gateway-%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3" target="blank">点击查看相关手册</a>', type: "error" }), setTimeout(() => {
          R();
        }, 5e3)) : re({ message: l.message, type: "error" });
      });
    };
    let z = null;
    const Fe = () => {
      z = fl.success({
        title: u("warning"),
        dangerouslyUseHTMLString: !0,
        message: Be("div", {}, [u("upgrade.upgradingTips"), Be("span", {
          class: "text-primary cursor-pointer",
          onClick: je
        }, [u("upgrade.clickView")])]),
        duration: 0,
        showClose: !1
      });
    }, je = () => {
      k.value = !0, M(), y.value = 2, B.value = 3, m.value = "upgrade", z && z.close();
    }, le = r("");
    al().then((l) => {
      le.value = l.data.version.version;
    });
    const te = r("");
    dl().then(({ data: l }) => {
      te.value = l.last_version;
    });
    const ce = r(!1), ae = r(!1), se = r(!1), ke = async () => {
      var e, v;
      if (ae.value)
        return;
      ae.value = !0, se.value = !0;
      const l = ((e = c.value) == null ? void 0 : e.upgrade_apps.join(",")) != "niucloud-admin" ? (v = c.value) == null ? void 0 : v.upgrade_apps.join(",") : "";
      await ul(l).then(async ({ data: f }) => {
        j.value = f, ce.value = f.is_pass, m.value = "upgrade", x.value ? B.value : B.value = 0, D.value = !1, k.value = !0, ae.value = !1, se.value = !1;
      }).catch(() => {
        ae.value = !1, se.value = !1;
      });
    }, Le = () => {
      c.value.last_backup ? (m.value = "backup", B.value = 1) : ve();
    }, ve = () => {
      var e, v;
      if (!ce.value || T.value)
        return;
      T.value = !0;
      const l = ((e = c.value) == null ? void 0 : e.upgrade_apps.join(",")) != "niucloud-admin" ? (v = c.value) == null ? void 0 : v.upgrade_apps.join(",") : "";
      rl(l, X.value).then(() => {
        M();
      }).catch((f) => {
        T.value = !1, f.code && f.code == 601 ? he.confirm(
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
        }).catch((U) => {
          U == "cancel" && window.open("https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html", "_blank");
        }) : re({ message: f.msg, type: "error" });
      });
    }, Oe = (l, e) => isNaN(parseInt(e.replaceAll(".", ""))) || isNaN(parseInt(l.replaceAll(".", ""))) ? !1 : parseInt(e.replaceAll(".", "")) > parseInt(l.replaceAll(".", "")), P = r(!1), ye = r(""), be = r(""), we = r("app"), fe = (l = "", e = null, v = {}) => {
      if (H.value = !1, x.value)
        re({ message: "已有正在执行中的升级任务", type: "error" }), k.value = !0, y.value = 2, B.value = 3, m.value = "upgrade", e && e();
      else {
        if (l && l.indexOf("niucloud-admin") == -1 && le.value != te.value && Oe(le.value, te.value)) {
          ye.value = v.install_info.version, be.value = v.version, we.value = v.type, P.value = !0, e && e();
          return;
        }
        if (T.value)
          return;
        T.value = !0, il(l).then(({ data: f }) => {
          T.value = !1, c.value = f;
          let U = 0, h = 0;
          for (let V = 0; V < c.value.content.length; V++)
            c.value.content[V].version_list.length ? U++ : h++;
          c.value.content.length == U ? F.value = !0 : c.value.content.length == h && (F.value = !1), Ae.get("upgradeTipsLock") ? ke() : D.value = !0, e && e();
        }).catch(() => {
          T.value = !1, e && e();
        });
      }
    };
    let q = null;
    const _e = new cl();
    let ne = null;
    const He = (l, e, v, f, U) => {
      if (e == "开始升级") {
        v(_e);
        const h = Re(["/", "——", "\\", "|"]);
        q = setInterval(() => {
          ne ? _e.flush(ne + "<br>> " + h.next().value) : _e.flush("> " + h.next().value);
        }, 150);
      }
    }, Re = (l) => {
      let e = 0;
      return {
        next() {
          return e + 1 == l.length && (e = 0), { value: l[e++] };
        }
      };
    }, ze = (l) => {
      m.value == "upgrade" && x.value && ["upgradeComplete", "restoreComplete"].includes(x.value.step) === !1 && !Z.value ? he.confirm(u("upgrade.showDialogCloseTips"), u("warning"), {
        confirmButtonText: u("confirm"),
        cancelButtonText: u("cancel"),
        type: "warning"
      }).then(() => {
        l();
      }) : l();
    };
    window.addEventListener("beforeunload", function(l) {
      if (k.value && m.value == "upgrade" && x.value && ["upgradeComplete", "restoreComplete"].includes(x.value.step) === !1 && !Z.value)
        return l.preventDefault(), l.returnValue = "", u("upgrade.showDialogCloseTips");
    }), Xe(
      () => k.value,
      () => {
        k.value || Pe();
      }
    );
    const Pe = () => {
      m.value = "upgrade", T.value = !1, x.value = null, Z.value = !1, H.value = !1, de.value = "", O.value = !1, G = [], ie = [], B.value = 0, q && clearInterval(q), L && clearInterval(L), X.value = {
        is_need_backup: !0,
        is_need_cloudbuild: !0
      }, y.value = 1, sl().then(() => {
      });
    }, K = (l) => {
      switch (J.value = !1, l) {
        case "local":
          xe(l).then(() => {
            M();
          });
          break;
        case "retry":
          R(), L && clearInterval(L);
          break;
        case "rollback":
          xe(l).then(() => {
            M();
          });
          break;
        case "cloud_build_error_rollback":
          xe(l).then(() => {
            ee(), R();
          });
          break;
      }
    }, pt = (l) => {
      const [e, v] = l.split(" "), [f, U] = v.split(":");
      return [e, `${f}:${U}`];
    }, qe = (l = !1) => {
      l && Ae.set({ key: "upgradeTipsLock", data: l }), D.value = !1, !l && (k.value = !0);
    }, dt = r(0), B = r(0), Ke = () => {
      const l = $e.resolve({
        path: "/tools/backup_records"
      });
      window.open(l.href, "_blank");
    };
    return Ue({
      open: fe,
      loading: T
    }), (l, e) => {
      const v = b("el-alert"), f = b("el-step"), U = b("el-steps"), h = b("el-col"), V = b("el-row"), Ce = b("Select"), oe = b("el-icon"), Ee = b("CloseBold"), ge = b("el-scrollbar"), Qe = b("el-checkbox"), _ = b("el-button"), Te = b("el-result"), ue = b("el-dialog");
      return p(), g(C, null, [
        s(ue, {
          modelValue: k.value,
          "onUpdate:modelValue": e[12] || (e[12] = (n) => k.value = n),
          title: i(u)("upgrade.title"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "before-close": ze
        }, {
          footer: a(() => [
            t("div", lt, [
              y.value == 1 && c.value.content.length && F.value ? (p(), $(_, {
                key: 0,
                onClick: e[8] || (e[8] = (n) => y.value = 2),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.upgradeButton")), 1)
                ]),
                _: 1
              })) : w("", !0),
              I(s(_, {
                type: "primary",
                loading: Y.value,
                class: "!w-[140px]"
              }, {
                default: a(() => [
                  d("已用时 " + o(Me.value), 1)
                ]),
                _: 1
              }, 8, ["loading"]), [
                [S, y.value == 2 && O.value && x.value && !H.value]
              ]),
              y.value == 2 && m.value != "complete" ? (p(), g(C, { key: 1 }, [
                m.value == "upgrade" && !x.value ? (p(), $(_, {
                  key: 0,
                  type: "primary",
                  disabled: !ce.value,
                  onClick: Le
                }, {
                  default: a(() => [
                    d(o(i(u)("nextStep")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])) : w("", !0),
                m.value == "backup" ? (p(), $(_, {
                  key: 1,
                  onClick: e[9] || (e[9] = () => {
                    m.value = "upgrade", B.value = 1;
                  })
                }, {
                  default: a(() => [
                    d(o(i(u)("prev")), 1)
                  ]),
                  _: 1
                })) : w("", !0),
                m.value == "backup" ? (p(), $(_, {
                  key: 2,
                  type: "primary",
                  loading: T.value,
                  onClick: e[10] || (e[10] = () => {
                    ve();
                  })
                }, {
                  default: a(() => [
                    d(o(i(u)("nextStep")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])) : w("", !0),
                m.value == "complete" ? (p(), $(_, {
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
            c.value ? (p(), g(C, { key: 0 }, [
              y.value == 1 ? (p(!0), g(C, { key: 0 }, me(c.value.content, (n, Ge) => (p(), g(C, null, [
                t("div", gl, [
                  n.upgrade_version ? (p(), g(C, { key: 0 }, [
                    t("span", null, "【" + o(n.app.app_name) + "】本次升级将从", 1),
                    t("span", ml, o(n.version), 1),
                    xl,
                    t("span", hl, o(n.upgrade_version), 1),
                    kl
                  ], 64)) : (p(), g(C, { key: 1 }, [
                    c.value.content.length > 1 ? (p(), g(C, { key: 0 }, [
                      t("span", null, "【" + o(n.app.app_name) + "】当前版本", 1),
                      t("span", yl, o(n.version), 1)
                    ], 64)) : (p(), g(C, { key: 1 }, [
                      bl,
                      t("span", wl, o(n.version), 1)
                    ], 64))
                  ], 64))
                ]),
                n.upgrade_version != n.last_version ? (p(), g("div", {
                  key: 0,
                  class: Ye(["mt-[10px]", { "mb-[10px]": Ge + 1 < c.value.content.length }])
                }, [
                  s(v, {
                    type: "info",
                    "show-icon": "",
                    closable: !1
                  }, {
                    title: a(() => [
                      t("span", null, "当前最新版本为" + o(n.last_version) + "，您的服务" + o(n.expire_time ? `已于${n.expire_time}到期` : "长期有效") + "。", 1),
                      Cl
                    ]),
                    _: 2
                  }, 1024)
                ], 2)) : w("", !0)
              ], 64))), 256)) : w("", !0),
              I(t("div", null, [
                s(U, {
                  active: B.value,
                  "align-center": "",
                  class: "number-of-steps",
                  "process-status": "process"
                }, {
                  default: a(() => [
                    s(f, {
                      title: i(u)("testDirectoryPermissions")
                    }, null, 8, ["title"]),
                    s(f, {
                      title: i(u)("upgrade.option")
                    }, null, 8, ["title"]),
                    s(f, {
                      title: i(u)("startUpgrade")
                    }, null, 8, ["title"]),
                    s(f, {
                      title: i(u)("upgradeEnd")
                    }, null, 8, ["title"])
                  ]),
                  _: 1
                }, 8, ["active"]),
                t("div", El, [
                  I(t("div", null, [
                    j.value && !x.value ? (p(), g("div", Tl, [
                      s(ge, null, {
                        default: a(() => [
                          j.value.dir ? (p(), g("div", Bl, [
                            t("div", Al, [
                              s(V, { class: "py-[10px] items table-head-bg pl-[15px] mb-[10px]" }, {
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
                              t("div", Ul, [
                                (p(!0), g(C, null, me(j.value.dir.is_readable, (n) => (p(), $(V, { class: "pb-[10px] items pl-[15px]" }, {
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
                                        n.status ? (p(), g("span", Vl, [
                                          s(oe, { color: "green" }, {
                                            default: a(() => [
                                              s(Ce)
                                            ]),
                                            _: 1
                                          })
                                        ])) : (p(), g("span", $l, [
                                          s(oe, { color: "red" }, {
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
                                (p(!0), g(C, null, me(j.value.dir.is_write, (n) => (p(), $(V, { class: "pb-[10px] items pl-[15px]" }, {
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
                                        n.status ? (p(), g("span", Il, [
                                          s(oe, { color: "green" }, {
                                            default: a(() => [
                                              s(Ce)
                                            ]),
                                            _: 1
                                          })
                                        ])) : (p(), g("span", Sl, [
                                          s(oe, { color: "red" }, {
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
                    I(t("div", Nl, [
                      s(i(vl), {
                        ref_key: "terminalRef",
                        ref: N,
                        name: `upgrade-${Ie.value}`,
                        context: x.value ? x.value.upgrade.app_key : "",
                        "init-log": null,
                        "show-header": !1,
                        "show-log-time": !0,
                        onExecCmd: He
                      }, null, 8, ["name", "context"])
                    ], 512), [
                      [S, O.value && x.value && !H.value]
                    ])
                  ], 512), [
                    [S, m.value == "upgrade"]
                  ]),
                  I(t("div", Dl, [
                    s(ge, null, {
                      default: a(() => [
                        t("div", Ml, [
                          c.value.last_backup ? (p(), g("div", Fl, [
                            t("div", jl, [
                              s(Qe, {
                                modelValue: X.value.is_need_backup,
                                "onUpdate:modelValue": e[0] || (e[0] = (n) => X.value.is_need_backup = n),
                                label: i(u)("upgrade.isNeedBackup"),
                                "true-value": !0,
                                "false-value": !1,
                                size: "large"
                              }, null, 8, ["modelValue", "label"]),
                              s(_, {
                                link: "",
                                type: "primary",
                                class: "!text-[#9699B6]",
                                onClick: Ke
                              }, {
                                default: a(() => [
                                  d(o(i(u)("upgrade.isNeedBackupBtn")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            t("div", Ll, o(i(u)("upgrade.isNeedBackupTips")), 1),
                            t("div", Ol, o(i(u)("上次备份时间：")) + o(c.value.last_backup.complete_time), 1)
                          ])) : w("", !0)
                        ])
                      ]),
                      _: 1
                    })
                  ], 512), [
                    [S, m.value == "backup"]
                  ])
                ])
              ], 512), [
                [S, y.value == 2]
              ]),
              y.value == 3 ? (p(), g("div", Hl, [
                I(t("div", Rl, [
                  s(Te, {
                    icon: "success",
                    title: i(u)("upgrade.upgradeSuccess")
                  }, {
                    icon: a(() => [
                      zl
                    ]),
                    extra: a(() => [
                      x.value.cloud_build_error ? (p(), g("div", Pl, [
                        s(v, {
                          class: "!w-[750px] border-warning !border-[1px] !rounded-[0px] border-solid",
                          type: "warning",
                          closable: !1
                        }, {
                          title: a(() => [
                            ql,
                            Kl
                          ]),
                          _: 1
                        }),
                        Ql,
                        t("div", Gl, [
                          Jl,
                          t("div", Wl, o(x.value.cloud_build_error), 1)
                        ]),
                        t("div", Xl, [
                          s(_, {
                            onClick: e[1] || (e[1] = (n) => ee()),
                            class: "!w-[90px]"
                          }, {
                            default: a(() => [
                              d("更多信息")
                            ]),
                            _: 1
                          }),
                          s(_, {
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
                          s(_, {
                            onClick: e[3] || (e[3] = (n) => K("cloud_build_error_rollback")),
                            type: "primary",
                            class: "!w-[90px]"
                          }, {
                            default: a(() => [
                              d("回滚")
                            ]),
                            _: 1
                          })
                        ])
                      ])) : (p(), g("div", Yl, [
                        s(_, {
                          onClick: e[4] || (e[4] = (n) => ee()),
                          class: "!w-[90px]"
                        }, {
                          default: a(() => [
                            d("返回")
                          ]),
                          _: 1
                        }),
                        s(_, {
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
                  [S, m.value == "complete"]
                ]),
                I(t("div", Zl, [
                  s(Te, {
                    icon: "error",
                    title: i(u)("升级失败")
                  }, {
                    icon: a(() => [
                      et
                    ]),
                    extra: a(() => [
                      s(ge, { class: "max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]" }, {
                        default: a(() => [
                          d(o(de.value), 1)
                        ]),
                        _: 1
                      }),
                      s(_, {
                        onClick: e[6] || (e[6] = (n) => ee()),
                        class: "!w-[90px]"
                      }, {
                        default: a(() => [
                          d("错误信息")
                        ]),
                        _: 1
                      }),
                      s(_, {
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
                  [S, m.value == "fail"]
                ])
              ])) : w("", !0)
            ], 64)) : w("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        s(ue, {
          modelValue: D.value,
          "onUpdate:modelValue": e[16] || (e[16] = (n) => D.value = n),
          title: i(u)("warning"),
          width: "500px",
          draggable: ""
        }, {
          footer: a(() => [
            t("div", at, [
              s(_, {
                onClick: e[13] || (e[13] = (n) => qe(!0)),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.knownToKnow")), 1)
                ]),
                _: 1
              }),
              s(_, {
                onClick: e[14] || (e[14] = (n) => ke()),
                type: "primary",
                plain: "",
                loading: se.value
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.upgradeButton")), 1)
                ]),
                _: 1
              }, 8, ["loading"]),
              s(_, {
                onClick: e[15] || (e[15] = (n) => D.value = !1)
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
            }, null, 8, tt)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        s(ue, {
          modelValue: J.value,
          "onUpdate:modelValue": e[20] || (e[20] = (n) => J.value = n),
          title: i(u)("warning"),
          width: "500px",
          draggable: "",
          "show-close": !1
        }, {
          footer: a(() => [
            t("div", nt, [
              s(_, {
                onClick: e[17] || (e[17] = (n) => K("local")),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.localBuild")), 1)
                ]),
                _: 1
              }),
              s(_, {
                onClick: e[18] || (e[18] = (n) => K("retry")),
                type: "primary"
              }, {
                default: a(() => [
                  d(o(i(u)("upgrade.cloudBuild")) + "（" + o(W.value) + "S）", 1)
                ]),
                _: 1
              }),
              s(_, {
                onClick: e[19] || (e[19] = (n) => K("rollback")),
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
            }, null, 8, st)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        s(ue, {
          modelValue: P.value,
          "onUpdate:modelValue": e[22] || (e[22] = (n) => P.value = n),
          title: "升级提示",
          width: "500",
          "before-close": l.handleClose
        }, {
          footer: a(() => [
            t("div", ut, [
              s(_, {
                type: "primary",
                onClick: De
              }, {
                default: a(() => [
                  d("升级框架")
                ]),
                _: 1
              }),
              s(_, {
                onClick: e[21] || (e[21] = (n) => P.value = !1)
              }, {
                default: a(() => [
                  d("取消")
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            t("p", null, "您当前使用的" + o(we.value == "app" ? "应用" : "插件") + "版本是 " + o(ye.value) + "，若想升级到 " + o(be.value) + " 版本，需要先把框架从 v" + o(le.value) + " 升级到 v" + o(te.value) + " 。", 1),
            ot
          ]),
          _: 1
        }, 8, ["modelValue", "before-close"])
      ], 64);
    };
  }
});
const wt = /* @__PURE__ */ pl(rt, [["__scopeId", "data-v-2e79ffdb"]]);
export {
  wt as default
};
