import { defineComponent as O, reactive as y, ref as k, resolveComponent as i, resolveDirective as B, openBlock as _, createElementBlock as T, createVNode as a, withCtx as d, unref as m, Fragment as E, renderList as A, createBlock as x, createTextVNode as V, toDisplayString as b, withDirectives as G, createElementVNode as P, pushScopeId as oe, popScopeId as le, nextTick as K } from "vue";
import { t as r, bK as Y, bL as q, a as H } from "./core-shared-c6ad4e77.js";
import { ElMessage as J } from "element-plus";
const Q = { class: "mt-[16px] flex justify-end" }, W = /* @__PURE__ */ O({
  __name: "form-select-content",
  props: {
    formId: {
      type: [Number, String],
      default: 0
    }
  },
  setup(D, { expose: F }) {
    const w = D, f = y({}), h = k(), I = k(), e = y({
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
    }), s = (l = 1) => {
      e.loading = !0, e.page = l, n.form_id && (e.searchParam.verify_form_ids = [n.form_id]), Y({
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
      q({}).then((t) => {
        for (const c in f)
          delete f[c];
        for (const c in t.data)
          f[c] = t.data[c];
      });
    })(), s();
    const z = (l, t) => {
      l ? n.form_id = t.form_id : n.form_id = 0, v();
    }, v = () => {
      K(() => {
        for (let l = 0; l < e.data.length; l++)
          e.data[l].checked = !1, n.form_id == e.data[l].form_id && (e.data[l].checked = !0, Object.assign(n, e.data[l]));
      });
    }, N = (l) => {
      l && (l.resetFields(), s());
    };
    return F({
      getData: () => {
        if (n.form_id == 0) {
          J({
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
      const c = i("el-input"), u = i("el-form-item"), C = i("el-option"), U = i("el-select"), S = i("el-button"), j = i("el-form"), R = i("el-checkbox"), g = i("el-table-column"), $ = i("el-table"), L = i("el-pagination"), M = B("loading");
      return _(), T("div", null, [
        a(j, {
          inline: !0,
          model: e.searchParam,
          ref_key: "searchFormRef",
          ref: h
        }, {
          default: d(() => [
            a(u, {
              label: m(r)("formSelectContentTitle"),
              prop: "title",
              class: "form-item-wrap"
            }, {
              default: d(() => [
                a(c, {
                  modelValue: e.searchParam.title,
                  "onUpdate:modelValue": t[0] || (t[0] = (o) => e.searchParam.title = o),
                  modelModifiers: { trim: !0 },
                  placeholder: m(r)("formSelectContentTitlePlaceholder")
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              _: 1
            }, 8, ["label"]),
            a(u, {
              label: m(r)("formSelectContentTypeName"),
              prop: "type",
              class: "form-item-wrap"
            }, {
              default: d(() => [
                a(U, {
                  modelValue: e.searchParam.type,
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => e.searchParam.type = o),
                  placeholder: m(r)("formSelectContentTypeNamePlaceholder")
                }, {
                  default: d(() => [
                    a(C, {
                      label: m(r)("formSelectContentTypeAll"),
                      value: ""
                    }, null, 8, ["label"]),
                    (_(!0), T(E, null, A(f, (o, p) => (_(), x(C, {
                      label: o.title,
                      value: p,
                      key: p
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ]),
              _: 1
            }, 8, ["label"]),
            a(u, { class: "form-item-wrap" }, {
              default: d(() => [
                a(S, {
                  type: "primary",
                  onClick: t[2] || (t[2] = (o) => s())
                }, {
                  default: d(() => [
                    V(b(m(r)("search")), 1)
                  ]),
                  _: 1
                }),
                a(S, {
                  onClick: t[3] || (t[3] = (o) => N(h.value))
                }, {
                  default: d(() => [
                    V(b(m(r)("reset")), 1)
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
          ref: I
        }, {
          empty: d(() => [
            P("span", null, b(e.loading ? "" : m(r)("emptyData")), 1)
          ]),
          default: d(() => [
            a(g, { "min-width": "7%" }, {
              default: d(({ row: o }) => [
                a(R, {
                  modelValue: o.checked,
                  "onUpdate:modelValue": (p) => o.checked = p,
                  onChange: (p) => z(p, o)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
              ]),
              _: 1
            }),
            a(g, {
              prop: "page_title",
              label: m(r)("formSelectContentTitle"),
              "min-width": "65%"
            }, null, 8, ["label"]),
            a(g, {
              prop: "type_name",
              label: m(r)("formSelectContentTypeName"),
              "min-width": "25%"
            }, null, 8, ["label"])
          ]),
          _: 1
        }, 8, ["data"])), [
          [M, e.loading]
        ]),
        P("div", Q, [
          a(L, {
            "current-page": e.page,
            "onUpdate:current-page": t[4] || (t[4] = (o) => e.page = o),
            "page-size": e.limit,
            "onUpdate:page-size": t[5] || (t[5] = (o) => e.limit = o),
            layout: "total, sizes, prev, pager, next, jumper",
            total: e.total,
            onSizeChange: t[6] || (t[6] = (o) => s()),
            onCurrentChange: s
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
});
const X = /* @__PURE__ */ H(W, [["__scopeId", "data-v-c4fe5049"]]), re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: X
}, Symbol.toStringTag, { value: "Module" }));
export {
  re as _
};
