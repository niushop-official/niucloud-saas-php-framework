import { defineComponent as le, ref as m, reactive as oe, resolveComponent as p, resolveDirective as ne, openBlock as h, createElementBlock as M, Fragment as ie, createElementVNode as r, createVNode as o, withCtx as s, toDisplayString as d, unref as n, createTextVNode as g, withDirectives as se, createBlock as k, createCommentVNode as x, pushScopeId as re, popScopeId as de } from "vue";
import { t as e, T as ce, U as pe, V as ue, W as me, i as _e, X as fe, _ as ge } from "./core-shared-11c0a673.js";
import { ElMessageBox as T } from "element-plus";
import he from "./app-version-edit-6872d057.js";
import { useRoute as ve, useRouter as be } from "vue-router";
import { T as we, _ as ke } from "./dark-3dd028d8.js";
import { g as xe } from "./module-ef8dc18a.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./generate-sing-cert-eeec2ca6.js";
const ye = (y) => (re("data-v-45b95e0f"), y = y(), de(), y), Ce = { class: "main-container" }, Ve = { class: "flex justify-between items-center" }, Te = { class: "text-lg" }, Be = /* @__PURE__ */ ye(() => /* @__PURE__ */ r("div", { class: "flex items-center" }, [
  /* @__PURE__ */ r("div", null, [
    /* @__PURE__ */ r("p", null, "使用云打包提交成功后请先不要离开该页面稍待几分钟等待打包结果的返回")
  ])
], -1)), De = { class: "mt-[20px]" }, Fe = { class: "mt-[10px]" }, Ee = { key: 0 }, Ie = { class: "mt-[16px] flex justify-end" }, Le = ["innerHTML"], Re = { class: "h-[370px]" }, $e = /* @__PURE__ */ le({
  __name: "version",
  setup(y) {
    const U = ve(), E = be(), S = U.meta.title, B = m("/channel/app/version"), b = m(null), i = oe({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        platfrom: ""
      }
    }), v = m(!1), D = m(!0), I = m("");
    xe().then((t) => {
      t.data.data && t.data.data.auth_code && (I.value = t.data.data.auth_code), D.value = !1;
    }).catch(() => {
      D.value = !1;
    });
    const P = (t) => {
      E.push({ path: B.value });
    }, Ae = m(), _ = (t = 1) => {
      i.loading = !0, i.page = t, ce({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((l) => {
        i.loading = !1, i.data = l.data.data, i.total = l.data.total, t == 1 && i.data.length && i.data[0].status == "creating" && L(i.data[0].task_key);
      }).catch(() => {
        i.loading = !1;
      });
    };
    _();
    const w = m(null), j = () => {
      if (!I.value) {
        Q();
        return;
      }
      w.value.setFormData(), w.value.showDialog = !0;
    }, H = (t) => {
      w.value.setFormData(t), w.value.showDialog = !0;
    }, W = (t) => {
      T.confirm(
        e("appVersionDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        pe({ id: t }).then(() => {
          _();
        }).catch(() => {
        });
      });
    }, X = (t) => {
      T.confirm(
        e("appVersionReleaseTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        ue(t.id).then(() => {
          _();
        }).catch(() => {
        });
      });
    };
    let C = [];
    const L = (t) => {
      me(t).then((l) => {
        l.data && (l.data.status == "" ? (v.value && (C.length || (b.value.execute("clear"), b.value.execute("开始打包")), l.data.build_log.data[0].forEach((f) => {
          C.includes(f.action) || (b.value.pushMessage({ content: `${f.action}` }), C.push(f.action));
        })), setTimeout(() => {
          L(t);
        }, 2e3)) : (l.data.status == "fail" && v.value ? b.value.pushMessage({ content: l.data.fail_reason, class: "error" }) : v.value = !1, _(), C = []));
      });
    }, q = () => {
      v.value = !0;
    };
    let G = null;
    const R = new we(), J = (t, l, f, A, N) => {
      if (l == "开始打包") {
        f(R);
        const u = K(["/", "——", "\\", "|"]);
        G = setInterval(() => {
          R.flush("> " + u.next().value);
        }, 150);
      }
    }, K = (t) => {
      let l = 0;
      return {
        next() {
          return l + 1 == t.length && (l = 0), { value: t[l++] };
        }
      };
    }, $ = m(""), F = m(!1), Ne = (t) => {
      $.value = t.fail_reason, F.value = !0;
    }, O = (t) => {
      window.open(_e(t.package_path), "_blank");
    }, ze = (t) => {
      t && (t.resetFields(), _());
    }, Q = () => {
      fe() == "admin" ? T.confirm(
        e("authTips"),
        e("warning"),
        {
          distinguishCancelAndClose: !0,
          confirmButtonText: e("toBind"),
          cancelButtonText: e("toNiucloud")
        }
      ).then(() => {
        E.push({ path: "/app/authorize" });
      }).catch((t) => {
        t === "cancel" && window.open("https://www.niucloud.com/app");
      }) : T.alert(e("siteAuthTips"), e("warning"));
    };
    return (t, l) => {
      const f = p("el-tab-pane"), A = p("el-tabs"), N = p("el-alert"), u = p("el-button"), c = p("el-table-column"), Y = p("el-table"), Z = p("el-pagination"), ee = p("el-card"), te = p("el-scrollbar"), z = p("el-dialog"), ae = ne("loading");
      return h(), M(ie, null, [
        r("div", Ce, [
          o(ee, {
            class: "box-card !border-none",
            shadow: "never"
          }, {
            default: s(() => [
              r("div", Ve, [
                r("span", Te, d(n(S)), 1)
              ]),
              o(A, {
                modelValue: B.value,
                "onUpdate:modelValue": l[0] || (l[0] = (a) => B.value = a),
                class: "my-[20px]",
                onTabChange: P
              }, {
                default: s(() => [
                  o(f, {
                    label: n(e)("accessFlow"),
                    name: "/channel/app"
                  }, null, 8, ["label"]),
                  o(f, {
                    label: n(e)("versionManage"),
                    name: "/channel/app/version"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              o(N, { type: "info" }, {
                default: s(() => [
                  Be
                ]),
                _: 1
              }),
              r("div", De, [
                o(u, {
                  type: "primary",
                  onClick: j,
                  disabled: D.value
                }, {
                  default: s(() => [
                    g(d(n(e)("addAppVersion")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              r("div", Fe, [
                se((h(), k(Y, {
                  data: i.data,
                  size: "large"
                }, {
                  empty: s(() => [
                    r("span", null, d(i.loading ? "" : n(e)("emptyData")), 1)
                  ]),
                  default: s(() => [
                    o(c, {
                      type: "index",
                      width: "90",
                      label: n(e)("index")
                    }, null, 8, ["label"]),
                    o(c, {
                      prop: "version_code",
                      label: n(e)("versionCode"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(c, {
                      prop: "version_name",
                      label: n(e)("versionName"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(c, {
                      prop: "version_desc",
                      label: n(e)("versionDesc"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(c, {
                      prop: "platform_name",
                      label: n(e)("platform"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(c, {
                      prop: "status_name",
                      label: n(e)("status"),
                      "min-width": "120",
                      align: "center",
                      "show-overflow-tooltip": !0
                    }, {
                      default: s(({ row: a }) => [
                        o(u, {
                          link: "",
                          loading: a.status == "creating"
                        }, {
                          default: s(() => [
                            g(d(a.status_name), 1)
                          ]),
                          _: 2
                        }, 1032, ["loading"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(c, {
                      prop: "status",
                      label: n(e)("isForcedUpgradeTitle"),
                      "min-width": "120",
                      align: "center",
                      "show-overflow-tooltip": !0
                    }, {
                      default: s(({ row: a }) => [
                        g(d(a.is_forced_upgrade ? "是" : "否"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(c, {
                      prop: "package_path",
                      label: n(e)("packagePath"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, null, 8, ["label"]),
                    o(c, {
                      label: n(e)("releaseTime"),
                      "min-width": "120",
                      "show-overflow-tooltip": !0
                    }, {
                      default: s(({ row: a }) => [
                        a.release_time != 0 ? (h(), M("text", Ee, d(a.release_time), 1)) : x("", !0)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(c, {
                      label: n(e)("operation"),
                      fixed: "right",
                      align: "right",
                      "min-width": "200px"
                    }, {
                      default: s(({ row: a }) => [
                        a.release_time == 0 ? (h(), k(u, {
                          key: 0,
                          type: "primary",
                          link: "",
                          onClick: (V) => H(a)
                        }, {
                          default: s(() => [
                            g(d(n(e)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        a.status == "upload_success" ? (h(), k(u, {
                          key: 1,
                          type: "primary",
                          link: "",
                          onClick: (V) => X(a)
                        }, {
                          default: s(() => [
                            g(d(n(e)("release")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        a.status == "creating" ? (h(), k(u, {
                          key: 2,
                          type: "primary",
                          link: "",
                          onClick: (V) => q(a)
                        }, {
                          default: s(() => [
                            g(d(n(e)("seeBuildLog")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        a.package_path && a.upgrade_type != "market" ? (h(), k(u, {
                          key: 3,
                          type: "primary",
                          link: "",
                          onClick: (V) => O(a)
                        }, {
                          default: s(() => [
                            g(d(n(e)("download")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : x("", !0),
                        o(u, {
                          type: "primary",
                          link: "",
                          onClick: (V) => W(a.id)
                        }, {
                          default: s(() => [
                            g(d(n(e)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [ae, i.loading]
                ]),
                r("div", Ie, [
                  o(Z, {
                    "current-page": i.page,
                    "onUpdate:currentPage": l[1] || (l[1] = (a) => i.page = a),
                    "page-size": i.limit,
                    "onUpdate:pageSize": l[2] || (l[2] = (a) => i.limit = a),
                    layout: "total, sizes, prev, pager, next, jumper",
                    total: i.total,
                    onSizeChange: l[3] || (l[3] = (a) => _()),
                    onCurrentChange: _
                  }, null, 8, ["current-page", "page-size", "total"])
                ])
              ]),
              o(he, {
                ref_key: "editAppVersionDialog",
                ref: w,
                onComplete: _
              }, null, 512)
            ]),
            _: 1
          }),
          o(z, {
            modelValue: F.value,
            "onUpdate:modelValue": l[4] || (l[4] = (a) => F.value = a),
            title: n(e)("failReason"),
            width: "60%"
          }, {
            default: s(() => [
              o(te, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
                default: s(() => [
                  r("div", { innerHTML: $.value }, null, 8, Le)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ]),
        o(z, {
          modelValue: v.value,
          "onUpdate:modelValue": l[5] || (l[5] = (a) => v.value = a),
          title: n(e)("buildLog"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "before-close": t.dialogClose
        }, {
          default: s(() => [
            r("div", Re, [
              o(n(ke), {
                ref_key: "terminalRef",
                ref: b,
                name: `upgrade-${t.terminalId}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: J
              }, null, 8, ["name"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "before-close"])
      ], 64);
    };
  }
});
const Oe = /* @__PURE__ */ ge($e, [["__scopeId", "data-v-45b95e0f"]]);
export {
  Oe as default
};
