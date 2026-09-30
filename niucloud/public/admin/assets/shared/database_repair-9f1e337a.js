import { defineComponent as U, ref as m, computed as q, resolveComponent as p, resolveDirective as X, withDirectives as Y, openBlock as n, createElementBlock as i, createElementVNode as e, createBlock as w, withCtx as a, createTextVNode as d, createVNode as s, toDisplayString as o, normalizeClass as C, Fragment as V, renderList as T, unref as k, createCommentVNode as G } from "vue";
import { ElMessageBox as H, ElMessage as I } from "element-plus";
import { CircleCheckFilled as A } from "@element-plus/icons-vue";
import { gX as J, gY as K } from "./core-shared-c6ad4e77.js";
import P from "./index-e3370990.js";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const Q = { class: "main-container page-sections min-h-[70vh]" }, W = { class: "flex justify-between items-start flex-wrap" }, Z = { class: "flex items-start" }, ee = { class: "flex items-center flex-wrap" }, te = /* @__PURE__ */ e("span", { class: "text-[20px] font-bold mr-2" }, "数据库修复", -1), se = /* @__PURE__ */ e("div", { class: "text-[14px] text-[#909399] mt-1" }, [
  /* @__PURE__ */ e("span", { class: "mx-1" }, "仅补齐缺失结构，不删除现有数据")
], -1), le = { class: "flex items-center" }, ae = { class: "flex flex-wrap grid-cols-5 gap-[16px] mt-6" }, oe = { class: "form-section !border-[var(--sys-color-border-default)] flex-1" }, ne = /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mb-2" }, "定义来源", -1), ce = { class: "text-[22px] font-bold" }, ie = { class: "form-section !border-[var(--sys-color-border-default)] flex-1" }, de = /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mb-2" }, "定义数据表", -1), re = { class: "text-[22px] font-bold" }, ue = { class: "form-section !border-[var(--sys-color-border-default)] flex-1" }, _e = /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mb-2" }, "缺失结构", -1), fe = { class: "form-section !border-[var(--sys-color-border-default)] flex-1" }, pe = /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mb-2" }, "检测状态", -1), xe = { class: "form-section !border-[var(--sys-color-border-default)] flex-1" }, ve = /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mb-2" }, "字符编码异常", -1), me = { class: "flex justify-between items-center flex-wrap mb-4" }, he = /* @__PURE__ */ e("span", { class: "text-[16px] font-bold mr-2" }, "结构差异", -1), be = { class: "text-[13px] text-[#909399] mt-2" }, ge = { class: "flex items-center" }, ye = {
  key: 0,
  class: "table-panel"
}, we = { class: "px-6" }, ke = /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mb-2" }, "修复语句", -1), Ce = { class: "bg-[#f7f8fa] rounded p-3 text-[12px] whitespace-pre-wrap break-all m-0" }, Ve = {
  key: 0,
  class: "text-[#f56c6c]"
}, Te = {
  key: 1,
  class: "bg-[#f0f9eb] rounded-md px-6 py-5 flex justify-between items-center flex-wrap"
}, ze = { class: "flex items-center" }, Be = /* @__PURE__ */ e("div", { class: "text-[15px] font-bold text-[#333]" }, "数据库结构完整", -1), Ee = { class: "text-[13px] text-[#909399] mt-1" }, De = { class: "text-[13px] text-[#909399]" }, Ne = { class: "flex justify-between items-center flex-wrap mb-4" }, $e = /* @__PURE__ */ e("span", { class: "text-[16px] font-bold mr-2" }, "字符编码与排序规则检测", -1), je = { class: "text-[13px] text-[#909399] mt-2" }, Fe = {
  key: 0,
  class: "table-panel"
}, Le = { class: "px-6" }, Re = { class: "text-[13px] text-[#909399] mb-2" }, Ae = {
  key: 0,
  class: "text-[12px] text-[#909399] mr-2 shrink-0"
}, Me = { class: "text-[13px]" }, Oe = {
  key: 1,
  class: "bg-[#f0f9eb] rounded-md px-6 py-5 flex items-center"
}, Se = /* @__PURE__ */ e("div", null, [
  /* @__PURE__ */ e("div", { class: "text-[15px] font-bold text-[#333]" }, "字符编码与排序规则正常"),
  /* @__PURE__ */ e("div", { class: "text-[13px] text-[#909399] mt-1" }, "所有数据表与字段字符编码一致，排序规则正确且均受服务器支持")
], -1), Qe = /* @__PURE__ */ U({
  __name: "database_repair",
  setup(Ue) {
    const x = m(!0), h = m(!1), t = m({}), b = m(""), g = m(""), z = () => {
      x.value = !0, J().then((v) => {
        t.value = v.data, x.value = !1;
      }).catch(() => {
        x.value = !1;
      });
    }, B = q(() => (t.value.diffs || []).filter((r) => !(b.value && r.source != b.value || g.value && r.type != g.value))), M = () => {
      var r, u;
      const v = (t.value.diff_count || 0) + (((r = t.value.charset) == null ? void 0 : r.count) || 0);
      H.confirm(
        `检测到 ${v} 项差异（结构缺失 ${t.value.diff_count || 0} 项、字符编码/排序规则 ${((u = t.value.charset) == null ? void 0 : u.count) || 0} 项）。结构修复仅补齐缺失的数据表与字段、不删除数据；字符编码修复将通过 ALTER TABLE CONVERT TO 统一字符集与排序规则。修复前请确认已完成数据库备份，是否继续？`,
        "一键修复",
        { confirmButtonText: "确认修复", cancelButtonText: "取消", type: "warning" }
      ).then(() => {
        h.value = !0, K().then((y) => {
          h.value = !1;
          const f = y.data;
          f.fail_count > 0 && I.error(`修复完成：成功 ${f.success_count} 项，失败 ${f.fail_count} 项`), t.value = f.check;
        }).catch(() => {
          h.value = !1;
        });
      }).catch(() => {
      });
    };
    return z(), (v, r) => {
      var $, j, F, L, R;
      const u = p("el-tag"), y = p("el-button"), f = p("el-option"), E = p("el-select"), _ = p("el-table-column"), D = p("el-table"), N = p("el-icon"), O = X("loading");
      return Y((n(), i("div", Q, [
        e("div", null, [
          e("div", W, [
            e("div", Z, [
              e("div", null, [
                e("div", ee, [
                  te,
                  t.value.status == "normal" ? (n(), w(u, {
                    key: 0,
                    type: "success",
                    effect: "light",
                    round: ""
                  }, {
                    default: a(() => [
                      d("结构正常")
                    ]),
                    _: 1
                  })) : (n(), w(u, {
                    key: 1,
                    type: "danger",
                    effect: "light",
                    round: ""
                  }, {
                    default: a(() => [
                      d("结构异常")
                    ]),
                    _: 1
                  }))
                ]),
                se
              ])
            ]),
            e("div", le, [
              s(y, {
                loading: x.value,
                onClick: z
              }, {
                default: a(() => [
                  d("重新检测")
                ]),
                _: 1
              }, 8, ["loading"]),
              s(y, {
                type: "primary",
                loading: h.value,
                disabled: (t.value.diff_count || 0) == 0 && ((($ = t.value.charset) == null ? void 0 : $.count) || 0) == 0,
                onClick: M
              }, {
                default: a(() => [
                  d("一键修复")
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
            ])
          ]),
          e("div", ae, [
            e("div", oe, [
              ne,
              e("div", ce, o(t.value.source_count || 0), 1)
            ]),
            e("div", ie, [
              de,
              e("div", re, o(t.value.table_count || 0), 1)
            ]),
            e("div", ue, [
              _e,
              e("div", {
                class: C(["text-[22px] font-bold", { "!text-[#f56c6c]": t.value.missing_count > 0 }])
              }, o(t.value.missing_count || 0), 3)
            ]),
            e("div", fe, [
              pe,
              e("div", {
                class: C(["text-[22px] font-bold", t.value.status == "normal" ? "!text-[#67c23a]" : "!text-[#f56c6c]"])
              }, o(t.value.status_name || "-"), 3)
            ]),
            e("div", xe, [
              ve,
              e("div", {
                class: C(["text-[22px] font-bold", { "!text-[#f56c6c]": (((j = t.value.charset) == null ? void 0 : j.count) || 0) > 0 }])
              }, o(((F = t.value.charset) == null ? void 0 : F.count) || 0), 3)
            ])
          ]),
          s(P, { class: "!mt-6" }, {
            default: a(() => [
              d(" 修复前请完成数据库备份，确认备份可用后再执行操作 ")
            ]),
            _: 1
          })
        ]),
        e("div", null, [
          e("div", me, [
            e("div", null, [
              he,
              s(u, {
                effect: "light",
                round: "",
                size: "small",
                type: t.value.diff_count > 0 ? "danger" : "info"
              }, {
                default: a(() => [
                  d(o(t.value.diff_count || 0) + " 项差异", 1)
                ]),
                _: 1
              }, 8, ["type"]),
              e("div", be, "系统与 " + o(t.value.addon_count || 0) + " 个已安装插件参与本次检测", 1)
            ]),
            e("div", ge, [
              s(E, {
                modelValue: b.value,
                "onUpdate:modelValue": r[0] || (r[0] = (l) => b.value = l),
                placeholder: "全部来源",
                clearable: "",
                class: "!w-[150px]"
              }, {
                default: a(() => [
                  (n(!0), i(V, null, T(t.value.sources, (l, c) => (n(), w(f, {
                    key: c,
                    label: l,
                    value: c
                  }, null, 8, ["label", "value"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue"]),
              s(E, {
                modelValue: g.value,
                "onUpdate:modelValue": r[1] || (r[1] = (l) => g.value = l),
                placeholder: "全部类型",
                clearable: "",
                class: "!w-[150px] ml-3"
              }, {
                default: a(() => [
                  s(f, {
                    label: "缺失数据表",
                    value: "table"
                  }),
                  s(f, {
                    label: "缺失字段",
                    value: "column"
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          k(B).length ? (n(), i("div", ye, [
            s(D, {
              data: k(B),
              size: "large"
            }, {
              default: a(() => [
                s(_, { type: "expand" }, {
                  default: a(({ row: l }) => [
                    e("div", we, [
                      ke,
                      e("pre", Ce, o(l.sql), 1)
                    ])
                  ]),
                  _: 1
                }),
                s(_, {
                  label: "数据表",
                  prop: "table",
                  "min-width": "180",
                  "show-overflow-tooltip": ""
                }),
                s(_, {
                  label: "差异类型",
                  width: "120"
                }, {
                  default: a(({ row: l }) => [
                    s(u, {
                      type: l.type == "table" ? "danger" : "warning",
                      effect: "light",
                      size: "small"
                    }, {
                      default: a(() => [
                        d(o(l.type_name), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ]),
                  _: 1
                }),
                s(_, {
                  label: "来源",
                  prop: "source_title",
                  "min-width": "140",
                  "show-overflow-tooltip": ""
                }),
                s(_, {
                  label: "缺失内容",
                  "min-width": "200"
                }, {
                  default: a(({ row: l }) => [
                    l.type == "table" ? (n(), i("span", Ve, "整表缺失")) : (n(!0), i(V, { key: 1 }, T(l.missing, (c) => (n(), w(u, {
                      key: c,
                      class: "mr-1 mb-1",
                      type: "warning",
                      effect: "plain",
                      size: "small"
                    }, {
                      default: a(() => [
                        d(o(c), 1)
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])
          ])) : (n(), i("div", Te, [
            e("div", ze, [
              s(N, { class: "text-[30px] text-[#67c23a] mr-4" }, {
                default: a(() => [
                  s(k(A))
                ]),
                _: 1
              }),
              e("div", null, [
                Be,
                e("div", Ee, "已完成 " + o(t.value.table_count || 0) + " 张表的结构检测", 1)
              ])
            ]),
            e("div", De, o(t.value.check_time || ""), 1)
          ]))
        ]),
        e("div", null, [
          e("div", Ne, [
            e("div", null, [
              $e,
              s(u, {
                effect: "light",
                round: "",
                size: "small",
                type: (((L = t.value.charset) == null ? void 0 : L.count) || 0) > 0 ? "danger" : "info"
              }, {
                default: a(() => {
                  var l;
                  return [
                    d(o(((l = t.value.charset) == null ? void 0 : l.count) || 0) + " 项异常", 1)
                  ];
                }),
                _: 1
              }, 8, ["type"]),
              e("div", je, "标准字符集：" + o(((R = t.value.charset) == null ? void 0 : R.standard_charset) || "-") + "（检测数据表与字段字符编码是否一致、排序规则是否正确且受服务器支持）", 1)
            ])
          ]),
          t.value.charset && t.value.charset.items.length ? (n(), i("div", Fe, [
            s(D, {
              data: t.value.charset.items,
              size: "large"
            }, {
              default: a(() => [
                s(_, { type: "expand" }, {
                  default: a(({ row: l }) => [
                    e("div", Le, [
                      e("div", Re, "异常明细（" + o(l.issues.length) + " 项）", 1),
                      (n(!0), i(V, null, T(l.issues, (c, S) => (n(), i("div", {
                        key: S,
                        class: "flex items-start mb-2"
                      }, [
                        s(u, {
                          size: "small",
                          effect: "plain",
                          class: "mr-2 shrink-0",
                          type: c.level == "table" ? "danger" : "warning"
                        }, {
                          default: a(() => [
                            d(o(c.level == "table" ? "表级" : "字段级"), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"]),
                        c.field ? (n(), i("span", Ae, "字段：" + o(c.field), 1)) : G("", !0),
                        e("span", Me, o(c.message), 1)
                      ]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                s(_, {
                  label: "数据表",
                  prop: "table_full",
                  "min-width": "200",
                  "show-overflow-tooltip": ""
                }),
                s(_, {
                  label: "表字符编码",
                  prop: "table_charset",
                  width: "140"
                }),
                s(_, {
                  label: "表排序规则",
                  prop: "table_collation",
                  "min-width": "180",
                  "show-overflow-tooltip": ""
                }),
                s(_, {
                  label: "异常数",
                  width: "100"
                }, {
                  default: a(({ row: l }) => [
                    d(o(l.issues.length), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])
          ])) : (n(), i("div", Oe, [
            s(N, { class: "text-[30px] text-[#67c23a] mr-4" }, {
              default: a(() => [
                s(k(A))
              ]),
              _: 1
            }),
            Se
          ]))
        ])
      ])), [
        [O, x.value]
      ]);
    };
  }
});
export {
  Qe as default
};
