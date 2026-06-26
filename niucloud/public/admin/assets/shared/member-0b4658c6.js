import { defineComponent as xe, reactive as ke, ref as u, computed as J, resolveComponent as c, resolveDirective as Ce, openBlock as f, createElementBlock as k, createVNode as e, withCtx as r, createElementVNode as b, toDisplayString as m, unref as o, createTextVNode as d, Fragment as T, renderList as $, createBlock as V, normalizeClass as K, withDirectives as Se, nextTick as I } from "vue";
import { _ as Pe } from "./member_head-81b0c11e.js";
import { bI as De, t as a, i as Le, dc as Me, bH as Ve, cH as Te, dd as $e } from "./core-shared-ca1fcae5.js";
import "element-plus";
import { useRoute as Re } from "vue-router";
import { _ as Ee } from "./add-member.vue_vue_type_script_setup_true_lang-da833674.js";
import { _ as Ne } from "./detail-member.vue_vue_type_script_setup_true_lang-edd236db.js";
import { _ as ze } from "./edit-member.vue_vue_type_script_setup_true_lang-c6fcaef3.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./member-point-edit.vue_vue_type_script_setup_true_lang-29481bfc.js";
import "./member-balance-edit.vue_vue_type_script_setup_true_lang-4e6a41d5.js";
const Fe = { class: "main-container" }, Ie = { class: "flex justify-between items-center" }, Ae = { class: "text-page-title" }, Ue = { class: "mt-[10px]" }, je = { class: "mb-[10px] flex items-center" }, Be = { class: "el-dropdown-link" }, He = { class: "text-center inline-block" }, Ye = { class: "flex items-center" }, qe = { class: "mr-[10px] rounded-full w-[50px] h-[50px] flex items-center justify-center" }, Ge = ["src"], Je = {
  key: 1,
  class: "max-w-[50px] max-h-[50px]",
  src: Pe,
  alt: ""
}, Ke = { class: "flex flex-col" }, Oe = { class: "flex flex-col items-center" }, Qe = { class: "flex items-center" }, We = { class: "mt-[16px] flex justify-end" }, vl = /* @__PURE__ */ xe({
  __name: "member",
  setup(Xe) {
    const O = Re().meta.title, n = ke({
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
    }), A = u(), U = u([]);
    (async () => {
      U.value = await (await Me({})).data;
    })();
    const j = u([]);
    (async () => {
      j.value = await (await Ve()).data;
    })();
    const B = u([]);
    De().then(({ data: s }) => {
      B.value = s;
    });
    const Q = (s) => {
      s && (s.resetFields(), C.value = !0, x());
    }, C = u(!1), x = (s = 1) => {
      n.loading = !0, n.page = s, Te({
        page: n.page,
        limit: n.limit,
        ...n.searchParam
      }).then((t) => {
        n.loading = !1, n.data = t.data.data, n.total = t.data.total, C.value && (v.value = !1, _.value = [], y.value = null, h.value = []), v.value && !C.value && (P.value = !0, I(() => {
          n.data.forEach((i) => {
            var L, p;
            _.value.includes(i.member_id) ? (p = S.value) == null || p.toggleRowSelection(i, !1) : (L = S.value) == null || L.toggleRowSelection(i, !0);
          }), P.value = !1;
        })), C.value = !1;
      }).catch(() => {
        C.value = !1, n.loading = !1;
      });
    };
    x();
    const _ = u([]), v = u(!1), y = u(null), W = () => {
      P.value = !0, y.value === "page" ? (v.value = !1, y.value = null, _.value = [], h.value = [], S.value.clearSelection()) : (v.value = !1, y.value = "page", _.value = [], h.value = [], n.data.forEach((s) => {
        S.value.toggleRowSelection(s, !0);
      }), h.value = [...n.data]), I(() => {
        P.value = !1;
      });
    }, X = () => {
      P.value = !0, y.value === "all" ? (v.value = !1, y.value = null, _.value = [], h.value = [], S.value.clearSelection()) : (_.value = [], h.value = [], v.value = !0, y.value = "all", n.data.forEach((s) => {
        S.value.toggleRowSelection(s, !0);
      })), I(() => {
        P.value = !1;
      });
    }, Z = J(() => v.value ? n.data.filter((s) => !_.value.includes(s.member_id)) : h.value), S = u(), h = u([]), P = u(!1), ee = (s) => {
      if (!P.value)
        if (v.value) {
          const t = n.data.map((p) => p.member_id), i = s.map((p) => p.member_id), L = t.filter((p) => !i.includes(p));
          _.value = Array.from(/* @__PURE__ */ new Set([..._.value, ...L])), _.value = _.value.filter((p) => !i.includes(p));
        } else
          h.value = s;
    }, le = J(() => v.value ? n.total - _.value.length : h.value.length), H = () => v.value ? {
      is_all: 1,
      ids: _.value,
      where: {
        ...n.searchParam
      }
    } : {
      is_all: 0,
      ids: h.value.map((s) => s.member_id),
      where: {
        ...n.searchParam
      }
    }, ae = () => {
      if (!v.value && h.value.length === 0 || v.value && _.value.length === n.total) {
        ElMessage({
          type: "warning",
          message: `${a("batchEmptySelectedTips")}`
        });
        return;
      }
      const t = H(), i = u({
        method: "batchSet",
        type: "member_label",
        title: a("批量设置会员标签"),
        data: t
      });
      D.value.batchSetDialogType(i.value), D.value.showDialog = !0;
    }, te = () => {
      if (!v.value && h.value.length === 0 || v.value && _.value.length === n.total) {
        ElMessage({
          type: "warning",
          message: `${a("batchEmptySelectedTips")}`
        });
        return;
      }
      const t = H(), i = u({
        method: "batchSet",
        type: "member_level",
        title: a("批量设置会员等级"),
        data: t
      });
      D.value.batchSetDialogType(i.value), D.value.showDialog = !0;
    }, oe = () => {
      C.value = !0, x();
    }, R = u(null), D = u(null), E = u(null);
    function ne(s) {
      const t = u({
        type: "member_label",
        id: s.member_id,
        title: a("setLabel"),
        data: s
      });
      D.value.setDialogType(t.value), D.value.showDialog = !0;
    }
    const re = () => {
      R.value.setFormData(), R.value.showDialog = !0;
    }, se = (s) => {
      let t = { id: s.member_id };
      E.value.setFormData(t), E.value.showDialog = !0;
    }, ie = u(null), N = u(!1), ue = (s) => {
      N.value = s;
    }, me = () => {
      N.value = !0;
    }, Y = (s, t) => {
      $e({
        status: t,
        member_ids: [s.member_id]
      }).then((i) => {
        i.code >= 0 && (C.value = !0, x());
      });
    };
    return (s, t) => {
      const i = c("el-button"), L = c("el-input"), p = c("el-form-item"), M = c("el-option"), z = c("el-select"), ce = c("el-date-picker"), de = c("el-form"), q = c("el-card"), pe = c("arrow-down"), _e = c("el-icon"), G = c("el-dropdown-item"), be = c("el-dropdown-menu"), ve = c("el-dropdown"), g = c("el-table-column"), F = c("el-tag"), fe = c("el-table"), ge = c("el-pagination"), he = c("export-sure"), we = Ce("loading");
      return f(), k("div", Fe, [
        e(q, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            b("div", Ie, [
              b("span", Ae, m(o(O)), 1),
              e(i, {
                type: "primary",
                onClick: re
              }, {
                default: r(() => [
                  d(m(o(a)("addMember")), 1)
                ]),
                _: 1
              })
            ]),
            e(q, {
              class: "box-card !border-none my-[20px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                e(de, {
                  inline: !0,
                  model: n.searchParam,
                  ref_key: "searchFormRef",
                  ref: A
                }, {
                  default: r(() => [
                    e(p, {
                      label: o(a)("memberInfo"),
                      prop: "keyword"
                    }, {
                      default: r(() => [
                        e(L, {
                          modelValue: n.searchParam.keyword,
                          "onUpdate:modelValue": t[0] || (t[0] = (l) => n.searchParam.keyword = l),
                          modelModifiers: { trim: !0 },
                          class: "!w-[200px]",
                          placeholder: o(a)("memberInfoPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, {
                      label: o(a)("registerChannel"),
                      prop: "register_channel"
                    }, {
                      default: r(() => [
                        e(z, {
                          modelValue: n.searchParam.register_channel,
                          "onUpdate:modelValue": t[1] || (t[1] = (l) => n.searchParam.register_channel = l),
                          clearable: "",
                          placeholder: o(a)("channelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: o(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(T, null, $(U.value, (l, w) => (f(), V(M, {
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
                      label: o(a)("memberLabel"),
                      prop: "member_label"
                    }, {
                      default: r(() => [
                        e(z, {
                          modelValue: n.searchParam.member_label,
                          "onUpdate:modelValue": t[2] || (t[2] = (l) => n.searchParam.member_label = l),
                          "collapse-tags": "",
                          clearable: "",
                          placeholder: o(a)("memberLabelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: o(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(T, null, $(j.value, (l, w) => (f(), V(M, {
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
                      label: o(a)("memberLevel"),
                      prop: "member_level"
                    }, {
                      default: r(() => [
                        e(z, {
                          modelValue: n.searchParam.member_level,
                          "onUpdate:modelValue": t[3] || (t[3] = (l) => n.searchParam.member_level = l),
                          "collapse-tags": "",
                          clearable: "",
                          placeholder: o(a)("memberLevelPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            e(M, {
                              label: o(a)("selectPlaceholder"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), k(T, null, $(B.value, (l, w) => (f(), V(M, {
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
                      label: o(a)("createTime"),
                      prop: "create_time"
                    }, {
                      default: r(() => [
                        e(ce, {
                          modelValue: n.searchParam.create_time,
                          "onUpdate:modelValue": t[4] || (t[4] = (l) => n.searchParam.create_time = l),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": o(a)("startDate"),
                          "end-placeholder": o(a)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    e(p, null, {
                      default: r(() => [
                        e(i, {
                          type: "primary",
                          onClick: t[5] || (t[5] = (l) => x())
                        }, {
                          default: r(() => [
                            d(m(o(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        e(i, {
                          onClick: t[6] || (t[6] = (l) => Q(A.value))
                        }, {
                          default: r(() => [
                            d(m(o(a)("reset")), 1)
                          ]),
                          _: 1
                        }),
                        e(i, {
                          type: "primary",
                          onClick: me
                        }, {
                          default: r(() => [
                            d(m(o(a)("export")), 1)
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
            b("div", Ue, [
              b("div", je, [
                e(ve, { class: "mr-[20px] !text-primary w-[125px]" }, {
                  dropdown: r(() => [
                    e(be, null, {
                      default: r(() => [
                        e(G, {
                          class: K(["select-wrap", { active: y.value === "all" }]),
                          onClick: X
                        }, {
                          default: r(() => [
                            d("全选所有页")
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        e(G, {
                          class: K(["select-wrap", { active: y.value === "page" }]),
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
                    b("span", Be, [
                      b("span", null, m(y.value === "all" ? o(a)("全选所有页") : o(a)("全选当前页")), 1),
                      d("("),
                      b("span", He, m(le.value), 1),
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
                    d(m(o(a)("标签")), 1)
                  ]),
                  _: 1
                }),
                e(i, {
                  onClick: te,
                  size: "small"
                }, {
                  default: r(() => [
                    d(m(o(a)("等级")), 1)
                  ]),
                  _: 1
                })
              ]),
              Se((f(), V(fe, {
                data: n.data,
                size: "large",
                ref_key: "memberListTableRef",
                ref: S,
                "row-key": (l) => l.member_id,
                "default-selection": Z.value,
                onSelectionChange: ee
              }, {
                empty: r(() => [
                  b("span", null, m(n.loading ? "" : o(a)("emptyData")), 1)
                ]),
                default: r(() => [
                  e(g, {
                    type: "selection",
                    width: "55"
                  }),
                  e(g, {
                    prop: "member_no",
                    label: o(a)("memberNo"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "nickname",
                    "show-overflow-tooltip": !0,
                    label: o(a)("memberInfo"),
                    "min-width": "170"
                  }, {
                    default: r(({ row: l }) => [
                      b("div", Ye, [
                        b("div", qe, [
                          l.headimg ? (f(), k("img", {
                            key: 0,
                            class: "max-w-[50px] max-h-[50px]",
                            src: o(Le)(l.headimg),
                            alt: ""
                          }, null, 8, Ge)) : (f(), k("img", Je))
                        ]),
                        b("div", Ke, [
                          b("span", null, m(l.nickname || ""), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    prop: "member_level_name",
                    label: o(a)("memberLevel"),
                    "min-width": "130",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "mobile",
                    label: o(a)("mobile"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "point",
                    label: o(a)("point"),
                    "min-width": "80",
                    align: "right"
                  }, {
                    default: r(({ row: l }) => [
                      d(m(Number.parseInt(l.point)), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    prop: "balance",
                    label: o(a)("balance"),
                    "min-width": "130",
                    align: "right"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "member_label",
                    label: o(a)("memberLabelTag"),
                    "min-width": "120",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      b("div", Oe, [
                        (f(!0), k(T, null, $(l.member_label_array, (w, ye) => (f(), k("div", {
                          class: "my-[3px]",
                          key: ye
                        }, [
                          e(F, { type: "info" }, {
                            default: r(() => [
                              d(m(w.label_name), 1)
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
                    label: o(a)("registerChannel"),
                    "min-width": "110",
                    align: "center"
                  }, null, 8, ["label"]),
                  e(g, {
                    prop: "member_label",
                    label: o(a)("status"),
                    "min-width": "120",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      l.status == 1 ? (f(), V(F, {
                        key: 0,
                        type: "success",
                        onClick: (w) => Y(l, 0),
                        class: "cursor-pointer"
                      }, {
                        default: r(() => [
                          d(m(o(a)("normal")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : (f(), V(F, {
                        key: 1,
                        type: "error",
                        onClick: (w) => Y(l, 1),
                        class: "cursor-pointer"
                      }, {
                        default: r(() => [
                          d(m(o(a)("lock")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    label: o(a)("createTime"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      d(m(l.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    label: o(a)("lastVisitTime"),
                    "min-width": "150",
                    align: "center"
                  }, {
                    default: r(({ row: l }) => [
                      d(m(l.last_visit_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  e(g, {
                    label: o(a)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: r(({ row: l }) => [
                      b("div", Qe, [
                        e(i, {
                          type: "primary",
                          link: "",
                          onClick: (w) => se(l)
                        }, {
                          default: r(() => [
                            d(m(o(a)("detail")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        e(i, {
                          type: "primary",
                          link: "",
                          onClick: (w) => ne(l)
                        }, {
                          default: r(() => [
                            d(m(o(a)("setLabel")), 1)
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
                [we, n.loading]
              ]),
              b("div", We, [
                e(ge, {
                  "current-page": n.page,
                  "onUpdate:currentPage": t[7] || (t[7] = (l) => n.page = l),
                  "page-size": n.limit,
                  "onUpdate:pageSize": t[8] || (t[8] = (l) => n.limit = l),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: n.total,
                  onSizeChange: t[9] || (t[9] = (l) => x()),
                  onCurrentChange: x
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            e(Ee, {
              ref_key: "addMemberDialog",
              ref: R,
              onComplete: t[10] || (t[10] = (l) => x())
            }, null, 512),
            e(ze, {
              ref_key: "editMemberDialog",
              ref: D,
              onComplete: t[11] || (t[11] = (l) => oe())
            }, null, 512),
            e(he, {
              ref_key: "exportSureDialog",
              ref: ie,
              show: N.value,
              type: "member",
              searchParam: n.searchParam,
              onClose: ue
            }, null, 8, ["show", "searchParam"]),
            e(Ne, {
              ref_key: "detailMemberDialog",
              ref: E,
              onLoad: t[12] || (t[12] = (l) => x())
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  vl as default
};
