import { defineComponent as ne, ref as m, reactive as ie, resolveComponent as c, resolveDirective as se, openBlock as h, createElementBlock as M, Fragment as re, createElementVNode as r, normalizeStyle as pe, unref as o, createVNode as n, withCtx as s, toDisplayString as p, createTextVNode as g, withDirectives as de, createBlock as k, createCommentVNode as y, pushScopeId as ce, popScopeId as ue } from "vue";
import { a8 as me, t as e, _ as _e, a9 as fe, aa as ge, ab as he, ac as ve, j as be, ad as we, a as ke } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as T } from "element-plus";
import ye from "./app-version-edit-f7f6ef79.js";
import { useRoute as xe, useRouter as Ce } from "vue-router";
import { a as Ve } from "./module-f32436cf.js";
import { u as Te } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./generate-sing-cert-7f180e79.js";
const Be = (x) => (ce("data-v-4239a696"), x = x(), ue(), x), De = { class: "flex justify-between items-center" }, Fe = { class: "text-lg" }, Re = /* @__PURE__ */ Be(() => /* @__PURE__ */ r("div", { class: "flex items-center" }, [
  /* @__PURE__ */ r("div", null, [
    /* @__PURE__ */ r("p", null, "使用云打包提交成功后请先不要离开该页面稍待几分钟等待打包结果的返回")
  ])
], -1)), Ee = { class: "mt-[20px]" }, Ie = { class: "mt-[10px] table-fill-page__panel" }, Le = { class: "table-fill-page__table" }, $e = { key: 0 }, Ae = { class: "mt-[16px] flex justify-end" }, ze = ["innerHTML"], Ne = { class: "h-[370px]" }, Me = /* @__PURE__ */ ne({
  __name: "version",
  setup(x) {
    const S = xe(), R = Ce(), U = S.meta.title, { pageRef: j, pageStyle: P } = Te(), B = m("/channel/app/version"), b = m(null), i = ie({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        platfrom: ""
      }
    }), v = m(!1), D = m(!0), E = m("");
    Ve().then((t) => {
      t.data.data && t.data.data.auth_code && (E.value = t.data.data.auth_code), D.value = !1;
    }).catch(() => {
      D.value = !1;
    });
    const H = (t) => {
      R.push({ path: B.value });
    }, Se = m(), _ = (t = 1) => {
      i.loading = !0, i.page = t, fe({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((l) => {
        i.loading = !1, i.data = l.data.data, i.total = l.data.total, t == 1 && i.data.length && i.data[0].status == "creating" && I(i.data[0].task_key);
      }).catch(() => {
        i.loading = !1;
      });
    };
    _();
    const w = m(null), q = () => {
      if (!E.value) {
        Z();
        return;
      }
      w.value.setFormData(), w.value.showDialog = !0;
    }, G = (t) => {
      w.value.setFormData(t), w.value.showDialog = !0;
    }, J = (t) => {
      T.confirm(
        e("appVersionDeleteTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        ge({ id: t }).then(() => {
          _();
        }).catch(() => {
        });
      });
    }, K = (t) => {
      T.confirm(
        e("appVersionReleaseTips"),
        e("warning"),
        {
          confirmButtonText: e("confirm"),
          cancelButtonText: e("cancel"),
          type: "warning"
        }
      ).then(() => {
        he(t.id).then(() => {
          _();
        }).catch(() => {
        });
      });
    };
    let C = [];
    const I = (t) => {
      ve(t).then((l) => {
        l.data && (l.data.status == "" ? (v.value && (C.length || (b.value.execute("clear"), b.value.execute("开始打包")), l.data.build_log.data[0].forEach((f) => {
          C.includes(f.action) || (b.value.pushMessage({ content: `${f.action}` }), C.push(f.action));
        })), setTimeout(() => {
          I(t);
        }, 2e3)) : (l.data.status == "fail" && v.value ? b.value.pushMessage({ content: l.data.fail_reason, class: "error" }) : v.value = !1, _(), C = []));
      });
    }, O = () => {
      v.value = !0;
    };
    let Q = null;
    const L = new me(), W = (t, l, f, A, z) => {
      if (l == "开始打包") {
        f(L);
        const u = X(["/", "——", "\\", "|"]);
        Q = setInterval(() => {
          L.flush("> " + u.next().value);
        }, 150);
      }
    }, X = (t) => {
      let l = 0;
      return {
        next() {
          return l + 1 == t.length && (l = 0), { value: t[l++] };
        }
      };
    }, $ = m(""), F = m(!1), Ue = (t) => {
      $.value = t.fail_reason, F.value = !0;
    }, Y = (t) => {
      window.open(be(t.package_path), "_blank");
    }, je = (t) => {
      t && (t.resetFields(), _());
    }, Z = () => {
      we() == "admin" ? T.confirm(
        e("authTips"),
        e("warning"),
        {
          distinguishCancelAndClose: !0,
          confirmButtonText: e("toBind"),
          cancelButtonText: e("toNiucloud")
        }
      ).then(() => {
        R.push({ path: "/app/authorize" });
      }).catch((t) => {
        t === "cancel" && window.open("https://www.niucloud.com/app");
      }) : T.alert(e("siteAuthTips"), e("warning"));
    };
    return (t, l) => {
      const f = c("el-tab-pane"), A = c("el-tabs"), z = c("el-alert"), u = c("el-button"), d = c("el-table-column"), ee = c("el-table"), te = c("el-pagination"), ae = c("el-card"), le = c("el-scrollbar"), N = c("el-dialog"), oe = se("loading");
      return h(), M(re, null, [
        r("div", {
          ref_key: "pageRef",
          ref: j,
          class: "main-container table-fill-page",
          style: pe(o(P))
        }, [
          n(ae, {
            class: "box-card !border-none table-fill-page__card",
            shadow: "never"
          }, {
            default: s(() => [
              r("div", De, [
                r("span", Fe, p(o(U)), 1)
              ]),
              n(A, {
                modelValue: B.value,
                "onUpdate:modelValue": l[0] || (l[0] = (a) => B.value = a),
                class: "my-[20px]",
                onTabChange: H
              }, {
                default: s(() => [
                  n(f, {
                    label: o(e)("accessFlow"),
                    name: "/channel/app"
                  }, null, 8, ["label"]),
                  n(f, {
                    label: o(e)("versionManage"),
                    name: "/channel/app/version"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              n(z, { type: "info" }, {
                default: s(() => [
                  Re
                ]),
                _: 1
              }),
              r("div", Ee, [
                n(u, {
                  type: "primary",
                  onClick: q,
                  disabled: D.value
                }, {
                  default: s(() => [
                    g(p(o(e)("addAppVersion")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              r("div", Ie, [
                r("div", Le, [
                  de((h(), k(ee, {
                    height: "100%",
                    data: i.data,
                    size: "large"
                  }, {
                    empty: s(() => [
                      r("span", null, p(i.loading ? "" : o(e)("emptyData")), 1)
                    ]),
                    default: s(() => [
                      n(d, {
                        type: "index",
                        width: "90",
                        label: o(e)("index")
                      }, null, 8, ["label"]),
                      n(d, {
                        prop: "version_code",
                        label: o(e)("versionCode"),
                        "min-width": "120",
                        "show-overflow-tooltip": !0
                      }, null, 8, ["label"]),
                      n(d, {
                        prop: "version_name",
                        label: o(e)("versionName"),
                        "min-width": "120",
                        "show-overflow-tooltip": !0
                      }, null, 8, ["label"]),
                      n(d, {
                        prop: "version_desc",
                        label: o(e)("versionDesc"),
                        "min-width": "120",
                        "show-overflow-tooltip": !0
                      }, null, 8, ["label"]),
                      n(d, {
                        prop: "platform_name",
                        label: o(e)("platform"),
                        "min-width": "120",
                        "show-overflow-tooltip": !0
                      }, null, 8, ["label"]),
                      n(d, {
                        prop: "status_name",
                        label: o(e)("status"),
                        "min-width": "120",
                        align: "center",
                        "show-overflow-tooltip": !0
                      }, {
                        default: s(({ row: a }) => [
                          n(u, {
                            link: "",
                            loading: a.status == "creating"
                          }, {
                            default: s(() => [
                              g(p(a.status_name), 1)
                            ]),
                            _: 2
                          }, 1032, ["loading"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      n(d, {
                        prop: "status",
                        label: o(e)("isForcedUpgradeTitle"),
                        "min-width": "120",
                        align: "center",
                        "show-overflow-tooltip": !0
                      }, {
                        default: s(({ row: a }) => [
                          g(p(a.is_forced_upgrade ? "是" : "否"), 1)
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      n(d, {
                        prop: "package_path",
                        label: o(e)("packagePath"),
                        "min-width": "120",
                        "show-overflow-tooltip": !0
                      }, null, 8, ["label"]),
                      n(d, {
                        label: o(e)("releaseTime"),
                        "min-width": "120",
                        "show-overflow-tooltip": !0
                      }, {
                        default: s(({ row: a }) => [
                          a.release_time != 0 ? (h(), M("text", $e, p(a.release_time), 1)) : y("", !0)
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      n(d, {
                        label: o(e)("operation"),
                        fixed: "right",
                        align: "right",
                        "min-width": "280"
                      }, {
                        default: s(({ row: a }) => [
                          a.release_time == 0 ? (h(), k(u, {
                            key: 0,
                            type: "primary",
                            link: "",
                            onClick: (V) => G(a)
                          }, {
                            default: s(() => [
                              g(p(o(e)("edit")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : y("", !0),
                          a.status == "upload_success" ? (h(), k(u, {
                            key: 1,
                            type: "primary",
                            link: "",
                            onClick: (V) => K(a)
                          }, {
                            default: s(() => [
                              g(p(o(e)("release")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : y("", !0),
                          a.status == "creating" ? (h(), k(u, {
                            key: 2,
                            type: "primary",
                            link: "",
                            onClick: (V) => O(a)
                          }, {
                            default: s(() => [
                              g(p(o(e)("seeBuildLog")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : y("", !0),
                          a.package_path && a.upgrade_type != "market" ? (h(), k(u, {
                            key: 3,
                            type: "primary",
                            link: "",
                            onClick: (V) => Y(a)
                          }, {
                            default: s(() => [
                              g(p(o(e)("download")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : y("", !0),
                          n(u, {
                            type: "primary",
                            link: "",
                            onClick: (V) => J(a.id)
                          }, {
                            default: s(() => [
                              g(p(o(e)("delete")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["label"])
                    ]),
                    _: 1
                  }, 8, ["data"])), [
                    [oe, i.loading]
                  ])
                ]),
                r("div", Ae, [
                  n(te, {
                    "current-page": i.page,
                    "onUpdate:current-page": l[1] || (l[1] = (a) => i.page = a),
                    "page-size": i.limit,
                    "onUpdate:page-size": l[2] || (l[2] = (a) => i.limit = a),
                    layout: "total, sizes, prev, pager, next, jumper",
                    total: i.total,
                    onSizeChange: l[3] || (l[3] = (a) => _()),
                    onCurrentChange: _
                  }, null, 8, ["current-page", "page-size", "total"])
                ])
              ]),
              n(ye, {
                ref_key: "editAppVersionDialog",
                ref: w,
                onComplete: _
              }, null, 512)
            ]),
            _: 1
          }),
          n(N, {
            modelValue: F.value,
            "onUpdate:modelValue": l[4] || (l[4] = (a) => F.value = a),
            title: o(e)("failReason"),
            width: "60%"
          }, {
            default: s(() => [
              n(le, { class: "h-[60vh] w-full whitespace-pre-wrap p-[20px]" }, {
                default: s(() => [
                  r("div", { innerHTML: $.value }, null, 8, ze)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"])
        ], 4),
        n(N, {
          modelValue: v.value,
          "onUpdate:modelValue": l[5] || (l[5] = (a) => v.value = a),
          title: o(e)("buildLog"),
          width: "850px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "before-close": t.dialogClose
        }, {
          default: s(() => [
            r("div", Ne, [
              n(o(_e), {
                ref_key: "terminalRef",
                ref: b,
                name: `upgrade-${t.terminalId}`,
                context: "",
                "init-log": null,
                "show-header": !1,
                "show-log-time": !0,
                onExecCmd: W
              }, null, 8, ["name"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title", "before-close"])
      ], 64);
    };
  }
});
const et = /* @__PURE__ */ ke(Me, [["__scopeId", "data-v-4239a696"]]);
export {
  et as default
};
