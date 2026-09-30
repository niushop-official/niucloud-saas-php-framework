import { defineComponent as se, computed as N, ref as f, reactive as $, resolveComponent as g, resolveDirective as pe, openBlock as d, createElementBlock as y, Fragment as E, createElementVNode as u, normalizeStyle as re, unref as l, createVNode as i, withCtx as n, renderList as ce, toDisplayString as r, createTextVNode as m, withDirectives as F, createBlock as h, createCommentVNode as v, pushScopeId as de, popScopeId as me } from "vue";
import { useRoute as ue, useRouter as _e } from "vue-router";
import { ak as ge, t as o, fj as fe, fk as ve, fl as be, an as ye, fm as he, fn as ke, fo as xe, a as Ce } from "./core-shared-c6ad4e77.js";
import Te from "./index-c14157f3.js";
import Ve from "./index-559a9b12.js";
import Re from "./index-997caa57.js";
import Se from "./index-e3370990.js";
import { u as we } from "./useTablePageHeight-33d60cf6.js";
import { ElMessageBox as G, ElMessage as L } from "element-plus";
import De from "./index-2fe2c142.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ze = (x) => (de("data-v-396686b2"), x = x(), me(), x), Pe = { class: "table-fill-page__card" }, Ue = { class: "table-panel mt-[20px] table-fill-page__panel" }, We = { class: "table-fill-page__table" }, Be = { key: 0 }, Ie = {
  key: 0,
  class: "text-error"
}, Ne = /* @__PURE__ */ ze(() => /* @__PURE__ */ u("div", null, "--", -1)), $e = {
  key: 0,
  class: "text-error flex items-center"
}, Ee = { class: "mt-[16px] flex justify-end" }, Fe = { class: "min-h-[150px]" }, Ge = { class: "dialog-footer" }, Le = /* @__PURE__ */ se({
  __name: "weapp_version",
  setup(x) {
    const C = ge(), j = ue(), je = _e(), A = j.meta.title, { pageRef: M, pageStyle: H } = we(), Q = N(
      () => String(o("updateTips")).split(`
`).map((a) => a.trim()).filter(Boolean)
    ), q = (a) => [
      { label: o("weappVersionUpdate"), loading: T.value == a.group_id, onClick: () => W(a.group_id) },
      { label: o("weappVersionUpdateRecord"), onClick: () => te(a.group_id) },
      { label: o("siteWeappSync"), onClick: () => ae(a.group_id) }
    ], T = f(0), J = f({}), S = f(!1), s = $({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        site_group_id: ""
      }
    }), p = $({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {}
    }), U = f(""), w = f(!1), K = (a) => {
      U.value = a.fail_reason, w.value = !0;
    }, O = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html");
    }, X = (a) => {
      G.confirm(
        o("delWeappVersionTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning"
        }
      ).then(() => {
        ve(a.id).then(() => {
          k();
        });
      });
    };
    fe().then(({ data: a }) => {
      J.value = a;
    });
    const b = f(!1), V = f(""), Y = N(() => ({ site_group_id: V.value })), D = (a) => a.status == 1 && (!a.template_id || a.template_id == "0"), Z = (a) => {
      be(a.id).then(() => {
        k();
      });
    }, W = (a = "") => {
      b.value || (V.value = a, b.value = !0);
    }, ee = () => {
      b.value = !1;
      const a = V.value;
      V.value = "", T.value = a || 0, C.openPendingDetail("weapp_commit", "正在发起同步"), ye("weapp_commit", { site_group_id: a }).then((t) => {
        var c;
        T.value = 0;
        const _ = (c = t == null ? void 0 : t.data) == null ? void 0 : c.task_key;
        if (!_) {
          C.closePendingDetail(), L.error("同步任务创建失败");
          return;
        }
        C.openDetail(_, "weapp_commit");
      }).catch((t) => {
        T.value = 0, C.closePendingDetail(), L({ message: (t == null ? void 0 : t.msg) || (t == null ? void 0 : t.message) || "同步任务创建失败", type: "error" });
      });
    }, k = (a = 1) => {
      s.loading = !0, s.page = a, he({
        page: s.page,
        limit: s.limit,
        site_group_id: s.searchParam.site_group_id
      }).then((t) => {
        s.loading = !1, s.data = t.data.data, s.total = t.data.total;
      }).catch(() => {
        s.loading = !1;
      });
    }, z = (a = 1) => {
      p.loading = !0, p.page = a, ke({
        page: p.page,
        limit: p.limit
      }).then((t) => {
        p.loading = !1, p.data = t.data.data, p.total = t.data.total;
      }).catch(() => {
        p.loading = !1;
      });
    };
    z();
    const te = (a) => {
      s.searchParam.site_group_id = a, k(), S.value = !0;
    }, ae = (a) => {
      G.confirm(
        o("syncSiteWeappTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning"
        }
      ).then(() => {
        xe({ site_group_id: a });
      });
    };
    return (a, t) => {
      const _ = g("el-button"), c = g("el-table-column"), B = g("el-table"), oe = g("Warning"), le = g("el-icon"), ne = g("el-pagination"), P = g("el-dialog"), ie = g("el-scrollbar"), I = pe("loading");
      return d(), y(E, null, [
        u("div", {
          ref_key: "pageRef",
          ref: M,
          class: "main-container table-fill-page",
          style: re(l(H))
        }, [
          u("div", Pe, [
            i(Se, { closable: "" }, {
              default: n(() => [
                (d(!0), y(E, null, ce(l(Q), (e, R) => (d(), y("p", { key: R }, r(e), 1))), 128))
              ]),
              _: 1
            }),
            u("div", Ue, [
              i(Re, {
                title: l(A),
                selectable: !1
              }, {
                actions: n(() => [
                  i(_, {
                    type: "primary",
                    onClick: t[0] || (t[0] = (e) => W())
                  }, {
                    default: n(() => [
                      m(r(l(o)("oneClickSync")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["title"]),
              u("div", We, [
                F((d(), h(B, {
                  height: "100%",
                  data: p.data,
                  size: "large"
                }, {
                  empty: n(() => [
                    u("span", null, r(p.loading ? "" : l(o)("emptyData")), 1)
                  ]),
                  default: n(() => [
                    i(c, {
                      prop: "group_name",
                      label: l(o)("groupName")
                    }, null, 8, ["label"]),
                    i(c, {
                      label: l(o)("userVersion"),
                      "show-overflow-tooltip": !0
                    }, {
                      default: n(({ row: e }) => [
                        m(r(e.commit_record.user_version || "--"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    i(c, {
                      prop: "create_time",
                      label: l(o)("createTime")
                    }, {
                      default: n(({ row: e }) => [
                        m(r(e.commit_record.create_time || "--"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    i(c, {
                      prop: "create_time",
                      label: l(o)("status")
                    }, {
                      default: n(({ row: e }) => [
                        e.commit_record.user_version ? (d(), y("div", Be, [
                          m(r(e.commit_record.status_name) + " ", 1),
                          e.commit_record.status == 1 && e.commit_record.template_id == "0" ? (d(), y("div", Ie, r(l(o)("syncTemplateError")), 1)) : v("", !0)
                        ])) : v("", !0),
                        Ne
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    i(c, {
                      prop: "create_time",
                      label: l(o)("templateID")
                    }, {
                      default: n(({ row: e }) => [
                        m(r(e.commit_record.template_id || "--"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    i(c, {
                      label: l(o)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "360"
                    }, {
                      default: n(({ row: e }) => [
                        i(Te, {
                          actions: q(e)
                        }, null, 8, ["actions"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [I, p.loading]
                ])
              ])
            ]),
            i(Ve, {
              "current-page": p.page,
              "onUpdate:current-page": t[1] || (t[1] = (e) => p.page = e),
              "page-size": p.limit,
              "onUpdate:page-size": t[2] || (t[2] = (e) => p.limit = e),
              total: p.total,
              onSizeChange: t[3] || (t[3] = (e) => z()),
              onCurrentChange: z
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ], 4),
        i(P, {
          modelValue: S.value,
          "onUpdate:modelValue": t[7] || (t[7] = (e) => S.value = e),
          title: l(o)("weappVersionUpdateRecord"),
          width: "1000px",
          "destroy-on-close": !0
        }, {
          default: n(() => [
            F((d(), h(B, {
              data: s.data,
              size: "large"
            }, {
              empty: n(() => [
                u("span", null, r(s.loading ? "" : l(o)("emptyData")), 1)
              ]),
              default: n(() => [
                i(c, {
                  prop: "user_version",
                  label: l(o)("userVersion")
                }, null, 8, ["label"]),
                i(c, {
                  label: l(o)("status"),
                  prop: "status_name"
                }, {
                  default: n(({ row: e }) => [
                    u("div", null, r(e.status_name), 1),
                    D(e) ? (d(), y("div", $e, [
                      i(le, { class: "mr-[2px]" }, {
                        default: n(() => [
                          i(oe)
                        ]),
                        _: 1
                      }),
                      m(" 尚未同步到模板库 ")
                    ])) : v("", !0)
                  ]),
                  _: 1
                }, 8, ["label"]),
                i(c, {
                  prop: "create_time",
                  label: l(o)("createTime")
                }, null, 8, ["label"]),
                i(c, {
                  label: l(o)("operation"),
                  align: "right",
                  fixed: "right",
                  width: "220"
                }, {
                  default: n(({ row: e }) => [
                    D(e) ? (d(), h(_, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (R) => Z(e)
                    }, {
                      default: n(() => [
                        m("同步模板库")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : v("", !0),
                    e.status == 0 || e.status == -1 || D(e) ? (d(), h(_, {
                      key: 1,
                      type: "primary",
                      link: "",
                      onClick: (R) => X(e)
                    }, {
                      default: n(() => [
                        m(r(l(o)("delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : v("", !0),
                    e.status == -1 ? (d(), h(_, {
                      key: 2,
                      type: "primary",
                      link: "",
                      onClick: (R) => K(e)
                    }, {
                      default: n(() => [
                        m(r(l(o)("failReason")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : v("", !0)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [I, s.loading]
            ]),
            u("div", Ee, [
              i(ne, {
                "current-page": s.page,
                "onUpdate:current-page": t[4] || (t[4] = (e) => s.page = e),
                "page-size": s.limit,
                "onUpdate:page-size": t[5] || (t[5] = (e) => s.limit = e),
                layout: "total, sizes, prev, pager, next, jumper",
                total: s.total,
                onSizeChange: t[6] || (t[6] = (e) => k()),
                onCurrentChange: k
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        i(P, {
          modelValue: b.value,
          "onUpdate:modelValue": t[8] || (t[8] = (e) => b.value = e),
          title: "同步前校验",
          width: "580px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "destroy-on-close": !0
        }, {
          default: n(() => [
            u("div", Fe, [
              b.value ? (d(), h(De, {
                key: 0,
                scene: "weapp_commit",
                params: l(Y),
                "auto-next": !0,
                "auto-next-delay": 500,
                "show-prev": !1,
                "next-text": l(o)("nextStep"),
                onNext: ee
              }, null, 8, ["params", "next-text"])) : v("", !0)
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        i(P, {
          modelValue: w.value,
          "onUpdate:modelValue": t[10] || (t[10] = (e) => w.value = e),
          title: l(o)("failReason"),
          width: "60%"
        }, {
          footer: n(() => [
            u("span", Ge, [
              i(_, {
                type: "primary",
                onClick: O
              }, {
                default: n(() => [
                  m(r(l(o)("helpInfo")), 1)
                ]),
                _: 1
              }),
              i(_, {
                onClick: t[9] || (t[9] = (e) => a.failReasonDialogVisible = !1)
              }, {
                default: n(() => [
                  m(r(l(o)("close")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: n(() => [
            i(ie, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
              default: n(() => [
                m(r(U.value), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
const ot = /* @__PURE__ */ Ce(Le, [["__scopeId", "data-v-396686b2"]]);
export {
  ot as default
};
