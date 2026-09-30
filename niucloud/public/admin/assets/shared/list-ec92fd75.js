import { defineComponent as he, ref as f, computed as U, reactive as F, onMounted as we, resolveComponent as p, resolveDirective as Ce, openBlock as b, createElementBlock as V, normalizeStyle as xe, unref as y, createElementVNode as v, createVNode as l, withCtx as o, Fragment as P, renderList as O, createBlock as A, createTextVNode as m, toDisplayString as w, withDirectives as Se, createCommentVNode as ke, nextTick as j } from "vue";
import { useRouter as Ve } from "vue-router";
import { u as Te } from "./useTablePageHeight-33d60cf6.js";
import { ElTable as Me, ElMessage as $, ElMessageBox as q } from "element-plus";
import { dD as Pe, dE as G, dF as Ne, dz as Be, dB as H, dC as J } from "./core-shared-c6ad4e77.js";
import Re from "./index-c14157f3.js";
import De from "./index-559a9b12.js";
import ze from "./index-997caa57.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ee = { class: "table-fill-page__card" }, Ue = { class: "table-search-wrap table-search-wrap--panel" }, Oe = { class: "table-panel table-fill-page__panel" }, Ae = { class: "mr-[10px] text-[13px] text-[#6b7280]" }, je = { class: "table-fill-page__table" }, $e = /* @__PURE__ */ v("span", null, "暂无消息", -1), ea = /* @__PURE__ */ he({
  __name: "list",
  setup(He) {
    const Q = Ve(), { pageRef: W, pageStyle: X } = Te(), Z = (e) => [
      { label: "详情", onClick: () => pe(e) },
      { label: "标记已读", disabled: !!e.is_read, onClick: () => me(e) },
      { label: "删除", type: "danger", onClick: () => fe(e) }
    ], K = { 0: "未读", 1: "已读" }, ee = { info: "普通", success: "成功", warning: "警告", error: "错误" }, C = f({}), N = f({}), B = f(!1), R = f(0), T = f(), u = f([]), x = f(!1), S = f(!1), D = U(() => u.value.length), n = F({
      category: "",
      sub_category: "",
      is_read: "",
      title: "",
      create_time: []
    }), c = F({
      page: 1,
      limit: 10,
      total: 0,
      data: []
    }), ae = U(() => Object.keys(C.value).map((e) => {
      var a;
      return {
        value: e,
        label: ((a = C.value[e]) == null ? void 0 : a.name) ?? e
      };
    })), te = U(() => {
      var r;
      const e = n.category;
      if (!e)
        return [];
      const a = ((r = C.value[e]) == null ? void 0 : r.sub) ?? {};
      return Object.keys(a).map((s) => {
        var i;
        return {
          value: s,
          label: ((i = a[s]) == null ? void 0 : i.name) ?? s
        };
      });
    }), le = (e) => ({ success: "success", warning: "warning", error: "danger" })[e] ?? "info", ne = (e) => ee[e] ?? "普通", oe = () => {
      n.sub_category = "";
    }, I = () => {
      const e = {
        page: c.page,
        limit: c.limit
      };
      return n.category !== "" && (e.category = n.category), n.sub_category !== "" && (e.sub_category = n.sub_category), n.is_read !== "" && n.is_read !== null && (e.is_read = n.is_read), n.title && (e.title = n.title), n.create_time && n.create_time.length === 2 && (e.create_time = n.create_time), e;
    }, se = (e) => e.map((a) => ({
      ...a,
      category_name: N.value[a.category] ?? a.category,
      sub_category_name: N.value[`${a.category}.${a.sub_category}`] ?? a.sub_category
    })), d = async () => {
      B.value = !0;
      try {
        const e = await G(I()), a = (e == null ? void 0 : e.data) ?? {};
        c.data = se(a.data ?? []), c.total = Number(a.total ?? 0), c.page = Number(a.current_page ?? c.page), c.limit = Number(a.per_page ?? c.limit), await z();
      } catch {
        c.data = [], c.total = 0;
      } finally {
        B.value = !1;
      }
    }, z = async () => {
      var a;
      await j(), S.value = !0, (a = T.value) == null || a.clearSelection();
      const e = new Set(u.value);
      c.data.forEach((r) => {
        var s;
        e.has(r.id) && ((s = T.value) == null || s.toggleRowSelection(r, !0));
      }), await j(), S.value = !1;
    }, h = async () => {
      try {
        const e = await Ne();
        R.value = Object.values((e == null ? void 0 : e.data) ?? {}).reduce(
          (a, r) => a + Number((r == null ? void 0 : r.count) ?? 0),
          0
        );
      } catch {
        R.value = 0;
      }
    }, ce = async () => {
      try {
        const e = await Be(), a = (e == null ? void 0 : e.data) ?? {};
        C.value = a;
        const r = {};
        Object.keys(a).forEach((s) => {
          var i, M;
          r[s] = ((i = a[s]) == null ? void 0 : i.name) ?? s, Object.keys(((M = a[s]) == null ? void 0 : M.sub) ?? {}).forEach((k) => {
            var g;
            r[`${s}.${k}`] = ((g = a[s].sub[k]) == null ? void 0 : g.name) ?? k;
          });
        }), N.value = r;
      } catch {
        C.value = {};
      }
    }, re = () => {
      n.category = "", n.sub_category = "", n.is_read = "", n.title = "", n.create_time = [], c.page = 1, d();
    }, ie = (e) => {
      if (S.value)
        return;
      const a = new Set(c.data.map((s) => s.id)), r = u.value.filter((s) => !a.has(s));
      u.value = Array.from(/* @__PURE__ */ new Set([
        ...r,
        ...e.map((s) => s.id)
      ]));
    }, ue = () => {
      u.value = c.data.map((e) => e.id), z();
    }, de = async () => {
      var e;
      x.value = !0;
      try {
        const a = I(), r = await G({
          ...a,
          page: 1,
          limit: Math.max(Number(c.total) || 0, Number(a.limit) || 0)
        }), s = ((e = r == null ? void 0 : r.data) == null ? void 0 : e.data) ?? [];
        u.value = s.map((i) => i.id), await z();
      } catch {
        u.value = [];
      } finally {
        x.value = !1;
      }
    }, E = () => {
      var e;
      u.value = [], S.value = !0, (e = T.value) == null || e.clearSelection(), j(() => {
        S.value = !1;
      });
    }, pe = (e) => {
      Q.push({ path: "/admin/message/detail", query: { id: e.id } });
    }, me = async (e) => {
      await H([e.id]), e.is_read = !0, await h(), $.success("操作成功");
    }, ge = async () => {
      await H([]), await Promise.all([d(), h()]), $.success("操作成功");
    }, _e = async () => {
      const e = [...u.value];
      e.length && (await H(e), E(), await Promise.all([d(), h()]), $.success("操作成功"));
    }, fe = async (e) => {
      try {
        await q.confirm("确定要删除这条消息吗？", "删除消息", {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        });
      } catch {
        return;
      }
      await J([e.id]), await Promise.all([d(), h()]);
    }, be = async () => {
      const e = [...u.value];
      if (e.length) {
        try {
          await q.confirm(`确定要删除选中的 ${e.length} 条消息吗？`, "批量删除", {
            type: "warning",
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          });
        } catch {
          return;
        }
        await J(e), E(), await Promise.all([d(), h()]);
      }
    };
    return we(async () => {
      await ce(), await d(), await h();
    }), (e, a) => {
      const r = p("el-option"), s = p("el-select"), i = p("el-form-item"), M = p("el-input"), k = p("el-date-picker"), g = p("el-button"), ye = p("el-form"), _ = p("el-table-column"), L = p("el-tag"), ve = Ce("loading");
      return b(), V("div", {
        ref_key: "pageRef",
        ref: W,
        class: "main-container table-fill-page w-full",
        style: xe(y(X))
      }, [
        v("div", Ee, [
          v("div", Ue, [
            l(ye, {
              model: n,
              inline: ""
            }, {
              default: o(() => [
                l(i, { label: "消息分类" }, {
                  default: o(() => [
                    l(s, {
                      modelValue: n.category,
                      "onUpdate:modelValue": a[0] || (a[0] = (t) => n.category = t),
                      placeholder: "全部",
                      clearable: "",
                      class: "!w-[150px]",
                      onChange: oe
                    }, {
                      default: o(() => [
                        (b(!0), V(P, null, O(y(ae), (t) => (b(), A(r, {
                          key: t.value,
                          label: t.label,
                          value: t.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(i, { label: "子分类" }, {
                  default: o(() => [
                    l(s, {
                      modelValue: n.sub_category,
                      "onUpdate:modelValue": a[1] || (a[1] = (t) => n.sub_category = t),
                      placeholder: "全部",
                      clearable: "",
                      class: "!w-[150px]"
                    }, {
                      default: o(() => [
                        (b(!0), V(P, null, O(y(te), (t) => (b(), A(r, {
                          key: t.value,
                          label: t.label,
                          value: t.value
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(i, { label: "阅读状态" }, {
                  default: o(() => [
                    l(s, {
                      modelValue: n.is_read,
                      "onUpdate:modelValue": a[2] || (a[2] = (t) => n.is_read = t),
                      placeholder: "全部",
                      clearable: "",
                      class: "!w-[150px]"
                    }, {
                      default: o(() => [
                        (b(), V(P, null, O(K, (t, Y) => l(r, {
                          key: Y,
                          label: t,
                          value: Y
                        }, null, 8, ["label", "value"])), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(i, { label: "标题" }, {
                  default: o(() => [
                    l(M, {
                      modelValue: n.title,
                      "onUpdate:modelValue": a[3] || (a[3] = (t) => n.title = t),
                      placeholder: "请输入消息标题",
                      clearable: "",
                      class: "!w-[180px]"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(i, { label: "创建时间" }, {
                  default: o(() => [
                    l(k, {
                      modelValue: n.create_time,
                      "onUpdate:modelValue": a[4] || (a[4] = (t) => n.create_time = t),
                      type: "daterange",
                      "value-format": "YYYY-MM-DD HH:mm:ss",
                      "start-placeholder": "开始时间",
                      "end-placeholder": "结束时间",
                      class: "!w-[260px]"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(i, null, {
                  default: o(() => [
                    l(g, {
                      type: "primary",
                      onClick: d
                    }, {
                      default: o(() => [
                        m("查询")
                      ]),
                      _: 1
                    }),
                    l(g, { onClick: re }, {
                      default: o(() => [
                        m("重置")
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
          v("div", Oe, [
            l(ze, {
              title: "消息中心",
              "selected-count": y(D),
              "current-page-count": c.data.length,
              "total-count": c.total,
              "selection-loading": x.value,
              onSelectPage: ue,
              onSelectAll: de,
              onClearSelection: E
            }, {
              "batch-actions": o(() => [
                l(g, {
                  type: "primary",
                  link: "",
                  disabled: !y(D) || x.value,
                  onClick: _e
                }, {
                  default: o(() => [
                    m(" 标记已读 ")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                l(g, {
                  class: "table-delete",
                  link: "",
                  disabled: !y(D) || x.value,
                  onClick: be
                }, {
                  default: o(() => [
                    m(" 批量删除 ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              actions: o(() => [
                v("span", Ae, "未读 " + w(R.value) + " 条", 1),
                l(g, {
                  plain: "",
                  onClick: ge
                }, {
                  default: o(() => [
                    m("全部已读")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["selected-count", "current-page-count", "total-count", "selection-loading"]),
            v("div", je, [
              Se((b(), A(y(Me), {
                height: "100%",
                ref_key: "tableRef",
                ref: T,
                data: c.data,
                "row-key": "id",
                onSelectionChange: ie
              }, {
                empty: o(() => [
                  $e
                ]),
                default: o(() => [
                  l(_, {
                    type: "selection",
                    width: "50",
                    "reserve-selection": ""
                  }),
                  l(_, {
                    prop: "title",
                    label: "标题",
                    "min-width": "180",
                    "show-overflow-tooltip": ""
                  }),
                  l(_, {
                    label: "分类",
                    width: "160"
                  }, {
                    default: o(({ row: t }) => [
                      v("span", null, [
                        m(w(t.category_name), 1),
                        t.sub_category_name ? (b(), V(P, { key: 0 }, [
                          m(" / " + w(t.sub_category_name), 1)
                        ], 64)) : ke("", !0)
                      ])
                    ]),
                    _: 1
                  }),
                  l(_, {
                    label: "等级",
                    width: "100"
                  }, {
                    default: o(({ row: t }) => [
                      l(L, {
                        type: le(t.level),
                        effect: "plain",
                        size: "small"
                      }, {
                        default: o(() => [
                          m(w(ne(t.level)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  l(_, {
                    label: "内容",
                    "min-width": "240",
                    "show-overflow-tooltip": ""
                  }, {
                    default: o(({ row: t }) => [
                      v("span", null, w(y(Pe)(t.content)), 1)
                    ]),
                    _: 1
                  }),
                  l(_, {
                    label: "状态",
                    width: "100"
                  }, {
                    default: o(({ row: t }) => [
                      l(L, {
                        type: t.is_read ? "info" : "danger",
                        effect: "plain",
                        size: "small"
                      }, {
                        default: o(() => [
                          m(w(t.is_read ? "已读" : "未读"), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  l(_, {
                    prop: "create_time",
                    label: "创建时间",
                    width: "180"
                  }),
                  l(_, {
                    label: "操作",
                    width: "200",
                    fixed: "right"
                  }, {
                    default: o(({ row: t }) => [
                      l(Re, {
                        actions: Z(t)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [ve, B.value]
              ])
            ]),
            l(De, {
              "current-page": c.page,
              "onUpdate:current-page": a[5] || (a[5] = (t) => c.page = t),
              "page-size": c.limit,
              "onUpdate:page-size": a[6] || (a[6] = (t) => c.limit = t),
              total: c.total,
              "page-sizes": [10, 20, 50, 100],
              onSizeChange: d,
              onCurrentChange: d
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ])
      ], 4);
    };
  }
});
export {
  ea as default
};
