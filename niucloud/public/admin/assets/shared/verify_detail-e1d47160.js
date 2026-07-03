import { defineComponent as z, ref as v, resolveComponent as f, resolveDirective as R, withDirectives as j, openBlock as n, createElementBlock as l, createVNode as c, withCtx as x, unref as a, createElementVNode as e, toDisplayString as t, Fragment as d, renderList as m, createBlock as q } from "vue";
import { t as o, i as A, cz as G } from "./core-shared-c8d7774e.js";
import { useRoute as M, useRouter as O } from "vue-router";
import { ElMessage as S } from "element-plus";
import { ArrowLeft as T } from "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const $ = { class: "main-container" }, H = { class: "panel-title !text-sm" }, J = { class: "flex items-center mt-[15px]" }, K = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, P = { class: "text-[14px] text-[#666666]" }, Q = { class: "flex items-center mt-[15px]" }, U = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, W = /* @__PURE__ */ e("span", { class: "text-[14px] text-[#666666]" }, " 已核销 ", -1), X = { class: "flex items-center mt-[15px]" }, Y = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, Z = { class: "text-[14px] text-[#666666]" }, I = { class: "flex items-center mt-[15px]" }, ee = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, te = { class: "text-[14px] text-[#666666]" }, se = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ne = { class: "text-[14px] text-[#666666]" }, ae = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, le = { class: "text-[14px] text-[#666666]" }, oe = { class: "panel-title !text-sm" }, ce = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ie = { class: "text-[14px] text-[#666666]" }, re = { class: "panel-title !text-sm" }, xe = { class: "flex" }, pe = { class: "flex items-center shrink-0" }, _e = ["src"], de = { class: "flex flex-col" }, me = { class: "multi-hidden text-[14px]" }, Ve = /* @__PURE__ */ z({
  __name: "verify_detail",
  setup(ue) {
    const y = M(), w = O(), C = y.meta.title, N = () => {
      w.push("/marketing/verify");
    }, u = v(!0), k = y.query.code, i = v({}), g = v({}), D = v([]);
    return (async () => {
      if (u.value = !0, k) {
        const r = await (await G(k)).data;
        if (!r || Object.keys(r).length == 0)
          return S.error(o("memberNull")), setTimeout(() => {
            w.go(-1);
          }, 2e3), !1;
        i.value = r, g.value = r.value.content || {}, D.value = r.value.list || [], u.value = !1;
      } else
        u.value = !1;
    })(), (r, V) => {
      const E = f("el-page-header"), h = f("el-card"), B = f("el-table-column"), F = f("el-table"), L = R("loading");
      return j((n(), l("div", $, [
        c(h, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: x(() => [
            c(E, {
              content: a(C),
              icon: a(T),
              onBack: V[0] || (V[0] = (s) => N())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        c(h, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: x(() => [
            e("h3", H, t(a(o)("核销信息")), 1),
            e("div", J, [
              e("span", K, t(a(o)("核销类型")), 1),
              e("span", P, t(i.value.type_name), 1)
            ]),
            e("div", Q, [
              e("span", U, t(a(o)("核销状态")), 1),
              W
            ]),
            e("div", X, [
              e("span", Y, t(a(o)("核销人员")), 1),
              e("span", Z, t(i.value.member ? i.value.member.nickname : "--"), 1)
            ]),
            e("div", I, [
              e("span", ee, t(a(o)("核销时间")), 1),
              e("span", te, t(i.value.create_time), 1)
            ]),
            (n(!0), l(d, null, m(g.value.fixed, (s, p) => (n(), l("div", {
              class: "flex items-center mt-[15px]",
              key: p
            }, [
              e("span", se, t(s.title), 1),
              e("span", ne, t(s.value), 1)
            ]))), 128)),
            (n(!0), l(d, null, m(i.value.verify_info, (s, p) => (n(), l("div", { key: p }, [
              (n(!0), l(d, null, m(s, (_, b) => (n(), l("div", {
                class: "flex items-center mt-[15px]",
                key: b
              }, [
                e("span", ae, t(_.name), 1),
                e("span", le, t(_.value), 1)
              ]))), 128))
            ]))), 128))
          ]),
          _: 1
        }),
        (n(!0), l(d, null, m(g.value.diy, (s, p) => (n(), q(h, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never",
          key: p
        }, {
          default: x(() => [
            e("h3", oe, t(s.title), 1),
            (n(!0), l(d, null, m(s.list, (_, b) => (n(), l("div", {
              class: "flex items-center mt-[15px]",
              key: b
            }, [
              e("span", ce, t(_.title), 1),
              e("span", ie, t(_.value), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1024))), 128)),
        c(h, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: x(() => [
            e("h3", re, t(a(o)("商品信息")), 1),
            c(F, {
              data: D.value,
              size: "large"
            }, {
              default: x(() => [
                c(B, {
                  label: a(o)("商品名称"),
                  align: "left",
                  width: "300"
                }, {
                  default: x(({ row: s }) => [
                    e("div", xe, [
                      e("div", pe, [
                        e("img", {
                          class: "w-[50px] h-[50px] mr-[10px]",
                          src: a(A)(s.cover)
                        }, null, 8, _e)
                      ]),
                      e("div", de, [
                        e("p", me, t(s.name), 1)
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                c(B, {
                  prop: "num",
                  label: a(o)("数量"),
                  "min-width": "50",
                  align: "right"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])
          ]),
          _: 1
        })
      ])), [
        [L, u.value]
      ]);
    };
  }
});
export {
  Ve as default
};
