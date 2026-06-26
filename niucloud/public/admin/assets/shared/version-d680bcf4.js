import { defineComponent as ae, ref as m, reactive as le, resolveComponent as c, resolveDirective as oe, openBlock as h, createElementBlock as z, Fragment as ne, createElementVNode as r, createVNode as o, withCtx as s, toDisplayString as d, unref as n, createTextVNode as f, withDirectives as ie, createBlock as k, createCommentVNode as x, pushScopeId as se, popScopeId as re } from "vue";
import { t as e, S as de, T as pe, U as ce, V as ue, i as me, W as _e, _ as fe } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as T } from "element-plus";
import { _ as ge } from "./app-version-edit.vue_vue_type_style_index_0_lang-f4247edd.js";
import { useRoute as he, useRouter as ve } from "vue-router";
import { T as be, _ as we } from "./dark-eb307d84.js";
import { g as ke } from "./module-15a2966b.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./generate-sing-cert.vue_vue_type_script_setup_true_lang-21678683.js";
const xe = (y) => (se("data-v-45b95e0f"), y = y(), re(), y), ye = { class: "main-container" }, Ce = { class: "flex justify-between items-center" }, Ve = { class: "text-lg" }, Te = /* @__PURE__ */ xe(() => /* @__PURE__ */ r("div", { class: "flex items-center" }, [
  /* @__PURE__ */ r("div", null, [
    /* @__PURE__ */ r("p", null, "使用云打包提交成功后请先不要离开该页面稍待几分钟等待打包结果的返回")
  ])
], -1)), Be = { class: "mt-[20px]" }, De = { class: "mt-[10px]" }, Ee = { key: 0 }, Le = { class: "mt-[16px] flex justify-end" }, $e = ["innerHTML"], Ae = { class: "h-[370px]" }, Ie = /* @__PURE__ */ ae({
  __name: "version",
  setup(y) {
    const M = he(), E = ve(), S = M.meta.title, B = m("/channel/app/version"), b = m(null), i = le({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        platfrom: ""
      }
    }), v = m(!1), D = m(!0), L = m("");
    ke().then((a) => {
      a.data.data && a.data.data.auth_code && (L.value = a.data.data.auth_code), D.value = !1;
    }).catch(() => {
      D.value = !1;
    });
    const U = (a) => {
      E.push({ path: B.value });
    };
    m();
    const g = (a = 1) => {
      i.loading = !0, i.page = a, de({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((l) => {
        i.loading = !1, i.data = l.data.data, i.total = l.data.total, a == 1 && i.data.length && i.data[0].status == "creating" && $(i.data[0].task_key);
      }).catch(() => {
        i.loading = !1;
      });
    };
    g();
    const w = m(null), P = () => {
      if (!L.value) {
        Q();
        return;
      }
      w.value.setFormData(), w.value.showDialog = !0;
    }, j = (a) => {
      w.value.setFormData(a), w.value.showDialog = !0;
    }, H = (a) => {
      T.confirm(
        e("appVersionDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        pe({ id: a }).then(() => {
          g();
        }).catch(() => {
        });
      });
    }, W = (a) => {
      T.confirm(
        e("appVersionReleaseTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        ce(a.id).then(() => {
          g();
        }).catch(() => {
        });
      });
    };
    let C = [];
    const $ = (a) => {
      ue(a).then((l) => {
        l.data && (l.data.status == "" ? (v.value && (C.length || (b.value.execute("clear"), b.value.execute("开始打包")), l.data.build_log.data[0].forEach((_) => {
          C.includes(_.action) || (b.value.pushMessage({ content: `${_.action}` }), C.push(_.action));
        })), setTimeout(() => {
          $(a);
        }, 2e3)) : (l.data.status == "fail" && v.value ? b.value.pushMessage({ content: l.data.fail_reason, class: "error" }) : v.value = !1, g(), C = []));
      });
    }, q = () => {
      v.value = !0;
    }, A = new be(), G = (a, l, _, F, N) => {
      if (l == "开始打包") {
        _(A);
        const u = J(["/", "——", "\\", "|"]);
        setInterval(() => {
          A.flush("> " + u.next().value);
        }, 150);
      }
    }, J = (a) => {
      let l = 0;
      return {
        next() {
          return l + 1 == a.length && (l = 0), { value: a[l++] };
        }
      };
    }, K = m(""), I = m(!1), O = (a) => {
      window.open(me(a.package_path), "_blank");
    }, Q = () => {
      _e() == "admin" ? T.confirm(
        e("authTips"),
        e("warning"),
        {
          distinguishCancelAndClose: !0,
          confirmButtonText: e("toBind"),
          cancelButtonText: e("toNiucloud")
        }
      ).then(() => {
        E.push({ path: "/app/authorize" });
      }).catch((a) => {
        a === "cancel" && window.open("https://www.niucloud.com/app");
      }) : T.alert(e("siteAuthTips"), e("warning"));
    };
    return (a, l) => {
      const _ = c("el-tab-pane"), F = c("el-tabs"), N = c("el-alert"), u = c("el-button"), p = c("el-table-column"), X = c("el-table"), Y = c("el-pagination"), Z = c("el-card"), ee = c("el-scrollbar"), R = c("el-dialog"), te = oe("loading");
      return h(), z(ne, null, [
        r("div", ye, [
          o(Z, {
            class: "box-card !border-none",
            shadow: "never"
          }, {
            default: s(() => [
              r("div", Ce, [
                r("span", Ve, d(n(S)), 1)
              ]),
              o(F, {
                modelValue: B.value,
                "onUpdate:modelValue": l[0] || (l[0] = (t) => B.value = t),
                class: "my-[20px]",
                onTabChange: U
              }, {
                default: s(() => [
                  o(_, {
                    label: n(e)("accessFlow"),
                    name: "/channel/app"
                  }, null, 8, ["label"]),
                  o(_, {
                    label: n(e)("versionManage"),
                    name: "/channel/app/version"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              o(N, { type: "info" }, {
                default: s(() => [
                  Te
                ]),
                _: 1
              }),
              r("div", Be, [
                o(u, {
                  type: "primary",
                  onClick: P,
                  disabled: D.value
                }, {
                  default: s(() => [
                    f(d(n(e)("addAppVersion")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              r("div", De, [
                ie((h(), k(X, {
                  data: i.data,
                  size: "large"
                }, {
                  empty: s(() => [
                    r("span", null, d(i.loading ? "" : n(e)("emptyData")), 1)
                  ]),
                  default: s(() => [
                    o(p, {
                      type: "index",
                      width: "90",
                      label: n(e)("index")
                    }, null, 8, ["label"]),
                    o(p, {
                      prop: "version_code",
                      label: n(e)("versionCode"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(p, {
                      prop: "version_name",
                      label: n(e)("versionName"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(p, {
                      prop: "version_desc",
                      label: n(e)("versionDesc"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(p, {
                      prop: "platform_name",
                      label: n(e)("platform"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(p, {
                      prop: "status_name",
                      label: n(e)("status"),
                      "min-width": "120",
                      align: "center",
                      "show-overflow-tooltip": !0
                    }, {
                      default: s(({ row: t }) => [
                        o(u, {
                          link: "",
                          loading: t.status == "creating"
                        }, {
                          default: s(() => [
                            f(d(t.status_name), 1)
                          ]),
                          _: 2
                        }, 1032, ["loading"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(p, {
                      prop: "status",
                      label: n(e)("isForcedUpgradeTitle"),
                      "min-width": "120",
                      align: "center",
                      "show-overflow-tooltip": !0
                    }, {
                      default: s(({ row: t }) => [
                        f(d(t.is_forced_upgrade ? "是" : "否"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(p, {
                      prop: "package_path",
                      label: n(e)("packagePath"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(p, {
                      label: n(e)("releaseTime"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, {
                      default: s(({ row: t }) => [
                        t.release_time != 0 ? (h(), z("text", Ee, d(t.release_time), 1)) : x("", !0)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(p, {
                      label: n(e)("operation"),
                      fixed: "right",
                      align: "right",
                      "min-width": "200px"
                    }, {
                      default: s(({ row: t }) => [
                        t.release_time == 0 ? (h(), k(u, {
                          key: 0,
                          type: "primary",
                          link: "",
                          onClick: (V) => j(t)
                        }, {
                          default: s(() => [
                            f(d(n(e)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        t.status == "upload_success" ? (h(), k(u, {
                          key: 1,
                          type: "primary",
                          link: "",
                          onClick: (V) => W(t)
                        }, {
                          default: s(() => [
                            f(d(n(e)("release")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        t.status == "creating" ? (h(), k(u, {
                          key: 2,
                          type: "primary",
                          link: "",
                          onClick: (V) => q()
                        }, {
                          default: s(() => [
                            f(d(n(e)("seeBuildLog")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        t.package_path && t.upgrade_type != "market" ? (h(), k(u, {
                          key: 3,
                          type: "primary",
                          link: "",
                          onClick: (V) => O(t)
                        }, {
                          default: s(() => [
                            f(d(n(e)("download")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        o(u, {
                          type: "primary",
                          link: "",
                          onClick: (V) => H(t.id)
                        }, {
                          default: s(() => [
                            f(d(n(e)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [te, i.loading]
                ]),
                r("div", Le, [
                  o(Y, {
                    "current-page": i.page,
                    "onUpdate:currentPage": l[1] || (l[1] = (t) => i.page = t),
                    "page-size": i.limit,
                    "onUpdate:pageSize": l[2] || (l[2] = (t) => i.limit = t),
                    layout: "total, sizes, prev, pager, next, jumper",
                    total: i.total,
                    onSizeChange: l[3] || (l[3] = (t) => g()),
                    onCurrentChange: g
                  }, null, 8, ["current-page", "page-size", "total"])
                ])
              ]),
              o(ge, {
                ref_key: "editAppVersionDialog",
                ref: w,
                onComplete: g
              }, null, 512)
            ]),
            _: 1
          }),
          o(R, {
            modelValue: I.value,
            "onUpdate:modelValue": l[4] || (l[4] = (t) => I.value = t),
            title: n(e)("failReason"),
            width: "60%"
          }, {
            default: s(() => [
              o(ee, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
                default: s(() => [
                  r("div", { innerHTML: K.value }, null, 8, $e)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        o(R, {
          modelValue: v.value,
          "onUpdate:modelValue": l[5] || (l[5] = (t) => v.value = t),
          title: n(e)("buildLog"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "before-close": a.dialogClose
        }, {
          default: s(() => [
            r("div", Ae, [
              o(n(we), {
                ref_key: "terminalRef",
                ref: b,
                name: `upgrade-${a.terminalId}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: G
              }, null, 8, ["name"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "before-close"])
      ], 64);
    };
  }
});
const Ge = /* @__PURE__ */ fe(Ie, [["__scopeId", "data-v-45b95e0f"]]);
export {
  Ge as default
};
