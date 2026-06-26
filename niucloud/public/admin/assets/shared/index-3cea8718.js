import { defineComponent as M, ref as i, reactive as U, onMounted as $, resolveComponent as n, resolveDirective as q, openBlock as _, createElementBlock as y, createVNode as o, withCtx as t, createElementVNode as e, toDisplayString as a, unref as l, createTextVNode as z, withDirectives as H, createBlock as p, createCommentVNode as I } from "vue";
import { bl as J, gl as Q, bo as W, t as c } from "./core-shared-ca1fcae5.js";
import "element-plus";
import { _ as X } from "./add-table.vue_vue_type_script_setup_true_lang-ffca05c0.js";
import { useRoute as Y, useRouter as Z } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ee = { class: "main-container" }, te = { class: "flex justify-between items-center" }, oe = { class: "text-page-title" }, se = { class: "text-[14px] font-[700]" }, ae = { class: "text-[#999]" }, ne = { class: "mt-[20px] mb-[40px] h-[32px]" }, le = { class: "text-[14px] font-[700]" }, ce = { class: "text-[#999]" }, ie = /* @__PURE__ */ e("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), de = { class: "text-[14px] font-[700]" }, _e = { class: "text-[#999]" }, re = /* @__PURE__ */ e("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), pe = { class: "text-[14px] font-[700]" }, me = { class: "text-[#999]" }, ue = /* @__PURE__ */ e("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), he = { class: "text-[14px] font-[700]" }, xe = { class: "text-[#999]" }, fe = /* @__PURE__ */ e("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), ve = { class: "flex h-[50vh]" }, ge = { class: "flex items-center" }, be = { class: "pl-[5px]" }, ke = {
  class: "ml-[20px]",
  style: { width: "calc(100% - 285px)" }
}, je = /* @__PURE__ */ M({
  __name: "index",
  setup(we) {
    const D = Y().meta.title;
    Z();
    const N = i("codeGeneration"), s = U({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        table_name: "",
        table_content: "",
        addon_name: ""
      }
    });
    i(), $(() => {
      window.codeActiveName && (N.value = window.codeActiveName + "", window.codeActiveName = null), C(J(s.searchParam).page);
    });
    const C = (m = 1) => {
      s.loading = !0, s.page = m, Q({
        page: s.page,
        limit: s.limit,
        ...s.searchParam
      }).then((d) => {
        s.loading = !1, s.data = d.data.data, s.total = d.data.total, W(s.page, s.limit, s.searchParam);
      }).catch(() => {
        s.loading = !1;
      });
    };
    i([]);
    const u = i(null), V = () => {
      u.value.setFormData(), u.value.showDialog = !0;
    }, P = i([]), x = i(!1), f = i([]), T = i(!1), v = i(""), g = i(""), F = (m) => {
      P.value.forEach((d) => {
        m.path === d.file_dir + d.name && (v.value = d.content);
      });
    };
    return (m, d) => {
      const E = n("el-button"), r = n("el-step"), L = n("el-steps"), j = n("Folder"), A = n("FolderOpened"), b = n("el-icon"), B = n("Document"), G = n("el-tree"), k = n("el-scrollbar"), R = n("highlightjs"), S = n("el-dialog"), O = n("el-card"), K = q("loading");
      return _(), y("div", ee, [
        o(O, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: t(() => [
            e("div", te, [
              e("span", oe, a(l(D)), 1)
            ]),
            o(L, {
              active: 5,
              direction: "vertical",
              class: "mt-[20px]"
            }, {
              default: t(() => [
                o(r, null, {
                  title: t(() => [
                    e("p", se, a(l(c)("step1")), 1)
                  ]),
                  description: t(() => [
                    e("span", ae, a(l(c)("describe1")), 1),
                    e("div", ne, [
                      o(E, {
                        type: "primary",
                        class: "w-[100px]",
                        onClick: V
                      }, {
                        default: t(() => [
                          z(a(l(c)("btn1")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                o(r, null, {
                  title: t(() => [
                    e("p", le, a(l(c)("step2")), 1)
                  ]),
                  description: t(() => [
                    e("span", ce, a(l(c)("describe2")), 1),
                    ie
                  ]),
                  _: 1
                }),
                o(r, null, {
                  title: t(() => [
                    e("p", de, a(l(c)("step3")), 1)
                  ]),
                  description: t(() => [
                    e("span", _e, a(l(c)("describe3")), 1),
                    re
                  ]),
                  _: 1
                }),
                o(r, null, {
                  title: t(() => [
                    e("p", pe, a(l(c)("step4")), 1)
                  ]),
                  description: t(() => [
                    e("span", me, a(l(c)("describe4")), 1),
                    ue
                  ]),
                  _: 1
                }),
                o(r, null, {
                  title: t(() => [
                    e("p", he, a(l(c)("step5")), 1)
                  ]),
                  description: t(() => [
                    e("span", xe, a(l(c)("describe5")), 1),
                    fe
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            o(X, {
              ref_key: "addCodeDialog",
              ref: u
            }, null, 512),
            o(S, {
              modelValue: x.value,
              "onUpdate:modelValue": d[0] || (d[0] = (h) => x.value = h),
              class: "dialog-visible",
              width: "70%",
              title: "代码预览"
            }, {
              default: t(() => [
                H((_(), y("div", ve, [
                  o(k, { class: "h-[100%] w-[270px]" }, {
                    default: t(() => [
                      f.value.length && g.value != "" ? (_(), p(G, {
                        key: 0,
                        data: f.value,
                        props: { label: "name", value: "key" },
                        "node-key": "key",
                        "current-node-key": g.value,
                        "expand-on-click-node": !1,
                        "highlight-current": "",
                        "default-expand-all": "",
                        ref: "treeRef",
                        onNodeClick: F
                      }, {
                        default: t(({ node: h, data: w }) => [
                          e("div", ge, [
                            w.children ? (_(), p(b, { key: 0 }, {
                              default: t(() => [
                                h.expanded ? (_(), p(A, { key: 1 })) : (_(), p(j, { key: 0 }))
                              ]),
                              _: 2
                            }, 1024)) : (_(), p(b, { key: 1 }, {
                              default: t(() => [
                                o(B)
                              ]),
                              _: 1
                            })),
                            e("span", be, a(w.name), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["data", "current-node-key"])) : I("", !0)
                    ]),
                    _: 1
                  }),
                  e("div", ke, [
                    o(k, { class: "h-[100%] w-[100%]" }, {
                      default: t(() => [
                        o(R, {
                          autodetect: "",
                          class: "h-[100%]",
                          code: v.value
                        }, null, 8, ["code"])
                      ]),
                      _: 1
                    })
                  ])
                ])), [
                  [K, T.value]
                ])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  je as default
};
