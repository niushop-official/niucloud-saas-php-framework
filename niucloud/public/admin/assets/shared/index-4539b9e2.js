import { defineComponent as ne, ref as c, computed as ue, onUnmounted as ce, resolveComponent as U, resolveDirective as ie, openBlock as C, createBlock as V, withCtx as v, withDirectives as D, createElementBlock as J, createElementVNode as p, createVNode as E, unref as Q, vShow as T, createTextVNode as L, toDisplayString as R, createCommentVNode as I, nextTick as _ } from "vue";
import { _ as ve, C as pe, f as fe, g as j } from "./core-shared-c6ad4e77.js";
import { ElMessage as P, ElMessageBox as de } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const me = { class: "h-[50vh]" }, _e = { class: "h-[45vh]" }, he = { class: "flex justify-end mt-[20px]" }, xe = { class: "h-[50vh] flex flex-col" }, ge = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, Se = /* @__PURE__ */ p("p", { class: "text-[16px]" }, "小程序上传成功", -1), Ee = { class: "h-[50vh] flex flex-col" }, ye = { class: "flex-1 h-0 flex justify-center items-center flex-col" }, ke = {
  key: 0,
  class: "text-[14px] text-red-500 mb-[10px]"
}, We = /* @__PURE__ */ ne({
  __name: "index",
  props: {
    onSuccess: null,
    onError: null
  },
  setup(q, { expose: F }) {
    const s = q, n = c(!1), O = c(Date.now()), m = c(null), r = c("upload"), i = c(!1), o = c(null), f = c(""), h = c(!1), G = c({});
    let M = [], u = null;
    const N = c(null), y = c(0);
    let x = null, k = [], g = null;
    const H = 300, K = () => {
      if (!(!o.value || k.length === 0))
        for (; k.length > 0; ) {
          const l = k.shift();
          l && o.value.pushMessage(l);
        }
    }, W = (l, a) => {
      k.push({ content: l, class: a }), g === null && (g = window.setTimeout(() => {
        K(), g = null;
      }, H));
    }, b = () => {
      k = [], g !== null && (clearTimeout(g), g = null);
    }, z = ue(() => {
      const l = y.value, a = Math.floor(l / 60), e = l % 60;
      return a > 0 ? `${a}分${e}秒` : `${e}秒`;
    }), X = (l) => {
    }, Y = (l) => `${pe}/cloud/weapp_sse?task_id=${l}`, A = (l) => {
      u && u.close();
      const a = Y(l);
      u = new EventSource(a), u.onopen = () => {
        console.log("Weapp SSE connected");
      }, u.onmessage = (e) => {
        try {
          const t = JSON.parse(e.data);
          $(t);
        } catch (t) {
          console.error("Weapp SSE parse error:", t);
        }
      }, u.addEventListener("progress", (e) => {
        try {
          const t = JSON.parse(e.data);
          $(t);
        } catch (t) {
          console.error("Weapp SSE progress parse error:", t);
        }
      }), u.addEventListener("complete", (e) => {
        try {
          const t = JSON.parse(e.data);
          $(t);
        } catch (t) {
          console.error("Weapp SSE complete parse error:", t);
        }
      }), u.addEventListener("failed", (e) => {
        try {
          const t = JSON.parse(e.data);
          $(t);
        } catch (t) {
          console.error("Weapp SSE failed parse error:", t);
        }
      }), u.onerror = (e) => {
        console.error("Weapp SSE error:", e), d();
      };
    }, d = () => {
      u && (u.close(), u = null), b();
    }, Z = (l) => new Promise((a) => {
      fe(l).then((e) => {
        const t = e.data && e.data.data ? e.data.data : [];
        if (t[0] && t[0].length) {
          const w = t[0][t[0].length - 1];
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
    }), $ = (l) => {
      if (n.value)
        if (l.type === "progress" && l.action) {
          if (!M.includes(l.action)) {
            if (M.length === 0) {
              const a = Date.now();
              N.value = a, y.value = 0, x && clearInterval(x), x = setInterval(() => {
                N.value && (y.value = Math.floor((Date.now() - N.value) / 1e3));
              }, 1e3), _(() => {
                o.value && (o.value.execute("clear"), o.value.execute("开始上传"));
              });
            }
            if (W(`${l.action}`), M.push(l.action), l.code === "0") {
              f.value = l.msg || "上传失败", h.value = !1, r.value = "error", _(() => {
                o.value && o.value.execute("clear");
              }), d(), S(), s.onError && s.onError();
              return;
            }
            if (l.code === "1" && l.percent === 100) {
              _(() => {
                o.value && o.value.execute("clear");
              }), W("上传完成"), h.value = !1, r.value = "complete", d(), S(), P.success("上传成功"), s.onSuccess && s.onSuccess();
              return;
            }
          }
        } else
          l.type === "complete" ? (j(l.task_id), W("上传完成"), h.value = !1, r.value = "complete", d(), S(), P.success("上传成功"), s.onSuccess && s.onSuccess()) : l.type === "failed" && (f.value = l.msg || "上传失败", h.value = !1, r.value = "error", _(() => {
            o.value && o.value.execute("clear");
          }), d(), S(), s.onError && s.onError());
    }, S = () => {
      x && (clearInterval(x), x = null), N.value = null;
    }, ee = (l) => {
      d(), S(), r.value == "upload" && m.value ? de.confirm(
        "确定要关闭上传窗口吗？关闭后将停止当前上传任务",
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        l();
      }).catch(() => {
      }) : l();
    }, le = () => {
      n.value = !1;
    }, te = () => {
      n.value = !1, s.onSuccess && s.onSuccess();
    }, ae = () => {
      n.value = !1, s.onError && s.onError();
    }, oe = async (l, a) => {
      i.value = !0, r.value = "upload", M = [], b(), f.value = "", G.value = {}, h.value = !0, O.value = Date.now();
      const e = a || m.value;
      if (e)
        if (m.value = e, e.status == 0) {
          if (i.value = !1, await Z(e.task_key)) {
            d(), j(e.task_key), n.value = !0, r.value = "complete", i.value = !1, y.value = e.update_time - e.create_time, _(() => {
              o.value && (o.value.execute("clear"), o.value.execute("上传完成"));
            });
            return;
          }
          n.value = !0, A(e.task_key);
        } else
          e.status == 1 ? (r.value = "complete", i.value = !1, y.value = e.update_time - e.create_time, n.value = !0, _(() => {
            o.value && (o.value.execute("clear"), o.value.execute("上传完成"));
          }), s.onSuccess && s.onSuccess()) : e.status == -1 || e.status == -2 ? (r.value = "error", i.value = !1, f.value = e.fail_reason || "上传失败", n.value = !0, _(() => {
            o.value && (o.value.execute("clear"), o.value.execute("上传失败"));
          }), s.onError && s.onError()) : (i.value = !1, n.value = !0, A(e.task_key));
      else
        i.value = !1;
    }, se = (l) => {
      m.value = l;
    };
    return ce(() => {
      d(), S();
    }), F({
      open: oe,
      setTask: se,
      cloudBuildTask: m,
      loading: i,
      showDialog: n
    }), (l, a) => {
      const e = U("el-button"), t = U("el-result"), w = U("el-dialog"), re = ie("loading");
      return C(), V(w, {
        modelValue: n.value,
        "onUpdate:modelValue": a[2] || (a[2] = (B) => n.value = B),
        title: "小程序上传",
        width: "850px",
        "close-on-click-modal": !1,
        "close-on-press-escape": !1,
        "before-close": ee
      }, {
        default: v(() => [
          D((C(), J("div", me, [
            D(p("div", _e, [
              E(Q(ve), {
                ref_key: "terminalRef",
                ref: o,
                name: `weappupload-${O.value}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: X
              }, null, 8, ["name"])
            ], 512), [
              [T, m.value]
            ]),
            D(p("div", he, [
              E(e, {
                onClick: a[0] || (a[0] = (B) => le())
              }, {
                default: v(() => [
                  L("取消")
                ]),
                _: 1
              }),
              f.value ? I("", !0) : (C(), V(e, {
                key: 0,
                type: "primary",
                loading: h.value,
                class: "!w-[140px]"
              }, {
                default: v(() => [
                  L("已用时 " + R(Q(z)), 1)
                ]),
                _: 1
              }, 8, ["loading"])),
              f.value ? (C(), V(e, {
                key: 1,
                type: "primary",
                onClick: a[1] || (a[1] = (B) => r.value = "error")
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
            [T, r.value == "upload"],
            [re, i.value]
          ]),
          D(p("div", null, [
            p("div", xe, [
              p("div", ge, [
                E(t, {
                  icon: "success",
                  title: "上传成功"
                }, {
                  "sub-title": v(() => [
                    Se
                  ]),
                  extra: v(() => [
                    E(e, {
                      type: "primary",
                      onClick: te
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
            [T, r.value == "complete"]
          ]),
          D(p("div", null, [
            p("div", Ee, [
              p("div", ye, [
                E(t, {
                  icon: "error",
                  title: "上传失败"
                }, {
                  extra: v(() => [
                    f.value ? (C(), J("p", ke, "错误信息: " + R(f.value), 1)) : I("", !0),
                    E(e, {
                      type: "primary",
                      onClick: ae
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
            [T, r.value == "error"]
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  We as default
};
