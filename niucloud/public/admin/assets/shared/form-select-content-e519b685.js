import { defineComponent as B, reactive as y, ref as k, resolveComponent as i, resolveDirective as E, openBlock as _, createElementBlock as T, createVNode as a, withCtx as m, unref as d, Fragment as L, renderList as A, createBlock as x, createTextVNode as P, toDisplayString as b, withDirectives as G, createElementVNode as V, nextTick as Y } from "vue";
import { t as r, bC as q, bD as H, _ as J } from "./core-shared-ca1fcae5.js";
import { ElMessage as K } from "element-plus";
const Q = { class: "mt-[16px] flex justify-end" }, W = /* @__PURE__ */ B({
  __name: "form-select-content",
  props: {
    formId: {
      type: [Number, String],
      default: 0
    }
  },
  setup(D, { expose: F }) {
    const w = D, f = y({}), h = k(), z = k(), e = y({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        title: "",
        type: "",
        verify_form_ids: []
      }
    }), n = y({
      form_id: w.formId
    }), p = (l = 1) => {
      e.loading = !0, e.page = l, n.form_id && (e.searchParam.verify_form_ids = [n.form_id]), q({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((t) => {
        e.loading = !1, e.data = t.data.data, e.data.forEach((c) => {
          c.checked = c.form_id == n.form_id;
        }), e.total = t.data.total, v();
      }).catch(() => {
        e.loading = !1;
      });
    };
    ((l = "") => {
      H().then((t) => {
        for (const c in f)
          delete f[c];
        for (const c in t.data)
          f[c] = t.data[c];
      });
    })(), p();
    const N = (l, t) => {
      l ? n.form_id = t.form_id : n.form_id = 0, v();
    }, v = () => {
      Y(() => {
        for (let l = 0; l < e.data.length; l++)
          e.data[l].checked = !1, n.form_id == e.data[l].form_id && (e.data[l].checked = !0, Object.assign(n, e.data[l]));
      });
    }, U = (l) => {
      l && (l.resetFields(), p());
    };
    return F({
      getData: () => {
        if (n.form_id == 0) {
          K({
            type: "warning",
            message: `${r("formSelectContentTips")}`
          });
          return;
        }
        return {
          name: "DIY_FORM",
          title: n.page_title,
          url: `/app/pages/index/diy_form?form_id=${n.form_id}`,
          action: "",
          formId: n.form_id
        };
      }
    }), (l, t) => {
      const c = i("el-input"), u = i("el-form-item"), C = i("el-option"), j = i("el-select"), S = i("el-button"), I = i("el-form"), R = i("el-checkbox"), g = i("el-table-column"), $ = i("el-table"), M = i("el-pagination"), O = E("loading");
      return _(), T("div", null, [
        a(I, {
          inline: !0,
          model: e.searchParam,
          ref_key: "searchFormRef",
          ref: h
        }, {
          default: m(() => [
            a(u, {
              label: d(r)("formSelectContentTitle"),
              prop: "title",
              class: "form-item-wrap"
            }, {
              default: m(() => [
                a(c, {
                  modelValue: e.searchParam.title,
                  "onUpdate:modelValue": t[0] || (t[0] = (o) => e.searchParam.title = o),
                  modelModifiers: { trim: !0 },
                  placeholder: d(r)("formSelectContentTitlePlaceholder")
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              _: 1
            }, 8, ["label"]),
            a(u, {
              label: d(r)("formSelectContentTypeName"),
              prop: "type",
              class: "form-item-wrap"
            }, {
              default: m(() => [
                a(j, {
                  modelValue: e.searchParam.type,
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => e.searchParam.type = o),
                  placeholder: d(r)("formSelectContentTypeNamePlaceholder")
                }, {
                  default: m(() => [
                    a(C, {
                      label: d(r)("formSelectContentTypeAll"),
                      value: ""
                    }, null, 8, ["label"]),
                    (_(!0), T(L, null, A(f, (o, s) => (_(), x(C, {
                      label: o.title,
                      value: s,
                      key: s
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ]),
              _: 1
            }, 8, ["label"]),
            a(u, { class: "form-item-wrap" }, {
              default: m(() => [
                a(S, {
                  type: "primary",
                  onClick: t[2] || (t[2] = (o) => p())
                }, {
                  default: m(() => [
                    P(b(d(r)("search")), 1)
                  ]),
                  _: 1
                }),
                a(S, {
                  onClick: t[3] || (t[3] = (o) => U(h.value))
                }, {
                  default: m(() => [
                    P(b(d(r)("reset")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"]),
        G((_(), x($, {
          data: e.data,
          size: "large",
          ref_key: "tableRef",
          ref: z
        }, {
          empty: m(() => [
            V("span", null, b(e.loading ? "" : d(r)("emptyData")), 1)
          ]),
          default: m(() => [
            a(g, { "min-width": "7%" }, {
              default: m(({ row: o }) => [
                a(R, {
                  modelValue: o.checked,
                  "onUpdate:modelValue": (s) => o.checked = s,
                  onChange: (s) => N(s, o)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
              ]),
              _: 1
            }),
            a(g, {
              prop: "page_title",
              label: d(r)("formSelectContentTitle"),
              "min-width": "65%"
            }, null, 8, ["label"]),
            a(g, {
              prop: "type_name",
              label: d(r)("formSelectContentTypeName"),
              "min-width": "25%"
            }, null, 8, ["label"])
          ]),
          _: 1
        }, 8, ["data"])), [
          [O, e.loading]
        ]),
        V("div", Q, [
          a(M, {
            "current-page": e.page,
            "onUpdate:currentPage": t[4] || (t[4] = (o) => e.page = o),
            "page-size": e.limit,
            "onUpdate:pageSize": t[5] || (t[5] = (o) => e.limit = o),
            layout: "total, sizes, prev, pager, next, jumper",
            total: e.total,
            onSizeChange: t[6] || (t[6] = (o) => p()),
            onCurrentChange: p
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
});
const X = /* @__PURE__ */ J(W, [["__scopeId", "data-v-c4fe5049"]]), ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: X
}, Symbol.toStringTag, { value: "Module" }));
export {
  ae as _
};
