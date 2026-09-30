import { defineComponent as ie, reactive as ce, ref as r, computed as O, watch as de, resolveComponent as d, resolveDirective as re, openBlock as f, createElementBlock as S, normalizeStyle as ue, unref as n, createElementVNode as c, createVNode as l, withCtx as a, createTextVNode as v, toDisplayString as p, createCommentVNode as I, withDirectives as pe, createBlock as R, pushScopeId as me, popScopeId as _e } from "vue";
import { _ as z } from "./category_default-e8ea3d4a.js";
import { ak as fe, t as o, j as ve, G as he, an as ge, cC as be, a as xe } from "./core-shared-c6ad4e77.js";
import { ElTable as ye, ElMessage as U, ElMessageBox as ke } from "element-plus";
import we from "./index-c14157f3.js";
import Ve from "./index-997caa57.js";
import { useRoute as Ce, useRouter as Be } from "vue-router";
import Pe from "./index-2fe2c142.js";
import { u as De } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const D = (k) => (me("data-v-9208ac89"), k = k(), _e(), k), Te = { class: "table-fill-page__card" }, Se = { class: "table-panel table-fill-page__panel" }, Re = {
  key: 0,
  class: "text-[12px] text-[#909399]"
}, Ee = { class: "table-fill-page__table" }, je = { class: "flex items-center justify-between" }, Me = /* @__PURE__ */ D(() => /* @__PURE__ */ c("img", {
  class: "w-[45px] h-[45px] rounded-[var(--cmp-table-composite-icon-radius)]",
  src: z,
  alt: ""
}, null, -1)), Ne = {
  key: 1,
  class: "w-[45px] h-[45px] rounded-[var(--cmp-table-composite-icon-radius)]",
  src: z,
  alt: ""
}, Ae = { class: "flex-1 w-[236px] pl-[15px] truncate" }, Fe = { class: "px-[6px] py-[4px]" }, Oe = /* @__PURE__ */ D(() => /* @__PURE__ */ c("div", { class: "text-[14px] text-[#303133] mb-[10px]" }, "是否需要先云编译？", -1)), Ie = /* @__PURE__ */ D(() => /* @__PURE__ */ c("div", null, [
  /* @__PURE__ */ c("div", { class: "text-[13px]" }, "先云编译再打包"),
  /* @__PURE__ */ c("div", { class: "text-[12px] text-[#909399]" }, "由云端编译本次打包插件的各端产物，编译完成后再打包")
], -1)), Ue = /* @__PURE__ */ D(() => /* @__PURE__ */ c("div", null, [
  /* @__PURE__ */ c("div", { class: "text-[13px]" }, "直接打包"),
  /* @__PURE__ */ c("div", { class: "text-[12px] text-[#909399]" }, "使用本地已编译的前端产物，校验通过即打包")
], -1)), ze = { class: "dialog-footer" }, Ke = { class: "min-h-[150px]" }, Le = /* @__PURE__ */ ie({
  __name: "list",
  setup(k) {
    const K = Ce().meta.title, { pageRef: L, pageStyle: $ } = De(), q = (e) => [
      { label: o("edit"), onClick: () => Z(e.key) },
      { label: o("step4"), show: !!Object.keys(e.install_info).length, onClick: () => ee(e) },
      { label: o("delete"), type: "danger", show: !Object.keys(e.install_info).length, onClick: () => te(e.key) }
    ], i = ce({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        search: ""
      }
    }), E = r(), G = (e) => {
      e && (e.resetFields(), h());
    }, h = (e = 1) => {
      i.loading = !0, i.page = e, he({
        page: i.page,
        limit: i.limit,
        ...i.searchParam
      }).then((t) => {
        i.loading = !1, i.data = t.data, i.total = t.data.total;
      }).catch(() => {
        i.loading = !1;
      });
    };
    h();
    const H = Be(), j = r(), m = r([]), T = r(!1), g = r(!1), b = fe(), w = r("batch"), V = r(""), M = (e) => Object.keys(e.install_info || {}).length > 0, J = (e) => {
      m.value = e || [];
    }, qe = () => {
      i.data.forEach((e) => {
        var t;
        M(e) && ((t = j.value) == null || t.toggleRowSelection(e, !0));
      });
    }, Ge = () => {
      var e;
      (e = j.value) == null || e.clearSelection(), m.value = [];
    }, C = O(() => m.value.map((e) => e.key).filter(Boolean)), Q = O(() => ({
      addon: w.value === "single" ? [V.value] : C.value,
      is_cloud_build: B.value ? 1 : 0
    })), _ = r(!1), B = r(0), W = () => {
      C.value.length && (w.value = "batch", _.value = !0);
    }, X = () => {
      _.value = !1, g.value = !0;
    }, Y = () => {
      if (g.value = !1, w.value === "single") {
        const e = V.value;
        V.value = "", e && N([e]);
        return;
      }
      C.value.length && N(C.value);
    }, N = (e) => {
      e.length && (T.value = !0, b.openPendingDetail("addon_build", "正在发起打包"), ge("addon_build", { addon: e, is_cloud_build: B.value ? 1 : 0 }).then((t) => {
        var x;
        const P = (x = t == null ? void 0 : t.data) == null ? void 0 : x.task_key;
        if (!P) {
          b.closePendingDetail(), U.error("打包任务创建失败");
          return;
        }
        b.openDetail(P, "addon_build");
      }).catch((t) => {
        b.closePendingDetail(), U({ message: (t == null ? void 0 : t.msg) || (t == null ? void 0 : t.message) || "打包任务创建失败", type: "error" });
      }).finally(() => {
        T.value = !1;
      }));
    };
    de(() => b.detail.visible, (e, t) => {
      t && !e && h();
    });
    const Z = (e) => {
      H.push({ path: "/tools/addon_edit", query: { key: e } });
    }, ee = (e) => {
      V.value = e.key, w.value = "single", _.value = !0;
    }, te = (e) => {
      ke.confirm(
        o("codeDeleteTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning"
        }
      ).then(() => {
        i.loading = !0, be(e).then(() => {
          h();
        }).catch(() => {
          i.loading = !1;
        });
      });
    };
    return (e, t) => {
      const P = d("el-input"), x = d("el-form-item"), y = d("el-button"), le = d("el-form"), ae = d("el-card"), u = d("el-table-column"), oe = d("el-image"), A = d("el-radio"), ne = d("el-radio-group"), F = d("el-dialog"), se = re("loading");
      return f(), S("div", {
        ref_key: "pageRef",
        ref: L,
        class: "main-container table-fill-page",
        style: ue(n($))
      }, [
        c("div", Te, [
          l(ae, {
            class: "box-card !border-none table-search-wrap table-search-wrap--panel table-fill-page__search",
            shadow: "never"
          }, {
            default: a(() => [
              l(le, {
                inline: !0,
                model: i.searchParam,
                ref_key: "searchFormRef",
                ref: E,
                class: "search-form"
              }, {
                default: a(() => [
                  l(x, {
                    label: n(o)("title"),
                    prop: "search"
                  }, {
                    default: a(() => [
                      l(P, {
                        modelValue: i.searchParam.search,
                        "onUpdate:modelValue": t[0] || (t[0] = (s) => i.searchParam.search = s),
                        modelModifiers: { trim: !0 },
                        placeholder: n(o)("titlePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(x, null, {
                    default: a(() => [
                      l(y, {
                        type: "primary",
                        onClick: h
                      }, {
                        default: a(() => [
                          v(p(n(o)("search")), 1)
                        ]),
                        _: 1
                      }),
                      l(y, {
                        onClick: t[1] || (t[1] = (s) => G(E.value))
                      }, {
                        default: a(() => [
                          v(p(n(o)("reset")), 1)
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
          c("div", Se, [
            l(Ve, {
              title: n(K),
              selectable: !1
            }, {
              actions: a(() => [
                m.value.length ? (f(), S("span", Re, "已选 " + p(m.value.length) + " 个插件", 1)) : I("", !0),
                l(y, {
                  type: "primary",
                  disabled: !m.value.length,
                  loading: T.value,
                  onClick: W
                }, {
                  default: a(() => [
                    v(" 批量打包 ")
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"])
              ]),
              _: 1
            }, 8, ["title"]),
            c("div", Ee, [
              pe((f(), R(n(ye), {
                height: "100%",
                data: i.data,
                size: "large",
                "row-key": "key",
                onSelectionChange: J
              }, {
                empty: a(() => [
                  c("span", null, p(n(o)("emptyData")), 1)
                ]),
                default: a(() => [
                  l(u, {
                    type: "selection",
                    width: "50",
                    selectable: M,
                    "reserve-selection": ""
                  }),
                  l(u, {
                    label: n(o)("title"),
                    align: "left",
                    "min-width": "320"
                  }, {
                    default: a(({ row: s }) => [
                      c("div", je, [
                        s.icon ? (f(), R(oe, {
                          key: 0,
                          class: "w-[45px] h-[45px] rounded-[var(--cmp-table-composite-icon-radius)] overflow-hidden",
                          src: s.icon.indexOf("data:image") != -1 ? s.icon : n(ve)(s.icon),
                          fit: "contain"
                        }, {
                          error: a(() => [
                            Me
                          ]),
                          _: 2
                        }, 1032, ["src"])) : (f(), S("img", Ne)),
                        c("div", Ae, p(s.title), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(u, {
                    prop: "key",
                    label: n(o)("key"),
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "type_name",
                    label: n(o)("type"),
                    align: "center",
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "author",
                    label: n(o)("author"),
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  l(u, {
                    prop: "version",
                    label: n(o)("version"),
                    align: "center",
                    "min-width": "200"
                  }, null, 8, ["label"]),
                  l(u, {
                    label: n(o)("status"),
                    align: "center",
                    "min-width": "200"
                  }, {
                    default: a(({ row: s }) => [
                      v(p(Object.keys(s.install_info).length ? "已安装" : "未安装"), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  l(u, {
                    label: n(o)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "160",
                    "show-overflow-tooltip": !0
                  }, {
                    default: a(({ row: s }) => [
                      l(we, {
                        actions: q(s)
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [se, i.loading]
              ])
            ])
          ])
        ]),
        l(F, {
          modelValue: _.value,
          "onUpdate:modelValue": t[4] || (t[4] = (s) => _.value = s),
          title: "打包方式",
          width: "480px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1
        }, {
          footer: a(() => [
            c("div", ze, [
              l(y, {
                onClick: t[3] || (t[3] = (s) => _.value = !1)
              }, {
                default: a(() => [
                  v(p(n(o)("cancel")), 1)
                ]),
                _: 1
              }),
              l(y, {
                type: "primary",
                onClick: X
              }, {
                default: a(() => [
                  v(p(n(o)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            c("div", Fe, [
              Oe,
              l(ne, {
                modelValue: B.value,
                "onUpdate:modelValue": t[2] || (t[2] = (s) => B.value = s),
                class: "compile-radio flex flex-col !items-start gap-[8px]"
              }, {
                default: a(() => [
                  l(A, { value: 1 }, {
                    default: a(() => [
                      Ie
                    ]),
                    _: 1
                  }),
                  l(A, {
                    value: 0,
                    class: "mt-[10px]"
                  }, {
                    default: a(() => [
                      Ue
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        l(F, {
          modelValue: g.value,
          "onUpdate:modelValue": t[5] || (t[5] = (s) => g.value = s),
          title: "打包前校验",
          width: "580px",
          "close-on-click-modal": !1,
          "close-on-press-escape": !1,
          "destroy-on-close": !0
        }, {
          default: a(() => [
            c("div", Ke, [
              g.value ? (f(), R(Pe, {
                key: 0,
                scene: "addon_build",
                params: n(Q),
                "auto-next": !0,
                "auto-next-delay": 500,
                "show-prev": !1,
                "next-text": n(o)("nextStep"),
                onNext: Y
              }, null, 8, ["params", "next-text"])) : I("", !0)
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 4);
    };
  }
});
const st = /* @__PURE__ */ xe(Le, [["__scopeId", "data-v-9208ac89"]]);
export {
  st as default
};
