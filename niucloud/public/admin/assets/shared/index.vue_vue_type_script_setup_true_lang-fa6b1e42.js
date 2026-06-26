import { defineComponent as se, ref as c, computed as ne, onUnmounted as re, resolveComponent as U, resolveDirective as ue, openBlock as C, createBlock as V, withCtx as v, withDirectives as D, createElementBlock as J, createElementVNode as f, createVNode as y, unref as ce, vShow as T, createTextVNode as L, toDisplayString as Q, createCommentVNode as I, nextTick as _ } from "vue";
import { ae as R, af as ie, ag as ve } from "./core-shared-ca1fcae5.js";
import { _ as fe } from "./dark-eb307d84.js";
import { ElMessageBox as pe, ElMessage as j } from "element-plus";
const de = { class: "h-[50vh]" }, me = { class: "h-[45vh]" }, _e = { class: "flex justify-end mt-[20px]" }, he = { class: "h-[50vh] flex flex-col" }, xe = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, ge = /* @__PURE__ */ f("p", { class: "text-[16px]" }, "小程序上传成功", -1), Se = { class: "h-[50vh] flex flex-col" }, ye = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, Ee = {
  key: 0,
  class: "text-[14px] text-red-500 mb-[10px]"
}, ke = 300, Le = /* @__PURE__ */ se({
  __name: "index",
  props: {
    onSuccess: { type: Function },
    onError: { type: Function }
  },
  setup(F, { expose: P }) {
    const r = c(!1), O = c(Date.now()), m = c(null), n = c("upload"), i = c(!1), o = c(null), p = c(""), h = c(!1), q = c({});
    let M = [], u = null;
    const N = c(null), E = c(0);
    let x = null, k = [], g = null;
    const G = () => {
      if (!(!o.value || k.length === 0))
        for (; k.length > 0; ) {
          const t = k.shift();
          t && o.value.pushMessage(t);
        }
    }, W = (t, a) => {
      k.push({ content: t, class: a }), g === null && (g = window.setTimeout(() => {
        G(), g = null;
      }, ke));
    }, b = () => {
      k = [], g !== null && (clearTimeout(g), g = null);
    }, H = ne(() => {
      const t = E.value, a = Math.floor(t / 60), e = t % 60;
      return a > 0 ? `${a}分${e}秒` : `${e}秒`;
    }), K = (t) => {
    }, z = (t) => `${ve}/cloud/weapp_sse?task_id=${t}`, A = (t) => {
      u && u.close();
      const a = z(t);
      u = new EventSource(a), u.onopen = () => {
        console.log("Weapp SSE connected");
      }, u.onmessage = (e) => {
        try {
          const l = JSON.parse(e.data);
          $(l);
        } catch (l) {
          console.error("Weapp SSE parse error:", l);
        }
      }, u.addEventListener("progress", (e) => {
        try {
          const l = JSON.parse(e.data);
          $(l);
        } catch (l) {
          console.error("Weapp SSE progress parse error:", l);
        }
      }), u.addEventListener("complete", (e) => {
        try {
          const l = JSON.parse(e.data);
          $(l);
        } catch (l) {
          console.error("Weapp SSE complete parse error:", l);
        }
      }), u.addEventListener("failed", (e) => {
        try {
          const l = JSON.parse(e.data);
          $(l);
        } catch (l) {
          console.error("Weapp SSE failed parse error:", l);
        }
      }), u.onerror = (e) => {
        console.error("Weapp SSE error:", e), d();
      };
    }, d = () => {
      u && (u.close(), u = null), b();
    }, X = (t) => new Promise((a) => {
      ie(t).then((e) => {
        const l = e.data && e.data.data ? e.data.data : [];
        if (l[0] && l[0].length) {
          const w = l[0][l[0].length - 1];
          if (w.code == 1 && w.percent == 100) {
            a(!0);
            return;
          }
          if (w.code == 0) {
            a(!0);
            return;
          }
        }
        a(!1);
      }).catch(() => {
        a(!1);
      });
    }), $ = (t) => {
      if (r.value)
        if (t.type === "progress" && t.action) {
          if (!M.includes(t.action)) {
            if (M.length === 0) {
              const a = Date.now();
              N.value = a, E.value = 0, x && clearInterval(x), x = setInterval(() => {
                N.value && (E.value = Math.floor((Date.now() - N.value) / 1e3));
              }, 1e3), _(() => {
                o.value && (o.value.execute("clear"), o.value.execute("开始上传"));
              });
            }
            if (W(`${t.action}`), M.push(t.action), t.code === "0") {
              p.value = t.msg || "上传失败", h.value = !1, n.value = "error", _(() => {
                o.value && o.value.execute("clear");
              }), d(), S(), s.onError && s.onError();
              return;
            }
            if (t.code === "1" && t.percent === 100) {
              _(() => {
                o.value && o.value.execute("clear");
              }), W("上传完成"), h.value = !1, n.value = "complete", d(), S(), j.success("上传成功"), s.onSuccess && s.onSuccess();
              return;
            }
          }
        } else
          t.type === "complete" ? (R(t.task_id), W("上传完成"), h.value = !1, n.value = "complete", d(), S(), j.success("上传成功"), s.onSuccess && s.onSuccess()) : t.type === "failed" && (p.value = t.msg || "上传失败", h.value = !1, n.value = "error", _(() => {
            o.value && o.value.execute("clear");
          }), d(), S(), s.onError && s.onError());
    }, S = () => {
      x && (clearInterval(x), x = null), N.value = null;
    }, Y = (t) => {
      d(), S(), n.value == "upload" && m.value ? pe.confirm(
        "确定要关闭上传窗口吗？关闭后将停止当前上传任务",
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        t();
      }).catch(() => {
      }) : t();
    }, Z = () => {
      r.value = !1;
    }, ee = () => {
      r.value = !1, s.onSuccess && s.onSuccess();
    }, te = () => {
      r.value = !1, s.onError && s.onError();
    }, s = F, le = async (t, a) => {
      i.value = !0, n.value = "upload", M = [], b(), p.value = "", q.value = {}, h.value = !0, O.value = Date.now();
      const e = a || m.value;
      if (e)
        if (m.value = e, e.status == 0) {
          if (i.value = !1, await X(e.task_key)) {
            d(), R(e.task_key), r.value = !0, n.value = "complete", i.value = !1, E.value = e.update_time - e.create_time, _(() => {
              o.value && (o.value.execute("clear"), o.value.execute("上传完成"));
            });
            return;
          }
          r.value = !0, A(e.task_key);
        } else
          e.status == 1 ? (n.value = "complete", i.value = !1, E.value = e.update_time - e.create_time, r.value = !0, _(() => {
            o.value && (o.value.execute("clear"), o.value.execute("上传完成"));
          }), s.onSuccess && s.onSuccess()) : e.status == -1 || e.status == -2 ? (n.value = "error", i.value = !1, p.value = e.fail_reason || "上传失败", r.value = !0, _(() => {
            o.value && (o.value.execute("clear"), o.value.execute("上传失败"));
          }), s.onError && s.onError()) : (i.value = !1, r.value = !0, A(e.task_key));
      else
        i.value = !1;
    }, ae = (t) => {
      m.value = t;
    };
    return re(() => {
      d(), S();
    }), P({
      open: le,
      setTask: ae,
      cloudBuildTask: m,
      loading: i,
      showDialog: r
    }), (t, a) => {
      const e = U("el-button"), l = U("el-result"), w = U("el-dialog"), oe = ue("loading");
      return C(), V(w, {
        modelValue: r.value,
        "onUpdate:modelValue": a[2] || (a[2] = (B) => r.value = B),
        title: "小程序上传",
        width: "850px",
        "close-on-click-modal": !1,
        "close-on-press-escape": !1,
        "before-close": Y
      }, {
        default: v(() => [
          D((C(), J("div", de, [
            D(f("div", me, [
              y(ce(fe), {
                ref_key: "terminalRef",
                ref: o,
                name: `weappupload-${O.value}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: K
              }, null, 8, ["name"])
            ], 512), [
              [T, m.value]
            ]),
            D(f("div", _e, [
              y(e, {
                onClick: a[0] || (a[0] = (B) => Z())
              }, {
                default: v(() => [
                  L("取消")
                ]),
                _: 1
              }),
              p.value ? I("", !0) : (C(), V(e, {
                key: 0,
                type: "primary",
                loading: h.value,
                class: "!w-[140px]"
              }, {
                default: v(() => [
                  L("已用时 " + Q(H.value), 1)
                ]),
                _: 1
              }, 8, ["loading"])),
              p.value ? (C(), V(e, {
                key: 1,
                type: "primary",
                onClick: a[1] || (a[1] = (B) => n.value = "error")
              }, {
                default: v(() => [
                  L("下一步")
                ]),
                _: 1
              })) : I("", !0)
            ], 512), [
              [T, m.value]
            ])
          ])), [
            [T, n.value == "upload"],
            [oe, i.value]
          ]),
          D(f("div", null, [
            f("div", he, [
              f("div", xe, [
                y(l, {
                  icon: "success",
                  title: "上传成功"
                }, {
                  "sub-title": v(() => [
                    ge
                  ]),
                  extra: v(() => [
                    y(e, {
                      type: "primary",
                      onClick: ee
                    }, {
                      default: v(() => [
                        L("完成")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ])
          ], 512), [
            [T, n.value == "complete"]
          ]),
          D(f("div", null, [
            f("div", Se, [
              f("div", ye, [
                y(l, {
                  icon: "error",
                  title: "上传失败"
                }, {
                  extra: v(() => [
                    p.value ? (C(), J("p", Ee, "错误信息: " + Q(p.value), 1)) : I("", !0),
                    y(e, {
                      type: "primary",
                      onClick: te
                    }, {
                      default: v(() => [
                        L("下一步")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ])
          ], 512), [
            [T, n.value == "error"]
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  Le as _
};
