import { defineComponent as R, ref as m, resolveComponent as c, resolveDirective as S, openBlock as s, createBlock as y, withCtx as a, withDirectives as q, createElementBlock as o, createVNode as n, createElementVNode as e, toDisplayString as l, unref as d, Fragment as _, renderList as v, createCommentVNode as w } from "vue";
import { t as p, i as A, cx as H } from "./core-shared-ca1fcae5.js";
import { ElMessage as J } from "element-plus";
import { useRouter as K } from "vue-router";
const P = { class: "main-container" }, Q = { key: 0 }, W = /* @__PURE__ */ e("div", { class: "text-[14px] min-w-[110px] border-solid border-l-[3px] border-[var(--el-color-primary)] pl-[5px]" }, "核销信息", -1), X = { class: "flex items-center mt-[15px]" }, Y = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, Z = { class: "text-[14px] text-[#666666]" }, $ = { class: "flex items-center mt-[15px]" }, ee = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, te = /* @__PURE__ */ e("span", { class: "text-[14px] text-[#666666]" }, " 已核销 ", -1), se = { class: "flex items-center mt-[15px]" }, le = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ae = { class: "text-[14px] text-[#666666]" }, oe = { class: "flex items-center mt-[15px]" }, ne = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ie = { class: "text-[14px] text-[#666666]" }, re = {
  key: 0,
  class: "flex items-center mt-[15px]"
}, ce = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, de = { class: "text-[14px] text-[#666666]" }, _e = {
  key: 0,
  class: "flex items-center mt-[15px]"
}, pe = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, xe = { class: "text-[14px] text-[#666666]" }, ue = { class: "text-[14px] min-w-[110px] border-solid border-l-[3px] border-[var(--el-color-primary)] pl-[5px] mt-[20px]" }, me = { class: "flex items-center mt-[15px]" }, fe = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ve = { class: "text-[14px] text-[#666666]" }, he = { key: 1 }, ge = { class: "flex" }, be = { class: "flex items-center shrink-0" }, ye = ["src"], we = { class: "flex flex-col" }, ke = { class: "multi-hidden text-[14px]" }, Be = /* @__PURE__ */ R({
  __name: "verify-detail",
  setup(Ve, { expose: E }) {
    const h = m(!1), g = m(!0), z = K(), f = m("verifyInfo"), L = (i) => {
      f.value = i;
    }, T = (i) => {
      h.value = !1;
    };
    let k = "";
    const x = m({}), V = m({}), D = m([]), U = async () => {
      if (g.value = !0, k) {
        const i = await (await H(k)).data;
        if (!i || Object.keys(i).length == 0)
          return J.error(p("memberNull")), setTimeout(() => {
            z.go(-1);
          }, 2e3), !1;
        x.value = i, V.value = i.value.content || {}, D.value = i.value.list || [], g.value = !1;
      } else
        g.value = !1;
    };
    return E({
      showDialog: h,
      setFormData: async (i = null) => {
        k = i.code, await U();
      }
    }), (i, b) => {
      const C = c("el-tab-pane"), j = c("el-tabs"), r = c("el-col"), N = c("el-row"), F = c("el-table-column"), G = c("el-table"), M = c("el-drawer"), O = S("loading");
      return s(), y(M, {
        modelValue: h.value,
        "onUpdate:modelValue": b[1] || (b[1] = (t) => h.value = t),
        title: "核销记录详情",
        direction: "rtl",
        "before-close": T,
        size: "1300px"
      }, {
        default: a(() => [
          q((s(), o("div", P, [
            n(j, {
              modelValue: f.value,
              "onUpdate:modelValue": b[0] || (b[0] = (t) => f.value = t),
              class: "pb-[10px]",
              onTabChange: L
            }, {
              default: a(() => [
                n(C, {
                  label: "核销信息",
                  name: "verifyInfo"
                }),
                n(C, {
                  label: "商品信息",
                  name: "goodsInfo"
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            f.value == "verifyInfo" ? (s(), o("div", Q, [
              W,
              n(N, null, {
                default: a(() => [
                  n(r, { span: 8 }, {
                    default: a(() => [
                      e("div", X, [
                        e("span", Y, l(d(p)("核销类型")), 1),
                        e("span", Z, l(x.value.type_name), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  n(r, { span: 8 }, {
                    default: a(() => [
                      e("div", $, [
                        e("span", ee, l(d(p)("核销状态")), 1),
                        te
                      ])
                    ]),
                    _: 1
                  }),
                  n(r, { span: 8 }, {
                    default: a(() => {
                      var t;
                      return [
                        e("div", se, [
                          e("span", le, l(d(p)("核销人员")), 1),
                          e("span", ae, l((x.value.is_admin == 1 ? "后台核销" : (t = x.value.member) == null ? void 0 : t.nickname) || "--"), 1)
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  n(r, { span: 8 }, {
                    default: a(() => [
                      e("div", oe, [
                        e("span", ne, l(d(p)("核销时间")), 1),
                        e("span", ie, l(x.value.create_time), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  (s(!0), o(_, null, v(V.value.fixed, (t, I) => (s(), y(r, { span: 8 }, {
                    default: a(() => [
                      t.title ? (s(), o("div", re, [
                        e("span", ce, l(t.title), 1),
                        e("span", de, l(t.value), 1)
                      ])) : w("", !0)
                    ]),
                    _: 2
                  }, 1024))), 256)),
                  (s(!0), o(_, null, v(x.value.verify_info, (t, I) => (s(), o(_, null, [
                    (s(!0), o(_, null, v(t, (u, B) => (s(), y(r, { span: 8 }, {
                      default: a(() => [
                        u.name ? (s(), o("div", _e, [
                          e("span", pe, l(u.name), 1),
                          e("span", xe, l(u.value), 1)
                        ])) : w("", !0)
                      ]),
                      _: 2
                    }, 1024))), 256))
                  ], 64))), 256))
                ]),
                _: 1
              }),
              (s(!0), o(_, null, v(V.value.diy, (t, I) => (s(), o(_, null, [
                e("div", ue, l(t.title), 1),
                n(N, null, {
                  default: a(() => [
                    (s(!0), o(_, null, v(t.list, (u, B) => (s(), y(r, {
                      span: 8,
                      key: B
                    }, {
                      default: a(() => [
                        e("div", me, [
                          e("span", fe, l(u.title), 1),
                          e("span", ve, l(u.value), 1)
                        ])
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  _: 2
                }, 1024)
              ], 64))), 256))
            ])) : w("", !0),
            f.value == "goodsInfo" ? (s(), o("div", he, [
              n(G, {
                data: D.value,
                size: "large"
              }, {
                default: a(() => [
                  n(F, {
                    label: d(p)("商品名称"),
                    align: "left",
                    width: "300"
                  }, {
                    default: a(({ row: t }) => [
                      e("div", ge, [
                        e("div", be, [
                          e("img", {
                            class: "w-[50px] h-[50px] mr-[10px]",
                            src: d(A)(t.cover)
                          }, null, 8, ye)
                        ]),
                        e("div", we, [
                          e("p", ke, l(t.name), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(F, {
                    prop: "num",
                    label: d(p)("数量"),
                    "min-width": "50",
                    align: "right"
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])
            ])) : w("", !0)
          ])), [
            [O, g.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  Be as _
};
