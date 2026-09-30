import { defineComponent as nt, markRaw as q, ref as d, reactive as re, computed as de, watch as st, onMounted as it, onBeforeUnmount as ct, resolveComponent as m, resolveDirective as rt, openBlock as r, createElementBlock as _, createVNode as a, withCtx as n, createTextVNode as u, createElementVNode as s, unref as y, withDirectives as ue, Fragment as $, renderList as L, normalizeStyle as pe, createBlock as h, resolveDynamicComponent as Re, toDisplayString as p, createCommentVNode as x, normalizeClass as dt, Teleport as ut, Transition as pt, pushScopeId as _t, popScopeId as vt } from "vue";
import { ElMessage as V } from "element-plus";
import { Monitor as mt, Iphone as ft, ChatDotRound as gt, Box as Le, Refresh as _e, ArrowDown as De, CircleCheckFilled as kt } from "@element-plus/icons-vue";
import { ak as yt, gB as Ue, gC as ht, gD as xt, gE as bt, an as wt, al as Ct, gF as Vt, gG as zt, gH as $t, a as Tt } from "./core-shared-c6ad4e77.js";
import { a as St } from "./addon-bae583af.js";
import Mt from "./index-559a9b12.js";
import Ne from "./index-997caa57.js";
import Bt from "./index-e3370990.js";
import Rt from "./index-2fe2c142.js";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const D = (U) => (_t("data-v-4fe7208c"), U = U(), vt(), U), Lt = { class: "main-container page-sections w-full" }, Dt = { class: "flex items-center justify-between mb-4" }, Ut = /* @__PURE__ */ D(() => /* @__PURE__ */ s("span", { class: "text-[16px] font-bold" }, "编译端口", -1)), Nt = { class: "grid grid-cols-2 gap-[12px]" }, Pt = { class: "port-layer-base" }, Et = { class: "port-card" }, Ft = { class: "min-w-0 flex-1" }, It = { class: "port-title" }, At = { class: "port-desc" }, jt = {
  key: 0,
  class: "port-version"
}, Ht = { class: "port-card-side" }, Ot = { class: "flex items-center gap-[8px]" }, Kt = ["onMouseenter"], qt = {
  key: 0,
  class: "col-span-2 py-[20px] text-center text-[13px] text-[#94a3b8]"
}, Gt = {
  key: 0,
  class: "table-panel"
}, Yt = { class: "flex flex-col" }, Jt = { class: "font-medium" }, Qt = { class: "text-[12px] text-[#94a3b8]" }, Wt = { class: "flex items-center gap-[8px]" }, Xt = { class: "w-[38px] text-right text-[12px] text-[#6b7280]" }, Zt = { class: "text-[13px] text-[var(--el-text-color-regular)]" }, el = { class: "table-panel" }, tl = { class: "flex items-center gap-[6px]" }, ll = { class: "text-[12px] text-[var(--el-text-color-regular)]" }, ol = /* @__PURE__ */ D(() => /* @__PURE__ */ s("div", { class: "py-[30px] text-[13px] text-[#94a3b8]" }, "暂无版本记录", -1)), al = /* @__PURE__ */ D(() => /* @__PURE__ */ s("div", { class: "dialog-section-title" }, "选择编译范围", -1)), nl = { class: "scope-list" }, sl = ["onClick"], il = { class: "min-w-0 flex-1" }, cl = { class: "scope-label" }, rl = { class: "scope-desc" }, dl = {
  key: 1,
  class: "scope-radio"
}, ul = /* @__PURE__ */ D(() => /* @__PURE__ */ s("div", { class: "dialog-section-title mt-[14px]" }, [
  /* @__PURE__ */ u(" 选择插件"),
  /* @__PURE__ */ s("span", { class: "ml-[6px] text-[12px] font-normal text-[#8b90a7]" }, "（可多选）")
], -1)), pl = {
  key: 0,
  class: "flex h-full flex-col"
}, _l = { class: "port-card" }, vl = { class: "min-w-0 flex-1" }, ml = { class: "port-title" }, fl = { class: "port-desc" }, gl = {
  key: 0,
  class: "port-version"
}, kl = { class: "port-card-side" }, yl = { class: "flex items-center gap-[8px]" }, hl = { class: "port-command-trigger" }, xl = { class: "port-command-panel is-open" }, bl = { class: "port-command-body" }, wl = /* @__PURE__ */ D(() => /* @__PURE__ */ s("div", { class: "port-command-head" }, "编译命令", -1)), Cl = { class: "flex items-center justify-between gap-[8px]" }, Vl = { class: "port-command-scope" }, zl = { class: "port-command-text" }, $l = {
  key: 0,
  class: "port-command-empty"
}, Tl = /* @__PURE__ */ nt({
  __name: "cloud_compile",
  setup(U) {
    const w = yt(), Pe = {
      Monitor: q(mt),
      Iphone: q(ft),
      ChatDotRound: q(gt),
      Box: q(Le)
    }, ve = (e) => Pe[e] || Le, v = d(null), me = d({});
    let T = null;
    const Ee = (e, t) => {
      if (z(), v.value && v.value.key === e.key)
        return;
      const i = t.currentTarget.closest(".port-card-wrap");
      if (!i)
        return;
      const c = i.getBoundingClientRect(), C = i.querySelector(".port-card"), se = C ? C.getBoundingClientRect().height : c.height, K = Math.floor(window.innerHeight - c.top - c.height - 16);
      v.value = e, me.value = {
        position: "fixed",
        zIndex: "2000",
        boxSizing: "border-box",
        left: `${c.left}px`,
        top: `${Math.max(8, c.top)}px`,
        width: `${c.width}px`,
        minHeight: `${c.height}px`,
        "--port-card-h": `${se}px`,
        "--port-panel-max": `${Math.min(Math.max(K, 150), 460)}px`
      };
    }, z = () => {
      T !== null && (clearTimeout(T), T = null);
    }, fe = (e) => {
      const t = e == null ? void 0 : e.relatedTarget;
      t instanceof Element && t.closest(".port-float") || (z(), T = window.setTimeout(() => {
        v.value = null, T = null;
      }, 120));
    }, ge = (e) => {
      z();
      const t = v.value;
      v.value = null, t && e(t);
    }, N = () => {
      z(), v.value = null;
    }, Fe = (e) => {
      if (!e)
        return;
      const t = () => V.success("命令已复制");
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(e).then(t).catch(() => ke(e, t));
        return;
      }
      ke(e, t);
    }, ke = (e, t) => {
      const o = document.createElement("textarea");
      o.value = e, o.style.position = "fixed", o.style.opacity = "0", document.body.appendChild(o), o.select();
      try {
        document.execCommand("copy") ? t() : V.warning("复制失败，请手动选择复制");
      } catch {
        V.warning("复制失败，请手动选择复制");
      } finally {
        document.body.removeChild(o);
      }
    }, S = d([]), P = d(!1), E = d(!1), F = () => {
      P.value = !0, bt().then((e) => {
        S.value = (e == null ? void 0 : e.data) ?? [];
      }).catch(() => {
        S.value = [];
      }).finally(() => {
        P.value = !1;
      });
    }, M = d(!1), Ie = d(null), ye = d({}), G = d(null), he = (e, t = {}, o = {}) => {
      G.value = { port: e, options: t, versionInfo: o }, ye.value = {
        scope: t.scope || "all",
        port: e != null && e.key ? [e.key] : [],
        addon: t.addon || []
      }, M.value = !0;
    }, Ae = () => {
      const e = G.value;
      M.value = !1, G.value = null, e && xe(e.port, e.options, e.versionInfo);
    }, xe = (e, t = {}, o = {}) => {
      !e || !e.key || (E.value = !0, w.openPendingDetail("cloud_build", "正在发起编译"), wt("cloud_build", {
        scope: t.scope || "all",
        port: [e.key],
        addon: t.addon || [],
        ...o
      }).then(async (i) => {
        var C;
        const c = (C = i == null ? void 0 : i.data) == null ? void 0 : C.task_key;
        if (!c) {
          w.closePendingDetail(), V.error("任务创建失败");
          return;
        }
        await w.start(c), await j(), X({ task_key: c });
      }).catch((i) => {
        w.closePendingDetail();
      }).finally(() => {
        E.value = !1;
      }));
    }, B = d(!1), Y = d(null), be = d(null), k = re({ version: "", remark: "" }), je = {
      version: [{ required: !0, message: "请输入版本号", trigger: "blur" }]
    }, He = () => {
      const e = new Date(), t = (o) => String(o).padStart(2, "0");
      return `${e.getFullYear()}.${t(e.getMonth() + 1)}.${t(e.getDate())}.${t(e.getHours())}${t(e.getMinutes())}${t(e.getSeconds())}`;
    }, we = (e) => {
      e && (Y.value = e, k.version = He(), k.remark = "", B.value = !0);
    }, Oe = () => {
      var e;
      (e = be.value) == null || e.validate((t) => {
        t && (he(Y.value, { scope: "all", addon: [] }, {
          version: k.version,
          remark: k.remark
        }), B.value = !1);
      });
    }, R = d(!1), I = d(null), A = d([]), J = d(!1), Ke = de(() => {
      var e;
      return ((e = I.value) == null ? void 0 : e.scopes) ?? [];
    }), g = re({ scope: "all", addon: [] }), qe = () => {
      A.value.length > 0 || (J.value = !0, St().then((e) => {
        const t = Array.isArray(e == null ? void 0 : e.data) ? e.data : Object.values((e == null ? void 0 : e.data) || {});
        A.value = t.map((o) => ({
          key: o.key ?? o.addon,
          label: o.title || o.name || o.key
        })).filter((o) => !!o.key);
      }).catch(() => {
        A.value = [];
      }).finally(() => {
        J.value = !1;
      }));
    }, Ce = (e) => {
      var o;
      if (!e)
        return;
      I.value = e;
      const t = (e == null ? void 0 : e.scopes) ?? [];
      if (t.length <= 1) {
        xe(e, { scope: (e == null ? void 0 : e.default_scope) || "all", addon: [] });
        return;
      }
      g.scope = (e == null ? void 0 : e.default_scope) || ((o = t[0]) == null ? void 0 : o.value) || "all", g.addon = [], R.value = !0, qe();
    }, Ge = () => {
      if (g.scope === "plugin" && !g.addon.length) {
        V.warning("请选择要编译的插件");
        return;
      }
      he(I.value, { scope: g.scope, addon: g.addon }), R.value = !1;
    }, Q = d(!1), W = de(() => Object.values(w.tasks).find(
      (t) => (t == null ? void 0 : t.taskType) === "cloud_build" && !Ue.includes(String((t == null ? void 0 : t.status) ?? ""))
    ) ?? null), Ve = de(() => W.value ? [W.value] : []), j = async () => {
      Q.value = !0;
      try {
        const e = await Ct(), t = e == null ? void 0 : e.data, i = (Array.isArray(t == null ? void 0 : t.list) && t.list.length ? t.list : t != null && t.task_key ? [t] : []).find((c) => (c == null ? void 0 : c.task_type) === "cloud_build" && !Ue.includes(String((c == null ? void 0 : c.status) ?? "")));
        i != null && i.task_key && await w.attach(String(i.task_key));
      } catch {
      } finally {
        Q.value = !1;
      }
    };
    st(() => {
      var e;
      return ((e = W.value) == null ? void 0 : e.taskKey) ?? "";
    }, (e, t) => {
      t && !e && (b(), F());
    });
    function Ye(e) {
      return e === "success" ? "success" : e === "failed" || e === "rollback_failed" ? "danger" : e === "canceled" || e === "rolled_back" ? "info" : e === "waiting_input" ? "warning" : "primary";
    }
    function Je(e) {
      return {
        created: "已创建",
        running: "执行中",
        waiting_input: "等待决策",
        rolling_back: "回滚中",
        success: "成功",
        failed: "失败",
        canceled: "已取消",
        rolled_back: "已回滚",
        rollback_failed: "回滚失败"
      }[e] ?? e ?? "-";
    }
    function Qe(e) {
      return e === "success" ? "success" : e === "failed" || e === "rollback_failed" ? "exception" : "";
    }
    const X = (e) => {
      const t = (e == null ? void 0 : e.task_key) ?? (e == null ? void 0 : e.taskKey);
      t && w.openDetail(String(t), "cloud_build");
    }, Z = d([]), ee = d(!1), te = d(1), H = d(10), le = d(0), oe = re({ port_key: "" }), b = () => {
      ee.value = !0, ht({
        page: te.value,
        limit: H.value,
        port_key: oe.port_key
      }).then((e) => {
        const t = (e == null ? void 0 : e.data) ?? {};
        Z.value = t.data ?? [], le.value = t.total ?? 0;
      }).catch(() => {
        Z.value = [];
      }).finally(() => {
        ee.value = !1;
      });
    }, Sl = (e) => {
      Vt(e.id, e.release_status === 1 ? 0 : 1).then(() => b());
    }, We = (e) => {
      zt([e.id]).then(() => b());
    }, Xe = (e) => X({ task_key: e.task_key }), Ze = async (e) => {
      try {
        const t = await $t(e.task_key);
        if (!t)
          return;
        if (t != null && t.type && String(t.type).indexOf("application/json") !== -1) {
          V.error("产物不存在或已被清理");
          return;
        }
        const o = URL.createObjectURL(t), i = document.createElement("a");
        i.href = o, i.download = `${e.port_key}-${e.version}.zip`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(o);
      } catch {
        V.error("下载失败");
      }
    }, ae = d(!1), O = d({}), Ml = (e) => {
      O.value = e, ae.value = !0;
    }, et = () => {
      j(), b(), F();
    };
    function ne(e) {
      if (!e)
        return "-";
      if (typeof e == "string" && (e.includes("-") || e.includes("/")))
        return e;
      const t = Number(e);
      if (!t || Number.isNaN(t))
        return "-";
      const o = new Date(t * 1e3), i = (c) => String(c).padStart(2, "0");
      return `${o.getFullYear()}-${i(o.getMonth() + 1)}-${i(o.getDate())} ${i(o.getHours())}:${i(o.getMinutes())}:${i(o.getSeconds())}`;
    }
    function tt(e) {
      const t = Number(e ?? 0);
      if (t <= 0)
        return "0 B";
      const o = ["B", "KB", "MB", "GB", "TB"], i = Math.min(Math.floor(Math.log(t) / Math.log(1024)), o.length - 1);
      return (i === 0 ? String(t) : (t / Math.pow(1024, i)).toFixed(2)) + " " + o[i];
    }
    return it(() => {
      F(), j(), b(), window.addEventListener("scroll", N, !0), window.addEventListener("resize", N);
    }), ct(() => {
      z(), window.removeEventListener("scroll", N, !0), window.removeEventListener("resize", N);
    }), (e, t) => {
      var Me, Be;
      const o = m("el-button"), i = m("el-icon"), c = m("el-table-column"), C = m("el-tag"), se = m("el-progress"), K = m("el-table"), ze = m("el-option"), $e = m("el-select"), lt = m("el-popconfirm"), Te = m("el-input"), Se = m("el-form-item"), ot = m("el-form"), ie = m("el-dialog"), at = m("el-drawer"), ce = rt("loading");
      return r(), _("div", Lt, [
        a(Bt, null, {
          default: n(() => [
            u(" 发版与云编译都会发起一次云编译任务（全局同时只能执行一个任务）。区别：发版固定按「整体编译」执行并需填写版本信息，编译成功后会生成版本记录；云编译可选择编译范围，不生成版本记录。 ")
          ]),
          _: 1
        }),
        s("div", null, [
          s("div", Dt, [
            Ut,
            a(o, {
              link: "",
              type: "primary",
              size: "small",
              icon: y(_e),
              onClick: F
            }, {
              default: n(() => [
                u("刷新")
              ]),
              _: 1
            }, 8, ["icon"])
          ]),
          ue((r(), _("div", Nt, [
            (r(!0), _($, null, L(S.value, (l) => (r(), _("div", {
              key: l.key,
              class: "port-card-wrap",
              onMouseleave: fe
            }, [
              s("div", Pt, [
                s("div", Et, [
                  s("span", {
                    class: "port-icon",
                    style: pe({ color: l.color || "var(--sys-color-primary)" })
                  }, [
                    a(i, { size: 18 }, {
                      default: n(() => [
                        (r(), h(Re(ve(l.icon))))
                      ]),
                      _: 2
                    }, 1024)
                  ], 4),
                  s("div", Ft, [
                    s("div", It, p(l.label), 1),
                    s("div", At, p(l.desc || "-"), 1),
                    l.last_version ? (r(), _("div", jt, " 最近版本 " + p(l.last_version.version) + " · " + p(ne(l.last_version.complete_time)), 1)) : x("", !0)
                  ]),
                  s("div", Ht, [
                    s("div", Ot, [
                      a(o, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: (f) => we(l)
                      }, {
                        default: n(() => [
                          u("发版")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a(o, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: (f) => Ce(l)
                      }, {
                        default: n(() => [
                          u("云编译")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    s("span", {
                      class: "port-command-trigger",
                      onMouseenter: (f) => Ee(l, f)
                    }, [
                      u(" 编译命令 "),
                      a(i, { size: 12 }, {
                        default: n(() => [
                          a(y(De))
                        ]),
                        _: 1
                      })
                    ], 40, Kt)
                  ])
                ])
              ])
            ], 32))), 128)),
            !S.value.length && !P.value ? (r(), _("div", qt, " 暂无可用端口 ")) : x("", !0)
          ])), [
            [ce, P.value]
          ])
        ]),
        y(Ve).length ? (r(), _("div", Gt, [
          a(Ne, {
            title: "构建任务",
            selectable: !1
          }, {
            actions: n(() => [
              a(o, {
                link: "",
                type: "primary",
                size: "small",
                icon: y(_e),
                onClick: j
              }, {
                default: n(() => [
                  u("刷新")
                ]),
                _: 1
              }, 8, ["icon"])
            ]),
            _: 1
          }),
          ue((r(), h(K, { data: y(Ve) }, {
            default: n(() => [
              a(c, {
                label: "目标/版本",
                "min-width": "180",
                "show-overflow-tooltip": ""
              }, {
                default: n(({ row: l }) => [
                  s("div", Yt, [
                    s("span", Jt, p(l.title || l.taskKey), 1),
                    s("span", Qt, p(l.taskKey), 1)
                  ])
                ]),
                _: 1
              }),
              a(c, {
                label: "状态",
                width: "100"
              }, {
                default: n(({ row: l }) => [
                  a(C, {
                    type: Ye(l.status),
                    size: "small",
                    effect: "light"
                  }, {
                    default: n(() => [
                      u(p(Je(l.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              a(c, {
                label: "进度",
                "min-width": "170"
              }, {
                default: n(({ row: l }) => [
                  s("div", Wt, [
                    a(se, {
                      percentage: Number(l.progress ?? 0),
                      "stroke-width": 6,
                      "show-text": !1,
                      class: "flex-1",
                      status: Qe(l.status)
                    }, null, 8, ["percentage", "status"]),
                    s("span", Xt, p(Number(l.progress ?? 0)) + "%", 1)
                  ])
                ]),
                _: 1
              }),
              a(c, {
                label: "信息",
                "min-width": "180",
                "show-overflow-tooltip": ""
              }, {
                default: n(({ row: l }) => [
                  s("span", Zt, p(l.stage || "-"), 1)
                ]),
                _: 1
              }),
              a(c, {
                label: "操作",
                width: "90",
                fixed: "right"
              }, {
                default: n(({ row: l }) => [
                  a(o, {
                    link: "",
                    type: "primary",
                    size: "small",
                    onClick: (f) => X(l)
                  }, {
                    default: n(() => [
                      u("详情")
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ce, Q.value]
          ])
        ])) : x("", !0),
        s("div", el, [
          a(Ne, {
            title: "构建版本",
            selectable: !1
          }, {
            actions: n(() => [
              a($e, {
                modelValue: oe.port_key,
                "onUpdate:modelValue": t[0] || (t[0] = (l) => oe.port_key = l),
                placeholder: "全部端口",
                clearable: "",
                size: "small",
                class: "!w-[140px]",
                onChange: b
              }, {
                default: n(() => [
                  (r(!0), _($, null, L(S.value, (l) => (r(), h(ze, {
                    key: l.key,
                    label: l.label,
                    value: l.key
                  }, null, 8, ["label", "value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue"]),
              a(o, {
                link: "",
                type: "primary",
                size: "small",
                icon: y(_e),
                onClick: b
              }, {
                default: n(() => [
                  u("刷新")
                ]),
                _: 1
              }, 8, ["icon"])
            ]),
            _: 1
          }),
          ue((r(), h(K, { data: Z.value }, {
            empty: n(() => [
              ol
            ]),
            default: n(() => [
              a(c, {
                prop: "port_name",
                label: "端口",
                width: "120"
              }),
              a(c, {
                prop: "version",
                label: "版本",
                width: "130",
                "show-overflow-tooltip": ""
              }),
              a(c, {
                prop: "remark",
                label: "版本说明",
                "min-width": "180",
                "show-overflow-tooltip": ""
              }),
              a(c, {
                label: "产物",
                width: "190"
              }, {
                default: n(({ row: l }) => [
                  s("div", tl, [
                    s("span", ll, p(l.artifact_count) + " 个文件 · " + p(tt(l.artifact_size)), 1),
                    a(o, {
                      link: "",
                      type: "primary",
                      size: "small",
                      onClick: (f) => Ze(l)
                    }, {
                      default: n(() => [
                        u("下载")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ])
                ]),
                _: 1
              }),
              a(c, {
                label: "生成时间",
                width: "170"
              }, {
                default: n(({ row: l }) => [
                  u(p(ne(l.complete_time)), 1)
                ]),
                _: 1
              }),
              a(c, {
                label: "操作",
                width: "200",
                fixed: "right"
              }, {
                default: n(({ row: l }) => [
                  a(o, {
                    link: "",
                    type: "primary",
                    size: "small",
                    onClick: (f) => Xe(l)
                  }, {
                    default: n(() => [
                      u("任务详情")
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  a(lt, {
                    title: "确认删除该版本记录？",
                    "confirm-button-text": "删除",
                    "cancel-button-text": "取消",
                    "confirm-button-type": "danger",
                    onConfirm: (f) => We(l)
                  }, {
                    reference: n(() => [
                      a(o, {
                        link: "",
                        type: "danger",
                        size: "small"
                      }, {
                        default: n(() => [
                          u("删除")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["onConfirm"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ce, ee.value]
          ]),
          le.value > H.value ? (r(), h(Mt, {
            key: 0,
            "current-page": te.value,
            "onUpdate:current-page": t[1] || (t[1] = (l) => te.value = l),
            "page-size": H.value,
            "onUpdate:page-size": t[2] || (t[2] = (l) => H.value = l),
            total: le.value,
            "page-sizes": [10],
            layout: "total, prev, pager, next",
            onCurrentChange: b
          }, null, 8, ["current-page", "page-size", "total"])) : x("", !0)
        ]),
        a(ie, {
          modelValue: B.value,
          "onUpdate:modelValue": t[6] || (t[6] = (l) => B.value = l),
          title: `新建${((Me = Y.value) == null ? void 0 : Me.label) ?? ""}版本`,
          width: "480px"
        }, {
          footer: n(() => [
            a(o, {
              onClick: t[5] || (t[5] = (l) => B.value = !1)
            }, {
              default: n(() => [
                u("取消")
              ]),
              _: 1
            }),
            a(o, {
              type: "primary",
              loading: E.value,
              onClick: Oe
            }, {
              default: n(() => [
                u("提交构建")
              ]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: n(() => [
            a(ot, {
              ref_key: "releaseFormRef",
              ref: be,
              model: k,
              rules: je,
              "label-position": "top"
            }, {
              default: n(() => [
                a(Se, {
                  label: "版本号",
                  prop: "version"
                }, {
                  default: n(() => [
                    a(Te, {
                      modelValue: k.version,
                      "onUpdate:modelValue": t[3] || (t[3] = (l) => k.version = l),
                      placeholder: "如 2026.09.16.171304",
                      maxlength: "64"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(Se, { label: "版本说明" }, {
                  default: n(() => [
                    a(Te, {
                      modelValue: k.remark,
                      "onUpdate:modelValue": t[4] || (t[4] = (l) => k.remark = l),
                      type: "textarea",
                      rows: 4,
                      maxlength: "200",
                      "show-word-limit": "",
                      placeholder: "本次版本的主要改动",
                      resize: "none"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(ie, {
          modelValue: R.value,
          "onUpdate:modelValue": t[9] || (t[9] = (l) => R.value = l),
          title: `云编译 - ${((Be = I.value) == null ? void 0 : Be.label) ?? ""}`,
          width: "520px"
        }, {
          footer: n(() => [
            a(o, {
              onClick: t[8] || (t[8] = (l) => R.value = !1)
            }, {
              default: n(() => [
                u("取消")
              ]),
              _: 1
            }),
            a(o, {
              type: "primary",
              loading: E.value,
              onClick: Ge
            }, {
              default: n(() => [
                u("开始编译")
              ]),
              _: 1
            }, 8, ["loading"])
          ]),
          default: n(() => [
            al,
            s("div", nl, [
              (r(!0), _($, null, L(y(Ke), (l) => (r(), _("div", {
                key: l.value,
                class: dt(["scope-item", { "is-active": g.scope === l.value }]),
                onClick: (f) => g.scope = l.value
              }, [
                s("div", il, [
                  s("div", cl, p(l.label), 1),
                  s("div", rl, p(l.desc), 1)
                ]),
                a(i, { class: "scope-check" }, {
                  default: n(() => [
                    g.scope === l.value ? (r(), h(y(kt), { key: 0 })) : (r(), _("span", dl))
                  ]),
                  _: 2
                }, 1024)
              ], 10, sl))), 128))
            ]),
            g.scope === "plugin" ? (r(), _($, { key: 0 }, [
              ul,
              a($e, {
                modelValue: g.addon,
                "onUpdate:modelValue": t[7] || (t[7] = (l) => g.addon = l),
                multiple: "",
                "collapse-tags": "",
                "collapse-tags-tooltip": "",
                placeholder: "请选择插件",
                class: "w-full mt-[8px]",
                loading: J.value
              }, {
                default: n(() => [
                  (r(!0), _($, null, L(A.value, (l) => (r(), h(ze, {
                    key: l.key,
                    label: l.label,
                    value: l.key
                  }, null, 8, ["label", "value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "loading"])
            ], 64)) : x("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        a(ie, {
          modelValue: M.value,
          "onUpdate:modelValue": t[11] || (t[11] = (l) => M.value = l),
          title: "编译环境校验",
          width: "65vw",
          "destroy-on-close": !0,
          "close-on-click-modal": !1,
          "append-to-body": ""
        }, {
          default: n(() => [
            a(Rt, {
              ref_key: "checkRef",
              ref: Ie,
              scene: "cloud_build",
              params: ye.value,
              "auto-next": !0,
              "prev-text": "取消",
              "next-text": "开始编译",
              onNext: Ae,
              onPrev: t[10] || (t[10] = (l) => M.value = !1)
            }, null, 8, ["params"])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        a(at, {
          modelValue: ae.value,
          "onUpdate:modelValue": t[12] || (t[12] = (l) => ae.value = l),
          title: O.value.title || "任务详情",
          size: "60%",
          "destroy-on-close": !0
        }, {
          default: n(() => [
            O.value.task_key ? (r(), _("div", pl, [
              a(xt, {
                "task-key": O.value.task_key,
                class: "h-full",
                onCompleted: et
              }, null, 8, ["task-key"])
            ])) : x("", !0)
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        (r(), h(ut, { to: "body" }, [
          a(pt, { name: "port-float" }, {
            default: n(() => [
              v.value ? (r(), _("div", {
                key: 0,
                class: "port-float",
                style: pe(me.value),
                onMouseenter: z,
                onMouseleave: fe
              }, [
                s("div", _l, [
                  s("span", {
                    class: "port-icon",
                    style: pe({ color: v.value.color || "var(--sys-color-primary)" })
                  }, [
                    a(i, { size: 18 }, {
                      default: n(() => [
                        (r(), h(Re(ve(v.value.icon))))
                      ]),
                      _: 1
                    })
                  ], 4),
                  s("div", vl, [
                    s("div", ml, p(v.value.label), 1),
                    s("div", fl, p(v.value.desc || "-"), 1),
                    v.value.last_version ? (r(), _("div", gl, " 最近版本 " + p(v.value.last_version.version) + " · " + p(ne(v.value.last_version.complete_time)), 1)) : x("", !0)
                  ]),
                  s("div", kl, [
                    s("div", yl, [
                      a(o, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: t[13] || (t[13] = (l) => ge((f) => we(f)))
                      }, {
                        default: n(() => [
                          u(" 发版 ")
                        ]),
                        _: 1
                      }),
                      a(o, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: t[14] || (t[14] = (l) => ge((f) => Ce(f)))
                      }, {
                        default: n(() => [
                          u(" 云编译 ")
                        ]),
                        _: 1
                      })
                    ]),
                    s("span", hl, [
                      u(" 编译命令 "),
                      a(i, { size: 12 }, {
                        default: n(() => [
                          a(y(De))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                s("div", xl, [
                  s("div", bl, [
                    wl,
                    (r(!0), _($, null, L(v.value.commands, (l) => (r(), _("div", {
                      key: l.scope,
                      class: "port-command-item"
                    }, [
                      s("div", Cl, [
                        s("span", Vl, p(l.scope_label), 1),
                        a(o, {
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: (f) => Fe(l.command)
                        }, {
                          default: n(() => [
                            u("复制")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      s("div", zl, p(l.command), 1)
                    ]))), 128)),
                    !v.value.commands || !v.value.commands.length ? (r(), _("div", $l, " 暂无编译命令 ")) : x("", !0)
                  ])
                ])
              ], 36)) : x("", !0)
            ]),
            _: 1
          })
        ]))
      ]);
    };
  }
});
const Ol = /* @__PURE__ */ Tt(Tl, [["__scopeId", "data-v-4fe7208c"]]);
export {
  Ol as default
};
