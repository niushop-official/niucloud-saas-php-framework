import { defineComponent as xe, reactive as ke, ref as m, computed as G, resolveComponent as c, resolveDirective as Ce, openBlock as f, createElementBlock as k, createVNode as e, withCtx as r, createElementVNode as b, toDisplayString as u, unref as n, createTextVNode as d, Fragment as T, renderList as $, createBlock as V, normalizeClass as K, withDirectives as Se, nextTick as I } from "vue";
import { _ as De } from "./member_head-81b0c11e.js";
import { bI as Pe, t as a, i as Le, de as Me, bH as Ve, cJ as Te, df as $e, dg as Ee } from "./core-shared-e1759ce4.js";
import { ElMessageBox as Re } from "element-plus";
import { useRoute as Ne } from "vue-router";
import ze from "./add-member-9f685f6b.js";
import Fe from "./detail-member-caea4438.js";
import Ie from "./edit-member-2d0d2960.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./member-point-edit-782a8ecd.js";
import "./member-balance-edit-16a30f69.js";
const Ae = { class: "main-container" }, Be = { class: "flex justify-between items-center" }, Ue = { class: "text-page-title" }, je = { class: "mt-[10px]" }, Ye = { class: "mb-[10px] flex items-center" }, He = { class: "el-dropdown-link" }, Je = { class: "text-center inline-block" }, qe = { class: "flex items-center" }, Ge = { class: "mr-[10px] rounded-full w-[50px] h-[50px] flex items-center justify-center" }, Ke = ["src"], Oe = {
  key: 1,
  class: "max-w-[50px] max-h-[50px]",
  src: De,
  alt: ""
}, Qe = { class: "flex flex-col" }, We = { class: "flex flex-col items-center" }, Xe = { class: "flex items-center" }, Ze = { class: "mt-[16px] flex justify-end" }, hl = /* @__PURE__ */ xe({
  __name: "member",
  setup(el) {
    const O = Ne().meta.title, o = ke({
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
    }), A = m(), B = m([]);
    (async () => {
      B.value = await (await Me({})).data;
    })();
    const U = m([]);
    (async () => {
      U.value = await (await Ve()).data;
    })();
    const j = m([]);
    Pe().then(({ data: s }) => {
      j.value = s;
    });
    const Q = (s) => {
      s && (s.resetFields(), C.value = !0, y());
    }, C = m(!1), y = (s = 1) => {
      o.loading = !0, o.page = s, Te({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((t) => {
        o.loading = !1, o.data = t.data.data, o.total = t.data.total, C.value && (v.value = !1, _.value = [], x.value = null, h.value = []), v.value && !C.value && (D.value = !0, I(() => {
          o.data.forEach((i) => {
            var L, p;
            _.value.includes(i.member_id) ? (p = S.value) == null || p.toggleRowSelection(i, !1) : (L = S.value) == null || L.toggleRowSelection(i, !0);
          }), D.value = !1;
        })), C.value = !1;
      }).catch(() => {
        C.value = !1, o.loading = !1;
      });
    };
    y();
    const _ = m([]), v = m(!1), x = m(null), W = () => {
      D.value = !0, x.value === "page" ? (v.value = !1, x.value = null, _.value = [], h.value = [], S.value.clearSelection()) : (v.value = !1, x.value = "page", _.value = [], h.value = [], o.data.forEach((s) => {
        S.value.toggleRowSelection(s, !0);
      }), h.value = [...o.data]), I(() => {
        D.value = !1;
      });
    }, X = () => {
      D.value = !0, x.value === "all" ? (v.value = !1, x.value = null, _.value = [], h.value = [], S.value.clearSelection()) : (_.value = [], h.value = [], v.value = !0, x.value = "all", o.data.forEach((s) => {
        S.value.toggleRowSelection(s, !0);
      })), I(() => {
        D.value = !1;
      });
    }, Z = G(() => v.value ? o.data.filter((s) => !_.value.includes(s.member_id)) : h.value), S = m(), h = m([]), D = m(!1), ee = (s) => {
      if (!D.value)
        if (v.value) {
          const t = o.data.map((p) => p.member_id), i = s.map((p) => p.member_id), L = t.filter((p) => !i.includes(p));
          _.value = Array.from(/* @__PURE__ */ new Set([..._.value, ...L])), _.value = _.value.filter((p) => !i.includes(p));
        } else
          h.value = s;
    }, le = G(() => v.value ? o.total - _.value.length : h.value.length), Y = () => v.value ? {
      is_all: 1,
      ids: _.value,
      where: {
        ...o.searchParam
      }
    } : {
      is_all: 0,
      ids: h.value.map((s) => s.member_id),
      where: {
        ...o.searchParam
      }
    }, ae = () => {
      if (!v.value && h.value.length === 0 || v.value && _.value.length === o.total) {
        ElMessage({
          type: "warning",
          message: `${a("batchEmptySelectedTips")}`
        });
        return;
      }
      const t = Y(), i = m({
        method: "batchSet",
        type: "member_label",
        title: a("批量设置会员标签"),
        data: t
      });
      P.value.batchSetDialogType(i.value), P.value.showDialog = !0;
    }, te = () => {
      if (!v.value && h.value.length === 0 || v.value && _.value.length === o.total) {
        ElMessage({
          type: "warning",
          message: `${a("batchEmptySelectedTips")}`
        });
        return;
      }
      const t = Y(), i = m({
        method: "batchSet",
        type: "member_level",
        title: a("批量设置会员等级"),
        data: t
      });
      P.value.batchSetDialogType(i.value), P.value.showDialog = !0;
    }, ne = () => {
      C.value = !0, y();
    }, E = m(null), P = m(null), R = m(null);
    function oe(s) {
      const t = m({
        type: "member_label",
        id: s.member_id,
        title: a("setLabel"),
        data: s
      });
      P.value.setDialogType(t.value), P.value.showDialog = !0;
    }
    function nl(s) {
      Re.confirm(
        a("memberDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        $e(s.member_id).then(() => {
          y();
        }).catch(() => {
        });
      });
    }
    const re = () => {
      E.value.setFormData(), E.value.showDialog = !0;
    }, se = (s) => {
      let t = { id: s.member_id };
      R.value.setFormData(t), R.value.showDialog = !0;
    }, ie = m(null), N = m(!1), me = (s) => {
      N.value = s;
    }, ue = () => {
      N.value = !0;
    }, H = (s, t) => {
      Ee({
        status: t,
        member_ids: [s.member_id]
      }).then((i) => {
        i.code >= 0 && (C.value = !0, y());
      });
    };
    return (s, t) => {
      const i = c("el-button"), L = c("el-input"), p = c("el-form-item"), M = c("el-option"), z = c("el-select"), ce = c("el-date-picker"), de = c("el-form"), J = c("el-card"), pe = c("arrow-down"), _e = c("el-icon"), q = c("el-dropdown-item"), be = c("el-dropdown-menu"), ve = c("el-dropdown"), g = c("el-table-column"), F = c("el-tag"), fe = c("el-table"), ge = c("el-pagination"), he = c("export-sure"), we = Ce("loading");
      return f(), k("div", Ae, [
        e(J, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            b("div", Be, [
              b("span", Ue, u(n(O)), 1),
              e(i, {
                type: "primary",
                onClick: re
              }, {
                default: r(() => [
                  d(u(n(a)("addMember")), 1)
                ]),
                _: 1
              })
            ]),
            e(J, {
              class: "box-card !border-none my-[20px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                e(de, {
                  inline: !0,
                  model: o.searchParam,
                  ref_key: "searchFormRef",
                  ref: A
                }, {
                  default: r(() => [
                    e(p, {
                      label: n(a)("memberInfo"),
                      prop: "keyword"
                    }, {
                      default: r(() => [
                        e(L, {
                          modelValue: o.searchParam.keyword,
                          "onUpdate:modelValue": t[0] || (t[0] = (l) => o.searchParam.keyword = l),
                          modelModifiers: { trim: !0 },
                          class: "!w-[200px]",
                          placeholder: n(a)("memberInfoPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, {
                      label: n(a)("registerChannel"),
                      prop: "register_channel"
                    }, {
                      default: r(() => [
                        e(z, {
                          modelValue: o.searchParam.register_channel,
                          "onUpdate:modelValue": t[1] || (t[1] = (l) => o.searchParam.register_channel = l),
                          clearable: "",
                          placeholder: n(a)("channelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: n(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(T, null, $(B.value, (l, w) => (f(), V(M, {
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
                      label: n(a)("memberLabel"),
                      prop: "member_label"
                    }, {
                      default: r(() => [
                        e(z, {
                          modelValue: o.searchParam.member_label,
                          "onUpdate:modelValue": t[2] || (t[2] = (l) => o.searchParam.member_label = l),
                          "collapse-tags": "",
                          clearable: "",
                          placeholder: n(a)("memberLabelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: n(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(T, null, $(U.value, (l, w) => (f(), V(M, {
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
                      label: n(a)("memberLevel"),
                      prop: "member_level"
                    }, {
                      default: r(() => [
                        e(z, {
                          modelValue: o.searchParam.member_level,
                          "onUpdate:modelValue": t[3] || (t[3] = (l) => o.searchParam.member_level = l),
                          "collapse-tags": "",
                          clearable: "",
                          placeholder: n(a)("memberLevelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: n(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(T, null, $(j.value, (l, w) => (f(), V(M, {
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
                      label: n(a)("createTime"),
                      prop: "create_time"
                    }, {
                      default: r(() => [
                        e(ce, {
                          modelValue: o.searchParam.create_time,
                          "onUpdate:modelValue": t[4] || (t[4] = (l) => o.searchParam.create_time = l),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": n(a)("startDate"),
                          "end-placeholder": n(a)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, null, {
                      default: r(() => [
                        e(i, {
                          type: "primary",
                          onClick: t[5] || (t[5] = (l) => y())
                        }, {
                          default: r(() => [
                            d(u(n(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        e(i, {
                          onClick: t[6] || (t[6] = (l) => Q(A.value))
                        }, {
                          default: r(() => [
                            d(u(n(a)("reset")), 1)
                          ]),
                          _: 1
                        }),
                        e(i, {
                          type: "primary",
                          onClick: ue
                        }, {
                          default: r(() => [
                            d(u(n(a)("export")), 1)
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
            b("div", je, [
              b("div", Ye, [
                e(ve, { class: "mr-[20px] !text-primary w-[125px]" }, {
                  dropdown: r(() => [
                    e(be, null, {
                      default: r(() => [
                        e(q, {
                          class: K(["select-wrap", { active: x.value === "all" }]),
                          onClick: X
                        }, {
                          default: r(() => [
                            d("全选所有页")
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        e(q, {
                          class: K(["select-wrap", { active: x.value === "page" }]),
                          onClick: W
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
                    b("span", He, [
                      b("span", null, u(x.value === "all" ? n(a)("全选所有页") : n(a)("全选当前页")), 1),
                      d("("),
                      b("span", Je, u(le.value), 1),
                      d(") "),
                      e(_e, null, {
                        default: r(() => [
                          e(pe)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                e(i, {
                  onClick: ae,
                  size: "small"
                }, {
                  default: r(() => [
                    d(u(n(a)("标签")), 1)
                  ]),
                  _: 1
                }),
                e(i, {
                  onClick: te,
                  size: "small"
                }, {
                  default: r(() => [
                    d(u(n(a)("等级")), 1)
                  ]),
                  _: 1
                })
              ]),
              Se((f(), V(fe, {
                data: o.data,
                size: "large",
                ref_key: "memberListTableRef",
                ref: S,
                "row-key": (l) => l.member_id,
                "default-selection": Z.value,
                onSelectionChange: ee
              }, {
                empty: r(() => [
                  b("span", null, u(o.loading ? "" : n(a)("emptyData")), 1)
                ]),
                default: r(() => [
                  e(g, {
                    type: "selection",
                    width: "55"
                  }),
                  e(g, {
                    prop: "member_no",
                    label: n(a)("memberNo"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "nickname",
                    "show-overflow-tooltip": !0,
                    label: n(a)("memberInfo"),
                    "min-width": "170"
                  }, {
                    default: r(({ row: l }) => [
                      b("div", qe, [
                        b("div", Ge, [
                          l.headimg ? (f(), k("img", {
                            key: 0,
                            class: "max-w-[50px] max-h-[50px]",
                            src: n(Le)(l.headimg),
                            alt: ""
                          }, null, 8, Ke)) : (f(), k("img", Oe))
                        ]),
                        b("div", Qe, [
                          b("span", null, u(l.nickname || ""), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    prop: "member_level_name",
                    label: n(a)("memberLevel"),
                    "min-width": "130",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "mobile",
                    label: n(a)("mobile"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "point",
                    label: n(a)("point"),
                    "min-width": "80",
                    align: "right"
                  }, {
                    default: r(({ row: l }) => [
                      d(u(Number.parseInt(l.point)), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    prop: "balance",
                    label: n(a)("balance"),
                    "min-width": "130",
                    align: "right"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "member_label",
                    label: n(a)("memberLabelTag"),
                    "min-width": "120",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      b("div", We, [
                        (f(!0), k(T, null, $(l.member_label_array, (w, ye) => (f(), k("div", {
                          class: "my-[3px]",
                          key: ye
                        }, [
                          e(F, { type: "info" }, {
                            default: r(() => [
                              d(u(w.label_name), 1)
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
                    label: n(a)("registerChannel"),
                    "min-width": "110",
                    align: "center"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "member_label",
                    label: n(a)("status"),
                    "min-width": "120",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      l.status == 1 ? (f(), V(F, {
                        key: 0,
                        type: "success",
                        onClick: (w) => H(l, 0),
                        class: "cursor-pointer"
                      }, {
                        default: r(() => [
                          d(u(n(a)("normal")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : (f(), V(F, {
                        key: 1,
                        type: "error",
                        onClick: (w) => H(l, 1),
                        class: "cursor-pointer"
                      }, {
                        default: r(() => [
                          d(u(n(a)("lock")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    label: n(a)("createTime"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      d(u(l.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    label: n(a)("lastVisitTime"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      d(u(l.last_visit_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    label: n(a)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: r(({ row: l }) => [
                      b("div", Xe, [
                        e(i, {
                          type: "primary",
                          link: "",
                          onClick: (w) => se(l)
                        }, {
                          default: r(() => [
                            d(u(n(a)("detail")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        e(i, {
                          type: "primary",
                          link: "",
                          onClick: (w) => oe(l)
                        }, {
                          default: r(() => [
                            d(u(n(a)("setLabel")), 1)
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
                [we, o.loading]
              ]),
              b("div", Ze, [
                e(ge, {
                  "current-page": o.page,
                  "onUpdate:currentPage": t[7] || (t[7] = (l) => o.page = l),
                  "page-size": o.limit,
                  "onUpdate:pageSize": t[8] || (t[8] = (l) => o.limit = l),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: o.total,
                  onSizeChange: t[9] || (t[9] = (l) => y()),
                  onCurrentChange: y
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            e(ze, {
              ref_key: "addMemberDialog",
              ref: E,
              onComplete: t[10] || (t[10] = (l) => y())
            }, null, 512),
            e(Ie, {
              ref_key: "editMemberDialog",
              ref: P,
              onComplete: t[11] || (t[11] = (l) => ne())
            }, null, 512),
            e(he, {
              ref_key: "exportSureDialog",
              ref: ie,
              show: N.value,
              type: "member",
              searchParam: o.searchParam,
              onClose: me
            }, null, 8, ["show", "searchParam"]),
            e(Fe, {
              ref_key: "detailMemberDialog",
              ref: R,
              onLoad: t[12] || (t[12] = (l) => y())
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  hl as default
};
