import { defineComponent as Ce, reactive as Se, ref as m, computed as G, resolveComponent as u, resolveDirective as Pe, openBlock as f, createElementBlock as k, normalizeStyle as De, unref as t, createVNode as e, withCtx as r, createElementVNode as _, toDisplayString as c, createTextVNode as d, Fragment as V, renderList as $, createBlock as T, normalizeClass as J, withDirectives as Le, nextTick as A } from "vue";
import { _ as Me } from "./member_head-81b0c11e.js";
import { bQ as Te, t as a, j as Ve, du as $e, bP as Re, cY as Ee, dv as ze, dw as Ne } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as Fe } from "element-plus";
import { useRoute as Ae } from "vue-router";
import { u as Be } from "./useTablePageHeight-33d60cf6.js";
import Ie from "./add-member-30dd7df8.js";
import Ue from "./detail-member-2ffd0b81.js";
import je from "./edit-member-fb9fbc3b.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./member-point-edit-79d45eb8.js";
import "./member-balance-edit-0233e577.js";
const Ye = { class: "flex justify-between items-center" }, He = { class: "text-page-title" }, Qe = { class: "mt-[10px] table-fill-page__panel" }, qe = { class: "mb-[10px] flex items-center" }, Ge = { class: "el-dropdown-link" }, Je = { class: "text-center inline-block" }, Ke = { class: "table-fill-page__table" }, Oe = { class: "flex items-center" }, We = { class: "mr-[10px] rounded-full w-[50px] h-[50px] flex items-center justify-center" }, Xe = ["src"], Ze = {
  key: 1,
  class: "max-w-[50px] max-h-[50px]",
  src: Me,
  alt: ""
}, el = { class: "flex flex-col" }, ll = { class: "flex flex-col items-center" }, al = { class: "flex items-center" }, tl = { class: "mt-[16px] flex justify-end" }, Cl = /* @__PURE__ */ Ce({
  __name: "member",
  setup(nl) {
    const K = Ae().meta.title, { pageRef: O, pageStyle: W } = Be(), o = Se({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        keyword: "",
        register_type: "",
        member_label: "",
        register_channel: "",
        create_time: [],
        member_level: ""
      }
    }), B = m(), I = m([]);
    (async () => {
      I.value = await (await $e({})).data;
    })();
    const U = m([]);
    (async () => {
      U.value = await (await Re()).data;
    })();
    const j = m([]);
    Te().then(({ data: s }) => {
      j.value = s;
    });
    const X = (s) => {
      s && (s.resetFields(), C.value = !0, y());
    }, C = m(!1), y = (s = 1) => {
      o.loading = !0, o.page = s, Ee({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((n) => {
        o.loading = !1, o.data = n.data.data, o.total = n.data.total, C.value && (v.value = !1, b.value = [], x.value = null, h.value = []), v.value && !C.value && (P.value = !0, A(() => {
          o.data.forEach((i) => {
            var L, p;
            b.value.includes(i.member_id) ? (p = S.value) == null || p.toggleRowSelection(i, !1) : (L = S.value) == null || L.toggleRowSelection(i, !0);
          }), P.value = !1;
        })), C.value = !1;
      }).catch(() => {
        C.value = !1, o.loading = !1;
      });
    };
    y();
    const b = m([]), v = m(!1), x = m(null), Z = () => {
      P.value = !0, x.value === "page" ? (v.value = !1, x.value = null, b.value = [], h.value = [], S.value.clearSelection()) : (v.value = !1, x.value = "page", b.value = [], h.value = [], o.data.forEach((s) => {
        S.value.toggleRowSelection(s, !0);
      }), h.value = [...o.data]), A(() => {
        P.value = !1;
      });
    }, ee = () => {
      P.value = !0, x.value === "all" ? (v.value = !1, x.value = null, b.value = [], h.value = [], S.value.clearSelection()) : (b.value = [], h.value = [], v.value = !0, x.value = "all", o.data.forEach((s) => {
        S.value.toggleRowSelection(s, !0);
      })), A(() => {
        P.value = !1;
      });
    }, le = G(() => v.value ? o.data.filter((s) => !b.value.includes(s.member_id)) : h.value), S = m(), h = m([]), P = m(!1), ae = (s) => {
      if (!P.value)
        if (v.value) {
          const n = o.data.map((p) => p.member_id), i = s.map((p) => p.member_id), L = n.filter((p) => !i.includes(p));
          b.value = Array.from(/* @__PURE__ */ new Set([...b.value, ...L])), b.value = b.value.filter((p) => !i.includes(p));
        } else
          h.value = s;
    }, te = G(() => v.value ? o.total - b.value.length : h.value.length), Y = () => v.value ? {
      is_all: 1,
      ids: b.value,
      where: {
        ...o.searchParam
      }
    } : {
      is_all: 0,
      ids: h.value.map((s) => s.member_id),
      where: {
        ...o.searchParam
      }
    }, ne = () => {
      if (!v.value && h.value.length === 0 || v.value && b.value.length === o.total) {
        ElMessage({
          type: "warning",
          message: `${a("batchEmptySelectedTips")}`
        });
        return;
      }
      const n = Y(), i = m({
        method: "batchSet",
        type: "member_label",
        title: a("批量设置会员标签"),
        data: n
      });
      D.value.batchSetDialogType(i.value), D.value.showDialog = !0;
    }, oe = () => {
      if (!v.value && h.value.length === 0 || v.value && b.value.length === o.total) {
        ElMessage({
          type: "warning",
          message: `${a("batchEmptySelectedTips")}`
        });
        return;
      }
      const n = Y(), i = m({
        method: "batchSet",
        type: "member_level",
        title: a("批量设置会员等级"),
        data: n
      });
      D.value.batchSetDialogType(i.value), D.value.showDialog = !0;
    }, re = () => {
      C.value = !0, y();
    }, R = m(null), D = m(null), E = m(null);
    function se(s) {
      const n = m({
        type: "member_label",
        id: s.member_id,
        title: a("setLabel"),
        data: s
      });
      D.value.setDialogType(n.value), D.value.showDialog = !0;
    }
    function il(s) {
      Fe.confirm(
        a("memberDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        ze(s.member_id).then(() => {
          y();
        }).catch(() => {
        });
      });
    }
    const ie = () => {
      R.value.setFormData(), R.value.showDialog = !0;
    }, me = (s) => {
      let n = { id: s.member_id };
      E.value.setFormData(n), E.value.showDialog = !0;
    }, ce = m(null), z = m(!1), ue = (s) => {
      z.value = s;
    }, de = () => {
      z.value = !0;
    }, H = (s, n) => {
      Ne({
        status: n,
        member_ids: [s.member_id]
      }).then((i) => {
        i.code >= 0 && (C.value = !0, y());
      });
    };
    return (s, n) => {
      const i = u("el-button"), L = u("el-input"), p = u("el-form-item"), M = u("el-option"), N = u("el-select"), pe = u("el-date-picker"), _e = u("el-form"), Q = u("el-card"), be = u("arrow-down"), ve = u("el-icon"), q = u("el-dropdown-item"), fe = u("el-dropdown-menu"), ge = u("el-dropdown"), g = u("el-table-column"), F = u("el-tag"), he = u("el-table"), we = u("el-pagination"), ye = u("export-sure"), xe = Pe("loading");
      return f(), k("div", {
        ref_key: "pageRef",
        ref: O,
        class: "main-container table-fill-page",
        style: De(t(W))
      }, [
        e(Q, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: r(() => [
            _("div", Ye, [
              _("span", He, c(t(K)), 1),
              e(i, {
                type: "primary",
                onClick: ie
              }, {
                default: r(() => [
                  d(c(t(a)("addMember")), 1)
                ]),
                _: 1
              })
            ]),
            e(Q, {
              class: "box-card !border-none my-[20px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: r(() => [
                e(_e, {
                  inline: !0,
                  model: o.searchParam,
                  ref_key: "searchFormRef",
                  ref: B
                }, {
                  default: r(() => [
                    e(p, {
                      label: t(a)("memberInfo"),
                      prop: "keyword"
                    }, {
                      default: r(() => [
                        e(L, {
                          modelValue: o.searchParam.keyword,
                          "onUpdate:modelValue": n[0] || (n[0] = (l) => o.searchParam.keyword = l),
                          modelModifiers: { trim: !0 },
                          class: "!w-[200px]",
                          placeholder: t(a)("memberInfoPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, {
                      label: t(a)("registerChannel"),
                      prop: "register_channel"
                    }, {
                      default: r(() => [
                        e(N, {
                          modelValue: o.searchParam.register_channel,
                          "onUpdate:modelValue": n[1] || (n[1] = (l) => o.searchParam.register_channel = l),
                          clearable: "",
                          placeholder: t(a)("channelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: t(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(V, null, $(I.value, (l, w) => (f(), T(M, {
                              label: l,
                              value: w,
                              key: w
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, {
                      label: t(a)("memberLabel"),
                      prop: "member_label"
                    }, {
                      default: r(() => [
                        e(N, {
                          modelValue: o.searchParam.member_label,
                          "onUpdate:modelValue": n[2] || (n[2] = (l) => o.searchParam.member_label = l),
                          "collapse-tags": "",
                          clearable: "",
                          placeholder: t(a)("memberLabelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: t(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(V, null, $(U.value, (l, w) => (f(), T(M, {
                              label: l.label_name,
                              value: l.label_id,
                              key: w
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, {
                      label: t(a)("memberLevel"),
                      prop: "member_level"
                    }, {
                      default: r(() => [
                        e(N, {
                          modelValue: o.searchParam.member_level,
                          "onUpdate:modelValue": n[3] || (n[3] = (l) => o.searchParam.member_level = l),
                          "collapse-tags": "",
                          clearable: "",
                          placeholder: t(a)("memberLevelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: t(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(V, null, $(j.value, (l, w) => (f(), T(M, {
                              label: l.level_name,
                              value: l.level_id,
                              key: w
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, {
                      label: t(a)("createTime"),
                      prop: "create_time"
                    }, {
                      default: r(() => [
                        e(pe, {
                          modelValue: o.searchParam.create_time,
                          "onUpdate:modelValue": n[4] || (n[4] = (l) => o.searchParam.create_time = l),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": t(a)("startDate"),
                          "end-placeholder": t(a)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, null, {
                      default: r(() => [
                        e(i, {
                          type: "primary",
                          onClick: n[5] || (n[5] = (l) => y())
                        }, {
                          default: r(() => [
                            d(c(t(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        e(i, {
                          onClick: n[6] || (n[6] = (l) => X(B.value))
                        }, {
                          default: r(() => [
                            d(c(t(a)("reset")), 1)
                          ]),
                          _: 1
                        }),
                        e(i, {
                          type: "primary",
                          onClick: de
                        }, {
                          default: r(() => [
                            d(c(t(a)("export")), 1)
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
              _: 1
            }),
            _("div", Qe, [
              _("div", qe, [
                e(ge, { class: "mr-[20px] !text-primary w-[125px]" }, {
                  dropdown: r(() => [
                    e(fe, null, {
                      default: r(() => [
                        e(q, {
                          class: J(["select-wrap", { active: x.value === "all" }]),
                          onClick: ee
                        }, {
                          default: r(() => [
                            d("全选所有页")
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        e(q, {
                          class: J(["select-wrap", { active: x.value === "page" }]),
                          onClick: Z
                        }, {
                          default: r(() => [
                            d("全选当前页")
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    })
                  ]),
                  default: r(() => [
                    _("span", Ge, [
                      _("span", null, c(x.value === "all" ? t(a)("全选所有页") : t(a)("全选当前页")), 1),
                      d("("),
                      _("span", Je, c(t(te)), 1),
                      d(") "),
                      e(ve, null, {
                        default: r(() => [
                          e(be)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                e(i, {
                  onClick: ne,
                  size: "small"
                }, {
                  default: r(() => [
                    d(c(t(a)("标签")), 1)
                  ]),
                  _: 1
                }),
                e(i, {
                  onClick: oe,
                  size: "small"
                }, {
                  default: r(() => [
                    d(c(t(a)("等级")), 1)
                  ]),
                  _: 1
                })
              ]),
              _("div", Ke, [
                Le((f(), T(he, {
                  height: "100%",
                  data: o.data,
                  size: "large",
                  ref_key: "memberListTableRef",
                  ref: S,
                  "row-key": (l) => l.member_id,
                  "default-selection": t(le),
                  onSelectionChange: ae
                }, {
                  empty: r(() => [
                    _("span", null, c(o.loading ? "" : t(a)("emptyData")), 1)
                  ]),
                  default: r(() => [
                    e(g, {
                      type: "selection",
                      width: "55"
                    }),
                    e(g, {
                      prop: "member_no",
                      label: t(a)("memberNo"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    e(g, {
                      prop: "nickname",
                      "show-overflow-tooltip": !0,
                      label: t(a)("memberInfo"),
                      "min-width": "170"
                    }, {
                      default: r(({ row: l }) => [
                        _("div", Oe, [
                          _("div", We, [
                            l.headimg ? (f(), k("img", {
                              key: 0,
                              class: "max-w-[50px] max-h-[50px]",
                              src: t(Ve)(l.headimg),
                              alt: ""
                            }, null, 8, Xe)) : (f(), k("img", Ze))
                          ]),
                          _("div", el, [
                            _("span", null, c(l.nickname || ""), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(g, {
                      prop: "member_level_name",
                      label: t(a)("memberLevel"),
                      "min-width": "130",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    e(g, {
                      prop: "mobile",
                      label: t(a)("mobile"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    e(g, {
                      prop: "point",
                      label: t(a)("point"),
                      "min-width": "80",
                      align: "right"
                    }, {
                      default: r(({ row: l }) => [
                        d(c(Number.parseInt(l.point)), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(g, {
                      prop: "balance",
                      label: t(a)("balance"),
                      "min-width": "130",
                      align: "right"
                    }, null, 8, ["label"]),
                    e(g, {
                      prop: "member_label",
                      label: t(a)("memberLabelTag"),
                      "min-width": "120",
                      align: "center"
                    }, {
                      default: r(({ row: l }) => [
                        _("div", ll, [
                          (f(!0), k(V, null, $(l.member_label_array, (w, ke) => (f(), k("div", {
                            class: "my-[3px]",
                            key: ke
                          }, [
                            e(F, { type: "info" }, {
                              default: r(() => [
                                d(c(w.label_name), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(g, {
                      prop: "register_channel_name",
                      label: t(a)("registerChannel"),
                      "min-width": "110",
                      align: "center"
                    }, null, 8, ["label"]),
                    e(g, {
                      prop: "member_label",
                      label: t(a)("status"),
                      "min-width": "120",
                      align: "center"
                    }, {
                      default: r(({ row: l }) => [
                        l.status == 1 ? (f(), T(F, {
                          key: 0,
                          type: "success",
                          onClick: (w) => H(l, 0),
                          class: "cursor-pointer"
                        }, {
                          default: r(() => [
                            d(c(t(a)("normal")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : (f(), T(F, {
                          key: 1,
                          type: "error",
                          onClick: (w) => H(l, 1),
                          class: "cursor-pointer"
                        }, {
                          default: r(() => [
                            d(c(t(a)("lock")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]))
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(g, {
                      label: t(a)("createTime"),
                      "min-width": "150",
                      align: "center"
                    }, {
                      default: r(({ row: l }) => [
                        d(c(l.create_time || ""), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(g, {
                      label: t(a)("lastVisitTime"),
                      "min-width": "150",
                      align: "center"
                    }, {
                      default: r(({ row: l }) => [
                        d(c(l.last_visit_time || ""), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(g, {
                      label: t(a)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "130"
                    }, {
                      default: r(({ row: l }) => [
                        _("div", al, [
                          e(i, {
                            type: "primary",
                            link: "",
                            onClick: (w) => me(l)
                          }, {
                            default: r(() => [
                              d(c(t(a)("detail")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          e(i, {
                            type: "primary",
                            link: "",
                            onClick: (w) => se(l)
                          }, {
                            default: r(() => [
                              d(c(t(a)("setLabel")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data", "row-key", "default-selection"])), [
                  [xe, o.loading]
                ])
              ]),
              _("div", tl, [
                e(we, {
                  "current-page": o.page,
                  "onUpdate:current-page": n[7] || (n[7] = (l) => o.page = l),
                  "page-size": o.limit,
                  "onUpdate:page-size": n[8] || (n[8] = (l) => o.limit = l),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: o.total,
                  onSizeChange: n[9] || (n[9] = (l) => y()),
                  onCurrentChange: y
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            e(Ie, {
              ref_key: "addMemberDialog",
              ref: R,
              onComplete: n[10] || (n[10] = (l) => y())
            }, null, 512),
            e(je, {
              ref_key: "editMemberDialog",
              ref: D,
              onComplete: n[11] || (n[11] = (l) => re())
            }, null, 512),
            e(ye, {
              ref_key: "exportSureDialog",
              ref: ce,
              show: z.value,
              type: "member",
              searchParam: o.searchParam,
              onClose: ue
            }, null, 8, ["show", "searchParam"]),
            e(Ue, {
              ref_key: "detailMemberDialog",
              ref: E,
              onLoad: n[12] || (n[12] = (l) => y())
            }, null, 512)
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  Cl as default
};
