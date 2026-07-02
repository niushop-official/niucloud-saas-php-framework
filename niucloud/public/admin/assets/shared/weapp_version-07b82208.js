import { defineComponent as M, ref as v, reactive as B, resolveComponent as _, resolveDirective as O, openBlock as g, createElementBlock as V, Fragment as q, createElementVNode as c, createVNode as l, withCtx as i, createTextVNode as d, toDisplayString as p, unref as o, withDirectives as W, createBlock as C, createCommentVNode as x, pushScopeId as H, popScopeId as J } from "vue";
import { useRoute as K } from "vue-router";
import { eO as X, t, eP as Y, eQ as Z, eR as ee, eS as te, eT as ae, _ as oe } from "./core-shared-ae4a556b.js";
import { ElMessageBox as P } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const le = (y) => (H("data-v-6a40fdcc"), y = y(), J(), y), ie = { class: "main-container" }, ne = { class: "flex justify-between items-center" }, re = { class: "mt-[20px]" }, se = { class: "mt-[20px]" }, pe = { key: 0 }, de = {
  key: 0,
  class: "text-error"
}, ce = /* @__PURE__ */ le(() => /* @__PURE__ */ c("div", null, "--", -1)), me = { class: "flex flex-col items-end" }, ue = { class: "mt-[16px] flex justify-end" }, _e = { class: "mt-[16px] flex justify-end" }, ge = { class: "dialog-footer" }, fe = /* @__PURE__ */ M({
  __name: "weapp_version",
  setup(y) {
    const ye = K().meta.title, f = v(0), I = v({}), k = v(!1), n = B({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        site_group_id: ""
      }
    }), s = B({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {}
    }), S = v(""), w = v(!1), N = (r) => {
      S.value = r.fail_reason, w.value = !0;
    }, j = () => {
      window.open("https://doc.press.niucloud.com/php/saas-framework/use/configFAQ/minWaChatUpload.html");
    }, E = (r) => {
      P.confirm(
        t("delWeappVersionTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        Y(r.id).then(() => {
          h();
        });
      });
    };
    X().then(({ data: r }) => {
      I.value = r;
    });
    const T = (r = "") => {
      f.value == 0 && (f.value = r, Z({ site_group_id: r }).then(() => {
        f.value = 0;
      }).catch(() => {
        f.value = 0;
      }));
    }, h = (r = 1) => {
      n.loading = !0, n.page = r, ee({
        page: n.page,
        limit: n.limit,
        site_group_id: n.searchParam.site_group_id
      }).then((a) => {
        n.loading = !1, n.data = a.data.data, n.total = a.data.total;
      }).catch(() => {
        n.loading = !1;
      });
    }, R = (r = 1) => {
      s.loading = !0, s.page = r, te({
        page: s.page,
        limit: s.limit
      }).then((a) => {
        s.loading = !1, s.data = a.data.data, s.total = a.data.total;
      }).catch(() => {
        s.loading = !1;
      });
    };
    R();
    const F = (r) => {
      n.searchParam.site_group_id = r, h(), k.value = !0;
    }, G = (r) => {
      P.confirm(
        t("syncSiteWeappTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        ae({ site_group_id: r });
      });
    };
    return (r, a) => {
      const u = _("el-button"), L = _("el-alert"), m = _("el-table-column"), D = _("el-table"), z = _("el-pagination"), Q = _("el-card"), U = _("el-dialog"), A = _("el-scrollbar"), $ = O("loading");
      return g(), V(q, null, [
        c("div", ie, [
          l(Q, {
            class: "box-card !border-none p-[20px]",
            shadow: "never"
          }, {
            default: i(() => [
              c("div", ne, [
                l(u, {
                  type: "primary",
                  class: "w-[100px]",
                  onClick: a[0] || (a[0] = (e) => T())
                }, {
                  default: i(() => [
                    d(p(o(t)("oneClickSync")), 1)
                  ]),
                  _: 1
                })
              ]),
              c("div", re, [
                l(L, {
                  title: o(t)("updateTips"),
                  type: "info",
                  "show-icon": ""
                }, null, 8, ["title"])
              ]),
              c("div", se, [
                W((g(), C(D, {
                  data: s.data,
                  size: "large"
                }, {
                  empty: i(() => [
                    c("span", null, p(s.loading ? "" : o(t)("emptyData")), 1)
                  ]),
                  default: i(() => [
                    l(m, {
                      prop: "group_name",
                      label: o(t)("groupName")
                    }, null, 8, ["label"]),
                    l(m, {
                      label: o(t)("userVersion"),
                      "show-overflow-tooltip": !0
                    }, {
                      default: i(({ row: e }) => [
                        d(p(e.commit_record.user_version || "--"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(m, {
                      prop: "create_time",
                      label: o(t)("createTime")
                    }, {
                      default: i(({ row: e }) => [
                        d(p(e.commit_record.create_time || "--"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(m, {
                      prop: "create_time",
                      label: o(t)("status")
                    }, {
                      default: i(({ row: e }) => [
                        e.commit_record.user_version ? (g(), V("div", pe, [
                          d(p(e.commit_record.status_name) + " ", 1),
                          e.commit_record.status == 1 && e.commit_record.template_id == "0" ? (g(), V("div", de, p(o(t)("syncTemplateError")), 1)) : x("", !0)
                        ])) : x("", !0),
                        ce
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(m, {
                      prop: "create_time",
                      label: o(t)("templateID")
                    }, {
                      default: i(({ row: e }) => [
                        d(p(e.commit_record.template_id || "--"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(m, {
                      label: o(t)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "330"
                    }, {
                      default: i(({ row: e }) => [
                        c("div", me, [
                          l(u, {
                            type: "primary",
                            link: "",
                            loading: f.value == e.group_id,
                            onClick: (b) => T(e.group_id)
                          }, {
                            default: i(() => [
                              d(p(o(t)("weappVersionUpdate")), 1)
                            ]),
                            _: 2
                          }, 1032, ["loading", "onClick"]),
                          l(u, {
                            type: "primary",
                            link: "",
                            onClick: (b) => F(e.group_id)
                          }, {
                            default: i(() => [
                              d(p(o(t)("weappVersionUpdateRecord")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          l(u, {
                            type: "primary",
                            link: "",
                            onClick: (b) => G(e.group_id)
                          }, {
                            default: i(() => [
                              d(p(o(t)("siteWeappSync")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [$, s.loading]
                ])
              ]),
              c("div", ue, [
                l(z, {
                  "current-page": s.page,
                  "onUpdate:currentPage": a[1] || (a[1] = (e) => s.page = e),
                  "page-size": s.limit,
                  "onUpdate:pageSize": a[2] || (a[2] = (e) => s.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: s.total,
                  onSizeChange: a[3] || (a[3] = (e) => R()),
                  onCurrentChange: R
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            _: 1
          })
        ]),
        l(U, {
          modelValue: k.value,
          "onUpdate:modelValue": a[7] || (a[7] = (e) => k.value = e),
          title: o(t)("weappVersionUpdateRecord"),
          width: "1000px",
          "destroy-on-close": !0
        }, {
          default: i(() => [
            W((g(), C(D, {
              data: n.data,
              size: "large"
            }, {
              empty: i(() => [
                c("span", null, p(n.loading ? "" : o(t)("emptyData")), 1)
              ]),
              default: i(() => [
                l(m, {
                  prop: "user_version",
                  label: o(t)("userVersion")
                }, null, 8, ["label"]),
                l(m, {
                  label: o(t)("status"),
                  prop: "status_name"
                }, null, 8, ["label"]),
                l(m, {
                  prop: "create_time",
                  label: o(t)("createTime")
                }, null, 8, ["label"]),
                l(m, {
                  label: o(t)("operation"),
                  align: "right",
                  fixed: "right",
                  width: "130"
                }, {
                  default: i(({ row: e }) => [
                    e.status == 0 || e.status == -1 ? (g(), C(u, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (b) => E(e)
                    }, {
                      default: i(() => [
                        d(p(o(t)("delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : x("", !0),
                    e.status == -1 ? (g(), C(u, {
                      key: 1,
                      type: "primary",
                      link: "",
                      onClick: (b) => N(e)
                    }, {
                      default: i(() => [
                        d(p(o(t)("failReason")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : x("", !0)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [$, n.loading]
            ]),
            c("div", _e, [
              l(z, {
                "current-page": n.page,
                "onUpdate:currentPage": a[4] || (a[4] = (e) => n.page = e),
                "page-size": n.limit,
                "onUpdate:pageSize": a[5] || (a[5] = (e) => n.limit = e),
                layout: "total, sizes, prev, pager, next, jumper",
                total: n.total,
                onSizeChange: a[6] || (a[6] = (e) => h()),
                onCurrentChange: h
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        l(U, {
          modelValue: w.value,
          "onUpdate:modelValue": a[9] || (a[9] = (e) => w.value = e),
          title: o(t)("failReason"),
          width: "60%"
        }, {
          footer: i(() => [
            c("span", ge, [
              l(u, {
                type: "primary",
                onClick: j
              }, {
                default: i(() => [
                  d(p(o(t)("helpInfo")), 1)
                ]),
                _: 1
              }),
              l(u, {
                onClick: a[8] || (a[8] = (e) => r.failReasonDialogVisible = !1)
              }, {
                default: i(() => [
                  d(p(o(t)("close")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            l(A, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
              default: i(() => [
                d(p(S.value), 1)
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
const Se = /* @__PURE__ */ oe(fe, [["__scopeId", "data-v-6a40fdcc"]]);
export {
  Se as default
};
