import { defineComponent as S, ref as v, reactive as B, watch as D, resolveComponent as l, openBlock as E, createElementBlock as R, createVNode as n, withCtx as i, createElementVNode as r, toDisplayString as _, unref as c, createTextVNode as j } from "vue";
import { a2 as M, a4 as O, M as P, t as a, a5 as U, _ as $ } from "./core-shared-ca1fcae5.js";
import { ElMessage as g } from "element-plus";
import { useRoute as F } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const I = { class: "main-container" }, T = { class: "flex justify-between items-center" }, z = { class: "text-page-title" }, A = { class: "fixed-footer-wrap" }, G = { class: "fixed-footer" }, H = /* @__PURE__ */ S({
  __name: "config",
  setup(J) {
    const y = F().meta.title, s = v(!0), e = B({
      is_open: !1,
      request_url: ""
    }), d = v();
    M().then((t) => {
      e.request_url = t.data.web_url + "/", s.value = !1;
    }), O().then((t) => {
      Object.assign(e, t.data), e.is_open = Boolean(Number(e.is_open)), s.value = !1;
    });
    const { copy: b, isSupported: w, copied: m } = P(), x = (t) => {
      if (!w.value) {
        g({
          message: a("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      b(t);
    };
    D(m, () => {
      m.value && g({
        message: a("copySuccess"),
        type: "success"
      });
    });
    const h = () => {
      window.open(e.request_url);
    }, C = async (t) => {
      s.value || !t || await t.validate(async (o) => {
        if (o) {
          s.value = !0;
          const p = { ...e };
          p.is_open = Number(p.is_open), U(p).then(() => {
            s.value = !1;
          }).catch(() => {
            s.value = !1;
          });
        }
      });
    };
    return (t, o) => {
      const p = l("el-switch"), f = l("el-form-item"), k = l("el-input"), N = l("el-form"), V = l("el-card"), q = l("el-button");
      return E(), R("div", I, [
        n(V, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            r("div", T, [
              r("span", z, _(c(y)), 1)
            ]),
            n(N, {
              class: "page-form mt-[20px]",
              model: e,
              "label-width": "150px",
              ref_key: "formRef",
              ref: d
            }, {
              default: i(() => [
                n(f, {
                  label: c(a)("isOpen")
                }, {
                  default: i(() => [
                    n(p, {
                      modelValue: e.is_open,
                      "onUpdate:modelValue": o[0] || (o[0] = (u) => e.is_open = u)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(f, {
                  label: c(a)("pCDomainName")
                }, {
                  default: i(() => [
                    n(k, {
                      "model-value": e.request_url,
                      class: "input-width",
                      readonly: !0
                    }, {
                      append: i(() => [
                        r("div", {
                          class: "cursor-pointer",
                          onClick: o[1] || (o[1] = (u) => x(e.request_url))
                        }, _(c(a)("copy")), 1)
                      ]),
                      _: 1
                    }, 8, ["model-value"]),
                    r("span", {
                      class: "ml-2 cursor-pointer visit-btn",
                      onClick: h
                    }, _(c(a)("clickVisit")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }),
        r("div", A, [
          r("div", G, [
            n(q, {
              type: "primary",
              loading: s.value,
              onClick: o[2] || (o[2] = (u) => C(d.value))
            }, {
              default: i(() => [
                j(_(c(a)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const oe = /* @__PURE__ */ $(H, [["__scopeId", "data-v-2f7e1e13"]]);
export {
  oe as default
};
