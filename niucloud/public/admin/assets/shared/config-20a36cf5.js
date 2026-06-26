import { defineComponent as S, ref as v, reactive as B, watch as D, resolveComponent as l, openBlock as E, createElementBlock as R, createVNode as s, withCtx as r, createElementVNode as i, toDisplayString as _, unref as c, createTextVNode as j } from "vue";
import { a1 as H, a2 as M, M as O, t as n, a3 as U, _ as $ } from "./core-shared-ca1fcae5.js";
import { ElMessage as g } from "element-plus";
import { useRoute as F } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const I = { class: "main-container" }, T = { class: "flex justify-between items-center" }, z = { class: "text-page-title" }, A = { class: "fixed-footer-wrap" }, G = { class: "fixed-footer" }, J = /* @__PURE__ */ S({
  __name: "config",
  setup(K) {
    const b = F().meta.title, a = v(!0), e = B({
      is_open: !0,
      request_url: ""
    }), d = v();
    H().then((t) => {
      Object.assign(e, t.data), e.is_open = Boolean(Number(e.is_open)), a.value = !1;
    }), M().then((t) => {
      e.request_url = t.data.wap_url + "/";
    });
    const { copy: y, isSupported: w, copied: m } = O(), x = (t) => {
      if (!w.value) {
        g({
          message: n("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      y(t);
    };
    D(m, () => {
      m.value && g({
        message: n("copySuccess"),
        type: "success"
      });
    });
    const h = () => {
      window.open(e.request_url);
    }, C = async (t) => {
      a.value || !t || await t.validate(async (o) => {
        if (o) {
          a.value = !0;
          const p = { ...e };
          p.is_open = Number(p.is_open), U(p).then(() => {
            a.value = !1;
          }).catch(() => {
            a.value = !1;
          });
        }
      });
    };
    return (t, o) => {
      const p = l("el-switch"), f = l("el-form-item"), k = l("el-input"), N = l("el-form"), V = l("el-card"), q = l("el-button");
      return E(), R("div", I, [
        s(V, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            i("div", T, [
              i("span", z, _(c(b)), 1)
            ]),
            s(N, {
              class: "page-form mt-[20px]",
              model: e,
              "label-width": "150px",
              ref_key: "formRef",
              ref: d
            }, {
              default: r(() => [
                s(f, {
                  label: c(n)("isOpen")
                }, {
                  default: r(() => [
                    s(p, {
                      modelValue: e.is_open,
                      "onUpdate:modelValue": o[0] || (o[0] = (u) => e.is_open = u)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(f, {
                  label: c(n)("h5DomainName")
                }, {
                  default: r(() => [
                    s(k, {
                      "model-value": e.request_url,
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: r(() => [
                        i("div", {
                          class: "cursor-pointer",
                          onClick: o[1] || (o[1] = (u) => x(e.request_url))
                        }, _(c(n)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"]),
                    i("span", {
                      class: "ml-2 cursor-pointer visit-btn",
                      onClick: h
                    }, _(c(n)("clickVisit")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }),
        i("div", A, [
          i("div", G, [
            s(q, {
              type: "primary",
              loading: a.value,
              onClick: o[2] || (o[2] = (u) => C(d.value))
            }, {
              default: r(() => [
                j(_(c(n)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const oe = /* @__PURE__ */ $(J, [["__scopeId", "data-v-8a5349bf"]]);
export {
  oe as default
};
