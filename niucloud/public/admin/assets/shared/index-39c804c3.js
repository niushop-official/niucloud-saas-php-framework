import { defineComponent as ue, ref as n, watch as ie, resolveComponent as A, openBlock as U, createElementBlock as G, Fragment as re, createVNode as d, withCtx as i, createElementVNode as c, createBlock as H, unref as _, createCommentVNode as D, createTextVNode as y, toDisplayString as r, pushScopeId as pe, popScopeId as de, nextTick as ce } from "vue";
import { ak as ve, n as fe, t as m, al as _e, am as me, an as ge, a as ke } from "./core-shared-c6ad4e77.js";
import { c as xe } from "./module-f32436cf.js";
import ye from "./index-2fe2c142.js";
import { ElMessage as B } from "element-plus";
import { useRouter as he } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const be = (h) => (pe("data-v-fcf7c9a3"), h = h(), de(), h), Ve = { class: "min-h-[150px]" }, we = {
  key: 0,
  class: "p-[16px] border-[1px] rounded-[8px] border border-solid border-[#ebeef5]"
}, Ce = { class: "flex justify-between items-center" }, Ne = { class: "text-[14px] text-[#374151] mt-[10px] mb-[10px]" }, Ae = { class: "text-[14px] text-[#9699B6]" }, Ue = { class: "dialog-footer" }, Be = /* @__PURE__ */ be(() => /* @__PURE__ */ c("div", { class: "flex items-center" }, [
  /* @__PURE__ */ c("span", null, "如需升级框架，请点击升级框架操作。")
], -1)), Te = { class: "dialog-footer" }, Ie = /* @__PURE__ */ ue({
  __name: "index",
  emits: ["complete"],
  setup(h, { expose: J, emit: Q }) {
    const X = he(), b = ve(), E = "880px", v = n(!1), x = n(!1), o = n(null);
    let T = null;
    const V = n(!0), I = n(""), u = n(!1), w = n({
      is_need_backup: !1,
      is_need_cloudbuild: !1
    }), g = n(!1), k = n(!1), F = n(""), j = n(""), R = n("app"), C = n("");
    fe().then((l) => {
      C.value = l.data.version.version;
    });
    const N = n("");
    xe().then(({ data: l }) => {
      N.value = l.last_version;
    });
    const Y = (l, e) => isNaN(parseInt(e.replaceAll(".", ""))) || isNaN(parseInt(l.replaceAll(".", ""))) ? !1 : parseInt(e.replaceAll(".", "")) > parseInt(l.replaceAll(".", "")), Z = (l) => (l || []).map((e) => {
      const a = (e == null ? void 0 : e.app) || {};
      return {
        ...e,
        icon: a.icon || a.app_icon || a.logo || "",
        type_label: a.app_type === "app" ? "应用" : "插件"
      };
    }), K = ["success", "failed", "canceled", "rolled_back", "rollback_failed"], $ = (l) => _e().then(({ data: e }) => (Array.isArray(e == null ? void 0 : e.list) && e.list.length ? e.list : e != null && e.task_key ? [e] : []).find((t) => (t == null ? void 0 : t.task_type) === l && !K.includes(String((t == null ? void 0 : t.status) ?? ""))) ?? null), z = (l = "", e = null, a = {}) => {
      $("upgrade").then((t) => {
        if (t) {
          P(t.task_key), e && e();
          return;
        }
        if (l && l.indexOf("niucloud-admin") == -1 && C.value != N.value && Y(C.value, N.value)) {
          F.value = a.install_info.version, j.value = a.version, R.value = a.type, k.value = !0, e && e();
          return;
        }
        u.value || (u.value = !0, I.value = l === "niucloud-admin" ? "" : l, ee(), T = me(l).then(({ data: p }) => {
          var W, q;
          u.value = !1, o.value = p, o.value.content = Z(o.value.content);
          const f = ((q = (W = o.value) == null ? void 0 : W.upgrade_apps) == null ? void 0 : q.join(",")) ?? "";
          I.value = f === "niucloud-admin" ? "" : f;
          let s = 0, O = 0;
          for (let S = 0; S < o.value.content.length; S++)
            o.value.content[S].version_list.length ? s++ : O++;
          o.value.content.length == s ? V.value = !0 : o.value.content.length == O && (V.value = !1), e && e();
        }).catch(() => {
          u.value = !1, e && e();
        }));
      });
    }, P = (l) => {
      l && b.openDetail(l, "upgrade");
    }, ee = () => {
      g.value = !1, x.value = !0;
    }, le = async () => {
      if (g.value = !0, ce(() => {
        x.value = !1;
      }), T && await T.catch(() => null), !o.value) {
        B({ message: "获取升级内容失败，请重新发起升级", type: "error" });
        return;
      }
      if (!V.value) {
        B({ message: "暂无可升级的内容", type: "warning" });
        return;
      }
      if (!o.value.last_backup) {
        L();
        return;
      }
      v.value = !0;
    }, L = () => {
      var e, a;
      if (!g.value || u.value)
        return;
      u.value = !0, v.value = !1;
      const l = ((e = o.value) == null ? void 0 : e.upgrade_apps.join(",")) != "niucloud-admin" ? (a = o.value) == null ? void 0 : a.upgrade_apps.join(",") : "";
      b.openPendingDetail("upgrade", "正在发起升级"), ge("upgrade", { addon: l, data: w.value }).then((t) => {
        var f;
        u.value = !1, Q("complete");
        const p = (f = t == null ? void 0 : t.data) == null ? void 0 : f.task_key;
        if (!p) {
          b.closePendingDetail(), B({ message: "升级任务创建失败", type: "error" });
          return;
        }
        P(p);
      }).catch((t) => {
        u.value = !1, b.closePendingDetail(), B({ message: (t == null ? void 0 : t.msg) || (t == null ? void 0 : t.message) || "升级发起失败", type: "error" });
      });
    };
    let M = null;
    const Pe = () => {
      $("upgrade").then((l) => {
        l && (M && M.close(), P(l.task_key));
      });
    }, te = () => {
      k.value = !1, z("niucloud-admin");
    }, ae = (l) => {
      l();
    }, oe = (l) => {
      k.value = !1, l();
    };
    ie(
      () => v.value,
      () => {
        v.value || ne();
      }
    );
    const ne = () => {
      u.value = !1, g.value = !1, w.value = {
        is_need_backup: !0,
        is_need_cloudbuild: !1
      };
    }, Se = n(0), se = () => {
      const l = X.resolve({
        path: "/tools/task_records"
      });
      window.open(l.href, "_blank");
    };
    return J({
      open: z,
      loading: u
    }), (l, e) => {
      const a = A("el-dialog"), t = A("el-checkbox"), p = A("el-button"), f = A("el-scrollbar");
      return U(), G(re, null, [
        d(a, {
          modelValue: x.value,
          "onUpdate:modelValue": e[2] || (e[2] = (s) => x.value = s),
          title: "升级前校验",
          width: E,
          "close-on-click-modal": !1,
          "close-on-press-escape": !1
        }, {
          default: i(() => [
            c("div", Ve, [
              x.value ? (U(), H(ye, {
                key: 0,
                scene: "upgrade",
                params: { addon: I.value },
                "auto-next": !0,
                "auto-next-delay": 500,
                "show-prev": !1,
                "next-text": _(m)("nextStep"),
                onNext: le,
                onPassed: e[0] || (e[0] = (s) => g.value = !0),
                onFailed: e[1] || (e[1] = (s) => g.value = !1)
              }, null, 8, ["params", "next-text"])) : D("", !0)
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        d(a, {
          modelValue: v.value,
          "onUpdate:modelValue": e[5] || (e[5] = (s) => v.value = s),
          title: "升级",
          width: E,
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "before-close": ae
        }, {
          footer: i(() => [
            c("div", Ue, [
              d(p, {
                onClick: e[4] || (e[4] = (s) => v.value = !1)
              }, {
                default: i(() => [
                  y(r(_(m)("cancel")), 1)
                ]),
                _: 1
              }),
              d(p, {
                type: "primary",
                loading: u.value,
                disabled: !V.value,
                onClick: L
              }, {
                default: i(() => [
                  y(r(_(m)("upgrade.upgradeButton")), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
            ])
          ]),
          default: i(() => [
            o.value ? (U(), H(f, {
              key: 0,
              "max-height": "50vh"
            }, {
              default: i(() => [
                o.value.last_backup ? (U(), G("div", we, [
                  c("div", Ce, [
                    d(t, {
                      modelValue: w.value.is_need_backup,
                      "onUpdate:modelValue": e[3] || (e[3] = (s) => w.value.is_need_backup = s),
                      label: _(m)("upgrade.isNeedBackup"),
                      "true-value": !0,
                      "false-value": !1,
                      size: "large"
                    }, null, 8, ["modelValue", "label"]),
                    d(p, {
                      link: "",
                      type: "primary",
                      class: "!text-[#9699B6]",
                      onClick: se
                    }, {
                      default: i(() => [
                        y(r(_(m)("upgrade.isNeedBackupBtn")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  c("div", Ne, r(_(m)("upgrade.isNeedBackupTips")), 1),
                  c("div", Ae, r(_(m)("上次备份时间：")) + r(o.value.last_backup.complete_time), 1)
                ])) : D("", !0)
              ]),
              _: 1
            })) : D("", !0)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        d(a, {
          modelValue: k.value,
          "onUpdate:modelValue": e[7] || (e[7] = (s) => k.value = s),
          title: "升级提示",
          width: "500",
          "before-close": oe
        }, {
          footer: i(() => [
            c("div", Te, [
              d(p, {
                type: "primary",
                onClick: te
              }, {
                default: i(() => [
                  y("升级框架")
                ]),
                _: 1
              }),
              d(p, {
                onClick: e[6] || (e[6] = (s) => k.value = !1)
              }, {
                default: i(() => [
                  y("取消")
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            c("p", null, "您当前使用的" + r(R.value == "app" ? "应用" : "插件") + "版本是 " + r(F.value) + "，若想升级到 " + r(j.value) + " 版本，需要先把框架从 v" + r(C.value) + " 升级到 v" + r(N.value) + " 。", 1),
            Be
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const We = /* @__PURE__ */ ke(Ie, [["__scopeId", "data-v-fcf7c9a3"]]);
export {
  We as default
};
