import { defineComponent as P, ref as M, computed as k, onMounted as U, resolveComponent as _, resolveDirective as G, withDirectives as Q, openBlock as d, createElementBlock as v, createVNode as l, withCtx as n, createElementVNode as c, createTextVNode as i, Fragment as W, toDisplayString as p, unref as f, createBlock as N, createCommentVNode as B, pushScopeId as X, popScopeId as Y } from "vue";
import { useRoute as Z, useRouter as K } from "vue-router";
import { ElMessage as I, ElMessageBox as ee } from "element-plus";
import { dz as te, dA as ae, dB as D, dC as se, a as oe } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const S = (g) => (X("data-v-0a661920"), g = g(), Y(), g), ne = { class: "main-container w-full" }, ce = { class: "flex items-center justify-between" }, le = /* @__PURE__ */ S(() => /* @__PURE__ */ c("span", { class: "text-[15px] font-bold text-[#1D1F3A]" }, "消息详情", -1)), ie = { class: "mb-[12px]" }, re = { class: "text-[16px] font-bold text-[#1D1F3A] mb-[8px]" }, de = { class: "flex items-center flex-wrap gap-[8px]" }, ue = { class: "mb-[12px]" }, _e = /* @__PURE__ */ S(() => /* @__PURE__ */ c("div", { class: "text-[13px] text-[#6b7280] mb-[6px]" }, "消息内容", -1)), pe = {
  key: 0,
  class: "message-content-box"
}, me = ["innerHTML"], ve = {
  key: 1,
  class: "message-content-box"
}, fe = {
  key: 0,
  class: "mb-[12px]"
}, ge = /* @__PURE__ */ S(() => /* @__PURE__ */ c("div", { class: "text-[13px] text-[#6b7280] mb-[6px]" }, "附加信息", -1)), xe = { class: "flex items-center flex-wrap gap-[10px]" }, ye = { class: "flex items-center justify-end gap-[8px]" }, he = /* @__PURE__ */ P({
  __name: "detail",
  setup(g) {
    const E = Z(), T = K(), C = M(!1), t = M({}), x = k(() => Number(E.query.id ?? 0)), y = k(() => {
      var e, s;
      return String(((s = (e = t.value) == null ? void 0 : e.params) == null ? void 0 : s.attach_url) ?? "");
    }), h = k(() => {
      var e, s, o, a;
      return String(((s = (e = t.value) == null ? void 0 : e.params) == null ? void 0 : s.router_path) ?? ((a = (o = t.value) == null ? void 0 : o.params) == null ? void 0 : a.url) ?? "");
    }), b = M({}), $ = k(() => {
      var r, u;
      const e = String(((r = t.value) == null ? void 0 : r.category) ?? ""), s = String(((u = t.value) == null ? void 0 : u.sub_category) ?? ""), o = b.value[e] || e, a = b.value[`${e}.${s}`] || s;
      return a ? `${o} / ${a}` : o;
    }), j = { info: "普通", success: "成功", warning: "警告", error: "错误" }, A = (e) => j[e] ?? "普通", R = (e) => ({ success: "success", warning: "warning", error: "danger" })[e] ?? "info", V = async () => {
      try {
        const e = await te(), s = (e == null ? void 0 : e.data) ?? {}, o = {};
        Object.keys(s).forEach((a) => {
          var r, u;
          o[a] = ((r = s[a]) == null ? void 0 : r.name) ?? a, Object.keys(((u = s[a]) == null ? void 0 : u.sub) ?? {}).forEach((m) => {
            var w;
            o[`${a}.${m}`] = ((w = s[a].sub[m]) == null ? void 0 : w.name) ?? m;
          });
        }), b.value = o;
      } catch {
        b.value = {};
      }
    }, F = async () => {
      if (x.value) {
        C.value = !0;
        try {
          const e = await ae(x.value);
          t.value = (e == null ? void 0 : e.data) ?? {}, t.value.id && !t.value.is_read && (await D([t.value.id]).catch(() => {
          }), t.value.is_read = !0);
        } catch {
          t.value = {};
        } finally {
          C.value = !1;
        }
      }
    }, H = async () => {
      await D([x.value]), t.value.is_read = !0, I.success("操作成功");
    }, L = async () => {
      try {
        await ee.confirm("确定要删除这条消息吗？", "删除消息", {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        });
      } catch {
        return;
      }
      await se([x.value]), I.success("删除成功"), z();
    }, O = () => {
      y.value && window.open(y.value, "_blank");
    }, q = () => {
      h.value && T.push(h.value);
    }, z = () => {
      T.push("/admin/message/list");
    };
    return U(async () => {
      await V(), await F();
    }), (e, s) => {
      const o = _("el-button"), a = _("el-tag"), r = _("el-descriptions-item"), u = _("el-descriptions"), m = _("el-empty"), w = _("el-card"), J = G("loading");
      return Q((d(), v("div", ne, [
        l(w, {
          shadow: "never",
          class: "!border-none"
        }, {
          header: n(() => [
            c("div", ce, [
              le,
              l(o, {
                size: "small",
                onClick: z
              }, {
                default: n(() => [
                  i("返回")
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            t.value.id ? (d(), v(W, { key: 0 }, [
              c("div", ie, [
                c("div", re, p(t.value.title), 1),
                c("div", de, [
                  l(a, {
                    size: "small",
                    effect: "plain"
                  }, {
                    default: n(() => [
                      i(p(f($)), 1)
                    ]),
                    _: 1
                  }),
                  l(a, {
                    size: "small",
                    effect: "plain",
                    type: R(t.value.level)
                  }, {
                    default: n(() => [
                      i(p(A(t.value.level)), 1)
                    ]),
                    _: 1
                  }, 8, ["type"]),
                  l(a, {
                    size: "small",
                    effect: "plain",
                    type: t.value.is_read ? "info" : "danger"
                  }, {
                    default: n(() => [
                      i(p(t.value.is_read ? "已读" : "未读"), 1)
                    ]),
                    _: 1
                  }, 8, ["type"])
                ])
              ]),
              l(u, {
                column: 2,
                border: "",
                class: "mb-[12px]"
              }, {
                default: n(() => [
                  l(r, { label: "创建时间" }, {
                    default: n(() => [
                      i(p(t.value.create_time || "-"), 1)
                    ]),
                    _: 1
                  }),
                  l(r, { label: "阅读时间" }, {
                    default: n(() => [
                      i(p(t.value.read_time ? t.value.read_time : "-"), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              c("div", ue, [
                _e,
                t.value.content ? (d(), v("div", pe, [
                  c("div", {
                    innerHTML: t.value.content
                  }, null, 8, me)
                ])) : (d(), v("div", ve, "暂无内容"))
              ]),
              f(y) || f(h) ? (d(), v("div", fe, [
                ge,
                c("div", xe, [
                  f(y) ? (d(), N(o, {
                    key: 0,
                    type: "primary",
                    size: "small",
                    onClick: O
                  }, {
                    default: n(() => [
                      i("下载附件")
                    ]),
                    _: 1
                  })) : B("", !0),
                  f(h) ? (d(), N(o, {
                    key: 1,
                    size: "small",
                    onClick: q
                  }, {
                    default: n(() => [
                      i("前往处理")
                    ]),
                    _: 1
                  })) : B("", !0)
                ])
              ])) : B("", !0),
              c("div", ye, [
                l(o, {
                  type: "primary",
                  plain: "",
                  disabled: t.value.is_read,
                  onClick: H
                }, {
                  default: n(() => [
                    i("标记已读")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                l(o, {
                  type: "danger",
                  plain: "",
                  onClick: L
                }, {
                  default: n(() => [
                    i("删除")
                  ]),
                  _: 1
                })
              ])
            ], 64)) : (d(), N(m, {
              key: 1,
              description: "消息不存在或已被删除"
            }))
          ]),
          _: 1
        })
      ])), [
        [J, C.value]
      ]);
    };
  }
});
const Te = /* @__PURE__ */ oe(he, [["__scopeId", "data-v-0a661920"]]);
export {
  Te as default
};
